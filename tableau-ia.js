/* =====================================================================
   TABLEAU-IA.JS — Tableau interactif : construction géométrique guidée par IA
   Chargé en <script defer> APRÈS app.js, dont il utilise l'état et le rendu du tableau
   (tbTools, tbInk, tbPoints, tbTexts, tbCodages, tbAiOverlay, tbRender, tbPushHistory,
   tbUndo, constantes TB_*) ainsi que callClaude et currentUser.

   Principe (refonte demandée : "retravailler en profondeur [...] si je trace un segment d'une
   certaine longueur, je dois bien voir la prise de mesure à la règle puis le tracé. Bien
   différencier les tracés de segments, de droites et demi-droites. Et ainsi de suite pour
   l'ensemble des stratégies de tracés") :
   - l'IA ne calcule plus AUCUNE coordonnée (source de toutes les erreurs précédentes : points
     qui n'étaient pas l'intersection, demi-droites trop courtes...). Elle décrit seulement la
     MÉTHODE, sous forme d'un programme de construction (points nommés, longueurs, angles,
     objets tracés, intersections) ;
   - ce fichier calcule toute la géométrie exactement (tbAiCompile), place la figure au centre
     du tableau, puis anime pour chaque opération le vrai geste de l'outil correspondant
     (règle : 0 sur le point puis lecture de la graduation ; équerre qui glisse le long de la
     droite ; parallèle par glissement de l'équerre le long de la règle ; écartement du compas
     pris sur la règle ou sur la figure ; rapporteur...).
   ===================================================================== */

const TB_PX_PER_CM = 22;             // échelle de la règle graduée (cf. rulerSVG, cmStep=22)
const TB_AI_MAX_STEPS = 25;
const TB_AI_REGION = {x0:70, x1:830, y0:45, y1:470}; // zone de la figure (le bas sert d'établi)
const TB_AI_BENCH = {x:70, y:522};   // règle posée en bas du tableau pour prendre un écartement
const TB_AI_ENTRY = {                // d'où arrive / où repart chaque outil
  regle_grad:{x:0,y:340}, equerre:{x:0,y:340}, rapporteur:{x:0,y:-360},
  compas:{x:280,y:-320}, crayon:{x:200,y:-240},
};
const TB_AI_PENCIL_ANGLE = 25;       // crayon tenu légèrement penché, comme une main droite
const TB_AI_HL = '#E35D3A', TB_AI_HL2 = '#1F7A4D';

class TbAiError extends Error {}

/* ---------- vecteurs (cm, repère mathématique : y vers le HAUT) ---------- */
const tbV = {
  add:(a,b)=>({x:a.x+b.x, y:a.y+b.y}),
  sub:(a,b)=>({x:a.x-b.x, y:a.y-b.y}),
  mul:(a,k)=>({x:a.x*k, y:a.y*k}),
  dot:(a,b)=>a.x*b.x+a.y*b.y,
  cross:(a,b)=>a.x*b.y-a.y*b.x,
  dist:(a,b)=>Math.hypot(a.x-b.x, a.y-b.y),
  norm:a=>{ const l=Math.hypot(a.x,a.y)||1; return {x:a.x/l, y:a.y/l}; },
  perp:a=>({x:-a.y, y:a.x}),
  dir:deg=>({x:Math.cos(deg*Math.PI/180), y:Math.sin(deg*Math.PI/180)}),
  rot:(a,rad)=>({x:a.x*Math.cos(rad)-a.y*Math.sin(rad), y:a.x*Math.sin(rad)+a.y*Math.cos(rad)}),
  mid:(a,b)=>({x:(a.x+b.x)/2, y:(a.y+b.y)/2}),
};

/* Choisit parmi des points/directions candidats celui qui va le plus vers "side". */
function tbAiPick(cands, side){
  const key = {up:c=>c.y, down:c=>-c.y, right:c=>c.x, left:c=>-c.x}[side] || (c=>c.y);
  const tie = (side==='left'||side==='right') ? (c=>c.y) : (c=>c.x);
  return cands.slice().sort((a,b)=>{ const d=key(b)-key(a); return Math.abs(d)>1e-6 ? d : tie(b)-tie(a); })[0];
}
function tbAiInRange(o,t){ return t>=o.t0-1e-6 && t<=o.t1+1e-6; }
function tbAiInterLL(a,b){
  const d = tbV.cross(a.u,b.u);
  if(Math.abs(d)<1e-9) return [];
  const w = tbV.sub(b.p,a.p);
  const t = tbV.cross(w,b.u)/d, s = tbV.cross(w,a.u)/d;
  if(!tbAiInRange(a,t) || !tbAiInRange(b,s)) return [];
  return [tbV.add(a.p, tbV.mul(a.u,t))];
}
function tbAiInterLC(l,c){
  const w = tbV.sub(l.p,c.c), b = tbV.dot(w,l.u);
  const disc = b*b - (tbV.dot(w,w)-c.r*c.r);
  if(disc < -1e-9) return [];
  const sq = Math.sqrt(Math.max(0,disc));
  return [-b+sq, -b-sq].filter((t,k,arr)=>tbAiInRange(l,t) && (k===0 || Math.abs(t-arr[0])>1e-9))
                        .map(t=>tbV.add(l.p, tbV.mul(l.u,t)));
}
function tbAiInterCC(a,b){
  const d = tbV.dist(a.c,b.c);
  if(d<1e-9) return [];
  const x = (d*d + a.r*a.r - b.r*b.r)/(2*d), h2 = a.r*a.r - x*x;
  if(h2 < -1e-9) return [];
  const h = Math.sqrt(Math.max(0,h2)), u = tbV.norm(tbV.sub(b.c,a.c)), m = tbV.add(a.c, tbV.mul(u,x)), n = tbV.perp(u);
  return h<1e-9 ? [m] : [tbV.add(m, tbV.mul(n,h)), tbV.sub(m, tbV.mul(n,h))];
}
function tbAiIntersect(o1,o2){
  if(o1.kind==='circle' && o2.kind==='circle') return tbAiInterCC(o1,o2);
  if(o1.kind==='circle') return tbAiInterLC(o2,o1);
  if(o2.kind==='circle') return tbAiInterLC(o1,o2);
  return tbAiInterLL(o1,o2);
}
const tbAiRound05 = v=>Math.round(v*2)/2;

/* ======================= COMPILATION : programme -> géométrie exacte =======================
   Objets (en cm, repère mathématique) :
   - linéaires {kind:'segment'|'ray'|'line', p, u (unitaire), t0, t1} : points p+t·u, t∈[t0,t1] ;
   - cercles {kind:'circle', c, r}.
   Chaque objet accumule dans "hits" les points qui doivent être couverts par son tracé
   (points de définition, intersections trouvées plus tard dans le programme...) : la longueur
   des droites/demi-droites et la position des arcs de compas en découlent, calculées APRÈS
   coup (tbAiFinalize) -- une demi-droite dépasse donc toujours le point qu'on y trouvera. */
function tbAiEvaluate(program, flips){
  const pts = new Map(), objs = new Map(), actions = [], marks = [];
  const err = (i,msg)=>{ throw new TbAiError('Étape '+(i+1)+' ('+(program[i]&&program[i].op||'?')+') : '+msg); };
  const P = (i,name)=>{ if(typeof name!=='string' || !pts.has(name)) err(i, 'point « '+name+' » inconnu (il doit être construit avant)'); return pts.get(name); };
  const newName = (i,name)=>{
    if(typeof name!=='string' || !/^[A-Z][A-Za-z0-9']{0,3}$/.test(name)) err(i, 'nom de point invalide : '+JSON.stringify(name));
    if(pts.has(name)) err(i, 'le point '+name+' existe déjà');
  };
  const num = (i,v,what,min,max)=>{
    if(typeof v!=='number' || !Number.isFinite(v)) err(i, what+' manquant(e) ou invalide');
    if(v<min || v>max) err(i, what+' hors limites ('+v+'), attendu entre '+min+' et '+max);
    return v;
  };
  const side = (i,s)=>{ if(s!==undefined && !['up','down','left','right'].includes(s)) err(i, 'side/pick attendu : up, down, left ou right'); return s; };
  const lineRef = (i,ref)=>{
    if(Array.isArray(ref) && ref.length===2){
      const a=P(i,ref[0]), b=P(i,ref[1]);
      if(tbV.dist(a,b)<1e-6) err(i, 'les points '+ref[0]+' et '+ref[1]+' sont confondus');
      return {p:a, u:tbV.norm(tbV.sub(b,a)), obj:null};
    }
    if(typeof ref==='string' && objs.has(ref)){
      const o = objs.get(ref);
      if(o.kind==='circle') err(i, '« '+ref+' » est un cercle, pas une droite');
      return {p:o.p, u:o.u, obj:o};
    }
    err(i, 'droite de référence inconnue : '+JSON.stringify(ref));
  };
  const register = (i,id,o)=>{
    if(id!==undefined){
      if(typeof id!=='string' || !id) err(i, 'identifiant d\'objet invalide');
      if(objs.has(id)) err(i, 'l\'identifiant « '+id+' » est déjà utilisé');
      objs.set(id,o);
    }
    return o;
  };
  const hit = (o,p)=>{ if(o.kind==='circle') o.hits.push(Math.atan2(p.y-o.c.y, p.x-o.c.x)); else o.hits.push(tbV.dot(tbV.sub(p,o.p), o.u)); };
  const addPoint = (name,p)=>{ pts.set(name,p); marks.push(p); };
  const linearObj = (kind,p,u,len)=>({kind, p, u, t0: kind==='line'?-Infinity:0, t1: kind==='segment'?len:Infinity, hits:[]});

  program.forEach((s,i)=>{
    if(!s || typeof s!=='object') err(i, 'étape invalide');
    switch(s.op){
      case 'point': {
        newName(i,s.name);
        let p;
        if(s.on!==undefined){
          const o = objs.get(s.on);
          if(!o) err(i, 'objet inconnu : '+s.on);
          if(o.kind==='circle'){
            const a = num(i, s.angle!==undefined?s.angle:90, 'angle', -360, 360)*Math.PI/180;
            p = {x:o.c.x+o.r*Math.cos(a), y:o.c.y+o.r*Math.sin(a)};
          } else {
            const t = num(i, s.at!==undefined ? s.at : (o.kind==='segment' ? o.t1/2 : 3), 'position « at »', -30, 30);
            if(!tbAiInRange(o,t)) err(i, 'la position « at » tombe en dehors de « '+s.on+' »');
            p = tbV.add(o.p, tbV.mul(o.u,t));
          }
          hit(o,p);
        } else if(!pts.size){
          p = {x:0, y:0};
        } else {
          const base = s.from!==undefined ? P(i,s.from) : [...pts.values()].pop();
          p = {x: base.x + num(i, s.dx!==undefined?s.dx:5, 'dx', -35, 35), y: base.y + num(i, s.dy!==undefined?s.dy:0, 'dy', -25, 25)};
        }
        addPoint(s.name,p);
        actions.push({op:'point', p, name:s.name});
        break;
      }
      case 'segment_length': {
        const A = P(i,s.from); newName(i,s.to);
        const L = num(i, s.length, 'longueur', 0.2, 15);
        let u, along = null;
        if(s.along!==undefined){
          along = objs.get(s.along);
          if(!along || along.kind==='circle') err(i, '« along » doit désigner une droite, demi-droite ou un segment déjà tracé');
          const t = tbV.dot(tbV.sub(A,along.p), along.u);
          if(tbV.dist(tbV.add(along.p, tbV.mul(along.u,t)), A) > 1e-4) err(i, 'le point '+s.from+' n\'est pas sur « '+s.along+' »');
          u = along.u;
          if(typeof s.direction==='number' && tbV.dot(tbV.dir(s.direction),u)<0) u = tbV.mul(u,-1);
        } else {
          u = tbV.dir(typeof s.direction==='number' ? num(i,s.direction,'direction',-360,360) : 0);
        }
        const B = tbV.add(A, tbV.mul(u,L));
        if(along){
          const tb = tbV.dot(tbV.sub(B,along.p), along.u);
          if(!tbAiInRange(along,tb)) err(i, 'la longueur dépasse « '+s.along+' »');
          hit(along,A); hit(along,B);
        }
        addPoint(s.to,B);
        register(i, s.id, linearObj('segment', A, u, L));
        actions.push({op:'segment_length', A, B, L, to:s.to, trace: !along, style:s.style||'final'});
        break;
      }
      case 'segment': {
        const A = P(i,s.from), B = P(i,s.to), L = tbV.dist(A,B);
        if(L<1e-6) err(i, 'points confondus');
        register(i, s.id, linearObj('segment', A, tbV.norm(tbV.sub(B,A)), L));
        actions.push({op:'segment', A, B, style:s.style||'final'});
        break;
      }
      case 'line':
      case 'ray': {
        let p, u; const defs = [];
        if(s.op==='ray'){
          p = P(i,s.from); defs.push(p);
          if(s.through!==undefined){ const B=P(i,s.through); if(tbV.dist(p,B)<1e-6) err(i,'points confondus'); u=tbV.norm(tbV.sub(B,p)); defs.push(B); }
          else u = tbV.dir(num(i,s.direction,'direction',-360,360));
        } else if(Array.isArray(s.through) && s.through.length===2){
          p = P(i,s.through[0]); const B = P(i,s.through[1]);
          if(tbV.dist(p,B)<1e-6) err(i,'points confondus');
          u = tbV.norm(tbV.sub(B,p)); defs.push(p,B);
        } else if(typeof s.through==='string'){
          p = P(i,s.through); u = tbV.dir(num(i,s.direction,'direction',-360,360)); defs.push(p);
        } else err(i, '« through » attendu (deux points, ou un point + « direction »)');
        const o = register(i, s.id, linearObj(s.op, p, u));
        defs.forEach(q=>hit(o,q));
        actions.push({op:s.op, obj:o, style:s.style||'final'});
        break;
      }
      case 'perpendicular': {
        const M = P(i,s.through), L = lineRef(i,s.to);
        const H = tbV.add(L.p, tbV.mul(L.u, tbV.dot(tbV.sub(M,L.p), L.u)));
        const off = tbV.dist(M,H);
        const onLine = off<1e-6;
        const kind = s.kind || (onLine ? 'ray' : 'line');
        if(!['line','ray','segment'].includes(kind)) err(i, 'kind attendu : line, ray ou segment');
        if(kind==='segment' && onLine) err(i, 'un segment perpendiculaire demande un point hors de la droite');
        side(i,s.side);
        let n;
        if(!onLine) n = tbV.norm(tbV.sub(M,H));
        else {
          const n1 = tbV.perp(L.u);
          n = tbAiPick([n1, tbV.mul(n1,-1)], s.side||'up');
          if(!s.side && flips.has(i)) n = tbV.mul(n,-1);
        }
        const o = register(i, s.id, linearObj(kind, H, n, off));
        if(onLine && !s.side && kind==='ray') o.flipStep = i;
        hit(o,H); if(!onLine) hit(o,M);
        if(L.obj) hit(L.obj,H);
        let footName = null;
        if(s.foot!==undefined && !onLine){ newName(i,s.foot); addPoint(s.foot,H); footName = s.foot; }
        actions.push({op:'perpendicular', H, n, uRef:L.u, obj:o, footName, style:s.style||'final'});
        break;
      }
      case 'parallel': {
        const M = P(i,s.through), L = lineRef(i,s.to);
        const H = tbV.add(L.p, tbV.mul(L.u, tbV.dot(tbV.sub(M,L.p), L.u)));
        const d = tbV.dist(M,H);
        if(d<1e-6) err(i, 'le point '+s.through+' est déjà sur la droite de référence');
        side(i,s.side);
        const kind = s.kind || 'line';
        if(!['line','ray'].includes(kind)) err(i, 'kind attendu : line ou ray');
        const u = kind==='ray' ? tbAiPick([L.u, tbV.mul(L.u,-1)], s.side||'right') : L.u;
        const o = register(i, s.id, linearObj(kind, M, u));
        hit(o,M); if(L.obj) hit(L.obj,H);
        actions.push({op:'parallel', M, H, d, n:tbV.norm(tbV.sub(M,H)), uRef:L.u, obj:o, style:s.style||'final'});
        break;
      }
      case 'circle': {
        const C = P(i,s.center);
        let r, from = null;
        if(Array.isArray(s.radius_from)){
          const a = P(i,s.radius_from[0]), b = P(i,s.radius_from[1]);
          r = tbV.dist(a,b); from = [a,b];
          if(r<0.2) err(i, 'écartement trop petit');
          if(r>17) err(i, 'écartement trop grand pour le compas (17 cm max)');
        } else r = num(i, s.radius, 'rayon', 0.2, 15);
        const o = register(i, s.id, {kind:'circle', c:C, r, hits:[], full:!!s.full});
        actions.push({op:'circle', C, r, from, obj:o, style:s.style});
        break;
      }
      case 'intersect': {
        if(!Array.isArray(s.of) || s.of.length!==2) err(i, '« of » doit lister deux objets');
        const o1 = objs.get(s.of[0]), o2 = objs.get(s.of[1]);
        if(!o1 || !o2) err(i, 'objet inconnu : '+(!o1 ? s.of[0] : s.of[1]));
        side(i,s.pick);
        let cands = tbAiIntersect(o1,o2);
        if(!cands.length){
          const flip = [o1,o2].map(o=>o.flipStep).find(k=>k!==undefined && !flips.has(k));
          if(flip!==undefined) throw {tbAiFlip:flip};
          err(i, '« '+s.of[0]+' » et « '+s.of[1]+' » ne se coupent pas');
        }
        const fresh = cands.filter(c=>![...pts.values()].some(p=>tbV.dist(p,c)<1e-4));
        if(fresh.length) cands = fresh;
        const X = tbAiPick(cands, s.pick||'up');
        hit(o1,X); hit(o2,X);
        if(s.name){ newName(i,s.name); addPoint(s.name,X); } else marks.push(X);
        actions.push({op:'intersect', X, name:s.name||''});
        break;
      }
      case 'midpoint': {
        if(!Array.isArray(s.of) || s.of.length!==2) err(i, '« of » doit lister deux points');
        const A = P(i,s.of[0]), B = P(i,s.of[1]); newName(i,s.name);
        const L = tbV.dist(A,B);
        if(L>15) err(i, 'segment trop long pour être mesuré avec la règle (15 cm)');
        const I = tbV.mid(A,B);
        addPoint(s.name,I);
        actions.push({op:'midpoint', A, B, I, L, name:s.name});
        break;
      }
      case 'perpendicular_bisector': {
        if(!Array.isArray(s.of) || s.of.length!==2) err(i, '« of » doit lister deux points');
        const A = P(i,s.of[0]), B = P(i,s.of[1]), L = tbV.dist(A,B);
        if(L<0.5 || L>20) err(i, 'longueur du segment inadaptée au compas');
        const r = Math.min(15, Math.max(tbAiRound05(L*0.7), Math.ceil((L/2+0.5)*2)/2));
        const ca = {kind:'circle', c:A, r, hits:[]}, cb = {kind:'circle', c:B, r, hits:[]};
        const I2 = tbAiInterCC(ca,cb);
        if(I2.length<2) err(i, 'construction au compas impossible');
        const E = tbAiPick(I2,'up'), F = I2.find(q=>q!==E);
        [E,F].forEach(q=>{ hit(ca,q); hit(cb,q); });
        const o = register(i, s.id, linearObj('line', E, tbV.norm(tbV.sub(F,E))));
        hit(o,E); hit(o,F);
        const names = Array.isArray(s.points) ? s.points : [];
        [E,F].forEach((q,k)=>{ if(names[k]){ newName(i,names[k]); addPoint(names[k],q); } else marks.push(q); });
        actions.push({op:'perpendicular_bisector', A, B, r, E, F, ca, cb, obj:o, names, style:s.style||'final'});
        break;
      }
      case 'angle_bisector': {
        if(!Array.isArray(s.angle) || s.angle.length!==3) err(i, '« angle » doit lister trois points (ex. ["B","A","C"], sommet au milieu)');
        const B = P(i,s.angle[0]), A = P(i,s.angle[1]), C = P(i,s.angle[2]);
        const u1 = tbV.norm(tbV.sub(B,A)), u2 = tbV.norm(tbV.sub(C,A));
        if(Math.abs(tbV.cross(u1,u2))<1e-6) err(i, 'angle plat ou nul : utiliser plutôt une perpendiculaire');
        const r = Math.max(1.5, Math.min(6, tbAiRound05(Math.min(tbV.dist(A,B), tbV.dist(A,C))*0.45)));
        const Pp = tbV.add(A, tbV.mul(u1,r)), Q = tbV.add(A, tbV.mul(u2,r));
        const K = tbAiInterCC({c:Pp,r},{c:Q,r}).sort((a,b)=>tbV.dist(b,A)-tbV.dist(a,A))[0];
        if(!K || tbV.dist(K,A)<1e-4) err(i, 'construction au compas impossible');
        const o = register(i, s.id, linearObj('ray', A, tbV.norm(tbV.sub(K,A))));
        hit(o,A); hit(o,K);
        marks.push(Pp,Q,K);
        actions.push({op:'angle_bisector', A, P:Pp, Q, K, r, obj:o, style:s.style||'final'});
        break;
      }
      case 'angle': {
        const A = P(i,s.vertex), B = P(i,s.from);
        const deg = num(i, s.degrees, 'angle (degrés)', 1, 179);
        side(i,s.side);
        const u = tbV.norm(tbV.sub(B,A)), th = deg*Math.PI/180;
        const d1 = tbV.rot(u,th), d2 = tbV.rot(u,-th);
        let dv = tbAiPick([d1,d2], s.side||'up');
        if(!s.side && flips.has(i)) dv = (dv===d1 ? d2 : d1);
        const kind = s.kind || 'ray';
        if(!['line','ray'].includes(kind)) err(i, 'kind attendu : ray ou line');
        const o = register(i, s.id, linearObj(kind, A, dv));
        if(!s.side) o.flipStep = i;
        const Mk = tbV.add(A, tbV.mul(dv, TB_PROT_RADIUS/TB_PX_PER_CM));
        hit(o,A); hit(o,Mk);
        let markName = null;
        if(s.mark){ newName(i,s.mark); addPoint(s.mark,Mk); markName = s.mark; } else marks.push(Mk);
        actions.push({op:'angle', A, B, dv, deg, Mk, markName, obj:o, style:s.style||'final'});
        break;
      }
      case 'mark_right_angle': {
        const A = P(i,s.vertex);
        if(!Array.isArray(s.points) || s.points.length!==2) err(i, '« points » doit lister deux points');
        const B = P(i,s.points[0]), C = P(i,s.points[1]);
        actions.push({op:'mark_right_angle', A, u1:tbV.norm(tbV.sub(B,A)), u2:tbV.norm(tbV.sub(C,A))});
        break;
      }
      case 'mark_equal': {
        if(!Array.isArray(s.segments) || !s.segments.length) err(i, '« segments » attendu');
        const segs = s.segments.map(pair=>{
          if(!Array.isArray(pair) || pair.length!==2) err(i, 'chaque segment doit lister deux points');
          return [P(i,pair[0]), P(i,pair[1])];
        });
        actions.push({op:'mark_equal', segs, count: Math.max(1, Math.min(3, Math.round(s.count||1)))});
        break;
      }
      case 'label': {
        if(typeof s.text!=='string' || !s.text.trim()) err(i, 'texte manquant');
        let target = null;
        if(s.on!==undefined){ target = objs.get(s.on); if(!target) err(i, 'objet inconnu : '+s.on); }
        const at = s.at!==undefined ? P(i,s.at) : null;
        if(!target && !at) err(i, '« on » (objet) ou « at » (point) attendu');
        actions.push({op:'label', text:s.text.trim().slice(0,30), target, at});
        break;
      }
      default:
        err(i, 'opération inconnue « '+s.op+' »');
    }
  });
  return {actions, objs, pts, marks};
}

/* Longueur tracée des objets linéaires, arcs de compas, puis mise en page à l'échelle réelle. */
function tbAiFinalize(ev){
  const allObjs = new Set(ev.objs.values());
  ev.actions.forEach(a=>{ ['obj','ca','cb'].forEach(k=>{ if(a[k]) allObjs.add(a[k]); }); });
  allObjs.forEach(o=>{
    if(o.kind==='circle') return;
    const hs = o.hits.length ? o.hits : [0];
    const lo = Math.min(...hs), hi = Math.max(...hs), M = 2.5;
    if(o.kind==='segment'){ o.e0 = 0; o.e1 = o.t1; }
    else if(o.kind==='ray'){ o.e0 = 0; o.e1 = Math.max(hi+M, 6); }
    else {
      o.e0 = lo-M; o.e1 = hi+M;
      if(o.e1-o.e0 < 8){ const m=(o.e0+o.e1)/2; o.e0 = m-4; o.e1 = m+4; }
    }
  });
  const box = ev.marks.slice();
  allObjs.forEach(o=>{
    if(o.kind==='circle'){ if(o.full || !o.hits.length){ box.push({x:o.c.x-o.r,y:o.c.y-o.r},{x:o.c.x+o.r,y:o.c.y+o.r}); } }
    else if(o.kind!=='line'){ box.push(tbV.add(o.p,tbV.mul(o.u,o.e0)), tbV.add(o.p,tbV.mul(o.u,o.e1))); }
  });
  if(!box.length) throw new TbAiError('figure vide');
  const xs = box.map(p=>p.x), ys = box.map(p=>p.y);
  const minX=Math.min(...xs), maxX=Math.max(...xs), minY=Math.min(...ys), maxY=Math.max(...ys);
  const R = TB_AI_REGION, wCm=(R.x1-R.x0)/TB_PX_PER_CM, hCm=(R.y1-R.y0)/TB_PX_PER_CM;
  if(maxX-minX > wCm || maxY-minY > hCm){
    throw new TbAiError('figure trop grande pour le tableau ('+(maxX-minX).toFixed(1)+' cm × '+(maxY-minY).toFixed(1)+' cm, maximum '+wCm.toFixed(0)+' × '+hCm.toFixed(0)+' cm)');
  }
  const mx=(minX+maxX)/2, my=(minY+maxY)/2, cx=(R.x0+R.x1)/2, cy=(R.y0+R.y1)/2;
  const S = p=>({x: cx+(p.x-mx)*TB_PX_PER_CM, y: cy-(p.y-my)*TB_PX_PER_CM});
  const named = [...ev.pts.values()];
  const cen = named.length ? S({x:named.reduce((a,p)=>a+p.x,0)/named.length, y:named.reduce((a,p)=>a+p.y,0)/named.length}) : {x:cx,y:cy};
  return {actions: ev.actions, S, centroid: cen};
}

function tbAiCompile(program){
  if(!Array.isArray(program) || !program.length) throw new TbAiError('réponse vide ou pas une liste d\'étapes');
  if(program.length>TB_AI_MAX_STEPS) throw new TbAiError('trop d\'étapes ('+program.length+', maximum '+TB_AI_MAX_STEPS+')');
  const flips = new Set();
  for(let attempt=0; attempt<8; attempt++){
    try{ return tbAiFinalize(tbAiEvaluate(program, flips)); }
    catch(e){ if(e && e.tbAiFlip!==undefined && !flips.has(e.tbAiFlip)){ flips.add(e.tbAiFlip); continue; } throw e; }
  }
  throw new TbAiError('construction impossible (intersections introuvables)');
}

/* ======================= ANIMATION (coordonnées écran du tableau) ======================= */
let tbAiPlan = null;
let tbAiSpeed = 1;
function tbAiSetSpeed(v){ tbAiSpeed = parseFloat(v)||1; }
function tbAiSleep(ms){ return new Promise(r=>setTimeout(r, ms*tbAiSpeed)); }
function tbAiTween(target, props, ms){
  ms = Math.max(1, ms*tbAiSpeed);
  const start = {}; for(const k in props) start[k] = target[k];
  return new Promise(res=>{
    const t0 = performance.now();
    const frame = now=>{
      const t = Math.min(1,(now-t0)/ms), e = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
      for(const k in props) target[k] = start[k]+(props[k]-start[k])*e;
      tbRender();
      if(t<1) requestAnimationFrame(frame); else res();
    };
    requestAnimationFrame(frame);
  });
}
const tbAiSd = u=>({x:u.x, y:-u.y}); // direction mathématique -> écran
const tbAiAng = (a,b)=>Math.atan2(b.y-a.y, b.x-a.x)*180/Math.PI;
const tbAiVecAng = v=>Math.atan2(v.y, v.x)*180/Math.PI;
const tbAiDirDeg = deg=>({x:Math.cos(deg*Math.PI/180), y:Math.sin(deg*Math.PI/180)});
const tbAiAt = (p,d,k)=>({x:p.x+d.x*k, y:p.y+d.y*k});
function tbAiNorm180(d){ d = ((d%360)+360)%360; return d>180 ? d-360 : d; }

function tbAiFindTool(type){ return tbTools.find(t=>t.type===type && t.aiDriven); }
async function tbAiMoveTool(t, pose, ms){
  const props = {};
  for(const k in pose){
    if(k==='angle' || k==='rayAngle') props[k] = (t[k]||0) + tbAiNorm180(pose[k]-(t[k]||0));
    else if(typeof pose[k]==='number') props[k] = pose[k];
    else t[k] = pose[k];
  }
  await tbAiTween(t, props, ms);
}
async function tbAiBring(type, pose, ms){
  let t = tbAiFindTool(type);
  if(!t){
    const off = TB_AI_ENTRY[type];
    t = Object.assign({id:tbNextId++, type, aiDriven:true}, pose, {x:pose.x+off.x, y:pose.y+off.y});
    tbTools.push(t);
    tbRenderPalette();
  }
  await tbAiMoveTool(t, pose, ms||550);
  return t;
}
async function tbAiPutAway(...types){
  const tools = types.map(tbAiFindTool).filter(Boolean);
  await Promise.all(tools.map(t=>{ const off = TB_AI_ENTRY[t.type]; return tbAiTween(t, {x:t.x+off.x, y:t.y+off.y}, 420); }));
  tbTools = tbTools.filter(t=>!tools.includes(t));
  tbRenderPalette();
  tbRender();
}
async function tbAiPutAwayAll(){ await tbAiPutAway(...Object.keys(TB_AI_ENTRY)); }
function tbAiPencilTo(p, ms){ return tbAiBring('crayon', {x:p.x, y:p.y, angle:TB_AI_PENCIL_ANGLE}, ms||420); }

/* Repère transitoire (graduation lue sur la règle, écartement du compas...). */
function tbAiHighlight(p, color){
  const c = color||TB_AI_HL;
  tbAiOverlay.push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="10" fill="${c}" fill-opacity="0.12" stroke="${c}" stroke-width="2.6"/><circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2.4" fill="${c}"/>`);
  tbRender();
}
function tbAiClearHighlights(){ tbAiOverlay = []; tbRender(); }

/* Trace au crayon le segment [a,b] (écran) en faisant glisser le crayon le long du trait. */
async function tbAiTraceLine(a, b, style){
  await tbAiPencilTo(a, 380);
  const pen = tbAiFindTool('crayon');
  const stroke = {id:tbNextId++, color:tbCurrentColor(), construction: style==='construction', straight:true, points:[[a.x,a.y]]};
  tbInk.push(stroke);
  const n = Math.max(10, Math.round(Math.hypot(b.x-a.x, b.y-a.y)/4));
  for(let k=1;k<=n;k++){
    const x = a.x+(b.x-a.x)*k/n, y = a.y+(b.y-a.y)*k/n;
    stroke.points.push([x,y]); pen.x = x; pen.y = y;
    tbRender();
    await tbAiSleep(14);
  }
}
/* Pose un point au crayon (petite croix + nom placé à l'extérieur de la figure). */
async function tbAiMark(p, label){
  await tbAiPencilTo(p, 420);
  const c = tbAiPlan ? tbAiPlan.centroid : p;
  let ux = p.x-c.x, uy = p.y-c.y; const l = Math.hypot(ux,uy);
  if(l<1){ ux = 0.6; uy = -0.8; } else { ux/=l; uy/=l; }
  // Nom décalé vers l'extérieur de la figure, et un peu de côté quand cette direction est
  // quasi verticale (sinon il chevaucherait un trait vertical passant par le point).
  tbPoints.push({id:tbPointNextId++, x:p.x, y:p.y, label:label||'', labelDx: ux*15-5+(ux<-0.3?-5:0)+(Math.abs(ux)<0.35?10:0), labelDy: uy*15+6});
  tbRender();
  await tbAiSleep(260);
}
/* Vrai si un trait droit déjà tracé passe par a ET b (côté déjà obtenu par une étape
   précédente, ex. [AC] contenu dans la demi-droite [Ax) -- signalé : "ne pas retracer les
   côtés qui existent déjà"). */
function tbAiAlreadyTraced(a, b){
  const dSeg = (p,s,e)=>{ const dx=e[0]-s[0], dy=e[1]-s[1], l2=dx*dx+dy*dy||1; const t=Math.max(0,Math.min(1,((p.x-s[0])*dx+(p.y-s[1])*dy)/l2)); return Math.hypot(p.x-(s[0]+t*dx), p.y-(s[1]+t*dy)); };
  return tbInk.some(st=>st.straight && st.points.length>1 && dSeg(a,st.points[0],st.points[st.points.length-1])<3 && dSeg(b,st.points[0],st.points[st.points.length-1])<3);
}
/* Portion [t0,t1] (px, le long de u depuis p) visible dans le tableau. */
function tbAiClip(p, u, t0, t1){
  const lim = [[8,892,'x'],[8,552,'y']];
  for(const [mn,mx,ax] of lim){
    if(Math.abs(u[ax])<1e-9){ if(p[ax]<mn || p[ax]>mx) return null; continue; }
    const ta=(mn-p[ax])/u[ax], tb=(mx-p[ax])/u[ax];
    t0 = Math.max(t0, Math.min(ta,tb)); t1 = Math.min(t1, Math.max(ta,tb));
  }
  return t1>t0 ? [t0,t1] : null;
}
/* Extrémités écran du tracé d'un objet linéaire (après découpe au bord du tableau). */
function tbAiExtent(o){
  const S = tbAiPlan.S, pS = S(o.p), uS = tbAiSd(o.u);
  const r = tbAiClip(pS, uS, o.e0*TB_PX_PER_CM, o.e1*TB_PX_PER_CM);
  return r ? {a:tbAiAt(pS,uS,r[0]), b:tbAiAt(pS,uS,r[1]), pS, uS, t0:r[0], t1:r[1]} : null;
}
/* Règle posée avec son bord gradué sur la droite (from,to), centrée sur la portion à tracer,
   le corps de la règle du côté opposé à la figure (pour ne pas la masquer). */
function tbAiRulerThrough(from, to){
  const d = tbV.norm({x:to.x-from.x, y:to.y-from.y}), m = {x:(from.x+to.x)/2, y:(from.y+to.y)/2}, c = tbAiPlan.centroid;
  let a = tbAiVecAng(d);
  const body = tbAiDirDeg(a+90);
  if(body.x*(m.x-c.x)+body.y*(m.y-c.y) < -0.5) a += 180;
  const dd = tbAiDirDeg(a);
  return {x:m.x-dd.x*TB_RULER_L/2, y:m.y-dd.y*TB_RULER_L/2, angle:a};
}
async function tbAiRuledStroke(from, to, style){
  await tbAiBring('regle_grad', tbAiRulerThrough(from,to));
  await tbAiTraceLine(from, to, style);
}
/* Écartement du compas : pris sur la règle posée en bas du tableau (rayon connu en cm), ou
   directement sur la figure entre deux points (report de longueur). */
async function tbAiTakeOpening(rPx, fromPts){
  if(fromPts){
    const P = fromPts[0], Q = fromPts[1];
    const cp = await tbAiBring('compas', {x:P.x, y:P.y, angle:tbAiAng(P,Q), radius:Math.min(30,rPx), mode:'open'});
    tbAiHighlight(P); tbAiHighlight(Q);
    await tbAiMoveTool(cp, {radius:rPx}, 750);
    await tbAiSleep(400);
    tbAiClearHighlights();
    return cp;
  }
  const B = TB_AI_BENCH;
  await tbAiBring('regle_grad', {x:B.x, y:B.y, angle:0});
  tbAiHighlight(B);
  const cp = await tbAiBring('compas', {x:B.x, y:B.y, angle:0, radius:30, mode:'open'});
  tbAiHighlight({x:B.x+rPx, y:B.y});
  await tbAiMoveTool(cp, {radius:rPx}, 800);
  await tbAiSleep(450);
  tbAiClearHighlights();
  return cp;
}
/* Fenêtres d'arc (angles mathématiques) autour des points qui seront trouvés sur ce cercle --
   "il n'est pas nécessaire de faire un cercle complet : un arc suffit". */
function tbAiArcWindows(o, half){
  if(o.full || !o.hits.length) return [[Math.PI/2, Math.PI/2+2*Math.PI]];
  const h = (half||20)*Math.PI/180;
  const ws = o.hits.map(a=>[a-h, a+h]).sort((x,y)=>x[0]-y[0]);
  const out = [];
  ws.forEach(w=>{ const last = out[out.length-1]; if(last && w[0]<=last[1]) last[1] = Math.max(last[1],w[1]); else out.push(w.slice()); });
  return out;
}
/* Compas déjà ouvert : se déplace sur le centre C puis trace les arcs demandés. */
async function tbAiCompassArcs(cp, C, rPx, windows, style){
  cp.mode = 'closed';
  await tbAiMoveTool(cp, {x:C.x, y:C.y, angle:-windows[0][0]*180/Math.PI}, 750);
  for(const [w0,w1] of windows){
    cp.mode = 'closed';
    await tbAiMoveTool(cp, {angle:-w0*180/Math.PI}, 300);
    cp.mode = 'draw';
    const stroke = {id:tbNextId++, color:tbCurrentColor(), construction: style==='construction', points:[]};
    tbInk.push(stroke);
    const n = Math.max(10, Math.round(rPx*(w1-w0)/4));
    for(let k=0;k<=n;k++){
      const m = w0+(w1-w0)*k/n;
      cp.angle = -m*180/Math.PI;
      stroke.points.push([C.x+rPx*Math.cos(m), C.y-rPx*Math.sin(m)]);
      tbRender();
      await tbAiSleep(14);
    }
  }
  cp.mode = 'closed';
  tbRender();
}
/* Équerre : sommet de l'angle droit en V, un côté (leg0) sur la direction de référence, l'autre
   (leg1) vers "toward" -- retourne l'angle de pose. */
function tbAiSquareAngle(uRefS, towardS){
  let a0 = tbAiVecAng(uRefS);
  const leg1 = tbAiDirDeg(a0+90);
  if(leg1.x*towardS.x + leg1.y*towardS.y < 0) a0 += 180;
  return a0;
}

const tbAiSteps = {
  async point(a){
    await tbAiMark(tbAiPlan.S(a.p), a.name);
    await tbAiPutAwayAll();
  },
  /* Segment de longueur donnée : règle avec son 0 sur A, lecture de la graduation, B marqué au
     crayon, PUIS tracé de A à B. */
  async segment_length(a){
    const S = tbAiPlan.S, A = S(a.A), B = S(a.B);
    await tbAiBring('regle_grad', {x:A.x, y:A.y, angle:tbAiAng(A,B)});
    tbAiHighlight(A);
    await tbAiSleep(500);
    tbAiHighlight(B);
    await tbAiSleep(550);
    await tbAiMark(B, a.to);
    tbAiClearHighlights();
    if(a.trace) await tbAiTraceLine(A, B, a.style);
    await tbAiPutAwayAll();
  },
  /* Segment entre deux points existants : le trait s'arrête exactement aux deux extrémités. */
  async segment(a){
    const S = tbAiPlan.S, A = S(a.A), B = S(a.B);
    if(tbAiAlreadyTraced(A,B)){ await tbAiSleep(200); return; }
    await tbAiRuledStroke(A, B, a.style);
    await tbAiPutAwayAll();
  },
  /* Droite : prolongée de part et d'autre des points qui la définissent. */
  async line(a){
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
  },
  /* Demi-droite : part exactement de son origine, dépasse le point par lequel elle passe. */
  async ray(a){
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
  },
  /* Perpendiculaire à l'équerre : un côté de l'angle droit posé sur la droite, l'équerre glisse
     jusqu'au pied, le crayon suit l'autre côté ; prolongement à la règle si nécessaire. */
  async perpendicular(a){
    const S = tbAiPlan.S, H = S(a.H), nS = tbAiSd(a.n), uS = tbAiSd(a.uRef);
    const a0 = tbAiSquareAngle(uS, nS), leg0 = tbAiDirDeg(a0);
    await tbAiBring('equerre', {x:H.x-leg0.x*70, y:H.y-leg0.y*70, angle:a0});
    await tbAiSleep(200);
    await tbAiMoveTool(tbAiFindTool('equerre'), {x:H.x, y:H.y}, 650);
    const ex = tbAiExtent(a.obj);
    if(ex){
      const legMax = TB_EQUERRE_LEGY-8, s0 = Math.max(0,ex.t0), s1 = Math.min(ex.t1, legMax);
      if(s1>s0+1) await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,s0), tbAiAt(ex.pS,ex.uS,s1), a.style);
      const needRuler = ex.t1>legMax+2 || ex.t0<-2;
      if(needRuler){
        await tbAiPutAway('equerre','crayon');
        await tbAiBring('regle_grad', tbAiRulerThrough(ex.a, ex.b));
        if(ex.t1>legMax+2) await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,s1), ex.b, a.style);
        if(ex.t0<-2) await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,0), ex.a, a.style);
      }
    }
    if(a.footName){ await tbAiPutAway('equerre','regle_grad'); await tbAiMark(H, a.footName); }
    await tbAiPutAwayAll();
  },
  /* Parallèle : équerre posée sur la droite, règle contre l'autre côté de l'équerre, l'équerre
     glisse le long de la règle jusqu'au point, puis tracé le long de l'équerre. */
  async parallel(a){
    const S = tbAiPlan.S, M = S(a.M), nS = tbAiSd(a.n), uS = tbAiSd(a.uRef), dPx = a.d*TB_PX_PER_CM;
    const a0 = tbAiSquareAngle(uS, nS), leg0 = tbAiDirDeg(a0);
    const ex = tbAiExtent(a.obj);
    const sgn = (ex.uS.x*leg0.x + ex.uS.y*leg0.y) >= 0 ? 1 : -1;
    const s0 = Math.min(ex.t0*sgn, ex.t1*sgn), s1 = Math.max(ex.t0*sgn, ex.t1*sgn);
    const Vf = tbAiAt(M, leg0, s0-6), V0 = tbAiAt(Vf, nS, -dPx);
    // Règle le long du côté de l'angle droit (leg1), corps du côté opposé à l'équerre.
    let ar = tbAiVecAng(nS);
    const body = tbAiDirDeg(ar+90);
    if(body.x*leg0.x + body.y*leg0.y > 0) ar += 180;
    const rd = tbAiDirDeg(ar), span0 = tbAiAt(V0,nS,-25), span1 = tbAiAt(Vf,nS,TB_EQUERRE_LEGY*0.6);
    const rm = {x:(span0.x+span1.x)/2, y:(span0.y+span1.y)/2};
    await tbAiBring('equerre', {x:V0.x, y:V0.y, angle:a0});
    await tbAiBring('regle_grad', {x:rm.x-rd.x*TB_RULER_L/2, y:rm.y-rd.y*TB_RULER_L/2, angle:ar});
    await tbAiSleep(300);
    await tbAiMoveTool(tbAiFindTool('equerre'), {x:Vf.x, y:Vf.y}, 1000);
    const legLen = TB_EQUERRE_LEGX-12, e1 = Math.min(s1, s0+legLen);
    await tbAiTraceLine(tbAiAt(M,leg0,s0), tbAiAt(M,leg0,e1), a.style);
    if(s1>e1+2){
      await tbAiPutAway('equerre','regle_grad','crayon');
      const from = tbAiAt(M,leg0,s0), to = tbAiAt(M,leg0,s1);
      await tbAiBring('regle_grad', tbAiRulerThrough(from,to));
      await tbAiTraceLine(tbAiAt(M,leg0,e1), to, a.style);
    }
    await tbAiPutAwayAll();
  },
  async circle(a){
    const S = tbAiPlan.S, C = S(a.C), rPx = a.r*TB_PX_PER_CM;
    const style = a.style || ((a.obj.full || !a.obj.hits.length) ? 'final' : 'construction');
    const cp = await tbAiTakeOpening(rPx, a.from ? [S(a.from[0]), S(a.from[1])] : null);
    if(!a.from) await tbAiPutAway('regle_grad');
    await tbAiCompassArcs(cp, C, rPx, tbAiArcWindows(a.obj), style);
    await tbAiPutAwayAll();
  },
  async intersect(a){
    await tbAiMark(tbAiPlan.S(a.X), a.name);
    await tbAiPutAwayAll();
  },
  /* Milieu : règle avec son 0 sur A, lecture de la longueur en B, puis de la moitié. */
  async midpoint(a){
    const S = tbAiPlan.S, A = S(a.A), B = S(a.B), I = S(a.I);
    await tbAiBring('regle_grad', {x:A.x, y:A.y, angle:tbAiAng(A,B)});
    tbAiHighlight(A); await tbAiSleep(450);
    tbAiHighlight(B); await tbAiSleep(550);
    tbAiHighlight(I, TB_AI_HL2); await tbAiSleep(500);
    await tbAiMark(I, a.name);
    tbAiClearHighlights();
    await tbAiPutAwayAll();
  },
  /* Médiatrice au compas : même écartement depuis A puis depuis B, deux points d'intersection,
     droite qui passe par ces deux points. */
  async perpendicular_bisector(a){
    const S = tbAiPlan.S, rPx = a.r*TB_PX_PER_CM;
    const cp = await tbAiTakeOpening(rPx, null);
    await tbAiPutAway('regle_grad');
    await tbAiCompassArcs(cp, S(a.A), rPx, tbAiArcWindows(a.ca, 16), 'construction');
    await tbAiCompassArcs(cp, S(a.B), rPx, tbAiArcWindows(a.cb, 16), 'construction');
    await tbAiPutAway('compas');
    await tbAiMark(S(a.E), a.names[0]||'');
    await tbAiMark(S(a.F), a.names[1]||'');
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
  },
  /* Bissectrice au compas : un arc depuis le sommet coupe les deux côtés, deux arcs de même
     écartement depuis ces points se coupent sur la bissectrice. */
  async angle_bisector(a){
    const S = tbAiPlan.S, rPx = a.r*TB_PX_PER_CM;
    const aP = Math.atan2(a.P.y-a.A.y, a.P.x-a.A.x);
    let delta = Math.atan2(a.Q.y-a.A.y, a.Q.x-a.A.x) - aP;
    while(delta>Math.PI) delta -= 2*Math.PI; while(delta<-Math.PI) delta += 2*Math.PI;
    const mg = 12*Math.PI/180, w = delta>0 ? [aP-mg, aP+delta+mg] : [aP+delta-mg, aP+mg];
    const aK = (c)=>Math.atan2(a.K.y-c.y, a.K.x-c.x), h = 16*Math.PI/180;
    const cp = await tbAiTakeOpening(rPx, null);
    await tbAiPutAway('regle_grad');
    await tbAiCompassArcs(cp, S(a.A), rPx, [w], 'construction');
    await tbAiMark(S(a.P), ''); await tbAiMark(S(a.Q), '');
    await tbAiPutAway('crayon');
    await tbAiCompassArcs(cp, S(a.P), rPx, [[aK(a.P)-h, aK(a.P)+h]], 'construction');
    await tbAiCompassArcs(cp, S(a.Q), rPx, [[aK(a.Q)-h, aK(a.Q)+h]], 'construction');
    await tbAiPutAway('compas');
    await tbAiMark(S(a.K), '');
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
  },
  /* Angle au rapporteur : centre sur le sommet, 0° sur le côté de référence, repère à la bonne
     graduation, puis demi-droite à la règle depuis le sommet par ce repère. */
  async angle(a){
    const S = tbAiPlan.S, A = S(a.A), B = S(a.B), dS = tbAiSd(a.dv);
    const phiS = tbAiAng(A,B), psi = tbAiVecAng(dS);
    let phi = phiS, alpha = tbAiNorm180(psi-phi);
    if(alpha>0){ phi = phiS+180; alpha = tbAiNorm180(psi-phi); }
    const pr = await tbAiBring('rapporteur', {x:A.x, y:A.y, angle:phi, rayAngle:-90});
    tbAiHighlight(A);
    await tbAiSleep(350);
    await tbAiMoveTool(pr, {rayAngle:alpha}, 1100);
    const Mk = S(a.Mk);
    tbAiHighlight(Mk);
    await tbAiSleep(400);
    tbPoints.push({id:tbPointNextId++, x:Mk.x, y:Mk.y, label:a.markName||'', labelDx:10, labelDy:-8});
    tbRender();
    await tbAiSleep(300);
    tbAiClearHighlights();
    await tbAiPutAway('rapporteur');
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
  },
  async mark_right_angle(a){
    const A = tbAiPlan.S(a.A), d1 = tbAiSd(a.u1), d2 = tbAiSd(a.u2);
    const useD1 = (-d1.y*d2.x + d1.x*d2.y) > 0;
    tbCodages.push({id:tbCodageNextId++, kind:'right', x:A.x, y:A.y, angle:tbAiVecAng(useD1 ? d1 : d2)});
    tbRender();
    await tbAiSleep(300);
  },
  async mark_equal(a){
    const S = tbAiPlan.S;
    a.segs.forEach(([p,q])=>{
      const P = S(p), Q = S(q);
      tbCodages.push({id:tbCodageNextId++, kind:'tick', x:(P.x+Q.x)/2, y:(P.y+Q.y)/2, angle:tbAiAng(P,Q), count:a.count});
    });
    tbRender();
    await tbAiSleep(300);
  },
  async label(a){
    let p;
    if(a.target && a.target.kind!=='circle'){
      const ex = tbAiExtent(a.target);
      const e = ex ? ex.b : tbAiPlan.S(a.target.p), n = ex ? {x:-ex.uS.y, y:ex.uS.x} : {x:0,y:-1};
      p = {x:e.x+n.x*14-6, y:e.y+n.y*14+6};
    } else if(a.target){
      const C = tbAiPlan.S(a.target.c), rPx = a.target.r*TB_PX_PER_CM;
      p = {x:C.x+rPx*0.72+6, y:C.y-rPx*0.72-6};
    } else {
      const P = tbAiPlan.S(a.at); p = {x:P.x+12, y:P.y+22};
    }
    tbTexts.push({id:tbTextNextId++, x:p.x, y:p.y, text:a.text, fontSize:17});
    tbRender();
    await tbAiSleep(300);
  },
};

/* ======================= IA : consigne, appel, extraction ======================= */
function tbAiBuildPrompt(enonce){
  return `Tu es professeur de mathématiques en France (collège). On te donne un énoncé de construction géométrique. Tu dois écrire le PROGRAMME DE CONSTRUCTION que le professeur réalise au tableau avec ses instruments (règle graduée, équerre, compas, rapporteur), dans l'ordre où il le ferait réellement devant la classe.

Tu ne calcules AUCUNE coordonnée : le logiciel calcule toute la géométrie et anime les instruments. Tu indiques seulement les longueurs (en cm), les angles (en degrés), les points et les objets tracés.

Réponds UNIQUEMENT par un tableau JSON d'étapes (aucun texte autour, pas de balises markdown). Noms de points : lettre majuscule (ex. "A", "B", "H"). Identifiants d'objets (droites, demi-droites, cercles) : courts, en minuscules (ex. "d1", "cA"), à donner dès qu'un objet servira plus tard (intersection, report sur une demi-droite...).

OPÉRATIONS DISPONIBLES :
- {"op":"point","name":"A"} : premier point de la figure (placé automatiquement). Pour un autre point "libre" : {"op":"point","name":"B","from":"A","dx":5,"dy":2} (décalage en cm, dy vers le haut). Point sur un objet : {"op":"point","name":"M","on":"d1","at":3} (à 3 cm du point de départ de l'objet).
- {"op":"segment_length","from":"A","to":"B","length":6} : SEGMENT DE LONGUEUR DONNÉE. Le 0 de la règle est posé sur A, on lit la graduation, on marque B, puis on trace [AB]. Option "direction" en degrés (0 = vers la droite, par défaut ; 90 = vers le haut). Avec "along":"d1", on reporte la longueur SUR une droite/demi-droite déjà tracée (on marque le point sans retracer). Option "id" pour réutiliser ce segment.
- {"op":"segment","from":"A","to":"B"} : segment entre deux points DÉJÀ construits (le trait s'arrête exactement en A et en B). Sert à fermer une figure. Inutile si ce côté est déjà tracé (le logiciel l'ignore alors).
- {"op":"line","id":"d","through":["A","B"]} : DROITE (AB), tracée de part et d'autre des deux points. Ou {"op":"line","id":"d","through":"A","direction":30}.
- {"op":"ray","id":"d","from":"A","through":"B"} : DEMI-DROITE [AB), partant exactement de A et dépassant B. Ou {"op":"ray","id":"d","from":"A","direction":60}.
- {"op":"perpendicular","id":"d1","through":"A","to":["A","B"],"kind":"ray","side":"up"} : PERPENDICULAIRE À L'ÉQUERRE à la droite (AB) (ou "to":"d" pour une droite déjà nommée) passant par A. "kind" : "line" (droite), "ray" (demi-droite qui part de la droite de référence), "segment" (segment du point jusqu'au pied, point hors de la droite). "side" (up/down/left/right) : de quel côté part la demi-droite quand le point est SUR la droite. "foot":"H" pour nommer le pied de la perpendiculaire quand le point est hors de la droite.
- {"op":"parallel","id":"d2","through":"M","to":["A","B"]} : PARALLÈLE à (AB) passant par M (équerre qui glisse le long de la règle). "kind":"line" par défaut.
- {"op":"circle","id":"c1","center":"B","radius":7} : COMPAS de centre B, écartement 7 cm pris sur la règle. Ou "radius_from":["A","C"] pour reporter la longueur AC (écartement pris directement sur la figure). S'il sert à trouver un point (intersection), seul un petit arc est tracé ; sinon le cercle complet ("full":true pour forcer le cercle complet).
- {"op":"intersect","name":"C","of":["d1","c1"],"pick":"up"} : on marque le point d'intersection de deux objets (droites, demi-droites, segments, cercles). "pick" (up/down/left/right) choisit l'intersection s'il y en a deux (par défaut : celle du haut).
- {"op":"midpoint","name":"I","of":["A","B"]} : MILIEU mesuré à la règle.
- {"op":"perpendicular_bisector","id":"m","of":["A","B"]} : MÉDIATRICE de [AB] au compas. Option "points":["E","F"] pour nommer les deux points d'intersection des arcs.
- {"op":"angle_bisector","id":"b","angle":["B","A","C"]} : BISSECTRICE de l'angle BAC (sommet au milieu) au compas.
- {"op":"angle","id":"dA","vertex":"A","from":"B","degrees":50,"side":"up"} : ANGLE AU RAPPORTEUR : demi-droite d'origine A faisant 50° avec [AB), du côté "side". Option "mark":"x" pour nommer le repère.
- {"op":"mark_right_angle","vertex":"A","points":["B","C"]} : codage de l'angle droit BAC.
- {"op":"mark_equal","segments":[["A","B"],["A","C"]],"count":1} : codage de longueurs égales.
- {"op":"label","text":"(d)","on":"d1"} : nom d'une droite ou d'un cercle.

STRATÉGIES CLASSIQUES (choisis celle que l'on enseigne pour l'énoncé) :
- Triangle connaissant les 3 longueurs : segment_length pour un côté, puis deux "circle" (centres aux extrémités, rayons les deux autres longueurs), "intersect" pour le 3e sommet, puis "segment" pour les deux côtés restants.
- Triangle rectangle en A (un côté de l'angle droit et l'hypoténuse) : segment_length [AB], "perpendicular" en A de kind "ray", "circle" de centre B de rayon l'hypoténuse, "intersect" C, "segment" [BC] ([AC] est déjà tracé par la demi-droite), "mark_right_angle".
- Triangle rectangle en A (les deux côtés de l'angle droit) : segment_length [AB], "perpendicular" en A (ray), segment_length de A à C avec "along", "segment" [BC], "mark_right_angle".
- Triangle connaissant deux longueurs et l'angle compris : segment_length [AB], "angle" en A, segment_length de A à C avec "along", "segment" [BC].
- Triangle connaissant une longueur et les deux angles adjacents : segment_length [AB], "angle" en A depuis B, "angle" en B depuis A (même "side"), "intersect" C.
- Triangle isocèle / équilatéral : cercles de même rayon ("circle" ou "radius_from") puis "intersect".
- Rectangle / carré : segment_length [AB], deux "perpendicular" (en A et en B, ray, même side), deux segment_length avec "along", "segment" pour fermer, codages.
- Losange : cercles de même rayon depuis deux sommets. Parallélogramme : "parallel" ou reports au compas ("radius_from").
- Milieu, médiatrice, bissectrice, perpendiculaire, parallèle : opérations dédiées ci-dessus.

EXEMPLE 1 -- "Construire un triangle ABC rectangle en A tel que AB = 4 cm et BC = 7 cm." :
[{"op":"point","name":"A"},{"op":"segment_length","from":"A","to":"B","length":4},{"op":"perpendicular","id":"dA","through":"A","to":["A","B"],"kind":"ray","side":"up"},{"op":"circle","id":"cB","center":"B","radius":7},{"op":"intersect","name":"C","of":["dA","cB"]},{"op":"segment","from":"B","to":"C"},{"op":"mark_right_angle","vertex":"A","points":["B","C"]}]

EXEMPLE 2 -- "Construire un triangle EFG tel que EF = 6 cm, EG = 4 cm et FG = 5 cm." :
[{"op":"point","name":"E"},{"op":"segment_length","from":"E","to":"F","length":6},{"op":"circle","id":"cE","center":"E","radius":4},{"op":"circle","id":"cF","center":"F","radius":5},{"op":"intersect","name":"G","of":["cE","cF"],"pick":"up"},{"op":"segment","from":"E","to":"G"},{"op":"segment","from":"F","to":"G"}]

EXEMPLE 3 -- "Construire un triangle RST tel que RS = 5 cm, l'angle SRT mesure 40° et RT = 3,5 cm." :
[{"op":"point","name":"R"},{"op":"segment_length","from":"R","to":"S","length":5},{"op":"angle","id":"dR","vertex":"R","from":"S","degrees":40,"side":"up"},{"op":"segment_length","from":"R","to":"T","length":3.5,"along":"dR"},{"op":"segment","from":"S","to":"T"}]

EXEMPLE 4 -- "Tracer une droite (d), un point M hors de (d), puis la parallèle à (d) passant par M." :
[{"op":"point","name":"A"},{"op":"point","name":"B","from":"A","dx":6,"dy":1},{"op":"line","id":"d","through":["A","B"]},{"op":"label","text":"(d)","on":"d"},{"op":"point","name":"M","from":"A","dx":2,"dy":3},{"op":"parallel","id":"d2","through":"M","to":"d"}]

RÈGLES :
- Respecte exactement les longueurs et angles de l'énoncé ; n'invente pas de donnée.
- N'utilise un point ou un objet qu'après l'avoir construit.
- Distingue bien segment [AB], demi-droite [AB) et droite (AB) selon l'énoncé.
- Termine TOUJOURS la figure complètement fermée (tous les côtés tracés).
- Au plus ${TB_AI_MAX_STEPS} étapes. Réponds uniquement par le JSON.

Énoncé :
"""
${enonce}
"""`;
}
function tbAiExtractJsonArrays(text){
  const candidates = [];
  for(let i=0;i<text.length;i++){
    if(text[i]!=='[') continue;
    let depth=0, inStr=false, esc=false;
    for(let j=i;j<text.length;j++){
      const c = text[j];
      if(inStr){ if(esc) esc=false; else if(c==='\\') esc=true; else if(c==='"') inStr=false; continue; }
      if(c==='"'){ inStr=true; continue; }
      if(c==='[') depth++;
      else if(c===']'){ depth--; if(depth===0){ candidates.push(text.slice(i,j+1)); break; } }
    }
  }
  return candidates;
}
/* Tolère une phrase d'introduction, des balises ```json``` ou un objet-enveloppe autour du
   tableau d'étapes (cf. historique : "l'IA n'a pas renvoyé un JSON exploitable"). */
function tbAiParseSteps(raw){
  const attempts = [raw.trim(), ...tbAiExtractJsonArrays(raw).sort((a,b)=>b.length-a.length)];
  for(const text of attempts){
    let parsed;
    try{ parsed = JSON.parse(text); } catch(e){ continue; }
    if(Array.isArray(parsed) && parsed.length && parsed.every(x=>x && typeof x==='object')) return parsed;
    if(parsed && typeof parsed==='object'){
      for(const k of Object.keys(parsed)) if(Array.isArray(parsed[k]) && parsed[k].length) return parsed[k];
    }
  }
  console.warn('tableau-ia : réponse non exploitable, réponse brute reçue :', raw);
  return null;
}

/* ======================= Interface : fenêtre + barre de lecture pas à pas ======================= */
function tbOpenAiModal(){
  document.getElementById('tbAiModalOverlay').style.display = 'flex';
  document.getElementById('tbAiStatus').textContent = '';
}
function tbCloseAiModal(){ document.getElementById('tbAiModalOverlay').style.display = 'none'; }

let tbAiPlanIndex = 0, tbAiBusy = false;
function tbAiPlaybackShow(){ const bar = document.getElementById('tbAiPlaybackBar'); if(bar) bar.style.display = 'flex'; }
function tbAiPlaybackHide(){
  const bar = document.getElementById('tbAiPlaybackBar'); if(bar) bar.style.display = 'none';
  tbAiPlan = null; tbAiPlanIndex = 0; tbAiOverlay = [];
}
function tbAiPlaybackUpdateUI(){
  const n = tbAiPlan ? tbAiPlan.actions.length : 0;
  const counter = document.getElementById('tbAiPlaybackCounter');
  if(counter) counter.textContent = 'Étape '+tbAiPlanIndex+' / '+n;
  const prev = document.getElementById('tbAiPlaybackPrev'), next = document.getElementById('tbAiPlaybackNext');
  if(prev) prev.disabled = tbAiBusy || tbAiPlanIndex<=0;
  if(next) next.disabled = tbAiBusy || !tbAiPlan || tbAiPlanIndex>=n;
}
async function tbAiPlaybackNext(){
  if(tbAiBusy || !tbAiPlan || tbAiPlanIndex>=tbAiPlan.actions.length) return;
  tbAiBusy = true; tbAiPlaybackUpdateUI();
  try{
    const a = tbAiPlan.actions[tbAiPlanIndex];
    await tbAiSteps[a.op](a);
  } finally {
    tbAiOverlay = [];
    tbTools = tbTools.filter(t=>!t.aiDriven);
    tbRenderPalette(); tbRender();
    tbPushHistory();
    tbAiPlanIndex++;
    tbAiBusy = false;
    tbAiPlaybackUpdateUI();
  }
}
function tbAiPlaybackPrev(){
  if(tbAiBusy || tbAiPlanIndex<=0) return;
  tbUndo(); tbAiPlanIndex--;
  tbAiPlaybackUpdateUI();
}
function tbAiPlaybackRestart(){
  if(tbAiBusy) return;
  while(tbAiPlanIndex>0){ tbUndo(); tbAiPlanIndex--; }
  tbAiPlaybackUpdateUI();
}
/* Charge un programme déjà écrit (utilisé par tbAiGenerate, et pratique pour tester). */
function tbAiLoadProgram(program){
  tbAiPlan = tbAiCompile(program);
  tbAiPlanIndex = 0;
  tbAiPlaybackShow();
  tbAiPlaybackUpdateUI();
  return tbAiPlan;
}
async function tbAiGenerate(){
  const enonce = document.getElementById('tbAiEnonce').value.trim();
  const status = document.getElementById('tbAiStatus'), btn = document.getElementById('tbAiGenerateBtn');
  if(!enonce){ status.textContent = "Écrivez d'abord un énoncé."; return; }
  if(!currentUser){ status.textContent = 'Connectez-vous pour utiliser cette fonctionnalité.'; return; }
  status.textContent = 'Préparation de la construction par IA…';
  btn.disabled = true;
  try{
    const raw = await callClaude(tbAiBuildPrompt(enonce), 3000, {feature:'tableau-ia'});
    const program = tbAiParseSteps(raw);
    if(!program){ status.textContent = "L'IA n'a pas renvoyé un programme exploitable -- réessayez."; return; }
    try{ tbAiLoadProgram(program); }
    catch(e){
      if(e instanceof TbAiError){ status.textContent = 'Construction impossible : '+e.message+' -- réessayez ou reformulez l\'énoncé.'; console.warn('tableau-ia : programme rejeté', program); return; }
      throw e;
    }
    tbCloseAiModal();
  }catch(err){
    status.textContent = 'Erreur : '+err.message;
  }finally{
    btn.disabled = false;
  }
}

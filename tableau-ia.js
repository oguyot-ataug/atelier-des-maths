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
  regle_grad:{x:0,y:340}, requerre2:{x:0,y:380}, equerre:{x:0,y:340}, rapporteur:{x:0,y:-360},
  compas:{x:280,y:-320}, crayon:{x:200,y:-240},
};
const TB_AI_PENCIL_ANGLE = 25;
// Longueur traçable d'un seul geste (px) : au-delà, la règle est trop courte (signalé : "la
// règle se place pour tracer un segment, mais elle peut être trop petite. Préférer alors la
// réquerre") ; au-delà de la réquerre, elle coulisse le long du tracé pour le prolonger.
const TB_AI_RULER_MAX = TB_RULER_L-20, TB_AI_REQ_MAX = TB_REQ2_L-30;       // crayon tenu légèrement penché, comme une main droite
const TB_AI_HL = '#E35D3A', TB_AI_HL2 = '#1F7A4D';

class TbAiError extends Error {}

/* Outils autorisés pour la construction (demandé : "permettre d'utiliser la réquerre dans
   l'énoncé ou de dire quels sont les outils autorisés, tous par défaut"). */
const TB_AI_TOOL_NAMES = {regle:'règle graduée', equerre:'équerre', requerre:'réquerre', compas:'compas', rapporteur:'rapporteur'};
let tbAiAllowed = new Set(Object.keys(TB_AI_TOOL_NAMES));
/* Couleurs des tracés (demandé : "permettre dans l'énoncé de dessiner des objets en couleur"). */
const TB_AI_COLORS = {noir:'#1C1B2E', rouge:'#D93025', bleu:'#0D5BA3', vert:'#1F7A4D', orange:'#E8710A', violet:'#7B3FA0', rose:'#D6337A', marron:'#8B5A2B', gris:'#6B7280'};
const TB_AI_COLOR_ALIASES = {black:'noir', red:'rouge', blue:'bleu', green:'vert', purple:'violet', pink:'rose', brown:'marron', grey:'gris', gray:'gris'};
function tbAiColor(c){
  if(typeof c!=='string') return null;
  const k = c.trim().toLowerCase();
  if(/^#[0-9a-f]{6}$/.test(k)) return k;
  return TB_AI_COLORS[k] || TB_AI_COLORS[TB_AI_COLOR_ALIASES[k]] || null;
}
let tbAiStrokeColor = null; // couleur des tracés de l'étape en cours (null = couleur du crayon)

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
function tbAiEvaluate(program, flips, allowed){
  allowed = allowed || tbAiAllowed;
  const pts = new Map(), objs = new Map(), actions = [], marks = [], lengths = [];
  // Longueurs données par l'énoncé, écrites sur la figure dès que le segment est tracé
  // (demandé : "écrire aussi les longueurs quand elles sont données").
  const given = (n1, n2, a, b, L)=>{
    if(!n1 || !n2) return;
    const key = [n1,n2].sort().join('|');
    if(!lengths.some(g=>g.key===key)) lengths.push({key, a, b, L});
  };
  const givenOnCircle = (o, name, X)=>{ if(o.kind==='circle' && o.centerName && o.showLen) given(o.centerName, name, o.c, X, o.r); };
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
      return {p:a, u:tbV.norm(tbV.sub(b,a)), obj:null, pts:[a,b]};
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
  // ---- outils autorisés ----
  const has = t=>allowed.has(t);
  const need = (i,t)=>{ if(!has(t)) err(i, 'outil non autorisé : '+TB_AI_TOOL_NAMES[t]); };
  const needStraight = i=>{ if(!has('regle') && !has('requerre')) err(i, 'il faut une règle ou une réquerre pour tracer un trait droit (non autorisées)'); };
  // Mesure d'une longueur (règle jusqu'à 15 cm, réquerre jusqu'à 10 cm depuis son 0).
  const gradTool = (i,L)=>{
    if(has('regle')) return 'regle_grad';
    if(has('requerre')){ if(L>10) err(i, 'longueur trop grande pour la réquerre (10 cm depuis son 0)'); return 'requerre2'; }
    err(i, 'mesure impossible : ni règle graduée ni réquerre autorisée');
  };
  // Écartement du compas pris sur un instrument gradué (la réquerre va de -10 à +10 cm).
  const openTool = (i,r,exact)=>{
    if(has('regle')) return 'regle_grad';
    if(has('requerre')) return 'requerre2';
    if(exact) err(i, 'écartement de '+r+' cm impossible à prendre sans règle graduée ni réquerre');
    return null;
  };
  // Instrument de la perpendiculaire / parallèle : celui demandé ("tool"), sinon le premier
  // autorisé parmi équerre, réquerre, compas.
  const squareMethod = (i,s,para)=>{
    const order = ['equerre','requerre','compas'];
    const ok = m=>has(m) && (m!=='equerre' || !para || has('regle'));
    if(s.tool!==undefined){
      if(!order.includes(s.tool)) err(i, '« tool » attendu : equerre, requerre ou compas');
      need(i, s.tool);
      if(!ok(s.tool)) err(i, 'la parallèle à l\'équerre demande aussi la règle (non autorisée)');
      return s.tool;
    }
    const m = order.find(ok);
    if(!m) err(i, (para?'parallèle':'perpendiculaire')+' impossible avec les outils autorisés');
    return m;
  };

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
          givenOnCircle(o, s.name, p);
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
        if(s.show_length!==false) given(s.from, s.to, A, B, L);
        register(i, s.id, linearObj('segment', A, u, L));
        if(!along) needStraight(i);
        actions.push({op:'segment_length', A, B, L, to:s.to, trace: !along, gtool: gradTool(i,L), style:s.style||'final'});
        break;
      }
      case 'segment': {
        const A = P(i,s.from), B = P(i,s.to), L = tbV.dist(A,B);
        if(L<1e-6) err(i, 'points confondus');
        register(i, s.id, linearObj('segment', A, tbV.norm(tbV.sub(B,A)), L));
        needStraight(i);
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
        needStraight(i);
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
        needStraight(i);
        const method = squareMethod(i,s,false);
        const act = {op:'perpendicular', method, H, n, uRef:L.u, support:{obj:L.obj, pts:L.pts}, obj:o, footName, style:s.style||'final'};
        if(method==='compas'){
          // Point sur la droite : un arc centré en M coupe la droite en P et Q, puis deux arcs
          // de même (plus grand) écartement depuis P et Q se coupent en K. Point hors de la
          // droite : l'arc centré en M coupe la droite en P et Q, les arcs depuis P et Q (même
          // écartement) se recoupent en K, symétrique de M.
          let r0, r1, h, K;
          if(onLine){ r0 = 2.5; r1 = 4; h = Math.sqrt(r1*r1-r0*r0); K = tbV.add(H, tbV.mul(n,h)); }
          else { r0 = Math.min(15, Math.ceil(Math.max(off+1.2, off*1.35)*2)/2); r1 = r0; h = Math.sqrt(r0*r0-off*off); K = tbV.sub(H, tbV.mul(n,off)); }
          const half = onLine ? r0 : h;
          const Pp = tbV.sub(H, tbV.mul(L.u,half)), Q = tbV.add(H, tbV.mul(L.u,half));
          const c0 = {kind:'circle', c:M, r:r0, hits:[]}, cP = {kind:'circle', c:Pp, r:r1, hits:[]}, cQ = {kind:'circle', c:Q, r:r1, hits:[]};
          hit(c0,Pp); hit(c0,Q); hit(cP,K); hit(cQ,K); hit(o,K);
          if(L.obj){ hit(L.obj,Pp); hit(L.obj,Q); }
          marks.push(Pp,Q,K);
          Object.assign(act, {P:Pp, Q, K, r0, r1, c0, cP, cQ, otool: openTool(i,r0,false)});
        }
        actions.push(act);
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
        needStraight(i);
        const method = squareMethod(i,s,true);
        const act = {op:'parallel', method, M, H, d, n:tbV.norm(tbV.sub(M,H)), uRef:L.u, obj:o, style:s.style||'final'};
        if(method==='compas'){
          // Parallélogramme : A0, B0 sur la droite, N tel que A0B0NM parallélogramme (MN = A0B0
          // reporté depuis M, B0N = A0M reporté depuis B0), puis la droite (MN).
          let A0, B0, needMarks = false;
          if(L.pts && tbV.dist(L.pts[0],L.pts[1])>=2 && tbV.dist(L.pts[0],L.pts[1])<=12){ [A0,B0] = L.pts; }
          else { A0 = tbV.sub(H, tbV.mul(L.u,2)); B0 = tbV.add(H, tbV.mul(L.u,2)); needMarks = true; }
          const N = tbV.add(M, tbV.sub(B0,A0));
          const cM = {kind:'circle', c:M, r:tbV.dist(A0,B0), hits:[]}, cB = {kind:'circle', c:B0, r:tbV.dist(A0,M), hits:[]};
          hit(cM,N); hit(cB,N); hit(o,N);
          if(L.obj){ hit(L.obj,A0); hit(L.obj,B0); }
          marks.push(A0,B0,N);
          Object.assign(act, {A0, B0, N, cM, cB, needMarks});
        }
        actions.push(act);
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
        need(i,'compas');
        const o = register(i, s.id, {kind:'circle', c:C, r, hits:[], full:!!s.full, centerName: from ? null : s.center, showLen: s.show_length!==false});
        actions.push({op:'circle', C, r, from, obj:o, gtool: from ? null : openTool(i,r,true), style:s.style});
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
        if(s.name){ newName(i,s.name); addPoint(s.name,X); givenOnCircle(o1, s.name, X); givenOnCircle(o2, s.name, X); } else marks.push(X);
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
        actions.push({op:'midpoint', A, B, I, L, name:s.name, gtool: gradTool(i,L)});
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
        need(i,'compas'); needStraight(i);
        actions.push({op:'perpendicular_bisector', A, B, r, E, F, ca, cb, obj:o, names, otool: openTool(i,r,false), style:s.style||'final'});
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
        need(i,'compas'); needStraight(i);
        actions.push({op:'angle_bisector', A, P:Pp, Q, K, r, obj:o, otool: openTool(i,r,false), style:s.style||'final'});
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
        need(i,'rapporteur'); needStraight(i);
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
      case 'mark_angle': {
        const A = P(i,s.vertex);
        if(!Array.isArray(s.points) || s.points.length!==2) err(i, '« points » doit lister deux points');
        const u1 = tbV.norm(tbV.sub(P(i,s.points[0]),A)), u2 = tbV.norm(tbV.sub(P(i,s.points[1]),A));
        const deg = Math.acos(Math.max(-1, Math.min(1, tbV.dot(u1,u2))))*180/Math.PI;
        actions.push({op:'mark_angle', A, u1, u2, text: s.value===false ? '' : tbAiFmtDeg(deg), count: Math.max(1, Math.min(3, Math.round(s.count||1)))});
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
    const last = actions[actions.length-1];
    if(last && s.color!==undefined){
      const c = tbAiColor(s.color);
      if(!c) err(i, 'couleur inconnue « '+s.color+' » (noir, rouge, bleu, vert, orange, violet, rose, marron, gris)');
      last.color = c;
    }
  });
  return {actions, objs, pts, marks, lengths};
}

/* Longueur tracée des objets linéaires, arcs de compas, puis mise en page à l'échelle réelle. */
function tbAiFinalize(ev){
  const allObjs = new Set(ev.objs.values());
  ev.actions.forEach(a=>{ ['obj','ca','cb','c0','cP','cQ','cM','cB'].forEach(k=>{ if(a[k]) allObjs.add(a[k]); }); });
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
  // Tous les traits droits qui seront tracés : un nom de point posé tôt les évite déjà.
  const future = [];
  ev.actions.forEach(a=>{
    let p = null, q = null;
    if(a.op==='segment_length'){ if(a.trace){ p = a.A; q = a.B; } }
    else if(a.op==='segment'){ p = a.A; q = a.B; }
    else if(a.obj && a.obj.kind!=='circle'){ p = tbV.add(a.obj.p, tbV.mul(a.obj.u,a.obj.e0)); q = tbV.add(a.obj.p, tbV.mul(a.obj.u,a.obj.e1)); }
    if(p){ const P = S(p), Q = S(q); future.push({ax:P.x, ay:P.y, bx:Q.x, by:Q.y, r:1.5}); }
  });
  const sb = box.map(S);
  const screenBox = {x0:Math.min(...sb.map(p=>p.x))-30, x1:Math.max(...sb.map(p=>p.x))+30, y0:Math.min(...sb.map(p=>p.y))-30, y1:Math.max(...sb.map(p=>p.y))+30};
  return {actions: ev.actions, S, centroid: cen, lengths: ev.lengths, future, screenBox};
}

function tbAiCompile(program, allowed){
  if(!Array.isArray(program) || !program.length) throw new TbAiError('réponse vide ou pas une liste d\'étapes');
  if(program.length>TB_AI_MAX_STEPS) throw new TbAiError('trop d\'étapes ('+program.length+', maximum '+TB_AI_MAX_STEPS+')');
  const flips = new Set();
  for(let attempt=0; attempt<8; attempt++){
    try{ return tbAiFinalize(tbAiEvaluate(program, flips, allowed)); }
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
  const stroke = {id:tbNextId++, color:tbAiStrokeColor||tbCurrentColor(), construction: style==='construction', straight:true, points:[[a.x,a.y]]};
  tbInk.push(stroke);
  const n = Math.max(10, Math.round(Math.hypot(b.x-a.x, b.y-a.y)/4));
  for(let k=1;k<=n;k++){
    const x = a.x+(b.x-a.x)*k/n, y = a.y+(b.y-a.y)*k/n;
    stroke.points.push([x,y]); pen.x = x; pen.y = y;
    tbRender();
    await tbAiSleep(14);
  }
}
/* Pose un point au crayon (petite croix + nom placé là où il ne chevauche aucun tracé). */
async function tbAiMark(p, label){
  await tbAiPencilTo(p, 420);
  const pt = {id:tbPointNextId++, x:p.x, y:p.y, label:label||'', aiLabel:true};
  if(pt.label) Object.assign(pt, tbAiBestLabelOffset(pt, tbAiObstacles({point:pt, future:true})));
  tbPoints.push(pt);
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
/* ---------- Placement des noms de points et des longueurs (signalé : "pour les labels des
   points, ne pas les superposer sur des tracés") ----------
   Obstacles = "capsules" (segment + épaisseur) : traits tracés (et, pour un nom posé en cours
   de construction, ceux qui restent à tracer), croix des points, codages, textes et autres
   noms. Chaque étiquette est un rectangle ; on garde la position candidate la plus dégagée. */
function tbAiPtSegDist(px, py, s){
  const dx = s.bx-s.ax, dy = s.by-s.ay, l2 = dx*dx+dy*dy;
  const t = l2 ? Math.max(0, Math.min(1, ((px-s.ax)*dx+(py-s.ay)*dy)/l2)) : 0;
  return Math.hypot(px-(s.ax+t*dx), py-(s.ay+t*dy));
}
function tbAiSegHitsRect(s, R){
  let t0 = 0, t1 = 1; const dx = s.bx-s.ax, dy = s.by-s.ay;
  const pp = [-dx, dx, -dy, dy], qq = [s.ax-(R.cx-R.hw), (R.cx+R.hw)-s.ax, s.ay-(R.cy-R.hh), (R.cy+R.hh)-s.ay];
  for(let k=0;k<4;k++){
    if(pp[k]===0){ if(qq[k]<0) return false; continue; }
    const r = qq[k]/pp[k];
    if(pp[k]<0){ if(r>t1) return false; if(r>t0) t0 = r; } else { if(r<t0) return false; if(r<t1) t1 = r; }
  }
  return true;
}
function tbAiRectClearance(R, obs){
  const pr = (x,y)=>Math.hypot(Math.max(0, Math.abs(x-R.cx)-R.hw), Math.max(0, Math.abs(y-R.cy)-R.hh));
  let m = Infinity;
  for(const s of obs){
    let d;
    if(tbAiSegHitsRect(s,R)) d = 0;
    else d = Math.min(pr(s.ax,s.ay), pr(s.bx,s.by),
      tbAiPtSegDist(R.cx-R.hw, R.cy-R.hh, s), tbAiPtSegDist(R.cx+R.hw, R.cy-R.hh, s),
      tbAiPtSegDist(R.cx+R.hw, R.cy+R.hh, s), tbAiPtSegDist(R.cx-R.hw, R.cy+R.hh, s));
    d -= s.r;
    if(d<m) m = d;
  }
  return m;
}
function tbAiLabelRect(pt){
  const w = Math.max(10, (pt.label||'').length*10.5), lx = pt.x+(pt.labelDx!==undefined?pt.labelDx:11), ly = pt.y+(pt.labelDy!==undefined?pt.labelDy:-8);
  return {cx:lx+w/2, cy:ly-6, hw:w/2, hh:7};
}
function tbAiTextRect(t){
  const w = t.text.length*t.fontSize*0.55;
  return {cx:t.x+w/2, cy:t.y-t.fontSize/2+2, hw:w/2, hh:t.fontSize/2};
}
function tbAiObstacles(opt){
  const o = opt||{}, obs = [];
  const seg = (ax,ay,bx,by,r)=>obs.push({ax,ay,bx,by,r});
  const box = R=>seg(R.cx-R.hw, R.cy, R.cx+R.hw, R.cy, R.hh);
  tbInk.forEach(st=>{
    const P = st.points, r = st.construction ? 1 : 1.5;
    if(P.length<2) return;
    if(st.straight) seg(P[0][0],P[0][1],P[P.length-1][0],P[P.length-1][1],r);
    else for(let k=1;k<P.length;k++) seg(P[k-1][0],P[k-1][1],P[k][0],P[k][1],r);
  });
  if(o.future && tbAiPlan && tbAiPlan.future) obs.push(...tbAiPlan.future);
  tbPoints.forEach(q=>{
    seg(q.x,q.y,q.x,q.y,8);
    if(q!==o.point && q.label) box(tbAiLabelRect(q));
  });
  tbCodages.forEach(c=>{
    if(c.kind==='arc'){
      const r = c.r||13, a1 = c.angle1*Math.PI/180; let d = (c.angle2-c.angle1)*Math.PI/180;
      while(d>Math.PI) d -= 2*Math.PI; while(d<-Math.PI) d += 2*Math.PI;
      for(let k=0;k<6;k++){ const u = a1+d*k/6, v = a1+d*(k+1)/6; seg(c.x+r*Math.cos(u), c.y+r*Math.sin(u), c.x+r*Math.cos(v), c.y+r*Math.sin(v), c.count>2?5:2); }
    } else if(c.kind==='right'){
      const a = c.angle*Math.PI/180;
      seg(c.x+5*(Math.cos(a)-Math.sin(a)), c.y+5*(Math.sin(a)+Math.cos(a)), c.x+5*(Math.cos(a)-Math.sin(a)), c.y+5*(Math.sin(a)+Math.cos(a)), 8);
    } else seg(c.x,c.y,c.x,c.y,7);
  });
  tbTexts.forEach(t=>{ if(t!==o.text) box(tbAiTextRect(t)); });
  return obs;
}
const tbAiInBoard = R=>R.cx-R.hw>4 && R.cx+R.hw<896 && R.cy-R.hh>4 && R.cy+R.hh<556;
/* Meilleur décalage du nom d'un point : tout autour du point, de préférence vers l'extérieur
   de la figure, le plus près possible tant qu'il ne touche rien. */
function tbAiBestLabelOffset(pt, obs){
  const w = Math.max(10, pt.label.length*10.5), hw = w/2, hh = 7;
  const c = tbAiPlan ? tbAiPlan.centroid : pt;
  let ox = pt.x-c.x, oy = pt.y-c.y; const ol = Math.hypot(ox,oy);
  if(ol>1){ ox/=ol; oy/=ol; } else { ox = 0.6; oy = -0.8; }
  let best = null;
  for(let k=0;k<24;k++){
    const th = k*Math.PI/12, dx = Math.cos(th), dy = Math.sin(th);
    for(const gap of [5,10,16,24]){
      const ext = Math.abs(dx)*hw + Math.abs(dy)*hh;
      const R = {cx:pt.x+dx*(gap+ext), cy:pt.y+dy*(gap+ext), hw, hh};
      const clr = tbAiRectClearance(R, obs);
      const score = Math.min(clr,8)*10 + (dx*ox+dy*oy)*6 - gap*0.7 + (tbAiInBoard(R)?0:-1000);
      if(!best || score>best.score) best = {score, R, clr};
    }
  }
  return {labelDx: best.R.cx-hw-pt.x, labelDy: best.R.cy+6-pt.y};
}
/* En fin d'étape : un nom que de nouveaux tracés (arcs, codages, textes...) viennent toucher
   est déplacé ; les autres ne bougent pas. */
function tbAiLayoutLabels(){
  tbPoints.forEach(pt=>{
    if(!pt.aiLabel || !pt.label) return;
    const obs = tbAiObstacles({point:pt});
    if(tbAiRectClearance(tbAiLabelRect(pt), obs) >= 3) return;
    Object.assign(pt, tbAiBestLabelOffset(pt, obs));
  });
}
function tbAiFmtCm(L){
  const r = Math.round(L*10)/10;
  return (Number.isInteger(r) ? String(r) : String(r).replace('.',','))+' cm';
}
/* Écrit chaque longueur donnée par l'énoncé dès que son segment est tracé : le long du
   segment, de préférence à l'extérieur de la figure et sans chevaucher aucun tracé. */
function tbAiWriteLengths(){
  if(!tbAiPlan || !tbAiPlan.lengths) return;
  const S = tbAiPlan.S, c = tbAiPlan.centroid;
  tbAiPlan.lengths.forEach(g=>{
    if(tbTexts.some(t=>t.aiLen===g.key)) return;
    const A = S(g.a), B = S(g.b);
    if(!tbAiAlreadyTraced(A,B)) return;
    const text = tbAiFmtCm(g.L), fs = 15, hw = text.length*fs*0.55/2, hh = fs/2;
    const u = tbAiUnit(A,B), obs = tbAiObstacles({});
    let best = null;
    for(const sg of [1,-1]) for(const f of [0.5,0.4,0.6,0.3,0.7]) for(const gap of [4,8,14]){
      const nx = -u.y*sg, ny = u.x*sg, M = {x:A.x+(B.x-A.x)*f, y:A.y+(B.y-A.y)*f};
      const ext = Math.abs(nx)*hw + Math.abs(ny)*hh;
      const R = {cx:M.x+nx*(gap+ext), cy:M.y+ny*(gap+ext), hw, hh};
      const clr = tbAiRectClearance(R, obs), out = (nx*(M.x-c.x)+ny*(M.y-c.y)) > 0 ? 1 : -1;
      const score = Math.min(clr,8)*10 + out*8 - Math.abs(f-0.5)*30 - gap*0.6 + (tbAiInBoard(R)?0:-1000);
      if(!best || score>best.score) best = {score, R};
    }
    tbTexts.push({id:tbTextNextId++, x:best.R.cx-hw, y:best.R.cy+fs/2-2, text, fontSize:fs, aiLen:g.key});
  });
}
/* ---------- Codages (demandé : "coder les figures -- angles droits, valeurs des angles :
   juste la valeur") ---------- */
function tbAiFmtDeg(deg){
  const r = Math.round(deg*10)/10;
  return (Number.isInteger(r) ? String(r) : String(r).replace('.',','))+'°';
}
/* Petit carré d'angle droit au sommet V, entre les directions écran d1 et d2 (unitaires). */
function tbAiCodeRightAngle(V, d1, d2){
  if(tbCodages.some(c=>c.kind==='right' && Math.hypot(c.x-V.x, c.y-V.y)<3)) return;
  const useD1 = (-d1.y*d2.x + d1.x*d2.y) > 0;
  tbCodages.push({id:tbCodageNextId++, kind:'right', x:V.x, y:V.y, angle:tbAiVecAng(useD1 ? d1 : d2)});
}
/* Arc d'angle au sommet V entre d1 et d2 (le plus petit des deux angles), avec éventuellement
   sa valeur écrite seule ("40°"), placée dans l'angle le long de la bissectrice. */
function tbAiCodeAngle(V, d1, d2, text, count){
  if(tbCodages.some(c=>c.kind==='arc' && Math.hypot(c.x-V.x, c.y-V.y)<3 && Math.abs(tbAiNorm180(c.angle1-tbAiVecAng(d1)))<1 && Math.abs(tbAiNorm180(c.angle2-tbAiVecAng(d2)))<1)) return;
  const a1 = tbAiVecAng(d1), a2 = tbAiVecAng(d2);
  const r = text ? 22 : 26;
  tbCodages.push({id:tbCodageNextId++, kind:'arc', x:V.x, y:V.y, angle:a1, angle1:a1, angle2:a2, count:count||1, r});
  if(!text) return;
  let bx = d1.x+d2.x, by = d1.y+d2.y; const bl = Math.hypot(bx,by);
  if(bl<1e-6){ bx = -d1.y; by = d1.x; } else { bx/=bl; by/=bl; }
  const deg = Math.acos(Math.max(-1, Math.min(1, d1.x*d2.x+d1.y*d2.y)))*180/Math.PI;
  const dist = r+16+Math.max(0, 40-deg)*0.6, fs = 15, w = text.length*fs*0.55;
  tbTexts.push({id:tbTextNextId++, x:V.x+bx*dist-w/2, y:V.y+by*dist+fs/2-2, text, fontSize:fs});
}
/* Traits de longueurs égales au milieu de [P,Q] (écran). */
function tbAiCodeTicks(P, Q, count){
  tbCodages.push({id:tbCodageNextId++, kind:'tick', x:(P.x+Q.x)/2, y:(P.y+Q.y)/2, angle:tbAiAng(P,Q), count:count||1});
}
const tbAiUnit = (from,to)=>{ const dx=to.x-from.x, dy=to.y-from.y, l=Math.hypot(dx,dy)||1; return {x:dx/l, y:dy/l}; };

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
/* Règle (ou réquerre) posée avec son bord de tracé sur la droite (from,to), centrée sur la
   portion à tracer, le corps de l'outil du côté opposé à la figure (pour ne pas la masquer). */
function tbAiRulerThrough(from, to, type){
  const req = type==='requerre2', L = req ? TB_REQ2_L : TB_RULER_L, edge = req ? 4 : 0;
  const d = tbV.norm({x:to.x-from.x, y:to.y-from.y}), m = {x:(from.x+to.x)/2, y:(from.y+to.y)/2}, c = tbAiPlan.centroid;
  let a = tbAiVecAng(d);
  const body0 = tbAiDirDeg(a+90);
  if(body0.x*(m.x-c.x)+body0.y*(m.y-c.y) < -0.5) a += 180;
  const dd = tbAiDirDeg(a), body = tbAiDirDeg(a+90);
  return {x:m.x-dd.x*L/2-body.x*edge, y:m.y-dd.y*L/2-body.y*edge, angle:a};
}
/* Trait droit de from à to le long d'une règle ; si la règle est trop courte, la réquerre
   (plus longue) ; si même la réquerre ne suffit pas, elle coulisse le long du tracé et le
   crayon reprend là où il s'était arrêté. "skip" = [s0,s1] (px depuis from) : portion déjà
   tracée (ex. le long de l'équerre), que le crayon ne repasse pas. */
async function tbAiRuledStroke(from, to, style, skip){
  const len = Math.hypot(to.x-from.x, to.y-from.y);
  if(len<1) return;
  const canR = tbAiAllowed.has('regle'), canQ = tbAiAllowed.has('requerre');
  const type = (canR && (len<=TB_AI_RULER_MAX || !canQ)) ? 'regle_grad' : 'requerre2';
  await tbAiPutAway(type==='regle_grad' ? 'requerre2' : 'regle_grad', 'equerre', 'rapporteur', 'compas');
  const maxL = type==='regle_grad' ? TB_AI_RULER_MAX : TB_AI_REQ_MAX;
  const n = Math.ceil(len/maxL), u = {x:(to.x-from.x)/len, y:(to.y-from.y)/len};
  for(let k=0;k<n;k++){
    const c0 = len*k/n, c1 = len*(k+1)/n;
    const tool = tbAiFindTool(type);
    await tbAiBring(type, tbAiRulerThrough(tbAiAt(from,u,c0), tbAiAt(from,u,c1), type), tool ? 700 : 550);
    const pieces = skip ? [[c0, Math.min(c1, skip[0])], [Math.max(c0, skip[1]), c1]] : [[c0,c1]];
    for(const [p0,p1] of pieces) if(p1>p0+1) await tbAiTraceLine(tbAiAt(from,u,p0), tbAiAt(from,u,p1), style);
  }
}
/* Instrument gradué posé avec la graduation 0 (décalée de shiftPx) sur P, bord gradué dans la
   direction ang (degrés écran). Règle : 0 à l'origine de l'outil ; réquerre : 0 au pied du
   traversant (x=233), sur le bord principal (y=4). */
function tbAiGradPose(type, P, ang, shiftPx){
  const req = type==='requerre2', lx = (req ? 233 : 0) + (shiftPx||0), ly = req ? 4 : 0;
  const ex = tbAiDirDeg(ang), ey = tbAiDirDeg(ang+90);
  return {x:P.x-ex.x*lx-ey.x*ly, y:P.y-ex.y*lx-ey.y*ly, angle:ang};
}
/* Écartement du compas : pris sur la règle posée en bas du tableau (rayon connu en cm), ou
   directement sur la figure entre deux points (report de longueur). */
async function tbAiTakeOpening(rPx, fromPts, gtool){
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
  if(gtool===undefined) gtool = tbAiAllowed.has('regle') ? 'regle_grad' : tbAiAllowed.has('requerre') ? 'requerre2' : null;
  if(!gtool){
    // Aucun instrument gradué autorisé : écartement libre (seul compte d'avoir le même).
    const cp = await tbAiBring('compas', {x:B.x, y:B.y-30, angle:0, radius:30, mode:'open'});
    await tbAiMoveTool(cp, {radius:rPx}, 700);
    await tbAiSleep(300);
    return cp;
  }
  // Réquerre : graduée de -10 à +10 cm autour de son 0 ; au-delà de 10 cm, la pointe part de -10.
  const shift = (gtool==='requerre2' && rPx>10*TB_PX_PER_CM) ? -10*TB_PX_PER_CM : 0;
  await tbAiBring(gtool, tbAiGradPose(gtool, B, 0, shift));
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
    const stroke = {id:tbNextId++, color:tbAiStrokeColor||tbCurrentColor(), construction: style==='construction', points:[]};
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

/* ---- Perpendiculaire à la réquerre : le traversant (perpendiculaire au bord principal) repose
   SUR le tracé de référence et coulisse le long de lui jusqu'au pied ; le crayon suit le bord
   principal, qui est alors perpendiculaire à la droite. ---- */
const TB_REQ_TRAV_X = 233, TB_REQ_EDGE_Y = 4, TB_REQ_CENTER_Y = 69, TB_REQ_REACH = 225;
function tbAiReqPose(P, ang, lx, ly){
  const ex = tbAiDirDeg(ang), ey = tbAiDirDeg(ang+90);
  return {x:P.x-ex.x*lx-ey.x*ly, y:P.y-ex.y*lx-ey.y*ly, angle:ang};
}
async function tbAiPerpRequerre(a, H, nS, dS){
  const ang = tbAiVecAng(dS)-90; // axe du traversant (y local) = dS, le long du tracé
  const start = tbAiAt(H, dS, 70);
  await tbAiBring('requerre2', tbAiReqPose(start, ang, TB_REQ_TRAV_X, TB_REQ_EDGE_Y));
  await tbAiSleep(200);
  await tbAiMoveTool(tbAiFindTool('requerre2'), tbAiReqPose(H, ang, TB_REQ_TRAV_X, TB_REQ_EDGE_Y), 650);
  const ex = tbAiExtent(a.obj);
  if(ex){
    const s0 = Math.max(ex.t0, -TB_REQ_REACH), s1 = Math.min(ex.t1, TB_REQ_REACH);
    if(s1>s0+1) await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,s0), tbAiAt(ex.pS,ex.uS,s1), a.style);
    if(ex.t1>s1+2 || ex.t0<s0-2){
      await tbAiPutAway('requerre2','crayon');
      await tbAiRuledStroke(ex.a, ex.b, a.style, [s0-ex.t0, s1-ex.t0]);
    }
  }
  if(a.footName){ await tbAiPutAway('requerre2','regle_grad'); await tbAiMark(H, a.footName); }
  await tbAiPutAwayAll();
  tbAiCodeRightAngle(H, dS, nS);
  tbRender();
}
/* ---- Perpendiculaire au compas (règle et compas seulement) ---- */
async function tbAiPerpCompas(a){
  const S = tbAiPlan.S, H = S(a.H), nS = tbAiSd(a.n), r0 = a.r0*TB_PX_PER_CM, r1 = a.r1*TB_PX_PER_CM;
  let cp = await tbAiTakeOpening(r0, null, a.otool);
  await tbAiPutAway('regle_grad','requerre2');
  await tbAiCompassArcs(cp, S(a.c0.c), r0, tbAiArcWindows(a.c0, 16), 'construction');
  if(Math.abs(r1-r0)>0.5){ cp = await tbAiTakeOpening(r1, null, a.otool); await tbAiPutAway('regle_grad','requerre2'); }
  await tbAiCompassArcs(cp, S(a.cP.c), r1, tbAiArcWindows(a.cP, 16), 'construction');
  await tbAiCompassArcs(cp, S(a.cQ.c), r1, tbAiArcWindows(a.cQ, 16), 'construction');
  await tbAiPutAway('compas');
  await tbAiMark(S(a.K), '');
  const ex = tbAiExtent(a.obj);
  if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
  if(a.footName){ await tbAiPutAway('regle_grad','requerre2'); await tbAiMark(H, a.footName); }
  await tbAiPutAwayAll();
  const uS = tbAiSd(a.uRef);
  tbAiCodeRightAngle(H, uS, nS);
  tbRender();
}
/* ---- Parallèle à la réquerre : la ligne centrale (parallèle au bord principal) posée sur la
   droite, puis la réquerre coulisse perpendiculairement jusqu'à ce que le bord principal passe
   par le point ; tracé le long du bord. ---- */
async function tbAiParaRequerre(a){
  const S = tbAiPlan.S, nS = tbAiSd(a.n), dPx = a.d*TB_PX_PER_CM;
  const ex = tbAiExtent(a.obj);
  if(!ex){ await tbAiPutAwayAll(); return; }
  const ang = tbAiVecAng({x:-nS.x, y:-nS.y})-90; // y local (vers le corps) = du point vers la droite
  const tc = (ex.t0+ex.t1)/2;
  const C = tbAiAt(ex.pS, ex.uS, tc);
  const fin = tbAiReqPose(C, ang, TB_REQ2_L/2, TB_REQ_EDGE_Y);
  const shift = dPx-(TB_REQ_CENTER_Y-TB_REQ_EDGE_Y);
  await tbAiBring('requerre2', {x:fin.x-nS.x*shift, y:fin.y-nS.y*shift, angle:ang});
  await tbAiSleep(300);
  await tbAiMoveTool(tbAiFindTool('requerre2'), {x:fin.x, y:fin.y}, 1000);
  const s0 = Math.max(ex.t0, tc-TB_REQ_REACH), s1 = Math.min(ex.t1, tc+TB_REQ_REACH);
  await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,s0), tbAiAt(ex.pS,ex.uS,s1), a.style);
  if(ex.t1>s1+2 || ex.t0<s0-2){
    await tbAiPutAway('requerre2','crayon');
    await tbAiRuledStroke(ex.a, ex.b, a.style, [s0-ex.t0, s1-ex.t0]);
  }
  await tbAiPutAwayAll();
}
/* ---- Parallèle au compas : construction d'un parallélogramme A0B0NM. ---- */
async function tbAiParaCompas(a){
  const S = tbAiPlan.S, A0 = S(a.A0), B0 = S(a.B0), M = S(a.M);
  if(a.needMarks){ await tbAiMark(A0, ''); await tbAiMark(B0, ''); await tbAiPutAway('crayon'); }
  let cp = await tbAiTakeOpening(a.cM.r*TB_PX_PER_CM, [A0, B0]);
  await tbAiCompassArcs(cp, M, a.cM.r*TB_PX_PER_CM, tbAiArcWindows(a.cM, 16), 'construction');
  cp = await tbAiTakeOpening(a.cB.r*TB_PX_PER_CM, [A0, M]);
  await tbAiCompassArcs(cp, B0, a.cB.r*TB_PX_PER_CM, tbAiArcWindows(a.cB, 16), 'construction');
  await tbAiPutAway('compas');
  await tbAiMark(S(a.N), '');
  const ex = tbAiExtent(a.obj);
  if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
  await tbAiPutAwayAll();
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
    await tbAiBring(a.gtool, tbAiGradPose(a.gtool, A, tbAiAng(A,B)));
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
  /* Perpendiculaire à l'équerre : un côté de l'angle droit posé SUR la partie déjà tracée de la
     droite de référence (signalé : l'équerre "n'est finalement posée sur aucun objet" quand elle
     reposait sur le prolongement non tracé), elle coulisse le long de ce tracé jusqu'au pied, le
     crayon suit l'autre côté ; prolongement à la règle si nécessaire. Une équerre ne se
     retourne pas : selon le côté où part la perpendiculaire, c'est le petit ou le grand côté de
     l'angle droit qui repose sur le tracé. */
  async perpendicular(a){
    const S = tbAiPlan.S, H = S(a.H), nS = tbAiSd(a.n), uS = tbAiSd(a.uRef);
    if(a.method==='compas') return tbAiPerpCompas(a);
    let sA = null, sB = null;
    if(a.support.obj){ const e = tbAiExtent(a.support.obj); if(e){ sA = e.a; sB = e.b; } }
    else if(a.support.pts){ sA = S(a.support.pts[0]); sB = S(a.support.pts[1]); }
    let dS = uS;
    if(sA){
      const far = Math.hypot(sA.x-H.x, sA.y-H.y) > Math.hypot(sB.x-H.x, sB.y-H.y) ? sA : sB;
      if(Math.hypot(far.x-H.x, far.y-H.y) > 1) dS = tbV.norm({x:far.x-H.x, y:far.y-H.y});
    }
    if(a.method==='requerre') return tbAiPerpRequerre(a, H, nS, dS);
    // leg1 de l'équerre = leg0 tourné de +90° à l'écran : (x,y) -> (-y,x).
    const leg0OnLine = (-dS.y*nS.x + dS.x*nS.y) > 0;
    const ang = leg0OnLine ? tbAiVecAng(dS) : tbAiVecAng(nS);
    const legMax = leg0OnLine ? TB_EQUERRE_LEGY-8 : TB_EQUERRE_LEGX-12;
    const start = tbAiAt(H, dS, 70);
    await tbAiBring('equerre', {x:start.x, y:start.y, angle:ang});
    await tbAiSleep(200);
    await tbAiMoveTool(tbAiFindTool('equerre'), {x:H.x, y:H.y}, 650);
    const ex = tbAiExtent(a.obj);
    if(ex){
      const s0 = Math.max(0,ex.t0), s1 = Math.min(ex.t1, legMax);
      if(s1>s0+1) await tbAiTraceLine(tbAiAt(ex.pS,ex.uS,s0), tbAiAt(ex.pS,ex.uS,s1), a.style);
      if(ex.t1>legMax+2 || ex.t0<-2){
        await tbAiPutAway('equerre','crayon');
        await tbAiRuledStroke(ex.a, ex.b, a.style, [Math.max(0,s0)-ex.t0, s1-ex.t0]);
      }
    }
    if(a.footName){ await tbAiPutAway('equerre','regle_grad'); await tbAiMark(H, a.footName); }
    await tbAiPutAwayAll();
    tbAiCodeRightAngle(H, dS, nS);
    tbRender();
  },
  /* Parallèle : équerre posée sur la droite, règle contre l'autre côté de l'équerre, l'équerre
     glisse le long de la règle jusqu'au point, puis tracé le long de l'équerre. */
  async parallel(a){
    if(a.method==='compas') return tbAiParaCompas(a);
    if(a.method==='requerre') return tbAiParaRequerre(a);
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
      await tbAiRuledStroke(tbAiAt(M,leg0,s0), tbAiAt(M,leg0,s1), a.style, [0, e1-s0]);
    }
    await tbAiPutAwayAll();
  },
  async circle(a){
    const S = tbAiPlan.S, C = S(a.C), rPx = a.r*TB_PX_PER_CM;
    const style = a.style || ((a.obj.full || !a.obj.hits.length) ? 'final' : 'construction');
    const cp = await tbAiTakeOpening(rPx, a.from ? [S(a.from[0]), S(a.from[1])] : null, a.gtool);
    if(!a.from) await tbAiPutAway('regle_grad','requerre2');
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
    await tbAiBring(a.gtool, tbAiGradPose(a.gtool, A, tbAiAng(A,B)));
    tbAiHighlight(A); await tbAiSleep(450);
    tbAiHighlight(B); await tbAiSleep(550);
    tbAiHighlight(I, TB_AI_HL2); await tbAiSleep(500);
    await tbAiMark(I, a.name);
    tbAiClearHighlights();
    await tbAiPutAwayAll();
    if(tbAiAlreadyTraced(A,B)){ tbAiCodeTicks(A,I,1); tbAiCodeTicks(I,B,1); tbRender(); }
  },
  /* Médiatrice au compas : même écartement depuis A puis depuis B, deux points d'intersection,
     droite qui passe par ces deux points. */
  async perpendicular_bisector(a){
    const S = tbAiPlan.S, rPx = a.r*TB_PX_PER_CM;
    const cp = await tbAiTakeOpening(rPx, null, a.otool);
    await tbAiPutAway('regle_grad','requerre2');
    await tbAiCompassArcs(cp, S(a.A), rPx, tbAiArcWindows(a.ca, 16), 'construction');
    await tbAiCompassArcs(cp, S(a.B), rPx, tbAiArcWindows(a.cb, 16), 'construction');
    await tbAiPutAway('compas');
    await tbAiMark(S(a.E), a.names[0]||'');
    await tbAiMark(S(a.F), a.names[1]||'');
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
    const As = S(a.A), Bs = S(a.B), I = S(tbV.mid(a.A,a.B));
    if(tbAiAlreadyTraced(As,Bs)){
      tbAiCodeTicks(As,I,1); tbAiCodeTicks(I,Bs,1);
      tbAiCodeRightAngle(I, tbAiUnit(I,Bs), tbAiUnit(I,S(a.E)));
      tbRender();
    }
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
    const cp = await tbAiTakeOpening(rPx, null, a.otool);
    await tbAiPutAway('regle_grad','requerre2');
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
    // Les deux angles égaux, codés à l'identique (arc barré).
    const As = S(a.A), dK = tbAiUnit(As, S(a.K));
    tbAiCodeAngle(As, tbAiUnit(As, S(a.P)), dK, '', 3);
    tbAiCodeAngle(As, dK, tbAiUnit(As, S(a.Q)), '', 3);
    tbRender();
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
    const mkPt = {id:tbPointNextId++, x:Mk.x, y:Mk.y, label:a.markName||'', aiLabel:true};
    if(mkPt.label) Object.assign(mkPt, tbAiBestLabelOffset(mkPt, tbAiObstacles({point:mkPt, future:true})));
    tbPoints.push(mkPt);
    tbRender();
    await tbAiSleep(300);
    tbAiClearHighlights();
    await tbAiPutAway('rapporteur');
    const ex = tbAiExtent(a.obj);
    if(ex) await tbAiRuledStroke(ex.a, ex.b, a.style);
    await tbAiPutAwayAll();
    tbAiCodeAngle(A, tbAiUnit(A,B), dS, tbAiFmtDeg(a.deg), 1);
    tbRender();
  },
  async mark_right_angle(a){
    tbAiCodeRightAngle(tbAiPlan.S(a.A), tbAiSd(a.u1), tbAiSd(a.u2));
    tbRender();
    await tbAiSleep(300);
  },
  async mark_angle(a){
    tbAiCodeAngle(tbAiPlan.S(a.A), tbAiSd(a.u1), tbAiSd(a.u2), a.text, a.count);
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
function tbAiBuildPrompt(enonce, tools){
  const allowedT = tools && tools.length ? tools : Object.keys(TB_AI_TOOL_NAMES);
  const forbidden = Object.keys(TB_AI_TOOL_NAMES).filter(t=>!allowedT.includes(t));
  const toolsLine = 'OUTILS AUTORISÉS : '+allowedT.map(t=>TB_AI_TOOL_NAMES[t]).join(', ')+'.'
    + (forbidden.length ? ' OUTILS INTERDITS : '+forbidden.map(t=>TB_AI_TOOL_NAMES[t]).join(', ')+' -- n\'utilise aucune opération qui en a besoin.' : '');
  return `Tu es professeur de mathématiques en France (collège). On te donne un énoncé de construction géométrique. Tu dois écrire le PROGRAMME DE CONSTRUCTION que le professeur réalise au tableau avec ses instruments (règle graduée, équerre, compas, rapporteur), dans l'ordre où il le ferait réellement devant la classe.

${toolsLine}
Besoins des opérations : segment_length et midpoint = règle graduée (ou réquerre, 10 cm max) ; segment, line, ray = règle ou réquerre ; circle, perpendicular_bisector, angle_bisector = compas ; angle = rapporteur ; perpendicular et parallel = équerre, réquerre OU compas (le logiciel prend le premier autorisé, ou celui indiqué par "tool").

Tu ne calcules AUCUNE coordonnée : le logiciel calcule toute la géométrie et anime les instruments. Tu indiques seulement les longueurs (en cm), les angles (en degrés), les points et les objets tracés.

Réponds UNIQUEMENT par un tableau JSON d'étapes (aucun texte autour, pas de balises markdown). Noms de points : lettre majuscule (ex. "A", "B", "H"). Identifiants d'objets (droites, demi-droites, cercles) : courts, en minuscules (ex. "d1", "cA"), à donner dès qu'un objet servira plus tard (intersection, report sur une demi-droite...).

OPÉRATIONS DISPONIBLES :
- {"op":"point","name":"A"} : premier point de la figure (placé automatiquement). Pour un autre point "libre" : {"op":"point","name":"B","from":"A","dx":5,"dy":2} (décalage en cm, dy vers le haut). Point sur un objet : {"op":"point","name":"M","on":"d1","at":3} (à 3 cm du point de départ de l'objet).
- {"op":"segment_length","from":"A","to":"B","length":6} : SEGMENT DE LONGUEUR DONNÉE. Le 0 de la règle est posé sur A, on lit la graduation, on marque B, puis on trace [AB]. Option "direction" en degrés (0 = vers la droite, par défaut ; 90 = vers le haut). Avec "along":"d1", on reporte la longueur SUR une droite/demi-droite déjà tracée (on marque le point sans retracer). Option "id" pour réutiliser ce segment.
- {"op":"segment","from":"A","to":"B"} : segment entre deux points DÉJÀ construits (le trait s'arrête exactement en A et en B). Sert à fermer une figure. Inutile si ce côté est déjà tracé (le logiciel l'ignore alors).
- {"op":"line","id":"d","through":["A","B"]} : DROITE (AB), tracée de part et d'autre des deux points. Ou {"op":"line","id":"d","through":"A","direction":30}.
- {"op":"ray","id":"d","from":"A","through":"B"} : DEMI-DROITE [AB), partant exactement de A et dépassant B. Ou {"op":"ray","id":"d","from":"A","direction":60}.
- {"op":"perpendicular","id":"d1","through":"A","to":["A","B"],"kind":"ray","side":"up"} : PERPENDICULAIRE À L'ÉQUERRE à la droite (AB) (ou "to":"d" pour une droite déjà nommée) passant par A. Option "tool" : "equerre", "requerre" ou "compas" pour imposer l'instrument quand l'énoncé le précise (ex. « à la réquerre », « à la règle et au compas ») ; sinon ne la mets pas. "kind" : "line" (droite), "ray" (demi-droite qui part de la droite de référence), "segment" (segment du point jusqu'au pied, point hors de la droite). "side" (up/down/left/right) : de quel côté part la demi-droite quand le point est SUR la droite. "foot":"H" pour nommer le pied de la perpendiculaire quand le point est hors de la droite.
- {"op":"parallel","id":"d2","through":"M","to":["A","B"]} : PARALLÈLE à (AB) passant par M (équerre qui glisse le long de la règle, réquerre, ou parallélogramme au compas). "kind":"line" par défaut. Même option "tool" que ci-dessus.
- {"op":"circle","id":"c1","center":"B","radius":7} : COMPAS de centre B, écartement 7 cm pris sur la règle. Ou "radius_from":["A","C"] pour reporter la longueur AC (écartement pris directement sur la figure). S'il sert à trouver un point (intersection), seul un petit arc est tracé ; sinon le cercle complet ("full":true pour forcer le cercle complet).
- {"op":"intersect","name":"C","of":["d1","c1"],"pick":"up"} : on marque le point d'intersection de deux objets (droites, demi-droites, segments, cercles). "pick" (up/down/left/right) choisit l'intersection s'il y en a deux (par défaut : celle du haut).
- {"op":"midpoint","name":"I","of":["A","B"]} : MILIEU mesuré à la règle.
- {"op":"perpendicular_bisector","id":"m","of":["A","B"]} : MÉDIATRICE de [AB] au compas. Option "points":["E","F"] pour nommer les deux points d'intersection des arcs.
- {"op":"angle_bisector","id":"b","angle":["B","A","C"]} : BISSECTRICE de l'angle BAC (sommet au milieu) au compas.
- {"op":"angle","id":"dA","vertex":"A","from":"B","degrees":50,"side":"up"} : ANGLE AU RAPPORTEUR : demi-droite d'origine A faisant 50° avec [AB), du côté "side". Option "mark":"x" pour nommer le repère.
- {"op":"mark_right_angle","vertex":"A","points":["B","C"]} : codage de l'angle droit BAC.
- {"op":"mark_angle","vertex":"A","points":["B","C"]} : arc de l'angle BAC avec sa valeur seule (ex. "60°", calculée automatiquement). "value":false pour l'arc seul, "count" (1 à 3) pour coder des angles égaux.
- {"op":"mark_equal","segments":[["A","B"],["A","C"]],"count":1} : codage de longueurs égales.
- {"op":"label","text":"(d)","on":"d1"} : nom d'une droite ou d'un cercle.

CODAGE : sont codés AUTOMATIQUEMENT (ne les ajoute pas) les angles droits construits à l'équerre ("perpendicular"), les angles construits au rapporteur ("angle", arc + valeur), la médiatrice (angle droit + milieu) et la bissectrice (angles égaux). Ajoute toi-même les autres codages qui décrivent la figure demandée : angles droits obtenus autrement (ex. les 4 angles d'un rectangle, sauf ceux déjà construits à l'équerre), longueurs égales (triangle isocèle ou équilatéral, losange, carré, milieu), valeurs d'angles données par l'énoncé et non construites au rapporteur.

COULEURS : si l'énoncé demande un tracé en couleur, ajoute "color" à l'étape qui le trace (segment_length, segment, line, ray, perpendicular, parallel, circle, perpendicular_bisector, angle_bisector, angle) : "noir", "rouge", "bleu", "vert", "orange", "violet", "rose", "marron" ou "gris". Ex. {"op":"line","id":"d","through":["A","B"],"color":"rouge"}. Sinon, ne mets pas "color". Les arcs de construction restent gris.

LONGUEURS : les longueurs données sont écrites AUTOMATIQUEMENT sur la figure (ex. "4 cm") : celle d'un "segment_length", et le rayon d'un "circle" (en cm) quand le point obtenu sur ce cercle est relié au centre par un segment tracé. N'ajoute pas de "label" pour elles. Pour une longueur auxiliaire qui n'est pas une donnée de l'énoncé, ajoute "show_length":false (sur "segment_length" ou "circle").

STRATÉGIES CLASSIQUES (choisis celle que l'on enseigne pour l'énoncé) :
- Triangle connaissant les 3 longueurs : segment_length pour un côté, puis deux "circle" (centres aux extrémités, rayons les deux autres longueurs), "intersect" pour le 3e sommet, puis "segment" pour les deux côtés restants.
- Triangle rectangle en A (un côté de l'angle droit et l'hypoténuse) : segment_length [AB], "perpendicular" en A de kind "ray", "circle" de centre B de rayon l'hypoténuse, "intersect" C, "segment" [BC] ([AC] est déjà tracé par la demi-droite ; l'angle droit est codé automatiquement).
- Triangle rectangle en A (les deux côtés de l'angle droit) : segment_length [AB], "perpendicular" en A (ray), segment_length de A à C avec "along", "segment" [BC].
- Triangle connaissant deux longueurs et l'angle compris : segment_length [AB], "angle" en A, segment_length de A à C avec "along", "segment" [BC].
- Triangle connaissant une longueur et les deux angles adjacents : segment_length [AB], "angle" en A depuis B, "angle" en B depuis A (même "side"), "intersect" C.
- Triangle isocèle / équilatéral : cercles de même rayon ("circle" ou "radius_from") puis "intersect".
- Rectangle / carré : segment_length [AB], deux "perpendicular" (en A et en B, ray, même side), deux segment_length avec "along", "segment" pour fermer, puis "mark_right_angle" pour les deux autres angles (et "mark_equal" pour un carré).
- Losange : cercles de même rayon depuis deux sommets. Parallélogramme : "parallel" ou reports au compas ("radius_from").
- Milieu, médiatrice, bissectrice, perpendiculaire, parallèle : opérations dédiées ci-dessus.
- Sans rapporteur : un angle de 90° = "perpendicular", 60° = triangle équilatéral au compas ("circle" + "intersect"), 45° ou 30° = "angle_bisector" d'un angle de 90° ou 60°.

EXEMPLE 1 -- "Construire un triangle ABC rectangle en A tel que AB = 4 cm et BC = 7 cm." :
[{"op":"point","name":"A"},{"op":"segment_length","from":"A","to":"B","length":4},{"op":"perpendicular","id":"dA","through":"A","to":["A","B"],"kind":"ray","side":"up"},{"op":"circle","id":"cB","center":"B","radius":7},{"op":"intersect","name":"C","of":["dA","cB"]},{"op":"segment","from":"B","to":"C"}]

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
const TB_AI_TOOLS_KEY = 'tbAiAllowedTools';
function tbAiReadToolChecks(){
  const tools = [...document.querySelectorAll('#tbAiToolChecks input[type=checkbox]')].filter(c=>c.checked).map(c=>c.value);
  try{ localStorage.setItem(TB_AI_TOOLS_KEY, JSON.stringify(tools)); }catch(e){}
  return tools;
}
function tbOpenAiModal(){
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(TB_AI_TOOLS_KEY)||'null'); }catch(e){}
  document.querySelectorAll('#tbAiToolChecks input[type=checkbox]').forEach(c=>{ c.checked = Array.isArray(saved) ? saved.includes(c.value) : true; });
  document.getElementById('tbAiModalOverlay').style.display = 'flex';
  document.getElementById('tbAiStatus').textContent = '';
}
function tbCloseAiModal(){ document.getElementById('tbAiModalOverlay').style.display = 'none'; }

let tbAiPlanIndex = 0, tbAiBusy = false;
function tbAiPlaybackShow(){
  const bar = document.getElementById('tbAiPlaybackBar'); if(bar) bar.style.display = 'flex';
  // Dans l'outil « Animation géométrique », la fenêtre a ses propres boutons de fermeture.
  const close = document.getElementById('tbAiCloseBtn');
  if(close) close.style.display = (tbAiBorrow && tbAiBorrow.mode==='tool') ? 'none' : '';
}
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
    tbAiStrokeColor = a.color || null;
    await tbAiSteps[a.op](a);
  } finally {
    tbAiStrokeColor = null;
    tbAiOverlay = [];
    tbTools = tbTools.filter(t=>!t.aiDriven);
    try{ tbAiWriteLengths(); tbAiLayoutLabels(); }catch(e){ console.warn('tableau-ia : mise en page', e); }
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
function tbAiLoadProgram(program, tools){
  const allowed = new Set((tools && tools.length ? tools : Object.keys(TB_AI_TOOL_NAMES)).filter(t=>TB_AI_TOOL_NAMES[t]));
  const plan = tbAiCompile(program, allowed);
  tbAiAllowed = allowed;
  tbAiPlan = plan;
  plan.program = program; plan.tools = [...allowed];
  tbAiPlanIndex = 0;
  // Zoom sur la figure (demandé : "zoomer la zone de travail car parfois les constructions sont
  // un peu trop petites") -- les outils, à la même échelle, restent justes.
  // Zoom limité (~×1,6) : au-delà, règle et réquerre remplissent tout l'écran et le geste
  // devient illisible.
  if(typeof tbZoomFit==='function' && plan.screenBox){
    const b = plan.screenBox, cx = (b.x0+b.x1)/2, cy = (b.y0+b.y1)/2;
    const w = Math.max(b.x1-b.x0, 560), h = Math.max(b.y1-b.y0, 350);
    tbZoomFit({x0:cx-w/2, x1:cx+w/2, y0:cy-h/2, y1:cy+h/2});
  }
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
    const tools = tbAiReadToolChecks();
    if(!tools.length){ status.textContent = 'Cochez au moins un outil.'; return; }
    const raw = await callClaude(tbAiBuildPrompt(enonce, tools), 3000, {feature:'tableau-ia'});
    const program = tbAiParseSteps(raw);
    if(!program){ status.textContent = "L'IA n'a pas renvoyé un programme exploitable -- réessayez."; return; }
    try{ tbAiLoadProgram(program, tools); }
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

/* ======================= Exercices corrigés ======================= */
/* Le tableau (et sa barre de lecture) peut être "emprunté" dans une fenêtre : outil « Animation
   géométrique » de l'outil de correction, ou lecture d'une construction depuis un exercice
   corrigé. Son contenu, son historique et son zoom sont sauvegardés puis rétablis au retour --
   le tableau personnel n'est jamais touché. */
let tbAiBorrow = null;
function tbAiBorrowBoard(container, mode){
  if(tbAiBorrow || tbAiBusy) return false;
  if(typeof initTableauView==='function') initTableauView();
  const wrap = document.getElementById('tbBoardWrap'), bar = document.getElementById('tbAiPlaybackBar');
  if(!container || !wrap || !bar) return false;
  tbAiBorrow = {
    mode, snap: tbSnapshot(), hist: tbHistory.slice(), histIdx: tbHistoryIndex,
    zoom: tbZoom, center: tbViewCenter, plan: tbAiPlan, planIdx: tbAiPlanIndex, allowed: tbAiAllowed,
    wrapHome: [wrap.parentNode, wrap.nextSibling], barHome: [bar.parentNode, bar.nextSibling], barDisplay: bar.style.display,
  };
  container.appendChild(bar); container.appendChild(wrap);
  tbAiResetBorrowedBoard();
  return true;
}
function tbAiResetBorrowedBoard(){
  tbTools = []; tbInk = []; tbPoints = []; tbTexts = []; tbCodages = [];
  tbBackground = 'blank'; tbBgImageIdx = null;
  tbAiPlan = null; tbAiPlanIndex = 0; tbAiOverlay = [];
  tbZoom = 1; tbViewCenter = null;
  tbHistory = []; tbHistoryIndex = -1; tbPushHistory();
  const bar = document.getElementById('tbAiPlaybackBar'); if(bar) bar.style.display = 'none';
  tbRender();
}
async function tbAiReturnBoard(){
  if(!tbAiBorrow) return;
  tbAiAutoPlay = false;
  while(tbAiBusy) await new Promise(r=>setTimeout(r, 50)); // termine proprement le geste en cours
  const P = tbAiBorrow, wrap = document.getElementById('tbBoardWrap'), bar = document.getElementById('tbAiPlaybackBar');
  P.wrapHome[0].insertBefore(wrap, P.wrapHome[1]);
  P.barHome[0].insertBefore(bar, P.barHome[1]);
  tbAiBorrow = null;
  tbTools = tbTools.filter(t=>!t.aiDriven); tbAiOverlay = [];
  tbAiPlan = P.plan; tbAiPlanIndex = P.planIdx; tbAiAllowed = P.allowed;
  tbZoom = P.zoom; tbViewCenter = P.center;
  tbRestoreSnapshot(P.snap);
  tbHistory = P.hist; tbHistoryIndex = P.histIdx;
  if(typeof tbUpdateHistoryButtons==='function') tbUpdateHistoryButtons();
  if(typeof tbUpdateZoomLabel==='function') tbUpdateZoomLabel();
  tbAiPlaybackShow();
  bar.style.display = tbAiPlan ? 'flex' : 'none';
  tbAiPlaybackUpdateUI();
}

/* Bloc "exercice corrigé" : la figure finale (vectorielle, à l'échelle) + un bouton qui rejoue
   la construction dans une fenêtre, par-dessus l'exercice. */
function tbAiFigureBBox(){
  const xs = [], ys = [];
  const add = (x,y)=>{ xs.push(x); ys.push(y); };
  tbInk.forEach(st=>st.points.forEach(p=>add(p[0],p[1])));
  tbPoints.forEach(p=>{ add(p.x-8,p.y-8); add(p.x+8,p.y+8); if(p.label){ const R = tbAiLabelRect(p); add(R.cx-R.hw,R.cy-R.hh); add(R.cx+R.hw,R.cy+R.hh); } });
  tbTexts.forEach(t=>{ const R = tbAiTextRect(t); add(R.cx-R.hw-4,R.cy-R.hh-4); add(R.cx+R.hw+4,R.cy+R.hh+4); });
  tbCodages.forEach(c=>{ add(c.x-16,c.y-16); add(c.x+16,c.y+16); });
  if(!xs.length) return null;
  return {x0:Math.max(0,Math.min(...xs)-12), y0:Math.max(0,Math.min(...ys)-12), x1:Math.min(900,Math.max(...xs)+12), y1:Math.min(560,Math.max(...ys)+12)};
}
async function tbAiFinishPlan(){
  if(!tbAiPlan || tbAiPlanIndex>=tbAiPlan.actions.length) return;
  tbAiAutoPlay = false;
  while(tbAiBusy) await new Promise(r=>setTimeout(r, 50));
  const speed = tbAiSpeed;
  tbAiSetSpeed('0.02');
  while(tbAiPlan && tbAiPlanIndex<tbAiPlan.actions.length) await tbAiPlaybackNext();
  tbAiSpeed = speed;
}
function tbAiFigureBlockHtml(){
  tbRender();
  const bb = tbAiFigureBBox(), layer = document.getElementById('tbInkLayer');
  if(!bb || !layer) return null;
  const g = layer.cloneNode(true);
  g.removeAttribute('id');
  g.querySelectorAll('[data-role]').forEach(el=>el.removeAttribute('data-role'));
  g.querySelectorAll('[pointer-events]').forEach(el=>{ if(el.getAttribute('fill')==='transparent') el.remove(); });
  const w = bb.x1-bb.x0, h = bb.y1-bb.y0;
  let replay = '';
  if(tbAiPlan && tbAiPlan.program){
    const payload = escapeHtml(JSON.stringify({program:tbAiPlan.program, tools:tbAiPlan.tools})).replace(/"/g,'&quot;');
    replay = `<div style="margin-top:4px;"><button type="button" class="btn secondary" style="font-size:.8rem;padding:4px 12px;" data-tbprog="${payload}" onclick="event.stopPropagation(); if(window.tbAiReplayFromBlock) tbAiReplayFromBlock(this);"><span class="gicon">play_circle</span> Voir la construction pas à pas</button></div>`;
  }
  return `<div class="tb-ai-figure" style="text-align:center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${bb.x0.toFixed(1)} ${bb.y0.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" width="${w.toFixed(0)}" style="max-width:100%;height:auto;">${g.innerHTML}</svg>${replay}</div>`;
}

/* ---- Outil « Animation géométrique » de l'outil de correction (demandé : "une fois
   l'exercice ouvert, avoir un outil en plus des autres : Animation géométrique"). ---- */
let geoAnimData = null; // {enonce, program, tools} de la construction en cours dans l'outil
function geoAnimSetTools(tools){
  let saved = tools || null;
  if(!saved){ try{ saved = JSON.parse(localStorage.getItem(TB_AI_TOOLS_KEY)||'null'); }catch(e){} }
  document.querySelectorAll('#geoAnimToolChecks input[type=checkbox]').forEach(c=>{ c.checked = Array.isArray(saved) ? saved.includes(c.value) : true; });
}
function geoAnimReadTools(){
  const tools = [...document.querySelectorAll('#geoAnimToolChecks input[type=checkbox]')].filter(c=>c.checked).map(c=>c.value);
  try{ localStorage.setItem(TB_AI_TOOLS_KEY, JSON.stringify(tools)); }catch(e){}
  return tools;
}
function openGeoAnimTool(data){
  const ov = document.getElementById('geoAnimOverlay');
  if(!ov || tbAiBorrow) return;
  if(!tbAiBorrowBoard(document.getElementById('geoAnimStage'), 'tool')) return;
  ov.style.display = 'flex';
  geoAnimData = null;
  document.getElementById('geoAnimEnonce').value = (data && data.enonce) || '';
  document.getElementById('geoAnimStatus').textContent = '';
  geoAnimSetTools(data && data.tools);
  document.getElementById('geoAnimInsertBtn').disabled = true;
  if(data && Array.isArray(data.program)){
    try{ geoAnimLoad(data.enonce||'', data.program, data.tools); }
    catch(e){ document.getElementById('geoAnimStatus').textContent = 'Construction illisible : '+e.message; }
  }
}
/* Modifier un bloc déjà inséré : rouvre l'outil avec son énoncé et sa construction. */
function reopenGeoAnimBlock(data){ openGeoAnimTool(data); }
function geoAnimLoad(enonce, program, tools){
  tbAiResetBorrowedBoard();
  tbAiLoadProgram(program, tools);
  geoAnimData = {enonce, program, tools: tbAiPlan.tools};
  document.getElementById('geoAnimInsertBtn').disabled = false;
}
async function geoAnimGenerate(){
  const enonce = document.getElementById('geoAnimEnonce').value.trim();
  const status = document.getElementById('geoAnimStatus'), btn = document.getElementById('geoAnimGenerateBtn');
  if(!enonce){ status.textContent = "Écrivez d'abord un énoncé."; return; }
  const tools = geoAnimReadTools();
  if(!tools.length){ status.textContent = 'Cochez au moins un outil.'; return; }
  if(tbAiBusy){ tbAiAutoPlay = false; status.textContent = 'Patientez la fin du geste en cours…'; return; }
  status.textContent = 'Préparation de la construction par IA…';
  btn.disabled = true;
  try{
    const raw = await callClaude(tbAiBuildPrompt(enonce, tools), 3000, {feature:'tableau-ia'});
    const program = tbAiParseSteps(raw);
    if(!program){ status.textContent = "L'IA n'a pas renvoyé un programme exploitable -- réessayez."; return; }
    try{ geoAnimLoad(enonce, program, tools); }
    catch(e){
      if(e instanceof TbAiError){ status.textContent = 'Construction impossible : '+e.message+' -- réessayez ou reformulez l\'énoncé.'; console.warn('tableau-ia : programme rejeté', program); return; }
      throw e;
    }
    status.textContent = 'Construction prête : « Lecture » pour la voir en entier, puis « Insérer dans l\'exercice ».';
  }catch(err){
    status.textContent = 'Erreur : '+err.message;
  }finally{
    btn.disabled = false;
  }
}
async function geoAnimInsert(){
  if(!geoAnimData) return;
  const btn = document.getElementById('geoAnimInsertBtn');
  btn.disabled = true;
  await tbAiFinishPlan();
  const html = tbAiFigureBlockHtml();
  const data = JSON.parse(JSON.stringify(geoAnimData));
  await tbAiReturnBoard();
  document.getElementById('geoAnimOverlay').style.display = 'none';
  geoAnimData = null;
  if(!html){ await niceAlert('La construction est vide : rien à insérer.'); return; }
  addPendingBlock('geoanim', html, data, 'reopenGeoAnimBlock');
}
async function geoAnimCancel(){
  if(typeof cancelBlockEdit==='function') cancelBlockEdit();
  geoAnimData = null;
  await tbAiReturnBoard();
  document.getElementById('geoAnimOverlay').style.display = 'none';
}

/* "Voir la construction pas à pas" (bloc d'un exercice corrigé) : l'animation se joue dans une
   fenêtre PAR-DESSUS l'exercice (cahier élève, outil de correction), sans quitter la page. */
function tbAiReplayFromBlock(btn){
  let d;
  try{ d = JSON.parse(btn.getAttribute('data-tbprog')); }catch(e){ return; }
  if(!d || !Array.isArray(d.program)) return;
  tbAiOpenPlayer(d);
}
function tbAiOpenPlayer(d){
  const ov = document.getElementById('tbAiPlayerOverlay');
  if(!ov || !tbAiBorrowBoard(document.getElementById('tbAiPlayerBody'), 'player')) return;
  ov.style.display = 'flex';
  try{ tbAiLoadProgram(d.program, d.tools); }
  catch(e){ tbAiClosePlayer(); niceAlert('Construction illisible : '+e.message); }
}
async function tbAiClosePlayer(){
  if(!tbAiBorrow || tbAiBorrow.mode!=='player') return;
  await tbAiReturnBoard();
  document.getElementById('tbAiPlayerOverlay').style.display = 'none';
}
/* Croix de la barre de lecture : ferme la fenêtre de lecture, ou termine la lecture sur le tableau. */
function tbAiPlaybackClose(){
  if(tbAiBorrow){ if(tbAiBorrow.mode==='player') tbAiClosePlayer(); }
  else tbAiPlaybackHide();
}
/* Lecture continue : enchaîne toutes les étapes (un clic de plus met en pause après l'étape). */
let tbAiAutoPlay = false;
function tbAiUpdatePlayAllBtn(){
  const b = document.getElementById('tbAiPlayAllBtn');
  if(b) b.innerHTML = tbAiAutoPlay ? '<span class="gicon">pause</span> Pause' : '<span class="gicon">play_arrow</span> Lecture';
}
async function tbAiPlayAll(){
  if(tbAiAutoPlay){ tbAiAutoPlay = false; tbAiUpdatePlayAllBtn(); return; }
  if(!tbAiPlan || tbAiBusy) return;
  if(tbAiPlanIndex>=tbAiPlan.actions.length) tbAiPlaybackRestart();
  tbAiAutoPlay = true; tbAiUpdatePlayAllBtn();
  while(tbAiAutoPlay && tbAiPlan && tbAiPlanIndex<tbAiPlan.actions.length){
    await tbAiPlaybackNext();
    if(tbAiAutoPlay) await tbAiSleep(450);
  }
  tbAiAutoPlay = false; tbAiUpdatePlayAllBtn();
}

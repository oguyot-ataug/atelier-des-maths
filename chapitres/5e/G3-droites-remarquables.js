/* ============================================================
   CHAPITRE : Droites remarquables dans un triangle (5e, G3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Utilise les fonctions globales angleArcPoints(vertex,p1,p2,r) et
   angleDegrees(vertex,p1,p2) déjà définies dans index.html, en plus de
   quelques fonctions vectorielles locales (préfixe dr).
   ============================================================ */

function drSub(a,b){ return {x:a.x-b.x, y:a.y-b.y}; }
function drAdd(a,b){ return {x:a.x+b.x, y:a.y+b.y}; }
function drScale(a,k){ return {x:a.x*k, y:a.y*k}; }
function drNorm(v){ const l=Math.hypot(v.x,v.y)||1; return {x:v.x/l, y:v.y/l}; }
function drDot(a,b){ return a.x*b.x + a.y*b.y; }
function drDist(a,b){ return Math.hypot(a.x-b.x, a.y-b.y); }
function drPerp(v){ return {x:-v.y, y:v.x}; }
function drMid(a,b){ return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}; }
function drLineIntersection(p1,d1,p2,d2){
  const denom = d1.x*d2.y - d1.y*d2.x;
  if(Math.abs(denom)<1e-9) return null;
  const t = ((p2.x-p1.x)*d2.y - (p2.y-p1.y)*d2.x)/denom;
  return drAdd(p1, drScale(d1,t));
}
function drFoot(P,A,B){
  const AB = drSub(B,A);
  const t = drDot(drSub(P,A), AB) / drDot(AB,AB);
  return drAdd(A, drScale(AB,t));
}
function drBisectorDir(V,P1,P2){ return drNorm(drAdd(drNorm(drSub(P1,V)), drNorm(drSub(P2,V)))); }
function drExtendLine(p, dir, len){ return [drAdd(p, drScale(dir,-len)), drAdd(p, drScale(dir,len))]; }

function drLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||12}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}
function drRightMark(foot, dirAlong, dirPerp, size){
  size = size||9;
  const p1 = drAdd(foot, drScale(dirAlong, size));
  const p2 = drAdd(p1, drScale(dirPerp, size));
  const p3 = drAdd(foot, drScale(dirPerp, size));
  return `<polyline points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>`;
}
function drTick(mid, dir, size){
  size = size||5;
  const perp = drPerp(dir);
  const p1 = drAdd(mid, drScale(perp, size));
  const p2 = drAdd(mid, drScale(perp, -size));
  return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1C1B2E" stroke-width="1.4"/>`;
}
/* Codage à n traits (1, 2 ou 3), pour distinguer plusieurs paires de milieux
   codés simultanément sur une même figure (chaque côté doit avoir un nombre
   de traits différent, jamais le même codage pour deux côtés distincts). */
function drTickN(mid, dir, size, n){
  size = size||5;
  const perp = drPerp(dir);
  const spacing = 3.2;
  let out = '';
  for(let i=0;i<n;i++){
    const offset = (i-(n-1)/2)*spacing;
    const base = drAdd(mid, drScale(dir, offset));
    const p1 = drAdd(base, drScale(perp, size));
    const p2 = drAdd(base, drScale(perp, -size));
    out += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  }
  return out;
}
function drAngleArc(vertex, p1, p2, r, color){
  const {points} = angleArcPoints(vertex, p1, p2, r);
  return `<polyline points="${points}" fill="none" stroke="${color||'#1C1B2E'}" stroke-width="1.3"/>`;
}
function drAngleTick(vertex, p1, p2, r){
  const mid = angleArcPoints(vertex, p1, p2, r).mid;
  const midPt = {x: vertex.x+r*Math.cos(mid), y: vertex.y+r*Math.sin(mid)};
  const perpTick = {x: -Math.sin(mid), y: Math.cos(mid)};
  const t1 = {x: midPt.x-perpTick.x*4, y: midPt.y-perpTick.y*4};
  const t2 = {x: midPt.x+perpTick.x*4, y: midPt.y+perpTick.y*4};
  return `<line x1="${t1.x}" y1="${t1.y}" x2="${t2.x}" y2="${t2.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
}

/* Triangles de référence, vérifiés numériquement (angles, longueurs des côtés,
   position des centres) avant intégration -- volontairement bien scalènes
   (aucun ne doit avoir l'air isocèle) ET avec des angles nettement éloignés
   de 90° (aucun ne doit avoir l'air d'un triangle rectangle) */
const DR_T_DEF = { A:{x:220,y:20}, B:{x:30,y:210}, C:{x:330,y:210} };          // scalène, angles aigus 75°/45°/60°, côtés 269/220/300
const DR_T_OBTUS = { A:{x:137,y:105}, B:{x:30,y:195}, C:{x:330,y:195} };      // angle obtus net en A (~115°), scalène, côtés 140/213/300
const DR_T_RIGHT = { A:{x:60,y:180}, B:{x:60,y:40}, C:{x:320,y:180} };        // angle droit en A, scalène (côtés 140/260/295)

/* ================= Figure : définition de la médiatrice ================= */
function drBuildMediatriceSvg(){
  const {A,B,C} = DR_T_DEF;
  const M = drMid(B,C);
  const dir = drPerp(drNorm(drSub(C,B)));
  const [P1,P2] = drExtendLine(M, dir, 90);
  const alongBC = drNorm(drSub(C,B));
  return `<svg viewBox="0 0 380 230" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${P1.x}" y1="${P1.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1F3A5C" stroke-width="1.8"/>
    ${drRightMark(M, drScale(alongBC,-1), dir, 9)}
    ${drTick(drMid(B,M), alongBC, 5)}
    ${drTick(drMid(M,C), alongBC, 5)}
    <circle cx="${M.x}" cy="${M.y}" r="2.4" fill="#1C1B2E"/>
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
  </svg>`;
}

/* ================= Figure : définition de la bissectrice ================= */
function drBuildBissectriceSvg(){
  const {A,B,C} = DR_T_DEF;
  const dir = drBisectorDir(A,B,C);
  const P2 = drAdd(A, drScale(dir, 210));
  const w1 = drAngleArc(A, B, P2, 34, '#1F6B3A');
  const w2 = drAngleArc(A, P2, C, 34, '#1F6B3A');
  const t1 = drAngleTick(A, B, P2, 34);
  const t2 = drAngleTick(A, P2, C, 34);
  return `<svg viewBox="0 0 380 230" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${A.x}" y1="${A.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1F6B3A" stroke-width="1.8"/>
    ${w1}${w2}${t1}${t2}
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
  </svg>`;
}

/* ================= Figure : définition de la hauteur (cas intérieur et extérieur) ================= */
function drBuildHauteurSvg(){
  const {A,B,C} = DR_T_OBTUS;
  // hauteur issue de A, intérieure (pied sur [BC])
  const footA = drFoot(A,B,C);
  const dirBC = drNorm(drSub(C,B));
  const perpBC = drPerp(dirBC);
  // hauteur issue de C, extérieure (pied hors de [AB])
  const footC = drFoot(C,A,B);
  const dirAB = drNorm(drSub(B,A));
  const perpAB = drPerp(dirAB);
  return `<svg viewBox="0 0 400 260" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${A.x}" y1="${A.y}" x2="${footA.x}" y2="${footA.y}" stroke="#1F3A5C" stroke-width="1.8"/>
    ${drRightMark(footA, dirBC, perpBC.y<0?perpBC:drScale(perpBC,-1), 9)}
    <line x1="${C.x}" y1="${C.y}" x2="${footC.x}" y2="${footC.y}" stroke="#E35D3A" stroke-width="1.8"/>
    <line x1="${A.x}" y1="${A.y}" x2="${footC.x}" y2="${footC.y}" stroke="#5B6B78" stroke-width="1.3" stroke-dasharray="5,4"/>
    ${drRightMark(footC, dirAB, drScale(perpAB,-1), 9)}
    <circle cx="${footA.x}" cy="${footA.y}" r="2.2" fill="#1C1B2E"/>
    <circle cx="${footC.x}" cy="${footC.y}" r="2.2" fill="#1C1B2E"/>
    ${drLabel(A.x-6, A.y-10, 'A')}
    ${drLabel(B.x-16, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
  </svg>`;
}

/* ================= Figure : définition de la médiane ================= */
function drBuildMedianeSvg(){
  const {A,B,C} = DR_T_DEF;
  const M = drMid(B,C);
  const alongBC = drNorm(drSub(C,B));
  return `<svg viewBox="0 0 380 230" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${A.x}" y1="${A.y}" x2="${M.x}" y2="${M.y}" stroke="#9E1F5E" stroke-width="1.8"/>
    ${drTick(drMid(B,M), alongBC, 5)}
    ${drTick(drMid(M,C), alongBC, 5)}
    <circle cx="${M.x}" cy="${M.y}" r="2.4" fill="#1C1B2E"/>
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
  </svg>`;
}

function drTranslateTri(T, dx, dy){
  return {A:{x:T.A.x+dx,y:T.A.y+dy}, B:{x:T.B.x+dx,y:T.B.y+dy}, C:{x:T.C.x+dx,y:T.C.y+dy}};
}
/* Segment de droite passant par `origin` de direction `dir` (normalisée), couvrant
   précisément tous les points clés donnés (ex : sommet, pied, point de concours),
   avec une marge, plutôt qu'une extension symétrique arbitraire qui peut déborder. */
function drLineCovering(origin, dir, points, margin){
  margin = margin===undefined ? 20 : margin;
  let tMin = 0, tMax = 0;
  points.forEach(p=>{
    const t = drDot(drSub(p,origin), dir);
    if(t<tMin) tMin=t;
    if(t>tMax) tMax=t;
  });
  tMin -= margin; tMax += margin;
  return [drAdd(origin, drScale(dir,tMin)), drAdd(origin, drScale(dir,tMax))];
}

/* ================= Figure : concourance des médiatrices (cercle circonscrit) ================= */
function drBuildCircumcenterSvg(T, viewW, viewH){
  const {A,B,C} = T;
  const midAB=drMid(A,B), midAC=drMid(A,C), midBC=drMid(B,C);
  const dAB=drPerp(drNorm(drSub(B,A))), dAC=drPerp(drNorm(drSub(C,A))), dBC=drPerp(drNorm(drSub(C,B)));
  const alongAB=drNorm(drSub(B,A)), alongAC=drNorm(drSub(C,A)), alongBC=drNorm(drSub(C,B));
  const O = drLineIntersection(midAB,dAB,midAC,dAC);
  const R = drDist(O,A);
  const [P1a,P2a] = drLineCovering(midAB, dAB, [O], 15);
  const [P1b,P2b] = drLineCovering(midAC, dAC, [O], 15);
  const [P1c,P2c] = drLineCovering(midBC, dBC, [O], 15);
  return `<svg viewBox="0 0 ${viewW} ${viewH}" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle cx="${O.x}" cy="${O.y}" r="${R}" fill="none" stroke="#1F6B3A" stroke-width="1.4"/>
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${P1a.x}" y1="${P1a.y}" x2="${P2a.x}" y2="${P2a.y}" stroke="#1F3A5C" stroke-width="1.2" stroke-dasharray="4,3"/>
    <line x1="${P1b.x}" y1="${P1b.y}" x2="${P2b.x}" y2="${P2b.y}" stroke="#1F3A5C" stroke-width="1.2" stroke-dasharray="4,3"/>
    <line x1="${P1c.x}" y1="${P1c.y}" x2="${P2c.x}" y2="${P2c.y}" stroke="#1F3A5C" stroke-width="1.2" stroke-dasharray="4,3"/>
    ${drRightMark(midAB, alongAB, dAB, 7)}
    ${drRightMark(midAC, alongAC, dAC, 7)}
    ${drRightMark(midBC, alongBC, dBC, 7)}
    ${drTickN(drMid(A,midAB), alongAB, 4, 1)}${drTickN(drMid(midAB,B), alongAB, 4, 1)}
    ${drTickN(drMid(A,midAC), alongAC, 4, 2)}${drTickN(drMid(midAC,C), alongAC, 4, 2)}
    ${drTickN(drMid(B,midBC), alongBC, 4, 3)}${drTickN(drMid(midBC,C), alongBC, 4, 3)}
    <circle cx="${O.x}" cy="${O.y}" r="3" fill="#E35D3A"/>
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
    ${drLabel(O.x+6, O.y-6, 'O')}
  </svg>`;
}

/* ================= Figure : médiatrices et triangle rectangle ================= */
function drBuildRightTriangleCircumSvg(){
  const T = drTranslateTri(DR_T_RIGHT, 0, 40);
  const {A,B,C} = T;
  const O = drMid(B,C);
  const R = drDist(O,A);
  return `<svg viewBox="0 0 380 300" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle cx="${O.x}" cy="${O.y}" r="${R}" fill="none" stroke="#1F6B3A" stroke-width="1.4"/>
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    ${drRightMark(A, drNorm(drSub(B,A)), drNorm(drSub(C,A)), 10)}
    <circle cx="${O.x}" cy="${O.y}" r="3" fill="#E35D3A"/>
    ${drLabel(A.x-20, A.y+16, 'A')}
    ${drLabel(B.x-16, B.y+4, 'B')}
    ${drLabel(C.x+8, C.y+4, 'C')}
    ${drLabel(O.x+6, O.y-8, 'O')}
  </svg>`;
}

/* ================= Figure : concourance des hauteurs (orthocentre) ================= */
function drBuildOrthocenterSvg(T, viewW, viewH){
  const {A,B,C} = T;
  const altADir = drPerp(drNorm(drSub(C,B)));
  const altBDir = drPerp(drNorm(drSub(C,A)));
  const H = drLineIntersection(A, altADir, B, altBDir);
  const altCDir = drPerp(drNorm(drSub(B,A)));
  const footA = drFoot(A,B,C), footB = drFoot(B,A,C), footC = drFoot(C,A,B);
  const [P1a,P2a] = drLineCovering(A, altADir, [H, footA], 15);
  const [P1b,P2b] = drLineCovering(B, altBDir, [H, footB], 15);
  const [P1c,P2c] = drLineCovering(C, altCDir, [H, footC], 15);
  return `<svg viewBox="0 0 ${viewW} ${viewH}" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${P1a.x}" y1="${P1a.y}" x2="${P2a.x}" y2="${P2a.y}" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="4,3"/>
    <line x1="${P1b.x}" y1="${P1b.y}" x2="${P2b.x}" y2="${P2b.y}" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="4,3"/>
    <line x1="${P1c.x}" y1="${P1c.y}" x2="${P2c.x}" y2="${P2c.y}" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="4,3"/>
    <circle cx="${H.x}" cy="${H.y}" r="3" fill="#E35D3A"/>
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
    ${drLabel(H.x+6, H.y-6, 'H')}
  </svg>`;
}

/* ================= Figure : concourance des médianes (centre de gravité) ================= */
function drBuildCentroidSvg(T, viewW, viewH){
  const {A,B,C} = T;
  const midAB=drMid(A,B), midAC=drMid(A,C), midBC=drMid(B,C);
  const G = {x:(A.x+B.x+C.x)/3, y:(A.y+B.y+C.y)/3};
  const alongBC = drNorm(drSub(C,B)), alongAB = drNorm(drSub(B,A)), alongAC = drNorm(drSub(C,A));
  return `<svg viewBox="0 0 ${viewW} ${viewH}" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${A.x}" y1="${A.y}" x2="${midBC.x}" y2="${midBC.y}" stroke="#9E1F5E" stroke-width="1.4"/>
    <line x1="${B.x}" y1="${B.y}" x2="${midAC.x}" y2="${midAC.y}" stroke="#9E1F5E" stroke-width="1.4"/>
    <line x1="${C.x}" y1="${C.y}" x2="${midAB.x}" y2="${midAB.y}" stroke="#9E1F5E" stroke-width="1.4"/>
    ${drTickN(drMid(B,midBC), alongBC, 4, 1)}${drTickN(drMid(midBC,C), alongBC, 4, 1)}
    ${drTickN(drMid(A,midAC), alongAC, 4, 2)}${drTickN(drMid(midAC,C), alongAC, 4, 2)}
    ${drTickN(drMid(A,midAB), alongAB, 4, 3)}${drTickN(drMid(midAB,B), alongAB, 4, 3)}
    <circle cx="${G.x}" cy="${G.y}" r="3" fill="#E35D3A"/>
    ${drLabel(A.x-6, A.y-8, 'A')}
    ${drLabel(B.x-14, B.y+6, 'B')}
    ${drLabel(C.x+8, C.y+6, 'C')}
    ${drLabel(G.x+6, G.y-6, 'G')}
  </svg>`;
}

/* ================= COURS ================= */
document.getElementById('cours-demo-droites-remarquables-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Définitions</h3></div>

<p class="example-title" style="margin-top:0;">A. Médiatrices</p>
<span class="prop-badge">Définition</span>
<div class="def-box">La <b>médiatrice d'un segment</b> est la droite perpendiculaire à ce segment en son milieu.</div>
<div class="figure-wrap">${drBuildMediatriceSvg()}</div>
<p style="margin:10px 0 12px;">On a tracé la médiatrice du côté [BC] : elle passe par le milieu de [BC] et lui est perpendiculaire.</p>

<p class="example-title" style="margin-top:20px;">B. Bissectrice</p>
<span class="prop-badge">Définition</span>
<div class="def-box">La <b>bissectrice d'un angle</b> est la droite qui partage cet angle en deux angles adjacents de même mesure.</div>
<div class="figure-wrap">${drBuildBissectriceSvg()}</div>
<p style="margin:10px 0 12px;">On a tracé la bissectrice de l'angle <span class="tex">\\widehat{BAC}</span> : elle partage cet angle en deux angles adjacents de même mesure.</p>

<p class="example-title" style="margin-top:20px;">C. Hauteurs</p>
<span class="prop-badge">Définition</span>
<div class="def-box">Dans un triangle, une <b>hauteur</b> est une droite qui passe par un sommet et qui est perpendiculaire au côté opposé à ce sommet.</div>
<div class="figure-wrap">${drBuildHauteurSvg()}</div>
<p style="margin:10px 0 4px;">On a tracé :</p>
<ul style="margin:4px 0 12px;padding-left:22px;">
  <li>la hauteur issue de A, qui traverse le triangle ABC ;</li>
  <li>la hauteur issue de C (en pointillés au-delà du triangle), qui est <span style="color:#E35D3A;font-weight:700;">extérieure</span> au triangle ABC.</li>
</ul>

<p class="example-title" style="margin-top:20px;">D. Médianes</p>
<span class="prop-badge">Définition</span>
<div class="def-box">Dans un triangle, une <b>médiane</b> est une droite qui passe par un sommet et par le milieu du côté opposé à ce sommet.</div>
<div class="figure-wrap">${drBuildMedianeSvg()}</div>
<p style="margin:10px 0 12px;">On a tracé la médiane issue de A : elle passe par A et par le milieu de [BC].</p>

<div class="lesson-header"><span class="num">2</span><h3>Concourance des droites remarquables dans un triangle</h3></div>

<p class="example-title" style="margin-top:0;">A. Médiatrices</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Les médiatrices des trois côtés d'un triangle sont <b>concourantes</b> en un point qui est le <b>centre du cercle circonscrit</b> à ce triangle.</div>
<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;">
  <div class="figure-wrap">${drBuildCircumcenterSvg(DR_T_DEF, 380, 340)}<p class="hint" style="text-align:center;">Triangle à angles aigus : O est à l'intérieur.</p></div>
  <div class="figure-wrap">${drBuildCircumcenterSvg(DR_T_OBTUS, 380, 440)}<p class="hint" style="text-align:center;">Triangle avec un angle obtus : O est à l'extérieur.</p></div>
</div>
<p style="margin:10px 0 4px;">Dans un triangle qui a tous ses angles aigus, le centre du cercle circonscrit se trouve à l'intérieur du triangle.</p>
<p style="margin:4px 0 12px;">Dans un triangle qui a un de ses angles obtus, le centre du cercle circonscrit se trouve à l'extérieur du triangle.</p>

<p class="example-title" style="margin-top:20px;">B. Médiatrices et triangle rectangle</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Un triangle rectangle est inscrit dans un <b>cercle de diamètre son hypoténuse</b>.</div>
<div class="figure-wrap">${drBuildRightTriangleCircumSvg()}</div>
<p style="margin:10px 0 12px;">Le milieu O de l'hypoténuse [BC] est le centre du cercle circonscrit au triangle ABC, rectangle en A.</p>

<p class="example-title" style="margin-top:20px;">C. Hauteurs</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Les trois hauteurs d'un triangle sont <b>concourantes</b> en un point qui est <b>l'orthocentre</b> de ce triangle.</div>
<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;">
  <div class="figure-wrap" id="dr-ortho-def-wrap"></div>
  <div class="figure-wrap" id="dr-ortho-obtus-wrap"></div>
</div>
<p style="margin:10px 0 4px;">Dans un triangle qui a tous ses angles aigus, l'orthocentre se trouve à l'intérieur du triangle.</p>
<p style="margin:4px 0 12px;">Dans un triangle qui a un de ses angles obtus, l'orthocentre se trouve à l'extérieur du triangle.</p>

<p class="example-title" style="margin-top:20px;">D. Médianes</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Les trois médianes d'un triangle sont <b>concourantes</b> en un point qui est le <b>centre de gravité</b> de ce triangle.</div>
<div class="figure-wrap">${drBuildCentroidSvg(DR_T_DEF, 380, 230)}</div>
<p style="margin:10px 0 12px;">Le centre de gravité est toujours situé à l'intérieur du triangle, quels que soient ses angles.</p>
`;
document.getElementById('dr-ortho-def-wrap').innerHTML = drBuildOrthocenterSvg(DR_T_DEF, 380, 230) + "<p class=\"hint\" style=\"text-align:center;\">Triangle à angles aigus : H est à l'intérieur.</p>";
document.getElementById('dr-ortho-obtus-wrap').innerHTML = drBuildOrthocenterSvg(drTranslateTri(DR_T_OBTUS,0,45), 380, 300) + "<p class=\"hint\" style=\"text-align:center;\">Triangle avec un angle obtus : H est à l'extérieur.</p>";

document.getElementById('histoire-demo-droites-remarquables-5e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les quatre droites remarquables d'un triangle (médiatrices, bissectrices, hauteurs, médianes) et leurs points de concours étaient déjà connus des mathématiciens grecs de l'Antiquité. Mais il faudra attendre 1765 pour qu'une découverte surprenante soit faite : le mathématicien suisse Leonhard Euler démontre que, dans un même triangle, le centre de gravité, l'orthocentre et le centre du cercle circonscrit sont toujours alignés sur une même droite, aujourd'hui appelée la <b>droite d'Euler</b>. Un lien inattendu entre des points qu'on pensait indépendants !
</div>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-droites-remarquables-5e').innerHTML = `
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : démontrer qu'un triangle est rectangle grâce au cercle circonscrit</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${drBuildRightTriangleCircumSvg()}</div>
  <div class="step-display" id="dr-methodeRectDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="drMethodeRectDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="drMethodeRectDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire le centre du cercle circonscrit à un triangle</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${drBuildCircumcenterSvg(DR_T_DEF, 380, 340)}</div>
  <div class="step-display" id="dr-methodeCircumDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="drMethodeCircumDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="drMethodeCircumDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : construire l'orthocentre d'un triangle</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${drBuildOrthocenterSvg(DR_T_DEF, 380, 230)}</div>
  <div class="step-display" id="dr-methodeOrthoDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="drMethodeOrthoDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="drMethodeOrthoDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXOS ================= */
document.getElementById('exos-demo-droites-remarquables-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Démontrer qu'un triangle est rectangle »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">O est le milieu de [BC], et O est équidistant de A, B et C.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si un point d'un triangle appartient au cercle de diamètre le côté opposé, alors le triangle est rectangle en ce point.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> le triangle ABC est rectangle en A.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un triangle ABC quelconque. Trace la médiatrice de [AB] et la médiatrice de [AC]. Nomme O leur point d'intersection. Que représente le point O pour ce triangle ?
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Un triangle RST est tel que O, milieu de [RS], vérifie OR = OS = OT. Démontre que le triangle RST est rectangle en T. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Trace un triangle quelconque et ses trois hauteurs. Que peux-tu dire de leur point de concours si le triangle a un angle obtus ?
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Trace un triangle et ses trois médianes. Nomme G leur point de concours. G peut-il se trouver à l'extérieur du triangle ? Justifie.
  </div>
</div>
`;

/* ================= Méthodes animées : pas à pas ================= */
const DR_METHODE_RECT_STEPS = [
  {expr:"O est le milieu de [BC], et O est équidistant de A, B et C.", note:"Ce que je sais."},
  {expr:"<span style=\"color:var(--accent-orange);font-weight:700;\">Or,</span> si un point d'un triangle appartient au cercle de diamètre le côté opposé, alors le triangle est rectangle en ce point.", note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> le triangle ABC est rectangle en A.', note:"Conclusion."},
];
const drMethodeRectDemo = makeStepDemo(DR_METHODE_RECT_STEPS, 'dr-methodeRectDisplay');

const DR_METHODE_CIRCUM_STEPS = [
  {expr:"Je trace la médiatrice du côté [AB].", note:"Ce que je fais : première médiatrice."},
  {expr:"Je trace la médiatrice du côté [AC].", note:"Ce que je fais : deuxième médiatrice."},
  {expr:"<span style=\"color:var(--accent-orange);font-weight:700;\">Or,</span> les médiatrices des trois côtés d'un triangle sont concourantes.", note:"On énonce la propriété : pas besoin de tracer la troisième médiatrice."},
  {expr:"<span style=\"color:var(--accent);font-weight:700;\">Donc</span> leur point d'intersection O est le centre du cercle circonscrit au triangle.", note:"Conclusion."},
];
const drMethodeCircumDemo = makeStepDemo(DR_METHODE_CIRCUM_STEPS, 'dr-methodeCircumDisplay');

const DR_METHODE_ORTHO_STEPS = [
  {expr:"Je trace la hauteur issue de A.", note:"Ce que je fais : première hauteur."},
  {expr:"Je trace la hauteur issue de B.", note:"Ce que je fais : deuxième hauteur."},
  {expr:"<span style=\"color:var(--accent-orange);font-weight:700;\">Or,</span> les trois hauteurs d'un triangle sont concourantes.", note:"On énonce la propriété : pas besoin de tracer la troisième hauteur."},
  {expr:"<span style=\"color:var(--accent);font-weight:700;\">Donc</span> leur point d'intersection H est l'orthocentre du triangle.", note:"Conclusion."},
];
const drMethodeOrthoDemo = makeStepDemo(DR_METHODE_ORTHO_STEPS, 'dr-methodeOrthoDisplay');

DEMO_REGISTRY['Droites remarquables dans un triangle'] = {
  cours:'cours-demo-droites-remarquables-5e', methode:'methode-demo-droites-remarquables-5e', exos:'exos-demo-droites-remarquables-5e', histoire:'histoire-demo-droites-remarquables-5e',
  init:()=>{
    drMethodeRectDemo.reset();
    drMethodeCircumDemo.reset();
    drMethodeOrthoDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-droites-remarquables-5e'));
    renderStaticMath(document.getElementById('exos-demo-droites-remarquables-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-droites-remarquables-5e')); injectCourseAddButtons(document.getElementById('methode-demo-droites-remarquables-5e'));
  }
};

DEMO_QUIZZES['Droites remarquables dans un triangle'] = [
  {q:"La médiatrice d'un segment est...",
   opts:["La droite perpendiculaire à ce segment en son milieu","La droite qui passe par un sommet et le milieu du côté opposé","La droite qui partage un angle en deux angles égaux"], correct:0},
  {q:"Le point de concours des trois médiatrices d'un triangle est...",
   opts:["Le centre de gravité","Le centre du cercle circonscrit","L'orthocentre"], correct:1},
  {q:"Le point de concours des trois hauteurs d'un triangle est...",
   opts:["Le centre de gravité","Le centre du cercle circonscrit","L'orthocentre"], correct:2},
  {q:"Le point de concours des trois médianes d'un triangle est...",
   opts:["Le centre de gravité","Le centre du cercle circonscrit","L'orthocentre"], correct:0},
  {q:"Dans un triangle rectangle, le centre du cercle circonscrit est...",
   opts:["Toujours à l'extérieur du triangle","Le milieu de l'hypoténuse","Le sommet de l'angle droit"], correct:1},
  {q:"Le centre de gravité d'un triangle peut-il se trouver à l'extérieur du triangle ?",
   opts:["Oui, si le triangle a un angle obtus","Non, jamais","Oui, si le triangle est rectangle"], correct:1},
];

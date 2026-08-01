/* ============================================================
   CHAPITRE : Parallélogrammes (5e, G4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Utilise la fonction globale angleArcPoints(vertex,p1,p2,r) déjà définie
   dans index.html, en plus de quelques fonctions vectorielles locales
   (préfixe pg, pour ne pas entrer en conflit avec les autres chapitres).
   ============================================================ */

function pgSub(a,b){ return {x:a.x-b.x, y:a.y-b.y}; }
function pgAdd(a,b){ return {x:a.x+b.x, y:a.y+b.y}; }
function pgScale(a,k){ return {x:a.x*k, y:a.y*k}; }
function pgNorm(v){ const l=Math.hypot(v.x,v.y)||1; return {x:v.x/l, y:v.y/l}; }
function pgMid(a,b){ return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}; }
function pgPerp(v){ return {x:-v.y, y:v.x}; }

function pgLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||13}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}
/* Codage de longueur égale : n petits traits perpendiculaires, centrés sur le point donné. */
function pgTickN(mid, dir, n, size){
  size = size||5;
  const perp = pgPerp(dir);
  const spacing = 3.4;
  let out = '';
  for(let i=0;i<n;i++){
    const offset = (i-(n-1)/2)*spacing;
    const base = pgAdd(mid, pgScale(dir, offset));
    const p1 = pgAdd(base, pgScale(perp, size));
    const p2 = pgAdd(base, pgScale(perp, -size));
    out += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  }
  return out;
}
/* Codage de parallélisme : n petits chevrons, centrés sur le point donné, dans la direction du
   côté -- convention standard pour indiquer que deux côtés (segments) sont parallèles entre eux. */
function pgParTick(mid, dir, n, size){
  size = size||7;
  const spacing = 5.5;
  const perp = pgPerp(dir);
  let out = '';
  for(let i=0;i<n;i++){
    const offset = (i-(n-1)/2)*spacing;
    const base = pgAdd(mid, pgScale(dir, offset));
    const tip = pgAdd(base, pgScale(dir, size*0.55));
    const p1 = pgAdd(pgAdd(base, pgScale(dir,-size*0.45)), pgScale(perp, size*0.45));
    const p2 = pgAdd(pgAdd(base, pgScale(dir,-size*0.45)), pgScale(perp, -size*0.45));
    out += `<polyline points="${p1.x},${p1.y} ${tip.x},${tip.y} ${p2.x},${p2.y}" fill="none" stroke="#1F3A5C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  return out;
}
function pgAngleArc(vertex, p1, p2, r, color){
  const {points} = angleArcPoints(vertex, p1, p2, r);
  return `<polyline points="${points}" fill="none" stroke="${color||'#1C1B2E'}" stroke-width="1.8"/>`;
}

/* Quadrilatère de référence ABCD, vérifié numériquement : vecteur AB = vecteur DC (donc AB et DC
   parallèles et de même longueur), non rectangle (AB.AD ≠ 0) et non losange (AB ≠ AD en longueur),
   pour ne pas ressembler à un cas particulier de parallélogramme. */
const PG_A = {x:90, y:70}, PG_B = {x:320, y:55}, PG_D = {x:60, y:230};
const PG_C = pgAdd(PG_B, pgSub(PG_D, PG_A));
const PG_O = pgMid(PG_A, PG_C);

function pgSvgWrap(inner){
  return `<svg viewBox="0 0 400 280" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">${inner}</svg>`;
}
function pgBaseSides(){
  return `<line x1="${PG_A.x}" y1="${PG_A.y}" x2="${PG_B.x}" y2="${PG_B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${PG_B.x}" y1="${PG_B.y}" x2="${PG_C.x}" y2="${PG_C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${PG_C.x}" y1="${PG_C.y}" x2="${PG_D.x}" y2="${PG_D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${PG_D.x}" y1="${PG_D.y}" x2="${PG_A.x}" y2="${PG_A.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
}
function pgBaseLabels(){
  return pgLabel(PG_A.x-16, PG_A.y-6, 'A') + pgLabel(PG_B.x+8, PG_B.y-6, 'B')
    + pgLabel(PG_C.x+8, PG_C.y+18, 'C') + pgLabel(PG_D.x-16, PG_D.y+18, 'D');
}
function pgDiagonals(){
  return `<line x1="${PG_A.x}" y1="${PG_A.y}" x2="${PG_C.x}" y2="${PG_C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${PG_B.x}" y1="${PG_B.y}" x2="${PG_D.x}" y2="${PG_D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
}
function pgOMark(){
  return `<circle cx="${PG_O.x}" cy="${PG_O.y}" r="2.8" fill="#1C1B2E"/>${pgLabel(PG_O.x+8, PG_O.y-6, 'O')}`;
}

/* ================= Figure : définition (côtés opposés parallèles) ================= */
function pgBuildDefinitionSvg(){
  const abDir = pgNorm(pgSub(PG_B, PG_A));
  const adDir = pgNorm(pgSub(PG_D, PG_A));
  const marks = pgParTick(pgMid(PG_A,PG_B), abDir, 1) + pgParTick(pgMid(PG_D,PG_C), abDir, 1)
    + pgParTick(pgMid(PG_A,PG_D), adDir, 2) + pgParTick(pgMid(PG_B,PG_C), adDir, 2);
  return pgSvgWrap(pgBaseSides() + marks + pgBaseLabels());
}
/* ================= Figure : propriété 1 (centre de symétrie) ================= */
function pgBuildProp1Svg(){
  return pgSvgWrap(pgBaseSides() + pgDiagonals() + pgOMark() + pgBaseLabels());
}
/* ================= Figure : propriété 2 (diagonales de même milieu) ================= */
function pgBuildProp2Svg(){
  const acDir = pgNorm(pgSub(PG_C, PG_A));
  const bdDir = pgNorm(pgSub(PG_D, PG_B));
  const ticks = pgTickN(pgMid(PG_A,PG_O), acDir, 1) + pgTickN(pgMid(PG_O,PG_C), acDir, 1)
    + pgTickN(pgMid(PG_B,PG_O), bdDir, 2) + pgTickN(pgMid(PG_O,PG_D), bdDir, 2);
  return pgSvgWrap(pgBaseSides() + pgDiagonals() + ticks + pgOMark() + pgBaseLabels());
}
/* ================= Figure : propriété 3 (côtés opposés de même longueur) ================= */
function pgBuildProp3Svg(){
  const abDir = pgNorm(pgSub(PG_B, PG_A));
  const adDir = pgNorm(pgSub(PG_D, PG_A));
  const ticks = pgTickN(pgMid(PG_A,PG_B), abDir, 1) + pgTickN(pgMid(PG_D,PG_C), abDir, 1)
    + pgTickN(pgMid(PG_A,PG_D), adDir, 2) + pgTickN(pgMid(PG_B,PG_C), adDir, 2);
  return pgSvgWrap(pgBaseSides() + ticks + pgBaseLabels());
}
/* ================= Figure : propriété 4 (angles opposés de même mesure) ================= */
function pgBuildProp4Svg(){
  const r = 30;
  const arcA = pgAngleArc(PG_A, PG_D, PG_B, r, '#9E1F5E');
  const arcC = pgAngleArc(PG_C, PG_B, PG_D, r, '#9E1F5E');
  const arcB = pgAngleArc(PG_B, PG_A, PG_C, r, '#1F6B3A');
  const arcD = pgAngleArc(PG_D, PG_C, PG_A, r, '#1F6B3A');
  return pgSvgWrap(pgBaseSides() + arcA+arcC+arcB+arcD + pgBaseLabels());
}
/* ================= Figure : reconnaître, propriété 2 (un couple de côtés parallèles et égaux) ================= */
function pgBuildRecoProp2Svg(){
  const abDir = pgNorm(pgSub(PG_B, PG_A));
  const midAB = pgMid(PG_A,PG_B), midDC = pgMid(PG_D,PG_C);
  const marks = pgParTick(pgAdd(midAB, pgScale(abDir,9)), abDir, 1) + pgParTick(pgAdd(midDC, pgScale(abDir,9)), abDir, 1)
    + pgTickN(pgAdd(midAB, pgScale(abDir,-9)), abDir, 1) + pgTickN(pgAdd(midDC, pgScale(abDir,-9)), abDir, 1);
  return pgSvgWrap(pgBaseSides() + marks + pgBaseLabels());
}

document.getElementById('cours-demo-parallelogrammes-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Définition</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>parallélogramme</b> est un quadrilatère qui a ses côtés opposés parallèles.</div>
<div class="figure-wrap">${pgBuildDefinitionSvg()}</div>
<p style="margin:10px 0 12px;">On considère la figure ci-dessus. Les côtés [AB] et [DC] sont parallèles. Les côtés [AD] et [BC] sont parallèles. Le quadrilatère ABCD est donc un parallélogramme.</p>

<div class="lesson-header"><span class="num">2</span><h3>Propriétés du parallélogramme</h3></div>

<span class="prop-badge">Propriété 1</span>
<div class="def-box">Un parallélogramme a un <b>centre de symétrie</b> qui est le point d'intersection de ses diagonales.</div>
<div class="figure-wrap">${pgBuildProp1Svg()}</div>
<p style="margin:10px 0 12px;">ABCD est un parallélogramme de centre O. O est le centre de symétrie du parallélogramme ABCD. [AB] et [CD] sont symétriques par rapport à O. [AD] et [BC] sont symétriques par rapport à O. Les angles opposés sont symétriques par rapport à O.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère est un <b>parallélogramme</b> alors ses diagonales se coupent en leur milieu.</div>
<div class="figure-wrap">${pgBuildProp2Svg()}</div>
<p style="margin:10px 0 12px;">ABCD est un parallélogramme de centre O. Donc ses diagonales [AC] et [BD] se coupent en leur milieu O.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">Si un quadrilatère est un <b>parallélogramme</b> alors ses côtés opposés ont la même longueur.</div>
<div class="figure-wrap">${pgBuildProp3Svg()}</div>
<p style="margin:10px 0 12px;">ABCD est un parallélogramme. Ses côtés opposés ont la même longueur, donc AB = DC et AD = BC.</p>

<span class="prop-badge">Propriété 4</span>
<div class="def-box">Si un quadrilatère est un <b>parallélogramme</b> alors ses angles opposés ont la même mesure.</div>
<div class="figure-wrap">${pgBuildProp4Svg()}</div>
<p style="margin:10px 0 12px;">ABCD est un parallélogramme. Ses angles opposés ont la même mesure, donc <span class="tex">\\widehat{DAB} = \\widehat{BCD}</span> et <span class="tex">\\widehat{ABC} = \\widehat{CDA}</span>.</p>

<div class="lesson-header"><span class="num">3</span><h3>Reconnaître un parallélogramme</h3></div>

<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère a ses <b>diagonales qui se coupent en leur milieu</b> alors c'est un <b>parallélogramme</b>.</div>
<div class="figure-wrap">${pgBuildProp2Svg()}</div>
<p style="margin:10px 0 12px;">Les diagonales du quadrilatère ABCD se coupent en O, qui est le milieu de ses diagonales [AC] et [BD]. Donc le quadrilatère ABCD est un parallélogramme.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère a <b>deux côtés opposés parallèles et de même longueur</b> alors c'est un <b>parallélogramme</b>.</div>
<div class="figure-wrap">${pgBuildRecoProp2Svg()}</div>
<p style="margin:10px 0 12px;">Les côtés [AB] et [DC] du quadrilatère ABCD sont parallèles et ont la même longueur. Donc le quadrilatère ABCD est un parallélogramme.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">Si un quadrilatère non croisé a ses <b>côtés opposés de même longueur</b> alors c'est un <b>parallélogramme</b>.</div>
<div class="figure-wrap">${pgBuildProp3Svg()}</div>
<p style="margin:10px 0 12px;">AB = DC et AD = BC. Le quadrilatère ABCD non croisé a ses côtés opposés de même longueur. Donc le quadrilatère ABCD est un parallélogramme.</p>
`;

/* ================= METHODE ================= */
/* ================= Construction : points de base des 3 méthodes ================= */
const PGM_A = {x:110, y:200}, PGM_B = {x:230, y:230}, PGM_C = {x:280, y:90};
const PGM_D = pgAdd(PGM_A, pgSub(PGM_C, PGM_B));
const PGM_O = pgMid(PGM_A, PGM_C);

function pgArcSample(center, radius, angleCenter, spanDeg, n){
  n = n||24;
  const span = spanDeg*Math.PI/180;
  const pts = [];
  for(let i=0;i<=n;i++){
    const a = angleCenter - span/2 + span*i/n;
    pts.push(`${(center.x+radius*Math.cos(a)).toFixed(1)},${(center.y+radius*Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}
function pgExtend(p1, p2, extra){
  const dir = pgNorm(pgSub(p2,p1));
  return {a: pgSub(p1, pgScale(dir, extra)), b: pgAdd(p2, pgScale(dir, extra))};
}
function pgGivenTriangle(){
  return `<line x1="${PGM_A.x}" y1="${PGM_A.y}" x2="${PGM_B.x}" y2="${PGM_B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${PGM_B.x}" y1="${PGM_B.y}" x2="${PGM_C.x}" y2="${PGM_C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle cx="${PGM_A.x}" cy="${PGM_A.y}" r="2.6" fill="#1C1B2E"/><circle cx="${PGM_B.x}" cy="${PGM_B.y}" r="2.6" fill="#1C1B2E"/><circle cx="${PGM_C.x}" cy="${PGM_C.y}" r="2.6" fill="#1C1B2E"/>
    ${pgLabel(PGM_A.x-16, PGM_A.y+6, 'A')}${pgLabel(PGM_B.x+8, PGM_B.y+6, 'B')}${pgLabel(PGM_C.x+8, PGM_C.y-4, 'C')}`;
}
function pgDSide(){
  return `<line x1="${PGM_A.x}" y1="${PGM_A.y}" x2="${PGM_D.x}" y2="${PGM_D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${PGM_D.x}" y1="${PGM_D.y}" x2="${PGM_C.x}" y2="${PGM_C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle cx="${PGM_D.x}" cy="${PGM_D.y}" r="2.6" fill="#1C1B2E"/>${pgLabel(PGM_D.x-6, PGM_D.y-8, 'D')}`;
}

/* ---- Méthode 1 : à partir de la définition (deux parallèles) ---- */
let pgm1Step = 0;
function pgm1Render(step){
  const parC = pgExtend(PGM_C, PGM_D, 35);
  const parA = pgExtend(PGM_A, PGM_D, 35);
  document.getElementById('pgm1-parC').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm1-parC').setAttribute('x1',parC.a.x); document.getElementById('pgm1-parC').setAttribute('y1',parC.a.y);
  document.getElementById('pgm1-parC').setAttribute('x2',parC.b.x); document.getElementById('pgm1-parC').setAttribute('y2',parC.b.y);
  document.getElementById('pgm1-parA').setAttribute('opacity', step>=2?'1':'0');
  document.getElementById('pgm1-parA').setAttribute('x1',parA.a.x); document.getElementById('pgm1-parA').setAttribute('y1',parA.a.y);
  document.getElementById('pgm1-parA').setAttribute('x2',parA.b.x); document.getElementById('pgm1-parA').setAttribute('y2',parA.b.y);
  document.getElementById('pgm1-done').setAttribute('opacity', step>=3?'1':'0');
  document.querySelectorAll('#pgm1-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<step));
  document.getElementById('pgm1-next').textContent = step>=3 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pgm1-next').disabled = step>=3;
}
function pgm1Next(){ if(pgm1Step<3){ pgm1Step++; pgm1Render(pgm1Step); } }
function pgm1Reset(){ pgm1Step=0; pgm1Render(0); }
const PGM1_STEPS = [
  {note:"On considère 3 points A, B et C non alignés. On veut construire le point D tel que ABCD soit un parallélogramme."},
  {note:"Je trace la droite parallèle à (AB) passant par C, à la règle et à l'équerre."},
  {note:"Je trace la droite parallèle à (BC) passant par A."},
  {note:"Ces deux droites se coupent en D. Le quadrilatère ABCD est un parallélogramme, d'après la définition."},
];

/* ---- Méthode 2 : à partir des longueurs des côtés (compas) ---- */
let pgm2Step = 0;
function pgm2Render(step){
  const rBC = Math.hypot(PGM_C.x-PGM_B.x, PGM_C.y-PGM_B.y);
  const rAB = Math.hypot(PGM_B.x-PGM_A.x, PGM_B.y-PGM_A.y);
  const angAD = Math.atan2(PGM_D.y-PGM_A.y, PGM_D.x-PGM_A.x);
  const angCD = Math.atan2(PGM_D.y-PGM_C.y, PGM_D.x-PGM_C.x);
  document.getElementById('pgm2-arcA').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm2-arcA').setAttribute('points', pgArcSample(PGM_A, rBC, angAD, 55));
  document.getElementById('pgm2-arcC').setAttribute('opacity', step>=2?'1':'0');
  document.getElementById('pgm2-arcC').setAttribute('points', pgArcSample(PGM_C, rAB, angCD, 26));
  document.getElementById('pgm2-done').setAttribute('opacity', step>=3?'1':'0');
  document.querySelectorAll('#pgm2-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<step));
  document.getElementById('pgm2-next').textContent = step>=3 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pgm2-next').disabled = step>=3;
}
function pgm2Next(){ if(pgm2Step<3){ pgm2Step++; pgm2Render(pgm2Step); } }
function pgm2Reset(){ pgm2Step=0; pgm2Render(0); }
const PGM2_STEPS = [
  {note:"On considère 3 points A, B et C non alignés. On veut construire le point D tel que ABCD soit un parallélogramme, à l'aide du compas."},
  {note:"Je pique le compas en A, j'ouvre à l'écartement BC, et je trace un arc de cercle."},
  {note:"Je pique le compas en C, j'ouvre à l'écartement AB, et je trace un arc de cercle."},
  {note:"Les deux arcs se coupent en D. Le quadrilatère ABCD est un parallélogramme, car AD = BC et DC = AB."},
];

/* ---- Méthode 3 : à partir des diagonales (compas) ---- */
let pgm3Step = 0;
function pgm3Render(step){
  document.getElementById('pgm3-diagAC').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm3-O').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm3-Olabel').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm3-tickAO').setAttribute('opacity', step>=1?'1':'0');
  document.getElementById('pgm3-tickOC').setAttribute('opacity', step>=1?'1':'0');
  const dirBD = pgNorm(pgSub(PGM_D, PGM_B));
  const endBO = pgAdd(PGM_D, pgScale(dirBD, 20));
  document.getElementById('pgm3-lineBO').setAttribute('opacity', step>=2?'1':'0');
  document.getElementById('pgm3-lineBO').setAttribute('x1',PGM_B.x); document.getElementById('pgm3-lineBO').setAttribute('y1',PGM_B.y);
  document.getElementById('pgm3-lineBO').setAttribute('x2',endBO.x); document.getElementById('pgm3-lineBO').setAttribute('y2',endBO.y);
  document.getElementById('pgm3-tickOB').setAttribute('opacity', step>=2?'1':'0');
  document.getElementById('pgm3-tickOD').setAttribute('opacity', step>=3?'1':'0');
  document.getElementById('pgm3-done').setAttribute('opacity', step>=3?'1':'0');
  document.querySelectorAll('#pgm3-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<step));
  document.getElementById('pgm3-next').textContent = step>=3 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pgm3-next').disabled = step>=3;
}
function pgm3Next(){ if(pgm3Step<3){ pgm3Step++; pgm3Render(pgm3Step); } }
function pgm3Reset(){ pgm3Step=0; pgm3Render(0); }
const PGM3_STEPS = [
  {note:"On considère 3 points A, B et C non alignés. On veut construire le point D tel que ABCD soit un parallélogramme, à l'aide du compas."},
  {note:"Je trace la diagonale [AC], puis je construis son milieu O : AO = OC."},
  {note:"Je trace la demi-droite [BO), prolongée au-delà de O."},
  {note:"Je pique le compas en O, j'ouvre à l'écartement OB, et je reporte cette longueur de l'autre côté de O sur la demi-droite [BO) : j'obtiens D. Le quadrilatère ABCD est un parallélogramme, car ses diagonales [AC] et [BD] se coupent en leur milieu O."},
];

document.getElementById('methode-demo-parallelogrammes-5e').innerHTML = `
<p class="example-title" style="margin-top:0;">En utilisant la définition du parallélogramme</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la construction.</p>
  <svg id="pgm1-svg" viewBox="0 0 400 280" style="width:100%;max-width:380px;display:block;margin:6px auto;background:var(--white);border-radius:8px;">
    ${pgGivenTriangle()}
    <line id="pgm1-parC" opacity="0" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="5,4"/>
    <line id="pgm1-parA" opacity="0" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="5,4"/>
    <g id="pgm1-done" opacity="0">${pgDSide()}</g>
  </svg>
  <div class="step-list" id="pgm1-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On trace la droite parallèle à (AB) passant par C.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On trace la droite parallèle à (BC) passant par A.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Les deux droites se coupent en D.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pgm1-next" onclick="pgm1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pgm1Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">En utilisant la propriété des longueurs des côtés d'un parallélogramme</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la construction.</p>
  <svg id="pgm2-svg" viewBox="0 0 400 280" style="width:100%;max-width:380px;display:block;margin:6px auto;background:var(--white);border-radius:8px;">
    ${pgGivenTriangle()}
    <polyline id="pgm2-arcA" opacity="0" fill="none" stroke="#1F6B3A" stroke-width="1.3"/>
    <polyline id="pgm2-arcC" opacity="0" fill="none" stroke="#1F6B3A" stroke-width="1.3"/>
    <g id="pgm2-done" opacity="0">${pgDSide()}</g>
  </svg>
  <div class="step-list" id="pgm2-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On trace un arc de centre A et de rayon BC.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On trace un arc de centre C et de rayon AB.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Les deux arcs se coupent en D.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pgm2-next" onclick="pgm2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pgm2Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">En utilisant la propriété des diagonales d'un parallélogramme</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la construction.</p>
  <svg id="pgm3-svg" viewBox="0 0 400 280" style="width:100%;max-width:380px;display:block;margin:6px auto;background:var(--white);border-radius:8px;">
    ${pgGivenTriangle()}
    <line id="pgm3-diagAC" opacity="0" x1="${PGM_A.x}" y1="${PGM_A.y}" x2="${PGM_C.x}" y2="${PGM_C.y}" stroke="#1C1B2E" stroke-width="1.2" stroke-dasharray="4,3"/>
    <circle id="pgm3-O" opacity="0" cx="${PGM_O.x}" cy="${PGM_O.y}" r="2.6" fill="#1C1B2E"/>
    <g id="pgm3-Olabel" opacity="0">${pgLabel(PGM_O.x+7, PGM_O.y-6, 'O')}</g>
    <g id="pgm3-tickAO" opacity="0">${pgTickN(pgMid(PGM_A,PGM_O), pgNorm(pgSub(PGM_O,PGM_A)), 1)}</g>
    <g id="pgm3-tickOC" opacity="0">${pgTickN(pgMid(PGM_O,PGM_C), pgNorm(pgSub(PGM_C,PGM_O)), 1)}</g>
    <line id="pgm3-lineBO" opacity="0" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="5,4"/>
    <g id="pgm3-tickOB" opacity="0">${pgTickN(pgMid(PGM_B,PGM_O), pgNorm(pgSub(PGM_O,PGM_B)), 2)}</g>
    <g id="pgm3-tickOD" opacity="0">${pgTickN(pgMid(PGM_O,PGM_D), pgNorm(pgSub(PGM_D,PGM_O)), 2)}</g>
    <g id="pgm3-done" opacity="0">${pgDSide()}</g>
  </svg>
  <div class="step-list" id="pgm3-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On trace la diagonale [AC] et son milieu O.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On trace la demi-droite [BO), prolongée au-delà de O.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On reporte la longueur OB de l'autre côté de O : on obtient D.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pgm3-next" onclick="pgm3Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pgm3Reset()">Recommencer</button>
  </div>
</div>
`;


/* ================= EXERCICES ================= */
document.getElementById('exos-demo-parallelogrammes-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un quadrilatère est un parallélogramme »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : EFGH est un quadrilatère dont les diagonales [EG] et [FH] se coupent en K, milieu de [EG] et de [FH]. Justifie que EFGH est un parallélogramme.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Les diagonales [EG] et [FH] du quadrilatère EFGH se coupent en K, qui est le milieu de [EG] et de [FH].</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si un quadrilatère a ses diagonales qui se coupent en leur milieu, alors c'est un parallélogramme.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> le quadrilatère EFGH est un parallélogramme.</span><span class="we-comment">Conclusion, en appliquant la propriété.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    ABCD est un parallélogramme de centre O tel que AB = 6,4 cm et AD = 4,1 cm. Donne les longueurs DC et BC. Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    ABCD est un parallélogramme tel que <span class="tex">\\widehat{ABC} = 108°</span>. Donne la mesure de l'angle <span class="tex">\\widehat{CDA}</span>. Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    MNPQ est un quadrilatère tel que MN = QP et MN soit parallèle à (QP). Justifie que MNPQ est un parallélogramme.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    RSTU est un quadrilatère non croisé tel que RS = UT et RU = ST. Justifie que RSTU est un parallélogramme.
  </div>
</div>
`;

DEMO_REGISTRY['Parallélogrammes'] = {
  cours:'cours-demo-parallelogrammes-5e', methode:'methode-demo-parallelogrammes-5e', exos:'exos-demo-parallelogrammes-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-parallelogrammes-5e'));
    renderStaticMath(document.getElementById('exos-demo-parallelogrammes-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-parallelogrammes-5e'));
    pgm1Reset(); pgm2Reset(); pgm3Reset();
    registerGeoStepDemo('pgm1-svg', { steps:()=>PGM1_STEPS, getIdx:()=>pgm1Step, goto:(i)=>{ pgm1Step=i; pgm1Render(i); } });
    registerGeoStepDemo('pgm2-svg', { steps:()=>PGM2_STEPS, getIdx:()=>pgm2Step, goto:(i)=>{ pgm2Step=i; pgm2Render(i); } });
    registerGeoStepDemo('pgm3-svg', { steps:()=>PGM3_STEPS, getIdx:()=>pgm3Step, goto:(i)=>{ pgm3Step=i; pgm3Render(i); } });
  }
};

DEMO_QUIZZES['Parallélogrammes'] = [
  {q:"Un parallélogramme a-t-il forcément ses côtés opposés de même longueur ?",
   opts:["Oui, toujours","Non, jamais","Seulement si c'est un rectangle"], correct:0},
  {q:"Un quadrilatère dont les diagonales se coupent en leur milieu est-il forcément un parallélogramme ?",
   opts:["Oui","Non","Seulement si ses côtés sont parallèles en plus"], correct:0},
  {q:"Dans un parallélogramme ABCD, si l'angle en A mesure 70°, combien mesure l'angle en C ?",
   opts:["20°","70°","110°"], correct:1},
];

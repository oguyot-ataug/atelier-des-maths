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
document.getElementById('methode-demo-parallelogrammes-5e').innerHTML = `
<div class="placeholder-box">
  <strong>Constructions en préparation</strong>
  Les 3 méthodes de construction d'un parallélogramme ABCD (à partir de la définition, à partir des longueurs des côtés, à partir des diagonales) suivront dans une prochaine session : elles demandent une animation pas à pas avec équerre et compas.
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-parallelogrammes-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un quadrilatère est un parallélogramme »</h3>
  <div class="redaction-template">
    On considère le quadrilatère EFGH.<br>
    Les diagonales [EG] et [FH] du quadrilatère EFGH se coupent en <span class="fill">K</span>, qui est le milieu de <span class="fill">[EG]</span> et de <span class="fill">[FH]</span>.<br>
    Donc le quadrilatère <span class="fill">EFGH</span> est un parallélogramme.
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

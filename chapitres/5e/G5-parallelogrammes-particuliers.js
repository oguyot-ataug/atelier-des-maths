/* ============================================================
   CHAPITRE : Parallélogrammes particuliers (5e, G5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Réutilise les points/fonctions génériques du parallélogramme déjà définis
   globalement par chapitres/5e/G4-parallelogrammes.js (chargé avant ce fichier) :
   PG_A, PG_B, PG_C, PG_D, pgSub, pgAdd, pgNorm, pgMid, pgLabel, pgTickN,
   pgAngleArc, pgSvgWrap, pgBaseSides, pgBaseLabels -- pour les figures de
   "reconnaître", où l'on part justement d'un parallélogramme quelconque.
   Les figures propres au rectangle/losange/carré utilisent un nouveau
   préfixe pc pour ne pas entrer en conflit avec les fonctions pg.
   ============================================================ */

function pcSub(a,b){ return {x:a.x-b.x, y:a.y-b.y}; }
function pcAdd(a,b){ return {x:a.x+b.x, y:a.y+b.y}; }
function pcScale(a,k){ return {x:a.x*k, y:a.y*k}; }
function pcNorm(v){ const l=Math.hypot(v.x,v.y)||1; return {x:v.x/l, y:v.y/l}; }
function pcMid(a,b){ return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}; }
function pcPerp(v){ return {x:-v.y, y:v.x}; }
function pcLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||13}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}
function pcTickN(mid, dir, n, size){
  size = size||5;
  const perp = pcPerp(dir);
  const spacing = 3.4;
  let out = '';
  for(let i=0;i<n;i++){
    const offset = (i-(n-1)/2)*spacing;
    const base = pcAdd(mid, pcScale(dir, offset));
    const p1 = pcAdd(base, pcScale(perp, size));
    const p2 = pcAdd(base, pcScale(perp, -size));
    out += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  }
  return out;
}
/* Petit carré d'angle droit au sommet, entre les deux côtés adjacents. */
function pcRightAngle(vertex, dirA, dirB, size){
  size = size||14;
  const pA = pcAdd(vertex, pcScale(dirA,size));
  const pB = pcAdd(vertex, pcScale(dirB,size));
  const pC = pcAdd(pA, pcScale(dirB,size));
  return `<polyline points="${pA.x},${pA.y} ${pC.x},${pC.y} ${pB.x},${pB.y}" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>`;
}
function pcSvgWrap(inner, w, h, maxW){
  return `<svg viewBox="0 0 ${w||400} ${h||260}" style="width:100%;max-width:${maxW||380}px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">${inner}</svg>`;
}
function pcQuadSides(A,B,C,D){
  return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
}

/* ===== Points de référence : un vrai rectangle, un vrai losange, un vrai carré ===== */
const PC_R_A={x:80,y:70}, PC_R_B={x:320,y:70}, PC_R_C={x:320,y:190}, PC_R_D={x:80,y:190};
const PC_R_O = pcMid(PC_R_A,PC_R_C);
const PC_L_A={x:60,y:150}, PC_L_B={x:200,y:60}, PC_L_C={x:340,y:150}, PC_L_D={x:200,y:240};
const PC_L_O = pcMid(PC_L_A,PC_L_C);
const PC_S_A={x:120,y:70}, PC_S_B={x:280,y:70}, PC_S_C={x:280,y:230}, PC_S_D={x:120,y:230};
const PC_S_O = pcMid(PC_S_A,PC_S_C);

function pcQuadLabelsRect(A,B,C,D){
  return pcLabel(A.x-16,A.y-6,'A') + pcLabel(B.x+8,B.y-6,'B') + pcLabel(C.x+8,C.y+18,'C') + pcLabel(D.x-16,D.y+18,'D');
}
/* ================= Figures : rectangle ================= */
function pcRectAngleDirs(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  return {
    A:[pcNorm(pcSub(B,A)), pcNorm(pcSub(D,A))],
    B:[pcNorm(pcSub(A,B)), pcNorm(pcSub(C,B))],
    C:[pcNorm(pcSub(B,C)), pcNorm(pcSub(D,C))],
    D:[pcNorm(pcSub(A,D)), pcNorm(pcSub(C,D))],
  };
}
function pcBuildRectAnglesSvg(marked){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  const dirs = pcRectAngleDirs();
  let marks = '';
  marked.forEach(k=>{ marks += pcRightAngle({A,B,C,D}[k], dirs[k][0], dirs[k][1]); });
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}
function pcBuildRectDiagSvg(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D,O=PC_R_O;
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const ticks = pcTickN(pcMid(O,A), pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,B), pcNorm(pcSub(B,O)),1)
    + pcTickN(pcMid(O,C), pcNorm(pcSub(C,O)),1) + pcTickN(pcMid(O,D), pcNorm(pcSub(D,O)),1);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pcLabel(O.x+7,O.y-6,'O');
  return pcSvgWrap(pcQuadSides(A,B,C,D)+diag+ticks+oMark+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

/* ================= Figures : losange ================= */
function pcQuadLabelsLos(A,B,C,D){
  return pcLabel(A.x-16,A.y+4,'A') + pcLabel(B.x-4,B.y-10,'B') + pcLabel(C.x+8,C.y+4,'C') + pcLabel(D.x-6,D.y+20,'D');
}
function pcBuildLosSidesSvg(){
  const A=PC_L_A,B=PC_L_B,C=PC_L_C,D=PC_L_D;
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(B,C), pcNorm(pcSub(C,B)),1)
    + pcTickN(pcMid(C,D), pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A), pcNorm(pcSub(A,D)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+ticks+pcQuadLabelsLos(A,B,C,D), 400, 300, 380);
}
function pcBuildLosDiagSvg(){
  const A=PC_L_A,B=PC_L_B,C=PC_L_C,D=PC_L_D,O=PC_L_O;
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const dAC = pcNorm(pcSub(C,A)), dBD = pcNorm(pcSub(D,B));
  const rightAngle = pcRightAngle(O, dAC, dBD, 11);
  const ticks = pcTickN(pcMid(O,A), pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C), pcNorm(pcSub(C,O)),1)
    + pcTickN(pcMid(O,B), pcNorm(pcSub(B,O)),2) + pcTickN(pcMid(O,D), pcNorm(pcSub(D,O)),2);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pcLabel(O.x+7,O.y-6,'O');
  return pcSvgWrap(pcQuadSides(A,B,C,D)+diag+rightAngle+ticks+oMark+pcQuadLabelsLos(A,B,C,D), 400, 300, 380);
}

/* ================= Figures : carré ================= */
function pcBuildSquareSvg(){
  const A=PC_S_A,B=PC_S_B,C=PC_S_C,D=PC_S_D;
  const dirs = {
    A:[pcNorm(pcSub(B,A)), pcNorm(pcSub(D,A))], B:[pcNorm(pcSub(A,B)), pcNorm(pcSub(C,B))],
    C:[pcNorm(pcSub(B,C)), pcNorm(pcSub(D,C))], D:[pcNorm(pcSub(A,D)), pcNorm(pcSub(C,D))],
  };
  const marks = ['A','B','C','D'].map(k=>pcRightAngle({A,B,C,D}[k], dirs[k][0], dirs[k][1])).join('');
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(B,C), pcNorm(pcSub(C,B)),1)
    + pcTickN(pcMid(C,D), pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A), pcNorm(pcSub(A,D)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+ticks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

/* ================= Figures "reconnaître" : parallélogramme quelconque (réutilise G4) ================= */
function pcBuildParaOneRightAngleSvg(){
  const dAB = pgNorm(pgSub(PG_B,PG_A));
  const dAD = pgNorm(pgSub(PG_D,PG_A));
  const mark = pcRightAngle(PG_A, dAB, dAD, 14);
  return pgSvgWrap(pgBaseSides() + mark + pgBaseLabels());
}
function pcBuildParaEqualDiagSvg(){
  const O = pgMid(PG_A,PG_C);
  const diag = `<line x1="${PG_A.x}" y1="${PG_A.y}" x2="${PG_C.x}" y2="${PG_C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${PG_B.x}" y1="${PG_B.y}" x2="${PG_D.x}" y2="${PG_D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const ticks = pgTickN(pgMid(O,PG_A), pgNorm(pgSub(PG_A,O)),1) + pgTickN(pgMid(O,PG_C), pgNorm(pgSub(PG_C,O)),1)
    + pgTickN(pgMid(O,PG_B), pgNorm(pgSub(PG_B,O)),1) + pgTickN(pgMid(O,PG_D), pgNorm(pgSub(PG_D,O)),1);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pgLabel(O.x+7,O.y-6,'O');
  return pgSvgWrap(pgBaseSides() + diag + ticks + oMark + pgBaseLabels());
}
function pcBuildParaTwoSidesSvg(){
  const abDir = pgNorm(pgSub(PG_B,PG_A));
  const adDir = pgNorm(pgSub(PG_D,PG_A));
  const ticks = pgTickN(pgMid(PG_A,PG_B), abDir, 1) + pgTickN(pgMid(PG_A,PG_D), adDir, 1);
  return pgSvgWrap(pgBaseSides() + ticks + pgBaseLabels());
}
function pcBuildParaPerpDiagSvg(){
  const O = pgMid(PG_A,PG_C);
  const diag = `<line x1="${PG_A.x}" y1="${PG_A.y}" x2="${PG_C.x}" y2="${PG_C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${PG_B.x}" y1="${PG_B.y}" x2="${PG_D.x}" y2="${PG_D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const dAC = pgNorm(pgSub(PG_C,PG_A)), dBD = pgNorm(pgSub(PG_D,PG_B));
  const rightAngle = pcRightAngle(O, dAC, dBD, 11);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pgLabel(O.x+7,O.y-6,'O');
  return pgSvgWrap(pgBaseSides() + diag + rightAngle + oMark + pgBaseLabels());
}
function pcBuildLosOneRightSvg(){
  const dAB = pcNorm(pcSub(PC_L_B,PC_L_A));
  const dAD = pcNorm(pcSub(PC_L_D,PC_L_A));
  const mark = pcRightAngle(PC_L_A, dAB, dAD, 14);
  const ticks = pcTickN(pcMid(PC_L_A,PC_L_B), pcNorm(pcSub(PC_L_B,PC_L_A)),1) + pcTickN(pcMid(PC_L_B,PC_L_C), pcNorm(pcSub(PC_L_C,PC_L_B)),1)
    + pcTickN(pcMid(PC_L_C,PC_L_D), pcNorm(pcSub(PC_L_D,PC_L_C)),1) + pcTickN(pcMid(PC_L_D,PC_L_A), pcNorm(pcSub(PC_L_A,PC_L_D)),1);
  return pcSvgWrap(pcQuadSides(PC_L_A,PC_L_B,PC_L_C,PC_L_D)+mark+ticks+pcQuadLabelsLos(PC_L_A,PC_L_B,PC_L_C,PC_L_D), 400, 300, 380);
}
function pcBuildRectTwoSidesSvg(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  const dirs = pcRectAngleDirs();
  const marks = pcRightAngle(A,dirs.A[0],dirs.A[1]) + pcRightAngle(B,dirs.B[0],dirs.B[1]) + pcRightAngle(C,dirs.C[0],dirs.C[1]) + pcRightAngle(D,dirs.D[0],dirs.D[1]);
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(A,D), pcNorm(pcSub(D,A)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+ticks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

document.getElementById('cours-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le rectangle</h3></div>

<p class="example-title" style="margin-top:0;">A. Définition et propriétés caractéristiques</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>rectangle</b> est un quadrilatère qui a ses quatre angles droits.</div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère est un <b>rectangle</b> alors c'est un <b>parallélogramme</b>.</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">MNPQ est un rectangle. Il a donc quatre angles droits.</p>
<p style="margin:2px 0;">Les droites (MN) et (QP) sont perpendiculaires à la même droite (NP), donc elles sont parallèles entre elles.</p>
<p style="margin:2px 0 12px;">Les droites (MQ) et (NP) sont perpendiculaires à la même droite (QP), donc elles sont parallèles entre elles. Donc MNPQ est un parallélogramme.</p>
<p class="hint" style="margin:0 0 14px;">Remarque : un rectangle a donc toutes les propriétés du parallélogramme.</p>
<div class="figure-wrap">${pcBuildRectAnglesSvg(['A','B','C','D'])}</div>
<p style="margin:10px 0 14px;">ABCD est un rectangle. Ses quatre angles sont droits.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère est un <b>rectangle</b> alors ses diagonales se coupent en leur milieu et ont la même longueur.</div>
<div class="figure-wrap">${pcBuildRectDiagSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un rectangle de centre O. Donc ses diagonales [AC] et [BD] se coupent en leur milieu O et ont la même longueur : OA = OB = OC = OD et AC = BD.</p>

<p class="example-title" style="margin-top:22px;">B. Reconnaître un rectangle</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère possède <b>trois angles droits</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcBuildRectAnglesSvg(['A','B','C'])}</div>
<p style="margin:10px 0 14px;">Le quadrilatère ABCD a trois angles droits en A, B et C. Or, la somme des angles d'un quadrilatère est toujours égale à 360°. Donc l'angle en D mesure aussi 90°, et ABCD est un rectangle.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>parallélogramme</b> a ses diagonales de <b>même longueur</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcBuildParaEqualDiagSvg()}</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0 14px;">ABCD est un parallélogramme tel que AC = BD. Ses côtés opposés ont donc la même longueur deux à deux, et ses diagonales ont la même longueur : ABCD est donc un rectangle.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">Si un <b>parallélogramme</b> a un <b>angle droit</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcBuildParaOneRightAngleSvg()}</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">ABCD est un parallélogramme dont l'angle en A est droit.</p>
<p style="margin:2px 0;">Les côtés (AB) et (CD) sont parallèles et, comme (AD) est perpendiculaire à (AB), (AD) est également perpendiculaire à (CD). Donc l'angle en D est droit également.</p>
<p style="margin:2px 0 14px;">De la même manière, les angles en B et en C sont droits eux aussi. Donc le parallélogramme ABCD est un rectangle.</p>

<div class="lesson-header"><span class="num">2</span><h3>Le losange</h3></div>

<p class="example-title" style="margin-top:0;">A. Définition et propriétés caractéristiques</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>losange</b> est un quadrilatère qui a ses quatre côtés de même longueur.</div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère est un <b>losange</b> alors c'est un <b>parallélogramme</b>.</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0 12px;">Les côtés opposés du losange ont la même longueur deux à deux (puisque ses quatre côtés sont égaux), donc c'est un parallélogramme.</p>
<p class="hint" style="margin:0 0 14px;">Remarque : un losange a donc toutes les propriétés du parallélogramme.</p>
<div class="figure-wrap">${pcBuildLosSidesSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un losange. AB = BC = CD = DA, donc ABCD est un losange.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère est un <b>losange</b> alors ses diagonales se coupent en leur milieu et sont perpendiculaires.</div>
<div class="figure-wrap">${pcBuildLosDiagSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un losange de centre O. Donc ses diagonales [AC] et [BD] se coupent en leur milieu O et sont perpendiculaires : OA = OC, OB = OD et (AC) ⊥ (BD).</p>

<p class="example-title" style="margin-top:22px;">B. Reconnaître un losange</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un <b>parallélogramme</b> a <b>deux côtés consécutifs de même longueur</b> alors c'est un <b>losange</b>.</div>
<div class="figure-wrap">${pcBuildParaTwoSidesSvg()}</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">ABCD est un parallélogramme tel que AB = AD. Ses côtés opposés ont donc la même longueur deux à deux : AB = CD et AD = BC.</p>
<p style="margin:2px 0 14px;">Or AB = AD, donc AB = BC = CD = DA. Le quadrilatère ABCD a ses quatre côtés de même longueur : c'est donc un losange.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>parallélogramme</b> a ses diagonales <b>perpendiculaires</b> alors c'est un <b>losange</b>.</div>
<div class="figure-wrap">${pcBuildParaPerpDiagSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un parallélogramme dont les diagonales [AC] et [BD] sont perpendiculaires. Donc le parallélogramme ABCD est un losange.</p>

<div class="lesson-header"><span class="num">3</span><h3>Le carré</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Un <b>carré</b> est un quadrilatère qui a quatre angles droits et quatre côtés de même longueur.</div>
<div class="figure-wrap">${pcBuildSquareSvg()}</div>
<p style="margin:10px 0 6px;">ABCD est un carré. AB = BC = CD = DA et (AB) ⊥ (BC) ; (BC) ⊥ (CD) ; (CD) ⊥ (DA) ; (DA) ⊥ (AB).</p>
<p class="hint" style="margin:0 0 14px;">Remarques : un carré est un quadrilatère qui est à la fois un rectangle et un losange. Un carré a donc toutes les propriétés du parallélogramme, du rectangle et du losange.</p>

<p class="example-title" style="margin-top:0;">Reconnaître un carré</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un <b>losange</b> a un <b>angle droit</b> alors c'est un <b>carré</b>.</div>
<div class="figure-wrap">${pcBuildLosOneRightSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un losange dont l'angle en A est droit. Un losange a toutes les propriétés du parallélogramme, donc les angles en B, C et D sont droits également (Propriété 3 du rectangle). ABCD a donc ses quatre côtés égaux et ses quatre angles droits : c'est un carré.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>rectangle</b> a <b>deux côtés consécutifs de même longueur</b> alors c'est un <b>carré</b>.</div>
<div class="figure-wrap">${pcBuildRectTwoSidesSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un rectangle tel que AB = AD. Un rectangle est un parallélogramme, donc ABCD est aussi un losange (Propriété 1 du losange). ABCD a donc ses quatre angles droits et ses quatre côtés égaux : c'est un carré.</p>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="placeholder-box">
  <strong>Méthode en préparation</strong>
  Les constructions (rectangle connaissant une diagonale et un côté, losange connaissant ses deux diagonales) suivront dans une prochaine session.
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un quadrilatère est un losange »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : EFGH est un parallélogramme tel que EF = EH. Justifie que EFGH est un losange.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">EFGH est un parallélogramme tel que EF = EH.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si un parallélogramme a deux côtés consécutifs de même longueur, alors c'est un losange.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> le quadrilatère EFGH est un losange.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    MNPQ est un rectangle de centre O tel que MP = 7,2 cm. Donne les longueurs OM, ON, OP et OQ. Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    RSTU est un parallélogramme dont les diagonales [RT] et [SU] sont perpendiculaires. Justifie que RSTU est un losange.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    VWXY est un quadrilatère tel que les angles en V, W et X sont droits. Justifie que VWXY est un rectangle.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    ABCD est un losange tel que l'angle en A mesure 90°. Justifie que ABCD est un carré.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Un quadrilatère peut-il être un losange sans être un parallélogramme ? Justifie ta réponse.
  </div>
</div>
`;

DEMO_REGISTRY['Parallélogrammes particuliers'] = {
  cours:'cours-demo-parallelogrammes-particuliers-5e', methode:'methode-demo-parallelogrammes-particuliers-5e', exos:'exos-demo-parallelogrammes-particuliers-5e',
  init:()=>{
    injectCourseAddButtons(document.getElementById('cours-demo-parallelogrammes-particuliers-5e'));
  }
};

DEMO_QUIZZES['Parallélogrammes particuliers'] = [
  {q:"Un rectangle a-t-il forcément des diagonales de même longueur ?",
   opts:["Oui, toujours","Non, jamais","Seulement si c'est un carré"], correct:0},
  {q:"Un parallélogramme dont les diagonales sont perpendiculaires est un...",
   opts:["Rectangle","Losange","Carré"], correct:1},
  {q:"Un quadrilatère a trois angles droits. Que peut-on en conclure ?",
   opts:["Rien, il faut vérifier le 4e angle","C'est forcément un rectangle","C'est forcément un losange"], correct:1},
  {q:"Un carré est...",
   opts:["Un rectangle mais jamais un losange","Un losange mais jamais un rectangle","À la fois un rectangle et un losange"], correct:2},
];

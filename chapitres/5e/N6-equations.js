/* ============================================================
   CHAPITRE : Équations (5e, N6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

const EQ_AB_STEPS = [
  {expr:'<span class="tex">x + 12 = 25</span>', note:"On part de la première équation."},
  {expr:'<span class="tex">x + 12 - 12 = 25 - 12</span>', note:"On soustrait 12 aux deux membres, pour isoler le terme x."},
  {expr:'<span class="tex">x = 13</span>', note:"On simplifie chaque membre. 13 est la solution de x + 12 = 25."},
  {expr:'<div style="margin-top:20px;"><span class="tex">y - 9 = -14</span></div>', note:"On passe à la seconde équation, dont l'inconnue est notée y."},
  {expr:'<span class="tex">y - 9 + 9 = -14 + 9</span>', note:"On ajoute 9 aux deux membres, pour isoler le terme y."},
  {expr:'<span class="tex">y = -5</span>', note:"On simplifie chaque membre. -5 est la solution de y - 9 = -14."},
];
const eqAbDemo = makeStepDemo(EQ_AB_STEPS, 'eqAbDisplay');

const EQ_AX_STEPS = [
  {expr:'<span class="tex">6x = 42</span>', note:"On part de la première équation."},
  {expr:'<span class="tex">\\dfrac{6x}{6} = \\dfrac{42}{6}</span>', note:"On divise les deux membres par 6, pour isoler le terme x."},
  {expr:'<span class="tex">x = 7</span>', note:"On simplifie chaque membre. 7 est la solution de 6x = 42."},
  {expr:'<div style="margin-top:20px;"><span class="tex">\\dfrac{y}{4} = 3,5</span></div>', note:"On passe à la seconde équation, dont l'inconnue est notée y."},
  {expr:'<span class="tex">\\dfrac{y}{4} \\times 4 = 3,5 \\times 4</span>', note:"On multiplie les deux membres par 4, pour isoler le terme y."},
  {expr:'<span class="tex">y = 14</span>', note:"On simplifie chaque membre. 14 est la solution de y/4 = 3,5."},
];
const eqAxDemo = makeStepDemo(EQ_AX_STEPS, 'eqAxDisplay');

document.getElementById('cours-demo-equations-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Notion d'équation</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Une <b>équation</b> à une inconnue est une égalité entre deux expressions littérales (deux membres) comportant une ou plusieurs fois la même lettre.</div>

<p style="margin:12px 0 8px;"><b>Exemple 1</b> : l'égalité <span class="tex">x + 15 = 42</span> est une équation.</p>
<p style="margin:2px 0;">Elle comporte deux membres : le membre de gauche <span class="tex">x + 15</span> et le membre de droite <span class="tex">42</span>.</p>
<p style="margin:2px 0 14px;">Ces deux expressions sont séparées par le symbole « = ». L'inconnue est notée à l'aide de la lettre « x » et est présente dans le membre de gauche.</p>

<span class="def-badge">Définition</span>
<div class="def-box"><b>Résoudre une équation</b> à une inconnue, c'est trouver toutes les valeurs de l'inconnue qui vérifient l'égalité. Ces valeurs sont appelées « <b>solutions</b> » de l'équation.</div>

<p style="margin:12px 0 8px;"><b>Exemple 2</b> : on considère l'équation <span class="tex">x + 9 = 16</span>.</p>
<p style="margin:2px 0 14px;">Quand <span class="tex">x = 7</span>, l'égalité est vérifiée puisque <span class="tex">7 + 9 = 16</span>. Donc 7 est solution de cette équation.</p>

<div class="lesson-header"><span class="num">2</span><h3>Résolution d'équations du premier degré</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Une équation du premier degré a <b>une unique solution</b>.</div>

<p class="example-title" style="margin-top:18px;">A. Équations du type <span class="tex">x + b = c</span></p>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">On ne change pas une égalité quand on <b>additionne</b> ou <b>soustrait</b> un même nombre aux deux membres de l'égalité.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous les équations <span class="tex">x + 12 = 25</span> et <span class="tex">y - 9 = -14</span>.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la résolution.</p>
  <div class="step-display" id="eqAbDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eqAbDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqAbDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:22px;">B. Équations du type <span class="tex">ax = c</span></p>
<span class="prop-badge">Propriété 3</span>
<div class="def-box">On ne change pas une égalité quand on <b>multiplie</b> ou <b>divise</b> les deux membres de l'égalité par un même nombre non nul.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous les équations <span class="tex">6x = 42</span> et <span class="tex">\\dfrac{y}{4} = 3,5</span>.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la résolution.</p>
  <div class="step-display" id="eqAxDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eqAxDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqAxDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= METHODE : mise en équation avec une balance ================= */
function eqDrawItem(x, y, item){
  if(item.ball){
    return `<circle cx="${x}" cy="${y}" r="16" fill="#EADCF8" stroke="#6b3fa0" stroke-width="1.5"/>
      <text x="${x}" y="${y+5}" font-size="14" text-anchor="middle" font-weight="700" fill="#5b2d91">x</text>`;
  }
  return `<rect x="${x-18}" y="${y-12}" width="36" height="24" rx="4" fill="#FDECD8" stroke="#C77D1E" stroke-width="1.5"/>
    <text x="${x}" y="${y+5}" font-size="11" text-anchor="middle" font-weight="700" fill="#8A4210">${item.label}</text>`;
}
function eqDrawPanItems(cx, y, items, spacing){
  const startX = cx - (items.length-1)*spacing/2;
  return items.map((it,i)=>eqDrawItem(startX+i*spacing, y, it)).join('');
}
function eqBuildBalanceSvg(svgId, leftItems, rightItems){
  const midX=200, beamY=70, panY=125, leftX=90, rightX=310;
  const maxCount = Math.max(leftItems.length, rightItems.length, 1);
  const spacing = maxCount>=4 ? 110/(maxCount-1) : 40;
  const panHalf = Math.max(32, (maxCount-1)*spacing/2 + 22);
  let s = `<svg id="${svgId}" viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += `<polygon points="${midX-14},172 ${midX+14},172 ${midX},144" fill="#1C1B2E"/>`;
  s += `<rect x="${midX-30}" y="190" width="60" height="8" rx="3" fill="#1C1B2E"/>`;
  s += `<line x1="${leftX}" y1="${beamY}" x2="${rightX}" y2="${beamY}" stroke="#1C1B2E" stroke-width="3"/>`;
  s += `<line x1="${midX}" y1="${beamY}" x2="${midX}" y2="144" stroke="#1C1B2E" stroke-width="2"/>`;
  [leftX,rightX].forEach(px=>{
    s += `<line x1="${px-panHalf+6}" y1="${beamY}" x2="${px-panHalf+6}" y2="${panY}" stroke="#5B6B78" stroke-width="1.2"/>`;
    s += `<line x1="${px+panHalf-6}" y1="${beamY}" x2="${px+panHalf-6}" y2="${panY}" stroke="#5B6B78" stroke-width="1.2"/>`;
    s += `<path d="M ${px-panHalf} ${panY} Q ${px} ${panY+22} ${px+panHalf} ${panY}" fill="none" stroke="#1C1B2E" stroke-width="2"/>`;
  });
  s += eqDrawPanItems(leftX, panY-22, leftItems, spacing);
  s += eqDrawPanItems(rightX, panY-22, rightItems, spacing);
  s += `</svg>`;
  return s;
}
const EQ_BALL = {ball:true};
function eqW(label){ return {label}; }

let eqBal1Step = 0;
function eqBal1Update(step){
  const left = step>=1 ? [EQ_BALL] : [EQ_BALL, eqW('20 g')];
  const right = step>=1 ? [eqW('40 g')] : [eqW('60 g')];
  document.getElementById('eqBal1Wrap').innerHTML = eqBuildBalanceSvg('eqBal1Svg', left, right);
  document.querySelectorAll('#eqBal1Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal1Next').textContent = step>=1 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal1Next').disabled = step>=1;
}
function eqBal1Next(){ if(eqBal1Step<1){ eqBal1Step++; eqBal1Update(eqBal1Step); } }
function eqBal1Reset(){ eqBal1Step=0; eqBal1Update(0); }
const EQ_BAL1_STEPS = [
  {note:"Une boule de masse inconnue x et un poids de 20 g sont posés à gauche ; un poids de 60 g est posé à droite. La balance est équilibrée : x + 20 = 60."},
  {note:"On retire 20 g de chaque plateau : la balance reste équilibrée. À gauche il reste la boule, à droite 60 − 20 = 40 g. Donc x = 40."},
];

let eqBal2Step = 0;
function eqBal2Update(step){
  const left = step>=1 ? [EQ_BALL] : [EQ_BALL, EQ_BALL];
  const right = step>=1 ? [eqW('45 g')] : [eqW('90 g')];
  document.getElementById('eqBal2Wrap').innerHTML = eqBuildBalanceSvg('eqBal2Svg', left, right);
  document.querySelectorAll('#eqBal2Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal2Next').textContent = step>=1 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal2Next').disabled = step>=1;
}
function eqBal2Next(){ if(eqBal2Step<1){ eqBal2Step++; eqBal2Update(eqBal2Step); } }
function eqBal2Reset(){ eqBal2Step=0; eqBal2Update(0); }
const EQ_BAL2_STEPS = [
  {note:"Deux boules identiques (chacune de masse x) sont posées à gauche ; un poids de 90 g est posé à droite. La balance est équilibrée : 2x = 90."},
  {note:"On partage chaque plateau en 2 parts égales : il reste une boule à gauche, et 90 : 2 = 45 g à droite. Donc x = 45."},
];

let eqBal3Step = 0;
function eqBal3Update(step){
  let left, right;
  if(step===0){ left=[EQ_BALL,EQ_BALL,EQ_BALL,eqW('15 g')]; right=[eqW('60 g')]; }
  else if(step===1){ left=[EQ_BALL,EQ_BALL,EQ_BALL]; right=[eqW('45 g')]; }
  else { left=[EQ_BALL]; right=[eqW('15 g')]; }
  document.getElementById('eqBal3Wrap').innerHTML = eqBuildBalanceSvg('eqBal3Svg', left, right);
  document.querySelectorAll('#eqBal3Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal3Next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal3Next').disabled = step>=2;
}
function eqBal3Next(){ if(eqBal3Step<2){ eqBal3Step++; eqBal3Update(eqBal3Step); } }
function eqBal3Reset(){ eqBal3Step=0; eqBal3Update(0); }
const EQ_BAL3_STEPS = [
  {note:"Trois boules identiques et un poids de 15 g sont posés à gauche ; un poids de 60 g est posé à droite. La balance est équilibrée : 3x + 15 = 60."},
  {note:"On retire 15 g de chaque plateau : il reste 3 boules à gauche, et 60 − 15 = 45 g à droite. 3x = 45."},
  {note:"On partage chaque plateau en 3 parts égales : il reste une boule à gauche, et 45 : 3 = 15 g à droite. Donc x = 15."},
];

document.getElementById('methode-demo-equations-5e').innerHTML = `
<p style="margin:0 0 14px;">Une équation peut se représenter par une <b>balance équilibrée</b> : chaque plateau porte le même poids total. Une boule représente la masse inconnue x. Faire la même opération sur les deux plateaux garde la balance équilibrée -- exactement comme faire la même opération sur les deux membres d'une égalité.</p>

<p class="example-title" style="margin-top:0;">Une boule et un poids</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal1Wrap"></div>
  <div class="step-list" id="eqBal1Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation x + 20 = 60.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On retire 20 g de chaque plateau : x = 40.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal1Next" onclick="eqBal1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal1Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">On complexifie : plusieurs boules</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal2Wrap"></div>
  <div class="step-list" id="eqBal2Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation 2x = 90.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On partage chaque plateau en 2 parts égales : x = 45.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal2Next" onclick="eqBal2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal2Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">On complexifie encore : boules et poids ensemble</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal3Wrap"></div>
  <div class="step-list" id="eqBal3Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation 3x + 15 = 60.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On retire 15 g de chaque plateau : 3x = 45.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On partage chaque plateau en 3 parts égales : x = 15.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal3Next" onclick="eqBal3Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal3Reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-equations-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Résoudre une équation du type x + b = c »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : résous l'équation <span class="tex">x + 17 = 30</span>.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">x + 17 = 30</span></span><span class="we-comment">Ce que je sais : l'équation de départ.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> on ne change pas une égalité en soustrayant un même nombre aux deux membres.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> <span class="tex">x + 17 - 17 = 30 - 17</span>, soit <span class="tex">x = 13</span>. 13 est la solution de cette équation.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Parmi les valeurs 4, 5 et 6, laquelle est solution de l'équation <span class="tex">x + 8 = 13</span> ?
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Résous l'équation <span class="tex">x + 23 = 15</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Résous l'équation <span class="tex">x - 6 = -11</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Résous l'équation <span class="tex">8x = 52</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Résous l'équation <span class="tex">\\dfrac{x}{5} = 1,8</span>, en détaillant chaque étape.
  </div>
</div>
`;

DEMO_REGISTRY['Équations'] = {
  cours:'cours-demo-equations-5e', methode:'methode-demo-equations-5e', exos:'exos-demo-equations-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-equations-5e'));
    renderStaticMath(document.getElementById('exos-demo-equations-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-equations-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-equations-5e'));
    eqAbDemo.reset(); eqAxDemo.reset();
    eqBal1Reset(); eqBal2Reset(); eqBal3Reset();
    registerGeoStepDemo('eqBal1Svg', { steps:()=>EQ_BAL1_STEPS, getIdx:()=>eqBal1Step, goto:(i)=>{ eqBal1Step=i; eqBal1Update(i); } });
    registerGeoStepDemo('eqBal2Svg', { steps:()=>EQ_BAL2_STEPS, getIdx:()=>eqBal2Step, goto:(i)=>{ eqBal2Step=i; eqBal2Update(i); } });
    registerGeoStepDemo('eqBal3Svg', { steps:()=>EQ_BAL3_STEPS, getIdx:()=>eqBal3Step, goto:(i)=>{ eqBal3Step=i; eqBal3Update(i); } });
  }
};

DEMO_QUIZZES['Équations'] = [
  {q:"Une équation à une inconnue est...",
   opts:["Une égalité entre deux expressions littérales comportant la même lettre","Une addition de deux nombres","Un tableau de proportionnalité"], correct:0},
  {q:"Résoudre une équation, c'est...",
   opts:["Calculer le membre de gauche","Trouver toutes les valeurs de l'inconnue qui vérifient l'égalité","Développer l'expression"], correct:1},
  {q:"Une équation du premier degré a...",
   opts:["Aucune solution","Une unique solution","Une infinité de solutions"], correct:1},
  {q:"Pour résoudre x + 6 = 20, on...",
   opts:["Multiplie les deux membres par 6","Soustrait 6 aux deux membres","Divise les deux membres par 6"], correct:1},
];

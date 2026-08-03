/* ============================================================
   CHAPITRE : Équations (5e, N6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

const EQ_AB_STEPS = [
  {expr:'<span class="tex">x + 12 = 25</span>', note:"On part de l'équation."},
  {expr:'<span class="tex">x + 12 - 12 = 25 - 12</span>', note:"On soustrait 12 aux deux membres, pour isoler le terme x."},
  {expr:'<span class="tex">x = 13</span>', note:"On simplifie chaque membre. 13 est la solution de x + 12 = 25."},
  {expr:'<span class="tex">x - 9 = -14</span>', note:"On part de la seconde équation."},
  {expr:'<span class="tex">x - 9 + 9 = -14 + 9</span>', note:"On ajoute 9 aux deux membres, pour isoler le terme x."},
  {expr:'<span class="tex">x = -5</span>', note:"On simplifie chaque membre. -5 est la solution de x - 9 = -14."},
];
const eqAbDemo = makeStepDemo(EQ_AB_STEPS, 'eqAbDisplay');

const EQ_AX_STEPS = [
  {expr:'<span class="tex">6x = 42</span>', note:"On part de l'équation."},
  {expr:'<span class="tex">\\dfrac{6x}{6} = \\dfrac{42}{6}</span>', note:"On divise les deux membres par 6, pour isoler le terme x."},
  {expr:'<span class="tex">x = 7</span>', note:"On simplifie chaque membre. 7 est la solution de 6x = 42."},
  {expr:'<span class="tex">\\dfrac{x}{4} = 3,5</span>', note:"On part de la seconde équation."},
  {expr:'<span class="tex">\\dfrac{x}{4} \\times 4 = 3,5 \\times 4</span>', note:"On multiplie les deux membres par 4, pour isoler le terme x."},
  {expr:'<span class="tex">x = 14</span>', note:"On simplifie chaque membre. 14 est la solution de x/4 = 3,5."},
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

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous ces deux équations.</p>
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

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous ces deux équations.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la résolution.</p>
  <div class="step-display" id="eqAxDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eqAxDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqAxDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-equations-5e').innerHTML = `
<div class="placeholder-box">
  <strong>Méthode en préparation</strong>
  Une méthode animée (choisir la bonne opération pour résoudre une équation) suivra dans une prochaine session.
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
    eqAbDemo.reset(); eqAxDemo.reset();
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

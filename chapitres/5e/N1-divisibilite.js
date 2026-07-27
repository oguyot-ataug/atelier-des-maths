/* ============================================================
   CHAPITRE : Divisibilité (5e, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Contenu détaché du chapitre 6e "Nombres entiers" (qui le comportait comme
   simple complément) pour former son propre chapitre 5e à part entière.
   ============================================================ */
document.getElementById('cours-demo-divisibilite-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Multiples et diviseurs d'un nombre entier</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  Soient a et b deux nombres entiers.
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>a est un <b>multiple</b> de b si a est le produit de b par un nombre entier ;</li>
    <li>b est alors un <b>diviseur</b> de a.</li>
  </ul>
</div>
<p class="example-title">Exemple : soit l'égalité 4 216 = 68 × 62. Fais une phrase avec les mots multiple et diviseur.</p>
<ul class="example-list">
  <li>4 216 est un <b>multiple</b> de 68. (Et de 62 aussi !)</li>
  <li>68 est un <b>diviseur</b> de 4 216. On dit aussi « 4 216 est divisible par 68 » ou « 68 divise 4 216 ».</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : 0 est un multiple de tout nombre entier, et tout nombre entier est un multiple de lui-même. Il existe une infinité de multiples d'un nombre entier non nul, mais un nombre entier non nul n'a qu'un nombre fini de diviseurs.
</div>

<div class="lesson-header"><span class="num">2</span><h3>Critères de divisibilité</h3></div>
<span class="prop-badge">Règles</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Un nombre entier est <b>divisible par 2</b> (pair) si son chiffre des unités est 0, 2, 4, 6 ou 8.</li>
    <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.</li>
    <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.</li>
    <li>Un nombre entier est <b>divisible par 3</b> si la somme de ses chiffres est divisible par 3.</li>
    <li>Un nombre entier est <b>divisible par 9</b> si la somme de ses chiffres est divisible par 9.</li>
  </ul>
</div>
<p class="example-title">Exemple 1 : on considère le nombre 92 815. Est-il divisible par 2, par 5 et par 10 ?</p>
<ul class="example-list">
  <li>Son chiffre des unités est 5, donc 92 815 <b>n'est pas divisible par 2</b>.</li>
  <li>Son chiffre des unités est 5, donc 92 815 est <b>divisible par 5</b>.</li>
  <li>Son chiffre des unités n'est pas 0, donc 92 815 <b>n'est pas divisible par 10</b>.</li>
</ul>
<p class="example-title">Exemple 2 : le nombre 4 158 est-il divisible par 3 ? Par 9 ?</p>
<ul class="example-list">
  <li>La somme de ses chiffres est 4 + 1 + 5 + 8 = 18. Or, 18 est divisible par 3, donc 4 158 <b>est divisible par 3</b>.</li>
  <li>18 est aussi divisible par 9, donc 4 158 <b>est divisible par 9</b>.</li>
</ul>
`;

document.getElementById('methode-demo-divisibilite-5e').innerHTML = `
<div class="figure-wrap">
  <strong style="font-family:'Space Grotesk',sans-serif;">Trouver les premiers multiples d'un nombre : 7</strong>
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="dv-multiplesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="dvMultiplesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="dvMultiplesDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="figure-wrap" style="margin-top:20px;">
  <strong style="font-family:'Space Grotesk',sans-serif;">Tester la divisibilité par 3 d'un grand nombre</strong>
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="dv-div3Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="dvDiv3Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="dvDiv3Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-divisibilite-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un nombre est un multiple d'un autre »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On considère 96 et 8.</span><span class="we-comment"></span></div>
    <div class="we-row"><span class="we-expr">96 = 8 × 12</span><span class="we-comment">96 est bien le produit de 8 par un nombre entier.</span></div>
    <div class="we-row"><span class="we-expr">Donc 96 est un multiple de 8, et 8 est un diviseur de 96.</span><span class="we-comment"></span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    En utilisant les critères de divisibilité, dis si 63 480 est divisible par 2, par 5 et par 10.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Le nombre 7 254 est-il divisible par 3 ? Par 9 ? Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Sachant que 1 274 = 49 × 26, écris une phrase avec les mots « multiple » et « diviseur ».
  </div>
</div>
`;

/* ---- Méthode : premiers multiples de 7 ---- */
const DV_MULTIPLES_STEPS = [
  {expr:'Multiples de 7 ?', note:"On multiplie 7 par 0, puis 1, puis 2... dans l'ordre."},
  {expr:'7 × 0 = 0', note:'0 est un multiple de tout nombre entier.'},
  {expr:'7 × 1 = 7', note:'7 est un multiple de 7 (comme tout nombre est multiple de lui-même).'},
  {expr:'7 × 2 = 14', note:'…'},
  {expr:'7 × 3 = 21', note:'…'},
  {expr:'7 × 4 = 28', note:'…'},
  {expr:'7 × 5 = 35', note:'…'},
  {expr:'0 — 7 — 14 — 21 — 28 — 35 — …', note:'On continue ainsi indéfiniment : il existe une infinité de multiples de 7.'},
];
const dvMultiplesDemo = makeStepDemo(DV_MULTIPLES_STEPS, 'dv-multiplesDisplay');

/* ---- Méthode : divisibilité par 3 d'un grand nombre ---- */
const DV_DIV3_STEPS = [
  {expr:'Le nombre 5 481 est-il divisible par 3 ?', note:"On reprend le critère de divisibilité par 3."},
  {expr:'5 + 4 + 8 + 1 = 18', note:"On calcule la somme des chiffres du nombre."},
  {expr:'Or, 18 est divisible par 3.', note:"On applique le critère à cette somme."},
  {expr:'Donc 5 481 est divisible par 3.', note:"Conclusion."},
];
const dvDiv3Demo = makeStepDemo(DV_DIV3_STEPS, 'dv-div3Display');

DEMO_REGISTRY['Divisibilité'] = {
  cours:'cours-demo-divisibilite-5e', methode:'methode-demo-divisibilite-5e', exos:'exos-demo-divisibilite-5e',
  init:()=>{
    dvMultiplesDemo.reset();
    dvDiv3Demo.reset();
    injectCourseAddButtons(document.getElementById('cours-demo-divisibilite-5e'));
  }
};

DEMO_QUIZZES['Divisibilité'] = [
  {q:"96 = 8 × 12. Que peut-on dire de 96 par rapport à 8 ?",
   opts:["96 est un diviseur de 8","96 est un multiple de 8","96 n'a aucun lien avec 8"], correct:1},
  {q:"52 340 est-il divisible par 5 ?",
   opts:["Oui (chiffre des unités 0)","Non","On ne peut pas savoir"], correct:0},
  {q:"Un nombre entier est divisible par 3 si...",
   opts:["Son chiffre des unités est 3","La somme de ses chiffres est divisible par 3","Il est impair"], correct:1},
  {q:"0 est-il un multiple de 7 ?",
   opts:["Oui","Non","Seulement si 7 est pair"], correct:0},
];

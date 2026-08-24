/* ============================================================
   CHAPITRE : Divisibilité (5e, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Contenu repris des paragraphes 4 et 5 (Multiples et diviseurs ;
   Critères de divisibilité) du chapitre "Opérations sur les nombres
   décimaux", qui les portait à tort, pour former ce chapitre à part entière.
   ============================================================ */
document.getElementById('cours-demo-divisibilite-5e').innerHTML = `
      <div class="lesson-header"><span class="num">1</span><h3>Multiples et diviseurs</h3></div>
      <span class="def-badge">Définitions</span>
      <div class="def-box">
        Soient a et b deux nombres entiers naturels. Si le reste de la division euclidienne de a par b est nul, <b>alors</b> :
        <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
          <li>a est <b>divisible</b> par b ;</li>
          <li>b est un <b>diviseur</b> de a ;</li>
          <li>a est un <b>multiple</b> de b.</li>
        </ul>
      </div>
      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : le nombre 1 est un diviseur de tous les nombres entiers naturels.
      </div>

      <p class="example-title">Exemple 1 : considérons l'égalité 2 016 = 42 × 48.</p>
      <ul class="example-list">
        <li>2 016 est divisible par 48 ; 48 est un diviseur de 2 016 ; 2 016 est un multiple de 48.</li>
        <li>Mais on a également : 2 016 est divisible par 42 ; 42 est un diviseur de 2 016 ; 2 016 est un multiple de 42.</li>
      </ul>

      <p class="example-title">Exemple 2 :</p>
      <ul class="example-list">
        <li>Les multiples de 6 sont : 0 – 6 – 12 – 18 – 24 – 30 – 36... Il en existe une infinité.</li>
        <li>Les diviseurs de 36 sont : 1 – 2 – 3 – 4 – 6 – 9 – 12 – 18 – 36. Il en existe 9.</li>
      </ul>

      <div class="lesson-header"><span class="num">2</span><h3>Critères de divisibilité</h3></div>
      <span class="prop-badge">Règles</span>
      <div class="def-box">
        <ul style="margin:0;padding-left:20px;line-height:1.8;">
          <li>Un nombre entier est <b>divisible par 2</b> (pair) si son chiffre des unités est 0, 2, 4, 6 ou 8.</li>
          <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.</li>
          <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.</li>
          <li>Un nombre entier est <b>divisible par 3</b> si la somme de ses chiffres est un multiple de 3.</li>
          <li>Un nombre entier est <b>divisible par 9</b> si la somme de ses chiffres est un multiple de 9.</li>
        </ul>
      </div>
      <p class="example-title">Exemple : on considère le nombre 41 730. Est-il divisible par 2, 5, 10, 3 et 9 ?</p>
      <ul class="example-list">
        <li>Son chiffre des unités est 0, donc 41 730 est <b>divisible par 2</b>, <b>par 5</b> et <b>par 10</b>.</li>
        <li>La somme de ses chiffres : 4 + 1 + 7 + 3 + 0, soit 15, est un multiple de 3, donc 41 730 est <b>divisible par 3</b>.</li>
        <li>15 n'est pas un multiple de 9, donc 41 730 <b>n'est pas divisible par 9</b>.</li>
      </ul>
`;

document.getElementById('histoire-demo-divisibilite-5e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Vers 240 av. J.-C., le savant grec Ératosthène, alors bibliothécaire en chef de la grande bibliothèque d'Alexandrie, invente une méthode simple pour trouver tous les nombres premiers (les nombres qui n'ont que deux diviseurs) jusqu'à un nombre donné : on écrit tous les nombres, puis on raye petit à petit tous les multiples de 2, puis de 3, puis de 5... Cette méthode, appelée le <b>crible d'Ératosthène</b>, est toujours utilisée aujourd'hui, y compris en informatique. Ératosthène est aussi resté célèbre pour avoir calculé, avec une remarquable précision pour l'époque, la circonférence de la Terre !
</div>
`;

document.getElementById('methode-demo-divisibilite-5e').innerHTML = `
      <div class="sub-header"><span class="letter">M</span><h4>Trouver tous les diviseurs d'un nombre : 60</h4></div>
      <div class="figure-wrap">
        <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
        <div class="step-display" id="dv-diviseursDisplay"></div>
        <div class="figure-toolbar">
          <button class="btn" onclick="dvDiviseursDemo.next()">Étape suivante →</button>
          <button class="btn secondary" onclick="dvDiviseursDemo.reset()">Recommencer</button>
        </div>
      </div>
      `;

document.getElementById('exos-demo-divisibilite-5e').innerHTML = `
      <div class="redaction-block">
        <h3>Rédaction type : « Justifier qu'un nombre est un multiple d'un autre »</h3>
        <div class="redaction-template">
          On considère 84 et 7.<br>
          Le reste de la division euclidienne de <span class="fill">84</span> par <span class="fill">7</span> est <span class="fill">nul</span> (84 = 7 × 12).<br>
          Donc <span class="fill">84</span> est un multiple de <span class="fill">7</span>, et <span class="fill">7</span> est un diviseur de <span class="fill">84</span>.
        </div>
      </div>
      <div class="redaction-block">
        <h3>Exercices</h3>
        <div class="exo-card">
          <div class="num">Exercice 1</div>
          En utilisant les critères de divisibilité, dis si 52 470 est divisible par 2, par 5, par 10, par 3 et par 9.
        </div>
        <div class="exo-card">
          <div class="num">Exercice 2</div>
          Trouve tous les diviseurs de 48.
        </div>
      </div>
`;

const DV_DIVISEURS_STEPS = [
  {expr:'Diviseurs de 60 ?', note:'On teste chaque nombre entier à partir de 1, dans l\'ordre.'},
  {expr:'1 × 60 = 60', note:'1 et 60 sont diviseurs de 60.'},
  {expr:'2 × 30 = 60', note:'2 et 30 sont diviseurs de 60.'},
  {expr:'3 × 20 = 60', note:'3 et 20 sont diviseurs de 60.'},
  {expr:'4 × 15 = 60', note:'4 et 15 sont diviseurs de 60.'},
  {expr:'5 × 12 = 60', note:'5 et 12 sont diviseurs de 60.'},
  {expr:'6 × 10 = 60', note:'6 et 10 sont diviseurs de 60. 7, 8 et 9 ne divisent pas 60 : les deux facteurs se croisent, on peut s\'arrêter.'},
  {expr:'1 – 2 – 3 – 4 – 5 – 6 – 10 – 12 – 15 – 20 – 30 – 60', note:'60 possède 12 diviseurs.'},
];

const dvDiviseursDemo = makeStepDemo(DV_DIVISEURS_STEPS, 'dv-diviseursDisplay');

DEMO_REGISTRY['5e|Divisibilité'] = {
  cours:'cours-demo-divisibilite-5e', methode:'methode-demo-divisibilite-5e', exos:'exos-demo-divisibilite-5e', histoire:'histoire-demo-divisibilite-5e',
  init:()=>{
    dvDiviseursDemo.reset();
    injectCourseAddButtons(document.getElementById('cours-demo-divisibilite-5e')); injectCourseAddButtons(document.getElementById('methode-demo-divisibilite-5e'));
  }
};

DEMO_QUIZZES['5e|Divisibilité'] = [
  {q:"36 est-il divisible par 9 ?",
   opts:["Oui (3+6=9, multiple de 9)","Non","On ne peut pas savoir sans poser la division"], correct:0},
];

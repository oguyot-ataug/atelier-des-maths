/* ============================================================
   CHAPITRE : Probabilités (6e, D2)
   Cours complet, avec des exemples differents du support papier
   (demande explicite). Toutes les valeurs numeriques verifiees
   avant integration. Methode/exercices/histoire en placeholder
   pour une prochaine session.
   ============================================================ */

document.getElementById('cours-demo-probabilites').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Expérience aléatoire</h3></div>

<span class="def-badge">Définition 1</span>
<div class="def-box">On dit qu'une <b>expérience</b> est <b>aléatoire</b> lorsqu'on ne peut pas prévoir quel va être son résultat. Les différents résultats possibles sont appelés les <b>issues</b> de l'expérience aléatoire.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>On lance un dé à jouer à quatre faces numérotées de 1 à 4. Les <b>issues</b> sont : <span class="tex">\\{1\\,;\\,2\\,;\\,3\\,;\\,4\\}</span>.</li>
  <li>On tire une carte parmi 5 cartes numérotées de 1 à 5. Les <b>issues</b> sont : <span class="tex">\\{1\\,;\\,2\\,;\\,3\\,;\\,4\\,;\\,5\\}</span>.</li>
</ul>

<span class="def-badge">Définition 2</span>
<div class="def-box">
  <ul class="example-list" style="margin:0;">
    <li>Un <b>évènement</b> est un ensemble d'issues d'une expérience aléatoire.</li>
    <li>Lorsqu'un évènement est sûr de se réaliser, on dit qu'il est <b>certain</b>.</li>
    <li>Lorsqu'un évènement n'a aucune chance de se réaliser, on dit qu'il est <b>impossible</b>.</li>
  </ul>
</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>On tire une bille dans un sac contenant des billes rouges, bleues et vertes.<br>« <i>La bille tirée est rouge.</i> » est un <b>évènement</b>.<br>L'évènement « <i>La bille tirée n'est pas jaune.</i> » est un <b>évènement certain</b> (il n'y a aucune bille jaune dans le sac).</li>
  <li>On lance un dé à jouer à quatre faces numérotées de 1 à 4.<br>« <i>Obtenir un nombre pair.</i> » est un <b>évènement</b>.<br>L'évènement « <i>Obtenir le nombre 5.</i> » est un <b>évènement impossible</b> (le dé n'a pas de face numérotée 5).</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Calculs de probabilités</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">La <b>probabilité</b> d'un évènement est un nombre compris entre 0 et 1 (c'est-à-dire entre 0 et 100 %), qui mesure les chances que cet évènement se réalise.</div>

<span class="prop-badge">Règle</span>
<div class="def-box">
  <p style="margin:0 0 10px;">Lorsque les issues d'une expérience aléatoire ont toutes autant de chances de se réaliser, c'est-à-dire que les probabilités de réalisation des différentes issues sont égales, la probabilité d'un évènement s'obtient en divisant le nombre d'issues favorables à l'évènement par le nombre total d'issues de l'expérience.</p>
  <p style="margin:0;text-align:center;font-family:'Space Grotesk',sans-serif;">Probabilité d'un évènement <span class="tex">= \\dfrac{\\text{Nombre d'issues favorables}}{\\text{Nombre total d'issues}}</span></p>
</div>
<p class="hint" style="margin:8px 0;">Remarque : la probabilité d'un évènement impossible est 0, celle d'un évènement certain est 1.</p>

<p class="example-title">Exemples :</p>
<div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;margin:10px 0;">
  <div style="flex:1;min-width:230px;">
    <ul class="example-list">
      <li>On tire une bille dans un sac contenant 3 billes rouges et 5 billes bleues, indiscernables au toucher. Chaque bille a autant de chance d'être tirée.<br>La probabilité de « <i>Tirer une bille rouge.</i> » est :<br><span class="tex">3</span> chances sur <span class="tex">8</span> ; ou <span class="tex">\\dfrac{3}{8}</span> ; ou <span class="tex">0{,}375</span> ; ou <span class="tex">37{,}5\\,\\%</span>.</li>
    </ul>
  </div>
  <div class="figure-wrap" style="max-width:150px;margin:0;">
    <svg viewBox="0 0 150 140" style="width:100%;display:block;">
      <path d="M 20 60 Q 20 20 60 20 L 90 20 Q 130 20 130 60 L 130 100 Q 130 130 100 130 L 50 130 Q 20 130 20 100 Z" fill="#F5EFE3" stroke="#8A4210" stroke-width="2"/>
      <circle cx="55" cy="55" r="9" fill="#E35D3A"/>
      <circle cx="80" cy="48" r="9" fill="#2EA8C9"/>
      <circle cx="100" cy="65" r="9" fill="#2EA8C9"/>
      <circle cx="60" cy="80" r="9" fill="#2EA8C9"/>
      <circle cx="90" cy="90" r="9" fill="#E35D3A"/>
      <circle cx="45" cy="100" r="9" fill="#2EA8C9"/>
      <circle cx="75" cy="105" r="9" fill="#2EA8C9"/>
      <circle cx="105" cy="100" r="9" fill="#E35D3A"/>
    </svg>
  </div>
</div>
<ul class="example-list">
  <li>On lance un dé à jouer à quatre faces. Chaque face a autant de chance de tomber.<br>La probabilité de « <i>Obtenir un nombre pair.</i> » est :<br><span class="tex">2</span> chances sur <span class="tex">4</span> ; ou <span class="tex">\\dfrac{2}{4} = \\dfrac{1}{2}</span> ; ou <span class="tex">0{,}5</span> ; ou <span class="tex">50\\,\\%</span>.</li>
</ul>
`;

document.getElementById('methode-demo-probabilites').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-probabilites').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Probabilités'] = {
  cours:'cours-demo-probabilites', methode:'methode-demo-probabilites', exos:'exos-demo-probabilites',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-probabilites'));
    renderStaticMath(document.getElementById('methode-demo-probabilites'));
    renderStaticMath(document.getElementById('exos-demo-probabilites'));
    injectCourseAddButtons(document.getElementById('cours-demo-probabilites'));
    injectCourseAddButtons(document.getElementById('methode-demo-probabilites'));
  }
};

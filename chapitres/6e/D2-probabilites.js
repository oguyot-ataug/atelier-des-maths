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
  <div class="figure-wrap" style="max-width:200px;margin:0;">
    ${urnSvg([{color:'#E35D3A', count:3, label:'Rouges'}, {color:'#2EA8C9', count:5, label:'Bleues'}], 'sac')}
  </div>
</div>
<ul class="example-list">
  <li>On lance un dé à jouer à quatre faces. Chaque face a autant de chance de tomber.<br>La probabilité de « <i>Obtenir un nombre pair.</i> » est :<br><span class="tex">2</span> chances sur <span class="tex">4</span> ; ou <span class="tex">\\dfrac{2}{4} = \\dfrac{1}{2}</span> ; ou <span class="tex">0{,}5</span> ; ou <span class="tex">50\\,\\%</span>.</li>
</ul>
`;

document.getElementById('methode-demo-probabilites').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Calculer la probabilité d'un évènement</h4></div>
<p class="hint" style="margin:8px 0;">On considère un sac contenant 4 billes rouges et 6 billes bleues, indiscernables au toucher. On tire une bille au hasard. Quelle est la probabilité de l'évènement « <i>Tirer une bille rouge</i> » ?</p>
<div class="figure-wrap" style="max-width:200px;margin:12px auto;">
  ${urnSvg([{color:'#E35D3A', count:4, label:'Rouges'}, {color:'#2EA8C9', count:6, label:'Bleues'}], 'sac')}
</div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="probaMethodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="probaMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="probaMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;margin-top:20px;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-probabilites').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Calculer la probabilité d'un évènement »</h3>
  <p style="margin:4px 0 10px;">On tire une carte au hasard dans un jeu de 52 cartes. Les têtes de cœur sont le valet, la dame et le roi de cœur. <b>Quelle est la probabilité de tirer une tête de cœur ?</b></p>
  <div class="figure-wrap" style="max-width:220px;margin:0 auto 14px;">
    ${cardsSvg([{rank:'V',suit:'coeur'},{rank:'D',suit:'coeur'},{rank:'R',suit:'coeur'}])}
  </div>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Le jeu contient 52 cartes en tout, ayant toutes autant de chances d'être tirées.</span><span class="we-comment">On compte le nombre total d'issues.</span></div>
    <div class="we-row"><span class="we-expr">3 de ces cartes sont des têtes de cœur (valet, dame, roi).</span><span class="we-comment">On compte le nombre d'issues favorables.</span></div>
    <div class="we-row"><span class="we-expr">Donc la probabilité de « Tirer une tête de cœur » est <span class="tex">\\dfrac{3}{52} \\approx 0{,}058</span>, soit environ <span class="tex">5{,}8\\,\\%</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    On lance un dé à jouer à huit faces numérotées de 1 à 8. Quelles sont les issues de cette expérience aléatoire ?
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    On lance le dé à huit faces de l'exercice 1. L'évènement « <i>Obtenir un multiple de 3.</i> » est-il certain, impossible, ou ni l'un ni l'autre ? Justifie.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Une roue est partagée en 8 secteurs identiques : 3 jaunes et 5 verts. On fait tourner la roue. Calcule la probabilité d'obtenir un secteur jaune.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    On lance le dé à huit faces de l'exercice 1. Calcule la probabilité de l'évènement « <i>Obtenir un multiple de 3.</i> ».
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Un sac contient des billes rouges et des billes bleues, indiscernables au toucher, 12 en tout. La probabilité de tirer une bille rouge est <span class="tex">\\dfrac{1}{4}</span>. Combien y a-t-il de billes rouges dans le sac ? Rédige ta réponse.
  </div>
</div>
`;

document.getElementById('histoire-demo-probabilites').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les probabilités naissent officiellement d'une correspondance entre deux mathématiciens français, <b>Blaise Pascal</b> et <b>Pierre de Fermat</b>, en 1654. Un joueur, le chevalier de Méré, avait posé à Pascal une question restée sans réponse satisfaisante depuis des siècles : si une partie de dés ou de jeu de hasard est interrompue avant la fin, comment répartir équitablement les mises entre les joueurs, selon leurs chances respectives de gagner à ce moment-là ? En cherchant à résoudre ce « problème des partis », Pascal et Fermat posent, sans le savoir, les toutes premières bases mathématiques rigoureuses du calcul des chances. Il faudra ensuite près d'un siècle pour que ces idées, d'abord réservées aux jeux de hasard, trouvent des applications sérieuses : les compagnies d'assurance du XVIIIe siècle sont parmi les premières à utiliser les probabilités pour calculer le montant des primes, en s'appuyant sur les chances qu'un évènement (incendie, naufrage, décès) se produise.
</div>
`;

/* ================= Méthode animée : calcul de probabilité pas-à-pas ================= */
const PROBA_METHODE_STEPS = [
  {expr:'Le sac contient <span class="tex">4+6=10</span> billes en tout.', note:"On compte le nombre total d'issues. Chaque bille a autant de chance d'être tirée."},
  {expr:'4 de ces billes sont rouges.', note:"On compte le nombre d'issues favorables à l'évènement « Tirer une bille rouge »."},
  {expr:'<span class="tex">P(\\text{rouge}) = \\dfrac{4}{10}</span>', note:"On divise le nombre d'issues favorables par le nombre total d'issues."},
  {expr:'<span class="tex">P(\\text{rouge}) = 0{,}4</span>, soit <span class="tex">40\\,\\%</span>.', note:"On peut aussi exprimer ce résultat en pourcentage."},
];
const probaMethodeDemo = makeStepDemo(PROBA_METHODE_STEPS, 'probaMethodeDisplay');

DEMO_REGISTRY['6e|Probabilités'] = {
  cours:'cours-demo-probabilites', methode:'methode-demo-probabilites', exos:'exos-demo-probabilites', histoire:'histoire-demo-probabilites',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-probabilites'));
    renderStaticMath(document.getElementById('methode-demo-probabilites'));
    renderStaticMath(document.getElementById('exos-demo-probabilites'));
    renderStaticMath(document.getElementById('histoire-demo-probabilites'));
    injectCourseAddButtons(document.getElementById('cours-demo-probabilites'));
    injectCourseAddButtons(document.getElementById('methode-demo-probabilites'));
    probaMethodeDemo.reset();
  }
};


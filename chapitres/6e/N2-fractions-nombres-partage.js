/* ============================================================
   CHAPITRE : Fractions : nombres et partage (6e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-fractions-partage').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Écriture fractionnaire</h3></div>
<p class="example-title" style="margin-top:0;">A. Quotient</p>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est le résultat de la division de <i>a</i> par <i>b</i> : <span class="tex">\\dfrac{a}{b} = a : b</span>. Elle se lit « a divisé par b » ou « a sur b ».</div>
<p class="example-title">Exemple : comment se lit la fraction <span class="tex">\\dfrac{3}{4}</span> ?</p>
<p style="margin:4px 0 12px;">Elle se lit « trois quarts », ou « 3 divisé par 4 », ou « 3 sur 4 ».</p>

<p class="example-title" style="margin-top:20px;">B. Nombre fraction</p>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est le nombre qui, multiplié par <i>b</i>, donne <i>a</i>. Elle vérifie donc : <span class="tex">\\dfrac{a}{b} \\times b = a</span> et <span class="tex">b \\times \\dfrac{a}{b} = a</span>. Dans le cas particulier où b = 1, on a : <span class="tex">\\dfrac{a}{1} = a</span>.</div>
<p class="example-title">Exemple : complète les égalités … × 5 = 4 et … × 7 = 9.</p>
<p style="margin:4px 0 4px;">La fraction <span class="tex">\\dfrac{4}{5}</span> est le nombre qui, multiplié par 5, donne 4, donc on peut écrire <span class="tex">\\dfrac{4}{5} \\times 5 = 4</span>.</p>
<p style="margin:4px 0 12px;">La fraction <span class="tex">\\dfrac{9}{7}</span> est le nombre qui, multiplié par 7, donne 9, donc on peut écrire <span class="tex">\\dfrac{9}{7} \\times 7 = 9</span>.</p>

<p class="example-title" style="margin-top:20px;">C. Écriture d'une fraction</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est <b>soit un nombre entier</b>, <b>soit un nombre décimal non entier</b>, <b>soit un nombre non décimal</b>.</div>
<p class="example-title">Exemple : dans quel ensemble de nombres se trouve chacune des fractions <span class="tex">\\dfrac{48}{6}</span>, <span class="tex">\\dfrac{3}{4}</span> et <span class="tex">\\dfrac{1}{3}</span> ?</p>
<ul class="example-list">
  <li><span class="tex">\\dfrac{48}{6}</span> est le résultat de la division 48 : 6 = 8. On a donc <span class="tex">\\dfrac{48}{6} = 8</span> : la fraction <span class="tex">\\dfrac{48}{6}</span> est donc un <b>nombre entier</b>.</li>
  <li><span class="tex">\\dfrac{3}{4}</span> est le résultat de la division 3 : 4. On vérifie que 0,75 × 4 = 3, donc <span class="tex">\\dfrac{3}{4} = 0{,}75</span> : la fraction <span class="tex">\\dfrac{3}{4}</span> est donc un <b>nombre décimal non entier</b>.</li>
  <li><span class="tex">\\dfrac{1}{3}</span> est le nombre qui, multiplié par 3, donne 1 : <span class="tex">\\dfrac{1}{3} \\times 3 = 1</span>. La division 1 : 3 ne se termine jamais ; on peut seulement écrire <span class="tex">\\dfrac{1}{3} \\approx 0{,}33</span> : la fraction <span class="tex">\\dfrac{1}{3}</span> est donc un <b>nombre non décimal</b>.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Égalité de fractions</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">
  Une fraction ne change pas de valeur quand on multiplie (ou quand on divise) son numérateur <b>et</b> son dénominateur par un même nombre non nul.<br>
  Pour tous entiers a, b (non nul) et k (non nul) : <span class="tex">\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}</span> et <span class="tex">\\dfrac{a}{b} = \\dfrac{a : k}{b : k}</span>.
</div>
<p class="example-title">Exemple : complète l'égalité de fractions <span class="tex">\\dfrac{3}{5} = \\dfrac{?}{20}</span>.</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
<div class="figure-wrap">
  <div class="step-display" id="fp-equivDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpEquivNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpEquivReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Proportion et pourcentages</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand une proportion est écrite sous la forme d'un quotient dont le dénominateur est 100, on obtient ce qu'on appelle la <b>proportion en pourcentage</b>.</div>
<p class="example-title">Exemple : calcule le pourcentage de boules vertes dans un sac contenant 3 boules vertes et 9 boules rouges.</p>
<p style="margin:4px 0 12px;">
  La proportion de boules vertes dans ce sac est égale à <span class="tex">\\dfrac{3}{3+9}</span>, soit <span class="tex">\\dfrac{3}{12}</span>.<br>
  On simplifie : <span class="tex">\\dfrac{3}{12} = \\dfrac{1}{4}</span>, puis on écrit cette fraction avec pour dénominateur 100 : <span class="tex">\\dfrac{1}{4} = \\dfrac{25}{100}</span>.<br>
  La proportion est donc égale à <span class="tex">\\dfrac{25}{100}</span> : le pourcentage de boules vertes dans ce sac est de <b>25 %</b>.
</p>
`;

document.getElementById('histoire-demo-fractions-partage').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les fractions comptent parmi les plus vieilles notions des mathématiques : on en trouve la trace il y a environ 3 600 ans, dans le papyrus de Rhind, un texte égyptien conservé au British Museum. Mais les Égyptiens ne les écrivaient pas comme nous : ils n'utilisaient (presque) que des fractions de numérateur 1 (comme <span class="tex">\\dfrac{1}{2}</span> ou <span class="tex">\\dfrac{1}{7}</span>), et exprimaient toutes les autres comme des sommes de fractions de ce type. Il faudra attendre les mathématiciens indiens, plus de mille ans plus tard, pour voir apparaître une écriture des fractions plus proche de la nôtre, avec un numérateur et un dénominateur.
</div>
`;

document.getElementById('methode-demo-fractions-partage').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : calculer un pourcentage</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fp-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-fractions-partage').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Dans quel ensemble de nombres se trouve une fraction ? »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{21}{3}</span> est le résultat de la division 21 : 3 = 7.</span><span class="we-comment">On calcule la division.</span></div>
    <div class="we-row"><span class="we-expr">On a donc <span class="tex">\\dfrac{21}{3} = 7</span>.</span><span class="we-comment">On identifie le résultat.</span></div>
    <div class="we-row"><span class="we-expr">La fraction <span class="tex">\\dfrac{21}{3}</span> est donc un nombre entier.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Dans quel ensemble de nombres se trouve chacune des fractions <span class="tex">\\dfrac{36}{4}</span>, <span class="tex">\\dfrac{5}{2}</span> et <span class="tex">\\dfrac{2}{7}</span> ? Rédige tes réponses.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Complète l'égalité de fractions <span class="tex">\\dfrac{4}{7} = \\dfrac{?}{28}</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un sac contient 5 boules jaunes et 15 boules bleues. Calcule le pourcentage de boules jaunes dans ce sac.
  </div>
</div>
`;

/* ================= Démonstration pas à pas : égalité de fractions ================= */
const FP_EQUIV_STEPS = [
  {expr:'<span class="tex">\\dfrac{3}{5} = \\dfrac{?}{20}</span>', note:"On veut compléter cette égalité : le dénominateur passe de 5 à 20."},
  {expr:'<span class="tex">20 : 5 = 4</span>', note:"On cherche par quel nombre on multiplie 5 pour obtenir 20."},
  {expr:'<span class="tex">\\dfrac{3}{5} = \\dfrac{3 \\times 4}{5 \\times 4}</span>', note:"On multiplie le numérateur ET le dénominateur par ce même nombre 4 : c'est ainsi qu'on rédige l'étape."},
  {expr:'<span class="tex">\\dfrac{3}{5} = \\dfrac{12}{20}</span>', note:"On calcule : 3 × 4 = 12 et 5 × 4 = 20. On obtient l'égalité complète."},
];
let fpEquivIdx = 0;
function fpRenderEquiv(){
  const el = document.getElementById('fp-equivDisplay');
  if(!el) return;
  el._stepDemoSteps = FP_EQUIV_STEPS.map(s=>({expr:s.expr, note:s.note})); // permet la reconstitution complète lors de l'ajout au cahier
  const atEnd = fpEquivIdx === FP_EQUIV_STEPS.length-1;
  const lines = FP_EQUIV_STEPS.slice(0, fpEquivIdx+1).map((s,i)=>{
    const isFinal = atEnd && i===fpEquivIdx;
    return `<div class="${isFinal?'step-final':''}" style="margin:10px 0;">${s.expr}</div>`;
  }).join('');
  el.innerHTML = `<div class="step-column">${lines}</div><div class="step-note">${FP_EQUIV_STEPS[fpEquivIdx].note}</div>`;
  renderStaticMath(el);
}
function fpEquivNext(){ if(fpEquivIdx<FP_EQUIV_STEPS.length-1) fpEquivIdx++; fpRenderEquiv(); }
function fpEquivReset(){ fpEquivIdx=0; fpRenderEquiv(); }

/* ================= Méthode animée ================= */
const FP_METHODE_STEPS = [
  {expr:'Sac de 6 boules rouges et 14 boules noires', note:"On souhaite calculer le pourcentage de boules rouges dans ce sac."},
  {expr:'Proportion = 6/(6+14) = 6/20', note:"On écrit la proportion de boules rouges sous forme de fraction : le nombre de boules rouges sur le nombre total de boules."},
  {expr:'6/20 = 3/10', note:"On simplifie la fraction en divisant numérateur et dénominateur par 2."},
  {expr:'3/10 = 30/100', note:"On écrit cette fraction avec pour dénominateur 100, en multipliant numérateur et dénominateur par 10."},
  {expr:'Conclusion : 30 %', note:"La proportion de boules rouges dans ce sac est donc de 30/100, c'est-à-dire 30 %."},
];
const fpMethodeDemo = makeStepDemo(FP_METHODE_STEPS, 'fp-methodeDisplay');

DEMO_REGISTRY['6e|Fractions : nombres et partage'] = { cours:'cours-demo-fractions-partage', methode:'methode-demo-fractions-partage', exos:'exos-demo-fractions-partage', histoire:'histoire-demo-fractions-partage',
  init:()=>{ fpMethodeDemo.reset(); fpEquivReset(); renderStaticMath(document.getElementById('cours-demo-fractions-partage')); renderStaticMath(document.getElementById('exos-demo-fractions-partage')); renderStaticMath(document.getElementById('histoire-demo-fractions-partage')); injectCourseAddButtons(document.getElementById('cours-demo-fractions-partage')); injectCourseAddButtons(document.getElementById('methode-demo-fractions-partage')); } };

DEMO_QUIZZES['Fractions : nombres et partage'] = [
  {q:"Comment se lit la fraction 5/8 ?",
   opts:["« Cinq divisé par huit »","« Huit divisé par cinq »","« Cinq fois huit »"], correct:0},
  {q:"La fraction 24/6 est...",
   opts:["un nombre entier","un nombre décimal non entier","un nombre non décimal"], correct:0},
  {q:"Pour compléter 5/6 = …/24, par quel nombre doit-on multiplier le numérateur 5 ?",
   opts:["Par 4","Par 6","Par 24"], correct:0},
];

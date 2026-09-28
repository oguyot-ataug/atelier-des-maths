/* ============================================================
   CHAPITRE : Opérations sur les nombres relatifs (4e, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Le premier cours de 4e (cf capture - à refaire, modifier les titres si possibles et
   les exemples)". Même plan que le manuel (addition/soustraction, multiplication, inverses,
   division, enchaînement de calculs), avec des titres reformulés et des exemples nouveaux.
   Vocabulaire du manuel de 4e : « distance à zéro ».
   ============================================================ */

// Exemple rédigé : une ligne de calcul à gauche, ce qu'on fait à droite (comme les flèches du manuel).
function r4Ex(titre, lignes){
  return `<p class="example-title">${titre}</p>
<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
const R4_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const R4_BLEU = s => `<span style="color:#0C5BA0;font-weight:700;">${s}</span>`;

document.getElementById('cours-demo-operations-relatifs-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Additionner et soustraire des nombres relatifs</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La somme de deux nombres relatifs</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Deux nombres de <b>même signe</b> : leur somme garde ce <b>signe commun</b>, et sa distance à zéro est la <b>somme</b> des distances à zéro.</li>
  <li>Deux nombres de <b>signes contraires</b> : leur somme prend le signe du nombre qui a la <b>plus grande distance à zéro</b>, et sa distance à zéro est la <b>différence</b> des distances à zéro.</li>
</ul></div>
${r4Ex('Exemple 1 :', [
  ['A = (−7) + (−4)', 'Les deux nombres sont négatifs : même signe.'],
  ['A = −(7 + 4)', 'On additionne les distances à zéro et on garde le signe commun : −.'],
  ['A = −11', 'On calcule.'],
])}
${r4Ex('Exemple 2 :', [
  ['B = (+3,5) + (−9)', 'Un nombre positif et un nombre négatif : signes contraires.'],
  ['B = −(9 − 3,5)', 'On soustrait les distances à zéro ; −9 a la plus grande distance à zéro, le résultat est négatif.'],
  ['B = −5,5', 'On calcule.'],
])}
<div class="redaction-note" ${R4_REM}>Remarque : la somme de deux nombres <b>opposés</b> est nulle. Par exemple : (−12,6) + (+12,6) = 0.</div>

<div class="sub-header"><span class="letter">B</span><h4>Soustraire, c'est ajouter l'opposé</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">L'<b>opposé</b> d'un nombre relatif est le nombre qui a la <b>même distance à zéro</b> mais le <b>signe contraire</b>.</div>
<p class="example-title">Exemple 1 :</p>
<ul class="example-list"><li>Les opposés de −4,2 ; 17 ; −0,05 et 380 sont 4,2 ; −17 ; 0,05 et −380. Le nombre 0 est son propre opposé.</li></ul>
<span class="prop-badge">Propriété</span>
<div class="def-box"><b>Soustraire un nombre relatif revient à ajouter son opposé.</b></div>
${r4Ex('Exemple 2 :', [
  ['C = (−8) − (−5)', 'On veut soustraire le nombre −5.'],
  ['C = (−8) + (+5)', `On ajoute l'opposé de −5, c'est-à-dire ${R4_BLEU('+5')}.`],
  ['C = −(8 − 5)', 'Signes contraires : on soustrait les distances à zéro, et −8 impose son signe.'],
  ['C = −3', 'On calcule.'],
])}
${r4Ex('Exemple 3 :', [
  ['D = 2 − 11', 'On soustrait 11 : on ajoute son opposé −11.'],
  ['D = 2 + (−11)', 'Signes contraires : −11 a la plus grande distance à zéro.'],
  ['D = −9', 'On calcule.'],
])}

<div class="sub-header"><span class="letter">C</span><h4>Enchaîner des additions et des soustractions</h4></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On remplace chaque soustraction par l'<b>addition de l'opposé</b>. On peut ensuite supprimer les signes d'addition et les parenthèses (on obtient une <b>somme algébrique</b>), puis <b>regrouper</b> les nombres positifs d'un côté et les nombres négatifs de l'autre.</div>
${r4Ex('Exemple 1 :', [
  ['E = (−6) − (+2) + (−3) − (−10)', ''],
  ['E = (−6) + (−2) + (−3) + (+10)', "On transforme chaque soustraction en addition de l'opposé."],
  ['E = −6 − 2 − 3 + 10', 'On supprime les signes d\'addition et les parenthèses.'],
  ['E = −11 + 10', 'On regroupe les nombres négatifs : −6 − 2 − 3 = −11.'],
  ['E = −1', 'On termine le calcul.'],
])}
${r4Ex('Exemple 2 :', [
  ['F = 7,5 − 12 + 4 − 2,5', 'Somme algébrique déjà écrite sans parenthèses.'],
  ['F = 7,5 + 4 − 12 − 2,5', 'On regroupe les nombres positifs, puis les nombres négatifs.'],
  ['F = 11,5 − 14,5', 'On calcule chaque groupe.'],
  ['F = −3', 'On termine le calcul.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Multiplier des nombres relatifs</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La règle des signes</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Le <b>produit</b> de deux nombres relatifs a pour distance à zéro le <b>produit des distances à zéro</b>. Il est :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><b>positif</b> si les deux nombres sont de <b>même signe</b> ;</li>
    <li><b>négatif</b> si les deux nombres sont de <b>signes contraires</b>.</li>
  </ul>
</div>
<div style="display:flex;justify-content:center;margin:4px 0 18px;">
  <table style="border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:1.05rem;text-align:center;background:#fff;">
    <tr><th style="border:1px solid #C9D6E6;padding:6px 14px;background:#F4F5F8;">×</th><th style="border:1px solid #C9D6E6;padding:6px 14px;background:#F4F5F8;">+</th><th style="border:1px solid #C9D6E6;padding:6px 14px;background:#F4F5F8;">−</th></tr>
    <tr><th style="border:1px solid #C9D6E6;padding:6px 14px;background:#F4F5F8;">+</th><td style="border:1px solid #C9D6E6;padding:6px 14px;color:#1E7B34;font-weight:700;">+</td><td style="border:1px solid #C9D6E6;padding:6px 14px;color:#C0392B;font-weight:700;">−</td></tr>
    <tr><th style="border:1px solid #C9D6E6;padding:6px 14px;background:#F4F5F8;">−</th><td style="border:1px solid #C9D6E6;padding:6px 14px;color:#C0392B;font-weight:700;">−</td><td style="border:1px solid #C9D6E6;padding:6px 14px;color:#1E7B34;font-weight:700;">+</td></tr>
  </table>
</div>
${r4Ex('Exemple 1 :', [
  ['G = (−6) × (−1,5)', 'Deux nombres négatifs : même signe.'],
  ['G = 6 × 1,5', 'Le produit est positif : on multiplie les distances à zéro.'],
  ['G = 9', 'On calcule.'],
])}
${r4Ex('Exemple 2 :', [
  ['H = 0,4 × (−25)', 'Un nombre positif et un nombre négatif : signes contraires.'],
  ['H = −(0,4 × 25)', 'Le produit est négatif.'],
  ['H = −10', 'On calcule.'],
])}
<span class="prop-badge">Propriété</span>
<div class="def-box">Multiplier un nombre relatif par <b>−1</b> revient à prendre son <b>opposé</b> : pour tout nombre relatif <i>a</i>, (−1) × <i>a</i> = −<i>a</i>.</div>
<p class="example-title">Exemple :</p>
<ul class="example-list"><li>(−1) × 8,3 = −8,3 &nbsp;&nbsp;et&nbsp;&nbsp; (−1) × (−14) = 14.</li></ul>

<div class="sub-header"><span class="letter">B</span><h4>Le signe d'un produit de plusieurs facteurs</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Un produit de nombres relatifs (non nuls) est :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><b>positif</b> s'il comporte un nombre <b>pair</b> de facteurs négatifs ;</li>
    <li><b>négatif</b> s'il comporte un nombre <b>impair</b> de facteurs négatifs.</li>
  </ul>
</div>
<p class="example-title">Exemple 1 :</p>
<ul class="example-list"><li>Le produit I = (−3) × 8 × (−1,2) × (−5) × 2,5 comporte <b>trois</b> facteurs négatifs : c'est un nombre impair, donc I est <b>négatif</b>.</li></ul>
${r4Ex('Exemple 2 :', [
  ['J = (−2,5) × (−7) × (−4) × 3 × (−2)', "On détermine d'abord le signe du produit."],
  ['J = 2,5 × 7 × 4 × 3 × 2', 'Quatre facteurs négatifs : 4 est pair, donc J est positif.'],
  ['J = (2,5 × 4) × (7 × 3 × 2)', 'On regroupe astucieusement les facteurs.'],
  ['J = 10 × 42', 'On calcule chaque groupe.'],
  ['J = 420', 'On termine le calcul.'],
])}
<div class="redaction-note" ${R4_REM}>Remarque : si l'un des facteurs est égal à 0, le produit est nul, quels que soient les autres facteurs.</div>

<div class="lesson-header"><span class="num">3</span><h3>L'inverse d'un nombre relatif</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux nombres relatifs sont <b>inverses</b> l'un de l'autre lorsque leur <b>produit est égal à 1</b>.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>4 et 0,25 sont inverses car 4 × 0,25 = 1.</li>
  <li>−5 et −0,2 sont inverses car (−5) × (−0,2) = 1.</li>
  <li>L'inverse de −10 est −0,1 car (−10) × (−0,1) = 1.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarques : deux nombres inverses ont toujours le <b>même signe</b> (leur produit, 1, est positif). Le nombre <b>0 n'a pas d'inverse</b>. L'inverse d'un nombre <i>a</i> non nul s'écrit <span class="tex">\\dfrac{1}{a}</span> : par exemple, l'inverse de 8 est <span class="tex">\\dfrac{1}{8}</span>, soit 0,125.</div>
<div class="redaction-note" ${R4_REM}>Attention : ne pas confondre l'<b>inverse</b> (le produit vaut 1) et l'<b>opposé</b> (la somme vaut 0). L'opposé de 4 est −4, son inverse est 0,25.</div>

<div class="lesson-header"><span class="num">4</span><h3>Diviser des nombres relatifs</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Le <b>quotient</b> de deux nombres relatifs (le diviseur n'étant pas nul) a pour distance à zéro le <b>quotient des distances à zéro</b>. Il est :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><b>positif</b> si les deux nombres sont de <b>même signe</b> ;</li>
    <li><b>négatif</b> si les deux nombres sont de <b>signes contraires</b>.</li>
  </ul>
</div>
${r4Ex('Exemple 1 :', [
  ['K = (−72) ÷ 8', "On détermine d'abord le signe du quotient : signes contraires."],
  ['K = −(72 ÷ 8)', 'Le quotient est négatif : on divise les distances à zéro.'],
  ['K = −9', 'On calcule.'],
])}
${r4Ex('Exemple 2 :', [
  ['<span class="tex">L = \\dfrac{-4{,}2}{-0{,}6}</span>', "On détermine d'abord le signe du quotient : deux nombres négatifs."],
  ['<span class="tex">L = \\dfrac{4{,}2}{0{,}6}</span>', 'Même signe : le quotient est positif.'],
  ['L = 7', 'On calcule.'],
])}
<div class="redaction-note" ${R4_REM}>Remarques :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li>La règle des signes est la <b>même</b> pour la division que pour la multiplication.</li>
    <li>Le quotient de 0 par un nombre non nul est égal à 0 : pour tout nombre relatif <i>a</i> non nul, <span class="tex">\\dfrac{0}{a} = 0</span>. En revanche, on ne divise <b>jamais par 0</b>.</li>
    <li>Diviser par un nombre non nul revient à <b>multiplier par son inverse</b> : (−3) ÷ 0,5 = (−3) × 2 = −6.</li>
  </ul>
</div>

<div class="lesson-header"><span class="num">5</span><h3>Enchaîner les opérations : les priorités</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Dans une suite d'opérations avec des nombres relatifs, on effectue <b>dans l'ordre</b> :
  <ol style="margin:6px 0 0;padding-left:22px;line-height:1.8;">
    <li>les calculs <b>entre parenthèses</b> ;</li>
    <li>les <b>multiplications</b> et les <b>divisions</b> ;</li>
    <li>les <b>additions</b> et les <b>soustractions</b>.</li>
  </ol>
</div>
${r4Ex('Exemple 1 :', [
  [`M = 3 − 4 × ${R4_BLEU('(−5 + 2)')}`, 'On repère le calcul prioritaire : la parenthèse.'],
  [`M = 3 − ${R4_BLEU('4 × (−3)')}`, 'On effectue ensuite la multiplication.'],
  ['M = 3 − (−12)', "Soustraire −12, c'est ajouter 12."],
  ['M = 3 + 12', 'On termine par l\'addition.'],
  ['M = 15', ''],
])}
${r4Ex('Exemple 2 :', [
  [`N = ${R4_BLEU('(−18) ÷ (−3)')} − ${R4_BLEU('2 × (−4)')} + (−7)`, 'Pas de parenthèse de calcul : on commence par la division et la multiplication.'],
  ['N = 6 − (−8) + (−7)', "On transforme les soustractions en additions de l'opposé."],
  ['N = 6 + 8 − 7', 'Somme algébrique : on calcule de gauche à droite.'],
  ['N = 7', ''],
])}
`;

document.getElementById('histoire-demo-operations-relatifs-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La règle « moins par moins donne plus » est écrite pour la première fois par le mathématicien indien <b>Brahmagupta</b>, en 628 : il parle de « fortunes » (les nombres positifs) et de « dettes » (les nombres négatifs), et énonce que « le produit de deux dettes est une fortune ». En Europe, cette règle a longtemps paru mystérieuse : au début du 19e siècle, l'écrivain <b>Stendhal</b>, alors élève passionné de mathématiques, raconte dans ses souvenirs qu'aucun de ses professeurs n'arrivait à lui expliquer pourquoi « moins par moins donne plus ». La justification actuelle est simple : pour que la distributivité reste vraie avec les nombres négatifs, il faut que (−1) × (−1) = 1.
</div>
`;

document.getElementById('methode-demo-operations-relatifs-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une somme algébrique</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="r4-sommeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="r4SommeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="r4SommeDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : trouver le signe d'un produit en comptant les facteurs négatifs</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Compter les facteurs négatifs » : chaque facteur négatif s'allume à son tour. Puis « Nouveau produit » pour vous entraîner.</p>
  <div id="r4-prodFacteurs" style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:1.2rem;padding:18px 10px;background:#fff;border-radius:8px;border:1px solid rgba(28,43,57,.1);min-height:40px;"></div>
  <div id="r4-prodBilan" style="text-align:center;margin-top:12px;min-height:3.2em;font-size:1rem;line-height:1.6;"></div>
  <div class="figure-toolbar">
    <button class="btn" id="r4-prodCompter" onclick="r4ProdCompter()">Compter les facteurs négatifs</button>
    <button class="btn secondary" onclick="r4ProdNouveau()">Nouveau produit</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer un quotient de nombres relatifs</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="r4-quotientDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="r4QuotientDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="r4QuotientDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer une expression en respectant les priorités</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode. Le calcul prioritaire est en bleu.</p>
  <div class="step-display" id="r4-prioritesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="r4PrioritesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="r4PrioritesDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les chapitres de 5e).
function r4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="r4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="r4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-operations-relatifs-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer un produit de plusieurs nombres relatifs »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">P = (−5) × 3 × (−0,2) × (−4)</span><span class="we-comment">On compte les facteurs négatifs : il y en a 3.</span></div>
    <div class="we-row"><span class="we-expr">P = −(5 × 3 × 0,2 × 4)</span><span class="we-comment">3 est impair : le produit est négatif.</span></div>
    <div class="we-row"><span class="we-expr">P = −((5 × 0,2) × (3 × 4))</span><span class="we-comment">On regroupe astucieusement.</span></div>
    <div class="we-row"><span class="we-expr">P = −(1 × 12)</span><span class="we-comment">On calcule chaque groupe.</span></div>
    <div class="we-row"><span class="we-expr">P = −12</span><span class="we-comment">On termine le calcul.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${r4Exo(1, 'Calcule : A = (−13) + (−8) &nbsp;&nbsp; B = (+4,6) + (−10) &nbsp;&nbsp; C = (−2,7) − (−9)', [
    'A = −(13 + 8) = −21', 'B = −(10 − 4,6) = −5,4', 'C = (−2,7) + (+9) = 6,3'])}
  ${r4Exo(2, 'Écris sans parenthèses, puis calcule : D = (+5) − (+12) + (−3,5) − (−7,5)', [
    'D = (+5) + (−12) + (−3,5) + (+7,5)', 'D = 5 − 12 − 3,5 + 7,5', 'D = 12,5 − 15,5', 'D = −3'])}
  ${r4Exo(3, 'Calcule : E = (−9) × (−7) &nbsp;&nbsp; F = 1,5 × (−8) &nbsp;&nbsp; G = (−0,5) × (−0,5)', [
    'E = 9 × 7 = 63', 'F = −(1,5 × 8) = −12', 'G = 0,5 × 0,5 = 0,25'])}
  ${r4Exo(4, 'Sans calculer, donne le signe de H = (−1) × (−2) × (−3) × … × (−9), le produit des nombres entiers de −1 à −9. Justifie.', [
    'H comporte 9 facteurs négatifs.', '9 est impair, donc H est négatif.'])}
  ${r4Exo(5, 'Donne l\'inverse de chaque nombre : 2 ; −0,5 ; 10 ; −4.', [
    "L'inverse de 2 est 0,5 car 2 × 0,5 = 1.", "L'inverse de −0,5 est −2 car (−0,5) × (−2) = 1.",
    "L'inverse de 10 est 0,1 car 10 × 0,1 = 1.", "L'inverse de −4 est −0,25 car (−4) × (−0,25) = 1."])}
  ${r4Exo(6, 'Calcule : I = (−56) ÷ (−7) &nbsp;&nbsp; J = 4,8 ÷ (−1,2) &nbsp;&nbsp; K = (−0,9) ÷ 0,3', [
    'I = 56 ÷ 7 = 8', 'J = −(4,8 ÷ 1,2) = −4', 'K = −(0,9 ÷ 0,3) = −3'])}
  ${r4Exo(7, 'Calcule en respectant les priorités : L = −2 + 5 × (−3 − 1)', [
    'L = −2 + 5 × (−4)', 'L = −2 + (−20)', 'L = −22'])}
  ${r4Exo(8, 'Calcule en respectant les priorités : M = (−24) ÷ (−6) − 3 × (−2,5) − 10', [
    'M = 4 − (−7,5) − 10', 'M = 4 + 7,5 − 10', 'M = 11,5 − 10', 'M = 1,5'])}
</div>
`;

/* ---- Méthode 1 : somme algébrique ---- */
const R4_SOMME_STEPS = [
  { expr: 'S = (+4) − (−9) + (−12) − (+3,5)', note: 'On part d\'un enchaînement d\'additions et de soustractions.' },
  { expr: 'S = (+4) + (+9) + (−12) + (−3,5)', note: 'Chaque soustraction devient l\'addition de l\'opposé : − (−9) devient + (+9), − (+3,5) devient + (−3,5).' },
  { expr: 'S = 4 + 9 − 12 − 3,5', note: 'On supprime les signes d\'addition et les parenthèses : c\'est une somme algébrique.' },
  { expr: 'S = 13 − 15,5', note: 'On regroupe les nombres positifs (4 + 9 = 13) et les nombres négatifs (12 + 3,5 = 15,5).' },
  { expr: 'S = −2,5', note: 'Signes contraires : on soustrait les distances à zéro, et c\'est −15,5 qui impose son signe.' },
];
const r4SommeDemo = makeStepDemo(R4_SOMME_STEPS, 'r4-sommeDisplay');

/* ---- Méthode 3 : quotient ---- */
const R4_QUOTIENT_STEPS = [
  { expr: 'Q = (−6,3) ÷ (−0,9)', note: 'On veut diviser deux nombres relatifs.' },
  { expr: 'Les deux nombres sont négatifs : même signe.', note: 'On détermine d\'abord le signe du quotient, avec la même règle que pour un produit.' },
  { expr: 'Donc Q est positif.', note: 'Même signe : quotient positif. Signes contraires : quotient négatif.' },
  { expr: 'Q = 6,3 ÷ 0,9', note: 'On divise ensuite les distances à zéro.' },
  { expr: 'Q = 7', note: 'On termine le calcul : 0,9 × 7 = 6,3.' },
];
const r4QuotientDemo = makeStepDemo(R4_QUOTIENT_STEPS, 'r4-quotientDisplay');

/* ---- Méthode 4 : priorités ---- */
const R4_PRIORITES_STEPS = [
  { expr: `T = 10 − 2 × ${R4_BLEU('(1 − 6)')} ÷ (−5)`, note: 'On repère le calcul prioritaire : la parenthèse.' },
  { expr: `T = 10 − ${R4_BLEU('2 × (−5)')} ÷ (−5)`, note: 'Plus de parenthèse : multiplications et divisions, de gauche à droite.' },
  { expr: `T = 10 − ${R4_BLEU('(−10) ÷ (−5)')}`, note: '2 × (−5) = −10 (signes contraires : négatif). On effectue maintenant la division.' },
  { expr: 'T = 10 − 2', note: '(−10) ÷ (−5) = 2 (même signe : positif). Il ne reste qu\'une soustraction.' },
  { expr: 'T = 8', note: 'On termine le calcul.' },
];
const r4PrioritesDemo = makeStepDemo(R4_PRIORITES_STEPS, 'r4-prioritesDisplay');

/* ---- Méthode 2 : signe d'un produit (tirage aléatoire, comptage animé) ---- */
const R4_PROD_VALEURS = [2, 3, 4, 5, 0.5, 1.5, 2.5, 6, 0.2, 7];
let r4Prod = [], r4ProdTimer = null;
function r4Fmt(v){ return String(Math.abs(v)).replace('.', ','); }
function r4ProdNouveau(initial){
  clearTimeout(r4ProdTimer);
  const n = 4 + Math.floor(Math.random() * 3); // 4 à 6 facteurs
  r4Prod = initial || Array.from({ length: n }, () => R4_PROD_VALEURS[Math.floor(Math.random() * R4_PROD_VALEURS.length)] * (Math.random() < 0.5 ? -1 : 1));
  document.getElementById('r4-prodFacteurs').innerHTML = r4Prod.map((v, i) => {
    const t = v < 0 ? (i === 0 ? '−' + r4Fmt(v) : '(−' + r4Fmt(v) + ')') : r4Fmt(v);
    return `${i ? '<span style="color:#6B6F7A;">×</span>' : ''}<span class="r4-f" data-i="${i}" style="padding:3px 7px;border-radius:8px;transition:background .25s,color .25s;">${t}</span>`;
  }).join('');
  document.getElementById('r4-prodBilan').innerHTML = '';
  document.getElementById('r4-prodCompter').disabled = false;
}
function r4ProdCompter(){
  clearTimeout(r4ProdTimer);
  const neg = r4Prod.map((v, i) => v < 0 ? i : -1).filter(i => i >= 0), bilan = document.getElementById('r4-prodBilan');
  document.getElementById('r4-prodCompter').disabled = true;
  document.querySelectorAll('#r4-prodFacteurs .r4-f').forEach(el => { el.style.background = ''; el.style.color = ''; });
  let k = 0;
  const etape = () => {
    if(k < neg.length){
      const el = document.querySelector(`#r4-prodFacteurs .r4-f[data-i="${neg[k]}"]`);
      if(el){ el.style.background = '#FDE2DD'; el.style.color = '#C0392B'; }
      k++;
      bilan.innerHTML = `Facteurs négatifs : <b style="font-size:1.2rem;color:#C0392B;">${k}</b>`;
      r4ProdTimer = setTimeout(etape, 650);
      return;
    }
    const pair = neg.length % 2 === 0;
    const val = r4Prod.reduce((p, v) => p * v, 1), txt = String(Math.round(val * 1000) / 1000).replace('-', '−').replace('.', ',');
    bilan.innerHTML = `<b>${neg.length}</b> facteur${neg.length > 1 ? 's' : ''} négatif${neg.length > 1 ? 's' : ''} : ${neg.length} est <b>${pair ? 'pair' : 'impair'}</b>, donc le produit est <b style="color:${pair ? '#1E7B34' : '#C0392B'};">${pair ? 'positif' : 'négatif'}</b>.<br><span style="color:#6B6F7A;">Valeur du produit : ${txt}</span>`;
    document.getElementById('r4-prodCompter').disabled = false;
  };
  bilan.innerHTML = 'Facteurs négatifs : <b style="font-size:1.2rem;">0</b>';
  r4ProdTimer = setTimeout(etape, 450);
}

DEMO_REGISTRY['4e|Opérations sur les nombres relatifs'] = {
  cours: 'cours-demo-operations-relatifs-4e', methode: 'methode-demo-operations-relatifs-4e', exos: 'exos-demo-operations-relatifs-4e', histoire: 'histoire-demo-operations-relatifs-4e',
  init: () => {
    r4SommeDemo.reset(); r4QuotientDemo.reset(); r4PrioritesDemo.reset();
    r4ProdNouveau([-2, 5, -0.5, -4, 3]);
    ['cours-demo-operations-relatifs-4e', 'exos-demo-operations-relatifs-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-operations-relatifs-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-operations-relatifs-4e'));
  }
};

DEMO_QUIZZES['4e|Opérations sur les nombres relatifs'] = [
  { q: '(−8) + (+3) est égal à...', opts: ['−11', '−5', '+5'], correct: 1 },
  { q: 'Soustraire (−6) revient à...', opts: ['Ajouter (−6)', 'Ajouter (+6)', 'Multiplier par (−6)'], correct: 1 },
  { q: '(−7) × (−4) est égal à...', opts: ['−28', '+28', '−11'], correct: 1 },
  { q: 'Un produit de 5 facteurs dont 3 sont négatifs est...', opts: ['positif', 'négatif', 'nul'], correct: 1 },
  { q: "L'inverse de −4 est...", opts: ['4', '−0,25', '0,25'], correct: 1 },
  { q: '(−36) ÷ 9 est égal à...', opts: ['−4', '4', '−27'], correct: 0 },
  { q: 'Que vaut 2 − 3 × (−4) ?', opts: ['4', '14', '−10'], correct: 1 },
];

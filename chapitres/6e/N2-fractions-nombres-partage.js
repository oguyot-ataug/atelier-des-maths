/* ============================================================
   CHAPITRE : Fractions : nombres et partage (6e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-fractions-partage').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Écriture fractionnaire</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Quotient</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est le résultat de la division de <i>a</i> par <i>b</i> : <span class="tex">\\dfrac{a}{b} = a : b</span>. Elle se lit « a divisé par b » ou « a sur b ».</div>
<p class="example-title">Exemple : comment se lit la fraction <span class="tex">\\dfrac{3}{4}</span> ?</p>
<p style="margin:4px 0 12px;">Elle se lit « trois quarts », ou « 3 divisé par 4 », ou « 3 sur 4 ».</p>

<div class="sub-header"><span class="letter">B</span><h4>Nombre fraction</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est le nombre qui, multiplié par <i>b</i>, donne <i>a</i>. Elle vérifie donc : <span class="tex">\\dfrac{a}{b} \\times b = a</span> et <span class="tex">b \\times \\dfrac{a}{b} = a</span>. Dans le cas particulier où b = 1, on a : <span class="tex">\\dfrac{a}{1} = a</span>.</div>
<p class="example-title">Exemple : complète les égalités … × 5 = 4 et … × 7 = 9.</p>
<p style="margin:4px 0 4px;">La fraction <span class="tex">\\dfrac{4}{5}</span> est le nombre qui, multiplié par 5, donne 4, donc on peut écrire <span class="tex">\\dfrac{4}{5} \\times 5 = 4</span>.</p>
<p style="margin:4px 0 12px;">La fraction <span class="tex">\\dfrac{9}{7}</span> est le nombre qui, multiplié par 7, donne 9, donc on peut écrire <span class="tex">\\dfrac{9}{7} \\times 7 = 9</span>.</p>

<div class="sub-header"><span class="letter">C</span><h4>Écriture d'une fraction</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\dfrac{a}{b}</span> est <b>soit un nombre entier</b>, <b>soit un nombre décimal non entier</b>, <b>soit un nombre non décimal</b>.</div>
<p class="example-title">Exemple : dans quel ensemble de nombres se trouve chacune des fractions <span class="tex">\\dfrac{48}{6}</span>, <span class="tex">\\dfrac{3}{4}</span> et <span class="tex">\\dfrac{1}{3}</span> ?</p>
<ul class="example-list">
  <li><span class="tex">\\dfrac{48}{6}</span> est le résultat de la division 48 : 6 = 8. On a donc <span class="tex">\\dfrac{48}{6} = 8</span> : la fraction <span class="tex">\\dfrac{48}{6}</span> est donc un <b>nombre entier</b>.</li>
  <li><span class="tex">\\dfrac{3}{4}</span> est le résultat de la division 3 : 4. On vérifie que 0,75 × 4 = 3, donc <span class="tex">\\dfrac{3}{4} = 0{,}75</span> : la fraction <span class="tex">\\dfrac{3}{4}</span> est donc un <b>nombre décimal non entier</b>.</li>
  <li><span class="tex">\\dfrac{1}{3}</span> est le nombre qui, multiplié par 3, donne 1 : <span class="tex">\\dfrac{1}{3} \\times 3 = 1</span>. La division 1 : 3 ne se termine jamais ; on peut seulement écrire <span class="tex">\\dfrac{1}{3} \\approx 0{,}33</span> : la fraction <span class="tex">\\dfrac{1}{3}</span> est donc un <b>nombre non décimal</b>.</li>
</ul>

<div class="sub-header" style="margin-top:16px;"><span class="letter">D</span><h4>Nombre mixte</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une fraction plus grande que 1 peut s'écrire comme la somme d'un <b>nombre entier</b> et d'une <b>fraction plus petite que 1</b> : c'est l'écriture en <b>nombre mixte</b>. Par exemple <span class="tex">\\dfrac{7}{4} = 1 + \\dfrac{3}{4}</span>, que l'on note aussi <span class="tex">1\\dfrac{3}{4}</span> (« un et trois quarts »).</div>
<p class="example-title">Exemple : écris <span class="tex">\\dfrac{17}{5}</span> sous forme de nombre mixte, puis sous forme décimale.</p>
<ul class="example-list">
  <li>Dans 17 cinquièmes, combien de fois 5 cinquièmes (c'est-à-dire 1) ? 17 = 3 × 5 + 2 : il y a 3 unités et il reste 2 cinquièmes.</li>
  <li>Donc <span class="tex">\\dfrac{17}{5} = 3 + \\dfrac{2}{5}</span>, soit <span class="tex">3\\dfrac{2}{5}</span>. Comme <span class="tex">\\dfrac{2}{5} = 0{,}4</span>, on a aussi <span class="tex">\\dfrac{17}{5} = 3{,}4</span>.</li>
  <li>Dans l'autre sens : <span class="tex">2 + \\dfrac{3}{4} = \\dfrac{8}{4} + \\dfrac{3}{4} = \\dfrac{11}{4}</span>.</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : l'écriture en nombre mixte permet d'encadrer la fraction par deux entiers consécutifs : <span class="tex">3 &lt; \\dfrac{17}{5} &lt; 4</span>. Elle aide aussi à ranger des fractions : <span class="tex">\\dfrac{17}{5} = 3\\dfrac{2}{5}</span> est plus petit que <span class="tex">\\dfrac{15}{4} = 3\\dfrac{3}{4}</span>, car <span class="tex">\\dfrac{2}{5} &lt; \\dfrac{3}{4}</span>.
</div>

<div class="sub-header" style="margin-top:16px;"><span class="letter">E</span><h4>Repérer une fraction sur une demi-droite graduée</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Sur une demi-droite graduée, l'<b>unité</b> est l'écart entre deux nombres entiers qui se suivent (par exemple de 0 à 1). Si l'unité est partagée en <i>b</i> parts égales, <b>chaque graduation vaut <span class="tex">\\dfrac{1}{b}</span></b>, et le point situé à <i>a</i> graduations de l'origine a pour <b>abscisse <span class="tex">\\dfrac{a}{b}</span></b>.</div>
<p class="example-title">Exemple : lis l'abscisse des points M et N.</p>
<div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 6, lab: { 0: '0', 3: '1', 6: '2' }, pts: [[2, 'M'], [5, 'N']] })}</div>
<ul class="example-list">
  <li>De 0 à 1, il y a 3 sauts : l'unité est partagée en 3, une graduation vaut <span class="tex">\\dfrac{1}{3}</span>.</li>
  <li>M est à 2 graduations de l'origine : <span class="tex">M\\left(\\dfrac{2}{3}\\right)</span>.</li>
  <li>N est à 5 graduations de l'origine : <span class="tex">N\\left(\\dfrac{5}{3}\\right)</span>, et <span class="tex">\\dfrac{5}{3} = 1 + \\dfrac{2}{3}</span> : N est 2 graduations après 1.</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Attention : on compte les <b>sauts</b> (les intervalles), pas les traits. Quand 0 n'est pas sur l'axe, on part du nombre entier écrit juste avant le point et on utilise l'écriture en nombre mixte (voir les méthodes animées).
</div>

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
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Les fractions comptent parmi les plus vieilles notions des mathématiques : on en trouve la trace il y a environ 3 600 ans, dans le papyrus de Rhind, un texte égyptien conservé au British Museum. Mais les Égyptiens ne les écrivaient pas comme nous : ils n'utilisaient (presque) que des fractions de numérateur 1 (comme <span class="tex">\\dfrac{1}{2}</span> ou <span class="tex">\\dfrac{1}{7}</span>), et exprimaient toutes les autres comme des sommes de fractions de ce type. Il faudra attendre les mathématiciens indiens, plus de mille ans plus tard, pour voir apparaître une écriture des fractions plus proche de la nôtre, avec un numérateur et un dénominateur.
</div>
`;

document.getElementById('methode-demo-fractions-partage').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : placer un point d'abscisse fractionnaire (l'axe commence à 0)</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fpAxPlacer0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpAxPlacer0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpAxPlacer0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : placer un point d'abscisse fractionnaire (l'axe ne commence pas à 0)</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fpAxPlacerSans0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpAxPlacerSans0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpAxPlacerSans0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : lire l'abscisse d'un point sous forme de fraction (l'axe commence à 0)</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fpAxLire0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpAxLire0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpAxLire0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : lire l'abscisse d'un point sous forme de fraction (l'axe ne commence pas à 0)</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fpAxLireSans0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpAxLireSans0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpAxLireSans0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : calculer un pourcentage</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fp-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-fractions-partage').innerHTML = `
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
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c1"><div><p style="margin:0 0 6px;"><span class="tex">\\dfrac{36}{4}</span> = 36 ÷ 4 = 9 : <b>c'est un nombre entier</b> (donc aussi un nombre décimal).</p><p style="margin:0 0 6px;"><span class="tex">\\dfrac{5}{2}</span> = 5 ÷ 2 = 2,5 : <b>c'est un nombre décimal</b> (non entier).</p><p style="margin:0 0 6px;"><span class="tex">\\dfrac{2}{7}</span> = 2 ÷ 7 ≈ 0,2857… : la division ne s'arrête jamais ; <b>ce n'est pas un nombre décimal</b>, il ne s'écrit qu'en écriture fractionnaire.</p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Complète l'égalité de fractions <span class="tex">\\dfrac{4}{7} = \\dfrac{?}{28}</span>.
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c2"><div><p style="margin:0 0 6px;">Pour passer de 7 à 28, on multiplie par 4 (7 × 4 = 28).</p><p style="margin:0 0 6px;">On multiplie aussi le numérateur par 4 : 4 × 4 = 16.</p><p style="margin:0 0 6px;"><b><span class="tex">\\dfrac{4}{7} = \\dfrac{16}{28}</span></b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un sac contient 5 boules jaunes et 15 boules bleues. Calcule le pourcentage de boules jaunes dans ce sac.
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c3"><div><p style="margin:0 0 6px;">Il y a 5 + 15 = 20 boules, dont 5 jaunes.</p><p style="margin:0 0 6px;">La proportion de boules jaunes est <span class="tex">\\dfrac{5}{20}</span> = <span class="tex">\\dfrac{1}{4}</span> = <span class="tex">\\dfrac{25}{100}</span>.</p><p style="margin:0 0 6px;"><b>25 % des boules sont jaunes.</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Lis l'abscisse des points E, F et G. Écris-la sous forme d'une fraction.<div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 12, lab: { 0: '0', 4: '1', 8: '2', 12: '3' }, pts: [[3, 'E'], [6, 'F'], [10, 'G']] })}</div>
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c4"><div><p style="margin:0 0 6px;">De 0 à 1, il y a 4 sauts : une graduation vaut <span class="tex">\\dfrac{1}{4}</span>.</p><p style="margin:0 0 6px;">E est à 3 graduations de l'origine : <b><span class="tex">E\\left(\\dfrac{3}{4}\\right)</span></b>.</p><p style="margin:0 0 6px;">F est à 6 graduations : <b><span class="tex">F\\left(\\dfrac{6}{4}\\right)</span></b> (on peut aussi écrire <span class="tex">\\dfrac{3}{2}</span> ou 1,5).</p><p style="margin:0 0 6px;">G est à 10 graduations : <b><span class="tex">G\\left(\\dfrac{10}{4}\\right)</span></b>, et <span class="tex">\\dfrac{10}{4} = 2 + \\dfrac{2}{4}</span> : G est 2 graduations après 2.</p><div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 12, lab: { 0: '0', 4: '1', 8: '2', 12: '3' }, pts: [[3, 'E', [3, 4]], [6, 'F', [6, 4]], [10, 'G', [10, 4]]] })}</div></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Reproduis cette demi-droite graduée et place les points R, S et T d'abscisses <span class="tex">\\dfrac{5}{6}</span>, <span class="tex">\\dfrac{2}{3}</span> et <span class="tex">\\dfrac{3}{2}</span>.<div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 12, lab: { 0: '0', 6: '1', 12: '2' } })}</div>
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c5"><div><p style="margin:0 0 6px;">De 0 à 1, il y a 6 sauts : une graduation vaut <span class="tex">\\dfrac{1}{6}</span>. On écrit chaque abscisse en sixièmes.</p><p style="margin:0 0 6px;"><span class="tex">\\dfrac{5}{6}</span> : R est à 5 graduations de l'origine.</p><p style="margin:0 0 6px;"><span class="tex">\\dfrac{2}{3} = \\dfrac{2 \\times 2}{3 \\times 2} = \\dfrac{4}{6}</span> : S est à 4 graduations de l'origine.</p><p style="margin:0 0 6px;"><span class="tex">\\dfrac{3}{2} = \\dfrac{3 \\times 3}{2 \\times 3} = \\dfrac{9}{6}</span> : T est à 9 graduations de l'origine (3 graduations après 1).</p><div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 12, lab: { 0: '0', 6: '1', 12: '2' }, pts: [[5, 'R', [5, 6]], [4, 'S', [2, 3]], [9, 'T', [3, 2]]] })}</div></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 6</div>
    Lis l'abscisse des points H et K, puis écris-la sous la forme d'une seule fraction.<div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 10, lab: { 0: '4', 5: '5', 10: '6' }, origine: '0 n\'est pas sur l\'axe', pts: [[3, 'H'], [6, 'K']] })}</div>
    <button type="button" class="exo-correction-toggle" data-target="c6-n2-c6" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n2-c6"><div><p style="margin:0 0 6px;">0 n'est pas sur l'axe. De 4 à 5, il y a 5 sauts : une graduation vaut <span class="tex">\\dfrac{1}{5}</span>.</p><p style="margin:0 0 6px;">H est 3 graduations après 4 : <span class="tex">4 + \\dfrac{3}{5} = \\dfrac{20}{5} + \\dfrac{3}{5} = \\dfrac{23}{5}</span>, donc <b><span class="tex">H\\left(\\dfrac{23}{5}\\right)</span></b>.</p><p style="margin:0 0 6px;">K est 1 graduation après 5 : <span class="tex">5 + \\dfrac{1}{5} = \\dfrac{25}{5} + \\dfrac{1}{5} = \\dfrac{26}{5}</span>, donc <b><span class="tex">K\\left(\\dfrac{26}{5}\\right)</span></b>.</p><div style="margin:10px 0;overflow-x:auto;">${fpAxeFig({ n: 10, lab: { 0: '4', 5: '5', 10: '6' }, origine: '0 n\'est pas sur l\'axe', pts: [[3, 'H', [23, 5]], [6, 'K', [26, 5]]] })}</div></div></div>
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

/* ---- Repérage d'une fraction sur un axe gradué (cours, méthodes animées, exercices) -- demandé : « C'est ici
   que je souhaite du repérage sur un axe aussi ! Avec des fractions » (lire et placer, avec ou sans 0). ---- */
// o = { n : nombre d'intervalles ; lab : {graduation: texte ou [num, dén]} ; hl : graduations repérées à entourer ;
//       acc : [i0, i1, texte] accolade ; gras : [i0, i1] (une unité) ; sauts : [i0, i1] (les bonds comptés) ;
//       pt : [i, nom, abscisse (texte ou [num, dén]) facultative] ; pts : plusieurs points ; origine : texte en début d'axe }
function fpAxeFig(o){
  const n = o.n, w = 300 / n, X = i => 22 + i * w, Y = 70, K = '#1F3A5C', OR = '#E35D3A', VE = '#1E7B34';
  // Nombre écrit sous l'axe : entier, ou fraction en étage.
  const nb = (x, t, col) => {
    if(!Array.isArray(t)) return `<text x="${x}" y="${Y + 30}" font-size="14" font-weight="700" text-anchor="middle" fill="${col}">${t}</text>`;
    const d = 5 + 4 * Math.max(String(t[0]).length, String(t[1]).length);
    return `<text x="${x}" y="${Y + 25}" font-size="13" font-weight="700" text-anchor="middle" fill="${col}">${t[0]}</text><line x1="${x - d}" y1="${Y + 29.5}" x2="${x + d}" y2="${Y + 29.5}" stroke="${col}" stroke-width="1.4"/><text x="${x}" y="${Y + 42}" font-size="13" font-weight="700" text-anchor="middle" fill="${col}">${t[1]}</text>`;
  };
  let g = `<line x1="10" y1="${Y}" x2="${X(n) + 16}" y2="${Y}" stroke="${K}" stroke-width="1.8"/><path d="M${X(n) + 20},${Y} l-8,-4 v8 z" fill="${K}"/>`;
  if(o.gras) g += `<line x1="${X(o.gras[0])}" y1="${Y}" x2="${X(o.gras[1])}" y2="${Y}" stroke="#2EA8C9" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
  for(let i = 0; i <= n; i++){ const lab = o.lab && o.lab[i] != null; g += `<line x1="${X(i)}" y1="${Y - (lab ? 9 : 5)}" x2="${X(i)}" y2="${Y + (lab ? 9 : 5)}" stroke="${K}" stroke-width="${lab ? 1.8 : 1}"/>`; }
  Object.entries(o.lab || {}).forEach(([i, t]) => { const on = (o.hl || []).includes(+i), fr = Array.isArray(t);
    g += (on ? `<rect x="${X(+i) - 18}" y="${Y + 13}" width="36" height="${fr ? 34 : 23}" rx="10" fill="#FFF3D6" stroke="#E9A21C" stroke-width="1.4"/>` : '') + nb(X(+i), t, K); });
  if(o.acc){ const [a, b, t] = o.acc; g += `<path d="M${X(a)},${Y - 14} q0,-8 8,-8 h${X(b) - X(a) - 16} q8,0 8,8" fill="none" stroke="${VE}" stroke-width="1.6"/><text x="${(X(a) + X(b)) / 2}" y="${Y - 27}" font-size="13" font-weight="700" text-anchor="middle" fill="${VE}">${t}</text>`; }
  if(o.sauts){ const [a, b] = o.sauts, d = a < b ? 1 : -1; for(let i = a, k = 1; i !== b; i += d, k++) g += `<path d="M${X(i)},${Y - 3} q${w / 2 * d},-16 ${w * d},0" fill="none" stroke="${OR}" stroke-width="1.5"/><text x="${X(i) + w / 2 * d}" y="${Y - 17}" font-size="11" font-weight="700" text-anchor="middle" fill="${OR}">${k}</text>`; }
  (o.pts || (o.pt ? [o.pt] : [])).forEach(([i, nom, t]) => { g += `<path d="M${X(i) - 5},${Y - 5} L${X(i) + 5},${Y + 5} M${X(i) - 5},${Y + 5} L${X(i) + 5},${Y - 5}" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/><text x="${X(i)}" y="${Y - 30}" font-size="17" font-weight="700" text-anchor="middle" fill="${OR}">${nom}</text>` + (t != null ? nb(X(i), t, OR) : ''); });
  if(o.origine) g += `<text x="12" y="${Y - 54}" font-size="12" fill="#7A4FC0">${o.origine}</text>`;
  return `<svg viewBox="0 0 350 126" style="width:100%;min-width:300px;max-width:460px;display:block;">${g}</svg>`;
}
const fpTx = s => '<span class="tex">' + s + '</span>';
// Placer A(7/4) : axe de 0 à 3, unité partagée en 4.
const FP_AX_PL0 = { n: 12, lab: { 0: '0', 4: '1', 8: '2', 12: '3' } };
const FP_AXPLACER0_STEPS = [
  { expr: 'Placer le point A d\'abscisse ' + fpTx('\\dfrac{7}{4}') + '.', note: "L'axe commence à 0 : c'est l'origine. On repère d'abord les nombres écrits sous l'axe.", fig: fpAxeFig(FP_AX_PL0) },
  { expr: 'Le dénominateur est 4. De 0 à 1, il y a 4 sauts : une graduation vaut ' + fpTx('\\dfrac{1}{4}') + '.', note: "On compte les intervalles (les « sauts ») entre 0 et 1, pas les traits. L'unité est bien partagée en 4 parts égales : des quarts.", fig: fpAxeFig(Object.assign({ acc: [0, 4, '4 sauts : 1 unité'], gras: [0, 4] }, FP_AX_PL0)) },
  { expr: fpTx('\\dfrac{7}{4}') + ', c\'est 7 quarts : ' + fpTx('7 \\times \\dfrac{1}{4}') + '.', note: "Le numérateur 7 dit combien de graduations il faut compter depuis l'origine.", fig: fpAxeFig(Object.assign({ hl: [0] }, FP_AX_PL0)) },
  { expr: 'On part de 0 et on avance de 7 graduations.', note: 'Chaque saut vaut ' + fpTx('\\dfrac{1}{4}') + ' : ' + fpTx('\\dfrac{1}{4}') + ' ; ' + fpTx('\\dfrac{2}{4}') + ' ; … ; ' + fpTx('\\dfrac{7}{4}') + '.', fig: fpAxeFig(Object.assign({ hl: [0], sauts: [0, 7] }, FP_AX_PL0)) },
  { expr: 'On place le point A : ' + fpTx('A\\left(\\dfrac{7}{4}\\right)') + '.', note: 'Vérification : ' + fpTx('\\dfrac{7}{4} = \\dfrac{4}{4} + \\dfrac{3}{4} = 1 + \\dfrac{3}{4}') + ' : A est entre 1 et 2, 3 graduations après 1.', fig: fpAxeFig(Object.assign({ pt: [7, 'A', [7, 4]] }, FP_AX_PL0)) },
];
const fpAxPlacer0Demo = makeStepDemo(FP_AXPLACER0_STEPS, 'fpAxPlacer0Display');
// Placer B(8/3) : l'axe commence à 2 (pas de 0), unité partagée en 3.
const FP_AX_PLS = { n: 9, lab: { 0: '2', 3: '3', 6: '4', 9: '5' }, origine: '0 n\'est pas sur l\'axe' };
const FP_AXPLACERSANS0_STEPS = [
  { expr: 'Placer le point B d\'abscisse ' + fpTx('\\dfrac{8}{3}') + '.', note: "Ici, l'axe commence à 2 : on ne peut pas compter 8 graduations depuis le début de l'axe.", fig: fpAxeFig(FP_AX_PLS) },
  { expr: 'De 2 à 3, il y a 3 sauts : une graduation vaut ' + fpTx('\\dfrac{1}{3}') + '.', note: "Une unité est toujours l'écart entre deux nombres entiers qui se suivent. Elle est partagée en 3 : des tiers.", fig: fpAxeFig(Object.assign({ acc: [0, 3, '3 sauts : 1 unité'], gras: [0, 3] }, FP_AX_PLS)) },
  { expr: '8 = 2 × 3 + 2', note: "Dans 8 tiers, combien de fois 3 tiers (c'est-à-dire 1 unité) ? 2 fois, et il reste 2 tiers.", fig: fpAxeFig(FP_AX_PLS) },
  { expr: fpTx('\\dfrac{8}{3} = 2 + \\dfrac{2}{3}'), note: "C'est l'écriture en nombre mixte : on part de 2, qui est écrit sur l'axe.", fig: fpAxeFig(Object.assign({ hl: [0] }, FP_AX_PLS)) },
  { expr: 'On part de 2 et on avance de 2 graduations.', note: 'Chaque saut vaut ' + fpTx('\\dfrac{1}{3}') + '.', fig: fpAxeFig(Object.assign({ hl: [0], sauts: [0, 2] }, FP_AX_PLS)) },
  { expr: 'On place le point B : ' + fpTx('B\\left(\\dfrac{8}{3}\\right)') + '.', note: 'Vérification : B est entre 2 et 3, car ' + fpTx('\\dfrac{8}{3}') + ' est entre ' + fpTx('\\dfrac{6}{3} = 2') + ' et ' + fpTx('\\dfrac{9}{3} = 3') + '.', fig: fpAxeFig(Object.assign({ pt: [2, 'B', [8, 3]] }, FP_AX_PLS)) },
];
const fpAxPlacerSans0Demo = makeStepDemo(FP_AXPLACERSANS0_STEPS, 'fpAxPlacerSans0Display');
// Lire C : axe de 0 à 2, unité partagée en 5.
const FP_AX_L0 = { n: 10, lab: { 0: '0', 5: '1', 10: '2' } };
const FP_AXLIRE0_STEPS = [
  { expr: 'Quelle est l\'abscisse du point C ?', note: "L'axe commence à 0. On cherche d'abord en combien de parts égales l'unité est partagée.", fig: fpAxeFig(Object.assign({ pt: [7, 'C'] }, FP_AX_L0)) },
  { expr: 'De 0 à 1, il y a 5 sauts : une graduation vaut ' + fpTx('\\dfrac{1}{5}') + '.', note: "Le nombre de sauts dans une unité donne le dénominateur : 5.", fig: fpAxeFig(Object.assign({ pt: [7, 'C'], acc: [0, 5, '5 sauts : 1 unité'], gras: [0, 5] }, FP_AX_L0)) },
  { expr: 'De 0 à C, on compte 7 graduations.', note: "Le nombre de graduations depuis l'origine donne le numérateur : 7.", fig: fpAxeFig(Object.assign({ pt: [7, 'C'], hl: [0], sauts: [0, 7] }, FP_AX_L0)) },
  { expr: fpTx('7 \\times \\dfrac{1}{5} = \\dfrac{7}{5}'), note: '7 cinquièmes.', fig: fpAxeFig(Object.assign({ pt: [7, 'C', [7, 5]], hl: [0], sauts: [0, 7] }, FP_AX_L0)) },
  { expr: 'L\'abscisse de C est ' + fpTx('\\dfrac{7}{5}') + ' : ' + fpTx('C\\left(\\dfrac{7}{5}\\right)') + '.', note: 'Vérification : ' + fpTx('\\dfrac{7}{5} = 1 + \\dfrac{2}{5}') + ' : C est bien 2 graduations après 1. On peut aussi écrire ' + fpTx('\\dfrac{7}{5} = 1{,}4') + '.', fig: fpAxeFig(Object.assign({ pt: [7, 'C', [7, 5]] }, FP_AX_L0)) },
];
const fpAxLire0Demo = makeStepDemo(FP_AXLIRE0_STEPS, 'fpAxLire0Display');
// Lire D : l'axe commence à 1 (pas de 0), unité partagée en 6, D 5 graduations après 2.
const FP_AX_LS = { n: 12, lab: { 0: '1', 6: '2', 12: '3' }, origine: '0 n\'est pas sur l\'axe' };
const FP_AXLIRESANS0_STEPS = [
  { expr: 'Quelle est l\'abscisse du point D ?', note: "0 n'est pas sur l'axe : compter les graduations depuis le début de l'axe donnerait un résultat faux.", fig: fpAxeFig(Object.assign({ pt: [11, 'D'] }, FP_AX_LS)) },
  { expr: 'De 1 à 2, il y a 6 sauts : une graduation vaut ' + fpTx('\\dfrac{1}{6}') + '.', note: "On repère deux nombres entiers qui se suivent : l'unité est partagée en 6 parts égales, des sixièmes.", fig: fpAxeFig(Object.assign({ pt: [11, 'D'], hl: [0, 6], acc: [0, 6, '6 sauts : 1 unité'], gras: [0, 6] }, FP_AX_LS)) },
  { expr: 'D est 5 graduations après 2.', note: "On part du nombre entier écrit juste avant D : 2.", fig: fpAxeFig(Object.assign({ pt: [11, 'D'], hl: [6], sauts: [6, 11] }, FP_AX_LS)) },
  { expr: 'L\'abscisse de D est ' + fpTx('2 + \\dfrac{5}{6}') + '.', note: '2 unités et 5 sixièmes (écriture en nombre mixte).', fig: fpAxeFig(Object.assign({ pt: [11, 'D'], hl: [6], sauts: [6, 11] }, FP_AX_LS)) },
  { expr: fpTx('2 + \\dfrac{5}{6} = \\dfrac{12}{6} + \\dfrac{5}{6} = \\dfrac{17}{6}'), note: 'On écrit 2 en sixièmes : ' + fpTx('2 = \\dfrac{12}{6}') + ', car 2 × 6 = 12.', fig: fpAxeFig(Object.assign({ pt: [11, 'D', [17, 6]], hl: [6], sauts: [6, 11] }, FP_AX_LS)) },
  { expr: 'L\'abscisse de D est ' + fpTx('\\dfrac{17}{6}') + ' : ' + fpTx('D\\left(\\dfrac{17}{6}\\right)') + '.', note: "Vérification : D est entre 2 et 3, tout près de 3 (il ne manque qu'un sixième).", fig: fpAxeFig(Object.assign({ pt: [11, 'D', [17, 6]] }, FP_AX_LS)) },
];
const fpAxLireSans0Demo = makeStepDemo(FP_AXLIRESANS0_STEPS, 'fpAxLireSans0Display');

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
  init:()=>{ fpAxPlacer0Demo.reset(); fpAxPlacerSans0Demo.reset(); fpAxLire0Demo.reset(); fpAxLireSans0Demo.reset(); fpMethodeDemo.reset(); fpEquivReset(); renderStaticMath(document.getElementById('cours-demo-fractions-partage')); renderStaticMath(document.getElementById('exos-demo-fractions-partage')); renderStaticMath(document.getElementById('histoire-demo-fractions-partage')); injectCourseAddButtons(document.getElementById('cours-demo-fractions-partage')); injectCourseAddButtons(document.getElementById('methode-demo-fractions-partage')); } };

DEMO_QUIZZES['6e|Fractions : nombres et partage'] = [
  {q:"Comment se lit la fraction 5/8 ?",
   opts:["« Cinq divisé par huit »","« Huit divisé par cinq »","« Cinq fois huit »"], correct:0},
  {q:"La fraction 24/6 est...",
   opts:["un nombre entier","un nombre décimal non entier","un nombre non décimal"], correct:0},
  {q:"Sur une demi-droite graduée, l'unité est partagée en 3 parts égales. Le point A est à 5 graduations de l'origine. Quelle est son abscisse ?",
   opts:["5/3","3/5","5"], correct:0},
  {q:"Pour compléter 5/6 = …/24, par quel nombre doit-on multiplier le numérateur 5 ?",
   opts:["Par 4","Par 6","Par 24"], correct:0},
];

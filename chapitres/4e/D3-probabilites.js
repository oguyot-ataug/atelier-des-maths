/* ============================================================
   CHAPITRE : Probabilités (4e, D3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 146-147 : langage des probabilités, calculs, équiprobabilité,
   évènements contraires, des fréquences aux probabilités). Plan du manuel, titres reformulés,
   exemples nouveaux, et des supports différents du chapitre de 5e (urne numérotée, sac à composer,
   jeu de 32 cartes, roue à secteurs inégaux). Utilise r4Ex / R4_REM / R4_BLEU de
   chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const PR4_BLEU = '#0C5BA0', PR4_ORANGE = '#E07B00', PR4_VERT = '#1E7B34', PR4_ENCRE = '#1C1B2E', PR4_ROUGE = '#C0392B';
const pr4Tex = s => `<span class="tex"${s.length < 30 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const pr4Pgcd = (a, b) => { while(b){ [a, b] = [b, a % b]; } return a; };
// Fraction simplifiée en LaTeX : « n/d = n'/d' » si elle se simplifie.
function pr4Fr(n, d, seule){
  const g = pr4Pgcd(n, d) || 1, a = n / g, b = d / g;
  const simp = b === 1 ? String(a) : `\\dfrac{${a}}{${b}}`;
  return g > 1 && !seule ? `\\dfrac{${n}}{${d}} = ${simp}` : (g > 1 ? simp : (d === 1 ? String(n) : `\\dfrac{${n}}{${d}}`));
}
const pr4Num = v => String(Math.round(v * 10000) / 10000).replace('.', ',');

// L'urne du cours et de la méthode 1 : 10 boules numérotées de 1 à 10.
function pr4Urne(favorables, opts){
  opts = opts || {};
  let s = '';
  for(let k = 1; k <= 10; k++){
    const x = 26 + (k - 1) * 46, f = favorables.includes(k);
    s += `<circle cx="${x}" cy="30" r="19" fill="${f ? PR4_BLEU : (opts.contraire ? '#FDF0E1' : '#fff')}" stroke="${f ? PR4_BLEU : (opts.contraire ? PR4_ORANGE : '#8A93A3')}" stroke-width="2"/><text x="${x}" y="36" text-anchor="middle" font-size="16" font-weight="700" fill="${f ? '#fff' : PR4_ENCRE}">${k}</text>`;
  }
  return `<svg viewBox="0 0 470 60" style="width:100%;max-width:480px;display:block;margin:6px auto;">${s}</svg>`;
}

document.getElementById('cours-demo-probabilites-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le vocabulaire des probabilités</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Expérience aléatoire et issues</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Une <b>expérience aléatoire</b> est une expérience qui dépend du hasard : on connaît tous les résultats possibles, mais on ne sait pas à l'avance lequel va se produire.</li>
  <li>Chaque résultat possible est une <b>issue</b>.</li>
</ul></div>
<p class="example-title">Exemple : une urne contient 10 boules indiscernables au toucher, numérotées de 1 à 10. On en tire une au hasard et on lit son numéro.</p>
${pr4Urne([])}
<ul class="example-list"><li>C'est une <b>expérience aléatoire</b> qui a 10 <b>issues</b> : 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8 ; 9 ; 10.</li></ul>

<div class="sub-header"><span class="letter">B</span><h4>Les évènements</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un <b>évènement</b> est un ensemble d'une ou de plusieurs issues.</li>
  <li>Un évènement formé d'une seule issue est un <b>évènement élémentaire</b>.</li>
  <li>Un évènement toujours réalisé est un <b>évènement certain</b> ; un évènement jamais réalisé est un <b>évènement impossible</b>.</li>
  <li>L'<b>évènement contraire</b> d'un évènement A, noté ${pr4Tex('\\overline{A}')}, est formé de toutes les issues qui ne sont pas dans A.</li>
</ul></div>
<p class="example-title">Exemples, avec l'urne :</p>
<ul class="example-list">
  <li>A : « obtenir un nombre pair » est un <b>évènement</b> : A = {2 ; 4 ; 6 ; 8 ; 10}.</li>
  <li>B : « obtenir 7 » est un <b>évènement élémentaire</b>.</li>
  <li>C : « obtenir un nombre inférieur ou égal à 10 » est un <b>évènement certain</b>.</li>
  <li>D : « obtenir 12 » est un <b>évènement impossible</b>.</li>
  <li>${pr4Tex('\\overline{A}')} : « obtenir un nombre impair » est l'<b>évènement contraire</b> de A : ${pr4Tex('\\overline{A}')} = {1 ; 3 ; 5 ; 7 ; 9}.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Calculer des probabilités</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La probabilité d'un évènement</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>probabilité</b> d'un évènement A, notée P(A), est un nombre compris <b>entre 0 et 1</b> qui mesure ses « chances » de se réaliser.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>La probabilité d'un évènement impossible est <b>0</b> ; celle d'un évènement certain est <b>1</b>.</li>
  <li>La <b>somme</b> des probabilités de toutes les issues d'une expérience aléatoire est égale à <b>1</b>.</li>
</ul></div>
<ul class="example-list"><li>Avec l'urne : P(C) = 1, P(D) = 0, et P(« 1 ») + P(« 2 ») + … + P(« 10 ») = 1.</li></ul>

<div class="sub-header"><span class="letter">B</span><h4>Quand toutes les issues ont les mêmes chances</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand les issues d'une expérience aléatoire ont toutes <b>les mêmes chances</b> de se réaliser, on dit qu'elles sont <b>équiprobables</b>.</div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Dans une situation d'équiprobabilité, la probabilité d'un évènement E est :
  <div style="text-align:center;margin:8px 0 2px;">${pr4Tex('P(E) = \\dfrac{\\text{nombre d\'issues favorables à E}}{\\text{nombre total d\'issues}}')}</div></div>
${r4Ex('Exemples, avec l\'urne (les boules sont indiscernables : les 10 issues sont équiprobables) :', [
  ['B : « obtenir 7 ». Une issue favorable sur 10 : ' + pr4Tex('P(B) = \\dfrac{1}{10}') + '.', 'Chaque issue a la probabilité 1/10.'],
  ['E : « obtenir un multiple de 3 ». E = {3 ; 6 ; 9} : ' + pr4Tex('P(E) = \\dfrac{3}{10}') + '.', '3 issues favorables sur 10.'],
  ['A : « obtenir un nombre pair ». ' + pr4Tex('P(A) = \\dfrac{5}{10} = \\dfrac{1}{2}') + '.', ''],
])}
<div class="redaction-note" ${R4_REM}>Attention : la formule ne vaut que si les issues sont équiprobables. Dans un sac de 3 boules rouges, 5 bleues et 2 vertes, les trois couleurs ne sont <b>pas</b> équiprobables : on compte les boules, et P(« rouge ») = ${pr4Tex('\\dfrac{3}{10}')}. Une probabilité s'écrit souvent sous forme de fraction, mais aussi en décimal (0,3) ou en pourcentage (30 %).</div>

<div class="sub-header"><span class="letter">C</span><h4>La probabilité d'un évènement contraire</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La somme des probabilités d'un évènement A et de son contraire ${pr4Tex('\\overline{A}')} est égale à 1 :
  <div style="text-align:center;margin:6px 0 2px;">${pr4Tex('P(A) + P(\\overline{A}) = 1')} &nbsp; donc &nbsp; ${pr4Tex('P(\\overline{A}) = 1 - P(A)')}</div></div>
${r4Ex('Exemple : F : « obtenir un nombre supérieur ou égal à 3 ».', [
  [pr4Tex('\\overline{F}') + ' : « obtenir 1 ou 2 », donc ' + pr4Tex('P(\\overline{F}) = \\dfrac{2}{10}') + '.', 'Le contraire de F n\'a que 2 issues : il est plus facile à compter.'],
  [pr4Tex('P(F) = 1 - \\dfrac{2}{10} = \\dfrac{8}{10} = \\dfrac{4}{5}') + '.', 'On retrouve bien les 8 issues favorables de F (3, 4, …, 10).'],
])}
<div class="redaction-note" ${R4_REM}>Remarque : il est souvent plus rapide de calculer la probabilité du contraire, puis d'utiliser ${pr4Tex('P(A) = 1 - P(\\overline{A})')}.</div>

<div class="lesson-header"><span class="num">3</span><h3>Des fréquences aux probabilités</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Quand on répète un <b>très grand nombre de fois</b> une expérience aléatoire, la <b>fréquence</b> de réalisation d'un évènement E finit par se <b>stabiliser</b> autour de sa probabilité P(E).</div>
<p class="example-title">Exemple : avec l'urne, on a répété le tirage (en remettant la boule à chaque fois) et relevé la fréquence de l'évènement E : « obtenir un multiple de 3 », de probabilité 0,3.</p>
<div style="overflow-x:auto;position:relative;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.93rem;">
  <tr>${['Nombre de tirages', 10, 50, 200, '1 000', '10 000'].map((c, j) => `<td style="border:1px solid #C9D6E6;padding:6px 10px;text-align:center;white-space:nowrap;${j ? '' : 'background:#F4F5F8;font-weight:700;'}">${c}</td>`).join('')}</tr>
  <tr>${['Fréquence de E', '0,5', '0,24', '0,335', '0,288', '0,302 1'].map((c, j) => `<td style="border:1px solid #C9D6E6;padding:6px 10px;text-align:center;white-space:nowrap;${j ? '' : 'background:#F4F5F8;font-weight:700;'}">${c}</td>`).join('')}</tr>
</table></div>
<ul class="example-list"><li>Sur peu de tirages, la fréquence varie beaucoup ; plus le nombre de tirages augmente, plus elle se rapproche de 0,3.</li></ul>
<div class="redaction-note" ${R4_REM}>Remarques : quand on ne peut pas calculer une probabilité (une punaise qui tombe sur la pointe, par exemple), on l'<b>estime</b> par la fréquence observée sur un grand nombre d'essais. Un tableur ou un programme permet de <b>simuler</b> des milliers d'expériences en quelques secondes (voir l'onglet Méthode).</div>
`;

document.getElementById('histoire-demo-probabilites-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  En 1713 paraît <i>Ars conjectandi</i> (« l'art de conjecturer ») du Suisse <b>Jacques Bernoulli</b> : il y démontre la <b>loi des grands nombres</b>, c'est-à-dire le résultat du paragraphe 3 de ce chapitre, sur lequel il avait travaillé pendant vingt ans. Beaucoup ont voulu le vérifier à la main : le naturaliste français <b>Buffon</b> lance une pièce 4 040 fois et obtient 2 048 fois pile (une fréquence d'environ 0,507), et au début du 20e siècle, le statisticien anglais <b>Karl Pearson</b> la lance 24 000 fois pour obtenir 12 012 fois pile (0,500 5) ! En 1812, <b>Pierre-Simon de Laplace</b> écrit la définition « nombre de cas favorables divisé par nombre de cas possibles » que tu utilises. Enfin, dans les années 1940, les mathématiciens <b>Stanislaw Ulam</b> et <b>John von Neumann</b> utilisent les premiers ordinateurs pour simuler des millions d'expériences aléatoires : c'est la « méthode de Monte-Carlo », du nom du célèbre casino, encore utilisée aujourd'hui pour les prévisions météo ou en physique.
</div>
`;

// Évènements proposés dans la méthode 1 : [nom, test sur le numéro, nom du contraire].
const PR4_EVTS = [
  ['obtenir un nombre pair', k => k % 2 === 0, 'obtenir un nombre impair'],
  ['obtenir un multiple de 3', k => k % 3 === 0, 'ne pas obtenir un multiple de 3'],
  ['obtenir un nombre premier', k => [2, 3, 5, 7].includes(k), 'obtenir un nombre qui n\'est pas premier'],
  ['obtenir un nombre supérieur ou égal à 7', k => k >= 7, 'obtenir un nombre inférieur à 7'],
  ['obtenir un nombre inférieur à 4', k => k < 4, 'obtenir un nombre supérieur ou égal à 4'],
  ['obtenir 7', k => k === 7, 'ne pas obtenir 7'],
  ['obtenir un nombre inférieur ou égal à 10', k => k <= 10, 'obtenir un nombre supérieur à 10'],
  ['obtenir 12', k => k === 12, 'ne pas obtenir 12'],
];

document.getElementById('methode-demo-probabilites-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : un évènement, son contraire, leurs probabilités</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On tire une boule dans l'urne numérotée de 1 à 10. Choisissez un évènement : ses issues favorables sont en bleu, celles de son contraire en orange.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:8px 0;">
    <select id="pr4-evt" onchange="pr4Evenement()" style="padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;font-size:1rem;max-width:100%;">
      ${PR4_EVTS.map((e, i) => `<option value="${i}">${e[0]}</option>`).join('')}
    </select>
  </div>
  <div id="pr4-evtUrne"></div>
  <div id="pr4-evtRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : rédiger un calcul de probabilité, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On tire une carte au hasard dans un jeu de 32 cartes (4 couleurs : cœur, carreau, pique, trèfle ; 8 cartes par couleur : 7, 8, 9, 10, valet, dame, roi, as). Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="pr4-cartesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pr4CartesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pr4CartesDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : des fréquences qui se stabilisent (simulation)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Composez le sac, choisissez la couleur de l'évènement, puis lancez des tirages (avec remise). La courbe montre la fréquence observée ; la ligne pointillée est la probabilité.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:8px 0;">
    ${[['R', 'rouges', 3, PR4_ROUGE], ['B', 'bleues', 5, PR4_BLEU], ['V', 'vertes', 2, PR4_VERT]].map(([k, n, v, c]) => `<label style="color:${c};font-weight:700;"><input id="pr4-s${k}" type="number" min="0" max="50" value="${v}" style="width:56px;padding:5px 6px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" oninput="pr4SimReset()"> ${n}</label>`).join('')}
    <label>Évènement : <select id="pr4-sEvt" onchange="pr4SimReset()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"><option value="R">tirer une rouge</option><option value="B">tirer une bleue</option><option value="V">tirer une verte</option></select></label>
  </div>
  <svg id="pr4-simSvg" viewBox="0 0 520 250" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div id="pr4-simRes" class="step-note" style="text-align:center;min-height:2.6em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pr4Simuler(10)">+10 tirages</button>
    <button class="btn" onclick="pr4Simuler(100)">+100</button>
    <button class="btn" onclick="pr4Simuler(1000)">+1 000</button>
    <button class="btn secondary" onclick="pr4SimReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : une roue dont les issues ne sont pas équiprobables</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Les trois secteurs n'ont pas la même taille : la probabilité de chaque couleur est proportionnelle à l'angle de son secteur. Faites tourner la roue, une fois ou cent fois.</p>
  <svg id="pr4-roueSvg" viewBox="0 0 260 250" style="width:100%;max-width:280px;display:block;margin:8px auto;"></svg>
  <div id="pr4-roueRes" style="margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" id="pr4-roueBtn" onclick="pr4Tourner()">Tourner la roue</button>
    <button class="btn" onclick="pr4Tourner(100)">Tourner 100 fois</button>
    <button class="btn secondary" onclick="pr4RoueReset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function pr4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pr4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pr4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-probabilites-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer la probabilité d'un évènement contraire »</h3>
  <p style="margin:0 0 8px;">Un sac contient 4 boules rouges, 7 bleues et 9 vertes, indiscernables au toucher. On tire une boule au hasard. Quelle est la probabilité de ne pas tirer une boule verte ?</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Il y a 4 + 7 + 9 = 20 boules, qui ont toutes la même chance d'être tirées.</span><span class="we-comment">On justifie l'équiprobabilité des 20 issues.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Soit V : « tirer une boule verte ». ${pr4Tex('P(V) = \\dfrac{9}{20}')}</span><span class="we-comment">9 issues favorables sur 20.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">« Ne pas tirer une boule verte » est l'évènement contraire ${pr4Tex('\\overline{V}')}.</span><span class="we-comment">On reconnaît un évènement contraire.</span></div>
    <div class="we-row"><span class="we-expr">${pr4Tex('P(\\overline{V}) = 1 - P(V) = 1 - \\dfrac{9}{20} = \\dfrac{11}{20}')}</span><span class="we-comment">On applique la propriété.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La probabilité de ne pas tirer une boule verte est ${pr4Tex('\\dfrac{11}{20}')}, soit 0,55.</span><span class="we-comment">On conclut par une phrase.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pr4Exo(1, 'On fait tourner une roue partagée en 8 secteurs égaux numérotés de 1 à 8. Donne : a) les issues ; b) un évènement élémentaire ; c) un évènement certain ; d) un évènement impossible ; e) le contraire de « obtenir un nombre pair ».', [
    'a) 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8. b) Par exemple « obtenir 5 ». c) Par exemple « obtenir un nombre entre 1 et 8 ». d) Par exemple « obtenir 9 ».',
    'e) « Obtenir un nombre impair » : {1 ; 3 ; 5 ; 7}.'])}
  ${pr4Exo(2, 'On lance un dé équilibré à 6 faces. Calcule la probabilité de : a) obtenir 5 ; b) obtenir un nombre premier ; c) obtenir au moins 5.', [
    'Le dé est équilibré : les 6 issues sont équiprobables.',
    'a) ' + pr4Tex('\\dfrac{1}{6}') + ' ; b) les nombres premiers sont 2, 3 et 5 : ' + pr4Tex('\\dfrac{3}{6} = \\dfrac{1}{2}') + ' ; c) 5 ou 6 : ' + pr4Tex('\\dfrac{2}{6} = \\dfrac{1}{3}') + '.'])}
  ${pr4Exo(3, 'Un sac contient 5 jetons jaunes, 3 noirs et 12 blancs. On tire un jeton au hasard. Calcule la probabilité de chaque couleur, puis vérifie que leur somme vaut 1.', [
    'Il y a 20 jetons. P(jaune) = ' + pr4Tex('\\dfrac{5}{20} = \\dfrac{1}{4}') + ' ; P(noir) = ' + pr4Tex('\\dfrac{3}{20}') + ' ; P(blanc) = ' + pr4Tex('\\dfrac{12}{20} = \\dfrac{3}{5}') + '.',
    'Somme des trois probabilités :', pr4Tex('S = \\dfrac{5}{20} + \\dfrac{3}{20} + \\dfrac{12}{20} = \\dfrac{20}{20} = 1')])}
  ${pr4Exo(4, 'Vrai ou faux ? a) « La probabilité d\'un évènement peut valoir 1,2. » b) « Si P(A) = 0,3, alors ' + pr4Tex('P(\\overline{A}) = 0{,}7') + '. » c) « J\'ai obtenu pile 5 fois de suite : au prochain lancer, face a plus de chances de sortir. »', [
    'a) Faux : une probabilité est toujours comprise entre 0 et 1.', 'b) Vrai : ' + pr4Tex('P(\\overline{A}) = 1 - 0{,}3 = 0{,}7') + '.',
    'c) Faux : la pièce n\'a pas de mémoire. À chaque lancer, pile et face ont toujours une chance sur deux.'])}
  ${pr4Exo(5, 'On tire une carte au hasard dans un jeu de 32 cartes. Calcule la probabilité de tirer : a) un as ; b) une carte rouge (cœur ou carreau) ; c) une carte qui n\'est ni un as ni un roi.', [
    'a) 4 as sur 32 cartes : ' + pr4Tex('\\dfrac{4}{32} = \\dfrac{1}{8}') + '. b) 16 cartes rouges : ' + pr4Tex('\\dfrac{16}{32} = \\dfrac{1}{2}') + '.',
    'c) Le contraire est « tirer un as ou un roi » (8 cartes) : ' + pr4Tex('1 - \\dfrac{8}{32} = \\dfrac{24}{32} = \\dfrac{3}{4}') + '.'])}
  ${pr4Exo(6, 'Une roue est partagée en trois secteurs : un jaune de 90°, un rouge de 150° et un bleu de 120°. Calcule la probabilité de chaque couleur.', [
    'Les couleurs ne sont pas équiprobables : la probabilité est proportionnelle à l\'angle.',
    'P(jaune) = ' + pr4Tex('\\dfrac{90}{360} = \\dfrac{1}{4}') + ' ; P(rouge) = ' + pr4Tex('\\dfrac{150}{360} = \\dfrac{5}{12}') + ' ; P(bleu) = ' + pr4Tex('\\dfrac{120}{360} = \\dfrac{1}{3}') + '.'])}
  ${pr4Exo(7, 'Léo lance 500 fois une punaise : elle tombe 180 fois sur la pointe. Estime la probabilité qu\'elle tombe sur la pointe. Les deux issues sont-elles équiprobables ?', [
    'Fréquence : ' + pr4Tex('\\dfrac{180}{500} = 0{,}36') + '. Sur un grand nombre d\'essais, on estime que la probabilité vaut environ 0,36.',
    'Les issues ne sont pas équiprobables : sinon, la fréquence serait proche de 0,5.'])}
  ${pr4Exo(8, 'Une urne contient des boules rouges et des boules bleues. La probabilité de tirer une rouge est ' + pr4Tex('\\dfrac{3}{8}') + ', et il y a 15 boules rouges. Combien y a-t-il de boules bleues ?', [
    'Les ' + pr4Tex('\\dfrac{3}{8}') + ' des boules sont rouges : ' + pr4Tex('\\dfrac{1}{8}') + ' des boules représente 15 ÷ 3 = 5 boules, donc il y a 8 × 5 = 40 boules.',
    'Il y a donc 40 − 15 = <b>25 boules bleues</b>.'])}
</div>
`;

/* ---- Méthode 1 : évènement et contraire dans l'urne ---- */
function pr4Evenement(){
  const [nom, test, contraire] = PR4_EVTS[Number(document.getElementById('pr4-evt').value)];
  const fav = Array.from({ length: 10 }, (_, i) => i + 1).filter(test), n = fav.length;
  document.getElementById('pr4-evtUrne').innerHTML = pr4Urne(fav, { contraire: true });
  const nature = n === 0 ? 'C\'est un <b>évènement impossible</b>.' : n === 10 ? 'C\'est un <b>évènement certain</b>.' : n === 1 ? 'C\'est un <b>évènement élémentaire</b> (une seule issue).' : `L'évènement est formé de ${n} issues.`;
  const lignes = [
    [`A : « ${nom} » ; A = {${fav.join(' ; ')}}`.replace('{}', '∅ (aucune issue)'), nature],
    [`Les 10 issues sont équiprobables : ${pr4Tex('P(A) = ' + pr4Fr(n, 10))}.`, `${n} issue${n > 1 ? 's' : ''} favorable${n > 1 ? 's' : ''} sur 10.`],
    [`${pr4Tex('\\overline{A}')} : « ${contraire} » ; ${pr4Tex('P(\\overline{A}) = 1 - P(A) = ' + pr4Fr(10 - n, 10))}.`, 'Les issues en orange : toutes celles qui ne sont pas dans A.'],
  ];
  const out = document.getElementById('pr4-evtRes');
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 2 : jeu de 32 cartes ---- */
const PR4_CARTES_STEPS = [
  { expr: 'Expérience : on tire une carte au hasard parmi 32.', note: 'Les cartes sont tirées au hasard : les 32 issues sont équiprobables, on peut utiliser la formule.' },
  { expr: 'C : « tirer un cœur ». ' + pr4Tex('P(C) = \\dfrac{8}{32} = \\dfrac{1}{4}'), note: 'Il y a 8 cœurs : 8 issues favorables sur 32. On simplifie.' },
  { expr: 'R : « tirer un roi ». ' + pr4Tex('P(R) = \\dfrac{4}{32} = \\dfrac{1}{8}'), note: 'Un roi dans chacune des 4 couleurs.' },
  { expr: 'F : « tirer une figure ». ' + pr4Tex('P(F) = \\dfrac{12}{32} = \\dfrac{3}{8}'), note: 'Valet, dame et roi dans chaque couleur : 3 × 4 = 12 figures.' },
  { expr: pr4Tex('\\overline{F}') + ' : « ne pas tirer une figure ». ' + pr4Tex('P(\\overline{F}) = 1 - \\dfrac{3}{8} = \\dfrac{5}{8}'), note: 'Plus rapide que de compter les 20 cartes qui ne sont pas des figures !' },
];
const pr4CartesDemo = makeStepDemo(PR4_CARTES_STEPS, 'pr4-cartesDisplay');

/* ---- Méthode 3 : simulation de tirages avec remise ---- */
let pr4Sim = null;
function pr4SimCompo(){
  const v = k => Math.max(0, Math.min(50, Math.round(Number(document.getElementById('pr4-s' + k).value) || 0)));
  return { R: v('R'), B: v('B'), V: v('V') };
}
function pr4SimReset(){ pr4Sim = { n: 0, ok: 0, pts: [] }; pr4SimDessin(); }
function pr4Simuler(nb){
  if(!pr4Sim) pr4SimReset();
  const c = pr4SimCompo(), tot = c.R + c.B + c.V, evt = document.getElementById('pr4-sEvt').value;
  if(!tot || pr4Sim.n >= 100000) return pr4SimDessin();
  for(let i = 0; i < nb; i++){
    const r = Math.random() * tot, coul = r < c.R ? 'R' : r < c.R + c.B ? 'B' : 'V';
    pr4Sim.n++; if(coul === evt) pr4Sim.ok++;
    // On garde au plus ~400 points pour la courbe (un point par tirage au début, puis de plus en plus espacés).
    if(pr4Sim.n <= 100 || pr4Sim.n % Math.ceil(pr4Sim.n / 150) === 0) pr4Sim.pts.push([pr4Sim.n, pr4Sim.ok / pr4Sim.n]);
  }
  pr4SimDessin();
}
function pr4SimDessin(){
  const svg = document.getElementById('pr4-simSvg'), res = document.getElementById('pr4-simRes'); if(!svg) return;
  const c = pr4SimCompo(), tot = c.R + c.B + c.V, evt = document.getElementById('pr4-sEvt').value, nomC = { R: 'rouge', B: 'bleue', V: 'verte' }[evt];
  const coulEvt = { R: PR4_ROUGE, B: PR4_BLEU, V: PR4_VERT }[evt];
  if(!tot){ svg.innerHTML = ''; res.innerHTML = '<span style="color:#a83c1f;">Mettez au moins une boule dans le sac.</span>'; return; }
  const p = c[evt] / tot, X0 = 50, Y0 = 210, W = 450, H = 180, nMax = Math.max(10, pr4Sim ? pr4Sim.n : 10);
  // Axe des abscisses en échelle logarithmique : on voit à la fois les premiers tirages et les milliers suivants.
  const lx = n => X0 + Math.log10(n) / Math.log10(nMax) * W, ly = f => Y0 - f * H;
  let s = `<line x1="${X0}" y1="${Y0}" x2="${X0 + W}" y2="${Y0}" stroke="${PR4_ENCRE}" stroke-width="1.4"/><line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y0 - H - 8}" stroke="${PR4_ENCRE}" stroke-width="1.4"/>`;
  for(let f = 0; f <= 1.0001; f += .25) s += `<line x1="${X0 - 4}" y1="${ly(f)}" x2="${X0 + W}" y2="${ly(f)}" stroke="#E4E7EC"/><text x="${X0 - 8}" y="${ly(f) + 4}" text-anchor="end" font-size="11" fill="#4E5665">${pr4Num(f)}</text>`;
  for(let k = 1; k <= nMax; k *= 10) s += `<line x1="${lx(k)}" y1="${Y0}" x2="${lx(k)}" y2="${Y0 + 5}" stroke="${PR4_ENCRE}"/><text x="${lx(k)}" y="${Y0 + 18}" text-anchor="middle" font-size="11" fill="#4E5665">${k.toLocaleString('fr-FR')}</text>`;
  s += `<text x="${X0 + W}" y="${Y0 + 34}" text-anchor="end" font-size="11" fill="#4E5665">nombre de tirages (échelle « par puissances de 10 »)</text>`;
  if(pr4Sim && pr4Sim.pts.length) s += `<polyline points="${pr4Sim.pts.map(([n, f]) => `${lx(n).toFixed(1)},${ly(f).toFixed(1)}`).join(' ')}" fill="none" stroke="${coulEvt}" stroke-width="2"/><circle cx="${lx(pr4Sim.n)}" cy="${ly(pr4Sim.ok / pr4Sim.n)}" r="4.5" fill="${coulEvt}"/>`;
  // Probabilité (ligne pointillée et étiquette) dessinée par-dessus la courbe, pour rester lisible.
  s += `<line x1="${X0}" y1="${ly(p)}" x2="${X0 + W}" y2="${ly(p)}" stroke="${PR4_ORANGE}" stroke-width="2" stroke-dasharray="7 5"/><text x="${X0 + W}" y="${ly(p) - 6}" text-anchor="end" font-size="12" font-weight="700" fill="${PR4_ORANGE}" stroke="#fff" stroke-width="3" paint-order="stroke">probabilité ${pr4Num(p)}</text>`;
  svg.innerHTML = s;
  const f = pr4Sim && pr4Sim.n ? pr4Sim.ok / pr4Sim.n : null;
  res.innerHTML = `Probabilité de tirer une boule ${nomC} : ${c[evt]} sur ${tot}, soit <b style="color:${PR4_ORANGE};">${pr4Num(p)}</b>.<br>` + (f == null ? 'Lancez des tirages !' : `Après <b>${pr4Sim.n.toLocaleString('fr-FR')}</b> tirage${pr4Sim.n > 1 ? 's' : ''} : ${pr4Sim.ok.toLocaleString('fr-FR')} boule${pr4Sim.ok > 1 ? 's' : ''} ${nomC}${pr4Sim.ok > 1 ? 's' : ''}, fréquence <b style="color:${coulEvt};">${pr4Num(f)}</b> (écart avec la probabilité : ${pr4Num(Math.abs(f - p))}).`);
}

/* ---- Méthode 4 : roue à secteurs inégaux ---- */
const PR4_ROUE = [['rouge', 180, PR4_ROUGE], ['bleu', 120, PR4_BLEU], ['vert', 60, PR4_VERT]];
let pr4Roue = { angle: 0, compte: { rouge: 0, bleu: 0, vert: 0 }, n: 0, raf: null, dernier: null };
function pr4RoueSecteur(a){ let d = 0; for(const [nom, ang] of PR4_ROUE){ if(a < d + ang) return nom; d += ang; } return PR4_ROUE[0][0]; }
function pr4RoueDessin(){
  const svg = document.getElementById('pr4-roueSvg'); if(!svg) return;
  const cx = 130, cy = 130, r = 105, pt = a => [cx + r * Math.sin(a * Math.PI / 180), cy - r * Math.cos(a * Math.PI / 180)];
  let d = 0, s = `<g transform="rotate(${pr4Roue.angle.toFixed(2)} ${cx} ${cy})">`;
  PR4_ROUE.forEach(([nom, ang, coul]) => {
    const [x1, y1] = pt(d), [x2, y2] = pt(d + ang), [xm, ym] = [cx + r * .6 * Math.sin((d + ang / 2) * Math.PI / 180), cy - r * .6 * Math.cos((d + ang / 2) * Math.PI / 180)];
    s += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${ang > 180 ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${coul}" fill-opacity=".85" stroke="#fff" stroke-width="2"/>`;
    s += `<text x="${xm.toFixed(1)}" y="${(ym + 5).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="#fff" transform="rotate(${-pr4Roue.angle.toFixed(2)} ${xm.toFixed(1)} ${ym.toFixed(1)})">${ang}°</text>`;
    d += ang;
  });
  s += `</g><circle cx="${cx}" cy="${cy}" r="8" fill="${PR4_ENCRE}"/><polygon points="${cx - 11},10 ${cx + 11},10 ${cx},34" fill="${PR4_ENCRE}"/>`;
  svg.innerHTML = s;
}
function pr4RoueTexte(){
  const out = document.getElementById('pr4-roueRes'), n = pr4Roue.n;
  const lignes = PR4_ROUE.map(([nom, ang, coul]) => `<tr><td style="border:1px solid #C9D6E6;padding:5px 9px;color:${coul};font-weight:700;">${nom}</td><td style="border:1px solid #C9D6E6;padding:5px 9px;">${ang}° : ${pr4Tex('\\dfrac{' + ang + '}{360} = ' + pr4Fr(ang, 360, true))}</td><td style="border:1px solid #C9D6E6;padding:5px 9px;text-align:center;">${pr4Roue.compte[nom]}</td><td style="border:1px solid #C9D6E6;padding:5px 9px;text-align:center;">${n ? pr4Num(pr4Roue.compte[nom] / n) : '–'}</td></tr>`).join('');
  out.innerHTML = (pr4Roue.dernier ? `<p style="text-align:center;margin:4px 0 8px;font-size:1.05rem;">Résultat : <b style="color:${PR4_ROUE.find(x => x[0] === pr4Roue.dernier)[2]};">${pr4Roue.dernier}</b></p>` : '')
    + `<div style="overflow-x:auto;position:relative;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.92rem;"><tr style="background:#F4F5F8;font-weight:700;"><td style="border:1px solid #C9D6E6;padding:5px 9px;">Couleur</td><td style="border:1px solid #C9D6E6;padding:5px 9px;">Probabilité</td><td style="border:1px solid #C9D6E6;padding:5px 9px;">Effectif</td><td style="border:1px solid #C9D6E6;padding:5px 9px;">Fréquence (${n} tour${n > 1 ? 's' : ''})</td></tr>${lignes}</table></div>`;
  renderStaticMath(out);
}
function pr4RoueReset(){ cancelAnimationFrame(pr4Roue.raf); pr4Roue = { angle: 0, compte: { rouge: 0, bleu: 0, vert: 0 }, n: 0, raf: null, dernier: null }; pr4RoueDessin(); pr4RoueTexte(); const b = document.getElementById('pr4-roueBtn'); if(b) b.disabled = false; }
// La couleur obtenue est celle du secteur qui s'arrête sous le pointeur (en haut) : angle de roue (360 − θ) mod 360.
const pr4SousPointeur = theta => pr4RoueSecteur(((360 - theta % 360) % 360 + 360) % 360);
function pr4Tourner(fois){
  if(fois){
    for(let i = 0; i < fois; i++){ const a = Math.random() * 360; pr4Roue.compte[pr4SousPointeur(a)]++; pr4Roue.n++; }
    pr4Roue.angle = Math.random() * 360; pr4Roue.dernier = null; pr4RoueDessin(); pr4RoueTexte(); return;
  }
  const b = document.getElementById('pr4-roueBtn'); if(b) b.disabled = true;
  cancelAnimationFrame(pr4Roue.raf);
  const depart = pr4Roue.angle, cible = depart + 3 * 360 + Math.random() * 360, t0 = performance.now(), duree = 2200;
  const f = now => {
    const t = Math.max(0, Math.min(1, (now - t0) / duree)), e = 1 - Math.pow(1 - t, 3);
    pr4Roue.angle = depart + (cible - depart) * e; pr4RoueDessin();
    if(t < 1){ pr4Roue.raf = requestAnimationFrame(f); return; }
    pr4Roue.angle = cible % 360; const res = pr4SousPointeur(pr4Roue.angle);
    pr4Roue.compte[res]++; pr4Roue.n++; pr4Roue.dernier = res; pr4RoueDessin(); pr4RoueTexte(); if(b) b.disabled = false;
  };
  pr4Roue.raf = requestAnimationFrame(f);
}

DEMO_REGISTRY['4e|Probabilités'] = {
  cours: 'cours-demo-probabilites-4e', methode: 'methode-demo-probabilites-4e', exos: 'exos-demo-probabilites-4e', histoire: 'histoire-demo-probabilites-4e',
  init: () => {
    pr4Evenement(); pr4CartesDemo.reset(); pr4SimReset(); pr4RoueReset();
    ['cours-demo-probabilites-4e', 'exos-demo-probabilites-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-probabilites-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-probabilites-4e'));
  }
};

DEMO_QUIZZES['4e|Probabilités'] = [
  { q: 'On lance un dé équilibré à 6 faces. La probabilité d\'obtenir 6 est...', opts: ['1/6', '6', '1/2'], correct: 0 },
  { q: 'Une probabilité peut valoir...', opts: ['1,5', '−0,2', '0,75'], correct: 2 },
  { q: 'Si P(A) = 0,35, alors la probabilité de l\'évènement contraire de A est...', opts: ['0,35', '0,65', '1,35'], correct: 1 },
  { q: 'La probabilité d\'un évènement impossible est...', opts: ['0', '1', 'on ne peut pas savoir'], correct: 0 },
  { q: 'Un sac contient 3 boules rouges et 2 bleues. La probabilité de tirer une bleue est...', opts: ['2/3', '2/5', '3/5'], correct: 1 },
  { q: 'On a obtenu pile 4 fois de suite avec une pièce équilibrée. Au lancer suivant...', opts: ['face a plus de chances', 'pile a plus de chances', 'il y a toujours une chance sur deux'], correct: 2 },
  { q: 'On lance 10 000 fois un dé équilibré. La fréquence d\'apparition du 3 est proche de...', opts: ['1/3', '1/6', '3/6'], correct: 1 },
];

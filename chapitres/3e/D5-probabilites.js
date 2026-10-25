/* ============================================================
   CHAPITRE : Probabilités (3e, D5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 138-139) : plan du manuel (langage : expérience aléatoire, issues,
   évènements ; calculs : probabilité, équiprobabilité, évènements contraires ; des fréquences aux
   probabilités), titres reformulés, exemples nouveaux (différents du manuel -- le dé -- ET du D3 de
   4e, chapitres/4e/D3-probabilites.js -- l'urne de 10 boules --, qui suit le même plan). Ajout pour
   la 3e (classique au brevet), en méthode et en exercices : les expériences à deux épreuves
   (tableau à double entrée, arbre), le jeu équitable.
   Méthode animée : un sac de billes à composer (probabilités et tirage), deux dés (tableau des
   36 issues et simulation des sommes), un arbre qui se construit, un jeu équitable ou non.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const PB3_BLEU = '#0C5BA0', PB3_ROUGE = '#C0392B', PB3_VERT = '#1E7B34', PB3_ORANGE = '#E07B00', PB3_ENCRE = '#1C1B2E';
const pb3Tex = s => `<span class="tex">${s}</span>`;
const pb3Pgcd = (a, b) => b ? pb3Pgcd(b, a % b) : a;
// Fraction a/b simplifiée (texte KaTeX), avec l'étape de simplification si besoin.
function pb3Frac(a, b, etape){
  if(b === 0) return '0';
  const g = pb3Pgcd(a, b), A = a / g, B = b / g;
  const f = (x, y) => y === 1 ? String(x) : `\\dfrac{${x}}{${y}}`;
  return g > 1 && etape !== false ? `${f(a, b)} = ${f(A, B)}` : f(A, B);
}
function pb3Tab(lignes, o){
  o = o || {};
  return `<div style="overflow-x:auto;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:${o.taille || '.92rem'};">${lignes.map((l, i) => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:${o.pad || '5px 10px'};text-align:center;white-space:nowrap;${(j === 0 && o.col !== false) || (i === 0 && o.lig) ? 'background:#F4F5F8;font-weight:700;' : ''}${typeof o.fond === 'function' ? o.fond(i, j) : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Roue de loterie à 8 secteurs identiques, numérotés de 1 à 8.
function pb3Roue(){
  const cx = 90, cy = 90, r = 78, coul = ['#5DADE2', '#F5B041', '#58D68D', '#EC7063', '#AF7AC5', '#F7DC6F', '#48C9B0', '#EB984E'];
  let h = '';
  for(let i = 0; i < 8; i++){ const a0 = -Math.PI / 2 + i * Math.PI / 4, a1 = a0 + Math.PI / 4, am = (a0 + a1) / 2;
    h += `<path d="M${cx},${cy} L${(cx + r * Math.cos(a0)).toFixed(1)},${(cy + r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)},${(cy + r * Math.sin(a1)).toFixed(1)} Z" fill="${coul[i]}" stroke="#fff" stroke-width="2"/>`
      + `<text x="${(cx + r * .64 * Math.cos(am)).toFixed(1)}" y="${(cy + r * .64 * Math.sin(am) + 6).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="700" fill="${PB3_ENCRE}">${i + 1}</text>`; }
  return `<svg viewBox="0 0 180 196" style="width:150px;flex:none;">${h}<circle cx="${cx}" cy="${cy}" r="7" fill="${PB3_ENCRE}"/><path d="M${cx - 8},4 L${cx + 8},4 L${cx},18 Z" fill="${PB3_ENCRE}"/></svg>`;
}

document.getElementById('cours-demo-probabilites-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le langage des probabilités</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Expérience aléatoire</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Une <b>expérience aléatoire</b> est une expérience qui dépend du hasard, dont on peut décrire tous les résultats possibles, mais sans savoir lequel va se produire.</li>
  <li>Chaque résultat possible est une <b>issue</b>.</li></ul></div>
<div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap;">
  ${pb3Roue()}
  <div style="flex:1 1 260px;"><p class="example-title">Exemple : on fait tourner une roue de loterie partagée en 8 secteurs identiques, numérotés de 1 à 8, et on lit le numéro indiqué par la flèche.</p>
  <ul class="example-list"><li>C'est une <b>expérience aléatoire</b> qui a huit issues : {1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8}.</li></ul></div>
</div>

<div class="sub-header"><span class="letter">B</span><h4>Les évènements</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un <b>évènement</b> est un ensemble d'une ou plusieurs issues.</li>
  <li>Un évènement constitué d'une seule issue est un <b>évènement élémentaire</b>.</li>
  <li>Un évènement toujours réalisé est un <b>évènement certain</b> ; un évènement jamais réalisé est un <b>évènement impossible</b>.</li>
  <li>L'<b>évènement contraire</b> d'un évènement A, noté ${pb3Tex('\\overline{A}')}, est l'ensemble des issues qui n'appartiennent pas à A.</li></ul></div>
<p class="example-title">Exemple : on reprend la roue.</p>
<ul class="example-list">
  <li>A : « Obtenir un nombre pair » = {2 ; 4 ; 6 ; 8} est un <b>évènement</b>.</li>
  <li>B : « Obtenir 5 » est un <b>évènement élémentaire</b>.</li>
  <li>C : « Obtenir un nombre inférieur ou égal à 8 » est un <b>évènement certain</b> ; D : « Obtenir 9 » est un <b>évènement impossible</b>.</li>
  <li>${pb3Tex('\\overline{A}')} : « Obtenir un nombre impair » = {1 ; 3 ; 5 ; 7} est l'<b>évènement contraire</b> de A.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Calculer des probabilités</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La probabilité d'un évènement</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>probabilité</b> d'un évènement A est un nombre compris <b>entre 0 et 1</b>, noté P(A), qui exprime ses « chances » de se réaliser.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>La probabilité d'un évènement impossible est 0 ; celle d'un évènement certain est 1.</li>
  <li>La somme des probabilités de toutes les issues d'une expérience aléatoire est égale à 1.</li></ul></div>
<p class="example-title">Exemples, avec la roue : P(C) = 1 et P(D) = 0 ; P(« 1 ») + P(« 2 ») + … + P(« 8 ») = 1.</p>

<div class="sub-header"><span class="letter">B</span><h4>Quand toutes les issues ont les mêmes chances : l'équiprobabilité</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Lorsque les issues d'une expérience aléatoire ont toutes <b>autant de chances</b> de se réaliser, c'est-à-dire que leurs probabilités sont égales, on dit qu'elles sont <b>équiprobables</b>.</div>
<span class="prop-badge">Propriété</span>
<div class="def-box">En cas d'équiprobabilité, la probabilité d'un évènement E s'obtient en divisant le nombre d'issues favorables à E par le nombre total d'issues :
  <div style="text-align:center;margin:8px 0 2px;">${pb3Tex('P(E) = \\dfrac{\\text{nombre d\'issues favorables à } E}{\\text{nombre total d\'issues}}')}</div></div>
<p class="example-title">Exemples, avec la roue (secteurs identiques : les 8 issues sont équiprobables) :</p>
<ul class="example-list">
  <li>Chaque issue a une probabilité de ${pb3Tex('\\dfrac{1}{8}')} : P(B) = ${pb3Tex('\\dfrac{1}{8}')}.</li>
  <li>A = {2 ; 4 ; 6 ; 8} : 4 issues favorables sur 8, donc ${pb3Tex('P(A) = \\dfrac{4}{8} = \\dfrac{1}{2}')}.</li>
  <li>E : « Obtenir un multiple de 3 » = {3 ; 6}, donc ${pb3Tex('P(E) = \\dfrac{2}{8} = \\dfrac{1}{4}')}.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : une probabilité s'écrit souvent sous la forme d'une <b>fraction</b> (irréductible si possible), mais aussi d'un nombre décimal ou d'un pourcentage : ${pb3Tex('\\dfrac{1}{4} = 0{,}25 = 25\\,\\%')}.</div>

<div class="sub-header"><span class="letter">C</span><h4>La probabilité d'un évènement contraire</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La somme des probabilités d'un évènement A et de son contraire ${pb3Tex('\\overline{A}')} est égale à 1 :
  <div style="text-align:center;margin:8px 0 2px;">${pb3Tex('P(A) + P(\\overline{A}) = 1')} &nbsp;&nbsp; et &nbsp;&nbsp; ${pb3Tex('P(\\overline{A}) = 1 - P(A)')}</div></div>
<p class="example-title">Exemple : E : « Obtenir un multiple de 3 », avec ${pb3Tex('P(E) = \\dfrac{1}{4}')}.</p>
<ul class="example-list">
  <li>En comptant : ${pb3Tex('\\overline{E}')} = {1 ; 2 ; 4 ; 5 ; 7 ; 8}, donc ${pb3Tex('P(\\overline{E}) = \\dfrac{6}{8} = \\dfrac{3}{4}')}.</li>
  <li>Avec la formule, plus rapide : ${pb3Tex('P(\\overline{E}) = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}')}.</li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>Des fréquences aux probabilités</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Lorsqu'on répète un très grand nombre de fois une expérience aléatoire, la <b>fréquence</b> de réalisation d'un évènement E finit par se <b>stabiliser</b> autour de sa probabilité P(E).</div>
<p class="example-title">Exemple : on a fait tourner la roue un grand nombre de fois et relevé la fréquence de l'évènement B : « Obtenir 5 ».</p>
${pb3Tab([['Nombre de tours de roue', 10, 50, 200, '1 000', '10 000'], ['Fréquence de B', '0,2', '0,08', '0,135', '0,119', '0,1256']])}
<ul class="example-list"><li>Plus le nombre de tours est grand, plus la fréquence de B se rapproche de ${pb3Tex('P(B) = \\dfrac{1}{8} = 0{,}125')}.</li></ul>
<div class="redaction-note" ${R4_REM}>Remarque : un tableur ou un programme (Scratch, Python…) permet de <b>simuler</b> des milliers d'expériences en quelques secondes (onglet Méthode).</div>
`;

document.getElementById('histoire-demo-probabilites-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  En 1654, le chevalier de <b>Méré</b>, grand amateur de jeux de dés, pose une question à son ami <b>Blaise Pascal</b> : en lançant <b>deux dés</b> 24 fois de suite, a-t-on plus d'une chance sur deux d'obtenir au moins un « double six » ? Il avait perdu de l'argent en pariant que oui ! Pascal en discute par lettres avec <b>Pierre de Fermat</b>, et les deux mathématiciens mettent au point, au fil de leur correspondance, les premières méthodes de calcul des probabilités, en comptant soigneusement toutes les issues possibles. (La réponse est non : la probabilité est d'environ 0,49.) Quelques années plus tard, le Néerlandais <b>Christiaan Huygens</b> publie le premier livre consacré au calcul des chances dans les jeux de hasard (1657).
</div>
`;

document.getElementById('methode-demo-probabilites-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : un sac de billes à composer</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez le nombre de billes de chaque couleur (les billes sont indiscernables au toucher : chacune a la même chance d'être tirée). Les probabilités se calculent, puis tirez une bille au hasard.</p>
  <svg id="pb3-sacSvg" viewBox="0 0 300 200" style="width:100%;max-width:300px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;align-items:center;max-width:420px;margin:0 auto;">
    ${[['rouge', PB3_ROUGE, 5], ['bleue', PB3_BLEU, 3], ['verte', PB3_VERT, 2]].map(([n, c, v]) => `<label for="pb3-s${n}" style="font-weight:700;color:${c};">${n[0].toUpperCase() + n.slice(1)}s</label><input id="pb3-s${n}" type="range" min="0" max="10" value="${v}" oninput="pb3SacMaj()"><span id="pb3-s${n}V" style="font-family:'JetBrains Mono',monospace;"></span>`).join('')}
  </div>
  <div id="pb3-sacInfo" style="text-align:center;margin:10px 0 4px;line-height:2.4;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="pb3SacTirer()"><span class="gicon">casino</span> Tirer une bille</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : lancer deux dés (tableau à double entrée et simulation)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On lance deux dés équilibrés et on fait la somme. Le tableau donne les 36 issues équiprobables (dé 1, dé 2) : les sommes ne sont <b>pas</b> équiprobables ! Simulez des lancers et comparez les fréquences aux probabilités.</p>
  ${pb3Tab([['+', 1, 2, 3, 4, 5, 6], ...[1, 2, 3, 4, 5, 6].map(a => [a, ...[1, 2, 3, 4, 5, 6].map(b => a + b)])], { lig: true, pad: '4px 9px', fond: (i, j) => i > 0 && j > 0 && i + j === 7 ? 'background:rgba(224,123,0,.22);font-weight:700;' : '' })}
  <p class="hint" style="text-align:center;margin:-6px 0 8px;">La somme 7 apparaît dans 6 cases sur 36 : P(« somme 7 ») = 6/36 = 1/6. La somme 2 dans une seule : 1/36.</p>
  <svg id="pb3-desSvg" viewBox="0 0 480 230" style="width:100%;max-width:490px;display:block;margin:8px auto;"></svg>
  <div id="pb3-desInfo" style="text-align:center;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pb3DesLancer(10)">+ 10 lancers</button>
    <button class="btn" onclick="pb3DesLancer(100)">+ 100 lancers</button>
    <button class="btn" onclick="pb3DesLancer(1000)">+ 1 000 lancers</button>
    <button class="btn secondary" onclick="pb3DesReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : une expérience à deux épreuves, avec un arbre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On lance deux fois de suite une pièce équilibrée (P : pile, F : face). Quelle est la probabilité d'obtenir au moins une fois face ? Cliquez sur « Étape suivante ».</p>
  <svg id="pb3-arbreSvg" viewBox="0 0 440 220" style="width:100%;max-width:440px;display:block;margin:8px auto;"></svg>
  <div id="pb3-arbreNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pb3ArbreSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="pb3ArbreReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : ce jeu est-il équitable ?</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Inès et Tom lancent deux dés. Inès gagne si la somme est 6, 7 ou 8 ; sinon, c'est Tom qui gagne. Le jeu est-il équitable ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="pb3-jeuDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pb3JeuDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pb3JeuDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function pb3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pb3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pb3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-probabilites-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une probabilité en situation d'équiprobabilité »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Les 10 billes sont indiscernables : les 10 issues sont équiprobables.</span><span class="we-comment">1. On justifie l'équiprobabilité.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Il y a 3 billes bleues : 3 issues favorables sur 10.</span><span class="we-comment">2. On compte les issues favorables et le total.</span></div>
    <div class="we-row"><span class="we-expr">${pb3Tex('P(\\text{« bleue »}) = \\dfrac{3}{10} = 0{,}3')}</span><span class="we-comment">3. On écrit la probabilité.</span></div>
    <div class="we-row"><span class="we-expr">${pb3Tex('P(\\text{« pas bleue »}) = 1 - 0{,}3 = 0{,}7')}</span><span class="we-comment">4. Pour le contraire : 1 − P.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pb3Exo(1, 'Un sac contient 5 billes rouges, 3 bleues et 2 vertes, indiscernables au toucher. On tire une bille au hasard. Calcule la probabilité de tirer : a) une bille rouge ; b) une bille bleue ; c) une bille qui n\'est pas verte.', [
    'Il y a 10 billes, toutes avec la même chance d\'être tirées.', 'a) ' + pb3Tex('\\dfrac{5}{10} = \\dfrac{1}{2}') + ' ; b) ' + pb3Tex('\\dfrac{3}{10}'), 'c) ' + pb3Tex('1 - \\dfrac{2}{10} = \\dfrac{8}{10} = \\dfrac{4}{5}')])}
  ${pb3Exo(2, 'On tire une carte au hasard dans un jeu de 32 cartes (4 couleurs : cœur, carreau, trèfle, pique ; 8 cartes par couleur, dont un roi). Calcule la probabilité de tirer : a) un roi ; b) un cœur ; c) le roi de cœur ; d) une carte qui n\'est pas un cœur.', [
    'a) ' + pb3Tex('\\dfrac{4}{32} = \\dfrac{1}{8}') + ' ; b) ' + pb3Tex('\\dfrac{8}{32} = \\dfrac{1}{4}'), 'c) ' + pb3Tex('\\dfrac{1}{32}') + ' ; d) ' + pb3Tex('1 - \\dfrac{1}{4} = \\dfrac{3}{4}')])}
  ${pb3Exo(3, 'On lance un dé équilibré à 12 faces numérotées de 1 à 12. Donne un exemple d\'évènement certain, d\'évènement impossible et d\'évènement élémentaire. Calcule la probabilité de l\'évènement « obtenir un nombre premier ».', [
    'Certain : « obtenir un nombre inférieur à 13 » ; impossible : « obtenir 0 » ; élémentaire : « obtenir 7 ».',
    'Nombres premiers entre 1 et 12 : 2, 3, 5, 7, 11 : 5 issues favorables sur 12, donc la probabilité est ' + pb3Tex('\\dfrac{5}{12}') + '.'])}
  ${pb3Exo(4, 'La météo annonce une probabilité de pluie de 35 % pour demain. Quelle est la probabilité qu\'il ne pleuve pas ?', [
    'L\'évènement « il ne pleut pas » est le contraire de « il pleut » : 1 − 0,35 = 0,65, soit 65 %.'])}
  ${pb3Exo(5, 'Une roue est partagée en trois secteurs : un rouge de 180°, un bleu de 120° et un vert de 60°. Les issues « rouge », « bleu », « vert » sont-elles équiprobables ? Calcule leurs probabilités.', [
    'Non : les secteurs n\'ont pas la même taille.', 'Probabilités proportionnelles aux angles : rouge ' + pb3Tex('\\dfrac{180}{360} = \\dfrac{1}{2}') + ' ; bleu ' + pb3Tex('\\dfrac{120}{360} = \\dfrac{1}{3}') + ' ; vert ' + pb3Tex('\\dfrac{60}{360} = \\dfrac{1}{6}') + '.',
    'Vérification : ' + pb3Tex('\\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{6} = 1') + '.'])}
  ${pb3Exo(6, 'Lina lance une pièce 20 fois et obtient 13 fois pile. Elle affirme : « la pièce est truquée, car la fréquence de pile est 0,65 et non 0,5 ». A-t-elle raison ?', [
    'La fréquence de pile est bien ' + pb3Tex('\\dfrac{13}{20} = 0{,}65') + '.', 'Mais 20 lancers, c\'est très peu : la fréquence ne se stabilise autour de la probabilité que sur un très grand nombre de lancers. On ne peut pas conclure : il faudrait lancer la pièce des milliers de fois.'])}
  ${pb3Exo(7, 'On lance deux dés équilibrés et on calcule la somme des deux faces. En t\'aidant du tableau à double entrée (Méthode 2), calcule la probabilité d\'obtenir : a) une somme égale à 7 ; b) une somme égale à 12 ; c) une somme supérieure ou égale à 10.', [
    'Il y a 6 × 6 = 36 issues équiprobables.', 'a) La somme 7 apparaît 6 fois : ' + pb3Tex('\\dfrac{6}{36} = \\dfrac{1}{6}') + ' ; b) la somme 12 une seule fois : ' + pb3Tex('\\dfrac{1}{36}'),
    'c) Sommes 10, 11 et 12 : 3 + 2 + 1 = 6 cases, donc ' + pb3Tex('\\dfrac{6}{36} = \\dfrac{1}{6}') + '.'])}
  ${pb3Exo(8, 'On lance deux fois de suite une pièce équilibrée. Construis un arbre et calcule la probabilité d\'obtenir : a) deux fois pile ; b) au moins une fois face ; c) deux résultats différents.', [
    'Les 4 issues équiprobables sont PP, PF, FP et FF.', 'a) ' + pb3Tex('P(PP) = \\dfrac{1}{4}') + ' ; b) c\'est le contraire de « PP » : ' + pb3Tex('1 - \\dfrac{1}{4} = \\dfrac{3}{4}'),
    'c) PF et FP : ' + pb3Tex('\\dfrac{2}{4} = \\dfrac{1}{2}') + '.'])}
  ${pb3Exo(9, 'Léo et Sam lancent deux dés. Léo gagne si la somme est paire, Sam si elle est impaire. Le jeu est-il équitable ?', [
    'Dans le tableau des 36 issues, on compte 18 sommes paires et 18 sommes impaires.', 'P(« Léo gagne ») = P(« Sam gagne ») = ' + pb3Tex('\\dfrac{18}{36} = \\dfrac{1}{2}') + ' : le jeu est équitable.'])}
</div>
`;

/* ---- Méthode 1 : le sac ---- */
const PB3_SAC_C = { rouge: PB3_ROUGE, bleue: PB3_BLEU, verte: PB3_VERT };
let pb3SacTire = -1;
function pb3SacLire(){ return ['rouge', 'bleue', 'verte'].map(n => [n, Number(document.getElementById('pb3-s' + n).value)]); }
function pb3SacMaj(tirage){
  const l = pb3SacLire(), N = l.reduce((t, [, v]) => t + v, 0);
  l.forEach(([n, v]) => { document.getElementById('pb3-s' + n + 'V').textContent = v; });
  if(tirage === undefined) pb3SacTire = -1;
  const svg = document.getElementById('pb3-sacSvg');
  let h = `<path d="M60,40 Q40,190 150,192 Q260,190 240,40 Q200,58 150,50 Q100,58 60,40 Z" fill="#F3E3C3" stroke="#A67C52" stroke-width="3"/><path d="M60,40 Q150,20 240,40" fill="none" stroke="#A67C52" stroke-width="3"/>`;
  let i = 0;
  l.forEach(([n, v]) => { for(let k = 0; k < v; k++, i++){ const x = 92 + (i % 6) * 23, y = 170 - Math.floor(i / 6) * 22;
    h += `<circle cx="${x}" cy="${y}" r="10" fill="${PB3_SAC_C[n]}" stroke="${i === pb3SacTire ? '#FFD400' : '#fff'}" stroke-width="${i === pb3SacTire ? 4 : 1.5}"/>`; } });
  svg.innerHTML = h;
  const info = document.getElementById('pb3-sacInfo');
  if(!N){ info.innerHTML = '<span class="hint" style="margin:0;">Le sac est vide : mettez au moins une bille.</span>'; return; }
  info.innerHTML = l.map(([n, v]) => `<span style="color:${PB3_SAC_C[n]};font-weight:700;">P(« ${n} »)</span> = ${pb3Tex(`\\dfrac{${v}}{${N}}${pb3Pgcd(v, N) > 1 && v ? ' = ' + pb3Frac(v, N, false) : ''}`)}`).join(' &nbsp;&nbsp; ')
    + `<br>P(« pas ${l[0][0]} ») = ${pb3Tex(`1 - ${pb3Frac(l[0][1], N, false)} = ${pb3Frac(N - l[0][1], N, false)}`)}`
    + (tirage ? `<br><b>Bille tirée : <span style="color:${PB3_SAC_C[tirage]};">${tirage}</span></b> (entourée en jaune)` : '');
  renderStaticMath(info);
}
function pb3SacTirer(){
  const l = pb3SacLire(), N = l.reduce((t, [, v]) => t + v, 0); if(!N) return;
  pb3SacTire = Math.floor(Math.random() * N);
  let c = pb3SacTire, coul = null; for(const [n, v] of l){ if(c < v){ coul = n; break; } c -= v; }
  pb3SacMaj(coul);
}

/* ---- Méthode 2 : deux dés ---- */
let pb3Des = new Array(13).fill(0), pb3DesN = 0;
function pb3DesDessin(){
  const svg = document.getElementById('pb3-desSvg'); if(!svg) return;
  const W = 480, H = 230, g = 40, b = 30, max = 0.2, x = s => g + (s - 2) * (W - g - 10) / 11 + 4, bw = (W - g - 10) / 11 - 8, y = v => H - b - v / max * (H - b - 14);
  let h = '';
  for(let v = 0; v <= max + 1e-9; v += 0.05) h += `<line x1="${g}" y1="${y(v)}" x2="${W - 10}" y2="${y(v)}" stroke="#E1E5EB"/><text x="${g - 4}" y="${y(v) + 4}" text-anchor="end" font-size="10">${String(Math.round(v * 100) / 100).replace('.', ',')}</text>`;
  for(let s = 2; s <= 12; s++){
    const p = (6 - Math.abs(s - 7)) / 36, f = pb3DesN ? pb3Des[s] / pb3DesN : 0;
    h += `<rect x="${x(s)}" y="${y(f)}" width="${bw}" height="${y(0) - y(f)}" fill="rgba(12,91,160,.35)"/>`
      + `<line x1="${x(s) - 2}" y1="${y(p)}" x2="${x(s) + bw + 2}" y2="${y(p)}" stroke="${PB3_ORANGE}" stroke-width="3"/>`
      + `<text x="${x(s) + bw / 2}" y="${H - b + 15}" text-anchor="middle" font-size="11">${s}</text>`;
  }
  h += `<line x1="${g}" y1="${H - b}" x2="${W - 10}" y2="${H - b}" stroke="${PB3_ENCRE}"/>`;
  svg.innerHTML = h;
  document.getElementById('pb3-desInfo').innerHTML = `<b>${pb3DesN.toLocaleString('fr-FR')}</b> lancers. Barres bleues : fréquences observées ; traits orange : probabilités (sur 36). ${pb3DesN ? `Fréquence de la somme 7 : <b>${String(Math.round(pb3Des[7] / pb3DesN * 1000) / 1000).replace('.', ',')}</b> (probabilité 1/6 ≈ 0,167).` : ''}`;
}
function pb3DesLancer(n){ for(let i = 0; i < n; i++){ const s = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6); pb3Des[s]++; } pb3DesN += n; pb3DesDessin(); }
function pb3DesReset(){ pb3Des = new Array(13).fill(0); pb3DesN = 0; pb3DesDessin(); }

/* ---- Méthode 3 : arbre ---- */
const PB3_ARBRE_NOTES = [
  'Premier lancer : deux issues équiprobables, P ou F.',
  'Deuxième lancer : pour chacune, encore deux issues, P ou F.',
  'On lit les 4 issues au bout des branches : PP, PF, FP, FF. Elles sont équiprobables (probabilité 1/4 chacune).',
  '« Au moins une fois face » : PF, FP et FF, soit 3 issues sur 4. P = 3/4.',
  'Autre façon : c\'est le contraire de « deux fois pile » (PP) : P = 1 − 1/4 = 3/4.',
];
let pb3AK = 0;
function pb3ArbreDessin(k){
  const svg = document.getElementById('pb3-arbreSvg'); if(!svg) return;
  const R = [30, 110], N1 = [[150, 55], [150, 165]], N2 = [[280, 25], [280, 85], [280, 135], [280, 195]], txt = ['P', 'F'];
  const issues = ['PP', 'PF', 'FP', 'FF'], fav = k >= 3 ? [false, true, true, true] : [false, false, false, false];
  const br = (A, B, t, c) => `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0] - 14}" y2="${B[1]}" stroke="${c || PB3_ENCRE}" stroke-width="1.8"/><text x="${(A[0] + B[0]) / 2 - 4}" y="${(A[1] + B[1]) / 2 - 6}" font-size="11" fill="#6B7280">1/2</text><circle cx="${B[0]}" cy="${B[1]}" r="13" fill="#fff" stroke="${c || PB3_ENCRE}" stroke-width="1.5"/><text x="${B[0]}" y="${B[1] + 5}" text-anchor="middle" font-weight="700">${t}</text>`;
  let h = `<circle cx="${R[0]}" cy="${R[1]}" r="4" fill="${PB3_ENCRE}"/><text x="150" y="215" text-anchor="middle" font-size="11" fill="#6B7280">1er lancer</text>` + (k >= 1 ? `<text x="280" y="215" text-anchor="middle" font-size="11" fill="#6B7280">2e lancer</text>` : '');
  N1.forEach((n, i) => { h += br(R, n, txt[i]); });
  if(k >= 1) N2.forEach((n, j) => { h += br(N1[j >> 1], n, txt[j % 2], fav[j] ? PB3_ORANGE : null); });
  if(k >= 2) N2.forEach((n, j) => { h += `<text x="${n[0] + 30}" y="${n[1] + 5}" font-family="JetBrains Mono" font-weight="700" fill="${fav[j] ? PB3_ORANGE : PB3_ENCRE}">${issues[j]}</text><text x="${n[0] + 75}" y="${n[1] + 5}" font-size="12" fill="#6B7280">1/4</text>`; });
  svg.innerHTML = h;
  document.getElementById('pb3-arbreNote').textContent = PB3_ARBRE_NOTES[k];
}
function pb3ArbreSuivant(){ if(pb3AK < PB3_ARBRE_NOTES.length - 1) pb3AK++; pb3ArbreDessin(pb3AK); }
function pb3ArbreReset(){ pb3AK = 0; pb3ArbreDessin(0); }

/* ---- Méthode 4 : jeu équitable ---- */
const PB3_JEU_STEPS = [
  { expr: 'Il y a 6 × 6 = 36 issues équiprobables.', note: 'Chaque case du tableau à double entrée (Méthode 2) est une issue.' },
  { expr: 'Somme 6 : 5 cases ; somme 7 : 6 cases ; somme 8 : 5 cases.', note: 'On compte dans le tableau.' },
  { expr: 'P(« Inès gagne ») = ' + pb3Tex('\\dfrac{5 + 6 + 5}{36} = \\dfrac{16}{36} = \\dfrac{4}{9}'), note: '16 issues favorables à Inès.' },
  { expr: 'P(« Tom gagne ») = ' + pb3Tex('1 - \\dfrac{4}{9} = \\dfrac{5}{9}'), note: 'Évènement contraire.' },
  { expr: pb3Tex('\\dfrac{5}{9} > \\dfrac{4}{9}') + ' : le jeu n\'est pas équitable, il avantage Tom.', note: 'Même si Inès a « les sommes du milieu », les plus fréquentes, elle n\'en a que 3 sur 11 possibles.' },
];
const pb3JeuDemo = makeStepDemo(PB3_JEU_STEPS, 'pb3-jeuDisplay');

DEMO_REGISTRY['3e|Probabilités'] = {
  cours: 'cours-demo-probabilites-3e', methode: 'methode-demo-probabilites-3e', exos: 'exos-demo-probabilites-3e', histoire: 'histoire-demo-probabilites-3e',
  init: () => {
    pb3SacMaj(); pb3DesReset(); pb3ArbreReset(); pb3JeuDemo.reset();
    ['cours-demo-probabilites-3e', 'methode-demo-probabilites-3e', 'exos-demo-probabilites-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-probabilites-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-probabilites-3e'));
  }
};

DEMO_QUIZZES['3e|Probabilités'] = [
  { q: 'On fait tourner une roue à 8 secteurs identiques numérotés de 1 à 8. « Obtenir 9 » est un évènement...', opts: ['certain', 'impossible', 'élémentaire'], correct: 1 },
  { q: 'Une probabilité est toujours...', opts: ['comprise entre 0 et 1', 'supérieure à 1', 'un nombre entier'], correct: 0 },
  { q: 'Avec la même roue, P(« obtenir un nombre pair ») =', opts: ['1/2', '1/4', '4'], correct: 0 },
  { q: 'Si P(A) = 0,3, alors P(Ā) =', opts: ['0,3', '0,7', '−0,3'], correct: 1 },
  { q: 'Un sac contient 2 billes rouges et 6 bleues. P(« rouge ») =', opts: ['1/3', '1/4', '2/6'], correct: 1 },
  { q: 'On lance deux dés. Combien y a-t-il d\'issues (dé 1, dé 2) ?', opts: ['12', '36', '11'], correct: 1 },
  { q: 'Sur un très grand nombre de lancers d\'une pièce équilibrée, la fréquence de pile...', opts: ['vaut exactement 0,5', 'se rapproche de 0,5', 'devient 1'], correct: 1 },
];

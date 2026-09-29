/* ============================================================
   CHAPITRE : Statistiques (4e, D2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Statistiques en 4e." (capture du manuel p. 138 : moyenne pondérée, médiane). Plan du
   manuel, titres reformulés, exemples nouveaux. Utilise r4Ex / R4_REM / R4_BLEU de
   chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const ST4_BLEU = '#0C5BA0', ST4_ORANGE = '#E07B00', ST4_VERT = '#1E7B34', ST4_ENCRE = '#1C1B2E';
const st4Num = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
// Valeur arrondie à d décimales, précédée de « ≈ » si l'arrondi change la valeur.
const st4Arr = (v, d) => { const r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); return (Math.abs(r - v) > 1e-9 ? '≈ ' : '= ') + String(r).replace('.', ','); };
const st4Tex = s => `<span class="tex">${s}</span>`;
// Longue formule : défile horizontalement sur téléphone au lieu de dépasser de la page.
const st4Long = s => `<span style="display:block;max-width:100%;overflow-x:auto;overflow-y:hidden;position:relative;padding:2px 0;white-space:nowrap;">${st4Tex(s)}</span>`;
// Tableau statistique : première colonne = en-têtes de ligne ; défile horizontalement sur téléphone.
function st4Tab(lignes, surligne){
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.93rem;">${lignes.map((l, i) => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:6px 11px;text-align:center;white-space:nowrap;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}${surligne === i && j ? 'background:#EAF5EC;color:' + ST4_VERT + ';font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
const st4Puces = v => `<div style="display:flex;flex-wrap:wrap;gap:5px;justify-content:center;margin:8px 0 12px;">${v.map(x => `<span style="min-width:30px;text-align:center;padding:4px 6px;border-radius:6px;background:#E8F1FA;font-family:'JetBrains Mono',monospace;">${String(x).replace('.', ',')}</span>`).join('')}</div>`;

// Série rangée d'effectif pair, coupée en deux lignes : les N/2 plus petites valeurs, puis les N/2 plus
// grandes ; les deux valeurs centrales (dernière de la 1re ligne, première de la 2de) sont en vert.
function st4Moities(tri){
  const m = tri.length / 2, puce = (v, fond, coul) => `<span style="width:24px;text-align:center;padding:3px 0;border-radius:5px;background:${fond};color:${coul};font-weight:${coul === '#fff' ? 700 : 400};">${v}</span>`;
  const ligne = (vals, debut, fond, coul, txt) => `<div style="margin:3px 0;"><div style="font-size:.8rem;color:${coul};font-weight:700;margin-bottom:2px;">${txt}</div><div style="display:flex;flex-wrap:wrap;gap:3px;font-family:'JetBrains Mono',monospace;font-size:.9rem;">${vals.map((v, i) => (debut + i === m - 1 || debut + i === m) ? puce(v, ST4_VERT, '#fff') : puce(v, fond, ST4_ENCRE)).join('')}</div></div>`;
  return `<div style="display:flex;flex-direction:column;align-items:center;margin:4px 0 10px;"><div>${ligne(tri.slice(0, m), 0, '#E8F1FA', ST4_BLEU, `les ${m} plus petites valeurs (1re à ${m}e)`)}${ligne(tri.slice(m), m, '#FDF0E1', ST4_ORANGE, `les ${m} plus grandes valeurs (${m + 1}e à ${2 * m}e)`)}</div></div>`;
}
// Livres lus pendant l'été par les 24 élèves de 4e A (relevé dans l'ordre des réponses).
const ST4_LIVRES = [3, 1, 4, 2, 0, 5, 2, 3, 1, 6, 2, 4, 2, 5, 1, 3, 0, 2, 4, 1, 5, 2, 4, 3];
const ST4_LIVRES_TAB = [[0, 2], [1, 4], [2, 6], [3, 4], [4, 4], [5, 3], [6, 1]];
// Temps (en s) de 9 nageurs au 50 m nage libre.
const ST4_TEMPS = [38, 41, 35, 44, 39, 36, 47, 40, 42];
const ST4_MED_VB = '0 0 560 204'; // figure de la méthode 2 (médiane animée)

document.getElementById('cours-demo-statistiques-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>La moyenne pondérée</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">On considère une série statistique donnée par un tableau des effectifs :
  ${st4Tab([['Valeur du caractère', st4Tex('x_1'), st4Tex('x_2'), st4Tex('x_3'), '…', st4Tex('x_p')], ['Effectif', st4Tex('n_1'), st4Tex('n_2'), st4Tex('n_3'), '…', st4Tex('n_p')]])}
  <p style="margin:4px 0;">L'<b>effectif total</b> est :</p>
  <div style="overflow-x:auto;overflow-y:hidden;white-space:nowrap;position:relative;text-align:center;margin:2px 0 8px;">${st4Tex('N = n_1 + n_2 + n_3 + \\ldots + n_p')}</div>
  <p style="margin:4px 0;">La <b>moyenne</b> de la série est :</p>
  <div style="overflow-x:auto;overflow-y:hidden;white-space:nowrap;position:relative;text-align:center;margin:2px 0 8px;padding:2px 0;">${st4Tex('M = \\dfrac{n_1 \\times x_1 + n_2 \\times x_2 + \\ldots + n_p \\times x_p}{N}')}</div>
  On dit que c'est une moyenne <b>pondérée</b> : chaque valeur « pèse » autant de fois que son effectif.
</div>
<p class="example-title">Exemple : on a demandé aux 24 élèves de la 4e A combien de livres ils ont lus pendant l'été. Voici leurs réponses :</p>
${st4Puces(ST4_LIVRES)}
<ul class="example-list">
  <li>La <b>population</b> étudiée est constituée des élèves de 4e A.</li>
  <li>Le <b>caractère</b> étudié est le nombre de livres lus : c'est un <b>caractère quantitatif</b> (ses valeurs sont des nombres).</li>
  <li>L'<b>effectif total</b> est 24.</li>
</ul>
<p style="margin:6px 0;">On regroupe les réponses dans un tableau des effectifs, puis on calcule la moyenne pondérée :</p>
${st4Tab([['Nombre de livres', ...ST4_LIVRES_TAB.map(d => d[0])], ['Effectif', ...ST4_LIVRES_TAB.map(d => d[1])]])}
${r4Ex('', [
  [st4Long('M = \\dfrac{2 \\times 0 + 4 \\times 1 + 6 \\times 2 + 4 \\times 3 + 4 \\times 4 + 3 \\times 5 + 1 \\times 6}{24}'), 'Chaque valeur est multipliée par son effectif.'],
  [st4Tex('M = \\dfrac{0 + 4 + 12 + 12 + 16 + 15 + 6}{24}'), 'On effectue les produits.'],
  [st4Tex('M = \\dfrac{65}{24} \\approx 2{,}7'), 'On divise par l\'effectif total, puis on arrondit au dixième.'],
  ['En moyenne, un élève de la 4e A a lu environ 2,7 livres pendant l\'été.', 'On conclut par une phrase.'],
])}
${r4Ex('Autre exemple : une moyenne de notes avec des coefficients.', [
  ['Nina a eu 16 (coefficient 3), 10 (coefficient 1) et 13 (coefficient 2).', 'Les coefficients jouent le rôle des effectifs.'],
  [st4Tex('M = \\dfrac{3 \\times 16 + 1 \\times 10 + 2 \\times 13}{3 + 1 + 2}'), 'On divise par la somme des coefficients.'],
  [st4Tex('M = \\dfrac{48 + 10 + 26}{6} = \\dfrac{84}{6} = 14'), ''],
  ['La moyenne de Nina est 14, alors que la moyenne « simple » des trois notes serait 13.', 'La note de coefficient 3 compte trois fois.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>La médiane</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>médiane</b> d'une série statistique dont les valeurs sont <b>rangées dans l'ordre croissant</b> est un nombre qui partage cette série en <b>deux groupes de même effectif</b> : au moins la moitié des valeurs lui sont inférieures ou égales, et au moins la moitié lui sont supérieures ou égales.</div>
<span class="prop-badge">Comment la trouver</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>Si l'effectif total <i>N</i> est <b>impair</b>, la médiane est la <b>valeur centrale</b> : la valeur de rang ${st4Tex('\\dfrac{N + 1}{2}')}.</li>
  <li>Si l'effectif total <i>N</i> est <b>pair</b>, la médiane est la <b>moyenne des deux valeurs centrales</b> : celles de rangs ${st4Tex('\\dfrac{N}{2}')} et ${st4Tex('\\dfrac{N}{2} + 1')}.</li>
</ul></div>
<p class="example-title">Exemple 1 (effectif impair) : les temps, en secondes, de 9 nageurs au 50 m nage libre.</p>
${st4Puces(ST4_TEMPS)}
${r4Ex('', [
  ['35 ; 36 ; 38 ; 39 ; ' + R4_BLEU('40') + ' ; 41 ; 42 ; 44 ; 47', 'On range les valeurs dans l\'ordre croissant.'],
  ['L\'effectif total est 9 (impair) : la médiane est la 5e valeur.', '(9 + 1) ÷ 2 = 5 : il y a 4 valeurs avant et 4 valeurs après.'],
  ['La médiane de la série est 40 s.', 'Au moins la moitié des nageurs ont mis 40 s ou moins.'],
])}
<p class="example-title">Exemple 2 (effectif pair) : on reprend les livres lus par les 24 élèves de la 4e A.</p>
${st4Moities([...ST4_LIVRES].sort((a, b) => a - b))}
${r4Ex('', [
  ['L\'effectif total est 24 (pair) : les valeurs centrales sont la 12e et la 13e.', '24 ÷ 2 = 12 : on prend la 12e et la 13e valeur de la série rangée.'],
  ['12e valeur : 2 ; 13e valeur : 3. Médiane = (2 + 3) ÷ 2 = 2,5.', 'Le tableau des effectifs aide à compter : 2 + 4 + 6 = 12 élèves ont lu 2 livres ou moins.'],
  ['La médiane de la série est 2,5 livres : la moitié des élèves ont lu 2 livres ou moins, l\'autre moitié 3 livres ou plus.', 'On conclut par une phrase.'],
])}
<div class="redaction-note" ${R4_REM}>Remarques : la médiane n'est pas toujours une valeur de la série (ici 2,5). Elle est <b>peu sensible aux valeurs extrêmes</b> : si le nageur le plus lent avait mis 80 s au lieu de 47 s, la médiane serait toujours 40 s, alors que la moyenne passerait d'environ 40,2 s à environ 43,9 s.</div>
`;

document.getElementById('histoire-demo-statistiques-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Au 16e siècle, l'astronome danois <b>Tycho Brahe</b> mesurait plusieurs fois la position d'une même étoile : ses mesures n'étant jamais tout à fait identiques, il en faisait la moyenne pour réduire les erreurs. Au 19e siècle, le Belge <b>Adolphe Quetelet</b> applique ces calculs aux êtres humains (taille, poids…) et invente la notion d'« homme moyen ». La médiane, elle, a été nommée en 1843 par le mathématicien français <b>Antoine Augustin Cournot</b> (« valeur médiane »), puis popularisée par l'Anglais <b>Francis Galton</b>. Aujourd'hui, l'INSEE publie chaque année le <b>salaire médian</b> en France en plus du salaire moyen : quelques très hauts salaires suffisent à faire monter la moyenne, alors que la médiane indique le salaire qui partage les salariés en deux moitiés.
</div>
`;

document.getElementById('methode-demo-statistiques-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une moyenne pondérée à partir d'un tableau</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Pointures des 30 élèves de la 4e B. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="st4-moyenneDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="st4MoyenneDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="st4MoyenneDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : trouver la médiane, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="st4-medSvg" viewBox="${ST4_MED_VB}" style="width:100%;max-width:600px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="st4-medSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="st4-medNext" onclick="st4MedDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="st4MedDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : analyser sa propre série</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Saisissez les valeurs d'une série (séparées par des espaces ou des points-virgules ; virgule pour les décimaux) : la série est rangée et la moyenne et la médiane sont rédigées.</p>
  <textarea id="st4-serie" rows="2" style="width:100%;box-sizing:border-box;font-family:'JetBrains Mono',monospace;font-size:1rem;padding:8px 10px;border-radius:8px;border:1px solid #C9D6E6;" oninput="st4Analyser()">12 15 9 14 11 18 13 10 16 12</textarea>
  <div id="st4-analyse" style="margin-top:8px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : moyenne ou médiane ? L'effet d'une valeur extrême</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On part du nageur le plus lent (47 s) et on le rend <b>encore plus lent</b> en faisant glisser le curseur : il reste le dernier, et on observe la moyenne (orange) et la médiane (verte).</p>
  <svg id="st4-extSvg" viewBox="0 0 560 150" style="width:100%;max-width:600px;display:block;margin:8px auto;"></svg>
  <div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;">
    <label for="st4-extVal">Temps du nageur le plus lent :</label>
    <input id="st4-extVal" type="range" min="47" max="120" step="1" value="47" style="width:220px;" oninput="st4Extreme()">
    <b id="st4-extAff" style="font-family:'JetBrains Mono',monospace;">47 s</b>
  </div>
  <div id="st4-extRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function st4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="st4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="st4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-statistiques-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Déterminer la médiane d'une série d'effectif pair »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Série : 15 ; 22 ; 18 ; 30 ; 25 ; 12 ; 20 ; 27</span><span class="we-comment">Temps (en min) de 8 trajets.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">12 ; 15 ; 18 ; <b>20</b> ; <b>22</b> ; 25 ; 27 ; 30</span><span class="we-comment">On range les valeurs dans l'ordre croissant.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">L'effectif total est 8 (pair) : les valeurs centrales sont la 4e et la 5e.</span><span class="we-comment">8 ÷ 2 = 4 : 4e et 5e valeurs.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Médiane = (20 + 22) ÷ 2 = 21</span><span class="we-comment">On fait la moyenne des deux valeurs centrales.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La médiane est 21 min : la moitié des trajets durent 21 min ou moins.</span><span class="we-comment">On conclut par une phrase.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${st4Exo(1, 'Inès a obtenu 11 (coefficient 1), 14 (coefficient 2), 8 (coefficient 1) et 15 (coefficient 4). Calcule sa moyenne, arrondie au dixième.', [
    st4Long('M = \\dfrac{1 \\times 11 + 2 \\times 14 + 1 \\times 8 + 4 \\times 15}{1 + 2 + 1 + 4} = \\dfrac{11 + 28 + 8 + 60}{8} = \\dfrac{107}{8}'),
    'M = 13,375 ≈ 13,4 : la moyenne d\'Inès est environ 13,4.'])}
  ${st4Exo(2, 'Voici les pointures des 30 élèves de la 4e B.' + st4Tab([['Pointure', 36, 37, 38, 39, 40, 41], ['Effectif', 3, 5, 8, 7, 4, 3]]) + 'a) Calcule la pointure moyenne, arrondie au dixième. b) Détermine la pointure médiane.', [
    'a) ' + st4Long('M = \\dfrac{3 \\times 36 + 5 \\times 37 + 8 \\times 38 + 7 \\times 39 + 4 \\times 40 + 3 \\times 41}{30} = \\dfrac{1\\,153}{30} \\approx 38{,}4'),
    'b) N = 30 est pair : on cherche la 15e et la 16e valeur. 3 + 5 = 8 élèves chaussent 36 ou 37, et 8 + 8 = 16 élèves chaussent 38 ou moins.',
    'La 15e et la 16e valeur valent donc 38 : la pointure médiane est 38.'])}
  ${st4Exo(3, 'Détermine la médiane de la série : 12 ; 5 ; 18 ; 9 ; 14 ; 7 ; 20.', [
    'Série rangée : 5 ; 7 ; 9 ; <b>12</b> ; 14 ; 18 ; 20.', 'L\'effectif total est 7 (impair) : la médiane est la 4e valeur, soit <b>12</b>.'])}
  ${st4Exo(4, 'Voici le nombre d\'enfants de 25 familles d\'un immeuble.' + st4Tab([['Nombre d\'enfants', 0, 1, 2, 3, 4], ['Effectif', 4, 7, 9, 3, 2]]) + 'Calcule le nombre moyen et le nombre médian d\'enfants par famille.', [
    'Moyenne : ' + st4Long('M = \\dfrac{4 \\times 0 + 7 \\times 1 + 9 \\times 2 + 3 \\times 3 + 2 \\times 4}{25} = \\dfrac{42}{25} = 1{,}68') + ' enfant par famille.',
    'Médiane : N = 25 est impair, on cherche la 13e valeur. 4 + 7 = 11 familles ont 0 ou 1 enfant, et 11 + 9 = 20 en ont 2 ou moins : la 13e valeur est 2.',
    'Le nombre médian d\'enfants est <b>2</b>.'])}
  ${st4Exo(5, 'Léo a eu 12, 9 et 15 à ses trois premiers contrôles (de même coefficient). Quelle note doit-il obtenir au 4e contrôle pour avoir exactement 13 de moyenne ?', [
    'Pour avoir 13 de moyenne sur 4 contrôles, la somme des notes doit valoir 13 × 4 = 52.',
    'Il a déjà 12 + 9 + 15 = 36 points : il doit obtenir 52 − 36 = <b>16</b>.'])}
  ${st4Exo(6, 'Voici les salaires mensuels (en €) des 9 employés d\'une petite entreprise : 1 600 ; 1 650 ; 1 700 ; 1 700 ; 1 800 ; 1 900 ; 2 000 ; 2 100 ; 9 000. a) Calcule le salaire moyen (arrondi à l\'euro) et le salaire médian. b) Lequel des deux représente le mieux les salaires de cette entreprise ?', [
    'a) Somme : 23 450 €. Salaire moyen : 23 450 ÷ 9 ≈ 2 606 €. La série est rangée et compte 9 valeurs : le salaire médian est la 5e valeur, 1 800 €.',
    'b) Un seul salaire (9 000 €) fait fortement monter la moyenne : 8 employés sur 9 gagnent moins que la moyenne ! La médiane représente mieux les salaires de l\'entreprise.'])}
  ${st4Exo(7, 'Vrai ou faux ? Justifie. a) « La médiane d\'une série est toujours une des valeurs de la série. » b) « Dans une série, il y a toujours autant de valeurs au-dessus de la moyenne qu\'en dessous. »', [
    'a) Faux : la série 12 ; 15 ; 18 ; 20 ; 22 ; 25 ; 27 ; 30 a pour médiane 21, qui n\'est pas une valeur de la série.',
    'b) Faux : c\'est la propriété de la médiane, pas de la moyenne. Dans l\'exercice 6, un seul salaire sur 9 est au-dessus de la moyenne.'])}
  ${st4Exo(8, 'Dans une classe de 4e, la moyenne des 12 filles à un contrôle est 13 et celle des 15 garçons est 11,2. Quelle est la moyenne de la classe ?', [
    'La somme des notes des filles est 12 × 13 = 156, celle des garçons 15 × 11,2 = 168.',
    'Moyenne de la classe : (156 + 168) ÷ (12 + 15) = 324 ÷ 27 = <b>12</b>.',
    'Attention : ce n\'est pas (13 + 11,2) ÷ 2 = 12,1 ! Il faut pondérer chaque moyenne par l\'effectif de son groupe.'])}
</div>
`;

/* ---- Méthode 1 : moyenne pondérée pas à pas ---- */
const ST4_POINTURES = [[36, 3], [37, 5], [38, 8], [39, 7], [40, 4], [41, 3]];
const ST4_MOY_STEPS = [
  { expr: st4Tab([['Pointure', ...ST4_POINTURES.map(d => d[0])], ['Effectif', ...ST4_POINTURES.map(d => d[1])]]), note: 'On lit le tableau des effectifs : 3 élèves chaussent du 36, 5 du 37, etc.' },
  { expr: 'N = 3 + 5 + 8 + 7 + 4 + 3 = 30', note: 'On calcule l\'effectif total en additionnant les effectifs.' },
  { expr: st4Tab([['Pointure', ...ST4_POINTURES.map(d => d[0])], ['Effectif', ...ST4_POINTURES.map(d => d[1])], ['Effectif × pointure', ...ST4_POINTURES.map(d => d[0] * d[1])]], 2), note: 'Pour chaque valeur, on multiplie la pointure par son effectif (par exemple 3 × 36 = 108).' },
  { expr: '108 + 185 + 304 + 273 + 160 + 123 = 1 153', note: 'On additionne ces produits : c\'est la somme des 30 pointures.' },
  { expr: st4Tex('M = \\dfrac{1\\,153}{30} \\approx 38{,}4'), note: 'On divise par l\'effectif total et on arrondit au dixième.' },
  { expr: 'La pointure moyenne des élèves de la 4e B est environ 38,4.', note: 'On conclut par une phrase (la moyenne n\'est pas forcément une pointure qui existe !).' },
];
const st4MoyenneDemo = makeStepDemo(ST4_MOY_STEPS, 'st4-moyenneDisplay');

/* ---- Méthode 2 : médiane animée (cahier : rejouable, via registerGeoStepDemo + anim) ---- */
const ST4_TRI = [...ST4_TEMPS].sort((a, b) => a - b);
// Position (dans la série rangée) de chaque valeur du relevé ; les valeurs sont toutes différentes.
const ST4_RANG = ST4_TEMPS.map(v => ST4_TRI.indexOf(v));
const st4Cx = i => 40 + i * 60;
const st4Lisse = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
// Étape i (0 : relevé ; 1 : on range ; 2 : on écarte les valeurs deux par deux ; 3 : la médiane), avancement prog de 0 à n(i).
function st4MedDessin(i, prog){
  const n = st4MedN(i); prog = prog == null ? n : prog;
  const t = Math.max(0, Math.min(1, prog / n));
  let s = `<text x="280" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="${ST4_ENCRE}">Temps (en s) de 9 nageurs au 50 m nage libre</text>`;
  const paires = i < 2 ? 0 : i === 2 ? Math.floor(prog + 1e-9) : 4;
  ST4_TEMPS.forEach((v, k) => {
    const r = ST4_RANG[k];
    const x = i === 0 ? st4Cx(k) : i === 1 ? st4Cx(k) + (st4Cx(r) - st4Cx(k)) * st4Lisse(t) : st4Cx(r);
    const y = i === 1 ? 80 - 34 * Math.sin(Math.PI * t) * (k % 2 ? 1 : -.6) : 80;
    let fond = '#fff', bord = ST4_ENCRE, coul = ST4_ENCRE;
    if(r < paires){ fond = '#E8F1FA'; bord = ST4_BLEU; coul = ST4_BLEU; }
    if(r >= 9 - paires && r !== 4){ fond = '#FDF0E1'; bord = ST4_ORANGE; coul = ST4_ORANGE; }
    if(i === 3 && r === 4){ fond = ST4_VERT; bord = ST4_VERT; coul = '#fff'; }
    s += `<rect x="${(x - 24).toFixed(1)}" y="${(y - 20).toFixed(1)}" width="48" height="40" rx="7" fill="${fond}" stroke="${bord}" stroke-width="${i === 3 && r === 4 ? 2.5 : 1.5}"/><text x="${x.toFixed(1)}" y="${(y + 6).toFixed(1)}" text-anchor="middle" font-size="17" font-weight="700" fill="${coul}">${v}</text>`;
  });
  if(i >= 1 && (i > 1 || t > .98)) ST4_TRI.forEach((v, r) => { s += `<text x="${st4Cx(r)}" y="52" text-anchor="middle" font-size="13" fill="#4E5665">${r + 1}${r ? 'e' : 'er'}</text>`; });
  if(i === 2 && paires > 0) s += `<text x="280" y="142" text-anchor="middle" font-size="14" fill="#4E5665">On écarte les valeurs deux par deux, par les deux bouts (${paires} paire${paires > 1 ? "s" : ""}).</text>`;
  if(i === 3){
    const acc = (x1, x2, coul, txt) => `<path d="M${x1},110 q0,10 10,10 H${(x1 + x2) / 2 - 8} q8,0 8,10 q0,-10 8,-10 H${x2 - 10} q10,0 10,-10" fill="none" stroke="${coul}" stroke-width="1.6"/><text x="${(x1 + x2) / 2}" y="154" text-anchor="middle" font-size="15" font-weight="700" fill="${coul}">${txt}</text>`;
    s += acc(st4Cx(0) - 22, st4Cx(3) + 22, ST4_BLEU, '4 valeurs inférieures') + acc(st4Cx(5) - 22, st4Cx(8) + 22, ST4_ORANGE, '4 valeurs supérieures');
    s += `<text x="${st4Cx(4)}" y="132" text-anchor="middle" font-size="15" font-weight="700" fill="${ST4_VERT}">médiane</text><text x="280" y="190" text-anchor="middle" font-size="17" font-weight="700" fill="${ST4_VERT}">Médiane = 40 s (5e valeur sur 9)</text>`;
  }
  return s;
}
const st4MedN = i => i === 2 ? 4 : 1;
const ST4_MED_NOTES = [
  'Voici les 9 temps, dans l\'ordre où ils ont été relevés.',
  'On range les valeurs dans l\'ordre croissant : de 35 s (le plus rapide) à 47 s (le plus lent).',
  'On écarte les valeurs deux par deux : la plus petite et la plus grande, puis les suivantes… Il reste une seule valeur au centre.',
  'L\'effectif (9) est impair : la valeur centrale, la 5e, est la médiane. Elle partage la série en deux groupes de 4 valeurs.',
];
// Moteur d'étapes animé : chaque « Étape suivante » joue le mouvement de l'étape (n(i) × 700 ms).
function st4Etapes(svgId, listeId, btnId, notes, dessiner, nAnim){
  let k = 0, raf = null;
  const svg = () => document.getElementById(svgId);
  const bouton = () => { const b = document.getElementById(btnId); if(b){ b.disabled = k >= notes.length - 1; b.textContent = k >= notes.length - 1 ? 'Terminé ✓' : 'Étape suivante →'; } };
  const liste = () => document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
  const fixe = () => { cancelAnimationFrame(raf); const s = svg(); if(s) s.innerHTML = dessiner(k); liste(); bouton(); };
  const jouer = () => {
    cancelAnimationFrame(raf); liste(); bouton();
    const n = nAnim(k), t0 = performance.now(), duree = n * 700;
    const f = now => { const p = Math.max(0, Math.min(n, (now - t0) / duree * n)); const s = svg(); if(s) s.innerHTML = dessiner(k, p); if(p < n) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
  };
  const demo = {
    init(){ const l = document.getElementById(listeId); if(l) l.innerHTML = notes.map((t, i) => `<div class="step-item" data-step="${i + 1}"><div class="step-num">${i + 1}</div><div>${t}</div></div>`).join(''); k = 0; fixe(); },
    next(){ if(k < notes.length - 1){ k++; jouer(); } },
    reset(){ k = 0; fixe(); },
    goto(i){ k = Math.max(0, Math.min(notes.length - 1, i)); fixe(); },
    steps: () => notes.map(t => ({ note: t })),
    getIdx: () => k,
    anim: { viewBox: ST4_MED_VB, n: nAnim, rendu: (i, p) => dessiner(i, p) },
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto, anim: demo.anim });
  return demo;
}
const st4MedDemo = st4Etapes('st4-medSvg', 'st4-medSteps', 'st4-medNext', ST4_MED_NOTES, st4MedDessin, st4MedN);

/* ---- Méthode 3 : analyse d'une série saisie ---- */
function st4Analyser(){
  const out = document.getElementById('st4-analyse'); if(!out) return;
  const brut = String(document.getElementById('st4-serie').value || '').trim();
  const morceaux = brut ? brut.split(/[\s;]+/).filter(Boolean) : [];
  const v = morceaux.map(m => Number(m.replace(',', '.')));
  if(!v.length){ out.innerHTML = '<p class="hint" style="text-align:center;">Saisissez au moins une valeur.</p>'; return; }
  if(v.some(x => !Number.isFinite(x))){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Une des valeurs n\'est pas un nombre : séparez les valeurs par des espaces ou des points-virgules, et utilisez la virgule pour les décimaux.</p>'; return; }
  if(v.length > 200){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">200 valeurs au plus.</p>'; return; }
  const tri = [...v].sort((a, b) => a - b), N = tri.length, somme = tri.reduce((a, b) => a + b, 0), f = st4Num;
  const sommeTxt = N <= 12 ? tri.map(f).join(' + ') + ' = ' + f(somme) : 'somme des ' + N + ' valeurs = ' + f(somme);
  const lignes = [
    [tri.map((x, i) => { const c = N % 2 ? i === (N - 1) / 2 : i === N / 2 - 1 || i === N / 2; return c ? R4_BLEU(f(x)) : f(x); }).join(' ; '), 'On range les valeurs dans l\'ordre croissant.'],
    [`Effectif total : N = ${N}.`, N % 2 ? 'N est impair.' : 'N est pair.'],
    [`Moyenne : ${sommeTxt}, puis ${f(somme)} ÷ ${N} ${st4Arr(somme / N, 2)}.`, 'On additionne toutes les valeurs, puis on divise par l\'effectif total (arrondi au centième).'],
  ];
  if(N % 2){ const r = (N + 1) / 2; lignes.push([`Médiane : la ${r}${r > 1 ? 'e' : 're'} valeur, soit <b>${f(tri[r - 1])}</b>.`, `(${N} + 1) ÷ 2 = ${r} : il y a ${r - 1} valeur${r > 2 ? 's' : ''} avant et ${r - 1} après.`]); }
  else { const r = N / 2, a = tri[r - 1], b = tri[r]; lignes.push([`Médiane : (${f(a)} + ${f(b)}) ÷ 2 = <b>${f((a + b) / 2)}</b>.`, `${N} ÷ 2 = ${r} : on fait la moyenne de la ${r}${r > 1 ? 'e' : 're'} et de la ${r + 1}e valeur.`]); }
  out.innerHTML = r4Ex('', lignes);
}

/* ---- Méthode 4 : valeur extrême ---- */
function st4Extreme(){
  const lent = Number(document.getElementById('st4-extVal').value), svg = document.getElementById('st4-extSvg'); if(!svg) return;
  const v = ST4_TRI.slice(0, 8).concat([lent]).sort((a, b) => a - b), moy = v.reduce((a, b) => a + b, 0) / 9, med = v[4];
  const X = t => 30 + (t - 30) / 95 * 500;
  let s = `<line x1="20" y1="80" x2="540" y2="80" stroke="${ST4_ENCRE}" stroke-width="1.5"/><polygon points="540,75 550,80 540,85" fill="${ST4_ENCRE}"/>`;
  for(let t = 30; t <= 125; t += 5) s += `<line x1="${X(t)}" y1="${t % 10 ? 76 : 72}" x2="${X(t)}" y2="${t % 10 ? 84 : 88}" stroke="${ST4_ENCRE}" stroke-width="1"/>` + (t % 10 ? '' : `<text x="${X(t)}" y="102" text-anchor="middle" font-size="11" fill="#4E5665">${t}</text>`);
  v.forEach(t => { s += `<circle cx="${X(t)}" cy="80" r="4.2" fill="${t === lent ? '#C0392B' : ST4_BLEU}" stroke="#fff" stroke-width="1.2"/>`; });
  const eti = (t, coul, txt, haut) => `<line x1="${X(t)}" y1="${haut ? 36 : 88}" x2="${X(t)}" y2="${haut ? 72 : 122}" stroke="${coul}" stroke-width="2.4"/><text x="${X(t)}" y="${haut ? 30 : 138}" text-anchor="middle" font-size="13" font-weight="700" fill="${coul}">${txt}</text>`;
  s += eti(med, ST4_VERT, `médiane = ${st4Num(med)} s`, true) + eti(moy, ST4_ORANGE, `moyenne ${st4Arr(moy, 1)} s`, false);
  s += `<text x="552" y="102" text-anchor="end" font-size="11" fill="#4E5665">s</text>`;
  svg.innerHTML = s;
  document.getElementById('st4-extAff').textContent = lent + ' s';
  document.getElementById('st4-extRes').innerHTML = `La médiane reste <b style="color:${ST4_VERT};">${st4Num(med)} s</b>, alors que la moyenne vaut <b style="color:${ST4_ORANGE};">${st4Arr(moy, 1).replace('= ', '')} s</b>.` + (lent === 47 ? ' Faites glisser le curseur vers la droite pour ralentir encore le dernier nageur.' : ` La moyenne a augmenté ${st4Arr(moy - 362 / 9, 1).replace('= ', 'de ').replace('≈ ', 'd\'environ ')} s, sans que la médiane bouge.` + (lent >= 70 ? ' Une seule valeur extrême suffit à « tirer » la moyenne vers le haut.' : ''));
}

DEMO_REGISTRY['4e|Statistiques'] = {
  cours: 'cours-demo-statistiques-4e', methode: 'methode-demo-statistiques-4e', exos: 'exos-demo-statistiques-4e', histoire: 'histoire-demo-statistiques-4e',
  init: () => {
    st4MoyenneDemo.reset(); st4MedDemo.init(); st4Analyser(); st4Extreme();
    ['cours-demo-statistiques-4e', 'exos-demo-statistiques-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-statistiques-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-statistiques-4e'));
  }
};

DEMO_QUIZZES['4e|Statistiques'] = [
  { q: 'Quelle est la médiane de la série 4 ; 8 ; 6 ; 10 ; 7 ?', opts: ['6', '7', '8'], correct: 1 },
  { q: 'Quelle est la médiane de la série 3 ; 5 ; 9 ; 11 ?', opts: ['7', '5 ou 9', '9'], correct: 0 },
  { q: 'Une série compte 3 fois la valeur 10 et 1 fois la valeur 20. Sa moyenne est...', opts: ['15', '12,5', '20'], correct: 1 },
  { q: 'Une série rangée a un effectif total de 41. Sa médiane est...', opts: ['la 20e valeur', 'la 21e valeur', 'la moyenne de la 20e et de la 21e valeur'], correct: 1 },
  { q: 'Une série rangée a un effectif total de 50. Sa médiane est...', opts: ['la 25e valeur', 'la moyenne de la 25e et de la 26e valeur', 'la 26e valeur'], correct: 1 },
  { q: 'Lequel de ces deux nombres est peu sensible à une valeur extrême ?', opts: ['La moyenne', 'La médiane'], correct: 1 },
  { q: 'Notes : 12 (coefficient 1) et 18 (coefficient 2). La moyenne est...', opts: ['15', '16', '14'], correct: 1 },
];

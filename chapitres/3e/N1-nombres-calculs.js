/* ============================================================
   CHAPITRE : Nombres et calculs (3e, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : « le chapitre N1 n'a pas vraiment de cours » (le manuel n'y propose que quatre fiches
   d'exercices, p. 3-6 : « calculer pour résoudre des problèmes », « choisir la bonne solution »,
   « répondre par Vrai ou Faux »). Le cours est donc un cours de RENTRÉE construit à partir de ce
   que ces fiches mobilisent : une démarche pour résoudre un problème, justifier une affirmation,
   puis les outils de calcul de la 6e à la 4e (priorités, fractions, pourcentages, puissances de 10
   et préfixes, racine carrée, comparaison) et le contrôle d'un résultat (arrondir selon la
   situation, ordre de grandeur). Exemples et exercices nouveaux, inspirés des fiches.
   Utilise r4Ex / r4Colonne / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const NC3_VIOLET = '#7A3E9D', NC3_BLEU = '#0C5BA0', NC3_ORANGE = '#E07B00', NC3_VERT = '#1E7B34', NC3_ROUGE = '#C0392B', NC3_ENCRE = '#1C1B2E';
const nc3Tex = s => `<span class="tex">${s}</span>`;
// Nombre arrondi à d décimales, à la française (espace des milliers dans la partie entière seulement).
const nc3N = (v, d) => { const p = Math.pow(10, d == null ? 2 : d); const r = Math.round(v * p) / p; const [e, f] = String(Math.abs(r)).split('.'); return (r < 0 ? '−' : '') + e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (f ? ',' + f : ''); };
// Même chose, pour KaTeX (virgule décimale et espace fine des milliers).
const nc3T = (v, d) => nc3N(v, d).replace('−', '-').replace(',', '{,}').replace(/ /g, '\\,');
const nc3Exact = (v, d) => Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9;
const nc3Encadre = s => `<div class="def-box">${s}</div>`;
const NC3_LISTE = 'style="margin:6px 0 0;padding-left:20px;line-height:1.8;"';

document.getElementById('cours-demo-nombres-calculs-3e').innerHTML = `
<div class="redaction-note" ${R4_REM}>Ce chapitre de rentrée ne contient <b>pas de notion nouvelle</b> : il rassemble les outils de calcul vus de la 6e à la 4e, et la façon de s'en servir pour <b>résoudre des problèmes</b>, comme au brevet. Pour revoir une notion en détail, retrouvez le chapitre correspondant de 4e.</div>

<div class="lesson-header"><span class="num">1</span><h3>Résoudre un problème</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Une démarche en quatre temps</h4></div>
<span class="prop-badge">Méthode</span>
${nc3Encadre(`<ol style="margin:0;padding-left:22px;line-height:1.8;">
  <li><b>Lire et trier</b> : repérer la question posée et les données utiles (dans le texte, un tableau, un schéma). Certaines données ne servent à rien !</li>
  <li><b>Chercher un chemin</b> : découper le problème en étapes (« pour trouver ceci, il me faut d'abord cela »).</li>
  <li><b>Calculer en rédigeant</b> : nommer chaque calcul (A = …, N = …), l'écrire en colonne et préciser les unités.</li>
  <li><b>Contrôler et conclure</b> : le résultat est-il vraisemblable (ordre de grandeur, arrondi adapté) ? On répond par une phrase.</li>
</ol>`)}
<p class="example-title">Exemple :</p>
<p style="margin:0 0 8px;">Un jardin partagé rectangulaire mesure 48 m sur 25 m. On y installe une cabane sur un carré de 12 m de côté ; le reste est semé d'engrais vert. Un sachet de graines couvre 40 m² et coûte 6,50 €. Combien coûtent les graines ?</p>
${r4Ex('', [
  [nc3Tex('A = 48 \\times 25 = 1\\,200'), 'Étape 1 : l\'aire du jardin, en m².'],
  [nc3Tex('B = 12 \\times 12 = 144'), 'Étape 2 : l\'aire occupée par la cabane, en m².'],
  [nc3Tex('S = 1\\,200 - 144 = 1\\,056'), 'Étape 3 : l\'aire à semer, en m².'],
  [nc3Tex('N = 1\\,056 \\div 40 = 26{,}4'), 'Étape 4 : le nombre de sachets nécessaires.'],
  ['Il faut donc acheter 27 sachets.', 'On arrondit à l\'unité supérieure : 26 sachets ne suffiraient pas.'],
  [nc3Tex('P = 27 \\times 6{,}50 = 175{,}50'), 'Étape 5 : le prix, en euros.'],
  ['Les graines coûtent 175,50 €.', 'Contrôle : environ 1 000 m², soit 25 sachets à 7 € : environ 175 €. C\'est cohérent.'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Vrai ou faux : justifier une affirmation</h4></div>
<span class="prop-badge">Propriétés</span>
${nc3Encadre(`<ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Pour montrer qu'une affirmation générale (« toujours », « pour tout nombre ») est <b>fausse</b>, <b>un seul contre-exemple</b> suffit.</li>
  <li>Pour montrer qu'elle est <b>vraie</b>, un ou plusieurs exemples <b>ne suffisent pas</b> : il faut un calcul ou un raisonnement valable <b>dans tous les cas</b> (souvent avec une lettre).</li>
  <li>Si l'affirmation porte sur un cas précis (un calcul, une situation), on <b>fait le calcul</b> et on compare.</li>
</ul>`)}
<p class="example-title">Exemple 1 : « 12 − 3 × 4 + 2 = 38 ».</p>
${r4Ex('', [
  [nc3Tex('C = 12 - 3 \\times 4 + 2'), 'La multiplication est prioritaire.'],
  [nc3Tex('C = 12 - 12 + 2'), ''],
  [nc3Tex('C = 2'), 'Et non 38, qu\'on obtient en calculant 12 − 3 d\'abord.'],
  ['L\'affirmation est fausse.', 'On conclut.'],
])}
<p class="example-title">Exemple 2 : « Le carré d'un nombre est toujours plus grand que ce nombre ».</p>
<ul class="example-list"><li>Faux. Contre-exemple : 0,5² = 0,25 et 0,25 &lt; 0,5.</li></ul>
<p class="example-title">Exemple 3 : « La somme de trois nombres entiers consécutifs est toujours un multiple de 3 ».</p>
${r4Ex('', [
  ['On note n le plus petit des trois nombres : les suivants sont n + 1 et n + 2.', 'Une lettre représente n\'importe quel entier.'],
  [nc3Tex('S = n + (n + 1) + (n + 2)'), ''],
  [nc3Tex('S = 3n + 3'), 'On réduit.'],
  [nc3Tex('S = 3(n + 1)'), 'On factorise par 3.'],
  ['S est un multiple de 3 : l\'affirmation est vraie.', 'Vérifier sur 4 + 5 + 6 = 15 illustre, mais ne prouve pas.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Les outils de calcul</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Les priorités opératoires</h4></div>
<span class="prop-badge">Rappel</span>
${nc3Encadre(`On effectue <b>dans l'ordre</b> : les calculs entre <b>parenthèses</b> (les plus intérieures d'abord), puis les <b>puissances</b>, puis les <b>multiplications et divisions</b>, enfin les <b>additions et soustractions</b>. À priorité égale, on calcule de gauche à droite.`)}
${r4Ex('Exemple :', [
  [`D = 5 + 3 × 2² − ${R4_BLEU('(7 − 1)')} ÷ 3`, 'On commence par la parenthèse.'],
  [`D = 5 + 3 × ${R4_BLEU('2²')} − 6 ÷ 3`, 'Puis la puissance.'],
  [`D = 5 + ${R4_BLEU('3 × 4')} − ${R4_BLEU('6 ÷ 3')}`, 'Puis la multiplication et la division.'],
  ['D = 5 + 12 − 2', 'On termine de gauche à droite.'],
  ['D = 15', ''],
])}

<div class="sub-header"><span class="letter">B</span><h4>Les fractions</h4></div>
<span class="prop-badge">Rappels</span>
${nc3Encadre(`<ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>Pour <b>additionner ou soustraire</b>, on met les fractions au <b>même dénominateur</b>, puis on ajoute les numérateurs.</li>
  <li>Pour <b>multiplier</b>, on multiplie les numérateurs entre eux et les dénominateurs entre eux : ${nc3Tex('\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}')}.</li>
  <li><b>Diviser</b> par une fraction non nulle, c'est <b>multiplier par son inverse</b> : ${nc3Tex('\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}')}.</li>
  <li>Prendre une <b>fraction d'une quantité</b> (ou d'une autre fraction), c'est <b>multiplier</b>.</li>
</ul>`)}
${r4Ex('Exemple 1 :', [
  [nc3Tex('E = \\dfrac{5}{6} + \\dfrac{3}{4} = \\dfrac{10}{12} + \\dfrac{9}{12} = \\dfrac{19}{12}'), 'Dénominateur commun : 12, un multiple de 6 et de 4.'],
])}
${r4Ex('Exemple 2 :', [
  [nc3Tex('F = \\dfrac{5}{3} - \\dfrac{2}{3} \\times \\dfrac{1}{4}'), 'La multiplication est prioritaire.'],
  [nc3Tex('F = \\dfrac{5}{3} - \\dfrac{2}{12} = \\dfrac{5}{3} - \\dfrac{1}{6}'), 'On simplifie 2/12 par 2.'],
  [nc3Tex('F = \\dfrac{10}{6} - \\dfrac{1}{6} = \\dfrac{9}{6} = \\dfrac{3}{2}'), 'Même dénominateur, puis on simplifie par 3.'],
])}
${r4Ex('Exemple 3 :', [
  [nc3Tex('G = \\dfrac{2}{3} \\div \\dfrac{4}{9} = \\dfrac{2}{3} \\times \\dfrac{9}{4} = \\dfrac{18}{12} = \\dfrac{3}{2}'), 'On multiplie par l\'inverse de 4/9, puis on simplifie par 6.'],
])}
<p class="example-title">Exemple 4 : la fraction d'une fraction.</p>
<p style="margin:0 0 8px;">Dans une association, ${nc3Tex('\\dfrac{2}{5}')} des membres sont bénévoles, et les ${nc3Tex('\\dfrac{3}{4}')} des bénévoles sont des femmes. Quelle proportion des membres sont des femmes bénévoles ?</p>
${r4Ex('', [
  [nc3Tex('p = \\dfrac{3}{4} \\times \\dfrac{2}{5} = \\dfrac{6}{20} = \\dfrac{3}{10}'), 'Les 3/4 des 2/5 : on multiplie.'],
  ['Les femmes bénévoles représentent 3/10 des membres, soit 30 %.', 'On conclut.'],
])}

<div class="sub-header"><span class="letter">C</span><h4>Les pourcentages</h4></div>
<span class="prop-badge">Rappels</span>
${nc3Encadre(`<ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>Prendre <b>t %</b> d'une quantité, c'est la multiplier par ${nc3Tex('\\dfrac{t}{100}')}.</li>
  <li><b>Augmenter</b> de t %, c'est multiplier par ${nc3Tex('1 + \\dfrac{t}{100}')} ; <b>diminuer</b> de t %, c'est multiplier par ${nc3Tex('1 - \\dfrac{t}{100}')}. Ce nombre est le <b>coefficient multiplicateur</b>.</li>
  <li>Le <b>pourcentage d'évolution</b> d'une valeur de départ V<sub>D</sub> à une valeur d'arrivée V<sub>A</sub> est ${nc3Tex('\\dfrac{V_A - V_D}{V_D} \\times 100')}.</li>
</ul>`)}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>35 % de 240 élèves : 0,35 × 240 = 84 élèves.</li>
  <li>Un vélo à 85 € augmente de 12 % : 85 × 1,12 = 95,20 €.</li>
  <li>Un manteau à 64 € est soldé à −30 % : 64 × 0,7 = 44,80 €.</li>
</ul>
${r4Ex('Exemple : un club passe de 62 500 à 75 000 licenciés. Quelle est l\'évolution en pourcentage ?', [
  [nc3Tex('t = \\dfrac{75\\,000 - 62\\,500}{62\\,500} = \\dfrac{12\\,500}{62\\,500} = 0{,}2'), 'On divise l\'augmentation par la valeur de départ.'],
  ['Le nombre de licenciés a augmenté de 20 %.', '0,2 = 20/100.'],
])}
<div class="redaction-note" ${R4_REM}>Attention : les pourcentages successifs ne s'ajoutent pas. Augmenter de 20 % puis baisser de 20 %, c'est multiplier par 1,2 × 0,8 = 0,96 : on <b>perd 4 %</b>, on ne revient pas au départ (100 → 120 → 96).</div>

<div class="sub-header"><span class="letter">D</span><h4>Puissances de 10, écriture scientifique et préfixes</h4></div>
<span class="prop-badge">Rappels</span>
${nc3Encadre(`<ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>L'<b>écriture scientifique</b> d'un nombre positif est ${nc3Tex('a \\times 10^n')}, où ${nc3Tex('1 \\leqslant a < 10')} et n est un entier relatif.</li>
  <li>Préfixes : <b>kilo</b> (k) = 10³, <b>méga</b> (M) = 10⁶, <b>giga</b> (G) = 10⁹, <b>téra</b> (T) = 10¹² ; <b>milli</b> (m) = 10⁻³, <b>micro</b> (µ) = 10⁻⁶, <b>nano</b> (n) = 10⁻⁹.</li>
  <li>Pour multiplier ou diviser des puissances de 10 : ${nc3Tex('10^m \\times 10^n = 10^{m+n}')} et ${nc3Tex('\\dfrac{10^m}{10^n} = 10^{m-n}')}.</li>
</ul>`)}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>4,2 × 10⁵ = 420 000 &nbsp;&nbsp;et&nbsp;&nbsp; 0,000 37 = 3,7 × 10⁻⁴.</li>
  <li>En informatique, 1 ko = 10³ octets, 1 Mo = 10⁶ octets, 1 Go = 10⁹ octets : donc 1 Go = 1 000 Mo.</li>
</ul>
${r4Ex('Exemple : combien de photos de 4 Mo peut-on stocker sur une clé de 64 Go ?', [
  [nc3Tex('N = \\dfrac{64 \\times 10^9}{4 \\times 10^6} = 16 \\times 10^{3} = 16\\,000'), 'On convertit en octets, puis 64 ÷ 4 = 16 et 10⁹ ÷ 10⁶ = 10³.'],
  ['On peut stocker 16 000 photos.', 'On conclut.'],
])}

<div class="sub-header"><span class="letter">E</span><h4>La racine carrée</h4></div>
<span class="def-badge">Rappel</span>
${nc3Encadre(`Pour un nombre <i>a</i> positif, la <b>racine carrée</b> de <i>a</i>, notée ${nc3Tex('\\sqrt{a}')}, est le nombre <b>positif</b> dont le carré est égal à <i>a</i>. Un carré d'aire <i>A</i> a pour côté ${nc3Tex('\\sqrt{A}')}.`)}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${nc3Tex('\\sqrt{49} = 7')} car 7² = 49 ; ${nc3Tex('\\sqrt{1{,}44} = 1{,}2')} car 1,2² = 1,44.</li>
  <li>Un carré d'aire 30 cm² a pour côté ${nc3Tex('\\sqrt{30}')} cm : c'est la <b>valeur exacte</b>. La calculatrice donne ${nc3Tex('\\sqrt{30} \\approx 5{,}477')} : au millimètre près, le côté mesure <b>5,5 cm</b>.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Attention : ${nc3Tex('\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7')}, alors que ${nc3Tex('\\sqrt{16 + 9} = \\sqrt{25} = 5')}. La racine d'une somme n'est pas la somme des racines.</div>

<div class="sub-header"><span class="letter">F</span><h4>Comparer et ranger des nombres</h4></div>
<span class="prop-badge">Méthode</span>
${nc3Encadre('Pour comparer des nombres écrits de façons différentes (fraction, pourcentage, écriture scientifique, racine carrée), on les écrit <b>tous sous la même forme</b>, le plus souvent en écriture <b>décimale</b>.')}
<p class="example-title">Exemple : ranger dans l'ordre croissant 0,63 ; 58 % ; ${nc3Tex('\\dfrac{5}{8}')} ; 6,1 × 10⁻¹ ; ${nc3Tex('\\sqrt{0{,}36}')}.</p>
<ul class="example-list">
  <li>En écriture décimale : 0,63 ; 0,58 ; 0,625 ; 0,61 ; 0,6.</li>
  <li>Ordre croissant : 58 % &lt; ${nc3Tex('\\sqrt{0{,}36}')} &lt; 6,1 × 10⁻¹ &lt; ${nc3Tex('\\dfrac{5}{8}')} &lt; 0,63.</li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>Contrôler un résultat</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Arrondir selon la situation</h4></div>
<span class="prop-badge">Méthode</span>
${nc3Encadre('Quand le résultat doit être un <b>nombre entier</b> (paquets, pots, bouteilles, bus…), c\'est la <b>situation</b> qui décide de l\'arrondi : on arrondit <b>au-dessus</b> quand il faut <b>assez</b> de quelque chose (acheter, transporter), <b>au-dessous</b> quand on compte ce qu\'on peut <b>remplir complètement</b>.')}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Il faut 2,3 pots de peinture : on achète <b>3 pots</b>.</li>
  <li>Avec 10 L de jus, on remplit des bouteilles de 0,7 L : 10 ÷ 0,7 ≈ 14,3, donc <b>14 bouteilles pleines</b>.</li>
  <li>215 élèves partent en sortie dans des cars de 50 places : 215 ÷ 50 = 4,3, donc il faut <b>5 cars</b>.</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Estimer un ordre de grandeur</h4></div>
<span class="prop-badge">Méthode</span>
${nc3Encadre('Avant ou après un calcul, on remplace les nombres par des valeurs <b>proches et simples</b> pour obtenir un <b>ordre de grandeur</b> du résultat. Il permet de repérer une erreur de virgule, d\'unité ou de touche de calculatrice.')}
<p class="example-title">Exemple :</p>
<ul class="example-list"><li>49,8 × 21 ≈ 50 × 20 = 1 000. Si la calculatrice affiche 104,58, il y a une erreur : le bon résultat est 1 045,8.</li></ul>
`;

document.getElementById('histoire-demo-nombres-calculs-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La démarche en quatre temps de ce chapitre vient du mathématicien hongrois <b>George Pólya</b>. Dans son livre <i>How to Solve It</i> (1945), traduit en français sous le titre <i>Comment poser et résoudre un problème</i>, il décrit quatre étapes : <b>comprendre</b> le problème, <b>concevoir un plan</b>, <b>mettre le plan à exécution</b>, puis <b>revenir sur la solution</b> pour la vérifier. Vendu à plus d'un million d'exemplaires, ce petit livre est encore utilisé par les enseignants du monde entier.<br><br>
  Le symbole <b>%</b> est lui aussi une histoire de calcul pratique : dans l'Italie marchande du 15e siècle, les commerçants abrégeaient « per cento » (« pour cent ») en « p cento », puis en « p ċ », et l'abréviation s'est peu à peu transformée en un rond, une barre et un rond.<br><br>
  Quant aux préfixes, ils posent encore question en informatique : 1 kilooctet vaut 1 000 octets, mais les ordinateurs comptent volontiers par paquets de 1 024 = 2¹⁰ octets. Pour lever l'ambiguïté, une commission internationale a créé en 1998 le <b>kibioctet</b> (Kio, 1 024 octets), le mébioctet et le gibioctet. C'est pourquoi un disque vendu « 1 To » affiche un peu moins de 1 000 « Go » sur certains ordinateurs.
</div>
`;

document.getElementById('methode-demo-nombres-calculs-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : acheter juste ce qu'il faut (pertes et paquets)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On carrelle une pièce rectangulaire. Réglez ses dimensions, les pertes dues aux découpes et le contenu d'un paquet : le calcul est rédigé, et le nombre de paquets est arrondi au-dessus.</p>
  <div style="display:flex;gap:10px 18px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Longueur : <input id="nc3-cL" type="range" min="2" max="8" step="0.1" value="5" style="width:130px;" oninput="nc3Carrelage()"> <b id="nc3-cLa"></b></label>
    <label>Largeur : <input id="nc3-cl" type="range" min="2" max="6" step="0.1" value="4" style="width:130px;" oninput="nc3Carrelage()"> <b id="nc3-cla"></b></label>
    <label>Pertes : <input id="nc3-cP" type="range" min="0" max="15" step="1" value="5" style="width:110px;" oninput="nc3Carrelage()"> <b id="nc3-cPa"></b></label>
    <label>Un paquet couvre : <input id="nc3-cS" type="range" min="0.8" max="2" step="0.04" value="1.12" style="width:110px;" oninput="nc3Carrelage()"> <b id="nc3-cSa"></b></label>
  </div>
  <svg id="nc3-cSvg" viewBox="0 0 520 210" style="width:100%;max-width:560px;display:block;margin:10px auto;"></svg>
  <div id="nc3-cRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : vrai ou faux ? Justifier</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Lisez l'affirmation, décidez si elle est vraie ou fausse, puis découvrez la justification : un calcul, un contre-exemple ou un raisonnement.</p>
  <div id="nc3-vfAff" style="font-size:1.1rem;text-align:center;padding:18px 12px;background:#fff;border-radius:8px;border:1px solid rgba(28,43,57,.1);min-height:2.4em;line-height:1.6;"></div>
  <div class="figure-toolbar" id="nc3-vfBoutons">
    <button class="btn" onclick="nc3VfRepondre(true)">Vrai</button>
    <button class="btn" onclick="nc3VfRepondre(false)">Faux</button>
  </div>
  <div id="nc3-vfJustif" style="min-height:3em;margin-top:6px;line-height:1.6;"></div>
  <div class="figure-toolbar">
    <span id="nc3-vfScore" class="hint" style="align-self:center;"></span>
    <button class="btn secondary" onclick="nc3VfSuivante()">Affirmation suivante →</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : deux évolutions successives en pourcentage</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un prix de départ subit deux évolutions. Réglez-les (une valeur négative est une baisse) : les coefficients multiplicateurs se multiplient. Essayez +20 % puis −20 % !</p>
  <div style="display:flex;gap:10px 18px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Prix de départ : <input id="nc3-pV" type="range" min="20" max="200" step="5" value="100" style="width:120px;" oninput="nc3Pourcent()"> <b id="nc3-pVa"></b></label>
    <label>1re évolution : <input id="nc3-p1" type="range" min="-50" max="100" step="5" value="20" style="width:120px;" oninput="nc3Pourcent()"> <b id="nc3-p1a"></b></label>
    <label>2e évolution : <input id="nc3-p2" type="range" min="-50" max="100" step="5" value="-20" style="width:120px;" oninput="nc3Pourcent()"> <b id="nc3-p2a"></b></label>
  </div>
  <svg id="nc3-pSvg" viewBox="0 0 520 220" style="width:100%;max-width:560px;display:block;margin:10px auto;"></svg>
  <div id="nc3-pRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : les rebonds d'une balle (une fraction répétée)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">À chaque rebond, la balle remonte à une fraction de la hauteur précédente. Choisissez la hauteur de départ et la fraction, puis lâchez la balle.</p>
  <div style="display:flex;gap:10px 18px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Hauteur de départ : <input id="nc3-bH" type="range" min="1" max="5" step="0.5" value="2" style="width:120px;" oninput="nc3Balle()"> <b id="nc3-bHa"></b></label>
    <label>Elle remonte aux <select id="nc3-bF" onchange="nc3Balle()" style="padding:5px 8px;border-radius:8px;border:1px solid #C9D6E6;">
      <option value="1/2">1/2</option><option value="2/3">2/3</option><option value="3/4" selected>3/4</option><option value="4/5">4/5</option>
    </select> de sa hauteur</label>
  </div>
  <svg id="nc3-bSvg" viewBox="0 0 520 230" style="width:100%;max-width:560px;display:block;margin:10px auto;"></svg>
  <div id="nc3-bRes"></div>
  <div class="figure-toolbar"><button class="btn" id="nc3-bBtn" onclick="nc3Lacher()">Lâcher la balle</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : ranger des nombres écrits de façons différentes</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="nc3-rangerDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="nc3RangerDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="nc3RangerDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les chapitres de 4e).
function nc3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="nc3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="nc3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-nombres-calculs-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Répondre par vrai ou faux en justifiant »</h3>
  <p style="margin:0 0 8px;">Un peintre utilise ${nc3Tex('\\dfrac{1}{8}')} d'un pot de peinture pour passer une couche sur un volet (les deux faces). Il doit peindre 4 volets, avec 3 couches chacun. Il affirme qu'un seul pot lui suffira.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Nombre de couches à passer : 4 × 3 = 12.</span><span class="we-comment">On cherche d'abord combien de fois il utilise 1/8 de pot.</span></div>
    ${r4Colonne(nc3Tex('Q = 12 \\times \\dfrac{1}{8} = \\dfrac{12}{8} = 1{,}5')).map((l, i) => `<div class="we-row"><span class="we-expr">${l}</span>${i ? '' : '<span class="we-comment">Quantité de peinture nécessaire, en pots.</span>'}</div>`).join('')}
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">1,5 &gt; 1 : un pot ne suffit pas. L'affirmation est fausse.</span><span class="we-comment">On compare, puis on conclut clairement.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${nc3Exo(1, 'Un éleveur dispose d\'un pré rectangulaire de 120 m sur 45 m, dans lequel il construit une bergerie de 300 m². Pour obtenir un label, il doit prévoir au moins 1,5 m² par brebis dans la bergerie et au moins 20 m² par brebis à l\'extérieur. a) Quelle est l\'aire de la partie extérieure ? b) Combien de brebis peut-il élever au maximum ?', [
    'a) On retire l\'aire de la bergerie à celle du pré (en m²) :', nc3Tex('A = 120 \\times 45 - 300 = 5\\,400 - 300 = 5\\,100'), 'La partie extérieure mesure 5 100 m².',
    'b) Bergerie : 300 ÷ 1,5 = 200 brebis au plus. Extérieur : 5 100 ÷ 20 = 255 brebis au plus.',
    'Les deux règles doivent être respectées : il peut élever au maximum <b>200 brebis</b>.'])}
  ${nc3Exo(2, 'Une terrasse rectangulaire mesure 6 m sur 4,5 m. Le vendeur conseille de commander 8 % de carrelage en plus pour les découpes. Un paquet couvre 1,35 m² et coûte 42 €. a) Quelle surface faut-il commander ? b) Combien de paquets faut-il acheter ? c) Quel est le coût du carrelage ?', [
    'a) Aire de la terrasse augmentée de 8 % (coefficient 1,08), en m² :', nc3Tex('S = 6 \\times 4{,}5 \\times 1{,}08 = 27 \\times 1{,}08 = 29{,}16'), 'Il faut commander 29,16 m².',
    'b) 29,16 ÷ 1,35 = 21,6 : il faut acheter <b>22 paquets</b> (arrondi au-dessus).',
    'c) Coût, en euros :', nc3Tex('P = 22 \\times 42 = 924'), 'Le carrelage coûte 924 €.'])}
  ${nc3Exo(3, 'Un terrain de sport est arrosé par 8 circuits de 5 arroseurs. Chaque arroseur a un débit de 0,3 m³ d\'eau par heure. L\'arrosage se déclenche deux fois par jour, pendant 20 minutes. Combien de litres d\'eau sont consommés pendant le mois de juin (30 jours) ? On rappelle que 1 m³ = 1 000 L.', [
    'Nombre d\'arroseurs : 8 × 5 = 40. Débit total : 40 × 0,3 = 12 m³ par heure.',
    'Durée d\'arrosage par jour : 2 × 20 min = 40 min, soit ' + nc3Tex('\\dfrac{2}{3}') + ' h. Volume par jour, en m³ :', nc3Tex('V = 12 \\times \\dfrac{2}{3} = 8'),
    'En juin : 8 × 30 = 240 m³, soit <b>240 000 L</b>.'])}
  ${nc3Exo(4, 'On lâche une balle d\'une hauteur de 2,5 m. À chaque rebond, elle remonte aux ' + nc3Tex('\\dfrac{4}{5}') + ' de la hauteur d\'où elle est tombée. Quelle est la hauteur atteinte après le troisième rebond ?', [
    nc3Tex('h = 2{,}5 \\times \\dfrac{4}{5} \\times \\dfrac{4}{5} \\times \\dfrac{4}{5} = 2{,}5 \\times \\dfrac{64}{125} = 1{,}28'),
    'Après le troisième rebond, la balle remonte à 1,28 m.'])}
  ${nc3Exo(5, 'Donne la valeur exacte, puis une valeur approchée au millimètre près, de la longueur du côté d\'un carré d\'aire 45 cm².', [
    'Le côté mesure ' + nc3Tex('\\sqrt{45}') + ' cm (valeur exacte).',
    nc3Tex('\\sqrt{45} \\approx 6{,}708') + ' : au millimètre près, le côté mesure <b>6,7 cm</b>.'])}
  ${nc3Exo(6, 'Dans un club de tennis, ' + nc3Tex('\\dfrac{1}{6}') + ' des adhérents ont plus de 50 ans et ' + nc3Tex('\\dfrac{2}{5}') + ' ont moins de 18 ans. Quelle proportion des adhérents a entre 18 et 50 ans ?', [
    nc3Tex('p = 1 - \\dfrac{1}{6} - \\dfrac{2}{5} = \\dfrac{30}{30} - \\dfrac{5}{30} - \\dfrac{12}{30} = \\dfrac{13}{30}'),
    'Les 18-50 ans représentent 13/30 des adhérents.'])}
  ${nc3Exo(7, 'Vrai ou faux ? En 2018, un club comptait 1 250 licenciés, et 1 450 en 2024. Le président affirme que le nombre de licenciés a augmenté de 16 %.', [
    nc3Tex('t = \\dfrac{1\\,450 - 1\\,250}{1\\,250} = \\dfrac{200}{1\\,250} = 0{,}16'),
    '0,16 = 16 % : l\'affirmation est <b>vraie</b>.'])}
  ${nc3Exo(8, 'Un disque dur externe contient 2 500 photos de 6 Mo chacune et 40 vidéos de 1,2 Go chacune. Il reste 50 Go d\'espace libre sur l\'ordinateur. Peut-on y transférer tout le contenu du disque ?', [
    'Photos : 2 500 × 6 = 15 000 Mo = 15 Go (car 1 Go = 1 000 Mo).', 'Vidéos : 40 × 1,2 = 48 Go.',
    'Total : 15 + 48 = 63 Go, et 63 &gt; 50 : le transfert est <b>impossible</b>.'])}
</div>
`;

/* ---- Méthode 1 : carrelage (pertes et paquets) ---- */
function nc3Carrelage(){
  const v = id => Number(document.getElementById(id).value);
  const L = v('nc3-cL'), l = v('nc3-cl'), p = v('nc3-cP'), s = v('nc3-cS');
  document.getElementById('nc3-cLa').textContent = nc3N(L, 1) + ' m';
  document.getElementById('nc3-cla').textContent = nc3N(l, 1) + ' m';
  document.getElementById('nc3-cPa').textContent = p + ' %';
  document.getElementById('nc3-cSa').textContent = nc3N(s, 2) + ' m²';
  const A = Math.round(L * l * 100) / 100, S = A * (1 + p / 100), N = S / s, n = Math.ceil(N - 1e-9);
  // Plan de la pièce à l'échelle et paquets empilés.
  const svg = document.getElementById('nc3-cSvg');
  const k = Math.min(230 / L, 150 / l), W = L * k, H = l * k, x0 = 30, y0 = 20 + (150 - H) / 2;
  let g = `<defs><pattern id="nc3-carreau" width="${k * 0.5}" height="${k * 0.5}" patternUnits="userSpaceOnUse"><rect width="${k * 0.5}" height="${k * 0.5}" fill="#F3ECF7" stroke="#C9B3D6" stroke-width="1"/></pattern></defs>`;
  g += `<rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="url(#nc3-carreau)" stroke="${NC3_ENCRE}" stroke-width="2"/>`;
  g += `<text x="${x0 + W / 2}" y="${y0 - 6}" text-anchor="middle" font-size="13" fill="${NC3_ENCRE}">${nc3N(L, 1)} m</text><text x="${x0 + W + 6}" y="${y0 + H / 2 + 4}" font-size="13" fill="${NC3_ENCRE}">${nc3N(l, 1)} m</text>`;
  const px = 300, cols = 10, cote = 18, aff = Math.min(n, 60);
  for(let i = 0; i < aff; i++){
    const c = i % cols, r = Math.floor(i / cols), der = i === n - 1;
    g += `<rect x="${px + c * (cote + 3)}" y="${22 + r * (cote + 3)}" width="${cote}" height="${cote}" rx="3" fill="${der && N % 1 > 1e-9 ? NC3_ORANGE : NC3_VIOLET}" opacity="${der && N % 1 > 1e-9 ? .85 : .75}"/>`;
  }
  const yl = 22 + Math.ceil(aff / cols) * (cote + 3) + 16;
  g += `<text x="${px}" y="${yl}" font-size="13" font-weight="700" fill="${NC3_ENCRE}">${n} paquet${n > 1 ? 's' : ''}${n > aff ? ' (60 dessinés)' : ''}</text>`;
  if(N % 1 > 1e-9) g += `<text x="${px}" y="${yl + 17}" font-size="12" fill="${NC3_ORANGE}">le dernier sera entamé</text>`;
  svg.innerHTML = g;
  const out = document.getElementById('nc3-cRes');
  out.innerHTML = r4Ex('', [
    [nc3Tex(`A = ${nc3T(L, 1)} \\times ${nc3T(l, 1)} = ${nc3T(A, 2)}`), 'Aire de la pièce, en m².'],
    [nc3Tex(`S = ${nc3T(A, 2)} \\times ${nc3T(1 + p / 100, 2)} ${nc3Exact(S, 2) ? '=' : '\\approx'} ${nc3T(S, 2)}`), p ? `Pertes de ${p} % : on multiplie par 1 + ${p}/100 = ${nc3N(1 + p / 100, 2)}.` : 'Sans pertes, on commande exactement l\'aire de la pièce.'],
    [nc3Tex(`N = ${nc3T(S, 2)} \\div ${nc3T(s, 2)} ${nc3Exact(N, 2) ? '=' : '\\approx'} ${nc3T(N, 2)}`), 'Nombre de paquets nécessaires.'],
    [`Il faut acheter <b>${n} paquet${n > 1 ? 's' : ''}</b>.`, N % 1 > 1e-9 ? `On arrondit au-dessus : avec ${n - 1} paquet${n - 1 > 1 ? 's' : ''}, il manquerait du carrelage.` : 'Le résultat tombe juste : pas besoin d\'arrondir.'],
  ]);
  renderStaticMath(out);
}

/* ---- Méthode 2 : vrai ou faux ---- */
const NC3_VF = [
  { a: '20 − 4 × 3 + 1 = 49', v: false, j: 'On calcule en respectant les priorités : 20 − 4 × 3 + 1 = 20 − 12 + 1 = <b>9</b>. On obtient 49 en calculant (20 − 4) × 3 + 1, ce qui ne respecte pas les priorités.' },
  { a: `${nc3Tex('\\dfrac{3}{14}')} est la moitié de ${nc3Tex('\\dfrac{6}{7}')}.`, v: false, j: `La moitié de ${nc3Tex('\\dfrac{6}{7}')} est ${nc3Tex('\\dfrac{6}{7} \\times \\dfrac{1}{2} = \\dfrac{6}{14} = \\dfrac{3}{7}')}, et non ${nc3Tex('\\dfrac{3}{14}')}.` },
  { a: 'Augmenter un prix de 50 %, puis le baisser de 50 %, le ramène à sa valeur de départ.', v: false, j: 'Contre-exemple : 100 € → 100 × 1,5 = 150 € → 150 × 0,5 = <b>75 €</b>. Le coefficient global est 1,5 × 0,5 = 0,75 : le prix a baissé de 25 %.' },
  { a: 'Le produit de deux nombres entiers consécutifs est toujours pair.', v: true, j: 'De deux entiers consécutifs, l\'un est toujours pair. Un produit dont un facteur est pair est pair (il est multiple de 2).' },
  { a: 'Le carré d\'un nombre est toujours supérieur ou égal à ce nombre.', v: false, j: 'Contre-exemple : 0,5² = 0,25 et 0,25 &lt; 0,5. Un seul contre-exemple suffit.' },
  { a: '3 × 10⁴ + 2 × 10³ = 5 × 10⁷', v: false, j: '3 × 10⁴ + 2 × 10³ = 30 000 + 2 000 = <b>32 000</b> = 3,2 × 10⁴. On n\'additionne pas les exposants dans une somme.' },
  { a: '1 Go = 1 000 Mo', v: true, j: 'Giga = 10⁹ et méga = 10⁶ : 1 Go = 10⁹ octets = 10³ × 10⁶ octets = 1 000 Mo.' },
  { a: `${nc3Tex('\\sqrt{16} + \\sqrt{9} = \\sqrt{25}')}`, v: false, j: `${nc3Tex('\\sqrt{16} + \\sqrt{9} = 4 + 3 = 7')}, alors que ${nc3Tex('\\sqrt{25} = 5')}.` },
  { a: '0,2 × 0,3 = 0,6', v: false, j: '0,2 × 0,3 = <b>0,06</b> : 2 × 3 = 6, et le résultat a deux chiffres après la virgule (un pour chaque facteur).' },
  { a: 'Diviser un nombre par 0,5 revient à le multiplier par 2.', v: true, j: 'Diviser par un nombre, c\'est multiplier par son inverse ; l\'inverse de 0,5 est 2 car 0,5 × 2 = 1.' },
  { a: 'La somme de trois nombres entiers consécutifs est toujours un multiple de 3.', v: true, j: 'Avec n le plus petit : n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1), qui est un multiple de 3 pour tout entier n.' },
  { a: 'Baisser un prix de 20 %, c\'est le multiplier par 0,8.', v: true, j: 'Le coefficient multiplicateur d\'une baisse de 20 % est 1 − 20/100 = 0,8.' },
  { a: `${nc3Tex('\\dfrac{5}{8}')} est plus grand que 0,6.`, v: true, j: `${nc3Tex('\\dfrac{5}{8}')} = 5 ÷ 8 = 0,625, et 0,625 &gt; 0,6.` },
  { a: '−3² = 9', v: false, j: 'Le carré ne porte que sur 3 : −3² = −(3 × 3) = <b>−9</b>. En revanche, (−3)² = 9.' },
];
let nc3VfOrdre = [], nc3VfI = 0, nc3VfRep = false, nc3VfOk = 0, nc3VfTot = 0;
function nc3VfMelanger(){
  nc3VfOrdre = NC3_VF.map((_, i) => i);
  for(let i = nc3VfOrdre.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [nc3VfOrdre[i], nc3VfOrdre[j]] = [nc3VfOrdre[j], nc3VfOrdre[i]]; }
  nc3VfI = 0;
}
function nc3VfAfficher(){
  const it = NC3_VF[nc3VfOrdre[nc3VfI]], aff = document.getElementById('nc3-vfAff');
  if(!aff) return;
  aff.innerHTML = `« ${it.a} »`;
  document.getElementById('nc3-vfJustif').innerHTML = '';
  document.querySelectorAll('#nc3-vfBoutons button').forEach(b => { b.disabled = false; });
  document.getElementById('nc3-vfScore').textContent = nc3VfTot ? `Score : ${nc3VfOk} / ${nc3VfTot}` : `Affirmation ${nc3VfI + 1} sur ${NC3_VF.length}`;
  nc3VfRep = false;
  renderStaticMath(aff);
}
function nc3VfRepondre(rep){
  if(nc3VfRep) return;
  nc3VfRep = true; nc3VfTot++;
  const it = NC3_VF[nc3VfOrdre[nc3VfI]], juste = rep === it.v;
  if(juste) nc3VfOk++;
  document.querySelectorAll('#nc3-vfBoutons button').forEach(b => { b.disabled = true; });
  const j = document.getElementById('nc3-vfJustif');
  j.innerHTML = `<div class="redaction-note" style="background:${juste ? '#EAF5EC' : '#FDECEA'};border-color:${juste ? NC3_VERT : NC3_ROUGE};color:${NC3_ENCRE};"><b style="color:${juste ? NC3_VERT : NC3_ROUGE};">${juste ? 'Bonne réponse' : 'Mauvaise réponse'} :</b> l'affirmation est <b>${it.v ? 'vraie' : 'fausse'}</b>. ${it.j}</div>`;
  document.getElementById('nc3-vfScore').textContent = `Score : ${nc3VfOk} / ${nc3VfTot}`;
  renderStaticMath(j);
}
function nc3VfSuivante(){
  nc3VfI++;
  if(nc3VfI >= nc3VfOrdre.length) nc3VfMelanger();
  nc3VfAfficher();
}

/* ---- Méthode 3 : évolutions successives ---- */
function nc3Pourcent(){
  const v = id => Number(document.getElementById(id).value);
  const V0 = v('nc3-pV'), t1 = v('nc3-p1'), t2 = v('nc3-p2'), c1 = 1 + t1 / 100, c2 = 1 + t2 / 100, V1 = V0 * c1, V2 = V1 * c2, c = c1 * c2, tg = (c - 1) * 100;
  const sg = t => (t > 0 ? '+' : t < 0 ? '−' : '') + Math.abs(t) + ' %';
  document.getElementById('nc3-pVa').textContent = V0 + ' €';
  document.getElementById('nc3-p1a').textContent = sg(t1);
  document.getElementById('nc3-p2a').textContent = sg(t2);
  const svg = document.getElementById('nc3-pSvg'), max = Math.max(V0, V1, V2), base = 185, hMax = 140, lx = [70, 230, 390];
  const bar = (x, val, coul, lab) => { const h = val / max * hMax; return `<rect x="${x}" y="${base - h}" width="70" height="${h}" rx="4" fill="${coul}"/><text x="${x + 35}" y="${base - h - 8}" text-anchor="middle" font-size="14" font-weight="700" fill="${NC3_ENCRE}">${nc3N(val, 2)} €</text><text x="${x + 35}" y="${base + 18}" text-anchor="middle" font-size="12" fill="#4E5665">${lab}</text>`; };
  const fl = (x1, x2, t, co) => `<path d="M${x1 + 74},60 Q${(x1 + x2) / 2 + 35},30 ${x2 - 4},60" fill="none" stroke="${t >= 0 ? NC3_VERT : NC3_ROUGE}" stroke-width="2" marker-end="url(#nc3-fl)"/><text x="${(x1 + x2) / 2 + 35}" y="30" text-anchor="middle" font-size="13" font-weight="700" fill="${t >= 0 ? NC3_VERT : NC3_ROUGE}">× ${nc3N(co, 2)}</text>`;
  svg.innerHTML = `<defs><marker id="nc3-fl" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4E5665"/></marker></defs>
    <line x1="40" y1="${base}" x2="490" y2="${base}" stroke="#8A93A3"/>
    <line x1="40" y1="${base - V0 / max * hMax}" x2="490" y2="${base - V0 / max * hMax}" stroke="${NC3_VIOLET}" stroke-dasharray="5 5" opacity=".6"/>
    ${bar(lx[0], V0, '#B9C3D1', 'départ')}${bar(lx[1], V1, NC3_BLEU, 'après ' + sg(t1))}${bar(lx[2], V2, NC3_VIOLET, 'après ' + sg(t2))}
    ${fl(lx[0], lx[1], t1, c1)}${fl(lx[1], lx[2], t2, c2)}`;
  const exact = nc3Exact(tg, 2), retour = Math.abs(c - 1) < 1e-9;
  const out = document.getElementById('nc3-pRes');
  out.innerHTML = r4Ex('', [
    [nc3Tex(`c = ${nc3T(c1, 2)} \\times ${nc3T(c2, 2)} ${nc3Exact(c, 4) ? '=' : '\\approx'} ${nc3T(c, 4)}`), `Coefficients : ${sg(t1)} donne × ${nc3N(c1, 2)}, ${sg(t2)} donne × ${nc3N(c2, 2)}. Le coefficient global est leur produit.`],
    [retour ? 'Le prix revient exactement à sa valeur de départ.' : `Évolution globale : ${tg > 0 ? 'hausse' : 'baisse'} de ${exact ? '' : 'environ '}<b>${nc3N(Math.abs(tg), 2)} %</b>.`, retour ? 'Le coefficient global vaut 1.' : `${tg > 0 ? 'c − 1' : '1 − c'} = ${nc3N(Math.abs(c - 1), 4)}, soit ${nc3N(Math.abs(tg), 2)} %.` + (t1 + t2 === 0 && t1 !== 0 ? ` Et non 0 % : ${sg(t1)} et ${sg(t2)} ne se compensent pas, car le 2e pourcentage s'applique à un prix qui a déjà changé.` : '')],
  ]);
  renderStaticMath(out);
}

/* ---- Méthode 4 : rebonds ---- */
let nc3BRaf = null;
const NC3_B_REBONDS = 5;
function nc3BalleParams(){
  const H = Number(document.getElementById('nc3-bH').value), [p, q] = document.getElementById('nc3-bF').value.split('/').map(Number);
  const hs = [H]; for(let k = 1; k <= NC3_B_REBONDS; k++) hs.push(hs[k - 1] * p / q);
  return { H, p, q, hs };
}
// Trajectoire : une chute (demi-parabole) puis des arcs dont la largeur varie comme la racine de la hauteur.
function nc3BalleTrajet(hs){
  const sol = 200, k = 170 / Math.ceil(hs[0]), pts = [], x0 = 70;
  const larg = hs.map(h => 38 * Math.sqrt(h));
  const totalL = larg[0] / 2 + larg.slice(1).reduce((s, w) => s + w, 0), e = 420 / totalL;
  let x = x0;
  for(let i = 0; i <= 20; i++){ const s = i / 20; pts.push([x + s * larg[0] / 2 * e, sol - hs[0] * k * (1 - s * s)]); }
  x += larg[0] / 2 * e;
  const sommets = [];
  for(let r = 1; r < hs.length; r++){
    const w = larg[r] * e;
    for(let i = 1; i <= 24; i++){ const s = i / 24; pts.push([x + s * w, sol - 4 * hs[r] * k * s * (1 - s)]); }
    sommets.push([x + w / 2, sol - hs[r] * k, hs[r]]);
    x += w;
  }
  return { pts, sommets, sol, k, x0 };
}
function nc3BalleDessin(prog){
  const svg = document.getElementById('nc3-bSvg'); if(!svg) return;
  const { hs } = nc3BalleParams(), { pts, sommets, sol, k, x0 } = nc3BalleTrajet(hs);
  const idx = Math.min(pts.length - 1, Math.floor(prog * (pts.length - 1)));
  const mMax = Math.ceil(hs[0]);
  let s = `<line x1="44" y1="${sol}" x2="505" y2="${sol}" stroke="${NC3_ENCRE}" stroke-width="2"/>`;
  for(let m = 1; m <= mMax; m++) s += `<line x1="40" y1="${sol - m * k}" x2="48" y2="${sol - m * k}" stroke="#8A93A3"/><text x="36" y="${sol - m * k + 4}" text-anchor="end" font-size="11" fill="#6B6F7A">${m} m</text>`;
  s += `<line x1="44" y1="${sol}" x2="44" y2="${sol - mMax * k}" stroke="#8A93A3"/>`;
  s += `<line x1="${x0}" y1="${sol}" x2="${x0}" y2="${sol - hs[0] * k}" stroke="${NC3_ORANGE}" stroke-width="2" stroke-dasharray="4 4"/><text x="${x0 + 6}" y="${sol - hs[0] * k - 6}" font-size="12" font-weight="700" fill="${NC3_ORANGE}">${nc3N(hs[0], 2)} m</text>`;
  if(idx > 0) s += `<polyline points="${pts.slice(0, idx + 1).map(p => p.map(c => c.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="${NC3_VIOLET}" stroke-width="1.6" stroke-dasharray="3 4" opacity=".7"/>`;
  sommets.forEach(([x, y, h], r) => {
    const atteint = pts.findIndex(p => p[0] >= x - 0.01) <= idx;
    if(atteint) s += `<line x1="${x}" y1="${sol}" x2="${x}" y2="${y}" stroke="${NC3_BLEU}" stroke-width="1.4" stroke-dasharray="3 3"/><text x="${x}" y="${y - 8}" text-anchor="middle" font-size="11" font-weight="700" fill="${NC3_BLEU}">${nc3N(h, 2)} m</text><text x="${x}" y="${sol + 16}" text-anchor="middle" font-size="10" fill="#6B6F7A">rebond ${r + 1}</text>`;
  });
  const b = pts[idx];
  s += `<circle cx="${b[0]}" cy="${b[1] - 8}" r="8" fill="${NC3_ORANGE}" stroke="${NC3_ENCRE}" stroke-width="1.2"/>`;
  svg.innerHTML = s;
}
function nc3Balle(){
  cancelAnimationFrame(nc3BRaf);
  const { H, p, q, hs } = nc3BalleParams();
  document.getElementById('nc3-bHa').textContent = nc3N(H, 1) + ' m';
  nc3BalleDessin(0);
  const f = `\\dfrac{${p}}{${q}}`, h3 = hs[3];
  const out = document.getElementById('nc3-bRes');
  out.innerHTML = r4Ex('', [
    [nc3Tex(`h_1 = ${nc3T(H, 1)} \\times ${f} ${nc3Exact(hs[1], 2) ? '=' : '\\approx'} ${nc3T(hs[1], 2)}`), 'Après le 1er rebond : on prend la fraction de la hauteur de départ (en m).'],
    [nc3Tex(`h_2 = ${nc3T(H, 1)} \\times ${f} \\times ${f} ${nc3Exact(hs[2], 2) ? '=' : '\\approx'} ${nc3T(hs[2], 2)}`), 'Après le 2e rebond : on reprend la fraction de la hauteur précédente.'],
    [nc3Tex(`h_3 = ${nc3T(H, 1)} \\times \\left(${f}\\right)^3 = ${nc3T(H, 1)} \\times \\dfrac{${p ** 3}}{${q ** 3}} ${nc3Exact(h3, 2) ? '=' : '\\approx'} ${nc3T(h3, 2)}`), 'Après le 3e rebond : la fraction est multipliée trois fois, d\'où la puissance 3.'],
  ]);
  renderStaticMath(out);
  const b = document.getElementById('nc3-bBtn'); if(b) b.disabled = false;
}
function nc3Lacher(){
  cancelAnimationFrame(nc3BRaf);
  const b = document.getElementById('nc3-bBtn'); if(b) b.disabled = true;
  const t0 = performance.now(), duree = 4500;
  const f = now => { const p = Math.max(0, Math.min(1, (now - t0) / duree)); nc3BalleDessin(p); if(p < 1) nc3BRaf = requestAnimationFrame(f); else if(b) b.disabled = false; };
  nc3BRaf = requestAnimationFrame(f);
}

/* ---- Méthode 5 : ranger des nombres ---- */
const NC3_RANGER_STEPS = [
  { expr: `Ranger : ${nc3Tex('\\dfrac{7}{20}')} ; 3,6 × 10⁻¹ ; 34 % ; ${nc3Tex('\\sqrt{0{,}09}')} ; 0,351`, note: 'Cinq nombres écrits sous cinq formes différentes : on ne peut pas les comparer directement.' },
  { expr: `${nc3Tex('\\dfrac{7}{20}')} = 7 ÷ 20 = 0,35`, note: 'Une fraction : on divise le numérateur par le dénominateur.' },
  { expr: '3,6 × 10⁻¹ = 0,36', note: 'Multiplier par 10⁻¹, c\'est diviser par 10 : la virgule recule d\'un rang.' },
  { expr: '34 % = 34/100 = 0,34', note: 'Un pourcentage est une fraction de dénominateur 100.' },
  { expr: `${nc3Tex('\\sqrt{0{,}09}')} = 0,3`, note: 'Car 0,3² = 0,09 (et 0,3 est positif).' },
  { expr: '0,3 &lt; 0,34 &lt; 0,35 &lt; 0,351 &lt; 0,36', note: 'Les nombres sont tous décimaux : on compare chiffre à chiffre (0,351 est entre 0,35 et 0,36).' },
  { expr: `${nc3Tex('\\sqrt{0{,}09}')} &lt; 34 % &lt; ${nc3Tex('\\dfrac{7}{20}')} &lt; 0,351 &lt; 3,6 × 10⁻¹`, note: 'On conclut en réécrivant les nombres sous leur forme de départ.' },
];
const nc3RangerDemo = makeStepDemo(NC3_RANGER_STEPS, 'nc3-rangerDisplay');

DEMO_REGISTRY['3e|Nombres et calculs'] = {
  cours: 'cours-demo-nombres-calculs-3e', methode: 'methode-demo-nombres-calculs-3e', exos: 'exos-demo-nombres-calculs-3e', histoire: 'histoire-demo-nombres-calculs-3e',
  init: () => {
    nc3Carrelage(); nc3Pourcent(); nc3Balle(); nc3RangerDemo.reset();
    nc3VfOk = 0; nc3VfTot = 0; nc3VfMelanger(); nc3VfAfficher();
    ['cours-demo-nombres-calculs-3e', 'exos-demo-nombres-calculs-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-nombres-calculs-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-nombres-calculs-3e'));
  }
};

DEMO_QUIZZES['3e|Nombres et calculs'] = [
  { q: '2/3 + 1/4 est égal à...', opts: ['3/7', '11/12', '3/12'], correct: 1 },
  { q: '30 % de 70, c\'est...', opts: ['21', '49', '23,3'], correct: 0 },
  { q: 'Un prix de 50 € augmente de 10 %, puis baisse de 10 %. Il vaut alors...', opts: ['50 €', '49,50 €', '50,50 €'], correct: 1 },
  { q: 'L\'écriture décimale de 7,2 × 10⁴ est...', opts: ['720 000', '72 000', '7 200'], correct: 1 },
  { q: 'Combien de fichiers de 500 Mo peut-on stocker sur une clé de 4 Go ?', opts: ['8', '80', '800'], correct: 0 },
  { q: 'Une valeur approchée au dixième de √20 est...', opts: ['4,5', '4,4', '10'], correct: 0 },
  { q: 'Avec 10 L de jus, combien de bouteilles de 0,75 L peut-on remplir complètement ?', opts: ['13', '14', '7,5'], correct: 0 },
];

/* ============================================================
   CHAPITRE : Théorème de Pythagore (4e, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Ah ce bon vieux Pythagore ! Le théorème lui appartient-il vraiment ? Partie histoire
   sûrement intéressante" (captures du manuel p. 84-86 : carré et racine carrée, vocabulaire du
   triangle rectangle, théorème direct, triangle non rectangle, réciproque). Plan du manuel, titres
   reformulés, exemples nouveaux ; page histoire développée (frise, tablettes babyloniennes, figure
   chinoise). Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const PY4_BLEU = '#0C5BA0', PY4_ORANGE = '#E07B00', PY4_VERT = '#1E7B34', PY4_ENCRE = '#1C1B2E', PY4_ROUGE = '#C0392B';
// Une formule courte (ex. BC² = AB² + AC²) n'est jamais coupée en fin de ligne ; une longue peut l'être.
const py4Tex = s => `<span class="tex"${s.length < 26 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
// Nombre à la française (virgule, 4 décimales au plus).
const py4N = v => String(Math.round(v * 10000) / 10000).replace('.', ',').replace('-', '−');
const PY4_VB_PREUVE = '0 0 520 300';

/* ---- Petites figures « à main levée » : triangle, noms des sommets, longueurs, angle droit ---- */
// pts : [[nom, x, y], ×3] ; droit : indice du sommet de l'angle droit (ou -1) ; cotes : [[i, j, texte, couleur?]].
function py4Fig(pts, droit, cotes, opts){
  opts = opts || {};
  const [gx, gy] = [(pts[0][1] + pts[1][1] + pts[2][1]) / 3, (pts[0][2] + pts[1][2] + pts[2][2]) / 3];
  let s = `<polygon points="${pts.map(p => p[1] + ',' + p[2]).join(' ')}" fill="${opts.fond || 'rgba(12,91,160,.08)'}" stroke="${PY4_ENCRE}" stroke-width="1.8" stroke-linejoin="round"/>`;
  if(opts.hyp) { const [i, j] = opts.hyp; s += `<line x1="${pts[i][1]}" y1="${pts[i][2]}" x2="${pts[j][1]}" y2="${pts[j][2]}" stroke="${PY4_ORANGE}" stroke-width="3.2"/>`; }
  if(droit >= 0){
    const V = pts[droit], P = pts[(droit + 1) % 3], Q = pts[(droit + 2) % 3];
    const u = [P[1] - V[1], P[2] - V[2]], v = [Q[1] - V[1], Q[2] - V[2]], lu = Math.hypot(...u), lv = Math.hypot(...v), k = 11;
    const a = [V[1] + u[0] / lu * k, V[2] + u[1] / lu * k], b = [a[0] + v[0] / lv * k, a[1] + v[1] / lv * k], c = [V[1] + v[0] / lv * k, V[2] + v[1] / lv * k];
    s += `<polyline points="${a.join(',')} ${b.join(',')} ${c.join(',')}" fill="none" stroke="${PY4_ENCRE}" stroke-width="1.4"/>`;
  }
  pts.forEach(([n, x, y]) => { const dx = x - gx, dy = y - gy, l = Math.hypot(dx, dy) || 1; s += `<text x="${(x + dx / l * 13).toFixed(1)}" y="${(y + dy / l * 13 + 5).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="${PY4_ENCRE}">${n}</text>`; });
  (cotes || []).forEach(([i, j, t, coul]) => {
    // Écart au côté selon la largeur du texte : un côté penché demande plus de place.
    const mx = (pts[i][1] + pts[j][1]) / 2, my = (pts[i][2] + pts[j][2]) / 2, dx = mx - gx, dy = my - gy, l = Math.hypot(dx, dy) || 1;
    const off = 8 + Math.abs(dx / l) * String(t).length * 3.9 + Math.abs(dy / l) * 7;
    s += `<text x="${(mx + dx / l * off).toFixed(1)}" y="${(my + dy / l * off + 5).toFixed(1)}" text-anchor="middle" font-size="13.5" font-weight="700" fill="${coul || PY4_BLEU}">${t}</text>`;
  });
  return `<svg viewBox="${opts.vb || '0 0 260 150'}" style="width:100%;max-width:${opts.max || 280}px;display:block;margin:6px auto;">${s}</svg>`;
}
// Tableau simple (première colonne en en-tête), qui défile sur téléphone.
function py4Tab(lignes){
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.93rem;">${lignes.map(l => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:5px 9px;text-align:center;${j === 0 ? 'background:#F4F5F8;font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
const py4Deux = (a, b) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 18px;align-items:center;">${a}${b}</div>`;

document.getElementById('cours-demo-pythagore-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Carré et racine carrée</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Le carré d'un nombre</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Le <b>carré</b> d'un nombre <i>a</i> est le nombre positif ${py4Tex('a^2 = a \\times a')}.</div>
<p class="example-title">Les carrés des premiers nombres entiers (les « carrés parfaits ») sont à connaître :</p>
${py4Tab([[py4Tex('a'), ...Array.from({ length: 16 }, (_, i) => i)], [py4Tex('a^2'), ...Array.from({ length: 16 }, (_, i) => i * i)]])}
<div class="redaction-note" ${R4_REM}>Remarques : un carré est toujours positif, par exemple ${py4Tex('(-7)^2 = 49')}. Avec une calculatrice, on utilise la touche ${py4Tex('x^2')}.</div>

<div class="sub-header"><span class="letter">B</span><h4>La racine carrée d'un nombre positif</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>racine carrée</b> d'un nombre <i>a</i> <b>positif</b> est le nombre <b>positif</b>, noté ${py4Tex('\\sqrt{a}')}, dont le carré est <i>a</i>. Pour tout nombre <i>a</i> positif : ${py4Tex('\\left(\\sqrt{a}\\right)^2 = a')}.</div>
${py4Deux(`<div>
  <span class="prop-badge">Propriété 1</span>
  <div class="def-box">Pour tout nombre <i>a</i> positif, ${py4Tex('\\sqrt{a}')} est la <b>longueur du côté d'un carré d'aire <i>a</i></b>.</div>
  <span class="prop-badge">Propriété 2</span>
  <div class="def-box">Pour tout nombre <i>a</i> positif, ${py4Tex('\\sqrt{a^2} = a')}.</div></div>`,
  `<svg viewBox="0 0 220 170" style="width:100%;max-width:220px;display:block;margin:0 auto;"><rect x="50" y="20" width="120" height="120" fill="#DCE9F6" stroke="${PY4_BLEU}" stroke-width="2"/>${Array.from({ length: 5 }, (_, i) => `<line x1="${50 + (i + 1) * 20}" y1="20" x2="${50 + (i + 1) * 20}" y2="140" stroke="${PY4_BLEU}" stroke-opacity=".35"/><line x1="50" y1="${20 + (i + 1) * 20}" x2="170" y2="${20 + (i + 1) * 20}" stroke="${PY4_BLEU}" stroke-opacity=".35"/>`).join('')}<text x="110" y="86" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_BLEU}">Aire 36</text><text x="110" y="162" text-anchor="middle" font-size="15" font-weight="700" fill="${PY4_ORANGE}">côté √36 = 6</text></svg>`)}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${py4Tex('\\sqrt{36} = 6')} car ${py4Tex('6^2 = 36')} (et 6 est positif) : un carré d'aire 36 a des côtés de longueur 6.</li>
  <li>${py4Tex('\\sqrt{7^2} = \\sqrt{49} = 7')} ; ${py4Tex('\\sqrt{0} = 0')} ; ${py4Tex('\\sqrt{1} = 1')}.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarques : le symbole ${py4Tex('\\sqrt{\\phantom{a}}')} s'appelle un <b>radical</b>. La racine carrée d'un nombre <b>négatif</b> n'existe pas (aucun carré n'est négatif). Avec une calculatrice (touche ${py4Tex('\\sqrt{\\phantom{x}}')}), on obtient la valeur exacte ou une valeur approchée :
<ul style="margin:4px 0 0;padding-left:20px;">
  <li>${py4Tex('\\sqrt{56{,}25} = 7{,}5')} : 7,5 est la <b>valeur exacte</b> de ${py4Tex('\\sqrt{56{,}25}')} (car 7,5 × 7,5 = 56,25) ;</li>
  <li>${py4Tex('\\sqrt{50} \\approx 7{,}1')} : 7,1 est une <b>valeur approchée</b> au dixième de ${py4Tex('\\sqrt{50}')} (la calculatrice affiche 7,071067…). On peut aussi l'<b>encadrer</b> : 49 < 50 < 64, donc 7 < ${py4Tex('\\sqrt{50}')} < 8.</li>
</ul></div>

<div class="lesson-header"><span class="num">2</span><h3>Le vocabulaire du triangle rectangle</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un <b>triangle rectangle</b> est un triangle qui a un angle droit.</li>
  <li>Le côté opposé à l'angle droit s'appelle l'<b>hypoténuse</b>. C'est le <b>plus grand côté</b> du triangle rectangle.</li>
</ul></div>
${py4Deux(`<ul class="example-list">
  <li>RST est un <b>triangle rectangle en S</b>.</li>
  <li>[RT], le côté opposé à l'angle droit, est son <b>hypoténuse</b> (en orange).</li>
  <li>Les deux autres côtés, [SR] et [ST], sont perpendiculaires : ce sont les <b>côtés de l'angle droit</b>.</li>
</ul>`, py4Fig([['R', 50, 30], ['S', 50, 120], ['T', 215, 120]], 1, [], { hyp: [0, 2] }))}

<div class="lesson-header"><span class="num">3</span><h3>Le théorème de Pythagore</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>L'énoncé</h4></div>
<span class="prop-badge">Théorème</span>
<div class="def-box"><b>Si</b> un triangle est rectangle, <b>alors</b> le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.</div>
${py4Deux(`<ul class="example-list"><li>ABC est un triangle <b>rectangle en A</b>, d'hypoténuse [BC].<br>D'après le théorème de Pythagore : ${py4Tex('BC^2 = AB^2 + AC^2')}.</li></ul>`, py4Fig([['A', 50, 120], ['B', 215, 120], ['C', 50, 30]], 0, [], { hyp: [1, 2] }))}
<div class="redaction-note" ${R4_REM}>Astuce : dans l'égalité, l'hypoténuse est <b>seule</b> de son côté du signe =. Une démonstration animée du théorème est dans l'onglet Méthode.</div>

<div class="sub-header"><span class="letter">B</span><h4>Calculer la longueur de l'hypoténuse</h4></div>
<p class="example-title">Exemple : GHI est un triangle rectangle en H tel que GH = 4,5 cm et HI = 6 cm. Calculer GI.</p>
${py4Deux(py4Fig([['G', 50, 26], ['H', 50, 125], ['I', 182, 125]], 1, [[0, 1, '4,5 cm'], [1, 2, '6 cm'], [0, 2, '?', PY4_ORANGE]], { hyp: [0, 2] }), r4Ex('', [
  ['Le triangle GHI est rectangle en H : son hypoténuse est [GI].', ''],
  ['D\'après le théorème de Pythagore : ' + py4Tex('GI^2 = GH^2 + HI^2'), ''],
  [py4Tex('GI^2 = 4{,}5^2 + 6^2 = 20{,}25 + 36 = 56{,}25'), ''],
  [py4Tex('GI = \\sqrt{56{,}25} = 7{,}5') + ' cm', 'Valeur exacte (la calculatrice affiche 7,5).'],
]))}

<div class="sub-header"><span class="letter">C</span><h4>Calculer la longueur d'un côté de l'angle droit</h4></div>
<p class="example-title">Exemple : EFG est un triangle rectangle en F tel que EG = 9 cm et EF = 5 cm. Calculer FG.</p>
${py4Deux(py4Fig([['E', 40, 45], ['F', 40, 125], ['G', 184, 125]], 1, [[0, 1, '5 cm'], [0, 2, '9 cm'], [1, 2, '?', PY4_ORANGE]], { hyp: [0, 2] }), r4Ex('', [
  ['Le triangle EFG est rectangle en F : son hypoténuse est [EG].', ''],
  ['D\'après le théorème de Pythagore : ' + py4Tex('EG^2 = EF^2 + FG^2'), ''],
  [py4Tex('9^2 = 5^2 + FG^2'), 'On remplace par les longueurs connues.'],
  [py4Tex('FG^2 = 81 - 25 = 56'), 'Pour trouver un côté de l\'angle droit, on soustrait.'],
  [py4Tex('FG = \\sqrt{56}') + ' cm (valeur exacte) ; FG ≈ 7,5 cm (valeur approchée au dixième).', ''],
]))}

<div class="sub-header"><span class="letter">D</span><h4>Prouver qu'un triangle n'est pas rectangle</h4></div>
<p class="example-title">Exemple : MNP est un triangle tel que MN = 6,5 cm, NP = 7,2 cm et MP = 9,8 cm. Le triangle MNP est-il rectangle ?</p>
${py4Deux(py4Fig([['M', 30, 120], ['N', 118, 25], ['P', 226, 120]], -1, [[0, 1, '6,5 cm'], [1, 2, '7,2 cm'], [0, 2, '9,8 cm']]), r4Ex('', [
  ['Le plus grand côté est [MP] : on calcule séparément.', 'Si MNP était rectangle, [MP] serait son hypoténuse.'],
  [py4Tex('MP^2 = 9{,}8^2 = 96{,}04'), ''],
  [py4Tex('MN^2 + NP^2 = 6{,}5^2 + 7{,}2^2 = 42{,}25 + 51{,}84 = 94{,}09'), ''],
  ['Donc ' + py4Tex('MP^2 \\neq MN^2 + NP^2') + '.', 'Si MNP était rectangle, on aurait l\'égalité (théorème de Pythagore).'],
  ['Le triangle MNP n\'est donc pas rectangle.', ''],
]))}

<div class="lesson-header"><span class="num">4</span><h3>La réciproque du théorème de Pythagore</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>L'énoncé</h4></div>
<span class="prop-badge">Théorème (réciproque)</span>
<div class="def-box"><b>Si</b>, dans un triangle, le carré de la longueur du plus grand côté est égal à la somme des carrés des longueurs des deux autres côtés, <b>alors</b> ce triangle est rectangle. Le plus grand côté est son hypoténuse.</div>
${py4Deux(`<ul class="example-list"><li>ABC est un triangle tel que ${py4Tex('BC^2 = AB^2 + AC^2')}.<br>D'après la réciproque du théorème de Pythagore, ABC est <b>rectangle en A</b> : l'angle droit est le sommet opposé au plus grand côté [BC].</li></ul>`, py4Fig([['A', 60, 120], ['B', 215, 120], ['C', 60, 35]], 0, [], { hyp: [1, 2], fond: 'rgba(30,123,52,.1)' }))}

<div class="sub-header"><span class="letter">B</span><h4>Prouver qu'un triangle est rectangle</h4></div>
<p class="example-title">Exemple : IJK est un triangle tel que IJ = 6,5 cm, JK = 7,2 cm et IK = 9,7 cm. Démontrer que IJK est rectangle.</p>
${py4Deux(py4Fig([['I', 30, 120], ['J', 117, 24], ['K', 224, 120]], 1, [[0, 1, '6,5 cm'], [1, 2, '7,2 cm'], [0, 2, '9,7 cm']], { fond: 'rgba(30,123,52,.1)' }), r4Ex('', [
  ['Le plus grand côté est [IK] : on calcule séparément.', ''],
  [py4Tex('IK^2 = 9{,}7^2 = 94{,}09'), ''],
  [py4Tex('IJ^2 + JK^2 = 6{,}5^2 + 7{,}2^2 = 42{,}25 + 51{,}84 = 94{,}09'), ''],
  ['Donc ' + py4Tex('IK^2 = IJ^2 + JK^2') + '.', ''],
  ['D\'après la réciproque du théorème de Pythagore, le triangle IJK est rectangle en J.', 'J est le sommet opposé au plus grand côté.'],
]))}
<div class="redaction-note" ${R4_REM}>Comparez avec le 3 D : les triangles MNP et IJK ne diffèrent que de 1 mm sur le plus grand côté, et pourtant l'un est rectangle et l'autre non ! Une figure ne suffit jamais pour <b>prouver</b> qu'un angle est droit.</div>
`;

/* ---- Page histoire : « Le théorème appartient-il vraiment à Pythagore ? » ---- */
const PY4_FRISE = [
  ['vers 1800 av. J.-C.', 'Babylone (Irak actuel)', 'Des scribes gravent dans l\'argile des calculs qui utilisent déjà la relation : la tablette <b>YBC 7289</b> (ci-dessous) donne la diagonale d\'un carré de côté 30, et la tablette <b>Plimpton 322</b> dresse une liste de triangles rectangles à côtés entiers, comme 119, 120 et 169 (119² + 120² = 169²). Mais aucune démonstration n\'y figure.'],
  ['?', 'Égypte ancienne', 'On raconte souvent que les arpenteurs égyptiens, les « tendeurs de corde », traçaient des angles droits avec une corde à 13 nœuds formant un triangle 3-4-5. C\'est une jolie <b>légende</b> : aucun document égyptien connu ne le prouve.'],
  ['vers 800-500 av. J.-C.', 'Inde', 'Les <b>Śulba-sūtras</b>, des manuels pour construire les autels du feu, énoncent la règle : la corde tendue le long de la diagonale d\'un rectangle produit autant (d\'aire) que les deux côtés réunis.'],
  ['vers 570-495 av. J.-C.', 'Grèce : Samos, puis Crotone (Italie)', '<b>Pythagore</b> fonde une école où l\'on étudie les nombres. Il n\'a rien écrit ! Ce sont des auteurs venus des siècles plus tard qui lui attribuent le théorème, et racontent qu\'il aurait sacrifié cent bœufs pour fêter sa découverte, une légende peu crédible pour un maître réputé végétarien… Ses disciples ont peut-être été les premiers à le <b>démontrer</b> en général, pour tous les triangles rectangles.'],
  ['vers 300 av. J.-C.', 'Alexandrie (Égypte)', '<b>Euclide</b> écrit ses <i>Éléments</i> : c\'est la plus ancienne démonstration qui nous soit parvenue (livre I, proposition 47). La réciproque, que tu utilises aussi, est la proposition suivante, la 48.'],
  ['vers le 1er siècle av. J.-C.', 'Chine', 'Le <b>Zhoubi suanjing</b> présente le « théorème du gou-gu » avec une figure, le <i>xian tu</i> (ci-dessous) : un puzzle qui démontre le théorème pour le triangle 3-4-5. C\'est la même idée que la démonstration animée de l\'onglet Méthode.'],
  ['1525', 'Allemagne', 'Le symbole √ apparaît dans un livre de <b>Christoph Rudolff</b>. On pense que c\'est un « r » déformé, pour <i>radix</i> (« racine » en latin).'],
  ['1876 et 1940', 'États-Unis', 'James Garfield, futur président des États-Unis, publie sa propre démonstration. En 1940, Elisha Loomis en rassemble <b>367</b> dans un livre : c\'est l\'un des théorèmes les plus démontrés de l\'histoire !'],
];
function py4Tablette(){
  // YBC 7289 : un carré, ses diagonales, et les nombres en base 60 (transcrits) : 30 ; 1;24,51,10 ; 42;25,35.
  return `<svg viewBox="0 0 240 220" style="width:100%;max-width:240px;display:block;margin:0 auto;"><ellipse cx="120" cy="108" rx="104" ry="98" fill="#D9C3A0" stroke="#A88A5E" stroke-width="2"/><ellipse cx="112" cy="100" rx="90" ry="84" fill="#E3D0B0" opacity=".6"/>
  <polygon points="120,32 196,108 120,184 44,108" fill="none" stroke="#6B5234" stroke-width="2.4"/><line x1="44" y1="108" x2="196" y2="108" stroke="#6B5234" stroke-width="2"/><line x1="120" y1="32" x2="120" y2="184" stroke="#6B5234" stroke-width="2"/>
  <text x="70" y="62" font-size="14" font-weight="700" fill="#4A3620" transform="rotate(-45 70 62)">30</text>
  <text x="158" y="101" text-anchor="middle" font-size="12" font-weight="700" fill="#4A3620">1;24,51,10</text>
  <text x="152" y="126" text-anchor="middle" font-size="12" font-weight="700" fill="#4A3620">42;25,35</text></svg>
  <p style="font-size:.85rem;margin:4px 0 0;text-align:center;">Tablette YBC 7289 (université Yale), vers 1800 av. J.-C. : côté 30, et sur la diagonale 1;24,51,10 en base 60, soit 1 + 24/60 + 51/60² + 10/60³ ≈ <b>1,414 213</b>, une valeur de √2 juste au millionième ! La diagonale vaut 30 × √2 ≈ 42;25,35.</p>`;
}
function py4XianTu(){
  // Carré 7 × 7 ; carré intérieur incliné de côté 5 (sommets à 3 et 4 unités des coins) ; 4 triangles 3-4-5.
  const u = 26, o = 12, P = (x, y) => `${o + x * u},${o + y * u}`;
  let s = '';
  for(let i = 0; i <= 7; i++) s += `<line x1="${o + i * u}" y1="${o}" x2="${o + i * u}" y2="${o + 7 * u}" stroke="#8A93A3" stroke-width=".8"/><line x1="${o}" y1="${o + i * u}" x2="${o + 7 * u}" y2="${o + i * u}" stroke="#8A93A3" stroke-width=".8"/>`;
  const tri = [[[0, 0], [3, 0], [0, 4]], [[7, 0], [7, 3], [3, 0]], [[7, 7], [4, 7], [7, 3]], [[0, 7], [0, 4], [4, 7]]];
  s = tri.map(t => `<polygon points="${t.map(p => P(...p)).join(' ')}" fill="${PY4_ROUGE}" fill-opacity=".35" stroke="${PY4_ROUGE}" stroke-width="1.6"/>`).join('') + s;
  s += `<polygon points="${[[3, 0], [7, 3], [4, 7], [0, 4]].map(p => P(...p)).join(' ')}" fill="#F6D58E" fill-opacity=".55" stroke="${PY4_ENCRE}" stroke-width="2.2"/><rect x="${o}" y="${o}" width="${7 * u}" height="${7 * u}" fill="none" stroke="${PY4_ENCRE}" stroke-width="2.4"/>`;
  return `<svg viewBox="0 0 206 206" style="width:100%;max-width:220px;display:block;margin:0 auto;">${s}</svg>
  <p style="font-size:.85rem;margin:4px 0 0;text-align:center;">Le <i>xian tu</i> chinois : dans le carré 7 × 7, les 4 triangles rouges ont des côtés 3 et 4. Le carré jaune du milieu a une aire de 49 − 4 × 6 = <b>25</b> : son côté (l'hypoténuse) mesure 5, et 5² = 3² + 4².</p>`;
}
document.getElementById('histoire-demo-pythagore-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : le théorème appartient-il vraiment à Pythagore ?</div>
  <p style="margin:6px 0 10px;">Réponse courte : <b>non</b>, pas vraiment ! La relation entre les côtés d'un triangle rectangle était connue <b>plus de mille ans avant</b> Pythagore, sur plusieurs continents. Mais la <b>démonstration</b>, qui prouve que c'est vrai pour <i>tous</i> les triangles rectangles, est bien une idée grecque. Voici l'enquête :</p>
  <div style="border-left:3px solid ${PY4_BLEU};margin:0 0 12px 6px;padding-left:14px;">
    ${PY4_FRISE.map(([date, lieu, txt]) => `<div style="position:relative;margin:0 0 12px;"><span style="position:absolute;left:-21px;top:4px;width:11px;height:11px;border-radius:50%;background:${PY4_BLEU};"></span><div style="font-weight:700;color:${PY4_BLEU};">${date} · ${lieu}</div><div>${txt}</div></div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px;align-items:start;">
    <div>${py4Tablette()}</div>
    <div>${py4XianTu()}</div>
  </div>
  <p style="margin:12px 0 0;">Alors, pourquoi « Pythagore » ? Parce que les mathématiciens grecs ont été les premiers, à notre connaissance, à <b>démontrer</b> des résultats au lieu de les constater sur des exemples, et que la tradition a donné le nom du maître le plus célèbre. En Chine, on parle d'ailleurs encore aujourd'hui du « théorème du gou-gu » !</p>
</div>
`;

document.getElementById('methode-demo-pythagore-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : carré et racine carrée</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites glisser le curseur pour changer l'aire du carré : sa longueur de côté est la racine carrée de l'aire.</p>
  <svg id="py4-racSvg" viewBox="0 0 520 250" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div style="display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;">
    <label for="py4-racVal">Aire du carré :</label>
    <input id="py4-racVal" type="range" min="1" max="200" step="1" value="50" style="width:240px;" oninput="py4Racine()">
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : pourquoi le théorème est vrai (démonstration animée)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="py4-preuveSvg" viewBox="${PY4_VB_PREUVE}" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="py4-preuveSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="py4-preuveNext" onclick="py4PreuveDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="py4PreuveDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer une longueur dans un triangle rectangle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Le triangle ABC est rectangle en A. Choisissez la longueur cherchée et donnez les deux autres (en cm) : la rédaction complète s'affiche.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <label>On cherche <select id="py4-lCherche" onchange="py4Longueur()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"><option value="BC">BC (l'hypoténuse)</option><option value="AC">AC (un côté de l'angle droit)</option></select></label>
    <label><span id="py4-lLab1">AB</span> = <input id="py4-l1" type="text" inputmode="decimal" value="4,5" style="width:70px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;" oninput="py4Longueur()"></label>
    <label><span id="py4-lLab2">AC</span> = <input id="py4-l2" type="text" inputmode="decimal" value="6" style="width:70px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;" oninput="py4Longueur()"></label>
  </div>
  <div id="py4-lFig"></div>
  <div id="py4-lRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : ce triangle est-il rectangle ?</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Donnez les trois longueurs du triangle EFG (en cm) : le triangle est dessiné et la conclusion est rédigée avec le théorème ou sa réciproque.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    ${['EF', 'FG', 'EG'].map((c, i) => `<label>${c} = <input id="py4-r${c}" type="text" inputmode="decimal" value="${['6,5', '7,2', '9,7'][i]}" style="width:70px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;" oninput="py4Rectangle()"></label>`).join('')}
  </div>
  <div id="py4-rFig"></div>
  <div id="py4-rRes"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function py4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="py4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="py4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-pythagore-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer la longueur d'un côté de l'angle droit »</h3>
  <p style="margin:0 0 8px;">LMN est un triangle rectangle en M tel que LN = 11 cm et LM = 7 cm. Calculer MN, arrondie au dixième.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Le triangle LMN est rectangle en M, son hypoténuse est [LN].</span><span class="we-comment">On cite l'hypothèse et on repère l'hypoténuse.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème de Pythagore : ${py4Tex('LN^2 = LM^2 + MN^2')}</span><span class="we-comment">On cite le théorème et on écrit l'égalité.</span></div>
    <div class="we-row"><span class="we-expr">${py4Tex('11^2 = 7^2 + MN^2')}</span><span class="we-comment">On remplace par les longueurs connues.</span></div>
    <div class="we-row"><span class="we-expr">${py4Tex('MN^2 = 121 - 49 = 72')}</span><span class="we-comment">On isole le carré cherché.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">${py4Tex('MN = \\sqrt{72}')} cm (valeur exacte), MN ≈ 8,5 cm (au dixième).</span><span class="we-comment">On prend la racine carrée et on arrondit.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${py4Exo(1, 'Calcule sans calculatrice : ' + py4Tex('9^2') + ' ; ' + py4Tex('0{,}5^2') + ' ; ' + py4Tex('\\sqrt{81}') + ' ; ' + py4Tex('\\sqrt{13^2}') + ' ; ' + py4Tex('\\sqrt{0{,}49}') + '.', [
    py4Tex('9^2 = 81') + ' ; ' + py4Tex('0{,}5^2 = 0{,}25') + ' ; ' + py4Tex('\\sqrt{81} = 9') + ' ; ' + py4Tex('\\sqrt{13^2} = 13') + ' ; ' + py4Tex('\\sqrt{0{,}49} = 0{,}7') + ' (car 0,7 × 0,7 = 0,49).'])}
  ${py4Exo(2, 'Encadre ' + py4Tex('\\sqrt{70}') + ' entre deux nombres entiers consécutifs, puis donne sa valeur approchée au dixième.', [
    '64 < 70 < 81, c\'est-à-dire ' + py4Tex('8^2 < 70 < 9^2') + ', donc ' + py4Tex('8 < \\sqrt{70} < 9') + '.',
    'La calculatrice affiche 8,366 6… donc ' + py4Tex('\\sqrt{70} \\approx 8{,}4') + '.'])}
  ${py4Exo(3, 'PQR est un triangle rectangle en Q. Nomme son hypoténuse et écris l\'égalité de Pythagore.', [
    'L\'hypoténuse est le côté opposé à l\'angle droit : [PR].', 'D\'après le théorème de Pythagore : ' + py4Tex('PR^2 = PQ^2 + QR^2') + '.'])}
  ${py4Exo(4, 'ABC est un triangle rectangle en A tel que AB = 20 cm et AC = 21 cm. Calcule BC.', [
    'ABC est rectangle en A, d\'hypoténuse [BC]. D\'après le théorème de Pythagore : ' + py4Tex('BC^2 = AB^2 + AC^2 = 400 + 441 = 841') + '.',
    py4Tex('BC = \\sqrt{841} = 29') + ' cm.'])}
  ${py4Exo(5, 'DEF est un triangle rectangle en E tel que DF = 8 cm et DE = 3,5 cm. Calcule EF, arrondie au dixième.', [
    'DEF est rectangle en E, d\'hypoténuse [DF]. D\'après le théorème de Pythagore : ' + py4Tex('DF^2 = DE^2 + EF^2') + '.',
    py4Tex('EF^2 = 8^2 - 3{,}5^2 = 64 - 12{,}25 = 51{,}75'),
    py4Tex('EF = \\sqrt{51{,}75}') + ' cm, donc EF ≈ 7,2 cm.'])}
  ${py4Exo(6, 'Ces triangles sont-ils rectangles ? a) côtés 11 cm, 60 cm et 61 cm ; b) côtés 5 cm, 7 cm et 9 cm.', [
    'a) Le plus grand côté mesure 61 cm. On calcule séparément :', py4Tex('A = 61^2 = 3\\,721'), py4Tex('B = 11^2 + 60^2 = 121 + 3\\,600 = 3\\,721'),
    'A = B : d\'après la réciproque du théorème de Pythagore, le triangle est rectangle.',
    'b) Le plus grand côté mesure 9 cm. On calcule séparément :', py4Tex('C = 9^2 = 81'), py4Tex('D = 5^2 + 7^2 = 25 + 49 = 74'),
    'C ≠ D : le triangle n\'est pas rectangle (sinon on aurait l\'égalité de Pythagore).'])}
  ${py4Exo(7, 'Une échelle de 5 m est posée contre un mur vertical. Son pied est à 1,4 m du mur. À quelle hauteur l\'échelle touche-t-elle le mur ?', [
    'Le mur, le sol et l\'échelle forment un triangle rectangle (au pied du mur), dont l\'hypoténuse est l\'échelle.',
    'On note <i>h</i> la hauteur cherchée. D\'après le théorème de Pythagore :', py4Tex('h^2 = 5^2 - 1{,}4^2 = 25 - 1{,}96 = 23{,}04'),
    py4Tex('h = \\sqrt{23{,}04} = 4{,}8') + ' : l\'échelle touche le mur à <b>4,8 m</b> de hauteur.'])}
  ${py4Exo(8, 'Pour vérifier que deux murs sont perpendiculaires, un maçon mesure 60 cm le long d\'un mur, 80 cm le long de l\'autre (à partir du coin), puis la distance entre les deux marques : il trouve 1 m. Les murs sont-ils perpendiculaires ?', [
    'Le plus grand côté mesure 100 cm. On calcule séparément :', py4Tex('A = 100^2 = 10\\,000'), py4Tex('B = 60^2 + 80^2 = 3\\,600 + 6\\,400 = 10\\,000'),
    'A = B.',
    'D\'après la réciproque du théorème de Pythagore, le triangle est rectangle au coin : les murs sont perpendiculaires. (C\'est le triangle 3-4-5 agrandi 20 fois, la « règle du 3-4-5 » des maçons !)'])}
</div>
`;

/* ---- Méthode 1 : carré et racine carrée ---- */
function py4Racine(){
  const A = Number(document.getElementById('py4-racVal').value), svg = document.getElementById('py4-racSvg'); if(!svg) return;
  const r = Math.sqrt(A), k = 15, c = r * k, x0 = 24, y0 = 18, n = Math.floor(r + 1e-9), exact = Math.abs(n * n - A) < 1e-9;
  let s = `<rect x="${x0}" y="${y0}" width="${c}" height="${c}" fill="#DCE9F6" stroke="${PY4_BLEU}" stroke-width="2"/>`;
  for(let i = 1; i < r; i++) s += `<line x1="${x0 + i * k}" y1="${y0}" x2="${x0 + i * k}" y2="${y0 + c}" stroke="${PY4_BLEU}" stroke-opacity=".3"/><line x1="${x0}" y1="${y0 + i * k}" x2="${x0 + c}" y2="${y0 + i * k}" stroke="${PY4_BLEU}" stroke-opacity=".3"/>`;
  s += `<line x1="${x0}" y1="${y0 + c + 10}" x2="${x0 + c}" y2="${y0 + c + 10}" stroke="${PY4_ORANGE}" stroke-width="2.4"/><line x1="${x0}" y1="${y0 + c + 5}" x2="${x0}" y2="${y0 + c + 15}" stroke="${PY4_ORANGE}" stroke-width="2"/><line x1="${x0 + c}" y1="${y0 + c + 5}" x2="${x0 + c}" y2="${y0 + c + 15}" stroke="${PY4_ORANGE}" stroke-width="2"/>`;
  const X = 270, L = (y, t, opt) => `<text x="${X}" y="${y}" font-size="${opt && opt.t || 17}" font-weight="${opt && opt.g ? 700 : 400}" fill="${opt && opt.c || PY4_ENCRE}">${t}</text>`;
  s += L(50, `Aire du carré : ${A}`, { g: 1, c: PY4_BLEU, t: 19 });
  s += L(86, `Côté : √${A}`, { g: 1, c: PY4_ORANGE, t: 19 });
  if(exact) s += L(124, `√${A} = ${n} (valeur exacte)`, { g: 1, c: PY4_VERT }) + L(152, `car ${n} × ${n} = ${A}`);
  else s += L(124, `√${A} ≈ ${py4N(Math.round(r * 10) / 10)} (au dixième)`, { g: 1, c: PY4_ENCRE }) + L(152, `${n}² = ${n * n} < ${A} < ${(n + 1) * (n + 1)} = ${n + 1}²`) + L(178, `donc ${n} < √${A} < ${n + 1}`) + L(206, `(la calculatrice affiche ${String(r.toFixed(6)).replace('.', ',')}…)`, { t: 14, c: '#4E5665' });
  svg.innerHTML = s;
}

/* ---- Méthode 2 : démonstration par déplacement de triangles (cahier : rejouable) ---- */
const PY4_A = 90, PY4_B = 120, PY4_S = PY4_A + PY4_B;
const PY4_PREUVE_NOTES = [
  'On part d\'un triangle rectangle quelconque : a et b sont les côtés de l\'angle droit, c est l\'hypoténuse. On veut montrer que c² = a² + b².',
  'On place 4 copies de ce triangle dans un grand carré de côté a + b. La partie qui reste (en orange) est un carré de côté c : son aire est c².',
  'On fait glisser trois des triangles, sans les tourner. Ils occupent toujours le même grand carré, et la partie qui reste est maintenant formée de deux carrés : a² (en bleu) et b² (en vert).',
  'Même grand carré, mêmes 4 triangles : ce qui reste a la même aire dans les deux cas. Donc c² = a² + b², pour n\'importe quel triangle rectangle !',
];
const py4PreuveN = i => i === 1 ? 4 : 1;
// Configuration des 4 triangles : t = 0 autour du carré c², t = 1 laissant les carrés a² et b².
function py4Config(ox, oy, sc, t, apparus){
  const a = PY4_A, b = PY4_B, S = PY4_S, P = (x, y) => `${(ox + x * sc).toFixed(1)},${(oy + y * sc).toFixed(1)}`;
  const tris = [
    [[[0, 0], [a, 0], [0, b]], [0, a]],
    [[[S, 0], [S, a], [a, 0]], [0, 0]],
    [[[S, S], [S - a, S], [S, a]], [-b, 0]],
    [[[0, S], [0, b], [b, S]], [a, -b]],
  ];
  const f = n => `font-size="${Math.round(n * (sc < 1 ? .85 : 1))}" font-weight="700"`;
  let s = `<rect x="${ox}" y="${oy}" width="${S * sc}" height="${S * sc}" fill="#fff" stroke="${PY4_ENCRE}" stroke-width="2.4"/>`;
  // Carrés restants.
  if(t < 1) s += `<polygon points="${[[a, 0], [S, a], [b, S], [0, b]].map(p => P(...p)).join(' ')}" fill="${PY4_ORANGE}" fill-opacity="${(.45 * (1 - t)).toFixed(3)}"/>` + (t < .5 ? `<text x="${ox + S / 2 * sc}" y="${oy + S / 2 * sc + 8}" text-anchor="middle" ${f(24)} fill="${PY4_ORANGE}" opacity="${(1 - 2 * t).toFixed(2)}">c²</text>` : '');
  if(t > 0) s += `<rect x="${ox}" y="${oy}" width="${a * sc}" height="${a * sc}" fill="${PY4_BLEU}" fill-opacity="${(.35 * t).toFixed(3)}"/><rect x="${ox + a * sc}" y="${oy + a * sc}" width="${b * sc}" height="${b * sc}" fill="${PY4_VERT}" fill-opacity="${(.35 * t).toFixed(3)}"/>`
    + (t > .5 ? `<text x="${ox + a / 2 * sc}" y="${oy + a / 2 * sc + 8}" text-anchor="middle" ${f(22)} fill="${PY4_BLEU}" opacity="${(2 * t - 1).toFixed(2)}">a²</text><text x="${ox + (a + b / 2) * sc}" y="${oy + (a + b / 2) * sc + 8}" text-anchor="middle" ${f(24)} fill="${PY4_VERT}" opacity="${(2 * t - 1).toFixed(2)}">b²</text>` : '');
  tris.forEach(([pts, [dx, dy]], k) => {
    const op = apparus == null ? 1 : Math.max(0, Math.min(1, apparus - k)); if(op <= 0) return;
    s += `<polygon points="${pts.map(([x, y]) => P(x + dx * t, y + dy * t)).join(' ')}" fill="#E4E7EC" fill-opacity="${op.toFixed(2)}" stroke="${PY4_ENCRE}" stroke-width="1.6" stroke-opacity="${op.toFixed(2)}"/>`;
  });
  return s;
}
function py4PreuveDessin(i, prog){
  const n = py4PreuveN(i); prog = prog == null ? n : prog;
  const t = Math.max(0, Math.min(1, prog / n)), liss = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const X = 40, Y = 40, a = PY4_A, b = PY4_B, S = PY4_S;
  const leg = (y, txt, coul, taille) => `<text x="290" y="${y}" font-size="${taille || 16}" font-weight="700" fill="${coul || PY4_ENCRE}">${txt}</text>`;
  if(i === 0){
    const R = [150, 250], Ea = [150 + a * 1.3, 250], Eb = [150, 250 - b * 1.3];
    return `<polygon points="${[R, Ea, Eb].map(p => p.join(',')).join(' ')}" fill="#E4E7EC" stroke="${PY4_ENCRE}" stroke-width="2"/><polyline points="${R[0] + 12},${R[1]} ${R[0] + 12},${R[1] - 12} ${R[0]},${R[1] - 12}" fill="none" stroke="${PY4_ENCRE}" stroke-width="1.4"/>`
      + `<text x="${(R[0] + Ea[0]) / 2}" y="${R[1] + 24}" text-anchor="middle" font-size="22" font-weight="700" fill="${PY4_BLEU}">a</text><text x="${R[0] - 18}" y="${(R[1] + Eb[1]) / 2 + 7}" text-anchor="middle" font-size="22" font-weight="700" fill="${PY4_VERT}">b</text><text x="${(Ea[0] + Eb[0]) / 2 + 16}" y="${(Ea[1] + Eb[1]) / 2 - 6}" text-anchor="middle" font-size="22" font-weight="700" fill="${PY4_ORANGE}">c</text>`
      + `<text x="380" y="120" text-anchor="middle" font-size="16" fill="${PY4_ENCRE}">a, b : côtés de l'angle droit</text><text x="380" y="146" text-anchor="middle" font-size="16" fill="${PY4_ENCRE}">c : hypoténuse</text>`;
  }
  // Repères de longueur : en haut a puis b dans les deux dispositions ; à gauche b puis a (triangles
  // autour de c²) devient a puis b (carrés a² et b²) : on passe de l'un à l'autre pendant le glissement.
  const g = i === 1 ? 0 : liss;
  const cotes = `<text x="${X + a / 2}" y="${Y - 10}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_BLEU}">a</text><text x="${X + a + b / 2}" y="${Y - 10}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_VERT}">b</text>`
    + `<g opacity="${(1 - g).toFixed(2)}"><text x="${X - 14}" y="${Y + b / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_VERT}">b</text><text x="${X - 14}" y="${Y + b + a / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_BLEU}">a</text></g>`
    + `<g opacity="${g.toFixed(2)}"><text x="${X - 14}" y="${Y + a / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_BLEU}">a</text><text x="${X - 14}" y="${Y + a + b / 2 + 6}" text-anchor="middle" font-size="16" font-weight="700" fill="${PY4_VERT}">b</text></g>`;
  if(i === 1) return py4Config(X, Y, 1, 0, prog) + cotes + leg(80, 'Grand carré de côté a + b') + leg(110, '4 triangles identiques', '#4E5665') + leg(140, 'Reste : un carré c²', PY4_ORANGE);
  if(i === 2) return py4Config(X, Y, 1, liss) + cotes + leg(80, 'Même grand carré') + leg(110, 'Mêmes 4 triangles', '#4E5665') + leg(140, 'Reste : a² + b²', PY4_VERT);
  const sc = .8;
  return py4Config(20, 30, sc, 0) + py4Config(332, 30, sc, 1) + `<text x="260" y="${30 + S * sc / 2 + 8}" text-anchor="middle" font-size="26" font-weight="700" fill="${PY4_ENCRE}">=</text>`
    + `<text x="260" y="${30 + S * sc / 2 + 30}" text-anchor="middle" font-size="12" fill="#4E5665">même aire</text><text x="260" y="${30 + S * sc + 58}" text-anchor="middle" font-size="26" font-weight="700" fill="${PY4_ENCRE}"><tspan fill="${PY4_ORANGE}">c²</tspan> = <tspan fill="${PY4_BLEU}">a²</tspan> + <tspan fill="${PY4_VERT}">b²</tspan></text>`;
}
// Moteur d'étapes animé (même principe que les autres chapitres de 4e).
function py4Etapes(svgId, listeId, btnId, notes, dessiner, nAnim, viewBox){
  let k = 0, raf = null;
  const svg = () => document.getElementById(svgId);
  const bouton = () => { const b = document.getElementById(btnId); if(b){ b.disabled = k >= notes.length - 1; b.textContent = k >= notes.length - 1 ? 'Terminé ✓' : 'Étape suivante →'; } };
  const liste = () => document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
  const fixe = () => { cancelAnimationFrame(raf); const s = svg(); if(s) s.innerHTML = dessiner(k); liste(); bouton(); };
  const jouer = () => {
    cancelAnimationFrame(raf); liste(); bouton();
    const n = nAnim(k), t0 = performance.now(), duree = n === 1 ? 1600 : n * 600;
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
    anim: { viewBox, n: nAnim, rendu: (i, p) => dessiner(i, p) },
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto, anim: demo.anim });
  return demo;
}
const py4PreuveDemo = py4Etapes('py4-preuveSvg', 'py4-preuveSteps', 'py4-preuveNext', PY4_PREUVE_NOTES, py4PreuveDessin, py4PreuveN, PY4_VB_PREUVE);

/* ---- Outils des méthodes 3 et 4 ---- */
const py4Lire = id => { const t = String(document.getElementById(id).value).trim().replace(',', '.'); return t === '' ? NaN : Number(t); };
const py4Carre = v => Math.round(v * v * 1e6) / 1e6;
const py4T = v => py4N(v).replace(',', '{,}').replace('−', '-');
// Racine : « = valeur » si elle tombe juste (au plus 2 décimales), sinon « ≈ valeur au dixième ».
function py4Rac(S){ const r = Math.sqrt(S), r2 = Math.round(r * 100) / 100; return Math.abs(r2 * r2 - S) < 1e-9 ? { exact: true, txt: py4N(r2) } : { exact: false, txt: py4N(Math.round(r * 10) / 10) }; }
function py4Longueur(){
  const cherche = document.getElementById('py4-lCherche').value, out = document.getElementById('py4-lRes'), fig = document.getElementById('py4-lFig');
  document.getElementById('py4-lLab1').textContent = 'AB';
  document.getElementById('py4-lLab2').textContent = cherche === 'BC' ? 'AC' : 'BC';
  const x = py4Lire('py4-l1'), y = py4Lire('py4-l2');
  if(!(x > 0 && y > 0 && x < 1e4 && y < 1e4)){ fig.innerHTML = ''; out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez deux longueurs strictement positives.</p>'; return; }
  const lignes = [['Le triangle ABC est rectangle en A : son hypoténuse est [BC].', 'On cite l\'hypothèse et on repère l\'hypoténuse.'], ['D\'après le théorème de Pythagore : ' + py4Tex('BC^2 = AB^2 + AC^2'), '']];
  let AB = x, AC, BC;
  if(cherche === 'BC'){
    AC = y; const S = Math.round((py4Carre(x) + py4Carre(y)) * 1e6) / 1e6, r = py4Rac(S); BC = Math.sqrt(S);
    lignes.push([py4Tex(`BC^2 = ${py4T(x)}^2 + ${py4T(y)}^2`), 'On remplace par les longueurs connues.']);
    lignes.push([py4Tex(`BC^2 = ${py4T(py4Carre(x))} + ${py4T(py4Carre(y))} = ${py4T(S)}`), '']);
    lignes.push([r.exact ? py4Tex(`BC = \\sqrt{${py4T(S)}} = ${r.txt.replace(',', '{,}')}`) + ' cm' : py4Tex(`BC = \\sqrt{${py4T(S)}}`) + ` cm (valeur exacte), BC ≈ ${r.txt} cm (au dixième).`, r.exact ? 'La racine carrée tombe juste : c\'est la valeur exacte.' : 'On arrondit au dixième.']);
  } else {
    BC = y;
    if(!(y > x)){ fig.innerHTML = ''; out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">L\'hypoténuse BC est le plus grand côté : elle doit être plus longue que AB.</p>'; return; }
    const S = Math.round((py4Carre(y) - py4Carre(x)) * 1e6) / 1e6, r = py4Rac(S); AC = Math.sqrt(S);
    lignes.push([py4Tex(`${py4T(y)}^2 = ${py4T(x)}^2 + AC^2`), 'On remplace par les longueurs connues.']);
    lignes.push([py4Tex(`AC^2 = ${py4T(py4Carre(y))} - ${py4T(py4Carre(x))} = ${py4T(S)}`), 'Pour un côté de l\'angle droit, on soustrait.']);
    lignes.push([r.exact ? py4Tex(`AC = \\sqrt{${py4T(S)}} = ${r.txt.replace(',', '{,}')}`) + ' cm' : py4Tex(`AC = \\sqrt{${py4T(S)}}`) + ` cm (valeur exacte), AC ≈ ${r.txt} cm (au dixième).`, r.exact ? 'La racine carrée tombe juste : c\'est la valeur exacte.' : 'On arrondit au dixième.']);
  }
  // Figure à l'échelle : A en bas à gauche, B à droite, C en haut.
  const k = Math.min(200 / AB, 110 / AC), A = [40, 130], B = [40 + AB * k, 130], C = [40, 130 - AC * k];
  const lab = (v, conn) => conn ? py4N(v) + ' cm' : '?';
  fig.innerHTML = py4Fig([['A', ...A], ['B', ...B], ['C', ...C]], 0, [[0, 1, lab(AB, true)], [0, 2, lab(AC, cherche !== 'AC'), cherche === 'AC' ? PY4_ORANGE : null], [1, 2, lab(BC, cherche !== 'BC'), cherche === 'BC' ? PY4_ORANGE : null]], { hyp: [1, 2], vb: '0 0 300 160', max: 320 });
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}
function py4Rectangle(){
  const out = document.getElementById('py4-rRes'), fig = document.getElementById('py4-rFig');
  const L = { EF: py4Lire('py4-rEF'), FG: py4Lire('py4-rFG'), EG: py4Lire('py4-rEG') };
  if(!Object.values(L).every(v => v > 0 && v < 1e4)){ fig.innerHTML = ''; out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez trois longueurs strictement positives.</p>'; return; }
  const cles = Object.keys(L).sort((p, q) => L[q] - L[p]), g = cles[0], [p, q] = cles.slice(1);
  if(L[g] >= L[p] + L[q]){ fig.innerHTML = ''; out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">Ce triangle n'existe pas : ${g} = ${py4N(L[g])} cm n'est pas plus petit que ${p} + ${q} = ${py4N(L[p] + L[q])} cm.</p>`; return; }
  const G2 = py4Carre(L[g]), S = Math.round((py4Carre(L[p]) + py4Carre(L[q])) * 1e6) / 1e6, droit = Math.abs(G2 - S) < 1e-9;
  const sommet = ['E', 'F', 'G'].find(v => !g.includes(v));
  const lignes = [
    [`Le plus grand côté est [${g}] : on calcule séparément.`, `Si EFG était rectangle, [${g}] serait son hypoténuse.`],
    [py4Tex(`${g}^2 = ${py4T(L[g])}^2 = ${py4T(G2)}`), ''],
    [py4Tex(`${p}^2 + ${q}^2 = ${py4T(L[p])}^2 + ${py4T(L[q])}^2 = ${py4T(py4Carre(L[p]))} + ${py4T(py4Carre(L[q]))} = ${py4T(S)}`), ''],
  ];
  if(droit){
    lignes.push(['Donc ' + py4Tex(`${g}^2 = ${p}^2 + ${q}^2`) + '.', '']);
    lignes.push([`D'après la réciproque du théorème de Pythagore, le triangle EFG est rectangle en ${sommet}.`, `${sommet} est le sommet opposé au plus grand côté.`]);
  } else {
    lignes.push(['Donc ' + py4Tex(`${g}^2 \\neq ${p}^2 + ${q}^2`) + '.', 'Si EFG était rectangle, on aurait l\'égalité (théorème de Pythagore).']);
    lignes.push(['Le triangle EFG n\'est donc pas rectangle.', '']);
  }
  // Dessin à partir des trois longueurs : le plus grand côté à l'horizontale.
  const P1 = g[0], P2 = g[1], d = (u, v) => L[[u, v].sort().join('')] || L[[v, u].join('')] || L[u + v] || L[v + u];
  const base = L[g], a1 = d(P1, sommet), a2 = d(P2, sommet), xs = (a1 * a1 - a2 * a2 + base * base) / (2 * base), ys = Math.sqrt(Math.max(0, a1 * a1 - xs * xs));
  const k = Math.min(230 / base, 110 / Math.max(ys, 1e-6));
  const pos = { [P1]: [35, 135], [P2]: [35 + base * k, 135], [sommet]: [35 + xs * k, 135 - ys * k] };
  const pts = ['E', 'F', 'G'].map(v => [v, ...pos[v]]), idx = v => ['E', 'F', 'G'].indexOf(v);
  fig.innerHTML = py4Fig(pts, droit ? idx(sommet) : -1, [['EF', 0, 1], ['FG', 1, 2], ['EG', 0, 2]].map(([c, i, j]) => [i, j, py4N(L[c]) + ' cm', c === g ? PY4_ORANGE : null]), { vb: '0 0 300 160', max: 320, fond: droit ? 'rgba(30,123,52,.12)' : 'rgba(192,57,43,.08)' });
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

DEMO_REGISTRY['4e|Théorème de Pythagore'] = {
  cours: 'cours-demo-pythagore-4e', methode: 'methode-demo-pythagore-4e', exos: 'exos-demo-pythagore-4e', histoire: 'histoire-demo-pythagore-4e',
  init: () => {
    py4Racine(); py4PreuveDemo.init(); py4Longueur(); py4Rectangle();
    ['cours-demo-pythagore-4e', 'exos-demo-pythagore-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-pythagore-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-pythagore-4e'));
  }
};

DEMO_QUIZZES['4e|Théorème de Pythagore'] = [
  { q: '√49 = ...', opts: ['7', '24,5', '2 401'], correct: 0 },
  { q: 'Dans le triangle ABC rectangle en A, l\'hypoténuse est...', opts: ['[AB]', '[BC]', '[AC]'], correct: 1 },
  { q: 'Les côtés de l\'angle droit d\'un triangle rectangle mesurent 6 cm et 8 cm. L\'hypoténuse mesure...', opts: ['14 cm', '10 cm', '48 cm'], correct: 1 },
  { q: 'ABC est rectangle en C. Quelle égalité est vraie ?', opts: ['AB² = AC² + BC²', 'AC² = AB² + BC²', 'BC² = AB² + AC²'], correct: 0 },
  { q: 'Un triangle a des côtés de 5 cm, 12 cm et 13 cm. Est-il rectangle ?', opts: ['Oui', 'Non', 'On ne peut pas savoir'], correct: 0 },
  { q: '√50 est compris entre...', opts: ['6 et 7', '7 et 8', '24 et 25'], correct: 1 },
  { q: 'Hypoténuse 10 cm, un côté de l\'angle droit 6 cm : l\'autre côté mesure...', opts: ['4 cm', '8 cm', '√136 cm'], correct: 1 },
];

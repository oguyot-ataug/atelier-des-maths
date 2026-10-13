/* ============================================================
   CM2 · Planches : Figures planes (G2)
   Polygones et vocabulaire ; codages ; triangles particuliers ; quadrilatères particuliers.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 5), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const { K, RO, BL, svg, P, L, T, code, droit, carte } = CM2G;
const CODE = 'Codages : des petits traits identiques signalent des côtés de même longueur ; un petit carré signale un angle droit.';
const reg = (n, r, cx, cy, a0) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(a0 + 2 * Math.PI * i / n), cy + r * Math.sin(a0 + 2 * Math.PI * i / n)]);
const fig = g => svg(110, 90, g, 100);
const POLY = [
  ['triangle', fig(P([[15, 75], [95, 70], [40, 12]], K, 2, '#EAF6FB'))],
  ['hexagone', fig(P(reg(6, 38, 55, 45, 0), K, 2, '#EAF6FB'))],
  ['quadrilatère', fig(P([[12, 60], [50, 10], [98, 30], [80, 80]], K, 2, '#EAF6FB'))],
  ['pas un polygone', fig(`<path d="M15,75 L95,75 L95,40 A40,30 0 0 0 15,40 Z" fill="#EAF6FB" stroke="${K}" stroke-width="2"/>`)],
  ['pentagone', fig(P(reg(5, 40, 55, 48, -Math.PI / 2), K, 2, '#EAF6FB'))],
  ['octogone', fig(P(reg(8, 40, 55, 45, Math.PI / 8), K, 2, '#EAF6FB'))],
];
const PEN = [[30, 110], [20, 50], [90, 15], [170, 50], [150, 110]];
const penta = svg(200, 135, P(PEN, K, 2, '#EAF6FB') + PEN.map((p, i) => T([p[0] + [-10, -10, 0, 12, 10][i], p[1] + [12, 0, -6, 0, 12][i]], 'ABCDE'[i])).join(''), 180);
// Triangles codés.
const TRI = [
  ['isocèle', fig(P([[15, 80], [95, 80], [55, 10]], K, 2, '#FDF1E4') + code([15, 80], [55, 10], 1) + code([95, 80], [55, 10], 1))],
  ['rectangle', fig(P([[20, 80], [95, 80], [20, 15]], K, 2, '#FDF1E4') + droit([95, 80], [20, 80], [20, 15]))],
  ['équilatéral', fig(P([[15, 80], [95, 80], [55, 10.7]], K, 2, '#FDF1E4') + code([15, 80], [95, 80], 2) + code([15, 80], [55, 10.7], 2) + code([95, 80], [55, 10.7], 2))],
  ['rectangle isocèle', fig(P([[20, 82], [88, 82], [20, 14]], K, 2, '#FDF1E4') + droit([88, 82], [20, 82], [20, 14]) + code([20, 82], [88, 82], 1) + code([20, 82], [20, 14], 1))],
];
const QUA = [
  ['carré', fig(P([[25, 15], [85, 15], [85, 75], [25, 75]], K, 2, '#EEF8F1') + droit([85, 15], [25, 15], [25, 75]) + droit([25, 15], [85, 15], [85, 75]) + droit([85, 15], [85, 75], [25, 75]) + droit([85, 75], [25, 75], [25, 15]) + code([25, 15], [85, 15], 1) + code([85, 15], [85, 75], 1) + code([85, 75], [25, 75], 1) + code([25, 75], [25, 15], 1))],
  ['losange', fig(P([[55, 5], [95, 45], [55, 85], [15, 45]], K, 2, '#EEF8F1') + code([55, 5], [95, 45], 1) + code([95, 45], [55, 85], 1) + code([55, 85], [15, 45], 1) + code([15, 45], [55, 5], 1))],
  ['rectangle', fig(P([[10, 22], [100, 22], [100, 70], [10, 70]], K, 2, '#EEF8F1') + droit([100, 22], [10, 22], [10, 70]) + droit([10, 22], [100, 22], [100, 70]) + droit([100, 22], [100, 70], [10, 70]) + droit([100, 70], [10, 70], [10, 22]))],
  ['quadrilatère quelconque', fig(P([[15, 20], [90, 10], [100, 75], [30, 70]], K, 2, '#EEF8F1'))],
];
PLANCHES['cm2|Figures planes'] = [
  { titre: 'Polygones', duree: '30 min',
    attendus: ['Reconnaître un polygone', 'Nommer un polygone selon son nombre de côtés', 'Utiliser le vocabulaire : côté, sommet'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nom de chaque polygone. Une figure n\'est pas un polygone : écris-le.',
        eleve: plGrille(POLY.map(([, f]) => carte(f, B())), 3), corr: plGrille(POLY.map(([n, f]) => carte(f, R(n))), 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Un pentagone a @ côtés.', 5], ['Un hexagone a @ sommets.', 6], ['Un polygone à 4 côtés est un @.', 'quadrilatère']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un polygone a autant de sommets que de côtés.', 'vrai'], ['Un cercle est un polygone.', 'faux'], ['Les côtés d\'un polygone sont des segments.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, consigne: `Observe le polygone ABCDE.<div style="text-align:center;">${penta}</div>`,
        ...rmp([['C\'est un @.', 'pentagone'], ['Ses côtés sont : @', '[AB], [BC], [CD], [DE], [EA]'], ['Le sommet opposé au côté [AE] est @.', 'C']], 5) },
    ] },
  { titre: 'Triangles particuliers', duree: '30 min',
    attendus: ['Lire les codages d\'une figure', 'Reconnaître un triangle isocèle, équilatéral, rectangle', 'Construire un triangle avec la règle et le compas'],
    exos: [
      { etoiles: 1, consigne: CODE + ' Écris la nature de chaque triangle.',
        eleve: plGrille(TRI.map(([, f]) => carte(f, B())), 4), corr: plGrille(TRI.map(([n, f]) => carte(f, R(n))), 4) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Un triangle équilatéral a @ côtés de même longueur.', 3], ['Un triangle isocèle a au moins @ côtés de même longueur.', 2], ['Un triangle rectangle a un angle @.', 'droit']], 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le périmètre d\'un triangle équilatéral est 27 cm. Quelle est la longueur d\'un côté ?',
        corr: cm1Redac('Longueur d\'un côté', '27 : 3 = 9', 'Les trois côtés ont la même longueur : chaque côté mesure 9 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Construis un triangle ABC isocèle en A, avec BC = 4 cm et AB = AC = 5 cm. Utilise ta règle et ton compas.',
        corr: cm1Redac('Construction', { suite: ['Je trace le segment [BC] de 4 cm.', 'Je trace un arc de cercle de centre B et de rayon 5 cm.', 'Je trace un arc de cercle de centre C et de rayon 5 cm.', 'Les deux arcs se coupent en A ; je trace [AB] et [AC].'] }, 'Je code les côtés [AB] et [AC] avec le même petit trait.') },
    ] },
  { titre: 'Quadrilatères particuliers', duree: '35 min',
    attendus: ['Reconnaître carré, rectangle, losange', 'Connaître leurs propriétés', 'Utiliser les propriétés dans un problème'],
    exos: [
      { etoiles: 1, consigne: CODE + ' Écris le nom de chaque quadrilatère.',
        eleve: plGrille(QUA.map(([, f]) => carte(f, B())), 4), corr: plGrille(QUA.map(([n, f]) => carte(f, R(n))), 4) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un carré est un rectangle particulier.', 'vrai'], ['Un losange a quatre côtés de même longueur.', 'vrai'], ['Un rectangle a toujours quatre côtés de même longueur.', 'faux'], ['Un carré est aussi un losange.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Entoure le nom qui convient.',
        ...chx([['Quatre angles droits et quatre côtés égaux :', 'carré', 'rectangle · losange · carré'], ['Quatre angles droits, côtés pas tous égaux :', 'rectangle', 'rectangle · losange · carré'], ['Quatre côtés égaux, pas d\'angle droit :', 'losange', 'rectangle · losange · carré']]) },
      { etoiles: 3, cahier: true, consigne: 'Un rectangle a un périmètre de 30 cm. Sa longueur mesure 9 cm. Quelle est sa largeur ?',
        corr: cm1Redac('Longueur + largeur', '30 : 2 = 15', 'Une longueur et une largeur mesurent ensemble 15 cm.') + cm1Redac('Largeur', '15 − 9 = 6', 'La largeur du rectangle mesure 6 cm.') },
    ] },
];
})();

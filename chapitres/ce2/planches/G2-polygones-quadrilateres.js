/* ============================================================
   CE2 · Planches : Polygones et quadrilatères (G2)
   Polygone, triangle, quadrilatère, pentagone, hexagone ; côté, sommet, angle ; carré, rectangle,
   losange, triangle rectangle ; diagonale, longueur et largeur ; justifier la nature d'une figure par
   ses côtés et ses angles droits ; codages de l'angle droit et des longueurs égales.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, P, Q, ligne, droit, code } = CM2G;
const fig = (pts, px) => { const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]); return svg(Math.max(...xs) + 10, Math.max(...ys) + 10, P(pts, '#1F3A5C', 2.2, '#EAF4FB'), px || 90); };
const formes = [fig([[10, 60], [50, 10], [90, 60]]), fig([[10, 50], [40, 10], [90, 20], [80, 70], [25, 75]]), fig([[30, 10], [70, 10], [90, 45], [70, 80], [30, 80], [10, 45]]), fig([[10, 20], [80, 10], [90, 70], [20, 60]]), svg(90, 80, `<circle cx="45" cy="40" r="34" fill="#EAF4FB" stroke="#1F3A5C" stroke-width="2.2"/>`, 80), svg(100, 80, '<path d="M10,70 L50,10 L90,70" fill="none" stroke="#1F3A5C" stroke-width="2.2"/>', 80)];
PLANCHES['ce2|Polygones et quadrilatères'] = [
  { titre: 'Les polygones', duree: '25 min',
    attendus: ['Reconnaître un polygone (figure fermée faite de segments)', 'Nommer triangle, quadrilatère, pentagone, hexagone', 'Compter les côtés et les sommets'],
    exos: [
      { etoiles: 1, consigne: 'Sous chaque figure, écris son nom, ou « pas un polygone ».',
        eleve: plGrille(formes.map(f => f + '<br>' + P3.B(9)), 3),
        corr: plGrille(formes.map((f, i) => f + '<br>' + P3.R(['triangle', 'pentagone', 'hexagone', 'quadrilatère', 'pas un polygone (pas de côtés droits)', 'pas un polygone (pas fermée)'][i])), 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Un triangle a @ côtés et @ sommets.', 3, 3], ['Un quadrilatère a @ côtés.', 4], ['Un hexagone a @ côtés.', 6], ['Un polygone de 5 côtés est un @.', 'pentagone']], 4) },
    ] },
  { titre: 'Carré, rectangle, losange', duree: '30 min',
    attendus: ['Reconnaître carré, rectangle, losange par leurs côtés et leurs angles droits', 'Lire les codages', 'Justifier : « ce n\'est pas un carré car… »'],
    exos: [
      { etoiles: 1, consigne: 'Sur le quadrillage, écris le nom de chaque quadrilatère : carré, rectangle, losange.',
        eleve: Q(19, 6, 16, g => ligne(g, [[1, 1], [5, 1], [5, 5], [1, 5]]) + ligne(g, [[7, 2], [13, 2], [13, 5], [7, 5]]) + ligne(g, [[16, 0.5], [18, 3], [16, 5.5], [14, 3]]), 320) + '<br>' + plListe(['à gauche : ' + P3.B(6) + '   au milieu : ' + P3.B(6) + '   à droite : ' + P3.B(6)]),
        corr: Q(19, 6, 16, g => ligne(g, [[1, 1], [5, 1], [5, 5], [1, 5]]) + ligne(g, [[7, 2], [13, 2], [13, 5], [7, 5]]) + ligne(g, [[16, 0.5], [18, 3], [16, 5.5], [14, 3]]), 320) + '<br>' + plListe(['à gauche : ' + P3.R('carré') + '   au milieu : ' + P3.R('rectangle') + '   à droite : ' + P3.R('losange')]) },
      { etoiles: 2, col: 1, consigne: 'Entoure vrai ou faux.',
        ...chx([['Un carré a 4 angles droits.', 'vrai', 'vrai · faux'], ['Un rectangle a 4 côtés de même longueur.', 'faux', 'vrai · faux'], ['Un losange a 4 côtés de même longueur.', 'vrai', 'vrai · faux'], ['Un carré est aussi un rectangle.', 'vrai', 'vrai · faux']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un quadrilatère a 4 côtés de 5 cm, mais aucun angle droit. Est-ce un carré ? Qu\'est-ce que c\'est ?',
        corr: cm1Redac('Nature de la figure', '4 côtés égaux, pas d\'angle droit', 'Ce n\'est pas un carré, car un carré a 4 angles droits. C\'est un losange.') },
    ] },
  { titre: 'Rectangle et triangle rectangle', duree: '25 min',
    attendus: ['Utiliser les mots longueur, largeur, diagonale', 'Reconnaître un triangle rectangle', 'Tracer un rectangle sur quadrillage'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ce rectangle a une longueur de 6 carreaux. Complète.',
        eleve: Q(8, 5, 16, g => ligne(g, [[1, 1], [7, 1], [7, 4], [1, 4]]) + droit(g(7, 1), g(1, 1), g(1, 4)), 140) + plListe(['Sa largeur mesure ' + P3.B(2) + ' carreaux.', 'Il a ' + P3.B(2) + ' diagonales.']),
        corr: Q(8, 5, 16, g => ligne(g, [[1, 1], [7, 1], [7, 4], [1, 4]]) + droit(g(7, 1), g(1, 1), g(1, 4)) + ligne(g, [[1, 1], [7, 4]], '#2EA8C9', false) + ligne(g, [[7, 1], [1, 4]], '#2EA8C9', false), 140) + plListe(['Sa largeur mesure ' + P3.R(3) + ' carreaux.', 'Il a ' + P3.R(2) + ' diagonales.']) },
      { etoiles: 2, col: 1, consigne: 'Trace un rectangle de 5 carreaux sur 2, puis un triangle rectangle.',
        eleve: Q(12, 6, 16, null, 200),
        corr: Q(12, 6, 16, g => ligne(g, [[1, 1], [6, 1], [6, 3], [1, 3]]) + ligne(g, [[8, 1], [8, 5], [11, 5]]) + droit(g(8, 1), g(8, 5), g(11, 5)), 200) },
      { etoiles: 2, col: 1, consigne: 'Entoure les triangles rectangles.',
        eleve: Q(14, 5, 16, g => ligne(g, [[1, 1], [1, 4], [4, 4]]) + ligne(g, [[6, 4], [8, 1], [10, 4]]) + ligne(g, [[11, 1], [13, 1], [13, 4]]), 220),
        corr: Q(14, 5, 16, g => ligne(g, [[1, 1], [1, 4], [4, 4]], '#E35D3A') + droit(g(1, 1), g(1, 4), g(4, 4)) + ligne(g, [[6, 4], [8, 1], [10, 4]]) + ligne(g, [[11, 1], [13, 1], [13, 4]], '#E35D3A') + droit(g(11, 1), g(13, 1), g(13, 4)), 220) + '<br>Le premier et le troisième (angle droit codé).' },
    ] },
];
})();

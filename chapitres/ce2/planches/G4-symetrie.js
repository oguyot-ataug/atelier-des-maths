/* ============================================================
   CE2 · Planches : La symétrie (G4)
   Reconnaître si une figure a un ou plusieurs axes de symétrie (pliage, calque) ; axes d'objets usuels
   et de lettres majuscules ; compléter une figure sur quadrillage pour la rendre symétrique (axe
   vertical ou horizontal).
   ============================================================ */
(() => {
const { chx } = P3;
const { svg, Q, ligne, AX } = CM2G;
const lettre = (l, axes) => svg(70, 80, `<text x="35" y="64" font-size="62" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" fill="#1F3A5C">${l}</text>` + (axes || []).map(a => a === 'v' ? AX([35, 4], [35, 76]) : AX([4, 42], [66, 42])).join(''), 60);
const lettres = [['A', ['v']], ['F', []], ['H', ['v', 'h']], ['E', ['h']], ['N', []], ['T', ['v']]];
// Figure à compléter : pts de la moitié gauche (axe vertical en x = 6), sur un quadrillage 12 × 7.
const moitie = [[6, 1], [3, 1], [3, 3], [1, 3], [1, 6], [6, 6]], symV = p => [12 - p[0], p[1]];
const motif = (complet) => Q(12, 7, 18, g => ligne(g, moitie, '#1F3A5C', false) + (complet ? ligne(g, moitie.map(symV), '#E35D3A', false) : '') + AX(g(6, 0), g(6, 7)), 230);
const moitieH = [[1, 4], [1, 2], [4, 2], [4, 1], [7, 1], [7, 4]], symH = p => [p[0], 8 - p[1]];
const motifH = (complet) => Q(9, 8, 18, g => ligne(g, moitieH, '#1F3A5C', false) + (complet ? ligne(g, moitieH.map(symH), '#E35D3A', false) : '') + AX(g(0, 4), g(9, 4)), 180);
PLANCHES['ce2|La symétrie'] = [
  { titre: 'Un axe de symétrie', duree: '25 min',
    attendus: ['Reconnaître une figure qui a un axe de symétrie', 'Tracer les axes de symétrie de lettres et d\'objets'],
    exos: [
      { etoiles: 1, consigne: 'Trace en rouge les axes de symétrie de ces lettres. Attention : certaines n\'en ont pas, d\'autres en ont deux.',
        eleve: plGrille(lettres.map(([l]) => lettre(l)), 6),
        corr: plGrille(lettres.map(([l, a]) => lettre(l, a) + '<br>' + (a.length ? a.length + ' axe' + (a.length > 1 ? 's' : '') : 'aucun')), 6) },
      { etoiles: 2, col: 1, consigne: 'Entoure les figures qui ont au moins un axe de symétrie.',
        ...chx([['un carré', 'oui', 'oui · non'], ['un cœur', 'oui', 'oui · non'], ['la lettre S', 'non', 'oui · non'], ['un cercle', 'oui', 'oui · non']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien d\'axes de symétrie a un rectangle (qui n\'est pas un carré) ? Et un carré ? Dessine-les.',
        corr: cm1Redac('Rectangle', 'un axe vertical et un axe horizontal', 'Un rectangle a 2 axes de symétrie (ses diagonales n\'en sont pas).') + cm1Redac('Carré', '2 axes au milieu des côtés et 2 diagonales', 'Un carré a 4 axes de symétrie.') },
    ] },
  { titre: 'Compléter une figure symétrique', duree: '30 min',
    attendus: ['Compléter une figure sur quadrillage par symétrie', 'Compter les carreaux de chaque côté de l\'axe'],
    exos: [
      { etoiles: 2, consigne: 'Complète la figure pour qu\'elle soit symétrique par rapport à l\'axe rouge.',
        eleve: motif(false), corr: motif(true) },
      { etoiles: 3, consigne: 'Même consigne, avec un axe horizontal.',
        eleve: motifH(false), corr: motifH(true) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...chx([['Un point et son symétrique sont à la même distance de l\'axe.', 'vrai', 'vrai · faux'], ['Quand on plie sur l\'axe, les deux moitiés se superposent.', 'vrai', 'vrai · faux']]) },
    ] },
];
})();

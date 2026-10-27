/* ============================================================
   CM2 · Planches : Symétrie axiale (G4)
   Compléter une figure par symétrie sur quadrillage (axe vertical, horizontal, diagonal) ;
   symétrique d'un point ; axes de symétrie des figures usuelles.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 2), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const { K, RO, VE, svg, L, P, X, Q, AX, ligne, carte } = CM2G;
const duo = l => plGrille(l, 2);
// Demi-figure à compléter : axe (deux points en carreaux), tracé, fonction symétrie.
const demi = (w, h, k, ax, pts, sym, sol, px) => Q(w, h, k, g => AX(g(...ax[0]), g(...ax[1])) + ligne(g, pts, K, false) + (sol ? ligne(g, pts.map(sym), VE, false) : ''), px);
const V = ([x, y]) => [10 - x, y], H = ([x, y]) => [x, 8 - y], Dg = ([x, y]) => [y, x];
const VA = [[[5, 1], [3, 1], [2, 3], [3, 5], [1, 6], [5, 6]], [[5, 0], [1, 3], [3, 3], [3, 6], [5, 6]]];
const HA = [[[1, 4], [1, 2], [3, 1], [5, 2], [7, 0], [8, 4]], [[2, 4], [2, 1], [4, 3], [6, 1], [6, 4]]];
const DA = [[[1, 1], [0, 4], [2, 6], [5, 5]], [[2, 2], [1, 5], [4, 7], [6, 6]]];
const PTS = [[2, 1, 'A'], [4, 3, 'B'], [1, 5, 'C']];
const ptsV = sol => Q(10, 7, 20, g => AX(g(5, 0), g(5, 7)) + PTS.map(([x, y, n]) => X(g(x, y), n, [-9, -5]) + (sol ? X(g(10 - x, y), n + '\'', [10, -5], VE) : '')).join(''), 200);
const PD = [[1, 3, 'A'], [2, 6, 'B'], [4, 7, 'C']];
const ptsD = sol => Q(8, 8, 20, g => AX(g(0, 0), g(8, 8)) + PD.map(([x, y, n]) => X(g(x, y), n, [-9, -5]) + (sol ? X(g(y, x), n + '\'', [10, -5], VE) : '')).join(''), 170);
const CASES = [[0, 2], [1, 2], [0, 3], [1, 4], [2, 5]];
const casesD = sol => Q(7, 7, 20, g => CASES.map(([x, y]) => `<rect x="${g(x, y)[0]}" y="${g(x, y)[1]}" width="20" height="20" fill="#7A4FC0" fill-opacity=".55"/>`).join('')
  + (sol ? CASES.map(([x, y]) => `<rect x="${g(y, x)[0]}" y="${g(y, x)[1]}" width="20" height="20" fill="${VE}" fill-opacity=".55"/>`).join('') : '') + AX(g(0, 0), g(7, 7)), 150);
// Figures et leurs axes.
const ax = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), e = 9 / n; return L([a[0] - dx * e, a[1] - dy * e], [b[0] + dx * e, b[1] + dy * e], RO, 2, true); };
const FIGS = [
  [[[25, 15], [85, 15], [85, 75], [25, 75]], [[[55, 15], [55, 75]], [[25, 45], [85, 45]], [[25, 15], [85, 75]], [[85, 15], [25, 75]]]],
  [[[10, 22], [100, 22], [100, 70], [10, 70]], [[[55, 22], [55, 70]], [[10, 46], [100, 46]]]],
  [[[15, 80], [95, 80], [55, 10]], [[[55, 10], [55, 80]]]],
  [[[55, 5], [95, 45], [55, 85], [15, 45]], [[[55, 5], [55, 85]], [[15, 45], [95, 45]]]],
  [[[15, 80], [95, 80], [55, 10.7]], [[[55, 10.7], [55, 80]], [[15, 80], [75, 45.35]], [[95, 80], [35, 45.35]]]],
  [[[10, 70], [75, 70], [100, 20], [35, 20]], []],
];
const figAx = ([pts, axes], sol) => svg(110, 92, P(pts, K, 2, '#EEF8F1') + (sol ? axes.map(([a, b]) => ax(a, b)).join('') : ''), 100);
PLANCHES['cm2|Symétrie axiale'] = [
  { titre: 'Compléter par symétrie : axe vertical ou horizontal', duree: '35 min',
    attendus: ['Compléter une figure par symétrie sur quadrillage', 'Placer le symétrique d\'un point', 'Savoir qu\'un point et son symétrique sont à la même distance de l\'axe'],
    exos: [
      { etoiles: 1, consigne: 'La droite rouge est un axe de symétrie. Termine chaque dessin.',
        eleve: duo(VA.map(p => demi(10, 7, 20, [[5, 0], [5, 7]], p, V, false, 200))), corr: duo(VA.map(p => demi(10, 7, 20, [[5, 0], [5, 7]], p, V, true, 200))) },
      { etoiles: 2, consigne: 'Cette fois, l\'axe de symétrie est horizontal. Termine chaque dessin.',
        eleve: duo(HA.map(p => demi(9, 8, 18, [[0, 4], [9, 4]], p, H, false, 170))), corr: duo(HA.map(p => demi(9, 8, 18, [[0, 4], [9, 4]], p, H, true, 170))) },
      { etoiles: 2, col: 1, consigne: 'Place les points A\', B\' et C\', symétriques de A, B et C par rapport à la droite rouge (A\' se lit « A prime »).', eleve: ptsV(false), corr: ptsV(true) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un point et son symétrique sont à la même distance de l\'axe.', 'vrai'], ['Un point situé sur l\'axe est son propre symétrique.', 'vrai'], ['La symétrie change les longueurs.', 'faux']], 'vrai · faux') },
    ] },
  { titre: 'Axe de symétrie en diagonale', duree: '35 min',
    attendus: ['Compléter une figure par symétrie quand l\'axe suit les diagonales des carreaux', 'Placer le symétrique d\'un point', 'Vérifier par pliage'],
    exos: [
      { etoiles: 2, consigne: 'L\'axe rouge suit les diagonales des carreaux. Termine chaque dessin (un point et son symétrique sont de part et d\'autre de l\'axe, sur une même diagonale).',
        eleve: duo(DA.map(p => demi(8, 8, 20, [[0, 0], [8, 8]], p, Dg, false, 170))), corr: duo(DA.map(p => demi(8, 8, 20, [[0, 0], [8, 8]], p, Dg, true, 170))) },
      { etoiles: 2, col: 1, consigne: 'Colorie les carreaux symétriques par rapport à l\'axe rouge.', eleve: casesD(false), corr: casesD(true) },
      { etoiles: 3, col: 1, consigne: 'Place les points A\', B\' et C\', symétriques de A, B et C par rapport à l\'axe rouge.', eleve: ptsD(false), corr: ptsD(true) },
      { etoiles: 3, cahier: true, consigne: 'Comment vérifier, sans instrument, qu\'une figure dessinée sur un calque est bien symétrique par rapport à une droite ?',
        corr: cm1Redac('Méthode', { suite: ['Je plie le calque le long de la droite.', 'Je regarde si les deux parties se superposent exactement.'] }, 'Si elles se superposent, la droite est un axe de symétrie de la figure.') },
    ] },
  { titre: 'Axes de symétrie des figures usuelles', duree: '30 min',
    attendus: ['Trouver les axes de symétrie d\'une figure', 'Connaître le nombre d\'axes du carré, du rectangle, du losange, des triangles particuliers'],
    exos: [
      { etoiles: 1, consigne: 'Trace en rouge les axes de symétrie de chaque figure, puis écris leur nombre (il peut n\'y en avoir aucun).',
        eleve: plGrille(FIGS.map((x, i) => carte(figAx(x, false), `<b>${'ABCDEF'[i]}</b> : ${B()} axe(s)`)), 3),
        corr: plGrille(FIGS.map((x, i) => carte(figAx(x, true), `<b>${'ABCDEF'[i]}</b> : ${R(x[1].length)} axe(s)`)), 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un cercle a une infinité d\'axes de symétrie.', 'vrai'], ['Un rectangle a quatre axes de symétrie.', 'faux'], ['Un triangle équilatéral a trois axes de symétrie.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris trois lettres majuscules qui ont un axe de symétrie vertical et deux lettres qui ont un axe horizontal.',
        corr: cm1Redac('Des lettres possibles', { suite: ['axe vertical : A, M, T (ou H, O, U, V, W, X, Y)', 'axe horizontal : B, E (ou C, D, H, K, O, X)'] }, 'Si on plie la lettre le long de l\'axe, les deux moitiés se superposent.') },
      { etoiles: 1, col: 1, consigne: 'Combien d\'axes de symétrie ?', ...P3.rmp([['le carré : @', 4], ['le rectangle : @', 2], ['le triangle équilatéral : @', 3], ['le cercle : @', 'une infinité']], 4) },
      { etoiles: 2, col: 1, consigne: 'La lettre a-t-elle un axe de symétrie ? Entoure.', ...P3.chx([['B', 'oui', 'oui · non'], ['Z', 'non', 'oui · non'], ['M', 'oui', 'oui · non']]) },
    ] },
];
})();

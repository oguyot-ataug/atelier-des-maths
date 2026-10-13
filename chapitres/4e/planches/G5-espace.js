/* ============================================================
   4e · Planches : Espace (G5)
   Pyramide et cône : vocabulaire, patrons ; volume d'une pyramide et d'un cône ; se repérer dans
   un pavé droit ; problèmes (tente, cornet, toit, entonnoir).
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const K = '#1F3A5C', Ro = '#E35D3A';
const pyr = DS.fig(150, 132, DS.pyramide(70, 120, 90, 40, 86) + DS.tx([74, 30], 'S', { a: 'start', fs: 12 }) + DS.tx([86, 80], 'h', { a: 'start', fs: 11, c: Ro }), 120);
const cone = DS.fig(120, 132, DS.cone(56, 112, 40, 96) + DS.ln([56, 112], [56, 16], Ro, 1.1, true) + DS.ln([56, 112], [96, 112], Ro, 1.2) + DS.tx([76, 108], 'r', { fs: 11, c: Ro }) + DS.tx([60, 70], 'h', { a: 'start', fs: 11, c: Ro }), 96);
// Pavé ABCDEFGH avec repère (A origine ; B, D, E sur les axes).
const pave = (() => { const A = [20, 120], B = [140, 120], D = [70, 90], E = [20, 50], dx = D[0] - A[0], dy = D[1] - A[1], h = E[1] - A[1];
  const C = [B[0] + dx, B[1] + dy], F = [B[0], B[1] + h], G = [C[0], C[1] + h], H = [D[0], D[1] + h];
  let g = DS.poly([A, B, F, E], 'none') + DS.poly([B, C, G, F], 'none') + DS.poly([E, F, G, H], 'none') + DS.ln(A, D, K, 1.1, true) + DS.ln(D, C, K, 1.1, true) + DS.ln(D, H, K, 1.1, true);
  [['A', A, [-12, 6]], ['B', B, [4, 12]], ['C', C, [6, 4]], ['D', D, [-12, -4]], ['E', E, [-12, 0]], ['F', F, [4, 12]], ['G', G, [6, -2]], ['H', H, [-12, -4]]].forEach(([n, p, d]) => { g += DS.pt(p, n, d); });
  return DS.fig(210, 140, g, 170); })();
const cornet = DS.fig(110, 136, DS.verreCone(50, 20, 30, 108) + `<path d="M30,30 l40,40 M30,54 l26,26 M70,30 l-40,40 M70,54 l-26,26" stroke="#D9A066" stroke-width="1"/>` + DS.ln([50, 20], [80, 20], Ro, 1.2) + DS.tx([65, 15], '3 cm', { fs: 9, c: Ro }) + DS.cote([92, 20], [92, 128], '10 cm', 0, { dt: -4, a: 'start', fs: 9 }), 90);
PLANCHES['4e|Espace'] = [
  { titre: 'Pyramides et cônes', duree: '30 min',
    attendus: ['Utiliser le vocabulaire de la pyramide et du cône', 'Reconnaître un patron de pyramide ou de cône', 'Compter les faces, arêtes et sommets'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pyramide à base carrée de sommet S.',
        eleve: `<div style="text-align:center;">${pyr}</div>` + rmp([['Nombre de faces : @', 5], ['Nombre d\'arêtes : @', 8], ['Nombre de sommets : @', 5], ['Forme des faces latérales : @', 'triangles']]).eleve,
        corr: `<div style="text-align:center;">${pyr}</div>` + rmp([['Nombre de faces : @', 5], ['Nombre d\'arêtes : @', 8], ['Nombre de sommets : @', 5], ['Forme des faces latérales : @', 'triangles']]).corr },
      { etoiles: 1, col: 1, consigne: 'Cône de révolution.',
        eleve: `<div style="text-align:center;">${cone}</div>` + chx([['Sa base est…', 'un disque', 'un carré · un disque · un triangle'], ['Le segment h est…', 'la hauteur', 'le rayon · la hauteur · une génératrice']]).eleve,
        corr: `<div style="text-align:center;">${cone}</div>` + chx([['Sa base est…', 'un disque', 'un carré · un disque · un triangle'], ['Le segment h est…', 'la hauteur', 'le rayon · la hauteur · une génératrice']]).corr },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau pour des pyramides.',
        ...rmp([['Base triangulaire : @ faces, @ arêtes, @ sommets', 4, 6, 4], ['Base hexagonale : @ faces, @ arêtes, @ sommets', 7, 12, 7]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Toutes les faces latérales d\'une pyramide sont des triangles.', 'vrai'], ['Le patron d\'un cône contient un disque et une portion de disque.', 'vrai'], ['Une pyramide a toujours une base carrée.', 'faux']], 'vrai · faux') },
    ] },
  { titre: 'Volume d\'une pyramide et d\'un cône', duree: '35 min',
    attendus: ['Calculer le volume d\'une pyramide : aire de la base × hauteur : 3', 'Calculer le volume d\'un cône', 'Donner une valeur exacte puis arrondie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le volume de la pyramide.',
        ...rmp([['Base de 12 cm², hauteur 5 cm : V = @ cm³', 20], ['Base carrée de 6 cm de côté, hauteur 10 cm : V = @ cm³', 120], ['Base rectangle 4 cm × 3 cm, hauteur 7 cm : V = @ cm³', 28]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule le volume du cône (valeur exacte avec π, puis arrondie au cm³).',
        ...rmp([['r = 3 cm, h = 4 cm : V = @π cm³ ≈ @ cm³', 12, 38], ['r = 6 cm, h = 5 cm : V = @π cm³ ≈ @ cm³', 60, 188]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['Un cube et une pyramide ont la même base et la même hauteur. Le volume de la pyramide est…', 'le tiers', 'le double · la moitié · le tiers'], ['1 L =', '1 dm³', '1 cm³ · 1 dm³ · 1 m³']]) },
      { etoiles: 3, cahier: true, consigne: 'La pyramide du Louvre a une base carrée de 35 m de côté et une hauteur de 21,6 m. Calcule son volume, arrondi au m³.',
        corr: cm1Redac('Volume', { suite: ['Aire de la base : 35 × 35 = 1 225 m²', 'V = 1 225 × 21,6 : 3 = 8 820'] }, 'Le volume de la pyramide du Louvre est de 8 820 m³.') },
      { etoiles: 3, cahier: true, consigne: illu(cornet, 'Un cornet de glace a la forme d\'un cône de 3 cm de rayon et de 10 cm de hauteur. Quel volume de glace peut-il contenir ? Arrondis au cm³.'),
        corr: cm1Redac('Volume du cône', { suite: ['V = π × 3² × 10 : 3', 'V = 30π ≈ 94,2'] }, 'Le cornet peut contenir environ 94 cm³ de glace.') },
    ] },
  { titre: 'Se repérer dans un pavé droit', duree: '30 min',
    attendus: ['Repérer un point dans un pavé droit avec trois coordonnées', 'Lire les coordonnées d\'un sommet', 'Placer un point de coordonnées données'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Dans ce pavé, A est l\'origine, B(4 ; 0 ; 0), D(0 ; 3 ; 0) et E(0 ; 0 ; 2). Donne les coordonnées.',
        eleve: `<div style="text-align:center;">${pave}</div>` + rmp([['C(@ ; @ ; @)', 4, 3, 0], ['F(@ ; @ ; @)', 4, 0, 2], ['G(@ ; @ ; @)', 4, 3, 2], ['H(@ ; @ ; @)', 0, 3, 2]]).eleve,
        corr: `<div style="text-align:center;">${pave}</div>` + rmp([['C(@ ; @ ; @)', 4, 3, 0], ['F(@ ; @ ; @)', 4, 0, 2], ['G(@ ; @ ; @)', 4, 3, 2], ['H(@ ; @ ; @)', 0, 3, 2]]).corr },
      { etoiles: 2, col: 1, consigne: 'Même pavé. Quel sommet a pour coordonnées…',
        ...rmp([['(0 ; 3 ; 0) ? @', 'D'], ['(4 ; 0 ; 2) ? @', 'F'], ['(0 ; 0 ; 2) ? @', 'E']]) },
      { etoiles: 2, col: 1, consigne: 'Le point M est le milieu de l\'arête [EF]. Le point N est le centre de la face ABCD.',
        ...rmp([['M(@ ; @ ; @)', 2, 0, 2], ['N(@ ; @ ; @)', 2, '1,5', 0]]) },
      { etoiles: 3, cahier: true, consigne: 'Une salle de classe a la forme d\'un pavé de 8 m de long, 6 m de large et 3 m de haut. Une lampe est fixée au centre du plafond. En prenant un coin du sol comme origine, donne les coordonnées de la lampe.',
        corr: cm1Redac('Coordonnées', 'Centre du plafond : moitié de la longueur, moitié de la largeur, hauteur du plafond.', 'La lampe a pour coordonnées (4 ; 3 ; 3).') },
    ] },
  { titre: 'Problèmes dans l\'espace', duree: '40 min',
    attendus: ['Décomposer un solide', 'Calculer un volume composé', 'Convertir des unités de volume'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Convertis.',
        ...rmp([['2 m³ = @ dm³', '2 000'], ['750 cm³ = @ L', '0,75'], ['3,5 L = @ cm³', '3 500']]) },
      { etoiles: 2, cahier: true, consigne: 'Une tente a la forme d\'une pyramide à base carrée de 3 m de côté et de 2,4 m de hauteur. Quel est le volume d\'air dans la tente ?',
        corr: cm1Redac('Volume', { suite: ['Aire de la base : 3 × 3 = 9 m²', 'V = 9 × 2,4 : 3 = 7,2'] }, 'La tente contient 7,2 m³ d\'air.') },
      { etoiles: 3, cahier: true, consigne: 'Un entonnoir a la forme d\'un cône de 6 cm de rayon et de 9 cm de hauteur. Peut-il contenir un demi-litre d\'eau ?',
        corr: cm1Redac('Volume', { suite: ['V = π × 6² × 9 : 3 = 108π', '108π ≈ 339,3 cm³'] }, 'Un demi-litre vaut 500 cm³ : l\'entonnoir, d\'environ 339 cm³, ne peut pas le contenir.') },
      { etoiles: 3, cahier: true, consigne: 'Une maison a la forme d\'un pavé de 10 m sur 8 m et de 6 m de haut, surmonté d\'un toit en pyramide de 3 m de haut. Calcule le volume total.',
        corr: cm1Redac('Pavé', '10 × 8 × 6 = 480', 'Le pavé a un volume de 480 m³.') + cm1Redac('Toit', '10 × 8 × 3 : 3 = 80', 'Le toit a un volume de 80 m³.') + cm1Redac('Total', '480 + 80 = 560', 'La maison a un volume de 560 m³.') },
    ] },
];
})();

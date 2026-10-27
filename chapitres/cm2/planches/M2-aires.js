/* ============================================================
   CM2 · Planches : Aires (M2)
   Aire en carreaux ; aire et périmètre ; unités d'aire et conversions en raisonnant ;
   aire du rectangle et du carré ; figures composées.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 2), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const { K, svg, P, carte } = CM2G;
// Figures sur quadrillage (cases), aire et périmètre en carreaux.
const FIG = [cm1Rect(1, 1, 4, 3), cm1Rect(1, 1, 6, 2), [...cm1Rect(1, 1, 2, 4), ...cm1Rect(3, 3, 3, 2)], [...cm1Rect(1, 1, 3, 3), [4, 2], [2, 4]]];
const quad = c => cm1Quad(8, 6, c, { k: 16, contour: true, c: '#2EA8C9' });
// Figure en L cotée (en cm) : 8 × 6 moins un coin de 3 × 2.
const fL = DS.fig(240, 165, P([[40, 20], [143, 20], [143, 60], [205, 60], [205, 140], [40, 140]], K, 2, '#EAF6FB')
  + DS.tx([91, 14], '5 cm') + DS.tx([138, 44], '2 cm', { a: 'end' }) + DS.tx([174, 54], '3 cm') + DS.tx([122, 157], '8 cm') + DS.tx([35, 84], '6 cm', { a: 'end' }), 200);
const jardin = DS.fig(250, 166, `<rect x="10" y="10" width="200" height="140" fill="#CFEAC9" stroke="${K}" stroke-width="2"/><rect x="70" y="58" width="80" height="40" fill="#CDEAF6" stroke="${K}" stroke-width="1.6"/>`
  + DS.tx([110, 82], 'piscine') + DS.tx([110, 158], '20 m') + DS.tx([214, 84], '15 m', { a: 'start' }), 200);
// Trois figures sur quadrillage et leur aire en carreaux (planche 3).
const AIRES3 = [[cpQuadFig(5, 4, [[[[0, 0], [3, 0], [3, 1], [1, 1], [1, 3], [0, 3]], '#2EA8C9']], { px: 110 }), '5 carreaux'], [cpQuadFig(5, 4, [[[[0, 0], [4, 0], [4, 2], [0, 2]], '#2E9C6A']], { px: 110 }), '8 carreaux'], [cpQuadFig(5, 4, [[[[0, 0], [3, 0], [3, 1], [2, 1], [2, 3], [1, 3], [1, 1], [0, 1]], '#E9C46A']], { px: 110 }), '5 carreaux']];
PLANCHES['cm2|Aires'] = [
  { titre: 'Aire et périmètre', duree: '30 min',
    attendus: ['Mesurer une aire en comptant des carreaux', 'Distinguer aire et périmètre', 'Choisir l\'unité d\'aire qui convient'],
    exos: [
      { etoiles: 1, consigne: 'L\'unité d\'aire est un carreau, l\'unité de longueur est un côté de carreau. Écris l\'aire et le périmètre de chaque figure.',
        eleve: plGrille(FIG.map((c, i) => carte(quad(c), `<b>${'ABCD'[i]}</b> · aire : ${B()} · périmètre : ${B()}`)), 2),
        corr: plGrille(FIG.map((c, i) => carte(quad(c), `<b>${'ABCD'[i]}</b> · aire : ${R(c.length)} · périmètre : ${R(cm1QuadPerim(c))}`)), 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure (aide-toi des figures A et B).',
        ...ch([['Deux figures de même aire ont toujours le même périmètre.', 'faux'], ['L\'aire se mesure en cm², en m²…', 'vrai'], ['Le périmètre se mesure en cm, en m…', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'unité qui convient.',
        ...chx([['Aire d\'une chambre : 12…', 'm²', 'cm² · dm² · m²'], ['Aire d\'un timbre : 6…', 'cm²', 'cm² · dm² · m²'], ['Aire d\'une feuille A4 : 6…', 'dm²', 'cm² · dm² · m²']]) },
      { etoiles: 1, col: 1, consigne: 'Aire ou périmètre ? Entoure.', ...P3.chx([['la longueur de clôture d\'un jardin', 'périmètre', 'aire · périmètre'], ['la moquette pour une chambre', 'aire', 'aire · périmètre']]) },
    ] },
  { titre: 'Aire du rectangle et du carré', duree: '35 min',
    attendus: ['Convertir des aires en raisonnant', 'Calculer l\'aire d\'un rectangle et d\'un carré', 'Résoudre un problème d\'aire'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (1 dm² = 100 cm² ; 1 m² = 100 dm²).',
        ...rmp([['3 dm² = @ cm²', 300], ['2 m² = @ dm²', 200], ['500 cm² = @ dm²', 5], ['1 m² = @ cm²', '10 000']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule l\'aire.',
        ...rmp([['Rectangle de 8 cm sur 5 cm : @ cm²', 40], ['Carré de 7 m de côté : @ m²', 49], ['Rectangle de 12 m sur 2,5 m : @ m²', 30]]) },
      { etoiles: 2, cahier: true, consigne: 'Une pièce rectangulaire mesure 5 m sur 4 m. Le carrelage coûte 25 € le mètre carré. Combien coûte le carrelage de la pièce ?',
        corr: cm1Redac('Aire de la pièce', '5 × 4 = 20', 'La pièce a une aire de 20 m².') + cm1Redac('Prix du carrelage', '25 × 20 = 500', 'Le carrelage coûte 500 €.') },
      { etoiles: 3, cahier: true, consigne: 'Un carré a un périmètre de 24 cm. Quelle est son aire ?',
        corr: cm1Redac('Côté du carré', '24 : 4 = 6', 'Le côté du carré mesure 6 cm.') + cm1Redac('Aire du carré', '6 × 6 = 36', 'Son aire est 36 cm².') },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire.', ...P3.rmp([['un rectangle de 8 cm sur 5 cm : @ cm²', 40], ['un rectangle de 12 m sur 3 m : @ m²', 36]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire.', ...P3.rmp([['un carré de 6 cm de côté : @ cm²', 36], ['un carré de 10 m de côté : @ m²', 100]], 2) },
      { etoiles: 2, col: 1, consigne: 'Convertis.', ...P3.rmp([['3 m² = @ dm²', 300], ['500 cm² = @ dm²', 5]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['Un rectangle d\'aire 24 cm² et de longueur 6 cm a une largeur de @ cm.', 4], ['Un carré d\'aire 49 m² a un côté de @ m.', 7]], 2) },
    ] },
  { titre: 'Aire de figures composées', duree: '35 min',
    attendus: ['Découper une figure en rectangles', 'Ajouter ou retrancher des aires', 'Rédiger la solution d\'un problème d\'aire'],
    exos: [
      { etoiles: 2, cahier: true, consigne: illu(fL, 'Calcule l\'aire de cette figure. Tu peux la découper en deux rectangles, ou partir du grand rectangle de 8 cm sur 6 cm et enlever le coin qui manque.'),
        corr: cm1Redac('Grand rectangle', '8 × 6 = 48', 'Le grand rectangle a une aire de 48 cm².') + cm1Redac('Coin qui manque', '3 × 2 = 6', 'Le coin a une aire de 6 cm².') + cm1Redac('Aire de la figure', '48 − 6 = 42', 'La figure a une aire de 42 cm².') },
      { etoiles: 3, cahier: true, consigne: illu(jardin, 'Un jardin rectangulaire mesure 20 m sur 15 m. Au milieu, on a construit une piscine de 8 m sur 4 m. Le reste est couvert de pelouse. Quelle est l\'aire de la pelouse ?'),
        corr: cm1Redac('Aire du jardin', '20 × 15 = 300', 'Le jardin a une aire de 300 m².') + cm1Redac('Aire de la piscine', '8 × 4 = 32', 'La piscine a une aire de 32 m².') + cm1Redac('Aire de la pelouse', '300 − 32 = 268', 'La pelouse a une aire de 268 m².') },
      { etoiles: 1, consigne: 'L\'unité d\'aire est un carreau. Écris l\'aire de chaque figure.', eleve: plGrille(AIRES3.map(([f]) => f + '<br>' + P3.B(4)), 3), corr: plGrille(AIRES3.map(([f, r]) => f + '<br>' + P3.R(r)), 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule l\'aire de la figure composée.', ...P3.rmp([['un carré de 4 cm de côté collé à un rectangle de 6 cm sur 2 cm : @ cm²', 28], ['un rectangle de 10 cm sur 6 cm dont on enlève un carré de 2 cm de côté : @ cm²', 56]], 2) },
    ] },
];
})();

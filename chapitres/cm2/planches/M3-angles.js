/* ============================================================
   CM2 · Planches : Angles (M3)
   Nommer un angle ; aigu, droit, obtus ; le degré (90°, 45°, 30°, 180°) ; comparer, additionner,
   partager des angles. Sans rapporteur : gabarits, équerre, pliage.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const { K, RO, BL, svg, L, X, P, carte, horloge, droit } = CM2G;
const rad = d => d * Math.PI / 180;
// Angle de d degrés : sommet O, un côté horizontal.
const ang = (d, sol) => { const O = [30, 75], A = [125, 75], Bp = [30 + 85 * Math.cos(rad(d)), 75 - 85 * Math.sin(rad(d))];
  return svg(140, 90, L(O, A, K, 2) + L(O, Bp, K, 2) + (d === 90 && sol ? droit(A, O, Bp) : ''), 120); };
const ANG = [[40, 'aigu'], [90, 'droit'], [130, 'obtus'], [70, 'aigu']];
const tri = svg(190, 120, P([[20, 100], [170, 100], [70, 20]], K, 2, '#EAF6FB') + DS.angle([20, 100], [170, 100], [70, 20], '', { r: 22 }) + X([20, 100], 'A', [-8, 10]) + X([170, 100], 'B', [8, 10]) + X([70, 20], 'C', [0, -8]), 170);
// Deux angles côte à côte : 30° puis 45°.
const O2 = [30, 128], p = d => [30 + 105 * Math.cos(rad(d)), 128 - 105 * Math.sin(rad(d))];
const cote = svg(190, 140, L(O2, p(0), K, 2) + L(O2, p(30), K, 2) + L(O2, p(75), K, 2) + DS.angle(p(0), O2, p(30), '30°', { r: 40, d: 14 }) + DS.angle(p(30), O2, p(75), '45°', { r: 30, d: 12 })
  + X(O2, 'O', [-8, 12]) + X(p(0), 'A', [0, 14]) + X(p(30), 'B', [8, 0]) + X(p(75), 'C', [8, 0]), 170);
const HOR = [[3, 0, 90], [1, 0, 30], [4, 0, 120], [6, 0, 180]];
PLANCHES['cm2|Angles'] = [
  { titre: 'Nommer et classer les angles', duree: '30 min',
    attendus: ['Nommer un angle par trois lettres', 'Reconnaître un angle aigu, droit, obtus', 'Utiliser l\'équerre pour comparer à l\'angle droit'],
    exos: [
      { etoiles: 1, consigne: 'Avec ton équerre, dis si chaque angle est aigu, droit ou obtus.',
        eleve: plGrille(ANG.map(([d], i) => carte(ang(d, false), `<b>${'EFGH'[i]}</b> : ${B()}`)), 4), corr: plGrille(ANG.map(([d, n], i) => carte(ang(d, true), `<b>${'EFGH'[i]}</b> : ${R(n)}`)), 4) },
      { etoiles: 2, col: 1, consigne: `L'angle marqué en rouge a pour sommet B. On le nomme l'angle ABC : la lettre du sommet est au milieu.<div style="text-align:center;">${tri}</div>`,
        ...rmp([['Son sommet est le point @.', 'B'], ['Ses côtés sont les demi-droites [BA) et @.', '[BC)'], ['On le nomme aussi l\'angle @.', 'CBA']], 3) },
      { etoiles: 2, col: 1, consigne: 'Un angle droit mesure 90°. Entoure la bonne réponse.',
        ...ch([['Un angle de 35° est…', 'aigu'], ['Un angle de 90° est…', 'droit'], ['Un angle de 120° est…', 'obtus'], ['Un angle de 89° est…', 'aigu'], ['Un angle de 150° est…', 'obtus']], 'aigu · droit · obtus') },
      { etoiles: 1, col: 1, consigne: 'Aigu, droit ou obtus ? Entoure.', ...P3.chx([['45°', 'aigu', 'aigu · droit · obtus'], ['90°', 'droit', 'aigu · droit · obtus'], ['120°', 'obtus', 'aigu · droit · obtus'], ['89°', 'aigu', 'aigu · droit · obtus']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un angle droit mesure @°.', 90], ['Un angle plat mesure @°.', 180]], 2) },
    ] },
  { titre: 'Le degré : additionner et partager', duree: '30 min',
    attendus: ['Connaître 90°, 45°, 30° et 180°', 'Additionner des angles placés côte à côte', 'Partager un angle droit en deux ou en trois'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['La moitié d\'un angle droit mesure @°.', 45], ['Le tiers d\'un angle droit mesure @°.', 30], ['Deux angles droits côte à côte mesurent @°.', 180], ['Le double de 30° est @°.', 60]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['45° + 30° = @°', 75], ['90° + 45° = @°', 135], ['3 × 30° = @°', 90], ['180° − 45° = @°', 135]], 2) },
      { etoiles: 2, cahier: true, consigne: illu(cote, 'Les angles AOB et BOC sont placés côte à côte. L\'angle AOB mesure 30°, l\'angle BOC mesure 45°. Combien mesure l\'angle AOC ? Est-il aigu ou obtus ?'),
        corr: cm1Redac('Mesure de l\'angle AOC', '30 + 45 = 75', 'L\'angle AOC mesure 75° ; il est aigu, car 75 est plus petit que 90.') },
      { etoiles: 3, cahier: true, consigne: 'Dans un triangle équilatéral, chaque angle mesure 60°. Combien mesurent ses trois angles ensemble ? Compare avec deux angles droits.',
        corr: cm1Redac('Somme des trois angles', '60 + 60 + 60 = 180', 'Les trois angles mesurent ensemble 180°, comme deux angles droits côte à côte.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['90° + 45° = @°', 135], ['180° − 60° = @°', 120], ['la moitié d\'un angle droit : @°', 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['un tiers d\'angle droit : @°', 30], ['un tour complet : @°', 360]], 2) },
    ] },
  { titre: 'Angles et horloge', duree: '30 min',
    attendus: ['Utiliser l\'horloge pour se représenter des angles', 'Savoir qu\'entre deux nombres voisins du cadran l\'angle mesure 30°', 'Raisonner sur les angles sans rapporteur'],
    exos: [
      { etoiles: 2, consigne: 'Entre deux nombres voisins du cadran, l\'angle mesure 30°. Quel angle forment les deux aiguilles ?',
        eleve: plGrille(HOR.map(([h, m]) => carte(horloge(h, m, 100), `${h} h : ${B(2)}°`)), 4), corr: plGrille(HOR.map(([h, m, a]) => carte(horloge(h, m, 100), `${h} h : ${R(a)}°`)), 4) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un angle de 100° est obtus.', 'vrai'], ['Si on allonge les côtés d\'un angle, il devient plus grand.', 'faux'], ['La moitié d\'un angle obtus est toujours un angle aigu.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Comment obtenir un angle de 45° avec une feuille de papier, sans instrument ?',
        corr: cm1Redac('Par pliage', { suite: ['Je plie la feuille en deux, puis encore en deux : j\'obtiens un angle droit (90°).', 'Je plie cet angle droit en deux, bord contre bord.'] }, 'J\'obtiens un angle de 45°, la moitié d\'un angle droit.') },
      { etoiles: 1, col: 1, consigne: 'Quel angle forment les aiguilles ?', ...P3.rmp([['à 3 h : @°', 90], ['à 6 h : @°', 180], ['à 2 h : @°', 60], ['à 4 h : @°', 120]], 2) },
      { etoiles: 2, col: 1, consigne: 'De combien de degrés tourne la grande aiguille ?', ...P3.rmp([['en 15 min : @°', 90], ['en 5 min : @°', 30], ['en 1 h : @°', 360]], 2) },
      { etoiles: 2, col: 1, consigne: 'À 9 h, les aiguilles forment un angle… Entoure.', ...P3.chx([['', 'droit', 'aigu · droit · obtus']]) },
      { etoiles: 3, col: 1, consigne: 'Quel angle forment les aiguilles ?', ...P3.rmp([['à 1 h : @°', 30], ['à 5 h : @°', 150]], 2) },
    ] },
];
})();

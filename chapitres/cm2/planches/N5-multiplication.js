/* ============================================================
   CM2 · Planches : Multiplication (N5)
   Multiplier par 10, 100, 1 000 ; poser une multiplication d'entiers ; multiplier un décimal par
   un entier ; décomposer pour calculer mentalement ; problèmes.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
PLANCHES['cm2|Multiplication'] = [
  { titre: 'Multiplier par 10, 100, 1 000', duree: '25 min',
    attendus: ['Multiplier un entier par 10, 100, 1 000', 'Multiplier un nombre décimal par 10, 100, 1 000', 'Expliquer le déplacement des chiffres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['45 × 10 = @', 450], ['78 × 100 = @', '7 800'], ['306 × 1 000 = @', '306 000'], ['120 × 100 = @', '12 000']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['3,5 × 10 = @', 35], ['0,47 × 100 = @', 47], ['2,8 × 1 000 = @', '2 800'], ['0,06 × 10 = @', '0,6']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['5,2 × @ = 520', 100], ['@ × 10 = 34', '3,4'], ['0,9 × @ = 900', '1 000']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Multiplier par 10, c\'est ajouter un zéro, toujours.', 'faux'], ['2,5 × 100 = 250', 'vrai'], ['Quand on multiplie par 100, chaque chiffre prend une valeur 100 fois plus grande.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Un paquet de feuilles pèse 2,45 kg. Combien pèsent 10 paquets ? et 100 paquets ?',
        corr: cm1Redac('10 paquets', '2,45 × 10 = 24,5', '10 paquets pèsent 24,5 kg.') + cm1Redac('100 paquets', '2,45 × 100 = 245', '100 paquets pèsent 245 kg.') },
    ] },
  { titre: 'Poser une multiplication', duree: '35 min',
    attendus: ['Poser une multiplication par un nombre à deux ou trois chiffres', 'Multiplier un nombre décimal par un entier', 'Contrôler avec un ordre de grandeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['347 × 6 = @', '2 082'], ['58 × 34 = @', '1 972'], ['625 × 48 = @', '30 000']]) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['4,6 × 7 = @', '32,2'], ['12,35 × 8 = @', '98,8'], ['3,08 × 25 = @', 77]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'ordre de grandeur.',
        ...chx([['49 × 21 :', 'environ 1 000', 'environ 100 · environ 1 000 · environ 10 000'], ['9,8 × 31 :', 'environ 300', 'environ 30 · environ 300 · environ 3 000']]) },
      { etoiles: 2, cahier: true, consigne: 'Un cinéma a 18 rangées de 26 fauteuils. Combien de spectateurs peut-il accueillir ?',
        corr: cm1Redac('Nombre de places', '18 × 26 = 468', 'Le cinéma peut accueillir 468 spectateurs.') },
      { etoiles: 3, cahier: true, consigne: 'Une bouteille de jus coûte 1,85 €. La cantine en achète 24. Combien paie-t-elle ?',
        corr: cm1Redac('Prix total', '1,85 × 24 = 44,40', 'La cantine paie 44,40 €.') },
    ] },
  { titre: 'Calculer mentalement et résoudre des problèmes', duree: '35 min',
    attendus: ['Décomposer un nombre pour multiplier mentalement', 'Utiliser les doubles et les moitiés', 'Résoudre un problème à étapes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement en décomposant.',
        ...rmp([['12 × 15 = @', 180], ['25 × 12 = @', 300], ['99 × 7 = @', 693], ['21 × 13 = @', 273]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule mentalement.',
        ...rmp([['4 × 2,5 = @', 10], ['50 × 18 = @', 900], ['0,5 × 46 = @', 23], ['3 × 1,2 = @', '3,6']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['15 × 4 = 30 × 2', 'vrai'], ['6 × 0,5 = 12', 'faux'], ['8 × 125 = 1 000', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Pour la sortie de fin d\'année, 3 classes de 26 élèves partent avec 9 adultes. L\'entrée au parc coûte 12 € par élève et 15 € par adulte. Quel est le prix total des entrées ?',
        corr: cm1Redac('Nombre d\'élèves', '3 × 26 = 78', 'Il y a 78 élèves.') + cm1Redac('Prix des entrées', { suite: ['78 × 12 = 936', '9 × 15 = 135', '936 + 135 = 1 071'] }, 'Les entrées coûtent 1 071 € en tout.') },
    ] },
];
})();

/* ============================================================
   CE2 · Planches : La multiplication (N5)
   Sens (addition itérée, quadrillage) ; commutativité ; facteur, produit, multiple (pairs = multiples
   de 2) ; × 10 et × 100 ; × 4 (deux fois le double) et × 8 ; × dizaines entières (9 × 40) ; décomposer
   un facteur (23 × 7 = 20 × 7 + 3 × 7). Pas de multiplication posée (période 4).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const quad = (l, c) => cm1Quad(c, l, cm1Rect(0, 0, c, l), { k: 14 });
PLANCHES['ce2|La multiplication'] = [
  { titre: 'Le sens de la multiplication', duree: '25 min',
    attendus: ['Passer d\'une addition répétée à une multiplication', 'Écrire la multiplication d\'un quadrillage', 'Savoir que 3 × 5 = 5 × 3'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris avec une multiplication, puis calcule.',
        ...rmp([['6 + 6 + 6 + 6 = @ × @', 4, 6], ['4 × 6 = @', 24], ['9 + 9 + 9 = @ × @', 3, 9], ['3 × 9 = @', 27], ['5 + 5 + 5 + 5 + 5 + 5 = @ × @', 6, 5], ['6 × 5 = @', 30]], 2) },
      { etoiles: 1, consigne: 'Combien de carreaux ? Écris deux multiplications.',
        eleve: plGrille([quad(3, 7) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3), quad(4, 5) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3)], 2),
        corr: plGrille([quad(3, 7) + '<br>' + P3.R('3 × 7 = 21') + '<br>' + P3.R('7 × 3 = 21'), quad(4, 5) + '<br>' + P3.R('4 × 5 = 20') + '<br>' + P3.R('5 × 4 = 20')], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète avec les mots facteur, produit, multiple.',
        ...rmp([['Dans 4 × 6 = 24, 4 et 6 sont les @.', 'facteurs'], ['24 est le @ de 4 par 6.', 'produit'], ['24 est un @ de 6.', 'multiple']], 7) },
    ] },
  { titre: 'Multiplier par 10, par 100', duree: '25 min',
    attendus: ['Multiplier un nombre par 10 ou par 100', 'Expliquer : chaque chiffre prend une valeur 10 ou 100 fois plus grande'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['8 × 10 = @', 80], ['35 × 10 = @', 350], ['7 × 100 = @', 700], ['46 × 100 = @', '4 600'], ['10 × 90 = @', 900]], 4) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant.',
        ...rmp([['@ × 10 = 630', 63], ['@ × 100 = 2 500', 25], ['57 × @ = 5 700', 100], ['@ × 10 = 1 000', 100]], 4) },
      { etoiles: 2, col: 1, consigne: 'Calcule (× dizaines entières).',
        ...rmp([['9 × 40 = @', 360], ['6 × 30 = @', 180], ['8 × 50 = @', 400], ['7 × 60 = @', 420]], 4) },
    ] },
  { titre: 'Des astuces de calcul', duree: '30 min',
    attendus: ['Multiplier par 4 en doublant deux fois, par 8 en doublant trois fois', 'Décomposer un facteur pour calculer', 'Reconnaître un nombre pair'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Multiplie par 4 en doublant deux fois.',
        ...rmp([['12 × 4 : 24 puis @', 48], ['25 × 4 : @ puis @', 50, 100], ['35 × 4 : @ puis @', 70, 140]], 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Calcule en décomposant le premier facteur : 23 × 7, puis 14 × 6.',
        corr: cm1Redac('23 × 7', { suite: ['20 × 7 = 140', '3 × 7 = 21', '140 + 21 = 161'] }, '23 × 7 = 161.') + cm1Redac('14 × 6', { suite: ['10 × 6 = 60', '4 × 6 = 24', '60 + 24 = 84'] }, '14 × 6 = 84.') },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres pairs (multiples de 2).',
        eleve: plListe(['14 · 27 · 38 · 51 · 100 · 63 · 76']),
        corr: plListe([plEntoure('14') + ' · 27 · ' + plEntoure('38') + ' · 51 · ' + plEntoure('100') + ' · 63 · ' + plEntoure('76')]) },
      { etoiles: 3, cahier: true, consigne: 'Un car transporte 48 élèves. L\'école a réservé 8 cars, tous pleins. Combien d\'élèves partent en sortie ? Calcule en doublant trois fois.',
        corr: cm1Redac('Nombre d\'élèves', { suite: ['48 × 2 = 96', '96 × 2 = 192', '192 × 2 = 384'] }, 'Multiplier par 8, c\'est doubler trois fois : 384 élèves partent en sortie.') },
    ] },
];
})();

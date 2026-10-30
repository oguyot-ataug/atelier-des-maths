/* CP · Planches : Soustraire en cassant une dizaine (N10). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Soustraire en cassant une dizaine'] = [
  { titre: 'Casser une dizaine', duree: '25 min',
    attendus: ['Échanger une dizaine contre dix unités', 'Soustraire un nombre à un chiffre en cassant une dizaine'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['32 = 2 dizaines et @ unités', 12], ['45 = 3 dizaines et @ unités', 15], ['60 = 5 dizaines et @ unités', 10]], 2) },
      { etoiles: 2, consigne: 'Barre 7 cubes (casse une barre si besoin) et écris le résultat.',
        eleve: lig(cpBarres(33, { q: 7 })) + lig('33 − 7 = ' + B(2)), corr: lig(cpBarres(26, { q: 7 })) + lig('33 − 7 = ' + R(26) + ' (on a cassé une barre : 2 barres et 13 cubes, on en enlève 7)') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['53 = 4 dizaines et @ unités', 13], ['27 = 1 dizaine et @ unités', 17], ['80 = 7 dizaines et @ unités', 10]], 2) },
      { etoiles: 2, consigne: 'Calcule.',
        ...P3.rmp([['24 − 6 = @', 18], ['35 − 8 = @', 27], ['51 − 3 = @', 48], ['40 − 5 = @', 35], ['32 − 4 = @', 28], ['63 − 7 = @', 56], ['22 − 5 = @', 17], ['70 − 3 = @', 67]], 2) },
      { etoiles: 3, consigne: 'Barre 5 cubes (casse une barre si besoin) et écris le résultat.',
        eleve: lig(cpBarres(42, { q: 7 })) + lig('42 − 5 = ' + B(2)), corr: lig(cpBarres(37, { q: 7 })) + lig('42 − 5 = ' + R(37) + ' (3 barres et 12 cubes, on en enlève 5)') },
    ] },
  { titre: 'Passer par la dizaine', duree: '20 min',
    attendus: ['Soustraire en reculant jusqu\'à la dizaine, puis le reste'],
    exos: [
      { etoiles: 1, consigne: 'Recule sur la bande : 23 − 5.',
        eleve: lig(cpBande(15, 25, { c: 26 })) + lig('23 − 5 = ' + B(2)), corr: lig(cpSautsBande(23, -5, { de: 15, a: 25, px: 300 })) + lig('23 − 5 = ' + R(18)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['42 − 4 = @', 38], ['31 − 6 = @', 25], ['56 − 8 = @', 48], ['70 − 3 = @', 67]], 2) },
      { etoiles: 2, consigne: 'Recule sur la bande : 32 − 4.',
        eleve: lig(cpBande(25, 35, { c: 26 })) + lig('32 − 4 = ' + B(2)), corr: lig(cpSautsBande(32, -4, { de: 25, a: 35, px: 300 })) + lig('32 − 4 = ' + R(28)) },
      { etoiles: 2, col: 1, consigne: 'Recule jusqu\'à la dizaine, puis encore.',
        ...P3.rmp([['25 − 5 = @', 20], ['20 − 3 = @', 17], ['Donc 25 − 8 = @', 17]], 2) },
      { etoiles: 3, consigne: 'Calcule.',
        ...P3.rmp([['63 − 5 = @', 58], ['44 − 7 = @', 37], ['82 − 4 = @', 78], ['50 − 6 = @', 44], ['71 − 8 = @', 63], ['93 − 6 = @', 87], ['36 − 9 = @', 27], ['60 − 2 = @', 58]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Résoudre des problèmes de retrait'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Zoé a 24 perles. Elle en perd 6. Combien lui en reste-t-il ?',
        corr: cm1Redac('Perles qui restent', { suite: ['24 − 4 = 20', '20 − 2 = 18'] }, 'Il reste 18 perles à Zoé.') },
      { etoiles: 2, cahier: true, consigne: 'Dans la classe, il y a 31 chaises. 5 sont cassées. Combien de chaises sont en bon état ?',
        corr: cm1Redac('Chaises en bon état', { suite: ['31 − 1 = 30', '30 − 4 = 26'] }, '26 chaises sont en bon état.') },
      { etoiles: 1, consigne: 'Il y a 32 œufs. On en casse 5. Combien en reste-t-il ? Dessine les barres et les cubes, puis écris le calcul.',
        eleve: cadre(80) + lig('Calcul : ' + B(5)), corr: lig(cpBarres(27, { q: 7 })) + lig('32 − 5 = ' + R(27)) },
      { etoiles: 2, consigne: 'Tom a 25 €. Il dépense 7 €. Combien lui reste-t-il ? Recule sur la bande.',
        eleve: lig(cpBande(15, 26, { c: 24 })) + lig('Calcul : ' + B(5)), corr: lig(cpSautsBande(25, -7, { de: 15, a: 26, px: 300 })) + lig('25 − 7 = ' + R(18)) },
      { etoiles: 2, consigne: 'Complète.',
        ...P3.rmp([['41 élèves, 3 absents. Présents : @', 38], ['30 bonbons, 4 mangés. Il en reste @.', 26], ['52 images, 5 données. Il en reste @.', 47], ['23 billes, 6 perdues. Il en reste @.', 17]], 2) },
    ] },
];
})();

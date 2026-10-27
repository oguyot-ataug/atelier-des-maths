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
    ] },
  { titre: 'Passer par la dizaine', duree: '20 min',
    attendus: ['Soustraire en reculant jusqu\'à la dizaine, puis le reste'],
    exos: [
      { etoiles: 1, consigne: 'Recule sur la bande : 23 − 5.',
        eleve: lig(cpBande(15, 25, { c: 26 })) + lig('23 − 5 = ' + B(2)), corr: lig(cpSautsBande(23, -5, { de: 15, a: 25, px: 300 })) + lig('23 − 5 = ' + R(18)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['42 − 4 = @', 38], ['31 − 6 = @', 25], ['56 − 8 = @', 48], ['70 − 3 = @', 67]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Résoudre des problèmes de retrait'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Zoé a 24 perles. Elle en perd 6. Combien lui en reste-t-il ?',
        corr: cm1Redac('Perles qui restent', { suite: ['24 − 4 = 20', '20 − 2 = 18'] }, 'Il reste 18 perles à Zoé.') },
      { etoiles: 2, cahier: true, consigne: 'Dans la classe, il y a 31 chaises. 5 sont cassées. Combien de chaises sont en bon état ?',
        corr: cm1Redac('Chaises en bon état', { suite: ['31 − 1 = 30', '30 − 4 = 26'] }, '26 chaises sont en bon état.') },
    ] },
];
})();

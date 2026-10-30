/* CP · Planches : Ajouter 9, aller à la dizaine (N14). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const deuxBoites = (a, b) => { const c1 = Math.min(b, 10 - a), c2 = b - c1; return lig(cpBoiteDix(a + c1, { c: 18, couleurs: Array(a).fill(CPC.jeton).concat(Array(c1).fill(CE2C.vert)) }), cpBoiteDix(c2, { c: 18, couleurs: Array(10).fill(CPC.jeton2) })); };
PLANCHES['cp|Ajouter 9, aller à la dizaine'] = [
  { titre: 'Aller à la dizaine', duree: '20 min',
    attendus: ['Compléter à la dizaine supérieure'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['8 + @ = 10', 2], ['16 + @ = 20', 4], ['33 + @ = 40', 7], ['55 + @ = 60', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['@ + 1 = 30', 29], ['@ + 6 = 50', 44], ['72 + @ = 80', 8]], 2) },
      { etoiles: 2, consigne: 'Avance sur la bande jusqu\'à la dizaine.',
        eleve: lig(cpBande(20, 31, { c: 24 })) + lig('26 + ' + B(1) + ' = 30'), corr: lig(cpSautsBande(26, 4, { de: 20, a: 31, px: 300 })) + lig('26 + ' + R(4) + ' = 30') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['6 + @ = 10', 4], ['27 + @ = 30', 3], ['41 + @ = 50', 9], ['68 + @ = 70', 2]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quelle est la dizaine juste après ?',
        ...P3.rmp([['après 34 : @', 40], ['après 58 : @', 60], ['après 81 : @', 90]], 2) },
      { etoiles: 1, consigne: 'Combien de jetons manque-t-il pour remplir la boîte ?',
        ...PCP.compte([[cpBoiteDix(6, { c: 20 }), 4], [cpBoiteDix(9, { c: 20 }), 1], [cpBoiteDix(3, { c: 20 }), 7]], 3) },
    ] },
  { titre: 'Passer la dizaine', duree: '20 min',
    attendus: ['Ajouter en passant par la dizaine (8 + 5 = 8 + 2 + 3)'],
    exos: [
      { etoiles: 1, consigne: 'Complète la boîte de dix, puis calcule.',
        eleve: deuxBoites(8, 0) + plListe(['8 + 5 = ' + B(2)]), corr: deuxBoites(8, 5) + plListe(['8 + 2 = 10', '10 + 3 = 13']) + lig('8 + 5 = ' + R(13)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['9 + 4 = @', 13], ['7 + 6 = @', 13], ['8 + 7 = @', 15], ['46 + 5 = @', 51]], 2) },
      { etoiles: 1, consigne: 'Complète la boîte de dix, puis calcule.',
        eleve: deuxBoites(9, 0) + plListe(['9 + 4 = ' + B(2)]), corr: deuxBoites(9, 4) + plListe(['9 + 1 = 10', '10 + 3 = 13']) + lig('9 + 4 = ' + R(13)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['6 + 5 = @', 11], ['8 + 6 = @', 14], ['7 + 4 = @', 11], ['9 + 8 = @', 17]], 2) },
      { etoiles: 2, consigne: 'Complète les étapes.',
        ...P3.rmp([['7 + 3 = @', 10], ['10 + 2 = @', 12], ['Donc 7 + 5 = @', 12], ['8 + 2 = @', 10], ['10 + 4 = @', 14], ['Donc 8 + 6 = @', 14]], 2) },
    ] },
  { titre: 'Ajouter 9', duree: '20 min',
    attendus: ['Ajouter 9 en ajoutant 10 puis en enlevant 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ajoute 10, puis enlève 1.',
        ...P3.rmp([['23 + 9 = @', 32], ['45 + 9 = @', 54], ['16 + 9 = @', 25], ['70 + 9 = @', 79]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Inès a 38 images. On lui en donne 9. Combien en a-t-elle ?',
        corr: cm1Redac('Images d\'Inès', { suite: ['38 + 10 = 48', '48 − 1 = 47'] }, 'Inès a 47 images.') },
      { etoiles: 2, consigne: 'Avance sur la bande : 27 + 9.',
        eleve: lig(cpBande(25, 37, { c: 24 })) + lig('27 + 9 = ' + B(2)), corr: lig(cpSautsBande(27, 9, { de: 25, a: 37, px: 320 })) + lig('27 + 9 = ' + R(36)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['34 + 9 = @', 43], ['58 + 9 = @', 67], ['62 + 9 = @', 71], ['81 + 9 = @', 90]], 2) },
      { etoiles: 2, consigne: 'Ajoute 10, puis enlève 1.',
        ...P3.rmp([['26 + 10 = @', 36], ['36 − 1 = @', 35], ['Donc 26 + 9 = @', 35], ['43 + 10 = @', 53], ['53 − 1 = @', 52], ['Donc 43 + 9 = @', 52]], 2) },
      { etoiles: 3, consigne: 'Dans le tableau, colorie 14. Ajoute 9 : descends d\'une case et recule d\'une case. Colorie la case d\'arrivée.',
        eleve: lig(cpTableau(10, 39, { c: 22 })), corr: lig(cpTableau(10, 39, { on: [14, 23], c: 22 })) + lig('14 + 9 = ' + R(23)) },
    ] },
];
})();

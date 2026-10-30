/* CE1 · Planches : Calcul mental : ajouter et soustraire (N2). */
(() => {
const B = P3.B, R = P3.R;
PLANCHES['ce1|Calcul mental : ajouter et soustraire'] = [
  { titre: 'Les résultats à connaître', duree: '20 min',
    attendus: ['Connaître les compléments à 10 et les doubles', 'Utiliser les presque-doubles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['7 + 3 = @', 10], ['8 + 8 = @', 16], ['6 + 4 = @', 10], ['9 + 9 = @', 18]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule avec un double.', ...P3.rmp([['7 + 8 = @', 15], ['6 + 7 = @', 13], ['9 + 8 = @', 17]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète pour faire 10.', ...P3.rmp([['@ + 2 = 10', 8], ['5 + @ = 10', 5], ['3 + @ = 10', 7], ['10 = 1 + @', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Doubles et moitiés.', ...P3.rmp([['Le double de 7 : @', 14], ['Le double de 6 : @', 12], ['La moitié de 18 : @', 9], ['La moitié de 14 : @', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète pour faire 100.', ...P3.rmp([['30 + @ = 100', 70], ['60 + @ = 100', 40], ['@ + 20 = 100', 80], ['@ + 50 = 100', 50]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète la table d\'addition.',
        eleve: cm1Tableau(['+', '4', '5', '6'], [['6', '', '', ''], ['7', '', '', ''], ['8', '', '', '']]),
        corr: cm1Tableau(['+', '4', '5', '6'], [['6', R(10), R(11), R(12)], ['7', R(11), R(12), R(13)], ['8', R(12), R(13), R(14)]]) },
      { etoiles: 2, consigne: 'Calcule.', ...P3.rmp([['5 + 6 = @', 11], ['8 + 7 = @', 15], ['4 + 5 = @', 9], ['9 + 10 = @', 19], ['7 + 8 = @', 15], ['6 + 6 = @', 12], ['9 + 4 = @', 13], ['10 + 8 = @', 18]], 2) },
    ] },
  { titre: 'Passer la dizaine', duree: '20 min',
    attendus: ['Ajouter ou soustraire en passant par la dizaine'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['36 + @ = 40', 4], ['58 + @ = 60', 2], ['71 + @ = 80', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['47 + 6 = @', 53], ['38 + 5 = @', 43], ['52 − 4 = @', 48], ['63 − 7 = @', 56]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète jusqu\'à la dizaine.', ...P3.rmp([['24 + @ = 30', 6], ['67 + @ = 70', 3], ['85 + @ = 90', 5], ['43 + @ = 50', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['29 + 4 = @', 33], ['66 + 7 = @', 73], ['85 + 8 = @', 93], ['17 + 5 = @', 22]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['41 − 3 = @', 38], ['70 − 6 = @', 64], ['92 − 5 = @', 87], ['34 − 8 = @', 26]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète les étapes.', ...P3.rmp([['48 + 2 = @', 50], ['50 + 5 = @', 55], ['Donc 48 + 7 = @', 55]], 2) },
      { etoiles: 2, consigne: 'Avance sur la bande : 57 + 6.',
        eleve: PCP.lig(cpBande(54, 66, { c: 24 })) + PCP.lig('57 + 6 = ' + B(2)), corr: PCP.lig(cpSautsBande(57, 6, { de: 54, a: 66, px: 320 })) + PCP.lig('57 + 6 = ' + R(63)) },
    ] },
  { titre: 'Ajouter et soustraire des dizaines', duree: '25 min',
    attendus: ['Ajouter ou soustraire des dizaines', 'Décomposer pour calculer', 'Ajouter 9 et 11'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['34 + 30 = @', 64], ['85 − 40 = @', 45], ['27 + 50 = @', 77]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['46 + 9 = @', 55], ['58 + 11 = @', 69], ['72 − 9 = @', 63]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose pour calculer.', ...P3.rmp([['23 + 45 = @', 68], ['56 + 32 = @', 88], ['79 − 25 = @', 54]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Lina a 46 €. Elle reçoit 29 € pour son anniversaire. Combien a-t-elle ?',
        corr: cm1Redac('Argent de Lina', { suite: ['46 + 30 = 76', '76 − 1 = 75'] }, 'Lina a 75 €.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['63 + 20 = @', 83], ['90 − 30 = @', 60], ['48 + 40 = @', 88], ['75 − 50 = @', 25]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['34 + 9 = @', 43], ['67 + 11 = @', 78], ['81 − 11 = @', 70], ['55 − 9 = @', 46]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose pour calculer.', ...P3.rmp([['41 + 37 = @', 78], ['64 − 23 = @', 41], ['35 + 52 = @', 87]], 2) },
      { etoiles: 3, consigne: 'Complète.', ...P3.rmp([['@ + 30 = 85', 55], ['67 − @ = 27', 40], ['@ + 9 = 50', 41], ['@ + 20 = 64', 44], ['58 − @ = 18', 40], ['@ + 8 = 30', 22]], 2) },
    ] },
];
})();

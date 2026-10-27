/* CE1 · Planches : Tables de multiplication de 3 et 4 (N12). */
(() => {
const B = P3.B, R = P3.R;
const table = (t, trous) => ({ eleve: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? '' : String((i + 1) * t))]]),
  corr: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? `<b style="color:#2E9C6A;">${(i + 1) * t}</b>` : String((i + 1) * t))]]) });
PLANCHES['ce1|Tables de multiplication de 3 et 4'] = [
  { titre: 'La table de 3', duree: '20 min',
    attendus: ['Construire et connaître la table de 3'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 3.', ...table(3, [3, 4, 6, 7, 9]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 × 7 = @', 21], ['3 × 9 = @', 27], ['6 × 3 = @', 18], ['3 × @ = 24', 8]], 2) },
      { etoiles: 1, col: 1, consigne: 'Compte de 3 en 3.', ...P3.rmp([['3, 6, 9, @, @, @', 12, 15, 18], ['30, 27, 24, @, @', 21, 18]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 × 3 = @', 9], ['3 × 5 = @', 15], ['10 × 3 = @', 30], ['@ × 3 = 12', 4]], 2) },
      { etoiles: 1, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(3, 5, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2), ce1Rangees(3, 8, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2)], 2),
        corr: plGrille([ce1Rangees(3, 5, { p: 16 }) + '<br>' + R('3 × 5 = 15'), ce1Rangees(3, 8, { p: 16 }) + '<br>' + R('3 × 8 = 24')], 2) },
    ] },
  { titre: 'La table de 4', duree: '20 min',
    attendus: ['Construire et connaître la table de 4 (le double du double)'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 4.', ...table(4, [3, 6, 7, 8, 9]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['4 × 6 = @', 24], ['4 × 9 = @', 36], ['7 × 4 = @', 28], ['4 × @ = 32', 8]], 2) },
      { etoiles: 2, col: 1, consigne: 'Pour 4 ×, on prend le double du double.', ...P3.rmp([['2 × 6 = @', 12], ['donc 4 × 6 = @', 24], ['2 × 8 = @', 16], ['donc 4 × 8 = @', 32]], 2) },
      { etoiles: 1, col: 1, consigne: 'Compte de 4 en 4.', ...P3.rmp([['4, 8, 12, @, @, @', 16, 20, 24], ['40, 36, 32, @, @', 28, 24]], 2) },
      { etoiles: 1, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(4, 5, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2), ce1Rangees(4, 7, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2)], 2),
        corr: plGrille([ce1Rangees(4, 5, { p: 16 }) + '<br>' + R('4 × 5 = 20'), ce1Rangees(4, 7, { p: 16 }) + '<br>' + R('4 × 7 = 28')], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['4 × 4 = @', 16], ['4 × 9 = @', 36], ['4 × @ = 28', 7]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Résoudre des problèmes avec les tables de 3 et 4'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un trèfle a 3 feuilles. Combien de feuilles ont 8 trèfles ?', corr: cm1Redac('Feuilles', '8 × 3 = 24', '8 trèfles ont 24 feuilles.') },
      { etoiles: 2, cahier: true, consigne: 'Une place de cinéma coûte 4 €. Combien coûtent 7 places ?', corr: cm1Redac('Prix des places', '7 × 4 = 28', '7 places coûtent 28 €.') },
      { etoiles: 3, cahier: true, consigne: 'On range 36 œufs dans des boîtes de 4. Combien de boîtes ?', corr: cm1Redac('Boîtes', '9 × 4 = 36', 'Il faut 9 boîtes.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['5 tabourets à 3 pieds : @ pieds', 15], ['6 chats : @ pattes', 24], ['9 tricycles : @ roues', 27]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau.',
        eleve: cm1Tableau(['×', '2', '5', '7', '9'], [['<b>3</b>', '', '', '', ''], ['<b>4</b>', '', '', '', '']]),
        corr: cm1Tableau(['×', '2', '5', '7', '9'], [['<b>3</b>', R(6), R(15), R(21), R(27)], ['<b>4</b>', R(8), R(20), R(28), R(36)]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 × 7 = @', 21], ['4 × 6 = @', 24], ['3 × 9 = @', 27], ['4 × 8 = @', 32]], 2) },
    ] },
];
})();

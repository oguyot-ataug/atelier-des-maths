/* CE1 · Planches : Tables de multiplication de 6, 7, 8 et 9 (N15). */
(() => {
const B = P3.B, R = P3.R;
const table = (t, trous) => ({ eleve: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? '' : String((i + 1) * t))]]),
  corr: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? `<b style="color:#2E9C6A;">${(i + 1) * t}</b>` : String((i + 1) * t))]]) });
PLANCHES['ce1|Tables de multiplication de 6, 7, 8 et 9'] = [
  { titre: 'Les tables de 6 et de 7', duree: '20 min',
    attendus: ['Construire les tables de 6 et de 7 à partir des tables connues'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 6.', ...table(6, [3, 4, 6, 7, 9]) },
      { etoiles: 2, col: 1, consigne: 'Pour 6 ×, on prend le double de la table de 3.', ...P3.rmp([['3 × 7 = @', 21], ['donc 6 × 7 = @', 42], ['3 × 9 = @', 27], ['donc 6 × 9 = @', 54]], 2) },
      { etoiles: 1, consigne: 'Complète la table de 7.', ...table(7, [4, 6, 7, 8, 9]) },
      { etoiles: 2, col: 1, consigne: 'Pour 7 ×, on fait 5 fois et encore 2 fois.', ...P3.rmp([['5 × 8 = @', 40], ['2 × 8 = @', 16], ['donc 7 × 8 = @', 56]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['6 × 6 = @', 36], ['7 × 7 = @', 49], ['6 × @ = 48', 8], ['7 × @ = 63', 9]], 2) },
    ] },
  { titre: 'Les tables de 8 et de 9', duree: '20 min',
    attendus: ['Construire les tables de 8 et de 9 à partir des tables connues'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 8.', ...table(8, [3, 6, 7, 8, 9]) },
      { etoiles: 2, col: 1, consigne: 'Pour 8 ×, on prend le double de la table de 4.', ...P3.rmp([['4 × 7 = @', 28], ['donc 8 × 7 = @', 56], ['4 × 9 = @', 36], ['donc 8 × 9 = @', 72]], 2) },
      { etoiles: 1, consigne: 'Complète la table de 9.', ...table(9, [3, 4, 6, 7, 8]) },
      { etoiles: 2, col: 1, consigne: 'Pour 9 ×, on fait 10 fois moins 1 fois.', ...P3.rmp([['10 × 6 = @', 60], ['donc 9 × 6 = @', 54], ['10 × 8 = @', 80], ['donc 9 × 8 = @', 72]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['8 × 8 = @', 64], ['9 × 9 = @', 81], ['8 × @ = 40', 5], ['9 × @ = 63', 7]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Utiliser les tables de 6, 7, 8 et 9 pour résoudre des problèmes'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une boîte contient 6 œufs. Combien d\'œufs dans 7 boîtes ?', corr: cm1Redac('Œufs', '7 × 6 = 42', 'Il y a 42 œufs dans 7 boîtes.') },
      { etoiles: 2, cahier: true, consigne: 'Une araignée a 8 pattes. Combien de pattes ont 9 araignées ?', corr: cm1Redac('Pattes', '9 × 8 = 72', '9 araignées ont 72 pattes.') },
      { etoiles: 2, cahier: true, consigne: 'Une semaine a 7 jours. Combien de jours dans 6 semaines ?', corr: cm1Redac('Jours', '6 × 7 = 42', 'Il y a 42 jours dans 6 semaines.') },
      { etoiles: 3, cahier: true, consigne: 'On range 54 billes dans des sacs de 9 billes. Combien de sacs faut-il ?', corr: cm1Redac('Sacs', '6 × 9 = 54', 'Il faut 6 sacs.') },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau.',
        eleve: cm1Tableau(['×', '6', '7', '8', '9'], [['<b>6</b>', '', '', '', ''], ['<b>7</b>', '', '', '', ''], ['<b>8</b>', '', '', '', ''], ['<b>9</b>', '', '', '', '']]),
        corr: cm1Tableau(['×', '6', '7', '8', '9'], [6, 7, 8, 9].map(a => [`<b>${a}</b>`, ...[6, 7, 8, 9].map(b => R(a * b))])) },
    ] },
];
})();

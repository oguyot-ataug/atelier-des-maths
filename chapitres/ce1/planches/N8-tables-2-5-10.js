/* CE1 · Planches : Tables de multiplication de 2, 5 et 10 (N8). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const table = (t, trous) => ({ eleve: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? '' : String((i + 1) * t))]]),
  corr: cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => trous.includes(i + 1) ? `<b style="color:#2E9C6A;">${(i + 1) * t}</b>` : String((i + 1) * t))]]) });
PLANCHES['ce1|Tables de multiplication de 2, 5 et 10'] = [
  { titre: 'La table de 2', duree: '20 min',
    attendus: ['Construire et connaître la table de 2 (les doubles)'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 2.', ...table(2, [3, 5, 7, 8, 10]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['2 × 6 = @', 12], ['2 × 9 = @', 18], ['8 × 2 = @', 16], ['2 × @ = 14', 7]], 2) },
    ] },
  { titre: 'Les tables de 5 et de 10', duree: '25 min',
    attendus: ['Construire et connaître les tables de 5 et de 10'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 5.', ...table(5, [2, 4, 6, 7, 9]) },
      { etoiles: 1, consigne: 'Complète la table de 10.', ...table(10, [3, 5, 6, 8, 9]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['5 × 8 = @', 40], ['10 × 7 = @', 70], ['5 × @ = 30', 6], ['@ × 10 = 90', 9]], 2) },
    ] },
  { titre: 'Utiliser les tables', duree: '20 min',
    attendus: ['Résoudre des problèmes avec les tables de 2, 5 et 10'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un billet de 5 €. Combien valent 6 billets de 5 € ?', corr: cm1Redac('Les billets', '6 × 5 = 30', '6 billets de 5 € valent 30 €.') },
      { etoiles: 2, cahier: true, consigne: 'Une boîte contient 10 œufs. Combien d\'œufs dans 8 boîtes ?', corr: cm1Redac('Les œufs', '8 × 10 = 80', 'Il y a 80 œufs.') },
      { etoiles: 3, cahier: true, consigne: 'Dans un parc, il y a 7 vélos et 5 tricycles. Combien de roues en tout ? (un tricycle a 3 roues)', corr: cm1Redac('Les roues', { suite: ['7 × 2 = 14', '5 × 3 = 15', '14 + 15 = 29'] }, 'Il y a 29 roues en tout.') },
    ] },
];
})();

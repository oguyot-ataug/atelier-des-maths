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
      { etoiles: 1, col: 1, consigne: 'Compte de 2 en 2.', ...P3.rmp([['2, 4, 6, @, @, @', 8, 10, 12], ['20, 18, 16, @, @', 14, 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Le double de 8 : @', 16], ['2 × 10 = @', 20], ['2 × 4 = @', 8]], 2) },
      { etoiles: 1, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(2, 7, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2), ce1Rangees(2, 9, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2)], 2),
        corr: plGrille([ce1Rangees(2, 7, { p: 16 }) + '<br>' + R('2 × 7 = 14'), ce1Rangees(2, 9, { p: 16 }) + '<br>' + R('2 × 9 = 18')], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['2 × @ = 16', 8], ['@ × 2 = 20', 10], ['2 × @ = 0', 0]], 2) },
    ] },
  { titre: 'Les tables de 5 et de 10', duree: '25 min',
    attendus: ['Construire et connaître les tables de 5 et de 10'],
    exos: [
      { etoiles: 1, consigne: 'Complète la table de 5.', ...table(5, [2, 4, 6, 7, 9]) },
      { etoiles: 1, consigne: 'Complète la table de 10.', ...table(10, [3, 5, 6, 8, 9]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['5 × 8 = @', 40], ['10 × 7 = @', 70], ['5 × @ = 30', 6], ['@ × 10 = 90', 9]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète les suites.', ...P3.rmp([['5, 10, 15, @, @', 20, 25], ['10, 20, 30, @, @', 40, 50]], 2) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([['3 billets de 10 € : @ €', 30], ['7 billets de 5 € : @ €', 35], ['4 billets de 10 € : @ €', 40], ['6 billets de 5 € : @ €', 30], ['9 billets de 10 € : @ €', 90], ['8 pièces de 2 € : @ €', 16]], 2) },
    ] },
  { titre: 'Utiliser les tables', duree: '20 min',
    attendus: ['Résoudre des problèmes avec les tables de 2, 5 et 10'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un billet de 5 €. Combien valent 6 billets de 5 € ?', corr: cm1Redac('Les billets', '6 × 5 = 30', '6 billets de 5 € valent 30 €.') },
      { etoiles: 2, cahier: true, consigne: 'Une boîte contient 10 œufs. Combien d\'œufs dans 8 boîtes ?', corr: cm1Redac('Les œufs', '8 × 10 = 80', 'Il y a 80 œufs.') },
      { etoiles: 3, cahier: true, consigne: 'Dans un parc, il y a 7 vélos et 5 tricycles. Combien de roues en tout ? (un tricycle a 3 roues)', corr: cm1Redac('Les roues', { suite: ['7 × 2 = 14', '5 × 3 = 15', '14 + 15 = 29'] }, 'Il y a 29 roues en tout.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['2 × 8 = @', 16], ['5 × 5 = @', 25], ['10 × 10 = @', 100], ['5 × 9 = @', 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['6 mains : @ doigts', 30], ['9 paires : @ chaussures', 18], ['5 boîtes de 10 crayons : @ crayons', 50]], 2) },
      { etoiles: 2, consigne: 'Complète le tableau.',
        eleve: lig(cm1Tableau(['×', '3', '6', '8'], [['<b>2</b>', '', '', ''], ['<b>5</b>', '', '', ''], ['<b>10</b>', '', '', '']])),
        corr: lig(cm1Tableau(['×', '3', '6', '8'], [['<b>2</b>', R(6), R(12), R(16)], ['<b>5</b>', R(15), R(30), R(40)], ['<b>10</b>', R(30), R(60), R(80)]])) },
    ] },
  { titre: 'Pair ou impair ?', duree: '20 min',
    attendus: ['Dire si un nombre est pair ou impair'],
    exos: [
      { etoiles: 1, consigne: 'Range les jetons par 2. Le nombre est-il pair ou impair ?', ...PCP.compte([[ce1Rangees(2, 3, { p: 22 }), 'pair'], [cpJetons(7, 0, Array(7).fill(CPC.jeton)), 'impair'], [ce1Rangees(2, 5, { p: 22 }), 'pair']], 3, 4) },
      { etoiles: 1, col: 1, consigne: 'Entoure les nombres pairs.', eleve: '<b>34 · 57 · 120 · 89 · 466 · 703 · 958</b>', corr: '<b>' + [34, 57, 120, 89, 466, 703, 958].map(v => v % 2 ? String(v) : plEntoure(String(v))).join(' · ') + '</b>' },
      { etoiles: 2, col: 1, consigne: 'Écris pair ou impair.', ...P3.rmp([['248 : @', 'pair'], ['365 : @', 'impair'], ['500 : @', 'pair'], ['871 : @', 'impair']], 4) },
      { etoiles: 2, col: 1, consigne: 'Écris tous les nombres pairs compris entre 767 et 778.', eleve: P3.B(30), corr: P3.R('768, 770, 772, 774, 776') },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['Le nombre pair qui suit 459 : @', 460], ['Le nombre impair qui suit 459 : @', 461], ['Le plus grand nombre pair à trois chiffres : @', 998]], 3) },
    ] },
];
})();

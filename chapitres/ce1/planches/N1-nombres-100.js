/* CE1 · Planches : Les nombres jusqu'à 100 (N1). */
(() => {
const { lig, compte, suite } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Les nombres jusqu\'à 100'] = [
  { titre: 'Dizaines et unités', duree: '25 min',
    attendus: ['Dénombrer jusqu\'à 100 avec des dizaines', 'Décomposer un nombre en dizaines et unités'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre de cubes.', ...compte([[cpBarres(47, { q: 6 }), 47], [cpBarres(83, { q: 6 }), 83], [cpBarres(60, { q: 6 }), 60]], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['8 dizaines et 5 unités : @', 85], ['3 dizaines et 12 unités : @', 42], ['10 dizaines : @', 100]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose.', ...P3.rmp([['74 = @ + 4', 70], ['96 = 90 + @', 6], ['58 = @ dizaines et @ unités', 5, 8]], 2) },
    ] },
  { titre: 'Écrire les nombres en lettres', duree: '25 min',
    attendus: ['Écrire en chiffres et en lettres les nombres jusqu\'à 100'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['soixante-treize : @', 73], ['quatre-vingt-six : @', 86], ['quatre-vingt-quinze : @', 95], ['soixante et onze : @', 71]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.', ...P3.rmp([['78 : @', 'soixante-dix-huit'], ['80 : @', 'quatre-vingts'], ['92 : @', 'quatre-vingt-douze']], 11) },
    ] },
  { titre: 'La droite graduée', duree: '25 min',
    attendus: ['Lire et placer des nombres sur une droite graduée', 'Comparer et ranger les nombres jusqu\'à 100'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre de chaque point.',
        eleve: cm1Axe(40, 60, 1, 5, [[43, 'A'], [50, 'B'], [57, 'C']]) + plListe(['A : ' + B(2) + '   B : ' + B(2) + '   C : ' + B(2)]),
        corr: cm1Axe(40, 60, 1, 5, [[43, 'A'], [50, 'B'], [57, 'C']]) + plListe(['A : ' + R(43) + '   B : ' + R(50) + '   C : ' + R(57)]) },
      { etoiles: 2, consigne: 'Place les points D (70), E (85) et F (95).', eleve: cm1Axe(60, 100, 5, 10, []), corr: cm1Axe(60, 100, 5, 10, [[70, 'D'], [85, 'E'], [95, 'F']]) },
      { etoiles: 2, col: 1, consigne: 'Écris <, > ou =.',
        eleve: plListe(['67 ' + plCase() + ' 76', '89 ' + plCase() + ' 98', '50 ' + plCase() + ' 49']), corr: plListe(['67 ' + R('<') + ' 76', '89 ' + R('<') + ' 98', '50 ' + R('>') + ' 49']) },
      { etoiles: 3, col: 1, consigne: 'Range du plus petit au plus grand : 81, 18, 80, 69.', ...P3.rmp([['@', '18 < 69 < 80 < 81']], 12) },
    ] },
];
})();

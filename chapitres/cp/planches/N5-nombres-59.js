/* CP · Planches : Les nombres jusqu'à 59 (N5) -- dizaines et unités, écrire, tableau des nombres. */
(() => {
const { lig, compte, suite, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Les nombres jusqu\'à 59'] = [
  { titre: 'Compter avec des dizaines', duree: '25 min',
    attendus: ['Dénombrer une collection en faisant des groupes de dix', 'Connaître la valeur des chiffres : dizaines et unités'],
    exos: [
      { etoiles: 1, consigne: 'Combien de cubes ? Écris le nombre.',
        ...compte([[cpBarres(23, { q: 7 }), 23], [cpBarres(41, { q: 7 }), 41], [cpBarres(35, { q: 7 }), 35], [cpBarres(50, { q: 7 }), 50]], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['3 dizaines et 4 unités : @', 34], ['5 dizaines et 2 unités : @', 52], ['2 dizaines : @', 20], ['4 dizaines et 9 unités : @', 49]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose.',
        ...P3.rmp([['27 = 20 + @', 7], ['45 = @ + 5', 40], ['58 = @ + @', 50, 8]], 2) },
    ] },
  { titre: 'Écrire les nombres jusqu\'à 59', duree: '20 min',
    attendus: ['Écrire les nombres en chiffres et en lettres', 'Dizaines entières : vingt, trente, quarante, cinquante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...P3.rmp([['trente-deux : @', 32], ['quarante et un : @', 41], ['cinquante-six : @', 56], ['vingt-neuf : @', 29]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...P3.rmp([['24 : @', 'vingt-quatre'], ['30 : @', 'trente'], ['51 : @', 'cinquante et un']], 10) },
      { etoiles: 3, consigne: 'Dessine 34 avec des barres de dix et des cubes.',
        eleve: cadre(90), corr: lig(cpBarres(34, { q: 8 })) },
    ] },
  { titre: 'La suite des nombres', duree: '20 min',
    attendus: ['Connaître la suite des nombres jusqu\'à 59', 'Le nombre d\'avant, le nombre d\'après, passer à la dizaine'],
    exos: [
      { etoiles: 1, consigne: 'Complète la suite.',
        ...suite([26, 27, '@28', 29, '@30', 31, '@32', 33, 34]) },
      { etoiles: 2, consigne: 'Complète ce morceau du tableau des nombres.',
        eleve: lig(cpTableau(30, 49, { trous: [33, 36, 40, 44, 47], c: 28 })), corr: lig(cpTableau(30, 49, { on: [33, 36, 40, 44, 47], c: 28 })) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Juste après 39 : @', 40], ['Juste avant 50 : @', 49], ['Juste après 49 : @', 50], ['Juste avant 30 : @', 29]], 2) },
    ] },
];
})();

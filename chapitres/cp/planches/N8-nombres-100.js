/* CP · Planches : Les nombres jusqu'à 100 (N8). */
(() => {
const { lig, compte, suite, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Les nombres jusqu\'à 100'] = [
  { titre: 'Dizaines et unités jusqu\'à 100', duree: '25 min',
    attendus: ['Dénombrer jusqu\'à 100 avec des groupes de dix', 'Décomposer un nombre en dizaines et unités'],
    exos: [
      { etoiles: 1, consigne: 'Combien de cubes ?',
        ...compte([[cpBarres(64, { q: 6 }), 64], [cpBarres(87, { q: 6 }), 87], [cpBarres(70, { q: 6 }), 70]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['7 dizaines et 3 unités : @', 73], ['9 dizaines : @', 90], ['10 dizaines : @', 100], ['6 dizaines et 8 unités : @', 68]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose.',
        ...P3.rmp([['85 = 80 + @', 5], ['92 = @ + 2', 90], ['67 = @ + @', 60, 7]], 2) },
    ] },
  { titre: 'Lire et écrire de 60 à 100', duree: '25 min',
    attendus: ['Écrire en chiffres les nombres de 60 à 100 (soixante-dix, quatre-vingts, quatre-vingt-dix)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...P3.rmp([['soixante-cinq : @', 65], ['soixante-douze : @', 72], ['quatre-vingts : @', 80], ['quatre-vingt-dix-neuf : @', 99]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...P3.rmp([['76 : @', 'soixante-seize'], ['81 : @', 'quatre-vingt-un'], ['93 : @', 'quatre-vingt-treize']], 10) },
      { etoiles: 3, col: 1, consigne: 'Relie le mot au nombre : écris le nombre.',
        ...P3.rmp([['soixante et onze : @', 71], ['quatre-vingt-onze : @', 91], ['soixante-dix-sept : @', 77]], 2) },
    ] },
  { titre: 'Le tableau des nombres', duree: '20 min',
    attendus: ['Se repérer dans le tableau des nombres jusqu\'à 99', 'Le nombre d\'avant et d\'après, + 10 et − 10'],
    exos: [
      { etoiles: 1, consigne: 'Complète ce morceau du tableau.',
        eleve: lig(cpTableau(60, 89, { trous: [63, 69, 71, 75, 80, 86], c: 26 })), corr: lig(cpTableau(60, 89, { on: [63, 69, 71, 75, 80, 86], c: 26 })) },
      { etoiles: 2, consigne: 'Complète la suite.',
        ...suite([96, 97, '@98', '@99', '@100']) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Après 79 : @', 80], ['Avant 90 : @', 89], ['Après 69 : @', 70]], 2) },
    ] },
];
})();

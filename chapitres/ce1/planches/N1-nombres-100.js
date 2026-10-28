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
      { etoiles: 1, consigne: 'Écris le nombre de cubes.', ...compte([[cpBarres(25, { q: 6 }), 25], [cpBarres(39, { q: 6 }), 39], [cpBarres(92, { q: 6 }), 92]], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de dizaines ?', ...P3.rmp([['Dans 64 : @ dizaines', 6], ['Dans 90 : @ dizaines', 9], ['Dans 100 : @ dizaines', 10]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['4 dizaines et 15 unités : @', 55], ['6 dizaines et 10 unités : @', 70], ['2 dizaines et 23 unités : @', 43]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose.', ...P3.rmp([['65 = 60 + @', 5], ['31 = @ + 1', 30], ['99 = @ + @', 90, 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quel est le chiffre des dizaines ?', ...P3.rmp([['dans 58 : @', 5], ['dans 7 : @', 0], ['dans 40 : @', 4]], 2) },
    ] },
  { titre: 'Écrire les nombres en lettres', duree: '25 min',
    attendus: ['Écrire en chiffres et en lettres les nombres jusqu\'à 100'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['soixante-treize : @', 73], ['quatre-vingt-six : @', 86], ['quatre-vingt-quinze : @', 95], ['soixante-et-onze : @', 71]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.', ...P3.rmp([['78 : @', 'soixante-dix-huit'], ['80 : @', 'quatre-vingts'], ['92 : @', 'quatre-vingt-douze']], 11) },
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['quarante-quatre : @', 44], ['soixante : @', 60], ['quatre-vingt-dix-neuf : @', 99], ['trente-et-un : @', 31]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.', ...P3.rmp([['65 : @', 'soixante-cinq'], ['77 : @', 'soixante-dix-sept'], ['100 : @', 'cent']], 11) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon nombre.', ...P3.chx([['soixante-quinze', '75', '65 · 75 · 615'], ['quatre-vingt-deux', '82', '82 · 422 · 92'], ['soixante-dix-neuf', '79', '79 · 6019 · 69']]) },
      { etoiles: 2, col: 1, consigne: 'Écris le nombre d\'avant et le nombre d\'après.', ...P3.rmp([['@ < 70 < @', 69, 71], ['@ < 80 < @', 79, 81], ['@ < 59 < @', 58, 60]], 2) },
      { etoiles: 1, consigne: 'Complète la suite.', ...suite([67, 68, '@69', '@70', 71, '@72', 73, '@74']) },
      { etoiles: 2, consigne: 'Complète : on avance de 10 en 10.', ...suite([13, 23, '@33', 43, '@53', '@63', 73, '@83']) },
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
      { etoiles: 3, col: 1, consigne: 'Range du plus petit au plus grand : 81, 18, 80, 69.', ...P3.rmp([['@ < @ < @ < @', '18', '69', '80', '81']], 3) },
      { etoiles: 2, col: 1, consigne: 'Écris les dizaines qui entourent le nombre.', ...P3.rmp([['@ < 47 < @', 40, 50], ['@ < 82 < @', 80, 90], ['@ < 95 < @', 90, 100]], 2) },
      { etoiles: 3, col: 1, consigne: 'Écris le nombre de chaque point.',
        eleve: cm1Axe(70, 90, 1, 5, [[72, 'G'], [78, 'H'], [86, 'I']]) + plListe(['G : ' + B(2), 'H : ' + B(2), 'I : ' + B(2)]),
        corr: cm1Axe(70, 90, 1, 5, [[72, 'G'], [78, 'H'], [86, 'I']]) + plListe(['G : ' + R(72), 'H : ' + R(78), 'I : ' + R(86)]) },
    ] },
  { titre: 'Premier, deuxième… et les suites', duree: '20 min',
    attendus: ['Utiliser les nombres ordinaux', 'Relier le rang au nombre d\'éléments qui précèdent', 'Continuer une suite répétitive ou évolutive'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres le rang.', ...P3.rmp([['premier : @', '1<sup>er</sup>'], ['quinzième : @', '15<sup>e</sup>'], ['vingt-et-unième : @', '21<sup>e</sup>'], ['centième : @', '100<sup>e</sup>']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Avant le 12<sup>e</sup> de la file, il y a @ enfants.', 11], ['Le coureur qui arrive après le 48<sup>e</sup> est le @.', '49<sup>e</sup>'], ['Avant le 48<sup>e</sup> coureur, il y a @ coureurs.', 47]], 3) },
      { etoiles: 1, consigne: 'Continue la suite répétitive.', ...PCP.suite(['△', '▢', '○', '△', '▢', '○', '@△', '@▢', '@○']) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['ABABAB… La 10<sup>e</sup> lettre est @.', 'B'], ['ABABAB… La 17<sup>e</sup> lettre est @.', 'A'], ['1, 3, 5, 7, 9… Le nombre suivant est @.', 11]], 2) },
      { etoiles: 3, col: 1, consigne: 'Suite évolutive : on ajoute 1, puis 2, puis 3… Complète.', ...PCP.suite([1, 2, 4, 7, 11, '@16', '@22', '@29']) },
    ] },
];
})();

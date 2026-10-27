/* CE1 · Planches : Les nombres jusqu'à 1 000 (N3). */
(() => {
const { lig, compte, suite } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Les nombres jusqu\'à 1 000'] = [
  { titre: 'Centaines, dizaines, unités', duree: '25 min',
    attendus: ['Comprendre la centaine (10 dizaines, 100 unités)', 'Dénombrer avec des centaines, des dizaines et des unités'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre représenté.', ...compte([[ce1Plaques(234, { q: 5 }), 234], [ce1Plaques(152, { q: 5 }), 152], [ce1Plaques(307, { q: 5 }), 307]], 3, 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 centaine = @ dizaines', 10], ['1 centaine = @ unités', 100], ['10 centaines = @', '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['5 centaines, 3 dizaines, 8 unités : @', 538], ['7 centaines et 4 unités : @', 704], ['2 centaines et 15 dizaines : @', 350]], 3) },
    ] },
  { titre: 'Écrire les nombres jusqu\'à 1 000', duree: '25 min',
    attendus: ['Écrire les nombres en chiffres et en lettres', 'Décomposer un nombre de trois chiffres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['trois cent quarante : @', 340], ['six cent deux : @', 602], ['neuf cent quatre-vingt-dix : @', 990]], 3) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.', ...P3.rmp([['200 : @', 'deux cents'], ['415 : @', 'quatre cent quinze'], ['730 : @', 'sept cent trente']], 11) },
      { etoiles: 2, col: 1, consigne: 'Décompose.', ...P3.rmp([['468 = 400 + @ + 8', 60], ['905 = @ + 5', 900], ['671 = @ + @ + @', 600, 70, 1]], 3) },
    ] },
  { titre: 'La droite graduée jusqu\'à 1 000', duree: '20 min',
    attendus: ['Lire et placer des nombres sur une droite graduée de 10 en 10, de 100 en 100'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre de chaque point.',
        eleve: cm1Axe(0, 1000, 100, 100, [[200, 'A'], [600, 'B'], [900, 'C']]) + plListe(['A : ' + B(3) + '   B : ' + B(3) + '   C : ' + B(3)]),
        corr: cm1Axe(0, 1000, 100, 100, [[200, 'A'], [600, 'B'], [900, 'C']]) + plListe(['A : ' + R(200) + '   B : ' + R(600) + '   C : ' + R(900)]) },
      { etoiles: 2, consigne: 'Écris le nombre de chaque point.',
        eleve: cm1Axe(300, 400, 10, 50, [[320, 'D'], [370, 'E']]) + plListe(['D : ' + B(3) + '   E : ' + B(3)]),
        corr: cm1Axe(300, 400, 10, 50, [[320, 'D'], [370, 'E']]) + plListe(['D : ' + R(320) + '   E : ' + R(370)]) },
      { etoiles: 2, consigne: 'Complète les suites.', eleve: plListe(['380, 390, ' + B(3) + ', ' + B(3) + ', 420', '700, 800, ' + B(3) + ', ' + B(3)]), corr: plListe(['380, 390, ' + R(400) + ', ' + R(410) + ', 420', '700, 800, ' + R(900) + ', ' + R('1 000')]) },
      { etoiles: 3, cahier: true, consigne: 'Une école commande 6 cartons de 100 cahiers et 4 paquets de 10 cahiers. Combien de cahiers en tout ?', corr: cm1Redac('Cahiers commandés', '600 + 40 = 640', 'L\'école commande 640 cahiers.') },
    ] },
];
})();

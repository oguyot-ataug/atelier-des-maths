/* CP · Planches : Décomposer les nombres jusqu'à 10 (N2) -- maisons des nombres, compléments à 10, doubles. */
(() => {
const { lig, compte, suite, cadre } = PCP, B = P3.B, R = P3.R;
const deux = (a, b) => cpJetons(a + b, 0, cpBleus(a, b));
PLANCHES['cp|Décomposer les nombres jusqu\'à 10'] = [
  { titre: 'Les maisons des nombres', duree: '25 min',
    attendus: ['Décomposer un nombre jusqu\'à 10 en deux nombres', 'Écrire une décomposition avec + et ='],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons rouges ? Combien de bleus ? Complète.',
        eleve: plListe([deux(3, 2) + ' 5 = ' + B(1) + ' + ' + B(1), deux(4, 3) + ' 7 = ' + B(1) + ' + ' + B(1), deux(6, 2) + ' 8 = ' + B(1) + ' + ' + B(1)]),
        corr: plListe([deux(3, 2) + ' 5 = ' + R(3) + ' + ' + R(2), deux(4, 3) + ' 7 = ' + R(4) + ' + ' + R(3), deux(6, 2) + ' 8 = ' + R(6) + ' + ' + R(2)]) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 6.',
        ...P3.rmp([['6 = 5 + @', 1], ['6 = 4 + @', 2], ['6 = 3 + @', 3], ['6 = @ + 4', 2], ['6 = @ + 5', 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 9.',
        ...P3.rmp([['9 = 8 + @', 1], ['9 = 5 + @', 4], ['9 = @ + 3', 6], ['9 = @ + 7', 2]], 2) },
    ] },
  { titre: 'Faire 10', duree: '20 min',
    attendus: ['Connaître les compléments à 10', 'Trouver ce qui manque pour remplir la boîte de dix'],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons manque-t-il pour remplir la boîte ?',
        ...compte([[cpBoiteDix(7, { c: 20 }), 3], [cpBoiteDix(4, { c: 20 }), 6], [cpBoiteDix(9, { c: 20 }), 1]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète pour faire 10.',
        ...P3.rmp([['8 + @ = 10', 2], ['5 + @ = 10', 5], ['3 + @ = 10', 7], ['@ + 4 = 10', 6]], 2) },
      { etoiles: 3, consigne: 'J\'ai déjà 6 images. Il me faut 10 images pour remplir la page. Combien d\'images me manque-t-il ?',
        eleve: cadre(60),
        corr: cm1Redac('Images qui manquent', '6 + 4 = 10', 'Il me manque 4 images.', cpBoiteDix(6, { c: 20, vides: [6, 7, 8, 9] })) },
    ] },
  { titre: 'Les doubles', duree: '15 min',
    attendus: ['Connaître les doubles jusqu\'à 5 + 5', 'Reconnaître un double sur les dés et les doigts'],
    exos: [
      { etoiles: 1, consigne: 'Écris le double.',
        eleve: plGrille([lig(cpDe(2, { c: 30 }), cpDe(2, { c: 30 })) + '2 + 2 = ' + B(1), lig(cpDe(4, { c: 30 }), cpDe(4, { c: 30 })) + '4 + 4 = ' + B(1), lig(cpDe(5, { c: 30 }), cpDe(5, { c: 30 })) + '5 + 5 = ' + B(1)], 3),
        corr: plGrille([lig(cpDe(2, { c: 30 }), cpDe(2, { c: 30 })) + '2 + 2 = ' + R(4), lig(cpDe(4, { c: 30 }), cpDe(4, { c: 30 })) + '4 + 4 = ' + R(8), lig(cpDe(5, { c: 30 }), cpDe(5, { c: 30 })) + '5 + 5 = ' + R(10)], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['3 + 3 = @', 6], ['1 + 1 = @', 2], ['@ + @ = 8', 4, 4]], 2) },
      { etoiles: 3, consigne: 'Sam a 2 mains. Il lève 3 doigts sur chaque main. Combien de doigts lève-t-il ?',
        eleve: cadre(50), corr: cm1Redac('Doigts levés', '3 + 3 = 6', 'Sam lève 6 doigts : c\'est le double de 3.') },
    ] },
];
})();

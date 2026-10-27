/* CP · Planches : L'addition posée (N12). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
const vide = (a, b) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', '']]);
const pose = (a, b, r) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r || '  ');
const deux = (L) => ({ eleve: plGrille(L.map(([a, b]) => vide(a, b)), L.length), corr: plGrille(L.map(([a, b, r]) => pose(a, b, r)), L.length) });
PLANCHES['cp|L\'addition posée'] = [
  { titre: 'Poser une addition', duree: '25 min',
    attendus: ['Poser une addition en alignant les unités et les dizaines', 'Calculer une addition posée sans retenue'],
    exos: [
      { etoiles: 1, consigne: 'Calcule.', ...deux([[23, 15], [41, 36], [52, 27]]) },
      { etoiles: 2, consigne: 'Pose et calcule.', eleve: plGrille(['34 + 25', '60 + 18', '13 + 72'].map(t => t + cadre(80)), 3), corr: plGrille([pose(34, 25), pose(60, 18), pose(13, 72)], 3) },
      { etoiles: 1, consigne: 'Calcule.', ...deux([[64, 23], [35, 42], [71, 18]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['30 + 40 = @', 70], ['25 + 3 = @', 28], ['50 + 26 = @', 76]], 2) },
      { etoiles: 3, col: 1, consigne: 'Le calcul est-il bien posé ? Entoure.',
        eleve: plGrille([cm1Posee([[' ', '34'], ['+', ' 5'], [' ', '']]) + '<br><b>oui · non</b>', cm1Posee([[' ', '34'], ['+', '5 '], [' ', '']]) + '<br><b>oui · non</b>'], 2),
        corr: plGrille([cm1Posee([[' ', '34'], ['+', ' 5'], [' ', '39']]) + '<br>' + plEntoure('oui'), cm1Posee([[' ', '34'], ['+', '5 '], [' ', '']]) + '<br>' + plEntoure('non') + ' : le 5 doit être sous les unités'], 2) },
    ] },
  { titre: 'Avec une retenue', duree: '25 min',
    attendus: ['Calculer une addition posée avec une retenue'],
    exos: [
      { etoiles: 1, consigne: 'Calcule (attention à la retenue).', ...deux([[28, 15, '1 '], [36, 47, '1 '], [59, 23, '1 ']]) },
      { etoiles: 2, consigne: 'Pose et calcule.', eleve: plGrille(['45 + 38', '17 + 66', '29 + 29'].map(t => t + cadre(80)), 3), corr: plGrille([pose(45, 38, '1 '), pose(17, 66, '1 '), pose(29, 29, '1 ')], 3) },
      { etoiles: 2, consigne: 'Calcule (attention à la retenue).', ...deux([[18, 26, '1 '], [47, 35, '1 '], [64, 19, '1 ']]) },
      { etoiles: 1, col: 1, consigne: 'Y aura-t-il une retenue ? Entoure.',
        ...P3.chx([['34 + 25', 'non', 'oui · non'], ['48 + 36', 'oui', 'oui · non'], ['57 + 15', 'oui', 'oui · non'], ['62 + 27', 'non', 'oui · non']]) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Utiliser l\'addition posée pour résoudre un problème'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Au CP A, il y a 24 élèves. Au CP B, il y en a 23. Combien d\'élèves en tout ?',
        corr: cm1Redac('Élèves des CP', { pose: pose(24, 23) }, 'Il y a 47 élèves en tout.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 58 € et un casque 27 €. Combien coûtent-ils ensemble ?',
        corr: cm1Redac('Prix total', { pose: pose(58, 27, '1 ') }, 'Ensemble, ils coûtent 85 €.') },
      { etoiles: 1, col: 1, consigne: 'Léa a 35 billes, Max en a 42. Combien de billes ont-ils en tout ?',
        eleve: lig(vide(35, 42)) + lig('Ils ont ' + B(2) + ' billes.'), corr: lig(pose(35, 42)) + lig('Ils ont ' + R(77) + ' billes.') },
      { etoiles: 2, col: 1, consigne: 'Dans le train, il y a 46 voyageurs. 28 voyageurs montent. Combien sont-ils ?',
        eleve: lig(vide(46, 28)) + lig('Ils sont ' + B(2) + '.'), corr: lig(pose(46, 28, '1 ')) + lig('Ils sont ' + R(74) + '.') },
      { etoiles: 3, consigne: 'Tom lit un livre de 39 pages, puis un livre de 45 pages. Combien de pages a-t-il lues ? Pose l\'addition.',
        eleve: cadre(80) + lig('Il a lu ' + B(2) + ' pages.'), corr: lig(pose(39, 45, '1 ')) + lig('Il a lu ' + R(84) + ' pages.') },
    ] },
];
})();

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
    ] },
  { titre: 'Avec une retenue', duree: '25 min',
    attendus: ['Calculer une addition posée avec une retenue'],
    exos: [
      { etoiles: 1, consigne: 'Calcule (attention à la retenue).', ...deux([[28, 15, '1 '], [36, 47, '1 '], [59, 23, '1 ']]) },
      { etoiles: 2, consigne: 'Pose et calcule.', eleve: plGrille(['45 + 38', '17 + 66', '29 + 29'].map(t => t + cadre(80)), 3), corr: plGrille([pose(45, 38, '1 '), pose(17, 66, '1 '), pose(29, 29, '1 ')], 3) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Utiliser l\'addition posée pour résoudre un problème'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Au CP A, il y a 24 élèves. Au CP B, il y en a 23. Combien d\'élèves en tout ?',
        corr: cm1Redac('Élèves des CP', { pose: pose(24, 23) }, 'Il y a 47 élèves en tout.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 58 € et un casque 27 €. Combien coûtent-ils ensemble ?',
        corr: cm1Redac('Prix total', { pose: pose(58, 27, '1 ') }, 'Ensemble, ils coûtent 85 €.') },
    ] },
];
})();

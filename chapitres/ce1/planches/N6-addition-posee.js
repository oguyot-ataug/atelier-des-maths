/* CE1 · Planches : L'addition posée (N6). */
(() => {
const { cadre } = PCP, B = P3.B, R = P3.R;
const vide = (a, b) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', '']]);
const pose = (a, b, r) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r || '   ');
const grille = L => ({ eleve: plGrille(L.map(([a, b]) => vide(a, b)), L.length), corr: plGrille(L.map(([a, b, r]) => pose(a, b, r)), L.length) });
const aPoser = L => ({ eleve: plGrille(L.map(([a, b]) => `${a} + ${b}${cadre(90)}`), L.length), corr: plGrille(L.map(([a, b, r]) => pose(a, b, r)), L.length) });
PLANCHES['ce1|L\'addition posée'] = [
  { titre: 'Sans retenue', duree: '20 min',
    attendus: ['Poser et calculer une addition de nombres à trois chiffres'],
    exos: [
      { etoiles: 1, consigne: 'Calcule.', ...grille([[324, 152], [451, 237], [206, 583]]) },
      { etoiles: 2, consigne: 'Pose et calcule.', ...aPoser([[612, 75], [43, 254], [310, 409]]) },
      { etoiles: 1, consigne: 'Calcule.', ...grille([[132, 415], [520, 64], [47, 731]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule de tête.', ...P3.rmp([['300 + 200 = @', 500], ['450 + 30 = @', 480], ['600 + 7 = @', 607], ['120 + 120 = @', 240]], 3) },
    ] },
  { titre: 'Avec retenue', duree: '25 min',
    attendus: ['Calculer une addition posée avec une ou deux retenues'],
    exos: [
      { etoiles: 1, consigne: 'Calcule.', ...grille([[247, 136, ' 1 '], [358, 271, '1  '], [465, 278, '11 ']]) },
      { etoiles: 2, consigne: 'Pose et calcule.', ...aPoser([[389, 147, '11 '], [76, 58, '11 '], [595, 205, '11 ']]) },
      { etoiles: 1, consigne: 'Calcule.', ...grille([[164, 128, ' 1 '], [537, 286, '11 '], [48, 375, '11 ']]) },
      { etoiles: 2, col: 1, consigne: 'Y aura-t-il une retenue ? Entoure.', ...P3.chx([['245 + 132', 'non', 'oui · non'], ['367 + 125', 'oui', 'oui · non'], ['480 + 150', 'oui', 'oui · non'], ['613 + 241', 'non', 'oui · non']]) },
    ] },
  { titre: 'Problèmes', duree: '25 min',
    attendus: ['Résoudre des problèmes avec l\'addition posée', 'Vérifier avec un ordre de grandeur'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un fermier a 256 poules et 187 canards. Combien d\'animaux ?', corr: cm1Redac('Animaux', { pose: pose(256, 187, '11 ') }, 'Le fermier a 443 animaux.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 329 € et un casque 48 €. Combien coûtent-ils ensemble ?', corr: cm1Redac('Prix total', { pose: pose(329, 48, ' 1 ') }, 'Ensemble, ils coûtent 377 €.') },
      { etoiles: 3, cahier: true, consigne: 'Additionne 125, 248 et 307.', corr: cm1Redac('Somme', { pose: cm1Posee([[' ', '125'], ['+', '248'], ['+', '307'], [' ', '680']], ' 2 ') }, '125 + 248 + 307 = 680.') },
      { etoiles: 1, col: 1, consigne: 'Il y a 148 filles et 136 garçons dans l\'école. Combien d\'élèves ?', eleve: PCP.lig(vide(148, 136)) + PCP.lig('Il y a ' + B(3) + ' élèves.'), corr: PCP.lig(pose(148, 136, ' 1 ')) + PCP.lig('Il y a ' + R(284) + ' élèves.') },
      { etoiles: 2, col: 1, consigne: 'Un livre a 215 pages, un autre 196. Combien de pages en tout ?', eleve: PCP.lig(vide(215, 196)) + PCP.lig('Il y a ' + B(3) + ' pages.'), corr: PCP.lig(pose(215, 196, '11 ')) + PCP.lig('Il y a ' + R(411) + ' pages.') },
      { etoiles: 2, consigne: 'Sans calculer, entoure le résultat le plus proche.', ...P3.chx([['198 + 305 : environ', '500', '300 · 500 · 800'], ['412 + 389 : environ', '800', '500 · 800 · 1 000'], ['99 + 99 : environ', '200', '100 · 200 · 1 000']]) },
    ] },
];
})();

/* CP · Planches : Alignements et tracés sur quadrillage (G3). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Alignements et tracés sur quadrillage'] = [
  { titre: 'Des points alignés', duree: '20 min',
    attendus: ['Utiliser la règle pour vérifier si des points sont alignés', 'Tracer un trait droit entre deux points'],
    exos: [
      { etoiles: 1, consigne: 'Avec ta règle, les points sont-ils alignés ? Entoure oui ou non.',
        eleve: plGrille([cpQuadFig(5, 3, [], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C']], px: 130 }) + '<br><b>oui · non</b>', cpQuadFig(5, 3, [], { points: [[0, 2, 'D'], [2, 0, 'E'], [4, 1, 'F']], px: 130 }) + '<br><b>oui · non</b>'], 2),
        corr: plGrille([cpQuadFig(5, 3, [[[[0, 0], [5, 2.5]], CE2C.vert, false]], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C']], px: 130 }) + '<br>' + plEntoure('oui'), cpQuadFig(5, 3, [], { points: [[0, 2, 'D'], [2, 0, 'E'], [4, 1, 'F']], px: 130 }) + '<br>' + plEntoure('non')], 2) },
      { etoiles: 2, consigne: 'Trace à la règle le trait qui relie A et B, puis celui qui relie B et C.',
        eleve: lig(cpQuadFig(8, 4, [], { points: [[1, 3, 'A'], [4, 1, 'B'], [7, 3, 'C']], px: 220 })),
        corr: lig(cpQuadFig(8, 4, [[[[1, 3], [4, 1], [7, 3]], CE2C.violet, false]], { points: [[1, 3, 'A'], [4, 1, 'B'], [7, 3, 'C']], px: 220 })) },
    ] },
  { titre: 'Reproduire sur quadrillage', duree: '25 min',
    attendus: ['Reproduire une figure sur quadrillage en comptant les carreaux'],
    exos: [
      { etoiles: 1, consigne: 'Reproduis la maison à droite.',
        eleve: lig(cpQuadFig(12, 6, [[[[1, 5], [1, 2], [3, 0], [5, 2], [5, 5]], CPC.bord, false]], { points: [[7, 5]], px: 300 })),
        corr: lig(cpQuadFig(12, 6, [[[[1, 5], [1, 2], [3, 0], [5, 2], [5, 5]], CPC.bord, false], [[[7, 5], [7, 2], [9, 0], [11, 2], [11, 5]], CE2C.violet, false]], { px: 300 })) },
      { etoiles: 2, consigne: 'Reproduis l\'escalier à droite.',
        eleve: lig(cpQuadFig(12, 5, [[[[1, 4], [1, 3], [2, 3], [2, 2], [3, 2], [3, 1], [4, 1], [4, 4], [1, 4]], CPC.bord, false]], { points: [[7, 4]], px: 300 })),
        corr: lig(cpQuadFig(12, 5, [[[[1, 4], [1, 3], [2, 3], [2, 2], [3, 2], [3, 1], [4, 1], [4, 4], [1, 4]], CPC.bord, false], [[[7, 4], [7, 3], [8, 3], [8, 2], [9, 2], [9, 1], [10, 1], [10, 4], [7, 4]], CE2C.violet, false]], { px: 300 })) },
    ] },
  { titre: 'Compléter une figure', duree: '20 min',
    attendus: ['Compléter une figure sur quadrillage'],
    exos: [
      { etoiles: 2, consigne: 'Termine le rectangle : 5 carreaux de long, 3 de large.',
        eleve: lig(cpQuadFig(7, 5, [[[[1, 1], [6, 1], [6, 4]], CPC.bord, false]], { px: 180 })),
        corr: lig(cpQuadFig(7, 5, [[[[1, 1], [6, 1], [6, 4], [1, 4]], '#2E9C6A']], { px: 180 })) },
      { etoiles: 3, consigne: 'Termine le carré.',
        eleve: lig(cpQuadFig(6, 6, [[[[1, 1], [5, 1]], CPC.bord, false]], { px: 160 })),
        corr: lig(cpQuadFig(6, 6, [[[[1, 1], [5, 1], [5, 5], [1, 5]], '#2EA8C9']], { px: 160 })) },
    ] },
];
})();

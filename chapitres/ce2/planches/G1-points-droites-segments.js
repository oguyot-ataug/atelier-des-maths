/* ============================================================
   CE2 · Planches : Points, droites, segments (G1)
   Point, segment, droite ; points alignés ; milieu d'un segment ; tracer à la règle ; reproduire une
   figure sur quadrillage. Les notations sont toujours dites avec des mots (« le segment qui va de A à B »).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, L, T, X, D, Q, ligne } = CM2G;
// Figure : points A, B, C, D ; [AB] segment, droite (CD), C, B, E alignés.
const fig1 = (() => { const A = [30, 90], B = [150, 40], C = [60, 30], Dp = [200, 110], E = [240, 20];
  return svg(270, 130, L(A, B, '#1F3A5C', 2) + D(C, Dp, '#2EA8C9', 2, 40) + X(A, 'A', [-10, 4]) + X(B, 'B', [4, -8]) + X(C, 'C', [-8, -8]) + X(Dp, 'D', [10, 4]) + X(E, 'E', [10, 0]), 240); })();
// Trois triplets de points : alignés ou non.
const trio = (pts, n) => svg(150, 90, pts.map((p, i) => X(p, n[i], [0, -9])).join(''), 130);
const tA = trio([[15, 75], [70, 50], [125, 25]], ['F', 'G', 'H']), tB = trio([[15, 30], [75, 70], [135, 30]], ['K', 'L', 'M']), tC = trio([[20, 60], [70, 60], [130, 60]], ['R', 'S', 'T']);
// Figure à reproduire sur quadrillage.
const modele = Q(6, 6, 18, g => ligne(g, [[1, 5], [1, 1], [5, 1], [3, 3], [5, 5]], '#1F3A5C', false) + ligne(g, [[1, 5], [5, 5]], '#1F3A5C', false), 120);
const vide = Q(6, 6, 18, null, 120);
PLANCHES['ce2|Points, droites, segments'] = [
  { titre: 'Point, segment, droite', duree: '25 min',
    attendus: ['Reconnaître et nommer un point, un segment, une droite', 'Utiliser le vocabulaire : extrémité, passer par', 'Tracer à la règle'],
    exos: [
      { etoiles: 1, consigne: `Regarde la figure, puis entoure la bonne réponse.<div style="text-align:center;">${fig1}</div>`,
        ...chx([['Le trait qui va de A à B est…', 'un segment', 'un segment · une droite'], ['Le trait bleu qui passe par C et par D est…', 'une droite', 'un segment · une droite'], ['Le point E est-il sur la droite bleue ?', 'non', 'oui · non']]) },
      { etoiles: 1, col: 1, consigne: 'Complète avec « segment », « droite » ou « point ».',
        ...rmp([['Un @ a deux extrémités.', 'segment'], ['Une @ n\'a pas de fin : on peut la prolonger.', 'droite'], ['On marque un @ par une petite croix.', 'point']], 8) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Place deux points R et S dans ton cahier. Trace le segment qui va de R à S, puis une droite qui passe par S mais pas par R.',
        corr: cm1Redac('Construction', 'segment de R à S, puis une autre droite passant par S', 'Le segment s\'arrête en R et en S ; la droite passe par S et dépasse de chaque côté.', svg(200, 90, L([20, 70], [110, 30], '#1F3A5C', 2) + D([110, 30], [170, 75], '#2EA8C9', 2, 30) + X([20, 70], 'R', [-8, 4]) + X([110, 30], 'S', [0, -9]), 170)) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Un segment a deux extrémités.', 'vrai', 'vrai · faux'], ['Une droite s\'arrête à ses extrémités.', 'faux', 'vrai · faux'], ['Par deux points, on peut tracer une seule droite.', 'vrai', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un segment s\'arrête à ses deux @.', 'extrémités'], ['Une droite ne s\'arrête @.', 'jamais'], ['Des points sur une même droite sont @.', 'alignés']], 4) },
    ] },
  { titre: 'Points alignés', duree: '25 min',
    attendus: ['Repérer des points alignés à l\'œil puis avec la règle', 'Placer un point aligné avec deux autres'],
    exos: [
      { etoiles: 1, consigne: 'Vérifie avec ta règle. Les trois points sont-ils alignés ? Entoure.',
        eleve: plGrille([tA + '<br>oui · non', tB + '<br>oui · non', tC + '<br>oui · non'], 3),
        corr: plGrille([tA + '<br>' + plEntoure('oui'), tB + '<br>' + plEntoure('non'), tC + '<br>' + plEntoure('oui')], 3) },
      { etoiles: 2, consigne: 'Sur le quadrillage, place un point C aligné avec A et B, entre les deux.',
        eleve: Q(10, 5, 20, g => X(g(1, 4), 'A', [-8, 12]) + X(g(9, 0), 'B', [8, 0]), 200),
        corr: Q(10, 5, 20, g => X(g(1, 4), 'A', [-8, 12]) + X(g(9, 0), 'B', [8, 0]) + L(g(1, 4), g(9, 0), '#2EA8C9', 1.4, true) + X(g(5, 2), 'C', [0, -9], '#E35D3A'), 200) },
      { etoiles: 3, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...chx([['Par deux points, on peut faire passer une seule droite.', 'vrai', 'vrai · faux'], ['Trois points sont toujours alignés.', 'faux', 'vrai · faux']]) },
      { etoiles: 2, consigne: 'Avec ta règle, trouve trois points alignés et trace la droite qui passe par eux.',
        eleve: PCP.lig(cpQuadFig(6, 4, [], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C'], [5, 0, 'D'], [1, 3, 'E']], px: 200 })) + PCP.lig('Les points alignés : ' + P3.B(5)),
        corr: PCP.lig(cpQuadFig(6, 4, [[[[0, 0], [6, 3]], CE2C.violet, false]], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C'], [5, 0, 'D'], [1, 3, 'E']], px: 200 })) + PCP.lig('Les points alignés : ' + P3.R('A, B et C')) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Pour vérifier que des points sont alignés, j\'utilise ma @.', 'règle'], ['Deux points sont toujours @.', 'alignés']], 4) },
    ] },
  { titre: 'Le milieu d\'un segment', duree: '25 min',
    attendus: ['Savoir que le milieu est sur le segment, à la même distance des deux extrémités', 'Placer le milieu en mesurant'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le segment qui va de A à B mesure 8 cm. Complète.',
        ...rmp([['Son milieu M est à @ cm de A.', 4], ['M est aussi à @ cm de B.', 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'M est le milieu du segment qui va de C à D. Complète.',
        ...rmp([['Si C et M sont à 3 cm l\'un de l\'autre, le segment mesure @ cm.', 6], ['Si le segment mesure 10 cm, M est à @ cm de D.', 5]], 2) },
      { etoiles: 2, consigne: 'Sur le quadrillage, place le milieu I du segment qui va de E à F, et le milieu J du segment qui va de G à H.',
        eleve: Q(12, 5, 20, g => L(g(1, 1), g(9, 1), '#1F3A5C', 2) + X(g(1, 1), 'E', [-8, -6]) + X(g(9, 1), 'F', [8, -6]) + L(g(2, 4), g(8, 4), '#1F3A5C', 2) + X(g(2, 4), 'G', [-8, 0]) + X(g(8, 4), 'H', [8, 0]), 240),
        corr: Q(12, 5, 20, g => L(g(1, 1), g(9, 1), '#1F3A5C', 2) + X(g(1, 1), 'E', [-8, -6]) + X(g(9, 1), 'F', [8, -6]) + L(g(2, 4), g(8, 4), '#1F3A5C', 2) + X(g(2, 4), 'G', [-8, 0]) + X(g(8, 4), 'H', [8, 0]) + X(g(5, 1), 'I', [0, -9], '#E35D3A') + X(g(5, 4), 'J', [0, -9], '#E35D3A'), 240) },
      { etoiles: 2, consigne: 'Reproduis la figure sur le quadrillage de droite.',
        eleve: plGrille([modele, vide], 2), corr: plGrille([modele, modele], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un segment mesure 12 cm. Son milieu est à @ cm de chaque extrémité.', 6], ['Un segment mesure 9 cm. Son milieu est à @ de chaque extrémité.', '4 cm 5 mm']], 4) },
    ] },
];
})();

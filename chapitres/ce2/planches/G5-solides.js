/* ============================================================
   CE2 · Planches : Les solides (G5)
   Nommer cube, boule, pavé, cône, pyramide, cylindre ; décrire avec face, sommet, arête ; nombre et
   nature des faces ; faces d'une pyramide ; patron du cube (reconnaître un patron).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const DS = PL_DESSINS;
const { Q } = CM2G;
const solides = [['cube', DS.fig(80, 80, DS.pave(10, 72, 46, 46, 18, 14), 70)], ['cylindre', DS.fig(80, 92, DS.cylindre(40, 82, 24, 62), 62)], ['cône', DS.fig(80, 92, DS.cone(40, 84, 26, 70), 62)], ['boule', DS.fig(80, 80, DS.boule(40, 40, 30), 66)], ['pyramide', DS.fig(100, 92, DS.pyramide(50, 84, 52, 26, 56), 74)], ['pavé', DS.fig(110, 70, DS.pave(8, 62, 72, 34, 20, 15), 86)]];
// Patron : cases [x, y].
const patron = cases => cm1Quad(5, 4, cases, { k: 16, contour: true, c: '#F2A93B' });
const patrons = [[[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]], [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1]], [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]], [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]]];
const estPatron = [true, false, true, true];
PLANCHES['ce2|Les solides'] = [
  { titre: 'Reconnaître les solides', duree: '25 min',
    attendus: ['Nommer cube, pavé, cylindre, cône, boule, pyramide', 'Reconnaître des solides dans les objets de tous les jours'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nom de chaque solide.',
        eleve: plGrille(solides.map(([, f]) => f + '<br>' + P3.B(6)), 6),
        corr: plGrille(solides.map(([n, f]) => f + '<br>' + P3.R(n)), 6) },
      { etoiles: 1, col: 1, consigne: 'À quel solide ressemble chaque objet ? Entoure.',
        ...chx([['une boîte de chaussures', 'pavé', 'pavé · cube · cylindre'], ['une canette', 'cylindre', 'cône · cylindre · boule'], ['un dé', 'cube', 'cube · pavé · pyramide'], ['un cornet de glace', 'cône', 'cône · pyramide · cylindre']]) },
      { etoiles: 1, col: 1, consigne: 'À quel solide ressemble… ?', ...P3.rmp([['une boîte à chaussures : @', 'un pavé'], ['une boule de neige : @', 'une boule'], ['une bougie : @', 'un cylindre']], 6) },
      { etoiles: 2, col: 1, consigne: 'Devinettes : qui suis-je ?', ...P3.rmp([['Je n\'ai que des faces carrées : @', 'le cube'], ['J\'ai une face plate en disque et une pointe : @', 'le cône']], 6) },
      { etoiles: 2, col: 1, consigne: 'Roule ou ne roule pas ? Entoure.', ...P3.chx([['le cylindre', 'roule', 'roule · ne roule pas'], ['le pavé', 'ne roule pas', 'roule · ne roule pas'], ['la pyramide', 'ne roule pas', 'roule · ne roule pas']]) },
    ] },
  { titre: 'Faces, arêtes, sommets', duree: '30 min',
    attendus: ['Compter les faces, les arêtes, les sommets d\'un cube et d\'un pavé', 'Décrire les faces d\'un cube, d\'un pavé, d\'une pyramide'],
    exos: [
      { etoiles: 1, consigne: 'Complète le tableau.',
        eleve: cm1Tableau(['', 'Faces', 'Arêtes', 'Sommets'], [['Cube', P3.B(2), P3.B(2), P3.B(2)], ['Pavé', P3.B(2), P3.B(2), P3.B(2)]], { coul: '#558B2F' }),
        corr: cm1Tableau(['', 'Faces', 'Arêtes', 'Sommets'], [['Cube', P3.R(6), P3.R(12), P3.R(8)], ['Pavé', P3.R(6), P3.R(12), P3.R(8)]], { coul: '#558B2F' }) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Les faces d\'un cube sont des @.', 'carrés'], ['Les faces d\'un pavé sont des @.', 'rectangles'], ['Les faces d\'une pyramide qui se rejoignent au sommet sont des @.', 'triangles']], 7) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une pyramide a une base carrée. Combien a-t-elle de faces ? Décris-les.',
        corr: cm1Redac('Faces de la pyramide', '1 base + 4 triangles = 5 faces', 'Elle a 5 faces : une base carrée et 4 triangles qui ont un sommet commun.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le cube a @ faces, @ arêtes, @ sommets.', 6, 12, 8], ['Les faces du pavé sont des @.', 'rectangles']], 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Un cylindre a 2 faces planes.', 'vrai', 'vrai · faux'], ['Une boule a des arêtes.', 'faux', 'vrai · faux'], ['Une pyramide à base carrée a 5 sommets.', 'vrai', 'vrai · faux']]) },
    ] },
  { titre: 'Le patron du cube', duree: '30 min',
    attendus: ['Reconnaître un patron de cube', 'Construire un cube à partir d\'un patron'],
    exos: [
      { etoiles: 2, consigne: 'Ces dessins sont-ils des patrons de cube ? Imagine le pliage, puis entoure oui ou non.',
        eleve: plGrille(patrons.map(p => patron(p) + '<br>oui · non'), 4),
        corr: plGrille(patrons.map((p, i) => patron(p) + '<br>' + plEntoure(estPatron[i] ? 'oui' : 'non')), 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un patron de cube a @ carrés.', 6], ['Quand on plie, chaque carré devient une @.', 'face']], 5) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine sur ton cahier quadrillé un patron de cube en forme de croix, découpe-le et plie-le.',
        corr: cm1Redac('Patron en croix', '4 carrés en ligne et 1 carré au-dessus, 1 en dessous du deuxième', 'Plié, il forme un cube fermé à 6 faces.', patron(patrons[0])) },
      { etoiles: 2, consigne: 'Ces dessins sont-ils des patrons de cube ? Entoure oui ou non.',
        eleve: plGrille([cpQuadFig(6, 2, [[[[0, 0], [6, 0], [6, 1], [0, 1]], '#E9C46A']], { px: 150 }) + '<br><b>oui · non</b>', cpQuadFig(4, 3, [[[[0, 0], [1, 0], [1, 1], [4, 1], [4, 3], [3, 3], [3, 2], [0, 2]], '#2EA8C9']], { px: 110 }) + '<br><b>oui · non</b>'], 2),
        corr: plGrille([cpQuadFig(6, 2, [[[[0, 0], [6, 0], [6, 1], [0, 1]], '#E9C46A']], { px: 150 }) + '<br>' + plEntoure('non'), cpQuadFig(4, 3, [[[[0, 0], [1, 0], [1, 1], [4, 1], [4, 3], [3, 3], [3, 2], [0, 2]], '#2EA8C9']], { px: 110 }) + '<br>' + plEntoure('oui')], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Un patron de cube a @ carrés.', 6], ['Quand on plie, chaque carré devient une @.', 'face']], 3) },
      { etoiles: 3, col: 1, consigne: 'Combien de petits cubes faut-il pour un grand cube… ?', ...P3.rmp([['de 2 cubes de côté : @', 8], ['de 3 cubes de côté : @', 27]], 2) },
    ] },
];
})();

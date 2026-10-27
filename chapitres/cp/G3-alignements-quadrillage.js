/* ============================================================
   CHAPITRE : Alignements et tracés sur quadrillage (CP, G3, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, espace et géométrie : utiliser la
   règle pour tracer un trait droit entre deux points et pour vérifier si des points sont alignés ;
   repérer les nœuds et les lignes d'un quadrillage ; reproduire et compléter une figure sur
   quadrillage en comptant les carreaux.
   Pensé pour être projeté : la règle posée sur deux points, la figure reproduite côté par côté.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const MAISON = [[1, 5], [1, 2], [3, 0], [5, 2], [5, 5], [1, 5]], BATEAU = [[1, 3], [7, 3], [6, 5], [2, 5], [1, 3]], ESCALIER = [[1, 5], [1, 4], [2, 4], [2, 3], [3, 3], [3, 2], [4, 2], [4, 5], [1, 5]];

cm1Chapitre({
  niveau: 'cp', titre: 'Alignements et tracés sur quadrillage', slug: 'alignements-quadrillage',
  cours: `
${cm1Lecon(1, 'Tracer un trait droit')}
${cm1Regle(`Pour tracer un trait droit entre deux points :${cm1Liste(['je pose la règle juste à côté des deux points ;', 'je tiens bien la règle avec l\'autre main, les doigts écartés ;', 'je trace le long de la règle, d\'un point à l\'autre.'])}`, 'Tracer à la règle')}
${cm1Rem('Au tableau : montrer la position des doigts sur la règle. Une erreur fréquente : poser la règle sur les points et les cacher.')}

${cm1Lecon(2, 'Des points alignés')}
${cpAnimAligne('cp-g3-aligne', { presets: [
  { nom: 'Alignés ?', pts: [[70, 160], [250, 110], [400, 68]], aligne: true },
  { nom: 'Et ceux-là ?', pts: [[70, 150], [230, 120], [400, 50]], aligne: false },
  { nom: 'En diagonale', pts: [[90, 40], [240, 110], [390, 180]], aligne: true }] })}
${cm1Def('Des points sont <b>alignés</b> quand on peut tracer <b>un seul trait droit</b> qui passe par tous ces points. Pour le vérifier, on utilise la règle.', 'Alignés')}

${cm1Lecon(3, 'Le quadrillage')}
${cm1Def(`${lig(cpQuadFig(6, 4, [[[[1, 1], [5, 1]], CE2C.violet, false]], { points: [[1, 1, 'A'], [5, 1, 'B'], [3, 3, 'C']] }))}${P('Un quadrillage a des <b>lignes</b> et des <b>nœuds</b> (là où deux lignes se croisent). A, B et C sont sur des nœuds.')}`, 'Lignes et nœuds')}
${cm1Regle('Pour se déplacer sur un quadrillage, on compte les <b>carreaux</b> : de A à B, il y a 4 carreaux.')}

${cm1Lecon(4, 'Reproduire une figure')}
${cpAnimReproduire('cp-g3-reproduire', { presets: [{ nom: 'La maison', pts: MAISON }, { nom: 'Le bateau', pts: BATEAU }, { nom: 'L\'escalier', pts: ESCALIER }] })}
${cm1Regle(`Pour reproduire une figure :${cm1Liste(['je repère un point de départ ;', 'je compte les carreaux de chaque côté ;', 'je trace à la règle, côté après côté ;', 'je compare avec le modèle.'])}`)}
${cm1Astuce('Pour un trait en biais, on compte les carreaux vers la droite (ou la gauche) ET vers le haut (ou le bas), et on relie les deux nœuds.')}
`,
  methode: `
${cm1Demo('cp-g3-m-aligne', 'Vérifier si trois points sont alignés', 'Les points A, B et C sont-ils alignés ?')}
${cm1Demo('cp-g3-m-reproduire', 'Reproduire un triangle', 'Reproduis le triangle sur le quadrillage.')}
`,
  demos: [
    ['cp-g3-m-aligne', [
      { expr: 'Je pose la règle sur A et B.', note: 'Le bord de la règle touche les deux points.', fig: cpQuadFig(6, 4, [[[[0, 3.5], [6, 0.5]], '#C9A24A', false]], { points: [[1, 3, 'A'], [3, 2, 'B'], [5, 1, 'C']] }) },
      { expr: 'Je regarde le point C.', note: 'Le bord de la règle passe aussi par C.' },
      { expr: 'A, B et C sont alignés.', note: 'Je peux tracer un trait droit qui passe par les trois points.' },
    ]],
    ['cp-g3-m-reproduire', [
      { expr: 'Je repère le départ : le coin en bas à gauche.', note: 'Je mets un point au même endroit sur ma feuille.', fig: cpQuadFig(6, 4, [[[[1, 3], [5, 3], [1, 1]], '#E9C46A']]) },
      { expr: 'Côté du bas : 4 carreaux à droite.', note: 'Je trace sur la ligne du quadrillage.', fig: cpQuadFig(6, 4, [[[[1, 3], [5, 3]], CE2C.violet, false]]) },
      { expr: 'Côté de gauche : 2 carreaux vers le haut.', note: 'Du départ, je monte de 2.', fig: cpQuadFig(6, 4, [[[[5, 3], [1, 3], [1, 1]], CE2C.violet, false]]) },
      { expr: 'Je relie les deux bouts à la règle.', note: 'Le triangle est fermé.', fig: cpQuadFig(6, 4, [[[[1, 3], [5, 3], [1, 1]], '#E9C46A']]) },
    ]],
  ],
  exos: cm1Exos('cp-g3', [
    [`Les points A, B et C sont-ils alignés ?${lig(cpQuadFig(6, 4, [], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C']] }))}`,
      cm1Redac('A, B et C', '', 'Oui : la règle posée sur A et B passe aussi par C. Les points sont alignés.', cpQuadFig(6, 4, [[[[0, 0], [6, 3]], CE2C.vert, false]], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C']], px: 140 }))],
    [`Les points D, E et F sont-ils alignés ?${lig(cpQuadFig(6, 4, [], { points: [[1, 3, 'D'], [3, 1, 'E'], [5, 2, 'F']] }))}`,
      cm1Redac('D, E et F', '', 'Non : la règle posée sur D et E ne passe pas par F.')],
    [`Combien de carreaux y a-t-il entre A et B ?${lig(cpQuadFig(7, 2, [[[[1, 1], [6, 1]], CE2C.violet, false]], { points: [[1, 1, 'A'], [6, 1, 'B']] }))}`,
      cm1Redac('De A à B', '', 'Il y a 5 carreaux entre A et B.')],
    [`Reproduis ce carré sur un quadrillage.${lig(cpQuadFig(5, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9']]))}`,
      cm1Redac('Le carré', '', 'Chaque côté mesure 3 carreaux : 3 à droite, 3 en bas, 3 à gauche, 3 en haut.', cpQuadFig(5, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9']], { px: 110 }))],
    [`Reproduis l'escalier.${lig(cpQuadFig(5, 6, [[ESCALIER, CPC.bord, false]]))}`,
      cm1Redac('L\'escalier', '', 'On part du coin en bas à gauche et on compte : 1 en haut, 1 à droite, 1 en haut, 1 à droite… puis on ferme la figure.', cpQuadFig(5, 6, [[ESCALIER, CE2C.violet, false]], { px: 110 }))],
    [`Termine le dessin : c'est un rectangle de 5 carreaux sur 2.${lig(cpQuadFig(7, 4, [[[[1, 1], [6, 1], [6, 3]], CPC.bord, false]]))}`,
      cm1Redac('Le rectangle', '', 'Il manque le côté du bas (5 carreaux) et le côté de gauche (2 carreaux).', cpQuadFig(7, 4, [[[[1, 1], [6, 1], [6, 3], [1, 3]], '#2E9C6A']], { px: 150 }))],
    [`Trace un trait droit qui passe par les points A et B, puis dis si C est sur ce trait.${lig(cpQuadFig(8, 4, [], { points: [[1, 3, 'A'], [3, 2, 'B'], [7, 0, 'C']] }))}`,
      cm1Redac('Le trait AB', '', 'Le trait droit qui passe par A et B passe aussi par C : les trois points sont alignés.', cpQuadFig(8, 4, [[[[1, 3], [7, 0]], CE2C.vert, false]], { points: [[1, 3, 'A'], [3, 2, 'B'], [7, 0, 'C']], px: 170 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : planter des arbres bien alignés', [
    'Comment les jardiniers d\'autrefois plantaient-ils des arbres bien alignés, sans règle géante ? Ils plantaient trois piquets et regardaient en fermant un œil : si le premier piquet cachait les deux autres, ils étaient <b>alignés</b>.',
    'C\'est ce qu\'on appelle « <b>viser</b> ». Les jardins du château de Versailles, dessinés il y a plus de 350 ans par André Le Nôtre, ont des allées parfaitement droites tracées ainsi, avec des cordeaux tendus.',
  ]),
  quiz: [
    { q: 'Pour vérifier si des points sont alignés, j\'utilise…', opts: ['une règle', 'une balance', 'une horloge'], correct: 0 },
    { q: 'Un nœud du quadrillage, c\'est…', opts: ['un carreau', 'le croisement de deux lignes', 'un trait'], correct: 1 },
    { q: 'Pour reproduire une figure, on compte…', opts: ['les carreaux', 'les couleurs', 'les règles'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Pour tracer un trait droit, on utilise…', r: ['une règle', 'la main seule', 'un compas', 'une gomme'], ok: 0 },
    { l: 2, q: `A, B, C sont-ils alignés ?${lig(cpQuadFig(4, 3, [], { points: [[0, 0, 'A'], [2, 1, 'B'], [4, 2, 'C']], px: 110 }))}`, r: ['Oui', 'Non', 'On ne peut pas savoir', 'Seulement A et B'], ok: 0 },
    { l: 3, q: `Combien de carreaux de A à B ?${lig(cpQuadFig(5, 2, [[[[0, 1], [4, 1]], CE2C.violet, false]], { points: [[0, 1, 'A'], [4, 1, 'B']], px: 130 }))}`, r: ['3', '4', '5', '2'], ok: 1 },
    { l: 4, q: 'Un carré de 3 carreaux de côté : combien de carreaux pour chaque côté ?', r: ['3', '4', '9', '12'], ok: 0 },
  ],
});
})();

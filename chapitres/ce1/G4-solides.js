/* ============================================================
   CHAPITRE : Les solides : faces, arêtes, sommets (CE1, G4, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, espace et géométrie : reconnaître
   et nommer cube, pavé, boule, cylindre, cône, pyramide ; décrire le cube et le pavé avec le
   vocabulaire face, arête, sommet ; les faces du cube sont des carrés, celles du pavé des rectangles ;
   le patron du cube (six carrés qui se replient) ; construire avec des cubes.
   Pensé pour être projeté : les arêtes comptées une à une, le patron qui se plie.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const solide = (type, o) => cpSvg(320, 210, ce1SolideSvg(type, o), (o && o.px) || 200);

cm1Chapitre({
  niveau: 'ce1', titre: 'Les solides : faces, arêtes, sommets', slug: 'solides',
  cours: `
${cm1Lecon(1, 'Faces, arêtes, sommets')}
${cm1Def(`${lig(solide('cube'))}${cm1Liste(['les <b>faces</b> sont les surfaces planes du solide ;', 'les <b>arêtes</b> sont les traits où deux faces se rencontrent ;', 'les <b>sommets</b> sont les « coins », où plusieurs arêtes se rencontrent.'])}`, 'Le vocabulaire')}
${ce1AnimSolide('ce1-g4-solide')}

${cm1Lecon(2, 'Le cube et le pavé')}
${cm1Regle(`${lig(solide('cube', { px: 170 }), solide('pave', { px: 200 }))}${cm1Liste(['Le <b>cube</b> : 6 faces carrées toutes pareilles, 12 arêtes de même longueur, 8 sommets.', 'Le <b>pavé</b> : 6 faces rectangulaires (les faces opposées sont pareilles), 12 arêtes, 8 sommets.'])}`, 'À savoir')}
${cm1Astuce('Une boîte à chaussures, une brique de lait, une boîte de mouchoirs sont des pavés. Un dé à jouer est un cube.')}

${cm1Lecon(3, 'Le patron du cube')}
${cm1Pliage('ce1-g4-cube', { modeles: CM_CUBE_PATRONS.slice(0, 4).map(m => ({ nom: m.nom, faces: cmCube(m.cases) })), legende: 'Six carrés bien placés se replient pour former un cube : c\'est un <b>patron</b>. Cliquez sur « Plier » ; faites glisser pour tourner autour.' })}
${cm1Rem('Au tableau : déplier une boîte en carton, puis faire construire un cube avec six carrés et du ruban adhésif.')}

${cm1Lecon(4, 'Les autres solides')}
${cm1Regle(`${cm1Liste(['La <b>boule</b> n\'a ni face plane, ni arête, ni sommet.', 'Le <b>cylindre</b> a 2 faces planes (des disques) et une surface arrondie.', 'Le <b>cône</b> a 1 face plane (un disque) et une pointe, son sommet.', 'La <b>pyramide</b> a des faces triangulaires qui se rejoignent à son sommet.'])}`, 'Les décrire')}
`,
  methode: `
${cm1Demo('ce1-g4-m-compter', 'Compter les arêtes d\'un pavé', 'Combien d\'arêtes a ce pavé ?')}
${cm1Demo('ce1-g4-m-decrire', 'Décrire un solide pour le faire deviner', 'Décris le cube sans dire son nom.')}
`,
  demos: [
    ['ce1-g4-m-compter', [
      { expr: 'Je compte les arêtes de la face avant : 4.', note: 'Je les marque au fur et à mesure.', fig: solide('pave', { aretes: 4, px: 180 }) },
      { expr: 'Celles de la face arrière : 4 de plus, 8.', note: 'Les cachées sont en pointillés.', fig: solide('pave', { aretes: 8, px: 180 }) },
      { expr: 'Celles qui relient les deux faces : 4 de plus, 12.', note: 'Le pavé a <b>12 arêtes</b>.', fig: solide('pave', { aretes: 12, px: 180 }) },
    ]],
    ['ce1-g4-m-decrire', [
      { expr: 'J\'ai 6 faces, toutes des carrés pareils.', note: 'Je parle des faces.' },
      { expr: 'J\'ai 12 arêtes et 8 sommets.', note: 'Je parle des arêtes et des sommets.' },
      { expr: 'Je suis… le cube !', note: 'Un pavé aurait des faces rectangulaires.' },
    ]],
  ],
  exos: cm1Exos('ce1-g4', [
    ['Combien de faces a un cube ? De quelle forme ?',
      cm1Redac('Les faces du cube', '', 'Un cube a 6 faces : ce sont des carrés, tous pareils.')],
    ['Combien d\'arêtes et de sommets a un pavé ?',
      cm1Redac('Le pavé', '', 'Un pavé a 12 arêtes et 8 sommets.', solide('pave', { px: 150 }))],
    ['Quel solide a 2 faces planes en forme de disque et peut rouler ?',
      cm1Redac('Devinette', '', 'C\'est le cylindre.')],
    ['À quel solide ressemble une boîte à chaussures ? Un dé ? Une balle ?',
      cm1Redac('Les objets', '', 'La boîte à chaussures : un pavé. Le dé : un cube. La balle : une boule.')],
    ['Combien de carrés faut-il pour fabriquer un cube ?',
      cm1Redac('Fabriquer un cube', '', 'Il faut 6 carrés pareils, un pour chaque face.')],
    ['Paul a construit un pavé avec 2 rangées de 3 cubes. Combien de cubes a-t-il utilisés ?',
      cm1Redac('Les cubes', '2 × 3 = 6', 'Paul a utilisé 6 cubes.')],
    ['Une pyramide a une base carrée. Combien a-t-elle de faces ?',
      cm1Redac('La pyramide', '1 + 4 = 5', 'Elle a 5 faces : la base carrée et 4 triangles.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les solides de Platon', [
    'Il y a environ 2 400 ans, le philosophe grec <b>Platon</b> s\'intéressait à cinq solides très réguliers, dont toutes les faces sont pareilles : le cube en fait partie !',
    'Pour Platon, le cube représentait la Terre, parce qu\'il est solide et stable. On appelle encore ces cinq solides les « solides de Platon ». Les dés de certains jeux de rôle ont ces formes.',
  ]),
  quiz: [
    { q: 'Un cube a combien de sommets ?', opts: ['8', '6', '12'], correct: 0 },
    { q: 'Les faces d\'un pavé sont des…', opts: ['rectangles', 'disques', 'triangles'], correct: 0 },
    { q: 'Le trait où deux faces se rencontrent est…', opts: ['une arête', 'un sommet', 'une face'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Un « coin » d\'un cube, c\'est…', r: ['un sommet', 'une face', 'une arête', 'un côté'], ok: 0 },
    { l: 2, q: 'Le cube a … arêtes.', r: ['12', '8', '6', '4'], ok: 0 },
    { l: 2, q: 'Le pavé a … faces.', r: ['6', '4', '8', '12'], ok: 0 },
    { l: 3, q: 'Un patron de cube a … carrés.', r: ['6', '4', '8', '12'], ok: 0 },
    { l: 4, q: 'La boule a … sommet(s).', r: ['0', '1', '2', '8'], ok: 0 },
  ],
});
})();

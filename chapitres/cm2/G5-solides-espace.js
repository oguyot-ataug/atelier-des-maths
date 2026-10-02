/* ============================================================
   CHAPITRE : Solides et repérage dans l'espace (CM2, G5, période 5)
   Programme du cycle 3 (CM2) : nommer cube, boule, pavé, cône, pyramide, cylindre, prisme droit ;
   les décrire (nature des faces, arêtes, sommets) ; représentations en perspective (arêtes
   cachées en pointillés) ; reconnaître et construire un patron de cube, reconnaître un patron de
   pavé ; vocabulaire des déplacements et suites d'instructions ; problèmes d'assemblages de
   cubes.
   ============================================================ */
(() => {
// Assemblage de cubes en perspective isométrique : hauteurs[ligne][colonne] (ligne 0 = au fond).
function cubes(h, taille){
  const a = 22, cos = a * .866, sin = a * .5; let faces = [];
  const P = (x, y, z) => [150 + (x - y) * cos, 150 + (x + y) * sin - z * a];
  for(let y = 0; y < h.length; y++) for(let x = 0; x < h[y].length; x++) for(let z = 0; z < h[y][x]; z++) {
    const d = x + y + z;
    faces.push([d, [P(x, y, z + 1), P(x + 1, y, z + 1), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], '#EAF6FB']);
    faces.push([d, [P(x + 1, y, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x + 1, y, z + 1)], '#2EA8C9']);
    faces.push([d, [P(x, y + 1, z), P(x + 1, y + 1, z), P(x + 1, y + 1, z + 1), P(x, y + 1, z + 1)], '#8FD0E3']);
  }
  faces.sort((p, q) => p[0] - q[0]);
  const all = faces.flatMap(f => f[1]), xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const x0 = Math.min(...xs) - 4, y0 = Math.min(...ys) - 4, W = Math.max(...xs) - x0 + 4, H = Math.max(...ys) - y0 + 4;
  return `<svg viewBox="${x0} ${y0} ${W} ${H}" style="width:${taille || 170}px;display:inline-block;vertical-align:middle;">${faces.map(([, pts, c]) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${c}" stroke="#1F3A5C" stroke-width="1"/>`).join('')}</svg>`;
}
function patronPave(){
  const k = 16, R = (x, y, w, h, c) => `<rect x="${x * k + 2}" y="${y * k + 2}" width="${w * k}" height="${h * k}" fill="${c}" fill-opacity=".3" stroke="#1F3A5C" stroke-width="1.5"/>`;
  // pavé 4 × 2 × 1 : bande de 4 faces (2,1,2,1) + deux faces 4×... (dimensions L=4, l=2, h=1)
  return `<svg viewBox="0 0 ${12 * k + 4} ${8 * k + 4}" style="width:${12 * k + 4}px;max-width:100%;display:block;margin:0 auto;">
  ${R(2, 0, 4, 2, '#2E9C6A')}${R(2, 2, 4, 1, '#2EA8C9')}${R(2, 3, 4, 2, '#2E9C6A')}${R(2, 5, 4, 1, '#2EA8C9')}${R(0, 2, 2, 1, '#E35D3A')}${R(6, 2, 2, 1, '#E35D3A')}</svg>`;
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Solides et repérage dans l\'espace', slug: 'solides-espace',
  cours: `
${cm1Lecon(1, 'Décrire les solides')}
${cm1Tableau(['Solide', 'Faces', 'Arêtes', 'Sommets'], [
  ['<b>Cube</b>', '6 carrés identiques', '12', '8'],
  ['<b>Pavé</b> (pavé droit)', '6 rectangles, identiques deux à deux', '12', '8'],
  ['<b>Prisme droit</b> à base triangulaire', '2 triangles (les bases) et 3 rectangles', '9', '6'],
  ['<b>Pyramide</b> à base carrée', '1 carré (la base) et 4 triangles', '8', '5'],
  ['<b>Cylindre, cône, boule</b>', 'surfaces courbes : ce ne sont pas des polyèdres', '—', '—'],
])}
${cm1Regle('Un <b>polyèdre</b> est un solide dont toutes les faces sont des polygones (cube, pavé, prisme, pyramide). Pour justifier la nature d\'un polyèdre, on s\'appuie sur ses faces : « c\'est un pavé, car ses 6 faces sont des rectangles ».')}

${cm1Lecon(2, 'Représentation en perspective')}
${cm1Rem('Sur un dessin en perspective, on ne voit pas toutes les faces : certaines arêtes sont <b>cachées</b> et tracées en <b>pointillés</b>. Des faces carrées peuvent être dessinées comme des parallélogrammes : le dessin « déforme » pour donner l\'impression de profondeur.')}

${cm1Lecon(3, 'Patrons du cube et du pavé')}
${cm1Def('Un <b>patron</b> est une figure plane, d\'un seul morceau, qu\'on plie pour obtenir le solide sans que les faces se chevauchent.')}
<div class="figure-wrap">${patronPave()}<p class="hint" style="margin:4px 0 0;">Patron d'un pavé de 4 cm × 2 cm × 1 cm : les faces de même couleur sont identiques et se retrouvent face à face.</p></div>
${cm1Sous('A', 'Plier un patron de cube')}
${cm1Pliage('cm2-cube', { modeles: CM_CUBE_PATRONS.map(m => ({ nom: m.nom, faces: cmCube(m.cases) })), legende: 'Les <b>11 patrons du cube</b> : choisis-en un, puis clique sur « Plier ». Fais glisser le dessin pour tourner autour du cube.' })}
${cm1Sous('B', 'Plier un patron de pavé')}
${cm1Pliage('cm2-pave', { modeles: [
  { nom: 'Patron du cours', faces: [[2, 0, 4, 2], [2, 2, 4, 1], [2, 3, 4, 2], [2, 5, 4, 1], [0, 2, 2, 1], [6, 2, 2, 1]], couleurs: ['#2E9C6A', '#2EA8C9', '#2E9C6A', '#2EA8C9', '#E35D3A', '#E35D3A'] },
  { nom: 'Un autre patron', faces: [[1, 1, 4, 2], [1, 3, 4, 1], [1, 4, 4, 2], [1, 0, 4, 1], [0, 1, 1, 2], [5, 1, 1, 2]], couleurs: ['#2E9C6A', '#2EA8C9', '#2E9C6A', '#2EA8C9', '#E35D3A', '#E35D3A'] },
], legende: 'Pavé de 4 cm × 2 cm × 1 cm : les faces de même couleur sont identiques et se retrouvent face à face une fois le pavé fermé.' })}
${cm1Astuce('Pour vérifier un patron de pavé : il y a 6 faces, elles vont par <b>paires identiques</b>, et deux côtés qui se collent ont la même longueur.')}
${cm1Rem(`<b>Attention :</b> 6 faces en un seul morceau ne forment pas toujours un patron. Avec cette figure de 6 carrés, deux faces se superposent en pliant : ce n'est <b>pas</b> un patron du cube.
${cm1Pliage('cm2-cube-faux', { modeles: [{ nom: 'Pas un patron', faces: cmCube([[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1]]) }], legende: 'Plie-la : les deux faces qui se superposent deviennent rouges.' })}`)}

${cm1Lecon(4, 'Assemblages de cubes')}
<div class="figure-wrap" style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center;align-items:center;">${cubes([[2, 1], [1, 1]])}${cubes([[3, 2, 1], [2, 1, 0], [1, 0, 0]])}</div>
${cm1Regle('Pour compter les cubes, on compte <b>étage par étage</b> ou <b>colonne par colonne</b>, sans oublier les cubes cachés qui soutiennent ceux du dessus.')}
${cm1Exemple('Premier assemblage :', ['colonnes de 2, 1, 1 et 1 cube : 2 + 1 + 1 + 1 = <b>5 cubes</b>.'])}

${cm1Lecon(5, 'Se déplacer : décrire un chemin')}
${cm1Regle('Pour décrire un déplacement, on utilise un vocabulaire précis : <b>avancer de…</b>, <b>tourner à gauche / à droite</b>, <b>tout droit</b>, <b>devant, derrière, à côté de, entre</b>, <b>la 2<sup>e</sup> rue à gauche</b>… Une suite d\'instructions bien ordonnées permet à quelqu\'un de suivre le chemin sans se perdre.')}
`,
  methode: `
${cm1Demo('c2-so-compter', 'Compter les cubes d\'un assemblage', 'Combien de cubes dans l\'escalier en coin (deuxième assemblage du cours) ?')}
${cm1Demo('c2-so-patron', 'Vérifier un patron de pavé', 'Le patron du cours forme-t-il bien un pavé de 4 cm × 2 cm × 1 cm ?')}
`,
  demos: [
    ['c2-so-compter', [
      { expr: cubes([[3, 2, 1], [2, 1, 0], [1, 0, 0]], 150), note: 'On regarde la figure colonne par colonne, depuis le fond.' },
      { expr: 'Rangée du fond : 3 + 2 + 1 = 6', note: 'Les colonnes ont 3, 2 et 1 cubes.' },
      { expr: 'Rangée du milieu : 2 + 1 = 3 · Rangée de devant : 1', note: 'Les cubes du bas sont cachés mais bien là !' },
      { expr: '6 + 3 + 1 = 10 cubes', note: 'Résultat.' },
    ]],
    ['c2-so-patron', [
      { expr: '6 faces : 2 vertes 4 × 2, 2 bleues 4 × 1, 2 rouges 2 × 1', note: 'Un pavé a 6 faces rectangulaires identiques deux à deux.' },
      { expr: 'La bande verte-bleue-verte-bleue fait le tour du pavé.', note: 'En la pliant, les 4 faces forment le « tour ».' },
      { expr: 'Les deux rectangles rouges ferment les côtés.', note: 'Leurs côtés (2 cm et 1 cm) correspondent aux côtés des faces voisines.' },
      { expr: 'C\'est bien un patron du pavé. ✔', note: 'Vérification possible en le découpant.' },
    ]],
  ],
  exos: cm1Exos('c2so', [
    ['Combien de faces, d\'arêtes, de sommets a un prisme droit à base triangulaire ? Quelle est la nature de ses faces ?',
      cm1Redac('Nombre de faces', '2 + 3 = 5', 'Le prisme a 5 faces : 2 triangles (les bases) et 3 rectangles.')
      + cm1Redac('Arêtes et sommets', { suite: ['3 + 3 + 3 = 9 arêtes', '3 + 3 = 6 sommets'] }, 'Il a 9 arêtes et 6 sommets.')],
    ['Je suis un polyèdre à 5 sommets ; une de mes faces est un carré et les autres sont des triangles. Qui suis-je ?',
      cm1Redac('Devinette', '', 'C\'est une pyramide à base carrée.')],
    ['Pourquoi un cylindre n\'est-il pas un polyèdre ?',
      cm1Redac('Le cylindre', '', 'Un cylindre a une surface courbe : toutes ses faces ne sont pas des polygones, donc ce n\'est pas un polyèdre.')],
    [`Combien de cubes dans cet assemblage ?<div style="margin:6px 0;">${cubes([[2, 2], [1, 0]], 120)}</div>`,
      cm1Redac('Nombre de cubes', '2 + 2 + 1 = 5', 'L\'assemblage compte 5 cubes.')],
    ['Combien de petits cubes faut-il pour construire un grand cube de 3 cubes de côté ?',
      cm1Redac('Nombre de petits cubes', ['3 × 3 × 3', '9 × 3', '27'], 'Il faut 27 petits cubes : 3 étages de 9 cubes.')],
    ['Construis un patron de cube de 3 cm d\'arête, puis un patron de pavé de 4 cm × 3 cm × 2 cm.',
      cm1Redac('Patron du cube', '', 'Il faut 6 carrés de 3 cm de côté, par exemple disposés en croix.')
      + cm1Redac('Patron du pavé', { suite: ['2 rectangles de 4 cm sur 3 cm', '2 rectangles de 4 cm sur 2 cm', '2 rectangles de 3 cm sur 2 cm'] }, 'On place ces 6 rectangles de sorte que deux côtés qui se collent aient la même longueur.')],
    ['Écris les instructions pour aller de la porte de la classe jusqu\'à ta table.',
      cm1Redac('Mon chemin', { suite: ['Avance de 3 pas.', 'Tourne à gauche.', 'Avance jusqu\'à la 2<sup>e</sup> rangée.', 'Tourne à droite : ma table est la 3<sup>e</sup>.'] }, 'Ces instructions sont dans l\'ordre : un camarade peut les suivre sans se perdre.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le Rubik\'s Cube', [
    'En 1974, le Hongrois <b>Ernő Rubik</b>, professeur d\'architecture, invente un cube formé de 26 petits cubes qui tournent : il voulait aider ses étudiants à comprendre les objets en trois dimensions.',
    'Le <b>Rubik\'s Cube</b> est devenu le jouet le plus vendu au monde. Il a plus de 43 milliards de milliards de positions possibles… et certains le résolvent en moins de 4 secondes !',
  ]),
  quiz: [
    { q: 'Les faces d\'un pavé sont des…', opts: ['carrés uniquement', 'rectangles', 'triangles'], correct: 1 },
    { q: 'Combien de sommets a une pyramide à base carrée ?', opts: ['4', '5', '8'], correct: 1 },
    { q: 'Sur un dessin en perspective, les arêtes cachées sont…', opts: ['en couleur', 'en pointillés', 'absentes'], correct: 1 },
  ],
});
})();

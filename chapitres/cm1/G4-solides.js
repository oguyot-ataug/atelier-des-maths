/* ============================================================
   CHAPITRE : Solides (CM1, G4, période 4)
   Programme du cycle 3 (CM1) : reconnaître, nommer, décrire des solides (cube, pavé droit,
   prisme droit, pyramide, cylindre, cône, boule) ; vocabulaire : face, arête, sommet ;
   reconnaître et compléter un patron de cube et de pavé droit. Les arêtes cachées sont dessinées
   en pointillés (perspective cavalière).
   ============================================================ */
(() => {
const T = 'stroke="#1F3A5C" stroke-width="2" fill="none"', P = 'stroke="#1F3A5C" stroke-width="1.6" fill="none" stroke-dasharray="5 4"';
const fig = (svg, nom) => `<div style="text-align:center;"><svg viewBox="0 0 120 110" style="width:112px;">${svg}</svg><div style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:#1F3A5C;">${nom}</div></div>`;
// perspective : décalage (dx, dy) pour la profondeur
function boite(x, y, w, h, dx, dy, c){
  return `<polygon points="${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}" fill="${c}" fill-opacity=".25"/><polygon points="${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" fill="${c}" fill-opacity=".4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".15"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" ${T}/><polyline points="${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}" ${T}/><polyline points="${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" ${T}/>
  <polyline points="${x + dx},${y - dy} ${x + dx},${y + h - dy} ${x + w + dx},${y + h - dy}" ${P}/><line x1="${x + dx}" y1="${y + h - dy}" x2="${x}" y2="${y + h}" ${P}/>`;
}
const CUBE = boite(20, 40, 55, 55, 28, 22, '#2EA8C9');
const PAVE = boite(10, 50, 78, 42, 24, 20, '#2E9C6A');
const PRISME = `<polygon points="15,95 75,95 45,45" fill="#7A4FC0" fill-opacity=".2"/><polygon points="15,95 45,45 75,25 45,75" fill="none"/><polyline points="15,95 75,95 45,45 15,95" ${T}/><polyline points="45,45 75,25 105,75 75,95" ${T}/><polyline points="15,95 45,75 105,75" ${P}/><line x1="45" y1="75" x2="75" y2="25" ${P}/>`;
const PYRAMIDE = `<polygon points="15,90 75,90 60,15" fill="#E35D3A" fill-opacity=".2"/><polygon points="75,90 100,72 60,15" fill="#E35D3A" fill-opacity=".35"/><polyline points="15,90 75,90 100,72 60,15 15,90" ${T}/><line x1="75" y1="90" x2="60" y2="15" stroke="#1F3A5C" stroke-width="2"/><polyline points="15,90 40,72 100,72" ${P}/><line x1="40" y1="72" x2="60" y2="15" ${P}/>`;
const CYL = `<rect x="25" y="25" width="70" height="65" fill="#B8962E" fill-opacity=".2"/><ellipse cx="60" cy="25" rx="35" ry="11" fill="#B8962E" fill-opacity=".3" ${T}/><line x1="25" y1="25" x2="25" y2="90" stroke="#1F3A5C" stroke-width="2"/><line x1="95" y1="25" x2="95" y2="90" stroke="#1F3A5C" stroke-width="2"/><path d="M25 90 A35 11 0 0 0 95 90" ${T}/><path d="M25 90 A35 11 0 0 1 95 90" ${P}/>`;
const CONE = `<polygon points="25,88 95,88 60,12" fill="#2EA8C9" fill-opacity=".2"/><line x1="25" y1="88" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><line x1="95" y1="88" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><path d="M25 88 A35 11 0 0 0 95 88" ${T}/><path d="M25 88 A35 11 0 0 1 95 88" ${P}/>`;
const BOULE = `<circle cx="60" cy="55" r="40" fill="#2E9C6A" fill-opacity=".2" ${T}/><path d="M20 55 A40 12 0 0 0 100 55" ${T}/><path d="M20 55 A40 12 0 0 1 100 55" ${P}/>`;
// Patrons (grille de carrés) : cases = [[col, lig]]
function patron(cases, c, taille){
  const k = 22, maxX = Math.max(...cases.map(p => p[0])) + 1, maxY = Math.max(...cases.map(p => p[1])) + 1;
  return `<svg viewBox="0 0 ${maxX * k + 4} ${maxY * k + 4}" style="width:${taille || maxX * k + 4}px;display:inline-block;vertical-align:middle;">${cases.map(([x, y]) => `<rect x="${2 + x * k}" y="${2 + y * k}" width="${k}" height="${k}" fill="${c || '#2EA8C9'}" fill-opacity=".3" stroke="#1F3A5C" stroke-width="1.6"/>`).join('')}</svg>`;
}
const CROIX = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
cm1Chapitre({
  titre: 'Solides', slug: 'solides',
  cours: `
${cm1Lecon(1, 'Reconnaître et nommer les solides')}
${cm1Def('Un <b>solide</b> est un objet de l\'espace qui a un volume : on peut le prendre dans la main, en faire le tour. Une figure plane (carré, cercle…) n\'est pas un solide.')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">${fig(CUBE, 'Cube')}${fig(PAVE, 'Pavé droit')}${fig(PRISME, 'Prisme droit')}${fig(PYRAMIDE, 'Pyramide')}${fig(CYL, 'Cylindre')}${fig(CONE, 'Cône')}${fig(BOULE, 'Boule')}</div>
${cm1Rem('Sur les dessins, les <b>pointillés</b> représentent les arêtes cachées, qu\'on ne verrait pas si le solide était en bois.')}
${cm1Exemple('Dans la vie courante :', ['un dé à jouer est un <b>cube</b> ; une boîte à chaussures est un <b>pavé droit</b> ;', 'une boîte de conserve est un <b>cylindre</b> ; un cornet de glace a la forme d\'un <b>cône</b> ;', 'un ballon est une <b>boule</b> ; les pyramides d\'Égypte sont des <b>pyramides</b>.'])}

${cm1Lecon(2, 'Faces, arêtes, sommets')}
${cm1Def(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Une <b>face</b> est une surface plane du solide (pour le cube : un carré).</li><li>Une <b>arête</b> est un segment où deux faces se rencontrent.</li><li>Un <b>sommet</b> est un point où plusieurs arêtes se rencontrent.</li></ul>`, 'Vocabulaire')}
${cm1Tableau(['Solide', 'Faces', 'Arêtes', 'Sommets', 'Forme des faces'], [
  ['Cube', '6', '12', '8', '6 carrés identiques'],
  ['Pavé droit', '6', '12', '8', 'des rectangles (les faces opposées sont identiques)'],
  ['Prisme droit à base triangulaire', '5', '9', '6', '2 triangles et 3 rectangles'],
  ['Pyramide à base carrée', '5', '8', '5', '1 carré et 4 triangles'],
])}
${cm1Rem('Le cylindre, le cône et la boule ont des surfaces <b>courbes</b> : ils peuvent rouler. On ne parle pas de leurs « arêtes » comme pour les autres solides.')}

${cm1Lecon(3, 'Le patron d\'un solide')}
${cm1Def('Un <b>patron</b> est une figure plane, en un seul morceau, qu\'on peut découper et plier pour fabriquer le solide, sans que des faces se chevauchent.')}
<div class="figure-wrap" style="display:flex;gap:30px;flex-wrap:wrap;justify-content:center;align-items:center;">
<div style="text-align:center;">${patron(CROIX, '#2EA8C9', 110)}<div class="hint" style="margin:0;">Patron d'un cube : 6 carrés</div></div>
<div style="text-align:center;">${patron([[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]], '#2E9C6A', 70)}<div class="hint" style="margin:0;">Un autre patron du cube</div></div></div>
${cm1Sous('A', 'Plier un patron de cube')}
${cm1Pliage('cm1-cube', { modeles: CM_CUBE_PATRONS.map(m => ({ nom: m.nom, faces: cmCube(m.cases) })), legende: 'Choisis un des <b>11 patrons du cube</b>, puis clique sur « Plier ». Fais glisser le dessin pour tourner autour du cube.' })}
${cm1Astuce('Il existe <b>11 patrons différents</b> du cube : ils sont tous ci-dessus. Pour vérifier, imagine le pliage : chaque carré doit trouver sa place sans en recouvrir un autre.')}
${cm1Rem(`<b>Attention :</b> 6 carrés en un seul morceau ne forment pas toujours un patron. Avec la figure ci-dessous, deux faces se retrouvent au même endroit et il manque une face au cube. Plie-la pour le voir.
<div style="text-align:center;margin:8px 0 4px;">${patron([[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1]], '#E35D3A', 110)}</div>
${cm1Pliage('cm1-cube-faux', { modeles: [{ nom: 'Pas un patron', faces: cmCube([[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1]]) }], legende: 'Les deux faces qui se superposent deviennent rouges.' })}`)}
`,
  methode: `
${cm1Demo('so-compter', 'Compter les faces, arêtes et sommets d\'un pavé droit', 'Prends une boîte (un pavé droit) et compte ses faces, ses arêtes et ses sommets.')}
${cm1Demo('so-patron', 'Vérifier qu\'une figure est un patron de cube', 'La figure en croix (4 carrés en ligne, un au-dessus, un au-dessous) est-elle un patron de cube ?')}
`,
  demos: [
    ['so-compter', [
      { expr: 'Faces : dessus, dessous, devant, derrière, gauche, droite = 6', note: 'On compte les faces deux par deux, face à face.' },
      { expr: 'Arêtes : 4 en haut + 4 en bas + 4 verticales = 12', note: 'On compte les arêtes par groupes pour n\'en oublier aucune.' },
      { expr: 'Sommets : 4 en haut + 4 en bas = 8', note: 'Chaque sommet est un « coin » de la boîte.' },
      { expr: '6 faces, 12 arêtes, 8 sommets', note: 'Le cube a les mêmes nombres : un cube est un pavé droit particulier, dont toutes les faces sont des carrés.' },
    ]],
    ['so-patron', [
      { expr: patron(CROIX, '#2EA8C9', 100), note: 'On compte les carrés : il y en a 6, comme les faces du cube.' },
      { expr: 'Les 4 carrés en ligne → le tour du cube', note: 'En pliant la bande de 4 carrés, on forme les 4 faces de côté (devant, droite, derrière, gauche).' },
      { expr: 'Le carré du haut → le dessus ; celui du bas → le dessous', note: 'Les deux carrés isolés viennent fermer le cube, sans se chevaucher.' },
      { expr: 'C\'est un patron du cube. ✔', note: 'Tu peux le vérifier en le découpant dans du papier quadrillé.' },
    ]],
  ],
  exos: cm1Exos('so', [
    ['Nomme le solide qui a la forme de : une brique · un rouleau d\'essuie-tout · une balle de tennis · un chapeau pointu d\'anniversaire.', 'pavé droit · cylindre · boule · cône.'],
    ['Combien de faces, d\'arêtes et de sommets a un cube ?', '6 faces, 12 arêtes, 8 sommets.'],
    ['Quelle est la forme des faces d\'une pyramide à base carrée ?', 'Une face carrée (la base) et 4 faces triangulaires.'],
    ['Je suis un solide. J\'ai 6 faces rectangulaires, 12 arêtes et 8 sommets. Qui suis-je ?', 'Un pavé droit.'],
    ['Je suis un solide. Je peux rouler, j\'ai une pointe et une face plane en forme de disque. Qui suis-je ?', 'Un cône.'],
    [`Cette figure est-elle un patron de cube ?<div style="margin:6px 0;">${patron([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], '#7A4FC0', 100)}</div>`, 'Oui : c\'est le patron « en escalier ». En pliant, chacun des 6 carrés prend une face différente du cube.'],
    ['Trace sur papier quadrillé un patron d\'un cube de 3 carreaux d\'arête, découpe-le et construis le cube.', 'Par exemple la croix du cours, avec des carrés de 3 carreaux de côté. Penser à ajouter des languettes pour coller.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les pyramides et les solides de Platon', [
    'La grande <b>pyramide de Khéops</b>, en Égypte, a été construite il y a environ 4 500 ans. C\'est une pyramide à base carrée de 230 m de côté. Elle a été le plus haut monument construit par l\'homme pendant près de 4 000 ans !',
    'Le philosophe grec <b>Platon</b> s\'intéressait aux solides dont toutes les faces sont identiques, comme le cube. Il n\'en existe que cinq : on les appelle les <b>solides de Platon</b>. L\'un d\'eux, l\'icosaèdre, a 20 faces triangulaires : il sert parfois de dé dans les jeux !',
  ]),
  quiz: [
    { q: 'Combien d\'arêtes a un cube ?', opts: ['6', '8', '12'], correct: 2 },
    { q: 'Quel solide peut rouler ?', opts: ['le pavé droit', 'le cylindre', 'la pyramide'], correct: 1 },
    { q: 'Un patron de cube est formé de…', opts: ['4 carrés', '6 carrés', '8 carrés'], correct: 1 },
  ],
});
})();

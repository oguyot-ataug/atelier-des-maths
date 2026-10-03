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
    [`Nomme le solide qui a la forme de chacun de ces objets.${cm1Liste(['une brique', 'un rouleau d\'essuie-tout', 'une balle de tennis', 'un chapeau pointu d\'anniversaire'])}`,
      cm1Redac('Noms des solides', { suite: ['une brique : un pavé droit', 'un rouleau d\'essuie-tout : un cylindre', 'une balle de tennis : une boule', 'un chapeau pointu : un cône'] }, 'Seul le pavé droit n\'a que des faces planes : les trois autres peuvent rouler.')],
    ['Combien de faces, d\'arêtes et de sommets a un cube ?',
      cm1Redac('Faces, arêtes et sommets du cube', { suite: ['faces : 6', 'arêtes : 4 en haut, 4 en bas, 4 debout, donc 12', 'sommets : 4 en haut, 4 en bas, donc 8'] }, 'Un cube a 6 faces, 12 arêtes et 8 sommets.')],
    ['Quelle est la forme des faces d\'une pyramide à base carrée ?',
      cm1Redac('Faces de la pyramide', '1 base carrée et 4 faces latérales', 'Une pyramide à base carrée a une face carrée (la base) et 4 faces triangulaires.')],
    ['Je suis un solide. J\'ai 6 faces rectangulaires, 12 arêtes et 8 sommets. Qui suis-je ?',
      cm1Redac('Le solide mystère', '6 faces rectangulaires, 12 arêtes, 8 sommets', 'Je suis un pavé droit.')],
    ['Je suis un solide. Je peux rouler, j\'ai une pointe et une face plane en forme de disque. Qui suis-je ?',
      cm1Redac('Le solide mystère', 'Une pointe et une base en disque', 'Je suis un cône.')],
    [`Cette figure est-elle un patron de cube ?<div style="margin:6px 0;">${patron([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], '#7A4FC0', 100)}</div>`,
      cm1Redac('Vérification', { suite: ['Il y a 6 carrés, comme les 6 faces du cube.', 'En pliant, chaque carré prend une face différente.'] }, 'Oui : c\'est le patron « en escalier » du cube.')],
    ['Trace sur papier quadrillé un patron d\'un cube de 3 carreaux d\'arête, découpe-le et construis le cube.',
      cm1Redac('Construction', { suite: ['Je dessine 6 carrés de 3 carreaux de côté, par exemple en croix.', 'J\'ajoute des languettes pour coller.', 'Je découpe, je plie et je colle.'] }, 'J\'obtiens un cube de 3 carreaux d\'arête.')],
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
/* ---- Planches d'exercices imprimables (planches.js) ---- */
{
const B = n => plPointilles(n || 10), R = v => plRep(String(v));
const sol = svg => `<svg class="pl-libre" viewBox="0 0 120 110" style="width:92px;display:block;margin:0 auto;">${svg}</svg>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span>${t}</span></span>`;
const SOL = [[CUBE, 'cube'], [PAVE, 'pavé droit'], [PRISME, 'prisme droit'], [PYRAMIDE, 'pyramide'], [CYL, 'cylindre'], [CONE, 'cône']];
const pat = (cases, c, t) => patron(cases, c, t).replace('<svg ', '<svg class="pl-libre" ');
// Patron avec une lettre (ou un nombre) au milieu de certaines faces : txt = { 'x,y': '…' }.
function patronT(cases, txt, c){
  const k = 26, maxX = Math.max(...cases.map(p => p[0])) + 1, maxY = Math.max(...cases.map(p => p[1])) + 1;
  return `<svg class="pl-libre" viewBox="0 0 ${maxX * k + 4} ${maxY * k + 4}" style="width:${maxX * k + 4}px;display:inline-block;vertical-align:middle;">${cases.map(([x, y]) => `<rect x="${2 + x * k}" y="${2 + y * k}" width="${k}" height="${k}" fill="${c || '#2EA8C9'}" fill-opacity=".25" stroke="#1F3A5C" stroke-width="1.6"/>` + (txt[x + ',' + y] != null ? cmT(2 + x * k + k / 2, 2 + y * k + k / 2 + 5, txt[x + ',' + y], { fs: 14, c: /^\d$/.test(txt[x + ',' + y]) ? '#E35D3A' : '#1F3A5C' }) : '')).join('')}</svg>`;
}
const PATS = [
  [CROIX, true], [[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]], false], [[[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2]], true],
  [[[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [3, 1]], false], [[[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]], true], [[[1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [3, 1]], false],
];
const DE = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
PLANCHES['cm1|Solides'] = [
  { titre: 'Reconnaître et décrire les solides', duree: '30 min',
    attendus: ['Reconnaître et nommer les solides usuels', 'Compter les faces, les arêtes et les sommets d\'un polyèdre'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nom de chaque solide.',
        eleve: plGrille(SOL.map(([s], i) => col(sol(s), `<b>${'ABCDEF'[i]}</b> : ${B()}`)), 3),
        corr: plGrille(SOL.map(([s, n], i) => col(sol(s), `<b>${'ABCDEF'[i]}</b> : ${R(n)}`)), 3) },
      { etoiles: 2, consigne: 'Complète le tableau. Aide-toi d\'un vrai solide si tu peux.',
        eleve: `<table class="pl-tab"><tr><th>Solide</th><th>faces</th><th>arêtes</th><th>sommets</th></tr>${['cube', 'pavé droit', 'prisme droit (base triangle)', 'pyramide (base carrée)'].map(n => `<tr><th>${n}</th><td>${B(2)}</td><td>${B(2)}</td><td>${B(2)}</td></tr>`).join('')}</table>`,
        corr: `<table class="pl-tab"><tr><th>Solide</th><th>faces</th><th>arêtes</th><th>sommets</th></tr>${[['cube', 6, 12, 8], ['pavé droit', 6, 12, 8], ['prisme droit (base triangle)', 5, 9, 6], ['pyramide (base carrée)', 5, 8, 5]].map(([n, ...v]) => `<tr><th>${n}</th>${v.map(x => `<td>${R(x)}</td>`).join('')}</tr>`).join('')}</table>` },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        eleve: plListe(['Un cube a 6 faces carrées. <b>vrai · faux</b>', 'Un cylindre a des sommets. <b>vrai · faux</b>', 'Un pavé droit a 8 sommets. <b>vrai · faux</b>', 'Une boule a une face plane. <b>vrai · faux</b>']),
        corr: plListe([['Un cube a 6 faces carrées. ', 'vrai'], ['Un cylindre a des sommets. ', 'faux'], ['Un pavé droit a 8 sommets. ', 'vrai'], ['Une boule a une face plane. ', 'faux']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 2, col: 1, consigne: 'Qui suis-je ?',
        eleve: plListe(['J\'ai 6 faces, toutes carrées : ' + B(), 'Je roule ; j\'ai 2 faces planes en forme de disque : ' + B(), 'J\'ai une base carrée et 4 faces triangulaires : ' + B()]),
        corr: plListe(['J\'ai 6 faces, toutes carrées : ' + R('cube'), 'Je roule ; j\'ai 2 faces planes en forme de disque : ' + R('cylindre'), 'J\'ai une base carrée et 4 faces triangulaires : ' + R('pyramide')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien de faces, d\'arêtes et de sommets a une pyramide à base triangulaire ?',
        corr: cm1Redac('Pyramide à base triangulaire', { suite: ['faces : 1 base + 3 triangles = 4', 'arêtes : 3 autour de la base + 3 vers le sommet = 6', 'sommets : 3 + 1 = 4'] }, 'Elle a 4 faces, 6 arêtes et 4 sommets.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Léo dit : « Un cube est un pavé droit particulier. » A-t-il raison ? Explique.',
        corr: cm1Redac('Cube et pavé droit', { suite: ['Un pavé droit a 6 faces rectangulaires.', 'Un carré est un rectangle particulier.'] }, 'Léo a raison : le cube est un pavé droit dont les 6 faces sont des carrés.') },
    ] },
  { titre: 'Patrons du cube', duree: '30 min',
    attendus: ['Reconnaître un patron de cube', 'Imaginer le pliage d\'un patron : faces opposées'],
    exos: [
      { etoiles: 2, consigne: 'Lesquels sont des patrons de cube ? Entoure oui ou non. Tu peux découper pour vérifier.',
        eleve: plGrille(PATS.map(([c], i) => col(pat(c, '#2EA8C9', Math.min(130, (Math.max(...c.map(p => p[0])) + 1) * 22 + 4)), `<b>${'ABCDEF'[i]}</b> : <b>oui · non</b>`)), 3),
        corr: plGrille(PATS.map(([c, ok], i) => col(pat(c, '#2EA8C9', Math.min(130, (Math.max(...c.map(p => p[0])) + 1) * 22 + 4)), `<b>${'ABCDEF'[i]}</b> : ${plEntoure(ok ? 'oui' : 'non')}`)), 3) },
      { etoiles: 2, col: 1, consigne: `On plie ce patron pour faire un cube.<div style="text-align:center;">${patronT(CROIX, { '1,0': 'B', '0,1': 'C', '1,1': 'A', '2,1': 'E', '3,1': 'D', '1,2': 'F' })}</div>`,
        eleve: plListe(['La face opposée à A est ' + B(2) + '.', 'La face opposée à B est ' + B(2) + '.', 'La face opposée à C est ' + B(2) + '.']),
        corr: plListe(['La face opposée à A est ' + R('D') + '.', 'La face opposée à B est ' + R('F') + '.', 'La face opposée à C est ' + R('E') + '.']) },
      { etoiles: 3, col: 1, consigne: `Sur un dé, deux faces opposées font toujours 7. Complète ce patron de dé.<div style="text-align:center;">${patronT(DE, { '1,0': '2', '0,1': '3', '1,1': '1', '2,1': '', '3,1': '', '1,2': '' })}</div>`,
        eleve: plListe(['La face à droite du 1 : ' + B(2), 'La face tout à droite : ' + B(2), 'La face sous le 1 : ' + B(2)]),
        corr: plListe(['La face à droite du 1 : ' + R(4), 'La face tout à droite : ' + R(6), 'La face sous le 1 : ' + R(5)]) },
      { etoiles: 2, col: 1, consigne: 'Il manque une face à ce patron de cube. Dessine-la (il y a plusieurs places possibles).',
        eleve: `<div style="text-align:center;">${pat([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0]], '#9CCB6B')}</div>`,
        corr: `<div style="text-align:center;">${pat([[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]], '#9CCB6B')}</div><div class="pl-petit">Par exemple sous la 2<sup>e</sup> face : on obtient la croix. Toute face collée sous la ligne de quatre convient.</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier à carreaux, dessine un patron de cube différent de ceux de cette planche. Vérifie en le découpant.',
        corr: cm1Redac('Un autre patron', 'l\'escalier : 2 faces, puis 2, puis 2, décalées', 'Il existe 11 patrons du cube ; l\'escalier en est un.', `<span class="cm-fig-d">${pat([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], '#9CCB6B', 90)}</span>`) },
    ] },
];
}

})();

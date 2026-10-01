/* ============================================================
   CHAPITRE : Les solides (CE2, G5, période 5)
   Programme du cycle 2 (CE2) : nommer cube, boule, pavé, cône, pyramide, cylindre ; décrire un cube,
   un pavé ou une pyramide avec « face », « sommet », « arête » ; nombre et nature des faces ;
   faces d'une pyramide : des triangles ayant un sommet commun, sauf peut-être la base (polygone) ;
   représentations en perspective (arêtes cachées en pointillés) ; construire un cube à partir d'un
   patron et dire si un assemblage est un patron de cube (les non-patrons sont mis en remarque).
   ============================================================ */
(() => {
const T = 'stroke="#1F3A5C" stroke-width="2" fill="none"', P = 'stroke="#1F3A5C" stroke-width="1.6" fill="none" stroke-dasharray="5 4"';
const fig = (svg, nom) => `<div style="text-align:center;"><svg viewBox="0 0 120 110" style="width:112px;">${svg}</svg><div style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:#1F3A5C;">${nom}</div></div>`;
// Pavé en perspective : face avant (x, y, w, h), profondeur (dx, dy) ; arêtes cachées en pointillés.
function boite(x, y, w, h, dx, dy, c){
  return `<polygon points="${x},${y} ${x + w},${y} ${x + w + dx},${y - dy} ${x + dx},${y - dy}" fill="${c}" fill-opacity=".25"/><polygon points="${x + w},${y} ${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" fill="${c}" fill-opacity=".4"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" fill-opacity=".15"/>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" ${T}/><polyline points="${x},${y} ${x + dx},${y - dy} ${x + w + dx},${y - dy} ${x + w},${y}" ${T}/><polyline points="${x + w + dx},${y - dy} ${x + w + dx},${y + h - dy} ${x + w},${y + h}" ${T}/>
  <polyline points="${x + dx},${y - dy} ${x + dx},${y + h - dy} ${x + w + dx},${y + h - dy}" ${P}/><line x1="${x + dx}" y1="${y + h - dy}" x2="${x}" y2="${y + h}" ${P}/>`;
}
const CUBE = boite(20, 40, 55, 55, 28, 22, '#2EA8C9');
const PAVE = boite(10, 50, 78, 42, 24, 20, '#2E9C6A');
const PYRAMIDE = `<polygon points="15,90 75,90 60,15" fill="#E35D3A" fill-opacity=".2"/><polygon points="75,90 100,72 60,15" fill="#E35D3A" fill-opacity=".35"/><polyline points="15,90 75,90 100,72 60,15 15,90" ${T}/><line x1="75" y1="90" x2="60" y2="15" stroke="#1F3A5C" stroke-width="2"/><polyline points="15,90 40,72 100,72" ${P}/><line x1="40" y1="72" x2="60" y2="15" ${P}/>`;
const CYL = `<rect x="25" y="25" width="70" height="65" fill="#B8962E" fill-opacity=".2"/><ellipse cx="60" cy="25" rx="35" ry="11" fill="#B8962E" fill-opacity=".3" ${T}/><line x1="25" y1="25" x2="25" y2="90" stroke="#1F3A5C" stroke-width="2"/><line x1="95" y1="25" x2="95" y2="90" stroke="#1F3A5C" stroke-width="2"/><path d="M25 90 A35 11 0 0 0 95 90" ${T}/><path d="M25 90 A35 11 0 0 1 95 90" ${P}/>`;
const CONE = `<polygon points="25,88 95,88 60,12" fill="#2EA8C9" fill-opacity=".2"/><line x1="25" y1="88" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><line x1="95" y1="88" x2="60" y2="12" stroke="#1F3A5C" stroke-width="2"/><path d="M25 88 A35 11 0 0 0 95 88" ${T}/><path d="M25 88 A35 11 0 0 1 95 88" ${P}/>`;
const BOULE = `<circle cx="60" cy="55" r="40" fill="#2E9C6A" fill-opacity=".2" ${T}/><path d="M20 55 A40 12 0 0 0 100 55" ${T}/><path d="M20 55 A40 12 0 0 1 100 55" ${P}/>`;
function patron(cases, c, taille){
  const k = 22, maxX = Math.max(...cases.map(p => p[0])) + 1, maxY = Math.max(...cases.map(p => p[1])) + 1;
  return `<svg viewBox="0 0 ${maxX * k + 4} ${maxY * k + 4}" style="width:${taille || maxX * k + 4}px;display:inline-block;vertical-align:middle;">${cases.map(([x, y]) => `<rect x="${2 + x * k}" y="${2 + y * k}" width="${k}" height="${k}" fill="${c || '#2EA8C9'}" fill-opacity=".3" stroke="#1F3A5C" stroke-width="1.6"/>`).join('')}</svg>`;
}
const CROIX = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]];
const FAUX = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1]];
cm1Chapitre({
  niveau: 'ce2', titre: 'Les solides', slug: 'solides',
  cours: `
${cm1Lecon(1, 'Reconnaître les solides')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">${fig(CUBE, 'Cube')}${fig(PAVE, 'Pavé')}${fig(PYRAMIDE, 'Pyramide')}${fig(CYL, 'Cylindre')}${fig(CONE, 'Cône')}${fig(BOULE, 'Boule')}</div>
${cm1Rem('Sur ces dessins en <b>perspective</b>, on ne voit pas tout le solide : certaines faces sont cachées. Les arêtes cachées sont dessinées en <b>pointillés</b>.')}
${cm1Exemple('Dans la vie courante :', ['une boîte à chaussures a la forme d\'un <b>pavé</b> ; un dé, celle d\'un <b>cube</b> ;', 'une boîte de conserve, celle d\'un <b>cylindre</b> ; un cornet de glace, celle d\'un <b>cône</b> ;', 'une balle de tennis, celle d\'une <b>boule</b>.'])}

${cm1Lecon(2, 'Faces, arêtes, sommets')}
${cm1Def(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Une <b>face</b> est une surface plate du solide.</li><li>Une <b>arête</b> est un segment où deux faces se rencontrent.</li><li>Un <b>sommet</b> est un point où plusieurs arêtes se rencontrent.</li></ul>`, 'Vocabulaire')}
${cm1Tableau(['Solide', 'Faces', 'Arêtes', 'Sommets', 'Nature des faces'], [
  ['Cube', '6', '12', '8', '6 carrés'],
  ['Pavé', '6', '12', '8', 'des rectangles (parfois 2 carrés)'],
  ['Pyramide à base carrée', '5', '8', '5', '1 carré et 4 triangles'],
  ['Pyramide à base triangulaire', '4', '6', '4', '4 triangles'],
])}
${cm1Regle('Les faces d\'une <b>pyramide</b> sont des <b>triangles</b> qui ont <b>un sommet commun</b>, sauf peut-être une face, la <b>base</b>, qui est un polygone (triangle, carré, pentagone…).')}
${cm1Rem('Le cylindre, le cône et la boule ont une surface <b>courbe</b> : ils peuvent rouler.')}

${cm1Lecon(3, 'Le patron du cube')}
${cm1Def('Un <b>patron</b> du cube est une figure faite de <b>6 carrés</b>, en un seul morceau, qu\'on peut découper et plier pour fabriquer le cube, sans que deux faces se chevauchent.')}
<div class="figure-wrap" style="text-align:center;">${patron(CROIX, '#2EA8C9', 110)}<div class="hint" style="margin:0;">Un patron du cube : la croix</div></div>
${cm1Pliage('ce2-cube', { modeles: CM_CUBE_PATRONS.map(m => ({ nom: m.nom, faces: cmCube(m.cases) })), legende: 'Choisis un des <b>11 patrons du cube</b>, puis clique sur « Plier ». Fais glisser le dessin pour tourner autour du cube.' })}
${cm1Rem(`<b>Attention :</b> 6 carrés en un seul morceau ne forment pas toujours un patron. Avec la figure ci-dessous, deux faces se retrouvent au même endroit. Plie-la pour le voir.
<div style="text-align:center;margin:8px 0 4px;">${patron(FAUX, '#E35D3A', 110)}</div>
${cm1Pliage('ce2-cube-faux', { modeles: [{ nom: 'Pas un patron', faces: cmCube(FAUX) }], legende: 'Les deux faces qui se superposent deviennent rouges.' })}`)}
`,
  methode: `
${cm1Demo('ce2-so-justifier', 'Justifier la nature d\'un solide', 'Un solide a 5 faces : 4 triangles qui ont un sommet commun et un carré. Quel est ce solide ?')}
`,
  demos: [
    ['ce2-so-justifier', [
      { expr: '4 faces triangulaires avec un sommet commun', note: 'C\'est la caractéristique d\'une pyramide.' },
      { expr: '1 face carrée : c\'est la base.', note: 'La base peut être un polygone quelconque.' },
      { expr: 'C\'est une pyramide à base carrée.', note: 'Elle a 5 sommets et 8 arêtes.' },
    ]],
  ],
  exos: cm1Exos('ce2-so', [
    ['Nomme le solide : une brique · un rouleau d\'essuie-tout · une orange · un chapeau pointu.', 'pavé · cylindre · boule · cône.'],
    ['Combien de faces, d\'arêtes et de sommets a un cube ?', '6 faces, 12 arêtes, 8 sommets.'],
    ['Quelle est la nature des faces d\'un pavé ?', 'Des rectangles (6 faces).'],
    ['Je suis un solide à 4 faces, toutes triangulaires. Qui suis-je ?', 'Une pyramide à base triangulaire.'],
    [`Cette figure est-elle un patron de cube ?<div style="margin:6px 0;">${patron([[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], '#7A4FC0', 100)}</div>`, 'Oui : c\'est le patron « en escalier ». En pliant, chaque carré prend une face différente.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les pyramides d\'Égypte', [
    'La grande <b>pyramide de Khéops</b>, en Égypte, a été construite il y a environ 4 500 ans. C\'est une pyramide à base carrée de 230 m de côté, faite de plus de deux millions de blocs de pierre !',
  ]),
  quiz: [
    { q: 'Combien de faces a un cube ?', opts: ['4', '6', '8'], correct: 1 },
    { q: 'Quel solide peut rouler ?', opts: ['le cube', 'le cylindre', 'la pyramide'], correct: 1 },
    { q: 'Les faces d\'une pyramide (sauf la base) sont des…', opts: ['carrés', 'triangles', 'rectangles'], correct: 1 },
  ],
  flash: [
    { q: 'Combien d\'arêtes a un cube ?', r: ['6', '8', '12', '4'], ok: 2 },
    { q: 'Combien de sommets a un pavé ?', r: ['6', '8', '12', '4'], ok: 1 },
    { q: 'Une boîte de conserve a la forme…', r: ['d\'un cône', 'd\'un cylindre', 'd\'une boule', 'd\'un pavé'], ok: 1 },
    { q: 'Sur un dessin en perspective, les arêtes cachées sont…', r: ['en rouge', 'en pointillés', 'effacées', 'en gras'], ok: 1 },
    { q: 'Combien de carrés dans un patron de cube ?', r: ['4', '5', '6', '8'], ok: 2 },
    { q: 'Combien de faces a une pyramide à base carrée ?', r: ['4', '5', '6', '8'], ok: 1 },
  ],
});
})();

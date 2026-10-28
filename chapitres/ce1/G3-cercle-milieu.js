/* ============================================================
   CHAPITRE : Cercle, milieu et points alignés (CE1, G3, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, géométrie plane : le vocabulaire
   point, droite, segment, milieu d'un segment (introduit en situation, sans définition formelle) ;
   repérer et tracer des points alignés à la règle (et dire sans règle quand il n'y a aucun doute) ;
   trouver le milieu d'un segment par pliage ; reconnaître, nommer et décrire un cercle (centre) et
   un disque ; tracer un cercle au compas, en particulier le cercle de centre un point donné passant
   par un autre point donné ; reproduire un assemblage de figures.
   Pour aller plus loin (CE2) : la symétrie axiale (plier, axe de symétrie, compléter sur quadrillage).
   Pensé pour être projeté : le compas qui tourne, la bande de papier qui se plie.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const B = CPC.bord, R = CE2C.rouge, BL = CE2C.bleu;
const croix = (x, y, nom, dx, dy, c) => `<path d="M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x - 5} ${y + 5} L${x + 5} ${y - 5}" stroke="${c || B}" stroke-width="2.2"/>` + ce2T(x + (dx || 0), y + (dy == null ? -10 : dy), nom, { t: 15, g: 700, c: c || B });
// Un segment [AB], une droite (AB) qui continue, avec ses points.
const segment = cpSvg(260, 60, `<line x1="40" y1="34" x2="220" y2="34" stroke="${B}" stroke-width="2.5"/>` + croix(40, 34, 'A') + croix(220, 34, 'B'), 220);
const droite = cpSvg(260, 60, `<line x1="4" y1="34" x2="256" y2="34" stroke="${B}" stroke-width="2.5"/>` + croix(70, 34, 'A') + croix(190, 34, 'B'), 220);
// Points alignés (sur une même droite) ou non.
const alignes = cpSvg(240, 120, `<line x1="10" y1="104" x2="230" y2="16" stroke="${BL}" stroke-width="1.5" stroke-dasharray="6 5"/>` + croix(40, 92, 'E', 0, 22) + croix(120, 60, 'F', 0, 22) + croix(200, 28, 'G', 0, 22), 200);
const pasAlignes = cpSvg(240, 120, croix(40, 92, 'K', 0, 22) + croix(120, 30, 'L', 0, -10) + croix(200, 92, 'M', 0, 22), 200);
// Le milieu par pliage : la bande pliée amène A sur B ; le pli passe par M.
const milieu = cpSvg(280, 90, `<rect x="20" y="16" width="240" height="58" fill="#FFF7E8" stroke="#C9A24A"/><line x1="40" y1="45" x2="240" y2="45" stroke="${B}" stroke-width="2.5"/><line x1="140" y1="8" x2="140" y2="82" stroke="${R}" stroke-width="2" stroke-dasharray="6 4"/>` + croix(40, 45, 'A', 0, -10) + croix(240, 45, 'B', 0, -10) + croix(140, 45, 'M', 12, 22, R), 240);
// Cercle de centre O passant par A.
const cercleOA = (px, disque) => cpSvg(200, 180, `<circle cx="100" cy="90" r="70" fill="${disque ? BL : 'none'}" fill-opacity="${disque ? .25 : 0}" stroke="${BL}" stroke-width="3"/>` + croix(100, 90, 'O', -12, -8) + croix(170, 90, 'A', 12, -8), px || 150);
// Symétrie (pour aller plus loin) : figure sur quadrillage avec un axe vertical en x = v.
function symQ(nc, nr, pts, v, o){
  o = o || {}; const c = 24; let s = '';
  for(let i = 0; i <= nc; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + nr * c}" stroke="#D5DBE3"/>`;
  for(let j = 0; j <= nr; j++) s += `<line x1="4" y1="${4 + j * c}" x2="${4 + nc * c}" y2="${4 + j * c}" stroke="#D5DBE3"/>`;
  const poly = (L, col) => `<polygon points="${L.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ')}" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="2.5"/>`;
  s += poly(pts, CE2C.vert);
  if(o.image) s += poly(pts.map(([x, y]) => [2 * v - x, y]), CE2C.violet);
  s += `<line x1="${4 + v * c}" y1="0" x2="${4 + v * c}" y2="${8 + nr * c}" stroke="${R}" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  return cpSvg(nc * c + 8, nr * c + 8, s, o.px);
}
const papillon = cpSvg(160, 120, `<ellipse cx="50" cy="45" rx="38" ry="30" fill="#E9C46A" stroke="${B}" stroke-width="2"/><ellipse cx="110" cy="45" rx="38" ry="30" fill="#E9C46A" stroke="${B}" stroke-width="2"/><ellipse cx="56" cy="88" rx="26" ry="20" fill="#E35D3A" stroke="${B}" stroke-width="2"/><ellipse cx="104" cy="88" rx="26" ry="20" fill="#E35D3A" stroke="${B}" stroke-width="2"/><rect x="75" y="20" width="10" height="90" rx="5" fill="${B}"/><line x1="80" y1="2" x2="80" y2="118" stroke="${R}" stroke-width="2.5" stroke-dasharray="7 5"/>`, 130);
const SAPIN = [[5, 1], [5, 7], [2, 7], [4, 5], [2, 5]];

cm1Chapitre({
  niveau: 'ce1', titre: 'Cercle, milieu et points alignés', slug: 'cercle-milieu',
  cours: `
${cm1Lecon(1, 'Points, segments, droites')}
${cm1Def(`${lig(segment)}${P('Un <b>segment</b> est un trait droit qui s\'arrête à ses deux bouts, les points A et B. On peut mesurer sa longueur.')}${lig(droite)}${P('Une <b>droite</b> passe par deux points et continue des deux côtés, sans s\'arrêter.')}`, 'Segment et droite')}
${cm1Def(`${lig(alignes, pasAlignes)}${P('Les points E, F et G sont sur une même droite : ils sont <b>alignés</b>. Les points K, L et M ne le sont pas.')}`, 'Des points alignés')}
${cm1Regle('Pour vérifier que des points sont alignés, je pose le bord de la règle sur deux points : le troisième doit toucher la règle aussi. Quand on voit tout de suite qu\'ils ne le sont pas, pas besoin de règle.', 'Avec la règle')}

${cm1Lecon(2, 'Le milieu d\'un segment')}
${cm1Def(`${lig(milieu)}${P('Je plie la feuille pour que le point A arrive exactement sur le point B. Le pli coupe le segment en son <b>milieu</b> M : M est sur le segment, à la même distance de A et de B.')}`, 'Trouver le milieu par pliage')}
${cm1Astuce('On peut vérifier avec la règle : de A à M et de M à B, on trouve la même longueur.')}

${cm1Lecon(3, 'Le cercle et le compas')}
${ce2AnimCompas('ce1-g3-compas', { sansRayon: true, legende: 'On pique la pointe sur le centre, puis on tourne le compas sans changer l\'écartement.', presets: [{ nom: 'Écartement 3 cm', r: 3 }, { nom: 'Écartement 4 cm', r: 4 }] })}
${cm1Def(`${lig(cercleOA(140), cercleOA(140, true))}${P('Le trait rond est un <b>cercle</b> ; le point O est son <b>centre</b>. La surface à l\'intérieur du cercle est un <b>disque</b>.')}`, 'Cercle et disque')}
${cm1Regle(`Pour tracer le cercle de centre O qui passe par le point A :${cm1Liste(['je pique la pointe du compas sur O ;', 'j\'écarte le compas jusqu\'à ce que la mine touche A ;', 'je tourne le compas en le tenant par le haut, sans changer l\'écartement.'])}`, 'Tracer au compas')}

${cm1Lecon(4, 'Reproduire des figures')}
${cm1Def(`${lig(cpSvg(220, 160, `<rect x="40" y="70" width="140" height="80" fill="#2EA8C9" fill-opacity=".25" stroke="${B}" stroke-width="2.5"/><polygon points="40,70 180,70 110,14" fill="#E9C46A" fill-opacity=".4" stroke="${B}" stroke-width="2.5"/><circle cx="110" cy="110" r="22" fill="none" stroke="${R}" stroke-width="2.5"/>` + croix(110, 110, '', 0, 0), 180))}${P('Un assemblage : un rectangle, un triangle et un cercle dont le centre est au milieu du rectangle. Pour le reproduire, je commence par le rectangle (règle et équerre), puis le triangle, puis le cercle (compas).')}`, 'Un assemblage de figures')}

${ce1PlusLoin('la symétrie')}
${cm1Rem('La symétrie sera étudiée au CE2. On peut déjà jouer avec des pliages : plier une feuille, découper, déplier.')}
${cm1Def(`${lig(papillon)}${P('Si on plie le dessin le long de la ligne rouge, les deux moitiés se superposent <b>exactement</b>. La ligne rouge est un <b>axe de symétrie</b>.')}`, 'Axe de symétrie')}
${ce2AnimSymQuad('ce1-g3-quad', { presets: [
  { nom: 'Sapin', n: 10, m: 8, pts: SAPIN, axe: { v: 5 } },
  { nom: 'Flèche', n: 10, m: 7, pts: [[1, 3], [3, 1], [3, 2], [4, 2], [4, 5], [3, 5], [3, 6]], axe: { v: 5 } }] })}
${cm1Regle(`Pour chaque sommet, je compte les carreaux jusqu'à l'axe, puis j'en compte <b>autant de l'autre côté</b>.${lig(symQ(10, 8, SAPIN, 5, { image: true }))}`, 'Compléter')}
`,
  methode: `
${cm1Demo('ce1-g3-m-cercle', 'Tracer le cercle de centre O passant par A', 'Trace le cercle de centre O qui passe par A.')}
${cm1Demo('ce1-g3-m-milieu', 'Trouver le milieu d\'un segment par pliage', 'Trouve le milieu du segment [AB].')}
`,
  demos: [
    ['ce1-g3-m-cercle', [
      { expr: 'Je pique la pointe du compas sur O.', note: 'O sera le centre du cercle.', fig: cpSvg(200, 180, croix(100, 90, 'O', -12, -8) + croix(170, 90, 'A', 12, -8), 140) },
      { expr: 'J\'écarte le compas jusqu\'au point A.', note: 'La mine touche A.' },
      { expr: 'Je tourne, sans changer l\'écartement.', note: 'Le cercle passe bien par A.', fig: cercleOA(140) },
    ]],
    ['ce1-g3-m-milieu', [
      { expr: 'Je plie la feuille pour amener A sur B.', note: 'Je regarde par transparence.' },
      { expr: 'J\'appuie bien sur le pli.', note: 'Le pli coupe le segment.', fig: milieu },
      { expr: 'Le milieu M est là où le pli coupe le segment.', note: 'AM = MB.' },
    ]],
  ],
  exos: cm1Exos('ce1-g3', [
    [`Les points E, F et G sont-ils alignés ? Et K, L, M ?${lig(alignes, pasAlignes)}`,
      cm1Redac('Points alignés', '', 'E, F et G sont alignés : ils sont sur une même droite. K, L et M ne sont pas alignés.')],
    ['Quelle est la différence entre un segment et une droite ?',
      cm1Redac('Segment et droite', '', 'Un segment s\'arrête à ses deux bouts ; une droite continue des deux côtés sans s\'arrêter.', lig(segment) + lig(droite))],
    ['Un segment [AB] mesure 8 cm. M est son milieu. Combien mesure [AM] ?',
      cm1Redac('Longueur de [AM]', '4 + 4 = 8', 'M est au milieu : [AM] mesure 4 cm.')],
    ['Trace un cercle de centre O avec un écartement de compas de 3 cm.',
      cm1Redac('Le cercle', '', 'J\'écarte le compas de 3 cm sur la règle, je pique sur O et je tourne sans changer l\'écartement.', cercleOA(110))],
    ['Le point A est sur le cercle de centre O. Comment tracer ce cercle ?',
      cm1Redac('Cercle de centre O passant par A', '', 'Je pique sur O, j\'écarte le compas jusqu\'à A, puis je tourne.', cercleOA(110))],
    ['Quelle est la différence entre un cercle et un disque ?',
      cm1Redac('Cercle et disque', '', 'Le cercle est le trait rond ; le disque est toute la surface à l\'intérieur.', lig(cercleOA(90), cercleOA(90, true)))],
    ['Pour aller plus loin : le papillon a-t-il un axe de symétrie ?',
      cm1Redac('Le papillon', '', 'Oui : la ligne verticale qui passe par son corps est un axe de symétrie.', papillon)],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le compas des bâtisseurs', [
    'Le compas existe depuis l\'Antiquité. Les bâtisseurs des cathédrales s\'en servaient pour tracer les grandes rosaces des vitraux, avec une simple corde attachée à un piquet.',
    'Le mathématicien grec <b>Euclide</b>, il y a plus de 2 000 ans, construisait beaucoup de figures avec seulement une règle et un compas !',
  ]),
  quiz: [
    { q: 'Pour tracer un cercle, on utilise…', opts: ['un compas', 'une équerre', 'une balance'], correct: 0 },
    { q: 'Le point au milieu d\'un cercle s\'appelle…', opts: ['le centre', 'le milieu', 'le sommet'], correct: 0 },
    { q: 'Pour trouver le milieu d\'un segment, je peux…', opts: ['plier la feuille', 'peser la feuille', 'colorier'], correct: 0 },
    { q: 'Une droite…', opts: ['ne s\'arrête pas', 'a deux bouts', 'est ronde'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Des points sur une même droite sont…', r: ['alignés', 'pliés', 'égaux', 'ronds'], ok: 0 },
    { l: 1, q: 'Un trait droit qui s\'arrête à ses deux bouts :', r: ['un segment', 'une droite', 'un cercle', 'un angle'], ok: 0 },
    { l: 2, q: 'Le milieu d\'un segment de 10 cm est à … de chaque bout.', r: ['5 cm', '10 cm', '2 cm', '20 cm'], ok: 0 },
    { l: 3, q: 'L\'intérieur d\'un cercle s\'appelle…', r: ['un disque', 'un centre', 'un rond', 'un carré'], ok: 0 },
    { l: 3, q: 'Pour tracer un cercle, on pique le compas sur…', r: ['le centre', 'le bord', 'la règle', 'le milieu de la feuille'], ok: 0 },
  ],
});
})();

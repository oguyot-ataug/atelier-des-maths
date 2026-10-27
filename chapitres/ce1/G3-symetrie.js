/* ============================================================
   CHAPITRE : La symétrie (CE1, G3, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, espace et géométrie : reconnaître
   qu'une figure a un axe de symétrie (par pliage, les deux moitiés se superposent exactement),
   trouver l'axe de symétrie d'une figure simple, compléter une figure par symétrie sur un
   quadrillage (axe vertical ou horizontal) en comptant les carreaux.
   Pensé pour être projeté : chaque sommet trouve son image de l'autre côté de l'axe.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Figure sur quadrillage avec un axe : pts (côté gauche), o.image : dessiner aussi l'image ; axe vertical en x = v.
function symQ(nc, nr, pts, v, o){
  o = o || {}; const c = 24; let s = '';
  for(let i = 0; i <= nc; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + nr * c}" stroke="#D5DBE3"/>`;
  for(let j = 0; j <= nr; j++) s += `<line x1="4" y1="${4 + j * c}" x2="${4 + nc * c}" y2="${4 + j * c}" stroke="#D5DBE3"/>`;
  const poly = (L, col, d) => `<polygon points="${L.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ')}" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="2.5"${d ? ' stroke-dasharray="6 4"' : ''}/>`;
  s += poly(pts, CE2C.vert);
  if(o.image) s += poly(pts.map(([x, y]) => [2 * v - x, y]), CE2C.violet, o.image === 'pointilles');
  s += `<line x1="${4 + v * c}" y1="0" x2="${4 + v * c}" y2="${8 + nr * c}" stroke="${CE2C.rouge}" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  return cpSvg(nc * c + 8, nr * c + 8, s, o.px);
}
// Dessins symétriques ou non (papillon, cœur, drapeau…).
const papillon = (axe) => cpSvg(160, 120, `<ellipse cx="50" cy="45" rx="38" ry="30" fill="#E9C46A" stroke="${CPC.bord}" stroke-width="2"/><ellipse cx="110" cy="45" rx="38" ry="30" fill="#E9C46A" stroke="${CPC.bord}" stroke-width="2"/><ellipse cx="56" cy="88" rx="26" ry="20" fill="#E35D3A" stroke="${CPC.bord}" stroke-width="2"/><ellipse cx="104" cy="88" rx="26" ry="20" fill="#E35D3A" stroke="${CPC.bord}" stroke-width="2"/><rect x="75" y="20" width="10" height="90" rx="5" fill="${CPC.bord}"/>` + (axe ? `<line x1="80" y1="2" x2="80" y2="118" stroke="${CE2C.rouge}" stroke-width="2.5" stroke-dasharray="7 5"/>` : ''), 130);
const drapeau = cpSvg(120, 120, `<line x1="20" y1="10" x2="20" y2="115" stroke="${CPC.bord}" stroke-width="4"/><polygon points="20,12 100,32 20,58" fill="#2EA8C9" stroke="${CPC.bord}" stroke-width="2"/>`, 100);
const coeur = cpSvg(120, 110, `<path d="M60 100 C10 70 0 40 20 20 C40 0 60 15 60 30 C60 15 80 0 100 20 C120 40 110 70 60 100 Z" fill="#E35D3A" fill-opacity=".7" stroke="${CPC.bord}" stroke-width="2"/>`, 100);
const SAPIN = [[5, 1], [5, 7], [2, 7], [4, 5], [2, 5]];

cm1Chapitre({
  niveau: 'ce1', titre: 'La symétrie', slug: 'symetrie',
  cours: `
${cm1Lecon(1, 'Plier pour vérifier')}
${cm1Def(`${lig(papillon(true))}${P('Si on plie le dessin le long de la ligne rouge, les deux moitiés se superposent <b>exactement</b>. La ligne rouge est un <b>axe de symétrie</b>.')}`, 'Axe de symétrie')}
${cm1Rem('Au tableau : plier des formes découpées (cœur, papillon, lettres). Faire des taches d\'encre ou de peinture sur une feuille pliée, puis l\'ouvrir : le dessin obtenu est symétrique.')}

${cm1Lecon(2, 'Des figures symétriques ou non')}
${cm1Def(`${lig(coeur, drapeau)}${P('Le cœur a un axe de symétrie (vertical, au milieu). Le drapeau tel qu\'il est dessiné n\'en a pas : aucun pliage ne superpose les deux moitiés.')}`, 'Reconnaître')}
${cm1Astuce('Certaines lettres sont symétriques : A, M, T, O, X… D\'autres non : F, G, R. Cherche dans ton prénom !')}

${cm1Lecon(3, 'Compléter sur un quadrillage')}
${ce2AnimSymQuad('ce1-g3-quad', { presets: [
  { nom: 'Sapin', n: 10, m: 8, pts: SAPIN, axe: { v: 5 } },
  { nom: 'Flèche', n: 10, m: 7, pts: [[1, 3], [3, 1], [3, 2], [4, 2], [4, 5], [3, 5], [3, 6]], axe: { v: 5 } },
  { nom: 'Drapeau (axe horizontal)', n: 8, m: 8, pts: [[2, 4], [2, 1], [6, 2], [3, 3], [3, 4]], axe: { h: 4 } }] })}
${cm1Regle(`Pour chaque sommet, je compte les carreaux jusqu'à l'axe, puis j'en compte <b>autant de l'autre côté</b>.${lig(symQ(10, 8, SAPIN, 5, { image: true }))}`, 'Compléter')}

${cm1Lecon(4, 'L\'image est retournée')}
${cm1Regle('La moitié symétrique est comme dans un <b>miroir</b> : la figure est retournée. Ce qui est à gauche de l\'axe se retrouve à droite, à la même distance.')}
`,
  methode: `
${cm1Demo('ce1-g3-m-completer', 'Compléter une figure par symétrie', 'Complète la figure pour que la ligne rouge soit un axe de symétrie.')}
${cm1Demo('ce1-g3-m-axe', 'Trouver un axe de symétrie', 'Le rectangle a-t-il des axes de symétrie ?')}
`,
  demos: [
    ['ce1-g3-m-completer', [
      { expr: 'Je repère un sommet et je compte jusqu\'à l\'axe.', note: 'Le sommet du bas à gauche est à 3 carreaux de l\'axe.', fig: symQ(8, 5, [[1, 4], [4, 4], [4, 1], [2, 2]], 4) },
      { expr: 'Je reporte 3 carreaux de l\'autre côté.', note: 'Même ligne, même distance.' },
      { expr: 'Je fais pareil pour chaque sommet, puis je relie.', note: 'La figure complétée est symétrique.', fig: symQ(8, 5, [[1, 4], [4, 4], [4, 1], [2, 2]], 4, { image: true }) },
    ]],
    ['ce1-g3-m-axe', [
      { expr: 'Je plie le rectangle en deux, dans la longueur.', note: 'Les deux moitiés se superposent : c\'est un axe.' },
      { expr: 'Je le plie dans la largeur.', note: 'Ça marche aussi : un deuxième axe.' },
      { expr: 'Je le plie en diagonale.', note: 'Les coins ne se superposent pas : la diagonale n\'est pas un axe. Le rectangle a 2 axes de symétrie.' },
    ]],
  ],
  exos: cm1Exos('ce1-g3', [
    ['Le papillon a-t-il un axe de symétrie ? Où est-il ?',
      cm1Redac('Le papillon', '', 'Oui : la ligne verticale qui passe par son corps est un axe de symétrie.', papillon(true))],
    ['Parmi ces lettres, lesquelles ont un axe de symétrie : A, F, H, R ?',
      cm1Redac('Les lettres', '', 'A et H ont un axe de symétrie (vertical) ; H en a même deux. F et R n\'en ont pas.')],
    [`Complète la figure par symétrie.${lig(symQ(8, 5, [[1, 1], [4, 1], [4, 4], [2, 4]], 4))}`,
      cm1Redac('La figure complétée', '', 'Chaque sommet est reporté à la même distance de l\'axe, de l\'autre côté.', symQ(8, 5, [[1, 1], [4, 1], [4, 4], [2, 4]], 4, { image: true, px: 170 }))],
    ['Un carré a-t-il des axes de symétrie ? Combien ?',
      cm1Redac('Le carré', '', 'Oui : un carré a 4 axes de symétrie (2 par le milieu des côtés, 2 en diagonale).')],
    ['Un point est à 2 carreaux à gauche de l\'axe. Où est son image ?',
      cm1Redac('L\'image du point', '', 'Son image est à 2 carreaux à droite de l\'axe, sur la même ligne.')],
    ['Cite deux objets de la vie de tous les jours qui ont un axe de symétrie.',
      cm1Redac('Des objets symétriques', '', 'Par exemple : une paire de lunettes, un vélo vu de face, une feuille d\'arbre, un visage, une porte…')],
    [`Cette figure est-elle bien complétée ?${lig(symQ(8, 5, [[1, 4], [3, 4], [3, 1]], 4, { image: true }))}`,
      cm1Redac('Vérifier', '', 'Oui : chaque sommet de droite est à la même distance de l\'axe que le sommet de gauche correspondant.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la symétrie dans l\'art', [
    'Depuis très longtemps, les artistes aiment la symétrie : la façade du <b>Taj Mahal</b> en Inde (construit il y a près de 400 ans), le château de Versailles, de nombreux temples et cathédrales sont symétriques.',
    'La nature aussi : les ailes des papillons, les feuilles, les flocons de neige… Le corps humain est presque symétrique, mais pas tout à fait : ton cœur est un peu à gauche !',
  ]),
  quiz: [
    { q: 'Un axe de symétrie partage une figure en…', opts: ['deux moitiés qui se superposent', 'trois parties', 'deux moitiés différentes'], correct: 0 },
    { q: 'Quelle lettre a un axe de symétrie ?', opts: ['M', 'F', 'R'], correct: 0 },
    { q: 'Un point à 3 carreaux de l\'axe : son image est à…', opts: ['3 carreaux de l\'autre côté', '6 carreaux', 'sur l\'axe'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Pour vérifier une symétrie, on peut…', r: ['plier', 'peser', 'compter', 'colorier'], ok: 0 },
    { l: 2, q: 'Le O a-t-il un axe de symétrie ?', r: ['Oui', 'Non', 'Seulement le matin', 'On ne sait pas'], ok: 0 },
    { l: 2, q: 'Le G a-t-il un axe de symétrie ?', r: ['Non', 'Oui', 'Deux', 'Quatre'], ok: 0 },
    { l: 3, q: 'Sommet à 4 carreaux à droite de l\'axe. Image : …', r: ['4 carreaux à gauche', '8 carreaux à gauche', '4 à droite', 'sur l\'axe'], ok: 0 },
  ],
});
})();

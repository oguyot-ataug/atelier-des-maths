/* ============================================================
   CHAPITRE : Polygones et angle droit (CE1, G2, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, espace et géométrie : reconnaître
   et nommer carré, rectangle, triangle, triangle rectangle ; donner le nombre de côtés et de sommets
   d'un polygone ; repérer un angle droit avec un gabarit ou une équerre et le coder ; dire si un
   angle est aigu (plus petit qu'un angle droit) ou obtus (plus grand) ; le carré et le rectangle
   ont quatre angles droits, justifier (« ce n'est pas un rectangle car… ») ; reproduire sur
   quadrillage. Pour aller plus loin (CE2) : les mots quadrilatère, pentagone, hexagone.
   Pensé pour être projeté : le polygone tracé côté par côté, le gabarit posé dans chaque coin.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Un polygone (points en pixels dans un cadre 120 × 100), avec codage des angles droits.
function poly(pts, c, droits, px){
  let s = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.2"/>`;
  (droits || []).forEach(i => { const n = pts.length, S = pts[i], A = pts[(i + n - 1) % n], B = pts[(i + 1) % n], e = 10;
    const ua = [A[0] - S[0], A[1] - S[1]], ub = [B[0] - S[0], B[1] - S[1]], la = Math.hypot(...ua), lb = Math.hypot(...ub);
    const P1 = [S[0] + ua[0] / la * e, S[1] + ua[1] / la * e], P2 = [S[0] + ub[0] / lb * e, S[1] + ub[1] / lb * e];
    s += `<path d="M${P1[0]} ${P1[1]} L${P1[0] + ub[0] / lb * e} ${P1[1] + ub[1] / lb * e} L${P2[0]} ${P2[1]}" fill="none" stroke="${CE2C.rouge}" stroke-width="1.8"/>`; });
  return cpSvg(120, 100, s, px || 96);
}
const CARRE = [[25, 15], [95, 15], [95, 85], [25, 85]], RECT = [[8, 25], [112, 25], [112, 80], [8, 80]], TRI_R = [[20, 85], [20, 15], [100, 85]], TRI = [[60, 10], [110, 88], [10, 88]];
const PENTA = [[60, 8], [110, 42], [92, 92], [28, 92], [10, 42]], HEXA = [[35, 10], [85, 10], [112, 50], [85, 90], [35, 90], [8, 50]];

cm1Chapitre({
  niveau: 'ce1', titre: 'Polygones et angle droit', slug: 'polygones-angle-droit',
  cours: `
${cm1Lecon(1, 'Les polygones')}
${cm1Def(`Un <b>polygone</b> est une figure fermée dont tous les côtés sont des traits droits.${lig(poly(TRI, '#E9C46A'), poly(CARRE, '#2EA8C9'), poly(PENTA, '#7A4FC0'), poly(HEXA, '#2E9C6A'))}${P('3 côtés, 4 côtés, 5 côtés, 6 côtés : on compte les <b>côtés</b> et les <b>sommets</b> (les coins). Un polygone a autant de sommets que de côtés.')}`, 'Polygone')}
${cm1Regle('Un polygone à 3 côtés est un <b>triangle</b>. Le carré et le rectangle ont 4 côtés.', 'Triangle, carré, rectangle')}
${ce2AnimPolygone('ce1-g2-poly', {})}
${cm1Rem('Un disque n\'est pas un polygone : son bord est arrondi. Une figure « ouverte » n\'est pas un polygone non plus.')}

${cm1Lecon(2, 'L\'angle droit')}
${cm1Def(`Un <b>angle droit</b>, c'est comme le coin d'une feuille de papier. Pour le vérifier, on utilise un <b>gabarit</b> (une feuille pliée en quatre) ou une <b>équerre</b>.${lig(poly(CARRE, '#2EA8C9', [0, 1, 2, 3]))}${P('On code un angle droit par un petit carré.')}`, 'Angle droit')}
${ce1AnimGabarit('ce1-g2-gabarit')}
${ce2AnimAngle('ce1-g2-angle', { legende: 'Le côté rouge tourne : l\'angle est d\'abord plus petit qu\'un angle droit, puis droit, puis plus grand.' })}
${cm1Regle(`${cm1Liste(['plus petit qu\'un angle droit : un angle <b>aigu</b> ;', 'plus grand qu\'un angle droit : un angle <b>obtus</b>.'])}${P('Quand on voit tout de suite qu\'un angle n\'est pas droit, pas besoin de l\'équerre.')}`, 'Aigu ou obtus')}

${cm1Lecon(3, 'Carré et rectangle')}
${cm1Regle(`${lig(poly(CARRE, '#2EA8C9', [0, 1, 2, 3]), poly(RECT, '#2E9C6A', [0, 1, 2, 3]))}${cm1Liste(['Le <b>carré</b> a 4 angles droits et 4 côtés de même longueur.', 'Le <b>rectangle</b> a 4 angles droits ; ses côtés opposés ont la même longueur (deux longueurs, deux largeurs).'])}`, 'À savoir')}
${cm1Astuce('Un carré est un rectangle particulier : un rectangle dont tous les côtés ont la même longueur !')}
${cm1Regle('Pour dire qu\'une figure n\'est pas un rectangle, il suffit d\'une raison : « Ce n\'est pas un rectangle car l\'un de ses angles n\'est pas droit. »', 'Justifier')}

${cm1Lecon(4, 'Le triangle rectangle')}
${cm1Def(`${lig(poly(TRI_R, '#E35D3A', [0]))}${P('Un triangle qui a un angle droit s\'appelle un <b>triangle rectangle</b>.')}`, 'Triangle rectangle')}

${ce1PlusLoin('le nom des polygones')}
${cm1Def(`${lig(poly(CARRE, '#2EA8C9'), poly(PENTA, '#7A4FC0'), poly(HEXA, '#2E9C6A'))}${P('Au CE2, on nommera les polygones d\'après leur nombre de côtés : <b>quadrilatère</b> (4 côtés), <b>pentagone</b> (5 côtés), <b>hexagone</b> (6 côtés).')}`, 'Quadrilatère, pentagone, hexagone')}
`,
  methode: `
${cm1Demo('ce1-g2-m-gabarit', 'Fabriquer un gabarit d\'angle droit', 'Avec une feuille de papier, fabrique un gabarit.')}
${cm1Demo('ce1-g2-m-reconnaitre', 'Reconnaître un rectangle', 'Cette figure est-elle un rectangle ?')}
`,
  demos: [
    ['ce1-g2-m-gabarit', [
      { expr: 'Je plie une feuille (même déchirée) en deux.', note: 'Le pli fait un trait bien droit.' },
      { expr: 'Je plie une deuxième fois, en faisant tomber le pli sur lui-même.', note: 'Les deux morceaux du pli doivent se superposer exactement.' },
      { expr: 'Le coin formé est un angle droit.', note: 'Je peux m\'en servir comme gabarit.', fig: cpSvg(120, 100, `<path d="M20 90 L20 20 Q60 6 90 30 L100 90 Z" fill="#F7E7A9" stroke="#B8962E" stroke-width="2"/><path d="M20 76 H34 V90" fill="none" stroke="${CE2C.rouge}" stroke-width="2"/>`, 90) },
    ]],
    ['ce1-g2-m-reconnaitre', [
      { expr: 'Je compte les côtés : 4.', note: 'Il a 4 côtés et 4 sommets.', fig: poly(RECT, '#2E9C6A') },
      { expr: 'Je vérifie les 4 angles avec le gabarit.', note: 'Ils sont tous droits.', fig: poly(RECT, '#2E9C6A', [0, 1, 2, 3]) },
      { expr: 'Les côtés opposés ont la même longueur.', note: 'C\'est un <b>rectangle</b>.' },
    ]],
  ],
  exos: cm1Exos('ce1-g2', [
    [`Combien de côtés et de sommets a ce polygone ?${lig(poly(PENTA, '#7A4FC0'))}`,
      cm1Redac('Le polygone', '', 'Il a 5 côtés et 5 sommets.')],
    [`Lesquelles de ces figures sont des polygones ?${lig(poly(TRI, '#E9C46A'), cpSvg(120, 100, '<circle cx="60" cy="50" r="40" fill="#E35D3A" fill-opacity=".3" stroke="#1F3A5C" stroke-width="2.2"/>', 96), poly(HEXA, '#2E9C6A'))}`,
      cm1Redac('Les polygones', '', 'Le triangle et la figure à 6 côtés sont des polygones. Le disque n\'en est pas un : son bord est arrondi.')],
    ['Combien d\'angles droits a un rectangle ?',
      cm1Redac('Le rectangle', '', 'Un rectangle a 4 angles droits.', poly(RECT, '#2E9C6A', [0, 1, 2, 3], 80))],
    [`Combien d'angles droits a ce triangle ?${lig(poly(TRI_R, '#E35D3A'))}`,
      cm1Redac('Le triangle', '', 'Il a un angle droit : c\'est un triangle rectangle.', poly(TRI_R, '#E35D3A', [0], 80))],
    [`Ces angles sont-ils aigus, droits ou obtus ?${lig(cpSvg(120, 80, `<path d="M15 70 H105 M15 70 L80 18" fill="none" stroke="${CPC.bord}" stroke-width="3"/>`, 90), cpSvg(120, 80, `<path d="M40 70 H110 M40 70 L8 15" fill="none" stroke="${CPC.bord}" stroke-width="3"/>`, 90))}`,
      cm1Redac('Les angles', '', 'Le premier est plus petit qu\'un angle droit : il est aigu. Le second est plus grand : il est obtus.')],
    [`Cette figure est-elle un rectangle ?${lig(poly([[10, 25], [112, 25], [100, 80], [8, 80]], '#E9C46A'))}`,
      cm1Redac('Un rectangle', '', 'Ce n\'est pas un rectangle car ses angles ne sont pas droits (je le vérifie avec l\'équerre).')],
    ['Une figure a 4 côtés, 4 angles droits et 4 côtés de même longueur. Comment s\'appelle-t-elle ?',
      cm1Redac('Devinette', '', 'C\'est un carré.')],
    ['Cite deux objets de la classe qui ont des angles droits.',
      cm1Redac('Des angles droits', '', 'Par exemple : le coin d\'une feuille, le coin du tableau, le coin d\'une porte, d\'une fenêtre, d\'un livre…')],
    [`Reproduis ce rectangle sur un quadrillage : 6 carreaux de long, 3 de large.`,
      cm1Redac('Le rectangle', '', 'Je trace 6 carreaux, puis 3, puis 6, puis 3 : les quatre coins sont des angles droits.', cpQuadFig(8, 5, [[[[1, 1], [7, 1], [7, 4], [1, 4]], '#2E9C6A']], { px: 160 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la corde à 12 nœuds', [
    'Il y a très longtemps, en Égypte, pour faire des angles droits bien précis (pour les champs et les bâtiments), les arpenteurs utilisaient peut-être une <b>corde à 12 nœuds</b>, régulièrement espacés.',
    'En tendant la corde en triangle, avec 3 intervalles sur un côté, 4 sur un autre et 5 sur le dernier, on obtient un angle droit ! Les maçons et les jardiniers utilisent encore cette astuce.',
  ]),
  quiz: [
    { q: 'Un angle plus petit qu\'un angle droit est…', opts: ['aigu', 'obtus', 'rectangle'], correct: 0 },
    { q: 'Pour vérifier un angle droit, on utilise…', opts: ['une équerre ou un gabarit', 'une balance', 'une horloge'], correct: 0 },
    { q: 'Le carré a…', opts: ['4 angles droits', '2 angles droits', 'aucun angle droit'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Combien de côtés a un triangle ?', r: ['3', '4', '5', '6'], ok: 0 },
    { l: 1, q: 'Un polygone à 5 côtés a… sommets.', r: ['5', '4', '6', '10'], ok: 0 },
    { l: 2, q: 'Un angle plus grand qu\'un angle droit est…', r: ['obtus', 'aigu', 'droit', 'plat'], ok: 0 },
    { l: 2, q: 'Le coin d\'une feuille est…', r: ['un angle droit', 'un cercle', 'un sommet arrondi', 'un côté'], ok: 0 },
    { l: 3, q: 'Les côtés du carré sont…', r: ['tous de même longueur', 'tous différents', 'arrondis', 'au nombre de 3'], ok: 0 },
    { l: 4, q: 'Un triangle avec un angle droit :', r: ['un triangle rectangle', 'un rectangle', 'un carré', 'un hexagone'], ok: 0 },
  ],
});
})();

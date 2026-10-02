/* ============================================================
   CHAPITRE : Figures planes (CM2, G2, période 2)
   Programme du cycle 3 (CM2) : reconnaître et nommer, en s'appuyant sur leur définition, triangle,
   triangle rectangle, isocèle, équilatéral, quadrilatère, carré, rectangle, losange, trapèze,
   trapèze rectangle, pentagone, hexagone ; propriétés (côtés opposés parallèles, égalités de
   longueurs et d'angles) ; codages ; reproduire et construire (règle graduée, équerre, compas).
   ============================================================ */
(() => {
const S = 'stroke="#1F3A5C" stroke-width="2.2"';
const tic = (x1, y1, x2, y2, n) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L * 6, ny = dx / L * 6, tx = dx / L * 3.5, ty = dy / L * 3.5; let s = ''; for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2); s += `<line x1="${(mx + o * tx - nx).toFixed(1)}" y1="${(my + o * ty - ny).toFixed(1)}" x2="${(mx + o * tx + nx).toFixed(1)}" y2="${(my + o * ty + ny).toFixed(1)}" stroke="#E35D3A" stroke-width="1.8"/>`; } return s; };
const droit = (x, y, sx, sy) => `<polyline points="${x + sx * 11},${y} ${x + sx * 11},${y + sy * 11} ${x},${y + sy * 11}" fill="none" stroke="#E35D3A" stroke-width="1.6"/>`;
const fig = (svg, nom, c) => `<div style="text-align:center;width:128px;"><svg viewBox="0 0 120 100" style="width:118px;">${svg.replace(/FILL/g, c)}</svg><div style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:#1F3A5C;font-size:.92rem;">${nom}</div></div>`;
const poly = pts => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="FILL" fill-opacity=".2" ${S}/>`;
const FIGS = {
  rect: fig(poly([[15, 85], [65, 85], [15, 25]]) + droit(15, 85, 1, -1), 'triangle rectangle', '#2EA8C9'),
  iso: fig(poly([[20, 88], [100, 88], [60, 12]]) + tic(20, 88, 60, 12, 1) + tic(100, 88, 60, 12, 1), 'triangle isocèle', '#7A4FC0'),
  equi: fig(poly([[18, 88], [102, 88], [60, 15]]) + tic(18, 88, 60, 15, 2) + tic(102, 88, 60, 15, 2) + tic(18, 88, 102, 88, 2), 'triangle équilatéral', '#E35D3A'),
  carre: fig(poly([[25, 15], [95, 15], [95, 85], [25, 85]]) + droit(25, 85, 1, -1) + droit(95, 15, -1, 1) + tic(25, 15, 95, 15, 1) + tic(95, 15, 95, 85, 1) + tic(95, 85, 25, 85, 1) + tic(25, 85, 25, 15, 1), 'carré', '#2E9C6A'),
  rectangle: fig(poly([[8, 25], [112, 25], [112, 80], [8, 80]]) + droit(8, 80, 1, -1) + droit(112, 25, -1, 1), 'rectangle', '#B8962E'),
  losange: fig(poly([[60, 8], [105, 50], [60, 92], [15, 50]]) + tic(60, 8, 105, 50, 1) + tic(105, 50, 60, 92, 1) + tic(60, 92, 15, 50, 1) + tic(15, 50, 60, 8, 1), 'losange', '#9E1F5E'),
  trapeze: fig(poly([[35, 22], [85, 22], [110, 80], [10, 80]]), 'trapèze', '#2EA8C9'),
  trapR: fig(poly([[15, 22], [70, 22], [108, 80], [15, 80]]) + droit(15, 80, 1, -1) + droit(15, 22, 1, 1), 'trapèze rectangle', '#7A4FC0'),
  penta: fig(poly([[60, 8], [106, 42], [88, 92], [32, 92], [14, 42]]), 'pentagone', '#2E9C6A'),
  hexa: fig(poly([[35, 10], [85, 10], [110, 50], [85, 90], [35, 90], [10, 50]]), 'hexagone', '#E35D3A'),
};
cm1Chapitre({
  niveau: 'cm2', titre: 'Figures planes', slug: 'figures-planes',
  cours: `
${cm1Lecon(1, 'Polygones et codages')}
${cm1Def('Un <b>polygone</b> est une figure fermée formée de segments : ses <b>côtés</b>. Les extrémités des côtés sont les <b>sommets</b>. Un polygone à 3 côtés est un <b>triangle</b>, à 4 côtés un <b>quadrilatère</b>, à 5 côtés un <b>pentagone</b>, à 6 côtés un <b>hexagone</b>.')}
${cm1Rem('Codages : des <b>petits traits identiques</b> sur des côtés signifient que ces côtés ont la même longueur ; un <b>petit carré</b> indique un angle droit. On nomme un polygone en lisant ses sommets dans l\'ordre : le quadrilatère ABCD a pour côtés [AB], [BC], [CD] et [DA], et pour diagonales [AC] et [BD].')}
${ce2AnimPolygone('c2-fp-poly', {})}

${cm1Lecon(2, 'Les triangles particuliers')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">${FIGS.rect}${FIGS.iso}${FIGS.equi}</div>
${cm1Def('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Un <b>triangle rectangle</b> a un angle droit.</li><li>Un <b>triangle isocèle</b> a deux côtés de même longueur (et deux angles égaux).</li><li>Un <b>triangle équilatéral</b> a ses trois côtés de même longueur (et ses trois angles égaux).</li></ul>')}

${cm1Lecon(3, 'Les quadrilatères particuliers')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">${FIGS.carre}${FIGS.rectangle}${FIGS.losange}${FIGS.trapeze}${FIGS.trapR}</div>
${cm1Tableau(['Figure', 'Côtés', 'Angles', 'Côtés opposés'], [
  ['<b>Rectangle</b>', 'côtés opposés de même longueur', '4 angles droits', 'parallèles'],
  ['<b>Losange</b>', '4 côtés de même longueur', 'angles opposés égaux', 'parallèles'],
  ['<b>Carré</b>', '4 côtés de même longueur', '4 angles droits', 'parallèles'],
  ['<b>Trapèze</b>', '—', '—', 'au moins deux côtés parallèles'],
  ['<b>Trapèze rectangle</b>', '—', '2 angles droits', 'deux côtés parallèles'],
])}
${cm1Astuce('Un carré est à la fois un rectangle (4 angles droits) et un losange (4 côtés égaux) !')}

${cm1Lecon(4, 'Pentagones et hexagones')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">${FIGS.penta}${FIGS.hexa}</div>
${cm1Rem('Quand tous les côtés et tous les angles sont égaux, on dit que le polygone est <b>régulier</b> : les nids d\'abeilles sont formés d\'hexagones réguliers.')}
`,
  methode: `
${cm1Demo('c2-fp-tri', 'Construire un triangle connaissant ses trois côtés', 'Construis le triangle ABC tel que le segment [AB] mesure 6 cm, le segment [AC] 4 cm et le segment [BC] 5 cm.')}
${cm1Demo('c2-fp-rect', 'Construire un rectangle', 'Construis le rectangle EFGH tel que le segment [EF] mesure 5 cm et le segment [FG] 3 cm.')}
`,
  demos: [
    ['c2-fp-tri', [
      { expr: 'Je trace le segment [AB] de 6 cm.', note: 'On commence par le côté le plus long, à la règle graduée.' },
      { expr: 'Je trace un arc de cercle de centre A et de rayon 4 cm.', note: 'Le point C est à 4 cm de A : il est sur le cercle de centre A et de rayon 4 cm.' },
      { expr: 'Je trace un arc de cercle de centre B et de rayon 5 cm.', note: 'Le point C est aussi à 5 cm de B.' },
      { expr: 'C est à l\'intersection des deux arcs ; je trace [AC] et [BC].', note: 'On vérifie les longueurs à la règle et on code si besoin.' },
    ]],
    ['c2-fp-rect', [
      { expr: 'Je trace le segment [EF] de 5 cm.', note: 'Premier côté.' },
      { expr: 'Avec l\'équerre, je trace la perpendiculaire à (EF) passant par F, et je place G à 3 cm de F.', note: 'Un rectangle a 4 angles droits.' },
      { expr: 'Je trace la perpendiculaire à (EF) passant par E, et je place H à 3 cm de E.', note: 'Même côté que G.' },
      { expr: 'Je trace le segment [GH] et je vérifie : GH = 5 cm.', note: 'Les côtés opposés d\'un rectangle ont la même longueur. On code les angles droits.' },
    ]],
  ],
  exos: cm1Exos('c2fp', [
    ['Quel triangle a trois côtés de même longueur ? Quel quadrilatère a quatre côtés de même longueur mais pas d\'angle droit ?',
      cm1Redac('Triangle', '', 'Le triangle qui a trois côtés de même longueur est le triangle équilatéral.')
      + cm1Redac('Quadrilatère', '', 'Le quadrilatère qui a quatre côtés de même longueur sans angle droit est le losange.')],
    ['Je suis un quadrilatère avec 4 angles droits et 4 côtés égaux. Qui suis-je ?',
      cm1Redac('Devinette', '', 'Avec 4 angles droits et 4 côtés égaux, c\'est un carré.')],
    ['Je suis un quadrilatère qui a seulement deux côtés parallèles et deux angles droits. Qui suis-je ?',
      cm1Redac('Devinette', '', 'Deux côtés parallèles et deux angles droits : c\'est un trapèze rectangle.')],
    ['Construis un triangle isocèle ABC tel que AB = AC = 5 cm et BC = 4 cm.',
      cm1Redac('Programme de construction', { suite: ['je trace [BC] de 4 cm', 'arc de centre B, rayon 5 cm', 'arc de centre C, rayon 5 cm'] }, 'Le point A est à l\'intersection des deux arcs ; je trace [AB] et [AC] et je code les côtés égaux.')],
    ['Construis un carré de 4,5 cm de côté et trace ses diagonales. Que remarques-tu ?',
      cm1Redac('Diagonales du carré', '', 'Les diagonales ont la même longueur, se coupent en leur milieu et sont perpendiculaires.')],
    ['Combien de côtés a un hexagone ? un pentagone ? Dessine-en un de chaque.',
      cm1Redac('Nombre de côtés', '', 'Un hexagone a 6 côtés et un pentagone a 5 côtés.')],
    ['Vrai ou faux ? « Un rectangle est un losange. » « Un carré est un rectangle. »',
      cm1Redac('Un rectangle est un losange', '', 'C\'est faux : ses côtés ne sont pas tous égaux, sauf si c\'est un carré.')
      + cm1Redac('Un carré est un rectangle', '', 'C\'est vrai : un carré a 4 angles droits.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les pavages de l\'Alhambra', [
    'Au palais de l\'<b>Alhambra</b>, à Grenade en Espagne, construit au XIV<sup>e</sup> siècle, les murs sont couverts de mosaïques faites de triangles, de carrés, d\'hexagones et d\'étoiles qui s\'emboîtent sans laisser de trou.',
    'Ces pavages ont inspiré, 600 ans plus tard, l\'artiste néerlandais <b>M. C. Escher</b>, célèbre pour ses dessins où des oiseaux ou des poissons s\'emboîtent parfaitement.',
  ]),
  quiz: [
    { q: 'Un triangle avec un angle droit est…', opts: ['isocèle', 'rectangle', 'équilatéral'], correct: 1 },
    { q: 'Combien de côtés a un hexagone ?', opts: ['5', '6', '8'], correct: 1 },
    { q: 'Quelle figure a 4 côtés égaux et 4 angles droits ?', opts: ['le losange', 'le rectangle', 'le carré'], correct: 2 },
  ],
});
})();

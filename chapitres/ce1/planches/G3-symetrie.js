/* CE1 · Planches : La symétrie (G3). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
function symQ(nc, nr, pts, v, image, px){ const c = 22; let s = '';
  for(let i = 0; i <= nc; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + nr * c}" stroke="#D5DBE3"/>`;
  for(let j = 0; j <= nr; j++) s += `<line x1="4" y1="${4 + j * c}" x2="${4 + nc * c}" y2="${4 + j * c}" stroke="#D5DBE3"/>`;
  const poly = (L, col) => `<polygon points="${L.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ')}" fill="${col}" fill-opacity=".3" stroke="${col}" stroke-width="2.5"/>`;
  s += poly(pts, CE2C.vert) + (image ? poly(pts.map(([x, y]) => [2 * v - x, y]), CE2C.violet) : '');
  s += `<line x1="${4 + v * c}" y1="0" x2="${4 + v * c}" y2="${8 + nr * c}" stroke="${CE2C.rouge}" stroke-width="2.5" stroke-dasharray="7 5"/>`;
  return cpSvg(nc * c + 8, nr * c + 8, s, px || 200); }
const lettre = (L, axe) => `<span style="font:700 2.2rem 'Space Grotesk',sans-serif;padding:0 6px;${axe ? 'border-bottom:0;' : ''}">${L}</span>`;
PLANCHES['ce1|La symétrie'] = [
  { titre: 'Reconnaître un axe de symétrie', duree: '20 min',
    attendus: ['Reconnaître si une figure a un axe de symétrie'],
    exos: [
      { etoiles: 1, consigne: 'Entoure les lettres qui ont un axe de symétrie.', ...PCP.entoure([['A', 1], ['F', 0], ['H', 1], ['R', 0], ['T', 1], ['G', 0]].map(([l, ok]) => [lettre(l), !!ok]), 6) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Le carré a un axe de symétrie.', 'vrai', 'vrai · faux'], ['Le cercle n\'a aucun axe de symétrie.', 'faux', 'vrai · faux']]) },
    ] },
  { titre: 'Compléter par symétrie', duree: '25 min',
    attendus: ['Compléter une figure par symétrie sur quadrillage'],
    exos: [
      { etoiles: 1, consigne: 'Complète la figure pour que la ligne rouge soit un axe de symétrie.', eleve: lig(symQ(10, 6, [[5, 1], [5, 5], [2, 5], [4, 3]], 5)), corr: lig(symQ(10, 6, [[5, 1], [5, 5], [2, 5], [4, 3]], 5, true)) },
      { etoiles: 2, consigne: 'Complète la figure.', eleve: lig(symQ(10, 6, [[1, 1], [4, 1], [4, 5], [2, 4]], 5)), corr: lig(symQ(10, 6, [[1, 1], [4, 1], [4, 5], [2, 4]], 5, true)) },
    ] },
  { titre: 'Distances à l\'axe', duree: '15 min',
    attendus: ['Un point et son image sont à la même distance de l\'axe'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un point à 3 carreaux à gauche de l\'axe a son image à @ carreaux à droite.', 3], ['Un point sur l\'axe a son image @.', 'sur lui-même']], 6) },
      { etoiles: 3, cahier: true, consigne: 'Dessine un papillon symétrique sur une feuille quadrillée : trace l\'axe, une aile, puis l\'autre aile en comptant les carreaux.', corr: '<p>Réponses personnelles : chaque sommet de la deuxième aile est à la même distance de l\'axe que le sommet correspondant de la première.</p>' },
    ] },
];
})();

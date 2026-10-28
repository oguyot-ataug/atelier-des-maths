/* CE1 · Planches : Cercle, milieu et points alignés (G3) ; la symétrie en « Pour aller plus loin » (CE2). */
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
const Bd = CPC.bord, Rg = CE2C.rouge, Bl = CE2C.bleu;
const croix = (x, y, nom, dx, dy, c) => `<path d="M${x - 5} ${y - 5} L${x + 5} ${y + 5} M${x - 5} ${y + 5} L${x + 5} ${y - 5}" stroke="${c || Bd}" stroke-width="2.2"/>` + ce2T(x + (dx || 0), y + (dy == null ? -10 : dy), nom, { t: 15, g: 700, c: c || Bd });
const pts = (L, ligne, px) => cpSvg(240, 120, (ligne ? `<line x1="${ligne[0]}" y1="${ligne[1]}" x2="${ligne[2]}" y2="${ligne[3]}" stroke="${Bl}" stroke-width="1.5"/>` : '') + L.map(([x, y, n]) => croix(x, y, n, 0, 22)).join(''), px || 180);
const seg = (L, px, m) => cpSvg(L * 30 + 40, 50, `<line x1="20" y1="28" x2="${20 + L * 30}" y2="28" stroke="${Bd}" stroke-width="2.5"/>` + croix(20, 28, 'A') + croix(20 + L * 30, 28, 'B') + (m ? croix(20 + L * 15, 28, 'M', 0, -10, Rg) : ''), px);
const OA = (d, cercle, px) => cpSvg(200, 180, (cercle ? `<circle cx="100" cy="90" r="${d}" fill="none" stroke="${Bl}" stroke-width="3"/>` : '') + croix(100, 90, 'O', -12, -8) + croix(100 + d, 90, 'A', 12, -8), px || 130);
PLANCHES['ce1|Cercle, milieu et points alignés'] = [
  { titre: 'Points alignés, segments, droites', duree: '20 min',
    attendus: ['Repérer des points alignés avec la règle', 'Distinguer un segment et une droite'],
    exos: [
      { etoiles: 1, consigne: 'Avec ta règle, vérifie : entoure les groupes de trois points alignés.', ...PCP.entoure([[pts([[30, 95, 'A'], [120, 60, 'B'], [210, 25, 'C']]), true], [pts([[30, 60, 'D'], [120, 25, 'E'], [210, 90, 'F']]), false], [pts([[30, 30, 'G'], [120, 60, 'H'], [210, 90, 'I']]), true]], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète avec segment ou droite.', ...P3.rmp([['Un trait droit qui s\'arrête à ses deux bouts : un @.', 'segment'], ['Elle passe par deux points et ne s\'arrête pas : une @.', 'droite']], 5) },
      { etoiles: 2, consigne: 'Place un point C aligné avec A et B, puis un point D qui n\'est pas aligné avec A et B.', eleve: lig(pts([[40, 90, 'A'], [130, 50, 'B']], null, 220)), corr: lig(pts([[40, 90, 'A'], [130, 50, 'B'], [205, 17, 'C'], [190, 100, 'D']], [10, 103, 235, 3], 220)) },
      { etoiles: 2, consigne: 'Trace le segment [AB], puis la droite qui passe par C et D.', eleve: lig(cpSvg(260, 120, croix(30, 30, 'A') + croix(150, 30, 'B') + croix(60, 100, 'C', 0, 22) + croix(200, 80, 'D', 0, 22), 230)), corr: lig(cpSvg(260, 120, `<line x1="30" y1="30" x2="150" y2="30" stroke="${Bd}" stroke-width="2.5"/><line x1="4" y1="106" x2="256" y2="70" stroke="${Bl}" stroke-width="2.5"/>` + croix(30, 30, 'A') + croix(150, 30, 'B') + croix(60, 100, 'C', 0, 22) + croix(200, 80, 'D', 0, 22), 230)) },
    ] },
  { titre: 'Le milieu d\'un segment', duree: '20 min',
    attendus: ['Trouver le milieu d\'un segment par pliage', 'Savoir que le milieu est à la même distance des deux bouts'],
    exos: [
      { etoiles: 1, consigne: 'Plie ta feuille pour amener A sur B. Marque le milieu M du segment.', eleve: lig(seg(6, 220)), corr: lig(seg(6, 220, true)) },
      { etoiles: 1, col: 1, consigne: 'M est le milieu de [AB]. Complète.', ...P3.rmp([['[AB] mesure 10 cm : [AM] mesure @ cm.', 5], ['[AB] mesure 6 cm : [MB] mesure @ cm.', 3], ['[AM] mesure 4 cm : [AB] mesure @ cm.', 8]], 2) },
      { etoiles: 2, consigne: 'Le point M est-il le milieu du segment ? Vérifie avec ta règle et entoure.', ...PCP.entoure([[cpSvg(250, 50, `<line x1="20" y1="28" x2="220" y2="28" stroke="${Bd}" stroke-width="2.5"/>` + croix(20, 28, 'A') + croix(220, 28, 'B') + croix(120, 28, 'M', 0, -10, Rg), 200), true], [cpSvg(250, 50, `<line x1="20" y1="28" x2="220" y2="28" stroke="${Bd}" stroke-width="2.5"/>` + croix(20, 28, 'A') + croix(220, 28, 'B') + croix(150, 28, 'M', 0, -10, Rg), 200), false]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Trace un segment de 12 cm. Trouve son milieu par pliage, puis vérifie avec la règle.', corr: cm1Redac('Le milieu', '6 + 6 = 12', 'Le milieu est à 6 cm de chaque bout.') },
    ] },
  { titre: 'Le cercle', duree: '25 min',
    attendus: ['Tracer un cercle au compas', 'Tracer le cercle de centre O passant par A', 'Distinguer cercle et disque'],
    exos: [
      { etoiles: 1, consigne: 'Trace le cercle de centre O qui passe par A.', eleve: plGrille([OA(50), OA(70)], 2), corr: plGrille([OA(50, true), OA(70, true)], 2) },
      { etoiles: 2, consigne: 'Trace un cercle de centre O avec un écartement de 3 cm, puis un autre de même centre avec un écartement de 2 cm.', eleve: lig(cpSvg(200, 180, croix(100, 90, 'O', -12, -8), 160)), corr: lig(cpSvg(200, 180, `<circle cx="100" cy="90" r="75" fill="none" stroke="${Bl}" stroke-width="3"/><circle cx="100" cy="90" r="50" fill="none" stroke="${Rg}" stroke-width="3"/>` + croix(100, 90, 'O', -12, -8), 160)) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le trait rond est un @.', 'cercle'], ['La surface à l\'intérieur est un @.', 'disque'], ['On pique la pointe du compas sur le @.', 'centre']], 5) },
      { etoiles: 3, consigne: 'Reproduis la figure : un carré de 4 carreaux de côté et le cercle dont le centre est au milieu du carré.', eleve: lig(cpQuadFig(6, 6, [[[[1, 1], [5, 1], [5, 5], [1, 5]], '#2EA8C9']], { px: 150 })) + lig(cpQuadFig(6, 6, [], { px: 150 })), corr: lig(cpQuadFig(6, 6, [[[[1, 1], [5, 1], [5, 5], [1, 5]], '#2EA8C9']], { px: 150 })) + lig(R('Le centre du cercle est au milieu du carré, à 2 carreaux de chaque côté : on y pique le compas.')) },
    ] },
  { titre: 'Pour aller plus loin : reconnaître un axe de symétrie', duree: '20 min',
    attendus: ['Reconnaître si une figure a un axe de symétrie'],
    exos: [
      { etoiles: 1, consigne: 'Entoure les lettres qui ont un axe de symétrie.', ...PCP.entoure([['A', 1], ['F', 0], ['H', 1], ['R', 0], ['T', 1], ['G', 0]].map(([l, ok]) => [lettre(l), !!ok]), 6) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Le carré a un axe de symétrie.', 'vrai', 'vrai · faux'], ['Le cercle n\'a aucun axe de symétrie.', 'faux', 'vrai · faux']]) },
      { etoiles: 2, consigne: 'Entoure les lettres qui ont un axe de symétrie.', ...PCP.entoure([['M', 1], ['N', 0], ['O', 1], ['L', 0], ['V', 1], ['S', 0]].map(([l, ok]) => [lettre(l), !!ok]), 6) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Le rectangle a un axe de symétrie.', 'vrai', 'vrai · faux'], ['La lettre E a un axe de symétrie.', 'vrai', 'vrai · faux'], ['La lettre P a un axe de symétrie.', 'faux', 'vrai · faux']]) },
      { etoiles: 2, consigne: 'Trace en rouge l\'axe de symétrie de chaque figure.',
        eleve: plGrille([cpQuadFig(6, 6, [[[[1, 5], [1, 2], [3, 0], [5, 2], [5, 5]], '#2E9C6A']], { px: 120 }), cpQuadFig(6, 6, [[[[0, 2], [3, 2], [3, 1], [5, 3], [3, 5], [3, 4], [0, 4]], '#2EA8C9']], { px: 120 }), cpQuadFig(6, 6, [[[[1, 1], [5, 1], [4, 5], [2, 5]], '#E9C46A']], { px: 120 })], 3),
        corr: plGrille([cpQuadFig(6, 6, [[[[1, 5], [1, 2], [3, 0], [5, 2], [5, 5]], '#2E9C6A'], [[[3, 0], [3, 6]], CE2C.rouge, false]], { px: 120 }), cpQuadFig(6, 6, [[[[0, 2], [3, 2], [3, 1], [5, 3], [3, 5], [3, 4], [0, 4]], '#2EA8C9'], [[[0, 3], [6, 3]], CE2C.rouge, false]], { px: 120 }), cpQuadFig(6, 6, [[[[1, 1], [5, 1], [4, 5], [2, 5]], '#E9C46A'], [[[3, 0], [3, 6]], CE2C.rouge, false]], { px: 120 })], 3) },
      { etoiles: 3, col: 1, consigne: 'Combien d\'axes de symétrie ?', ...P3.rmp([['le carré : @', 4], ['le rectangle : @', 2], ['la lettre H : @', 2]], 2) },
    ] },
  { titre: 'Pour aller plus loin : compléter par symétrie', duree: '25 min',
    attendus: ['Compléter une figure par symétrie sur quadrillage'],
    exos: [
      { etoiles: 1, consigne: 'Complète la figure pour que la ligne rouge soit un axe de symétrie.', eleve: lig(symQ(10, 6, [[5, 1], [5, 5], [2, 5], [4, 3]], 5)), corr: lig(symQ(10, 6, [[5, 1], [5, 5], [2, 5], [4, 3]], 5, true)) },
      { etoiles: 2, consigne: 'Complète la figure.', eleve: lig(symQ(10, 6, [[1, 1], [4, 1], [4, 5], [2, 4]], 5)), corr: lig(symQ(10, 6, [[1, 1], [4, 1], [4, 5], [2, 4]], 5, true)) },
      { etoiles: 2, consigne: 'Complète la figure.', eleve: lig(symQ(10, 6, [[3, 1], [5, 1], [5, 4], [3, 5], [1, 3]], 5)), corr: lig(symQ(10, 6, [[3, 1], [5, 1], [5, 4], [3, 5], [1, 3]], 5, true)) },
      { etoiles: 3, consigne: 'Complète la figure.', eleve: lig(symQ(12, 6, [[2, 2], [4, 1], [6, 3], [4, 5]], 6)), corr: lig(symQ(12, 6, [[2, 2], [4, 1], [6, 3], [4, 5]], 6, true)) },
    ] },
  { titre: 'Pour aller plus loin : distances à l\'axe', duree: '15 min',
    attendus: ['Un point et son image sont à la même distance de l\'axe'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un point à 3 carreaux à gauche de l\'axe a son image à @ carreaux à droite.', 3], ['Un point sur l\'axe a son image @.', 'sur lui-même']], 6) },
      { etoiles: 3, cahier: true, consigne: 'Dessine un papillon symétrique sur une feuille quadrillée : trace l\'axe, une aile, puis l\'autre aile en comptant les carreaux.', corr: '<p>Réponses personnelles : chaque sommet de la deuxième aile est à la même distance de l\'axe que le sommet correspondant de la première.</p>' },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Un point à 2 carreaux à droite de l\'axe a son image à @ carreaux à gauche.', 2], ['Un point à 5 carreaux de l\'axe a son image à @ carreaux de l\'axe.', 5]], 2) },
      { etoiles: 2, consigne: 'Complète la figure en comptant les carreaux.', eleve: lig(symQ(10, 5, [[2, 1], [5, 1], [5, 2], [3, 4]], 5)), corr: lig(symQ(10, 5, [[2, 1], [5, 1], [5, 2], [3, 4]], 5, true)) },
      { etoiles: 3, consigne: 'Complète la figure.', eleve: lig(symQ(10, 5, [[1, 2], [3, 0], [5, 0], [5, 5], [3, 5]], 5)), corr: lig(symQ(10, 5, [[1, 2], [3, 0], [5, 0], [5, 5], [3, 5]], 5, true)) },
    ] },
];
})();

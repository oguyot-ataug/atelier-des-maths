/* ============================================================
   CM2 · Planches : Solides et repérage dans l'espace (G5)
   Décrire les solides (faces, arêtes, sommets) ; patrons du cube et du pavé ; assemblages de
   cubes ; décrire et suivre un chemin sur quadrillage.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 5), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS;
const { K, RO, VE, svg, L, P, X, Q, carte, cubes } = CM2G;
const s110 = g => DS.fig(110, 95, g, 100);
const SOL = [
  ['cube', s110(DS.pave(20, 85, 55, 55, 22, 18))],
  ['pavé droit', s110(DS.pave(10, 80, 70, 40, 22, 18))],
  ['pyramide', s110(DS.pyramide(52, 80, 60, 26, 65))],
  ['cylindre', s110(DS.cylindre(55, 82, 28, 60))],
  ['cône', s110(DS.cone(55, 82, 30, 68))],
  ['boule', s110(DS.boule(55, 48, 36))],
];
// Patrons : six carrés (en carreaux).
const NETS = [
  [[[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]], 'oui'],
  [[[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [1, 0]], 'non'],
  [[[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]], 'oui'],
  [[[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 0]], 'non'],
  [[[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]], 'oui'],
  [[[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [3, 2]], 'oui'],
];
const net = c => cm1Quad(5, 3, c, { k: 18, contour: true, c: '#F6C343' });
const croix = cm1Quad(4, 3, [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [1, 2]], { k: 26, contour: true, c: '#CDEAF6', textes: [[0.5, 1.5, '1'], [1.5, 1.5, '2'], [2.5, 1.5, '3'], [3.5, 1.5, '4'], [1.5, 0.5, '5'], [1.5, 2.5, '6']] });
const pave = DS.fig(210, 118, DS.pave(45, 102, 100, 75, 35, 25) + DS.tx([95, 116], '4 cm') + DS.tx([168, 100], '2 cm', { a: 'start' }) + DS.tx([39, 68], '3 cm', { a: 'end' }), 170);
// Assemblages de cubes (aucun cube caché : chaque cube du haut repose sur un cube).
const ASS = [
  [[[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]], 4],
  [[[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1]], 6],
  [[[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0], [2, 1, 0], [0, 0, 1], [0, 0, 2]], 8],
];
// Chemin sur quadrillage : départ D, flèches.
const CODE = ['→', '→', '→', '↑', '↑', '←', '↑', '↑', '→', '→'];
const chemin = (code, sol, dep) => { const pts = [dep]; code.forEach(c => { const [x, y] = pts[pts.length - 1]; pts.push(c === '→' ? [x + 1, y] : c === '←' ? [x - 1, y] : c === '↑' ? [x, y - 1] : [x, y + 1]); });
  return Q(9, 7, 22, g => (sol ? P(pts.map(p => g(p[0] + .5, p[1] + .5)), VE, 2.6, 'none', false) + X(g(pts.at(-1)[0] + .5, pts.at(-1)[1] + .5), 'A', [11, 4], VE) : '')
    + `<circle cx="${g(dep[0] + .5, dep[1] + .5)[0]}" cy="${g(dep[0] + .5, dep[1] + .5)[1]}" r="6" fill="${RO}"/>` + cmT(g(dep[0] + .5, dep[1] + .5)[0] - 15, g(dep[0] + .5, dep[1] + .5)[1] + 4, 'D', { fs: 12, c: RO }), 200); };
const CODE2 = ['↑', '↑', '→', '→', '→', '↓', '→', '→'];
PLANCHES['cm2|Solides et repérage dans l\'espace'] = [
  { titre: 'Décrire les solides', duree: '30 min',
    attendus: ['Reconnaître et nommer les solides usuels', 'Compter les faces, les arêtes et les sommets', 'Distinguer polyèdres et solides qui roulent'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nom de chaque solide.',
        eleve: plGrille(SOL.map(([, f]) => carte(f, B())), 3), corr: plGrille(SOL.map(([n, f]) => carte(f, R(n))), 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un cube a @ faces, @ arêtes et @ sommets.', 6, 12, 8], ['Un pavé droit a @ faces, @ arêtes et @ sommets.', 6, 12, 8], ['Une pyramide à base carrée a @ faces, @ arêtes et @ sommets.', 5, 8, 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Toutes les faces d\'un cube sont des carrés.', 'vrai'], ['Un cylindre a seulement des faces planes.', 'faux'], ['Les faces d\'un pavé droit sont des rectangles.', 'vrai'], ['Une boule n\'a aucune arête.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'On veut coller un ruban sur toutes les arêtes d\'un cube de 5 cm d\'arête. Quelle longueur de ruban faut-il ?',
        corr: cm1Redac('Longueur de ruban', '12 × 5 = 60', 'Un cube a 12 arêtes de 5 cm : il faut 60 cm de ruban.') },
    ] },
  { titre: 'Patrons du cube et du pavé', duree: '35 min',
    attendus: ['Reconnaître un patron de cube', 'Repérer les faces opposées sur un patron', 'Associer les faces d\'un pavé à ses dimensions'],
    exos: [
      { etoiles: 2, consigne: 'Ces figures sont-elles des patrons de cube ? Imagine le pliage, puis entoure.',
        eleve: plGrille(NETS.map(([c]) => carte(net(c), '<b>oui · non</b>')), 3), corr: plGrille(NETS.map(([c, r]) => carte(net(c), plEntoure(r))), 3) },
      { etoiles: 2, col: 1, consigne: `On plie ce patron pour former un cube.<div style="text-align:center;">${croix}</div>`,
        ...rmp([['La face opposée à la face 1 est la face @.', 3], ['La face opposée à la face 2 est la face @.', 4], ['La face opposée à la face 5 est la face @.', 6]], 2) },
      { etoiles: 3, col: 1, consigne: `Observe ce pavé droit.<div style="text-align:center;">${pave}</div>`,
        ...rmp([['@ faces mesurent 4 cm sur 3 cm.', 2], ['@ faces mesurent 4 cm sur 2 cm.', 2], ['@ faces mesurent 3 cm sur 2 cm.', 2]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Un patron de cube a @ faces carrées.', 6], ['Un patron de pavé a @ faces rectangulaires.', 6]], 2) },
      { etoiles: 2, col: 1, consigne: 'Est-ce un patron de cube ? Entoure.', ...P3.chx([['6 carrés en croix', 'oui', 'oui · non'], ['6 carrés en ligne', 'non', 'oui · non']]) },
    ] },
  { titre: 'Assemblages de cubes et chemins', duree: '35 min',
    attendus: ['Compter les cubes d\'un assemblage', 'Suivre un chemin codé', 'Coder un chemin avec des flèches'],
    exos: [
      { etoiles: 1, consigne: 'Combien de petits cubes forment chaque assemblage ? (Chaque cube du haut repose sur un cube.)',
        eleve: plGrille(ASS.map(([l]) => carte(cubes(l, 22, 120), `${B(2)} cubes`)), 3), corr: plGrille(ASS.map(([l, n]) => carte(cubes(l, 22, 120), `${R(n)} cubes`)), 3) },
      { etoiles: 2, col: 1, consigne: `Pars de D et suis le chemin : ${CODE.join(' ')}. Trace-le et marque l\'arrivée A.`, eleve: chemin(CODE, false, [2, 6]), corr: chemin(CODE, true, [2, 6]) },
      { etoiles: 3, col: 1, consigne: 'Écris avec des flèches le chemin vert qui va de D à A.',
        eleve: chemin(CODE2, true, [1, 5]) + `<div>${B(14)}</div>`, corr: chemin(CODE2, true, [1, 5]) + `<div>${R(CODE2.join(' '))}</div>` },
      { etoiles: 1, col: 1, consigne: 'Combien de petits cubes ?', ...P3.rmp([['un mur de 3 rangées de 4 cubes : @', 12], ['un pavé de 2 sur 3 sur 4 cubes : @', 24]], 2) },
      { etoiles: 2, col: 1, consigne: 'Combien de petits cubes ?', ...P3.rmp([['un cube de 3 cubes de côté : @', 27], ['le même, sans les cubes de la couche du haut : @', 18]], 2) },
    ] },
];
})();

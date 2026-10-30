/* CP · Planches : Comparer des masses (M5). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
function balance(g, d, sens, px){ const p = 10 * sens;
  const plateau = (x, y, nom, c) => `<line x1="${x - 24}" y1="${y + 38}" x2="${x}" y2="${y}" stroke="${CPC.bord}"/><line x1="${x + 24}" y1="${y + 38}" x2="${x}" y2="${y}" stroke="${CPC.bord}"/><rect x="${x - 22}" y="${y + 16}" width="44" height="22" rx="5" fill="${c}" stroke="${CPC.bord}"/>${ce2T(x, y + 31, nom, { t: 10, c: '#fff', g: 700 })}<path d="M${x - 38} ${y + 38} H${x + 38} L${x + 30} ${y + 46} H${x - 30} Z" fill="#C9CBCF" stroke="${CPC.bord}"/>`;
  return cpSvg(260, 150, `<path d="M110 145 H150 L140 130 H120 Z" fill="#8A6D1F"/><line x1="130" y1="130" x2="130" y2="30" stroke="#8A6D1F" stroke-width="5"/>` + plateau(60, 30 + p, g, '#7A4FC0') + plateau(200, 30 - p, d, '#2E9C6A') + `<line x1="60" y1="${30 + p}" x2="200" y2="${30 - p}" stroke="#8A6D1F" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="30" r="5" fill="${CPC.bord}"/>`, px || 170); }
PLANCHES['cp|Comparer des masses'] = [
  { titre: 'Lire une balance', duree: '20 min',
    attendus: ['Comparer deux masses avec une balance à plateaux'],
    exos: [
      { etoiles: 1, consigne: 'Entoure l\'objet le plus lourd.',
        eleve: plGrille([balance('livre', 'gomme', 1) + '<br><b>livre · gomme</b>', balance('pomme', 'melon', -1) + '<br><b>pomme · melon</b>'], 2),
        corr: plGrille([balance('livre', 'gomme', 1) + '<br>' + plEntoure('livre'), balance('pomme', 'melon', -1) + '<br>' + plEntoure('melon')], 2) },
      { etoiles: 2, consigne: 'Que peux-tu dire ? Entoure.',
        eleve: lig(balance('A', 'B', 0)) + lig('<b>A est plus lourd · B est plus lourd · A et B pèsent autant</b>'),
        corr: lig(balance('A', 'B', 0)) + lig(plEntoure('A et B pèsent autant')) },
      { etoiles: 1, consigne: 'Entoure l\'objet le plus léger.',
        eleve: plGrille([balance('crayon', 'trousse', -1) + '<br><b>crayon · trousse</b>', balance('cahier', 'gomme', 1) + '<br><b>cahier · gomme</b>'], 2),
        corr: plGrille([balance('crayon', 'trousse', -1) + '<br>' + plEntoure('crayon'), balance('cahier', 'gomme', 1) + '<br>' + plEntoure('gomme')], 2) },
      { etoiles: 2, consigne: 'Complète en entourant.',
        ...P3.chx([['Le plateau le plus bas porte l\'objet le plus…', 'lourd', 'lourd · léger'], ['Le plateau le plus haut porte l\'objet le plus…', 'léger', 'lourd · léger'], ['Les plateaux sont au même niveau : les objets…', 'pèsent autant', 'pèsent autant · sont différents'], ['Une plume et un livre : le plus lourd est…', 'le livre', 'la plume · le livre']]) },
    ] },
  { titre: 'Ranger des objets', duree: '20 min',
    attendus: ['Ranger des objets selon leur masse'],
    exos: [
      { etoiles: 2, consigne: 'Le chat est plus lourd que le lapin. Le chien est plus lourd que le chat. Range du plus léger au plus lourd.',
        ...P3.rmp([['@', 'le lapin, le chat, le chien']], 16) },
      { etoiles: 3, consigne: 'Le plus gros est-il toujours le plus lourd ? Entoure.',
        eleve: lig(balance('ballon', 'bille', -1)) + lig('<b>oui · non</b>'), corr: lig(balance('ballon', 'bille', -1)) + lig(plEntoure('non') + ' : la petite bille est plus lourde que le gros ballon.') },
      { etoiles: 2, consigne: 'Regarde les deux balances. Complète.',
        eleve: plGrille([balance('A', 'B', 1), balance('B', 'C', 1)], 2) + plListe(['Le plus lourd : ' + B(2), 'Le plus léger : ' + B(2)]),
        corr: plGrille([balance('A', 'B', 1), balance('B', 'C', 1)], 2) + plListe(['Le plus lourd : ' + R('A'), 'Le plus léger : ' + R('C')]) },
      { etoiles: 1, col: 1, consigne: 'Lourd ou léger ? Entoure.',
        ...P3.chx([['un éléphant', 'lourd', 'lourd · léger'], ['une plume', 'léger', 'lourd · léger'], ['une voiture', 'lourd', 'lourd · léger'], ['une feuille', 'léger', 'lourd · léger']]) },
      { etoiles: 2, col: 1, consigne: 'Le melon est plus lourd que la pomme. La pomme est plus lourde que la fraise. Range du plus lourd au plus léger.',
        ...P3.rmp([['@', 'le melon, la pomme, la fraise']], 12) },
    ] },
  { titre: 'Mesurer avec des cubes', duree: '15 min',
    attendus: ['Mesurer une masse avec des objets tous pareils'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['La trousse pèse 8 cubes, le cahier 5 cubes. Le plus lourd : @', 'la trousse'], ['De combien de cubes ? @', 3]], 6) },
      { etoiles: 1, consigne: 'Combien de cubes pèse chaque objet ?',
        ...PCP.compte([[balance('poire', '4 cubes', 0), '4 cubes'], [balance('jouet', '7 cubes', 0), '7 cubes']], 2, 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Le livre pèse 9 cubes, la gomme 2 cubes. Le plus léger : @', 'la gomme'], ['De combien de cubes ? @', 7]], 6) },
      { etoiles: 3, col: 1, consigne: 'La trousse pèse 8 cubes, le cahier 5 cubes, la gomme 2 cubes. Range du plus léger au plus lourd.',
        ...P3.rmp([['@', 'la gomme, le cahier, la trousse']], 12) },
      { etoiles: 3, col: 1, consigne: 'Une pomme pèse 6 cubes. Combien pèsent deux pommes pareilles ?',
        ...P3.rmp([['Deux pommes : @ cubes', 12]], 2) },
      { etoiles: 2, consigne: 'Combien de cubes pèse chaque objet ?',
        ...PCP.compte([[balance('livre', '9 cubes', 0), '9 cubes'], [balance('ballon', '3 cubes', 0), '3 cubes']], 2, 3) },
    ] },
];
})();

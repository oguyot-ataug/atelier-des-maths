/* CP · Planches : Se repérer dans l'espace (G1) -- positions, gauche/droite, quadrillage, codes de flèches. */
(() => {
const { lig, entoure, cadre } = PCP, B = P3.B, R = P3.R;
// Le chat et la table, à une position de CP_POS (0 sur, 1 sous, 2 devant, 3 derrière, 4 à gauche, 5 à droite, 6 près, 7 loin).
const scene = (i, px) => { const P = CP_POS[i];
  return cpSvg(440, 230, `<rect x="0" y="0" width="440" height="120" fill="#F7F3EC"/><rect x="0" y="120" width="440" height="110" fill="#EFE6D6"/>` + (P.derriere ? cpChat(P.x, P.y, P.s) + cpTable : cpTable + cpChat(P.x, P.y, P.s)), px || 150); };
const mots = '<b>sur · sous · devant · derrière</b>';
// Une table seule (pour y dessiner), avec ou sans la balle dessous.
const table = balle => cpSvg(300, 140, `<rect x="0" y="120" width="300" height="20" fill="#EFE6D6"/><rect x="70" y="40" width="160" height="12" rx="3" fill="#B07A45" stroke="#6B4423" stroke-width="2"/><rect x="82" y="52" width="10" height="68" fill="#B07A45" stroke="#6B4423"/><rect x="208" y="52" width="10" height="68" fill="#B07A45" stroke="#6B4423"/>` + (balle ? '<circle cx="150" cy="106" r="14" fill="#E35D3A" stroke="#1F3A5C"/>' : ''), 220);
const ronds = cpSvg(200, 44, ['#E35D3A', '#2EA8C9', '#2E9C6A', '#F5B700'].map((c, i) => `<circle cx="${24 + i * 50}" cy="22" r="17" fill="${c}" stroke="#1F3A5C" stroke-width="1.5"/>`).join(''), 160);
PLANCHES['cp|Se repérer dans l\'espace'] = [
  { titre: 'Où est le chat ?', duree: '20 min',
    attendus: ['Situer un objet par rapport à un autre', 'Utiliser le vocabulaire : sur, sous, devant, derrière, à gauche, à droite, près, loin'],
    exos: [
      { etoiles: 1, consigne: 'Où est le chat ? Entoure le bon mot.',
        eleve: plGrille([scene(0) + '<br>' + mots, scene(1) + '<br>' + mots, scene(3) + '<br>' + mots], 3),
        corr: plGrille([scene(0) + '<br>' + plEntoure('sur'), scene(1) + '<br>' + plEntoure('sous'), scene(3) + '<br>' + plEntoure('derrière')], 3) },
      { etoiles: 2, consigne: 'Le chat est-il à gauche ou à droite de la table ? Entoure.',
        eleve: plGrille([scene(4) + '<br><b>à gauche · à droite</b>', scene(5) + '<br><b>à gauche · à droite</b>'], 2),
        corr: plGrille([scene(4) + '<br>' + plEntoure('à gauche'), scene(5) + '<br>' + plEntoure('à droite')], 2) },
      { etoiles: 2, consigne: 'Dessine une balle sous la table.',
        eleve: lig(table(false)), corr: lig(table(true)) },
    ] },
  { titre: 'Gauche, droite, entre', duree: '20 min',
    attendus: ['Distinguer sa gauche et sa droite', 'Situer un objet entre deux autres, dans une file'],
    exos: [
      { etoiles: 1, consigne: 'L\'enfant est vu de dos. Quelle main lève-t-il ? Entoure.',
        eleve: lig(cpGaucheDroite({ px: 120 })) + lig('<b>sa main gauche · sa main droite</b>'),
        corr: lig(cpGaucheDroite({ px: 120 })) + lig(plEntoure('sa main gauche')) },
      { etoiles: 2, col: 1, consigne: `Regarde la file de ronds : rouge, bleu, vert, jaune. Complète.${lig(ronds)}`,
        ...P3.rmp([['Le rond bleu est entre le rouge et le @.', 'vert'], ['Le rond tout à gauche est le @.', 'rouge'], ['Le rond tout à droite est le @.', 'jaune']], 6) },
      { etoiles: 2, col: 1, consigne: 'Colorie : la case de gauche en rouge, la case de droite en bleu, la case du milieu en vert.',
        eleve: lig(cpSvg(170, 54, [0, 1, 2].map(i => `<rect x="${4 + i * 54}" y="4" width="50" height="46" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`).join(''), 150)),
        corr: lig(cpSvg(170, 54, ['#E35D3A', '#2E9C6A', '#2EA8C9'].map((c, i) => `<rect x="${4 + i * 54}" y="4" width="50" height="46" fill="${c}" stroke="${CPC.bord}" stroke-width="2"/>`).join(''), 150)) },
    ] },
  { titre: 'Sur un quadrillage', duree: '25 min',
    attendus: ['Repérer des cases voisines sur un quadrillage', 'Coder et décoder un déplacement avec des flèches'],
    exos: [
      { etoiles: 1, consigne: 'Que veut dire chaque flèche ? Relie ou écris : haut, bas, gauche, droite.',
        eleve: plGrille([cpFleche('h') + ' ' + B(4), cpFleche('d') + ' ' + B(4), cpFleche('b') + ' ' + B(4), cpFleche('g') + ' ' + B(4)], 4),
        corr: plGrille([cpFleche('h') + ' ' + R('en haut'), cpFleche('d') + ' ' + R('à droite'), cpFleche('b') + ' ' + R('en bas'), cpFleche('g') + ' ' + R('à gauche')], 4) },
      { etoiles: 2, consigne: `La souris suit le code ${cpCode('ddhd')}. Dessine son chemin et colorie la case d'arrivée.`,
        eleve: lig(cpQuad(5, 3, [['souris', 0, 2]], { px: 200 })),
        corr: lig(cpQuad(5, 3, [['souris', 3, 1]], { chemin: cpSuivre([0, 2], 'ddhd'), colorie: [[3, 1]], px: 200 })) },
      { etoiles: 3, consigne: 'Écris un code de flèches pour amener la souris au fromage.',
        eleve: lig(cpQuad(5, 3, [['souris', 0, 0], ['fromage', 3, 2]], { px: 200 })) + lig(cadre(40)),
        corr: lig(cpQuad(5, 3, [['souris', 0, 0], ['fromage', 3, 2]], { chemin: cpSuivre([0, 0], 'dddbb'), px: 200 })) + lig(cpCode('dddbb')) + '<p style="text-align:center;">D\'autres codes sont justes, par exemple deux en bas puis trois à droite.</p>' },
    ] },
];
})();

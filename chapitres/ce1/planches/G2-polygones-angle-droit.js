/* CE1 · Planches : Polygones et angle droit (G2). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
const poly = (pts, c, droits, px) => { let s = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${c}" fill-opacity=".3" stroke="${CPC.bord}" stroke-width="2.2"/>`;
  (droits || []).forEach(i => { const n = pts.length, S = pts[i], A = pts[(i + n - 1) % n], Bp = pts[(i + 1) % n], e = 10, ua = [A[0] - S[0], A[1] - S[1]], ub = [Bp[0] - S[0], Bp[1] - S[1]], la = Math.hypot(...ua), lb = Math.hypot(...ub);
    const P1 = [S[0] + ua[0] / la * e, S[1] + ua[1] / la * e], P2 = [S[0] + ub[0] / lb * e, S[1] + ub[1] / lb * e];
    s += `<path d="M${P1[0]} ${P1[1]} L${P1[0] + ub[0] / lb * e} ${P1[1] + ub[1] / lb * e} L${P2[0]} ${P2[1]}" fill="none" stroke="${CE2C.rouge}" stroke-width="1.8"/>`; });
  return cpSvg(120, 100, s, px || 80); };
const F = { tri: [[60, 10], [110, 88], [10, 88]], carre: [[25, 15], [95, 15], [95, 85], [25, 85]], rect: [[8, 25], [112, 25], [112, 80], [8, 80]], penta: [[60, 8], [110, 42], [92, 92], [28, 92], [10, 42]], hexa: [[35, 10], [85, 10], [112, 50], [85, 90], [35, 90], [8, 50]], quad: [[15, 20], [100, 10], [110, 85], [30, 80]], triR: [[20, 85], [20, 15], [100, 85]] };
PLANCHES['ce1|Polygones et angle droit'] = [
  { titre: 'Les polygones', duree: '20 min',
    attendus: ['Reconnaître et nommer des polygones', 'Compter les côtés et les sommets'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre de côtés et le nom du polygone.',
        eleve: plGrille([poly(F.tri, '#E9C46A') + B(8), poly(F.penta, '#7A4FC0') + B(8), poly(F.hexa, '#2E9C6A') + B(8)], 3),
        corr: plGrille([poly(F.tri, '#E9C46A') + R('3 : triangle'), poly(F.penta, '#7A4FC0') + R('5 : pentagone'), poly(F.hexa, '#2E9C6A') + R('6 : hexagone')], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un quadrilatère a @ côtés.', 4], ['Un hexagone a @ sommets.', 6], ['Un polygone à 5 côtés : un @.', 'pentagone']], 5) },
      { etoiles: 1, consigne: 'Entoure les polygones.',
        ...PCP.entoure([[poly(F.quad, '#2EA8C9'), true], [cpSvg(120, 100, '<circle cx="60" cy="50" r="40" fill="#E35D3A" fill-opacity=".3" stroke="#1F3A5C" stroke-width="2.2"/>', 80), false], [poly(F.penta, '#7A4FC0'), true], [cpSvg(120, 100, '<polyline points="10,80 40,15 80,85 110,20" fill="none" stroke="#1F3A5C" stroke-width="2.2"/>', 80), false], [poly(F.triR, '#E9C46A'), true]], 5) },
      { etoiles: 2, col: 1, consigne: 'Combien de sommets ?', ...P3.rmp([['un triangle : @', 3], ['un rectangle : @', 4], ['un pentagone : @', 5], ['un hexagone : @', 6]], 2) },
      { etoiles: 2, col: 1, consigne: 'Dessine un polygone à 4 côtés. Comment s\'appelle-t-il ?', eleve: cadre(70) + lig(B(8)), corr: lig(poly(F.quad, '#2EA8C9')) + lig(R('un quadrilatère')) },
    ] },
  { titre: 'L\'angle droit', duree: '25 min',
    attendus: ['Repérer les angles droits avec un gabarit ou une équerre', 'Coder un angle droit'],
    exos: [
      { etoiles: 1, consigne: 'Avec ton équerre, code les angles droits (petit carré). Combien y en a-t-il ?',
        eleve: plGrille([poly(F.rect, '#2E9C6A') + B(2), poly(F.triR, '#E35D3A') + B(2), poly(F.quad, '#2EA8C9') + B(2)], 3),
        corr: plGrille([poly(F.rect, '#2E9C6A', [0, 1, 2, 3]) + R(4), poly(F.triR, '#E35D3A', [0]) + R(1), poly(F.quad, '#2EA8C9') + R(0)], 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Le carré a 4 angles droits.', 'vrai', 'vrai · faux'], ['Un triangle peut avoir un angle droit.', 'vrai', 'vrai · faux'], ['Le rectangle a 2 angles droits.', 'faux', 'vrai · faux']]) },
      { etoiles: 2, consigne: 'Code les angles droits. Combien y en a-t-il ?',
        eleve: plGrille([poly(F.carre, '#2EA8C9') + B(2), poly(F.tri, '#E9C46A') + B(2), poly(F.hexa, '#2E9C6A') + B(2)], 3),
        corr: plGrille([poly(F.carre, '#2EA8C9', [0, 1, 2, 3]) + R(4), poly(F.tri, '#E9C46A') + R(0), poly(F.hexa, '#2E9C6A') + R(0)], 3) },
      { etoiles: 1, col: 1, consigne: 'Combien d\'angles droits ?', ...P3.rmp([['un carré : @', 4], ['un rectangle : @', 4], ['un triangle rectangle : @', 1]], 2) },
      { etoiles: 3, col: 1, consigne: 'Trace un angle droit avec ton équerre et code-le.', eleve: cadre(70), corr: lig(cpSvg(100, 80, `<path d="M15 10 V70 H90" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/><path d="M15 58 H27 V70" fill="none" stroke="${CE2C.rouge}" stroke-width="1.8"/>`, 90)) },
      { etoiles: 2, col: 1, consigne: 'Entoure les objets qui ont des angles droits.', ...P3.chx([['une feuille de cahier', 'oui', 'oui · non'], ['une assiette', 'non', 'oui · non'], ['une porte', 'oui', 'oui · non']]) },
    ] },
  { titre: 'Carré et rectangle sur quadrillage', duree: '25 min',
    attendus: ['Tracer un carré et un rectangle sur quadrillage'],
    exos: [
      { etoiles: 2, consigne: 'Trace un carré de 3 carreaux de côté et un rectangle de 5 carreaux sur 2.', eleve: lig(cpQuadFig(12, 5, [], { px: 300 })), corr: lig(cpQuadFig(12, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9'], [[[6, 1], [11, 1], [11, 3], [6, 3]], '#2E9C6A']], { px: 300 })) },
      { etoiles: 3, cahier: true, consigne: 'Je suis un quadrilatère. J\'ai 4 angles droits mais mes 4 côtés n\'ont pas tous la même longueur. Qui suis-je ?', corr: cm1Redac('Devinette', '', 'Je suis un rectangle.') },
      { etoiles: 2, consigne: 'Termine le rectangle et le carré.',
        eleve: lig(cpQuadFig(12, 5, [[[[1, 1], [6, 1], [6, 3]], CPC.bord, false], [[[8, 1], [8, 4]], CPC.bord, false]], { px: 300 })),
        corr: lig(cpQuadFig(12, 5, [[[[1, 1], [6, 1], [6, 3], [1, 3]], '#2E9C6A'], [[[8, 1], [11, 1], [11, 4], [8, 4]], '#2EA8C9']], { px: 300 })) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le carré a 4 côtés de même @.', 'longueur'], ['Le rectangle a 4 angles @.', 'droits'], ['Le rectangle a 2 grands côtés et 2 @ côtés.', 'petits']], 5) },
    ] },
];
})();

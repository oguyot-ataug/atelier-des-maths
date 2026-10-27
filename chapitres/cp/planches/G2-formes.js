/* CP · Planches : Carré, rectangle, triangle, disque (G2). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
const forme = (t, o) => { o = o || {}; const c = o.c || { carre: '#2EA8C9', rect: '#2E9C6A', tri: '#E9C46A', disque: '#E35D3A' }[t];
  const g = { carre: '<rect x="20" y="20" width="50" height="50"/>', rect: '<rect x="8" y="28" width="74" height="36"/>', tri: '<polygon points="45,12 80,76 10,76"/>', disque: '<circle cx="45" cy="45" r="32"/>' }[t];
  return cpSvg(90, 90, `<g fill="${o.blanc ? '#fff' : c}" fill-opacity="${o.blanc ? 1 : .45}" stroke="${CPC.bord}" stroke-width="2.5" transform="rotate(${o.r || 0} 45 45)">${g}</g>`, o.px || 60); };
const bloc = (L, blanc) => plGrille(L.map(([t, r]) => forme(t, { r, blanc })), L.length);
const MELANGE = [['tri', 0], ['carre', 45], ['disque', 0], ['rect', 90], ['carre', 0], ['tri', 30], ['rect', 0], ['disque', 0]];
const COUL = { carre: '#2EA8C9', rect: '#2E9C6A', tri: '#E9C46A', disque: '#E35D3A' };
PLANCHES['cp|Carré, rectangle, triangle, disque'] = [
  { titre: 'Reconnaître les formes', duree: '20 min',
    attendus: ['Reconnaître et nommer carré, rectangle, triangle, disque', 'Reconnaître une forme même tournée'],
    exos: [
      { etoiles: 1, consigne: 'Colorie : les triangles en jaune, les carrés en bleu, les rectangles en vert, les disques en rouge.',
        eleve: plGrille(MELANGE.map(([t, r]) => forme(t, { r, blanc: true })), 4), corr: plGrille(MELANGE.map(([t, r]) => forme(t, { r })), 4) },
      { etoiles: 2, col: 1, consigne: 'Écris le nom de la forme.',
        eleve: plGrille([forme('tri') + B(6), forme('disque') + B(6), forme('rect') + B(6)], 1), corr: plGrille([forme('tri') + R('triangle'), forme('disque') + R('disque'), forme('rect') + R('rectangle')], 1) },
      { etoiles: 1, consigne: 'Entoure les carrés.',
        eleve: plGrille([['carre', 0], ['rect', 0], ['carre', 45], ['tri', 0], ['disque', 0], ['carre', 20]].map(([t, r]) => forme(t, { r })), 6),
        corr: plGrille([['carre', 0, 1], ['rect', 0], ['carre', 45, 1], ['tri', 0], ['disque', 0], ['carre', 20, 1]].map(([t, r, ok]) => ok ? plEntoure(forme(t, { r })) : forme(t, { r })), 6) },
      { etoiles: 2, col: 1, consigne: 'Dans l\'exercice 1, combien y a-t-il… ?',
        ...P3.rmp([['de triangles : @', 2], ['de disques : @', 2], ['de rectangles : @', 2]], 2) },
    ] },
  { titre: 'Côtés et sommets', duree: '20 min',
    attendus: ['Décrire une forme avec les mots côté et sommet'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Un triangle a @ côtés.', 3], ['Un carré a @ sommets.', 4], ['Un rectangle a @ côtés.', 4], ['Un disque a @ sommet.', 0]], 2) },
      { etoiles: 2, col: 1, consigne: 'Devinettes : qui suis-je ?',
        ...P3.rmp([['J\'ai 3 sommets : @', 'le triangle'], ['Je suis tout rond : @', 'le disque'], ['J\'ai 4 côtés pareils : @', 'le carré']], 7) },
      { etoiles: 1, consigne: 'Combien de côtés ? Écris le nombre.',
        ...PCP.compte([[forme('tri', { px: 70 }), 3], [forme('carre', { px: 70 }), 4], [forme('rect', { px: 70 }), 4], [forme('tri', { r: 40, px: 70 }), 3]], 4) },
      { etoiles: 2, consigne: 'Entoure les formes qui ont 4 côtés.',
        eleve: plGrille([['tri', 0], ['rect', 90], ['disque', 0], ['carre', 30], ['tri', 60], ['rect', 0]].map(([t, r]) => forme(t, { r })), 6),
        corr: plGrille([['tri', 0], ['rect', 90, 1], ['disque', 0], ['carre', 30, 1], ['tri', 60], ['rect', 0, 1]].map(([t, r, ok]) => ok ? plEntoure(forme(t, { r })) : forme(t, { r })), 6) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...P3.chx([['Un carré a 3 côtés.', 'faux', 'vrai · faux'], ['Un triangle a 3 sommets.', 'vrai', 'vrai · faux'], ['Un disque a des côtés.', 'faux', 'vrai · faux']]) },
      { etoiles: 3, col: 1, consigne: 'Dessine une forme qui a 3 côtés. Comment s\'appelle-t-elle ?',
        eleve: cadre(70) + lig(B(8)), corr: lig(forme('tri', { px: 70 })) + lig(R('un triangle')) },
    ] },
  { titre: 'Reproduire sur quadrillage', duree: '25 min',
    attendus: ['Reproduire une forme sur quadrillage en comptant les carreaux', 'Tracer à la règle'],
    exos: [
      { etoiles: 2, consigne: 'Reproduis le carré à côté du modèle.',
        eleve: lig(cpQuadFig(10, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9']], { points: [[6, 1]], px: 260 })),
        corr: lig(cpQuadFig(10, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9'], [[[6, 1], [9, 1], [9, 4], [6, 4]], '#2EA8C9']], { px: 260 })) },
      { etoiles: 3, consigne: 'Reproduis le triangle à côté du modèle.',
        eleve: lig(cpQuadFig(10, 5, [[[[1, 4], [4, 4], [1, 1]], '#E9C46A']], { points: [[6, 4]], px: 260 })),
        corr: lig(cpQuadFig(10, 5, [[[[1, 4], [4, 4], [1, 1]], '#E9C46A'], [[[6, 4], [9, 4], [6, 1]], '#E9C46A']], { px: 260 })) },
      { etoiles: 3, consigne: 'Reproduis le rectangle à côté du modèle.',
        eleve: lig(cpQuadFig(10, 5, [[[[0, 1], [4, 1], [4, 3], [0, 3]], '#2E9C6A']], { points: [[6, 1]], px: 260 })),
        corr: lig(cpQuadFig(10, 5, [[[[0, 1], [4, 1], [4, 3], [0, 3]], '#2E9C6A'], [[[6, 1], [10, 1], [10, 3], [6, 3]], '#2E9C6A']], { px: 260 })) },
    ] },
];
})();

/* CE1 · Planches : Les solides : faces, arêtes, sommets (G4). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Les solides : faces, arêtes, sommets'] = [
  { titre: 'Le cube et le pavé', duree: '20 min',
    attendus: ['Décrire le cube et le pavé : faces, arêtes, sommets'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour le cube.', eleve: lig(cpSvg(320, 210, ce1SolideSvg('cube'), 140)) + plListe(['faces : ' + B(2), 'arêtes : ' + B(2), 'sommets : ' + B(2)]), corr: lig(cpSvg(320, 210, ce1SolideSvg('cube'), 140)) + plListe(['faces : ' + R(6), 'arêtes : ' + R(12), 'sommets : ' + R(8)]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Les faces du cube sont des @.', 'carrés'], ['Les faces du pavé sont des @.', 'rectangles'], ['Le pavé a @ sommets.', 8]], 5) },
    ] },
  { titre: 'Reconnaître les solides', duree: '20 min',
    attendus: ['Reconnaître cube, pavé, boule, cylindre, cône, pyramide'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'À quel solide ressemble… ?', ...P3.rmp([['une brique de lait : @', 'un pavé'], ['un dé : @', 'un cube'], ['un tube de colle : @', 'un cylindre'], ['un ballon : @', 'une boule']], 6) },
      { etoiles: 2, col: 1, consigne: 'Devinettes.', ...P3.rmp([['J\'ai 1 face plane en forme de disque et une pointe : @', 'le cône'], ['Je n\'ai ni face plane ni sommet : @', 'la boule']], 6) },
    ] },
  { titre: 'Patrons et constructions', duree: '20 min',
    attendus: ['Savoir qu\'un patron de cube a 6 carrés', 'Compter des cubes dans une construction'],
    exos: [
      { etoiles: 2, consigne: 'Ce dessin est-il un patron de cube ? Entoure.', eleve: lig(cpQuadFig(5, 4, [[[[1, 0], [2, 0], [2, 1], [4, 1], [4, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1]], '#2EA8C9']], { px: 140 })) + lig('<b>oui · non</b>'), corr: lig(cpQuadFig(5, 4, [[[[1, 0], [2, 0], [2, 1], [4, 1], [4, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1]], '#2EA8C9']], { px: 140 })) + lig(plEntoure('oui') + ' : 6 carrés en croix, ils se replient en cube.') },
      { etoiles: 3, cahier: true, consigne: 'Paul construit un pavé avec 3 rangées de 4 cubes, sur 2 étages. Combien de cubes utilise-t-il ?', corr: cm1Redac('Cubes', { suite: ['3 × 4 = 12', '12 + 12 = 24'] }, 'Paul utilise 24 cubes.') },
    ] },
];
})();

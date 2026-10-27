/* CE1 · Planches : Les solides : faces, arêtes, sommets (G4). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Les solides : faces, arêtes, sommets'] = [
  { titre: 'Le cube et le pavé', duree: '20 min',
    attendus: ['Décrire le cube et le pavé : faces, arêtes, sommets'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour le cube.', eleve: lig(cpSvg(320, 210, ce1SolideSvg('cube'), 140)) + plListe(['faces : ' + B(2), 'arêtes : ' + B(2), 'sommets : ' + B(2)]), corr: lig(cpSvg(320, 210, ce1SolideSvg('cube'), 140)) + plListe(['faces : ' + R(6), 'arêtes : ' + R(12), 'sommets : ' + R(8)]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Les faces du cube sont des @.', 'carrés'], ['Les faces du pavé sont des @.', 'rectangles'], ['Le pavé a @ sommets.', 8]], 5) },
      { etoiles: 2, col: 1, consigne: 'Complète pour le pavé.', eleve: lig(cpSvg(320, 210, ce1SolideSvg('pave'), 150)) + plListe(['faces : ' + B(2), 'arêtes : ' + B(2), 'sommets : ' + B(2)]), corr: lig(cpSvg(320, 210, ce1SolideSvg('pave'), 150)) + plListe(['faces : ' + R(6), 'arêtes : ' + R(12), 'sommets : ' + R(8)]) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['Le cube a 8 sommets.', 'vrai', 'vrai · faux'], ['Le pavé a 12 arêtes.', 'vrai', 'vrai · faux'], ['Le cube a 4 faces.', 'faux', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Le cube et le pavé ont le même nombre de @.', 'faces (6), d\'arêtes (12) et de sommets (8)']], 8) },
    ] },
  { titre: 'Reconnaître les solides', duree: '20 min',
    attendus: ['Reconnaître cube, pavé, boule, cylindre, cône, pyramide'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'À quel solide ressemble… ?', ...P3.rmp([['une brique de lait : @', 'un pavé'], ['un dé : @', 'un cube'], ['un tube de colle : @', 'un cylindre'], ['un ballon : @', 'une boule']], 6) },
      { etoiles: 2, col: 1, consigne: 'Devinettes.', ...P3.rmp([['J\'ai 1 face plane en forme de disque et une pointe : @', 'le cône'], ['Je n\'ai ni face plane ni sommet : @', 'la boule']], 6) },
      { etoiles: 1, col: 1, consigne: 'À quel solide ressemble… ?', ...P3.rmp([['une boîte à chaussures : @', 'un pavé'], ['une orange : @', 'une boule'], ['un cornet de glace : @', 'un cône'], ['une boîte de conserve : @', 'un cylindre']], 6) },
      { etoiles: 2, col: 1, consigne: 'Roule ou ne roule pas ? Entoure.', ...P3.chx([['le cylindre', 'roule', 'roule · ne roule pas'], ['le pavé', 'ne roule pas', 'roule · ne roule pas'], ['le cône', 'roule', 'roule · ne roule pas'], ['la pyramide', 'ne roule pas', 'roule · ne roule pas']]) },
      { etoiles: 1, consigne: 'Écris le nom de chaque solide : cube, pavé, boule, cylindre, cône, pyramide.',
        eleve: plGrille([cpSvg(320, 210, ce1SolideSvg('cube'), 90) + '<br>' + B(5), cpSvg(320, 210, ce1SolideSvg('pave'), 90) + '<br>' + B(5)], 2) + plListe(['Une balle : ' + B(5), 'Un cornet : ' + B(5)]),
        corr: plGrille([cpSvg(320, 210, ce1SolideSvg('cube'), 90) + '<br>' + R('cube'), cpSvg(320, 210, ce1SolideSvg('pave'), 90) + '<br>' + R('pavé')], 2) + plListe(['Une balle : ' + R('boule'), 'Un cornet : ' + R('cône')]) },
      { etoiles: 2, col: 1, consigne: 'Combien de faces planes ?', ...P3.rmp([['le cube : @', 6], ['le cylindre : @', 2], ['la boule : @', 0], ['le cône : @', 1]], 2) },
      { etoiles: 3, col: 1, consigne: 'Devinette.', ...P3.rmp([['J\'ai 5 faces : 4 triangles et 1 carré. Je suis @.', 'la pyramide']], 8) },
    ] },
  { titre: 'Patrons et constructions', duree: '20 min',
    attendus: ['Savoir qu\'un patron de cube a 6 carrés', 'Compter des cubes dans une construction'],
    exos: [
      { etoiles: 2, consigne: 'Ce dessin est-il un patron de cube ? Entoure.', eleve: lig(cpQuadFig(5, 4, [[[[1, 0], [2, 0], [2, 1], [4, 1], [4, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1]], '#2EA8C9']], { px: 140 })) + lig('<b>oui · non</b>'), corr: lig(cpQuadFig(5, 4, [[[[1, 0], [2, 0], [2, 1], [4, 1], [4, 2], [2, 2], [2, 3], [1, 3], [1, 2], [0, 2], [0, 1], [1, 1]], '#2EA8C9']], { px: 140 })) + lig(plEntoure('oui') + ' : 6 carrés en croix, ils se replient en cube.') },
      { etoiles: 3, cahier: true, consigne: 'Paul construit un pavé avec 3 rangées de 4 cubes, sur 2 étages. Combien de cubes utilise-t-il ?', corr: cm1Redac('Cubes', { suite: ['3 × 4 = 12', '12 + 12 = 24'] }, 'Paul utilise 24 cubes.') },
      { etoiles: 2, consigne: 'Ce dessin est-il un patron de cube ? Entoure.', eleve: lig(cpQuadFig(4, 3, [[[[0, 0], [3, 0], [3, 2], [0, 2]], '#E9C46A']], { px: 110 })) + lig('<b>oui · non</b>'), corr: lig(cpQuadFig(4, 3, [[[[0, 0], [3, 0], [3, 2], [0, 2]], '#E9C46A']], { px: 110 })) + lig(plEntoure('non') + ' : ces 6 carrés ne se replient pas en cube.') },
      { etoiles: 3, col: 1, consigne: 'Combien de petits cubes ?', ...P3.rmp([['2 rangées de 3 cubes, sur 2 étages : @', 12], ['un grand cube de 2 cubes de côté : @', 8]], 2) },
    ] },
];
})();

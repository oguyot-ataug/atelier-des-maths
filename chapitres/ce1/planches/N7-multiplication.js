/* CE1 · Planches : La multiplication : le signe × (N7). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|La multiplication : le signe ×'] = [
  { titre: 'De l\'addition à la multiplication', duree: '25 min',
    attendus: ['Écrire une addition répétée sous forme de multiplication', 'Lire le signe ×'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris avec le signe ×.', ...P3.rmp([['5 + 5 + 5 = @', '3 × 5'], ['2 + 2 + 2 + 2 = @', '4 × 2'], ['10 + 10 = @', '2 × 10']], 4) },
      { etoiles: 2, col: 1, consigne: 'Écris l\'addition, puis le résultat.', ...P3.rmp([['3 × 4 : @', '4 + 4 + 4 = 12'], ['4 × 3 : @', '3 + 3 + 3 + 3 = 12']], 10) },
      { etoiles: 1, col: 1, consigne: 'Écris avec le signe ×.', ...P3.rmp([['3 + 3 + 3 + 3 + 3 = @', '5 × 3'], ['7 + 7 = @', '2 × 7'], ['4 + 4 + 4 = @', '3 × 4']], 4) },
      { etoiles: 2, col: 1, consigne: 'Comment lit-on ?', ...P3.rmp([['3 × 5 : @', '3 fois 5'], ['5 × 2 : @', '5 fois 2'], ['10 × 4 : @', '10 fois 4']], 6) },
      { etoiles: 1, consigne: 'Écris l\'addition, puis la multiplication.',
        eleve: plGrille([lig(cpJetons(3), cpJetons(3), cpJetons(3), cpJetons(3)) + B(10) + '<br>' + B(6), lig(cpJetons(5), cpJetons(5)) + B(10) + '<br>' + B(6)], 2),
        corr: plGrille([lig(cpJetons(3), cpJetons(3), cpJetons(3), cpJetons(3)) + R('3 + 3 + 3 + 3 = 12') + '<br>' + R('4 × 3 = 12'), lig(cpJetons(5), cpJetons(5)) + R('5 + 5 = 10') + '<br>' + R('2 × 5 = 10')], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne écriture.', ...P3.chx([['6 + 6 + 6', '3 × 6', '3 × 6 · 6 × 6 · 3 + 6'], ['2 + 2 + 2 + 2 + 2', '5 × 2', '2 × 2 · 5 × 2 · 5 + 2']]) },
      { etoiles: 3, col: 1, consigne: 'Peut-on l\'écrire avec le signe × ? Entoure.', ...P3.chx([['4 + 4 + 4', 'oui', 'oui · non'], ['3 + 5 + 3', 'non', 'oui · non'], ['10 + 10 + 10 + 10', 'oui', 'oui · non']]) },
    ] },
  { titre: 'Des rangées de jetons', duree: '20 min',
    attendus: ['Associer une multiplication à un quadrillage de jetons', 'Savoir que 3 × 5 = 5 × 3'],
    exos: [
      { etoiles: 1, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(2, 5, { p: 18 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2), ce1Rangees(3, 4, { p: 18 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2)], 2),
        corr: plGrille([ce1Rangees(2, 5, { p: 18 }) + '<br>' + R('2 × 5 = 10'), ce1Rangees(3, 4, { p: 18 }) + '<br>' + R('3 × 4 = 12')], 2) },
      { etoiles: 2, consigne: 'Dessine 4 rangées de 3 jetons. Écris la multiplication.', eleve: PCP.cadre(80), corr: lig(ce1Rangees(4, 3, { p: 18 })) + lig(R('4 × 3 = 12')) },
      { etoiles: 1, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(3, 6, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2), ce1Rangees(5, 2, { p: 16 }) + '<br>' + B(3) + ' × ' + B(3) + ' = ' + B(2)], 2),
        corr: plGrille([ce1Rangees(3, 6, { p: 16 }) + '<br>' + R('3 × 6 = 18'), ce1Rangees(5, 2, { p: 16 }) + '<br>' + R('5 × 2 = 10')], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['4 × 2 = 2 × @', 4], ['5 × 3 = @ × 5', 3], ['10 × 2 = 2 × @', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Dessine 2 rangées de 6 jetons. Écris la multiplication.', eleve: PCP.cadre(60), corr: lig(ce1Rangees(2, 6, { p: 16 })) + lig(R('2 × 6 = 12')) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['@ × 5 = 15', 3], ['2 × @ = 12', 6], ['@ × 10 = 50', 5]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Résoudre des problèmes de groupes égaux avec une multiplication'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['2 × 7 = @', 14], ['10 × 4 = @', 40], ['1 × 9 = @', 9], ['5 × 2 = @', 10]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Une table a 4 pieds. Combien de pieds ont 5 tables ?', corr: cm1Redac('Pieds des tables', '5 × 4 = 20', '5 tables ont 20 pieds.') },
      { etoiles: 3, cahier: true, consigne: 'Un paquet contient 10 gâteaux. Maman achète 3 paquets et papa 2 paquets. Combien de gâteaux en tout ?', corr: cm1Redac('Gâteaux', { suite: ['3 + 2 = 5', '5 × 10 = 50'] }, 'Il y a 50 gâteaux.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 × 10 = @', 30], ['4 × 2 = @', 8], ['2 × 9 = @', 18], ['10 × 6 = @', 60]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['4 mains : @ doigts', 20], ['6 paires de chaussettes : @ chaussettes', 12], ['3 trèfles à 4 feuilles : @ feuilles', 12]], 2) },
      { etoiles: 3, col: 1, consigne: 'Écris la multiplication.', ...P3.rmp([['3 paquets de 5 cartes : @', '3 × 5 = 15'], ['4 boîtes de 2 crayons : @', '4 × 2 = 8']], 6) },
    ] },
];
})();

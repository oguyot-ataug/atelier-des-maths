/* CE1 · Planches : Problèmes : bilan de l'année (N15). */
(() => {
PLANCHES['ce1|Problèmes : bilan de l\'année'] = [
  { titre: 'Ajouter et soustraire', duree: '25 min',
    attendus: ['Résoudre des problèmes additifs, en une ou deux étapes'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Lina a 54 cartes. Max en a 27 de moins. Combien de cartes a Max ?', corr: cm1Redac('Cartes de Max', '54 − 27 = 27', 'Max a 27 cartes.') },
      { etoiles: 2, cahier: true, consigne: 'Dans un bus, il y a 38 personnes. 15 descendent, puis 9 montent. Combien y a-t-il de personnes dans le bus ?', corr: cm1Redac('Personnes dans le bus', { suite: ['38 − 15 = 23', '23 + 9 = 32'] }, 'Il y a 32 personnes dans le bus.') },
      { etoiles: 3, cahier: true, consigne: 'Une école a 342 élèves. 156 sont des filles. Combien y a-t-il de garçons ?', corr: cm1Redac('Garçons', { pose: ce1Sous(342, 156, 130) }, 'Il y a 186 garçons.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['54 − 27 = @', 27], ['38 − 15 = @', 23], ['23 + 9 = @', 32], ['186 + 156 = @', 342]], 3) },
      { etoiles: 2, col: 1, consigne: 'Ajouter ou soustraire ? Entoure.', ...P3.chx([['Combien en tout ?', 'ajouter', 'ajouter · soustraire'], ['Combien en reste-t-il ?', 'soustraire', 'ajouter · soustraire'], ['Combien de moins ?', 'soustraire', 'ajouter · soustraire']]) },
      { etoiles: 2, consigne: 'Complète le schéma : il y a 64 billes, dont 28 rouges. Combien de bleues ?',
        eleve: PCP.lig(cpSchema([[28, '28', '#E35D3A'], [36, '?', '#fff']], '64', { u: 4 })) + PCP.lig('Il y a ' + P3.B(2) + ' billes bleues.'),
        corr: PCP.lig(cpSchema([[28, '28', '#E35D3A'], [36, '36', '#2EA8C9']], '64', { u: 4 })) + plListe(['64 − 28 = 36']) + PCP.lig('Il y a ' + P3.R(36) + ' billes bleues.') },
    ] },
  { titre: 'Multiplier et partager', duree: '25 min',
    attendus: ['Résoudre des problèmes de multiplication, de groupements et de partages'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Il y a 5 paquets de 4 gâteaux. Combien de gâteaux en tout ?', corr: cm1Redac('Gâteaux', '5 × 4 = 20', 'Il y a 20 gâteaux.') },
      { etoiles: 2, cahier: true, consigne: '30 élèves font des équipes de 5. Combien d\'équipes ?', corr: cm1Redac('Équipes', '6 × 5 = 30', 'Il y a 6 équipes.') },
      { etoiles: 3, cahier: true, consigne: 'Zoé a 3 boîtes de 10 crayons et 6 crayons seuls. Combien de crayons a-t-elle ?', corr: cm1Redac('Crayons de Zoé', { suite: ['3 × 10 = 30', '30 + 6 = 36'] }, 'Zoé a 36 crayons.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['6 paquets de 4 : @', 24], ['40 en paquets de 10 : @ paquets', 4], ['25 en équipes de 5 : @ équipes', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Multiplier ou partager ? Entoure.', ...P3.chx([['5 boîtes de 6 œufs : combien d\'œufs ?', 'multiplier', 'multiplier · partager'], ['24 billes pour 4 enfants : combien chacun ?', 'partager', 'multiplier · partager']]) },
      { etoiles: 2, consigne: 'Écris la multiplication et le nombre de jetons.',
        eleve: plGrille([ce1Rangees(4, 6, { p: 16 }) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(2), ce1Rangees(5, 5, { p: 16 }) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(2)], 2),
        corr: plGrille([ce1Rangees(4, 6, { p: 16 }) + '<br>' + P3.R('4 × 6 = 24'), ce1Rangees(5, 5, { p: 16 }) + '<br>' + P3.R('5 × 5 = 25')], 2) },
    ] },
  { titre: 'Mesures et monnaie', duree: '25 min',
    attendus: ['Résoudre des problèmes de longueurs, de prix'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une planche mesure 80 cm. On en coupe 35 cm. Combien mesure le morceau qui reste ?', corr: cm1Redac('Le morceau qui reste', '80 − 35 = 45', 'Le morceau mesure 45 cm.') },
      { etoiles: 2, cahier: true, consigne: 'Un crayon coûte 2 € et un cahier 3 €. Combien coûtent 2 crayons et 1 cahier ?', corr: cm1Redac('Prix à payer', { suite: ['2 × 2 = 4', '4 + 3 = 7'] }, 'On paie 7 €.') },
      { etoiles: 3, cahier: true, consigne: 'Tom paie un jeu de 37 € avec un billet de 50 €. Combien lui rend-on ?', corr: cm1Redac('Monnaie rendue', { suite: ['37 + 3 = 40', '40 + 10 = 50', '3 + 10 = 13'] }, 'On lui rend 13 €.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 m = @ cm', 100], ['1 kg = @ g', '1 000'], ['1 € = @ c', 100], ['1 h = @ min', 60]], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien me rend-on ?', ...P3.rmp([['Je paie 50 € pour 37 € : @', '13 €'], ['Je paie 20 € pour 12 € : @', '8 €'], ['Je paie 10 € pour 6 € : @', '4 €']], 3) },
      { etoiles: 2, consigne: 'Mesure les deux segments. Combien mesurent-ils mis bout à bout ?',
        eleve: plGrille([cpRegle(10, { seg: 4, K: 20 }), cpRegle(10, { seg: 7, K: 20 })], 2) + PCP.lig('Bout à bout : ' + P3.B(2) + ' cm'),
        corr: plGrille([cpRegle(10, { seg: 4, K: 20 }) + '<br>' + P3.R('4 cm'), cpRegle(10, { seg: 7, K: 20 }) + '<br>' + P3.R('7 cm')], 2) + PCP.lig('Bout à bout : ' + P3.R(11) + ' cm') },
    ] },
];
})();

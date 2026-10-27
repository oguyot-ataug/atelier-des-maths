/* CE1 · Planches : Problèmes : bilan de l'année (N15). */
(() => {
PLANCHES['ce1|Problèmes : bilan de l\'année'] = [
  { titre: 'Ajouter et soustraire', duree: '25 min',
    attendus: ['Résoudre des problèmes additifs, en une ou deux étapes'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Lina a 54 cartes. Max en a 27 de moins. Combien de cartes a Max ?', corr: cm1Redac('Cartes de Max', '54 − 27 = 27', 'Max a 27 cartes.') },
      { etoiles: 2, cahier: true, consigne: 'Dans un bus, il y a 38 personnes. 15 descendent, puis 9 montent. Combien y a-t-il de personnes dans le bus ?', corr: cm1Redac('Personnes dans le bus', { suite: ['38 − 15 = 23', '23 + 9 = 32'] }, 'Il y a 32 personnes dans le bus.') },
      { etoiles: 3, cahier: true, consigne: 'Une école a 342 élèves. 156 sont des filles. Combien y a-t-il de garçons ?', corr: cm1Redac('Garçons', { pose: ce1Sous(342, 156, 130) }, 'Il y a 186 garçons.') },
    ] },
  { titre: 'Multiplier et partager', duree: '25 min',
    attendus: ['Résoudre des problèmes de multiplication, de groupements et de partages'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Il y a 5 paquets de 4 gâteaux. Combien de gâteaux en tout ?', corr: cm1Redac('Gâteaux', '5 × 4 = 20', 'Il y a 20 gâteaux.') },
      { etoiles: 2, cahier: true, consigne: '30 élèves font des équipes de 5. Combien d\'équipes ?', corr: cm1Redac('Équipes', '6 × 5 = 30', 'Il y a 6 équipes.') },
      { etoiles: 3, cahier: true, consigne: 'Zoé a 3 boîtes de 10 crayons et 6 crayons seuls. Combien de crayons a-t-elle ?', corr: cm1Redac('Crayons de Zoé', { suite: ['3 × 10 = 30', '30 + 6 = 36'] }, 'Zoé a 36 crayons.') },
    ] },
  { titre: 'Mesures et monnaie', duree: '25 min',
    attendus: ['Résoudre des problèmes de longueurs, de prix'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une planche mesure 80 cm. On en coupe 35 cm. Combien mesure le morceau qui reste ?', corr: cm1Redac('Le morceau qui reste', '80 − 35 = 45', 'Le morceau mesure 45 cm.') },
      { etoiles: 2, cahier: true, consigne: 'Un crayon coûte 2 € et un cahier 3 €. Combien coûtent 2 crayons et 1 cahier ?', corr: cm1Redac('Prix à payer', { suite: ['2 × 2 = 4', '4 + 3 = 7'] }, 'On paie 7 €.') },
      { etoiles: 3, cahier: true, consigne: 'Tom paie un jeu de 37 € avec un billet de 50 €. Combien lui rend-on ?', corr: cm1Redac('Monnaie rendue', { suite: ['37 + 3 = 40', '40 + 10 = 50', '3 + 10 = 13'] }, 'On lui rend 13 €.') },
    ] },
];
})();

/* CP · Planches : Problèmes : bilan de l'année (N15). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Problèmes : bilan de l\'année'] = [
  { titre: 'Ajouter, retirer', duree: '25 min',
    attendus: ['Résoudre des problèmes additifs et soustractifs', 'Répondre par une phrase'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Il y a 14 filles et 13 garçons dans la classe. Combien d\'élèves ?', corr: cm1Redac('Élèves', '14 + 13 = 27', 'Il y a 27 élèves dans la classe.') },
      { etoiles: 1, cahier: true, consigne: 'Maman a 30 œufs. Elle en utilise 12. Combien lui en reste-t-il ?', corr: cm1Redac('Œufs qui restent', { suite: ['30 − 10 = 20', '20 − 2 = 18'] }, 'Il reste 18 œufs.') },
      { etoiles: 2, cahier: true, consigne: 'Léo a 20 €. Il veut un jeu à 35 €. Combien lui manque-t-il ?', corr: cm1Redac('Argent qui manque', '20 + 15 = 35', 'Il manque 15 € à Léo.') },
    ] },
  { titre: 'Comparer', duree: '20 min',
    attendus: ['Résoudre des problèmes de comparaison (de plus, de moins)'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Tom a 12 billes. Nina en a 5 de plus. Combien Nina a-t-elle de billes ?', corr: cm1Redac('Billes de Nina', '12 + 5 = 17', 'Nina a 17 billes.') },
      { etoiles: 2, cahier: true, consigne: 'Hugo a 25 images. Lina en a 31. Combien Lina en a-t-elle de plus ?', corr: cm1Redac('Images de plus', '25 + 6 = 31', 'Lina a 6 images de plus que Hugo.') },
    ] },
  { titre: 'Groupes et deux étapes', duree: '25 min',
    attendus: ['Résoudre des problèmes de groupes égaux et à deux étapes'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Il y a 4 tables de 5 élèves. Combien d\'élèves ?', corr: cm1Redac('Élèves aux tables', '5 + 5 + 5 + 5 = 20', 'Il y a 20 élèves.') },
      { etoiles: 3, cahier: true, consigne: 'Dans le bus, il y a 20 enfants. 7 descendent, puis 4 montent. Combien d\'enfants y a-t-il ?', corr: cm1Redac('Enfants dans le bus', { suite: ['20 − 7 = 13', '13 + 4 = 17'] }, 'Il y a 17 enfants dans le bus.') },
      { etoiles: 3, cahier: true, consigne: 'Sam achète 2 livres à 6 € et un stylo à 3 €. Combien paie-t-il ?', corr: cm1Redac('Prix à payer', { suite: ['6 + 6 = 12', '12 + 3 = 15'] }, 'Sam paie 15 €.') },
    ] },
];
})();

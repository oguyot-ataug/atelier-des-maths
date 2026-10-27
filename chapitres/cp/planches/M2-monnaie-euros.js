/* CP · Planches : La monnaie : les euros (M2). */
(() => {
const { lig, compte, entoure, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|La monnaie : les euros'] = [
  { titre: 'Compter l\'argent', duree: '20 min',
    attendus: ['Connaître les pièces de 1 € et 2 € et les billets de 5, 10, 20 et 50 €', 'Calculer une somme'],
    exos: [
      { etoiles: 1, consigne: 'Combien d\'euros ? Écris la somme.',
        ...compte([[cpArgent([2, 2, 1], { px: 150 }), '5 €'], [cpArgent([5, 2], { px: 140 }), '7 €'], [cpArgent([10, 5, 1], { px: 200 }), '16 €']], 3, 3) },
      { etoiles: 2, consigne: 'Combien d\'euros ?',
        ...compte([[cpArgent([20, 10, 2], { px: 220 }), '32 €'], [cpArgent([50, 5, 2, 2], { px: 260 }), '59 €']], 2, 3) },
    ] },
  { titre: 'Échanger, payer', duree: '20 min',
    attendus: ['Faire des échanges (un billet de 5 € vaut cinq pièces de 1 €)', 'Constituer une somme de plusieurs façons'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['1 billet de 10 € = @ billets de 5 €', 2], ['1 pièce de 2 € = @ pièces de 1 €', 2], ['1 billet de 5 € = @ pièces de 1 €', 5]], 2) },
      { etoiles: 2, consigne: 'Entoure l\'argent qu\'il faut pour payer 8 €.',
        ...entoure([[cpArgent([5, 2, 1], { px: 150 }), true], [cpArgent([5, 2], { px: 120 }), false], [cpArgent([2, 2, 2], { px: 130 }), false]], 3) },
      { etoiles: 3, consigne: 'Dessine deux façons de payer 12 €.',
        eleve: cadre(60) + cadre(60), corr: lig(cpArgent([10, 2], { px: 150 })) + lig(cpArgent([5, 5, 2], { px: 200 })) },
    ] },
  { titre: 'Problèmes de prix', duree: '20 min',
    attendus: ['Résoudre des problèmes de prix (ajouter, ce qui reste)'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une gomme coûte 2 € et une règle 3 €. Combien coûtent-elles ensemble ?',
        corr: cm1Redac('Prix total', '2 + 3 = 5', 'Ensemble, elles coûtent 5 €.') },
      { etoiles: 2, cahier: true, consigne: 'J\'ai 10 €. J\'achète un livre à 6 €. Combien me reste-t-il ?',
        corr: cm1Redac('Argent qui reste', '10 − 6 = 4', 'Il me reste 4 €.') },
      { etoiles: 3, cahier: true, consigne: 'Zoé a un billet de 10 € et deux pièces de 2 €. Elle achète un jeu à 12 €. Peut-elle le payer ? Combien lui restera-t-il ?',
        corr: cm1Redac('Argent de Zoé', { suite: ['10 + 2 + 2 = 14', '14 − 12 = 2'] }, 'Zoé a 14 € : elle peut payer le jeu, et il lui restera 2 €.') },
    ] },
];
})();

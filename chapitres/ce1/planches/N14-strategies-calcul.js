/* CE1 · Planches : Calcul mental : stratégies jusqu'à 100 (N14). */
(() => {
PLANCHES['ce1|Calcul mental : stratégies jusqu\'à 100'] = [
  { titre: 'Ajouter 9, 11, 19', duree: '20 min',
    attendus: ['Ajouter 9 (ou 19) en ajoutant 10 (ou 20) puis en enlevant 1', 'Ajouter 11 en ajoutant 10 puis 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['36 + 9 = @', 45], ['47 + 9 = @', 56], ['53 + 11 = @', 64], ['25 + 19 = @', 44]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Calcule 38 + 9 en ajoutant 10, puis en enlevant 1.', corr: cm1Redac('38 + 9', { suite: ['38 + 10 = 48', '48 − 1 = 47'] }, 'Donc 38 + 9 = 47.') },
    ] },
  { titre: 'Décomposer pour calculer', duree: '20 min',
    attendus: ['Ajouter ou soustraire en décomposant : d\'abord les dizaines, puis les unités'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['45 + 32 = @', 77], ['63 − 21 = @', 42], ['27 + 6 = @', 33], ['56 + 25 = @', 81]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Calcule 47 + 25 en ajoutant d\'abord 20, puis 5.', corr: cm1Redac('47 + 25', { suite: ['47 + 20 = 67', '67 + 5 = 72'] }, 'Donc 47 + 25 = 72.') },
      { etoiles: 3, cahier: true, consigne: 'Calcule 82 − 36 en enlevant d\'abord 30, puis 6.', corr: cm1Redac('82 − 36', { suite: ['82 − 30 = 52', '52 − 6 = 46'] }, 'Donc 82 − 36 = 46.') },
    ] },
  { titre: 'Compléter jusqu\'à 100', duree: '20 min',
    attendus: ['Trouver le complément à 100 en passant par la dizaine suivante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['70 + @ = 100', 30], ['45 + @ = 100', 55], ['100 − 40 = @', 60], ['52 − 9 = @', 43]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Il faut 100 points pour gagner. Sam a 65 points. Combien lui manque-t-il ?', corr: cm1Redac('Points qui manquent', { suite: ['65 + 5 = 70', '70 + 30 = 100', '5 + 30 = 35'] }, 'Il manque 35 points à Sam.') },
    ] },
];
})();

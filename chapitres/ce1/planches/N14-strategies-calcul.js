/* CE1 · Planches : Calcul mental : stratégies jusqu'à 100 (N14). */
(() => {
PLANCHES['ce1|Calcul mental : stratégies jusqu\'à 100'] = [
  { titre: 'Ajouter 9, 11, 19', duree: '20 min',
    attendus: ['Ajouter 9 (ou 19) en ajoutant 10 (ou 20) puis en enlevant 1', 'Ajouter 11 en ajoutant 10 puis 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['36 + 9 = @', 45], ['47 + 9 = @', 56], ['53 + 11 = @', 64], ['25 + 19 = @', 44]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Calcule 38 + 9 en ajoutant 10, puis en enlevant 1.', corr: cm1Redac('38 + 9', { suite: ['38 + 10 = 48', '48 − 1 = 47'] }, 'Donc 38 + 9 = 47.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['64 + 19 = @', 83], ['38 + 11 = @', 49], ['72 + 9 = @', 81], ['45 + 21 = @', 66]], 2) },
      { etoiles: 3, col: 1, consigne: 'Enlève 9 : enlève 10, puis ajoute 1.', ...P3.rmp([['53 − 9 = @', 44], ['80 − 9 = @', 71], ['47 − 19 = @', 28], ['62 − 11 = @', 51]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['27 + 9 = @', 36], ['56 + 9 = @', 65], ['44 + 11 = @', 55], ['68 + 11 = @', 79]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète les étapes.', ...P3.rmp([['55 + 20 = @', 75], ['75 − 1 = @', 74], ['Donc 55 + 19 = @', 74]], 2) },
    ] },
  { titre: 'Décomposer pour calculer', duree: '20 min',
    attendus: ['Ajouter ou soustraire en décomposant : d\'abord les dizaines, puis les unités'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['45 + 32 = @', 77], ['63 − 21 = @', 42], ['27 + 6 = @', 33], ['56 + 25 = @', 81]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Calcule 47 + 25 en ajoutant d\'abord 20, puis 5.', corr: cm1Redac('47 + 25', { suite: ['47 + 20 = 67', '67 + 5 = 72'] }, 'Donc 47 + 25 = 72.') },
      { etoiles: 3, cahier: true, consigne: 'Calcule 82 − 36 en enlevant d\'abord 30, puis 6.', corr: cm1Redac('82 − 36', { suite: ['82 − 30 = 52', '52 − 6 = 46'] }, 'Donc 82 − 36 = 46.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['38 + 24 = @', 62], ['57 + 36 = @', 93], ['91 − 45 = @', 46], ['74 − 28 = @', 46]], 2) },
      { etoiles: 2, col: 1, consigne: 'Doubles et moitiés.', ...P3.rmp([['Le double de 25 : @', 50], ['Le double de 35 : @', 70], ['La moitié de 60 : @', 30], ['La moitié de 90 : @', 45]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète les étapes.', ...P3.rmp([['63 + 20 = @', 83], ['83 + 8 = @', 91], ['Donc 63 + 28 = @', 91]], 2) },
    ] },
  { titre: 'Compléter jusqu\'à 100', duree: '20 min',
    attendus: ['Trouver le complément à 100 en passant par la dizaine suivante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['70 + @ = 100', 30], ['45 + @ = 100', 55], ['100 − 40 = @', 60], ['52 − 9 = @', 43]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Il faut 100 points pour gagner. Sam a 65 points. Combien lui manque-t-il ?', corr: cm1Redac('Points qui manquent', { suite: ['65 + 5 = 70', '70 + 30 = 100', '5 + 30 = 35'] }, 'Il manque 35 points à Sam.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['85 + @ = 100', 15], ['32 + @ = 100', 68], ['@ + 25 = 100', 75], ['100 − 63 = @', 37]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète pour aller à 100 en deux sauts.', ...P3.rmp([['47 + @ = 50', 3], ['50 + @ = 100', 50], ['Donc 47 + @ = 100', 53]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète pour faire 100.', ...P3.rmp([['90 + @ = 100', 10], ['55 + @ = 100', 45], ['25 + @ = 100', 75], ['99 + @ = 100', 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['100 − 30 = @', 70], ['100 − 45 = @', 55], ['100 − 8 = @', 92]], 2) },
    ] },
];
})();

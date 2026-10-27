/* ============================================================
   CE2 · Planches : Procédures de calcul mental (N10)
   Ajouter 9, 19, 29, 38… (ajouter la dizaine au-dessus puis retrancher) ; soustraire 9, 19, 29, 39 ;
   multiplier par 4 et par 8 en doublant ; doubles et moitiés ; calculer avec les dizaines et les
   centaines. Nombres jusqu'à 10 000. Fluence visée : 15 résultats en 3 minutes.
   ============================================================ */
(() => {
const { rmp } = P3;
PLANCHES['ce2|Procédures de calcul mental'] = [
  { titre: 'Ajouter et soustraire 9, 19, 29…', duree: '25 min',
    attendus: ['Ajouter 9, 19, 29 en ajoutant 10, 20, 30 puis en retirant 1', 'Soustraire 9, 19, 29, 39 en retirant 10, 20, 30, 40 puis en ajoutant 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ajoute.',
        ...rmp([['46 + 9 = @', 55], ['73 + 19 = @', 92], ['128 + 29 = @', 157], ['254 + 38 = @', 292], ['67 + 39 = @', 106]], 3) },
      { etoiles: 1, col: 1, consigne: 'Soustrais.',
        ...rmp([['54 − 9 = @', 45], ['81 − 19 = @', 62], ['146 − 29 = @', 117], ['200 − 39 = @', 161], ['95 − 29 = @', 66]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Explique comment tu calcules 347 + 29 de tête, puis 512 − 39.',
        corr: cm1Redac('347 + 29', { suite: ['347 + 30 = 377', '377 − 1 = 376'] }, 'Ajouter 29, c\'est ajouter 30 puis retirer 1 : 347 + 29 = 376.', cmSauts(340, 380, 347, [[30, '+ 30'], [-1, '− 1']], { pas: 5, px: 360 })) + cm1Redac('512 − 39', { suite: ['512 − 40 = 472', '472 + 1 = 473'] }, 'Retirer 39, c\'est retirer 40 puis ajouter 1 : 512 − 39 = 473.') },
    ] },
  { titre: 'Doubles, moitiés, × 4 et × 8', duree: '25 min',
    attendus: ['Connaître les doubles et les moitiés usuels', 'Multiplier par 4 et par 8 en doublant'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris le double, puis la moitié.',
        ...rmp([['Double de 35 : @', 70], ['Double de 240 : @', 480], ['Moitié de 90 : @', 45], ['Moitié de 500 : @', 250], ['Moitié de 1 000 : @', 500]], 3) },
      { etoiles: 2, col: 1, consigne: 'Multiplie en doublant.',
        ...rmp([['15 × 4 = @', 60], ['25 × 4 = @', 100], ['12 × 8 = @', 96], ['30 × 8 = @', 240]], 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Calcule 45 × 4 en doublant deux fois.',
        corr: cm1Redac('45 × 4', { suite: ['45 × 2 = 90', '90 × 2 = 180'] }, '45 × 4 = 180.') },
    ] },
  { titre: 'Calculer avec les dizaines et les centaines', duree: '25 min',
    attendus: ['Ajouter ou retirer des dizaines, des centaines', 'Compléter à la centaine ou au millier supérieur', 'Multiplier par un nombre de dizaines'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['2 450 + 300 = @', '2 750'], ['6 820 − 400 = @', '6 420'], ['3 990 + 10 = @', '4 000'], ['5 000 − 100 = @', '4 900']], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['370 + @ = 400', 30], ['6 800 + @ = 7 000', 200], ['4 650 + @ = 5 000', 350]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['7 × 30 = @', 210], ['4 × 60 = @', 240], ['9 × 20 = @', 180], ['5 × 80 = @', 400]], 3) },
    ] },
];
})();

/* ============================================================
   CM2 · Planches : Procédures de calcul mental (N11)
   Faits numériques ; ajouter ou retirer 9, 19, 99 ; décimaux ; grands nombres ronds ;
   distributivité ; doubles et moitiés ; × 5, × 50, : 4, : 8.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
PLANCHES['cm2|Procédures de calcul mental'] = [
  { titre: 'Faits numériques et ajouter 9, 19, 99', duree: '25 min',
    attendus: ['Connaître les tables et les compléments', 'Ajouter ou retirer 9, 19, 99 en passant par 10, 20, 100', 'Calculer vite et sans poser'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['7 × 8 = @', 56], ['54 : 6 = @', 9], ['9 × 6 = @', 54], ['63 : 7 = @', 9]]) },
      { etoiles: 1, col: 1, consigne: 'Complète pour obtenir 100, puis 1 000.',
        ...rmp([['37 + @ = 100', 63], ['85 + @ = 100', 15], ['650 + @ = 1 000', 350], ['720 + @ = 1 000', 280]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (ajouter 9, c\'est ajouter 10 puis retirer 1).',
        ...rmp([['47 + 9 = @', 56], ['125 + 99 = @', 224], ['356 + 19 = @', 375], ['83 − 9 = @', 74], ['300 − 99 = @', 201]]) },
      { etoiles: 2, cahier: true, consigne: 'Explique comment calculer 465 + 199 de tête.',
        corr: cm1Redac('Calcul de 465 + 199', { suite: ['465 + 200 = 665', '665 − 1 = 664'] }, 'Ajouter 199, c\'est ajouter 200 puis retirer 1 : 465 + 199 = 664.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['465 + 199 = @', 664], ['327 + 99 = @', 426], ['1 250 − 99 = @', '1 151']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['85 + @ = 100', 15], ['640 + @ = 1 000', 360], ['@ + 275 = 1 000', 725]], 2) },
    ] },
  { titre: 'Décimaux et nombres ronds', duree: '25 min',
    attendus: ['Calculer avec des décimaux simples', 'Multiplier et diviser des nombres ronds', 'Utiliser la numération'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['0,5 + 0,7 = @', '1,2'], ['2,4 + 0,6 = @', 3], ['1 − 0,25 = @', '0,75'], ['3,8 − 1,5 = @', '2,3']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['30 × 40 = @', '1 200'], ['600 : 20 = @', 30], ['200 × 50 = @', '10 000'], ['4 800 : 100 = @', 48]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['0,3 × 10 = @', 3], ['2,5 × 4 = @', 10], ['@ × 100 = 45', '0,45'], ['7 : 10 = @', '0,7']]) },
      { etoiles: 3, cahier: true, consigne: 'Un paquet de gâteaux coûte 1,99 €. Combien coûtent 3 paquets ? Calcule de tête.',
        corr: cm1Redac('Prix de 3 paquets', { suite: ['2 × 3 = 6', '0,01 × 3 = 0,03', '6 − 0,03 = 5,97'] }, '3 paquets coûtent 5,97 €.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 × 1,99 = @', '5,97'], ['2,5 + 2,5 = @', 5], ['10 − 0,01 = @', '9,99']], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['0,5 × 8 = @', 4], ['0,25 × 4 = @', 1], ['1,5 × 6 = @', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['4,99 + 3,01 = @', 8], ['7,5 − 2,75 = @', '4,75']], 3) },
    ] },
  { titre: 'Distributivité, doubles et moitiés', duree: '30 min',
    attendus: ['Décomposer un nombre pour multiplier', 'Multiplier par 5 ou par 50', 'Diviser par 4 ou par 8'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['Le double de 3,5 : @', 7], ['La moitié de 13 : @', '6,5'], ['Le double de 145 : @', 290], ['La moitié de 250 : @', 125]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (multiplier par 5, c\'est multiplier par 10 puis prendre la moitié).',
        ...rmp([['24 × 5 = @', 120], ['36 × 50 = @', '1 800'], ['84 : 4 = @', 21], ['120 : 8 = @', 15]]) },
      { etoiles: 2, cahier: true, consigne: 'Calcule 12 × 11 de tête en décomposant 11.',
        corr: cm1Redac('Calcul de 12 × 11', { suite: ['12 × 10 = 120', '12 × 1 = 12', '120 + 12 = 132'] }, '12 × 11 = 132.') },
      { etoiles: 3, cahier: true, consigne: 'Calcule 25 × 102 de tête en décomposant 102.',
        corr: cm1Redac('Calcul de 25 × 102', { suite: ['25 × 100 = 2 500', '25 × 2 = 50', '2 500 + 50 = 2 550'] }, '25 × 102 = 2 550.') },
      { etoiles: 1, col: 1, consigne: 'Calcule en décomposant.', ...P3.rmp([['12 × 11 = @', 132], ['25 × 102 = @', '2 550'], ['15 × 101 = @', '1 515']], 3) },
      { etoiles: 2, col: 1, consigne: 'Multiplie par 5.', ...P3.rmp([['48 × 5 = @', 240], ['126 × 5 = @', 630]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['le double de 3,7 : @', '7,4'], ['la moitié de 9 : @', '4,5'], ['la moitié de 1,2 : @', '0,6']], 3) },
      { etoiles: 3, col: 1, consigne: 'Calcule astucieusement.', ...P3.rmp([['25 × 4 × 7 = @', 700], ['125 × 8 = @', '1 000']], 3) },
    ] },
];
})();

/* ============================================================
   CE2 · Planches : Addition et soustraction posées (N3)
   Mots terme, somme, différence ; additions et soustractions posées en colonnes (entiers jusqu'à
   10 000), soustraction par compensation (« +10 » en haut, « 1+ » en bas) ; calcul mental quand c'est
   possible.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
PLANCHES['ce2|Addition et soustraction posées'] = [
  { titre: 'Les mots et l\'addition posée', duree: '30 min',
    attendus: ['Utiliser les mots terme, somme, différence', 'Poser une addition en alignant les chiffres de même rang', 'Calculer avec des retenues'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec « somme » ou « différence ».',
        ...rmp([['Le résultat d\'une addition est une @.', 'somme'], ['Le résultat d\'une soustraction est une @.', 'différence'], ['La @ de 50 et 20 est 70.', 'somme'], ['La @ de 50 et 20 est 30.', 'différence']], 7) },
      { etoiles: 1, col: 1, consigne: 'Pose et calcule dans ton cahier, puis écris le résultat.',
        ...rmp([['346 + 252 = @', 598], ['1 457 + 328 = @', '1 785'], ['2 609 + 1 394 = @', '4 003']], 4) },
      { etoiles: 2, consigne: 'Complète l\'addition posée (attention aux retenues).',
        eleve: plGrille([cm1Posee([['', '4586'], ['+', '2738'], ['', '7324']], '', { trous: true }), cm1Posee([['', '3095'], ['+', '907'], ['', '4002']], '', { trous: true })], 2),
        corr: plGrille([cm1Posee([['', '4586'], ['+', '2738'], ['', '7324']], '111 '), cm1Posee([['', '3095'], ['+', '907'], ['', '4002']], '111 ')], 2) },
      { etoiles: 3, cahier: true, consigne: 'Une école a commandé 1 250 cahiers en septembre, 875 en janvier et 1 380 en avril. Combien de cahiers en tout ?',
        corr: cm1Redac('Nombre de cahiers', { suite: ['1 250 + 875 = 2 125', '2 125 + 1 380 = 3 505'] }, 'L\'école a commandé 3 505 cahiers.') },
    ] },
  { titre: 'Poser une soustraction', duree: '35 min',
    attendus: ['Poser une soustraction en alignant les chiffres de même rang', 'Calculer par compensation (+10 en haut, 1+ en bas)', 'Vérifier une soustraction par une addition'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pose et calcule dans ton cahier, puis écris le résultat.',
        ...rmp([['876 − 452 = @', 424], ['5 638 − 2 415 = @', '3 223'], ['9 087 − 3 064 = @', '6 023']], 4) },
      { etoiles: 2, col: 1, consigne: 'Pose et calcule (il y a des compensations).',
        ...rmp([['752 − 386 = @', 366], ['4 305 − 1 678 = @', '2 627'], ['6 000 − 2 345 = @', '3 655']], 4) },
      { etoiles: 2, col: 1, consigne: 'Vérifie chaque soustraction par une addition. Entoure si elle est juste ou fausse.',
        ...chx([['835 − 267 = 568 (car 568 + 267 = …)', 'juste', 'juste · fausse'], ['4 000 − 1 250 = 3 850', 'fausse', 'juste · fausse']]) },
      { etoiles: 3, cahier: true, consigne: 'Le mont Blanc mesure 4 806 m. Le puy de Dôme mesure 1 465 m. Quelle est la différence de hauteur entre ces deux sommets ?',
        corr: cm1Redac('Différence de hauteur', { pose: cm1Posee([['', '4806'], ['−', '1465'], ['', '3341']]) }, 'Le mont Blanc mesure 3 341 m de plus que le puy de Dôme.') },
    ] },
  { titre: 'Calculer de tête quand c\'est possible', duree: '25 min',
    attendus: ['Choisir entre calcul mental et calcul posé', 'Ajouter ou soustraire des dizaines, des centaines, des milliers'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule de tête.',
        ...rmp([['3 400 + 500 = @', '3 900'], ['6 080 + 20 = @', '6 100'], ['5 000 − 300 = @', '4 700'], ['2 750 − 50 = @', '2 700']], 4) },
      { etoiles: 2, col: 1, consigne: 'Entoure le calcul que tu ferais de tête.',
        ...chx([['2 000 + 3 000 ou 2 487 + 3 659', '2 000 + 3 000', '2 000 + 3 000 · 2 487 + 3 659'], ['4 532 − 1 875 ou 4 500 − 100', '4 500 − 100', '4 532 − 1 875 · 4 500 − 100']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['999 + @ = 1 000', 1], ['@ + 600 = 1 000', 400], ['7 500 + @ = 8 000', 500], ['@ − 1 000 = 4 500', '5 500']], 4) },
      { etoiles: 3, cahier: true, consigne: 'Mia a 1 000 points au jeu. Elle en perd 250, puis en gagne 600. Combien de points a-t-elle ?',
        corr: cm1Redac('Après la perte', '1 000 − 250 = 750', 'Mia a 750 points.') + cm1Redac('Après le gain', '750 + 600 = 1 350', 'Mia a 1 350 points.') },
    ] },
];
})();

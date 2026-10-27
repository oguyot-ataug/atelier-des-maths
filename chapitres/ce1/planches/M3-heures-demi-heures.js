/* CE1 · Planches : Lire l'heure : heures et demi-heures (M3). */
(() => {
const { compte } = PCP, B = P3.B, R = P3.R;
const hor = (h, m, px) => cpSvg(160, 160, ce2Horloge(80, 80, 74, h * 60 + (m || 0)), px || 90);
const vide = cpSvg(160, 160, ce2Horloge(80, 80, 74, 0).replace(/<line x1="80" y1="80"[^>]*\/>/g, ''), 90);
PLANCHES['ce1|Lire l\'heure : heures et demi-heures'] = [
  { titre: 'Lire l\'heure', duree: '20 min',
    attendus: ['Lire les heures et les demi-heures sur une horloge à aiguilles'],
    exos: [
      { etoiles: 1, consigne: 'Quelle heure est-il ?', ...compte([[hor(4, 0), '4 h'], [hor(4, 30), '4 h 30'], [hor(9, 30), '9 h 30'], [hor(12, 0), '12 h']], 4, 4) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.', eleve: plGrille([vide + '<br>7 h 30', vide + '<br>2 h', vide + '<br>11 h 30'], 3), corr: plGrille([hor(7, 30) + '<br>7 h 30', hor(2, 0) + '<br>2 h', hor(11, 30) + '<br>11 h 30'], 3) },
    ] },
  { titre: 'Le matin et l\'après-midi', duree: '20 min',
    attendus: ['Passer de l\'heure du cadran à l\'heure de l\'après-midi (14 h = 2 h de l\'après-midi)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris l\'heure de l\'après-midi ou du soir.', ...P3.rmp([['3 h de l\'après-midi : @', '15 h'], ['6 h du soir : @', '18 h'], ['1 h de l\'après-midi : @', '13 h']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 heure = @ minutes', 60], ['1 demi-heure = @ minutes', 30], ['1 jour = @ heures', 24]], 2) },
    ] },
  { titre: 'Calculer une durée', duree: '25 min',
    attendus: ['Calculer une durée simple en heures et demi-heures'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'La récréation commence à 10 h et finit à 10 h 30. Combien de temps dure-t-elle ?', corr: cm1Redac('Durée de la récréation', '', 'La grande aiguille fait un demi-tour : la récréation dure 30 minutes, une demi-heure.') },
      { etoiles: 2, cahier: true, consigne: 'Le film commence à 3 h et dure 2 heures. À quelle heure finit-il ?', corr: cm1Redac('Fin du film', '3 h + 2 h = 5 h', 'Le film finit à 5 h.') },
      { etoiles: 3, cahier: true, consigne: 'Le train part à 8 h 30 et arrive à 11 h. Combien de temps dure le voyage ?', corr: cm1Redac('Durée du voyage', { suite: ['De 8 h 30 à 9 h : 30 minutes', 'De 9 h à 11 h : 2 heures'] }, 'Le voyage dure 2 heures et demie.') },
    ] },
];
})();

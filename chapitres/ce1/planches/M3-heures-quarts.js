/* CE1 · Planches : Lire l'heure : demi-heures et quarts d'heure (M3). */
(() => {
const { compte } = PCP, B = P3.B, R = P3.R;
const hor = (h, m, px) => cpSvg(160, 160, ce2Horloge(80, 80, 74, h * 60 + (m || 0)), px || 90);
const vide = cpSvg(160, 160, ce2Horloge(80, 80, 74, 0).replace(/<line x1="80" y1="80"[^>]*\/>/g, ''), 90);
PLANCHES['ce1|Lire l\'heure : demi-heures et quarts d\'heure'] = [
  { titre: 'Lire l\'heure', duree: '20 min',
    attendus: ['Lire les heures et les demi-heures sur une horloge à aiguilles'],
    exos: [
      { etoiles: 1, consigne: 'Quelle heure est-il ?', ...compte([[hor(4, 0), '4 h'], [hor(4, 30), '4 h 30'], [hor(9, 30), '9 h 30'], [hor(12, 0), '12 h']], 4, 4) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.', eleve: plGrille([vide + '<br>7 h 30', vide + '<br>2 h', vide + '<br>11 h 30'], 3), corr: plGrille([hor(7, 30) + '<br>7 h 30', hor(2, 0) + '<br>2 h', hor(11, 30) + '<br>11 h 30'], 3) },
      { etoiles: 1, consigne: 'Quelle heure est-il ?', ...compte([[hor(1, 30), '1 h 30'], [hor(6, 0), '6 h'], [hor(3, 30), '3 h 30'], [hor(10, 0), '10 h']], 4, 4) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.', eleve: plGrille([vide + '<br>5 h 30', vide + '<br>8 h', vide + '<br>12 h 30'], 3), corr: plGrille([hor(5, 30) + '<br>5 h 30', hor(8, 0) + '<br>8 h', hor(12, 30) + '<br>12 h 30'], 3) },
    ] },
  { titre: 'Les quarts d\'heure', duree: '20 min',
    attendus: ['Lire et placer « et quart » et « 45 » sur une horloge à aiguilles', 'Connaître 1 quart d\'heure = 15 minutes'],
    exos: [
      { etoiles: 1, consigne: 'Quelle heure est-il ?', ...compte([[hor(4, 15), '4 h 15'], [hor(9, 45), '9 h 45'], [hor(2, 15), '2 h 15'], [hor(7, 45), '7 h 45']], 4, 4) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.', eleve: plGrille([vide + '<br>3 h 15', vide + '<br>10 h 45', vide + '<br>6 h 15'], 3), corr: plGrille([hor(3, 15) + '<br>3 h 15', hor(10, 45) + '<br>10 h 45', hor(6, 15) + '<br>6 h 15'], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 quart d\'heure = @ minutes', 15], ['2 quarts d\'heure = @ minutes', 30], ['3 quarts d\'heure = @ minutes', 45], ['4 quarts d\'heure = @ heure', 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'C\'est l\'après-midi. Écris l\'heure comme sur une horloge digitale.', ...P3.rmp([['2 heures et quart : @', '14 : 15'], ['4 heures et demie : @', '16 : 30'], ['5 heures moins le quart : @', '16 : 45']], 4) },
      { etoiles: 3, cahier: true, consigne: 'Mamie a passé un quart d\'heure à tailler ses rosiers et une demi-heure à bêcher son potager. Combien de temps est-elle restée dans le jardin ?', corr: cm1Redac('Temps au jardin', '15 min + 30 min = 45 min', 'Mamie est restée 45 minutes dans le jardin.') },
    ] },
  { titre: 'Le matin et l\'après-midi', duree: '20 min',
    attendus: ['Passer de l\'heure du cadran à l\'heure de l\'après-midi (14 h = 2 h de l\'après-midi)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris l\'heure de l\'après-midi ou du soir.', ...P3.rmp([['3 h de l\'après-midi : @', '15 h'], ['6 h du soir : @', '18 h'], ['1 h de l\'après-midi : @', '13 h']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 heure = @ minutes', 60], ['1 demi-heure = @ minutes', 30], ['1 jour = @ heures', 24]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['16 h, c\'est @ h de l\'après-midi.', 4], ['20 h, c\'est @ h du soir.', 8], ['14 h, c\'est @ h de l\'après-midi.', 2]], 2) },
      { etoiles: 1, col: 1, consigne: 'Le matin, l\'après-midi ou le soir ? Entoure.', ...P3.chx([['On va à l\'école à 8 h 30.', 'le matin', 'le matin · le soir'], ['On goûte à 16 h 30.', 'l\'après-midi', 'le matin · l\'après-midi'], ['On se couche à 20 h 30.', 'le soir', 'l\'après-midi · le soir']]) },
      { etoiles: 2, consigne: 'C\'est l\'après-midi. Quelle heure est-il ? Écris-la comme ceci : 15 h.', ...compte([[hor(3, 0), '15 h'], [hor(5, 30), '17 h 30'], [hor(1, 0), '13 h']], 3, 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['2 demi-heures = @ heure', 1], ['1 heure et demie = @ minutes', 90]], 2) },
      { etoiles: 3, col: 1, consigne: 'Range dans l\'ordre de la journée : 13 h, 9 h, 16 h 30, 12 h.', ...P3.rmp([['@', '9 h, 12 h, 13 h, 16 h 30']], 10) },
      { etoiles: 2, col: 1, consigne: 'Écris l\'heure du matin.', ...P3.rmp([['Le réveil sonne à 7 h. Il est @ du matin.', '7 h'], ['L\'école commence à 8 h 30, c\'est le @.', 'matin']], 3) },
    ] },
  { titre: 'Calculer une durée', duree: '25 min',
    attendus: ['Calculer une durée simple en heures et demi-heures'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'La récréation commence à 10 h et finit à 10 h 30. Combien de temps dure-t-elle ?', corr: cm1Redac('Durée de la récréation', '', 'La grande aiguille fait un demi-tour : la récréation dure 30 minutes, une demi-heure.') },
      { etoiles: 2, cahier: true, consigne: 'Le film commence à 3 h et dure 2 heures. À quelle heure finit-il ?', corr: cm1Redac('Fin du film', '3 h + 2 h = 5 h', 'Le film finit à 5 h.') },
      { etoiles: 3, cahier: true, consigne: 'Le train part à 8 h 30 et arrive à 11 h. Combien de temps dure le voyage ?', corr: cm1Redac('Durée du voyage', { suite: ['De 8 h 30 à 9 h : 30 minutes', 'De 9 h à 11 h : 2 heures'] }, 'Le voyage dure 2 heures et demie.') },
      { etoiles: 1, consigne: 'Dessine les aiguilles à l\'heure de fin.',
        eleve: plGrille([hor(2, 0) + '<br>début, dure 1 heure', vide + '<br>fin', hor(6, 30) + '<br>début, dure une demi-heure', vide + '<br>fin'], 4),
        corr: plGrille([hor(2, 0) + '<br>début', hor(3, 0) + '<br>' + R('3 h'), hor(6, 30) + '<br>début', hor(7, 0) + '<br>' + R('7 h')], 4) },
      { etoiles: 2, col: 1, consigne: 'Quelle heure sera-t-il ?', ...P3.rmp([['8 h, une demi-heure plus tard : @', '8 h 30'], ['10 h 30, une demi-heure plus tard : @', '11 h'], ['4 h, deux heures plus tard : @', '6 h']], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de temps ?', ...P3.rmp([['de 9 h à 11 h : @', '2 heures'], ['de 14 h à 14 h 30 : @', '30 minutes'], ['de 7 h 30 à 8 h 30 : @', '1 heure']], 4) },
    ] },
  { titre: 'Durées et quarts d\'heure', duree: '20 min',
    attendus: ['Calculer et comparer des durées avec des quarts d\'heure'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Combien de temps ?', ...P3.rmp([['de 8 h 30 à 8 h 45 : @', '15 minutes'], ['de 15 h 45 à 16 h 15 : @', '30 minutes'], ['de midi à 20 h : @', '8 heures']], 4) },
      { etoiles: 2, col: 1, consigne: 'Quelle heure sera-t-il ?', ...P3.rmp([['9 h, un quart d\'heure plus tard : @', '9 h 15'], ['10 h 45, un quart d\'heure plus tard : @', '11 h'], ['14 h 15, une demi-heure plus tard : @', '14 h 45']], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la durée la plus longue.', ...P3.chx([['', '130 minutes', '2 heures · 130 minutes'], ['', '1 heure', '45 minutes · 1 heure'], ['', 'une demi-heure', 'un quart d\'heure · une demi-heure']]) },
      { etoiles: 3, cahier: true, consigne: 'La séance de piscine commence à 13 h 45 et finit à 14 h 30. Combien de temps dure-t-elle ?', corr: cm1Redac('Durée de la séance', { suite: ['De 13 h 45 à 14 h : 15 minutes', 'De 14 h à 14 h 30 : 30 minutes', '15 + 30 = 45'] }, 'La séance dure 45 minutes, trois quarts d\'heure.') },
    ] },
];
})();

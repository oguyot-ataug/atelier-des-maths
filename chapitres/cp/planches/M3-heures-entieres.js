/* CP · Planches : Lire l'heure : les heures entières (M3). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
// Horloge sans aiguilles, pour les dessiner.
const vide = cpSvg(160, 160, ce2Horloge(80, 80, 74, 0).replace(/<line x1="80" y1="80"[^>]*\/>/g, '').replace(/<circle cx="80" cy="80" r="5"[^>]*\/>/, '<circle cx="80" cy="80" r="4" fill="#1F3A5C"/>'), 100);
const JOURS = 'lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche';
PLANCHES['cp|Lire l\'heure : les heures entières'] = [
  { titre: 'Lire l\'heure', duree: '20 min',
    attendus: ['Lire l\'heure entière sur une horloge à aiguilles'],
    exos: [
      { etoiles: 1, consigne: 'Quelle heure est-il ?',
        ...compte([[cpHorloge(3, 90), '3 h'], [cpHorloge(7, 90), '7 h'], [cpHorloge(10, 90), '10 h'], [cpHorloge(12, 90), '12 h']], 4, 3) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.',
        eleve: plGrille([vide + '<br>2 h', vide + '<br>5 h', vide + '<br>9 h'], 3), corr: plGrille([cpHorloge(2, 100) + '<br>2 h', cpHorloge(5, 100) + '<br>5 h', cpHorloge(9, 100) + '<br>9 h'], 3) },
    ] },
  { titre: 'Une heure plus tard', duree: '20 min',
    attendus: ['Trouver l\'heure une ou deux heures plus tard'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quelle heure sera-t-il une heure plus tard ?',
        ...P3.rmp([['4 h → @', '5 h'], ['8 h → @', '9 h'], ['11 h → @', '12 h']], 3) },
      { etoiles: 2, cahier: true, consigne: 'Le film commence à 2 h. Il dure 2 heures. À quelle heure finit-il ?',
        corr: cm1Redac('Fin du film', '2 + 2 = 4', 'Le film finit à 4 h.', cpHorloge(4, 80)) },
    ] },
  { titre: 'La journée et la semaine', duree: '15 min',
    attendus: ['Ordonner les moments de la journée', 'Connaître les jours de la semaine'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec les jours.',
        ...P3.rmp([['Après lundi : @', 'mardi'], ['Avant samedi : @', 'vendredi'], ['Après dimanche : @', 'lundi']], 6) },
      { etoiles: 2, col: 1, consigne: 'Matin, midi ou soir ?',
        ...P3.rmp([['On prend le petit-déjeuner le @.', 'matin'], ['On dîne le @.', 'soir'], ['On déjeune à @.', 'midi']], 4) },
      { etoiles: 3, consigne: `Écris les 7 jours de la semaine, dans l'ordre.`, eleve: plLignes(2), corr: plListe([JOURS]) },
    ] },
];
})();

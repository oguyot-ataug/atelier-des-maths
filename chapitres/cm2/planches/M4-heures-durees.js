/* ============================================================
   CM2 · Planches : Heures et durées (M4)
   Lire l'heure (matin, après-midi) ; unités de durée ; calculer une durée, un horaire de début
   ou de fin ; lire un tableau d'horaires.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const { horloge, carte } = CM2G;
const HOR = [[3, 20, '3 h 20', '15 h 20'], [7, 45, '7 h 45', '19 h 45'], [10, 5, '10 h 05', '22 h 05'], [11, 30, '11 h 30', '23 h 30']];
const td = 'style="border:1.5px solid #1F3A5C;padding:3px 10px;text-align:center;"', th = 'style="border:1.5px solid #1F3A5C;padding:3px 10px;background:#EEF4FB;font-weight:700;text-align:left;"';
const horaires = `<table style="border-collapse:collapse;margin:4px auto;">${[['Gare', '8 h 05', '9 h 20'], ['École', '8 h 17', '9 h 32'], ['Mairie', '8 h 31', '9 h 46'], ['Piscine', '8 h 50', '10 h 05']].map(([a, b, c]) => `<tr><td ${th}>${a}</td><td ${td}>${b}</td><td ${td}>${c}</td></tr>`).join('')}</table>`;
PLANCHES['cm2|Heures et durées'] = [
  { titre: 'Lire l\'heure et convertir des durées', duree: '30 min',
    attendus: ['Lire l\'heure sur une horloge à aiguilles', 'Donner l\'heure du matin et de l\'après-midi', 'Convertir des durées (h, min, s)'],
    exos: [
      { etoiles: 1, consigne: 'Écris l\'heure indiquée par chaque horloge, le matin puis l\'après-midi (ou le soir).',
        eleve: plGrille(HOR.map(([h, m]) => carte(horloge(h, m, 100), `matin : ${B(3)}<br>après-midi : ${B(3)}`)), 4),
        corr: plGrille(HOR.map(([h, m, a, b]) => carte(horloge(h, m, 100), `matin : ${R(a)}<br>après-midi : ${R(b)}`)), 4) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Un quart d\'heure = @ min', 15], ['Une demi-heure = @ min', 30], ['Trois quarts d\'heure = @ min', 45], ['1 min = @ s', 60], ['1 jour = @ h', 24]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['2 h 15 min = @ min', 135], ['90 min = @ h @ min', 1, 30], ['200 s = @ min @ s', 3, 20], ['3 jours = @ h', 72]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 h = @ min', 60], ['1 min = @ s', 60], ['1 jour = @ h', 24]], 2) },
      { etoiles: 2, col: 1, consigne: 'Convertis.', ...P3.rmp([['2 h 30 min = @ min', 150], ['200 min = @ h @ min', 3, 20]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['15 h 30, c\'est @ de l\'après-midi.', '3 h 30'], ['21 h, c\'est @ du soir.', '9 h']], 3) },
    ] },
  { titre: 'Calculer une durée ou un horaire', duree: '35 min',
    attendus: ['Calculer une durée connaissant le début et la fin', 'Calculer un horaire de fin ou de début', 'Passer par l\'heure ronde'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la durée (passe par l\'heure ronde).',
        ...rmp([['De 8 h 30 à 10 h : @', '1 h 30 min'], ['De 14 h 45 à 16 h 10 : @', '1 h 25 min'], ['De 9 h 50 à 11 h 15 : @', '1 h 25 min']], 4) },
      { etoiles: 2, col: 1, consigne: 'Trouve l\'horaire.',
        ...rmp([['Départ 13 h 40, durée 2 h 35 min : arrivée à @', '16 h 15'], ['Arrivée 11 h 10, durée 45 min : départ à @', '10 h 25'], ['Début 18 h 50, durée 1 h 20 min : fin à @', '20 h 10']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Un film commence à 20 h 45 et dure 1 h 50 min. À quelle heure finit-il ?',
        corr: cm1Redac('Jusqu\'à l\'heure ronde', '20 h 45 + 15 min = 21 h', 'Il reste 1 h 35 min de film après 21 h.') + cm1Redac('Heure de fin', '21 h + 1 h 35 min = 22 h 35', 'Le film finit à 22 h 35.') },
      { etoiles: 3, cahier: true, consigne: 'Un train part à 7 h 52 et arrive à 10 h 18. Combien de temps dure le trajet ?',
        corr: cm1Redac('Durée du trajet', { suite: ['de 7 h 52 à 8 h : 8 min', 'de 8 h à 10 h : 2 h', 'de 10 h à 10 h 18 : 18 min', '8 min + 2 h + 18 min = 2 h 26 min'] }, 'Le trajet dure 2 h 26 min.') },
      { etoiles: 1, col: 1, consigne: 'Calcule la durée.', ...P3.rmp([['de 8 h 45 à 10 h 15 : @', '1 h 30 min'], ['de 13 h 50 à 15 h 05 : @', '1 h 15 min']], 4) },
      { etoiles: 2, col: 1, consigne: 'Trouve l\'horaire.', ...P3.rmp([['20 h 45 + 1 h 50 min : @', '22 h 35'], ['7 h 52 + 2 h 26 min : @', '10 h 18']], 3) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['départ 9 h 40, trajet 2 h 35 min : arrivée à @', '12 h 15'], ['arrivée 16 h 10, trajet 50 min : départ à @', '15 h 20']], 3) },
    ] },
  { titre: 'Problèmes d\'horaires', duree: '35 min',
    attendus: ['Lire un tableau d\'horaires', 'Calculer une durée à cheval sur deux jours', 'Résoudre un problème de durées'],
    exos: [
      { etoiles: 2, consigne: `Voici les horaires de deux bus de la ligne 3 (le matin).${horaires}`,
        ...rmp([['Le bus qui part de la gare à 8 h 05 arrive à la piscine à @.', '8 h 50'], ['Ce trajet de la gare à la piscine dure @ min.', 45], ['De l\'école à la mairie, le trajet dure @ min.', 14], ['Tom doit être à la mairie avant 9 h 40. Il prend le bus de @ à la gare.', '8 h 05']], 3) },
      { etoiles: 2, cahier: true, consigne: 'Léa se couche à 21 h 30 et se réveille à 7 h 15. Combien de temps dort-elle ?',
        corr: cm1Redac('Durée de la nuit', { suite: ['de 21 h 30 à 24 h : 2 h 30 min', 'de 0 h à 7 h 15 : 7 h 15 min', '2 h 30 min + 7 h 15 min = 9 h 45 min'] }, 'Léa dort 9 h 45 min.') },
      { etoiles: 3, cahier: true, consigne: 'Une course de voile commence le samedi à 18 h et dure 28 h. Quel jour et à quelle heure se termine-t-elle ?',
        corr: cm1Redac('Fin de la course', { suite: ['samedi 18 h + 24 h = dimanche 18 h', 'dimanche 18 h + 4 h = dimanche 22 h'] }, 'La course se termine le dimanche à 22 h.') },
      { etoiles: 2, col: 1, consigne: 'Calcule la durée.', ...P3.rmp([['de 21 h 30 à minuit : @', '2 h 30 min'], ['de minuit à 7 h 15 : @', '7 h 15 min']], 4) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['samedi 18 h, plus 28 h : @', 'dimanche 22 h']], 5) },
    ] },
];
})();

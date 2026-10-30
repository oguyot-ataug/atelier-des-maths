/* ============================================================
   CE2 · Planches : L'heure et les durées (M3)
   Lire l'heure (aiguilles, affichage digital) : et demie, moins le quart, moins vingt, 15 h 42 ;
   placer les aiguilles ; 1 h = 60 min ; durée entre deux instants d'une même journée ; problèmes à
   une ou deux étapes avec un axe du temps. Heures et minutes seulement.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { horloge } = CM2G;
const hm = m => { const h = Math.floor(m / 60), r = m % 60; return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`; };
const frise = (deb, fin, depart, bonds) => cmSauts(deb, fin, depart, bonds, { pas: 15, fmt: hm, px: 400 });
PLANCHES['ce2|L\'heure et les durées'] = [
  { titre: 'Lire l\'heure', duree: '30 min',
    attendus: ['Lire l\'heure sur une horloge à aiguilles', 'Écrire l\'heure du matin et de l\'après-midi', 'Dire « et quart », « et demie », « moins le quart »'],
    exos: [
      { etoiles: 1, consigne: 'Écris l\'heure du matin indiquée par chaque horloge.',
        eleve: plGrille([[3, 0], [8, 30], [10, 15], [6, 45]].map(([h, m]) => horloge(h, m, 92) + '<br>' + P3.B(5)), 4),
        corr: plGrille([[3, 0], [8, 30], [10, 15], [6, 45]].map(([h, m]) => horloge(h, m, 92) + '<br>' + P3.R(hm(h * 60 + m))), 4) },
      { etoiles: 2, consigne: 'Dessine les aiguilles.',
        eleve: plGrille(['7 h 30', '2 h 15', '9 h 45', '4 h 20'].map(t => horloge(null, null, 92) + '<br>' + t), 4),
        corr: plGrille([[7, 30], [2, 15], [9, 45], [4, 20]].map(([h, m]) => horloge(h, m, 92) + '<br>' + hm(h * 60 + m)), 4) },
      { etoiles: 2, col: 1, consigne: 'Écris l\'heure de l\'après-midi en chiffres.',
        ...rmp([['trois heures et demie de l\'après-midi : @', '15 h 30'], ['six heures moins le quart du soir : @', '17 h 45'], ['quatre heures moins vingt de l\'après-midi : @', '15 h 40']], 5) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'écriture qui convient.',
        ...chx([['15 h 42, c\'est…', 'les deux', 'trois heures quarante-deux · quatre heures moins dix-huit · les deux'], ['20 h 15, c\'est…', 'huit heures et quart du soir', 'huit heures et quart du soir · huit heures moins le quart']]) },
      { etoiles: 1, col: 1, consigne: 'Écris l\'heure en chiffres.', ...P3.rmp([['3 h de l\'après-midi : @', '15 h'], ['9 h du soir : @', '21 h'], ['minuit : @', '0 h']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['7 h 45, c\'est 8 h moins le @.', 'quart'], ['10 h 30, c\'est 10 h et @.', 'demie']], 3) },
    ] },
  { titre: 'Heures et minutes', duree: '25 min',
    attendus: ['Savoir que 1 h = 60 min', 'Convertir des heures en minutes et l\'inverse'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 h = @ min', 60], ['2 h = @ min', 120], ['une demi-heure = @ min', 30], ['un quart d\'heure = @ min', 15]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['1 h 20 min = @ min', 80], ['90 min = @ h @ min', 1, 30], ['75 min = @ h @ min', 1, 15], ['3 h = @ min', 180]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus longue durée.',
        ...chx([['1 h 10 min ou 75 min', '75 min', '1 h 10 min · 75 min'], ['100 min ou 2 h', '2 h', '100 min · 2 h']]) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['2 h 15 min = @ min', 135], ['100 min = @ h @ min', 1, 40], ['1 h et demie = @ min', 90]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['un quart d\'heure = @ min', 15], ['trois quarts d\'heure = @ min', 45], ['1 min = @ s', 60]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus courte durée.', ...P3.chx([['', '50 min', '1 h · 50 min'], ['', '1 h 5 min', '70 min · 1 h 5 min']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 jour = @ h', 24], ['2 jours = @ h', 48], ['1 semaine = @ jours', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quelle heure sera-t-il ?', ...P3.rmp([['8 h 45 + 30 min : @', '9 h 15'], ['11 h 50 + 15 min : @', '12 h 05']], 3) },
      { etoiles: 1, consigne: 'Entoure la durée qui convient.', ...P3.chx2([['un match de football :', '1 h 30 min', '1 h 30 min · 1 min 30 s'], ['se laver les mains :', '30 s', '30 s · 30 min'], ['une nuit de sommeil :', '10 h', '10 h · 10 min'], ['se brosser les dents :', '3 min', '3 min · 3 h']]) },
    ] },
  { titre: 'Calculer une durée', duree: '35 min',
    attendus: ['Calculer une durée entre deux instants avec un axe du temps', 'Trouver l\'heure de fin ou de début'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Le film commence à 14 h 15 et finit à 15 h 45. Combien de temps dure-t-il ?',
        corr: cm1Redac('Durée du film', { suite: ['14 h 15 → 15 h 15 : 1 h', '15 h 15 → 15 h 45 : 30 min'] }, 'Le film dure 1 h 30 min.', frise(855, 945, 855, [[60, '1 h'], [30, '30 min']])) },
      { etoiles: 2, cahier: true, consigne: 'Le cours de piscine commence à 9 h 40 et dure 45 minutes. À quelle heure finit-il ?',
        corr: cm1Redac('Heure de fin', { suite: ['9 h 40 + 20 min = 10 h', '10 h + 25 min = 10 h 25'] }, 'Le cours finit à 10 h 25.', frise(570, 630, 580, [[20, '20 min'], [25, '25 min']])) },
      { etoiles: 3, cahier: true, consigne: 'Le train part à 16 h 50 et arrive à 18 h 05. Quelle est la durée du trajet ?',
        corr: cm1Redac('Durée du trajet', { suite: ['16 h 50 → 17 h : 10 min', '17 h → 18 h : 1 h', '18 h → 18 h 05 : 5 min'] }, 'Le trajet dure 1 h 15 min.', frise(1005, 1095, 1010, [[10, '10 min'], [60, '1 h'], [5, '5 min']])) },
      { etoiles: 1, col: 1, consigne: 'Quelle heure sera-t-il ?', ...P3.rmp([['14 h 15 + 1 h 30 min : @', '15 h 45'], ['9 h 40 + 45 min : @', '10 h 25'], ['16 h 50 + 20 min : @', '17 h 10']], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de temps ?', ...P3.rmp([['de 8 h 30 à 11 h 30 : @', '3 h'], ['de 13 h 45 à 14 h 15 : @', '30 min'], ['de 10 h 50 à 12 h : @', '1 h 10 min']], 4) },
      { etoiles: 2, col: 1, consigne: 'Quelle heure était-il ?', ...P3.rmp([['1 h avant 9 h 15 : @', '8 h 15'], ['30 min avant 14 h 10 : @', '13 h 40']], 3) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['Le film dure 1 h 40 min et finit à 17 h. Il a commencé à @.', '15 h 20']], 3) },
    ] },
];
})();

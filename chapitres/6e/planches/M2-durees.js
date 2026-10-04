/* ============================================================
   6e · Planches : Heures et durée (M2)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
PLANCHES['6e|Heures et durée'] = [
  { titre: 'Unités de durée', duree: '30 min',
    attendus: ['Connaître les relations entre les unités de durée', 'Distinguer un horaire (une heure) et une durée', 'Choisir une unité adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['1 h = ' + B() + ' min', '1 min = ' + B() + ' s', '1 h = ' + B() + ' s', '1 jour = ' + B() + ' h', '1 semaine = ' + B() + ' jours']),
        corr: plListe(['1 h = ' + R(60) + ' min', '1 min = ' + R(60) + ' s', '1 h = ' + R('3 600') + ' s', '1 jour = ' + R(24) + ' h', '1 semaine = ' + R(7) + ' jours']) },
      { etoiles: 1, col: 1, consigne: 'Horaire ou durée ? Entoure.',
        ...ch([['Le film commence à 20 h 30.', 'horaire'], ['Le film dure 1 h 45 min.', 'durée'], ['Je me lève à 7 h.', 'horaire'], ['La récréation dure 15 min.', 'durée']], 'horaire · durée') },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'unité adaptée.',
        ...ch([['Durée d\'un clignement d\'œil :', 'seconde'], ['Durée d\'un match de foot :', 'minute'], ['Durée des vacances d\'été :', 'jour'], ['Âge d\'un arbre :', 'année']], 'seconde · minute · jour · année') },
      { etoiles: 2, col: 1, consigne: 'Convertis.',
        eleve: plListe(['3 h = ' + B() + ' min', '5 min = ' + B() + ' s', '2 jours = ' + B() + ' h', '240 min = ' + B() + ' h', '180 s = ' + B() + ' min']),
        corr: plListe(['3 h = ' + R(180) + ' min', '5 min = ' + R(300) + ' s', '2 jours = ' + R(48) + ' h', '240 min = ' + R(4) + ' h', '180 s = ' + R(3) + ' min']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien de secondes y a-t-il dans une journée ? Détaille ton calcul.',
        corr: cm1Redac('Calcul', { suite: ['1 h = 60 × 60 = 3 600 s', '1 jour = 24 × 3 600 s'] }, 'Une journée dure 86 400 secondes.') },
    ] },
  { titre: 'Convertir des durées', duree: '35 min',
    attendus: ['Convertir des heures et minutes en minutes, et inversement', 'Convertir des minutes et secondes', 'Comparer des durées'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Convertis en minutes.',
        eleve: plListe(['2 h 15 min = ' + B() + ' min', '1 h 40 min = ' + B() + ' min', '3 h 5 min = ' + B() + ' min', '4 h 30 min = ' + B() + ' min']),
        corr: plListe(['2 h 15 min = ' + R(135) + ' min', '1 h 40 min = ' + R(100) + ' min', '3 h 5 min = ' + R(185) + ' min', '4 h 30 min = ' + R(270) + ' min']) },
      { etoiles: 1, col: 1, consigne: 'Convertis en heures et minutes.',
        eleve: plListe(['90 min = ' + B(1) + ' h ' + B(2) + ' min', '150 min = ' + B(1) + ' h ' + B(2) + ' min', '205 min = ' + B(1) + ' h ' + B(2) + ' min', '75 min = ' + B(1) + ' h ' + B(2) + ' min']),
        corr: plListe(['90 min = ' + R(1) + ' h ' + R(30) + ' min', '150 min = ' + R(2) + ' h ' + R(30) + ' min', '205 min = ' + R(3) + ' h ' + R(25) + ' min', '75 min = ' + R(1) + ' h ' + R(15) + ' min']) },
      { etoiles: 2, col: 1, consigne: 'Convertis.',
        eleve: plListe(['2 min 30 s = ' + B() + ' s', '200 s = ' + B(1) + ' min ' + B(2) + ' s', '1 h 1 min 1 s = ' + B() + ' s']),
        corr: plListe(['2 min 30 s = ' + R(150) + ' s', '200 s = ' + R(3) + ' min ' + R(20) + ' s', '1 h 1 min 1 s = ' + R('3 661') + ' s']) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus longue durée.',
        ...ch([['1 h 20 min ou 90 min :', '90 min'], ['150 s ou 2 min 20 s :', '150 s'], ['3 jours ou 70 h :', '3 jours']], '1 h 20 min · 90 min · 150 s · 2 min 20 s · 3 jours · 70 h') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un film dure 142 minutes. Un autre dure 2 h 25 min. Lequel est le plus long, et de combien ?',
        corr: cm1Redac('Comparaison', '2 h 25 min = 145 min', 'Le second film est plus long de 145 − 142 = 3 minutes.') },
    ] },
  { titre: 'Écritures décimale et sexagésimale', duree: '35 min',
    attendus: ['Passer de 1,5 h à 1 h 30 min', 'Passer de 2 h 45 min à 2,75 h', 'Ne pas confondre 1,30 h et 1 h 30 min'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (0,1 h = 6 min ; 0,25 h = 15 min ; 0,5 h = 30 min).',
        eleve: plListe(['1,5 h = ' + B(1) + ' h ' + B(2) + ' min', '0,25 h = ' + B(2) + ' min', '2,75 h = ' + B(1) + ' h ' + B(2) + ' min', '0,1 h = ' + B(1) + ' min', '3,2 h = ' + B(1) + ' h ' + B(2) + ' min']),
        corr: plListe(['1,5 h = ' + R(1) + ' h ' + R(30) + ' min', '0,25 h = ' + R(15) + ' min', '2,75 h = ' + R(2) + ' h ' + R(45) + ' min', '0,1 h = ' + R(6) + ' min', '3,2 h = ' + R(3) + ' h ' + R(12) + ' min']) },
      { etoiles: 2, col: 1, consigne: 'Écris en heures, sous forme décimale.',
        eleve: plListe(['1 h 30 min = ' + B() + ' h', '45 min = ' + B() + ' h', '2 h 15 min = ' + B() + ' h', '12 min = ' + B() + ' h']),
        corr: plListe(['1 h 30 min = ' + R('1,5') + ' h', '45 min = ' + R('0,75') + ' h', '2 h 15 min = ' + R('2,25') + ' h', '12 min = ' + R('0,2') + ' h']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['1,30 h = 1 h 30 min', 'faux'], ['1,5 h = 90 min', 'vrai'], ['0,75 h = 45 min', 'vrai'], ['2,4 h = 2 h 40 min', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un logiciel indique qu\'un trajet dure 2,6 h. Écris cette durée en heures et minutes. Explique pourquoi ce n\'est pas 2 h 6 min.',
        corr: cm1Redac('Conversion', '0,6 h = 0,6 × 60 min = 36 min', '2,6 h = 2 h 36 min. Le « 6 » représente 6 dixièmes d\'heure, pas 6 minutes.') },
    ] },
  { titre: 'Calculer des durées et des horaires', duree: '40 min',
    attendus: ['Calculer une durée entre deux horaires', 'Calculer un horaire de fin ou de début', 'Résoudre des problèmes de durées'],
    exos: [
      { etoiles: 1, consigne: 'Complète le tableau.',
        eleve: tab(['Début', 'Durée', 'Fin'], [['8 h 15', '2 h 30 min', B()], ['13 h 40', B(), '15 h 10'], [B(), '45 min', '10 h 20'], ['22 h 50', '1 h 25 min', B()]]),
        corr: tab(['Début', 'Durée', 'Fin'], [['8 h 15', '2 h 30 min', R('10 h 45')], ['13 h 40', R('1 h 30 min'), '15 h 10'], [R('9 h 35'), '45 min', '10 h 20'], ['22 h 50', '1 h 25 min', R('0 h 15')]]) },
      { etoiles: 2, col: 1, consigne: 'Additionne les durées.',
        eleve: plListe(['1 h 40 min + 50 min = ' + B(1) + ' h ' + B(2) + ' min', '2 h 35 min + 1 h 45 min = ' + B(1) + ' h ' + B(2) + ' min', '45 s + 1 min 30 s = ' + B(1) + ' min ' + B(2) + ' s']),
        corr: plListe(['1 h 40 min + 50 min = ' + R(2) + ' h ' + R(30) + ' min', '2 h 35 min + 1 h 45 min = ' + R(4) + ' h ' + R(20) + ' min', '45 s + 1 min 30 s = ' + R(2) + ' min ' + R(15) + ' s']) },
      { etoiles: 2, col: 1, consigne: 'Un train part de Lyon à 9 h 47 et arrive à Paris à 11 h 45.',
        eleve: plListe(['Durée du trajet : ' + B(1) + ' h ' + B(2) + ' min', 'Avec 12 min de retard, il arrive à ' + B() ]),
        corr: plListe(['Durée du trajet : ' + R(1) + ' h ' + R(58) + ' min', 'Avec 12 min de retard, il arrive à ' + R('11 h 57')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un cours de 55 min commence à 8 h 05. Il est suivi de 5 min de pause, puis d\'un cours de 55 min. À quelle heure finit le deuxième cours ?',
        corr: cm1Redac('Calcul', { suite: ['8 h 05 + 55 min = 9 h', '9 h + 5 min = 9 h 05', '9 h 05 + 55 min = 10 h'] }, 'Le deuxième cours finit à 10 h.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un marathonien court 42 km en 3 h 30 min. Combien de minutes met-il, en moyenne, pour parcourir 1 km ?',
        corr: cm1Redac('Calcul', { suite: ['3 h 30 min = 210 min', '210 ÷ 42 = 5'] }, 'Il met en moyenne 5 minutes par kilomètre.') },
    ] },
];
})();

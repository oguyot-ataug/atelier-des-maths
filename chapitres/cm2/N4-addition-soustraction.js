/* ============================================================
   CHAPITRE : Addition et soustraction (CM2, N4, période 2)
   Programme du cycle 3 (CM2) : additions et soustractions posées d'entiers (≤ 6 chiffres en
   période 2) et de décimaux (jusqu'aux millièmes) ; estimer le résultat d'une opération ;
   calculs contenant une ou deux paires de parenthèses ; calcul mental : ajouter/soustraire un
   entier à un décimal, ajouter deux décimaux < 10 à un chiffre après la virgule.
   ============================================================ */
(() => {
const Po = cm1Posee;
cm1Chapitre({
  niveau: 'cm2', titre: 'Addition et soustraction', slug: 'addition-soustraction',
  cours: `
${cm1Lecon(1, 'Estimer avant de calculer')}
${cm1Regle('Pour <b>estimer</b> le résultat, on remplace chaque nombre par un nombre proche, facile à calculer. L\'estimation permet de repérer une erreur.')}
${cm1Exemple('Exemples :', ['48 917 + 31 205 ≈ 49 000 + 31 000 = 80 000.', '12,87 + 6,4 ≈ 13 + 6 = 19.', '305,6 − 98,75 ≈ 306 − 99 ≈ 207.'])}

${cm1Lecon(2, 'Poser une addition de nombres décimaux')}
${cm1Regle('On <b>aligne les virgules</b> (donc les chiffres de même rang), on complète par des zéros si besoin, et on additionne en commençant par la droite, sans oublier les retenues.')}
<div class="figure-wrap">${Po([[' ', '12,870'], ['+', ' 6,400'], ['+', ' 0,025'], [' ', '19,295']], ' 1    ')}</div>

${cm1Lecon(3, 'Poser une soustraction de nombres décimaux')}
${cm1Regle('On aligne les virgules et on complète par des zéros. Quand un chiffre du haut est trop petit, on ajoute 10 à ce chiffre et on ajoute 1 au chiffre de rang suivant du nombre du bas (méthode par compensation).')}
<div class="figure-wrap">${Po([[' ', '305,60'], ['−', ' 98,75'], [' ', '206,85']])}</div>
${cm1Exemple('Vérification :', ['206,85 + 98,75 = 305,60 ✔ — et le résultat est proche de l\'estimation 207.'])}

${cm1Lecon(4, 'Calculs avec des parenthèses')}
${cm1Regle('Dans un calcul, on effectue <b>d\'abord les calculs entre parenthèses</b>. S\'il y a des parenthèses dans des parenthèses, on commence par les plus intérieures.')}
${cm1Exemple('Exemples :', ['50 − (12 + 18) = 50 − 30 = <b>20</b>,', 'alors que 50 − 12 + 18 = 38 + 18 = 56.', '(25 − 7) + (14 − 9) = 18 + 5 = <b>23</b>.', '100 − ((40 − 15) + 30) = 100 − (25 + 30) = 100 − 55 = <b>45</b>.'])}

${cm1Lecon(5, 'Calcul mental avec les décimaux')}
${cm1Exemple('Exemples :', ['4,7 + 3 = 7,7 : on n\'ajoute qu\'aux unités.', '12,35 − 2 = 10,35 : on n\'enlève qu\'aux unités.', '8,6 + 2 = 10,6.', '2,6 + 3,7 = 5 + 1,3 = 6,3 : les unités ensemble, puis les dixièmes ensemble (13 dixièmes).', '5 − 0,4 = 4,6 : une unité, c\'est 10 dixièmes.'])}
${ce2AnimSauts('c2-as-sauts', { presets: [{ nom: '5 − 0,4', depart: 5, sauts: [[-0.4, '− 0,4']], min: 4.4, max: 5.2, fmt: v => cmNb(v), fin: '5 − 0,4 = <b>4,6</b>.' }, { nom: '2,6 + 3,7', depart: 2.6, sauts: [[3, '+ 3'], [0.4, '+ 0,4'], [0.3, '+ 0,3']], min: 2.4, max: 6.6, fmt: v => cmNb(v), fin: 'On ajoute 3, puis 0,7 en passant par l\'unité 6 : 2,6 + 3,7 = <b>6,3</b>.' }] })}
`,
  methode: `
${cm1Sous('M', 'À toi : une opération posée, pas à pas')}
${cm1AnimOperation('cm2-op-as', { a: '40', op: '−', b: '12,68', ops: ['+', '−'] })}
${cm1Demo('c2-as-pose', 'Poser une soustraction avec des zéros', 'Calcule 40 − 12,68.')}
${cm1Demo('c2-as-par', 'Calculer avec des parenthèses', 'Calcule 72 − (18,5 + 3,5) et 72 − 18,5 + 3,5. Compare.')}
`,
  demos: [
    ['c2-as-pose', [
      { expr: '40 − 12,68 ≈ 40 − 13 = 27', note: 'On estime d\'abord.' },
      { expr: '40,00 − 12,68', note: '40 = 40,00 : on écrit les centièmes pour aligner.' },
      { expr: Po([[' ', '40,00'], ['−', '12,68'], [' ', '27,32']]), note: 'On soustrait rang par rang en partant des centièmes, avec la compensation.' },
      { expr: '40 − 12,68 = 27,32', note: 'Vérification : 27,32 + 12,68 = 40. Le résultat est proche de 27. ✔' },
    ]],
    ['c2-as-par', [
      { expr: '72 − (18,5 + 3,5)', note: 'On calcule d\'abord la parenthèse.' },
      { expr: '= 72 − 22 = 50', note: '18,5 + 3,5 = 22.' },
      { expr: '72 − 18,5 + 3,5 = 53,5 + 3,5 = 57', note: 'Sans parenthèses, on calcule de gauche à droite.' },
      { expr: '50 ≠ 57', note: 'Les parenthèses changent le résultat !' },
    ]],
  ],
  exos: cm1Exos('c2as', [
    [`Calcule mentalement.${cm1Liste(['6,4 + 3', '15,82 − 5', '2,7 + 1,5', '10 − 0,3'])}`,
      cm1Redac('Calculs mentaux', { suite: ['6,4 + 3 = 9,4', '15,82 − 5 = 10,82', '2,7 + 1,5 = 4,2', '10 − 0,3 = 9,7'] }, 'On ajoute ou on enlève les unités aux unités, les dixièmes aux dixièmes.')],
    ['Une ville compte 238 605 habitants, une autre 94 870. Estime, puis calcule le nombre total d\'habitants.',
      cm1Redac('Estimation', '239 000 + 95 000 = 334 000', 'Le total doit être proche de 334 000.')
      + cm1Redac('Nombre d\'habitants', { pose: Po([[' ', '238 605'], ['+', ' 94 870'], [' ', '333 475']]) }, 'Les deux villes comptent 333 475 habitants, proche de l\'estimation.')],
    ['Trois colis pèsent 45,8 kg, 7,265 kg et 120,05 kg. Quelle est leur masse totale ?',
      cm1Redac('Masse totale', { pose: Po([[' ', ' 45,800'], ['+', '  7,265'], ['+', '120,050'], [' ', '173,115']]) }, 'Les trois colis pèsent 173,115 kg.')],
    [`Pose et calcule.${cm1Liste(['600 000 − 158 347', '18,4 − 9,625'])}`,
      cm1Redac('Première différence', { pose: Po([[' ', '600 000'], ['−', '158 347'], [' ', '441 653']]) }, '600 000 − 158 347 donne 441 653.')
      + cm1Redac('Deuxième différence', { pose: Po([[' ', '18,400'], ['−', ' 9,625'], [' ', ' 8,775']]) }, '18,4 − 9,625 donne 8,775.')],
    [`Calcule.${cm1Liste(['(35 + 15) − (20 − 8)', '100 − (45 − (12 + 8))'])}`,
      cm1Redac('Premier calcul', ['(35 + 15) − (20 − 8)', '50 − 12', '38'], 'On calcule d\'abord les parenthèses : le résultat est 38.')
      + cm1Redac('Deuxième calcul', { nom: 'B', lignes: ['100 − (45 − (12 + 8))', '100 − (45 − 20)', '100 − 25', '75'] }, 'On commence par les parenthèses les plus intérieures : le résultat est 75.')],
    ['Place des parenthèses pour que l\'égalité soit vraie : 20 − 5 + 3 = 12.',
      cm1Redac('Placement des parenthèses', ['20 − (5 + 3)', '20 − 8', '12'], 'Il faut écrire 20 − (5 + 3) = 12.')],
    ['Un sportif court 8,75 km le lundi et 12,4 km le mercredi. Il veut atteindre 30 km dans la semaine. Combien doit-il encore courir ?',
      cm1Redac('Distance déjà courue', ['8,75 + 12,4', '21,15'], 'Il a déjà couru 21,15 km.')
      + cm1Redac('Distance restante', { nom: 'B', lignes: ['30 − 21,15', '8,85'] }, 'Il doit encore courir 8,85 km.')],
  ], { titre: 'Rédaction type : « Poser une opération »', lignes: [['Estimation : 13 + 6 = 19', 'J\'estime.'], ['12,87 + 6,4 = 19,27', 'Je pose en alignant les virgules.'], ['19,27 est proche de 19 ✔', 'Je contrôle.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les signes + et −', [
    'Les signes <b>+</b> et <b>−</b> apparaissent en 1489 dans un livre d\'arithmétique commerciale de l\'Allemand <b>Johannes Widmann</b>. Il les utilisait d\'abord pour indiquer un excédent ou un manque dans des caisses de marchandises !',
    'Le « + » viendrait d\'une abréviation du mot latin <i>et</i> (« et »).',
  ]),
  quiz: [
    { q: '3,6 + 2,7 = …', opts: ['5,13', '6,3', '5,3'], correct: 1 },
    { q: '30 − (10 + 5) = …', opts: ['25', '15', '35'], correct: 1 },
    { q: 'Pour poser 12,5 + 3,75, on aligne…', opts: ['les virgules', 'les premiers chiffres', 'les derniers chiffres'], correct: 0 },
  ],
});
})();

/* ============================================================
   CM2 · Planches : Addition et soustraction (N4)
   Estimer avant de calculer ; poser une addition, une soustraction de nombres décimaux ;
   calculs avec des parenthèses ; calcul mental avec les décimaux ; problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
// Ticket de caisse.
const ticket = DS.fig(140, 150, `<path d="M20,6 H120 V136 l-8,8 l-8,-8 l-8,8 l-8,-8 l-8,8 l-8,-8 l-8,8 l-8,-8 l-8,8 l-8,-8 l-8,8 l-8,-8 Z" fill="#fff" stroke="#1F3A5C" stroke-width="1.4"/>`
  + [['Cahier', '2,35'], ['Stylos', '4,90'], ['Classeur', '6,15'], ['Règle', '1,60']].map(([a, b], i) => DS.tx([28, 30 + i * 20], a, { a: 'start', fs: 10 }) + DS.tx([112, 30 + i * 20], b + ' €', { a: 'end', fs: 10 })).join('')
  + DS.ln([28, 112], [112, 112], '#1F3A5C', 1, true) + DS.tx([28, 128], 'TOTAL', { a: 'start', fs: 10 }) + DS.tx([112, 128], '? €', { a: 'end', fs: 10, c: '#E35D3A' }), 110);
PLANCHES['cm2|Addition et soustraction'] = [
  { titre: 'Estimer, puis calculer', duree: '30 min',
    attendus: ['Estimer un ordre de grandeur avant de calculer', 'Calculer mentalement des sommes et des différences de décimaux', 'Contrôler un résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'ordre de grandeur du résultat.',
        ...chx([['398 + 205 :', 'environ 600', 'environ 500 · environ 600 · environ 700'], ['19,8 + 30,4 :', 'environ 50', 'environ 40 · environ 50 · environ 60'], ['1 003 − 497 :', 'environ 500', 'environ 400 · environ 500 · environ 1 500']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        ...rmp([['2,5 + 1,5 = @', 4], ['0,7 + 0,3 = @', 1], ['6 − 0,5 = @', '5,5'], ['3,25 + 0,75 = @', 4]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule mentalement.',
        ...rmp([['10 − 2,4 = @', '7,6'], ['4,6 + 2,8 = @', '7,4'], ['12,5 − 7,5 = @', 5], ['1 − 0,25 = @', '0,75']]) },
      { etoiles: 2, col: 1, consigne: 'Tom a fait ces calculs. Entoure les résultats faux.',
        ...ch([['12,4 + 3,8 = 15,12', 'faux'], ['20 − 4,5 = 15,5', 'juste'], ['7,05 + 2,95 = 10', 'juste'], ['8,3 − 2,15 = 6,25', 'faux']], 'juste · faux') },
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.', ...P3.rmp([['3,5 + 1,5 = @', 5], ['7,2 − 0,2 = @', 7], ['12,8 + 0,7 = @', '13,5'], ['10 − 3,4 = @', '6,6']], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'ordre de grandeur.', ...P3.chx([['4 987 + 3 012 : environ', '8 000', '7 000 · 8 000 · 9 000'], ['19,8 + 30,1 : environ', '50', '5 · 50 · 500']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['6,3 + @ = 10', '3,7'], ['0,45 + @ = 1', '0,55']], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule mentalement.', ...P3.rmp([['2 500 + 7 500 = @', '10 000'], ['100 000 − 1 = @', '99 999']], 4) },
    ] },
  { titre: 'Poser une addition, une soustraction', duree: '35 min',
    attendus: ['Aligner les chiffres de même rang (virgule sous virgule)', 'Poser et calculer une addition de décimaux', 'Poser et calculer une soustraction de décimaux'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['354,6 + 87,25 = @', '441,85'], ['1 208,5 + 96,75 = @', '1 305,25'], ['45,8 + 7,36 + 12 = @', '65,16']]) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['625,4 − 138,7 = @', '486,7'], ['80 − 23,65 = @', '56,35'], ['1 000 − 456,8 = @', '543,2']]) },
      { etoiles: 2, col: 1, consigne: 'Retrouve le chiffre caché ■.',
        ...rmp([['4■,5 + 12,3 = 59,8 : ■ = @', 7], ['92,■ − 40,5 = 51,6 : ■ = @', 1]]) },
      { etoiles: 2, cahier: true, consigne: illu(ticket, 'Voici le ticket de caisse de Mia. Calcule le total. Elle paie avec un billet de 20 €. Combien lui rend-on ?'),
        corr: cm1Redac('Total', { suite: ['2,35 + 4,90 = 7,25', '7,25 + 6,15 = 13,40', '13,40 + 1,60 = 15'] }, 'Le total est de 15 €.') + cm1Redac('Monnaie rendue', '20 − 15 = 5', 'On rend 5 € à Mia.') },
      { etoiles: 1, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.', ...P3.rmp([['45 678 + 9 345 = @', '55 023'], ['80 000 − 12 345 = @', '67 655'], ['34,5 + 7,86 = @', '42,36'], ['50 − 18,75 = @', '31,25']], 4) },
      { etoiles: 2, col: 1, consigne: 'Juste ou faux ? Entoure.', ...P3.chx([['3 456 + 1 544 = 5 000', 'juste', 'juste · faux'], ['7 000 − 2 345 = 4 765', 'faux', 'juste · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Vérifie 900 − 345 = 555 : calcule.', ...P3.rmp([['555 + 345 = @', 900]], 3) },
    ] },
  { titre: 'Parenthèses et problèmes', duree: '35 min',
    attendus: ['Calculer une expression avec des parenthèses', 'Choisir l\'opération qui convient', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule (on commence par les parenthèses).',
        ...rmp([['(15 + 5) − 8 = @', 12], ['30 − (12 + 8) = @', 10], ['(7,5 + 2,5) − (3 + 1,5) = @', '5,5']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le calcul qui correspond à la situation.',
        ...chx([['Un livre à 12,50 € et un cahier à 3,20 € : combien en tout ?', '12,50 + 3,20', '12,50 + 3,20 · 12,50 − 3,20'], ['Un fil de 3 m, on en coupe 1,25 m : combien reste-t-il ?', '3 − 1,25', '3 + 1,25 · 3 − 1,25']]) },
      { etoiles: 2, cahier: true, consigne: 'Une randonnée comporte trois étapes : 8,6 km, 12,35 km et 9,05 km. Quelle est la longueur totale ? Il reste 4,8 km après la deuxième étape pour arriver au refuge : à quel kilomètre se trouve le refuge depuis le départ ?',
        corr: cm1Redac('Longueur totale', { suite: ['8,6 + 12,35 = 20,95', '20,95 + 9,05 = 30'] }, 'La randonnée mesure 30 km.') + cm1Redac('Position du refuge', '20,95 + 4,8 = 25,75', 'Le refuge est à 25,75 km du départ.') },
      { etoiles: 3, cahier: true, consigne: 'Sur son compte, Hugo a 135,40 €. Il dépense 28,75 € puis 47,90 €, et reçoit 50 €. Combien a-t-il maintenant ?',
        corr: cm1Redac('Après les dépenses', { suite: ['135,40 − 28,75 = 106,65', '106,65 − 47,90 = 58,75'] }, 'Après ses achats, il lui reste 58,75 €.') + cm1Redac('Après les 50 €', '58,75 + 50 = 108,75', 'Hugo a maintenant 108,75 €.') },
      { etoiles: 1, col: 1, consigne: 'Calcule (on commence par les parenthèses).', ...P3.rmp([['(12 − 4) + 6 = @', 14], ['12 − (4 + 6) = @', 2], ['(25 + 15) − 10 = @', 30]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule les étapes de la randonnée.', ...P3.rmp([['8,6 + 12,35 = @', '20,95'], ['20,95 + 9,05 = @', 30]], 3) },
      { etoiles: 3, consigne: 'Calcule les étapes du compte d\'Hugo.', ...P3.rmp([['135,40 − 28,75 = @', '106,65'], ['106,65 − 47,90 = @', '58,75'], ['58,75 + 50 = @', '108,75']], 3) },
    ] },
];
})();

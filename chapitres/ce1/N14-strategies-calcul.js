/* ============================================================
   CHAPITRE : Calcul mental : stratégies jusqu'à 1 000 (CE1, N14, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul mental (champ des nombres
   jusqu'à 1 000) : ajouter ou soustraire des dizaines ou des centaines entières (234 + 60,
   765 − 200, 746 + 80) ; ajouter 9, 19 ou 29 (+ 10, + 20, + 30 puis − 1), soustraire 9 ; soustraire
   un nombre inférieur à 9 en passant par la dizaine inférieure (523 − 7) ; compléter à 100,
   calculer un écart en avançant ; doubles (1 à 15, 20 à 50, 100 à 500) et moitiés (2 à 30, 40 à
   100, 200 à 1 000), la moitié d'un nombre pair en décomposant (470 = 400 + 70) ; multiples de 25 ;
   multiplier par 10 un nombre inférieur à 100 (glisse-nombre) ; 13 × 7 = 10 × 7 + 3 × 7.
   Fluence attendue en fin de CE1 : douze résultats en trois minutes.
   Pensé pour être projeté : les sauts sur la droite, le glisse-nombre.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Calcul mental : stratégies jusqu\'à 1 000', slug: 'strategies-calcul',
  cours: `
${cm1Lecon(1, 'Ajouter ou retirer des dizaines, des centaines')}
${cm1Regle(`On s'appuie sur la numération :${cm1Liste(['234 + 60 = 294 : on ajoute 6 dizaines.', '541 − 20 = 521 : on enlève 2 dizaines.', '354 + 500 = 854 : on ajoute 5 centaines.', '765 − 200 = 565 : on enlève 2 centaines.'])}`, 'Les dizaines, les centaines')}
${ce2AnimSauts('ce1-n14-dizaines', { legende: 'Avec une retenue : on passe la centaine.', presets: [
  { nom: '746 + 80', depart: 746, sauts: Array(8).fill([10, '+ 10']), min: 740, max: 830, fin: '746 + 80 = <b>826</b> : on avance de 8 dizaines et on passe la centaine (74 dizaines et 8 dizaines, cela fait 82 dizaines).' },
  { nom: '746 + 80 (autrement)', depart: 746, sauts: [[100, '+ 100'], [-20, '− 20']], min: 740, max: 850, fin: '746 + 80 = <b>826</b> : + 100, puis − 20.' }] })}

${cm1Lecon(2, 'Arrondir pour calculer')}
${ce2AnimSauts('ce1-n14-arrondir', { legende: 'On ajoute (ou on enlève) un nombre rond, puis on corrige.', presets: [
  { nom: '46 + 19', depart: 46, sauts: [[20, '+ 20'], [-1, '− 1']], min: 40, max: 70, fin: '<b>46 + 19 = 65</b> : + 20, puis − 1.' },
  { nom: '358 + 29', depart: 358, sauts: [[30, '+ 30'], [-1, '− 1']], min: 350, max: 392, fin: '<b>358 + 29 = 387</b> : + 30, puis − 1.' },
  { nom: '83 − 9', depart: 83, sauts: [[-10, '− 10'], [1, '+ 1']], min: 70, max: 88, fin: '<b>83 − 9 = 74</b> : − 10, puis + 1.' }] })}
${cm1Regle(`${cm1Liste(['+ 9 : + 10 puis − 1', '+ 19 : + 20 puis − 1', '+ 29 : + 30 puis − 1', '− 9 : − 10 puis + 1'])}`, 'Les nombres presque ronds')}
${cm1Astuce('Pas besoin d\'arrondir pour 60 + 29 ou 51 + 19 : on ajoute directement les dizaines et les unités.')}

${cm1Lecon(3, 'Passer par la dizaine')}
${ce2AnimSauts('ce1-n14-dizaine', { legende: 'On descend d\'abord jusqu\'à la dizaine, puis on enlève le reste.', presets: [
  { nom: '523 − 7', depart: 523, sauts: [[-3, '− 3'], [-4, '− 4']], min: 512, max: 526, fin: '<b>523 − 7 = 516</b> : 7, c\'est 3 + 4.' },
  { nom: '157 − 5', depart: 157, sauts: [[-5, '− 5']], min: 148, max: 160, fin: '<b>157 − 5 = 152</b> : pas de changement de dizaine, 7 − 5 = 2.' }] })}
${cm1Regle(`523 − 7 :${cm1Liste(['523 − 3 = 520 (jusqu\'à la dizaine)', '7 = 3 + 4 : il reste 4 à enlever', '520 − 4 = 516'])}`, 'Soustraire un petit nombre')}
${cm1Regle(`Combien de 47 à 82 ?${cm1Liste(['47 + 3 = 50', '50 + 30 = 80', '80 + 2 = 82', '3 + 30 + 2 = 35'])}${P('De 47 à 82, il y a <b>35</b> : 82 − 47 = 35. De la même façon, 35 + 65 = 100.')}`, 'Calculer un écart en avançant')}

${cm1Lecon(4, 'Doubles et moitiés')}
${cm1Tableau(['Nombre', '15', '25', '35', '45', '50', '150', '250', '500'], [['Double', '30', '50', '70', '90', '100', '300', '500', '1 000']])}
${cm1Tableau(['Nombre', '30', '50', '70', '90', '100', '300', '600', '1 000'], [['Moitié', '15', '25', '35', '45', '50', '150', '300', '500']])}
${cm1Regle(`La moitié de 470 : je décompose 470 en nombres dont je connais la moitié.${cm1Liste(['470 = 400 + 70', 'la moitié de 400 : 200', 'la moitié de 70 : 35', '200 + 35 = 235'])}`, 'La moitié d\'un nombre pair')}
${cm1Exemple('Les multiples de 25 :', ['1 × 25 = 25', '2 × 25 = 50', '3 × 25 = 75', '4 × 25 = 100'])}

${cm1Lecon(5, 'Multiplier par 10')}
${ce2AnimGlisse('ce1-n14-glisse', { legende: 'Chaque chiffre prend une valeur 10 fois plus grande : les unités deviennent des dizaines, les dizaines des centaines.', presets: [{ nom: '72 × 10', n: 72, f: 10 }, { nom: '45 × 10', n: 45, f: 10 }, { nom: '8 × 10', n: 8, f: 10 }] })}
${cm1Regle('Quand on multiplie par 10, une unité devient une dizaine et une dizaine devient une centaine : 10 × 72 = 720.', 'Multiplier par 10')}

${cm1Lecon(6, 'Décomposer pour multiplier')}
${cm1Regle(`« 13 fois 7, c'est 10 fois 7 plus 3 fois 7. »${cm1Liste(['13 × 7 = 10 × 7 + 3 × 7', '13 × 7 = 70 + 21', '13 × 7 = 91'])}`, 'Avec 10 fois et le reste')}
${lig(ce1Rangees(13, 7, { p: 15 }))}
${cm1Rem('Objectif de fin de CE1 : donner <b>douze résultats en trois minutes</b>. On s\'entraîne un peu chaque jour, par exemple avec les questions flash de ce chapitre !')}
`,
  methode: `
${cm1Demo('ce1-n14-m-complement', 'Compléter à 100', '64 + … = 100')}
${cm1Demo('ce1-n14-m-ecart', 'Calculer 91 − 58 en avançant', 'Combien de 58 à 91 ?')}
`,
  demos: [
    ['ce1-n14-m-complement', [
      { expr: '64 + 6 = 70', note: 'Jusqu\'à la dizaine suivante.' },
      { expr: '70 + 30 = 100', note: 'Jusqu\'à 100.' },
      { expr: '6 + 30 = 36', note: '<b>64 + 36 = 100</b>.' },
    ]],
    ['ce1-n14-m-ecart', [
      { expr: '58 + 2 = 60', note: 'Jusqu\'à la dizaine.' },
      { expr: '60 + 30 = 90', note: 'Les dizaines.' },
      { expr: '90 + 1 = 91', note: 'Le reste.' },
      { expr: '2 + 30 + 1 = 33', note: '<b>91 − 58 = 33</b>.' },
    ]],
  ],
  exos: cm1Exos('ce1-n14', [
    ['Complète : 75 + … = 100.',
      cm1Redac('Aller à 100', { suite: ['75 + 5 = 80', '80 + 20 = 100', '5 + 20 = 25'] }, '75 + 25 = 100.')],
    ['Calcule : 37 + 19.',
      cm1Redac('37 + 19', { suite: ['37 + 20 = 57', '57 − 1 = 56'] }, '37 + 19 = 56.')],
    ['Calcule : 64 − 9.',
      cm1Redac('64 − 9', { suite: ['64 − 10 = 54', '54 + 1 = 55'] }, '64 − 9 = 55.')],
    ['Quel est le double de 45 ?',
      cm1Redac('Double de 45', { suite: ['40 + 40 = 80', '5 + 5 = 10', '80 + 10 = 90'] }, 'Le double de 45, c\'est 90.')],
    ['Quelle est la moitié de 80 ?',
      cm1Redac('Moitié de 80', '40 + 40 = 80', 'La moitié de 80, c\'est 40.')],
    ['Calcule : 73 − 46 en avançant de 46 à 73.',
      cm1Redac('73 − 46', { suite: ['46 + 4 = 50', '50 + 20 = 70', '70 + 3 = 73', '4 + 20 + 3 = 27'] }, '73 − 46 = 27.')],
    ['Calcule : 634 − 6.',
      cm1Redac('634 − 6', { suite: ['634 − 4 = 630', '630 − 2 = 628'] }, '634 − 6 = 628.')],
    ['Calcule : 10 × 56.',
      cm1Redac('10 × 56', '10 × 56 = 560', 'Les 5 dizaines deviennent 5 centaines, les 6 unités deviennent 6 dizaines : 10 × 56 = 560.')],
    ['Quelle est la moitié de 360 ?',
      cm1Redac('Moitié de 360', { suite: ['360 = 300 + 60', '150 + 30 = 180'] }, 'La moitié de 360, c\'est 180.')],
    ['Calcule : 14 × 6.',
      cm1Redac('14 × 6', { lignes: ['10 × 6 + 4 × 6', '60 + 24', '84'] }, '14 × 6 = 84.')],
    ['Calcule : 3 × 25.',
      cm1Redac('3 × 25', '3 × 25 = 75', '3 × 25 = 75 (25, 50, 75).')],
    ['Hugo a 100 €. Il achète un vélo à 79 €. Combien lui reste-t-il ?',
      cm1Redac('Argent de Hugo', { suite: ['79 + 1 = 80', '80 + 20 = 100', '1 + 20 = 21'] }, 'Il reste 21 € à Hugo.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les champions du calcul mental', [
    '<b>Jacques Inaudi</b>, né en 1867 dans les Alpes italiennes, était berger. Il calculait de tête, sans savoir lire ni écrire les chiffres au début ! Plus tard, il a fait des spectacles à Paris.',
    'Des savants de l\'Académie des sciences l\'ont étudié : il entendait les nombres « dans sa tête », comme une musique. Aujourd\'hui, il existe des championnats du monde de calcul mental.',
  ]),
  quiz: [
    { q: '45 + … = 100', opts: ['55', '65', '45'], correct: 0 },
    { q: '38 + 19 = …', opts: ['57', '58', '47'], correct: 0 },
    { q: 'Le double de 35 :', opts: ['70', '65', '60'], correct: 0 },
    { q: '10 × 72 = …', opts: ['720', '7 210', '82'], correct: 0 },
    { q: '523 − 7 = …', opts: ['516', '526', '520'], correct: 0 },
    { q: '13 × 7 = …', opts: ['91', '137', '21'], correct: 0 },
  ],
  flash: [
    { l: 3, q: '80 + … = 100', r: ['20', '30', '10', '120'], ok: 0 },
    { l: 3, q: '55 + … = 100', r: ['45', '55', '35', '50'], ok: 0 },
    { l: 2, q: '26 + 9 = …', r: ['35', '36', '34', '25'], ok: 0 },
    { l: 2, q: '50 − 19 = …', r: ['31', '29', '41', '30'], ok: 0 },
    { l: 4, q: 'La moitié de 60 :', r: ['30', '120', '20', '35'], ok: 0 },
    { l: 1, q: '354 + 500 = …', r: ['854', '359', '804', '904'], ok: 0 },
    { l: 1, q: '765 − 200 = …', r: ['565', '745', '965', '563'], ok: 0 },
    { l: 3, q: '523 − 7 = …', r: ['516', '526', '514', '517'], ok: 0 },
    { l: 3, q: 'De 38 à 50 : …', r: ['12', '22', '88', '13'], ok: 0 },
    { l: 4, q: 'La moitié de 1 000 :', r: ['500', '50', '2 000', '250'], ok: 0 },
    { l: 4, q: '4 × 25 = …', r: ['100', '425', '75', '125'], ok: 0 },
    { l: 5, q: '10 × 36 = …', r: ['360', '46', '3 610', '306'], ok: 0 },
    { l: 6, q: '12 × 6 = …', r: ['72', '62', '126', '18'], ok: 0 },
  ],
});
})();

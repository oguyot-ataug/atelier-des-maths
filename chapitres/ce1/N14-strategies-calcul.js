/* ============================================================
   CHAPITRE : Calcul mental : stratégies jusqu'à 100 (CE1, N14, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul mental et réfléchi :
   compléments à la dizaine et à 100 (35 + … = 100), ajouter et soustraire 9, 11, 19, 21 en
   arrondissant, décomposer (47 + 25 = 47 + 3 + 22), calculer des écarts en avançant, doubles et
   moitiés de nombres jusqu'à 100 (le double de 35, la moitié de 60), multiplier par 2, 5, 10.
   Pensé pour être projeté : les chemins dans le tableau des nombres, les sauts sur la droite.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Calcul mental : stratégies jusqu\'à 100', slug: 'strategies-calcul',
  cours: `
${cm1Lecon(1, 'Aller à 100')}
${cm1Regle(`Pour aller de 35 à 100 :${cm1Liste(['35 + 5 = 40 (jusqu\'à la dizaine)', '40 + 60 = 100 (jusqu\'à 100)', '5 + 60 = 65'])}${P('Donc <b>35 + 65 = 100</b>. Les dizaines font 9 (3 + 6), les unités font 10 (5 + 5).')}`, 'Le complément à 100')}
${cm1Axe(30, 100, 5, 10, [[35, '35'], [40, '40']], { L: 480 })}

${cm1Lecon(2, 'Arrondir pour calculer')}
${cpAnimTableau('ce1-n14-tableau', { legende: 'On ajoute (ou on enlève) un nombre rond, puis on corrige.', presets: [
  { nom: '46 + 19', de: 46, sauts: [10, 10, -1], fin: '<b>46 + 19 = 65</b> : + 20, puis − 1.' },
  { nom: '58 + 11', de: 58, sauts: [10, 1], fin: '<b>58 + 11 = 69</b> : + 10, puis + 1.' },
  { nom: '83 − 21', de: 83, sauts: [-10, -10, -1], fin: '<b>83 − 21 = 62</b> : − 20, puis − 1.' },
  { nom: '72 − 19', de: 72, sauts: [-10, -10, 1], fin: '<b>72 − 19 = 53</b> : − 20, puis + 1.' }] })}
${cm1Regle(`${cm1Liste(['+ 9 : + 10 puis − 1', '+ 19 : + 20 puis − 1', '− 9 : − 10 puis + 1', '+ 21 : + 20 puis + 1'])}`, 'Les nombres presque ronds')}

${cm1Lecon(3, 'Doubles et moitiés')}
${cm1Regle(`Le double de 35 : le double de 30, puis le double de 5.${cm1Liste(['30 + 30 = 60', '5 + 5 = 10', '60 + 10 = 70'])}${P('La moitié de 70, c\'est donc 35.')}`, 'Doubles')}
${cm1Exemple('À connaître :', ['le double de 25 : 50 ; la moitié de 50 : 25', 'le double de 50 : 100 ; la moitié de 100 : 50', 'la moitié de 30 : 15 ; la moitié de 90 : 45'])}

${cm1Lecon(4, 'Calculer un écart en avançant')}
${cm1Regle(`Combien de 47 à 82 ?${cm1Liste(['47 + 3 = 50', '50 + 30 = 80', '80 + 2 = 82', '3 + 30 + 2 = 35'])}${P('De 47 à 82, il y a <b>35</b> : 82 − 47 = 35.')}`, 'Avancer par bonds')}
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
  ],
  flash: [
    { l: 1, q: '80 + … = 100', r: ['20', '30', '10', '120'], ok: 0 },
    { l: 1, q: '55 + … = 100', r: ['45', '55', '35', '50'], ok: 0 },
    { l: 2, q: '26 + 9 = …', r: ['35', '36', '34', '25'], ok: 0 },
    { l: 2, q: '50 − 19 = …', r: ['31', '29', '41', '30'], ok: 0 },
    { l: 3, q: 'La moitié de 60 :', r: ['30', '120', '20', '35'], ok: 0 },
    { l: 4, q: 'De 38 à 50 : …', r: ['12', '22', '88', '13'], ok: 0 },
  ],
});
})();

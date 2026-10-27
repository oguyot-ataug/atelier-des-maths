/* ============================================================
   CHAPITRE : Ajouter 9, aller à la dizaine (CP, N14, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, calcul mental : compléter à la
   dizaine supérieure (36 + … = 40), ajouter en passant par la dizaine (8 + 5 = 8 + 2 + 3 ;
   47 + 5 = 47 + 3 + 2), ajouter 9 en ajoutant 10 puis en enlevant 1 ; s'appuyer sur les boîtes de
   dix, la bande et le tableau des nombres.
   Pensé pour être projeté : les jetons qui complètent la boîte de dix, puis passent dans la suivante.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Deux boîtes de dix : a jetons rouges, puis b jetons verts qui complètent la première boîte.
function deuxBoites(a, b){
  const c1 = Math.min(b, 10 - a), c2 = b - c1;
  return lig(cpBoiteDix(a + c1, { c: 24, couleurs: Array(a).fill(CPC.jeton).concat(Array(c1).fill(CE2C.vert)) }), cpBoiteDix(c2, { c: 24, couleurs: Array(10).fill(CPC.jeton2) }));
}

cm1Chapitre({
  niveau: 'cp', titre: 'Ajouter 9, aller à la dizaine', slug: 'passer-dizaine',
  cours: `
${cm1Lecon(1, 'Aller jusqu\'à la dizaine')}
${cm1Regle(`Pour aller de 36 à 40, il manque <b>4</b> : comme 6 + 4 = 10.${lig(cpBande(34, 41, { on: [36, 40], c: 34 }))}${P('<b>36 + 4 = 40</b>')}`, 'Le complément')}
${cm1Astuce('Les compléments à 10 (1 et 9, 2 et 8, 3 et 7, 4 et 6, 5 et 5) servent pour toutes les dizaines : 53 + 7 = 60, car 3 + 7 = 10.')}

${cm1Lecon(2, 'Passer la dizaine')}
${cpAnimDixPlus('cp-n14-dix', { a: 8, b: 5 })}
${cm1Regle(`8 + 5 : je complète d'abord la boîte de dix.${deuxBoites(8, 5)}${cm1Liste(['8 + 2 = 10', '10 + 3 = 13'])}${P('5, c\'est 2 et 3. Donc <b>8 + 5 = 13</b>.')}`, 'Passer par 10')}
${cm1Exemple('Avec des nombres plus grands : 47 + 5', ['47 + 3 = 50', '50 + 2 = 52'])}
${cm1Exemple('Et 28 + 6', ['28 + 2 = 30', '30 + 4 = 34'])}

${cm1Lecon(3, 'Ajouter 9')}
${cpAnimTableau('cp-n14-neuf', { legende: 'Ajouter 9, c\'est ajouter 10 (une ligne plus bas) puis reculer de 1 (une case à gauche).', presets: [
  { nom: '24 + 9', de: 24, sauts: [10, -1], fin: '<b>24 + 9 = 33</b> : + 10 donne 34, − 1 donne 33.' },
  { nom: '57 + 9', de: 57, sauts: [10, -1], fin: '<b>57 + 9 = 66</b>' },
  { nom: '38 + 19', de: 38, sauts: [10, 10, -1], fin: '<b>38 + 19 = 57</b> : 19, c\'est 20 − 1.' }] })}
${cm1Regle(`9, c'est 10 − 1.${cm1Liste(['24 + 10 = 34', '34 − 1 = 33'])}${P('Donc <b>24 + 9 = 33</b>.')}`, 'Astuce du 9')}

${cm1Lecon(4, 'Choisir sa méthode')}
${cm1Regle(`Pour 7 + 9, deux méthodes :${cm1Liste(['passer par 10 : 7 + 3 = 10,', 'puis 10 + 6 = 16 ;', 'ou ajouter 10 : 7 + 10 = 17,', 'puis enlever 1 : 17 − 1 = 16.'])}Les deux donnent 16 : chacun choisit la méthode qu'il préfère.`, 'Au choix')}
`,
  methode: `
${cm1Demo('cp-n14-m-dix', 'Calculer 7 + 6 en passant par 10', 'Complète d\'abord la dizaine.')}
${cm1Demo('cp-n14-m-neuf', 'Calculer 45 + 9', 'Utilise l\'astuce du 9.')}
`,
  demos: [
    ['cp-n14-m-dix', [
      { expr: '7 + 3 = 10', note: 'Il manque 3 pour remplir la boîte.', fig: deuxBoites(7, 3) },
      { expr: '6 = 3 + 3', note: 'J\'ai utilisé 3 des 6 jetons, il en reste 3.' },
      { expr: '10 + 3 = 13', note: 'Donc <b>7 + 6 = 13</b>.', fig: deuxBoites(7, 6) },
    ]],
    ['cp-n14-m-neuf', [
      { expr: '45 + 10 = 55', note: 'J\'ajoute 10 : une dizaine de plus.' },
      { expr: '55 − 1 = 54', note: 'J\'ai ajouté 1 de trop : je l\'enlève.' },
      { expr: '45 + 9 = 54', note: 'Le résultat.' },
    ]],
  ],
  exos: cm1Exos('cp-n14', [
    ['Complète : 26 + … = 30.',
      cm1Redac('Aller à 30', '26 + 4 = 30', 'Il manque 4 pour aller à 30.')],
    ['Calcule : 9 + 4.',
      cm1Redac('9 + 4', { suite: ['9 + 1 = 10', '10 + 3 = 13'] }, '9 + 4 = 13.', deuxBoites(9, 4))],
    ['Calcule : 8 + 7.',
      cm1Redac('8 + 7', { suite: ['8 + 2 = 10', '10 + 5 = 15'] }, '8 + 7 = 15.', deuxBoites(8, 7))],
    ['Calcule : 36 + 9.',
      cm1Redac('36 + 9', { suite: ['36 + 10 = 46', '46 − 1 = 45'] }, '36 + 9 = 45.')],
    ['Calcule : 58 + 5.',
      cm1Redac('58 + 5', { suite: ['58 + 2 = 60', '60 + 3 = 63'] }, '58 + 5 = 63.', cpSautsBande(58, 5, { de: 56, a: 64, px: 280 }))],
    ['Zoé a 29 autocollants. Elle en reçoit 9. Combien en a-t-elle ?',
      cm1Redac('Autocollants de Zoé', { suite: ['29 + 10 = 39', '39 − 1 = 38'] }, 'Zoé a 38 autocollants.')],
    ['Dans le car, il y a 44 enfants. 8 enfants montent encore. Combien y a-t-il d\'enfants dans le car ?',
      cm1Redac('Enfants dans le car', { suite: ['44 + 6 = 50', '50 + 2 = 52'] }, 'Il y a 52 enfants dans le car.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : calculer de tête', [
    'Avant les calculatrices, les marchands calculaient de tête très vite, avec des astuces comme celles de ce chapitre : passer par la dizaine, ajouter 10 puis enlever 1…',
    'Au XIX<sup>e</sup> siècle, un jeune berger italien, <b>Vito Mangiamele</b>, et d\'autres « calculateurs prodiges » faisaient des spectacles où ils calculaient de tête plus vite que les savants ! Leur secret : connaître par cœur les petits calculs et les combiner.',
  ]),
  quiz: [
    { q: '27 + … = 30', opts: ['3', '7', '13'], correct: 0 },
    { q: '8 + 6 = …', opts: ['14', '12', '16'], correct: 0 },
    { q: '43 + 9 = …', opts: ['52', '53', '49'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '34 + … = 40', r: ['6', '4', '16', '10'], ok: 0 },
    { l: 1, q: '62 + … = 70', r: ['8', '2', '18', '10'], ok: 0 },
    { l: 2, q: '9 + 5 = …', r: ['14', '13', '15', '45'], ok: 0 },
    { l: 2, q: '7 + 8 = …', r: ['15', '14', '16', '13'], ok: 0 },
    { l: 3, q: '15 + 9 = …', r: ['24', '25', '23', '14'], ok: 0 },
    { l: 3, q: '61 + 9 = …', r: ['70', '71', '69', '60'], ok: 0 },
    { l: 4, q: '38 + 5 = …', r: ['43', '33', '42', '48'], ok: 0 },
  ],
});
})();

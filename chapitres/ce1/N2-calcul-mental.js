/* ============================================================
   CHAPITRE : Calcul mental : ajouter et soustraire (CE1, N2, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul mental : tables d'addition
   (résultats mémorisés), compléments à 10 et à la dizaine supérieure, ajouter ou soustraire des
   dizaines, décomposer pour calculer (23 + 14 = 23 + 10 + 4), passer la dizaine (8 + 5, 47 + 6),
   ajouter ou soustraire 9 et 11.
   Pensé pour être projeté : la boîte de dix complétée, le chemin dans le tableau des nombres.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Calcul mental : ajouter et soustraire', slug: 'calcul-mental',
  cours: `
${cm1Lecon(1, 'Les résultats à connaître par cœur')}
${cm1Regle(`${cm1Liste(['les compléments à 10 : 3 + 7, 4 + 6, 2 + 8… ;', 'les doubles : 6 + 6 = 12, 7 + 7 = 14, 8 + 8 = 16, 9 + 9 = 18 ;', 'la table d\'addition : tous les calculs jusqu\'à 9 + 9.'])}`, 'À savoir')}
${cm1Astuce('Si on connaît 6 + 6 = 12, on trouve vite 6 + 7 = 13 (le double, et encore 1).')}

${cm1Lecon(2, 'Passer la dizaine')}
${cpAnimDixPlus('ce1-n2-dix', { a: 7, b: 6 })}
${cm1Regle(`47 + 6 : je complète jusqu'à 50, puis j'ajoute le reste.${cm1Liste(['47 + 3 = 50', '50 + 3 = 53'])}${P('6, c\'est 3 et 3. Donc <b>47 + 6 = 53</b>.')}`, 'Passer par la dizaine')}
${cm1Regle(`52 − 5 : je recule jusqu'à 50, puis j'enlève le reste.${cm1Liste(['52 − 2 = 50', '50 − 3 = 47'])}${P('Donc <b>52 − 5 = 47</b>.')}`, 'Et pour soustraire')}

${cm1Lecon(3, 'Ajouter ou soustraire des dizaines')}
${cpAnimTableau('ce1-n2-tableau', { presets: [
  { nom: '34 + 20', de: 34, sauts: [10, 10] },
  { nom: '86 − 30', de: 86, sauts: [-10, -10, -10] },
  { nom: '45 + 9', de: 45, sauts: [10, -1], fin: '<b>45 + 9 = 54</b> : + 10, puis − 1.' },
  { nom: '63 − 9', de: 63, sauts: [-10, 1], fin: '<b>63 − 9 = 54</b> : − 10, puis + 1.' }] })}
${cm1Regle('Ajouter 9, c\'est ajouter 10 puis enlever 1. Enlever 9, c\'est enlever 10 puis ajouter 1. Pour 11 : + 10 puis + 1.', 'Les astuces du 9 et du 11')}

${cm1Lecon(4, 'Décomposer pour calculer')}
${cm1Regle(`23 + 14 : j'ajoute d'abord les dizaines, puis les unités.${cm1Liste(['23 + 10 = 33', '33 + 4 = 37'])}${P('Donc <b>23 + 14 = 37</b>.')}`, 'Décomposer')}
${cm1Regle(`68 − 25 : j'enlève d'abord les dizaines, puis les unités.${cm1Liste(['68 − 20 = 48', '48 − 5 = 43'])}${P('Donc <b>68 − 25 = 43</b>.')}`)}
`,
  methode: `
${cm1Demo('ce1-n2-m-ajout', 'Calculer 38 + 25 de tête', 'Décompose 25 pour calculer.')}
${cm1Demo('ce1-n2-m-retrait', 'Calculer 71 − 8 de tête', 'Passe par la dizaine.')}
`,
  demos: [
    ['ce1-n2-m-ajout', [
      { expr: '25 = 20 + 5', note: 'Je décompose le deuxième nombre.' },
      { expr: '38 + 20 = 58', note: 'J\'ajoute les dizaines.' },
      { expr: '58 + 2 = 60', note: 'Puis les unités, en passant par 60 (5 = 2 + 3).' },
      { expr: '60 + 3 = 63', note: '<b>38 + 25 = 63</b>.' },
    ]],
    ['ce1-n2-m-retrait', [
      { expr: '8 = 1 + 7', note: '1 pour arriver à 70, 7 pour continuer.' },
      { expr: '71 − 1 = 70', note: 'Je recule jusqu\'à la dizaine.' },
      { expr: '70 − 7 = 63', note: '<b>71 − 8 = 63</b>.', fig: cpSautsBande(71, -8, { de: 62, a: 72, px: 330 }) },
    ]],
  ],
  exos: cm1Exos('ce1-n2', [
    ['Calcule : 7 + 8.',
      cm1Redac('7 + 8', { suite: ['7 + 7 = 14', '14 + 1 = 15'] }, '7 + 8 = 15 (le double de 7, et encore 1).')],
    ['Complète : 64 + … = 70.',
      cm1Redac('Aller à 70', '64 + 6 = 70', 'Il manque 6.')],
    ['Calcule : 56 + 7.',
      cm1Redac('56 + 7', { suite: ['56 + 4 = 60', '60 + 3 = 63'] }, '56 + 7 = 63.')],
    ['Calcule : 43 − 6.',
      cm1Redac('43 − 6', { suite: ['43 − 3 = 40', '40 − 3 = 37'] }, '43 − 6 = 37.')],
    ['Calcule : 27 + 9.',
      cm1Redac('27 + 9', { suite: ['27 + 10 = 37', '37 − 1 = 36'] }, '27 + 9 = 36.')],
    ['Calcule : 45 + 32.',
      cm1Redac('45 + 32', { suite: ['45 + 30 = 75', '75 + 2 = 77'] }, '45 + 32 = 77.')],
    ['Mamie a 85 €. Elle dépense 40 €. Combien lui reste-t-il ?',
      cm1Redac('Argent de mamie', '85 − 40 = 45', 'Il reste 45 € à mamie.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le petit Gauss', [
    'On raconte qu\'un jour, vers 1786, un maître d\'école allemand demanda à ses élèves d\'ajouter tous les nombres de 1 à 100, pour avoir la paix. Le petit <b>Carl Friedrich Gauss</b>, 9 ans, trouva la réponse en quelques minutes : 5 050 !',
    'Son astuce : 1 + 100 = 101, 2 + 99 = 101, 3 + 98 = 101… Il y a 50 paires qui font 101. Gauss est devenu l\'un des plus grands mathématiciens de l\'histoire. Le calcul mental, c\'est d\'abord trouver la bonne astuce !',
  ]),
  quiz: [
    { q: '8 + 6 = …', opts: ['14', '13', '15'], correct: 0 },
    { q: '58 + 9 = …', opts: ['67', '68', '57'], correct: 0 },
    { q: '74 − 30 = …', opts: ['44', '71', '104'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '9 + 9 = …', r: ['18', '19', '81', '16'], ok: 0 },
    { l: 1, q: '6 + 7 = …', r: ['13', '12', '14', '67'], ok: 0 },
    { l: 2, q: '38 + 5 = …', r: ['43', '33', '42', '88'], ok: 0 },
    { l: 2, q: '61 − 4 = …', r: ['57', '65', '56', '47'], ok: 0 },
    { l: 3, q: '52 + 30 = …', r: ['82', '55', '85', '62'], ok: 0 },
    { l: 3, q: '40 − 9 = …', r: ['31', '49', '30', '41'], ok: 0 },
    { l: 4, q: '24 + 13 = …', r: ['37', '27', '47', '36'], ok: 0 },
  ],
});
})();

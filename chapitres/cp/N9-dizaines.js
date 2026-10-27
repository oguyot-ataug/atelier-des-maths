/* ============================================================
   CHAPITRE : Ajouter et soustraire des dizaines (CP, N9, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, calcul mental : ajouter ou
   soustraire 10 et des dizaines entières à un nombre de deux chiffres (34 + 20, 67 − 30), calculer
   avec des dizaines entières (40 + 30 = 70, « 4 dizaines + 3 dizaines = 7 dizaines »), s'appuyer sur
   le tableau des nombres et sur les barres de dix.
   Pensé pour être projeté : le chemin dans le tableau des nombres.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Deux collections de barres côte à côte : « a » puis « + b » (b en couleur claire).
const ajout = (a, b) => lig(cpBarres(a, { q: 8 }), '<b style="font-size:1.4rem;">+</b>', cpBarres(b, { q: 8, cd: '#7FCBA6' }));

cm1Chapitre({
  niveau: 'cp', titre: 'Ajouter et soustraire des dizaines', slug: 'dizaines',
  cours: `
${cm1Lecon(1, 'Ajouter 10')}
${cpAnimTableau('cp-n9-tableau', { presets: [
  { nom: '23 + 10 + 10 + 10', de: 23, sauts: [10, 10, 10], fin: '<b>23 + 30 = 53</b> : on est descendu de 3 lignes, le chiffre des unités n\'a pas changé.' },
  { nom: '78 − 10 − 10', de: 78, sauts: [-10, -10], fin: '<b>78 − 20 = 58</b> : on est monté de 2 lignes.' },
  { nom: '45 + 1 et + 10', de: 45, sauts: [1, 1, 10], fin: '<b>45 + 12 = 57</b> : deux cases à droite (+ 2), une ligne plus bas (+ 10).' }] })}
${cm1Regle(`Quand on ajoute <b>10</b>, on ajoute une barre : le chiffre des <b>dizaines</b> augmente de 1, le chiffre des unités ne change pas.${lig(cpBarres(36, { q: 8 }), cpBarres(46, { q: 8 }))}${P('36 + 10 = 46')}`, 'Ajouter 10')}

${cm1Lecon(2, 'Ajouter des dizaines')}
${cm1Def(`${ajout(34, 20)}${P('34 + 20 : 3 barres + 2 barres = 5 barres, et toujours 4 cubes. <b>34 + 20 = 54</b>.')}`, 'Ajouter des dizaines')}
${cm1Astuce('On compte de dix en dix à partir du nombre : 34… 44, 54.')}

${cm1Lecon(3, 'Soustraire des dizaines')}
${cm1Def(`${lig(cpBarres(67, { q: 8 }))}${P('67 − 30 : on enlève 3 barres. Il reste 3 barres et 7 cubes. <b>67 − 30 = 37</b>.')}`, 'Enlever des dizaines')}
${cm1Astuce('On recule de dix en dix : 67… 57, 47, 37.')}

${cm1Lecon(4, 'Calculer avec des dizaines entières')}
${cm1Regle(`${ajout(40, 30)}${P('4 dizaines + 3 dizaines = 7 dizaines : <b>40 + 30 = 70</b>.')}`, 'Comme 4 + 3')}
${cm1Exemple('Comme avec les petits nombres :', ['5 + 2 = 7, donc 50 + 20 = 70.', '9 − 4 = 5, donc 90 − 40 = 50.', '6 + 4 = 10, donc 60 + 40 = 100.'])}
`,
  methode: `
${cm1Demo('cp-n9-m-ajout', 'Calculer 52 + 30', 'Ajoute 30 à 52.')}
${cm1Demo('cp-n9-m-retrait', 'Calculer 85 − 40', 'Enlève 40 à 85.')}
`,
  demos: [
    ['cp-n9-m-ajout', [
      { expr: '52 = 50 + 2', note: '5 dizaines et 2 unités.' },
      { expr: '50 + 30 = 80', note: 'Je ne change que les dizaines : 5 + 3 = 8.', fig: ajout(52, 30) },
      { expr: '52 + 30 = 82', note: 'Les 2 unités restent : 8 dizaines et 2 unités.' },
    ]],
    ['cp-n9-m-retrait', [
      { expr: '85 = 80 + 5', note: '8 dizaines et 5 unités.' },
      { expr: '80 − 40 = 40', note: '8 − 4 = 4 dizaines.' },
      { expr: '85 − 40 = 45', note: 'Les 5 unités restent.', fig: cpBarres(45, { q: 8 }) },
    ]],
  ],
  exos: cm1Exos('cp-n9', [
    ['Calcule : 47 + 10.',
      cm1Redac('47 + 10', '47 + 10 = 57', 'Une dizaine de plus : 47 + 10 = 57.')],
    ['Calcule : 63 − 10.',
      cm1Redac('63 − 10', '63 − 10 = 53', 'Une dizaine de moins : 63 − 10 = 53.')],
    ['Calcule : 30 + 50.',
      cm1Redac('30 + 50', '30 + 50 = 80', '3 dizaines + 5 dizaines = 8 dizaines : 30 + 50 = 80.')],
    ['Calcule : 26 + 40.',
      cm1Redac('26 + 40', '26 + 40 = 66', 'On ajoute 4 dizaines aux 2 dizaines : 26 + 40 = 66.', ajout(26, 40))],
    ['Calcule : 98 − 50.',
      cm1Redac('98 − 50', '98 − 50 = 48', 'On enlève 5 dizaines : 98 − 50 = 48.')],
    ['Hugo a 35 images. Pour son anniversaire, on lui en offre 20. Combien a-t-il d\'images ?',
      cm1Redac('Images de Hugo', '35 + 20 = 55', 'Hugo a 55 images.', ajout(35, 20))],
    ['Dans un bus, il y a 72 passagers. À l\'arrêt, 30 passagers descendent. Combien en reste-t-il ?',
      cm1Redac('Passagers qui restent', '72 − 30 = 42', 'Il reste 42 passagers dans le bus.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le boulier', [
    'Le <b>boulier</b> est un outil à calculer très ancien, utilisé en Chine, au Japon et en Russie. Chaque tringle a ses boules : une tringle pour les unités, une pour les dizaines…',
    'Pour ajouter 30, on pousse 3 boules sur la tringle des dizaines, sans toucher aux unités. Exactement comme ajouter 3 barres de dix ! Dans certains pays, on apprend encore à calculer avec un boulier.',
  ]),
  quiz: [
    { q: '45 + 10 = …', opts: ['46', '55', '145'], correct: 1 },
    { q: '70 − 20 = …', opts: ['50', '68', '90'], correct: 0 },
    { q: '23 + 30 = …', opts: ['26', '53', '50'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '18 + 10 = …', r: ['19', '28', '118', '81'], ok: 1 },
    { l: 1, q: '50 + 10 = …', r: ['60', '51', '510', '40'], ok: 0 },
    { l: 2, q: '41 + 20 = …', r: ['43', '61', '62', '21'], ok: 1 },
    { l: 2, q: '57 + 30 = …', r: ['87', '60', '77', '97'], ok: 0 },
    { l: 3, q: '64 − 10 = …', r: ['63', '54', '74', '44'], ok: 1 },
    { l: 3, q: '89 − 40 = …', r: ['85', '49', '59', '129'], ok: 1 },
    { l: 4, q: '20 + 60 = …', r: ['26', '80', '8', '800'], ok: 1 },
    { l: 4, q: '100 − 30 = …', r: ['70', '97', '80', '60'], ok: 0 },
  ],
});
})();

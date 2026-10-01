/* ============================================================
   CHAPITRE : Masses et contenances (CE2, M4, période 4)
   Programme du cycle 2 (CE2) : g, kg, t ; 1 kg = 1 000 g (5 462 g = 5 kg + 462 g) ;
   1 t = 1 000 kg (5 350 kg = 5 t 350 kg) ; comparer avec une balance de Roberval ; estimer.
   Contenances : comparer (transvasements, étalon) ; L, dL, cL ; 1 L = 10 dL = 100 cL ;
   780 cL = 7 L + 80 cL. Sans écriture à virgule ni tableau de conversion.
   ============================================================ */
(() => {
cm1Chapitre({
  niveau: 'ce2', titre: 'Masses et contenances', slug: 'masses-contenances',
  cours: `
${cm1Lecon(1, 'Les unités de masse')}
${cm1Tableau(['Unité', 'Symbole', 'Pour peser…'], [
  ['la tonne', '<b>t</b>', 'une voiture (environ 1 t), un camion'],
  ['le kilogramme', '<b>kg</b>', 'un dictionnaire (environ 1 kg), un enfant, un seau d\'eau'],
  ['le gramme', '<b>g</b>', 'une feuille de papier (environ 5 g), une pomme (environ 150 g)'],
])}
${cm1Regle(cm1Liste(['<b>1 kg = 1 000 g</b>', '<b>1 t = 1 000 kg</b>']))}
${cm1Exemple('Changer d\'unité :', ['3 kg = 3 000 g', '5 462 g = 5 000 g + 462 g = <b>5 kg et 462 g</b>', '2 t = 2 000 kg', '5 350 kg = 5 000 kg + 350 kg = <b>5 t et 350 kg</b>'])}

${cm1Lecon(2, 'Comparer des masses')}
${cm1Regle('Sur une <b>balance à plateaux</b> (balance de Roberval), le plateau qui <b>descend</b> porte l\'objet le plus <b>lourd</b>. Si la balance est en équilibre, les deux objets ont la même masse.')}
${ce2AnimBalance('ce2-mc-balance', { presets: [
  { nom: 'Pomme et orange', g: ['la pomme', 150, '#9BC53D', '150 g'], d: ['l\'orange', 200, '#F4A23B', '200 g'], montrer: true, fem: true },
  { nom: '1 kg et 800 g', g: ['la farine', 1000, '#C9A24A', '1 kg'], d: ['le sucre', 800, '#8E9AA8', '800 g'], montrer: true, fem: true, fin: '1 kg = 1 000 g, et 1 000 g &gt; 800 g.' },
  { nom: 'Équilibre', g: ['le paquet', 500, '#7A4FC0', '500 g'], d: ['les poids', 500, '#5B6472', '500 g'], montrer: true }] })}
${cm1Astuce('Pour comparer 2 kg et 1 800 g, on met tout dans la même unité : 2 kg = 2 000 g, et 2 000 g &gt; 1 800 g.')}

${cm1Lecon(3, 'Les contenances')}
${cm1Def('La <b>contenance</b> d\'un récipient, c\'est la quantité de liquide qu\'il peut contenir. On peut comparer deux récipients en versant l\'un dans l\'autre, ou en comptant combien de verres chacun contient.')}
${cm1Tableau(['Unité', 'Symbole', 'Exemple'], [
  ['le litre', '<b>L</b>', 'une grande bouteille d\'eau : 1 L ; un arrosoir : environ 10 L'],
  ['le décilitre', '<b>dL</b>', 'un verre : environ 2 dL'],
  ['le centilitre', '<b>cL</b>', 'une canette : 33 cL ; une cuillère : environ 1 cL'],
])}
${cm1Regle(cm1Liste(['<b>1 L = 10 dL = 100 cL</b>', '<b>1 dL = 10 cL</b>']))}
${ce2AnimVerser('ce2-mc-verser', {})}
${cm1Exemple('Exemples :', ['3 L = 30 dL = 300 cL', '780 cL = 700 cL + 80 cL = <b>7 L et 80 cL</b>', 'Une bouteille d\'un demi-litre contient 50 cL.'])}
`,
  methode: `
${cm1Demo('ce2-mc-ranger', 'Ranger des masses', 'Range du plus léger au plus lourd : 1 kg 200 g ; 950 g ; 2 kg ; 1 050 g.')}
${cm1Demo('ce2-mc-verres', 'Remplir avec des verres', 'Une bouteille contient 1 L. Combien de verres de 20 cL peut-on remplir ?')}
`,
  demos: [
    ['ce2-mc-ranger', [
      { expr: 'On met tout en grammes.', note: 'Pour comparer, il faut la même unité.' },
      { expr: '1 kg 200 g = 1 200 g', note: '1 kg = 1 000 g.' },
      { expr: '2 kg = 2 000 g', note: '950 g et 1 050 g sont déjà en grammes.' },
      { expr: '950 g &lt; 1 050 g &lt; 1 kg 200 g &lt; 2 kg', note: '' },
    ]],
    ['ce2-mc-verres', [
      { expr: '1 L = 100 cL', note: 'On met tout en centilitres.' },
      { expr: '20 + 20 + 20 + 20 + 20 = 100', note: '5 × 20 = 100.' },
      { expr: 'On peut remplir 5 verres.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-mc', [
    [`Convertis ces masses.${cm1Liste(['4 kg en g', '6 000 g en kg', '3 t en kg'])}`,
      cm1Redac('4 kg en g', '4 × 1 000 g = 4 000 g', '4 kg, c\'est 4 000 g.')
      + cm1Redac('6 000 g en kg', '6 000 g = 6 × 1 000 g', '6 000 g, c\'est 6 kg.')
      + cm1Redac('3 t en kg', '3 × 1 000 kg = 3 000 kg', '3 t, c\'est 3 000 kg.')],
    ['Un sac de pommes de terre pèse 2 750 g. Écris sa masse en kilogrammes et grammes.',
      cm1Redac('Masse du sac', '2 750 g = 2 000 g + 750 g', 'Le sac pèse 2 kg et 750 g.')],
    [`Quelle unité choisir pour peser chacun de ces objets ?${cm1Liste(['un éléphant', 'un crayon', 'un sac de pommes de terre'])}`,
      cm1Redac('Choix des unités', { suite: ['un éléphant : la tonne (t)', 'un crayon : le gramme (g)', 'un sac de pommes de terre : le kilogramme (kg)'] }, 'On choisit l\'unité qui donne un nombre facile à dire.')],
    [`Convertis ces contenances.${cm1Liste(['2 L en cL', '5 L en dL', '450 cL en L et cL'])}`,
      cm1Redac('2 L en cL', '2 × 100 cL = 200 cL', '2 L, c\'est 200 cL.')
      + cm1Redac('5 L en dL', '5 × 10 dL = 50 dL', '5 L, c\'est 50 dL.')
      + cm1Redac('450 cL en L et cL', '450 cL = 400 cL + 50 cL', '450 cL, c\'est 4 L et 50 cL.')],
    ['Un paquet de farine pèse 1 kg. On en utilise 250 g pour un gâteau. Quelle masse de farine reste-t-il ?',
      cm1Redac('Farine restante', ['1 000 g − 250 g', '750 g'], 'Il reste 750 g de farine.')],
    ['Une carafe contient 1 L d\'eau. On remplit 3 verres de 25 cL. Combien d\'eau reste-t-il dans la carafe ?',
      cm1Redac('Eau versée', ['3 × 25 cL', '75 cL'], 'On a versé 75 cL.')
      + cm1Redac('Eau restante', { nom: 'B', lignes: ['100 cL − 75 cL', '25 cL'] }, 'Il reste 25 cL d\'eau dans la carafe.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le kilogramme', [
    'Pendant plus de 100 ans, le kilogramme a été défini par un petit <b>cylindre de métal</b> gardé sous trois cloches de verre, près de Paris : le « grand K ». Toutes les balances du monde étaient réglées sur lui. Depuis <b>2019</b>, le kilogramme est défini grâce à la physique, sans objet.',
  ]),
  quiz: [
    { q: '1 kg = …', opts: ['100 g', '1 000 g', '10 g'], correct: 1 },
    { q: '1 L = …', opts: ['10 cL', '100 cL', '1 000 cL'], correct: 1 },
    { q: 'Pour peser un camion, on utilise…', opts: ['le gramme', 'la tonne', 'le litre'], correct: 1 },
  ],
  flash: [
    { q: '2 kg = …', r: ['20 g', '200 g', '2 000 g', '20 000 g'], ok: 2 },
    { q: '1 t = …', r: ['100 kg', '1 000 kg', '10 kg', '10 000 kg'], ok: 1 },
    { q: '1 L = … dL', r: ['10', '100', '1 000', '1'], ok: 0 },
    { q: '3 L = … cL', r: ['30', '300', '3 000', '13'], ok: 1 },
    { q: 'Quelle masse est la plus grande ?', r: ['900 g', '1 kg 50 g', '1 kg', '999 g'], ok: 1 },
    { q: 'Quelle est la masse d\'une pomme ?', r: ['150 g', '150 kg', '15 t', '1 g'], ok: 0 },
    { q: '520 cL = …', r: ['52 L', '5 L et 20 cL', '50 L et 2 cL', '5 L et 2 cL'], ok: 1 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Longueurs, masses, contenances (CM2, M1, période 1)
   Programme du cycle 3 (CM2) : renforcer les unités (du millimètre au kilomètre, du milligramme à
   la tonne, du millilitre au litre) ; un tableau peut PRÉSENTER les unités et leurs relations,
   mais les conversions ne se font PAS avec un tableau : « 3,5 mètres est égal à 350 centimètres
   car 1 mètre est égal à 100 centimètres ». Estimer des mesures (objets et éléments non
   manipulables). Les nombres décimaux entrent dans les conversions.
   ============================================================ */
(() => {
const C = (t, c) => `<b style="color:${c};">${t}</b>`;
const coul = { k: '#7A4FC0', h: '#9E1F5E', da: '#B8962E', u: '#1F3A5C', d: '#2EA8C9', c: '#2E9C6A', m: '#E35D3A' };
cm1Chapitre({
  niveau: 'cm2', titre: 'Longueurs, masses, contenances', slug: 'longueurs-masses-contenances',
  cours: `
${cm1Lecon(1, 'Les unités et les préfixes')}
${cm1Def(`Les unités de longueur (mètre), de masse (gramme) et de contenance (litre) utilisent les mêmes <b>préfixes</b> :${cm1Liste([`${C('kilo', coul.k)} : 1 000 fois plus`, `${C('hecto', coul.h)} : 100 fois plus`, `${C('déca', coul.da)} : 10 fois plus`, `${C('déci', coul.d)} : 10 fois moins`, `${C('centi', coul.c)} : 100 fois moins`, `${C('milli', coul.m)} : 1 000 fois moins`])}`, 'Préfixes')}
${cm1Tableau([C('km', '#fff'), 'hm', 'dam', '<b>m</b>', 'dm', 'cm', 'mm'], [['1 000 m', '100 m', '10 m', '1 m', '0,1 m', '0,01 m', '0,001 m']], { coul: '#1F3A5C' })}
${cm1Rem('Ce tableau sert à <b>présenter</b> les unités, pas à convertir. Les unités les plus utilisées sont en gras dans la vie courante : km, m, cm, mm ; kg, g, mg et la tonne (1 t = 1 000 kg) ; L, cL, mL.')}

${cm1Lecon(2, 'Convertir en raisonnant')}
${cm1Regle('On part d\'une relation connue entre les deux unités et on multiplie ou on divise.')}
${cm1Redac('3,5 m en cm', { suite: ['1 m = 100 cm', '3,5 × 100 = 350'] }, '3,5 m, c\'est 350 cm.')}
${cm1Redac('850 m en km', { suite: ['1 000 m = 1 km', '850 ÷ 1 000 = 0,85'] }, '850 m, c\'est 0,85 km.')}
${cmAnimGlisseDec('c2-lmc-glisse', { presets: [{ nom: '3,5 × 100', n: '3,5', f: 100, op: '×' }, { nom: '2,4 × 1 000', n: '2,4', f: 1000, op: '×' }, { nom: '850 ÷ 1 000', n: '850', f: 1000, op: '÷' }, { nom: '75 ÷ 100', n: '75', f: 100, op: '÷' }] })}
${cm1Exemple('Autres exemples :', ['2,4 kg, c\'est 2 400 g, car 1 kg vaut 1 000 g ;', '75 cL, c\'est 0,75 L : 75 centièmes de litre, car 1 L vaut 100 cL ;', '1,2 t, c\'est 1 200 kg, car 1 t vaut 1 000 kg ;', '500 mg, c\'est 0,5 g, car 1 g vaut 1 000 mg.'])}
${cm1Astuce('Pour vérifier, on se demande si le résultat est logique : une unité plus petite donne un nombre plus grand. 3,5 m → 350 cm : le nombre augmente, car le centimètre est plus petit que le mètre.')}

${cm1Lecon(3, 'Estimer des mesures')}
${cm1Tableau(['Objet', 'Estimation'], [['longueur d\'une voiture', 'environ 4,5 m'], ['distance Paris-Marseille', 'environ 780 km'], ['masse d\'un éléphant', 'environ 5 t'], ['masse d\'une feuille de papier', 'environ 5 g'], ['contenance d\'une baignoire', 'environ 150 L'], ['contenance d\'un verre', 'environ 20 cL']], { coul: '#2EA8C9' })}
${cm1Rem('Avant de répondre à un problème, on se demande si la mesure trouvée est plausible : « une voiture de 45 m », ce n\'est pas possible !')}

${cm1Lecon(4, 'Calculer avec des mesures')}
${cm1Regle('Pour additionner ou comparer des mesures, on les exprime d\'abord <b>dans la même unité</b>.')}
${cm1Exemple('On mélange 1,5 kg de farine et 750 g de sucre.')}
${cm1Redac('Masse du mélange', { suite: ['1,5 kg = 1 500 g', '1 500 g + 750 g = 2 250 g'] }, 'Le mélange pèse 2 250 g, c\'est-à-dire 2,25 kg.')}
`,
  methode: `
${cm1Demo('c2-lmc-conv', 'Convertir un nombre décimal', 'Convertis 4,08 m en centimètres, puis 625 m en kilomètres.')}
${cm1Demo('c2-lmc-pb', 'Résoudre un problème de contenance', 'Une bouteille contient 1,5 L. On remplit des verres de 25 cL. Combien de verres ?')}
`,
  demos: [
    ['c2-lmc-conv', [
      { expr: '1 m = 100 cm', note: 'Relation connue.' },
      { expr: '4,08 m = 4,08 × 100 cm = 408 cm', note: 'Multiplier par 100 : chaque chiffre glisse de deux rangs vers la gauche.' },
      { expr: '1 000 m = 1 km, donc 1 m = 0,001 km', note: 'Pour passer à une unité plus grande, on divise.' },
      { expr: '625 m = 625 ÷ 1 000 km = 0,625 km', note: 'Diviser par 1 000 : chaque chiffre glisse de trois rangs vers la droite.' },
    ]],
    ['c2-lmc-pb', [
      { expr: '1,5 L = 150 cL', note: 'Même unité que les verres : 1 L = 100 cL.' },
      { expr: '25 cL × 6 = 150 cL', note: 'On cherche combien de fois 25 cL dans 150 cL (4 verres pour 100 cL, 2 verres pour 50 cL).' },
      { expr: 'On remplit 6 verres.', note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('c2lmc', [
    [`Convertis.${cm1Liste(['2,5 km en m', '0,7 m en cm', '45 mm en cm', '3 m 8 cm en m'])}`,
      cm1Redac('2,5 km en m', { suite: ['1 km = 1 000 m', '2,5 × 1 000 = 2 500'] }, '2,5 km, c\'est 2 500 m.')
      + cm1Redac('0,7 m en cm', { suite: ['1 m = 100 cm', '0,7 × 100 = 70'] }, '0,7 m, c\'est 70 cm.')
      + cm1Redac('45 mm en cm', { suite: ['10 mm = 1 cm', '45 ÷ 10 = 4,5'] }, '45 mm, c\'est 4,5 cm.')
      + cm1Redac('3 m 8 cm en m', { suite: ['8 cm = 0,08 m', '3 + 0,08 = 3,08'] }, '3 m 8 cm, c\'est 3,08 m.')],
    [`Convertis.${cm1Liste(['1,25 kg en g', '800 g en kg', '3 500 kg en t', '2 g en mg'])}`,
      cm1Redac('1,25 kg en g', '1,25 × 1 000 = 1 250', '1,25 kg, c\'est 1 250 g.')
      + cm1Redac('800 g en kg', '800 ÷ 1 000 = 0,8', '800 g, c\'est 0,8 kg.')
      + cm1Redac('3 500 kg en t', '3 500 ÷ 1 000 = 3,5', '3 500 kg, c\'est 3,5 t.')
      + cm1Redac('2 g en mg', '2 × 1 000 = 2 000', '2 g, c\'est 2 000 mg.')],
    [`Convertis.${cm1Liste(['0,5 L en cL', '330 mL en L', '2,4 L en mL'])}`,
      cm1Redac('0,5 L en cL', '0,5 × 100 = 50', '0,5 L, c\'est 50 cL.')
      + cm1Redac('330 mL en L', '330 ÷ 1 000 = 0,33', '330 mL, c\'est 0,33 L.')
      + cm1Redac('2,4 L en mL', '2,4 × 1 000 = 2 400', '2,4 L, c\'est 2 400 mL.')],
    [`Quelle unité choisir ?${cm1Liste(['la masse d\'un camion', 'la contenance d\'une cuillère', 'l\'épaisseur d\'une pièce', 'la masse d\'un comprimé'])}`,
      cm1Redac('Unités adaptées', '', 'Le camion se pèse en tonnes, la cuillère contient quelques millilitres, l\'épaisseur d\'une pièce se mesure en millimètres et un comprimé pèse quelques milligrammes.')],
    [`Range du plus léger au plus lourd.${cm1Liste(['1,2 kg', '1 150 g', '1 kg 30 g', '0,95 kg'])}`,
      cm1Redac('Masses en grammes', { suite: ['1,2 kg = 1 200 g', '1 kg 30 g = 1 030 g', '0,95 kg = 950 g'] }, 'Du plus léger au plus lourd : 0,95 kg ; 1 kg 30 g ; 1 150 g ; 1,2 kg.')],
    [`Est-ce plausible ?${cm1Liste(['une porte de 2 m', 'un chat de 40 kg', 'une piscine de 50 L', 'une randonnée de 12 km'])}`,
      cm1Redac('Plausibilité', '', 'Une porte de 2 m et une randonnée de 12 km sont plausibles. Un chat de 40 kg ne l\'est pas : il pèse environ 4 kg. Une piscine de 50 L non plus : elle contient des milliers de litres.')],
    ['Un sac contient 2,5 kg de pommes de terre. On en utilise 800 g. Quelle masse reste-t-il ?',
      cm1Redac('Masse restante', { suite: ['2,5 kg = 2 500 g', '2 500 − 800 = 1 700'] }, 'Il reste 1 700 g de pommes de terre, c\'est-à-dire 1,7 kg.')],
    ['Un ruban mesure 3,6 m. On le coupe en 4 morceaux de même longueur. Longueur d\'un morceau en cm ?',
      cm1Redac('Longueur d\'un morceau', { suite: ['3,6 m = 360 cm', '360 ÷ 4 = 90'] }, 'Chaque morceau mesure 90 cm.')],
  ], { titre: 'Rédaction type : « Convertir »', lignes: [['1 kg = 1 000 g', 'J\'écris la relation connue.'], ['2,4 × 1 000 = 2 400, donc 2,4 kg = 2 400 g', 'Je calcule.'], ['Le nombre a augmenté : c\'est logique, le gramme est plus petit.', 'Je vérifie.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : le kilogramme de platine', [
    'En 1799, on fabrique à Paris un cylindre de platine qui pèse exactement <b>un kilogramme</b> : c\'est le « kilogramme étalon ». Pendant plus de 200 ans, toutes les balances du monde ont été réglées à partir de lui !',
    'Depuis 2019, le kilogramme n\'est plus défini par un objet, mais par une constante de la physique, qui ne peut ni s\'user ni se perdre.',
  ]),
  quiz: [
    { q: '3,5 m = …', opts: ['35 cm', '350 cm', '3 500 cm'], correct: 1 },
    { q: '750 g = …', opts: ['7,5 kg', '0,75 kg', '75 kg'], correct: 1 },
    { q: 'Quelle est la masse plausible d\'un chat ?', opts: ['4 g', '4 kg', '4 t'], correct: 1 },
  ],
});
})();

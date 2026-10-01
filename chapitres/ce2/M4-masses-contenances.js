/* ============================================================
   CHAPITRE : Masses et contenances (CE2, M4, période 4)
   Programme du cycle 2 (CE2) : g, kg, t ; 1 kg = 1 000 g (5 462 g = 5 kg + 462 g) ;
   1 t = 1 000 kg (5 350 kg = 5 t 350 kg) ; comparer avec une balance de Roberval ; estimer.
   Contenances : comparer (transvasements, étalon) ; L, dL, cL ; 1 L = 10 dL = 100 cL ;
   780 cL = 7 L + 80 cL. Sans écriture à virgule ni tableau de conversion.
   ============================================================ */
(() => {
// Balance de Roberval penchée du côté le plus lourd (gauche si g > d).
function balance(gauche, droite, g, d){
  const pente = g > d ? 10 : g < d ? -10 : 0;
  // Plateau suspendu sous l'extrémité du fléau, l'objet posé dessus, son nom en dessous.
  const plateau = (x, y, lab, c, r) => `<line x1="${x - 30}" y1="${y + 50}" x2="${x}" y2="${y}" stroke="#1F3A5C" stroke-width="1.2"/><line x1="${x + 30}" y1="${y + 50}" x2="${x}" y2="${y}" stroke="#1F3A5C" stroke-width="1.2"/><circle cx="${x}" cy="${y + 50 - r}" r="${r}" fill="${c}" stroke="#1F3A5C" stroke-width="1.2"/><path d="M${x - 50} ${y + 50} H${x + 50} L${x + 38} ${y + 60} H${x - 38} Z" fill="#C9CBCF" stroke="#1F3A5C" stroke-width="1.5"/><text x="${x}" y="${y + 78}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${lab}</text>`;
  return `<svg viewBox="0 0 300 170" style="width:300px;max-width:100%;display:block;margin:6px auto;">
  <path d="M120 165 H180 L165 145 H135 Z" fill="#8A6D1F"/><line x1="150" y1="145" x2="150" y2="40" stroke="#8A6D1F" stroke-width="6"/>
  ${plateau(70, 40 + pente, gauche, '#9BC53D', 12)}${plateau(230, 40 - pente, droite, '#F4A23B', 15)}
  <line x1="70" y1="${40 + pente}" x2="230" y2="${40 - pente}" stroke="#8A6D1F" stroke-width="6" stroke-linecap="round"/><circle cx="150" cy="40" r="6" fill="#1F3A5C"/></svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Masses et contenances', slug: 'masses-contenances',
  cours: `
${cm1Lecon(1, 'Les unités de masse')}
${cm1Tableau(['Unité', 'Symbole', 'Pour peser…'], [
  ['la tonne', '<b>t</b>', 'une voiture (environ 1 t), un camion'],
  ['le kilogramme', '<b>kg</b>', 'un dictionnaire (environ 1 kg), un enfant, un seau d\'eau'],
  ['le gramme', '<b>g</b>', 'une feuille de papier (environ 5 g), une pomme (environ 150 g)'],
])}
${cm1Regle('<b>1 kg = 1 000 g</b> · <b>1 t = 1 000 kg</b>')}
${cm1Exemple('Changer d\'unité :', ['3 kg = 3 000 g', '5 462 g = 5 000 g + 462 g = <b>5 kg et 462 g</b>', '2 t = 2 000 kg ; 5 350 kg = <b>5 t et 350 kg</b>'])}

${cm1Lecon(2, 'Comparer des masses')}
${cm1Regle('Sur une <b>balance à plateaux</b> (balance de Roberval), le plateau qui <b>descend</b> porte l\'objet le plus <b>lourd</b>. Si la balance est en équilibre, les deux objets ont la même masse.')}
${balance('pomme', 'orange', 1, 2)}
<p class="hint" style="text-align:center;">L'orange est plus lourde que la pomme.</p>
${cm1Astuce('Pour comparer 2 kg et 1 800 g, on met tout dans la même unité : 2 kg = 2 000 g, et 2 000 g &gt; 1 800 g.')}

${cm1Lecon(3, 'Les contenances')}
${cm1Def('La <b>contenance</b> d\'un récipient, c\'est la quantité de liquide qu\'il peut contenir. On peut comparer deux récipients en versant l\'un dans l\'autre, ou en comptant combien de verres chacun contient.')}
${cm1Tableau(['Unité', 'Symbole', 'Exemple'], [
  ['le litre', '<b>L</b>', 'une grande bouteille d\'eau : 1 L ; un arrosoir : environ 10 L'],
  ['le décilitre', '<b>dL</b>', 'un verre : environ 2 dL'],
  ['le centilitre', '<b>cL</b>', 'une canette : 33 cL ; une cuillère : environ 1 cL'],
])}
${cm1Regle('<b>1 L = 10 dL = 100 cL</b> · <b>1 dL = 10 cL</b>')}
${cm1Exemple('Exemples :', ['3 L = 30 dL = 300 cL', '780 cL = 700 cL + 80 cL = <b>7 L et 80 cL</b>', 'Une bouteille d\'un demi-litre contient 50 cL.'])}
`,
  methode: `
${cm1Demo('ce2-mc-ranger', 'Ranger des masses', 'Range du plus léger au plus lourd : 1 kg 200 g · 950 g · 2 kg · 1 050 g.')}
${cm1Demo('ce2-mc-verres', 'Remplir avec des verres', 'Une bouteille contient 1 L. Combien de verres de 20 cL peut-on remplir ?')}
`,
  demos: [
    ['ce2-mc-ranger', [
      { expr: 'On met tout en grammes.', note: 'Pour comparer, il faut la même unité.' },
      { expr: '1 kg 200 g = 1 200 g · 950 g · 2 kg = 2 000 g · 1 050 g', note: '1 kg = 1 000 g.' },
      { expr: '950 g &lt; 1 050 g &lt; 1 kg 200 g &lt; 2 kg', note: '' },
    ]],
    ['ce2-mc-verres', [
      { expr: '1 L = 100 cL', note: 'On met tout en centilitres.' },
      { expr: '20 + 20 + 20 + 20 + 20 = 100', note: '5 × 20 = 100.' },
      { expr: 'On peut remplir 5 verres.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-mc', [
    ['Complète : 4 kg = … g · 6 000 g = … kg · 3 t = … kg.', '4 000 g · 6 kg · 3 000 kg.'],
    ['Écris en kg et g : 2 750 g · 1 080 g.', '2 kg et 750 g · 1 kg et 80 g.'],
    ['Quelle unité choisir : un éléphant · un crayon · un sac de pommes de terre ?', 't (ou kg) · g · kg.'],
    ['Complète : 2 L = … cL · 5 L = … dL · 450 cL = … L et … cL.', '200 cL · 50 dL · 4 L et 50 cL.'],
    ['Un paquet de farine pèse 1 kg. On en utilise 250 g. Quelle masse reste-t-il ?', '1 000 g − 250 g = 750 g.'],
    ['Une carafe contient 1 L. On verse 3 verres de 25 cL. Combien reste-t-il ?', '3 × 25 = 75 cL ; 100 − 75 = 25 cL.'],
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

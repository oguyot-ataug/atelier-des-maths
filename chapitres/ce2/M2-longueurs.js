/* ============================================================
   CHAPITRE : Les longueurs (CE2, M2, période 2)
   Programme du cycle 2 (CE2) : m, dm, cm, mm, km et leurs symboles ; relations entre unités
   (1 cm = 10 mm, 1 m = 1 000 mm…) ; conversions SANS tableau de conversion, en s'appuyant sur
   les relations (215 cm = 2 m + 1 dm + 5 cm, 5 km + 750 m = 5 750 m) ; choisir l'unité adaptée ;
   comparer ; mesurer et tracer (6 cm ; 5 cm et 3 mm ; 72 mm) ; longueurs de référence, estimer.
   Pas d'écriture à virgule pour les longueurs au CE2.
   ============================================================ */
(() => {
// Règle graduée en cm et mm, avec un segment mesuré.
function regle(cm, mm){
  const K = 40, L = 10 * K;
  let s = `<rect x="10" y="40" width="${L + 20}" height="46" rx="4" fill="#FFF3D6" stroke="#C9A24A"/>`;
  for(let i = 0; i <= 100; i++){ const x = 20 + i * K / 10, g = i % 10 === 0, m = i % 5 === 0; s += `<line x1="${x}" y1="40" x2="${x}" y2="${40 + (g ? 18 : m ? 13 : 8)}" stroke="#8A6D1F" stroke-width="${g ? 1.4 : .8}"/>`; if(g) s += `<text x="${x}" y="76" font-size="13" text-anchor="middle" fill="#8A6D1F" font-family="Space Grotesk">${i / 10}</text>`; }
  const fin = 20 + (cm + mm / 10) * K;
  s += `<line x1="20" y1="26" x2="${fin}" y2="26" stroke="#E35D3A" stroke-width="4"/><path d="M20 20 v12 M${fin} 20 v12" stroke="#E35D3A" stroke-width="2"/>`;
  return `<svg viewBox="0 0 ${L + 40} 92" style="width:100%;max-width:${L + 40}px;display:block;margin:6px auto;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Les longueurs', slug: 'longueurs',
  cours: `
${cm1Lecon(1, 'Les unités de longueur')}
${cm1Tableau(['Unité', 'Symbole', 'Pour mesurer…'], [
  ['le kilomètre', '<b>km</b>', 'une distance entre deux villes'],
  ['le mètre', '<b>m</b>', 'la longueur de la classe, la hauteur d\'une porte'],
  ['le décimètre', '<b>dm</b>', 'la largeur d\'une main (environ 1 dm)'],
  ['le centimètre', '<b>cm</b>', 'la longueur d\'un crayon'],
  ['le millimètre', '<b>mm</b>', 'l\'épaisseur d\'une pièce de monnaie'],
])}
${cm1Regle(cm1Liste(['<b>1 cm = 10 mm</b>', '<b>1 dm = 10 cm</b>', '<b>1 m = 10 dm = 100 cm = 1 000 mm</b>', '<b>1 km = 1 000 m</b>']))}

${cm1Lecon(2, 'Changer d\'unité')}
${cm1Regle('Pour changer d\'unité, on utilise les relations entre les unités, <b>sans tableau</b>.')}
${cm1Exemple('Exemples :', [
  '6 cm = 6 × 10 mm = <b>60 mm</b>',
  '3 cm + 4 mm = 30 mm + 4 mm = <b>34 mm</b>',
  '6 km = 6 × 1 000 m = <b>6 000 m</b>',
  '5 km + 750 m = 5 000 m + 750 m = <b>5 750 m</b>',
  '215 cm = 200 cm + 15 cm = <b>2 m et 15 cm</b>',
  '16 m = 16 × 100 cm = <b>1 600 cm</b>'])}
${cm1Astuce('On ne peut additionner ou comparer des longueurs que si elles sont dans <b>la même unité</b> : 3 cm et 4 mm, ce n\'est pas 7 !')}

${cm1Lecon(3, 'Mesurer et tracer')}
${cm1Regle('Pour mesurer, on pose le <b>0 de la règle</b> sur une extrémité, et on lit en face de l\'autre extrémité : les grands traits sont les centimètres, les petits les millimètres.')}
${ce2AnimRegle('ce2-lo-regle', { legende: 'Le 0 de la règle sur A, puis on lit la graduation en face de B.', presets: [{ nom: '6 cm', cm: 6, mm: 0 }, { nom: '5 cm et 3 mm', cm: 5, mm: 3 }, { nom: '72 mm', cm: 7, mm: 2 }] })}
<div class="figure-wrap">${regle(5, 3)}<p class="hint" style="margin:4px 0 0;">Ce segment mesure <b>5 cm et 3 mm</b>, c'est-à-dire <b>53 mm</b>.</p></div>

${cm1Lecon(4, 'Estimer une longueur')}
${cm1Rem(`Quelques repères :${cm1Liste(['un ongle fait environ 1 cm de large ;', 'une grande enjambée fait environ 1 m ;', 'on parcourt 1 km en marchant environ un quart d\'heure.'])}`)}
`,
  methode: `
${cm1Demo('ce2-lo-conv', 'Additionner des longueurs données dans deux unités', 'Une ficelle mesure 2 m. On ajoute 35 cm. Quelle est la longueur totale en cm ?')}
${cm1Demo('ce2-lo-comp', 'Comparer des longueurs', 'Qui a sauté le plus loin : Léo (2 m et 8 cm) ou Inès (215 cm) ?')}
`,
  demos: [
    ['ce2-lo-conv', [
      { expr: '2 m = 200 cm', note: 'Car 1 m = 100 cm.' },
      { expr: '200 cm + 35 cm = 235 cm', note: 'Les deux longueurs sont maintenant en cm : on peut ajouter.' },
      { expr: 'La ficelle mesure 235 cm, c\'est-à-dire 2 m et 35 cm.', note: '' },
    ]],
    ['ce2-lo-comp', [
      { expr: 'Léo : 2 m et 8 cm = 200 cm + 8 cm = 208 cm', note: 'On met tout en centimètres.' },
      { expr: 'Inès : 215 cm', note: '' },
      { expr: '215 cm &gt; 208 cm', note: '' },
      { expr: 'C\'est Inès qui a sauté le plus loin.', note: 'Elle a sauté 7 cm de plus que Léo.' },
    ]],
  ],
  exos: cm1Exos('ce2-lo', [
    [`Convertis ces longueurs.${cm1Liste(['4 cm en mm', '3 m en cm', '2 km en m'])}`,
      cm1Redac('4 cm en mm', '4 × 10 mm = 40 mm', '4 cm, c\'est 40 mm.')
      + cm1Redac('3 m en cm', '3 × 100 cm = 300 cm', '3 m, c\'est 300 cm.')
      + cm1Redac('2 km en m', '2 × 1 000 m = 2 000 m', '2 km, c\'est 2 000 m.')],
    ['Un crayon mesure 12 cm et 4 mm. Quelle est sa longueur en millimètres ?',
      cm1Redac('Longueur du crayon en mm', ['120 mm + 4 mm', '124 mm'], 'Le crayon mesure 124 mm.')],
    [`Quelle unité choisir pour mesurer chacune de ces longueurs ?${cm1Liste(['la longueur d\'un stylo', 'la longueur de la cour de l\'école', 'le trajet de Paris à Lyon', 'la longueur d\'une fourmi'])}`,
      cm1Redac('Choix des unités', { suite: ['un stylo : le centimètre (cm)', 'la cour : le mètre (m)', 'Paris-Lyon : le kilomètre (km)', 'une fourmi : le millimètre (mm)'] }, 'On choisit l\'unité qui donne un nombre facile à dire.')],
    ['Range ces longueurs de la plus courte à la plus longue : 1 m ; 95 cm ; 1 020 mm ; 9 dm.',
      cm1Redac('Les longueurs en cm', { suite: ['1 m = 100 cm', '1 020 mm = 102 cm', '9 dm = 90 cm'] }, 'Du plus court au plus long : 9 dm, 95 cm, 1 m, 1 020 mm.')],
    ['Trace un segment de 7 cm et 4 mm. Combien mesure-t-il en millimètres ?',
      cm1Redac('Longueur du segment en mm', ['70 mm + 4 mm', '74 mm'], 'Le segment mesure 74 mm. On pose le 0 sur le premier point et on s\'arrête au 4<sup>e</sup> petit trait après le 7.')],
    ['Tom marche 3 km le matin et 750 m l\'après-midi. Quelle distance a-t-il parcourue en mètres ?',
      cm1Redac('Distance parcourue', ['3 000 m + 750 m', '3 750 m'], 'Tom a parcouru 3 750 m.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la naissance du mètre', [
    'Autrefois, on mesurait avec des parties du corps : le <b>pied</b>, le <b>pouce</b>, la <b>coudée</b>… mais un pied n\'avait pas la même longueur dans toutes les villes ! En <b>1795</b>, la France a créé le <b>mètre</b>, la même longueur pour tout le monde. Des savants ont mesuré pour cela la distance de Dunkerque à Barcelone.',
  ]),
  quiz: [
    { q: '1 m = …', opts: ['10 cm', '100 cm', '1 000 cm'], correct: 1 },
    { q: '4 cm et 5 mm = …', opts: ['9 mm', '45 mm', '405 mm'], correct: 1 },
    { q: 'Pour mesurer la distance entre deux villes, on utilise…', opts: ['le km', 'le cm', 'le mm'], correct: 0 },
  ],
  flash: [
    { q: '1 cm = …', r: ['10 mm', '100 mm', '1 000 mm', '1 mm'], ok: 0 },
    { q: '3 m = …', r: ['30 cm', '300 cm', '3 000 cm', '3 cm'], ok: 1 },
    { q: '2 km = …', r: ['200 m', '2 000 m', '20 m', '20 000 m'], ok: 1 },
    { q: '6 cm et 2 mm = …', r: ['8 mm', '62 mm', '602 mm', '26 mm'], ok: 1 },
    { q: 'Quelle unité pour mesurer un crayon ?', r: ['km', 'm', 'cm', 'kg'], ok: 2 },
    { q: 'Quelle longueur est la plus grande ?', r: ['1 m', '95 cm', '9 dm', '990 mm'], ok: 0 },
  ],
});
})();

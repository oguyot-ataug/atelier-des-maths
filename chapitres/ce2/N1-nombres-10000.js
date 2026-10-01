/* ============================================================
   CHAPITRE : Nombres jusqu'à 10 000 (CE2, N1, période 1)
   Programme du cycle 2 (CE2) : nombres jusqu'à 10 000 ; dénombrer avec des groupes de dix, cent,
   mille ; relations entre unités de numération ; suites écrite et orale ; diverses représentations
   (matériel multibase, chiffres, lettres, unités de numération, décompositions) ; comparer,
   encadrer, intercaler, ranger (=, <, >) ; demi-droite graduée de 1 en 1, 10 en 10, 100 en 100,
   1 000 en 1 000.
   ============================================================ */
(() => {
// Matériel multibase dessiné : cubes de mille, plaques de cent, barres de dix, petits cubes.
function multibase(m, c, d, u){
  let s = '', x = 6;
  const cube = (x0) => `<g transform="translate(${x0},10)"><polygon points="0,14 46,14 46,60 0,60" fill="#F2A93B" stroke="#8A5A10"/><polygon points="0,14 14,0 60,0 46,14" fill="#F7C873" stroke="#8A5A10"/><polygon points="46,14 60,0 60,46 46,60" fill="#D98E1E" stroke="#8A5A10"/></g>`;
  const plaque = (x0) => `<g transform="translate(${x0},24)"><rect x="0" y="0" width="40" height="40" fill="#2EA8C9" stroke="#1F3A5C"/>${[1,2,3].map(k => `<line x1="${k * 10}" y1="0" x2="${k * 10}" y2="40" stroke="#1F3A5C" stroke-opacity=".35"/><line x1="0" y1="${k * 10}" x2="40" y2="${k * 10}" stroke="#1F3A5C" stroke-opacity=".35"/>`).join('')}</g>`;
  const barre = (x0) => `<g transform="translate(${x0},24)"><rect x="0" y="0" width="9" height="40" fill="#2E9C6A" stroke="#1F3A5C"/>${[1,2,3].map(k => `<line x1="0" y1="${k * 10}" x2="9" y2="${k * 10}" stroke="#1F3A5C" stroke-opacity=".4"/>`).join('')}</g>`;
  const petit = (x0, k) => `<rect x="${x0}" y="${54 - (k % 2) * 12}" width="9" height="9" fill="#E35D3A" stroke="#1F3A5C"/>`;
  for(let i = 0; i < m; i++){ s += cube(x); x += 66; }
  for(let i = 0; i < c; i++){ s += plaque(x); x += 46; }
  for(let i = 0; i < d; i++){ s += barre(x); x += 14; }
  x += 4; for(let i = 0; i < u; i++){ s += petit(x + Math.floor(i / 2) * 12, i); }
  x += Math.ceil(u / 2) * 12 + 6;
  return `<svg viewBox="0 0 ${x} 74" style="width:100%;max-width:${Math.min(620, x * 1.2)}px;display:block;margin:6px auto;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Nombres jusqu\'à 10 000', slug: 'nombres-10000',
  cours: `
${cm1Lecon(1, 'Unités, dizaines, centaines, milliers')}
${cm1Regle(cm1Liste(['<b>10 unités = 1 dizaine</b>', '<b>10 dizaines = 1 centaine</b>', '<b>10 centaines = 1 millier</b>', '<b>10 milliers = 10 000</b> (dix-mille)']))}
${ce2AnimNumeration('ce2-num', { presets: [{ nom: '4 635', n: 4635 }, { nom: '3 546', n: 3546 }, { nom: '2 058', n: 2058 }, { nom: '7 003', n: 7003 }] })}
${cm1Exemple('Avec le matériel : 4 gros cubes, 6 plaques, 3 barres et 5 petits cubes.')}
<div class="figure-wrap">${multibase(4, 6, 3, 5)}<p class="hint" style="margin:4px 0 0;">4 milliers, 6 centaines, 3 dizaines et 5 unités : c'est le nombre <b>4 635</b>.</p></div>
${cm1Tableau(['Milliers', 'Centaines', 'Dizaines', 'Unités'], [['<b>4</b>', '<b>6</b>', '<b>3</b>', '<b>5</b>']])}
${cm1Astuce(`Quand on a <b>plus de 10</b> objets d'une même sorte, on fait des échanges :${cm1Liste(['17 unités = 1 dizaine et 7 unités', '32 centaines = 3 milliers et 2 centaines'])}`)}

${cm1Lecon(2, 'Écrire un nombre de plusieurs façons')}
${cm1Exemple('Le nombre 4 635 peut s\'écrire :', [
  'en chiffres : <b>4 635</b> (on laisse un petit espace après les milliers) ;',
  'en lettres : <b>quatre-mille-six-cent-trente-cinq</b> (des traits d\'union entre tous les mots) ;',
  'avec les unités de numération : 4 milliers 6 centaines 3 dizaines 5 unités ;',
  'ou encore : 46 centaines et 35 unités ;',
  'en décomposition : 4 000 + 600 + 30 + 5 ;',
  'avec des multiplications : (4 × 1 000) + (6 × 100) + (3 × 10) + 5.'])}
${cm1Regle('<b>Le chiffre des centaines</b> de 4 635 est <b>6</b>. <b>Le nombre de centaines</b> est <b>46</b> : on compte toutes les centaines, celles des milliers comprises.')}
${cm1Rem('<b>Mille</b> ne prend jamais de « s » : deux-mille, trois-mille. <b>Cent</b> prend un « s » quand il est multiplié et termine le nombre : trois-cents, mais trois-cent-dix.')}

${cm1Lecon(3, 'Comparer et ranger des nombres')}
${cm1Regle('Pour comparer deux nombres : celui qui a <b>le plus de chiffres</b> est le plus grand. S\'ils ont autant de chiffres, on compare les chiffres <b>un par un en partant de la gauche</b>.')}
${cm1Exemple('Exemples :', ['6 243 &gt; 6 234 : même millier, même centaine, et 4 dizaines &gt; 3 dizaines.', '987 &lt; 1 002 : 3 chiffres contre 4.', 'Dans l\'ordre croissant : 5 229 &lt; 6 234 &lt; 6 239 &lt; 6 243 &lt; 6 300.'])}
${cm1Def('<b>&lt;</b> se lit « est inférieur à » ; <b>&gt;</b> se lit « est supérieur à ». La pointe est toujours tournée vers le plus petit nombre.', 'Les signes')}
${cm1Regle(`<b>Encadrer</b> un nombre, c'est l'écrire entre deux nombres.${cm1Liste(['Au millier près : 3 000 &lt; 3 482 &lt; 4 000', 'À la centaine près : 3 400 &lt; 3 482 &lt; 3 500'])}`)}

${cm1Lecon(4, 'La demi-droite graduée')}
${cm1Regle('Sur une demi-droite graduée, les nombres sont rangés du plus petit au plus grand, avec des écarts réguliers. On cherche d\'abord <b>ce que vaut un écart</b>.')}
${ce2AnimSauts('ce2-ne-sauts', { presets: [
  { nom: 'De 100 en 100', depart: 3200, sauts: [[100, '+ 100'], [100, '+ 100'], [100, '+ 100'], [100, '+ 100']], min: 3100, max: 3700, fin: 'De 100 en 100 : 3 200, 3 300, 3 400, 3 500, 3 600. Seul le chiffre des centaines change.' },
  { nom: 'De 1 000 en 1 000', depart: 2000, sauts: [[1000, '+ 1 000'], [1000, '+ 1 000'], [1000, '+ 1 000']], min: 1500, max: 5500, fin: 'De 1 000 en 1 000 : seul le chiffre des milliers change.' },
  { nom: 'Passer le millier', depart: 4970, sauts: [[10, '+ 10'], [10, '+ 10'], [10, '+ 10'], [10, '+ 10']], min: 4960, max: 5020, fin: '4 990 + 10 = 5 000 : 10 dizaines font une centaine, 10 centaines font un millier.' }] })}
<div class="figure-wrap">${cm1Graduation(5, 1, [[2.4, 'A', '#E35D3A'], [3.7, 'B', '#2EA8C9']], { etiquettes: i => [ '2 000', '3 000', '4 000', '5 000', '6 000', '7 000'][i] || '', unite: 80 })}
<p class="hint" style="margin:4px 0 0;">Un écart vaut 1 000. A est un peu avant le milieu entre 4 000 et 5 000 : A vaut environ 4 400. B vaut environ 5 700.</p></div>
${cm1Rem('Plus un nombre est grand, plus son point est <b>loin de l\'origine</b> de la demi-droite.')}
`,
  methode: `
${cm1Demo('ce2-ne-ecrire', 'Écrire un nombre dicté', 'La maîtresse dicte : « sept-mille-quatre-vingt-trois ». Écris ce nombre en chiffres.')}
${cm1Demo('ce2-ne-lots', 'Combien de paquets de cent ?', 'Une entreprise a besoin de 1 235 filtres. Elle ne peut acheter que des lots de 100. Combien de lots doit-elle acheter ?')}
`,
  demos: [
    ['ce2-ne-ecrire', [
      { expr: 'sept-mille → 7 milliers', note: 'On repère d\'abord les milliers.' },
      { expr: 'quatre-vingt-trois → 8 dizaines et 3 unités', note: 'Il n\'y a pas de centaines : on n\'entend pas « cent ».' },
      { expr: cm1Tableau(['Milliers', 'Centaines', 'Dizaines', 'Unités'], [['7', '<b style="color:#E35D3A">0</b>', '8', '3']]), note: 'On écrit un <b>0</b> à la place des centaines manquantes.' },
      { expr: 'Le nombre s\'écrit 7 083.', note: 'Et non 783 !' },
    ]],
    ['ce2-ne-lots', [
      { expr: '1 235 = 12 centaines et 35 unités', note: 'Le nombre de centaines de 1 235 est 12.' },
      { expr: '12 lots = 1 200 filtres', note: 'Il manque encore 35 filtres : 12 lots ne suffisent pas.' },
      { expr: '13 lots = 1 300 filtres', note: 'Il faut un lot de plus.' },
      { expr: 'L\'entreprise doit acheter 13 lots.', note: 'On vérifie : 1 300 &gt; 1 235 ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-ne', [
    [`La maîtresse dicte trois nombres. Écris-les en chiffres.${cm1Liste(['trois-mille-cinq-cent-six', 'neuf-mille-quarante', 'huit-mille-huit'])}`,
      cm1Redac('Trois-mille-cinq-cent-six', '3 milliers, 5 centaines, 0 dizaine et 6 unités', 'Ce nombre s\'écrit 3 506.')
      + cm1Redac('Neuf-mille-quarante', '9 milliers, 0 centaine, 4 dizaines et 0 unité', 'Ce nombre s\'écrit 9 040.')
      + cm1Redac('Huit-mille-huit', '8 milliers, 0 centaine, 0 dizaine et 8 unités', 'Ce nombre s\'écrit 8 008.')],
    [`Écris ces nombres en lettres.${cm1Liste(['2 450', '6 017'])}`,
      cm1Redac('2 450 en lettres', '2 milliers, 4 centaines et 5 dizaines', 'On écrit : deux-mille-quatre-cent-cinquante.')
      + cm1Redac('6 017 en lettres', '6 milliers et 17 unités', 'On écrit : six-mille-dix-sept.')],
    [`Réponds aux questions sur le nombre 5 873.${cm1Liste(['Quel est son chiffre des centaines ?', 'Quel est son nombre de centaines ?', 'Quel est son nombre de dizaines ?'])}`,
      cm1Redac('Chiffre des centaines de 5 873', cm1Tableau(['M', 'C', 'D', 'U'], [['5', '<b style="color:#E35D3A">8</b>', '7', '3']]), 'Le chiffre des centaines de 5 873 est 8.')
      + cm1Redac('Nombre de centaines de 5 873', '5 873 = 58 centaines et 73 unités', 'Le nombre de centaines de 5 873 est 58.')
      + cm1Redac('Nombre de dizaines de 5 873', '5 873 = 587 dizaines et 3 unités', 'Le nombre de dizaines de 5 873 est 587.')],
    ['Un jardinier a 2 sacs de 1 000 graines, 14 sachets de 100 graines et 6 graines toutes seules. Combien de graines a-t-il en tout ?',
      cm1Redac('Nombre de graines', ['2 000 + 1 400 + 6', '3 406'], 'Le jardinier a 3 406 graines en tout.')],
    ['Range ces nombres dans l\'ordre croissant : 4 302 ; 4 230 ; 4 032 ; 4 320 ; 3 999.',
      cm1Redac('Les nombres dans l\'ordre croissant', '3 999 &lt; 4 032 &lt; 4 230 &lt; 4 302 &lt; 4 320', 'Le plus petit nombre est 3 999 et le plus grand est 4 320.')],
    ['Une école commande 2 460 crayons. Ils sont vendus par boîtes de 100. Combien de boîtes faut-il acheter ?',
      cm1Redac('Nombre de boîtes', '2 460 = 24 centaines et 60 unités', '24 boîtes ne suffisent pas, il manquerait 60 crayons : il faut acheter 25 boîtes.')],
    ['Encadre 6 748 entre deux milliers qui se suivent, puis entre deux centaines qui se suivent.',
      cm1Redac('Encadrement au millier', '6 000 &lt; 6 748 &lt; 7 000', '6 748 est compris entre 6 000 et 7 000.')
      + cm1Redac('Encadrement à la centaine', '6 700 &lt; 6 748 &lt; 6 800', '6 748 est compris entre 6 700 et 6 800.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter avec des bâtons et des nœuds', [
    'Il y a très longtemps, pour compter les moutons, les bergers faisaient des <b>entailles sur des bâtons</b> ou mettaient des petits cailloux dans un sac : un caillou par mouton. Le mot « calcul » vient d\'ailleurs du latin <i>calculus</i>, qui veut dire « petit caillou » !',
    'Les Incas, en Amérique du Sud, faisaient des <b>nœuds sur des cordelettes</b> (les quipus) : la position du nœud sur la corde indiquait les unités, les dizaines, les centaines… exactement comme la position d\'un chiffre dans nos nombres.',
  ]),
  quiz: [
    { q: 'Comment s\'écrit « cinq-mille-trente » ?', opts: ['5 300', '5 030', '5 003'], correct: 1 },
    { q: 'Dans 7 486, le nombre de centaines est…', opts: ['4', '74', '748'], correct: 1 },
    { q: 'Quel est le plus grand nombre ?', opts: ['6 099', '6 909', '6 990'], correct: 2 },
  ],
  flash: [
    { q: 'Comment s\'écrit « deux-mille-quatre » ?', r: ['2 400', '2 040', '2 004', '204'], ok: 2 },
    { q: 'Dans 3 581, quel est le chiffre des centaines ?', r: ['3', '5', '8', '35'], ok: 1 },
    { q: 'Dans 3 581, quel est le nombre de centaines ?', r: ['5', '35', '358', '3'], ok: 1 },
    { q: '1 millier = …', r: ['10 unités', '100 dizaines', '10 dizaines', '100 centaines'], ok: 1 },
    { q: 'Quel nombre est le plus grand ?', r: ['4 099', '4 909', '4 990', '4 199'], ok: 2 },
    { q: '6 000 + 300 + 7 = …', r: ['637', '6 307', '6 370', '6 037'], ok: 1 },
    { q: 'Quel nombre vient juste après 4 999 ?', r: ['4 000', '5 999', '5 000', '49 910'], ok: 2 },
    { q: '2 milliers et 15 centaines, c\'est…', r: ['2 150', '3 500', '2 015', '17 000'], ok: 1 },
  ],
});
})();

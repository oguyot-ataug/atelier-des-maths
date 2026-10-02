/* ============================================================
   CHAPITRE : Grands nombres jusqu'à 999 999 999 (CM2, N7, période 3)
   Programme du cycle 3 (CM2) : trois nouveaux rangs (unités, dizaines et centaines de millions) ;
   suite écrite et orale jusqu'à 999 999 999 ; valeur des chiffres selon leur position ;
   représentations ; comparer, encadrer, intercaler, ordonner ; demi-droite graduée. Le milliard
   est introduit en 6e.
   ============================================================ */
(() => {
const H = t => `<span class="hl">${t}</span>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Grands nombres jusqu\'à 999 999 999', slug: 'grands-nombres',
  cours: `
${cm1Lecon(1, 'La classe des millions')}
${cm1Regle(cm1Liste(['10 centaines de mille = 1 <b>million</b> (1 000 000)', '10 millions = 1 dizaine de millions', '10 dizaines de millions = 1 centaine de millions']))}
${ce2AnimSauts('c2-gn-sauts', { legende: 'Franchir le million : 999 999 + 1.', presets: [{ nom: 'Après 999 998', depart: 999998, sauts: [[1, '+ 1'], [1, '+ 1']], min: 999996, max: 1000002, fin: '999 999 + 1 = <b>1 000 000</b> : un million, le premier nombre à 7 chiffres.' }, { nom: 'De 100 000 en 100 000', depart: 10000000, sauts: [[100000, '+ 100 000'], [100000, '+ 100 000'], [100000, '+ 100 000'], [100000, '+ 100 000']], min: 9950000, max: 10450000, fin: '4 écarts de 100 000 après 10 000 000 : <b>10 400 000</b>, c\'est le point A.' }] })}
${cm1Tableau(['<span style="font-size:.78rem;">Classe des millions</span>', '', '', '<span style="font-size:.78rem;">Classe des mille</span>', '', '', '<span style="font-size:.78rem;">Classe des unités</span>', '', ''], [
  ['c', 'd', 'u', 'c', 'd', 'u', 'c', 'd', 'u'],
  ['<b>3</b>', '<b>0</b>', '<b>5</b>', '<b>0</b>', '<b>6</b>', '<b>2</b>', '<b>8</b>', '<b>0</b>', '<b>0</b>'],
])}
${cm1Exemple('Le nombre 305 062 800 :', ['On le découpe en classes de 3 chiffres à partir de la droite : 305 | 062 | 800.', 'Il se lit : <b>trois-cent-cinq-millions-soixante-deux-mille-huit-cents</b>.', 'Décomposition : (3 × 100 000 000) + (5 × 1 000 000) + (6 × 10 000) + (2 × 1 000) + (8 × 100).'])}
${cm1Astuce('« million » est un nom : il prend un « s » au pluriel (trois-cent-cinq-millions), contrairement à « mille ».')}

${cm1Lecon(2, 'Chiffre des… et nombre de…')}
${cm1Exemple('Dans 305 062 800 :', ['le chiffre des millions est <b>5</b> ;', 'le nombre de millions est <b>305</b> ;', 'le chiffre des dizaines de mille est <b>6</b> ;', 'le nombre de milliers est <b>305 062</b>.'])}

${cm1Lecon(3, 'Comparer, encadrer, arrondir')}
${cm1Regle('Comme pour les nombres plus petits : d\'abord le nombre de chiffres, puis les chiffres de même rang en partant de la gauche.')}
${cm1Exemple('Exemples :', ['67 900 000 &lt; 102 000 000 (8 chiffres contre 9).', '45 208 999 &lt; 45 210 000.', 'Encadrer 45 208 999 entre deux millions consécutifs : 45 000 000 &lt; 45 208 999 &lt; 46 000 000.', 'La France compte environ 68 millions d\'habitants : on écrit un nombre arrondi.'])}

${cm1Lecon(4, 'Demi-droite graduée')}
<div class="figure-wrap">${cm1Graduation(1, 10, [[0.4, 'A', '#E35D3A'], [0.75, 'B', '#2EA8C9']], { unite: 440, etiquettes: i => i === 0 ? '10 000 000' : i === 10 ? '11 000 000' : '' })}</div>
${cm1Exemple('Entre 10 000 000 et 11 000 000, 10 écarts : chaque écart vaut 100 000.', ['A correspond à 10 400 000.', 'B est au milieu entre 10 700 000 et 10 800 000 : il correspond à 10 750 000.'])}
`,
  methode: `
${cm1Demo('c2-gn-ecrire', 'Écrire en chiffres un grand nombre', 'Écris en chiffres : « quarante-millions-trois-mille-cinq ».')}
${cm1Demo('c2-gn-ranger', 'Comparer deux grands nombres', 'Compare 708 650 000 et 780 065 000.')}
`,
  demos: [
    ['c2-gn-ecrire', [
      { expr: 'quarante-millions | trois-mille | cinq', note: 'On repère les mots « millions » et « mille » : ils séparent les classes.' },
      { expr: `${H('040')} | … | …`, note: 'Classe des millions : 40, écrit avec 3 chiffres : 040 (on ne garde pas le premier 0 au début du nombre).' },
      { expr: `40 | ${H('003')} | ${H('005')}`, note: 'Classe des mille : 003. Classe des unités : 005.' },
      { expr: '40 003 005', note: 'Chaque classe (sauf la première) a toujours exactement 3 chiffres.' },
    ]],
    ['c2-gn-ranger', [
      { expr: '708 650 000   et   780 065 000', note: 'Même nombre de chiffres (9).' },
      { expr: `7${H('0')}8 650 000   et   7${H('8')}0 065 000`, note: 'Même chiffre des centaines de millions (7). Dizaines de millions : 0 &lt; 8.' },
      { expr: '708 650 000 &lt; 780 065 000', note: 'Conclusion.' },
    ]],
  ],
  exos: cm1Exos('c2gn', [
    [`Écris ces nombres en lettres.${cm1Liste(['7 450 000', '230 008 015'])}`,
      cm1Redac('7 450 000 en lettres', '7 | 450 | 000', 'On écrit : sept-millions-quatre-cent-cinquante-mille.')
      + cm1Redac('230 008 015 en lettres', '230 | 008 | 015', 'On écrit : deux-cent-trente-millions-huit-mille-quinze.')],
    [`Écris ces nombres en chiffres.${cm1Liste(['six-cents-millions', 'douze-millions-quatre-vingt-mille-deux', 'neuf-cent-mille-neuf'])}`,
      cm1Redac('Les nombres en chiffres', { suite: ['600 | 000 | 000', '12 | 080 | 002', '900 | 009'] }, 'Ces nombres s\'écrivent 600 000 000, 12 080 002 et 900 009.')],
    [`Réponds aux questions sur le nombre 614 507 392.${cm1Liste(['Quel est son chiffre des dizaines de millions ?', 'Quel est son nombre de millions ?', 'Quel est son chiffre des centaines de mille ?'])}`,
      cm1Redac('Chiffre des dizaines de millions', '6<b>1</b>4 507 392', 'Le chiffre des dizaines de millions est 1.')
      + cm1Redac('Nombre de millions', '614 507 392 = 614 millions et 507 392 unités', 'Le nombre de millions est 614.')
      + cm1Redac('Chiffre des centaines de mille', '614 <b>5</b>07 392', 'Le chiffre des centaines de mille est 5.')],
    ['Complète : 1 million = … milliers = … centaines de mille.',
      cm1Redac('Un million', { suite: ['1 000 000 = 1 000 × 1 000', '1 000 000 = 10 × 100 000'] }, '1 million, c\'est 1 000 milliers, ou 10 centaines de mille.')],
    ['Range dans l\'ordre décroissant : 99 999 999 ; 100 000 100 ; 100 001 000 ; 9 999 999.',
      cm1Redac('Ordre décroissant', '100 001 000 &gt; 100 000 100 &gt; 99 999 999 &gt; 9 999 999', 'Les nombres à 9 chiffres sont les plus grands ; le plus petit, 9 999 999, n\'a que 7 chiffres.')],
    ['Encadre 67 348 125 entre deux millions consécutifs, puis arrondis-le au million.',
      cm1Redac('Encadrement', '67 000 000 &lt; 67 348 125 &lt; 68 000 000', '67 348 125 est compris entre 67 millions et 68 millions.')
      + cm1Redac('Arrondi', '67 348 125 &lt; 67 500 000', 'Il est avant le milieu : arrondi au million, il vaut 67 000 000.')],
    ['La Terre est à environ 149 600 000 km du Soleil. Écris ce nombre en lettres et arrondis-le à la dizaine de millions.',
      cm1Redac('En lettres', '149 | 600 | 000', 'On écrit : cent-quarante-neuf-millions-six-cent-mille.')
      + cm1Redac('Arrondi', '149 600 000 &gt; 145 000 000', 'Il est après le milieu entre 140 et 150 millions : arrondi, la distance est de 150 000 000 km.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le mot « million »', [
    'Le mot <b>million</b> vient de l\'italien <i>millione</i>, « un grand millier ». Il apparaît en Italie au XIII<sup>e</sup> siècle, à l\'époque de Marco Polo, qui racontait les richesses immenses de la Chine.',
    'Pendant longtemps, on n\'avait pas besoin de si grands nombres ! Aujourd\'hui, on les rencontre partout : population des pays, distances dans l\'espace, budget d\'une ville…',
  ]),
  quiz: [
    { q: 'Combien de zéros dans un million ?', opts: ['5', '6', '9'], correct: 1 },
    { q: 'Dans 452 318 007, le nombre de millions est…', opts: ['2', '452', '452 318'], correct: 1 },
    { q: 'Comment s\'écrit « trois-millions-vingt » ?', opts: ['3 000 020', '3 020 000', '300 020'], correct: 0 },
  ],
});
})();

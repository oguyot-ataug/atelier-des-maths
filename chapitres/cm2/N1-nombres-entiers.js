/* ============================================================
   CHAPITRE : Nombres entiers (révisions jusqu'à 999 999) (CM2, N1, période 1)
   Programme du cycle 3 (CM2) : « afin de privilégier en début d'année le travail sur les
   fractions et les nombres décimaux, les nombres entiers rencontrés pendant les deux premières
   périodes de l'année seront ceux qui ont été étudiés au CM1 et qui s'écrivent avec au plus six
   chiffres ». Les millions arrivent en période 3 (« Grands nombres jusqu'à 999 999 999 »).
   ============================================================ */
(() => {
const H = t => `<span class="hl">${t}</span>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Nombres entiers (révisions jusqu\'à 999 999)', slug: 'nombres-entiers',
  cours: `
${cm1Lecon(1, 'La classe des mille et la classe des unités')}
${cm1Regle('10 unités = 1 dizaine · 10 dizaines = 1 centaine · 10 centaines = 1 millier (1 unité de mille)<br>10 milliers = 1 dizaine de mille · 10 dizaines de mille = 1 centaine de mille')}
${cm1Tableau(['Centaines de mille', 'Dizaines de mille', 'Unités de mille', 'Centaines', 'Dizaines', 'Unités'], [['<b>4</b>', '<b>0</b>', '<b>7</b>', '<b>2</b>', '<b>5</b>', '<b>3</b>']])}
${cm1Exemple('Le nombre 407 253 :', ['On sépare les chiffres par <b>classes</b> de trois, en partant de la droite : 407 | 253.', 'Il se lit : <b>quatre-cent-sept-mille-deux-cent-cinquante-trois</b>.', 'Décomposition : 407 253 = 400 000 + 7 000 + 200 + 50 + 3 = (4 × 100 000) + (7 × 1 000) + (2 × 100) + (5 × 10) + 3.'])}
${cm1Astuce('« mille » est invariable : on écrit trois-mille, jamais « trois-milles ».')}

${cm1Lecon(2, 'Chiffre des… et nombre de…')}
${cm1Regle('Le <b>chiffre des</b> milliers est le chiffre écrit au rang des milliers. Le <b>nombre de</b> milliers est le nombre formé par ce chiffre et tous ceux écrits à sa gauche.')}
${cm1Exemple('Dans 407 253 :', ['le chiffre des milliers est <b>7</b> ; le nombre de milliers est <b>407</b> ;', 'le chiffre des centaines est <b>2</b> ; le nombre de centaines est <b>4 072</b>.'])}

${cm1Lecon(3, 'Comparer, encadrer, ranger')}
${cm1Regle('Le nombre qui a le plus de chiffres est le plus grand. À nombre de chiffres égal, on compare les chiffres de même rang en partant de la gauche.')}
${cm1Exemple('Exemples :', ['98 750 &lt; 102 004 (5 chiffres contre 6).', '345 812 &gt; 345 781 : les chiffres sont égaux jusqu\'aux milliers (345), puis aux centaines 8 &gt; 7.', 'Encadrer 345 812 entre deux multiples de 1 000 consécutifs : 345 000 &lt; 345 812 &lt; 346 000.', 'Arrondir à la dizaine de mille : 345 812 est plus proche de 350 000 que de 340 000.'])}

${cm1Lecon(4, 'Demi-droite graduée')}
${cm1Regle('Pour repérer un point, on cherche la valeur d\'un écart entre deux graduations : on divise l\'écart entre deux nombres connus par le nombre d\'intervalles.')}
<div class="figure-wrap">${cm1Graduation(2, 10, [[0.3, 'A', '#E35D3A'], [1.6, 'B', '#2EA8C9']], { unite: 210, etiquettes: i => i === 0 ? '200 000' : i === 10 ? '300 000' : i === 20 ? '400 000' : '' })}</div>
${cm1Exemple('Lecture :', ['Entre 200 000 et 300 000, il y a 10 écarts : un écart vaut 10 000.', 'A correspond à 230 000 et B à 360 000.'])}
`,
  methode: `
${cm1Demo('c2-ne-lire', 'Écrire en chiffres un nombre dicté', 'Écris en chiffres : « six-cent-mille-quarante ».')}
${cm1Demo('c2-ne-arrondi', 'Arrondir un nombre', 'Arrondis 186 540 au millier près.')}
`,
  demos: [
    ['c2-ne-lire', [
      { expr: 'six-cent-mille | quarante', note: 'On repère le mot « mille » : ce qui est avant forme la classe des mille, ce qui est après la classe des unités.' },
      { expr: `${H('600')} | …`, note: 'Classe des mille : six-cent → 600.' },
      { expr: `600 | ${H('040')}`, note: 'Classe des unités : quarante. On écrit toujours 3 chiffres dans une classe : 040.' },
      { expr: '600 040', note: 'Sans les zéros, on écrirait 60 040 ou 6 040 : ce serait un autre nombre !' },
    ]],
    ['c2-ne-arrondi', [
      { expr: '186 000 &lt; 186 540 &lt; 187 000', note: 'On encadre le nombre entre deux milliers consécutifs.' },
      { expr: 'milieu : 186 500', note: 'On cherche le milieu de l\'intervalle.' },
      { expr: '186 540 &gt; 186 500', note: 'Le nombre est après le milieu : il est plus proche de 187 000.' },
      { expr: 'Arrondi au millier : 187 000', note: 'Résultat.' },
    ]],
  ],
  exos: cm1Exos('c2ne', [
    ['Écris en lettres : 305 060 · 780 900', 'trois-cent-cinq-mille-soixante · sept-cent-quatre-vingt-mille-neuf-cents.'],
    ['Écris en chiffres : quatre-vingt-dix-mille-sept · deux-cent-mille-trois-cents.', '90 007 · 200 300.'],
    ['Dans 652 418 : chiffre des dizaines de mille ? nombre de milliers ? nombre de centaines ?', '5 · 652 · 6 524.'],
    ['Décompose 508 031 avec des multiplications par 100 000, 10 000, 1 000…', '(5 × 100 000) + (8 × 1 000) + (3 × 10) + 1.'],
    ['Range dans l\'ordre croissant : 99 999 · 100 010 · 100 001 · 90 999 · 101 000', '90 999 &lt; 99 999 &lt; 100 001 &lt; 100 010 &lt; 101 000'],
    ['Encadre 473 280 entre deux dizaines de mille consécutives, puis arrondis-le à la dizaine de mille.', '470 000 &lt; 473 280 &lt; 480 000 ; arrondi : 470 000 (473 280 &lt; 475 000).'],
    ['Quel nombre est 10 000 de plus que 395 600 ? 1 000 de moins que 400 200 ?', '405 600 · 399 200.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les chiffres « arabes » viennent d\'Inde', [
    'Nos dix chiffres ont été inventés en <b>Inde</b> vers le V<sup>e</sup> siècle, avec le principe de position et le zéro. Ils ont été transmis par les savants arabes, comme <b>al-Khwârizmî</b>, d\'où leur nom de « chiffres arabes ».',
    'En Europe, beaucoup préféraient encore les chiffres romains au Moyen Âge. Écrire 407 253 en chiffres romains aurait demandé des centaines de symboles !',
  ]),
  quiz: [
    { q: 'Dans 238 406, le chiffre des dizaines de mille est…', opts: ['2', '3', '8'], correct: 1 },
    { q: 'Comment s\'écrit « trois-cent-mille-cinq » ?', opts: ['300 005', '30 005', '3 000 005'], correct: 0 },
    { q: 'Arrondi de 64 812 au millier près ?', opts: ['64 000', '65 000', '60 000'], correct: 1 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Nombres décimaux (CM1, N4, période 2)
   Programme du cycle 3 (CM1) : les nombres décimaux sont introduits à partir des fractions
   décimales (dixièmes, centièmes) ; en CM1 on se limite aux centièmes. Relations entre unités de
   numération (1 unité = 10 dixièmes, 1 dixième = 10 centièmes) ; écriture à virgule ;
   décompositions ; valeur des chiffres ; demi-droite graduée ; comparer, ranger, encadrer entre
   deux entiers consécutifs.
   ============================================================ */
(() => {
const F = cm1Frac;
const H = t => `<span class="hl">${t}</span>`;
cm1Chapitre({
  titre: 'Nombres décimaux', slug: 'nombres-decimaux',
  cours: `
${cm1Lecon(1, 'Dixièmes et centièmes')}
${cm1Def(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Quand on partage une unité en 10 parts égales, chaque part est <b>un dixième</b> : ${F(1, 10)}.</li>
<li>Quand on partage une unité en 100 parts égales, chaque part est <b>un centième</b> : ${F(1, 100)}.</li></ul>`)}
${cm1Regle(cm1Liste(['<b>1 unité = 10 dixièmes</b>', '<b>1 dixième = 10 centièmes</b>', 'donc <b>1 unité = 100 centièmes</b>']))}
<div class="figure-wrap">${cm1Bande(10, 3, { largeur: 300 })}<p class="hint" style="margin:6px 0 0;">L'unité est partagée en 10 : on a colorié ${F(3, 10)} (trois dixièmes).</p></div>
${ce2AnimFracEgales('cm1-dec-centiemes', { legende: 'On partage chaque dixième en 10 : on obtient des centièmes.', presets: [{ nom: 'Trois dixièmes', n: 10, k: 3, f: 10 }, { nom: 'Un dixième', n: 10, k: 1, f: 10 }] })}

${cm1Lecon(2, 'L\'écriture à virgule')}
${cm1Regle(`Un <b>nombre décimal</b> peut s'écrire avec une <b>virgule</b>. La virgule sépare la <b>partie entière</b> (à gauche) de la <b>partie décimale</b> (à droite).<br>
${cm1Liste([`${F(3, 10)} = 0,3`, `${F(7, 100)} = 0,07`, `2 + ${F(45, 100)} = 2,45`])}`)}
${cm1Exemple('Le nombre 32,58 dans le tableau de numération :')}
${cm1Tableau(['Dizaines', 'Unités', ',', 'Dixièmes', 'Centièmes'], [['<b>3</b>', '<b>2</b>', '<b>,</b>', '<b>5</b>', '<b>8</b>']])}
<ul class="example-list"><li>Partie entière : <b>32</b> ; partie décimale : <b>58</b> (centièmes).</li><li>Il se lit : « trente-deux <b>virgule</b> cinquante-huit » ou « trente-deux <b>unités et</b> cinquante-huit <b>centièmes</b> ».</li></ul>
${cm1Astuce('Le premier chiffre après la virgule est le chiffre des <b>dixièmes</b>, le deuxième est celui des <b>centièmes</b>.')}

${cm1Lecon(3, 'Décomposer un nombre décimal')}
${cm1Exemple('Avec 32,58 :', [`32,58 = 30 + 2 + ${F(5, 10)} + ${F(8, 100)}`, `32,58 = 32 + ${F(58, 100)}`, `32,58 = ${F(3258, 100)} (3 258 centièmes)`])}
${cm1Rem(`Un zéro à la fin de la partie décimale ne change pas le nombre :${cm1Liste(['4,50 = 4,5, car 50 centièmes, c\'est 5 dixièmes ;', '7 = 7,0 = 7,00.'])}`)}

${cm1Lecon(4, 'Placer des nombres décimaux sur une demi-droite graduée')}
${cm1Regle('Pour placer des dixièmes, on partage chaque unité en <b>10 parts égales</b> : chaque petit écart vaut 0,1.')}
<div class="figure-wrap">${cm1Graduation(2, 10, [[0.4, 'A', '#E35D3A'], [1.7, 'B', '#2EA8C9']], { unite: 210 })}</div>
${ce2AnimSauts('cm1-dec-sauts', { legende: 'Sur la demi-droite, on avance de 0,1 en 0,1 : chaque petit écart vaut un dixième.', presets: [{ nom: 'De 1 à 1,7', depart: 1, sauts: [[0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1']], min: 0.9, max: 1.8, fmt: v => cmNb(v), fin: '7 dixièmes après 1 : le point B est à <b>1,7</b>.' }, { nom: 'Passer l\'unité', depart: 0.7, sauts: [[0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1'], [0.1, '+ 0,1']], min: 0.6, max: 1.2, fmt: v => cmNb(v), fin: '0,9 + 0,1 = 1 : 10 dixièmes font une unité.' }] })}
${cm1Exemple('Lecture :', ['A est 4 petits écarts après 0 : A correspond à <b>0,4</b>.', 'B est 7 petits écarts après 1 : B correspond à <b>1,7</b>.'])}

${cm1Lecon(5, 'Comparer, ranger, encadrer')}
${cm1Regle('Pour comparer deux nombres décimaux :<ol style="margin:4px 0 0;padding-left:20px;line-height:1.8;"><li>on compare d\'abord les <b>parties entières</b> ;</li><li>si elles sont égales, on compare les chiffres des <b>dixièmes</b>, puis ceux des <b>centièmes</b>.</li></ol>')}
${cm1Exemple('Exemples :', ['12,3 &gt; 9,87 car 12 &gt; 9 (partie entière).', '5,62 &lt; 5,7 car 6 dixièmes &lt; 7 dixièmes.', 'Encadrer 5,62 entre deux entiers qui se suivent : 5 &lt; 5,62 &lt; 6.'])}
${cm1Astuce('Attention au piège : 5,7 n\'est pas plus petit que 5,62 parce que « 7 &lt; 62 » ! On compare rang par rang : on peut écrire 5,7 = 5,70, et 70 centièmes &gt; 62 centièmes.')}
`,
  methode: `
${cm1Demo('dec-ecrire', 'Passer d\'une fraction décimale à l\'écriture à virgule', `Écris ${F(347, 100)} avec une virgule.`)}
${cm1Demo('dec-comparer', 'Comparer deux nombres décimaux', 'Qui a sauté le plus loin : Tom (3,8 m) ou Inès (3,75 m) ?')}
`,
  demos: [
    ['dec-ecrire', [
      { expr: `${F(347, 100)} : 347 centièmes`, note: 'On lit la fraction : 347 centièmes.' },
      { expr: '347 centièmes = 300 centièmes + 47 centièmes', note: 'On sait que 100 centièmes = 1 unité : on cherche combien d\'unités il y a.' },
      { expr: `= 3 + ${F(47, 100)}`, note: '300 centièmes = 3 unités.' },
      { expr: `${F(347, 100)} = 3,47`, note: 'La partie entière est 3 ; 47 centièmes s\'écrivent avec 2 chiffres après la virgule.' },
    ]],
    ['dec-comparer', [
      { expr: '3,8   et   3,75', note: 'On compare d\'abord les parties entières.' },
      { expr: `${H('3')},8   et   ${H('3')},75`, note: 'Parties entières égales (3) : on passe aux dixièmes.' },
      { expr: `3,${H('8')}   et   3,${H('7')}5`, note: '8 dixièmes et 7 dixièmes : 8 &gt; 7, on peut conclure (pas besoin de regarder les centièmes).' },
      { expr: '3,8 &gt; 3,75', note: 'Tom a sauté le plus loin.' },
    ]],
  ],
  exos: cm1Exos('dec', [
    [`Écris ces nombres avec une virgule.${cm1Liste([F(6, 10), F(23, 100), F(5, 100), F(128, 10), F(409, 100)])}`,
      cm1Redac('Écritures à virgule', { suite: [`${F(6, 10)} = 0,6`, `${F(23, 100)} = 0,23`, `${F(5, 100)} = 0,05`, `${F(128, 10)} = 12,8`, `${F(409, 100)} = 4,09`] }, 'Les dixièmes s\'écrivent avec un chiffre après la virgule, les centièmes avec deux.')],
    [`Écris ces nombres sous forme de fraction décimale.${cm1Liste(['0,9', '1,25', '0,04'])}`,
      cm1Redac('Fractions décimales', { suite: [`0,9 = ${F(9, 10)}`, `1,25 = ${F(125, 100)}`, `0,04 = ${F(4, 100)}`] }, 'Un chiffre après la virgule : des dixièmes ; deux chiffres : des centièmes.')],
    ['Dans 64,37, quel est le chiffre des dixièmes ? des centièmes ? des unités ? Quelle est la partie entière ?',
      cm1Redac('Les chiffres de 64,37', cm1Tableau(['D', 'U', ',', 'dixièmes', 'centièmes'], [['6', '4', ',', '3', '7']]), 'Le chiffre des dixièmes est 3, celui des centièmes est 7, celui des unités est 4. La partie entière est 64.')],
    ['Décompose 8,56 en utilisant des fractions décimales.',
      cm1Redac('Décomposition de 8,56', { suite: [`8,56 = 8 + ${F(5, 10)} + ${F(6, 100)}`, `8,56 = 8 + ${F(56, 100)}`] }, '8,56, c\'est 8 unités, 5 dixièmes et 6 centièmes.')],
    [`Complète avec &lt;, &gt; ou =.${cm1Liste(['4,3 … 4,28', '0,7 … 0,70', '12,05 … 12,5', '9,99 … 10'])}`,
      cm1Redac('Comparaisons', { suite: ['4,3 &gt; 4,28', '0,7 = 0,70', '12,05 &lt; 12,5', '9,99 &lt; 10'] }, 'On compare d\'abord les parties entières, puis les dixièmes, puis les centièmes.')],
    ['Range dans l\'ordre croissant : 2,4 ; 2,04 ; 2,45 ; 4,2 ; 2.',
      cm1Redac('Ordre croissant', '2 &lt; 2,04 &lt; 2,4 &lt; 2,45 &lt; 4,2', 'Le plus petit nombre est 2 et le plus grand est 4,2.')],
    [`Encadre chaque nombre entre deux entiers consécutifs.${cm1Liste(['7,6', '0,38', '15,02'])}`,
      cm1Redac('Encadrements', { suite: ['7 &lt; 7,6 &lt; 8', '0 &lt; 0,38 &lt; 1', '15 &lt; 15,02 &lt; 16'] }, 'On regarde la partie entière : le nombre est compris entre elle et l\'entier suivant.')],
    [`Quels nombres correspondent aux points C et D ?${cm1Graduation(2, 10, [[0.9, 'C', '#E35D3A'], [1.3, 'D', '#2EA8C9']], { unite: 210 })}`,
      cm1Redac('Valeur d\'un petit écart', '1 ÷ 10 = 0,1', 'Un petit écart vaut 0,1.') + cm1Redac('Points C et D', { suite: ['C : 9 petits écarts après 0', 'D : 3 petits écarts après 1'] }, 'C correspond à 0,9 et D à 1,3.')],
  ], { titre: 'Rédaction type : « Comparer deux nombres décimaux »', lignes: [['6,4 et 6,38', 'Même partie entière (6).'], ['4 dixièmes &gt; 3 dixièmes', 'Je compare les dixièmes.'], ['donc 6,4 &gt; 6,38', 'Je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Simon Stevin et la virgule', [
    'Pendant longtemps, on n\'écrivait les parties d\'unité qu\'avec des fractions. En 1585, le savant flamand <b>Simon Stevin</b> publie un petit livre, <i>La Disme</i>, où il explique comment calculer très simplement avec des dixièmes, des centièmes, des millièmes.',
    'Sa notation était compliquée : il écrivait de petits numéros entourés après chaque chiffre ! Quelques années plus tard, d\'autres savants comme <b>John Napier</b> ont proposé d\'utiliser un simple point ou une virgule.',
    'Aujourd\'hui encore, les pays n\'ont pas tous choisi le même signe : en France on écrit 3,5 avec une virgule, mais au Royaume-Uni ou aux États-Unis on écrit 3.5 avec un point.',
  ]),
  quiz: [
    { q: '3/10 s\'écrit…', opts: ['3,10', '0,3', '0,03'], correct: 1 },
    { q: 'Dans 25,64, le chiffre des dixièmes est…', opts: ['5', '6', '4'], correct: 1 },
    { q: 'Quel est le plus grand nombre ?', opts: ['4,9', '4,19', '4,09'], correct: 0 },
    { q: '1 unité = …', opts: ['10 centièmes', '100 centièmes', '1 000 centièmes'], correct: 1 },
  ],
});
})();

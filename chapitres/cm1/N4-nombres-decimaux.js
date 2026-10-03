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

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), F = cm1Frac, C = plCase();
const lt = '&lt;', gt = '&gt;';
const bande = (n, k) => cm1Bande(n, k, { largeur: 170 });
PLANCHES['cm1|Nombres décimaux'] = [
  { titre: 'Dixièmes, centièmes et écriture à virgule', duree: '35 min',
    attendus: ['Comprendre les dixièmes et les centièmes', 'Passer d\'une fraction décimale à l\'écriture à virgule', 'Décomposer un nombre décimal'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'L\'unité est la bande entière. Écris la partie coloriée avec une fraction, puis avec une virgule.',
        eleve: plGrille([[10, 7], [10, 3], [10, 9]].map(([n, k]) => `${bande(n, k)} ${plFrac()} = ${B(3)}`), 1),
        corr: plGrille([[10, 7, '0,7'], [10, 3, '0,3'], [10, 9, '0,9']].map(([n, k, v]) => `${bande(n, k)} ${R(F(k, n))} = ${R(v)}`), 1) },
      { etoiles: 1, col: 1, consigne: 'Écris avec une virgule.',
        eleve: plListe([`${F(35, 100)} = ${B(3)}`, `${F(8, 10)} = ${B(3)}`, `${F(245, 100)} = ${B(3)}`, `${F(6, 100)} = ${B(3)}`]),
        corr: plListe([`${F(35, 100)} = ${R('0,35')}`, `${F(8, 10)} = ${R('0,8')}`, `${F(245, 100)} = ${R('2,45')}`, `${F(6, 100)} = ${R('0,06')}`]) },
      { etoiles: 1, col: 1, consigne: 'Écris avec une fraction décimale.',
        eleve: plListe([`0,9 = ${plFrac()}`, `0,47 = ${plFrac()}`, `3,1 = ${plFrac()}`, `0,05 = ${plFrac()}`]),
        corr: plListe([`0,9 = ${R(F(9, 10))}`, `0,47 = ${R(F(47, 100))}`, `3,1 = ${R(F(31, 10))}`, `0,05 = ${R(F(5, 100))}`]) },
      { etoiles: 2, col: 1, consigne: 'Dans le nombre 52,74, quel est…',
        eleve: plListe(['le chiffre des unités ? ' + B(2), 'le chiffre des dixièmes ? ' + B(2), 'le chiffre des centièmes ? ' + B(2), 'le chiffre des dizaines ? ' + B(2)]),
        corr: plListe(['le chiffre des unités ? ' + R(2), 'le chiffre des dixièmes ? ' + R(7), 'le chiffre des centièmes ? ' + R(4), 'le chiffre des dizaines ? ' + R(5)]) },
      { etoiles: 2, consigne: 'Décompose, puis recompose.',
        eleve: plGrille([`6,38 = ${B(2)} + ${plFrac()} + ${plFrac()}`, `${'4 + ' + F(5, 10) + ' + ' + F(2, 100)} = ${B(4)}`, `14,25 = ${B(2)} + ${plFrac()} + ${plFrac()}`, `${'7 + ' + F(9, 100)} = ${B(4)}`], 2),
        corr: plGrille([`6,38 = ${R(6)} + ${R(F(3, 10))} + ${R(F(8, 100))}`, `${'4 + ' + F(5, 10) + ' + ' + F(2, 100)} = ${R('4,52')}`, `14,25 = ${R(14)} + ${R(F(2, 10))} + ${R(F(5, 100))}`, `${'7 + ' + F(9, 100)} = ${R('7,09')}`], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en chiffres.',
        eleve: plListe(['trois unités et cinq dixièmes : ' + B(), 'douze unités et quatre centièmes : ' + B(), 'sept dixièmes : ' + B(), 'deux unités et quinze centièmes : ' + B()]),
        corr: plListe(['trois unités et cinq dixièmes : ' + R('3,5'), 'douze unités et quatre centièmes : ' + R('12,04'), 'sept dixièmes : ' + R('0,7'), 'deux unités et quinze centièmes : ' + R('2,15')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien y a-t-il de centièmes dans une unité ? Et dans 2,4 ? Explique.',
        corr: cm1Redac('Centièmes dans une unité', '1 = ' + F(100, 100), 'Il y a 100 centièmes dans une unité.')
          + cm1Redac('Centièmes dans 2,4', { suite: ['2 unités = 200 centièmes', '4 dixièmes = 40 centièmes', '200 + 40 = 240'] }, 'Dans 2,4, il y a 240 centièmes : 2,4 = ' + F(240, 100) + '.') },
    ] },
  { titre: 'Placer, comparer, ranger, encadrer', duree: '35 min',
    attendus: ['Repérer des nombres décimaux sur une demi-droite graduée', 'Comparer et ranger des nombres décimaux', 'Encadrer un nombre décimal entre deux entiers, entre deux dixièmes'],
    exos: [
      { etoiles: 1, consigne: 'Chaque unité est partagée en 10. Écris le nombre décimal de chaque point.',
        eleve: cm1Axe(0, 2, 0.1, 1, [[0.3, 'A'], [1.1, 'B'], [1.8, 'C']], { fmt: v => String(Math.round(v)) }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${B()}</span><span>B : ${B()}</span><span>C : ${B()}</span></div>`,
        corr: cm1Axe(0, 2, 0.1, 1, [[0.3, 'A'], [1.1, 'B'], [1.8, 'C']], { fmt: v => String(Math.round(v)) }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${R('0,3')}</span><span>B : ${R('1,1')}</span><span>C : ${R('1,8')}</span></div>` },
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`3,5 ${C} 3,48`, `0,7 ${C} 0,70`, `12,09 ${C} 12,1`, `5,3 ${C} 5,03`]),
        corr: plListe([`3,5 ${R(gt)} 3,48`, `0,7 ${R('=')} 0,70`, `12,09 ${R(lt)} 12,1`, `5,3 ${R(gt)} 5,03`]) },
      { etoiles: 2, col: 1, consigne: 'Range dans l\'ordre croissant : 2,5 ; 2,05 ; 2,55 ; 2,15 ; 0,25.',
        eleve: `<p>${B(3)} &lt; ${B(3)} &lt; ${B(3)} &lt; ${B(3)} &lt; ${B(3)}</p>`,
        corr: `<p>${R('0,25')} &lt; ${R('2,05')} &lt; ${R('2,15')} &lt; ${R('2,5')} &lt; ${R('2,55')}</p>` },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux nombres entiers qui se suivent.',
        eleve: plListe([`${B(2)} &lt; 4,7 &lt; ${B(2)}`, `${B(2)} &lt; 12,08 &lt; ${B(2)}`, `${B(2)} &lt; 0,9 &lt; ${B(2)}`]),
        corr: plListe([`${R(4)} &lt; 4,7 &lt; ${R(5)}`, `${R(12)} &lt; 12,08 &lt; ${R(13)}`, `${R(0)} &lt; 0,9 &lt; ${R(1)}`]) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux dixièmes qui se suivent.',
        eleve: plListe([`${B(3)} &lt; 3,46 &lt; ${B(3)}`, `${B(3)} &lt; 7,81 &lt; ${B(3)}`, `${B(3)} &lt; 0,15 &lt; ${B(3)}`]),
        corr: plListe([`${R('3,4')} &lt; 3,46 &lt; ${R('3,5')}`, `${R('7,8')} &lt; 7,81 &lt; ${R('7,9')}`, `${R('0,1')} &lt; 0,15 &lt; ${R('0,2')}`]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Léo dit : « 0,5 est plus petit que 0,25, car 5 est plus petit que 25. » A-t-il raison ? Explique.',
        corr: cm1Redac('Comparaison de 0,5 et 0,25', { suite: ['0,5 = ' + F(50, 100), '0,25 = ' + F(25, 100), '50 centièmes &gt; 25 centièmes'] }, 'Léo a tort : 0,5 est plus grand que 0,25. On compare d\'abord les dixièmes : 5 dixièmes contre 2 dixièmes.', `<span style="display:inline-flex;gap:22px;">${[[cm1Rect(0, 0, 5, 10), '0,5', '#E35D3A'], [cm1Rect(0, 0, 2, 10).concat(cm1Rect(2, 0, 1, 5)), '0,25', '#2EA8C9']].map(([c, t, co]) => `<span style="display:flex;flex-direction:column;align-items:center;">${cm1Quad(10, 10, c, { k: 6, c: co })}<b>${t}</b></span>`).join('')}</span>`) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au saut en longueur, Inès a sauté 2,8 m, Tom 2,75 m et Sami 2,08 m. Range les sauts du plus long au plus court. Qui a gagné ?',
        corr: cm1Redac('Comparaison des sauts', { suite: ['Les trois sauts ont 2 unités.', 'Je compare les dixièmes : 8 &gt; 7 &gt; 0.', '2,8 &gt; 2,75 &gt; 2,08'] }, 'Inès a gagné. Ensuite viennent Tom, puis Sami.') },
    ] },
];
})();

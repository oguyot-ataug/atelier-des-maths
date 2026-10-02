/* ============================================================
   CHAPITRE : Nombres décimaux jusqu'aux millièmes (CM2, N3, périodes 1)
   Programme du cycle 3 (CM2) : fractions décimales (dixièmes, centièmes, millièmes) et relations
   entre ces unités ; décomposition d'une fraction décimale supérieure à 1 (entier + fractions
   décimales de numérateur < 10) ; passage fraction décimale ↔ écriture à virgule ; demi-droite
   graduée ; partie entière et arrondi à l'entier ; comparer, encadrer, intercaler, ordonner.
   ============================================================ */
(() => {
const F = cm1Frac;
const H = t => `<span class="hl">${t}</span>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Nombres décimaux jusqu\'aux millièmes', slug: 'nombres-decimaux',
  cours: `
${cm1Lecon(1, 'Dixièmes, centièmes, millièmes')}
${cm1Regle(cm1Liste(['1 unité = 10 dixièmes = 100 centièmes = 1 000 millièmes', '1 dixième = 10 centièmes = 100 millièmes', '1 centième = 10 millièmes']))}
${cm1Regle(`En fractions :${cm1Liste([`1 = ${F(10, 10)} = ${F(100, 100)} = ${F(1000, 1000)}`, `${F(1, 10)} = ${F(10, 100)} = ${F(100, 1000)}`, `${F(1, 100)} = ${F(10, 1000)}`])}`)}
${ce2AnimFracEgales('c2-dec-recoupe', { legende: 'Chaque dixième partagé en 10 donne des centièmes.', presets: [{ nom: 'Un dixième', n: 10, k: 1, f: 10 }, { nom: 'Quatre dixièmes', n: 10, k: 4, f: 10 }] })}

${cm1Lecon(2, 'Des fractions décimales à l\'écriture à virgule')}
${cm1Exemple(`${F(4237, 1000)} (4 237 millièmes) se décompose ainsi :`, [`${F(4237, 1000)} = 4 + ${F(237, 1000)}`, `= 4 + ${F(2, 10)} + ${F(3, 100)} + ${F(7, 1000)}`, `= <b>4,237</b>`])}
${cm1Tableau(['Unités', ',', 'Dixièmes', 'Centièmes', 'Millièmes'], [['<b>4</b>', '<b>,</b>', '<b>2</b>', '<b>3</b>', '<b>7</b>']])}
${cm1Rem('Le 1<sup>er</sup> chiffre après la virgule est celui des dixièmes, le 2<sup>e</sup> celui des centièmes, le 3<sup>e</sup> celui des millièmes. 4,237 se lit « quatre unités et deux-cent-trente-sept millièmes » ou « quatre virgule deux-cent-trente-sept ».')}
${cm1Astuce(`Attention aux zéros :${cm1Liste([`${F(5, 1000)} = 0,005`, `${F(50, 1000)} = 0,050 = 0,05`])}Un zéro à la fin de la partie décimale ne change rien ; un zéro juste après la virgule change tout !`)}

${cm1Lecon(3, 'Partie entière et arrondi à l\'entier')}
${cm1Regle('La <b>partie entière</b> d\'un nombre décimal est le nombre écrit à gauche de la virgule : la partie entière de 12,68 est 12.<br>L\'<b>arrondi à l\'entier</b> est l\'entier le plus proche : 12,68 est entre 12 et 13, plus proche de 13 (car 0,68 &gt; 0,5). L\'arrondi de 12,68 est <b>13</b> ; celui de 12,3 est 12.')}

${cm1Lecon(4, 'Placer sur une demi-droite graduée')}
<div class="figure-wrap">${cm1Graduation(1, 10, [[0.35, 'A', '#E35D3A'], [0.8, 'B', '#2EA8C9']], { unite: 440, etiquettes: i => i === 0 ? '2' : i === 10 ? '2,1' : i === 5 ? '2,05' : '' })}</div>
${cm1Exemple('Entre 2 et 2,1, il y a 10 écarts : chaque écart vaut un centième (0,01).', ['A est au milieu entre 2,03 et 2,04 : A correspond à <b>2,035</b>.', 'B correspond à <b>2,08</b>.'])}
${ce2AnimSauts('c2-dec-sauts', { legende: 'De centième en centième : chaque petit écart vaut 0,01.', presets: [{ nom: 'De 2 à 2,08', depart: 2, sauts: [[0.01, '+'], [0.01, '+'], [0.01, '+'], [0.01, '+'], [0.01, '+'], [0.01, '+'], [0.01, '+'], [0.01, '+']], min: 1.99, max: 2.1, fmt: v => cmNb(v), fin: '8 centièmes après 2 : B correspond à <b>2,08</b>.' }] })}

${cm1Lecon(5, 'Comparer, encadrer, intercaler')}
${cm1Regle('On compare les parties entières, puis les dixièmes, puis les centièmes, puis les millièmes.')}
${cm1Exemple('Exemples :', ['3,405 &lt; 3,45 (même partie entière et mêmes dixièmes, puis 0 centième &lt; 5 centièmes).', 'Encadrer 3,405 entre deux dixièmes consécutifs : 3,4 &lt; 3,405 &lt; 3,5.', 'Intercaler un nombre entre 1,7 et 1,8 : 1,75 (on peut toujours en trouver, par exemple 1,701 ; 1,72…).'])}
`,
  methode: `
${cm1Demo('c2-dec-dec', 'Décomposer une fraction décimale', `Écris ${F('3 052', '1 000')} comme un entier plus des fractions décimales de numérateur inférieur à 10, puis avec une virgule.`)}
${cm1Demo('c2-dec-comp', 'Comparer deux nombres décimaux', 'Compare 7,09 et 7,1.')}
`,
  demos: [
    ['c2-dec-dec', [
      { expr: `${F(3052, 1000)} = ${F(3000, 1000)} + ${F(52, 1000)}`, note: '1 000 millièmes = 1 unité, donc 3 000 millièmes = 3 unités.' },
      { expr: `= 3 + ${F(52, 1000)}`, note: 'Il reste 52 millièmes.' },
      { expr: `= 3 + ${F(0, 10)} + ${F(5, 100)} + ${F(2, 1000)}`, note: '52 millièmes = 5 centièmes et 2 millièmes ; il n\'y a pas de dixième.' },
      { expr: `${F(3052, 1000)} = 3,052`, note: 'On n\'oublie pas le 0 au rang des dixièmes.' },
    ]],
    ['c2-dec-comp', [
      { expr: '7,09   et   7,1', note: 'Même partie entière : 7.' },
      { expr: `7,${H('0')}9   et   7,${H('1')}`, note: 'On compare les dixièmes : 0 &lt; 1.' },
      { expr: '7,09 &lt; 7,1', note: 'Inutile de regarder les centièmes. Le piège : 09 n\'est pas plus grand que 1 ! On peut écrire 7,1 = 7,10 pour s\'en convaincre.' },
    ]],
  ],
  exos: cm1Exos('c2dec', [
    [`Écris ces nombres avec une virgule.${cm1Liste([F(8, 1000), F(1245, 1000), F(37, 100), F(506, 100)])}`,
      cm1Redac('Écritures à virgule', { suite: [`${F(8, 1000)} = 0,008`, `${F(1245, 1000)} = 1,245`, `${F(37, 100)} = 0,37`, `${F(506, 100)} = 5,06`] }, 'Les millièmes ont trois chiffres après la virgule, les centièmes deux.')],
    [`Écris ces nombres sous forme de fraction décimale.${cm1Liste(['2,4', '0,019', '12,305'])}`,
      cm1Redac('Fractions décimales', { suite: [`2,4 = ${F(24, 10)}`, `0,019 = ${F(19, 1000)}`, `12,305 = ${F(12305, 1000)}`] }, 'Le nombre de chiffres après la virgule donne le dénominateur : 10, 100 ou 1 000.')],
    ['Dans 58,642, quel est le chiffre des centièmes ? celui des millièmes ? Quelle est la partie entière ?',
      cm1Redac('Les chiffres de 58,642', cm1Tableau(['D', 'U', ',', 'dixièmes', 'centièmes', 'millièmes'], [['5', '8', ',', '6', '4', '2']]), 'Le chiffre des centièmes est 4, celui des millièmes est 2, la partie entière est 58.')],
    [`Complète.${cm1Liste(['1 dixième = … millièmes', '3 centièmes = … millièmes', '2 unités = … centièmes'])}`,
      cm1Redac('Conversions', { suite: ['1 dixième = 100 millièmes', '3 centièmes = 3 × 10 = 30 millièmes', '2 unités = 2 × 100 = 200 centièmes'] }, 'Les nombres manquants sont 100, 30 et 200.')],
    [`Donne la partie entière puis l'arrondi à l'entier.${cm1Liste(['6,7', '15,28', '0,49', '9,5'])}`,
      cm1Redac('Parties entières et arrondis', { suite: ['6,7 : partie entière 6, arrondi 7', '15,28 : partie entière 15, arrondi 15', '0,49 : partie entière 0, arrondi 0', '9,5 : partie entière 9, arrondi 10'] }, 'Quand on est pile au milieu, comme 9,5, on arrondit à l\'entier supérieur.')],
    ['Range dans l\'ordre croissant : 4,5 ; 4,05 ; 4,505 ; 4,055 ; 4,55.',
      cm1Redac('Ordre croissant', '4,05 &lt; 4,055 &lt; 4,5 &lt; 4,505 &lt; 4,55', 'On compare rang par rang : dixièmes, puis centièmes, puis millièmes.')],
    ['Intercale un nombre entre 0,3 et 0,31, puis entre 2,999 et 3.',
      cm1Redac('Entre 0,3 et 0,31', '0,3 &lt; 0,305 &lt; 0,31', 'On peut intercaler 0,305.') + cm1Redac('Entre 2,999 et 3', '2,999 &lt; 2,9995 &lt; 3', 'On peut intercaler 2,9995.')],
    ['Lors d\'un 100 m, Léo a couru en 13,08 s, Nora en 13,1 s et Sam en 12,95 s. Qui a gagné ?',
      cm1Redac('Le plus petit temps', '12,95 &lt; 13,08 &lt; 13,1', 'Le plus petit temps gagne : c\'est Sam qui a gagné.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Simon Stevin et La Disme', [
    'En 1585, le Flamand <b>Simon Stevin</b> publie <i>La Disme</i> : il montre qu\'avec des dixièmes, centièmes et millièmes, tous les calculs des marchands et des ingénieurs deviennent aussi simples que ceux des nombres entiers.',
    'Il rêvait que les poids, les longueurs et les monnaies soient tous « décimaux ». Son rêve s\'est réalisé deux siècles plus tard avec le <b>système métrique</b>, adopté pendant la Révolution française.',
  ]),
  quiz: [
    { q: '7/1 000 s\'écrit…', opts: ['0,7', '0,07', '0,007'], correct: 2 },
    { q: 'Quel est le plus grand ?', opts: ['2,09', '2,1', '2,099'], correct: 1 },
    { q: 'L\'arrondi à l\'entier de 8,62 est…', opts: ['8', '9', '8,6'], correct: 1 },
  ],
});
})();

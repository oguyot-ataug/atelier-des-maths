/* ============================================================
   CHAPITRE : L'addition posée (CP, N12, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : poser et calculer l'addition de
   deux nombres à deux chiffres (somme inférieure à 100), en alignant les unités sous les unités et
   les dizaines sous les dizaines ; sans retenue, puis avec retenue (dix unités font une dizaine) ;
   l'utiliser pour résoudre des problèmes.
   Pensé pour être projeté : l'addition qui se déroule colonne par colonne, et les cubes qui la montrent.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const pose = (a, b, r) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r || '  ');
const plus = (a, b) => lig(cpBarres(a, { q: 8 }), '<b style="font-size:1.4rem;">+</b>', cpBarres(b, { q: 8, cd: '#7FCBA6', cu: '#7FD0E6' }));

cm1Chapitre({
  niveau: 'cp', titre: 'L\'addition posée', slug: 'addition-posee',
  cours: `
${cm1Lecon(1, 'Poser une addition')}
${cm1Def(`On écrit les nombres l'un sous l'autre : <b>les unités sous les unités</b>, <b>les dizaines sous les dizaines</b>.<div class="figure-wrap" style="text-align:center;">${cm1Posee([[' ', '23'], ['+', '45'], [' ', '']])}</div>`, 'Bien aligner')}
${cm1Astuce('On peut écrire un petit « d » au-dessus de la colonne des dizaines et un petit « u » au-dessus de celle des unités.')}

${cm1Lecon(2, 'Sans retenue')}
${cm1Regle(`On commence toujours par la colonne des <b>unités</b>, à droite.${cm1Liste(['unités : 3 + 5 = 8 ;', 'dizaines : 2 + 4 = 6.'])}<div class="figure-wrap" style="text-align:center;">${pose(23, 45)}</div>${plus(23, 45)}${P('2 barres + 4 barres = 6 barres ; 3 cubes + 5 cubes = 8 cubes : <b>23 + 45 = 68</b>.')}`, 'Calculer')}

${cm1Lecon(3, 'Avec une retenue')}
${cm1AnimOperation('cp-n12-op', { a: '38', op: '+', b: '25', ops: ['+'], legende: 'Tapez vos propres nombres (résultat jusqu\'à 99), puis « Calculer » : l\'addition se déroule colonne par colonne.' })}
${cm1Regle(`38 + 25 : dans les unités, 8 + 5 = 13. <b>13 unités, c'est 1 dizaine et 3 unités</b> : j'écris 3 et je <b>retiens 1</b> au-dessus des dizaines.${cm1Liste(['unités : 8 + 5 = 13, j\'écris 3, je retiens 1 ;', 'dizaines : 1 + 3 + 2 = 6.'])}<div class="figure-wrap" style="text-align:center;">${pose(38, 25, '1 ')}</div>`, 'La retenue')}
${cm1Def(`${plus(38, 25)}${P('8 cubes + 5 cubes = 13 cubes : on fait une nouvelle barre de dix, il reste 3 cubes.')}${lig(cpBarres(63, { q: 8 }))}${P('<b>38 + 25 = 63</b>')}`, 'Avec les cubes')}

${cm1Lecon(4, 'Vérifier son résultat')}
${cm1Regle('Avant de poser, on cherche un <b>ordre de grandeur</b> : 38 + 25, c\'est un peu plus que 30 + 20 = 50. Un résultat de 513 ou de 13 serait donc faux !', 'Vérifier')}
`,
  methode: `
${cm1Demo('cp-n12-m-poser', 'Poser et calculer 47 + 36', 'Pose l\'addition et calcule.')}
${cm1Demo('cp-n12-m-pb', 'Résoudre un problème avec une addition posée', 'Au CP A, il y a 26 élèves. Au CP B, il y en a 27. Combien d\'élèves y a-t-il en tout ?')}
`,
  demos: [
    ['cp-n12-m-poser', [
      { expr: 'J\'aligne les unités et les dizaines.', note: 'Le 7 au-dessus du 6 (les unités), le 4 au-dessus du 3 (les dizaines).', fig: cm1Posee([[' ', '47'], ['+', '36'], [' ', '']]) },
      { expr: 'Unités : 7 + 6 = 13', note: 'J\'écris 3 et je retiens 1.', fig: cm1Posee([[' ', '47'], ['+', '36'], [' ', ' 3']], '1 ') },
      { expr: 'Dizaines : 1 + 4 + 3 = 8', note: 'Je n\'oublie pas la retenue.', fig: pose(47, 36, '1 ') },
      { expr: '47 + 36 = 83', note: 'Vérification : 40 + 30 = 70, et 83 est un peu plus que 70.' },
    ]],
    ['cp-n12-m-pb', [
      { expr: 'On réunit les deux classes : c\'est une addition.', note: '26 + 27.' },
      { expr: 'Unités : 6 + 7 = 13', note: 'J\'écris 3, je retiens 1.' },
      { expr: 'Dizaines : 1 + 2 + 2 = 5', note: 'Résultat : 53.', fig: pose(26, 27, '1 ') },
      { expr: 'Il y a 53 élèves en tout.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('cp-n12', [
    ['Pose et calcule : 32 + 46.',
      cm1Redac('32 + 46', { pose: pose(32, 46) }, '32 + 46 = 78.')],
    ['Pose et calcule : 51 + 27.',
      cm1Redac('51 + 27', { pose: pose(51, 27) }, '51 + 27 = 78.')],
    ['Pose et calcule : 29 + 34.',
      cm1Redac('29 + 34', { pose: pose(29, 34, '1 ') }, '29 + 34 = 63 : dans les unités, j\'ai écrit 3 et retenu 1 dizaine.')],
    ['Pose et calcule : 45 + 45.',
      cm1Redac('45 + 45', { pose: pose(45, 45, '1 ') }, '45 + 45 = 90.')],
    ['Léo a 37 billes. Sa sœur lui en donne 18. Combien a-t-il de billes ?',
      cm1Redac('Billes de Léo', { pose: pose(37, 18, '1 ') }, 'Léo a 55 billes.')],
    ['Un livre coûte 24 € et un jeu coûte 39 €. Combien coûtent-ils ensemble ?',
      cm1Redac('Prix total', { pose: pose(24, 39, '1 ') }, 'Ensemble, ils coûtent 63 €.')],
    ['Sam a posé 36 + 25 et trouve 511. Qu\'en penses-tu ?',
      cm1Redac('L\'erreur de Sam', { pose: pose(36, 25, '1 ') }, 'C\'est faux : 30 + 20 = 50, le résultat doit être un peu plus que 50. Sam a écrit 11 au lieu d\'écrire 1 et de retenir 1. La bonne réponse est 61.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : nos chiffres viennent de loin', [
    'Pour poser une addition en colonnes, il faut des chiffres où la <b>place</b> compte : dans 38, le 3 vaut 3 dizaines. Cette idée géniale, avec le <b>zéro</b>, vient d\'<b>Inde</b>, il y a environ 1 500 ans.',
    'Les savants arabes l\'ont transmise à l\'Europe, il y a environ 800 ans. C\'est pour cela qu\'on parle de « chiffres arabes ». Avant, en Europe, on utilisait les chiffres romains : essaie de poser XXXVIII + XXV !',
  ]),
  quiz: [
    { q: '24 + 13 = …', opts: ['37', '27', '317'], correct: 0 },
    { q: 'Dans 47 + 35, la colonne des unités donne 7 + 5 = 12. On écrit…', opts: ['12', '2 et on retient 1', '1 et on retient 2'], correct: 1 },
    { q: '56 + 28 = …', opts: ['74', '84', '714'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'On commence par la colonne…', r: ['des unités', 'des dizaines', 'de gauche', 'au hasard'], ok: 0 },
    { l: 2, q: '41 + 35 = …', r: ['76', '86', '66', '416'], ok: 0 },
    { l: 2, q: '23 + 52 = …', r: ['75', '85', '65', '74'], ok: 0 },
    { l: 3, q: '8 + 6 = 14 : j\'écris…', r: ['4, je retiens 1', '14', '1, je retiens 4', '6'], ok: 0 },
    { l: 3, q: '19 + 19 = …', r: ['28', '38', '318', '39'], ok: 1 },
    { l: 3, q: '35 + 47 = …', r: ['72', '82', '712', '81'], ok: 1 },
    { l: 4, q: '42 + 31 est proche de…', r: ['70', '7', '700', '40'], ok: 0 },
  ],
});
})();

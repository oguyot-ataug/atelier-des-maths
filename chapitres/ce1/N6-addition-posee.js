/* ============================================================
   CHAPITRE : L'addition posée (CE1, N6, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : poser et calculer des additions
   de nombres de deux ou trois chiffres (résultat jusqu'à 1 000), avec une ou deux retenues ;
   additionner trois nombres ; contrôler par un ordre de grandeur ; résoudre des problèmes.
   Pensé pour être projeté : l'addition qui se déroule colonne par colonne, avec ses propres nombres.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const pose = (a, b, r) => `<div class="figure-wrap" style="text-align:center;">${cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r)}</div>`;
const poseR = (a, b, r) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r);

cm1Chapitre({
  niveau: 'ce1', titre: 'L\'addition posée', slug: 'addition-posee',
  cours: `
${cm1Lecon(1, 'Poser l\'addition')}
${cm1Regle('On écrit les nombres l\'un sous l\'autre en alignant <b>les unités sous les unités</b>, les dizaines sous les dizaines, les centaines sous les centaines. On calcule en commençant par la droite : les unités.', 'Bien aligner')}
${pose(352, 136, '   ')}
${cm1Liste(['unités : 2 + 6 = 8 ;', 'dizaines : 5 + 3 = 8 ;', 'centaines : 3 + 1 = 4.'])}

${cm1Lecon(2, 'Avec une retenue')}
${cm1AnimOperation('ce1-n6-op', { a: '247', op: '+', b: '186', ops: ['+'], legende: 'Tapez vos propres nombres (résultat jusqu\'à 1 000), puis « Calculer » : l\'addition se déroule colonne par colonne.' })}
${cm1Regle(`Quand une colonne dépasse 9, on écrit les unités et on <b>retient</b> la dizaine dans la colonne suivante.${cm1Liste(['unités : 7 + 6 = 13, j\'écris 3, je retiens 1 ;', 'dizaines : 1 + 4 + 8 = 13, j\'écris 3, je retiens 1 ;', 'centaines : 1 + 2 + 1 = 4.'])}${pose(247, 186, '11 ')}`, 'La retenue')}
${cm1Rem('10 unités font 1 dizaine : c\'est pour cela qu\'on retient 1 dans la colonne des dizaines. De même, 10 dizaines font 1 centaine.')}

${cm1Lecon(3, 'Additionner trois nombres')}
${cm1Regle(`On pose les trois nombres bien alignés. La retenue peut être 2 !<div class="figure-wrap" style="text-align:center;">${cm1Posee([[' ', '68'], ['+', '75'], ['+', '49'], [' ', '192']], '12 ')}</div>${cm1Liste(['unités : 8 + 5 + 9 = 22, j\'écris 2, je retiens 2 ;', 'dizaines : 2 + 6 + 7 + 4 = 19, j\'écris 9, je retiens 1 ;', 'centaines : 1.'])}`, 'Trois nombres')}

${cm1Lecon(4, 'Vérifier avec un ordre de grandeur')}
${cm1Regle('Avant de poser, on arrondit : 247 + 186, c\'est à peu près 250 + 200 = 450. Le résultat 433 est proche : il est plausible. Un résultat de 3 313 serait faux !', 'Vérifier')}
`,
  methode: `
${cm1Demo('ce1-n6-m-poser', 'Poser et calculer 465 + 278', 'Pose l\'addition et calcule.')}
${cm1Demo('ce1-n6-m-pb', 'Un problème d\'addition', 'Un fermier a 356 poules et 287 canards. Combien d\'animaux a-t-il ?')}
`,
  demos: [
    ['ce1-n6-m-poser', [
      { expr: 'J\'aligne les unités.', note: '5 au-dessus de 8, 6 au-dessus de 7, 4 au-dessus de 2.', fig: cm1Posee([[' ', '465'], ['+', '278'], [' ', '']]) },
      { expr: 'Unités : 5 + 8 = 13', note: 'J\'écris 3, je retiens 1.' },
      { expr: 'Dizaines : 1 + 6 + 7 = 14', note: 'J\'écris 4, je retiens 1.' },
      { expr: 'Centaines : 1 + 4 + 2 = 7', note: '465 + 278 = 743.', fig: poseR(465, 278, '11 ') },
    ]],
    ['ce1-n6-m-pb', [
      { expr: 'On réunit les poules et les canards.', note: 'C\'est une addition : 356 + 287.' },
      { expr: 'Ordre de grandeur : 350 + 300 = 650', note: 'Le résultat sera proche de 650.' },
      { expr: '356 + 287 = 643', note: 'Je pose et je calcule.', fig: poseR(356, 287, '11 ') },
      { expr: 'Le fermier a 643 animaux.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('ce1-n6', [
    ['Pose et calcule : 324 + 152.',
      cm1Redac('324 + 152', { pose: poseR(324, 152, '   ') }, '324 + 152 = 476.')],
    ['Pose et calcule : 58 + 67.',
      cm1Redac('58 + 67', { pose: poseR(58, 67, '11 ') }, '58 + 67 = 125.')],
    ['Pose et calcule : 439 + 245.',
      cm1Redac('439 + 245', { pose: poseR(439, 245, ' 1 ') }, '439 + 245 = 684.')],
    ['Pose et calcule : 576 + 198.',
      cm1Redac('576 + 198', { pose: poseR(576, 198, '11 ') }, '576 + 198 = 774.')],
    ['Pose et calcule : 35 + 47 + 26.',
      cm1Redac('35 + 47 + 26', { pose: cm1Posee([[' ', '35'], ['+', '47'], ['+', '26'], [' ', '108']], '11 ') }, '35 + 47 + 26 = 108.')],
    ['Une école a 234 élèves en maternelle et 389 en élémentaire. Combien d\'élèves en tout ?',
      cm1Redac('Élèves de l\'école', { pose: poseR(234, 389, '11 ') }, 'L\'école a 623 élèves.')],
    ['Un vélo coûte 285 € et un casque 49 €. Combien coûtent-ils ensemble ?',
      cm1Redac('Prix total', { pose: poseR(285, 49, '11 ') }, 'Ensemble, ils coûtent 334 €.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les abacistes et les algoristes', [
    'Au Moyen Âge, en Europe, deux camps s\'affrontaient : les <b>abacistes</b>, qui calculaient avec des jetons sur une table à compter (l\'abaque), et les <b>algoristes</b>, qui posaient les calculs par écrit avec les chiffres venus d\'Inde et des pays arabes.',
    'Le nom « algoriste » vient de celui d\'un savant de Bagdad, <b>al-Khwârizmî</b>, qui avait écrit un livre de calcul il y a environ 1 200 ans. Ce sont les algoristes qui ont gagné : on pose les opérations sur papier !',
  ]),
  quiz: [
    { q: '243 + 125 = …', opts: ['368', '358', '378'], correct: 0 },
    { q: '7 + 8 = 15 dans les unités : j\'écris…', opts: ['5 et je retiens 1', '15', '1 et je retiens 5'], correct: 0 },
    { q: '199 + 199 est proche de…', opts: ['400', '200', '4000'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'On commence l\'addition posée par…', r: ['les unités', 'les centaines', 'la gauche', 'le plus grand'], ok: 0 },
    { l: 1, q: '420 + 360 = …', r: ['780', '760', '880', '78'], ok: 0 },
    { l: 2, q: '57 + 38 = …', r: ['95', '85', '815', '96'], ok: 0 },
    { l: 2, q: '165 + 235 = …', r: ['400', '390', '300', '3910'], ok: 0 },
    { l: 3, q: '20 + 30 + 40 = …', r: ['90', '70', '80', '900'], ok: 0 },
    { l: 4, q: '312 + 288 est proche de…', r: ['600', '500', '60', '6000'], ok: 0 },
  ],
});
})();

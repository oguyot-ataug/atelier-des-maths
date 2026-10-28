/* ============================================================
   CHAPITRE : Tables de multiplication de 6, 7, 8 et 9 (CE1, N15, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul mental : « connaitre dans
   les deux sens les tables de multiplication » (A × B = C avec A et B de 0 à 10). L'apprentissage
   s'étale sur l'année ; en fin de CE1, la mémorisation des dernières tables peut être encore
   imparfaite (elle est renforcée au CE2). On s'appuie sur ce que l'on sait : 3 × 7 = 7 × 3, la
   table de 6 est le double de celle de 3, celle de 8 le double de celle de 4, 9 × n = 10 × n − n,
   7 × n = 5 × n + 2 × n.
   Pensé pour être projeté : la table qui se construit rangée par rangée.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const table = t => cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => String((i + 1) * t))]]);

cm1Chapitre({
  niveau: 'ce1', titre: 'Tables de multiplication de 6, 7, 8 et 9', slug: 'tables-6-7-8-9',
  cours: `
${cm1Lecon(1, 'La table de 6')}
${ce1AnimTable('ce1-n15-table', { t: 6, tables: [6, 7, 8, 9] })}
${cm1Def(`${table(6)}`, 'Table de 6')}
${cm1Regle(`Multiplier par 6, c'est prendre le <b>double</b> de la table de 3 :${cm1Liste(['3 × 7 = 21', 'le double de 21, c\'est 42', 'donc 6 × 7 = 42'])}`, 'Le double de la table de 3')}

${cm1Lecon(2, 'La table de 7')}
${cm1Def(`${table(7)}`, 'Table de 7')}
${cm1Regle(`7 fois, c'est 5 fois et encore 2 fois :${cm1Liste(['7 × 6 = 5 × 6 + 2 × 6', '7 × 6 = 30 + 12', '7 × 6 = 42'])}`, 'Avec les tables de 5 et de 2')}

${cm1Lecon(3, 'Les tables de 8 et de 9')}
${cm1Def(`${table(8)}${table(9)}`, 'Tables de 8 et de 9')}
${cm1Regle(`Multiplier par 8, c'est prendre le double de la table de 4 :${cm1Liste(['4 × 6 = 24', 'le double de 24, c\'est 48', 'donc 8 × 6 = 48'])}`, 'Le double de la table de 4')}
${cm1Regle(`9 fois, c'est 10 fois moins 1 fois :${cm1Liste(['9 × 7 = 10 × 7 − 7', '9 × 7 = 70 − 7', '9 × 7 = 63'])}`, 'Avec la table de 10')}
${cm1Astuce('Dans la table de 9, les deux chiffres du résultat font toujours 9 : 18 (1 + 8), 27, 36, 45, 54, 63, 72, 81.')}

${cm1Lecon(4, 'Ce que l\'on sait déjà')}
${cm1Regle(`L'ordre ne change pas le résultat : 6 × 4 = 4 × 6. Avec les tables de 2, 3, 4, 5 et 10 déjà apprises, il ne reste que dix résultats nouveaux :${cm1Liste(['6 × 6 = 36 ; 6 × 7 = 42 ; 6 × 8 = 48 ; 6 × 9 = 54', '7 × 7 = 49 ; 7 × 8 = 56 ; 7 × 9 = 63', '8 × 8 = 64 ; 8 × 9 = 72', '9 × 9 = 81'])}`, 'Dix résultats à retenir')}
${cm1Rem('Ces dernières tables s\'apprennent jusqu\'à la fin de l\'année, et on continue au CE2 : ce n\'est pas grave de devoir encore réfléchir un peu pour 7 × 8 !')}
`,
  methode: `
${cm1Demo('ce1-n15-m-six', 'Retrouver 6 × 8', 'Retrouve 6 × 8 à partir de la table de 3.')}
${cm1Demo('ce1-n15-m-neuf', 'Retrouver 9 × 6', 'Retrouve 9 × 6 avec la table de 10.')}
`,
  demos: [
    ['ce1-n15-m-six', [
      { expr: '3 × 8 = 24', note: 'Je connais la table de 3.' },
      { expr: '24 + 24 = 48', note: 'Je prends le double.' },
      { expr: '6 × 8 = 48', note: 'Six fois 8.', fig: ce1Rangees(6, 8, { p: 18 }) },
    ]],
    ['ce1-n15-m-neuf', [
      { expr: '10 × 6 = 60', note: 'Dix fois 6.' },
      { expr: '60 − 6 = 54', note: 'J\'enlève une fois 6.' },
      { expr: '9 × 6 = 54', note: 'Neuf fois 6.', fig: ce1Rangees(9, 6, { p: 18 }) },
    ]],
  ],
  exos: cm1Exos('ce1-n15', [
    ['Calcule : 6 × 7.',
      cm1Redac('6 × 7', { suite: ['3 × 7 = 21', '21 + 21 = 42'] }, '6 × 7 = 42.')],
    ['Calcule : 7 × 8.',
      cm1Redac('7 × 8', { suite: ['5 × 8 = 40', '2 × 8 = 16', '40 + 16 = 56'] }, '7 × 8 = 56.')],
    ['Calcule : 8 × 9.',
      cm1Redac('8 × 9', { suite: ['4 × 9 = 36', '36 + 36 = 72'] }, '8 × 9 = 72.')],
    ['Calcule : 9 × 4.',
      cm1Redac('9 × 4', { suite: ['10 × 4 = 40', '40 − 4 = 36'] }, '9 × 4 = 36.')],
    ['Complète : 7 × … = 49.',
      cm1Redac('7 × … = 49', '7 × 7 = 49', 'Il faut 7.')],
    [`Combien de jetons ?${lig(ce1Rangees(6, 9, { p: 18 }))}`,
      cm1Redac('Les jetons', '6 × 9 = 54', '6 rangées de 9 : 54 jetons.')],
    ['Une semaine a 7 jours. Combien de jours y a-t-il dans 8 semaines ?',
      cm1Redac('Jours', '8 × 7 = 56', 'Il y a 56 jours dans 8 semaines.')],
    ['Une araignée a 8 pattes. Combien de pattes ont 6 araignées ?',
      cm1Redac('Pattes des araignées', '6 × 8 = 48', '6 araignées ont 48 pattes.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter sur ses doigts', [
    'Autrefois, en France, des paysans retrouvaient les tables de 6 à 9 avec leurs <b>doigts</b>. Pour 7 × 8, on lève 2 doigts d\'une main (7 = 5 + 2) et 3 de l\'autre (8 = 5 + 3).',
    'Les doigts levés comptent pour des dizaines : 2 + 3 = 5 dizaines. On multiplie les doigts baissés : 3 × 2 = 6. Et 7 × 8 = 56 ! Essaie avec 6 × 9.',
  ]),
  quiz: [
    { q: '6 × 7 = …', opts: ['42', '36', '67'], correct: 0 },
    { q: '8 × 8 = …', opts: ['64', '56', '16'], correct: 0 },
    { q: '9 × 5 = …', opts: ['45', '40', '54'], correct: 0 },
    { q: '7 × … = 63', opts: ['9', '8', '7'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '6 × 6 = …', r: ['36', '12', '66', '30'], ok: 0 },
    { l: 1, q: '6 × 8 = …', r: ['48', '14', '42', '56'], ok: 0 },
    { l: 2, q: '7 × 7 = …', r: ['49', '14', '42', '56'], ok: 0 },
    { l: 2, q: '7 × 9 = …', r: ['63', '16', '72', '56'], ok: 0 },
    { l: 3, q: '8 × 4 = …', r: ['32', '12', '36', '24'], ok: 0 },
    { l: 3, q: '9 × 9 = …', r: ['81', '18', '99', '72'], ok: 0 },
    { l: 4, q: '9 × 6 = 6 × …', r: ['9', '6', '54', '15'], ok: 0 },
    { l: 4, q: '8 × … = 56', r: ['7', '6', '8', '9'], ok: 0 },
  ],
});
})();

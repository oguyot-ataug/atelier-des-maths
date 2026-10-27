/* ============================================================
   CHAPITRE : Tables de multiplication de 2, 5 et 10 (CE1, N8, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul : construire et mémoriser
   les tables de 2, 5 et 10 (compter de 2 en 2, de 5 en 5, de 10 en 10), les liens entre elles
   (la table de 2 donne les doubles, 5 × n est la moitié de 10 × n), les utiliser pour résoudre des
   problèmes ; commencer à les savoir par cœur.
   Pensé pour être projeté : la table qui se construit rangée par rangée.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const table = t => cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => String((i + 1) * t))]]);

cm1Chapitre({
  niveau: 'ce1', titre: 'Tables de multiplication de 2, 5 et 10', slug: 'tables-2-5-10',
  cours: `
${cm1Lecon(1, 'La table de 2')}
${ce1AnimTable('ce1-n8-table', { t: 2, tables: [2, 5, 10] })}
${cm1Def(`${table(2)}`, 'Table de 2')}
${cm1Regle('Multiplier par 2, c\'est prendre le <b>double</b> : 2 × 7, c\'est 7 + 7, donc 14. Les résultats de la table de 2 sont tous <b>pairs</b> : ils finissent par 0, 2, 4, 6 ou 8.')}

${cm1Lecon(2, 'La table de 5')}
${cm1Def(`${table(5)}`, 'Table de 5')}
${cm1Regle('On compte de 5 en 5 : 5, 10, 15, 20… Les résultats finissent toujours par <b>5 ou 0</b>. Avec les doigts : 5 × 3, ce sont les doigts de 3 mains.')}

${cm1Lecon(3, 'La table de 10')}
${cm1Def(`${table(10)}`, 'Table de 10')}
${cm1Regle('Multiplier par 10, c\'est compter des dizaines : 10 × 6 = 60, 6 dizaines. On ajoute un <b>0</b> à droite du nombre.')}
${cm1Astuce('5 × 6, c\'est la moitié de 10 × 6 : la moitié de 60, c\'est 30. La table de 5 est la moitié de la table de 10 !')}

${cm1Lecon(4, 'Utiliser les tables')}
${cm1Exemple('Exemple', [`Un billet de 5 €. Combien valent 7 billets de 5 € ?${cm1Redac('Valeur des billets', '7 × 5 = 35', '7 billets de 5 € valent 35 €.')}`])}
${cm1Rem('Pour apprendre une table : la réciter dans l\'ordre, puis dans le désordre, avec des cartes ou des jeux (le furet, la bataille des multiplications).')}
`,
  methode: `
${cm1Demo('ce1-n8-m-retrouver', 'Retrouver 6 × 5 qu\'on a oublié', 'Retrouve le résultat de 6 × 5.')}
${cm1Demo('ce1-n8-m-pb', 'Résoudre un problème', 'Un mille-pattes de dessin animé a 10 pattes. Combien de pattes pour 4 mille-pattes ?')}
`,
  demos: [
    ['ce1-n8-m-retrouver', [
      { expr: '5, 10, 15, 20, 25, 30', note: 'Je compte 6 fois de 5 en 5 sur mes doigts.' },
      { expr: '10 × 6 = 60', note: 'Ou bien : je calcule 10 × 6.' },
      { expr: '6 × 5 = 30', note: 'La moitié de 60 : 30.' },
    ]],
    ['ce1-n8-m-pb', [
      { expr: '4 fois 10 pattes', note: '4 groupes égaux de 10.' },
      { expr: '4 × 10 = 40', note: '4 dizaines.' },
      { expr: '4 mille-pattes ont 40 pattes.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('ce1-n8', [
    ['Calcule : 2 × 8.',
      cm1Redac('2 × 8', '2 × 8 = 16', 'Le double de 8, c\'est 16.')],
    ['Calcule : 5 × 7.',
      cm1Redac('5 × 7', '5 × 7 = 35', '5, 10, 15, 20, 25, 30, 35 : 5 × 7 = 35.')],
    ['Calcule : 10 × 9.',
      cm1Redac('10 × 9', '10 × 9 = 90', '9 dizaines : 90.')],
    ['Complète : 5 × … = 40.',
      cm1Redac('5 × … = 40', '5 × 8 = 40', 'Il faut 8 : 5 × 8 = 40.')],
    ['Une paire de chaussettes, c\'est 2 chaussettes. Combien de chaussettes dans 9 paires ?',
      cm1Redac('Chaussettes', '9 × 2 = 18', 'Il y a 18 chaussettes.')],
    ['Une boîte contient 10 crayons. Combien de crayons dans 6 boîtes ?',
      cm1Redac('Crayons', '6 × 10 = 60', 'Il y a 60 crayons dans 6 boîtes.')],
    ['Lina a 4 billets de 5 € et 3 pièces de 2 €. Combien d\'argent a-t-elle ?',
      cm1Redac('Argent de Lina', { suite: ['4 × 5 = 20', '3 × 2 = 6', '20 + 6 = 26'] }, 'Lina a 26 €.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter sur ses doigts par cinq', [
    'Notre main a 5 doigts : c\'est sans doute pour cela que, dans beaucoup de langues anciennes, on comptait par <b>cinq</b> et par <b>dix</b>. Les chiffres romains en gardent la trace : V pour 5, X pour 10.',
    'Le V romain ressemblerait à une main ouverte (le pouce écarté des autres doigts), et le X à deux V collés pointe contre pointe : deux mains, dix doigts !',
  ]),
  quiz: [
    { q: '2 × 9 = …', opts: ['18', '11', '29'], correct: 0 },
    { q: '5 × 6 = …', opts: ['30', '11', '56'], correct: 0 },
    { q: '10 × 8 = …', opts: ['80', '18', '108'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '2 × 6 = …', r: ['12', '8', '26', '10'], ok: 0 },
    { l: 1, q: '2 × 10 = …', r: ['20', '12', '210', '10'], ok: 0 },
    { l: 2, q: '5 × 3 = …', r: ['15', '8', '35', '53'], ok: 0 },
    { l: 2, q: '5 × 9 = …', r: ['45', '14', '59', '40'], ok: 0 },
    { l: 3, q: '10 × 4 = …', r: ['40', '14', '104', '4'], ok: 0 },
    { l: 3, q: '7 × 10 = …', r: ['70', '17', '710', '7'], ok: 0 },
    { l: 4, q: '6 billets de 10 €, c\'est…', r: ['60 €', '16 €', '106 €', '6 €'], ok: 0 },
  ],
});
})();

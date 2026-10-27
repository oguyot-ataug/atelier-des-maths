/* ============================================================
   CHAPITRE : Tables de multiplication de 3 et 4 (CE1, N12, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, calcul : construire et mémoriser
   les tables de 3 et 4 ; liens entre les tables (4 × n est le double de 2 × n ; 3 × n = 2 × n + n) ;
   utiliser les tables dans des problèmes de groupes égaux, de rangées, de prix.
   Pensé pour être projeté : la table qui se construit rangée par rangée.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const table = t => cm1Tableau(['×', ...Array.from({ length: 10 }, (_, i) => String(i + 1))], [[`<b>${t}</b>`, ...Array.from({ length: 10 }, (_, i) => String((i + 1) * t))]]);

cm1Chapitre({
  niveau: 'ce1', titre: 'Tables de multiplication de 3 et 4', slug: 'tables-3-4',
  cours: `
${cm1Lecon(1, 'La table de 3')}
${ce1AnimTable('ce1-n12-table', { t: 3, tables: [3, 4] })}
${cm1Def(`${table(3)}`, 'Table de 3')}
${cm1Astuce('Pour retrouver 3 × 7 : c\'est 2 × 7 (le double, 14) et encore 7, donc 21.')}

${cm1Lecon(2, 'La table de 4')}
${cm1Def(`${table(4)}`, 'Table de 4')}
${cm1Regle(`Multiplier par 4, c'est prendre le <b>double du double</b> :${cm1Liste(['4 × 6 : le double de 6, c\'est 12 ;', 'le double de 12, c\'est 24 ;', 'donc 4 × 6 = 24.'])}`, 'Le double du double')}

${cm1Lecon(3, 'Ce que l\'on sait déjà')}
${cm1Regle(`${cm1Liste(['3 × 5 = 5 × 3 : si je connais la table de 5, je connais déjà 3 × 5 = 15 et 4 × 5 = 20.', '3 × 10 = 30 et 4 × 10 = 40 : la table de 10.', '3 × 2 = 6 et 4 × 2 = 8 : la table de 2.'])}`, 'Moins à apprendre')}
${cm1Rem('Il ne reste que peu de résultats nouveaux à mémoriser : 3 × 3, 3 × 4, 3 × 6, 3 × 7, 3 × 8, 3 × 9, 4 × 4, 4 × 6, 4 × 7, 4 × 8, 4 × 9.')}

${cm1Lecon(4, 'Utiliser les tables')}
${cm1Exemple('Exemple', [`Un tabouret a 3 pieds. Combien de pieds pour 8 tabourets ?${cm1Redac('Pieds des tabourets', '8 × 3 = 24', '8 tabourets ont 24 pieds.')}`])}
`,
  methode: `
${cm1Demo('ce1-n12-m-trois', 'Retrouver 3 × 8', 'Retrouve 3 × 8 à partir de ce que tu sais.')}
${cm1Demo('ce1-n12-m-quatre', 'Retrouver 4 × 7', 'Retrouve 4 × 7 avec le double du double.')}
`,
  demos: [
    ['ce1-n12-m-trois', [
      { expr: '2 × 8 = 16', note: 'Je connais le double de 8.' },
      { expr: '16 + 8 = 24', note: 'J\'ajoute encore une fois 8.' },
      { expr: '3 × 8 = 24', note: 'Trois fois 8.', fig: ce1Rangees(3, 8, { p: 20 }) },
    ]],
    ['ce1-n12-m-quatre', [
      { expr: '2 × 7 = 14', note: 'Le double de 7.' },
      { expr: '2 × 14 = 28', note: 'Le double de 14.' },
      { expr: '4 × 7 = 28', note: 'Le double du double.', fig: ce1Rangees(4, 7, { p: 20 }) },
    ]],
  ],
  exos: cm1Exos('ce1-n12', [
    ['Calcule : 3 × 6.',
      cm1Redac('3 × 6', '3 × 6 = 18', '3 × 6 = 18 (6, 12, 18).')],
    ['Calcule : 4 × 8.',
      cm1Redac('4 × 8', { suite: ['2 × 8 = 16', '2 × 16 = 32'] }, '4 × 8 = 32.')],
    ['Calcule : 3 × 9.',
      cm1Redac('3 × 9', { suite: ['2 × 9 = 18', '18 + 9 = 27'] }, '3 × 9 = 27.')],
    ['Complète : 4 × … = 36.',
      cm1Redac('4 × … = 36', '4 × 9 = 36', 'Il faut 9.')],
    [`Combien de jetons ?${lig(ce1Rangees(4, 6, { p: 20 }))}`,
      cm1Redac('Les jetons', '4 × 6 = 24', '4 rangées de 6 : 24 jetons.')],
    ['Un trèfle a 3 feuilles. Combien de feuilles ont 7 trèfles ?',
      cm1Redac('Feuilles de trèfle', '7 × 3 = 21', '7 trèfles ont 21 feuilles.')],
    ['Une place de cinéma coûte 4 €. Combien coûtent 9 places ?',
      cm1Redac('Prix des places', '9 × 4 = 36', '9 places coûtent 36 €.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les tables des scribes', [
    'Il y a près de 4 000 ans, à <b>Nippur</b>, en Mésopotamie, les élèves scribes recopiaient des tables de multiplication sur des tablettes d\'argile. On en a retrouvé des centaines !',
    'Comme toi, ils les apprenaient par cœur. Mais leurs tables étaient beaucoup plus longues : ils comptaient par soixantaines !',
  ]),
  quiz: [
    { q: '3 × 7 = …', opts: ['21', '24', '37'], correct: 0 },
    { q: '4 × 6 = …', opts: ['24', '20', '46'], correct: 0 },
    { q: '4 × 9 est le double de…', opts: ['2 × 9', '3 × 9', '4 × 4'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '3 × 4 = …', r: ['12', '7', '34', '9'], ok: 0 },
    { l: 1, q: '3 × 8 = …', r: ['24', '11', '21', '27'], ok: 0 },
    { l: 2, q: '4 × 4 = …', r: ['16', '8', '44', '12'], ok: 0 },
    { l: 2, q: '4 × 7 = …', r: ['28', '11', '24', '32'], ok: 0 },
    { l: 3, q: '3 × 10 = …', r: ['30', '13', '310', '3'], ok: 0 },
    { l: 4, q: '5 paquets de 3 bonbons : …', r: ['15', '8', '53', '35'], ok: 0 },
  ],
});
})();

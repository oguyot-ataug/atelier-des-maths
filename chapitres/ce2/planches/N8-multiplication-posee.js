/* ============================================================
   CE2 · Planches : La multiplication posée (N8)
   Multiplier un nombre de deux ou trois chiffres par un nombre d'un ou deux chiffres (le nombre qui a le
   moins de chiffres sur la deuxième ligne) ; vérifier son résultat (ordre de grandeur).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const pose = (a, b, partiels, res, ret) => cm1Posee([['', String(a)], ['×', String(b)]].concat(partiels.map((p, i) => [i === partiels.length - 1 && partiels.length > 1 ? '+' : '', p, i === 0])).concat(partiels.length > 1 ? [['', String(res)]] : []), ret || '');
// Énoncé : les lignes intermédiaires restent vides (place pour écrire), le résultat en cases.
const trou = (a, b, partiels, res) => cm1Posee([['', String(a)], ['×', String(b)]].concat(partiels.length > 1 ? partiels.map((p, i) => [i === partiels.length - 1 ? '+' : '', ' '.repeat(p.length), i === 0]) : []).concat([['', String(res)]]), '', { trous: true });
PLANCHES['ce2|La multiplication posée'] = [
  { titre: 'Multiplier par un nombre à un chiffre', duree: '30 min',
    attendus: ['Poser une multiplication par un nombre à un chiffre', 'Gérer les retenues'],
    exos: [
      { etoiles: 1, consigne: 'Calcule ces multiplications posées.',
        eleve: plGrille([trou(43, 2, ['86'], 86), trou(124, 3, ['372'], 372), trou(56, 4, ['224'], 224)], 3),
        corr: plGrille([pose(43, 2, ['86']), pose(124, 3, ['372']), pose(56, 4, ['224'], 0, '2 ')], 3) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['237 × 4 = @', 948], ['508 × 6 = @', '3 048'], ['189 × 7 = @', '1 323']], 4) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une boîte contient 144 crayons. Combien de crayons dans 5 boîtes ?',
        corr: cm1Redac('Nombre de crayons', { pose: cm1Posee([['', '144'], ['×', '5'], ['', '720']], '22 ') }, 'Il y a 720 crayons dans 5 boîtes.') },
    ] },
  { titre: 'Multiplier par un nombre à deux chiffres', duree: '35 min',
    attendus: ['Poser une multiplication par un nombre à deux chiffres', 'Décaler la deuxième ligne (on écrit d\'abord un 0)', 'Additionner les résultats intermédiaires'],
    exos: [
      { etoiles: 2, consigne: 'Calcule ces multiplications posées.',
        eleve: plGrille([trou(34, 12, ['68', '340'], 408), trou(125, 23, ['375', '2500'], 2875)], 2),
        corr: plGrille([pose(34, 12, ['68', '340'], 408), pose(125, 23, ['375', '2500'], 2875)], 2) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['46 × 15 = @', 690], ['213 × 32 = @', '6 816'], ['548 × 16 = @', '8 768']], 4) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un club achète 24 ballons à 18 € l\'un. Combien paie-t-il ?',
        corr: cm1Redac('Prix des ballons', { pose: cm1Posee([['', '24'], ['×', '18'], ['', '192', true], ['+', '240'], ['', '432']], '3 ') }, 'Le club paie 432 €.') },
    ] },
  { titre: 'Vérifier son résultat', duree: '25 min',
    attendus: ['Estimer un ordre de grandeur', 'Repérer un résultat faux'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'ordre de grandeur.',
        ...chx([['49 × 6 : environ…', '300', '30 · 300 · 3 000'], ['198 × 5 : environ…', '1 000', '100 · 1 000 · 10 000'], ['31 × 21 : environ…', '600', '60 · 600 · 6 000']]) },
      { etoiles: 2, col: 1, consigne: 'Juste ou faux ? Entoure (pense à l\'ordre de grandeur).',
        ...chx([['52 × 4 = 2 008', 'faux', 'juste · faux'], ['305 × 3 = 915', 'juste', 'juste · faux'], ['99 × 11 = 189', 'faux', 'juste · faux']]) },
      { etoiles: 3, cahier: true, consigne: 'Tom a calculé 67 × 9 = 6 003. Sans poser l\'opération, explique pourquoi c\'est faux, puis trouve le bon résultat.',
        corr: cm1Redac('Ordre de grandeur', '70 × 9 = 630', 'Le résultat doit être proche de 630, pas de 6 000 : c\'est faux.') + cm1Redac('Bon résultat', { suite: ['67 × 10 = 670', '670 − 67 = 603'] }, '67 × 9 = 603.') },
    ] },
];
})();

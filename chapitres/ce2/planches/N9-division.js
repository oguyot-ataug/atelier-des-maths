/* ============================================================
   CE2 · Planches : La division (N9)
   Sens de la division et symbole ÷ ; partager en parts égales (valeur d'une part) ; faire des groupes
   (nombre de parts) ; la division, opération inverse de la multiplication (7 × 13 = 91, donc
   91 ÷ 7 = 13). Pas de division posée au CE2.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg } = CM2G;
// n jetons rangés en g groupes entourés.
const groupes = (n, g) => { const p = n / g; let s = '';
  for(let i = 0; i < g; i++){ s += `<rect x="${4 + i * (p * 18 + 14)}" y="4" width="${p * 18 + 6}" height="28" rx="12" fill="none" stroke="#2E9C6A" stroke-width="1.6" stroke-dasharray="4 3"/>`;
    for(let j = 0; j < p; j++) s += `<circle cx="${16 + i * (p * 18 + 14) + j * 18}" cy="18" r="7" fill="#E35D3A" stroke="#1F3A5C" stroke-width=".8"/>`; }
  return svg(g * (p * 18 + 14) + 4, 36, s, Math.min(320, g * (p * 18 + 14) + 4)); };
const PQ = (parts, o) => cm1Paquets(parts, Object.assign({ L: 300 }, o)).replace(/style="width:100%;max-width:(\d+)px;/, (m, w) => `style="width:${w}px;max-width:100%;`);
PLANCHES['ce2|La division'] = [
  { titre: 'Partager en parts égales', duree: '30 min',
    attendus: ['Trouver la valeur d\'une part avec les tables', 'Écrire une division avec le signe ÷'],
    exos: [
      { etoiles: 1, consigne: 'On partage les jetons en groupes égaux. Écris la division.',
        eleve: plListe([groupes(12, 3) + ' 12 ÷ 3 = ' + P3.B(2), groupes(15, 5) + ' 15 ÷ 5 = ' + P3.B(2)]),
        corr: plListe([groupes(12, 3) + ' 12 ÷ 3 = ' + P3.R(4), groupes(15, 5) + ' 15 ÷ 5 = ' + P3.R(3)]) },
      { etoiles: 1, col: 1, consigne: 'Calcule avec les tables.',
        ...rmp([['24 ÷ 6 = @', 4], ['35 ÷ 5 = @', 7], ['56 ÷ 8 = @', 7], ['81 ÷ 9 = @', 9]], 2) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On partage 48 billes entre 6 enfants, chacun autant. Combien de billes pour chacun ?',
        corr: cm1Redac('Billes par enfant', '48 ÷ 6 = 8', 'Car 6 × 8 = 48 : chaque enfant a 8 billes.', PQ([[8, '8'], [8, '8'], [8, '8'], [8, '8'], [8, '8'], [8, '8']], { uni: true, accolade: '48 billes' })) },
      { etoiles: 1, col: 1, consigne: 'Calcule avec les tables.', ...P3.rmp([['24 ÷ 4 = @', 6], ['35 ÷ 5 = @', 7], ['56 ÷ 8 = @', 7], ['36 ÷ 6 = @', 6]], 2) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['40 partagé en 5 : @ chacun', 8], ['27 partagé en 3 : @ chacun', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['6 × @ = 42', 7], ['donc 42 ÷ 6 = @', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['La moitié de 18 : @', 9], ['18 ÷ 2 = @', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Pour calculer 42 ÷ 6, quelle table utilises-tu ? Entoure.', ...P3.chx([['', 'la table de 6', 'la table de 4 · la table de 6']]) },
    ] },
  { titre: 'Faire des groupes', duree: '25 min',
    attendus: ['Trouver le nombre de parts', 'Chercher « combien de fois » dans une table'],
    exos: [
      { etoiles: 1, col: 1, cahier: true, consigne: 'On range 30 œufs dans des boîtes de 6. Combien de boîtes faut-il ?',
        corr: cm1Redac('Nombre de boîtes', '30 ÷ 6 = 5', 'Car 6 × 5 = 30 : il faut 5 boîtes.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Des élèves forment des équipes de 4. Ils sont 28. Combien d\'équipes ?',
        corr: cm1Redac('Nombre d\'équipes', '28 ÷ 4 = 7', 'Car 4 × 7 = 28 : il y a 7 équipes.') },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne opération.',
        ...chx([['On partage 40 € entre 5 amis. Combien chacun ?', '40 ÷ 5', '40 × 5 · 40 ÷ 5 · 40 − 5'], ['Un ruban de 36 cm, coupé en morceaux de 9 cm. Combien de morceaux ?', '36 ÷ 9', '36 ÷ 9 · 36 − 9 · 36 × 9']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['30 ÷ 6 = @', 5], ['28 ÷ 4 = @', 7], ['45 ÷ 9 = @', 5], ['32 ÷ 8 = @', 4]], 2) },
      { etoiles: 1, col: 1, consigne: 'Combien de groupes ?', ...P3.rmp([['20 élèves, équipes de 5 : @ équipes', 4], ['60 œufs, boîtes de 10 : @ boîtes', 6]], 2) },
      { etoiles: 2, col: 1, consigne: 'Partage ou groupes ? Entoure.', ...P3.chx([['6 œufs par boîte : combien de boîtes ?', 'groupes', 'partage · groupes'], ['Autant pour 6 enfants : combien chacun ?', 'partage', 'partage · groupes']]) },
      { etoiles: 3, col: 1, consigne: 'Complète (il y a un reste).', ...P3.rmp([['17 en groupes de 5 : @ groupes, reste @', 3, 2], ['23 en groupes de 4 : @ groupes, reste @', 5, 3]], 2) },
    ] },
  { titre: 'Division et multiplication', duree: '25 min',
    attendus: ['Écrire deux divisions à partir d\'une multiplication', 'Vérifier une division par une multiplication'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['7 × 8 = 56, donc 56 ÷ 7 = @', 8], ['et 56 ÷ 8 = @', 7], ['6 × 9 = 54, donc 54 ÷ 6 = @', 9], ['et 54 ÷ 9 = @', 6]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète en utilisant 7 × 13 = 91.',
        ...rmp([['91 ÷ 7 = @', 13], ['91 ÷ 13 = @', 7]], 3) },
      { etoiles: 3, cahier: true, consigne: 'Lucas dit : « 63 ÷ 7 = 8 ». Vérifie avec une multiplication. A-t-il raison ?',
        corr: cm1Redac('Vérification', '7 × 8 = 56', '56 n\'est pas 63 : Lucas se trompe. Comme 7 × 9 = 63, on a 63 ÷ 7 = 9.') },
      { etoiles: 1, col: 1, consigne: 'Complète. Aide-toi de la multiplication.', ...P3.rmp([['8 × 6 = @', 48], ['48 ÷ 6 = @', 8], ['9 × 7 = @', 63], ['63 ÷ 9 = @', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['56 ÷ 7 = 8', 'vrai', 'vrai · faux'], ['36 ÷ 4 = 8', 'faux', 'vrai · faux'], ['81 ÷ 9 = 9', 'vrai', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['@ × 5 = 45', 9], ['45 ÷ 5 = @', 9], ['Le quotient de 70 par 7 : @', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['100 ÷ 10 = @', 10], ['400 ÷ 4 = @', 100], ['90 ÷ 3 = @', 30]], 3) },
    ] },
];
})();

/* ============================================================
   4e · Planches : Équations (N7)
   Tester une valeur ; résoudre ax = b, x + a = b ; résoudre ax + b = cx + d ; mettre un problème
   en équation (âges, périmètre, tarifs) et vérifier la solution.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const K = '#1F3A5C', Ro = '#E35D3A';
// Balance en équilibre : 3 sacs de x billes et 4 billes d'un côté, 19 billes de l'autre.
const balance = (() => { const sac = x => `<path d="M${x - 9},62 q0,-14 9,-16 q9,2 9,16 Z" fill="#C98B5A" stroke="${K}" stroke-width="1.1"/>` + DS.tx([x, 59], 'x', { fs: 9, c: '#fff' });
  const bille = (x, y) => `<circle cx="${x}" cy="${y}" r="4" fill="#2EA8C9" stroke="${K}" stroke-width=".8"/>`;
  let g = `<path d="M94,104 L86,116 H102 Z" fill="${K}"/><line x1="94" y1="104" x2="94" y2="40" stroke="${K}" stroke-width="3"/><line x1="20" y1="40" x2="168" y2="40" stroke="${K}" stroke-width="3"/>`
    + `<path d="M8,64 H72 L64,72 H16 Z" fill="#DCE6F0" stroke="${K}" stroke-width="1.2"/><path d="M116,64 H180 L172,72 H124 Z" fill="#DCE6F0" stroke="${K}" stroke-width="1.2"/><line x1="40" y1="40" x2="40" y2="64" stroke="${K}" stroke-width="1"/><line x1="148" y1="40" x2="148" y2="64" stroke="${K}" stroke-width="1"/>`;
  g += sac(17) + sac(34) + sac(51) + [[61, 59], [69, 59], [61, 51], [69, 51]].map(([x, y]) => bille(x, y)).join('');
  for(let i = 0; i < 19; i++) g += bille(122 + (i % 7) * 8, 59 - Math.floor(i / 7) * 8);
  return DS.fig(188, 120, g, 160); })();
const rectEq = DS.fig(170, 86, `<rect x="24" y="8" width="132" height="54" fill="#EAF4FB" stroke="${K}" stroke-width="1.8"/>` + DS.tx([90, 78], 'x + 4', { fs: 12, c: Ro }) + DS.tx([18, 39], 'x', { a: 'end', fs: 12, c: Ro }), 130);
PLANCHES['4e|Équations'] = [
  { titre: 'Tester une valeur, résoudre une équation simple', duree: '30 min',
    attendus: ['Tester si un nombre est solution d\'une équation', 'Résoudre x + a = b et ax = b', 'Vérifier une solution'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le nombre proposé est-il solution de l\'équation ? Entoure.',
        ...ch([['3 est-il solution de 2x + 5 = 11 ?', 'oui'], ['−2 est-il solution de x² = 4 ?', 'oui'], ['4 est-il solution de 3x − 1 = 2x + 2 ?', 'non'], ['0 est-il solution de 5x = x ?', 'oui']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Résous.',
        ...rmp([['x + 7 = 12 : x = @', 5], ['x − 4 = −9 : x = @', '−5'], ['3x = 21 : x = @', 7], ['−5x = 30 : x = @', '−6']]) },
      { etoiles: 2, col: 1, consigne: 'Résous.',
        ...rmp([['x : 4 = 3 : x = @', 12], ['8 + x = 2 : x = @', '−6'], ['0,5x = 7 : x = @', 14], ['−x = 9 : x = @', '−9']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'équation dont 6 est la solution.',
        ...chx([['Équation :', '2x − 5 = 7', '2x − 5 = 7 · x + 6 = 0 · 3x = 2'], ['Équation :', 'x : 3 = 2', 'x : 3 = 2 · 6x = 1 · x − 6 = 6']]) },
      { etoiles: 2, cahier: true, consigne: 'Résous l\'équation 4x = 18, puis vérifie ta solution.',
        corr: cm1Redac('Résolution', { suite: ['4x = 18', 'x = 18 : 4', 'x = 4,5'] }, 'La solution est 4,5.') + cm1Redac('Vérification', '4 × 4,5 = 18', 'L\'égalité est vraie : 4,5 est bien la solution.') },
      { etoiles: 1, col: 1, consigne: 'Résous.', ...P3.rmp([['x + 7 = 15 : x = @', 8], ['x − 4 = 9 : x = @', 13], ['5x = 35 : x = @', 7]], 2) },
      { etoiles: 2, col: 1, consigne: '−3 est-il solution de 2x + 9 = 3 ? Entoure.', ...P3.chx([['', 'oui', 'oui · non']]) },
    ] },
  { titre: 'Résoudre une équation en plusieurs étapes', duree: '35 min',
    attendus: ['Isoler l\'inconnue en plusieurs étapes', 'Regrouper les termes en x d\'un même côté', 'Rédiger la résolution'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous.',
        ...rmp([['2x + 3 = 15 : x = @', 6], ['5x − 7 = 18 : x = @', 5], ['4x + 9 = 1 : x = @', '−2'], ['7 − 3x = 22 : x = @', '−5']]) },
      { etoiles: 2, col: 1, consigne: 'Résous.',
        ...rmp([['3x + 2 = x + 10 : x = @', 4], ['5x − 4 = 2x + 11 : x = @', 5], ['6x + 1 = 8x − 7 : x = @', 4], ['2(x + 3) = 14 : x = @', 4]]) },
      { etoiles: 2, consigne: 'Pour résoudre 3x + 4 = 19, Léo a écrit dans l\'ordre : « 3x = 23 », puis « x = 23 : 3 ». Recopie sa première erreur, puis donne la bonne solution.',
        ...rmp([['Première erreur : @', '3x = 23 (il fallait 3x = 19 − 4 = 15)'], ['Solution : x = @', 5]], 6) },
      { etoiles: 2, cahier: true, consigne: illu(balance, 'La balance est en équilibre. Chaque sac contient le même nombre x de billes. Écris l\'équation correspondante, puis trouve x.'),
        corr: cm1Redac('Équation', { suite: ['3x + 4 = 19', '3x = 15', 'x = 5'] }, 'Chaque sac contient 5 billes.') },
      { etoiles: 3, cahier: true, consigne: 'Résous l\'équation 4(x − 2) = 2x + 5 et vérifie ta solution.',
        corr: cm1Redac('Résolution', { suite: ['4x − 8 = 2x + 5', '4x − 2x = 5 + 8', '2x = 13', 'x = 6,5'] }, 'La solution est 6,5.') + cm1Redac('Vérification', { suite: ['4 × (6,5 − 2) = 4 × 4,5 = 18', '2 × 6,5 + 5 = 13 + 5 = 18'] }, 'Les deux membres sont égaux : 6,5 est bien la solution.') },
    ] },
  { titre: 'Mettre un problème en équation', duree: '40 min',
    attendus: ['Choisir l\'inconnue', 'Traduire l\'énoncé par une équation', 'Résoudre, vérifier et conclure par une phrase'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'équation qui traduit la phrase (x désigne le nombre cherché).',
        ...chx([['Le triple d\'un nombre, augmenté de 7, vaut 31 :', '3x + 7 = 31', '3(x + 7) = 31 · 3x + 7 = 31 · x + 21 = 31'], ['La moitié d\'un nombre, diminuée de 2, vaut 5 :', 'x : 2 − 2 = 5', 'x : 2 − 2 = 5 · (x − 2) : 2 = 5 · 2x − 2 = 5']]) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre.',
        ...rmp([['Le triple d\'un nombre, augmenté de 7, vaut 31 : le nombre est @', 8], ['La moitié d\'un nombre, diminuée de 2, vaut 5 : le nombre est @', 14], ['Si on ajoute 9 au double d\'un nombre, on obtient −3 : le nombre est @', '−6']]) },
      { etoiles: 2, cahier: true, consigne: 'Paul a trois fois l\'âge de son fils. Ensemble, ils ont 48 ans. Quel est l\'âge de chacun ?',
        corr: cm1Redac('Mise en équation', { suite: ['Soit x l\'âge du fils ; Paul a 3x ans.', 'x + 3x = 48', '4x = 48', 'x = 12'] }, 'Le fils a 12 ans et Paul a 36 ans.') },
      { etoiles: 2, cahier: true, consigne: illu(rectEq, 'Ce rectangle a pour largeur x et pour longueur x + 4 (en cm). Son périmètre est de 36 cm. Trouve ses dimensions.'),
        corr: cm1Redac('Mise en équation', { suite: ['2x + 2(x + 4) = 36', '4x + 8 = 36', '4x = 28', 'x = 7'] }, 'Le rectangle mesure 7 cm de large et 11 cm de long.') },
      { etoiles: 3, cahier: true, consigne: 'Une salle de sport propose deux tarifs : A, 8 € la séance ; B, un abonnement de 36 € puis 5 € la séance. À partir de combien de séances le tarif B devient-il plus avantageux ?',
        corr: cm1Redac('Égalité des prix', { suite: ['Soit x le nombre de séances.', '8x = 36 + 5x', '3x = 36', 'x = 12'] }, 'Les deux tarifs coûtent autant pour 12 séances : le tarif B devient plus avantageux à partir de 13 séances.') },
    ] },
  { titre: 'Problèmes et défis', duree: '40 min',
    attendus: ['Résoudre des problèmes variés à l\'aide d\'une équation', 'Vérifier qu\'une solution convient au problème', 'Rédiger une solution complète'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['L\'équation x + 3 = x + 5 n\'a pas de solution.', 'vrai'], ['L\'équation 2x = 0 n\'a pas de solution.', 'faux'], ['Si x = 4, alors 3x − 2 = 10.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Complète pour que 3 soit la solution.',
        ...rmp([['2x + @ = 11', 5], ['@x − 4 = 11', 5], ['x + 7 = @', 10]]) },
      { etoiles: 2, cahier: true, consigne: 'La somme de trois nombres entiers consécutifs est 87. Quels sont ces nombres ?',
        corr: cm1Redac('Mise en équation', { suite: ['Soit n le plus petit ; les nombres sont n, n + 1 et n + 2.', 'n + (n + 1) + (n + 2) = 87', '3n + 3 = 87', '3n = 84', 'n = 28'] }, 'Les trois nombres sont 28, 29 et 30.') },
      { etoiles: 3, cahier: true, consigne: 'Un cinéma vend des places à 9 € (plein tarif) et à 6 € (tarif réduit). Pour une séance, 120 places ont été vendues pour 930 €. Combien de places au tarif réduit ont été vendues ?',
        corr: cm1Redac('Mise en équation', { suite: ['Soit x le nombre de places à tarif réduit ; il y a 120 − x places plein tarif.', '6x + 9(120 − x) = 930', '6x + 1 080 − 9x = 930', '−3x = −150', 'x = 50'] }, '50 places ont été vendues au tarif réduit, et 70 au plein tarif.') },
      { etoiles: 3, cahier: true, consigne: 'Je pense à un nombre. Je le multiplie par 5, j\'enlève 8, puis je trouve le même résultat qu\'en ajoutant 16 au nombre de départ. Quel est ce nombre ?',
        corr: cm1Redac('Mise en équation', { suite: ['5x − 8 = x + 16', '4x = 24', 'x = 6'] }, 'Le nombre est 6 (vérification : 5 × 6 − 8 = 22 et 6 + 16 = 22).') },
    ] },
];
})();

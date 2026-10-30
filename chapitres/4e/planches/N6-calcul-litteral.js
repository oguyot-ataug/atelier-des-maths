/* ============================================================
   4e · Planches : Calcul littéral (N6)
   Expressions littérales (écrire, simplifier l'écriture, substituer) ; développer (distributivité
   simple) ; factoriser ; réduire, supprimer des parenthèses, développer et réduire ; prouver.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const K = '#1F3A5C', Ro = '#E35D3A';
// Rectangle de longueur x + 3 et de largeur 5.
const rect = (lg, la) => DS.fig(170, 86, `<rect x="24" y="8" width="132" height="54" fill="#EAF4FB" stroke="${K}" stroke-width="1.8"/>` + DS.tx([90, 78], lg, { fs: 12, c: Ro }) + DS.tx([18, 39], la, { a: 'end', fs: 12, c: Ro }), 140);
// Figure en L : grand rectangle 2x sur 8, dont on retire un carré de côté x.
const figureL = DS.fig(170, 122, `<path d="M24,20 H150 V110 H90 V68 H24 Z" fill="#FDE3C8" stroke="${K}" stroke-width="1.8"/><path d="M24,68 H90 V110 H24 Z" fill="none" stroke="${K}" stroke-width="1" stroke-dasharray="4 3"/>`
  + DS.tx([87, 14], '2x + 4', { fs: 11, c: Ro }) + DS.tx([157, 69], '6', { a: 'start', fs: 11, c: Ro }) + DS.tx([18, 48], '3', { a: 'end', fs: 11, c: Ro })
  + DS.tx([57, 93], 'x', { fs: 11, c: '#8A93A3' }) + DS.tx([95, 93], '3', { a: 'start', fs: 10, c: '#8A93A3' }) + DS.tx([57, 120], 'partie retirée', { fs: 8, c: '#8A93A3' }), 140);
PLANCHES['4e|Calcul littéral'] = [
  { titre: 'Les expressions littérales', duree: '30 min',
    attendus: ['Simplifier l\'écriture d\'une expression', 'Calculer une expression pour une valeur donnée', 'Écrire une expression qui traduit une situation'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris sans le signe ×, le plus simplement possible.',
        ...rmp([['3 × a = @', '3a'], ['a × a = @', 'a²'], ['x × 5 × y = @', '5xy'], ['2 × (x + 1) = @', '2(x + 1)']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule A = 3x + 5 pour chaque valeur de x.',
        ...rmp([['Pour x = 2 : A = @', 11], ['Pour x = −1 : A = @', 2], ['Pour x = 0 : A = @', 5], ['Pour x = 1,5 : A = @', '9,5']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule B = x² − 2x pour chaque valeur de x.',
        ...rmp([['Pour x = 3 : B = @', 3], ['Pour x = −2 : B = @', 8], ['Pour x = 10 : B = @', 80]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'expression qui traduit la phrase (x désigne un nombre).',
        ...chx([['Le double de x, augmenté de 3 :', '2x + 3', '2(x + 3) · 2x + 3 · x² + 3'], ['Le carré de la somme de x et de 1 :', '(x + 1)²', 'x² + 1 · (x + 1)² · 2(x + 1)'], ['Le triple de la différence de x et 4 :', '3(x − 4)', '3x − 4 · 3(x − 4) · x − 12']]) },
      { etoiles: 2, cahier: true, consigne: illu(rect('x + 3', '5'), 'Ce rectangle a pour longueur x + 3 et pour largeur 5 (en cm). Écris une expression de son périmètre et de son aire, puis calcule-les pour x = 4.'),
        corr: cm1Redac('Périmètre', { suite: ['P = 2(x + 3) + 2 × 5', 'Pour x = 4 : P = 2 × 7 + 10 = 24'] }, 'Pour x = 4, le périmètre est de 24 cm.') + cm1Redac('Aire', { suite: ['A = 5(x + 3)', 'Pour x = 4 : A = 5 × 7 = 35'] }, 'Pour x = 4, l\'aire est de 35 cm².') },
    ] },
  { titre: 'Développer', duree: '30 min',
    attendus: ['Développer avec la distributivité simple', 'Gérer les signes en développant', 'Développer une expression du type x(x + a)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Développe.',
        ...rmp([['3(x + 4) = @', '3x + 12'], ['5(2a − 3) = @', '10a − 15'], ['7(y + 1) = @', '7y + 7'], ['4(3 − 2b) = @', '12 − 8b']], 5) },
      { etoiles: 2, col: 1, consigne: 'Développe (attention aux signes).',
        ...rmp([['−2(x + 7) = @', '−2x − 14'], ['−3(4 − x) = @', '−12 + 3x'], ['−(5a − 2) = @', '−5a + 2'], ['−6(−2y − 1) = @', '12y + 6']], 5) },
      { etoiles: 2, col: 1, consigne: 'Développe.',
        ...rmp([['x(x + 3) = @', 'x² + 3x'], ['2x(x − 5) = @', '2x² − 10x'], ['a(4 − a) = @', '4a − a²']], 5) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['3(x + 2) = 3x + 2', 'faux'], ['−(x − 1) = −x + 1', 'vrai'], ['2(3x) = 6x', 'vrai'], ['x(x + 1) = x² + x', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Développe A = 4(2x − 3) et B = −5(1 − x). Calcule ensuite A et B pour x = 2 avec l\'expression de départ, puis avec l\'expression développée, pour vérifier.',
        corr: cm1Redac('Développements', { suite: ['A = 8x − 12', 'B = −5 + 5x'] }, 'A = 8x − 12 et B = 5x − 5.') + cm1Redac('Vérification pour x = 2', { suite: ['A = 4 × (4 − 3) = 4 et 8 × 2 − 12 = 4', 'B = −5 × (1 − 2) = 5 et −5 + 5 × 2 = 5'] }, 'On trouve les mêmes valeurs : les développements sont cohérents.') },
      { etoiles: 1, col: 1, consigne: 'Développe.', ...P3.rmp([['3(x + 4) = @', '3x + 12'], ['5(2x − 1) = @', '10x − 5'], ['−2(x + 6) = @', '−2x − 12']], 4) },
      { etoiles: 2, col: 1, consigne: 'Développe.', ...P3.rmp([['x(x + 3) = @', 'x² + 3x'], ['4(3 − x) = @', '12 − 4x']], 4) },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx2([['2(x + 5) = 2x + 5', 'faux', 'vrai · faux'], ['−(x − 3) = −x + 3', 'vrai', 'vrai · faux'], ['3(2x − 1) = 6x − 3', 'vrai', 'vrai · faux'], ['x × x = 2x', 'faux', 'vrai · faux']]) },
    ] },
  { titre: 'Factoriser', duree: '30 min',
    attendus: ['Repérer un facteur commun', 'Factoriser une somme ou une différence', 'Vérifier une factorisation en développant'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Factorise.',
        ...rmp([['6x + 18 = @', '6(x + 3)'], ['10a − 15 = @', '5(2a − 3)'], ['7y − 7 = @', '7(y − 1)'], ['4b + 4c = @', '4(b + c)']], 5) },
      { etoiles: 2, col: 1, consigne: 'Factorise par x.',
        ...rmp([['x² + 5x = @', 'x(x + 5)'], ['3x² − 2x = @', 'x(3x − 2)'], ['x − 4x² = @', 'x(1 − 4x)']], 5) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne factorisation.',
        ...chx([['12x + 8 =', '4(3x + 2)', '4(3x + 8) · 4(3x + 2) · 2(6x + 8)'], ['9a² + 3a =', '3a(3a + 1)', '3a(3a + 1) · 3(3a + a) · 3a(3a)'], ['−5x − 10 =', '−5(x + 2)', '−5(x − 2) · 5(x + 2) · −5(x + 2)']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['8x + 20 = 4(@ + 5)', '2x'], ['15 − 9y = 3(5 − @)', '3y'], ['2x² + 6x = 2x(x + @)', 3]]) },
      { etoiles: 3, cahier: true, consigne: 'Calcule astucieusement en factorisant : 17 × 23 + 17 × 77, puis 4,5 × 12 − 4,5 × 2.',
        corr: cm1Redac('Premier calcul', { suite: ['17 × 23 + 17 × 77 = 17 × (23 + 77)', '= 17 × 100 = 1 700'] }, 'Le premier calcul vaut 1 700.') + cm1Redac('Second calcul', { suite: ['4,5 × 12 − 4,5 × 2 = 4,5 × (12 − 2)', '= 4,5 × 10 = 45'] }, 'Le second calcul vaut 45.') },
      { etoiles: 1, col: 1, consigne: 'Factorise.', ...P3.rmp([['6x + 12 = @', '6(x + 2)'], ['15x − 10 = @', '5(3x − 2)'], ['7x + 7 = @', '7(x + 1)']], 4) },
      { etoiles: 2, col: 1, consigne: 'Factorise par x.', ...P3.rmp([['x² + 5x = @', 'x(x + 5)'], ['3x² − x = @', 'x(3x − 1)']], 4) },
      { etoiles: 2, col: 1, consigne: 'Calcule astucieusement.', ...P3.rmp([['13 × 47 + 13 × 53 = @', '1 300'], ['8,5 × 7 − 8,5 × 5 = @', 17]], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne factorisation de 4x + 8.', ...P3.chx([['', '4(x + 2)', '4(x + 8) · 4(x + 2) · 4x(1 + 2)']]) },
    ] },
  { titre: 'Réduire et prouver', duree: '40 min',
    attendus: ['Réduire une expression', 'Supprimer des parenthèses', 'Développer et réduire pour prouver un résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Réduis.',
        ...rmp([['3x + 5x = @', '8x'], ['7a − 9a = @', '−2a'], ['2x + 3 + 5x − 8 = @', '7x − 5'], ['x² + 3x − 2x² + x = @', '−x² + 4x']], 5) },
      { etoiles: 2, col: 1, consigne: 'Supprime les parenthèses, puis réduis.',
        ...rmp([['(2x + 3) − (x − 4) = @', 'x + 7'], ['5 − (3x − 2) = @', '7 − 3x'], ['(a − 1) + (−2a + 6) = @', '−a + 5']], 5) },
      { etoiles: 2, consigne: 'Développe, puis réduis.',
        ...rmp([['3(x + 2) + 4(x − 1) = @', '7x + 2'], ['2(3x − 1) − 5(x + 2) = @', 'x − 12'], ['x(x + 4) − 3x = @', 'x² + x'], ['5(x − 2) + 2(x + 3) = @', '7x − 4'], ['4(2x + 1) − 3(x − 2) = @', '5x + 10'], ['x(x − 2) + 5x = @', 'x² + 3x']], 5) },
      { etoiles: 2, cahier: true, consigne: illu(figureL, 'Cette figure est un rectangle de 2x + 4 sur 6, dont on a retiré un rectangle de x sur 3 (en cm). Montre que son aire est égale à 9x + 24.'),
        corr: cm1Redac('Aire de la figure', { suite: ['A = 6(2x + 4) − 3x', 'A = 12x + 24 − 3x', 'A = 9x + 24'] }, 'L\'aire de la figure est bien égale à 9x + 24 (en cm²).') },
      { etoiles: 3, cahier: true, consigne: 'Programme : choisir un nombre ; ajouter 5 ; multiplier par 4 ; soustraire 20 ; soustraire le triple du nombre choisi. Prouve que l\'on obtient toujours le nombre de départ.',
        corr: cm1Redac('Avec x', { suite: ['4(x + 5) − 20 − 3x', '= 4x + 20 − 20 − 3x', '= x'] }, 'On obtient toujours le nombre choisi au départ.') },
    ] },
];
})();

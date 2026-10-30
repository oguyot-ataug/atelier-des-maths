/* ============================================================
   3e · Planches : Calcul littéral (N4)
   Réduire, simple distributivité, factoriser ; double distributivité ; différence de deux carrés ;
   prouver avec le calcul littéral (programmes de calcul) ; Objectif Brevet.
   Réponses à l'écran sans exposant : le carré est déjà écrit (« x² + @x + @ »).
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs, svg, K, Bl, Ro, Tx } = P3;
// Rectangle (x + 5) × (x + 2) partagé en quatre.
const rect4 = (() => { const a = 70, b = 50, c = 70, d = 28, x0 = 22, y0 = 18;
  let g = `<rect x="${x0}" y="${y0}" width="${a + b}" height="${c + d}" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>`;
  g += `<line x1="${x0 + a}" y1="${y0}" x2="${x0 + a}" y2="${y0 + c + d}" stroke="${Bl}" stroke-width="1.6" stroke-dasharray="5 3"/><line x1="${x0}" y1="${y0 + c}" x2="${x0 + a + b}" y2="${y0 + c}" stroke="${Bl}" stroke-width="1.6" stroke-dasharray="5 3"/>`;
  g += Tx([x0 + a / 2, y0 - 5], 'x') + Tx([x0 + a + b / 2, y0 - 5], '5') + Tx([x0 - 9, y0 + c / 2 + 4], 'x') + Tx([x0 - 9, y0 + c + d / 2 + 4], '2');
  return svg(x0 + a + b + 10, y0 + c + d + 10, g, 150); })();
PLANCHES['3e|Calcul littéral'] = [
  { titre: 'Réduire, développer, factoriser', duree: '35 min',
    attendus: ['Réduire une expression', 'Développer avec la simple distributivité', 'Factoriser par un facteur commun'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Réduis.',
        ...rmp([['3x + 5x = @', '8x'], ['7a − 2a + a = @', '6a'], ['4x + 3 − x + 2 = @', '3x+5'], ['2x × 5 = @', '10x'], ['x² + 3x² = @ x²', 4]], 5) },
      { etoiles: 1, col: 1, consigne: 'Développe.',
        ...rmp([['3(x + 4) = @', '3x+12'], ['−2(a − 5) = @', '−2a+10'], ['x(x + 7) = x² + @', '7x'], ['5(2y − 3) = @', '10y−15']], 6) },
      { etoiles: 2, col: 1, consigne: 'Développe et réduis.',
        ...rmp([['A = 2(x + 3) + 4x = @', '6x+6'], ['B = 5 − 3(x − 2) = @', '−3x+11'], ['C = 4(2x + 1) − (x − 3) = @', '7x+7'], ['D = −(3 − 2x) + 5x = @', '7x−3']], 6) },
      { etoiles: 2, col: 1, consigne: 'Factorise.',
        ...rmp([['6x + 18 = 6(@)', 'x+3'], ['15a − 10 = 5(@)', '3a−2'], ['x² + 4x = x(@)', 'x+4'], ['7y − 7 = @(y − 1)', 7]], 5) },
      { etoiles: 2, col: 1, consigne: 'Calcule E = 3x² − 2x + 1.',
        ...rmp([['Pour x = 2 : E = @', 9], ['Pour x = −1 : E = @', 6], ['Pour x = 0 : E = @', 1]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'expression égale.',
        ...chx([['3(x − 2) =', '3x − 6', '3x − 2 · 3x − 6 · x − 6'], ['−(x + 4) =', '−x − 4', '−x + 4 · −x − 4 · x − 4'], ['2x + 2x =', '4x', '4x · 4x² · 2x²'], ['x × x × 3 =', '3x²', '3x · x³ · 3x²']]) },
      { etoiles: 3, cahier: true, consigne: 'Un rectangle a pour longueur 2x + 3 et pour largeur x (en cm). Exprime son périmètre et son aire en fonction de x, sous forme développée et réduite.',
        corr: cm1Redac('Périmètre', '2 × (2x + 3 + x) = 2 × (3x + 3) = 6x + 6', 'Le périmètre est 6x + 6 (en cm).') + cm1Redac('Aire', 'x(2x + 3) = 2x² + 3x', 'L\'aire est 2x² + 3x (en cm²).') },
    ] },
  { titre: 'La double distributivité', duree: '40 min',
    attendus: ['Développer (a + b)(c + d)', 'Réduire le résultat', 'Vérifier un développement en testant une valeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['(x + 2)(x + 3) = x² + @x + @', 5, 6], ['(x + 4)(x − 1) = x² + @x − @', 3, 4], ['(x − 5)(x − 2) = x² − @x + @', 7, 10], ['(2x + 1)(x + 3) = @x² + @x + 3', 2, 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'L\'aire du grand rectangle est (x + 5)(x + 2).',
        eleve: `<div style="text-align:center;">${rect4}</div>` + plListe(['Aire de chacune des 4 parties : x², ' + P3.B(2) + ', ' + P3.B(2) + ' et ' + P3.B(2), '(x + 5)(x + 2) = x² + ' + P3.B(2) + 'x + ' + P3.B(2)]),
        corr: `<div style="text-align:center;">${rect4}</div>` + plListe(['Aire de chacune des 4 parties : x², ' + P3.R('5x') + ', ' + P3.R('2x') + ' et ' + P3.R(10), '(x + 5)(x + 2) = x² + ' + P3.R(7) + 'x + ' + P3.R(10)]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Développe et réduis : A = (3x − 2)(x + 4) ; B = (5 − x)(2x + 1) ; C = (x + 3)² ; D = (2x − 1)².',
        corr: cm1Redac('Développements', { suite: ['A = 3x² + 12x − 2x − 8 = 3x² + 10x − 8', 'B = 10x + 5 − 2x² − x = −2x² + 9x + 5', 'C = (x + 3)(x + 3) = x² + 6x + 9', 'D = (2x − 1)(2x − 1) = 4x² − 4x + 1'] }, '') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux pour tout nombre x ? Entoure.',
        ...ch([['(x + 3)² = x² + 9', 'faux'], ['(x + 1)(x − 1) = x² − 1', 'vrai'], ['(2x)² = 4x²', 'vrai'], ['(x − 2)² = x² − 4x + 4', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Vérifie pour x = 2 l\'égalité (x + 3)(2x − 1) = 2x² + 5x − 3.',
        ...rmp([['Membre de gauche : @', 15], ['Membre de droite : @', 15], ['L\'égalité est-elle vraie pour x = 2 ? @', 'oui']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Développe et réduis A = (x + 3)(x − 3) − (x − 1)².',
        corr: cm1Redac('Développement', { lignes: ['x² − 9 − (x² − 2x + 1)', 'x² − 9 − x² + 2x − 1', '2x − 10'] }, 'A = 2x − 10.') },
      { etoiles: 3, cahier: true, consigne: 'Montre que, pour tout nombre n, (n + 1)² − (n − 1)² = 4n. Calcule alors 1 001² − 999² sans calculatrice.',
        corr: cm1Redac('Preuve', '(n + 1)² − (n − 1)² = n² + 2n + 1 − (n² − 2n + 1) = 4n', '') + cm1Redac('Application', 'Avec n = 1 000 : 1 001² − 999² = 4 × 1 000', '1 001² − 999² = 4 000.') },
    ] },
  { titre: 'Factoriser, différence de deux carrés', duree: '40 min',
    attendus: ['Factoriser par un facteur commun (nombre, lettre ou parenthèse)', 'Factoriser a² − b² = (a − b)(a + b)', 'Utiliser une factorisation en calcul mental'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Factorise.',
        ...rmp([['5x + 5y = 5(@)', 'x+y'], ['3x² + x = x(@)', '3x+1'], ['(x + 1)(x + 2) + 3(x + 1) = (x + 1)(@)', 'x+5'], ['x(2x − 1) − 4(2x − 1) = (2x − 1)(@)', 'x−4']], 5) },
      { etoiles: 1, col: 1, consigne: 'Factorise avec a² − b² = (a − b)(a + b).',
        ...rmp([['x² − 9 = (x − @)(x + @)', 3, 3], ['x² − 25 = (x − @)(x + @)', 5, 5], ['4x² − 1 = (@ − 1)(@ + 1)', '2x', '2x'], ['49 − x² = (7 − @)(7 + @)', 'x', 'x']], 2) },
      { etoiles: 2, col: 1, consigne: 'Factorise.',
        ...rmp([['(x + 3)² − 16 = (x − @)(x + @)', 1, 7], ['9x² − 64 = (@ − 8)(@ + 8)', '3x', '3x'], ['(2x + 1)² − 9 = (2x − @)(2x + @)', 2, 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule mentalement avec (a − b)(a + b) = a² − b².',
        ...rmp([['51 × 49 = 50² − 1² = @', '2 499'], ['103 × 97 = @', '9 991'], ['21² − 19² = @', 80], ['1 001 × 999 = @', '999 999']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la forme factorisée.',
        ...chx([['x² − 4x =', 'x(x − 4)', 'x(x − 4) · (x − 2)² · x(x − 4x)'], ['x² − 16 =', '(x − 4)(x + 4)', '(x − 4)² · (x − 4)(x + 4) · (x − 8)(x + 8)'], ['2x + 6 =', '2(x + 3)', '2(x + 6) · 2(x + 3) · 2x + 3'], ['(x − 1)² − (x − 1) =', '(x − 1)(x − 2)', '(x − 1)(x − 2) · (x − 1)x · x − 1']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Factorise A = (3x + 2)² − (3x + 2)(x − 5).',
        corr: cm1Redac('Factorisation', { lignes: ['(3x + 2)[(3x + 2) − (x − 5)]', '(3x + 2)(3x + 2 − x + 5)', '(3x + 2)(2x + 7)'] }, 'A = (3x + 2)(2x + 7).') },
      { etoiles: 3, cahier: true, consigne: 'Factorise B = 16x² − (x + 3)², puis trouve les valeurs de x pour lesquelles B = 0.',
        corr: cm1Redac('Factorisation', { nom: 'B', lignes: ['(4x)² − (x + 3)²', '(4x − x − 3)(4x + x + 3)', '(3x − 3)(5x + 3)'] }, '') + cm1Redac('B = 0', { suite: ['3x − 3 = 0 donc x = 1', `5x + 3 = 0 donc x = −${cm1Frac(3, 5)}`] }, `B = 0 pour x = 1 et pour x = −${cm1Frac(3, 5)}.`) },
    ] },
  { titre: 'Prouver avec le calcul littéral', duree: '40 min',
    attendus: ['Tester un programme de calcul et émettre une conjecture', 'Prouver une conjecture avec une expression littérale', 'Traduire une expression en formule de tableur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme A : choisir un nombre ; le multiplier par 4 ; ajouter 8 ; diviser par 4 ; soustraire le nombre choisi.',
        ...rmp([['Avec 3, on obtient @', 2], ['Avec −5, on obtient @', 2], ['Avec 10, on obtient @', 2], ['Conjecture : on obtient toujours @', 2]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Prouve la conjecture du programme A, en notant x le nombre choisi.',
        corr: cm1Redac('Preuve', { suite: ['On obtient (4x + 8) : 4 − x.', '(4x + 8) : 4 = x + 2', 'x + 2 − x = 2'] }, 'Quel que soit le nombre choisi, le programme A donne 2.') },
      { etoiles: 2, col: 1, consigne: 'Programme B : choisir un nombre ; lui ajouter 1 ; calculer le carré du résultat ; soustraire le carré du nombre choisi.',
        ...rmp([['Avec 2, on obtient @', 5], ['Avec 5, on obtient @', 11], ['Avec −3, on obtient @', '−5'], ['Avec x, on obtient (x + 1)² − x² = @', '2x+1']], 5) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Avec le programme B, quel nombre faut-il choisir pour obtenir 21 ?',
        corr: cm1Redac('Équation', { suite: ['2x + 1 = 21', '2x = 20', 'x = 10'] }, 'Il faut choisir 10.') },
      { etoiles: 2, col: 1, consigne: 'Dans un tableur, la cellule A2 contient le nombre x. Entoure la formule à écrire en B2.',
        ...chx([['Pour calculer 3x² − 5 :', '=3*A2^2-5', '=3*A2^2-5 · =3A2²-5 · =(3*A2)^2-5'], ['Pour calculer (x + 1)(x − 2) :', '=(A2+1)*(A2-2)', '=A2+1*A2-2 · =(A2+1)*(A2-2) · =(A2+1)(A2-2)']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Programme P : multiplier par 3, ajouter 4, multiplier par 2. Programme Q : multiplier par 6, ajouter 8. Prouve qu\'ils donnent toujours le même résultat.',
        corr: cm1Redac('Preuve', { suite: ['P : (3x + 4) × 2 = 6x + 8', 'Q : 6x + 8'] }, 'Les deux programmes donnent 6x + 8 : toujours le même résultat.') },
      { etoiles: 3, cahier: true, consigne: 'Prouve que le produit de deux nombres impairs consécutifs, augmenté de 1, est le carré d\'un nombre pair. (Note 2n − 1 et 2n + 1 ces deux nombres.)',
        corr: cm1Redac('Preuve', '(2n − 1)(2n + 1) + 1 = 4n² − 1 + 1 = 4n² = (2n)²', 'C\'est le carré de 2n, un nombre pair. Exemple : 7 × 9 + 1 = 64 = 8².') },
    ] },
  { titre: 'Calcul littéral', duree: '45 min', brevet: true,
    attendus: ['Automatismes : développer, factoriser, calculer une valeur', 'Étudier et comparer deux programmes de calcul', 'Exprimer une aire et la factoriser'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Développer 3(x + 2) :', '3x+6'], ['Factoriser 5x − 15 :', '5(x − 3)', ['5(x − 3)', '5(x − 15)', '5x − 3']], ['Pour x = −2, x² + 3x =', '−2', ['−2', '10', '2']], ['(x + 1)(x + 2) =', 'x² + 3x + 2', ['x² + 2', 'x² + 3x + 2', '2x + 3']], ['Réduire 4x − x + 3x :', '6x'], ['x² − 9 =', '(x − 3)(x + 3)', ['(x − 3)²', '(x − 3)(x + 3)', '(x − 9)(x + 9)']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Voici deux programmes de calcul.<br><b>Programme A</b> : choisir un nombre ; soustraire 1 ; multiplier le résultat par 3 ; ajouter le triple du nombre choisi.<br><b>Programme B</b> : choisir un nombre ; ajouter 2 ; calculer le carré du résultat ; soustraire le carré du nombre choisi.'
          + qs(['Vérifier qu\'avec 4, le programme A donne 21.', 'Quel résultat donne le programme B avec 4 ?', 'On note x le nombre choisi. Exprimer en fonction de x, sous forme développée et réduite, le résultat de chaque programme.', 'Quel nombre faut-il choisir pour que les deux programmes donnent le même résultat ?']),
        corr: cm1Redac('Programme A avec 4', '(4 − 1) × 3 + 3 × 4 = 9 + 12 = 21', 'On obtient bien 21.') + cm1Redac('Programme B avec 4', '(4 + 2)² − 4² = 36 − 16 = 20', 'Le programme B donne 20.')
          + cm1Redac('Expressions', { suite: ['A : 3(x − 1) + 3x = 3x − 3 + 3x = 6x − 3', 'B : (x + 2)² − x² = x² + 4x + 4 − x² = 4x + 4'] }, '')
          + cm1Redac('Même résultat', { suite: ['6x − 3 = 4x + 4', '2x = 7', 'x = 3,5'] }, 'Il faut choisir 3,5 (les deux programmes donnent alors 18).') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Dans un carré de côté x + 3 (en cm, x &gt; 0), on retire un carré de côté 3 cm dans un coin.'
          + qs(['Montrer que l\'aire de la figure restante est x² + 6x.', 'Factoriser cette expression.', 'Calculer l\'aire restante pour x = 4.']),
        corr: cm1Redac('Aire restante', '(x + 3)² − 3² = x² + 6x + 9 − 9 = x² + 6x', 'L\'aire restante est x² + 6x (en cm²).') + cm1Redac('Factorisation', 'x² + 6x = x(x + 6)', '') + cm1Redac('Pour x = 4', '4 × (4 + 6) = 40', 'L\'aire restante est 40 cm².') },
    ] },
];
})();

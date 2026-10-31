/* ============================================================
   3e · Planches : Équations (N5)
   Équations du premier degré ; équation produit ; équation x² = a ; mettre un problème en équation ;
   Objectif Brevet.
   ============================================================ */
(() => {
const { R, F, ligne, rmp, ch, chx, auto, qs } = P3, Fr = plFrac();
PLANCHES['3e|Équations'] = [
  { titre: 'Les équations du premier degré', duree: '35 min',
    attendus: ['Tester si un nombre est solution', 'Résoudre une équation du premier degré', 'Donner une solution sous forme de fraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous.',
        ...rmp([['x + 7 = 12 : x = @', 5], ['x − 4 = −9 : x = @', '−5'], ['3x = 27 : x = @', 9], ['−5x = 30 : x = @', '−6'], ['x : 4 = 3 : x = @', 12]]) },
      { etoiles: 1, col: 1, consigne: 'Résous.',
        ...rmp([['2x + 5 = 17 : x = @', 6], ['3x − 4 = 11 : x = @', 5], ['7 − x = 10 : x = @', '−3'], ['4x + 9 = 1 : x = @', '−2']]) },
      { etoiles: 2, col: 1, consigne: '−2 est-il solution de l\'équation ? Entoure.',
        ...ch([['3x + 8 = 2 :', 'oui'], ['x² = 4 :', 'oui'], ['5 − x = 3 :', 'non'], ['2x + 1 = x − 1 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Résous et donne la solution sous forme de fraction irréductible.',
        eleve: plListe([ligne('6x = 4 : x =', Fr), ligne('9x = −3 : x =', Fr), ligne('4x − 1 = 6 : x =', Fr), ligne('10x + 3 = 7 : x =', Fr)]),
        corr: plListe([ligne('6x = 4 : x =', R(F(2, 3))), ligne('9x = −3 : x =', R(F('−1', 3))), ligne('4x − 1 = 6 : x =', R(F(7, 4))), ligne('10x + 3 = 7 : x =', R(F(2, 5)))]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Résous : 5x − 3 = 2x + 9, puis 7x + 2 = 3x − 10.',
        corr: cm1Redac('5x − 3 = 2x + 9', { suite: ['5x − 2x = 9 + 3', '3x = 12', 'x = 4'] }, 'La solution est 4.') + cm1Redac('7x + 2 = 3x − 10', { suite: ['7x − 3x = −10 − 2', '4x = −12', 'x = −3'] }, 'La solution est −3.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Résous : 3(x − 2) = 2(x + 5), puis 2(4x + 1) − 3 = 5x + 8.',
        corr: cm1Redac('3(x − 2) = 2(x + 5)', { suite: ['3x − 6 = 2x + 10', 'x = 16'] }, 'La solution est 16.') + cm1Redac('2(4x + 1) − 3 = 5x + 8', { suite: ['8x + 2 − 3 = 5x + 8', '8x − 1 = 5x + 8', '3x = 9', 'x = 3'] }, 'La solution est 3.') },
      { etoiles: 3, cahier: true, consigne: 'Trouve trois nombres entiers consécutifs dont la somme est 2 025.',
        corr: cm1Redac('Mise en équation', { suite: ['x + (x + 1) + (x + 2) = 2 025', '3x + 3 = 2 025', '3x = 2 022', 'x = 674'] }, 'Les trois nombres sont 674, 675 et 676.') },
    ] },
  { titre: 'L\'équation produit', duree: '35 min',
    attendus: ['Connaître la propriété : un produit est nul si l\'un de ses facteurs est nul', 'Résoudre une équation produit', 'Factoriser pour se ramener à une équation produit'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure les solutions.',
        ...chx([['(x − 3)(x + 5) = 0 :', '3 et −5', '3 et 5 · −3 et 5 · 3 et −5'], ['x(x − 7) = 0 :', '0 et 7', '7 · 0 et 7 · 0 et −7'], ['(2x − 6)(x + 1) = 0 :', '3 et −1', '6 et −1 · 3 et −1 · 3 et 1'], ['(x + 4)² = 0 :', '−4', '4 · −4 · 4 et −4']]) },
      { etoiles: 2, uneLigne: true, consigne: 'Résous.',
        ...rmp([['(x − 2)(x − 9) = 0 : x = @ ou x = @', 2, 9], ['(x + 1)(x − 6) = 0 : x = @ ou x = @', '−1', 6], ['(3x − 12)(x + 2) = 0 : x = @ ou x = @', 4, '−2'], ['5x(x − 10) = 0 : x = @ ou x = @', 0, 10]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Si a × b = 0, alors a = 0 ou b = 0.', 'vrai'], ['L\'équation (x − 1)(x + 1) = 0 a deux solutions.', 'vrai'], ['L\'équation x(x + 3) = 0 a une seule solution : −3.', 'faux'], ['Si a × b = 6, alors a = 6 ou b = 6.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Résous (4x − 1)(2x + 3) = 0.',
        corr: cm1Redac('Équation produit', { suite: ['Un produit est nul si l\'un de ses facteurs est nul.', `4x − 1 = 0 donc x = ${F(1, 4)}`, `2x + 3 = 0 donc x = −${F(3, 2)}`] }, `Les solutions sont ${F(1, 4)} et −${F(3, 2)}.`) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Factorise, puis résous : x² − 5x = 0, puis (x + 2)(x − 1) + (x + 2)(3x + 4) = 0.',
        corr: cm1Redac('x² − 5x = 0', { suite: ['x(x − 5) = 0', 'x = 0 ou x − 5 = 0'] }, 'Les solutions sont 0 et 5.') + cm1Redac('(x + 2)(x − 1) + (x + 2)(3x + 4) = 0', { suite: ['(x + 2)(x − 1 + 3x + 4) = 0', '(x + 2)(4x + 3) = 0'] }, `Les solutions sont −2 et −${F(3, 4)}.`) },
      { etoiles: 2, cahier: true, consigne: 'Le double du carré d\'un nombre, diminué de 8 fois ce nombre, est nul. Quel peut être ce nombre ?',
        corr: cm1Redac('Mise en équation', { suite: ['2x² − 8x = 0', '2x(x − 4) = 0', 'x = 0 ou x = 4'] }, 'Ce nombre est 0 ou 4.') },
      { etoiles: 3, cahier: true, consigne: 'Résous (2x + 1)² − 16 = 0 en factorisant.',
        corr: cm1Redac('Factorisation', { suite: ['(2x + 1 − 4)(2x + 1 + 4) = 0', '(2x − 3)(2x + 5) = 0'] }, `Les solutions sont ${F(3, 2)} et −${F(5, 2)}.`) },
    ] },
  { titre: 'L\'équation x² = a', duree: '30 min',
    attendus: ['Savoir combien de solutions a l\'équation x² = a selon le signe de a', 'Résoudre x² = a (valeur exacte ou arrondie)', 'Utiliser x² = a dans un problème de géométrie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous.',
        ...rmp([['x² = 25 : x = @ ou x = @', 5, '−5'], ['x² = 81 : x = @ ou x = @', 9, '−9'], ['x² = 1 : x = @ ou x = @', 1, '−1'], ['x² = 0 : x = @', 0]]) },
      { etoiles: 1, col: 1, consigne: 'Combien de solutions ? Entoure.',
        ...ch([['x² = 16 :', 'deux'], ['x² = −4 :', 'aucune'], ['x² = 0 :', 'une'], ['x² = 7 :', 'deux']], 'aucune · une · deux') },
      { etoiles: 2, col: 1, consigne: 'Résous ; arrondis au centième.',
        ...rmp([['x² = 7 : x ≈ @ ou x ≈ @', '2,65', '−2,65'], ['x² = 50 : x ≈ @ ou x ≈ @', '7,07', '−7,07']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un carré a une aire de 64 cm². Son côté mesure @ cm.', 8], ['Un disque a une aire de 30 cm². Son rayon mesure environ @ cm (au dixième).', '3,1']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Résous : 3x² = 48 ; x² + 9 = 0 ; 2x² − 5 = 13.',
        corr: cm1Redac('3x² = 48', 'x² = 16', 'Les solutions sont 4 et −4.') + cm1Redac('x² + 9 = 0', 'x² = −9', 'Pas de solution : un carré n\'est jamais négatif.') + cm1Redac('2x² − 5 = 13', { suite: ['2x² = 18', 'x² = 9'] }, 'Les solutions sont 3 et −3.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un carré a la même aire qu\'un rectangle de 18 cm sur 8 cm. Quel est le côté du carré ?',
        corr: cm1Redac('Côté du carré', { suite: ['18 × 8 = 144', 'c² = 144 et c &gt; 0'] }, 'Le côté du carré mesure 12 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Résous (x − 3)² = 25.',
        corr: cm1Redac('Raisonnement', { suite: ['x − 3 = 5 ou x − 3 = −5', 'x = 8 ou x = −2'] }, 'Les solutions sont 8 et −2.') },
    ] },
  { titre: 'Mettre un problème en équation', duree: '40 min',
    attendus: ['Choisir l\'inconnue', 'Traduire l\'énoncé par une équation', 'Résoudre et conclure par une phrase'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'équation qui traduit la phrase (x désigne le nombre).',
        ...chx([['Le double d\'un nombre, augmenté de 5, vaut 17 :', '2x + 5 = 17', '2(x + 5) = 17 · 2x + 5 = 17 · x + 10 = 17'], ['Le triple de la somme d\'un nombre et de 4 vaut 30 :', '3(x + 4) = 30', '3x + 4 = 30 · 3(x + 4) = 30 · x + 12 = 30']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le périmètre d\'un rectangle est 54 cm. Sa longueur mesure 7 cm de plus que sa largeur. Calcule ses dimensions.',
        corr: cm1Redac('Mise en équation', { suite: ['Largeur : ℓ ; longueur : ℓ + 7', '2(ℓ + ℓ + 7) = 54', '4ℓ + 14 = 54', 'ℓ = 10'] }, 'Le rectangle mesure 17 cm sur 10 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Marc a trois fois l\'âge de sa fille. Dans 12 ans, il aura le double de son âge. Quel âge ont-ils ?',
        corr: cm1Redac('Mise en équation', { suite: ['Âge de la fille : x ; âge de Marc : 3x', '3x + 12 = 2(x + 12)', '3x + 12 = 2x + 24', 'x = 12'] }, 'La fille a 12 ans et Marc 36 ans.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Piscine : tarif A, 4,50 € l\'entrée ; tarif B, abonnement de 30 € puis 2 € l\'entrée. À partir de combien d\'entrées le tarif B est-il plus avantageux ?',
        corr: cm1Redac('Même prix', { suite: ['4,5x = 30 + 2x', '2,5x = 30', 'x = 12'] }, 'Pour 12 entrées, les deux tarifs coûtent 54 € : le tarif B est plus avantageux à partir de 13 entrées.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Les angles d\'un triangle mesurent x, 2x et 3x degrés. Calcule-les.',
        corr: cm1Redac('Somme des angles', { suite: ['x + 2x + 3x = 180', '6x = 180', 'x = 30'] }, 'Les angles mesurent 30°, 60° et 90° : le triangle est rectangle.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Dans une ferme, il y a des poules et des lapins : 35 têtes et 94 pattes. Combien y a-t-il de lapins ?',
        corr: cm1Redac('Mise en équation', { suite: ['Lapins : x ; poules : 35 − x', '4x + 2(35 − x) = 94', '2x + 70 = 94', 'x = 12'] }, 'Il y a 12 lapins (et 23 poules).') },
      { etoiles: 3, cahier: true, consigne: 'Si on augmente de 3 cm le côté d\'un carré, son aire augmente de 51 cm². Quel est le côté du carré ?',
        corr: cm1Redac('Mise en équation', { suite: ['(x + 3)² − x² = 51', 'x² + 6x + 9 − x² = 51', '6x = 42', 'x = 7'] }, 'Le côté du carré mesure 7 cm.') },
    ] },
  { titre: 'Équations', duree: '45 min', brevet: true,
    attendus: ['Automatismes : résoudre vite une équation simple', 'Comparer des tarifs à l\'aide d\'une équation', 'Développer, factoriser et résoudre une équation produit'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['2x + 3 = 11 : x =', 4], ['Solutions de x² = 36 :', '6 et −6', ['6', '−6', '6 et −6']], ['Solutions de (x − 2)(x + 3) = 0 :', '2 et −3', ['2 et 3', '−2 et 3', '2 et −3']], ['−3 est-il solution de x² + 2x = 3 ?', 'oui', ['oui', 'non']], ['5x = 2 : x =', '0,4', ['0,4', '2,5', '−3']], ['x − 7 = −2 : x =', 5]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Un cinéma propose trois tarifs. Tarif A : 9 € la séance. Tarif B : une carte annuelle à 30 €, puis 6 € la séance. Tarif C : un abonnement illimité à 200 € par an.'
          + qs(['Calculer le prix de 8 séances avec chaque tarif.', 'On note x le nombre de séances. Exprimer en fonction de x le prix payé avec le tarif A, puis avec le tarif B.', 'Résoudre l\'équation 9x = 30 + 6x. Interpréter le résultat.', 'À partir de combien de séances le tarif C devient-il le plus avantageux ?']),
        corr: cm1Redac('8 séances', { suite: ['A : 8 × 9 = 72 €', 'B : 30 + 8 × 6 = 78 €', 'C : 200 €'] }, '') + cm1Redac('Expressions', { suite: ['Tarif A : 9x', 'Tarif B : 30 + 6x'] }, '')
          + cm1Redac('Équation', { suite: ['9x − 6x = 30', '3x = 30', 'x = 10'] }, 'Pour 10 séances, les tarifs A et B coûtent le même prix : 90 €.')
          + cm1Redac('Tarif C', { suite: ['B devient plus cher que C quand 30 + 6x &gt; 200, soit x &gt; 28,3.', 'Avec 28 séances : B coûte 198 € ; avec 29 séances : B coûte 204 €.'] }, 'Le tarif C est le plus avantageux à partir de 29 séances.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'On considère l\'expression E = (2x − 3)² − 25.'
          + qs(['Développer et réduire E.', 'Factoriser E.', 'Résoudre l\'équation E = 0.', 'Calculer E pour x = 0.']),
        corr: cm1Redac('Développement', { nom: 'E', lignes: ['4x² − 12x + 9 − 25', '4x² − 12x − 16'] }, '') + cm1Redac('Factorisation', '(2x − 3 − 5)(2x − 3 + 5) = (2x − 8)(2x + 2)', '')
          + cm1Redac('E = 0', { suite: ['2x − 8 = 0 donc x = 4', '2x + 2 = 0 donc x = −1'] }, 'Les solutions sont 4 et −1.') + cm1Redac('Pour x = 0', '(−3)² − 25 = 9 − 25 = −16', 'E = −16.') },
    ] },
];
})();

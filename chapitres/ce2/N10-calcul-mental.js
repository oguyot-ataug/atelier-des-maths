/* ============================================================
   CHAPITRE : Procédures de calcul mental (CE2, N10, période 4)
   Programme du cycle 2 (CE2) : ajouter 8, 9, 18, 19, 28, 29, 38, 39 (ajouter 40 puis retrancher 2) ;
   soustraire 9, 19, 29, 39 (retrancher 30 puis ajouter 1) ; multiplier par 4 et par 8 en doublant ;
   doubles et moitiés usuels ; s'appuyer sur la numération (+10, +100, dizaines entières) ;
   écrire les résultats intermédiaires sur l'ardoise au besoin. Fluence visée en fin de CE2 :
   quinze résultats en trois minutes. Nombres ≤ 10 000.
   ============================================================ */
cm1Chapitre({
  niveau: 'ce2', titre: 'Procédures de calcul mental', slug: 'calcul-mental',
  cours: `
${cm1Lecon(1, 'Ajouter 9, 19, 29, 38…')}
${cm1Regle('Pour ajouter un nombre <b>proche d\'une dizaine</b>, on ajoute la dizaine, puis on corrige. <b>Ajouter 9</b>, c\'est ajouter 10 puis enlever 1. <b>Ajouter 38</b>, c\'est ajouter 40 puis enlever 2.')}
${cm1Exemple('Exemples :', ['57 + 9 = 57 + 10 − 1 = 67 − 1 = <b>66</b>', '146 + 29 = 146 + 30 − 1 = 176 − 1 = <b>175</b>', '235 + 38 = 235 + 40 − 2 = 275 − 2 = <b>273</b>'])}

${cm1Lecon(2, 'Soustraire 9, 19, 29, 39')}
${cm1Regle('<b>Soustraire 29</b>, c\'est enlever 30 puis <b>ajouter</b> 1 (on a enlevé 1 de trop).')}
${cm1Exemple('Exemples :', ['84 − 9 = 84 − 10 + 1 = 74 + 1 = <b>75</b>', '163 − 29 = 163 − 30 + 1 = 133 + 1 = <b>134</b>', '520 − 39 = 520 − 40 + 1 = 480 + 1 = <b>481</b>'])}
${cm1Astuce('Attention au sens de la correction : quand on <b>ajoute</b> trop, on enlève ; quand on <b>enlève</b> trop, on rajoute.')}

${cm1Lecon(3, 'Doubles et moitiés')}
${cm1Tableau(['Nombre', '15', '25', '35', '45', '75', '150', '250'], [['Double', '30', '50', '70', '90', '150', '300', '500']])}
${cm1Tableau(['Nombre', '30', '50', '70', '90', '100', '300', '1 000'], [['Moitié', '15', '25', '35', '45', '50', '150', '500']])}
${cm1Regle('Pour <b>multiplier par 4</b>, on double, puis on double encore. Pour <b>multiplier par 8</b>, on double trois fois. On peut écrire les résultats intermédiaires sur l\'ardoise.')}
${cm1Exemple('8 × 27 :', ['2 × 27 = 54 → 2 × 54 = 108 → 2 × 108 = <b>216</b>'])}

${cm1Lecon(4, 'Calculer avec les dizaines et les centaines')}
${cm1Exemple('On s\'appuie sur la numération :', ['3 450 + 200 = <b>3 650</b> (on ajoute 2 centaines)', '6 080 − 50 = <b>6 030</b>', '70 + 30 = 100, donc 470 + 30 = <b>500</b> (compléter à la centaine)', '9 × 40 = 36 dizaines = <b>360</b>'])}
${cm1Rem('Objectif de fin de CE2 : donner <b>15 résultats en 3 minutes</b>. On s\'entraîne un peu chaque jour, par exemple avec les questions flash de ce chapitre !')}
`,
  methode: `
${cm1Demo('ce2-cm-plus', 'Ajouter 39 de tête', 'Calcule 247 + 39.')}
${cm1Demo('ce2-cm-fois4', 'Multiplier par 4 en doublant', 'Calcule 4 × 45.')}
`,
  demos: [
    ['ce2-cm-plus', [
      { expr: '39 = 40 − 1', note: '39 est proche de 40.' },
      { expr: '247 + 40 = 287', note: 'J\'ajoute 4 dizaines.' },
      { expr: '287 − 1 = 286', note: 'J\'avais ajouté 1 de trop : j\'enlève 1.' },
    ]],
    ['ce2-cm-fois4', [
      { expr: '2 × 45 = 90', note: 'Je double une première fois.' },
      { expr: '2 × 90 = 180', note: 'Je double encore.' },
      { expr: '4 × 45 = 180', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-cm', [
    ['Calcule de tête : 36 + 9 · 125 + 19 · 408 + 29.', '45 · 144 · 437.'],
    ['Calcule de tête : 63 − 9 · 250 − 19 · 1 000 − 39.', '54 · 231 · 961.'],
    ['Calcule de tête : 152 + 38 · 307 + 28.', '190 · 335.'],
    ['Donne le double de 35, de 250, de 600 ; la moitié de 70, de 300, de 1 000.', '70, 500, 1 200 ; 35, 150, 500.'],
    ['Calcule en doublant : 4 × 16 · 4 × 75 · 8 × 25.', '64 · 300 · 200.'],
    ['Calcule : 2 750 + 300 · 4 060 − 40 · 680 + 20.', '3 050 · 4 020 · 700.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les calculateurs prodiges', [
    'Certaines personnes calculent de tête à une vitesse incroyable. Au XIX<sup>e</sup> siècle, <b>Jacques Inaudi</b>, un berger italien venu en France, faisait des multiplications énormes de tête devant les savants de l\'Académie des sciences. Son secret : beaucoup d\'entraînement et de bonnes astuces !',
  ]),
  quiz: [
    { q: '48 + 9 = …', opts: ['57', '58', '56'], correct: 0 },
    { q: '120 − 29 = …', opts: ['91', '89', '101'], correct: 0 },
    { q: 'La moitié de 90 est…', opts: ['40', '45', '180'], correct: 1 },
  ],
  flash: [
    { q: '67 + 9 = …', r: ['76', '75', '77', '86'], ok: 0 },
    { q: '154 + 38 = …', r: ['182', '192', '194', '190'], ok: 1 },
    { q: '85 − 29 = …', r: ['54', '56', '66', '64'], ok: 1 },
    { q: 'Le double de 45 est…', r: ['80', '90', '95', '85'], ok: 1 },
    { q: 'La moitié de 300 est…', r: ['100', '150', '600', '250'], ok: 1 },
    { q: '4 × 15 = …', r: ['45', '50', '60', '19'], ok: 2 },
    { q: '8 × 25 = …', r: ['100', '150', '200', '250'], ok: 2 },
    { q: '3 450 + 200 = …', r: ['3 470', '3 650', '5 450', '3 452'], ok: 1 },
  ],
});

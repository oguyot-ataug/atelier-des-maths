/* CP · Planches : Mesurer avec la règle (M4). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Mesurer avec la règle'] = [
  { titre: 'Mesurer un trait', duree: '20 min',
    attendus: ['Mesurer un trait en centimètres avec une règle (le 0 au début)'],
    exos: [
      { etoiles: 1, consigne: 'Combien mesure chaque trait ?',
        ...compte([[cpRegle(8, { seg: 5, K: 26 }), '5 cm'], [cpRegle(8, { seg: 7, K: 26 }), '7 cm']], 2, 3) },
      { etoiles: 2, consigne: 'La règle est mal placée. Combien mesure le trait ?',
        ...compte([[cpRegle(10, { seg: 4, de: 3, K: 26 }), '4 cm']], 1, 3) },
    ] },
  { titre: 'Tracer un trait', duree: '20 min',
    attendus: ['Tracer un trait d\'une longueur donnée en centimètres'],
    exos: [
      { etoiles: 1, consigne: 'Trace un trait de 6 cm (avec ta règle).', eleve: cadre(50), corr: lig(cpRegle(7, { seg: 6, K: 30 })) },
      { etoiles: 2, consigne: 'Trace un trait de 9 cm.', eleve: cadre(50), corr: lig(cpRegle(10, { seg: 9, K: 26 })) },
    ] },
  { titre: 'Comparer des mesures', duree: '20 min',
    attendus: ['Comparer des longueurs mesurées', 'Connaître le mètre : 1 m = 100 cm'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la plus grande longueur.',
        ...P3.chx([['', '8 cm', '5 cm · 8 cm'], ['', '1 m', '1 m · 20 cm']]) },
      { etoiles: 2, cahier: true, consigne: 'Un crayon mesure 14 cm. On le taille : il perd 3 cm. Combien mesure-t-il maintenant ?',
        corr: cm1Redac('Le crayon taillé', '14 − 3 = 11', 'Le crayon mesure 11 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Un ruban rouge mesure 7 cm, un ruban bleu 12 cm. Combien le bleu mesure-t-il de plus que le rouge ?',
        corr: cm1Redac('Différence', '7 + 5 = 12', 'Le ruban bleu mesure 5 cm de plus.') },
    ] },
];
})();

/* CE1 · Planches : Longueurs : le centimètre et le mètre (M1). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Longueurs : le centimètre et le mètre'] = [
  { titre: 'Mesurer en centimètres', duree: '20 min',
    attendus: ['Mesurer un segment en centimètres avec une règle'],
    exos: [
      { etoiles: 1, consigne: 'Combien mesure chaque segment ?', ...compte([[cpRegle(10, { seg: 6, K: 24 }), '6 cm'], [cpRegle(10, { seg: 9, K: 24 }), '9 cm']], 2, 3) },
      { etoiles: 2, consigne: 'La règle ne commence pas au 0. Combien mesure le segment ?', ...compte([[cpRegle(12, { seg: 5, de: 4, K: 22 }), '5 cm']], 1, 3) },
      { etoiles: 1, consigne: 'Combien mesure chaque segment ?', ...compte([[cpRegle(5, { seg: 3, K: 24 }), '3 cm'], [cpRegle(12, { seg: 11, K: 18 }), '11 cm'], [cpRegle(9, { seg: 8, K: 18 }), '8 cm']], 3, 3) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['De 3 à 10 sur la règle : @ cm', 7], ['De 5 à 12 sur la règle : @ cm', 7], ['De 0 à 14 sur la règle : @ cm', 14]], 2) },
    ] },
  { titre: 'Tracer et estimer', duree: '20 min',
    attendus: ['Tracer un segment de longueur donnée', 'Estimer des longueurs (cm ou m)'],
    exos: [
      { etoiles: 1, consigne: 'Trace un segment de 7 cm, puis un segment de 12 cm.', eleve: cadre(70), corr: lig(cpRegle(12, { seg: 7, K: 22 })) + lig(cpRegle(13, { seg: 12, K: 20 })) },
      { etoiles: 2, col: 1, consigne: 'Choisis la bonne unité : cm ou m.', ...P3.rmp([['Une gomme mesure 4 @.', 'cm'], ['Une porte mesure 2 @.', 'm'], ['Un crayon mesure 15 @.', 'cm'], ['La cour mesure 40 @.', 'm']], 2) },
      { etoiles: 1, consigne: 'Trace un segment de 4 cm, puis un segment de 10 cm.', eleve: cadre(70), corr: lig(cpRegle(5, { seg: 4, K: 24 })) + lig(cpRegle(11, { seg: 10, K: 22 })) },
      { etoiles: 2, col: 1, consigne: 'Entoure la mesure qui convient.', ...P3.chx([['La hauteur d\'une table :', '70 cm', '7 cm · 70 cm · 7 m'], ['La longueur d\'un bus :', '12 m', '12 cm · 12 m'], ['La longueur d\'un doigt :', '6 cm', '6 cm · 6 m']]) },
      { etoiles: 2, col: 1, consigne: 'Choisis la bonne unité : cm ou m.', ...P3.rmp([['Un arbre mesure 8 @.', 'm'], ['Un livre mesure 25 @.', 'cm'], ['Une piscine mesure 25 @.', 'm']], 2) },
    ] },
  { titre: 'Le mètre et les problèmes', duree: '25 min',
    attendus: ['Connaître la relation 1 m = 100 cm', 'Additionner et comparer des longueurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 m = @ cm', 100], ['2 m = @ cm', 200], ['1 m et 50 cm = @ cm', 150]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Une fourmi parcourt 3 cm, puis 5 cm, puis 4 cm. Quelle distance a-t-elle parcourue ?', corr: cm1Redac('Distance', '3 + 5 + 4 = 12', 'La fourmi a parcouru 12 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Une corde mesure 1 m. On en coupe 35 cm. Combien mesure le morceau qui reste ?', corr: cm1Redac('Le morceau', { suite: ['1 m = 100 cm', '100 − 35 = 65'] }, 'Il reste un morceau de 65 cm.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['3 m = @ cm', 300], ['100 cm = @ m', 1], ['200 cm + 100 cm = @ m', 3]], 3) },
      { etoiles: 2, col: 1, consigne: 'Écris <, > ou =.', ...P3.rmp([['1 m @ 90 cm', '>'], ['150 cm @ 2 m', '<'], ['100 cm @ 1 m', '=']], 1) },
      { etoiles: 2, consigne: 'Mesure les deux segments. Combien le plus long mesure-t-il de plus ?',
        eleve: plGrille([cpRegle(10, { seg: 5, K: 20 }), cpRegle(10, { seg: 9, K: 20 })], 2) + lig('Le plus long mesure ' + B(2) + ' cm de plus.'),
        corr: plGrille([cpRegle(10, { seg: 5, K: 20 }) + '<br>' + R('5 cm'), cpRegle(10, { seg: 9, K: 20 }) + '<br>' + R('9 cm')], 2) + lig('Le plus long mesure ' + R(4) + ' cm de plus.') },
    ] },
];
})();

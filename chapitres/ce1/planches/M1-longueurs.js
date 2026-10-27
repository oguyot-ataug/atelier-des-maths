/* CE1 · Planches : Longueurs : le centimètre et le mètre (M1). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Longueurs : le centimètre et le mètre'] = [
  { titre: 'Mesurer en centimètres', duree: '20 min',
    attendus: ['Mesurer un segment en centimètres avec une règle'],
    exos: [
      { etoiles: 1, consigne: 'Combien mesure chaque segment ?', ...compte([[cpRegle(10, { seg: 6, K: 24 }), '6 cm'], [cpRegle(10, { seg: 9, K: 24 }), '9 cm']], 2, 3) },
      { etoiles: 2, consigne: 'La règle ne commence pas au 0. Combien mesure le segment ?', ...compte([[cpRegle(12, { seg: 5, de: 4, K: 22 }), '5 cm']], 1, 3) },
    ] },
  { titre: 'Tracer et estimer', duree: '20 min',
    attendus: ['Tracer un segment de longueur donnée', 'Estimer des longueurs (cm ou m)'],
    exos: [
      { etoiles: 1, consigne: 'Trace un segment de 7 cm, puis un segment de 12 cm.', eleve: cadre(70), corr: lig(cpRegle(12, { seg: 7, K: 22 })) + lig(cpRegle(13, { seg: 12, K: 20 })) },
      { etoiles: 2, col: 1, consigne: 'Choisis la bonne unité : cm ou m.', ...P3.rmp([['Une gomme mesure 4 @.', 'cm'], ['Une porte mesure 2 @.', 'm'], ['Un crayon mesure 15 @.', 'cm'], ['La cour mesure 40 @.', 'm']], 2) },
    ] },
  { titre: 'Le mètre et les problèmes', duree: '25 min',
    attendus: ['Connaître la relation 1 m = 100 cm', 'Additionner et comparer des longueurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 m = @ cm', 100], ['2 m = @ cm', 200], ['1 m et 50 cm = @ cm', 150]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Une fourmi parcourt 3 cm, puis 5 cm, puis 4 cm. Quelle distance a-t-elle parcourue ?', corr: cm1Redac('Distance', '3 + 5 + 4 = 12', 'La fourmi a parcouru 12 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Une corde mesure 1 m. On en coupe 35 cm. Combien mesure le morceau qui reste ?', corr: cm1Redac('Le morceau', { suite: ['1 m = 100 cm', '100 − 35 = 65'] }, 'Il reste un morceau de 65 cm.') },
    ] },
];
})();

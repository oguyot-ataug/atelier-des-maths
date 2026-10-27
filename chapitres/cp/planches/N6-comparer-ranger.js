/* CP · Planches : Comparer et ranger les nombres (N6) -- comparer, signes < et >, ranger, encadrer. */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
const cmp = (a, b) => a < b ? '<' : a > b ? '>' : '=';
PLANCHES['cp|Comparer et ranger les nombres'] = [
  { titre: 'Comparer deux nombres', duree: '20 min',
    attendus: ['Comparer deux nombres en regardant d\'abord les dizaines', 'Utiliser les signes <, > et ='],
    exos: [
      { etoiles: 1, consigne: 'Entoure le nombre de cubes le plus grand.',
        ...PCP.entoure([[cpBarres(32, { q: 6 }), true], [cpBarres(23, { q: 6 }), false]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris <, > ou =.',
        eleve: plListe([[24, 42], [37, 31], [50, 49], [18, 18]].map(([a, b]) => `${a} ${plCase()} ${b}`)),
        corr: plListe([[24, 42], [37, 31], [50, 49], [18, 18]].map(([a, b]) => `${a} ${R(cmp(a, b))} ${b}`)) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus petit nombre.',
        ...P3.chx([['', '19', '19 · 21'], ['', '35', '53 · 35'], ['', '40', '44 · 40']]) },
    ] },
  { titre: 'Ranger des nombres', duree: '20 min',
    attendus: ['Ranger des nombres dans l\'ordre croissant ou décroissant'],
    exos: [
      { etoiles: 1, consigne: 'Range du plus petit au plus grand.',
        ...P3.rmp([['12 · 31 · 8 · 25 : @', '8 < 12 < 25 < 31'], ['40 · 14 · 41 · 4 : @', '4 < 14 < 40 < 41']], 14) },
      { etoiles: 2, consigne: 'Range du plus grand au plus petit.',
        ...P3.rmp([['33 · 53 · 35 · 50 : @', '53 > 50 > 35 > 33']], 14) },
      { etoiles: 3, cahier: true, consigne: 'Léa a 34 images, Hugo 43, Malo 29. Range-les de celui qui a le moins d\'images à celui qui en a le plus.',
        corr: cm1Redac('Du moins au plus', '29 < 34 < 43', 'Malo (29), puis Léa (34), puis Hugo (43).') },
    ] },
  { titre: 'Encadrer entre deux dizaines', duree: '15 min',
    attendus: ['Situer un nombre entre deux dizaines'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['@ < 26 < @', 20, 30], ['@ < 43 < @', 40, 50], ['@ < 17 < @', 10, 20]], 2) },
      { etoiles: 2, consigne: 'Colorie la case de 36 sur la bande, puis écris les dizaines qui l\'entourent.',
        eleve: lig(cpBande(30, 40, { c: 26 })) + lig(B(2) + ' < 36 < ' + B(2)),
        corr: lig(cpBande(30, 40, { c: 26, on: [36] })) + lig(R(30) + ' < 36 < ' + R(40)) },
    ] },
];
})();

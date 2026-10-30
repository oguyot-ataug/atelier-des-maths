/* ============================================================
   CE2 · Planches : Fractions et mesure de longueurs (N7)
   Fraction d'une unité de longueur (bande-unité pliée en quarts, quadrillage en dixièmes) ; mesurer :
   « trois quarts d'unité », « deux unités et un quart » ; des fractions au même endroit (un demi =
   deux quarts = cinq dixièmes) ; ranger des fractions sur la règle. Dénominateurs ≤ 12, fractions ≤ 1
   plus des unités entières. Fractions en LaTeX.
   ============================================================ */
(() => {
const { rmp, chx } = P3, F = cm1Frac;
// Règle de 0 à max unités, chaque unité partagée en n ; points [[valeur, nom]] ; unités entières écrites.
const regle = (max, n, pts) => cm1Axe(0, max, 1 / n, 1, pts || [], { L: max === 1 ? 280 : 400, fmt: v => String(Math.round(v)) })
  .replace(/style="width:100%;max-width:(\d+)px;/, (m, w) => `style="width:${w}px;max-width:100%;`);
// Segment mesuré avec la bande-unité u (en px), longueur en unités.
const seg = (l, u) => cmFig({ w: 30 + l * u + 20, h: 54, px: 30 + l * u + 20 }, [['r', 20, 6, u, 14, { f: '#F2A93B', op: .5 }], ['t', 20 + u / 2, 3, 'unité', { fs: 10 }], ['l', 20, 40, 20 + l * u, 40, { c: '#E35D3A', w: 3 }], ['p', 20, 40, ''], ['p', 20 + l * u, 40, '']]);
PLANCHES['ce2|Fractions et mesure de longueurs'] = [
  { titre: 'Partager une unité de longueur', duree: '30 min',
    attendus: ['Partager une unité en parts égales (pliage, quadrillage)', 'Exprimer une longueur avec une fraction de l\'unité'],
    exos: [
      { etoiles: 1, consigne: 'Quelle fraction de l\'unité mesure chaque segment rouge ?',
        eleve: plGrille([seg(.5, 160) + '<br>' + plFrac() + ' d\'unité', seg(.75, 160) + '<br>' + plFrac() + ' d\'unité', seg(.25, 160) + '<br>' + plFrac() + ' d\'unité'], 3),
        corr: plGrille([seg(.5, 160) + '<br>' + P3.R(F(1, 2)) + ' d\'unité', seg(.75, 160) + '<br>' + P3.R(F(3, 4)) + ' d\'unité', seg(.25, 160) + '<br>' + P3.R(F(1, 4)) + ' d\'unité'], 3) },
      { etoiles: 2, col: 1, consigne: 'La règle est graduée en dixièmes. Écris la position de chaque point.',
        eleve: regle(1, 10, [[.3, 'A'], [.7, 'B'], [.9, 'C']]) + plListe(['A : ' + plFrac() + '   B : ' + plFrac() + '   C : ' + plFrac()]),
        corr: regle(1, 10, [[.3, 'A'], [.7, 'B'], [.9, 'C']]) + plListe(['A : ' + P3.R(F(3, 10)) + '   B : ' + P3.R(F(7, 10)) + '   C : ' + P3.R(F(9, 10))]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([[`L'unité partagée en 4 : chaque part mesure ${F(1, 4)} d'unité. Il faut @ quarts pour faire l'unité.`, 4], [`Il faut @ dixièmes pour faire une unité.`, 10]], 3) },
      { etoiles: 1, col: 1, consigne: 'L\'unité est partagée en 4 morceaux égaux. Complète.', ...P3.rmp([[`Un morceau mesure @ de l'unité.`, cm1Frac(1, 4)], [`3 morceaux mesurent @ de l'unité.`, cm1Frac(3, 4)]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([[`${cm1Frac(10, 10)} = @ unité`, 1], [`${cm1Frac(4, 4)} = @ unité`, 1]], 2) },
      { etoiles: 2, consigne: 'Entoure la plus grande longueur.', ...P3.chx2([['', cm1Frac(3, 4), `${cm1Frac(1, 4)} · ${cm1Frac(3, 4)}`], ['', cm1Frac(7, 10), `${cm1Frac(7, 10)} · ${cm1Frac(3, 10)}`], ['', cm1Frac(5, 8), `${cm1Frac(5, 8)} · ${cm1Frac(2, 8)}`], ['', cm1Frac(4, 5), `${cm1Frac(1, 5)} · ${cm1Frac(4, 5)}`]]) },
    ] },
  { titre: 'Mesurer avec une règle en fractions', duree: '30 min',
    attendus: ['Lire une longueur plus grande que l\'unité : deux unités et un quart', 'Encadrer une longueur entre deux fractions'],
    exos: [
      { etoiles: 1, consigne: 'La règle est graduée en quarts. Écris la position de chaque point.',
        eleve: regle(3, 4, [[.75, 'D'], [1.5, 'E'], [2.25, 'F']]) + plGrille(['D : ' + P3.B(8), 'E : ' + P3.B(8), 'F : ' + P3.B(8)], 1),
        corr: regle(3, 4, [[.75, 'D'], [1.5, 'E'], [2.25, 'F']]) + plGrille(['D : ' + P3.R(F(3, 4) + ' d\'unité'), 'E : ' + P3.R('1 unité et ' + F(2, 4) + ' (ou ' + F(1, 2) + ')'), 'F : ' + P3.R('2 unités et ' + F(1, 4))], 1) },
      { etoiles: 2, col: 1, consigne: 'Le point G est entre deux graduations en dixièmes. Complète.',
        eleve: regle(1, 10, [[.75, 'G']]) + plListe([`G est entre ${plFrac()} et ${plFrac()}.`]),
        corr: regle(1, 10, [[.75, 'G']]) + plListe([`G est entre ${P3.R(F(7, 10))} et ${P3.R(F(8, 10))}.`]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Trace un segment de 2 unités et 3 quarts d\'unité, avec une unité de 4 cm.',
        corr: cm1Redac('Longueur', { suite: ['2 unités = 8 cm', `${F(3, 4)} d'unité = 3 cm`] }, 'Le segment mesure 8 cm et 3 cm, donc 11 cm.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([[`${cm1Frac(5, 4)} = 1 + @`, cm1Frac(1, 4)], [`${cm1Frac(12, 10)} = 1 + @`, cm1Frac(2, 10)]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([[`1 + ${cm1Frac(3, 4)} = @ quarts`, 7], ['2 unités = @ quarts', 8]], 2) },
      { etoiles: 2, consigne: 'Plus grand que 1 ? Entoure.', ...P3.chx2([[cm1Frac(5, 4), 'oui', 'oui · non'], [cm1Frac(3, 4), 'non', 'oui · non'], [cm1Frac(11, 10), 'oui', 'oui · non'], [cm1Frac(7, 10), 'non', 'oui · non'], [cm1Frac(9, 8), 'oui', 'oui · non'], [cm1Frac(4, 4), 'non', 'oui · non']]) },
    ] },
  { titre: 'Des fractions au même endroit', duree: '30 min',
    attendus: ['Repérer des fractions égales sur la règle', 'Ranger des fractions sur la règle graduée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure les fractions placées au même endroit que le point H.',
        eleve: regle(1, 4, [[.5, 'H']]) + plListe([`${F(2, 4)} · ${F(1, 3)} · ${F(5, 10)} · ${F(3, 4)} · ${F(1, 2)}`]),
        corr: regle(1, 4, [[.5, 'H']]) + plListe([`${plEntoure(F(2, 4))} · ${F(1, 3)} · ${plEntoure(F(5, 10))} · ${F(3, 4)} · ${plEntoure(F(1, 2))}`]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande longueur.',
        ...chx([[`${F(3, 4)} ou ${F(1, 4)} d'unité`, F(3, 4), `${F(3, 4)} · ${F(1, 4)}`], [`${F(7, 10)} ou ${F(4, 10)} d'unité`, F(7, 10), `${F(7, 10)} · ${F(4, 10)}`], [`1 unité ou ${F(9, 10)} d'unité`, '1 unité', `1 unité · ${F(9, 10)}`]]) },
      { etoiles: 3, cahier: true, consigne: `Range ces longueurs de la plus courte à la plus longue : ${F(3, 10)} ; ${F(1, 2)} ; ${F(9, 10)} ; ${F(1, 10)} d'unité. Aide-toi d'une règle en dixièmes.`,
        corr: cm1Redac('Rangement', `${F(1, 2)} = ${F(5, 10)}`, `${F(1, 10)} < ${F(3, 10)} < ${F(1, 2)} < ${F(9, 10)}.`, regle(1, 10, [[.1, 'a'], [.3, 'b'], [.5, 'c'], [.9, 'd']])) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([[`${cm1Frac(1, 2)} = @ quarts`, 2], [`${cm1Frac(1, 2)} = @ dixièmes`, 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus petite longueur.', ...P3.chx([['', cm1Frac(1, 10), `${cm1Frac(1, 10)} · ${cm1Frac(1, 4)} · ${cm1Frac(1, 2)}`], ['', cm1Frac(2, 10), `${cm1Frac(1, 2)} · ${cm1Frac(2, 10)}`]]) },
      { etoiles: 2, col: 1, consigne: 'Range de la plus petite à la plus grande.', ...P3.rmp([[`${cm1Frac(3, 4)} · ${cm1Frac(1, 4)} · ${cm1Frac(2, 4)} : @`, `${cm1Frac(1, 4)} < ${cm1Frac(2, 4)} < ${cm1Frac(3, 4)}`]], 8) },
      { etoiles: 3, col: 1, consigne: 'Complète avec <, > ou =.', ...P3.rmp([[`${cm1Frac(5, 10)} @ ${cm1Frac(1, 2)}`, '='], [`${cm1Frac(3, 4)} @ 1`, '<'], [`${cm1Frac(6, 4)} @ 1`, '>']], 1) },
    ] },
];
})();

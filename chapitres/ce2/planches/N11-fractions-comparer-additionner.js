/* ============================================================
   CE2 · Planches : Comparer et additionner des fractions (N11)
   Comparer des fractions inférieures à 1 : même dénominateur, même numérateur, ou un dénominateur
   multiple de l'autre ; additionner et soustraire des fractions de même dénominateur (ou quand un
   dénominateur est multiple de l'autre), avec des bandes. Fractions en LaTeX.
   ============================================================ */
(() => {
const { chx } = P3, F = cm1Frac;
const bande = (n, k, c) => cm1Bande(n, k, { largeur: 220, coul: c }).replace(/style="width:[^;]*;max-width:[^;]*;/, 'style="width:230px;max-width:100%;');
const signe = (a, b, s) => ({ eleve: `${a} ${plCase()} ${b}`, corr: `${a} ${P3.R(s)} ${b}` });
const signes = l => ({ eleve: plListe(l.map(x => signe(...x).eleve)), corr: plListe(l.map(x => signe(...x).corr)) });
const calc = l => ({ eleve: plListe(l.map(([e]) => `${e} = ${plFrac()}`)), corr: plListe(l.map(([e, r]) => `${e} = ${P3.R(r)}`)) });
PLANCHES['ce2|Comparer et additionner des fractions'] = [
  { titre: 'Comparer des fractions', duree: '30 min',
    attendus: ['Comparer des fractions de même dénominateur', 'Comparer des fractions de même numérateur', 'Comparer quand un dénominateur est multiple de l\'autre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec <, > ou = (même dénominateur).',
        ...signes([[F(5, 12), F(7, 12), '<'], [F(4, 6), F(1, 6), '>'], [F(3, 8), F(3, 8), '=']]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec <, > ou = (même numérateur : des parts plus petites…).',
        ...signes([[F(1, 3), F(1, 5), '>'], [F(5, 12), F(5, 8), '<'], [F(2, 10), F(2, 4), '<']]) },
      { etoiles: 2, consigne: `Compare ${F(7, 12)} et ${F(5, 6)} en t'aidant des bandes.<div style="text-align:center;">${bande(12, 7)}<br>${bande(6, 5, '#2EA8C9')}</div>`,
        ...chx([[`${F(7, 12)} … ${F(5, 6)}`, `${F(7, 12)} < ${F(5, 6)}`, `${F(7, 12)} < ${F(5, 6)} · ${F(7, 12)} > ${F(5, 6)}`]]) },
      { etoiles: 3, cahier: true, consigne: `Marc a mangé ${F(3, 8)} d'un gâteau, Léa ${F(1, 4)} du même gâteau. Qui en a mangé le plus ?`,
        corr: cm1Redac('Comparer', `${F(1, 4)} = ${F(2, 8)}`, `${F(2, 8)} < ${F(3, 8)} : Marc a mangé le plus de gâteau.`, bande(8, 3) + '<br>' + bande(4, 1, '#2EA8C9')) },
    ] },
  { titre: 'Additionner et soustraire des fractions', duree: '30 min',
    attendus: ['Additionner des fractions de même dénominateur', 'Soustraire des fractions de même dénominateur', 'Utiliser une fraction égale pour calculer'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...calc([[`${F(2, 7)} + ${F(3, 7)}`, F(5, 7)], [`${F(1, 5)} + ${F(3, 5)}`, F(4, 5)], [`${F(4, 10)} + ${F(5, 10)}`, F(9, 10)]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...calc([[`${F(7, 8)} − ${F(2, 8)}`, F(5, 8)], [`${F(5, 6)} − ${F(4, 6)}`, F(1, 6)], [`${F(9, 12)} − ${F(5, 12)}`, F(4, 12)]]) },
      { etoiles: 2, consigne: `Colorie ${F(1, 4)} en rouge, puis ${F(2, 4)} en bleu sur la même bande. Quelle fraction est coloriée en tout ?`,
        eleve: `<div style="text-align:center;">${bande(4, 0)}</div>` + plListe([`${F(1, 4)} + ${F(2, 4)} = ${plFrac()}`]),
        corr: `<div style="text-align:center;">${cm1Bande(4, 1, { largeur: 220, coul: '#E35D3A' }).replace(/<\/svg>$/, '') + `<rect x="58" y="3" width="55" height="34" fill="#2EA8C9" fill-opacity=".75" stroke="#1C1B2E" stroke-width="1.5"/><rect x="113" y="3" width="55" height="34" fill="#2EA8C9" fill-opacity=".75" stroke="#1C1B2E" stroke-width="1.5"/></svg>`}</div>` + plListe([`${F(1, 4)} + ${F(2, 4)} = ${P3.R(F(3, 4))}`]) },
      { etoiles: 3, cahier: true, consigne: `Calcule ${F(1, 2)} + ${F(1, 4)} en remplaçant ${F(1, 2)} par une fraction égale.`,
        corr: cm1Redac('Fraction égale', `${F(1, 2)} = ${F(2, 4)}`, '') + cm1Redac('Addition', `${F(2, 4)} + ${F(1, 4)} = ${F(3, 4)}`, `${F(1, 2)} + ${F(1, 4)} = ${F(3, 4)}.`) },
    ] },
];
})();

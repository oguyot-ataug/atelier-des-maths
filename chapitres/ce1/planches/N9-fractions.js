/* CE1 · Planches : Les fractions : un demi, un tiers, un quart (N9). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R, F = cm1Frac;
const blanc = (forme, n, o) => ce1Frac(forme, n, 0, o);
PLANCHES['ce1|Les fractions : un demi, un tiers, un quart'] = [
  { titre: 'Nommer une fraction', duree: '20 min',
    attendus: ['Reconnaître un demi, un tiers, un quart d\'une figure partagée en parts égales'],
    exos: [
      { etoiles: 1, consigne: 'Quelle fraction est coloriée ? Écris-la.',
        eleve: plGrille([ce1Frac('disque', 2, 1, { px: 70 }) + B(3), ce1Frac('disque', 4, 1, { px: 70 }) + B(3), ce1Frac('disque', 3, 1, { px: 70 }) + B(3)], 3),
        corr: plGrille([ce1Frac('disque', 2, 1, { px: 70 }) + R(F(1, 2)), ce1Frac('disque', 4, 1, { px: 70 }) + R(F(1, 4)), ce1Frac('disque', 3, 1, { px: 70 }) + R(F(1, 3))], 3) },
      { etoiles: 2, consigne: 'Les parts sont-elles égales ? Entoure seulement les figures où la partie coloriée est un demi.',
        ...PCP.entoure([[ce1Frac('bande', 2, 1, { px: 130 }), true], [cpSvg(252, 58, `<rect x="6" y="6" width="160" height="46" fill="#E35D3A" fill-opacity=".8"/><rect x="166" y="6" width="80" height="46" fill="#fff"/><line x1="166" y1="6" x2="166" y2="52" stroke="#1F3A5C" stroke-width="2"/><rect x="6" y="6" width="240" height="46" fill="none" stroke="#1F3A5C" stroke-width="2.5"/>`, 130), false], [ce1Frac('carre', 2, 1, { px: 70 }), true]], 3) },
    ] },
  { titre: 'Colorier une fraction', duree: '20 min',
    attendus: ['Colorier une fraction d\'une figure', 'Deux tiers, trois quarts'],
    exos: [
      { etoiles: 1, consigne: `Colorie ${F(1, 3)} de la bande, puis ${F(3, 4)} de l'autre bande.`, eleve: lig(blanc('bande', 3, { px: 200 })) + lig(blanc('bande', 4, { px: 200 })), corr: lig(ce1Frac('bande', 3, 1, { px: 200 })) + lig(ce1Frac('bande', 4, 3, { px: 200 })) },
      { etoiles: 2, consigne: `Colorie ${F(2, 4)} du carré.`, eleve: lig(blanc('carre', 4, { quadrants: true, px: 90 })), corr: lig(ce1Frac('carre', 4, 2, { quadrants: true, px: 90 })) + '<p style="text-align:center;">Deux quarts, c\'est la moitié du carré.</p>' },
    ] },
  { titre: 'Comparer', duree: '20 min',
    attendus: ['Comparer un demi, un tiers, un quart', 'Savoir que deux demis, trois tiers, quatre quarts font une unité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([[`${F(2, 2)} = @`, 1], [`${F(4, 4)} = @`, 1], [`Dans une unité, il y a @ tiers.`, 3]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande part.', ...P3.chx([['', F(1, 2), `${F(1, 2)} · ${F(1, 4)}`], ['', F(1, 3), `${F(1, 4)} · ${F(1, 3)}`]]) },
      { etoiles: 3, cahier: true, consigne: 'Une pizza est coupée en 4 parts égales. Léo en mange 1, Zoé en mange 2. Quelle fraction de la pizza reste-t-il ?', corr: cm1Redac('Pizza qui reste', '1 + 2 = 3', `Ils ont mangé 3 quarts : il reste un quart de la pizza, ${F(1, 4)}.`, ce1Frac('disque', 4, 3, { px: 70 })) },
    ] },
];
})();

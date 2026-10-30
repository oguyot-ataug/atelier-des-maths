/* CE1 · Planches : Les fractions : partager en parts égales (N9). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R, F = cm1Frac;
const blanc = (forme, n, o) => ce1Frac(forme, n, 0, o);
const D = (n, k, o) => ce1Frac('disque', n, k, Object.assign({ px: 70 }, o));
PLANCHES['ce1|Les fractions : partager en parts égales'] = [
  { titre: 'Une part de l\'unité', duree: '20 min',
    attendus: ['Reconnaître un demi, un tiers, un quart, un cinquième, un sixième, un huitième, un dixième d\'une figure partagée en parts égales'],
    exos: [
      { etoiles: 1, consigne: 'Quelle fraction est coloriée ? Écris-la.',
        eleve: plGrille([D(2, 1) + B(3), D(4, 1) + B(3), D(3, 1) + B(3)], 3),
        corr: plGrille([D(2, 1) + R(F(1, 2)), D(4, 1) + R(F(1, 4)), D(3, 1) + R(F(1, 3))], 3) },
      { etoiles: 1, consigne: 'Quelle fraction est coloriée ? Écris-la.',
        eleve: plGrille([D(6, 1) + B(3), D(8, 1) + B(3), D(5, 1) + B(3)], 3),
        corr: plGrille([D(6, 1) + R(F(1, 6)), D(8, 1) + R(F(1, 8)), D(5, 1) + R(F(1, 5))], 3) },
      { etoiles: 2, consigne: 'Les parts sont-elles égales ? Entoure seulement les figures où la partie coloriée est un demi.',
        ...PCP.entoure([[ce1Frac('bande', 2, 1, { px: 130 }), true], [cpSvg(252, 58, `<rect x="6" y="6" width="160" height="46" fill="#E35D3A" fill-opacity=".8"/><rect x="166" y="6" width="80" height="46" fill="#fff"/><line x1="166" y1="6" x2="166" y2="52" stroke="#1F3A5C" stroke-width="2"/><rect x="6" y="6" width="240" height="46" fill="none" stroke="#1F3A5C" stroke-width="2.5"/>`, 130), false], [ce1Frac('carre', 2, 1, { px: 70 }), true]], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Un tiers : on partage en @ parts égales.', 3], ['Un cinquième : en @ parts égales.', 5], ['Un dixième : en @ parts égales.', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne écriture.', ...P3.chx([['un huitième', F(1, 8), `${F(1, 6)} · ${F(1, 8)} · ${F(8, 1)}`], ['un sixième', F(1, 6), `${F(1, 6)} · ${F(1, 3)} · ${F(6, 1)}`], ['un quart', F(1, 4), `${F(1, 2)} · ${F(1, 4)} · ${F(1, 3)}`]]) },
      { etoiles: 3, consigne: 'Écris en lettres.', ...P3.rmp([[`${F(1, 5)} : @`, 'un cinquième'], [`${F(1, 10)} : @`, 'un dixième'], [`${F(1, 3)} : @`, 'un tiers'], [`${F(1, 4)} : @`, 'un quart'], [`${F(1, 2)} : @`, 'un demi'], [`${F(1, 8)} : @`, 'un huitième']], 8) },
    ] },
  { titre: 'Plusieurs parts', duree: '20 min',
    attendus: ['Lire, écrire et colorier une fraction comme trois huitièmes', 'Connaître les mots numérateur et dénominateur'],
    exos: [
      { etoiles: 1, consigne: 'Quelle fraction est coloriée ? Écris-la.',
        eleve: plGrille([ce1Frac('bande', 8, 3, { px: 150 }) + B(3), ce1Frac('bande', 5, 2, { px: 150 }) + B(3)], 2),
        corr: plGrille([ce1Frac('bande', 8, 3, { px: 150 }) + R(F(3, 8)), ce1Frac('bande', 5, 2, { px: 150 }) + R(F(2, 5))], 2) },
      { etoiles: 1, consigne: `Colorie ${F(2, 3)} de la première bande, puis ${F(3, 5)} de la seconde.`, eleve: lig(blanc('bande', 3, { px: 200 })) + lig(blanc('bande', 5, { px: 200 })), corr: lig(ce1Frac('bande', 3, 2, { px: 200 })) + lig(ce1Frac('bande', 5, 3, { px: 200 })) },
      { etoiles: 2, consigne: `Colorie ${F(3, 4)} du carré, puis ${F(5, 8)} du disque.`, eleve: lig(blanc('carre', 4, { quadrants: true, px: 90 }), blanc('disque', 8, { px: 90 })), corr: lig(ce1Frac('carre', 4, 3, { quadrants: true, px: 90 }), ce1Frac('disque', 8, 5, { px: 90 })) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([[`Dans ${F(3, 8)}, le numérateur est @.`, 3], [`Dans ${F(3, 8)}, le dénominateur est @.`, 8], [`Dans ${F(7, 10)}, le dénominateur est @.`, 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([[`${F(3, 8)} = ${F(1, 8)} + @ + @`, F(1, 8), F(1, 8)], [`${F(1, 5)} + ${F(1, 5)} = @`, F(2, 5)], [`${F(1, 6)} + ${F(1, 6)} + ${F(1, 6)} + ${F(1, 6)} = @`, F(4, 6)]], 3) },
      { etoiles: 3, consigne: 'Écris en chiffres.', ...P3.rmp([['trois huitièmes : @', F(3, 8)], ['deux tiers : @', F(2, 3)], ['sept dixièmes : @', F(7, 10)], ['cinq sixièmes : @', F(5, 6)], ['un quart : @', F(1, 4)], ['quatre cinquièmes : @', F(4, 5)]], 3) },
    ] },
  { titre: 'L\'unité entière', duree: '20 min',
    attendus: ['Savoir que deux demis, cinq cinquièmes, dix dixièmes font une unité', 'Trouver la partie qui n\'est pas coloriée'],
    exos: [
      { etoiles: 1, consigne: 'Complète.', ...P3.rmp([[`${F(2, 2)} = @`, 1], [`${F(5, 5)} = @`, 1], ['Dans une unité, il y a @ tiers.', 3], ['Dans une unité, il y a @ huitièmes.', 8], [`${F(3, 3)} = @`, 1], [`${F(10, 10)} = @`, 1], ['Dans une unité, il y a @ quarts.', 4], ['Dans une unité, il y a @ dixièmes.', 10]], 2) },
      { etoiles: 2, consigne: 'Quelle fraction est coloriée ? Quelle fraction est blanche ?',
        eleve: plGrille([ce1Frac('bande', 6, 4, { px: 150 }) + '<br>coloriée : ' + B(3) + '<br>blanche : ' + B(3), ce1Frac('disque', 10, 7, { px: 80 }) + '<br>coloriée : ' + B(3) + '<br>blanche : ' + B(3)], 2),
        corr: plGrille([ce1Frac('bande', 6, 4, { px: 150 }) + '<br>coloriée : ' + R(F(4, 6)) + '<br>blanche : ' + R(F(2, 6)), ce1Frac('disque', 10, 7, { px: 80 }) + '<br>coloriée : ' + R(F(7, 10)) + '<br>blanche : ' + R(F(3, 10))], 2) },
      { etoiles: 2, consigne: `Ces trois feuilles sont pareilles. Colorie ${F(1, 2)} de chaque feuille, d'une façon différente à chaque fois.`, eleve: lig(blanc('carre', 1, { px: 80 }), blanc('carre', 1, { px: 80 }), blanc('carre', 1, { px: 80 })), corr: lig(ce1Frac('carre', 2, 1, { px: 80 }), ce1Frac('carre', 4, 2, { quadrants: true, px: 80 }), cpSvg(140, 140, '<path d="M10 10 L130 10 L10 130 Z" fill="#E35D3A" fill-opacity=".8"/><rect x="10" y="10" width="120" height="120" fill="none" stroke="#1F3A5C" stroke-width="2.5"/>', 80)) },
      { etoiles: 3, cahier: true, consigne: 'Une pizza est coupée en 8 parts égales. Léo en mange 3. Quelle fraction de la pizza a-t-il mangée ?', corr: cm1Redac('Pizza mangée', `${F(3, 8)} = ${ce1SommeUnit(3, 8)}`, `Léo a mangé trois huitièmes de la pizza, ${F(3, 8)}.`, ce1Frac('disque', 8, 3, { px: 70 })) },
      { etoiles: 3, cahier: true, consigne: 'Explique pourquoi quatre quarts, c\'est égal à 1.', corr: cm1Redac('Quatre quarts', `${F(4, 4)} = 1`, 'On partage l\'unité en 4 parts égales et on prend les 4 parts : c\'est l\'unité entière.', ce1Frac('carre', 4, 4, { quadrants: true, px: 70 })) },
    ] },
];
})();

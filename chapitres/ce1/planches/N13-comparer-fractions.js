/* CE1 · Planches : Comparer, ajouter, retirer des fractions (N13). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R, F = cm1Frac;
const blanc = (n, px) => ce1Frac('bande', n, 0, { px: px || 200 });
const bd = (n, k, px) => ce1Frac('bande', n, k, { px: px || 200 });
const C = (a, b) => `${a} ${plCase()} ${b}`;
PLANCHES['ce1|Comparer, ajouter, retirer des fractions'] = [
  { titre: 'Comparer des fractions', duree: '20 min',
    attendus: ['Comparer des fractions de même dénominateur', 'Comparer des fractions de numérateur 1'],
    exos: [
      { etoiles: 1, consigne: `Colorie ${F(2, 5)} de la première bande et ${F(4, 5)} de la seconde. Quelle fraction est la plus grande ?`,
        eleve: lig(blanc(5)) + lig(blanc(5)) + lig(B(3)), corr: lig(bd(5, 2)) + lig(bd(5, 4)) + lig(R(F(4, 5))) },
      { etoiles: 1, col: 1, consigne: 'Écris &lt; ou &gt;.', eleve: plListe([C(F(3, 8), F(5, 8)), C(F(6, 10), F(2, 10)), C(F(1, 4), F(3, 4))]), corr: plListe([`${F(3, 8)} ${R('&lt;')} ${F(5, 8)}`, `${F(6, 10)} ${R('&gt;')} ${F(2, 10)}`, `${F(1, 4)} ${R('&lt;')} ${F(3, 4)}`]) },
      { etoiles: 2, consigne: `Colorie ${F(1, 2)}, ${F(1, 4)} et ${F(1, 8)} de ces bandes pareilles. Quelle part est la plus grande ?`,
        eleve: lig(blanc(2)) + lig(blanc(4)) + lig(blanc(8)) + lig(B(3)),
        corr: lig(bd(2, 1)) + lig(bd(4, 1)) + lig(bd(8, 1)) + lig(R(F(1, 2))) },
      { etoiles: 2, col: 1, consigne: 'Écris &lt; ou &gt;.', eleve: plListe([C(F(1, 3), F(1, 6)), C(F(1, 10), F(1, 5)), C(F(1, 2), F(1, 4))]), corr: plListe([`${F(1, 3)} ${R('&gt;')} ${F(1, 6)}`, `${F(1, 10)} ${R('&lt;')} ${F(1, 5)}`, `${F(1, 2)} ${R('&gt;')} ${F(1, 4)}`]) },
      { etoiles: 2, consigne: 'Entoure la plus grande fraction.', ...P3.chx2([['', F(1, 3), `${F(1, 5)} · ${F(1, 3)} · ${F(1, 8)}`], ['', F(4, 6), `${F(1, 6)} · ${F(4, 6)} · ${F(3, 6)}`], ['', F(5, 8), `${F(5, 8)} · ${F(3, 8)} · ${F(1, 8)}`], ['', F(1, 2), `${F(1, 2)} · ${F(1, 4)} · ${F(1, 10)}`]]) },
      { etoiles: 3, cahier: true, consigne: 'Léo mange un tiers d\'une tarte. Zoé mange un sixième de la même tarte. Qui en mange le plus ? Explique.', corr: cm1Redac('Le plus gourmand', `${F(1, 3)} &gt; ${F(1, 6)}`, 'Léo en mange le plus : en partageant en 3, les parts sont plus grosses qu\'en partageant en 6.', bd(3, 1, 150) + '<br>' + bd(6, 1, 150)) },
    ] },
  { titre: 'Ajouter et retirer des fractions', duree: '20 min',
    attendus: ['Additionner et soustraire des fractions de même dénominateur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([[`${F(1, 5)} + ${F(2, 5)} = @`, F(3, 5)], [`${F(1, 4)} + ${F(2, 4)} = @`, F(3, 4)], [`${F(3, 10)} + ${F(4, 10)} = @`, F(7, 10)]], 3) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([[`${F(2, 3)} − ${F(1, 3)} = @`, F(1, 3)], [`${F(5, 8)} − ${F(2, 8)} = @`, F(3, 8)], [`${F(4, 6)} − ${F(1, 6)} = @`, F(3, 6)]], 3) },
      { etoiles: 2, consigne: `Colorie ${F(2, 8)} en rouge, puis ${F(3, 8)} en bleu. Quelle fraction de la bande est coloriée ?`, eleve: lig(blanc(8, 240)) + lig(B(3)), corr: lig(cpSvg(252, 58, Array.from({ length: 8 }, (_, i) => `<rect x="${6 + i * 30}" y="6" width="30" height="46" fill="${i < 2 ? '#E35D3A' : i < 5 ? '#2EA8C9' : '#fff'}" fill-opacity="${i < 5 ? .8 : 1}" stroke="#1F3A5C" stroke-width="2"/>`).join(''), 240)) + lig(`${F(2, 8)} + ${F(3, 8)} = ` + R(F(5, 8))) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([[`${F(1, 6)} + @ = ${F(4, 6)}`, F(3, 6)], [`${F(7, 10)} − @ = ${F(2, 10)}`, F(5, 10)], [`${F(2, 5)} + @ = ${F(5, 5)}`, F(3, 5)], [`${F(6, 8)} − @ = ${F(1, 8)}`, F(5, 8)]], 3) },
      { etoiles: 3, cahier: true, consigne: 'Une pizza est coupée en 8 parts égales. Léo en mange 2 parts, Zoé en mange 3. Quelle fraction de la pizza ont-ils mangée à eux deux ?', corr: cm1Redac('Pizza mangée', `${F(2, 8)} + ${F(3, 8)} = ${F(5, 8)}`, `À eux deux, ils ont mangé ${F(5, 8)} de la pizza.`, ce1Frac('disque', 8, 5, { px: 70 })) },
    ] },
  { titre: 'Compléter jusqu\'à l\'unité', duree: '20 min',
    attendus: ['Savoir que deux cinquièmes plus trois cinquièmes font une unité', 'Trouver le complément d\'une fraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([[`${F(2, 5)} + ${F(3, 5)} = @`, 1], [`${F(1, 4)} + @ = 1`, F(3, 4)], [`${F(5, 8)} + @ = 1`, F(3, 8)]], 3) },
      { etoiles: 2, consigne: 'Quelle fraction de la bande n\'est pas coloriée ?', eleve: plGrille([bd(6, 4, 150) + '<br>' + B(3), bd(10, 3, 150) + '<br>' + B(3)], 2), corr: plGrille([bd(6, 4, 150) + '<br>' + R(F(2, 6)), bd(10, 3, 150) + '<br>' + R(F(7, 10))], 2) },
      { etoiles: 2, cahier: true, consigne: `Lucie a colorié ${F(3, 10)} d'une figure en bleu et le reste en rouge. Quelle fraction de la figure est coloriée en rouge ?`, corr: cm1Redac('Partie rouge', `${F(10, 10)} − ${F(3, 10)} = ${F(7, 10)}`, `La partie rouge, c'est ${F(7, 10)} de la figure.`) },
      { etoiles: 3, cahier: true, consigne: `Zoé a mangé ${F(3, 8)} d'une tarte. Quelle fraction de la tarte reste-t-il ?`, corr: cm1Redac('Tarte qui reste', `${F(8, 8)} − ${F(3, 8)} = ${F(5, 8)}`, `Il reste ${F(5, 8)} de la tarte.`, ce1Frac('disque', 8, 3, { px: 70 })) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([[`${F(1, 6)} + ${F(1, 6)} + ${F(1, 6)} = @`, F(3, 6)], [`Trois sixièmes, c'est la même chose qu'un @.`, 'demi']], 3) },
    ] },
  { titre: 'Pour aller plus loin : le tiers et le quart d\'une quantité', duree: '20 min',
    attendus: ['Trouver le tiers et le quart d\'une quantité avec les tables (notion du CM1)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le tiers de 12 : @', 4], ['Le quart de 12 : @', 3], ['Le tiers de 21 : @', 7], ['Le quart de 20 : @', 5]], 2) },
      { etoiles: 1, consigne: 'Colorie le tiers des 12 jetons, puis le quart des 8 jetons.', eleve: lig(cpJetons(12, 0, Array(12).fill('#fff'))) + lig(cpJetons(8, 0, Array(8).fill('#fff'))), corr: lig(cpJetons(12, 0, [...Array(4).fill(CPC.jeton2), ...Array(8).fill('#fff')])) + lig('Le tiers de 12 : ' + R(4)) + lig(cpJetons(8, 0, [...Array(2).fill(CPC.jeton2), ...Array(6).fill('#fff')])) + lig('Le quart de 8 : ' + R(2)) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['3 × 7 = @', 21], ['Le tiers de 21 : @', 7], ['4 × 9 = @', 36], ['Le quart de 36 : @', 9]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Il y a 24 élèves. Le quart des élèves mange à la maison. Combien d\'élèves mangent à la maison ?', corr: cm1Redac('Élèves à la maison', '4 × 6 = 24', '6 élèves mangent à la maison.') },
      { etoiles: 3, cahier: true, consigne: 'Mamie a 18 €. Elle donne le tiers à Léo. Combien lui reste-t-il ?', corr: cm1Redac('Argent de mamie', { suite: ['3 × 6 = 18', '18 − 6 = 12'] }, 'Mamie donne 6 € à Léo : il lui reste 12 €.') },
    ] },
];
})();

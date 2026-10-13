/* ============================================================
   4e · Planches : Fractions : multiplication et division (N4)
   Produit de fractions (simplifier avant de multiplier) ; fraction d'une quantité et produits en
   croix ; inverse et quotient ; enchaînements et problèmes.
   ============================================================ */
(() => {
const { R, F, T, ligne, rmp, ch, chx } = P3, Fr = plFrac();
const DS = PL_DESSINS, illu = plIllu;
// Bouteille de 3/4 L versée dans des verres de 1/8 L.
const bouteille = DS.fig(170, 116, DS.cylindre(30, 108, 16, 70, 52, '#F3F6FA') + `<rect x="24" y="22" width="12" height="16" fill="#F3F6FA" stroke="#1F3A5C" stroke-width="1.4"/>`
  + [0, 1, 2].map(k => `<path d="M${70 + k * 32},70 l4,38 h16 l4,-38 Z" fill="#fff" stroke="#1F3A5C" stroke-width="1.3"/><path d="M${72 + k * 32},86 l2,22 h16 l2,-22 Z" fill="#CDEAF6"/>`).join('') + DS.tx([150, 92], '…', { fs: 16 }), 150);
PLANCHES['4e|Fractions : multiplication et division'] = [
  { titre: 'Multiplier des fractions', duree: '30 min',
    attendus: ['Calculer le produit de deux fractions', 'Simplifier avant de multiplier', 'Multiplier une fraction par un entier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe([ligne(F(2, 3), '×', F(4, 5), '=', Fr), ligne(F(1, 2), '×', F(3, 7), '=', Fr), ligne(F(5, 4), '×', F(3, 2), '=', Fr)]),
        corr: plListe([ligne(F(2, 3), '×', F(4, 5), '=', R(F(8, 15))), ligne(F(1, 2), '×', F(3, 7), '=', R(F(3, 14))), ligne(F(5, 4), '×', F(3, 2), '=', R(F(15, 8)))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat sous forme irréductible.',
        eleve: plListe([ligne(F(3, 4), '×', F(2, 9), '=', Fr), ligne('5 ×', F(3, 10), '=', Fr), ligne(F(7, 8), '×', F(4, 21), '=', Fr), ligne(F(6, 5), '×', F(10, 9), '=', Fr)]),
        corr: plListe([ligne(F(3, 4), '×', F(2, 9), '=', F('3 × 2', '2 × 2 × 3 × 3'), '=', R(F(1, 6))), ligne('5 ×', F(3, 10), '=', F(15, 10), '=', R(F(3, 2))), ligne(F(7, 8), '×', F(4, 21), '=', F('7 × 4', '2 × 4 × 3 × 7'), '=', R(F(1, 6))), ligne(F(6, 5), '×', F(10, 9), '=', F('2 × 3 × 2 × 5', '5 × 3 × 3'), '=', R(F(4, 3)))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule avec les signes.',
        eleve: plListe([ligne(F('−2', 3), '×', F(5, 7), '=', Fr), ligne(F('−3', 4), '×', F('−8', 9), '=', Fr), ligne(F(4, 5), '× (−10) =', Fr)]),
        corr: plListe([ligne(F('−2', 3), '×', F(5, 7), '=', R(F('−10', 21))), ligne(F('−3', 4), '×', F('−8', 9), '=', F(24, 36), '=', R(F(2, 3))), ligne(F(4, 5), '× (−10) =', F('−40', 5), '=', R('−8'))]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${T(1, 2)} × ${T(1, 2)} = ${T(1, 4)}`, 'vrai'], [`${T(2, 3)} × 3 = ${T(6, 9)}`, 'faux'], [`Multiplier par ${T(1, 2)}, c'est diviser par 2.`, 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: `Calcule ${T(15, 28)} × ${T(14, 25)} en simplifiant avant d'effectuer les produits.`,
        corr: cm1Redac('Produit', { suite: [`${F(15, 28)} × ${F(14, 25)} = ${F('3 × 5 × 2 × 7', '2 × 2 × 7 × 5 × 5')}`, `= ${F(3, '2 × 5')}`, `= ${F(3, 10)}`] }, `Le produit vaut ${F(3, 10)}.`) },
    ] },
  { titre: 'Fraction d\'une quantité et produits en croix', duree: '30 min',
    attendus: ['Calculer une fraction d\'une quantité', 'Prendre une fraction d\'une fraction', 'Utiliser les produits en croix'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`${T(3, 4)} de 60 = @`, 45], [`${T(2, 3)} de 45 = @`, 30], [`${T(5, 8)} de 40 € = @ €`, 25], [`${T(7, 10)} de 2 h = @ min`, 84]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (fraction d\'une fraction).',
        eleve: plListe([ligne(F(1, 2), 'de', F(3, 5), '=', Fr), ligne(F(2, 3), 'de', F(3, 4), '=', Fr), ligne(F(5, 6), 'de', F(9, 10), '=', Fr)]),
        corr: plListe([ligne(F(1, 2), '×', F(3, 5), '=', R(F(3, 10))), ligne(F(2, 3), '×', F(3, 4), '=', F(6, 12), '=', R(F(1, 2))), ligne(F(5, 6), '×', F(9, 10), '=', F(45, 60), '=', R(F(3, 4)))]) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre x grâce aux produits en croix.',
        ...rmp([[`${T('x', 6)} = ${T(10, 15)} : x = @`, 4], [`${T(7, 'x')} = ${T(21, 12)} : x = @`, 4], [`${T(3, 8)} = ${T('x', 20)} : x = @`, '7,5']]) },
      { etoiles: 2, col: 1, consigne: 'Ces deux fractions sont-elles égales ? Utilise les produits en croix.',
        ...ch([[`${T(12, 18)} et ${T(10, 15)} :`, 'oui'], [`${T(5, 7)} et ${T(7, 9)} :`, 'non'], [`${T(9, 24)} et ${T(15, 40)} :`, 'oui']], 'oui · non') },
      { etoiles: 2, cahier: true, consigne: `Dans un collège de 540 élèves, ${T(4, 9)} sont des filles. Parmi elles, ${T(3, 4)} sont demi-pensionnaires. Combien de filles sont demi-pensionnaires ? Quelle fraction des élèves du collège cela représente-t-il ?`,
        corr: cm1Redac('Nombre de filles', `${F(4, 9)} × 540 = 240`, 'Il y a 240 filles.') + cm1Redac('Filles demi-pensionnaires', `${F(3, 4)} × 240 = 180`, '180 filles sont demi-pensionnaires.') + cm1Redac('Fraction du collège', `${F(3, 4)} × ${F(4, 9)} = ${F(12, 36)} = ${F(1, 3)}`, `Cela représente ${F(1, 3)} des élèves du collège.`) },
    ] },
  { titre: 'Inverse et quotient de fractions', duree: '35 min',
    attendus: ['Donner l\'inverse d\'un nombre', 'Diviser, c\'est multiplier par l\'inverse', 'Calculer un quotient de fractions'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne l\'inverse.',
        eleve: plListe([ligne('de', F(3, 4), ':', Fr), ligne('de 5 :', Fr), ligne('de', F('−2', 7), ':', Fr), ligne('de', F(1, 9), ':', Fr)]),
        corr: plListe([ligne('de', F(3, 4), ':', R(F(4, 3))), ligne('de 5 :', R(F(1, 5))), ligne('de', F('−2', 7), ':', R(F('−7', 2))), ligne('de', F(1, 9), ':', R('9'))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat sous forme irréductible.',
        eleve: plListe([ligne(F(2, 3), ':', F(4, 5), '=', Fr), ligne(F(3, 7), ':', F(9, 14), '=', Fr), ligne('5 :', F(1, 4), '=', Fr), ligne(F(4, 9), ': 2 =', Fr)]),
        corr: plListe([ligne(F(2, 3), '×', F(5, 4), '=', F(10, 12), '=', R(F(5, 6))), ligne(F(3, 7), '×', F(14, 9), '=', F(42, 63), '=', R(F(2, 3))), ligne('5 ×', F(4, 1), '=', R('20')), ligne(F(4, 9), '×', F(1, 2), '=', F(4, 18), '=', R(F(2, 9)))]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon résultat.',
        ...chx([[`${T(1, 2)} : ${T(1, 4)} =`, '2', `${T(1, 8)} · 2 · ${T(1, 2)}`], [`${T(3, 5)} : 3 =`, `${T(1, 5)}`, `${T(9, 5)} · ${T(1, 5)} · 5`], [`${T('−6', 7)} : ${T(3, 14)} =`, '−4', `−4 · 4 · ${T('−9', 49)}`]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Diviser par 4, c\'est multiplier par 0,25.', 'vrai'], ['0 a un inverse.', 'faux'], [`L'inverse de ${T(2, 3)} est ${T('−2', 3)}.`, 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: `Calcule A = ${T(5, 6)} : ${T(10, 9)} et donne le résultat sous forme irréductible. Rédige toutes les étapes.`,
        corr: cm1Redac('Quotient', { suite: [`A = ${F(5, 6)} × ${F(9, 10)}`, `A = ${F('5 × 9', '6 × 10')} = ${F('5 × 3 × 3', '2 × 3 × 2 × 5')}`, `A = ${F(3, 4)}`] }, `A est égal à ${F(3, 4)}.`) },
    ] },
  { titre: 'Enchaîner les calculs et résoudre des problèmes', duree: '40 min',
    attendus: ['Respecter les priorités avec des fractions', 'Choisir la bonne opération dans un problème', 'Rédiger la solution'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Calcule en respectant les priorités.',
        eleve: plListe([ligne(F(1, 2), '+', F(1, 2), '×', F(2, 3), '=', Fr), ligne('(', F(1, 2), '+', F(1, 3), ') ×', F(6, 5), '=', Fr), ligne(F(3, 4), '−', F(1, 4), ':', F(1, 2), '=', Fr)]),
        corr: plListe([ligne(F(1, 2), '+', F(1, 3), '=', R(F(5, 6))), ligne(F(5, 6), '×', F(6, 5), '=', R('1')), ligne(F(3, 4), '−', F(2, 4), '=', R(F(1, 4)))]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'opération qui répond à la question.',
        ...chx([[`Combien de morceaux de ${T(1, 4)} m dans un ruban de 3 m ?`, `3 : ${T(1, 4)}`, `3 × ${T(1, 4)} · 3 : ${T(1, 4)} · 3 − ${T(1, 4)}`], [`Les ${T(2, 3)} de 18 € :`, `${T(2, 3)} × 18`, `${T(2, 3)} × 18 · 18 : ${T(2, 3)} · 18 + ${T(2, 3)}`]]) },
      { etoiles: 2, cahier: true, consigne: illu(bouteille, `On verse une bouteille de ${T(3, 4)} L de jus dans des verres de ${T(1, 8)} L. Combien de verres remplit-on ?`),
        corr: cm1Redac('Nombre de verres', `${F(3, 4)} : ${F(1, 8)} = ${F(3, 4)} × 8 = ${F(24, 4)} = 6`, 'On remplit 6 verres.') },
      { etoiles: 3, cahier: true, consigne: `Un ruban mesure ${T(5, 2)} m. On en coupe ${T(2, 5)}, puis on partage le reste en 3 morceaux égaux. Quelle est la longueur d'un morceau ?`,
        corr: cm1Redac('Longueur coupée', `${F(2, 5)} × ${F(5, 2)} = 1`, 'On coupe 1 m.') + cm1Redac('Reste', `${F(5, 2)} − 1 = ${F(3, 2)}`, `Il reste ${F(3, 2)} m.`) + cm1Redac('Un morceau', `${F(3, 2)} : 3 = ${F(3, 2)} × ${F(1, 3)} = ${F(1, 2)}`, 'Un morceau mesure un demi-mètre, soit 50 cm.') },
      { etoiles: 3, cahier: true, consigne: `Un réservoir de 60 L est plein aux ${T(5, 6)}. On en utilise les ${T(2, 5)}. Combien de litres reste-t-il dans le réservoir ?`,
        corr: cm1Redac('Contenu au départ', `${F(5, 6)} × 60 = 50`, 'Le réservoir contient 50 L.') + cm1Redac('Litres utilisés', `${F(2, 5)} × 50 = 20`, 'On utilise 20 L.') + cm1Redac('Reste', '50 − 20 = 30', 'Il reste 30 L dans le réservoir.') },
    ] },
];
})();

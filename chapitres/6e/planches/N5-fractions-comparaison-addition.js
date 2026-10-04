/* ============================================================
   6e · Planches : Fractions : comparaison et addition (N5)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`);
const lt = '&lt;', gt = '&gt;';
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const cmp = l => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), C, F(c, d)))), corr: plListe(l.map(([a, b, c, d]) => { const x = a * d - c * b; return ligne(F(a, b), R(x > 0 ? gt : x < 0 ? lt : '='), F(c, d)); })) });
const suite = (l, sg) => ({ eleve: '<div style="text-align:center;">' + ligne(...l.map(() => Fr).join(` ${sg} `).split(' ')) + '</div>', corr: '<div style="text-align:center;">' + ligne(...l.map(([a, b]) => R(F(a, b))).join(`¤${sg}¤`).split('¤')) + '</div>' });
const ops = (l, op) => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), op, F(c, d), '=', Fr))), corr: plListe(l.map(([a, b, c, d, r]) => ligne(F(a, b), op, F(c, d), '=', ...(r[2] ? [r[2], '='] : []), R(F(r[0], r[1]))))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
PLANCHES['6e|Fractions : comparaison et addition'] = [
  { titre: 'Comparer des fractions simples', duree: '35 min',
    attendus: ['Comparer une fraction à 1', 'Comparer deux fractions de même dénominateur', 'Comparer deux fractions de même numérateur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([ligne(F(5, 7), C, '1'), ligne(F(9, 4), C, '1'), ligne(F(6, 6), C, '1'), ligne('1', C, F(11, 10))]),
        corr: plListe([ligne(F(5, 7), R(lt), '1'), ligne(F(9, 4), R(gt), '1'), ligne(F(6, 6), R('='), '1'), ligne('1', R(lt), F(11, 10))]) },
      { etoiles: 1, col: 1, consigne: 'Même dénominateur : compare les numérateurs.', ...cmp([[3, 8, 5, 8], [11, 9, 7, 9], [4, 5, 4, 5], [13, 10, 31, 10]]) },
      { etoiles: 2, col: 1, consigne: 'Même numérateur : la fraction qui a le plus grand dénominateur est la plus petite (parts plus petites).', ...cmp([[3, 4, 3, 5], [2, 9, 2, 7], [5, 12, 5, 6], [7, 3, 7, 10]]) },
      { etoiles: 2, consigne: `Range dans l'ordre croissant : ${T(7, 5)} ; ${T(2, 5)} ; ${T(9, 5)} ; ${T(1, 5)} ; ${T(5, 5)}.`, ...suite([[1, 5], [2, 5], [5, 5], [7, 5], [9, 5]], lt) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande fraction.',
        ...ch([[`${T(3, 4)} ou ${T(5, 4)} :`, 'la seconde'], [`${T(2, 3)} ou ${T(2, 5)} :`, 'la première'], [`${T(7, 8)} ou ${T(9, 10)} (compare à 1) :`, 'la seconde']], 'la première · la seconde') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Inès a mangé ${T(3, 8)} d'une pizza et Hugo ${T(3, 6)} d'une pizza identique. Qui en a mangé le plus ? Explique avec un dessin.`,
        corr: cm1Redac('Comparaison', `Même numérateur : ${F(3, 6)} &gt; ${F(3, 8)} (un sixième est plus grand qu'un huitième).`, 'Hugo a mangé plus de pizza qu\'Inès.') },
    ] },
  { titre: 'Comparer en réduisant au même dénominateur', duree: '40 min',
    attendus: ['Écrire deux fractions avec le même dénominateur (un dénominateur multiple de l\'autre)', 'Comparer et ranger des fractions', 'Situer une fraction entre deux entiers'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour avoir le même dénominateur.',
        eleve: plListe([ligne(F(2, 3), '=', Fr, '(dénominateur 6)'), ligne(F(3, 4), '=', Fr, '(dénominateur 12)'), ligne(F(1, 5), '=', Fr, '(dénominateur 10)'), ligne(F(5, 2), '=', Fr, '(dénominateur 8)')]),
        corr: plListe([ligne(F(2, 3), '=', R(F(4, 6))), ligne(F(3, 4), '=', R(F(9, 12))), ligne(F(1, 5), '=', R(F(2, 10))), ligne(F(5, 2), '=', R(F(20, 8)))]) },
      { etoiles: 2, col: 1, consigne: 'Compare (réduis d\'abord au même dénominateur).', ...cmp([[2, 3, 5, 6], [3, 4, 7, 8], [7, 10, 3, 5], [5, 4, 11, 8]]) },
      { etoiles: 2, consigne: `Range dans l'ordre croissant : ${T(1, 2)} ; ${T(3, 8)} ; ${T(3, 4)} ; ${T(5, 8)} ; ${T(1, 4)} (pense aux huitièmes).`, ...suite([[1, 4], [3, 8], [1, 2], [5, 8], [3, 4]], lt) },
      { etoiles: 2, col: 1, consigne: 'Encadre chaque fraction entre deux entiers consécutifs.',
        eleve: plListe([ligne(B(1), lt, F(17, 6), lt, B(1)), ligne(B(1), lt, F(23, 4), lt, B(1)), ligne(B(1), lt, F(41, 10), lt, B(1))]),
        corr: plListe([ligne(R(2), lt, F(17, 6), lt, R(3)), ligne(R(5), lt, F(23, 4), lt, R(6)), ligne(R(4), lt, F(41, 10), lt, R(5))]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Trouve trois fractions comprises entre ${T(1, 3)} et ${T(2, 3)}. Explique ta méthode.`,
        corr: cm1Redac('Méthode', `${F(1, 3)} = ${F(4, 12)} et ${F(2, 3)} = ${F(8, 12)}`, `Par exemple ${F(5, 12)}, ${F(6, 12)} et ${F(7, 12)}.`) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Dans une classe, ${T(2, 5)} des élèves font du foot et ${T(3, 10)} font du basket. Quel sport est le plus pratiqué ?`,
        corr: cm1Redac('Comparaison', `${F(2, 5)} = ${F(4, 10)} et ${F(4, 10)} &gt; ${F(3, 10)}`, 'Le foot est le plus pratiqué.') },
    ] },
  { titre: 'Additionner et soustraire des fractions de même dénominateur', duree: '35 min',
    attendus: ['Additionner deux fractions de même dénominateur', 'Soustraire deux fractions de même dénominateur', 'Ajouter un entier et une fraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule (on additionne les numérateurs, on garde le dénominateur).', ...ops([[2, 7, 3, 7, [5, 7]], [1, 9, 4, 9, [5, 9]], [5, 11, 6, 11, [11, 11]], [7, 4, 5, 4, [12, 4]]], '+') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...ops([[8, 9, 3, 9, [5, 9]], [11, 6, 5, 6, [6, 6]], [9, 10, 7, 10, [2, 10]], [13, 5, 4, 5, [9, 5]]], '−') },
      { etoiles: 2, col: 1, consigne: 'Écris 1, 2, 3 sous forme de fraction, puis calcule.',
        eleve: plListe([ligne('1 +', F(2, 5), '=', Fr), ligne('2 +', F(3, 4), '=', Fr), ligne('1 −', F(3, 8), '=', Fr), ligne('3 −', F(1, 2), '=', Fr)]),
        corr: plListe([ligne('1 +', F(2, 5), '=', F(5, 5), '+', F(2, 5), '=', R(F(7, 5))), ligne('2 +', F(3, 4), '=', F(8, 4), '+', F(3, 4), '=', R(F(11, 4))), ligne('1 −', F(3, 8), '=', R(F(5, 8))), ligne('3 −', F(1, 2), '=', R(F(5, 2)))]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe([ligne(F(3, 7), '+', Fr, '=', F(6, 7)), ligne(Fr, '−', F(2, 9), '=', F(5, 9)), ligne(F(5, 12), '+', Fr, '= 1')]),
        corr: plListe([ligne(F(3, 7), '+', R(F(3, 7)), '=', F(6, 7)), ligne(R(F(7, 9)), '−', F(2, 9), '=', F(5, 9)), ligne(F(5, 12), '+', R(F(7, 12)), '= 1')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un réservoir est plein aux ${T(7, 10)}. On utilise ${T(4, 10)} du réservoir. Quelle fraction du réservoir reste-t-il pleine ? Quelle fraction est vide ?`,
        corr: cm1Redac('Reste plein', `${F(7, 10)} − ${F(4, 10)} = ${F(3, 10)}`, `Le réservoir est plein aux ${F(3, 10)}.`) + cm1Redac('Partie vide', `1 − ${F(3, 10)} = ${F(7, 10)}`, `Les ${F(7, 10)} du réservoir sont vides.`) },
    ] },
  { titre: 'Additionner des fractions : dénominateurs multiples', duree: '40 min',
    attendus: ['Réduire au même dénominateur (un dénominateur multiple de l\'autre)', 'Additionner et soustraire des fractions', 'Résoudre un problème avec des fractions'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule (écris la première fraction avec le dénominateur de la seconde).', ...ops([[1, 2, 1, 4, [3, 4, F(2, 4) + ' + ' + F(1, 4)]], [2, 3, 1, 6, [5, 6, F(4, 6) + ' + ' + F(1, 6)]], [3, 5, 3, 10, [9, 10, F(6, 10) + ' + ' + F(3, 10)]]], '+') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...ops([[3, 4, 1, 8, [5, 8, F(6, 8) + ' − ' + F(1, 8)]], [5, 6, 1, 3, [3, 6, F(5, 6) + ' − ' + F(2, 6)]], [7, 10, 1, 5, [5, 10, F(7, 10) + ' − ' + F(2, 10)]]], '−') },
      { etoiles: 2, col: 1, consigne: 'Calcule (garde le plus grand dénominateur).',
        eleve: plListe([ligne(F(1, 3), '+', F(1, 6), '+', F(1, 2), '=', Fr), ligne(F(5, 4), '−', F(1, 2), '=', Fr), ligne('2 −', F(3, 5), '=', Fr)]),
        corr: plListe([ligne(F(1, 3), '+', F(1, 6), '+', F(1, 2), '=', F(2, 6), '+', F(1, 6), '+', F(3, 6), '=', R(F(6, 6)), '= 1'), ligne(F(5, 4), '−', F(1, 2), '=', R(F(3, 4))), ligne('2 −', F(3, 5), '=', R(F(7, 5)))]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Pour une recette, il faut ${T(1, 2)} L de lait et ${T(1, 4)} L de crème. Quelle quantité de liquide utilise-t-on ? Cela tient-il dans un bol de ${T(3, 4)} L ?`,
        corr: cm1Redac('Quantité totale', `${F(1, 2)} + ${F(1, 4)} = ${F(2, 4)} + ${F(1, 4)} = ${F(3, 4)}`, `On utilise ${F(3, 4)} L : cela tient tout juste dans le bol.`) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Léa dépense ${T(1, 3)} de son argent de poche pour un livre et ${T(1, 6)} pour des bonbons. Quelle fraction de son argent lui reste-t-il ?`,
        corr: cm1Redac('Dépenses', `${F(1, 3)} + ${F(1, 6)} = ${F(2, 6)} + ${F(1, 6)} = ${F(3, 6)}`, `Elle a dépensé ${F(3, 6)}, soit la moitié.`) + cm1Redac('Reste', `1 − ${F(3, 6)} = ${F(3, 6)}`, `Il lui reste ${F(3, 6)} de son argent, c'est-à-dire la moitié.`) },
    ] },
];
})();

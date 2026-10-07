/* ============================================================
   5e · Planches : Fractions (N4)
   Quotient et égalité de quotients, simplification, comparaison, addition et soustraction, problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`);
const lt = '&lt;', gt = '&gt;';
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Fractions égales : [a, b, c, d] → a/b = c/d, la case vide est la seconde fraction.
const egal = l => ({ eleve: plListe(l.map(([a, b]) => ligne(F(a, b), '=', Fr))), corr: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), '=', R(F(c, d))))) });
const cmp = l => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), C, F(c, d)))), corr: plListe(l.map(([a, b, c, d]) => { const x = a * d - c * b; return ligne(F(a, b), R(x > 0 ? gt : x < 0 ? lt : '='), F(c, d)); })) });
// Opérations : [a, b, c, d, [n, d, étape]] → a/b op c/d = (étape =) n/d.
const ops = (l, op) => ({ eleve: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), op, F(c, d), '=', Fr))), corr: plListe(l.map(([a, b, c, d, r]) => ligne(F(a, b), op, F(c, d), '=', ...(r[2] ? [r[2], '='] : []), R(F(r[0], r[1]))))) });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
PLANCHES['5e|Fractions'] = [
  { titre: 'Une fraction est un quotient', duree: '35 min',
    attendus: ['Interpréter a/b comme le quotient de a par b', 'Trouver le nombre qui, multiplié par b, donne a', 'Passer de l\'écriture fractionnaire à l\'écriture décimale'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec une fraction.',
        eleve: plListe([ligne('7 ×', Fr, '= 3'), ligne('5 ×', Fr, '= 2'), ligne(Fr, '× 9 = 4'), ligne('12 ×', Fr, '= 1')]),
        corr: plListe([ligne('7 ×', R(F(3, 7)), '= 3'), ligne('5 ×', R(F(2, 5)), '= 2'), ligne(R(F(4, 9)), '× 9 = 4'), ligne('12 ×', R(F(1, 12)), '= 1')]) },
      { etoiles: 1, col: 1, consigne: 'Donne l\'écriture décimale.',
        eleve: plListe([ligne(F(3, 4), '=', B(2)), ligne(F(7, 2), '=', B(2)), ligne(F(1, 5), '=', B(2)), ligne(F(9, 10), '=', B(2)), ligne(F(13, 4), '=', B(2))]),
        corr: plListe([ligne(F(3, 4), '=', R('0,75')), ligne(F(7, 2), '=', R('3,5')), ligne(F(1, 5), '=', R('0,2')), ligne(F(9, 10), '=', R('0,9')), ligne(F(13, 4), '=', R('3,25'))]) },
      { etoiles: 1, col: 1, consigne: 'Écris sous forme de fraction décimale (dénominateur 10, 100…).',
        eleve: plListe([ligne('0,7 =', Fr), ligne('1,3 =', Fr), ligne('0,25 =', Fr), ligne('2,07 =', Fr)]),
        corr: plListe([ligne('0,7 =', R(F(7, 10))), ligne('1,3 =', R(F(13, 10))), ligne('0,25 =', R(F(25, 100))), ligne('2,07 =', R(F(207, 100)))]) },
      { etoiles: 2, col: 1, consigne: 'Encadre la fraction entre deux entiers consécutifs.',
        eleve: plListe([ligne(B(1), lt, F(17, 5), lt, B(1)), ligne(B(1), lt, F(25, 7), lt, B(1)), ligne(B(1), lt, F(9, 4), lt, B(1)), ligne(B(1), lt, F(100, 9), lt, B(1))]),
        corr: plListe([ligne(R(3), lt, F(17, 5), lt, R(4)), ligne(R(3), lt, F(25, 7), lt, R(4)), ligne(R(2), lt, F(9, 4), lt, R(3)), ligne(R(11), lt, F(100, 9), lt, R(12))]) },
      { etoiles: 2, col: 1, consigne: 'Entoure les fractions égales à 2.',
        ...(() => { const l = [[6, 3], [4, 8], [10, 5], [2, 1], [20, 10], [8, 2], [14, 7], [3, 6]];
          return { eleve: plGrille(l.map(([a, b]) => F(a, b)), 4), corr: plGrille(l.map(([a, b]) => a === 2 * b ? plEntoure(F(a, b)) : F(a, b)), 4) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: `On partage équitablement 5 pizzas entre 8 personnes. Quelle part chaque personne reçoit-elle ? Écris-la sous forme de fraction, puis en écriture décimale.`,
        corr: cm1Redac('Part de chacun', `5 : 8 = ${F(5, 8)} = 0,625`, `Chaque personne reçoit ${F(5, 8)} de pizza, soit 0,625 pizza.`) },
    ] },
  { titre: 'Égalité de quotients et simplification', duree: '40 min',
    attendus: ['Multiplier ou diviser le numérateur et le dénominateur par un même nombre', 'Simplifier une fraction', 'Reconnaître une fraction irréductible'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour obtenir une fraction égale (dénominateur imposé).',
        eleve: plListe([ligne(F(3, 4), '=', Fr, '(sur 12)'), ligne(F(2, 5), '=', Fr, '(sur 20)'), ligne(F(7, 3), '=', Fr, '(sur 15)'), ligne(F(5, 6), '=', Fr, '(sur 18)')]),
        corr: plListe([ligne(F(3, 4), '=', R(F(9, 12))), ligne(F(2, 5), '=', R(F(8, 20))), ligne(F(7, 3), '=', R(F(35, 15))), ligne(F(5, 6), '=', R(F(15, 18)))]) },
      { etoiles: 1, col: 1, consigne: 'Simplifie (divise par le nombre indiqué).',
        eleve: plListe([ligne(F(12, 18), '=', Fr, '(par 6)'), ligne(F(15, 25), '=', Fr, '(par 5)'), ligne(F(28, 21), '=', Fr, '(par 7)'), ligne(F(40, 100), '=', Fr, '(par 20)')]),
        corr: plListe([ligne(F(12, 18), '=', R(F(2, 3))), ligne(F(15, 25), '=', R(F(3, 5))), ligne(F(28, 21), '=', R(F(4, 3))), ligne(F(40, 100), '=', R(F(2, 5)))]) },
      { etoiles: 2, col: 1, consigne: 'Simplifie le plus possible.', ...egal([[18, 24, 3, 4], [35, 45, 7, 9], [36, 16, 9, 4], [72, 27, 8, 3]]) },
      { etoiles: 2, col: 1, consigne: 'La fraction est-elle irréductible ? Entoure.',
        ...ch([[`${T(9, 14)} :`, 'oui'], [`${T(15, 21)} :`, 'non'], [`${T(11, 22)} :`, 'non'], [`${T(8, 27)} :`, 'oui']], 'oui · non') },
      { etoiles: 2, col: 1,
        ...(() => { const l = [[3, 5], [6, 10], [9, 15], [5, 3], [12, 20], [30, 50], [6, 15], [15, 25]], ok = ([a, b]) => a * 5 === b * 3;
          return { eleve: plGrille(l.slice(1).map(([a, b]) => F(a, b)), 4), corr: plGrille(l.slice(1).map(p => ok(p) ? plEntoure(F(...p)) : F(...p)), 4) }; })(),
        consigne: `Entoure les fractions égales à ${T(3, 5)}.` },
      { etoiles: 3, col: 1, cahier: true, consigne: `Dans une classe de 28 élèves, 21 sont demi-pensionnaires. Écris la fraction des élèves demi-pensionnaires, puis simplifie-la. Que signifie-t-elle ?`,
        corr: cm1Redac('Demi-pensionnaires', `${F(21, 28)} = ${F(3, 4)} (on divise par 7)`, `Les ${F(3, 4)} des élèves sont demi-pensionnaires : 3 élèves sur 4.`) },
    ] },
  { titre: 'Comparer des fractions', duree: '40 min',
    attendus: ['Comparer deux fractions de même dénominateur', 'Comparer en réduisant au même dénominateur (dénominateurs multiples l\'un de l\'autre)', 'Ranger des fractions'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.', ...cmp([[7, 9, 4, 9], [11, 13, 15, 13], [5, 5, 9, 9], [3, 2, 1, 1]]) },
      { etoiles: 2, col: 1, consigne: 'Réduis au même dénominateur, puis compare.', ...cmp([[2, 3, 7, 12], [5, 4, 11, 8], [7, 10, 3, 5], [13, 6, 9, 4]]) },
      { etoiles: 2, col: 1, consigne: 'Compare à 1 : entoure.',
        ...ch([[`${T(17, 16)} est …`, 'plus grand que 1'], [`${T(99, 100)} est …`, 'plus petit que 1'], [`${T(42, 42)} est …`, 'égal à 1']], 'plus petit que 1 · égal à 1 · plus grand que 1') },
      { etoiles: 2, consigne: `Range dans l'ordre croissant : ${T(5, 6)} ; ${T(2, 3)} ; ${T(7, 12)} ; ${T(3, 4)} ; ${T(1, 2)} (pense aux douzièmes).`,
        eleve: '<div style="text-align:center;">' + ligne(Fr, lt, Fr, lt, Fr, lt, Fr, lt, Fr) + '</div>',
        corr: '<div style="text-align:center;">' + ligne(R(F(1, 2)), lt, R(F(7, 12)), lt, R(F(2, 3)), lt, R(F(3, 4)), lt, R(F(5, 6))) + '</div>' },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande fraction.',
        ...ch([[`${T(3, 8)} ou ${T(1, 4)} :`, 'la première'], [`${T(5, 9)} ou ${T(2, 3)} :`, 'la seconde'], [`${T(11, 10)} ou ${T(6, 5)} :`, 'la seconde'], [`${T(7, 7)} ou ${T(13, 14)} :`, 'la première']], 'la première · la seconde') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Lucas a lu ${T(3, 5)} de son livre et Nora ${T(7, 10)} du même livre. Qui en a lu le plus ? Justifie.`,
        corr: cm1Redac('Comparaison', `${F(3, 5)} = ${F(6, 10)} et ${F(6, 10)} &lt; ${F(7, 10)}`, 'Nora a lu la plus grande partie du livre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Trouve une fraction comprise entre ${T(3, 4)} et 1, puis une fraction comprise entre ${T(1, 3)} et ${T(1, 2)}.`,
        corr: cm1Redac('Exemples', { suite: [`${F(3, 4)} = ${F(6, 8)} et 1 = ${F(8, 8)} : ${F(7, 8)} convient.`, `${F(1, 3)} = ${F(4, 12)} et ${F(1, 2)} = ${F(6, 12)} : ${F(5, 12)} convient.`] }, 'On écrit les deux fractions avec un dénominateur plus grand pour « faire de la place » entre elles.') },
    ] },
  { titre: 'Additionner et soustraire des fractions', duree: '40 min',
    attendus: ['Additionner ou soustraire deux fractions de même dénominateur', 'Réduire au même dénominateur avant d\'additionner', 'Simplifier le résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...ops([[3, 11, 5, 11, [8, 11]], [7, 9, 2, 9, [5, 9]], [15, 8, 3, 8, [12, 8]]], '+') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...ops([[9, 5, 2, 5, [7, 5]], [11, 12, 7, 12, [4, 12]], [20, 7, 6, 7, [14, 7]]], '−') },
      { etoiles: 2, col: 1, consigne: 'Calcule (réduis d\'abord au même dénominateur).', ...ops([[1, 3, 5, 6, [7, 6, F(2, 6) + ' + ' + F(5, 6)]], [3, 4, 1, 12, [10, 12, F(9, 12) + ' + ' + F(1, 12)]], [2, 5, 7, 20, [15, 20, F(8, 20) + ' + ' + F(7, 20)]]], '+') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...ops([[5, 6, 1, 3, [3, 6, F(5, 6) + ' − ' + F(2, 6)]], [7, 4, 3, 8, [11, 8, F(14, 8) + ' − ' + F(3, 8)]], [9, 10, 2, 5, [5, 10, F(9, 10) + ' − ' + F(4, 10)]]], '−') },
      { etoiles: 2, col: 1, consigne: 'Calcule (écris l\'entier sous forme de fraction).',
        eleve: plListe([ligne('2 +', F(1, 3), '=', Fr), ligne('1 −', F(5, 9), '=', Fr), ligne(F(7, 4), '− 1 =', Fr), ligne('3 −', F(1, 2), '=', Fr)]),
        corr: plListe([ligne('2 +', F(1, 3), '=', F(6, 3), '+', F(1, 3), '=', R(F(7, 3))), ligne('1 −', F(5, 9), '=', R(F(4, 9))), ligne(F(7, 4), '− 1 =', R(F(3, 4))), ligne('3 −', F(1, 2), '=', R(F(5, 2)))]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe([ligne(F(2, 7), '+', Fr, '= 1'), ligne(F(1, 4), '+', Fr, '=', F(3, 4), '(sur 4)'), ligne(Fr, '−', F(1, 6), '=', F(1, 2), '(sur 6)')]),
        corr: plListe([ligne(F(2, 7), '+', R(F(5, 7)), '= 1'), ligne(F(1, 4), '+', R(F(2, 4)), '=', F(3, 4)), ligne(R(F(4, 6)), '−', F(1, 6), '=', F(1, 2))]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Calcule ${T(1, 2)} + ${T(1, 4)} + ${T(1, 8)}, puis simplifie si possible. Que manque-t-il pour obtenir 1 ?`,
        corr: cm1Redac('Somme', `${F(4, 8)} + ${F(2, 8)} + ${F(1, 8)} = ${F(7, 8)}`, `La somme vaut ${F(7, 8)} : il manque ${F(1, 8)} pour obtenir 1.`) },
    ] },
  { titre: 'Résoudre des problèmes avec des fractions', duree: '45 min',
    attendus: ['Calculer une fraction d\'une quantité', 'Additionner des fractions dans un problème', 'Trouver la part restante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`${T(3, 4)} de 20 = @`, 15], [`${T(2, 5)} de 35 = @`, 14], [`${T(5, 6)} de 42 = @`, 35], [`${T(7, 10)} de 3 = @`, '2,1']], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([[`${T(1, 4)} d\'une heure = @ min`, 15], [`${T(2, 3)} d\'une heure = @ min`, 40], [`${T(3, 5)} de 1 km = @ m`, 600], [`${T(3, 8)} de 1 kg = @ g`, 375]], 3) },
      { etoiles: 2, col: 1, consigne: 'Dans deux collèges, les élèves viennent à pied, en bus ou en voiture. Quelle fraction vient en voiture ?',
        eleve: plListe([ligne('À pied :', F(1, 4), '; en bus :', F(1, 2), '. En voiture :', Fr), ligne('À pied :', F(2, 5), '; en bus :', F(3, 10), '. En voiture :', Fr)]),
        corr: plListe([ligne('À pied :', F(1, 4), '; en bus :', F(1, 2), '. En voiture :', R(F(1, 4))), ligne('À pied :', F(2, 5), '; en bus :', F(3, 10), '. En voiture :', R(F(3, 10)))]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${T(1, 2)} + ${T(1, 3)} = ${T(2, 5)} :`, 'faux'], [`${T(3, 4)} de 100 € = 75 € :`, 'vrai'], [`${T(1, 3)} + ${T(1, 3)} + ${T(1, 3)} = 1 :`, 'vrai'], [`La moitié de ${T(1, 2)} est ${T(1, 4)} :`, 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un réservoir de 60 L est rempli aux ${T(3, 4)}. On utilise ${T(1, 3)} de sa contenance totale. Combien de litres reste-t-il ?`,
        corr: cm1Redac('Litres restants', { suite: [`${F(3, 4)} de 60 L = 45 L`, `${F(1, 3)} de 60 L = 20 L`, '45 − 20 = 25'] }, 'Il reste 25 L dans le réservoir.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Lina dépense ${T(2, 5)} de son argent de poche en livres et ${T(1, 4)} en sorties. Quelle fraction de son argent lui reste-t-il ? Elle avait 40 € : combien lui reste-t-il ?`,
        corr: cm1Redac('Fraction restante', `1 − ${F(2, 5)} − ${F(1, 4)} = ${F(20, 20)} − ${F(8, 20)} − ${F(5, 20)} = ${F(7, 20)}`, `Il lui reste les ${F(7, 20)} de son argent.`) + cm1Redac('Somme restante', `${F(7, 20)} de 40 € = 40 : 20 × 7 = 14 €`, 'Il lui reste 14 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un gâteau est coupé en 12 parts égales. Paul en mange ${T(1, 4)}, Léa ${T(1, 3)} et Sam ${T(1, 6)}. Reste-t-il du gâteau ? Si oui, combien de parts ?`,
        corr: cm1Redac('Parts mangées', `${F(3, 12)} + ${F(4, 12)} + ${F(2, 12)} = ${F(9, 12)}`, 'Ils ont mangé 9 parts sur 12 : il reste 3 parts.') },
    ] },
];
})();

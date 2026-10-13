/* ============================================================
   CM2 · Planches : Fractions : comparer et calculer (N6)
   Fractions égales ; comparer ; additionner et soustraire (même dénominateur, ou l'un multiple de
   l'autre) ; multiplier une fraction par un entier ; fractions usuelles et nombres décimaux.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), F = cm1Frac, C = plCase(), Fr = plFrac();
const { rmp, ch, chx } = P3;
const lt = '&lt;', gt = '&gt;';
PLANCHES['cm2|Fractions : comparer et calculer'] = [
  { titre: 'Fractions égales et comparaison', duree: '35 min',
    attendus: ['Trouver des fractions égales', 'Comparer deux fractions de même dénominateur', 'Comparer une fraction à 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour obtenir des fractions égales.',
        eleve: plListe([`${F(1, 2)} = ${Fr} (dénominateur 10)`, `${F(3, 4)} = ${Fr} (dénominateur 8)`, `${F(2, 3)} = ${Fr} (dénominateur 9)`]),
        corr: plListe([`${F(1, 2)} = ${R(F(5, 10))}`, `${F(3, 4)} = ${R(F(6, 8))}`, `${F(2, 3)} = ${R(F(6, 9))}`]) },
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`${F(3, 7)} ${C} ${F(5, 7)}`, `${F(9, 8)} ${C} 1`, `${F(4, 4)} ${C} 1`, `${F(2, 5)} ${C} ${F(4, 10)}`]),
        corr: plListe([`${F(3, 7)} ${R(lt)} ${F(5, 7)}`, `${F(9, 8)} ${R(gt)} 1`, `${F(4, 4)} ${R('=')} 1`, `${F(2, 5)} ${R('=')} ${F(4, 10)}`]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt; ou &gt; (pense aux fractions égales).',
        eleve: plListe([`${F(1, 2)} ${C} ${F(3, 4)}`, `${F(5, 6)} ${C} ${F(2, 3)}`, `${F(7, 10)} ${C} ${F(1, 2)}`]),
        corr: plListe([`${F(1, 2)} ${R(lt)} ${F(3, 4)}`, `${F(5, 6)} ${R(gt)} ${F(2, 3)}`, `${F(7, 10)} ${R(gt)} ${F(1, 2)}`]) },
      { etoiles: 3, cahier: true, consigne: `Lina a lu ${F(3, 5)} de son livre et Max ${F(7, 10)} du même livre. Qui en a lu le plus ?`,
        corr: cm1Redac('Même dénominateur', `${F(3, 5)} = ${F(6, 10)}`, `Lina a lu ${F(6, 10)} du livre.`) + cm1Redac('Comparaison', `${F(7, 10)} est plus grand que ${F(6, 10)}.`, 'Max en a lu le plus.') },
    ] },
  { titre: 'Additionner, soustraire, multiplier par un entier', duree: '35 min',
    attendus: ['Additionner et soustraire des fractions de même dénominateur', 'Additionner quand un dénominateur est multiple de l\'autre', 'Multiplier une fraction par un entier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe([`${F(2, 7)} + ${F(3, 7)} = ${Fr}`, `${F(8, 9)} − ${F(5, 9)} = ${Fr}`, `${F(1, 4)} + ${F(1, 4)} + ${F(1, 4)} = ${Fr}`]),
        corr: plListe([`${F(2, 7)} + ${F(3, 7)} = ${R(F(5, 7))}`, `${F(8, 9)} − ${F(5, 9)} = ${R(F(3, 9))}`, `${F(1, 4)} + ${F(1, 4)} + ${F(1, 4)} = ${R(F(3, 4))}`]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (transforme d\'abord une des fractions).',
        eleve: plListe([`${F(1, 2)} + ${F(1, 4)} = ${Fr}`, `${F(3, 5)} + ${F(1, 10)} = ${Fr}`, `${F(5, 6)} − ${F(1, 3)} = ${Fr}`]),
        corr: plListe([`${F(2, 4)} + ${F(1, 4)} = ${R(F(3, 4))}`, `${F(6, 10)} + ${F(1, 10)} = ${R(F(7, 10))}`, `${F(5, 6)} − ${F(2, 6)} = ${R(F(3, 6))}`]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        eleve: plListe([`3 × ${F(2, 7)} = ${Fr}`, `4 × ${F(3, 10)} = ${Fr}`, `5 × ${F(1, 5)} = ${B(2)}`]),
        corr: plListe([`3 × ${F(2, 7)} = ${R(F(6, 7))}`, `4 × ${F(3, 10)} = ${R(F(12, 10))}`, `5 × ${F(1, 5)} = ${R(1)}`]) },
      { etoiles: 3, cahier: true, consigne: `Pour un gâteau, il faut ${F(1, 2)} L de lait et ${F(1, 4)} L de crème. Quelle quantité de liquide faut-il en tout ? Et pour 3 gâteaux ?`,
        corr: cm1Redac('Pour un gâteau', `${F(1, 2)} + ${F(1, 4)} = ${F(2, 4)} + ${F(1, 4)} = ${F(3, 4)}`, `Il faut ${F(3, 4)} L de liquide.`) + cm1Redac('Pour 3 gâteaux', `3 × ${F(3, 4)} = ${F(9, 4)}`, `Il faut ${F(9, 4)} L, soit 2 L et ${F(1, 4)} L.`) },
    ] },
  { titre: 'Fractions usuelles et nombres décimaux', duree: '30 min',
    attendus: ['Connaître les égalités usuelles (un demi, un quart, trois quarts…)', 'Passer d\'une fraction décimale à un nombre décimal', 'Utiliser ces égalités pour calculer'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en nombre décimal.',
        ...rmp([[`${F(1, 2)} = @`, '0,5'], [`${F(1, 4)} = @`, '0,25'], [`${F(3, 4)} = @`, '0,75'], [`${F(1, 10)} = @`, '0,1']]) },
      { etoiles: 2, col: 1, consigne: 'Écris en nombre décimal.',
        ...rmp([[`${F(3, 2)} = @`, '1,5'], [`${F(5, 4)} = @`, '1,25'], [`${F(7, 5)} = @`, '1,4'], [`${F(9, 100)} = @`, '0,09']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le nombre égal à la fraction.',
        ...chx([[`${F(1, 5)} :`, '0,2', '0,5 · 0,2 · 1,5'], [`${F(5, 2)} :`, '2,5', '5,2 · 0,52 · 2,5']]) },
      { etoiles: 3, cahier: true, consigne: `Un sac de riz de 2 kg est entamé : il en reste ${F(3, 4)}. Combien de grammes de riz reste-t-il ? (1 kg = 1 000 g)`,
        corr: cm1Redac('Masse en grammes', '2 kg = 2 000 g', 'Le sac contenait 2 000 g.') + cm1Redac('Masse restante', { suite: ['2 000 : 4 = 500', '500 × 3 = 1 500'] }, 'Il reste 1 500 g de riz, soit 1,5 kg.') },
    ] },
];
})();

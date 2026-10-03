/* ============================================================
   6e · Planches : Fractions, nombres et partage (N2)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`);
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:3px;">${h}<span>${t}</span></span>`;
const FIGS = [[cm1Disque(6, 5, { taille: 70 }), 5, 6], [cm1Bande(4, 3, { largeur: 120 }), 3, 4], [cm1Quad(4, 3, [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1]], { k: 16, c: '#7A4FC0' }), 7, 12]];
PLANCHES['6e|Fractions : nombres et partage'] = [
  { titre: 'Écriture fractionnaire et égalités de fractions', duree: '40 min',
    attendus: ['Utiliser une fraction pour exprimer un partage, un quotient', 'Repérer une fraction sur une demi-droite graduée', 'Reconnaître et produire des fractions égales, simplifier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quelle fraction de chaque figure est coloriée ?',
        eleve: plGrille(FIGS.map(([f]) => col(f, Fr)), 3), corr: plGrille(FIGS.map(([f, a, b]) => col(f, R(F(a, b)))), 3) },
      { etoiles: 1, col: 1, consigne: `Le quotient de 7 par 4 est le nombre ${T(7, 4)} : c'est le nombre qui, multiplié par 4, donne 7. Complète.`,
        eleve: plListe([ligne('4 ×', Fr, '= 7'), ligne('5 ×', Fr, '= 2'), ligne('3 ×', Fr, '= 10')]),
        corr: plListe([ligne('4 ×', R(F(7, 4)), '= 7'), ligne('5 ×', R(F(2, 5)), '= 2'), ligne('3 ×', R(F(10, 3)), '= 10')]) },
      { etoiles: 2, consigne: 'L\'unité est partagée en 4. Quelle fraction repère chaque point ?',
        eleve: cm1Graduation(3, 4, [[0.75, 'A', '#E35D3A'], [1.5, 'B', '#2EA8C9'], [2.25, 'C', '#2E9C6A']], { unite: 150 }) + plGrille(['A : ' + Fr, 'B : ' + Fr, 'C : ' + Fr], 3),
        corr: cm1Graduation(3, 4, [[0.75, 'A', '#E35D3A'], [1.5, 'B', '#2EA8C9'], [2.25, 'C', '#2E9C6A']], { unite: 150 }) + plGrille(['A : ' + R(F(3, 4)), 'B : ' + R(F(6, 4)), 'C : ' + R(F(9, 4))], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète les égalités.',
        eleve: plListe([ligne(F(2, 3), '=', Fr, '(dénominateur 12)'), ligne(F(15, 20), '=', Fr, '(numérateur 3)'), ligne(F(7, 5), '=', Fr, '(numérateur 21)'), ligne('1 =', Fr, '(dénominateur 9)')]),
        corr: plListe([ligne(F(2, 3), '=', R(F(8, 12))), ligne(F(15, 20), '=', R(F(3, 4))), ligne(F(7, 5), '=', R(F(21, 15))), ligne('1 =', R(F(9, 9)))]) },
      { etoiles: 2, col: 1, consigne: 'Simplifie le plus possible.',
        eleve: plListe([ligne(F(12, 18), '=', Fr), ligne(F(25, 100), '=', Fr), ligne(F(14, 21), '=', Fr), ligne(F(30, 45), '=', Fr)]),
        corr: plListe([ligne(F(12, 18), '=', R(F(2, 3))), ligne(F(25, 100), '=', R(F(1, 4))), ligne(F(14, 21), '=', R(F(2, 3))), ligne(F(30, 45), '=', R(F(2, 3)))]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Léa affirme : « ${T(3, 4)} = ${T(6, 8)} = ${T(9, 12)} ». A-t-elle raison ? Justifie.`,
        corr: cm1Redac('Fractions égales', { suite: [`${F(3, 4)} = ${F('3 × 2', '4 × 2')} = ${F(6, 8)}`, `${F(3, 4)} = ${F('3 × 3', '4 × 3')} = ${F(9, 12)}`] }, 'Léa a raison : on multiplie le numérateur et le dénominateur par le même nombre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Encadre ${T(17, 5)} entre deux nombres entiers consécutifs. Explique.`,
        corr: cm1Redac('Encadrement', { suite: [`${F(17, 5)} = ${F(15, 5)} + ${F(2, 5)} = 3 + ${F(2, 5)}`, `3 &lt; ${F(17, 5)} &lt; 4`] }, `${F(17, 5)} est compris entre 3 et 4, car ${F(2, 5)} est plus petit que 1.`) },
    ] },
  { titre: 'Proportions et pourcentages', duree: '40 min',
    attendus: ['Exprimer une proportion par une fraction', 'Passer d\'une fraction à un pourcentage', 'Calculer un pourcentage simple d\'une quantité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en pourcentage.',
        eleve: plListe([`${F(1, 2)} = ${B()} %`, `${F(1, 4)} = ${B()} %`, `${F(3, 4)} = ${B()} %`, `${F(1, 10)} = ${B()} %`, `${F(3, 5)} = ${B()} %`]),
        corr: plListe([`${F(1, 2)} = ${R(50)} %`, `${F(1, 4)} = ${R(25)} %`, `${F(3, 4)} = ${R(75)} %`, `${F(1, 10)} = ${R(10)} %`, `${F(3, 5)} = ${R(60)} %`]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['50 % de 60 = ' + B(), '10 % de 250 = ' + B(), '25 % de 80 = ' + B(), '75 % de 40 = ' + B(), '20 % de 35 = ' + B()]),
        corr: plListe(['50 % de 60 = ' + R(30), '10 % de 250 = ' + R(25), '25 % de 80 = ' + R(20), '75 % de 40 = ' + R(30), '20 % de 35 = ' + R(7)]) },
      { etoiles: 2, consigne: 'Quelle proportion de chaque figure est coloriée ? Donne la fraction, puis le pourcentage.',
        eleve: plGrille([[cm1Disque(4, 1, { taille: 66 })], [cm1Bande(10, 3, { largeur: 150 })], [cm1Bande(5, 2, { largeur: 130 })]].map(([f]) => col(f, `${Fr} = ${B()} %`)), 3),
        corr: plGrille([[cm1Disque(4, 1, { taille: 66 }), 1, 4, 25], [cm1Bande(10, 3, { largeur: 150 }), 3, 10, 30], [cm1Bande(5, 2, { largeur: 130 }), 2, 5, 40]].map(([f, a, b, p]) => col(f, `${R(F(a, b))} = ${R(p)} %`)), 3) },
      { etoiles: 2, col: 1, consigne: 'Dans une classe de 24 élèves, 9 sont des filles.',
        eleve: plListe([ligne('Proportion de filles :', Fr), ligne('Fraction simplifiée :', Fr), ligne('Proportion de garçons :', Fr)]),
        corr: plListe([ligne('Proportion de filles :', R(F(9, 24))), ligne('Fraction simplifiée :', R(F(3, 8))), ligne('Proportion de garçons :', R(F(15, 24)))]) },
      { etoiles: 2, col: 1, consigne: 'Compare les proportions. Entoure.',
        eleve: plListe(['Sac A : 3 boules vertes sur 12 ; sac B : 5 vertes sur 20. Même proportion de vertes ? <b>oui · non</b>', 'Club A : 6 filles sur 10 ; club B : 13 filles sur 25. Plus grande proportion de filles : <b>A · B</b>']),
        corr: plListe(['Sac A : 3 boules vertes sur 12 ; sac B : 5 vertes sur 20. Même proportion de vertes ? ' + plEntoure('oui') + ` (${F(1, 4)} dans les deux cas)`, 'Club A : 6 filles sur 10 ; club B : 13 filles sur 25. Plus grande proportion de filles : ' + plEntoure('A') + ' (60 % contre 52 %)']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un pull coûte 40 €. Pendant les soldes, son prix baisse de 25 %. Quel est son nouveau prix ?',
        corr: cm1Redac('Montant de la réduction', '25 % de 40 € = 40 € ÷ 4 = 10 €', 'La réduction est de 10 €.') + cm1Redac('Nouveau prix', '40 € − 10 € = 30 €', 'Le pull coûte 30 € pendant les soldes.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un collège de 600 élèves, 45 % sont demi-pensionnaires. Combien d\'élèves sont demi-pensionnaires ?',
        corr: cm1Redac('Nombre de demi-pensionnaires', { suite: ['10 % de 600 = 60', '5 % de 600 = 30', '45 % = 4 × 10 % + 5 % : 4 × 60 + 30 = 270'] }, '270 élèves sont demi-pensionnaires.') },
    ] },
];
})();

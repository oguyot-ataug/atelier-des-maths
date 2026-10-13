/* ============================================================
   CM2 · Planches : Fractions (N2)
   Une fraction pour partager et pour mesurer ; fractions supérieures à 1 (entier + fraction) ;
   fractions sur une demi-droite graduée ; fraction d'une quantité.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac();
const { rmp, ch, chx } = P3;
const bande = (n, k) => cm1Bande(n, k, { largeur: 170 });
PLANCHES['cm2|Fractions'] = [
  { titre: 'Partager et mesurer avec des fractions', duree: '30 min',
    attendus: ['Écrire la fraction qui correspond à un partage', 'Lire et écrire une fraction', 'Utiliser une fraction pour exprimer une mesure'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'L\'unité est la bande entière. Écris la fraction coloriée.',
        eleve: plGrille([[4, 3], [8, 5], [6, 1]].map(([n, k]) => `${bande(n, k)} ${Fr}`), 1),
        corr: plGrille([[4, 3], [8, 5], [6, 1]].map(([n, k]) => `${bande(n, k)} ${R(F(k, n))}`), 1) },
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        eleve: plListe([`trois cinquièmes : ${Fr}`, `sept dixièmes : ${Fr}`, `onze quarts : ${Fr}`]),
        corr: plListe([`trois cinquièmes : ${R(F(3, 5))}`, `sept dixièmes : ${R(F(7, 10))}`, `onze quarts : ${R(F(11, 4))}`]) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...rmp([[`${F(2, 3)} : @`, 'deux tiers'], [`${F(5, 8)} : @`, 'cinq huitièmes'], [`${F(9, 100)} : @`, 'neuf centièmes']], 7) },
      { etoiles: 2, col: 1, consigne: 'Une bande unité mesure 12 cm. Complète.',
        ...rmp([[`${F(1, 4)} de la bande mesure @ cm`, 3], [`${F(3, 4)} de la bande mesurent @ cm`, 9], [`${F(5, 6)} de la bande mesurent @ cm`, 10]]) },
      { etoiles: 3, cahier: true, consigne: `Une tablette de chocolat a 24 carrés. Léa en mange ${F(1, 4)} et Tom ${F(1, 3)}. Combien de carrés chacun a-t-il mangés ? Combien en reste-t-il ?`,
        corr: cm1Redac('Carrés de Léa', `${F(1, 4)} de 24 = 24 : 4 = 6`, 'Léa a mangé 6 carrés.') + cm1Redac('Carrés de Tom', `${F(1, 3)} de 24 = 24 : 3 = 8`, 'Tom a mangé 8 carrés.') + cm1Redac('Carrés restants', { suite: ['6 + 8 = 14', '24 − 14 = 10'] }, 'Il reste 10 carrés.') },
    ] },
  { titre: 'Fractions supérieures à 1 et demi-droite graduée', duree: '35 min',
    attendus: ['Reconnaître une fraction plus grande que 1', 'Écrire une fraction comme un entier plus une fraction', 'Placer une fraction sur une demi-droite graduée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([[`${F(7, 4)} est…`, 'plus grand que 1', 'plus petit que 1 · égal à 1 · plus grand que 1'], [`${F(5, 5)} est…`, 'égal à 1', 'plus petit que 1 · égal à 1 · plus grand que 1'], [`${F(3, 8)} est…`, 'plus petit que 1', 'plus petit que 1 · égal à 1 · plus grand que 1']]) },
      { etoiles: 2, col: 1, consigne: 'Écris sous la forme d\'un entier plus une fraction plus petite que 1.',
        eleve: plListe([`${F(7, 4)} = ${B(2)} + ${Fr}`, `${F(11, 3)} = ${B(2)} + ${Fr}`, `${F(13, 5)} = ${B(2)} + ${Fr}`]),
        corr: plListe([`${F(7, 4)} = ${R(1)} + ${R(F(3, 4))}`, `${F(11, 3)} = ${R(3)} + ${R(F(2, 3))}`, `${F(13, 5)} = ${R(2)} + ${R(F(3, 5))}`]) },
      { etoiles: 2, consigne: 'L\'unité est partagée en 4. Écris la fraction de chaque point.',
        eleve: cm1Graduation(3, 4, [[0.75, 'A'], [1.5, 'B'], [2.25, 'C']], { unite: 140 }) + plGrille([`A : ${Fr}`, `B : ${Fr}`, `C : ${Fr}`], 3),
        corr: cm1Graduation(3, 4, [[0.75, 'A'], [1.5, 'B'], [2.25, 'C']], { unite: 140 }) + plGrille([`A : ${R(F(3, 4))}`, `B : ${R(F(6, 4))}`, `C : ${R(F(9, 4))}`], 3) },
      { etoiles: 3, cahier: true, consigne: `Une course mesure 1 km. Ali a parcouru ${F(5, 8)} de la course et Zoé ${F(3, 4)}. Qui est le plus avancé ? Explique.`,
        corr: cm1Redac('Même partage', `${F(3, 4)} = ${F(6, 8)}`, `Zoé a parcouru ${F(6, 8)} de la course.`) + cm1Redac('Comparaison', `${F(6, 8)} est plus grand que ${F(5, 8)}.`, 'Zoé est la plus avancée.') },
    ] },
  { titre: 'Fraction d\'une quantité', duree: '30 min',
    attendus: ['Calculer une fraction d\'une quantité', 'Résoudre un problème avec une fraction d\'une quantité', 'Rédiger la réponse'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`${F(1, 2)} de 30 = @`, 15], [`${F(1, 5)} de 40 = @`, 8], [`${F(1, 10)} de 70 = @`, 7], [`${F(1, 4)} de 100 = @`, 25]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([[`${F(3, 4)} de 20 = @`, 15], [`${F(2, 5)} de 35 = @`, 14], [`${F(5, 6)} de 42 = @`, 35], [`${F(7, 10)} de 200 = @`, 140]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${F(1, 2)} de 50 € = 25 €`, 'vrai'], [`${F(3, 4)} d'une heure = 30 minutes`, 'faux'], [`${F(1, 3)} de 1 m = ${F(2, 6)} de 1 m`, 'vrai']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: `Dans une classe de 28 élèves, ${F(3, 7)} des élèves mangent à la cantine. Combien d'élèves mangent à la cantine ? Combien n'y mangent pas ?`,
        corr: cm1Redac('Élèves à la cantine', { suite: ['28 : 7 = 4', '4 × 3 = 12'] }, '12 élèves mangent à la cantine.') + cm1Redac('Élèves qui n\'y mangent pas', '28 − 12 = 16', '16 élèves ne mangent pas à la cantine.') },
      { etoiles: 3, cahier: true, consigne: `Un vélo coûte 240 €. Les parents de Sam paient ${F(3, 4)} du prix ; Sam paie le reste avec ses économies. Combien Sam doit-il payer ?`,
        corr: cm1Redac('Part des parents', { suite: ['240 : 4 = 60', '60 × 3 = 180'] }, 'Les parents paient 180 €.') + cm1Redac('Part de Sam', '240 − 180 = 60', 'Sam doit payer 60 €.') },
    ] },
];
})();

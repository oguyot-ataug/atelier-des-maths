/* ============================================================
   CE2 · Planches : Les longueurs (M2)
   m, dm, cm, mm, km ; relations entre unités ; conversions SANS tableau de conversion, en s'appuyant
   sur les relations (215 cm = 2 m 1 dm 5 cm) ; choisir l'unité ; comparer ; mesurer et tracer ;
   estimer. Pas d'écriture à virgule pour les longueurs au CE2.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
PLANCHES['ce2|Les longueurs'] = [
  { titre: 'Les unités de longueur', duree: '25 min',
    attendus: ['Connaître km, m, dm, cm, mm et leurs symboles', 'Choisir l\'unité qui convient', 'Estimer une longueur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'unité qui convient.',
        ...chx([['La longueur d\'un crayon : 15…', 'cm', 'mm · cm · m · km'], ['La distance entre deux villes : 40…', 'km', 'mm · cm · m · km'], ['L\'épaisseur d\'une pièce : 2…', 'mm', 'mm · cm · m · km'], ['La hauteur d\'une porte : 2…', 'm', 'mm · cm · m · km']]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 m = @ cm', 100], ['1 cm = @ mm', 10], ['1 km = @ m', '1 000'], ['1 m = @ dm', 10], ['1 dm = @ cm', 10]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la longueur la plus proche de la réalité.',
        ...chx([['La longueur d\'une salle de classe', '9 m', '9 cm · 9 m · 9 km'], ['La taille d\'un enfant de CE2', '130 cm', '13 cm · 130 cm · 130 m'], ['La longueur d\'une fourmi', '5 mm', '5 mm · 5 cm · 5 dm']]) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 km = @ m', '1 000'], ['1 m = @ cm', 100], ['1 cm = @ mm', 10]], 3) },
      { etoiles: 2, consigne: 'Entoure l\'unité qui convient.', ...P3.chx2([['Une fourmi mesure 5…', 'mm', 'mm · cm · m'], ['De Paris à Lyon : 460…', 'km', 'm · km'], ['Une table mesure 1…', 'm', 'mm · cm · m'], ['Un crayon mesure 15…', 'cm', 'mm · cm · m']]) },
    ] },
  { titre: 'Changer d\'unité', duree: '30 min',
    attendus: ['Convertir en s\'appuyant sur les relations entre unités', 'Écrire une longueur avec plusieurs unités', 'Comparer des longueurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['3 m = @ cm', 300], ['5 cm = @ mm', 50], ['2 km = @ m', '2 000'], ['40 mm = @ cm', 4]], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['2 m 45 cm = @ cm', 245], ['6 cm 3 mm = @ mm', 63], ['1 km 500 m = @ m', '1 500'], ['315 cm = @ m @ cm', 3, 15]], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète avec <, > ou =.',
        eleve: plListe(['2 m ' + plCase() + ' 180 cm', '45 mm ' + plCase() + ' 5 cm', '1 km ' + plCase() + ' 1 000 m', '3 m 5 cm ' + plCase() + ' 350 cm']),
        corr: plListe(['2 m ' + P3.R('>') + ' 180 cm', '45 mm ' + P3.R('<') + ' 5 cm', '1 km ' + P3.R('=') + ' 1 000 m', '3 m 5 cm ' + P3.R('<') + ' 350 cm']) },
      { etoiles: 3, cahier: true, consigne: 'Pour aller à l\'école, Hugo marche 750 m, puis prend le bus sur 2 km. Quelle distance parcourt-il en tout ? Écris-la en mètres.',
        corr: cm1Redac('Distance du bus', '2 km = 2 000 m', 'Le bus parcourt 2 000 m.') + cm1Redac('Distance totale', '750 m + 2 000 m = 2 750 m', 'Hugo parcourt 2 750 m, soit 2 km 750 m.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['3 m = @ cm', 300], ['4 km = @ m', '4 000'], ['50 mm = @ cm', 5], ['2 m 30 cm = @ cm', 230]], 3) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([['1 m − 35 cm = @ cm', 65], ['1 km − 400 m = @ m', 600], ['1 m − 80 cm = @ cm', 20], ['1 km − 750 m = @ m', 250]], 3) },
    ] },
  { titre: 'Mesurer et tracer', duree: '25 min',
    attendus: ['Mesurer un segment au millimètre près', 'Tracer un segment de longueur donnée'],
    exos: [
      { etoiles: 1, consigne: 'Lis la longueur de chaque segment posé sur la règle.',
        eleve: plGrille([cm1RegleGraduee(60, 'AB', { largeur: '260px' }) + 'AB : ' + P3.B(5), cm1RegleGraduee(43, 'CD', { largeur: '260px' }) + 'CD : ' + P3.B(5)], 2),
        corr: plGrille([cm1RegleGraduee(60, 'AB', { largeur: '260px' }) + 'AB : ' + P3.R('6 cm'), cm1RegleGraduee(43, 'CD', { largeur: '260px' }) + 'CD : ' + P3.R('4 cm 3 mm')], 2) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Trace trois segments : le premier de 7 cm, le deuxième de 5 cm 4 mm, le troisième de 82 mm.',
        corr: cm1Redac('Le troisième segment', '82 mm = 8 cm 2 mm', 'On place le 0 de la règle au début du segment, et on s\'arrête 2 mm après le 8.') },
      { etoiles: 2, col: 1, consigne: 'Range ces longueurs de la plus courte à la plus longue.',
        ...rmp([['7 cm · 65 mm · 1 dm · 9 cm 5 mm : @', '65 mm < 7 cm < 9 cm 5 mm < 1 dm']], 14) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['5 cm 4 mm = @ mm', 54], ['82 mm = @ cm @ mm', 8, 2], ['10 cm = @ mm', 100]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande longueur.', ...P3.chx([['', '9 cm', '85 mm · 9 cm'], ['', '1 m', '95 cm · 1 m'], ['', '2 km', '2 km · 1 900 m']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['3 cm 5 mm + 2 cm 5 mm = @ cm', 6], ['45 mm + 15 mm = @ cm', 6]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['Un trait de 12 cm. J\'en efface 35 mm. Il reste @ mm.', 85]], 2) },
    ] },
];
})();

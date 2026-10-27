/* ============================================================
   CM2 · Planches : Longueurs, masses, contenances (M1)
   Unités et préfixes ; convertir en raisonnant (sans tableau de conversion) ; estimer ;
   calculer avec des mesures.
   ============================================================ */
(() => {
const R = v => plRep(String(v)), C = plCase();
const { rmp, ch, chx } = P3;
const lt = '&lt;', gt = '&gt;';
PLANCHES['cm2|Longueurs, masses, contenances'] = [
  { titre: 'Unités et conversions', duree: '35 min',
    attendus: ['Connaître le sens des préfixes kilo-, centi-, milli-', 'Convertir en raisonnant (1 km = 1 000 m…)', 'Exprimer une mesure avec une autre unité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (le préfixe dit combien de fois l\'unité).',
        ...rmp([['kilo- : @ fois l\'unité', '1 000'], ['centi- : la @ partie de l\'unité', 'centième'], ['milli- : la @ partie de l\'unité', 'millième']], 4) },
      { etoiles: 1, col: 1, consigne: 'Longueurs : complète.',
        ...rmp([['3 km = @ m', '3 000'], ['2 m = @ cm', 200], ['45 mm = @ cm', '4,5'], ['1,5 km = @ m', '1 500']]) },
      { etoiles: 2, col: 1, consigne: 'Masses : complète.',
        ...rmp([['4 kg = @ g', '4 000'], ['2 500 g = @ kg', '2,5'], ['3 t = @ kg', '3 000'], ['1 g = @ mg', '1 000']]) },
      { etoiles: 2, col: 1, consigne: 'Contenances : complète.',
        ...rmp([['2 L = @ cL', 200], ['1 L = @ mL', '1 000'], ['50 cL = @ L', '0,5'], ['3 hL = @ L', 300]]) },
      { etoiles: 3, cahier: true, consigne: 'Un sac contient 2,5 kg de farine. On en utilise 750 g pour un gâteau. Quelle masse de farine reste-t-il ?',
        corr: cm1Redac('Conversion', '2,5 kg = 2 500 g', 'Le sac contient 2 500 g de farine.') + cm1Redac('Masse restante', '2 500 − 750 = 1 750', 'Il reste 1 750 g de farine, c\'est-à-dire 1,75 kg.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 km = @ m', '1 000'], ['1 m = @ mm', '1 000'], ['1 kg = @ g', '1 000'], ['1 L = @ mL', '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Convertis.', ...P3.rmp([['3,5 km = @ m', '3 500'], ['250 cL = @ L', '2,5'], ['1 200 g = @ kg', '1,2']], 3) },
      { etoiles: 2, col: 1, consigne: 'Convertis.', ...P3.rmp([['2 t = @ kg', '2 000'], ['45 mm = @ cm', '4,5'], ['0,75 L = @ cL', 75]], 3) },
    ] },
  { titre: 'Estimer et comparer des mesures', duree: '30 min',
    attendus: ['Choisir l\'unité qui convient', 'Estimer un ordre de grandeur', 'Comparer des mesures exprimées dans des unités différentes'],
    exos: [
      { etoiles: 1, consigne: 'Entoure la mesure qui convient.',
        ...chx([['Hauteur d\'une porte :', '2 m', '2 cm · 2 m · 2 km'], ['Masse d\'une pomme :', '150 g', '15 g · 150 g · 15 kg'], ['Contenance d\'une baignoire :', '150 L', '15 cL · 1,5 L · 150 L'], ['Longueur d\'un crayon :', '15 cm', '15 mm · 15 cm · 15 m'], ['Masse d\'un éléphant :', '5 t', '50 kg · 500 kg · 5 t'], ['Contenance d\'une cuillère à soupe :', '15 mL', '15 mL · 15 cL · 15 L']]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`1,5 km ${C} 1 500 m`, `30 cL ${C} 0,5 L`, `2 kg ${C} 1 990 g`, `80 mm ${C} 8 cm`]),
        corr: plListe([`1,5 km ${R('=')} 1 500 m`, `30 cL ${R(lt)} 0,5 L`, `2 kg ${R(gt)} 1 990 g`, `80 mm ${R('=')} 8 cm`]) },
      { etoiles: 2, col: 1, consigne: 'Range du plus petit au plus grand.',
        ...rmp([['1,2 kg ; 900 g ; 1 050 g : @', '900 g ; 1 050 g ; 1,2 kg'], ['75 cL ; 1 L ; 0,7 L : @', '0,7 L ; 75 cL ; 1 L']], 9) },
      { etoiles: 3, cahier: true, consigne: 'Un camion peut transporter 3 t. Une caisse pèse 75 kg. Combien de caisses le camion peut-il transporter au maximum ?',
        corr: cm1Redac('Conversion', '3 t = 3 000 kg', 'Le camion transporte au plus 3 000 kg.') + cm1Redac('Nombre de caisses', '3 000 : 75 = 40', 'Le camion peut transporter 40 caisses au maximum.') },
      { etoiles: 1, col: 1, consigne: 'Entoure la mesure qui convient.', ...P3.chx([['la masse d\'une voiture :', '1,2 t', '1,2 kg · 1,2 t'], ['la contenance d\'une tasse :', '25 cL', '25 cL · 25 L'], ['la hauteur d\'une porte :', '2,10 m', '2,10 m · 21 m']]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec <, > ou =.', ...P3.rmp([['1,5 km @ 1 050 m', '>'], ['300 g @ 0,3 kg', '='], ['80 cL @ 1 L', '<']], 1) },
      { etoiles: 3, col: 1, consigne: 'Entoure la masse la plus grande.', ...P3.chx([['', '2 kg 600 g', '2,5 kg · 2 400 g · 2 kg 600 g']]) },
    ] },
  { titre: 'Calculer avec des mesures', duree: '35 min',
    attendus: ['Additionner et soustraire des mesures', 'Résoudre un problème avec des mesures', 'Convertir pour calculer dans la même unité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule (convertis d\'abord dans la même unité).',
        ...rmp([['1 m + 25 cm = @ cm', 125], ['2 kg + 300 g = @ g', '2 300'], ['1 L − 25 cL = @ cL', 75]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une bouteille contient 1,5 L de jus. On remplit des verres de 20 cL. Combien de verres pleins peut-on servir ?',
        corr: cm1Redac('Conversion', '1,5 L = 150 cL', 'La bouteille contient 150 cL.') + cm1Redac('Nombre de verres', '150 = 20 × 7 + 10', 'On peut servir 7 verres pleins (il reste 10 cL).') },
      { etoiles: 2, cahier: true, consigne: 'Un marathon mesure 42,195 km. Lina a déjà parcouru 28 500 m. Quelle distance lui reste-t-il à parcourir ?',
        corr: cm1Redac('Conversion', '28 500 m = 28,5 km', 'Lina a parcouru 28,5 km.') + cm1Redac('Distance restante', '42,195 − 28,5 = 13,695', 'Il lui reste 13,695 km à parcourir.') },
      { etoiles: 3, cahier: true, consigne: 'Une recette pour 4 personnes demande 250 g de farine. Quelle masse de farine faut-il pour 12 personnes ? Donne la réponse en kilogrammes.',
        corr: cm1Redac('Nombre de fois 4 personnes', '12 : 4 = 3', '12 personnes, c\'est 3 fois plus que 4 personnes.') + cm1Redac('Masse de farine', '250 × 3 = 750', 'Il faut 750 g de farine, c\'est-à-dire 0,75 kg.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['1 km − 350 m = @ m', 650], ['2 kg − 750 g = @ g', '1 250'], ['1 L − 33 cL = @ cL', 67], ['5 m + 45 cm = @ cm', 545]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['10 verres de 20 cL : @ L', 2], ['8 bouteilles de 1,5 L : @ L', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['3 fois 250 g : @ g', 750], ['la moitié de 1,5 kg : @ g', 750]], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de verres de 25 cL dans 1 L ? Entoure.', ...P3.chx([['', '4', '4 · 25 · 40']]) },
    ] },
];
})();

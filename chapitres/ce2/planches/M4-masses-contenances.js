/* ============================================================
   CE2 · Planches : Masses et contenances (M4)
   g, kg, t ; 1 kg = 1 000 g ; 1 t = 1 000 kg ; comparer avec une balance ; estimer. Contenances :
   L, dL, cL ; 1 L = 10 dL = 100 cL. Sans écriture à virgule ni tableau de conversion.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
PLANCHES['ce2|Masses et contenances'] = [
  { titre: 'Les unités de masse', duree: '25 min',
    attendus: ['Connaître g, kg, t', 'Savoir que 1 kg = 1 000 g et 1 t = 1 000 kg', 'Choisir l\'unité qui convient'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'unité qui convient.',
        ...chx([['Un éléphant : 5…', 't', 'g · kg · t'], ['Une pomme : 150…', 'g', 'g · kg · t'], ['Un enfant de 8 ans : 25…', 'kg', 'g · kg · t'], ['Un camion chargé : 12…', 't', 'g · kg · t']]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 kg = @ g', '1 000'], ['3 kg = @ g', '3 000'], ['2 t = @ kg', '2 000'], ['5 462 g = @ kg @ g', 5, 462]], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète avec <, > ou =.',
        eleve: plListe(['1 kg ' + plCase() + ' 900 g', '2 500 g ' + plCase() + ' 3 kg', '1 t ' + plCase() + ' 1 000 kg', '4 kg 50 g ' + plCase() + ' 4 500 g']),
        corr: plListe(['1 kg ' + P3.R('>') + ' 900 g', '2 500 g ' + P3.R('<') + ' 3 kg', '1 t ' + P3.R('=') + ' 1 000 kg', '4 kg 50 g ' + P3.R('<') + ' 4 500 g']) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 kg = @ g', '1 000'], ['1 t = @ kg', '1 000'], ['3 kg = @ g', '3 000'], ['2 500 g = @ kg @ g', 2, 500]], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure la masse qui convient.', ...P3.chx([['un éléphant :', '5 t', '5 kg · 5 t'], ['une plume :', '1 g', '1 g · 1 kg'], ['un dictionnaire :', '1 kg', '1 g · 1 kg']]) },
      { etoiles: 2, col: 1, consigne: 'Range de la plus légère à la plus lourde.', ...P3.rmp([['800 g · 1 kg · 750 g · 2 kg : @', '750 g < 800 g < 1 kg < 2 kg']], 10) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 kg − 300 g = @ g', 700], ['500 g + 500 g = @ kg', 1]], 3) },
    ] },
  { titre: 'Peser avec une balance', duree: '25 min',
    attendus: ['Lire une pesée sur une balance à plateaux', 'Résoudre un problème de masses'],
    exos: [
      { etoiles: 1, consigne: 'La balance est en équilibre. Quelle est la masse de chaque objet ?',
        eleve: plGrille([cm1Balance('melon', ['1 kg', '200 g', '100 g']) + '<br>' + P3.B(6), cm1Balance('livre', ['500 g', '200 g', '50 g'], { coul: '#E9A99B' }) + '<br>' + P3.B(6)], 2),
        corr: plGrille([cm1Balance('melon', ['1 kg', '200 g', '100 g']) + '<br>' + P3.R('1 kg 300 g'), cm1Balance('livre', ['500 g', '200 g', '50 g'], { coul: '#E9A99B' }) + '<br>' + P3.R('750 g')], 2) },
      { etoiles: 2, cahier: true, consigne: 'Maman achète 2 kg de pommes et 750 g de raisin. Quelle est la masse de ses fruits, en grammes ?',
        corr: cm1Redac('Masse des pommes', '2 kg = 2 000 g', 'Les pommes pèsent 2 000 g.') + cm1Redac('Masse totale', '2 000 g + 750 g = 2 750 g', 'Les fruits pèsent 2 750 g, soit 2 kg 750 g.') },
      { etoiles: 3, cahier: true, consigne: 'Un camion vide pèse 3 t. On le charge de 1 500 kg de sable. Peut-il passer sur un pont limité à 5 t ?',
        corr: cm1Redac('Masse du camion vide', '3 t = 3 000 kg', 'Le camion vide pèse 3 000 kg.') + cm1Redac('Masse du camion chargé', '3 000 kg + 1 500 kg = 4 500 kg', 'Le camion chargé pèse 4 500 kg, moins que 5 000 kg : il peut passer.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['2 kg + 750 g = @ g', '2 750'], ['3 t + 1 500 kg = @ kg', '4 500']], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus lourd.', ...P3.chx([['', '1 kg', '1 kg · 900 g'], ['', '2 t', '2 t · 1 900 kg']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['4 paquets de 250 g : @ g', '1 000'], ['soit @ kg', 1]], 3) },
    ] },
  { titre: 'Les contenances', duree: '25 min',
    attendus: ['Connaître L, dL, cL', 'Savoir que 1 L = 10 dL = 100 cL', 'Comparer des contenances'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 L = @ dL', 10], ['1 L = @ cL', 100], ['1 dL = @ cL', 10], ['780 cL = @ L @ cL', 7, 80]], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure la contenance la plus proche de la réalité.',
        ...chx([['Une bouteille d\'eau', '1 L', '1 cL · 1 L · 100 L'], ['Un verre', '20 cL', '20 cL · 20 L · 2 cL'], ['Une baignoire', '150 L', '15 cL · 150 L · 15 dL']]) },
      { etoiles: 2, cahier: true, consigne: 'Pour une fête, on prépare 3 L de jus de fruits. On remplit des verres de 20 cL. Combien de verres peut-on remplir ?',
        corr: cm1Redac('Contenance en cL', '3 L = 300 cL', 'Il y a 300 cL de jus.') + cm1Redac('Nombre de verres', '20 × 15 = 300', 'On peut remplir 15 verres.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 L = @ cL', 100], ['2 L = @ cL', 200], ['50 cL + 50 cL = @ L', 1], ['1 L − 25 cL = @ cL', 75]], 2) },
      { etoiles: 1, col: 1, consigne: 'Entoure la contenance qui convient.', ...P3.chx([['une baignoire :', '200 L', '2 L · 200 L'], ['une cuillère :', '1 cL', '1 cL · 1 L'], ['un seau :', '10 L', '10 cL · 10 L']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['5 verres de 20 cL : @ cL', 100], ['soit @ L', 1]], 3) },
      { etoiles: 2, col: 1, consigne: 'Range de la plus petite à la plus grande.', ...P3.rmp([['1 L · 75 cL · 2 L · 150 cL : @', '75 cL < 1 L < 150 cL < 2 L']], 10) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['1 L et 50 cL = @ cL', 150], ['Une bouteille de 1 L remplit @ verres de 25 cL.', 4]], 3) },
    ] },
];
})();

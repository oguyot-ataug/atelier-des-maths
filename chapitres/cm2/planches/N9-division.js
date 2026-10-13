/* ============================================================
   CM2 · Planches : Division (N9)
   Les deux sens de la division (partage, groupement) ; la division euclidienne ; la division
   décimale ; diviser par 10, 100, 1 000 ; diviser par 4 ou par 8 de tête ; problèmes.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
PLANCHES['cm2|Division'] = [
  { titre: 'La division euclidienne', duree: '35 min',
    attendus: ['Trouver le quotient et le reste', 'Écrire l\'égalité de la division euclidienne', 'Poser une division'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (quotient et reste).',
        ...rmp([['47 = 6 × @ + @', 7, 5], ['85 = 9 × @ + @', 9, 4], ['100 = 7 × @ + @', 14, 2]]) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier, puis complète.',
        ...rmp([['638 : 7 → quotient @, reste @', 91, 1], ['1 250 : 12 → quotient @, reste @', 104, 2], ['2 345 : 25 → quotient @, reste @', 93, 20]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Dans une division euclidienne, le reste est plus petit que le diviseur.', 'vrai'], ['53 = 8 × 6 + 5', 'vrai'], ['53 = 8 × 5 + 13 est l\'égalité de la division de 53 par 8.', 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Pour une sortie, 158 personnes prennent le car. Un car a 48 places. Combien de cars faut-il ? Combien de places restera-t-il libres ?',
        corr: cm1Redac('Division', '158 = 48 × 3 + 14', '3 cars ne suffisent pas : il reste 14 personnes.') + cm1Redac('Nombre de cars', { suite: ['3 + 1 = 4', '4 × 48 = 192', '192 − 158 = 34'] }, 'Il faut 4 cars ; il restera 34 places libres.') },
    ] },
  { titre: 'La division décimale et diviser par 10, 100, 1 000', duree: '35 min',
    attendus: ['Calculer un quotient décimal', 'Diviser par 10, 100, 1 000', 'Diviser par 4 ou par 8 de tête'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['450 : 10 = @', 45], ['3 600 : 100 = @', 36], ['75 : 10 = @', '7,5'], ['8 : 100 = @', '0,08']]) },
      { etoiles: 2, col: 1, consigne: 'Pose dans ton cahier et calcule le quotient décimal.',
        ...rmp([['27 : 4 = @', '6,75'], ['45,6 : 3 = @', '15,2'], ['18 : 8 = @', '2,25']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule de tête (diviser par 4, c\'est prendre la moitié de la moitié).',
        ...rmp([['200 : 4 = @', 50], ['72 : 4 = @', 18], ['160 : 8 = @', 20], ['10 : 4 = @', '2,5']]) },
      { etoiles: 3, cahier: true, consigne: 'Cinq amis se partagent équitablement une addition de 63,50 €. Combien paie chacun ?',
        corr: cm1Redac('Part de chacun', '63,50 : 5 = 12,70', 'Chacun paie 12,70 €.') },
    ] },
  { titre: 'Partager ou grouper : problèmes', duree: '35 min',
    attendus: ['Reconnaître un problème de partage ou de groupement', 'Interpréter le quotient et le reste', 'Rédiger la solution'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Entoure le calcul qui convient.',
        ...chx([['On range 96 œufs dans des boîtes de 6 : combien de boîtes ?', '96 : 6', '96 × 6 · 96 : 6 · 96 − 6'], ['On partage 3 m de ruban en 4 morceaux égaux : longueur d\'un morceau ?', '3 : 4', '3 × 4 · 4 : 3 · 3 : 4']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['96 œufs dans des boîtes de 6 : @ boîtes', 16], ['3 m de ruban en 4 morceaux : @ m chacun', '0,75'], ['100 élèves en équipes de 8 : @ équipes complètes et @ élèves restants', 12, 4]]) },
      { etoiles: 3, cahier: true, consigne: 'Un fermier a récolté 1 250 pommes. Il les met dans des cagettes de 36 pommes. Combien de cagettes peut-il remplir ? Combien de pommes reste-t-il ?',
        corr: cm1Redac('Division', '1 250 = 36 × 34 + 26', 'Il peut remplir 34 cagettes ; il reste 26 pommes.') },
      { etoiles: 3, cahier: true, consigne: 'Une bouteille contient 1,5 L de jus. On remplit des verres de 0,25 L. Combien de verres peut-on remplir ?',
        corr: cm1Redac('Nombre de verres', { suite: ['0,25 L, c\'est un quart de litre : il y a 4 verres dans 1 L.', '1,5 L = 1 L + 0,5 L', '4 + 2 = 6'] }, 'On peut remplir 6 verres.') },
    ] },
];
})();

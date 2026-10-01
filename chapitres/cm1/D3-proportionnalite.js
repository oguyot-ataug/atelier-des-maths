/* ============================================================
   CHAPITRE : Proportionnalité (CM1, D3, période 4)
   Programme du cycle 3 (CM1) : résoudre des problèmes de proportionnalité en utilisant les
   propriétés de linéarité (si on multiplie une quantité par 2, 3, 10… l'autre est multipliée
   par 2, 3, 10… ; on peut additionner deux quantités) et le passage par l'unité. PAS de tableau
   de proportionnalité ni de « coefficient » en CM1/CM2 : chaque étape est justifiée par une
   phrase. Savoir reconnaître une situation qui n'est pas proportionnelle.
   ============================================================ */
(() => {
const fl = t => `<span style="color:#E35D3A;font-weight:700;">${t}</span>`;
cm1Chapitre({
  titre: 'Proportionnalité', slug: 'proportionnalite',
  cours: `
${cm1Lecon(1, 'Une situation de proportionnalité')}
${cm1Def('Deux quantités sont <b>proportionnelles</b> si, quand l\'une est multipliée (ou divisée) par un nombre, l\'autre est multipliée (ou divisée) par <b>le même nombre</b>.')}
${cm1Exemple('Au marché, 1 kg de pommes coûte 3 €.', ['2 kg coûtent 2 fois plus : 2 × 3 = 6 €.', '5 kg coûtent 5 fois plus : 5 × 3 = 15 €.', 'Le prix est <b>proportionnel</b> à la masse de pommes.'])}

${cm1Lecon(2, 'Raisonner avec « fois plus »')}
${cm1Regle('Si une quantité est <b>2 fois, 3 fois, 10 fois plus grande</b>, l\'autre aussi est 2 fois, 3 fois, 10 fois plus grande.')}
${cm1Exemple('Pour faire 4 crêpes, il faut 1 œuf. Combien d\'œufs faut-il pour 12 crêpes ?', [`12 crêpes, c'est ${fl('3 fois plus')} que 4 crêpes (3 × 4 = 12).`, `Il faut donc ${fl('3 fois plus')} d'œufs : 3 × 1 = <b>3 œufs</b>.`])}
${ce2AnimBarres('cm1-pp-fois', { unite: 1, lignes: [['Crêpes', [[90, '4 crêpes', '#E9C46A', '4 crêpes demandent 1 œuf.'], [90, '4 crêpes', '#E9C46A', 'Encore 4 crêpes…'], [90, '4 crêpes', '#E9C46A', '… et encore 4 : 12 crêpes, c\'est 3 fois 4 crêpes.']]], ['Œufs', [[90, '1 œuf', '#2EA8C9', 'Pour chaque paquet de 4 crêpes, il faut 1 œuf.'], [90, '1 œuf', '#2EA8C9', ''], [90, '1 œuf', '#2EA8C9', '3 fois plus de crêpes, 3 fois plus d\'œufs : il faut <b>3 œufs</b>.']]]] })}
${cm1Regle('Cela marche aussi pour « fois moins » : 10 stylos coûtent 20 €, donc 5 stylos (2 fois moins) coûtent 2 fois moins : 20 ÷ 2 = <b>10 €</b>.', 'Et aussi')}

${cm1Lecon(3, 'Raisonner en additionnant')}
${cm1Regle('Si on connaît les valeurs pour deux quantités, on connaît la valeur pour leur <b>somme</b> : on additionne.')}
${cm1Exemple('3 cahiers coûtent 6 € et 2 cahiers coûtent 4 €. Combien coûtent 5 cahiers ?', ['5 cahiers = 3 cahiers + 2 cahiers.', 'Donc le prix de 5 cahiers = 6 € + 4 € = <b>10 €</b>.'])}

${cm1Lecon(4, 'Passer par l\'unité')}
${cm1Regle('Quand les « fois plus » ne sont pas simples, on cherche d\'abord la valeur pour <b>1</b>, puis on multiplie.')}
${cm1Exemple('4 places de cinéma coûtent 28 €. Combien coûtent 7 places ?', ['1 place coûte 4 fois moins que 4 places : 28 ÷ 4 = 7 €.', '7 places coûtent 7 fois plus qu\'une place : 7 × 7 = <b>49 €</b>.'])}

${cm1Lecon(5, 'Attention : tout n\'est pas proportionnel !')}
${cm1Astuce('À 10 ans, Hugo mesure 1,40 m. À 20 ans, mesurera-t-il 2,80 m ? Non ! La taille n\'est <b>pas proportionnelle</b> à l\'âge. Avant de raisonner, on se demande toujours si la situation est vraiment proportionnelle.')}
${cm1Exemple('D\'autres situations non proportionnelles :', ['le prix d\'un paquet de 3 yaourts en promotion « le 3<sup>e</sup> offert » ;', 'la durée pour faire cuire 2 œufs durs (pas 2 fois plus longue que pour 1 œuf !).'])}
`,
  methode: `
${cm1Demo('pp-recette', 'Adapter une recette', 'Une recette de gâteau pour 6 personnes demande 150 g de sucre. Combien de sucre faut-il pour 18 personnes ? Et pour 9 personnes ?')}
${cm1Demo('pp-unite', 'Passer par l\'unité', '5 baguettes coûtent 6 €. Combien coûtent 8 baguettes ?')}
`,
  demos: [
    ['pp-recette', [
      { expr: '18 personnes = 3 × 6 personnes', note: 'On compare le nombre de personnes : 18, c\'est 3 fois plus que 6.' },
      { expr: '3 × 150 g = 450 g', note: 'Il faut 3 fois plus de sucre : 450 g pour 18 personnes.' },
      { expr: '150 g ÷ 2 = 75 g', note: 'Pour 9 personnes, on cherche d\'abord pour 3 personnes : 2 fois moins que 6 personnes.' },
      { expr: '150 g + 75 g = 225 g', note: '9 personnes, c\'est 6 personnes + 3 personnes : on additionne les quantités de sucre.' },
      { expr: '450 g pour 18 personnes ; 225 g pour 9 personnes', note: 'Chaque étape est expliquée par une phrase.' },
    ]],
    ['pp-unite', [
      { expr: '8 n\'est pas un nombre de « fois » simple de 5', note: 'On ne peut pas passer facilement de 5 à 8 en multipliant : on passe par 1 baguette.' },
      { expr: '6 € = 600 centimes', note: 'On compte en centimes pour diviser facilement.' },
      { expr: '600 ÷ 5 = 120', note: 'Une baguette coûte 5 fois moins : 120 centimes, c\'est-à-dire 1,20 €.' },
      { expr: '8 × 1,20 € = 9,60 €', note: '8 baguettes coûtent 8 fois plus qu\'une baguette.' },
      { expr: '8 baguettes coûtent 9,60 €.', note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('pp', [
    ['Un paquet de gâteaux coûte 2 €. Combien coûtent 4 paquets ? et 10 paquets ?',
      cm1Redac('Prix de 4 paquets', '4 × 2 € = 8 €', '4 paquets coûtent 4 fois plus : 8 €.') + cm1Redac('Prix de 10 paquets', '10 × 2 € = 20 €', '10 paquets coûtent 20 €.')],
    ['Pour 2 personnes, il faut 250 g de pâtes. Combien en faut-il pour 6 personnes ?',
      cm1Redac('Pâtes pour 6 personnes', { suite: ['6 = 3 × 2', '3 × 250 g = 750 g'] }, '6 personnes, c\'est 3 fois plus que 2 personnes : il faut 750 g de pâtes.')],
    ['8 cahiers coûtent 12 €. Combien coûtent 4 cahiers ? et 12 cahiers ?',
      cm1Redac('Prix de 4 cahiers', '12 € ÷ 2 = 6 €', '4 cahiers, c\'est 2 fois moins que 8 : ils coûtent 6 €.') + cm1Redac('Prix de 12 cahiers', '12 € + 6 € = 18 €', '12 cahiers, c\'est 8 cahiers et 4 cahiers : ils coûtent 18 €.')],
    ['Une voiture consomme 6 L d\'essence pour 100 km. Combien consomme-t-elle pour 300 km ? pour 50 km ?',
      cm1Redac('Pour 300 km', '3 × 6 L = 18 L', '300 km, c\'est 3 fois plus : la voiture consomme 18 L.') + cm1Redac('Pour 50 km', '6 L ÷ 2 = 3 L', '50 km, c\'est 2 fois moins : elle consomme 3 L.')],
    ['3 kg d\'oranges coûtent 6 €. Combien coûtent 7 kg ?',
      cm1Redac('Prix de 1 kg', '6 € ÷ 3 = 2 €', '1 kg d\'oranges coûte 2 €.') + cm1Redac('Prix de 7 kg', '7 × 2 € = 14 €', '7 kg d\'oranges coûtent 14 €.')],
    [`Est-ce une situation de proportionnalité ?${cm1Liste(['le prix de timbres identiques et leur nombre', 'la pointure et l\'âge d\'un enfant', 'la distance parcourue à vitesse constante et la durée'])}`,
      cm1Redac('Timbres', '2 fois plus de timbres coûtent 2 fois plus cher.', 'Oui, c\'est proportionnel.') + cm1Redac('Pointure et âge', 'À 20 ans, on ne chausse pas 2 fois plus grand qu\'à 10 ans.', 'Non, ce n\'est pas proportionnel.') + cm1Redac('Distance et durée', 'En 2 fois plus de temps, on parcourt 2 fois plus de distance.', 'Oui, c\'est proportionnel.')],
    ['Pour 4 crêpes, il faut 100 g de farine. Léo dit : « Pour 8 crêpes, il faut 104 g de farine, car j\'ai ajouté 4. » Qu\'en penses-tu ?',
      cm1Redac('Farine pour 8 crêpes', { suite: ['8 = 2 × 4', '2 × 100 g = 200 g'] }, 'Léo se trompe : 8 crêpes, c\'est 2 fois plus que 4 crêpes, il faut 2 fois plus de farine, 200 g.')],
  ], { titre: 'Rédaction type : « Raisonner sans tableau »', lignes: [['15 = 3 × 5', '15 objets, c\'est 3 fois plus que 5 objets.'], ['3 × 4 € = 12 €', 'Donc le prix est 3 fois plus grand.'], ['15 objets coûtent 12 €.', 'Je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la règle de trois', [
    'Les problèmes de proportionnalité sont parmi les plus anciens : les marchands de Babylone, d\'Égypte, de Chine ou d\'Inde calculaient déjà des prix de marchandises en fonction de leur quantité.',
    'Au Moyen Âge, en Europe, les manuels de commerce enseignaient la <b>règle de trois</b> : « si 3 aunes de drap coûtent 12 sous, combien coûtent 5 aunes ? ». On passait par la valeur d\'une aune… exactement comme toi avec le « passage par l\'unité » !',
  ]),
  quiz: [
    { q: '2 baguettes coûtent 2 €. 6 baguettes coûtent…', opts: ['4 €', '6 €', '12 €'], correct: 1 },
    { q: 'Pour 3 personnes, 1 L de soupe. Pour 12 personnes ?', opts: ['4 L', '10 L', '12 L'], correct: 0 },
    { q: 'La taille est-elle proportionnelle à l\'âge ?', opts: ['oui', 'non'], correct: 1 },
  ],
});
})();

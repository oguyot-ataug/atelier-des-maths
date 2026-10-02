/* ============================================================
   CHAPITRE : Proportionnalité (CM2, D3, période 4)
   Programme du cycle 3 (CM2) : identifier une situation de proportionnalité ; résoudre des
   problèmes de proportionnalité, souvent en plusieurs étapes, UNIQUEMENT par des raisonnements
   en langage naturel fondés sur la linéarité (multiplicative et additive) ; problèmes toujours
   dans le cadre des grandeurs. PAS de tableau de proportionnalité, PAS de coefficient, PAS de
   produit en croix au cours moyen.
   ============================================================ */
(() => {
const R = t => `<span style="color:#E35D3A;font-weight:700;">${t}</span>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Proportionnalité', slug: 'proportionnalite',
  cours: `
${cm1Lecon(1, 'Reconnaître une situation de proportionnalité')}
${cm1Def('Deux grandeurs sont <b>proportionnelles</b> quand, si on multiplie (ou divise) l\'une par un nombre, l\'autre est multipliée (ou divisée) <b>par le même nombre</b>.')}
${cm1Exemple('Exemples :', ['« Si j\'achète 3 fois plus de pains aux raisins, je paie 3 fois plus » : le prix est proportionnel au nombre de pains (même prix pour chaque pain).', '« Si je prends 4 fois moins de feuilles, la pile est 4 fois moins épaisse » : l\'épaisseur est proportionnelle au nombre de feuilles.'])}
${cm1Astuce('Contre-exemples : l\'âge et la taille d\'un enfant ; le prix d\'un lot en promotion (« 3 achetés, le 4<sup>e</sup> offert ») ; la durée de cuisson de 2 gâteaux dans le même four.')}

${cm1Lecon(2, 'Raisonner avec « fois plus » et « fois moins »')}
${cm1Exemple('5 kg de pommes coûtent 12 €. Combien coûtent 15 kg ? Et 2,5 kg ?')}
${ce2AnimBarres('c2-pp-barres', { unite: 1, lignes: [['5 kg', [[90, '12 €', '#E9C46A', '5 kg de pommes coûtent 12 €.']]], ['15 kg', [[90, '12 €', '#2EA8C9', '15 kg, c\'est 3 fois 5 kg…'], [90, '12 €', '#2EA8C9', ''], [90, '12 €', '#2EA8C9', '… donc 3 fois 12 €.']]]], total: '? €', totalTexte: 'Je paie 3 fois plus : 3 × 12 = <b>36 €</b>.' })}
${cm1Redac('Prix de 15 kg', '3 × 12 = 36', `15 kg, c'est ${R('3 fois plus')} que 5 kg : 15 kg coûtent 36 €.`)}
${cm1Redac('Prix de 2,5 kg', '12 ÷ 2 = 6', `2,5 kg, c'est ${R('2 fois moins')} que 5 kg : 2,5 kg coûtent 6 €.`)}

${cm1Lecon(3, 'Raisonner en ajoutant ou en soustrayant')}
${cm1Exemple('Suite : combien coûtent 7,5 kg ? et 12,5 kg ?')}
${cm1Redac('Prix de 7,5 kg', { suite: ['7,5 kg = 5 kg + 2,5 kg', '12 € + 6 € = 18 €'] }, '7,5 kg de pommes coûtent 18 €.')}
${cm1Redac('Prix de 12,5 kg', { suite: ['12,5 kg = 15 kg − 2,5 kg', '36 € − 6 € = 30 €'] }, '12,5 kg de pommes coûtent 30 €.')}

${cm1Lecon(4, 'Passer par 1')}
${cm1Exemple('6 cahiers coûtent 9 €. Combien coûtent 10 cahiers ?')}
${cm1Redac('Prix d\'un cahier', '9 ÷ 6 = 1,50', '1 cahier coûte 6 fois moins : 1,50 €.')}
${cm1Redac('Prix de 10 cahiers', '10 × 1,50 = 15', '10 cahiers coûtent 15 €.')}
${cm1Rem(`Autre raisonnement :${cm1Liste(['2 cahiers coûtent 3 fois moins que 6 cahiers : 3 € ;', '10 cahiers, c\'est 5 fois 2 cahiers : 5 × 3 = 15 €.'])}`)}
${cm1Rem('On choisit le raisonnement le plus simple selon les nombres. On écrit toujours une <b>phrase</b> qui explique chaque étape, avec les unités.')}
`,
  methode: `
${cm1Demo('c2-pp-recette', 'Adapter une recette en plusieurs étapes', 'Pour 4 personnes : 300 g de farine et 3 œufs. Quelles quantités pour 10 personnes ?')}
${cm1Demo('c2-pp-vitesse', 'Distance et durée', 'Un train roule toujours à la même vitesse : il parcourt 150 km en 1 h. Quelle distance en 2 h 30 min ?')}
`,
  demos: [
    ['c2-pp-recette', [
      { expr: 'Pour 2 personnes : 150 g et 1,5 œuf', note: '2 personnes, c\'est 2 fois moins que 4 : on divise par 2.' },
      { expr: 'Pour 8 personnes : 600 g et 6 œufs', note: '8 personnes, c\'est 2 fois plus que 4 : on multiplie par 2.' },
      { expr: '10 = 8 + 2 → 600 + 150 = 750 g ; 6 + 1,5 = 7,5 œufs', note: 'On additionne les quantités pour 8 et pour 2 personnes.' },
      { expr: 'Pour 10 personnes : 750 g de farine et 7 ou 8 œufs', note: 'On ne coupe pas un œuf : on arrondit, c\'est une recette !' },
    ]],
    ['c2-pp-vitesse', [
      { expr: '2 h → 2 × 150 km = 300 km', note: '2 fois plus de temps, 2 fois plus de distance.' },
      { expr: '30 min → 150 ÷ 2 = 75 km', note: '30 min, c\'est 2 fois moins qu\'une heure.' },
      { expr: '2 h 30 min → 300 + 75 = 375 km', note: 'On additionne.' },
    ]],
  ],
  exos: cm1Exos('c2pp', [
    ['3 croissants coûtent 3,60 €. Combien coûtent 9 croissants ? 1 croissant ? 7 croissants ?',
      cm1Redac('Prix de 9 croissants', '3 × 3,60 = 10,80', '9 croissants, c\'est 3 fois plus : ils coûtent 10,80 €.')
      + cm1Redac('Prix d\'un croissant', '3,60 ÷ 3 = 1,20', 'Un croissant coûte 1,20 €.')
      + cm1Redac('Prix de 7 croissants', '7 × 1,20 = 8,40', '7 croissants coûtent 8,40 €.')],
    ['Une voiture consomme 6 L pour 100 km. Combien pour 250 km ?',
      cm1Redac('Consommation pour 250 km', { suite: ['200 km : 2 × 6 L = 12 L', '50 km : 6 L ÷ 2 = 3 L', '250 km : 12 L + 3 L = 15 L'] }, 'Pour 250 km, la voiture consomme 15 L.')],
    ['Un robinet remplit 45 L en 3 min. Combien en 12 min ? En combien de temps remplit-il 90 L ?',
      cm1Redac('Volume en 12 min', '4 × 45 = 180', '12 min, c\'est 4 fois plus que 3 min : le robinet remplit 180 L.')
      + cm1Redac('Durée pour 90 L', '2 × 3 = 6', '90 L, c\'est 2 fois plus que 45 L : il faut 6 min.')],
    ['Sur une carte, 2 cm représentent 5 km. Quelle distance réelle pour 8 cm ? pour 3 cm ?',
      cm1Redac('Distance pour 8 cm', '4 × 5 = 20', '8 cm, c\'est 4 fois plus que 2 cm : la distance réelle est 20 km.')
      + cm1Redac('Distance pour 3 cm', { suite: ['1 cm : 5 ÷ 2 = 2,5 km', '3 cm : 5 + 2,5 = 7,5 km'] }, 'Pour 3 cm, la distance réelle est 7,5 km.')],
    [`Proportionnel ou non ?${cm1Liste(['a) le prix de l\'essence et le nombre de litres', 'b) la pointure et l\'âge', 'c) le nombre de roues et le nombre de vélos'])}`,
      cm1Redac('Proportionnalité', '', 'a) Oui : chaque litre coûte le même prix. b) Non : la pointure ne grandit pas régulièrement avec l\'âge. c) Oui : il y a 2 roues par vélo.')],
    ['12 stylos pèsent 180 g. Combien pèsent 20 stylos ?',
      cm1Redac('Masse de 4 stylos', '180 ÷ 3 = 60', '4 stylos, c\'est 3 fois moins : ils pèsent 60 g.')
      + cm1Redac('Masse de 20 stylos', '5 × 60 = 300', '20 stylos, c\'est 5 fois 4 stylos : ils pèsent 300 g.')],
    ['Maxime dit : « Pour 2 gâteaux il faut 4 œufs, donc pour 5 gâteaux il en faut 7, car j\'ajoute 3. » A-t-il raison ?',
      cm1Redac('Œufs pour 5 gâteaux', { suite: ['1 gâteau : 4 ÷ 2 = 2 œufs', '5 gâteaux : 5 × 2 = 10 œufs'] }, 'Maxime a tort : il faut 10 œufs. On ne raisonne pas en ajoutant le même nombre aux deux grandeurs.')],
  ], { titre: 'Rédaction type', lignes: [['15 kg, c\'est 3 fois plus que 5 kg.', 'Je compare les quantités.'], ['Je paie 3 fois plus : 3 × 12 = 36.', 'J\'applique à l\'autre grandeur.'], ['15 kg de pommes coûtent 36 €.', 'Je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Thalès et la pyramide', [
    'On raconte que le savant grec <b>Thalès</b> a mesuré la hauteur de la grande pyramide d\'Égypte grâce à la proportionnalité : il a planté un bâton et attendu le moment où l\'ombre du bâton était aussi longue que le bâton. À cet instant, l\'ombre de la pyramide était aussi longue que sa hauteur !',
    'Les ombres sont proportionnelles aux hauteurs des objets, à un même moment de la journée.',
  ]),
  quiz: [
    { q: '4 billets coûtent 20 €. 12 billets coûtent…', opts: ['28 €', '60 €', '48 €'], correct: 1 },
    { q: '10 L en 2 min. En 1 min ?', opts: ['5 L', '8 L', '20 L'], correct: 0 },
    { q: 'La taille est-elle proportionnelle à l\'âge ?', opts: ['oui', 'non'], correct: 1 },
  ],
});
})();

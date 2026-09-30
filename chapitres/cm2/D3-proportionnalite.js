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
${cm1Exemple('5 kg de pommes coûtent 12 €. Combien coûtent 15 kg ? Et 2,5 kg ?', [`15 kg, c'est ${R('3 fois plus')} que 5 kg, donc je paie ${R('3 fois plus')} : 3 × 12 = <b>36 €</b>.`, `2,5 kg, c'est ${R('2 fois moins')} que 5 kg, donc je paie ${R('2 fois moins')} : 12 ÷ 2 = <b>6 €</b>.`])}

${cm1Lecon(3, 'Raisonner en ajoutant ou en soustrayant')}
${cm1Exemple('Suite : combien coûtent 7,5 kg ? et 12,5 kg ?', ['7,5 kg = 5 kg + 2,5 kg, donc je paie 12 € + 6 € = <b>18 €</b>.', '12,5 kg = 15 kg − 2,5 kg, donc je paie 36 € − 6 € = <b>30 €</b>.'])}

${cm1Lecon(4, 'Passer par 1')}
${cm1Exemple('6 cahiers coûtent 9 €. Combien coûtent 10 cahiers ?', ['1 cahier coûte 6 fois moins : 9 ÷ 6 = 1,50 €.', '10 cahiers coûtent 10 fois plus : 10 × 1,50 = <b>15 €</b>.', 'Autre raisonnement : 2 cahiers coûtent 3 € (3 fois moins que 6 cahiers), et 10 cahiers = 5 fois 2 cahiers : 5 × 3 = 15 €.'])}
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
    ['3 croissants coûtent 3,60 €. Combien coûtent 9 croissants ? 1 croissant ? 7 croissants ?', '9 : 3 fois plus, 10,80 € · 1 : 3,60 ÷ 3 = 1,20 € · 7 : 7 × 1,20 = 8,40 €.'],
    ['Une voiture consomme 6 L pour 100 km. Combien pour 250 km ?', '200 km : 12 L ; 50 km : 3 L ; 250 km : 15 L.'],
    ['Un robinet remplit 45 L en 3 min. Combien en 12 min ? En combien de temps remplit-il 90 L ?', '12 min = 4 fois plus : 180 L · 90 L = 2 fois plus : 6 min.'],
    ['Sur une carte, 2 cm représentent 5 km. Quelle distance réelle pour 8 cm ? pour 3 cm ?', '8 cm : 4 fois plus, 20 km · 3 cm = 2 cm + 1 cm : 5 + 2,5 = 7,5 km.'],
    ['Proportionnel ou non ? a) le prix de l\'essence et le nombre de litres · b) la pointure et l\'âge · c) le nombre de roues et le nombre de vélos.', 'a) oui · b) non · c) oui (2 roues par vélo).'],
    ['12 stylos pèsent 180 g. Combien pèsent 20 stylos ?', '4 stylos : 60 g (3 fois moins) ; 20 stylos = 5 fois 4 : 300 g.'],
    ['Maxime dit : « Pour 2 gâteaux il faut 4 œufs, donc pour 5 gâteaux il en faut 7, car j\'ajoute 3. » A-t-il raison ?', 'Non : 1 gâteau demande 2 œufs, donc 5 gâteaux demandent 10 œufs. On ne raisonne pas en ajoutant le même nombre aux deux grandeurs.'],
  ], { titre: 'Rédaction type', lignes: [['15 kg, c\'est 3 fois plus que 5 kg.', 'Je compare les quantités.'], ['Je paie 3 fois plus : 3 × 12 € = 36 €.', 'J\'applique à l\'autre grandeur.'], ['15 kg de pommes coûtent 36 €.', 'Je conclus.']] }),
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

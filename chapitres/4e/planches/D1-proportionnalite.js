/* ============================================================
   4e · Planches : Proportionnalité (D1)
   Quatrième proportionnelle ; pourcentages ; vitesse moyenne (distance, durée, conversions) ;
   grandeurs composées (débit, consommation) et problèmes.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
// Cuve remplie par un robinet (débit).
const cuve = DS.fig(160, 124, `<path d="M8,14 h40 v10 h-8 v8 h-10 v-8 h-22 Z" fill="#B9C2CC" stroke="#1F3A5C" stroke-width="1.2"/>` + DS.ln([35, 32], [35, 96], '#2EA8C9', 3)
  + DS.pave(16, 116, 90, 60, 34, 20, 24) + DS.tx([120, 122], '1 200 L', { fs: 9 }), 130);
PLANCHES['4e|Proportionnalité'] = [
  { titre: 'La quatrième proportionnelle', duree: '30 min',
    attendus: ['Reconnaître une situation de proportionnalité', 'Calculer une quatrième proportionnelle (produit en croix)', 'Choisir une méthode adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces grandeurs sont-elles proportionnelles ? Entoure.',
        ...ch([['Le prix payé et la masse de pommes achetées (2,40 € le kg) :', 'oui'], ['L\'âge et la taille d\'un enfant :', 'non'], ['Le périmètre d\'un carré et la longueur de son côté :', 'oui'], ['L\'aire d\'un carré et la longueur de son côté :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: '5 cahiers coûtent 7,50 €. Complète.',
        ...rmp([['1 cahier coûte @ €', '1,50'], ['8 cahiers coûtent @ €', 12], ['Avec 21 €, on achète @ cahiers', 14]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule la quatrième proportionnelle (produit en croix).',
        ...rmp([['6 → 15 et 10 → @', 25], ['4 → 7 et @ → 21', 12], ['2,5 → 9 et 7,5 → @', 27], ['12 → 30 et 5 → @', '12,5']]) },
      { etoiles: 2, col: 1, consigne: 'Une recette pour 6 personnes demande 450 g de farine et 3 œufs.',
        ...rmp([['Pour 4 personnes : @ g de farine', 300], ['Pour 10 personnes : @ œufs', 5], ['Avec 900 g de farine : @ personnes', 12]]) },
      { etoiles: 3, cahier: true, consigne: 'Sur une carte, 3 cm représentent 4,5 km. Quelle distance réelle représentent 8 cm ? Quelle longueur sur la carte pour 15 km ?',
        corr: cm1Redac('Distance réelle', '8 × 4,5 : 3 = 12', '8 cm représentent 12 km.') + cm1Redac('Longueur sur la carte', '15 × 3 : 4,5 = 10', '15 km sont représentés par 10 cm.') },
    ] },
  { titre: 'Calculer avec des pourcentages', duree: '30 min',
    attendus: ['Calculer un pourcentage d\'une quantité', 'Calculer un pourcentage (proportion)', 'Appliquer une augmentation ou une réduction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['25 % de 80 = @', 20], ['10 % de 350 = @', 35], ['15 % de 60 = @', 9], ['120 % de 50 = @', 60]]) },
      { etoiles: 2, col: 1, consigne: 'Quel pourcentage cela représente-t-il ?',
        ...rmp([['18 élèves sur 24 : @ %', 75], ['45 g de sucre dans 150 g de céréales : @ %', 30], ['7 réussites sur 20 essais : @ %', 35]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule le nouveau prix.',
        ...rmp([['Un article de 80 € soldé à −20 % : @ €', 64], ['Un loyer de 600 € augmenté de 3 % : @ €', 618], ['Un vélo de 250 € soldé à −35 % : @ €', '162,50']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Augmenter de 10 %, c\'est multiplier par 1,1.', 'vrai'], ['Baisser de 20 % puis augmenter de 20 % ramène au prix de départ.', 'faux'], ['50 % d\'une quantité, c\'est sa moitié.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Un collège compte 500 élèves. 36 % sont en 6e ou en 5e, et parmi les autres, 40 % sont en 4e. Combien d\'élèves sont en 4e ?',
        corr: cm1Redac('Élèves de 4e et de 3e', { suite: ['100 % − 36 % = 64 %', '500 × 64 : 100 = 320'] }, '320 élèves sont en 4e ou en 3e.') + cm1Redac('Élèves de 4e', '320 × 40 : 100 = 128', 'Il y a 128 élèves de 4e.') },
    ] },
  { titre: 'Vitesse moyenne', duree: '35 min',
    attendus: ['Calculer une vitesse moyenne, une distance ou une durée', 'Convertir une durée (heures et minutes)', 'Convertir une vitesse (km/h et m/s)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Convertis.',
        ...rmp([['1 h 30 min = @ h', '1,5'], ['45 min = @ h', '0,75'], ['2,25 h = @ h @ min', 2, 15], ['3 h 20 min = @ min', 200]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['180 km en 2 h : vitesse moyenne @ km/h', 90], ['À 60 km/h pendant 2 h 30 : distance @ km', 150], ['150 km à 100 km/h : durée @ h @ min', 1, 30], ['12 km en 45 min : vitesse moyenne @ km/h', 16]]) },
      { etoiles: 2, col: 1, consigne: 'Convertis les vitesses.',
        ...rmp([['36 km/h = @ m/s', 10], ['15 m/s = @ km/h', 54], ['90 km/h = @ m/s', 25]]) },
      { etoiles: 3, cahier: true, consigne: 'Un cycliste parcourt 42 km en 1 h 45 min. Calcule sa vitesse moyenne en km/h, puis en m/s (au dixième).',
        corr: cm1Redac('En km/h', { suite: ['1 h 45 min = 1,75 h', '42 : 1,75 = 24'] }, 'Sa vitesse moyenne est de 24 km/h.') + cm1Redac('En m/s', '24 000 m : 3 600 s ≈ 6,7', 'Elle est d\'environ 6,7 m/s.') },
      { etoiles: 3, cahier: true, consigne: 'Léa part à 8 h 15 et roule à 80 km/h de moyenne. Elle doit parcourir 220 km. À quelle heure arrivera-t-elle ?',
        corr: cm1Redac('Durée du trajet', { suite: ['220 : 80 = 2,75 h', '2,75 h = 2 h 45 min'] }, 'Le trajet dure 2 h 45 min.') + cm1Redac('Heure d\'arrivée', '8 h 15 + 2 h 45 = 11 h', 'Léa arrivera à 11 h.') },
    ] },
  { titre: 'Grandeurs composées et problèmes', duree: '40 min',
    attendus: ['Utiliser un débit, une consommation', 'Calculer avec une grandeur produit ou quotient', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un robinet débite 12 L/min : en 5 min, il coule @ L', 60], ['Une voiture consomme 6 L aux 100 km : pour 350 km, il faut @ L', 21], ['Un appareil de 2 000 W fonctionne 3 h : il consomme @ kWh', 6]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'unité qui convient.',
        ...chx([['Un débit :', 'L/min', 'km/h · L/min · kWh'], ['Une énergie électrique :', 'kWh', 'kW · kWh · W/h'], ['Une vitesse :', 'm/s', 'm/s · m² · s/m']]) },
      { etoiles: 2, cahier: true, consigne: illu(cuve, 'Une cuve de 1 200 L est remplie par un robinet qui débite 16 L par minute. Combien de temps faut-il pour la remplir ? Donne la réponse en heures et minutes.'),
        corr: cm1Redac('Durée', { suite: ['1 200 : 16 = 75 min', '75 min = 1 h 15 min'] }, 'Il faut 1 h 15 min pour remplir la cuve.') },
      { etoiles: 3, cahier: true, consigne: 'Le kWh coûte 0,25 €. Un radiateur de 1 500 W fonctionne 6 h par jour pendant 30 jours. Combien coûte son utilisation ?',
        corr: cm1Redac('Énergie consommée', { suite: ['1 500 W = 1,5 kW', '1,5 × 6 × 30 = 270 kWh'] }, 'Le radiateur consomme 270 kWh.') + cm1Redac('Coût', '270 × 0,25 = 67,5', 'Son utilisation coûte 67,50 €.') },
    ] },
];
})();

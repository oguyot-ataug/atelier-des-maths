/* ============================================================
   6e · Planches : Proportionnalité (D3)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const ctr = h => `<div style="text-align:center;">${h}</div>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Tableau de proportionnalité à compléter : l1, l2 = lignes (null = case à trouver), titres t.
const tp = (t, l1, l2, s1, s2) => ({ eleve: ctr(tab([t[0], ...l1.map(v => v == null ? B() : v)], [[t[1], ...l2.map(v => v == null ? B() : v)]])), corr: ctr(tab([t[0], ...l1.map((v, i) => v == null ? R(s1[i]) : v)], [[t[1], ...l2.map((v, i) => v == null ? R(s2[i]) : v)]])) });
PLANCHES['6e|Proportionnalité'] = [
  { titre: 'Reconnaître une situation de proportionnalité', duree: '35 min',
    attendus: ['Reconnaître si deux grandeurs sont proportionnelles', 'Reconnaître un tableau de proportionnalité (même coefficient)', 'Trouver le coefficient de proportionnalité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces situations sont-elles des situations de proportionnalité ? Entoure.',
        ...ch([['Le prix de croissants à 1,10 € pièce et leur nombre :', 'oui'], ['La taille d\'un enfant et son âge :', 'non'], ['Le périmètre d\'un carré et la longueur de son côté :', 'oui'], ['La température et l\'heure de la journée :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Ces tableaux sont-ils des tableaux de proportionnalité ? Entoure.',
        eleve: tab(['2', '5', '8'], [['6', '15', '24']]) + plListe(['Tableau 1 : <b>oui · non</b>']) + tab(['3', '4', '10'], [['9', '16', '30']]) + plListe(['Tableau 2 : <b>oui · non</b>']),
        corr: tab(['2', '5', '8'], [['6', '15', '24']]) + plListe(['Tableau 1 : ' + plEntoure('oui') + ' (× 3)']) + tab(['3', '4', '10'], [['9', '16', '30']]) + plListe(['Tableau 2 : ' + plEntoure('non') + ' (9 ÷ 3 = 3 mais 16 ÷ 4 = 4)']) },
      { etoiles: 2, col: 1, consigne: 'Trouve le coefficient de proportionnalité (le nombre par lequel on multiplie la 1re ligne).',
        eleve: plListe(['4 → 28 ; 6 → 42 : coefficient ' + B(), '10 → 25 ; 4 → 10 : coefficient ' + B(), '5 → 1 ; 20 → 4 : coefficient ' + B()]),
        corr: plListe(['4 → 28 ; 6 → 42 : coefficient ' + R(7), '10 → 25 ; 4 → 10 : coefficient ' + R('2,5'), '5 → 1 ; 20 → 4 : coefficient ' + R('0,2')]) },
      { etoiles: 2, col: 1, consigne: 'Un cycliste roule à vitesse constante. Complète le tableau.', ...tp(['Durée (min)', 'Distance (km)'], ['10', '20', null, '60'], ['4', null, '12', null], [, , 30, ], [, 8, , 24]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au cinéma, une place coûte 9 €, mais la carte de 10 places coûte 75 €. Le prix payé est-il proportionnel au nombre de places ? Explique.',
        corr: cm1Redac('Comparaison', { suite: ['Sans carte : 10 places coûtent 10 × 9 = 90 €.', 'Avec la carte : 10 places coûtent 75 €.'] }, 'Le prix n\'est pas proportionnel au nombre de places quand on utilise la carte.') },
    ] },
  { titre: 'Compléter un tableau de proportionnalité', duree: '40 min',
    attendus: ['Utiliser le coefficient de proportionnalité', 'Utiliser les propriétés de linéarité (additionner, multiplier une colonne)', 'Choisir la méthode la plus efficace'],
    exos: [
      { etoiles: 1, consigne: 'Des cahiers coûtent 1,50 € pièce. Complète le tableau.', ...tp(['Nombre de cahiers', 'Prix (€)'], ['1', '2', '4', '10', null], ['1,5', null, null, null, '30'], [, , , , 20], [, 3, 6, 15]) },
      { etoiles: 2, consigne: 'Complète en utilisant les colonnes (additionner ou multiplier).', ...tp(['Masse de farine (g)', 'Nombre de crêpes'], ['250', '500', '750', '100', null], ['10', null, null, '4', '14'], [, , , , 350], [, 20, 30]) },
      { etoiles: 2, col: 1, consigne: 'Pour 4 personnes, une recette demande 200 g de chocolat et 6 œufs. Complète.',
        eleve: plListe(['Pour 2 personnes : ' + B() + ' g de chocolat et ' + B(1) + ' œufs', 'Pour 6 personnes : ' + B() + ' g de chocolat et ' + B(1) + ' œufs', 'Pour 10 personnes : ' + B() + ' g de chocolat et ' + B(2) + ' œufs']),
        corr: plListe(['Pour 2 personnes : ' + R(100) + ' g de chocolat et ' + R(3) + ' œufs', 'Pour 6 personnes : ' + R(300) + ' g de chocolat et ' + R(9) + ' œufs', 'Pour 10 personnes : ' + R(500) + ' g de chocolat et ' + R(15) + ' œufs']) },
      { etoiles: 2, col: 1, consigne: 'Ce tableau est un tableau de proportionnalité. Complète-le.', ...tp(['x', 'y'], ['3', '7', '10', null], ['12', null, null, '100'], [, , , 25], [, 28, 40]) },
      { etoiles: 3, col: 1, cahier: true, consigne: '5 kg de pommes coûtent 9,50 €. Combien coûtent 8 kg ? Et 13 kg ? Explique ta méthode.',
        corr: cm1Redac('Prix d\'un kilogramme', '9,50 ÷ 5 = 1,90', 'Un kilogramme coûte 1,90 €.') + cm1Redac('Prix demandés', { suite: ['8 × 1,90 = 15,20', '13 × 1,90 = 24,70'] }, '8 kg coûtent 15,20 € et 13 kg coûtent 24,70 € (ou 8 kg + 5 kg = 13 kg : 15,20 + 9,50).') },
    ] },
  { titre: 'Résoudre des problèmes de proportionnalité', duree: '40 min',
    attendus: ['Passer par l\'unité (règle de trois)', 'Résoudre des problèmes de prix, de recettes, de vitesses', 'Vérifier qu\'une situation est proportionnelle avant de calculer'],
    exos: [
      { etoiles: 1, col: 1, consigne: '6 stylos identiques coûtent 4,20 €. Complète.',
        eleve: plListe(['Prix d\'un stylo : ' + B() + ' €', 'Prix de 10 stylos : ' + B() + ' €', 'Prix de 15 stylos : ' + B() + ' €']),
        corr: plListe(['Prix d\'un stylo : ' + R('0,7') + ' €', 'Prix de 10 stylos : ' + R(7) + ' €', 'Prix de 15 stylos : ' + R('10,5') + ' €']) },
      { etoiles: 2, col: 1, consigne: 'Une voiture roule à 90 km/h (90 km en 1 h). Complète.',
        eleve: plListe(['Distance en 2 h : ' + B() + ' km', 'Distance en 30 min : ' + B() + ' km', 'Durée pour 225 km : ' + B() + ' h ' + B(2) + ' min']),
        corr: plListe(['Distance en 2 h : ' + R(180) + ' km', 'Distance en 30 min : ' + R(45) + ' km', 'Durée pour 225 km : ' + R(2) + ' h ' + R(30) + ' min']) },
      { etoiles: 2, col: 1, consigne: 'Un robinet remplit un seau de 12 L en 3 minutes. Complète.',
        eleve: plListe(['Volume en 1 min : ' + B() + ' L', 'Volume en 7 min : ' + B() + ' L', 'Durée pour une baignoire de 160 L : ' + B() + ' min']),
        corr: plListe(['Volume en 1 min : ' + R(4) + ' L', 'Volume en 7 min : ' + R(28) + ' L', 'Durée pour une baignoire de 160 L : ' + R(40) + ' min']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un paquet de 750 g de céréales coûte 3,60 € ; un paquet de 500 g coûte 2,50 €. Quel paquet est le plus avantageux ?',
        corr: cm1Redac('Prix de 250 g', { suite: ['Grand paquet : 3,60 ÷ 3 = 1,20 € les 250 g.', 'Petit paquet : 2,50 ÷ 2 = 1,25 € les 250 g.'] }, 'Le paquet de 750 g est le plus avantageux.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un enfant de 1 an mesure 75 cm. Peut-on prévoir sa taille à 10 ans en multipliant par 10 ? Explique.',
        corr: cm1Redac('Réponse', '75 × 10 = 750 cm = 7,5 m : c\'est impossible.', 'La taille n\'est pas proportionnelle à l\'âge : on ne peut pas utiliser la proportionnalité.') },
    ] },
  { titre: 'Échelles', duree: '40 min',
    attendus: ['Comprendre une échelle : 1 cm sur le plan représente … dans la réalité', 'Calculer une distance réelle à partir d\'un plan', 'Calculer une distance sur le plan'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Sur une carte, 1 cm représente 5 km. Complète.', ...tp(['Sur la carte (cm)', 'Réalité (km)'], ['1', '3', '7,5', null], ['5', null, null, '60'], [, , , 12], [, 15, '37,5']) },
      { etoiles: 1, col: 1, consigne: 'Sur un plan, 1 cm représente 2 m. Complète.',
        eleve: plListe(['4 cm sur le plan : ' + B() + ' m en réalité', '6,5 cm sur le plan : ' + B() + ' m', 'Une pièce de 8 m de long : ' + B() + ' cm sur le plan']),
        corr: plListe(['4 cm sur le plan : ' + R(8) + ' m en réalité', '6,5 cm sur le plan : ' + R(13) + ' m', 'Une pièce de 8 m de long : ' + R(4) + ' cm sur le plan']) },
      { etoiles: 2, col: 1, consigne: 'Une maquette de voiture est à l\'échelle 1/50 : 1 cm sur la maquette représente 50 cm. Complète.',
        eleve: plListe(['La maquette mesure 8 cm : la voiture mesure ' + B() + ' cm, soit ' + B() + ' m', 'Une roue mesure 60 cm : sur la maquette, ' + B() + ' cm']),
        corr: plListe(['La maquette mesure 8 cm : la voiture mesure ' + R(400) + ' cm, soit ' + R(4) + ' m', 'Une roue mesure 60 cm : sur la maquette, ' + R('1,2') + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une carte au 1/100 000, deux villages sont à 4,5 cm l\'un de l\'autre. Quelle est la distance réelle, en km ?',
        corr: cm1Redac('Distance réelle', '4,5 × 100 000 = 450 000 cm', '450 000 cm = 4 500 m = 4,5 km : les villages sont à 4,5 km l\'un de l\'autre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine le plan d\'une chambre rectangulaire de 4 m sur 3 m à l\'échelle 1 cm pour 50 cm. Quelles dimensions as-tu tracées ?',
        corr: cm1Redac('Dimensions sur le plan', { suite: ['4 m = 400 cm ; 400 ÷ 50 = 8 cm', '3 m = 300 cm ; 300 ÷ 50 = 6 cm'] }, 'Je trace un rectangle de 8 cm sur 6 cm.') },
    ] },
];
})();

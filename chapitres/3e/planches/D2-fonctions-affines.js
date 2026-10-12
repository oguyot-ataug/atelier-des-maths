/* ============================================================
   3e · Planches : Fonctions linéaires et affines (D2)
   Fonction linéaire et proportionnalité ; fonction affine (coefficient, ordonnée à l'origine, droite) ;
   pourcentages et évolutions ; situations concrètes ; Objectif Brevet.
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs, tab, repere } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const gLin = repere({ x: [-3, 4], y: [-4, 6], u: 20, px: 135, fns: [{ f: x => 1.5 * x, de: -2.6, a: 4, t: '(d)', tx: 3.6, dx: -4, dy: 2 }], pts: [{ x: 2, y: 3 }] });
const gAff = repere({ x: [-3, 5], y: [-2, 5], u: 20, px: 160, fns: [{ f: x => 0.5 * x + 1, c: '#7A4FC0', t: '(d)', tx: 4.6, dx: 4, dy: -4 }], pts: [{ x: 0, y: 1, c: '#7A4FC0' }, { x: 2, y: 2, c: '#7A4FC0' }] });
PLANCHES['3e|Fonctions linéaires et affines'] = [
  { titre: 'Fonctions linéaires et proportionnalité', duree: '35 min',
    attendus: ['Reconnaître une fonction linéaire f(x) = ax', 'Calculer avec une fonction linéaire, trouver son coefficient', 'Traduire un pourcentage par une fonction linéaire'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la réponse la plus précise.',
        ...ch([['f(x) = 4x :', 'linéaire'], ['g(x) = 2x + 1 :', 'affine'], ['h(x) = x² :', 'aucune']], 'linéaire · affine · aucune') },
      { etoiles: 1, col: 1, consigne: 'f est la fonction linéaire f(x) = 2,5x.',
        ...rmp([['f(4) = @', 10], ['f(−2) = @', '−5'], ['Antécédent de 15 : @', 6], ['Coefficient de f : @', '2,5']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['f est linéaire et f(3) = 12 : son coefficient est @', 4], ['Alors f(5) = @', 20], ['g est linéaire et g(−2) = 7 : son coefficient est @', '−3,5']]) },
      { etoiles: 2, col: 1, consigne: 'Écris la fonction linéaire qui traduit l\'évolution.',
        ...rmp([['Augmenter de 15 % : x ↦ @x', '1,15'], ['Diminuer de 40 % : x ↦ @x', '0,6'], ['Après une hausse de 15 %, un prix est de 46 €. Avant : @ €', 40]]) },
      { etoiles: 2, col: 1, consigne: 'La droite (d) représente une fonction linéaire f.', ...fig(gLin, [['Coefficient de f : @', '1,5'], ['f(4) = @', 6], ['Antécédent de −3 : @', '−2']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le prix de l\'essence est proportionnel au volume : 50 L coûtent 89 €. Exprime le prix p(v) de v litres, puis calcule p(35).',
        corr: cm1Redac('Coefficient', '89 : 50 = 1,78', 'p(v) = 1,78v.') + cm1Redac('Prix de 35 L', '1,78 × 35 = 62,3', '35 L coûtent 62,30 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un prix augmente de 20 %, puis baisse de 20 %. Montre, avec des fonctions linéaires, que le prix final est 96 % du prix de départ.',
        corr: cm1Redac('Composition', { suite: ['Hausse de 20 % : x ↦ 1,2x', 'Baisse de 20 % : x ↦ 0,8x', '0,8 × 1,2x = 0,96x'] }, 'Le prix final est 96 % du prix de départ : il a baissé de 4 %.') },
    ] },
  { titre: 'Les fonctions affines', duree: '40 min',
    attendus: ['Calculer avec une fonction affine f(x) = ax + b', 'Lire et utiliser coefficient directeur et ordonnée à l\'origine', 'Trouver une fonction affine à partir de deux valeurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'f est la fonction affine f(x) = −2x + 5.',
        ...rmp([['f(0) = @', 5], ['f(3) = @', '−1'], ['f(−1) = @', 7], ['Antécédent de 1 : @', 2]]) },
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['f(x) = 3x − 4 : coefficient directeur', '3', '3 · −4 · 4'], ['f(x) = 3x − 4 : ordonnée à l\'origine', '−4', '3 · −4 · 4'], ['g(x) = 7 − x : coefficient directeur', '−1', '7 · 1 · −1'], ['h(x) = 6 : coefficient directeur', '0', '6 · 0 · 1']]) },
      { etoiles: 2, col: 1, consigne: 'Trouve la fonction affine.',
        ...rmp([['f(0) = 3 et f(2) = 7 : f(x) = @x + @', 2, 3], ['g(1) = 5 et g(3) = 1 : g(x) = @x + @', '−2', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'La droite (d) représente une fonction affine f.', ...fig(gAff, [['Ordonnée à l\'origine : @', 1], ['Coefficient directeur : @', '0,5'], ['Antécédent de 3 : @', 4], ['f(−2) = @', 0]]) },
      { etoiles: 2, col: 1, consigne: 'Le point est-il sur la droite représentant f(x) = 3x − 2 ? Entoure.',
        ...ch([['A(1 ; 1) :', 'oui'], ['B(2 ; 5) :', 'non'], ['C(0 ; −2) :', 'oui'], ['D(−1 ; −4) :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Trace dans un même repère les droites qui représentent f(x) = 2x − 1 et g(x) = −x + 5. Lis, puis calcule, les coordonnées de leur point d\'intersection.',
        corr: `<div style="text-align:center;">${repere({ x: [-1, 5], y: [-2, 6], u: 18, px: 150, fns: [{ f: x => 2 * x - 1, de: -0.5, a: 3.5, t: 'f', tx: 3.4 }, { f: x => -x + 5, c: '#E35D3A', de: -1, a: 5, t: 'g', tx: 4.9 }], pts: [{ x: 2, y: 3, t: '(2 ; 3)' }] })}</div>`
          + cm1Redac('Calcul', { suite: ['2x − 1 = −x + 5', '3x = 6, donc x = 2', 'f(2) = 3'] }, 'Le point d\'intersection est (2 ; 3).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Taxi A : 4 € de prise en charge, puis 1,50 € par km. Taxi B : 2 € par km. Pour quelle distance les deux taxis coûtent-ils le même prix ? Lequel choisir pour 12 km ?',
        corr: cm1Redac('Même prix', { suite: ['4 + 1,5d = 2d', '0,5d = 4', 'd = 8'] }, 'Pour 8 km, les deux taxis coûtent 16 €.') + cm1Redac('Pour 12 km', { suite: ['A : 4 + 1,5 × 12 = 22', 'B : 2 × 12 = 24'] }, 'Pour 12 km, il vaut mieux prendre le taxi A.') },
    ] },
  { titre: 'Pourcentages et évolutions', duree: '35 min',
    attendus: ['Associer une évolution en pourcentage à un coefficient multiplicateur', 'Retrouver une valeur de départ', 'Calculer un taux d\'évolution, des évolutions successives'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Hausse de 8 % : on multiplie par @', '1,08'], ['Baisse de 15 % : on multiplie par @', '0,85'], ['Hausse de 100 % : on multiplie par @', 2], ['Multiplier par 0,97, c\'est une baisse de @ %', 3]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['Un pull à 45 € soldé à −20 % : @ €', 36], ['Un salaire de 1 800 € augmenté de 3 % : @ €', '1 854'], ['Une ville de 25 000 habitants qui en perd 4 % : @ habitants', '24 000']]) },
      { etoiles: 2, col: 1, consigne: 'Retrouve la valeur de départ.',
        ...rmp([['Après une hausse de 25 %, un objet coûte 75 €. Avant : @ €', 60], ['Après une remise de 30 %, on paie 56 €. Avant : @ €', 80], ['Après une hausse de 10 %, un loyer est de 660 €. Avant : @ €', 600]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule le taux d\'évolution.',
        ...rmp([['De 50 € à 60 € : hausse de @ %', 20], ['De 80 € à 68 € : baisse de @ %', 15], ['De 200 à 250 : hausse de @ %', 25]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Sur une carte à l\'échelle 1/25 000, quelle distance réelle représentent 6 cm ? Quelle longueur sur la carte pour 4 km ?',
        corr: cm1Redac('Distance réelle', '6 × 25 000 = 150 000 cm = 1,5 km', '6 cm représentent 1,5 km.') + cm1Redac('Longueur sur la carte', '4 km = 400 000 cm ; 400 000 : 25 000 = 16', '4 km sont représentés par 16 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un prix augmente de 10 %, puis de 20 %. Quelle est l\'augmentation globale ?',
        corr: cm1Redac('Coefficient global', '1,1 × 1,2 = 1,32', 'L\'augmentation globale est de 32 % (et non 30 %).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un article baisse de 25 %. De quel pourcentage doit-il augmenter pour revenir à son prix initial ?',
        corr: cm1Redac('Raisonnement', { suite: ['Après la baisse : 0,75x', 'Il faut multiplier par k avec 0,75 × k = 1', 'k = 1 : 0,75 ≈ 1,333'] }, 'Il doit augmenter d\'environ 33,3 % (un tiers).') },
    ] },
  { titre: 'Fonctions affines en situation', duree: '40 min',
    attendus: ['Modéliser une situation par une fonction affine', 'Résoudre un problème de comparaison de tarifs', 'Trouver la fonction affine à partir de deux valeurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la fonction qui modélise la situation.',
        ...chx([['Abonnement de 20 € et 3 € par séance :', 'f(x) = 3x + 20', 'f(x) = 20x + 3 · f(x) = 3x + 20 · f(x) = 23x'], ['Prix de 2,40 € le kilo :', 'f(x) = 2,4x', 'f(x) = 2,4x · f(x) = x + 2,4 · f(x) = 2,4'], ['Bougie de 12 cm qui perd 1,5 cm par heure :', 'f(x) = 12 − 1,5x', 'f(x) = 1,5x − 12 · f(x) = 12 − 1,5x · f(x) = 12x − 1,5']]) },
      { etoiles: 2, col: 1, consigne: 'Location d\'une voiture : 30 € par jour, plus 0,20 € par km.',
        ...rmp([['Prix pour x km : f(x) = @x + @', '0,2', 30], ['Prix pour 150 km : @ €', 60], ['Nombre de km pour 90 € : @', 300]]) },
      { etoiles: 2, col: 1, consigne: 'Température en degrés Fahrenheit : F = 1,8 × C + 32 (C en degrés Celsius).',
        ...rmp([['20 °C = @ °F', 68], ['100 °C = @ °F', 212], ['−40 °C = @ °F', '−40'], ['86 °F = @ °C', 30]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un réservoir de 60 L se vide à 4 L par minute. Exprime le volume V(t) au bout de t minutes. Quel volume reste-t-il après 6 min ? Quand est-il vide ?',
        corr: cm1Redac('Fonction', 'V(t) = 60 − 4t', '') + cm1Redac('Après 6 min', '60 − 4 × 6 = 36', 'Il reste 36 L.') + cm1Redac('Réservoir vide', { suite: ['60 − 4t = 0', 't = 15'] }, 'Le réservoir est vide au bout de 15 min.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Forfait A : 15 € par mois, appels illimités. Forfait B : 5 € par mois plus 0,10 € par minute. Pour quelle durée d\'appel les deux forfaits coûtent-ils le même prix ?',
        corr: cm1Redac('Même prix', { suite: ['5 + 0,1t = 15', '0,1t = 10', 't = 100'] }, 'Pour 100 minutes, les deux forfaits coûtent 15 € ; au-delà, A est plus avantageux.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'L\'eau coûte 3,50 € le m³, plus un abonnement annuel de 60 €. La facture annuelle de la famille Martin est de 508 €. Combien de m³ a-t-elle consommés ?',
        corr: cm1Redac('Mise en équation', { suite: ['60 + 3,5x = 508', '3,5x = 448', 'x = 128'] }, 'La famille Martin a consommé 128 m³.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve la fonction affine f telle que f(2) = 1 et f(6) = 9, puis l\'antécédent de 0.',
        corr: cm1Redac('Coefficient', '(9 − 1) : (6 − 2) = 2', '') + cm1Redac('Ordonnée à l\'origine', 'f(2) = 2 × 2 + b = 1, donc b = −3', 'f(x) = 2x − 3.') + cm1Redac('Antécédent de 0', '2x − 3 = 0, donc x = 1,5', 'L\'antécédent de 0 est 1,5.') },
    ] },
  { titre: 'Fonctions linéaires et affines', duree: '45 min', brevet: true,
    attendus: ['Automatismes : fonctions affines et pourcentages', 'Comparer des tarifs avec des fonctions affines', 'Étudier des évolutions successives'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['f(x) = 3x + 1 ; f(2) =', 7], ['Fonction linéaire :', 'f(x) = 5x', ['f(x) = 2x + 1', 'f(x) = 5x', 'f(x) = x²']], ['Augmenter de 5 %, c\'est multiplier par :', '1,05', ['0,05', '1,05', '1,5']], ['g(x) = −2x + 4 ; antécédent de 0 :', 2], ['Ordonnée à l\'origine de f(x) = 7 − 3x :', 7], ['Une droite qui passe par l\'origine représente une fonction :', 'linéaire', ['linéaire', 'constante', 'quelconque']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Une salle de sport propose deux formules. Formule 1 : 12 € la séance. Formule 2 : 60 € d\'inscription, puis 7 € la séance. On note x le nombre de séances.'
          + tab([['Nombre de séances', 5, 10, 15], ['Prix formule 1 (€)', '', '', ''], ['Prix formule 2 (€)', '', '', '']])
          + qs(['Compléter le tableau.', 'Exprimer en fonction de x le prix f(x) avec la formule 1, puis g(x) avec la formule 2. Laquelle de ces fonctions est linéaire ?', 'Résoudre l\'équation 12x = 60 + 7x et interpréter le résultat.', 'Lucas a un budget de 200 €. Avec quelle formule peut-il faire le plus de séances ?']),
        corr: tab([['Nombre de séances', 5, 10, 15], ['Prix formule 1 (€)', 60, 120, 180], ['Prix formule 2 (€)', 95, 130, 165]])
          + cm1Redac('Fonctions', { suite: ['f(x) = 12x (linéaire)', 'g(x) = 7x + 60 (affine)'] }, '') + cm1Redac('Équation', { suite: ['12x − 7x = 60', '5x = 60', 'x = 12'] }, 'Pour 12 séances, les deux formules coûtent le même prix : 144 €.')
          + cm1Redac('Budget de 200 €', { suite: ['Formule 1 : 200 : 12 ≈ 16,7, soit 16 séances', 'Formule 2 : (200 − 60) : 7 = 20 séances'] }, 'Avec la formule 2, Lucas fait 20 séances.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Une console coûtait 450 €. Son prix a augmenté de 12 % en 2025, puis baissé de 12 % en 2026.'
          + qs(['Calculer son prix après la hausse.', 'Calculer son prix après la baisse.', 'Le vendeur affirme : « La console est revenue à son prix de départ. » A-t-il raison ?', 'Quel est le pourcentage d\'évolution global ?']),
        corr: cm1Redac('Après la hausse', '450 × 1,12 = 504', 'La console coûte 504 €.') + cm1Redac('Après la baisse', '504 × 0,88 = 443,52', 'Elle coûte 443,52 €.')
          + cm1Redac('Affirmation', '443,52 &lt; 450', 'Il a tort : la console coûte moins cher qu\'au départ.') + cm1Redac('Évolution globale', '1,12 × 0,88 = 0,985 6', 'C\'est une baisse de 1,44 %.') },
    ] },
];
})();

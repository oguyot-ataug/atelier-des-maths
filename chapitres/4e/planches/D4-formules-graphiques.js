/* 4e · Planches : Formules et graphiques (D4) -- produire une formule, tableau de valeurs, graphique, lecture graphique. */
(() => {
const T = cm1Tex, R = P3.R;
PLANCHES['4e|Formules et graphiques'] = [
  { titre: 'Produire une formule', duree: '30 min',
    attendus: ['Produire une formule littérale représentant la dépendance de deux grandeurs'],
    exos: [
      { etoiles: 1, consigne: 'Écris une formule.', ...P3.rmp([['Le périmètre p d\'un carré de côté c : @', T('p = 4c')], ['Le prix P de n cahiers à 3 € : @', T('P = 3n')], ['L\'aire A d\'un rectangle de longueur 8 et de largeur ℓ : @', T('A = 8\\ell')]], 4) },
      { etoiles: 2, cahier: true, consigne: 'Une salle de sport coûte 30 € d\'inscription, puis 5 € par séance. Exprime le prix P en fonction du nombre n de séances, puis calcule P pour 12 séances.', corr: cm1Redac('Prix pour 12 séances', { suite: [T('P = 30 + 5n'), T('P = 30 + 5 \\times 12 = 90')] }, 'Pour 12 séances, on paie 90 €.') },
      { etoiles: 3, cahier: true, consigne: 'On enlève quatre carrés de côté x aux coins d\'un rectangle de 20 cm sur 13 cm. Exprime l\'aire restante A en fonction de x.', corr: cm1Redac('Aire restante', T('A = 20 \\times 13 - 4x^2 = 260 - 4x^2'), 'L\'aire restante est 260 − 4x² cm².') },
    ] },
  { titre: 'Tableau de valeurs et graphique', duree: '35 min',
    attendus: ['Calculer des valeurs avec une formule', 'Représenter la dépendance par un graphique'],
    exos: [
      { etoiles: 1, consigne: 'Complète le tableau pour P = 30 + 5n.', eleve: cm1Tableau(['n', '0', '2', '4', '6', '10'], [['P', '', '', '', '', '']]), corr: cm1Tableau(['n', '0', '2', '4', '6', '10'], [['P', R(30), R(40), R(50), R(60), R(80)]]) },
      { etoiles: 2, consigne: 'Complète le tableau pour A = 260 − 4x².', eleve: cm1Tableau(['x', '0', '1', '2', '3', '4', '5', '6'], [['A', '', '', '', '', '', '', '']]), corr: cm1Tableau(['x', '0', '1', '2', '3', '4', '5', '6'], [['A', ...[0, 1, 2, 3, 4, 5, 6].map(x => R(260 - 4 * x * x))]]) },
      { etoiles: 3, cahier: true, consigne: 'Place les points du tableau précédent dans un repère (1 cm pour 1 en abscisse, 1 cm pour 20 cm² en ordonnée) et relie-les. Les points sont-ils alignés ?', corr: cm1Redac('Les points sont-ils alignés ?', '', 'Non : les points sont sur une courbe qui descend de plus en plus vite. L\'aire n\'est pas proportionnelle à x.') },
    ] },
  { titre: 'Lire un graphique', duree: '25 min',
    attendus: ['Lire des valeurs sur l\'axe des abscisses ou des ordonnées'],
    exos: [
      { etoiles: 1, consigne: 'Le four : 20 °C au départ, 52 °C à 2 min, 78 °C à 4 min, 97 °C à 6 min, 110 °C à 8 min. Complète.', ...P3.rmp([['Température au bout de 4 min : @', '78 °C'], ['Temps pour atteindre 110 °C : @', '8 min'], ['Augmentation entre 2 et 6 min : @', '45 °C']], 4) },
      { etoiles: 2, consigne: 'Un taxi : 4 € de prise en charge, puis 2 € par kilomètre. La droite qui représente le prix passe par (0 ; 4), (5 ; 14) et (10 ; 24). Complète.', ...P3.rmp([['Prix pour 5 km : @ €', 14], ['Prix pour 10 km : @ €', 24], ['Distance pour 24 € : @ km', 10], ['Le prix est-il proportionnel à la distance ? @', 'non']], 4) },
      { etoiles: 2, consigne: 'Une bougie de 12 cm se consume : sa hauteur h (en cm) après t heures est h = 12 − 0,5t. Complète.', ...P3.rmp([['t = 0 : h = @', 12], ['t = 4 : h = @', 10], ['t = 10 : h = @', 7], ['La bougie est consumée après @ h', 24]], 4) },
      { etoiles: 2, cahier: true, consigne: 'Une lecture graphique donne-t-elle une valeur exacte ? Explique.', corr: cm1Redac('Lecture graphique', '', 'Non : elle donne une valeur approchée, qui dépend de la précision du tracé. Avec une formule, on peut calculer la valeur exacte.') },
    ] },
  { titre: 'Programmes de calcul et formules', duree: '35 min',
    attendus: ['Appliquer un programme de calcul à un nombre, puis à une variable', 'Écrire la formule d\'un programme de calcul', 'Remonter un programme de calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme : choisir un nombre ; le multiplier par 3 ; ajouter 4. Complète.', ...P3.rmp([['Avec 5 : @', 19], ['Avec 0 : @', 4], ['Avec −2 : @', '−2'], ['Avec x : @', T('3x + 4')]]) },
      { etoiles: 1, col: 1, consigne: 'Programme : choisir un nombre ; ajouter 2 ; multiplier par 5. Complète.', ...P3.rmp([['Avec 1 : @', 15], ['Avec 4 : @', 30], ['Avec −2 : @', 0], ['Avec x : @', T('5(x + 2)')]]) },
      { etoiles: 2, consigne: 'Écris la formule de chaque programme (x est le nombre choisi).', ...P3.rmp([['multiplier par 2, puis ajouter 7 : @', T('2x + 7')], ['ajouter 7, puis multiplier par 2 : @', T('2(x + 7)')], ['élever au carré, puis soustraire 1 : @', T('x^2 - 1')], ['soustraire 1, puis élever au carré : @', T('(x - 1)^2')]], 4) },
      { etoiles: 2, cahier: true, consigne: 'Programme : choisir un nombre ; le multiplier par 4 ; soustraire 6. On obtient 30. Quel nombre a-t-on choisi ? (Remonte le programme.)',
        corr: cm1Redac('Avant de soustraire 6', { nom: 'A', lignes: ['30 + 6', '36'] }, '') + cm1Redac('Nombre choisi', { nom: 'N', lignes: [cm1Frac(36, 4), '9'] }, 'On a choisi 9 (vérification : 9 × 4 − 6 = 30).') },
      { etoiles: 3, cahier: true, consigne: 'Programme A : choisir un nombre, ajouter 3, multiplier par 2, soustraire 6. Démontre que le programme A donne toujours le double du nombre choisi.',
        corr: cm1Redac('Résultat pour un nombre x', { nom: 'R', lignes: ['2(x + 3) − 6', '2x + 6 − 6', '2x'] }, 'Pour tout nombre x, le résultat est 2x : le double du nombre choisi.') },
    ] },
  { titre: 'Formules dans la vie courante', duree: '35 min',
    attendus: ['Utiliser une formule pour calculer', 'Juger de la vraisemblance d\'un résultat', 'Comparer deux offres avec des formules'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Distance d\'arrêt d\'une voiture sur route sèche : d = 0,3v + 0,005v² (d en m, v en km/h). Complète.', ...P3.rmp([['v = 50 : d = @ m', '27,5'], ['v = 90 : d = @ m', '67,5'], ['v = 130 : d = @ m', '123,5']]) },
      { etoiles: 1, col: 1, consigne: 'Vraisemblable ou non ? Entoure.', ...P3.ch([['La taille d\'un élève de 4e : 1,58 m', 'oui'], ['La masse d\'un élève de 4e : 450 kg', 'non'], ['La distance d\'arrêt à 50 km/h : 2 km', 'non']], 'oui · non') },
      { etoiles: 2, consigne: 'Pour convertir des degrés Celsius C en degrés Fahrenheit F, on utilise F = 1,8C + 32. Complète.', ...P3.rmp([['C = 0 : F = @', 32], ['C = 100 : F = @', 212], ['C = 37 : F = @', '98,6'], ['C = −10 : F = @', 14]], 4) },
      { etoiles: 2, cahier: true, consigne: 'Cinéma : tarif A, 9 € la place ; tarif B, carte de 30 € puis 6 € la place. Écris le prix pour n places avec chaque tarif, puis trouve à partir de combien de places le tarif B est le moins cher.',
        corr: cm1Redac('Prix avec chaque tarif', { suite: [T('A = 9n'), T('B = 30 + 6n')] }, '')
          + cm1Redac('Prix pour 10 places', { suite: [T('A = 9 \\times 10 = 90'), T('B = 30 + 6 \\times 10 = 90')] }, '')
          + cm1Redac('Prix pour 11 places', { suite: [T('A = 9 \\times 11 = 99'), T('B = 30 + 6 \\times 11 = 96')] }, 'Les deux tarifs coûtent autant pour 10 places ; le tarif B est le moins cher à partir de 11 places.') },
      { etoiles: 3, cahier: true, consigne: 'Le périmètre d\'un rectangle de longueur L et de largeur ℓ est P = 2(L + ℓ). Un rectangle a un périmètre de 34 cm et une longueur de 11 cm. Calcule sa largeur.',
        corr: cm1Redac('Demi-périmètre', { nom: 'L + ℓ', lignes: [cm1Frac(34, 2), '17'] }, '') + cm1Redac('Largeur', { nom: 'ℓ', lignes: ['17 − 11', '6'] }, 'La largeur mesure 6 cm.') },
    ] },
];
})();

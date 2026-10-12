/* ============================================================
   3e · Planches : Statistiques (D4)
   Moyenne et moyenne pondérée ; médiane et étendue ; histogramme et diagrammes ; comparer des séries ;
   Objectif Brevet.
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs, tab, histo } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const hTailles = histo([[140, 150, 3], [150, 160, 8], [160, 170, 11], [170, 180, 6], [180, 190, 2]], { u: 4.4, v: 10, gy: 2, nx: 'taille (cm)', ny: 'effectif', px: 150 });
const hSommeil = histo([[6, 7, 15], [7, 8, 42], [8, 9, 48], [9, 10, 15]], { u: 55, v: 2.6, gy: 10, nx: 'durée (h)', ny: 'nombre d\'élèves', px: 230, couleur: '#B9DDA0' });
PLANCHES['3e|Statistiques'] = [
  { titre: 'Moyenne et moyenne pondérée', duree: '35 min',
    attendus: ['Calculer la moyenne d\'une série', 'Calculer une moyenne pondérée (effectifs, coefficients)', 'Utiliser la moyenne pour trouver une valeur manquante'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la moyenne.',
        ...rmp([['12 ; 15 ; 9 ; 14 : @', '12,5'], ['7 ; 8 ; 8 ; 10 ; 12 : @', 9], ['−3 ; 5 ; 4 ; −2 : @', 1]]) },
      { etoiles: 2, col: 1, consigne: 'Voici les notes d\'une classe à un contrôle.',
        eleve: tab([['Note', 8, 10, 12, 15], ['Effectif', 3, 5, 8, 4]]) + rmp([['Effectif total : @', 20], ['Moyenne : @', '11,5']]).eleve,
        corr: tab([['Note', 8, 10, 12, 15], ['Effectif', 3, 5, 8, 4]]) + rmp([['Effectif total : @', 20], ['Moyenne : @', '11,5']]).corr },
      { etoiles: 2, col: 1, consigne: 'Inès a eu 14 (coefficient 2), 9 (coefficient 3) et 16 (coefficient 1).',
        ...rmp([['Somme des coefficients : @', 6], ['Moyenne (au dixième) : @', '11,8']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['La moyenne de 5 notes est 12 : leur somme est @', 60], ['Avec une 6e note de 18, la moyenne devient @', 13], ['Moyenne de 12,4 sur 5 contrôles : pour avoir 13 sur 6 contrôles, il faut @ au 6e', 16]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La moyenne est toujours l\'une des valeurs de la série.', 'faux'], ['Si on ajoute 2 à toutes les valeurs, la moyenne augmente de 2.', 'vrai'], ['Une seule valeur très grande peut beaucoup changer la moyenne.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Temps de trajet de 20 élèves : 6 élèves entre 0 et 10 min ; 10 entre 10 et 20 min ; 4 entre 20 et 30 min. Estime le temps de trajet moyen, en prenant le centre de chaque classe.',
        corr: cm1Redac('Moyenne estimée', '(5 × 6 + 15 × 10 + 25 × 4) : 20 = 280 : 20 = 14', 'Le temps de trajet moyen est d\'environ 14 min.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans une classe, la moyenne des 25 élèves est 11,2. Cinq nouveaux élèves arrivent, avec une moyenne de 14. Quelle est la nouvelle moyenne de la classe ?',
        corr: cm1Redac('Sommes des notes', { suite: ['25 × 11,2 = 280', '5 × 14 = 70'] }, '') + cm1Redac('Nouvelle moyenne', '(280 + 70) : 30 ≈ 11,67', 'La nouvelle moyenne est d\'environ 11,7.') },
    ] },
  { titre: 'Médiane et étendue', duree: '35 min',
    attendus: ['Déterminer la médiane d\'une série (effectif pair ou impair)', 'Calculer l\'étendue', 'Interpréter médiane et étendue'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Médiane de 3 ; 5 ; 8 ; 11 ; 14 : @', 8], ['Médiane de 2 ; 4 ; 7 ; 9 ; 10 ; 15 : @', 8], ['Médiane de 9 ; 2 ; 6 ; 4 ; 13 : @', 6], ['Étendue de 12 ; 3 ; 18 ; 7 : @', 15]]) },
      { etoiles: 2, col: 1, consigne: 'Pointures des élèves d\'une classe.',
        eleve: tab([['Pointure', 37, 38, 39, 40, 41], ['Effectif', 2, 5, 7, 4, 2]]) + rmp([['Effectif total : @', 20], ['Médiane : @', 39], ['Étendue : @', 4]]).eleve,
        corr: tab([['Pointure', 37, 38, 39, 40, 41], ['Effectif', 2, 5, 7, 4, 2]]) + rmp([['Effectif total : @', 20], ['Médiane : @', 39], ['Étendue : @', 4]]).corr },
      { etoiles: 2, col: 1, consigne: 'Températures maximales d\'une semaine : 12 ; 15 ; 9 ; 14 ; 18 ; 11 ; 16 (en °C).',
        ...rmp([['Médiane : @ °C', 14], ['Moyenne (au dixième) : @ °C', '13,6'], ['Étendue : @ °C', 9]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'interprétation correcte.',
        ...chx([['Le salaire médian d\'une entreprise est 2 000 € :', 'la moitié des salariés gagne au plus 2 000 €', 'tous gagnent 2 000 € · la moitié des salariés gagne au plus 2 000 € · la moyenne est 2 000 €'], ['L\'étendue d\'une série est 0 :', 'toutes les valeurs sont égales', 'la moyenne est 0 · toutes les valeurs sont égales · il n\'y a pas de valeur']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Deux classes ont la même moyenne, 11. L\'étendue des notes est 4 dans la classe A et 15 dans la classe B. Qu\'en penses-tu ?',
        corr: cm1Redac('Comparaison', '', 'Les moyennes sont égales, mais les notes de la classe B sont beaucoup plus dispersées : la classe A est plus homogène.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Série : 4 ; 8 ; 9 ; 10 ; 10 ; 11 ; 25. Calcule la moyenne et la médiane. Laquelle représente le mieux la série ?',
        corr: cm1Redac('Moyenne', '77 : 7 = 11', '') + cm1Redac('Médiane', 'La 4e valeur (sur 7) : 10', '') + cm1Redac('Conclusion', '', 'La valeur 25 est exceptionnelle et tire la moyenne vers le haut : la médiane (10) représente mieux la série.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve une série de 5 nombres entiers de médiane 10, de moyenne 12 et d\'étendue 8.',
        corr: cm1Redac('Exemple', { suite: ['Somme : 5 × 12 = 60', 'La plus petite valeur a, la plus grande a + 8, la valeur du milieu 10.', 'Avec a = 8 : 8 ; 10 ; 10 ; 16 ; 16 (somme 60)'] }, 'La série 8 ; 10 ; 10 ; 16 ; 16 convient (d\'autres sont possibles).') },
    ] },
  { titre: 'Histogrammes et diagrammes', duree: '40 min',
    attendus: ['Lire un histogramme', 'Calculer des fréquences et une moyenne à partir des classes', 'Choisir et construire une représentation adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Tailles des élèves de 3e d\'un collège.', ...fig(hTailles, [['Nombre d\'élèves de 160 à 170 cm : @', 11], ['Effectif total : @', 30], ['Classe la plus représentée : de @ à @ cm', 160, 170]]) },
      { etoiles: 2, col: 1, consigne: 'Avec l\'histogramme des tailles (arrondis au dixième).', ...fig(hTailles, [['Fréquence de la classe de 150 à 160 cm : @ %', '26,7'], ['Moyenne estimée (avec les centres des classes) : @ cm', '163,7'], ['La médiane est dans la classe de @ à @ cm', 160, 170]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la représentation la mieux adaptée.',
        ...chx([['Répartition des votes à une élection (en %) :', 'diagramme circulaire', 'diagramme circulaire · courbe · histogramme'], ['Évolution de la température dans la journée :', 'courbe', 'diagramme circulaire · courbe · histogramme']]) },
      { etoiles: 2, col: 1, consigne: 'Dans un diagramme circulaire, complète.',
        ...rmp([['Une part de 25 % : angle de @°', 90], ['Une part de 10 % : angle de @°', 36], ['Un secteur de 54° représente @ %', 15]]) },
      { etoiles: 2, col: 1, consigne: 'Dans un tableur, les effectifs sont en B2:F2. Entoure la bonne formule.',
        ...chx([['Effectif total, en G2 :', '=SOMME(B2:F2)', '=SOMME(B2:F2) · =B2+F2 · =SOMME(B2;F2)']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis l\'histogramme des durées de sommeil d\'une classe : de 6 à 7 h : 4 élèves ; de 7 à 8 h : 9 ; de 8 à 9 h : 12 ; de 9 à 10 h : 5.',
        corr: `<div style="text-align:center;">${histo([[6, 7, 4], [7, 8, 9], [8, 9, 12], [9, 10, 5]], { u: 50, v: 9, gy: 2, nx: 'durée (h)', ny: 'effectif', px: 230 })}</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: '40 % des 250 élèves d\'un collège font du sport en club ; 30 % d\'entre eux jouent au football. Combien d\'élèves jouent au football en club ? Quel pourcentage du collège ?',
        corr: cm1Redac('Sportifs en club', '0,4 × 250 = 100', '') + cm1Redac('Footballeurs', '0,3 × 100 = 30', '30 élèves jouent au football en club.') + cm1Redac('Pourcentage', '30 : 250 = 0,12', 'Cela représente 12 % des élèves (0,4 × 0,3 = 0,12).') },
    ] },
  { titre: 'Comparer des séries', duree: '40 min',
    attendus: ['Comparer deux séries avec la moyenne, la médiane et l\'étendue', 'Calculer une moyenne de groupes réunis', 'Utiliser un tableur pour des statistiques'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Si la médiane est 12, au moins la moitié des valeurs sont inférieures ou égales à 12.', 'vrai'], ['La moyenne et la médiane sont toujours égales.', 'faux'], ['L\'étendue de notes sur 20 est au plus 20.', 'vrai'], ['Ajouter une valeur ne change jamais la médiane.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'La 3e A (24 élèves) a 11,5 de moyenne, la 3e B (26 élèves) a 12,5.',
        ...rmp([['Somme des notes en 3e A : @', 276], ['Somme des notes en 3e B : @', 325], ['Moyenne des deux classes réunies : @', '12,02']]) },
      { etoiles: 2, col: 1, consigne: 'Dans un tableur, les notes sont en B2:B31. Entoure la bonne formule.',
        ...chx([['Moyenne :', '=MOYENNE(B2:B31)', '=MOYENNE(B2:B31) · =SOMME(B2:B31) · =MOYENNE(B2;B31)'], ['Médiane :', '=MEDIANE(B2:B31)', '=MEDIANE(B2:B31) · =MILIEU(B2:B31) · =MOYENNE(B2:B31)/2'], ['Étendue :', '=MAX(B2:B31)-MIN(B2:B31)', '=MAX(B2:B31)-MIN(B2:B31) · =MAX(B2:B31) · =ETENDUE(B2:B31)']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Scores de deux joueurs sur 5 parties. Alex : 12 ; 15 ; 9 ; 18 ; 16. Sam : 14 ; 14 ; 13 ; 15 ; 14. Compare-les avec la moyenne, la médiane et l\'étendue.',
        corr: cm1Redac('Alex', { suite: ['Moyenne : 70 : 5 = 14', 'Médiane : 15 (série rangée : 9 ; 12 ; 15 ; 16 ; 18)', 'Étendue : 18 − 9 = 9'] }, '') + cm1Redac('Sam', { suite: ['Moyenne : 70 : 5 = 14', 'Médiane : 14', 'Étendue : 15 − 13 = 2'] }, 'Même moyenne ; Alex fait de plus grands scores, mais Sam est beaucoup plus régulier.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Précipitations mensuelles d\'une ville (en mm) : 60 ; 52 ; 48 ; 55 ; 61 ; 40 ; 30 ; 35 ; 58 ; 75 ; 80 ; 70. Calcule la moyenne, la médiane et l\'étendue.',
        corr: cm1Redac('Moyenne', '664 : 12 ≈ 55,3', '') + cm1Redac('Médiane', { suite: ['Série rangée : 30 ; 35 ; 40 ; 48 ; 52 ; 55 ; 58 ; 60 ; 61 ; 70 ; 75 ; 80', '(55 + 58) : 2 = 56,5'] }, '') + cm1Redac('Étendue', '80 − 30 = 50', 'Moyenne ≈ 55,3 mm, médiane 56,5 mm, étendue 50 mm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Zoé a 13 de moyenne sur 4 contrôles. Elle veut 14 de moyenne après le 5e contrôle. Est-ce possible ?',
        corr: cm1Redac('Raisonnement', { suite: ['Somme des 4 notes : 4 × 13 = 52', 'Somme visée : 5 × 14 = 70', '70 − 52 = 18'] }, 'C\'est possible : il lui faut au moins 18 au 5e contrôle.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La médiane d\'une série de 9 nombres est 20. On ajoute le nombre 50. La médiane peut-elle valoir 30 ? Explique.',
        corr: cm1Redac('Raisonnement', { suite: ['Avec 10 valeurs, la médiane est la moyenne des 5e et 6e valeurs rangées.', 'La 5e valeur rangée reste 20, car on ajoute une valeur plus grande que la médiane.', 'Pour obtenir 30, il faudrait une 6e valeur de 40.'] }, 'C\'est possible si la 6e valeur de la série rangée (après l\'ajout) vaut 40, par exemple avec 1 ; 2 ; 3 ; 4 ; 20 ; 40 ; 41 ; 42 ; 43 et 50.') },
    ] },
  { titre: 'Statistiques', duree: '45 min', brevet: true,
    attendus: ['Automatismes : moyenne, médiane, étendue, pourcentages', 'Analyser une série issue d\'une situation réelle', 'Exploiter un histogramme'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Moyenne de 8 ; 12 ; 13 :', 11], ['Médiane de 4 ; 7 ; 9 ; 12 ; 20 :', 9], ['Étendue de 5 ; 17 ; 9 ; 11 :', 12], ['30 % de 200 :', 60], ['Une fréquence de 0,35 correspond à :', '35 %', ['0,35 %', '3,5 %', '35 %']], ['Médiane de 3 ; 6 ; 8 ; 10 :', '7', ['6', '7', '8']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Lors d\'une compétition d\'athlétisme handisport, voici le nombre de médailles remportées par les 8 athlètes d\'une équipe : 1 ; 3 ; 2 ; 1 ; 5 ; 2 ; 1 ; 1.'
          + qs(['Calculer le nombre moyen de médailles par athlète.', 'Déterminer la médiane et l\'étendue de cette série.', 'Quel pourcentage des athlètes a remporté au moins 2 médailles ?', 'Un journaliste écrit : « La moitié des athlètes de l\'équipe n\'ont remporté qu\'une seule médaille. » A-t-il raison ?']),
        corr: cm1Redac('Moyenne', '(1 + 3 + 2 + 1 + 5 + 2 + 1 + 1) : 8 = 16 : 8 = 2', 'En moyenne, 2 médailles par athlète.')
          + cm1Redac('Médiane et étendue', { suite: ['Série rangée : 1 ; 1 ; 1 ; 1 ; 2 ; 2 ; 3 ; 5', 'Médiane : (1 + 2) : 2 = 1,5', 'Étendue : 5 − 1 = 4'] }, '')
          + cm1Redac('Au moins 2 médailles', '4 athlètes sur 8 : 4 : 8 = 0,5', 'Cela fait 50 % des athlètes.') + cm1Redac('Affirmation', '4 athlètes sur 8 ont une seule médaille.', 'Il a raison.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: `On a demandé à 120 élèves leur durée de sommeil un soir de semaine. Voici les résultats.<div style="text-align:center;margin:4px 0;">${hSommeil}</div>`
          + qs(['Combien d\'élèves dorment au moins 8 h ?', 'Quel pourcentage des élèves cela représente-t-il ?', 'Estimer la durée moyenne de sommeil, en utilisant le centre de chaque classe.', 'Les médecins recommandent au moins 8 h de sommeil. « Plus de la moitié des élèves dort assez. » Est-ce vrai ?']),
        corr: cm1Redac('Au moins 8 h', '48 + 15 = 63', '63 élèves dorment au moins 8 h.') + cm1Redac('Pourcentage', '63 : 120 = 0,525', 'Cela représente 52,5 % des élèves.')
          + cm1Redac('Moyenne estimée', '(6,5 × 15 + 7,5 × 42 + 8,5 × 48 + 9,5 × 15) : 120 = 963 : 120 ≈ 8,03', 'Les élèves dorment en moyenne environ 8 h.') + cm1Redac('Affirmation', '52,5 % &gt; 50 %', 'C\'est vrai, mais de peu.') },
    ] },
];
})();

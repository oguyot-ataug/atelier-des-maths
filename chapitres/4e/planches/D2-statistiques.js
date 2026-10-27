/* ============================================================
   4e · Planches : Statistiques (D2)
   Moyenne (simple et pondérée, à partir d'un tableau) ; médiane (effectif impair, pair) ;
   étendue ; moyenne ou médiane : choisir, effet d'une valeur extrême.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
const K = '#1F3A5C';
// Diagramme en barres : nombre de frères et sœurs dans une classe.
const barres = (() => { const v = [[0, 4], [1, 10], [2, 7], [3, 3], [4, 1]], X = i => 40 + i * 30, Y = n => 110 - n * 9; let g = '';
  for(let n = 0; n <= 10; n += 2) g += `<line x1="34" y1="${Y(n)}" x2="186" y2="${Y(n)}" stroke="#D5E2EE"/>` + DS.tx([30, Y(n) + 4], String(n), { a: 'end', fs: 9 });
  v.forEach(([x, n], i) => { g += `<rect x="${X(i) + 4}" y="${Y(n)}" width="18" height="${n * 9}" fill="#9CC8E8" stroke="${K}" stroke-width="1.2"/>` + DS.tx([X(i) + 13, 124], String(x), { fs: 10 }); });
  return DS.fig(196, 140, g + DS.ln([34, 110], [190, 110], K, 1.4) + DS.ln([34, 110], [34, 10], K, 1.4) + DS.tx([112, 138], 'nombre de frères et sœurs', { fs: 9 }) + DS.tx([38, 8], 'effectif', { a: 'start', fs: 9 }), 175); })();
PLANCHES['4e|Statistiques'] = [
  { titre: 'Moyenne simple et moyenne pondérée', duree: '35 min',
    attendus: ['Calculer une moyenne', 'Calculer une moyenne pondérée à partir d\'un tableau d\'effectifs', 'Calculer une moyenne avec des coefficients'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la moyenne de chaque série.',
        ...rmp([['12 ; 15 ; 9 ; 14 : @', '12,5'], ['3 ; 8 ; 5 ; 6 ; 8 : @', 6], ['−2 ; 4 ; 7 ; −1 : @', 2]]) },
      { etoiles: 2, col: 1, consigne: 'Notes d\'une classe : 8 (3 élèves), 10 (5 élèves), 12 (8 élèves), 15 (4 élèves).',
        ...rmp([['Effectif total : @ élèves', 20], ['Somme des notes : @', 230], ['Moyenne de la classe : @', '11,5']]) },
      { etoiles: 2, col: 1, consigne: 'Inès a eu 14 (coefficient 2), 9 (coefficient 1) et 16 (coefficient 3).',
        ...rmp([['Somme des coefficients : @', 6], ['Moyenne : @ (au dixième)', '14,2']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La moyenne est toujours une des valeurs de la série.', 'faux'], ['Si on ajoute 2 à toutes les valeurs, la moyenne augmente de 2.', 'vrai'], ['La moyenne de 0 et 20 est 10.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Après 4 contrôles, Tom a 11 de moyenne. Quelle note doit-il avoir au 5e contrôle pour avoir 12 de moyenne ?',
        corr: cm1Redac('Total des points', { suite: ['Après 4 contrôles : 4 × 11 = 44 points', 'Pour 12 de moyenne sur 5 contrôles : 5 × 12 = 60 points'] }, 'Il lui faut 60 points au total.') + cm1Redac('Note nécessaire', '60 − 44 = 16', 'Tom doit avoir 16 au 5e contrôle.') },
      { etoiles: 1, col: 1, consigne: 'Calcule la moyenne.', ...P3.rmp([['12 ; 15 ; 9 : @', 12], ['10 ; 14 ; 16 ; 8 : @', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule la moyenne pondérée.', ...P3.rmp([['10 (coef. 1) et 16 (coef. 2) : @', 14], ['8 (coef. 3) et 12 (coef. 1) : @', 9]], 2) },
    ] },
  { titre: 'La médiane', duree: '35 min',
    attendus: ['Ranger une série dans l\'ordre croissant', 'Déterminer la médiane (effectif impair ou pair)', 'Interpréter la médiane'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Range la série dans l\'ordre croissant, puis donne sa médiane.',
        ...rmp([['7 ; 3 ; 9 ; 5 ; 4 → @ ; médiane @', '3 ; 4 ; 5 ; 7 ; 9', 5], ['12 ; 8 ; 15 ; 10 ; 8 ; 20 ; 11 → @ ; médiane @', '8 ; 8 ; 10 ; 11 ; 12 ; 15 ; 20', 11]], 6) },
      { etoiles: 2, col: 1, consigne: 'Donne la médiane (effectif pair).',
        ...rmp([['4 ; 6 ; 9 ; 13 : @', '7,5'], ['10 ; 12 ; 12 ; 15 ; 18 ; 21 : @', '13,5'], ['2 ; 5 ; 5 ; 5 ; 8 ; 9 ; 11 ; 30 : @', '6,5']]) },
      { etoiles: 2, col: 1, consigne: 'Une série a 25 valeurs rangées dans l\'ordre croissant. Complète.',
        ...rmp([['La médiane est la @e valeur.', 13], ['Il y a @ valeurs en dessous de la médiane.', 12]]) },
      { etoiles: 2, col: 1, consigne: 'Ce diagramme donne le nombre de frères et sœurs des élèves d\'une classe.',
        eleve: `<div style="text-align:center;">${barres}</div>` + rmp([['Effectif total : @ élèves', 25], ['Médiane : @', 1], ['Moyenne : @', '1,48']]).eleve,
        corr: `<div style="text-align:center;">${barres}</div>` + rmp([['Effectif total : @ élèves', 25], ['Médiane : @', 1], ['Moyenne : @', '1,48']]).corr },
      { etoiles: 3, cahier: true, consigne: 'Temps (en minutes) mis par 8 élèves pour venir au collège : 12 ; 25 ; 8 ; 15 ; 30 ; 10 ; 18 ; 5. Détermine la médiane et explique ce qu\'elle signifie.',
        corr: cm1Redac('Série rangée', { suite: ['5 ; 8 ; 10 ; 12 ; 15 ; 18 ; 25 ; 30', 'Effectif pair : médiane = (12 + 15) : 2 = 13,5'] }, 'La médiane est 13,5 min : la moitié des élèves met moins de 13,5 min, l\'autre moitié plus.') },
    ] },
  { titre: 'Moyenne, médiane et étendue', duree: '35 min',
    attendus: ['Calculer l\'étendue d\'une série', 'Comparer deux séries', 'Comprendre l\'effet d\'une valeur extrême'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule l\'étendue.',
        ...rmp([['3 ; 9 ; 14 ; 6 : @', 11], ['−4 ; 2 ; 7 ; −1 : @', 11], ['15,5 ; 12 ; 18,5 : @', '6,5']]) },
      { etoiles: 2, col: 1, consigne: 'Salaires mensuels (en €) dans une petite entreprise : 1 500 ; 1 600 ; 1 600 ; 1 700 ; 1 800 ; 6 800.',
        ...rmp([['Moyenne : @ €', '2 500'], ['Médiane : @ €', '1 650'], ['Étendue : @ €', '5 300']]) },
      { etoiles: 2, col: 1, consigne: 'Pour ces salaires, entoure.',
        ...chx([['La valeur qui représente le mieux le salaire « habituel » :', 'la médiane', 'la moyenne · la médiane'], ['La valeur la plus influencée par le salaire de 6 800 € :', 'la moyenne', 'la moyenne · la médiane']]) },
      { etoiles: 3, cahier: true, consigne: 'Deux élèves ont eu ces notes. Hugo : 9 ; 11 ; 10 ; 12 ; 8. Lina : 4 ; 18 ; 6 ; 16 ; 6. Compare leurs moyennes, leurs médianes et leurs étendues. Qui est le plus régulier ?',
        corr: cm1Redac('Hugo', { suite: ['Moyenne : 50 : 5 = 10', 'Médiane : 10 (8 ; 9 ; 10 ; 11 ; 12)', 'Étendue : 12 − 8 = 4'] }, 'Hugo : moyenne 10, médiane 10, étendue 4.') + cm1Redac('Lina', { suite: ['Moyenne : 50 : 5 = 10', 'Médiane : 6 (4 ; 6 ; 6 ; 16 ; 18)', 'Étendue : 18 − 4 = 14'] }, 'Même moyenne, mais l\'étendue de Lina est bien plus grande : Hugo est le plus régulier.') },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'étendue.', ...P3.rmp([['5 ; 12 ; 9 ; 20 : @', 15], ['−3 ; 4 ; 1 : @', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Donne la médiane.', ...P3.rmp([['3 ; 7 ; 8 ; 10 ; 15 : @', 8], ['2 ; 4 ; 6 ; 9 : @', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quel indicateur est sensible aux valeurs extrêmes ? Entoure.', ...P3.chx([['', 'la moyenne', 'la moyenne · la médiane']]) },
    ] },
  { titre: 'Problèmes de statistiques', duree: '40 min',
    attendus: ['Lire et exploiter des données', 'Choisir l\'indicateur adapté', 'Rédiger une réponse argumentée'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Températures maximales d\'une semaine (en °C) : 18 ; 21 ; 19 ; 24 ; 22 ; 17 ; 25.',
        ...rmp([['Moyenne : @ °C (au dixième)', '20,9'], ['Médiane : @ °C', 21], ['Étendue : @ °C', 8]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une série peut avoir la même moyenne et la même médiane.', 'vrai'], ['La médiane partage la série en deux groupes de même effectif.', 'vrai'], ['L\'étendue mesure le centre de la série.', 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Dans un club, la moyenne d\'âge des 12 joueurs est de 15 ans. Un entraîneur de 41 ans rejoint le groupe. Quelle est la nouvelle moyenne d\'âge ? La médiane change-t-elle beaucoup ? Explique.',
        corr: cm1Redac('Nouvelle moyenne', { suite: ['Somme des âges des joueurs : 12 × 15 = 180 ans', '180 + 41 = 221 ; 221 : 13 = 17'] }, 'La nouvelle moyenne d\'âge est de 17 ans.') + cm1Redac('Médiane', 'Une seule valeur, même très grande, ajoutée en haut de la série ne décale la médiane que d\'une demi-place.', 'La médiane change très peu : elle est peu sensible aux valeurs extrêmes.') },
      { etoiles: 3, cahier: true, consigne: 'Une classe de 4e a fait une collecte : 6 élèves ont apporté 2 kg, 9 élèves 3 kg, 7 élèves 4 kg et 3 élèves 6 kg. Calcule la masse moyenne apportée par élève et la médiane.',
        corr: cm1Redac('Moyenne', { suite: ['Effectif : 6 + 9 + 7 + 3 = 25', 'Masse totale : 6 × 2 + 9 × 3 + 7 × 4 + 3 × 6 = 12 + 27 + 28 + 18 = 85 kg', '85 : 25 = 3,4'] }, 'Chaque élève a apporté en moyenne 3,4 kg.') + cm1Redac('Médiane', '25 valeurs : la médiane est la 13e ; les 6 premières valent 2, les 9 suivantes (7e à 15e) valent 3.', 'La médiane est 3 kg.') },
      { etoiles: 1, col: 1, consigne: 'Série : 4 ; 8 ; 6 ; 10 ; 12. Complète.', ...P3.rmp([['moyenne : @', 8], ['médiane : @', 8], ['étendue : @', 8]], 2) },
      { etoiles: 2, col: 1, consigne: 'Série : 2 ; 2 ; 5 ; 7 ; 9 ; 11. Complète.', ...P3.rmp([['moyenne : @', 6], ['médiane : @', 6], ['étendue : @', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'On ajoute la valeur 50 à la série 4 ; 8 ; 6 ; 10 ; 12. Entoure.', ...P3.chx([['La moyenne…', 'augmente beaucoup', 'augmente beaucoup · ne change pas'], ['La médiane…', 'change peu', 'change peu · augmente beaucoup']]) },
    ] },
];
})();

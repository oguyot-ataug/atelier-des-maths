/* 4e · Planches : Formules et graphiques (D4) -- produire une formule, tableau de valeurs, graphique, lecture graphique. */
(() => {
const T = cm1Tex, R = P3.R;
PLANCHES['4e|Formules et graphiques'] = [
  { titre: 'Produire une formule', duree: '30 min',
    attendus: ['Produire une formule littérale représentant la dépendance de deux grandeurs'],
    exos: [
      { etoiles: 1, consigne: 'Écris une formule.', ...P3.rmp([['Le périmètre p d\'un carré de côté c : @', T('p = 4c')], ['Le prix P de n cahiers à 3 € : @', T('P = 3n')], ['L\'aire A d\'un rectangle de longueur 8 et de largeur ℓ : @', T('A = 8\\ell')]], 4) },
      { etoiles: 2, cahier: true, consigne: 'Une salle de sport coûte 30 € d\'inscription, puis 5 € par séance. Exprime le prix P en fonction du nombre n de séances, puis calcule P pour 12 séances.', corr: cm1Redac('Prix', { suite: [T('P = 30 + 5n'), T('P = 30 + 5 \\times 12 = 90')] }, 'Pour 12 séances, on paie 90 €.') },
      { etoiles: 3, cahier: true, consigne: 'On enlève quatre carrés de côté x aux coins d\'un rectangle de 20 cm sur 13 cm. Exprime l\'aire restante A en fonction de x.', corr: cm1Redac('Aire restante', T('A = 20 \\times 13 - 4x^2 = 260 - 4x^2'), 'L\'aire restante est 260 − 4x² cm².') },
    ] },
  { titre: 'Tableau de valeurs et graphique', duree: '35 min',
    attendus: ['Calculer des valeurs avec une formule', 'Représenter la dépendance par un graphique'],
    exos: [
      { etoiles: 1, consigne: 'Complète le tableau pour P = 30 + 5n.', eleve: cm1Tableau(['n', '0', '2', '4', '6', '10'], [['P', '', '', '', '', '']]), corr: cm1Tableau(['n', '0', '2', '4', '6', '10'], [['P', R(30), R(40), R(50), R(60), R(80)]]) },
      { etoiles: 2, consigne: 'Complète le tableau pour A = 260 − 4x².', eleve: cm1Tableau(['x', '0', '1', '2', '3', '4', '5', '6'], [['A', '', '', '', '', '', '', '']]), corr: cm1Tableau(['x', '0', '1', '2', '3', '4', '5', '6'], [['A', ...[0, 1, 2, 3, 4, 5, 6].map(x => R(260 - 4 * x * x))]]) },
      { etoiles: 3, cahier: true, consigne: 'Place les points du tableau précédent dans un repère (1 cm pour 1 en abscisse, 1 cm pour 20 cm² en ordonnée) et relie-les. Les points sont-ils alignés ?', corr: cm1Redac('Le graphique', '', 'Non : les points sont sur une courbe qui descend de plus en plus vite. L\'aire n\'est pas proportionnelle à x.') },
    ] },
  { titre: 'Lire un graphique', duree: '25 min',
    attendus: ['Lire des valeurs sur l\'axe des abscisses ou des ordonnées'],
    exos: [
      { etoiles: 1, consigne: 'Le four : 20 °C au départ, 52 °C à 2 min, 78 °C à 4 min, 97 °C à 6 min, 110 °C à 8 min. Complète.', ...P3.rmp([['Température au bout de 4 min : @', '78 °C'], ['Temps pour atteindre 110 °C : @', '8 min'], ['Augmentation entre 2 et 6 min : @', '45 °C']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Une lecture graphique donne-t-elle une valeur exacte ? Explique.', corr: cm1Redac('Lecture graphique', '', 'Non : elle donne une valeur approchée, qui dépend de la précision du tracé. Avec une formule, on peut calculer la valeur exacte.') },
    ] },
];
})();

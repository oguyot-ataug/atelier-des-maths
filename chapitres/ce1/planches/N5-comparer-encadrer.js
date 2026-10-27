/* CE1 · Planches : Comparer, ranger, encadrer (N5). */
(() => {
const B = P3.B, R = P3.R;
const cmp = (a, b) => a < b ? '<' : a > b ? '>' : '=';
const L = [[456, 465], [702, 699], [380, 308], [999, 1000], [520, 520]];
PLANCHES['ce1|Comparer, ranger, encadrer'] = [
  { titre: 'Comparer', duree: '20 min',
    attendus: ['Comparer deux nombres jusqu\'à 1 000 avec < , > ou ='],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris <, > ou =.', eleve: plListe(L.map(([a, b]) => `${a} ${plCase()} ${b}`)), corr: plListe(L.map(([a, b]) => `${a} ${R(cmp(a, b))} ${b}`)) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus grand nombre.', ...P3.chx([['', '610', '601 · 610 · 106'], ['', '890', '809 · 890 · 889']]) },
    ] },
  { titre: 'Ranger', duree: '20 min',
    attendus: ['Ranger des nombres dans l\'ordre croissant ou décroissant'],
    exos: [
      { etoiles: 1, consigne: 'Range dans l\'ordre croissant.', ...P3.rmp([['345 · 435 · 354 · 453 : @', '345 < 354 < 435 < 453']], 16) },
      { etoiles: 2, consigne: 'Range dans l\'ordre décroissant.', ...P3.rmp([['809 · 98 · 890 · 908 : @', '908 > 890 > 809 > 98']], 16) },
      { etoiles: 3, cahier: true, consigne: 'Avec les chiffres 4, 7 et 1 (une fois chacun), écris le plus grand et le plus petit nombre de trois chiffres.', corr: cm1Redac('Les nombres', { suite: ['Le plus grand : 741', 'Le plus petit : 147'] }, 'Le plus grand est 741, le plus petit est 147.') },
    ] },
  { titre: 'Encadrer', duree: '20 min',
    attendus: ['Encadrer un nombre entre deux dizaines, deux centaines'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Encadre entre deux dizaines.', ...P3.rmp([['@ < 347 < @', 340, 350], ['@ < 812 < @', 810, 820], ['@ < 95 < @', 90, 100]], 3) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux centaines.', ...P3.rmp([['@ < 347 < @', 300, 400], ['@ < 812 < @', 800, 900], ['@ < 56 < @', 0, 100]], 3) },
    ] },
];
})();

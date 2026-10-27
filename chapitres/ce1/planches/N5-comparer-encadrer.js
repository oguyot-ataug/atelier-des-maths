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
      { etoiles: 2, col: 1, consigne: 'Écris <, > ou =.', eleve: plListe([[234, 243], [870, 807], [505, 550], [99, 100]].map(([a, b]) => `${a} ${plCase()} ${b}`)), corr: plListe([[234, 243], [870, 807], [505, 550], [99, 100]].map(([a, b]) => `${a} ${R(cmp(a, b))} ${b}`)) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus petit nombre.', ...P3.chx([['', '108', '180 · 108 · 801'], ['', '499', '500 · 499 · 510']]) },
      { etoiles: 3, consigne: 'Place A (320) et B (380) sur la droite. Lequel est le plus grand ?', eleve: cm1Axe(300, 400, 10, 50, []) + plListe(['Le plus grand : ' + B(3)]), corr: cm1Axe(300, 400, 10, 50, [[320, 'A'], [380, 'B']]) + plListe(['Le plus grand : ' + R(380) + ' (il est plus à droite)']) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.', ...P3.chx([['532 > 523', 'vrai', 'vrai · faux'], ['99 > 100', 'faux', 'vrai · faux'], ['706 < 760', 'vrai', 'vrai · faux'], ['480 = 408', 'faux', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Écris <, > ou =.', eleve: plListe([[1000, 999], [640, 604], [77, 707]].map(([a, b]) => `${a} ${plCase()} ${b}`)), corr: plListe([[1000, 999], [640, 604], [77, 707]].map(([a, b]) => `${a} ${R(cmp(a, b))} ${b}`)) },
    ] },
  { titre: 'Ranger', duree: '20 min',
    attendus: ['Ranger des nombres dans l\'ordre croissant ou décroissant'],
    exos: [
      { etoiles: 1, consigne: 'Range dans l\'ordre croissant.', ...P3.rmp([['345 · 435 · 354 · 453 : @', '345 < 354 < 435 < 453']], 16) },
      { etoiles: 2, consigne: 'Range dans l\'ordre décroissant.', ...P3.rmp([['809 · 98 · 890 · 908 : @', '908 > 890 > 809 > 98']], 16) },
      { etoiles: 3, cahier: true, consigne: 'Avec les chiffres 4, 7 et 1 (une fois chacun), écris le plus grand et le plus petit nombre de trois chiffres.', corr: cm1Redac('Les nombres', { suite: ['Le plus grand : 741', 'Le plus petit : 147'] }, 'Le plus grand est 741, le plus petit est 147.') },
      { etoiles: 2, consigne: 'Range dans l\'ordre croissant.', ...P3.rmp([['127 · 271 · 172 · 217 : @', '127 < 172 < 217 < 271']], 16) },
      { etoiles: 2, col: 1, consigne: 'Écris un nombre qui convient.', ...P3.rmp([['250 < @ < 260', 'par exemple 255'], ['699 < @ < 701', 700], ['998 < @ < 1 000', 999]], 4) },
      { etoiles: 3, col: 1, consigne: 'Avec les chiffres 3, 8 et 5 (une fois chacun), écris…', ...P3.rmp([['le plus grand nombre : @', 853], ['le plus petit nombre : @', 358]], 3) },
    ] },
  { titre: 'Encadrer', duree: '20 min',
    attendus: ['Encadrer un nombre entre deux dizaines, deux centaines'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Encadre entre deux dizaines.', ...P3.rmp([['@ < 347 < @', 340, 350], ['@ < 812 < @', 810, 820], ['@ < 95 < @', 90, 100]], 3) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux centaines.', ...P3.rmp([['@ < 347 < @', 300, 400], ['@ < 812 < @', 800, 900], ['@ < 56 < @', 0, 100]], 3) },
      { etoiles: 1, col: 1, consigne: 'Encadre entre deux dizaines.', ...P3.rmp([['@ < 158 < @', 150, 160], ['@ < 603 < @', 600, 610], ['@ < 999 < @', 990, '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Écris le nombre d\'avant et d\'après.', ...P3.rmp([['@ < 400 < @', 399, 401], ['@ < 730 < @', 729, 731], ['@ < 510 < @', 509, 511]], 3) },
      { etoiles: 3, consigne: 'Place 347 sur la droite (point A), puis complète.', eleve: cm1Axe(300, 400, 10, 50, []) + plListe([B(3) + ' < 347 < ' + B(3)]), corr: cm1Axe(300, 400, 1, 50, [[347, 'A']]) + plListe([R(340) + ' < 347 < ' + R(350)]) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux centaines.', ...P3.rmp([['@ < 456 < @', 400, 500], ['@ < 98 < @', 0, 100], ['@ < 901 < @', 900, '1 000']], 3) },
      { etoiles: 3, col: 1, consigne: 'Quel nombre est le plus près de 400 ? Entoure.', ...P3.chx([['', '398', '350 · 398 · 420'], ['', '405', '405 · 380 · 430']]) },
    ] },
];
})();

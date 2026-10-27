/* CE1 · Planches : La soustraction posée (N11) -- technique en cassant une dizaine (ou une centaine). */
(() => {
const { cadre } = PCP, B = P3.B, R = P3.R;
const vide = (a, b) => cm1Posee([[' ', String(a)], ['−', String(b)], [' ', '']]);
const grille = L => ({ eleve: plGrille(L.map(([a, b]) => vide(a, b)), L.length), corr: plGrille(L.map(([a, b]) => ce1Sous(a, b, 120)), L.length) });
const aPoser = L => ({ eleve: plGrille(L.map(([a, b]) => `${a} − ${b}${cadre(100)}`), L.length), corr: plGrille(L.map(([a, b]) => ce1Sous(a, b, 120)), L.length) });
PLANCHES['ce1|La soustraction posée'] = [
  { titre: 'Sans cassage', duree: '20 min',
    attendus: ['Poser et calculer une soustraction sans retenue'],
    exos: [
      { etoiles: 1, consigne: 'Calcule.', ...grille([[87, 34], [568, 245], [796, 352]]) },
      { etoiles: 2, consigne: 'Pose et calcule.', ...aPoser([[459, 128], [674, 53], [999, 476]]) },
      { etoiles: 1, consigne: 'Calcule.', ...grille([[96, 43], [875, 532], [648, 207]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule de tête.', ...P3.rmp([['80 − 30 = @', 50], ['600 − 200 = @', 400], ['95 − 5 = @', 90], ['470 − 50 = @', 420]], 3) },
    ] },
  { titre: 'En cassant une dizaine', duree: '25 min',
    attendus: ['Calculer une soustraction posée en cassant une dizaine ou une centaine'],
    exos: [
      { etoiles: 1, consigne: 'Calcule (casse une dizaine quand il le faut).', ...grille([[62, 27], [453, 128], [581, 236]]) },
      { etoiles: 2, consigne: 'Pose et calcule.', ...aPoser([[735, 281], [624, 357], [92, 48]]) },
      { etoiles: 2, consigne: 'Calcule.', ...grille([[73, 48], [562, 317], [840, 526]]) },
      { etoiles: 1, col: 1, consigne: 'Faut-il casser une dizaine ? Entoure.', ...P3.chx([['85 − 32', 'non', 'oui · non'], ['64 − 28', 'oui', 'oui · non'], ['453 − 219', 'oui', 'oui · non'], ['786 − 345', 'non', 'oui · non']]) },
    ] },
  { titre: 'Problèmes et vérification', duree: '25 min',
    attendus: ['Résoudre des problèmes de soustraction', 'Vérifier par une addition'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un livre a 245 pages. Lina en a lu 118. Combien de pages lui reste-t-il ?', corr: cm1Redac('Pages à lire', { pose: ce1Sous(245, 118, 130) }, 'Il reste 127 pages à lire.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 386 €. Hugo a 254 €. Combien lui manque-t-il ?', corr: cm1Redac('Argent qui manque', { pose: ce1Sous(386, 254, 130) }, 'Il manque 132 € à Hugo.') },
      { etoiles: 3, cahier: true, consigne: 'Vérifie par une addition : 513 − 278 = 235.', corr: cm1Redac('La preuve', { pose: cm1Posee([[' ', '235'], ['+', '278'], [' ', '513']], '11 ') }, '235 + 278 = 513 : la soustraction est juste.') },
      { etoiles: 1, col: 1, consigne: 'Le car a 58 places. 39 enfants sont assis. Combien de places libres ?', eleve: PCP.lig(vide(58, 39)) + PCP.lig('Il reste ' + B(2) + ' places.'), corr: PCP.lig(ce1Sous(58, 39, 110)) + PCP.lig('Il reste ' + R(19) + ' places.') },
      { etoiles: 2, col: 1, consigne: 'Vérifie par une addition : 72 − 35 = 37.', eleve: PCP.lig(cm1Posee([[' ', '37'], ['+', '35'], [' ', '']])), corr: PCP.lig(cm1Posee([[' ', '37'], ['+', '35'], [' ', '72']], '1 ')) + PCP.lig('On retrouve 72 : c\'est juste.') },
      { etoiles: 2, consigne: 'Sans calculer, entoure le résultat le plus proche.', ...P3.chx([['612 − 298 : environ', '300', '100 · 300 · 900'], ['505 − 98 : environ', '400', '400 · 600'], ['999 − 501 : environ', '500', '300 · 500 · 700']]) },
    ] },
];
})();

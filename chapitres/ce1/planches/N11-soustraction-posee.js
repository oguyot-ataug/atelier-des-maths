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
    ] },
  { titre: 'En cassant une dizaine', duree: '25 min',
    attendus: ['Calculer une soustraction posée en cassant une dizaine ou une centaine'],
    exos: [
      { etoiles: 1, consigne: 'Calcule (casse une dizaine quand il le faut).', ...grille([[62, 27], [453, 128], [581, 236]]) },
      { etoiles: 2, consigne: 'Pose et calcule.', ...aPoser([[735, 281], [624, 357], [92, 48]]) },
    ] },
  { titre: 'Problèmes et vérification', duree: '25 min',
    attendus: ['Résoudre des problèmes de soustraction', 'Vérifier par une addition'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un livre a 245 pages. Lina en a lu 118. Combien de pages lui reste-t-il ?', corr: cm1Redac('Pages à lire', { pose: ce1Sous(245, 118, 130) }, 'Il reste 127 pages à lire.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 386 €. Hugo a 254 €. Combien lui manque-t-il ?', corr: cm1Redac('Argent qui manque', { pose: ce1Sous(386, 254, 130) }, 'Il manque 132 € à Hugo.') },
      { etoiles: 3, cahier: true, consigne: 'Vérifie par une addition : 513 − 278 = 235.', corr: cm1Redac('La preuve', { pose: cm1Posee([[' ', '235'], ['+', '278'], [' ', '513']], '11 ') }, '235 + 278 = 513 : la soustraction est juste.') },
    ] },
];
})();

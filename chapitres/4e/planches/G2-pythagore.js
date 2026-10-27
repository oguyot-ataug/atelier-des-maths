/* ============================================================
   4e · Planches : Théorème de Pythagore (G2)
   Carrés et racines carrées ; calculer l'hypoténuse ; calculer un côté de l'angle droit ;
   réciproque (triangle rectangle ou non) ; problèmes concrets (échelle, écran, rampe…).
   ============================================================ */
(() => {
const { R, rmp, ch, chx, geo } = P3;
const DS = PL_DESSINS, illu = plIllu;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
// Triangle rectangle en B (A en haut à gauche).
const triR = (noms, cotes, px) => { const [a, b, c] = noms || ['A', 'B', 'C'], P = {}; P[a] = [14, 14]; P[b] = [14, 120]; P[c] = [180, 120];
  return geo({ pts: P, poly: [[[a, b, c]]], segs: [[a, b], [b, c], [a, c]], droits: [[a, b, c]], cotes: cotes || [], px: px || 160 }); };
// Échelle contre un mur.
const echelle = DS.fig(170, 130, DS.sol(40, 150, 112) + DS.mur(118, 112, 24, 104) + DS.echelle([70, 112], [116, 14]) + DS.droit([70, 112], [118, 112], [118, 14])
  + DS.tx([86, 60], '4 m', { a: 'end' }) + DS.cote([70, 112], [118, 112], '1,2 m', -8, { dt: 8 }) + DS.cote([150, 112], [150, 14], '?', 0, { dt: -8 }), 140);
// Écran de télévision (diagonale).
const ecran = DS.fig(204, 110, `<rect x="14" y="10" width="140" height="80" rx="4" fill="#1F3A5C"/><rect x="20" y="15" width="128" height="70" fill="#9CC8E8"/><rect x="74" y="90" width="20" height="10" fill="#1F3A5C"/>`
  + DS.ln([20, 85], [148, 15], '#E35D3A', 1.6, true) + DS.tx([84, 44], '?', { c: '#E35D3A', fs: 13 }) + DS.tx([84, 106], '88 cm', { fs: 10, c: '#2E9C6A' }).replace('y="106"', 'y="107"') + DS.tx([160, 52], '49,5 cm', { a: 'start', fs: 9, c: '#2E9C6A' }), 165);
PLANCHES['4e|Théorème de Pythagore'] = [
  { titre: 'Carrés et racines carrées', duree: '25 min',
    attendus: ['Calculer le carré d\'un nombre', 'Connaître les carrés parfaits jusqu\'à 15²', 'Utiliser la touche racine carrée de la calculatrice'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['7² = @', 49], ['12² = @', 144], ['0,5² = @', '0,25'], ['15² = @', 225]]) },
      { etoiles: 1, col: 1, consigne: 'Donne la racine carrée.',
        ...rmp([['√64 = @', 8], ['√121 = @', 11], ['√169 = @', 13], ['√0,09 = @', '0,3']]) },
      { etoiles: 2, col: 1, consigne: 'À la calculatrice, arrondis au dixième.',
        ...rmp([['√50 ≈ @', '7,1'], ['√12 ≈ @', '3,5'], ['√200 ≈ @', '14,1']]) },
      { etoiles: 2, col: 1, consigne: 'Encadre entre deux entiers consécutifs.',
        ...rmp([['@ < √30 < @', 5, 6], ['@ < √80 < @', 8, 9], ['@ < √150 < @', 12, 13]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['√(9 + 16) = √9 + √16', 'faux'], ['(√7)² = 7', 'vrai'], ['Le carré d\'un nombre négatif est négatif.', 'faux']], 'vrai · faux') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['7² = @', 49], ['12² = @', 144], ['0,5² = @', '0,25']], 2) },
      { etoiles: 2, col: 1, consigne: 'Donne la racine carrée.', ...P3.rmp([['√81 = @', 9], ['√121 = @', 11], ['√0,09 = @', '0,3']], 2) },
    ] },
  { titre: 'Calculer une longueur avec le théorème de Pythagore', duree: '35 min',
    attendus: ['Repérer l\'hypoténuse', 'Calculer la longueur de l\'hypoténuse', 'Calculer la longueur d\'un côté de l\'angle droit'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle est rectangle en B. Complète.',
        ...fig(triR(null, [], 130), [['L\'hypoténuse est le côté @', '[AC]'], ['AC² = @ + @', 'AB²', 'BC²']]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en B. Calcule AC.',
        ...rmp([['AB = 6 cm et BC = 8 cm : AC = @ cm', 10], ['AB = 5 cm et BC = 12 cm : AC = @ cm', 13], ['AB = 3 cm et BC = 5 cm : AC ≈ @ cm (au dixième)', '5,8']]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en B. Calcule le côté manquant.',
        ...rmp([['AC = 17 cm et AB = 8 cm : BC = @ cm', 15], ['AC = 10 cm et BC = 6 cm : AB = @ cm', 8], ['AC = 7 cm et AB = 4 cm : BC ≈ @ cm (au dixième)', '5,7']]) },
      { etoiles: 3, cahier: true, consigne: 'RST est rectangle en S, avec RS = 4,5 cm et ST = 6 cm. Calcule RT. Rédige.',
        corr: cm1Redac('Pythagore', { suite: ['RST est rectangle en S, donc RT² = RS² + ST²', 'RT² = 4,5² + 6² = 20,25 + 36 = 56,25', 'RT = √56,25 = 7,5'] }, 'RT mesure 7,5 cm.') },
      { etoiles: 3, cahier: true, consigne: 'EFG est rectangle en F, avec EG = 9 cm et EF = 5 cm. Calcule FG, arrondi au millimètre.',
        corr: cm1Redac('Pythagore', { suite: ['EFG est rectangle en F, donc EG² = EF² + FG²', '9² = 5² + FG², soit FG² = 81 − 25 = 56', 'FG = √56 ≈ 7,48'] }, 'FG mesure environ 7,5 cm.') },
    ] },
  { titre: 'Triangle rectangle ou non ?', duree: '30 min',
    attendus: ['Comparer le carré du plus grand côté à la somme des carrés des deux autres', 'Prouver qu\'un triangle est rectangle', 'Prouver qu\'un triangle n\'est pas rectangle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle est-il rectangle ? Entoure.',
        ...ch([['Côtés 6 ; 8 ; 10 :', 'oui'], ['Côtés 5 ; 6 ; 7 :', 'non'], ['Côtés 9 ; 12 ; 15 :', 'oui'], ['Côtés 4 ; 7,5 ; 8,5 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Le triangle DEF a pour côtés DE = 7 cm, EF = 24 cm et DF = 25 cm.',
        ...rmp([['Le plus grand côté est @', '[DF]'], ['DF² = @', 625], ['DE² + EF² = @', 625], ['Le triangle est rectangle en @', 'E']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'angle droit du triangle (s\'il y en a un).',
        ...chx([['KLM : KL = 5, LM = 12, KM = 13 :', 'en L', 'en K · en L · en M · aucun'], ['PQR : PQ = 4, QR = 5, PR = 6 :', 'aucun', 'en P · en Q · en R · aucun']]) },
      { etoiles: 3, cahier: true, consigne: 'Le triangle ABC a pour côtés AB = 4,8 cm, BC = 6 cm et AC = 3,6 cm. Est-il rectangle ? Rédige.',
        corr: cm1Redac('Réciproque de Pythagore', { suite: ['Le plus grand côté est [BC] : BC² = 6² = 36', 'AB² + AC² = 4,8² + 3,6² = 23,04 + 12,96 = 36'] }, 'BC² = AB² + AC² : d\'après la réciproque du théorème de Pythagore, ABC est rectangle en A.') },
      { etoiles: 3, cahier: true, consigne: 'Un triangle a pour côtés 5 cm, 8 cm et 9 cm. Est-il rectangle ? Rédige.',
        corr: cm1Redac('Comparaison', { suite: ['Plus grand côté : 9² = 81', '5² + 8² = 25 + 64 = 89'] }, '81 ≠ 89 : d\'après le théorème de Pythagore, le triangle n\'est pas rectangle.') },
    ] },
  { titre: 'Problèmes avec le théorème de Pythagore', duree: '40 min',
    attendus: ['Repérer un triangle rectangle dans une situation', 'Choisir entre le théorème et sa réciproque', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Diagonale d\'un carré de 5 cm de côté : ≈ @ cm (au dixième)', '7,1'], ['Diagonale d\'un rectangle de 9 cm sur 12 cm : @ cm', 15]]) },
      { etoiles: 2, cahier: true, consigne: illu(echelle, 'Une échelle de 4 m est appuyée contre un mur vertical. Son pied est à 1,2 m du mur. À quelle hauteur arrive-t-elle ? Arrondis au centimètre.'),
        corr: cm1Redac('Pythagore', { suite: ['h² + 1,2² = 4²', 'h² = 16 − 1,44 = 14,56', 'h = √14,56 ≈ 3,82'] }, 'L\'échelle arrive à environ 3,82 m de hauteur.') },
      { etoiles: 2, cahier: true, consigne: illu(ecran, 'La taille d\'un écran est la longueur de sa diagonale, exprimée en pouces (1 pouce ≈ 2,54 cm). Un écran mesure 88 cm de large et 49,5 cm de haut. Quelle est sa taille en pouces ?'),
        corr: cm1Redac('Diagonale', { suite: ['d² = 88² + 49,5² = 7 744 + 2 450,25 = 10 194,25', 'd = √10 194,25 ≈ 101 cm'] }, 'La diagonale mesure environ 101 cm.') + cm1Redac('En pouces', '101 : 2,54 ≈ 40', 'C\'est un écran d\'environ 40 pouces.') },
      { etoiles: 3, cahier: true, consigne: 'Un menuisier vérifie qu\'un cadre de porte est bien rectangulaire. Les montants mesurent 2,1 m, la traverse 0,72 m, et la diagonale 2,22 m. Le coin est-il un angle droit ?',
        corr: cm1Redac('Réciproque de Pythagore', { suite: ['2,22² = 4,928 4', '2,1² + 0,72² = 4,41 + 0,518 4 = 4,928 4'] }, 'Les deux résultats sont égaux : d\'après la réciproque du théorème de Pythagore, le coin est un angle droit.') },
    ] },
];
})();

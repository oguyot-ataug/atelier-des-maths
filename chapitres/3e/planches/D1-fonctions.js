/* ============================================================
   3e · Planches : Généralités sur les fonctions (D1)
   Image, antécédent, formule et tableau de valeurs ; lire un graphique ; modéliser une situation ;
   passer d'une représentation à l'autre ; Objectif Brevet.
   ============================================================ */
(() => {
const { B, R, rmp, ch, chx, auto, qs, tab, repere } = P3;
// Courbe de f(x) = (x − 1)² − 3.
const gF = px => repere({ x: [-3, 5], y: [-4, 7], u: 22, px: px || 150, fns: [{ f: x => (x - 1) ** 2 - 3, de: -2.2, a: 4.2, t: '𝒞f', tx: 3.9, dx: 14, dy: 6 }] });
// Courbe de f(x) = −x² + 4x.
const gH = px => repere({ x: [-2, 6], y: [-6, 5], u: 22, px: px || 150, fns: [{ f: x => -x * x + 4 * x, de: -1.2, a: 5.2, c: '#7A4FC0', t: '𝒞f', tx: 4.6, dx: 14 }] });
// Température au cours d'une journée (relevés toutes les 4 heures, reliés).
const T = [[0, 4], [4, 2], [8, 6], [12, 14], [16, 16], [20, 10], [24, 6]];
const temp = x => { for(let i = 0; i < T.length - 1; i++) if(x <= T[i + 1][0]) return T[i][1] + (T[i + 1][1] - T[i][1]) * (x - T[i][0]) / (T[i + 1][0] - T[i][0]); return 6; };
const gT = px => repere({ x: [0, 24], y: [0, 18], u: 10, v: 10, sx: 2, sy: 2, gx: 4, gy: 4, nx: 'heure', ny: '°C', px: px || 190, fns: [{ f: temp, c: '#E35D3A' }] });
// Hauteur d'une balle h(t) = −t² + 6t.
const gBalle = repere({ x: [0, 7], y: [0, 10], u: 30, v: 18, nx: 't (s)', ny: 'h (m)', px: 175, fns: [{ f: t => -t * t + 6 * t, de: 0, a: 6, c: '#2E9C6A' }] });
const avecFig = (fig, l) => ({ eleve: `<div style="text-align:center;">${fig}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${fig}</div>` + rmp(l).corr });
PLANCHES['3e|Généralités sur les fonctions'] = [
  { titre: 'Image et antécédent', duree: '35 min',
    attendus: ['Calculer une image avec une formule', 'Utiliser le vocabulaire : image, antécédent, f(x)', 'Compléter et lire un tableau de valeurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'f est la fonction f(x) = 3x − 2. Calcule.',
        ...rmp([['f(4) = @', 10], ['f(0) = @', '−2'], ['f(−1) = @', '−5'], ['f(1,5) = @', '2,5']]) },
      { etoiles: 1, col: 1, consigne: 'Entoure le bon mot.',
        ...ch([['f(5) = 12 : 12 est … de 5.', 'l\'image'], ['f(5) = 12 : 5 est … de 12.', 'un antécédent'], ['g(x) = x² : 9 est … de 3.', 'l\'image'], ['g(x) = x² : −3 est … de 9.', 'un antécédent']], 'l\'image · un antécédent') },
      { etoiles: 2, col: 1, consigne: 'g est la fonction g(x) = x² − 4.',
        ...rmp([['g(3) = @', 5], ['g(−3) = @', 5], ['g(0) = @', '−4'], ['Deux antécédents de 0 : @ et @', 2, '−2']]) },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau de valeurs de h(x) = 2x² − x.',
        eleve: tab([['x', '−2', '−1', 0, 1, 2, 3], ['h(x)', '@', '@', '@', '@', '@', '@']], false),
        corr: tab([['x', '−2', '−1', 0, 1, 2, 3], ['h(x)', '@', '@', '@', '@', '@', '@']], true, [10, 3, 0, 1, 6, 15]) },
      { etoiles: 2, col: 1, consigne: 'Voici un tableau de valeurs d\'une fonction f.',
        eleve: tab([['x', '−1', 0, 1, 2, 3], ['f(x)', 4, 1, 0, 1, 4]]) + rmp([['f(2) = @', 1], ['Image de −1 : @', 4], ['Antécédents de 1 : @ et @', 0, 2], ['Antécédents de 4 : @ et @', '−1', 3]]).eleve,
        corr: tab([['x', '−1', 0, 1, 2, 3], ['f(x)', 4, 1, 0, 1, 4]]) + rmp([['f(2) = @', 1], ['Image de −1 : @', 4], ['Antécédents de 1 : @ et @', 0, 2], ['Antécédents de 4 : @ et @', '−1', 3]]).corr },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Programme : choisir un nombre ; le multiplier par 5 ; retirer 3 ; multiplier le résultat par le nombre choisi. Écris la fonction f qui correspond, puis calcule f(2) et f(−1).',
        corr: cm1Redac('Fonction', 'f(x) = (5x − 3) × x = 5x² − 3x', '') + cm1Redac('Images', { suite: ['f(2) = (10 − 3) × 2 = 14', 'f(−1) = (−5 − 3) × (−1) = 8'] }, 'f(2) = 14 et f(−1) = 8.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'f(x) = 2x + 7. Trouve l\'antécédent de 1, puis le nombre qui a pour image lui-même.',
        corr: cm1Redac('Antécédent de 1', { suite: ['2x + 7 = 1', '2x = −6', 'x = −3'] }, 'L\'antécédent de 1 est −3.') + cm1Redac('f(x) = x', { suite: ['2x + 7 = x', 'x = −7'] }, '−7 a pour image lui-même : f(−7) = −7.') },
    ] },
  { titre: 'Lire un graphique', duree: '35 min',
    attendus: ['Lire une image sur la courbe d\'une fonction', 'Lire des antécédents', 'Savoir si un point appartient à une courbe'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Voici la courbe d\'une fonction f. Lis.', ...avecFig(gF(), [['f(0) = @', '−2'], ['f(3) = @', 1], ['f(1) = @', '−3'], ['Image de −1 : @', 1]]) },
      { etoiles: 2, col: 1, consigne: 'Avec la même courbe, lis les antécédents.', ...avecFig(gF(), [['Antécédents de 1 : @ et @', '−1', 3], ['Antécédents de −2 : @ et @', 0, 2], ['Antécédent de −3 : @', 1], ['Nombre d\'antécédents de −4 : @', 0]]) },
      { etoiles: 2, col: 1, consigne: 'Température relevée au cours d\'une journée.', ...avecFig(gT(), [['Température à 12 h : @ °C', 14], ['Heures où il fait 6 °C : @ h et @ h', 8, 24], ['Température maximale : @ °C', 16], ['Elle est atteinte à @ h', 16]]) },
      { etoiles: 2, col: 1, consigne: 'Avec la courbe des températures, vrai ou faux ? Entoure.',
        eleve: `<div style="text-align:center;">${gT(180)}</div>` + ch([['La température augmente de 4 h à 16 h.', 'vrai'], ['La température la plus basse est 4 °C.', 'faux']], 'vrai · faux').eleve,
        corr: `<div style="text-align:center;">${gT(180)}</div>` + ch([['La température augmente de 4 h à 16 h.', 'vrai'], ['La température la plus basse est 4 °C.', 'faux']], 'vrai · faux').corr },
      { etoiles: 2, col: 1, consigne: 'Le point appartient-il à la courbe de f(x) = 2x − 1 ? Entoure.',
        ...ch([['A(2 ; 3) :', 'oui'], ['B(0 ; 1) :', 'non'], ['C(−1 ; −3) :', 'oui'], ['D(3 ; 4) :', 'non']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'f(x) = x² et g(x) = x + 2. Montre que leurs courbes se coupent aux points d\'abscisses −1 et 2.',
        corr: cm1Redac('Vérification', { suite: ['f(−1) = 1 et g(−1) = −1 + 2 = 1', 'f(2) = 4 et g(2) = 2 + 2 = 4'] }, 'Les courbes passent toutes les deux par (−1 ; 1) et par (2 ; 4).') },
    ] },
  { titre: 'Modéliser une situation par une fonction', duree: '40 min',
    attendus: ['Traduire une situation par une formule', 'Utiliser la fonction pour répondre à une question', 'Écrire une formule dans un tableur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le prix d\'une course de taxi est P(d) = 2,5 + 1,8d (en €, d en km).',
        ...rmp([['Prix pour 10 km : @ €', '20,5'], ['Prix pour 0 km : @ €', '2,5'], ['Distance pour 29,50 € : @ km', 15]]) },
      { etoiles: 2, col: 1, consigne: 'Pour un carré de côté x (en cm) : aire A(x) = x² et périmètre P(x) = 4x.',
        ...rmp([['A(3) = @', 9], ['P(3) = @', 12], ['A(x) = P(x) pour x = @ (x &gt; 0)', 4]]) },
      { etoiles: 2, col: 1, consigne: 'Dans un tableur, A2 contient x. Entoure la formule à écrire en B2.',
        ...chx([['Pour f(x) = 5x² − 3 :', '=5*A2^2-3', '=5*A2^2-3 · =5A2²-3 · =(5*A2)^2-3'], ['Pour g(x) = 2(x + 1) :', '=2*(A2+1)', '=2*A2+1 · =2*(A2+1) · =2(A2+1)']]) },
      { etoiles: 2, col: 1, consigne: 'Location de vélo : 5 € de forfait, puis 2 € par heure.',
        ...rmp([['Prix pour h heures : f(h) = @', '5+2h'], ['f(3) = @ €', 11], ['Avec 21 €, on peut louer le vélo @ heures.', 8]], 5) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On lâche un objet d\'une hauteur de 80 m. Sa hauteur au bout de t secondes est h(t) = 80 − 5t² (en m). Calcule h(2) et h(3). Au bout de combien de temps touche-t-il le sol ?',
        corr: cm1Redac('Hauteurs', { suite: ['h(2) = 80 − 5 × 4 = 60', 'h(3) = 80 − 5 × 9 = 35'] }, '') + cm1Redac('Arrivée au sol', { suite: ['80 − 5t² = 0', 't² = 16 et t &gt; 0'] }, 'L\'objet touche le sol au bout de 4 s.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un rectangle a un périmètre de 20 cm. On note x sa largeur. Montre que son aire est A(x) = x(10 − x), puis calcule A(3) et A(5).',
        corr: cm1Redac('Aire', { suite: ['Longueur + largeur = 20 ÷ 2 = 10, donc la longueur vaut 10 − x.', 'A(x) = x(10 − x)'] }, '') + cm1Redac('Valeurs', { suite: ['A(3) = 3 × 7 = 21', 'A(5) = 5 × 5 = 25'] }, 'A(3) = 21 cm² et A(5) = 25 cm².') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Avec le rectangle de l\'exercice précédent, quelle largeur donne la plus grande aire ? Fais un tableau de valeurs et conjecture.',
        corr: tab([['x', 1, 2, 3, 4, 5, 6, 7], ['A(x)', 9, 16, 21, 24, 25, 24, 21]]) + cm1Redac('Conjecture', '', 'La plus grande aire semble être 25 cm², pour x = 5 : le rectangle est alors un carré de 5 cm de côté.') },
    ] },
  { titre: 'Tableau, formule, graphique', duree: '35 min',
    attendus: ['Passer d\'une représentation d\'une fonction à une autre', 'Lire un maximum sur une courbe', 'Contrôler une lecture graphique par le calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la formule qui correspond.',
        ...chx([['La courbe passe par (0 ; 3) et (1 ; 4) :', 'f(x) = x + 3', 'f(x) = 3x · f(x) = x + 3 · f(x) = x²'], ['x : 1, 2, 3 → f(x) : 2, 4, 6 :', 'f(x) = 2x', 'f(x) = 2x · f(x) = x + 2 · f(x) = x²'], ['f(2) = 4 et f(−2) = 4 :', 'f(x) = x²', 'f(x) = x² · f(x) = 2x · f(x) = x + 2']]) },
      { etoiles: 1, col: 1, consigne: 'Complète le tableau de valeurs de f(x) = −x + 4.',
        eleve: tab([['x', '−2', '−1', 0, 1, 2], ['f(x)', '@', '@', '@', '@', '@']], false),
        corr: tab([['x', '−2', '−1', 0, 1, 2], ['f(x)', '@', '@', '@', '@', '@']], true, [6, 5, 4, 3, 2]) },
      { etoiles: 2, col: 1, consigne: 'Voici la courbe d\'une fonction f. Lis.', ...avecFig(gH(), [['f(2) = @', 4], ['Antécédents de 3 : @ et @', 1, 3], ['Antécédents de 0 : @ et @', 0, 4], ['Valeur maximale de f : @', 4]]) },
      { etoiles: 2, col: 1, consigne: 'Avec la même courbe, vrai ou faux ? Entoure.',
        eleve: `<div style="text-align:center;">${gH(130)}</div>` + ch([['f(1) = f(3)', 'vrai'], ['f(5) = 0', 'faux'], ['−5 a deux antécédents.', 'vrai'], ['4 a deux antécédents.', 'faux']], 'vrai · faux').eleve,
        corr: `<div style="text-align:center;">${gH(130)}</div>` + ch([['f(1) = f(3)', 'vrai'], ['f(5) = 0', 'faux'], ['−5 a deux antécédents.', 'vrai'], ['4 a deux antécédents.', 'faux']], 'vrai · faux').corr },
      { etoiles: 2, col: 1, consigne: 'La fonction f associe à un nombre son triple diminué de 2.',
        ...rmp([['f(x) = @', '3x−2'], ['f(5) = @', 13], ['Antécédent de 7 : @', 3]], 5) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La courbe de l\'exercice 3 est celle de f(x) = −x² + 4x. Vérifie par le calcul les lectures f(1), f(3) et f(4).',
        corr: cm1Redac('Calculs', { suite: ['f(1) = −1 + 4 = 3', 'f(3) = −9 + 12 = 3', 'f(4) = −16 + 16 = 0'] }, 'Les calculs confirment les lectures graphiques.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Montre que les courbes de f(x) = x² et de g(x) = 4x − 4 n\'ont qu\'un seul point commun.',
        corr: cm1Redac('Raisonnement', { suite: ['x² = 4x − 4', 'x² − 4x + 4 = 0', '(x − 2)² = 0, donc x = 2', 'f(2) = g(2) = 4'] }, 'Le seul point commun est (2 ; 4) : la droite touche la courbe sans la traverser.') },
    ] },
  { titre: 'Généralités sur les fonctions', duree: '45 min', brevet: true,
    attendus: ['Automatismes : image, antécédent, point d\'une courbe', 'Lire et interpréter une courbe dans une situation concrète', 'Utiliser une formule de tableur'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['f(x) = 2x − 3 ; f(4) =', 5], ['g(x) = x² ; image de −3 :', 9], ['f(x) = 5x ; antécédent de 20 :', 4], ['f(2) = 7 signifie :', '2 a pour image 7', ['7 a pour image 2', '2 a pour image 7', 'f vaut 2']], ['Le point (1 ; 4) est sur la courbe de :', 'f(x) = x + 3', ['f(x) = x + 3', 'f(x) = 4x + 1', 'f(x) = x²']], ['h(x) = 10 − x² ; h(3) =', 1]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: `<span>On lance une balle vers le haut. La courbe donne sa hauteur h (en m) en fonction du temps t (en s).</span><div style="text-align:center;margin:4px 0;">${gBalle}</div>`
          + qs(['Quelle est la hauteur de la balle au bout de 1 s ?', 'À quels instants la balle est-elle à 8 m de hauteur ?', 'Quelle est la hauteur maximale atteinte, et à quel instant ?', 'On admet que h(t) = −t² + 6t. Calculer la hauteur au bout de 2,5 s.', 'Au bout de combien de temps la balle retombe-t-elle au sol ? Justifier par le calcul.']),
        corr: cm1Redac('Lectures graphiques', { suite: ['Au bout de 1 s, la balle est à 5 m.', 'Elle est à 8 m aux instants 2 s et 4 s.', 'Hauteur maximale : 9 m, à l\'instant 3 s.'] }, '')
          + cm1Redac('h(2,5)', '−2,5² + 6 × 2,5 = −6,25 + 15 = 8,75', 'Au bout de 2,5 s, la balle est à 8,75 m.')
          + cm1Redac('Retour au sol', { suite: ['−t² + 6t = 0', 't(6 − t) = 0', 't = 0 (lancer) ou t = 6'] }, 'La balle retombe au sol au bout de 6 s.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'On a calculé avec un tableur des valeurs de la fonction f(x) = 3x² − 5x + 1.'
          + tab([['', 'A', 'B', 'C', 'D', 'E', 'F'], ['1', 'x', '−2', '−1', '0', '1', '2'], ['2', 'f(x)', '23', '…', '1', '−1', '…']])
          + qs(['Quelle formule a-t-on saisie dans la cellule B2, avant de l\'étirer vers la droite ?', 'Calculer les valeurs manquantes en C2 et F2.', 'Donner un antécédent de 1 par f.']),
        corr: cm1Redac('Formule', '=3*B1^2-5*B1+1', '') + cm1Redac('Valeurs manquantes', { suite: ['f(−1) = 3 + 5 + 1 = 9', 'f(2) = 12 − 10 + 1 = 3'] }, 'C2 contient 9 et F2 contient 3.') + cm1Redac('Antécédent de 1', 'Le tableau donne f(0) = 1.', '0 est un antécédent de 1.') },
    ] },
];
})();

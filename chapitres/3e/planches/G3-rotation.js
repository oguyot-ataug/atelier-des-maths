/* ============================================================
   3e · Planches : Rotation (G3)
   Image d'un point et d'une figure par une rotation ; angles, horloges, rosaces et pavages ; les
   transformations du plan ; Objectif Brevet (programme de rosace, rotation dans un repère).
   Rotations dans un repère : sens inverse des aiguilles d'une montre, sauf mention contraire.
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs, repere, cote, Ro } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const R = P3.R;
// Repère avec trois points (rotation de centre O).
const rep3 = (pts, px) => repere({ x: [-5, 5], y: [-5, 5], u: 16, px: px || 165, pts: pts.map(([x, y, t]) => ({ x, y, t })) });
// Construction : triangle ABC et centre O sur quadrillage ; image par la rotation de 90° dans le sens des aiguilles d'une montre.
const T0 = [[6, 5], [8, 5], [6, 7]], rot = ([x, y]) => [5 + (y - 4), 4 - (x - 5)], T1 = T0.map(rot);
const quad = corr => repere({ x: [0, 10], y: [0, 8], u: 18, axes: false, px: 150,
  polys: [[T0, '#1F3A5C', '#EAF4FB'], ...(corr ? [[T1, Ro, 'rgba(227,93,58,.10)']] : [])],
  pts: [{ x: 5, y: 4, c: '#1F3A5C', t: 'O', dx: -12, dy: 4 }, { x: 6, y: 5, c: '#1F3A5C', t: 'A', dx: -12, dy: -2 }, { x: 8, y: 5, c: '#1F3A5C', t: 'B' }, { x: 6, y: 7, c: '#1F3A5C', t: 'C' },
    ...(corr ? [{ x: 6, y: 3, c: Ro, t: 'A\'' }, { x: 6, y: 1, c: Ro, t: 'B\'' }, { x: 8, y: 3, c: Ro, t: 'C\'' }] : [])] });
const brevetRep = repere({ x: [-6, 5], y: [-1, 6], u: 16, px: 190, polys: [[[[1, 2], [4, 2], [1, 5]], '#1F3A5C', '#EAF4FB']], pts: [{ x: 1, y: 2, t: 'A', dx: -12, dy: 12 }, { x: 4, y: 2, t: 'B' }, { x: 1, y: 5, t: 'C' }] });
PLANCHES['3e|Rotation'] = [
  { titre: 'Image par une rotation', duree: '35 min',
    attendus: ['Construire l\'image d\'un point par une rotation (centre, angle, sens)', 'Trouver des coordonnées après une rotation de 90° ou de 180°', 'Connaître ce que conserve une rotation'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['Une rotation de 180° est :', 'une symétrie centrale', 'une symétrie centrale · une symétrie axiale · une translation'], ['Une rotation conserve :', 'les longueurs et les angles', 'les longueurs et les angles · seulement les angles · rien'], ['Le centre d\'une rotation :', 'ne bouge pas', 'ne bouge pas · tourne aussi · disparaît']]) },
      { etoiles: 2, col: 1, consigne: 'Rotation de centre O, d\'angle 90°, dans le sens inverse des aiguilles d\'une montre. Donne les coordonnées des images.',
        ...fig(rep3([[3, 1, 'A'], [2, -2, 'B'], [-1, 4, 'C']]), [['A\'(@ ; @)', '−1', 3], ['B\'(@ ; @)', 2, 2], ['C\'(@ ; @)', '−4', '−1']]) },
      { etoiles: 2, col: 1, consigne: 'Rotation de centre O et d\'angle 180°. Donne les coordonnées des images.',
        ...rmp([['A(2 ; 5) → A\'(@ ; @)', '−2', '−5'], ['B(−3 ; 1) → B\'(@ ; @)', 3, '−1'], ['C(0 ; −4) → C\'(@ ; @)', 0, 4]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Reproduis la figure, puis construis l\'image du triangle ABC par la rotation de centre O, d\'angle 90°, dans le sens des aiguilles d\'une montre.',
        eleve: `<div style="text-align:center;">${quad(false)}</div>`, corr: `<div style="text-align:center;">${quad(true)}</div>` },
      { etoiles: 2, col: 1, consigne: 'A\' est l\'image de A par la rotation de centre O et d\'angle 60°, avec OA = 5 cm.',
        ...rmp([['OA\' = @ cm', 5], ['L\'angle AOA\' mesure @°', 60], ['Le triangle OAA\' est @', 'équilatéral']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un motif est tourné plusieurs fois de 72° autour d\'un même centre. Combien de rotations faut-il pour revenir à la position de départ ? Et avec 45° ?',
        corr: cm1Redac('72°', '360 : 72 = 5', 'Il faut 5 rotations : on obtient une rosace à 5 motifs.') + cm1Redac('45°', '360 : 45 = 8', 'Avec 45°, il en faut 8.') },
    ] },
  { titre: 'Angles de rotation, horloges et rosaces', duree: '35 min',
    attendus: ['Calculer l\'angle d\'une rotation', 'Reconnaître les figures qui se superposent par rotation', 'Résoudre des problèmes d\'horloge'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quelle transformation reconnais-tu ? Entoure.',
        ...ch([['Les pales d\'une éolienne qui tournent :', 'rotation'], ['Les wagons d\'un train alignés :', 'translation'], ['Une image dans un miroir :', 'symétrie axiale'], ['La grande aiguille d\'une montre :', 'rotation']], 'symétrie axiale · translation · rotation') },
      { etoiles: 2, col: 1, consigne: 'Plus petit angle d\'une rotation qui superpose la figure à elle-même :',
        ...rmp([['Triangle équilatéral : @°', 120], ['Carré : @°', 90], ['Pentagone régulier : @°', 72], ['Hexagone régulier : @°', 60]]) },
      { etoiles: 2, col: 1, consigne: 'De quel angle tourne une aiguille de montre ?',
        ...rmp([['La grande aiguille en 15 min : @°', 90], ['La grande aiguille en 20 min : @°', 120], ['La grande aiguille en 10 min : @°', 60], ['La petite aiguille en 1 h : @°', 30]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Quel angle les deux aiguilles d\'une horloge forment-elles à 3 h ? À 4 h ? À 9 h 30 ?',
        corr: cm1Redac('Angles', { suite: ['3 h : 3 × 30 = 90°', '4 h : 4 × 30 = 120°', '9 h 30 : la petite aiguille est entre 9 et 10, la grande sur le 6 : 3,5 × 30 = 105°'] }, '') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'ABCD est un carré de centre O. Quelle rotation transforme A en B, B en C, C en D et D en A ? Quelle est l\'image de la diagonale [AC] ?',
        corr: cm1Redac('Rotation', '', 'C\'est la rotation de centre O et d\'angle 90° (dans le sens A → B). L\'image de [AC] est [BD].') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un rectangle (non carré) se superpose à lui-même par une rotation de 90°.', 'faux'], ['Un rectangle se superpose à lui-même par une rotation de 180°.', 'vrai'], ['Un cercle se superpose à lui-même par toute rotation de centre son centre.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une roue dentée de 20 dents entraîne une roue de 50 dents. La petite roue fait un tour complet (360°). De quel angle tourne la grande roue ?',
        corr: cm1Redac('Raisonnement', { suite: ['20 dents passent : 20 / 50 = 0,4 tour', '0,4 × 360 = 144'] }, 'La grande roue tourne de 144°.') },
    ] },
  { titre: 'Les transformations du plan', duree: '40 min',
    attendus: ['Distinguer symétries, translation, rotation et homothétie', 'Calculer des coordonnées d\'images', 'Composer deux transformations'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la transformation qui convient.',
        ...chx([['Elle agrandit les figures :', 'homothétie de rapport 3', 'translation · rotation · homothétie de rapport 3'], ['Elle fait « glisser » une figure :', 'translation', 'translation · rotation · homothétie de rapport 3'], ['Elle fait « tourner » une figure :', 'rotation', 'translation · rotation · homothétie de rapport 3'], ['Elle « retourne » une figure :', 'symétrie axiale', 'symétrie axiale · rotation · translation']]) },
      { etoiles: 2, col: 1, consigne: 'A(2 ; 3). Donne les coordonnées de son image.',
        ...rmp([['Par la symétrie de centre O : (@ ; @)', '−2', '−3'], ['Par la symétrie d\'axe (Ox) : (@ ; @)', 2, '−3'], ['Par la translation qui envoie O sur (1 ; −2) : (@ ; @)', 3, 1], ['Par l\'homothétie de centre O et de rapport 2 : (@ ; @)', 4, 6]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La symétrie axiale conserve les longueurs.', 'vrai'], ['L\'homothétie de rapport 2 conserve les longueurs.', 'faux'], ['Toutes ces transformations conservent les angles.', 'vrai'], ['Une rotation de 180° est une symétrie centrale.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une transformation envoie A(1 ; 0) sur A\'(0 ; 1) et B(0 ; 1) sur B\'(−1 ; 0), et ne bouge pas O. Laquelle ?',
        corr: cm1Redac('Raisonnement', 'OA = OA\' = 1 et l\'angle AOA\' est droit ; de même pour B.', 'C\'est la rotation de centre O et d\'angle 90°, dans le sens inverse des aiguilles d\'une montre.') },
      { etoiles: 2, col: 1, consigne: 'Une rotation de centre O et d\'angle 120° est appliquée 3 fois de suite.',
        ...rmp([['Angle total : @°', 360], ['La figure revient-elle à sa position de départ ? @', 'oui']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un motif de 3 cm de large est reproduit par des translations de 3 cm pour faire une frise de 30 cm. Combien de motifs y a-t-il ?',
        corr: cm1Redac('Nombre de motifs', '30 : 3 = 10', 'La frise compte 10 motifs.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On applique à A(2 ; 1) la symétrie d\'axe (Ox), puis la symétrie d\'axe (Oy). Quelle transformation unique donne le même résultat ?',
        corr: cm1Redac('Images', { suite: ['Symétrie d\'axe (Ox) : (2 ; −1)', 'Puis symétrie d\'axe (Oy) : (−2 ; −1)'] }, 'On obtient le symétrique de A par rapport à O : c\'est la symétrie centrale de centre O (rotation de 180°).') },
    ] },
  { titre: 'Rotation et transformations', duree: '45 min', brevet: true,
    attendus: ['Automatismes : transformations, angles, coordonnées', 'Analyser un programme qui dessine une rosace', 'Utiliser une rotation dans un repère'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Une rotation de 180° de centre O est :', 'une symétrie centrale', ['une symétrie centrale', 'une translation', 'une homothétie']], ['En 30 min, la grande aiguille tourne de (en degrés)', 180], ['Image de A(3 ; 1) par la symétrie de centre O :', '(−3 ; −1)', ['(−3 ; 1)', '(−3 ; −1)', '(3 ; −1)']], ['Une rotation conserve :', 'les longueurs', ['les longueurs', 'seulement les angles', 'rien']], ['Plus petit angle de rotation qui superpose un carré à lui-même (en degrés)', 90], ['Une homothétie de rapport −1 est :', 'une symétrie centrale', ['une rotation de 90°', 'une symétrie centrale', 'une translation']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Un programme de dessin (comme sur Scratch) exécute : <b>répéter 6 fois</b> [ dessiner un triangle équilatéral de côté 50 pas ; tourner de 60° ]. Tous les triangles ont un sommet commun, le point de départ.'
          + qs(['Quelle transformation permet de passer d\'un triangle au suivant ? Préciser son centre et son angle.', 'Pourquoi le motif est-il répété 6 fois ?', 'Quelle figure obtient-on ? Quel est son périmètre ?', 'Quel angle faudrait-il choisir pour une rosace de 8 motifs ?']),
        corr: cm1Redac('Transformation', '', 'La rotation de centre le point de départ et d\'angle 60°.') + cm1Redac('6 répétitions', '6 × 60 = 360', 'Après 6 rotations, on a fait un tour complet.')
          + cm1Redac('Figure', '6 × 50 = 300', 'Les 6 triangles forment un hexagone régulier de côté 50 pas : son périmètre est 300 pas.') + cm1Redac('8 motifs', '360 : 8 = 45', 'Il faudrait tourner de 45°.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: '<span>Dans un repère, A(1 ; 2), B(4 ; 2) et C(1 ; 5).</span>' + cote(brevetRep, qs(['Quelle est la nature du triangle ABC ? Justifier.', 'Donner les coordonnées de A\', B\' et C\', images de A, B et C par la rotation de centre O et d\'angle 90° (sens inverse des aiguilles d\'une montre).', 'Quelle est l\'aire du triangle A\'B\'C\' ? Justifier sans calcul de longueur supplémentaire.'])),
        corr: cm1Redac('Nature de ABC', 'AB = 3 (horizontal) et AC = 3 (vertical)', 'ABC est rectangle et isocèle en A.')
          + cm1Redac('Images', { suite: ['La rotation de 90° envoie (x ; y) sur (−y ; x).', 'A\'(−2 ; 1), B\'(−2 ; 4), C\'(−5 ; 1)'] }, '')
          + cm1Redac('Aire', 'Aire de ABC : 3 × 3 : 2 = 4,5', 'Une rotation conserve les aires : l\'aire de A\'B\'C\' est 4,5 unités d\'aire.') },
    ] },
];
})();

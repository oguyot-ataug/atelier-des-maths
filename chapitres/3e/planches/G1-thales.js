/* ============================================================
   3e · Planches : Théorème de Thalès (G1)
   Calculer une longueur ; réciproque (droites parallèles ou non) ; Thalès et Pythagore ; problèmes
   concrets, agrandissements et réductions ; Objectif Brevet.
   ============================================================ */
(() => {
const { R, T, rmp, ch, chx, auto, qs, geo, cote, Bl, Ro } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const sur = (A, B, t) => [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t];
// Triangle ABC, (MN) parallèle à (BC), AM/AB = 3/5.
const tA = [120, 15], tB = [20, 170], tC = [230, 170];
const triangle = (cotes, px) => geo({ pts: { A: tA, B: tB, C: tC, M: sur(tA, tB, .6), N: sur(tA, tC, .6) }, poly: [[['A', 'B', 'C']]], segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['M', 'N', { c: Bl, w: 2.4 }]], cotes: cotes || [], off: { M: [-12, 2], N: [12, 2] }, px: px || 135 });
// Papillon : (AB) // (DE), droites (AD) et (BE) sécantes en C, CD/CA = 1,5.
const pC = [130, 95], pA = [30, 30], pB = [30, 160], ext = (P, k) => [pC[0] + k * (pC[0] - P[0]), pC[1] + k * (pC[1] - P[1])];
const papillon = (cotes, px) => geo({ pts: { A: pA, B: pB, C: pC, D: ext(pA, 1.5), E: ext(pB, 1.5) }, segs: [['A', 'D'], ['B', 'E'], ['A', 'B', { c: Bl, w: 2.4 }], ['D', 'E', { c: Bl, w: 2.4 }]], cotes: cotes || [], off: { C: [0, -10] }, px: px || 170 });
// Triangle rectangle en B, (MN) // (BC), AM = 2, AB = 8, BC = 6.
const rA = [20, 10], rB = [20, 170], rC = [140, 170];
const rectT = geo({ pts: { A: rA, B: rB, C: rC, M: sur(rA, rB, .25), N: sur(rA, rC, .25) }, poly: [[['A', 'B', 'C']]], segs: [['A', 'B'], ['B', 'C'], ['A', 'C'], ['M', 'N', { c: Bl, w: 2.4 }]], droits: [['A', 'B', 'C']], off: { M: [-12, 4], N: [10, 0] }, px: 120 });
// Brevet : rampe de skate, triangle ACD rectangle en C, (BE) // (CD).
const sA = [10, 150], sC = [210, 150], sD = [210, 0], sB = [70, 150], sE = [70, 105];
const skate = geo({ pts: { A: sA, B: sB, C: sC, D: sD, E: sE }, poly: [[['A', 'C', 'D']]], segs: [['A', 'C'], ['C', 'D'], ['A', 'D'], ['B', 'E', { c: Bl, w: 2.4 }]], droits: [['A', 'C', 'D']], px: 190 });
// Brevet : rivière, droites (AD) et (BC) sécantes en O.
const n = v => { const d = Math.hypot(v[0], v[1]); return [v[0] / d, v[1] / d]; }, dA = n([-1, -.35]), dB = n([-.75, .65]), O = [150, 95];
const pt = (d, k) => [O[0] + d[0] * k, O[1] + d[1] * k];
const riviere = geo({ pts: { O, A: pt(dA, 90), D: pt(dA, -36), B: pt(dB, 105), C: pt(dB, -42) }, segs: [['A', 'D'], ['B', 'C'], ['A', 'B', { c: Bl, w: 2.4 }], ['C', 'D', { c: Bl, w: 2.4 }]], off: { O: [12, 0] }, px: 160 });
PLANCHES['3e|Théorème de Thalès'] = [
  { titre: 'Calculer une longueur avec Thalès', duree: '35 min',
    attendus: ['Reconnaître une configuration de Thalès (triangles emboîtés ou papillon)', 'Écrire l\'égalité des rapports', 'Calculer une longueur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Les droites (MN) et (BC) sont parallèles. Complète l\'égalité des rapports.',
        ...fig(triangle(), [['AM / AB = AN / @', 'AC'], ['AM / AB = MN / @', 'BC']]) },
      { etoiles: 1, col: 1, consigne: '(MN) // (BC) ; AM = 3 cm, AB = 5 cm, AC = 7 cm, BC = 8 cm.',
        ...fig(triangle([['A', 'M', '3', -1], ['B', 'C', '8', -1]]), [['AN = @ cm', '4,2'], ['MN = @ cm', '4,8']]) },
      { etoiles: 2, col: 1, consigne: '(AB) // (DE) ; CA = 4 cm, CD = 6 cm, CB = 3 cm, DE = 7,5 cm.',
        ...fig(papillon(), [['AB = @ cm', 5], ['CE = @ cm', '4,5']]) },
      { etoiles: 2, col: 1, consigne: 'Peut-on utiliser le théorème de Thalès ? Entoure.',
        ...ch([['M ∈ [AB], N ∈ [AC] et (MN) // (BC) :', 'oui'], ['M ∈ [AB], N ∈ [AC], sans droites parallèles :', 'non'], ['Deux droites sécantes en C coupées par deux droites parallèles :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'A, M, B sont alignés, ainsi que A, N, C ; (MN) // (BC). AM = 2,4 cm, MB = 3,6 cm et MN = 3 cm. Calcule BC.',
        corr: cm1Redac('Thalès', { suite: ['AB = 2,4 + 3,6 = 6 cm', `(MN) // (BC) : ${cm1Frac('AM', 'AB')} = ${cm1Frac('MN', 'BC')}, soit ${cm1Frac('2,4', 6)} = ${cm1Frac(3, 'BC')}`, 'BC = 3 × 6 : 2,4 = 7,5'] }, 'BC = 7,5 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un bâton vertical de 1,5 m a une ombre de 2 m. Au même moment, l\'ombre d\'un arbre mesure 12 m. Quelle est la hauteur de l\'arbre ?',
        corr: cm1Redac('Thalès', { suite: ['Les rayons du soleil sont parallèles.', `${cm1Frac('h', '1,5')} = ${cm1Frac(12, 2)}`, 'h = 1,5 × 12 : 2 = 9'] }, 'L\'arbre mesure 9 m.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pour mesurer la largeur AB d\'une rivière, on utilise une figure en papillon : (AB) // (DE), C est le point d\'intersection de (AD) et (BE). CA = 12 m, CD = 4 m et DE = 5 m. Calcule AB.',
        corr: cm1Redac('Thalès', { suite: [`${cm1Frac('CA', 'CD')} = ${cm1Frac('AB', 'DE')}`, `${cm1Frac(12, 4)} = ${cm1Frac('AB', 5)}`, 'AB = 5 × 3 = 15'] }, 'La rivière mesure 15 m de large.') },
    ] },
  { titre: 'La réciproque : droites parallèles ?', duree: '35 min',
    attendus: ['Comparer deux rapports de longueurs', 'Prouver que deux droites sont parallèles (réciproque)', 'Prouver que deux droites ne sont pas parallèles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'M ∈ [AB] et N ∈ [AC] ; AM = 3, AB = 5, AN = 4,5 et AC = 7,5.',
        ...rmp([[`${T('AM', 'AB')} = @`, '0,6'], [`${T('AN', 'AC')} = @`, '0,6'], ['Les droites (MN) et (BC) sont-elles parallèles ? @', 'oui']]) },
      { etoiles: 2, col: 1, consigne: 'M ∈ [AB] et N ∈ [AC]. (MN) et (BC) sont-elles parallèles ? Entoure.',
        ...ch([['AM = 2, AB = 5, AN = 3, AC = 7,5 :', 'oui'], ['AM = 4, AB = 6, AN = 5, AC = 8 :', 'non'], ['AM = 1,5, AB = 4,5, AN = 2, AC = 6 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Si les rapports sont égaux et les points dans le même ordre, les droites sont parallèles.', 'vrai'], ['La réciproque sert à prouver que deux droites sont parallèles.', 'vrai'], ['Si les rapports sont différents, les droites sont parallèles.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'E ∈ [AB] et F ∈ [AC] ; AE = 4,2 cm, AB = 6 cm, AF = 3,5 cm et AC = 5 cm. Les droites (EF) et (BC) sont-elles parallèles ?',
        corr: cm1Redac('Rapports', { suite: [`${cm1Frac('AE', 'AB')} = ${cm1Frac('4,2', 6)} = 0,7`, `${cm1Frac('AF', 'AC')} = ${cm1Frac('3,5', 5)} = 0,7`] }, 'Les rapports sont égaux et A, E, B et A, F, C sont alignés dans le même ordre : d\'après la réciproque du théorème de Thalès, (EF) // (BC).') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Les droites (AB) et (MN) sont sécantes en O, avec M ∈ [OA] et N ∈ [OB]. OM = 5, OA = 8, ON = 4 et OB = 6,5. (MN) et (AB) sont-elles parallèles ?',
        corr: cm1Redac('Rapports', { suite: [`${cm1Frac('OM', 'OA')} = ${cm1Frac(5, 8)} = 0,625`, `${cm1Frac('ON', 'OB')} = ${cm1Frac(4, '6,5')} ≈ 0,615`] }, 'Les rapports ne sont pas égaux : si les droites étaient parallèles, ils le seraient (théorème de Thalès). Donc (MN) et (AB) ne sont pas parallèles.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Dans le triangle ABC, AB = 4, AC = 5 et BC = 6. On place D sur [AB) et E sur [AC) avec AD = 10 et AE = 12,5. Montre que (DE) // (BC), puis calcule DE.',
        corr: cm1Redac('Parallèles', `${cm1Frac('AB', 'AD')} = ${cm1Frac(4, 10)} = 0,4 et ${cm1Frac('AC', 'AE')} = ${cm1Frac(5, '12,5')} = 0,4`, 'D\'après la réciproque du théorème de Thalès, (DE) // (BC).') + cm1Redac('Longueur DE', 'DE = BC : 0,4 = 6 : 0,4 = 15', 'DE = 15.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Les points A, O, C sont alignés dans cet ordre, ainsi que B, O, D. OA = 3, OC = 4,5, OB = 4 et OD = 6. Les droites (AB) et (CD) sont-elles parallèles ?',
        corr: cm1Redac('Rapports', `${cm1Frac('OA', 'OC')} = ${cm1Frac(3, '4,5')} = ${cm1Frac(2, 3)} et ${cm1Frac('OB', 'OD')} = ${cm1Frac(4, 6)} = ${cm1Frac(2, 3)}`, 'Les rapports sont égaux et les points sont alignés dans le même ordre (configuration papillon) : (AB) // (CD).') },
    ] },
  { titre: 'Thalès et Pythagore', duree: '40 min',
    attendus: ['Calculer une longueur avec le théorème de Pythagore', 'Prouver qu\'un triangle est rectangle (réciproque)', 'Enchaîner Pythagore et Thalès'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (triangles rectangles).',
        ...rmp([['Côtés de l\'angle droit 3 et 4 : hypoténuse @', 5], ['Côtés de l\'angle droit 5 et 12 : hypoténuse @', 13], ['Hypoténuse 10, un côté 6 : l\'autre côté mesure @', 8]]) },
      { etoiles: 2, col: 1, consigne: 'Le triangle est-il rectangle ? Entoure.',
        ...ch([['Côtés 6 ; 8 ; 10 :', 'oui'], ['Côtés 5 ; 6 ; 8 :', 'non'], ['Côtés 9 ; 12 ; 15 :', 'oui'], ['Côtés 7 ; 24 ; 25 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Complète (au dixième si besoin).',
        ...rmp([['Diagonale d\'un carré de 5 cm de côté : @ cm', '7,1'], ['Diagonale d\'un rectangle de 9 cm sur 12 cm : @ cm', 15]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une échelle de 5 m est appuyée contre un mur vertical ; son pied est à 1,4 m du mur. À quelle hauteur arrive-t-elle ?',
        corr: cm1Redac('Pythagore', { suite: ['h² + 1,4² = 5²', 'h² = 25 − 1,96 = 23,04', 'h = √23,04 = 4,8'] }, 'L\'échelle arrive à 4,8 m de hauteur.') },
      { etoiles: 2, cahier: true, consigne: `<span>ABC est rectangle en B, AB = 8 cm et BC = 6 cm. M ∈ [AB] avec AM = 2 cm, N ∈ [AC] et (MN) // (BC). Calcule AC, puis MN et AN.</span><div style="text-align:center;">${rectT}</div>`,
        corr: cm1Redac('AC (Pythagore)', 'AC² = 8² + 6² = 100, donc AC = 10', '') + cm1Redac('MN et AN (Thalès)', { suite: [`${cm1Frac('AM', 'AB')} = ${cm1Frac('AN', 'AC')} = ${cm1Frac('MN', 'BC')}, soit ${cm1Frac(2, 8)} = ${cm1Frac('AN', 10)} = ${cm1Frac('MN', 6)}`, 'MN = 6 × 2 : 8 = 1,5', 'AN = 10 × 2 : 8 = 2,5'] }, 'AC = 10 cm, MN = 1,5 cm et AN = 2,5 cm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une rampe d\'accès doit avoir une pente d\'au plus 5 % (hauteur : longueur horizontale). Pour monter de 0,4 m, quelle longueur horizontale faut-il au minimum ? Quelle est alors la longueur de la rampe ?',
        corr: cm1Redac('Longueur horizontale', '0,4 : 0,05 = 8', 'Il faut au moins 8 m.') + cm1Redac('Longueur de la rampe', 'L² = 8² + 0,4² = 64,16 ; L ≈ 8,01', 'La rampe mesure environ 8,01 m.') },
    ] },
  { titre: 'Agrandissements, réductions et problèmes', duree: '40 min',
    attendus: ['Utiliser Thalès dans une situation concrète', 'Connaître l\'effet d\'un agrandissement ou d\'une réduction sur les longueurs et les aires', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Un triangle de côtés 3 cm, 4 cm et 5 cm est agrandi : le côté de 3 cm devient 4,5 cm.',
        ...rmp([['Coefficient d\'agrandissement : @', '1,5'], ['Nouveaux côtés : 4,5 ; @ ; @', 6, '7,5'], ['Les aires sont multipliées par @', '2,25']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Si les longueurs sont multipliées par 2, les aires aussi.', 'faux'], ['Un agrandissement conserve les angles.', 'vrai'], ['Si les longueurs sont multipliées par 2, les volumes sont multipliés par 8.', 'vrai'], ['Une réduction a un coefficient supérieur à 1.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un poteau de 2 m projette une ombre de 3 m. Au même moment, l\'ombre d\'un immeuble mesure 36 m. Quelle est la hauteur de l\'immeuble ?',
        corr: cm1Redac('Thalès', { suite: [`${cm1Frac('h', 2)} = ${cm1Frac(36, 3)}`, 'h = 2 × 12 = 24'] }, 'L\'immeuble mesure 24 m.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Les montants [AB] et [AC] d\'un escabeau mesurent 2 m. Une barre [MN] parallèle au sol est fixée à 0,5 m du sommet A sur chaque montant. L\'écartement au sol est BC = 1,2 m. Quelle est la longueur de la barre ?',
        corr: cm1Redac('Thalès', { suite: [`${cm1Frac('AM', 'AB')} = ${cm1Frac('MN', 'BC')}, soit ${cm1Frac('0,5', 2)} = ${cm1Frac('MN', '1,2')}`, 'MN = 1,2 × 0,5 : 2 = 0,3'] }, 'La barre mesure 0,3 m, soit 30 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une règle de 30 cm, tenue verticalement à 60 cm de l\'œil, cache exactement un arbre situé à 40 m. Quelle est la hauteur de l\'arbre ?',
        corr: cm1Redac('Thalès', { suite: [`${cm1Frac('h', '0,3')} = ${cm1Frac(40, '0,6')}`, 'h = 0,3 × 40 : 0,6 = 20'] }, 'L\'arbre mesure environ 20 m.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La charpente d\'une cabane est un triangle ABC. Une poutre [MN] est parallèle à [BC], avec M ∈ [AB], AM = 1,2 m et AB = 3 m. Sachant que BC = 4 m, calcule MN.',
        corr: cm1Redac('Thalès', 'MN = 4 × 1,2 : 3 = 1,6', 'La poutre mesure 1,6 m.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans le triangle ABC, AB = 9 cm ; M ∈ [AB], N ∈ [AC] et (MN) // (BC). Où placer M pour que MN soit le tiers de BC ? Et pour que l\'aire de AMN soit le quart de celle de ABC ?',
        corr: cm1Redac('MN = BC : 3', 'Le coefficient de réduction est 1/3 : AM = 9 : 3 = 3', 'Il faut AM = 3 cm.') + cm1Redac('Aire divisée par 4', 'Les aires sont multipliées par k² : k² = 1/4, donc k = 1/2', 'Il faut AM = 4,5 cm.') },
    ] },
  { titre: 'Théorème de Thalès', duree: '45 min', brevet: true,
    attendus: ['Automatismes : Pythagore, Thalès, agrandissements', 'Enchaîner réciproque de Pythagore et théorème de Thalès', 'Prouver un parallélisme et calculer une distance'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Hypoténuse d\'un triangle rectangle de côtés 6 et 8 :', 10], [`(MN) // (BC), ${T('AM', 'AB')} = ${T(1, 3)} et BC = 12 : MN =`, 4], ['Agrandissement de coefficient 3 : les aires sont multipliées par', '9', ['3', '6', '9']], ['Rapports égaux à 0,5, points alignés dans le même ordre : (MN) et (BC) sont', 'parallèles', ['parallèles', 'perpendiculaires', 'sécantes']], ['Réduction de coefficient 0,5 : 8 cm deviennent (en cm)', 4], ['Le triangle de côtés 5, 12, 13 est-il rectangle ?', 'oui', ['oui', 'non']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: `<span>Voici le profil d'une rampe de skate. Les points A, B, C sont alignés, ainsi que A, E, D. AB = 1,2 m, BE = 0,9 m, AE = 1,5 m et BC = 2,8 m. Le triangle ACD est rectangle en C.</span>` + cote(skate, qs(['Montrer que le triangle ABE est rectangle en B.', 'En déduire que les droites (BE) et (CD) sont parallèles.', 'Calculer la hauteur CD de la rampe.', 'Calculer la longueur AD, puis le périmètre du triangle ACD.'])),
        corr: cm1Redac('ABE rectangle', { suite: ['AE² = 1,5² = 2,25', 'AB² + BE² = 1,44 + 0,81 = 2,25'] }, 'AE² = AB² + BE² : d\'après la réciproque du théorème de Pythagore, ABE est rectangle en B.')
          + cm1Redac('Parallèles', '(BE) et (CD) sont toutes les deux perpendiculaires à (AC).', 'Donc (BE) // (CD).')
          + cm1Redac('Hauteur CD (Thalès)', { suite: ['AC = 1,2 + 2,8 = 4 m', `${cm1Frac('AB', 'AC')} = ${cm1Frac('BE', 'CD')}, soit ${cm1Frac('1,2', 4)} = ${cm1Frac('0,9', 'CD')}`, 'CD = 0,9 × 4 : 1,2 = 3'] }, 'La rampe mesure 3 m de haut.')
          + cm1Redac('AD et périmètre', { suite: ['AD = 1,5 × 4 : 1,2 = 5 m', '4 + 3 + 5 = 12'] }, 'Le périmètre du triangle ACD est 12 m.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: `<span>Pour estimer la largeur d'une rivière, on a planté des piquets A, B, C, D et O. Les points A, O, D sont alignés, ainsi que B, O, C. OA = 30 m, OD = 12 m, OB = 35 m, OC = 14 m et CD = 10 m.</span>` + cote(riviere, qs(['Montrer que les droites (AB) et (CD) sont parallèles.', 'Calculer la longueur AB.', 'Un nageur traverse en suivant [AB] à 1,2 m/s. Combien de temps met-il ?'])),
        corr: cm1Redac('Parallèles', `${cm1Frac('OA', 'OD')} = ${cm1Frac(30, 12)} = 2,5 et ${cm1Frac('OB', 'OC')} = ${cm1Frac(35, 14)} = 2,5`, 'Les rapports sont égaux et les points sont alignés dans le même ordre : d\'après la réciproque du théorème de Thalès, (AB) // (CD).')
          + cm1Redac('Longueur AB', 'AB = 2,5 × CD = 2,5 × 10 = 25', 'AB = 25 m.') + cm1Redac('Durée', '25 : 1,2 ≈ 20,8', 'Le nageur met environ 21 s.') },
    ] },
];
})();

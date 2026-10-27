/* ============================================================
   CM2 · Planches : Droites, segments et cercles (G1)
   Notations (AB), [AB], [AB) ; droites perpendiculaires et parallèles ; cercle et disque
   (centre, rayon, diamètre). Les notations sont toujours expliquées.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const { K, RO, VE, BL, svg, L, X, D, DD, Q, carte, droit } = CM2G;
const NOT = 'Rappel des notations : <b>(AB)</b> est la droite qui passe par A et B ; <b>[AB]</b> est le segment d\'extrémités A et B ; <b>[AB)</b> est la demi-droite d\'origine A qui passe par B.';
// Trois tracés : segment, droite, demi-droite.
const trace = k => { const a = [30, 30], b = [110, 30]; return svg(150, 50, (k === 0 ? L(a, b, K, 2) : k === 1 ? D(a, b, K, 2, 22) : DD(a, b, K, 2, 22)) + X(a, 'A', [0, -9]) + X(b, 'B', [0, -9]), 140); };
const pts4 = { A: [40, 110], B: [130, 40], C: [230, 120], D: [300, 50] };
const fig4 = sol => svg(340, 150, (sol ? L(pts4.A, pts4.B, RO, 2.2) + D(pts4.B, pts4.C, BL, 2.2, 30) + DD(pts4.C, pts4.D, VE, 2.2, 30) : '') + Object.entries(pts4).map(([n, p]) => X(p, n, [0, n === 'A' || n === 'C' ? 18 : -9])).join(''), 300);
// Quatre droites : d1 horizontale, d2 verticale, d3 parallèle à d1, d4 oblique.
const droites = svg(300, 170, D([20, 50], [280, 50], K, 2, 0) + D([110, 10], [110, 160], BL, 2, 0) + D([20, 120], [280, 120], VE, 2, 0) + D([170, 160], [290, 10], RO, 2, 0)
  + cmT(24, 44, '(d1)', { fs: 12, c: K, a: 'start' }) + cmT(116, 22, '(d2)', { fs: 12, c: BL, a: 'start' }) + cmT(285, 114, '(d3)', { fs: 12, c: VE, a: 'end' }) + cmT(218, 160, '(d4)', { fs: 12, c: RO, a: 'start' }), 280);
const perpQ = sol => Q(10, 7, 20, g => L(g(0, 2), g(10, 2), K, 2) + cmT(g(9.5, 1.6)[0], g(9.5, 1.6)[1], '(d)', { fs: 12, c: K }) + X(g(6, 5), 'M', [10, 4]) + (sol ? L(g(6, 0), g(6, 7), VE, 2.4) + droit(g(7, 2), g(6, 2), g(6, 3), VE) : ''), 200);
const paraQ = sol => Q(10, 7, 20, g => L(g(0, 6), g(6, 0), K, 2) + cmT(g(1.3, 4.3)[0], g(1.3, 4.3)[1], '(d)', { fs: 12, c: K }) + X(g(5, 6), 'N', [10, 4]) + (sol ? L(g(4, 7), g(10, 1), VE, 2.4) : ''), 200);
const O = [90, 80], r = 60;
const cercle = svg(180, 160, `<circle cx="${O[0]}" cy="${O[1]}" r="${r}" fill="#EAF6FB" stroke="${K}" stroke-width="2"/>` + L([30, 80], [150, 80], RO, 2) + L(O, [90 + r * Math.cos(-1.1), 80 + r * Math.sin(-1.1)], BL, 2)
  + X(O, 'O', [-4, 16]) + X([30, 80], 'A', [-10, 4]) + X([150, 80], 'B', [10, 4]) + X([90 + r * Math.cos(-1.1), 80 + r * Math.sin(-1.1)], 'C', [8, -6]), 160);
PLANCHES['cm2|Droites, segments et cercles'] = [
  { titre: 'Droite, segment, demi-droite', duree: '30 min',
    attendus: ['Connaître les notations (AB), [AB] et [AB)', 'Tracer une droite, un segment, une demi-droite', 'Utiliser les longueurs de segments alignés'],
    exos: [
      { etoiles: 1, consigne: NOT + ' Écris la notation de chaque tracé.',
        eleve: plGrille([0, 1, 2].map(k => carte(trace(k), B(3))), 3), corr: plGrille(['[AB]', '(AB)', '[AB)'].map((n, k) => carte(trace(k), R(n))), 3) },
      { etoiles: 2, consigne: 'Trace en rouge le segment [AB], en bleu la droite (BC), en vert la demi-droite [CD).',
        eleve: `<div style="text-align:center;">${fig4(false)}</div>`, corr: `<div style="text-align:center;">${fig4(true)}</div>` },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un segment a deux extrémités.', 'vrai'], ['On peut mesurer la longueur d\'une droite.', 'faux'], ['La demi-droite [AB) a pour origine le point A.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Les points A, B et C sont alignés dans cet ordre. AB = 4 cm et BC = 3,5 cm. Fais un schéma, puis calcule la longueur AC.',
        corr: cm1Redac('Longueur AC', '4 + 3,5 = 7,5', 'B est entre A et C : AC = 7,5 cm.') },
      { etoiles: 1, col: 1, consigne: 'Écris avec la bonne notation.', ...P3.rmp([['le segment d\'extrémités A et B : @', '[AB]'], ['la droite qui passe par C et D : @', '(CD)'], ['la demi-droite d\'origine E qui passe par F : @', '[EF)']], 2) },
    ] },
  { titre: 'Droites perpendiculaires et parallèles', duree: '35 min',
    attendus: ['Reconnaître des droites perpendiculaires et parallèles', 'Tracer une perpendiculaire et une parallèle sur quadrillage', 'Utiliser l\'équerre'],
    exos: [
      { etoiles: 1, consigne: `Observe les droites. Vérifie avec ton équerre, puis entoure.<div style="text-align:center;">${droites}</div>`,
        ...ch([['(d1) et (d2) sont…', 'perpendiculaires'], ['(d1) et (d3) sont…', 'parallèles'], ['(d2) et (d3) sont…', 'perpendiculaires'], ['(d1) et (d4) sont…', 'ni l\'un ni l\'autre']], 'perpendiculaires · parallèles · ni l\'un ni l\'autre') },
      { etoiles: 2, col: 1, consigne: 'Trace la droite perpendiculaire à la droite (d) passant par le point M.', eleve: perpQ(false), corr: perpQ(true) },
      { etoiles: 2, col: 1, consigne: 'Trace la droite parallèle à la droite (d) passant par le point N.', eleve: paraQ(false), corr: paraQ(true) },
      { etoiles: 3, cahier: true, consigne: 'Sur une feuille blanche, trace une droite (d) et place un point A qui n\'est pas sur (d). Trace la perpendiculaire à (d) passant par A, puis la parallèle à (d) passant par A. Que remarques-tu ?',
        corr: cm1Redac('Construction', { suite: ['Je place l\'équerre le long de (d), un côté de l\'angle droit passant par A : je trace la perpendiculaire.', 'Je fais glisser la règle le long de l\'équerre pour tracer la parallèle passant par A.'] }, 'Les deux droites tracées passent par A et sont perpendiculaires.') },
    ] },
  { titre: 'Cercle et disque', duree: '30 min',
    attendus: ['Connaître le centre, le rayon et le diamètre d\'un cercle', 'Relier rayon et diamètre', 'Tracer un cercle au compas'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Complète.<div style="text-align:center;">${cercle}</div>`,
        ...rmp([['Le point O est le @ du cercle.', 'centre'], ['Le segment [OC] est un @.', 'rayon'], ['Le segment [AB] est un @.', 'diamètre']], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Rayon 3 cm, donc diamètre @ cm', 6], ['Diamètre 10 cm, donc rayon @ cm', 5], ['Rayon 2,5 cm, donc diamètre @ cm', 5], ['Diamètre 7 cm, donc rayon @ cm', '3,5']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Tous les points du cercle sont à la même distance du centre.', 'vrai'], ['Le disque est seulement le contour.', 'faux'], ['Le diamètre est le double du rayon.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un cercle de centre O et de rayon 3 cm. Trace un diamètre [AB]. Quelle est la longueur AB ?',
        corr: cm1Redac('Longueur AB', '3 × 2 = 6', 'Le diamètre est le double du rayon : AB = 6 cm.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['rayon 4 cm : diamètre @ cm', 8], ['diamètre 9 cm : rayon @ cm', '4,5'], ['Pour un rayon de 5 cm, j\'écarte le compas de @ cm.', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Cercle de centre O et de rayon 3 cm. Où est le point ? Entoure.', ...P3.chx([['OM = 3 cm', 'sur le cercle', 'sur le cercle · dans le disque · à l\'extérieur'], ['ON = 2 cm', 'dans le disque', 'sur le cercle · dans le disque · à l\'extérieur'], ['OP = 4 cm', 'à l\'extérieur', 'sur le cercle · dans le disque · à l\'extérieur']]) },
    ] },
];
})();

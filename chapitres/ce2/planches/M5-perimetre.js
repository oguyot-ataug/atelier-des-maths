/* ============================================================
   CE2 · Planches : Le périmètre (M5)
   Le périmètre est la longueur du contour ; comparer des périmètres en reportant les côtés au compas ;
   calculer le périmètre d'un polygone en mesurant ses côtés ; carré et rectangle sans formule (on sait
   qu'il n'est pas nécessaire de mesurer tous les côtés).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, T } = CM2G;
// Polygone coté : pts en px, cotes [texte par côté].
const poly = (pts, cotes, px) => { const n = pts.length, cx = pts.reduce((s, p) => s + p[0], 0) / n, cy = pts.reduce((s, p) => s + p[1], 0) / n;
  let g = `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="#EAF4FB" stroke="#1F3A5C" stroke-width="2"/>`;
  cotes.forEach((c, i) => { const a = pts[i], b = pts[(i + 1) % n], m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], d = Math.hypot(m[0] - cx, m[1] - cy) || 1; g += T([m[0] + (m[0] - cx) / d * 14, m[1] + (m[1] - cy) / d * 14 + 4], c, { fs: 11, c: '#2E9C6A' }); });
  const W = Math.max(...pts.map(p => p[0])) + 30, H = Math.max(...pts.map(p => p[1])) + 24; return svg(W, H, g, px || Math.min(W, 200)); };
const fig1 = poly([[30, 20], [130, 20], [150, 80], [20, 80]], ['5 cm', '3 cm', '6 cm', '3 cm']);
const fig2 = poly([[30, 20], [110, 20], [110, 60], [70, 60], [70, 90], [30, 90]], ['4 cm', '2 cm', '2 cm', '1 cm 5 mm', '2 cm', '3 cm 5 mm']);
PLANCHES['ce2|Le périmètre'] = [
  { titre: 'Qu\'est-ce que le périmètre ?', duree: '25 min',
    attendus: ['Savoir que le périmètre est la longueur du tour d\'une figure', 'Compter un périmètre sur quadrillage'],
    exos: [
      { etoiles: 1, consigne: 'Un côté de carreau mesure 1 cm. Écris le périmètre de chaque figure.',
        eleve: plGrille([[cm1Rect(0, 0, 4, 2), 12], [cm1Rect(0, 0, 3, 3), 12], [cm1Rect(0, 0, 3, 1).concat([[0, 1], [0, 2]]), 12]].map(([c]) => cm1Quad(5, 4, c, { k: 18, contour: true }) + '<br>' + P3.B(4)), 3),
        corr: plGrille([cm1Rect(0, 0, 4, 2), cm1Rect(0, 0, 3, 3), cm1Rect(0, 0, 3, 1).concat([[0, 1], [0, 2]])].map(c => cm1Quad(5, 4, c, { k: 18, contour: true }) + '<br>' + P3.R(cm1QuadPerim(c) + ' cm')), 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure vrai ou faux.',
        ...chx([['Le périmètre, c\'est la longueur du contour.', 'vrai', 'vrai · faux'], ['Deux figures différentes peuvent avoir le même périmètre.', 'vrai', 'vrai · faux'], ['Le périmètre se mesure en carreaux coloriés.', 'faux', 'vrai · faux']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule le périmètre.', ...P3.rmp([['un carré de 5 cm de côté : @ cm', 20], ['un rectangle de 6 cm sur 2 cm : @ cm', 16], ['un triangle de côtés 3 cm, 4 cm et 5 cm : @ cm', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Le périmètre, c\'est… Entoure.', ...P3.chx([['', 'la longueur du tour', 'la longueur du tour · la place à l\'intérieur']]) },
      { etoiles: 2, consigne: 'Un côté de carreau mesure 1 cm. Écris le périmètre de chaque figure. Que remarques-tu ?',
        ...PCP.compte([[cpQuadFig(5, 4, [[[[0, 0], [3, 0], [3, 1], [1, 1], [1, 3], [0, 3]], '#2EA8C9']], { px: 110 }), '12 cm'], [cpQuadFig(5, 4, [[[[0, 0], [4, 0], [4, 2], [0, 2]], '#2E9C6A']], { px: 110 }), '12 cm : le même !']], 2, 3) },
    ] },
  { titre: 'Calculer un périmètre', duree: '30 min',
    attendus: ['Additionner les longueurs des côtés', 'Utiliser les côtés égaux du carré et du rectangle'],
    exos: [
      { etoiles: 1, cahier: true, consigne: `Calcule le périmètre de ce quadrilatère.<div style="text-align:center;">${fig1}</div>`,
        corr: cm1Redac('Périmètre', '5 + 3 + 6 + 3 = 17', 'Le périmètre mesure 17 cm.') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un carré de 4 cm de côté a un périmètre de @ cm.', 16], ['Un rectangle de 6 cm sur 2 cm a un périmètre de @ cm.', 16], ['Un triangle de côtés 3 cm, 4 cm, 5 cm a un périmètre de @ cm.', 12]], 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Calcule le périmètre de cette figure en millimètres.<div style="text-align:center;">${fig2}</div>`,
        corr: cm1Redac('En millimètres', { suite: ['40 + 20 + 20 + 15 + 20 + 35 = 150'] }, 'Le périmètre mesure 150 mm, soit 15 cm.') },
      { etoiles: 1, col: 1, consigne: 'Calcule le périmètre.', ...P3.rmp([['côtés 4 cm, 6 cm, 4 cm, 6 cm : @ cm', 20], ['côtés 25 mm, 30 mm, 45 mm : @ mm', 100]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule le périmètre.', ...P3.rmp([['un carré de 9 cm de côté : @ cm', 36], ['un rectangle de 10 m sur 4 m : @ m', 28]], 2) },
    ] },
  { titre: 'Problèmes de périmètre', duree: '30 min',
    attendus: ['Résoudre un problème de clôture ou de bordure', 'Comparer des périmètres'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Un jardin rectangulaire mesure 12 m de long et 8 m de large. Quelle longueur de grillage faut-il pour en faire le tour ?',
        corr: cm1Redac('Tour du jardin', { suite: ['12 + 8 = 20', '20 + 20 = 40'] }, 'Il faut 40 m de grillage.') },
      { etoiles: 3, cahier: true, consigne: 'Lina a 24 cm de ruban pour faire le tour d\'un carré. Quelle doit être la longueur du côté du carré ?',
        corr: cm1Redac('Côté du carré', '4 × 6 = 24', 'Les 4 côtés sont égaux : chaque côté mesure 6 cm.') },
      { etoiles: 2, col: 1, consigne: 'Entoure la figure qui a le plus grand périmètre.',
        eleve: plListe(['Un carré de 5 cm de côté ou un rectangle de 7 cm sur 2 cm : <b>le carré · le rectangle</b>']),
        corr: plListe(['Un carré de 5 cm de côté ou un rectangle de 7 cm sur 2 cm : ' + plEntoure('le carré') + ' (20 cm, contre 18 cm pour le rectangle)']) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un carré a un périmètre de 20 cm. Son côté mesure @ cm.', 5], ['Un carré de périmètre 36 cm a un côté de @ cm.', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Combien de clôture ?', ...P3.rmp([['un enclos rectangulaire de 8 m sur 5 m : @ m', 26], ['un terrain carré de 100 m de côté : @ m', 400]], 3) },
      { etoiles: 3, col: 1, consigne: 'Ont-ils le même périmètre ? Entoure.', ...P3.chx([['un carré de 4 cm de côté et un rectangle de 5 cm sur 3 cm', 'oui', 'oui · non'], ['un carré de 3 cm de côté et un rectangle de 4 cm sur 1 cm', 'non', 'oui · non']]) },
    ] },
];
})();

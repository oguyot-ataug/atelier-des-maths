/* ============================================================
   4e · Planches : Translations (G4)
   Reconnaître une translation ; construire l'image d'un point, d'une figure sur quadrillage ;
   propriétés conservées ; construire au compas (parallélogramme) ; frises.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const K = '#1F3A5C', Bl = '#2EA8C9', Ve = '#2E9C6A', Ro = '#E35D3A';
// Quadrillage nc × nr carreaux de c px ; P(x, y) en carreaux (y vers le bas).
const grille = (nc, nr, c, inner, px) => { const m = 8, W = nc * c + 2 * m, H = nr * c + 2 * m; let g = '';
  for(let i = 0; i <= nc; i++) g += `<line x1="${m + i * c}" y1="${m}" x2="${m + i * c}" y2="${m + nr * c}" stroke="#D5E2EE" stroke-width="1"/>`;
  for(let j = 0; j <= nr; j++) g += `<line x1="${m}" y1="${m + j * c}" x2="${m + nc * c}" y2="${m + j * c}" stroke="#D5E2EE" stroke-width="1"/>`;
  return `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${px || W}px;max-width:100%;display:inline-block;vertical-align:middle;">${g}${inner(([x, y]) => [m + x * c, m + y * c])}</svg>`; };
const poly = (P, pts, col, fill) => `<polygon points="${pts.map(p => P(p).join(',')).join(' ')}" fill="${fill || 'none'}" stroke="${col}" stroke-width="2.2" stroke-linejoin="round"/>`;
const fleche = (P, a, b, col) => { const A = P(a), B = P(b), d = Math.hypot(B[0] - A[0], B[1] - A[1]), u = [(B[0] - A[0]) / d, (B[1] - A[1]) / d];
  return `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0] - u[0] * 6}" y2="${B[1] - u[1] * 6}" stroke="${col || Ro}" stroke-width="2"/><path d="M${B[0]},${B[1]} L${B[0] - u[0] * 9 - u[1] * 5},${B[1] - u[1] * 9 + u[0] * 5} L${B[0] - u[0] * 9 + u[1] * 5},${B[1] - u[1] * 9 - u[0] * 5} Z" fill="${col || Ro}"/>`; };
const nom = (P, p, t, d, col) => { const Q = P(p); return `<circle cx="${Q[0]}" cy="${Q[1]}" r="2.6" fill="${col || K}"/>` + cmT(Q[0] + (d ? d[0] : 7), Q[1] + (d ? d[1] : -5), t, { fs: 12, c: col || K }); };
const deplace = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);
// Exercice de construction : figure F, flèche A → A', image en vert dans le corrigé.
const construire = (pts, a, b, nc, nr, px) => { const dx = b[0] - a[0], dy = b[1] - a[1];
  const base = P => poly(P, pts, K, '#EAF4FB') + fleche(P, a, b) + nom(P, a, 'A', [-12, -4]) + nom(P, b, "A'", [5, -5], Ro);
  return { eleve: grille(nc, nr, 18, base, px), corr: grille(nc, nr, 18, P => base(P) + poly(P, deplace(pts, dx, dy), Ve, 'rgba(46,156,106,.15)'), px) }; };
const tri1 = construire([[1, 2], [4, 2], [2, 5]], [1, 2], [7, 1], 11, 7, 190);
const dra = construire([[1, 1], [3, 1], [4, 3], [2, 4], [1, 3]], [1, 1], [6, 4], 11, 8, 190);
// Reconnaître : figure F et quatre figures numérotées.
const F0 = [[1, 1], [3, 1], [3, 2], [2, 2], [2, 4], [1, 4]];
const reco = grille(16, 8, 14, P => poly(P, F0, K, '#EAF4FB') + cmT(P([1.6, 2.9])[0], P([1.6, 2.9])[1], 'F', { fs: 11 })
  + poly(P, deplace(F0, 5, 2), Bl) + cmT(P([7.5, 6.6])[0], P([7.5, 6.6])[1], '1', { fs: 11, c: Bl })
  + poly(P, [[11, 1], [13, 1], [13, 4], [12, 4], [12, 2], [11, 2]], Bl) + cmT(P([12.6, 4.8])[0], P([12.6, 4.8])[1], '2', { fs: 11, c: Bl })
  + poly(P, deplace([[1, 1], [2, 1], [2, 3], [3, 3], [3, 4], [1, 4]], 12, 3), Bl) + cmT(P([13.3, 7.6])[0], P([13.3, 7.6])[1], '3', { fs: 11, c: Bl }), 230);
// Frise : motif à reproduire trois fois par la translation qui envoie A sur B.
const motif = [[0, 3], [1, 1], [2, 3], [1, 2]];
const frise = c => grille(13, 4, 16, P => poly(P, motif, K, '#FDE3C8') + fleche(P, [0, 3], [3, 3]) + nom(P, [0, 3], 'A', [-4, 13]) + nom(P, [3, 3], 'B', [-4, 13], Ro)
  + (c ? [1, 2, 3].map(k => poly(P, deplace(motif, 3 * k, 0), Ve, 'rgba(46,156,106,.15)')).join('') : ''), 220);
PLANCHES['4e|Translations'] = [
  { titre: 'Reconnaître une translation', duree: '25 min',
    attendus: ['Reconnaître une figure obtenue par translation', 'Décrire une translation (direction, sens, longueur)', 'Utiliser le vocabulaire : image, translation qui transforme A en B'],
    exos: [
      { etoiles: 1, consigne: 'Quelle figure est l\'image de F par une translation ? Entoure.',
        eleve: `<div style="text-align:center;">${reco}</div>` + chx([['Image de F par une translation :', 'la figure 1', 'la figure 1 · la figure 2 · la figure 3']]).eleve,
        corr: `<div style="text-align:center;">${reco}</div>` + chx([['Image de F par une translation :', 'la figure 1', 'la figure 1 · la figure 2 · la figure 3']]).corr },
      { etoiles: 1, col: 1, consigne: 'Pour passer de F à la figure 1, on se déplace de :',
        ...rmp([['@ carreaux vers la droite', 5], ['@ carreaux vers le bas', 2]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['Une translation fait…', 'glisser une figure', 'glisser une figure · tourner une figure · retourner une figure'], ['La figure 2 est obtenue à partir de F par…', 'une symétrie', 'une translation · une symétrie · un agrandissement']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une translation conserve les longueurs.', 'vrai'], ['Une translation change l\'orientation d\'une figure.', 'faux'], ['Dans une translation, tous les points se déplacent de la même façon.', 'vrai']], 'vrai · faux') },
    ] },
  { titre: 'Construire l\'image d\'une figure sur quadrillage', duree: '30 min',
    attendus: ['Construire l\'image d\'un point par une translation', 'Construire l\'image d\'une figure sur quadrillage', 'Décrire le déplacement en carreaux'],
    exos: [
      { etoiles: 1, consigne: 'Trace l\'image du triangle par la translation qui transforme A en A\'.',
        eleve: `<div style="text-align:center;">${tri1.eleve}</div>` + rmp([['Déplacement : @ carreaux vers la droite et @ carreau vers le haut.', 6, 1]]).eleve,
        corr: `<div style="text-align:center;">${tri1.corr}</div>` + rmp([['Déplacement : @ carreaux vers la droite et @ carreau vers le haut.', 6, 1]]).corr },
      { etoiles: 2, consigne: 'Trace l\'image de la figure par la translation qui transforme A en A\'.',
        eleve: `<div style="text-align:center;">${dra.eleve}</div>` + rmp([['Déplacement : @ carreaux vers la droite et @ carreaux vers le bas.', 5, 3]]).eleve,
        corr: `<div style="text-align:center;">${dra.corr}</div>` + rmp([['Déplacement : @ carreaux vers la droite et @ carreaux vers le bas.', 5, 3]]).corr },
      { etoiles: 2, consigne: 'Complète la frise en traçant trois fois de suite l\'image du motif par la translation qui transforme A en B.',
        eleve: `<div style="text-align:center;">${frise(false)}</div>` + rmp([['Chaque motif est décalé de @ carreaux vers la droite.', 3]]).eleve,
        corr: `<div style="text-align:center;">${frise(true)}</div>` + rmp([['Chaque motif est décalé de @ carreaux vers la droite.', 3]]).corr },
    ] },
  { titre: 'Propriétés de la translation', duree: '30 min',
    attendus: ['Savoir ce que conserve une translation', 'Utiliser ces propriétés pour trouver une longueur ou un angle', 'Reconnaître le parallélogramme ABB\'A\''],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle A\'B\'C\' est l\'image du triangle ABC par une translation. AB = 5 cm, BC = 4 cm, l\'angle ABC mesure 70°. Complète.',
        ...rmp([['A\'B\' = @ cm', 5], ['B\'C\' = @ cm', 4], ['L\'angle A\'B\'C\' mesure @°', 70], ['L\'aire de A\'B\'C\' est @ à celle de ABC.', 'égale']]) },
      { etoiles: 2, col: 1, consigne: 'Une translation transforme A en A\' et B en B\'. Entoure.',
        ...chx([['ABB\'A\' est un…', 'parallélogramme', 'carré · parallélogramme · trapèze quelconque'], ['Les droites (AB) et (A\'B\') sont…', 'parallèles', 'parallèles · perpendiculaires · sécantes']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['L\'image d\'une droite par une translation est une droite parallèle.', 'vrai'], ['L\'image d\'un cercle de rayon 3 cm est un cercle de rayon 6 cm.', 'faux'], ['Une translation conserve le parallélisme.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Le rectangle EFGH a pour image E\'F\'G\'H\' par une translation. EF = 6 cm et FG = 3,5 cm. Quelle est la nature de E\'F\'G\'H\' ? Quel est son périmètre ? Justifie.',
        corr: cm1Redac('Nature', 'Une translation conserve les longueurs et les angles.', 'E\'F\'G\'H\' est un rectangle de 6 cm sur 3,5 cm.') + cm1Redac('Périmètre', '2 × (6 + 3,5) = 19', 'Son périmètre est de 19 cm, comme celui de EFGH.') },
    ] },
  { titre: 'Construire avec le compas et problèmes', duree: '35 min',
    attendus: ['Construire l\'image d\'un point au compas', 'Justifier une construction', 'Utiliser une translation dans un problème'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Trace un segment [AB] de 5 cm et un point M hors de (AB). Construis au compas le point M\', image de M par la translation qui transforme A en B. Explique ta construction.',
        corr: cm1Redac('Construction', { suite: ['Arc de cercle de centre B et de rayon AM.', 'Arc de cercle de centre M et de rayon AB.', 'Ces deux arcs se coupent en M\' (du côté qui forme le parallélogramme ABM\'M).'] }, 'ABM\'M est un parallélogramme : M\' est l\'image de M par la translation qui transforme A en B.') },
      { etoiles: 2, cahier: true, consigne: 'Sur ton cahier quadrillé, dessine un motif simple, puis construis une frise de 4 motifs par une translation de 4 carreaux vers la droite. Décris la translation utilisée.',
        corr: cm1Redac('Frise', 'Chaque motif est l\'image du précédent par la translation de 4 carreaux vers la droite.', 'Les motifs sont identiques, alignés et régulièrement espacés de 4 carreaux.') },
      { etoiles: 3, cahier: true, consigne: 'Un ascenseur monte de 12 m en ligne droite. Explique pourquoi le déplacement d\'une personne dans la cabine est une translation. De combien se déplace le haut de sa tête ?',
        corr: cm1Redac('Translation', 'Tous les points de la cabine se déplacent de 12 m, verticalement, vers le haut.', 'C\'est une translation : le haut de la tête de la personne monte lui aussi de 12 m.') },
    ] },
];
})();

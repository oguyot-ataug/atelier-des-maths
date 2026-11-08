/* ============================================================
   6e · Planches : Propriétés des triangles (G6)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c) => cmT(p[0], p[1], t, { fs: 12, c: c || K });
const W = n => cm1Tex(`\\widehat{${n}}`);
const X = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? T([p[0] + (dx == null ? 7 : dx), p[1] + (dy == null ? -6 : dy)], n, c) : '');
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
// Centre du cercle circonscrit à placer (outil points) : triangle de sommets A, B, C (carreaux), centre O.
function centre(P, O, w, h, r){ const k = 20, base = g => `<polygon points="${P.map(p => g(...p).join(',')).join(' ')}" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + P.map((p, i) => X(g(...p), 'ABC'[i], i === 2 ? 6 : -14, i === 2 ? -6 : 14)).join('');
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: ['O'], att: { O: [O[0] * k, O[1] * k] } }),
    corr: Gq(w, h, k, g => base(g) + `<circle cx="${O[0] * k}" cy="${O[1] * k}" r="${r * k}" fill="none" stroke="${Ve}" stroke-width="2"/>` + X(g(...O), 'O', 6, -6, Ro)) }; }
const tri = (A, Bp, C, n, ang) => `<polygon points="${A.join(',')} ${Bp.join(',')} ${C.join(',')}" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + T([A[0] - 9, A[1] + 12], n[0]) + T([Bp[0] + 9, Bp[1] + 12], n[1]) + T([C[0], C[1] - 7], n[2]) + (ang || []).map(([p, t]) => T(p, t, Ro)).join('');
// Constructions des corrigés, animées à l'écran (constructions.js ; demandé le 01/11/2026 : « Oui, mets en place la
// correction animée »). Sur le papier : la figure finale, arcs compris.
const CPT = (p, nom, dx, dy, c) => ({ pt: p, nom, dx, dy, c });
// Cercle circonscrit au triangle AB = 6 cm, BC = 5 cm, AC = 4 cm (1 cm = 20 px).
const CIRCONSCRIT = (() => { const A = [40, 130], B = [160, 130], C = [40 + 2.25 * 20, 130 - Math.sqrt(16 - 2.25 * 2.25) * 20];
  const mBC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2], u = [B[1] - C[1], C[0] - B[0]], lu = Math.hypot(...u), e = [u[0] / lu, u[1] / lu];
  const t = (100 - mBC[0]) / e[0], O = [100, mBC[1] + t * e[1]], R = Math.hypot(O[0] - A[0], O[1] - A[1]);
  return plConstruction({ programme: [{"op": "point", "name": "A"}, {"op": "segment_length", "from": "A", "to": "B", "length": 6}, {"op": "circle", "id": "cA", "center": "A", "radius": 4}, {"op": "circle", "id": "cB", "center": "B", "radius": 5}, {"op": "intersect", "name": "C", "of": ["cA", "cB"], "pick": "up"}, {"op": "segment", "from": "A", "to": "C"}, {"op": "segment", "from": "B", "to": "C"}, {"op": "perpendicular_bisector", "id": "m1", "of": ["A", "B"], "color": "vert"}, {"op": "perpendicular_bisector", "id": "m2", "of": ["B", "C"], "color": "violet"}, {"op": "intersect", "name": "O", "of": ["m1", "m2"]}, {"op": "circle", "id": "cO", "center": "O", "radius_from": ["O", "A"], "full": true, "color": "rouge"}], outils: ["regle", "compas"], w: 200, h: 196, px: 175, depart: [{ seg: [A, B] }, { seg: [B, C] }, { seg: [A, C] }, CPT(A, 'A', -11, 4), CPT(B, 'B', 11, 4), CPT(C, 'C', -4, -9)], etapes: [
    { texte: 'Je trace la médiatrice de [AB] : la perpendiculaire à [AB] qui passe par son milieu.', el: [{ seg: [[100, 48], [100, 192]], c: '#2E9C6A', ep: 1.6 }, { codage: [A, [100, 130]] }, { codage: [[100, 130], B] }, { droit: [B, [100, 130], [100, 48]] }] },
    { texte: 'Je trace la médiatrice de [BC] : elle coupe la première en O.', el: [{ seg: [[mBC[0] - 70 * e[0], mBC[1] - 70 * e[1]], [mBC[0] + 1.6 * Math.abs(t) * e[0] + 40 * e[0], mBC[1] + 1.6 * Math.abs(t) * e[1] + 40 * e[1]]], c: '#7A4FC0', ep: 1.6 }, { codage: [B, mBC], n: 2 }, { codage: [mBC, C], n: 2 }, CPT(O, 'O', 11, 6)] },
    { texte: 'Je trace le cercle de centre O qui passe par A : il passe aussi par B et par C.', el: [{ cercle: [O, R], c: '#E35D3A' }] }] }); })();
PLANCHES['6e|Propriétés des triangles'] = [
  { titre: 'Somme des angles d\'un triangle', duree: '35 min',
    attendus: ['Savoir que la somme des angles d\'un triangle est 180°', 'Calculer le troisième angle d\'un triangle', 'Savoir si un triangle peut exister'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le troisième angle du triangle.',
        eleve: plListe(['Angles de 50° et 70° : le 3e mesure ' + B() + ' °', 'Angles de 90° et 35° : le 3e mesure ' + B() + ' °', 'Angles de 100° et 45° : le 3e mesure ' + B() + ' °', 'Angles de 60° et 60° : le 3e mesure ' + B() + ' °']),
        corr: plListe(['Angles de 50° et 70° : le 3e mesure ' + R(60) + ' °', 'Angles de 90° et 35° : le 3e mesure ' + R(55) + ' °', 'Angles de 100° et 45° : le 3e mesure ' + R(35) + ' °', 'Angles de 60° et 60° : le 3e mesure ' + R(60) + ' °']) },
      { etoiles: 1, col: 1, consigne: `Calcule l'angle ${W('ACB')}.<div style="text-align:center;">${S(200, 110, tri([20, 95], [180, 95], [70, 15], ['A', 'B', 'C'], [[[44, 88], '58°'], [[150, 88], '34°'], [[70, 38], '?']]), 180)}</div>`,
        eleve: plListe([W('ACB') + ' = 180 − ' + B(2) + ' − ' + B(2) + ' = ' + B() + ' °']), corr: plListe([W('ACB') + ' = 180 − ' + R(58) + ' − ' + R(34) + ' = ' + R(88) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Ces triangles peuvent-ils exister ? Entoure.',
        ...ch([['angles de 80°, 60° et 40° :', 'oui'], ['angles de 90°, 90° et 10° :', 'non'], ['angles de 120°, 30° et 30° :', 'oui'], ['angles de 70°, 70° et 50° :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe(['Dans un triangle rectangle, les deux angles aigus ont une somme de ' + B() + ' °', 'Un triangle rectangle a un angle de 27° : l\'autre angle aigu mesure ' + B() + ' °', 'Chaque angle d\'un triangle équilatéral mesure ' + B() + ' °']),
        corr: plListe(['Dans un triangle rectangle, les deux angles aigus ont une somme de ' + R(90) + ' °', 'Un triangle rectangle a un angle de 27° : l\'autre angle aigu mesure ' + R(63) + ' °', 'Chaque angle d\'un triangle équilatéral mesure ' + R(60) + ' °']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un triangle peut-il avoir deux angles obtus ? Justifie.',
        corr: cm1Redac('Un triangle peut-il avoir deux angles obtus ?', 'Deux angles obtus mesurent chacun plus de 90° : leur somme dépasse 180°.', 'C\'est impossible : la somme des trois angles d\'un triangle vaut 180°.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Découpe un triangle en papier, déchire ses trois coins et place-les côte à côte, sommets réunis. Qu\'obtiens-tu ? Pourquoi ?',
        corr: cm1Redac('Les trois coins réunis', 'Les trois angles forment un angle plat.', 'Un angle plat mesure 180° : c\'est la somme des angles du triangle.') },
    ] },
  { titre: 'Calculer des angles dans des triangles', duree: '40 min',
    attendus: ['Utiliser la somme des angles et les propriétés des triangles particuliers', 'Enchaîner deux calculs', 'Rédiger un calcul d\'angle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle ABC est isocèle en A. Complète.',
        eleve: plListe(['Si ' + W('ABC') + ' = 40°, alors ' + W('ACB') + ' = ' + B() + ' ° et ' + W('BAC') + ' = ' + B() + ' °', 'Si ' + W('BAC') + ' = 50°, alors ' + W('ABC') + ' = ' + B() + ' °', 'Si ' + W('BAC') + ' = 90°, alors ' + W('ABC') + ' = ' + B() + ' °']),
        corr: plListe(['Si ' + W('ABC') + ' = 40°, alors ' + W('ACB') + ' = ' + R(40) + ' ° et ' + W('BAC') + ' = ' + R(100) + ' °', 'Si ' + W('BAC') + ' = 50°, alors ' + W('ABC') + ' = ' + R(65) + ' °', 'Si ' + W('BAC') + ' = 90°, alors ' + W('ABC') + ' = ' + R(45) + ' °']) },
      { etoiles: 2, col: 1, consigne: `Les points B, C et D sont alignés. Calcule les angles.<div style="text-align:center;">${S(230, 110, `<polygon points="20,95 130,95 80,20" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([130, 95], [215, 95]) + T([12, 106], 'B') + T([130, 108], 'C') + T([212, 108], 'D') + T([80, 12], 'A') + T([42, 88], '65°', Ro) + T([80, 42], '45°', Ro) + T([148, 88], '?', Ro), 210)}</div>`,
        eleve: plListe([W('ACB') + ' = ' + B() + ' °', W('ACD') + ' = ' + B() + ' °']), corr: plListe([W('ACB') + ' = 180 − 65 − 45 = ' + R(70) + ' °', W('ACD') + ' = 180 − 70 = ' + R(110) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Un triangle a un angle de 30° ; les deux autres angles sont égaux. Combien mesurent-ils ?',
        eleve: plListe(['Somme des deux autres angles : ' + B() + ' °', 'Chacun mesure : ' + B() + ' °', 'Ce triangle est <b>isocèle · équilatéral · rectangle</b>']),
        corr: plListe(['Somme des deux autres angles : ' + R(150) + ' °', 'Chacun mesure : ' + R(75) + ' °', 'Ce triangle est ' + plEntoure('isocèle')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'ABC est un triangle rectangle en A tel que ' + W('ABC') + ' = 2 × ' + W('ACB') + '. Calcule les angles.',
        corr: cm1Redac('Angles du triangle ABC', { suite: [W('ABC') + ' + ' + W('ACB') + ' = 90° et ' + W('ABC') + ' = 2 × ' + W('ACB') + '.', '3 × ' + W('ACB') + ' = 90°, donc ' + W('ACB') + ' = 30°.'] }, W('ACB') + ' = 30° et ' + W('ABC') + ' = 60°.') },
      { etoiles: 3, cahier: true, consigne: 'Le triangle EFG est isocèle en E et ' + W('EFG') + ' = 72°. Le point H est sur [FG] et [EH] est la bissectrice de ' + W('FEG') + '. Calcule ' + W('FEH') + '.',
        corr: cm1Redac('Angle ' + W('EGF'), W('EGF') + ' = 72°', 'Les angles à la base d\'un triangle isocèle sont égaux.') + cm1Redac('Angle ' + W('FEG'), '180° − 72° − 72° = 36°', W('FEG') + ' mesure 36°.') + cm1Redac('Angle ' + W('FEH'), '36° : 2 = 18°', W('FEH') + ' mesure 18°.') },
    ] },
  { titre: 'Cercle circonscrit à un triangle', duree: '40 min',
    attendus: ['Savoir que les trois médiatrices d\'un triangle se coupent en un point', 'Construire le cercle circonscrit à un triangle', 'Cas du triangle rectangle : le centre est le milieu de l\'hypoténuse'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['Les trois ' + B(10) + ' d\'un triangle se coupent en un même point.', 'Ce point est le centre du cercle qui passe par les trois ' + B(7) + '.', 'Ce cercle s\'appelle le cercle ' + B(10) + ' au triangle.']),
        corr: plListe(['Les trois ' + R('médiatrices') + ' d\'un triangle se coupent en un même point.', 'Ce point est le centre du cercle qui passe par les trois ' + R('sommets') + '.', 'Ce cercle s\'appelle le cercle ' + R('circonscrit') + ' au triangle.']) },
      { etoiles: 2, col: 1, consigne: 'Place le centre O du cercle circonscrit au triangle ABC (rectangle en A).', ...centre([[2, 2], [2, 8], [10, 2]], [6, 5], 12, 10, 5) },
      { etoiles: 2, col: 1, consigne: 'Place le centre O du cercle circonscrit au triangle ABC (isocèle en C).', ...centre([[1, 9], [9, 9], [5, 1]], [5, 6], 10, 11, 5) },
      { etoiles: 2, col: 1, consigne: 'O est le centre du cercle circonscrit au triangle RST, et OR = 4 cm. Complète.',
        eleve: plListe(['OS = ' + B() + ' cm', 'OT = ' + B() + ' cm', 'Le diamètre du cercle mesure ' + B() + ' cm']), corr: plListe(['OS = ' + R(4) + ' cm', 'OT = ' + R(4) + ' cm', 'Le diamètre du cercle mesure ' + R(8) + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un triangle ABC avec AB = 6 cm, BC = 5 cm et AC = 4 cm. Construis son cercle circonscrit.',
        corr: cm1Redac('Construction du cercle circonscrit', { suite: ['Je construis le triangle au compas.', 'Je trace deux médiatrices (par exemple celles de [AB] et de [BC]) : elles se coupent en O.'] }, 'Je trace le cercle de centre O qui passe par A : il passe aussi par B et C.') + `<div style="text-align:center;margin-top:4px;">${CIRCONSCRIT}</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trois maisons A, B et C ne sont pas alignées. On veut construire un puits à égale distance des trois maisons. Où le placer ? Explique.',
        corr: cm1Redac('Emplacement du puits', { suite: ['À égale distance de A et B : sur la médiatrice de [AB].', 'À égale distance de B et C : sur la médiatrice de [BC].'] }, 'Le puits est au point d\'intersection des médiatrices : le centre du cercle circonscrit au triangle ABC.') },
    ] },
  { titre: 'Triangles : synthèse', duree: '40 min',
    attendus: ['Choisir la bonne propriété : somme des angles, triangles particuliers, médiatrices', 'Construire et justifier', 'Résoudre des problèmes de géométrie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un triangle rectangle peut avoir un angle obtus.', 'faux'], ['Les angles d\'un triangle équilatéral mesurent 60°.', 'vrai'], ['Le centre du cercle circonscrit est toujours à l\'intérieur du triangle.', 'faux'], ['Si un triangle a deux angles égaux, il est isocèle.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Trouve la nature du triangle à partir de ses angles. Entoure.',
        ...ch([['angles 45°, 45°, 90° :', 'rectangle isocèle'], ['angles 60°, 60°, 60° :', 'équilatéral'], ['angles 30°, 60°, 90° :', 'rectangle']], 'rectangle · équilatéral · rectangle isocèle') },
      { etoiles: 2, col: 1, consigne: 'Dans un triangle ABC, ' + W('BAC') + ' = 2 × ' + W('ABC') + ' et ' + W('ACB') + ' = 3 × ' + W('ABC') + '. Complète.',
        eleve: plListe([W('ABC') + ' = ' + B() + ' °', W('BAC') + ' = ' + B() + ' °', W('ACB') + ' = ' + B() + ' °']),
        corr: plListe([W('ABC') + ' = 180 : 6 = ' + R(30) + ' °', W('BAC') + ' = ' + R(60) + ' °', W('ACB') + ' = ' + R(90) + ' °']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle ABC rectangle en A tel que BC = 8 cm et ' + W('ABC') + ' = 40°. Trace son cercle circonscrit. Où est son centre ?',
        corr: cm1Redac('Construction du triangle ABC rectangle en A', { suite: ['Je trace [BC] de 8 cm et le cercle de diamètre [BC].', 'En B, je construis un angle de 40° : sa demi-droite coupe le cercle en A.'] }, 'Le centre du cercle circonscrit est le milieu de l\'hypoténuse [BC] ; le rayon est 4 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Un triangle isocèle a un angle de 40°. Combien mesurent ses autres angles ? (Attention : il y a deux possibilités.)',
        corr: cm1Redac('Premier cas : 40° est l\'angle principal', '(180° − 40°) : 2 = 70°', 'Les angles mesurent 40°, 70° et 70°.') + cm1Redac('Second cas : 40° est un angle à la base', '180° − 40° − 40° = 100°', 'Les angles mesurent 40°, 40° et 100°. Il y a deux triangles possibles.') },
    ] },
];
})();

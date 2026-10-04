/* ============================================================
   6e · Planches : Construction de triangles (G5)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}" stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const W = n => cm1Tex(`\\widehat{${n}}`);
// Codage : n petits traits au milieu de [ab] ; angle droit en b entre a et c.
const cd = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / l, (b[1] - a[1]) / l], v = [-u[1] * 5, u[0] * 5]; let s = ''; for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2) * 4; s += L([m[0] + u[0] * o - v[0], m[1] + u[1] * o - v[1]], [m[0] + u[0] * o + v[0], m[1] + u[1] * o + v[1]], Ro, 1.6); } return s; };
const ad = (b, a, c) => { const u = [(a[0] - b[0]), (a[1] - b[1])], w = [(c[0] - b[0]), (c[1] - b[1])], lu = Math.hypot(...u), lw = Math.hypot(...w), p = [b[0] + u[0] / lu * 9, b[1] + u[1] / lu * 9], q = [b[0] + w[0] / lw * 9, b[1] + w[1] / lw * 9]; return `<polyline points="${p.join(',')} ${p[0] + w[0] / lw * 9},${p[1] + w[1] / lw * 9} ${q.join(',')}" fill="none" stroke="${Ro}" stroke-width="1.5"/>`; };
const tri = (A, Bp, C, n, extra) => `<polygon points="${A.join(',')} ${Bp.join(',')} ${C.join(',')}" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + (n ? T([A[0] - 8, A[1] + 12], n[0]) + T([Bp[0] + 8, Bp[1] + 12], n[1]) + T([C[0], C[1] - 6], n[2]) : '') + (extra || '');
const vig = (inner, w) => S(120, 96, `<rect x="1" y="1" width="118" height="94" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, w || 92);
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t, w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;max-width:${w || 128}px;line-height:1.35;">${t}</span></span>`;
const vigs = (V, it, m, w) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${m}</b>`, w))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`, w))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Quadrillage w × h (k px) ; f reçoit g(i, j) → coordonnées.
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
const X = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? T([p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -6 : dy)], n, c, 13) : '');
// Placer le point C sur quadrillage (outil points) : base [AB] tracée, C attendu en c.
function placeC(A, Bp, c, nom, w, h){ const k = 20, base = g => L(g(...A), g(...Bp), K, 2.2) + X(g(...A), 'A', -14, 14) + X(g(...Bp), 'B', 4, 14);
  return { eleve: plX(Gq(w || 9, h || 7, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w: w || 9, h: h || 7 }, noms: [nom || 'C'], att: { [nom || 'C']: [c[0] * k, c[1] * k] } }),
    corr: Gq(w || 9, h || 7, k, g => base(g) + L(g(...A), g(...c), Ro, 2) + L(g(...Bp), g(...c), Ro, 2) + X(g(...c), nom || 'C', 4, -4, Ro)) }; }
PLANCHES['6e|Construction de triangles'] = [
  { titre: 'Reconnaître les triangles particuliers', duree: '35 min',
    attendus: ['Reconnaître un triangle isocèle, équilatéral, rectangle d\'après les codages', 'Utiliser le vocabulaire : sommet principal, base, hypoténuse', 'Ne pas conclure d\'après le dessin seul'],
    exos: [
      { etoiles: 1, consigne: 'D\'après les codages, entoure la nature de chaque triangle.',
        ...(() => { const V = [vig(tri([15, 80], [105, 80], [60, 15]) + cd([15, 80], [60, 15], 1) + cd([105, 80], [60, 15], 1)),
            vig(tri([20, 82], [100, 82], [60, 13]) + cd([20, 82], [60, 13], 2) + cd([100, 82], [60, 13], 2) + cd([20, 82], [100, 82], 2)),
            vig(tri([20, 82], [100, 82], [20, 20]) + ad([20, 82], [100, 82], [20, 20])),
            vig(tri([15, 80], [105, 70], [45, 18])),
            vig(tri([15, 18], [105, 18], [60, 82]) + cd([15, 18], [60, 82], 1) + cd([105, 18], [60, 82], 1))];
          return vigs(V, [['a', 'isocèle'], ['b', 'équilatéral'], ['c', 'rectangle'], ['d', 'quelconque'], ['e', 'isocèle']], 'isocèle · équilatéral · rectangle · quelconque', 108); })() },
      { etoiles: 1, col: 1, consigne: `ABC est isocèle en A. Complète.<div style="text-align:center;">${S(170, 110, tri([20, 95], [150, 95], [85, 15], ['B', 'C', 'A']) + cd([20, 95], [85, 15], 1) + cd([150, 95], [85, 15], 1), 160)}</div>`,
        eleve: plListe(['Le sommet principal est ' + B(1), 'La base est le côté ' + B(3), 'Les deux côtés de même longueur : [AB] et ' + B(3), 'Si AB = 5 cm, alors AC = ' + B() + ' cm']),
        corr: plListe(['Le sommet principal est ' + R('A'), 'La base est le côté ' + R('[BC]'), 'Les deux côtés de même longueur : [AB] et ' + R('[AC]'), 'Si AB = 5 cm, alors AC = ' + R(5) + ' cm']) },
      { etoiles: 1, col: 1, consigne: `DEF est rectangle en E. Complète.<div style="text-align:center;">${S(170, 110, tri([25, 95], [150, 95], [25, 20], ['E', 'F', 'D']) + ad([25, 95], [150, 95], [25, 20]), 160)}</div>`,
        eleve: plListe(['L\'angle droit est ' + W('DEF') + ' : son sommet est ' + B(1), 'L\'hypoténuse est le côté ' + B(3), 'Les côtés de l\'angle droit sont [ED] et ' + B(3)]),
        corr: plListe(['L\'angle droit est ' + W('DEF') + ' : son sommet est ' + R('E'), 'L\'hypoténuse est le côté ' + R('[DF]'), 'Les côtés de l\'angle droit sont [ED] et ' + R('[EF]')]) },
      { etoiles: 2, col: 1, consigne: 'Quelle est la nature du triangle ? Entoure.',
        ...ch([['AB = 4 cm, BC = 4 cm, AC = 6 cm :', 'isocèle'], ['DE = EF = DF = 5 cm :', 'équilatéral'], ['GH = 3 cm, HI = 4 cm, GI = 6 cm :', 'quelconque']], 'isocèle · équilatéral · quelconque') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un triangle équilatéral est aussi isocèle.', 'vrai'], ['Un triangle rectangle peut être isocèle.', 'vrai'], ['Un triangle peut avoir deux angles droits.', 'faux'], ['L\'hypoténuse est le plus grand côté d\'un triangle rectangle.', 'vrai']], 'vrai · faux') },
    ] },
  { titre: 'Construire un triangle connaissant ses trois côtés', duree: '40 min',
    attendus: ['Construire un triangle de longueurs données à la règle et au compas', 'Savoir si un triangle est constructible (inégalité triangulaire)', 'Tracer une figure à main levée codée avant de construire'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Remets dans l\'ordre les étapes de la construction du triangle ABC avec AB = 6 cm, AC = 4 cm, BC = 5 cm (écris 1 à 4).',
        eleve: plListe(['Étape ' + B(1) + ' : je trace un arc de centre B et de rayon 5 cm.', 'Étape ' + B(1) + ' : je trace le segment [AB] de 6 cm.', 'Étape ' + B(1) + ' : je nomme C le point d\'intersection des arcs et je trace [AC] et [BC].', 'Étape ' + B(1) + ' : je trace un arc de centre A et de rayon 4 cm.']),
        corr: plListe(['Étape ' + R(3) + ' : je trace un arc de centre B et de rayon 5 cm.', 'Étape ' + R(1) + ' : je trace le segment [AB] de 6 cm.', 'Étape ' + R(4) + ' : je nomme C le point d\'intersection des arcs et je trace [AC] et [BC].', 'Étape ' + R(2) + ' : je trace un arc de centre A et de rayon 4 cm.']) },
      { etoiles: 2, col: 1, consigne: 'Peut-on construire ces triangles ? (Le plus grand côté doit être plus petit que la somme des deux autres.)',
        ...ch([['3 cm, 4 cm, 5 cm :', 'oui'], ['2 cm, 3 cm, 7 cm :', 'non'], ['4 cm, 4 cm, 8 cm :', 'non'], ['6 cm, 6 cm, 6 cm :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Le cas « 4 cm, 4 cm, 8 cm » est particulier. Que se passe-t-il ? Entoure.',
        eleve: plListe(['Les trois points sont <b>alignés · non alignés</b>', 'On obtient un triangle <b>aplati · rectangle</b>']), corr: plListe(['Les trois points sont ' + plEntoure('alignés') + ' (4 + 4 = 8)', 'On obtient un triangle ' + plEntoure('aplati')]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis le triangle RST tel que RS = 7 cm, RT = 5 cm et ST = 4 cm. Commence par une figure à main levée codée.',
        corr: cm1Redac('Construction', { suite: ['Je trace [RS] de 7 cm.', 'Arc de centre R, rayon 5 cm ; arc de centre S, rayon 4 cm.', 'Les arcs se coupent en T.'] }, 'Je trace [RT] et [ST] : le triangle RST est construit.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle EFG avec EF = 6 cm et FG = 6 cm, dont le périmètre est 16 cm. Quelle est sa nature ?',
        corr: cm1Redac('Longueur EG', '16 − 6 − 6 = 4', 'EG = 4 cm ; EF = FG : le triangle EFG est isocèle en F.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien de triangles différents (côtés entiers en cm) ont un périmètre de 9 cm ? Cite-les.',
        corr: cm1Redac('Recherche', { suite: ['Le plus grand côté doit être plus petit que 9 − ce côté, donc plus petit que 4,5 cm.', '1 + 4 + 4 ; 2 + 3 + 4 ; 3 + 3 + 3'] }, 'Il y a 3 triangles : (1 ; 4 ; 4), (2 ; 3 ; 4) et (3 ; 3 ; 3).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur le dessin, un triangle semble isocèle, mais il n\'y a aucun codage. Peut-on affirmer qu\'il est isocèle ? Comment le vérifier ?',
        corr: cm1Redac('Réponse', 'On ne conclut jamais d\'après l\'aspect du dessin.', 'On vérifie en mesurant (ou au compas) que deux côtés ont la même longueur ; sinon, on ne peut rien affirmer.') },
    ] },
  { titre: 'Construire avec des angles', duree: '40 min',
    attendus: ['Construire un triangle connaissant un côté et les deux angles adjacents', 'Construire un triangle connaissant deux côtés et l\'angle compris', 'Utiliser le rapporteur avec précision'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pour construire ABC avec AB = 5 cm, ' + W('BAC') + ' = 40° et ' + W('ABC') + ' = 60°, complète.',
        eleve: plListe(['Je trace d\'abord le segment ' + B(3), 'En A, je construis un angle de ' + B() + ' °', 'En B, je construis un angle de ' + B() + ' °', 'Les deux demi-droites se coupent au point ' + B(1)]),
        corr: plListe(['Je trace d\'abord le segment ' + R('[AB]'), 'En A, je construis un angle de ' + R(40) + ' °', 'En B, je construis un angle de ' + R(60) + ' °', 'Les deux demi-droites se coupent au point ' + R('C')]) },
      { etoiles: 1, col: 1, consigne: 'Quelles informations suffisent pour construire un seul triangle ? Entoure.',
        ...ch([['les trois longueurs :', 'oui'], ['un côté et ses deux angles adjacents :', 'oui'], ['deux côtés et l\'angle compris entre eux :', 'oui'], ['les trois angles seulement :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis le triangle MNP tel que MN = 6 cm, ' + W('NMP') + ' = 50° et ' + W('MNP') + ' = 70°. Mesure l\'angle ' + W('MPN') + '.',
        corr: cm1Redac('Construction', { suite: ['[MN] de 6 cm ; angle de 50° en M ; angle de 70° en N.', 'Les demi-droites se coupent en P.'] }, W('MPN') + ' mesure 60° (180 − 50 − 70).') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis le triangle IJK tel que IJ = 5 cm, IK = 4 cm et ' + W('JIK') + ' = 110°. Quelle est la nature de l\'angle ' + W('JIK') + ' ?',
        corr: cm1Redac('Construction', { suite: ['Je trace [IJ] de 5 cm.', 'En I, je construis un angle de 110° et je place K à 4 cm de I sur ce côté.'] }, 'Je trace [JK]. L\'angle ' + W('JIK') + ' est obtus.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle ABC rectangle en A, avec AB = 4 cm et ' + W('ABC') + ' = 35°. Combien mesure ' + W('ACB') + ' ?',
        corr: cm1Redac('Construction', { suite: ['Angle droit en A : je trace [AB] puis la perpendiculaire en A.', 'En B, je construis un angle de 35° ; il coupe la perpendiculaire en C.'] }, W('ACB') + ' = 180 − 90 − 35 = 55°.') },
    ] },
  { titre: 'Triangles particuliers : angles et constructions', duree: '40 min',
    attendus: ['Savoir que les angles à la base d\'un triangle isocèle sont égaux', 'Savoir que les angles d\'un triangle équilatéral mesurent 60°', 'Construire un triangle isocèle, équilatéral, rectangle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (la somme des angles d\'un triangle est 180°).',
        eleve: plListe(['Triangle équilatéral : chaque angle mesure ' + B() + ' °', 'Triangle rectangle avec un angle de 30° : le 3e angle mesure ' + B() + ' °', 'Triangle isocèle avec un angle principal de 40° : chaque angle à la base mesure ' + B() + ' °', 'Triangle rectangle isocèle : les angles aigus mesurent ' + B() + ' °']),
        corr: plListe(['Triangle équilatéral : chaque angle mesure ' + R(60) + ' °', 'Triangle rectangle avec un angle de 30° : le 3e angle mesure ' + R(60) + ' °', 'Triangle isocèle avec un angle principal de 40° : chaque angle à la base mesure ' + R(70) + ' °', 'Triangle rectangle isocèle : les angles aigus mesurent ' + R(45) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Le triangle ABC est isocèle en A. Complète.',
        eleve: plListe(['Si ' + W('ABC') + ' = 65°, alors ' + W('ACB') + ' = ' + B() + ' ° et ' + W('BAC') + ' = ' + B() + ' °', 'Si ' + W('BAC') + ' = 100°, alors ' + W('ABC') + ' = ' + B() + ' °']),
        corr: plListe(['Si ' + W('ABC') + ' = 65°, alors ' + W('ACB') + ' = ' + R(65) + ' ° et ' + W('BAC') + ' = ' + R(50) + ' °', 'Si ' + W('BAC') + ' = 100°, alors ' + W('ABC') + ' = ' + R(40) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Un triangle a deux angles de 60°. Que peux-tu dire ? Entoure.',
        eleve: plListe(['Son troisième angle mesure <b>60° · 90° · 120°</b>', 'C\'est un triangle <b>équilatéral · rectangle · quelconque</b>']), corr: plListe(['Son troisième angle mesure ' + plEntoure('60°'), 'C\'est un triangle ' + plEntoure('équilatéral')]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis un triangle EFG équilatéral de côté 5 cm, au compas. Vérifie au rapporteur la mesure de ses angles.',
        corr: cm1Redac('Construction', { suite: ['[EF] de 5 cm ; arcs de rayon 5 cm, de centres E et F.', 'Les arcs se coupent en G.'] }, 'Les trois angles mesurent 60°.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle ABC isocèle en A tel que BC = 6 cm et ' + W('ABC') + ' = 50°. Calcule ' + W('BAC') + ' et vérifie en mesurant.',
        corr: cm1Redac('Construction et calcul', { suite: ['[BC] de 6 cm ; angles de 50° en B et en C (angles à la base égaux).', W('BAC') + ' = 180 − 50 − 50'] }, W('BAC') + ' = 80°.') },
    ] },
  { titre: 'Triangles sur quadrillage', duree: '30 min',
    attendus: ['Placer un sommet pour obtenir un triangle particulier', 'Utiliser les lignes et les diagonales du quadrillage', 'Justifier la nature d\'un triangle tracé sur quadrillage'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Place le point C pour que ABC soit rectangle en B, avec BC = 4 carreaux (C au-dessus de B).', ...placeC([1, 6], [6, 6], [6, 2]) },
      { etoiles: 2, col: 1, consigne: 'Place le point C, au-dessus de [AB], pour que ABC soit isocèle en C et que C soit à 4 carreaux de la droite (AB).', ...placeC([1, 6], [7, 6], [4, 2]) },
      { etoiles: 2, col: 1, consigne: 'Place le point C pour que ABC soit rectangle isocèle en A (C au-dessus de [AB]).', ...placeC([2, 6], [6, 6], [2, 2]) },
      { etoiles: 2, col: 1, consigne: 'Place le point C pour que ABC soit rectangle en A et que [AC] suive une diagonale du quadrillage (C en haut à droite de A, à 3 diagonales).', ...placeC([2, 4], [5, 7], [5, 1], 'C', 9, 8) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur un quadrillage, trace un triangle isocèle dont la base est sur une ligne du quadrillage et un triangle rectangle dont aucun côté n\'est sur une ligne du quadrillage. Explique.',
        corr: cm1Redac('Explication', { suite: ['Isocèle : le sommet principal est sur la perpendiculaire à la base passant par son milieu.', 'Rectangle : on utilise deux diagonales perpendiculaires (directions (1 ; 1) et (1 ; −1)).'] }, 'Le quadrillage permet de tracer des angles droits et des longueurs égales sans instrument.') },
    ] },
];
})();

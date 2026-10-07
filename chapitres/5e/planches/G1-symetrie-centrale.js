/* ============================================================
   5e · Planches : Symétrie centrale (G1)
   Symétrique d'un point et d'une figure (quadrillage : points à placer, segments à tracer à l'écran),
   propriétés de conservation, centre de symétrie d'une figure, symétrie axiale ou centrale.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const X = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? T([p[0] + (dx == null ? 7 : dx), p[1] + (dy == null ? -6 : dy)], n, c, 12) : '');
const O = (p, n) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${Ro}"/>` + T([p[0] + 8, p[1] + 14], n || 'O', Ro, 12);
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t, w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;max-width:${w || 120}px;line-height:1.35;">${t}</span></span>`;
const vig = inner => S(110, 90, `<rect x="1" y="1" width="108" height="88" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 96);
const vigs = (V, it, m) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${m}</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
// Quadrillage w × h (k px) ; f reçoit g(i, j) → coordonnées.
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
const SC = (a, b) => ([x, y]) => [2 * a - x, 2 * b - y]; // symétrie de centre (a ; b), en carreaux
const segsDe = pts => pts.slice(1).map((p, i) => [pts[i][0], pts[i][1], p[0], p[1]]);
// Compléter une ligne brisée par la symétrie de centre c : outil segments à l'écran.
function compl(pts, c, w, h, k){ k = k || 18; const f = SC(...c), q = pts.map(f);
  const base = g => `<polyline points="${pts.map(p => g(...p).join(',')).join(' ')}" fill="none" stroke="${Bl}" stroke-width="2.6" stroke-linejoin="round"/>` + O(g(...c));
  return { e: plX(Gq(w, h, k, base), { t: 'seg', k, ox: 0, oy: 0, w, h, att: segsDe(q) }), c: Gq(w, h, k, g => base(g) + `<polyline points="${q.map(p => g(...p).join(',')).join(' ')}" fill="none" stroke="${Ve}" stroke-width="2.6" stroke-linejoin="round"/>`) }; }
const complExo = (l, x) => { const r = l.map(a => compl(...a)); return Object.assign({ eleve: duo(r.map(z => z.e)), corr: duo(r.map(z => z.c)) }, x); };
// Placer les symétriques de points (outil points).
function placeSym(P, c, w, h, k){ k = k || 22; const f = SC(...c), base = g => O(g(...c)) + P.map(([x, y, n]) => X(g(x, y), n)).join('');
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: P.map(p => p[2] + '\''), att: Object.fromEntries(P.map(([x, y, n]) => [n + '\'', f([x, y]).map(v => v * k)])) }),
    corr: Gq(w, h, k, g => base(g) + P.map(([x, y, n]) => X(g(...f([x, y])), n + '\'', null, null, Ve) + L(g(x, y), g(...f([x, y])), Ve, 1, true)).join('')) }; }
PLANCHES['5e|Symétrie centrale'] = [
  { titre: 'Symétrique d\'un point par rapport à un point', duree: '35 min',
    attendus: ['Savoir que O est le milieu de [MM\'] quand M\' est le symétrique de M', 'Placer le symétrique d\'un point sur quadrillage', 'Reconnaître deux points symétriques'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Place les symétriques A\', B\', C\' des points A, B, C par rapport au point O.', ...placeSym([[2, 1, 'A'], [1, 4, 'B'], [3, 5, 'C']], [4, 3], 8, 6) },
      { etoiles: 2, col: 1, consigne: 'Place les symétriques D\', E\', F\' par rapport au point O.', ...placeSym([[1, 1, 'D'], [6, 2, 'E'], [5, 5, 'F']], [4, 3], 8, 6) },
      { etoiles: 1, col: 1, consigne: 'M\' est le symétrique de M par rapport à O. Complète.',
        ...rmp([['O est le @ du segment [MM\'].', 'milieu'], ['Si OM = 3 cm, alors MM\' = @ cm.', 6], ['Les points M, O et M\' sont @.', 'alignés'], ['Le symétrique de O est @.', 'O']], 7) },
      { etoiles: 2, col: 1, consigne: 'Le point B est-il le symétrique de A par rapport à O ? Entoure.',
        ...(() => { const V = [vig(X([20, 30], 'A') + O([55, 45]) + X([90, 60], 'B')), vig(X([20, 30], 'A') + O([55, 45]) + X([90, 40], 'B')), vig(X([25, 70], 'A') + O([55, 45]) + X([75, 28], 'B')), vig(X([30, 45], 'A') + O([55, 45]) + X([95, 45], 'B'))];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'non'], ['d', 'non']], 'oui · non'); })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le symétrique d\'un point par rapport à O est toujours à la même distance de O :', 'vrai'], ['La symétrie centrale correspond à un demi-tour autour de O :', 'vrai'], ['Deux points symétriques sont toujours sur une droite verticale :', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un point O et un point M tel que OM = 4 cm. Construis le symétrique M\' de M par rapport à O, à la règle seulement, puis au compas.',
        corr: cm1Redac('Construction', { suite: ['À la règle : je trace la demi-droite [MO) et je reporte 4 cm après O.', 'Au compas : cercle de centre O passant par M ; il recoupe (MO) en M\'.'] }, 'O est le milieu de [MM\'] : MM\' = 8 cm.') },
    ] },
  { titre: 'Symétrique d\'une figure sur quadrillage', duree: '40 min',
    attendus: ['Construire le symétrique d\'une figure sur quadrillage', 'Compter les carreaux de part et d\'autre du centre', 'Vérifier : la figure est retournée « en demi-tour »'],
    exos: [
      complExo([[[[1, 1], [3, 1], [3, 3], [2, 4]], [4, 4], 8, 8], [[[1, 2], [2, 5], [4, 3]], [5, 4], 9, 8]], { etoiles: 1, consigne: 'Construis le symétrique de chaque figure par rapport au point O.' }),
      complExo([[[[0, 1], [2, 0], [3, 2], [2, 3], [4, 4]], [4, 4], 9, 8]], { etoiles: 2, col: 1, consigne: 'Construis le symétrique de la ligne bleue par rapport à O.' }),
      complExo([[[[2, 2], [5, 2], [6, 6]], [4, 4], 8, 8]], { etoiles: 2, col: 1, consigne: 'Complète la figure par symétrie de centre O : on obtient un parallélogramme.' }),
      { etoiles: 2, col: 1, consigne: 'Pour construire le symétrique d\'un point sur quadrillage, entoure la bonne méthode.',
        ...chx([['Pour aller de M à O, je compte…', 'les carreaux horizontaux et verticaux', 'les carreaux horizontaux et verticaux · seulement les carreaux horizontaux'], ['Puis, à partir de O…', 'je recommence dans le même sens', 'je recommence dans le même sens · je recommence en sens inverse']]) },
      complExo([[[[1, 3], [3, 1], [5, 2]], [4, 4], 8, 7]], { etoiles: 2, col: 1, consigne: 'Construis le symétrique de la ligne bleue par rapport à O.' }),
      { etoiles: 1, col: 1, consigne: 'Place les symétriques P\' et Q\' de P et Q par rapport au point O.', ...placeSym([[1, 2, 'P'], [5, 1, 'Q']], [4, 3], 7, 6, 22) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier quadrillé, trace un triangle ABC et un point O hors du triangle. Construis le triangle A\'B\'C\' symétrique par rapport à O. Compare les deux triangles.',
        corr: cm1Redac('Comparaison', { suite: ['A\'B\' = AB, B\'C\' = BC et A\'C\' = AC.', 'Les deux triangles sont superposables : l\'un est l\'autre après un demi-tour.'] }, 'La symétrie centrale conserve les longueurs et les formes.') },
    ] },
  { titre: 'Propriétés de la symétrie centrale', duree: '35 min',
    attendus: ['Savoir que la symétrie centrale conserve les longueurs, les angles, les aires, l\'alignement', 'Savoir que le symétrique d\'une droite est une droite parallèle', 'Utiliser ces propriétés pour calculer'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle A\'B\'C\' est le symétrique de ABC par rapport à O. AB = 5 cm, BC = 7 cm, l\'angle ABC = 40°, l\'aire de ABC = 12 cm². Complète.',
        ...rmp([['A\'B\' = @ cm', 5], ['B\'C\' = @ cm', 7], ['Angle A\'B\'C\' = @ °', 40], ['Aire de A\'B\'C\' = @ cm²', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Que devient chaque figure par une symétrie centrale ? Entoure.',
        ...chx([['Une droite :', 'une droite parallèle', 'une droite parallèle · une droite perpendiculaire'], ['Un segment :', 'un segment de même longueur', 'un segment de même longueur · un segment deux fois plus long'], ['Un cercle de centre I :', 'un cercle de même rayon', 'un cercle de même rayon · un cercle de rayon double'], ['Trois points alignés :', 'trois points alignés', 'trois points alignés · un triangle']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La symétrie centrale conserve les angles :', 'vrai'], ['Le symétrique d\'une droite qui passe par O est elle-même :', 'vrai'], ['Le symétrique d\'un carré est un rectangle non carré :', 'faux'], ['La symétrie centrale change le sens de rotation d\'une figure :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Le cercle (C) de centre I a pour rayon 3 cm. Son symétrique (C\') par rapport à O a pour centre I\'. Complète (OI = 5 cm).',
        ...rmp([['Rayon de (C\') : @ cm', 3], ['OI\' = @ cm', 5], ['II\' = @ cm', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Les segments [AB] et [A\'B\'] sont symétriques par rapport à O. Entoure.',
        ...chx([['[AB] et [A\'B\'] sont…', 'parallèles', 'parallèles · perpendiculaires'], ['AB = 4 cm, donc A\'B\' =', '4 cm', '2 cm · 4 cm · 8 cm']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Les droites (d) et (d\') sont symétriques par rapport à O. Une droite (Δ) est perpendiculaire à (d). Que peut-on dire de (Δ) et de (d\') ? Justifie.',
        corr: cm1Redac('Justification', { suite: ['Le symétrique d\'une droite par une symétrie centrale est une droite parallèle : (d\') // (d).', 'Si deux droites sont parallèles, toute perpendiculaire à l\'une est perpendiculaire à l\'autre.'] }, '(Δ) est perpendiculaire à (d\').') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un angle de 65° a pour symétrique, par rapport à un point, un autre angle. Quelle est sa mesure ? Explique sans mesurer.',
        corr: cm1Redac('Mesure', 'La symétrie centrale conserve les mesures d\'angles.', 'Le symétrique mesure aussi 65°.') },
    ] },
  { titre: 'Centre de symétrie d\'une figure', duree: '35 min',
    attendus: ['Reconnaître une figure qui a un centre de symétrie', 'Placer le centre de symétrie d\'une figure', 'Distinguer axe de symétrie et centre de symétrie'],
    exos: [
      { etoiles: 1, consigne: 'Ces figures ont-elles un centre de symétrie ? Entoure.',
        ...(() => { const V = [vig(poly([[20, 25], [90, 25], [90, 65], [20, 65]])), vig(poly([[55, 12], [95, 78], [15, 78]])), vig(poly([[30, 20], [95, 20], [80, 70], [15, 70]])), vig(`<circle cx="55" cy="45" r="32" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>`), vig(poly([[20, 70], [40, 20], [70, 20], [90, 70]]))];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'oui'], ['d', 'oui'], ['e', 'non']], 'oui · non'); })() },
      { etoiles: 1, col: 1, consigne: 'Ces lettres majuscules (en bâton) ont-elles un centre de symétrie ? Entoure.',
        ...ch([['H :', 'oui'], ['N :', 'oui'], ['S :', 'oui'], ['A :', 'non'], ['Z :', 'oui'], ['E :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Entoure le centre de symétrie de chaque figure.',
        ...chx([['Un parallélogramme :', 'le point d\'intersection des diagonales', 'le point d\'intersection des diagonales · un sommet'], ['Un cercle :', 'son centre', 'son centre · un point du cercle'], ['Un segment :', 'son milieu', 'son milieu · une extrémité']]) },
      { etoiles: 2, col: 1, consigne: 'Axe, centre, les deux ou aucun ? Entoure.',
        ...chx([['Un rectangle :', 'les deux', 'axe · centre · les deux · aucun'], ['Un triangle équilatéral :', 'axe', 'axe · centre · les deux · aucun'], ['Un parallélogramme quelconque :', 'centre', 'axe · centre · les deux · aucun'], ['Un trapèze quelconque :', 'aucun', 'axe · centre · les deux · aucun']]) },
      { etoiles: 2, col: 1, consigne: 'Ces figures ont-elles un centre de symétrie ? Entoure.',
        ...ch([['Un hexagone régulier :', 'oui'], ['Un pentagone régulier :', 'non'], ['Une étoile à 6 branches :', 'oui'], ['Une étoile à 5 branches :', 'non'], ['Un losange :', 'oui']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine une figure qui a un centre de symétrie mais aucun axe de symétrie, puis une figure qui a un axe mais pas de centre.',
        corr: cm1Redac('Exemples', { suite: ['Centre sans axe : un parallélogramme quelconque, la lettre N.', 'Axe sans centre : un triangle isocèle, la lettre A.'] }, 'Il existe bien d\'autres exemples.') },
    ] },
  { titre: 'Symétrie axiale ou symétrie centrale ?', duree: '35 min',
    attendus: ['Distinguer une symétrie axiale (pliage) d\'une symétrie centrale (demi-tour)', 'Reconnaître la transformation qui envoie une figure sur une autre', 'Construire avec l\'une ou l\'autre'],
    exos: [
      { etoiles: 1, consigne: 'Quelle transformation envoie la figure bleue sur la figure verte ? Entoure.',
        ...(() => { const fl = (pts, c) => `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${c}" stroke-width="2.6"/>`, F = [[15, 20], [35, 20], [35, 35], [45, 45]];
          const centr = F.map(([x, y]) => [110 - x, 90 - y]), axV = F.map(([x, y]) => [110 - x, y]), axH = F.map(([x, y]) => [x, 90 - y]);
          const V = [vig(fl(F, Bl) + fl(centr, Ve) + O([55, 45])), vig(fl(F, Bl) + fl(axV, Ve) + L([55, 5], [55, 85], Ro, 1.6, true)), vig(fl(F, Bl) + fl(axH, Ve) + L([5, 45], [105, 45], Ro, 1.6, true))];
          return vigs(V, [['a', 'centrale'], ['b', 'axiale'], ['c', 'axiale']], 'axiale · centrale'); })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La symétrie axiale correspond à un pliage :', 'vrai'], ['La symétrie centrale correspond à un demi-tour :', 'vrai'], ['Les deux symétries conservent les longueurs :', 'vrai'], ['Une symétrie centrale de centre O est une symétrie axiale d\'axe passant par O :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Place les symétriques G\' et H\' de G et H par rapport au point O.', ...placeSym([[1, 1, 'G'], [2, 4, 'H']], [3, 3], 6, 6, 22) },
      { etoiles: 2, col: 1, consigne: 'Complète avec « axiale » ou « centrale ».',
        ...rmp([['M\' tel que (d) est la médiatrice de [MM\'] : symétrie @', 'axiale'], ['M\' tel que O est le milieu de [MM\'] : symétrie @', 'centrale'], ['On fait tourner la figure d\'un demi-tour : symétrie @', 'centrale']], 7) },
      { etoiles: 2, col: 1, consigne: 'Complète le motif par symétrie de centre O.', ...complExo([[[[1, 1], [1, 3], [3, 3]], [4, 3], 7, 6, 20]], {}) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 5 cm et un point O hors de (AB). Construis le symétrique de [AB] par rapport à O, puis par rapport à la droite (OA). Compare les deux images.',
        corr: cm1Redac('Comparaison', { suite: ['Image par la symétrie de centre O : [A\'B\'] parallèle à [AB], de 5 cm.', 'Image par la symétrie d\'axe (OA) : un segment de 5 cm, en général non parallèle à [AB].'] }, 'Les deux images ont la même longueur, mais elles ne sont pas placées de la même façon.') },
    ] },
];
})();

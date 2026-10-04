/* ============================================================
   6e · Planches : Symétrie axiale (G4)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const X = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? T([p[0] + (dx == null ? 7 : dx), p[1] + (dy == null ? -6 : dy)], n, c, 12) : '');
const W = n => cm1Tex(`\\widehat{${n}}`);
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t, w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;max-width:${w || 120}px;line-height:1.35;">${t}</span></span>`;
const vig = inner => S(110, 90, `<rect x="1" y="1" width="108" height="88" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 96);
const vigs = (V, it, m) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${m}</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
// Quadrillage w × h (k px), nœuds en i·k ; f reçoit g(i, j).
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
// Symétries sur quadrillage : axe vertical x = c, horizontal y = c, diagonale y = x + c, anti-diagonale x + y = c.
const SY = { v: c => ([x, y]) => [2 * c - x, y], h: c => ([x, y]) => [x, 2 * c - y], d: c => ([x, y]) => [y - c, x + c], a: c => ([x, y]) => [c - y, c - x] };
const axe = (t, c, w, h) => t === 'v' ? [[c, 0], [c, h]] : t === 'h' ? [[0, c], [w, c]] : t === 'd' ? [[Math.max(0, -c), Math.max(0, c)], [Math.min(w, h - c), Math.min(h, w + c)]] : [[Math.max(0, c - h), Math.min(h, c)], [Math.min(w, c), Math.max(0, c - w)]];
const segsDe = pts => pts.slice(1).map((p, i) => [pts[i][0], pts[i][1], p[0], p[1]]);
// Compléter une figure (ligne brisée pts) par symétrie d'axe (t, c) : à l'écran, outil segments.
function compl(pts, t, c, w, h, k){ k = k || 16; const f = SY[t](c), q = pts.map(f), [a, b] = axe(t, c, w, h);
  const base = g => L(g(...a), g(...b), Ro, 2.2, true) + `<polyline points="${pts.map(p => g(...p).join(',')).join(' ')}" fill="none" stroke="${Bl}" stroke-width="2.6" stroke-linejoin="round"/>`;
  return { e: plX(Gq(w, h, k, base), { t: 'seg', k, ox: 0, oy: 0, w, h, att: segsDe(q) }), c: Gq(w, h, k, g => base(g) + `<polyline points="${q.map(p => g(...p).join(',')).join(' ')}" fill="none" stroke="${Ve}" stroke-width="2.6" stroke-linejoin="round"/>`) }; }
const complExo = (l, x) => { const r = l.map(a => compl(...a)); return Object.assign({ eleve: duo(r.map(z => z.e)), corr: duo(r.map(z => z.c)) }, x); };
// Placer les symétriques de points (outil points).
function placeSym(P, t, c, w, h, k){ k = k || 20; const f = SY[t](c), [a, b] = axe(t, c, w, h), base = g => L(g(...a), g(...b), Ro, 2.2, true) + P.map(([x, y, n]) => X(g(x, y), n)).join('');
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: P.map(p => p[2] + '\''), att: Object.fromEntries(P.map(([x, y, n]) => [n + '\'', f([x, y]).map(v => v * k)])) }),
    corr: Gq(w, h, k, g => base(g) + P.map(([x, y, n]) => X(g(...f([x, y])), n + '\'', null, null, Ve) + L(g(x, y), g(...f([x, y])), Ve, 1, true)).join('')) }; }
PLANCHES['6e|Symétrie axiale'] = [
  { titre: 'Figures symétriques et axes de symétrie', duree: '35 min',
    attendus: ['Reconnaître deux figures symétriques par rapport à une droite (pliage)', 'Reconnaître un axe de symétrie d\'une figure', 'Connaître le nombre d\'axes des figures usuelles'],
    exos: [
      { etoiles: 1, consigne: 'La droite en pointillés est-elle un axe de symétrie de la figure ? Entoure.',
        ...(() => { const ax = (a, b) => L(a, b, Ro, 2, true), V = [
            vig(poly([[20, 25], [90, 25], [90, 65], [20, 65]]) + ax([55, 8], [55, 82])),
            vig(poly([[20, 25], [90, 25], [90, 65], [20, 65]]) + ax([20, 25], [90, 65])),
            vig(poly([[55, 10], [95, 78], [15, 78]]) + ax([55, 5], [55, 85])),
            vig(poly([[30, 15], [80, 15], [80, 65], [30, 65]]) + ax([22, 7], [88, 73])),
            vig(poly([[30, 20], [95, 20], [80, 70], [15, 70]]) + ax([55, 8], [55, 82]))];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'oui'], ['d', 'oui'], ['e', 'non']], 'oui · non'); })() },
      { etoiles: 1, col: 1, consigne: 'Combien d\'axes de symétrie a chaque figure ?',
        eleve: plListe(['un carré : ' + B(1), 'un rectangle (non carré) : ' + B(1), 'un triangle équilatéral : ' + B(1), 'un losange (non carré) : ' + B(1), 'un triangle isocèle (non équilatéral) : ' + B(1)]),
        corr: plListe(['un carré : ' + R(4), 'un rectangle (non carré) : ' + R(2), 'un triangle équilatéral : ' + R(3), 'un losange (non carré) : ' + R(2), 'un triangle isocèle (non équilatéral) : ' + R(1)]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le nombre d\'axes de symétrie.',
        ...ch([['un cercle :', 'une infinité'], ['un parallélogramme (ni rectangle, ni losange) :', 'aucun'], ['un segment :', '2']], 'aucun · 1 · 2 · une infinité') },
      { etoiles: 2, col: 1, consigne: 'Combien d\'axes de symétrie ont ces lettres majuscules (écrites en bâton) ?',
        eleve: plListe(['A : ' + B(1), 'H : ' + B(1), 'E : ' + B(1), 'N : ' + B(1), 'O : ' + B(1)]),
        corr: plListe(['A : ' + R(1), 'H : ' + R(2), 'E : ' + R(1), 'N : ' + R(0), 'O : ' + R(2)]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine une figure qui a exactement deux axes de symétrie, puis une figure qui n\'en a aucun. Trace les axes en couleur.',
        corr: cm1Redac('Exemples', { suite: ['Deux axes : un rectangle, un losange, la lettre H.', 'Aucun axe : un parallélogramme quelconque, la lettre N, la lettre F.'] }, 'Pour vérifier un axe, on imagine le pliage : les deux parties doivent se superposer.') },
    ] },
  { titre: 'Construire le symétrique d\'une figure sur quadrillage', duree: '35 min',
    attendus: ['Compléter une figure par symétrie sur quadrillage', 'Utiliser un axe vertical, horizontal ou oblique (diagonale)', 'Compter les carreaux de part et d\'autre de l\'axe'],
    exos: [
      complExo([[[[4, 1], [2, 2], [1, 4], [3, 6], [4, 5]], 'v', 5, 9, 7], [[[1, 1], [3, 3], [5, 1], [6, 3]], 'h', 4, 8, 8]], { etoiles: 1, consigne: 'Complète chaque figure par symétrie par rapport à la droite rouge.' }),
      complExo([[[[1, 2], [3, 1], [5, 3], [6, 2]], 'd', 0, 8, 8], [[[1, 2], [2, 1], [5, 1], [4, 3]], 'a', 7, 8, 8]], { etoiles: 2, consigne: 'Ici, l\'axe suit une diagonale du quadrillage. Complète la figure par symétrie.' }),
      complExo([[[[2, 0], [1, 2], [3, 3], [2, 5], [4, 6]], 'v', 5, 10, 7]], { etoiles: 2, col: 1, consigne: 'Complète ce motif par symétrie : on obtient un vase.' }),
      { etoiles: 2, col: 1, consigne: 'Pour construire le symétrique d\'un point sur quadrillage, que faut-il vérifier ? Entoure.',
        ...ch([['Le point et son symétrique sont à la même distance de l\'axe :', 'oui'], ['Le segment qui les relie est perpendiculaire à l\'axe :', 'oui'], ['Le symétrique est toujours au-dessus du point :', 'non']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier quadrillé, trace une lettre de ton prénom, puis son symétrique par rapport à une droite oblique qui suit une diagonale des carreaux.',
        corr: cm1Redac('Méthode', { suite: ['Pour chaque sommet, je compte les diagonales jusqu\'à l\'axe en suivant la perpendiculaire (l\'autre diagonale).', 'Je compte le même nombre de l\'autre côté, puis je relie les points.'] }, 'La figure obtenue est retournée, comme dans un miroir.') },
    ] },
  { titre: 'Symétrique d\'un point', duree: '35 min',
    attendus: ['Connaître la définition : (d) est la médiatrice de [MM\']', 'Construire le symétrique d\'un point à l\'équerre et à la règle, ou au compas', 'Reconnaître un point qui est son propre symétrique'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Place les symétriques A\', B\', C\' des points A, B, C par rapport à la droite rouge.', ...placeSym([[1, 2, 'A'], [3, 5, 'B'], [2, 6, 'C']], 'v', 5, 10, 7) },
      { etoiles: 2, col: 1, consigne: 'Place les symétriques D\', E\', F\' par rapport à la droite rouge (une diagonale).', ...placeSym([[1, 4, 'D'], [2, 6, 'E'], [4, 7, 'F']], 'd', 0, 8, 8) },
      { etoiles: 1, col: 1, consigne: 'M\' est le symétrique de M par rapport à la droite (d). Complète.',
        eleve: plListe(['(d) est la ' + B(6) + ' du segment [MM\'].', '(d) est ' + B(7) + ' à (MM\').', '(d) coupe [MM\'] en son ' + B(4) + '.', 'Si M est sur (d), son symétrique est ' + B(1)]),
        corr: plListe(['(d) est la ' + R('médiatrice') + ' du segment [MM\'].', '(d) est ' + R('perpendiculaire') + ' à (MM\').', '(d) coupe [MM\'] en son ' + R('milieu') + '.', 'Si M est sur (d), son symétrique est ' + R('M')]) },
      { etoiles: 2, col: 1, consigne: 'Le point N\' est-il le symétrique de N par rapport à (d) ? Entoure (I est le point d\'intersection de (NN\') et de (d)).',
        ...ch([['(NN\') ⊥ (d) et IN = IN\' :', 'oui'], ['(NN\') ⊥ (d) mais IN = 2 cm et IN\' = 3 cm :', 'non'], ['IN = IN\' mais (NN\') n\'est pas perpendiculaire à (d) :', 'non']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace une droite (d) et un point M à 3 cm de (d). Construis son symétrique M\' à l\'équerre et à la règle, puis vérifie au compas.',
        corr: cm1Redac('Construction', { suite: ['À l\'équerre : je trace la perpendiculaire à (d) passant par M ; elle coupe (d) en I.', 'Je reporte la longueur IM de l\'autre côté de (d) : IM\' = IM = 3 cm.'] }, 'Vérification au compas : deux cercles centrés sur (d) et passant par M passent aussi par M\'.') },
    ] },
  { titre: 'Propriétés de la symétrie axiale', duree: '35 min',
    attendus: ['Savoir que la symétrie conserve les longueurs, les angles, les aires et l\'alignement', 'Utiliser ces propriétés pour trouver une mesure', 'Construire le symétrique d\'une figure sans quadrillage'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle A\'B\'C\' est le symétrique du triangle ABC par rapport à une droite. AB = 5 cm, BC = 3,5 cm, ' + W('ABC') + ' = 70°, et l\'aire de ABC est 7 cm². Complète.',
        eleve: plListe(['A\'B\' = ' + B() + ' cm', 'B\'C\' = ' + B() + ' cm', W('A\'B\'C\'') + ' = ' + B() + ' °', 'Aire de A\'B\'C\' = ' + B() + ' cm²']),
        corr: plListe(['A\'B\' = ' + R(5) + ' cm', 'B\'C\' = ' + R('3,5') + ' cm', W('A\'B\'C\'') + ' = ' + R(70) + ' °', 'Aire de A\'B\'C\' = ' + R(7) + ' cm²']) },
      { etoiles: 1, col: 1, consigne: 'Complète : le symétrique…',
        eleve: plListe(['d\'un segment est un ' + B(6), 'd\'une droite est une ' + B(6), 'd\'un cercle est un ' + B(6) + ' de même rayon', 'de trois points alignés : trois points ' + B(6)]),
        corr: plListe(['d\'un segment est un ' + R('segment'), 'd\'une droite est une ' + R('droite'), 'd\'un cercle est un ' + R('cercle') + ' de même rayon', 'de trois points alignés : trois points ' + R('alignés')]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le symétrique d\'un carré est un carré de même côté.', 'vrai'], ['La symétrie peut agrandir une figure.', 'faux'], ['Le symétrique d\'une droite parallèle à l\'axe est parallèle à l\'axe.', 'vrai'], ['Le symétrique d\'un angle droit est un angle droit.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Trace un triangle EFG et une droite (d) qui ne le coupe pas. Construis le symétrique de EFG par rapport à (d) en construisant les symétriques des trois sommets.',
        corr: cm1Redac('Méthode', { suite: ['Je construis E\', F\', G\', symétriques de E, F, G (équerre et report de longueur, ou compas).', 'Je relie E\', F\' et G\'.'] }, 'Le triangle E\'F\'G\' a les mêmes longueurs et les mêmes angles que EFG.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le cercle (C) a pour centre O et pour rayon 2 cm. Construis son symétrique par rapport à une droite (d) qui passe à 4 cm de O. Quels points faut-il construire ?',
        corr: cm1Redac('Méthode', 'Il suffit de construire O\', symétrique du centre O.', 'Le symétrique de (C) est le cercle de centre O\' et de même rayon 2 cm.') },
    ] },
  { titre: 'Axe de symétrie d\'un segment, d\'un angle', duree: '35 min',
    attendus: ['Savoir que la médiatrice est un axe de symétrie du segment', 'Savoir que la bissectrice est un axe de symétrie de l\'angle', 'Utiliser les axes de symétrie des triangles isocèles et équilatéraux'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec médiatrice ou bissectrice.',
        eleve: plListe(['Un segment a deux axes de symétrie : sa droite support et sa ' + B(7), 'L\'axe de symétrie d\'un angle est sa ' + B(7), 'L\'axe de symétrie d\'un triangle isocèle est la ' + B(7) + ' de sa base']),
        corr: plListe(['Un segment a deux axes de symétrie : sa droite support et sa ' + R('médiatrice'), 'L\'axe de symétrie d\'un angle est sa ' + R('bissectrice'), 'L\'axe de symétrie d\'un triangle isocèle est la ' + R('médiatrice') + ' de sa base']) },
      { etoiles: 2, col: 1, consigne: 'Le triangle ABC est isocèle en A ; (d) est son axe de symétrie et coupe [BC] en H. Complète.',
        eleve: plListe(['Le symétrique de B par rapport à (d) est ' + B(1), 'Le symétrique de A est ' + B(1), 'Si BH = 2,5 cm, alors BC = ' + B() + ' cm', 'Si ' + W('ABC') + ' = 55°, alors ' + W('ACB') + ' = ' + B() + ' °']),
        corr: plListe(['Le symétrique de B par rapport à (d) est ' + R('C'), 'Le symétrique de A est ' + R('A'), 'Si BH = 2,5 cm, alors BC = ' + R(5) + ' cm', 'Si ' + W('ABC') + ' = 55°, alors ' + W('ACB') + ' = ' + R(55) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'La demi-droite [Oz) est l\'axe de symétrie de l\'angle ' + W('xOy') + ' = 84°. Complète.',
        eleve: plListe([W('xOz') + ' = ' + B() + ' °', 'Le symétrique de la demi-droite [Ox) est ' + B(3)]),
        corr: plListe([W('xOz') + ' = ' + R(42) + ' °', 'Le symétrique de la demi-droite [Ox) est ' + R('[Oy)')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle équilatéral de côté 5 cm et trace ses trois axes de symétrie. Que remarques-tu ?',
        corr: cm1Redac('Observation', { suite: ['Chaque axe est à la fois la médiatrice d\'un côté et la bissectrice de l\'angle opposé.'] }, 'Les trois axes se coupent en un même point, le centre du triangle.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un angle ' + W('xOy') + ' de 70°. Place A sur [Ox) et B sur [Oy) avec OA = OB = 4 cm. Explique pourquoi la bissectrice de l\'angle est aussi la médiatrice de [AB].',
        corr: cm1Redac('Explication', { suite: ['OA = OB : O est sur la médiatrice de [AB].', 'La bissectrice est l\'axe de symétrie de l\'angle : le symétrique de A est B, donc la bissectrice est la médiatrice de [AB].'] }, 'Le triangle OAB est isocèle en O et son axe de symétrie est à la fois la bissectrice de ' + W('xOy') + ' et la médiatrice de [AB].') },
    ] },
];
})();

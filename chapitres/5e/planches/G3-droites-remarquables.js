/* ============================================================
   5e · Planches : Droites remarquables dans un triangle (G3)
   Médiatrices (et cercle circonscrit), hauteurs, reconnaître les droites, concourance ; tracés sur
   quadrillage faisables à l'écran (outil « droites »).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
const vig = inner => S(120, 100, `<rect x="1" y="1" width="118" height="98" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 104);
// Quadrillage w × h (k px) avec un triangle (sommets en carreaux, noms) ; o.sol : droites solution [{ p, v, c }].
function Q(w, h, k, tri, noms, o){ o = o || {}; const g = (x, y) => [x * k, y * k]; let s = '';
  for(let x = 0; x <= w; x++) s += L(g(x, 0), g(x, h), '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L(g(0, y), g(w, y), '#C9DCEB', 1);
  s += `<polygon points="${tri.map(p => g(...p).join(',')).join(' ')}" fill="rgba(46,168,201,.08)" stroke="${K}" stroke-width="2"/>`;
  const G = [tri.reduce((a, p) => a + p[0], 0) / 3, tri.reduce((a, p) => a + p[1], 0) / 3];
  tri.forEach((p, i) => { const v = [p[0] - G[0], p[1] - G[1]], n = Math.hypot(...v) || 1; s += T([p[0] * k + v[0] / n * 12, p[1] * k + v[1] / n * 12 + 4], noms[i], K, 13); });
  (o.sol || []).forEach(({ p, v, c }) => { const t = 40; s += L(g(p[0] - v[0] * t, p[1] - v[1] * t), g(p[0] + v[0] * t, p[1] + v[1] * t), c || Ve, 2.2); });
  return `<svg class="pl-libre" viewBox="0 0 ${w * k} ${h * k}" style="width:${w * k}px;max-width:100%;display:inline-block;vertical-align:middle;"><defs><clipPath id="q${w}${h}${k}${tri.flat().join('')}"><rect width="${w * k}" height="${h * k}"/></clipPath></defs><g clip-path="url(#q${w}${h}${k}${tri.flat().join('')})">${s}</g></svg>`; }
// Tracer des droites (outil droites) ; sol : [{ p, v }].
const trace = (w, h, k, tri, noms, sol) => ({ eleve: plX(Q(w, h, k, tri, noms), { t: 'droites', k, ox: 0, oy: 0, w, h, att: sol.map(d => ({ p: d.p, v: d.v })) }), corr: Q(w, h, k, tri, noms, { sol }) });
const perp = v => [-v[1], v[0]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]], mil = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const hauteur = (tri, i) => ({ p: tri[i], v: perp(sub(tri[(i + 2) % 3], tri[(i + 1) % 3])) }); // hauteur issue du sommet i
const mediatrice = (a, b) => ({ p: mil(a, b), v: perp(sub(b, a)) });
PLANCHES['5e|Droites remarquables dans un triangle'] = [
  { titre: 'Médiatrice d\'un segment', duree: '35 min',
    attendus: ['Savoir que la médiatrice d\'un segment est la perpendiculaire en son milieu', 'Savoir qu\'un point de la médiatrice est à égale distance des extrémités', 'Tracer une médiatrice sur quadrillage, à l\'équerre ou au compas'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Trace la médiatrice du segment [AB], puis celle de [CD].',
        ...(() => { const k = 22, w = 10, h = 7, A = [1, 2], Bp = [5, 2], C = [6, 1], D = [8, 5];
          const base = (sol) => { const g = (x, y) => [x * k, y * k]; let s = ''; for(let x = 0; x <= w; x++) s += L(g(x, 0), g(x, h), '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L(g(0, y), g(w, y), '#C9DCEB', 1);
            s += L(g(...A), g(...Bp), K, 2.4) + L(g(...C), g(...D), K, 2.4) + T([A[0] * k - 8, A[1] * k - 6], 'A') + T([Bp[0] * k + 8, Bp[1] * k - 6], 'B') + T([C[0] * k + 8, C[1] * k - 2], 'C') + T([D[0] * k + 8, D[1] * k + 4], 'D');
            (sol || []).forEach(({ p, v }) => { s += L(g(p[0] - v[0] * 30, p[1] - v[1] * 30), g(p[0] + v[0] * 30, p[1] + v[1] * 30), Ve, 2.2); });
            return `<svg class="pl-libre" viewBox="0 0 ${w * k} ${h * k}" style="width:${w * k}px;max-width:100%;display:block;margin:0 auto;"><defs><clipPath id="medAB"><rect width="${w * k}" height="${h * k}"/></clipPath></defs><g clip-path="url(#medAB)">${s}</g></svg>`; };
          const sol = [mediatrice(A, Bp), mediatrice(C, D)];
          return { eleve: plX(base(), { t: 'droites', k, ox: 0, oy: 0, w, h, att: sol }), corr: base(sol) }; })() },
      { etoiles: 1, col: 1, consigne: 'La droite (d) est la médiatrice de [EF]. Complète.',
        ...rmp([['(d) coupe [EF] en son @.', 'milieu'], ['(d) est @ à (EF).', 'perpendiculaire'], ['Si M est sur (d) et ME = 4 cm, alors MF = @ cm.', 4]], 9) },
      { etoiles: 2, col: 1, consigne: 'Le point M est-il sur la médiatrice de [AB] ? Entoure.',
        ...ch([['MA = 5 cm et MB = 5 cm :', 'oui'], ['MA = 3 cm et MB = 4 cm :', 'non'], ['M est le milieu de [AB] :', 'oui'], ['MA = MB = 0 :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La médiatrice d\'un segment passe par son milieu :', 'vrai'], ['Toute perpendiculaire à [AB] est sa médiatrice :', 'faux'], ['Pour tracer une médiatrice au compas, on trace deux arcs de même rayon :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Construction de la médiatrice de [AB] au compas : remets les étapes dans l\'ordre (écris 1, 2, 3).',
        ...rmp([['Je trace la droite qui passe par les deux points d\'intersection : étape @', 3], ['Je trace un arc de centre A, de rayon plus grand que la moitié de AB : étape @', 1], ['Avec le même rayon, je trace un arc de centre B : étape @', 2]], 1) },
      { etoiles: 2, col: 1, consigne: 'Les points sont-ils sur la médiatrice de [AB] (AB = 6 cm) ? Entoure.',
        ...ch([['P tel que PA = 3 cm et PB = 3 cm :', 'oui'], ['Q tel que QA = 6 cm et QB = 6 cm :', 'oui'], ['R tel que RA = 2 cm et RB = 4 cm :', 'non']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 7 cm et construis sa médiatrice au compas. Place un point M sur la médiatrice, à 5 cm de A. Que vaut MB ? Justifie.',
        corr: cm1Redac('Justification', 'M est sur la médiatrice de [AB] : il est à égale distance de A et de B.', 'MB = MA = 5 cm.') },
    ] },
  { titre: 'Médiatrices d\'un triangle et cercle circonscrit', duree: '40 min',
    attendus: ['Savoir que les trois médiatrices d\'un triangle sont concourantes', 'Savoir que leur point commun est le centre du cercle circonscrit', 'Tracer le cercle circonscrit'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Trace les médiatrices des côtés [AB] et [AC] du triangle ABC.',
        ...(() => { const t = [[2, 6], [8, 6], [4, 2]]; return trace(10, 8, 22, t, ['A', 'B', 'C'], [mediatrice(t[0], t[1]), mediatrice(t[0], t[2])]); })() },
      { etoiles: 1, col: 1, consigne: 'O est le point d\'intersection des médiatrices du triangle ABC (OA = 3,5 cm). Complète.',
        ...rmp([['OB = @ cm', '3,5'], ['OC = @ cm', '3,5'], ['Le cercle de centre O et de rayon OA passe par @, B et C.', 'A'], ['Ce cercle s\'appelle le cercle @ au triangle.', 'circonscrit']], 7) },
      { etoiles: 2, col: 1, consigne: 'Où se trouve le centre du cercle circonscrit ? Entoure.',
        ...chx([['Triangle à trois angles aigus :', 'à l\'intérieur', 'à l\'intérieur · sur un côté · à l\'extérieur'], ['Triangle rectangle :', 'sur un côté', 'à l\'intérieur · sur un côté · à l\'extérieur'], ['Triangle avec un angle obtus :', 'à l\'extérieur', 'à l\'intérieur · sur un côté · à l\'extérieur']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux médiatrices suffisent pour trouver le centre du cercle circonscrit :', 'vrai'], ['Le centre du cercle circonscrit est toujours dans le triangle :', 'faux'], ['Dans un triangle rectangle, ce centre est le milieu de l\'hypoténuse :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Triangle rectangle : le centre du cercle circonscrit est le milieu de l\'hypoténuse. Complète.',
        ...rmp([['ABC rectangle en A, BC = 10 cm : rayon du cercle circonscrit @ cm', 5], ['DEF rectangle en E, DF = 7 cm : rayon @ cm', '3,5'], ['Le rayon vaut 4,5 cm : l\'hypoténuse mesure @ cm', 9]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trois maisons A, B et C ne sont pas alignées. On veut construire un puits à égale distance des trois maisons. Où le placer ? Explique ta construction.',
        corr: cm1Redac('Construction', { suite: ['Le puits doit être à égale distance de A et de B : sur la médiatrice de [AB].', 'Et à égale distance de A et de C : sur la médiatrice de [AC].'] }, 'On place le puits au point d\'intersection des médiatrices : le centre du cercle circonscrit au triangle ABC.') },
    ] },
  { titre: 'Hauteurs d\'un triangle', duree: '40 min',
    attendus: ['Savoir qu\'une hauteur passe par un sommet et est perpendiculaire au côté opposé', 'Tracer une hauteur, même à l\'extérieur du triangle', 'Savoir que les trois hauteurs sont concourantes (orthocentre)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Trace la hauteur issue de A dans chaque triangle.',
        ...(() => { const t1 = [[3, 1], [1, 6], [8, 6]], t2 = [[2, 1], [1, 6], [7, 4]], r1 = trace(9, 7, 20, t1, ['A', 'B', 'C'], [hauteur(t1, 0)]), r2 = trace(9, 7, 20, t2, ['A', 'B', 'C'], [hauteur(t2, 0)]);
          return { eleve: r1.eleve + r2.eleve, corr: r1.corr + r2.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Trace les hauteurs issues de B et de C. Où se coupent-elles ?',
        ...(() => { const t = [[3, 2], [1, 6], [9, 6]]; return trace(11, 8, 20, t, ['A', 'B', 'C'], [hauteur(t, 1), hauteur(t, 2)]); })() },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['La hauteur issue de A est perpendiculaire au côté @.', '[BC]'], ['Le point commun aux trois hauteurs s\'appelle l\'@.', 'orthocentre'], ['Dans un triangle rectangle en A, l\'orthocentre est le point @.', 'A']], 7) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une hauteur passe toujours par le milieu d\'un côté :', 'faux'], ['Dans un triangle rectangle, deux côtés sont des hauteurs :', 'vrai'], ['L\'aire d\'un triangle = base × hauteur : 2 :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un triangle ABC avec un angle obtus en A. Construis ses trois hauteurs à l\'équerre (prolonge les côtés si besoin). Où est l\'orthocentre ?',
        corr: cm1Redac('Observation', { suite: ['Les hauteurs issues de B et de C tombent sur les prolongements des côtés.', 'Les trois hauteurs (prolongées) se coupent en un même point.'] }, 'Dans un triangle obtusangle, l\'orthocentre est à l\'extérieur du triangle.') },
    ] },
  { titre: 'Reconnaître les droites remarquables', duree: '35 min',
    attendus: ['Distinguer médiatrice, hauteur, médiane et bissectrice', 'Utiliser le codage d\'une figure', 'Justifier la nature d\'une droite'],
    exos: [
      { etoiles: 1, consigne: 'Quelle est la droite verte ? Entoure (lis les codages).',
        ...(() => { const A = [40, 15], Bp = [12, 88], C = [108, 88], H = [40, 88], tr = `<polygon points="${[A, Bp, C].map(p => p.join(',')).join(' ')}" fill="#EAF4FB" stroke="${K}" stroke-width="1.8"/>`, ang = (V, a, b) => `<path d="M${V[0] + 8},${V[1]} L${V[0] + 8},${V[1] - 8} L${V[0]},${V[1] - 8}" fill="none" stroke="${Ro}" stroke-width="1.4"/>`;
          const t2 = [[30, 15], [12, 88], [108, 88]], h2 = [30, 88], m2 = [60, 88];
          const V = [vig(tr + L(A, H, Ve, 2) + ang(H)), vig(`<polygon points="${t2.map(p => p.join(',')).join(' ')}" fill="#EAF4FB" stroke="${K}" stroke-width="1.8"/>` + L(t2[0], m2, Ve, 2) + `<path d="M34,84 L38,92 M84,84 L88,92" stroke="${Ro}" stroke-width="1.6"/>`), vig(`<polygon points="${t2.map(p => p.join(',')).join(' ')}" fill="#EAF4FB" stroke="${K}" stroke-width="1.8"/>` + L([60, 5], [60, 98], Ve, 2) + ang([60, 88]) + `<path d="M34,84 L38,92 M84,84 L88,92" stroke="${Ro}" stroke-width="1.6"/>`)];
          return { eleve: duo(V.map((v, i) => col(v, `<b>${'abc'[i]}</b><br><b>hauteur · médiane · médiatrice</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${'abc'[i]}</b><br>${plEntoure(['hauteur', 'médiane', 'médiatrice'][i])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure la définition de chaque droite.',
        ...chx([['Médiatrice d\'un côté :', 'perpendiculaire au côté en son milieu', 'perpendiculaire au côté en son milieu · passe par un sommet et le milieu du côté opposé'], ['Hauteur :', 'passe par un sommet, perpendiculaire au côté opposé', 'passe par un sommet, perpendiculaire au côté opposé · coupe l\'angle en deux'], ['Médiane :', 'passe par un sommet et le milieu du côté opposé', 'perpendiculaire au côté en son milieu · passe par un sommet et le milieu du côté opposé']]) },
      { etoiles: 2, col: 1, consigne: 'Dans un triangle équilatéral ABC, la droite qui passe par A et par le milieu de [BC] est…',
        ...chx([['une médiane ?', 'oui', 'oui · non'], ['une hauteur ?', 'oui', 'oui · non'], ['la médiatrice de [BC] ?', 'oui', 'oui · non'], ['un axe de symétrie du triangle ?', 'oui', 'oui · non']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Dans un triangle isocèle en A, la hauteur issue de A est aussi la médiatrice de [BC] :', 'vrai'], ['Une médiatrice passe toujours par un sommet du triangle :', 'faux'], ['Les trois hauteurs d\'un triangle sont concourantes :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'ABC est un triangle isocèle en A, et I est le milieu de [BC]. Démontre que (AI) est perpendiculaire à (BC).',
        corr: cm1Redac('Démonstration', { suite: ['AB = AC (triangle isocèle) : A est à égale distance de B et de C, donc A est sur la médiatrice de [BC].', 'I est le milieu de [BC] : il est aussi sur cette médiatrice.'] }, '(AI) est la médiatrice de [BC] : elle est perpendiculaire à (BC).') },
    ] },
];
})();

/* ============================================================
   6e · Planches : Distance et cercles (G1)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const P = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? cmT(p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -7 : dy), n, { fs: 13, c: c || K }) : '');
const Ci = (o, r, c, d) => `<circle cx="${o[0]}" cy="${o[1]}" r="${r}" fill="none" stroke="${c || K}" stroke-width="2"${d ? ' stroke-dasharray="5 4"' : ''}/>`;
const cd = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / l, (b[1] - a[1]) / l], v = [-u[1] * 6, u[0] * 6]; let s = ''; for(let i = 0; i < (n || 1); i++){ const d = (i - ((n || 1) - 1) / 2) * 4; s += L([m[0] + u[0] * d - v[0], m[1] + u[1] * d - v[1]], [m[0] + u[0] * d + v[0], m[1] + u[1] * d + v[1]], Ro, 1.6); } return s; };
const choix = (items, mots) => ({ eleve: '<div class="pl-col1">' + plListe(items.map(([t]) => `${t} <b>${mots}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(items.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const regle = (mm, nom, rep) => `<span style="display:flex;flex-direction:column;align-items:center;width:100%;">${cm1RegleGraduee(mm, nom, { n: 8 })}<span>${nom[0]}${nom[1]} = ${rep ? R(String(mm / 10).replace('.', ',')) : B()} cm</span></span>`;
// Cercle de centre O : rayon [OA], diamètre [BC], corde [DE].
const O = [90, 80], r = 62, pt = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
const CERCLE = S(200, 160, Ci(O, r) + L(O, pt(40), Ro, 2.2) + L(pt(160), pt(340), Bl, 2.2) + L(pt(100), pt(230), Ve, 2.2) + P(O, 'O', -14, 14) + P(pt(40), 'A', 6, -2) + P(pt(160), 'B', -14, -2) + P(pt(340), 'C', 6, 10) + P(pt(100), 'D', -4, -8) + P(pt(230), 'E', -12, 12), 180);
// Quadrillage w × h carreaux de k px (nœuds en i·k).
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f(x => x * k), w * k); }
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
PLANCHES['6e|Distance et cercles'] = [
  { titre: 'Distance entre deux points, milieu d\'un segment', duree: '35 min',
    attendus: ['Mesurer une distance avec la règle graduée', 'Connaître et utiliser la notation AB (longueur du segment [AB])', 'Utiliser la définition du milieu d\'un segment et le codage'],
    exos: [
      { etoiles: 1, consigne: 'Lis la longueur de chaque segment sur la règle.',
        eleve: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${regle(47, 'AB')}${regle(62, 'CD')}</div>`, corr: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">${regle(47, 'AB', 1)}${regle(62, 'CD', 1)}</div>` },
      { etoiles: 1, col: 1, consigne: 'I est le milieu du segment [AB]. Complète.',
        eleve: plListe(['Si AB = 8 cm, alors AI = ' + B() + ' cm.', 'Si AI = 3,5 cm, alors AB = ' + B() + ' cm.', 'Si IB = 4,2 cm, alors AI = ' + B() + ' cm.']),
        corr: plListe(['Si AB = 8 cm, alors AI = ' + R(4) + ' cm.', 'Si AI = 3,5 cm, alors AB = ' + R(7) + ' cm.', 'Si IB = 4,2 cm, alors AI = ' + R('4,2') + ' cm.']) },
      { etoiles: 2, col: 1, consigne: `Observe les codages. Complète, sachant que AB = 6 cm.<div style="text-align:center;">${S(230, 70, L([15, 40], [215, 40], K, 2.2) + P([15, 40], 'A', -4, -10) + P([115, 40], 'I', -4, -10) + P([215, 40], 'B', -4, -10) + P([65, 40], 'M', -4, -10) + cd([15, 40], [65, 40], 2) + cd([65, 40], [115, 40], 2) + cd([115, 40], [215, 40], 1), 230)}</div>`,
        eleve: plListe(['IB = ' + B() + ' cm', 'AM = ' + B() + ' cm', 'MB = ' + B() + ' cm']),
        corr: plListe(['IB = ' + R(3) + ' cm', 'AM = ' + R('1,5') + ' cm', 'MB = ' + R('4,5') + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...choix([['Si I est le milieu de [AB], alors AI = IB.', 'vrai'], ['Si AI = IB, alors I est forcément le milieu de [AB].', 'faux'], ['AB désigne la longueur du segment [AB].', 'vrai'], ['Le milieu d\'un segment est toujours sur ce segment.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'A, B et C sont alignés, avec AB = 5 cm et BC = 3 cm. Combien peut mesurer AC ? Trouve les deux possibilités et fais un schéma.',
        corr: cm1Redac('C après B', '5 cm + 3 cm = 8 cm', 'Si B est entre A et C, alors AC = 8 cm.') + cm1Redac('C entre A et B', '5 cm − 3 cm = 2 cm', 'Si C est entre A et B, alors AC = 2 cm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pour le contre-exemple : place deux points A et B, puis un point I tel que AI = IB, mais qui ne soit pas le milieu de [AB].',
        corr: cm1Redac('Un contre-exemple', 'I n\'est pas sur le segment [AB], mais AI = IB.', 'I est sur la médiatrice de [AB], au-dessus du segment : il n\'est pas le milieu, car A, I et B ne sont pas alignés.', `<span class="cm-fig-d">${S(120, 80, L([10, 70], [110, 70], K, 2) + L([10, 70], [60, 15], Bl, 1.6) + L([60, 15], [110, 70], Bl, 1.6) + cd([10, 70], [60, 15]) + cd([60, 15], [110, 70]) + P([10, 70], 'A', -4, 12) + P([110, 70], 'B', -4, 12) + P([60, 15], 'I', 6, 0), 110)}</span>`) },
    ] },
  { titre: 'Distance et milieu : s\'entraîner', duree: '35 min',
    attendus: ['Placer le milieu d\'un segment sur quadrillage', 'Calculer des longueurs à partir de milieux et de codages', 'Construire le milieu d\'un segment'],
    exos: [
      { etoiles: 1, consigne: 'Place le milieu I de [AB], le milieu J de [CD] et le milieu K de [EF].',
        ...(() => { const k = 20, sg = [[[1, 1], [7, 1], 'A', 'B', 'I'], [[9, 1], [13, 5], 'C', 'D', 'J'], [[2, 3], [6, 7], 'E', 'F', 'K']];
          const base = x => sg.map(([a, b, na, nb]) => L([x(a[0]), x(a[1])], [x(b[0]), x(b[1])], K, 2.2) + P([x(a[0]), x(a[1])], na, -6, -8) + P([x(b[0]), x(b[1])], nb, 4, -8)).join('');
          const sol = x => sg.map(([a, b, , , n]) => P([x((a[0] + b[0]) / 2), x((a[1] + b[1]) / 2)], n, -4, 16, Ro)).join('');
          return { eleve: `<div style="text-align:center;">${plX(Gq(14, 8, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w: 14, h: 8 }, noms: ['I', 'J', 'K'], att: Object.fromEntries(sg.map(([a, b, , , n]) => [n, [(a[0] + b[0]) / 2 * k, (a[1] + b[1]) / 2 * k]])) })}</div>`,
            corr: `<div style="text-align:center;">${Gq(14, 8, k, x => base(x) + sol(x))}</div>` }; })() },
      { etoiles: 1, col: 1, consigne: 'Complète, sachant que AB = 12 cm, M est le milieu de [AB] et N le milieu de [AM].',
        eleve: plListe(['AM = ' + B() + ' cm', 'AN = ' + B() + ' cm', 'NM = ' + B() + ' cm', 'NB = ' + B() + ' cm']),
        corr: plListe(['AM = ' + R(6) + ' cm', 'AN = ' + R(3) + ' cm', 'NM = ' + R(3) + ' cm', 'NB = 3 + 6 = ' + R(9) + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Le segment [AB] mesure 10 cm. I est le milieu de [AB] et J est le milieu de [IB]. Complète.',
        eleve: plListe(['AI = ' + B() + ' cm', 'IJ = ' + B() + ' cm', 'AJ = ' + B() + ' cm', 'J est-il le milieu de [AB] ? <b>oui · non</b>']),
        corr: plListe(['AI = ' + R(5) + ' cm', 'IJ = ' + R('2,5') + ' cm', 'AJ = 5 + 2,5 = ' + R('7,5') + ' cm', 'J est-il le milieu de [AB] ? ' + plEntoure('non')]) },
      { etoiles: 2, col: 1, consigne: `Les points sont alignés et la figure est codée. On sait que AE = 12 cm. Complète.<div style="text-align:center;">${S(250, 60, L([10, 35], [240, 35], K, 2.2) + [[10, 'A'], [67.5, 'B'], [125, 'C'], [182.5, 'D'], [240, 'E']].map(([x, n]) => P([x, 35], n, -4, -10)).join('') + cd([10, 35], [67.5, 35], 1) + cd([67.5, 35], [125, 35], 1) + cd([125, 35], [182.5, 35], 1) + cd([182.5, 35], [240, 35], 1), 230)}</div>`,
        eleve: plListe(['AB = ' + B() + ' cm', 'AC = ' + B() + ' cm', 'BD = ' + B() + ' cm', 'Le milieu de [AE] est le point ' + B(1)]),
        corr: plListe(['AB = 12 ÷ 4 = ' + R(3) + ' cm', 'AC = ' + R(6) + ' cm', 'BD = ' + R(6) + ' cm', 'Le milieu de [AE] est le point ' + R('C')]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        eleve: '<div class="pl-col1">' + plListe(['Si I est le milieu de [AB], les points A, I et B sont <b>alignés · non alignés</b>', 'Un segment a <b>un seul milieu · plusieurs milieux</b>', 'Si AI = IB et I est sur [AB], I est <b>le milieu · un autre point</b>']) + '</div>',
        corr: '<div class="pl-col1">' + plListe(['Si I est le milieu de [AB], les points A, I et B sont ' + plEntoure('alignés'), 'Un segment a ' + plEntoure('un seul milieu'), 'Si AI = IB et I est sur [AB], I est ' + plEntoure('le milieu')]) + '</div>' },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 7 cm. Construis son milieu I au compas et à la règle non graduée, puis vérifie en mesurant AI.',
        corr: cm1Redac('Construction', { suite: ['Avec le compas, je trace deux arcs de même rayon, de centres A et B, qui se coupent de part et d\'autre de [AB].', 'La droite qui passe par les deux points d\'intersection coupe [AB] en son milieu I.'] }, 'Je vérifie : AI = IB = 3,5 cm.') },
    ] },
  { titre: 'Le cercle', duree: '35 min',
    attendus: ['Utiliser le vocabulaire du cercle : centre, rayon, diamètre, corde', 'Savoir que les points d\'un cercle sont tous à la même distance du centre', 'Tracer un cercle au compas'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Observe le cercle de centre O, puis entoure le bon mot.<div style="text-align:center;">${CERCLE}</div>`,
        ...choix([['[OA] est', 'un rayon'], ['[BC] est', 'un diamètre'], ['[DE] est', 'une corde']].map(([t, r]) => [t + ' :', r]), 'un rayon · un diamètre · une corde') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['rayon 4 cm : diamètre ' + B() + ' cm', 'diamètre 9 cm : rayon ' + B() + ' cm', 'rayon 2,5 cm : diamètre ' + B() + ' cm', 'diamètre 13 cm : rayon ' + B() + ' cm']),
        corr: plListe(['rayon 4 cm : diamètre ' + R(8) + ' cm', 'diamètre 9 cm : rayon ' + R('4,5') + ' cm', 'rayon 2,5 cm : diamètre ' + R(5) + ' cm', 'diamètre 13 cm : rayon ' + R('6,5') + ' cm']) },
      { etoiles: 2, consigne: '(C) est le cercle de centre O et de rayon 4 cm. Pour chaque point, entoure sa position.',
        ...choix([['OM = 4 cm : M est', 'sur le cercle'], ['OP = 2,5 cm : P est', 'à l\'intérieur'], ['OQ = 6 cm : Q est', 'à l\'extérieur'], ['[OR] est un rayon : R est', 'sur le cercle']], 'sur le cercle · à l\'intérieur · à l\'extérieur') },
      { etoiles: 2, col: 1, consigne: 'Avec ton compas, trace le cercle de centre O qui passe par A, puis le cercle de diamètre [OA].',
        eleve: `<div style="text-align:center;">${S(220, 150, P([110, 75], 'O', -14, 14) + P([170, 75], 'A', 6, 4), 200)}</div>`,
        corr: `<div style="text-align:center;">${S(220, 150, Ci([110, 75], 60, Ve) + Ci([140, 75], 30, Bl) + L([110, 75], [170, 75], K, 1.4, true) + P([110, 75], 'O', -14, 14) + P([170, 75], 'A', 6, 4), 200)}</div><div class="pl-petit">Le cercle de diamètre [OA] a pour centre le milieu de [OA].</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 5 cm. Place tous les points qui sont à 3 cm de A et à 4 cm de B.',
        corr: cm1Redac('Construction', { suite: ['Les points à 3 cm de A sont sur le cercle de centre A et de rayon 3 cm.', 'Les points à 4 cm de B sont sur le cercle de centre B et de rayon 4 cm.'] }, 'Les deux cercles se coupent en deux points : ce sont les points cherchés.', `<span class="cm-fig-d">${S(150, 120, Ci([45, 60], 36, Bl, true) + Ci([105, 60], 48, Ve, true) + L([45, 60], [105, 60], K, 2) + P([45, 60], 'A', -14, 4) + P([105, 60], 'B', 4, 14) + P([66.6, 31.2], '', 0, 0, Ro) + P([66.6, 88.8], '', 0, 0, Ro), 130)}</span>`) },
    ] },
  { titre: 'Cercles : distances et propriétés', duree: '35 min',
    attendus: ['Savoir qu\'un point est sur un cercle quand sa distance au centre est égale au rayon', 'Utiliser rayon et diamètre dans des calculs', 'Construire un triangle à partir de ses trois longueurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le cercle a pour centre O et pour rayon 5 carreaux. Où se trouve chaque point ? Vérifie au compas.',
        ...(() => { const k = 18, o = [6, 6], g = (i, j) => [i * k, j * k];
          const f = Gq(12, 12, k, () => Ci(g(...o), 5 * k) + P(g(...o), 'O', -14, 14) + P(g(9, 2), 'A', 6, -4) + P(g(10, 10), 'B', 6, -2) + P(g(4, 5), 'C', -14, -4) + P(g(1, 6), 'D', 6, -6));
          const it = [['A :', 'sur'], ['B :', 'à l\'extérieur'], ['C :', 'à l\'intérieur'], ['D :', 'sur']], m = 'sur · à l\'intérieur · à l\'extérieur';
          return { eleve: `<div style="text-align:center;">${f}</div><div class="pl-col1">` + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: `<div style="text-align:center;">${f}</div><div class="pl-col1">` + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }; })() },
      { etoiles: 1, col: 1, consigne: 'Le cercle (C) a pour centre O et pour rayon 3 cm. [AB] est un diamètre de (C), et M un point de (C). Complète.',
        eleve: plListe(['OA = ' + B() + ' cm', 'AB = ' + B() + ' cm', 'OM = ' + B() + ' cm', 'O est le ' + B(5) + ' du segment [AB].']),
        corr: plListe(['OA = ' + R(3) + ' cm', 'AB = ' + R(6) + ' cm', 'OM = ' + R(3) + ' cm', 'O est le ' + R('milieu') + ' du segment [AB].']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...choix([['Un diamètre est une corde.', 'vrai'], ['Toutes les cordes passent par le centre.', 'faux'], ['Le diamètre est le double du rayon.', 'vrai'], ['Un cercle n\'a qu\'un seul rayon.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Deux cercles de même centre O ont pour rayons 2 cm et 5 cm. Un point P est sur le grand cercle.',
        eleve: plListe(['OP = ' + B() + ' cm', 'Diamètre du petit cercle : ' + B() + ' cm', 'Distance entre les deux cercles, mesurée sur un rayon : ' + B() + ' cm']),
        corr: plListe(['OP = ' + R(5) + ' cm', 'Diamètre du petit cercle : ' + R(4) + ' cm', 'Distance entre les deux cercles, mesurée sur un rayon : 5 − 2 = ' + R(3) + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis le triangle ABC tel que AB = 6 cm, AC = 4 cm et BC = 5 cm. Explique ta méthode.',
        corr: cm1Redac('Construction au compas', { suite: ['Je trace le segment [AB] de 6 cm.', 'Je trace un arc de cercle de centre A et de rayon 4 cm.', 'Je trace un arc de cercle de centre B et de rayon 5 cm.'] }, 'Les deux arcs se coupent en C : je trace [AC] et [BC].') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un chien est attaché à un piquet par une corde de 3 m. Décris la zone où il peut se déplacer. Peut-il atteindre une gamelle posée à 2,5 m du piquet ? Et un os à 3,5 m ?',
        corr: cm1Redac('Zone du chien', 'Le chien peut aller partout à 3 m ou moins du piquet : à l\'intérieur du disque de centre le piquet et de rayon 3 m.', 'Il atteint la gamelle (2,5 m &lt; 3 m) mais pas l\'os (3,5 m &gt; 3 m).') },
    ] },
  { titre: 'Construire et reproduire des figures avec des cercles', duree: '45 min',
    attendus: ['Lire une figure : centres et rayons des cercles', 'Suivre un programme de construction avec le compas', 'Reproduire une figure en vraie grandeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Sur ce quadrillage, 1 carreau représente 1 cm. Complète.',
        ...(() => { const k = 18, g = (i, j) => [i * k, j * k];
          const f = Gq(12, 8, k, () => Ci(g(4, 4), 3 * k, Bl) + Ci(g(7, 4), 3 * k, Ro) + Ci(g(4, 4), k, Ve) + P(g(4, 4), 'A', -14, -4) + P(g(7, 4), 'B', 6, -4));
          return { eleve: `<div style="text-align:center;">${f}</div>` + plListe(['Rayon du cercle bleu : ' + B() + ' cm', 'Centre du cercle rouge : ' + B(1), 'Diamètre du cercle vert : ' + B() + ' cm', 'Distance AB : ' + B() + ' cm']),
            corr: `<div style="text-align:center;">${f}</div>` + plListe(['Rayon du cercle bleu : ' + R(3) + ' cm', 'Centre du cercle rouge : ' + R('B'), 'Diamètre du cercle vert : ' + R(2) + ' cm', 'Distance AB : ' + R(3) + ' cm']) }; })() },
      { etoiles: 2, col: 1, consigne: `Complète le programme de construction de cette figure.<div style="text-align:center;">${S(200, 120, Ci([75, 60], 45, Bl) + Ci([120, 60], 45, Ro) + L([75, 60], [120, 60], K, 2) + P([75, 60], 'O', -14, 4) + P([120, 60], 'P', 6, 4), 180)}</div>`,
        eleve: plListe(['Trace un segment [OP] de 3 cm.', 'Trace le cercle de centre ' + B(1) + ' passant par P.', 'Trace le cercle de centre P et de rayon ' + B() + ' cm.', 'Les deux cercles ont le même ' + B(5) + '.']),
        corr: plListe(['Trace un segment [OP] de 3 cm.', 'Trace le cercle de centre ' + R('O') + ' passant par P.', 'Trace le cercle de centre P et de rayon ' + R(3) + ' cm.', 'Les deux cercles ont le même ' + R('rayon') + '.']) },
      { etoiles: 2, col: 1, cahier: true, consigne: `Reproduis cette rosace en vraie grandeur : le cercle a pour rayon 3 cm.<div style="text-align:center;">${(() => { const o = [70, 70], r = 45; let s = Ci(o, r, K); for(let i = 0; i < 6; i++){ const a = i * Math.PI / 3, c = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)], a1 = a + 2 * Math.PI / 3, a2 = a + 4 * Math.PI / 3; s += `<path d="M${(c[0] + r * Math.cos(a1)).toFixed(1)},${(c[1] + r * Math.sin(a1)).toFixed(1)} A${r},${r} 0 0 1 ${(c[0] + r * Math.cos(a2)).toFixed(1)},${(c[1] + r * Math.sin(a2)).toFixed(1)}" fill="none" stroke="${Vi}" stroke-width="2"/>`; } return S(140, 140, s, 130); })()}</div>`,
        corr: cm1Redac('Construction', { suite: ['Je trace un cercle de centre O et de rayon 3 cm, et je place un point A sur ce cercle.', 'Sans changer l\'écartement, je pique en A et je trace l\'arc à l\'intérieur du cercle.', 'Je pique au point où l\'arc coupe le cercle, et je recommence six fois.'] }, 'Les six arcs forment une fleur à six pétales.') },
      { etoiles: 2, col: 1, cahier: true, consigne: `Écris un programme de construction de cette figure (le grand cercle a pour rayon 4 cm).<div style="text-align:center;">${S(180, 120, Ci([90, 60], 50, K) + Ci([65, 60], 25, Bl) + Ci([115, 60], 25, Ro) + L([40, 60], [140, 60], K, 1.6) + P([40, 60], 'A', -12, 4) + P([140, 60], 'B', 4, 4) + P([90, 60], 'O', -4, 16), 170)}</div>`,
        corr: cm1Redac('Programme de construction', { suite: ['Trace un segment [AB] de 8 cm et place son milieu O.', 'Trace le cercle de centre O passant par A.', 'Trace le cercle de diamètre [AO] et le cercle de diamètre [OB].'] }, 'Les deux petits cercles ont pour rayon 2 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Suis ce programme : « Trace un segment [AB] de 5 cm. Trace le cercle de centre A et de rayon 5 cm, puis le cercle de centre B de même rayon. Ils se coupent en C et D. Trace les segments [AC], [BC], [AD] et [BD]. » Quelles sont les longueurs des côtés du triangle ABC ?',
        corr: cm1Redac('Longueurs', { suite: ['C est sur le cercle de centre A de rayon 5 cm : AC = 5 cm.', 'C est sur le cercle de centre B de rayon 5 cm : BC = 5 cm.'] }, 'AB = AC = BC = 5 cm : ses trois côtés ont la même longueur (triangle équilatéral).') },
    ] },
];
})();

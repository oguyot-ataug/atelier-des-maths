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
];
})();

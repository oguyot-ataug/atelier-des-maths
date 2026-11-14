/* ============================================================
   6e · Planches : Distance et cercles (G1)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
// Nom d'un point : jamais sur la croix (relecture 6e-G1-P3-E4 : « le label de A est sur la croix ») -- un nom centré trop
// près horizontalement et à la hauteur de la croix est écarté sur le côté.
const P = (p, n, dx, dy, c) => { if(n && dx != null && dy != null && Math.abs(dx) < 10 && dy > -9 && dy < 12) dx = dx < 0 ? -11 : 11; return P0(p, n, dx, dy, c); };
const P0 = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? cmT(p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -7 : dy), n, { fs: 13, c: c || K }) : '');
const Ci = (o, r, c, d) => `<circle cx="${o[0]}" cy="${o[1]}" r="${r}" fill="none" stroke="${c || K}" stroke-width="2"${d ? ' stroke-dasharray="5 4"' : ''}/>`;
const cd = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / l, (b[1] - a[1]) / l], v = [-u[1] * 6, u[0] * 6]; let s = ''; for(let i = 0; i < (n || 1); i++){ const d = (i - ((n || 1) - 1) / 2) * 4; s += L([m[0] + u[0] * d - v[0], m[1] + u[1] * d - v[1]], [m[0] + u[0] * d + v[0], m[1] + u[1] * d + v[1]], Ro, 1.6); } return s; };
const choix = (items, mots) => ({ eleve: '<div class="pl-col1">' + plListe(items.map(([t]) => `${t} <b>${mots}</b>`), items.cols) + '</div>', corr: '<div class="pl-col1">' + plListe(items.map(([t, r]) => `${t} ${plEntoure(r)}`), items.cols) + '</div>' });
const regle = (mm, nom, rep) => `<span style="display:flex;flex-direction:column;align-items:center;width:100%;">${cm1RegleGraduee(mm, nom, { n: 8 })}<span>${nom[0]}${nom[1]} = ${rep ? R(String(mm / 10).replace('.', ',')) : B()} cm</span></span>`;
// Cercle de centre O : rayon [OA], diamètre [BC], corde [DE].
const O = [90, 80], r = 62, pt = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
const CERCLE = S(200, 160, Ci(O, r) + L(O, pt(40), Ro, 2.2) + L(pt(160), pt(340), Bl, 2.2) + L(pt(100), pt(230), Ve, 2.2) + P(O, 'O', -14, 14) + P(pt(40), 'A', 6, -2) + P(pt(160), 'B', -14, -2) + P(pt(340), 'C', 6, 10) + P(pt(100), 'D', -4, -8) + P(pt(230), 'E', -12, 12), 180);
// Constructions au compas des corrigés, animées à l'écran (constructions.js ; demandé le 01/11/2026 : « Oui, mets en place la
// correction animée »). Sur le papier : la figure finale, arcs compris.
const CPT = (p, nom, dx, dy, c) => ({ pt: p, nom, dx, dy, c });
// Triangle AB = 6 cm, AC = 4 cm, BC = 5 cm (1 cm = 20 px).
const TRI_ARCS = (() => { const A = [20, 100], B = [140, 100], C = [65, 100 - Math.sqrt(16 - 2.25 * 2.25) * 20];
  return plConstruction({ programme: [{"op": "point", "name": "A"}, {"op": "segment_length", "from": "A", "to": "B", "length": 6}, {"op": "circle", "id": "cA", "center": "A", "radius": 4}, {"op": "circle", "id": "cB", "center": "B", "radius": 5}, {"op": "intersect", "name": "C", "of": ["cA", "cB"], "pick": "up"}, {"op": "segment", "from": "A", "to": "C"}, {"op": "segment", "from": "B", "to": "C"}], outils: ["regle", "compas"], w: 160, h: 116, px: 170, etapes: [
    { texte: 'Je trace le segment [AB] de 6 cm.', el: [{ seg: [A, B] }, CPT(A, 'A', -11, 4), CPT(B, 'B', 11, 4), { txt: [80, 113], t: '6 cm' }] },
    { texte: 'Je trace un arc de cercle de centre A et de rayon 4 cm.', el: [{ arc: [A, 80, 40, 72], c: '#2EA8C9' }] },
    { texte: 'Je trace un arc de cercle de centre B et de rayon 5 cm.', el: [{ arc: [B, 100, 126, 152], c: '#2E9C6A' }] },
    { texte: 'Les deux arcs se coupent en C : je trace [AC] et [BC].', el: [{ seg: [A, C] }, { seg: [B, C] }, CPT(C, 'C', 0, -9), { txt: [37, 66], t: '4 cm', c: '#2EA8C9', a: 'end' }, { txt: [108, 66], t: '5 cm', c: '#2E9C6A', a: 'start' }] }] }); })();
// Programme de la planche 5 : cercles de centres A et B, de rayon AB = 5 cm (1 cm = 14 px), losange ACBD.
const LOSANGE = (() => { const A = [80, 95], B = [150, 95], h = Math.sqrt(70 * 70 - 35 * 35), C = [115, 95 - h], D = [115, 95 + h];
  return plConstruction({ programme: [{"op": "point", "name": "A"}, {"op": "segment_length", "from": "A", "to": "B", "length": 5}, {"op": "circle", "id": "cA", "center": "A", "radius": 5, "full": true}, {"op": "circle", "id": "cB", "center": "B", "radius": 5, "full": true}, {"op": "intersect", "name": "C", "of": ["cA", "cB"], "pick": "up"}, {"op": "intersect", "name": "D", "of": ["cA", "cB"], "pick": "down"}, {"op": "segment", "from": "A", "to": "C", "color": "rouge"}, {"op": "segment", "from": "B", "to": "C", "color": "rouge"}, {"op": "segment", "from": "A", "to": "D"}, {"op": "segment", "from": "B", "to": "D"}], outils: ["regle", "compas"], w: 230, h: 190, px: 170, etapes: [
    { texte: 'Je trace le segment [AB] de 5 cm.', el: [{ seg: [A, B] }, CPT(A, 'A', -12, 4), CPT(B, 'B', 12, 4)] },
    { texte: 'Je trace le cercle de centre A et de rayon 5 cm : il passe par B.', el: [{ cercle: [A, 70], c: '#2EA8C9' }] },
    { texte: 'Je trace le cercle de centre B, de même rayon : il passe par A.', el: [{ cercle: [B, 70], c: '#2E9C6A' }] },
    { texte: 'Les deux cercles se coupent en C et en D.', el: [CPT(C, 'C', 0, -8), CPT(D, 'D', 0, 18)] },
    { texte: 'Je trace [AC], [BC], [AD] et [BD].', el: [{ seg: [A, C], c: '#E35D3A' }, { seg: [B, C], c: '#E35D3A' }, { seg: [A, D], ep: 1.6 }, { seg: [B, D], ep: 1.6 }] }] }); })();
// Planche 3, exercice 5 : les points à 3 cm de A et à 4 cm de B (1 cm = 12 px).
const DEUX_CERCLES = (() => { const A = [45, 60], B = [105, 60];
  return plConstruction({ programme: [{"op": "point", "name": "A"}, {"op": "segment_length", "from": "A", "to": "B", "length": 5}, {"op": "circle", "id": "cA", "center": "A", "radius": 3, "full": true, "color": "bleu"}, {"op": "circle", "id": "cB", "center": "B", "radius": 4, "full": true, "color": "vert"}, {"op": "intersect", "name": "M", "of": ["cA", "cB"], "pick": "up"}, {"op": "intersect", "name": "N", "of": ["cA", "cB"], "pick": "down"}], outils: ["regle", "compas"], w: 160, h: 120, px: 160, etapes: [
    { texte: 'Je trace le segment [AB] de 5 cm.', el: [{ seg: [A, B] }, CPT(A, 'A', -14, 4), CPT(B, 'B', 4, 14)] },
    { texte: 'Les points à 3 cm de A sont sur le cercle de centre A et de rayon 3 cm.', el: [{ cercle: [A, 36], c: '#2EA8C9' }] },
    { texte: 'Les points à 4 cm de B sont sur le cercle de centre B et de rayon 4 cm.', el: [{ cercle: [B, 48], c: '#2E9C6A' }] },
    { texte: 'Les deux cercles se coupent en deux points : ce sont les points cherchés.', el: [CPT([66.6, 31.2], 'M', 0, -8, '#E35D3A'), CPT([66.6, 88.8], 'N', 0, 18, '#E35D3A')] }] }); })();
// Planche 3, exercice 4 : cercle de centre O passant par A, cercle de diamètre [OA].
const CERCLES_OA = plConstruction({ programme: [{"op": "point", "name": "O"}, {"op": "point", "name": "A", "from": "O", "dx": 3, "dy": 0}, {"op": "circle", "id": "c1", "center": "O", "radius_from": ["O", "A"], "full": true, "color": "vert"}, {"op": "midpoint", "name": "I", "of": ["O", "A"]}, {"op": "circle", "id": "c2", "center": "I", "radius_from": ["I", "O"], "full": true, "color": "bleu"}], outils: ["regle", "compas"], w: 220, h: 150, px: 200, depart: [CPT([110, 75], 'O', -14, 14), CPT([170, 75], 'A', 11, 4)], etapes: [
  { texte: 'Je pique la pointe du compas en O et je l\'écarte jusqu\'à A : je trace le cercle de centre O qui passe par A.', el: [{ cercle: [[110, 75], 60], c: '#2E9C6A' }] },
  { texte: 'Je place le milieu I de [OA].', el: [{ seg: [[110, 75], [170, 75]], ep: 1.4, tirets: true }, CPT([140, 75], 'I', 0, -8)] },
  { texte: 'Je pique en I et je trace le cercle qui passe par O (et par A) : c\'est le cercle de diamètre [OA].', el: [{ cercle: [[140, 75], 30], c: '#2EA8C9' }] }] });
// Planche 5, exercice 3 : la rosace (rayon 3 cm, 1 cm = 15 px).
const ROSACE = (() => { const o = [70, 70], r = 45, c = i => [o[0] + r * Math.cos(-i * Math.PI / 3), o[1] - r * Math.sin(-i * Math.PI / 3)], a = i => ({ arc: [c(i), r, 120 - i * 60, 240 - i * 60], c: '#7A4FC0', ep: 2 }); // arc tourné vers O
  return plConstruction({ programme: [{"op": "point", "name": "O"}, {"op": "point", "name": "A", "from": "O", "dx": 3, "dy": 0}, {"op": "circle", "id": "c0", "center": "O", "radius_from": ["O", "A"], "full": true}, {"op": "circle", "id": "c1", "center": "A", "radius_from": ["O", "A"], "arc": [120, 240], "color": "violet"}, {"op": "intersect", "name": "B", "of": ["c0", "c1"], "pick": "up"}, {"op": "circle", "id": "c2", "center": "B", "radius_from": ["O", "A"], "arc": [180, 300], "color": "violet"}, {"op": "intersect", "name": "C", "of": ["c0", "c2"], "pick": "left"}, {"op": "circle", "id": "c3", "center": "C", "radius_from": ["O", "A"], "arc": [240, 360], "color": "violet"}, {"op": "intersect", "name": "D", "of": ["c0", "c3"], "pick": "left"}, {"op": "circle", "id": "c4", "center": "D", "radius_from": ["O", "A"], "arc": [-60, 60], "color": "violet"}, {"op": "intersect", "name": "E", "of": ["c0", "c4"], "pick": "down"}, {"op": "circle", "id": "c5", "center": "E", "radius_from": ["O", "A"], "arc": [0, 120], "color": "violet"}, {"op": "intersect", "name": "F", "of": ["c0", "c5"], "pick": "right"}, {"op": "circle", "id": "c6", "center": "F", "radius_from": ["O", "A"], "arc": [60, 180], "color": "violet"}], outils: ["regle", "compas"], w: 140, h: 140, px: 150, etapes: [
    { texte: 'Je trace un cercle de centre O et de rayon 3 cm, et je place un point A sur ce cercle.', el: [{ cercle: [o, r], c: '#1F3A5C' }, CPT(o, 'O', -11, 4), CPT(c(0), 'A', 11, 4)] },
    { texte: 'Sans changer l\'écartement, je pique en A et je trace l\'arc à l\'intérieur du cercle.', el: [a(0)] },
    { texte: 'Je pique au point où l\'arc coupe le cercle, je trace l\'arc suivant, et je recommence jusqu\'à revenir en A.', el: [1, 2, 3, 4, 5].map(a) }] }); })();
// Quadrillage w × h carreaux de k px (nœuds en i·k).
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f(x => x * k), w * k); }
// Schéma de points alignés : pts [[nom, abscisse en cm]], cotes au-dessus [[de, à, texte, couleur]], une cote en dessous.
const schema = (pts, haut, bas) => { const k = 16, x = v => 12 + v * k, y = 40, fin = Math.max(...pts.map(q => q[1]));
  let s = L([x(0), y], [x(fin), y], K, 2) + pts.map(([n, v]) => P0([x(v), y], n, 0, 17)).join('');
  haut.forEach(([a, b, t, c]) => { s += cmT((x(a) + x(b)) / 2, y - 9, t, { fs: 11, c: c || Bl }); });
  if(bas){ const [a, b, t] = bas, yb = y + 26; s += L([x(a), yb], [x(b), yb], Ro, 1.4) + L([x(a), yb - 4], [x(a), yb + 4], Ro, 1.4) + L([x(b), yb - 4], [x(b), yb + 4], Ro, 1.4) + cmT((x(a) + x(b)) / 2, yb + 14, t, { fs: 11, c: Ro }); }
  return S(x(fin) + 14, 84, s, x(fin) + 14); };
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
      { etoiles: 2, col: 1, consigne: `I est le milieu du segment [AB] et AB = 6 cm. Observe les codages, puis complète.<div style="text-align:center;">${S(230, 70, L([15, 40], [215, 40], K, 2.2) + P([15, 40], 'A', -4, -10) + P([115, 40], 'I', -4, -10) + P([215, 40], 'B', -4, -10) + P([65, 40], 'M', -4, -10) + cd([15, 40], [65, 40], 2) + cd([65, 40], [115, 40], 2), 230)}</div>`,
        eleve: plListe(['IB = ' + B() + ' cm', 'AM = ' + B() + ' cm', 'MB = ' + B() + ' cm']),
        corr: plListe(['IB = ' + R(3) + ' cm', 'AM = ' + R('1,5') + ' cm', 'MB = ' + R('4,5') + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...choix([['Si I est le milieu de [AB], alors AI = IB.', 'vrai'], ['Si AI = IB, alors I est forcément le milieu de [AB].', 'faux'], ['AB désigne la longueur du segment [AB].', 'vrai'], ['Le milieu d\'un segment est toujours sur ce segment.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'A, B et C sont alignés, avec AB = 5 cm et BC = 3 cm. Combien peut mesurer AC ? Trouve les deux possibilités et fais un schéma.',
        // Un schéma pour chaque cas (relecture 6e-G1-P1-E5 : « Fais des figures pour expliquer »).
        corr: cm1Redac('C après B', '5 cm + 3 cm = 8 cm', 'Si B est entre A et C, alors AC = 8 cm.', `<span class="cm-fig-d">${schema([['A', 0], ['B', 5], ['C', 8]], [[0, 5, '5 cm'], [5, 8, '3 cm']], [0, 8, 'AC = 8 cm'])}</span>`)
          + cm1Redac('C entre A et B', '5 cm − 3 cm = 2 cm', 'Si C est entre A et B, alors AC = 2 cm.', `<span class="cm-fig-d">${schema([['A', 0], ['C', 2], ['B', 5]], [[0, 2, '2 cm', Ro], [2, 5, '3 cm']], [0, 5, 'AB = 5 cm'])}</span>`) },
      { etoiles: 3, cahier: true, consigne: 'Pour le contre-exemple : place deux points A et B, puis un point I tel que AI = IB, mais qui ne soit pas le milieu de [AB].',
        corr: cm1Redac('Contre-exemple', 'I n\'est pas sur le segment [AB], mais AI = IB.', 'I est sur la médiatrice de [AB], au-dessus du segment : il n\'est pas le milieu, car A, I et B ne sont pas alignés.', `<span class="cm-fig-d">${S(120, 80, L([10, 70], [110, 70], K, 2) + L([10, 70], [60, 15], Bl, 1.6) + L([60, 15], [110, 70], Bl, 1.6) + cd([10, 70], [60, 15]) + cd([60, 15], [110, 70]) + P([10, 70], 'A', -4, 12) + P([110, 70], 'B', -4, 12) + P([60, 15], 'I', 6, 0), 110)}</span>`) },
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
        corr: plListe(['AB = 12 : 4 = ' + R(3) + ' cm', 'AC = ' + R(6) + ' cm', 'BD = ' + R(6) + ' cm', 'Le milieu de [AE] est le point ' + R('C')]) },
      // La phrase se termine par des pointillés, les propositions sont à part, en dessous (relecture 6e-G1-P2-E5 : « la première
      // proposition est trop collée au texte. Terminer la partie manquante par des pointillés »).
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        ...(() => { const it = [['Si I est le milieu de [AB], les points A, I et B sont', 'alignés', 'alignés · non alignés'], ['Un segment a', 'un seul milieu', 'un seul milieu · plusieurs milieux'], ['Si AI = IB et I est sur [AB], I est', 'le milieu', 'le milieu · un autre point']];
          const pts = '<span style="display:inline-block;min-width:4.5em;border-bottom:1.5px dotted #8A93A3;height:1.1em;vertical-align:baseline;"></span>';
          const parmi = (m, r) => '<b>' + m.split(' · ').map(w => w === r ? plEntoure(w) : w).join(' · ') + '</b>';
          return { eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} ${pts}. <b>${m}</b>`), it.cols) + '</div>',
            corr: '<div class="pl-col1">' + plListe(it.map(([t, r, m]) => `${t} <span style="color:#1F7A4D;font-weight:700;">${r}</span>. ${parmi(m, r)}`), it.cols) + '</div>' }; })() },
      // Milieu placé à la règle graduée : la construction au compas (médiatrice) ne vient qu'avec la symétrie axiale
      // (relecture 6e-G1-P2-E6).
      { etoiles: 3, cahier: true, consigne: 'Trace un segment [AB] de 7 cm. Place son milieu I avec la règle graduée. Explique comment tu as trouvé où placer I, puis vérifie en mesurant IB.',
        corr: cm1Redac('Position de I', '7 cm : 2 = 3,5 cm', 'Je place I sur [AB], à 3,5 cm de A. Je vérifie : IB = 3,5 cm, donc AI = IB et I est bien le milieu de [AB].') },
    ] },
  { titre: 'Le cercle', duree: '35 min',
    attendus: ['Utiliser le vocabulaire du cercle : centre, rayon, diamètre, corde', 'Savoir que les points d\'un cercle sont tous à la même distance du centre', 'Tracer un cercle au compas'],
    exos: [
      // « un rayon » (un segment) et « le rayon » (une longueur) -- relecture 6e-G1-P3-E1 : « Travailler aussi sur le rayon /
      // un rayon ; le diamètre / un diamètre ».
      { etoiles: 1, col: 1, consigne: `Observe le cercle de centre O, puis entoure le bon mot.<div style="text-align:center;">${CERCLE}</div>`,
        ...(() => { const m = 'un rayon · un diamètre · une corde', it = [['Le segment [OA] est', 'un rayon', m], ['Le segment [BC] est', 'un diamètre', m], ['Le segment [DE] est', 'une corde', m],
            ['La longueur OA est', 'le rayon', 'le rayon · un rayon'], ['La longueur BC est', 'le diamètre', 'le diamètre · un diamètre'], ['Le segment [OC] est', 'un rayon', 'le rayon · un rayon']];
          const parmi = (m, r) => '<b>' + m.split(' · ').map(w => w === r ? plEntoure(w) : w).join(' · ') + '</b>';
          return { eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} : <b>${m}</b>`), it.cols) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r, m]) => `${t} : ${parmi(m, r)}`), it.cols) + '</div>' }; })() },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['rayon 4 cm : diamètre ' + B() + ' cm', 'diamètre 9 cm : rayon ' + B() + ' cm', 'rayon 2,5 cm : diamètre ' + B() + ' cm', 'diamètre 13 cm : rayon ' + B() + ' cm']),
        corr: plListe(['rayon 4 cm : diamètre ' + R(8) + ' cm', 'diamètre 9 cm : rayon ' + R('4,5') + ' cm', 'rayon 2,5 cm : diamètre ' + R(5) + ' cm', 'diamètre 13 cm : rayon ' + R('6,5') + ' cm']) },
      { etoiles: 2, consigne: '(C) est le cercle de centre O et de rayon 4 cm. Pour chaque point, entoure sa position.',
        ...choix([['OM = 4 cm : M est', 'sur le cercle'], ['OP = 2,5 cm : P est', 'à l\'intérieur'], ['OQ = 6 cm : Q est', 'à l\'extérieur'], ['[OR] est un rayon : R est', 'sur le cercle']], 'sur le cercle · à l\'intérieur · à l\'extérieur') },
      { etoiles: 2, col: 1, consigne: 'Avec ton compas, trace le cercle de centre O qui passe par A, puis le cercle de diamètre [OA].',
        eleve: `<div style="text-align:center;">${plInstr(S(220, 150, P([110, 75], 'O', -14, 14) + P([170, 75], 'A', 6, 4), 200), { depart: [{ op: 'point', name: 'O' }, { op: 'point', name: 'A', from: 'O', dx: 3, dy: 0 }], outils: ['compas', 'regle'], att: [{ k: 'cercle', c: 'O', par: 'A' }, { k: 'cercle', milieu: ['O', 'A'] }] })}</div>`,
        corr: `<div style="text-align:center;">${CERCLES_OA}</div><div class="pl-petit">Le cercle de diamètre [OA] a pour centre le milieu de [OA].</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 5 cm. Place tous les points qui sont à 3 cm de A et à 4 cm de B.',
        corr: cm1Redac('Points à 3 cm de A et à 4 cm de B', { suite: ['Les points à 3 cm de A sont sur le cercle de centre A et de rayon 3 cm.', 'Les points à 4 cm de B sont sur le cercle de centre B et de rayon 4 cm.'] }, 'Les deux cercles se coupent en deux points : ce sont les points cherchés.') + `<div style="text-align:center;margin-top:4px;">${DEUX_CERCLES}</div>` },
    ] },
  { titre: 'Cercles : distances et propriétés', duree: '35 min',
    attendus: ['Savoir qu\'un point est sur un cercle quand sa distance au centre est égale au rayon', 'Utiliser rayon et diamètre dans des calculs', 'Construire un triangle à partir de ses trois longueurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le cercle a pour centre O et pour rayon 5 côtés de carreau. Où se trouve chaque point ? Vérifie au compas.',
        ...(() => { const k = 18, o = [6, 6], g = (i, j) => [i * k, j * k];
          const f = Gq(12, 12, k, () => Ci(g(...o), 5 * k) + P(g(...o), 'O', -14, 14) + P(g(9, 2), 'A', 6, -4) + P(g(10, 10), 'B', 6, -2) + P(g(4, 5), 'C', -14, -4) + P(g(1, 6), 'D', 6, -6));
          const it = [['A :', 'sur'], ['B :', 'à l\'extérieur'], ['C :', 'à l\'intérieur'], ['D :', 'sur']], m = 'sur · à l\'intérieur · à l\'extérieur';
          return { eleve: `<div style="text-align:center;">${f}</div><div class="pl-col1">` + plListe(it.map(([t]) => `${t} <b>${m}</b>`), it.cols) + '</div>', corr: `<div style="text-align:center;">${f}</div><div class="pl-col1">` + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`), it.cols) + '</div>' }; })() },
      { etoiles: 1, col: 1, consigne: 'Le cercle (C) a pour centre O et pour rayon 3 cm. [AB] est un diamètre de (C), et M un point de (C). Complète.',
        eleve: plListe(['OA = ' + B() + ' cm', 'AB = ' + B() + ' cm', 'OM = ' + B() + ' cm', 'O est le ' + B(5) + ' du segment [AB].']),
        corr: plListe(['OA = ' + R(3) + ' cm', 'AB = ' + R(6) + ' cm', 'OM = ' + R(3) + ' cm', 'O est le ' + R('milieu') + ' du segment [AB].']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...choix([['Un diamètre est une corde.', 'vrai'], ['Toutes les cordes passent par le centre.', 'faux'], ['Le diamètre est le double du rayon.', 'vrai'], ['Un cercle n\'a qu\'un seul rayon.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Deux cercles de même centre O ont pour rayons 2 cm et 5 cm. Un point P est sur le grand cercle.',
        eleve: plListe(['OP = ' + B() + ' cm', 'Diamètre du petit cercle : ' + B() + ' cm', 'Distance entre les deux cercles, mesurée sur un rayon : ' + B() + ' cm']),
        corr: plListe(['OP = ' + R(5) + ' cm', 'Diamètre du petit cercle : ' + R(4) + ' cm', 'Distance entre les deux cercles, mesurée sur un rayon : 5 − 2 = ' + R(3) + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis le triangle ABC tel que AB = 6 cm, AC = 4 cm et BC = 5 cm. Explique ta méthode.',
        // La figure, avec les arcs de la construction (relecture 6e-G1-P4-E5).
        corr: cm1Redac('Construction au compas', { suite: ['Je trace le segment [AB] de 6 cm.', 'Je trace un arc de cercle de centre A et de rayon 4 cm.', 'Je trace un arc de cercle de centre B et de rayon 5 cm.'] }, 'Les deux arcs se coupent en C : je trace [AC] et [BC].') + `<div style="text-align:center;margin-top:4px;">${TRI_ARCS}</div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un chien est attaché à un piquet par une corde de 3 m. Décris la zone où il peut se déplacer. Peut-il atteindre une gamelle posée à 2,5 m du piquet ? Et un os à 3,5 m ?',
        corr: cm1Redac('Zone du chien', 'Le chien peut aller partout à 3 m ou moins du piquet : à l\'intérieur du disque de centre le piquet et de rayon 3 m.', 'Il atteint la gamelle (2,5 m &lt; 3 m) mais pas l\'os (3,5 m &gt; 3 m).') },
    ] },
  { titre: 'Construire et reproduire des figures avec des cercles', duree: '45 min',
    attendus: ['Lire une figure : centres et rayons des cercles', 'Suivre un programme de construction avec le compas', 'Reproduire une figure en vraie grandeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Sur ce quadrillage, 1 côté de carreau représente 1 cm. Complète.',
        ...(() => { const k = 18, g = (i, j) => [i * k, j * k];
          const f = Gq(12, 8, k, () => Ci(g(4, 4), 3 * k, Bl) + Ci(g(7, 4), 3 * k, Ro) + Ci(g(4, 4), k, Ve) + P(g(4, 4), 'A', -14, -4) + P(g(7, 4), 'B', 6, -4));
          return { eleve: `<div style="text-align:center;">${f}</div>` + plListe(['Rayon du cercle bleu : ' + B() + ' cm', 'Centre du cercle rouge : ' + B(1), 'Diamètre du cercle vert : ' + B() + ' cm', 'Distance AB : ' + B() + ' cm']),
            corr: `<div style="text-align:center;">${f}</div>` + plListe(['Rayon du cercle bleu : ' + R(3) + ' cm', 'Centre du cercle rouge : ' + R('B'), 'Diamètre du cercle vert : ' + R(2) + ' cm', 'Distance AB : ' + R(3) + ' cm']) }; })() },
      { etoiles: 2, col: 1, consigne: `Complète le programme de construction de cette figure.<div style="text-align:center;">${S(200, 120, Ci([75, 60], 45, Bl) + Ci([120, 60], 45, Ro) + L([75, 60], [120, 60], K, 2) + P([75, 60], 'O', -14, 4) + P([120, 60], 'P', 6, 4), 180)}</div>`,
        eleve: plListe(['Trace un segment [OP] de 3 cm.', 'Trace le cercle de centre ' + B(1) + ' passant par P.', 'Trace le cercle de centre P et de rayon ' + B() + ' cm.', 'Les deux cercles ont le même ' + B(5) + '.']),
        corr: plListe(['Trace un segment [OP] de 3 cm.', 'Trace le cercle de centre ' + R('O') + ' passant par P.', 'Trace le cercle de centre P et de rayon ' + R(3) + ' cm.', 'Les deux cercles ont le même ' + R('rayon') + '.']) },
      { etoiles: 2, col: 1, cahier: true, consigne: `Reproduis cette rosace en vraie grandeur : le cercle a pour rayon 3 cm.<div style="text-align:center;">${(() => { const o = [70, 70], r = 45; let s = Ci(o, r, K); for(let i = 0; i < 6; i++){ const a = i * Math.PI / 3, c = [o[0] + r * Math.cos(a), o[1] + r * Math.sin(a)], a1 = a + 2 * Math.PI / 3, a2 = a + 4 * Math.PI / 3; s += `<path d="M${(c[0] + r * Math.cos(a1)).toFixed(1)},${(c[1] + r * Math.sin(a1)).toFixed(1)} A${r},${r} 0 0 1 ${(c[0] + r * Math.cos(a2)).toFixed(1)},${(c[1] + r * Math.sin(a2)).toFixed(1)}" fill="none" stroke="${Vi}" stroke-width="2"/>`; } return S(140, 140, s, 130); })()}</div>`,
        corr: cm1Redac('Construction de la rosace', { suite: ['Je trace un cercle de centre O et de rayon 3 cm, et je place un point A sur ce cercle.', 'Sans changer l\'écartement, je pique en A et je trace l\'arc à l\'intérieur du cercle.', 'Je pique au point où l\'arc coupe le cercle, et je recommence six fois.'] }, 'Les six arcs forment une fleur à six pétales.') + `<div style="text-align:center;margin-top:4px;">${ROSACE}</div>` },
      { etoiles: 2, col: 1, cahier: true, consigne: `Écris un programme de construction de cette figure (le grand cercle a pour rayon 4 cm).<div style="text-align:center;">${S(180, 120, Ci([90, 60], 50, K) + Ci([65, 60], 25, Bl) + Ci([115, 60], 25, Ro) + L([40, 60], [140, 60], K, 1.6) + P([40, 60], 'A', -12, 4) + P([140, 60], 'B', 4, 4) + P([90, 60], 'O', -4, 16), 170)}</div>`,
        corr: cm1Redac('Programme de construction', { suite: ['Trace un segment [AB] de 8 cm et place son milieu O.', 'Trace le cercle de centre O passant par A.', 'Trace le cercle de diamètre [AO] et le cercle de diamètre [OB].'] }, 'Les deux petits cercles ont pour rayon 2 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Suis ce programme : « Trace un segment [AB] de 5 cm. Trace le cercle de centre A et de rayon 5 cm, puis le cercle de centre B de même rayon. Ils se coupent en C et D. Trace les segments [AC], [BC], [AD] et [BD]. » Quelles sont les longueurs des côtés du triangle ABC ?',
        // La figure construite (relecture 6e-G1-P5-E5 : « Construis la figure »).
        corr: cm1Redac('Longueurs des côtés du triangle ABC', { suite: ['C est sur le cercle de centre A de rayon 5 cm : AC = 5 cm.', 'C est sur le cercle de centre B de rayon 5 cm : BC = 5 cm.'] }, 'AB = AC = BC = 5 cm : ses trois côtés ont la même longueur (triangle équilatéral).') + `<div style="text-align:center;margin-top:4px;">${LOSANGE}</div>` },
    ] },
];
})();

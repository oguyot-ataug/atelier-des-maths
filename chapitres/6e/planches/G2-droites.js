/* ============================================================
   6e · Planches : Droites parallèles et perpendiculaires (G2)
   Notations du collège : (AB), [AB), [AB], ⊥, //, médiatrice.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const P = (p, n, dx, dy, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>` + (n ? cmT(p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -7 : dy), n, { fs: 13, c: c || K }) : '');
const ad = (p, u, v, c) => `<polyline points="${p[0] + u[0] * 9},${p[1] + u[1] * 9} ${p[0] + u[0] * 9 + v[0] * 9},${p[1] + u[1] * 9 + v[1] * 9} ${p[0] + v[0] * 9},${p[1] + v[1] * 9}" fill="none" stroke="${c || Ro}" stroke-width="1.6"/>`;
const cd = (a, b) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]), n = [-(b[1] - a[1]) / l * 6, (b[0] - a[0]) / l * 6]; return L([m[0] - n[0], m[1] - n[1]], [m[0] + n[0], m[1] + n[1]], Ro, 1.6); };
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}${t ? `<span>${t}</span>` : ''}</span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-end;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const choix = (items, mots) => ({ eleve: '<div class="pl-col1">' + plListe(items.map(([t]) => `${t} <b>${mots}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(items.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Quadrillage w × h carreaux de k px (nœuds en i·k, origine 0 : le format de la droite à tracer à l'écran).
function Gr(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f(x => x * k), w * k); }
// Médiatrice d'un segment [AB] sur quadrillage (A, B en carreaux) ; trace : à l'écran, l'élève trace la droite.
function medi(A, B, sol, trace){ const k = 22, w = 10, h = 8, g = p => [p[0] * k, p[1] * k], I = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], u = [B[0] - A[0], B[1] - A[1]], n = [-u[1], u[0]], ln = Math.hypot(...n), nn = [n[0] / ln, n[1] / ln];
  let s = Gr(w, h, k, () => L(g(A), g(B), K, 2.4) + P(g(A), 'A', -14, -4) + P(g(B), 'B', 6, -4) + (sol ? L([g(I)[0] - nn[0] * 200, g(I)[1] - nn[1] * 200], [g(I)[0] + nn[0] * 200, g(I)[1] + nn[1] * 200], Ve, 2.2) + ad(g(I), [u[0] / Math.hypot(...u), u[1] / Math.hypot(...u)], nn, Ve) + cd(g(A), g(I)) + cd(g(I), g(B)) : ''));
  if(trace) s = s.replace('<svg ', `<svg data-pltrace='${JSON.stringify({ k, w: w * k, h: h * k, M: g(I), v: [+nn[0].toFixed(4), +nn[1].toFixed(4)] })}' `);
  return s; }
// Figure des notations : trois points alignés A, B, C et un point D.
const NOT = S(260, 90, L([10, 60], [250, 30], K, 2) + P([50, 55], 'A') + P([130, 45], 'B') + P([210, 35], 'C') + P([120, 80], 'D', 8, 4));
// Figure des positions : (d1) ⊥ (d2), (d1) // (d3).
const POS = S(240, 140, L([20, 30], [220, 30], K, 2) + cmT(200, 22, '(d1)', { fs: 12 }) + L([20, 110], [220, 110], Bl, 2) + cmT(200, 128, '(d3)', { fs: 12, c: Bl }) + L([90, 8], [90, 135], Ro, 2) + cmT(104, 20, '(d2)', { fs: 12, c: Ro }) + ad([90, 30], [1, 0], [0, 1]) + L([150, 8], [190, 135], Ve, 2) + cmT(178, 80, '(d4)', { fs: 12, c: Ve }));
PLANCHES['6e|Droites parallèles et perpendiculaires'] = [
  { titre: 'Notations, perpendiculaires et parallèles', duree: '40 min',
    attendus: ['Utiliser les notations (AB), [AB), [AB], ⊥ et //', 'Tracer la perpendiculaire et la parallèle à une droite passant par un point', 'Utiliser les propriétés des droites perpendiculaires et parallèles'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Observe la figure, puis entoure la bonne notation.<div style="text-align:center;">${NOT}</div>`,
        ...(() => { const it = [['la droite qui passe par A et B :', '(AB)', '(AB) · [AB) · [AB]'], ['la demi-droite d\'origine A qui passe par C :', '[AC)', '(AC) · [AC) · [AC]'], ['le segment d\'extrémités B et C :', '[BC]', '(BC) · [BC) · [BC]']];
          return { eleve: plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)), corr: plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) }; })() },
      { etoiles: 1, col: 1, consigne: `Complète avec ⊥ ou //, en t'aidant des codages.<div style="text-align:center;">${POS}</div>`,
        ...choix([['(d1) … (d2) :', '⊥'], ['(d1) … (d3) :', '//'], ['(d2) … (d3) :', '⊥']], '⊥ · //') },
      { etoiles: 2, col: 1, consigne: 'Trace la droite perpendiculaire à la droite (d) passant par le point M.',
        eleve: cm1dpFig({ w: 220, h: 154, k: 22, d: [[22, 132], [198, 44]], M: [66, 44], trace: 'perp' }), corr: cm1dpFig({ w: 220, h: 154, k: 22, d: [[22, 132], [198, 44]], M: [66, 44], sol: 'perp' }) },
      { etoiles: 2, col: 1, consigne: 'Trace la droite parallèle à la droite (d) passant par le point N.',
        eleve: cm1dpFig({ w: 220, h: 154, k: 22, d: [[22, 110], [198, 22]], M: [110, 132], nomM: 'N', trace: 'para' }), corr: cm1dpFig({ w: 220, h: 154, k: 22, d: [[22, 110], [198, 22]], M: [110, 132], nomM: 'N', sol: 'para', nomSol: "(d')" }) },
      { etoiles: 2, consigne: 'Que peux-tu dire des droites ? Entoure.',
        ...choix([['(d1) ⊥ (d3) et (d2) ⊥ (d3), donc (d1) … (d2) :', '//'], ['(d1) // (d2) et (d3) ⊥ (d1), donc (d3) … (d2) :', '⊥'], ['(d1) // (d2) et (d2) // (d3), donc (d1) … (d3) :', '//']], '⊥ · //') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On sait que (AB) ⊥ (d) et (CD) ⊥ (d). Démontre que les droites (AB) et (CD) sont parallèles.',
        corr: cm1Redac('Démonstration', { suite: ['On sait que : (AB) ⊥ (d) et (CD) ⊥ (d).', 'Propriété : si deux droites sont perpendiculaires à une même droite, alors elles sont parallèles.'] }, 'Donc : (AB) // (CD).', `<span class="cm-fig-d">${S(140, 90, L([10, 75], [130, 75], K, 2) + L([45, 8], [45, 88], Ro, 2) + L([100, 8], [100, 88], Bl, 2) + ad([45, 75], [1, 0], [0, -1]) + ad([100, 75], [1, 0], [0, -1]) + cmT(126, 70, '(d)', { fs: 11, a: 'end' }), 130)}</span>`) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace (d) et un point A hors de (d). À l\'équerre, trace la perpendiculaire (d\') à (d) passant par A, puis la perpendiculaire (d\'\') à (d\') passant par A. Que remarques-tu ?',
        corr: cm1Redac('Construction', { suite: ['(d\') ⊥ (d) et (d\'\') ⊥ (d\').'] }, 'Les droites (d) et (d\'\') sont perpendiculaires à la même droite (d\') : elles sont parallèles. (d\'\') est la parallèle à (d) passant par A.') },
    ] },
  { titre: 'Médiatrice d\'un segment', duree: '35 min',
    attendus: ['Connaître la définition de la médiatrice d\'un segment', 'Utiliser la propriété : un point de la médiatrice est à égale distance des extrémités', 'Tracer la médiatrice d\'un segment'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Quelle droite est la médiatrice du segment [AB] ? Entoure.<div style="text-align:center;">${S(220, 130, L([30, 70], [190, 70], K, 2.4) + P([30, 70], 'A', -14, -6) + P([190, 70], 'B', 6, -6) + cd([30, 70], [110, 70]) + cd([110, 70], [190, 70]) + L([110, 5], [110, 125], Ve, 2) + ad([110, 70], [1, 0], [0, -1], Ve) + cmT(122, 14, '(d1)', { fs: 12, c: Ve, a: 'start' }) + L([150, 5], [150, 125], Bl, 2) + ad([150, 70], [1, 0], [0, -1], Bl) + cmT(160, 120, '(d2)', { fs: 12, c: Bl, a: 'start' }) + L([80, 125], [140, 5], Ro, 2) + cmT(66, 120, '(d3)', { fs: 12, c: Ro, a: 'end' }))}</div>`,
        eleve: plListe(['La médiatrice de [AB] est <b>(d1) · (d2) · (d3)</b>']), corr: plListe(['La médiatrice de [AB] est ' + plEntoure('(d1)') + ' : elle est perpendiculaire à [AB] et passe par son milieu.']) },
      { etoiles: 2, col: 1, consigne: 'Le point M est sur la médiatrice du segment [AB]. Complète.',
        eleve: plListe(['Si MA = 4 cm, alors MB = ' + B() + ' cm.', 'Si MB = 7,5 cm, alors MA = ' + B() + ' cm.', 'Le point N vérifie NA = NB = 3 cm. N est-il sur la médiatrice de [AB] ? <b>oui · non</b>', 'Le point P vérifie PA = 5 cm et PB = 6 cm. P est-il sur la médiatrice ? <b>oui · non</b>']),
        corr: plListe(['Si MA = 4 cm, alors MB = ' + R(4) + ' cm.', 'Si MB = 7,5 cm, alors MA = ' + R('7,5') + ' cm.', 'Le point N vérifie NA = NB = 3 cm. N est-il sur la médiatrice de [AB] ? ' + plEntoure('oui'), 'Le point P vérifie PA = 5 cm et PB = 6 cm. P est-il sur la médiatrice ? ' + plEntoure('non')]) },
      { etoiles: 2, consigne: 'Trace la médiatrice de chaque segment, en t\'aidant du quadrillage. Code la figure.',
        eleve: duo([medi([1, 4], [7, 4], false, true), medi([2, 2], [8, 6], false, true)]), corr: duo([medi([1, 4], [7, 4], true), medi([2, 2], [8, 6], true)]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 6 cm. Construis sa médiatrice au compas, puis place un point M sur cette médiatrice. Mesure MA et MB : que remarques-tu ?',
        corr: cm1Redac('Construction au compas', { suite: ['Compas ouvert à plus de 3 cm : un arc de centre A, un arc de centre B, de part et d\'autre de [AB].', 'Les deux arcs se coupent en deux points : je trace la droite qui passe par ces deux points.'] }, 'Pour tout point M de la médiatrice, MA = MB : M est à égale distance de A et de B.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une antenne doit être installée à égale distance de deux villages A et B. Où peut-on la placer ? Justifie.',
        corr: cm1Redac('Position de l\'antenne', 'Les points à égale distance de A et de B forment la médiatrice de [AB].', 'On peut placer l\'antenne n\'importe où sur la médiatrice du segment [AB].') },
    ] },
];
})();

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
function medi(A, B, sol, trace, kk){ const k = kk || 22, w = 10, h = 8, g = p => [p[0] * k, p[1] * k], I = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], u = [B[0] - A[0], B[1] - A[1]], n = [-u[1], u[0]], ln = Math.hypot(...n), nn = [n[0] / ln, n[1] / ln];
  let s = Gr(w, h, k, () => L(g(A), g(B), K, 2.4) + P(g(A), 'A', -14, -4) + P(g(B), 'B', 6, -4) + (sol ? L([g(I)[0] - nn[0] * 200, g(I)[1] - nn[1] * 200], [g(I)[0] + nn[0] * 200, g(I)[1] + nn[1] * 200], Ve, 2.2) + ad(g(I), [u[0] / Math.hypot(...u), u[1] / Math.hypot(...u)], nn, Ve) + cd(g(A), g(I)) + cd(g(I), g(B)) : ''));
  if(trace) s = s.replace('<svg ', `<svg data-pltrace='${JSON.stringify({ k, w: w * k, h: h * k, M: g(I), v: [+nn[0].toFixed(4), +nn[1].toFixed(4)] })}' `);
  return s; }
// Figure des notations : trois points alignés A, B, C et un point D.
const NOT = S(260, 90, L([10, 60], [250, 30], K, 2) + P([50, 55], 'A') + P([130, 45], 'B') + P([210, 35], 'C') + P([120, 80], 'D', 8, 4));
// Figure des positions : (d1) ⊥ (d2), (d1) // (d3).
const POS = S(240, 140, L([20, 30], [220, 30], K, 2) + cmT(200, 22, '(d1)', { fs: 12 }) + L([20, 110], [220, 110], Bl, 2) + cmT(200, 128, '(d3)', { fs: 12, c: Bl }) + L([90, 8], [90, 135], Ro, 2) + cmT(104, 20, '(d2)', { fs: 12, c: Ro }) + ad([90, 30], [1, 0], [0, 1]) + L([150, 8], [190, 135], Ve, 2) + cmT(178, 80, '(d4)', { fs: 12, c: Ve }));
// Quadrillage w × h carreaux (k px) avec des droites (point p, direction v, en carreaux) coupées au bord
// et des points nommés ; sol : droites de la correction (en couleur). Format de l'outil « droites » à l'écran.
const COUL = [Ve, Ro, '#7A4FC0', Bl, '#C98A1E', K];
function droiteG(p, v, w, h, k, c, nom, lab, ep){ let t0 = -1e9, t1 = 1e9; [[0, w], [0, h]].forEach(([mn, mx], q) => { if(!v[q]) return; const e1 = (mn - p[q]) / v[q], e2 = (mx - p[q]) / v[q]; t0 = Math.max(t0, Math.min(e1, e2)); t1 = Math.min(t1, Math.max(e1, e2)); });
  const a = [(p[0] + v[0] * t0) * k, (p[1] + v[1] * t0) * k], b = [(p[0] + v[0] * t1) * k, (p[1] + v[1] * t1) * k];
  return L(a, b, c, ep || 2) + (nom ? cmT(lab[0] * k, lab[1] * k + 4, nom, { fs: 12, c }) : ''); }
function QD(w, h, k, o){ const g = q => [q[0] * k, q[1] * k]; let s = '';
  (o.d || []).forEach(d => s += droiteG(d.p, d.v, w, h, k, d.c || K, d.n, d.lab || d.p, d.ep));
  (o.seg || []).forEach(([a, b, c]) => s += L(g(a), g(b), c || K, 2.2));
  if(o.sol) o.sol.forEach((d, i) => s += droiteG(d.p, d.v, w, h, k, d.c || COUL[i % COUL.length], d.n, d.lab || d.p, 2.2));
  (o.raw || []).forEach(f => s += f(g));
  (o.pts || []).forEach(([q, n, dx, dy]) => s += P(g(q), n, dx, dy));
  return Gr(w, h, k, () => s); }
// Exercice « trace les droites » : à l'écran, outil « droites » ; corrigé : les droites en couleur.
const traceD = (w, h, k, o, sol) => ({ eleve: plX(QD(w, h, k, o), { t: 'droites', k, ox: 0, oy: 0, w, h, att: sol.map(d => ({ p: d.p, v: d.v })) }), corr: QD(w, h, k, { ...o, sol }) });
// Vignette : deux droites (a, b : [point, point]) dans un cadre 120 × 86, avec codage éventuel.
// Vignettes avec le choix sous chaque figure (V : figures ; it : [nom, réponse] ; m : les mots ; note : précision du corrigé).
const vigCap = (t, w) => `<span class="pl-item" style="display:block;text-align:center;line-height:1.3;max-width:${w}px;font-size:.92em;"><b style="font-size:1.1em;">${t}</b> `;
const duoH = l => duo(l).replace('align-items:flex-end', 'align-items:flex-start');
const vigs = (V, it, m, note) => ({ eleve: duoH(V.map((v, i) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${v}${vigCap(it[i][0], 104)}<b>${m}</b></span></span>`)),
  corr: duoH(V.map((v, i) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${v}${vigCap(it[i][0], note ? 150 : 104)}${plEntoure(it[i][1])}${note ? `<br><small>${note[i]}</small>` : ''}</span></span>`)) });
// Figure à gauche, questions à droite.
const cote = (f, h) => `<div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;justify-content:center;"><div>${f}</div><div style="flex:1;min-width:250px;">${h}</div></div>`;
const vig = (l, extra) => S(120, 86, `<rect x="1" y="1" width="118" height="84" rx="8" fill="#fff" stroke="#C9DCEB"/>` + l.map(([a, b, c]) => L(a, b, c || K, 2)).join('') + (extra || ''), 98);
PLANCHES['6e|Droites parallèles et perpendiculaires'] = [
  { titre: 'Position relative de deux droites', duree: '35 min',
    attendus: ['Reconnaître deux droites sécantes, perpendiculaires ou parallèles', 'Utiliser le vocabulaire : sécantes, point d\'intersection, perpendiculaires, parallèles', 'Prolonger les droites avant de conclure'],
    exos: [
      { etoiles: 1, consigne: 'Pour chaque figure, entoure le mot le plus précis. Attention : une droite est illimitée, pense à la prolonger.',
        ...(() => { const V = [
            vig([[[10, 25], [110, 15]], [[10, 65], [110, 55]]]),
            vig([[[15, 70], [105, 70]], [[60, 8], [60, 80]]], ad([60, 70], [1, 0], [0, -1])),
            vig([[[10, 20], [110, 70]], [[10, 70], [110, 30]]]),
            vig([[[10, 60], [110, 20]], [[46, 0], [78, 80]]], ad([62, 40], [.928, -.371], [.371, .928])),
            vig([[[10, 15], [110, 32]], [[10, 72], [110, 50]]])];
          return vigs(V, [['a', 'parallèles'], ['b', 'perpendiculaires'], ['c', 'sécantes'], ['d', 'perpendiculaires'], ['e', 'sécantes']], 'sécantes · perpendiculaires · parallèles'); })() },
      { etoiles: 1, consigne: 'Observe les droites tracées sur le quadrillage. Entoure le mot le plus précis.',
        ...(() => { const F = `<div>${QD(14, 9, 14, { d: [
            { p: [0, 2], v: [1, 0], c: COUL[0], n: '(d1)', lab: [4, 1.5] }, { p: [2, 0], v: [0, 1], c: COUL[1], n: '(d2)', lab: [2.85, .7] },
            { p: [0, 8], v: [1, 0], c: COUL[2], n: '(d3)', lab: [1, 7.5] }, { p: [5, 0], v: [1, 1], c: COUL[3], n: '(d4)', lab: [6.55, .7] },
            { p: [13, 0], v: [1, -1], c: COUL[4], n: '(d5)', lab: [13.4, .7] }, { p: [11, 0], v: [0, 1], c: K, n: '(d6)', lab: [11.85, 4.6] }] })}</div>`;
          const it = [['(d1) et (d3)', 'parallèles'], ['(d1) et (d2)', 'perpendiculaires'], ['(d4) et (d5)', 'perpendiculaires'], ['(d2) et (d6)', 'parallèles'], ['(d3) et (d6)', 'perpendiculaires'], ['(d1) et (d4)', 'sécantes'], ['(d2) et (d5)', 'sécantes']], m = 'sécantes · perpendiculaires · parallèles';
          return { eleve: cote(F, '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} : <b>${m}</b>`)) + '</div>'), corr: cote(F, '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} : ${plEntoure(r)}`)) + '</div>') }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète avec le bon mot.',
        eleve: plListe(['Deux droites avec un seul point commun sont ' + B(6) + '.', 'Deux droites perpendiculaires forment un angle ' + B(3) + '.', 'Deux droites sécantes formant un angle droit sont ' + B(7) + '.', 'Deux droites qui ne se coupent jamais sont ' + B(6) + '.']),
        corr: plListe(['Deux droites avec un seul point commun sont ' + R('sécantes') + '.', 'Deux droites perpendiculaires forment un angle ' + R('droit') + '.', 'Deux droites sécantes formant un angle droit sont ' + R('perpendiculaires') + '.', 'Deux droites qui ne se coupent jamais sont ' + R('parallèles') + '.']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...choix([['Deux droites perpendiculaires sont sécantes.', 'vrai'], ['Deux droites sécantes sont perpendiculaires.', 'faux'], ['Deux droites qui ne se coupent pas sur le dessin sont parallèles.', 'faux'], ['Deux droites parallèles n\'ont aucun point commun.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, consigne: 'Trace les droites (AB), (CD) et (EF), puis entoure la bonne réponse.',
        ...(() => { const o = { pts: [[[1, 5], 'A', -14, -4], [[5, 3], 'B', 4, -8], [[4, 6], 'C', -14, -4], [[8, 4], 'D', 4, -8], [[9, 1], 'E', -14, -2], [[11, 5], 'F', 8, 12]] },
            T = traceD(12, 7, 15, o, [{ p: [1, 5], v: [2, -1], n: '(AB)', lab: [.9, 6.1] }, { p: [4, 6], v: [2, -1], n: '(CD)', lab: [10.6, 3.4] }, { p: [9, 1], v: [1, 2], n: '(EF)', lab: [11.3, 3.3] }]),
            it = [['(AB) et (CD) sont', 'parallèles'], ['(AB) et (EF) sont', 'perpendiculaires'], ['(CD) et (EF) sont', 'perpendiculaires']], m = 'perpendiculaires · parallèles';
          return { eleve: cote(T.eleve, '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>'), corr: cote(T.corr, '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>') }; })() },
    ] },
  { titre: 'Notations et programmes de construction', duree: '35 min',
    attendus: ['Utiliser les notations (AB), [AB), [AB]', 'Compléter et remettre dans l\'ordre un programme de construction', 'Suivre un programme sur quadrillage'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Observe la figure, puis entoure la bonne notation.<div style="text-align:center;">${NOT}</div>`,
        ...(() => { const it = [['la droite qui passe par A et B :', '(AB)', '(AB) · [AB) · [AB]'], ['la demi-droite d\'origine A qui passe par C :', '[AC)', '(AC) · [AC) · [AC]'], ['le segment d\'extrémités B et C :', '[BC]', '(BC) · [BC) · [BC]'], ['le point D appartient-il à la droite (AC) ?', 'non', 'oui · non']];
          return { eleve: plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)), corr: plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) }; })() },
      { etoiles: 1, col: 1, consigne: `Observe la figure, puis complète son programme de construction.<div style="text-align:center;">${S(250, 130, L([30, 110], [220, 110], K, 2.2) + L([90, 5], [90, 128], Ro, 2) + ad([90, 110], [1, 0], [0, -1]) + L([220, 110], [49, 5], Bl, 2) + P([30, 110], 'A', -14, 4) + P([220, 110], 'B', 4, 14) + P([90, 30], 'C', -14, -2) + P([90, 110], 'H', -14, 16))}</div>`,
        eleve: plListe(['Trace le segment ' + B(3) + '.', 'Place un point C qui n\'appartient pas à la droite ' + B(3) + '.', 'Trace la droite perpendiculaire à (AB) passant par le point ' + B(2) + '.', 'Cette droite coupe le segment [AB] au point ' + B(2) + '.', 'Trace la demi-droite d\'origine B qui passe par C : ' + B(3) + '.']),
        corr: plListe(['Trace le segment ' + R('[AB]') + '.', 'Place un point C qui n\'appartient pas à la droite ' + R('(AB)') + '.', 'Trace la droite perpendiculaire à (AB) passant par le point ' + R('C') + '.', 'Cette droite coupe le segment [AB] au point ' + R('H') + '.', 'Trace la demi-droite d\'origine B qui passe par C : ' + R('[BC)') + '.']) },
      { etoiles: 1, col: 1, consigne: `Les étapes du programme de cette figure sont mélangées. Écris le numéro de chaque étape (de 1 à 4).<div style="text-align:center;">${S(230, 120, L([10, 100], [220, 100], K, 2) + cmT(212, 92, '(d)', { fs: 12, a: 'end' }) + L([70, 5], [70, 118], Ro, 2) + cmT(82, 16, "(d')", { fs: 12, c: Ro, a: 'start' }) + ad([70, 100], [1, 0], [0, -1]) + L([10, 40], [220, 40], Bl, 2) + cmT(212, 32, "(d'')", { fs: 12, c: Bl, a: 'end' }) + P([70, 70], 'M', -16, 4) + P([70, 40], 'N', -16, -4))}</div>`,
        eleve: plListe(['Étape ' + B(1) + ' : place un point N sur (d\'), différent de M.', 'Étape ' + B(1) + ' : trace une droite (d) et place un point M qui n\'est pas sur (d).', 'Étape ' + B(1) + ' : trace la droite (d\'\') parallèle à (d) passant par N.', 'Étape ' + B(1) + ' : trace la droite (d\') perpendiculaire à (d) passant par M.']),
        corr: plListe(['Étape ' + R(3) + ' : place un point N sur (d\'), différent de M.', 'Étape ' + R(1) + ' : trace une droite (d) et place un point M qui n\'est pas sur (d).', 'Étape ' + R(4) + ' : trace la droite (d\'\') parallèle à (d) passant par N.', 'Étape ' + R(2) + ' : trace la droite (d\') perpendiculaire à (d) passant par M.']) },
      { etoiles: 2, col: 1, consigne: 'Suis ce programme sur le quadrillage : « Trace la droite (AB). Trace la droite (d) parallèle à (AB) passant par C. Trace la droite (d\') perpendiculaire à (AB) passant par C. »',
        ...(() => { const T = traceD(12, 8, 22, { pts: [[[1, 6], 'A', -14, -2], [[7, 3], 'B', 2, -8], [[8, 6], 'C', 6, 14]] },
            [{ p: [1, 6], v: [2, -1], n: '(AB)', lab: [1.2, 7.3] }, { p: [8, 6], v: [2, -1], n: '(d)', lab: [11.3, 5] }, { p: [8, 6], v: [1, 2], n: "(d')", lab: [5.7, 1] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>`, corr: `<div style="text-align:center;">${T.corr}</div>` }; })() },
    ] },
  { titre: 'Lire et écrire des programmes de construction', duree: '35 min',
    attendus: ['Associer un programme à sa figure', 'Suivre un programme avec les instruments', 'Écrire un programme de construction avec le vocabulaire et les notations'],
    exos: [
      { etoiles: 2, consigne: 'Programme : « Trace un segment [EF]. Trace la droite (d) perpendiculaire à (EF) passant par F. Place un point G sur (d), puis trace le segment [EG]. » Quelle figure correspond à ce programme ?',
        ...(() => { const f = (inner) => S(150, 110, `<rect x="1" y="1" width="148" height="108" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 140);
          const V = [f(L([20, 90], [110, 90], K, 2.2) + L([110, 5], [110, 105], Ro, 2) + ad([110, 90], [-1, 0], [0, -1]) + L([20, 90], [110, 25], Bl, 2) + P([20, 90], 'E', -4, 16) + P([110, 90], 'F', 8, 14) + P([110, 25], 'G', 8, -2)),
            f(L([30, 90], [120, 90], K, 2.2) + L([30, 5], [30, 105], Ro, 2) + ad([30, 90], [1, 0], [0, -1]) + L([120, 90], [30, 25], Bl, 2) + P([30, 90], 'E', -14, 16) + P([120, 90], 'F', 4, 16) + P([30, 25], 'G', 8, -2)),
            f(L([20, 90], [100, 90], K, 2.2) + L([100, 90], [140, 5], Ro, 2) + L([100, 90], [84, 105], Ro, 2) + L([20, 90], [128, 30], Bl, 2) + P([20, 90], 'E', -4, 16) + P([100, 90], 'F', -2, 16) + P([128, 30], 'G', -16, -4))];
          return { eleve: duo(V.map((v, i) => col(v, 'Figure ' + (i + 1)))) + '<div class="pl-col1">' + plListe(['La bonne figure est la <b>figure 1 · figure 2 · figure 3</b>']) + '</div>',
            corr: duo(V.map((v, i) => col(v, 'Figure ' + (i + 1)))) + '<div class="pl-col1">' + plListe(['La bonne figure est la ' + plEntoure('figure 1') + ' : l\'angle droit est en F, et le segment tracé est [EG]. Dans la figure 2, l\'angle droit est en E ; dans la figure 3, (d) n\'est pas perpendiculaire à (EF).']) + '</div>' }; })() },
      { etoiles: 2, col: 1, consigne: 'Écris la notation qui convient.',
        eleve: plListe(['La droite qui passe par E et F : ' + B(3), 'Le segment d\'extrémités E et F : ' + B(3), 'La demi-droite d\'origine E qui passe par F : ' + B(3), 'La demi-droite d\'origine F qui passe par E : ' + B(3)]),
        corr: plListe(['La droite qui passe par E et F : ' + R('(EF)'), 'Le segment d\'extrémités E et F : ' + R('[EF]'), 'La demi-droite d\'origine E qui passe par F : ' + R('[EF)'), 'La demi-droite d\'origine F qui passe par E : ' + R('[FE)')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Suis ce programme sur une feuille blanche : « Trace un segment [AB] de 5 cm. Trace la droite (d) perpendiculaire à (AB) passant par A, et la droite (d\') perpendiculaire à (AB) passant par B. Place le point C sur (d) à 3 cm de A. Trace la parallèle à (AB) passant par C : elle coupe (d\') en D. » Quelle figure obtiens-tu ?',
        corr: cm1Redac('Figure obtenue', { suite: ['ABDC a quatre angles droits : c\'est un rectangle.', 'Ses côtés mesurent 5 cm et 3 cm.'] }, 'J\'obtiens un rectangle ABDC de longueur 5 cm et de largeur 3 cm.', `<span class="cm-fig-d">${S(140, 90, L([15, 80], [125, 80], K, 2) + L([15, 80], [15, 14], K, 2) + L([125, 80], [125, 14], K, 2) + L([15, 14], [125, 14], Ro, 2) + ad([15, 80], [1, 0], [0, -1]) + ad([125, 80], [-1, 0], [0, -1]) + cmT(8, 90, 'A', { fs: 11 }) + cmT(132, 90, 'B', { fs: 11 }) + cmT(8, 12, 'C', { fs: 11 }) + cmT(133, 12, 'D', { fs: 11 }), 130)}</span>`) },
      { etoiles: 3, cahier: true, consigne: `Écris un programme de construction de cette figure, pour qu'un camarade puisse la reproduire sans la voir.<span class="cm-fig-d">${S(240, 130, L([10, 105], [230, 105], K, 2) + cmT(222, 97, '(d)', { fs: 12, a: 'end' }) + L([60, 5], [60, 125], Ro, 2) + L([170, 5], [170, 125], Ro, 2) + ad([60, 105], [1, 0], [0, -1]) + ad([170, 105], [1, 0], [0, -1]) + L([10, 35], [230, 35], Bl, 2) + P([60, 105], 'A', -14, 16) + P([170, 105], 'B', 6, 16) + P([60, 35], 'C', -14, -4) + P([170, 35], 'D', 6, -4), 220)}</span>`,
        corr: cm1Redac('Programme de construction', { suite: ['Trace une droite (d) et place deux points A et B sur (d).', 'Trace la perpendiculaire à (d) passant par A, puis la perpendiculaire à (d) passant par B.', 'Place un point C sur la perpendiculaire passant par A.', 'Trace la parallèle à (d) passant par C : elle coupe la perpendiculaire passant par B au point D.'] }, 'D\'autres programmes sont possibles, s\'ils permettent de construire exactement cette figure.') },
    ] },
  { titre: 'Tracer des perpendiculaires', duree: '40 min',
    attendus: ['Vérifier à l\'équerre que deux droites sont perpendiculaires', 'Tracer la perpendiculaire à une droite passant par un point, sur quadrillage et à l\'équerre', 'Tracer plusieurs perpendiculaires dans une figure (triangle)'],
    exos: [
      { etoiles: 1, consigne: 'Avec ton équerre, vérifie si les deux droites sont perpendiculaires. Entoure.',
        ...(() => { const V = [vig([[[10, 70], [110, 30]], [[46, 15], [74, 85]]]), vig([[[10, 50], [110, 50]], [[70, 13], [50, 87]]]), vig([[[20, 15], [100, 75]], [[36, 77], [84, 13]]]), vig([[[10, 35], [110, 60]], [[60, 6], [60, 82]]])];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'oui'], ['d', 'non']], 'oui · non'); })() },
      { etoiles: 2, consigne: 'Dans chaque cas, trace la droite perpendiculaire à (d) passant par le point, en suivant le quadrillage.',
        ...(() => { const c = [{ d: [[22, 110], [132, 110]], M: [66, 22], nomM: 'A' }, { d: [[22, 110], [132, 0]], M: [110, 88], nomM: 'B' }, { d: [[22, 22], [154, 88]], M: [44, 110], nomM: 'C' }];
          const f = o => cm1dpFig({ w: 154, h: 132, k: 22, ...o });
          return { eleve: duo(c.map((o, i) => col(f({ ...o, trace: 'perp' }), 'abc'[i]))), corr: duo(c.map((o, i) => col(f({ ...o, sol: 'perp' }), 'abc'[i]))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Trace les perpendiculaires à la droite (d) passant par E, par F et par G. Que remarques-tu ?',
        ...(() => { const T = traceD(13, 8, 19, { d: [{ p: [0, 6], v: [3, -1], n: '(d)', lab: [.6, 5.3] }], pts: [[[1, 2], 'E', -14, -4], [[7, 1], 'F', 6, -6], [[11, 6], 'G', 6, 14]] },
            [{ p: [1, 2], v: [1, 3] }, { p: [7, 1], v: [1, 3] }, { p: [11, 6], v: [1, 3] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>` + plListe(['Les trois droites tracées sont <b>sécantes · parallèles</b>']), corr: `<div style="text-align:center;">${T.corr}</div>` + plListe(['Les trois droites tracées sont ' + plEntoure('parallèles') + ' : elles sont perpendiculaires à la même droite (d).']) }; })() },
      { etoiles: 2, col: 1, consigne: 'Dans le triangle ABC, trace les perpendiculaires : à (BC) passant par A, à (AC) passant par B, à (AB) passant par C.',
        ...(() => { const T = traceD(10, 7, 21, { seg: [[[1, 6], [9, 6]], [[9, 6], [3, 2]], [[3, 2], [1, 6]]], pts: [[[1, 6], 'A', -14, 14], [[9, 6], 'B', 6, 14], [[3, 2], 'C', -16, -2]] },
            [{ p: [1, 6], v: [2, -3] }, { p: [9, 6], v: [2, 1] }, { p: [3, 2], v: [0, 1] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>` + plListe(['Les trois droites passent par un même point : <b>oui · non</b>']), corr: `<div style="text-align:center;">${T.corr}</div>` + plListe(['Les trois droites passent par un même point : ' + plEntoure('oui')]) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une feuille blanche, trace un triangle EFG. À l\'équerre, trace la perpendiculaire à (EF) passant par G et la perpendiculaire à (FG) passant par E.',
        corr: cm1Redac('Méthode à l\'équerre', { suite: ['Un côté de l\'angle droit de l\'équerre le long de (EF), je la fais glisser jusqu\'à G et je trace.', 'Même chose avec (FG) et le point E.'] }, 'Je code chaque angle droit par un petit carré.') },
    ] },
  { titre: 'Tracer des parallèles', duree: '35 min',
    attendus: ['Utiliser les symboles ⊥ et //', 'Tracer la parallèle à une droite passant par un point, sur quadrillage', 'Tracer plusieurs parallèles et perpendiculaires dans une figure'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Complète avec ⊥ ou //, en t'aidant des codages.<div style="text-align:center;">${POS}</div>`,
        ...choix([['(d1) … (d2) :', '⊥'], ['(d1) … (d3) :', '//'], ['(d2) … (d3) :', '⊥']], '⊥ · //') },
      { etoiles: 2, consigne: 'Dans chaque cas, trace la droite parallèle à (d) passant par le point, en suivant le quadrillage.',
        ...(() => { const c = [{ d: [[0, 88], [154, 88]], M: [66, 22], nomM: 'R' }, { d: [[22, 0], [132, 110]], M: [110, 22], nomM: 'S' }, { d: [[0, 132], [132, 66]], M: [22, 44], nomM: 'T' }];
          const f = o => cm1dpFig({ w: 154, h: 132, k: 22, ...o });
          return { eleve: duo(c.map((o, i) => col(f({ ...o, trace: 'para' }), 'abc'[i]))), corr: duo(c.map((o, i) => col(f({ ...o, sol: 'para' }), 'abc'[i]))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Trace la parallèle à (BC) passant par A, puis la parallèle à (AB) passant par C. Elles se coupent en un point D : place-le, puis entoure.',
        ...(() => { const T = traceD(11, 7, 24, { seg: [[[1, 5], [6, 6]], [[6, 6], [9, 2]]], pts: [[[1, 5], 'A', -14, 4], [[6, 6], 'B', 0, 16], [[9, 2], 'C', 6, -4]], raw: [] },
            [{ p: [1, 5], v: [3, -4] }, { p: [9, 2], v: [5, 1] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>` + plListe(['Les côtés opposés du quadrilatère ABCD sont <b>parallèles · perpendiculaires</b>']),
            corr: `<div style="text-align:center;">${T.corr.replace('</svg>', P([96, 24], 'D', -6, -8, Ro) + '</svg>')}</div>` + plListe(['Les côtés opposés du quadrilatère ABCD sont ' + plEntoure('parallèles') + '.']) }; })() },
      { etoiles: 2, col: 1, consigne: 'Trace la perpendiculaire à (d) passant par M, la parallèle à (d) passant par M et la parallèle à (d) passant par N.',
        ...(() => { const T = traceD(12, 8, 22, { d: [{ p: [0, 2], v: [1, 1], n: '(d)', lab: [.7, 3.4] }], pts: [[[7, 2], 'M', 6, -4], [[2, 7], 'N', -14, -4]] },
            [{ p: [7, 2], v: [1, -1] }, { p: [7, 2], v: [1, 1] }, { p: [2, 7], v: [1, 1] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>`, corr: `<div style="text-align:center;">${T.corr}</div>` }; })() },
    ] },
  { titre: 'Propriétés et démonstrations', duree: '35 min',
    attendus: ['Connaître les propriétés reliant perpendiculaires et parallèles', 'Rédiger une courte démonstration : on sait que, propriété, donc', 'Ne pas conclure seulement sur l\'aspect du dessin'],
    exos: [
      { etoiles: 2, consigne: 'Que peux-tu dire des droites ? Entoure.',
        ...choix([['(d1) ⊥ (d3) et (d2) ⊥ (d3), donc (d1) … (d2) :', '//'], ['(d1) // (d2) et (d3) ⊥ (d1), donc (d3) … (d2) :', '⊥'], ['(d1) // (d2) et (d2) // (d3), donc (d1) … (d3) :', '//'], ['(d1) ⊥ (d2) et (d2) // (d3), donc (d1) … (d3) :', '⊥']], '⊥ · //') },
      { etoiles: 2, col: 1, consigne: 'Complète la démonstration.',
        eleve: plListe(['On sait que : (d1) // (d2) et (d3) ⊥ (d1).', 'Propriété : si deux droites sont parallèles, alors toute droite perpendiculaire à l\'une est ' + B(7) + ' à l\'autre.', 'Donc : (d3) <b>⊥ · //</b> (d2).']),
        corr: plListe(['On sait que : (d1) // (d2) et (d3) ⊥ (d1).', 'Propriété : si deux droites sont parallèles, alors toute droite perpendiculaire à l\'une est ' + R('perpendiculaire') + ' à l\'autre.', 'Donc : (d3) ' + plEntoure('⊥') + ' (d2).']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On sait que (AB) ⊥ (d) et (CD) ⊥ (d). Démontre que les droites (AB) et (CD) sont parallèles.',
        corr: cm1Redac('Démonstration', { suite: ['On sait que : (AB) ⊥ (d) et (CD) ⊥ (d).', 'Propriété : si deux droites sont perpendiculaires à une même droite, alors elles sont parallèles.'] }, 'Donc : (AB) // (CD).', `<span class="cm-fig-d">${S(140, 90, L([10, 75], [130, 75], K, 2) + L([45, 8], [45, 88], Ro, 2) + L([100, 8], [100, 88], Bl, 2) + ad([45, 75], [1, 0], [0, -1]) + ad([100, 75], [1, 0], [0, -1]) + cmT(126, 70, '(d)', { fs: 11, a: 'end' }), 130)}</span>`) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace (d) et un point A hors de (d). À l\'équerre, trace la perpendiculaire (d\') à (d) passant par A, puis la perpendiculaire (d\'\') à (d\') passant par A. Que peux-tu dire de (d) et (d\'\') ? Démontre-le.',
        corr: cm1Redac('Démonstration', { suite: ['On sait que : (d) ⊥ (d\') et (d\'\') ⊥ (d\').', 'Propriété : si deux droites sont perpendiculaires à une même droite, alors elles sont parallèles.'] }, 'Donc : (d) // (d\'\'). C\'est la méthode pour tracer une parallèle avec l\'équerre seule.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Léo affirme : « Les droites (d1) et (d2) sont parallèles, puisqu'elles ne se coupent pas. » A-t-il raison ? Explique comment vérifier.<div style="text-align:center;">${S(240, 90, L([10, 15], [230, 40], K, 2) + L([10, 80], [230, 58], Ro, 2) + cmT(20, 32, '(d1)', { fs: 12, a: 'start' }) + cmT(20, 72, '(d2)', { fs: 12, c: Ro, a: 'start' }))}</div>`,
        corr: cm1Redac('Réponse', { suite: ['Une droite est illimitée : je prolonge (d1) et (d2) vers la droite.', 'L\'écart entre les deux droites diminue : elles finissent par se couper.'] }, 'Léo a tort : (d1) et (d2) sont sécantes. Pour vérifier, on prolonge les droites, ou on mesure l\'écart entre elles en deux endroits.') },
    ] },
  { titre: 'Médiatrice : définition et propriété', duree: '35 min',
    attendus: ['Connaître la définition de la médiatrice d\'un segment', 'Lire et utiliser les codages (milieu, angle droit)', 'Utiliser la propriété : un point de la médiatrice est à égale distance des extrémités'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Quelle droite est la médiatrice du segment [AB] ? Entoure.<div style="text-align:center;">${S(220, 130, L([30, 70], [190, 70], K, 2.4) + P([30, 70], 'A', -14, -6) + P([190, 70], 'B', 6, -6) + cd([30, 70], [110, 70]) + cd([110, 70], [190, 70]) + L([110, 5], [110, 125], Ve, 2) + ad([110, 70], [1, 0], [0, -1], Ve) + cmT(122, 14, '(d1)', { fs: 12, c: Ve, a: 'start' }) + L([150, 5], [150, 125], Bl, 2) + ad([150, 70], [1, 0], [0, -1], Bl) + cmT(160, 120, '(d2)', { fs: 12, c: Bl, a: 'start' }) + L([80, 125], [140, 5], Ro, 2) + cmT(66, 120, '(d3)', { fs: 12, c: Ro, a: 'end' }), 165)}</div>`,
        eleve: plListe(['La médiatrice de [AB] est <b>(d1) · (d2) · (d3)</b>']), corr: plListe(['La médiatrice de [AB] est ' + plEntoure('(d1)') + ' : elle est perpendiculaire à [AB] et passe par son milieu.']) },
      { etoiles: 1, consigne: 'D\'après les codages, la droite rouge est-elle la médiatrice du segment [AB] ? Entoure.',
        ...(() => { const A = [15, 55], Bp = [105, 55], ab = P(A, 'A', -4, 16) + P(Bp, 'B', -4, 16);
          const V = [vig([[A, Bp], [[60, 6], [60, 82], Ro]], cd(A, [60, 55]) + cd([60, 55], Bp) + ad([60, 55], [1, 0], [0, -1], Ro) + ab),
            vig([[A, Bp], [[40, 82], [80, 6], Ro]], cd(A, [60, 55]) + cd([60, 55], Bp) + ab),
            vig([[A, Bp], [[80, 6], [80, 82], Ro]], ad([80, 55], [1, 0], [0, -1], Ro) + ab),
            vig([[[20, 70], [100, 20]], [[39, 11], [81, 79], Ro]], cd([20, 70], [60, 45]) + cd([60, 45], [100, 20]) + ad([60, 45], [.848, -.53], [.53, .848], Ro) + P([20, 70], 'A', -4, 16) + P([100, 20], 'B', -16, -2))];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'non'], ['d', 'oui']], 'oui · non', ['perpendiculaire, par le milieu', 'pas perpendiculaire', 'pas par le milieu', 'perpendiculaire, par le milieu']); })() },
      { etoiles: 2, col: 1, consigne: `Observe la figure codée, puis complète les phrases.<div style="text-align:center;">${S(230, 130, L([25, 80], [205, 80], K, 2.4) + cd([25, 80], [115, 80]) + cd([115, 80], [205, 80]) + L([115, 5], [115, 125], Ve, 2) + ad([115, 80], [1, 0], [0, -1], Ve) + cmT(127, 120, '(d)', { fs: 12, c: Ve, a: 'start' }) + P([25, 80], 'A', -4, 18) + P([205, 80], 'B', -4, 18) + P([115, 80], 'I', -12, 18) + P([115, 25], 'M', 8, -2) + L([25, 80], [115, 25], Bl, 1.4, true) + L([205, 80], [115, 25], Bl, 1.4, true), 175)}</div>`,
        eleve: plListe(['I est le ' + B(4) + ' du segment [AB].', 'La droite (d) est ' + B(7) + ' à (AB) en I.', 'Donc (d) est la ' + B(6) + ' du segment [AB].', 'M est sur (d), donc MA et MB sont <b>égales · différentes</b>']),
        corr: plListe(['I est le ' + R('milieu') + ' du segment [AB].', 'La droite (d) est ' + R('perpendiculaire') + ' à (AB) en I.', 'Donc (d) est la ' + R('médiatrice') + ' du segment [AB].', 'M est sur (d), donc MA et MB sont ' + plEntoure('égales')]) },
      { etoiles: 2, col: 1, consigne: 'Le point M est sur la médiatrice du segment [AB]. Complète, puis entoure.',
        eleve: plListe(['Si MA = 4 cm, alors MB = ' + B() + ' cm.', 'Si MB = 7,5 cm, alors MA = ' + B() + ' cm.', 'Le point N vérifie NA = NB = 3 cm. N est-il sur la médiatrice de [AB] ? <b>oui · non</b>', 'Le point P vérifie PA = 5 cm et PB = 6 cm. P est-il sur la médiatrice ? <b>oui · non</b>']),
        corr: plListe(['Si MA = 4 cm, alors MB = ' + R(4) + ' cm.', 'Si MB = 7,5 cm, alors MA = ' + R('7,5') + ' cm.', 'Le point N vérifie NA = NB = 3 cm. N est-il sur la médiatrice de [AB] ? ' + plEntoure('oui'), 'Le point P vérifie PA = 5 cm et PB = 6 cm. P est-il sur la médiatrice ? ' + plEntoure('non')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le point M est sur la médiatrice du segment [AB], et MA = 5 cm. Quelle est la longueur MB ? Rédige ta réponse.',
        corr: cm1Redac('Démonstration', { suite: ['On sait que : M est sur la médiatrice de [AB] et MA = 5 cm.', 'Propriété : si un point est sur la médiatrice d\'un segment, alors il est à égale distance des extrémités de ce segment.'] }, 'Donc : MB = MA = 5 cm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une antenne doit être installée à égale distance de deux villages A et B. Où peut-on la placer ? Justifie.',
        corr: cm1Redac('Position de l\'antenne', 'Les points à égale distance de A et de B sont ceux de la médiatrice de [AB].', 'On peut la placer n\'importe où sur la médiatrice de [AB].') },
    ] },
  { titre: 'Construire des médiatrices et reproduire des figures', duree: '45 min',
    attendus: ['Tracer la médiatrice d\'un segment sur quadrillage, à la règle et à l\'équerre, ou au compas', 'Tracer les trois médiatrices d\'un triangle', 'Reproduire une figure sur quadrillage'],
    exos: [
      { etoiles: 2, consigne: 'Trace la médiatrice de chaque segment, en t\'aidant du quadrillage. Code la figure.',
        eleve: duo([medi([1, 4], [7, 4], false, true, 17), medi([2, 2], [8, 6], false, true, 17), medi([3, 1], [5, 7], false, true, 17)]), corr: duo([medi([1, 4], [7, 4], true, false, 17), medi([2, 2], [8, 6], true, false, 17), medi([3, 1], [5, 7], true, false, 17)]) },
      { etoiles: 2, col: 1, consigne: 'Trace les médiatrices des trois côtés du triangle ABC, en t\'aidant du quadrillage. Que remarques-tu ?',
        ...(() => { const T = traceD(10, 10, 20, { seg: [[[2, 2], [8, 2]], [[8, 2], [2, 8]], [[2, 8], [2, 2]]], pts: [[[2, 2], 'A', -14, -4], [[8, 2], 'B', 6, -4], [[2, 8], 'C', -14, 14]] },
            [{ p: [5, 2], v: [0, 1] }, { p: [2, 5], v: [1, 0] }, { p: [5, 5], v: [1, 1] }]);
          return { eleve: `<div style="text-align:center;">${T.eleve}</div>` + plListe(['Les trois médiatrices passent par un même point : <b>oui · non</b>']), corr: `<div style="text-align:center;">${T.corr}</div>` + plListe(['Les trois médiatrices passent par un même point : ' + plEntoure('oui') + ' (ici, le milieu de [BC]).']) }; })() },
      { etoiles: 2, col: 1, consigne: 'Reproduis cette spirale sur le quadrillage de droite, en partant du point rouge.',
        ...(() => { const sp = [[0, 0], [6, 0], [6, 6], [1, 6], [1, 1], [5, 1], [5, 5], [2, 5], [2, 2], [4, 2], [4, 4], [3, 4]], segs = d => sp.slice(1).map((q, i) => [sp[i][0] + d, sp[i][1] + d, q[0] + d, q[1] + d]);
          const mod = Gr(8, 8, 16, x => segs(1).map(([a, b, c, d]) => L([x(a), x(b)], [x(c), x(d)], K, 2.4)).join(''));
          const dep = x => `<circle cx="${x(1)}" cy="${x(1)}" r="4" fill="${Ro}"/>`;
          const fin = Gr(8, 8, 16, x => dep(x) + segs(1).map(([a, b, c, d]) => L([x(a), x(b)], [x(c), x(d)], Ro, 2.4)).join(''));
          return { eleve: duo([col(mod, 'Le modèle'), col(plX(Gr(8, 8, 16, dep), { t: 'seg', k: 16, ox: 0, oy: 0, w: 8, h: 8, att: segs(1) }), 'À toi !')]), corr: duo([col(mod, 'Le modèle'), col(fin, 'La reproduction')]) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 6 cm et sa médiatrice (d), au compas. Place un point C sur (d) tel que CA = 5 cm. Quelle est la longueur CB ? Quelle est la nature du triangle ABC ?',
        corr: cm1Redac('Construction et justification', { suite: ['Le point C est sur la médiatrice de [AB] : il est à égale distance de A et de B.', 'Donc CB = CA = 5 cm.'] }, 'Le triangle ABC a deux côtés de même longueur : c\'est un triangle isocèle en C.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un carré ABCD de 4 cm de côté. Trace la médiatrice de [AB] et la médiatrice de [BC]. Que remarques-tu ?',
        corr: cm1Redac('Observation', { suite: ['La médiatrice de [AB] passe aussi par le milieu de [CD].', 'La médiatrice de [BC] passe aussi par le milieu de [AD].'] }, 'Les deux médiatrices se coupent au centre du carré et le partagent en quatre petits carrés de 2 cm de côté.') },
    ] },
];
})();

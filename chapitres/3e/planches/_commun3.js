/* ============================================================
   Outils communs aux planches (P3 : écrit pour le Manuel 3e et Objectif Brevet, utilisé par tous les niveaux)
   Demandé : « On peut attaquer les planches de 3e ? Avec des exercices type Objectif Brevet en plus !
   En se basant sur les derniers sujets du brevet. »
   Brevet depuis la session 2026 : partie 1 « automatismes » (20 min, sans calculatrice, 6 points, seule
   la réponse compte) puis partie 2 « raisonnement et résolution de problèmes » (1 h 40, calculatrice,
   14 points, réponses justifiées). Chaque chapitre de 3e se termine par une planche Objectif Brevet :
   un exercice d'automatismes ({ auto: true }) et des problèmes rédigés dans le cahier, avec leur barème
   ({ pts }), écrits à la manière des sujets récents (contexte concret, questions enchaînées).
   ============================================================ */
const P3 = {
  B: n => plPointilles(n || 3),
  R: v => plRep(String(v)),
  F: cm1Frac,
  T: (a, b) => cm1Tex(`\\dfrac{${a}}{${b}}`),
  // Une ligne de calcul qui ne se coupe pas.
  ligne: (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`,
  // Réponses à écrire : [['texte avec @', réponse], …] (@ = pointillés dans l'énoncé, réponse dans le corrigé).
  rmp: (l, n) => ({ eleve: plListe(l.map(([t]) => t.split('@').join(P3.B(n || 3)))), corr: plListe(l.map(([t, ...r]) => { let i = 0; return t.replace(/@/g, () => P3.R(r[i++])); })) }),
  // Choix à entourer : [['question', 'bonne réponse'], …], m = les choix proposés (« a · b · c »).
  ch: (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }),
  // Choix différents pour chaque question : [['question', 'bonne réponse', 'a · b · c'], …].
  chx: it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }),
  // Automatismes du brevet : questions courtes, réponse à écrire ou à entourer parmi des choix.
  // [['question', réponse, ['choix1', 'choix2', …]?], …]
  auto: it => ({
    eleve: plListe(it.map(([q, , c]) => c ? `${q} <b>${c.join(' · ')}</b>` : `${q} ${P3.B(4)}`)),
    corr: plListe(it.map(([q, r, c]) => c ? `${q} ${plEntoure(r)}` : `${q} ${P3.R(r)}`)) }),
  // Questions enchaînées d'un problème de brevet (numérotées comme au brevet) ; une question peut
  // avoir des sous-questions : ['texte', ['a)…', 'b)…']].
  qs: items => `<ol class="pl-bq">${items.map(x => Array.isArray(x) ? `<li>${x[0]}<ol>${x[1].map(y => `<li>${y}</li>`).join('')}</ol></li>` : `<li>${x}</li>`).join('')}</ol>`,
  // Figure à côté d'un texte (questions d'un problème de brevet).
  cote: (fig, html) => `<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;"><div style="flex:0 0 auto;">${fig}</div><div style="flex:1;min-width:220px;">${html}</div></div>`,
  // Figure SVG simple.
  svg: (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`,
  K: '#1F3A5C', Ro: '#E35D3A', Bl: '#2EA8C9', Ve: '#2E9C6A', Vi: '#7A4FC0', Or: '#E9A21C',
  L: (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || '#1F3A5C'}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`,
  Tx: (p, t, c, fs, a) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || '#1F3A5C', a }),
  // Tableau de valeurs (en-têtes en première colonne) : lignes = [['x', 1, 2], ['f(x)', '@', 5]] ; @ = case à compléter.
  tab: (lignes, corr, reps) => { let k = 0; return `<table class="pl-tab3" style="border-collapse:collapse;margin:4px auto;">${lignes.map(l => `<tr>${l.map((c, j) => `<td style="border:1.5px solid #1F3A5C;padding:3px 9px;text-align:center;min-width:34px;${j === 0 ? 'background:#EEF4FB;font-weight:700;' : ''}">${c === '@' ? (corr ? P3.R(reps[k++]) : P3.B(3)) : c}</td>`).join('')}</tr>`).join('')}</table>`; },
  // Repère quadrillé avec courbes : o = { x: [xmin, xmax], y: [ymin, ymax], u: px par unité (x), v: px par unité (y),
  // gx, gy: graduations écrites tous les gx (gy) ; sx, sy: valeur d'un carreau (1 par défaut) ; fns: [{ f, c, de, a }] ;
  // pts: [{ x, y, c, t }] ; segs: [[[x1, y1], [x2, y2], c, pointillés]] ; nx, ny: noms des axes ; px: largeur affichée }.
  repere: o => { const [a, b] = o.x, [c, d] = o.y, u = o.u || 22, v = o.v || u, m = 26, sx = o.sx || 1, sy = o.sy || 1, gx = o.gx || sx, gy = o.gy || sy;
    const X = x => m + (x - a) * u, Y = y => m + (d - y) * v, W = (b - a) * u + 2 * m, H = (d - c) * v + 2 * m;
    const ok = (t, s) => Math.abs(t / s - Math.round(t / s)) < 1e-6;
    let g = '';
    for(let x = a; x <= b + 1e-9; x += sx) g += `<line x1="${X(x)}" y1="${Y(c)}" x2="${X(x)}" y2="${Y(d)}" stroke="#D5E2EE" stroke-width="1"/>`;
    for(let y = c; y <= d + 1e-9; y += sy) g += `<line x1="${X(a)}" y1="${Y(y)}" x2="${X(b)}" y2="${Y(y)}" stroke="#D5E2EE" stroke-width="1"/>`;
    const x0 = a <= 0 && b >= 0 ? 0 : a, y0 = c <= 0 && d >= 0 ? 0 : c;
    if(o.axes !== false){
    g += `<line x1="${X(a)}" y1="${Y(y0)}" x2="${X(b) + 10}" y2="${Y(y0)}" stroke="#1F3A5C" stroke-width="1.6"/><path d="M${X(b) + 10},${Y(y0)} l-7,-4 v8 z" fill="#1F3A5C"/>`;
    g += `<line x1="${X(x0)}" y1="${Y(c)}" x2="${X(x0)}" y2="${Y(d) - 10}" stroke="#1F3A5C" stroke-width="1.6"/><path d="M${X(x0)},${Y(d) - 10} l-4,7 h8 z" fill="#1F3A5C"/>`;
    const nb = t => String(Math.round(t * 1000) / 1000).replace('.', ',').replace('-', '−');
    for(let x = a; x <= b + 1e-9; x += sx) if(ok(x, gx) && Math.abs(x - x0) > 1e-9) g += P3.Tx([X(x), Y(y0) + 14], nb(x), '#1F3A5C', 10);
    for(let y = c; y <= d + 1e-9; y += sy) if(ok(y, gy) && Math.abs(y - y0) > 1e-9) g += P3.Tx([X(x0) - 5, Y(y) + 4], nb(y), '#1F3A5C', 10, 'end');
    g += P3.Tx([X(x0) - 5, Y(y0) + 14], x0 === 0 && y0 === 0 ? '0' : '', '#1F3A5C', 10, 'end');
    if(o.nx) g += P3.Tx([X(b) + 8, Y(y0) - 6], o.nx, '#1F3A5C', 10, 'end');
    if(o.ny) g += P3.Tx([X(x0) + 6, Y(d) - 4], o.ny, '#1F3A5C', 10, 'start');
    }
    (o.polys || []).forEach(([pts, col, fill]) => { g += `<polygon points="${pts.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="${fill || 'none'}" stroke="${col || '#1F3A5C'}" stroke-width="2"/>`; });
    (o.segs || []).forEach(([p, q, col, dash]) => { g += P3.L([X(p[0]), Y(p[1])], [X(q[0]), Y(q[1])], col || '#E35D3A', 1.4, dash); });
    (o.fns || []).forEach(F => { const de = F.de ?? a, fin = F.a ?? b, n = 160; let path = '', on = false;
      for(let i = 0; i <= n; i++){ const x = de + (fin - de) * i / n, y = F.f(x); if(y < c - .01 || y > d + .01 || !isFinite(y)){ on = false; continue; }
        path += (on ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(y).toFixed(1); on = true; }
      g += `<path d="${path}" fill="none" stroke="${F.c || '#2EA8C9'}" stroke-width="2.4" stroke-linejoin="round"/>`;
      if(F.t) g += P3.Tx([X(F.tx ?? fin) + (F.dx || 0), Y(F.f(F.tx ?? fin)) + (F.dy || -6)], F.t, F.c || '#2EA8C9', 11, F.ta || 'end'); });
    (o.pts || []).forEach(P => { g += `<circle cx="${X(P.x)}" cy="${Y(P.y)}" r="3" fill="${P.c || '#E35D3A'}"/>` + (P.t ? P3.Tx([X(P.x) + (P.dx ?? 6), Y(P.y) + (P.dy ?? -6)], P.t, P.c || '#E35D3A', 11, 'start') : ''); });
    return P3.svg(W + 8, H, g, o.px || Math.min(W + 8, 300)); },
  // Histogramme : classes = [[début, fin, effectif]] ; o = { u: px par unité, v: px par effectif, gy: graduations, nx, ny, px, couleur }.
  histo: (classes, o) => { o = o || {}; const a = classes[0][0], b = classes[classes.length - 1][1], max = Math.max(...classes.map(k => k[2]));
    const u = o.u || 14, v = o.v || 9, gy = o.gy || 2, top = Math.ceil((max + 1) / gy) * gy, m = 30, W = (b - a) * u + 2 * m, H = top * v + 2 * m;
    const X = x => m + (x - a) * u, Y = y => m + (top - y) * v;
    let g = '';
    for(let y = 0; y <= top; y += gy) g += `<line x1="${X(a)}" y1="${Y(y)}" x2="${X(b)}" y2="${Y(y)}" stroke="#D5E2EE" stroke-width="1"/>` + P3.Tx([X(a) - 5, Y(y) + 4], String(y), '#1F3A5C', 10, 'end');
    classes.forEach(([p, q, e]) => { g += `<rect x="${X(p)}" y="${Y(e)}" width="${(q - p) * u}" height="${e * v}" fill="${o.couleur || '#9CC8E8'}" stroke="#1F3A5C" stroke-width="1.4"/>`; });
    [...new Set(classes.flatMap(k => [k[0], k[1]]))].forEach(x => { g += P3.Tx([X(x), Y(0) + 14], String(x).replace('.', ','), '#1F3A5C', 10); });
    g += `<line x1="${X(a)}" y1="${Y(0)}" x2="${X(b) + 8}" y2="${Y(0)}" stroke="#1F3A5C" stroke-width="1.6"/><line x1="${X(a)}" y1="${Y(0)}" x2="${X(a)}" y2="${Y(top) - 8}" stroke="#1F3A5C" stroke-width="1.6"/>`;
    if(o.nx) g += P3.Tx([X(b), Y(0) + 27], o.nx, '#1F3A5C', 10, 'end');
    if(o.ny) g += P3.Tx([X(a) + 4, Y(top) - 12], o.ny, '#1F3A5C', 10, 'start');
    return P3.svg(W, H + 6, g, o.px || Math.min(W, 300)); },
  // Figure de géométrie : o = { pts: { A: [x, y] }, segs: [['A', 'B', { c, d (pointillés), w }]], noms: ['A', …] ou true,
  // off: { A: [dx, dy] }, cotes: [['A', 'B', 'texte', côté (1 / −1)]], droits: [['A', 'B', 'C']] (angle droit en B),
  // arcs: [['A', 'B', 'C', 'texte', couleur]] (angle en B), poly: [['A', 'B', 'C'], fond], marques: [['A', 'B', n]] (n traits),
  // px, marge }.
  geo: o => { const P = o.pts, m = o.marge ?? 22, xs = Object.values(P).map(p => p[0]), ys = Object.values(P).map(p => p[1]);
    const x0 = Math.min(...xs) - m, y0 = Math.min(...ys) - m, W = Math.max(...xs) - x0 + m, H = Math.max(...ys) - y0 + m;
    const Q = n => [P[n][0] - x0, P[n][1] - y0], G = [xs.reduce((s, v) => s + v, 0) / xs.length - x0, ys.reduce((s, v) => s + v, 0) / ys.length - y0];
    const u = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
    let g = '';
    (o.poly || []).forEach(([l, f]) => { g += `<polygon points="${l.map(n => Q(n).join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="none"/>`; });
    (o.segs || []).forEach(([a, b, s]) => { s = s || {}; g += P3.L(Q(a), Q(b), s.c, s.w || 2, s.d); });
    (o.droits || []).forEach(([a, b, c]) => { const B = Q(b), e = u(B, Q(a)), f = u(B, Q(c)), k = 9;
      g += `<path d="M${B[0] + e[0] * k},${B[1] + e[1] * k} L${B[0] + (e[0] + f[0]) * k},${B[1] + (e[1] + f[1]) * k} L${B[0] + f[0] * k},${B[1] + f[1] * k}" fill="none" stroke="#1F3A5C" stroke-width="1.4"/>`; });
    (o.arcs || []).forEach(([a, b, c, t, col]) => { const B = Q(b), e = u(B, Q(a)), f = u(B, Q(c)), r = 18, p = [B[0] + e[0] * r, B[1] + e[1] * r], q = [B[0] + f[0] * r, B[1] + f[1] * r];
      const cr = e[0] * f[1] - e[1] * f[0], mid = u([0, 0], [e[0] + f[0], e[1] + f[1]]);
      g += `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} A${r},${r} 0 0 ${cr > 0 ? 1 : 0} ${q[0].toFixed(1)},${q[1].toFixed(1)}" fill="none" stroke="${col || '#E35D3A'}" stroke-width="2"/>`;
      if(t) g += P3.Tx([B[0] + mid[0] * (r + 13), B[1] + mid[1] * (r + 13) + 4], t, col || '#E35D3A', 11); });
    (o.marques || []).forEach(([a, b, n]) => { const A = Q(a), B = Q(b), M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], e = u(A, B), nn = [-e[1], e[0]];
      for(let i = 0; i < (n || 1); i++){ const c = [M[0] + e[0] * (i - ((n || 1) - 1) / 2) * 4, M[1] + e[1] * (i - ((n || 1) - 1) / 2) * 4]; g += P3.L([c[0] - nn[0] * 5, c[1] - nn[1] * 5], [c[0] + nn[0] * 5, c[1] + nn[1] * 5], '#1F3A5C', 1.4); } });
    (o.cotes || []).forEach(([a, b, t, cote]) => { const A = Q(a), B = Q(b), e = u(A, B), s = cote || 1, M = [(A[0] + B[0]) / 2 - e[1] * 12 * s, (A[1] + B[1]) / 2 + e[0] * 12 * s + 4]; g += P3.Tx(M, t, '#2E9C6A', 11); });
    const noms = o.noms === true || !o.noms ? Object.keys(P) : o.noms;
    noms.forEach(n => { const p = Q(n), off = (o.off || {})[n], v = u(G, p), d = off ? off : [v[0] * 12, v[1] * 12 + 4];
      g += `<circle cx="${p[0]}" cy="${p[1]}" r="1.8" fill="#1F3A5C"/>` + P3.Tx([p[0] + d[0], p[1] + d[1]], n, '#1F3A5C', 12); });
    return P3.svg(W, H, g, o.px || Math.min(W, 260)); },
};

// Illustrations des problèmes concrets : bibliothèque commune (chapitres/planches-dessins.js).
P3.illu = plIllu;
P3.D = PL_DESSINS;

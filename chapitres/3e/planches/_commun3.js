/* ============================================================
   3e · Outils communs aux planches (Manuel 3e et Objectif Brevet)
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

// Illustrations des problèmes concrets (demandé : « de nombreux problèmes manquent d'illustration (des échelles
// penchées, des toits, etc.) ; il faut parfois illustrer pour ne pas avoir le texte brut »).
// P3.illu(dessin, texte) : le dessin à droite de l'énoncé, le texte s'enroule autour (cartes en demi-largeur).
// P3.D : petits dessins assemblés dans un même SVG (coordonnées SVG, y vers le bas) ; D.fig(w, h, contenu, px).
P3.illu = (fig, texte) => `<div style="display:flow-root;"><span style="float:right;margin:0 0 2px 10px;">${fig}</span>${texte}</div>`;
P3.D = (() => {
  const K = '#1F3A5C', EAU = '#CDEAF6', EAUC = '#2EA8C9', BOIS = '#A0622D', VERT = '#2E9C6A', COTE = '#2E9C6A';
  const f = n => (+n).toFixed(1);
  const ln = (a, b, c, w, d) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
  const poly = (pts, fill, c, w, d) => `<polygon points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="${fill || 'none'}" stroke="${c || K}" stroke-width="${w ?? 1.6}" stroke-linejoin="round"${d ? ' stroke-dasharray="5 4"' : ''}/>`;
  const ell = (cx, cy, rx, ry, o) => { o = o || {};
    if(o.demi){ // moitié avant pleine, moitié arrière en pointillés (bases des solides)
      return `<path d="M${f(cx - rx)},${f(cy)} A${f(rx)},${f(ry)} 0 0 0 ${f(cx + rx)},${f(cy)}" fill="none" stroke="${K}" stroke-width="1.6"/><path d="M${f(cx - rx)},${f(cy)} A${f(rx)},${f(ry)} 0 0 1 ${f(cx + rx)},${f(cy)}" fill="none" stroke="${K}" stroke-width="1.2" stroke-dasharray="4 3"/>`; }
    return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${o.fill || 'none'}" stroke="${o.c || K}" stroke-width="${o.w || 1.6}"/>`; };
  const tx = (p, t, o) => { o = o || {}; return P3.Tx(p, t, o.c || K, o.fs || 11, o.a); };
  const u = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
  const D = {
    fig: (w, h, g, px) => P3.svg(w, h, g, px || w),
    ln, poly, ell, tx,
    // Sol hachuré de x1 à x2, à la hauteur y.
    sol: (x1, x2, y) => { let g = ln([x1, y], [x2, y], K, 1.8); for(let x = x1 + 6; x <= x2; x += 8) g += ln([x, y], [x - 5, y + 5], '#8A93A3', 1); return g; },
    // Mur de briques : rectangle de x à x + w, du sol y jusqu'à y − h.
    mur: (x, y, w, h) => { let g = `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}" fill="#EAD7C0" stroke="${K}" stroke-width="1.4"/>`;
      for(let k = 0, yy = y - 8; yy > y - h; yy -= 8, k++){ g += ln([x, yy], [x + w, yy], '#C9A988', .8);
        for(let xx = x + (k % 2 ? 4 : 9); xx < x + w; xx += 11) g += ln([xx, yy], [xx, yy + 8], '#C9A988', .8); }
      return g; },
    // Échelle du point a (pied) au point b (haut) : deux montants et des barreaux.
    echelle: (a, b) => { const e = u(a, b), n = [-e[1] * 4, e[0] * 4], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let g = ln([a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], BOIS, 2.2) + ln([a[0] - n[0], a[1] - n[1]], [b[0] - n[0], b[1] - n[1]], BOIS, 2.2);
      for(let s = 9; s < L - 3; s += 10){ const p = [a[0] + e[0] * s, a[1] + e[1] * s]; g += ln([p[0] - n[0], p[1] - n[1]], [p[0] + n[0], p[1] + n[1]], BOIS, 1.4); }
      return g; },
    // Arbre posé au sol en (x, y), de hauteur h.
    arbre: (x, y, h) => { const r = h * .3;
      return `<rect x="${f(x - h * .04)}" y="${f(y - h * .5)}" width="${f(h * .08)}" height="${f(h * .5)}" fill="${BOIS}"/>`
        + `<circle cx="${f(x - r * .55)}" cy="${f(y - h + r * 1.45)}" r="${f(r * .75)}" fill="#7CC08F" stroke="${VERT}" stroke-width="1.2"/>`
        + `<circle cx="${f(x + r * .55)}" cy="${f(y - h + r * 1.45)}" r="${f(r * .75)}" fill="#7CC08F" stroke="${VERT}" stroke-width="1.2"/>`
        + `<circle cx="${f(x)}" cy="${f(y - h + r)}" r="${f(r)}" fill="#8DCB9D" stroke="${VERT}" stroke-width="1.2"/>`; },
    // Immeuble de largeur w et de hauteur h, posé en (x, y) (coin bas gauche).
    immeuble: (x, y, w, h) => { let g = `<rect x="${f(x)}" y="${f(y - h)}" width="${f(w)}" height="${f(h)}" fill="#DCE6F0" stroke="${K}" stroke-width="1.4"/>`;
      for(let yy = y - h + 6; yy < y - 12; yy += 12) for(let xx = x + 5; xx + 6 < x + w - 2; xx += 11) g += `<rect x="${f(xx)}" y="${f(yy)}" width="6" height="7" fill="#9CC8E8"/>`;
      return g; },
    // Maison : murs de largeur w et de hauteur hm, toit de hauteur ht (sans débord : le toit va d'un mur à l'autre).
    maison: (x, y, w, hm, ht) => `<rect x="${f(x)}" y="${f(y - hm)}" width="${f(w)}" height="${f(hm)}" fill="#F4E7D3" stroke="${K}" stroke-width="1.4"/>`
      + poly([[x, y - hm], [x + w / 2, y - hm - ht], [x + w, y - hm]], '#F2B8A6', '#B5452A', 1.8)
      + `<rect x="${f(x + w * .42)}" y="${f(y - hm * .62)}" width="${f(w * .16)}" height="${f(hm * .62)}" fill="#C98B5A" stroke="${K}" stroke-width="1"/>`
      + `<rect x="${f(x + w * .12)}" y="${f(y - hm * .75)}" width="${f(w * .16)}" height="${f(hm * .3)}" fill="#9CC8E8" stroke="${K}" stroke-width="1"/>`
      + `<rect x="${f(x + w * .72)}" y="${f(y - hm * .75)}" width="${f(w * .16)}" height="${f(hm * .3)}" fill="#9CC8E8" stroke="${K}" stroke-width="1"/>`,
    soleil: (x, y, r) => { let g = `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#F6C343" stroke="#E9A21C" stroke-width="1.2"/>`;
      for(let k = 0; k < 8; k++){ const a = k * Math.PI / 4; g += ln([x + Math.cos(a) * (r + 3), y + Math.sin(a) * (r + 3)], [x + Math.cos(a) * (r + 7), y + Math.sin(a) * (r + 7)], '#E9A21C', 1.4); }
      return g; },
    // Personnage debout en (x, y) (pieds), de hauteur h ; les yeux sont à y − 0,9 h.
    perso: (x, y, h, c) => { c = c || '#7A4FC0'; const r = h * .1, cou = y - h + 2 * r, hanche = y - h * .45;
      return `<circle cx="${f(x)}" cy="${f(y - h + r)}" r="${f(r)}" fill="#fff" stroke="${c}" stroke-width="1.6"/>` + ln([x, cou], [x, hanche], c, 1.8)
        + ln([x, hanche], [x - h * .14, y], c, 1.8) + ln([x, hanche], [x + h * .14, y], c, 1.8) + ln([x - h * .16, cou + h * .12], [x + h * .16, cou + h * .12], c, 1.8); },
    // Phare : tour rayée de hauteur h, base en (x, y).
    phare: (x, y, h) => { const b = h * .14, s = h * .09; let g = '';
      for(let k = 0; k < 4; k++){ const y1 = y - h * .85 * k / 4, y2 = y - h * .85 * (k + 1) / 4, w1 = b - (b - s) * k / 4, w2 = b - (b - s) * (k + 1) / 4;
        g += poly([[x - w1, y1], [x + w1, y1], [x + w2, y2], [x - w2, y2]], k % 2 ? '#fff' : '#E35D3A', K, 1.2); }
      g += `<rect x="${f(x - s)}" y="${f(y - h)}" width="${f(2 * s)}" height="${f(h * .15)}" fill="#F6C343" stroke="${K}" stroke-width="1.2"/>`;
      return g; },
    bateau: (x, y, s) => poly([[x - s, y - s * .35], [x + s, y - s * .35], [x + s * .7, y], [x - s * .7, y]], '#C98B5A', K, 1.2)
      + ln([x, y - s * .35], [x, y - s * 1.5], K, 1.4) + poly([[x + 1, y - s * 1.45], [x + 1, y - s * .45], [x + s * .8, y - s * .45]], '#fff', K, 1.1),
    vagues: (x1, x2, y) => { let d = `M${x1},${y}`; for(let x = x1; x < x2; x += 12) d += ` q3,-3 6,0 t6,0`; return `<path d="${d}" fill="none" stroke="${EAUC}" stroke-width="1.4"/>`; },
    // Cerf-volant dont le bas du losange est en (x, y).
    cerf: (x, y, s) => poly([[x, y], [x - s * .55, y - s * .8], [x, y - s * 1.5], [x + s * .55, y - s * .8]], '#F6C343', '#E35D3A', 1.4)
      + ln([x, y], [x, y - s * 1.5], '#E35D3A', 1) + `<path d="M${f(x)},${f(y)} q6,8 -2,14 t2,14" fill="none" stroke="#E35D3A" stroke-width="1.2"/>`,
    lampe: (x, y) => `<circle cx="${f(x)}" cy="${f(y)}" r="7" fill="#F6C343" stroke="${K}" stroke-width="1.2"/>` + `<rect x="${f(x - 9)}" y="${f(y - 4)}" width="5" height="8" fill="${K}"/>`,
    // Cône pointe en bas (verre, cornet) : ouverture de rayon r en haut (cx, yh), hauteur h ; eau jusqu'à la fraction k de la hauteur.
    verreCone: (cx, yh, r, h, k) => { const ry = r * .28, A = [cx, yh + h]; let g = '';
      if(k){ const yr = yh + h - h * k, rr = r * k; g += poly([[cx - rr, yr], [cx + rr, yr], A], EAU, 'none', 0) + ell(cx, yr, rr, rr * .28, { fill: EAU, c: EAUC, w: 1.2 }); }
      return g + ln([cx - r, yh], A, K, 1.6) + ln([cx + r, yh], A, K, 1.6) + ell(cx, yh, r, ry); },
    // Cône pointe en haut : base de rayon r centrée en (cx, yb), hauteur h.
    cone: (cx, yb, r, h, fill) => poly([[cx - r, yb], [cx, yb - h], [cx + r, yb]], fill || '#FBE9D7', 'none', 0) + ln([cx - r, yb], [cx, yb - h], K, 1.6) + ln([cx + r, yb], [cx, yb - h], K, 1.6) + ell(cx, yb, r, r * .28, { demi: true }),
    // Cylindre : base de rayon r centrée en (cx, yb), hauteur h ; eau sur une hauteur he.
    cylindre: (cx, yb, r, h, he, fill) => { const ry = r * .28; let g = `<rect x="${f(cx - r)}" y="${f(yb - h)}" width="${f(2 * r)}" height="${f(h)}" fill="${fill || '#F3F6FA'}"/>`;
      if(he){ g += `<rect x="${f(cx - r)}" y="${f(yb - he)}" width="${f(2 * r)}" height="${f(he)}" fill="${EAU}"/>` + ell(cx, yb - he, r, ry, { fill: EAU, c: EAUC, w: 1.2 }); }
      return g + ln([cx - r, yb], [cx - r, yb - h], K, 1.6) + ln([cx + r, yb], [cx + r, yb - h], K, 1.6) + ell(cx, yb, r, ry, { demi: true }) + ell(cx, yb - h, r, ry); },
    // Boule de centre (cx, cy) et de rayon r, avec son équateur.
    boule: (cx, cy, r, fill) => `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill || '#FDE3C8'}" stroke="${K}" stroke-width="1.6"/>` + ell(cx, cy, r, r * .28, { demi: true }),
    // Pavé droit : face avant de x à x + w, du bas y à y − h, profondeur dessinée (dx, −dy) ; eau sur une hauteur he.
    pave: (x, y, w, h, dx, dy, he) => { let g = '';
      if(he) g += poly([[x, y], [x + w, y], [x + w, y - he], [x, y - he]], EAU, 'none', 0) + poly([[x + w, y], [x + w + dx, y - dy], [x + w + dx, y - dy - he], [x + w, y - he]], EAU, 'none', 0) + poly([[x, y - he], [x + w, y - he], [x + w + dx, y - dy - he], [x + dx, y - dy - he]], '#B5DDF0', EAUC, 1);
      g += poly([[x, y], [x + w, y], [x + w, y - h], [x, y - h]], 'none') + poly([[x + w, y], [x + w + dx, y - dy], [x + w + dx, y - dy - h], [x + w, y - h]], 'none') + poly([[x, y - h], [x + w, y - h], [x + w + dx, y - dy - h], [x + dx, y - dy - h]], 'none');
      g += ln([x, y], [x + dx, y - dy], K, 1.1, true) + ln([x + dx, y - dy], [x + w + dx, y - dy], K, 1.1, true) + ln([x + dx, y - dy], [x + dx, y - dy - h], K, 1.1, true);
      return g; },
    // Pyramide à base carrée : base de côté apparent c (profondeur p), sommet à la hauteur h ; renvoie aussi les points.
    pyramide: (cx, yb, c, p, h, fill) => { const A = [cx - c / 2 - p / 2, yb], B = [cx + c / 2 - p / 2, yb], C = [cx + c / 2 + p / 2, yb - p * .6], Dd = [cx - c / 2 + p / 2, yb - p * .6], O = [cx, yb - p * .3], S = [cx, yb - p * .3 - h];
      return poly([A, B, S], fill || '#F6DFA4', K, 1.6) + poly([B, C, S], fill ? fill : '#EBCB7E', K, 1.6) + ln(A, Dd, K, 1.1, true) + ln(Dd, C, K, 1.1, true) + ln(Dd, S, K, 1.1, true) + ln(S, O, '#E35D3A', 1.2, true) + `<circle cx="${f(O[0])}" cy="${f(O[1])}" r="1.8" fill="${K}"/>`; },
    // Roue dentée de centre (cx, cy), de rayon r, avec n dents.
    roue: (cx, cy, r, n, fill) => { let d = ''; for(let k = 0; k < n; k++){ const a0 = 2 * Math.PI * k / n, s = Math.PI / n;
        [[a0 - s * .5, r], [a0 - s * .3, r + 5], [a0 + s * .3, r + 5], [a0 + s * .5, r], [a0 + s * 1.5, r]].forEach(([a, rr], i) => { d += (k === 0 && i === 0 ? 'M' : 'L') + f(cx + rr * Math.cos(a)) + ',' + f(cy + rr * Math.sin(a)); }); }
      return `<path d="${d}Z" fill="${fill || '#DCE6F0'}" stroke="${K}" stroke-width="1.3" stroke-linejoin="round"/><circle cx="${f(cx)}" cy="${f(cy)}" r="3" fill="${K}"/>`; },
    // Arc d'angle au sommet b, entre les directions de a et de c, avec un texte.
    angle: (a, b, c, t, o) => { o = o || {}; const e = u(b, a), g2 = u(b, c), r = o.r || 16, p = [b[0] + e[0] * r, b[1] + e[1] * r], q = [b[0] + g2[0] * r, b[1] + g2[1] * r], cr = e[0] * g2[1] - e[1] * g2[0], m = u([0, 0], [e[0] + g2[0], e[1] + g2[1]]);
      return `<path d="M${f(p[0])},${f(p[1])} A${r},${r} 0 0 ${cr > 0 ? 1 : 0} ${f(q[0])},${f(q[1])}" fill="none" stroke="#E35D3A" stroke-width="1.8"/>` + (t ? tx([b[0] + m[0] * (r + (o.d || 12)) + (o.dx || 0), b[1] + m[1] * (r + (o.d || 12)) + 4 + (o.dy || 0)], t, { c: '#E35D3A', fs: 11 }) : ''); },
    // Angle droit au sommet b.
    droit: (a, b, c) => { const e = u(b, a), g2 = u(b, c), k = 7; return `<path d="M${f(b[0] + e[0] * k)},${f(b[1] + e[1] * k)} L${f(b[0] + (e[0] + g2[0]) * k)},${f(b[1] + (e[1] + g2[1]) * k)} L${f(b[0] + g2[0] * k)},${f(b[1] + g2[1] * k)}" fill="none" stroke="${K}" stroke-width="1.2"/>`; },
    // Cote : flèche double parallèle à [ab], décalée de d (côté gauche de a vers b si d > 0), texte au milieu.
    cote: (a, b, t, d, o) => { o = o || {}; d = d ?? 10; const e = u(a, b), n = [e[1], -e[0]], A = [a[0] + n[0] * d, a[1] + n[1] * d], B = [b[0] + n[0] * d, b[1] + n[1] * d], h = 4;
      const fl = (P, s) => `<path d="M${f(P[0] + s * e[0] * h + n[0] * h * .7)},${f(P[1] + s * e[1] * h + n[1] * h * .7)} L${f(P[0])},${f(P[1])} L${f(P[0] + s * e[0] * h - n[0] * h * .7)},${f(P[1] + s * e[1] * h - n[1] * h * .7)}" fill="none" stroke="${COTE}" stroke-width="1.2"/>`;
      const M = [(A[0] + B[0]) / 2 + n[0] * (o.dt ?? 9) * Math.sign(d || 1) + (o.dx || 0), (A[1] + B[1]) / 2 + n[1] * (o.dt ?? 9) * Math.sign(d || 1) + 4 + (o.dy || 0)];
      return ln(A, B, COTE, 1.1) + fl(A, 1) + fl(B, -1) + (t ? tx(M, t, { c: COTE, fs: o.fs || 11, a: o.a }) : ''); },
    pt: (p, t, d, c) => `<circle cx="${f(p[0])}" cy="${f(p[1])}" r="1.8" fill="${K}"/>` + (t ? tx([p[0] + (d ? d[0] : 0), p[1] + (d ? d[1] : -6)], t, { c: c || K, fs: 12 }) : ''),
  };
  return D;
})();

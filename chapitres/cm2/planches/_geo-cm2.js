/* ============================================================
   CM2 · Planches : outils de dessin communs (géométrie et mesures)
   Quadrillage, points, segments, axes de symétrie, codages, horloge, cubes en perspective.
   ============================================================ */
const CM2G = (() => {
  const K = '#1F3A5C', RO = '#E35D3A', VE = '#2E9C6A', BL = '#2EA8C9', f = n => (+n).toFixed(1);
  const svg = (w, h, g, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${g}</svg>`;
  const L = (a, b, c, w, d) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${c || K}" stroke-width="${w || 1.8}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
  const P = (pts, c, w, fill, ferme) => `<${ferme === false ? 'polyline' : 'polygon'} points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="${fill || 'none'}" stroke="${c || K}" stroke-width="${w || 1.8}" stroke-linejoin="round"/>`;
  const T = (p, t, o) => cmT(p[0], p[1], t, { fs: (o && o.fs) || 12, c: (o && o.c) || K, a: o && o.a });
  // Point marqué d'une croix, avec son nom décalé de d.
  const X = (p, nom, d, c) => L([p[0] - 3.5, p[1] - 3.5], [p[0] + 3.5, p[1] + 3.5], c || K, 1.6) + L([p[0] - 3.5, p[1] + 3.5], [p[0] + 3.5, p[1] - 3.5], c || K, 1.6) + (nom ? T([p[0] + (d ? d[0] : 0), p[1] + (d ? d[1] : -8)], nom, { c: c || K }) : '');
  // Droite passant par a et b, prolongée de part et d'autre.
  const D = (a, b, c, w, k) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), e = (k || 30) / n; return L([a[0] - dx * e, a[1] - dy * e], [b[0] + dx * e, b[1] + dy * e], c, w); };
  // Demi-droite d'origine a passant par b.
  const DD = (a, b, c, w, k) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy), e = (k || 40) / n; return L(a, [b[0] + dx * e, b[1] + dy * e], c, w); };
  // Codage : n petits traits au milieu de [ab].
  const code = (a, b, n, c) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), e = [dx / l, dy / l], q = [-e[1] * 5, e[0] * 5]; let g = '';
    for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2) * 4, p = [m[0] + e[0] * o, m[1] + e[1] * o]; g += L([p[0] - q[0], p[1] - q[1]], [p[0] + q[0], p[1] + q[1]], c || RO, 1.5); } return g; };
  // Angle droit codé au sommet b.
  const droit = (a, b, c, col) => { const u = (p, q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / l, (q[1] - p[1]) / l]; }, e = u(b, a), g = u(b, c), k = 8;
    return `<path d="M${f(b[0] + e[0] * k)},${f(b[1] + e[1] * k)} L${f(b[0] + (e[0] + g[0]) * k)},${f(b[1] + (e[1] + g[1]) * k)} L${f(b[0] + g[0] * k)},${f(b[1] + g[1] * k)}" fill="none" stroke="${col || RO}" stroke-width="1.4"/>`; };
  // Quadrillage de w × h carreaux de k px ; dessin(g) reçoit g(x, y) → coordonnées en px.
  const Q = (w, h, k, dessin, px) => { const g = (x, y) => [1 + x * k, 1 + y * k]; let s = '';
    for(let x = 0; x <= w; x++) s += L(g(x, 0), g(x, h), '#B9C7D6', .8); for(let y = 0; y <= h; y++) s += L(g(0, y), g(w, y), '#B9C7D6', .8);
    return svg(w * k + 2, h * k + 2, s + (dessin ? dessin(g) : ''), px); };
  const AX = (a, b) => L(a, b, RO, 2.4);
  const ligne = (g, pts, c, ferme) => P(pts.map(([x, y]) => g(x, y)), c || K, 2.4, 'none', ferme);
  // Figure sous un nom (dans une grille de cartes).
  const carte = (fig, txt) => `<div style="text-align:center;">${fig}<div style="margin-top:2px;">${txt}</div></div>`;
  // Horloge à aiguilles (h, m) ; t = largeur en px.
  const horloge = (h, m, t) => { let s = '<circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="#1F3A5C" stroke-width="3"/>';
    for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, gr = i % 5 === 0, r1 = gr ? 47 : 51; s += L([60 + r1 * Math.sin(a), 60 - r1 * Math.cos(a)], [60 + 54 * Math.sin(a), 60 - 54 * Math.cos(a)], K, gr ? 2 : .8); }
    for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += `<text x="${f(60 + 38 * Math.sin(a))}" y="${f(60 - 38 * Math.cos(a) + 4)}" font-size="11" text-anchor="middle" fill="${K}" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
    if(h != null){ const am = m * Math.PI / 30, ah = ((h % 12) + m / 60) * Math.PI / 6;
      s += L([60, 60], [60 + 26 * Math.sin(ah), 60 - 26 * Math.cos(ah)], RO, 5) + L([60, 60], [60 + 44 * Math.sin(am), 60 - 44 * Math.cos(am)], BL, 3); }
    return svg(120, 120, s + `<circle cx="60" cy="60" r="3.5" fill="${K}"/>`, t || 110); };
  // Assemblage de cubes en perspective : liste de [x, y, z] (x vers la droite, y vers l'avant, z vers le haut).
  const cubes = (liste, s, px) => { s = s || 22; const c = Math.cos(Math.PI / 6) * s, d = Math.sin(Math.PI / 6) * s;
    const xs = liste.map(([x, y]) => (x - y) * c), ys = liste.map(([x, y, z]) => (x + y) * d - z * s);
    const ox = 4 - Math.min(...xs) + c, oy = 4 - Math.min(...ys) + s, Pp = (x, y, z) => [ox + (x - y) * c, oy + (x + y) * d - z * s];
    const W = Math.max(...xs) - Math.min(...xs) + 2 * c + 8, H = Math.max(...ys) - Math.min(...ys) + 2 * d + s + 8;
    const tri = [...liste].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]); let g = '';
    tri.forEach(([x, y, z]) => { const p = (a, b, cc) => Pp(x + a, y + b, z + cc);
      g += P([p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)], K, 1.2, '#FDE3C8') + P([p(0, 1, 1), p(1, 1, 1), p(1, 1, 0), p(0, 1, 0)], K, 1.2, '#F5B98A') + P([p(1, 0, 1), p(1, 1, 1), p(1, 1, 0), p(1, 0, 0)], K, 1.2, '#E99A5E'); });
    return svg(W, H, g, px); };
  return { K, RO, VE, BL, svg, L, P, T, X, D, DD, code, droit, Q, AX, ligne, carte, horloge, cubes };
})();

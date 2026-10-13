/* ============================================================
   Planches (tous niveaux) · Dessins d'illustration des problèmes concrets
   Demandé : « de nombreux problèmes manquent d'illustration (des échelles penchées, des toits, etc.) ;
   il faut parfois illustrer pour ne pas avoir le texte brut ».
   plIllu(dessin, texte) : le dessin à droite de l'énoncé, le texte s'enroule autour.
   PL_DESSINS (alias P3.D en 3e) : petits dessins assemblés dans un même SVG (y vers le bas) :
   sol, mur, échelle, arbre, immeuble, maison, soleil, personnage, phare, bateau, vagues, cerf-volant,
   lampe, verre conique, cône, cylindre, boule, pavé, pyramide, roue dentée, angle, angle droit, cote.
   ============================================================ */
function plIllu(fig, texte){ return `<div style="display:flow-root;"><span style="float:right;margin:0 0 2px 10px;">${fig}</span>${texte}</div>`; }
const PL_DESSINS = (() => {
  const K = '#1F3A5C', EAU = '#CDEAF6', EAUC = '#2EA8C9', BOIS = '#A0622D', VERT = '#2E9C6A', COTE = '#2E9C6A';
  const f = n => (+n).toFixed(1);
  const ln = (a, b, c, w, d) => `<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
  const poly = (pts, fill, c, w, d) => `<polygon points="${pts.map(p => f(p[0]) + ',' + f(p[1])).join(' ')}" fill="${fill || 'none'}" stroke="${c || K}" stroke-width="${w ?? 1.6}" stroke-linejoin="round"${d ? ' stroke-dasharray="5 4"' : ''}/>`;
  const ell = (cx, cy, rx, ry, o) => { o = o || {};
    if(o.demi){ // moitié avant pleine, moitié arrière en pointillés (bases des solides)
      return `<path d="M${f(cx - rx)},${f(cy)} A${f(rx)},${f(ry)} 0 0 0 ${f(cx + rx)},${f(cy)}" fill="none" stroke="${K}" stroke-width="1.6"/><path d="M${f(cx - rx)},${f(cy)} A${f(rx)},${f(ry)} 0 0 1 ${f(cx + rx)},${f(cy)}" fill="none" stroke="${K}" stroke-width="1.2" stroke-dasharray="4 3"/>`; }
    return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${o.fill || 'none'}" stroke="${o.c || K}" stroke-width="${o.w || 1.6}"/>`; };
  const tx = (p, t, o) => { o = o || {}; return cmT(p[0], p[1], t, { fs: o.fs || 11, c: o.c || K, a: o.a }); };
  const u = (a, b) => { const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; };
  const D = {
    fig: (w, h, g, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${g}</svg>`,
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

/* ============================================================
   CHAPITRE : Représentation de l'espace (5e, G7)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "toujours en 5e" (captures du manuel p. 114-115 : prisme droit et cylindre de
   révolution, patrons, volumes). Titres reformulés, exemples nouveaux. Un petit moteur 3D
   (projection orthographique, faces cachées, arêtes cachées en pointillés, pliage de patron)
   dessine les solides du cours et anime les méthodes : solide qu'on fait tourner, patron de
   prisme qui se plie, patron de cylindre qui s'enroule.
   ============================================================ */

const E5_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const E5_BASE = '#1E7B34', E5_LAT = '#0C5BA0', E5_ENCRE = '#1C1B2E';
const e5Num = v => String(Math.round(v * 100) / 100).replace('.', ',');
function e5Ex(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}

/* ================= Moteur 3D =================
   Points [x, y, z], z vers le haut. Vue : rotation « lacet » (autour de z) puis « tangage »
   (inclinaison), projection orthographique ; la profondeur croît en s'éloignant de l'œil. */
function e5Vue(yaw, pitch){
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  return P => { const x = P[0] * cy - P[1] * sy, y = P[0] * sy + P[1] * cy, z = P[2]; return [x, y * cp - z * sp, y * sp + z * cp]; }; // [écran x, profondeur, écran y]
}
const e5Sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], e5Cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const e5Dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
// Solide convexe : { pts, faces: [{ idx, base }], lisse } ; lisse = faces latérales sans arêtes (cylindre).
function e5Solide(pts, faces, lisse){
  const G = pts.reduce((g, p) => [g[0] + p[0] / pts.length, g[1] + p[1] / pts.length, g[2] + p[2] / pts.length], [0, 0, 0]);
  faces.forEach(f => { // oriente chaque face vers l'extérieur
    const a = pts[f.idx[0]], n = e5Cross(e5Sub(pts[f.idx[1]], a), e5Sub(pts[f.idx[2]], a)), c = f.idx.reduce((s, i) => [s[0] + pts[i][0] / f.idx.length, s[1] + pts[i][1] / f.idx.length, s[2] + pts[i][2] / f.idx.length], [0, 0, 0]);
    if(e5Dot(n, e5Sub(c, G)) < 0) f.idx = f.idx.slice().reverse();
  });
  return { pts, faces, lisse };
}
// Dessin d'un solide : faces visibles colorées, arêtes visibles pleines, arêtes cachées en pointillés.
function e5DessinSolide(S, yaw, pitch, echelle, cx, cy, opts){
  opts = opts || {};
  const V = e5Vue(yaw, pitch), Q = S.pts.map(V), scr = q => [cx + q[0] * echelle, cy - q[2] * echelle];
  const vis = S.faces.map(f => { const a = Q[f.idx[0]], n = e5Cross(e5Sub(Q[f.idx[1]], a), e5Sub(Q[f.idx[2]], a)); return n[1] < -1e-9; });
  const aretes = new Map();
  S.faces.forEach((f, k) => f.idx.forEach((i, m) => { const j = f.idx[(m + 1) % f.idx.length], cle = i < j ? i + '-' + j : j + '-' + i; if(!aretes.has(cle)) aretes.set(cle, { i, j, f: [] }); aretes.get(cle).f.push(k); }));
  let h = '';
  S.faces.forEach((f, k) => { if(vis[k]) h += `<polygon points="${f.idx.map(i => scr(Q[i]).map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${f.base ? E5_BASE : E5_LAT}" fill-opacity="${f.base ? 0.22 : 0.12}" stroke="none"/>`; });
  let cachees = '', vues = '';
  aretes.forEach(a => {
    const nv = a.f.filter(k => vis[k]).length, lat = a.f.every(k => !S.faces[k].base);
    if(S.lisse && lat && nv !== 1) return; // cylindre : seulement les génératrices de contour
    const p = scr(Q[a.i]), q = scr(Q[a.j]), l = `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}"`;
    if(nv) vues += `${l} stroke="${E5_ENCRE}" stroke-width="1.8" stroke-linecap="round"/>`;
    else if(!opts.sansCachees) cachees += `${l} stroke="${E5_ENCRE}" stroke-width="1.1" stroke-dasharray="5 4"/>`;
  });
  return h + cachees + vues;
}
// Projette un point (pour placer des étiquettes).
function e5Point(P, yaw, pitch, echelle, cx, cy){ const q = e5Vue(yaw, pitch)(P); return [cx + q[0] * echelle, cy - q[2] * echelle]; }

/* ---- Solides ---- */
function e5Prisme(poly, h){ // base : polygone dans le plan z = 0
  const n = poly.length, pts = poly.map(p => [p[0], p[1], 0]).concat(poly.map(p => [p[0], p[1], h]));
  const faces = [{ idx: [...Array(n).keys()], base: true }, { idx: [...Array(n).keys()].map(i => i + n), base: true }];
  for(let i = 0; i < n; i++){ const j = (i + 1) % n; faces.push({ idx: [i, j, j + n, i + n] }); }
  return e5Solide(pts, faces, false);
}
const e5Regulier = (n, r, rot) => Array.from({ length: n }, (_, i) => [r * Math.cos(2 * Math.PI * i / n + (rot || 0)), r * Math.sin(2 * Math.PI * i / n + (rot || 0))]);
function e5Cylindre(r, h){ const S = e5Prisme(e5Regulier(48, r), h); S.lisse = true; return S; }
function e5Centrer(S){ // centre le solide sur l'origine (pour tourner autour de son centre)
  const G = S.pts.reduce((g, p) => [g[0] + p[0] / S.pts.length, g[1] + p[1] / S.pts.length, g[2] + p[2] / S.pts.length], [0, 0, 0]);
  S.pts = S.pts.map(p => e5Sub(p, G)); return S;
}
const E5_SOLIDES = {
  tri: { nom: 'Prisme droit à base triangulaire', s: () => e5Centrer(e5Prisme(e5Regulier(3, 1.9, Math.PI / 2), 3.4)), n: 3 },
  pave: { nom: 'Pavé droit (prisme à base rectangulaire)', s: () => e5Centrer(e5Prisme([[-2, -1.3], [2, -1.3], [2, 1.3], [-2, 1.3]], 2.4)), n: 4 },
  penta: { nom: 'Prisme droit à base pentagonale', s: () => e5Centrer(e5Prisme(e5Regulier(5, 1.9, Math.PI / 2), 3)), n: 5 },
  hexa: { nom: 'Prisme droit à base hexagonale', s: () => e5Centrer(e5Prisme(e5Regulier(6, 1.9), 3)), n: 6 },
  cyl: { nom: 'Cylindre de révolution', s: () => e5Centrer(e5Cylindre(1.7, 3.4)), n: 0 },
};

/* ---- Figures du cours (vues fixes) ---- */
// Étiquettes : [point 3D, texte, dx, dy, couleur, rappel] ; rappel = petit trait du point vers le texte.
function e5FigSolide(S, yaw, pitch, etiquettes, vb){
  const e = 38, cx = 150, cy = 115;
  let h = e5DessinSolide(S, yaw, pitch, e, cx, cy);
  (etiquettes || []).forEach(([P, t, dx, dy, c, rappel]) => {
    const q = e5Point(P, yaw, pitch, e, cx, cy), x = q[0] + (dx || 0), y = q[1] + (dy || 0);
    if(rappel) h += `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="2.2" fill="${c}"/><line x1="${q[0].toFixed(1)}" y1="${q[1].toFixed(1)}" x2="${(x - 4).toFixed(1)}" y2="${(y - 4).toFixed(1)}" stroke="${c}" stroke-width="1"/>`;
    h += `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="Inter" font-size="12" fill="${c || '#4E5665'}" text-anchor="${rappel ? 'start' : 'middle'}">${t}</text>`;
  });
  return `<svg viewBox="${vb || '0 0 300 230'}" style="width:100%;max-width:300px;display:block;margin:6px auto;">${h}</svg>`;
}
function e5FigPrismeCours(){
  const S = e5Centrer(e5Prisme(e5Regulier(3, 1.9, Math.PI / 2), 3.2)), y = -1.05, p = 0.42;
  // « face latérale » : au centre de la face latérale la plus tournée vers l'observateur.
  const V = e5Vue(y, p);
  let best = null, dmin = Infinity;
  S.faces.filter(f => !f.base).forEach(f => { const Q = f.idx.map(i => V(S.pts[i])), n = e5Cross(e5Sub(Q[1], Q[0]), e5Sub(Q[2], Q[0])); if(n[1] < dmin){ dmin = n[1]; best = f; } });
  const C = best.idx.reduce((c, i) => [c[0] + S.pts[i][0] / 4, c[1] + S.pts[i][1] / 4, c[2] + S.pts[i][2] / 4], [0, 0, 0]);
  const cote = e5Point(C, y, p, 38, 150, 115)[0] > 150 ? 1 : -1; // texte du côté de la face choisie
  return e5FigSolide(S, y, p, [[[0, 0, 1.6], 'base', 0, 4, E5_BASE], [[0, 0, -1.6], 'base', 0, 44, E5_BASE], [C, 'face latérale', cote > 0 ? 48 : -110, 40, E5_LAT, true]]);
}
function e5FigCylindreCours(){
  const S = e5Centrer(e5Cylindre(1.6, 3.2)), y = -0.3, p = 0.42, e = 38, cx = 150, cy = 115;
  let h = e5DessinSolide(S, y, p, e, cx, cy);
  const O1 = e5Point([0, 0, -1.6], y, p, e, cx, cy), O2 = e5Point([0, 0, 1.6], y, p, e, cx, cy), R2 = e5Point([1.6 * Math.cos(-0.3), 1.6 * Math.sin(-0.3), 1.6], y, p, e, cx, cy);
  h += `<line x1="${O1[0]}" y1="${O1[1]}" x2="${O2[0]}" y2="${O2[1]}" stroke="#C0392B" stroke-width="1.3" stroke-dasharray="6 3"/><circle cx="${O1[0]}" cy="${O1[1]}" r="2.5" fill="${E5_ENCRE}"/><circle cx="${O2[0]}" cy="${O2[1]}" r="2.5" fill="${E5_ENCRE}"/>`
    + `<line x1="${O2[0]}" y1="${O2[1]}" x2="${R2[0].toFixed(1)}" y2="${R2[1].toFixed(1)}" stroke="${E5_ENCRE}" stroke-width="1.3"/>`
    + `<text x="${((O2[0] + R2[0]) / 2).toFixed(1)}" y="${((O2[1] + R2[1]) / 2 - 5).toFixed(1)}" font-family="Space Grotesk" font-size="13" font-style="italic" fill="${E5_ENCRE}" text-anchor="middle">r</text>`
    + `<text x="${O1[0] + 6}" y="${(O1[1] + O2[1]) / 2 + 12}" font-family="Inter" font-size="11.5" fill="#C0392B">axe</text>`
    + `<text x="${O2[0] - 92}" y="${O2[1] - 26}" font-family="Inter" font-size="12" fill="${E5_BASE}">base (disque)</text>`;
  return `<svg viewBox="0 0 300 230" style="width:100%;max-width:300px;display:block;margin:6px auto;">${h}</svg>`;
}

/* ---- Patrons à plat (cours) ---- */
function e5PatronPrisme(){ // prisme à base triangle équilatéral de côté 3 cm, hauteur 4 cm ; 1 cm = 28 px
  const u = 28, a = 3 * u, H = 4 * u, x0 = 30, y0 = 90, hT = a * Math.sqrt(3) / 2;
  let h = '';
  for(let k = 0; k < 3; k++) h += `<rect x="${x0 + k * a}" y="${y0}" width="${a}" height="${H}" fill="${E5_LAT}" fill-opacity=".12" stroke="${E5_ENCRE}" stroke-width="1.6"/>`;
  const xm = x0 + a;
  h += `<polygon points="${xm},${y0} ${xm + a},${y0} ${xm + a / 2},${y0 - hT}" fill="${E5_BASE}" fill-opacity=".22" stroke="${E5_ENCRE}" stroke-width="1.6"/>`
    + `<polygon points="${xm},${y0 + H} ${xm + a},${y0 + H} ${xm + a / 2},${y0 + H + hT}" fill="${E5_BASE}" fill-opacity=".22" stroke="${E5_ENCRE}" stroke-width="1.6"/>`
    + `<text x="${x0 + a / 2}" y="${y0 + H / 2 + 4}" text-anchor="middle" font-family="Inter" font-size="12" fill="#4E5665">4 cm</text>`
    + `<text x="${x0 + a / 2}" y="${y0 - 6}" text-anchor="middle" font-family="Inter" font-size="12" fill="#4E5665">3 cm</text>`
    + `<text x="${xm + a / 2}" y="${y0 - hT / 3 + 4}" text-anchor="middle" font-family="Inter" font-size="11" fill="${E5_BASE}">base</text>`
    + `<text x="${xm + a / 2}" y="${y0 + H + hT / 3 + 8}" text-anchor="middle" font-family="Inter" font-size="11" fill="${E5_BASE}">base</text>`;
  return `<svg viewBox="0 0 320 300" style="width:100%;max-width:320px;display:block;margin:6px auto;">${h}</svg>`;
}
function e5PatronCylindre(){ // rayon 1,5 cm, hauteur 4 cm ; 1 cm = 26 px
  const u = 26, r = 1.5 * u, H = 4 * u, W = 2 * Math.PI * 1.5 * u, x0 = 20, y0 = 2 * r + 12;
  const h = `<rect x="${x0}" y="${y0}" width="${W.toFixed(1)}" height="${H}" fill="${E5_LAT}" fill-opacity=".12" stroke="${E5_ENCRE}" stroke-width="1.6"/>`
    + `<circle cx="${x0 + W / 2}" cy="${y0 - r}" r="${r}" fill="${E5_BASE}" fill-opacity=".22" stroke="${E5_ENCRE}" stroke-width="1.6"/>`
    + `<circle cx="${x0 + W / 2}" cy="${y0 + H + r}" r="${r}" fill="${E5_BASE}" fill-opacity=".22" stroke="${E5_ENCRE}" stroke-width="1.6"/>`
    + `<line x1="${x0 + W / 2}" y1="${y0 - r}" x2="${x0 + W / 2 + r}" y2="${y0 - r}" stroke="${E5_ENCRE}" stroke-width="1.2"/><text x="${x0 + W / 2 + r / 2}" y="${y0 - r - 5}" text-anchor="middle" font-family="Inter" font-size="11" fill="#4E5665">1,5 cm</text>`
    + `<text x="${x0 + 6}" y="${y0 + H / 2 + 4}" font-family="Inter" font-size="12" fill="#4E5665">4 cm</text>`
    + `<text x="${x0 + W - 6}" y="${y0 + H - 8}" text-anchor="end" font-family="Inter" font-size="12" fill="#4E5665">2 × π × 1,5 ≈ 9,42 cm</text>`;
  return `<svg viewBox="0 0 ${(W + 40).toFixed(0)} ${(y0 + H + 2 * r + 12).toFixed(0)}" style="width:100%;max-width:340px;display:block;margin:6px auto;">${h}</svg>`;
}
// Cartes « volume ».
function e5CarteVolume(nom, S, yaw, pitch, formule, couleur){
  return `<div style="border:1px solid #D9DEE6;border-radius:12px;background:#fff;overflow:hidden;display:flex;flex-direction:column;">
    <div style="background:${couleur};color:#fff;font-weight:700;text-align:center;padding:5px;font-family:'Space Grotesk',sans-serif;">${nom}</div>
    <div style="flex:1;padding:2px 8px;"><svg viewBox="0 0 300 230" style="width:100%;max-width:170px;display:block;margin:0 auto;">${e5DessinSolide(S, yaw, pitch, 38, 150, 115)}</svg></div>
    <div style="background:#EAF2FB;text-align:center;padding:8px 6px;">Volume = <span class="tex">${formule}</span></div>
  </div>`;
}

document.getElementById('cours-demo-espace-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Deux familles de solides : prismes droits et cylindres</h3></div>
<span class="def-badge">Définition 1</span>
<div class="def-box">Un <b>prisme droit</b> est un solide dont :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;"><li>les deux <b>bases</b> sont des polygones superposables, situés dans des plans parallèles ;</li><li>les <b>faces latérales</b> sont des rectangles.</li></ul>
</div>
<span class="def-badge">Définition 2</span>
<div class="def-box">Un <b>cylindre de révolution</b> est un solide dont :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;"><li>les deux <b>bases</b> sont des disques superposables, situés dans des plans parallèles ;</li><li>la <b>surface latérale</b> est un rectangle enroulé autour des bases.</li></ul>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;align-items:start;">
  <div>
    <p class="example-title">Exemple 1 : un prisme droit à base triangulaire</p>
    ${e5FigPrismeCours()}
    <ul class="example-list"><li>Ses bases sont des <b>triangles</b> ; il a <b>3 faces latérales</b> (des rectangles de même hauteur : la <b>hauteur</b> du prisme).</li><li>Il a 5 faces, 9 arêtes et 6 sommets. Les arêtes cachées sont dessinées en pointillés.</li></ul>
  </div>
  <div>
    <p class="example-title">Exemple 2 : un cylindre de révolution</p>
    ${e5FigCylindreCours()}
    <ul class="example-list"><li>Ses bases sont des <b>disques</b> de même rayon <i>r</i>.</li><li>La droite qui passe par les centres des deux bases est l'<b>axe</b> du cylindre ; la distance entre ces centres est sa <b>hauteur</b>.</li></ul>
  </div>
</div>
<p style="margin:6px 0;">Le nombre de faces latérales d'un prisme droit est égal au nombre de côtés du polygone de base :</p>
<div style="overflow-x:auto;position:relative;margin:6px 0 16px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.95rem;">
  <tr>${['Base', 'triangle', 'quadrilatère', 'pentagone', 'hexagone', '<i>n</i> côtés'].map((c, j) => `<td style="border:1px solid #C9D6E6;padding:6px 11px;text-align:center;${j ? '' : 'background:#F4F5F8;font-weight:700;'}">${c}</td>`).join('')}</tr>
  ${[['Faces latérales', 3, 4, 5, 6, '<i>n</i>'], ['Faces', 5, 6, 7, 8, '<i>n</i> + 2'], ['Arêtes', 9, 12, 15, 18, '3 × <i>n</i>'], ['Sommets', 6, 8, 10, 12, '2 × <i>n</i>']].map(l => `<tr>${l.map((c, j) => `<td style="border:1px solid #C9D6E6;padding:6px 11px;text-align:center;${j ? '' : 'background:#F4F5F8;font-weight:700;text-align:left;'}">${c}</td>`).join('')}</tr>`).join('')}
</table></div>
<div class="redaction-note" ${E5_REM}>Remarques : un <b>pavé droit</b> (et donc un cube) est un prisme droit particulier : ses bases sont des rectangles. Un cylindre n'est pas un prisme : ses bases ne sont pas des polygones.</div>

<div class="lesson-header"><span class="num">2</span><h3>Fabriquer un solide : les patrons</h3></div>
<p style="margin:4px 0;">Un <b>patron</b> d'un solide est une figure plane qui, après pliage (ou enroulement), permet de fabriquer ce solide sans superposition.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;align-items:start;">
  <div>
    <div class="sub-header"><span class="letter">A</span><h4>Patron d'un prisme droit</h4></div>
    ${e5PatronPrisme()}
    <ul class="example-list"><li>Prisme droit dont la base est un triangle équilatéral de côté 3 cm, et de hauteur 4 cm : <b>deux triangles</b> (les bases) et <b>trois rectangles</b> de 3 cm sur 4 cm (les faces latérales), placés côte à côte.</li></ul>
  </div>
  <div>
    <div class="sub-header"><span class="letter">B</span><h4>Patron d'un cylindre de révolution</h4></div>
    ${e5PatronCylindre()}
    <ul class="example-list"><li>Cylindre de rayon 1,5 cm et de hauteur 4 cm : deux <b>disques</b> de rayon 1,5 cm et un <b>rectangle</b> qui a pour largeur la hauteur (4 cm) et pour longueur le <b>périmètre du disque de base</b> : 2 × π × 1,5 ≈ 9,42 cm.</li></ul>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Calculer un volume</h3></div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:12px;margin:10px 0 16px;">
  ${e5CarteVolume('Cube', e5Centrer(e5Prisme([[-1.5, -1.5], [1.5, -1.5], [1.5, 1.5], [-1.5, 1.5]], 3)), -0.55, 0.42, 'c \\times c \\times c = c^3', '#0C5BA0')}
  ${e5CarteVolume('Pavé droit', e5Centrer(e5Prisme([[-2, -1.2], [2, -1.2], [2, 1.2], [-2, 1.2]], 2.2)), -0.45, 0.42, 'L \\times \\ell \\times h', '#C0392B')}
  ${e5CarteVolume('Prisme droit', e5Centrer(e5Prisme(e5Regulier(5, 1.8, Math.PI / 2), 2.8)), -0.4, 0.42, '\\mathcal{A}_{\\text{base}} \\times h', '#E07B00')}
  ${e5CarteVolume('Cylindre', e5Centrer(e5Cylindre(1.6, 3)), -0.3, 0.42, '\\pi \\times r^2 \\times h', '#1E7B34')}
</div>
<span class="prop-badge">Formule</span>
<div class="def-box">Pour calculer le <b>volume</b> d'un prisme droit ou d'un cylindre de révolution, on multiplie l'<b>aire d'une base</b> par la <b>hauteur</b> : <span class="tex">\\mathcal{V} = \\mathcal{A}_{\\text{base}} \\times h</span>.</div>
${e5Ex('Exemple 1 : le volume d\'un cube d\'arête 5 cm.', [['<span class="tex">\\mathcal{V} = c^3 = 5^3 = 125</span> cm³', 'c × c × c.']])}
${e5Ex('Exemple 2 : le volume d\'un pavé droit de 8 cm sur 5 cm sur 2,5 cm.', [['<span class="tex">\\mathcal{V} = 8 \\times 5 \\times 2{,}5 = 100</span> cm³', 'L × ℓ × h.']])}
${e5Ex('Exemple 3 : une tente a la forme d\'un prisme droit de longueur 3 m ; sa base est un triangle de base 2 m et de hauteur 1,5 m. Quel est son volume ?', [
  ['<span class="tex">\\mathcal{A}_{\\text{base}} = \\dfrac{2 \\times 1{,}5}{2} = 1{,}5</span> m²', 'On calcule l\'aire d\'une base (un triangle).'],
  ['<span class="tex">\\mathcal{V} = 1{,}5 \\times 3 = 4{,}5</span> m³', 'On multiplie par la hauteur du prisme (la longueur de la tente).'],
])}
${e5Ex('Exemple 4 : un bocal cylindrique a un rayon de 4 cm et une hauteur de 10 cm. Quelle est sa contenance ?', [
  ['<span class="tex">\\mathcal{A}_{\\text{base}} = \\pi \\times 4^2 = 16\\pi</span> cm²', 'Aire d\'une base : un disque de rayon 4 cm.'],
  ['<span class="tex">\\mathcal{V} = 16\\pi \\times 10 = 160\\pi \\approx 502{,}65</span> cm³', 'On multiplie par la hauteur.'],
  ['502,65 cm³ ≈ 503 mL, soit environ 50 cL.', 'Car 1 cm³ = 1 mL (et 1 dm³ = 1 L).'],
])}
`;

document.getElementById('histoire-demo-espace-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le savant grec <b>Archimède</b> (3e siècle av. J.-C.) était si fier d'avoir démontré que le volume d'une boule vaut exactement les deux tiers de celui du cylindre dans lequel elle s'emboîte qu'il avait demandé que ce dessin soit gravé sur sa tombe. Plus d'un siècle plus tard, l'orateur romain <b>Cicéron</b> raconte avoir retrouvé cette tombe, envahie par les ronces, grâce à la sphère et au cylindre sculptés dessus. Quant à la <b>perspective cavalière</b>, utilisée pour dessiner les solides au collège, elle doit son nom au « cavalier », une butte de terre des fortifications d'où l'on voyait le terrain de haut et de biais.
</div>
`;

document.getElementById('methode-demo-espace-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : observer un solide sous tous les angles</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites tourner le solide en le faisant glisser (souris ou doigt). Les arêtes cachées sont en pointillés.</p>
  <div style="text-align:center;margin:6px 0;"><select id="e5-choix" onchange="e5VueChoix()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font:inherit;max-width:100%;">${Object.entries(E5_SOLIDES).map(([k, v]) => `<option value="${k}">${v.nom}</option>`).join('')}</select></div>
  <svg id="e5-vueSvg" viewBox="0 0 300 250" style="width:100%;max-width:380px;display:block;margin:6px auto;touch-action:none;cursor:grab;background:#fff;border-radius:10px;border:1px solid #E4E7EC;"></svg>
  <div id="e5-vueInfo" style="text-align:center;line-height:1.8;"></div>
  <div class="figure-toolbar"><button class="btn" id="e5-auto" onclick="e5Auto()">▶ Rotation automatique</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : plier le patron d'un prisme droit</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Le patron (3 rectangles et 2 triangles) se plie pour former le prisme. Utilisez le curseur, ou les boutons.</p>
  <svg id="e5-pliSvg" viewBox="0 0 300 250" style="width:100%;max-width:380px;display:block;margin:6px auto;background:#fff;border-radius:10px;border:1px solid #E4E7EC;"></svg>
  <div style="display:flex;gap:10px;align-items:center;justify-content:center;"><span>à plat</span><input id="e5-pli" type="range" min="0" max="100" value="0" oninput="e5Plier()"><span>plié</span></div>
  <div class="figure-toolbar"><button class="btn" onclick="e5PliAnimer(1)">Plier</button><button class="btn secondary" onclick="e5PliAnimer(0)">Déplier</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : enrouler le patron d'un cylindre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Le rectangle s'enroule : sa longueur devient le périmètre des disques de base.</p>
  <svg id="e5-roulSvg" viewBox="0 0 300 250" style="width:100%;max-width:380px;display:block;margin:6px auto;background:#fff;border-radius:10px;border:1px solid #E4E7EC;"></svg>
  <div id="e5-roulNote" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div style="display:flex;gap:10px;align-items:center;justify-content:center;"><span>à plat</span><input id="e5-roul" type="range" min="0" max="100" value="0" oninput="e5Rouler()"><span>enroulé</span></div>
  <div class="figure-toolbar"><button class="btn" onclick="e5RoulAnimer(1)">Enrouler</button><button class="btn secondary" onclick="e5RoulAnimer(0)">Dérouler</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer le volume d'un prisme droit</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent 6 cm et 8 cm ; sa hauteur est 10 cm. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="e5-volDisplay"></div>
  <div class="figure-toolbar"><button class="btn" onclick="e5VolDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="e5VolDemo.reset()">Recommencer</button></div>
</div>
`;

function e5Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="e5-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="e5-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-espace-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer la contenance d'un cylindre »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\mathcal{A}_{\\text{base}} = \\pi \\times 5^2 = 25\\pi</span> cm²</span><span class="we-comment">1. Aire d'une base (disque de rayon 5 cm).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\mathcal{V} = 25\\pi \\times 20 = 500\\pi \\approx 1\\,570{,}80</span> cm³</span><span class="we-comment">2. On multiplie par la hauteur (20 cm).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">1 570,80 cm³ ≈ 1,57 L</span><span class="we-comment">3. 1 000 cm³ = 1 dm³ = 1 L.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${e5Exo(1, 'Un prisme droit a pour bases des pentagones. Combien a-t-il de faces latérales ? de faces ? d\'arêtes ? de sommets ?', [
    '5 faces latérales, 7 faces, 15 arêtes et 10 sommets.'])}
  ${e5Exo(2, 'Un cube est-il un prisme droit ? Et un cylindre ? Justifie.', [
    'Un cube est un prisme droit : ses bases sont des carrés superposables et ses faces latérales des rectangles (des carrés).', 'Un cylindre n\'est pas un prisme : ses bases sont des disques, pas des polygones.'])}
  ${e5Exo(3, 'On veut construire le patron d\'un cylindre de rayon 2 cm et de hauteur 5 cm. Quelles sont les dimensions du rectangle ?', [
    'Largeur : la hauteur, 5 cm.', 'Longueur : le périmètre de la base, 2 × π × 2 = 4π ≈ 12,57 cm.'])}
  ${e5Exo(4, 'Calcule le volume d\'un cube d\'arête 4 cm, puis celui d\'un pavé droit de 12 cm sur 5 cm sur 3 cm.', [
    'Cube : 4 × 4 × 4 = 64 cm³', 'Pavé : 12 × 5 × 3 = 180 cm³'])}
  ${e5Exo(5, 'Un prisme droit a pour base un triangle rectangle dont les côtés de l\'angle droit mesurent 6 cm et 8 cm. Sa hauteur est 10 cm. Calcule son volume.', [
    'Aire de la base : (6 × 8) ÷ 2 = 24 cm²', 'Volume : 24 × 10 = 240 cm³'])}
  ${e5Exo(6, 'Une boîte de conserve cylindrique a un rayon de 5 cm et une hauteur de 20 cm. Calcule son volume, puis sa contenance en litres.', [
    'V = π × 5² × 20 = 500π ≈ 1 570,80 cm³', 'Soit environ 1,57 L.'])}
  ${e5Exo(7, 'Un aquarium a la forme d\'un pavé droit de 60 cm sur 30 cm sur 40 cm. Combien de litres d\'eau peut-il contenir ?', [
    '60 × 30 × 40 = 72 000 cm³', '72 000 cm³ = 72 dm³ = 72 L'])}
  ${e5Exo(8, 'Deux prismes droits ont des bases de même aire, 15 cm². Le premier a une hauteur de 4 cm, le second de 8 cm. Compare leurs volumes.', [
    'V₁ = 15 × 4 = 60 cm³ et V₂ = 15 × 8 = 120 cm³.', 'En doublant la hauteur, on double le volume.'])}
</div>
`;

/* ---- Méthode 1 : solide qu'on fait tourner ---- */
let e5Yaw = -0.6, e5Pitch = 0.42, e5Courant = null, e5AutoRaf = null;
function e5VueDessin(){
  const svg = document.getElementById('e5-vueSvg'); if(!svg || !e5Courant) return;
  svg.innerHTML = e5DessinSolide(e5Courant, e5Yaw, e5Pitch, 36, 150, 125);
}
function e5VueChoix(){
  const k = document.getElementById('e5-choix').value, d = E5_SOLIDES[k];
  e5Courant = d.s(); e5VueDessin();
  const info = document.getElementById('e5-vueInfo');
  info.innerHTML = d.n ? `Bases : 2 polygones à ${d.n} côtés · faces latérales : <b>${d.n}</b> · faces : <b>${d.n + 2}</b> · arêtes : <b>${3 * d.n}</b> · sommets : <b>${2 * d.n}</b>`
    : 'Bases : 2 disques · surface latérale : un rectangle enroulé · pas d\'arête latérale ni de sommet.';
}
function e5Auto(){
  const b = document.getElementById('e5-auto');
  if(e5AutoRaf){ cancelAnimationFrame(e5AutoRaf); e5AutoRaf = null; b.textContent = '▶ Rotation automatique'; return; }
  b.textContent = '⏸ Arrêter';
  let t0 = null;
  const f = now => { if(t0 !== null) e5Yaw += (now - t0) / 1600; t0 = now; e5VueDessin(); if(document.getElementById('e5-vueSvg').isConnected) e5AutoRaf = requestAnimationFrame(f); };
  e5AutoRaf = requestAnimationFrame(f);
}
(function e5Glisser(){
  let dep = null;
  document.addEventListener('pointerdown', e => { const s = e.target.closest && e.target.closest('#e5-vueSvg'); if(!s) return; dep = [e.clientX, e.clientY, e5Yaw, e5Pitch]; s.setPointerCapture && s.setPointerCapture(e.pointerId); s.style.cursor = 'grabbing'; });
  document.addEventListener('pointermove', e => { if(!dep) return; e5Yaw = dep[2] + (e.clientX - dep[0]) / 90; e5Pitch = Math.max(-1.2, Math.min(1.2, dep[3] + (e.clientY - dep[1]) / 90)); e5VueDessin(); });
  document.addEventListener('pointerup', () => { if(!dep) return; dep = null; const s = document.getElementById('e5-vueSvg'); if(s) s.style.cursor = 'grab'; });
})();

/* ---- Rendu d'un ensemble de polygones 3D (patrons en mouvement) : tri par profondeur ---- */
function e5DessinPolys(polys, yaw, pitch, echelle, cx, cy){
  const V = e5Vue(yaw, pitch);
  return polys.map(p => { const Q = p.pts.map(V); return { p, Q, d: Q.reduce((s, q) => s + q[1], 0) / Q.length }; })
    .sort((a, b) => b.d - a.d)
    .map(({ p, Q }) => `<polygon points="${Q.map(q => (cx + q[0] * echelle).toFixed(1) + ',' + (cy - q[2] * echelle).toFixed(1)).join(' ')}" fill="${p.c}" fill-opacity="${p.o || 0.55}" stroke="${p.bord === false ? p.c : E5_ENCRE}"${p.bord === false ? ` stroke-opacity="${p.o || 0.55}"` : ''} stroke-width="${p.bord === false ? 0.8 : (p.w || 1.4)}" stroke-linejoin="round"/>`).join(''); // bandes sans bord : trait de même couleur (pas de liseré entre bandes)
}
// Rotation d'un point autour d'un axe (point O, direction unitaire u) d'un angle a (Rodrigues).
function e5Rot(P, O, u, a){
  const v = e5Sub(P, O), c = Math.cos(a), s = Math.sin(a), k = e5Dot(u, v), w = e5Cross(u, v);
  return [O[0] + v[0] * c + w[0] * s + u[0] * k * (1 - c), O[1] + v[1] * c + w[1] * s + u[1] * k * (1 - c), O[2] + v[2] * c + w[2] * s + u[2] * k * (1 - c)];
}

/* ---- Méthode 2 : pliage du patron d'un prisme (base triangle équilatéral de côté a, hauteur H) ---- */
function e5PliPolys(t){
  const a = 2, H = 2.6, hT = a * Math.sqrt(3) / 2, th = 2 * Math.PI / 3 * t, ps = Math.PI / 2 * t, Z = [0, 0, 1], X = [1, 0, 0];
  // Rectangle du milieu fixe dans le plan y = 0 : x de 0 à a, z de 0 à H.
  const mil = [[0, 0, 0], [a, 0, 0], [a, 0, H], [0, 0, H]];
  const gauche = [[-a, 0, 0], [0, 0, 0], [0, 0, H], [-a, 0, H]].map(P => e5Rot(P, [0, 0, 0], Z, -th));
  const droite = [[a, 0, 0], [2 * a, 0, 0], [2 * a, 0, H], [a, 0, H]].map(P => e5Rot(P, [a, 0, 0], Z, th));
  const haut = [[0, 0, H], [a, 0, H], [a / 2, 0, H + hT]].map(P => e5Rot(P, [0, 0, H], X, -ps));
  const bas = [[0, 0, 0], [a, 0, 0], [a / 2, 0, -hT]].map(P => e5Rot(P, [0, 0, 0], X, ps));
  const G = [a / 2, a * Math.sqrt(3) / 6 * t, H / 2];
  const centre = pts => pts.map(P => e5Sub(P, G));
  return [{ pts: centre(mil), c: E5_LAT }, { pts: centre(gauche), c: E5_LAT }, { pts: centre(droite), c: E5_LAT }, { pts: centre(haut), c: E5_BASE }, { pts: centre(bas), c: E5_BASE }];
}
let e5PliRaf = null, e5RoulRaf = null;
function e5Plier(){ const t = Number(document.getElementById('e5-pli').value) / 100; document.getElementById('e5-pliSvg').innerHTML = e5DessinPolys(e5PliPolys(t), -0.55 - 0.35 * t, 0.2 + 0.25 * t, 36, 150, 125); }
function e5PliAnimer(cible){
  cancelAnimationFrame(e5PliRaf);
  const r = document.getElementById('e5-pli'), d = Number(r.value) / 100, t0 = performance.now();
  const f = now => { const k = Math.max(0, Math.min(1, (now - t0) / 1800)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; r.value = Math.round((d + (cible - d) * e) * 100); e5Plier(); if(k < 1) e5PliRaf = requestAnimationFrame(f); };
  e5PliRaf = requestAnimationFrame(f);
}

/* ---- Méthode 3 : enroulement du patron d'un cylindre (rayon R, hauteur H) ---- */
function e5RoulPolys(t){
  const R = 1, H = 2.4, W = 2 * Math.PI * R, N = 40, polys = [], c = t / R, ps = Math.PI / 2 * t, X = [1, 0, 0];
  const pos = s => c < 1e-6 ? [s, 0] : [Math.sin(c * s) / c, (1 - Math.cos(c * s)) / c];
  const G = [0, t > 0 ? R * Math.min(1, t) : 0, H / 2];
  for(let k = 0; k < N; k++){
    const s0 = -W / 2 + W * k / N, s1 = s0 + W / N, [x0, y0] = pos(s0), [x1, y1] = pos(s1);
    polys.push({ pts: [[x0, y0, 0], [x1, y1, 0], [x1, y1, H], [x0, y0, H]].map(P => e5Sub(P, G)), c: E5_LAT, o: 0.5, bord: false });
  }
  // Les deux disques de base, rattachés au milieu des bords du rectangle, pivotent pour venir fermer le cylindre.
  const disque = (zc, sens) => Array.from({ length: 40 }, (_, i) => { const a = 2 * Math.PI * i / 40; return [R * Math.cos(a), 0, zc + sens * R + R * Math.sin(a)]; });
  const haut = disque(H, 1).map(P => e5Rot(P, [0, 0, H], X, -ps)), bas = disque(0, -1).map(P => e5Rot(P, [0, 0, 0], X, ps));
  polys.push({ pts: haut.map(P => e5Sub(P, G)), c: E5_BASE, o: 0.5, w: 1.2 }, { pts: bas.map(P => e5Sub(P, G)), c: E5_BASE, o: 0.5, w: 1.2 });
  return polys;
}
// Contour du rectangle enroulé (bords haut et bas, et les deux côtés), dessiné par-dessus.
function e5RoulContour(t, yaw, pitch, echelle, cx, cy){
  const R = 1, H = 2.4, W = 2 * Math.PI * R, c = t / R, V = e5Vue(yaw, pitch), G = [0, t > 0 ? R * Math.min(1, t) : 0, H / 2];
  const pos = s => c < 1e-6 ? [s, 0] : [Math.sin(c * s) / c, (1 - Math.cos(c * s)) / c];
  const pr = P => { const q = V(e5Sub(P, G)); return (cx + q[0] * echelle).toFixed(1) + ',' + (cy - q[2] * echelle).toFixed(1); };
  const bord = z => Array.from({ length: 61 }, (_, k) => { const [x, y] = pos(-W / 2 + W * k / 60); return pr([x, y, z]); }).join(' ');
  const [xa, ya] = pos(-W / 2), [xb, yb] = pos(W / 2);
  return `<polyline points="${bord(0)}" fill="none" stroke="${E5_ENCRE}" stroke-width="1.4"/><polyline points="${bord(H)}" fill="none" stroke="${E5_ENCRE}" stroke-width="1.4"/>`
    + `<polyline points="${pr([xa, ya, 0])} ${pr([xa, ya, H])}" fill="none" stroke="${E5_ENCRE}" stroke-width="1.4"/><polyline points="${pr([xb, yb, 0])} ${pr([xb, yb, H])}" fill="none" stroke="${E5_ENCRE}" stroke-width="1.4"/>`;
}
function e5Rouler(){
  const t = Number(document.getElementById('e5-roul').value) / 100, yaw = -0.35 - 0.25 * t, pitch = 0.18 + 0.3 * t, ech = 30 + 22 * t; // on se rapproche en enroulant
  document.getElementById('e5-roulSvg').innerHTML = e5DessinPolys(e5RoulPolys(t), yaw, pitch, ech, 150, 125) + e5RoulContour(t, yaw, pitch, ech, 150, 125);
  document.getElementById('e5-roulNote').textContent = t < 0.05 ? 'La longueur du rectangle est égale au périmètre des disques : 2 × π × r.' : t > 0.97 ? 'Le rectangle fait exactement le tour des disques : c\'est un cylindre.' : 'Le rectangle s\'enroule…';
}
function e5RoulAnimer(cible){
  cancelAnimationFrame(e5RoulRaf);
  const r = document.getElementById('e5-roul'), d = Number(r.value) / 100, t0 = performance.now();
  const f = now => { const k = Math.max(0, Math.min(1, (now - t0) / 1800)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; r.value = Math.round((d + (cible - d) * e) * 100); e5Rouler(); if(k < 1) e5RoulRaf = requestAnimationFrame(f); };
  e5RoulRaf = requestAnimationFrame(f);
}

/* ---- Méthode 4 : volume d'un prisme droit ---- */
const E5_VOL_STEPS = [
  { expr: '<span class="tex">\\mathcal{V} = \\mathcal{A}_{\\text{base}} \\times h</span>', note: 'On écrit la formule du volume d\'un prisme droit.' },
  { expr: '<span class="tex">\\mathcal{A}_{\\text{base}} = \\dfrac{6 \\times 8}{2} = 24</span> cm²', note: 'La base est un triangle rectangle : (côté × côté) ÷ 2.' },
  { expr: '<span class="tex">\\mathcal{V} = 24 \\times 10</span>', note: 'On multiplie par la hauteur du prisme : 10 cm.' },
  { expr: '<span class="tex">\\mathcal{V} = 240</span> cm³', note: 'Le volume s\'exprime en unités de volume : ici des cm³ (soit 240 mL).' },
];
const e5VolDemo = makeStepDemo(E5_VOL_STEPS, 'e5-volDisplay');

DEMO_REGISTRY["5e|Représentation de l'espace"] = {
  cours: 'cours-demo-espace-5e', methode: 'methode-demo-espace-5e', exos: 'exos-demo-espace-5e', histoire: 'histoire-demo-espace-5e',
  init: () => {
    e5VueChoix(); e5Plier(); e5Rouler(); e5VolDemo.reset();
    ['cours-demo-espace-5e', 'exos-demo-espace-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-espace-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-espace-5e'));
  }
};

DEMO_QUIZZES["5e|Représentation de l'espace"] = [
  { q: 'Les faces latérales d\'un prisme droit sont des...', opts: ['triangles', 'rectangles', 'disques'], correct: 1 },
  { q: 'Un prisme droit à base hexagonale a combien de faces latérales ?', opts: ['6', '8', '12'], correct: 0 },
  { q: 'Les bases d\'un cylindre de révolution sont des...', opts: ['rectangles', 'disques', 'triangles'], correct: 1 },
  { q: 'Dans le patron d\'un cylindre, la longueur du rectangle est égale...', opts: ['au rayon', 'au périmètre de la base', 'à la hauteur'], correct: 1 },
  { q: 'Le volume d\'un cube d\'arête 3 cm est...', opts: ['9 cm³', '27 cm³', '12 cm³'], correct: 1 },
  { q: 'Le volume d\'un prisme droit se calcule avec...', opts: ['aire de la base × hauteur', 'périmètre × hauteur', 'aire de la base ÷ 2'], correct: 0 },
  { q: '1 L est égal à...', opts: ['1 cm³', '1 dm³', '1 m³'], correct: 1 },
];

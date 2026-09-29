/* ============================================================
   CHAPITRE : Espace (3e, G5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 76-77) : plan du manuel (sphère et boule : définitions, section
   par un plan ; repérage sur une sphère : parallèles, méridiens, latitude et longitude ; volume :
   volume de la boule, agrandissement et réduction), titres reformulés, exemples nouveaux (différents
   du manuel et du chapitre Espace de 4e).
   Méthode animée : section d'une sphère par un plan réglable (rayon de la section par Pythagore), un
   globe où l'on place un point par sa latitude et sa longitude (avec quelques villes), le volume d'une
   boule pas à pas, un cube agrandi ou réduit (longueurs × k, aires × k², volumes × k³).
   Figures dessinées en perspective orthographique : les parties cachées sont en pointillés.
   Réutilise ro3Croix / ro3Trait (chapitres/3e/G3-rotation.js), r4Ex / r4Colonne / R4_REM (chargés avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const ES3_BLEU = '#0C5BA0', ES3_VERT = '#1E7B34', ES3_ROUGE = '#C0392B', ES3_ORANGE = '#E07B00', ES3_VIOLET = '#7A3E9D', ES3_ROSE = '#C2185B', ES3_ENCRE = '#1C1B2E';
const es3Tex = s => `<span class="tex"${s.length < 34 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const es3N = (v, d) => { const p = Math.pow(10, d == null ? 1 : d); return String(Math.round(v * p) / p).replace('.', ','); };
const es3T = (v, d) => es3N(v, d).replace(',', '{,}');
const es3Lab = (x, y, t, c, o) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${(o && o.a) || 'middle'}" font-size="${(o && o.s) || 13}" font-weight="700" fill="${c || ES3_ENCRE}"${o && o.it ? ' font-style="italic"' : ''}>${t}</text>`;
const es3Seg = (A, B, c, w, pointille) => `<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="${c || ES3_ENCRE}" stroke-width="${w || 1.6}"${pointille ? ' stroke-dasharray="4 3"' : ''}/>`;

// Projection orthographique : azimut az et élévation el (en degrés) ; z vertical.
function es3Proj(cx, cy, az, el){
  const a = az * Math.PI / 180, e = el * Math.PI / 180;
  return {
    P: ([x, y, z]) => { const x1 = x * Math.cos(a) - y * Math.sin(a), y1 = x * Math.sin(a) + y * Math.cos(a); return [cx + x1, cy - (z * Math.cos(e) + y1 * Math.sin(e))]; },
    vis: ([x, y, z]) => { const y1 = x * Math.sin(a) + y * Math.cos(a); return -y1 * Math.cos(e) + z * Math.sin(e) > 1e-6; },
    O: [cx, cy],
  };
}
// Courbe fermée tracée sur la sphère : parties visibles en trait plein, parties cachées en pointillés.
function es3Courbe(S, f, c, w, toujours){
  let h = '', run = [], v0 = null;
  const trace = (r, v) => r.length > 1 ? `<path d="M${r.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L')}" fill="none" stroke="${c}" stroke-width="${w}"${v ? '' : ' stroke-dasharray="4 3" opacity=".7"'}/>` : '';
  for(let i = 0; i <= 144; i++){ const p = f(i / 144 * 2 * Math.PI), v = toujours || S.vis(p);
    if(v !== v0 && run.length){ h += trace(run, v0); run = [run[run.length - 1]]; } run.push(S.P(p)); v0 = v; }
  return h + trace(run, v0);
}
const es3Contour = (O, R) => `<circle cx="${O[0]}" cy="${O[1]}" r="${R}" fill="rgba(12,91,160,.06)" stroke="${ES3_ENCRE}" stroke-width="2"/>`;
function es3Droit(H, A, B, t){ // marque d'angle droit en H entre HA et HB
  const u = [A[0] - H[0], A[1] - H[1]], v = [B[0] - H[0], B[1] - H[1]], lu = Math.hypot(...u), lv = Math.hypot(...v); t = t || 8;
  const p = (k, l) => [H[0] + u[0] / lu * t * k + v[0] / lv * t * l, H[1] + u[1] / lu * t * k + v[1] / lv * t * l];
  return `<path d="M${p(1, 0).join(',')} L${p(1, 1).join(',')} L${p(0, 1).join(',')}" fill="none" stroke="${ES3_ENCRE}" stroke-width="1.2"/>`;
}
// Trait perpendiculaire au segment [A B] au point P (point d'une ligne).
const es3Trait = (P, A, B, c) => ro3Trait(P, [-(B[1] - A[1]), B[0] - A[0]], c);

// Figure du cours : sphère, diamètre [EF], grand cercle incliné, rayon [OP].
function es3FigSphere(){
  const R = 100, S = es3Proj(150, 125, -20, 18), O = S.O, b = 35 * Math.PI / 180;
  const pol = d => [O[0] + R * Math.cos(d * Math.PI / 180), O[1] - R * Math.sin(d * Math.PI / 180)];
  const E = pol(155), F = pol(-25), P = pol(60);
  let h = es3Contour(O, R);
  h += es3Courbe(S, t => [R * Math.cos(t), R * Math.sin(t), 0], '#9AA3AE', 1.2);
  h += es3Courbe(S, t => [R * Math.cos(t), R * Math.sin(t) * Math.cos(b), R * Math.sin(t) * Math.sin(b)], ES3_VERT, 2.4);
  h += es3Seg(E, F, ES3_BLEU, 2) + es3Trait(E, E, F, ES3_BLEU) + es3Trait(F, E, F, ES3_BLEU) + es3Seg(O, P, ES3_ORANGE, 2) + es3Trait(P, O, P, ES3_ORANGE);
  h += ro3Croix(O, ES3_ENCRE) + es3Lab(O[0] + 4, O[1] + 18, 'O') + es3Lab(E[0] - 12, E[1] - 2, 'E', ES3_BLEU) + es3Lab(F[0] + 12, F[1] + 10, 'F', ES3_BLEU)
    + es3Lab(P[0] + 10, P[1] - 4, 'P', ES3_ORANGE) + es3Lab((O[0] + P[0]) / 2 + 10, (O[1] + P[1]) / 2 + 4, 'r', ES3_ORANGE, { it: 1 })
    + es3Lab(O[0] + 30, O[1] + R + 18, 'grand cercle', ES3_VERT, { a: 'start', s: 12 });
  return `<svg viewBox="0 0 290 260" style="width:100%;max-width:290px;display:block;margin:8px auto;">${h}</svg>`;
}
// Section d'une sphère de rayon R (px) par un plan à la distance d (px) du centre.
function es3FigSection(R, d, o){
  o = o || {};
  const S = es3Proj(o.cx || 190, o.cy || 150, -25, 20), O = S.O, rho = Math.sqrt(Math.max(0, R * R - d * d));
  const coin = (x, y) => S.P([x * R, y * R, d]);
  let h = `<polygon points="${[coin(-1.6, -1.05), coin(1.6, -1.05), coin(1.6, 1.05), coin(-1.6, 1.05)].map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="rgba(122,62,157,.16)" stroke="${ES3_VIOLET}" stroke-width="1.2"/>`;
  h += es3Contour(O, R) + es3Courbe(S, t => [R * Math.cos(t), R * Math.sin(t), 0], '#9AA3AE', 1.1);
  const H = S.P([0, 0, d]), tN = -15 * Math.PI / 180, N = S.P([rho * Math.cos(tN), rho * Math.sin(tN), d]);
  if(rho > 0.5){
    h += `<path d="M${Array.from({ length: 73 }, (_, i) => S.P([rho * Math.cos(i / 72 * 2 * Math.PI), rho * Math.sin(i / 72 * 2 * Math.PI), d]).map(v => v.toFixed(1)).join(',')).join(' L')}Z" fill="rgba(194,24,91,.2)" stroke="none"/>`;
    h += es3Courbe(S, t => [rho * Math.cos(t), rho * Math.sin(t), d], ES3_ROSE, 2.4);
  }
  h += es3Seg(O, H, ES3_ENCRE, 1.4, true);
  if(rho > 0.5) h += es3Seg(H, N, ES3_ROSE, 2.2) + es3Seg(O, N, ES3_BLEU, 2.2) + (d > 2 ? es3Droit(H, O, N) : '') + es3Trait(N, H, N, ES3_ROSE) + es3Lab(N[0] + 12, N[1] + 12, o.N || 'N', ES3_ROSE);
  h += ro3Croix(O, ES3_ENCRE) + es3Lab(O[0] - 12, O[1] + 5, 'O');
  if(d > 2) h += ro3Croix(H, ES3_ENCRE) + es3Lab(H[0] - 12, H[1] - 5, o.H || 'H');
  if(o.legende && rho > 0.5) h += es3Lab(O[0] + R + 34, O[1] - R + 10, 'rayon de la section', ES3_ROSE, { a: 'start', s: 11 }) + es3Lab(O[0] + R + 34, O[1] + 60, 'rayon de la sphère', ES3_BLEU, { a: 'start', s: 11 })
    + es3Seg([(H[0] + N[0]) / 2, (H[1] + N[1]) / 2], [O[0] + R + 30, O[1] - R + 6], ES3_ROSE, 0.8) + es3Seg([(O[0] + N[0]) / 2, (O[1] + N[1]) / 2], [O[0] + R + 30, O[1] + 56], ES3_BLEU, 0.8);
  return h;
}

// Globe en projection orthographique vu depuis la latitude phi0 et la longitude lam0 (degrés).
function es3Globe(o){
  const R = o.R || 110, cx = o.cx || 150, cy = o.cy || 140, f0 = (o.phi0 || 0) * Math.PI / 180, l0 = o.lam0 || 0;
  const G = (lat, lon) => { const p = lat * Math.PI / 180, l = (lon - l0) * Math.PI / 180, x = Math.cos(p) * Math.sin(l), y = Math.sin(p), z = Math.cos(p) * Math.cos(l);
    return { X: cx + R * x, Y: cy - R * (y * Math.cos(f0) - z * Math.sin(f0)), v: y * Math.sin(f0) + z * Math.cos(f0) }; };
  const ligne = (pts, c, w) => { let h = '', d = ''; pts.forEach(q => { if(q.v > 0){ d += (d ? ' L' : 'M') + q.X.toFixed(1) + ',' + q.Y.toFixed(1); } else { if(d.includes('L')) h += `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"/>`; d = ''; } }); if(d.includes('L')) h += `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"/>`; return h; };
  const par = (lat, c, w) => ligne(Array.from({ length: 145 }, (_, i) => G(lat, -180 + i * 2.5)), c, w);
  const mer = (lon, c, w, a, b) => { a = a == null ? -90 : a; b = b == null ? 90 : b; return ligne(Array.from({ length: 73 }, (_, i) => G(a + (b - a) * i / 72, lon)), c, w); };
  const arcEq = (a, b, c, w) => ligne(Array.from({ length: 73 }, (_, i) => G(0, a + (b - a) * i / 72)), c, w);
  let h = `<defs><radialGradient id="es3Mer${o.id || ''}" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#EAF4FC"/><stop offset="1" stop-color="#B9D7EE"/></radialGradient></defs>`
    + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#es3Mer${o.id || ''})" stroke="${ES3_ENCRE}" stroke-width="1.8"/>`;
  [-60, -30, 30, 60].forEach(l => { h += par(l, '#8FA3B8', 0.9); });
  for(let l = -150; l <= 180; l += 30) if(l) h += mer(l, '#8FA3B8', 0.9);
  h += par(0, ES3_ROUGE, 1.8) + mer(0, ES3_VERT, 1.8);
  const Oc = [cx, cy], pos = q => [q.X, q.Y];
  if(o.arcs){ const { lat, lon } = o.arcs, Q = G(0, lon), P = G(lat, lon), Z = G(0, 0);
    h += es3Seg(Oc, pos(Z), ES3_VERT, 1.2, true) + es3Seg(Oc, pos(Q), ES3_ENCRE, 1.2, true) + es3Seg(Oc, pos(P), ES3_ROUGE, 1.2, true);
    h += arcEq(0, lon, ES3_VERT, 4) + mer(lon, ES3_ROUGE, 4, 0, lat) + mer(lon, ES3_ENCRE, 1.4); }
  const pole = (lat, t) => { const q = G(lat, 0); if(q.v > 0.08) h += ro3Croix(pos(q), ES3_ENCRE) + es3Lab(q.X + 10, q.Y + (lat > 0 ? -4 : 14), t, ES3_ENCRE, { a: 'start', s: 12 }); };
  pole(90, 'N'); pole(-90, 'S');
  if(o.etiquettes !== false){ const e = G(0, l0 + 50), g = G(-45, 0);
    if(e.v > 0) h += es3Lab(e.X, e.Y + 14, 'Équateur', ES3_ROUGE, { s: 11 });
    if(g.v > 0.2) h += es3Lab(g.X - 6, g.Y, 'Greenwich', ES3_VERT, { a: 'end', s: 11 }); }
  (o.pts || []).forEach(p => { const q = G(p.lat, p.lon); if(q.v > 0) h += ro3Croix(pos(q), p.c || ES3_ORANGE) + es3Lab(q.X + 9, q.Y - 6, p.nom, p.c || ES3_ORANGE, { a: 'start' }); });
  if(o.centre !== false) h += ro3Croix(Oc, ES3_ENCRE);
  return h;
}
const es3Coord = (lat, lon) => `(${Math.abs(lat)}°${lat > 0 ? ' N' : lat < 0 ? ' S' : ''} ; ${Math.abs(lon)}°${lon > 0 ? ' E' : lon < 0 ? ' O' : ''})`;

// Cube en perspective cavalière (arête s en px, coin avant bas-gauche en (x, y)).
function es3Cube(x, y, s, c){
  const k = s * 0.45, A = [x, y], B = [x + s, y], C = [x + s, y - s], D = [x, y - s], E = [x + k, y - k], F = [x + s + k, y - k], G = [x + s + k, y - s - k], H = [x + k, y - s - k];
  const pl = q => q.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ');
  return `<polygon points="${pl([D, C, G, H])}" fill="${c}" fill-opacity=".35" stroke="${c}" stroke-width="1.6"/><polygon points="${pl([B, F, G, C])}" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="1.6"/><polygon points="${pl([A, B, C, D])}" fill="${c}" fill-opacity=".12" stroke="${c}" stroke-width="1.6"/>`
    + es3Seg(A, E, c, 1.1, true) + es3Seg(E, F, c, 1.1, true) + es3Seg(E, H, c, 1.1, true);
}

document.getElementById('cours-demo-espace-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Sphère et boule</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Définitions</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>La <b>sphère</b> de centre O et de rayon <i>r</i> (<i>r</i> &gt; 0) est l'ensemble des points M de l'espace tels que ${es3Tex('OM = r')}.</li>
  <li>La <b>boule</b> de centre O et de rayon <i>r</i> (<i>r</i> &gt; 0) est l'ensemble des points M de l'espace tels que ${es3Tex('OM \\leqslant r')}.</li></ul></div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;">
    <p class="example-title">Exemple : sur la sphère de centre O ci-contre,</p>
    <ul class="example-list">
      <li>[OP] est un <b>rayon</b> : le point P est sur la sphère, donc ${es3Tex('OP = r')} ;</li>
      <li>[EF] est un <b>diamètre</b> : c'est un segment qui joint deux points de la sphère en passant par son centre (${es3Tex('EF = 2r')}) ;</li>
      <li>le cercle vert est un <b>grand cercle</b> : un cercle tracé sur la sphère, de centre O et de même rayon <i>r</i> que la sphère.</li>
    </ul>
    <div class="redaction-note" ${R4_REM}>Remarque : la sphère est la « surface » de la boule, comme la peau d'un ballon ; la boule est le solide plein, comme une bille ou une boule de pétanque.</div>
  </div>
  <div style="flex:1 1 250px;max-width:300px;">${es3FigSphere()}</div>
</div>

<div class="sub-header"><span class="letter">B</span><h4>Section d'une sphère par un plan</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La section d'une sphère de centre O par un plan est un <b>cercle</b>.</div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;">
    <p class="example-title">Exemple : la sphère de centre O et de rayon 5 cm est coupée par le plan violet, situé à 3 cm du centre (OH = 3 cm). La section est le cercle rose, de centre H et de rayon HN.</p>
    <ul class="example-list">
      <li>La droite (OH) est perpendiculaire au plan : le triangle OHN est rectangle en H.</li>
      <li>D'après le théorème de Pythagore : ${es3Tex('HN^2 = ON^2 - OH^2 = 5^2 - 3^2 = 16')}, donc ${es3Tex('HN = 4')} cm.</li>
    </ul></div>
  <div style="flex:1 1 300px;max-width:400px;"><svg viewBox="0 0 400 290" style="width:100%;display:block;margin:8px auto;">${es3FigSection(105, 63, { cx: 150, cy: 155, legende: true })}</svg></div>
</div>
<p class="example-title">Remarques :</p>
<ul class="example-list">
  <li>Lorsque le plan ne passe pas par le centre O, la droite qui joint O au centre H de la section est <b>perpendiculaire</b> au plan.</li>
  <li>La section d'une <b>boule</b> par un plan est un <b>disque</b>.</li>
  <li>Le rayon de la section est toujours inférieur ou égal au rayon de la sphère.</li>
  <li>Lorsque le plan passe par le centre de la sphère, le rayon de la section est égal au rayon de la sphère : la section est un <b>grand cercle</b>.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Se repérer sur une sphère</h3></div>
<p>On assimile la Terre à une sphère. On la quadrille par des <b style="color:${ES3_ROUGE};">parallèles</b>, cercles situés dans des plans parallèles au plan de l'<b>équateur</b>, et par des <b style="color:${ES3_VERT};">méridiens</b>, demi-cercles qui joignent le pôle Nord au pôle Sud. Le méridien d'origine est le <b>méridien de Greenwich</b> (qui passe près de Londres).</p>
<span class="def-badge">Définitions</span>
<div class="def-box">Tout point de la Terre est repéré par ses <b>coordonnées géographiques</b> (<b style="color:${ES3_ROUGE};">latitude</b> ; <b style="color:${ES3_VERT};">longitude</b>) :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.9;">
    <li>la <b style="color:${ES3_ROUGE};">latitude</b> d'un point est la mesure de l'angle entre l'équateur et ce point, lue le long de son méridien ; elle est orientée <b>Nord</b> ou <b>Sud</b> ;</li>
    <li>la <b style="color:${ES3_VERT};">longitude</b> d'un point est la mesure de l'angle entre le méridien de Greenwich et le méridien de ce point ; elle est orientée <b>Est</b> ou <b>Ouest</b>.</li></ul></div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;">
    <p class="example-title">Exemple : le point M ci-contre a pour coordonnées (40° N ; 50° E).</p>
    <ul class="example-list">
      <li>Il est situé sur le parallèle à <b style="color:${ES3_ROUGE};">40°</b> au <b>Nord</b> de l'équateur (arc rouge) ;</li>
      <li>et sur le méridien situé à <b style="color:${ES3_VERT};">50°</b> à l'<b>Est</b> du méridien de Greenwich (arc vert).</li>
    </ul>
    <div class="redaction-note" ${R4_REM}>Remarque : les latitudes sont comprises entre 0° et 90° (Nord ou Sud) ; les longitudes sont comprises entre 0° et 180° (Est ou Ouest).</div>
  </div>
  <div style="flex:1 1 250px;max-width:320px;"><svg viewBox="0 0 300 280" style="width:100%;display:block;margin:8px auto;">${es3Globe({ id: 'c', phi0: 22, lam0: 25, arcs: { lat: 40, lon: 50 }, pts: [{ lat: 40, lon: 50, nom: 'M' }] })}</svg></div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Volumes</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Volume d'une boule</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Le volume ${es3Tex('\\mathcal{V}')} d'une boule de rayon <i>r</i> est donné par la formule : ${es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times r^3')}.</div>
${r4Ex('Exemple : calculer le volume d\'une boule de rayon 6 cm (valeur exacte, puis valeur approchée au dixième).', [
  [es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times 6^3'), 'On applique la formule avec r = 6.'],
  [es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times 216 = 288\\pi') + ' cm³', 'Valeur exacte (216 × 4 ÷ 3 = 288).'],
  [es3Tex('\\mathcal{V} \\approx 904{,}8') + ' cm³', 'Valeur approchée au dixième.'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Agrandissement et réduction</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Lors d'un agrandissement ou d'une réduction de <b>rapport <i>k</i></b> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.9;">
    <li>les longueurs sont <b>multipliées par <i>k</i></b> ;</li>
    <li>les aires sont <b>multipliées par <i>k</i>²</b> ;</li>
    <li>les volumes sont <b>multipliés par <i>k</i>³</b>.</li></ul>
  (C'est un agrandissement si <i>k</i> &gt; 1, une réduction si 0 &lt; <i>k</i> &lt; 1.)</div>
<p class="example-title">Exemple : une boule de rayon 2 cm a pour volume ${es3Tex('\\dfrac{4}{3} \\times \\pi \\times 2^3 = \\dfrac{32\\pi}{3}')} cm³. On l'agrandit avec le rapport <i>k</i> = 3 :</p>
<ul class="example-list">
  <li>les longueurs sont multipliées par 3 : le rayon devient 2 × 3 = 6 cm ;</li>
  <li>les aires sont multipliées par ${es3Tex('3^2 = 9')} : l'aire d'un grand cercle passe de ${es3Tex('4\\pi')} à ${es3Tex('36\\pi')} cm² ;</li>
  <li>les volumes sont multipliés par ${es3Tex('3^3 = 27')} : ${es3Tex('\\dfrac{32\\pi}{3} \\times 27 = 288\\pi')} cm³. On retrouve bien le volume de la boule de rayon 6 cm !</li>
</ul>
`;

document.getElementById('histoire-demo-espace-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Vers 240 avant J.-C., <b>Ératosthène</b>, directeur de la grande bibliothèque d'Alexandrie, apprend qu'à Syène (l'actuelle Assouan), le jour du solstice d'été, le Soleil éclaire à midi le fond des puits : ses rayons y sont verticaux. Le même jour à Alexandrie, plus au nord, un bâton vertical projette une ombre qui fait un angle d'environ 7,2°, soit <b>un cinquantième</b> de tour. La Terre étant une sphère, il en déduit que la distance Syène–Alexandrie (environ 5 000 stades) est le cinquantième de la circonférence terrestre : environ 250 000 stades, soit près de <b>40 000 km</b>, une valeur remarquablement proche de la réalité ! Quatre siècles plus tard, <b>Ptolémée</b> rédige une <i>Géographie</i> où près de 8 000 lieux sont repérés par leur latitude et leur longitude.
</div>
`;

const ES3_VILLES = [['Paris', 49, 2], ['Rio de Janeiro', -23, -43], ['Tokyo', 36, 140], ['Sydney', -34, 151], ['Quito', 0, -79]];
document.getElementById('methode-demo-espace-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : couper une sphère par un plan</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une sphère de centre O a pour rayon 10 cm. Déplacez le plan : la section est un cercle de centre H, et le triangle OHN est rectangle en H.</p>
  <svg id="es3-sectionSvg" viewBox="0 0 420 300" style="width:100%;max-width:440px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:420px;margin:0 auto;">
    <label for="es3-d" style="font-weight:700;">OH</label><input id="es3-d" type="range" min="0" max="10" step="1" value="6" oninput="es3SectionMaj()"><span id="es3-dV" style="font-family:'JetBrains Mono',monospace;min-width:54px;"></span>
  </div>
  <div id="es3-sectionInfo" style="text-align:center;margin:10px 0 4px;line-height:2.1;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : placer un point par sa latitude et sa longitude</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez la latitude (Nord ou Sud) et la longitude (Est ou Ouest) du point M, ou choisissez une ville (coordonnées arrondies au degré).</p>
  <svg id="es3-globeSvg" viewBox="0 0 300 280" style="width:100%;max-width:340px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:420px;margin:0 auto;">
    <label for="es3-lat" style="font-weight:700;color:${ES3_ROUGE};">latitude</label><input id="es3-lat" type="range" min="-80" max="80" step="1" value="40" oninput="es3GlobeMaj()"><span id="es3-latV" style="font-family:'JetBrains Mono',monospace;min-width:54px;"></span>
    <label for="es3-lon" style="font-weight:700;color:${ES3_VERT};">longitude</label><input id="es3-lon" type="range" min="-180" max="180" step="1" value="50" oninput="es3GlobeMaj()"><span id="es3-lonV" style="font-family:'JetBrains Mono',monospace;"></span>
  </div>
  <div class="figure-toolbar" style="flex-wrap:wrap;">${ES3_VILLES.map(v => `<button class="btn secondary" onclick="es3Ville(${v[1]}, ${v[2]}, '${v[0]}')">${v[0]}</button>`).join('')}</div>
  <div id="es3-globeInfo" style="text-align:center;margin:8px 0 4px;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer le volume d'une boule</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une boule de pétanque a un diamètre de 9 cm. Calculer son volume (valeur exacte, puis arrondie au cm³). Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="es3-volumeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="es3VolumeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="es3VolumeDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : agrandir ou réduire un solide</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un cube d'arête 2 cm est agrandi ou réduit avec le rapport <i>k</i>. Observez comment évoluent la longueur d'une arête, l'aire d'une face et le volume.</p>
  <svg id="es3-cubeSvg" viewBox="0 0 400 200" style="width:100%;max-width:420px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:420px;margin:0 auto;">
    <label for="es3-k" style="font-weight:700;color:${ES3_ORANGE};">k</label><input id="es3-k" type="range" min="0.5" max="2.5" step="0.5" value="2" oninput="es3CubeMaj()"><span id="es3-kV" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
  </div>
  <div id="es3-cubeInfo" style="margin:10px auto 4px;max-width:520px;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function es3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="es3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="es3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-espace-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer le rayon d'une section de sphère »</h3>
  <p style="margin:4px 0 8px;">Une sphère de centre O et de rayon 7,5 cm est coupée par un plan situé à 4,5 cm de O. La section est un cercle de centre H ; N est un point de ce cercle.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La section est un cercle de centre H et (OH) est perpendiculaire au plan : le triangle OHN est rectangle en H.</span><span class="we-comment">1. On justifie l'angle droit.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème de Pythagore : ${es3Tex('ON^2 = OH^2 + HN^2')}.</span><span class="we-comment">2. On écrit l'égalité.</span></div>
    <div class="we-row"><span class="we-expr">${es3Tex('7{,}5^2 = 4{,}5^2 + HN^2')}, donc ${es3Tex('HN^2 = 56{,}25 - 20{,}25 = 36')}</span><span class="we-comment">3. On remplace et on calcule.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">${es3Tex('HN = \\sqrt{36} = 6')} : la section a pour rayon 6 cm.</span><span class="we-comment">4. On conclut avec l'unité.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${es3Exo(1, 'On considère la sphère de centre O et de rayon 4 cm. On donne OA = 4 cm, OB = 3 cm et OC = 5 cm. Quels points appartiennent à la sphère ? à la boule de même centre et de même rayon ?', [
    'OA = 4 cm = r : A appartient à la sphère (et donc aussi à la boule).', 'OB = 3 cm ⩽ 4 cm : B appartient à la boule mais pas à la sphère (il est à l\'intérieur).', 'OC = 5 cm &gt; 4 cm : C n\'appartient ni à la sphère ni à la boule.'])}
  ${es3Exo(2, 'Une sphère de centre O a pour rayon 17 cm. Elle est coupée par un plan situé à 8 cm de son centre. Calcule le rayon de la section.', [
    'La section est un cercle de centre H, avec OH = 8 cm ; pour un point N de ce cercle, le triangle OHN est rectangle en H et ON = 17 cm.', es3Tex('HN^2 = 17^2 - 8^2 = 289 - 64 = 225') + ', donc ' + es3Tex('HN = 15') + ' : le rayon de la section est 15 cm.'])}
  ${es3Exo(3, 'Une sphère de rayon 13 cm est coupée par un plan ; la section obtenue est un cercle de rayon 5 cm. À quelle distance du centre de la sphère se trouve ce plan ?', [
    'Dans le triangle OHN rectangle en H : ' + es3Tex('OH^2 = ON^2 - HN^2 = 13^2 - 5^2 = 169 - 25 = 144') + '.', es3Tex('OH = 12') + ' : le plan est à 12 cm du centre.'])}
  ${es3Exo(4, 'Calcule le volume d\'une boule de rayon 3 cm. Donne la valeur exacte, puis une valeur arrondie au dixième.', [
    es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times 3^3 = \\dfrac{4}{3} \\times \\pi \\times 27 = 36\\pi') + ' cm³.', es3Tex('\\mathcal{V} \\approx 113{,}1') + ' cm³.'])}
  ${es3Exo(5, 'Un ballon de basket a un diamètre de 22 cm. Calcule son volume, arrondi au cm³, puis en litres (1 L = 1 dm³ = 1 000 cm³).', [
    'Le rayon vaut 22 ÷ 2 = 11 cm.', es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times 11^3 \\approx 5\\,575') + ' cm³, soit environ 5,6 L.'])}
  ${es3Exo(6, 'Donne les coordonnées géographiques des points A, B et C placés sur le globe (les parallèles et les méridiens sont tracés tous les 30°).', [
    'A est à 30° au Nord de l\'équateur et à 60° à l\'Est de Greenwich : A (30° N ; 60° E).', 'B est sur l\'équateur, à 30° à l\'Ouest de Greenwich : B (0° ; 30° O).', 'C (30° S ; 30° E).'],
    `<svg viewBox="0 0 300 280" style="width:100%;max-width:280px;display:block;margin:8px auto;">${es3Globe({ id: 'x', centre: false, phi0: 20, lam0: 15, pts: [{ lat: 30, lon: 60, nom: 'A' }, { lat: 0, lon: -30, nom: 'B' }, { lat: -30, lon: 30, nom: 'C' }] })}</svg>`)}
  ${es3Exo(7, 'Un saladier a la forme d\'une demi-boule de rayon intérieur 9 cm. Quelle est sa contenance, arrondie au dixième de litre ?', [
    'Le volume d\'une demi-boule est la moitié de celui de la boule : ' + es3Tex('\\dfrac{1}{2} \\times \\dfrac{4}{3} \\times \\pi \\times 9^3 = 486\\pi') + ' cm³.', es3Tex('486\\pi \\approx 1\\,527') + ' cm³, soit environ 1,5 L.'])}
  ${es3Exo(8, 'Une pyramide de hauteur 15 cm a une base d\'aire 81 cm² et un volume de 405 cm³. On la réduit avec le rapport ' + es3Tex('k = \\dfrac{1}{3}') + '. Donne la hauteur, l\'aire de la base et le volume de la pyramide réduite.', [
    'Hauteur : ' + es3Tex('15 \\times \\dfrac{1}{3} = 5') + ' cm.', 'Aire de la base : ' + es3Tex('81 \\times \\left(\\dfrac{1}{3}\\right)^2 = \\dfrac{81}{9} = 9') + ' cm².', 'Volume : ' + es3Tex('405 \\times \\left(\\dfrac{1}{3}\\right)^3 = \\dfrac{405}{27} = 15') + ' cm³ (on vérifie : 9 × 5 ÷ 3 = 15).'])}
  ${es3Exo(9, 'Le rayon de la Lune est environ 0,27 fois celui de la Terre. Combien de « Lunes » faudrait-il, environ, pour obtenir le volume de la Terre ?', [
    'La Lune est (presque) une réduction de la Terre de rapport k = 0,27 : son volume est celui de la Terre multiplié par ' + es3Tex('0{,}27^3 \\approx 0{,}0197') + '.', es3Tex('1 \\div 0{,}0197 \\approx 51') + ' : il faudrait environ 50 Lunes pour obtenir le volume de la Terre.'])}
</div>
`;

/* ---- Méthode 1 : section ---- */
function es3SectionMaj(){
  const d = Number(document.getElementById('es3-d').value), R = 10, rho = Math.sqrt(R * R - d * d);
  document.getElementById('es3-dV').textContent = d + ' cm';
  document.getElementById('es3-sectionSvg').innerHTML = es3FigSection(110, d * 11, { cx: 150, cy: 155, legende: true });
  const info = document.getElementById('es3-sectionInfo');
  info.innerHTML = d === 0 ? `Le plan passe par le centre O : la section est un <b style="color:${ES3_ROSE};">grand cercle</b>, de rayon 10 cm (le rayon de la sphère).`
    : d === R ? `Le plan est à 10 cm du centre : il ne touche la sphère qu'en un seul point (on dit qu'il est <b>tangent</b> à la sphère) ; la section est réduite à un point.`
    : `Triangle OHN rectangle en H : ${es3Tex(`HN^2 = ON^2 - OH^2 = 10^2 - ${d}^2 = ${100 - d * d}`)}<br>Le rayon de la section est ${es3Tex(`HN = \\sqrt{${100 - d * d}}`)}${Number.isInteger(rho) ? ` = <b>${rho}</b> cm` : ` ≈ <b>${es3N(rho)}</b> cm`}.`;
  renderStaticMath(info);
}

/* ---- Méthode 2 : globe ---- */
function es3GlobeMaj(nomVille){
  const lat = Number(document.getElementById('es3-lat').value), lon = Number(document.getElementById('es3-lon').value);
  document.getElementById('es3-latV').textContent = Math.abs(lat) + '°' + (lat > 0 ? ' N' : lat < 0 ? ' S' : '');
  document.getElementById('es3-lonV').textContent = Math.abs(lon) + '°' + (lon > 0 ? ' E' : lon < 0 ? ' O' : '');
  document.getElementById('es3-globeSvg').innerHTML = es3Globe({ id: 'm', phi0: lat / 2 + (lat >= 0 ? 12 : -12), lam0: lon / 2, arcs: { lat, lon }, pts: [{ lat, lon, nom: 'M' }] });
  document.getElementById('es3-globeInfo').innerHTML = `M${nomVille ? ' (<b>' + nomVille + '</b>)' : ''} : ${es3Coord(lat, lon)}<br>`
    + `<span style="color:${ES3_ROUGE};">latitude</span> : ${lat === 0 ? 'le point est sur l\'équateur' : `${Math.abs(lat)}° au ${lat > 0 ? 'Nord' : 'Sud'} de l'équateur`} ; `
    + `<span style="color:${ES3_VERT};">longitude</span> : ${lon === 0 ? 'le point est sur le méridien de Greenwich' : `${Math.abs(lon)}° à l'${lon > 0 ? 'Est' : 'Ouest'} de Greenwich`}.`;
}
function es3Ville(lat, lon, nom){ document.getElementById('es3-lat').value = lat; document.getElementById('es3-lon').value = lon; es3GlobeMaj(nom); }

/* ---- Méthode 3 : volume ---- */
const ES3_VOL_STEPS = [
  { expr: 'Le rayon est la moitié du diamètre : ' + es3Tex('r = 9 \\div 2 = 4{,}5') + ' cm.', note: 'Attention : la formule utilise le rayon, pas le diamètre !' },
  { expr: es3Tex('\\mathcal{V} = \\dfrac{4}{3} \\times \\pi \\times r^3 = \\dfrac{4}{3} \\times \\pi \\times 4{,}5^3'), note: 'On écrit la formule, puis on remplace r par 4,5.' },
  { expr: es3Tex('4{,}5^3 = 4{,}5 \\times 4{,}5 \\times 4{,}5 = 91{,}125'), note: 'On calcule d\'abord le cube (priorité de la puissance).' },
  { expr: es3Tex('\\mathcal{V} = \\dfrac{4 \\times 91{,}125}{3} \\times \\pi = 121{,}5\\pi') + ' cm³', note: 'Valeur exacte.' },
  { expr: es3Tex('\\mathcal{V} \\approx 382') + ' cm³', note: 'Valeur arrondie au cm³ (121,5 × π ≈ 381,7).' },
];
const es3VolumeDemo = makeStepDemo(ES3_VOL_STEPS, 'es3-volumeDisplay');

/* ---- Méthode 4 : agrandissement / réduction ---- */
function es3CubeMaj(){
  const k = Number(document.getElementById('es3-k').value), u = 26;
  document.getElementById('es3-kV').textContent = es3N(k, 2);
  document.getElementById('es3-cubeSvg').innerHTML = es3Cube(30, 175, 2 * u, ES3_BLEU) + es3Lab(30 + u, 192, 'arête 2 cm', ES3_BLEU, { s: 11 })
    + `<path d="M${2 * u + 70},110 L${2 * u + 110},110" stroke="${ES3_ORANGE}" stroke-width="2" marker-end="url(#es3Fl)"/><defs><marker id="es3Fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="${ES3_ORANGE}"/></marker></defs>`
    + es3Lab(2 * u + 90, 100, '× ' + es3N(k, 2), ES3_ORANGE, { s: 12 })
    + es3Cube(2 * u + 130, 175, 2 * u * k, ES3_ORANGE) + es3Lab(2 * u + 130 + u * k, 192, 'arête ' + es3N(2 * k, 2) + ' cm', ES3_ORANGE, { s: 11 });
  const L = 2 * k, A = 4 * k * k, V = 8 * k * k * k, c = `style="padding:6px 10px;border:1px solid #D5DEE8;text-align:center;"`;
  const info = document.getElementById('es3-cubeInfo');
  info.innerHTML = `<table style="border-collapse:collapse;margin:0 auto;font-size:.95rem;"><tr><th ${c}></th><th ${c}>cube de départ</th><th ${c}>coefficient</th><th ${c}>cube obtenu</th></tr>`
    + `<tr><td ${c}>arête</td><td ${c}>2 cm</td><td ${c}>× ${es3Tex('k = ' + es3T(k, 2))}</td><td ${c}><b>${es3N(L, 2)} cm</b></td></tr>`
    + `<tr><td ${c}>aire d'une face</td><td ${c}>4 cm²</td><td ${c}>× ${es3Tex('k^2 = ' + es3T(k * k, 4))}</td><td ${c}><b>${es3N(A, 4)} cm²</b></td></tr>`
    + `<tr><td ${c}>volume</td><td ${c}>8 cm³</td><td ${c}>× ${es3Tex('k^3 = ' + es3T(k * k * k, 4))}</td><td ${c}><b>${es3N(V, 4)} cm³</b></td></tr></table>`
    + `<p style="text-align:center;margin:8px 0 0;">${k > 1 ? 'k &gt; 1 : c\'est un <b>agrandissement</b>.' : k < 1 ? '0 &lt; k &lt; 1 : c\'est une <b>réduction</b>.' : 'k = 1 : le cube ne change pas.'}</p>`;
  renderStaticMath(info);
}

DEMO_REGISTRY['3e|Espace'] = {
  cours: 'cours-demo-espace-3e', methode: 'methode-demo-espace-3e', exos: 'exos-demo-espace-3e', histoire: 'histoire-demo-espace-3e',
  init: () => {
    es3SectionMaj(); es3GlobeMaj(); es3VolumeDemo.reset(); es3CubeMaj();
    ['cours-demo-espace-3e', 'methode-demo-espace-3e', 'exos-demo-espace-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-espace-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-espace-3e'));
  }
};

DEMO_QUIZZES['3e|Espace'] = [
  { q: 'La sphère de centre O et de rayon r est l\'ensemble des points M tels que...', opts: ['OM = r', 'OM ⩽ r', 'OM ⩾ r'], correct: 0 },
  { q: 'La section d\'une sphère par un plan est...', opts: ['un cercle', 'un carré', 'une sphère'], correct: 0 },
  { q: 'La section d\'une sphère par un plan passant par son centre est...', opts: ['un grand cercle', 'un point', 'un demi-cercle'], correct: 0 },
  { q: 'La latitude d\'un point est orientée...', opts: ['Nord ou Sud', 'Est ou Ouest', 'Haut ou Bas'], correct: 0 },
  { q: 'Le volume d\'une boule de rayon r est...', opts: ['4/3 × π × r³', 'π × r²', '4 × π × r'], correct: 0 },
  { q: 'Dans un agrandissement de rapport 2, les aires sont multipliées par...', opts: ['2', '4', '8'], correct: 1 },
  { q: 'Dans une réduction de rapport 0,5, les volumes sont multipliés par...', opts: ['0,5', '0,25', '0,125'], correct: 2 },
];

/* ============================================================
   CHAPITRE : Triangles et parallèles (4e, G1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 72-74) : même principe que N1 et N2 -- plan du manuel (cas
   d'égalité des triangles, théorème de Thalès et calcul de longueurs, non-parallélisme,
   réciproque), titres reformulés, exemples et figures nouveaux. Utilise r4Ex / R4_REM de
   chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

/* ---- Petit moteur de figures : triangles, codages (traits, arcs), longueurs ----
   Les points sont des [x, y] en pixels SVG ; le viewBox s'ajuste à la figure. */
const G4_BLEU = '#0C5BA0', G4_VERT = '#1E7B34', G4_ROUGE = '#C0392B', G4_ORANGE = '#E07B00', G4_ENCRE = '#1C1B2E';
const g4Lerp = (P, Q, k) => [P[0] + (Q[0] - P[0]) * k, P[1] + (Q[1] - P[1]) * k];
// Troisième sommet d'un triangle connaissant [PQ] et les angles (en degrés) en P et en Q ; au-dessus de [PQ] si haut.
function g4TroisiemeSommet(P, Q, aP, aQ, haut){
  const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy), base = Math.atan2(dy, dx), s = haut === false ? 1 : -1;
  const c = Math.PI - (aP + aQ) * Math.PI / 180, d = L * Math.sin(aQ * Math.PI / 180) / Math.sin(c); // loi des sinus
  const a = base + s * aP * Math.PI / 180;
  return [P[0] + d * Math.cos(a), P[1] + d * Math.sin(a)];
}
// Isométrie : retournement éventuel (symétrie d'axe vertical passant par O), rotation autour de O, puis translation.
function g4Iso(pts, O, { rot = 0, tx = 0, ty = 0, flip = 1 }){
  const r = rot * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
  return pts.map(([x, y]) => { const u = (x - O[0]) * flip, v = y - O[1]; return [O[0] + u * c - v * s + tx, O[1] + u * s + v * c + ty]; });
}
const g4Centre = pts => [pts.reduce((t, p) => t + p[0], 0) / pts.length, pts.reduce((t, p) => t + p[1], 0) / pts.length];
function g4Nom(P, G, nom, c){
  const dx = P[0] - G[0], dy = P[1] - G[1], L = Math.hypot(dx, dy) || 1;
  return `<text x="${(P[0] + dx / L * 15).toFixed(1)}" y="${(P[1] + dy / L * 15 + 5).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk" font-size="15" font-weight="700" fill="${c || G4_ENCRE}">${nom}</text>`;
}
// Codage « même longueur » : n petits traits obliques au milieu de [PQ].
function g4Traits(P, Q, n, c){
  const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, m = g4Lerp(P, Q, 0.5);
  let h = '';
  for(let i = 0; i < n; i++){
    const o = (i - (n - 1) / 2) * 5, cx = m[0] + ux * o, cy = m[1] + uy * o, a = Math.atan2(uy, ux) + 1.2;
    h += `<line x1="${(cx - Math.cos(a) * 7).toFixed(1)}" y1="${(cy - Math.sin(a) * 7).toFixed(1)}" x2="${(cx + Math.cos(a) * 7).toFixed(1)}" y2="${(cy + Math.sin(a) * 7).toFixed(1)}" stroke="${c || G4_ENCRE}" stroke-width="1.8"/>`;
  }
  return h;
}
// Codage d'angle : secteur coloré au sommet V, entre les directions V→P et V→Q.
function g4Arc(V, P, Q, c, r){
  r = r || 20;
  const a1 = Math.atan2(P[1] - V[1], P[0] - V[0]), a2 = Math.atan2(Q[1] - V[1], Q[0] - V[0]);
  let d = a2 - a1; while(d > Math.PI) d -= 2 * Math.PI; while(d < -Math.PI) d += 2 * Math.PI;
  const x1 = V[0] + r * Math.cos(a1), y1 = V[1] + r * Math.sin(a1), x2 = V[0] + r * Math.cos(a1 + d), y2 = V[1] + r * Math.sin(a1 + d);
  return `<path d="M${V[0].toFixed(1)},${V[1].toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 0 ${d > 0 ? 1 : 0} ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${c}" fill-opacity=".45" stroke="${c}" stroke-width="1.2"/>`;
}
// Longueur écrite le long de [PQ], du côté opposé au point G (en général le centre de la figure).
function g4Longueur(P, Q, G, txt, c){
  const m = g4Lerp(P, Q, 0.5), dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy);
  let nx = -dy / L, ny = dx / L;
  if((m[0] - G[0]) * nx + (m[1] - G[1]) * ny < 0){ nx = -nx; ny = -ny; }
  return `<text x="${(m[0] + nx * 13).toFixed(1)}" y="${(m[1] + ny * 13 + 4).toFixed(1)}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" fill="${c || '#4E5665'}">${txt}</text>`;
}
const g4Seg = (P, Q, c, w, tirets) => `<line x1="${P[0].toFixed(1)}" y1="${P[1].toFixed(1)}" x2="${Q[0].toFixed(1)}" y2="${Q[1].toFixed(1)}" stroke="${c || G4_ENCRE}" stroke-width="${w || 2}"${tirets ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
const g4Pt = (P, c) => `<circle cx="${P[0].toFixed(1)}" cy="${P[1].toFixed(1)}" r="2.6" fill="${c || G4_ENCRE}"/>`;
// Assemble une figure : le viewBox englobe tous les points utiles (+ marge pour les noms).
function g4Svg(corps, pts, maxW, id){
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]), m = 30;
  const x0 = Math.min(...xs) - m, y0 = Math.min(...ys) - m, w = Math.max(...xs) - Math.min(...xs) + 2 * m, h = Math.max(...ys) - Math.min(...ys) + 2 * m;
  return `<svg${id ? ` id="${id}"` : ''} viewBox="${x0.toFixed(0)} ${y0.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}" style="width:100%;max-width:${maxW || 460}px;display:block;margin:10px auto 14px;">${corps}</svg>`;
}
// Triangle avec côtés colorés (dans l'ordre [P0P1], [P1P2], [P2P0]) et noms des sommets.
function g4Tri(T, noms, couleurs){
  const G = g4Centre(T);
  return [0, 1, 2].map(i => g4Seg(T[i], T[(i + 1) % 3], couleurs ? couleurs[i] : G4_ENCRE, 2.2)).join('') + T.map((P, i) => g4Nom(P, G, noms[i])).join('');
}

/* ---- Figures du cours ---- */
// Triangles isométriques : ABC, puis DEF (glissement) et GHI (retournement) ; côtés de même longueur, même couleur.
const G4_ABC = [[40, 150], [150, 170], [95, 55]];
const G4_DEF = g4Iso(G4_ABC, g4Centre(G4_ABC), { rot: 35, tx: 170, ty: 0 });
const G4_GHI = g4Iso(G4_ABC, g4Centre(G4_ABC), { rot: -20, tx: 340, ty: 5, flip: -1 });
const G4_COUL3 = [G4_BLEU, G4_VERT, G4_ROUGE];
function g4FigIsometriques(){
  return g4Svg(g4Tri(G4_ABC, ['A', 'B', 'C'], G4_COUL3) + g4Tri(G4_DEF, ['D', 'E', 'F'], G4_COUL3) + g4Tri(G4_GHI, ['G', 'H', 'I'], G4_COUL3), [...G4_ABC, ...G4_DEF, ...G4_GHI], 520);
}
// Propriété 1 : un côté et les deux angles qui lui sont adjacents.
const G4_R = [20, 170], G4_S = [170, 170], G4_T = g4TroisiemeSommet(G4_R, G4_S, 40, 65);
const G4_RST = [G4_R, G4_S, G4_T], G4_UVW = g4Iso(G4_RST, g4Centre(G4_RST), { rot: -30, tx: 215, ty: -10, flip: -1 });
function g4FigACA(){
  const [U, V, W] = G4_UVW;
  return g4Svg(g4Tri(G4_RST, ['R', 'S', 'T']) + g4Tri(G4_UVW, ['U', 'V', 'W'])
    + g4Traits(G4_R, G4_S, 1) + g4Traits(U, V, 1)
    + g4Arc(G4_R, G4_S, G4_T, G4_BLEU) + g4Arc(U, V, W, G4_BLEU) + g4Arc(G4_S, G4_R, G4_T, G4_ROUGE, 17) + g4Arc(V, U, W, G4_ROUGE, 17), [...G4_RST, ...G4_UVW], 480);
}
// Propriété 2 : un angle compris entre deux côtés.
const G4_K = [30, 160], G4_L = [170, 175], G4_M = g4Lerp(G4_K, g4Iso([[170, 175]], G4_K, { rot: -50 })[0], 0.72);
const G4_KLM = [G4_K, G4_L, G4_M], G4_PQR = g4Iso(G4_KLM, g4Centre(G4_KLM), { rot: 40, tx: 230, ty: -5 });
function g4FigCAC(){
  const [P, Q, R] = G4_PQR;
  return g4Svg(g4Tri(G4_KLM, ['K', 'L', 'M']) + g4Tri(G4_PQR, ['P', 'Q', 'R'])
    + g4Traits(G4_K, G4_L, 1) + g4Traits(P, Q, 1) + g4Traits(G4_K, G4_M, 2) + g4Traits(P, R, 2)
    + g4Arc(G4_K, G4_L, G4_M, G4_BLEU) + g4Arc(P, Q, R, G4_BLEU), [...G4_KLM, ...G4_PQR], 480);
}
// Configuration de Thalès : A, M ∈ [AB], N ∈ [AC], (MN) // (BC). lg = longueurs écrites {AM, AB, AN, AC, MN, BC}.
function g4FigThales(A, B, C, k, noms, lg, maxW, nonParallele){
  const [nA, nB, nC, nM, nN] = noms || ['A', 'B', 'C', 'M', 'N'];
  const M = g4Lerp(A, B, k), N = g4Lerp(A, C, nonParallele || k), G = g4Centre([A, B, C]);
  let h = `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.08)"/>`
    + g4Seg(A, B, G4_ENCRE, 1.8) + g4Seg(A, C, G4_ENCRE, 1.8) + g4Seg(B, C, G4_BLEU, 2.4) + g4Seg(M, N, G4_ORANGE, 2.4)
    + [A, B, C, M, N].map(p => g4Pt(p)).join('')
    + g4Nom(A, G, nA) + g4Nom(B, G, nB) + g4Nom(C, G, nC) + g4Nom(M, g4Lerp(M, N, 0.5), nM) + g4Nom(N, g4Lerp(M, N, 0.5), nN);
  lg = lg || {};
  if(lg.AM) h += g4Longueur(A, M, N, lg.AM);
  // AB et AC : écrites le long de la partie [MB] / [NC], avec leur nom (pas de confusion avec AM / AN).
  if(lg.AB) h += g4Longueur(M, B, C, `${nA}${nB} = ${lg.AB}`, '#6B7A8C');
  if(lg.AN) h += g4Longueur(A, N, M, lg.AN);
  if(lg.AC) h += g4Longueur(N, C, B, `${nA}${nC} = ${lg.AC}`, '#6B7A8C');
  if(lg.MN) h += g4Longueur(M, N, A, lg.MN, G4_ORANGE);
  if(lg.BC) h += g4Longueur(B, C, A, lg.BC, G4_BLEU);
  return g4Svg(h, [A, B, C], maxW || 360);
}
const G4_TH = { A: [40, 150], B: [330, 205], C: [300, 40] };
const G4_TAB = (lignes) => `<div style="overflow-x:auto;margin:6px 0 16px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.95rem;">${lignes.map((l, i) => `<tr>${l.map((c, j) => `<td style="border:1px solid #C9D6E6;padding:6px 12px;text-align:center;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

document.getElementById('cours-demo-triangles-paralleles-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Triangles égaux : les cas d'égalité</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux triangles sont <b>isométriques</b> (on dit aussi « égaux ») lorsque leurs côtés ont <b>deux à deux la même longueur</b>.</div>
<p class="example-title">Exemple : les triangles ABC, DEF et GHI sont isométriques.</p>
${g4FigIsometriques()}
<ul class="example-list"><li>Les côtés de même couleur ont la même longueur. On peut superposer DEF à ABC en le faisant <b>glisser</b> (et tourner), et GHI à ABC en le <b>retournant</b> (animation dans l'onglet Méthode).</li></ul>

<span class="prop-badge">Propriété 1</span>
<div class="def-box"><b>Si</b> deux triangles ont <b>un côté de même longueur</b> compris entre <b>deux angles de même mesure</b> deux à deux, <b>alors</b> ils sont isométriques.</div>
${g4FigACA()}
<p class="example-title">Exemple :</p>
<ul class="example-list"><li>RS = UV. Le côté [RS] est compris entre les angles <span class="tex">\\widehat{TRS}</span> et <span class="tex">\\widehat{RST}</span>, et le côté [UV] entre les angles <span class="tex">\\widehat{WUV}</span> et <span class="tex">\\widehat{UVW}</span>. De plus, <span class="tex">\\widehat{TRS} = \\widehat{WUV} = 40°</span> et <span class="tex">\\widehat{RST} = \\widehat{UVW} = 65°</span>. Donc les triangles RST et UVW sont isométriques.</li></ul>

<span class="prop-badge">Propriété 2</span>
<div class="def-box"><b>Si</b> deux triangles ont <b>un angle de même mesure</b> compris entre <b>deux côtés de même longueur</b> deux à deux, <b>alors</b> ils sont isométriques.</div>
${g4FigCAC()}
<p class="example-title">Exemple :</p>
<ul class="example-list"><li><span class="tex">\\widehat{LKM} = \\widehat{QPR} = 50°</span>. L'angle <span class="tex">\\widehat{LKM}</span> est compris entre les côtés [KL] et [KM], et l'angle <span class="tex">\\widehat{QPR}</span> entre les côtés [PQ] et [PR]. De plus, KL = PQ et KM = PR. Donc les triangles KLM et PQR sont isométriques.</li></ul>

<span class="prop-badge">Propriété 3</span>
<div class="def-box"><b>Si</b> deux triangles sont isométriques, <b>alors</b> leurs angles sont deux à deux de même mesure et ils ont la même aire.</div>
<div class="redaction-note" ${R4_REM}>Attention, les réciproques sont fausses :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li>deux triangles peuvent avoir les mêmes angles sans être isométriques (l'un peut être un agrandissement de l'autre) ;</li>
    <li>deux triangles peuvent avoir la même aire sans être isométriques : un triangle rectangle dont les côtés de l'angle droit mesurent 3 cm et 8 cm, et un autre de 4 cm et 6 cm, ont tous deux une aire de 12 cm².</li>
  </ul>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Le théorème de Thalès</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La configuration de Thalès</h4></div>
<p style="margin:4px 0;">On considère un triangle ABC, un point M du segment [AB] et un point N du segment [AC], tels que les droites (MN) et (BC) soient <b>parallèles</b>. Les triangles AMN et ABC sont « emboîtés » : on associe leurs côtés deux à deux.</p>
${g4FigThales(G4_TH.A, G4_TH.B, G4_TH.C, 0.45, null, null, 340)}
${G4_TAB([['Côtés du triangle AMN', '[AM]', '[AN]', '[MN]'], ['Côtés du triangle ABC', '[AB]', '[AC]', '[BC]']])}

<div class="sub-header"><span class="letter">B</span><h4>L'énoncé du théorème</h4></div>
<span class="prop-badge">Théorème de Thalès</span>
<div class="def-box"><b>Si</b>, dans un triangle ABC, M ∈ [AB], N ∈ [AC] et les droites (MN) et (BC) sont parallèles, <b>alors</b> : <div style="text-align:center;margin:8px 0 2px;"><span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}</span></div></div>
<div class="redaction-note" ${R4_REM}>Remarque : autrement dit, les longueurs des côtés du triangle AMN sont <b>proportionnelles</b> aux longueurs des côtés associés du triangle ABC : le triangle AMN est une <b>réduction</b> du triangle ABC.</div>

<div class="sub-header"><span class="letter">C</span><h4>Calculer une longueur</h4></div>
<p class="example-title">Exemple 1 : les droites (MN) et (BC) sont parallèles, AM = 3 cm, AB = 7,5 cm, AN = 4 cm et BC = 6 cm. On cherche AC et MN.</p>
${g4FigThales(G4_TH.A, G4_TH.B, G4_TH.C, 0.4, null, { AM: '3', AB: '7,5', AN: '4', BC: '6' }, 340)}
${r4Ex('', [
  ['Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC).', 'On vérifie la configuration.'],
  ['<span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}</span>', "D'après le théorème de Thalès."],
  ['<span class="tex">\\dfrac{3}{7{,}5} = \\dfrac{4}{AC} = \\dfrac{MN}{6}</span>', 'On remplace par les longueurs connues.'],
  ['<span class="tex">AC = \\dfrac{7{,}5 \\times 4}{3} = 10</span> cm', 'Produit en croix avec les deux premiers rapports.'],
  ['<span class="tex">MN = \\dfrac{3 \\times 6}{7{,}5} = 2{,}4</span> cm', 'Produit en croix avec le premier et le troisième rapport.'],
])}
<p class="example-title">Exemple 2 (avec un tableau de proportionnalité) : dans le triangle RST, U ∈ [RS], V ∈ [RT] et (UV) // (ST). On sait que RU = 2 cm, RV = 2,5 cm, UV = 3 cm et RS = 6 cm. On cherche RT et ST.</p>
<ul class="example-list"><li>D'après le théorème de Thalès, les longueurs du triangle RST sont proportionnelles à celles du triangle RUV :</li></ul>
${G4_TAB([['Triangle RUV', 'RU = 2 cm', 'RV = 2,5 cm', 'UV = 3 cm'], ['Triangle RST', 'RS = 6 cm', 'RT = 2,5 × 3 = <b>7,5 cm</b>', 'ST = 3 × 3 = <b>9 cm</b>']])}
<ul class="example-list"><li>Le coefficient est 6 ÷ 2 = 3 : le triangle RST est un <b>agrandissement</b> de rapport 3 du triangle RUV.</li></ul>

<div class="sub-header"><span class="letter">D</span><h4>Prouver que deux droites ne sont pas parallèles</h4></div>
<span class="prop-badge">Conséquence</span>
<div class="def-box"><b>Si</b>, dans un triangle ABC, M ∈ [AB], N ∈ [AC] et <span class="tex">\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}</span>, <b>alors</b> les droites (MN) et (BC) ne sont <b>pas parallèles</b>.</div>
<p class="example-title">Exemple : AM = 6 cm, AB = 9 cm, AN = 5 cm et AC = 7 cm (la figure n'est pas en vraie grandeur).</p>
${g4FigThales(G4_TH.A, G4_TH.B, G4_TH.C, 0.66, null, { AM: '6', AB: '9', AN: '5', AC: '7' }, 340, 0.72)}
${r4Ex('', [
  ['Dans le triangle ABC, M ∈ [AB] et N ∈ [AC].', ''],
  ['<span class="tex">\\dfrac{AM}{AB} = \\dfrac{6}{9}</span> et <span class="tex">\\dfrac{AN}{AC} = \\dfrac{5}{7}</span>', 'On calcule séparément les deux rapports.'],
  ['6 × 7 = 42 et 9 × 5 = 45', 'On compare avec les produits en croix.'],
  ['<span class="tex">\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}</span>', 'Les produits sont différents.'],
  ['Donc (MN) et (BC) ne sont pas parallèles.', "Si elles l'étaient, d'après le théorème de Thalès, les rapports seraient égaux."],
])}

<div class="lesson-header"><span class="num">3</span><h3>La réciproque du théorème de Thalès</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>L'énoncé de la réciproque</h4></div>
<span class="prop-badge">Réciproque du théorème de Thalès</span>
<div class="def-box"><b>Si</b>, dans un triangle ABC, M ∈ [AB], N ∈ [AC] et <span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC}</span>, <b>alors</b> les droites (MN) et (BC) sont <b>parallèles</b>.</div>
<div class="redaction-note" ${R4_REM}>Attention : il ne suffit pas que les rapports soient égaux. Il faut aussi que les points soient placés <b>dans le même ordre</b> : M sur le segment [AB] et N sur le segment [AC].</div>

<div class="sub-header"><span class="letter">B</span><h4>Prouver que deux droites sont parallèles</h4></div>
<p class="example-title">Exemple : AM = 2,4 cm, AB = 6 cm, AN = 3 cm et AC = 7,5 cm.</p>
${g4FigThales(G4_TH.A, G4_TH.B, G4_TH.C, 0.4, null, { AM: '2,4', AB: '6', AN: '3', AC: '7,5' }, 340)}
${r4Ex('', [
  ['Dans le triangle ABC, M ∈ [AB] et N ∈ [AC].', 'Les points sont dans le même ordre.'],
  ['<span class="tex">\\dfrac{AM}{AB} = \\dfrac{2{,}4}{6} = 0{,}4</span>', 'On calcule le premier rapport.'],
  ['<span class="tex">\\dfrac{AN}{AC} = \\dfrac{3}{7{,}5} = 0{,}4</span>', 'On calcule le second rapport.'],
  ['<span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC}</span>', 'Les deux rapports sont égaux.'],
  ['Donc (MN) et (BC) sont parallèles.', "D'après la réciproque du théorème de Thalès."],
])}
`;

document.getElementById('histoire-demo-triangles-paralleles-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  <b>Thalès de Milet</b> est un savant grec du 6e siècle avant J.-C. Selon la légende, rapportée plusieurs siècles plus tard, il aurait mesuré la hauteur de la grande pyramide de Khéops sans y monter : il aurait attendu le moment de la journée où l'ombre d'un bâton est égale à sa longueur, puis mesuré l'ombre de la pyramide… qui était alors égale à sa hauteur. Le théorème qui porte son nom est démontré dans les <i>Éléments</i> d'Euclide (vers 300 av. J.-C.), mais ce n'est qu'à la fin du 19e siècle que les manuels français lui ont donné le nom de Thalès ; dans d'autres pays, on l'appelle simplement le « théorème d'intersection » !
</div>
`;

document.getElementById('methode-demo-triangles-paralleles-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : observer le théorème de Thalès et sa réciproque</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Déplacez M sur [AB] et N sur [AC] avec les curseurs (AB = 6 cm, AC = 5 cm, BC = 7 cm). Les rapports se calculent en direct.</p>
  <svg id="g4-thSvg" viewBox="0 0 450 300" style="width:100%;max-width:460px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 10px;align-items:center;max-width:460px;margin:0 auto;">
    <label for="g4-thM" style="font-weight:700;">M</label><input id="g4-thM" type="range" min="1" max="19" value="8" oninput="g4ThDessiner()">
    <label for="g4-thN" style="font-weight:700;">N</label><input id="g4-thN" type="range" min="1" max="19" value="8" oninput="g4ThDessiner()">
  </div>
  <div id="g4-thInfo" style="text-align:center;margin:10px 0 4px;line-height:1.9;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="g4ThParallele()">Rendre (MN) parallèle à (BC)</button>
    <button class="btn secondary" onclick="g4ThDecaler()">Décaler N</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : calculer une longueur avec le théorème de Thalès</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  ${g4FigThales([40, 60], [340, 60], [230, 230], 0.36, ['E', 'F', 'G', 'H', 'K'], { AM: '4,5', AB: '12,5', AN: '3,6', MN: '5,4' }, 360)}
  <p class="interaction-hint" style="margin:6px 0;">(HK) // (FG), EH = 4,5 cm, EF = 12,5 cm, EK = 3,6 cm, HK = 5,4 cm. Cliquez sur « Étape suivante » pour calculer EG et FG.</p>
  <div class="step-display" id="g4-calculDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="g4CalculDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="g4CalculDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : prouver que deux droites sont (ou ne sont pas) parallèles</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Dans un triangle IJK, P ∈ [IJ] et Q ∈ [IK], avec IP = 3,5 cm, IJ = 5 cm, IQ = 4,9 cm et IK = 7 cm. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="g4-reciproqueDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="g4ReciproqueDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="g4ReciproqueDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : superposer deux triangles isométriques</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Deux triangles isométriques se superposent exactement : par glissement (translation et rotation), et parfois en retournant l'un des deux.</p>
  <svg id="g4-isoSvg" viewBox="0 0 560 258" style="width:100%;max-width:520px;display:block;margin:8px auto;"></svg>
  <div id="g4-isoNote" class="step-note" style="text-align:center;min-height:2.4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="g4IsoJouer(false)">Glisser DEF sur ABC</button>
    <button class="btn" onclick="g4IsoJouer(true)">Retourner GHI sur ABC</button>
    <button class="btn secondary" onclick="g4IsoReset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que N1 et N2).
function g4Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="g4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="g4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-triangles-paralleles-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une longueur avec le théorème de Thalès »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC).</span><span class="we-comment">1. On cite la configuration et l'hypothèse de parallélisme.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème de Thalès : <span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}</span></span><span class="we-comment">2. On nomme le théorème et on écrit l'égalité des rapports.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On remplace les longueurs connues.</span><span class="we-comment">3. Une seule inconnue par égalité choisie.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Produit en croix, puis on conclut avec l'unité.</span><span class="we-comment">4. On calcule et on répond.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${g4Exo(1, 'Deux triangles ABC et DEF vérifient : AB = DE = 5 cm, <span class="tex">\\widehat{CAB} = \\widehat{FDE} = 30°</span> et <span class="tex">\\widehat{ABC} = \\widehat{DEF} = 70°</span>. Sont-ils isométriques ? Justifie.', [
    'Le côté [AB] est compris entre les angles en A et en B, le côté [DE] entre les angles en D et en E.', 'AB = DE, et les angles adjacents sont deux à deux de même mesure (30° et 70°).', 'D\'après la propriété 1, les triangles ABC et DEF sont isométriques.'])}
  ${g4Exo(2, 'Les triangles EFG et XYZ vérifient : EF = XY = 4 cm, EG = XZ = 7 cm et <span class="tex">\\widehat{FEG} = \\widehat{YXZ} = 55°</span>. Et les triangles EFG et IJK, où IJ = 4 cm, IK = 7 cm et <span class="tex">\\widehat{IJK} = 55°</span> ?', [
    'EFG et XYZ : l\'angle de 55° est compris entre les deux côtés de même longueur (en E et en X). D\'après la propriété 2, ils sont isométriques.',
    'EFG et IJK : l\'angle de 55° est en J, il n\'est pas compris entre les côtés [IJ] et [IK]. On ne peut pas conclure avec les propriétés du cours.'])}
  ${g4Exo(3, 'Deux triangles ont tous les deux des angles de 50°, 60° et 70°. Sont-ils forcément isométriques ?', [
    'Non : l\'un peut être un agrandissement de l\'autre. Avoir les mêmes angles ne suffit pas (réciproque de la propriété 3 fausse).'])}
  ${g4Exo(4, 'Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). On sait que AM = 4 cm, AB = 10 cm, AC = 12 cm et MN = 3 cm. Calcule AN et BC.', [
    'D\'après le théorème de Thalès : <span class="tex">\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}</span>, soit <span class="tex">\\dfrac{4}{10} = \\dfrac{AN}{12} = \\dfrac{3}{BC}</span>.',
    '<span class="tex">AN = \\dfrac{4 \\times 12}{10} = 4{,}8</span> cm', '<span class="tex">BC = \\dfrac{10 \\times 3}{4} = 7{,}5</span> cm'])}
  ${g4Exo(5, 'Dans le triangle EFG, R ∈ [EF], S ∈ [EG] et (RS) // (FG). On sait que ER = 2,1 cm, EF = 3,5 cm, ES = 1,8 cm et FG = 5 cm. Calcule EG et RS.', [
    'D\'après le théorème de Thalès : <span class="tex">\\dfrac{2{,}1}{3{,}5} = \\dfrac{1{,}8}{EG} = \\dfrac{RS}{5}</span>, et <span class="tex">\\dfrac{2{,}1}{3{,}5} = 0{,}6</span>.',
    'EG = 1,8 ÷ 0,6 = 3 cm', 'RS = 0,6 × 5 = 3 cm'])}
  ${g4Exo(6, 'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec AM = 3 cm, AB = 8 cm, AN = 4 cm et AC = 10 cm. Les droites (MN) et (BC) sont-elles parallèles ?', [
    '<span class="tex">\\dfrac{AM}{AB} = \\dfrac{3}{8} = 0{,}375</span> et <span class="tex">\\dfrac{AN}{AC} = \\dfrac{4}{10} = 0{,}4</span>.', 'Les rapports sont différents, donc, d\'après le théorème de Thalès, les droites (MN) et (BC) ne sont pas parallèles.'])}
  ${g4Exo(7, 'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC], avec AM = 4,5 cm, AB = 7,5 cm, AN = 3 cm et AC = 5 cm. Montre que (MN) // (BC).', [
    '<span class="tex">\\dfrac{AM}{AB} = \\dfrac{4{,}5}{7{,}5} = 0{,}6</span> et <span class="tex">\\dfrac{AN}{AC} = \\dfrac{3}{5} = 0{,}6</span>.', 'Les rapports sont égaux et les points A, M, B et A, N, C sont dans le même ordre.', 'D\'après la réciproque du théorème de Thalès, (MN) // (BC).'])}
  ${g4Exo(8, 'Pour mesurer un arbre, Noé plante un bâton vertical de 1,5 m. Il se place à l\'endroit A où l\'ombre du bâton et celle de l\'arbre se terminent au même point. Le pied du bâton est à 2 m de A, et le pied de l\'arbre à 12 m de A. Quelle est la hauteur de l\'arbre ?', [
    'Le bâton [MN] et l\'arbre [BC] sont verticaux, donc parallèles ; A, M, B sont alignés sur le sol et A, N, C sur le rayon de soleil.',
    'D\'après le théorème de Thalès : <span class="tex">\\dfrac{AM}{AB} = \\dfrac{MN}{BC}</span>, soit <span class="tex">\\dfrac{2}{12} = \\dfrac{1{,}5}{BC}</span>.', '<span class="tex">BC = \\dfrac{12 \\times 1{,}5}{2} = 9</span> : l\'arbre mesure 9 m.'],
    g4FigThales([30, 200], [360, 200], [360, 40], 2 / 12, ['A', 'B', 'C', 'M', 'N'], { AM: '2 m', MN: '1,5 m', AB: '12 m' }, 340))}
</div>
`;

/* ---- Méthode 1 : figure de Thalès manipulable (AB = 6, AC = 5, BC = 7) ---- */
const G4_TH_U = 50, G4_TH_B = [30, 270], G4_TH_C = [30 + 7 * G4_TH_U, 270];
const G4_TH_A = [30 + (60 / 14) * G4_TH_U, 270 - Math.sqrt(36 - Math.pow(60 / 14, 2)) * G4_TH_U];
const g4Fmt = v => String(Math.round(v * 100) / 100).replace('.', ',');
function g4ThDessiner(){
  const svg = document.getElementById('g4-thSvg'); if(!svg) return;
  const km = Number(document.getElementById('g4-thM').value) / 20, kn = Number(document.getElementById('g4-thN').value) / 20;
  const A = G4_TH_A, B = G4_TH_B, C = G4_TH_C, M = g4Lerp(A, B, km), N = g4Lerp(A, C, kn), G = g4Centre([A, B, C]);
  const par = Math.abs(km - kn) < 1e-9, mn = Math.hypot(N[0] - M[0], N[1] - M[1]) / G4_TH_U;
  svg.innerHTML = `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.07)"/>`
    + g4Seg(A, B, G4_ENCRE, 1.8) + g4Seg(A, C, G4_ENCRE, 1.8) + g4Seg(B, C, G4_BLEU, 2.6) + g4Seg(M, N, par ? G4_VERT : G4_ROUGE, 2.6)
    + [A, B, C, M, N].map(p => g4Pt(p)).join('') + g4Nom(A, G, 'A') + g4Nom(B, G, 'B') + g4Nom(C, G, 'C')
    + g4Nom(M, g4Lerp(M, N, 0.5), 'M', G4_ORANGE) + g4Nom(N, g4Lerp(M, N, 0.5), 'N', G4_ORANGE);
  const r1 = `<span class="tex">\\dfrac{AM}{AB} = \\dfrac{${g4Fmt(6 * km).replace(',', '{,}')}}{6} = ${g4Fmt(km).replace(',', '{,}')}</span>`;
  const r2 = `<span class="tex">\\dfrac{AN}{AC} = \\dfrac{${g4Fmt(5 * kn).replace(',', '{,}')}}{5} = ${g4Fmt(kn).replace(',', '{,}')}</span>`;
  const r3 = `<span class="tex">\\dfrac{MN}{BC} = \\dfrac{${g4Fmt(mn).replace(',', '{,}')}}{7} = ${g4Fmt(mn / 7).replace(',', '{,}')}</span>`;
  const info = document.getElementById('g4-thInfo');
  info.innerHTML = `${r1} &nbsp;&nbsp; ${r2}${par ? ' &nbsp;&nbsp; ' + r3 : ''}<br>`
    + (par ? `<b style="color:${G4_VERT};">Les rapports sont égaux : (MN) est parallèle à (BC)</b>, et MN/BC a la même valeur (théorème de Thalès).`
           : `<b style="color:${G4_ROUGE};">Les rapports sont différents : (MN) n'est pas parallèle à (BC).</b>`);
  renderStaticMath(info);
}
function g4ThParallele(){ document.getElementById('g4-thN').value = document.getElementById('g4-thM').value; g4ThDessiner(); }
function g4ThDecaler(){ const n = document.getElementById('g4-thN'), m = Number(document.getElementById('g4-thM').value); n.value = m >= 16 ? m - 3 : m + 3; g4ThDessiner(); }

/* ---- Méthode 2 : calcul de longueurs ---- */
const G4_CALCUL_STEPS = [
  { expr: 'Dans le triangle EFG, H ∈ [EF], K ∈ [EG] et (HK) // (FG).', note: 'On vérifie la configuration de Thalès et le parallélisme.' },
  { expr: '<span class="tex">\\dfrac{EH}{EF} = \\dfrac{EK}{EG} = \\dfrac{HK}{FG}</span>', note: "D'après le théorème de Thalès (on associe les côtés du petit triangle EHK à ceux du grand EFG)." },
  { expr: '<span class="tex">\\dfrac{4{,}5}{12{,}5} = \\dfrac{3{,}6}{EG} = \\dfrac{5{,}4}{FG}</span>', note: 'On remplace par les longueurs connues.' },
  { expr: '<span class="tex">EG = \\dfrac{12{,}5 \\times 3{,}6}{4{,}5} = 10</span> cm', note: 'Produit en croix avec les deux premiers rapports.' },
  { expr: '<span class="tex">FG = \\dfrac{12{,}5 \\times 5{,}4}{4{,}5} = 15</span> cm', note: 'Produit en croix avec le premier et le troisième rapport.' },
];
const g4CalculDemo = makeStepDemo(G4_CALCUL_STEPS, 'g4-calculDisplay');

/* ---- Méthode 3 : réciproque ---- */
const G4_RECIPROQUE_STEPS = [
  { expr: 'Dans le triangle IJK, P ∈ [IJ] et Q ∈ [IK].', note: 'Les points I, P, J et I, Q, K sont dans le même ordre.' },
  { expr: '<span class="tex">\\dfrac{IP}{IJ} = \\dfrac{3{,}5}{5} = 0{,}7</span>', note: 'On calcule séparément le premier rapport.' },
  { expr: '<span class="tex">\\dfrac{IQ}{IK} = \\dfrac{4{,}9}{7} = 0{,}7</span>', note: 'On calcule séparément le second rapport.' },
  { expr: '<span class="tex">\\dfrac{IP}{IJ} = \\dfrac{IQ}{IK}</span>', note: 'Les rapports sont égaux. (S\'ils étaient différents, on conclurait que les droites ne sont pas parallèles.)' },
  { expr: 'Donc (PQ) // (JK).', note: "D'après la réciproque du théorème de Thalès." },
];
const g4ReciproqueDemo = makeStepDemo(G4_RECIPROQUE_STEPS, 'g4-reciproqueDisplay');

/* ---- Méthode 4 : superposition animée ---- */
const G4_ISO_ABC = [[40, 170], [170, 190], [110, 60]], G4_ISO_O = g4Centre(G4_ISO_ABC);
const G4_ISO_DEF = { rot: 70, tx: 175, ty: -10, flip: 1 }, G4_ISO_GHI = { rot: -35, tx: 355, ty: 5, flip: -1 };
let g4IsoRaf = null;
function g4IsoDessin(pDEF, pGHI){
  const base = g4Tri(G4_ISO_ABC, ['A', 'B', 'C'], G4_COUL3).replace(/stroke-width="2.2"/g, 'stroke-width="5" stroke-opacity=".35"');
  const t1 = g4Iso(G4_ISO_ABC, G4_ISO_O, pDEF), t2 = g4Iso(G4_ISO_ABC, G4_ISO_O, pGHI);
  return base + g4Tri(t1, ['D', 'E', 'F'], G4_COUL3) + g4Tri(t2, ['G', 'H', 'I'], G4_COUL3);
}
function g4IsoReset(){
  cancelAnimationFrame(g4IsoRaf);
  const s = document.getElementById('g4-isoSvg'); if(!s) return;
  s.innerHTML = g4IsoDessin(G4_ISO_DEF, G4_ISO_GHI);
  document.getElementById('g4-isoNote').textContent = 'ABC (en pâle), DEF et GHI sont isométriques : les côtés de même couleur ont la même longueur.';
}
function g4IsoJouer(retourner){
  cancelAnimationFrame(g4IsoRaf);
  const s = document.getElementById('g4-isoSvg'), note = document.getElementById('g4-isoNote'), t0 = performance.now(), dur = 2200;
  const depart = retourner ? G4_ISO_GHI : G4_ISO_DEF, autre = retourner ? G4_ISO_DEF : G4_ISO_GHI;
  note.textContent = retourner ? 'GHI glisse vers ABC… puis se retourne : il faut le retourner pour qu\'il se superpose à ABC.' : 'DEF glisse et tourne jusqu\'à ABC, sans être retourné.';
  const f = now => {
    const t = Math.min(1, (now - t0) / dur), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const p = { rot: depart.rot * (1 - e), tx: depart.tx * (1 - e), ty: depart.ty * (1 - e), flip: depart.flip === -1 ? (t < 0.6 ? -1 : -1 + 2 * Math.min(1, (t - 0.6) / 0.4)) : 1 };
    s.innerHTML = retourner ? g4IsoDessin(autre, p) : g4IsoDessin(p, autre);
    if(t < 1) g4IsoRaf = requestAnimationFrame(f);
    else note.textContent = retourner ? 'GHI recouvre exactement ABC après un retournement : G sur A, H sur B, I sur C.' : 'DEF recouvre exactement ABC : D sur A, E sur B, F sur C.';
  };
  g4IsoRaf = requestAnimationFrame(f);
}

DEMO_REGISTRY['4e|Triangles et parallèles'] = {
  cours: 'cours-demo-triangles-paralleles-4e', methode: 'methode-demo-triangles-paralleles-4e', exos: 'exos-demo-triangles-paralleles-4e', histoire: 'histoire-demo-triangles-paralleles-4e',
  init: () => {
    g4ThDessiner(); g4CalculDemo.reset(); g4ReciproqueDemo.reset(); g4IsoReset();
    ['cours-demo-triangles-paralleles-4e', 'methode-demo-triangles-paralleles-4e', 'exos-demo-triangles-paralleles-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-triangles-paralleles-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-triangles-paralleles-4e'));
  }
};

DEMO_QUIZZES['4e|Triangles et parallèles'] = [
  { q: 'Deux triangles sont isométriques lorsque...', opts: ['ils ont les mêmes angles', 'leurs côtés ont deux à deux la même longueur', 'ils ont la même aire'], correct: 1 },
  { q: 'Deux triangles ont un côté de même longueur compris entre deux angles de même mesure deux à deux. Alors...', opts: ['ils sont isométriques', 'on ne peut rien dire', 'ils sont rectangles'], correct: 0 },
  { q: 'Deux triangles qui ont la même aire sont-ils toujours isométriques ?', opts: ['Oui', 'Non'], correct: 1 },
  { q: "Dans un triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). Le théorème de Thalès donne...", opts: ['AM/AB = AN/AC = MN/BC', 'AM/MB = AN/AC = MN/BC', 'AB/AM = AC/AN = MN/BC'], correct: 0 },
  { q: 'Avec AM = 2, AB = 5 et BC = 10 (et (MN) // (BC)), MN vaut...', opts: ['4', '25', '5'], correct: 0 },
  { q: 'Si AM/AB ≠ AN/AC (M ∈ [AB], N ∈ [AC]), alors...', opts: ['(MN) // (BC)', '(MN) et (BC) ne sont pas parallèles', 'on ne peut rien conclure'], correct: 1 },
  { q: 'Pour prouver que deux droites sont parallèles avec des longueurs, on utilise...', opts: ['le théorème de Thalès', 'la réciproque du théorème de Thalès', 'le théorème de Pythagore'], correct: 1 },
];

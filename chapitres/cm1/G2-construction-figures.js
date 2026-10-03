/* ============================================================
   CHAPITRE : Construction de figures (CM1, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Construit à partir de la page de cours du manuel (cercles, triangles et quadrilatères
   particuliers), avec des exemples originaux. Demandé en plus : « peut-être faut-il reparler des
   bases avec le vocabulaire géométrique » -- le chapitre s'ouvre donc sur le vocabulaire (point,
   segment, droite, milieu, polygone) avant le cercle et les figures particulières.
   Échelle des figures : 22 unités = 1 cm, la même que les instruments du site (rulerSVG,
   equerreSVG, compassSVG, pencilSVG dans app.js) : les graduations de la règle tombent juste.
   Conventions de points : croix pour un point libre, petit trait pour un point sur une ligne,
   rien pour un sommet de polygone.
   ============================================================ */
const CF1_CM = 22;
const CF1_ENCRE = '#20242E', CF1_ROUGE = '#D93025', CF1_BLEU = '#0C5BA0', CF1_VERT = '#1F7A4D', CF1_ORANGE = '#E07B00', CF1_VIOLET = '#7B3FA0', CF1_GRIS = '#9AA3AF';

function cf1Svg(inner, vb, maxW){ return `<svg viewBox="${vb}" style="width:100%;max-width:${maxW || 320}px;display:block;margin:8px auto;">${inner}</svg>`; }
function cf1F(v){ return (+v).toFixed(1); }
function cf1Seg(P, Q, col, w, dash){ return `<line x1="${cf1F(P[0])}" y1="${cf1F(P[1])}" x2="${cf1F(Q[0])}" y2="${cf1F(Q[1])}" stroke="${col || CF1_ENCRE}" stroke-width="${w || 2}" stroke-linecap="round"${dash ? ' stroke-dasharray="6 5"' : ''}/>`; }
function cf1Lab(P, dx, dy, t, col, fs){ return `<text x="${cf1F(P[0] + dx)}" y="${cf1F(P[1] + dy)}" font-size="${fs || 15}" font-weight="700" fill="${col || CF1_ENCRE}" text-anchor="middle" font-family="Space Grotesk, Arial, sans-serif">${t}</text>`; }
function cf1Croix(P, col){ const d = 5; return cf1Seg([P[0] - d, P[1] - d], [P[0] + d, P[1] + d], col, 2) + cf1Seg([P[0] - d, P[1] + d], [P[0] + d, P[1] - d], col, 2); }
// Petit trait perpendiculaire à la direction dir, pour un point placé sur une ligne.
function cf1Trait(P, dir, col){ const n = Math.hypot(dir[0], dir[1]) || 1, u = [-dir[1] / n * 6, dir[0] / n * 6]; return cf1Seg([P[0] - u[0], P[1] - u[1]], [P[0] + u[0], P[1] + u[1]], col, 2); }
function cf1Poly(pts, col, fill, w){ return `<polygon points="${pts.map(p => cf1F(p[0]) + ',' + cf1F(p[1])).join(' ')}" fill="${fill || 'none'}" stroke="${col || CF1_ENCRE}" stroke-width="${w || 2}" stroke-linejoin="round"/>`; }
function cf1Unit(P, Q){ const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]) || 1; return [(Q[0] - P[0]) / d, (Q[1] - P[1]) / d]; }
// Codage de l'angle droit : petit carré au sommet S, entre les directions de P et de Q.
function cf1AngleDroit(S, P, Q, col, t){
  t = t || 10; const u = cf1Unit(S, P), v = cf1Unit(S, Q);
  const a = [S[0] + u[0] * t, S[1] + u[1] * t], b = [a[0] + v[0] * t, a[1] + v[1] * t], c = [S[0] + v[0] * t, S[1] + v[1] * t];
  return `<polyline points="${[a, b, c].map(p => cf1F(p[0]) + ',' + cf1F(p[1])).join(' ')}" fill="none" stroke="${col || CF1_ENCRE}" stroke-width="1.8"/>`;
}
// Codage des longueurs égales : n petits traits au milieu du segment.
function cf1Traits(P, Q, n, col){
  const u = cf1Unit(P, Q), nr = [-u[1], u[0]], M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  let h = '';
  for(let k = 0; k < n; k++){
    const o = (k - (n - 1) / 2) * 5, C = [M[0] + u[0] * o, M[1] + u[1] * o];
    h += cf1Seg([C[0] - nr[0] * 6 - u[0] * 2, C[1] - nr[1] * 6 - u[1] * 2], [C[0] + nr[0] * 6 + u[0] * 2, C[1] + nr[1] * 6 + u[1] * 2], col, 1.8);
  }
  return h;
}
// Point d'un cercle de centre O et de rayon r, à l'angle a (degrés, sens inverse des aiguilles d'une montre).
function cf1Pc(O, r, a){ const t = a * Math.PI / 180; return [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)]; }
function cf1Arc(O, r, a0, a1, col, w){
  const P = cf1Pc(O, r, a0), Q = cf1Pc(O, r, a1), grand = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `<path d="M${cf1F(P[0])},${cf1F(P[1])} A${cf1F(r)},${cf1F(r)} 0 ${grand} 0 ${cf1F(Q[0])},${cf1F(Q[1])}" fill="none" stroke="${col || CF1_ENCRE}" stroke-width="${w || 2}" stroke-linecap="round"/>`;
}
function cf1Cercle(O, r, col, w){ return `<circle cx="${cf1F(O[0])}" cy="${cf1F(O[1])}" r="${cf1F(r)}" fill="none" stroke="${col || CF1_ENCRE}" stroke-width="${w || 2}"/>`; }

/* Instruments du site (app.js) à l'échelle 1 : 22 unités = 1 cm, comme les figures.
   Règle : bord gradué sur le trait, graduation 0 sur le point de départ. */
function cf1Regle(P, angDeg){ return `<g transform="translate(${cf1F(P[0])},${cf1F(P[1])}) rotate(${cf1F(angDeg)})">${rulerSVG(true)}</g>`; }
function cf1Crayon(P, angDeg){ return `<g transform="translate(${cf1F(P[0])},${cf1F(P[1])}) rotate(${cf1F((angDeg || 0) + 25)}) scale(0.62)">${pencilSVG('cf1-crayon')}</g>`; }
// Équerre : angle droit en P ; tournée de -90°, son grand côté monte et son petit côté part vers la droite.
function cf1Equerre(P, angDeg){ return `<g transform="translate(${cf1F(P[0])},${cf1F(P[1])}) rotate(${cf1F(angDeg)})" opacity=".92">${equerreSVG(176, 101.6)}</g>`; }
// Compas : pointe sèche en O, mine au point du cercle d'angle a (degrés). inverse : charnière de l'autre côté.
function cf1Compas(O, r, a, inverse){
  const leg = 0.7 * r + 32;
  return `<g transform="translate(${cf1F(O[0])},${cf1F(O[1])}) rotate(${cf1F(-a)})${inverse ? ' scale(1,-1)' : ''}">${compassSVG(r, leg)}</g>`;
}

/* ---------------- Figures particulières (codées), pour le cours, le jeu et les exercices ---------------- */
const CF1_FORMES = {
  'triangle rectangle': { pts: [[-55, 38], [60, 38], [-55, -42]], codes: p => cf1AngleDroit(p[0], p[1], p[2]) },
  'triangle isocèle': { pts: [[0, -55], [-42, 42], [42, 42]], codes: p => cf1Traits(p[0], p[1], 1) + cf1Traits(p[0], p[2], 1) },
  'triangle équilatéral': { pts: [[-50, 30], [50, 30], [0, -56.6]], codes: p => cf1Traits(p[0], p[1], 2) + cf1Traits(p[1], p[2], 2) + cf1Traits(p[2], p[0], 2) },
  'rectangle': { pts: [[-68, -36], [68, -36], [68, 36], [-68, 36]], codes: p => [0, 1, 2, 3].map(i => cf1AngleDroit(p[i], p[(i + 1) % 4], p[(i + 3) % 4])).join('') },
  'losange': { pts: [[0, -50], [78, 0], [0, 50], [-78, 0]], codes: p => [0, 1, 2, 3].map(i => cf1Traits(p[i], p[(i + 1) % 4], 1)).join('') },
  'carré': { pts: [[-46, -46], [46, -46], [46, 46], [-46, 46]], codes: p => [0, 1, 2, 3].map(i => cf1AngleDroit(p[i], p[(i + 1) % 4], p[(i + 3) % 4]) + cf1Traits(p[i], p[(i + 1) % 4], 1)).join('') },
};
function cf1Forme(nom, angle, col, noms){
  const f = CF1_FORMES[nom], t = (angle || 0) * Math.PI / 180, C = [110, 80];
  const p = f.pts.map(([x, y]) => [C[0] + x * Math.cos(t) - y * Math.sin(t), C[1] + x * Math.sin(t) + y * Math.cos(t)]);
  let h = cf1Poly(p, col || CF1_BLEU, 'rgba(12,91,160,.06)', 2.2) + f.codes(p);
  if(noms) h += p.map((P, i) => { const u = cf1Unit(C, P); return cf1Lab(P, u[0] * 14, u[1] * 14 + 5, noms[i], col || CF1_BLEU, 14); }).join('');
  return h;
}
function cf1FormeSvg(nom, angle, col, noms, maxW){ return cf1Svg(cf1Forme(nom, angle, col, noms), '0 0 220 160', maxW || 200); }

/* ---------------- Cours ---------------- */
function cf1FigPointSegment(){
  const A = [40, 70], B = [170, 70], P = [50, 25];
  return cf1Svg(cf1Croix(P, CF1_ROUGE) + cf1Lab(P, 0, -10, 'P', CF1_ROUGE)
    + cf1Seg(A, B, CF1_BLEU, 2.4) + cf1Trait(A, [1, 0], CF1_BLEU) + cf1Trait(B, [1, 0], CF1_BLEU)
    + cf1Lab(A, 0, 24, 'A') + cf1Lab(B, 0, 24, 'B') + cf1Lab([105, 70], 0, -10, '[AB]', CF1_BLEU, 13), '0 0 210 105', 220);
}
function cf1FigDroite(){
  const E = [70, 72], F = [150, 44];
  const u = cf1Unit(E, F), L = [E[0] - u[0] * 60, E[1] - u[1] * 60], R = [F[0] + u[0] * 60, F[1] + u[1] * 60];
  return cf1Svg(cf1Seg(L, R, CF1_VERT, 2.4) + cf1Trait(E, u, CF1_VERT) + cf1Trait(F, u, CF1_VERT)
    + cf1Lab(E, -2, 22, 'E') + cf1Lab(F, 4, 22, 'F') + cf1Lab(R, -14, -8, '(d)', CF1_VERT, 13)
    + `<text x="8" y="16" font-size="11" fill="${CF1_GRIS}">… elle continue des deux côtés …</text>`, '0 0 210 105', 220);
}
function cf1FigAlignes(){
  const G = [30, 60], M = [105, 60], H = [180, 60], K = [120, 25];
  return cf1Svg(cf1Seg(G, H, CF1_ORANGE, 2.4) + [G, M, H].map(P => cf1Trait(P, [1, 0], CF1_ORANGE)).join('')
    + cf1Traits(G, M, 1, CF1_ORANGE) + cf1Traits(M, H, 1, CF1_ORANGE)
    + cf1Lab(G, 0, 24, 'G') + cf1Lab(M, 0, 24, 'M') + cf1Lab(H, 0, 24, 'H') + cf1Croix(K, CF1_ROUGE) + cf1Lab(K, 12, -6, 'K', CF1_ROUGE), '0 0 210 105', 220);
}
function cf1FigPolygone(){
  const P = [[60, 150], [200, 150], [230, 70], [140, 25], [40, 75]], n = ['A', 'B', 'C', 'D', 'E'], C = [135, 95];
  let h = cf1Poly(P, CF1_BLEU, 'rgba(12,91,160,.07)', 2.4);
  h += P.map((Q, i) => { const u = cf1Unit(C, Q); return cf1Lab(Q, u[0] * 15, u[1] * 15 + 5, n[i], CF1_BLEU); }).join('');
  h += cf1Seg(P[0], P[1], CF1_VERT, 4.5) + cf1Lab([130, 150], 0, 22, 'un côté', CF1_VERT, 13);
  h += `<circle cx="${P[2][0]}" cy="${P[2][1]}" r="6" fill="none" stroke="${CF1_ROUGE}" stroke-width="2"/>` + cf1Lab(P[2], 62, 5, 'un sommet', CF1_ROUGE, 13);
  // Angle en E, entre les côtés [EA] et [ED] (angles calculés sur la figure, repère mathématique).
  const angE = Q => Math.atan2(-(Q[1] - P[4][1]), Q[0] - P[4][0]) * 180 / Math.PI;
  h += cf1Arc(P[4], 20, angE(P[0]), angE(P[3]), CF1_ORANGE, 2.4) + cf1Lab(P[4], -6, -26, 'un angle', CF1_ORANGE, 13);
  return cf1Svg(h, '0 0 320 190', 340);
}

// Vocabulaire du cercle, interactif : un clic sur un mot le colorie sur la figure.
// Notation d'un arc : un petit arc de cercle au-dessus des deux lettres (arc EF).
function cf1ArcNom(t){ return `<span style="display:inline-block;position:relative;padding-top:.45em;line-height:1;"><svg viewBox="0 0 20 6" preserveAspectRatio="none" style="position:absolute;left:0;top:0;width:100%;height:.5em;overflow:visible;"><path d="M1,5.5 Q10,-2 19,5.5" fill="none" stroke="currentColor" stroke-width="1.4" vector-effect="non-scaling-stroke"/></svg>${t}</span>`; }
const CF1_V_O = [150, 118], CF1_V_R = 82;
const CF1_VOC = {
  centre: [CF1_ROUGE, 'Le <b>centre</b> O est au milieu : tous les points du cercle sont à la même distance de O.'],
  rayon: [CF1_BLEU, 'Un <b>rayon</b> relie le centre à un point du cercle : le segment [OR] est un rayon. Tous les rayons d\'un cercle ont la même longueur.'],
  diametre: [CF1_VERT, 'Un <b>diamètre</b> relie deux points du cercle en passant par le centre : le segment [AB] est un diamètre. Il mesure deux rayons.'],
  corde: [CF1_ORANGE, 'Une <b>corde</b> relie deux points du cercle, sans forcément passer par le centre : le segment [EF] est une corde.'],
  arc: [CF1_VIOLET, 'Un <b>arc</b> est un morceau du cercle : l\'arc ' + cf1ArcNom('EF') + ' est la partie du cercle entre E et F.'],
};
function cf1Voc(v){
  const O = CF1_V_O, r = CF1_V_R, A = cf1Pc(O, r, 205), B = cf1Pc(O, r, 25), R = cf1Pc(O, r, 112), E = cf1Pc(O, r, 245), F = cf1Pc(O, r, 310);
  const c = k => v === k ? CF1_VOC[k][0] : CF1_GRIS, w = k => v === k ? 4 : 1.8;
  let h = cf1Cercle(O, r, CF1_ENCRE, 2) + (v === 'arc' ? cf1Arc(O, r, 245, 310, CF1_VIOLET, 5.5) : '');
  h += cf1Seg(A, B, c('diametre'), w('diametre')) + cf1Seg(O, R, c('rayon'), w('rayon')) + cf1Seg(E, F, c('corde'), w('corde'));
  h += [[A, 'A', 205], [B, 'B', 25], [R, 'R', 112], [E, 'E', 245], [F, 'F', 310]].map(([P, n, a]) => { const u = cf1Unit(O, P); return cf1Trait(P, [-u[1], u[0]]) + cf1Lab(P, u[0] * 16, u[1] * 16 + 5, n); }).join('');
  h += cf1Croix(O, v === 'centre' ? CF1_ROUGE : CF1_ENCRE) + cf1Lab(O, -10, 20, 'O', v === 'centre' ? CF1_ROUGE : CF1_ENCRE);
  const svg = document.getElementById('cf1-vocSvg'); if(svg) svg.innerHTML = h;
  const note = document.getElementById('cf1-vocNote'); if(note) note.innerHTML = v ? CF1_VOC[v][1] : 'Clique sur un mot pour le voir sur le cercle.';
  document.querySelectorAll('#cf1-vocBtns button').forEach(b => b.classList.toggle('secondary', b.dataset.v !== v));
}

function cf1Tableau(titres, cellules, pieds){
  const th = 'padding:6px;border:1px solid rgba(28,43,57,.15);background:rgba(31,122,77,.10);font-weight:700;';
  const td = 'padding:8px;border:1px solid rgba(28,43,57,.15);vertical-align:top;';
  return `<div style="overflow-x:auto;"><table style="border-collapse:collapse;width:100%;text-align:center;margin:10px 0 16px;table-layout:fixed;">
    <tr>${titres.map(t => `<td style="${th}">${t}</td>`).join('')}</tr>
    <tr>${cellules.map(c => `<td style="${td}">${c}</td>`).join('')}</tr>
    <tr>${pieds.map(p => `<td style="${td}font-size:.9rem;">${p}</td>`).join('')}</tr></table></div>`;
}

document.getElementById('cours-demo-cm1-construction-figures').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le vocabulaire de la géométrie</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Points, segments et droites</h4></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  • Un <b>point</b> se dessine avec une petite croix et se nomme avec une lettre majuscule : le point P.<br>
  • Le <b>segment [AB]</b> est le trait droit qui va du point A au point B. A et B sont ses <b>extrémités</b>. On peut mesurer sa longueur : on écrit AB = 6 cm.<br>
  • La <b>droite (EF)</b> passe par les points E et F. Une droite n'a pas de fin : on n'en trace qu'un morceau. On peut aussi la nommer avec une lettre minuscule : la droite (d).
</div>
${cf1Tableau(['Un point et un segment', 'Une droite', 'Des points alignés'], [cf1FigPointSegment(), cf1FigDroite(), cf1FigAlignes()],
  ['Le point P et le segment [AB].', 'La droite (d), qu\'on peut aussi appeler (EF).', 'G, M et H sont <b>alignés</b> ; K ne l\'est pas avec eux.'])}
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  • Des points sont <b>alignés</b> s'ils sont sur une même droite. On le vérifie avec la règle.<br>
  • Le <b>milieu</b> d'un segment est le point du segment qui est à la même distance de ses deux extrémités. Sur la figure, M est le milieu du segment [GH] : GM = MH.
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Les petits traits identiques sur les segments [GM] et [MH] sont un <b>codage</b> : ils disent que les deux longueurs sont égales.
</div>

<div class="sub-header"><span class="letter">B</span><h4>Les polygones</h4></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">Un <b>polygone</b> est une figure fermée dont le contour est fait de segments : ce sont ses <b>côtés</b>. Les extrémités des côtés sont les <b>sommets</b>. Deux côtés qui se suivent forment un <b>angle</b>.</div>
<div class="figure-wrap">${cf1FigPolygone()}
  <p class="hint" style="margin:4px 0 0;text-align:center;">Le polygone ABCDE a 5 côtés, 5 sommets et 5 angles.</p></div>
<div class="redaction-note" style="background:rgba(12,91,160,.06);border-color:rgba(12,91,160,.2);color:#0C3D6B;">
  Pour nommer un polygone, on cite ses sommets <b>dans l'ordre</b>, en faisant le tour de la figure : ABCDE, ou BCDEA. Mais pas ACBDE !<br>
  Un polygone à 3 côtés est un <b>triangle</b> ; un polygone à 4 côtés est un <b>quadrilatère</b>.
</div>

<div class="lesson-header"><span class="num">2</span><h3>Le cercle</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Le <b>cercle de centre O et de rayon 2 cm</b> est formé de tous les points qui se trouvent <b>à 2 cm</b> du point O.<br>
Le <b>disque</b> de centre O et de rayon 2 cm est formé de tous les points qui se trouvent <b>à 2 cm au plus</b> de O : c'est le cercle et tout l'intérieur.</div>
<div class="figure-wrap">
  <div id="cf1-vocBtns" class="figure-toolbar" style="justify-content:center;">
    ${[['centre', 'le centre'], ['rayon', 'un rayon'], ['diametre', 'un diamètre'], ['corde', 'une corde'], ['arc', 'un arc']].map(([v, t]) => `<button type="button" class="btn secondary" data-v="${v}" onclick="cf1Voc('${v}')">${t}</button>`).join('')}
  </div>
  <svg id="cf1-vocSvg" viewBox="0 0 300 240" style="width:100%;max-width:320px;display:block;margin:6px auto;"></svg>
  <p class="hint" id="cf1-vocNote" style="text-align:center;margin:0;"></p>
</div>
<span class="prop-badge">À retenir</span>
<div class="def-box">Le diamètre d'un cercle mesure <b>deux fois</b> son rayon : diamètre = 2 × rayon.<br>
Un cercle de rayon 2 cm a donc un diamètre de 4 cm.</div>

${ce2AnimCompas('cm1-cf-compas', { presets: [{ nom: 'Rayon 3 cm', r: 3 }, { nom: 'Rayon 4 cm', r: 4 }, { nom: 'Rayon 5 cm', r: 5 }] })}

<div class="lesson-header"><span class="num">3</span><h3>Des triangles particuliers</h3></div>
<div class="def-box">Un <b>triangle</b> est un polygone qui a 3 côtés. Il a 3 sommets et 3 angles.</div>
${cf1Tableau(['Triangle rectangle', 'Triangle isocèle', 'Triangle équilatéral'],
  [cf1FormeSvg('triangle rectangle', 0, CF1_VERT), cf1FormeSvg('triangle isocèle', 0, CF1_BLEU), cf1FormeSvg('triangle équilatéral', 0, CF1_ORANGE)],
  ['Un triangle <b>rectangle</b> a <span style="color:' + CF1_VERT + ';">un angle droit</span>.', 'Un triangle <b>isocèle</b> a <span style="color:' + CF1_BLEU + ';">deux côtés de même longueur</span>.', 'Un triangle <b>équilatéral</b> a <span style="color:' + CF1_ORANGE + ';">trois côtés de même longueur</span>.'])}

<div class="lesson-header"><span class="num">4</span><h3>Des quadrilatères particuliers</h3></div>
<div class="def-box">Un <b>quadrilatère</b> est un polygone qui a 4 côtés. Il a 4 sommets et 4 angles.</div>
${cf1Tableau(['Rectangle', 'Losange', 'Carré'],
  [cf1FormeSvg('rectangle', 0, CF1_VERT), cf1FormeSvg('losange', 0, CF1_BLEU), cf1FormeSvg('carré', 0, CF1_ORANGE)],
  ['Un <b>rectangle</b> a <span style="color:' + CF1_VERT + ';">quatre angles droits</span>.', 'Un <b>losange</b> a <span style="color:' + CF1_BLEU + ';">quatre côtés de même longueur</span>.', 'Un <b>carré</b> a <span style="color:' + CF1_ORANGE + ';">quatre angles droits et quatre côtés de même longueur</span>.'])}
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Un carré a quatre angles droits : c'est donc aussi un rectangle. Il a quatre côtés de même longueur : c'est aussi un losange !
</div>
`;

/* ---------------- Méthodes : constructions aux instruments, étape par étape ---------------- */
function cf1Etapes(id, notes, dessin){
  let k = 0;
  const rendre = () => {
    const svg = document.getElementById(id + 'Svg'); if(!svg) return;
    svg.innerHTML = dessin(k);
    document.getElementById(id + 'Note').innerHTML = notes[k];
    const b = document.getElementById(id + 'Btn'); if(b) b.disabled = k >= notes.length - 1;
  };
  return { next(){ if(k < notes.length - 1) k++; rendre(); }, reset(){ k = 0; rendre(); }, rendre };
}
function cf1MethodeHtml(id, titre, consigne, vb, maxW){
  return `<div class="sub-header"><span class="letter">M</span><h4>${titre}</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">${consigne}</p>
  <svg id="${id}Svg" viewBox="${vb}" style="width:100%;max-width:${maxW}px;display:block;margin:6px auto;background:#fff;"></svg>
  <p class="step-note" id="${id}Note" style="text-align:center;min-height:2.6em;"></p>
  <div class="figure-toolbar">
    <button class="btn" id="${id}Btn" onclick="${id}Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="${id}Demo.reset()">Recommencer</button>
  </div>
</div>`;
}

// M1 : tracer un cercle de centre O et de rayon 3 cm.
const CF1_C_O = [200, 130], CF1_C_R = 3 * CF1_CM;
const cf1CercleDemo = cf1Etapes('cf1Cercle', [
  'On veut tracer le cercle de centre O et de rayon 3 cm. Le point O est placé.',
  '1. On écarte le compas sur la règle : la pointe sèche sur le 0, la mine sur le 3. L\'écartement vaut 3 cm.',
  '2. Sans changer l\'écartement, on pique la pointe sèche sur le centre O et on pose la mine sur la feuille.',
  '3. On tourne le compas en le tenant par le haut, sans appuyer sur les branches…',
  '4. … jusqu\'à revenir au point de départ. Le cercle est tracé : chacun de ses points est à 3 cm de O.',
], k => {
  const O = CF1_C_O, r = CF1_C_R;
  let h = '';
  if(k === 1){ const R0 = [40, 215]; h += cf1Regle(R0, 0) + cf1Compas(R0, r, 0); }
  if(k === 3) h += cf1Arc(O, r, 0, 200, CF1_BLEU, 2.2);
  if(k >= 4){ h += cf1Cercle(O, r, CF1_BLEU, 2.2); const A = cf1Pc(O, r, 35); h += cf1Seg(O, A, CF1_ROUGE, 1.8, true) + cf1Lab([(O[0] + A[0]) / 2, (O[1] + A[1]) / 2], -4, -8, '3 cm', CF1_ROUGE, 12); }
  h += cf1Croix(O) + cf1Lab(O, -12, 18, 'O');
  if(k === 2) h += cf1Compas(O, r, 0);
  if(k === 3) h += cf1Compas(O, r, 200, true);
  return h;
});

// M2 : tracer un rectangle de 5 cm sur 3 cm (règle et équerre).
const CF1_R_A = [70, 200], CF1_R_B = [70 + 5 * CF1_CM, 200], CF1_R_D = [70, 200 - 3 * CF1_CM], CF1_R_C = [70 + 5 * CF1_CM, 200 - 3 * CF1_CM];
/* Signalé : « Les équerres ont rarement le 0 juste dans l'angle. Il est légèrement décalé. Donc il
   faut faire des perpendiculaires et seulement après prendre les mesures à la règle. » L'équerre ne
   sert qu'à tracer les angles droits (des traits plus longs que nécessaire) ; les 3 cm se mesurent
   ensuite à la règle, 0 sur le sommet. Les bouts de trait en trop restent en traits de construction. */
const CF1_R_PERP = 4.5 * CF1_CM; // longueur des perpendiculaires tracées à l'équerre (plus de 3 cm)
const cf1RectDemo = cf1Etapes('cf1Rect', [
  'On veut tracer un rectangle ABCD de longueur 5 cm et de largeur 3 cm.',
  '1. Avec la règle, on trace le segment [AB] de 5 cm : A sur le 0, B sur le 5.',
  '2. On pose l\'équerre : son angle droit sur A, un côté le long du segment [AB]. On trace un trait le long de l\'autre côté, un peu plus long que 3 cm. On ne mesure pas avec l\'équerre : son 0 n\'est souvent pas pile dans l\'angle.',
  '3. On mesure avec la règle, le 0 sur A, le long de ce trait : on place D à 3 cm.',
  '4. On fait de même en B : l\'angle droit de l\'équerre sur B, un côté le long du segment [BA]. On trace un trait le long de l\'autre côté.',
  '5. Avec la règle, le 0 sur B, on place C à 3 cm.',
  '6. Avec la règle, on relie D et C.',
  '7. Le rectangle ABCD est tracé : quatre angles droits, et des côtés de 5 cm et de 3 cm. Les bouts de trait en trop sont des traits de construction.',
], k => {
  const A = CF1_R_A, B = CF1_R_B, C = CF1_R_C, D = CF1_R_D, hA = [A[0], A[1] - CF1_R_PERP], hB = [B[0], B[1] - CF1_R_PERP];
  let h = '';
  if(k >= 1) h += cf1Seg(A, B, CF1_ENCRE, 2.2);
  // Perpendiculaires tracées à l'équerre : en entier tant qu'on construit, puis le côté en gras et le reste en trait fin.
  if(k >= 2) h += k >= 7 ? cf1Seg(D, hA, CF1_GRIS, 1.2) + cf1Seg(A, D, CF1_ENCRE, 2.2) : cf1Seg(A, hA, CF1_ENCRE, 2);
  if(k >= 4) h += k >= 7 ? cf1Seg(C, hB, CF1_GRIS, 1.2) + cf1Seg(B, C, CF1_ENCRE, 2.2) : cf1Seg(B, hB, CF1_ENCRE, 2);
  if(k >= 6) h += cf1Seg(D, C, CF1_ENCRE, 2.2);
  if(k >= 3 && k < 6) h += cf1Trait(D, [0, 1], CF1_ROUGE);
  if(k >= 5 && k < 6) h += cf1Trait(C, [0, 1], CF1_ROUGE);
  if(k === 1) h += cf1Regle(A, 0) + cf1Crayon(B, 0);
  if(k === 2) h += cf1Equerre(A, -90) + cf1Crayon(hA, 0);
  if(k === 3) h += cf1Regle(A, -90) + cf1Crayon(D, 0);
  // En B, l'équerre tournée d'un demi-tour : son grand côté le long de [BA], son petit côté monte.
  if(k === 4) h += cf1Equerre(B, 180) + cf1Crayon(hB, 0);
  if(k === 5) h += cf1Regle(B, -90) + cf1Crayon(C, 0);
  if(k === 6) h += cf1Regle(D, 0) + cf1Crayon(C, 0);
  if(k >= 7) h += [[A, B, D], [B, C, A], [C, D, B], [D, A, C]].map(([S, P, Q]) => cf1AngleDroit(S, P, Q, CF1_VERT)).join('')
    + cf1Lab([(A[0] + B[0]) / 2, A[1]], 0, 20, '5 cm', CF1_ROUGE, 12) + cf1Lab([B[0], (B[1] + C[1]) / 2], 26, 4, '3 cm', CF1_ROUGE, 12);
  if(k >= 1) h += cf1Lab(A, -12, 16, 'A') + cf1Lab(B, 12, 16, 'B'); // A et B naissent avec le segment tracé à la règle
  if(k >= 3) h += cf1Lab(D, -12, -4, 'D');
  if(k >= 5) h += cf1Lab(C, 12, -4, 'C');
  return h;
});

// M3 : tracer un triangle équilatéral de côté 4 cm (règle et compas).
const CF1_T_A = [90, 215], CF1_T_B = [90 + 4 * CF1_CM, 215], CF1_T_C = [90 + 2 * CF1_CM, 215 - 4 * CF1_CM * Math.sqrt(3) / 2];
const cf1TriDemo = cf1Etapes('cf1Tri', [
  'On veut tracer un triangle équilatéral ABC de côté 4 cm : ses trois côtés mesurent 4 cm.',
  '1. Avec la règle, on trace le segment [AB] de 4 cm : A sur le 0, B sur le 4.',
  '2. On prend la longueur AB au compas : pointe sèche sur A, on écarte jusqu\'à ce que la mine soit sur B.',
  '3. Sans changer l\'écartement, pointe sèche sur A, on trace un petit arc au-dessus du segment : ses points sont à 4 cm de A.',
  '4. Même écartement, pointe sèche sur B : on trace un deuxième arc qui coupe le premier.',
  '5. Le point où les deux arcs se coupent est à 4 cm de A et à 4 cm de B : c\'est C. On trace les segments [AC] et [BC] à la règle.',
  '6. Le triangle ABC est équilatéral : AB = AC = BC = 4 cm.',
], k => {
  const A = CF1_T_A, B = CF1_T_B, C = CF1_T_C, r = 4 * CF1_CM;
  let h = '';
  if(k >= 1) h += cf1Seg(A, B, CF1_ENCRE, 2.2);
  if(k >= 3) h += cf1Arc(A, r, 45, 75, CF1_ORANGE, 1.8);
  if(k >= 4) h += cf1Arc(B, r, 105, 135, CF1_ORANGE, 1.8);
  if(k >= 5) h += cf1Seg(A, C, CF1_ENCRE, 2.2) + cf1Seg(B, C, CF1_ENCRE, 2.2);
  if(k === 1) h += cf1Regle(A, 0) + cf1Crayon(B, 0);
  if(k === 2) h += cf1Compas(A, r, 0);
  if(k === 3) h += cf1Compas(A, r, 60);
  if(k === 4) h += cf1Compas(B, r, 120, true);
  // Règle posée de C vers A (graduation 0 sur C) : son corps reste à l'extérieur du triangle.
  if(k === 5){ const ang = Math.atan2(A[1] - C[1], A[0] - C[0]) * 180 / Math.PI; h += cf1Regle(C, ang) + cf1Crayon(A, 0); }
  if(k >= 6) h += cf1Traits(A, B, 2, CF1_ORANGE) + cf1Traits(A, C, 2, CF1_ORANGE) + cf1Traits(B, C, 2, CF1_ORANGE);
  // A et B n'existent qu'une fois le segment tracé à la règle.
  if(k >= 1) h += cf1Lab(A, -12, 16, 'A') + cf1Lab(B, 12, 16, 'B');
  if(k >= 5) h += cf1Lab(C, 16, -12, 'C');
  return h;
});

// M4 (jeu) : reconnaître une figure à son codage.
const CF1_JEU_NOMS = Object.keys(CF1_FORMES);
let cf1Jeu = { nom: null, score: 0, total: 0, repondu: false };
function cf1JeuNouveau(){
  let nom; do { nom = CF1_JEU_NOMS[Math.floor(Math.random() * CF1_JEU_NOMS.length)]; } while(nom === cf1Jeu.nom);
  cf1Jeu.nom = nom; cf1Jeu.repondu = false;
  const cols = [CF1_BLEU, CF1_VERT, CF1_ORANGE, CF1_VIOLET];
  const svg = document.getElementById('cf1-jeuSvg'); if(svg) svg.innerHTML = cf1Forme(nom, Math.round(Math.random() * 330), cols[Math.floor(Math.random() * cols.length)]);
  const n = document.getElementById('cf1-jeuNote'); if(n){ n.textContent = 'Regarde bien les codages. Quelle est cette figure ?'; n.style.color = ''; }
  document.querySelectorAll('#cf1-jeuBtns button').forEach(b => { b.disabled = false; b.classList.add('secondary'); });
}
function cf1JeuRepondre(nom, btn){
  if(cf1Jeu.repondu) return;
  cf1Jeu.repondu = true; cf1Jeu.total++;
  const ok = nom === cf1Jeu.nom; if(ok) cf1Jeu.score++;
  const aide = { 'triangle rectangle': 'un triangle avec un angle droit (petit carré)', 'triangle isocèle': 'un triangle avec deux côtés codés pareil', 'triangle équilatéral': 'un triangle avec ses trois côtés codés pareil',
    'rectangle': 'un quadrilatère avec quatre angles droits', 'losange': 'un quadrilatère avec quatre côtés codés pareil', 'carré': 'quatre angles droits ET quatre côtés codés pareil' };
  const n = document.getElementById('cf1-jeuNote');
  n.innerHTML = (ok ? '✔ Bravo ! ' : '✘ Non : ') + `c'est un <b>${cf1Jeu.nom}</b> : ${aide[cf1Jeu.nom]}. <span style="color:${CF1_GRIS};">(${cf1Jeu.score} / ${cf1Jeu.total})</span>`;
  n.style.color = ok ? CF1_VERT : '#A83C1F';
  document.querySelectorAll('#cf1-jeuBtns button').forEach(b => { b.disabled = true; if(b.dataset.nom === cf1Jeu.nom) b.classList.remove('secondary'); });
}

document.getElementById('methode-demo-cm1-construction-figures').innerHTML = `
${cf1MethodeHtml('cf1Cercle', 'Tracer un cercle au compas', 'Clique sur « Étape suivante » pour voir le compas en action.', '0 0 400 250', 400)}
${cf1MethodeHtml('cf1Rect', 'Tracer un rectangle avec la règle et l\'équerre', 'Un rectangle a quatre angles droits : c\'est l\'équerre qui les donne.', '0 0 330 240', 380)}
${cf1MethodeHtml('cf1Tri', 'Tracer un triangle équilatéral avec la règle et le compas', 'Le compas sert aussi à reporter une longueur.', '0 0 330 250', 380)}
<div class="sub-header"><span class="letter">M</span><h4>Jeu : reconnais la figure grâce à son codage</h4></div>
<div class="figure-wrap">
  <svg id="cf1-jeuSvg" viewBox="0 0 220 160" style="width:100%;max-width:260px;display:block;margin:6px auto;background:#fff;"></svg>
  <div id="cf1-jeuBtns" class="figure-toolbar" style="justify-content:center;">
    ${CF1_JEU_NOMS.map(n => `<button type="button" class="btn secondary" data-nom="${n}" onclick="cf1JeuRepondre('${n}', this)">${n}</button>`).join('')}
  </div>
  <p class="step-note" id="cf1-jeuNote" style="text-align:center;"></p>
  <div class="figure-toolbar" style="justify-content:center;"><button class="btn" onclick="cf1JeuNouveau()">Nouvelle figure →</button></div>
</div>
`;

/* ---------------- Exercices ---------------- */
// lignes : la correction rédigée (cm1Redac), ou une liste de lignes.
function cf1Exo(n, enonce, lignes, fig, figCorr){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="cf1-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cf1-correction-${n}">
      ${typeof lignes === 'string' ? lignes : `<div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>`}
      ${figCorr || ''}
    </div>
  </div>`;
}
function cf1ExoFig1(){
  const A = [30, 40], B = [150, 40], E = [40, 120], F = [120, 95], G = [200, 70], K = [190, 130];
  const u = cf1Unit(E, G), L = [E[0] - u[0] * 25, E[1] - u[1] * 25], R = [G[0] + u[0] * 25, G[1] + u[1] * 25];
  return cf1Svg(cf1Seg(A, B, CF1_BLEU, 2.4) + cf1Trait(A, [1, 0], CF1_BLEU) + cf1Trait(B, [1, 0], CF1_BLEU) + cf1Lab(A, 0, -10, 'A') + cf1Lab(B, 0, -10, 'B')
    + cf1Seg(L, R, CF1_VERT, 2.4) + [E, F, G].map(P => cf1Trait(P, u, CF1_VERT)).join('') + cf1Lab(E, -4, 22, 'E') + cf1Lab(F, -2, 22, 'F') + cf1Lab(G, 0, 22, 'G')
    + cf1Croix(K, CF1_ROUGE) + cf1Lab(K, 12, 5, 'K', CF1_ROUGE), '0 0 250 160', 280);
}
function cf1ExoFig2(){
  const O = [130, 100], r = 70, A = cf1Pc(O, r, 160), B = cf1Pc(O, r, 340), C = cf1Pc(O, r, 75), D = cf1Pc(O, r, 250), E = cf1Pc(O, r, 300);
  let h = cf1Cercle(O, r) + cf1Seg(A, B, CF1_ENCRE, 2) + cf1Seg(O, C, CF1_ENCRE, 2) + cf1Seg(D, E, CF1_ENCRE, 2);
  h += [[A, 'A'], [B, 'B'], [C, 'C'], [D, 'D'], [E, 'E']].map(([P, n]) => { const u = cf1Unit(O, P); return cf1Trait(P, [-u[1], u[0]]) + cf1Lab(P, u[0] * 15, u[1] * 15 + 5, n); }).join('');
  return cf1Svg(h + cf1Croix(O) + cf1Lab(O, 12, 18, 'O'), '0 0 260 200', 260);
}
function cf1ExoFig4(){
  const O = [110, 95], r = 3 * CF1_CM * 0.9, P = cf1Pc(O, r, 30), Q = cf1Pc(O, 5 * CF1_CM * 0.9, 150), R = cf1Pc(O, 2 * CF1_CM * 0.9, 250);
  return cf1Svg(`<circle cx="${O[0]}" cy="${O[1]}" r="${r.toFixed(1)}" fill="rgba(12,91,160,.08)" stroke="${CF1_BLEU}" stroke-width="2"/>`
    + cf1Croix(O) + cf1Lab(O, -12, 18, 'O') + [[P, 'P'], [Q, 'Q'], [R, 'R']].map(([X, n]) => cf1Croix(X, CF1_ROUGE) + cf1Lab(X, 12, -6, n, CF1_ROUGE)).join(''), '0 0 230 190', 240);
}
function cf1ExoFigNature(noms, angles, cols){
  return `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;">${noms.map((n, i) => `<div style="text-align:center;min-width:130px;">${cf1FormeSvg(n, angles[i], cols[i], null, 170)}<b>Figure ${i + 1}</b></div>`).join('')}</div>`;
}
function cf1ExoFig10(){
  const A = [40, 110], B = [40 + 6 * CF1_CM * 0.8, 110], M = [(A[0] + B[0]) / 2, 110], r = 3 * CF1_CM * 0.8;
  return cf1Svg(cf1Cercle(M, r, CF1_BLEU) + cf1Seg(A, B, CF1_ENCRE, 2) + [A, M, B].map(P => cf1Trait(P, [1, 0])).join('') + cf1Traits(A, M, 1, CF1_ROUGE) + cf1Traits(M, B, 1, CF1_ROUGE)
    + cf1Lab(A, -10, 20, 'A') + cf1Lab(M, 0, 22, 'M') + cf1Lab(B, 10, 20, 'B'), '0 0 230 200', 240);
}

document.getElementById('exos-demo-cm1-construction-figures').innerHTML = `
<div class="redaction-block">
  <h3>Exercices</h3>
  ${cf1Exo(1, `Observe la figure.${cm1Liste(['Comment s\'appelle le trait bleu ?', 'Comment s\'appelle le trait vert ?', 'Cite trois points alignés.', 'Le point K est-il sur la droite verte ?'])}`,
    cm1Redac('Le trait bleu', 'Il s\'arrête en A et en B.', 'Le trait bleu est le segment [AB].')
    + cm1Redac('Le trait vert', 'Il continue des deux côtés.', 'Le trait vert est une droite : on peut la nommer droite (EF), droite (EG) ou droite (FG).')
    + cm1Redac('Points alignés', 'E, F et G sont sur la même droite.', 'Les points E, F et G sont alignés.')
    + cm1Redac('Le point K', 'K n\'est pas sur la droite verte.', 'Non : E, F et K ne sont pas alignés.'), cf1ExoFig1())}
  ${cf1Exo(2, `Voici un cercle de centre O.${cm1Liste(['Cite un rayon.', 'Cite un diamètre.', 'Cite une corde qui n\'est pas un diamètre.', 'Le rayon mesure 3 cm : combien mesure le diamètre [AB] ?'])}`,
    cm1Redac('Un rayon', 'Le segment [OC] va du centre O à un point du cercle.', 'Le segment [OC] est un rayon.')
    + cm1Redac('Un diamètre', 'Le segment [AB] relie deux points du cercle en passant par O.', 'Le segment [AB] est un diamètre.')
    + cm1Redac('Une corde', 'Le segment [DE] relie deux points du cercle sans passer par O.', 'Le segment [DE] est une corde.')
    + cm1Redac('Longueur du diamètre', '2 × 3 cm = 6 cm', 'Le diamètre mesure deux rayons : AB = 6 cm.'), cf1ExoFig2())}
  ${cf1Exo(3, `Complète.${cm1Liste(['Un cercle a un rayon de 7 cm : son diamètre mesure … cm.', 'Un cercle a un diamètre de 10 cm : son rayon mesure … cm.', 'Une roue de vélo a un diamètre de 60 cm : quel est son rayon ?'])}`,
    cm1Redac('Diamètre du premier cercle', '2 × 7 cm = 14 cm', 'Le diamètre mesure 14 cm.')
    + cm1Redac('Rayon du deuxième cercle', '10 cm ÷ 2 = 5 cm', 'Le rayon est la moitié du diamètre : il mesure 5 cm.')
    + cm1Redac('Rayon de la roue', '60 cm ÷ 2 = 30 cm', 'Le rayon de la roue mesure 30 cm, du moyeu au pneu.'))}
  ${cf1Exo(4, `Le point P est à 3 cm de O, le point Q à 5 cm de O et le point R à 2 cm de O. On trace le cercle de centre O et de rayon 3 cm.${cm1Liste(['Quel point est sur le cercle ?', 'Quels points sont dans le disque ?', 'Quel point est à l\'extérieur ?'])}`,
    cm1Redac('Point sur le cercle', 'OP = 3 cm, exactement le rayon', 'Le point P est sur le cercle.')
    + cm1Redac('Points dans le disque', 'OR = 2 cm et OP = 3 cm : pas plus que le rayon', 'R est à l\'intérieur du disque et P sur son bord : les deux sont dans le disque.')
    + cm1Redac('Point à l\'extérieur', 'OQ = 5 cm, plus que le rayon', 'Le point Q est à l\'extérieur du disque.'), '', cf1ExoFig4())}
  ${cf1Exo(5, 'Regarde les codages. Quelle est la nature de chaque triangle ?',
    cm1Redac('Figure 1', 'Deux côtés sont codés pareil.', 'C\'est un triangle isocèle.')
    + cm1Redac('Figure 2', 'Un petit carré code un angle droit.', 'C\'est un triangle rectangle.')
    + cm1Redac('Figure 3', 'Les trois côtés sont codés pareil.', 'C\'est un triangle équilatéral.'), cf1ExoFigNature(['triangle isocèle', 'triangle rectangle', 'triangle équilatéral'], [25, 200, 80], [CF1_BLEU, CF1_VERT, CF1_ORANGE]))}
  ${cf1Exo(6, `Sans dessiner, trouve la nature de chaque triangle.${cm1Liste(['ABC : AB = 5 cm, BC = 5 cm et AC = 5 cm.', 'DEF : DE = 4 cm, DF = 4 cm et EF = 6 cm.', 'GHI a un angle droit en H.', 'JKL : JK = 3 cm, KL = 4 cm et JL = 6 cm, sans angle droit.'])}`,
    cm1Redac('Triangle ABC', 'Trois côtés de même longueur', 'ABC est un triangle équilatéral.')
    + cm1Redac('Triangle DEF', 'DE = DF', 'DEF a deux côtés de même longueur : c\'est un triangle isocèle.')
    + cm1Redac('Triangle GHI', 'Un angle droit en H', 'GHI est un triangle rectangle.')
    + cm1Redac('Triangle JKL', 'Trois longueurs différentes et pas d\'angle droit', 'JKL n\'est pas un triangle particulier.'))}
  ${cf1Exo(7, 'Regarde les codages. Quelle est la nature de chaque quadrilatère ?',
    cm1Redac('Figure 1', 'Quatre côtés codés pareil, pas d\'angle droit codé.', 'C\'est un losange.')
    + cm1Redac('Figure 2', 'Quatre angles droits et quatre côtés codés pareil.', 'C\'est un carré.')
    + cm1Redac('Figure 3', 'Quatre angles droits.', 'C\'est un rectangle.'), cf1ExoFigNature(['losange', 'carré', 'rectangle'], [0, 20, 160], [CF1_BLEU, CF1_ORANGE, CF1_VERT]))}
  ${cf1Exo(8, `Vrai ou faux ?${cm1Liste(['Un carré est un rectangle.', 'Un rectangle est toujours un carré.', 'Un losange a toujours quatre angles droits.', 'Un triangle équilatéral est aussi isocèle.'])}`,
    cm1Redac('Un carré est un rectangle', 'Un carré a quatre angles droits.', 'Vrai.')
    + cm1Redac('Un rectangle est toujours un carré', 'Un rectangle de 5 cm sur 3 cm n\'a pas quatre côtés égaux.', 'Faux.')
    + cm1Redac('Un losange a toujours quatre angles droits', 'Ses côtés sont égaux, mais ses angles ne sont pas forcément droits.', 'Faux (s\'il a quatre angles droits, c\'est un carré).')
    + cm1Redac('Un triangle équilatéral est isocèle', 'Il a trois côtés égaux, donc au moins deux.', 'Vrai.'))}
  ${cf1Exo(9, 'Léo a tracé un quadrilatère et l\'a nommé MNOP en faisant le tour. Parmi ces noms, lesquels désignent aussi son quadrilatère : NOPM, MOPN, PONM, OPMN ?',
    cm1Redac('Noms possibles', 'On cite les sommets dans l\'ordre du tour, dans un sens ou dans l\'autre.', 'NOPM, PONM et OPMN conviennent. MOPN ne convient pas : après M, on ne peut pas aller directement en O, car M est relié à N et à P.'))}
  ${cf1Exo(10, `Programme de construction : trace un segment [AB] de 6 cm et place son milieu M. Trace le cercle de centre M qui passe par A.${cm1Liste(['Quel est le rayon du cercle ?', 'Le cercle passe-t-il par B ?', 'Que représente le segment [AB] pour ce cercle ?'])}`,
    cm1Redac('Rayon du cercle', '6 cm ÷ 2 = 3 cm', 'M est le milieu du segment [AB], donc le segment [MA] mesure 3 cm : le rayon du cercle est 3 cm.')
    + cm1Redac('Le point B', 'MB = 3 cm', 'B est à 3 cm du centre : B est sur le cercle.')
    + cm1Redac('Le segment [AB]', 'Il relie deux points du cercle en passant par le centre M.', 'Le segment [AB] est un diamètre du cercle : il mesure 6 cm, deux rayons.'), '', cf1ExoFig10())}
</div>
`;

document.getElementById('histoire-demo-cm1-construction-figures').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : le premier problème d'Euclide</div>
  Il y a environ 2 300 ans, à Alexandrie, en Égypte, un savant grec nommé <b>Euclide</b> a écrit un livre de géométrie célèbre : <i>Les Éléments</i>. Pendant plus de 2 000 ans, c'est avec ce livre qu'on a appris la géométrie dans le monde entier !<br><br>
  Et sais-tu quel est le tout premier problème de ce livre ? <b>Construire un triangle équilatéral</b>… exactement comme dans la méthode de ce chapitre : on trace un segment, puis deux cercles de même rayon centrés sur ses extrémités, et on relie le point où ils se coupent.<br><br>
  Euclide n'utilisait que deux instruments : une règle <b>sans graduations</b> et un compas. Pas d'équerre ni de rapporteur ! Le mot « diamètre » vient d'ailleurs du grec : <i>dia</i> veut dire « à travers » et <i>metron</i> « mesure » : le diamètre, c'est la mesure qui traverse le cercle.
</div>
`;

DEMO_QUIZZES['cm1|Construction de figures'] = [
  { q: 'Comment appelle-t-on le trait droit qui va du point A au point B et s\'arrête à ces deux points ?', opts: ['La droite (AB)', 'Le segment [AB]', 'Le cercle AB'], correct: 1 },
  { q: 'Le rayon d\'un cercle mesure 4 cm. Combien mesure son diamètre ?', opts: ['2 cm', '4 cm', '8 cm'], correct: 2 },
  { q: 'Un triangle qui a trois côtés de même longueur est…', opts: ['rectangle', 'équilatéral', 'isocèle seulement'], correct: 1 },
  { q: 'Un quadrilatère qui a quatre angles droits est…', opts: ['un rectangle', 'un losange', 'un triangle'], correct: 0 },
  { q: 'Que signifie un petit carré dessiné dans un angle ?', opts: ['Deux côtés de même longueur', 'Un angle droit', 'Le milieu'], correct: 1 },
  { q: 'Quel instrument utilise-t-on pour tracer un cercle ?', opts: ['L\'équerre', 'Le compas', 'Le rapporteur'], correct: 1 },
  { q: 'Un carré est…', opts: ['un rectangle et un losange à la fois', 'seulement un losange', 'un triangle'], correct: 0 },
];

DEMO_REGISTRY['cm1|Construction de figures'] = { cours: 'cours-demo-cm1-construction-figures', methode: 'methode-demo-cm1-construction-figures', exos: 'exos-demo-cm1-construction-figures', histoire: 'histoire-demo-cm1-construction-figures',
  init: () => { cf1Voc(null); cf1CercleDemo.reset(); cf1RectDemo.reset(); cf1TriDemo.reset(); cf1JeuNouveau(); cmAnimDessiner('cm1-cf-compas'); } };

/* ---- Planches d'exercices imprimables (planches.js) ----
   Notations toujours expliquées (« le segment [AB] », « le cercle de centre O ») ; pas de rapporteur. */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const K = '#1F3A5C', ROUGE = '#E35D3A', BLEU = '#2EA8C9', VERT = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
const P = (p, n, dx, dy, c) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.8" fill="${c || K}"/>` + (n ? cmT(p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -6 : dy), n, { fs: 13, c: c || K }) : '');
const Cx = (o, r, c, w) => `<circle cx="${o[0]}" cy="${o[1]}" r="${r}" fill="none" stroke="${c || K}" stroke-width="${w || 2}"/>`;
const Pg = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || 'none'}" stroke="${c || K}" stroke-width="2" stroke-linejoin="round"/>`;
// Codage : n petits traits au milieu d'un côté (longueurs égales) ; angle droit en p (vers u et v).
function tr(a, b, n, c){
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, l = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / l, uy = (b[1] - a[1]) / l;
  let s = ''; for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2) * 4; s += L([mx + ux * o - uy * 5, my + uy * o + ux * 5], [mx + ux * o + uy * 5, my + uy * o - ux * 5], c || ROUGE, 1.6); } return s;
}
function ad(p, u, v, c){ const n = (q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / l * 9, (q[1] - p[1]) / l * 9]; }, a = n(u), b = n(v);
  return `<polyline points="${p[0] + a[0]},${p[1] + a[1]} ${p[0] + a[0] + b[0]},${p[1] + a[1] + b[1]} ${p[0] + b[0]},${p[1] + b[1]}" fill="none" stroke="${c || ROUGE}" stroke-width="1.6"/>`; }
// Quadrillage w × h carreaux de k px, dessin en coordonnées de carreaux.
function Q(w, h, k, f){ const g = (x, y) => [1 + x * k, 1 + y * k]; let s = '';
  for(let x = 0; x <= w; x++) s += L(g(x, 0), g(x, h), '#C6D2DE', .8); for(let y = 0; y <= h; y++) s += L(g(0, y), g(w, y), '#C6D2DE', .8);
  return S(w * k + 2, h * k + 2, s + (f ? f(g) : ''), w * k + 2); }
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}${t ? `<span>${t}</span>` : ''}</span>`;
const D = h => `<span class="cm-fig-d">${h}</span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-end;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;

// Figures du cours
const segM = S(250, 92, L([20, 40], [220, 40]) + tr([20, 40], [120, 40], 1) + tr([120, 40], [220, 40], 1) + P([20, 40], 'A', -4, -10) + P([220, 40], 'B', 4, -10) + P([120, 40], 'M', 0, -12) + P([175, 40], 'N', 0, -12) + P([90, 78], 'P', 10, 4), 250);
const C0 = [80, 72], RR = 55, Cc = [80 + RR * Math.cos(-Math.PI / 3), 72 + RR * Math.sin(-Math.PI / 3)];
const cercle = S(170, 140, Cx(C0, RR) + L([C0[0] - RR, 72], [C0[0] + RR, 72]) + L(C0, Cc) + P(C0, 'O', -2, 16) + P([C0[0] - RR, 72], 'A', -12, 4) + P([C0[0] + RR, 72], 'B', 6, 4) + P(Cc, 'C', 6, -4) + P([98, 100], 'D', 8, 4) + P([150, 20], 'E', 6, 4), 140);
const OA = (sol) => S(200, 100, (sol ? Cx([100, 50], 42, VERT) : '') + P([100, 50], 'O', -4, 16) + P([142, 50], 'A', 6, 4), 170);
// Maison sur quadrillage : rectangle 4 × 3 et toit triangulaire.
const maison = (dx, dy) => g => { const m = (x, y) => g(x + dx, y + dy); return Pg([m(0, 2), m(4, 2), m(4, 5), m(0, 5)], BLEU) + Pg([m(0, 2), m(2, 0), m(4, 2)], ROUGE) + L(m(1, 5), m(1, 4), K, 2) + L(m(1, 4), m(2, 4), K, 2) + L(m(2, 4), m(2, 5), K, 2); };
// La maison en segments de quadrillage (clé de l'exercice à l'écran).
const maisonSegs = (dx, dy) => [[0, 2, 4, 2], [4, 2, 4, 5], [4, 5, 0, 5], [0, 5, 0, 2], [0, 2, 2, 0], [2, 0, 4, 2], [1, 5, 1, 4], [1, 4, 2, 4], [2, 4, 2, 5]].map(([a, b, c, d]) => [a + dx, b + dy, c + dx, d + dy]);

PLANCHES['cm1|Construction de figures'] = [
  { titre: 'Segments, milieu et cercle', duree: '35 min',
    attendus: ['Utiliser le vocabulaire : point, segment, milieu, droite', 'Connaître le centre, le rayon et le diamètre d\'un cercle', 'Tracer un cercle au compas, reproduire une figure'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Observe la figure. Les petits traits rouges montrent deux longueurs égales.${segM}`,
        eleve: plListe(['Le milieu du segment [AB] est le point ' + B(2) + '.', 'Le point ' + B(2) + ' est sur le segment [AB], mais ce n\'est pas son milieu.', 'Le point ' + B(2) + ' n\'est pas sur le segment [AB].']),
        corr: plListe(['Le milieu du segment [AB] est le point ' + R('M') + '.', 'Le point ' + R('N') + ' est sur le segment [AB], mais ce n\'est pas son milieu.', 'Le point ' + R('P') + ' n\'est pas sur le segment [AB].']) },
      { etoiles: 1, col: 1, consigne: `Observe le cercle de centre O.<div style="text-align:center;">${cercle}</div>`,
        eleve: plListe(['Le segment [OC] est un ' + B(6) + ' du cercle.', 'Le segment [AB] est un ' + B(6) + ' du cercle.', 'Le point ' + B(2) + ' est à l\'intérieur du cercle.', 'Le point ' + B(2) + ' est à l\'extérieur du cercle.']),
        corr: plListe(['Le segment [OC] est un ' + R('rayon') + ' du cercle.', 'Le segment [AB] est un ' + R('diamètre') + ' du cercle.', 'Le point ' + R('D') + ' est à l\'intérieur du cercle.', 'Le point ' + R('E') + ' est à l\'extérieur du cercle.']) },
      { etoiles: 2, col: 1, consigne: 'Complète. Le diamètre mesure deux fois le rayon.',
        eleve: plListe(['rayon : 3 cm ; diamètre : ' + B(2) + ' cm', 'rayon : 7 cm ; diamètre : ' + B(2) + ' cm', 'diamètre : 10 cm ; rayon : ' + B(2) + ' cm', 'diamètre : 8 cm ; rayon : ' + B(2) + ' cm']),
        corr: plListe(['rayon : 3 cm ; diamètre : ' + R(6) + ' cm', 'rayon : 7 cm ; diamètre : ' + R(14) + ' cm', 'diamètre : 10 cm ; rayon : ' + R(5) + ' cm', 'diamètre : 8 cm ; rayon : ' + R(4) + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Avec ton compas, trace le cercle de centre O qui passe par le point A.',
        eleve: `<div style="text-align:center;">${OA(false)}</div>`,
        corr: `<div style="text-align:center;">${OA(true)}</div>` },
      { etoiles: 2, consigne: 'Reproduis la maison sur le quadrillage de droite, en commençant par le point rouge.',
        eleve: duo([col(Q(6, 7, 17, maison(1, 1)), 'Le modèle'), col(plX(Q(8, 7, 17, g => P(g(2, 6), '', 0, 0, ROUGE)), { t: 'seg', k: 17, ox: 1, oy: 1, w: 8, h: 7, att: maisonSegs(2, 1) }), 'À toi !')]),
        corr: duo([col(Q(6, 7, 17, maison(1, 1)), 'Le modèle'), col(Q(8, 7, 17, g => maison(2, 1)(g) + P(g(2, 6), '', 0, 0, ROUGE)), 'La reproduction')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un segment [AB] de 6 cm. Place son milieu M. Trace le cercle de centre M qui passe par A.',
        corr: cm1Redac('Construction', { suite: ['Le milieu M est à 3 cm de A.', 'Compas piqué en M, ouvert jusqu\'à A.'] }, 'Le cercle passe aussi par B : le segment [AB] est un diamètre du cercle.',
          D(S(200, 110, Cx([100, 55], 48, VERT) + L([52, 55], [148, 55]) + tr([52, 55], [100, 55], 1) + tr([100, 55], [148, 55], 1) + P([52, 55], 'A', -12, 4) + P([148, 55], 'B', 6, 4) + P([100, 55], 'M', 0, -10), 180))) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une rosace : trace un cercle de rayon 3 cm. Reporte six fois le rayon sur le cercle, puis relie les six points.',
        corr: cm1Redac('Construction', { suite: ['Compas piqué sur le cercle, je trace un arc qui le coupe.', 'Je recommence depuis ce point, six fois.'] }, 'J\'obtiens un hexagone : ses six côtés mesurent 3 cm, comme le rayon.',
          D(S(130, 120, Cx([65, 60], 50, VERT) + Pg([0, 1, 2, 3, 4, 5].map(i => [65 + 50 * Math.cos(i * Math.PI / 3), 60 + 50 * Math.sin(i * Math.PI / 3)]), ROUGE) + P([65, 60], 'O', 0, 14), 120))) },
    ] },
  { titre: 'Triangles et quadrilatères particuliers', duree: '40 min',
    attendus: ['Reconnaître et nommer le carré, le rectangle, le losange et les triangles particuliers', 'Utiliser les codages : angle droit, longueurs égales', 'Terminer et construire une figure'],
    exos: (() => {
      const F = [
        ['losange', S(120, 96, Pg([[60, 6], [108, 48], [60, 90], [12, 48]], BLEU) + tr([60, 6], [108, 48], 1) + tr([108, 48], [60, 90], 1) + tr([60, 90], [12, 48], 1) + tr([12, 48], [60, 6], 1), 110)],
        ['triangle rectangle', S(120, 96, Pg([[16, 86], [16, 10], [106, 86]], BLEU) + ad([16, 86], [16, 10], [106, 86]), 110)],
        ['carré', S(120, 96, Pg([[20, 8], [100, 8], [100, 88], [20, 88]], BLEU) + ad([20, 88], [20, 8], [100, 88]) + ad([100, 8], [20, 8], [100, 88]) + [[[20, 8], [100, 8]], [[100, 8], [100, 88]], [[100, 88], [20, 88]], [[20, 88], [20, 8]]].map(([a, b]) => tr(a, b, 1)).join(''), 110)],
        ['triangle équilatéral', S(120, 96, Pg([[12, 86], [108, 86], [60, 3]], BLEU) + tr([12, 86], [108, 86], 1) + tr([108, 86], [60, 3], 1) + tr([60, 3], [12, 86], 1), 110)],
        ['rectangle', S(120, 96, Pg([[8, 20], [112, 20], [112, 76], [8, 76]], BLEU) + ad([8, 76], [8, 20], [112, 76]) + ad([112, 20], [8, 20], [112, 76]) + tr([8, 20], [112, 20], 2) + tr([8, 76], [112, 76], 2) + tr([8, 20], [8, 76], 1) + tr([112, 20], [112, 76], 1), 110)],
        ['triangle isocèle', S(120, 96, Pg([[25, 88], [95, 88], [60, 4]], BLEU) + tr([25, 88], [60, 4], 1) + tr([95, 88], [60, 4], 1), 110)],
      ];
      return [
      { etoiles: 1, consigne: 'Observe les codages, puis écris le nom de chaque figure.',
        eleve: plGrille(F.map(([, f], i) => col(f, `<b>${'ABCDEF'[i]}</b> : ${B(14)}`)), 3),
        corr: plGrille(F.map(([n, f], i) => col(f, `<b>${'ABCDEF'[i]}</b> : ${R(n)}`)), 3) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        eleve: plListe(['Un carré a 4 angles droits. <b>vrai · faux</b>', 'Un rectangle a 4 côtés égaux. <b>vrai · faux</b>', 'Un losange a 4 côtés égaux. <b>vrai · faux</b>', 'Un triangle équilatéral a 3 côtés égaux. <b>vrai · faux</b>']),
        corr: plListe([['Un carré a 4 angles droits. ', 'vrai'], ['Un rectangle a 4 côtés égaux. ', 'faux'], ['Un losange a 4 côtés égaux. ', 'vrai'], ['Un triangle équilatéral a 3 côtés égaux. ', 'vrai']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 2, col: 1, consigne: 'Qui suis-je ?',
        eleve: plListe(['4 côtés égaux et 4 angles droits : ' + B(10), '3 côtés et un angle droit : ' + B(10), '4 angles droits, côtés opposés égaux : ' + B(10), '3 côtés, dont deux égaux : ' + B(10)]),
        corr: plListe(['4 côtés égaux et 4 angles droits : ' + R('carré'), '3 côtés et un angle droit : ' + R('triangle rectangle'), '4 angles droits, côtés opposés égaux : ' + R('rectangle'), '3 côtés, dont deux égaux : ' + R('triangle isocèle')]) },
      { etoiles: 2, consigne: 'Termine chaque figure sur le quadrillage : place le dernier sommet, puis trace les côtés.',
        eleve: duo([col(plX(Q(6, 6, 17, g => L(g(1, 1), g(4, 1)) + L(g(4, 1), g(4, 4)) + P(g(1, 1), 'A', -8, -4) + P(g(4, 1), 'B', 6, -4) + P(g(4, 4), 'C', 6, 10)), { t: 'seg', k: 17, ox: 1, oy: 1, w: 6, h: 6, att: [[4, 4, 1, 4], [1, 4, 1, 1]] }), 'le carré ABCD'),
          col(plX(Q(7, 6, 17, g => P(g(1, 1), 'E', -8, -4) + P(g(6, 1), 'F', 6, -4) + P(g(6, 4), 'G', 6, 10)), { t: 'seg', k: 17, ox: 1, oy: 1, w: 7, h: 6, att: [[1, 1, 6, 1], [6, 1, 6, 4], [6, 4, 1, 4], [1, 4, 1, 1]] }), 'le rectangle EFGH'),
          col(plX(Q(6, 6, 17, g => L(g(3, 0), g(5, 3)) + L(g(5, 3), g(3, 6)) + P(g(3, 0), 'K', 8, 8) + P(g(5, 3), 'L', 8, 4) + P(g(3, 6), 'M', 8, 0)), { t: 'seg', k: 17, ox: 1, oy: 1, w: 6, h: 6, att: [[3, 6, 1, 3], [1, 3, 3, 0]] }), 'le losange KLMN')]),
        corr: duo([col(Q(6, 6, 17, g => Pg([g(1, 1), g(4, 1), g(4, 4), g(1, 4)], VERT) + P(g(1, 1), 'A', -8, -4) + P(g(4, 1), 'B', 6, -4) + P(g(4, 4), 'C', 6, 10) + P(g(1, 4), 'D', -8, 10, VERT)), 'le carré ABCD'),
          col(Q(7, 6, 17, g => Pg([g(1, 1), g(6, 1), g(6, 4), g(1, 4)], VERT) + P(g(1, 1), 'E', -8, -4) + P(g(6, 1), 'F', 6, -4) + P(g(6, 4), 'G', 6, 10) + P(g(1, 4), 'H', -8, 10, VERT)), 'le rectangle EFGH'),
          col(Q(6, 6, 17, g => Pg([g(3, 0), g(5, 3), g(3, 6), g(1, 3)], VERT) + P(g(3, 0), 'K', 8, 8) + P(g(5, 3), 'L', 8, 4) + P(g(3, 6), 'M', 8, 0) + P(g(1, 3), 'N', -10, 4, VERT)), 'le losange KLMN')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un rectangle de 5 cm de longueur et 3 cm de largeur. Explique comment tu traces les angles droits.',
        corr: cm1Redac('Construction', { suite: ['Je trace un côté de 5 cm.', 'À chaque bout, avec l\'équerre, un côté de 3 cm.'] }, 'Je relie les extrémités : le rectangle a 4 angles droits.',
          D(S(190, 100, Pg([[20, 15], [170, 15], [170, 85], [20, 85]], VERT) + ad([20, 85], [20, 15], [170, 85]) + ad([170, 85], [170, 15], [20, 85]) + cmT(95, 98, '5 cm', { fs: 11 }) + cmT(182, 54, '3 cm', { fs: 11, a: 'start' }), 170))) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un triangle équilatéral de 4 cm de côté. Aide-toi de ton compas.',
        corr: cm1Redac('Construction', { suite: ['Je trace le segment [AB] de 4 cm.', 'Compas ouvert de 4 cm : un arc depuis A, un arc depuis B.'] }, 'Les arcs se coupent en C : les trois côtés du triangle ABC mesurent 4 cm.',
          D(S(170, 120, `<path d="M 98.5 45.5 A 80 80 0 0 0 69.7 28.9" fill="none" stroke="${BLEU}" stroke-width="1.4" stroke-dasharray="4 3"/><path d="M 100.3 28.9 A 80 80 0 0 0 71.5 45.5" fill="none" stroke="${BLEU}" stroke-width="1.4" stroke-dasharray="4 3"/>` + Pg([[45, 105], [125, 105], [85, 35.7]], VERT) + tr([45, 105], [125, 105], 1) + tr([125, 105], [85, 35.7], 1) + tr([85, 35.7], [45, 105], 1) + P([45, 105], 'A', -12, 4) + P([125, 105], 'B', 6, 4) + P([85, 35.7], 'C', 6, -6), 160))) },
      ]; })() },
];
})();

/* ============================================================
   CHAPITRE : Espace (4e, G5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 112-114 : pyramide (vocabulaire, patron), cône de révolution
   (vocabulaire, patron), volume, repérage dans l'espace). Plan du manuel, titres reformulés,
   exemples nouveaux. Réutilise le moteur 3D de chapitres/5e/G7-espace.js (e5Vue, e5DessinSolide,
   e5DessinPolys, e5Rot, e5Point…) et svPyramide / svCone de chapitres/6e/G7-solides-volumes.js :
   ce fichier est donc chargé APRÈS ces deux-là (voir index.html). Utilise aussi r4Ex / R4_REM de
   chapitres/4e/N1-operations-relatifs.js.
   ============================================================ */

const ES4_BLEU = '#0C5BA0', ES4_ORANGE = '#E07B00', ES4_VERT = '#1E7B34', ES4_ENCRE = '#1C1B2E', ES4_VIOLET = '#8E44AD';
const ES4_ROUGE_AX = '#C0392B'; // couleur de l'axe des abscisses
const es4Tex = s => `<span class="tex"${s.length < 32 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const es4N = (v, d) => String(Math.round(v * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).replace('.', ',');
const es4Deux = (a, b) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 18px;align-items:center;">${a}${b}</div>`;

/* ---- Figure d'un solide avec étiquettes et segments supplémentaires (hauteur, génératrice…) ---- */
// etiq : [point 3D, texte, dx, dy, couleur] ; segs : [P, Q, couleur, pointillés?]
function es4Fig(S, yaw, pitch, e, cx, cy, etiq, segs, vb, max){
  let h = e5DessinSolide(S, yaw, pitch, e, cx, cy);
  (segs || []).forEach(([P, Q, c, pt]) => { const p = e5Point(P, yaw, pitch, e, cx, cy), q = e5Point(Q, yaw, pitch, e, cx, cy); h += `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}" stroke="${c}" stroke-width="2.6"${pt ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`; });
  (etiq || []).forEach(([P, t, dx, dy, c]) => { const q = e5Point(P, yaw, pitch, e, cx, cy); h += `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="2.2" fill="${c || ES4_ENCRE}"/><text x="${(q[0] + (dx || 0)).toFixed(1)}" y="${(q[1] + (dy || 0)).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="${c || ES4_ENCRE}">${t}</text>`; });
  return `<svg viewBox="${vb || '0 0 300 220'}" style="width:100%;max-width:${max || 300}px;display:block;margin:6px auto;">${h}</svg>`;
}
const ES4_RECT = [[-1.8, -1.2], [1.8, -1.2], [1.8, 1.2], [-1.8, 1.2]];
// Solides de la méthode 1 (déclarés ici : la liste sert à construire le menu de l'onglet Méthode).
const ES4_SOLIDES = [
  { nom: 'Pyramide à base rectangulaire', s: () => svPyramide(ES4_RECT, 3), h: 3, c: '5 faces (1 base rectangulaire + 4 triangles) · 8 arêtes · 5 sommets' },
  { nom: 'Pyramide régulière à base carrée', s: () => svPyramide(e5Regulier(4, 2, Math.PI / 4), 3), h: 3, c: '5 faces · 8 arêtes · 5 sommets ; les 4 faces latérales sont des triangles isocèles superposables' },
  { nom: 'Pyramide régulière à base hexagonale', s: () => svPyramide(e5Regulier(6, 1.9), 3), h: 3, c: '7 faces (1 base hexagonale + 6 triangles) · 12 arêtes · 7 sommets' },
  { nom: 'Tétraèdre (pyramide à base triangulaire)', s: () => svPyramide(e5Regulier(3, 1.9, Math.PI / 2), 2.7), h: 2.7, c: '4 faces, toutes triangulaires · 6 arêtes · 4 sommets' },
  { nom: 'Cône de révolution', s: () => svCone(1.7, 3.2), h: 3.2, c: '1 base (un disque) et une surface courbe · 1 sommet · pas d\'arête' },
];
function es4FigPyramide(){
  const S = svPyramide(ES4_RECT, 3), y = -0.55, p = 0.33, e = 36, cx = 150, cy = 158;
  const n = ['E', 'F', 'G', 'H'], et = ES4_RECT.map((q, i) => [[q[0], q[1], 0], n[i], [ -14, 14, 14, -12][i], [8, 12, 4, -4][i]]);
  return es4Fig(S, y, p, e, cx, cy, et.concat([[[0, 0, 3], 'S', 0, -9, ES4_ORANGE], [[0, 0, 0], 'O', 12, 12, ES4_VIOLET]]), [[[0, 0, 3], [0, 0, 0], ES4_VIOLET, true], [[0, 0, 3], [1.8, -1.2, 0], ES4_ORANGE]], '0 0 300 215');
}
function es4FigCone(){
  const S = svCone(1.7, 3), y = -0.5, p = 0.3, e = 38, cx = 150, cy = 160;
  return es4Fig(S, y, p, e, cx, cy, [[[0, 0, 3], 'S', 0, -9, ES4_ORANGE], [[0, 0, 0], 'O', 8, 16, ES4_VIOLET], [[1.7, 0, 0], 'A', 12, 6, ES4_ENCRE]], [[[0, 0, 3], [0, 0, 0], ES4_VIOLET, true], [[0, 0, 0], [1.7, 0, 0], ES4_VERT, false], [[0, 0, 3], [1.7, 0, 0], ES4_ORANGE]], '0 0 300 215');
}
// Patron d'une pyramide à base carrée de côté a, arêtes latérales l (1 cm = k px).
function es4PatronPyramide(a, l, k){
  const ap = Math.sqrt(l * l - a * a / 4), c = a * k / 2, t = ap * k, cx = 150, cy = 150;
  const sq = [[cx - c, cy - c], [cx + c, cy - c], [cx + c, cy + c], [cx - c, cy + c]];
  const tri = [[sq[0], sq[1], [cx, cy - c - t]], [sq[1], sq[2], [cx + c + t, cy]], [sq[2], sq[3], [cx, cy + c + t]], [sq[3], sq[0], [cx - c - t, cy]]];
  let s = tri.map(T => `<polygon points="${T.map(p => p.join(',')).join(' ')}" fill="${ES4_BLEU}" fill-opacity=".22" stroke="${ES4_ENCRE}" stroke-width="1.6"/>`).join('');
  s += `<polygon points="${sq.map(p => p.join(',')).join(' ')}" fill="${ES4_VERT}" fill-opacity=".25" stroke="${ES4_ENCRE}" stroke-width="1.8"/>`;
  s += `<text x="${cx}" y="${cy + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="${ES4_VERT}">base</text><text x="${cx}" y="${cy - c + 16}" text-anchor="middle" font-size="12" fill="${ES4_ENCRE}">${es4N(a)} cm</text>`;
  s += `<text x="${cx + c / 2 + t / 4 + 8}" y="${cy - c - t / 2}" font-size="12" fill="${ES4_ENCRE}">${es4N(l)} cm</text>`;
  // Codage des arêtes latérales égales.
  tri.forEach(T => [0, 1].forEach(i => { const m = [(T[i][0] + T[2][0]) / 2, (T[i][1] + T[2][1]) / 2]; s += `<circle cx="${m[0]}" cy="${m[1]}" r="2.6" fill="${ES4_ORANGE}"/>`; }));
  return `<svg viewBox="0 0 300 300" style="width:100%;max-width:280px;display:block;margin:6px auto;">${s}</svg>`;
}
// Patron d'un cône (rayon r, génératrice g) : secteur + disque, 1 cm = k px.
function es4PatronCone(r, g, k, opts){
  opts = opts || {};
  const ang = 360 * r / g, R = g * k, rr = r * k;
  // Au-delà de 180°, le secteur dépasse au-dessus et sur les côtés de son sommet : on agrandit le cadre.
  const haut = ang > 180 ? R * Math.sin((ang / 2 - 90) * Math.PI / 180) : 0, demi = ang >= 180 ? R : R * Math.sin(ang / 2 * Math.PI / 180);
  const W = opts.w || Math.max(300, 2 * demi + 70, 2 * rr + 40);
  const ax = W / 2, ay = (opts.ay == null ? 16 : opts.ay) + haut, a1 = (90 - ang / 2) * Math.PI / 180, a2 = (90 + ang / 2) * Math.PI / 180;
  const p1 = [ax + R * Math.cos(a1), ay + R * Math.sin(a1)], p2 = [ax + R * Math.cos(a2), ay + R * Math.sin(a2)];
  let s = `<path d="M${ax},${ay} L${p1[0].toFixed(1)},${p1[1].toFixed(1)} A${R},${R} 0 ${ang > 180 ? 1 : 0} 1 ${p2[0].toFixed(1)},${p2[1].toFixed(1)} Z" fill="${ES4_BLEU}" fill-opacity=".22" stroke="${ES4_ENCRE}" stroke-width="1.6"/>`;
  s += `<circle cx="${ax}" cy="${ay + R + rr}" r="${rr}" fill="${ES4_VERT}" fill-opacity=".25" stroke="${ES4_ENCRE}" stroke-width="1.6"/><line x1="${ax}" y1="${ay + R + rr}" x2="${ax + rr}" y2="${ay + R + rr}" stroke="${ES4_ENCRE}" stroke-width="1.2"/><text x="${ax + rr / 2}" y="${ay + R + rr - 5}" text-anchor="middle" font-size="12" fill="${ES4_ENCRE}">${es4N(r)} cm</text>`;
  const ra = Math.min(34, R * .35);
  s += `<path d="M${ax + ra * Math.cos(a1)},${ay + ra * Math.sin(a1)} A${ra},${ra} 0 ${ang > 180 ? 1 : 0} 1 ${ax + ra * Math.cos(a2)},${ay + ra * Math.sin(a2)}" fill="none" stroke="${ES4_VIOLET}" stroke-width="1.8"/><text x="${ax}" y="${ay + ra + 16}" text-anchor="middle" font-size="13" font-weight="700" fill="${ES4_VIOLET}">${es4N(ang, 1)}°</text>`;
  s += `<text x="${((ax + p2[0]) / 2 - 10).toFixed(1)}" y="${((ay + p2[1]) / 2).toFixed(1)}" text-anchor="end" font-size="12" fill="${ES4_ENCRE}">${es4N(g)} cm</text>`;
  return opts.brut ? s : `<svg viewBox="0 0 ${W} ${ay + R + 2 * rr + 8}" style="width:100%;max-width:${opts.max || 260}px;display:block;margin:6px auto;">${s}</svg>`;
}

document.getElementById('cours-demo-espace-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>La pyramide</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Vocabulaire</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Une <b>pyramide</b> est un solide dont :
  <ul style="margin:4px 0;padding-left:20px;line-height:1.8;">
    <li>une face, appelée <b>base</b>, est un polygone ;</li>
    <li>les autres faces, appelées <b>faces latérales</b>, sont des triangles qui ont un sommet commun : le <b>sommet</b> de la pyramide.</li>
  </ul>
  La <b>hauteur</b> d'une pyramide est le segment issu de son sommet et perpendiculaire à la base. Une <b>arête latérale</b> relie un sommet de la base au sommet de la pyramide.</div>
${es4Deux(`<ul class="example-list">
  <li>Le <b>sommet</b> de cette pyramide est le point <b style="color:${ES4_ORANGE};">S</b>.</li>
  <li>Sa <b>base</b> est le rectangle EFGH.</li>
  <li>Ses <b>faces latérales</b> sont les triangles SEF, SFG, SGH et SHE.</li>
  <li>Ses <b>arêtes latérales</b> sont [SE] (en orange), [SF], [SG] et [SH].</li>
  <li>Sa <b>hauteur</b> est le segment <b style="color:${ES4_VIOLET};">[SO]</b>, où O est le centre du rectangle.</li>
</ul>`, es4FigPyramide())}
<div class="redaction-note" ${R4_REM}>Remarques : une pyramide à base triangulaire s'appelle un <b>tétraèdre</b> (toutes ses faces sont des triangles). Une <b>pyramide régulière</b> a pour base un <b>polygone régulier</b> (triangle équilatéral, carré, hexagone régulier…) et ses faces latérales sont des triangles isocèles superposables ; sa hauteur passe par le centre de la base.</div>

<div class="sub-header"><span class="letter">B</span><h4>Patron</h4></div>
${es4Deux(`<p style="margin:0;">Voici le <b>patron</b> d'une pyramide régulière à base carrée : la base est un carré de 4 cm de côté, et chaque arête latérale mesure 5 cm (codage orange). Les quatre faces latérales sont des triangles isocèles superposables, posés sur les côtés du carré. Un patron qui se replie est animé dans l'onglet Méthode.</p>`, es4PatronPyramide(4, 5, 17))}

<div class="lesson-header"><span class="num">2</span><h3>Le cône de révolution</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Vocabulaire</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un <b>cône de révolution</b> est le solide obtenu en faisant tourner un <b>triangle rectangle</b> autour d'un des côtés de son angle droit.</li>
  <li>Sa <b>base</b> est un disque ; sa <b>hauteur</b> est le segment qui joint le centre de ce disque au sommet du cône (il est perpendiculaire à la base).</li>
  <li>Une <b>génératrice</b> est un segment qui joint le sommet du cône à un point du cercle de base.</li>
</ul></div>
${es4Deux(`<ul class="example-list">
  <li>Le <b>sommet</b> du cône est le point <b style="color:${ES4_ORANGE};">S</b>.</li>
  <li>Sa <b>base</b> est le disque de centre O et de rayon <b style="color:${ES4_VERT};">[OA]</b> ; en perspective, on le représente par un ovale.</li>
  <li>Sa <b>hauteur</b> est le segment <b style="color:${ES4_VIOLET};">[SO]</b>.</li>
  <li>[SA] est une <b>génératrice</b> (en orange).</li>
  <li>Le triangle SOA, rectangle en O, engendre le cône en tournant autour de (SO).</li>
</ul>`, es4FigCone())}

<div class="sub-header"><span class="letter">B</span><h4>Patron</h4></div>
${es4Deux(r4Ex('Exemple : patron d\'un cône de rayon 2 cm et de génératrice 6 cm.', [
  ['Le patron est formé d\'un <b>disque</b> de rayon 2 cm et d\'un <b>secteur de disque</b> de rayon 6 cm (la génératrice).', ''],
  ['La longueur de l\'arc du secteur est égale au périmètre de la base : 2 × π × 2 = 4π cm.', 'Quand on enroule le secteur, son arc fait le tour de la base.'],
  ['L\'angle du secteur est proportionnel à la longueur de son arc : un tour complet (360°) correspondrait à 2 × π × 6 = 12π cm.', ''],
  [es4Tex('\\text{angle} = \\dfrac{360 \\times 4\\pi}{12\\pi} = 120°'), 'Raccourci : angle = 360° × rayon ÷ génératrice.'],
]), es4PatronCone(2, 6, 17))}

<div class="lesson-header"><span class="num">3</span><h3>Le volume d'une pyramide et d'un cône</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Le volume d'une <b>pyramide</b> ou d'un <b>cône de révolution</b> est donné par la formule :
  <div style="text-align:center;margin:8px 0 2px;">${es4Tex('\\mathcal{V} = \\dfrac{\\text{aire de la base} \\times \\text{hauteur}}{3}')}</div></div>
<div class="redaction-note" ${R4_REM}>Remarque : les unités doivent être cohérentes. Si les longueurs sont en m, l'aire de la base est en m² et le volume en m³. Pourquoi « divisé par 3 » ? Un cube peut être découpé en 3 pyramides identiques (voir l'animation de l'onglet Méthode) : le volume d'une pyramide est le tiers de celui du prisme de même base et de même hauteur.</div>
${r4Ex('Exemple 1 : volume d\'une pyramide de hauteur 6 m, dont la base est un carré de 4,5 m de côté.', [
  [es4Tex('\\mathcal{A} = c \\times c = 4{,}5 \\times 4{,}5 = 20{,}25') + ' m²', 'On calcule l\'aire de la base : c\'est un carré.'],
  [es4Tex('\\mathcal{V} = \\dfrac{\\mathcal{A} \\times h}{3} = \\dfrac{20{,}25 \\times 6}{3} = 40{,}5') + ' m³', 'On applique la formule.'],
  ['Le volume de la pyramide est 40,5 m³.', ''],
])}
${r4Ex('Exemple 2 : volume d\'un cône de révolution de hauteur 10 cm, dont la base a un rayon de 6 cm.', [
  [es4Tex('\\mathcal{A} = \\pi \\times r^2 = \\pi \\times 6^2 = 36\\pi') + ' cm²', 'L\'aire de la base : un disque de rayon 6 cm.'],
  [es4Tex('\\mathcal{V} = \\dfrac{36\\pi \\times 10}{3} = 120\\pi') + ' cm³', 'On garde π pour la valeur exacte.'],
  ['Valeur exacte : 120π cm³ ; valeur arrondie au cm³ : 377 cm³.', 'La calculatrice affiche 376,99…'],
])}

<div class="lesson-header"><span class="num">4</span><h3>Se repérer dans l'espace</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Dans un <b>repère de l'espace</b> (trois axes gradués de même origine O, deux à deux perpendiculaires), tout point M est repéré par ses trois <b>coordonnées</b> :
  <ul style="margin:4px 0 0;padding-left:20px;line-height:1.8;">
    <li>la première, lue sur l'axe (Ox), est l'<b>abscisse</b> ;</li>
    <li>la deuxième, lue sur l'axe (Oy), est l'<b>ordonnée</b> ;</li>
    <li>la troisième, lue sur l'axe (Oz), est la <b>cote</b> (ou <b>altitude</b>).</li>
  </ul></div>
${es4Deux(`<ul class="example-list"><li>On construit le pavé droit de sommets O et M dont les arêtes sont parallèles aux axes. On lit : abscisse 3, ordonnée 4, cote 2.</li><li>Le point M a pour coordonnées <b>(3 ; 4 ; 2)</b>.</li></ul>`, `<svg viewBox="0 0 300 220" style="width:100%;max-width:300px;display:block;margin:6px auto;">${es4Repere(3, 4, 2, -1.95, 0.35, 30, 110, 150)}</svg>`)}
`;
// Repère de l'espace et pavé de O à M(x ; y ; z) : axes x (vers l'avant), y (vers la droite), z (vers le haut).
function es4Repere(x, y, z, yaw, pitch, e, cx, cy){
  const P = (a, b, c) => e5Point([a, b, c], yaw, pitch, e, cx, cy), L = (A, B, st) => `<line x1="${A[0].toFixed(1)}" y1="${A[1].toFixed(1)}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" ${st}/>`;
  let s = '';
  const ax = [[[6, 0, 0], 'x', ES4_ROUGE_AX], [[0, 6, 0], 'y', ES4_VERT], [[0, 0, 5], 'z', ES4_BLEU]];
  ax.forEach(([Q, n, c]) => { const O = P(0, 0, 0), E = P(...Q); s += L(O, E, `stroke="${c}" stroke-width="2"`); s += `<text x="${(E[0] + (E[0] - O[0]) * .06).toFixed(1)}" y="${(E[1] + (E[1] - O[1]) * .06 + 5).toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="${c}">${n}</text>`; for(let k = 1; k < Math.round(Math.hypot(...Q)); k++){ const T = P(...Q.map(v => v ? k * Math.sign(v) : 0)); s += `<circle cx="${T[0].toFixed(1)}" cy="${T[1].toFixed(1)}" r="1.8" fill="${c}"/>`; } });
  // Pavé en pointillés.
  const c8 = [[0, 0, 0], [x, 0, 0], [x, y, 0], [0, y, 0], [0, 0, z], [x, 0, z], [x, y, z], [0, y, z]].map(q => P(...q));
  [[1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [7, 4], [1, 5], [2, 6], [3, 7]].forEach(([i, j]) => { s += L(c8[i], c8[j], `stroke="#8A93A3" stroke-width="1.1" stroke-dasharray="4 3"`); });
  const O = P(0, 0, 0), M = c8[6];
  s += `<text x="${O[0] - 10}" y="${O[1] + 14}" font-size="13" font-weight="700" fill="${ES4_ENCRE}">O</text>`;
  [[c8[1], String(x).replace('.', ','), ES4_ROUGE_AX, 0, 16], [c8[3], String(y).replace('.', ','), ES4_VERT, 4, 16], [c8[4], String(z).replace('.', ','), ES4_BLEU, -12, 4]].forEach(([p, t, c, dx, dy]) => { if(t !== '0') s += `<text x="${(p[0] + dx).toFixed(1)}" y="${(p[1] + dy).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${c}">${t}</text>`; });
  s += `<circle cx="${M[0].toFixed(1)}" cy="${M[1].toFixed(1)}" r="5" fill="${ES4_ORANGE}"/><text x="${(M[0] + 9).toFixed(1)}" y="${(M[1] - 8).toFixed(1)}" font-size="15" font-weight="700" fill="${ES4_ORANGE}">M</text>`;
  return s;
}

document.getElementById('histoire-demo-espace-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Vers 2560 avant J.-C., les Égyptiens achèvent la <b>pyramide de Khéops</b> à Gizeh : une pyramide régulière à base carrée d'environ 230 m de côté et, à l'origine, d'environ 146 m de haut. Elle est restée pendant près de 4 000 ans la plus haute construction humaine ! Le <b>papyrus de Moscou</b> (vers 1850 avant J.-C.) montre déjà comment calculer le volume d'une pyramide tronquée. Chez les Grecs, <b>Démocrite</b> affirme que le volume d'une pyramide est le tiers de celui du prisme de même base et de même hauteur, et <b>Eudoxe de Cnide</b> le démontre au 4e siècle avant J.-C. ; <b>Archimède</b> en tirera plus tard les relations entre le cône, le cylindre et la sphère, dont il était si fier qu'il fit graver sa figure sur sa tombe. Plus près de nous, la <b>pyramide du Louvre</b>, construite en 1989 par l'architecte Ieoh Ming Pei, est une pyramide régulière à base carrée faite de verre et d'acier. Quant aux coordonnées dans l'espace, elles prolongent l'idée de <b>Descartes</b> (1637) ; ce sont elles qu'utilisent les GPS, les jeux vidéo en 3D et les imprimantes 3D pour placer chaque point.
</div>
`;

document.getElementById('methode-demo-espace-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : observer une pyramide ou un cône sous tous les angles</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un solide, puis faites-le tourner en le faisant glisser (doigt ou souris). Les arêtes cachées sont en pointillés ; la hauteur est en violet.</p>
  <div style="display:flex;justify-content:center;margin:6px 0;"><select id="es4-choix" onchange="es4Vue()" style="padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;font-size:1rem;">${ES4_SOLIDES.map((s, i) => `<option value="${i}">${s.nom}</option>`).join('')}</select></div>
  <svg id="es4-vueSvg" viewBox="0 0 300 250" style="width:100%;max-width:360px;display:block;margin:6px auto;touch-action:none;cursor:grab;background:#fff;border-radius:10px;border:1px solid #E4E7EC;"></svg>
  <div id="es4-vueInfo" style="text-align:center;line-height:1.7;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : replier le patron d'une pyramide</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites glisser le curseur ou cliquez sur « Plier » : les quatre triangles se relèvent autour des côtés de la base jusqu'à se rejoindre au sommet.</p>
  <svg id="es4-pliSvg" viewBox="0 0 300 250" style="width:100%;max-width:360px;display:block;margin:6px auto;"></svg>
  <input id="es4-pli" type="range" min="0" max="100" value="0" style="width:100%;max-width:320px;display:block;margin:0 auto;" oninput="es4Plier()">
  <div class="figure-toolbar"><button class="btn" onclick="es4PliAnimer(1)">Plier</button><button class="btn secondary" onclick="es4PliAnimer(0)">Déplier</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : pourquoi divise-t-on par 3 ? Trois pyramides dans un cube</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un cube se découpe en 3 pyramides identiques, qui ont toutes pour sommet le même coin du cube et pour base une face du cube. Séparez-les, puis rassemblez-les.</p>
  <svg id="es4-cubeSvg" viewBox="0 0 300 250" style="width:100%;max-width:360px;display:block;margin:6px auto;"></svg>
  <input id="es4-cube" type="range" min="0" max="100" value="0" style="width:100%;max-width:320px;display:block;margin:0 auto;" oninput="es4Cube()">
  <div id="es4-cubeRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="es4CubeAnimer(1)">Séparer</button><button class="btn secondary" onclick="es4CubeAnimer(0)">Rassembler</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : le patron d'un cône, pour n'importe quelles dimensions</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez le rayon de la base et la génératrice : l'angle du secteur est calculé et le patron redessiné (à l'échelle).</p>
  <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Rayon : <input id="es4-cR" type="range" min="1" max="5" step="0.5" value="3" style="width:140px;" oninput="es4ConePatron()"> <b id="es4-cRa"></b></label>
    <label>Génératrice : <input id="es4-cG" type="range" min="2" max="10" step="0.5" value="5" style="width:140px;" oninput="es4ConePatron()"> <b id="es4-cGa"></b></label>
  </div>
  <div id="es4-cFig"></div>
  <div id="es4-cRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : placer un point dans un repère de l'espace</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez l'abscisse, l'ordonnée et la cote du point M : le pavé construit de O à M montre comment lire ses coordonnées. Faites glisser la figure pour la tourner.</p>
  <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center;">
    ${[['X', 'x', 3, ES4_ROUGE_AX], ['Y', 'y', 4, ES4_VERT], ['Z', 'z', 2, ES4_BLEU]].map(([k, n, v, c]) => `<label style="color:${c};font-weight:700;">${n} = <input id="es4-r${k}" type="range" min="0" max="5" step="0.5" value="${v}" style="width:110px;" oninput="es4Reperage()"></label>`).join('')}
  </div>
  <svg id="es4-repSvg" viewBox="0 0 300 240" style="width:100%;max-width:360px;display:block;margin:8px auto;touch-action:none;cursor:grab;"></svg>
  <div id="es4-repRes" style="text-align:center;font-size:1.1rem;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function es4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="es4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="es4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-espace-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer le volume d'un cône »</h3>
  <p style="margin:0 0 8px;">Un cône de révolution a une hauteur de 7 cm et une base de rayon 3 cm. Calculer son volume, valeur exacte puis arrondie au cm³.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${es4Tex('\\mathcal{A}_{\\text{base}} = \\pi \\times 3^2 = 9\\pi') + ' cm²'}</span><span class="we-comment">La base est un disque de rayon 3 cm.</span></div>
    <div class="we-row"><span class="we-expr">${es4Tex('\\mathcal{V} = \\dfrac{\\mathcal{A}_{\\text{base}} \\times h}{3} = \\dfrac{9\\pi \\times 7}{3}')}</span><span class="we-comment">On écrit la formule et on remplace.</span></div>
    <div class="we-row"><span class="we-expr">${es4Tex('\\mathcal{V} = 21\\pi') + ' cm³'}</span><span class="we-comment">Valeur exacte : 9 × 7 ÷ 3 = 21.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Le volume du cône est 21π cm³, soit environ 66 cm³.</span><span class="we-comment">21 × π ≈ 65,97.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${es4Exo(1, 'SABCD est une pyramide à base carrée ABCD. Donne son nombre de faces, d\'arêtes et de sommets, puis nomme ses faces latérales et ses arêtes latérales.', [
    '5 faces (1 base + 4 faces latérales), 8 arêtes (4 de la base + 4 latérales), 5 sommets (A, B, C, D et S).',
    'Faces latérales : SAB, SBC, SCD, SDA. Arêtes latérales : [SA], [SB], [SC], [SD].'])}
  ${es4Exo(2, 'Combien un tétraèdre a-t-il de faces, d\'arêtes et de sommets ?', [
    '4 faces (toutes triangulaires), 6 arêtes et 4 sommets.'])}
  ${es4Exo(3, 'Calcule le volume d\'une pyramide de hauteur 8 cm dont la base est un rectangle de 5 cm sur 3 cm.', [
    'Aire de la base : 5 × 3 = 15 cm². ' + es4Tex('\\mathcal{V} = \\dfrac{15 \\times 8}{3} = 40') + ' cm³.'])}
  ${es4Exo(4, 'Calcule le volume d\'un cône de rayon 4 cm et de hauteur 9 cm (valeur exacte, puis arrondie au dixième).', [
    'Aire de la base : ' + es4Tex('\\pi \\times 4^2 = 16\\pi') + ' cm². ' + es4Tex('\\mathcal{V} = \\dfrac{16\\pi \\times 9}{3} = 48\\pi') + ' cm³ ≈ 150,8 cm³.'])}
  ${es4Exo(5, 'Quel est l\'angle du secteur dans le patron d\'un cône de rayon 3 cm et de génératrice 9 cm ?', [
    'Angle = 360° × 3 ÷ 9 = <b>120°</b> (l\'arc mesure 2π × 3 = 6π cm, et le cercle entier de rayon 9 cm mesurerait 18π cm : 6π est le tiers de 18π).'])}
  ${es4Exo(6, 'Une pyramide a un volume de 50 cm³ et une base d\'aire 15 cm². Quelle est sa hauteur ?', [
    es4Tex('\\dfrac{15 \\times h}{3} = 50') + ', donc ' + es4Tex('15 \\times h = 150') + ' et ' + es4Tex('h = 10') + ' cm.'])}
  ${es4Exo(7, 'La pyramide du Louvre est une pyramide régulière à base carrée d\'environ 35 m de côté et 21,6 m de hauteur. Calcule son volume.', [
    'Aire de la base : 35 × 35 = 1 225 m². ' + es4Tex('\\mathcal{V} = \\dfrac{1\\,225 \\times 21{,}6}{3} = 8\\,820') + ' m³, environ.'])}
  ${es4Exo(8, 'Un pavé droit a un sommet en O, l\'origine d\'un repère de l\'espace ; ses arêtes issues de O mesurent 4 sur (Ox), 3 sur (Oy) et 2 sur (Oz). Donne les coordonnées du sommet opposé à O, puis celles du centre du pavé.', [
    'Sommet opposé à O : (4 ; 3 ; 2).', 'Centre du pavé (milieu de la grande diagonale) : (2 ; 1,5 ; 1).'])}
</div>
`;

/* ---- Méthode 1 : solides orientables ---- */
let es4Yaw = -0.5, es4Pitch = 0.38;
function es4Vue(){
  const k = Number(document.getElementById('es4-choix').value), s = document.getElementById('es4-vueSvg'); if(!s) return;
  const d = ES4_SOLIDES[k], S = d.s(), e = 38, cx = 150, cy = 125 + d.h / 2 * e * Math.cos(es4Pitch);
  let h = e5DessinSolide(S, es4Yaw, es4Pitch, e, cx, cy);
  const p = e5Point([0, 0, d.h], es4Yaw, es4Pitch, e, cx, cy), o = e5Point([0, 0, 0], es4Yaw, es4Pitch, e, cx, cy);
  h += `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${o[0].toFixed(1)}" y2="${o[1].toFixed(1)}" stroke="${ES4_VIOLET}" stroke-width="2" stroke-dasharray="5 4"/><circle cx="${o[0].toFixed(1)}" cy="${o[1].toFixed(1)}" r="2.5" fill="${ES4_VIOLET}"/>`;
  s.innerHTML = h;
  document.getElementById('es4-vueInfo').innerHTML = `<b>${d.nom}</b> : ${d.c}.`;
}
(function es4Glisser(){
  let dep = null, cible = null;
  document.addEventListener('pointerdown', e => {
    const s = e.target.closest && (e.target.closest('#es4-vueSvg') || e.target.closest('#es4-repSvg')); if(!s) return;
    cible = s.id; dep = [e.clientX, e.clientY, cible === 'es4-vueSvg' ? es4Yaw : es4RYaw, cible === 'es4-vueSvg' ? es4Pitch : es4RPitch];
    s.setPointerCapture && s.setPointerCapture(e.pointerId); s.style.cursor = 'grabbing';
  });
  document.addEventListener('pointermove', e => {
    if(!dep) return;
    const y = dep[2] + (e.clientX - dep[0]) / 90, p = Math.max(-0.2, Math.min(1.2, dep[3] + (e.clientY - dep[1]) / 90));
    if(cible === 'es4-vueSvg'){ es4Yaw = y; es4Pitch = p; es4Vue(); } else { es4RYaw = y; es4RPitch = Math.max(0, Math.min(1, p)); es4Reperage(); }
  });
  document.addEventListener('pointerup', () => { if(!dep) return; dep = null; const s = document.getElementById(cible); if(s) s.style.cursor = 'grab'; });
})();

/* ---- Méthode 2 : pliage du patron d'une pyramide régulière à base carrée ---- */
function es4PliPolys(t){
  const a = 2, l = 2.5, ap = Math.sqrt(l * l - a * a / 4), af = Math.acos(-(a / 2) / ap), h = ap * Math.sin(af);
  const sq = [[-1, -1, 0], [1, -1, 0], [1, 1, 0], [-1, 1, 0]], polys = [{ pts: sq, c: E5_BASE }];
  for(let i = 0; i < 4; i++){
    const A = sq[i], B = sq[(i + 1) % 4], M = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2, 0], n = [M[0], M[1], 0], ln = Math.hypot(n[0], n[1]);
    const flat = [M[0] + n[0] / ln * ap, M[1] + n[1] / ln * ap, 0], u = e5Sub(B, A), lu = Math.hypot(...u), U = u.map(v => v / lu);
    // On choisit le sens de rotation qui relève le triangle (z > 0) ; plié, il a tourné de af autour du côté
    // (cos af = −(a/2)/apothème : la pointe arrive au-dessus du centre de la base).
    const s = e5Rot(flat, A, U, 0.1)[2] > 0 ? 1 : -1;
    polys.push({ pts: [A, B, e5Rot(flat, A, U, s * af * t)].map(P => [P[0], P[1], P[2] - h / 2 * t]), c: E5_LAT });
  }
  polys[0].pts = polys[0].pts.map(P => [P[0], P[1], P[2] - h / 2 * t]);
  return polys;
}
let es4PliRaf = null;
function es4Plier(){ const t = Number(document.getElementById('es4-pli').value) / 100, s = document.getElementById('es4-pliSvg'); if(s) s.innerHTML = e5DessinPolys(es4PliPolys(t), -0.55, 0.95 - 0.55 * t, 36, 150, 130); }
function es4PliAnimer(cible){
  cancelAnimationFrame(es4PliRaf);
  const r = document.getElementById('es4-pli'), d = Number(r.value) / 100, t0 = performance.now();
  const f = now => { const k = Math.max(0, Math.min(1, (now - t0) / 1800)), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; r.value = Math.round((d + (cible - d) * e) * 100); es4Plier(); if(k < 1) es4PliRaf = requestAnimationFrame(f); };
  es4PliRaf = requestAnimationFrame(f);
}

/* ---- Méthode 3 : trois pyramides dans un cube ---- */
function es4CubePolys(t){
  const c = 1.2, V = [c, c, c], cols = ['#0C5BA0', '#E07B00', '#1E7B34'], polys = [];
  // Base de chaque pyramide : une face du cube qui ne contient pas le sommet V ; on l'écarte selon sa normale.
  const bases = [[[-c, -c, -c], [-c, c, -c], [-c, c, c], [-c, -c, c]], [[-c, -c, -c], [c, -c, -c], [c, -c, c], [-c, -c, c]], [[-c, -c, -c], [c, -c, -c], [c, c, -c], [-c, c, -c]]];
  const dirs = [[-1, 0, 0], [0, -1, 0], [0, 0, -1]];
  bases.forEach((B, k) => {
    const d = dirs[k].map(v => v * 1.3 * t), mv = P => [P[0] + d[0], P[1] + d[1], P[2] + d[2]], S = mv(V);
    polys.push({ pts: B.map(mv), c: cols[k], o: .5 });
    for(let i = 0; i < 4; i++) polys.push({ pts: [mv(B[i]), mv(B[(i + 1) % 4]), S], c: cols[k], o: .38 });
  });
  return polys;
}
let es4CubeRaf = null;
function es4Cube(){
  const t = Number(document.getElementById('es4-cube').value) / 100, s = document.getElementById('es4-cubeSvg'); if(!s) return;
  s.innerHTML = e5DessinPolys(es4CubePolys(t), -0.62, 0.42, 38 - 8 * t, 150, 125);
  document.getElementById('es4-cubeRes').innerHTML = t < 0.02 ? 'Le cube, de côté <i>a</i>, a pour volume <i>a</i> × <i>a</i> × <i>a</i> = <i>a</i>³.' : `Chaque pyramide a pour base une face du cube (aire <i>a</i>²) et pour hauteur <i>a</i> : les 3 sont identiques, donc chacune a pour volume <b>${es4Tex('\\dfrac{a^3}{3} = \\dfrac{a^2 \\times a}{3}')}</b> = aire de la base × hauteur ÷ 3.`;
  renderStaticMath(document.getElementById('es4-cubeRes'));
}
function es4CubeAnimer(cible){
  cancelAnimationFrame(es4CubeRaf);
  const r = document.getElementById('es4-cube'), d = Number(r.value) / 100, t0 = performance.now();
  const f = now => { const k = Math.max(0, Math.min(1, (now - t0) / 1600)), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; r.value = Math.round((d + (cible - d) * e) * 100); es4Cube(); if(k < 1) es4CubeRaf = requestAnimationFrame(f); };
  es4CubeRaf = requestAnimationFrame(f);
}

/* ---- Méthode 4 : patron du cône ---- */
function es4ConePatron(){
  const rI = document.getElementById('es4-cR'), gI = document.getElementById('es4-cG');
  let r = Number(rI.value), g = Number(gI.value);
  if(g <= r){ g = r + 0.5; gI.value = g; }
  document.getElementById('es4-cRa').textContent = String(r).replace('.', ',') + ' cm'; document.getElementById('es4-cGa').textContent = String(g).replace('.', ',') + ' cm';
  const ang = 360 * r / g, k = Math.min(20, 170 / (g + 2 * r));
  document.getElementById('es4-cFig').innerHTML = es4PatronCone(r, g, k, { max: 300 });
  const rT = String(r).replace('.', '{,}'), gT = String(g).replace('.', '{,}');
  const out = document.getElementById('es4-cRes');
  out.innerHTML = r4Ex('', [
    [`Arc du secteur = périmètre de la base = ${es4Tex(`2 \\times \\pi \\times ${rT} = ${es4N(2 * r).replace(',', '{,}')}\\pi`)} cm.`, 'Le secteur, enroulé, fait exactement le tour de la base.'],
    [es4Tex(`\\text{angle} = 360° \\times \\dfrac{${rT}}{${gT}} ${Math.abs(ang * 10 - Math.round(ang * 10)) < 1e-9 ? '=' : '\\approx'} ${es4N(ang, 1).replace(',', '{,}')}°`), 'Proportionnalité : 360° pour un cercle entier de rayon égal à la génératrice.'],
  ]);
  renderStaticMath(out);
}

/* ---- Méthode 5 : repérage ---- */
let es4RYaw = -1.95, es4RPitch = 0.35;
function es4Reperage(){
  const v = k => Number(document.getElementById('es4-r' + k).value), x = v('X'), y = v('Y'), z = v('Z'), s = document.getElementById('es4-repSvg'); if(!s) return;
  s.innerHTML = es4Repere(x, y, z, es4RYaw, es4RPitch, 28, 110, 160);
  const n = w => String(w).replace('.', ',');
  document.getElementById('es4-repRes').innerHTML = `M ( <b style="color:${ES4_ROUGE_AX};">${n(x)}</b> ; <b style="color:${ES4_VERT};">${n(y)}</b> ; <b style="color:${ES4_BLEU};">${n(z)}</b> ) <span style="font-size:.85rem;color:#4E5665;">— abscisse ; ordonnée ; cote</span>`;
}

DEMO_REGISTRY['4e|Espace'] = {
  cours: 'cours-demo-espace-4e', methode: 'methode-demo-espace-4e', exos: 'exos-demo-espace-4e', histoire: 'histoire-demo-espace-4e',
  init: () => {
    es4Vue(); es4Plier(); es4Cube(); es4ConePatron(); es4Reperage();
    ['cours-demo-espace-4e', 'exos-demo-espace-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-espace-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-espace-4e'));
  }
};

DEMO_QUIZZES['4e|Espace'] = [
  { q: 'Une pyramide à base hexagonale a combien de faces latérales ?', opts: ['4', '6', '7'], correct: 1 },
  { q: 'La base d\'un cône de révolution est...', opts: ['un disque', 'un triangle', 'un rectangle'], correct: 0 },
  { q: 'Le volume d\'une pyramide est égal à...', opts: ['aire de la base × hauteur', 'aire de la base × hauteur ÷ 3', 'aire de la base × hauteur ÷ 2'], correct: 1 },
  { q: 'Une génératrice d\'un cône relie...', opts: ['le sommet à un point du cercle de base', 'le centre de la base au sommet', 'deux points du cercle de base'], correct: 0 },
  { q: 'Une pyramide a une base de 9 cm² et une hauteur de 4 cm. Son volume est...', opts: ['36 cm³', '12 cm³', '13 cm³'], correct: 1 },
  { q: 'Un tétraèdre a...', opts: ['3 faces', '4 faces', '6 faces'], correct: 1 },
  { q: 'Le point M a pour coordonnées (2 ; 5 ; 3). Sa cote est...', opts: ['2', '5', '3'], correct: 2 },
];

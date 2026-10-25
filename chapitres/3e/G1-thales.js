/* ============================================================
   CHAPITRE : Théorème de Thalès (3e, G1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 39-40) : même principe que les autres chapitres -- plan du
   manuel (théorème direct et ses trois configurations, calcul de longueurs, non-parallélisme,
   réciproque et ordre des points), titres reformulés, exemples et figures nouveaux. Nouveau par
   rapport à la 4e (chapitres/4e/G1-triangles-paralleles.js, dont on réutilise le moteur de figures
   g4…) : les points M et N ne sont plus forcément sur les segments [AB] et [AC] (agrandissement,
   configuration « papillon »), d'où l'importance de l'ordre des points pour la réciproque.
   Conventions de figures (demandées pour la géométrie) : un point d'intersection ou un sommet n'est
   pas matérialisé ; les longueurs sont indiquées par des arcs de cote, comme dans le manuel.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const TH3_BLEU = '#0C5BA0', TH3_ORANGE = '#E07B00', TH3_VERT = '#1E7B34', TH3_ROUGE = '#C0392B', TH3_ENCRE = '#1C1B2E', TH3_GRIS = '#6B7A8C';
const th3Tex = s => `<span class="tex">${s}</span>`;
const th3Unit = v => { const L = Math.hypot(v[0], v[1]) || 1; return [v[0] / L, v[1] / L]; };

// Arc de cote entre P et Q (longueur écrite au sommet), bombé du côté opposé au point G.
function th3Cote(P, Q, G, txt, h, c){
  const m = g4Lerp(P, Q, 0.5), dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1;
  let nx = -dy / L, ny = dx / L;
  if((m[0] - G[0]) * nx + (m[1] - G[1]) * ny < 0){ nx = -nx; ny = -ny; }
  const k = [m[0] + nx * 2 * h, m[1] + ny * 2 * h], t = [m[0] + nx * (h + 11), m[1] + ny * (h + 11) + 4];
  return { svg: `<path d="M${P[0].toFixed(1)},${P[1].toFixed(1)} Q${k[0].toFixed(1)},${k[1].toFixed(1)} ${Q[0].toFixed(1)},${Q[1].toFixed(1)}" fill="none" stroke="#9AA3AF" stroke-width="1"/>`
    + `<text x="${t[0].toFixed(1)}" y="${t[1].toFixed(1)}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="600" fill="${c || '#4E5665'}">${txt}</text>`, pt: t };
}
// Nom du point d'intersection A : dans l'angle laissé libre par les segments qui en partent.
function th3NomA(A, dirs, nom){
  const us = dirs.map(th3Unit);
  let best = null, bestScore = -9;
  [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([s1, s2]) => {
    const u1 = th3Unit([us[0][0], us[0][1]]), u2 = th3Unit([us[1][0], us[1][1]]);
    const d = th3Unit([s1 * u1[0] + s2 * u2[0], s1 * u1[1] + s2 * u2[1]]);
    const score = Math.min(...dirs.map(v => { const u = th3Unit(v); return -(u[0] * d[0] + u[1] * d[1]); }));
    if(score > bestScore){ bestScore = score; best = d; }
  });
  return `<text x="${(A[0] + best[0] * 16).toFixed(1)}" y="${(A[1] + best[1] * 16 + 5).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk" font-size="15" font-weight="700" fill="${TH3_ENCRE}">${nom}</text>`;
}
/* Configuration de Thalès : droites (BM) et (CN) sécantes en A ; M = A + kM·(B − A), N = A + kN·(C − A)
   (k > 0 : même côté de A que B ; k < 0 : de l'autre côté, configuration « papillon »).
   o.cotes : { AM, AB, AN, AC, MN, BC } (textes) ; o.noms : [A, B, C, M, N]. */
function th3Points(A, B, C, kM, kN){ return { M: g4Lerp(A, B, kM), N: g4Lerp(A, C, kN) }; }
function th3Fig(A, B, C, kM, kN, o){
  o = o || {};
  const [nA, nB, nC, nM, nN] = o.noms || ['A', 'B', 'C', 'M', 'N'];
  const { M, N } = th3Points(A, B, C, kM, kN), tous = [A, B, C, M, N], G = g4Centre(tous);
  const ext = (P, k) => [g4Lerp(A, P, Math.min(0, 1, k)), g4Lerp(A, P, Math.max(0, 1, k))];
  const [d1a, d1b] = ext(B, kM), [d2a, d2b] = ext(C, kN);
  let h = `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.10)"/><polygon points="${[A, M, N].map(p => p.join(',')).join(' ')}" fill="rgba(12,91,160,.07)"/>`
    + g4Seg(d1a, d1b, TH3_ENCRE, 1.7) + g4Seg(d2a, d2b, TH3_ENCRE, 1.7) + g4Seg(B, C, TH3_BLEU, 2.4) + g4Seg(M, N, o.couleurMN || TH3_ORANGE, 2.4);
  const dirs = [[B[0] - A[0], B[1] - A[1]], [C[0] - A[0], C[1] - A[1]]];
  if(kM < 0) dirs.push([A[0] - B[0], A[1] - B[1]]);
  if(kN < 0) dirs.push([A[0] - C[0], A[1] - C[1]]);
  h += th3NomA(A, dirs, nA) + g4Nom(B, G, nB) + g4Nom(C, G, nC) + g4Nom(M, G, nM) + g4Nom(N, G, nN);
  const extra = [];
  const P = { A, B, C, M, N }, c = o.cotes || {};
  // Hauteur des arcs : les cotes sur une même droite et du même côté de A sont empilées.
  const hauteur = (cle, L) => Math.max(10, L * 0.14);
  Object.keys(c).forEach(cle => {
    const p1 = P[cle[0]], p2 = P[cle[1]], L = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
    const grand = (cle === 'AB' && kM > 0 && kM < 1) || (cle === 'AM' && kM > 1) || (cle === 'AC' && kN > 0 && kN < 1) || (cle === 'AN' && kN > 1);
    const oppose = { AB: C, AM: N, AC: B, AN: M, MN: A, BC: A }[cle] || G; // bombé vers l'extérieur du triangle
    const cote = th3Cote(p1, p2, oppose, c[cle], hauteur(cle, L) + (grand ? 16 : 0), cle === 'MN' ? TH3_ORANGE : cle === 'BC' ? TH3_BLEU : null);
    h += cote.svg; extra.push(cote.pt);
  });
  return g4Svg(h, [...tous, ...extra], o.maxW || 340);
}
const TH3_A = [200, 130], TH3_B = [70, 230], TH3_C = [330, 215];
const th3Legende = (fig, txt) => `<figure style="margin:0;flex:1 1 200px;max-width:260px;text-align:center;">${fig}<figcaption class="hint" style="margin:-6px 0 0;">${txt}</figcaption></figure>`;

document.getElementById('cours-demo-thales-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le théorème de Thalès</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>L'énoncé et les trois configurations</h4></div>
<span class="prop-badge">Théorème de Thalès</span>
<div class="def-box"><b>Si</b> les points A, B, M d'une part, et A, C, N d'autre part, sont <b>alignés</b>, <b>et si</b> les droites (BC) et (MN) sont <b>parallèles</b>, <b>alors</b> : <div style="text-align:center;margin:8px 0 2px;">${th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}')}</div></div>
<p style="margin:8px 0 4px;">Les deux droites (BM) et (CN) se coupent en A. Selon la position de M et N, on rencontre trois figures :</p>
<div style="display:flex;flex-wrap:wrap;gap:6px 18px;justify-content:center;align-items:flex-end;">
  ${th3Legende(th3Fig(TH3_A, TH3_B, TH3_C, 0.5, 0.5, { maxW: 230 }), 'M sur [AB], N sur [AC] : réduction (vu en 4e)')}
  ${th3Legende(th3Fig(TH3_A, TH3_B, TH3_C, 1.45, 1.45, { maxW: 230 }), 'B sur [AM], C sur [AN] : agrandissement')}
  ${th3Legende(th3Fig(TH3_A, TH3_B, TH3_C, -0.6, -0.6, { maxW: 230 }), 'A entre B et M, et entre C et N : « papillon »')}
</div>
<div class="redaction-note" ${R4_REM}>Dans les trois cas, les longueurs du triangle AMN sont <b>proportionnelles</b> à celles du triangle ABC. On associe les côtés qui se correspondent : [AM] et [AB] sur la même droite, [AN] et [AC] sur l'autre, puis les côtés parallèles [MN] et [BC].</div>

<div class="sub-header"><span class="letter">B</span><h4>Calculer une longueur</h4></div>
<p class="example-title">Exemple : les points B, A, M d'une part, et C, A, N d'autre part, sont alignés, et (BC) // (MN). On sait que AB = 40 mm, AM = 16 mm, AN = 14 mm et BC = 30 mm. On cherche AC et MN.</p>
${th3Fig([200, 120], [30, 60], [50, 220], -0.45, -0.45, { cotes: { AB: '40', AM: '16', AN: '14', BC: '30' }, maxW: 360 })}
${r4Ex('', [
  ['Les points B, A, M et C, A, N sont alignés, et (BC) // (MN).', 'On vérifie les conditions du théorème.'],
  [th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}'), "D'après le théorème de Thalès."],
  [th3Tex('\\dfrac{16}{40} = \\dfrac{14}{AC} = \\dfrac{MN}{30}'), 'On remplace par les longueurs connues.'],
  [th3Tex('AC = \\dfrac{40 \\times 14}{16} = 35') + ' mm', 'Produit en croix avec les deux premiers rapports.'],
  [th3Tex('MN = \\dfrac{16 \\times 30}{40} = 12') + ' mm', 'Produit en croix avec le premier et le troisième rapport.'],
])}

<div class="sub-header"><span class="letter">C</span><h4>Prouver que deux droites ne sont pas parallèles</h4></div>
<span class="prop-badge">Conséquence du théorème</span>
<div class="def-box"><b>Si</b> les points A, B, M d'une part, et A, C, N d'autre part, sont alignés, <b>et si</b> ${th3Tex('\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}')}, <b>alors</b> les droites (BC) et (MN) ne sont <b>pas parallèles</b>.</div>
<p class="example-title">Exemple : AB = 9 cm, AM = 12 cm, AC = 8 cm et AN = 10 cm (la figure n'est pas en vraie grandeur).</p>
${th3Fig([60, 60], [215, 105], [150, 205], 12 / 9, 1.25, { cotes: { AB: '9', AM: '12', AC: '8', AN: '10' }, maxW: 360 })}
${r4Ex('', [
  ['Les points A, B, M et A, C, N sont alignés.', ''],
  [th3Tex('\\dfrac{AM}{AB} = \\dfrac{12}{9} = \\dfrac{4}{3} = \\dfrac{16}{12}') + ' et ' + th3Tex('\\dfrac{AN}{AC} = \\dfrac{10}{8} = \\dfrac{5}{4} = \\dfrac{15}{12}'), 'On calcule séparément les deux rapports (même dénominateur pour comparer).'],
  [th3Tex('\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}'), 'Les rapports sont différents.'],
  ['Donc (BC) et (MN) ne sont pas parallèles.', "Si elles l'étaient, d'après le théorème de Thalès, il y aurait égalité."],
])}

<div class="lesson-header"><span class="num">2</span><h3>La réciproque du théorème de Thalès</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>L'énoncé : attention à l'ordre des points</h4></div>
<span class="prop-badge">Réciproque du théorème de Thalès</span>
<div class="def-box"><b>Si</b> les points A, B, M d'une part, et A, C, N d'autre part, sont <b>alignés dans le même ordre</b>, <b>et si</b> ${th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC}')}, <b>alors</b> les droites (BC) et (MN) sont <b>parallèles</b>.</div>
<div class="redaction-note" ${R4_REM}>Attention : l'égalité des rapports ne suffit pas. Ci-dessous, ${th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = 0{,}5')}, mais M est du même côté de A que B alors que N est de l'autre côté que C : les points ne sont pas dans le même ordre, et (MN) n'est pas parallèle à (BC).</div>
${th3Fig([170, 120], [50, 200], [300, 190], 0.5, -0.5, { couleurMN: TH3_ROUGE, maxW: 320 })}

<div class="sub-header"><span class="letter">B</span><h4>Prouver que deux droites sont parallèles</h4></div>
<p class="example-title">Exemple : dans cette figure, AB = 6 cm, AC = 5 cm, AM = 4,2 cm et AN = 3,5 cm.</p>
${th3Fig([180, 130], [50, 60], [70, 225], -0.7, -0.7, { cotes: { AB: '6', AC: '5', AM: '4,2', AN: '3,5' }, maxW: 360 })}
${r4Ex('', [
  ['Les points M, A, B et N, A, C sont alignés dans le même ordre.', 'A est entre M et B, et entre N et C.'],
  [th3Tex('\\dfrac{AM}{AB} = \\dfrac{4{,}2}{6} = 0{,}7'), 'On calcule séparément le premier rapport.'],
  [th3Tex('\\dfrac{AN}{AC} = \\dfrac{3{,}5}{5} = 0{,}7'), 'Puis le second.'],
  [th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC}'), 'Les rapports sont égaux.'],
  ['Donc (BC) // (MN).', "D'après la réciproque du théorème de Thalès."],
])}
`;

document.getElementById('histoire-demo-thales-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  <b>Thalès de Milet</b> (vers 625 – 547 av. J.-C.) est souvent présenté comme le premier mathématicien grec. D'après le philosophe Proclus, qui s'appuie sur un historien plus ancien, Thalès savait calculer <b>la distance d'un navire en mer</b> depuis le rivage, sans quitter la côte : avec deux triangles de même forme, l'un petit, tracé sur la terre ferme, l'autre immense, qui va jusqu'au bateau. C'est exactement l'idée de la configuration « papillon » ! Pendant des siècles, les arpenteurs et les géomètres ont utilisé ce principe pour mesurer des distances impossibles à parcourir : largeur d'une rivière, hauteur d'une tour, distance d'une île…
</div>
`;

document.getElementById('methode-demo-thales-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : explorer les trois configurations</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Déplacez M sur la droite (AB) et N sur la droite (AC) avec les curseurs (AB = 6 cm, AC = 5 cm). Les rapports se calculent en direct. Essayez des rapports égaux avec les points dans le même ordre… puis dans un ordre différent.</p>
  <svg id="th3-exSvg" viewBox="0 0 460 330" style="width:100%;max-width:470px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 10px;align-items:center;max-width:470px;margin:0 auto;">
    <label for="th3-exM" style="font-weight:700;">M</label><input id="th3-exM" type="range" min="-12" max="16" value="5" oninput="th3ExDessiner()">
    <label for="th3-exN" style="font-weight:700;">N</label><input id="th3-exN" type="range" min="-12" max="16" value="5" oninput="th3ExDessiner()">
  </div>
  <div id="th3-exInfo" style="text-align:center;margin:10px 0 4px;line-height:1.9;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="th3ExPreset(5, 5)">Réduction</button>
    <button class="btn" onclick="th3ExPreset(15, 15)">Agrandissement</button>
    <button class="btn" onclick="th3ExPreset(-7, -7)">Papillon</button>
    <button class="btn secondary" onclick="th3ExPreset(5, -5)">Même rapport, ordre différent</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : calculer une longueur dans une configuration papillon</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  ${th3Fig([200, 130], [60, 60], [90, 230], -0.6, -0.6, { noms: ['O', 'E', 'F', 'G', 'H'], cotes: { AB: '7,5', AN: '3', MN: '2,7' }, maxW: 360 })}
  <p class="interaction-hint" style="margin:6px 0;">Les points E, O, G et F, O, H sont alignés, (EF) // (GH), OE = 7,5 cm, OH = 3 cm, GH = 2,7 cm et OG = 4,5 cm. Cliquez sur « Étape suivante » pour calculer OF et EF.</p>
  <div class="step-display" id="th3-calculDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="th3CalculDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="th3CalculDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : parallèles ou pas ?</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Les points R, S, U et R, T, V sont alignés dans le même ordre : S ∈ [RU] et T ∈ [RV]. RS = 4 cm, RU = 10 cm, RT = 3 cm et RV = 7,5 cm. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="th3-reciproqueDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="th3ReciproqueDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="th3ReciproqueDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function th3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="th3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="th3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-thales-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une longueur avec le théorème de Thalès »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Les points A, B, M d'une part, et A, C, N d'autre part, sont alignés, et (BC) // (MN).</span><span class="we-comment">1. On cite les alignements et le parallélisme.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème de Thalès : ${th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}')}</span><span class="we-comment">2. On nomme le théorème et on écrit l'égalité des rapports.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On remplace les longueurs connues.</span><span class="we-comment">3. On garde deux rapports : un connu, un avec l'inconnue.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Produit en croix, puis on conclut avec l'unité.</span><span class="we-comment">4. On calcule et on répond.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Rédaction type : « Prouver que deux droites sont (ou ne sont pas) parallèles »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Les points A, B, M et A, C, N sont alignés (dans le même ordre).</span><span class="we-comment">1. On cite les alignements et on vérifie l'ordre.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On calcule séparément ${th3Tex('\\dfrac{AM}{AB}')} et ${th3Tex('\\dfrac{AN}{AC}')}.</span><span class="we-comment">2. Jamais d'égalité écrite avant de l'avoir prouvée.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Égaux : d'après la réciproque du théorème de Thalès, (BC) // (MN).</span><span class="we-comment">3a. Rapports égaux et même ordre.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Différents : d'après le théorème de Thalès, (BC) et (MN) ne sont pas parallèles.</span><span class="we-comment">3b. Rapports différents.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${th3Exo(1, 'Les points E, F, K d\'une part, et E, G, H d\'autre part, sont alignés, et (FG) // (HK). Écris l\'égalité des rapports donnée par le théorème de Thalès.', [
    'Les côtés du triangle EFG se correspondent avec ceux du triangle EKH : [EF] et [EK], [EG] et [EH], [FG] et [KH].',
    'D\'après le théorème de Thalès : ' + th3Tex('\\dfrac{EF}{EK} = \\dfrac{EG}{EH} = \\dfrac{FG}{KH}') + ' (ou les rapports inverses).'],
    th3Fig([190, 110], [300, 60], [300, 170], -1.2, -1.2, { noms: ['E', 'F', 'G', 'K', 'H'], maxW: 300 }))}
  ${th3Exo(2, 'Les points A, B, M et A, C, N sont alignés, B ∈ [AM], C ∈ [AN] et (BC) // (MN). On sait que AB = 5 cm, AM = 8 cm, AC = 6 cm et MN = 12 cm. Calcule AN et BC.', [
    'D\'après le théorème de Thalès : ' + th3Tex('\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}') + ', soit ' + th3Tex('\\dfrac{8}{5} = \\dfrac{AN}{6} = \\dfrac{12}{BC}') + '.',
    th3Tex('AN = \\dfrac{8 \\times 6}{5} = 9{,}6') + ' cm', th3Tex('BC = \\dfrac{5 \\times 12}{8} = 7{,}5') + ' cm'],
    th3Fig([50, 70], [180, 70], [120, 170], 1.6, 1.6, { cotes: { AB: '5', AM: '8', AC: '6', MN: '12' }, maxW: 330 }))}
  ${th3Exo(3, 'Les droites (AC) et (BD) se coupent en O, et (AB) // (CD). On sait que OA = 3 cm, OC = 7,5 cm, OB = 4 cm et AB = 5 cm. Calcule OD et CD.', [
    'Les points A, O, C et B, O, D sont alignés, et (AB) // (CD).',
    'D\'après le théorème de Thalès : ' + th3Tex('\\dfrac{OA}{OC} = \\dfrac{OB}{OD} = \\dfrac{AB}{CD}') + ', soit ' + th3Tex('\\dfrac{3}{7{,}5} = \\dfrac{4}{OD} = \\dfrac{5}{CD}') + '.',
    th3Tex('OD = \\dfrac{7{,}5 \\times 4}{3} = 10') + ' cm', th3Tex('CD = \\dfrac{7{,}5 \\times 5}{3} = 12{,}5') + ' cm'])}
  ${th3Exo(4, 'Les points J, I, K d\'une part, et L, I, M d\'autre part, sont alignés, avec IJ = 5 cm, IK = 7 cm, IL = 6 cm et IM = 8 cm. Les droites (JL) et (KM) sont-elles parallèles ?', [
    th3Tex('\\dfrac{IJ}{IK} = \\dfrac{5}{7}') + ' et ' + th3Tex('\\dfrac{IL}{IM} = \\dfrac{6}{8} = \\dfrac{3}{4}') + '.',
    'Produits en croix : 5 × 4 = 20 et 7 × 3 = 21 : les rapports sont différents.',
    'Donc, d\'après le théorème de Thalès, les droites (JL) et (KM) ne sont pas parallèles.'])}
  ${th3Exo(5, 'Les points A, M, B et A, N, C sont alignés dans cet ordre, avec AM = 2,8 cm, AB = 3,5 cm, AN = 4 cm et AC = 5 cm. Montre que (MN) // (BC).', [
    th3Tex('\\dfrac{AM}{AB} = \\dfrac{2{,}8}{3{,}5} = 0{,}8') + ' et ' + th3Tex('\\dfrac{AN}{AC} = \\dfrac{4}{5} = 0{,}8') + '.',
    'Les rapports sont égaux et les points sont alignés dans le même ordre.',
    'D\'après la réciproque du théorème de Thalès, (MN) // (BC).'])}
  ${th3Exo(6, 'M est sur le segment [AB], et N est sur la droite (AC), mais <b>de l\'autre côté de A</b> que C. On sait que AM = 2 cm, AB = 5 cm, AN = 3 cm et AC = 7,5 cm. Lina affirme : « les rapports sont égaux, donc (MN) // (BC) ». A-t-elle raison ?', [
    th3Tex('\\dfrac{AM}{AB} = \\dfrac{2}{5} = 0{,}4') + ' et ' + th3Tex('\\dfrac{AN}{AC} = \\dfrac{3}{7{,}5} = 0{,}4') + ' : les rapports sont bien égaux.',
    'Mais les points ne sont pas dans le même ordre : M est du même côté de A que B, N de l\'autre côté que C.',
    'Lina a tort : on ne peut pas utiliser la réciproque. D\'ailleurs, la parallèle à (BC) passant par M coupe le segment [AC] : (MN) n\'est pas parallèle à (BC).'])}
  ${th3Exo(7, 'Une rampe d\'accès [AC] part du sol au point A. Un poteau vertical [MN] de 0,4 m soutient la rampe à 2 m de A. Quelle est la hauteur BC de la rampe à 5 m de A ?', [
    'Le poteau [MN] et la hauteur [BC] sont verticaux, donc (MN) // (BC) ; A, M, B sont alignés sur le sol et A, N, C sur la rampe.',
    'D\'après le théorème de Thalès : ' + th3Tex('\\dfrac{AM}{AB} = \\dfrac{MN}{BC}') + ', soit ' + th3Tex('\\dfrac{2}{5} = \\dfrac{0{,}4}{BC}') + '.',
    th3Tex('BC = \\dfrac{5 \\times 0{,}4}{2} = 1') + ' : la rampe est à 1 m de haut.'],
    th3Fig([30, 190], [360, 190], [360, 30], 0.4, 0.4, { cotes: { AM: '2 m', AB: '5 m', MN: '0,4 m' }, maxW: 360 }))}
  ${th3Exo(8, 'Pour connaître la largeur DE d\'un étang, Tom plante des piquets : D, O, B d\'une part, et E, O, C d\'autre part, sont alignés, et (BC) // (DE). Il mesure OB = 30 m, OD = 75 m et BC = 24 m. Quelle est la largeur DE de l\'étang ?', [
    'Les points D, O, B et E, O, C sont alignés, et (BC) // (DE).',
    'D\'après le théorème de Thalès : ' + th3Tex('\\dfrac{OB}{OD} = \\dfrac{BC}{DE}') + ', soit ' + th3Tex('\\dfrac{30}{75} = \\dfrac{24}{DE}') + '.',
    th3Tex('DE = \\dfrac{75 \\times 24}{30} = 60') + ' : l\'étang mesure 60 m de large.'],
    th3Fig([160, 150], [100, 225], [230, 215], -2.5, -2.5, { noms: ['O', 'B', 'C', 'D', 'E'], cotes: { AB: '30 m', AM: '75 m', BC: '24 m' }, maxW: 330 }))}
</div>
`;

/* ---- Méthode 1 : configuration manipulable (M sur (AB), N sur (AC), rapports signés) ---- */
const TH3_EX_A = [215, 150], TH3_EX_B = [105, 230], TH3_EX_C = [315, 240];
const th3Fmt = v => String(Math.round(v * 100) / 100).replace('.', '{,}');
function th3ExDessiner(){
  const svg = document.getElementById('th3-exSvg'); if(!svg) return;
  const lire = id => { let v = Number(document.getElementById(id).value); if(v === 0){ v = 1; document.getElementById(id).value = 1; } return v / 10; };
  const kM = lire('th3-exM'), kN = lire('th3-exN');
  const A = TH3_EX_A, B = TH3_EX_B, C = TH3_EX_C, { M, N } = th3Points(A, B, C, kM, kN), G = g4Centre([A, B, C, M, N]);
  const memeOrdre = Math.sign(kM) === Math.sign(kN), egaux = Math.abs(Math.abs(kM) - Math.abs(kN)) < 1e-9, par = memeOrdre && egaux;
  const loin = (P, Q) => [g4Lerp(P, Q, -3), g4Lerp(P, Q, 4)];
  const [l1a, l1b] = loin(A, B), [l2a, l2b] = loin(A, C);
  const dirs = [[B[0] - A[0], B[1] - A[1]], [C[0] - A[0], C[1] - A[1]], [A[0] - B[0], A[1] - B[1]], [A[0] - C[0], A[1] - C[1]]];
  svg.innerHTML = `<polygon points="${[A, B, C].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.08)"/>`
    + g4Seg(l1a, l1b, '#C9CED6', 1.2) + g4Seg(l2a, l2b, '#C9CED6', 1.2)
    + g4Seg(A, B, TH3_ENCRE, 1.8) + g4Seg(A, C, TH3_ENCRE, 1.8) + g4Seg(A, M, TH3_ENCRE, 1.8) + g4Seg(A, N, TH3_ENCRE, 1.8)
    + g4Seg(B, C, TH3_BLEU, 2.6) + g4Seg(M, N, par ? TH3_VERT : TH3_ROUGE, 2.6)
    + th3NomA(A, dirs.slice(0, 2).concat(kM < 0 ? [dirs[2]] : [], kN < 0 ? [dirs[3]] : []), 'A') + g4Nom(B, G, 'B') + g4Nom(C, G, 'C')
    + g4Nom(M, G, 'M', TH3_ORANGE) + g4Nom(N, G, 'N', TH3_ORANGE);
  const r1 = th3Tex(`\\dfrac{AM}{AB} = \\dfrac{${th3Fmt(6 * Math.abs(kM))}}{6} = ${th3Fmt(Math.abs(kM))}`);
  const r2 = th3Tex(`\\dfrac{AN}{AC} = \\dfrac{${th3Fmt(5 * Math.abs(kN))}}{5} = ${th3Fmt(Math.abs(kN))}`);
  const conf = !memeOrdre ? 'Points dans un ordre différent' : kM < 0 ? 'Configuration papillon' : Math.abs(kM) > 1 && Math.abs(kN) > 1 ? 'Agrandissement' : 'M sur [AB], N sur [AC]';
  const info = document.getElementById('th3-exInfo');
  info.innerHTML = `<span class="hint" style="margin:0;">${conf}</span><br>${r1} &nbsp;&nbsp; ${r2}<br>`
    + (par ? `<b style="color:${TH3_VERT};">Rapports égaux et points dans le même ordre : (MN) est parallèle à (BC).</b>`
      : egaux ? `<b style="color:${TH3_ROUGE};">Rapports égaux, mais les points ne sont pas dans le même ordre : (MN) n'est pas parallèle à (BC).</b>`
      : `<b style="color:${TH3_ROUGE};">Rapports différents : (MN) n'est pas parallèle à (BC).</b>`);
  renderStaticMath(info);
}
function th3ExPreset(m, n){ document.getElementById('th3-exM').value = m; document.getElementById('th3-exN').value = n; th3ExDessiner(); }

/* ---- Méthode 2 : calcul de longueurs (papillon) ---- */
const TH3_CALCUL_STEPS = [
  { expr: 'Les points E, O, G et F, O, H sont alignés, et (EF) // (GH).', note: 'On vérifie les conditions du théorème de Thalès.' },
  { expr: th3Tex('\\dfrac{OG}{OE} = \\dfrac{OH}{OF} = \\dfrac{GH}{EF}'), note: "D'après le théorème de Thalès : on associe [OG] et [OE], [OH] et [OF], [GH] et [EF]." },
  { expr: th3Tex('\\dfrac{4{,}5}{7{,}5} = \\dfrac{3}{OF} = \\dfrac{2{,}7}{EF}'), note: 'On remplace par les longueurs connues.' },
  { expr: th3Tex('OF = \\dfrac{7{,}5 \\times 3}{4{,}5} = 5') + ' cm', note: 'Produit en croix avec les deux premiers rapports.' },
  { expr: th3Tex('EF = \\dfrac{7{,}5 \\times 2{,}7}{4{,}5} = 4{,}5') + ' cm', note: 'Produit en croix avec le premier et le troisième rapport.' },
];
const th3CalculDemo = makeStepDemo(TH3_CALCUL_STEPS, 'th3-calculDisplay');

/* ---- Méthode 3 : réciproque ---- */
const TH3_RECIPROQUE_STEPS = [
  { expr: 'Les points R, S, U et R, T, V sont alignés dans le même ordre.', note: 'S ∈ [RU] et T ∈ [RV] : première condition de la réciproque.' },
  { expr: th3Tex('\\dfrac{RS}{RU} = \\dfrac{4}{10} = 0{,}4'), note: 'On calcule séparément le premier rapport.' },
  { expr: th3Tex('\\dfrac{RT}{RV} = \\dfrac{3}{7{,}5} = 0{,}4'), note: 'Puis le second.' },
  { expr: th3Tex('\\dfrac{RS}{RU} = \\dfrac{RT}{RV}'), note: 'Les rapports sont égaux. (S\'ils étaient différents, les droites ne seraient pas parallèles.)' },
  { expr: 'Donc (ST) // (UV).', note: "D'après la réciproque du théorème de Thalès." },
];
const th3ReciproqueDemo = makeStepDemo(TH3_RECIPROQUE_STEPS, 'th3-reciproqueDisplay');

DEMO_REGISTRY['3e|Théorème de Thalès'] = {
  cours: 'cours-demo-thales-3e', methode: 'methode-demo-thales-3e', exos: 'exos-demo-thales-3e', histoire: 'histoire-demo-thales-3e',
  init: () => {
    th3ExDessiner(); th3CalculDemo.reset(); th3ReciproqueDemo.reset();
    ['cours-demo-thales-3e', 'methode-demo-thales-3e', 'exos-demo-thales-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-thales-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-thales-3e'));
  }
};

DEMO_QUIZZES['3e|Théorème de Thalès'] = [
  { q: 'A, B, M et A, C, N sont alignés et (BC) // (MN). Le théorème de Thalès donne...', opts: ['AM/AB = AN/AC = MN/BC', 'AM/MB = AN/NC = MN/BC', 'AB/AM = AN/AC = BC/MN'], correct: 0 },
  { q: 'Dans une configuration « papillon », le point A est...', opts: ['entre B et M, et entre C et N', 'sur le segment [BC]', 'le milieu de [MN]'], correct: 0 },
  { q: 'Avec AB = 4, AM = 6 et BC = 5 (et (BC) // (MN)), MN vaut...', opts: ['7,5', '3,3', '8'], correct: 0 },
  { q: 'Si AM/AB ≠ AN/AC (A, B, M et A, C, N alignés), alors...', opts: ['(BC) // (MN)', '(BC) et (MN) ne sont pas parallèles', 'on ne peut rien conclure'], correct: 1 },
  { q: 'Pour prouver que deux droites sont parallèles avec des longueurs, on utilise...', opts: ['le théorème de Thalès', 'la réciproque du théorème de Thalès', 'le théorème de Pythagore'], correct: 1 },
  { q: 'AM/AB = AN/AC, mais M et B sont du même côté de A alors que N et C sont de part et d\'autre de A. Alors...', opts: ['(BC) // (MN)', '(BC) et (MN) ne sont pas parallèles', 'le triangle est rectangle'], correct: 1 },
  { q: 'Dans un agrandissement de rapport 1,5 (B ∈ [AM], C ∈ [AN]), si BC = 4 cm, alors MN =', opts: ['6 cm', '5,5 cm', '2,7 cm'], correct: 0 },
];

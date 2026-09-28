/* ============================================================
   CHAPITRE : Translations (4e, G4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (capture du manuel, p. 107) puis "oui reprends le chapitre de translation" : même
   principe que les autres chapitres de 4e (plan du manuel, titres reformulés, exemples et figures
   nouveaux). Réutilise :
   - r4Ex / R4_REM (chapitres/4e/N1-operations-relatifs.js) pour les exemples rédigés ;
   - le petit moteur de figures g4* (chapitres/4e/G1-triangles-paralleles.js) ;
   - le quadrillage animé makeQgDemo / qgTrajet / qgMethodeHtml de la symétrie centrale
     (chapitres/5e/G1-symetrie-centrale.js), rejouable dans le cahier.
   Tous ces fichiers sont chargés avant celui-ci.
   ============================================================ */

// Vecteur « flèche » de P vers Q (trait + pointe dessinée, pas de marqueur SVG : lisible aussi dans le cahier).
function t4Fleche(P, Q, c, w, tirets){
  const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, T = 11, W = 5;
  const bx = Q[0] - ux * T, by = Q[1] - uy * T;
  return `<line x1="${P[0].toFixed(1)}" y1="${P[1].toFixed(1)}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${c}" stroke-width="${w || 2.2}"${tirets ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`
    + `<polygon points="${Q[0].toFixed(1)},${Q[1].toFixed(1)} ${(bx - uy * W).toFixed(1)},${(by + ux * W).toFixed(1)} ${(bx + uy * W).toFixed(1)},${(by - ux * W).toFixed(1)}" fill="${c}"/>`;
}
const t4Plus = (P, v) => [P[0] + v[0], P[1] + v[1]];
const t4Poly = (pts, c, fill) => `<polygon points="${pts.map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="${fill || 'none'}" stroke="${c}" stroke-width="2.2" stroke-linejoin="round"/>`;

/* ---- Figures du cours ---- */
// 1. Définition : une petite fusée F1 glisse (sans tourner) jusqu'à F2.
const T4_FUSEE = [[40, 150], [95, 150], [120, 132], [95, 114], [40, 114], [52, 132]];
const T4_V = [190, -50];
function t4FigDefinition(){
  const F2 = T4_FUSEE.map(p => t4Plus(p, T4_V)), A = T4_FUSEE[2], B = F2[2];
  let h = t4Poly(T4_FUSEE, G4_BLEU, 'rgba(12,91,160,.12)') + t4Poly(F2, G4_ORANGE, 'rgba(224,123,0,.14)');
  [0, 4].forEach(i => { h += t4Fleche(T4_FUSEE[i], F2[i], '#9CA3AF', 1.4, true); });
  h += t4Fleche(A, B, G4_ENCRE, 2.2) + g4Pt(A) + g4Pt(B) + g4Nom(A, [A[0], A[1] + 30], 'A') + g4Nom(B, [B[0], B[1] + 30], 'B');
  h += `<text x="70" y="172" font-family="Space Grotesk" font-size="15" font-style="italic" fill="${G4_BLEU}">F₁</text><text x="${70 + T4_V[0]}" y="${172 + T4_V[1]}" font-family="Space Grotesk" font-size="15" font-style="italic" fill="${G4_ORANGE}">F₂</text>`;
  return g4Svg(h, [...T4_FUSEE, ...F2], 460);
}
// 2. Image d'un point : ABM'M est un parallélogramme, [MB] et [AM'] ont le même milieu.
const T4_A = [50, 70], T4_B = [210, 30], T4_M = [90, 170], T4_VAB = [T4_B[0] - T4_A[0], T4_B[1] - T4_A[1]], T4_M2 = t4Plus(T4_M, T4_VAB);
function t4FigPoint(){
  const I = g4Lerp(T4_M, T4_B, 0.5), G = g4Centre([T4_A, T4_B, T4_M2, T4_M]);
  let h = `<polygon points="${[T4_A, T4_B, T4_M2, T4_M].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.07)"/>`
    + g4Seg(T4_A, T4_M, '#9CA3AF', 1.4, true) + g4Seg(T4_B, T4_M2, '#9CA3AF', 1.4, true)
    + g4Seg(T4_M, T4_B, G4_VERT, 1.4, true) + g4Seg(T4_A, T4_M2, G4_VERT, 1.4, true)
    + t4Fleche(T4_A, T4_B, G4_ENCRE) + t4Fleche(T4_M, T4_M2, G4_ORANGE)
    + g4Traits(T4_M, I, 1, G4_VERT) + g4Traits(I, T4_B, 1, G4_VERT) + g4Traits(T4_A, I, 2, G4_VERT) + g4Traits(I, T4_M2, 2, G4_VERT)
    + [T4_A, T4_B, T4_M, T4_M2].map(p => g4Pt(p)).join('') + g4Pt(I, G4_VERT)
    + g4Nom(T4_A, G, 'A') + g4Nom(T4_B, G, 'B') + g4Nom(T4_M, G, 'M') + g4Nom(T4_M2, G, "M'", G4_ORANGE);
  return g4Svg(h, [T4_A, T4_B, T4_M, T4_M2], 380);
}
// 2. Image d'un segment.
function t4FigSegment(){
  const R = [40, 60], S = [180, 40], M = [60, 150], N = [120, 210], v = [S[0] - R[0], S[1] - R[1]], M2 = t4Plus(M, v), N2 = t4Plus(N, v);
  const h = t4Fleche(R, S, G4_ENCRE) + g4Nom(R, [R[0] + 10, R[1] + 30], 'R') + g4Nom(S, [S[0] - 10, S[1] + 30], 'S') + g4Pt(R) + g4Pt(S)
    + g4Seg(M, N, G4_BLEU, 2.4) + g4Seg(M2, N2, G4_ORANGE, 2.4) + g4Seg(M, M2, '#9CA3AF', 1.2, true) + g4Seg(N, N2, '#9CA3AF', 1.2, true)
    + g4Traits(M, N, 2) + g4Traits(M2, N2, 2) + [M, N, M2, N2].map(p => g4Pt(p)).join('')
    + g4Nom(M, [M[0] + 30, M[1] + 20], 'M') + g4Nom(N, [N[0] + 30, N[1] - 20], 'N') + g4Nom(M2, [M2[0] - 30, M2[1] + 10], "M'", G4_ORANGE) + g4Nom(N2, [N2[0] - 30, N2[1]], "N'", G4_ORANGE);
  return g4Svg(h, [R, S, M, N, M2, N2], 380);
}
// 3. Propriétés : un quadrilatère et son image ; milieu, alignement et angle conservés.
function t4FigProprietes(){
  const Q = [[30, 110], [70, 40], [150, 60], [120, 150]], v = [210, 30], Q2 = Q.map(p => t4Plus(p, v));
  const J = g4Lerp(Q[1], Q[2], 0.5), J2 = t4Plus(J, v), K = g4Lerp(Q[0], Q[1], 0.4), K2 = t4Plus(K, v);
  const noms = ['A', 'B', 'C', 'D'], G1 = g4Centre(Q), G2 = g4Centre(Q2);
  let h = t4Poly(Q, G4_BLEU, 'rgba(12,91,160,.12)') + t4Poly(Q2, G4_VERT, 'rgba(30,123,52,.12)') + t4Fleche(Q[0], Q2[0], G4_ENCRE, 1.6, true)
    + g4Arc(Q[1], Q[0], Q[2], G4_ROUGE, 16) + g4Arc(Q2[1], Q2[0], Q2[2], G4_ROUGE, 16)
    + g4Traits(Q[1], J, 1) + g4Traits(J, Q[2], 1) + g4Traits(Q2[1], J2, 1) + g4Traits(J2, Q2[2], 1)
    + [J, J2, K, K2].map(p => g4Pt(p, G4_ENCRE)).join('')
    + g4Nom(J, [J[0], J[1] + 40], 'J') + g4Nom(J2, [J2[0], J2[1] + 40], "J'") + g4Nom(K, [K[0] + 30, K[1]], 'K') + g4Nom(K2, [K2[0] + 30, K2[1]], "K'");
  Q.forEach((p, i) => { h += g4Pt(p) + g4Nom(p, G1, noms[i]); });
  // A' : nom placé sous le point (la flèche de A à A' arrive par la gauche).
  Q2.forEach((p, i) => { h += g4Pt(p) + g4Nom(p, i === 0 ? [p[0] + 6, p[1] - 40] : G2, noms[i] + "'"); });
  return g4Svg(h, [...Q, ...Q2], 480);
}

document.getElementById('cours-demo-translations-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Faire glisser une figure : la translation</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Faire glisser une figure F₁, <b>sans la faire tourner</b>, de sorte que le point A arrive sur le point B, c'est lui appliquer la <b>translation qui transforme A en B</b>. La figure F₂ obtenue est l'<b>image</b> de F₁ par cette translation.</div>
${t4FigDefinition()}
<ul class="example-list"><li>Tous les points de la fusée se déplacent de la <b>même façon</b> que A vers B : même <b>direction</b> (flèches parallèles), même <b>sens</b> et même <b>longueur</b>.</li></ul>

<div class="lesson-header"><span class="num">2</span><h3>L'image d'un point, l'image d'un segment</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">L'image d'un point M par la translation qui transforme A en B est le point M' tel que les segments <b>[MB] et [AM'] ont le même milieu</b>. <b>Si</b> les points A, B et M ne sont pas alignés, <b>alors</b> le quadrilatère <b>ABM'M est un parallélogramme</b>.</div>
${t4FigPoint()}
<ul class="example-list"><li>On peut donc construire M' au compas, comme le quatrième sommet du parallélogramme ABM'M (voir l'onglet Méthode) : M'B = AM et MM' = AB.</li></ul>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">L'image d'un segment par une translation est un segment <b>parallèle</b> et de <b>même longueur</b>.</div>
${t4FigSegment()}
<p class="example-title">Exemple :</p>
<ul class="example-list"><li>Dans la translation qui transforme R en S, le segment [MN] a pour image le segment [M'N']. Donc les segments [MN] et [M'N'] sont parallèles et de même longueur : MN = M'N'.</li></ul>

<div class="lesson-header"><span class="num">3</span><h3>Ce que conserve une translation</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Une figure et son image par une translation sont <b>superposables</b>. Une translation <b>conserve</b> donc :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li>les <b>longueurs</b>, les <b>aires</b> et les <b>périmètres</b> ;</li>
    <li>les <b>mesures des angles</b> ;</li>
    <li>l'<b>alignement</b> des points et les <b>milieux</b>.</li>
  </ul>
</div>
<p class="example-title">Exemple : le quadrilatère A'B'C'D' est l'image de ABCD par la translation qui transforme A en A'.</p>
${t4FigProprietes()}
<ul class="example-list">
  <li>Les quadrilatères ABCD et A'B'C'D' ont la même aire et le même périmètre.</li>
  <li>Les points A, K, B sont alignés, donc leurs images A', K', B' sont aussi alignées.</li>
  <li>J est le milieu de [BC], donc son image J' est le milieu de [B'C'].</li>
  <li>L'angle <span class="tex">\\widehat{A'B'C'}</span> est l'image de l'angle <span class="tex">\\widehat{ABC}</span> : ils ont la même mesure.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : contrairement à la symétrie centrale (un demi-tour autour d'un point), la translation ne fait <b>pas tourner</b> la figure : elle la fait seulement glisser.</div>
`;

document.getElementById('histoire-demo-translations-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « translation » vient du latin <i>translatio</i>, « action de transporter ». Bien avant les mathématiciens, les artisans utilisaient les translations : les <b>frises</b> des vases grecs, les carrelages romains ou les mosaïques de l'<b>Alhambra</b> de Grenade répètent un même motif en le faisant glisser. À la fin du 19e siècle, les mathématiciens ont démontré qu'il n'existe que <b>17 façons</b> de recouvrir un plan en répétant un motif (on les appelle les « groupes de papier peint »). Au 20e siècle, l'artiste néerlandais <b>Maurits Cornelis Escher</b>, inspiré par les mosaïques de l'Alhambra, a créé des pavages célèbres où des oiseaux, des poissons ou des lézards s'emboîtent parfaitement, image les uns des autres par des translations.
</div>
`;

/* ---- Méthode 2 : construction au compas de l'image d'un point (animée, rejouable dans le cahier) ----
   Éléments : seg (trait qui s'allonge), arc (arc de compas qui se déroule), point (apparaît), fleche. */
const T4C_A = [60, 190], T4C_B = [200, 130], T4C_M = [110, 280], T4C_V = [T4C_B[0] - T4C_A[0], T4C_B[1] - T4C_A[1]], T4C_M2 = t4Plus(T4C_M, T4C_V);
const t4Dist = (P, Q) => Math.hypot(Q[0] - P[0], Q[1] - P[1]), t4Ang = (P, Q) => Math.atan2(Q[1] - P[1], Q[0] - P[0]) * 180 / Math.PI;
const T4C_ETAPES = [
  { html: 'On veut construire <b>M\'</b>, l\'image de M par la translation qui transforme A en B. On prend au compas l\'écartement <b>AB</b>.', el: [{ t: 'seg', a: T4C_A, b: T4C_B, c: G4_VERT, w: 3.4 }] },
  { html: 'On trace un <b>arc de cercle de centre M et de rayon AB</b>.', el: [{ t: 'arc', o: T4C_M, r: t4Dist(T4C_A, T4C_B), a0: t4Ang(T4C_M, T4C_M2) - 22, a1: t4Ang(T4C_M, T4C_M2) + 22, c: G4_VERT }] },
  { html: 'On prend l\'écartement <b>AM</b>, puis on trace un <b>arc de cercle de centre B et de rayon AM</b>.', el: [{ t: 'seg', a: T4C_A, b: T4C_M, c: G4_BLEU, w: 3.4 }, { t: 'arc', o: T4C_B, r: t4Dist(T4C_A, T4C_M), a0: t4Ang(T4C_B, T4C_M2) - 25, a1: t4Ang(T4C_B, T4C_M2) + 25, c: G4_BLEU }] },
  { html: 'Les deux arcs se coupent en <b>M\'</b>.', el: [{ t: 'point', p: T4C_M2, nom: "M'", c: G4_ORANGE }] },
  { html: 'On trace le quadrilatère <b>ABM\'M</b> : c\'est un <b>parallélogramme</b> (côtés opposés de même longueur). M\' est bien l\'image de M : la flèche de M à M\' est parallèle à celle de A à B, de même sens et de même longueur.', el: [{ t: 'seg', a: T4C_B, b: T4C_M2, c: G4_ENCRE }, { t: 'seg', a: T4C_M, b: T4C_M2, c: G4_ENCRE }, { t: 'fleche', a: T4C_M, b: T4C_M2, c: G4_ORANGE }] },
];
function t4cDessine(e, f){
  if(e.t === 'seg'){ const Q = g4Lerp(e.a, e.b, f); return f > 0.02 ? `<line x1="${e.a[0]}" y1="${e.a[1]}" x2="${Q[0].toFixed(1)}" y2="${Q[1].toFixed(1)}" stroke="${e.c}" stroke-width="${e.w || 2}" stroke-linecap="round"${e.w ? ' stroke-opacity=".45"' : ''}/>` : ''; }
  if(e.t === 'arc'){
    if(f <= 0.02) return '';
    const a1 = e.a0 + (e.a1 - e.a0) * f, r = e.r, rad = x => x * Math.PI / 180;
    const P0 = [e.o[0] + r * Math.cos(rad(e.a0)), e.o[1] + r * Math.sin(rad(e.a0))], P1 = [e.o[0] + r * Math.cos(rad(a1)), e.o[1] + r * Math.sin(rad(a1))];
    return `<path d="M${P0[0].toFixed(1)},${P0[1].toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 1 ${P1[0].toFixed(1)},${P1[1].toFixed(1)}" fill="none" stroke="${e.c}" stroke-width="1.8"/>`
      + (f < 1 ? `<line x1="${e.o[0]}" y1="${e.o[1]}" x2="${P1[0].toFixed(1)}" y2="${P1[1].toFixed(1)}" stroke="#9CA3AF" stroke-width="1" stroke-dasharray="3 3"/>` : '');
  }
  if(e.t === 'point') return f > 0.5 ? g4Pt(e.p, e.c) + g4Nom(e.p, [e.p[0] - 20, e.p[1] + 30], e.nom, e.c) : '';
  if(e.t === 'fleche') return f >= 1 ? t4Fleche(e.a, e.b, e.c, 2.4) : '';
  return '';
}
function t4cRendu(kk, prog){
  let h = t4Fleche(T4C_A, T4C_B, G4_ENCRE, 2.2) + g4Seg(T4C_A, T4C_M, '#C9D6E6', 1.2, true)
    + [T4C_A, T4C_B, T4C_M].map(p => g4Pt(p)).join('') + g4Nom(T4C_A, [T4C_A[0] + 20, T4C_A[1] + 30], 'A') + g4Nom(T4C_B, [T4C_B[0], T4C_B[1] + 30], 'B') + g4Nom(T4C_M, [T4C_M[0] + 30, T4C_M[1] - 10], 'M');
  T4C_ETAPES.slice(0, kk).forEach((et, n) => et.el.forEach((e, m) => { h += t4cDessine(e, n === kk - 1 ? Math.max(0, Math.min(1, prog - m)) : 1); }));
  return h;
}
const T4C_VB = '20 60 330 260';
const t4CompasDemo = (function(){
  let k = 0, raf = null;
  const svg = () => document.getElementById('t4-compasSvg');
  function maj(kk, prog){
    const s = svg(); if(s) s.innerHTML = t4cRendu(kk, prog);
    document.querySelectorAll('#t4-compasSteps .step-item').forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= kk));
    const b = document.getElementById('t4-compasNext'); if(b){ b.disabled = kk >= T4C_ETAPES.length; b.textContent = kk >= T4C_ETAPES.length ? 'Terminé ✓' : 'Étape suivante →'; }
  }
  return {
    init(){ const l = document.getElementById('t4-compasSteps'); if(l) l.innerHTML = T4C_ETAPES.map((e, n) => `<div class="step-item" data-step="${n + 1}"><div class="step-num">${n + 1}</div><div>${e.html}</div></div>`).join(''); k = 0; maj(0, 0); },
    next(){
      if(k >= T4C_ETAPES.length) return;
      cancelAnimationFrame(raf); k++;
      const kk = k, n = T4C_ETAPES[k - 1].el.length, t0 = performance.now();
      const f = now => { if(kk !== k) return; const p = Math.max(0, Math.min(n, (now - t0) / 900)); maj(kk, p); if(p < n) raf = requestAnimationFrame(f); };
      raf = requestAnimationFrame(f);
    },
    reset(){ cancelAnimationFrame(raf); k = 0; maj(0, 0); },
    goto(i){ cancelAnimationFrame(raf); k = i + 1; maj(k, 99); },
    steps: () => T4C_ETAPES.map(e => ({ note: e.html.replace(/<[^>]+>/g, '') })),
    getIdx: () => k - 1,
    // Rejeu des mouvements dans le cahier (voir cahierJouerEtape, app.js).
    anim: { viewBox: T4C_VB, n: i => T4C_ETAPES[i].el.length, rendu: (i, prog) => t4cRendu(i + 1, prog) },
  };
})();
registerGeoStepDemo('t4-compasSvg', { steps: t4CompasDemo.steps, getIdx: t4CompasDemo.getIdx, goto: t4CompasDemo.goto, anim: t4CompasDemo.anim });

/* ---- Méthode 3 : image d'un triangle sur quadrillage (quadrillage animé de la symétrie centrale) ---- */
(function t4Quadrillage(){
  const A = { i: 1, j: 8, nom: 'A' }, B = { i: 6, j: 6, nom: 'B' };
  const E = { i: 2, j: 4, nom: 'E' }, F = { i: 5, j: 5, nom: 'F' }, G = { i: 3, j: 7, nom: 'G' };
  const img = (P, nom) => ({ i: P.i + B.i - A.i, j: P.j + B.j - A.j, nom });
  const E2 = img(E, "E'"), F2 = img(F, "F'"), G2 = img(G, "G'");
  const pt = (p, c, lx, ly) => ({ t: 'point', p, c, lx, ly });
  const depart = [{ t: 'seg', a: E, b: F, c: QG_BLEU }, { t: 'seg', a: F, b: G, c: QG_BLEU }, { t: 'seg', a: G, b: E, c: QG_BLEU },
    pt(A, QG_ENCRE, -16, 4), pt(B, QG_ENCRE, 6, -9), pt(E, QG_BLEU, -16, -6), pt(F, QG_BLEU, 8, -6), pt(G, QG_BLEU, -18, 4)];
  QG_DEMOS.t4Quad = makeQgDemo('t4Quad', depart, [
    { html: `Pour aller de <b>A</b> à <b>B</b>, je compte les carreaux : ${qgDecrit(A, B)}.`, el: qgTrajet(A, B, QG_BLEU) },
    { html: `En partant de <b>E</b>, je fais <b>le même déplacement</b> : j'obtiens <b>E'</b>.`, el: qgTrajet(A, B, QG_ORANGE, E).concat([pt(E2, QG_ORANGE, -8, -9)]) },
    { html: `Même déplacement en partant de <b>F</b> : j'obtiens <b>F'</b>.`, el: qgTrajet(A, B, QG_ORANGE, F).concat([pt(F2, QG_ORANGE, 8, -6)]) },
    { html: `Même déplacement en partant de <b>G</b> : j'obtiens <b>G'</b>.`, el: qgTrajet(A, B, QG_ORANGE, G).concat([pt(G2, QG_ORANGE, 8, 14)]) },
    { html: `Je trace le triangle <b>E'F'G'</b> : c'est l'image de EFG. Il a exactement la même forme et les mêmes dimensions, et ses côtés sont parallèles à ceux de EFG.`,
      el: [{ t: 'seg', a: E2, b: F2, c: QG_ORANGE }, { t: 'seg', a: F2, b: G2, c: QG_ORANGE }, { t: 'seg', a: G2, b: E2, c: QG_ORANGE }] },
  ]);
  registerGeoStepDemo('t4QuadSvg', { steps: QG_DEMOS.t4Quad.steps, getIdx: QG_DEMOS.t4Quad.getIdx, goto: QG_DEMOS.t4Quad.goto, anim: QG_DEMOS.t4Quad.anim });
})();

/* ---- Méthode 1 : la figure glisse le long de la flèche ---- */
const T4G_F = [[40, 170], [110, 170], [110, 130], [80, 100], [40, 130]], T4G_V = [230, -50];
let t4gRaf = null;
function t4gDessin(f){
  const d = [T4G_V[0] * f, T4G_V[1] * f], F = T4G_F.map(p => t4Plus(p, d)), A = T4G_F[3], B = t4Plus(A, T4G_V);
  let h = t4Poly(T4G_F, G4_BLEU, 'rgba(12,91,160,.10)') + t4Fleche(A, B, G4_ENCRE, 1.8, true) + g4Nom(A, [A[0], A[1] + 40], 'A') + g4Nom(B, [B[0], B[1] + 40], 'B') + g4Pt(B);
  if(f > 0.01) T4G_F.forEach(p => { if(f > 0.05) h += t4Fleche(p, t4Plus(p, d), G4_ORANGE, 1.3); });
  h += t4Poly(F, G4_ORANGE, 'rgba(224,123,0,.18)') + T4G_F.map(p => g4Pt(p, G4_BLEU)).join('');
  return h;
}
function t4gReset(){ cancelAnimationFrame(t4gRaf); const s = document.getElementById('t4-glisseSvg'); if(s) s.innerHTML = t4gDessin(0); const n = document.getElementById('t4-glisseNote'); if(n) n.textContent = 'La maison doit glisser de sorte que son sommet A arrive sur B.'; }
function t4gJouer(){
  cancelAnimationFrame(t4gRaf);
  const s = document.getElementById('t4-glisseSvg'), n = document.getElementById('t4-glisseNote'), t0 = performance.now();
  n.textContent = 'Chaque sommet se déplace comme A vers B : même direction, même sens, même longueur.';
  const f = now => { const t = Math.max(0, Math.min(1, (now - t0) / 2200)), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; s.innerHTML = t4gDessin(e); if(t < 1) t4gRaf = requestAnimationFrame(f); else n.textContent = 'Toutes les flèches orange sont parallèles, de même sens et de même longueur que la flèche de A à B.'; };
  t4gRaf = requestAnimationFrame(f);
}

document.getElementById('methode-demo-translations-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : voir une figure glisser</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="t4-glisseSvg" viewBox="10 22 400 178" style="width:100%;max-width:480px;display:block;margin:8px auto;"></svg>
  <div id="t4-glisseNote" class="step-note" style="text-align:center;min-height:2.4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="t4gJouer()">Faire glisser</button>
    <button class="btn secondary" onclick="t4gReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header" style="margin-top:26px;"><span class="letter">M</span><h4>Méthode 2 : construire l'image d'un point au compas</h4></div>
<div class="figure-wrap" id="t4-compasWrap">
  <svg id="t4-compasSvg" viewBox="${T4C_VB}" style="width:100%;max-width:420px;display:block;margin:14px auto;"></svg>
  <div class="step-list" id="t4-compasSteps"></div>
  <div class="figure-toolbar">
    <button class="btn" id="t4-compasNext" onclick="t4CompasDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="t4CompasDemo.reset()">Revoir depuis le début</button>
  </div>
</div>

${qgMethodeHtml('t4Quad', 'Méthode 3 : construire l\'image d\'un triangle sur un quadrillage')}
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function t4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="t4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="t4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-translations-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Justifier une propriété de l'image »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">[E'F'] est l'image de [EF] par la translation qui transforme R en S.</span><span class="we-comment">1. On cite la transformation.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Or une translation conserve les longueurs.</span><span class="we-comment">2. On cite la propriété du cours.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Donc E'F' = EF = 6 cm.</span><span class="we-comment">3. On conclut.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${t4Exo(1, 'Par la translation qui transforme A en B, le point C (non aligné avec A et B) a pour image le point D. Quelle est la nature du quadrilatère ABDC ?', [
    'D\'après la propriété 1, ABDC est un parallélogramme : [CB] et [AD] ont le même milieu.'])}
  ${t4Exo(2, 'Le segment [EF] mesure 6 cm. Quelle est la longueur de son image [E\'F\'] par une translation ? Que peut-on dire des droites (EF) et (E\'F\') ?', [
    'Une translation conserve les longueurs : E\'F\' = 6 cm.', 'L\'image d\'un segment est un segment parallèle : (E\'F\') // (EF).'])}
  ${t4Exo(3, 'Un triangle a une aire de 12 cm² et l\'un de ses angles mesure 50°. Que peut-on dire de son image par une translation ?', [
    'Son image a aussi une aire de 12 cm² et un angle de 50° : une translation conserve les aires et les mesures des angles.'])}
  ${t4Exo(4, 'I est le milieu du segment [KL]. On note K\', L\' et I\' les images de K, L et I par une translation. Que peut-on dire du point I\' ?', [
    'Une translation conserve les milieux : I\' est le milieu de [K\'L\'].'])}
  ${t4Exo(5, 'Les points R, S et T sont alignés. Leurs images R\', S\' et T\' par une translation sont-elles alignées ?', [
    'Oui : une translation conserve l\'alignement.'])}
  ${t4Exo(6, 'Sur un quadrillage, la translation transforme A en B. Le point P est situé 4 carreaux à droite et 2 carreaux en dessous de A. Où se trouve son image P\' ?', [
    'P\' est situé 4 carreaux à droite et 2 carreaux en dessous de B : la translation fait glisser toute la figure de la même façon, donc les positions relatives sont conservées.'])}
  ${t4Exo(7, 'Vrai ou faux : « l\'image d\'un segment par une translation peut être plus longue que ce segment ».', [
    'Faux : une translation conserve les longueurs, l\'image a toujours la même longueur.'])}
  ${t4Exo(8, 'ABCD est un parallélogramme. Quelle est l\'image du point D par la translation qui transforme A en B ?', [
    'ABCD est un parallélogramme, donc [AC] et [BD] ont le même milieu, autrement dit [DB] et [AC] ont le même milieu.', 'D\'après la propriété 1, l\'image de D par la translation qui transforme A en B est C.'])}
</div>
`;

DEMO_REGISTRY['4e|Translations'] = {
  cours: 'cours-demo-translations-4e', methode: 'methode-demo-translations-4e', exos: 'exos-demo-translations-4e', histoire: 'histoire-demo-translations-4e',
  init: () => {
    t4gReset(); t4CompasDemo.init(); QG_DEMOS.t4Quad.init();
    renderStaticMath(document.getElementById('cours-demo-translations-4e'));
    injectCourseAddButtons(document.getElementById('cours-demo-translations-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-translations-4e'));
  }
};

DEMO_QUIZZES['4e|Translations'] = [
  { q: 'Par une translation, une figure...', opts: ['glisse sans tourner', 'fait un demi-tour', 'est retournée'], correct: 0 },
  { q: 'M\' est l\'image de M par la translation qui transforme A en B. Alors ABM\'M est...', opts: ['un parallélogramme (si A, B, M ne sont pas alignés)', 'un triangle', 'un losange dans tous les cas'], correct: 0 },
  { q: 'L\'image d\'un segment de 5 cm par une translation mesure...', opts: ['5 cm', '10 cm', 'cela dépend de la translation'], correct: 0 },
  { q: 'L\'image d\'un segment par une translation lui est...', opts: ['perpendiculaire', 'parallèle', 'sécante'], correct: 1 },
  { q: 'Une translation conserve-t-elle les aires ?', opts: ['Oui', 'Non'], correct: 0 },
  { q: 'I est le milieu de [AB]. Son image I\' par une translation est...', opts: ['le milieu de [A\'B\']', 'le point A\'', 'un point quelconque'], correct: 0 },
  { q: 'ABCD est un parallélogramme. L\'image de D par la translation qui transforme A en B est...', opts: ['B', 'C', 'A'], correct: 1 },
];

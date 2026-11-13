/* ============================================================
   CHAPITRE : Droite des milieux (4e, G6) -- NOUVEAU PROGRAMME (BO n° 10 du 05/03/2026, en vigueur en 4e à la rentrée 2027)
   Demandé le 13/11/2026 : « Vu que je souhaite lancer les ventes pour la rentrée prochaine, autant faire les nouveaux
   programmes » (4e seulement, ancien programme gardé en option). Le programme nomme « les trois théorèmes de la droite des
   milieux » et les démonstrations : le cours démontre le théorème (parallélogrammes de 5e), la méthode reprend les trois
   usages (parallèles, longueur, milieu). Utilise r4Ex / R4_REM / r4Colonne (chapitres/4e/N1-operations-relatifs.js), le petit
   moteur g4* (chapitres/4e/G1-triangles-paralleles.js) et apdFig (géométrie dynamique, chapitres/5e/G2-angles-parallelisme.js),
   tous chargés avant.
   ============================================================ */

const DM4_BLEU = '#0C5BA0', DM4_VERT = '#1E7B34', DM4_ORANGE = '#E07B00', DM4_ROUGE = '#C0392B', DM4_ENCRE = '#1C1B2E';
const dm4Tex = s => `<span class="tex"${s.length < 26 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
// Droite (PQ) prolongée de part et d'autre (k fois la longueur de [PQ]).
const dm4Droite = (P, Q, c, k, w) => g4Seg(g4Lerp(P, Q, -(k || .35)), g4Lerp(P, Q, 1 + (k || .35)), c, w || 1.8);
// Triangle ABC avec les milieux codés : o = { T: [A, B, C], noms, mil: [[i, j, n, nom]] (milieu de [TiTj], n traits),
// droite: [P, Q, couleur] ou seg: [[P, Q, couleur, épaisseur]], cotes: [[P, Q, texte, couleur]], max }.
function dm4Fig(o){
  const T = o.T, G = g4Centre(T), noms = o.noms || ['A', 'B', 'C'], pts = [...T];
  let h = `<polygon points="${T.map(p => p.join(',')).join(' ')}" fill="${o.fond || 'rgba(12,91,160,.07)'}" stroke="none"/>`;
  h += [0, 1, 2].map(i => g4Seg(T[i], T[(i + 1) % 3], DM4_ENCRE, 2)).join('');
  (o.seg || []).forEach(([P, Q, c, w]) => { h += g4Seg(P, Q, c, w || 3); pts.push(P, Q); });
  if(o.droite){ const [P, Q, c] = o.droite; h += dm4Droite(P, Q, c || DM4_ORANGE); pts.push(g4Lerp(P, Q, -.35), g4Lerp(P, Q, 1.35)); }
  (o.mil || []).forEach(([i, j, n, nom]) => { const M = g4Lerp(T[i], T[j], .5); h += g4Traits(T[i], M, n) + g4Traits(M, T[j], n) + g4Pt(M) + g4Nom(M, G, nom); });
  (o.pts || []).forEach(([P, nom, ref]) => { h += g4Pt(P) + g4Nom(P, ref || G, nom); pts.push(P); });
  (o.cotes || []).forEach(([P, Q, t, c]) => { h += g4Longueur(P, Q, G, t, c); });
  if(o.extra) h += o.extra;
  T.forEach((P, i) => { h += g4Pt(P) + g4Nom(P, G, noms[i]); });
  return g4Svg(h, pts, o.max || 380);
}
const DM4_T = [[170, 30], [50, 190], [330, 190]], DM4_I = g4Lerp(DM4_T[0], DM4_T[1], .5), DM4_J = g4Lerp(DM4_T[0], DM4_T[2], .5);
const dm4Deux = (a, b) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 18px;align-items:center;">${a}${b}</div>`;

/* Géométrie dynamique : triangle ABC à déformer, I et J milieux de [AB] et [AC] ; les longueurs IJ et BC se mettent à jour. */
function dm4Dyn(){
  const mil = (label, a, b, x, y, dx, dy) => ({ label, x, y, def: { type: 'milieu', a: apdP(a), b: apdP(b) }, dependsOn: [apdP(a), apdP(b)], labelDx: dx, labelDy: dy });
  return apdFig([{ label: 'A', x: 220, y: 40, labelDx: 0, labelDy: -10 }, { label: 'B', x: 70, y: 270, labelDx: -14, labelDy: 6 }, { label: 'C', x: 430, y: 270, labelDx: 8, labelDy: 6 },
      mil('I', 0, 1, 145, 155, -16, 0), mil('J', 0, 2, 325, 155, 8, 0)],
    [{ type: 'segment', p1: apdP(0), p2: apdP(1) }, { type: 'segment', p1: apdP(1), p2: apdP(2) }, { type: 'segment', p1: apdP(2), p2: apdP(0) },
     { type: 'droite', p1: apdP(3), p2: apdP(4), strokeColor: '#E07B00' },
     { type: 'mesure-distance', p1: apdP(3), p2: apdP(4), labelOffset: -16 }, { type: 'mesure-distance', p1: apdP(1), p2: apdP(2), labelOffset: 18 }]);
}

document.getElementById('cours-demo-droite-milieux-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>La droite qui passe par deux milieux</h3></div>
<div class="dyn-activite">
  <p class="dyn-activite-titre"><span class="gicon">touch_app</span> Géométrie dynamique : découvre les propriétés</p>
  <p style="margin:4px 0 6px;">I est le milieu de [AB] et J le milieu de [AC]. Déplace les points A, B ou C : le triangle se déforme, I et J restent les milieux.</p>
  ${dm4Dyn()}
  <ul style="margin:8px 0 0;"><li>Que remarques-tu sur la position de la droite (IJ) et de la droite (BC) ?</li><li>Compare les longueurs IJ et BC pour plusieurs triangles. Que remarques-tu ?</li></ul>
</div>
<span class="prop-badge">Théorème 1</span>
<div class="def-box"><b>Si</b> une droite passe par les <b>milieux de deux côtés</b> d'un triangle, <b>alors</b> elle est <b>parallèle au troisième côté</b>.</div>
${dm4Deux(`<ul class="example-list"><li>Dans le triangle ABC, I est le milieu de [AB] et J est le milieu de [AC].</li><li>D'après le théorème de la droite des milieux, la droite (IJ) est parallèle à la droite (BC) : (IJ) // (BC).</li></ul>`,
  dm4Fig({ T: DM4_T, mil: [[0, 1, 1, 'I'], [0, 2, 2, 'J']], droite: [DM4_I, DM4_J, DM4_ORANGE], seg: [[DM4_T[1], DM4_T[2], DM4_ORANGE, 3]], max: 320 }))}

<span class="prop-badge">Théorème 2</span>
<div class="def-box"><b>Si</b> un segment joint les <b>milieux de deux côtés</b> d'un triangle, <b>alors</b> sa longueur est égale à la <b>moitié de la longueur du troisième côté</b>.</div>
${dm4Deux(`<ul class="example-list"><li>Dans le triangle ABC, I est le milieu de [AB] et J est le milieu de [AC], avec BC = 7 cm.</li><li>D'après le théorème de la droite des milieux : ${dm4Tex('IJ = \\dfrac{BC}{2}')}, soit ${dm4Tex('IJ = \\dfrac{7}{2}')}, donc IJ = 3,5 cm.</li></ul>`,
  dm4Fig({ T: DM4_T, mil: [[0, 1, 1, 'I'], [0, 2, 2, 'J']], seg: [[DM4_I, DM4_J, DM4_VERT, 3], [DM4_T[1], DM4_T[2], DM4_VERT, 3]], cotes: [[DM4_T[1], DM4_T[2], '7 cm', DM4_VERT], [DM4_I, DM4_J, '?', DM4_VERT]], max: 320 }))}
<div class="redaction-note" ${R4_REM}>Remarque : les deux théorèmes ont les <b>mêmes hypothèses</b> (deux milieux). Le premier conclut au <b>parallélisme</b>, le second donne une <b>longueur</b> : ${dm4Tex('IJ = \\dfrac{BC}{2}')}, autrement dit BC = 2 × IJ.</div>

<div class="lesson-header"><span class="num">2</span><h3>La droite qui passe par un milieu, parallèle à un côté</h3></div>
<span class="prop-badge">Théorème 3</span>
<div class="def-box"><b>Si</b> une droite passe par le <b>milieu d'un côté</b> d'un triangle <b>et</b> est <b>parallèle à un deuxième côté</b>, <b>alors</b> elle coupe le troisième côté <b>en son milieu</b>.</div>
${dm4Deux(`<ul class="example-list"><li>Dans le triangle ABC, I est le milieu de [AB]. La droite (d) passe par I et elle est parallèle à (BC) ; elle coupe [AC] en J.</li><li>D'après le théorème de la droite des milieux, J est le milieu de [AC].</li></ul>`,
  dm4Fig({ T: DM4_T, mil: [[0, 1, 1, 'I']], pts: [[DM4_J, 'J']], droite: [DM4_I, DM4_J, DM4_ROUGE], extra: `<text x="${(g4Lerp(DM4_I, DM4_J, 1.3)[0]).toFixed(0)}" y="${(DM4_J[1] - 8).toFixed(0)}" font-size="14" font-weight="700" fill="${DM4_ROUGE}">(d)</text>`, max: 320 }))}
<div class="redaction-note" ${R4_REM}>Attention : avec <b>un seul</b> milieu, il faut <b>en plus</b> le parallélisme. Une droite qui passe par le milieu d'un côté n'est pas toujours parallèle à un autre côté !</div>

<div class="lesson-header"><span class="num">3</span><h3>Pourquoi le théorème est vrai : une démonstration</h3></div>
<p style="margin:4px 0 8px;">Les figures ne suffisent pas pour être sûr que c'est vrai dans <b>tous</b> les triangles : on le <b>démontre</b>, avec les parallélogrammes vus en 5e. La démonstration animée est dans l'onglet Méthode (méthode 4).</p>
${dm4Deux(r4Ex('', [
  ['On note K le symétrique de I par rapport à J : J est le milieu de [IK].', ''],
  ['J est aussi le milieu de [AC] : les diagonales [IK] et [AC] du quadrilatère AICK ont le même milieu, donc <b>AICK est un parallélogramme</b>.', ''],
  ['Donc (CK) // (AI), c\'est-à-dire (CK) // (IB), et CK = AI = IB (car I est le milieu de [AB]).', ''],
  ['Le quadrilatère IBCK a deux côtés opposés [IB] et [CK] parallèles et de même longueur : <b>IBCK est un parallélogramme</b>.', ''],
  ['Donc (IK) // (BC), c\'est-à-dire <b>(IJ) // (BC)</b>, et IK = BC.', ''],
  [dm4Tex('IJ = \\dfrac{IK}{2}'), 'J est le milieu de [IK].'],
  [dm4Tex('IJ = \\dfrac{BC}{2}'), 'Car IK = BC.'],
]), dm4Fig({ T: DM4_T, mil: [[0, 1, 1, 'I'], [0, 2, 2, 'J']], pts: [[g4Lerp(DM4_I, DM4_J, 2), 'K', DM4_J]], seg: [[DM4_J, g4Lerp(DM4_I, DM4_J, 2), DM4_ORANGE, 2], [DM4_I, DM4_J, DM4_ORANGE, 2], [DM4_T[2], g4Lerp(DM4_I, DM4_J, 2), DM4_BLEU, 2.4], [DM4_T[0], g4Lerp(DM4_I, DM4_J, 2), '#9CA3AF', 1.4]], max: 340 }))}
<div class="redaction-note" ${R4_REM}>En 3e, le théorème de Thalès généralisera ces résultats : au lieu de partager les côtés en deux, on les partagera dans le même rapport.</div>
`;

document.getElementById('histoire-demo-droite-milieux-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : les milieux, de l'Antiquité au 18e siècle</div>
  <p style="margin:6px 0 10px;">Vers 300 av. J.-C., le Grec <b>Euclide</b> rassemble dans ses <i>Éléments</i> la géométrie connue à son époque. Le livre VI s'ouvre sur une propriété générale : une droite parallèle à un côté d'un triangle coupe les deux autres côtés « proportionnellement ». Le théorème de la droite des milieux en est le cas le plus simple, celui où l'on coupe en deux : c'est ce cas général que tu étudieras en 3e sous le nom de <b>théorème de Thalès</b>.</p>
  <p style="margin:0 0 10px;">Près de 2 000 ans plus tard, le Français <b>Pierre Varignon</b> (1654-1722), ami des savants Newton et Leibniz, remarque une étonnante conséquence : si l'on joint, dans l'ordre, les milieux des quatre côtés de <b>n'importe quel</b> quadrilatère, on obtient toujours un <b>parallélogramme</b> ! Son résultat est publié en 1731, après sa mort, dans un manuel pour les élèves. Tu peux le démontrer avec les théorèmes de ce chapitre (exercice 7).</p>
  ${dm4Fig({ T: [[60, 40], [40, 200], [330, 210]], noms: ['A', 'B', 'C'], fond: 'rgba(0,0,0,0)', extra: (() => { const A = [60, 40], B = [40, 200], C = [330, 210], D = [250, 30];
      const I = g4Lerp(A, B, .5), J = g4Lerp(B, C, .5), K = g4Lerp(C, D, .5), L = g4Lerp(D, A, .5);
      return g4Seg(C, D, DM4_ENCRE, 2) + g4Seg(D, A, DM4_ENCRE, 2) + `<polygon points="${[I, J, K, L].map(p => p.join(',')).join(' ')}" fill="rgba(224,123,0,.16)" stroke="${DM4_ORANGE}" stroke-width="2.6"/>` + [I, J, K, L].map(p => g4Pt(p)).join('') + g4Pt(D) + g4Nom(D, [180, 120], 'D'); })(), max: 300 })}
  <p style="margin:4px 0 0;text-align:center;font-size:.88rem;">Le parallélogramme de Varignon (en orange), formé par les milieux des côtés du quadrilatère ABCD.</p>
</div>
`;

/* ---- Méthodes (étapes) ---- */
const DM4_PAR_STEPS = [
  { expr: 'Dans le triangle RST, M est le milieu de [RS] et N est le milieu de [RT].', note: 'On écrit les hypothèses : deux milieux de deux côtés d\'un même triangle.', fig: dm4Fig({ T: DM4_T, noms: ['R', 'S', 'T'], mil: [[0, 1, 1, 'M'], [0, 2, 2, 'N']], max: 300 }) },
  { expr: 'D\'après le théorème de la droite des milieux,', note: 'On cite le théorème : c\'est le premier (deux milieux, on veut un parallélisme).' },
  { expr: '(MN) // (ST).', note: 'On conclut.', fig: dm4Fig({ T: DM4_T, noms: ['R', 'S', 'T'], mil: [[0, 1, 1, 'M'], [0, 2, 2, 'N']], droite: [DM4_I, DM4_J, DM4_ORANGE], seg: [[DM4_T[1], DM4_T[2], DM4_ORANGE, 3]], max: 300 }) },
];
const DM4_LONG_STEPS = [
  { expr: 'Dans le triangle EFG, K est le milieu de [EF] et L est le milieu de [EG], avec FG = 11 cm.', note: 'Les hypothèses : deux milieux et la longueur du troisième côté.', fig: dm4Fig({ T: DM4_T, noms: ['E', 'F', 'G'], mil: [[0, 1, 1, 'K'], [0, 2, 2, 'L']], cotes: [[DM4_T[1], DM4_T[2], '11 cm', DM4_VERT]], max: 300 }) },
  { expr: 'D\'après le théorème de la droite des milieux :', note: 'Le deuxième théorème : le segment [KL] joint les milieux.' },
  { expr: dm4Tex('KL = \\dfrac{FG}{2}'), note: 'On écrit l\'égalité avec les noms des segments.' },
  { expr: dm4Tex('KL = \\dfrac{11}{2}'), note: 'On remplace par la longueur connue.' },
  { expr: 'KL = 5,5 cm.', note: 'On calcule.', fig: dm4Fig({ T: DM4_T, noms: ['E', 'F', 'G'], mil: [[0, 1, 1, 'K'], [0, 2, 2, 'L']], seg: [[DM4_I, DM4_J, DM4_VERT, 3]], cotes: [[DM4_T[1], DM4_T[2], '11 cm', DM4_VERT], [DM4_I, DM4_J, '5,5 cm', DM4_VERT]], max: 300 }) },
];
const DM4_MIL_STEPS = [
  { expr: 'Dans le triangle UVW, P est le milieu de [UV] et la droite (d) passe par P, parallèle à (VW). Elle coupe [UW] en Q.', note: 'Les hypothèses : un milieu, et un parallélisme.', fig: dm4Fig({ T: DM4_T, noms: ['U', 'V', 'W'], mil: [[0, 1, 1, 'P']], pts: [[DM4_J, 'Q']], droite: [DM4_I, DM4_J, DM4_ROUGE], max: 300 }) },
  { expr: 'D\'après le théorème de la droite des milieux,', note: 'Le troisième théorème : un milieu + une parallèle.' },
  { expr: 'Q est le milieu de [UW].', note: 'On conclut : on peut ensuite coder la figure.', fig: dm4Fig({ T: DM4_T, noms: ['U', 'V', 'W'], mil: [[0, 1, 1, 'P'], [0, 2, 2, 'Q']], droite: [DM4_I, DM4_J, DM4_ROUGE], max: 300 }) },
];
const dm4ParDemo = makeStepDemo(DM4_PAR_STEPS, 'dm4-parDisplay');
const dm4LongDemo = makeStepDemo(DM4_LONG_STEPS, 'dm4-longDisplay');
const dm4MilDemo = makeStepDemo(DM4_MIL_STEPS, 'dm4-milDisplay');
// Méthode 4 : la démonstration, figure construite pas à pas.
const DM4_K = g4Lerp(DM4_I, DM4_J, 2);
const dm4F = (n) => dm4Fig({ T: DM4_T, mil: [[0, 1, 1, 'I'], [0, 2, 2, 'J']], max: 320,
  pts: n >= 1 ? [[DM4_K, 'K', DM4_J]] : [],
  seg: [n >= 1 ? [DM4_I, DM4_K, DM4_ORANGE, 2] : null, n >= 2 ? [DM4_T[0], DM4_K, DM4_BLEU, 2] : null, n >= 2 ? [DM4_T[2], DM4_K, DM4_BLEU, 2.4] : null,
    n >= 3 ? [DM4_T[1], DM4_T[2], DM4_VERT, 3] : null, n >= 3 ? [DM4_I, DM4_K, DM4_VERT, 3] : null].filter(Boolean) });
const DM4_PREUVE_STEPS = [
  { expr: 'I est le milieu de [AB], J est le milieu de [AC].', note: 'Ce qu\'on sait. On veut démontrer que (IJ) // (BC) et que IJ est la moitié de BC.', fig: dm4F(0) },
  { expr: 'On place K, le symétrique de I par rapport à J.', note: 'Une construction en plus, qui fait apparaître des parallélogrammes : J est le milieu de [IK].', fig: dm4F(1) },
  { expr: '[AC] et [IK] ont le même milieu J, donc AICK est un parallélogramme.', note: 'Propriété des diagonales (5e). Donc (CK) // (AB) et CK = AI.', fig: dm4F(2) },
  { expr: 'CK = AI = IB et (CK) // (IB), donc IBCK est un parallélogramme.', note: 'Deux côtés opposés parallèles et de même longueur.', fig: dm4F(3) },
  { expr: 'Donc (IJ) // (BC) et IK = BC.', note: 'Côtés opposés d\'un parallélogramme : parallèles et de même longueur.' },
  { expr: dm4Tex('IJ = \\dfrac{IK}{2}'), note: 'J est le milieu de [IK].' },
  { expr: dm4Tex('IJ = \\dfrac{BC}{2}'), note: 'Car IK = BC. Les théorèmes 1 et 2 sont démontrés !' },
];
const dm4PreuveDemo = makeStepDemo(DM4_PREUVE_STEPS, 'dm4-preuveDisplay');
const dm4Bloc = (titre, id, demo, hint) => `
<div class="sub-header"><span class="letter">M</span><h4>${titre}</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">${hint}</p>
  <div class="step-display" id="${id}"></div>
  <div class="figure-toolbar"><button class="btn" onclick="${demo}.next()">Étape suivante →</button><button class="btn secondary" onclick="${demo}.reset()">Recommencer</button></div>
</div>`;

document.getElementById('methode-demo-droite-milieux-4e').innerHTML = `
<div class="redaction-note" ${R4_REM}>Pour choisir le bon théorème, regarde ce que tu <b>sais</b> et ce que tu <b>cherches</b> :
<ul style="margin:4px 0 0;padding-left:20px;">
  <li>deux milieux, je cherche un <b>parallélisme</b> : théorème 1 ;</li>
  <li>deux milieux, je cherche une <b>longueur</b> : théorème 2 ;</li>
  <li>un milieu et une parallèle, je cherche un <b>milieu</b> : théorème 3.</li>
</ul></div>
${dm4Bloc('Méthode 1 : démontrer que deux droites sont parallèles', 'dm4-parDisplay', 'dm4ParDemo', 'Cliquez sur « Étape suivante » pour voir la rédaction.')}
${dm4Bloc('Méthode 2 : calculer une longueur', 'dm4-longDisplay', 'dm4LongDemo', 'Calculer la longueur KL.')}
${dm4Bloc('Méthode 3 : démontrer qu\'un point est le milieu d\'un segment', 'dm4-milDisplay', 'dm4MilDemo', 'Démontrer que Q est le milieu de [UW].')}
${dm4Bloc('Méthode 4 : la démonstration du théorème, pas à pas', 'dm4-preuveDisplay', 'dm4PreuveDemo', 'Chaque étape s\'appuie sur une propriété des parallélogrammes.')}
`;

function dm4Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="dm4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="dm4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
// Échelle double : deux montants [SA] et [SB], barre [MN] fixée en leurs milieux.
function dm4Echelle(){
  const S = [150, 20], A = [70, 230], B = [230, 230], M = g4Lerp(S, A, .5), N = g4Lerp(S, B, .5);
  const h = `<line x1="20" y1="232" x2="280" y2="232" stroke="#8A93A3" stroke-width="2"/>` + g4Seg(S, A, '#8D6E63', 6) + g4Seg(S, B, '#8D6E63', 6) + g4Seg(M, N, DM4_ORANGE, 4)
    + g4Traits(S, M, 1) + g4Traits(M, A, 1) + g4Traits(S, N, 2) + g4Traits(N, B, 2) + g4Longueur(A, B, [150, 100], '1,30 m', DM4_VERT)
    + [S, A, B, M, N].map(P => g4Pt(P)).join('') + g4Nom(S, [150, 120], 'S') + g4Nom(A, [150, 100], 'A') + g4Nom(B, [150, 100], 'B') + g4Nom(M, [150, 100], 'M') + g4Nom(N, [150, 100], 'N');
  return g4Svg(h, [S, A, B, [20, 232], [280, 232]], 260);
}
document.getElementById('exos-demo-droite-milieux-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Démontrer que deux droites sont parallèles »</h3>
  <p style="margin:0 0 8px;">ABC est un triangle. I est le milieu de [AB] et J est le milieu de [BC]. Démontrer que les droites (IJ) et (AC) sont parallèles.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Dans le triangle ABC, I est le milieu de [AB] et J est le milieu de [BC].</span><span class="we-comment">On écrit les hypothèses (avec le nom du triangle).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">D'après le théorème de la droite des milieux,</span><span class="we-comment">On cite le théorème utilisé.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">(IJ) // (AC).</span><span class="we-comment">On conclut : c'est ce que demande l'énoncé.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${dm4Exo(1, 'DEF est un triangle. G est le milieu de [DE] et H est le milieu de [DF]. Que peut-on dire des droites (GH) et (EF) ? Justifie.', [
    'Dans le triangle DEF, G est le milieu de [DE] et H est le milieu de [DF].', 'D\'après le théorème de la droite des milieux, (GH) // (EF).'])}
  ${dm4Exo(2, 'Avec les données de l\'exercice 1, et EF = 9 cm, calcule la longueur GH.', [
    'Dans le triangle DEF, G et H sont les milieux de [DE] et [DF]. D\'après le théorème de la droite des milieux :',
    dm4Tex('GH = \\dfrac{EF}{2} = \\dfrac{9}{2} = 4{,}5'), 'GH mesure 4,5 cm.'])}
  ${dm4Exo(3, 'RST est un triangle. K est le milieu de [RS] et L est le milieu de [RT], avec KL = 3,7 cm. Calcule la longueur ST.', [
    'Dans le triangle RST, K et L sont les milieux de [RS] et [RT]. D\'après le théorème de la droite des milieux :',
    dm4Tex('KL = \\dfrac{ST}{2}'), 'On en déduit :', dm4Tex('ST = 2 \\times KL = 2 \\times 3{,}7 = 7{,}4'), 'ST mesure 7,4 cm.'])}
  ${dm4Exo(4, 'EFG est un triangle. M est le milieu de [EF]. La parallèle à (FG) passant par M coupe [EG] en N. Démontre que N est le milieu de [EG].', [
    'Dans le triangle EFG, M est le milieu de [EF] et la droite (MN) est parallèle à (FG).', 'D\'après le théorème de la droite des milieux, la droite (MN) coupe [EG] en son milieu : N est le milieu de [EG].'])}
  ${dm4Exo(5, 'ABC est un triangle tel que AB = 6 cm, BC = 8 cm et AC = 10 cm. I, J et K sont les milieux de [AB], [BC] et [AC]. Calcule le périmètre du triangle IJK.', [
    'D\'après le théorème de la droite des milieux, dans le triangle ABC, chaque côté du triangle IJK mesure la moitié d\'un côté de ABC :',
    dm4Tex('IJ = \\dfrac{AC}{2} = \\dfrac{10}{2} = 5'), dm4Tex('JK = \\dfrac{AB}{2} = \\dfrac{6}{2} = 3'), dm4Tex('IK = \\dfrac{BC}{2} = \\dfrac{8}{2} = 4'),
    'Périmètre du triangle IJK :', dm4Tex('P = 5 + 3 + 4 = 12'), 'Le périmètre du triangle IJK est 12 cm : c\'est la moitié du périmètre de ABC (24 cm).'])}
  ${dm4Exo(6, 'Vrai ou faux ? « Si une droite passe par le milieu d\'un côté d\'un triangle, alors elle est parallèle à un autre côté. » Justifie.', [
    'Faux. Contre-exemple : dans un triangle ABC, la médiane (AI), où I est le milieu de [BC], passe par le milieu I de [BC] mais elle coupe (AB) et (AC) en A : elle n\'est parallèle à aucun autre côté.',
    'Pour conclure au parallélisme, il faut deux milieux (théorème 1).'])}
  ${dm4Exo(7, 'Défi (le théorème de Varignon). ABCD est un quadrilatère. I, J, K et L sont les milieux de [AB], [BC], [CD] et [DA]. Démontre que IJKL est un parallélogramme. (Aide : trace la diagonale [AC].)', [
    'Dans le triangle ABC, I et J sont les milieux de [AB] et [BC] : d\'après le théorème de la droite des milieux, (IJ) // (AC) et ' + dm4Tex('IJ = \\dfrac{AC}{2}') + '.',
    'Dans le triangle ACD, L et K sont les milieux de [AD] et [CD] : d\'après le même théorème, (LK) // (AC) et ' + dm4Tex('LK = \\dfrac{AC}{2}') + '.',
    'Donc (IJ) // (LK) et IJ = LK.', 'Le quadrilatère IJKL a deux côtés opposés parallèles et de même longueur : c\'est un parallélogramme.'])}
  ${dm4Exo(8, 'Une échelle double a deux montants [SA] et [SB] de même longueur. Une barre [MN] est fixée au milieu de chaque montant. Les pieds A et B sont à 1,30 m l\'un de l\'autre. Calcule la longueur de la barre, puis démontre qu\'elle est parallèle au sol (AB).', [
    'Dans le triangle SAB, M est le milieu de [SA] et N est le milieu de [SB]. D\'après le théorème de la droite des milieux :',
    dm4Tex('MN = \\dfrac{AB}{2} = \\dfrac{1{,}30}{2} = 0{,}65'), 'La barre mesure 0,65 m.', 'D\'après le même théorème, (MN) // (AB) : la barre est parallèle au sol.'], dm4Echelle())}
</div>
`;

DEMO_REGISTRY['4e|Droite des milieux'] = {
  cours: 'cours-demo-droite-milieux-4e', methode: 'methode-demo-droite-milieux-4e', exos: 'exos-demo-droite-milieux-4e', histoire: 'histoire-demo-droite-milieux-4e',
  init: () => {
    dm4ParDemo.reset(); dm4LongDemo.reset(); dm4MilDemo.reset(); dm4PreuveDemo.reset();
    ['cours', 'methode', 'exos', 'histoire'].forEach(k => renderStaticMath(document.getElementById(k + '-demo-droite-milieux-4e')));
    injectCourseAddButtons(document.getElementById('cours-demo-droite-milieux-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-droite-milieux-4e'));
  }
};

DEMO_QUIZZES['4e|Droite des milieux'] = [
  { q: 'Dans un triangle ABC, I est le milieu de [AB] et J le milieu de [AC]. Alors...', opts: ['(IJ) // (BC)', '(IJ) ⊥ (BC)', '(IJ) // (AB)'], correct: 0 },
  { q: 'Avec les mêmes milieux I et J, et BC = 12 cm, IJ mesure...', opts: ['24 cm', '6 cm', '4 cm'], correct: 1 },
  { q: 'I et J sont les milieux de [AB] et [AC], et IJ = 4,5 cm. Alors BC mesure...', opts: ['2,25 cm', '9 cm', '4,5 cm'], correct: 1 },
  { q: 'Une droite passe par le milieu de [AB] et elle est parallèle à (BC). Elle coupe [AC]...', opts: ['en son milieu', 'au tiers', 'on ne peut rien dire'], correct: 0 },
  { q: 'Une droite passe par le milieu d\'un côté d\'un triangle. Est-elle toujours parallèle à un autre côté ?', opts: ['Oui', 'Non'], correct: 1 },
  { q: 'Pour démontrer qu\'un point est le milieu d\'un segment avec ce chapitre, il faut savoir...', opts: ['deux milieux', 'un milieu et un parallélisme', 'trois longueurs'], correct: 1 },
  { q: 'Les milieux des côtés d\'un quadrilatère quelconque forment toujours...', opts: ['un rectangle', 'un parallélogramme', 'un carré'], correct: 1 },
];

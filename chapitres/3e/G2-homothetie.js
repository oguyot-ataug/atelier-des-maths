/* ============================================================
   CHAPITRE : Homothétie (3e, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 49-50) : plan du manuel (introduction : agrandissement et
   réduction ; image d'un point, y compris rapport négatif ; image d'un segment, avec la
   démonstration par la réciproque de Thalès ; propriétés : alignement, milieux, angles, longueurs
   × k, aires × k²), titres reformulés, figures et exemples nouveaux.
   Conventions de figures (demandées pour la géométrie) : un point posé sur une demi-droite ou une
   droite tracée (O, M, M′, A, A′…) est marqué d'un petit trait perpendiculaire à cette ligne ; les
   sommets des polygones ne sont pas marqués.
   Réutilise g4… (chapitres/4e/G1-triangles-paralleles.js) et ro3Trait / ro3Label / ro3Poly
   (chapitres/3e/G3-rotation.js), chargés avant.
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const HO3_BLEU = '#0C5BA0', HO3_VERT = '#1E7B34', HO3_ROUGE = '#C0392B', HO3_ORANGE = '#E07B00', HO3_ENCRE = '#1C1B2E', HO3_GRIS = '#9AA3AF';
const ho3Tex = s => `<span class="tex">${s}</span>`;
const ho3H = (P, O, k) => [O[0] + k * (P[0] - O[0]), O[1] + k * (P[1] - O[1])];
const ho3Hs = (pts, O, k) => pts.map(p => ho3H(p, O, k));
const ho3N = v => String(Math.round(v * 100) / 100).replace('.', ',');
// Demi-droite [OP) (ou droite si deux sens) en pointillés, prolongée au-delà du point le plus loin.
function ho3Rayon(O, P, L, deuxSens){
  const d = Math.hypot(P[0] - O[0], P[1] - O[1]) || 1, u = [(P[0] - O[0]) / d, (P[1] - O[1]) / d];
  const Q = [O[0] + u[0] * L, O[1] + u[1] * L], R = deuxSens ? [O[0] - u[0] * L, O[1] - u[1] * L] : O;
  return `<line x1="${R[0].toFixed(1)}" y1="${R[1].toFixed(1)}" x2="${Q[0].toFixed(1)}" y2="${Q[1].toFixed(1)}" stroke="${HO3_GRIS}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
}
// Trait perpendiculaire à la direction O→P, posé en P.
const ho3Tr = (P, O, c) => ro3Trait(P, [-(P[1] - O[1]), P[0] - O[0]], c);

/* ---- Figures du cours ---- */
// Introduction : une maison ℱ₁ et son image ℱ₂ par l'homothétie de centre O et de rapport 3.
const HO3_O = [20, 230], HO3_MAISON = [[60, 222], [88, 222], [88, 202], [74, 188], [60, 202]];
function ho3FigIntro(){
  const F2 = ho3Hs(HO3_MAISON, HO3_O, 3), M = HO3_MAISON[3], M2 = F2[3];
  return g4Svg(ho3Rayon(HO3_O, M2, Math.hypot(M2[0] - HO3_O[0], M2[1] - HO3_O[1]) + 20)
    + ro3Poly(HO3_MAISON, HO3_BLEU, 'rgba(12,91,160,.18)') + ro3Poly(F2, HO3_ORANGE, 'rgba(224,123,0,.15)')
    + g4Traits(HO3_O, M, 1, HO3_GRIS) + g4Traits(M, g4Lerp(M, M2, 0.5), 1, HO3_GRIS) + g4Traits(g4Lerp(M, M2, 0.5), M2, 1, HO3_GRIS)
    + ho3Tr(HO3_O, M) + ho3Tr(M, HO3_O) + ho3Tr(M2, HO3_O)
    + ro3Label(HO3_O, -6, 18, 'O') + ro3Label(M, -12, -6, 'M', HO3_ENCRE, 13) + ro3Label(M2, -14, -6, 'M′', HO3_ENCRE, 13)
    + ro3Label([74, 240], 0, 0, 'ℱ₁', HO3_BLEU, 15) + ro3Label([F2[0][0] + 40, 250], 0, 0, 'ℱ₂', HO3_ORANGE, 16),
    [HO3_O, ...F2, [F2[0][0] + 40, 255]], 380);
}
// Image d'un point pour un rapport k (positif ou négatif) : O, M, M′ (et M₁ si k < 0) sur la même droite.
function ho3FigPoint(k, maxW){
  const O = [60, 120], M = [140, 95], M2 = ho3H(M, O, k), pts = k > 0 ? [O, M, ho3H(M, O, 2.3)] : [O, M, M2, ho3H(M, O, -k + 0.3)]; // même échelle pour tous les rapports positifs
  let h = ho3Rayon(O, k < 0 ? M : (Math.abs(k) > 1 ? M2 : M), Math.max(Math.hypot(M2[0] - O[0], M2[1] - O[1]), Math.hypot(M[0] - O[0], M[1] - O[1])) + 30, k < 0);
  if(k < 0){ const M1 = ho3H(M, O, -k); pts.push(M1); h += ho3Tr(M1, O) + ro3Label(M1, 0, -12, 'M₁', HO3_GRIS, 13); }
  h += ho3Tr(O, M) + ho3Tr(M, O) + ho3Tr(M2, O, HO3_ROUGE) + ro3Label(O, 0, 20, 'O', HO3_ENCRE, 14) + ro3Label(M, 0, 20, 'M', HO3_ENCRE, 14) + ro3Label(M2, 0, k < 0 ? 22 : -12, 'M′', HO3_ROUGE, 14);
  return g4Svg(h, pts, maxW || 300);
}
// Image d'un segment : O, [AB] et [A′B′] pour k = 2.
function ho3FigSegment(){
  const O = [30, 190], A = [110, 130], B = [130, 185], k = 2.1, A2 = ho3H(A, O, k), B2 = ho3H(B, O, k);
  return g4Svg(ho3Rayon(O, A2, Math.hypot(A2[0] - O[0], A2[1] - O[1]) + 25) + ho3Rayon(O, B2, Math.hypot(B2[0] - O[0], B2[1] - O[1]) + 25)
    + g4Seg(A, B, HO3_BLEU, 2.4) + g4Seg(A2, B2, HO3_BLEU, 2.4)
    + ho3Tr(O, A) + ho3Tr(A, O) + ho3Tr(B, O) + ho3Tr(A2, O) + ho3Tr(B2, O)
    + ro3Label(O, -4, 20, 'O', HO3_ENCRE, 14) + ro3Label(A, -4, -10, 'A', HO3_ENCRE, 14) + ro3Label(B, 2, 22, 'B', HO3_ENCRE, 14) + ro3Label(A2, -4, -10, 'A′', HO3_ENCRE, 14) + ro3Label(B2, 4, 22, 'B′', HO3_ENCRE, 14),
    [O, A2, B2, [B2[0] + 20, B2[1]]], 380);
}
// Propriétés : quadrilatère ABCD et son image par l'homothétie de centre O et de rapport 2,5.
const HO3_Q = [[140, 118], [110, 122], [118, 160], [152, 138]], HO3_QO = [55, 175], HO3_QK = 2.5;
function ho3FigProprietes(){
  const [A, B, C, D] = HO3_Q, [A2, B2, C2, D2] = ho3Hs(HO3_Q, HO3_QO, HO3_QK), O = HO3_QO;
  const K = g4Lerp(B, A, 0.45), K2 = ho3H(K, O, HO3_QK), J = g4Lerp(B, C, 0.5), J2 = ho3H(J, O, HO3_QK);
  const G = g4Centre(HO3_Q), G2 = g4Centre([A2, B2, C2, D2]), u = (P, Q) => [-(Q[1] - P[1]), Q[0] - P[0]];
  return g4Svg([A2, B2, C2, D2].map(P => g4Seg(O, P, '#D5DAE1', 1, true)).join('')
    + ro3Poly(HO3_Q, HO3_BLEU, 'rgba(12,91,160,.18)') + ro3Poly([A2, B2, C2, D2], HO3_VERT, 'rgba(30,123,52,.13)')
    + g4Traits(B, J, 1) + g4Traits(J, C, 1) + g4Traits(B2, J2, 1) + g4Traits(J2, C2, 1)
    + g4Arc(D, A, C, HO3_VERT, 12) + g4Arc(D2, A2, C2, HO3_VERT, 20)
    + ro3Trait(K, u(B, A)) + ro3Trait(K2, u(B2, A2)) + ro3Trait(J, u(B, C)) + ro3Trait(J2, u(B2, C2)) + ho3Tr(O, A2)
    + ro3Label(K, 0, -8, 'K', HO3_ENCRE, 12) + ro3Label(K2, 0, -10, 'K′', HO3_ENCRE, 13) + ro3Label(J, -10, 4, 'J', HO3_ENCRE, 12) + ro3Label(J2, -14, 4, 'J′', HO3_ENCRE, 13)
    + ro3Label(O, -4, 18, 'O', HO3_ENCRE, 14)
    + [[A, 'A'], [B, 'B'], [C, 'C'], [D, 'D']].map(([P, n]) => g4Nom(P, G, n)).join('') + [[A2, 'A′'], [B2, 'B′'], [C2, 'C′'], [D2, 'D′']].map(([P, n]) => g4Nom(P, G2, n)).join(''),
    [O, A2, B2, C2, D2], 440);
}

document.getElementById('cours-demo-homothetie-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>L'homothétie</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Agrandir et réduire à partir d'un point</h4></div>
${ho3FigIntro()}
<ul class="example-list">
  <li>La figure ℱ₂ est un <b>agrandissement</b> de rapport 3 de la figure ℱ₁. On dit que ℱ₂ est l'image de ℱ₁ par l'<b>homothétie de centre O et de rapport 3</b> : chaque point M de ℱ₁ a pour image le point M′ de la demi-droite [OM) trois fois plus loin de O (OM′ = 3 × OM).</li>
  <li>Inversement, ℱ₁ est une <b>réduction</b> de rapport ${ho3Tex('\\dfrac{1}{3}')} de ℱ₂ : c'est son image par l'homothétie de centre O et de rapport ${ho3Tex('\\dfrac{1}{3}')}.</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>L'image d'un point</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Soit <i>k</i> un nombre positif. L'image du point M par l'homothétie de centre O et de rapport <i>k</i> est le point M′ tel que :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;"><li>M′ appartient à la demi-droite [OM) ;</li><li>OM′ = <i>k</i> × OM.</li></ul></div>
<p class="example-title">Exemples :</p>
<div style="display:flex;flex-wrap:wrap;gap:6px 24px;justify-content:center;align-items:flex-end;">
  <figure style="margin:0;text-align:center;flex:1 1 240px;max-width:320px;">${ho3FigPoint(2, 300)}<figcaption class="hint" style="margin:-6px 0 0;"><i>k</i> = 2 : OM′ = 2 × OM (agrandissement)</figcaption></figure>
  <figure style="margin:0;text-align:center;flex:1 1 240px;max-width:320px;">${ho3FigPoint(0.6, 300)}<figcaption class="hint" style="margin:-6px 0 0;"><i>k</i> = 0,6 : OM′ = 0,6 × OM (réduction)</figcaption></figure>
</div>
<div class="redaction-note" ${R4_REM}>Remarque : si <i>k</i> est <b>négatif</b>, par exemple <i>k</i> = −1,5, on construit l'image M₁ de M par l'homothétie de centre O et de rapport 1,5, puis le symétrique M′ de M₁ par rapport à O. M′ est alors <b>de l'autre côté de O</b>, sur la droite (OM), et OM′ = 1,5 × OM.</div>
${ho3FigPoint(-1.5, 360)}

<div class="sub-header"><span class="letter">C</span><h4>L'image d'un segment</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Soient A, B et O trois points, et <i>k</i> un nombre positif. <b>Si</b> A′ et B′ sont les images respectives de A et B par l'homothétie de centre O et de rapport <i>k</i>, <b>alors</b> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;"><li>A′B′ = <i>k</i> × AB ;</li><li>les segments [AB] et [A′B′] sont <b>parallèles</b>.</li></ul></div>
${ho3FigSegment()}
<p class="example-title">Démonstration :</p>
<ul class="example-list">
  <li>Les points O, A, A′ d'une part, et O, B, B′ d'autre part, sont alignés dans le même ordre, et ${ho3Tex('\\dfrac{OA\'}{OA} = \\dfrac{OB\'}{OB} = k')}. D'après la <b>réciproque du théorème de Thalès</b>, les droites (AB) et (A′B′) sont parallèles.</li>
  <li>On peut donc appliquer le <b>théorème de Thalès</b> dans les triangles OAB et OA′B′ : ${ho3Tex('\\dfrac{A\'B\'}{AB} = \\dfrac{OA\'}{OA} = k')}, donc A′B′ = <i>k</i> × AB.</li>
</ul>

<div class="sub-header"><span class="letter">D</span><h4>Ce que conserve (ou non) une homothétie</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">L'homothétie <b>conserve</b> l'<b>alignement</b>, les <b>milieux</b> et la <b>mesure des angles</b>. Dans une homothétie de rapport <i>k</i> positif :
  <ul style="margin:6px 0;padding-left:20px;line-height:1.8;"><li>les <b>longueurs</b> sont multipliées par <i>k</i> ;</li><li>les <b>aires</b> sont multipliées par <i>k</i>².</li></ul>
  Si ℱ₂ est l'image de ℱ₁ : <b>si <i>k</i> &gt; 1</b>, ℱ₂ est un <b>agrandissement</b> de ℱ₁ ; <b>si 0 &lt; <i>k</i> &lt; 1</b>, ℱ₂ est une <b>réduction</b> de ℱ₁.</div>
<p class="example-title">Exemple : le quadrilatère A′B′C′D′ est l'image de ABCD par l'homothétie de centre O et de rapport 2,5.</p>
${ho3FigProprietes()}
<ul class="example-list">
  <li>Les points B, K, A sont alignés, donc leurs images B′, K′, A′ sont aussi alignées.</li>
  <li>J est le milieu du segment [BC], donc son image J′ est le milieu du segment [B′C′].</li>
  <li>L'angle ${ho3Tex('\\widehat{A\'D\'C\'}')} est l'image de l'angle ${ho3Tex('\\widehat{ADC}')} : ils ont la même mesure.</li>
  <li>Les longueurs sont multipliées par 2,5 : par exemple, C′D′ = 2,5 × CD.</li>
  <li>Les aires sont multipliées par ${ho3Tex('2{,}5^2 = 6{,}25')} : l'aire de A′B′C′D′ est 6,25 fois celle de ABCD.</li>
</ul>
`;

document.getElementById('histoire-demo-homothetie-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Vers 1603, l'astronome allemand <b>Christoph Scheiner</b> invente le <b>pantographe</b>, un assemblage de quatre règles articulées en parallélogramme. Une des extrémités est fixée (c'est le centre O de l'homothétie), on suit un dessin avec une pointe, et un crayon placé plus loin reproduit le dessin agrandi (ou réduit) : le crayon trace l'image de chaque point par une homothétie ! Cet instrument a servi pendant des siècles aux dessinateurs, aux graveurs et aux cartographes, et on l'utilise encore pour graver des clés ou des médailles. Le projecteur de cinéma, le vidéoprojecteur de la classe et même l'ombre de votre main sur un mur fonctionnent aussi comme des homothéties : la lampe joue le rôle du centre.
</div>
`;

document.getElementById('methode-demo-homothetie-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : faire varier le rapport</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">La figure verte est l'image de la bleue par l'homothétie de centre O. Faites varier le rapport <i>k</i>, y compris en dessous de 0.</p>
  <svg id="ho3-varSvg" viewBox="0 0 460 340" style="width:100%;max-width:470px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:470px;margin:0 auto;">
    <label for="ho3-k" style="font-weight:700;"><i>k</i></label><input id="ho3-k" type="range" min="-20" max="30" step="1" value="20" oninput="ho3VarMaj()"><span id="ho3-kVal" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
  </div>
  <div id="ho3-varInfo" style="text-align:center;margin:10px 0 4px;line-height:1.9;"></div>
  <div class="figure-toolbar">
    ${[['2', 20], ['0,5', 5], ['1', 10], ['−1', -10], ['−2', -20]].map(([t, v]) => `<button class="btn${v < 0 ? ' secondary' : ''}" onclick="ho3VarPreset(${v})"><i>k</i> = ${t}</button>`).join('')}
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire l'image d'un point à la règle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Construire l'image M′ du point M par l'homothétie de centre O et de rapport 2,5, sachant que OM = 2 cm. Cliquez sur « Étape suivante ».</p>
  <svg id="ho3-constrSvg" viewBox="0 0 470 170" style="width:100%;max-width:480px;display:block;margin:8px auto;"></svg>
  <div id="ho3-constrNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ho3ConstrSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="ho3ConstrReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : pourquoi les aires sont multipliées par k²</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un rectangle de 2 carreaux sur 1, et son agrandissement de rapport <i>k</i>. Combien de fois le petit rectangle tient-il dans le grand ?</p>
  <svg id="ho3-aireSvg" viewBox="0 0 460 230" style="width:100%;max-width:460px;display:block;margin:8px auto;"></svg>
  <div id="ho3-aireInfo" style="text-align:center;margin:6px 0;line-height:1.9;"></div>
  <div class="figure-toolbar">${[2, 3, 4].map(k => `<button class="btn" onclick="ho3AireMaj(${k})"><i>k</i> = ${k}</button>`).join('')}</div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : retrouver le centre et le rapport</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Le triangle A′B′C′ est l'image du triangle ABC par une homothétie de rapport positif. On sait que AB = 3 cm et A′B′ = 7,5 cm. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="ho3-centreDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ho3CentreDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ho3CentreDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function ho3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="ho3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="ho3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-homothetie-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une longueur et une aire dans une homothétie »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">A′B′C′ est l'image de ABC par l'homothétie de centre O et de rapport 3.</span><span class="we-comment">1. On cite l'homothétie et son rapport.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">A′B′ = 3 × AB = 3 × 4 = 12 cm</span><span class="we-comment">2. Les longueurs sont multipliées par k.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Aire(A′B′C′) = 3² × Aire(ABC) = 9 × 6 = 54 cm²</span><span class="we-comment">3. Les aires sont multipliées par k².</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">k = 3 > 1 : A′B′C′ est un agrandissement de ABC.</span><span class="we-comment">4. On interprète le rapport.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${ho3Exo(1, 'O et M sont deux points tels que OM = 4 cm. Où se trouve l\'image M′ de M par l\'homothétie de centre O et de rapport : a) 1,5 ? b) 0,25 ? c) −2 ?', [
    'a) Sur la demi-droite [OM), avec OM′ = 1,5 × 4 = 6 cm (plus loin que M).', 'b) Sur la demi-droite [OM), avec OM′ = 0,25 × 4 = 1 cm (entre O et M).',
    'c) Sur la droite (OM), de l\'autre côté de O, avec OM′ = 2 × 4 = 8 cm.'])}
  ${ho3Exo(2, 'Le triangle A′B′C′ est l\'image du triangle ABC par une homothétie de rapport positif. On sait que AB = 4 cm, A′B′ = 10 cm et BC = 6 cm. Quel est le rapport ? S\'agit-il d\'un agrandissement ou d\'une réduction ? Calcule B′C′.', [
    ho3Tex('k = \\dfrac{A\'B\'}{AB} = \\dfrac{10}{4} = 2{,}5') + ' : k > 1, c\'est un agrandissement.', 'B′C′ = 2,5 × BC = 2,5 × 6 = 15 cm.'])}
  ${ho3Exo(3, 'Une figure a une aire de 36 cm². Quelle est l\'aire de son image par une homothétie de rapport 0,5 ?', [
    'Les aires sont multipliées par ' + ho3Tex('0{,}5^2 = 0{,}25') + ' : 0,25 × 36 = 9 cm².', 'Attention : l\'aire n\'est pas divisée par 2, mais par 4.'])}
  ${ho3Exo(4, 'Par une homothétie de rapport positif, l\'aire d\'une figure est multipliée par 9. Quel est le rapport de l\'homothétie ?', [
    'Les aires sont multipliées par ' + ho3Tex('k^2') + ', donc ' + ho3Tex('k^2 = 9') + '.', 'k est positif, donc k = 3.'])}
  ${ho3Exo(5, 'Dans le triangle ABC, l\'angle ' + ho3Tex('\\widehat{ABC}') + ' mesure 50°. A′B′C′ est son image par l\'homothétie de centre O et de rapport 4. Que peut-on dire de l\'angle ' + ho3Tex('\\widehat{A\'B\'C\'}') + ' ? des droites (AB) et (A′B′) ?', [
    'L\'homothétie conserve les angles : ' + ho3Tex('\\widehat{A\'B\'C\'} = 50°') + '.', 'L\'image d\'un segment lui est parallèle : (AB) // (A′B′).'])}
  ${ho3Exo(6, 'Une photo de 10 cm sur 15 cm est agrandie avec un rapport 3. Quelles sont les dimensions de l\'agrandissement ? Par combien son aire est-elle multipliée ?', [
    'Dimensions : 3 × 10 = 30 cm et 3 × 15 = 45 cm.', 'Aire : 10 × 15 = 150 cm² devient 30 × 45 = 1 350 cm², soit ' + ho3Tex('3^2 = 9') + ' fois plus.'])}
  ${ho3Exo(7, 'Une maquette d\'immeuble est réalisée à l\'échelle 1/50 (réduction de rapport ' + ho3Tex('\\dfrac{1}{50}') + '). La maquette mesure 24 cm de haut. Quelle est la hauteur réelle de l\'immeuble ?', [
    'L\'immeuble est l\'agrandissement de la maquette de rapport 50 : 50 × 24 = 1 200 cm = 12 m.'])}
  ${ho3Exo(8, 'Quelle transformation déjà connue est l\'homothétie de centre O et de rapport −1 ?', [
    'Pour k = −1, M′ est de l\'autre côté de O, à la même distance : OM′ = OM. C\'est la symétrie centrale de centre O.'])}
  ${ho3Exo(9, 'Vrai ou faux ? Justifie. a) Une réduction de rapport 0,5 divise l\'aire par 2. b) Une homothétie de rapport 3 conserve les longueurs. c) L\'image d\'un carré par une homothétie est un carré.', [
    'a) Faux : l\'aire est multipliée par 0,5² = 0,25, donc divisée par 4.', 'b) Faux : les longueurs sont multipliées par 3.',
    'c) Vrai : les longueurs sont toutes multipliées par le même nombre et les angles sont conservés (angles droits).'])}
</div>
`;

/* ---- Méthode 1 : rapport variable ---- */
const HO3_V_O = [190, 190], HO3_V_F = [[220, 175], [250, 175], [250, 150], [235, 135], [220, 150]];
function ho3VarMaj(){
  const k = Number(document.getElementById('ho3-k').value) / 10, O = HO3_V_O, F = HO3_V_F, F2 = ho3Hs(F, O, k), P = F[3], P2 = F2[3];
  document.getElementById('ho3-kVal').textContent = ho3N(k).replace('-', '−');
  const svg = document.getElementById('ho3-varSvg');
  svg.innerHTML = ho3Rayon(O, P, 300, true) + (k !== 0 ? ro3Poly(F2, HO3_VERT, 'rgba(30,123,52,.15)') : '') + ro3Poly(F, HO3_BLEU, 'rgba(12,91,160,.2)')
    + ho3Tr(O, P) + ho3Tr(P, O) + (k !== 0 ? ho3Tr(P2, O, HO3_VERT) + ro3Label(P2, 12, -6, 'A′', HO3_VERT, 13) : '') + ro3Label(O, -10, 18, 'O', HO3_ENCRE, 14) + ro3Label(P, 10, -8, 'A', HO3_BLEU, 13);
  const a = Math.abs(k);
  let t = k === 0 ? 'Rapport 0 : toute la figure est « écrasée » sur le point O.'
    : k === 1 ? 'Rapport 1 : chaque point est sa propre image, rien ne bouge.'
    : k === -1 ? 'Rapport −1 : c\'est la symétrie centrale de centre O (même taille, de l\'autre côté de O).'
    : `${k < 0 ? 'Rapport négatif : l\'image est de l\'autre côté de O, retournée. ' : ''}${a > 1 ? 'Agrandissement' : 'Réduction'} : les longueurs sont multipliées par ${ho3N(a)}, les aires par ${ho3N(a)}² = ${ho3N(a * a)}.`;
  document.getElementById('ho3-varInfo').innerHTML = `OA′ = ${ho3N(a)} × OA<br>${t}`;
}
function ho3VarPreset(v){ document.getElementById('ho3-k').value = v; ho3VarMaj(); }

/* ---- Méthode 2 : construction à la règle graduée ---- */
const HO3_C_O = [40, 110], HO3_C_U = 36; // 1 cm = 36 px, le long d'une demi-droite horizontale
const HO3_C_NOTES = [
  'Les points O et M sont donnés, avec OM = 2 cm (des croix : ce sont des points libres du plan).',
  '1. On trace la demi-droite [OM) : O et M sont maintenant des points de cette demi-droite.',
  '2. On calcule la distance : OM′ = 2,5 × OM = 2,5 × 2 = 5 cm.',
  '3. On place la règle, le zéro sur O, le long de [OM), et on repère la graduation 5 cm.',
  '4. On place M′ à 5 cm de O sur [OM). La règle disparaît : M′ est l\'image de M.',
];
let ho3CEtape = 0;
function ho3ConstrDessin(k){
  const svg = document.getElementById('ho3-constrSvg'); if(!svg) return;
  const O = HO3_C_O, u = HO3_C_U, M = [O[0] + 2 * u, O[1]], M2 = [O[0] + 5 * u, O[1]];
  let h = '';
  if(k >= 1) h += `<line x1="${O[0]}" y1="${O[1]}" x2="${O[0] + 11.5 * u}" y2="${O[1]}" stroke="${HO3_ENCRE}" stroke-width="1.6"/>`;
  if(k === 3){ // règle graduée sous la demi-droite
    h += `<rect x="${O[0] - 8}" y="${O[1] + 2}" width="${7 * u + 16}" height="34" fill="rgba(255,236,179,.85)" stroke="#C9A227" rx="3"/>`;
    for(let mm = 0; mm <= 70; mm++){ const x = O[0] + mm * u / 10, L = mm % 10 === 0 ? 14 : mm % 5 === 0 ? 10 : 6; h += `<line x1="${x}" y1="${O[1] + 2}" x2="${x}" y2="${O[1] + 2 + L}" stroke="#6B5B1E" stroke-width="${mm % 10 === 0 ? 1.2 : .7}"/>`; if(mm % 10 === 0) h += `<text x="${x}" y="${O[1] + 30}" text-anchor="middle" font-size="10" fill="#6B5B1E">${mm / 10}</text>`; }
    h += `<line x1="${M2[0]}" y1="${O[1] - 16}" x2="${M2[0]}" y2="${O[1] + 16}" stroke="${HO3_ROUGE}" stroke-width="2"/>`;
  }
  if(k === 2 || k === 4) h += `<text x="${(O[0] + M2[0]) / 2}" y="${O[1] + 36}" text-anchor="middle" font-size="13" fill="${HO3_ROUGE}" font-weight="700">OM′ = 2,5 × 2 = 5 cm</text>`;
  if(k >= 4) h += ho3Tr(M2, O, HO3_ROUGE) + ro3Label(M2, 0, -12, 'M′', HO3_ROUGE, 15) + g4Traits(O, M, 1, HO3_BLEU);
  h += (k >= 1 ? ho3Tr(O, M) + ho3Tr(M, O) : ro3Croix(O) + ro3Croix(M)) + ro3Label(O, 0, -12, 'O', HO3_ENCRE, 15) + ro3Label(M, 0, -12, 'M', HO3_ENCRE, 15);
  svg.innerHTML = h;
  document.getElementById('ho3-constrNote').textContent = HO3_C_NOTES[k];
}
function ho3ConstrSuivant(){ if(ho3CEtape < HO3_C_NOTES.length - 1) ho3CEtape++; ho3ConstrDessin(ho3CEtape); }
function ho3ConstrReset(){ ho3CEtape = 0; ho3ConstrDessin(0); }

/* ---- Méthode 3 : aires × k² ---- */
function ho3AireMaj(k){
  const svg = document.getElementById('ho3-aireSvg'); if(!svg) return;
  const c = Math.min(42, 300 / (2 * k)), X0 = 20, Y0 = 20, X1 = 130;
  let h = `<rect x="${X0}" y="${Y0}" width="${2 * c}" height="${c}" fill="rgba(12,91,160,.3)" stroke="${HO3_BLEU}" stroke-width="2"/>`
    + `<text x="${X0 + c}" y="${Y0 + c + 18}" text-anchor="middle" font-size="12" fill="#4E5665">2 × 1</text>`;
  for(let i = 0; i < k; i++) for(let j = 0; j < k; j++) h += `<rect x="${X1 + i * 2 * c}" y="${Y0 + j * c}" width="${2 * c}" height="${c}" fill="${(i + j) % 2 ? 'rgba(30,123,52,.22)' : 'rgba(30,123,52,.1)'}" stroke="${HO3_VERT}" stroke-width="1"/>`;
  h += `<rect x="${X1}" y="${Y0}" width="${2 * c * k}" height="${c * k}" fill="none" stroke="${HO3_VERT}" stroke-width="2.4"/>`
    + `<text x="${X1 + c * k}" y="${Y0 + c * k + 18}" text-anchor="middle" font-size="12" fill="#4E5665">${2 * k} × ${k}</text>`;
  svg.innerHTML = h;
  document.getElementById('ho3-aireInfo').innerHTML = `Rapport ${k} : la longueur et la largeur sont multipliées par ${k}. Le grand rectangle contient <b>${k} × ${k} = ${k * k}</b> petits rectangles : l'aire est multipliée par ${k}² = ${k * k}.`;
}

/* ---- Méthode 4 : centre et rapport ---- */
const HO3_CENTRE_STEPS = [
  { expr: ho3Tex('k = \\dfrac{A\'B\'}{AB} = \\dfrac{7{,}5}{3} = 2{,}5'), note: 'Les longueurs sont multipliées par k : on divise une longueur de l\'image par la longueur correspondante.' },
  { expr: 'k = 2,5 > 1 : A′B′C′ est un agrandissement de ABC.', note: '' },
  { expr: 'Le centre O est sur les droites (AA′), (BB′) et (CC′).', note: 'Chaque point et son image sont alignés avec le centre O.' },
  { expr: 'On trace (AA′) et (BB′) : O est leur point d\'intersection.', note: 'Deux droites suffisent ; la troisième, (CC′), passe aussi par O (bon moyen de vérifier la figure).' },
  { expr: 'Contrôle : OA′ = 2,5 × OA.', note: 'On mesure OA et OA′ pour vérifier le rapport.' },
];
const ho3CentreDemo = makeStepDemo(HO3_CENTRE_STEPS, 'ho3-centreDisplay');

DEMO_REGISTRY['3e|Homothétie'] = {
  cours: 'cours-demo-homothetie-3e', methode: 'methode-demo-homothetie-3e', exos: 'exos-demo-homothetie-3e', histoire: 'histoire-demo-homothetie-3e',
  init: () => {
    ho3VarMaj(); ho3ConstrReset(); ho3AireMaj(3); ho3CentreDemo.reset();
    ['cours-demo-homothetie-3e', 'methode-demo-homothetie-3e', 'exos-demo-homothetie-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-homothetie-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-homothetie-3e'));
  }
};

DEMO_QUIZZES['3e|Homothétie'] = [
  { q: 'M′ est l\'image de M par l\'homothétie de centre O et de rapport 3. Alors...', opts: ['OM′ = 3 × OM et M′ ∈ [OM)', 'MM′ = 3', 'OM = 3 × OM′'], correct: 0 },
  { q: 'Une homothétie de rapport 0,4 est...', opts: ['un agrandissement', 'une réduction', 'une symétrie'], correct: 1 },
  { q: 'Par une homothétie de rapport 2, les aires sont multipliées par...', opts: ['2', '4', '8'], correct: 1 },
  { q: 'L\'image d\'un segment [AB] par une homothétie est un segment...', opts: ['perpendiculaire à [AB]', 'parallèle à [AB]', 'de même longueur que [AB]'], correct: 1 },
  { q: 'L\'homothétie de centre O et de rapport −1 est...', opts: ['la symétrie centrale de centre O', 'une translation', 'une rotation de 90°'], correct: 0 },
  { q: 'AB = 5 cm et A′B′ = 2 cm (rapport positif). Le rapport est...', opts: ['2,5', '0,4', '3'], correct: 1 },
  { q: 'Une homothétie conserve...', opts: ['les longueurs', 'les angles', 'les aires'], correct: 1 },
];

/* ============================================================
   CHAPITRE : Rotation (3e, G3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (capture du manuel, p. 62) : plan du manuel (définition, image d'un point, propriétés),
   titres reformulés, figures et exemples nouveaux. NB : le manuel écrit « La translation conserve… »
   dans l'encadré des propriétés de la rotation (coquille) : ici, « La rotation conserve… ».
   Conventions de figures (demandées pour la géométrie) : croix pour un point libre du plan (O, M),
   petit trait perpendiculaire pour un point sur un objet (point sur un cercle), rien pour un
   sommet ou un point d'intersection. Sens de rotation : toujours le sens inverse des aiguilles
   d'une montre (sens trigonométrique), comme dans le manuel.
   Réutilise le moteur de figures g4… de chapitres/4e/G1-triangles-paralleles.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const RO3_BLEU = '#0C5BA0', RO3_ROUGE = '#C0392B', RO3_VERT = '#1E7B34', RO3_ORANGE = '#E07B00', RO3_ENCRE = '#1C1B2E', RO3_VIOLET = '#7A3E9D';
const ro3Tex = s => `<span class="tex">${s}</span>`;
// Image de P par la rotation de centre O et d'angle a (en degrés, sens inverse des aiguilles d'une montre à l'écran).
function ro3Rot(P, O, a){ const r = a * Math.PI / 180, dx = P[0] - O[0], dy = P[1] - O[1]; return [O[0] + dx * Math.cos(r) + dy * Math.sin(r), O[1] - dx * Math.sin(r) + dy * Math.cos(r)]; }
const ro3Pts = (pts, O, a) => pts.map(p => ro3Rot(p, O, a));
const ro3Poly = (pts, c, fill, w) => `<polygon points="${pts.map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="${fill || 'none'}" stroke="${c}" stroke-width="${w || 2.2}" stroke-linejoin="round"/>`;
// Croix (point libre) et petit trait (point sur un objet, perpendiculaire à la direction u).
const ro3Croix = (P, c) => `<path d="M${(P[0] - 4.5).toFixed(1)},${(P[1] - 4.5).toFixed(1)} L${(P[0] + 4.5).toFixed(1)},${(P[1] + 4.5).toFixed(1)} M${(P[0] - 4.5).toFixed(1)},${(P[1] + 4.5).toFixed(1)} L${(P[0] + 4.5).toFixed(1)},${(P[1] - 4.5).toFixed(1)}" stroke="${c || RO3_ENCRE}" stroke-width="1.8" stroke-linecap="round"/>`;
function ro3Trait(P, u, c){ const L = Math.hypot(u[0], u[1]) || 1, x = u[0] / L * 6, y = u[1] / L * 6;
  return `<line x1="${(P[0] - x).toFixed(1)}" y1="${(P[1] - y).toFixed(1)}" x2="${(P[0] + x).toFixed(1)}" y2="${(P[1] + y).toFixed(1)}" stroke="${c || RO3_ENCRE}" stroke-width="1.8" stroke-linecap="round"/>`; }
const ro3Label = (P, dx, dy, txt, c, taille) => `<text x="${(P[0] + dx).toFixed(1)}" y="${(P[1] + dy).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk" font-size="${taille || 15}" font-weight="700" fill="${c || RO3_ENCRE}">${txt}</text>`;
// Arc orienté de rayon r autour de O, de la direction O→P jusqu'à l'angle a (sens trigonométrique), avec une flèche.
function ro3ArcAngle(O, P, a, r, c, txt, fleche){
  const a0 = Math.atan2(-(P[1] - O[1]), P[0] - O[0]), a1 = a0 + a * Math.PI / 180;
  const pt = t => [O[0] + r * Math.cos(t), O[1] - r * Math.sin(t)];
  const p0 = pt(a0), p1 = pt(a1), grand = Math.abs(a) > 180 ? 1 : 0;
  let h = `<path d="M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${r},${r} 0 ${grand} 0 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}" fill="none" stroke="${c}" stroke-width="1.8"/>`;
  if(fleche !== false){ const t = a1, tg = [-Math.sin(t), -Math.cos(t)], nb = [Math.cos(t), -Math.sin(t)]; // tangente (sens de parcours) et normale
    const b = [p1[0] - tg[0] * 8, p1[1] - tg[1] * 8];
    h += `<path d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${(b[0] + nb[0] * 4).toFixed(1)},${(b[1] + nb[1] * 4).toFixed(1)} L${(b[0] - nb[0] * 4).toFixed(1)},${(b[1] - nb[1] * 4).toFixed(1)} Z" fill="${c}"/>`; }
  if(txt){ const m = pt((a0 + a1) / 2), q = [O[0] + (r + 13) * Math.cos((a0 + a1) / 2), O[1] - (r + 13) * Math.sin((a0 + a1) / 2) + 5]; h += `<text x="${q[0].toFixed(1)}" y="${q[1].toFixed(1)}" text-anchor="middle" font-size="14" font-weight="700" fill="${c}">${txt}</text>`; }
  return h;
}

/* ---- Figures du cours ---- */
// Définition : un cerf-volant F1 tourne autour de O de 100° pour venir en F2 ; le point A va en B.
const RO3_O = [200, 190], RO3_F1 = [[300, 160], [340, 120], [372, 150], [345, 185]], RO3_ALPHA = 100;
function ro3FigDefinition(){
  const F2 = ro3Pts(RO3_F1, RO3_O, RO3_ALPHA), A = RO3_F1[0], B = F2[0];
  return g4Svg(ro3Poly(RO3_F1, RO3_BLEU, 'rgba(12,91,160,.14)') + ro3Poly(F2, RO3_ROUGE, 'rgba(192,57,43,.12)')
    + `<line x1="${RO3_O[0]}" y1="${RO3_O[1]}" x2="${A[0]}" y2="${A[1]}" stroke="#8A919C" stroke-dasharray="4 4"/><line x1="${RO3_O[0]}" y1="${RO3_O[1]}" x2="${B[0].toFixed(1)}" y2="${B[1].toFixed(1)}" stroke="#8A919C" stroke-dasharray="4 4"/>`
    + ro3ArcAngle(RO3_O, A, RO3_ALPHA, 45, RO3_VIOLET, 'α') + ro3Croix(RO3_O) + ro3Label(RO3_O, 0, 22, 'O')
    + ro3Label(A, 4, 22, 'A') + ro3Label(B, -14, -6, 'B') + ro3Label([355, 110], 0, 0, 'ℱ₁', RO3_BLEU, 17) + ro3Label(ro3Rot([355, 110], RO3_O, RO3_ALPHA), -8, 0, 'ℱ₂', RO3_ROUGE, 17),
    [...RO3_F1, ...F2, RO3_O, [RO3_O[0], RO3_O[1] + 20]], 420);
}
// Image d'un point : M et M' sur le cercle de centre O, angle MOM' = α.
function ro3FigPoint(a, maxW){
  const O = [150, 150], M = [245, 115], M2 = ro3Rot(M, O, a), r = Math.hypot(M[0] - O[0], M[1] - O[1]);
  const u = P => [P[0] - O[0], P[1] - O[1]];
  return g4Svg(`<circle cx="${O[0]}" cy="${O[1]}" r="${r.toFixed(1)}" fill="none" stroke="#9AA3AF" stroke-dasharray="5 5"/>`
    + g4Seg(O, M, RO3_ENCRE, 1.6) + g4Seg(O, M2, RO3_ENCRE, 1.6) + g4Traits(O, M, 1, RO3_BLEU) + g4Traits(O, M2, 1, RO3_BLEU)
    + ro3ArcAngle(O, M, a, 26, RO3_VIOLET, 'α') + ro3Croix(O) + ro3Label(O, 0, 22, 'O')
    + ro3Trait(M, u(M)) + ro3Trait(M2, u(M2)) + ro3Label(M, 14, -6, 'M') + ro3Label(M2, -14, -6, 'M′'),
    [[O[0] - r, O[1] - r], [O[0] + r, O[1] + r]], maxW || 260);
}
// Propriétés : quadrilatère ABCD et son image A'B'C'D' par la rotation de centre O et d'angle 70°.
const RO3_Q = [[230, 60], [140, 45], [195, 150], [290, 120]], RO3_QO = [270, 250], RO3_QA = 70;
function ro3FigProprietes(){
  const [A, B, C, D] = RO3_Q, [A2, B2, C2, D2] = ro3Pts(RO3_Q, RO3_QO, RO3_QA), O = RO3_QO;
  const J = g4Lerp(B, C, 0.5), J2 = g4Lerp(B2, C2, 0.5), G = g4Centre(RO3_Q), G2 = g4Centre([A2, B2, C2, D2]);
  const u = (P, Q) => [-(Q[1] - P[1]), Q[0] - P[0]];
  return g4Svg(ro3Poly(RO3_Q, RO3_BLEU, 'rgba(12,91,160,.14)') + ro3Poly([A2, B2, C2, D2], RO3_ROUGE, 'rgba(192,57,43,.12)')
    + `<line x1="${O[0]}" y1="${O[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#8A919C" stroke-dasharray="4 4"/><line x1="${O[0]}" y1="${O[1]}" x2="${C2[0].toFixed(1)}" y2="${C2[1].toFixed(1)}" stroke="#8A919C" stroke-dasharray="4 4"/>`
    + ro3ArcAngle(O, C, RO3_QA, 34, RO3_VIOLET, '70°')
    + g4Arc(B, A, C, RO3_VERT, 18) + g4Arc(B2, A2, C2, RO3_VERT, 18)
    + g4Traits(B, J, 2) + g4Traits(J, C, 2) + g4Traits(B2, J2, 2) + g4Traits(J2, C2, 2)
    + ro3Trait(J, u(B, C)) + ro3Trait(J2, u(B2, C2)) + ro3Label(J, 12, 4, 'J', RO3_ENCRE, 13) + ro3Label(J2, -12, 12, 'J′', RO3_ENCRE, 13)
    + ro3Croix(O) + ro3Label(O, 12, 16, 'O')
    + [[A, 'A'], [B, 'B'], [C, 'C'], [D, 'D']].map(([P, n]) => g4Nom(P, G, n)).join('')
    + [[A2, 'A′'], [B2, 'B′'], [C2, 'C′'], [D2, 'D′']].map(([P, n]) => g4Nom(P, G2, n)).join(''),
    [...RO3_Q, A2, B2, C2, D2, O], 420);
}

document.getElementById('cours-demo-rotation-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Qu'est-ce qu'une rotation ?</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Lorsqu'on fait <b>tourner</b> une figure ℱ₁ autour d'un point O, d'un angle de mesure α, dans le <b>sens inverse des aiguilles d'une montre</b>, elle se superpose à une figure ℱ₂.<br>On dit que ℱ₂ est l'<b>image</b> de ℱ₁ par la <b>rotation de centre O et d'angle α</b>.</div>
${ro3FigDefinition()}
<p class="example-title">Remarques :</p>
<ul class="example-list">
  <li>Dans tout ce chapitre, on tourne toujours dans le sens inverse des aiguilles d'une montre, appelé <b>sens trigonométrique</b> (ou sens direct).</li>
  <li>Le point A tourne autour de O pour venir en B : B est l'image de A.</li>
  <li>La rotation de centre O et d'angle <b>180°</b> est la <b>symétrie centrale</b> de centre O (un demi-tour).</li>
  <li>Le centre O ne bouge pas : il est sa propre image.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>L'image d'un point</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Soient O et M deux points distincts. L'image du point M par la rotation de centre O et d'angle α est le point M′ tel que :
  <div style="text-align:center;margin:6px 0 2px;">OM′ = OM &nbsp; et &nbsp; ${ro3Tex('\\widehat{MOM\'} = \\alpha')}</div>
  (M′ est obtenu en tournant de α dans le sens inverse des aiguilles d'une montre).</div>
${ro3FigPoint(80)}
<div class="redaction-note" ${R4_REM}>Autrement dit, M′ est sur le <b>cercle de centre O passant par M</b> : quand on tourne autour de O, on reste à la même distance de O. La construction à la règle, au compas et au rapporteur est animée dans l'onglet Méthode.</div>

<div class="lesson-header"><span class="num">3</span><h3>Ce que conserve une rotation</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Par une rotation, une figure et son image se <b>superposent</b>. La rotation <b>conserve</b> donc les <b>longueurs</b>, l'<b>alignement</b>, les <b>aires</b>, les <b>milieux</b> et la <b>mesure des angles</b>.</div>
<p class="example-title">Exemple : le quadrilatère A′B′C′D′ est l'image de ABCD par la rotation de centre O et d'angle 70°.</p>
${ro3FigProprietes()}
<ul class="example-list">
  <li>Les deux quadrilatères ont les mêmes longueurs de côtés, donc le même <b>périmètre</b>, et la même <b>aire</b>.</li>
  <li>J est le milieu du segment [BC], donc son image J′ est le milieu du segment [B′C′].</li>
  <li>L'angle ${ro3Tex('\\widehat{A\'B\'C\'}')} est l'image de l'angle ${ro3Tex('\\widehat{ABC}')} : ils ont la même mesure.</li>
</ul>
`;

document.getElementById('histoire-demo-rotation-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Pourquoi un tour complet mesure-t-il <b>360 degrés</b> ? On le doit aux astronomes de <b>Babylone</b>, il y a plus de 3 000 ans. Ils comptaient en base 60 (c'est pour cela qu'une heure compte 60 minutes, et une minute 60 secondes) et observaient que le Soleil semble faire le tour du ciel en à peu près 360 jours. Le nombre 360 a aussi l'avantage d'avoir énormément de diviseurs (2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20…) : on peut partager un tour en parts égales entières de bien des façons. Les rotations sont partout autour de nous : aiguilles d'une montre, roues, éoliennes, manèges… et dans l'art, avec les rosaces des cathédrales, qui restent identiques quand on les fait tourner d'un certain angle autour de leur centre.
</div>
`;

document.getElementById('methode-demo-rotation-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : faire tourner une figure</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites varier l'angle : la figure rouge est l'image de la bleue par la rotation de centre O. Le point A décrit un arc de cercle de centre O.</p>
  <svg id="ro3-tourneSvg" viewBox="0 0 440 340" style="width:100%;max-width:450px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:450px;margin:0 auto;">
    <label for="ro3-angle" style="font-weight:700;">α</label><input id="ro3-angle" type="range" min="0" max="360" step="5" value="90" oninput="ro3TourneDessiner()"><span id="ro3-angleVal" style="font-family:'JetBrains Mono',monospace;min-width:50px;"></span>
  </div>
  <div id="ro3-tourneNote" class="step-note" style="text-align:center;min-height:2.4em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ro3TourneAnimer(90)">90°</button>
    <button class="btn" onclick="ro3TourneAnimer(180)">180° (symétrie centrale)</button>
    <button class="btn" onclick="ro3TourneAnimer(60)">60°</button>
    <button class="btn secondary" onclick="ro3TourneAnimer(0)">Revenir à 0°</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire l'image d'un point</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Construire l'image M′ du point M par la rotation de centre O et d'angle 70°, avec le rapporteur et le compas. Cliquez sur « Étape suivante ».</p>
  <svg id="ro3-constrSvg" viewBox="0 0 420 300" style="width:100%;max-width:440px;display:block;margin:8px auto;"></svg>
  <div id="ro3-constrNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ro3ConstrSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="ro3ConstrReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : trouver l'angle d'une rotation dans une figure régulière</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  ${ro3FigHexagone(false)}
  <p class="interaction-hint" style="margin:6px 0;">ABCDEF est un hexagone régulier de centre O. Par quelle rotation de centre O le point A a-t-il pour image le point B ? Et le triangle OAB le triangle OCD ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="ro3-hexDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ro3HexDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ro3HexDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Hexagone régulier ABCDEF (sens trigonométrique) de centre O, rayon 80.
function ro3HexPts(){ const O = [150, 120]; return { O, P: [0, 1, 2, 3, 4, 5].map(k => ro3Rot([O[0] + 80, O[1]], O, 60 * k)) }; }
function ro3FigHexagone(avecTriangles){
  const { O, P } = ro3HexPts(), noms = ['A', 'B', 'C', 'D', 'E', 'F'];
  return g4Svg(ro3Poly(P, RO3_ENCRE, 'rgba(12,91,160,.06)') + P.map(Q => g4Seg(O, Q, '#9AA3AF', 1.2)).join('')
    + (avecTriangles ? ro3Poly([O, P[0], P[1]], RO3_BLEU, 'rgba(12,91,160,.25)') + ro3Poly([O, P[2], P[3]], RO3_ROUGE, 'rgba(192,57,43,.2)') : '')
    + P.map((Q, i) => g4Nom(Q, O, noms[i])).join('') + ro3Label(O, 0, 20, 'O', RO3_ENCRE, 14),
    [...P, O], 260);
}

// Exercice avec correction repliable (même présentation que les autres chapitres).
function ro3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="ro3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="ro3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
// Quadrillage avec points (exercice 1) : O au centre, A, B, C, D, E sur les nœuds.
function ro3FigQuadrillage(){
  const u = 26, O = [170, 130], pt = (x, y) => [O[0] + x * u, O[1] - y * u];
  let h = '';
  for(let i = -5; i <= 5; i++){ h += `<line x1="${O[0] + i * u}" y1="${O[1] - 4.5 * u}" x2="${O[0] + i * u}" y2="${O[1] + 4.5 * u}" stroke="#E1E5EB"/>`; }
  for(let j = -4; j <= 4; j++){ h += `<line x1="${O[0] - 5.5 * u}" y1="${O[1] + j * u}" x2="${O[0] + 5.5 * u}" y2="${O[1] + j * u}" stroke="#E1E5EB"/>`; }
  const pts = [['O', 0, 0], ['A', 3, 1], ['B', -1, 3], ['C', -3, -1], ['D', 1, -3], ['E', 3, -1]];
  h += pts.map(([n, x, y]) => ro3Croix(pt(x, y), n === 'O' ? RO3_ENCRE : RO3_BLEU) + ro3Label(pt(x, y), 10, -8, n, n === 'O' ? RO3_ENCRE : RO3_BLEU, 14)).join('');
  return `<svg viewBox="${O[0] - 5.5 * u} ${O[1] - 4.5 * u} ${11 * u} ${9 * u}" style="width:100%;max-width:300px;display:block;margin:10px auto;">${h}</svg>`;
}
document.getElementById('exos-demo-rotation-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Construire l'image d'un point par une rotation »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On trace la demi-droite [OM).</span><span class="we-comment">1. On relie le centre au point.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Avec le rapporteur centré en O, on mesure l'angle α à partir de [OM), dans le sens inverse des aiguilles d'une montre, et on trace la demi-droite obtenue.</span><span class="we-comment">2. On reporte l'angle.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Avec le compas, on reporte la longueur OM sur cette demi-droite, à partir de O.</span><span class="we-comment">3. OM′ = OM.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On nomme M′ le point obtenu : c'est l'image de M.</span><span class="we-comment">4. On nomme le point.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${ro3Exo(1, 'Dans le quadrillage ci-dessous, on tourne autour du point O (sens inverse des aiguilles d\'une montre). a) Quelle est l\'image de A par la rotation de centre O et d\'angle 90° ? b) par celle d\'angle 180° ? c) Quelle est l\'image de B par la rotation de centre O et d\'angle 90° ?', [
    'a) En tournant de 90° autour de O, A (3 à droite, 1 en haut) arrive 3 en haut et 1 à gauche : c\'est le point B.',
    'b) Un demi-tour (symétrie centrale de centre O) envoie A sur le point C.', 'c) L\'image de B par la rotation de 90° est C.'], ro3FigQuadrillage())}
  ${ro3Exo(2, 'ABCDEF est un hexagone régulier de centre O (sommets nommés dans le sens inverse des aiguilles d\'une montre). a) Quelle est l\'image de A par la rotation de centre O et d\'angle 60° ? b) Par quelle rotation de centre O le triangle OAB a-t-il pour image le triangle OCD ?', [
    'a) Les six angles au centre sont égaux : 360° ÷ 6 = 60°. La rotation de centre O et d\'angle 60° envoie A sur B.',
    'b) A va en C et B en D : il faut tourner de deux « crans », soit la rotation de centre O et d\'angle 120°.'], ro3FigHexagone(true))}
  ${ro3Exo(3, 'Le triangle RST a pour côtés RS = 5 cm, ST = 4 cm et RT = 6 cm, et l\'angle ' + ro3Tex('\\widehat{RST}') + ' mesure 82°. Son aire est d\'environ 9,9 cm². On construit son image R′S′T′ par une rotation. Que peut-on dire de R′S′, de l\'angle ' + ro3Tex('\\widehat{R\'S\'T\'}') + ' et de l\'aire de R′S′T′ ?', [
    'La rotation conserve les longueurs : R′S′ = RS = 5 cm.', 'Elle conserve les angles : ' + ro3Tex('\\widehat{R\'S\'T\'} = \\widehat{RST} = 82°') + '.', 'Elle conserve les aires : l\'aire de R′S′T′ est aussi d\'environ 9,9 cm².'])}
  ${ro3Exo(4, 'Les points K, L, M sont alignés et L est le milieu de [KM]. On construit leurs images K′, L′, M′ par la rotation de centre O et d\'angle 45°. Que peut-on dire des points K′, L′ et M′ ?', [
    'La rotation conserve l\'alignement : K′, L′ et M′ sont alignés.', 'Elle conserve les milieux : L′ est le milieu de [K′M′].'])}
  ${ro3Exo(5, 'La rotation de centre O et d\'angle 180° a un autre nom. Lequel ? Où se trouve l\'image M′ d\'un point M par cette rotation ?', [
    'C\'est la symétrie centrale de centre O (un demi-tour).', 'O est le milieu du segment [MM′].'])}
  ${ro3Exo(6, 'Une rosace a 5 pétales identiques régulièrement répartis autour de son centre O. Quel est le plus petit angle d\'une rotation de centre O qui la laisse inchangée ? Cite trois autres angles qui conviennent.', [
    '360° ÷ 5 = 72° : la rotation de centre O et d\'angle 72° envoie chaque pétale sur le suivant.', 'Les angles 144°, 216° et 288° conviennent aussi (2, 3 et 4 crans), ainsi que 360° (un tour complet).'])}
  ${ro3Exo(7, 'De quel angle tourne la grande aiguille d\'une montre en 15 minutes ? en 20 minutes ? Dans quel sens tourne-t-elle ?', [
    'En 60 minutes, elle fait un tour complet : 360°. En 1 minute : 360° ÷ 60 = 6°.', 'En 15 minutes : 15 × 6° = 90°. En 20 minutes : 20 × 6° = 120°.',
    'Elle tourne dans le sens des aiguilles d\'une montre, c\'est-à-dire dans le sens inverse du sens trigonométrique utilisé dans ce chapitre.'])}
  ${ro3Exo(8, 'Vrai ou faux ? Justifie. a) Le centre d\'une rotation est sa propre image. b) L\'image d\'un carré par une rotation est un carré de même aire. c) Par une rotation d\'angle 90°, un segment et son image sont parallèles.', [
    'a) Vrai : le centre ne bouge pas quand on tourne autour de lui.',
    'b) Vrai : la rotation conserve les longueurs et les angles (c\'est encore un carré, de même côté) et les aires.',
    'c) Faux : ils sont perpendiculaires (la rotation fait tourner la direction du segment de 90°). Un segment et son image ne sont parallèles que pour un angle de 180°.'])}
</div>
`;

/* ---- Méthode 1 : la figure qui tourne ---- */
const RO3_T_O = [210, 185], RO3_T_F = [[270, 175], [320, 175], [320, 140], [295, 115], [270, 140]];
let ro3TRaf = null;
function ro3TourneDessin(a){
  const svg = document.getElementById('ro3-tourneSvg'); if(!svg) return;
  const O = RO3_T_O, F = RO3_T_F, F2 = ro3Pts(F, O, a), A = F[3], A2 = F2[3], r = Math.hypot(A[0] - O[0], A[1] - O[1]);
  svg.innerHTML = `<circle cx="${O[0]}" cy="${O[1]}" r="${r.toFixed(1)}" fill="none" stroke="#E1E5EB" stroke-dasharray="5 5"/>`
    + (a > 0 ? ro3ArcAngle(O, A, a, r, RO3_VIOLET, '', a > 8) : '')
    + ro3Poly(F, RO3_BLEU, 'rgba(12,91,160,.14)') + ro3Poly(F2, RO3_ROUGE, 'rgba(192,57,43,.14)')
    + g4Seg(O, A, '#9AA3AF', 1.2, true) + g4Seg(O, A2, '#9AA3AF', 1.2, true)
    + (a > 0 && a < 360 ? ro3ArcAngle(O, A, a, 30, RO3_VIOLET, a + '°', a > 20) : '')
    + ro3Croix(O) + ro3Label(O, -12, 18, 'O') + ro3Label(A, 8, -8, 'A', RO3_BLEU) + (a % 360 ? ro3Label(A2, 0, -10, 'A′', RO3_ROUGE) : '');
  document.getElementById('ro3-angleVal').textContent = Math.round(a) + '°';
  const n = document.getElementById('ro3-tourneNote');
  n.textContent = a % 360 === 0 ? 'Angle 0° ou 360° : la figure revient à sa place.' : a === 180 ? 'Angle 180° : c\'est la symétrie centrale de centre O (O est le milieu de [AA′]).' : a === 90 ? 'Angle 90° : un quart de tour. [OA] et [OA′] sont perpendiculaires, et OA = OA′.' : `OA′ = OA et l'angle AOA′ mesure ${Math.round(a)}°.`;
}
function ro3TourneDessiner(){ cancelAnimationFrame(ro3TRaf); ro3TourneDessin(Number(document.getElementById('ro3-angle').value)); }
function ro3TourneAnimer(cible){
  cancelAnimationFrame(ro3TRaf);
  const inp = document.getElementById('ro3-angle'), a0 = Number(inp.value), t0 = performance.now(), dur = 900 + Math.abs(cible - a0) * 6;
  const f = now => { const t = Math.min(1, (now - t0) / dur), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, a = a0 + (cible - a0) * e;
    inp.value = Math.round(a); ro3TourneDessin(t < 1 ? a : cible); if(t < 1) ro3TRaf = requestAnimationFrame(f); };
  ro3TRaf = requestAnimationFrame(f);
}

/* ---- Méthode 2 : construction de l'image d'un point (rapporteur puis compas) ---- */
const RO3_C_O = [150, 220], RO3_C_M = [330, 175], RO3_C_A = 70;
const RO3_C_NOTES = [
  'Le point M et le centre O sont donnés (des croix : ce sont des points libres du plan).',
  '1. On trace la demi-droite [OM).',
  '2. On place le rapporteur : son centre sur O, son zéro sur [OM).',
  '3. On marque 70° en tournant dans le sens inverse des aiguilles d\'une montre, puis on trace la demi-droite.',
  '4. Avec le compas, pointe sur O, on prend l\'écartement OM et on trace un arc qui coupe la nouvelle demi-droite.',
  '5. Le point d\'intersection est M′, l\'image de M : OM′ = OM et l\'angle MOM′ mesure 70°. Les outils disparaissent.',
];
let ro3CEtape = 0;
function ro3ConstrDessin(k){
  const svg = document.getElementById('ro3-constrSvg'); if(!svg) return;
  const O = RO3_C_O, M = RO3_C_M, r = Math.hypot(M[0] - O[0], M[1] - O[1]), M2 = ro3Rot(M, O, RO3_C_A);
  const loin = (P, L) => { const d = Math.hypot(P[0] - O[0], P[1] - O[1]); return [O[0] + (P[0] - O[0]) / d * L, O[1] + (P[1] - O[1]) / d * L]; };
  const dirM = loin(M, 250), dirM2 = loin(M2, 250), a0 = Math.atan2(-(M[1] - O[1]), M[0] - O[0]) * 180 / Math.PI;
  let h = '';
  if(k >= 1) h += g4Seg(O, dirM, RO3_ENCRE, 1.6);
  if(k >= 3) h += g4Seg(O, dirM2, RO3_ENCRE, 1.6);
  // Instruments du site (rulerSVG / pencilSVG / protractorSVG / compassSVG, app.js).
  const angOM = Math.atan2(M[1] - O[1], M[0] - O[0]) * 180 / Math.PI, angOM2 = Math.atan2(M2[1] - O[1], M2[0] - O[0]) * 180 / Math.PI;
  if(k === 1){ // règle posée le long de [OM), bord gradué sur le trait, crayon au bout du trait
    const sR = 300 / TB_RULER_L, recul = 20 * sR, t = angOM * Math.PI / 180;
    h += `<g transform="translate(${(O[0] - Math.cos(t) * recul).toFixed(1)},${(O[1] - Math.sin(t) * recul).toFixed(1)}) rotate(${angOM.toFixed(1)}) scale(${sR.toFixed(3)})">${rulerSVG(true)}</g>`
      + `<g transform="translate(${dirM[0].toFixed(1)},${dirM[1].toFixed(1)}) rotate(${(angOM - 35).toFixed(1)}) scale(0.7)">${pencilSVG('ro3-crayon')}</g>`;
  }
  if(k === 2 || k === 3){ // rapporteur : centre sur O, zéro sur [OM)
    const R = 110, sP = R / TB_PROT_RADIUS, t = (a0 + RO3_C_A) * Math.PI / 180;
    h += `<g transform="translate(${O[0]},${O[1]}) rotate(${angOM.toFixed(1)}) scale(${sP.toFixed(3)})">${protractorSVG()}</g>`;
    // repère : un petit trait dans l'axe de la graduation 70° (pas de petit disque)
    if(k === 3) h += `<line x1="${(O[0] + (R - 8) * Math.cos(t)).toFixed(1)}" y1="${(O[1] - (R - 8) * Math.sin(t)).toFixed(1)}" x2="${(O[0] + (R + 8) * Math.cos(t)).toFixed(1)}" y2="${(O[1] - (R + 8) * Math.sin(t)).toFixed(1)}" stroke="${RO3_ROUGE}" stroke-width="2.4"/>`;
  }
  if(k >= 4){ // arc de compas autour de la demi-droite image
    const t = (a0 + RO3_C_A) * Math.PI / 180, e = 0.28, q0 = [O[0] + r * Math.cos(t - e), O[1] - r * Math.sin(t - e)], q1 = [O[0] + r * Math.cos(t + e), O[1] - r * Math.sin(t + e)];
    h += `<path d="M${q0[0].toFixed(1)},${q0[1].toFixed(1)} A${r.toFixed(1)},${r.toFixed(1)} 0 0 0 ${q1[0].toFixed(1)},${q1[1].toFixed(1)}" fill="none" stroke="${RO3_ORANGE}" stroke-width="1.6"/>`;
    if(k === 4){ // compas du site : pointe sèche en O, mine en M′, charnière du côté qui reste dans le cadre
      const leg = 0.7 * r + 30, hh = Math.sqrt(leg * leg - r * r / 4), t2 = angOM2 * Math.PI / 180, cx = (O[0] + M2[0]) / 2 + hh * Math.sin(t2);
      h += `<g transform="translate(${O[0]},${O[1]}) rotate(${angOM2.toFixed(1)})${cx > 25 ? '' : ' scale(1,-1)'}">${compassSVG(r, leg)}</g>`;
    }
  }
  if(k >= 5){ h += ro3ArcAngle(O, M, RO3_C_A, 34, RO3_VIOLET, '70°') + g4Traits(O, M, 1, RO3_BLEU) + g4Traits(O, M2, 1, RO3_BLEU) + ro3Label(M2, -16, -6, 'M′', RO3_ROUGE); }
  // Points : M est une croix tant que [OM) n'est pas tracée, puis un petit trait sur [OM).
  h += ro3Croix(O) + ro3Label(O, -12, 16, 'O') + (k >= 1 ? ro3Trait(M, [-(M[1] - O[1]), M[0] - O[0]]) : ro3Croix(M)) + ro3Label(M, 10, 18, 'M');
  svg.innerHTML = h;
  document.getElementById('ro3-constrNote').textContent = RO3_C_NOTES[k];
}
function ro3ConstrSuivant(){ if(ro3CEtape < RO3_C_NOTES.length - 1) ro3CEtape++; ro3ConstrDessin(ro3CEtape); }
function ro3ConstrReset(){ ro3CEtape = 0; ro3ConstrDessin(0); }

/* ---- Méthode 3 : hexagone ---- */
const RO3_HEX_STEPS = [
  { expr: 'Les six triangles OAB, OBC, … sont équilatéraux et identiques.', note: 'Dans un hexagone régulier, les angles au centre sont égaux.' },
  { expr: '360° ÷ 6 = 60°', note: 'Les six angles au centre font un tour complet.' },
  { expr: 'OA = OB et ' + ro3Tex('\\widehat{AOB} = 60°'), note: 'On tourne de A vers B dans le sens inverse des aiguilles d\'une montre.' },
  { expr: 'B est l\'image de A par la rotation de centre O et d\'angle 60°.', note: 'Chaque sommet va sur le suivant.' },
  { expr: 'A va en C et B va en D : rotation de centre O et d\'angle 2 × 60° = 120°.', note: 'Le triangle OAB a pour image le triangle OCD (O est sa propre image).' },
];
const ro3HexDemo = makeStepDemo(RO3_HEX_STEPS, 'ro3-hexDisplay');

DEMO_REGISTRY['3e|Rotation'] = {
  cours: 'cours-demo-rotation-3e', methode: 'methode-demo-rotation-3e', exos: 'exos-demo-rotation-3e', histoire: 'histoire-demo-rotation-3e',
  init: () => {
    ro3TourneDessiner(); ro3ConstrReset(); ro3HexDemo.reset();
    ['cours-demo-rotation-3e', 'methode-demo-rotation-3e', 'exos-demo-rotation-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-rotation-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-rotation-3e'));
  }
};

DEMO_QUIZZES['3e|Rotation'] = [
  { q: 'Dans ce chapitre, une rotation tourne...', opts: ['dans le sens des aiguilles d\'une montre', 'dans le sens inverse des aiguilles d\'une montre', 'dans les deux sens à la fois'], correct: 1 },
  { q: 'M′ est l\'image de M par la rotation de centre O et d\'angle α. Alors...', opts: ['OM′ = OM et l\'angle MOM′ mesure α', 'MM′ = α', 'O est le milieu de [MM′]'], correct: 0 },
  { q: 'La rotation de centre O et d\'angle 180° est...', opts: ['une translation', 'la symétrie centrale de centre O', 'une symétrie axiale'], correct: 1 },
  { q: 'Une rotation conserve...', opts: ['seulement les longueurs', 'les longueurs, les angles, les aires, l\'alignement et les milieux', 'seulement les aires'], correct: 1 },
  { q: 'Dans un hexagone régulier ABCDEF de centre O, l\'image de A par la rotation de centre O et d\'angle 60° est...', opts: ['B', 'C', 'D'], correct: 0 },
  { q: 'L\'image du centre O d\'une rotation est...', opts: ['O lui-même', 'un autre point', 'on ne peut pas savoir'], correct: 0 },
  { q: 'Une rosace à 8 pétales réguliers reste inchangée par la rotation de centre O d\'angle...', opts: ['45°', '8°', '80°'], correct: 0 },
];

/* ============================================================
   CHAPITRE : Cosinus (4e, G3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 98-99 : côté adjacent, angles complémentaires, cosinus d'un angle
   aigu, calcul d'un côté adjacent, de l'hypoténuse, d'un angle). Plan du manuel, titres reformulés,
   exemples nouveaux. Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js
   (chargé avant).
   ============================================================ */

const CO4_BLEU = '#0C5BA0', CO4_ORANGE = '#E07B00', CO4_VERT = '#1E7B34', CO4_ENCRE = '#1C1B2E';
const co4Tex = s => `<span class="tex"${s.length < 32 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const co4Long = s => `<span style="display:block;max-width:100%;overflow-x:auto;overflow-y:hidden;position:relative;padding:4px 0;white-space:nowrap;">${co4Tex(s)}</span>`;
const co4N = (v, d) => String(Math.round(v * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).replace('.', ',');
const co4T = v => co4N(v, 4).replace(',', '{,}');
const co4Ang = s => `\\widehat{${s}}`;
const CO4_VB_ID = '0 0 520 250';

/* ---- Figures : triangle rectangle avec angle marqué, hypoténuse et côté adjacent en couleur ---- */
// pts : { nom: [x, y] } pour 3 sommets ; droit : sommet de l'angle droit ; angle : sommet de l'angle aigu marqué.
function co4Tri(pts, droit, angle, opts){
  opts = opts || {};
  const noms = Object.keys(pts), g = noms.reduce((a, n) => [a[0] + pts[n][0] / 3, a[1] + pts[n][1] / 3], [0, 0]);
  const autre = noms.find(n => n !== droit && n !== angle), seg = (p, q, c, w) => `<line x1="${pts[p][0]}" y1="${pts[p][1]}" x2="${pts[q][0]}" y2="${pts[q][1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  let s = `<polygon points="${noms.map(n => pts[n].join(',')).join(' ')}" fill="${opts.fond || 'rgba(12,91,160,.07)'}" stroke="${CO4_ENCRE}" stroke-width="1.8" stroke-linejoin="round"/>`;
  if(opts.hyp !== false && opts.hyp !== 0) s += seg(angle, autre, CO4_ORANGE, 4) ; // hypoténuse : côté opposé à l'angle droit
  if(opts.adj !== false && opts.adj !== 0) s += seg(angle, droit, CO4_VERT, 4);
  // Angle droit.
  const V = pts[droit], u = [pts[angle][0] - V[0], pts[angle][1] - V[1]], v = [pts[autre][0] - V[0], pts[autre][1] - V[1]], lu = Math.hypot(...u), lv = Math.hypot(...v), k = 11;
  const a1 = [V[0] + u[0] / lu * k, V[1] + u[1] / lu * k], a2 = [a1[0] + v[0] / lv * k, a1[1] + v[1] / lv * k], a3 = [V[0] + v[0] / lv * k, V[1] + v[1] / lv * k];
  s += `<polyline points="${a1.join(',')} ${a2.join(',')} ${a3.join(',')}" fill="none" stroke="${CO4_ENCRE}" stroke-width="1.4"/>`;
  // Arc de l'angle aigu.
  if(opts.arc !== false && opts.arc !== 0){
    const A = pts[angle], d1 = Math.atan2(pts[droit][1] - A[1], pts[droit][0] - A[0]), d2 = Math.atan2(pts[autre][1] - A[1], pts[autre][0] - A[0]), r = 26;
    let da = d2 - d1; while(da > Math.PI) da -= 2 * Math.PI; while(da < -Math.PI) da += 2 * Math.PI;
    s += `<path d="M${A[0] + r * Math.cos(d1)},${A[1] + r * Math.sin(d1)} A${r},${r} 0 0 ${da > 0 ? 1 : 0} ${A[0] + r * Math.cos(d2)},${A[1] + r * Math.sin(d2)}" fill="rgba(142,68,173,.18)" stroke="#8E44AD" stroke-width="1.8"/>`;
    if(opts.valAngle) { const m = d1 + da / 2; s += `<text x="${A[0] + 44 * Math.cos(m)}" y="${A[1] + 44 * Math.sin(m) + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#8E44AD">${opts.valAngle}</text>`; }
  }
  noms.forEach(n => { const [x, y] = pts[n], dx = x - g[0], dy = y - g[1], l = Math.hypot(dx, dy) || 1; s += `<text x="${(x + dx / l * 14).toFixed(1)}" y="${(y + dy / l * 14 + 5).toFixed(1)}" text-anchor="middle" font-size="15" font-weight="700" fill="${CO4_ENCRE}">${n}</text>`; });
  (opts.cotes || []).forEach(([p, q, t, c]) => {
    const mx = (pts[p][0] + pts[q][0]) / 2, my = (pts[p][1] + pts[q][1]) / 2, dx = mx - g[0], dy = my - g[1], l = Math.hypot(dx, dy) || 1, off = 9 + Math.abs(dx / l) * String(t).length * 3.9 + Math.abs(dy / l) * 7;
    s += `<text x="${(mx + dx / l * off).toFixed(1)}" y="${(my + dy / l * off + 5).toFixed(1)}" text-anchor="middle" font-size="13.5" font-weight="700" fill="${c || CO4_ENCRE}">${t}</text>`;
  });
  return opts.brut ? s : `<svg viewBox="${opts.vb || '0 0 280 160'}" style="width:100%;max-width:${opts.max || 290}px;display:block;margin:6px auto;">${s}</svg>`;
}
const co4Deux = (a, b) => `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:4px 18px;align-items:center;">${a}${b}</div>`;
const CO4_LEG = `<p style="text-align:center;font-size:.85rem;margin:0 0 8px;"><span style="color:${CO4_ORANGE};font-weight:700;">▬ hypoténuse</span> &nbsp; <span style="color:${CO4_VERT};font-weight:700;">▬ côté adjacent à l'angle marqué</span></p>`;

document.getElementById('cours-demo-cosinus-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le vocabulaire du triangle rectangle</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Dans un triangle rectangle, le <b>côté adjacent à un angle aigu</b> est le côté qui relie le <b>sommet de cet angle</b> au <b>sommet de l'angle droit</b>.</div>
${co4Deux(`<ul class="example-list">
  <li>DEF est rectangle en E : l'angle droit est ${co4Tex(co4Ang('DEF'))}.</li>
  <li>Ses deux angles aigus sont ${co4Tex(co4Ang('EDF'))} et ${co4Tex(co4Ang('DFE'))}.</li>
  <li>Le côté adjacent à ${co4Tex(co4Ang('EDF'))} est <b style="color:${CO4_VERT};">[DE]</b> ; le côté adjacent à ${co4Tex(co4Ang('DFE'))} est [FE].</li>
  <li>L'hypoténuse est <b style="color:${CO4_ORANGE};">[DF]</b>.</li>
</ul>`, co4Tri({ D: [40, 125], E: [215, 125], F: [215, 30] }, 'E', 'D') + CO4_LEG)}
<div class="redaction-note" ${R4_REM}>Remarques : le côté adjacent à un angle aigu n'est <b>jamais</b> l'hypoténuse. Les deux angles aigus d'un triangle rectangle sont <b>complémentaires</b> : la somme de leurs mesures vaut 90°. Si l'on connaît l'un, on trouve l'autre par une soustraction : dans DEF, si ${co4Tex(co4Ang('EDF') + ' = 37°')}, alors ${co4Tex(co4Ang('DFE') + ' = 90° - 37° = 53°')}.</div>

<div class="lesson-header"><span class="num">2</span><h3>Le cosinus d'un angle aigu</h3></div>
<span class="prop-badge">Définition</span>
<div class="def-box">Dans un triangle rectangle, le <b>cosinus d'un angle aigu</b> est le quotient de la longueur du <b>côté adjacent</b> à cet angle par la longueur de l'<b>hypoténuse</b> :
  <div style="text-align:center;margin:8px 0 2px;">${co4Tex('\\cos(\\text{angle}) = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}')}</div></div>
${co4Deux(r4Ex('Exemples, dans le triangle DEF rectangle en E :', [
  [co4Tex('\\cos ' + co4Ang('EDF') + ' = \\dfrac{\\text{côté adjacent à } ' + co4Ang('EDF') + '}{\\text{hypoténuse}} = \\dfrac{DE}{DF}'), ''],
  [co4Tex('\\cos ' + co4Ang('DFE') + ' = \\dfrac{\\text{côté adjacent à } ' + co4Ang('DFE') + '}{\\text{hypoténuse}} = \\dfrac{FE}{DF}'), ''],
]), co4Tri({ D: [40, 125], E: [215, 125], F: [215, 30] }, 'E', 'F') )}
<div class="redaction-note" ${R4_REM}>Remarques : l'hypoténuse est le plus grand côté du triangle rectangle, donc le cosinus d'un angle aigu est toujours un nombre <b>compris entre 0 et 1</b>. Il ne dépend que de l'angle, pas de la taille du triangle (voir l'onglet Méthode) : c'est pourquoi la calculatrice peut le donner directement (touche <b>cos</b>, en mode <b>degrés</b>).</div>

<div class="lesson-header"><span class="num">3</span><h3>Calculer avec le cosinus</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Calculer la longueur du côté adjacent</h4></div>
<p class="example-title">Exemple : ABC est un triangle rectangle en B tel que AC = 8 cm et ${co4Tex(co4Ang('BAC') + ' = 35°')}. Calculer AB, au dixième près.</p>
${co4Deux(co4Tri({ A: [30, 125], B: [205, 125], C: [205, 3] }, 'B', 'A', { cotes: [['A', 'C', '8 cm', CO4_ORANGE], ['A', 'B', '?', CO4_VERT]], valAngle: '35°', vb: '0 -20 280 182' }), r4Ex('', [
  ['Le triangle ABC est rectangle en B.', 'On cite l\'hypothèse.'],
  [co4Tex('\\cos ' + co4Ang('BAC') + ' = \\dfrac{AB}{AC}'), 'On écrit le cosinus de l\'angle connu : la longueur cherchée doit apparaître.'],
  [co4Tex('\\cos 35° = \\dfrac{AB}{8}'), 'On remplace par les valeurs connues.'],
  [co4Tex('AB = 8 \\times \\cos 35°'), 'Produit en croix (cos 35° = cos 35°/1).'],
  ['AB ≈ 6,6 cm', 'Calculatrice en degrés : 8 × cos(35) ≈ 6,553.'],
]))}

<div class="sub-header"><span class="letter">B</span><h4>Calculer la longueur de l'hypoténuse</h4></div>
<p class="example-title">Exemple : MNP est un triangle rectangle en N tel que MN = 4,5 cm et ${co4Tex(co4Ang('NMP') + ' = 40°')}. Calculer MP, au dixième près.</p>
${co4Deux(co4Tri({ M: [30, 125], N: [190, 125], P: [190, -9] }, 'N', 'M', { cotes: [['M', 'N', '4,5 cm', CO4_VERT], ['M', 'P', '?', CO4_ORANGE]], valAngle: '40°', vb: '0 -30 280 192' }), r4Ex('', [
  ['Le triangle MNP est rectangle en N.', ''],
  [co4Tex('\\cos ' + co4Ang('NMP') + ' = \\dfrac{MN}{MP}'), 'On écrit le cosinus de l\'angle connu.'],
  [co4Tex('\\cos 40° = \\dfrac{4{,}5}{MP}'), ''],
  [co4Tex('MP = \\dfrac{4{,}5}{\\cos 40°}'), 'Produit en croix : MP × cos 40° = 4,5.'],
  ['MP ≈ 5,9 cm', 'Calculatrice : 4,5 ÷ cos(40) ≈ 5,874.'],
]))}

<div class="sub-header"><span class="letter">C</span><h4>Calculer la mesure d'un angle</h4></div>
<p class="example-title">Exemple : RST est un triangle rectangle en S tel que RT = 10 cm et RS = 7 cm. Calculer la mesure de l'angle ${co4Tex(co4Ang('SRT'))}, au degré près.</p>
${co4Deux(co4Tri({ R: [30, 125], S: [205, 125], T: [205, -54] }, 'S', 'R', { cotes: [['R', 'S', '7 cm', CO4_VERT], ['R', 'T', '10 cm', CO4_ORANGE]], vb: '0 -70 280 227' }), r4Ex('', [
  ['Le triangle RST est rectangle en S.', ''],
  [co4Tex('\\cos ' + co4Ang('SRT') + ' = \\dfrac{RS}{RT} = \\dfrac{7}{10}'), 'On écrit le cosinus de l\'angle cherché et on remplace.'],
  [co4Tex(co4Ang('SRT') + ' \\approx 46°'), 'Calculatrice : Arccos(7 ÷ 10), ou cos⁻¹(0,7), donne 45,57…'],
]))}
<div class="redaction-note" ${R4_REM}>À la calculatrice : vérifiez qu'elle est en mode <b>degrés</b> (D ou DEG). Pour retrouver un angle à partir de son cosinus, on utilise la touche <b>Arccos</b> (ou <b>cos⁻¹</b>, souvent avec la touche « seconde » ou « shift »).</div>
`;

document.getElementById('histoire-demo-cosinus-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La trigonométrie (« mesure des triangles ») est née de l'astronomie. Au 2e siècle avant J.-C., le Grec <b>Hipparque</b> dresse la première table de « cordes » pour calculer la position des astres ; <b>Ptolémée</b> la perfectionne dans son <i>Almageste</i>. En Inde, vers 500, <b>Aryabhata</b> utilise la « demi-corde », <i>jya</i>. Les savants arabes la transcrivent <i>jiba</i>, un mot qui, écrit sans voyelles, a été lu <i>jaib</i> (« pli, poche ») : au 12e siècle, il est traduit en latin par <i>sinus</i>, qui veut dire la même chose ! Le <b>cosinus</b> vient du latin <i>complementi sinus</i>, « le sinus du complément » : le cosinus d'un angle est le sinus de l'angle complémentaire (celui qui fait 90° avec lui). Le mot est utilisé en 1620 par l'Anglais <b>Edmund Gunter</b>. Au 18e siècle, la famille <b>Cassini</b> a réalisé la première carte précise de la France en couvrant le pays d'un immense réseau de triangles, mesurés avec ces calculs : la « triangulation ». Les GPS utilisent encore aujourd'hui des calculs de ce type.
</div>
`;

document.getElementById('methode-demo-cosinus-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : repérer l'hypoténuse et le côté adjacent, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="co4-idSvg" viewBox="${CO4_VB_ID}" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="co4-idSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="co4-idNext" onclick="co4IdDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="co4IdDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : le cosinus ne dépend que de l'angle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites varier l'angle, puis la taille du triangle : le rapport côté adjacent ÷ hypoténuse change avec l'angle, mais pas avec la taille.</p>
  <svg id="co4-exSvg" viewBox="0 -14 520 268" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Angle : <input id="co4-exA" type="range" min="5" max="85" step="1" value="35" style="width:170px;" oninput="co4Explorer()"></label>
    <label>Hypoténuse : <input id="co4-exH" type="range" min="3" max="10" step="0.5" value="8" style="width:170px;" oninput="co4Explorer()"></label>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer une longueur ou un angle avec le cosinus</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">ABC est rectangle en B. Choisissez ce que vous cherchez et donnez les deux autres valeurs : la rédaction complète s'affiche.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <label>On cherche <select id="co4-cCh" onchange="co4Calcul()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;">
      <option value="adj">AB (côté adjacent)</option><option value="hyp">AC (hypoténuse)</option><option value="ang">l'angle BAC</option></select></label>
    <span id="co4-cIn"></span>
  </div>
  <div id="co4-cFig"></div>
  <div id="co4-cRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : un problème, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une échelle de 4 m est appuyée contre un mur vertical ; son pied est à 1,2 m du mur. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="co4-pbDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="co4PbDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="co4PbDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function co4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="co4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="co4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-cosinus-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer la mesure d'un angle »</h3>
  <p style="margin:0 0 8px;">Une rampe d'accès GHI, rectangle en H, mesure GI = 5 m ; sa longueur au sol est GH = 4,8 m. Calculer l'angle ${co4Tex(co4Ang('HGI'))} qu'elle fait avec le sol, au degré près.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Le triangle GHI est rectangle en H.</span><span class="we-comment">On cite l'hypothèse.</span></div>
    <div class="we-row"><span class="we-expr">${co4Tex('\\cos ' + co4Ang('HGI') + ' = \\dfrac{GH}{GI}')}</span><span class="we-comment">[GH] est le côté adjacent à l'angle, [GI] l'hypoténuse.</span></div>
    <div class="we-row"><span class="we-expr">${co4Tex('\\cos ' + co4Ang('HGI') + ' = \\dfrac{4{,}8}{5} = 0{,}96')}</span><span class="we-comment">On remplace par les longueurs.</span></div>
    <div class="we-row"><span class="we-expr">${co4Tex(co4Ang('HGI') + ' \\approx 16°')}</span><span class="we-comment">Arccos(0,96) ≈ 16,26 : on arrondit au degré.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${co4Exo(1, 'KLM est un triangle rectangle en L. Nomme son hypoténuse, le côté adjacent à l\'angle ' + co4Tex(co4Ang('LKM')) + ' et le côté adjacent à l\'angle ' + co4Tex(co4Ang('LMK')) + '.', [
    'Hypoténuse : [KM] (opposée à l\'angle droit). Côté adjacent à ' + co4Tex(co4Ang('LKM')) + ' : [KL]. Côté adjacent à ' + co4Tex(co4Ang('LMK')) + ' : [ML].'])}
  ${co4Exo(2, 'Dans un triangle rectangle, un angle aigu mesure 34°. Combien mesure l\'autre angle aigu ? Même question avec 71,5°.', [
    'Les angles aigus sont complémentaires : 90° − 34° = <b>56°</b> ; 90° − 71,5° = <b>18,5°</b>.'])}
  ${co4Exo(3, 'GHI est rectangle en I. Écris ' + co4Tex('\\cos ' + co4Ang('IGH')) + ' et ' + co4Tex('\\cos ' + co4Ang('GHI')) + ' en fonction des longueurs des côtés.', [
    co4Tex('\\cos ' + co4Ang('IGH') + ' = \\dfrac{GI}{GH}') + ' et ' + co4Tex('\\cos ' + co4Ang('GHI') + ' = \\dfrac{HI}{GH}') + ' ([GH] est l\'hypoténuse).'])}
  ${co4Exo(4, 'ABC est rectangle en C, avec AB = 12 cm et ' + co4Tex(co4Ang('BAC') + ' = 60°') + '. Calcule AC.', [
    'ABC est rectangle en C : ' + co4Tex('\\cos ' + co4Ang('BAC') + ' = \\dfrac{AC}{AB}') + ', donc ' + co4Tex('AC = 12 \\times \\cos 60° = 6') + ' cm (cos 60° = 0,5 exactement).'])}
  ${co4Exo(5, 'DEF est rectangle en D, avec DE = 3 cm et ' + co4Tex(co4Ang('DEF') + ' = 72°') + '. Calcule EF, au dixième près.', [
    'DEF est rectangle en D : ' + co4Tex('\\cos ' + co4Ang('DEF') + ' = \\dfrac{DE}{EF}') + ', donc ' + co4Tex('EF = \\dfrac{3}{\\cos 72°}') + ' ≈ 9,7 cm.'])}
  ${co4Exo(6, 'PQR est rectangle en Q, avec PQ = 5 cm et PR = 13 cm. Calcule l\'angle ' + co4Tex(co4Ang('QPR')) + ', au degré près.', [
    'PQR est rectangle en Q : ' + co4Tex('\\cos ' + co4Ang('QPR') + ' = \\dfrac{PQ}{PR} = \\dfrac{5}{13}') + ', donc ' + co4Tex(co4Ang('QPR') + ' \\approx 67°') + ' (Arccos(5 ÷ 13) ≈ 67,38).'])}
  ${co4Exo(7, 'Une échelle de 4 m est appuyée contre un mur ; son pied est à 1,2 m du mur. Pour être stable, elle doit faire avec le sol un angle compris entre 65° et 75°. Est-ce le cas ?', [
    'Le mur est perpendiculaire au sol : l\'échelle, le sol et le mur forment un triangle rectangle, d\'hypoténuse l\'échelle.',
    'cos(angle) = 1,2 ÷ 4 = 0,3, donc angle ≈ 73° (Arccos(0,3) ≈ 72,5). L\'angle est bien entre 65° et 75° : l\'échelle est stable.'])}
  ${co4Exo(8, 'a) Le cosinus d\'un angle aigu peut-il valoir 1,2 ? b) Tom tape « cos 50 » et obtient 0,964 966… au lieu de 0,642 787… Que s\'est-il passé ?', [
    'a) Non : le côté adjacent est toujours plus court que l\'hypoténuse, donc le cosinus est compris entre 0 et 1.',
    'b) Sa calculatrice n\'était pas en mode <b>degrés</b> (elle a calculé avec une autre unité d\'angle, le radian). En degrés, cos 50° ≈ 0,643.'])}
</div>
`;

/* ---- Méthode 1 : repérer (cahier : rejouable) ---- */
const CO4_ID_NOTES = [
  'Voici un triangle ABC rectangle en B : on repère d\'abord l\'angle droit.',
  'L\'hypoténuse est le côté opposé à l\'angle droit : c\'est [AC], le plus grand côté.',
  'On s\'intéresse à l\'angle aigu BAC, de sommet A.',
  'Le côté adjacent à BAC relie son sommet A au sommet B de l\'angle droit : c\'est [AB]. ([BC] n\'est pas adjacent à cet angle : il ne passe pas par A.)',
  'On peut écrire le cosinus : cos BAC = côté adjacent ÷ hypoténuse = AB ÷ AC.',
];
const co4IdN = () => 1;
function co4IdDessin(i, prog){
  const t = prog == null ? 1 : Math.max(0, Math.min(1, prog));
  const pts = { A: [50, 200], B: [300, 200], C: [300, 40] };
  let s = co4Tri(pts, 'B', 'A', { brut: true, hyp: 0, adj: 0, arc: 0 });
  const op = k => i > k ? 1 : i === k ? t : 0;
  if(i >= 1) s += `<line x1="50" y1="200" x2="300" y2="40" stroke="${CO4_ORANGE}" stroke-width="5" stroke-linecap="round" opacity="${op(1)}"/><text x="150" y="105" text-anchor="middle" font-size="16" font-weight="700" fill="${CO4_ORANGE}" opacity="${op(1)}" transform="rotate(-32.6 150 105)">hypoténuse</text>`;
  if(i >= 2) s += `<path d="M76,200 A26,26 0 0 0 71.9,186" fill="rgba(142,68,173,.2)" stroke="#8E44AD" stroke-width="2" opacity="${op(2)}"/><path d="M50,200 L76,200 A26,26 0 0 0 71.9,186 Z" fill="rgba(142,68,173,.2)" stroke="none" opacity="${op(2)}"/>`;
  if(i >= 3) s += `<line x1="50" y1="200" x2="${50 + 250 * op(3)}" y2="200" stroke="${CO4_VERT}" stroke-width="5" stroke-linecap="round"/><text x="175" y="228" text-anchor="middle" font-size="16" font-weight="700" fill="${CO4_VERT}" opacity="${op(3)}">côté adjacent à l'angle A</text>`;
  s += `<polyline points="289,200 289,189 300,189" fill="none" stroke="${CO4_ENCRE}" stroke-width="1.6"/>`;
  if(i >= 4) s += `<g opacity="${op(4)}"><text x="410" y="110" text-anchor="middle" font-size="20" font-weight="700" fill="${CO4_ENCRE}">cos Â =</text><text x="410" y="140" text-anchor="middle" font-size="20" font-weight="700" fill="${CO4_VERT}">AB</text><line x1="385" y1="147" x2="435" y2="147" stroke="${CO4_ENCRE}" stroke-width="2"/><text x="410" y="170" text-anchor="middle" font-size="20" font-weight="700" fill="${CO4_ORANGE}">AC</text></g>`;
  return s;
}
function co4Etapes(svgId, listeId, btnId, notes, dessiner, nAnim, viewBox){
  let k = 0, raf = null;
  const svg = () => document.getElementById(svgId);
  const bouton = () => { const b = document.getElementById(btnId); if(b){ b.disabled = k >= notes.length - 1; b.textContent = k >= notes.length - 1 ? 'Terminé ✓' : 'Étape suivante →'; } };
  const liste = () => document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
  const fixe = () => { cancelAnimationFrame(raf); const s = svg(); if(s) s.innerHTML = dessiner(k); liste(); bouton(); };
  const jouer = () => {
    cancelAnimationFrame(raf); liste(); bouton();
    const n = nAnim(k), t0 = performance.now(), duree = 800 * n;
    const f = now => { const p = Math.max(0, Math.min(n, (now - t0) / duree * n)); const s = svg(); if(s) s.innerHTML = dessiner(k, p); if(p < n) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
  };
  const demo = {
    init(){ const l = document.getElementById(listeId); if(l) l.innerHTML = notes.map((t, i) => `<div class="step-item" data-step="${i + 1}"><div class="step-num">${i + 1}</div><div>${t}</div></div>`).join(''); k = 0; fixe(); },
    next(){ if(k < notes.length - 1){ k++; jouer(); } },
    reset(){ k = 0; fixe(); },
    goto(i){ k = Math.max(0, Math.min(notes.length - 1, i)); fixe(); },
    steps: () => notes.map(t => ({ note: t })),
    getIdx: () => k,
    anim: { viewBox, n: nAnim, rendu: (i, p) => dessiner(i, p) },
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto, anim: demo.anim });
  return demo;
}
const co4IdDemo = co4Etapes('co4-idSvg', 'co4-idSteps', 'co4-idNext', CO4_ID_NOTES, co4IdDessin, co4IdN, CO4_VB_ID);

/* ---- Méthode 2 : explorer ---- */
function co4Explorer(){
  const svg = document.getElementById('co4-exSvg'); if(!svg) return;
  const a = Number(document.getElementById('co4-exA').value), h = Number(document.getElementById('co4-exH').value), r = a * Math.PI / 180, k = 20;
  const A = [30, 215], B = [30 + h * Math.cos(r) * k, 215], C = [B[0], 215 - h * Math.sin(r) * k];
  let s = co4Tri({ A, B, C }, 'B', 'A', { brut: true, valAngle: a + '°', cotes: [['A', 'B', co4N(h * Math.cos(r)) + ' cm', CO4_VERT], ['A', 'C', co4N(h, 1) + ' cm', CO4_ORANGE]] });
  const X = 300, c = Math.cos(r);
  s += `<text x="${X}" y="40" font-size="15" fill="${CO4_ENCRE}">côté adjacent ÷ hypoténuse</text><text x="${X}" y="68" font-size="17" font-weight="700"><tspan fill="${CO4_VERT}">${co4N(h * c)}</tspan> ÷ <tspan fill="${CO4_ORANGE}">${co4N(h, 1)}</tspan> ≈ ${co4N(c, 3)}</text>`;
  s += `<text x="${X}" y="104" font-size="18" font-weight="700" fill="#8E44AD">cos ${a}° ≈ ${co4N(c, 3)}</text>`;
  // Réglette de 0 à 1.
  s += `<line x1="${X}" y1="140" x2="${X + 200}" y2="140" stroke="${CO4_ENCRE}" stroke-width="2"/>` + [0, .5, 1].map(v => `<line x1="${X + 200 * v}" y1="134" x2="${X + 200 * v}" y2="146" stroke="${CO4_ENCRE}"/><text x="${X + 200 * v}" y="162" text-anchor="middle" font-size="12" fill="#4E5665">${co4N(v)}</text>`).join('') + `<circle cx="${X + 200 * c}" cy="140" r="7" fill="#8E44AD"/>`;
  s += `<text x="${X}" y="194" font-size="13" fill="#4E5665">Plus l'angle est grand,</text><text x="${X}" y="212" font-size="13" fill="#4E5665">plus son cosinus est petit.</text>`;
  svg.innerHTML = s;
}

/* ---- Méthode 3 : calculer ---- */
const CO4_CHAMPS = { adj: [['co4-v1', 'AC (cm)', '8'], ['co4-v2', 'angle BAC (°)', '35']], hyp: [['co4-v1', 'AB (cm)', '4,5'], ['co4-v2', 'angle BAC (°)', '40']], ang: [['co4-v1', 'AB (cm)', '7'], ['co4-v2', 'AC (cm)', '10']] };
let co4Choix = null;
function co4Calcul(){
  const ch = document.getElementById('co4-cCh').value, zone = document.getElementById('co4-cIn');
  if(co4Choix !== ch){ zone.innerHTML = CO4_CHAMPS[ch].map(([id, lab, v]) => `<label style="margin:0 4px;">${lab} = <input id="${id}" type="text" inputmode="decimal" value="${v}" style="width:64px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" oninput="co4Calcul()"></label>`).join(''); co4Choix = ch; }
  const lire = id => { const t = String(document.getElementById(id).value).trim().replace(',', '.'); return t === '' ? NaN : Number(t); };
  const v1 = lire('co4-v1'), v2 = lire('co4-v2'), out = document.getElementById('co4-cRes'), fig = document.getElementById('co4-cFig');
  const err = t => { fig.innerHTML = ''; out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">${t}</p>`; };
  if(!(v1 > 0) || !(v2 > 0) || v1 > 1000 || v2 > 1000) return err('Écrivez deux valeurs strictement positives.');
  const T = t => co4N(t, 4).replace(',', '{,}'), ang = co4Ang('BAC');
  // « = » si le résultat tombe juste au dixième (ex. 12 × cos 60° = 6), sinon « ≈ ».
  const eg = v => Math.abs(v * 10 - Math.round(v * 10)) < 1e-9 ? '=' : '≈';
  let AB, AC, a, lignes = [['Le triangle ABC est rectangle en B.', 'On cite l\'hypothèse : [AC] est l\'hypoténuse, [AB] le côté adjacent à l\'angle BAC.']];
  if(ch === 'adj'){
    if(v2 >= 90) return err('Un angle aigu mesure moins de 90°.');
    AC = v1; a = v2; AB = AC * Math.cos(a * Math.PI / 180);
    lignes.push([co4Tex(`\\cos ${ang} = \\dfrac{AB}{AC}`), 'On écrit le cosinus de l\'angle connu.'], [co4Tex(`\\cos ${T(a)}° = \\dfrac{AB}{${T(AC)}}`), 'On remplace par les valeurs connues.'], [co4Tex(`AB = ${T(AC)} \\times \\cos ${T(a)}°`), 'Produit en croix.'], [`AB ${eg(AB)} <b>${co4N(AB, 1)} cm</b>`, `Calculatrice en degrés : ${co4N(AC, 4)} × cos(${co4N(a, 4)}) ≈ ${co4N(AB, 3)}.`]);
  } else if(ch === 'hyp'){
    if(v2 >= 90) return err('Un angle aigu mesure moins de 90°.');
    AB = v1; a = v2; AC = AB / Math.cos(a * Math.PI / 180);
    lignes.push([co4Tex(`\\cos ${ang} = \\dfrac{AB}{AC}`), 'On écrit le cosinus de l\'angle connu.'], [co4Tex(`\\cos ${T(a)}° = \\dfrac{${T(AB)}}{AC}`), ''], [co4Tex(`AC = \\dfrac{${T(AB)}}{\\cos ${T(a)}°}`), 'Produit en croix : AC × cos = AB.'], [`AC ${eg(AC)} <b>${co4N(AC, 1)} cm</b>`, `Calculatrice en degrés : ${co4N(AB, 4)} ÷ cos(${co4N(a, 4)}) ≈ ${co4N(AC, 3)}.`]);
  } else {
    AB = v1; AC = v2;
    if(AB >= AC) return err('L\'hypoténuse AC doit être plus longue que le côté AB.');
    a = Math.acos(AB / AC) * 180 / Math.PI;
    lignes.push([co4Tex(`\\cos ${ang} = \\dfrac{AB}{AC} = \\dfrac{${T(AB)}}{${T(AC)}}`), 'On écrit le cosinus de l\'angle cherché et on remplace.'], [co4Tex(`${ang} \\approx ${Math.round(a)}°`), `Calculatrice : Arccos(${co4N(AB, 4)} ÷ ${co4N(AC, 4)}) ≈ ${co4N(a, 2)} ; on arrondit au degré.`]);
  }
  // Figure à l'échelle.
  const r = a * Math.PI / 180, k = Math.min(200 / (AC * Math.cos(r)), 110 / (AC * Math.sin(r)));
  const P = { A: [30, 135], B: [30 + AB * k, 135], C: [30 + AB * k, 135 - AC * Math.sin(r) * k] };
  fig.innerHTML = co4Tri(P, 'B', 'A', { vb: '0 0 300 172', max: 320, valAngle: ch === 'ang' ? '?' : co4N(a, 2) + '°', cotes: [['A', 'B', ch === 'adj' ? '?' : co4N(AB, 2) + ' cm', CO4_VERT], ['A', 'C', ch === 'hyp' ? '?' : co4N(AC, 2) + ' cm', CO4_ORANGE]] });
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 4 : l'échelle ---- */
const CO4_PB_STEPS = [
  { expr: 'On note E le haut de l\'échelle, P son pied et M le pied du mur : EP = 4 m et PM = 1,2 m.', note: 'Le mur est vertical et le sol horizontal : le triangle EMP est rectangle en M. Son hypoténuse est l\'échelle [EP].' },
  { expr: co4Tex('\\cos ' + co4Ang('EPM') + ' = \\dfrac{PM}{EP}'), note: 'On cherche l\'angle que fait l\'échelle avec le sol, de sommet P : [PM] est le côté adjacent, [EP] l\'hypoténuse.' },
  { expr: co4Tex('\\cos ' + co4Ang('EPM') + ' = \\dfrac{1{,}2}{4} = 0{,}3'), note: 'On remplace par les longueurs.' },
  { expr: co4Tex(co4Ang('EPM') + ' \\approx 73°'), note: 'Arccos(0,3) ≈ 72,54 : l\'échelle fait un angle d\'environ 73° avec le sol.' },
  { expr: co4Tex(co4Ang('PEM') + ' \\approx 90° - 73° = 17°'), note: 'Les deux angles aigus sont complémentaires : l\'angle entre l\'échelle et le mur mesure environ 17°.' },
  { expr: co4Tex('EM^2 = EP^2 - PM^2 = 16 - 1{,}44 = 14{,}56') + ' donc EM ≈ 3,8 m', note: 'Bonus avec le théorème de Pythagore : l\'échelle touche le mur à environ 3,8 m de hauteur.' },
];
const co4PbDemo = makeStepDemo(CO4_PB_STEPS, 'co4-pbDisplay');

DEMO_REGISTRY['4e|Cosinus'] = {
  cours: 'cours-demo-cosinus-4e', methode: 'methode-demo-cosinus-4e', exos: 'exos-demo-cosinus-4e', histoire: 'histoire-demo-cosinus-4e',
  init: () => {
    co4IdDemo.init(); co4Explorer(); co4Choix = null; co4Calcul(); co4PbDemo.reset();
    ['cours-demo-cosinus-4e', 'exos-demo-cosinus-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-cosinus-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-cosinus-4e'));
  }
};

DEMO_QUIZZES['4e|Cosinus'] = [
  { q: 'ABC est rectangle en A. Le côté adjacent à l\'angle ABC est...', opts: ['[AB]', '[BC]', '[AC]'], correct: 0 },
  { q: 'Dans un triangle rectangle, le cosinus d\'un angle aigu est égal à...', opts: ['côté opposé ÷ hypoténuse', 'côté adjacent ÷ hypoténuse', 'côté adjacent ÷ côté opposé'], correct: 1 },
  { q: 'Un angle aigu d\'un triangle rectangle mesure 40°. L\'autre angle aigu mesure...', opts: ['40°', '50°', '140°'], correct: 1 },
  { q: 'Le cosinus d\'un angle aigu peut valoir...', opts: ['1,3', '0,8', '−2'], correct: 1 },
  { q: 'Hypoténuse 10 cm, angle 60° : le côté adjacent à cet angle mesure...', opts: ['5 cm', '8,66 cm', '20 cm'], correct: 0 },
  { q: 'Côté adjacent 4 cm, hypoténuse 8 cm : l\'angle mesure...', opts: ['30°', '60°', '45°'], correct: 1 },
  { q: 'Quand un angle aigu augmente, son cosinus...', opts: ['augmente', 'diminue', 'ne change pas'], correct: 1 },
];

/* ============================================================
   CHAPITRE : Trigonométrie (3e, G4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 67-68) : plan du manuel (définitions du cosinus, du sinus et de la
   tangente d'un angle aigu, SOH CAH TOA ; applications : calculer une longueur -- deux méthodes,
   Pythagore ou trigonométrie --, calculer un angle ; relations cos² + sin² = 1 et tan = sin / cos),
   titres reformulés, exemples nouveaux. Couleurs du manuel : hypoténuse bleu-vert, côté opposé rose,
   côté adjacent vert. Le chapitre de 4e (chapitres/4e/G3-cosinus.js) ne traite que le cosinus.
   Méthode animée : un triangle rectangle réglable (les rapports ne dépendent que de l'angle, et les
   côtés « opposé » et « adjacent » s'échangent quand on change d'angle), un choix guidé de la bonne
   formule, calculer un angle, la hauteur d'un arbre inaccessible.
   Réutilise g4… (chapitres/4e/G1-triangles-paralleles.js), r4Ex / r4Colonne / R4_REM (chargés avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const TR3_HYP = '#0E8A8A', TR3_OPP = '#C2185B', TR3_ADJ = '#1E7B34', TR3_ENCRE = '#1C1B2E', TR3_BLEU = '#0C5BA0', TR3_ORANGE = '#E07B00';
const tr3Tex = s => `<span class="tex"${s.length < 34 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const tr3C = (c, s) => `\\textcolor{${c}}{${s}}`;
const tr3N = (v, d) => String(Math.round(v * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).replace('.', ',');
const tr3Rad = d => d * Math.PI / 180, tr3Deg = r => r * 180 / Math.PI;
// Triangle rectangle : V = sommet de l'angle étudié, R = sommet de l'angle droit, W = troisième sommet.
// o.lab : { hyp, opp, adj } textes écrits le long des côtés (colorés) ; o.angle : texte près de V.
function tr3Fig(V, R, W, noms, o){
  o = o || {};
  const G = g4Centre([V, R, W]);
  const u = (P, Q, L) => { const d = Math.hypot(Q[0] - P[0], Q[1] - P[1]); return [P[0] + (Q[0] - P[0]) / d * L, P[1] + (Q[1] - P[1]) / d * L]; };
  const a = u(R, V, 11), b = u(R, W, 11), c = [a[0] + b[0] - R[0], a[1] + b[1] - R[1]];
  let h = `<polygon points="${[V, R, W].map(p => p.map(x => x.toFixed(1)).join(',')).join(' ')}" fill="${o.fond || 'rgba(224,123,0,.08)'}"/>`
    + g4Seg(V, W, o.couleurs === false ? TR3_ENCRE : TR3_HYP, 2.4) + g4Seg(R, W, o.couleurs === false ? TR3_ENCRE : TR3_OPP, 2.4) + g4Seg(V, R, o.couleurs === false ? TR3_ENCRE : TR3_ADJ, 2.4)
    + `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} L${c[0].toFixed(1)},${c[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="none" stroke="${TR3_ENCRE}" stroke-width="1.3"/>`
    + g4Arc(V, R, W, TR3_ORANGE, 24)
    + g4Nom(V, G, noms[0]) + g4Nom(R, G, noms[1]) + g4Nom(W, G, noms[2]);
  const lab = o.lab || {};
  if(lab.hyp) h += g4Longueur(V, W, R, lab.hyp, TR3_HYP);
  if(lab.opp) h += g4Longueur(R, W, V, lab.opp, TR3_OPP);
  if(lab.adj) h += g4Longueur(V, R, W, lab.adj, TR3_ADJ);
  if(o.angle){ const m = u(V, g4Lerp(R, W, 0.5), 44); h += `<text x="${m[0].toFixed(1)}" y="${(m[1] + 5).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="700" fill="${TR3_ORANGE}">${o.angle}</text>`; }
  return g4Svg(h, [V, R, W], o.maxW || 340);
}

document.getElementById('cours-demo-trigonometrie-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Cosinus, sinus et tangente d'un angle aigu</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Définitions</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Dans un <b>triangle rectangle</b> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.9;">
    <li>le <b>sinus d'un angle aigu</b> est le quotient de la longueur du <span style="color:${TR3_OPP};font-weight:700;">côté opposé</span> à cet angle par la longueur de l'<span style="color:${TR3_HYP};font-weight:700;">hypoténuse</span> ;</li>
    <li>le <b>cosinus d'un angle aigu</b> est le quotient de la longueur du <span style="color:${TR3_ADJ};font-weight:700;">côté adjacent</span> à cet angle par la longueur de l'<span style="color:${TR3_HYP};font-weight:700;">hypoténuse</span> ;</li>
    <li>la <b>tangente d'un angle aigu</b> est le quotient de la longueur du <span style="color:${TR3_OPP};font-weight:700;">côté opposé</span> à cet angle par la longueur du <span style="color:${TR3_ADJ};font-weight:700;">côté adjacent</span> à cet angle.</li></ul></div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;"><p class="example-title">Exemple : le triangle RIZ est rectangle en I.</p>
  <ul class="example-list">
    <li>${tr3Tex('\\sin \\widehat{IRZ} = \\dfrac{\\text{côté ' + tr3C(TR3_OPP, '\\textbf{O}') + 'pposé à } \\widehat{IRZ}}{' + tr3C(TR3_HYP, '\\textbf{H}') + '\\text{ypoténuse}} = \\dfrac{' + tr3C(TR3_OPP, 'IZ') + '}{' + tr3C(TR3_HYP, 'RZ') + '}')}</li>
    <li>${tr3Tex('\\cos \\widehat{IRZ} = \\dfrac{\\text{côté ' + tr3C(TR3_ADJ, '\\textbf{A}') + 'djacent à } \\widehat{IRZ}}{' + tr3C(TR3_HYP, '\\textbf{H}') + '\\text{ypoténuse}} = \\dfrac{' + tr3C(TR3_ADJ, 'RI') + '}{' + tr3C(TR3_HYP, 'RZ') + '}')}</li>
    <li>${tr3Tex('\\tan \\widehat{IRZ} = \\dfrac{\\text{côté ' + tr3C(TR3_OPP, '\\textbf{O}') + 'pposé à } \\widehat{IRZ}}{\\text{côté ' + tr3C(TR3_ADJ, '\\textbf{A}') + 'djacent à } \\widehat{IRZ}} = \\dfrac{' + tr3C(TR3_OPP, 'IZ') + '}{' + tr3C(TR3_ADJ, 'RI') + '}')}</li>
  </ul></div>
  <div style="flex:1 1 260px;max-width:340px;">${tr3Fig([30, 170], [270, 170], [270, 40], ['R', 'I', 'Z'], { lab: { hyp: 'hypoténuse', opp: 'opposé', adj: 'adjacent' } })}</div>
</div>
<p class="example-title">Remarques :</p>
<ul class="example-list">
  <li>Pour retenir les formules, on peut utiliser le moyen mnémotechnique <b>SOH – CAH – TOA</b> (Sinus = Opposé / Hypoténuse ; Cosinus = Adjacent / Hypoténuse ; Tangente = Opposé / Adjacent).</li>
  <li>Le cosinus et le sinus d'un angle aigu sont toujours <b>compris entre 0 et 1</b> (l'hypoténuse est le plus long côté).</li>
  <li>La tangente d'un angle aigu est un nombre <b>strictement positif</b> (elle peut être plus grande que 1).</li>
  <li>« Opposé » et « adjacent » dépendent de l'angle choisi : pour l'angle ${tr3Tex('\\widehat{IZR}')}, le côté opposé est [RI] et le côté adjacent est [IZ].</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Calculer une longueur ou un angle</h4></div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <p class="example-title" style="flex:1 1 300px;">Exemple 1 : le triangle ABC est rectangle en B, AC = 7 cm et ${tr3Tex('\\widehat{BAC} = 35°')}. On veut calculer la longueur BC, puis la longueur AB (arrondies au dixième).</p>
  <div style="flex:1 1 220px;max-width:300px;">${tr3Fig([30, 150], [250, 150], [250, 20], ['A', 'B', 'C'], { lab: { hyp: '7 cm' }, angle: '35°', maxW: 300 })}</div>
</div>
${r4Ex('', [
  ['Dans le triangle ABC rectangle en B, <span style="color:' + TR3_HYP + ';">[AC] est l\'hypoténuse</span> ; <span style="color:' + TR3_OPP + ';">[BC] est le côté opposé à l\'angle ' + tr3Tex('\\widehat{BAC}') + '</span>.', 'On cite les données : on connaît l\'hypoténuse, on cherche le côté opposé. On utilise le <b>sinus</b>.'],
  [tr3Tex('\\sin \\widehat{BAC} = \\dfrac{' + tr3C(TR3_OPP, 'BC') + '}{' + tr3C(TR3_HYP, 'AC') + '}') + ', soit ' + tr3Tex('\\sin 35° = \\dfrac{BC}{7}'), 'La longueur cherchée apparaît dans le rapport.'],
  [tr3Tex('BC = 7 \\times \\sin 35° \\approx 4{,}0') + ' cm', 'Produit en croix ; à la calculatrice (en mode degrés) : 7 × sin(35).'],
])}
<p style="margin:6px 0;">Pour calculer AB, deux méthodes sont possibles :</p>
<div style="display:flex;flex-wrap:wrap;gap:10px 20px;">
  <div style="flex:1 1 280px;">${r4Ex('Méthode 1 : le théorème de Pythagore', [
    [tr3Tex('AC^2 = AB^2 + BC^2'), 'Dans le triangle ABC rectangle en B.'],
    [tr3Tex('AB^2 = 7^2 - BC^2'), 'On utilise la valeur exacte de BC (7 sin 35°), gardée en mémoire dans la calculatrice.'],
    [tr3Tex('AB \\approx 5{,}7') + ' cm', ''],
  ])}</div>
  <div style="flex:1 1 280px;">${r4Ex('Méthode 2 : le cosinus', [
    [tr3Tex('\\cos \\widehat{BAC} = \\dfrac{' + tr3C(TR3_ADJ, 'AB') + '}{' + tr3C(TR3_HYP, 'AC') + '}'), '[AB] est le côté adjacent à l\'angle de 35°.'],
    [tr3Tex('AB = 7 \\times \\cos 35° \\approx 5{,}7') + ' cm', 'AB est inférieure à AC : le résultat est cohérent.'],
  ])}</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <p class="example-title" style="flex:1 1 300px;">Exemple 2 : le triangle DEF est rectangle en E, DE = 4 cm et EF = 6,5 cm. On veut la mesure de l'angle ${tr3Tex('\\widehat{EDF}')}, arrondie au degré.</p>
  <div style="flex:1 1 220px;max-width:300px;">${tr3Fig([30, 150], [150, 150], [150, 10], ['D', 'E', 'F'], { lab: { adj: '4 cm', opp: '6,5 cm' }, angle: '?', maxW: 240 })}</div>
</div>
${r4Ex('', [
  ['Dans le triangle DEF rectangle en E, <span style="color:' + TR3_OPP + ';">[EF] est le côté opposé à ' + tr3Tex('\\widehat{EDF}') + '</span> ; <span style="color:' + TR3_ADJ + ';">[DE] est le côté adjacent</span>.', 'On connaît l\'opposé et l\'adjacent : on utilise la <b>tangente</b>.'],
  [tr3Tex('\\tan \\widehat{EDF} = \\dfrac{' + tr3C(TR3_OPP, 'EF') + '}{' + tr3C(TR3_ADJ, 'DE') + '} = \\dfrac{6{,}5}{4} = 1{,}625'), 'On écrit la tangente de l\'angle cherché.'],
  [tr3Tex('\\widehat{EDF} \\approx 58°'), 'À la calculatrice : touche « arctan » (ou tan⁻¹) de 1,625, puis on arrondit à l\'unité.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Les relations trigonométriques</h3></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tout angle aigu ${tr3Tex('\\widehat{A}')} :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.6;">${tr3Tex('(\\cos \\widehat{A})^2 + (\\sin \\widehat{A})^2 = 1')} &nbsp;&nbsp; et &nbsp;&nbsp; ${tr3Tex('\\tan \\widehat{A} = \\dfrac{\\sin \\widehat{A}}{\\cos \\widehat{A}}')}</div></div>
<p class="example-title">Pourquoi ? Dans un triangle rectangle d'hypoténuse <i>h</i>, de côté opposé <i>o</i> et de côté adjacent <i>a</i> : ${tr3Tex('\\cos^2 + \\sin^2 = \\dfrac{a^2 + o^2}{h^2} = \\dfrac{h^2}{h^2} = 1')} (Pythagore), et ${tr3Tex('\\dfrac{\\sin}{\\cos} = \\dfrac{o / h}{a / h} = \\dfrac{o}{a} = \\tan')}.</p>
${r4Ex('Exemple : on sait que ' + tr3Tex('\\cos \\widehat{A} = 0{,}28') + '. On en déduit ' + tr3Tex('\\sin \\widehat{A}') + ' puis ' + tr3Tex('\\tan \\widehat{A}') + '.', [
  [tr3Tex('(\\sin \\widehat{A})^2 = 1 - 0{,}28^2 = 1 - 0{,}0784 = 0{,}9216'), 'On utilise cos² + sin² = 1.'],
  [tr3Tex('\\sin \\widehat{A} = \\sqrt{0{,}9216} = 0{,}96'), 'Le sinus d\'un angle aigu est positif.'],
  [tr3Tex('\\tan \\widehat{A} = \\dfrac{0{,}96}{0{,}28} = \\dfrac{24}{7} \\approx 3{,}43'), 'On utilise tan = sin / cos.'],
])}
`;

document.getElementById('histoire-demo-trigonometrie-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La trigonométrie (du grec <i>trigônon</i>, triangle, et <i>metron</i>, mesure) est née de l'<b>astronomie</b>. Au 2e siècle avant J.-C., le Grec <b>Hipparque</b> dresse une table de « cordes » pour calculer la position des astres. Les mathématiciens indiens remplacent ensuite la corde par la demi-corde, notre sinus, qu'ils appellent <i>jya</i>. Traduit en arabe par <i>jiba</i>, écrit sans voyelles, le mot a été lu <i>jaib</i>, qui signifie « poche » ou « pli »… et traduit en latin au 12e siècle par <b><i>sinus</i></b>, qui veut dire la même chose ! Les savants du monde arabe, comme <b>al-Battani</b> (vers 900), perfectionnent ces calculs et introduisent l'équivalent de la tangente pour étudier les ombres des cadrans solaires.
</div>
`;

document.getElementById('methode-demo-trigonometrie-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : les rapports ne dépendent que de l'angle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites varier l'angle et la taille du triangle rectangle : les rapports changent avec l'angle, mais pas avec la taille. Changez aussi l'angle étudié : côté opposé et côté adjacent s'échangent.</p>
  <svg id="tr3-dynSvg" viewBox="0 0 460 300" style="width:100%;max-width:470px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:470px;margin:0 auto;">
    <label for="tr3-ang" style="font-weight:700;">Angle</label><input id="tr3-ang" type="range" min="10" max="80" value="35" oninput="tr3DynMaj()"><span id="tr3-angV" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
    <label for="tr3-hyp" style="font-weight:700;">Hypoténuse</label><input id="tr3-hyp" type="range" min="4" max="10" step="0.5" value="8" oninput="tr3DynMaj()"><span id="tr3-hypV" style="font-family:'JetBrains Mono',monospace;"></span>
  </div>
  <div class="figure-toolbar" style="margin-top:6px;"><button class="btn" id="tr3-vA" onclick="tr3DynVoir('A')">Angle en A</button><button class="btn secondary" id="tr3-vC" onclick="tr3DynVoir('C')">Angle en C</button></div>
  <div id="tr3-dynInfo" style="text-align:center;margin:10px 0 4px;line-height:2.3;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : choisir la bonne formule</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Dans un triangle rectangle, on connaît un angle aigu (ou on le cherche) et on travaille avec deux côtés. Indiquez lesquels : la bonne formule s'affiche.</p>
  <div style="display:flex;gap:10px 18px;flex-wrap:wrap;justify-content:center;margin:8px 0;">
    ${['hyp', 'opp', 'adj'].map(c => `<label class="qz-check" style="font-weight:700;color:${{ hyp: TR3_HYP, opp: TR3_OPP, adj: TR3_ADJ }[c]};"><input type="checkbox" id="tr3-ch${c}" ${c !== 'adj' ? 'checked' : ''} onchange="tr3ChoixMaj()"> ${{ hyp: 'Hypoténuse', opp: 'Côté opposé', adj: 'Côté adjacent' }[c]}</label>`).join('')}
  </div>
  <div id="tr3-choix" style="text-align:center;line-height:2.2;min-height:4em;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer la mesure d'un angle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Le triangle KLM est rectangle en L, avec KL = 6 cm et KM = 10 cm. Calculer la mesure de l'angle ${tr3Tex('\\widehat{LKM}')}, arrondie au degré. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="tr3-angleDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="tr3AngleDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="tr3AngleDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : la hauteur d'un arbre inaccessible</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  ${tr3FigArbre()}
  <p class="interaction-hint" style="margin:6px 0;">Léa se place à 30 m du pied d'un arbre. Avec un rapporteur de visée tenu à 1,60 m du sol, elle voit le sommet de l'arbre sous un angle de 40° avec l'horizontale. Quelle est la hauteur de l'arbre ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="tr3-arbreDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="tr3ArbreDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="tr3ArbreDemo.reset()">Recommencer</button>
  </div>
</div>
`;
function tr3FigArbre(){
  const O = [60, 200], P = [270, 200], S = [270, 200 - 210 * Math.tan(tr3Rad(40))];
  return `<svg viewBox="0 0 360 260" style="width:100%;max-width:380px;display:block;margin:8px auto;">
    <line x1="10" y1="240" x2="350" y2="240" stroke="#8B6B3A" stroke-width="2"/>
    <circle cx="${S[0]}" cy="${S[1] + 16}" r="30" fill="#58A55C" opacity=".8"/><rect x="${S[0] - 5}" y="${S[1]}" width="10" height="${240 - S[1]}" fill="#8B5A2B"/>
    <line x1="${O[0]}" y1="${O[1]}" x2="${O[0]}" y2="240" stroke="#6B7280" stroke-width="3"/><circle cx="${O[0]}" cy="${O[1] - 8}" r="7" fill="#F5B041"/>
    <line x1="${O[0]}" y1="${O[1]}" x2="${P[0]}" y2="${P[1]}" stroke="${TR3_ADJ}" stroke-width="2" stroke-dasharray="6 4"/>
    <line x1="${O[0]}" y1="${O[1]}" x2="${S[0]}" y2="${S[1]}" stroke="${TR3_HYP}" stroke-width="2"/>
    <line x1="${P[0]}" y1="${P[1]}" x2="${S[0]}" y2="${S[1]}" stroke="${TR3_OPP}" stroke-width="2.4"/>
    ${g4Arc(O, P, S, TR3_ORANGE, 30)}<text x="${O[0] + 42}" y="${O[1] - 8}" font-size="13" font-weight="700" fill="${TR3_ORANGE}">40°</text>
    <text x="${(O[0] + P[0]) / 2}" y="${O[1] + 16}" text-anchor="middle" font-size="12" fill="${TR3_ADJ}">30 m</text>
    <text x="${O[0] - 8}" y="224" text-anchor="end" font-size="12">1,60 m</text>
    <text x="${P[0] + 12}" y="${(P[1] + S[1]) / 2}" font-size="12" fill="${TR3_OPP}">h ?</text></svg>`;
}

// Exercice avec correction repliable (même présentation que les autres chapitres).
function tr3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="tr3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="tr3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-trigonometrie-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une longueur avec la trigonométrie »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Dans le triangle ABC rectangle en B, [AC] est l'hypoténuse et [BC] le côté opposé à l'angle ${tr3Tex('\\widehat{BAC}')}.</span><span class="we-comment">1. On cite le triangle rectangle et on nomme les côtés utiles.</span></div>
    <div class="we-row"><span class="we-expr">${tr3Tex('\\sin \\widehat{BAC} = \\dfrac{BC}{AC}')}</span><span class="we-comment">2. On choisit la formule (SOH CAH TOA).</span></div>
    <div class="we-row"><span class="we-expr">${tr3Tex('\\sin 35° = \\dfrac{BC}{7}')}</span><span class="we-comment">3. On remplace par les valeurs connues.</span></div>
    <div class="we-row"><span class="we-expr">${tr3Tex('BC = 7 \\times \\sin 35° \\approx 4{,}0')} cm</span><span class="we-comment">4. Produit en croix, calculatrice en degrés, arrondi demandé.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${tr3Exo(1, 'Le triangle PQR est rectangle en Q. Écris le sinus, le cosinus et la tangente de l\'angle ' + tr3Tex('\\widehat{QPR}') + ', puis ceux de l\'angle ' + tr3Tex('\\widehat{QRP}') + '.', [
    tr3Tex('\\sin \\widehat{QPR} = \\dfrac{QR}{PR}') + ' ; ' + tr3Tex('\\cos \\widehat{QPR} = \\dfrac{PQ}{PR}') + ' ; ' + tr3Tex('\\tan \\widehat{QPR} = \\dfrac{QR}{PQ}'),
    tr3Tex('\\sin \\widehat{QRP} = \\dfrac{PQ}{PR}') + ' ; ' + tr3Tex('\\cos \\widehat{QRP} = \\dfrac{QR}{PR}') + ' ; ' + tr3Tex('\\tan \\widehat{QRP} = \\dfrac{PQ}{QR}')])}
  ${tr3Exo(2, 'Le triangle STU est rectangle en T, SU = 12 cm et ' + tr3Tex('\\widehat{TSU} = 25°') + '. Calcule ST, arrondie au dixième.', [
    '[SU] est l\'hypoténuse, [ST] le côté adjacent à l\'angle ' + tr3Tex('\\widehat{TSU}') + ' : cosinus.', tr3Tex('ST = 12 \\times \\cos 25° \\approx 10{,}9') + ' cm.'])}
  ${tr3Exo(3, 'Le triangle VWX est rectangle en W, VW = 8 cm et ' + tr3Tex('\\widehat{WVX} = 50°') + '. Calcule WX, arrondie au dixième.', [
    '[VW] est le côté adjacent, [WX] le côté opposé à l\'angle de 50° : tangente.', tr3Tex('\\tan 50° = \\dfrac{WX}{8}') + ', donc ' + tr3Tex('WX = 8 \\times \\tan 50° \\approx 9{,}5') + ' cm.'])}
  ${tr3Exo(4, 'Dans un triangle rectangle, le côté opposé à un angle de 30° mesure 5 cm. Calcule la longueur de l\'hypoténuse.', [
    tr3Tex('\\sin 30° = \\dfrac{5}{h}') + ', donc ' + tr3Tex('h = \\dfrac{5}{\\sin 30°} = \\dfrac{5}{0{,}5} = 10') + ' cm.', 'Attention : quand la longueur cherchée est au dénominateur, on divise.'])}
  ${tr3Exo(5, 'Le triangle GHI est rectangle en H, GH = 6 cm et GI = 10 cm. Calcule la mesure de l\'angle ' + tr3Tex('\\widehat{HGI}') + ', arrondie au degré.', [
    tr3Tex('\\cos \\widehat{HGI} = \\dfrac{GH}{GI} = \\dfrac{6}{10} = 0{,}6'), 'À la calculatrice : arccos(0,6) ≈ 53,13, donc ' + tr3Tex('\\widehat{HGI} \\approx 53°') + '.'])}
  ${tr3Exo(6, 'Dans un triangle rectangle, le côté opposé à un angle mesure 3 cm et l\'hypoténuse 7 cm. Quelle est la mesure de cet angle, arrondie au degré ?', [
    tr3Tex('\\sin \\alpha = \\dfrac{3}{7} \\approx 0{,}4286'), 'arcsin(3 ÷ 7) ≈ 25,4 : l\'angle mesure environ 25°.'])}
  ${tr3Exo(7, 'Une échelle de 5 m est appuyée contre un mur vertical. Elle fait un angle de 70° avec le sol horizontal. À quelle hauteur touche-t-elle le mur (au centimètre près) ?', [
    'Le mur, le sol et l\'échelle forment un triangle rectangle ; l\'échelle est l\'hypoténuse, la hauteur est le côté opposé à l\'angle de 70°.', tr3Tex('h = 5 \\times \\sin 70° \\approx 4{,}70') + ' m.'])}
  ${tr3Exo(8, 'On sait que ' + tr3Tex('\\sin \\widehat{B} = 0{,}6') + ' (angle aigu). Calcule ' + tr3Tex('\\cos \\widehat{B}') + ' et ' + tr3Tex('\\tan \\widehat{B}') + '.', [
    tr3Tex('(\\cos \\widehat{B})^2 = 1 - 0{,}36 = 0{,}64') + ', donc ' + tr3Tex('\\cos \\widehat{B} = 0{,}8') + ' (positif).', tr3Tex('\\tan \\widehat{B} = \\dfrac{0{,}6}{0{,}8} = 0{,}75') + '.'])}
  ${tr3Exo(9, 'Une rampe d\'accès mesure 4 m de long et permet de monter une marche de 35 cm. La réglementation impose une pente d\'au plus 5° environ. Cette rampe est-elle conforme ?', [
    'La rampe est l\'hypoténuse (4 m), la hauteur (0,35 m) est le côté opposé à l\'angle avec le sol.', tr3Tex('\\sin \\alpha = \\dfrac{0{,}35}{4} = 0{,}0875') + ', donc α ≈ 5,0°.', 'L\'angle est d\'environ 5° : la rampe est tout juste conforme.'])}
</div>
`;

/* ---- Méthode 1 : triangle dynamique ---- */
let tr3Vue = 'A';
function tr3DynVoir(v){ tr3Vue = v; document.getElementById('tr3-vA').className = 'btn' + (v === 'A' ? '' : ' secondary'); document.getElementById('tr3-vC').className = 'btn' + (v === 'C' ? '' : ' secondary'); tr3DynMaj(); }
function tr3DynMaj(){
  const a = Number(document.getElementById('tr3-ang').value), hyp = Number(document.getElementById('tr3-hyp').value);
  document.getElementById('tr3-angV').textContent = a + '°'; document.getElementById('tr3-hypV').textContent = tr3N(hyp, 1) + ' cm';
  const u = 25, A = [70, 275], ab = hyp * Math.cos(tr3Rad(a)), bc = hyp * Math.sin(tr3Rad(a)), B = [A[0] + ab * u, 270], C = [B[0], 270 - bc * u];
  // Selon l'angle étudié, on colore les côtés : en A, [BC] opposé et [AB] adjacent ; en C, l'inverse.
  const V = tr3Vue === 'A' ? A : C, W = tr3Vue === 'A' ? C : A;
  // tr3Fig renvoie un <svg> ajusté à la figure : on garde son contenu, dans le repère fixe de la page (la taille réelle du triangle reste visible).
  document.getElementById('tr3-dynSvg').innerHTML = tr3Fig(V, B, W, tr3Vue === 'A' ? ['A', 'B', 'C'] : ['C', 'B', 'A'], { lab: { hyp: tr3N(hyp, 1), opp: tr3N(tr3Vue === 'A' ? bc : ab, 2), adj: tr3N(tr3Vue === 'A' ? ab : bc, 2) }, angle: (tr3Vue === 'A' ? a : 90 - a) + '°', maxW: 460 }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const svg = document.getElementById('tr3-dynSvg'); svg.setAttribute('viewBox', `0 0 460 300`);
  const t = tr3Vue === 'A' ? a : 90 - a, op = tr3Vue === 'A' ? bc : ab, ad = tr3Vue === 'A' ? ab : bc, nomA = tr3Vue === 'A' ? '\\widehat{BAC}' : '\\widehat{BCA}';
  const info = document.getElementById('tr3-dynInfo');
  info.innerHTML = tr3Tex(`\\sin ${nomA} = \\dfrac{${tr3C(TR3_OPP, tr3N(op, 2).replace(',', '{,}'))}}{${tr3C(TR3_HYP, tr3N(hyp, 1).replace(',', '{,}'))}} \\approx ${tr3N(Math.sin(tr3Rad(t)), 3).replace(',', '{,}')}`) + ' &nbsp; '
    + tr3Tex(`\\cos ${nomA} = \\dfrac{${tr3C(TR3_ADJ, tr3N(ad, 2).replace(',', '{,}'))}}{${tr3C(TR3_HYP, tr3N(hyp, 1).replace(',', '{,}'))}} \\approx ${tr3N(Math.cos(tr3Rad(t)), 3).replace(',', '{,}')}`) + ' &nbsp; '
    + tr3Tex(`\\tan ${nomA} = \\dfrac{${tr3C(TR3_OPP, tr3N(op, 2).replace(',', '{,}'))}}{${tr3C(TR3_ADJ, tr3N(ad, 2).replace(',', '{,}'))}} \\approx ${tr3N(Math.tan(tr3Rad(t)), 3).replace(',', '{,}')}`)
    + `<br><span class="hint" style="margin:0;">Changez l'hypoténuse : les longueurs changent, mais pas les rapports, qui ne dépendent que de l'angle (${t}°).</span>`;
  renderStaticMath(info);
}

/* ---- Méthode 2 : choisir la formule ---- */
function tr3ChoixMaj(){
  const on = c => document.getElementById('tr3-ch' + c).checked, h = on('hyp'), o = on('opp'), a = on('adj'), out = document.getElementById('tr3-choix');
  const n = [h, o, a].filter(Boolean).length;
  if(n !== 2){ out.innerHTML = '<span class="hint" style="margin:0;">Cochez exactement deux côtés : celui qu\'on connaît et celui qu\'on cherche (ou les deux qu\'on connaît, pour trouver l\'angle).</span>'; return; }
  const f = h && o ? ['SOH', 'sinus', '\\sin \\widehat{A} = \\dfrac{' + tr3C(TR3_OPP, '\\text{opposé}') + '}{' + tr3C(TR3_HYP, '\\text{hypoténuse}') + '}']
    : h && a ? ['CAH', 'cosinus', '\\cos \\widehat{A} = \\dfrac{' + tr3C(TR3_ADJ, '\\text{adjacent}') + '}{' + tr3C(TR3_HYP, '\\text{hypoténuse}') + '}']
    : ['TOA', 'tangente', '\\tan \\widehat{A} = \\dfrac{' + tr3C(TR3_OPP, '\\text{opposé}') + '}{' + tr3C(TR3_ADJ, '\\text{adjacent}') + '}'];
  out.innerHTML = `On utilise le <b>${f[1]}</b> (<b>${f[0]}</b>) :<br>${tr3Tex(f[2])}`;
  renderStaticMath(out);
}

/* ---- Méthode 3 : calculer un angle ---- */
const TR3_ANGLE_STEPS = [
  { expr: 'Dans le triangle KLM rectangle en L, [KM] est l\'hypoténuse et [KL] le côté adjacent à ' + tr3Tex('\\widehat{LKM}') + '.', note: 'On connaît l\'adjacent et l\'hypoténuse : cosinus (CAH).' },
  { expr: tr3Tex('\\cos \\widehat{LKM} = \\dfrac{KL}{KM} = \\dfrac{6}{10} = 0{,}6'), note: 'On calcule le cosinus.' },
  { expr: tr3Tex('\\widehat{LKM} = \\arccos(0{,}6)'), note: 'On cherche l\'angle dont le cosinus vaut 0,6 : touche arccos (ou cos⁻¹, ou Acs) de la calculatrice, en mode degrés.' },
  { expr: tr3Tex('\\widehat{LKM} \\approx 53°'), note: 'La calculatrice affiche 53,130… : on arrondit au degré.' },
];
const tr3AngleDemo = makeStepDemo(TR3_ANGLE_STEPS, 'tr3-angleDisplay');

/* ---- Méthode 4 : arbre ---- */
const TR3_ARBRE_STEPS = [
  { expr: 'Le triangle formé par l\'œil de Léa, le point de l\'arbre à la même hauteur et le sommet est rectangle.', note: 'L\'arbre est vertical, la ligne de visée horizontale : angle droit.' },
  { expr: 'Le côté adjacent à l\'angle de 40° mesure 30 m ; on cherche le côté opposé.', note: 'Opposé et adjacent : tangente (TOA).' },
  { expr: tr3Tex('\\tan 40° = \\dfrac{h}{30}') + ', donc ' + tr3Tex('h = 30 \\times \\tan 40° \\approx 25{,}2') + ' m', note: 'Hauteur au-dessus des yeux de Léa.' },
  { expr: '25,2 + 1,6 = 26,8 m', note: 'On n\'oublie pas la hauteur des yeux de Léa (1,60 m).' },
  { expr: 'L\'arbre mesure environ 26,8 m.', note: 'Conclusion.' },
];
const tr3ArbreDemo = makeStepDemo(TR3_ARBRE_STEPS, 'tr3-arbreDisplay');

DEMO_REGISTRY['3e|Trigonométrie'] = {
  cours: 'cours-demo-trigonometrie-3e', methode: 'methode-demo-trigonometrie-3e', exos: 'exos-demo-trigonometrie-3e', histoire: 'histoire-demo-trigonometrie-3e',
  init: () => {
    tr3DynVoir('A'); tr3ChoixMaj(); tr3AngleDemo.reset(); tr3ArbreDemo.reset();
    ['cours-demo-trigonometrie-3e', 'methode-demo-trigonometrie-3e', 'exos-demo-trigonometrie-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-trigonometrie-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-trigonometrie-3e'));
  }
};

DEMO_QUIZZES['3e|Trigonométrie'] = [
  { q: 'Dans un triangle rectangle, le sinus d\'un angle aigu est égal à...', opts: ['opposé / hypoténuse', 'adjacent / hypoténuse', 'opposé / adjacent'], correct: 0 },
  { q: 'On connaît l\'hypoténuse et on cherche le côté adjacent à un angle connu. On utilise...', opts: ['le sinus', 'le cosinus', 'la tangente'], correct: 1 },
  { q: 'Le cosinus d\'un angle aigu est toujours...', opts: ['compris entre 0 et 1', 'supérieur à 1', 'négatif'], correct: 0 },
  { q: 'Si cos Â = 0,8 (angle aigu), alors sin Â =', opts: ['0,2', '0,6', '0,64'], correct: 1 },
  { q: 'tan Â est égal à...', opts: ['sin Â × cos Â', 'sin Â / cos Â', 'cos Â / sin Â'], correct: 1 },
  { q: 'Pour trouver un angle dont on connaît le cosinus, on utilise la touche...', opts: ['cos', 'arccos (cos⁻¹)', 'tan'], correct: 1 },
  { q: 'Côté opposé 5 cm, angle 30° : l\'hypoténuse mesure...', opts: ['10 cm', '2,5 cm', '5,8 cm'], correct: 0 },
];

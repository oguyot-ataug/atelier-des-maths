/* ============================================================
   CHAPITRE : Fonctions (5e, P2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Fonctions en 5e" (capture du manuel p. 150 : graphique cartésien, tableau de
   valeurs, produire une formule). Titres reformulés, exemples nouveaux ; lecture interactive
   d'un graphique (image et « antécédents »), construction d'un graphique point par point,
   tableau de valeurs calculé à partir d'une formule.
   ============================================================ */

const FN_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const FN_BLEU = '#0C5BA0', FN_ORANGE = '#E07B00', FN_VIOLET = '#9E1F5E', FN_ENCRE = '#1C1B2E';
const fnNum = v => String(Math.round(v * 100) / 100).replace('.', ',');
function fnEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
function fnTab(lignes, surligne){
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.93rem;">${lignes.map(l => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:5px 9px;text-align:center;white-space:nowrap;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}${surligne && surligne === j ? 'background:#F8E5EE;color:' + FN_VIOLET + ';font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

/* ---- Courbe lisse passant par des points (Catmull-Rom → Hermite), et sa valeur en x ---- */
const FN_TEMP = [[0, 4], [2, 3], [4, 2], [6, 2], [8, 5], [10, 9], [12, 13], [14, 15], [16, 14], [18, 11], [20, 8], [22, 6], [24, 5]];
function fnValeur(pts, x){
  const n = pts.length; if(x <= pts[0][0]) return pts[0][1]; if(x >= pts[n - 1][0]) return pts[n - 1][1];
  let i = 0; while(pts[i + 1][0] < x) i++;
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(n - 1, i + 2)], dx = p2[0] - p1[0];
  const m1 = (p2[1] - p0[1]) / (p2[0] - p0[0]), m2 = (p3[1] - p1[1]) / (p3[0] - p1[0]), t = (x - p1[0]) / dx, t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * p1[1] + (t3 - 2 * t2 + t) * dx * m1 + (-2 * t3 + 3 * t2) * p2[1] + (t3 - t2) * dx * m2;
}
// Repère : { x0, x1, pasX, y0, y1, pasY, W, H, g, b, top, titreX, titreY }.
function fnRepere(R){
  const X = x => R.g + (x - R.x0) / (R.x1 - R.x0) * (R.W - R.g - 12), Y = y => R.H - R.b - (y - R.y0) / (R.y1 - R.y0) * (R.H - R.b - R.top);
  let h = '';
  for(let x = R.x0; x <= R.x1 + 1e-9; x += R.pasX) h += `<line x1="${X(x)}" y1="${Y(R.y0)}" x2="${X(x)}" y2="${Y(R.y1)}" stroke="#E4E7EC"/><text x="${X(x)}" y="${Y(R.y0) + 15}" text-anchor="middle" font-family="JetBrains Mono" font-size="10.5" fill="#4E5665">${fnNum(x)}</text>`;
  for(let y = R.y0; y <= R.y1 + 1e-9; y += R.pasY) h += `<line x1="${X(R.x0)}" y1="${Y(y)}" x2="${X(R.x1)}" y2="${Y(y)}" stroke="#E4E7EC"/><text x="${X(R.x0) - 6}" y="${Y(y) + 4}" text-anchor="end" font-family="JetBrains Mono" font-size="10.5" fill="#4E5665">${fnNum(y)}</text>`;
  h += `<line x1="${X(R.x0)}" y1="${Y(R.y0)}" x2="${X(R.x1) + 8}" y2="${Y(R.y0)}" stroke="${FN_ENCRE}" stroke-width="1.4"/><polygon points="${X(R.x1) + 10},${Y(R.y0)} ${X(R.x1) + 3},${Y(R.y0) - 4} ${X(R.x1) + 3},${Y(R.y0) + 4}" fill="${FN_ENCRE}"/>`
    + `<line x1="${X(R.x0)}" y1="${Y(R.y0)}" x2="${X(R.x0)}" y2="${Y(R.y1) - 8}" stroke="${FN_ENCRE}" stroke-width="1.4"/><polygon points="${X(R.x0)},${Y(R.y1) - 10} ${X(R.x0) - 4},${Y(R.y1) - 3} ${X(R.x0) + 4},${Y(R.y1) - 3}" fill="${FN_ENCRE}"/>`
    + `<text x="${X(R.x1)}" y="${Y(R.y0) - 6}" text-anchor="end" font-family="Inter" font-size="11" fill="#4E5665">${R.titreX}</text><text x="${X(R.x0) + 6}" y="${Y(R.y1) - 2}" font-family="Inter" font-size="11" fill="#4E5665">${R.titreY}</text>`;
  return { h, X, Y };
}
const FN_R_TEMP = { x0: 0, x1: 24, pasX: 2, y0: 0, y1: 16, pasY: 2, W: 520, H: 290, g: 40, b: 26, top: 22, titreX: 'Heure (h)', titreY: 'Température (°C)' };
function fnCourbe(pts, R, X, Y, c){
  let d = '';
  for(let k = 0; k <= 240; k++){ const x = R.x0 + (R.x1 - R.x0) * k / 240; d += (k ? ' L' : 'M') + X(x).toFixed(1) + ',' + Y(fnValeur(pts, x)).toFixed(1); }
  return `<path d="${d}" fill="none" stroke="${c || FN_BLEU}" stroke-width="2.4"/>` + pts.map(([x, y]) => `<circle cx="${X(x).toFixed(1)}" cy="${Y(y).toFixed(1)}" r="3" fill="${c || FN_BLEU}"/>`).join('');
}
function fnFigTemperature(){
  const R = FN_R_TEMP, { h, X, Y } = fnRepere(R);
  const lecture = `<line x1="${X(14)}" y1="${Y(0)}" x2="${X(14)}" y2="${Y(15)}" stroke="${FN_VIOLET}" stroke-width="1.3" stroke-dasharray="5 4"/><line x1="${X(0)}" y1="${Y(15)}" x2="${X(14)}" y2="${Y(15)}" stroke="${FN_VIOLET}" stroke-width="1.3" stroke-dasharray="5 4"/><circle cx="${X(14)}" cy="${Y(15)}" r="5" fill="none" stroke="${FN_VIOLET}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 ${R.W} ${R.H}" style="width:100%;max-width:540px;display:block;margin:8px auto 12px;">${h}${fnCourbe(FN_TEMP, R, X, Y)}${lecture}</svg>`;
}

document.getElementById('cours-demo-fonctions-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Représenter une grandeur en fonction d'une autre</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>graphique cartésien</b> est une représentation qui permet de visualiser l'évolution d'une grandeur (lue sur l'axe vertical, les <b>ordonnées</b>) « en fonction » d'une autre grandeur (lue sur l'axe horizontal, les <b>abscisses</b>).</div>
<p class="example-title">Exemple 1 : la température relevée dans un village de montagne, heure par heure, pendant une journée.</p>
${fnFigTemperature()}
<ul class="example-list">
  <li>On lit la température « en fonction » de l'heure : à <b>14 h</b>, il fait <b>15 °C</b> (lecture en pointillés). C'est la température la plus haute de la journée.</li>
  <li>Dans l'autre sens : il fait <b>11 °C</b> à deux moments, vers <b>11 h</b> et à <b>18 h</b>.</li>
  <li>La température baisse jusque vers 5 h (un peu moins de 2 °C, la plus basse de la journée), monte jusqu'à 14 h, puis redescend.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Le tableau de valeurs</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>tableau de valeurs</b> est un tableau qui regroupe des couples de valeurs. Ces couples permettent de décrire numériquement une relation entre deux grandeurs.</div>
<p style="margin:6px 0;"><b>Depuis un graphique.</b> On relève les coordonnées de points du graphique à intervalles réguliers (ici, toutes les 2 heures) :</p>
${fnTab([['Heure (h)', ...FN_TEMP.map(p => p[0])], ['Température (°C)', ...FN_TEMP.map(p => p[1])]], 8)}
<ul class="example-list"><li>Le point de coordonnées <b>(14 ; 15)</b> du graphique correspond à une température de 15 °C à 14 h.</li></ul>
<p style="margin:10px 0 6px;"><b>Depuis une formule.</b></p>
<p style="margin:4px 0;">Exemple 2 : un loueur de vélos fait payer 5 € de forfait, plus 2 € par heure. Le prix <i>P</i> (en €) « en fonction » de la durée <i>h</i> (en heures) est donné par la formule <span class="tex">P = 5 + 2 \\times h</span>.</p>
${fnTab([['Durée h (en heures)', 0, 1, 2, 3, 4, 5, 6], ['Prix P (en €)', 5, 7, 9, 11, 13, 15, 17]], 5)}
${fnEx('', [['Pour <i>h</i> = 4 : <span class="tex">P = 5 + 2 \\times 4 = 13</span>', 'On remplace h par 4 dans la formule : 4 heures coûtent 13 €.']])}

<div class="lesson-header"><span class="num">3</span><h3>Produire une formule</h3></div>
<p style="margin:4px 0;">Exprimer une grandeur « en fonction » d'une autre, c'est écrire une <b>formule</b> qui permet de la calculer pour n'importe quelle valeur de l'autre grandeur.</p>
${fnEx('Exemple 1 : exprime le volume V d\'un pavé droit à base carrée de côté 4 cm en fonction de sa hauteur h (en cm).', [
  ['<span class="tex">V = \\mathcal{A}_{\\text{base}} \\times h = 4 \\times 4 \\times h = 16 \\times h</span>', 'V est en cm³ et h en cm.'],
  ['Pour h = 2,5 cm : <span class="tex">V = 16 \\times 2{,}5 = 40</span> cm³', 'On utilise la formule avec une valeur de h.'],
])}
${fnEx('Exemple 2 : un taxi facture 4 € de prise en charge, plus 1,50 € par kilomètre. Exprime le prix P en fonction de la distance d (en km).', [
  ['<span class="tex">P = 4 + 1{,}5 \\times d</span>', 'Une partie fixe + une partie qui dépend de la distance.'],
  ['Pour d = 12 km : <span class="tex">P = 4 + 1{,}5 \\times 12 = 22</span> €', ''],
])}
<div class="redaction-note" ${FN_REM}>Remarque : une formule, un tableau de valeurs et un graphique sont trois façons de décrire la <b>même relation</b> entre deux grandeurs. La formule permet de tout calculer ; le tableau donne quelques valeurs ; le graphique montre l'évolution d'un coup d'œil.</div>
`;

document.getElementById('histoire-demo-fonctions-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « cartésien » vient de <b>René Descartes</b>, dont le nom latin était <i>Cartesius</i>. Dans <i>La Géométrie</i> (1637), il repère les points par des nombres et relie ainsi la géométrie et le calcul. L'idée de dessiner l'évolution d'une grandeur est pourtant plus ancienne : au 14e siècle, l'évêque français <b>Nicole Oresme</b> représentait déjà la vitesse d'un objet au cours du temps par des segments plus ou moins hauts, comme un graphique. Aujourd'hui, les graphiques sont partout : courbes de température, de population, de fréquentation d'un site internet…
</div>
`;

document.getElementById('methode-demo-fonctions-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : lire un graphique dans les deux sens</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez ce que vous cherchez, puis déplacez le curseur.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:6px 0;">
    <button class="btn" id="fn-modeX" onclick="fnMode('x')">Température à une heure donnée</button>
    <button class="btn secondary" id="fn-modeY" onclick="fnMode('y')">Heures pour une température donnée</button>
  </div>
  <svg id="fn-lectSvg" viewBox="0 0 520 290" style="width:100%;max-width:540px;display:block;margin:6px auto;"></svg>
  <div style="display:flex;gap:10px;align-items:center;justify-content:center;"><label id="fn-curLab" for="fn-cur" style="font-weight:700;">Heure</label><input id="fn-cur" type="range" min="0" max="24" step="0.5" value="10" oninput="fnLire()" style="flex:1;max-width:360px;"></div>
  <div id="fn-lectRes" style="text-align:center;font-size:1.05rem;line-height:1.9;margin-top:6px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire un graphique à partir d'un tableau de valeurs</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Location de vélos : P = 5 + 2 × h. Chaque colonne du tableau donne un point : cliquez sur « Point suivant ».</p>
  <div id="fn-constTab"></div>
  <svg id="fn-constSvg" viewBox="0 0 440 280" style="width:100%;max-width:460px;display:block;margin:6px auto;"></svg>
  <div id="fn-constNote" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div class="figure-toolbar"><button class="btn" id="fn-constNext" onclick="fnConstSuivant()">Point suivant →</button><button class="btn secondary" onclick="fnConstReset()">Recommencer</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer un tableau de valeurs avec une formule</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez une formule et les valeurs de départ (séparées par des espaces) : le tableau se remplit tout seul.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <select id="fn-form" onchange="fnTableau(true)" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font:inherit;max-width:100%;"></select>
    <input id="fn-vals" type="text" style="width:190px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font-family:'JetBrains Mono',monospace;" oninput="fnTableau()">
  </div>
  <div id="fn-tabRes" style="margin-top:8px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : produire une formule</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Une salle de sport propose une carte à 20 € par an, puis 3 € par séance. Exprimer le prix annuel P en fonction du nombre de séances n. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="fn-formuleDisplay"></div>
  <div class="figure-toolbar"><button class="btn" onclick="fnFormuleDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="fnFormuleDemo.reset()">Recommencer</button></div>
</div>
`;

function fnExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="fn-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="fn-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-fonctions-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une valeur avec une formule »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">P = 4 + 1{,}5 \\times d</span></span><span class="we-comment">1. On écrit la formule.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">P = 4 + 1{,}5 \\times 20</span></span><span class="we-comment">2. On remplace d par sa valeur (20 km).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">P = 4 + 30 = 34</span></span><span class="we-comment">3. On calcule (priorité à la multiplication).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Une course de 20 km coûte 34 €.</span><span class="we-comment">4. On conclut par une phrase, avec l'unité.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${fnExo(1, 'D\'après le graphique des températures du cours : a) Quelle température fait-il à 10 h ? b) À quelles heures fait-il 5 °C ?', [
    'a) À 10 h, il fait 9 °C.', 'b) Il fait 5 °C à 8 h et à 24 h.'])}
  ${fnExo(2, 'Avec la formule P = 5 + 2 × h (location de vélos), complète le tableau pour h = 0 ; 3 ; 7 ; 10.', [
    'h = 0 : P = 5 ; h = 3 : P = 11 ; h = 7 : P = 19 ; h = 10 : P = 25'])}
  ${fnExo(3, 'L\'aire A d\'un carré de côté c est A = c × c. Dresse le tableau de valeurs pour c = 1 ; 2 ; 3 ; 4 ; 5.', [
    'c : 1 | 2 | 3 | 4 | 5', 'A : 1 | 4 | 9 | 16 | 25'])}
  ${fnExo(4, 'Exprime le périmètre P d\'un carré en fonction de son côté c. Calcule P pour c = 7,5 cm.', [
    'P = 4 × c', 'Pour c = 7,5 cm : P = 4 × 7,5 = 30 cm'])}
  ${fnExo(5, 'Au cinéma, une place coûte 7,50 €. Exprime le prix P en fonction du nombre n de places, puis calcule le prix de 4 places.', [
    'P = 7,5 × n', 'Pour n = 4 : P = 30 €'])}
  ${fnExo(6, 'Le point de coordonnées (3 ; 11) est-il sur le graphique de la formule P = 5 + 2 × h ? Et le point (4 ; 12) ?', [
    'Pour h = 3 : P = 5 + 6 = 11, donc (3 ; 11) est sur le graphique.', 'Pour h = 4 : P = 13 ≠ 12, donc (4 ; 12) n\'est pas sur le graphique.'])}
  ${fnExo(7, 'Avec le taxi du cours (P = 4 + 1,5 × d), combien coûte une course de 20 km ? Et de 0 km ?', [
    '20 km : P = 4 + 30 = 34 €', '0 km : P = 4 € (seulement la prise en charge)'])}
  ${fnExo(8, 'Sur route sèche, la distance de freinage d (en m) d\'une voiture roulant à la vitesse v (en km/h) est environ d = v × v ÷ 200. Calcule d pour v = 50 km/h et v = 100 km/h. Que remarques-tu ?', [
    'v = 50 : d = 2 500 ÷ 200 = 12,5 m', 'v = 100 : d = 10 000 ÷ 200 = 50 m', 'Quand la vitesse double, la distance de freinage est multipliée par 4 : ce n\'est pas une situation de proportionnalité.'])}
</div>
`;

/* ---- Méthode 1 : lecture interactive ---- */
let fnModeCourant = 'x';
function fnMode(m){
  fnModeCourant = m;
  document.getElementById('fn-modeX').className = 'btn' + (m === 'x' ? '' : ' secondary');
  document.getElementById('fn-modeY').className = 'btn' + (m === 'y' ? '' : ' secondary');
  const c = document.getElementById('fn-cur'), l = document.getElementById('fn-curLab');
  if(m === 'x'){ c.min = 0; c.max = 24; c.step = 0.5; c.value = 10; l.textContent = 'Heure'; } else { c.min = 1; c.max = 16; c.step = 0.5; c.value = 11; l.textContent = 'Température'; }
  fnLire();
}
function fnLire(){
  const R = FN_R_TEMP, { h, X, Y } = fnRepere(R), v = Number(document.getElementById('fn-cur').value), res = document.getElementById('fn-lectRes');
  let s = h + fnCourbe(FN_TEMP, R, X, Y);
  if(fnModeCourant === 'x'){
    const y = fnValeur(FN_TEMP, v);
    s += `<line x1="${X(v)}" y1="${Y(0)}" x2="${X(v)}" y2="${Y(y)}" stroke="${FN_VIOLET}" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="${X(0)}" y1="${Y(y)}" x2="${X(v)}" y2="${Y(y)}" stroke="${FN_VIOLET}" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="${X(v)}" cy="${Y(y)}" r="6" fill="${FN_VIOLET}"/>`;
    res.innerHTML = `À <b>${fnNum(v)} h</b>, il fait environ <b style="color:${FN_VIOLET};">${fnNum(Math.round(y * 2) / 2)} °C</b>. Le point du graphique a pour coordonnées (${fnNum(v)} ; ${fnNum(Math.round(y * 2) / 2)}).`;
  } else {
    // Tous les instants où la courbe atteint la température v (balayage fin de la courbe).
    const sol = []; let prev = fnValeur(FN_TEMP, 0) - v;
    for(let k = 1; k <= 4800; k++){ const x = 24 * k / 4800, d = fnValeur(FN_TEMP, x) - v; if((prev < 0 && d >= 0) || (prev > 0 && d <= 0) || Math.abs(d) < 1e-9){ if(!sol.length || x - sol[sol.length - 1] > 0.6) sol.push(x); } prev = d; }
    s += `<line x1="${X(0)}" y1="${Y(v)}" x2="${X(24)}" y2="${Y(v)}" stroke="${FN_ORANGE}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    sol.forEach(x => { s += `<line x1="${X(x)}" y1="${Y(v)}" x2="${X(x)}" y2="${Y(0)}" stroke="${FN_ORANGE}" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="${X(x)}" cy="${Y(v)}" r="6" fill="${FN_ORANGE}"/>`; });
    const h2 = x => fnNum(Math.round(x * 2) / 2) + ' h';
    res.innerHTML = sol.length ? `Il fait <b>${fnNum(v)} °C</b> ${sol.length > 1 ? 'à ' + sol.length + ' moments' : 'une seule fois'} : vers <b style="color:${FN_ORANGE};">${sol.map(h2).join('</b> et vers <b style="color:' + FN_ORANGE + ';">')}</b>.`
      : `La température n'atteint jamais <b>${fnNum(v)} °C</b> ce jour-là : la droite ne coupe pas la courbe.`;
  }
  document.getElementById('fn-lectSvg').innerHTML = s;
}

/* ---- Méthode 2 : construction point par point ---- */
const FN_VELO = [0, 1, 2, 3, 4, 5, 6].map(h => [h, 5 + 2 * h]);
const FN_R_VELO = { x0: 0, x1: 7, pasX: 1, y0: 0, y1: 20, pasY: 2, W: 440, H: 280, g: 40, b: 26, top: 22, titreX: 'Durée h (heures)', titreY: 'Prix P (€)' };
let fnConstK = 0;
function fnConstDessin(){
  const R = FN_R_VELO, { h, X, Y } = fnRepere(R);
  let s = h;
  FN_VELO.slice(0, fnConstK).forEach(([x, y], i) => {
    if(i === fnConstK - 1) s += `<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(y)}" stroke="${FN_VIOLET}" stroke-dasharray="4 3"/><line x1="${X(0)}" y1="${Y(y)}" x2="${X(x)}" y2="${Y(y)}" stroke="${FN_VIOLET}" stroke-dasharray="4 3"/>`;
    s += `<circle cx="${X(x)}" cy="${Y(y)}" r="5" fill="${i === fnConstK - 1 ? FN_VIOLET : FN_BLEU}"/>`;
  });
  if(fnConstK >= FN_VELO.length) s += `<line x1="${X(0)}" y1="${Y(5)}" x2="${X(6)}" y2="${Y(17)}" stroke="${FN_BLEU}" stroke-width="2"/>`;
  document.getElementById('fn-constSvg').innerHTML = s;
  document.getElementById('fn-constTab').innerHTML = fnTab([['Durée h (heures)', ...FN_VELO.map(p => p[0])], ['Prix P (€)', ...FN_VELO.map(p => p[1])]], fnConstK || null);
  const n = document.getElementById('fn-constNote'), b = document.getElementById('fn-constNext');
  n.textContent = fnConstK === 0 ? 'On trace le repère : la durée en abscisse, le prix en ordonnée.'
    : fnConstK < FN_VELO.length ? `Colonne ${fnConstK} : on place le point (${FN_VELO[fnConstK - 1][0]} ; ${FN_VELO[fnConstK - 1][1]}).`
    : 'Tous les points sont alignés : on peut les relier par une droite (mais elle ne passe pas par l\'origine : ce n\'est pas de la proportionnalité).';
  b.disabled = fnConstK > FN_VELO.length;
}
function fnConstSuivant(){ if(fnConstK <= FN_VELO.length){ fnConstK++; fnConstDessin(); } }
function fnConstReset(){ fnConstK = 0; fnConstDessin(); }

/* ---- Méthode 3 : tableau de valeurs à partir d'une formule ---- */
const FN_FORMULES = [
  { nom: 'Vélo : P = 5 + 2 × h', x: 'h', y: 'P', f: x => 5 + 2 * x, vals: '0 1 2 3 4 5' },
  { nom: 'Carré : A = c × c', x: 'c', y: 'A', f: x => x * x, vals: '1 2 3 4 5 6' },
  { nom: 'Taxi : P = 4 + 1,5 × d', x: 'd', y: 'P', f: x => 4 + 1.5 * x, vals: '2 5 10 12 20' },
  { nom: 'Pavé : V = 16 × h', x: 'h', y: 'V', f: x => 16 * x, vals: '1 2 2,5 3 5' },
  { nom: 'Freinage : d = v × v ÷ 200', x: 'v', y: 'd', f: x => x * x / 200, vals: '30 50 70 90 110 130' },
];
function fnTableau(nouvelle){
  const sel = document.getElementById('fn-form');
  if(!sel.options.length) sel.innerHTML = FN_FORMULES.map((F, i) => `<option value="${i}">${F.nom}</option>`).join('');
  const F = FN_FORMULES[Number(sel.value)], inp = document.getElementById('fn-vals');
  if(nouvelle || !inp.value) inp.value = F.vals;
  const xs = inp.value.trim().split(/\s+/).map(v => Number(v.replace(',', '.'))).filter(v => Number.isFinite(v)).slice(0, 12);
  document.getElementById('fn-tabRes').innerHTML = xs.length ? fnTab([[F.x, ...xs.map(fnNum)], [F.y, ...xs.map(x => fnNum(F.f(x)))]]) : '<p class="hint" style="text-align:center;">Saisissez des nombres séparés par des espaces.</p>';
}

/* ---- Méthode 4 : produire une formule ---- */
const FN_FORMULE_STEPS = [
  { expr: 'Partie fixe : 20 €', note: 'Ce qu\'on paie quel que soit le nombre de séances : la carte annuelle.' },
  { expr: 'Partie variable : 3 × n', note: 'Chaque séance coûte 3 € : pour n séances, 3 × n euros.' },
  { expr: '<span class="tex">P = 20 + 3 \\times n</span>', note: 'On additionne les deux parties : P est exprimé « en fonction » de n.' },
  { expr: 'Pour n = 30 : <span class="tex">P = 20 + 3 \\times 30 = 110</span> €', note: 'On vérifie avec une valeur : 30 séances coûtent 110 € par an.' },
];
const fnFormuleDemo = makeStepDemo(FN_FORMULE_STEPS, 'fn-formuleDisplay');

DEMO_REGISTRY['5e|Fonctions'] = {
  cours: 'cours-demo-fonctions-5e', methode: 'methode-demo-fonctions-5e', exos: 'exos-demo-fonctions-5e', histoire: 'histoire-demo-fonctions-5e',
  init: () => {
    fnMode('x'); fnConstReset(); fnTableau(true); fnFormuleDemo.reset();
    ['cours-demo-fonctions-5e', 'exos-demo-fonctions-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fonctions-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fonctions-5e'));
  }
};

DEMO_QUIZZES['5e|Fonctions'] = [
  { q: 'Sur un graphique cartésien, la grandeur « en fonction » de laquelle on représente l\'autre est lue sur...', opts: ['l\'axe horizontal (abscisses)', 'l\'axe vertical (ordonnées)'], correct: 0 },
  { q: 'Avec P = 5 + 2 × h, que vaut P pour h = 6 ?', opts: ['17', '42', '13'], correct: 0 },
  { q: 'Le point (2 ; 9) correspond à...', opts: ['abscisse 9, ordonnée 2', 'abscisse 2, ordonnée 9'], correct: 1 },
  { q: 'Un tableau de valeurs regroupe...', opts: ['des couples de valeurs', 'des fréquences', 'des angles'], correct: 0 },
  { q: 'Un abonnement coûte 10 € plus 2 € par mois. Le prix P pour m mois est...', opts: ['P = 12 × m', 'P = 10 + 2 × m', 'P = 10 × 2 + m'], correct: 1 },
  { q: 'Avec A = c × c, que vaut A pour c = 7 ?', opts: ['14', '49', '77'], correct: 1 },
  { q: 'Une même relation entre deux grandeurs peut être décrite par...', opts: ['une formule seulement', 'une formule, un tableau ou un graphique'], correct: 1 },
];

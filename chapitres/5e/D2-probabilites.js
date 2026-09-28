/* ============================================================
   CHAPITRE : Probabilités (5e, D2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Proba en 5e" (capture du manuel : expérience aléatoire, issues, évènements certain /
   impossible ; probabilité, équiprobabilité, nombre d'issues favorables / nombre total d'issues).
   Titres reformulés, exemples nouveaux ; roue de loterie et dé simulés dans l'onglet Méthode.
   (La 6e a son propre chapitre Probabilités : chapitres/6e/D2-probabilites.js.)
   ============================================================ */

const PB_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const PB_COUL = ['#0C5BA0', '#E07B00', '#1E7B34', '#8E44AD', '#C0392B', '#16A085', '#D4AC0D', '#5B6BC0'];
const pbNum = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
function pbEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
const pbEv = t => `<span style="background:#FFF3C4;border-radius:4px;padding:0 4px;font-style:italic;">« ${t} »</span>`;

// Roue de loterie à 8 secteurs (1 à 8) ; favorables : liste des numéros mis en évidence ; rot : rotation en degrés.
function pbRoue(favorables, rot){
  const cx = 110, cy = 110, r = 95, n = 8, a = 360 / n;
  // Les secteurs tournent, mais les numéros restent droits (seule leur position tourne) : un 6 ne doit jamais se lire 9.
  let h = '';
  for(let i = 0; i < n; i++){
    const a0 = (-90 - a / 2 + i * a + (rot || 0)) * Math.PI / 180, a1 = a0 + a * Math.PI / 180, am = (a0 + a1) / 2, num = i + 1;
    const pale = favorables && !favorables.includes(num);
    h += `<path d="M${cx},${cy} L${(cx + r * Math.cos(a0)).toFixed(1)},${(cy + r * Math.sin(a0)).toFixed(1)} A${r},${r} 0 0 1 ${(cx + r * Math.cos(a1)).toFixed(1)},${(cy + r * Math.sin(a1)).toFixed(1)} Z" fill="${PB_COUL[i]}" fill-opacity="${pale ? 0.18 : 0.85}" stroke="#fff" stroke-width="2"/>`
      + `<text x="${(cx + r * 0.68 * Math.cos(am)).toFixed(1)}" y="${(cy + r * 0.68 * Math.sin(am) + 7).toFixed(1)}" text-anchor="middle" font-family="Space Grotesk" font-size="20" font-weight="700" fill="${pale ? '#8A93A3' : '#fff'}">${num}</text>`;
  }
  h += `<circle cx="${cx}" cy="${cy}" r="9" fill="#1C1B2E"/><polygon points="${cx - 10},4 ${cx + 10},4 ${cx},24" fill="#1C1B2E"/>`;
  return `<svg viewBox="0 0 220 220" style="width:100%;max-width:230px;display:block;margin:6px auto;">${h}</svg>`;
}
// Échelle des probabilités, de 0 (impossible) à 1 (certain), avec des évènements placés dessus.
function pbEchelle(){
  const X = p => 30 + p * 440, marques = [[0, 'impossible'], [0.5, 'une chance sur deux'], [1, 'certain']];
  const evs = [[0, '« obtenir 7 avec un dé »', -1], [1 / 6, '« obtenir 6 avec un dé »', 1], [0.5, '« pile » avec une pièce', -1], [5 / 6, '« ne pas obtenir 6 »', 1], [1, '« obtenir moins de 7 »', -1]];
  let h = `<defs><linearGradient id="pbGrad" x1="0" x2="1"><stop offset="0" stop-color="#C0392B"/><stop offset=".5" stop-color="#D4AC0D"/><stop offset="1" stop-color="#1E7B34"/></linearGradient></defs>`
    + `<rect x="30" y="72" width="440" height="12" rx="6" fill="url(#pbGrad)"/>`;
  marques.forEach(([p, t]) => { h += `<text x="${X(p)}" y="104" text-anchor="middle" font-family="JetBrains Mono" font-size="13" font-weight="700" fill="#1C1B2E">${pbNum(p)}</text><text x="${X(p)}" y="120" text-anchor="middle" font-family="Inter" font-size="11" fill="#4E5665">${t}</text>`; });
  evs.forEach(([p, t, cote]) => {
    const ty = cote < 0 ? 38 : 166; // au-dessus ou au-dessous de l'échelle, en alternance
    h += `<line x1="${X(p)}" y1="${cote < 0 ? 50 : 124}" x2="${X(p)}" y2="${cote < 0 ? 70 : 144}" stroke="#4E5665" stroke-width="1"/><circle cx="${X(p)}" cy="78" r="5" fill="#fff" stroke="#1C1B2E" stroke-width="2"/>`
      + `<text x="${Math.min(430, Math.max(70, X(p)))}" y="${ty}" text-anchor="middle" font-family="Inter" font-size="11.5" fill="#1C1B2E">${t}</text>`;
  });
  return `<svg viewBox="0 0 500 178" style="width:100%;max-width:540px;display:block;margin:8px auto 14px;">${h}</svg>`;
}

document.getElementById('cours-demo-probabilites-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le hasard : expériences, issues, évènements</h3></div>
<span class="def-badge">Définition 1</span>
<div class="def-box">Une expérience est <b>aléatoire</b> lorsqu'on ne peut pas prévoir à l'avance son résultat. Les différents résultats possibles sont appelés les <b>issues</b> de l'expérience.</div>
<div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:center;">
  <div style="flex:none;width:200px;">${pbRoue(null, 0)}</div>
  <ul class="example-list" style="max-width:420px;margin:0;">
    <li>On fait tourner une <b>roue de loterie</b> partagée en 8 secteurs identiques numérotés de 1 à 8. Les issues sont : {1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 7 ; 8}.</li>
    <li>On tire au hasard une boule dans un sac contenant 10 boules numérotées de 1 à 10. Il y a 10 issues : {1 ; 2 ; … ; 10}.</li>
  </ul>
</div>

<span class="def-badge">Définition 2</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un <b>évènement</b> est une condition qui peut être réalisée ou non par les issues d'une expérience aléatoire ; il correspond à un ensemble d'issues.</li>
  <li>Un évènement qui est sûr de se réaliser est dit <b>certain</b>.</li>
  <li>Un évènement qui n'a aucune chance de se réaliser est dit <b>impossible</b>.</li>
</ul></div>
<p class="example-title">Exemples avec la roue de loterie :</p>
<ul class="example-list">
  <li>${pbEv('Obtenir un nombre pair')} est un <b>évènement</b> : il est réalisé par les issues 2, 4, 6 et 8.</li>
  <li>${pbEv('Obtenir un nombre inférieur à 10')} est un <b>évènement certain</b> : toutes les issues le réalisent.</li>
  <li>${pbEv('Obtenir 0')} est un <b>évènement impossible</b> : aucune issue ne le réalise.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Calculer une probabilité</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>probabilité</b> d'un évènement est un nombre compris <b>entre 0 et 1</b> (c'est-à-dire entre 0 % et 100 %) qui mesure les chances que cet évènement se réalise.</div>
${pbEchelle()}
<div class="redaction-note" ${PB_REM}>Remarque : la probabilité d'un évènement <b>impossible</b> est 0 ; celle d'un évènement <b>certain</b> est 1.</div>

<span class="prop-badge">Règle</span>
<div class="def-box">Lorsque toutes les issues d'une expérience aléatoire ont <b>autant de chances</b> de se réaliser (on dit qu'elles sont <b>équiprobables</b>), la probabilité d'un évènement est :
  <div style="text-align:center;margin:8px 0 2px;"><span class="tex">P = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}</span></div>
</div>
${pbEx('Exemple 1 : avec la roue de loterie (8 secteurs identiques).', [
  [`Évènement ${pbEv('Obtenir un nombre pair')} : issues favorables 2, 4, 6, 8.`, 'On compte les issues favorables : 4.'],
  ['<span class="tex">P = \\dfrac{4}{8} = \\dfrac{1}{2} = 0{,}5 = 50\\ \\%</span>', 'On divise par le nombre total d\'issues : 8.'],
  [`Évènement ${pbEv('Obtenir un multiple de 3')} : issues 3 et 6.`, '2 issues favorables.'],
  ['<span class="tex">P = \\dfrac{2}{8} = \\dfrac{1}{4} = 0{,}25 = 25\\ \\%</span>', 'Une chance sur quatre.'],
])}
${pbEx('Exemple 2 : on tire une boule au hasard dans un sac contenant 3 boules rouges, 2 vertes et 5 bleues, indiscernables au toucher.', [
  ['Il y a 3 + 2 + 5 = 10 boules, chacune a autant de chances d\'être tirée.', 'On compte les issues : 10 boules.'],
  ['<span class="tex">P(\\text{rouge}) = \\dfrac{3}{10} = 0{,}3</span>', '3 boules rouges sur 10.'],
  ['<span class="tex">P(\\text{bleue}) = \\dfrac{5}{10} = 0{,}5</span>', 'Tirer une bleue a autant de chances que « pile » avec une pièce.'],
])}
<div class="redaction-note" ${PB_REM}>Attention : la règle ne s'applique que si les issues sont <b>équiprobables</b>. Ici, les issues « rouge », « verte », « bleue » ne le sont pas (il y a plus de boules bleues) : on raisonne donc sur les 10 boules, qui, elles, ont toutes la même chance.</div>
`;

document.getElementById('histoire-demo-probabilites-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Les jeux de hasard sont très anciens : on a retrouvé des dés vieux de plus de 4 000 ans. Pourtant, calculer des probabilités n'a commencé qu'au 17e siècle, en France. En 1654, un joueur, le <b>chevalier de Méré</b>, pose à <b>Blaise Pascal</b> une question : comment partager équitablement la mise entre deux joueurs si une partie est interrompue avant la fin ? Pascal en discute par lettres avec <b>Pierre de Fermat</b>, et leurs échanges fondent le calcul des probabilités. Aujourd'hui, on l'utilise partout : météo (« 70 % de risque de pluie »), médecine, assurances, jeux vidéo…
</div>
`;

document.getElementById('methode-demo-probabilites-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : repérer les issues favorables et calculer la probabilité</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un évènement : les secteurs favorables restent colorés et la probabilité se calcule. Faites ensuite tourner la roue !</p>
  <div style="text-align:center;margin:6px 0;"><select id="pb-ev" onchange="pbRoueMaj()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font:inherit;max-width:100%;"></select></div>
  <div id="pb-roue"></div>
  <div id="pb-roueCalc" style="text-align:center;font-size:1.05rem;line-height:2;"></div>
  <div id="pb-roueRes" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div class="figure-toolbar"><button class="btn" id="pb-tourner" onclick="pbTourner()">Faire tourner la roue</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : rédiger un calcul de probabilité</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On tire au hasard une lettre du mot MATHÉMATIQUES (13 lettres écrites sur des cartons identiques). Quelle est la probabilité de tirer une voyelle ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="pb-redacDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pbRedacDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pbRedacDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : lancer un dé beaucoup de fois</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">La probabilité d'obtenir chaque face est 1/6 ≈ 0,17. Lancez le dé de nombreuses fois : les fréquences observées se rapprochent de la ligne pointillée.</p>
  <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;justify-content:center;">
    <div id="pb-de" style="flex:none;width:86px;"></div>
    <div id="pb-deGraph" style="flex:1;min-width:260px;max-width:460px;"></div>
  </div>
  <div id="pb-deInfo" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pbLancer(1)">1 lancer</button>
    <button class="btn" onclick="pbLancer(10)">10 lancers</button>
    <button class="btn" onclick="pbLancer(100)">100 lancers</button>
    <button class="btn" onclick="pbLancer(1000)">1 000 lancers</button>
    <button class="btn secondary" onclick="pbDeReset()">Recommencer</button>
  </div>
</div>
`;

function pbExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pb-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pb-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-probabilites-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une probabilité »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">On lance un dé équilibré à 6 faces : les 6 issues sont équiprobables.</span><span class="we-comment">1. On justifie l'équiprobabilité.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">« Obtenir un nombre supérieur à 4 » est réalisé par 5 et 6 : 2 issues favorables.</span><span class="we-comment">2. On liste les issues favorables.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">P = \\dfrac{2}{6} = \\dfrac{1}{3}</span></span><span class="we-comment">3. Issues favorables ÷ issues au total, puis on simplifie.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pbExo(1, 'On tire au hasard une carte parmi un As, un Roi, une Dame et un Valet posés face cachée. Quelles sont les issues de cette expérience ?', [
    'Les issues sont : As, Roi, Dame, Valet (4 issues).'])}
  ${pbExo(2, 'On lance un dé à 6 faces. Dis si chaque évènement est certain, impossible, ou ni l\'un ni l\'autre : « obtenir 7 » ; « obtenir un nombre inférieur ou égal à 6 » ; « obtenir 5 ».', [
    '« obtenir 7 » : impossible.', '« obtenir un nombre inférieur ou égal à 6 » : certain.', '« obtenir 5 » : ni certain ni impossible (probabilité 1/6).'])}
  ${pbExo(3, 'On lance un dé équilibré. Quelle est la probabilité d\'obtenir 4 ? d\'obtenir un nombre impair ?', [
    'P(obtenir 4) = 1/6', 'Nombres impairs : 1, 3, 5, donc P = 3/6 = 1/2'])}
  ${pbExo(4, 'Un sac contient 3 boules rouges, 2 vertes et 5 bleues. On tire une boule au hasard. Calcule la probabilité de chaque couleur. Que vaut la somme de ces probabilités ?', [
    'P(rouge) = 3/10 = 0,3 ; P(verte) = 2/10 = 0,2 ; P(bleue) = 5/10 = 0,5', 'Somme : 0,3 + 0,2 + 0,5 = 1'])}
  ${pbExo(5, 'Avec la roue de loterie à 8 secteurs identiques numérotés de 1 à 8, quelle est la probabilité d\'obtenir un nombre strictement supérieur à 5 ?', [
    'Issues favorables : 6, 7, 8 (3 issues sur 8).', 'P = 3/8 = 0,375 = 37,5 %'])}
  ${pbExo(6, 'On tire une lettre au hasard parmi celles du mot MATHÉMATIQUES (13 lettres). Quelle est la probabilité de tirer la lettre M ? la lettre T ?', [
    'Il y a 2 M sur 13 lettres : P(M) = 2/13.', 'Il y a 2 T : P(T) = 2/13.'])}
  ${pbExo(7, 'Sam dit : « À ce jeu, soit je gagne, soit je perds : j\'ai donc une chance sur deux de gagner. » A-t-il forcément raison ?', [
    'Non : les deux issues « gagner » et « perdre » ne sont pas forcément équiprobables.', 'Par exemple, gagner si on obtient 6 avec un dé : la probabilité est 1/6, pas 1/2.'])}
  ${pbExo(8, 'Une pièce équilibrée est tombée trois fois de suite sur Pile. Quelle est la probabilité qu\'elle tombe sur Face au lancer suivant ?', [
    'Toujours 1/2 : la pièce n\'a pas de mémoire, chaque lancer est indépendant des précédents.'])}
</div>
`;

/* ---- Méthode 1 : roue de loterie ---- */
const PB_EVS = [
  ['Obtenir un nombre pair', n => n % 2 === 0],
  ['Obtenir un multiple de 3', n => n % 3 === 0],
  ['Obtenir un nombre strictement supérieur à 5', n => n > 5],
  ['Obtenir un nombre premier', n => [2, 3, 5, 7].includes(n)],
  ['Obtenir 8', n => n === 8],
  ['Obtenir un nombre inférieur à 10 (certain)', n => n < 10],
  ['Obtenir 9 (impossible)', n => n === 9],
];
let pbRot = 0, pbRaf = null;
function pbSimplifie(a, b){ const g = (x, y) => y ? g(y, x % y) : x, d = g(a, b) || 1; return [a / d, b / d]; }
function pbRoueMaj(){
  const sel = document.getElementById('pb-ev');
  if(!sel.options.length) sel.innerHTML = PB_EVS.map((e, i) => `<option value="${i}">« ${e[0]} »</option>`).join('');
  const [nom, test] = PB_EVS[Number(sel.value)], fav = [1, 2, 3, 4, 5, 6, 7, 8].filter(test);
  document.getElementById('pb-roue').innerHTML = pbRoue(fav, pbRot);
  const [p, q] = pbSimplifie(fav.length, 8), calc = document.getElementById('pb-roueCalc');
  calc.innerHTML = `Issues favorables : ${fav.length ? '<b>' + fav.join(', ') + '</b>' : '<b>aucune</b>'} &nbsp;→&nbsp; <span class="tex">P = \\dfrac{${fav.length}}{8}${fav.length && q !== 8 ? ` = \\dfrac{${p}}{${q}}` : ''} = ${pbNum(fav.length / 8).replace(',', '{,}')}</span>`;
  renderStaticMath(calc);
  document.getElementById('pb-roueRes').textContent = '';
}
function pbTourner(){
  cancelAnimationFrame(pbRaf);
  const btn = document.getElementById('pb-tourner'), res = document.getElementById('pb-roueRes'), sel = document.getElementById('pb-ev');
  const [nom, test] = PB_EVS[Number(sel.value)], fav = [1, 2, 3, 4, 5, 6, 7, 8].filter(test);
  const tirage = 1 + Math.floor(Math.random() * 8), depart = pbRot, cible = depart - (depart % 360) + 360 * 4 - (tirage - 1) * 45 + (Math.random() - 0.5) * 30, t0 = performance.now(), dur = 2600;
  btn.disabled = true; res.textContent = 'La roue tourne…';
  const f = now => {
    const t = Math.max(0, Math.min(1, (now - t0) / dur)), e = 1 - Math.pow(1 - t, 3);
    pbRot = depart + (cible - depart) * e;
    document.getElementById('pb-roue').innerHTML = pbRoue(fav, pbRot);
    if(t < 1){ pbRaf = requestAnimationFrame(f); return; }
    btn.disabled = false;
    res.innerHTML = `Résultat : <b>${tirage}</b>. L'évènement « ${nom} » ${test(tirage) ? '<b style="color:#1E7B34;">est réalisé</b>' : '<b style="color:#C0392B;">n\'est pas réalisé</b>'}.`;
  };
  pbRaf = requestAnimationFrame(f);
}

/* ---- Méthode 2 : rédaction ---- */
const PB_REDAC_STEPS = [
  { expr: 'M – A – T – H – É – M – A – T – I – Q – U – E – S', note: 'Les 13 cartons sont identiques : chacun a la même chance d\'être tiré. Il y a 13 issues.' },
  { expr: 'Voyelles : A, É, A, I, U, E', note: 'On compte les issues favorables, en comptant chaque lettre autant de fois qu\'elle apparaît : 6.' },
  { expr: '<span class="tex">P(\\text{voyelle}) = \\dfrac{6}{13}</span>', note: 'Nombre d\'issues favorables ÷ nombre total d\'issues. La fraction ne se simplifie pas.' },
  { expr: '<span class="tex">P(\\text{voyelle}) \\approx 0{,}46</span>', note: 'Soit environ 46 % : un peu moins d\'une chance sur deux.' },
];
const pbRedacDemo = makeStepDemo(PB_REDAC_STEPS, 'pb-redacDisplay');

/* ---- Méthode 3 : simulation d'un dé ---- */
let pbEff = [0, 0, 0, 0, 0, 0], pbDernier = null;
function pbFaceDe(v){
  const pts = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[28, 28], [50, 50], [72, 72]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]], 5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[28, 26], [72, 26], [28, 50], [72, 50], [28, 74], [72, 74]] };
  return `<svg viewBox="0 0 100 100" style="width:100%;display:block;"><rect x="6" y="6" width="88" height="88" rx="16" fill="#fff" stroke="#1C1B2E" stroke-width="3"/>${v ? pts[v].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#C0392B"/>`).join('') : '<text x="50" y="62" text-anchor="middle" font-family="Space Grotesk" font-size="34" fill="#8A93A3">?</text>'}</svg>`;
}
function pbDeDessin(){
  const N = pbEff.reduce((t, v) => t + v, 0), W = 440, H = 200, g = 38, b = 24, top = 12, ymax = 0.5;
  const y = v => H - b - (v / ymax) * (H - b - top), col = (W - g - 8) / 6;
  let h = '';
  [0, 0.1, 0.2, 0.3, 0.4, 0.5].forEach(v => { h += `<line x1="${g}" y1="${y(v)}" x2="${W - 6}" y2="${y(v)}" stroke="#E4E7EC"/><text x="${g - 5}" y="${y(v) + 4}" text-anchor="end" font-family="JetBrains Mono" font-size="10" fill="#4E5665">${pbNum(v)}</text>`; });
  pbEff.forEach((e, i) => {
    const f = N ? e / N : 0, cx = g + col * (i + 0.5);
    h += `<rect x="${cx - col * 0.3}" y="${y(Math.min(f, ymax))}" width="${col * 0.6}" height="${H - b - y(Math.min(f, ymax))}" fill="${PB_COUL[i]}" rx="2"/>`
      + `<text x="${cx}" y="${H - b + 15}" text-anchor="middle" font-family="Space Grotesk" font-size="12" font-weight="700" fill="#1C1B2E">${i + 1}</text>`
      + (N ? `<text x="${cx}" y="${y(Math.min(f, ymax)) - 4}" text-anchor="middle" font-family="JetBrains Mono" font-size="10" fill="#1C1B2E">${pbNum(Math.round(f * 100) / 100)}</text>` : '');
  });
  h += `<line x1="${g}" y1="${y(1 / 6)}" x2="${W - 6}" y2="${y(1 / 6)}" stroke="#1C1B2E" stroke-width="1.5" stroke-dasharray="6 4"/><text x="${W - 8}" y="${y(1 / 6) - 5}" text-anchor="end" font-family="Inter" font-size="10.5" fill="#1C1B2E">1/6 ≈ 0,17</text>`
    + `<line x1="${g}" y1="${top}" x2="${g}" y2="${H - b}" stroke="#1C1B2E" stroke-width="1.2"/><line x1="${g}" y1="${H - b}" x2="${W - 6}" y2="${H - b}" stroke="#1C1B2E" stroke-width="1.2"/>`;
  document.getElementById('pb-deGraph').innerHTML = `<svg viewBox="0 0 ${W} ${H + 4}" style="width:100%;display:block;">${h}</svg>`;
  document.getElementById('pb-de').innerHTML = pbFaceDe(pbDernier);
  const ecart = N ? Math.max(...pbEff.map(e => Math.abs(e / N - 1 / 6))) : 0;
  document.getElementById('pb-deInfo').innerHTML = N ? `<b>${N.toLocaleString('fr-FR')}</b> lancer${N > 1 ? 's' : ''} · fréquences observées (effectif ÷ nombre de lancers) · plus grand écart avec 1/6 : ${pbNum(Math.round(ecart * 100) / 100)}` : 'Aucun lancer pour l\'instant.';
}
function pbLancer(n){ for(let i = 0; i < n; i++){ pbDernier = 1 + Math.floor(Math.random() * 6); pbEff[pbDernier - 1]++; } pbDeDessin(); }
function pbDeReset(){ pbEff = [0, 0, 0, 0, 0, 0]; pbDernier = null; pbDeDessin(); }

DEMO_REGISTRY['5e|Probabilités'] = {
  cours: 'cours-demo-probabilites-5e', methode: 'methode-demo-probabilites-5e', exos: 'exos-demo-probabilites-5e', histoire: 'histoire-demo-probabilites-5e',
  init: () => {
    pbRoueMaj(); pbRedacDemo.reset(); pbDeReset();
    ['cours-demo-probabilites-5e', 'exos-demo-probabilites-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-probabilites-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-probabilites-5e'));
  }
};

DEMO_QUIZZES['5e|Probabilités'] = [
  { q: 'On lance une pièce. Les issues sont...', opts: ['Pile et Face', 'gagner et perdre', '1 et 2'], correct: 0 },
  { q: '« Obtenir 7 avec un dé à 6 faces » est un évènement...', opts: ['certain', 'impossible', 'probable'], correct: 1 },
  { q: 'Une probabilité est toujours comprise entre...', opts: ['0 et 100', '0 et 1', '1 et 6'], correct: 1 },
  { q: 'La probabilité d\'obtenir un nombre pair avec un dé équilibré est...', opts: ['1/6', '1/2', '2/6'], correct: 1 },
  { q: 'Un sac contient 4 boules rouges et 6 noires. La probabilité de tirer une rouge est...', opts: ['4/6', '0,4', '0,6'], correct: 1 },
  { q: 'La probabilité d\'un évènement certain est...', opts: ['0', '0,5', '1'], correct: 2 },
  { q: 'Une pièce est tombée 5 fois sur Pile. Au lancer suivant, la probabilité de Face est...', opts: ['plus grande que 1/2', '1/2', 'plus petite que 1/2'], correct: 1 },
];

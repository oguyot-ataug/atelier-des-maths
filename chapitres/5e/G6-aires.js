/* ============================================================
   CHAPITRE : Aires (5e, G6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Aires en 5e" (capture du manuel p. 108 : formulaire des aires des figures usuelles,
   aire d'un disque en valeur exacte et arrondie, aire d'une figure composée). Titres reformulés,
   exemples nouveaux ; dans l'onglet Méthode, animations qui expliquent les formules
   (parallélogramme → rectangle, triangle = moitié d'un rectangle, disque découpé en parts).
   ============================================================ */

const AR_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const AR_BLEU = '#0C5BA0', AR_ORANGE = '#E07B00', AR_VERT = '#1E7B34', AR_VIOLET = '#8E44AD', AR_ENCRE = '#1C1B2E';
const arNum = v => String(Math.round(v * 100) / 100).replace('.', ',');
function arEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
const arPoly = (pts, c, fill, extra) => `<polygon points="${pts.map(p => p.map(x => (+x).toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${c}" stroke-width="2" stroke-linejoin="round"${extra || ''}/>`;
const arTxt = (x, y, t, c, it) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Space Grotesk" font-size="14" ${it === false ? '' : 'font-style="italic"'} fill="${c || AR_ENCRE}">${t}</text>`;
// Flèche double de P à Q, pointes dessinées (pas de marqueur SVG : un marqueur défini dans un onglet
// masqué ne s'affiche pas ailleurs, et il disparaît quand la figure devient une image dans le cahier).
function arDoubleFleche(P, Q){
  const dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, T = 7, W = 3.2;
  const pointe = (X, sx) => `<polygon points="${X[0]},${X[1]} ${(X[0] - sx * ux * T - uy * W).toFixed(1)},${(X[1] - sx * uy * T + ux * W).toFixed(1)} ${(X[0] - sx * ux * T + uy * W).toFixed(1)},${(X[1] - sx * uy * T - ux * W).toFixed(1)}" fill="#4E5665"/>`;
  return `<line x1="${P[0]}" y1="${P[1]}" x2="${Q[0]}" y2="${Q[1]}" stroke="#4E5665" stroke-width="1.1"/>` + pointe(Q, 1) + pointe(P, -1);
}
// Cote de P à Q, avec son nom.
function arCote(P, Q, nom, dx, dy){
  const mx = (P[0] + Q[0]) / 2 + (dx || 0), my = (P[1] + Q[1]) / 2 + (dy || 0);
  return arDoubleFleche(P, Q) + arTxt(mx, my, nom, '#4E5665');
}
const AR_DEFS = '';
const arAngleDroit = (x, y, sx, sy) => `<path d="M${x + 9 * sx},${y} L${x + 9 * sx},${y + 9 * sy} L${x},${y + 9 * sy}" fill="none" stroke="${AR_ENCRE}" stroke-width="1.2"/>`;
const arSvg = (corps, vb) => `<svg viewBox="${vb || '0 0 180 150'}" style="width:100%;max-width:190px;display:block;margin:4px auto;">${AR_DEFS}${corps}</svg>`;

// Formulaire : une carte par figure usuelle.
const AR_FIGURES = [
  { nom: 'Rectangle', c: AR_ORANGE, fig: arSvg(arPoly([[30, 20], [140, 20], [140, 105], [30, 105]], AR_ORANGE, 'rgba(224,123,0,.18)') + arCote([30, 125], [140, 125], 'L', 0, 18) + arCote([158, 20], [158, 105], 'ℓ', 12, 4), '0 0 180 150'), f: 'L \\times \\ell' },
  { nom: 'Carré', c: AR_BLEU, fig: arSvg(arPoly([[40, 15], [130, 15], [130, 105], [40, 105]], AR_BLEU, 'rgba(12,91,160,.14)') + arCote([40, 125], [130, 125], 'c', 0, 18) + arCote([148, 15], [148, 105], 'c', 12, 4), '0 0 180 150'), f: 'c \\times c = c^2' },
  { nom: 'Disque', c: AR_VERT, fig: arSvg(`<circle cx="90" cy="72" r="55" fill="rgba(30,123,52,.14)" stroke="${AR_VERT}" stroke-width="2"/><circle cx="90" cy="72" r="2.5" fill="${AR_ENCRE}"/><line x1="90" y1="72" x2="129" y2="111" stroke="${AR_ENCRE}" stroke-width="1.6"/>` + arTxt(118, 88, 'r') + arTxt(90, 145, 'π ≈ 3,14', '#4E5665', false), '0 0 180 150'), f: '\\pi \\times r \\times r = \\pi \\times r^2' },
  { nom: 'Triangle rectangle', c: AR_VIOLET, fig: arSvg(arPoly([[30, 105], [140, 105], [140, 20]], AR_VIOLET, 'rgba(142,68,173,.14)') + arAngleDroit(140, 105, -1, -1) + arCote([30, 125], [140, 125], 'a', 0, 18) + arCote([158, 20], [158, 105], 'b', 12, 4), '0 0 180 150'), f: '\\dfrac{a \\times b}{2}' },
  { nom: 'Triangle', c: '#D4AC0D', fig: arSvg(arPoly([[25, 105], [145, 105], [105, 20]], '#B7950B', 'rgba(212,172,13,.18)') + `<line x1="105" y1="20" x2="105" y2="105" stroke="${AR_ENCRE}" stroke-width="1.2" stroke-dasharray="4 3"/>` + arAngleDroit(105, 105, -1, -1) + arCote([25, 125], [145, 125], 'b', 0, 18) + arCote([160, 20], [160, 105], 'h', 10, 4), '0 0 180 150'), f: '\\dfrac{b \\times h}{2}' },
  { nom: 'Parallélogramme', c: '#5B6BC0', fig: arSvg(arPoly([[20, 105], [120, 105], [150, 20], [50, 20]], '#5B6BC0', 'rgba(91,107,192,.14)') + `<line x1="50" y1="20" x2="50" y2="105" stroke="${AR_ENCRE}" stroke-width="1.2" stroke-dasharray="4 3"/>` + arAngleDroit(50, 105, 1, -1) + arCote([20, 125], [120, 125], 'b', 0, 18) + arCote([165, 20], [165, 105], 'h', 10, 4), '0 0 180 150'), f: 'b \\times h' },
];
function arFormulaire(){
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin:10px 0 18px;">${AR_FIGURES.map(F =>
    `<div style="border:1px solid #D9DEE6;border-radius:12px;background:#fff;overflow:hidden;display:flex;flex-direction:column;">
      <div style="background:${F.c};color:#fff;font-weight:700;text-align:center;padding:5px;font-family:'Space Grotesk',sans-serif;">${F.nom}</div>
      <div style="flex:1;padding:4px 8px;">${F.fig}</div>
      <div style="background:#EAF2FB;text-align:center;padding:8px 6px;">Aire = <span class="tex">${F.f}</span></div>
    </div>`).join('')}</div>`;
}
// Figure composée de l'exemple : une « maison » (rectangle + triangle).
function arFigMaison(){
  return `<svg viewBox="0 0 300 230" style="width:100%;max-width:330px;display:block;margin:8px auto 12px;">${AR_DEFS}`
    + arPoly([[60, 90], [240, 90], [240, 200], [60, 200]], AR_ORANGE, 'rgba(224,123,0,.15)') + arPoly([[60, 90], [240, 90], [150, 20]], AR_VIOLET, 'rgba(142,68,173,.15)')
    + `<line x1="150" y1="20" x2="150" y2="90" stroke="${AR_ENCRE}" stroke-width="1.2" stroke-dasharray="4 3"/>` + arAngleDroit(150, 90, 1, -1)
    + arCote([60, 216], [240, 216], '6 cm', 0, -6).replace('font-style="italic"', '') + arCote([258, 90], [258, 200], '4 cm', 20, 4).replace('font-style="italic"', '') + arTxt(172, 60, '2,5 cm', '#4E5665', false)
    + arTxt(50, 95, 'A', AR_ENCRE, false) + arTxt(250, 88, 'B', AR_ENCRE, false) + arTxt(250, 212, 'C', AR_ENCRE, false) + arTxt(50, 212, 'D', AR_ENCRE, false) + arTxt(150, 14, 'E', AR_ENCRE, false)
    + '</svg>';
}

document.getElementById('cours-demo-aires-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les formules à connaître</h3></div>
<p style="margin:4px 0;">L'<b>aire</b> d'une figure est la mesure de la surface qu'elle occupe, exprimée dans une unité d'aire (cm², m²…). Toutes les longueurs doivent être dans la <b>même unité</b>.</p>
${arFormulaire()}
<div class="redaction-note" ${AR_REM}>Remarque : dans le triangle et le parallélogramme, la <b>hauteur</b> <i>h</i> est perpendiculaire à la base <i>b</i> ; ce n'est pas la longueur d'un côté penché. L'onglet Méthode montre d'où viennent ces formules.</div>

<div class="lesson-header"><span class="num">2</span><h3>L'aire d'un disque : valeur exacte, valeur arrondie</h3></div>
${arEx('Exemple 1 : quelle est l\'aire d\'un disque de rayon 5 cm ? On donne la valeur exacte, puis une valeur arrondie au centième.', [
  ['<span class="tex">\\mathcal{A} = \\pi \\times r^2</span>', 'On écrit la formule.'],
  ['<span class="tex">\\mathcal{A} = \\pi \\times 5^2</span>', 'On remplace <i>r</i> par 5 cm.'],
  ['<span class="tex">\\mathcal{A} = 25\\pi</span> cm²', 'On obtient la <b>valeur exacte</b> (on garde π).'],
  ['<span class="tex">\\mathcal{A} \\approx 78{,}54</span> cm²', 'Avec la touche π de la calculatrice : la <b>valeur arrondie au centième</b>.'],
])}
${arEx('Exemple 2 : quelle est l\'aire d\'un disque de diamètre 12 m ?', [
  ['r = 12 ÷ 2 = 6 m', 'Attention : la formule utilise le <b>rayon</b>, moitié du diamètre.'],
  ['<span class="tex">\\mathcal{A} = \\pi \\times 6^2 = 36\\pi</span> m²', 'Valeur exacte.'],
  ['<span class="tex">\\mathcal{A} \\approx 113{,}10</span> m²', 'Valeur arrondie au centième.'],
])}
<div class="redaction-note" ${AR_REM}>Remarque : π (« pi ») n'est pas un nombre décimal : 3,14 n'en est qu'une valeur approchée. C'est pour cela qu'on distingue la valeur exacte (25π) de la valeur arrondie (78,54).</div>

<div class="lesson-header"><span class="num">3</span><h3>L'aire d'une figure composée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">Pour calculer l'aire d'une figure composée, on la <b>découpe</b> en figures usuelles, on calcule l'aire de chacune, puis on les <b>additionne</b> (ou on les <b>soustrait</b> s'il y a un « trou »).</div>
<p class="example-title">Exemple 1 : la figure ABCDE est formée du rectangle ABCD et du triangle ABE.</p>
${arFigMaison()}
${arEx('', [
  ['<span class="tex">\\mathcal{A}_{ABCD} = 6 \\times 4 = 24</span> cm²', 'Aire du rectangle : L × ℓ.'],
  ['<span class="tex">\\mathcal{A}_{ABE} = \\dfrac{6 \\times 2{,}5}{2} = 7{,}5</span> cm²', 'Aire du triangle : base × hauteur ÷ 2.'],
  ['<span class="tex">\\mathcal{A}_{ABCDE} = 24 + 7{,}5 = 31{,}5</span> cm²', 'On additionne les deux aires.'],
])}
${arEx('Exemple 2 : un carré de côté 10 cm est percé d\'un trou circulaire de rayon 3 cm. Quelle est l\'aire restante ?', [
  ['<span class="tex">10 \\times 10 = 100</span> cm²', 'Aire du carré.'],
  ['<span class="tex">\\pi \\times 3^2 = 9\\pi</span> cm²', 'Aire du trou (un disque).'],
  ['<span class="tex">100 - 9\\pi \\approx 71{,}73</span> cm²', 'On soustrait l\'aire du trou.'],
])}
`;

document.getElementById('histoire-demo-aires-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « aire » vient du latin <i>area</i>, qui désignait une surface plane et dégagée, comme une cour. Calculer des aires était indispensable pour partager les champs : en Égypte, après chaque crue du Nil, il fallait redessiner les parcelles. Le <b>papyrus Rhind</b> (vers 1650 av. J.-C.) calcule l'aire d'un disque comme celle d'un carré dont le côté vaut les 8/9 du diamètre, ce qui revient à prendre π ≈ 3,16. Plus tard, le Grec <b>Archimède</b> (3e siècle av. J.-C.) encadre π entre 3 + 10/71 et 3 + 1/7 en dessinant des polygones à 96 côtés autour d'un cercle et à l'intérieur. Aujourd'hui, les ordinateurs connaissent des milliers de milliards de décimales de π… mais 3,14 suffit largement au collège !
</div>
`;

document.getElementById('methode-demo-aires-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : pourquoi l'aire d'un parallélogramme est b × h</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="ar-paraSvg" viewBox="10 20 300 150" style="width:100%;max-width:460px;display:block;margin:8px auto;"></svg>
  <div id="ar-paraNote" class="step-note" style="text-align:center;min-height:2.4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arParaJouer()">Découper et déplacer</button>
    <button class="btn secondary" onclick="arParaReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : pourquoi l'aire d'un triangle est (b × h) ÷ 2</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="ar-triSvg" viewBox="20 30 240 145" style="width:100%;max-width:440px;display:block;margin:8px auto;"></svg>
  <div id="ar-triNote" class="step-note" style="text-align:center;min-height:2.4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arTriJouer()">Compléter en rectangle</button>
    <button class="btn secondary" onclick="arTriReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : pourquoi l'aire d'un disque est π × r²</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On découpe le disque en parts égales, on ouvre ses deux moitiés comme un éventail et on range les parts tête-bêche. Cliquez sur « Étape suivante ».</p>
  <svg id="ar-disqueSvg" viewBox="0 0 470 236" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div id="ar-disqueNote" class="step-note" style="text-align:center;margin-top:8px;min-height:3.6em;"></div>
  <div class="figure-toolbar">
    <button class="btn" id="ar-dqSuiv" onclick="arDqSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="arDisque()">Recommencer</button>
  </div>
</div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer l'aire avec le formulaire</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez une figure et donnez ses dimensions (dans la même unité) : la formule et le calcul s'écrivent.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">
    <select id="ar-choix" onchange="arCalc(true)" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font:inherit;">${AR_FIGURES.map((F, i) => `<option value="${i}">${F.nom}</option>`).join('')}</select>
    <span id="ar-champs"></span>
  </div>
  <div id="ar-calcul" style="text-align:center;font-size:1.05rem;line-height:2.2;margin-top:8px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : l'aire d'une figure composée</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un terrain est formé d'un rectangle de 20 m sur 12 m et d'un demi-disque de diamètre 12 m, accolé au côté de 12 m. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="ar-composeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arComposeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="arComposeDemo.reset()">Recommencer</button>
  </div>
</div>
`;

function arExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="ar-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="ar-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-aires-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer l'aire d'un triangle »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\mathcal{A} = \\dfrac{b \\times h}{2}</span></span><span class="we-comment">1. On écrit la formule.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\mathcal{A} = \\dfrac{8 \\times 5}{2}</span></span><span class="we-comment">2. On remplace par les longueurs (même unité : cm).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\mathcal{A} = 20</span> cm²</span><span class="we-comment">3. On calcule et on n'oublie pas l'unité d'aire.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${arExo(1, 'Calcule l\'aire d\'un rectangle de longueur 7,5 cm et de largeur 4 cm, puis celle d\'un carré de côté 9 cm.', [
    'Rectangle : 7,5 × 4 = 30 cm²', 'Carré : 9 × 9 = 81 cm²'])}
  ${arExo(2, 'Calcule l\'aire d\'un triangle de base 8 cm et de hauteur associée 5 cm.', [
    '(8 × 5) ÷ 2 = 20 cm²'])}
  ${arExo(3, 'Calcule l\'aire d\'un triangle rectangle dont les côtés de l\'angle droit mesurent 6 cm et 4,5 cm.', [
    '(6 × 4,5) ÷ 2 = 13,5 cm²'])}
  ${arExo(4, 'Calcule l\'aire d\'un parallélogramme de base 7 cm et de hauteur associée 3,2 cm.', [
    '7 × 3,2 = 22,4 cm²'])}
  ${arExo(5, 'Donne la valeur exacte, puis la valeur arrondie au centième, de l\'aire d\'un disque de rayon 3 cm, puis d\'un disque de diamètre 10 cm.', [
    'Rayon 3 cm : π × 3² = 9π ≈ 28,27 cm²', 'Diamètre 10 cm, donc rayon 5 cm : π × 5² = 25π ≈ 78,54 cm²'])}
  ${arExo(6, 'Un terrain est formé d\'un rectangle de 20 m sur 12 m et d\'un demi-disque de diamètre 12 m. Calcule son aire, arrondie au centième.', [
    'Rectangle : 20 × 12 = 240 m²', 'Demi-disque de rayon 6 m : (π × 6²) ÷ 2 = 18π ≈ 56,55 m²', 'Total : 240 + 18π ≈ 296,55 m²'])}
  ${arExo(7, 'Un triangle de base 6 cm et de hauteur 4 cm, et un rectangle de 3 cm sur 4 cm : lequel a la plus grande aire ?', [
    'Triangle : (6 × 4) ÷ 2 = 12 cm² ; rectangle : 3 × 4 = 12 cm².', 'Ils ont la même aire !'])}
  ${arExo(8, 'Léo calcule l\'aire d\'un rectangle de 2 m sur 35 cm et trouve 70. Quelle est son erreur ? Donne la bonne réponse.', [
    'Il a multiplié des longueurs dans des unités différentes (2 m et 35 cm).', '2 m = 200 cm, donc l\'aire est 200 × 35 = 7 000 cm² (soit 0,7 m²).'])}
</div>
`;

/* ---- Méthode 1 : parallélogramme → rectangle ---- */
const AR_PA = [[40, 150], [200, 150], [250, 50], [90, 50]];
let arRaf = {};
function arParaDessin(t){
  const dx = 160 * t, tri = [[40, 150], [90, 150], [90, 50]].map(p => [p[0] + dx, p[1]]);
  let h = arPoly([[90, 150], [200, 150], [250, 50], [90, 50]], '#5B6BC0', 'rgba(91,107,192,.16)')
    + arPoly(tri, AR_ORANGE, 'rgba(224,123,0,.3)')
    + `<line x1="90" y1="50" x2="90" y2="150" stroke="${AR_ENCRE}" stroke-width="1.3" stroke-dasharray="4 3"/>` + arAngleDroit(90, 150, 1, -1)
    + arTxt(145 + (t > 0.99 ? 25 : 0), 168, 'b', '#4E5665') + arTxt(t > 0.99 ? 262 : 78, 104, 'h', '#4E5665');
  if(t > 0.99) h += arPoly([[90, 150], [250, 150], [250, 50], [90, 50]], AR_VERT, 'none', ' stroke-dasharray="6 4" stroke-width="2.6"');
  return h;
}
function arParaReset(){ cancelAnimationFrame(arRaf.p); const s = document.getElementById('ar-paraSvg'); if(s) s.innerHTML = arParaDessin(0); const n = document.getElementById('ar-paraNote'); if(n) n.textContent = 'On coupe le parallélogramme le long d\'une hauteur : on obtient un triangle (en orange).'; }
function arParaJouer(){
  cancelAnimationFrame(arRaf.p);
  const s = document.getElementById('ar-paraSvg'), n = document.getElementById('ar-paraNote'), t0 = performance.now();
  n.textContent = 'On fait glisser le triangle de l\'autre côté…';
  const f = now => { const t = Math.max(0, Math.min(1, (now - t0) / 1800)), e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; s.innerHTML = arParaDessin(e); if(t < 1) arRaf.p = requestAnimationFrame(f); else n.textContent = 'On obtient un rectangle de longueur b et de largeur h, de même aire : Aire = b × h.'; };
  arRaf.p = requestAnimationFrame(f);
}

/* ---- Méthode 2 : le triangle est la moitié d'un rectangle ---- */
const AR_TA = [40, 150], AR_TC = [240, 150], AR_TB = [100, 50], AR_TH = [100, 150];
function arTourne(pts, O, deg){ const r = deg * Math.PI / 180, c = Math.cos(r), s = Math.sin(r); return pts.map(([x, y]) => [O[0] + (x - O[0]) * c - (y - O[1]) * s, O[1] + (x - O[0]) * s + (y - O[1]) * c]); }
function arTriDessin(t){
  const M1 = [(AR_TA[0] + AR_TB[0]) / 2, (AR_TA[1] + AR_TB[1]) / 2], M2 = [(AR_TB[0] + AR_TC[0]) / 2, (AR_TB[1] + AR_TC[1]) / 2];
  let h = arPoly([[40, 150], [240, 150], [240, 50], [40, 50]], '#9CA3AF', 'none', ' stroke-dasharray="5 4" stroke-width="1.3"');
  if(t > 0){ h += arPoly(arTourne([AR_TA, AR_TH, AR_TB], M1, 180 * t), '#B7950B', 'rgba(212,172,13,.14)', ' stroke-dasharray="4 3"') + arPoly(arTourne([AR_TH, AR_TC, AR_TB], M2, 180 * t), '#B7950B', 'rgba(212,172,13,.14)', ' stroke-dasharray="4 3"'); }
  h += arPoly([AR_TA, AR_TC, AR_TB], '#B7950B', 'rgba(212,172,13,.3)') + `<line x1="100" y1="50" x2="100" y2="150" stroke="${AR_ENCRE}" stroke-width="1.2" stroke-dasharray="4 3"/>` + arAngleDroit(100, 150, 1, -1)
    + arTxt(140, 167, 'b', '#4E5665') + arTxt(252, 104, 'h', '#4E5665');
  return h;
}
function arTriReset(){ cancelAnimationFrame(arRaf.t); const s = document.getElementById('ar-triSvg'); if(s) s.innerHTML = arTriDessin(0); const n = document.getElementById('ar-triNote'); if(n) n.textContent = 'Le triangle a la même base b et la même hauteur h que le rectangle en pointillés.'; }
function arTriJouer(){
  cancelAnimationFrame(arRaf.t);
  const s = document.getElementById('ar-triSvg'), n = document.getElementById('ar-triNote'), t0 = performance.now();
  n.textContent = 'On recopie chaque moitié du triangle et on la fait pivoter…';
  const f = now => { const t = Math.max(0, Math.min(1, (now - t0) / 1800)); s.innerHTML = arTriDessin(t); if(t < 1) arRaf.t = requestAnimationFrame(f); else n.textContent = 'Les deux copies remplissent le reste du rectangle : le triangle en occupe exactement la moitié. Aire = (b × h) ÷ 2.'; };
  arRaf.t = requestAnimationFrame(f);
}

/* ---- Méthode 3 : le disque découpé puis « déroulé », animé étape par étape -- demandé d'après une vidéo
   (« elle montre comment on trouve l'aire du disque ») : on découpe le disque en parts égales ; la moitié du
   bas (bleue) et la moitié du haut (verte) s'ouvrent comme un éventail et se rangent tête-bêche (pointe en
   haut, pointe en bas) ; les arcs de chaque moitié forment un côté de longueur π × r, le côté d'une part est
   un rayon ; on coupe la première part en deux pour redresser les bords ; avec 16 puis 48 parts on obtient un
   rectangle π × r sur r. ---- */
const AR_DQ = { R: 64, cx: 100, cy: 112, x0: 232, y0: 80, VERT: '#2E9E8A' };
const AR_DQ_ETAPES = [
  { n: 8, mode: 'disque', note: 'Voici un disque de rayon r. La longueur de son cercle (son périmètre) vaut 2 × π × r. On cherche son aire A.' },
  { n: 8, mode: 'coupe', note: 'On découpe le disque en 8 parts égales : 4 parts dans la moitié du haut (en vert), 4 parts dans la moitié du bas (en bleu).' },
  { n: 8, mode: 'rang', note: 'On ouvre les deux moitiés comme un éventail et on range les parts en alternant : pointe en haut (bleu), pointe en bas (vert). On n\'a rien ajouté ni rien enlevé : la figure a toujours la même aire A.' },
  { n: 8, mode: 'rang', cotes: true, note: 'En haut, les arcs verts forment la moitié du cercle : bout à bout, ils mesurent la moitié du périmètre, soit π × r. En bas, les arcs bleus aussi. Le côté penché d\'une part est un rayon : il mesure r.' },
  { n: 8, mode: 'demi', cotes: true, note: 'On coupe la première part en deux et on déplace une moitié à l\'autre bout : les bords de gauche et de droite deviennent droits.' },
  { n: 16, mode: 'demi', cotes: true, note: 'Avec 16 parts, les bords du haut et du bas sont presque droits.' },
  { n: 48, mode: 'demi', cotes: true, rect: true, note: 'Avec 48 parts, on obtient presque un rectangle, de longueur π × r et de largeur r.' },
  { n: 48, mode: 'demi', cotes: true, rect: true, fin: true, note: '<b>Aire du disque = aire du rectangle = longueur × largeur = π × r × r = π × r²</b>' }
];
let arDq = { i: 0, pieces: null, raf: 0 };
// Position de chaque part : sommet (x, y), rotation (degrés), angles de bord t0 < t1 dans son repère
// (la part « regarde » vers +x). Une part coupée en deux a deux moitiés, qui partent de la part entière.
function arDqPlacer(e){
  const { R, cx, cy, x0, y0, VERT } = AR_DQ, n = e.n, a = 2 * Math.PI / n, m = n / 2, s = R * Math.sin(a / 2), k = R * Math.cos(a / 2), deg = v => v * 180 / Math.PI;
  const P = [];
  const ajoute = (id, c, x, y, rot, parent) => {
    if(id === n + 'b0' && e.mode === 'demi'){ // première part coupée : moitié droite en place, moitié gauche au bout
      P.push({ id: id + 'd', parent: id, c, x, y, rot, t0: -a / 2, t1: 0 });
      P.push({ id: id + 'g', parent: id, c, x: x + n * s, y, rot, t0: 0, t1: a / 2 });
      return;
    }
    P.push({ id, parent, c: e.mode === 'disque' ? '#4F86C6' : c, x, y, rot, t0: -a / 2, t1: a / 2 });
  };
  for(let b = 0; b < m; b++){ // moitié du bas, de gauche à droite
    const th = Math.PI - a / 2 - b * a, ec = e.mode === 'coupe' ? 5 : 0;
    if(e.mode === 'disque' || e.mode === 'coupe') ajoute(n + 'b' + b, AR_BLEU, cx + ec * Math.cos(th), cy + ec * Math.sin(th), deg(th));
    else ajoute(n + 'b' + b, AR_BLEU, x0 + 2 * b * s, y0, 90);
  }
  for(let g = 0; g < m; g++){ // moitié du haut, de gauche à droite
    const th = Math.PI + a / 2 + g * a, ec = e.mode === 'coupe' ? 5 : 0;
    if(e.mode === 'disque' || e.mode === 'coupe') ajoute(n + 'v' + g, VERT, cx + ec * Math.cos(th), cy + ec * Math.sin(th), deg(th));
    else ajoute(n + 'v' + g, VERT, x0 + (2 * g + 1) * s, y0 + k, 270);
  }
  return P;
}
function arDqDessin(pieces, e, fondu){
  const { R, cx, cy, x0, y0 } = AR_DQ, n = e.n, a = 2 * Math.PI / n, s = R * Math.sin(a / 2), k = R * Math.cos(a / 2), L = n * s;
  const f = v => v.toFixed(1);
  // Disque entier : un fond plein sous les parts (pas de fines lignes entre elles).
  let h = e.mode === 'disque' ? `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#4F86C6" fill-opacity=".78"/>` : '';
  if(e.mode !== 'disque') pieces.forEach(p => {
    const op = p.op == null ? 1 : p.op;
    if(op <= 0.01) return;
    h += `<path transform="translate(${f(p.x)},${f(p.y)}) rotate(${f(p.rot)})" d="M0,0 L${f(R * Math.cos(p.t0))},${f(R * Math.sin(p.t0))} A${R},${R} 0 0 1 ${f(R * Math.cos(p.t1))},${f(R * Math.sin(p.t1))} Z" fill="${p.c}" fill-opacity=".78" stroke="${e.mode === 'disque' ? 'none' : '#fff'}" stroke-width="${n > 16 ? .4 : .9}" stroke-linejoin="round" opacity="${op.toFixed(2)}"/>`;
  });
  const o = `opacity="${fondu.toFixed(2)}"`;
  if(e.mode === 'disque'){
    h += `<g ${o}><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${AR_ENCRE}" stroke-width="1.6"/><circle cx="${cx}" cy="${cy}" r="2.4" fill="${AR_ENCRE}"/>`
      + `<line x1="${cx}" y1="${cy}" x2="${cx + R}" y2="${cy}" stroke="${AR_ENCRE}" stroke-width="1.6"/>` + arTxt(cx + R / 2, cy - 7, 'r') + arTxt(cx - 22, cy + 28, 'A', '#fff', false) + '</g>';
  }
  // Le disque de départ reste dessiné en pointillés : la figure obtenue a la même aire A.
  if(e.mode === 'rang' || e.mode === 'demi') h += `<g ${o}><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#8C96A5" stroke-width="1.4" stroke-dasharray="5 4"/>`
    + arTxt(cx, cy + 9, 'A', AR_ENCRE, false).replace('font-size="14"', 'font-size="26" font-weight="700"') + arTxt(cx, cy + R + 22, 'même aire A', '#4E5665', false) + '</g>';
  if(e.cotes){
    const haut = y0 + k - R - 12, bas = y0 + R + 14;
    h += `<g ${o}>` + arDoubleFleche([x0, haut], [x0 + L, haut]) + arTxt(x0 + L / 2, haut - 6, 'π × r', AR_VERT)
      + arDoubleFleche([x0 - (e.mode === 'demi' ? 0 : s), bas], [x0 + L - (e.mode === 'demi' ? 0 : s), bas]) + arTxt(x0 + L / 2 - (e.mode === 'demi' ? 0 : s / 2), bas + 17, 'π × r', AR_BLEU);
    if(e.mode === 'demi') h += arDoubleFleche([x0 + L + 14, y0], [x0 + L + 14, y0 + R]) + arTxt(x0 + L + 26, y0 + R / 2 + 5, 'r');
    else h += arTxt(x0 - s / 2 - 10, y0 + k / 2 + 4, 'r');
    h += '</g>';
  }
  if(e.rect) h += `<rect x="${f(x0)}" y="${f(y0)}" width="${f(L)}" height="${R}" fill="none" stroke="${AR_ENCRE}" stroke-width="1.4" stroke-dasharray="5 4" ${o}/>`;
  if(e.fin) h += `<g ${o}>` + arTxt(x0 + L / 2, 222, 'A = π × r × r = π × r²', AR_ENCRE, false).replace('font-size="14"', 'font-size="17" font-weight="700"') + '</g>';
  return AR_DEFS + h;
}
function arDqAller(i, anime){
  cancelAnimationFrame(arDq.raf);
  const e = AR_DQ_ETAPES[i], cible = arDqPlacer(e), svg = document.getElementById('ar-disqueSvg'); if(!svg) return;
  arDq.i = i;
  document.getElementById('ar-disqueNote').innerHTML = e.note;
  const b = document.getElementById('ar-dqSuiv'); if(b) b.disabled = i >= AR_DQ_ETAPES.length - 1;
  const avant = new Map((arDq.pieces || []).map(p => [p.id, p]));
  arDq.pieces = cible;
  if(!anime || !avant.size){ svg.innerHTML = arDqDessin(cible, e, 1); return; }
  // Départ de chaque part : sa position précédente, celle de la part dont elle est une moitié, sinon elle apparaît.
  const dep = cible.map(p => { const q = avant.get(p.id) || avant.get(p.parent); return q ? Object.assign({}, q, { t0: p.t0, t1: p.t1, op: 1 }) : Object.assign({}, p, { op: 0 }); });
  const partent = [...avant.values()].filter(q => !cible.some(p => p.id === q.id || p.parent === q.id));
  const duree = partent.length ? 900 : e.mode === 'coupe' ? 600 : 1500, t0 = performance.now();
  const lisse = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const pas = now => {
    const t = Math.min(1, (now - t0) / duree), u = lisse(t);
    const cur = cible.map((p, k) => { const d = dep[k], dr = ((p.rot - d.rot) % 360 + 540) % 360 - 180;
      return Object.assign({}, p, { x: d.x + (p.x - d.x) * u, y: d.y + (p.y - d.y) * u, rot: d.rot + dr * u, op: d.op + (1 - d.op) * u }); });
    partent.forEach(q => cur.push(Object.assign({}, q, { op: 1 - u })));
    svg.innerHTML = arDqDessin(cur, e, Math.max(0, (t - .6) / .4));
    if(t < 1) arDq.raf = requestAnimationFrame(pas);
  };
  arDq.raf = requestAnimationFrame(pas);
}
function arDqSuivant(){ if(arDq.i < AR_DQ_ETAPES.length - 1) arDqAller(arDq.i + 1, true); }
function arDisque(){ arDq.pieces = null; arDqAller(0, false); }

/* ---- Méthode 4 : formulaire interactif ---- */
const AR_CHAMPS = [[['L', 'Longueur L', 6], ['l', 'Largeur ℓ', 4]], [['c', 'Côté c', 5]], [['r', 'Rayon r', 3]], [['a', 'Côté a', 6], ['b', 'Côté b', 4]], [['b', 'Base b', 8], ['h', 'Hauteur h', 5]], [['b', 'Base b', 7], ['h', 'Hauteur h', 3]]];
function arCalc(nouveauChoix){
  const i = Number(document.getElementById('ar-choix').value), champs = AR_CHAMPS[i], zone = document.getElementById('ar-champs');
  if(nouveauChoix || !zone.children.length) zone.innerHTML = champs.map(([k, lab, v]) => `<label style="margin:0 4px;">${lab} <input data-k="${k}" type="number" min="0" step="any" value="${v}" oninput="arCalc()" style="width:80px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>`).join('');
  const v = {}; zone.querySelectorAll('input').forEach(inp => { v[inp.dataset.k] = Number(inp.value) || 0; });
  const t = x => arNum(x).replace(',', '{,}');
  const formules = [
    () => [`L \\times \\ell = ${t(v.L)} \\times ${t(v.l)}`, v.L * v.l],
    () => [`c \\times c = ${t(v.c)} \\times ${t(v.c)}`, v.c * v.c],
    () => [`\\pi \\times r^2 = \\pi \\times ${t(v.r)}^2 = ${t(v.r * v.r)}\\pi`, Math.PI * v.r * v.r],
    () => [`\\dfrac{a \\times b}{2} = \\dfrac{${t(v.a)} \\times ${t(v.b)}}{2}`, v.a * v.b / 2],
    () => [`\\dfrac{b \\times h}{2} = \\dfrac{${t(v.b)} \\times ${t(v.h)}}{2}`, v.b * v.h / 2],
    () => [`b \\times h = ${t(v.b)} \\times ${t(v.h)}`, v.b * v.h],
  ];
  const [expr, res] = formules[i](), exact = Math.abs(Math.round(res * 100) / 100 - res) < 1e-9;
  const out = document.getElementById('ar-calcul');
  out.innerHTML = `<span class="tex">\\mathcal{A} = ${expr} ${exact ? '=' : '\\approx'} ${t(res)}</span>`;
  renderStaticMath(out);
}

/* ---- Méthode 5 : figure composée ---- */
const AR_COMPOSE_STEPS = [
  { expr: 'Figure = rectangle + demi-disque', note: 'On découpe la figure en figures usuelles.' },
  { expr: '<span class="tex">\\mathcal{A}_{\\text{rectangle}} = 20 \\times 12 = 240</span> m²', note: 'Aire du rectangle : L × ℓ.' },
  { expr: 'Rayon du demi-disque : 12 ÷ 2 = 6 m', note: 'Le diamètre est le côté de 12 m.' },
  { expr: '<span class="tex">\\mathcal{A}_{\\text{demi-disque}} = \\dfrac{\\pi \\times 6^2}{2} = 18\\pi</span> m²', note: 'Un demi-disque, c\'est la moitié de l\'aire du disque.' },
  { expr: '<span class="tex">\\mathcal{A} = 240 + 18\\pi \\approx 296{,}55</span> m²', note: 'On additionne : valeur exacte 240 + 18π, valeur arrondie au centième 296,55 m².' },
];
const arComposeDemo = makeStepDemo(AR_COMPOSE_STEPS, 'ar-composeDisplay');

DEMO_REGISTRY['5e|Aires'] = {
  cours: 'cours-demo-aires-5e', methode: 'methode-demo-aires-5e', exos: 'exos-demo-aires-5e', histoire: 'histoire-demo-aires-5e',
  init: () => {
    arParaReset(); arTriReset(); arDisque(); arCalc(true); arComposeDemo.reset();
    ['cours-demo-aires-5e', 'exos-demo-aires-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-aires-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-aires-5e'));
  }
};

DEMO_QUIZZES['5e|Aires'] = [
  { q: 'L\'aire d\'un rectangle de 8 cm sur 3 cm est...', opts: ['11 cm²', '24 cm²', '22 cm²'], correct: 1 },
  { q: 'L\'aire d\'un triangle de base 10 cm et de hauteur 4 cm est...', opts: ['40 cm²', '20 cm²', '14 cm²'], correct: 1 },
  { q: 'L\'aire d\'un parallélogramme se calcule avec...', opts: ['b × h', '(b × h) ÷ 2', 'la somme des côtés'], correct: 0 },
  { q: 'La formule de l\'aire d\'un disque de rayon r est...', opts: ['2 × π × r', 'π × r²', 'π × d'], correct: 1 },
  { q: 'Un disque a un diamètre de 8 cm. Son aire exacte est...', opts: ['64π cm²', '16π cm²', '8π cm²'], correct: 1 },
  { q: 'La valeur exacte de l\'aire d\'un disque de rayon 5 cm est...', opts: ['25π cm²', '78,54 cm²', '10π cm²'], correct: 0 },
  { q: 'Pour l\'aire d\'une figure avec un trou, on...', opts: ['additionne l\'aire du trou', 'soustrait l\'aire du trou', 'ignore le trou'], correct: 1 },
];

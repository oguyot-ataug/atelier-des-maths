/* ============================================================
   CHAPITRE : Aire et périmètre (6e, M1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Premier chapitre de la catégorie M (Mesures) : aucune convention de
   figure n'existait pour ce thème, tout est en SVG brut (même choix
   que D1 en son temps).

   §1 Périmètre et aire d'une figure : définitions générales, figure
   sur quadrillage (aire en carreaux, périmètre en unités de longueur
   du quadrillage) -- valeurs différentes du support papier.
   §2 Périmètres de figures usuelles (rectangle/carré/cercle) +
   exemple numérique (périmètre d'un cercle).
   §3 Aires de figures usuelles (rectangle/carré) + exemple numérique.
   §4 Unités d'aire : le m² et ses sous-multiples, tableau de
   conversions, deux exemples numériques (valeurs différentes du
   support papier).

   Toutes les valeurs numériques ci-dessous ont été calculées et
   vérifiées avant intégration (aire/périmètre de la figure sur
   quadrillage, périmètre du cercle avec π exact vs valeur arrondie,
   conversions d'unités d'aire).

   Méthode/exercices/histoire laissés en placeholder pour une
   prochaine session, comme pour D1/D2/G6 en leur temps.
   ============================================================ */

document.getElementById('cours-demo-aire-perimetre').innerHTML = `

<div class="lesson-header"><span class="num">1</span><h3>Périmètre et aire d'une figure</h3></div>

<span class="def-badge">Définitions</span>
<div class="def-box">
  <ul class="example-list" style="margin:0;">
    <li>Le <b>périmètre</b> d'une figure est la mesure de la longueur de son contour, exprimée dans une unité de longueur donnée.</li>
    <li>L'<b>aire</b> d'une figure est la mesure de sa surface, exprimée dans une unité d'aire donnée.</li>
  </ul>
</div>

<p class="example-title" style="margin-top:0;">Exemple :</p>
<div class="figure-wrap" style="max-width:220px;margin:12px auto;">
  <svg viewBox="0 0 170 170" style="width:100%;display:block;">
    <line x1="20" y1="20" x2="20" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="46" y1="20" x2="46" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="72" y1="20" x2="72" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="98" y1="20" x2="98" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="124" y1="20" x2="124" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="150" y1="20" x2="150" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="20" x2="150" y2="20" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="46" x2="150" y2="46" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="72" x2="150" y2="72" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="98" x2="150" y2="98" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="124" x2="150" y2="124" stroke="#D7DEE5" stroke-width="1"/>
    <line x1="20" y1="150" x2="150" y2="150" stroke="#D7DEE5" stroke-width="1"/>
    <polygon points="20,20 124,20 124,72 72,72 72,124 20,124" fill="rgba(227,93,58,.25)" stroke="#E35D3A" stroke-width="2"/>
  </svg>
</div>
<ul class="example-list">
  <li>Le <b>périmètre</b> de la figure orange est de <b>16 unités de longueur</b> (celle du quadrillage).</li>
  <li>Son <b>aire</b> est de <b>12 carreaux</b> (celle du quadrillage).</li>
</ul>
<p class="hint" style="margin:10px 0 0;">Remarque : l'aire d'une figure dépend de l'unité d'aire choisie. Il faut donc toujours préciser celle qui est utilisée.</p>

<div class="lesson-header"><span class="num">2</span><h3>Périmètres de figures usuelles</h3></div>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:12px 0;justify-content:center;">
  <div style="text-align:center;">
    <svg viewBox="0 0 170 120" style="width:160px;display:block;">
      <rect x="20" y="30" width="120" height="60" fill="none" stroke="#E35D3A" stroke-width="2"/>
      <line x1="20" y1="98" x2="140" y2="98" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="20" y1="94" x2="20" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="140" y1="94" x2="140" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <text x="76" y="112" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">L</text>
      <line x1="150" y1="30" x2="150" y2="90" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="146" y1="30" x2="154" y2="30" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="146" y1="90" x2="154" y2="90" stroke="#1C1B2E" stroke-width="1"/>
      <text x="158" y="64" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">l</text>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Périmètre <span class="tex">= 2 \\times (L + l)</span></p>
  </div>
  <div style="text-align:center;">
    <svg viewBox="0 0 130 120" style="width:120px;display:block;">
      <rect x="20" y="20" width="70" height="70" fill="none" stroke="#2EA8C9" stroke-width="2"/>
      <line x1="20" y1="98" x2="90" y2="98" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="20" y1="94" x2="20" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="90" y1="94" x2="90" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <text x="52" y="112" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">c</text>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Périmètre <span class="tex">= 4 \\times c</span></p>
  </div>
  <div style="text-align:center;">
    <svg viewBox="0 0 130 130" style="width:120px;display:block;">
      <circle cx="65" cy="65" r="45" fill="none" stroke="#F8AF23" stroke-width="2"/>
      <line x1="65" y1="65" x2="65" y2="20" stroke="#1C1B2E" stroke-width="1.4"/>
      <text x="70" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">r</text>
      <circle cx="65" cy="65" r="2" fill="#1C1B2E"/>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Périmètre <span class="tex">= 2 \\times r \\times \\pi</span></p>
  </div>
</div>

<p class="example-title">Exemple :</p>
<p style="margin:4px 0 10px;">Quel est le périmètre d'un cercle de rayon 5 cm ?</p>
<div class="redaction-block">
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Périmètre <span class="tex">= 2 \\times r \\times \\pi</span></span><span class="we-comment">On écrit la formule.</span></div>
    <div class="we-row"><span class="we-expr">Périmètre <span class="tex">= 2 \\times 5\\text{ cm} \\times \\pi</span></span><span class="we-comment">On remplace r par 5 cm.</span></div>
    <div class="we-row"><span class="we-expr">Périmètre <span class="tex">= 10\\pi \\text{ cm}</span></span><span class="we-comment">On obtient la valeur exacte.</span></div>
    <div class="we-row"><span class="we-expr">Périmètre <span class="tex">\\approx 31{,}42 \\text{ cm}</span></span><span class="we-comment">On utilise la touche π de la calculatrice, on obtient la valeur arrondie au centième.</span></div>
  </div>
</div>
<p style="margin:4px 0 0;">Le périmètre d'un cercle de rayon 5 cm est <span class="tex">10\\pi</span> cm, soit environ <b>31,42 cm</b>.</p>

<div class="lesson-header"><span class="num">3</span><h3>Aires de figures usuelles</h3></div>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:12px 0;justify-content:center;">
  <div style="text-align:center;">
    <svg viewBox="0 0 170 120" style="width:160px;display:block;">
      <rect x="20" y="30" width="120" height="60" fill="rgba(227,93,58,.18)" stroke="#E35D3A" stroke-width="2"/>
      <line x1="20" y1="98" x2="140" y2="98" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="20" y1="94" x2="20" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="140" y1="94" x2="140" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <text x="76" y="112" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">L</text>
      <line x1="150" y1="30" x2="150" y2="90" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="146" y1="30" x2="154" y2="30" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="146" y1="90" x2="154" y2="90" stroke="#1C1B2E" stroke-width="1"/>
      <text x="158" y="64" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">l</text>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Aire <span class="tex">= L \\times l</span></p>
  </div>
  <div style="text-align:center;">
    <svg viewBox="0 0 130 120" style="width:120px;display:block;">
      <rect x="20" y="20" width="70" height="70" fill="rgba(46,168,201,.18)" stroke="#2EA8C9" stroke-width="2"/>
      <line x1="20" y1="98" x2="90" y2="98" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="20" y1="94" x2="20" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <line x1="90" y1="94" x2="90" y2="102" stroke="#1C1B2E" stroke-width="1"/>
      <text x="52" y="112" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">c</text>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Aire <span class="tex">= c \\times c</span></p>
  </div>
</div>

<p class="example-title">Exemple : quelles sont les aires du rectangle et du carré ci-dessous ?</p>
<p style="margin:4px 0 10px;">Un rectangle de longueur 6 cm et de largeur 4 cm, un carré de côté 5 cm.</p>
<ul class="example-list">
  <li>Aire du rectangle <span class="tex">= L \\times l = 6\\text{ cm} \\times 4\\text{ cm} = 24\\text{ cm}^2</span></li>
  <li>Aire du carré <span class="tex">= c \\times c = 5\\text{ cm} \\times 5\\text{ cm} = 25\\text{ cm}^2</span></li>
</ul>

<div class="lesson-header"><span class="num">4</span><h3>Unités d'aire</h3></div>

<p class="example-title" style="margin-top:0;">A. Le mètre carré et ses sous-multiples</p>
<span class="prop-badge">Règle</span>
<div class="def-box">L'unité d'aire usuelle est le <b>mètre carré</b> (noté m²), qui représente l'aire d'un carré d'un mètre de côté. On utilise aussi ses <b>sous-multiples</b> : dm², cm², mm².</div>
<ul class="example-list">
  <li>Un centimètre carré (cm²) est l'aire d'un carré d'un centimètre de côté.</li>
  <li>Un millimètre carré (mm²) est l'aire d'un carré d'un millimètre de côté.</li>
</ul>
<div class="figure-wrap" style="max-width:180px;margin:10px auto;">
  <svg viewBox="0 0 120 100" style="width:100%;display:block;">
    <line x1="36" y1="20" x2="36" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="26" x2="90" y2="26" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="42" y1="20" x2="42" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="32" x2="90" y2="32" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="48" y1="20" x2="48" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="38" x2="90" y2="38" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="54" y1="20" x2="54" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="44" x2="90" y2="44" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="60" y1="20" x2="60" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="50" x2="90" y2="50" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="66" y1="20" x2="66" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="56" x2="90" y2="56" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="72" y1="20" x2="72" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="62" x2="90" y2="62" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="78" y1="20" x2="78" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="68" x2="90" y2="68" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="84" y1="20" x2="84" y2="80" stroke="#B9E8C4" stroke-width="0.6"/>
    <line x1="30" y1="74" x2="90" y2="74" stroke="#B9E8C4" stroke-width="0.6"/>
    <rect x="30" y="20" width="60" height="60" fill="none" stroke="#1C1B2E" stroke-width="1.8"/>
    <rect x="30" y="20" width="6" height="6" fill="#E35D3A" opacity=".55"/>
    <text x="96" y="16" font-family="Space Grotesk" font-size="10" fill="#1F3A5C">1 cm²</text>
    <text x="94" y="26" font-family="Space Grotesk" font-size="9" fill="#E35D3A">1 mm²</text>
    <text x="46" y="94" font-family="Space Grotesk" font-size="10" fill="#1F3A5C">10 mm</text>
  </svg>
</div>
<p style="margin:0;">Dans 1 cm², il y a <b>100 mm²</b>.</p>

<p class="example-title" style="margin-top:22px;">B. Conversions</p>
<table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.9rem;margin:10px 0;">
  <tbody>
    <tr>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);background:rgba(191,220,251,.3);">1 m² = 100 dm²</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);"><span class="tex">1\\text{ dm}^2 = \\dfrac{1}{100}\\text{ m}^2 = 0{,}01\\text{ m}^2</span></td>
    </tr>
    <tr>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);background:rgba(191,220,251,.3);">1 dm² = 100 cm²</td>
      <td style="padding:10px 14px;border:1px solid rgba(28,43,57,.12);"><span class="tex">1\\text{ cm}^2 = \\dfrac{1}{100}\\text{ dm}^2 = 0{,}01\\text{ dm}^2</span></td>
    </tr>
  </tbody>
</table>

<p class="example-title">Exemple 1 : convertis 6,2 dm² en cm² et 350 dm² en m².</p>
<ul class="example-list">
  <li>La mesure exprimée en cm² est cent fois plus grande que la mesure exprimée en dm². La mesure exprimée en m² est cent fois plus petite que la mesure exprimée en dm².</li>
  <li>Donc <span class="tex">6{,}2\\text{ dm}^2 = 620\\text{ cm}^2</span> et <span class="tex">350\\text{ dm}^2 = 3{,}5\\text{ m}^2</span>.</li>
</ul>

<p class="example-title">Exemple 2 : convertis 0,527 dm² en cm² et 8,3 cm² en dm².</p>
<ul class="example-list">
  <li><span class="tex">0{,}527\\text{ dm}^2 = 52{,}7\\text{ cm}^2</span> et <span class="tex">8{,}3\\text{ cm}^2 = 0{,}083\\text{ dm}^2</span>.</li>
</ul>

<p class="example-title" style="margin-top:18px;">Remarques :</p>
<ul class="example-list">
  <li>Pour passer d'une unité d'aire à l'unité immédiatement inférieure, <b>on multiplie par 100</b>.</li>
  <li>Pour passer d'une unité d'aire à l'unité immédiatement supérieure, <b>on divise par 100</b>.</li>
</ul>
`;

document.getElementById('methode-demo-aire-perimetre').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-aire-perimetre').innerHTML = `
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Aire et périmètre'] = {
  cours:'cours-demo-aire-perimetre', methode:'methode-demo-aire-perimetre', exos:'exos-demo-aire-perimetre',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-aire-perimetre'));
    renderStaticMath(document.getElementById('methode-demo-aire-perimetre'));
    renderStaticMath(document.getElementById('exos-demo-aire-perimetre'));
    injectCourseAddButtons(document.getElementById('cours-demo-aire-perimetre'));
    injectCourseAddButtons(document.getElementById('methode-demo-aire-perimetre'));
  }
};

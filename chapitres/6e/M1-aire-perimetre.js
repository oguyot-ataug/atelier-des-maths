/* ============================================================
   CHAPITRE : Aire et périmètre (6e, M1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Premier chapitre de la catégorie M (Mesures) : aucune convention de
   figure n'existait pour ce thème, tout est en SVG brut (même choix
   que D1 en son temps).

   §1 Périmètre et aire d'une figure : définitions générales, figure
   sur quadrillage (aire en carreaux, périmètre en unités de longueur
   du quadrillage) -- valeurs différentes du support papier.
   §2 Périmètres et longueurs de figures usuelles (rectangle/carré/
   cercle, avec la distinction cercle=longueur / disque=périmètre) +
   exemple numérique (longueur d'un cercle, formule avec r et avec D).
   §3 Aires de figures usuelles (rectangle/carré) + exemple numérique.
   §4 Unités d'aire : le m² et ses sous-multiples, tableau de
   conversions, deux exemples numériques (valeurs différentes du
   support papier).

   Toutes les valeurs numériques ci-dessous ont été calculées et
   vérifiées avant intégration (aire/périmètre de la figure sur
   quadrillage, longueur du cercle avec π exact vs valeur arrondie,
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

<div class="lesson-header"><span class="num">2</span><h3>Périmètres et longueurs de figures usuelles</h3></div>

<div class="def-box" style="margin-bottom:14px;">Le <b>cercle</b> est une courbe (une ligne) : on parle de sa <b>longueur</b>. Le <b>disque</b> est la surface qu'il délimite : on parle de son <b>périmètre</b> (qui est la longueur du cercle qui le borde) et de son <b>aire</b>.</div>

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
    <svg viewBox="0 0 130 140" style="width:120px;display:block;">
      <circle cx="65" cy="65" r="45" fill="none" stroke="#F8AF23" stroke-width="2"/>
      <line x1="20" y1="65" x2="110" y2="65" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="3 3"/>
      <line x1="65" y1="65" x2="65" y2="20" stroke="#1C1B2E" stroke-width="1.4"/>
      <text x="70" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">r</text>
      <text x="60" y="128" font-family="Space Grotesk" font-size="13" fill="#6B7A8C">D</text>
      <circle cx="65" cy="65" r="2" fill="#1C1B2E"/>
    </svg>
    <p class="hint" style="margin:2px 0 0;">Longueur <span class="tex">= 2 \\times \\pi \\times r = \\pi \\times D</span></p>
  </div>
</div>

<p class="example-title">Exemple :</p>
<p style="margin:4px 0 10px;">Quelle est la longueur d'un cercle de rayon 5 cm ?</p>
<div class="redaction-block">
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Longueur <span class="tex">= 2 \\times \\pi \\times r</span></span><span class="we-comment">On écrit la formule.</span></div>
    <div class="we-row"><span class="we-expr">Longueur <span class="tex">= 2 \\times \\pi \\times 5\\text{ cm}</span></span><span class="we-comment">On remplace r par 5 cm.</span></div>
    <div class="we-row"><span class="we-expr">Longueur <span class="tex">= 10\\pi \\text{ cm}</span></span><span class="we-comment">On obtient la valeur exacte.</span></div>
    <div class="we-row"><span class="we-expr">Longueur <span class="tex">\\approx 31{,}42 \\text{ cm}</span></span><span class="we-comment">On utilise la touche π de la calculatrice, on obtient la valeur arrondie au centième.</span></div>
  </div>
</div>
<p style="margin:4px 0 0;">La longueur d'un cercle de rayon 5 cm est <span class="tex">10\\pi</span> cm, soit environ <b>31,42 cm</b>. On peut aussi la calculer avec le diamètre : <span class="tex">D = 2 \\times r = 10</span> cm, donc Longueur <span class="tex">= \\pi \\times D = \\pi \\times 10\\text{ cm} = 10\\pi</span> cm — on retrouve bien le même résultat.</p>

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
<div class="sub-header"><span class="letter">M</span><h4>Utiliser un tableau de conversion des aires</h4></div>

<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour les <b>terrains</b>, on utilise aussi deux unités d'aire particulières :
  <ul class="example-list" style="margin:8px 0 0;">
    <li>L'<b>are</b> (noté a) est une autre écriture du <b>dam²</b> : c'est l'aire d'un carré de 10 m de côté, soit <b>100 m²</b>.</li>
    <li>L'<b>hectare</b> (noté ha) est une autre écriture du <b>hm²</b> : c'est l'aire d'un carré de 100 m de côté, soit <b>100 a</b>, soit <b>10 000 m²</b>.</li>
  </ul>
</div>

<p class="hint" style="margin:10px 0;">Comme chaque unité d'aire vaut 100 fois la suivante, chaque colonne du tableau de conversion occupe <b>deux cases</b> (au lieu d'une seule pour les longueurs).</p>

<div class="figure-wrap" style="max-width:520px;margin:12px auto;overflow-x:auto;">
  <table id="convAireTable" style="border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:.82rem;margin:0 auto;">
    <thead>
      <tr>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:#EDEDED;font-family:'Space Grotesk',sans-serif;">km²</th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:rgba(248,175,35,.28);font-family:'Space Grotesk',sans-serif;" id="convAireHeadHa">hm²<br><span style="font-size:.72rem;font-weight:400;">(ha)</span></th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:rgba(46,168,201,.22);font-family:'Space Grotesk',sans-serif;" id="convAireHeadA">dam²<br><span style="font-size:.72rem;font-weight:400;">(a)</span></th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:#EDEDED;font-family:'Space Grotesk',sans-serif;">m²</th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:#EDEDED;font-family:'Space Grotesk',sans-serif;">dm²</th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:#EDEDED;font-family:'Space Grotesk',sans-serif;">cm²</th>
        <th colspan="2" style="padding:6px 4px;border:1px solid rgba(28,43,57,.15);background:#EDEDED;font-family:'Space Grotesk',sans-serif;">mm²</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td id="cellkm2-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellkm2-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellha-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellha-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cella-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cella-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellm2-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellm2-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="celldm2-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="celldm2-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellcm2-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellcm2-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellmm2-1" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
        <td id="cellmm2-2" class="conv-cell" style="width:26px;height:30px;text-align:center;border:1px solid rgba(28,43,57,.15);"></td>
      </tr>
    </tbody>
  </table>
  <p class="hint" style="text-align:center;margin:8px 0 0;" id="convAireResult"></p>
</div>
<div class="figure-wrap">
  <div class="step-list" id="convAireSteps">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>On veut convertir <b>3,25 ha</b>. On repère que <b>ha</b> correspond à la colonne <b>hm²</b> (surlignée), et <b>a</b> à la colonne <b>dam²</b> (surlignée).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>La partie entière (3) s'écrit dans la case des <b>unités de la colonne ha</b>.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>La partie décimale (25) continue dans les deux cases de la colonne <b>a</b>, juste à droite.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>Pour lire le résultat <b>en a</b> : on lit tous les chiffres jusqu'à la colonne a incluse → <b>325 a</b>.</div></div>
    <div class="step-item" data-step="5"><div class="step-num">5</div><div>Pour lire le résultat <b>en m²</b> : on lit tous les chiffres jusqu'à la colonne m² incluse → <b>32 500 m²</b>.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnConvAireNext" onclick="convAireNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="convAireReset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-aire-perimetre').innerHTML = `
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

/* ================= Tableau de conversion des aires (are/hectare) =================
   7 unités × 2 colonnes chacune (km² à mm²), car chaque unité d'aire vaut 100 fois la
   suivante. Exemple choisi (3,25 ha) volontairement "propre" : aucun reste au-delà de
   la colonne m² (325 a et 32 500 m² sont des valeurs exactes), pour ne pas alourdir la
   démonstration avec des zéros jusqu'en mm². Valeurs vérifiées : 3,25 ha × 100 = 325 a ;
   325 a × 100 = 32 500 m². */
let convAireStep = 0;
function convAireReset(){
  convAireStep = 0;
  ['km2-1','km2-2','ha-1','ha-2','a-1','a-2','m2-1','m2-2','dm2-1','dm2-2','cm2-1','cm2-2','mm2-1','mm2-2'].forEach(id=>{
    const el = document.getElementById('cell'+id);
    el.textContent = ''; el.style.background = ''; el.style.fontWeight = '400';
  });
  document.getElementById('convAireHeadHa').style.outline = '';
  document.getElementById('convAireHeadA').style.outline = '';
  document.getElementById('convAireResult').textContent = '';
  document.querySelectorAll('#convAireSteps .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnConvAireNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function convAireNextStep(){
  convAireStep++;
  const btn = document.getElementById('btnConvAireNext');
  const markDone = n=>document.querySelector(`#convAireSteps .step-item[data-step="${n}"]`).classList.add('done');
  const setCell = (id, val, hi)=>{
    const el = document.getElementById('cell'+id);
    el.textContent = val;
    if(hi){ el.style.background = hi; el.style.fontWeight = '700'; }
  };
  if(convAireStep===1){
    document.getElementById('convAireHeadHa').style.outline = '2px solid #F8AF23';
    document.getElementById('convAireHeadA').style.outline = '2px solid #2EA8C9';
    markDone(1);
  } else if(convAireStep===2){
    setCell('ha-1', '0'); setCell('ha-2', '3', 'rgba(248,175,35,.35)');
    markDone(2);
  } else if(convAireStep===3){
    setCell('a-1', '2', 'rgba(46,168,201,.28)'); setCell('a-2', '5', 'rgba(46,168,201,.28)');
    markDone(3);
  } else if(convAireStep===4){
    document.getElementById('convAireResult').innerHTML = '<span class="tex">3{,}25 \\text{ ha} = 325 \\text{ a}</span>';
    renderStaticMath(document.getElementById('convAireResult'));
    markDone(4);
  } else if(convAireStep===5){
    setCell('m2-1', '0'); setCell('m2-2', '0');
    document.getElementById('convAireResult').innerHTML = '<span class="tex">3{,}25 \\text{ ha} = 325 \\text{ a} = 32\\,500 \\text{ m}^2</span>';
    renderStaticMath(document.getElementById('convAireResult'));
    markDone(5);
    btn.textContent = 'Terminé ✓'; btn.disabled = true;
    return;
  }
  btn.disabled = false;
}


document.getElementById('histoire-demo-aire-perimetre').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  <p style="margin:0 0 12px;">Avant la Révolution française, mesurer un terrain était un vrai casse-tête. L'unité la plus courante, l'<b>arpent</b>, changeait de valeur selon l'endroit : un arpent de Paris valait environ 34 ares, un « arpent commun » environ 42 ares, et un arpent « royal » (celui des eaux et forêts) environ 51 ares. Ailleurs en France, selon les provinces, un arpent pouvait valoir de 32 à 78 ares — plus du double d'un bout à l'autre du pays, sous le même nom ! Il existait aussi le <b>journal</b>, la surface qu'un homme pouvait labourer en une seule journée, qui variait elle aussi selon la qualité du sol.</p>
  <div class="figure-wrap" style="max-width:340px;margin:4px auto 14px;">
    <svg viewBox="0 0 340 150" style="width:100%;display:block;">
      <rect x="10.0" y="87.4" width="52.6" height="52.6" fill="rgba(227,93,58,.22)" stroke="#E35D3A" stroke-width="1.6"/>
      <rect x="76.6" y="81.5" width="58.5" height="58.5" fill="rgba(248,175,35,.22)" stroke="#F8AF23" stroke-width="1.6"/>
      <rect x="149.1" y="75.7" width="64.3" height="64.3" fill="rgba(46,168,201,.22)" stroke="#2EA8C9" stroke-width="1.6"/>
      <rect x="227.4" y="50.0" width="90.0" height="90.0" fill="none" stroke="#1C1B2E" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="36" y="147" font-family="Space Grotesk" font-size="11" fill="#1F3A5C" text-anchor="middle">Paris</text>
      <text x="36" y="159" font-family="Space Grotesk" font-size="10" fill="#6B7A8C" text-anchor="middle">34 a</text>
      <text x="106" y="147" font-family="Space Grotesk" font-size="11" fill="#1F3A5C" text-anchor="middle">commun</text>
      <text x="106" y="159" font-family="Space Grotesk" font-size="10" fill="#6B7A8C" text-anchor="middle">42 a</text>
      <text x="181" y="147" font-family="Space Grotesk" font-size="11" fill="#1F3A5C" text-anchor="middle">royal</text>
      <text x="181" y="159" font-family="Space Grotesk" font-size="10" fill="#6B7A8C" text-anchor="middle">51 a</text>
      <text x="272" y="147" font-family="Space Grotesk" font-size="11" fill="#1F3A5C" text-anchor="middle">1 hectare</text>
      <text x="272" y="159" font-family="Space Grotesk" font-size="10" fill="#6B7A8C" text-anchor="middle">100 a</text>
    </svg>
    <p class="hint" style="text-align:center;margin:2px 0 0;">Carrés proportionnels à l'aire : « un arpent » ne représentait pas du tout la même surface partout.</p>
  </div>
  <p style="margin:0 0 12px;">Ce chaos posait de vrais problèmes : acheter, vendre ou faire payer l'impôt sur un terrain devenait injuste dès qu'on changeait de région, puisque le même mot ne représentait pas la même surface. C'est pour y mettre fin qu'en 1795, en même temps que le mètre (voir l'histoire du chapitre sur les triangles), les révolutionnaires créent l'<b>are</b> : une unité d'aire unique, valable partout en France, qui ne dépend d'aucune coutume locale. L'<b>hectare</b> (100 a) suit naturellement pour les grandes surfaces comme les fermes.</p>
  <p style="margin:0;">Le changement n'a pourtant pas été immédiat : malgré la loi de 1795, les anciennes unités sont restées si ancrées dans les habitudes qu'il a fallu attendre une loi de 1837 pour rendre le système métrique <b>obligatoire</b> partout en France, à partir du 1er janvier 1840 — 45 ans plus tard ! Dans certaines campagnes, arpents et journaux ont continué à être utilisés dans les conversations bien après cette date.</p>
  <p class="hint" style="margin:12px 0 0;">Pour aller plus loin : le problème inverse, transformer un cercle en carré de même aire (la « quadrature du cercle »), a occupé les mathématiciens pendant plus de 2000 ans, avant qu'on démontre en 1882 que c'est en réalité impossible avec une règle et un compas.</p>
</div>
`;

DEMO_REGISTRY['6e|Aire et périmètre'] = {
  cours:'cours-demo-aire-perimetre', methode:'methode-demo-aire-perimetre', exos:'exos-demo-aire-perimetre', histoire:'histoire-demo-aire-perimetre',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-aire-perimetre'));
    renderStaticMath(document.getElementById('methode-demo-aire-perimetre'));
    renderStaticMath(document.getElementById('exos-demo-aire-perimetre'));
    renderStaticMath(document.getElementById('histoire-demo-aire-perimetre'));
    injectCourseAddButtons(document.getElementById('cours-demo-aire-perimetre'));
    injectCourseAddButtons(document.getElementById('methode-demo-aire-perimetre'));
    convAireReset();
  }
};

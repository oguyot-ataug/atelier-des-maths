/* ============================================================
   CHAPITRE : Gestion de données (6e, D1)
   Cours complet (tableaux, diagramme en barres, diagramme circulaire).
   Toutes les valeurs numériques (hauteurs de barres, angles du
   diagramme circulaire) calculées et vérifiées avant intégration.
   Méthode/exercices/histoire en placeholder pour une prochaine session.
   ============================================================ */

document.getElementById('cours-demo-gestion-donnees').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Tableaux</h3></div>

<span class="prop-badge">Règle</span>
<div class="def-box">Un tableau permet de <b>regrouper</b> et d'<b>organiser</b> des données, de lire <b>facilement</b> les informations.</div>

<p class="example-title">Exemple : on considère les tableaux ci-dessous.</p>
<div style="display:flex;gap:20px;flex-wrap:wrap;margin:14px 0;">
  <table style="flex:1;min-width:240px;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.92rem;">
    <thead>
      <tr style="background:#1F3A5C;color:#fff;">
        <th style="padding:9px 12px;text-align:left;font-family:'Space Grotesk',sans-serif;">Continent</th>
        <th style="padding:9px 12px;text-align:right;font-family:'Space Grotesk',sans-serif;">Population en 1995<br>en millions d'habitants</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Afrique</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">728</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Asie</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">3 458</td></tr>
      <tr style="background:rgba(248,175,35,.30);"><td style="padding:8px 12px;font-weight:700;border-bottom:1px solid rgba(28,43,57,.12);">Europe</td><td style="padding:8px 12px;text-align:right;font-weight:700;border-bottom:1px solid rgba(28,43,57,.12);">727</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Amérique</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">775</td></tr>
      <tr><td style="padding:8px 12px;">Océanie</td><td style="padding:8px 12px;text-align:right;">28</td></tr>
    </tbody>
  </table>
  <table style="flex:1;min-width:240px;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.92rem;">
    <thead>
      <tr style="background:#1F3A5C;color:#fff;">
        <th style="padding:9px 12px;text-align:left;font-family:'Space Grotesk',sans-serif;">Continent</th>
        <th style="padding:9px 12px;text-align:right;font-family:'Space Grotesk',sans-serif;">Population en 2022<br>en millions d'habitants</th>
      </tr>
    </thead>
    <tbody>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Afrique</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">1 419</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Asie</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">4 730</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Europe</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">742</td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid rgba(28,43,57,.12);">Amérique</td><td style="padding:8px 12px;text-align:right;border-bottom:1px solid rgba(28,43,57,.12);">1 028</td></tr>
      <tr style="background:rgba(227,93,58,.20);"><td style="padding:8px 12px;font-weight:700;">Océanie</td><td style="padding:8px 12px;text-align:right;font-weight:700;">55</td></tr>
    </tbody>
  </table>
</div>
<ul class="example-list">
  <li>Le nombre <b>727</b> indique que l'Europe comptait 727 millions d'habitants en 1995.</li>
  <li>Le nombre <b>55</b> indique que l'Océanie comptait 55 millions d'habitants en 2022.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Représentations graphiques et interprétations</h3></div>

<p class="example-title" style="margin-top:0;">A. Diagramme en barres</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Dans un diagramme en barres, les <b>hauteurs des barres</b> sont <b>proportionnelles</b> aux quantités représentées.</div>
<p class="example-title">Exemple :</p>
<p>Ce diagramme en barres représente la population en 1995 et en 2022, en millions d'habitants, par continent.</p>
<div class="figure-wrap" style="max-width:420px;margin:12px auto;">
  <svg viewBox="0 0 380 280" style="width:100%;display:block;">
    <line x1="50" y1="20" x2="50" y2="240" stroke="#1C1B2E" stroke-width="1.4"/>
    <line x1="50" y1="240" x2="370" y2="240" stroke="#1C1B2E" stroke-width="1.4"/>
    <text x="4" y="16" font-family="Inter" font-size="9" fill="#6B7280">Population</text>
    <text x="4" y="26" font-family="Inter" font-size="9" fill="#6B7280">millions</text>
    ${[0,500,1000,1500,2000,2500,3000,3500,4000,4500,5000].map(v=>{
      const y = 240 - v/5000*220;
      return `<line x1="47" y1="${y}" x2="370" y2="${y}" stroke="#E4DFD6" stroke-width="1"/><text x="10" y="${y+3}" font-family="JetBrains Mono" font-size="8" fill="#6B7280">${v}</text>`;
    }).join('')}
    <g>
      <rect x="65" y="208.0" width="14" height="32.0" fill="#2EA8C9"/>
      <rect x="81" y="177.6" width="14" height="62.4" fill="#2E7D5B"/>
      <text x="72" y="252" font-family="Inter" font-size="9" fill="#1C1B2E" text-anchor="middle">Afrique</text>

      <rect x="130" y="87.8" width="14" height="152.2" fill="#2EA8C9"/>
      <rect x="146" y="31.9" width="14" height="208.1" fill="#2E7D5B"/>
      <text x="137" y="252" font-family="Inter" font-size="9" fill="#1C1B2E" text-anchor="middle">Asie</text>

      <rect x="195" y="208.0" width="14" height="32.0" fill="#2EA8C9"/>
      <rect x="211" y="207.4" width="14" height="32.6" fill="#2E7D5B"/>
      <text x="202" y="252" font-family="Inter" font-size="9" fill="#1C1B2E" text-anchor="middle">Europe</text>

      <rect x="260" y="205.9" width="14" height="34.1" fill="#2EA8C9"/>
      <rect x="276" y="194.8" width="14" height="45.2" fill="#2E7D5B"/>
      <text x="267" y="252" font-family="Inter" font-size="9" fill="#1C1B2E" text-anchor="middle">Amérique</text>

      <rect x="325" y="238.8" width="14" height="1.2" fill="#2EA8C9"/>
      <rect x="341" y="237.6" width="14" height="2.4" fill="#2E7D5B"/>
      <text x="332" y="252" font-family="Inter" font-size="9" fill="#1C1B2E" text-anchor="middle">Océanie</text>
    </g>
    <rect x="120" y="10" width="12" height="12" fill="#2EA8C9"/>
    <text x="136" y="20" font-family="Inter" font-size="9" fill="#1C1B2E">Population en 1995</text>
    <rect x="250" y="10" width="12" height="12" fill="#2E7D5B"/>
    <text x="266" y="20" font-family="Inter" font-size="9" fill="#1C1B2E">Population en 2022</text>
  </svg>
</div>
<ul class="example-list">
  <li>On peut voir que la population en Asie est la plus importante des cinq continents.</li>
</ul>

<p class="example-title" style="margin-top:26px;">B. Diagramme circulaire</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Dans un diagramme circulaire, les <b>mesures des angles</b> sont <b>proportionnelles</b> aux quantités représentées.</div>
<p class="example-title">Exemple :</p>
<p>Ce diagramme circulaire représente la population en 2022, en millions d'habitants, par continent.</p>
<div class="figure-wrap" style="max-width:300px;margin:12px auto;">
  <svg viewBox="0 0 300 300" style="width:100%;display:block;">
    <path d="M 150 150 L 150.0 30.0 A 120 120 0 0 1 257.9 97.5 Z" fill="#1F3A5C" stroke="#fff" stroke-width="1.5"/>
    <path d="M 150 150 L 257.9 97.5 A 120 120 0 1 1 31.1 134.1 Z" fill="#E35D3A" stroke="#fff" stroke-width="1.5"/>
    <path d="M 150 150 L 31.1 134.1 A 120 120 0 0 1 59.6 71.1 Z" fill="#F8AF23" stroke="#fff" stroke-width="1.5"/>
    <path d="M 150 150 L 59.6 71.1 A 120 120 0 0 1 144.8 30.1 Z" fill="#2E7D5B" stroke="#fff" stroke-width="1.5"/>
    <path d="M 150 150 L 144.8 30.1 A 120 120 0 0 1 150.0 30.0 Z" fill="#1C1B2E" stroke="#fff" stroke-width="1.5"/>
  </svg>
  <div style="display:flex;flex-wrap:wrap;gap:10px 18px;justify-content:center;margin-top:10px;font-family:'Inter',sans-serif;font-size:.85rem;">
    <span><span style="display:inline-block;width:11px;height:11px;background:#1F3A5C;border-radius:2px;margin-right:5px;"></span>Afrique</span>
    <span><span style="display:inline-block;width:11px;height:11px;background:#E35D3A;border-radius:2px;margin-right:5px;"></span>Asie</span>
    <span><span style="display:inline-block;width:11px;height:11px;background:#F8AF23;border-radius:2px;margin-right:5px;"></span>Europe</span>
    <span><span style="display:inline-block;width:11px;height:11px;background:#2E7D5B;border-radius:2px;margin-right:5px;"></span>Amérique</span>
    <span><span style="display:inline-block;width:11px;height:11px;background:#1C1B2E;border-radius:2px;margin-right:5px;"></span>Océanie</span>
  </div>
</div>
<ul class="example-list">
  <li>On peut voir que plus de la moitié de la population en 2022 se trouve en Asie car le secteur orange mesure plus de 180°.</li>
</ul>
`;

document.getElementById('methode-demo-gestion-donnees').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Construire un diagramme en barres</h4></div>
<p class="hint" style="margin:8px 0;">On considère le tableau suivant : nombre d'élèves par niveau dans un collège.</p>
<table style="border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.9rem;margin:8px 0 14px;">
  <thead><tr style="background:#1F3A5C;color:#fff;"><th style="padding:7px 14px;">Niveau</th><th style="padding:7px 14px;">6e</th><th style="padding:7px 14px;">5e</th><th style="padding:7px 14px;">4e</th><th style="padding:7px 14px;">3e</th></tr></thead>
  <tbody><tr><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);font-weight:700;">Élèves</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">120</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">110</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">105</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">98</td></tr></tbody>
</table>
<div class="figure-wrap" style="max-width:340px;margin:12px auto;">
  <svg id="gdBarSvg" viewBox="0 0 320 250" style="width:100%;display:block;">
    <line x1="40" y1="20" x2="40" y2="220" stroke="#1C1B2E" stroke-width="1.4"/>
    <line x1="40" y1="220" x2="300" y2="220" stroke="#1C1B2E" stroke-width="1.4"/>
    ${[0,20,40,60,80,100,120,140].map(v=>{
      const y=220-v/140*200;
      return `<line x1="37" y1="${y}" x2="300" y2="${y}" stroke="#E4DFD6" stroke-width="1"/><text x="4" y="${y+3}" font-family="JetBrains Mono" font-size="8" fill="#6B7280">${v}</text>`;
    }).join('')}
    <rect id="gdBar6e" x="65" y="220" width="40" height="0" fill="#2EA8C9"/>
    <rect id="gdBar5e" x="130" y="220" width="40" height="0" fill="#2EA8C9"/>
    <rect id="gdBar4e" x="195" y="220" width="40" height="0" fill="#2EA8C9"/>
    <rect id="gdBar3e" x="260" y="220" width="40" height="0" fill="#2EA8C9"/>
    <text id="gdVal6e" x="85" y="215" font-family="JetBrains Mono" font-size="10" fill="#1C1B2E" text-anchor="middle" opacity="0"></text>
    <text id="gdVal5e" x="150" y="215" font-family="JetBrains Mono" font-size="10" fill="#1C1B2E" text-anchor="middle" opacity="0"></text>
    <text id="gdVal4e" x="215" y="215" font-family="JetBrains Mono" font-size="10" fill="#1C1B2E" text-anchor="middle" opacity="0"></text>
    <text id="gdVal3e" x="280" y="215" font-family="JetBrains Mono" font-size="10" fill="#1C1B2E" text-anchor="middle" opacity="0"></text>
    <text x="85" y="235" font-family="Inter" font-size="10" fill="#1C1B2E" text-anchor="middle">6e</text>
    <text x="150" y="235" font-family="Inter" font-size="10" fill="#1C1B2E" text-anchor="middle">5e</text>
    <text x="215" y="235" font-family="Inter" font-size="10" fill="#1C1B2E" text-anchor="middle">4e</text>
    <text x="280" y="235" font-family="Inter" font-size="10" fill="#1C1B2E" text-anchor="middle">3e</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnGdBarNext" onclick="gdBarNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="gdBarReset()">Revoir depuis le début</button>
  </div>
</div>
<div class="step-list" id="gdBarSteps">
  <div class="step-item" data-step="1"><div class="step-num">1</div><div>On trace deux axes perpendiculaires, et on gradue l'axe vertical selon les valeurs à représenter.</div></div>
  <div class="step-item" data-step="2"><div class="step-num">2</div><div>Pour le niveau 6e (120 élèves), on trace une barre dont la hauteur est proportionnelle à 120.</div></div>
  <div class="step-item" data-step="3"><div class="step-num">3</div><div>Pour le niveau 5e (110 élèves), on trace une barre dont la hauteur est proportionnelle à 110.</div></div>
  <div class="step-item" data-step="4"><div class="step-num">4</div><div>Pour le niveau 4e (105 élèves), on trace une barre dont la hauteur est proportionnelle à 105.</div></div>
  <div class="step-item" data-step="5"><div class="step-num">5</div><div>Pour le niveau 3e (98 élèves), on trace une barre dont la hauteur est proportionnelle à 98.</div></div>
</div>

<div class="sub-header" style="margin-top:28px;"><span class="letter">M</span><h4>Construire un diagramme circulaire</h4></div>
<p class="hint" style="margin:8px 0;">On considère le tableau suivant : sport pratiqué par les 25 élèves d'une classe.</p>
<table style="border-collapse:collapse;font-family:'Inter',sans-serif;font-size:.9rem;margin:8px 0 14px;">
  <thead><tr style="background:#1F3A5C;color:#fff;"><th style="padding:7px 14px;">Sport</th><th style="padding:7px 14px;">Football</th><th style="padding:7px 14px;">Basket</th><th style="padding:7px 14px;">Natation</th><th style="padding:7px 14px;">Autre</th></tr></thead>
  <tbody><tr><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);font-weight:700;">Élèves</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">10</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">6</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">4</td><td style="padding:6px 14px;border-bottom:1px solid rgba(28,43,57,.12);text-align:center;">5</td></tr></tbody>
</table>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg id="gdPieSvg" viewBox="0 0 220 220" style="width:100%;display:block;">
    <circle cx="110" cy="110" r="90" fill="none" stroke="#E4DFD6" stroke-width="1"/>
    <path id="gdPieFootball" fill="#2EA8C9" stroke="#fff" stroke-width="1.5" opacity="0"/>
    <path id="gdPieBasket" fill="#E35D3A" stroke="#fff" stroke-width="1.5" opacity="0"/>
    <path id="gdPieNatation" fill="#F8AF23" stroke="#fff" stroke-width="1.5" opacity="0"/>
    <path id="gdPieAutre" fill="#2E7D5B" stroke="#fff" stroke-width="1.5" opacity="0"/>
  </svg>
  <p id="gdPieCalc" class="hint" style="text-align:center;min-height:40px;"></p>
  <div class="figure-toolbar">
    <button class="btn" id="btnGdPieNext" onclick="gdPieNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="gdPieReset()">Revoir depuis le début</button>
  </div>
</div>
<div class="step-list" id="gdPieSteps">
  <div class="step-item" data-step="1"><div class="step-num">1</div><div>On calcule le total des effectifs : <span class="tex">10+6+4+5=25</span> élèves.</div></div>
  <div class="step-item" data-step="2"><div class="step-num">2</div><div>Football : <span class="tex">\\dfrac{10}{25} \\times 360 = 144°</span>. On trace le secteur correspondant.</div></div>
  <div class="step-item" data-step="3"><div class="step-num">3</div><div>Basket : <span class="tex">\\dfrac{6}{25} \\times 360 = 86{,}4°</span>. On trace le secteur correspondant.</div></div>
  <div class="step-item" data-step="4"><div class="step-num">4</div><div>Natation : <span class="tex">\\dfrac{4}{25} \\times 360 = 57{,}6°</span>. On trace le secteur correspondant.</div></div>
  <div class="step-item" data-step="5"><div class="step-num">5</div><div>Autre : <span class="tex">\\dfrac{5}{25} \\times 360 = 72°</span>. On trace le secteur correspondant, ce qui referme le cercle.</div></div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;margin-top:20px;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-gestion-donnees').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Interpréter un secteur d'un diagramme circulaire »</h3>
  <p style="margin:4px 0 10px;">Un diagramme circulaire représente le sport pratiqué par les 25 élèves d'une classe. <b>Peut-on dire que plus de la moitié des élèves pratiquent le football ?</b></p>
  <div class="figure-wrap" style="max-width:220px;margin:0 auto 14px;">
    <svg viewBox="0 0 220 220" style="width:100%;display:block;">
      <path d="M 110 110 L 110.0 20.0 A 90 90 0 0 1 162.9 182.8 Z" fill="#2EA8C9" stroke="#fff" stroke-width="1.5"/>
      <path d="M 110 110 L 162.9 182.8 A 90 90 0 0 1 40.7 167.4 Z" fill="#E35D3A" stroke="#fff" stroke-width="1.5"/>
      <path d="M 110 110 L 40.7 167.4 A 90 90 0 0 1 24.4 82.2 Z" fill="#F8AF23" stroke="#fff" stroke-width="1.5"/>
      <path d="M 110 110 L 24.4 82.2 A 90 90 0 0 1 110.0 20.0 Z" fill="#2E7D5B" stroke="#fff" stroke-width="1.5"/>
      <text x="162.3" y="93.0" font-family="Space Grotesk" font-size="13" font-weight="700" fill="#fff" text-anchor="middle">144°</text>
    </svg>
    <div style="display:flex;flex-wrap:wrap;gap:8px 14px;justify-content:center;margin-top:8px;font-family:'Inter',sans-serif;font-size:.8rem;">
      <span><span style="display:inline-block;width:10px;height:10px;background:#2EA8C9;border-radius:2px;margin-right:4px;"></span>Football</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#E35D3A;border-radius:2px;margin-right:4px;"></span>Basket</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#F8AF23;border-radius:2px;margin-right:4px;"></span>Natation</span>
      <span><span style="display:inline-block;width:10px;height:10px;background:#2E7D5B;border-radius:2px;margin-right:4px;"></span>Autre</span>
    </div>
  </div>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Le secteur associé à Football mesure 144°.</span><span class="we-comment">On relève la mesure de l'angle.</span></div>
    <div class="we-row"><span class="we-expr">Or, 144° &lt; 180°.</span><span class="we-comment">On compare à 180° (un demi-tour).</span></div>
    <div class="we-row"><span class="we-expr">Donc moins de la moitié des élèves pratiquent le football.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Un club de sport compte 40 adhérents : 18 font de la natation, 12 du tennis, et 10 de la gymnastique. Construis un tableau présentant ces informations.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    En utilisant le tableau de l'exercice 1, construis un diagramme en barres représentant le nombre d'adhérents par activité.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    En utilisant le tableau de l'exercice 1, calcule la mesure de l'angle associé à chaque activité dans un diagramme circulaire, puis construis ce diagramme.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Un diagramme circulaire représente la répartition des 900 élèves d'un collège par niveau. Le secteur associé aux élèves de 6e mesure 100°. Calcule le nombre d'élèves de 6e dans ce collège.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Sur un diagramme circulaire représentant les 30 élèves d'une classe selon leur mode de transport, le secteur « à pied » mesure 168°. Explique pourquoi plus de la moitié des élèves viennent à pied. Rédige ta réponse.
  </div>
</div>
`;

document.getElementById('histoire-demo-gestion-donnees').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Représenter des données par des dessins plutôt que par des nombres bruts est une invention étonnamment récente : c'est l'ingénieur et économiste écossais <b>William Playfair</b> qui, à la toute fin du XVIIIe siècle, invente à peu près seul le diagramme en barres et le diagramme circulaire, dans son <i>Commercial and Political Atlas</i> (1786) puis dans son <i>Statistical Breviary</i> (1801), pour représenter les échanges commerciaux entre pays. Playfair défendait l'idée qu'un bon graphique permet de comprendre en quelques secondes ce que des pages entières de tableaux de chiffres mettraient de longues minutes à faire comprendre. Ses idées mettront pourtant du temps à s'imposer : c'est seulement plus d'un demi-siècle plus tard que l'infirmière britannique <b>Florence Nightingale</b> popularise ce type de représentation, avec un diagramme circulaire de sa création (le « diagramme en rose ») pour convaincre l'armée britannique que la plupart des soldats mouraient de maladies évitables plutôt que de blessures de guerre, contribuant ainsi à une réforme complète des hôpitaux militaires.
</div>
`;

/* ================= Méthode : construction du diagramme en barres ================= */
const GD_BAR_DATA = {'6e':{id:'gdBar6e', val:'gdVal6e', h:171.4, n:120}, '5e':{id:'gdBar5e', val:'gdVal5e', h:157.1, n:110}, '4e':{id:'gdBar4e', val:'gdVal4e', h:150.0, n:105}, '3e':{id:'gdBar3e', val:'gdVal3e', h:140.0, n:98}};
let gdBarStep = 0;
function gdBarReset(){
  gdBarStep = 0;
  Object.values(GD_BAR_DATA).forEach(d=>{
    document.getElementById(d.id).setAttribute('height','0'); document.getElementById(d.id).setAttribute('y','220');
    document.getElementById(d.val).setAttribute('opacity','0');
  });
  document.querySelectorAll('#gdBarSteps .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnGdBarNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function gdBarNextStep(){
  gdBarStep++;
  const btn = document.getElementById('btnGdBarNext');
  const markDone = n=>document.querySelector(`#gdBarSteps .step-item[data-step="${n}"]`).classList.add('done');
  if(gdBarStep===1){ markDone(1); return; }
  const keys = Object.keys(GD_BAR_DATA);
  const key = keys[gdBarStep-2];
  if(!key){ btn.textContent='Terminé ✓'; btn.disabled=true; return; }
  const d = GD_BAR_DATA[key];
  btn.disabled = true;
  const rect = document.getElementById(d.id), label = document.getElementById(d.val);
  const start = performance.now(), dur=700;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const h = d.h*t;
    rect.setAttribute('height', h.toFixed(1)); rect.setAttribute('y', (220-h).toFixed(1));
    if(t<1){ requestAnimationFrame(frame); return; }
    label.textContent = d.n; label.setAttribute('y', (220-h-6).toFixed(1)); label.setAttribute('opacity','1');
    markDone(gdBarStep);
    btn.disabled = false;
    if(gdBarStep===5){ btn.textContent='Terminé ✓'; btn.disabled=true; }
  }
  requestAnimationFrame(frame);
}

/* ================= Méthode : construction du diagramme circulaire ================= */
const GD_PIE_DATA = [
  {id:'gdPieFootball', d:'M 110 110 L 110.0 20.0 A 90 90 0 0 1 162.9 182.8 Z', calc:'<span class="tex">\\dfrac{10}{25} \\times 360 = 144°</span>'},
  {id:'gdPieBasket', d:'M 110 110 L 162.9 182.8 A 90 90 0 0 1 40.7 167.4 Z', calc:'<span class="tex">\\dfrac{6}{25} \\times 360 = 86{,}4°</span>'},
  {id:'gdPieNatation', d:'M 110 110 L 40.7 167.4 A 90 90 0 0 1 24.4 82.2 Z', calc:'<span class="tex">\\dfrac{4}{25} \\times 360 = 57{,}6°</span>'},
  {id:'gdPieAutre', d:'M 110 110 L 24.4 82.2 A 90 90 0 0 1 110.0 20.0 Z', calc:'<span class="tex">\\dfrac{5}{25} \\times 360 = 72°</span>'},
];
let gdPieStep = 0;
function gdPieReset(){
  gdPieStep = 0;
  GD_PIE_DATA.forEach(d=>{ const el=document.getElementById(d.id); el.setAttribute('opacity','0'); el.removeAttribute('d'); });
  document.getElementById('gdPieCalc').innerHTML = '';
  document.querySelectorAll('#gdPieSteps .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnGdPieNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function gdPieNextStep(){
  gdPieStep++;
  const btn = document.getElementById('btnGdPieNext');
  const markDone = n=>document.querySelector(`#gdPieSteps .step-item[data-step="${n}"]`).classList.add('done');
  if(gdPieStep===1){
    document.getElementById('gdPieCalc').innerHTML = 'Total : <span class="tex">10+6+4+5=25</span> élèves.';
    renderStaticMath(document.getElementById('gdPieCalc'));
    markDone(1);
    return;
  }
  const idx = gdPieStep-2;
  const d = GD_PIE_DATA[idx];
  if(!d){ btn.textContent='Terminé ✓'; btn.disabled=true; return; }
  const el = document.getElementById(d.id);
  el.setAttribute('d', d.d); el.setAttribute('opacity','1');
  document.getElementById('gdPieCalc').innerHTML = d.calc;
  renderStaticMath(document.getElementById('gdPieCalc'));
  markDone(gdPieStep);
  if(gdPieStep===5){ btn.textContent='Terminé ✓'; btn.disabled=true; }
}

DEMO_REGISTRY['6e|Gestion de données'] = {
  cours:'cours-demo-gestion-donnees', methode:'methode-demo-gestion-donnees', exos:'exos-demo-gestion-donnees', histoire:'histoire-demo-gestion-donnees',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-gestion-donnees'));
    renderStaticMath(document.getElementById('methode-demo-gestion-donnees'));
    renderStaticMath(document.getElementById('exos-demo-gestion-donnees'));
    renderStaticMath(document.getElementById('histoire-demo-gestion-donnees'));
    injectCourseAddButtons(document.getElementById('cours-demo-gestion-donnees'));
    injectCourseAddButtons(document.getElementById('methode-demo-gestion-donnees'));
    gdBarReset(); gdPieReset();
  }
};


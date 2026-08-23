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
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-gestion-donnees').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Gestion de données'] = {
  cours:'cours-demo-gestion-donnees', methode:'methode-demo-gestion-donnees', exos:'exos-demo-gestion-donnees',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-gestion-donnees'));
    renderStaticMath(document.getElementById('methode-demo-gestion-donnees'));
    renderStaticMath(document.getElementById('exos-demo-gestion-donnees'));
    injectCourseAddButtons(document.getElementById('cours-demo-gestion-donnees'));
    injectCourseAddButtons(document.getElementById('methode-demo-gestion-donnees'));
  }
};

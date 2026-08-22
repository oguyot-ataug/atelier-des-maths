/* ============================================================
   CHAPITRE : Symétrie axiale (6e, G4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Cours complet (5 sections : figures symétriques, symétrie d'un
   point, propriétés, axe de symétrie d'un segment -- médiatrice --,
   axe de symétrie d'un angle -- bissectrice). Les constructions aux
   outils (équerre/règle, compas, médiatrice et bissectrice à la
   règle et au compas) sont prévues pour l'onglet Méthode, dans une
   prochaine session -- même approche que G5 Construction de
   triangles : cours d'abord, avec verification numerique systematique
   de chaque figure avant integration.
   ============================================================ */

document.getElementById('cours-demo-symetrie-axiale-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Figures symétriques</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Deux figures sont <b>symétriques</b> par rapport à une droite si elles se superposent par pliage le long de cette droite, appelée l'<b>axe de symétrie</b>.</div>
<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:300px;margin:12px auto;">
  <svg viewBox="0 0 280 160" style="width:100%;display:block;">
    <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <polygon points="60,60 100,60 100,100 80,120 60,100" fill="rgba(31,58,92,.10)" stroke="#1F3A5C" stroke-width="1.8"/>
    <polygon id="symF1Right" points="140,60 140,60 140,100 140,120 140,100" fill="rgba(227,93,58,.10)" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
    <text x="145" y="20" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnSymF1Next" onclick="symF1NextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="symF1Reset()">Revoir depuis le début</button>
  </div>
</div>
<p style="margin:4px 0 0;">Les deux figures se superposent par pliage le long de la droite <b>(d)</b> : elles sont donc symétriques par rapport à <b>(d)</b>.</p>
<p style="margin:8px 0 0;">Deux points sont symétriques par rapport à une droite s'ils se superposent par pliage le long de cette droite.</p>

<div class="lesson-header"><span class="num">2</span><h3>Symétrie d'un point</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Le <b>symétrique</b> d'un point M par rapport à une droite (d) est le point M' tel que <b>(d) soit la médiatrice</b> du segment [MM'] (c'est-à-dire tel que (d) soit perpendiculaire au segment [MM'] en son milieu).</div>
<p class="example-title">Exemple : construis M', symétrique du point M par rapport à la droite (d).</p>
<p class="hint" style="margin:0 0 8px;">Axe horizontal ou vertical :</p>
<div class="figure-wrap" style="max-width:320px;margin:12px auto;">
  <svg viewBox="0 0 260 140" style="width:100%;display:block;">
    <defs>
      <pattern id="gridSymAxiale" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4DFD6" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="260" height="140" fill="url(#gridSymAxiale)"/>
    <line x1="140" y1="0" x2="140" y2="140" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF2Line" x1="80" y1="60" x2="80" y2="60" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
    <circle cx="80" cy="60" r="3" fill="#1F3A5C"/>
    <circle id="symF2Mp" cx="200" cy="60" r="3" fill="#1F3A5C" opacity="0"/>
    <text x="70" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF2MpLabel" x="204" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700" opacity="0">M'</text>
    <text x="145" y="16" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnSymF2Next" onclick="symF2NextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="symF2Reset()">Revoir depuis le début</button>
  </div>
</div>
<p style="margin:4px 0 0;">M et M' sont situés à la même distance de <b>(d)</b>, de part et d'autre, sur une perpendiculaire à <b>(d)</b>. On compte le nombre de carreaux de M jusqu'à <b>(d)</b> (ici 3), et on reporte le même nombre de carreaux de l'autre côté de <b>(d)</b>.</p>

<p class="hint" style="margin:16px 0 8px;">Axe en diagonale : on rejoint <b>(d)</b> à l'horizontale en comptant les carreaux, puis on redescend à la verticale en comptant le <b>même nombre</b> de carreaux.</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 200 180" style="width:100%;display:block;">
    <rect x="0" y="0" width="200" height="180" fill="url(#gridSymAxiale)"/>
    <line x1="10" y1="170" x2="190" y2="-10" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF3LineH" x1="60" y1="60" x2="60" y2="60" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <line id="symF3LineV" x1="120" y1="60" x2="120" y2="60" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <text id="symF3H1" x="66" y="56" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">1</text>
    <text id="symF3H2" x="86" y="56" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">2</text>
    <text id="symF3H3" x="106" y="56" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">3</text>
    <text id="symF3V1" x="125" y="76" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">1</text>
    <text id="symF3V2" x="125" y="96" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">2</text>
    <text id="symF3V3" x="125" y="116" font-family="JetBrains Mono" font-size="10" fill="#6B7280" opacity="0">3</text>
    <circle cx="60" cy="60" r="3" fill="#1F3A5C"/>
    <circle id="symF3H" cx="120" cy="60" r="2" fill="#9CA3AF" opacity="0"/>
    <circle id="symF3Mp" cx="120" cy="120" r="3" fill="#1F3A5C" opacity="0"/>
    <text x="46" y="56" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF3MpLabel" x="126" y="128" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700" opacity="0">M'</text>
    <text x="150" y="30" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnSymF3Next" onclick="symF3NextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="symF3Reset()">Revoir depuis le début</button>
  </div>
</div>
<p style="margin:4px 0 0;">De M, on avance à l'horizontale jusqu'à <b>(d)</b> : 3 carreaux. À partir de ce point de <b>(d)</b>, on redescend à la verticale en comptant les 3 mêmes carreaux : on trouve <b>M'</b>.</p>
<div class="def-box" style="margin-top:12px;">
  <p style="margin:0;">Si un point appartient à l'axe de symétrie, alors son symétrique est le point lui-même.</p>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Propriétés de la symétrie axiale</h3></div>

<span class="prop-badge">Propriété 1</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'une droite</p>
<div class="def-box">Le symétrique d'une droite par rapport à un axe est <b>une droite</b>. La symétrie axiale <b>conserve l'alignement</b>.</div>

<span class="prop-badge">Propriété 2</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un segment</p>
<div class="def-box">Le symétrique d'un segment par rapport à un axe est <b>un segment de même longueur</b>. La symétrie axiale <b>conserve les longueurs</b>.</div>
<p class="hint" style="margin:6px 0 0;">Remarque : le symétrique du milieu d'un segment est le milieu du segment symétrique.</p>

<span class="prop-badge">Propriété 3</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un cercle</p>
<div class="def-box">Le symétrique d'un cercle par rapport à un axe est <b>un cercle de même rayon</b>. Les centres de ces cercles sont symétriques par rapport à cet axe.</div>

<span class="prop-badge">Propriété 4</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un angle</p>
<div class="def-box">Le symétrique d'un angle est <b>un angle de même mesure</b>. La symétrie axiale <b>conserve les mesures des angles</b>.</div>
<p class="hint" style="margin:6px 0 0;">Remarque : pour construire le symétrique d'une figure complexe, on la décompose en figures usuelles et on construit le symétrique de chacune d'elles.</p>

<p class="example-title" style="margin-top:16px;">Exemples :</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin:10px 0;">
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'une droite</p>
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="60" y1="40" x2="110" y2="130" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF4Right" x1="140" y1="40" x2="140" y2="130" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
    </svg>
    <div class="figure-toolbar" style="justify-content:center;">
      <button class="btn" id="btnSymF4Next" onclick="symF4NextStep()" style="font-size:.78rem;padding:6px 12px;">Voir le symétrique</button>
    </div>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un segment</p>
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="60" y1="50" x2="100" y2="110" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF5Right" x1="140" y1="50" x2="140" y2="110" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
      <text x="48" y="48" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">C</text>
      <text x="104" y="118" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">D</text>
      <text id="symF5CpLabel" x="224" y="48" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700" opacity="0">C'</text>
      <text id="symF5DpLabel" x="160" y="118" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700" opacity="0">D'</text>
    </svg>
    <div class="figure-toolbar" style="justify-content:center;">
      <button class="btn" id="btnSymF5Next" onclick="symF5NextStep()" style="font-size:.78rem;padding:6px 12px;">Voir le symétrique</button>
    </div>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un cercle</p>
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line id="symF6Axis" x1="70" y1="80" x2="140" y2="80" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3" opacity="0"/>
      <circle cx="70" cy="80" r="35" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle cx="70" cy="80" r="2.5" fill="#1F3A5C"/>
      <circle id="symF6Right" cx="140" cy="80" r="0" fill="none" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
      <circle id="symF6RightCenter" cx="140" cy="80" r="2.5" fill="#E35D3A" opacity="0"/>
    </svg>
    <div class="figure-toolbar" style="justify-content:center;">
      <button class="btn" id="btnSymF6Next" onclick="symF6NextStep()" style="font-size:.78rem;padding:6px 12px;">Voir le symétrique</button>
    </div>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Axe de symétrie d'un segment</h3></div>

<span class="prop-badge">Propriété 1</span>
<div class="def-box">La <b>médiatrice</b> d'un segment est <b>un axe de symétrie</b> de ce segment.</div>

<span class="prop-badge">Propriétés 2</span>
<div class="def-box">
  <ul class="example-list" style="margin:0;">
    <li>Si un point appartient à la médiatrice d'un segment, alors <b>il est situé à égale distance des extrémités</b> de ce segment.</li>
    <li>Réciproquement, si un point est équidistant des extrémités d'un segment, alors <b>il appartient à la médiatrice</b> de ce segment.</li>
  </ul>
</div>
<p class="hint" style="margin:6px 0 0;">Remarque : si un point n'est pas sur la médiatrice d'un segment, alors il est plus proche de l'une des extrémités que de l'autre.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">La médiatrice d'un segment est <b>l'ensemble des points équidistants</b> des extrémités de ce segment.</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 240 170" style="width:100%;display:block;">
    <line id="symF7Axis" x1="120" y1="140" x2="120" y2="140" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="50" y1="140" x2="190" y2="140" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="symF7AP" x1="120" y1="140" x2="120" y2="140" stroke="#1C1B2E" stroke-width="1.4" opacity="0"/>
    <path id="symF7RightAngle" d="M 108 140 L 108 128 L 120 128 L 120 140" fill="none" stroke="#9CA3AF" stroke-width="1.1" opacity="0"/>
    <line id="symF7TickA" x1="82.9" y1="88.3" x2="87.1" y2="101.7" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <line id="symF7TickB" x1="157.1" y1="88.3" x2="152.9" y2="101.7" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <circle id="symF7P" cx="120" cy="50" r="3" fill="#1F3A5C" opacity="0"/>
    <text x="38" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="196" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
    <text id="symF7PLabel" x="126" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700" opacity="0">P</text>
    <text id="symF7DLabel" x="126" y="18" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700" opacity="0">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnSymF7Next" onclick="symF7NextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="symF7Reset()">Revoir depuis le début</button>
  </div>
</div>
<p style="margin:4px 0 0;"><b>(d)</b> est la médiatrice de <b>[AB]</b>. Le point <b>P</b>, situé sur <b>(d)</b>, est équidistant de <b>A</b> et de <b>B</b> : <b>PA = PB</b>.</p>

<div class="lesson-header"><span class="num">5</span><h3>Axe de symétrie d'un angle</h3></div>

<span class="prop-badge">Propriété</span>
<div class="def-box">La <b>bissectrice</b> d'un angle est <b>l'axe de symétrie</b> de cet angle.</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 250 190" style="width:100%;display:block;">
    <line x1="60" y1="170" x2="230" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="60" y1="170" x2="157.5" y2="30.7" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="symF8Bis" x1="60" y1="170" x2="60" y2="170" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <path id="symF8Arc1" d="M 92.0 170.0 A 32 32 0 0 0 88.4 155.2" fill="none" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <path id="symF8Arc2" d="M 88.4 155.2 A 32 32 0 0 0 78.4 143.8" fill="none" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <text x="42" y="180" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">O</text>
    <text x="234" y="176" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">x</text>
    <text x="152" y="24" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">y</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" id="btnSymF8Next" onclick="symF8NextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="symF8Reset()">Revoir depuis le début</button>
  </div>
</div>
<p style="margin:4px 0 0;">La demi-droite (en pointillés), <b>bissectrice</b> de l'angle <span class="tex">\\widehat{xOy}</span>, le partage en deux angles de même mesure.</p>
`;

document.getElementById('methode-demo-symetrie-axiale-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Constructions</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie (symétrique d'un point à l'équerre/à la règle/au compas, médiatrice et bissectrice à la règle et au compas) est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-symetrie-axiale-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

/* ================= Figure 1 : dépliage du drapeau (figures symétriques) ================= */
const symF1_axisX = 140;
const symF1_leftShape = [{x:60,y:60},{x:100,y:60},{x:100,y:100},{x:80,y:120},{x:60,y:100}];
const symF1_rightShape = symF1_leftShape.map(p=>({x:2*symF1_axisX-p.x, y:p.y}));
function symF1SetPoly(t){
  const pts = symF1_leftShape.map((lp,i)=>{
    const rp = symF1_rightShape[i];
    const x = symF1_axisX + (rp.x-symF1_axisX)*t;
    return `${x.toFixed(1)},${rp.y}`;
  });
  document.getElementById('symF1Right').setAttribute('points', pts.join(' '));
}
function symF1Reset(){
  symF1SetPoly(0);
  document.getElementById('symF1Right').setAttribute('opacity','0');
  const btn = document.getElementById('btnSymF1Next');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function symF1NextStep(){
  const btn = document.getElementById('btnSymF1Next');
  btn.disabled = true;
  document.getElementById('symF1Right').setAttribute('opacity','1');
  const start = performance.now(), dur=1200;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    symF1SetPoly(t);
    if(t<1){ requestAnimationFrame(frame); return; }
    btn.textContent='Terminé ✓'; btn.disabled=true;
  }
  requestAnimationFrame(frame);
}

/* ================= Figure 2 : symétrique d'un point, axe vertical ================= */
function symF2Reset(){
  const line = document.getElementById('symF2Line');
  line.setAttribute('x1','80'); line.setAttribute('y1','60'); line.setAttribute('x2','80'); line.setAttribute('y2','60');
  document.getElementById('symF2Mp').setAttribute('opacity','0');
  document.getElementById('symF2MpLabel').setAttribute('opacity','0');
  const btn = document.getElementById('btnSymF2Next');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function symF2NextStep(){
  const btn = document.getElementById('btnSymF2Next');
  btn.disabled = true;
  const line = document.getElementById('symF2Line');
  const curX2 = parseFloat(line.getAttribute('x2'));
  if(curX2 < 140){
    const start = performance.now(), dur=900;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      line.setAttribute('x2', (80+(140-80)*t).toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else {
    const start = performance.now(), dur=900;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      line.setAttribute('x2', (140+(200-140)*t).toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('symF2Mp').setAttribute('opacity','1');
      document.getElementById('symF2MpLabel').setAttribute('opacity','1');
      btn.textContent='Terminé ✓'; btn.disabled=true;
    }
    requestAnimationFrame(frame);
  }
}

/* ================= Figure 3 : symétrique d'un point, axe diagonal (horizontale puis verticale) ================= */
function symF3Reset(){
  const lh = document.getElementById('symF3LineH'), lv = document.getElementById('symF3LineV');
  lh.setAttribute('x2','60'); lh.setAttribute('y2','60');
  lv.setAttribute('x1','120'); lv.setAttribute('y1','60'); lv.setAttribute('x2','120'); lv.setAttribute('y2','60');
  ['symF3H1','symF3H2','symF3H3','symF3V1','symF3V2','symF3V3','symF3H','symF3Mp','symF3MpLabel'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  const btn = document.getElementById('btnSymF3Next');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function symF3NextStep(){
  const btn = document.getElementById('btnSymF3Next');
  btn.disabled = true;
  const lh = document.getElementById('symF3LineH');
  if(parseFloat(lh.getAttribute('x2')) < 120){
    const start = performance.now(), dur=1200;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const x = 60+(120-60)*t;
      lh.setAttribute('x2', x.toFixed(1));
      if(x>=80) document.getElementById('symF3H1').setAttribute('opacity','1');
      if(x>=100) document.getElementById('symF3H2').setAttribute('opacity','1');
      if(x>=119.5) document.getElementById('symF3H3').setAttribute('opacity','1');
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('symF3H').setAttribute('opacity','1');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else {
    const lv = document.getElementById('symF3LineV');
    const start = performance.now(), dur=1200;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const y = 60+(120-60)*t;
      lv.setAttribute('y2', y.toFixed(1));
      if(y>=80) document.getElementById('symF3V1').setAttribute('opacity','1');
      if(y>=100) document.getElementById('symF3V2').setAttribute('opacity','1');
      if(y>=119.5) document.getElementById('symF3V3').setAttribute('opacity','1');
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('symF3Mp').setAttribute('opacity','1');
      document.getElementById('symF3MpLabel').setAttribute('opacity','1');
      btn.textContent='Terminé ✓'; btn.disabled=true;
    }
    requestAnimationFrame(frame);
  }
}

/* ================= Figures 4/5/6 : symétrique d'une droite/segment/cercle (dépliage) ================= */
function symF4Reset(){
  const line = document.getElementById('symF4Right');
  line.setAttribute('opacity','0'); line.setAttribute('x1','140'); line.setAttribute('x2','140');
  const btn = document.getElementById('btnSymF4Next');
  btn.textContent = 'Voir le symétrique'; btn.disabled = false;
}
function symF5Reset(){
  const line = document.getElementById('symF5Right');
  line.setAttribute('opacity','0'); line.setAttribute('x1','140'); line.setAttribute('x2','140');
  document.getElementById('symF5CpLabel').setAttribute('opacity','0');
  document.getElementById('symF5DpLabel').setAttribute('opacity','0');
  const btn = document.getElementById('btnSymF5Next');
  btn.textContent = 'Voir le symétrique'; btn.disabled = false;
}
function symF6Reset(){
  const circle = document.getElementById('symF6Right'), centerDot = document.getElementById('symF6RightCenter'), axisLine = document.getElementById('symF6Axis');
  circle.setAttribute('opacity','0'); circle.setAttribute('cx','140'); circle.setAttribute('r','0');
  centerDot.setAttribute('opacity','0'); centerDot.setAttribute('cx','140');
  axisLine.setAttribute('opacity','0'); axisLine.setAttribute('x2','140');
  const btn = document.getElementById('btnSymF6Next');
  btn.textContent = 'Voir le symétrique'; btn.disabled = false;
}
function symF4NextStep(){
  const btn = document.getElementById('btnSymF4Next');
  btn.disabled = true;
  const line = document.getElementById('symF4Right');
  line.setAttribute('opacity','1');
  const axisX = 140, fx1=220, fy1=40, fx2=170, fy2=130;
  const start = performance.now(), dur=1000;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    line.setAttribute('x1', (axisX+(fx1-axisX)*t).toFixed(1)); line.setAttribute('y1', fy1);
    line.setAttribute('x2', (axisX+(fx2-axisX)*t).toFixed(1)); line.setAttribute('y2', fy2);
    if(t<1){ requestAnimationFrame(frame); return; }
    btn.textContent='Terminé ✓'; btn.disabled=true;
  }
  requestAnimationFrame(frame);
}
function symF5NextStep(){
  const btn = document.getElementById('btnSymF5Next');
  btn.disabled = true;
  const line = document.getElementById('symF5Right');
  line.setAttribute('opacity','1');
  const axisX = 140, fx1=220, fy1=50, fx2=180, fy2=110;
  const start = performance.now(), dur=1000;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    line.setAttribute('x1', (axisX+(fx1-axisX)*t).toFixed(1)); line.setAttribute('y1', fy1);
    line.setAttribute('x2', (axisX+(fx2-axisX)*t).toFixed(1)); line.setAttribute('y2', fy2);
    if(t<1){ requestAnimationFrame(frame); return; }
    document.getElementById('symF5CpLabel').setAttribute('opacity','1');
    document.getElementById('symF5DpLabel').setAttribute('opacity','1');
    btn.textContent='Terminé ✓'; btn.disabled=true;
  }
  requestAnimationFrame(frame);
}
function symF6NextStep(){
  const btn = document.getElementById('btnSymF6Next');
  btn.disabled = true;
  const circle = document.getElementById('symF6Right'), centerDot = document.getElementById('symF6RightCenter'), axisLine = document.getElementById('symF6Axis');
  circle.setAttribute('opacity','1'); centerDot.setAttribute('opacity','1'); axisLine.setAttribute('opacity','1');
  const axisX=140, fcx=210, fcy=80, fr=35;
  const start = performance.now(), dur=1200;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const cx = axisX+(fcx-axisX)*t, r = fr*t;
    circle.setAttribute('cx', cx.toFixed(1)); circle.setAttribute('cy', fcy); circle.setAttribute('r', r.toFixed(1));
    centerDot.setAttribute('cx', cx.toFixed(1)); centerDot.setAttribute('cy', fcy);
    axisLine.setAttribute('x2', cx.toFixed(1));
    if(t<1){ requestAnimationFrame(frame); return; }
    btn.textContent='Terminé ✓'; btn.disabled=true;
  }
  requestAnimationFrame(frame);
}

/* ================= Figure 7 : médiatrice (axe de symétrie d'un segment) ================= */
function symF7Reset(){
  const axis = document.getElementById('symF7Axis');
  axis.setAttribute('y1','140'); axis.setAttribute('y2','140');
  const ap = document.getElementById('symF7AP');
  ap.setAttribute('x1','120'); ap.setAttribute('y1','140'); ap.setAttribute('x2','120'); ap.setAttribute('y2','140');
  document.getElementById('symF7P').setAttribute('cy','140');
  ['symF7RightAngle','symF7AP','symF7TickA','symF7TickB','symF7P','symF7PLabel','symF7DLabel'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  const btn = document.getElementById('btnSymF7Next');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function symF7NextStep(){
  const btn = document.getElementById('btnSymF7Next');
  btn.disabled = true;
  const axis = document.getElementById('symF7Axis');
  if(parseFloat(axis.getAttribute('y1')) > 20){
    const start = performance.now(), dur=900;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      axis.setAttribute('y1', (140-(140-20)*t).toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('symF7RightAngle').setAttribute('opacity','1');
      document.getElementById('symF7DLabel').setAttribute('opacity','1');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else {
    const dot = document.getElementById('symF7P'), ap = document.getElementById('symF7AP');
    dot.setAttribute('opacity','1'); ap.setAttribute('opacity','1');
    const start = performance.now(), dur=900;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const y = 140-(140-50)*t;
      dot.setAttribute('cy', y.toFixed(1));
      ap.setAttribute('y2', y.toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('symF7PLabel').setAttribute('opacity','1');
      document.getElementById('symF7TickA').setAttribute('opacity','1');
      document.getElementById('symF7TickB').setAttribute('opacity','1');
      btn.textContent='Terminé ✓'; btn.disabled=true;
    }
    requestAnimationFrame(frame);
  }
}

/* ================= Figure 8 : bissectrice (axe de symétrie d'un angle) ================= */
function symF8Reset(){
  const bis = document.getElementById('symF8Bis');
  bis.setAttribute('x2','60'); bis.setAttribute('y2','170');
  document.getElementById('symF8Arc1').setAttribute('opacity','0');
  document.getElementById('symF8Arc2').setAttribute('opacity','0');
  const btn = document.getElementById('btnSymF8Next');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function symF8NextStep(){
  const btn = document.getElementById('btnSymF8Next');
  btn.disabled = true;
  const bis = document.getElementById('symF8Bis');
  if(parseFloat(bis.getAttribute('x2')) < 197){
    const O={x:60,y:170}, target={x:197.5,y:98.4};
    const start = performance.now(), dur=900;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      bis.setAttribute('x2', (O.x+(target.x-O.x)*t).toFixed(1));
      bis.setAttribute('y2', (O.y+(target.y-O.y)*t).toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else {
    document.getElementById('symF8Arc1').setAttribute('opacity','1');
    document.getElementById('symF8Arc2').setAttribute('opacity','1');
    btn.textContent='Terminé ✓'; btn.disabled=true;
  }
}

DEMO_REGISTRY['6e|Symétrie axiale'] = {
  cours:'cours-demo-symetrie-axiale-6e', methode:'methode-demo-symetrie-axiale-6e', exos:'exos-demo-symetrie-axiale-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('methode-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('exos-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-symetrie-axiale-6e'));
    symF1Reset(); symF2Reset(); symF3Reset(); symF4Reset(); symF5Reset(); symF6Reset(); symF7Reset(); symF8Reset();
  }
};

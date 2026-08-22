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
    <g id="symF1RightGroup">
      <polygon points="220,60 180,60 180,100 200,120 220,100" fill="rgba(227,93,58,.10)" stroke="#E35D3A" stroke-width="1.8"/>
    </g>
    <text x="145" y="20" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" onclick="symF1Fold()">Voir le pliage</button>
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
  <svg id="symF2Svg" viewBox="0 0 260 140" style="width:100%;display:block;">
    <defs>
      <pattern id="gridSymAxiale" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4DFD6" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="260" height="140" fill="url(#gridSymAxiale)"/>
    <line x1="140" y1="0" x2="140" y2="140" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF2Line" x1="80" y1="60" x2="200" y2="60" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
    <circle id="symF2Mp" cx="200" cy="60" r="3" fill="#1F3A5C"/>
    <circle id="symF2M" cx="80" cy="60" r="7" fill="#1F3A5C" style="cursor:grab;"/>
    <text id="symF2MLabel" x="58" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF2MpLabel" x="204" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="145" y="16" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p class="hint" style="text-align:center;margin:4px 0 0;">Déplace le point <b>M</b> (le point bleu).</p>
</div>
<p style="margin:4px 0 0;">M et M' sont situés à la même distance de <b>(d)</b>, de part et d'autre, sur une perpendiculaire à <b>(d)</b>. On compte le nombre de carreaux de M jusqu'à <b>(d)</b>, et on reporte le même nombre de carreaux de l'autre côté de <b>(d)</b>.</p>

<p class="hint" style="margin:16px 0 8px;">Axe en diagonale : on rejoint <b>(d)</b> à l'horizontale en comptant les carreaux, puis on redescend à la verticale en comptant le <b>même nombre</b> de carreaux.</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg id="symF3Svg" viewBox="0 0 200 180" style="width:100%;display:block;">
    <rect x="0" y="0" width="200" height="180" fill="url(#gridSymAxiale)"/>
    <line x1="10" y1="170" x2="190" y2="-10" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF3LineH" x1="60" y1="60" x2="120" y2="60" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <line id="symF3LineV" x1="120" y1="60" x2="120" y2="120" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <text id="symF3HCount" x="80" y="52" font-family="JetBrains Mono" font-size="11" fill="#6B7280"></text>
    <text id="symF3VCount" x="127" y="92" font-family="JetBrains Mono" font-size="11" fill="#6B7280"></text>
    <circle id="symF3H" cx="120" cy="60" r="2" fill="#9CA3AF"/>
    <circle id="symF3Mp" cx="120" cy="120" r="3" fill="#1F3A5C"/>
    <circle id="symF3M" cx="60" cy="60" r="7" fill="#1F3A5C" style="cursor:grab;"/>
    <text id="symF3MLabel" x="38" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF3MpLabel" x="126" y="128" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="150" y="30" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p class="hint" style="text-align:center;margin:4px 0 0;">Déplace le point <b>M</b> (le point bleu).</p>
</div>
<p style="margin:4px 0 0;">De M, on avance à l'horizontale jusqu'à <b>(d)</b> en comptant les carreaux. À partir de ce point de <b>(d)</b>, on redescend à la verticale en comptant le même nombre de carreaux : on trouve <b>M'</b>.</p>
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
  <svg id="symF7Svg" viewBox="0 0 240 170" style="width:100%;display:block;">
    <line x1="120" y1="20" x2="120" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="50" y1="140" x2="190" y2="140" stroke="#1C1B2E" stroke-width="1.8"/>
    <path d="M 108 140 L 108 128 L 120 128 L 120 140" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <line id="symF7PA" x1="120" y1="140" x2="120" y2="50" stroke="#1C1B2E" stroke-width="1.4"/>
    <line id="symF7PB" x1="190" y1="140" x2="120" y2="50" stroke="#1C1B2E" stroke-width="1.4"/>
    <line id="symF7TickA" x1="82.9" y1="88.3" x2="87.1" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <line id="symF7TickB" x1="157.1" y1="88.3" x2="152.9" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle id="symF7P" cx="120" cy="50" r="7" fill="#1F3A5C" style="cursor:grab;"/>
    <text x="38" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="196" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
    <text id="symF7PLabel" x="126" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">P</text>
    <text x="126" y="18" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p id="symF7Status" class="hint" style="text-align:center;margin:4px 0 0;"></p>
  <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace le point <b>P</b> (le point bleu), sur la médiatrice ou en dehors.</p>
</div>
<p style="margin:4px 0 0;"><b>(d)</b> est la médiatrice de <b>[AB]</b>. Tant que <b>P</b> reste sur <b>(d)</b>, il est équidistant de <b>A</b> et de <b>B</b> : <b>PA = PB</b>.</p>

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

/* ================= Figure 1 : vrai pliage le long de (d) (figures symétriques) =================
   Le groupe de droite est DÉJÀ positionné à sa forme finale correcte (miroir de la gauche). On
   anime seulement son transform : un second miroir (scaleX=-1 autour de l'axe) ramène exactement
   sur la forme de gauche (état "plié", superposé) -- verifié numériquement avant integration.
   Animer scaleX de -1 à 1 donne donc un vrai effet de pliage le long de (d), pas un simple
   glissement. */
const symF1_axisX = 140;
function symF1SetFold(sx){
  document.getElementById('symF1RightGroup').setAttribute('transform', `translate(${symF1_axisX},0) scale(${sx},1) translate(${-symF1_axisX},0)`);
}
function symF1Reset(){ symF1SetFold(1); }
function symF1Fold(){
  symF1SetFold(-1); // repart plié (superposé sur la gauche)
  const start = performance.now(), dur=1400;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    symF1SetFold(-1+2*t);
    if(t<1){ requestAnimationFrame(frame); }
  }
  requestAnimationFrame(frame);
}

/* ================= Figure 2 : symétrique d'un point, axe vertical (point M déplaçable) ================= */
const symF2_axisX = 140;
let symF2_M = {x:80, y:60};
function symF2Update(){
  const svgEl = document.getElementById('symF2Svg');
  const Mp = {x: 2*symF2_axisX - symF2_M.x, y: symF2_M.y};
  svgEl.querySelector('#symF2M').setAttribute('cx', symF2_M.x); svgEl.querySelector('#symF2M').setAttribute('cy', symF2_M.y);
  svgEl.querySelector('#symF2Mp').setAttribute('cx', Mp.x); svgEl.querySelector('#symF2Mp').setAttribute('cy', Mp.y);
  svgEl.querySelector('#symF2Line').setAttribute('x1', symF2_M.x); svgEl.querySelector('#symF2Line').setAttribute('y1', symF2_M.y);
  svgEl.querySelector('#symF2Line').setAttribute('x2', Mp.x); svgEl.querySelector('#symF2Line').setAttribute('y2', Mp.y);
  svgEl.querySelector('#symF2MLabel').setAttribute('x', symF2_M.x-22); svgEl.querySelector('#symF2MLabel').setAttribute('y', symF2_M.y<20?symF2_M.y+22:symF2_M.y-8);
  svgEl.querySelector('#symF2MpLabel').setAttribute('x', Mp.x+10); svgEl.querySelector('#symF2MpLabel').setAttribute('y', Mp.y<20?Mp.y+22:Mp.y-8);
}
let symF2_initialized = false;
function symF2Init(){
  symF2_M = {x:80, y:60};
  symF2Update();
  if(symF2_initialized) return; // évite d'empiler les écouteurs si le chapitre est réouvert
  symF2_initialized = true;
  const svgEl = document.getElementById('symF2Svg');
  const handle = svgEl.querySelector('#symF2M');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    symF2_M.x = Math.max(10, Math.min(250, Math.round(p.x/20)*20));
    symF2_M.y = Math.max(10, Math.min(130, Math.round(p.y/20)*20));
    symF2Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
}

/* ================= Figure 3 : symétrique d'un point, axe diagonal (point M déplaçable) ================= */
const symF3_axisP1 = {x:10,y:170}, symF3_axisP2 = {x:190,y:-10};
let symF3_M = {x:60, y:60};
function symF3ReflectAcrossAxis(p){
  const dx = symF3_axisP2.x-symF3_axisP1.x, dy = symF3_axisP2.y-symF3_axisP1.y;
  const len2 = dx*dx+dy*dy;
  const t = ((p.x-symF3_axisP1.x)*dx+(p.y-symF3_axisP1.y)*dy)/len2;
  const proj = {x:symF3_axisP1.x+t*dx, y:symF3_axisP1.y+t*dy};
  return {x:2*proj.x-p.x, y:2*proj.y-p.y};
}
function symF3Update(){
  const svgEl = document.getElementById('symF3Svg');
  const M = symF3_M;
  const Mp = symF3ReflectAcrossAxis(M);
  // H : croisement horizontal (même y que M) avec l'axe -- axe de pente -1, donc H.x = M.x + (H.y_axis - M.y) ; plus simple : reprendre l'intersection directe.
  const dx = symF3_axisP2.x-symF3_axisP1.x, dy = symF3_axisP2.y-symF3_axisP1.y;
  const tH = (M.y-symF3_axisP1.y)/dy;
  const H = {x: symF3_axisP1.x+tH*dx, y: M.y};
  svgEl.querySelector('#symF3M').setAttribute('cx', M.x); svgEl.querySelector('#symF3M').setAttribute('cy', M.y);
  svgEl.querySelector('#symF3Mp').setAttribute('cx', Mp.x.toFixed(1)); svgEl.querySelector('#symF3Mp').setAttribute('cy', Mp.y.toFixed(1));
  svgEl.querySelector('#symF3H').setAttribute('cx', H.x.toFixed(1)); svgEl.querySelector('#symF3H').setAttribute('cy', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineH').setAttribute('x1', M.x); svgEl.querySelector('#symF3LineH').setAttribute('y1', M.y);
  svgEl.querySelector('#symF3LineH').setAttribute('x2', H.x.toFixed(1)); svgEl.querySelector('#symF3LineH').setAttribute('y2', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineV').setAttribute('x1', H.x.toFixed(1)); svgEl.querySelector('#symF3LineV').setAttribute('y1', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineV').setAttribute('x2', Mp.x.toFixed(1)); svgEl.querySelector('#symF3LineV').setAttribute('y2', Mp.y.toFixed(1));
  const nbCarreaux = Math.round(Math.abs(H.x-M.x)/20);
  svgEl.querySelector('#symF3HCount').textContent = nbCarreaux+' carreau'+(nbCarreaux>1?'x':'');
  svgEl.querySelector('#symF3HCount').setAttribute('x', (M.x+H.x)/2-14); svgEl.querySelector('#symF3HCount').setAttribute('y', M.y-6);
  svgEl.querySelector('#symF3VCount').textContent = nbCarreaux+' carreau'+(nbCarreaux>1?'x':'');
  svgEl.querySelector('#symF3VCount').setAttribute('x', H.x+8); svgEl.querySelector('#symF3VCount').setAttribute('y', (H.y+Mp.y)/2+4);
  svgEl.querySelector('#symF3MLabel').setAttribute('x', M.x-22); svgEl.querySelector('#symF3MLabel').setAttribute('y', M.y-8);
  svgEl.querySelector('#symF3MpLabel').setAttribute('x', Mp.x+8); svgEl.querySelector('#symF3MpLabel').setAttribute('y', Mp.y+18);
}
let symF3_initialized = false;
function symF3Init(){
  symF3_M = {x:60, y:60};
  symF3Update();
  if(symF3_initialized) return;
  symF3_initialized = true;
  const svgEl = document.getElementById('symF3Svg');
  const handle = svgEl.querySelector('#symF3M');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    const gx = Math.max(0, Math.min(180, Math.round(p.x/20)*20));
    const gy = Math.max(0, Math.min(160, Math.round(p.y/20)*20));
    symF3_M = {x:gx, y:gy};
    symF3Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
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

/* ================= Figure 7 : médiatrice (point P déplaçable librement) ================= */
const symF7_A = {x:50,y:140}, symF7_B = {x:190,y:140}, symF7_axisX = 120;
let symF7_P = {x:120, y:50};
function symF7Update(){
  const svgEl = document.getElementById('symF7Svg');
  const P = symF7_P;
  svgEl.querySelector('#symF7P').setAttribute('cx', P.x); svgEl.querySelector('#symF7P').setAttribute('cy', P.y);
  svgEl.querySelector('#symF7PA').setAttribute('x2', P.x); svgEl.querySelector('#symF7PA').setAttribute('y2', P.y);
  svgEl.querySelector('#symF7PB').setAttribute('x2', P.x); svgEl.querySelector('#symF7PB').setAttribute('y2', P.y);
  svgEl.querySelector('#symF7PLabel').setAttribute('x', P.x+10); svgEl.querySelector('#symF7PLabel').setAttribute('y', P.y<20?P.y+18:P.y-8);
  const PA = Math.hypot(P.x-symF7_A.x, P.y-symF7_A.y), PB = Math.hypot(P.x-symF7_B.x, P.y-symF7_B.y);
  const onAxis = Math.abs(P.x-symF7_axisX) < 4;
  const tickA = svgEl.querySelector('#symF7TickA'), tickB = svgEl.querySelector('#symF7TickB');
  tickA.setAttribute('opacity', onAxis?'1':'0'); tickB.setAttribute('opacity', onAxis?'1':'0');
  if(onAxis){
    const angleA = Math.atan2(P.y-symF7_A.y, P.x-symF7_A.x), angleB = Math.atan2(P.y-symF7_B.y, P.x-symF7_B.x);
    const midA = {x:(symF7_A.x+P.x)/2, y:(symF7_A.y+P.y)/2}, midB = {x:(symF7_B.x+P.x)/2, y:(symF7_B.y+P.y)/2};
    setSlantTick(tickA, midA.x, midA.y, angleA, 14);
    setSlantTick(tickB, midB.x, midB.y, angleB, 14);
  }
  const status = document.getElementById('symF7Status');
  if(onAxis){
    status.innerHTML = '<b>P</b> est sur la médiatrice : <b>PA = PB</b>.';
  } else {
    status.innerHTML = '<b>P</b> n\'est pas sur la médiatrice : <b>PA ≠ PB</b>, plus proche de <b>'+(PA<PB?'A':'B')+'</b>.';
  }
}
let symF7_initialized = false;
function symF7Init(){
  symF7_P = {x:120, y:50};
  symF7Update();
  if(symF7_initialized) return;
  symF7_initialized = true;
  const svgEl = document.getElementById('symF7Svg');
  const handle = svgEl.querySelector('#symF7P');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    symF7_P = {x: Math.max(20,Math.min(220,p.x)), y: Math.max(20,Math.min(135,p.y))};
    symF7Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
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
    symF1Reset(); symF2Init(); symF3Init(); symF4Reset(); symF5Reset(); symF6Reset(); symF7Init(); symF8Reset();
  }
};

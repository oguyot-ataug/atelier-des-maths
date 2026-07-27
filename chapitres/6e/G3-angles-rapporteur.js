/* ============================================================
   CHAPITRE : Angles et rapporteur (6e, G3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

/* ---- Petits helpers géométriques (utilisent angleArcPoints/angleDegrees globaux) ---- */
function arDegToPt(vertex, angleDeg, r){ const a=angleDeg*Math.PI/180; return {x:vertex.x+r*Math.cos(a), y:vertex.y-r*Math.sin(a)}; }
function arWedge(vertex,p1,p2,r,color,opacity){
  const {points} = angleArcPoints(vertex,p1,p2,r);
  return `<polygon points="${vertex.x},${vertex.y} ${points}" fill="${color}" fill-opacity="${opacity===undefined?0.5:opacity}"/>`;
}
function arLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||12}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}

/* ================= Figure : notion d'angle (saillant) ================= */
function arBuildNotionSvg(){
  const O = {x:110, y:190};
  const X = arDegToPt(O, 0, 160);
  const Y = arDegToPt(O, 55, 160);
  const w = arWedge(O, X, Y, 44, '#1F3A5C');
  return `<svg viewBox="0 0 300 220" style="width:100%;max-width:300px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${O.x}" y1="${O.y}" x2="${X.x}" y2="${X.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${Y.x}" y2="${Y.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arLabel(O.x-16, O.y+14, 'O')}
    ${arLabel(X.x+6, X.y+4, 'x')}
    ${arLabel(Y.x-2, Y.y-8, 'y')}
  </svg>`;
}

/* ================= Icônes : différents types d'angles ================= */
function arTypeIcon(angleDeg, label){
  const O = {x:40, y:65};
  const size = 80;
  let content = '';
  if(angleDeg===0){
    const P = arDegToPt(O,0,45);
    content = `<line x1="${O.x}" y1="${O.y}" x2="${P.x}" y2="${P.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else if(angleDeg===360){
    content = `<circle cx="${O.x}" cy="${O.y-2}" r="2.6" fill="#1C1B2E"/><circle cx="${O.x}" cy="${O.y}" r="30" fill="none" stroke="#1C1B2E" stroke-width="1.2" stroke-dasharray="3,3"/>`;
  } else if(angleDeg===180){
    const P1 = arDegToPt(O,0,45), P2 = arDegToPt(O,180,45);
    content = `<line x1="${P1.x}" y1="${P1.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else if(angleDeg===200){ // repère "rentrant" : on colore la grande région (le complément du petit angle saillant de 45°)
    const P1 = arDegToPt(O,0,45), P2 = arDegToPt(O,45,45);
    content = `<circle cx="${O.x}" cy="${O.y}" r="30" fill="#1F3A5C" fill-opacity="0.5"/>
      <polygon points="${O.x},${O.y} ${angleArcPoints(O,P1,P2,30).points}" fill="var(--white)"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P1.x}" y2="${P1.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else {
    const P1 = arDegToPt(O,0,45), P2 = arDegToPt(O,angleDeg,45);
    content = `${arWedge(O,P1,P2,22,'#1F3A5C')}
      <line x1="${O.x}" y1="${O.y}" x2="${P1.x}" y2="${P1.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  return `<svg viewBox="0 0 80 90" style="width:100%;max-width:80px;display:block;margin:0 auto;">
    <circle cx="${O.x}" cy="${O.y}" r="1.8" fill="#1C1B2E"/>
    ${content}
  </svg>`;
}

/* ================= Figures : paires d'angles particuliers ================= */
function arBuildOpposesSvg(){
  const O = {x:200, y:130};
  const M = arDegToPt(O,0,150), Mp = arDegToPt(O,180,150);
  const N = arDegToPt(O,50,150), Np = arDegToPt(O,230,150);
  const w1 = arWedge(O, M, N, 36, '#1F3A5C');
  const w2 = arWedge(O, Mp, Np, 36, '#1F3A5C');
  const w3 = arWedge(O, N, Mp, 36, '#E35D3A');
  const w4 = arWedge(O, Np, M, 36, '#E35D3A');
  return `<svg viewBox="0 0 400 260" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Mp.x}" y1="${Mp.y}" x2="${M.x}" y2="${M.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Np.x}" y1="${Np.y}" x2="${N.x}" y2="${N.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}${w3}${w4}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arLabel(M.x+8, M.y+4, 'M')}
    ${arLabel(Mp.x-20, Mp.y+4, "M'")}
    ${arLabel(N.x-4, N.y-8, 'N')}
    ${arLabel(Np.x-16, Np.y+16, "N'")}
    ${arLabel(O.x-16, O.y+18, 'O')}
  </svg>`;
}
function arBuildAdjacentsSvg(){
  const O = {x:180, y:195};
  const I = arDegToPt(O,170,130), J = arDegToPt(O,90,130), K = arDegToPt(O,25,130);
  const w1 = arWedge(O, I, J, 38, '#1F3A5C');
  const w2 = arWedge(O, J, K, 38, '#1F6B3A');
  return `<svg viewBox="0 0 380 220" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${O.x}" y1="${O.y}" x2="${I.x}" y2="${I.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${J.x}" y2="${J.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${K.x}" y2="${K.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arLabel(I.x-14, I.y-2, 'A')}
    ${arLabel(J.x-6, J.y-8, 'B')}
    ${arLabel(K.x+6, K.y-4, 'C')}
    ${arLabel(O.x+6, O.y+16, 'O')}
  </svg>`;
}
function arBuildSupplSvg(){
  const O = {x:200, y:170};
  const D = arDegToPt(O,180,140), F = arDegToPt(O,0,140), E = arDegToPt(O,108,140);
  const w1 = arWedge(O, D, E, 42, '#1F3A5C');
  const w2 = arWedge(O, E, F, 42, '#1F6B3A');
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${D.x}" y1="${D.y}" x2="${F.x}" y2="${F.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${E.x}" y2="${E.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arLabel(D.x-4, D.y-10, 'D')}
    ${arLabel(F.x-6, F.y-10, 'F')}
    ${arLabel(E.x-6, E.y-10, 'E')}
    ${arLabel(O.x-4, O.y+18, 'O')}
  </svg>`;
}

/* ================= Widget interactif : rapporteur translucide ================= */
const AR_RATIO = 900/483;      // proportions réelles de l'image assets/rapporteur-translucide.png
const AR_W = 460;              // largeur d'affichage du widget
const AR_H = AR_W / AR_RATIO;
const AR_VERTEX = {x: AR_W/2, y: AR_H};
const AR_RAY_LEN = AR_H * 0.86;

function arPointAtAngle(thetaDeg, len){
  const t = thetaDeg*Math.PI/180;
  return { x: AR_VERTEX.x + (len===undefined?AR_RAY_LEN:len)*Math.cos(t), y: AR_VERTEX.y - (len===undefined?AR_RAY_LEN:len)*Math.sin(t) };
}
function arAngleFromPoint(mx,my){
  const dx = mx-AR_VERTEX.x, dy = AR_VERTEX.y-my;
  let deg = Math.atan2(dy,dx)*180/Math.PI;
  if(deg<0) deg=0; if(deg>180) deg=180;
  return deg;
}

/* --- Widget 1 : lire une mesure au rapporteur --- */
let arLireTarget = 60;
function arBuildRapporteurShell(svgId, handleId, fixedRayVisible){
  const fixedEnd = arPointAtAngle(0);
  return `<div style="position:relative;width:100%;max-width:${AR_W}px;margin:0 auto;">
    <img src="assets/rapporteur-translucide.png" alt="Rapporteur" style="position:absolute;top:0;left:0;width:100%;height:auto;pointer-events:none;opacity:.92;">
    <svg id="${svgId}" viewBox="0 0 ${AR_W} ${AR_H}" style="position:relative;width:100%;height:auto;display:block;">
      ${fixedRayVisible ? `<line x1="${AR_VERTEX.x}" y1="${AR_VERTEX.y}" x2="${fixedEnd.x}" y2="${fixedEnd.y}" stroke="#1F3A5C" stroke-width="2"/>` : ''}
      <line id="${svgId}-ray" x1="${AR_VERTEX.x}" y1="${AR_VERTEX.y}" x2="0" y2="0" stroke="#E35D3A" stroke-width="2.4"/>
      <circle id="${handleId}" cx="0" cy="0" r="11" fill="#E35D3A" fill-opacity="0.001" style="cursor:grab;"/>
    </svg>
  </div>`;
}
function arUpdateRay(svgId, handleId, thetaDeg){
  const p = arPointAtAngle(thetaDeg);
  const ray = document.getElementById(svgId+'-ray');
  const handle = document.getElementById(handleId);
  if(ray){ ray.setAttribute('x2', p.x); ray.setAttribute('y2', p.y); }
  if(handle){ handle.setAttribute('cx', p.x); handle.setAttribute('cy', p.y); }
}
function arInitDrag(svgId, handleId, onChange){
  const svgEl = document.getElementById(svgId);
  const handle = document.getElementById(handleId);
  if(!svgEl || !handle) return;
  let dragging = false;
  const move = (e)=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    const deg = arAngleFromPoint(p.x, p.y);
    onChange(deg);
    e.preventDefault();
  };
  handle.onmousedown = ()=>{ dragging=true; };
  handle.ontouchstart = ()=>{ dragging=true; };
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', ()=>dragging=false);
  svgEl.addEventListener('touchmove', move, {passive:false});
  svgEl.addEventListener('touchend', ()=>dragging=false);
}

function arResetLire(){
  arLireTarget = [35,50,65,75,105,125,140,155][Math.floor(Math.random()*8)];
  arUpdateRay('ar-lireSvg','ar-lireHandle', arLireTarget);
  document.getElementById('ar-lireInput').value = '';
  document.getElementById('ar-lireStatus').textContent = '';
}
function arCheckLire(){
  const val = parseFloat(document.getElementById('ar-lireInput').value);
  const status = document.getElementById('ar-lireStatus');
  if(isNaN(val)){ status.textContent = 'Indique ta lecture en degrés.'; return; }
  if(Math.abs(val-arLireTarget)<=2){ status.textContent = `✅ Bravo, l'angle mesure bien ${arLireTarget}°.`; status.style.color = '#1F6B3A'; }
  else { status.textContent = `❌ Pas tout à fait : l'angle mesure ${arLireTarget}°. Regarde bien sur quelle graduation lire (intérieure ou extérieure).`; status.style.color = '#E35D3A'; }
}

/* --- Widget 2 : construire un angle donné --- */
let arConstruireTarget = 100, arConstruireCurrent = 15;
function arResetConstruire(){
  arConstruireTarget = [40,55,70,95,115,130,150,165][Math.floor(Math.random()*8)];
  arConstruireCurrent = 15;
  arUpdateRay('ar-construireSvg','ar-construireHandle', arConstruireCurrent);
  document.getElementById('ar-construireCible').textContent = arConstruireTarget+'°';
  document.getElementById('ar-construireStatus').textContent = '';
}
function arCheckConstruire(){
  const status = document.getElementById('ar-construireStatus');
  if(Math.abs(arConstruireCurrent-arConstruireTarget)<=2){ status.textContent = `✅ Bravo, ton angle mesure environ ${Math.round(arConstruireCurrent)}°, c'est le bon angle !`; status.style.color = '#1F6B3A'; }
  else { status.textContent = `Ton angle mesure pour l'instant environ ${Math.round(arConstruireCurrent)}°. Ajuste le trait rouge pour obtenir ${arConstruireTarget}°.`; status.style.color = '#E35D3A'; }
}

/* --- Widget 3 : construire la bissectrice d'un angle donné --- */
const AR_BISSECTRICE_ANGLE = 108;
function arBuildBissectriceSvg(){
  const M = arPointAtAngle(AR_BISSECTRICE_ANGLE);
  const N = arPointAtAngle(0);
  return `<div style="position:relative;width:100%;max-width:${AR_W}px;margin:0 auto;">
    <img src="assets/rapporteur-translucide.png" alt="Rapporteur" style="position:absolute;top:0;left:0;width:100%;height:auto;pointer-events:none;opacity:.92;">
    <svg id="ar-bissectriceSvg" viewBox="0 0 ${AR_W} ${AR_H}" style="position:relative;width:100%;height:auto;display:block;">
      <line x1="${AR_VERTEX.x}" y1="${AR_VERTEX.y}" x2="${N.x}" y2="${N.y}" stroke="#1F3A5C" stroke-width="2"/>
      <line x1="${AR_VERTEX.x}" y1="${AR_VERTEX.y}" x2="${M.x}" y2="${M.y}" stroke="#1F3A5C" stroke-width="2"/>
      <line id="ar-bissectriceLine" x1="${AR_VERTEX.x}" y1="${AR_VERTEX.y}" x2="${AR_VERTEX.x}" y2="${AR_VERTEX.y}" stroke="#E35D3A" stroke-width="2.4" stroke-dasharray="0" opacity="0"/>
      ${arLabel(N.x+6, N.y+2, 'N', 13, false)}
      ${arLabel(M.x-2, M.y-8, 'M', 13, false)}
      ${arLabel(AR_VERTEX.x-4, AR_VERTEX.y-6, 'O', 13, false)}
    </svg>
  </div>`;
}
function arResetBissectrice(){
  const line = document.getElementById('ar-bissectriceLine');
  if(line){ line.setAttribute('opacity','0'); const O=AR_VERTEX; line.setAttribute('x2',O.x); line.setAttribute('y2',O.y); }
  document.getElementById('ar-bissectriceStatus').textContent = '';
}
function arTraceBissectrice(){
  const half = AR_BISSECTRICE_ANGLE/2;
  const B = arPointAtAngle(half);
  const line = document.getElementById('ar-bissectriceLine');
  line.setAttribute('x2', B.x); line.setAttribute('y2', B.y); line.setAttribute('opacity','1');
  document.getElementById('ar-bissectriceStatus').innerHTML = `${AR_BISSECTRICE_ANGLE}° ÷ 2 = ${half}°, donc on trace le trait-repère à ${half}° sur le rapporteur, puis la demi-droite [OB) : c'est la bissectrice de l'angle MON.`;
}

/* ================= COURS ================= */
document.getElementById('cours-demo-angles-rapporteur-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Notion d'angle</h3></div>

<p class="example-title" style="margin-top:0;">A. Généralités</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>angle</b> est une portion du plan délimitée par deux demi-droites de même origine.</div>
<div class="figure-wrap">${arBuildNotionSvg()}</div>
<ul class="example-list">
  <li>Le point O est le <b>sommet</b> de l'angle.</li>
  <li>Les demi-droites [Ox) et [Oy) sont les <b>côtés</b> de l'angle.</li>
  <li>La portion du plan coloriée est un angle <b>saillant</b>. La portion non coloriée est un angle <b>rentrant</b>.</li>
</ul>

<p class="example-title" style="margin-top:20px;">B. Nommer un angle</p>
<div class="def-box">Un angle peut se nommer de différentes manières (le plus souvent avec trois lettres, celle du milieu étant toujours le sommet de l'angle) : par exemple <span class="tex">\\widehat{xOy}</span> ou <span class="tex">\\widehat{yOx}</span>.</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : des angles de même mesure sont codés avec le même symbole (comme pour les longueurs).</div>

<div class="lesson-header"><span class="num">2</span><h3>Différents types d'angles</h3></div>
<p style="margin:0 0 10px;">On classe les angles par catégories selon leur mesure.</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-size:.85rem;">
  <tr style="background:rgba(31,58,92,.06);">
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Angle</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Nul</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Aigu</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Droit</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Obtus</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Plat</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Rentrant</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Plein</th>
  </tr>
  <tr>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);font-weight:700;">Figure</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(0)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(45)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(90)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(130)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(180)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(200)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(360)}</td>
  </tr>
  <tr>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);font-weight:700;">Mesure</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">0°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 0° et 90°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">90°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 90° et 180°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">180°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 180° et 360°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">360°</td>
  </tr>
</table>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Utilisation du rapporteur</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">On peut mesurer « l'ouverture » d'un angle. L'unité que l'on utilise au collège est le <b>degré</b>. L'instrument qui permet de mesurer des angles est le <b>rapporteur</b>.</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : un rapporteur gradué en degrés a souvent une double graduation (une qui va de 0 à 180° dans un sens, une autre dans l'autre sens), source de nombreuses erreurs. Il faut bien vérifier si l'angle étudié est aigu ou obtus avant de lire sa mesure.</div>

<p class="example-title">Exemple 1 : entraîne-toi à lire une mesure au rapporteur</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Une des deux demi-droites (bleue) est fixée sur la graduation 0°. Lis la mesure de l'angle formé avec l'autre demi-droite (rouge), puis vérifie ta lecture.</p>
<div class="figure-wrap">
  ${arBuildRapporteurShell('ar-lireSvg','ar-lireHandle', true)}
  <div class="figure-toolbar" style="justify-content:center;">
    <label class="hint" style="margin:0;">Ma lecture : <input type="number" id="ar-lireInput" style="width:70px;"> °</label>
    <button class="btn" onclick="arCheckLire()">Vérifier</button>
    <button class="btn secondary" onclick="arResetLire()">Nouvel angle</button>
  </div>
  <p class="hint" id="ar-lireStatus" style="text-align:center;margin-top:8px;"></p>
</div>

<p class="example-title">Exemple 2 : entraîne-toi à construire un angle donné</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Déplace la demi-droite rouge pour construire un angle de la mesure demandée, en t'aidant du rapporteur.</p>
<div class="figure-wrap">
  <p style="text-align:center;margin:0 0 8px;">Angle à construire : <b id="ar-construireCible">100°</b></p>
  ${arBuildRapporteurShell('ar-construireSvg','ar-construireHandle', true)}
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" onclick="arCheckConstruire()">Vérifier</button>
    <button class="btn secondary" onclick="arResetConstruire()">Nouvel angle à construire</button>
  </div>
  <p class="hint" id="ar-construireStatus" style="text-align:center;margin-top:8px;"></p>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Paire d'angles particuliers</h3></div>

<p class="example-title" style="margin-top:0;">A. Angles opposés par le sommet</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>opposés par le sommet</b> sont deux angles qui ont un sommet commun et qui ont leurs côtés dans le prolongement l'un de l'autre.</div>
<div class="figure-wrap">${arBuildOpposesSvg()}</div>
<p style="margin:10px 0 4px;">Les angles <span class="tex">\\widehat{MON}</span> et <span class="tex">\\widehat{M'ON'}</span> ont comme sommet commun le point O et ont leurs côtés dans le prolongement l'un de l'autre. Ils sont donc <b>opposés par le sommet</b>.</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Deux angles <b>opposés par le sommet</b> sont de même mesure.</div>
<p style="margin:6px 0 12px;">Dans la figure précédente, les angles <span class="tex">\\widehat{MON}</span> et <span class="tex">\\widehat{M'ON'}</span> sont de même mesure (50°), ainsi que les angles <span class="tex">\\widehat{MON'}</span> et <span class="tex">\\widehat{M'ON}</span> (130°).</p>

<p class="example-title" style="margin-top:20px;">B. Angles adjacents</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>adjacents</b> sont deux angles qui ont un sommet commun, un côté commun, et qui sont situés de part et d'autre de ce côté commun.</div>
<div class="figure-wrap">${arBuildAdjacentsSvg()}</div>
<p style="margin:10px 0 12px;">Les angles <span class="tex">\\widehat{AOB}</span> et <span class="tex">\\widehat{BOC}</span> ont comme sommet commun le point O, comme côté commun la demi-droite [OB), et sont placés de part et d'autre de [OB) : ils sont donc <b>adjacents</b>.</p>

<p class="example-title" style="margin-top:20px;">C. Angles supplémentaires</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>supplémentaires</b> sont deux angles dont la somme de leur mesure fait 180°.</div>
<div class="figure-wrap">${arBuildSupplSvg()}</div>
<p style="margin:10px 0 4px;">Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> partagent un angle plat. Leur somme est donc égale à 180° (72° + 108°).</p>
<p style="margin:4px 0 12px;">Ils sont donc <b>supplémentaires</b>.</p>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : deux angles supplémentaires et adjacents forment un angle plat. Cette propriété peut donc être utilisée pour montrer que des points sont alignés.</div>

<div class="lesson-header"><span class="num">5</span><h3>Bissectrice d'un angle saillant</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>bissectrice d'un angle saillant</b> est la droite qui partage cet angle en deux angles adjacents de même mesure.</div>
<p class="example-title">Exemple : construis la bissectrice de l'angle <span class="tex">\\widehat{MON}</span> avec un rapporteur.</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Utilise le rapporteur pour lire la mesure de l'angle, puis clique pour tracer la bissectrice.</p>
<div class="figure-wrap">
  ${arBuildBissectriceSvg()}
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" onclick="arTraceBissectrice()">Tracer la bissectrice</button>
    <button class="btn secondary" onclick="arResetBissectrice()">Recommencer</button>
  </div>
  <p class="hint" id="ar-bissectriceStatus" style="text-align:center;margin-top:8px;"></p>
</div>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-angles-rapporteur-6e').innerHTML = `
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une mesure grâce aux angles opposés par le sommet</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:0 0 6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ar-methodeOpposesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arMethodeOpposesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="arMethodeOpposesDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : justifier un alignement grâce aux angles supplémentaires</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:0 0 6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ar-methodeAlignementDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arMethodeAlignementDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="arMethodeAlignementDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXOS ================= */
document.getElementById('exos-demo-angles-rapporteur-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Utiliser les angles opposés par le sommet »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Les angles <span class="tex">\\widehat{RST}</span> et <span class="tex">\\widehat{R'ST'}</span> sont opposés par le sommet.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles opposés par le sommet ont la même mesure.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span>, comme <span class="tex">\\widehat{RST} = 62°</span>, on a <span class="tex">\\widehat{R'ST'} = 62°</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un angle <span class="tex">\\widehat{xOy}</span> de 128° avec un rapporteur.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Deux droites sécantes en O forment quatre angles. L'un d'eux mesure 38°. Donne les mesures des trois autres.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> forment un angle plat. Sachant que <span class="tex">\\widehat{DOE} = 95°</span>, calcule la mesure de <span class="tex">\\widehat{EOF}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Construis un angle de 75°, puis trace sa bissectrice à l'aide d'un rapporteur.
  </div>
</div>
`;

/* ================= Méthodes animées ================= */
const AR_METHODE_OPPOSES_STEPS = [
  {expr:"Les angles <span class=\"tex\">\\widehat{RST}</span> et <span class=\"tex\">\\widehat{R'ST'}</span> sont opposés par le sommet.", note:"Ce que je sais : on repère deux angles opposés par le sommet."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles opposés par le sommet ont la même mesure.', note:"On énonce la propriété."},
  {expr:"<span style=\"color:var(--accent);font-weight:700;\">Donc</span>, comme <span class=\"tex\">\\widehat{RST} = 62°</span>, on a <span class=\"tex\">\\widehat{R'ST'} = 62°</span>.", note:"Conclusion."},
];
const arMethodeOpposesDemo = makeStepDemo(AR_METHODE_OPPOSES_STEPS, 'ar-methodeOpposesDisplay');

const AR_METHODE_ALIGNEMENT_STEPS = [
  {expr:'Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> sont tels que <span class="tex">\\widehat{DOE} = 72°</span> et <span class="tex">\\widehat{EOF} = 108°</span>.', note:"Ce que je sais."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> <span class="tex">72° + 108° = 180°</span>, donc les angles DOE et EOF sont supplémentaires.', note:"On calcule la somme des deux mesures."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles adjacents et supplémentaires forment un angle plat.', note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> les points D, O et F sont alignés.', note:"Conclusion."},
];
const arMethodeAlignementDemo = makeStepDemo(AR_METHODE_ALIGNEMENT_STEPS, 'ar-methodeAlignementDisplay');

DEMO_REGISTRY['Angles et rapporteur'] = {
  cours:'cours-demo-angles-rapporteur-6e', methode:'methode-demo-angles-rapporteur-6e', exos:'exos-demo-angles-rapporteur-6e',
  init:()=>{
    arResetLire();
    arResetConstruire();
    arResetBissectrice();
    arInitDrag('ar-lireSvg','ar-lireHandle', (deg)=>{}); // lecture : le trait est fixé par arResetLire, pas de glisser-déposer (on lit, on ne construit pas)
    arInitDrag('ar-construireSvg','ar-construireHandle', (deg)=>{ arConstruireCurrent = deg; arUpdateRay('ar-construireSvg','ar-construireHandle', deg); });
    arMethodeOpposesDemo.reset();
    arMethodeAlignementDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-angles-rapporteur-6e'));
    renderStaticMath(document.getElementById('exos-demo-angles-rapporteur-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-angles-rapporteur-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-angles-rapporteur-6e'));
  }
};

DEMO_QUIZZES['Angles et rapporteur'] = [
  {q:"Un angle de 90° est appelé...",
   opts:["Un angle plat","Un angle droit","Un angle nul"], correct:1},
  {q:"Un angle de 130° est un angle...",
   opts:["Aigu","Obtus","Rentrant"], correct:1},
  {q:"L'instrument qui permet de mesurer un angle est...",
   opts:["La règle","L'équerre","Le rapporteur"], correct:2},
  {q:"Deux angles opposés par le sommet ont...",
   opts:["La même mesure","Une somme de 180°","Un côté commun"], correct:0},
  {q:"La bissectrice d'un angle saillant le partage en...",
   opts:["Deux angles opposés par le sommet","Deux angles adjacents de même mesure","Trois angles égaux"], correct:1},
];

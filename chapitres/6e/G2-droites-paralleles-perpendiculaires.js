/* ============================================================
   CHAPITRE : Droites parallèles et perpendiculaires (6e, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-droites-paralleles').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Vocabulaire de base</h3></div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;font-size:.92rem;margin:10px 0 18px;">
  <tr>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Notation</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Signification</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Figure</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">[EF]</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « segment [EF] ». C'est le segment d'extrémités E et F.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="20" y1="25" x2="120" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="20" y1="18" x2="20" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><line x1="120" y1="18" x2="120" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><text x="16" y="14" font-size="13" font-style="italic">E</text><text x="116" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">(EF)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « droite (EF) ». C'est la droite qui passe par les points E et F, prolongée à l'infini des deux côtés.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="5" y1="25" x2="135" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><circle cx="35" cy="25" r="2.2"/><circle cx="105" cy="25" r="2.2"/><text x="31" y="14" font-size="13" font-style="italic">E</text><text x="101" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">[EF)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « demi-droite [EF) ». C'est la demi-droite d'origine E qui passe par F, prolongée au-delà de F seulement.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="25" y1="25" x2="135" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="25" y1="18" x2="25" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><circle cx="95" cy="25" r="2.2"/><text x="21" y="14" font-size="13" font-style="italic">E</text><text x="91" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">G ∈ (d)<br>H ∉ (d)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le point G <b>appartient</b> à la droite (d). Le point H <b>n'appartient pas</b> à la droite (d).</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 60" style="width:130px;"><line x1="5" y1="35" x2="135" y2="35" stroke="#1C1B2E" stroke-width="1.6"/><line x1="55" y1="29" x2="55" y2="41" stroke="#1C1B2E" stroke-width="1.6" transform="rotate(-20 55 35)"/><text x="50" y="20" font-size="13" font-style="italic">G</text><text x="95" y="18" font-size="13" font-style="italic">H</text><line x1="91" y1="12" x2="99" y2="20" stroke="#1C1B2E" stroke-width="1.3"/><line x1="99" y1="12" x2="91" y2="20" stroke="#1C1B2E" stroke-width="1.3"/></svg></td>
  </tr>
</table>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Droites perpendiculaires</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>perpendiculaires</b> si elles sont sécantes en formant un angle droit. On note (d) ⊥ (d').</div>
<p class="example-title">Exemple : construis la droite (d') perpendiculaire à la droite (d) passant par le point M.</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez (d) ou M : la perpendiculaire se reconstruit automatiquement.</p>
<div class="figure-wrap">
  <svg id="dp-perpSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-perpLineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dp-perpLineDp" stroke="#E35D3A" stroke-width="1.8"/>
    <path id="dp-perpAngleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <line id="dp-perpTick1" stroke="#1C1B2E" stroke-width="1.6"/>
    <line id="dp-perpTick2" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle id="dp-perpD1" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-perpD2" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-perpM" r="5.5" fill="#E35D3A" style="cursor:grab;"/>
    <text id="dp-perpLabelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-perpLabelDp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">(d')</text>
    <text id="dp-perpLabelM" font-style="italic" font-size="14">M</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetPerpDemo()">Réinitialiser</button>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Droites parallèles</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>parallèles</b> si elles ne sont pas sécantes (elles ne se croisent jamais, même prolongées à l'infini). On note (d) // (d').</div>
<p class="example-title">Exemple : construis la droite (d'') parallèle à la droite (d) passant par le point N.</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez (d) ou N : la parallèle se reconstruit automatiquement.</p>
<div class="figure-wrap">
  <svg id="dp-paraSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-paraLineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dp-paraLineDpp" stroke="#E35D3A" stroke-width="1.8"/>
    <circle id="dp-paraP1" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-paraP2" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-paraN" r="5.5" fill="#E35D3A" style="cursor:grab;"/>
    <text id="dp-paraLabelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-paraLabelDpp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">(d'')</text>
    <text id="dp-paraLabelN" font-style="italic" font-size="14">N</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetParaDemo()">Réinitialiser</button>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Position relative de deux droites</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Deux droites sont : soit <b>sécantes</b> ; soit <b>parallèles</b>.</div>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">Deux droites sécantes sont : soit <b>perpendiculaires</b> ; soit <b>non perpendiculaires</b>.</div>
<p class="hint" style="margin:10px 0 6px;">Remarque : on peut résumer ceci selon le nombre de points communs aux deux droites.</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:.85rem;margin:10px 0;">
  <div style="background:rgba(31,58,92,.08);border-radius:8px;padding:10px 14px;text-align:center;">Sécantes, perpendiculaires<br><b style="color:var(--accent-orange);">1 point commun</b></div>
  <div style="background:rgba(31,58,92,.08);border-radius:8px;padding:10px 14px;text-align:center;">Sécantes, non perpendiculaires<br><b style="color:var(--accent-orange);">1 point commun</b></div>
  <div style="background:rgba(31,58,92,.08);border-radius:8px;padding:10px 14px;text-align:center;">Parallèles confondues<br><b style="color:var(--accent-orange);">une infinité</b></div>
  <div style="background:rgba(31,58,92,.08);border-radius:8px;padding:10px 14px;text-align:center;">Parallèles distinctes<br><b style="color:var(--accent-orange);">0 point commun</b></div>
</div>

<div class="lesson-header"><span class="num">5</span><h3>Médiatrice d'un segment</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>médiatrice</b> d'un segment est la droite perpendiculaire à ce segment, en son milieu.</div>
<p class="example-title">Exemple : construis la médiatrice du segment [PQ].</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez P ou Q : la médiatrice se reconstruit automatiquement, avec le codage des longueurs égales.</p>
<div class="figure-wrap">
  <svg id="dp-medSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-medSeg" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="dp-medLine" stroke="#E35D3A" stroke-width="1.8"/>
    <path id="dp-medAngleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <line id="dp-medTick1a" stroke="#1F6B3A" stroke-width="1.8"/>
    <line id="dp-medTick1b" stroke="#1F6B3A" stroke-width="1.8"/>
    <circle id="dp-medP" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <circle id="dp-medQ" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <text id="dp-medLabelP" font-style="italic" font-size="14">P</text>
    <text id="dp-medLabelQ" font-style="italic" font-size="14">Q</text>
    <text id="dp-medLabelMed" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">médiatrice</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetMedDemo()">Réinitialiser</button>
  </div>
</div>
`;

document.getElementById('methode-demo-droites-paralleles').innerHTML = `
<div class="figure-wrap">
  <strong style="font-family:'Space Grotesk',sans-serif;">Méthode : tracer une perpendiculaire à l'équerre et à la règle</strong>
  <p class="hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="dp-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-droites-paralleles').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier que deux droites sont perpendiculaires »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On sait que (d) ⊥ (d') et (d') ⊥ (d'').</span><span class="we-comment"></span></div>
    <div class="we-row"><span class="we-expr">Or, deux droites perpendiculaires à une même troisième sont parallèles entre elles.</span><span class="we-comment">Propriété utilisée.</span></div>
    <div class="we-row"><span class="we-expr">Donc (d) // (d'').</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un segment [RS] de 6 cm, puis construis sa médiatrice à la règle et à l'équerre.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Trace une droite (d) et un point T n'appartenant pas à (d). Construis la droite parallèle à (d) passant par T.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    (d) ⊥ (d') et (d') // (d''). Que peut-on dire de la position relative de (d) et (d'') ? Rédige ta réponse.
  </div>
</div>
`;

/* ================= Géométrie : petits utilitaires locaux ================= */
function dpDir(p1,p2){ const dx=p2.x-p1.x, dy=p2.y-p1.y; const len=Math.hypot(dx,dy)||1; return {x:dx/len,y:dy/len}; }
function dpExtend(point, dir, len){ return { x1: point.x-dir.x*len, y1: point.y-dir.y*len, x2: point.x+dir.x*len, y2: point.y+dir.y*len }; }
function dpIntersect(p1,dir1,p2,dir2){
  const denom = dir1.x*dir2.y - dir1.y*dir2.x;
  if(Math.abs(denom)<1e-9) return null;
  const t = ((p2.x-p1.x)*dir2.y - (p2.y-p1.y)*dir2.x)/denom;
  return { x: p1.x+t*dir1.x, y: p1.y+t*dir1.y };
}
function dpRightAngleMark(corner, dir1, dir2, size){
  const s1={x:corner.x+dir1.x*size, y:corner.y+dir1.y*size};
  const s2={x:s1.x+dir2.x*size, y:s1.y+dir2.y*size};
  const s3={x:corner.x+dir2.x*size, y:corner.y+dir2.y*size};
  return `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y} L ${s3.x} ${s3.y}`;
}
function dpSetLine(el, ext){ el.setAttribute('x1',ext.x1); el.setAttribute('y1',ext.y1); el.setAttribute('x2',ext.x2); el.setAttribute('y2',ext.y2); }
function dpSetPt(el, p){ el.setAttribute('cx',p.x); el.setAttribute('cy',p.y); }
function dpSetTxt(el, p, dx, dy){ el.setAttribute('x',p.x+dx); el.setAttribute('y',p.y+dy); }
function dpMakeDraggable(circleEl, svg, getPoint, setPoint, onMove){
  let dragging=false;
  circleEl.addEventListener('mousedown', e=>{ dragging=true; e.preventDefault(); });
  circleEl.addEventListener('touchstart', e=>{ dragging=true; }, {passive:true});
  function move(e){
    if(!dragging) return;
    const pt = svgPointFromEvent(svg, e);
    setPoint({x:pt.x, y:pt.y});
    onMove();
  }
  function up(){ dragging=false; }
  svg.addEventListener('mousemove', move);
  svg.addEventListener('touchmove', move, {passive:true});
  window.addEventListener('mouseup', up);
  window.addEventListener('touchend', up);
}

/* ---- Figure : droites perpendiculaires ---- */
let dpPerpD1={x:70,y:70}, dpPerpD2={x:330,y:150}, dpPerpM={x:230,y:50};
function updatePerpDemo(){
  const svg = document.getElementById('dp-perpSvg');
  const dDir = dpDir(dpPerpD1, dpPerpD2);
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpPerpD1.x+dpPerpD2.x)/2, y:(dpPerpD1.y+dpPerpD2.y)/2};
  const dExt = dpExtend(mid, dDir, 260);
  const dpExt = dpExtend(dpPerpM, perpDir, 150);
  const inter = dpIntersect(dpPerpD1, dDir, dpPerpM, perpDir) || dpPerpM;
  dpSetLine(document.getElementById('dp-perpLineD'), dExt);
  dpSetLine(document.getElementById('dp-perpLineDp'), dpExt);
  dpSetPt(document.getElementById('dp-perpD1'), dpPerpD1);
  dpSetPt(document.getElementById('dp-perpD2'), dpPerpD2);
  dpSetPt(document.getElementById('dp-perpM'), dpPerpM);
  dpSetTxt(document.getElementById('dp-perpLabelD'), dExt.x1>dExt.x2?{x:dExt.x2,y:dExt.y2}:{x:dExt.x1,y:dExt.y1}, -6, -8);
  dpSetTxt(document.getElementById('dp-perpLabelDp'), dpExt.y1<dpExt.y2?{x:dpExt.x1,y:dpExt.y1}:{x:dpExt.x2,y:dpExt.y2}, 8, -6);
  dpSetTxt(document.getElementById('dp-perpLabelM'), dpPerpM, 8, -10);
  // marque d'angle droit : orientée vers l'intérieur (vers le point M et vers D2)
  const towardM = {x:Math.sign(perpDir.x*(dpPerpM.x-inter.x)+perpDir.y*(dpPerpM.y-inter.y))||1, y:1};
  const dSign = (perpDir.x*(dpPerpM.x-inter.x)+perpDir.y*(dpPerpM.y-inter.y))>=0 ? 1 : -1;
  const dSign2 = (dDir.x*(dpPerpD2.x-inter.x)+dDir.y*(dpPerpD2.y-inter.y))>=0 ? 1 : -1;
  document.getElementById('dp-perpAngleMark').setAttribute('d',
    dpRightAngleMark(inter, {x:dDir.x*dSign2,y:dDir.y*dSign2}, {x:perpDir.x*dSign,y:perpDir.y*dSign}, 14));
}
function resetPerpDemo(){ dpPerpD1={x:70,y:70}; dpPerpD2={x:330,y:150}; dpPerpM={x:230,y:50}; updatePerpDemo(); }
function initPerpDemo(){
  const svg = document.getElementById('dp-perpSvg');
  dpMakeDraggable(document.getElementById('dp-perpD1'), svg, ()=>dpPerpD1, p=>dpPerpD1=p, updatePerpDemo);
  dpMakeDraggable(document.getElementById('dp-perpD2'), svg, ()=>dpPerpD2, p=>dpPerpD2=p, updatePerpDemo);
  dpMakeDraggable(document.getElementById('dp-perpM'), svg, ()=>dpPerpM, p=>dpPerpM=p, updatePerpDemo);
  updatePerpDemo();
}

/* ---- Figure : droites parallèles ---- */
let dpParaP1={x:60,y:190}, dpParaP2={x:300,y:110}, dpParaN={x:150,y:50};
function updateParaDemo(){
  const dDir = dpDir(dpParaP1, dpParaP2);
  const mid = {x:(dpParaP1.x+dpParaP2.x)/2, y:(dpParaP1.y+dpParaP2.y)/2};
  const dExt = dpExtend(mid, dDir, 260);
  const dppExt = dpExtend(dpParaN, dDir, 260);
  dpSetLine(document.getElementById('dp-paraLineD'), dExt);
  dpSetLine(document.getElementById('dp-paraLineDpp'), dppExt);
  dpSetPt(document.getElementById('dp-paraP1'), dpParaP1);
  dpSetPt(document.getElementById('dp-paraP2'), dpParaP2);
  dpSetPt(document.getElementById('dp-paraN'), dpParaN);
  dpSetTxt(document.getElementById('dp-paraLabelD'), dExt.x1<dExt.x2?{x:dExt.x1,y:dExt.y1}:{x:dExt.x2,y:dExt.y2}, 6, -8);
  dpSetTxt(document.getElementById('dp-paraLabelDpp'), dppExt.x1<dppExt.x2?{x:dppExt.x1,y:dppExt.y1}:{x:dppExt.x2,y:dppExt.y2}, 6, -8);
  dpSetTxt(document.getElementById('dp-paraLabelN'), dpParaN, 8, -10);
}
function resetParaDemo(){ dpParaP1={x:60,y:190}; dpParaP2={x:300,y:110}; dpParaN={x:150,y:50}; updateParaDemo(); }
function initParaDemo(){
  const svg = document.getElementById('dp-paraSvg');
  dpMakeDraggable(document.getElementById('dp-paraP1'), svg, ()=>dpParaP1, p=>dpParaP1=p, updateParaDemo);
  dpMakeDraggable(document.getElementById('dp-paraP2'), svg, ()=>dpParaP2, p=>dpParaP2=p, updateParaDemo);
  dpMakeDraggable(document.getElementById('dp-paraN'), svg, ()=>dpParaN, p=>dpParaN=p, updateParaDemo);
  updateParaDemo();
}

/* ---- Figure : médiatrice d'un segment ---- */
let dpMedP={x:90,y:170}, dpMedQ={x:310,y:80};
function updateMedDemo(){
  const dDir = dpDir(dpMedP, dpMedQ);
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpMedP.x+dpMedQ.x)/2, y:(dpMedP.y+dpMedQ.y)/2};
  const medExt = dpExtend(mid, perpDir, 130);
  dpSetLine(document.getElementById('dp-medSeg'), {x1:dpMedP.x,y1:dpMedP.y,x2:dpMedQ.x,y2:dpMedQ.y});
  dpSetLine(document.getElementById('dp-medLine'), medExt);
  dpSetPt(document.getElementById('dp-medP'), dpMedP);
  dpSetPt(document.getElementById('dp-medQ'), dpMedQ);
  dpSetTxt(document.getElementById('dp-medLabelP'), dpMedP, -14, 4);
  dpSetTxt(document.getElementById('dp-medLabelQ'), dpMedQ, 8, 4);
  dpSetTxt(document.getElementById('dp-medLabelMed'), medExt.y1<medExt.y2?{x:medExt.x1,y:medExt.y1}:{x:medExt.x2,y:medExt.y2}, -30, -6);
  // codage des longueurs égales (petits traits obliques sur PM et MQ)
  const tickLen=9, tickAngle=Math.atan2(dDir.y,dDir.x)+Math.PI/2.6;
  const quarter1 = {x:(dpMedP.x+mid.x)/2, y:(dpMedP.y+mid.y)/2};
  const quarter2 = {x:(mid.x+dpMedQ.x)/2, y:(mid.y+dpMedQ.y)/2};
  const t1 = document.getElementById('dp-medTick1a');
  t1.setAttribute('x1', quarter1.x-Math.cos(tickAngle)*tickLen); t1.setAttribute('y1', quarter1.y-Math.sin(tickAngle)*tickLen);
  t1.setAttribute('x2', quarter1.x+Math.cos(tickAngle)*tickLen); t1.setAttribute('y2', quarter1.y+Math.sin(tickAngle)*tickLen);
  const t2 = document.getElementById('dp-medTick1b');
  t2.setAttribute('x1', quarter2.x-Math.cos(tickAngle)*tickLen); t2.setAttribute('y1', quarter2.y-Math.sin(tickAngle)*tickLen);
  t2.setAttribute('x2', quarter2.x+Math.cos(tickAngle)*tickLen); t2.setAttribute('y2', quarter2.y+Math.sin(tickAngle)*tickLen);
  // angle droit au milieu
  const dSign = (perpDir.x*(medExt.x2-mid.x)+perpDir.y*(medExt.y2-mid.y))>=0 ? 1 : -1;
  const dSign2 = (dDir.x*(dpMedQ.x-mid.x)+dDir.y*(dpMedQ.y-mid.y))>=0 ? 1 : -1;
  document.getElementById('dp-medAngleMark').setAttribute('d',
    dpRightAngleMark(mid, {x:dDir.x*dSign2,y:dDir.y*dSign2}, {x:perpDir.x*dSign,y:perpDir.y*dSign}, 13));
}
function resetMedDemo(){ dpMedP={x:90,y:170}; dpMedQ={x:310,y:80}; updateMedDemo(); }
function initMedDemo(){
  const svg = document.getElementById('dp-medSvg');
  dpMakeDraggable(document.getElementById('dp-medP'), svg, ()=>dpMedP, p=>dpMedP=p, updateMedDemo);
  dpMakeDraggable(document.getElementById('dp-medQ'), svg, ()=>dpMedQ, p=>dpMedQ=p, updateMedDemo);
  updateMedDemo();
}

/* ---- Méthode animée : tracer une perpendiculaire ---- */
const DP_METHODE_STEPS = [
  {expr:'Droite (d) et point M', note:"On souhaite tracer la perpendiculaire à (d) passant par M."},
  {expr:"Équerre sur (d)", note:"On place un côté de l'angle droit de l'équerre le long de la droite (d)."},
  {expr:"Équerre glissée jusqu'à M", note:"On fait glisser l'équerre le long de (d) jusqu'à ce que son autre côté touche M."},
  {expr:"Tracé et codage", note:"On trace la droite le long de ce second côté, on la prolonge à la règle, et on code l'angle droit."},
];
const dpMethodeDemo = makeStepDemo(DP_METHODE_STEPS, 'dp-methodeDisplay');

DEMO_REGISTRY['Droites parallèles et perpendiculaires'] = { cours:'cours-demo-droites-paralleles', methode:'methode-demo-droites-paralleles', exos:'exos-demo-droites-paralleles',
  init:()=>{ initPerpDemo(); initParaDemo(); initMedDemo(); dpMethodeDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-droites-paralleles')); } };

DEMO_QUIZZES['Droites parallèles et perpendiculaires'] = [
  {q:"Que signifie (d) ⊥ (d') ?",
   opts:["(d) et (d') sont parallèles","(d) et (d') sont perpendiculaires","(d) et (d') sont confondues"], correct:1},
  {q:"Deux droites parallèles distinctes ont combien de points communs ?",
   opts:["0","1","une infinité"], correct:0},
  {q:"La médiatrice d'un segment [PQ] est...",
   opts:["la droite (PQ) elle-même","la droite perpendiculaire à [PQ] passant par son milieu","le milieu de [PQ]"], correct:1},
];

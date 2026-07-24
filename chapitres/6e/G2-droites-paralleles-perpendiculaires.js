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
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 60" style="width:130px;"><line x1="5" y1="35" x2="135" y2="35" stroke="#1C1B2E" stroke-width="1.6"/><line x1="55" y1="29" x2="55" y2="41" stroke="#1C1B2E" stroke-width="1.6" transform="rotate(-20 55 35)"/><text x="50" y="20" font-size="13" font-style="italic">G</text><line x1="93" y1="9" x2="101" y2="17" stroke="#1C1B2E" stroke-width="1.3"/><line x1="101" y1="9" x2="93" y2="17" stroke="#1C1B2E" stroke-width="1.3"/><text x="106" y="17" font-size="13" font-style="italic">H</text></svg></td>
  </tr>
</table>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Droites perpendiculaires</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>sécantes</b> si elles se coupent en un seul point, appelé <b>point d'intersection</b>.</div>
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

<p class="example-title" style="margin-top:16px;">Construction à la règle et à l'équerre :</p>
<div class="figure-wrap">
  <svg id="dp-perpMethodeSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-pm-lineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="dp-pm-M" r="5" fill="#E35D3A"/>
    <text id="dp-pm-labelM" font-style="italic" font-size="14">M</text>
    <polygon id="dp-pm-equerre" fill="rgba(227,93,58,.28)" stroke="#E35D3A" stroke-width="1.6"/>
    <polygon id="dp-pm-ruler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <line id="dp-pm-lineDp" stroke="#E35D3A" stroke-width="1.8" style="display:none;"/>
    <path id="dp-pm-angleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3" style="display:none;"/>
  </svg>
  <p class="hint" id="dp-pm-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpPerpMethodeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpPerpMethodeReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Droites parallèles</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>parallèles</b> si elles ne sont pas sécantes. On note (d) // (d').</div>
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

<p class="example-title" style="margin-top:16px;">Construction à la règle et à l'équerre :</p>
<div class="figure-wrap">
  <svg id="dp-paraMethodeSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-pam-lineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="dp-pam-N" r="5" fill="#E35D3A"/>
    <text id="dp-pam-labelN" font-style="italic" font-size="14">N</text>
    <line id="dp-pam-ruler" stroke="#1C1B2E" stroke-width="1.4" stroke-dasharray="4 3" style="display:none;"/>
    <polygon id="dp-pam-equerre" fill="rgba(227,93,58,.28)" stroke="#E35D3A" stroke-width="1.6"/>
    <line id="dp-pam-lineDpp" stroke="#E35D3A" stroke-width="1.8" style="display:none;"/>
  </svg>
  <p class="hint" id="dp-pam-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpParaMethodeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpParaMethodeReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Position relative de deux droites</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Deux droites sont : soit <b>sécantes</b> ; soit <b>parallèles</b>.</div>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">Deux droites sécantes sont : soit <b>perpendiculaires</b> ; soit <b>non perpendiculaires</b>.</div>
<p class="hint" style="margin:10px 0 6px;">Remarque : on peut résumer tout cela dans une carte mentale, selon le nombre de points communs aux deux droites.</p>
<svg viewBox="0 0 460 210" style="width:100%;max-width:480px;display:block;margin:10px auto;font-family:'Space Grotesk',sans-serif;">
  <line x1="230" y1="40" x2="112" y2="68" stroke="#1C1B2E" stroke-width="1.3"/>
  <line x1="230" y1="40" x2="348" y2="68" stroke="#1C1B2E" stroke-width="1.3"/>
  <line x1="112" y1="100" x2="58" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="112" y1="100" x2="166" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="348" y1="100" x2="294" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="348" y1="100" x2="402" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <rect x="170" y="6" width="120" height="34" rx="8" fill="#1F3A5C"/>
  <text x="230" y="27" text-anchor="middle" fill="#fff" font-size="12.5">Deux droites</text>
  <rect x="57" y="68" width="110" height="32" rx="8" fill="#E35D3A"/>
  <text x="112" y="89" text-anchor="middle" fill="#fff" font-size="12.5">Sécantes</text>
  <rect x="293" y="68" width="110" height="32" rx="8" fill="#E35D3A"/>
  <text x="348" y="89" text-anchor="middle" fill="#fff" font-size="12.5">Parallèles</text>
  <rect x="10" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="58" y="147" text-anchor="middle" font-size="11">Perpendiculaires</text>
  <text x="58" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">1 point commun</text>
  <rect x="118" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="166" y="141" text-anchor="middle" font-size="10.5">Non</text>
  <text x="166" y="154" text-anchor="middle" font-size="10.5">perpendiculaires</text>
  <text x="166" y="169" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">1 point commun</text>
  <rect x="246" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="294" y="147" text-anchor="middle" font-size="11">Confondues</text>
  <text x="294" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">une infinité</text>
  <rect x="354" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="402" y="147" text-anchor="middle" font-size="11">Distinctes</text>
  <text x="402" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">0 point commun</text>
</svg>

<div class="lesson-header"><span class="num">5</span><h3>Médiatrice d'un segment</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>médiatrice</b> d'un segment est la droite perpendiculaire à ce segment, en son milieu.</div>
<p class="example-title">Exemple : construis la médiatrice du segment [AB].</p>
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
    <text id="dp-medLabelP" font-style="italic" font-size="14">A</text>
    <text id="dp-medLabelQ" font-style="italic" font-size="14">B</text>
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
function dpRulerPolygon(center, dir, perpToDir, length, width){
  const half=length/2, halfW=width/2;
  const c1={x:center.x-dir.x*half+perpToDir.x*halfW, y:center.y-dir.y*half+perpToDir.y*halfW};
  const c2={x:center.x+dir.x*half+perpToDir.x*halfW, y:center.y+dir.y*half+perpToDir.y*halfW};
  const c3={x:center.x+dir.x*half-perpToDir.x*halfW, y:center.y+dir.y*half-perpToDir.y*halfW};
  const c4={x:center.x-dir.x*half-perpToDir.x*halfW, y:center.y-dir.y*half-perpToDir.y*halfW};
  return `${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}`;
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
  dpSetTxt(document.getElementById('dp-perpLabelD'), {x:dpPerpD2.x+dDir.x*24+perpDir.x*16, y:dpPerpD2.y+dDir.y*24+perpDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-perpLabelDp'), {x:dpPerpM.x+perpDir.x*45+dDir.x*16, y:dpPerpM.y+perpDir.y*45+dDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-perpLabelM'), dpPerpM, 8, -10);
  // marque d'angle droit : orientée vers l'intérieur (vers le point M et vers D2)
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
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpParaP1.x+dpParaP2.x)/2, y:(dpParaP1.y+dpParaP2.y)/2};
  const dExt = dpExtend(mid, dDir, 260);
  const dppExt = dpExtend(dpParaN, dDir, 260);
  dpSetLine(document.getElementById('dp-paraLineD'), dExt);
  dpSetLine(document.getElementById('dp-paraLineDpp'), dppExt);
  dpSetPt(document.getElementById('dp-paraP1'), dpParaP1);
  dpSetPt(document.getElementById('dp-paraP2'), dpParaP2);
  dpSetPt(document.getElementById('dp-paraN'), dpParaN);
  dpSetTxt(document.getElementById('dp-paraLabelD'), {x:dpParaP2.x+dDir.x*24+perpDir.x*16, y:dpParaP2.y+dDir.y*24+perpDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-paraLabelDpp'), {x:dpParaN.x+dDir.x*24+perpDir.x*16, y:dpParaN.y+dDir.y*24+perpDir.y*16}, 0, 0);
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
  dpSetTxt(document.getElementById('dp-medLabelMed'), {x:mid.x+perpDir.x*60, y:mid.y+perpDir.y*60}, -40, -4);
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

/* ---- Construction pas à pas : perpendiculaire à l'équerre ---- */
const DP_PM_D1={x:70,y:70}, DP_PM_D2={x:330,y:150}, DP_PM_M={x:230,y:50};
const dpPmDir = dpDir(DP_PM_D1, DP_PM_D2);
let dpPmPerp = {x:-dpPmDir.y, y:dpPmDir.x};
const dpPmFoot = dpIntersect(DP_PM_D1, dpPmDir, DP_PM_M, dpPmPerp);
if(dpPmPerp.x*(DP_PM_M.x-dpPmFoot.x) + dpPmPerp.y*(DP_PM_M.y-dpPmFoot.y) < 0){ dpPmPerp = {x:-dpPmPerp.x, y:-dpPmPerp.y}; }
const dpPmFootDist = Math.hypot(dpPmFoot.x-DP_PM_D1.x, dpPmFoot.y-DP_PM_D1.y);
const dpPmTouchDist = Math.hypot(DP_PM_M.x-dpPmFoot.x, DP_PM_M.y-dpPmFoot.y);
const DP_PM_STEPS = [
  {dist: 40, note:"On place un côté de l'angle droit de l'équerre sur la droite (d)."},
  {dist: 95, note:"On fait glisser l'équerre le long de (d), sans la faire tourner."},
  {dist: dpPmFootDist, note:"On arrête de glisser dès que l'autre côté de l'équerre touche le point M."},
  {dist: dpPmFootDist, showLine:true, note:"On trace la droite le long de ce second côté, on la prolonge à la règle, et on nomme (d') en codant l'angle droit."},
];
let dpPmIdx = 0;
function dpRenderPerpMethode(){
  const s = DP_PM_STEPS[dpPmIdx];
  const dExt = dpExtend({x:(DP_PM_D1.x+DP_PM_D2.x)/2,y:(DP_PM_D1.y+DP_PM_D2.y)/2}, dpPmDir, 260);
  dpSetLine(document.getElementById('dp-pm-lineD'), dExt);
  dpSetPt(document.getElementById('dp-pm-M'), DP_PM_M);
  dpSetTxt(document.getElementById('dp-pm-labelM'), DP_PM_M, 8, -10);
  const pos = {x:DP_PM_D1.x+dpPmDir.x*s.dist, y:DP_PM_D1.y+dpPmDir.y*s.dist};
  const c2 = {x:pos.x+dpPmDir.x*90, y:pos.y+dpPmDir.y*90};
  const c3 = {x:pos.x+dpPmPerp.x*dpPmTouchDist, y:pos.y+dpPmPerp.y*dpPmTouchDist};
  document.getElementById('dp-pm-equerre').setAttribute('points', `${pos.x},${pos.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`);
  const lineDp = document.getElementById('dp-pm-lineDp'), angleMark = document.getElementById('dp-pm-angleMark'), ruler = document.getElementById('dp-pm-ruler');
  if(s.showLine){
    const dpExt = dpExtend(DP_PM_M, dpPmPerp, 140);
    dpSetLine(lineDp, dpExt);
    lineDp.style.display='';
    angleMark.setAttribute('d', dpRightAngleMark(dpPmFoot, {x:dpPmDir.x,y:dpPmDir.y}, {x:dpPmPerp.x,y:dpPmPerp.y}, 13));
    angleMark.style.display='';
    const rulerCenter = {x:DP_PM_M.x+dpPmPerp.x*55, y:DP_PM_M.y+dpPmPerp.y*55};
    ruler.setAttribute('points', dpRulerPolygon(rulerCenter, dpPmPerp, dpPmDir, 130, 13));
    ruler.style.display='';
  } else {
    lineDp.style.display='none';
    angleMark.style.display='none';
    ruler.style.display='none';
  }
  document.getElementById('dp-pm-note').textContent = s.note;
}
function dpPerpMethodeNext(){ if(dpPmIdx<DP_PM_STEPS.length-1) dpPmIdx++; dpRenderPerpMethode(); }
function dpPerpMethodeReset(){ dpPmIdx=0; dpRenderPerpMethode(); }

/* ---- Construction pas à pas : parallèle à l'équerre ---- */
const DP_PAM_P1={x:60,y:190}, DP_PAM_P2={x:300,y:110}, DP_PAM_N={x:150,y:50};
const dpPamDir = dpDir(DP_PAM_P1, DP_PAM_P2);
const dpPamPerp = {x:-dpPamDir.y, y:dpPamDir.x};
const dpPamSlideDist = dpPamPerp.x*(DP_PAM_N.x-DP_PAM_P1.x) + dpPamPerp.y*(DP_PAM_N.y-DP_PAM_P1.y);
const dpPamCornerFinal = {x:DP_PAM_P1.x+dpPamPerp.x*dpPamSlideDist, y:DP_PAM_P1.y+dpPamPerp.y*dpPamSlideDist};
const dpPamTouchDist = Math.hypot(DP_PAM_N.x-dpPamCornerFinal.x, DP_PAM_N.y-dpPamCornerFinal.y);
const DP_PAM_STEPS = [
  {frac: 0, note:"On place un côté de l'angle droit de l'équerre sur la droite (d), et la règle le long de l'autre côté droit."},
  {frac: 0.5, note:"L'équerre glisse le long de la règle (sans que la règle ne bouge), en direction du point N."},
  {frac: 1, note:"On arrête de glisser dès que le côté de l'équerre passe par le point N."},
  {frac: 1, showLine:true, note:"On trace la droite le long de ce côté : on nomme (d'') la droite obtenue."},
];
let dpPamIdx = 0;
function dpRenderParaMethode(){
  const s = DP_PAM_STEPS[dpPamIdx];
  const dExt = dpExtend({x:(DP_PAM_P1.x+DP_PAM_P2.x)/2,y:(DP_PAM_P1.y+DP_PAM_P2.y)/2}, dpPamDir, 260);
  dpSetLine(document.getElementById('dp-pam-lineD'), dExt);
  dpSetPt(document.getElementById('dp-pam-N'), DP_PAM_N);
  dpSetTxt(document.getElementById('dp-pam-labelN'), DP_PAM_N, 8, -10);
  const rulerExt = dpExtend(DP_PAM_P1, dpPamPerp, 140);
  const ruler = document.getElementById('dp-pam-ruler');
  dpSetLine(ruler, rulerExt); ruler.style.display='';
  const corner = {x:DP_PAM_P1.x+dpPamPerp.x*dpPamSlideDist*s.frac, y:DP_PAM_P1.y+dpPamPerp.y*dpPamSlideDist*s.frac};
  const c2 = {x:corner.x+dpPamDir.x*dpPamTouchDist, y:corner.y+dpPamDir.y*dpPamTouchDist};
  const c3 = {x:corner.x+dpPamPerp.x*55*(dpPamSlideDist>=0?1:-1), y:corner.y+dpPamPerp.y*55*(dpPamSlideDist>=0?1:-1)};
  document.getElementById('dp-pam-equerre').setAttribute('points', `${corner.x},${corner.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`);
  const lineDpp = document.getElementById('dp-pam-lineDpp');
  if(s.showLine){
    const dppExt = dpExtend(DP_PAM_N, dpPamDir, 260);
    dpSetLine(lineDpp, dppExt);
    lineDpp.style.display='';
  } else {
    lineDpp.style.display='none';
  }
  document.getElementById('dp-pam-note').textContent = s.note;
}
function dpParaMethodeNext(){ if(dpPamIdx<DP_PAM_STEPS.length-1) dpPamIdx++; dpRenderParaMethode(); }
function dpParaMethodeReset(){ dpPamIdx=0; dpRenderParaMethode(); }

/* ---- Méthode animée : tracer une perpendiculaire ---- */
const DP_METHODE_STEPS = [
  {expr:'Droite (d) et point M', note:"On souhaite tracer la perpendiculaire à (d) passant par M."},
  {expr:"Équerre sur (d)", note:"On place un côté de l'angle droit de l'équerre le long de la droite (d)."},
  {expr:"Équerre glissée jusqu'à M", note:"On fait glisser l'équerre le long de (d) jusqu'à ce que son autre côté touche M."},
  {expr:"Tracé et codage", note:"On trace la droite le long de ce second côté, on la prolonge à la règle, et on code l'angle droit."},
];
const dpMethodeDemo = makeStepDemo(DP_METHODE_STEPS, 'dp-methodeDisplay');

DEMO_REGISTRY['Droites parallèles et perpendiculaires'] = { cours:'cours-demo-droites-paralleles', methode:'methode-demo-droites-paralleles', exos:'exos-demo-droites-paralleles',
  init:()=>{ initPerpDemo(); initParaDemo(); initMedDemo(); dpPerpMethodeReset(); dpParaMethodeReset(); dpMethodeDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-droites-paralleles')); } };

DEMO_QUIZZES['Droites parallèles et perpendiculaires'] = [
  {q:"Que signifie (d) ⊥ (d') ?",
   opts:["(d) et (d') sont parallèles","(d) et (d') sont perpendiculaires","(d) et (d') sont confondues"], correct:1},
  {q:"Deux droites parallèles distinctes ont combien de points communs ?",
   opts:["0","1","une infinité"], correct:0},
  {q:"La médiatrice d'un segment [AB] est...",
   opts:["la droite (AB) elle-même","la droite perpendiculaire à [AB] passant par son milieu","le milieu de [AB]"], correct:1},
];

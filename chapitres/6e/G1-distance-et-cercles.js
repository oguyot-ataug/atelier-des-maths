/* ============================================================
   CHAPITRE : Distance et cercles (6e, G1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-distance-cercles').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Distance entre deux points</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>distance</b> entre deux points A et B est la longueur du segment [AB].</div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;font-size:.92rem;margin:10px 0 12px;">
  <tr>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Notation</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Signification</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Figure</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">AB</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">C'est la <b>longueur</b> du segment [AB].</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 160 50" style="width:150px;"><line x1="20" y1="25" x2="140" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="20" y1="18" x2="20" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><line x1="140" y1="18" x2="140" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><text x="16" y="14" font-size="13" font-style="italic">A</text><text x="136" y="14" font-size="13" font-style="italic">B</text><text x="55" y="45" font-size="11" fill="#8A4210">AB = 4 cm</text></svg></td>
  </tr>
</table>
</div>
<p class="hint" style="margin:6px 0 0;">Remarque : le plus court chemin pour aller de A à B est le segment [AB].</p>

<div class="lesson-header"><span class="num">2</span><h3>Milieu d'un segment</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Le <b>milieu</b> du segment [RT] est le point du segment [RT] qui est équidistant (à la même distance) des points R et T.</div>
<p class="example-title">Exemple : trace un segment [RT] de longueur 6 cm puis construis son milieu A.</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Déplacez R ou T : le milieu A se recalcule en temps réel, avec le codage des longueurs égales.</p>
<div class="figure-wrap">
  <svg id="dc-milieuSvg" viewBox="0 0 400 200" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dc-milieuSeg" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="dc-milieuTick1" stroke="#1F6B3A" stroke-width="1.8"/>
    <line id="dc-milieuTick2" stroke="#1F6B3A" stroke-width="1.8"/>
    <circle id="dc-milieuR" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <circle id="dc-milieuT" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <circle id="dc-milieuA" r="4" fill="#E35D3A"/>
    <text id="dc-milieuLabelR" font-style="italic" font-size="14">R</text>
    <text id="dc-milieuLabelT" font-style="italic" font-size="14">T</text>
    <text id="dc-milieuLabelA" font-style="italic" font-size="14" fill="#E35D3A">A</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetMilieuDemo()">Réinitialiser</button>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Vocabulaire du cercle</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>cercle</b> est l'ensemble des points équidistants d'un point appelé <b>centre</b>. Cette distance est le <b>rayon</b> du cercle.<br>Autrement dit, le cercle (C) de centre O et de rayon r est l'ensemble des points M tels que OM = r.</div>
<p class="interaction-hint" style="margin:4px 0 8px;">Déplacez le point A : tout le reste de la figure (diamètre, corde) suit, en gardant les mêmes proportions.</p>
<div class="figure-wrap">
  <svg id="dc-vocabSvg" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle id="dc-vocabCircle" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dc-vocabRayon" stroke="#1C1B2E" stroke-width="1.5"/>
    <line id="dc-vocabDiametre" stroke="#1C1B2E" stroke-width="1.5"/>
    <line id="dc-vocabCorde" stroke="#1C1B2E" stroke-width="1.5"/>
    <circle id="dc-vocabO" r="4" fill="#1C1B2E"/>
    <circle id="dc-vocabA" r="5.5" fill="#E35D3A" style="cursor:grab;"/>
    <circle id="dc-vocabE" r="4" fill="#1C1B2E"/>
    <circle id="dc-vocabF" r="4" fill="#1C1B2E"/>
    <circle id="dc-vocabM" r="4" fill="#1C1B2E"/>
    <circle id="dc-vocabN" r="4" fill="#1C1B2E"/>
    <text id="dc-vocabLabelO" font-style="italic" font-size="14">O</text>
    <text id="dc-vocabLabelA" font-style="italic" font-size="14" fill="#E35D3A">A</text>
    <text id="dc-vocabLabelE" font-style="italic" font-size="14">E</text>
    <text id="dc-vocabLabelF" font-style="italic" font-size="14">F</text>
    <text id="dc-vocabLabelM" font-style="italic" font-size="14">M</text>
    <text id="dc-vocabLabelN" font-style="italic" font-size="14">N</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetVocabDemo()">Réinitialiser</button>
  </div>
</div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;font-size:.9rem;margin:10px 0 12px;">
  <tr><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le <b>centre</b> est le point équidistant de tous les points du cercle.</td><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le point O est le <b>centre</b> du cercle.</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Un <b>rayon</b> est un segment joignant un point du cercle à son centre.</td><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le segment [OA] est un <b>rayon</b> du cercle.</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Une <b>corde</b> est un segment joignant deux points du cercle.</td><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le segment [MN] est une <b>corde</b> du cercle.</td></tr>
  <tr><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Un <b>diamètre</b> est un segment joignant deux points du cercle et passant par son centre.<br>Autrement dit, c'est une <b>corde</b> qui passe par le centre du cercle.</td><td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le segment [EF] est un <b>diamètre</b> du cercle.</td></tr>
</table>
</div>
<p class="hint" style="margin:6px 0 0;">Remarque 1 : par commodité de langage, on appelle aussi « rayon » la longueur du rayon d'un cercle, et « diamètre » la longueur de son diamètre.</p>
<p class="hint" style="margin:6px 0 0;">Remarque 2 : le diamètre d'un cercle est égal au double de son rayon, et il est toujours supérieur ou égal à la longueur de n'importe quelle corde.</p>
<p class="hint" style="margin:6px 0 16px;">Remarque 3 : <b>un</b> rayon est un segment parmi une infinité (chaque point du cercle donne un rayon différent), alors que <b>le</b> rayon est une longueur : elle est unique. Il en va de même pour <b>un</b> diamètre et <b>le</b> diamètre : remarquez le rôle de l'article indéfini (« un », un segment parmi d'autres) et de l'article défini (« le », une valeur unique).</p>

<span class="def-badge">Définition</span>
<div class="def-box">Un <b>disque</b> est l'ensemble des points situés à une distance inférieure ou égale à un nombre donné (le <b>rayon</b>) d'un point donné (le <b>centre</b>).<br>Autrement dit, le disque de centre O et de rayon r est l'ensemble des points M tels que OM ≤ r.</div>

<div class="lesson-header"><span class="num">4</span><h3>Distance à un point</h3></div>
<p class="example-title" style="margin-top:0;">A. Cercle</p>
<span class="prop-badge">Propriétés</span>
<div class="def-box">
  Si un point appartient au cercle de centre O et de rayon r, alors sa distance à O est égale à r.<br>
  Si la distance d'un point à O est égale à r, alors ce point appartient au cercle de centre O et de rayon r.
</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Le <b>cercle</b> de centre O et de rayon r est l'ensemble des points situés exactement à une distance r de O.</div>
<p class="example-title">Exemple : un cercle a pour centre O et pour rayon 2 cm.</p>
<ul class="example-list">
  <li>Un point A est tel que OA = 2 cm. Donc A appartient au cercle.</li>
  <li>Un point B est tel que OB = 5 cm. Or, 5 cm est différent de 2 cm. Donc B n'appartient pas au cercle.</li>
</ul>

<p class="example-title">B. Disque</p>
<span class="prop-badge">Propriétés</span>
<div class="def-box">
  Si la distance d'un point à O est inférieure ou égale à r, alors ce point appartient au disque de centre O et de rayon r.<br>
  Si la distance d'un point à O est supérieure à r, alors ce point n'appartient pas au disque de centre O et de rayon r.
</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Le <b>disque</b> de centre O et de rayon r est l'ensemble des points dont la distance à O est inférieure ou égale à r.</div>
<p class="example-title">Exemple : reprenons le même cercle (centre O, rayon 2 cm).</p>
<ul class="example-list">
  <li>Un point C est tel que OC = 1,5 cm. Or, 1,5 cm est inférieur à 2 cm. Donc C appartient au disque (mais pas au cercle, puisque sa distance à O n'est pas exactement 2 cm).</li>
  <li>Un point D est tel que OD = 4 cm. Or, 4 cm est supérieur à 2 cm. Donc D n'appartient pas au disque.</li>
</ul>

<p class="interaction-hint" style="margin:8px 0 8px;">Déplacez le point P : sa distance à O et sa position (sur le cercle, dans le disque, ou à l'extérieur) se recalculent en direct.</p>
<div class="figure-wrap">
  <svg id="dc-distSvg" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle id="dc-distDisque" fill="rgba(31,58,92,.08)" stroke="none"/>
    <circle id="dc-distCircle" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dc-distSeg" stroke="#8A8578" stroke-width="1.3" stroke-dasharray="4 3"/>
    <circle id="dc-distO" r="4" fill="#1C1B2E"/>
    <circle id="dc-distP" r="6" fill="#E35D3A" style="cursor:grab;"/>
    <text id="dc-distLabelO" font-style="italic" font-size="14">O</text>
    <text id="dc-distLabelP" font-style="italic" font-size="14" fill="#E35D3A">P</text>
  </svg>
  <p class="hint" id="dc-distNote" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetDistDemo()">Réinitialiser</button>
  </div>
</div>
`;

document.getElementById('histoire-demo-distance-cercles').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Le compas et la règle sont les deux seuls instruments que les mathématiciens grecs de l'Antiquité s'autorisaient pour leurs constructions géométriques. Vers 300 av. J.-C., à Alexandrie (en Égypte), le mathématicien grec Euclide rassemble dans son livre <i>Les Éléments</i> toutes les connaissances de géométrie de son époque, en les démontrant à partir de règles très simples. Ce livre restera la référence absolue pour apprendre la géométrie pendant plus de 2 000 ans, jusqu'au 19e siècle !
</div>
`;

document.getElementById('methode-demo-distance-cercles').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : construire le milieu d'un segment à la règle</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <svg id="dc-mm-svg" viewBox="0 0 400 220" style="width:100%;max-width:460px;display:block;margin:10px auto 0;background:var(--white);border-radius:8px;">
    <line id="dc-mm-seg" stroke="#1C1B2E" stroke-width="1.8"/>
    <circle id="dc-mm-R" r="5" fill="#1C1B2E"/>
    <circle id="dc-mm-T" r="5" fill="#1C1B2E"/>
    <text id="dc-mm-labelR" font-style="italic" font-size="14">R</text>
    <text id="dc-mm-labelT" font-style="italic" font-size="14">T</text>
    <polygon id="dc-mm-ruler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <path id="dc-mm-ticks" stroke="#1C1B2E" stroke-width="1" fill="none" style="display:none;"/>
    <g id="dc-mm-labels" style="display:none;"></g>
    <circle id="dc-mm-A" r="4.5" fill="#E35D3A" style="display:none;"/>
    <text id="dc-mm-labelA" font-style="italic" font-size="14" fill="#E35D3A" style="display:none;">A</text>
    <line id="dc-mm-tick1" stroke="#1F6B3A" stroke-width="1.8" style="display:none;"/>
    <line id="dc-mm-tick2" stroke="#1F6B3A" stroke-width="1.8" style="display:none;"/>
  </svg>
  <p class="hint" id="dc-mm-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dcMmNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dcMmReset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-distance-cercles').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Un point appartient-il à un cercle ou à un disque ? »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On sait que OM = 3,2 cm et que le cercle de centre O a pour rayon 5 cm.</span><span class="we-comment">On énonce les données.</span></div>
    <div class="we-row"><span class="we-expr">Or, 3,2 cm est inférieur à 5 cm.</span><span class="we-comment">On compare les distances.</span></div>
    <div class="we-row"><span class="we-expr">Donc M appartient au disque de centre O et de rayon 5 cm, mais pas au cercle.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un segment [PQ] de longueur 8 cm, puis construis son milieu à la règle.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Un cercle a pour centre O et pour rayon 4 cm. Un point K est tel que OK = 4 cm, et un point L est tel que OL = 6 cm. K et L appartiennent-ils au cercle ? Au disque ? Rédige tes réponses.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Sur un cercle de centre O, place deux points E et F tels que [EF] soit un diamètre, puis deux points M et N tels que [MN] soit une corde qui n'est pas un diamètre.
  </div>
</div>
`;

/* ================= Figure dynamique : milieu d'un segment ================= */
let dcMilieuR = {x:80,y:100}, dcMilieuT = {x:320,y:100};
function dcUpdateMilieu(){
  const A = {x:(dcMilieuR.x+dcMilieuT.x)/2, y:(dcMilieuR.y+dcMilieuT.y)/2};
  document.getElementById('dc-milieuSeg').setAttribute('x1', dcMilieuR.x);
  document.getElementById('dc-milieuSeg').setAttribute('y1', dcMilieuR.y);
  document.getElementById('dc-milieuSeg').setAttribute('x2', dcMilieuT.x);
  document.getElementById('dc-milieuSeg').setAttribute('y2', dcMilieuT.y);
  document.getElementById('dc-milieuR').setAttribute('cx', dcMilieuR.x); document.getElementById('dc-milieuR').setAttribute('cy', dcMilieuR.y);
  document.getElementById('dc-milieuT').setAttribute('cx', dcMilieuT.x); document.getElementById('dc-milieuT').setAttribute('cy', dcMilieuT.y);
  document.getElementById('dc-milieuA').setAttribute('cx', A.x); document.getElementById('dc-milieuA').setAttribute('cy', A.y);
  document.getElementById('dc-milieuLabelR').setAttribute('x', dcMilieuR.x-16); document.getElementById('dc-milieuLabelR').setAttribute('y', dcMilieuR.y+5);
  document.getElementById('dc-milieuLabelT').setAttribute('x', dcMilieuT.x+8); document.getElementById('dc-milieuLabelT').setAttribute('y', dcMilieuT.y+5);
  document.getElementById('dc-milieuLabelA').setAttribute('x', A.x-4); document.getElementById('dc-milieuLabelA').setAttribute('y', A.y-12);

  const dx = dcMilieuT.x-dcMilieuR.x, dy = dcMilieuT.y-dcMilieuR.y;
  const len = Math.hypot(dx,dy)||1;
  const perp = {x:-dy/len, y:dx/len};
  const tickLen = 8;
  const q1 = {x:(dcMilieuR.x+A.x)/2, y:(dcMilieuR.y+A.y)/2};
  const q2 = {x:(A.x+dcMilieuT.x)/2, y:(A.y+dcMilieuT.y)/2};
  document.getElementById('dc-milieuTick1').setAttribute('x1', q1.x-perp.x*tickLen); document.getElementById('dc-milieuTick1').setAttribute('y1', q1.y-perp.y*tickLen);
  document.getElementById('dc-milieuTick1').setAttribute('x2', q1.x+perp.x*tickLen); document.getElementById('dc-milieuTick1').setAttribute('y2', q1.y+perp.y*tickLen);
  document.getElementById('dc-milieuTick2').setAttribute('x1', q2.x-perp.x*tickLen); document.getElementById('dc-milieuTick2').setAttribute('y1', q2.y-perp.y*tickLen);
  document.getElementById('dc-milieuTick2').setAttribute('x2', q2.x+perp.x*tickLen); document.getElementById('dc-milieuTick2').setAttribute('y2', q2.y+perp.y*tickLen);
}
function dcMakeDraggableFree(circleEl, svg, setPoint, onMove){
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
function initMilieuDemo(){
  const svg = document.getElementById('dc-milieuSvg');
  dcMakeDraggableFree(document.getElementById('dc-milieuR'), svg, p=>dcMilieuR=p, dcUpdateMilieu);
  dcMakeDraggableFree(document.getElementById('dc-milieuT'), svg, p=>dcMilieuT=p, dcUpdateMilieu);
  dcUpdateMilieu();
}
function resetMilieuDemo(){ dcMilieuR={x:80,y:100}; dcMilieuT={x:320,y:100}; dcUpdateMilieu(); }

/* ================= Figure dynamique : vocabulaire du cercle ================= */
const dcVocabO = {x:200,y:130};
let dcVocabA = {x:280,y:80};
function dcUpdateVocab(){
  const r = Math.hypot(dcVocabA.x-dcVocabO.x, dcVocabA.y-dcVocabO.y);
  const angleA = Math.atan2(dcVocabA.y-dcVocabO.y, dcVocabA.x-dcVocabO.x);
  function pointAtAngle(angle){ return {x:dcVocabO.x+Math.cos(angle)*r, y:dcVocabO.y+Math.sin(angle)*r}; }
  const E = pointAtAngle(angleA+Math.PI/2);
  const F = pointAtAngle(angleA+Math.PI/2+Math.PI);
  const M = pointAtAngle(angleA+150*Math.PI/180);
  const N = pointAtAngle(angleA+210*Math.PI/180);

  document.getElementById('dc-vocabCircle').setAttribute('cx', dcVocabO.x); document.getElementById('dc-vocabCircle').setAttribute('cy', dcVocabO.y); document.getElementById('dc-vocabCircle').setAttribute('r', r);
  document.getElementById('dc-vocabO').setAttribute('cx', dcVocabO.x); document.getElementById('dc-vocabO').setAttribute('cy', dcVocabO.y);
  document.getElementById('dc-vocabA').setAttribute('cx', dcVocabA.x); document.getElementById('dc-vocabA').setAttribute('cy', dcVocabA.y);
  ['E','F','M','N'].forEach((name,i)=>{
    const pt = [E,F,M,N][i];
    document.getElementById('dc-vocab'+name).setAttribute('cx', pt.x); document.getElementById('dc-vocab'+name).setAttribute('cy', pt.y);
    document.getElementById('dc-vocabLabel'+name).setAttribute('x', pt.x+(pt.x>dcVocabO.x?8:-18)); document.getElementById('dc-vocabLabel'+name).setAttribute('y', pt.y+(pt.y>dcVocabO.y?16:-6));
  });
  document.getElementById('dc-vocabLabelO').setAttribute('x', dcVocabO.x-16); document.getElementById('dc-vocabLabelO').setAttribute('y', dcVocabO.y+5);
  document.getElementById('dc-vocabLabelA').setAttribute('x', dcVocabA.x+(dcVocabA.x>dcVocabO.x?8:-18)); document.getElementById('dc-vocabLabelA').setAttribute('y', dcVocabA.y+(dcVocabA.y>dcVocabO.y?16:-6));

  document.getElementById('dc-vocabRayon').setAttribute('x1', dcVocabO.x); document.getElementById('dc-vocabRayon').setAttribute('y1', dcVocabO.y);
  document.getElementById('dc-vocabRayon').setAttribute('x2', dcVocabA.x); document.getElementById('dc-vocabRayon').setAttribute('y2', dcVocabA.y);
  document.getElementById('dc-vocabDiametre').setAttribute('x1', E.x); document.getElementById('dc-vocabDiametre').setAttribute('y1', E.y);
  document.getElementById('dc-vocabDiametre').setAttribute('x2', F.x); document.getElementById('dc-vocabDiametre').setAttribute('y2', F.y);
  document.getElementById('dc-vocabCorde').setAttribute('x1', M.x); document.getElementById('dc-vocabCorde').setAttribute('y1', M.y);
  document.getElementById('dc-vocabCorde').setAttribute('x2', N.x); document.getElementById('dc-vocabCorde').setAttribute('y2', N.y);
}
function initVocabDemo(){
  const svg = document.getElementById('dc-vocabSvg');
  dcMakeDraggableFree(document.getElementById('dc-vocabA'), svg, p=>dcVocabA=p, dcUpdateVocab);
  dcUpdateVocab();
}
function resetVocabDemo(){ dcVocabA={x:280,y:80}; dcUpdateVocab(); }

/* ================= Figure dynamique : distance à un point (cercle / disque) ================= */
const dcDistO = {x:200,y:130};
const dcDistR = 80;
let dcDistP = {x:320,y:130};
function dcUpdateDist(){
  const dist = Math.hypot(dcDistP.x-dcDistO.x, dcDistP.y-dcDistO.y);
  document.getElementById('dc-distDisque').setAttribute('cx', dcDistO.x); document.getElementById('dc-distDisque').setAttribute('cy', dcDistO.y); document.getElementById('dc-distDisque').setAttribute('r', dcDistR);
  document.getElementById('dc-distCircle').setAttribute('cx', dcDistO.x); document.getElementById('dc-distCircle').setAttribute('cy', dcDistO.y); document.getElementById('dc-distCircle').setAttribute('r', dcDistR);
  document.getElementById('dc-distO').setAttribute('cx', dcDistO.x); document.getElementById('dc-distO').setAttribute('cy', dcDistO.y);
  document.getElementById('dc-distP').setAttribute('cx', dcDistP.x); document.getElementById('dc-distP').setAttribute('cy', dcDistP.y);
  document.getElementById('dc-distSeg').setAttribute('x1', dcDistO.x); document.getElementById('dc-distSeg').setAttribute('y1', dcDistO.y);
  document.getElementById('dc-distSeg').setAttribute('x2', dcDistP.x); document.getElementById('dc-distSeg').setAttribute('y2', dcDistP.y);
  document.getElementById('dc-distLabelO').setAttribute('x', dcDistO.x-16); document.getElementById('dc-distLabelO').setAttribute('y', dcDistO.y+5);
  document.getElementById('dc-distLabelP').setAttribute('x', dcDistP.x+8); document.getElementById('dc-distLabelP').setAttribute('y', dcDistP.y+5);

  const tol = 3;
  let statut, couleur;
  if(Math.abs(dist-dcDistR) <= tol){ statut = "P appartient au cercle (et donc aussi au disque)."; couleur = '#1F6B3A'; }
  else if(dist < dcDistR){ statut = "P appartient au disque, mais pas au cercle (il est strictement à l'intérieur)."; couleur = '#1F3A5C'; }
  else { statut = "P n'appartient ni au cercle, ni au disque (il est à l'extérieur)."; couleur = '#A83C1F'; }
  document.getElementById('dc-distP').setAttribute('fill', couleur);
  document.getElementById('dc-distNote').textContent = `OP ≈ ${(dist/dcDistR*2).toFixed(1)} (le rayon vaut 2) : ${statut}`;
}
function initDistDemo(){
  const svg = document.getElementById('dc-distSvg');
  dcMakeDraggableFree(document.getElementById('dc-distP'), svg, p=>dcDistP=p, dcUpdateDist);
  dcUpdateDist();
}
function resetDistDemo(){ dcDistP={x:320,y:130}; dcUpdateDist(); }

/* ================= Méthode animée : milieu d'un segment à la règle ================= */
const DC_MM_R = {x:70,y:150}, DC_MM_T = {x:330,y:110};
const dcMmDir = dpDir(DC_MM_R, DC_MM_T);
const dcMmPerp = {x:-dcMmDir.y, y:dcMmDir.x};
const dcMmSegLen = Math.hypot(DC_MM_T.x-DC_MM_R.x, DC_MM_T.y-DC_MM_R.y);
const dcMmMid = {x:(DC_MM_R.x+DC_MM_T.x)/2, y:(DC_MM_R.y+DC_MM_T.y)/2};
const DC_MM_STEPS = [
  {phase:'segment', note:"On trace un segment [RT] de longueur 6 cm."},
  {phase:'ruler', note:"On place la règle le long de [RT], avec le 0 posé sur R."},
  {phase:'point', note:"On place le point A à 3 cm du point R sur le segment [RT] (soit la moitié de 6 cm)."},
  {phase:'coded', note:"On code les segments [RA] et [AT] avec le même symbole : ils ont la même longueur, donc A est le milieu de [RT]."},
];
let dcMmIdx = 0;
function dcRenderMm(){
  const s = DC_MM_STEPS[dcMmIdx];
  dpSetLine(document.getElementById('dc-mm-seg'), {x1:DC_MM_R.x,y1:DC_MM_R.y,x2:DC_MM_T.x,y2:DC_MM_T.y});
  dpSetPt(document.getElementById('dc-mm-R'), DC_MM_R);
  dpSetPt(document.getElementById('dc-mm-T'), DC_MM_T);
  dpSetTxt(document.getElementById('dc-mm-labelR'), DC_MM_R, -16, 5);
  dpSetTxt(document.getElementById('dc-mm-labelT'), DC_MM_T, 8, 5);

  const ruler = document.getElementById('dc-mm-ruler'), ticks = document.getElementById('dc-mm-ticks'), labels = document.getElementById('dc-mm-labels');
  if(s.phase==='ruler'){
    const rulerW = 26;
    const rulerCenter = {x:DC_MM_R.x+dcMmDir.x*(dcMmSegLen/2)+dcMmPerp.x*(rulerW/2), y:DC_MM_R.y+dcMmDir.y*(dcMmSegLen/2)+dcMmPerp.y*(rulerW/2)};
    ruler.setAttribute('points', dpRulerPolygon(rulerCenter, dcMmDir, dcMmPerp, dcMmSegLen+30, rulerW));
    ruler.style.display='';
    const cmPx = dcMmSegLen/6, mmPx = cmPx/10;
    let ticksPath = '', labelsHtml = '';
    for(let i=0;i<=60;i++){
      const isCm = i%10===0;
      const pt = {x:DC_MM_R.x+dcMmDir.x*mmPx*i, y:DC_MM_R.y+dcMmDir.y*mmPx*i};
      const isHalfCm = i%10===5;
      const depth = isCm ? 10 : (isHalfCm ? 7 : 4);
      const t2 = {x:pt.x+dcMmPerp.x*depth, y:pt.y+dcMmPerp.y*depth};
      ticksPath += `M ${pt.x} ${pt.y} L ${t2.x} ${t2.y} `;
      if(isCm){
        const cmIndex = i/10;
        const isHalf = cmIndex===3;
        const labelPos = {x:pt.x+dcMmPerp.x*18, y:pt.y+dcMmPerp.y*18};
        labelsHtml += `<text x="${labelPos.x}" y="${labelPos.y}" font-size="${isHalf?11:9}" text-anchor="middle" fill="${isHalf?'#1F6B3A':'#1C1B2E'}" font-weight="${isHalf?700:400}">${cmIndex}</text>`;
      }
    }
    ticks.setAttribute('d', ticksPath); ticks.style.display='';
    labels.innerHTML = labelsHtml; labels.style.display='';
  } else {
    ruler.style.display='none'; ticks.style.display='none'; labels.style.display='none';
  }

  const A = document.getElementById('dc-mm-A'), labelA = document.getElementById('dc-mm-labelA');
  if(s.phase==='point' || s.phase==='coded'){
    dpSetPt(A, dcMmMid); A.style.display='';
    dpSetTxt(labelA, dcMmMid, -4, -12); labelA.style.display='';
  } else {
    A.style.display='none'; labelA.style.display='none';
  }

  const tick1 = document.getElementById('dc-mm-tick1'), tick2 = document.getElementById('dc-mm-tick2');
  if(s.phase==='coded'){
    const tickLen = 8;
    const q1 = {x:(DC_MM_R.x+dcMmMid.x)/2, y:(DC_MM_R.y+dcMmMid.y)/2};
    const q2 = {x:(dcMmMid.x+DC_MM_T.x)/2, y:(dcMmMid.y+DC_MM_T.y)/2};
    tick1.setAttribute('x1', q1.x-dcMmPerp.x*tickLen); tick1.setAttribute('y1', q1.y-dcMmPerp.y*tickLen);
    tick1.setAttribute('x2', q1.x+dcMmPerp.x*tickLen); tick1.setAttribute('y2', q1.y+dcMmPerp.y*tickLen);
    tick2.setAttribute('x1', q2.x-dcMmPerp.x*tickLen); tick2.setAttribute('y1', q2.y-dcMmPerp.y*tickLen);
    tick2.setAttribute('x2', q2.x+dcMmPerp.x*tickLen); tick2.setAttribute('y2', q2.y+dcMmPerp.y*tickLen);
    tick1.style.display=''; tick2.style.display='';
  } else {
    tick1.style.display='none'; tick2.style.display='none';
  }

  document.getElementById('dc-mm-note').textContent = s.note;
}
function dcMmNext(){ if(dcMmIdx<DC_MM_STEPS.length-1) dcMmIdx++; dcRenderMm(); }
function dcMmReset(){ dcMmIdx=0; dcRenderMm(); }

DEMO_REGISTRY['Distance et cercles'] = { cours:'cours-demo-distance-cercles', methode:'methode-demo-distance-cercles', exos:'exos-demo-distance-cercles', histoire:'histoire-demo-distance-cercles',
  init:()=>{ initMilieuDemo(); initVocabDemo(); initDistDemo(); dcMmReset(); registerGeoStepDemo('dc-mm-svg', { steps:()=>DC_MM_STEPS, getIdx:()=>dcMmIdx, goto:(i)=>{ dcMmIdx=i; dcRenderMm(); } }); injectCourseAddButtons(document.getElementById('cours-demo-distance-cercles')); injectCourseAddButtons(document.getElementById('methode-demo-distance-cercles')); } };

DEMO_QUIZZES['Distance et cercles'] = [
  {q:"Le milieu d'un segment [RT] est un point qui...",
   opts:["est équidistant de R et T","est plus proche de R","n'appartient pas au segment"], correct:0},
  {q:"Un diamètre d'un cercle...",
   opts:["ne passe jamais par le centre","passe toujours par le centre","est plus court qu'un rayon"], correct:1},
  {q:"Un point situé à une distance de 5 cm du centre O appartient au disque de centre O et de rayon 3 cm ?",
   opts:["Oui","Non","Impossible à savoir"], correct:1},
];

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
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 160 50" style="width:150px;"><line x1="20" y1="25" x2="140" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="20" y1="20" x2="20" y2="30" stroke="#1C1B2E" stroke-width="1.6"/><line x1="140" y1="20" x2="140" y2="30" stroke="#1C1B2E" stroke-width="1.6"/><text x="16" y="14" font-size="13" font-style="italic">A</text><text x="136" y="14" font-size="13" font-style="italic">B</text><text x="55" y="45" font-size="11" fill="#8A4210">AB = 4 cm</text></svg></td>
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
  <svg id="dc-milieuSvg" data-geo-garde viewBox="0 0 400 200" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dc-milieuSeg" stroke="#1C1B2E" stroke-width="1.8"/>
    <path id="dc-milieuCodes" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/>
    <circle id="dc-milieuHaloR" r="10" fill="#E35D3A" fill-opacity=".16"/><circle id="dc-milieuHaloT" r="10" fill="#E35D3A" fill-opacity=".16"/>
    <path id="dc-milieuMkR" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/><path id="dc-milieuMkT" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/><path id="dc-milieuMkA" fill="none" stroke="#E35D3A" stroke-width="1.8" stroke-linecap="round"/>
    <circle id="dc-milieuR" r="13" fill="transparent" style="cursor:grab;"/><circle id="dc-milieuT" r="13" fill="transparent" style="cursor:grab;"/>
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
  <svg id="dc-vocabSvg" data-geo-garde viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle id="dc-vocabCircle" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dc-vocabRayon" stroke="#1C1B2E" stroke-width="1.5"/>
    <line id="dc-vocabDiametre" stroke="#1C1B2E" stroke-width="1.5"/>
    <line id="dc-vocabCorde" stroke="#1C1B2E" stroke-width="1.5"/>
    <circle id="dc-vocabHaloA" r="10" fill="#E35D3A" fill-opacity=".16"/>
    <circle id="dc-vocabA" r="13" fill="transparent" style="cursor:grab;"/>
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
<div class="sub-header"><span class="letter">A</span><h4>Cercle</h4></div>
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

<div class="sub-header"><span class="letter">B</span><h4>Disque</h4></div>
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
  <svg id="dc-distSvg" data-geo-garde viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <circle id="dc-distDisque" fill="rgba(31,58,92,.08)" stroke="none"/>
    <circle id="dc-distCircle" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dc-distSeg" stroke="#8A8578" stroke-width="1.3" stroke-dasharray="4 3"/>
    <path id="dc-distMkO" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/><circle id="dc-distHaloP" r="10" fill="#E35D3A" fill-opacity=".16"/><path id="dc-distMkP" fill="none" stroke="#E35D3A" stroke-width="1.8" stroke-linecap="round"/>
    <circle id="dc-distP" r="13" fill="transparent" style="cursor:grab;"/>
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
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le compas et la règle sont les deux seuls instruments que les mathématiciens grecs de l'Antiquité s'autorisaient pour leurs constructions géométriques. Vers 300 av. J.-C., à Alexandrie (en Égypte), le mathématicien grec Euclide rassemble dans son livre <i>Les Éléments</i> toutes les connaissances de géométrie de son époque, en les démontrant à partir de règles très simples. Ce livre restera la référence absolue pour apprendre la géométrie pendant plus de 2 000 ans, jusqu'au 19e siècle !
</div>
`;

document.getElementById('methode-demo-distance-cercles').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : construire le milieu d'un segment à la règle</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <svg id="dc-mm-svg" data-geo-garde viewBox="0 0 400 220" style="width:100%;max-width:460px;display:block;margin:10px auto 0;background:var(--white);border-radius:8px;">
    <line id="dc-mm-seg" stroke="#1C1B2E" stroke-width="1.8"/>
    <path id="dc-mm-R" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/><path id="dc-mm-T" fill="none" stroke="#1C1B2E" stroke-width="1.8" stroke-linecap="round"/>
    <text id="dc-mm-labelR" font-style="italic" font-size="14">R</text>
    <text id="dc-mm-labelT" font-style="italic" font-size="14">T</text>
    <g id="dc-mm-regle" style="display:none;"></g>
    <path id="dc-mm-A" fill="none" stroke="#E35D3A" stroke-width="1.8" stroke-linecap="round" style="display:none;"/>
    <text id="dc-mm-labelA" font-style="italic" font-size="14" fill="#E35D3A" style="display:none;">A</text>
    <path id="dc-mm-codes" fill="none" stroke="#1C1B2E" stroke-width="1.6" stroke-linecap="round" style="display:none;"/>
  </svg>
  <p class="hint" id="dc-mm-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dcMmNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dcMmReset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-distance-cercles').innerHTML = `
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
    <button type="button" class="exo-correction-toggle" data-target="c6-g1-c1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-g1-c1"><div><ol style="margin:0 0 6px;padding-left:20px;"><li>Je trace le segment [PQ] de 8 cm à la règle.</li><li>Le milieu est à égale distance de P et de Q : 8 : 2 = 4 cm.</li><li>Je place le point I sur [PQ] à 4 cm de P et je code PI = IQ (deux petits traits identiques).</li></ol></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Un cercle a pour centre O et pour rayon 4 cm. Un point K est tel que OK = 4 cm, et un point L est tel que OL = 6 cm. K et L appartiennent-ils au cercle ? Au disque ? Rédige tes réponses.
    <button type="button" class="exo-correction-toggle" data-target="c6-g1-c2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-g1-c2"><div><p style="margin:0 0 6px;">Le cercle de centre O et de rayon 4 cm est formé des points situés à 4 cm de O ; le disque, des points situés à 4 cm ou moins de O.</p><p style="margin:0 0 6px;">OK = 4 cm, égal au rayon : <b>K appartient au cercle</b>, donc aussi au disque.</p><p style="margin:0 0 6px;">OL = 6 cm, plus grand que le rayon : <b>L n'appartient ni au cercle ni au disque.</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Sur un cercle de centre O, place deux points E et F tels que [EF] soit un diamètre, puis deux points M et N tels que [MN] soit une corde qui n'est pas un diamètre.
    <button type="button" class="exo-correction-toggle" data-target="c6-g1-c3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-g1-c3"><div><p style="margin:0 0 6px;">Un diamètre est une corde qui passe par le centre : je place E sur le cercle, je trace la droite (EO), elle recoupe le cercle en F. [EF] est un diamètre (EF = 2 × rayon).</p><p style="margin:0 0 6px;">Une corde relie deux points du cercle : je place M et N sur le cercle de façon que [MN] ne passe pas par O. C'est une corde qui n'est pas un diamètre (elle est plus courte qu'un diamètre).</p></div></div>
  </div>
</div>
`;

/* ================= Marques des points et codages (règle du site, demandée le 01/11/2026) =================
   Point isolé : une croix ; point sur une ligne (segment, droite, cercle) : un petit trait perpendiculaire à la ligne ;
   point d'intersection : rien. Codage d'égalité de longueurs : petit trait de 7 px incliné à 60° sur le segment.
   Ces figures se redessinent à chaque déplacement : les marques sont calculées ici (geo-points.js ne traite qu'une fois). */
const dcCroix = p => `M${(p.x - 4).toFixed(1)},${(p.y - 4).toFixed(1)} L${(p.x + 4).toFixed(1)},${(p.y + 4).toFixed(1)} M${(p.x - 4).toFixed(1)},${(p.y + 4).toFixed(1)} L${(p.x + 4).toFixed(1)},${(p.y - 4).toFixed(1)}`;
// Petit trait perpendiculaire à la direction u (vecteur unitaire de la ligne qui porte le point).
const dcTrait = (p, u) => `M${(p.x + u.y * 5).toFixed(1)},${(p.y - u.x * 5).toFixed(1)} L${(p.x - u.y * 5).toFixed(1)},${(p.y + u.x * 5).toFixed(1)}`;
// Codage au point q d'un segment de direction u : trait de 7 px tourné de 60° par rapport au segment.
const dcCode = (q, u) => { const c = Math.cos(Math.PI / 3), s = Math.sin(Math.PI / 3), v = { x: u.x * c - u.y * s, y: u.x * s + u.y * c };
  return `M${(q.x - v.x * 3.5).toFixed(1)},${(q.y - v.y * 3.5).toFixed(1)} L${(q.x + v.x * 3.5).toFixed(1)},${(q.y + v.y * 3.5).toFixed(1)}`; };
const dcUnit = (a, b) => { const L = Math.hypot(b.x - a.x, b.y - a.y) || 1; return { x: (b.x - a.x) / L, y: (b.y - a.y) / L }; };
const dcD = (id, d) => { const el = document.getElementById(id); if(el) el.setAttribute('d', d); };
const dcC = (id, p) => { const el = document.getElementById(id); if(el){ el.setAttribute('cx', p.x); el.setAttribute('cy', p.y); } };

/* ================= Figure dynamique : milieu d'un segment ================= */
let dcMilieuR = {x:80,y:100}, dcMilieuT = {x:320,y:100};
function dcUpdateMilieu(){
  const A = {x:(dcMilieuR.x+dcMilieuT.x)/2, y:(dcMilieuR.y+dcMilieuT.y)/2};
  document.getElementById('dc-milieuSeg').setAttribute('x1', dcMilieuR.x);
  document.getElementById('dc-milieuSeg').setAttribute('y1', dcMilieuR.y);
  document.getElementById('dc-milieuSeg').setAttribute('x2', dcMilieuT.x);
  document.getElementById('dc-milieuSeg').setAttribute('y2', dcMilieuT.y);
  // R, T, A sont sur le segment [RT] : petit trait perpendiculaire ; R et T se déplacent (zone à toucher, halo léger).
  const uRT = dcUnit(dcMilieuR, dcMilieuT);
  dcC('dc-milieuR', dcMilieuR); dcC('dc-milieuT', dcMilieuT); dcC('dc-milieuHaloR', dcMilieuR); dcC('dc-milieuHaloT', dcMilieuT);
  dcD('dc-milieuMkR', dcTrait(dcMilieuR, uRT)); dcD('dc-milieuMkT', dcTrait(dcMilieuT, uRT)); dcD('dc-milieuMkA', dcTrait(A, uRT));
  document.getElementById('dc-milieuLabelR').setAttribute('x', dcMilieuR.x-16); document.getElementById('dc-milieuLabelR').setAttribute('y', dcMilieuR.y+5);
  document.getElementById('dc-milieuLabelT').setAttribute('x', dcMilieuT.x+8); document.getElementById('dc-milieuLabelT').setAttribute('y', dcMilieuT.y+5);
  document.getElementById('dc-milieuLabelA').setAttribute('x', A.x-4); document.getElementById('dc-milieuLabelA').setAttribute('y', A.y-12);

  // Codage des longueurs égales RA = AT, au milieu de chaque moitié.
  const q1 = {x:(dcMilieuR.x+A.x)/2, y:(dcMilieuR.y+A.y)/2};
  const q2 = {x:(A.x+dcMilieuT.x)/2, y:(A.y+dcMilieuT.y)/2};
  dcD('dc-milieuCodes', dcCode(q1, uRT) + ' ' + dcCode(q2, uRT));
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
  // O (rayon et diamètre), A, E, F, M, N (cercle et un segment) sont des points d'intersection : aucune marque, le nom seul.
  dcC('dc-vocabA', dcVocabA); dcC('dc-vocabHaloA', dcVocabA);
  ['E','F','M','N'].forEach((name,i)=>{
    const pt = [E,F,M,N][i];
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
  // O et P sont les extrémités du segment [OP] : petit trait perpendiculaire ; P sur le cercle est une intersection : rien.
  const uOP = dcUnit(dcDistO, dcDistP);
  dcD('dc-distMkO', dcTrait(dcDistO, uOP)); dcC('dc-distP', dcDistP); dcC('dc-distHaloP', dcDistP);
  document.getElementById('dc-distSeg').setAttribute('x1', dcDistO.x); document.getElementById('dc-distSeg').setAttribute('y1', dcDistO.y);
  document.getElementById('dc-distSeg').setAttribute('x2', dcDistP.x); document.getElementById('dc-distSeg').setAttribute('y2', dcDistP.y);
  document.getElementById('dc-distLabelO').setAttribute('x', dcDistO.x-16); document.getElementById('dc-distLabelO').setAttribute('y', dcDistO.y+5);
  document.getElementById('dc-distLabelP').setAttribute('x', dcDistP.x+8); document.getElementById('dc-distLabelP').setAttribute('y', dcDistP.y+5);

  const tol = 3;
  let statut, couleur;
  if(Math.abs(dist-dcDistR) <= tol){ statut = "P appartient au cercle (et donc aussi au disque)."; couleur = '#1F6B3A'; }
  else if(dist < dcDistR){ statut = "P appartient au disque, mais pas au cercle (il est strictement à l'intérieur)."; couleur = '#1F3A5C'; }
  else { statut = "P n'appartient ni au cercle, ni au disque (il est à l'extérieur)."; couleur = '#A83C1F'; }
  dcD('dc-distMkP', Math.abs(dist-dcDistR) <= tol ? '' : dcTrait(dcDistP, uOP));
  document.getElementById('dc-distMkP').setAttribute('stroke', couleur); document.getElementById('dc-distHaloP').setAttribute('fill', couleur);
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
  // R, T (et A) sont sur le segment [RT] : petit trait perpendiculaire.
  dcD('dc-mm-R', dcTrait(DC_MM_R, dcMmDir)); dcD('dc-mm-T', dcTrait(DC_MM_T, dcMmDir));
  dpSetTxt(document.getElementById('dc-mm-labelR'), DC_MM_R, -16, 5);
  dpSetTxt(document.getElementById('dc-mm-labelT'), DC_MM_T, 8, 5);

  // La règle graduée du site (rulerSVG, app.js : 22 unités par cm), mise à l'échelle de la figure : son 0 sur R, le bord
  // gradué le long de [RT] (auparavant une règle dessinée à la main, dpRulerPolygon, qui n'existait plus : l'étape plantait).
  const regle = document.getElementById('dc-mm-regle');
  if(s.phase==='ruler' && typeof rulerSVG === 'function'){
    const k = dcMmSegLen / 6 / 22, ang = Math.atan2(dcMmDir.y, dcMmDir.x) * 180 / Math.PI;
    const m3 = {x:DC_MM_R.x+dcMmDir.x*dcMmSegLen/2, y:DC_MM_R.y+dcMmDir.y*dcMmSegLen/2};
    regle.innerHTML = `<g transform="translate(${DC_MM_R.x} ${DC_MM_R.y}) rotate(${ang.toFixed(2)}) scale(${k.toFixed(4)})">${rulerSVG(true)}</g>`
      + `<line x1="${m3.x}" y1="${m3.y}" x2="${(m3.x+dcMmPerp.x*16).toFixed(1)}" y2="${(m3.y+dcMmPerp.y*16).toFixed(1)}" stroke="#1F6B3A" stroke-width="2.4"/>`;
    regle.style.display='';
  } else regle.style.display='none';

  const A = document.getElementById('dc-mm-A'), labelA = document.getElementById('dc-mm-labelA');
  if(s.phase==='point' || s.phase==='coded'){
    A.setAttribute('d', dcTrait(dcMmMid, dcMmDir)); A.style.display='';
    dpSetTxt(labelA, dcMmMid, -4, -12); labelA.style.display='';
  } else {
    A.style.display='none'; labelA.style.display='none';
  }

  const codes = document.getElementById('dc-mm-codes');
  if(s.phase==='coded'){
    const q1 = {x:(DC_MM_R.x+dcMmMid.x)/2, y:(DC_MM_R.y+dcMmMid.y)/2};
    const q2 = {x:(dcMmMid.x+DC_MM_T.x)/2, y:(dcMmMid.y+DC_MM_T.y)/2};
    codes.setAttribute('d', dcCode(q1, dcMmDir) + ' ' + dcCode(q2, dcMmDir)); codes.style.display='';
  } else codes.style.display='none';

  document.getElementById('dc-mm-note').textContent = s.note;
}
function dcMmNext(){ if(dcMmIdx<DC_MM_STEPS.length-1) dcMmIdx++; dcRenderMm(); }
function dcMmReset(){ dcMmIdx=0; dcRenderMm(); }

DEMO_REGISTRY['6e|Distance et cercles'] = { cours:'cours-demo-distance-cercles', methode:'methode-demo-distance-cercles', exos:'exos-demo-distance-cercles', histoire:'histoire-demo-distance-cercles',
  init:()=>{ initMilieuDemo(); initVocabDemo(); initDistDemo(); dcMmReset(); registerGeoStepDemo('dc-mm-svg', { steps:()=>DC_MM_STEPS, getIdx:()=>dcMmIdx, goto:(i)=>{ dcMmIdx=i; dcRenderMm(); } }); injectCourseAddButtons(document.getElementById('cours-demo-distance-cercles')); injectCourseAddButtons(document.getElementById('methode-demo-distance-cercles')); } };

DEMO_QUIZZES['6e|Distance et cercles'] = [
  {q:"Le milieu d'un segment [RT] est un point qui...",
   opts:["est équidistant de R et T","est plus proche de R","n'appartient pas au segment"], correct:0},
  {q:"Un diamètre d'un cercle...",
   opts:["ne passe jamais par le centre","passe toujours par le centre","est plus court qu'un rayon"], correct:1},
  {q:"Un point situé à une distance de 5 cm du centre O appartient au disque de centre O et de rayon 3 cm ?",
   opts:["Oui","Non","Impossible à savoir"], correct:1},
];

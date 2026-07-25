/* ============================================================
   CHAPITRE : Fractions : nombres et partage (6e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-fractions-partage').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Écriture fractionnaire</h3></div>
<p class="example-title" style="margin-top:0;">A. Quotient</p>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\frac{a}{b}</span> est le résultat de la division de <i>a</i> par <i>b</i> : <span class="tex">\\frac{a}{b} = a \\div b</span>. Elle se lit « a divisé par b » ou « a sur b ».</div>
<p class="example-title">Exemple : comment se lit la fraction <span class="tex">\\frac{3}{4}</span> ?</p>
<p style="margin:4px 0 12px;">Elle se lit « trois quarts », ou « 3 divisé par 4 », ou « 3 sur 4 ».</p>

<p class="example-title">Exemple : partager un segment de 6 cm en 7 parts égales, à l'aide d'un guide-âne</p>
<p style="margin:4px 0 8px;">Un <b>guide-âne</b> est un réseau de droites parallèles équidistantes. On déplace son segment (de longueur fixe) et on l'oriente pour que ses deux extrémités tombent chacune sur une droite du réseau : les droites intermédiaires le partagent alors en parts rigoureusement égales.</p>
<p style="margin:4px 0 8px;">Déplacez le point bleu de gauche pour translater le segment, ou le point bleu de droite pour le faire pivoter (sa longueur ne change jamais) : cherchez la position où il traverse 6 droites intermédiaires, pour obtenir 7 parts égales.</p>
<div class="figure-wrap">
  <svg id="fp-guideAneSvg" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
  </svg>
  <p class="hint" id="fp-guideAneNote" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetGuideAneDemo()">Réinitialiser</button>
  </div>
</div>

<p class="example-title" style="margin-top:20px;">B. Nombre fraction</p>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\frac{a}{b}</span> est le nombre qui, multiplié par <i>b</i>, donne <i>a</i>. Elle vérifie donc : <span class="tex">\\frac{a}{b} \\times b = a</span> et <span class="tex">b \\times \\frac{a}{b} = a</span>. Dans le cas particulier où b = 1, on a : <span class="tex">\\frac{a}{1} = a</span>.</div>
<p class="example-title">Exemple : complète les égalités … × 5 = 4 et … × 7 = 9.</p>
<p style="margin:4px 0 12px;">La fraction <span class="tex">\\frac{4}{5}</span> est le nombre qui, multiplié par 5, donne 4, donc on peut écrire <span class="tex">\\frac{4}{5} \\times 5 = 4</span>.<br>La fraction <span class="tex">\\frac{9}{7}</span> est le nombre qui, multiplié par 7, donne 9, donc on peut écrire <span class="tex">\\frac{9}{7} \\times 7 = 9</span>.</p>

<p class="example-title" style="margin-top:20px;">C. Écriture d'une fraction</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="tex">\\frac{a}{b}</span> est <b>soit un nombre entier</b>, <b>soit un nombre décimal non entier</b>, <b>soit un nombre non décimal</b>.</div>
<p class="example-title">Exemple : dans quel ensemble de nombres se trouve chacune des fractions <span class="tex">\\frac{48}{6}</span>, <span class="tex">\\frac{3}{4}</span> et <span class="tex">\\frac{1}{3}</span> ?</p>
<ul class="example-list">
  <li><span class="tex">\\frac{48}{6}</span> est le résultat de la division 48 ÷ 6 = 8. On a donc <span class="tex">\\frac{48}{6} = 8</span> : la fraction <span class="tex">\\frac{48}{6}</span> est donc un <b>nombre entier</b>.</li>
  <li><span class="tex">\\frac{3}{4}</span> est le résultat de la division 3 ÷ 4. On vérifie que 0,75 × 4 = 3, donc <span class="tex">\\frac{3}{4} = 0{,}75</span> : la fraction <span class="tex">\\frac{3}{4}</span> est donc un <b>nombre décimal non entier</b>.</li>
  <li><span class="tex">\\frac{1}{3}</span> est le nombre qui, multiplié par 3, donne 1 : <span class="tex">\\frac{1}{3} \\times 3 = 1</span>. La division 1 ÷ 3 ne se termine jamais ; on peut seulement écrire <span class="tex">\\frac{1}{3} \\approx 0{,}33</span> : la fraction <span class="tex">\\frac{1}{3}</span> est donc un <b>nombre non décimal</b>.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Égalité de fractions</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">
  Une fraction ne change pas de valeur quand on multiplie — ou quand on divise — son numérateur <b>et</b> son dénominateur par un même nombre non nul.<br>
  Pour tous entiers a, b (non nul) et k (non nul) : <span class="tex">\\frac{a}{b} = \\frac{a \\times k}{b \\times k}</span> et <span class="tex">\\frac{a}{b} = \\frac{a \\div k}{b \\div k}</span>.
</div>
<p class="example-title">Exemple : complète l'égalité de fractions <span class="tex">\\frac{3}{5} = \\frac{?}{20}</span>.</p>
<p style="margin:4px 0 12px;">Pour passer du dénominateur 5 au dénominateur 20, on multiplie par 4 (donc 20 ÷ 5 = 4). Donc pour obtenir le numérateur manquant, on multiplie aussi le numérateur 3 par 4 : on obtient <span class="tex">\\frac{3}{5} = \\frac{12}{20}</span>.</p>

<div class="lesson-header"><span class="num">3</span><h3>Proportion et pourcentages</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand une proportion est écrite sous la forme d'un quotient dont le dénominateur est 100, on obtient ce qu'on appelle la <b>proportion en pourcentage</b>.</div>
<p class="example-title">Exemple : calcule le pourcentage de boules vertes dans un sac contenant 3 boules vertes et 9 boules rouges.</p>
<p style="margin:4px 0 12px;">
  La proportion de boules vertes dans ce sac est égale à <span class="tex">\\frac{3}{3+9}</span>, soit <span class="tex">\\frac{3}{12}</span>.<br>
  On simplifie : <span class="tex">\\frac{3}{12} = \\frac{1}{4}</span>, puis on écrit cette fraction avec pour dénominateur 100 : <span class="tex">\\frac{1}{4} = \\frac{25}{100}</span>.<br>
  La proportion est donc égale à <span class="tex">\\frac{25}{100}</span> : le pourcentage de boules vertes dans ce sac est de <b>25 %</b>.
</p>
`;

document.getElementById('methode-demo-fractions-partage').innerHTML = `
<div class="figure-wrap">
  <strong style="font-family:'Space Grotesk',sans-serif;">Méthode : partager un segment avec un guide-âne</strong>
  <p class="hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fp-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fpMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fpMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-fractions-partage').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Dans quel ensemble de nombres se trouve une fraction ? »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\frac{21}{3}</span> est le résultat de la division 21 ÷ 3 = 7.</span><span class="we-comment">On calcule la division.</span></div>
    <div class="we-row"><span class="we-expr">On a donc <span class="tex">\\frac{21}{3} = 7</span>.</span><span class="we-comment">On identifie le résultat.</span></div>
    <div class="we-row"><span class="we-expr">La fraction <span class="tex">\\frac{21}{3}</span> est donc un nombre entier.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Dans quel ensemble de nombres se trouve chacune des fractions <span class="tex">\\frac{36}{4}</span>, <span class="tex">\\frac{5}{2}</span> et <span class="tex">\\frac{2}{7}</span> ? Rédige tes réponses.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Complète l'égalité de fractions <span class="tex">\\frac{4}{7} = \\frac{?}{28}</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un sac contient 5 boules jaunes et 15 boules bleues. Calcule le pourcentage de boules jaunes dans ce sac.
  </div>
</div>
`;

/* ================= Figure dynamique : guide-âne ================= */
const FP_GRID_LINES = 9;
const FP_GRID_X0 = 40, FP_GRID_GAP = 40, FP_GRID_Y_TOP = 20, FP_GRID_Y_BOT = 240;
const FP_SEG_LENGTH = 280; // longueur FIXE du segment (représente les 6 cm) : elle ne change jamais.
let fpPivot = {x: 90, y: 160};
let fpAngle = -22 * Math.PI/180;

function fpEndpoint(){
  return { x: fpPivot.x + Math.cos(fpAngle)*FP_SEG_LENGTH, y: fpPivot.y + Math.sin(fpAngle)*FP_SEG_LENGTH };
}

function fpBuildStaticGrid(){
  const svg = document.getElementById('fp-guideAneSvg');
  let html = '';
  for(let i=0;i<FP_GRID_LINES;i++){
    const x = FP_GRID_X0 + i*FP_GRID_GAP;
    html += `<line x1="${x}" y1="${FP_GRID_Y_TOP}" x2="${x}" y2="${FP_GRID_Y_BOT}" stroke="rgba(28,43,57,.28)" stroke-width="1.2"/>`;
  }
  html += `<line id="fp-segment" stroke="#E35D3A" stroke-width="3"/>`;
  html += `<g id="fp-divisionMarks"></g>`;
  html += `<circle id="fp-P1" r="8" fill="#1F3A5C" style="cursor:grab;"/>`;
  html += `<circle id="fp-P2" r="8" fill="#1F3A5C" style="cursor:grab;"/>`;
  svg.innerHTML = html;
}

function fpUpdateGuideAne(){
  const P1 = fpPivot, P2 = fpEndpoint();
  const seg = document.getElementById('fp-segment');
  seg.setAttribute('x1', P1.x); seg.setAttribute('y1', P1.y);
  seg.setAttribute('x2', P2.x); seg.setAttribute('y2', P2.y);
  dpSetPtGeneric(document.getElementById('fp-P1'), P1);
  dpSetPtGeneric(document.getElementById('fp-P2'), P2);

  // Cherche les points où le segment croise réellement les droites du guide-âne (0 <= t <= 1).
  const crossings = [];
  const dx = P2.x - P1.x;
  if(Math.abs(dx) > 1e-6){
    for(let i=0;i<FP_GRID_LINES;i++){
      const xi = FP_GRID_X0 + i*FP_GRID_GAP;
      const t = (xi - P1.x)/dx;
      if(t>0.001 && t<0.999){
        crossings.push({t, x:xi, y: P1.y + t*(P2.y-P1.y)});
      }
    }
  }
  crossings.sort((a,b)=>a.t-b.t);

  let marksHtml = '';
  crossings.forEach(c=>{ marksHtml += `<circle cx="${c.x}" cy="${c.y}" r="4.5" fill="#1F6B3A"/>`; });
  document.getElementById('fp-divisionMarks').innerHTML = marksHtml;

  const nbParts = crossings.length + 1;
  const note = document.getElementById('fp-guideAneNote');
  if(crossings.length === 0){
    note.textContent = "Ce segment de longueur fixe (6 cm) ne croise aucune droite intermédiaire ici : déplacez-le ou faites-le pivoter pour qu'il en traverse plusieurs.";
  } else {
    note.textContent = `Ce segment de longueur fixe (6 cm) traverse ${crossings.length} droite${crossings.length>1?'s':''} intermédiaire${crossings.length>1?'s':''} : il est donc partagé en ${nbParts} parts égales${nbParts===7?' — exactement le partage en 7 recherché !':''}.`;
  }
}
function dpSetPtGeneric(el, p){ el.setAttribute('cx',p.x); el.setAttribute('cy',p.y); }

function fpMakeDraggablePivot(circleEl, svg, onMove){
  let dragging=false;
  circleEl.addEventListener('mousedown', e=>{ dragging=true; e.preventDefault(); });
  circleEl.addEventListener('touchstart', e=>{ dragging=true; }, {passive:true});
  function move(e){
    if(!dragging) return;
    const pt = svgPointFromEvent(svg, e);
    fpPivot = {x: pt.x, y: pt.y};
    onMove();
  }
  function up(){ dragging=false; }
  svg.addEventListener('mousemove', move);
  svg.addEventListener('touchmove', move, {passive:true});
  window.addEventListener('mouseup', up);
  window.addEventListener('touchend', up);
}
function fpMakeDraggableEndpoint(circleEl, svg, onMove){
  let dragging=false;
  circleEl.addEventListener('mousedown', e=>{ dragging=true; e.preventDefault(); });
  circleEl.addEventListener('touchstart', e=>{ dragging=true; }, {passive:true});
  function move(e){
    if(!dragging) return;
    const pt = svgPointFromEvent(svg, e);
    fpAngle = Math.atan2(pt.y-fpPivot.y, pt.x-fpPivot.x);
    onMove();
  }
  function up(){ dragging=false; }
  svg.addEventListener('mousemove', move);
  svg.addEventListener('touchmove', move, {passive:true});
  window.addEventListener('mouseup', up);
  window.addEventListener('touchend', up);
}

function initGuideAneDemo(){
  fpBuildStaticGrid();
  const svg = document.getElementById('fp-guideAneSvg');
  fpMakeDraggablePivot(document.getElementById('fp-P1'), svg, fpUpdateGuideAne);
  fpMakeDraggableEndpoint(document.getElementById('fp-P2'), svg, fpUpdateGuideAne);
  fpUpdateGuideAne();
}
function resetGuideAneDemo(){
  fpPivot = {x: 90, y: 160};
  fpAngle = -22 * Math.PI/180;
  fpUpdateGuideAne();
}

/* ================= Méthode animée ================= */
const FP_METHODE_STEPS = [
  {expr:'Segment de 6 cm à partager en 7', note:"On souhaite partager un segment de 6 cm en 7 parts rigoureusement égales."},
  {expr:'Guide-âne sous la feuille', note:"On place un guide-âne (réseau de droites parallèles équidistantes) sous la feuille sur laquelle est tracé le segment."},
  {expr:'Extrémités posées sur deux droites', note:"On positionne la feuille de façon à ce que les deux extrémités du segment tombent chacune sur une droite du réseau, en comptant 7 intervalles entre elles."},
  {expr:'Intersections marquées', note:"On marque, sur le segment, les points où les droites intermédiaires du réseau le croisent."},
  {expr:'7 parts égales obtenues', note:"Ces points partagent le segment en 7 parts rigoureusement égales, chacune mesurant 6/7 de centimètre — quel que soit l'angle du segment sur le réseau."},
];
const fpMethodeDemo = makeStepDemo(FP_METHODE_STEPS, 'fp-methodeDisplay');

DEMO_REGISTRY['Fractions : nombres et partage'] = { cours:'cours-demo-fractions-partage', methode:'methode-demo-fractions-partage', exos:'exos-demo-fractions-partage',
  init:()=>{ initGuideAneDemo(); fpMethodeDemo.reset(); renderStaticMath(document.getElementById('cours-demo-fractions-partage')); renderStaticMath(document.getElementById('exos-demo-fractions-partage')); injectCourseAddButtons(document.getElementById('cours-demo-fractions-partage')); } };

DEMO_QUIZZES['Fractions : nombres et partage'] = [
  {q:"Comment se lit la fraction 5/8 ?",
   opts:["« Cinq divisé par huit »","« Huit divisé par cinq »","« Cinq fois huit »"], correct:0},
  {q:"La fraction 24/6 est...",
   opts:["un nombre entier","un nombre décimal non entier","un nombre non décimal"], correct:0},
  {q:"Pour compléter 5/6 = …/24, par quel nombre doit-on multiplier le numérateur 5 ?",
   opts:["Par 4","Par 6","Par 24"], correct:0},
];

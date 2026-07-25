/* ============================================================
   CHAPITRE : Fractions : nombres et partage (6e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-fractions-partage').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Écriture fractionnaire</h3></div>
<p class="example-title" style="margin-top:0;">A. Quotient</p>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="frac"><span class="num2">a</span><span class="den">b</span></span> est le résultat de la division de <i>a</i> par <i>b</i> : <span class="frac"><span class="num2">a</span><span class="den">b</span></span> = a ÷ b. Elle se lit « a divisé par b » ou « a sur b ».</div>
<p class="example-title">Exemple : comment se lit la fraction 3/4 ?</p>
<p class="hint" style="margin:4px 0 12px;">Elle se lit « trois quarts », ou « 3 divisé par 4 », ou « 3 sur 4 ».</p>

<p class="example-title">Exemple : partager un segment de 6 cm en 7 parts égales, à l'aide d'un guide-âne</p>
<p class="hint" style="margin:4px 0 8px;">Un <b>guide-âne</b> est un réseau de droites parallèles équidistantes. On pose son segment en travers, en plaçant ses deux extrémités sur deux droites du réseau : les droites intermédiaires le partagent alors en parts rigoureusement égales, quel que soit l'angle choisi.</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez les deux extrémités du segment (chacune reste sur sa droite) : les 7 parts restent toujours égales.</p>
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
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="frac"><span class="num2">a</span><span class="den">b</span></span> est le nombre qui, multiplié par <i>b</i>, donne <i>a</i>. Elle vérifie donc : <span class="frac"><span class="num2">a</span><span class="den">b</span></span> × b = a et b × <span class="frac"><span class="num2">a</span><span class="den">b</span></span> = a. Dans le cas particulier où b = 1, on a : <span class="frac"><span class="num2">a</span><span class="den">1</span></span> = a.</div>
<p class="example-title">Exemple : complète les égalités … × 5 = 4 et … × 7 = 9.</p>
<p class="hint" style="margin:4px 0 12px;">La fraction 4/5 est le nombre qui, multiplié par 5, donne 4, donc on peut écrire 4/5 × 5 = 4.<br>La fraction 9/7 est le nombre qui, multiplié par 7, donne 9, donc on peut écrire 9/7 × 7 = 9.</p>

<p class="example-title" style="margin-top:20px;">C. Écriture d'une fraction</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour tout entier <i>a</i> et tout entier <i>b</i> non nul, la fraction <span class="frac"><span class="num2">a</span><span class="den">b</span></span> est <b>soit un nombre entier</b>, <b>soit un nombre décimal non entier</b>, <b>soit un nombre non décimal</b>.</div>
<p class="example-title">Exemple : dans quel ensemble de nombres se trouve chacune des fractions 48/6, 3/4 et 1/3 ?</p>
<ul style="margin:4px 0 12px;padding-left:20px;color:var(--ink-soft);font-size:.92rem;">
  <li>48/6 est le résultat de la division 48 ÷ 6 = 8. On a donc 48/6 = 8 : la fraction 48/6 est donc un <b>nombre entier</b>.</li>
  <li>3/4 est le résultat de la division 3 ÷ 4. On vérifie que 0,75 × 4 = 3, donc 3/4 = 0,75 : la fraction 3/4 est donc un <b>nombre décimal non entier</b>.</li>
  <li>1/3 est le nombre qui, multiplié par 3, donne 1 : 1/3 × 3 = 1. La division 1 ÷ 3 ne se termine jamais ; on peut seulement écrire 1/3 ≈ 0,33 : la fraction 1/3 est donc un <b>nombre non décimal</b>.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Égalité de fractions</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">
  Une fraction ne change pas de valeur quand on multiplie — ou quand on divise — son numérateur <b>et</b> son dénominateur par un même nombre non nul.<br>
  Pour tous entiers a, b (non nul) et k (non nul) : <span class="frac"><span class="num2">a</span><span class="den">b</span></span> = <span class="frac"><span class="num2">a × k</span><span class="den">b × k</span></span> et <span class="frac"><span class="num2">a</span><span class="den">b</span></span> = <span class="frac"><span class="num2">a ÷ k</span><span class="den">b ÷ k</span></span>.
</div>
<p class="example-title">Exemple : complète l'égalité de fractions 3/5 = …/20.</p>
<p class="hint" style="margin:4px 0 12px;">Pour passer du dénominateur 5 au dénominateur 20, on multiplie par 4 (car 20 ÷ 5 = 4). Donc pour obtenir le numérateur manquant, on multiplie aussi le numérateur 3 par 4 : on obtient 3/5 = 12/20.</p>

<div class="lesson-header"><span class="num">3</span><h3>Proportion et pourcentages</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand une proportion est écrite sous la forme d'un quotient dont le dénominateur est 100, on obtient ce qu'on appelle la <b>proportion en pourcentage</b>.</div>
<p class="example-title">Exemple : calcule le pourcentage de boules vertes dans un sac contenant 3 boules vertes et 9 boules rouges.</p>
<p class="hint" style="margin:4px 0 12px;">
  La proportion de boules vertes dans ce sac est égale à 3/(3+9), soit 3/12.<br>
  On peut écrire cette fraction avec pour dénominateur 100 : 3/12 = (3 × 25)/(12 × 25) = 75/300... <br>
  Autre méthode plus directe : 3/12 = 1/4, et 1/4 = 25/100.<br>
  La proportion est donc égale à 25/100 : le pourcentage de boules vertes dans ce sac est de <b>25 %</b>.
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
    <div class="we-row"><span class="we-expr">21/3 est le résultat de la division 21 ÷ 3 = 7.</span><span class="we-comment">On calcule la division.</span></div>
    <div class="we-row"><span class="we-expr">On a donc 21/3 = 7.</span><span class="we-comment">On identifie le résultat.</span></div>
    <div class="we-row"><span class="we-expr">La fraction 21/3 est donc un nombre entier.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Dans quel ensemble de nombres se trouve chacune des fractions 36/4, 5/2 et 2/7 ? Rédige tes réponses.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Complète l'égalité de fractions 4/7 = …/28.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un sac contient 5 boules jaunes et 15 boules bleues. Calcule le pourcentage de boules jaunes dans ce sac.
  </div>
</div>
`;

/* ================= Figure dynamique : guide-âne ================= */
const FP_GRID_LINES = 8; // 8 droites -> 7 parts égales
const FP_GRID_X0 = 60, FP_GRID_GAP = 40, FP_GRID_Y_TOP = 30, FP_GRID_Y_BOT = 230;
let fpP1 = {x: FP_GRID_X0, y: 80};
let fpP2 = {x: FP_GRID_X0 + FP_GRID_GAP*(FP_GRID_LINES-1), y: 190};

function fpBuildStaticGrid(){
  const svg = document.getElementById('fp-guideAneSvg');
  let html = '';
  for(let i=0;i<FP_GRID_LINES;i++){
    const x = FP_GRID_X0 + i*FP_GRID_GAP;
    html += `<line x1="${x}" y1="${FP_GRID_Y_TOP}" x2="${x}" y2="${FP_GRID_Y_BOT}" stroke="rgba(28,43,57,.28)" stroke-width="1.2"/>`;
  }
  html += `<line id="fp-segment" stroke="#E35D3A" stroke-width="2.4"/>`;
  html += `<g id="fp-divisionMarks"></g>`;
  html += `<circle id="fp-P1" r="7" fill="#1F3A5C" style="cursor:grab;"/>`;
  html += `<circle id="fp-P2" r="7" fill="#1F3A5C" style="cursor:grab;"/>`;
  svg.innerHTML = html;
}

function fpUpdateGuideAne(){
  const seg = document.getElementById('fp-segment');
  seg.setAttribute('x1', fpP1.x); seg.setAttribute('y1', fpP1.y);
  seg.setAttribute('x2', fpP2.x); seg.setAttribute('y2', fpP2.y);
  dpSetPtGeneric(document.getElementById('fp-P1'), fpP1);
  dpSetPtGeneric(document.getElementById('fp-P2'), fpP2);

  let marksHtml = '';
  for(let i=1;i<FP_GRID_LINES-1;i++){
    const t = i/(FP_GRID_LINES-1);
    const pt = {x: fpP1.x+t*(fpP2.x-fpP1.x), y: fpP1.y+t*(fpP2.y-fpP1.y)};
    marksHtml += `<circle cx="${pt.x}" cy="${pt.y}" r="4" fill="#1F6B3A"/>`;
  }
  document.getElementById('fp-divisionMarks').innerHTML = marksHtml;

  const segLen = Math.hypot(fpP2.x-fpP1.x, fpP2.y-fpP1.y);
  const cmLen = (segLen/200*6).toFixed(1); // échelle approximative pour l'affichage pédagogique
  const partLen = (6/7).toFixed(2);
  document.getElementById('fp-guideAneNote').textContent =
    `Le segment mesure toujours 6 cm ; chaque part mesure 6/7 ≈ ${partLen} cm, quel que soit l'angle choisi.`;
}
function dpSetPtGeneric(el, p){ el.setAttribute('cx',p.x); el.setAttribute('cy',p.y); }

function fpMakeDraggableVertical(circleEl, svg, fixedX, getPoint, setPoint, onMove){
  let dragging=false;
  circleEl.addEventListener('mousedown', e=>{ dragging=true; e.preventDefault(); });
  circleEl.addEventListener('touchstart', e=>{ dragging=true; }, {passive:true});
  function move(e){
    if(!dragging) return;
    const pt = svgPointFromEvent(svg, e);
    let y = pt.y;
    y = Math.max(FP_GRID_Y_TOP+10, Math.min(FP_GRID_Y_BOT-10, y));
    setPoint({x:fixedX, y});
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
  fpMakeDraggableVertical(document.getElementById('fp-P1'), svg, FP_GRID_X0, ()=>fpP1, p=>fpP1=p, fpUpdateGuideAne);
  fpMakeDraggableVertical(document.getElementById('fp-P2'), svg, FP_GRID_X0+FP_GRID_GAP*(FP_GRID_LINES-1), ()=>fpP2, p=>fpP2=p, fpUpdateGuideAne);
  fpUpdateGuideAne();
}
function resetGuideAneDemo(){
  fpP1 = {x: FP_GRID_X0, y: 80};
  fpP2 = {x: FP_GRID_X0 + FP_GRID_GAP*(FP_GRID_LINES-1), y: 190};
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
  init:()=>{ initGuideAneDemo(); fpMethodeDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-fractions-partage')); } };

DEMO_QUIZZES['Fractions : nombres et partage'] = [
  {q:"Comment se lit la fraction 5/8 ?",
   opts:["« Cinq divisé par huit »","« Huit divisé par cinq »","« Cinq fois huit »"], correct:0},
  {q:"La fraction 24/6 est...",
   opts:["un nombre entier","un nombre décimal non entier","un nombre non décimal"], correct:0},
  {q:"Pour compléter 5/6 = …/24, par quel nombre doit-on multiplier le numérateur 5 ?",
   opts:["Par 4","Par 6","Par 24"], correct:0},
];

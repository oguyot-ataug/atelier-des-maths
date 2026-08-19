/* ============================================================
   CHAPITRE : Nombres relatifs (5e)
   Fichier autonome -- voir la note dans symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-relatifs').innerHTML = `

      <div class="lesson-header"><span class="num">1</span><h3>Nombres relatifs</h3></div>
      <span class="def-badge">Définitions</span>
      <div class="def-box">
        <ul style="margin:0;padding-left:20px;line-height:1.8;">
          <li>Un nombre est dit <b>positif</b> lorsqu'il est supérieur ou égal à 0.</li>
          <li>Un nombre est dit <b>négatif</b> lorsqu'il est inférieur ou égal à 0.</li>
          <li>0 appartient donc à la fois aux nombres positifs et aux nombres négatifs.</li>
          <li>L'ensemble formé par tous ces nombres, positifs et négatifs, s'appelle les <b>nombres relatifs</b>.</li>
        </ul>
      </div>
      <p class="example-title">Exemples :</p>
      <ul class="example-list">
        <li>+7 est un nombre positif ; on peut aussi l'écrire simplement 7.</li>
        <li>−4,5 est un nombre négatif : c'est un nombre décimal relatif.</li>
        <li>Autres nombres positifs : +20 ; 1,5 ; <span class="tex">\\dfrac{3}{4}</span>.</li>
        <li>Autres nombres négatifs : −8,3 ; <span class="tex">-\\dfrac{2}{5}</span> ; −0,12.</li>
      </ul>

      <div class="lesson-header"><span class="num">2</span><h3>Repérage sur une droite</h3></div>
      <span class="def-badge">Définition 1</span>
      <div class="def-box">On dit qu'une droite est <b>graduée</b> lorsqu'on y a choisi un point de départ — appelé <b>origine</b> et noté O — ainsi qu'une longueur de référence appelée l'<b>unité</b>.</div>
      <span class="def-badge">Définition 2</span>
      <div class="def-box">Sur une droite graduée, chaque point occupe une position que l'on traduit par un nombre relatif : c'est son <b>abscisse</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple : un nombre relatif et son opposé</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez le point sur la droite graduée : son opposé (orange) se place automatiquement à la même distance de 0, de l'autre côté.</p>
        <svg id="svgRelLine" viewBox="0 0 600 130" style="width:100%;max-width:560px;display:block;margin:10px auto;touch-action:none;">
          <line x1="30" y1="70" x2="570" y2="70" stroke="#1C1B2E" stroke-width="1.6"/>
          <polygon points="570,70 560,65 560,75" fill="#1C1B2E"/>
          <g id="relTicks"></g>
          <line id="relArcLeft" x1="0" y1="0" x2="0" y2="0" stroke="#B7C3CD" stroke-width="1.3" stroke-dasharray="3 4"/>
          <line id="relMarkPt" class="pt-tick" stroke="#1F3A5C" stroke-width="2.4"/>
          <text id="relLabelPt" font-family="JetBrains Mono" font-size="14" fill="#1F3A5C" font-weight="700"></text>
          <line id="relMarkOpp" class="pt-tick" stroke="#E35D3A" stroke-width="2.4"/>
          <text id="relLabelOpp" font-family="JetBrains Mono" font-size="14" fill="#E35D3A" font-weight="700"></text>
          <circle id="relHandle" r="16" fill="transparent" style="cursor:grab;"/>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetRelDemo()">Réinitialiser</button>
          <span class="hint" id="relCoords" style="margin:0;"></span>
        </div>
      </div>

      <span class="def-badge">Définition 3</span>
      <div class="def-box">La distance qui sépare un point M de l'origine O est appelée la <b>valeur absolue</b> du nombre relatif associé à M.</div>
      <p class="example-title">Exemples :</p>
      <ul class="example-list">
        <li>La valeur absolue de −6 est 6.</li>
        <li>La valeur absolue de +9 est 9.</li>
      </ul>
      <span class="def-badge">Définition 4</span>
      <div class="def-box">On dit que deux nombres relatifs sont <b>opposés</b> lorsqu'ils ont la même valeur absolue mais des signes différents.</div>
      <p class="example-title">Exemple :</p>
      <ul class="example-list"><li>+2,5 et −2,5 sont deux nombres opposés.</li></ul>
      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : un nombre et son opposé occupent des positions <b>symétriques par rapport à l'origine</b> sur une droite graduée — on retrouve ici l'idée de symétrie centrale, avec 0 comme centre.
      </div>

      <div class="lesson-header"><span class="num">3</span><h3>Repérage dans le plan</h3></div>
      <span class="def-badge">Définition 1</span>
      <div class="def-box">Lorsqu'on trace, dans un plan, deux droites graduées perpendiculaires partageant la même origine, on obtient un <b>repère orthogonal</b>. La droite horizontale est l'<b>axe des abscisses</b>, la droite verticale est l'<b>axe des ordonnées</b>.</div>
      <span class="def-badge">Définition 2</span>
      <div class="def-box">Dans un tel repère, la position de chaque point est donnée par deux nombres relatifs appelés ses <b>coordonnées</b> : le premier est l'<b>abscisse</b>, le second l'<b>ordonnée</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple : repérer un point dans le plan</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez le point M : ses coordonnées (abscisse ; ordonnée) se recalculent en direct, avec la projection sur chaque axe.</p>
        <svg id="svgPlane" viewBox="0 0 480 300" style="width:100%;max-width:460px;display:block;margin:10px auto;touch-action:none;">
          <g id="planeGrid"></g>
          <line x1="20" y1="170" x2="460" y2="170" stroke="#1F3A5C" stroke-width="1.6"/>
          <polygon points="460,170 450,165 450,175" fill="#1F3A5C"/>
          <line x1="210" y1="290" x2="210" y2="20" stroke="#E35D3A" stroke-width="1.6"/>
          <polygon points="210,20 204,31 216,31" fill="#E35D3A"/>
          <text x="330" y="162" font-family="Space Grotesk" font-size="12" fill="#1F3A5C">axe des abscisses</text>
          <text x="216" y="34" font-family="Space Grotesk" font-size="12" fill="#E35D3A">axe des ordonnées</text>
          <text x="216" y="184" font-family="JetBrains Mono" font-size="12" fill="#5B6472">O</text>
          <line id="planeDropX" stroke="#C7C2DC" stroke-width="1.2" stroke-dasharray="3 3"/>
          <line id="planeDropY" stroke="#C7C2DC" stroke-width="1.2" stroke-dasharray="3 3"/>
          <line id="planeMarkX" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <line id="planeMarkY" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <circle id="planeHandle" r="16" fill="transparent" style="cursor:grab;"/>
          <text id="planeLabel" font-family="Space Grotesk" font-size="13" font-weight="700" fill="#1C1B2E"></text>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetPlaneDemo()">Réinitialiser</button>
          <span class="hint" id="planeCoords" style="margin:0;"></span>
        </div>
      </div>

      <p class="example-title">Remarques :</p>
      <ul class="example-list">
        <li>L'origine O a pour coordonnées (0 ; 0).</li>
        <li>Un point situé sur l'axe des abscisses a toujours une ordonnée égale à 0.</li>
        <li>Un point situé sur l'axe des ordonnées a toujours une abscisse égale à 0.</li>
      </ul>

      <div class="lesson-header"><span class="num">4</span><h3>Comparaison de relatifs</h3></div>
      <span class="def-badge">Règles</span>
      <div class="def-box">
        <ul style="margin:0;padding-left:20px;line-height:1.8;">
          <li>Entre deux nombres positifs, le plus grand est celui dont la <b>valeur absolue est la plus grande</b>.</li>
          <li>Un nombre négatif est <b>toujours plus petit</b> qu'un nombre positif.</li>
          <li>Entre deux nombres négatifs, le plus grand est celui dont la <b>valeur absolue est la plus petite</b>.</li>
        </ul>
      </div>
      <p class="example-title">Exemples :</p>
      <ul class="example-list">
        <li>12,3 et 12,08 sont deux nombres positifs. 12,3 a la plus grande valeur absolue, donc 12,3 &gt; 12,08.</li>
        <li>−5,2 est négatif et 1,1 est positif, donc 1,1 &gt; −5,2.</li>
        <li>−7 et −2 sont deux nombres négatifs : −7 a la plus grande valeur absolue, c'est donc le plus petit des deux, et −7 &lt; −2.</li>
      </ul>

      <div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
        ⚠️ Piège classique : un nombre négatif de grande valeur absolue reste un <b>petit</b> nombre. On voit souvent l'erreur −10 &gt; −3 (en ne comparant que les chiffres 10 et 3) — c'est l'inverse : −10 &lt; −3.
      </div>
`;

document.getElementById('histoire-demo-relatifs').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les nombres négatifs sont utilisés bien avant d'être vraiment acceptés par les mathématiciens ! Dès environ 200 av. J.-C., en Chine, on utilisait des baguettes de calcul rouges pour les nombres positifs et noires pour les négatifs, notamment pour tenir des comptes commerciaux. Vers 628, en Inde, le mathématicien Brahmagupta est le premier à poser clairement des règles de calcul avec des nombres négatifs (addition, soustraction...). En Europe, en revanche, il faudra attendre le 17e siècle, voire le 19e siècle pour certains savants, avant que les nombres négatifs soient pleinement acceptés comme des nombres à part entière.
</div>
`;
document.getElementById('exos-demo-relatifs').innerHTML = `
      <div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
      <div class="redaction-block">
        <h3>Rédaction type : « Comparer deux nombres relatifs »</h3>
        <div class="redaction-template">
          <span class="fill">−9</span> et <span class="fill">−2</span> sont deux nombres négatifs.<br>|−9| = 9 et |−2| = 2, donc |−9| &gt; |−2|.<br>Or, entre deux négatifs, le plus grand est celui de plus petite valeur absolue.<br>Donc <span class="fill">−9 &lt; −2</span>.
        </div>
        <h3 style="margin-top:18px;">Rédaction type : « Donner l'opposé d'un nombre »</h3>
        <div class="redaction-template">
          <span class="fill">−4</span> et <span class="fill">4</span> ont la même valeur absolue et des signes contraires.<br>Donc <span class="fill">4</span> est l'opposé de <span class="fill">−4</span>.
        </div>
      </div>
      <div class="redaction-block">
        <h3>Exercices</h3>
        <div class="exo-card">
          <div class="num">Exercice 1</div>
          Range dans l'ordre croissant : 4 ; −7 ; −1 ; 0 ; −10 ; 2,5.
        </div>
        <div class="exo-card">
          <div class="num">Exercice 2</div>
          Donne l'opposé de chacun des nombres suivants : 6 ; −3,5 ; 0 ; −12.
        </div>
      </div>
`;

const REL_MIN=-7, REL_MAX=7, REL_ORIGIN_X=300, REL_UNIT=36, REL_Y=70;

function relValToX(v){ return REL_ORIGIN_X + v*REL_UNIT; }

function relXToVal(x){ return (x-REL_ORIGIN_X)/REL_UNIT; }

let relVal = 3.5;

function buildRelTicks(){
  const g=document.getElementById('relTicks');
  let html='';
  for(let v=REL_MIN;v<=REL_MAX;v++){
    const x=relValToX(v);
    html+=`<line x1="${x}" y1="63" x2="${x}" y2="77" stroke="#1C1B2E" stroke-width="1.3"/>`;
    html+=`<text x="${x}" y="94" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${v}</text>`;
  }
  g.innerHTML=html;
}

function updateRelDemo(){
  const x = relValToX(relVal);
  const opp = -relVal;
  const xOpp = relValToX(opp);
  document.getElementById('relHandle').setAttribute('cx',x); document.getElementById('relHandle').setAttribute('cy',REL_Y);
  setTick(document.getElementById('relMarkPt'), x, REL_Y, 0);
  setTick(document.getElementById('relMarkOpp'), xOpp, REL_Y, 0);
  document.getElementById('relLabelPt').setAttribute('x',x); document.getElementById('relLabelPt').setAttribute('y',REL_Y-14); document.getElementById('relLabelPt').setAttribute('text-anchor','middle');
  document.getElementById('relLabelPt').textContent = (relVal>=0?'+':'')+relVal.toFixed(1).replace(/\.0$/,'');
  document.getElementById('relLabelOpp').setAttribute('x',xOpp); document.getElementById('relLabelOpp').setAttribute('y',REL_Y+34); document.getElementById('relLabelOpp').setAttribute('text-anchor','middle');
  document.getElementById('relLabelOpp').textContent = (opp>=0?'+':'')+opp.toFixed(1).replace(/\.0$/,'');
  const arc=document.getElementById('relArcLeft');
  arc.setAttribute('x1',relValToX(0)); arc.setAttribute('y1',REL_Y);
  document.getElementById('relCoords').textContent = `Nombre : ${(relVal>=0?'+':'')+relVal.toFixed(1).replace(/\.0$/,'')}   →   opposé : ${(opp>=0?'+':'')+opp.toFixed(1).replace(/\.0$/,'')}   (même distance à 0, signe contraire)`;
}

function resetRelDemo(){ relVal=3.5; updateRelDemo(); }

function initRelDemo(){
  buildRelTicks(); updateRelDemo();
  const svgEl=document.getElementById('svgRelLine');
  const handle=document.getElementById('relHandle');
  let dragging=false;
  const start=e=>{dragging=true;e.preventDefault();};
  const move=e=>{
    if(!dragging) return;
    const p=svgPointFromEvent(svgEl,e);
    let v=relXToVal(p.x);
    v=Math.round(v*2)/2; // snap to 0.5
    v=Math.max(REL_MIN,Math.min(REL_MAX,v));
    relVal=v; updateRelDemo();
  };
  const end=()=>dragging=false;
  handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- repérage dans le plan : point déplaçable avec projections sur les axes ---- */

const PLANE_ORIGIN = {x:210, y:170};

const PLANE_UNIT = 34;

let planeVal = {x:3, y:-2};

function buildPlaneGrid(){
  const g=document.getElementById('planeGrid');
  let html='';
  for(let i=-5;i<=5;i++){
    const x=PLANE_ORIGIN.x+i*PLANE_UNIT;
    html+=`<line x1="${x}" y1="20" x2="${x}" y2="290" stroke="#EAE6F3" stroke-width="1"/>`;
  }
  for(let j=-4;j<=3;j++){
    const y=PLANE_ORIGIN.y-j*PLANE_UNIT;
    html+=`<line x1="20" y1="${y}" x2="460" y2="${y}" stroke="#EAE6F3" stroke-width="1"/>`;
  }
  g.innerHTML=html;
}

function updatePlaneDemo(){
  const px = PLANE_ORIGIN.x + planeVal.x*PLANE_UNIT;
  const py = PLANE_ORIGIN.y - planeVal.y*PLANE_UNIT;
  document.getElementById('planeHandle').setAttribute('cx',px);
  document.getElementById('planeHandle').setAttribute('cy',py);
  const dropX=document.getElementById('planeDropX'), dropY=document.getElementById('planeDropY');
  dropX.setAttribute('x1',px); dropX.setAttribute('y1',py); dropX.setAttribute('x2',px); dropX.setAttribute('y2',PLANE_ORIGIN.y);
  dropY.setAttribute('x1',px); dropY.setAttribute('y1',py); dropY.setAttribute('x2',PLANE_ORIGIN.x); dropY.setAttribute('y2',py);
  setTick(document.getElementById('planeMarkX'), px, PLANE_ORIGIN.y, 0);
  setTick(document.getElementById('planeMarkY'), PLANE_ORIGIN.x, py, Math.PI/2);
  const label=document.getElementById('planeLabel');
  label.setAttribute('x', px+10); label.setAttribute('y', py-10);
  label.textContent = `P(${planeVal.x} ; ${planeVal.y})`;
  document.getElementById('planeCoords').textContent = `Abscisse : ${planeVal.x}   ·   Ordonnée : ${planeVal.y}`;
}

function resetPlaneDemo(){ planeVal={x:3,y:-2}; updatePlaneDemo(); }

function initPlaneDemo(){
  buildPlaneGrid(); updatePlaneDemo();
  const svgEl=document.getElementById('svgPlane');
  const handle=document.getElementById('planeHandle');
  let dragging=false;
  const start=e=>{dragging=true;e.preventDefault();};
  const move=e=>{
    if(!dragging) return;
    const p=svgPointFromEvent(svgEl,e);
    let vx=Math.round((p.x-PLANE_ORIGIN.x)/PLANE_UNIT);
    let vy=Math.round((PLANE_ORIGIN.y-p.y)/PLANE_UNIT);
    vx=Math.max(-5,Math.min(5,vx)); vy=Math.max(-4,Math.min(3,vy));
    planeVal={x:vx,y:vy}; updatePlaneDemo();
  };
  const end=()=>dragging=false;
  handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- clé API partagée (quiz IA + interprétation de figures) ---- */


DEMO_REGISTRY['5e|Nombres relatifs'] = { cours:'cours-demo-relatifs', methode:'methode-demo-relatifs', exos:'exos-demo-relatifs', histoire:'histoire-demo-relatifs',
  init:()=>{ initRelDemo(); initPlaneDemo(); renderStaticMath(document.getElementById('cours-demo-relatifs')); injectCourseAddButtons(document.getElementById('cours-demo-relatifs')); } };

DEMO_QUIZZES['5e|Nombres relatifs'] = [
  {q:"Quelle est la valeur absolue de −8 ?",
   opts:["−8","8","0"], correct:1},
  {q:"Lequel de ces classements est correct ?",
   opts:["−9 > −2","−9 < −2","−9 = −2"], correct:1},
  {q:"Quel est l'opposé de −3,5 ?",
   opts:["3,5","−3,5","0"], correct:0},
];

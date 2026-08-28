/* ============================================================
   CHAPITRE : Opérations sur les nombres relatifs (5e, N3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Fait suite au chapitre N2 (Nombres relatifs : définition, repérage, comparaison).
   ============================================================ */
document.getElementById('cours-demo-operations-relatifs-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Addition de nombres relatifs</h3></div>

<span class="prop-badge">Règle 1</span>
<div class="def-box">Pour additionner deux nombres relatifs de <b>même signe</b>, on additionne leurs valeurs absolues et on garde le signe commun.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>(+5) et (+4) sont deux nombres positifs, donc leur somme est positive.<br>A = (+5) + (+4) = +9<br>La valeur absolue de la somme est la somme des valeurs absolues, soit 5 + 4 = 9.</li>
  <li>(−2,3) et (−11) sont deux nombres négatifs, donc leur somme est négative.<br>B = (−2,3) + (−11) = −13,3<br>La valeur absolue de la somme est la somme des valeurs absolues, soit 2,3 + 11 = 13,3.</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : la somme de deux nombres négatifs est toujours négative.</div>

<span class="prop-badge">Règle 2</span>
<div class="def-box">Pour additionner deux nombres relatifs de <b>signes contraires</b>, on soustrait leurs valeurs absolues (la plus petite à la plus grande), et le signe du résultat est celui du nombre qui a la plus grande valeur absolue.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>C'est (+15) qui a la plus grande valeur absolue, donc la somme est positive.<br>C = (+15) + (−6) = +9<br>La valeur absolue de la somme est la différence des valeurs absolues, soit 15 − 6 = 9.</li>
  <li>C'est (−9) qui a la plus grande valeur absolue, donc la somme est négative.<br>D = (+3,2) + (−9) = −5,8<br>La valeur absolue de la somme est la différence des valeurs absolues, soit 9 − 3,2 = 5,8.</li>
</ul>

<span class="prop-badge">Règle 3</span>
<div class="def-box">La somme de deux nombres <b>opposés</b> est égale à 0.</div>
<p class="example-title">Exemple :</p>
<p style="margin:4px 0 12px;">E = (−7,4) + (+7,4) = 0</p>

<span class="prop-badge">Règle 4</span>
<div class="def-box">Pour calculer la somme de plusieurs nombres relatifs, on peut commencer par regrouper, d'un côté, les nombres positifs et calculer leur somme et, de l'autre, les nombres négatifs et calculer leur somme, puis on applique les règles précédentes.</div>
<p class="example-title">Exemple :</p>
<p style="margin:4px 0 4px;">F = (−6) + (+9) + (−2) + (+5) + (−3)</p>
<p style="margin:4px 0 4px;">F = (+9) + (+5) + (−6) + (−2) + (−3)</p>
<p style="margin:4px 0 12px;">F = (+14) + (−11) = 3</p>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : on peut aussi commencer par regrouper les termes opposés s'il y en a.</div>

<div class="lesson-header"><span class="num">2</span><h3>Soustraction de nombres relatifs</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Soustraire un nombre relatif revient à additionner son <b>opposé</b>.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Soustraire (+10) revient à ajouter (−10).<br>G = (+6) − (+10) = (+6) + (−10) = −4</li>
  <li>Soustraire (−8,5) revient à ajouter (+8,5).<br>H = (−3,5) − (−8,5) = (−3,5) + (+8,5) = 5</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : la différence de deux nombres égaux est égale à 0. Par exemple : (−8) − (−8) = 0.</div>

<div class="lesson-header"><span class="num">3</span><h3>Somme algébrique</h3></div>
<span class="prop-badge">Règle 1</span>
<div class="def-box">Dans une suite d'additions et de soustractions de nombres relatifs, on commence par remplacer chaque soustraction par l'<b>addition du nombre opposé</b>.</div>
<p class="example-title">Exemple :</p>
<p style="margin:4px 0 4px;">I = (−5) − (+3,2) − (−9)</p>
<p style="margin:4px 0 12px;">I = (−5) + (−3,2) + (+9)</p>

<span class="prop-badge">Règle 2</span>
<div class="def-box">Dans une suite d'additions de nombres relatifs, on peut supprimer les signes d'addition et les parenthèses autour de chaque nombre, et le signe d'un nombre positif écrit en début de calcul.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>J = (−4) + (+6,5) + (−2)<br>J = −4 + 6,5 − 2</li>
  <li>K = (+3,3) + (−7) − (−15)<br>K = (+3,3) + (−7) + (+15)<br>K = 3,3 − 7 + 15</li>
</ul>

<span class="prop-badge">Règle 3</span>
<div class="def-box">Pour calculer <b>une somme algébrique simplifiée</b>, on peut commencer par regrouper, d'un côté, les nombres positifs et calculer leur somme et, de l'autre, les nombres négatifs et calculer leur somme.</div>
<p class="example-title">Exemple :</p>
<p style="margin:4px 0 4px;">L = 6,5 − 9 + 4 − 3,5 + 11 − 2</p>
<p style="margin:4px 0 4px;">L = 6,5 + 4 + 11 − 9 − 3,5 − 2</p>
<p style="margin:4px 0 4px;">L = 21,5 − 14,5</p>
<p style="margin:4px 0 12px;">L = 7</p>
`;

document.getElementById('histoire-demo-operations-relatifs-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Poser des règles pour calculer avec des nombres négatifs n'a rien d'évident : c'est le mathématicien indien Brahmagupta qui, en 628, dans son livre <i>Brahmasphutasiddhanta</i>, pose le premier des règles complètes pour additionner, soustraire, multiplier et diviser des nombres positifs et négatifs — y compris la fameuse règle « moins fois moins donne plus ». Curieusement, alors que les calculs étaient déjà maîtrisés, de nombreux mathématiciens européens ont continué, bien plus tard, à considérer les nombres négatifs comme des résultats « absurdes » ou dépourvus de sens, jusqu'au 17e-18e siècle.
</div>
`;

document.getElementById('methode-demo-operations-relatifs-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : additionner deux nombres relatifs, un « bond » sur la droite graduée</h4></div>
<div class="figure-wrap">
  <p class="hint" style="margin-top:6px;">Choisis un exemple : le point part de départ, bondit du nombre de cases indiqué, et atterrit sur le résultat.</p>
  <svg id="or-svgJump" viewBox="0 0 600 150" style="width:100%;max-width:560px;display:block;margin:14px auto;">
    <line x1="30" y1="100" x2="570" y2="100" stroke="#1C1B2E" stroke-width="1.6"/>
    <polygon points="570,100 560,95 560,105" fill="#1C1B2E"/>
    <g id="or-jumpTicks"></g>
    <path id="or-jumpArc" fill="none" stroke="#E35D3A" stroke-width="2" stroke-dasharray="5 4" opacity="0"/>
    <circle id="or-jumpDot" r="8" fill="#1F3A5C"/>
    <text id="or-jumpLabel" font-family="JetBrains Mono" font-size="15" font-weight="700" fill="#1F3A5C" text-anchor="middle"></text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" onclick="orPlayJumpExample(-3,5)">(−3) + 5</button>
    <button class="btn" onclick="orPlayJumpExample(2,-6)">2 + (−6)</button>
    <button class="btn" onclick="orPlayJumpExample(-4,-2)">(−4) + (−2)</button>
  </div>
  <div class="step-list" id="or-jumpRuleSteps">
    <div class="step-item" data-rule="diff"><div class="step-num">≠</div><div><b>Signes différents</b> : on soustrait la plus petite valeur absolue de la plus grande, et on garde le signe du nombre qui a la plus grande valeur absolue.</div></div>
    <div class="step-item" data-rule="same"><div class="step-num">=</div><div><b>Même signe</b> : on additionne les valeurs absolues, et on garde le signe commun.</div></div>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : additionner deux nombres relatifs de signes contraires</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="or-additionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="orAdditionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="orAdditionDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer une somme algébrique</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="or-sommeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="orSommeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="orSommeDemo.reset()">Recommencer</button>
  </div>
</div>

`;

document.getElementById('exos-demo-operations-relatifs-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Additionner deux nombres relatifs de signes contraires »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">M = (+7) + (−12)</span><span class="we-comment">On repère les deux nombres à additionner.</span></div>
    <div class="we-row"><span class="we-expr">C'est (−12) qui a la plus grande valeur absolue, donc la somme est négative.</span><span class="we-comment">On compare les valeurs absolues.</span></div>
    <div class="we-row"><span class="we-expr">M = −(12 − 7) = −5</span><span class="we-comment">On soustrait les valeurs absolues et on applique le signe trouvé.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Calcule : A = (−8) + (−5) &nbsp;&nbsp; B = (+6,4) + (+3,1) &nbsp;&nbsp; C = (+11) + (−4)
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Calcule : D = (+5) − (+9) &nbsp;&nbsp; E = (−2,5) − (−7,5) &nbsp;&nbsp; F = (−6) − (+6)
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Écris sans parenthèses ni signe d'addition, puis calcule : G = (+4) + (−9,5) + (−2) + (+13,5)
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Calcule astucieusement, en regroupant les nombres positifs entre eux et les nombres négatifs entre eux : H = 8 − 12,5 + 5 − 3 + 7,5 − 2
  </div>
</div>
`;

/* ---- Méthode 1 : addition visualisée comme un bond sur la droite graduée ---- */
const OR_JUMP_MIN=-7, OR_JUMP_MAX=7, OR_JUMP_ORIGIN_X=300, OR_JUMP_UNIT=36, OR_JUMP_Y=70;
function orJumpValToX(v){ return OR_JUMP_ORIGIN_X + v*OR_JUMP_UNIT; }
function orBuildJumpTicks(){
  const g=document.getElementById('or-jumpTicks');
  let html='';
  for(let v=OR_JUMP_MIN;v<=OR_JUMP_MAX;v++){
    const x=orJumpValToX(v);
    html+=`<line x1="${x}" y1="93" x2="${x}" y2="107" stroke="#1C1B2E" stroke-width="1.3"/>`;
    html+=`<text x="${x}" y="124" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${v}</text>`;
  }
  g.innerHTML=html;
}
function orResetJumpFigure(){
  orBuildJumpTicks();
  document.getElementById('or-jumpDot').setAttribute('cx',orJumpValToX(0));
  document.getElementById('or-jumpDot').setAttribute('cy',100);
  document.getElementById('or-jumpArc').setAttribute('opacity','0');
  document.getElementById('or-jumpLabel').textContent='';
  document.querySelectorAll('#or-jumpRuleSteps .step-item').forEach(s=>s.classList.remove('done'));
}
function orFmtRel(v){ return (v>0?'+':'')+ (Number.isInteger(v)?v:v.toFixed(1)); }
function orPlayJumpExample(start,delta){
  orResetJumpFigure();
  const end = start+delta;
  const x1=orJumpValToX(start), x2=orJumpValToX(end);
  const sameSign = (start>=0 && delta>=0) || (start<=0 && delta<=0);
  document.querySelector('#or-jumpRuleSteps .step-item[data-rule="'+(sameSign?'same':'diff')+'"]').classList.add('done');
  const dot=document.getElementById('or-jumpDot'), arc=document.getElementById('or-jumpArc'), label=document.getElementById('or-jumpLabel');
  dot.setAttribute('cx',x1); dot.setAttribute('cy',100);
  arc.setAttribute('opacity','1');
  label.setAttribute('x',(x1+x2)/2); label.setAttribute('y',35);
  label.textContent = `${orFmtRel(start)} + (${orFmtRel(delta)})`;
  const start_t=performance.now(), dur=1300;
  function frame(now){
    const t=Math.min(1,(now-start_t)/dur);
    const eased = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const cx = x1+(x2-x1)*eased;
    const bumpHeight = 55*Math.sin(Math.PI*eased);
    dot.setAttribute('cx',cx); dot.setAttribute('cy',100-bumpHeight);
    const midx=(x1+cx)/2;
    arc.setAttribute('d', `M${x1},100 Q${midx},${100-bumpHeight*1.5} ${cx},${100-bumpHeight}`);
    if(t<1) requestAnimationFrame(frame);
    else {
      dot.setAttribute('cy',100);
      label.textContent = `${orFmtRel(start)} + (${orFmtRel(delta)}) = ${orFmtRel(end)}`;
    }
  }
  requestAnimationFrame(frame);
}

/* ---- Méthode 2 : addition de signes contraires ---- */
const OR_ADDITION_STEPS = [
  {expr:'N = (+8) + (−14)', note:"On repère les deux nombres relatifs à additionner."},
  {expr:"C'est (−14) qui a la plus grande valeur absolue (14 > 8).", note:"On compare les valeurs absolues des deux nombres."},
  {expr:'Donc la somme est négative.', note:"Le signe du résultat est celui du nombre qui a la plus grande valeur absolue."},
  {expr:'N = −(14 − 8) = −6', note:"On soustrait la plus petite valeur absolue à la plus grande, et on applique le signe trouvé."},
];
const orAdditionDemo = makeStepDemo(OR_ADDITION_STEPS, 'or-additionDisplay');

/* ---- Méthode 3 : somme algébrique ---- */
const OR_SOMME_STEPS = [
  {expr:'P = 5,2 − 8 + 3 − 1,2 + 9 − 4', note:"On part d'une somme algébrique déjà simplifiée (sans parenthèses)."},
  {expr:'P = 5,2 + 3 + 9 − 8 − 1,2 − 4', note:"On regroupe les nombres positifs entre eux et les nombres négatifs entre eux."},
  {expr:'P = 17,2 − 13,2', note:"On calcule chaque somme séparément."},
  {expr:'P = 4', note:"On termine le calcul."},
];
const orSommeDemo = makeStepDemo(OR_SOMME_STEPS, 'or-sommeDisplay');

DEMO_REGISTRY['5e|Opérations sur les nombres relatifs'] = {
  cours:'cours-demo-operations-relatifs-5e', methode:'methode-demo-operations-relatifs-5e', exos:'exos-demo-operations-relatifs-5e', histoire:'histoire-demo-operations-relatifs-5e',
  init:()=>{
    orResetJumpFigure();
    orAdditionDemo.reset();
    orSommeDemo.reset();
    injectCourseAddButtons(document.getElementById('cours-demo-operations-relatifs-5e')); injectCourseAddButtons(document.getElementById('methode-demo-operations-relatifs-5e'));
  }
};

DEMO_QUIZZES['5e|Opérations sur les nombres relatifs'] = [
  {q:"(−9) + (−4) est égal à...",
   opts:["−13","+13","−5"], correct:0},
  {q:"(+7) + (−15) est égal à...",
   opts:["+8","−8","−22"], correct:1},
  {q:"La somme de deux nombres opposés est toujours égale à...",
   opts:["1","0","La somme de leurs valeurs absolues"], correct:1},
  {q:"Soustraire (−6) revient à...",
   opts:["Ajouter (−6)","Ajouter (+6)","Ne rien changer"], correct:1},
  {q:"Dans une somme algébrique, +8 − 3 + 5 − 2 peut se calculer en regroupant...",
   opts:["Les nombres pairs et impairs","Les nombres positifs entre eux et les négatifs entre eux","Les nombres dans l'ordre d'écriture uniquement"], correct:1},
];

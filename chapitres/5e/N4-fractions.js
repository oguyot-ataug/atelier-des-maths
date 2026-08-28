/* ============================================================
   CHAPITRE : Fractions (5e, N4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-fractions-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Égalité de quotients</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Quotients égaux</h4></div>
<span class="prop-badge">Règles</span>
<div class="def-box">
  Un quotient ne change pas de valeur quand on <b>multiplie</b> son numérateur et son dénominateur par un même nombre non nul.<br>
  Un quotient ne change pas de valeur quand on <b>divise</b> son numérateur et son dénominateur par un même nombre non nul.<br>
  Soient a, b et k des nombres avec b ≠ 0 et k ≠ 0 : <span class="tex">\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}</span> et <span class="tex">\\dfrac{a}{b} = \\dfrac{a : k}{b : k}</span>.
</div>
<ul class="example-list">
  <li><span class="tex">\\dfrac{2}{9} = \\dfrac{2 \\times 5}{9 \\times 5} = \\dfrac{10}{45}</span></li>
  <li><span class="tex">\\dfrac{24}{18} = \\dfrac{24 : 6}{18 : 6} = \\dfrac{4}{3}</span></li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Division par un nombre décimal</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour diviser par un nombre décimal, on commence par écrire le quotient sous forme de fraction. On multiplie ensuite le numérateur et le dénominateur par 10, 100, 1 000… pour obtenir un dénominateur entier. On applique enfin la méthode de division d'un nombre décimal par un entier (vue en 6e).
</div>
<p class="example-title">Exemple : calcule 2,4 : 0,3.</p>
<p style="margin:4px 0 12px;"><span class="tex">2{,}4 : 0{,}3 = \\dfrac{2{,}4}{0{,}3} = \\dfrac{2{,}4 \\times 10}{0{,}3 \\times 10} = \\dfrac{24}{3} = 8</span></p>
<p class="example-title">Exemple : calcule 5,85 : 1,5.</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
<div class="figure-wrap">
  <div class="step-display" id="fq-diviseDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fqDiviseDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fqDiviseDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Comparaison de deux fractions</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Comparaison de fractions de même dénominateur</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Deux fractions de <b>même dénominateur</b> sont rangées dans le même ordre que leur numérateur.</div>
<p class="example-title">Exemple : ordonne les fractions <span class="tex">\\dfrac{5}{8}</span>, <span class="tex">\\dfrac{9}{8}</span>, <span class="tex">\\dfrac{8}{8}</span>, <span class="tex">\\dfrac{4}{8}</span> dans l'ordre croissant.</p>
<p style="margin:4px 0 4px;">Ces fractions ont toutes le même dénominateur 8.</p>
<p style="margin:4px 0 4px;">Elles sont donc ordonnées dans l'ordre croissant de leur numérateur.</p>
<p style="margin:4px 0 12px;">Comme 4 &lt; 5 &lt; 8 &lt; 9, on en déduit que <span class="tex">\\dfrac{4}{8} < \\dfrac{5}{8} < \\dfrac{8}{8} < \\dfrac{9}{8}</span>.</p>

<p class="interaction-hint" style="margin:4px 0 8px;">Déplacez le curseur pour changer le numérateur de chaque fraction, et observez comment les bandes (qui représentent chaque fraction) évoluent.</p>
<div class="figure-wrap">
  <div id="fq-compareSvg" style="max-width:460px;margin:0 auto;background:var(--white);border-radius:8px;padding:12px 0;">
  </div>
  <div class="figure-toolbar" style="display:flex;gap:20px;justify-content:center;margin-top:8px;flex-wrap:wrap;">
    <label class="hint" style="margin:0;">Numérateur de A : <input type="range" id="fq-numA" min="0" max="8" value="5" oninput="fqUpdateCompare()"> <span id="fq-numA-val">5</span>/8</label>
    <label class="hint" style="margin:0;">Numérateur de B : <input type="range" id="fq-numB" min="0" max="8" value="7" oninput="fqUpdateCompare()"> <span id="fq-numB-val">7</span>/8</label>
  </div>
  <p class="hint" id="fq-compareNote" style="text-align:center;margin-top:8px;"></p>
</div>

<div class="sub-header"><span class="letter">B</span><h4>Comparaison de fractions de dénominateurs différents</h4></div>
<span class="prop-badge">Règle 1</span>
<div class="def-box">Pour comparer deux fractions de <b>dénominateurs multiples</b> l'un de l'autre, on les réduit au même dénominateur (le plus grand des deux), puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemple : compare les fractions <span class="tex">\\dfrac{7}{4}</span> et <span class="tex">\\dfrac{31}{20}</span>.</p>
<p style="margin:4px 0 4px;"><span class="tex">\\dfrac{7}{4} = \\dfrac{7 \\times 5}{4 \\times 5} = \\dfrac{35}{20}</span> et on garde <span class="tex">\\dfrac{31}{20}</span>.</p>
<p style="margin:4px 0 4px;">Or, 35 &gt; 31.</p>
<p style="margin:4px 0 12px;">Donc <span class="tex">\\dfrac{35}{20} > \\dfrac{31}{20}</span>, donc <span class="tex">\\dfrac{7}{4} > \\dfrac{31}{20}</span>.</p>
<span class="prop-badge">Règle 2</span>
<div class="def-box">Pour comparer deux fractions de <b>dénominateurs quelconques</b>, on les réduit au même dénominateur, puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemple : compare les fractions <span class="tex">\\dfrac{1}{3}</span> et <span class="tex">\\dfrac{4}{7}</span>.</p>
<p style="margin:4px 0 4px;"><span class="tex">\\dfrac{1}{3} = \\dfrac{1 \\times 7}{3 \\times 7} = \\dfrac{7}{21}</span> et <span class="tex">\\dfrac{4}{7} = \\dfrac{4 \\times 3}{7 \\times 3} = \\dfrac{12}{21}</span>.</p>
<p style="margin:4px 0 4px;">Or, 7 &lt; 12.</p>
<p style="margin:4px 0 12px;">Donc <span class="tex">\\dfrac{7}{21} < \\dfrac{12}{21}</span>, donc <span class="tex">\\dfrac{1}{3} < \\dfrac{4}{7}</span>.</p>
<p class="example-title">Exemple : compare les fractions <span class="tex">\\dfrac{5}{6}</span> et <span class="tex">\\dfrac{7}{9}</span>.</p>
<p style="margin:4px 0 4px;"><span class="tex">\\dfrac{5}{6} = \\dfrac{5 \\times 3}{6 \\times 3} = \\dfrac{15}{18}</span> et <span class="tex">\\dfrac{7}{9} = \\dfrac{7 \\times 2}{9 \\times 2} = \\dfrac{14}{18}</span>.</p>
<p style="margin:4px 0 4px;">Or, 15 &gt; 14.</p>
<p style="margin:4px 0 12px;">Donc <span class="tex">\\dfrac{15}{18} > \\dfrac{14}{18}</span>, donc <span class="tex">\\dfrac{5}{6} > \\dfrac{7}{9}</span>.</p>


<div class="lesson-header"><span class="num">3</span><h3>Addition et soustraction de fractions</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Fractions de même dénominateur</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>même dénominateur</b>, il suffit d'additionner (ou de soustraire) les numérateurs, et de garder le dénominateur commun. Pour tous nombres a, b et c où c est non nul : <span class="tex">\\dfrac{a}{c} + \\dfrac{b}{c} = \\dfrac{a+b}{c}</span> et <span class="tex">\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a-b}{c}</span>.</div>
<ul class="example-list">
  <li><span class="tex">A = \\dfrac{7}{5} + \\dfrac{6}{5} = \\dfrac{7+6}{5} = \\dfrac{13}{5}</span></li>
  <li><span class="tex">B = \\dfrac{19}{8} - \\dfrac{5}{8} = \\dfrac{19-5}{8} = \\dfrac{14}{8}</span></li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Fractions de dénominateurs différents</h4></div>
<span class="prop-badge">Règle 1</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>dénominateurs multiples</b> l'un de l'autre, on commence par les réduire au même dénominateur (le plus grand des deux), puis on applique la règle du paragraphe précédent.</div>
<ul class="example-list">
  <li><span class="tex">\\begin{aligned} C &= \\dfrac{7}{3} + \\dfrac{6}{12} \\\\ C &= \\dfrac{7 \\times 4}{3 \\times 4} + \\dfrac{6}{12} \\\\ C &= \\dfrac{28}{12} + \\dfrac{6}{12} \\\\ C &= \\dfrac{34}{12} \\end{aligned}</span></li>
  <li><span class="tex">\\begin{aligned} D &= \\dfrac{7}{3} - \\dfrac{6}{12} \\\\ D &= \\dfrac{28}{12} - \\dfrac{6}{12} \\\\ D &= \\dfrac{22}{12} \\end{aligned}</span></li>
</ul>
<span class="prop-badge">Règle 2</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>dénominateurs quelconques</b>, on les réduit au même dénominateur, puis on applique la règle du paragraphe précédent.</div>
<ul class="example-list">
  <li><span class="tex">\\begin{aligned} E &= \\dfrac{2}{3} + \\dfrac{8}{7} \\\\ E &= \\dfrac{2 \\times 7}{3 \\times 7} + \\dfrac{8 \\times 3}{7 \\times 3} \\\\ E &= \\dfrac{14}{21} + \\dfrac{24}{21} \\\\ E &= \\dfrac{38}{21} \\end{aligned}</span></li>
  <li><span class="tex">\\begin{aligned} F &= \\dfrac{10}{9} - \\dfrac{5}{6} \\\\ F &= \\dfrac{10 \\times 2}{9 \\times 2} - \\dfrac{5 \\times 3}{6 \\times 3} \\\\ F &= \\dfrac{20}{18} - \\dfrac{15}{18} \\\\ F &= \\dfrac{5}{18} \\end{aligned}</span></li>
</ul>
`;

document.getElementById('histoire-demo-fractions-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La petite barre horizontale qui sépare le numérateur du dénominateur, aujourd'hui si naturelle, n'a pas toujours existé. Elle apparaît vers 1200 sous la plume du mathématicien arabe Al-Hassar, puis c'est l'Italien Fibonacci (Léonard de Pise) qui la fait connaître en Europe, dans son célèbre <i>Liber Abaci</i> (« Livre du calcul »), publié en 1202. Avant cette invention, on écrivait souvent le numérateur juste au-dessus du dénominateur, sans aucun trait pour les séparer clairement — ce qui pouvait facilement prêter à confusion !
</div>
`;

document.getElementById('methode-demo-fractions-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : additionner deux fractions de dénominateurs différents</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="fq-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fqMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fqMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-fractions-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Compare deux fractions de dénominateurs différents »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{3}{5} = \\dfrac{3 \\times 4}{5 \\times 4} = \\dfrac{12}{20}</span> et <span class="tex">\\dfrac{9}{20}</span>.</span><span class="we-comment">On réduit au même dénominateur.</span></div>
    <div class="we-row"><span class="we-expr">Or, 12 &gt; 9.</span><span class="we-comment">On compare les numérateurs.</span></div>
    <div class="we-row"><span class="we-expr">Donc <span class="tex">\\dfrac{12}{20} > \\dfrac{9}{20}</span>, donc <span class="tex">\\dfrac{3}{5} > \\dfrac{9}{20}</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Calcule 4,8 : 0,4 en écrivant le quotient sous forme de fraction.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Compare les fractions <span class="tex">\\dfrac{2}{5}</span> et <span class="tex">\\dfrac{7}{15}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Calcule <span class="tex">G = \\dfrac{5}{4} + \\dfrac{3}{8}</span> et <span class="tex">H = \\dfrac{11}{6} - \\dfrac{2}{3}</span>.
  </div>
</div>
`;

/* ================= Figure dynamique : comparaison de fractions (bandes proportionnelles) ================= */
function fqUpdateCompare(){
  const numA = parseInt(document.getElementById('fq-numA').value);
  const numB = parseInt(document.getElementById('fq-numB').value);
  document.getElementById('fq-numA-val').textContent = numA;
  document.getElementById('fq-numB-val').textContent = numB;

  const denom = 8;
  function buildBar(num, color, label){
    const pct = (num/denom)*100;
    let cells = '';
    for(let i=0;i<denom;i++){
      cells += `<div style="flex:1;${i<denom-1?'border-right:1px solid rgba(28,43,57,.25);':''}"></div>`;
    }
    return `<div style="display:flex;align-items:center;gap:10px;margin:10px 0;">
      <div style="font-weight:700;color:${color};width:18px;text-align:right;font-family:'Space Grotesk',sans-serif;">${label}</div>
      <div style="position:relative;width:320px;max-width:60%;height:36px;border:1.5px solid #1C1B2E;border-radius:2px;">
        <div style="position:absolute;top:0;left:0;height:100%;width:${pct}%;background:${color};opacity:.55;"></div>
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;display:flex;">${cells}</div>
      </div>
      <div style="color:var(--ink-soft);font-size:.85rem;white-space:nowrap;">${num}/8</div>
    </div>`;
  }

  document.getElementById('fq-compareSvg').innerHTML = buildBar(numA, '#1F3A5C', 'A') + buildBar(numB, '#E35D3A', 'B');

  const note = document.getElementById('fq-compareNote');
  if(numA===numB) note.textContent = `${numA}/8 = ${numB}/8 : les deux fractions sont égales, les bandes sont remplies pareil.`;
  else if(numA>numB) note.textContent = `${numA} > ${numB} donc ${numA}/8 > ${numB}/8 : la bande A est plus remplie.`;
  else note.textContent = `${numA} < ${numB} donc ${numA}/8 < ${numB}/8 : la bande B est plus remplie.`;
}
function initCompareDemo(){ fqUpdateCompare(); }

/* ================= Démonstration pas à pas : division par un décimal ================= */
const FQ_DIVISE_STEPS = [
  {expr:'<span class="tex">5{,}85 : 1{,}5 = \\dfrac{5{,}85}{1{,}5}</span>', note:"On écrit le quotient sous forme de fraction."},
  {expr:'<span class="tex">\\dfrac{5{,}85}{1{,}5} = \\dfrac{5{,}85 \\times 10}{1{,}5 \\times 10} = \\dfrac{58{,}5}{15}</span>', note:"On multiplie le numérateur et le dénominateur par 10, pour obtenir un dénominateur entier (15)."},
  {expr:'<span class="tex">58{,}5 : 15 = 3{,}9</span>', note:"On applique la méthode de division d'un nombre décimal par un entier (vue en 6e) : le quotient est 3,9."},
];
let fqDiviseIdx = 0;
function fqRenderDivise(){
  const el = document.getElementById('fq-diviseDisplay');
  if(!el) return;
  const atEnd = fqDiviseIdx === FQ_DIVISE_STEPS.length-1;
  const lines = FQ_DIVISE_STEPS.slice(0, fqDiviseIdx+1).map((s,i)=>{
    const isFinal = atEnd && i===fqDiviseIdx;
    return `<div class="${isFinal?'step-final':''}" style="margin:10px 0;">${s.expr}</div>`;
  }).join('');
  el.innerHTML = `<div class="step-column">${lines}</div><div class="step-note">${FQ_DIVISE_STEPS[fqDiviseIdx].note}</div>`;
  el._stepDemoSteps = FQ_DIVISE_STEPS;
  renderStaticMath(el);
}
const fqDiviseDemo = {
  next(){ if(fqDiviseIdx<FQ_DIVISE_STEPS.length-1) fqDiviseIdx++; fqRenderDivise(); },
  reset(){ fqDiviseIdx=0; fqRenderDivise(); },
};

/* ================= Méthode animée : addition de fractions ================= */
const FQ_METHODE_STEPS = [
  {expr:'<span class="tex">\\dfrac{5}{4} + \\dfrac{2}{3}</span>', note:"On souhaite additionner ces deux fractions de dénominateurs différents (4 et 3)."},
  {expr:'On cherche un dénominateur commun : 12 (4 × 3)', note:"4 et 3 n'étant pas multiples l'un de l'autre, on choisit leur produit comme dénominateur commun : 12."},
  {expr:'<span class="tex">\\dfrac{5}{4} = \\dfrac{5 \\times 3}{4 \\times 3} = \\dfrac{15}{12}</span> et <span class="tex">\\dfrac{2}{3} = \\dfrac{2 \\times 4}{3 \\times 4} = \\dfrac{8}{12}</span>', note:"On réduit chaque fraction au dénominateur commun 12."},
  {expr:'<span class="tex">\\dfrac{15}{12} + \\dfrac{8}{12} = \\dfrac{15+8}{12} = \\dfrac{23}{12}</span>', note:"On additionne les numérateurs, en gardant le dénominateur commun."},
];
const fqMethodeDemo = makeStepDemo(FQ_METHODE_STEPS, 'fq-methodeDisplay');

DEMO_REGISTRY['5e|Fractions'] = { cours:'cours-demo-fractions-5e', methode:'methode-demo-fractions-5e', exos:'exos-demo-fractions-5e', histoire:'histoire-demo-fractions-5e',
  init:()=>{ initCompareDemo(); fqDiviseDemo.reset(); fqMethodeDemo.reset(); renderStaticMath(document.getElementById('cours-demo-fractions-5e')); renderStaticMath(document.getElementById('exos-demo-fractions-5e')); injectCourseAddButtons(document.getElementById('cours-demo-fractions-5e')); injectCourseAddButtons(document.getElementById('methode-demo-fractions-5e')); } };

DEMO_QUIZZES['5e|Fractions'] = [
  {q:"3/7 = ?/21 : par quel nombre multiplie-t-on le numérateur 3 ?",
   opts:["Par 3","Par 7","Par 21"], correct:0},
  {q:"Pour comparer 5/6 et 7/9, quelle est la première étape ?",
   opts:["Les réduire au même dénominateur","Comparer directement les numérateurs","Comparer directement les dénominateurs"], correct:0},
  {q:"7/5 − 2/5 = ?",
   opts:["5/5","5/0","9/5"], correct:0},
];

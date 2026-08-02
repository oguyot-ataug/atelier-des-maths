/* ============================================================
   CHAPITRE : Calcul littéral (5e, N5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

const CL_CD_STEPS = [
  {expr:'<span class="tex">C = 2 \\times 3^2 + 5</span>', note:"On remplace x par 3 dans l'expression de C."},
  {expr:'<span class="tex">C = 2 \\times 9 + 5</span>', note:"On calcule d'abord la puissance : 3² = 9."},
  {expr:'<span class="tex">C = 23</span>', note:"On termine avec les priorités opératoires : 2×9=18, puis 18+5=23."},
  {expr:'<span class="tex">D = (2 \\times 3)^2 + 5</span>', note:"On remplace x par 3 dans l'expression de D."},
  {expr:'<span class="tex">D = 6^2 + 5</span>', note:"On calcule d'abord la parenthèse : 2×3=6."},
  {expr:'<span class="tex">D = 41</span>', note:"On calcule la puissance (6²=36), puis l'addition (36+5=41)."},
];
const clCDDemo = makeStepDemo(CL_CD_STEPS, 'clCDDisplay');

const CL_EQ_STEPS = [
  {expr:'<span class="tex">5 \\times 3 + 3 = 18</span>', note:"Pour x = 3, on calcule le membre de gauche."},
  {expr:'<span class="tex">2 \\times 3 + 12 = 18</span>', note:"On calcule le membre de droite."},
  {expr:"18 = 18, donc l'égalité est vraie pour x = 3.", note:"Les deux membres sont égaux : l'égalité est vraie pour cette valeur."},
  {expr:'<span class="tex">5 \\times 5 + 3 = 28</span>', note:"Pour x = 5, on calcule le membre de gauche."},
  {expr:'<span class="tex">2 \\times 5 + 12 = 22</span>', note:"On calcule le membre de droite."},
  {expr:"28 ≠ 22, donc l'égalité est fausse pour x = 5.", note:"Les deux membres sont différents : l'égalité est fausse pour cette valeur."},
];
const clEqDemo = makeStepDemo(CL_EQ_STEPS, 'clEqDisplay');

const CL_DEV_STEPS = [
  {expr:'<span class="tex">H = 4 \\times (x+5)</span>', note:"On remplace le signe × devant la parenthèse."},
  {expr:'<span class="tex">H = 4 \\times x + 4 \\times 5</span>', note:"On distribue : 4 multiplie chacun des deux termes."},
  {expr:'<span class="tex">H = 4x + 20</span>', note:"On calcule chaque produit."},
  {expr:'<span class="tex">I = 2,5 \\times (y-3)</span>', note:"On remplace le signe × devant la parenthèse."},
  {expr:'<span class="tex">I = 2,5 \\times y - 2,5 \\times 3</span>', note:"On distribue : 2,5 multiplie chacun des deux termes."},
  {expr:'<span class="tex">I = 2,5y - 7,5</span>', note:"On calcule chaque produit."},
  {expr:'<span class="tex">J = t \\times (6+t)</span>', note:"On remplace le signe × devant la parenthèse."},
  {expr:'<span class="tex">J = t \\times 6 + t \\times t</span>', note:"On distribue : t multiplie chacun des deux termes."},
  {expr:'<span class="tex">J = 6t + t^2</span>', note:"On calcule et on simplifie chaque produit."},
];
const clDevDemo = makeStepDemo(CL_DEV_STEPS, 'clDevDisplay');

const CL_FACT_STEPS = [
  {expr:'<span class="tex">K = 7x + 2x</span>', note:"On repère le facteur commun aux deux termes : x."},
  {expr:'<span class="tex">K = (7+2) \\times x</span>', note:"On met ce facteur commun en évidence."},
  {expr:'<span class="tex">K = 9x</span>', note:"On calcule et on simplifie."},
  {expr:'<span class="tex">L = 8,1y - y</span>', note:"On repère le facteur commun aux deux termes : y (on peut écrire y = 1 × y)."},
  {expr:'<span class="tex">L = (8,1-1) \\times y</span>', note:"On met ce facteur commun en évidence."},
  {expr:'<span class="tex">L = 7,1y</span>', note:"On calcule et on simplifie."},
];
const clFactDemo = makeStepDemo(CL_FACT_STEPS, 'clFactDisplay');

document.getElementById('cours-demo-calcul-litteral-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Expression littérale</h3></div>

<p class="example-title" style="margin-top:0;">A. Généralités</p>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>expression littérale</b> est une expression qui contient une ou plusieurs lettres. Ces lettres désignent des nombres.</div>

<p style="margin:12px 0 6px;"><b>Exemples</b> :</p>
<p style="margin:2px 0;">Le périmètre d'un triangle équilatéral de côté <span class="tex">a</span> s'exprime avec l'expression littérale : <span class="tex">\\mathcal{P} = a \\times 3</span>.</p>
<p style="margin:2px 0 14px;">Le double du nombre entier précédant l'entier <span class="tex">n</span> s'exprime sous la forme : <span class="tex">2 \\times (n - 1)</span>.</p>

<span class="prop-badge">Règle</span>
<div class="def-box">Pour <b>simplifier</b> l'écriture d'une expression littérale, on peut supprimer le signe « <span class="tex">\\times</span> » devant une lettre ou une parenthèse.</div>

<p style="margin:12px 0 6px;"><b>Exemples</b> :</p>
<p style="margin:2px 0;">L'aire d'un rectangle de longueur <span class="tex">L</span> et de largeur <span class="tex">l</span> est : <span class="tex">\\mathcal{A} = L \\times l = Ll</span>.</p>
<p style="margin:2px 0 10px;">L'expression <span class="tex">5 \\times (x - 2)</span> peut s'écrire plus simplement sous la forme : <span class="tex">5(x-2)</span>.</p>
<p class="hint" style="margin:0 0 14px;">Remarque : on peut simplifier <span class="tex">1 \\times x</span> en <span class="tex">x</span>, et <span class="tex">0 \\times y</span> en <span class="tex">0</span>.</p>

<p class="example-title" style="margin-top:22px;">B. Puissances</p>
<span class="def-badge">Définitions</span>
<div class="def-box"><span class="tex">a</span> désigne un nombre. <span class="tex">a \\times a = a^2</span>, où <span class="tex">a^2</span> se lit « <span class="tex">a</span> au carré » ; et <span class="tex">a \\times a \\times a = a^3</span>, où <span class="tex">a^3</span> se lit « <span class="tex">a</span> au cube ».</div>

<p style="margin:12px 0 6px;"><b>Exemples</b> :</p>
<p style="margin:2px 0;">On considère un carré de côté <span class="tex">n</span>. Son aire est : <span class="tex">\\mathcal{A} = n \\times n = n^2</span>.</p>
<p style="margin:2px 0 14px;">On considère un cube d'arête <span class="tex">m</span>. Son volume est : <span class="tex">\\mathcal{V} = m \\times m \\times m = m^3</span>.</p>

<p style="margin:10px 0 6px;">Voici les 12 premiers carrés à connaître :</p>
<table style="border-collapse:collapse;width:100%;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.82rem;margin:0 0 16px;">
  <tr><th style="padding:5px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">a</th><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">1</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">2</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">3</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">4</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">5</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">6</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">7</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">8</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">9</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">10</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">11</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">12</td></tr>
  <tr><th style="padding:5px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">a²</th><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">1</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">4</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">9</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">16</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">25</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">36</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">49</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">64</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">81</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">100</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">121</td><td style="padding:5px;border:1px solid rgba(28,43,57,.2);">144</td></tr>
</table>

<div class="lesson-header"><span class="num">2</span><h3>Valeur d'une expression littérale</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour calculer la <b>valeur d'une expression littérale</b> par substitution, on remplace chaque lettre par une valeur numérique donnée.</div>

<p style="margin:12px 0 8px;"><b>Exemple</b> : soient <span class="tex">C = 2x^2 + 5</span> et <span class="tex">D = (2x)^2 + 5</span>. Calcule C et D pour <span class="tex">x = 3</span>.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le calcul.</p>
  <div class="step-display" id="clCDDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="clCDDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="clCDDemo.reset()">Recommencer</button>
  </div>
</div>
<p class="hint" style="margin:10px 0 0;">Remarque : C et D ne donnent pas le même résultat pour x = 3, alors que les deux expressions se ressemblent. <span class="tex">2x^2</span> et <span class="tex">(2x)^2</span> ne désignent pas la même chose : dans <span class="tex">2x^2</span>, seul x est élevé au carré ; dans <span class="tex">(2x)^2</span>, c'est le produit <span class="tex">2x</span> tout entier qui l'est.</p>

<div class="lesson-header"><span class="num">3</span><h3>Égalité</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>égalité</b> est une expression composée de deux membres séparés par le signe « = ».</div>

<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour <b>tester une égalité</b> pour une valeur donnée d'une lettre :
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>on remplace la lettre par sa valeur numérique dans chaque membre ;</li>
    <li>on calcule chaque membre séparément ;</li>
    <li>si les deux résultats sont égaux, alors l'égalité est vraie ; s'ils sont différents, alors l'égalité est fausse.</li>
  </ul>
</div>

<p style="margin:12px 0 8px;"><b>Exemple</b> : soit l'égalité <span class="tex">5x + 3 = 2x + 12</span>. Cette égalité est-elle vraie pour <span class="tex">x = 3</span> ? Pour <span class="tex">x = 5</span> ?</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div class="step-display" id="clEqDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="clEqDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="clEqDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Distributivité simple</h3></div>

<p class="example-title" style="margin-top:0;">A. Développement</p>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Développer</b> une expression, c'est l'écrire sous la forme d'une somme algébrique.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres relatifs <span class="tex">k</span>, <span class="tex">a</span> et <span class="tex">b</span> : <span class="tex">k \\times (a+b) = k \\times a + k \\times b</span> et <span class="tex">k \\times (a-b) = k \\times a - k \\times b</span>.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> : développe chaque expression, en détaillant chaque étape.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler chaque développement.</p>
  <div class="step-display" id="clDevDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="clDevDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="clDevDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:22px;">B. Factorisation</p>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Factoriser</b> une expression, c'est l'écrire sous la forme d'un produit.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres relatifs <span class="tex">k</span>, <span class="tex">a</span> et <span class="tex">b</span> : <span class="tex">k \\times a + k \\times b = k \\times (a+b)</span> et <span class="tex">k \\times a - k \\times b = k \\times (a-b)</span>.</div>

<p style="margin:12px 0 8px;">La factorisation permet de réduire des expressions littérales de la forme <span class="tex">ka + kb</span> et <span class="tex">ay - by</span>, où <span class="tex">a</span> et <span class="tex">b</span> sont des nombres décimaux.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler chaque factorisation.</p>
  <div class="step-display" id="clFactDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="clFactDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="clFactDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= METHODE : développer et factoriser, pas à pas ================= */
function clArrowHead(x,y,angleDeg,size,color){
  size = size||6;
  const a = angleDeg*Math.PI/180;
  const b1 = {x:x-size*Math.cos(a-0.45), y:y-size*Math.sin(a-0.45)};
  const b2 = {x:x-size*Math.cos(a+0.45), y:y-size*Math.sin(a+0.45)};
  return `<polygon points="${x},${y} ${b1.x.toFixed(1)},${b1.y.toFixed(1)} ${b2.x.toFixed(1)},${b2.y.toFixed(1)}" fill="${color}"/>`;
}
/* Flèche courbe au-dessus de l'expression, du facteur k vers le terme qu'il multiplie. */
function clDevArc(x1,x2,y,color){
  const midX=(x1+x2)/2, top=y-46;
  return `<path d="M ${x1} ${y-16} Q ${midX} ${top} ${x2} ${y-16}" fill="none" stroke="${color}" stroke-width="1.7"/>
    ${clArrowHead(x2, y-16, 100, 6, color)}`;
}
const CL_MONO = "font-family:'JetBrains Mono',monospace;";
function clText(x,y,size,color,weight,txt){
  return `<text x="${x}" y="${y}" style="${CL_MONO}font-size:${size}px;${weight?'font-weight:700;':''}" fill="${color}">${txt}</text>`;
}

let clMDevStep = 0;
function clMDevRender(step){
  const y=60, k=40, xTerm=88, minus=112, four=142;
  let s = `<svg id="clMDevSvg" viewBox="0 0 400 210" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += clText(k,y,22,'#1C1B2E',false,'6') + clText(65,y,22,'#1C1B2E',false,'(') + clText(xTerm,y,22,'#1C1B2E',false,'x')
     + clText(minus,y,22,'#1C1B2E',false,'\u2212') + clText(four,y,22,'#1C1B2E',false,'4') + clText(165,y,22,'#1C1B2E',false,')');
  if(step>=1) s += clDevArc(k+8, xTerm+6, y, '#1F6B3A') + clText(40,y+65,20,'#1F6B3A',false,'6 &times; x');
  if(step>=2) s += clDevArc(k+8, four+6, y, '#9E1F5E') + clText(112,y+65,20,'#1C1B2E',false,'\u2212') + clText(140,y+65,20,'#9E1F5E',false,'6 &times; 4');
  if(step>=3) s += clText(40,y+110,22,'var(--accent-orange)',true,'6x \u2212 24');
  s += `</svg>`;
  return s;
}
function clMDevUpdate(step){
  document.getElementById('clMDevWrap').innerHTML = clMDevRender(step);
  document.querySelectorAll('#clMDevSteps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('clMDevNext').textContent = step>=3 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('clMDevNext').disabled = step>=3;
}
function clMDevNext(){ if(clMDevStep<3){ clMDevStep++; clMDevUpdate(clMDevStep); } }
function clMDevReset(){ clMDevStep=0; clMDevUpdate(0); }
const CL_MDEV_STEPS = [
  {note:"On part de l'expression à développer : 6(x − 4)."},
  {note:"6 multiplie le premier terme : 6 × x."},
  {note:"6 multiplie aussi le second terme, avec son signe : − 6 × 4."},
  {note:"On calcule chaque produit : 6x − 24."},
];

let clMFactStep = 0;
function clMFactRender(step){
  const y=60;
  let s = `<svg id="clMFactSvg" viewBox="0 0 400 150" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  if(step===0){
    s += clText(40,y,22,'#1C1B2E',false,'12x + 18');
  } else if(step===1){
    s += clText(40,y,22,'var(--accent-orange)',true,'6') + clText(60,y,22,'#1C1B2E',false,' &times; 2x + ')
       + clText(210,y,22,'var(--accent-orange)',true,'6') + clText(230,y,22,'#1C1B2E',false,' &times; 3');
  } else if(step===2){
    s += clText(40,y,22,'var(--accent-orange)',true,'6') + clText(60,y,22,'#1C1B2E',false,' &times; (2x + 3)');
  } else {
    s += clText(40,y,22,'var(--accent-orange)',true,'6') + clText(60,y,22,'#1C1B2E',false,'(2x + 3)');
  }
  s += `</svg>`;
  return s;
}
function clMFactUpdate(step){
  document.getElementById('clMFactWrap').innerHTML = clMFactRender(step);
  document.querySelectorAll('#clMFactSteps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('clMFactNext').textContent = step>=3 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('clMFactNext').disabled = step>=3;
}
function clMFactNext(){ if(clMFactStep<3){ clMFactStep++; clMFactUpdate(clMFactStep); } }
function clMFactReset(){ clMFactStep=0; clMFactUpdate(0); }
const CL_MFACT_STEPS = [
  {note:"On part de l'expression à factoriser : 12x + 18."},
  {note:"On repère un même facteur, 6, caché dans chacun des deux termes : 12x = 6 × 2x et 18 = 6 × 3."},
  {note:"On met ce facteur commun en évidence, devant une parenthèse."},
  {note:"On simplifie l'écriture en supprimant le signe ×."},
];

document.getElementById('methode-demo-calcul-litteral-5e').innerHTML = `
<p class="example-title" style="margin-top:0;">Développer, avec les flèches de distribution</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le développement.</p>
  <div id="clMDevWrap"></div>
  <div class="step-list" id="clMDevSteps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On part de l'expression à développer : 6(x − 4).</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>6 multiplie le premier terme : 6 × x.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>6 multiplie aussi le second terme, avec son signe : − 6 × 4.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On calcule chaque produit : 6x − 24.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="clMDevNext" onclick="clMDevNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="clMDevReset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Factoriser, en repérant le facteur commun</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la factorisation.</p>
  <div id="clMFactWrap"></div>
  <div class="step-list" id="clMFactSteps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On part de l'expression à factoriser : 12x + 18.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On repère un même facteur, 6, caché dans chacun des deux termes.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On met ce facteur commun en évidence, devant une parenthèse.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On simplifie l'écriture en supprimant le signe ×.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="clMFactNext" onclick="clMFactNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="clMFactReset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-calcul-litteral-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Tester une égalité »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : soit l'égalité <span class="tex">3x + 7 = 4x - 2</span>. Teste cette égalité pour <span class="tex">x = 9</span>.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Pour x = 9, le membre de gauche est égal à <span class="tex">3 \\times 9 + 7 = 34</span> et le membre de droite est égal à <span class="tex">4 \\times 9 - 2 = 34</span>.</span><span class="we-comment">Ce que je sais : je calcule chaque membre.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si les deux membres d'une égalité sont égaux pour une valeur donnée, alors l'égalité est vraie pour cette valeur.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> cette égalité est vraie pour x = 9.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Écris sous forme littérale simplifiée : le triple d'un nombre <span class="tex">y</span> augmenté de 4.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Soit <span class="tex">M = 5x^2 - 3</span>. Calcule M pour <span class="tex">x = 4</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Teste l'égalité <span class="tex">6x - 5 = 2x + 11</span> pour <span class="tex">x = 4</span>, puis pour <span class="tex">x = 6</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Développe : <span class="tex">N = 6(x - 4)</span> et <span class="tex">P = 1,5(z + 8)</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Factorise : <span class="tex">Q = 9x + 3x</span> et <span class="tex">R = 4,2y - y</span>.
  </div>
</div>
`;

DEMO_REGISTRY['Calcul littéral'] = {
  cours:'cours-demo-calcul-litteral-5e', methode:'methode-demo-calcul-litteral-5e', exos:'exos-demo-calcul-litteral-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-calcul-litteral-5e'));
    renderStaticMath(document.getElementById('exos-demo-calcul-litteral-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-calcul-litteral-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-calcul-litteral-5e'));
    clCDDemo.reset(); clEqDemo.reset(); clDevDemo.reset(); clFactDemo.reset();
    clMDevReset(); clMFactReset();
    registerGeoStepDemo('clMDevSvg', { steps:()=>CL_MDEV_STEPS, getIdx:()=>clMDevStep, goto:(i)=>{ clMDevStep=i; clMDevUpdate(i); } });
    registerGeoStepDemo('clMFactSvg', { steps:()=>CL_MFACT_STEPS, getIdx:()=>clMFactStep, goto:(i)=>{ clMFactStep=i; clMFactUpdate(i); } });
  }
};

DEMO_QUIZZES['Calcul littéral'] = [
  {q:"Que désignent les lettres dans une expression littérale ?",
   opts:["Des nombres","Des unités","Rien de précis"], correct:0},
  {q:"Que vaut 2x² pour x = 3 ?",
   opts:["36","18","12"], correct:1},
  {q:"Développer une expression, c'est l'écrire sous la forme...",
   opts:["D'un produit","D'une somme algébrique","D'une fraction"], correct:1},
  {q:"Factoriser 6x + 3x donne...",
   opts:["9x","6x + 3x","18x"], correct:0},
];

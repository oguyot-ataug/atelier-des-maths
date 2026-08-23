/* ============================================================
   CHAPITRE : Fractions : comparaison et addition (6e, N5)
   Ne traite volontairement PAS la multiplication (chapitre séparé,
   à venir). Cours complet (comparaison + addition/soustraction),
   méthode/exercices/histoire en placeholder pour une prochaine session.
   ============================================================ */

document.getElementById('cours-demo-fractions-comp-add').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Comparaison de deux fractions</h3></div>

<p class="example-title" style="margin-top:0;">A. Fractions de même dénominateur</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Deux fractions de <b>même dénominateur</b> sont rangées dans le même ordre que leur numérateur.</div>
<p class="example-title">Exemple :</p>
<p>Ordonne les fractions suivantes : <span class="tex">\\dfrac{5}{7}</span>, <span class="tex">\\dfrac{9}{7}</span>, <span class="tex">\\dfrac{8}{7}</span>, <span class="tex">\\dfrac{4}{7}</span> dans l'<b>ordre croissant</b>.</p>
<ul class="example-list">
  <li>Ces fractions ont toutes pour dénominateur 7, elles sont donc rangées dans l'ordre croissant de leur numérateur.</li>
  <li>Comme <span class="tex">4 < 5 < 8 < 9</span>, on en déduit <span class="tex">\\dfrac{4}{7} < \\dfrac{5}{7} < \\dfrac{8}{7} < \\dfrac{9}{7}</span>.</li>
</ul>

<p class="example-title">B. Fractions de dénominateurs différents</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour comparer deux fractions de <b>dénominateurs multiples l'un de l'autre</b>, on les réduit au même dénominateur (le plus grand des 2) puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemple 1 :</p>
<p>Compare les fractions <span class="tex">\\dfrac{7}{4}</span> et <span class="tex">\\dfrac{31}{20}</span>.</p>
<ul class="example-list">
  <li>On réduit les deux fractions au même dénominateur. Comme 20 est un multiple de 4, le plus petit dénominateur commun est 20.</li>
  <li><span class="tex">\\dfrac{7}{4} = \\dfrac{7 \\times 5}{4 \\times 5} = \\dfrac{35}{20}</span> et <span class="tex">\\dfrac{31}{20}</span>.</li>
  <li>Or, <span class="tex">35 > 31</span> donc <span class="tex">\\dfrac{35}{20} > \\dfrac{31}{20}</span> donc <span class="tex">\\dfrac{7}{4} > \\dfrac{31}{20}</span>.</li>
</ul>

<span class="prop-badge">Règle</span>
<div class="def-box">Pour comparer deux fractions de <b>dénominateurs quelconques</b>, on les réduit au même dénominateur puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemple 2 :</p>
<p>Compare les fractions <span class="tex">\\dfrac{1}{3}</span> et <span class="tex">\\dfrac{4}{7}</span>.</p>
<ul class="example-list">
  <li>On réduit les deux fractions au même dénominateur. Comme 3 et 7 n'ont pas de diviseur commun, le plus petit dénominateur commun est <span class="tex">3 \\times 7 = 21</span>.</li>
  <li><span class="tex">\\dfrac{1}{3} = \\dfrac{1 \\times 7}{3 \\times 7} = \\dfrac{7}{21}</span> et <span class="tex">\\dfrac{4}{7} = \\dfrac{4 \\times 3}{7 \\times 3} = \\dfrac{12}{21}</span>.</li>
  <li>Or, <span class="tex">7 < 12</span> donc <span class="tex">\\dfrac{7}{21} < \\dfrac{12}{21}</span> donc <span class="tex">\\dfrac{1}{3} < \\dfrac{4}{7}</span>.</li>
</ul>

<p class="example-title">Exemple 3 :</p>
<p>Compare les fractions <span class="tex">\\dfrac{5}{6}</span> et <span class="tex">\\dfrac{7}{9}</span>.</p>
<ul class="example-list">
  <li>On réduit les deux fractions au même dénominateur. Comme 6 et 9 ont un diviseur commun (3), on écrit leurs multiples :
    <ul style="margin:6px 0 0 20px;">
      <li>pour 6 : 6 - 12 - 18 - 24 - …</li>
      <li>pour 9 : 9 - 18 - 27 - 36 - …</li>
    </ul>
  </li>
  <li>Le plus petit commun multiple de 6 et 9 est <b>18</b> : <span class="tex">18 = 6 \\times 3</span> et <span class="tex">18 = 9 \\times 2</span>.</li>
  <li><span class="tex">\\dfrac{5}{6} = \\dfrac{5 \\times 3}{6 \\times 3} = \\dfrac{15}{18}</span> et <span class="tex">\\dfrac{7}{9} = \\dfrac{7 \\times 2}{9 \\times 2} = \\dfrac{14}{18}</span>.</li>
  <li>Or, <span class="tex">15 > 14</span> donc <span class="tex">\\dfrac{5}{6} > \\dfrac{7}{9}</span>.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Addition et soustraction de fractions</h3></div>

<p class="example-title" style="margin-top:0;">A. Fractions de même dénominateur</p>
<span class="prop-badge">Règle</span>
<div class="def-box">
  <p style="margin:0 0 8px;">Pour additionner (ou soustraire) deux fractions de <b>même dénominateur</b>, il suffit d'additionner (ou de soustraire) les numérateurs, et de garder le dénominateur commun.</p>
  <p style="margin:0;">Pour tous nombres <span class="tex">a</span>, <span class="tex">b</span> et <span class="tex">c</span> où <span class="tex">c</span> est non nul : <span class="tex">\\dfrac{a}{c} + \\dfrac{b}{c} = \\dfrac{a+b}{c}</span> et <span class="tex">\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a-b}{c}</span>.</p>
</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li><span class="tex">A = \\dfrac{7}{5} + \\dfrac{6}{5} = \\dfrac{7+6}{5} = \\dfrac{13}{5}</span></li>
  <li><span class="tex">B = \\dfrac{19}{8} - \\dfrac{5}{8} = \\dfrac{19-5}{8} = \\dfrac{14}{8}</span></li>
</ul>

<p class="example-title">B. Fractions de dénominateurs différents</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>dénominateurs multiples l'un de l'autre</b>, on commence par les réduire au même dénominateur (le plus grand des 2) puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemples 1 :</p>
<ul class="example-list">
  <li><span class="tex">C = \\dfrac{7}{3} + \\dfrac{6}{12} = \\dfrac{7 \\times 4}{3 \\times 4} + \\dfrac{6}{12} = \\dfrac{28}{12} + \\dfrac{6}{12} = \\dfrac{34}{12}</span></li>
  <li><span class="tex">D = \\dfrac{7}{3} - \\dfrac{6}{12} = \\dfrac{7 \\times 4}{3 \\times 4} - \\dfrac{6}{12} = \\dfrac{28}{12} - \\dfrac{6}{12} = \\dfrac{22}{12}</span></li>
</ul>

<span class="prop-badge">Règle</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>dénominateurs quelconques</b>, on les réduit au même dénominateur puis on applique la règle du paragraphe précédent.</div>
<p class="example-title">Exemples 2 :</p>
<ul class="example-list">
  <li><span class="tex">E = \\dfrac{2}{3} + \\dfrac{8}{7} = \\dfrac{2 \\times 7}{3 \\times 7} + \\dfrac{8 \\times 3}{7 \\times 3} = \\dfrac{14}{21} + \\dfrac{24}{21} = \\dfrac{38}{21}</span><br>
  <span class="hint">Le plus petit dénominateur commun de 3 et 7 est <span class="tex">3 \\times 7 = 21</span>.</span></li>
  <li style="margin-top:10px;"><span class="tex">F = \\dfrac{10}{9} - \\dfrac{5}{6} = \\dfrac{10 \\times 2}{9 \\times 2} - \\dfrac{5 \\times 3}{6 \\times 3} = \\dfrac{20}{18} - \\dfrac{15}{18} = \\dfrac{5}{18}</span><br>
  <span class="hint">Le plus petit dénominateur commun de 9 et 6 est 18.</span></li>
</ul>
`;

document.getElementById('methode-demo-fractions-comp-add').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : comparer deux fractions de dénominateurs différents</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="fcaCompareDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fcaCompareDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fcaCompareDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header" style="margin-top:28px;"><span class="letter">M</span><h4>Méthode : additionner deux fractions de dénominateurs différents</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="fcaAddDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fcaAddDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fcaAddDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header" style="margin-top:28px;"><span class="letter">M</span><h4>Méthode : soustraire deux fractions de dénominateurs différents</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="fcaSubDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fcaSubDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fcaSubDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;margin-top:20px;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-fractions-comp-add').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Compare deux fractions de dénominateurs différents »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{5}{6} = \\dfrac{5 \\times 2}{6 \\times 2} = \\dfrac{10}{12}</span> et <span class="tex">\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}</span>.</span><span class="we-comment">On réduit au même dénominateur.</span></div>
    <div class="we-row"><span class="we-expr">Or, 10 &gt; 9.</span><span class="we-comment">On compare les numérateurs.</span></div>
    <div class="we-row"><span class="we-expr">Donc <span class="tex">\\dfrac{10}{12} > \\dfrac{9}{12}</span>, donc <span class="tex">\\dfrac{5}{6} > \\dfrac{3}{4}</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
  <h3 style="margin-top:18px;">Rédaction type : « Additionne (ou soustrais) deux fractions de dénominateurs différents »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{7}{6} = \\dfrac{7 \\times 4}{6 \\times 4} = \\dfrac{28}{24}</span> et <span class="tex">\\dfrac{5}{8} = \\dfrac{5 \\times 3}{8 \\times 3} = \\dfrac{15}{24}</span>.</span><span class="we-comment">On réduit au même dénominateur.</span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{7}{6} + \\dfrac{5}{8} = \\dfrac{28}{24} + \\dfrac{15}{24} = \\dfrac{43}{24}</span></span><span class="we-comment">On additionne les numérateurs, en gardant le dénominateur commun.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Ordonne dans l'ordre croissant les fractions <span class="tex">\\dfrac{11}{9}</span>, <span class="tex">\\dfrac{4}{9}</span>, <span class="tex">\\dfrac{7}{9}</span> et <span class="tex">\\dfrac{2}{9}</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Compare les fractions <span class="tex">\\dfrac{5}{3}</span> et <span class="tex">\\dfrac{13}{9}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Compare les fractions <span class="tex">\\dfrac{2}{5}</span> et <span class="tex">\\dfrac{5}{8}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Calcule <span class="tex">G = \\dfrac{5}{4} + \\dfrac{3}{8}</span> et <span class="tex">H = \\dfrac{11}{6} - \\dfrac{2}{3}</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Calcule <span class="tex">K = \\dfrac{3}{4} + \\dfrac{2}{5}</span> et <span class="tex">L = \\dfrac{7}{6} - \\dfrac{3}{10}</span>. Rédige tes réponses.
  </div>
</div>
`;

document.getElementById('histoire-demo-fractions-comp-add').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les fractions figurent parmi les plus anciennes notions mathématiques connues : on en retrouve déjà des traces sur des papyrus égyptiens vieux de presque 4000 ans, comme le papyrus de Rhind. Les Égyptiens n'utilisaient cependant que des <b>fractions unitaires</b>, c'est-à-dire de numérateur 1 (comme <span class="tex">\\dfrac{1}{3}</span> ou <span class="tex">\\dfrac{1}{7}</span>) : pour écrire une fraction comme <span class="tex">\\dfrac{3}{4}</span>, ils devaient la décomposer en une somme de fractions unitaires distinctes, par exemple <span class="tex">\\dfrac{1}{2} + \\dfrac{1}{4}</span>. Les Babyloniens, de leur côté, utilisaient un système en base 60 particulièrement adapté aux calculs de fractions, dont on garde aujourd'hui la trace dans le découpage de l'heure en 60 minutes. La barre de fraction telle qu'on la connaît, séparant nettement numérateur et dénominateur, est attribuée au mathématicien arabe Al-Hassar au XIIe siècle ; c'est le mathématicien italien Fibonacci qui la fait connaître en Europe au siècle suivant, dans son <i>Liber Abaci</i>.
</div>
`;

/* ================= Méthode animée : 3 démonstrations pas-à-pas (comparaison, addition, soustraction) ================= */
const FCA_COMPARE_STEPS = [
  {expr:'<span class="tex">\\dfrac{5}{6}</span> et <span class="tex">\\dfrac{3}{4}</span>', note:"On souhaite comparer ces deux fractions de dénominateurs différents (6 et 4)."},
  {expr:'On cherche le plus petit dénominateur commun : 12', note:"6 et 4 ne sont pas multiples l'un de l'autre, mais leur plus petit commun multiple est 12 (6 × 2 = 12 et 4 × 3 = 12)."},
  {expr:'<span class="tex">\\dfrac{5}{6} = \\dfrac{5 \\times 2}{6 \\times 2} = \\dfrac{10}{12}</span> et <span class="tex">\\dfrac{3}{4} = \\dfrac{3 \\times 3}{4 \\times 3} = \\dfrac{9}{12}</span>', note:"On réduit chaque fraction au dénominateur commun 12."},
  {expr:'Or, 10 &gt; 9', note:"On compare les numérateurs."},
  {expr:'Donc <span class="tex">\\dfrac{10}{12} > \\dfrac{9}{12}</span>, donc <span class="tex">\\dfrac{5}{6} > \\dfrac{3}{4}</span>', note:"Conclusion."},
];
const fcaCompareDemo = makeStepDemo(FCA_COMPARE_STEPS, 'fcaCompareDisplay');

const FCA_ADD_STEPS = [
  {expr:'<span class="tex">B = \\dfrac{7}{6} + \\dfrac{5}{8}</span>', note:"On souhaite additionner ces deux fractions de dénominateurs différents (6 et 8)."},
  {expr:'<span class="tex">B = \\dfrac{7 \\times 4}{6 \\times 4} + \\dfrac{5 \\times 3}{8 \\times 3}</span>', note:"6 et 8 ne sont pas multiples l'un de l'autre ; leur plus petit commun multiple est 24 (6 × 4 = 24 et 8 × 3 = 24). On réduit chaque fraction à ce dénominateur commun."},
  {expr:'<span class="tex">B = \\dfrac{28}{24} + \\dfrac{15}{24}</span>', note:"On effectue les produits."},
  {expr:'<span class="tex">B = \\dfrac{43}{24}</span>', note:"On additionne les numérateurs, en gardant le dénominateur commun."},
];
const fcaAddDemo = makeStepDemo(FCA_ADD_STEPS, 'fcaAddDisplay');

const FCA_SUB_STEPS = [
  {expr:'<span class="tex">A = \\dfrac{9}{4} - \\dfrac{7}{10}</span>', note:"On souhaite soustraire ces deux fractions de dénominateurs différents (4 et 10)."},
  {expr:'<span class="tex">A = \\dfrac{9 \\times 5}{4 \\times 5} - \\dfrac{7 \\times 2}{10 \\times 2}</span>', note:"4 et 10 ne sont pas multiples l'un de l'autre ; leur plus petit commun multiple est 20 (4 × 5 = 20 et 10 × 2 = 20). On réduit chaque fraction à ce dénominateur commun."},
  {expr:'<span class="tex">A = \\dfrac{45}{20} - \\dfrac{14}{20}</span>', note:"On effectue les produits."},
  {expr:'<span class="tex">A = \\dfrac{31}{20}</span>', note:"On soustrait les numérateurs, en gardant le dénominateur commun."},
];
const fcaSubDemo = makeStepDemo(FCA_SUB_STEPS, 'fcaSubDisplay');

DEMO_REGISTRY['6e|Fractions : comparaison et addition'] = {
  cours:'cours-demo-fractions-comp-add', methode:'methode-demo-fractions-comp-add', exos:'exos-demo-fractions-comp-add', histoire:'histoire-demo-fractions-comp-add',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-fractions-comp-add'));
    renderStaticMath(document.getElementById('methode-demo-fractions-comp-add'));
    renderStaticMath(document.getElementById('exos-demo-fractions-comp-add'));
    renderStaticMath(document.getElementById('histoire-demo-fractions-comp-add'));
    injectCourseAddButtons(document.getElementById('cours-demo-fractions-comp-add'));
    injectCourseAddButtons(document.getElementById('methode-demo-fractions-comp-add'));
    fcaCompareDemo.reset(); fcaAddDemo.reset(); fcaSubDemo.reset();
  }
};

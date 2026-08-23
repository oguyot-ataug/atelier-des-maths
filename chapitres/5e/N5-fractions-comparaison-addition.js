/* ============================================================
   CHAPITRE : Fractions : comparaison et addition (5e, N5)
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
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-fractions-comp-add').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['5e|Fractions : comparaison et addition'] = {
  cours:'cours-demo-fractions-comp-add', methode:'methode-demo-fractions-comp-add', exos:'exos-demo-fractions-comp-add',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-fractions-comp-add'));
    renderStaticMath(document.getElementById('methode-demo-fractions-comp-add'));
    renderStaticMath(document.getElementById('exos-demo-fractions-comp-add'));
    injectCourseAddButtons(document.getElementById('cours-demo-fractions-comp-add'));
    injectCourseAddButtons(document.getElementById('methode-demo-fractions-comp-add'));
  }
};

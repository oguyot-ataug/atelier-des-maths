/* ============================================================
   CHAPITRE : Nombres entiers (6e, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-nombres-entiers').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les grands nombres</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Un <b>chiffre</b> est l'un des dix symboles 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, utilisés pour écrire les nombres.</li>
    <li>Un <b>nombre</b> s'écrit à l'aide d'un ou plusieurs chiffres, assemblés dans un certain ordre.</li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  À retenir : les chiffres sont l'<b>alphabet</b> des nombres — de même que des lettres s'assemblent pour former des mots, des chiffres s'assemblent pour former des nombres.
</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour pouvoir lire facilement un grand nombre entier, on regroupe ses chiffres par <b>tranches de trois</b>, en partant de la droite.</div>
<p class="example-title">Exemple : 2384907156 s'écrit 2 384 907 156.</p>
<ul class="example-list">
  <li>Écris ce nombre en toutes lettres.</li>
  <li>Décompose ce nombre.</li>
  <li>Donne le nom de chaque chiffre.</li>
  <li>Quel est le nombre de millions de ce nombre ?</li>
</ul>
<p class="hint" style="margin:10px 0 6px;">On peut s'aider d'un tableau de classes :</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.85rem;margin:0 0 16px;">
  <tr>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des milliards</th>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des millions</th>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des mille</th>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des unités</th>
  </tr>
  <tr>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">2</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">3</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">8</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">4</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">9</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">0</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">7</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">1</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">5</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">6</td>
  </tr>
</table>
</div>
<ul class="example-list">
  <li>Ce nombre s'écrit : deux-milliards-trois-cent-quatre-vingt-quatre-millions-neuf-cent-sept-mille-cent-cinquante-six.</li>
  <li>Il se décompose ainsi :<br>
    2 384 907 156 = (2 × 1 000 000 000) + (3 × 100 000 000) + (8 × 10 000 000) + (4 × 1 000 000)<br>
    + (9 × 100 000) + (7 × 1 000) + (1 × 100) + (5 × 10) + (6 × 1)
  </li>
  <li>
    2 est le chiffre des unités de milliards &nbsp;·&nbsp; 3 est le chiffre des centaines de millions &nbsp;·&nbsp; 8 est le chiffre des dizaines de millions<br>
    4 est le chiffre des unités de millions &nbsp;·&nbsp; 9 est le chiffre des centaines de mille &nbsp;·&nbsp; 0 est le chiffre des dizaines de mille<br>
    7 est le chiffre des unités de mille &nbsp;·&nbsp; 1 est le chiffre des centaines &nbsp;·&nbsp; 5 est le chiffre des dizaines &nbsp;·&nbsp; 6 est le chiffre des unités
  </li>
  <li>Le nombre de millions est <b>2 384</b>. À ne pas confondre avec le chiffre des millions, qui est 4.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Addition, soustraction, multiplication</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Les nombres que l'on additionne s'appellent les <b>termes</b>. Le résultat d'une addition s'appelle la <b>somme</b>.</div>
<span class="def-badge">Définitions</span>
<div class="def-box">Les nombres que l'on soustrait s'appellent les <b>termes</b>. Le résultat d'une soustraction s'appelle la <b>différence</b>.</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : on ne peut pas changer les termes de place dans une soustraction.</div>
<span class="def-badge">Définitions</span>
<div class="def-box">Les nombres que l'on multiplie s'appellent les <b>facteurs</b>. Le résultat d'une multiplication s'appelle le <b>produit</b>.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Dans une addition, on a le droit de <b>regrouper</b> ou de <b>changer</b> des termes de place.</li>
    <li>Dans une multiplication, on a le droit de <b>regrouper</b> ou de <b>changer</b> des facteurs de place.</li>
  </ul>
</div>
<p class="example-title">Exemples :</p>
<div class="redaction-template" style="margin-bottom:12px;">
  <div class="we-row"><span class="we-expr">A = <span class="grp-a">28</span> + <span class="grp-b">45</span> + <span class="grp-a">72</span> + <span class="grp-b">15</span></span><span class="we-comment">On repère les termes que l'on veut regrouper.</span></div>
  <div class="we-row"><span class="we-expr">A = (<span class="grp-a">28 + 72</span>) + (<span class="grp-b">45 + 15</span>)</span><span class="we-comment">On les regroupe entre parenthèses.</span></div>
  <div class="we-row"><span class="we-expr">A = 100 + 60</span><span class="we-comment">Chaque parenthèse tombe juste.</span></div>
  <div class="we-row"><span class="we-expr">A = 160</span><span class="we-comment">Résultat final.</span></div>
</div>
<div class="redaction-template">
  <div class="we-row"><span class="we-expr">B = <span class="grp-a">8</span> × <span class="grp-a">125</span> × 4</span><span class="we-comment">On repère les facteurs que l'on veut regrouper.</span></div>
  <div class="we-row"><span class="we-expr">B = (<span class="grp-a">8 × 125</span>) × 4</span><span class="we-comment">On les regroupe entre parenthèses.</span></div>
  <div class="we-row"><span class="we-expr">B = 1 000 × 4</span><span class="we-comment">Le produit entre parenthèses tombe juste.</span></div>
  <div class="we-row"><span class="we-expr">B = 4 000</span><span class="we-comment">Résultat final.</span></div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Division euclidienne</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Dans une division euclidienne, on a toujours : <b>dividende = (diviseur × quotient) + reste</b>, avec <b>reste &lt; diviseur</b>.</div>
<div class="figure-wrap">
  <strong style="font-family:'Space Grotesk',sans-serif;">Exemple posé : la division de 823 par 14</strong>
  <p class="hint interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la division posée.</p>
  <div style="display:flex;justify-content:center;align-items:flex-start;gap:0;font-family:'JetBrains Mono',monospace;font-size:1.25rem;padding:20px 10px;background:var(--white);border-radius:8px;border:1px solid rgba(28,43,57,.1);">
    <div style="text-align:right;padding-right:16px;">
      <div class="dp-tag" style="color:var(--accent);">dividende</div>
      <div id="ne-dpLeft" style="text-align:right;line-height:2;min-width:70px;"></div>
      <div class="dp-tag" id="ne-dpResteTag" style="color:#9E1F5E;min-height:1.1em;"></div>
    </div>
    <div style="border-left:2px solid #1C1B2E;padding-left:16px;">
      <div class="dp-tag" style="color:var(--accent-orange);">diviseur</div>
      <div style="line-height:2;"><span style="display:inline-block;border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;">14</span></div>
      <div style="display:flex;align-items:baseline;gap:8px;line-height:2;margin-top:6px;">
        <div id="ne-dpQuotient" style="font-weight:700;"></div>
        <span class="dp-tag" style="color:#1F6B3A;white-space:nowrap;">← quotient</span>
      </div>
    </div>
  </div>
  <div class="step-note" id="ne-dpNote" style="text-align:center;margin-top:10px;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="neDivisionPoseeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="neDivisionPoseeReset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : à la fin, on retrouve l'égalité <b>823 = (14 × 58) + 11</b>, avec 11 &lt; 14.
</div>
`;

document.getElementById('methode-demo-nombres-entiers').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Ne pas confondre « chiffre des... » et « nombre de... »</h4></div>
<div class="figure-wrap">
  <p class="hint" style="margin-top:6px;">Sur le nombre 2 384 907 156 déjà étudié en cours — cliquez sur "Étape suivante".</p>
  <div class="step-display" id="ne-chiffreNombreDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="neChiffreNombreDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="neChiffreNombreDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-nombres-entiers').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Décomposer un grand nombre »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">1 205 067</span><span class="we-comment">On repère les tranches de trois chiffres en partant de la droite.</span></div>
    <div class="we-row"><span class="we-expr">= (1×1 000 000) + (2×100 000) + (0×10 000) + (5×1 000) + (0×100) + (6×10) + (7×1)</span><span class="we-comment">On décompose selon la valeur de chaque chiffre.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Écris en toutes lettres le nombre 3 052 189, puis décompose-le.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Pose la division euclidienne de 946 par 15, puis vérifie ton résultat avec l'égalité dividende = (diviseur × quotient) + reste.
  </div>
</div>
`;

/* ---- Division euclidienne posée : 823 ÷ 14 ---- */
const NE_DP_ROW_823 = '&nbsp;&nbsp;823';
const NE_DP_ROW_70  = '−&nbsp;70&nbsp;';
const NE_DP_ROW_123 = '&nbsp;&nbsp;123';
const NE_DP_ROW_112 = '−&nbsp;112';
const NE_DP_ROW_11  = '&nbsp;&nbsp;&nbsp;11';
const NE_DP_DOT = '<span style="color:var(--accent-orange);font-size:1.4em;">.</span>';
const NE_DIVISION_POSEE_STEPS = [
  {rows:[{t:NE_DP_ROW_823}], quotient:'', note:"On prend d'abord le nombre formé par le chiffre des centaines : 8. Comme 8 < 14, ce nombre ne contient pas 14 : il faut prendre un chiffre de plus."},
  {rows:[{t:NE_DP_ROW_823}], quotient:'', note:"On prend alors le nombre de dizaines : 82. Cette fois, 82 contient 14 (82 ≥ 14) : le quotient aura donc un chiffre des dizaines."},
  {rows:[{t:NE_DP_ROW_823},{t:NE_DP_ROW_70,sub:true}], quotient:'5'+NE_DP_DOT, note:'14 × 5 = 70, le plus proche de 82 sans le dépasser : on retranche. Le point à côté du 5 rappelle que ce 5 est le chiffre des dizaines du quotient (il représente 50, pas 5).'},
  {rows:[{t:NE_DP_ROW_823},{t:NE_DP_ROW_70,sub:true},{t:NE_DP_ROW_123}], quotient:'5'+NE_DP_DOT, note:"82 − 70 = 12. On abaisse le chiffre des unités (3) : on obtient 123, un nombre d'unités cette fois."},
  {rows:[{t:NE_DP_ROW_823},{t:NE_DP_ROW_70,sub:true},{t:NE_DP_ROW_123},{t:NE_DP_ROW_112,sub:true}], quotient:'58', note:'14 × 8 = 112, le plus proche de 123 sans le dépasser : on retranche. Ce 8 est le chiffre des unités du quotient : il vient remplacer le point, à la même place.'},
  {rows:[{t:NE_DP_ROW_823},{t:NE_DP_ROW_70,sub:true},{t:NE_DP_ROW_123},{t:NE_DP_ROW_112,sub:true},{t:NE_DP_ROW_11}], quotient:'58', note:'123 − 112 = 11. Le reste est 11, inférieur à 14 : la division est terminée.'},
];
let neDivisionPoseeIdx = 0;
function neRenderDivisionPosee(){
  const s = NE_DIVISION_POSEE_STEPS[neDivisionPoseeIdx];
  document.getElementById('ne-dpLeft').innerHTML = s.rows.map(r=>
    r.sub ? `<div><span class="dp-sub-inner">${r.t}</span></div>` : `<div>${r.t}</div>`
  ).join('');
  document.getElementById('ne-dpQuotient').innerHTML = s.quotient;
  document.getElementById('ne-dpNote').textContent = s.note;
  const isLastStep = neDivisionPoseeIdx === NE_DIVISION_POSEE_STEPS.length-1;
  document.getElementById('ne-dpResteTag').textContent = isLastStep ? '↑ reste' : '';
}
function neDivisionPoseeNext(){ if(neDivisionPoseeIdx<NE_DIVISION_POSEE_STEPS.length-1) neDivisionPoseeIdx++; neRenderDivisionPosee(); }
function neDivisionPoseeReset(){ neDivisionPoseeIdx=0; neRenderDivisionPosee(); }

/* ---- Méthode : chiffre des... vs nombre de... ---- */
const NE_CHIFFRE_NOMBRE_STEPS = [
  {expr:'2 384 907 156', note:'On reprend le nombre étudié en cours.'},
  {expr:'Chiffre des centaines de mille = 9', note:"C'est uniquement le symbole qui se trouve à cette position précise."},
  {expr:'Nombre de centaines de mille = 23 849', note:"C'est le nombre total de paquets complets de 100 000 que l'on peut former avec ce nombre entier — on lit alors tous les chiffres situés à gauche de cette position, elle comprise."},
  {expr:'23 849 × 100 000 = 2 384 900 000', note:'Vérification : 2 384 907 156 = 2 384 900 000 + 7 156. Il y a bien 23 849 centaines de mille complètes dans ce nombre.'},
];
const neChiffreNombreDemo = makeStepDemo(NE_CHIFFRE_NOMBRE_STEPS, 'ne-chiffreNombreDisplay');

DEMO_REGISTRY['Nombres entiers'] = { cours:'cours-demo-nombres-entiers', methode:'methode-demo-nombres-entiers', exos:'exos-demo-nombres-entiers',
  init:()=>{ neDivisionPoseeReset(); neChiffreNombreDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-nombres-entiers')); injectCourseAddButtons(document.getElementById('methode-demo-nombres-entiers')); } };

DEMO_QUIZZES['Nombres entiers'] = [
  {q:"Comment s'appelle le résultat d'une multiplication ?",
   opts:["La différence","Le produit","Le quotient"], correct:1},
  {q:"Dans la division euclidienne 823 = (14 × 58) + 11, comment s'appelle le nombre 11 ?",
   opts:["Le quotient","Le reste","Le diviseur"], correct:1},
  {q:"Dans le nombre 2 384 907 156, quel est le chiffre des centaines de mille ?",
   opts:["9","23 849","7"], correct:0},
];

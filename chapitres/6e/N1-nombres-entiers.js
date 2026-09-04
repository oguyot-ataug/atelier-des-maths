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
  À retenir : les chiffres sont l'<b>alphabet</b> des nombres (de même que des lettres s'assemblent pour former des mots, des chiffres s'assemblent pour former des nombres).
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
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">2</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">3</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">8</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">4</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">9</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">0</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">7</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">1</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">5</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;">6</td>
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
  <div style="display:flex;justify-content:center;align-items:stretch;gap:0;font-family:'JetBrains Mono',monospace;font-size:1.25rem;padding:20px 10px;background:var(--white);border-radius:8px;border:1px solid rgba(28,43,57,.1);">
    <div style="text-align:right;padding-right:16px;">
      <div class="dp-tag" style="color:var(--accent);">dividende</div>
      <div id="ne-dpLeft" style="text-align:right;line-height:2;min-width:70px;"></div>
      <div class="dp-tag" id="ne-dpResteTag" style="color:#9E1F5E;min-height:1.1em;"></div>
    </div>
    <div style="border-left:2px solid #1C1B2E;padding-left:16px;">
      <div class="dp-tag" style="color:var(--accent-orange);">diviseur</div>
      <div style="line-height:2;border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;margin-left:-16px;padding-left:16px;">14</div>
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

<div class="lesson-header"><span class="num">4</span><h3>Multiples et diviseurs d'un nombre entier</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Multiples et diviseurs d'un nombre entier</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Soient <i>a</i> et <i>b</i> deux nombres entiers.
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li><i>a</i> est un <b>multiple</b> de <i>b</i> si <i>a</i> est le produit de <i>b</i> par un nombre entier.</li>
    <li><i>b</i> est alors un <b>diviseur</b> de <i>a</i>.</li>
  </ul>
</div>
<p class="example-title">Exemple : soit l'égalité 1 904 = 56 × 34. Fais une phrase avec les mots « multiple » et « diviseur ».</p>
<ul class="example-list">
  <li>1 904 est un <b>multiple</b> de 56. (Et de 34 aussi !)</li>
  <li>56 est un <b>diviseur</b> de 1 904. On dit aussi « 1 904 est <b>divisible</b> par 56 » ou « 56 <b>divise</b> 1 904 ».</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Critères de divisibilité</h4></div>
<span class="prop-badge">Règles</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Un nombre entier est <b>divisible par 2</b> (pair) si son chiffre des unités est 0, 2, 4, 6 ou 8.</li>
    <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.</li>
    <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.</li>
  </ul>
</div>
<p class="example-title">Exemple 1 : on considère le nombre 47 236. Est-il divisible par 2 et par 5 ?</p>
<ul class="example-list">
  <li>Son chiffre des unités est 6 donc 47 236 est <b>divisible par 2</b>.</li>
  <li>Son chiffre des unités n'est ni 0 ni 5 donc 47 236 n'est <b>pas divisible par 5</b>.</li>
</ul>
<p class="example-title">Exemple 2 : on considère le nombre 15 480. Est-il divisible par 2, par 5 et par 10 ?</p>
<ul class="example-list">
  <li>Son chiffre des unités est 0 donc 15 480 est <b>divisible par 2</b>, <b>par 5</b> et <b>par 10</b> en même temps !</li>
</ul>
`;

document.getElementById('histoire-demo-nombres-entiers').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Compter est sans doute l'une des toutes premières activités mathématiques de l'humanité. L'os de Lebombo, découvert en Afrique australe et vieux d'environ 35 000 ans, porte 29 encoches gravées, probablement pour suivre le cycle de la Lune : c'est l'un des plus anciens objets connus liés au comptage. Beaucoup plus tard, vers 3400 av. J.-C., les Sumériens, en Mésopotamie, inventent l'une des premières écritures des nombres, en gravant des symboles dans des tablettes d'argile pour tenir les comptes de leurs récoltes et de leurs troupeaux.
</div>
`;

document.getElementById('methode-demo-nombres-entiers').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Ne pas confondre « chiffre des... » et « nombre de... »</h4></div>
<div class="figure-wrap">
  <p class="hint" style="margin-top:6px;">Sur le nombre 2 384 907 156 déjà étudié en cours, cliquez sur "Étape suivante".</p>
  <div class="step-display" id="ne-chiffreNombreDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="neChiffreNombreDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="neChiffreNombreDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>S'entraîner avec la monnaie imaginaire "€uclide"</h4></div>
<div class="figure-wrap">
  <p class="hint" style="margin-top:6px;">Il existe des billets de 1, 10, 100, 1 000, 10 000 €uclide, etc. Répondez sans utiliser de billets d'une valeur supérieure à celle demandée : c'est exactement la notion de "nombre de dizaines / centaines / milliers".</p>
  <p class="hint" id="ne-euclideCounter" style="font-weight:700;margin:10px 0 4px;"></p>
  <p id="ne-euclideQuestion" style="font-size:1.15rem;margin:0 0 14px;"></p>
  <div class="tool-row" style="margin-bottom:8px;">
    <input type="number" id="ne-euclideInput" placeholder="Nombre de billets" style="width:180px;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);">
    <button class="btn" onclick="neCheckEuclideAnswer()">Vérifier</button>
    <button class="btn secondary" onclick="neNextEuclideQuestion()">Question suivante →</button>
  </div>
  <p id="ne-euclideStatus"></p>
</div>
`;

document.getElementById('exos-demo-nombres-entiers').innerHTML = `
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
    <button type="button" class="exo-correction-toggle" data-target="ne-correction-1" onclick="toggleExoCorrection(this)"><span class="gicon">expand_more</span> <span class="exo-correction-label">Voir la correction</span></button>
    <div class="exo-correction" id="ne-correction-1">
      <p style="margin:0 0 8px;">3 052 189 s'écrit : <b>trois-millions-cinquante-deux-mille-cent-quatre-vingt-neuf</b>.</p>
      <p style="margin:0;">Il se décompose ainsi :<br>3 052 189 = (3×1 000 000) + (0×100 000) + (5×10 000) + (2×1 000) + (1×100) + (8×10) + (9×1)</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Dans le nombre 4 671 528, donne le chiffre des dizaines de mille, puis le nombre de dizaines de mille.
    <button type="button" class="exo-correction-toggle" data-target="ne-correction-2" onclick="toggleExoCorrection(this)"><span class="gicon">expand_more</span> <span class="exo-correction-label">Voir la correction</span></button>
    <div class="exo-correction" id="ne-correction-2">
      <p style="margin:0;">Le chiffre des dizaines de mille est <b>7</b>.<br>Le nombre de dizaines de mille est <b>467</b> (tous les chiffres à gauche de cette position, elle comprise : 4, 6 et 7).</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Dans le nombre 8 209 456, donne le chiffre des centaines de mille, puis le nombre de centaines de mille.
    <button type="button" class="exo-correction-toggle" data-target="ne-correction-3" onclick="toggleExoCorrection(this)"><span class="gicon">expand_more</span> <span class="exo-correction-label">Voir la correction</span></button>
    <div class="exo-correction" id="ne-correction-3">
      <p style="margin:0;">Le chiffre des centaines de mille est <b>2</b>.<br>Le nombre de centaines de mille est <b>82</b> (8 et 2, les chiffres à gauche de cette position, elle comprise).</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Attention au piège ! Dans le nombre 5 038 700, donne le chiffre des centaines de mille, puis le nombre de centaines de mille.
    <button type="button" class="exo-correction-toggle" data-target="ne-correction-4" onclick="toggleExoCorrection(this)"><span class="gicon">expand_more</span> <span class="exo-correction-label">Voir la correction</span></button>
    <div class="exo-correction" id="ne-correction-4">
      <p style="margin:0;">Le chiffre des centaines de mille est <b>0</b> : c'est bien un chiffre valide, ce n'est pas une erreur !<br>Le nombre de centaines de mille est <b>50</b> (5 et 0, les chiffres à gauche de cette position, elle comprise) -- il ne faut pas confondre avec le chiffre lui-même (0).</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Pose la division euclidienne de 946 par 15, puis vérifie ton résultat avec l'égalité dividende = (diviseur × quotient) + reste.
    <button type="button" class="exo-correction-toggle" data-target="ne-correction-5" onclick="toggleExoCorrection(this)"><span class="gicon">expand_more</span> <span class="exo-correction-label">Voir la correction</span></button>
    <div class="exo-correction" id="ne-correction-5">
      <p style="margin:0 0 8px;">946 = (15 × 63) + 1, avec 1 &lt; 15.</p>
      <p style="margin:0;">Vérification : 15 × 63 + 1 = 945 + 1 = <b>946</b>. ✓</p>
    </div>
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

/* ---- Méthode : chiffre des... vs nombre de... (représentation visuelle) ----
   Signalé : "elle n'est pas assez visuelle. Il faudrait mettre en couleur le chiffre concerné
   et surligner le nombre concerné." neDigitStrip affiche les 10 chiffres de 2 384 907 156,
   regroupés par classe (milliards | millions | mille | unités), avec 3 états possibles pour
   chaque chiffre : neutre (avant toute mise en évidence), le CHIFFRE concerné en orange plein,
   ou faisant partie du NOMBRE concerné (surligné en bleu, souligné) -- les chiffres à droite du
   nombre concerné (non inclus) restent grisés, pour bien montrer qu'on ne les prend pas en
   compte. highlightIdx est l'indice (0 = chiffre le plus à gauche, 9 = le plus à droite). */
const NE_DIGITS = ['2','3','8','4','9','0','7','1','5','6'];
const NE_DIGIT_GROUPS = [[0],[1,2,3],[4,5,6],[7,8,9]]; // milliards | millions | mille | unités
function neDigitStrip(highlightIdx){
  let html = '<div style="display:flex;gap:16px;justify-content:center;font-family:\'Space Grotesk\',sans-serif;font-size:1.9rem;font-weight:700;margin:14px 0;">';
  NE_DIGIT_GROUPS.forEach(group=>{
    html += '<div style="display:flex;">';
    group.forEach(i=>{
      let style = 'padding:4px 7px;border-radius:6px;transition:.2s;';
      if(highlightIdx==null){
        style += 'color:var(--ink);';
      } else if(i===highlightIdx){
        style += 'background:var(--accent-orange);color:#fff;';
      } else if(i<highlightIdx){
        style += 'background:rgba(12,91,160,.15);color:var(--accent);border-bottom:3px solid var(--accent);';
      } else {
        style += 'color:var(--ink-soft);opacity:.4;';
      }
      html += `<span style="${style}">${NE_DIGITS[i]}</span>`;
    });
    html += '</div>';
  });
  html += '</div>';
  return html;
}
const NE_CHIFFRE_NOMBRE_STEPS = [
  {expr:neDigitStrip(null), note:'On reprend le nombre étudié en cours : 2 384 907 156.'},
  {expr:neDigitStrip(4), note:"Le chiffre des centaines de mille est 9 (en orange) : c'est uniquement le symbole qui se trouve à cette position précise."},
  {expr:neDigitStrip(4)+'<div style="text-align:center;font-family:\'Space Grotesk\',sans-serif;font-size:1.3rem;font-weight:700;color:var(--accent);">= 23 849</div>', note:"Le nombre de centaines de mille est 23 849 (en bleu souligné) : ce sont TOUS les chiffres à gauche de cette position, elle comprise -- les chiffres grisés à droite ne comptent pas."},
  {expr:'23 849 × 100 000 = 2 384 900 000', note:'Vérification : 2 384 907 156 = 2 384 900 000 + 7 156. Il y a bien 23 849 centaines de mille complètes dans ce nombre.'},
];
const neChiffreNombreDemo = makeStepDemo(NE_CHIFFRE_NOMBRE_STEPS, 'ne-chiffreNombreDisplay');

/* ---- Exercice interactif : la monnaie "Euclide" (nombre de dizaines/centaines/milliers) ----
   Signalé : "quelque chose qui fonctionne bien... on imagine une monnaie, par exemple
   Euclide. On a des billets de 1, 10, 100 Euclide etc. Combien faut-il de billets de 10
   sachant que je n'ai plus de billets de 100 pour faire 347 ? Et plusieurs questions du même
   type." Chaque question demande le NOMBRE de billets d'une certaine valeur nécessaires,
   SANS utiliser de billets de valeur supérieure -- exactement le concept de "nombre de
   dizaines/centaines/milliers", rendu concret. Vérifié arithmétiquement (347÷10=34 etc.)
   avant intégration. */
const NE_EUCLIDE_QUESTIONS = [
  {nombre:347, denom:10, denomSup:100, reponse:34},
  {nombre:5289, denom:100, denomSup:1000, reponse:52},
  {nombre:1256, denom:10, denomSup:100, reponse:125},
  {nombre:47832, denom:1000, denomSup:10000, reponse:47},
  {nombre:903, denom:100, denomSup:1000, reponse:9},
];
let neEuclideIdx = 0;
function neFormatNombre(n){ return n.toLocaleString('fr-FR').replace(/\u202f/g,' '); }
function neRenderEuclideQuestion(){
  const q = NE_EUCLIDE_QUESTIONS[neEuclideIdx];
  document.getElementById('ne-euclideQuestion').innerHTML =
    `Combien faut-il de billets de <b>${neFormatNombre(q.denom)} €uclide</b>, sachant qu'il n'y a plus de billets de <b>${neFormatNombre(q.denomSup)} €uclide</b>, pour faire <b>${neFormatNombre(q.nombre)}</b> €uclide ?`;
  document.getElementById('ne-euclideInput').value = '';
  document.getElementById('ne-euclideStatus').innerHTML = '';
  document.getElementById('ne-euclideCounter').textContent = `Question ${neEuclideIdx+1} / ${NE_EUCLIDE_QUESTIONS.length}`;
}
function neCheckEuclideAnswer(){
  const q = NE_EUCLIDE_QUESTIONS[neEuclideIdx];
  const val = parseInt(document.getElementById('ne-euclideInput').value, 10);
  const statusEl = document.getElementById('ne-euclideStatus');
  if(isNaN(val)){ statusEl.innerHTML = '<span style="color:var(--ink-soft);">Entrez un nombre.</span>'; return; }
  if(val===q.reponse){
    statusEl.innerHTML = `<span style="color:#1F7A4D;font-weight:700;">✓ Bravo ! Il faut bien ${q.reponse} billets de ${neFormatNombre(q.denom)} : c'est le nombre de ${q.denom===10?'dizaines':(q.denom===100?'centaines':'milliers')} de ${neFormatNombre(q.nombre)}.</span>`;
  } else {
    statusEl.innerHTML = `<span style="color:#a83c1f;font-weight:700;">✗ Pas tout à fait. Réponse : ${q.reponse} billets (${q.reponse} × ${neFormatNombre(q.denom)} = ${neFormatNombre(q.reponse*q.denom)}, il resterait ${neFormatNombre(q.nombre-q.reponse*q.denom)} €uclide en petites pièces).</span>`;
  }
}
function neNextEuclideQuestion(){ neEuclideIdx = (neEuclideIdx+1) % NE_EUCLIDE_QUESTIONS.length; neRenderEuclideQuestion(); }
function neResetEuclideQuestions(){ neEuclideIdx = 0; neRenderEuclideQuestion(); }

DEMO_REGISTRY['6e|Nombres entiers'] = { cours:'cours-demo-nombres-entiers', methode:'methode-demo-nombres-entiers', exos:'exos-demo-nombres-entiers', histoire:'histoire-demo-nombres-entiers',
  init:()=>{ neDivisionPoseeReset(); neChiffreNombreDemo.reset(); neResetEuclideQuestions(); injectCourseAddButtons(document.getElementById('cours-demo-nombres-entiers')); injectCourseAddButtons(document.getElementById('methode-demo-nombres-entiers')); } };

DEMO_QUIZZES['6e|Nombres entiers'] = [
  {q:"Comment s'appelle le résultat d'une multiplication ?",
   opts:["La différence","Le produit","Le quotient"], correct:1},
  {q:"Dans la division euclidienne 823 = (14 × 58) + 11, comment s'appelle le nombre 11 ?",
   opts:["Le quotient","Le reste","Le diviseur"], correct:1},
  {q:"Dans le nombre 2 384 907 156, quel est le chiffre des centaines de mille ?",
   opts:["9","23 849","7"], correct:0},
];

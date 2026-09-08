/* ============================================================
   CHAPITRE : Nombres entiers (CM1, N1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Premier cours du niveau CM1 : lecture/écriture, décomposition, chiffre des/nombre de,
   comparaison et rangement des nombres entiers jusqu'à 999 999 (2 classes : milliers et
   unités -- la classe des millions arrive dans un chapitre ultérieur, cohérent avec le
   sommaire du programme).
   ============================================================ */
document.getElementById('cours-demo-cm1-nombres-entiers').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Lire et écrire un grand nombre</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.8;">
    <li>Un <b>chiffre</b> est l'un des dix symboles 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.</li>
    <li>Un <b>nombre</b> s'écrit avec un ou plusieurs chiffres, assemblés dans un certain ordre.</li>
  </ul>
</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour lire facilement un grand nombre, on le sépare en <b>tranches de trois chiffres</b>, en partant de la droite. Chaque tranche s'appelle une <b>classe</b>.</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Astuce : forme des paquets de 3 chiffres en partant de la <b>droite</b> du nombre -- le dernier paquet, tout à gauche, peut avoir moins de 3 chiffres.
</div>
<p class="example-title">Exemple : 724916 s'écrit 724 916.</p>
<p class="hint" style="margin:10px 0 6px;">On peut s'aider d'un tableau de numération :</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.85rem;margin:0 0 16px;">
  <tr>
    <th colspan="3" style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des mille</th>
    <th colspan="3" style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des unités</th>
  </tr>
  <tr>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(255,130,8,.08);">U</th>
  </tr>
  <tr>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">7</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">2</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">4</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">9</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">1</td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.2);font-weight:700;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">6</td>
  </tr>
</table>
</div>
<ul class="example-list">
  <li>Ce nombre se lit : <b>sept-cent-vingt-quatre-mille-neuf-cent-seize</b>.</li>
  <li>On l'écrit avec un petit espace entre chaque classe : 724 916 (jamais de point ni de virgule).</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Décomposer un nombre</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Décomposer un nombre, c'est l'écrire comme une <b>somme</b> qui montre la valeur de chaque chiffre selon sa position.</div>
<p class="example-title">Reprenons 724 916 :</p>
<ul class="example-list">
  <li>Décomposition par classes :<br>
    724 916 = <b>724</b> mille + <b>916</b> unités
  </li>
  <li>Décomposition complète (addition) :<br>
    724 916 = 700 000 + 20 000 + 4 000 + 900 + 10 + 6
  </li>
  <li>Décomposition multiplicative :<br>
    724 916 = (7 × 100 000) + (2 × 10 000) + (4 × 1 000) + (9 × 100) + (1 × 10) + (6 × 1)
  </li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>« Le chiffre des... » et « le nombre de... »</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  <b>Le chiffre des</b> unités (ou dizaines, centaines...) est le seul chiffre situé à cette position.<br>
  <b>Le nombre de</b> dizaines (ou centaines, mille...) compte combien de fois cette unité est contenue en entier dans le nombre -- on « efface » mentalement les chiffres à sa droite.
</div>
<p class="example-title">Toujours avec 724 916 :</p>
<ul class="example-list">
  <li>7 est le chiffre des centaines de mille &nbsp;·&nbsp; 2 est le chiffre des dizaines de mille &nbsp;·&nbsp; 4 est le chiffre des unités de mille</li>
  <li>9 est le chiffre des centaines &nbsp;·&nbsp; 1 est le chiffre des dizaines &nbsp;·&nbsp; 6 est le chiffre des unités</li>
  <li>Le <b>nombre de centaines</b> de 724 916 est <b>7 249</b> (on efface les 2 derniers chiffres, 1 et 6).</li>
  <li>Le <b>nombre de mille</b> de 724 916 est <b>724</b>.</li>
</ul>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Attention à ne pas confondre : le <b>chiffre</b> des mille de 724 916 est 4, alors que le <b>nombre</b> de mille est 724 !
</div>

<div class="lesson-header"><span class="num">4</span><h3>Comparer deux nombres</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour comparer deux nombres entiers, on compare d'abord leur <b>nombre de chiffres</b> : celui qui en a le plus est le plus grand.<br>
  S'ils ont le même nombre de chiffres, on compare les chiffres un par un, en partant de la <b>gauche</b>.
</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>52 480 < 137 026 &nbsp;<span class="hint" style="margin:0;">(52 480 a 5 chiffres, 137 026 en a 6 : il est donc plus grand)</span></li>
  <li>384 250 > 384 097 &nbsp;<span class="hint" style="margin:0;">(mêmes centaines de mille, dizaines de mille et unités de mille : 384 -- on compare ensuite 250 et 097, et 250 > 097)</span></li>
</ul>
<div class="def-box" style="margin-top:12px;">
  <b>a &lt; b</b> se lit « a est <b>plus petit que</b> b », ou « a est <b>inférieur à</b> b ».<br>
  <b>a &gt; b</b> se lit « a est <b>plus grand que</b> b », ou « a est <b>supérieur à</b> b ».
</div>

<div class="lesson-header"><span class="num">5</span><h3>Ranger des nombres</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Ranger des nombres dans l'<b>ordre croissant</b>, c'est les ranger du plus petit au plus grand.<br>
  Ranger des nombres dans l'<b>ordre décroissant</b>, c'est les ranger du plus grand au plus petit.
</div>
<p class="example-title">Range dans l'ordre croissant : 45 610 &nbsp;·&nbsp; 6 980 &nbsp;·&nbsp; 45 106 &nbsp;·&nbsp; 128 400</p>
<p style="margin:6px 0 0;font-family:'JetBrains Mono',monospace;">6 980 &lt; 45 106 &lt; 45 610 &lt; 128 400</p>
`;

document.getElementById('methode-demo-cm1-nombres-entiers').innerHTML = `
<div class="placeholder-box">
  <strong>Méthodes en construction</strong>
  Les méthodes animées de ce chapitre (pas à pas, comme pour les autres niveaux) arrivent dans une prochaine session.
</div>
`;

document.getElementById('exos-demo-cm1-nombres-entiers').innerHTML = `
<div class="placeholder-box">
  <strong>Exercices en construction</strong>
  Les exercices corrigés de ce chapitre arrivent dans une prochaine session.
</div>
`;

DEMO_REGISTRY['cm1|Nombres entiers'] = { cours:'cours-demo-cm1-nombres-entiers', methode:'methode-demo-cm1-nombres-entiers', exos:'exos-demo-cm1-nombres-entiers',
  init:()=>{} };

/* ============================================================
   CHAPITRE : Proportionnalité (6e, D3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   ATTENTION COLLISION DE TITRE : le chapitre "Proportionnalité" existe
   aussi en 5e (P1). DEMO_REGISTRY utilise donc la clé composite
   "6e|Proportionnalité" (et non le titre seul) -- voir le fix du
   19/08/2026 dans app.js (renderTheme/openChapitre) et dans tous les
   fichiers de chapitres existants. Ne JAMAIS revenir à
   DEMO_REGISTRY['Proportionnalité'] seul ici, sous peine de réactiver
   la collision avec le 5e.

   Contenu du §1 (Situations de proportionnalité) et de la structure
   du §2 (Échelle) adaptés d'un support papier fourni par Olivier ;
   seul l'exemple de l'échelle a été changé (plan de chambre à la
   place d'une carte régionale, jugé plus parlant pour des 6e), avec
   une explication explicite de la notation fractionnaire a/b d'une
   échelle (numérateur = mesure sur le plan, dénominateur = mesure
   réelle dans la même unité).
   ============================================================ */

document.getElementById('cours-demo-proportionnalite-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Situations de proportionnalité</h3></div>

<p class="example-title" style="margin-top:0;">A. Grandeurs proportionnelles</p>
<span class="def-badge">Définition</span>
<div class="def-box">On dit que deux grandeurs sont <b>proportionnelles</b> quand les valeurs prises par l'une s'obtiennent en multipliant celles prises par l'autre par un même nombre non nul, appelé <b>coefficient de proportionnalité</b>.</div>

<p class="example-title">Exemple : le côté et le périmètre d'un carré</p>
<p style="margin:4px 0 12px;">La longueur du côté et le périmètre d'un carré sont des grandeurs proportionnelles : le périmètre d'un carré s'obtient en multipliant la longueur de son côté par 4. Le coefficient de proportionnalité est donc 4.</p>

<p class="example-title">Contre-exemple : la chute d'un ballon</p>
<p style="margin:4px 0 12px;">Voici la distance parcourue par un ballon en chute libre. En 1 seconde, il parcourt 5 m, donc le coefficient serait 5. En 2 secondes, il parcourt 20 m, donc le coefficient serait 10. Ces deux coefficients sont différents : la durée de chute et la distance parcourue <b>ne sont donc pas proportionnelles</b>.</p>

<p class="example-title" style="margin-top:20px;">B. Tableau de proportionnalité</p>
<span class="prop-badge">Règle 1</span>
<div class="def-box">Dans un tableau de proportionnalité, les nombres de la seconde ligne s'obtiennent en multipliant les nombres correspondants de la première ligne par le <b>coefficient de proportionnalité</b>.</div>

<p class="example-title">Exemple : la consommation d'une voiture</p>
<p style="margin:4px 0 8px;">À la vitesse de 70 km/h, une voiture consomme 5 L aux 100 km. La consommation de carburant et la distance parcourue sont proportionnelles.</p>
<p style="margin:4px 0 8px;">À cette vitesse, quand la voiture parcourt une distance de 1 km, elle consomme 0,05 L (5 L : 100). On peut regrouper ces résultats dans un tableau de proportionnalité :</p>
<div style="overflow-x:auto;margin:10px 0 12px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Distance parcourue (en km)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">100</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">1</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">15</td>
    </tr>
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Consommation (en L)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">5</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">0,05</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">7</td>
    </tr>
  </table>
</div>
<p style="margin:4px 0 4px;">À cette vitesse, la consommation en litres de carburant est égale au produit du nombre de kilomètres parcourus par 0,05, qui est le <b>coefficient de proportionnalité</b>.</p>
<p style="margin:4px 0 12px;">Dans cette situation, ce coefficient permet de calculer la consommation à partir de la distance parcourue : par exemple, pour 15 km, la consommation sera <span class="tex">15 \\times 0{,}05 = 0{,}75</span> L.</p>

<span class="prop-badge">Règle 2</span>
<div class="def-box">On peut compléter un tableau de proportionnalité à l'aide des propriétés de la <b>linéarité</b> : additionner (ou soustraire) deux colonnes déjà connues donne une nouvelle colonne correcte, et multiplier une colonne connue par un nombre donne aussi une colonne correcte.</div>

<p class="example-title">Exemple : la confiture de kiwis</p>
<p style="margin:4px 0 8px;">2 kg de kiwis contiennent 64 g de sucre, et 5 kg de kiwis contiennent 160 g de sucre. Détermine la masse de sucre contenue dans 7 kg puis dans 13 kg de kiwis.</p>
<p style="margin:4px 0 8px;">On résume ces données dans un tableau de proportionnalité :</p>
<div style="overflow-x:auto;margin:10px 0 12px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Masse de kiwis (en kg)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">2</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">5</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">15</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">7</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">13</td>
    </tr>
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Masse de sucre (en g)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">64</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">160</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">480</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">224</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">416</td>
    </tr>
  </table>
</div>
<ul class="example-list">
  <li>On obtient d'abord la colonne 15 kg en multipliant la colonne 5 kg par 3 : <span class="tex">160 \\times 3 = 480</span>.</li>
  <li>7 kg = 2 kg + 5 kg, donc la masse de sucre pour 7 kg est <span class="tex">64 + 160 = 224</span> g.</li>
  <li>13 kg = 15 kg − 2 kg, donc la masse de sucre pour 13 kg est <span class="tex">480 - 64 = 416</span> g.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Échelle</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">
  Une <b>échelle</b> permet de passer d'une mesure sur un <b>plan</b>, sur une <b>carte</b> ou sur une <b>image</b> à une mesure <b>réelle</b>.<br>
  Une échelle s'écrit sous la forme d'une <b>fraction</b> <span class="tex">\\dfrac{a}{b}</span> : le <b>numérateur</b> <i>a</i> représente un nombre d'unités sur le plan, et le <b>dénominateur</b> <i>b</i> représente le nombre de la <b>même unité</b> en réalité. Par exemple, une échelle de <span class="tex">\\dfrac{1}{1000}</span> (on dit aussi « au 1/1000<sup>e</sup> ») signifie que <b>1 cm sur le plan représente 1 000 cm</b>, soit <b>10 m</b>, <b>en réalité</b>.
</div>

<p class="example-title">Exemple : le plan de la chambre de Léa</p>
<p style="margin:4px 0 8px;">Voici le plan de la chambre de Léa, dessiné à l'échelle <span class="tex">\\dfrac{1}{25}</span>. Quelle est la largeur réelle de la chambre, sachant qu'elle mesure 12 cm sur le plan ? Et quelle est la largeur réelle du lit, sachant qu'il mesure 6 cm sur le plan ?</p>

<div class="figure-wrap" style="max-width:420px;margin:12px auto;">
  <svg viewBox="0 0 340 260" style="width:100%;display:block;">
    <rect x="30" y="20" width="260" height="180" fill="#F7F5EF" stroke="#1C1B2E" stroke-width="2.5"/>
    <rect x="150" y="20" width="40" height="4" fill="#fff"/>
    <rect x="50" y="40" width="70" height="110" fill="#BFD8E8" stroke="#1C1B2E" stroke-width="1.6" rx="4"/>
    <rect x="50" y="40" width="70" height="22" fill="#9FC3D8" stroke="#1C1B2E" stroke-width="1.2"/>
    <line x1="30" y1="212" x2="290" y2="212" stroke="#1C1B2E" stroke-width="1.2"/>
    <line x1="30" y1="206" x2="30" y2="218" stroke="#1C1B2E" stroke-width="1.2"/>
    <line x1="290" y1="206" x2="290" y2="218" stroke="#1C1B2E" stroke-width="1.2"/>
    <text x="160" y="230" text-anchor="middle" font-family="Space Grotesk" font-size="14" fill="#1C1B2E" font-weight="700">12 cm</text>
    <line x1="50" y1="30" x2="120" y2="30" stroke="#1F3A5C" stroke-width="1.2"/>
    <line x1="50" y1="25" x2="50" y2="35" stroke="#1F3A5C" stroke-width="1.2"/>
    <line x1="120" y1="25" x2="120" y2="35" stroke="#1F3A5C" stroke-width="1.2"/>
    <text x="85" y="16" text-anchor="middle" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">6 cm</text>
    <text x="85" y="105" text-anchor="middle" font-family="Inter" font-size="12" fill="#12253A">Lit</text>
    <g transform="translate(30,240)">
      <text x="0" y="4" font-family="JetBrains Mono" font-size="12" fill="#1C1B2E">Échelle : 1/25</text>
    </g>
  </svg>
</div>

<p style="margin:4px 0 4px;">Pour déterminer la largeur réelle de la chambre...</p>
<ul class="example-list">
  <li>① on mesure la largeur sur le plan : 12 cm</li>
  <li>② l'échelle est <span class="tex">\\dfrac{1}{25}</span>, donc 1 cm sur le plan représente 25 cm en réalité, donc 12 cm représentent <span class="tex">12 \\times 25 = 300</span> cm</li>
</ul>
<p style="margin:4px 0 12px;">La largeur réelle de la chambre est donc <b>300 cm</b>, soit <b>3 m</b>.</p>

<p style="margin:4px 0 4px;">Pour déterminer la largeur réelle du lit...</p>
<ul class="example-list">
  <li>① on mesure la largeur sur le plan : 6 cm</li>
  <li>② l'échelle est <span class="tex">\\dfrac{1}{25}</span>, donc 6 cm représentent <span class="tex">6 \\times 25 = 150</span> cm</li>
</ul>
<p style="margin:4px 0 12px;">La largeur réelle du lit est donc <b>150 cm</b>, soit <b>1,5 m</b>.</p>

<p style="margin:8px 0 6px;">On peut récapituler ceci dans un tableau :</p>
<div style="overflow-x:auto;margin:10px 0 4px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Distance sur le plan (en cm)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">1</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">12</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">6</td>
    </tr>
    <tr>
      <td style="padding:6px 14px;background:rgba(31,58,92,.06);font-weight:600;border:1px solid rgba(28,43,57,.15);">Distance réelle (en cm)</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;">25</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">300</td>
      <td style="padding:6px 14px;border:1px solid rgba(28,43,57,.15);text-align:center;color:var(--accent-orange);font-weight:700;">150</td>
    </tr>
  </table>
</div>
`;

document.getElementById('methode-demo-proportionnalite-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-proportionnalite-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Proportionnalité'] = {
  cours:'cours-demo-proportionnalite-6e', methode:'methode-demo-proportionnalite-6e', exos:'exos-demo-proportionnalite-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proportionnalite-6e'));
    renderStaticMath(document.getElementById('methode-demo-proportionnalite-6e'));
    renderStaticMath(document.getElementById('exos-demo-proportionnalite-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-proportionnalite-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-proportionnalite-6e'));
  }
};

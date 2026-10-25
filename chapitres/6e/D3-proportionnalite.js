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

<div class="sub-header"><span class="letter">A</span><h4>Grandeurs proportionnelles</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">On dit que deux grandeurs sont <b>proportionnelles</b> quand les valeurs prises par l'une s'obtiennent en multipliant celles prises par l'autre par un même nombre non nul, appelé <b>coefficient de proportionnalité</b>.</div>

<p class="example-title">Exemple : le côté et le périmètre d'un carré</p>
<p style="margin:4px 0 12px;">La longueur du côté et le périmètre d'un carré sont des grandeurs proportionnelles : le périmètre d'un carré s'obtient en multipliant la longueur de son côté par 4. Le coefficient de proportionnalité est donc 4.</p>

<p class="example-title">Contre-exemple : la chute d'un ballon</p>
<p style="margin:4px 0 12px;">Voici la distance parcourue par un ballon en chute libre. En 1 seconde, il parcourt 5 m, donc le coefficient serait 5. En 2 secondes, il parcourt 20 m, donc le coefficient serait 10. Ces deux coefficients sont différents : la durée de chute et la distance parcourue <b>ne sont donc pas proportionnelles</b>.</p>

<div class="sub-header"><span class="letter">B</span><h4>Tableau de proportionnalité</h4></div>
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
<p style="margin:4px 0 8px;">Voici le plan de la chambre de Léa, dessiné à l'échelle <span class="tex">\\dfrac{1}{25}</span>. Quelle est la longueur réelle de la chambre, sachant qu'elle mesure 12 cm sur le plan ? Et quelle est la largeur réelle du lit, sachant qu'il mesure 6 cm sur le plan ?</p>

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

<p style="margin:4px 0 4px;">Pour déterminer la longueur réelle de la chambre...</p>
<ul class="example-list">
  <li>① on mesure la longueur sur le plan : 12 cm</li>
  <li>② l'échelle est <span class="tex">\\dfrac{1}{25}</span>, donc 1 cm sur le plan représente 25 cm en réalité, donc 12 cm représentent <span class="tex">12 \\times 25 = 300</span> cm</li>
</ul>
<p style="margin:4px 0 12px;">La longueur réelle de la chambre est donc <b>300 cm</b>, soit <b>3 m</b>.</p>

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
<p class="example-title" style="margin-top:0;">Grandeur et unité</p>
<span class="def-badge">Définition</span>
<div class="def-box">
  Une <b>grandeur</b> est ce que l'on peut mesurer (une longueur, une durée, un prix, une masse, un volume, une aire...). Une <b>unité</b> permet d'exprimer la mesure d'une grandeur.
</div>
<p style="margin:10px 0 0;">Par exemple, une <b>température</b> est une grandeur, et elle peut s'exprimer dans l'unité <b>°C</b> (degré Celsius).</p>

<p class="example-title">Jeu : associe chaque grandeur à son unité</p>
<p class="hint interaction-hint" style="margin:0 0 10px;">Clique sur une grandeur, puis sur l'unité qui lui correspond.</p>
<div class="pgame-board" id="pgame6-board"></div>
<p class="hint" id="pgame6-status" style="margin:10px 0;"></p>
<button class="btn secondary" onclick="pp6GameReset()">Recommencer</button>

<p class="example-title" style="margin-top:26px;">Évolution d'une grandeur</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">
  On connaît une valeur initiale de deux grandeurs A et B associées, ainsi qu'un objectif pour B. On veut faire évoluer A pour atteindre cet objectif.
</div>

<p style="margin:14px 0 10px;"><b>Exemple</b> : une voiture consomme <span style="color:var(--accent);font-weight:700;">5 L</span> pour parcourir <span style="color:var(--accent);font-weight:700;">100 km</span>. Quelle est sa consommation pour <span style="color:var(--accent-orange);font-weight:700;">250 km</span> ?</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le calcul.</p>
  <div class="step-display" id="pp6EvolDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pp6EvolDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pp6EvolDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Autre méthode : l'association dans un tableau</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">Quand on connaît <b>deux paires</b> de valeurs associées, on peut parfois passer de l'une à l'autre par une opération simple, et appliquer cette même opération sur l'autre grandeur.</div>

<p style="margin:14px 0 6px;"><b>Exemple</b> : on connaît les paires (5 ; 100) et (3 ; 60). On cherche la valeur de B associée à A = 8.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="pp6lin1-wrap"></div>
  <div class="step-list" id="pp6lin1-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On considère A = 8. On veut trouver B.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On remarque que 8 = 5 + 3.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On applique la même addition à B : 100 + 60 = 160.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pp6lin1-next" onclick="pp6Lin1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pp6Lin1Reset()">Recommencer</button>
  </div>
</div>

<p style="margin:22px 0 6px;"><b>Autre exemple</b> : toujours avec (5 ; 100) et (3 ; 60), on cherche cette fois la valeur de A associée à B = 40.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="pp6lin2-wrap"></div>
  <div class="step-list" id="pp6lin2-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On considère B = 40. On veut trouver A.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On remarque que 40 = 100 − 60.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On applique la même soustraction à A : 5 − 3 = 2.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pp6lin2-next" onclick="pp6Lin2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pp6Lin2Reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header" style="margin-top:28px;"><span class="letter">M</span><h4>Maths et cuisine : adapter une recette</h4></div>
<div class="figure-wrap"><p class="hint interaction-hint" style="margin-top:6px;">Une recette est donnée pour un certain nombre de personnes. Pour en nourrir plus (ou moins), toutes les quantités changent de la même façon.</p>
  <div class="cu-recette" data-niv="6e"></div></div>

`;

/* ================= MÉTHODE : mêmes démos que 5e P1-proportionnalite.js, identifiants pp6* pour
   éviter toute collision (les deux conteneurs méthode-demo-proportionnalite-5e/6e coexistent
   dans le DOM, un seul visible à la fois -- réutiliser les mêmes ids casserait getElementById,
   qui ne renvoie que le premier élément trouvé, peu importe lequel des deux est affiché).
   Contenu et exemples strictement identiques à la version 5e (même jeu grandeur/unité, mêmes
   nombres pour l'évolution et les deux démos de linéarité) : demandé tel quel par Olivier. ================= */
const PP6_PAIRS = [
  ['Longueur','m'], ['Durée','s'], ['Masse','kg'], ['Prix','€'], ['Volume','L'], ['Aire','m²'],
];
let pp6GameSelectedCard = null;
let pp6GameFound = 0;
function pp6Shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function pp6GameReset(){
  pp6GameSelectedCard = null;
  pp6GameFound = 0;
  const gCol = pp6Shuffle(PP6_PAIRS.map(p=>p[0]));
  const uCol = pp6Shuffle(PP6_PAIRS.map(p=>p[1]));
  const board = document.getElementById('pgame6-board');
  board.innerHTML = `
    <div class="pgame-col">${gCol.map(g=>`<div class="pgame-card" data-role="g" data-val="${g}">${g}</div>`).join('')}</div>
    <div class="pgame-col">${uCol.map(u=>`<div class="pgame-card" data-role="u" data-val="${u}">${u}</div>`).join('')}</div>
  `;
  board.querySelectorAll('.pgame-card').forEach(card=>card.addEventListener('click', ()=>pp6GameClick(card)));
  document.getElementById('pgame6-status').textContent = `0 / ${PP6_PAIRS.length} paires trouvées.`;
}
function pp6GameClick(card){
  if(card.classList.contains('matched')) return;
  if(!pp6GameSelectedCard){
    document.querySelectorAll('#pgame6-board .pgame-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    pp6GameSelectedCard = card;
    return;
  }
  if(pp6GameSelectedCard===card){ card.classList.remove('selected'); pp6GameSelectedCard=null; return; }
  if(pp6GameSelectedCard.dataset.role===card.dataset.role){
    document.querySelectorAll('#pgame6-board .pgame-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    pp6GameSelectedCard = card;
    return;
  }
  const gCard = pp6GameSelectedCard.dataset.role==='g' ? pp6GameSelectedCard : card;
  const uCard = pp6GameSelectedCard.dataset.role==='u' ? pp6GameSelectedCard : card;
  const pair = PP6_PAIRS.find(p=>p[0]===gCard.dataset.val);
  if(pair && pair[1]===uCard.dataset.val){
    gCard.classList.remove('selected'); gCard.classList.add('matched');
    uCard.classList.add('matched');
    pp6GameFound++;
    document.getElementById('pgame6-status').textContent = `${pp6GameFound} / ${PP6_PAIRS.length} paires trouvées.` + (pp6GameFound===PP6_PAIRS.length ? ' Bravo, terminé !' : '');
  } else {
    gCard.classList.add('wrong'); uCard.classList.add('wrong');
    setTimeout(()=>{ gCard.classList.remove('wrong','selected'); uCard.classList.remove('wrong'); }, 500);
  }
  pp6GameSelectedCard = null;
}

function pp6EvolFrac(strike){
  const km = strike ? '<s>km</s>' : 'km';
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 4px;font-size:.95rem;">'
       +'<span style="border-bottom:1.5px solid #1C1B2E;padding:0 6px;"><span style="color:var(--accent-orange);font-weight:700;">250</span> '+km+'</span>'
       +'<span style="padding:0 6px;"><span style="color:var(--accent);font-weight:700;">100</span> '+km+'</span>'
       +'</span>';
}
const PP6_EVOL_STEPS = [
  {expr:'On note C la consommation cherchée pour 250 km.',
   note:"On cherche une consommation. Donc on va faire évoluer la consommation initiale (5 L)."},
  {expr:'C = 5 L &times; ( ... / ... )',
   note:"On pose l'écriture : la valeur initiale, multipliée par une fraction."},
  {expr:'C = 5 L &times; '+pp6EvolFrac(false),
   note:"La fraction représente l'évolution de la distance : au numérateur la valeur à atteindre, au dénominateur la donnée initiale."},
  {expr:'C = 5 L &times; '+pp6EvolFrac(true),
   note:"Les unités km sont les mêmes en haut et en bas : elles se simplifient."},
  {expr:'C = 5 L &times; 2,5',
   note:"On calcule le quotient : 250 : 100 = 2,5."},
  {expr:'C = 12,5 L',
   note:"On termine le calcul, sans oublier l'unité. La consommation pour 250 km est donc 12,5 L."},
];
const pp6EvolDemo = makeStepDemo(PP6_EVOL_STEPS, 'pp6EvolDisplay');

function pp6ArrowHead(x,y,angleDeg,size,color){
  size = size||6;
  const a = angleDeg*Math.PI/180;
  const b1 = {x:x-size*Math.cos(a-0.45), y:y-size*Math.sin(a-0.45)};
  const b2 = {x:x-size*Math.cos(a+0.45), y:y-size*Math.sin(a+0.45)};
  return `<polygon points="${x},${y} ${b1.x.toFixed(1)},${b1.y.toFixed(1)} ${b2.x.toFixed(1)},${b2.y.toFixed(1)}" fill="${color}"/>`;
}
function pp6LinArrowsAbove(c1,c2,c3,topY,label,color){
  const apexY = topY-38;
  return `<line x1="${c1}" y1="${topY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c2}" y1="${topY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c3}" y1="${apexY}" x2="${c3}" y2="${topY-2}" stroke="${color}" stroke-width="1.5"/>
    ${pp6ArrowHead(c3, topY, 90, 6, color)}
    <text x="${c3}" y="${apexY-6}" font-size="13" text-anchor="middle" fill="${color}" font-weight="700">${label}</text>`;
}
function pp6LinArrowsBelow(c1,c2,c3,bottomY,label,color){
  const apexY = bottomY+38;
  return `<line x1="${c1}" y1="${bottomY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c2}" y1="${bottomY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c3}" y1="${apexY}" x2="${c3}" y2="${bottomY+2}" stroke="${color}" stroke-width="1.5"/>
    ${pp6ArrowHead(c3, bottomY, -90, 6, color)}
    <text x="${c3}" y="${apexY+15}" font-size="13" text-anchor="middle" fill="${color}" font-weight="700">${label}</text>`;
}
function pp6LinCell(x,y,val,highlight){
  return `<rect x="${x-45}" y="${y-22}" width="90" height="44" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <text x="${x}" y="${y+5}" font-size="15" text-anchor="middle" fill="${highlight?'var(--accent-orange)':'#1C1B2E'}" font-weight="${highlight?'700':'400'}">${val}</text>`;
}
function pp6LinLabelCell(y, text){
  const x0=10, w=140;
  return `<rect x="${x0}" y="${y-22}" width="${w}" height="44" fill="rgba(31,58,92,.06)" stroke="#1C1B2E" stroke-width="1.3"/>
    <text x="${x0+w/2}" y="${y+5}" font-size="13" text-anchor="middle" fill="#1C1B2E" font-weight="700">${text}</text>`;
}
function pp6LinBuildSvg(id, valsA, valsB, unknownIsA, labelA, labelB, showArrowsA, showArrowsB){
  const c1=205,c2=305,c3=405, yA=84, yB=128;
  let s = `<svg id="${id}" viewBox="0 0 465 224" style="width:100%;max-width:440px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += pp6LinLabelCell(yA, 'Grandeur A');
  s += pp6LinLabelCell(yB, 'Grandeur B');
  s += pp6LinCell(c1,yA,valsA[0]) + pp6LinCell(c2,yA,valsA[1]) + pp6LinCell(c3,yA,valsA[2], unknownIsA);
  s += pp6LinCell(c1,yB,valsB[0]) + pp6LinCell(c2,yB,valsB[1]) + pp6LinCell(c3,yB,valsB[2], !unknownIsA);
  if(showArrowsA) s += pp6LinArrowsAbove(c1,c2,c3,yA-22,labelA,'#1F6B3A');
  if(showArrowsB) s += pp6LinArrowsBelow(c1,c2,c3,yB+22,labelB,'#1F6B3A');
  s += `</svg>`;
  return s;
}

let pp6Lin1Step = 0;
function pp6Lin1Render(step){
  document.getElementById('pp6lin1-wrap').innerHTML = pp6LinBuildSvg('pp6lin1-svg', [5,3,8], [100,60, step>=2?160:'?'], false, '5 + 3', '100 + 60', step>=1, step>=2);
  document.querySelectorAll('#pp6lin1-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('pp6lin1-next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pp6lin1-next').disabled = step>=2;
}
function pp6Lin1Next(){ if(pp6Lin1Step<2){ pp6Lin1Step++; pp6Lin1Render(pp6Lin1Step); } }
function pp6Lin1Reset(){ pp6Lin1Step=0; pp6Lin1Render(0); }

let pp6Lin2Step = 0;
function pp6Lin2Render(step){
  document.getElementById('pp6lin2-wrap').innerHTML = pp6LinBuildSvg('pp6lin2-svg', [5,3, step>=2?2:'?'], [100,60,40], true, '5 \u2212 3', '100 \u2212 60', step>=2, step>=1);
  document.querySelectorAll('#pp6lin2-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('pp6lin2-next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pp6lin2-next').disabled = step>=2;
}
function pp6Lin2Next(){ if(pp6Lin2Step<2){ pp6Lin2Step++; pp6Lin2Render(pp6Lin2Step); } }
function pp6Lin2Reset(){ pp6Lin2Step=0; pp6Lin2Render(0); }
const PP6LIN1_STEPS = [
  {note:"On considère A = 8. On veut trouver la valeur de B qui lui correspond."},
  {note:"On remarque que 8 = 5 + 3."},
  {note:"On applique la même addition à B : 100 + 60 = 160."},
];
const PP6LIN2_STEPS = [
  {note:"On considère B = 40. On veut trouver la valeur de A qui lui correspond."},
  {note:"On remarque que 40 = 100 − 60."},
  {note:"On applique la même soustraction à A : 5 − 3 = 2."},
];

document.getElementById('exos-demo-proportionnalite-6e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Utiliser la proportionnalité »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Le prix est proportionnel au nombre d'objets (ils sont identiques).</span><span class="we-comment">On justifie qu'on peut utiliser la proportionnalité.</span></div>
    <div class="we-row"><span class="we-expr">12 objets, c'est 4 fois plus que 3 objets : 2,50 × 4 = 10.</span><span class="we-comment">On explique le raisonnement, puis on calcule.</span></div>
    <div class="we-row"><span class="we-expr">Donc 12 objets coûtent 10 €.</span><span class="we-comment">Conclusion avec l'unité.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    3 cahiers identiques coûtent 4,50 €. Combien coûtent 9 de ces cahiers ? Rédige ta réponse.
    <button type="button" class="exo-correction-toggle" data-target="c6-d3-c1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-d3-c1"><div><p style="margin:0 0 6px;">Le prix est proportionnel au nombre de cahiers (ils sont identiques).</p><p style="margin:0 0 6px;">9 cahiers, c'est 3 fois plus que 3 cahiers (3 × 3 = 9) : le prix est 3 fois plus grand.</p><p style="margin:0 0 6px;">4,50 × 3 = 13,50</p><p style="margin:0 0 6px;"><b>9 cahiers coûtent 13,50 €.</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Le prix des pommes est proportionnel à leur masse. Complète ce tableau, puis donne le coefficient de proportionnalité.<table style="border-collapse:collapse;margin:6px 0;"><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;font-weight:700;background:#EEF4FB;">Masse (kg)</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">2</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">5</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">7</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;font-weight:700;background:#EEF4FB;">Prix (€)</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">6</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">…</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">…</td></tr></table>
    <button type="button" class="exo-correction-toggle" data-target="c6-d3-c2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-d3-c2"><div><p style="margin:0 0 6px;">Pour passer de la masse au prix, on multiplie par 3 (2 × 3 = 6) : <b>le coefficient de proportionnalité est 3</b> (les pommes coûtent 3 € le kilogramme).</p><table style="border-collapse:collapse;margin:6px 0;"><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;font-weight:700;background:#EEF4FB;">Masse (kg)</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">2</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">5</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">7</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;font-weight:700;background:#EEF4FB;">Prix (€)</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">6</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">15</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">21</td></tr></table><p style="margin:0 0 6px;">5 × 3 = 15 et 7 × 3 = 21.</p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un taxi demande 3 € au départ, puis 2 € par kilomètre. Le prix de la course est-il proportionnel à la distance parcourue ? Justifie à l'aide de deux exemples.
    <button type="button" class="exo-correction-toggle" data-target="c6-d3-c3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-d3-c3"><div><p style="margin:0 0 6px;">Pour 1 km : 3 + 2 × 1 = 5 €. Pour 2 km : 3 + 2 × 2 = 7 €.</p><p style="margin:0 0 6px;">Si le prix était proportionnel, 2 km coûteraient 2 fois plus que 1 km : 5 × 2 = 10 €. Or ils coûtent 7 €.</p><p style="margin:0 0 6px;"><b>Le prix n'est pas proportionnel à la distance</b> (à cause des 3 € de départ).</p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Pour 4 personnes, une recette demande 200 g de farine. Quelle masse de farine faut-il pour 10 personnes ? Rédige ta réponse.
    <button type="button" class="exo-correction-toggle" data-target="c6-d3-c4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-d3-c4"><div><p style="margin:0 0 6px;">La masse de farine est proportionnelle au nombre de personnes.</p><p style="margin:0 0 6px;">Pour 1 personne : 200 ÷ 4 = 50 g.</p><p style="margin:0 0 6px;">Pour 10 personnes : 50 × 10 = 500 g.</p><p style="margin:0 0 6px;"><b>Il faut 500 g de farine pour 10 personnes.</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Au marché, 5 kg de tomates coûtent 12 € et 3 kg coûtent 7,20 €. Le prix est proportionnel à la masse. Calcule le prix de 8 kg, puis de 2 kg, sans calculer le prix d'un kilogramme.
    <button type="button" class="exo-correction-toggle" data-target="c6-d3-c5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-d3-c5"><div><p style="margin:0 0 6px;">8 kg = 5 kg + 3 kg : on additionne les prix. 12 + 7,20 = 19,20 : <b>8 kg coûtent 19,20 €.</b></p><p style="margin:0 0 6px;">2 kg = 5 kg − 3 kg : on soustrait les prix. 12 − 7,20 = 4,80 : <b>2 kg coûtent 4,80 €.</b></p></div></div>
  </div>
</div>
`;

// Onglet Histoire (ajouté avec « Maths et cuisine »).
document.getElementById('histoire-demo-proportionnalite-6e').innerHTML = `
${typeof CU_HISTOIRE_HTML !== 'undefined' ? CU_HISTOIRE_HTML : ''}
`;

DEMO_REGISTRY['6e|Proportionnalité'] = {
  cours:'cours-demo-proportionnalite-6e', methode:'methode-demo-proportionnalite-6e', exos:'exos-demo-proportionnalite-6e', histoire:'histoire-demo-proportionnalite-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proportionnalite-6e'));
    renderStaticMath(document.getElementById('methode-demo-proportionnalite-6e'));
    renderStaticMath(document.getElementById('exos-demo-proportionnalite-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-proportionnalite-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-proportionnalite-6e')); if(typeof cuInitTout === 'function') cuInitTout(document.getElementById('methode-demo-proportionnalite-6e'));
    pp6GameReset();
    pp6EvolDemo.reset();
    pp6Lin1Reset(); pp6Lin2Reset();
    registerGeoStepDemo('pp6lin1-svg', { steps:()=>PP6LIN1_STEPS, getIdx:()=>pp6Lin1Step, goto:(i)=>{ pp6Lin1Step=i; pp6Lin1Render(i); } });
    registerGeoStepDemo('pp6lin2-svg', { steps:()=>PP6LIN2_STEPS, getIdx:()=>pp6Lin2Step, goto:(i)=>{ pp6Lin2Step=i; pp6Lin2Render(i); } });
  }
};

DEMO_QUIZZES['6e|Proportionnalité'] = [
  {q:"Deux grandeurs sont proportionnelles quand...",
   opts:["les valeurs de l'une s'obtiennent en multipliant celles de l'autre par un même nombre non nul","les valeurs de l'une sont toujours plus grandes que celles de l'autre","la somme des deux grandeurs est constante"], correct:0},
  {q:"Dans un tableau de proportionnalité, les nombres de la seconde ligne s'obtiennent en multipliant ceux de la première ligne par...",
   opts:["un nombre différent à chaque colonne","le coefficient de proportionnalité, toujours le même","100"], correct:1},
  {q:"Sur un plan à l'échelle 1/25, une longueur de 4 cm représente en réalité...",
   opts:["4 cm","25 cm","100 cm"], correct:2},
  {q:"Sur une échelle a/b, que représente le dénominateur b ?",
   opts:["Un nombre d'unités sur le plan","Le nombre de la même unité en réalité","Le nombre de mesures effectuées"], correct:1},
];

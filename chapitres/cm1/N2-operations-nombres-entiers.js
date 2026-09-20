/* ============================================================
   CHAPITRE : Opérations sur les nombres entiers (CM1, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Construit à partir d'un cours de référence fourni par l'utilisateur (les quatre opérations
   posées, multiples/diviseurs, critères de divisibilité). La division euclidienne réutilise
   directement l'outil déjà existant (computeDivisionPosee, dpRenderDivisionTable,
   buildDivisionStages -- outils-figures.js) plutôt que de redévelopper un moteur séparé.
   ============================================================ */

/* Petit constructeur de table pour les opérations posées (addition, soustraction,
   multiplication) : chaque "rangée" est un tableau de cellules (chaîne, ou {v,strike} pour un
   chiffre barré -- utile pour les emprunts de la soustraction), avec une colonne de signe à
   gauche (+, −, × ou vide) et éventuellement un trait sous la rangée (bar). small=true pour la
   petite rangée des retenues/ajustements au-dessus des nombres, big=true pour le résultat. */
function cm1opRowsTable(rows){
  const trs = rows.map(r=>{
    const fs = r.small ? '.72rem' : (r.big ? '1.2rem' : '1.1rem');
    const signTd = `<td style="width:26px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:${fs};font-weight:700;color:${r.signColor||'var(--accent-orange)'};${r.bar?'border-bottom:2.5px solid var(--ink);':''}">${r.sign||'&nbsp;'}</td>`;
    const tds = r.cells.map(c=>{
      const strike = c && c.strike;
      const val = (c && typeof c==='object') ? c.v : c;
      return `<td style="width:32px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:${fs};font-weight:700;${r.color?`color:${r.color};`:''}${strike?'text-decoration:line-through;opacity:.4;':''}${r.bar?'border-bottom:2.5px solid var(--ink);':''}">${(val!=null&&val!=='')?val:'&nbsp;'}</td>`;
    }).join('');
    return `<tr>${signTd}${tds}</tr>`;
  }).join('');
  return `<table style="border-collapse:collapse;margin:10px auto;">${trs}</table>`;
}

document.getElementById('cours-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Vocabulaire des quatre opérations</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Le résultat de l'<b>addition</b> s'appelle la <b>somme</b> des <b>termes</b>.</li>
    <li>Le résultat de la <b>soustraction</b> s'appelle la <b>différence</b> des <b>termes</b>.</li>
    <li>Le résultat de la <b>multiplication</b> s'appelle le <b>produit</b> des <b>facteurs</b>.</li>
    <li>Dans la <b>division euclidienne</b>, le résultat s'appelle le <b>quotient</b> (Q), et ce qu'il reste s'appelle le <b>reste</b> (R). Le reste est toujours plus petit que le diviseur.</li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Astuce : avant de poser un calcul, on peut <b>estimer</b> le résultat pour vérifier ensuite qu'il est raisonnable. Exemple : pour 802 + 99, comme 802 est proche de 800 et 99 est proche de 100, le résultat doit être proche de 800 + 100 = <b>900</b> (et 802 + 99 = 901, c'est cohérent !).
</div>

<div class="lesson-header"><span class="num">2</span><h3>L'addition posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On <b>aligne</b> les nombres par colonnes (unités sous unités, dizaines sous dizaines...), puis on additionne colonne par colonne, en partant de la <b>droite</b>. Si une colonne dépasse 9, on écrit le chiffre des unités et on <b>retient</b> les dizaines pour la colonne suivante.</div>
<p class="example-title">Exemple : 356 + 178</p>
${cm1opRowsTable([
  {cells:['1','1',''], small:true},
  {cells:['3','5','6']},
  {cells:['1','7','8'], sign:'+', bar:true},
  {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
])}
<p class="hint" style="text-align:center;margin:0 0 10px;">356 + 178 = 534. Le résultat s'appelle la <b>somme</b>.</p>

<div class="lesson-header"><span class="num">3</span><h3>La soustraction posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On aligne les nombres par colonnes, le plus grand nombre au-dessus. On soustrait colonne par colonne, en partant de la droite. Si le chiffre du haut est plus petit que celui du bas, on <b>emprunte</b> une dizaine à la colonne suivante (le chiffre emprunté diminue de 1).</div>
<p class="example-title">Exemple : 623 − 148</p>
${cm1opRowsTable([
  {cells:[{v:'5'},'11','13'], small:true},
  {cells:[{v:'6',strike:true}, {v:'2',strike:true}, '3']},
  {cells:['1','4','8'], sign:'−', bar:true},
  {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
])}
<p class="hint" style="text-align:center;margin:0 0 10px;">623 − 148 = 475. Le résultat s'appelle la <b>différence</b>.</p>

<div class="lesson-header"><span class="num">4</span><h3>La multiplication posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On multiplie d'abord le nombre du haut par le chiffre des <b>unités</b> du nombre du bas, puis par son chiffre des <b>dizaines</b> (le résultat s'écrit alors décalé, car on multiplie en réalité par des dizaines entières). On <b>additionne</b> enfin ces deux résultats intermédiaires.</div>
<p class="example-title">Exemple : 34 × 23</p>
${cm1opRowsTable([
  {cells:['','3','4']},
  {cells:['','2','3'], sign:'×', bar:true},
  {cells:['1','0','2']},
  {cells:['6','8','0'], bar:true},
  {cells:['7','8','2'], color:'var(--accent-orange)', big:true},
])}
<p class="hint" style="text-align:center;margin:0 0 10px;">34 × 3 = 102 &nbsp;·&nbsp; 34 × 20 = 680 &nbsp;·&nbsp; 102 + 680 = 782. Le résultat s'appelle le <b>produit</b>.</p>

<div class="lesson-header"><span class="num">5</span><h3>La division euclidienne posée</h3></div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On prend les chiffres du dividende un par un (en partant de la gauche), et on cherche à chaque étape combien de fois le diviseur y « rentre ». On écrit ce nombre de fois au quotient, on soustrait, et on abaisse le chiffre suivant du dividende.</div>
<p class="example-title">Exemple : 587 ÷ 9</p>
${divisionPoseeHTML(computeDivisionPosee(587,9))}

<div class="lesson-header"><span class="num">6</span><h3>Multiples et diviseurs</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Un nombre entier est un <b>multiple</b> d'un autre nombre entier s'il est dans sa table de multiplication (ou son prolongement).<br>
    <span class="hint" style="margin:0;">Exemple : 42 est un multiple de 7 car il est dans la table de 7. En effet : 42 = 6 × 7.</span></li>
    <li>Un nombre entier est un <b>diviseur</b> d'un autre nombre entier si la division euclidienne du deuxième par le premier a un reste nul.<br>
    <span class="hint" style="margin:0;">Exemple : 7 est un diviseur de 42 car le reste de la division de 42 par 7 vaut 0. On dit aussi que 42 est <b>divisible</b> par 7.</span></li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  « 42 est un multiple de 7 » et « 7 est un diviseur de 42 » décrivent le <b>même</b> fait, vu de deux côtés différents !
</div>

<div class="lesson-header"><span class="num">7</span><h3>Critères de divisibilité</h3></div>
<span class="prop-badge">Règles</span>
<div class="def-box">
  <ul style="margin:0;padding-left:20px;line-height:1.9;">
    <li>Un nombre entier est <b>divisible par 2</b> (on dit qu'il est <b>pair</b>) si son chiffre des unités est 0, 2, 4, 6 ou 8.<br><span class="hint" style="margin:0;">Exemple : 116 est divisible par 2 car son chiffre des unités est 6.</span></li>
    <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.<br><span class="hint" style="margin:0;">Exemple : 115 est divisible par 5 car son chiffre des unités est 5.</span></li>
    <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.<br><span class="hint" style="margin:0;">Exemple : 110 est divisible par 10 car son chiffre des unités est 0.</span></li>
  </ul>
</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Ces critères permettent de savoir si un nombre est divisible <b>sans avoir besoin de poser la division</b> -- il suffit de regarder son dernier chiffre !
</div>
`;

document.getElementById('methode-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Comment poser une addition avec retenue ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">356 + 178 : clique sur « Étape suivante » pour dérouler le calcul, colonne par colonne.</p>
  <div class="step-display" id="cm1op-additionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opAdditionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opAdditionDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une soustraction avec emprunt ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">623 − 148 : clique sur « Étape suivante » pour découvrir comment fonctionne l'emprunt.</p>
  <div class="step-display" id="cm1op-soustractionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opSoustractionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opSoustractionDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une multiplication ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">34 × 23 : clique sur « Étape suivante » pour voir apparaître les deux résultats intermédiaires, puis leur somme.</p>
  <div class="step-display" id="cm1op-multiplicationDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opMultiplicationDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opMultiplicationDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Comment poser une division euclidienne ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">587 ÷ 9 : clique sur « Étape suivante » pour dérouler la division, chiffre par chiffre.</p>
  <div id="cm1op-divisionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1opDivisionNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1opDivisionReset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Poser et effectuer une division euclidienne »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">438 ÷ 6</span><span class="we-comment">Je pose la division : 438 est le dividende, 6 est le diviseur.</span></div>
    <div class="we-row"><span class="we-expr">438 = 6 × 73 + 0</span><span class="we-comment">Je vérifie : 6 × 73 = 438, et le reste (0) est bien inférieur à 6.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Pose et effectue l'addition 467 + 385.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-1">
      ${cm1opRowsTable([
        {cells:['1','1',''], small:true},
        {cells:['4','6','7']},
        {cells:['3','8','5'], sign:'+', bar:true},
        {cells:['8','5','2'], color:'var(--accent-orange)', big:true},
      ])}
      <p style="margin:0;text-align:center;">467 + 385 = <b>852</b></p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Pose et effectue la soustraction 542 − 267.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-2">
      ${cm1opRowsTable([
        {cells:[{v:'3'},'13',''], small:true},
        {cells:[{v:'5',strike:true},{v:'4',strike:true},'2']},
        {cells:['2','6','7'], sign:'−', bar:true},
        {cells:['2','7','5'], color:'var(--accent-orange)', big:true},
      ])}
      <p style="margin:0;text-align:center;">542 − 267 = <b>275</b></p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Pose et effectue la multiplication 213 × 4.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-3">
      ${cm1opRowsTable([
        {cells:['2','1','3']},
        {cells:['','','4'], sign:'×', bar:true},
        {cells:['8','5','2'], color:'var(--accent-orange)', big:true},
      ])}
      <p style="margin:0;text-align:center;">213 × 4 = <b>852</b></p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Pose et effectue la division euclidienne 438 ÷ 6. Vérifie ton résultat.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-4">
      ${divisionPoseeHTML(computeDivisionPosee(438,6))}
      <p style="margin:0;">Vérification : 6 × 73 = 438, et 438 + 0 = <b>438</b>. ✓</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Cite 5 multiples de 6. Le nombre 56 est-il un multiple de 6 ? Justifie.
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-5">
      <p style="margin:0 0 8px;">5 multiples de 6 (parmi d'autres réponses possibles) : 6, 12, 18, 24, 30.</p>
      <p style="margin:0;">56 n'est pas un multiple de 6 : dans la table de 6, on trouve 54 (6 × 9) puis 60 (6 × 10), mais jamais 56. Autrement dit, la division de 56 par 6 n'a pas un reste nul (56 = 6 × 9 + 2).</p>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 6</div>
    Parmi ces nombres, lesquels sont divisibles par 2 ? par 5 ? par 10 ? &nbsp;340 &nbsp;·&nbsp; 125 &nbsp;·&nbsp; 612 &nbsp;·&nbsp; 1 000 &nbsp;·&nbsp; 87
    <button type="button" class="exo-correction-toggle" data-target="cm1op-correction-6" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cm1op-correction-6">
      <ul style="margin:0;padding-left:20px;line-height:1.8;">
        <li>Divisibles par <b>2</b> (chiffre des unités pair) : 340, 612, 1 000.</li>
        <li>Divisibles par <b>5</b> (chiffre des unités 0 ou 5) : 340, 125, 1 000.</li>
        <li>Divisibles par <b>10</b> (chiffre des unités 0) : 340, 1 000.</li>
      </ul>
    </div>
  </div>
  <div class="exo-card">
    <div class="num">Entraînement libre</div>
    <h4 style="margin:0 0 6px;">Exerce-toi : division euclidienne</h4>
    <p class="hint" style="margin:0 0 10px;">Indique un dividende et un diviseur (les tiens, ou au hasard) : la division posée se calcule automatiquement.</p>
    <div data-role="cm1op-div-prac-widget">
      <div class="tool-row" style="margin-bottom:10px;">
        <input type="number" data-role="cm1op-div-prac-dividende" placeholder="Dividende (ex. 587)" style="width:160px;">
        <input type="number" data-role="cm1op-div-prac-diviseur" placeholder="Diviseur (ex. 9)" style="width:160px;">
        <button type="button" class="btn secondary" onclick="cm1opGenerateDivPractice(this)"><span class="gicon">casino</span> Nombres au hasard</button>
        <button type="button" class="btn" onclick="cm1opUpdateDivPractice(this)">Calculer</button>
      </div>
      <div data-role="cm1op-div-prac-area"></div>
      <label class="hint" style="display:block;margin:10px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-step"> Afficher le détail étape par étape (plutôt que le résultat final seul)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-diff" checked onchange="cm1opUpdateDivPractice(this)"> Afficher les différences (détail des soustractions -- décochez pour ne garder que les restes successifs)</label>
      <label class="hint" style="display:block;margin:6px 0 0;"><input type="checkbox" data-role="cm1op-div-prac-vierge"> N'afficher que le dividende et le diviseur (à compléter toi-même sur ton cahier)</label>
    </div>
  </div>
</div>
`;

document.getElementById('histoire-demo-cm1-operations-nombres-entiers').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : d'où viennent les signes +, −, × et ÷ ?</div>
  Les quatre signes que tu utilises tous les jours en calcul n'ont pas toujours existé ! Pendant très longtemps, on écrivait les opérations en toutes lettres, ce qui prenait beaucoup de place et rendait les calculs difficiles à lire.<br><br>
  Les signes <b>+</b> et <b>−</b> apparaissent pour la première fois dans des documents de marchands allemands, à la fin du XVe siècle : le <b>+</b> (qui vient du mot latin « et », signifiant « et ») servait à noter un surplus de marchandises, et le <b>−</b> un manque. Un mathématicien allemand, Johannes Widmann, les utilise dans un livre imprimé en 1489 -- c'est l'une des toutes premières fois qu'on les voit sous cette forme.<br><br>
  Le signe <b>×</b> a été inventé bien plus tard, en 1631, par un mathématicien anglais nommé William Oughtred : une croix inclinée, facile à distinguer de la lettre « x ». Le signe <b>÷</b> (deux points séparés par un trait, qu'on appelle un « obélus ») a été proposé encore plus tard, en 1659, par le mathématicien suisse Johann Rahn.<br><br>
  Quant au signe <b>=</b>, il a été inventé en 1557 par un mathématicien gallois, Robert Recorde, qui expliquait avoir choisi deux traits parallèles « parce que deux choses ne peuvent pas être plus égales » ! Grâce à tous ces signes, on peut aujourd'hui écrire un calcul en quelques symboles, là où il fallait autrefois une phrase entière.
</div>
`;

/* ---- Méthodes animées : addition, soustraction, multiplication (démos par étape, langage
   volontairement simple, public CM1) ---- */
const CM1OP_ADDITION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','',''], color:'var(--accent-orange)', big:true},
    ]), note: "On pose l'addition : on aligne les nombres par colonnes -- unités sous unités, dizaines sous dizaines, centaines sous centaines."},
  {expr: cm1opRowsTable([
      {cells:['','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Unités : 6 + 8 = 14. J'écris 4 au résultat et je retiens 1 dizaine (au-dessus de la colonne des dizaines)."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Dizaines : 1 (retenue) + 5 + 7 = 13. J'écris 3 et je retiens 1 centaine (au-dessus de la colonne des centaines)."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "Centaines : 1 (retenue) + 3 + 1 = 5. J'écris 5."},
  {expr: cm1opRowsTable([
      {cells:['1','1',''], small:true},
      {cells:['3','5','6']},
      {cells:['1','7','8'], sign:'+', bar:true},
      {cells:['5','3','4'], color:'var(--accent-orange)', big:true},
    ]), note: "356 + 178 = 534. Le résultat de l'addition s'appelle la somme."},
];
const cm1opAdditionDemo = makeSingleStepDemo(CM1OP_ADDITION_STEPS, 'cm1op-additionDisplay');

const CM1OP_SOUSTRACTION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','',''], small:true},
      {cells:['6','2','3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['','',''], color:'var(--accent-orange)', big:true},
    ]), note: "On pose la soustraction : 623 (le nombre dont on part) au-dessus, 148 (le nombre qu'on enlève) en dessous, alignés par colonnes."},
  {expr: cm1opRowsTable([
      {cells:['',{v:'1'},'13'], small:true},
      {cells:['6',{v:'2',strike:true},'3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['','','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Unités : 3 − 8, impossible ! On emprunte 1 dizaine (10 unités) à la colonne des dizaines : 3 devient 13. Le 2 des dizaines devient 1. 13 − 8 = 5."},
  {expr: cm1opRowsTable([
      {cells:[{v:'5'},'11','13'], small:true},
      {cells:[{v:'6',strike:true},{v:'2',strike:true},'3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Dizaines : après l'emprunt, il reste 1 dizaine. 1 − 4, impossible ! On emprunte 1 centaine à la colonne des centaines : 1 devient 11. Le 6 des centaines devient 5. 11 − 4 = 7."},
  {expr: cm1opRowsTable([
      {cells:[{v:'5'},'11','13'], small:true},
      {cells:[{v:'6',strike:true},{v:'2',strike:true},'3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "Centaines : après l'emprunt, il reste 5. 5 − 1 = 4."},
  {expr: cm1opRowsTable([
      {cells:[{v:'5'},'11','13'], small:true},
      {cells:[{v:'6',strike:true},{v:'2',strike:true},'3']},
      {cells:['1','4','8'], sign:'−', bar:true},
      {cells:['4','7','5'], color:'var(--accent-orange)', big:true},
    ]), note: "623 − 148 = 475. Le résultat de la soustraction s'appelle la différence."},
];
const cm1opSoustractionDemo = makeSingleStepDemo(CM1OP_SOUSTRACTION_STEPS, 'cm1op-soustractionDisplay');

const CM1OP_MULTIPLICATION_STEPS = [
  {expr: cm1opRowsTable([
      {cells:['','3','4']},
      {cells:['','2','3'], sign:'×', bar:true},
    ]), note: "On pose la multiplication : 34 (le nombre qu'on multiplie) au-dessus, 23 (par combien on multiplie) en dessous."},
  {expr: cm1opRowsTable([
      {cells:['','3','4']},
      {cells:['','2','3'], sign:'×', bar:true},
      {cells:['1','0','2'], color:'var(--accent-orange)'},
    ]), note: "On multiplie d'abord 34 par le chiffre des unités de 23, c'est-à-dire par 3 : 34 × 3 = 102. On écrit ce résultat sous le trait."},
  {expr: cm1opRowsTable([
      {cells:['','3','4']},
      {cells:['','2','3'], sign:'×', bar:true},
      {cells:['1','0','2']},
      {cells:['6','8','0'], color:'var(--accent-orange)', bar:true},
    ]), note: "On multiplie ensuite 34 par le chiffre des dizaines de 23, c'est-à-dire par 20 (2 dizaines) : 34 × 20 = 680. On écrit ce second résultat juste en dessous, avec un trait pour préparer l'addition."},
  {expr: cm1opRowsTable([
      {cells:['','3','4']},
      {cells:['','2','3'], sign:'×', bar:true},
      {cells:['1','0','2']},
      {cells:['6','8','0'], bar:true},
      {cells:['7','8','2'], color:'var(--accent-orange)', big:true},
    ]), note: "Il ne reste plus qu'à additionner les deux résultats : 102 + 680 = 782."},
  {expr: cm1opRowsTable([
      {cells:['','3','4']},
      {cells:['','2','3'], sign:'×', bar:true},
      {cells:['1','0','2']},
      {cells:['6','8','0'], bar:true},
      {cells:['7','8','2'], color:'var(--accent-orange)', big:true},
    ]), note: "34 × 23 = 782. Le résultat de la multiplication s'appelle le produit."},
];
const cm1opMultiplicationDemo = makeSingleStepDemo(CM1OP_MULTIPLICATION_STEPS, 'cm1op-multiplicationDisplay');

/* ---- Méthode animée : division euclidienne (587 ÷ 9) -- réutilise directement le moteur
   existant (computeDivisionPosee/buildDivisionStages/dpRenderDivisionTable) au lieu de
   redévelopper une table pas à pas, même principe que les démos 823÷14 (6e) et 758÷12 (5e). */
const CM1OP_DIVISION_RES = computeDivisionPosee(587, 9);
const CM1OP_DIVISION_STAGES = buildDivisionStages(CM1OP_DIVISION_RES);
let cm1opDivisionIdx = 0;
function cm1opDivisionRender(){
  const st = CM1OP_DIVISION_STAGES[cm1opDivisionIdx];
  document.getElementById('cm1op-divisionDisplay').innerHTML = `${dpRenderDivisionTable(st.rows, st.quotient, CM1OP_DIVISION_RES.divisor)}<p class="hint" style="margin:8px 0 0;">${st.caption}</p>`;
}
function cm1opDivisionNext(){ if(cm1opDivisionIdx<CM1OP_DIVISION_STAGES.length-1) cm1opDivisionIdx++; cm1opDivisionRender(); }
function cm1opDivisionReset(){ cm1opDivisionIdx=0; cm1opDivisionRender(); }

/* ---- Exerce-toi : division euclidienne (dividende/diviseur au choix ou au hasard) -- même
   outil que celui du prof (previewDivisionPosee, outils-figures.js) et que les widgets
   équivalents en 6e/5e, avec les mêmes options (étape par étape, différences, vierge). Scopé via
   un wrapper dédié (data-role) plutôt que .exo-card ou des id fixes -- voir le fix "résultat
   invisible en mode zoom" (build 580, 6e/5e) : la loupe plein écran ne clone que le CONTENU
   d'une carte, jamais son enveloppe .exo-card, donc closest('.exo-card') échouerait une fois
   zoomé. Nombres plus petits qu'en 6e/5e (public CM1). */
function cm1opGenerateDivPractice(btn){
  const wrap = btn.closest('[data-role="cm1op-div-prac-widget"]');
  wrap.querySelector('[data-role="cm1op-div-prac-dividende"]').value = Math.floor(Math.random()*400)+100; // 100-499
  wrap.querySelector('[data-role="cm1op-div-prac-diviseur"]').value = Math.floor(Math.random()*8)+2; // 2-9
  cm1opUpdateDivPractice(btn);
}
function cm1opUpdateDivPractice(el){
  const wrap = el.closest('[data-role="cm1op-div-prac-widget"]');
  const a = parseInt(wrap.querySelector('[data-role="cm1op-div-prac-dividende"]').value);
  const b = parseInt(wrap.querySelector('[data-role="cm1op-div-prac-diviseur"]').value);
  const area = wrap.querySelector('[data-role="cm1op-div-prac-area"]');
  const res = computeDivisionPosee(a,b);
  if(!res){ area.innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = wrap.querySelector('[data-role="cm1op-div-prac-step"]').checked;
  const vierge = wrap.querySelector('[data-role="cm1op-div-prac-vierge"]').checked;
  const showDiff = wrap.querySelector('[data-role="cm1op-div-prac-diff"]').checked;
  area.innerHTML = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
}

DEMO_QUIZZES['cm1|Opérations sur les nombres entiers'] = [
  {q:"Dans l'addition 356 + 178, à l'étape des unités, 6 + 8 = 14. Que fait-on ?",
   opts:["On écrit 14 tel quel au résultat","On écrit 4 et on retient 1 dizaine","On écrit 1 et on retient 4"], correct:1},
  {q:"56 est-il un multiple de 6 ?",
   opts:["Oui, 56 = 6 × 9 exactement","Non, la division de 56 par 6 n'a pas un reste nul","Oui, car 5 + 6 = 11 est divisible par 6"], correct:1},
  {q:"Le nombre 340 est-il divisible par 10 ?",
   opts:["Oui, car son chiffre des unités est 0","Non, car il n'est pas dans la table de 10","Oui, car il est pair"], correct:0},
];

DEMO_REGISTRY['cm1|Opérations sur les nombres entiers'] = { cours:'cours-demo-cm1-operations-nombres-entiers', methode:'methode-demo-cm1-operations-nombres-entiers', exos:'exos-demo-cm1-operations-nombres-entiers', histoire:'histoire-demo-cm1-operations-nombres-entiers',
  init:()=>{ cm1opAdditionDemo.reset(); cm1opSoustractionDemo.reset(); cm1opMultiplicationDemo.reset(); cm1opDivisionReset(); } };

/* ============================================================
   CHAPITRE : Nombres décimaux (6e, N3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

/* ---- Petites figures de partage en divs (dixièmes / centièmes) ---- */
function ndGridDixieme(shaded){
  let cells = '';
  for(let i=0;i<10;i++){
    cells += `<div style="flex:1;height:100%;border-right:${i<9?'1px solid rgba(28,43,57,.3)':'none'};background:${i===shaded?'var(--accent)':'transparent'};"></div>`;
  }
  return `<div style="display:flex;width:220px;height:70px;border:1.5px solid #1C1B2E;margin:10px auto;">${cells}</div>`;
}
function ndGridCentieme(shadedIndex){
  let rows = '';
  for(let r=0;r<10;r++){
    let cells = '';
    for(let c=0;c<10;c++){
      const idx = r*10+c;
      cells += `<div style="flex:1;border:0.5px solid rgba(28,43,57,.25);background:${idx===shadedIndex?'var(--accent)':'transparent'};"></div>`;
    }
    rows += `<div style="display:flex;flex:1;">${cells}</div>`;
  }
  return `<div style="display:flex;flex-direction:column;width:160px;height:160px;border:1.5px solid #1C1B2E;margin:10px auto;">${rows}</div>`;
}

/* ---- Figure interactive : repérage sur une demi-droite graduée (points déplaçables) ---- */
const ND_LINE_MIN = 0, ND_LINE_MAX = 6, ND_LINE_ORIGIN_X = 30, ND_LINE_UNIT = 70, ND_LINE_Y = 60;
function ndLineValToX(v){ return ND_LINE_ORIGIN_X + v*ND_LINE_UNIT; }
function ndLineXToVal(x){ return (x-ND_LINE_ORIGIN_X)/ND_LINE_UNIT; }
let ndPointM = 1.4, ndPointN = 4.7;

function ndBuildDemiDroiteSvg(){
  const lastX = ndLineValToX(ND_LINE_MAX);
  const arrowX = lastX + 30;
  let ticks = '';
  for(let v=ND_LINE_MIN;v<=ND_LINE_MAX;v++){
    const x = ndLineValToX(v);
    if(v<ND_LINE_MAX){
      for(let k=1;k<10;k++){
        const xk = ndLineValToX(v+k/10);
        ticks += `<line x1="${xk}" y1="${ND_LINE_Y-3}" x2="${xk}" y2="${ND_LINE_Y+3}" stroke="#1C1B2E" stroke-width="1"/>`;
      }
    }
    ticks += `<line x1="${x}" y1="${ND_LINE_Y-6}" x2="${x}" y2="${ND_LINE_Y+6}" stroke="#1C1B2E" stroke-width="1.3"/>`;
    ticks += `<text x="${x}" y="${ND_LINE_Y+24}" font-family="JetBrains Mono" font-size="13" fill="#1C1B2E" text-anchor="middle">${v}</text>`;
  }
  return `<svg id="svgNdLine" viewBox="0 0 ${arrowX+30} 110" style="width:100%;max-width:480px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${ND_LINE_ORIGIN_X-15}" y1="${ND_LINE_Y}" x2="${arrowX}" y2="${ND_LINE_Y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <polygon points="${arrowX},${ND_LINE_Y} ${arrowX-10},${ND_LINE_Y-5} ${arrowX-10},${ND_LINE_Y+5}" fill="#1C1B2E"/>
    ${ticks}
    <line id="ndPointM" x1="0" y1="${ND_LINE_Y-11}" x2="0" y2="${ND_LINE_Y+11}" stroke="#1F3A5C" stroke-width="3" style="cursor:grab;"/>
    <text id="ndLabelM" font-family="JetBrains Mono" font-size="14" font-weight="700" fill="#1F3A5C" text-anchor="middle"></text>
    <line id="ndPointN" x1="0" y1="${ND_LINE_Y-11}" x2="0" y2="${ND_LINE_Y+11}" stroke="#E35D3A" stroke-width="3" style="cursor:grab;"/>
    <text id="ndLabelN" font-family="JetBrains Mono" font-size="14" font-weight="700" fill="#E35D3A" text-anchor="middle"></text>
  </svg>`;
}
function ndUpdateDemiDroite(){
  const xM = ndLineValToX(ndPointM), xN = ndLineValToX(ndPointN);
  const mEl2 = document.getElementById('ndPointM'), nEl2 = document.getElementById('ndPointN');
  mEl2.setAttribute('x1',xM); mEl2.setAttribute('x2',xM);
  nEl2.setAttribute('x1',xN); nEl2.setAttribute('x2',xN);
  const lM = document.getElementById('ndLabelM'); lM.setAttribute('x',xM); lM.setAttribute('y',ND_LINE_Y-14); lM.textContent = 'M';
  const lN = document.getElementById('ndLabelN'); lN.setAttribute('x',xN); lN.setAttribute('y',ND_LINE_Y-14); lN.textContent = 'N';
  const note = document.getElementById('ndAbscisseNote');
  if(note) note.innerHTML = `Point M : abscisse <b>${ndPointM.toFixed(1).replace('.',',')}</b> &nbsp;·&nbsp; Point N : abscisse <b>${ndPointN.toFixed(1).replace('.',',')}</b>`;
}
function ndResetDemiDroite(){ ndPointM=1.4; ndPointN=4.7; ndUpdateDemiDroite(); }
function ndInitDemiDroiteDrag(){
  ndUpdateDemiDroite();
  const svgEl = document.getElementById('svgNdLine');
  let dragging = null;
  const startM = e=>{dragging='M'; e.preventDefault();};
  const startN = e=>{dragging='N'; e.preventDefault();};
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl,e);
    let v = ndLineXToVal(p.x);
    v = Math.round(v*10)/10;
    v = Math.max(ND_LINE_MIN, Math.min(ND_LINE_MAX, v));
    if(dragging==='M') ndPointM=v; else ndPointN=v;
    ndUpdateDemiDroite();
  };
  const end = ()=>dragging=null;
  const mEl = document.getElementById('ndPointM'), nEl = document.getElementById('ndPointN');
  mEl.onmousedown=startM; nEl.onmousedown=startN;
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  mEl.ontouchstart=startM; nEl.ontouchstart=startN;
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

document.getElementById('cours-demo-decimaux-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Sous-multiples de l'unité</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Les dixièmes</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand on coupe une unité en 10 parties égales, on obtient des <b>dixièmes</b>. Un dixième se note <span class="tex">\\dfrac{1}{10}</span>. Dans l'unité, il y a 10 dixièmes, donc <span class="tex">1 = \\dfrac{10}{10}</span>.</div>
${ndGridDixieme(3)}

<div class="sub-header"><span class="letter">B</span><h4>Les centièmes</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand on coupe une unité en 100 parties égales, on obtient des <b>centièmes</b>. Un centième se note <span class="tex">\\dfrac{1}{100}</span>. Dans l'unité, il y a 100 centièmes, donc <span class="tex">1 = \\dfrac{100}{100}</span>.</div>
${ndGridCentieme(47)}

<div class="sub-header"><span class="letter">C</span><h4>Les millièmes</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Quand on coupe une unité en 1 000 parties égales, on obtient des <b>millièmes</b>. Un millième se note <span class="tex">\\dfrac{1}{1\\,000}</span>. Dans l'unité, il y a 1 000 millièmes, donc <span class="tex">1 = \\dfrac{1\\,000}{1\\,000}</span>.</div>
<p class="example-title">Exemple :</p>
<p style="text-align:center;margin:4px 0 12px;"><span class="tex">\\dfrac{8\\,347}{1\\,000} = 8 + \\dfrac{347}{1\\,000} = 8,347</span></p>

<div class="lesson-header"><span class="num">2</span><h3>Décomposition et nom des chiffres</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Un nombre pouvant s'écrire sous la forme d'une fraction décimale est un <b>nombre décimal</b>. Il peut aussi se noter en utilisant une virgule : c'est son <b>écriture décimale</b>.</div>
<p class="example-title">Exemple : on considère le nombre décimal 5 218,647.</p>
<ul class="example-list">
  <li><b>a.</b> Écris-le en toutes lettres.</li>
  <li><b>b.</b> Donnes-en une décomposition.</li>
  <li><b>c.</b> Donne le nom de chaque chiffre.</li>
</ul>
<p class="hint" style="margin:10px 0 6px;">On peut s'aider d'un tableau de classes :</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.85rem;margin:0 0 16px;">
  <tr>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des mille</th>
    <th colspan="3" style="background:var(--accent);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Classe des unités</th>
    <th style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Dixièmes<br><span class="tex">\\dfrac{1}{10}</span></th>
    <th style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Centièmes<br><span class="tex">\\dfrac{1}{100}</span></th>
    <th style="background:var(--accent-orange);color:#fff;padding:6px;border:1px solid rgba(28,43,57,.2);font-family:'Space Grotesk',sans-serif;">Millièmes<br><span class="tex">\\dfrac{1}{1\\,000}</span></th>
  </tr>
  <tr>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">C</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">D</th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">U</th>
    <th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(227,93,58,.06);"></th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(227,93,58,.06);"></th><th style="padding:4px;border:1px solid rgba(28,43,57,.2);background:rgba(227,93,58,.06);"></th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);"></td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">5</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">2</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">1</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">8</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">6</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">4</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;">7</td>
  </tr>
</table>
</div>
<ul class="example-list">
  <li><b>a.</b> Ce nombre se lit donc : cinq-mille-deux-cent-dix-huit virgule six-cent-quarante-sept.</li>
  <li><b>b.</b> Il peut se décomposer ainsi :<br>
    5 218,647 = (5 × 1 000) + (2 × 100) + (1 × 10) + (8 × 1) + <span class="tex">\\left(6 \\times \\dfrac{1}{10}\\right) + \\left(4 \\times \\dfrac{1}{100}\\right) + \\left(7 \\times \\dfrac{1}{1\\,000}\\right)</span>
  </li>
  <li><b>c.</b>
    5 est le chiffre des unités de mille &nbsp;·&nbsp; 2 est le chiffre des centaines &nbsp;·&nbsp; 1 est le chiffre des dizaines<br>
    8 est le chiffre des unités &nbsp;·&nbsp; 6 est le chiffre des dixièmes &nbsp;·&nbsp; 4 est le chiffre des centièmes &nbsp;·&nbsp; 7 est le chiffre des millièmes
  </li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : un nombre entier est un nombre décimal particulier. En effet, 12 peut s'écrire avec une virgule (12,0) ou sous la forme d'une fraction décimale <span class="tex">\\left(\\dfrac{120}{10}\\right)</span>.
</div>

<div class="lesson-header"><span class="num">3</span><h3>Repérage sur une demi-droite graduée</h3></div>
<p class="example-title">Exemple : quelles sont les abscisses des points M et N ?</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Déplacez les points M (bleu) et N (orange) sur la droite graduée pour changer leur abscisse.</p>
<div class="figure-wrap">
  ${ndBuildDemiDroiteSvg()}
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn secondary" onclick="ndResetDemiDroite()">Revenir à l'exemple</button>
  </div>
  <p class="hint" id="ndAbscisseNote" style="text-align:center;margin-top:8px;"></p>
</div>
<p style="margin:10px 0 4px;">Dans la position de départ, le point M a pour abscisse <span class="tex">1 + \\dfrac{4}{10}</span>, soit 1,4. Le point N a pour abscisse <span class="tex">4 + \\dfrac{7}{10}</span>, soit 4,7.</p>
<p style="margin:4px 0 12px;">On note M(1,4) et N(4,7).</p>

<div class="lesson-header"><span class="num">4</span><h3>Comparaison et rangement</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Comparaison de deux nombres décimaux</h4></div>
<span class="prop-badge">Règle</span>
<div class="def-box">
  Pour comparer deux nombres décimaux écrits sous forme décimale :
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>on compare les <b>parties entières</b> ;</li>
    <li>si les parties entières sont égales, alors on compare les <b>chiffres des dixièmes</b> ;</li>
    <li>si les chiffres des dixièmes sont égaux, alors on compare les <b>chiffres des centièmes</b> ;</li>
    <li>et ainsi de suite jusqu'à ce que les deux nombres aient des chiffres différents.</li>
  </ul>
</div>
<p class="example-title">Exemple : compare les nombres 46,285 et 46,29.</p>
<ul class="example-list">
  <li>On compare d'abord les <b>parties entières</b> des deux nombres : elles sont égales, donc on compare les <b>chiffres des dixièmes</b> ;</li>
  <li>ils sont égaux, donc on compare les <b>chiffres des centièmes</b> ;</li>
  <li>8 &lt; 9 donc 46,285 &lt; 46,29.</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : quand les parties entières sont égales, on peut comparer les parties décimales en millièmes. <span class="tex">46,285 = 46 + \\dfrac{285}{1\\,000}</span> et <span class="tex">46,29 = 46 + \\dfrac{290}{1\\,000}</span>. Or, 290 millièmes est plus grand que 285 millièmes, donc 46,29 &gt; 46,285.
</div>

<div class="sub-header" style="margin-top:16px;"><span class="letter">B</span><h4>Rangement de nombres décimaux</h4></div>
<p class="example-title">Exemple : range les nombres 12,6 ; 126,4 ; 12,64 ; 12,46 dans l'ordre croissant.</p>
<p style="margin:4px 0 4px;">On repère le plus petit, puis le plus petit des nombres qui restent, et ainsi de suite.</p>
<p style="margin:4px 0 12px;">On obtient donc : 12,46 &lt; 12,6 &lt; 12,64 &lt; 126,4.</p>
`;

document.getElementById('histoire-demo-decimaux-6e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Les nombres décimaux tels que nous les écrivons (avec une virgule) sont une invention récente à l'échelle de l'histoire des mathématiques : c'est le savant flamand Simon Stevin qui, en 1585, en publie le premier exposé complet et accessible, dans un petit livre intitulé <i>La Thiende</i> (« Le Dixième »). Il y explique cette méthode aux <i>« astrologues, arpenteurs, tapissiers, tonneliers, maîtres de la monnaie et à tous marchands »</i>, pour qu'ils puissent calculer sans passer par les fractions. Certaines civilisations, comme les mathématiciens arabes et chinois, utilisaient déjà des idées proches bien avant lui, mais c'est Stevin qui a rendu cette écriture vraiment utilisable par tous en Europe.
</div>
`;

document.getElementById('methode-demo-decimaux-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : comparer deux nombres décimaux</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="nd-comparerDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndComparerDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndComparerDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : décomposer un nombre décimal</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="nd-decomposerDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndDecomposerDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndDecomposerDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : ne pas confondre « chiffre des... » et « nombre de... »</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="nd-chiffreNombreDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndChiffreNombreDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndChiffreNombreDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-decimaux-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Comparer deux nombres décimaux »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On compare les parties entières de 9,42 et 9,4 : elles sont égales.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr">Or, 9,4 = 9,40, donc on compare les chiffres des dixièmes (4 = 4), puis des centièmes (2 &gt; 0).</span><span class="we-comment">On énonce la règle et on l'applique.</span></div>
    <div class="we-row"><span class="we-expr">Donc 9,42 &gt; 9,4.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Écris en toutes lettres le nombre 3 067,452, puis donnes-en une décomposition.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Compare les nombres 58,371 et 58,38. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Range dans l'ordre décroissant : 7,05 ; 7,5 ; 70,5 ; 7,505.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Sur une demi-droite graduée, place les points R(2,3) et S(0,8).
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Pour le nombre 62,489, donne : <b>a.</b> le chiffre des centièmes ; <b>b.</b> le nombre de centièmes. Explique la différence entre les deux réponses.
  </div>
</div>
`;

/* ---- Méthode : comparer deux nombres décimaux ---- */
const ND_COMPARER_STEPS = [
  {expr:'Compare 34,158 et 34,16.', note:"On part des deux nombres à comparer."},
  {expr:'On compare les parties entières : 34 = 34.', note:"Elles sont égales, donc on continue avec les dixièmes."},
  {expr:'On compare les chiffres des dixièmes : 1 = 1.', note:"Ils sont égaux, donc on continue avec les centièmes."},
  {expr:'On compare les chiffres des centièmes : 5 < 6.', note:"Ils sont différents : on peut conclure."},
  {expr:'Donc 34,158 < 34,16.', note:"Conclusion."},
];
const ndComparerDemo = makeStepDemo(ND_COMPARER_STEPS, 'nd-comparerDisplay');

/* ---- Méthode : décomposer un nombre décimal ---- */
const ND_DECOMPOSER_STEPS = [
  {expr:'Décompose le nombre 47,206.', note:"On repère chaque chiffre et sa position."},
  {expr:'4 est le chiffre des dizaines, 7 celui des unités.', note:"Partie entière."},
  {expr:'2 est le chiffre des dixièmes, 0 celui des centièmes, 6 celui des millièmes.', note:"Partie décimale."},
  {expr:'47,206 = (4 × 10) + (7 × 1) + (2 × 0,1) + (0 × 0,01) + (6 × 0,001)', note:"Décomposition complète."},
];
const ndDecomposerDemo = makeStepDemo(ND_DECOMPOSER_STEPS, 'nd-decomposerDisplay');

/* ---- Méthode : chiffre des... vs nombre de... (adapté aux décimaux) ---- */
const ND_CHIFFRE_NOMBRE_STEPS = [
  {expr:'84,153', note:"On reprend un nombre décimal."},
  {expr:'Chiffre des dixièmes = 1', note:"C'est uniquement le symbole qui se trouve à cette position précise."},
  {expr:'Nombre de dixièmes = 841', note:"C'est le nombre total de dixièmes complets contenus dans 84,153 — on lit tous les chiffres situés à gauche de cette position, elle comprise."},
  {expr:'Vérification : 841 × 0,1 = 84,1', note:"84,153 = 84,1 + 0,053. Il y a bien 841 dixièmes complets dans 84,153 (il reste 0,053)."},
  {expr:'Chiffre des centièmes = 5 &nbsp;·&nbsp; Nombre de centièmes = 8 415', note:"Même distinction, une position plus loin : 8 415 × 0,01 = 84,15, et 84,153 = 84,15 + 0,003."},
];
const ndChiffreNombreDemo = makeStepDemo(ND_CHIFFRE_NOMBRE_STEPS, 'nd-chiffreNombreDisplay');

DEMO_REGISTRY['Nombres décimaux'] = {
  cours:'cours-demo-decimaux-6e', methode:'methode-demo-decimaux-6e', exos:'exos-demo-decimaux-6e', histoire:'histoire-demo-decimaux-6e',
  init:()=>{
    ndInitDemiDroiteDrag();
    ndComparerDemo.reset();
    ndDecomposerDemo.reset();
    ndChiffreNombreDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-decimaux-6e'));
    renderStaticMath(document.getElementById('exos-demo-decimaux-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-decimaux-6e')); injectCourseAddButtons(document.getElementById('methode-demo-decimaux-6e'));
  }
};

DEMO_QUIZZES['Nombres décimaux'] = [
  {q:"Un dixième se note...",
   opts:["1/10","1/100","1/1000"], correct:0},
  {q:"Combien y a-t-il de centièmes dans une unité ?",
   opts:["10","100","1000"], correct:1},
  {q:"Pour comparer deux nombres décimaux, on compare d'abord...",
   opts:["Les chiffres des dixièmes","Les parties entières","Le nombre de chiffres"], correct:1},
  {q:"12 peut s'écrire sous la forme décimale...",
   opts:["12,0","120,0","1,20"], correct:0},
  {q:"Lequel de ces nombres est le plus grand ?",
   opts:["6,08","6,2","6,099"], correct:1},
];

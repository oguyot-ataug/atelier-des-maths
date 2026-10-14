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

/* ---- Millièmes : le cube unité partagé en 1 000 petits cubes, avec la plaque (dixième), la barre (centième)
   et le petit cube (millième), à la même échelle (perspective cavalière). ---- */
function ndPave(nx, ny, nz, colore){
  const u = 13, kx = 5.2, ky = 3.9, m = 4;                       // côté d'un petit cube ; fuyantes par petit cube
  const W = nx * u + nz * kx, H = ny * u + nz * ky;
  const P = (x, y, z) => [m + x * u + z * kx, m + nz * ky + (ny - y) * u - z * ky];
  const poly = (pts, fill) => `<polygon points="${pts.map(p => P(...p).map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="none"/>`;
  const ligne = (a, b, w, c) => { const [x1, y1] = P(...a), [x2, y2] = P(...b); return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c}" stroke-width="${w}"/>`; };
  const [cf, ct, cr] = colore ? ['#F29A1F', '#F8C27A', '#D9800E'] : ['#FCE9CF', '#FFF6E8', '#F2D6AE'];
  let g = poly([[0, 0, 0], [nx, 0, 0], [nx, ny, 0], [0, ny, 0]], cf)            // face avant
    + poly([[0, ny, 0], [nx, ny, 0], [nx, ny, nz], [0, ny, nz]], ct)            // dessus
    + poly([[nx, 0, 0], [nx, 0, nz], [nx, ny, nz], [nx, ny, 0]], cr);           // côté droit
  const fin = 'rgba(28,43,57,.35)';
  for(let i = 1; i < nx; i++) g += ligne([i, 0, 0], [i, ny, 0], .6, fin) + ligne([i, ny, 0], [i, ny, nz], .6, fin);
  for(let j = 1; j < ny; j++) g += ligne([0, j, 0], [nx, j, 0], .6, fin) + ligne([nx, j, 0], [nx, j, nz], .6, fin);
  for(let k = 1; k < nz; k++) g += ligne([0, ny, k], [nx, ny, k], .6, fin) + ligne([nx, 0, k], [nx, ny, k], .6, fin);
  // Dans le cube unité : un petit cube coloré, au coin avant, en haut à droite (ses trois faces sont visibles).
  if(nx === 10 && nz === 10 && !colore){
    g += poly([[9, 9, 0], [10, 9, 0], [10, 10, 0], [9, 10, 0]], '#F29A1F') + poly([[9, 10, 0], [10, 10, 0], [10, 10, 1], [9, 10, 1]], '#F8C27A')
      + poly([[10, 9, 0], [10, 9, 1], [10, 10, 1], [10, 10, 0]], '#D9800E');
  }
  const bord = '#1C1B2E';
  [[[0, 0, 0], [nx, 0, 0]], [[nx, 0, 0], [nx, ny, 0]], [[nx, ny, 0], [0, ny, 0]], [[0, ny, 0], [0, 0, 0]],
   [[0, ny, 0], [0, ny, nz]], [[nx, ny, 0], [nx, ny, nz]], [[nx, 0, 0], [nx, 0, nz]],
   [[0, ny, nz], [nx, ny, nz]], [[nx, ny, nz], [nx, 0, nz]]].forEach(([a, b]) => g += ligne(a, b, 1.3, bord));
  return `<svg viewBox="0 0 ${(W + 2 * m).toFixed(1)} ${(H + 2 * m).toFixed(1)}" width="${(W + 2 * m).toFixed(0)}" height="${(H + 2 * m).toFixed(0)}" style="display:block;margin:0 auto;max-width:100%;" role="img">${g}</svg>`;
}
function ndCubeMilliemes(){
  const bloc = (svg, legende) => `<figure style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;">${svg}<figcaption style="text-align:center;font-size:.9rem;line-height:1.35;">${legende}</figcaption></figure>`;
  return `<div style="display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:18px 24px;margin:12px auto 6px;max-width:860px;">
    ${bloc(ndPave(10, 10, 10), '<b>1 unité</b><br>1 000 petits cubes')}
    ${bloc(ndPave(10, 10, 1, true), '<b>1 plaque</b> = 1 dixième<br><span class="tex">\\dfrac{1}{10} = \\dfrac{100}{1\\,000}</span>')}
    ${bloc(ndPave(10, 1, 1, true), '<b>1 barre</b> = 1 centième<br><span class="tex">\\dfrac{1}{100} = \\dfrac{10}{1\\,000}</span>')}
    ${bloc(ndPave(1, 1, 1, true), '<b>1 petit cube</b> = 1 millième<br><span class="tex">\\dfrac{1}{1\\,000}</span>')}
  </div>`;
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
<p>On représente l'unité par un grand cube, partagé en 10 × 10 × 10 = 1 000 petits cubes : chaque petit cube (en orange dans le grand cube) est <b>un millième</b> de l'unité. Une barre de 10 petits cubes est un centième ; une plaque de 100 petits cubes est un dixième ; 10 plaques font l'unité.</p>
${ndCubeMilliemes()}
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

<div class="sub-header" style="margin-top:16px;"><span class="letter">C</span><h4>Encadrer et intercaler</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  <b>Encadrer</b> un nombre, c'est trouver un nombre plus petit et un nombre plus grand que lui. L'encadrement de 7,38 <b>à l'unité</b> est 7 &lt; 7,38 &lt; 8 ; <b>au dixième</b> : 7,3 &lt; 7,38 &lt; 7,4.<br>
  <b>Intercaler</b> un nombre entre deux nombres, c'est trouver un nombre compris entre les deux.
</div>
<p class="example-title">Exemple : intercale un nombre entre 4,6 et 4,7.</p>
<ul class="example-list">
  <li>On écrit les deux nombres avec un chiffre de plus : 4,6 = 4,60 et 4,7 = 4,70.</li>
  <li>Entre 60 centièmes et 70 centièmes, il y a 61, 62, … 69 centièmes : par exemple <b>4,6 &lt; 4,65 &lt; 4,7</b>.</li>
</ul>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : entre deux nombres décimaux différents, on peut toujours intercaler un autre nombre décimal (il suffit d'ajouter des zéros, puis de prendre un nombre « entre les deux »).
</div>
`;

document.getElementById('histoire-demo-decimaux-6e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Les nombres décimaux tels que nous les écrivons (avec une virgule) sont une invention récente à l'échelle de l'histoire des mathématiques : c'est le savant flamand Simon Stevin qui, en 1585, en publie le premier exposé complet et accessible, dans un petit livre intitulé <i>La Thiende</i> (« Le Dixième »). Il y explique cette méthode aux <i>« astrologues, arpenteurs, tapissiers, tonneliers, maîtres de la monnaie et à tous marchands »</i>, pour qu'ils puissent calculer sans passer par les fractions. Certaines civilisations, comme les mathématiciens arabes et chinois, utilisaient déjà des idées proches bien avant lui, mais c'est Stevin qui a rendu cette écriture vraiment utilisable par tous en Europe.
</div>
`;

document.getElementById('methode-demo-decimaux-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode : placer un point d'abscisse donnée (l'axe commence à 0)</h4></div>
<div class="figure-wrap" style="margin-top:12px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ndPlacer0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndPlacer0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndPlacer0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : placer un point d'abscisse donnée (l'axe ne commence pas à 0)</h4></div>
<div class="figure-wrap" style="margin-top:12px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ndPlacerSans0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndPlacerSans0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndPlacerSans0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : lire l'abscisse d'un point (l'axe commence à 0)</h4></div>
<div class="figure-wrap" style="margin-top:12px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ndLire0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndLire0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndLire0Demo.reset()">Recommencer</button>
  </div>
</div>
<div class="sub-header"><span class="letter">M</span><h4>Méthode : lire l'abscisse d'un point (l'axe ne commence pas à 0)</h4></div>
<div class="figure-wrap" style="margin-top:12px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ndLireSans0Display"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ndLireSans0Demo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ndLireSans0Demo.reset()">Recommencer</button>
  </div>
</div>
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
`;

document.getElementById('exos-demo-decimaux-6e').innerHTML = `
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
    <button type="button" class="exo-correction-toggle" data-target="c6-n3-c1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n3-c1"><div><p style="margin:0 0 6px;"><b>Trois-mille-soixante-sept unités et quatre-cent-cinquante-deux millièmes</b> (ou trois-mille-soixante-sept virgule quatre-cent-cinquante-deux).</p><p style="margin:0 0 6px;">3 067,452 = (3 × 1 000) + (0 × 100) + (6 × 10) + (7 × 1) + (4 × 0,1) + (5 × 0,01) + (2 × 0,001)</p><p style="margin:0 0 6px;">ou encore : 3 067,452 = 3 067 + <span class="tex">\\dfrac{4}{10}</span> + <span class="tex">\\dfrac{5}{100}</span> + <span class="tex">\\dfrac{2}{1000}</span></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Compare les nombres 58,371 et 58,38. Rédige ta réponse.
    <button type="button" class="exo-correction-toggle" data-target="c6-n3-c2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n3-c2"><div><p style="margin:0 0 6px;">Les parties entières sont égales : 58 = 58.</p><p style="margin:0 0 6px;">Les chiffres des dixièmes sont égaux : 3 = 3.</p><p style="margin:0 0 6px;">Chiffres des centièmes : 7 &lt; 8.</p><p style="margin:0 0 6px;"><b>Donc 58,371 &lt; 58,38.</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Range dans l'ordre décroissant : 7,05 ; 7,5 ; 70,5 ; 7,505.
    <button type="button" class="exo-correction-toggle" data-target="c6-n3-c3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n3-c3"><div><p style="margin:0 0 6px;">Le plus grand est 70,5 (partie entière 70). Les trois autres ont pour partie entière 7 ; on compare les dixièmes : 5 pour 7,5 et 7,505, 0 pour 7,05. Enfin 7,505 = 7,505 et 7,5 = 7,500 : 7,505 &gt; 7,5.</p><p style="margin:0 0 6px;"><b>70,5 &gt; 7,505 &gt; 7,5 &gt; 7,05</b></p></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Sur une demi-droite graduée, place les points R(2,3) et S(0,8).
    <button type="button" class="exo-correction-toggle" data-target="c6-n3-c4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n3-c4"><div><p style="margin:0 0 6px;">On choisit une unité de 10 carreaux : chaque carreau représente un dixième.</p><p style="margin:0 0 6px;">R(2,3) : 2 unités et 3 dixièmes, soit 23 dixièmes à partir de 0 ; S(0,8) : 8 dixièmes à partir de 0.</p><svg viewBox="0 0 350 62" style="width:350px;max-width:100%;display:block;margin:4px 0;"><line x1="20" y1="34" x2="340" y2="34" stroke="#1F3A5C" stroke-width="1.6"/><path d="M340,34 l-7,-4 v8 z" fill="#1F3A5C"/><line x1="20" y1="26" x2="20" y2="42" stroke="#1F3A5C" stroke-width="1.6"/><line x1="30" y1="30" x2="30" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="40" y1="30" x2="40" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="50" y1="30" x2="50" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="60" y1="30" x2="60" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="70" y1="30" x2="70" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="80" y1="30" x2="80" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="90" y1="30" x2="90" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="100" y1="30" x2="100" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="110" y1="30" x2="110" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="120" y1="26" x2="120" y2="42" stroke="#1F3A5C" stroke-width="1.6"/><line x1="130" y1="30" x2="130" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="140" y1="30" x2="140" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="150" y1="30" x2="150" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="160" y1="30" x2="160" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="170" y1="30" x2="170" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="180" y1="30" x2="180" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="190" y1="30" x2="190" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="200" y1="30" x2="200" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="210" y1="30" x2="210" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="220" y1="26" x2="220" y2="42" stroke="#1F3A5C" stroke-width="1.6"/><line x1="230" y1="30" x2="230" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="240" y1="30" x2="240" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="250" y1="30" x2="250" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="260" y1="30" x2="260" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="270" y1="30" x2="270" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="280" y1="30" x2="280" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="290" y1="30" x2="290" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="300" y1="30" x2="300" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="310" y1="30" x2="310" y2="38" stroke="#1F3A5C" stroke-width="1"/><line x1="320" y1="26" x2="320" y2="42" stroke="#1F3A5C" stroke-width="1.6"/><text x="20" y="56" font-size="11" text-anchor="middle">0</text><text x="120" y="56" font-size="11" text-anchor="middle">1</text><text x="220" y="56" font-size="11" text-anchor="middle">2</text><text x="320" y="56" font-size="11" text-anchor="middle">3</text><circle cx="250" cy="34" r="3.5" fill="#E35D3A"/><text x="250" y="20" font-size="12" font-weight="700" fill="#E35D3A" text-anchor="middle">R</text><circle cx="100" cy="34" r="3.5" fill="#E35D3A"/><text x="100" y="20" font-size="12" font-weight="700" fill="#E35D3A" text-anchor="middle">S</text></svg></div></div>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Pour le nombre 62,489, donne : <b>a.</b> le chiffre des centièmes ; <b>b.</b> le nombre de centièmes. Explique la différence entre les deux réponses.
    <button type="button" class="exo-correction-toggle" data-target="c6-n3-c5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c6-n3-c5"><div><p style="margin:0 0 6px;"><b>a.</b> Le chiffre des centièmes est <b>8</b> (le deuxième chiffre après la virgule).</p><p style="margin:0 0 6px;"><b>b.</b> Le nombre de centièmes est <b>6 248</b> : 62,489 = 6 248 centièmes + 9 millièmes (6 248 × 0,01 = 62,48).</p><p style="margin:0 0 6px;">Le chiffre des centièmes est un seul chiffre, à une position ; le nombre de centièmes compte tous les centièmes contenus dans le nombre : on lit tous les chiffres jusqu'à cette position.</p></div></div>
  </div>
</div>
`;

/* ---- Méthodes : placer un point d'abscisse donnée, lire l'abscisse d'un point (axe gradué), avec ou sans 0 --
   demandé : « expliquer le placement d'un point avec son abscisse sur un axe gradué. Avec la présence de 0 ou pas.
   Dans les deux sens, lire et placer ». La figure évolue à chaque étape (stepAvecFig). ---- */
// o = { n : nombre d'intervalles ; lab : {graduation: texte} ; hl : graduations repérées à entourer ;
//       acc : [i0, i1, texte] accolade (la valeur d'une graduation) ; gras : [i0, i1] (une unité) ;
//       sauts : [i0, i1] (les bonds comptés) ; pt : [i, nom, texte sous le point] ; origine : texte en début d'axe }
function ndAxeFig(o){
  const n = o.n, w = 300 / n, X = i => 22 + i * w, Y = 70, K = '#1F3A5C', OR = '#E35D3A', VE = '#1E7B34';
  let g = `<line x1="10" y1="${Y}" x2="${X(n) + 16}" y2="${Y}" stroke="${K}" stroke-width="1.8"/><path d="M${X(n) + 20},${Y} l-8,-4 v8 z" fill="${K}"/>`;
  if(o.gras) g += `<line x1="${X(o.gras[0])}" y1="${Y}" x2="${X(o.gras[1])}" y2="${Y}" stroke="#2EA8C9" stroke-width="6" stroke-linecap="round" opacity=".7"/>`;
  for(let i = 0; i <= n; i++){ const lab = o.lab && o.lab[i] != null; g += `<line x1="${X(i)}" y1="${Y - (lab ? 9 : 5)}" x2="${X(i)}" y2="${Y + (lab ? 9 : 5)}" stroke="${K}" stroke-width="${lab ? 1.8 : 1}"/>`; }
  Object.entries(o.lab || {}).forEach(([i, t]) => { const on = (o.hl || []).includes(+i);
    g += (on ? `<rect x="${X(+i) - 20}" y="${Y + 12}" width="40" height="21" rx="10" fill="#FFF3D6" stroke="#E9A21C" stroke-width="1.4"/>` : '') + `<text x="${X(+i)}" y="${Y + 28}" font-size="14" font-weight="700" text-anchor="middle" fill="${K}">${t}</text>`; });
  if(o.acc){ const [a, b, t] = o.acc; g += `<path d="M${X(a)},${Y - 14} q0,-8 8,-8 h${X(b) - X(a) - 16} q8,0 8,8" fill="none" stroke="${VE}" stroke-width="1.6"/><text x="${(X(a) + X(b)) / 2}" y="${Y - 27}" font-size="13" font-weight="700" text-anchor="middle" fill="${VE}">${t}</text>`; }
  if(o.sauts){ const [a, b] = o.sauts, d = a < b ? 1 : -1; for(let i = a, k = 1; i !== b; i += d, k++) g += `<path d="M${X(i)},${Y - 3} q${w / 2 * d},-16 ${w * d},0" fill="none" stroke="${OR}" stroke-width="1.5"/><text x="${X(i) + w / 2 * d}" y="${Y - 17}" font-size="11" font-weight="700" text-anchor="middle" fill="${OR}">${k}</text>`; }
  if(o.pt){ const [i, nom, t] = o.pt; g += `<path d="M${X(i) - 5},${Y - 5} L${X(i) + 5},${Y + 5} M${X(i) - 5},${Y + 5} L${X(i) + 5},${Y - 5}" stroke="${OR}" stroke-width="2.6" stroke-linecap="round"/><text x="${X(i)}" y="${Y - 30}" font-size="17" font-weight="700" text-anchor="middle" fill="${OR}">${nom}</text>` + (t ? `<text x="${X(i)}" y="${Y + 48}" font-size="14" font-weight="700" text-anchor="middle" fill="${OR}">${t}</text>` : ''); }
  if(o.origine) g += `<text x="12" y="${Y - 54}" font-size="12" fill="#7A4FC0">${o.origine}</text>`;
  return `<svg viewBox="0 0 350 126" style="width:100%;min-width:300px;max-width:460px;display:block;">${g}</svg>`;
}
// Placer A(1,7) : axe de 0 à 3, unité partagée en 10.
const ND_PL0 = { n: 30, lab: { 0: '0', 10: '1', 20: '2', 30: '3' } };
const ND_PLACER0_STEPS = [
  { expr: 'Placer le point A d\'abscisse 1,7.', note: "L'axe commence à 0 : c'est l'origine. On repère d'abord les nombres écrits sous l'axe.", fig: ndAxeFig(ND_PL0) },
  { expr: 'Une unité (de 0 à 1) est partagée en 10 : une graduation vaut 1 ÷ 10 = 0,1.', note: "On compte les intervalles (les « sauts ») entre 0 et 1, pas les traits : il y en a 10.", fig: ndAxeFig(Object.assign({ acc: [0, 10, '10 sauts : 1 unité'], gras: [0, 10] }, ND_PL0)) },
  { expr: '1,7 = 1 + 0,7 = 1 + 7 × 0,1', note: "On décompose l'abscisse : la partie entière 1, puis 7 dixièmes.", fig: ndAxeFig(Object.assign({ hl: [10] }, ND_PL0)) },
  { expr: 'On part de 1 et on avance de 7 graduations.', note: "Chaque saut vaut 0,1 : 1,1 ; 1,2 ; … ; 1,7.", fig: ndAxeFig(Object.assign({ hl: [10], sauts: [10, 17] }, ND_PL0)) },
  { expr: 'On place le point A : A(1,7).', note: "On marque le point d'une croix et on écrit son nom. On vérifie : A est entre 1 et 2, plus près de 2.", fig: ndAxeFig(Object.assign({ pt: [17, 'A', '1,7'] }, ND_PL0)) },
];
const ndPlacer0Demo = makeStepDemo(ND_PLACER0_STEPS, 'ndPlacer0Display');
// Placer B(2,47) : l'axe commence à 2,4 (pas de 0), graduations de 0,01.
const ND_PLS = { n: 20, lab: { 0: '2,4', 10: '2,5', 20: '2,6' }, origine: '0 n\'est pas sur l\'axe' };
const ND_PLACERSANS0_STEPS = [
  { expr: 'Placer le point B d\'abscisse 2,47.', note: "Ici, l'axe ne commence pas à 0 : on ne peut pas compter depuis l'origine.", fig: ndAxeFig(ND_PLS) },
  { expr: 'On repère deux nombres écrits qui se suivent : 2,4 et 2,5.', note: "Ce sont eux qui donnent la valeur d'une graduation.", fig: ndAxeFig(Object.assign({ hl: [0, 10] }, ND_PLS)) },
  { expr: 'Écart : 2,5 − 2,4 = 0,1, partagé en 10 sauts : une graduation vaut 0,1 ÷ 10 = 0,01.', note: "Valeur d'une graduation = écart entre deux nombres écrits ÷ nombre de sauts entre eux.", fig: ndAxeFig(Object.assign({ hl: [0, 10], acc: [0, 10, '10 sauts : 0,1'] }, ND_PLS)) },
  { expr: '2,47 = 2,4 + 0,07 = 2,4 + 7 × 0,01', note: "On part du nombre écrit juste avant 2,47 : c'est 2,4.", fig: ndAxeFig(Object.assign({ hl: [0] }, ND_PLS)) },
  { expr: 'On part de 2,4 et on avance de 7 graduations.', note: "2,41 ; 2,42 ; … ; 2,47.", fig: ndAxeFig(Object.assign({ hl: [0], sauts: [0, 7] }, ND_PLS)) },
  { expr: 'On place le point B : B(2,47).', note: "Vérification : B est entre 2,4 et 2,5, plus près de 2,5 (2,47 est proche de 2,5).", fig: ndAxeFig(Object.assign({ pt: [7, 'B', '2,47'] }, ND_PLS)) },
];
const ndPlacerSans0Demo = makeStepDemo(ND_PLACERSANS0_STEPS, 'ndPlacerSans0Display');
// Lire C : axe de 0 à 2, unité partagée en 5 (graduation 0,2).
const ND_L0 = { n: 10, lab: { 0: '0', 5: '1', 10: '2' } };
const ND_LIRE0_STEPS = [
  { expr: 'Quelle est l\'abscisse du point C ?', note: "L'axe commence à 0. On cherche d'abord la valeur d'une graduation.", fig: ndAxeFig(Object.assign({ pt: [7, 'C'] }, ND_L0)) },
  { expr: 'De 0 à 1, il y a 5 sauts : une graduation vaut 1 ÷ 5 = 0,2.', note: "Attention : ici, une graduation ne vaut pas 0,1 ! On compte toujours les sauts dans une unité.", fig: ndAxeFig(Object.assign({ pt: [7, 'C'], acc: [0, 5, '5 sauts : 1 unité'], gras: [0, 5] }, ND_L0)) },
  { expr: 'C est 2 graduations après 1.', note: "On part du nombre écrit le plus proche avant C : 1.", fig: ndAxeFig(Object.assign({ pt: [7, 'C'], hl: [5], sauts: [5, 7] }, ND_L0)) },
  { expr: '1 + 2 × 0,2 = 1 + 0,4 = 1,4', note: "On ajoute la valeur des sauts au nombre de départ.", fig: ndAxeFig(Object.assign({ pt: [7, 'C', '1,4'], hl: [5], sauts: [5, 7] }, ND_L0)) },
  { expr: 'L\'abscisse de C est 1,4 : C(1,4).', note: "On écrit le nom du point, puis son abscisse entre parenthèses.", fig: ndAxeFig(Object.assign({ pt: [7, 'C', '1,4'] }, ND_L0)) },
];
const ndLire0Demo = makeStepDemo(ND_LIRE0_STEPS, 'ndLire0Display');
// Lire D : l'axe commence à 7,5 (pas de 0), graduation 0,1, D après 8.
const ND_LS = { n: 10, lab: { 0: '7,5', 5: '8', 10: '8,5' }, origine: '0 n\'est pas sur l\'axe' };
const ND_LIRESANS0_STEPS = [
  { expr: 'Quelle est l\'abscisse du point D ?', note: "Il n'y a pas de 0 sur l'axe : on ne compte pas depuis le début de l'axe.", fig: ndAxeFig(Object.assign({ pt: [8, 'D'] }, ND_LS)) },
  { expr: 'On repère deux nombres écrits : 7,5 et 8.', note: "Ils se suivent sur l'axe.", fig: ndAxeFig(Object.assign({ pt: [8, 'D'], hl: [0, 5] }, ND_LS)) },
  { expr: 'Écart : 8 − 7,5 = 0,5, partagé en 5 sauts : une graduation vaut 0,5 ÷ 5 = 0,1.', note: "Valeur d'une graduation = écart ÷ nombre de sauts.", fig: ndAxeFig(Object.assign({ pt: [8, 'D'], hl: [0, 5], acc: [0, 5, '5 sauts : 0,5'] }, ND_LS)) },
  { expr: 'D est 3 graduations après 8.', note: "On part du nombre écrit le plus proche avant D : 8.", fig: ndAxeFig(Object.assign({ pt: [8, 'D'], hl: [5], sauts: [5, 8] }, ND_LS)) },
  { expr: '8 + 3 × 0,1 = 8 + 0,3 = 8,3', note: "On ajoute la valeur des sauts au nombre de départ.", fig: ndAxeFig(Object.assign({ pt: [8, 'D', '8,3'], hl: [5], sauts: [5, 8] }, ND_LS)) },
  { expr: 'L\'abscisse de D est 8,3 : D(8,3).', note: "Vérification : D est entre 8 et 8,5 ; 8,3 aussi.", fig: ndAxeFig(Object.assign({ pt: [8, 'D', '8,3'] }, ND_LS)) },
];
const ndLireSans0Demo = makeStepDemo(ND_LIRESANS0_STEPS, 'ndLireSans0Display');

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
  {expr:'Nombre de dixièmes = 841', note:"C'est le nombre total de dixièmes complets contenus dans 84,153 (on lit tous les chiffres situés à gauche de cette position, elle comprise)."},
  {expr:'Vérification : 841 × 0,1 = 84,1', note:"84,153 = 84,1 + 0,053. Il y a bien 841 dixièmes complets dans 84,153 (il reste 0,053)."},
  {expr:'Chiffre des centièmes = 5 &nbsp;·&nbsp; Nombre de centièmes = 8 415', note:"Même distinction, une position plus loin : 8 415 × 0,01 = 84,15, et 84,153 = 84,15 + 0,003."},
];
const ndChiffreNombreDemo = makeStepDemo(ND_CHIFFRE_NOMBRE_STEPS, 'nd-chiffreNombreDisplay');

DEMO_REGISTRY['6e|Nombres décimaux'] = {
  cours:'cours-demo-decimaux-6e', methode:'methode-demo-decimaux-6e', exos:'exos-demo-decimaux-6e', histoire:'histoire-demo-decimaux-6e',
  init:()=>{
    ndInitDemiDroiteDrag();
    ndPlacer0Demo.reset(); ndPlacerSans0Demo.reset(); ndLire0Demo.reset(); ndLireSans0Demo.reset();
    ndComparerDemo.reset();
    ndDecomposerDemo.reset();
    ndChiffreNombreDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-decimaux-6e'));
    renderStaticMath(document.getElementById('exos-demo-decimaux-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-decimaux-6e')); injectCourseAddButtons(document.getElementById('methode-demo-decimaux-6e'));
  }
};

DEMO_QUIZZES['6e|Nombres décimaux'] = [
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

/* ============================================================
   CHAPITRE : Proportionnalité (5e, P1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Ne couvre que les sections « Tableau de proportionnalité » et « Caractérisation
   graphique » : la section « Pourcentage » du manuel (mêmes pages) est un chapitre
   à part dans la progression (P1 Pourcentages, plus tard dans l'année) et sera
   traitée séparément le moment venu.
   ============================================================ */

/* Petit traceur de graphique en repère (axes, quadrillage, points reliés en
   pointillés) pour la caractérisation graphique de la proportionnalité. */
function ppChart(opts){
  const w = opts.w||260, h = opts.h||210;
  const mL=32, mR=14, mT=16, mB=26;
  const plotW = w-mL-mR, plotH = h-mT-mB;
  const xMax = opts.xMax, yMax = opts.yMax;
  const toX = x => mL + (x/xMax)*plotW;
  const toY = y => (h-mB) - (y/yMax)*plotH;
  let grid = '';
  for(let gx=0; gx<=xMax+1e-9; gx+=opts.xStep){
    const px = toX(gx);
    grid += `<line x1="${px}" y1="${mT}" x2="${px}" y2="${h-mB}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
    grid += `<text x="${px}" y="${h-mB+15}" font-size="10" text-anchor="middle" fill="#5B6B78">${Math.round(gx)}</text>`;
  }
  for(let gy=0; gy<=yMax+1e-9; gy+=opts.yStep){
    const py = toY(gy);
    grid += `<line x1="${mL}" y1="${py}" x2="${w-mR}" y2="${py}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
    if(gy>0) grid += `<text x="${mL-6}" y="${py+3}" font-size="10" text-anchor="end" fill="#5B6B78">${Math.round(gy)}</text>`;
  }
  const axis = `<line x1="${mL}" y1="${h-mB}" x2="${w-mR}" y2="${h-mB}" stroke="#1C1B2E" stroke-width="1.4"/>
    <line x1="${mL}" y1="${mT}" x2="${mL}" y2="${h-mB}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  const pathPts = opts.points.map(p=>`${toX(p.x).toFixed(1)},${toY(p.y).toFixed(1)}`).join(' ');
  const line = `<polyline points="${pathPts}" fill="none" stroke="${opts.color||'#1F6B3A'}" stroke-width="1.6" stroke-dasharray="5,4"/>`;
  const marks = opts.points.map(p=>{
    const px=toX(p.x), py=toY(p.y), s=4;
    return `<line x1="${(px-s).toFixed(1)}" y1="${(py-s).toFixed(1)}" x2="${(px+s).toFixed(1)}" y2="${(py+s).toFixed(1)}" stroke="${opts.color||'#1F6B3A'}" stroke-width="1.6"/><line x1="${(px-s).toFixed(1)}" y1="${(py+s).toFixed(1)}" x2="${(px+s).toFixed(1)}" y2="${(py-s).toFixed(1)}" stroke="${opts.color||'#1F6B3A'}" stroke-width="1.6"/>`;
  }).join('');
  const yLabel = opts.yLabel ? `<text x="${mL}" y="${mT-3}" font-size="10" fill="#1C1B2E">${opts.yLabel}</text>` : '';
  const xLabel = opts.xLabel ? `<text x="${w-mR}" y="${h-mB-6}" font-size="10" text-anchor="end" fill="#1C1B2E">${opts.xLabel}</text>` : '';
  return `<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${w}px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    ${grid}${axis}${line}${marks}${yLabel}${xLabel}
  </svg>`;
}

document.getElementById('cours-demo-proportionnalite-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Tableau de proportionnalité</h3></div>

<p class="example-title" style="margin-top:0;">A. Définition</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un tableau de nombres à deux lignes est un <b>tableau de proportionnalité</b> quand les nombres de la seconde ligne s'obtiennent en multipliant les nombres correspondants de la première ligne par un même nombre non nul, appelé <b>coefficient de proportionnalité</b>.</div>

<p style="margin:14px 0 6px;"><b>Exemples</b> : ces tableaux sont-ils des tableaux de proportionnalité ?</p>
<div style="display:flex;flex-wrap:wrap;gap:20px;">
  <div style="flex:1;min-width:240px;">
    <table style="border-collapse:collapse;width:100%;text-align:center;font-size:.88rem;margin:0 0 8px;">
      <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Côté</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">2 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">3 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 cm</td></tr>
      <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Périmètre du carré</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">8 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">12 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">20 cm</td></tr>
    </table>
    <p style="margin:4px 0;">Les quotients <span class="tex">\\dfrac{8}{2}</span>, <span class="tex">\\dfrac{12}{3}</span> et <span class="tex">\\dfrac{20}{5}</span> sont tous égaux à 4.</p>
    <p style="margin:4px 0;">Donc ce tableau est un tableau de proportionnalité.</p>
  </div>
  <div style="flex:1;min-width:240px;">
    <table style="border-collapse:collapse;width:100%;text-align:center;font-size:.88rem;margin:0 0 8px;">
      <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Côté</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">2 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">3 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 cm</td></tr>
      <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Aire du carré</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">4 cm²</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">9 cm²</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">25 cm²</td></tr>
    </table>
    <p style="margin:4px 0;">Les quotients <span class="tex">\\dfrac{4}{2}</span>, <span class="tex">\\dfrac{9}{3}</span> et <span class="tex">\\dfrac{25}{5}</span> ne sont pas tous égaux (2, puis 3, puis 5).</p>
    <p style="margin:4px 0;">Donc ce tableau n'est pas un tableau de proportionnalité.</p>
  </div>
</div>

<p class="example-title" style="margin-top:22px;">B. Compléter un tableau de proportionnalité</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Dans un tableau de proportionnalité, on peut compléter la (les) valeur(s) manquante(s) en utilisant plusieurs méthodes : ① le retour à l'unité ; ② les propriétés de linéarité ; ③ le coefficient de proportionnalité.</div>

<p style="margin:14px 0 6px;"><b>Exemple</b> : une voiture consomme 5 L pour parcourir 100 km. Complète le tableau de proportionnalité suivant.</p>
<table style="border-collapse:collapse;width:100%;max-width:420px;text-align:center;font-size:.88rem;margin:0 0 14px;">
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Distance parcourue</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">100 km</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">250 km</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">350 km</td></tr>
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Consommation</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 L</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">?</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">?</td></tr>
</table>

<p style="margin:10px 0 4px;">① À l'aide du retour à l'unité :</p>
<p style="margin:2px 0;">Quand la voiture parcourt 1 km, elle consomme <span class="tex">\\dfrac{5}{100} = 0,05</span> L.</p>
<p style="margin:2px 0;">Quand la voiture parcourt 250 km, elle consomme 250 fois plus, soit <span class="tex">250 \\times 0,05</span> L = 12,5 L.</p>
<p style="margin:2px 0 14px;">Quand la voiture parcourt 350 km, elle consomme 350 fois plus, soit <span class="tex">350 \\times 0,05</span> L = 17,5 L.</p>

<p style="margin:10px 0 4px;">② À l'aide des propriétés de linéarité :</p>
<p style="margin:2px 0;">100 km × 2,5 = 250 km, donc 5 L × 2,5 = 12,5 L.</p>
<p style="margin:2px 0 14px;">100 km + 250 km = 350 km, donc 5 L + 12,5 L = 17,5 L.</p>

<p style="margin:10px 0 4px;">③ À l'aide du coefficient de proportionnalité :</p>
<p style="margin:2px 0 14px;">Le coefficient de proportionnalité est <span class="tex">\\dfrac{5}{100} = 0,05</span>. On multiplie chaque distance par 0,05 pour obtenir la consommation correspondante.</p>

<table style="border-collapse:collapse;width:100%;max-width:420px;text-align:center;font-size:.88rem;margin:0 0 16px;">
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Distance parcourue</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">100 km</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">250 km</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">350 km</td></tr>
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Consommation</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 L</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);font-weight:700;color:var(--accent-orange);">12,5 L</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);font-weight:700;color:var(--accent-orange);">17,5 L</td></tr>
</table>

<div class="lesson-header"><span class="num">2</span><h3>Caractérisation graphique de la proportionnalité</h3></div>

<span class="prop-badge">Propriété 1</span>
<div class="def-box">Une situation de proportionnalité est représentée graphiquement dans un repère par des <b>points alignés avec l'origine du repère</b>.</div>

<p style="margin:14px 0 6px;"><b>Exemple</b> : un plan a une échelle de 1/500.</p>
<table style="border-collapse:collapse;width:100%;max-width:420px;text-align:center;font-size:.88rem;margin:0 0 10px;">
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Sur le plan</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">0 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">1 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">2 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">3 cm</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">4 cm</td></tr>
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Dans la réalité</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">0 m</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 m</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">10 m</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">15 m</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">20 m</td></tr>
</table>
<div class="figure-wrap">${ppChart({points:[{x:0,y:0},{x:1,y:5},{x:2,y:10},{x:3,y:15},{x:4,y:20}], xMax:4, yMax:20, xStep:1, yStep:5, xLabel:'en cm', yLabel:'en m'})}</div>
<p style="margin:10px 0 14px;">On représente cette situation de proportionnalité dans un repère : les points sont alignés avec l'origine du repère.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Réciproquement, si une situation est représentée graphiquement dans un repère par des <b>points alignés avec l'origine du repère</b> alors c'est une <b>situation de proportionnalité</b>.</div>

<p class="hint" style="margin:10px 0 14px;">Remarque : donc si une situation n'est pas représentée graphiquement dans un repère par des points alignés avec l'origine du repère alors ce n'est pas une situation de proportionnalité.</p>

<p style="margin:14px 0 8px;"><b>Exemples</b> : ces graphiques représentent-ils des situations de proportionnalité ?</p>
<div style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center;">
  <div style="flex:1;min-width:200px;max-width:240px;text-align:center;">
    ${ppChart({points:[{x:0,y:0},{x:1,y:5},{x:2,y:10},{x:3,y:15},{x:4,y:20}], xMax:4, yMax:20, xStep:1, yStep:5, xLabel:'en cm', yLabel:'en m'})}
    <p style="margin:8px 0;"><b>Oui</b>, ce graphique représente une situation de proportionnalité : les points sont alignés avec l'origine du repère.</p>
  </div>
  <div style="flex:1;min-width:200px;max-width:240px;text-align:center;">
    ${ppChart({points:[{x:0,y:5},{x:1,y:8.75},{x:2,y:12.5},{x:3,y:16.25},{x:4,y:20}], xMax:4, yMax:20, xStep:1, yStep:5, xLabel:'en cm', yLabel:'en m'})}
    <p style="margin:8px 0;"><b>Non</b>, ce graphique ne représente pas une situation de proportionnalité : les points sont alignés mais pas avec l'origine du repère.</p>
  </div>
  <div style="flex:1;min-width:200px;max-width:240px;text-align:center;">
    ${ppChart({points:[{x:0,y:10},{x:1,y:22},{x:2,y:30},{x:3,y:35},{x:4,y:38}], xMax:4, yMax:40, xStep:1, yStep:10, color:'#9E1F5E'})}
    <p style="margin:8px 0;"><b>Non</b>, ce graphique ne représente pas une situation de proportionnalité : les points ne sont pas alignés.</p>
  </div>
</div>
`;

/* ================= METHODE : jeu d'association grandeur / unité ================= */
const PP_PAIRS = [
  ['Longueur','m'], ['Durée','s'], ['Masse','kg'], ['Prix','€'], ['Volume','L'], ['Aire','m²'],
];
let ppGameSelectedCard = null;
let ppGameFound = 0;
function ppShuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function ppGameReset(){
  ppGameSelectedCard = null;
  ppGameFound = 0;
  const gCol = ppShuffle(PP_PAIRS.map(p=>p[0]));
  const uCol = ppShuffle(PP_PAIRS.map(p=>p[1]));
  const board = document.getElementById('pgame-board');
  board.innerHTML = `
    <div class="pgame-col">${gCol.map(g=>`<div class="pgame-card" data-role="g" data-val="${g}">${g}</div>`).join('')}</div>
    <div class="pgame-col">${uCol.map(u=>`<div class="pgame-card" data-role="u" data-val="${u}">${u}</div>`).join('')}</div>
  `;
  board.querySelectorAll('.pgame-card').forEach(card=>card.addEventListener('click', ()=>ppGameClick(card)));
  document.getElementById('pgame-status').textContent = `0 / ${PP_PAIRS.length} paires trouvées.`;
}
function ppGameClick(card){
  if(card.classList.contains('matched')) return;
  if(!ppGameSelectedCard){
    document.querySelectorAll('.pgame-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    ppGameSelectedCard = card;
    return;
  }
  if(ppGameSelectedCard===card){ card.classList.remove('selected'); ppGameSelectedCard=null; return; }
  if(ppGameSelectedCard.dataset.role===card.dataset.role){
    document.querySelectorAll('.pgame-card').forEach(c=>c.classList.remove('selected'));
    card.classList.add('selected');
    ppGameSelectedCard = card;
    return;
  }
  const gCard = ppGameSelectedCard.dataset.role==='g' ? ppGameSelectedCard : card;
  const uCard = ppGameSelectedCard.dataset.role==='u' ? ppGameSelectedCard : card;
  const pair = PP_PAIRS.find(p=>p[0]===gCard.dataset.val);
  if(pair && pair[1]===uCard.dataset.val){
    gCard.classList.remove('selected'); gCard.classList.add('matched');
    uCard.classList.add('matched');
    ppGameFound++;
    document.getElementById('pgame-status').textContent = `${ppGameFound} / ${PP_PAIRS.length} paires trouvées.` + (ppGameFound===PP_PAIRS.length ? ' Bravo, terminé !' : '');
  } else {
    gCard.classList.add('wrong'); uCard.classList.add('wrong');
    setTimeout(()=>{ gCard.classList.remove('wrong','selected'); uCard.classList.remove('wrong'); }, 500);
  }
  ppGameSelectedCard = null;
}

document.getElementById('methode-demo-proportionnalite-5e').innerHTML = `
<p class="example-title" style="margin-top:0;">Grandeur et unité</p>
<span class="def-badge">Définition</span>
<div class="def-box">
  Une <b>grandeur</b> est ce que l'on peut mesurer (une longueur, une durée, un prix, une masse, un volume, une aire...). Une <b>unité</b> permet d'exprimer la mesure d'une grandeur.
</div>
<table style="border-collapse:collapse;width:100%;max-width:420px;text-align:center;font-size:.88rem;margin:12px 0 16px;">
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Grandeur</th><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Exemple d'unité</th></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Longueur</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">m (mètre)</td></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Durée</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">s (seconde)</td></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Masse</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">kg (kilogramme)</td></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Prix</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">€ (euro)</td></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Volume</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">L (litre)</td></tr>
  <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">Aire</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">m² (mètre carré)</td></tr>
</table>

<p class="example-title">Jeu : associe chaque grandeur à son unité</p>
<p class="hint interaction-hint" style="margin:0 0 10px;">Clique sur une grandeur, puis sur l'unité qui lui correspond.</p>
<div class="pgame-board" id="pgame-board"></div>
<p class="hint" id="pgame-status" style="margin:10px 0;"></p>
<button class="btn secondary" onclick="ppGameReset()">Recommencer</button>

<p class="example-title" style="margin-top:26px;">Méthode : le produit en croix</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">
  On considère deux grandeurs A et B proportionnelles. On connaît une valeur initiale de A associée à une valeur initiale de B, ainsi qu'un objectif pour B. Pour trouver la nouvelle valeur de A qui correspond à cet objectif :
</div>
<div style="text-align:center;margin:14px 0;font-size:1.05rem;">
  <span class="tex">A_{nouveau} = A_{initial} \\times \\dfrac{B_{objectif}}{B_{initial}}</span>
</div>

<p style="margin:14px 0 6px;"><b>Exemple</b> : une voiture consomme 5 L pour parcourir 100 km. Quelle est sa consommation pour 250 km ?</p>
<p style="margin:2px 0;">La grandeur A à faire évoluer est la consommation (5 L pour une distance initiale de 100 km). La grandeur B est la distance, avec un objectif de 250 km.</p>
<table style="border-collapse:collapse;width:100%;max-width:360px;text-align:center;font-size:.9rem;margin:10px 0 8px;">
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Distance (B)</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">100 km</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">250 km</td></tr>
  <tr><th style="padding:6px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Consommation (A)</th><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5 L</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);font-weight:700;color:var(--accent-orange);">?</td></tr>
</table>
<p style="margin:8px 0;"><span class="tex">A_{nouveau} = 5 \\times \\dfrac{250}{100} = 5 \\times 2,5 = 12,5</span> L.</p>

<p class="example-title" style="margin-top:26px;">Autre méthode : l'association linéaire en tableau</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">On peut organiser les 4 valeurs (2 valeurs de A, 2 valeurs de B) dans un tableau à deux lignes, et relier en diagonale les deux valeurs connues au nombre cherché : on multiplie en diagonale, puis on divise par la valeur restante.</div>
<table style="border-collapse:collapse;width:100%;max-width:320px;text-align:center;font-size:.95rem;margin:12px auto;">
  <tr><th style="padding:8px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Grandeur A</th><td style="padding:8px;border:1px solid rgba(28,43,57,.2);">5</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);font-weight:700;color:var(--accent-orange);">?</td></tr>
  <tr><th style="padding:8px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);text-align:left;">Grandeur B</th><td style="padding:8px;border:1px solid rgba(28,43,57,.2);">100</td><td style="padding:8px;border:1px solid rgba(28,43,57,.2);">250</td></tr>
</table>
<p style="margin:8px 0;">On multiplie en diagonale les deux valeurs opposées à la case « ? » (5 et 250), puis on divise par la 4e valeur (100) : <span class="tex">\\dfrac{5 \\times 250}{100} = 12,5</span>.</p>
`;


/* ================= EXERCICES ================= */
document.getElementById('exos-demo-proportionnalite-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un tableau n'est pas un tableau de proportionnalité »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : Voici un tableau de nombres. Justifie qu'il ne s'agit pas d'un tableau de proportionnalité.</p>
  <table style="border-collapse:collapse;max-width:320px;text-align:center;font-size:.88rem;margin:0 0 12px;">
    <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">3</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">8</td></tr>
    <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">12</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">20</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">31</td></tr>
  </table>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">\\dfrac{12}{3} = 4</span> et <span class="tex">\\dfrac{20}{5} = 4</span>, mais <span class="tex">\\dfrac{31}{8} = 3,875</span>.</span><span class="we-comment">Ce que je sais : je calcule les quotients.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> dans un tableau de proportionnalité, tous les quotients doivent être égaux.</span><span class="we-comment">On énonce la propriété (contraposée de la définition).</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> ce tableau n'est pas un tableau de proportionnalité.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Une recette pour 4 personnes nécessite 200 g de farine. Complète pour 6 personnes et pour 10 personnes, en indiquant la méthode utilisée.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Recopie et complète ce tableau de proportionnalité, puis donne son coefficient de proportionnalité.
    <table style="border-collapse:collapse;max-width:320px;text-align:center;font-size:.88rem;margin:8px 0 0;">
      <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">4</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">7</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">…</td></tr>
      <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">10</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">…</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">27,5</td></tr>
    </table>
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Un graphique représente une situation par des points alignés, mais qui ne passent pas par l'origine du repère. Cette situation est-elle une situation de proportionnalité ? Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Justifie que le tableau suivant n'est pas un tableau de proportionnalité.
    <table style="border-collapse:collapse;max-width:320px;text-align:center;font-size:.88rem;margin:8px 0 0;">
      <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">2</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">5</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">6</td></tr>
      <tr><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">6</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">15</td><td style="padding:6px;border:1px solid rgba(28,43,57,.2);">19</td></tr>
    </table>
  </div>
</div>
`;

DEMO_REGISTRY['Proportionnalité'] = {
  cours:'cours-demo-proportionnalite-5e', methode:'methode-demo-proportionnalite-5e', exos:'exos-demo-proportionnalite-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proportionnalite-5e'));
    renderStaticMath(document.getElementById('methode-demo-proportionnalite-5e'));
    renderStaticMath(document.getElementById('exos-demo-proportionnalite-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-proportionnalite-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-proportionnalite-5e'));
    ppGameReset();
  }
};

DEMO_QUIZZES['Proportionnalité'] = [
  {q:"Dans un tableau de proportionnalité, que doit-on obtenir en divisant chaque nombre de la 2e ligne par le nombre correspondant de la 1re ligne ?",
   opts:["Toujours le même résultat","Des résultats différents à chaque fois","Toujours 1"], correct:0},
  {q:"Une situation de proportionnalité est représentée dans un repère par...",
   opts:["Des points alignés, quels qu'ils soient","Des points alignés avec l'origine du repère","Une courbe quelconque"], correct:1},
  {q:"Un graphique montre des points alignés, mais qui ne passent pas par l'origine du repère. S'agit-il d'une situation de proportionnalité ?",
   opts:["Oui, l'origine n'a pas d'importance","Non","On ne peut pas savoir"], correct:1},
];

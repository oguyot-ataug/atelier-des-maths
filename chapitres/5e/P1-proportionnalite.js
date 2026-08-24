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

document.getElementById('histoire-demo-proportionnalite-5e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Selon une légende rapportée par plusieurs auteurs antiques, le savant grec Thalès (6e siècle av. J.-C.) aurait mesuré la hauteur de la grande pyramide d'Égypte sans même y monter, en utilisant un simple bâton planté dans le sol : il aurait attendu le moment où l'ombre du bâton était égale à sa propre hauteur, sachant qu'à cet instant précis, l'ombre de la pyramide serait elle aussi égale à sa hauteur. Les historiens doutent aujourd'hui que Thalès soit vraiment l'inventeur de cette idée (les Babyloniens et les Égyptiens connaissaient déjà ce principe de proportionnalité), mais l'anecdote reste un bel exemple de la puissance de ces méthodes : mesurer un objet immense sans y toucher.
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

function ppEvolFrac(strike){
  const km = strike ? '<s>km</s>' : 'km';
  return '<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 4px;font-size:.95rem;">'
       +'<span style="border-bottom:1.5px solid #1C1B2E;padding:0 6px;"><span style="color:var(--accent-orange);font-weight:700;">250</span> '+km+'</span>'
       +'<span style="padding:0 6px;"><span style="color:var(--accent);font-weight:700;">100</span> '+km+'</span>'
       +'</span>';
}
const PP_EVOL_STEPS = [
  {expr:'On note C la consommation cherchée pour 250 km.',
   note:"On cherche une consommation. Donc on va faire évoluer la consommation initiale (5 L)."},
  {expr:'C = 5 L &times; ( ... / ... )',
   note:"On pose l'écriture : la valeur initiale, multipliée par une fraction."},
  {expr:'C = 5 L &times; '+ppEvolFrac(false),
   note:"La fraction représente l'évolution de la distance : au numérateur la valeur à atteindre, au dénominateur la donnée initiale."},
  {expr:'C = 5 L &times; '+ppEvolFrac(true),
   note:"Les unités km sont les mêmes en haut et en bas : elles se simplifient."},
  {expr:'C = 5 L &times; 2,5',
   note:"On calcule le quotient : 250 : 100 = 2,5."},
  {expr:'C = 12,5 L',
   note:"On termine le calcul, sans oublier l'unité. La consommation pour 250 km est donc 12,5 L."},
];
const ppEvolDemo = makeStepDemo(PP_EVOL_STEPS, 'ppEvolDisplay');

/* ================= METHODE : association dans un tableau (addition puis différence) ================= */
function ppArrowHead(x,y,angleDeg,size,color){
  size = size||6;
  const a = angleDeg*Math.PI/180;
  const b1 = {x:x-size*Math.cos(a-0.45), y:y-size*Math.sin(a-0.45)};
  const b2 = {x:x-size*Math.cos(a+0.45), y:y-size*Math.sin(a+0.45)};
  return `<polygon points="${x},${y} ${b1.x.toFixed(1)},${b1.y.toFixed(1)} ${b2.x.toFixed(1)},${b2.y.toFixed(1)}" fill="${color}"/>`;
}
/* Flèches AU-DESSUS de la ligne (utilisé pour la 1ère ligne du tableau) : partent du bord
   supérieur des deux cellules connues et pointent vers le bas, dans la 3e cellule. */
function ppLinArrowsAbove(c1,c2,c3,topY,label,color){
  const apexY = topY-38;
  return `<line x1="${c1}" y1="${topY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c2}" y1="${topY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c3}" y1="${apexY}" x2="${c3}" y2="${topY-2}" stroke="${color}" stroke-width="1.5"/>
    ${ppArrowHead(c3, topY, 90, 6, color)}
    <text x="${c3}" y="${apexY-6}" font-size="13" text-anchor="middle" fill="${color}" font-weight="700">${label}</text>`;
}
/* Flèches EN DESSOUS de la ligne (utilisé pour la 2e ligne du tableau) : partent du bord
   inférieur des deux cellules connues et pointent vers le haut, dans la 3e cellule. */
function ppLinArrowsBelow(c1,c2,c3,bottomY,label,color){
  const apexY = bottomY+38;
  return `<line x1="${c1}" y1="${bottomY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c2}" y1="${bottomY}" x2="${c3}" y2="${apexY}" stroke="${color}" stroke-width="1.5"/>
    <line x1="${c3}" y1="${apexY}" x2="${c3}" y2="${bottomY+2}" stroke="${color}" stroke-width="1.5"/>
    ${ppArrowHead(c3, bottomY, -90, 6, color)}
    <text x="${c3}" y="${apexY+15}" font-size="13" text-anchor="middle" fill="${color}" font-weight="700">${label}</text>`;
}
function ppLinCell(x,y,val,highlight){
  return `<rect x="${x-45}" y="${y-22}" width="90" height="44" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <text x="${x}" y="${y+5}" font-size="15" text-anchor="middle" fill="${highlight?'var(--accent-orange)':'#1C1B2E'}" font-weight="${highlight?'700':'400'}">${val}</text>`;
}
function ppLinLabelCell(y, text){
  const x0=10, w=140;
  return `<rect x="${x0}" y="${y-22}" width="${w}" height="44" fill="rgba(31,58,92,.06)" stroke="#1C1B2E" stroke-width="1.3"/>
    <text x="${x0+w/2}" y="${y+5}" font-size="13" text-anchor="middle" fill="#1C1B2E" font-weight="700">${text}</text>`;
}
function ppLinBuildSvg(id, valsA, valsB, unknownIsA, labelA, labelB, showArrowsA, showArrowsB){
  const c1=205,c2=305,c3=405, yA=84, yB=128;
  let s = `<svg id="${id}" viewBox="0 0 465 224" style="width:100%;max-width:440px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += ppLinLabelCell(yA, 'Grandeur A');
  s += ppLinLabelCell(yB, 'Grandeur B');
  s += ppLinCell(c1,yA,valsA[0]) + ppLinCell(c2,yA,valsA[1]) + ppLinCell(c3,yA,valsA[2], unknownIsA);
  s += ppLinCell(c1,yB,valsB[0]) + ppLinCell(c2,yB,valsB[1]) + ppLinCell(c3,yB,valsB[2], !unknownIsA);
  if(showArrowsA) s += ppLinArrowsAbove(c1,c2,c3,yA-22,labelA,'#1F6B3A');
  if(showArrowsB) s += ppLinArrowsBelow(c1,c2,c3,yB+22,labelB,'#1F6B3A');
  s += `</svg>`;
  return s;
}

let ppLin1Step = 0;
function ppLin1Render(step){
  document.getElementById('pplin1-wrap').innerHTML = ppLinBuildSvg('pplin1-svg', [5,3,8], [100,60, step>=2?160:'?'], false, '5 + 3', '100 + 60', step>=1, step>=2);
  document.querySelectorAll('#pplin1-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('pplin1-next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pplin1-next').disabled = step>=2;
}
function ppLin1Next(){ if(ppLin1Step<2){ ppLin1Step++; ppLin1Render(ppLin1Step); } }
function ppLin1Reset(){ ppLin1Step=0; ppLin1Render(0); }
const PPLIN1_STEPS = [
  {note:"On considère A = 8. On veut trouver la valeur de B qui lui correspond."},
  {note:"On remarque que 8 = 5 + 3."},
  {note:"On applique la même addition à B : 100 + 60 = 160."},
];

let ppLin2Step = 0;
function ppLin2Render(step){
  document.getElementById('pplin2-wrap').innerHTML = ppLinBuildSvg('pplin2-svg', [5,3, step>=2?2:'?'], [100,60,40], true, '5 \u2212 3', '100 \u2212 60', step>=2, step>=1);
  document.querySelectorAll('#pplin2-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('pplin2-next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('pplin2-next').disabled = step>=2;
}
function ppLin2Next(){ if(ppLin2Step<2){ ppLin2Step++; ppLin2Render(ppLin2Step); } }
function ppLin2Reset(){ ppLin2Step=0; ppLin2Render(0); }
const PPLIN2_STEPS = [
  {note:"On considère B = 40. On veut trouver la valeur de A qui lui correspond."},
  {note:"On remarque que 40 = 100 − 60."},
  {note:"On applique la même soustraction à A : 5 − 3 = 2."},
];

document.getElementById('methode-demo-proportionnalite-5e').innerHTML = `
<p class="example-title" style="margin-top:0;">Grandeur et unité</p>
<span class="def-badge">Définition</span>
<div class="def-box">
  Une <b>grandeur</b> est ce que l'on peut mesurer (une longueur, une durée, un prix, une masse, un volume, une aire...). Une <b>unité</b> permet d'exprimer la mesure d'une grandeur.
</div>
<p style="margin:10px 0 0;">Par exemple, une <b>température</b> est une grandeur, et elle peut s'exprimer dans l'unité <b>°C</b> (degré Celsius).</p>

<p class="example-title">Jeu : associe chaque grandeur à son unité</p>
<p class="hint interaction-hint" style="margin:0 0 10px;">Clique sur une grandeur, puis sur l'unité qui lui correspond.</p>
<div class="pgame-board" id="pgame-board"></div>
<p class="hint" id="pgame-status" style="margin:10px 0;"></p>
<button class="btn secondary" onclick="ppGameReset()">Recommencer</button>

<p class="example-title" style="margin-top:26px;">Évolution d'une grandeur</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">
  On connaît une valeur initiale de deux grandeurs A et B associées, ainsi qu'un objectif pour B. On veut faire évoluer A pour atteindre cet objectif.
</div>

<p style="margin:14px 0 10px;"><b>Exemple</b> : une voiture consomme <span style="color:var(--accent);font-weight:700;">5 L</span> pour parcourir <span style="color:var(--accent);font-weight:700;">100 km</span>. Quelle est sa consommation pour <span style="color:var(--accent-orange);font-weight:700;">250 km</span> ?</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le calcul.</p>
  <div class="step-display" id="ppEvolDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ppEvolDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ppEvolDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Autre méthode : l'association dans un tableau</p>
<span class="prop-badge">Méthode</span>
<div class="def-box">Quand on connaît <b>deux paires</b> de valeurs associées, on peut parfois passer de l'une à l'autre par une opération simple, et appliquer cette même opération sur l'autre grandeur.</div>

<p style="margin:14px 0 6px;"><b>Exemple</b> : on connaît les paires (5 ; 100) et (3 ; 60). On cherche la valeur de B associée à A = 8.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="pplin1-wrap"></div>
  <div class="step-list" id="pplin1-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On considère A = 8. On veut trouver B.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On remarque que 8 = 5 + 3.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On applique la même addition à B : 100 + 60 = 160.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pplin1-next" onclick="ppLin1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ppLin1Reset()">Recommencer</button>
  </div>
</div>

<p style="margin:22px 0 6px;"><b>Autre exemple</b> : toujours avec (5 ; 100) et (3 ; 60), on cherche cette fois la valeur de A associée à B = 40.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="pplin2-wrap"></div>
  <div class="step-list" id="pplin2-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On considère B = 40. On veut trouver A.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On remarque que 40 = 100 − 60.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On applique la même soustraction à A : 5 − 3 = 2.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pplin2-next" onclick="ppLin2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ppLin2Reset()">Recommencer</button>
  </div>
</div>
`;


/* ================= EXERCICES ================= */
document.getElementById('exos-demo-proportionnalite-5e').innerHTML = `
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

DEMO_REGISTRY['5e|Proportionnalité'] = {
  cours:'cours-demo-proportionnalite-5e', methode:'methode-demo-proportionnalite-5e', exos:'exos-demo-proportionnalite-5e', histoire:'histoire-demo-proportionnalite-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proportionnalite-5e'));
    renderStaticMath(document.getElementById('methode-demo-proportionnalite-5e'));
    renderStaticMath(document.getElementById('exos-demo-proportionnalite-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-proportionnalite-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-proportionnalite-5e'));
    ppGameReset();
    ppEvolDemo.reset();
    ppLin1Reset(); ppLin2Reset();
    registerGeoStepDemo('pplin1-svg', { steps:()=>PPLIN1_STEPS, getIdx:()=>ppLin1Step, goto:(i)=>{ ppLin1Step=i; ppLin1Render(i); } });
    registerGeoStepDemo('pplin2-svg', { steps:()=>PPLIN2_STEPS, getIdx:()=>ppLin2Step, goto:(i)=>{ ppLin2Step=i; ppLin2Render(i); } });
  }
};

DEMO_QUIZZES['5e|Proportionnalité'] = [
  {q:"Dans un tableau de proportionnalité, que doit-on obtenir en divisant chaque nombre de la 2e ligne par le nombre correspondant de la 1re ligne ?",
   opts:["Toujours le même résultat","Des résultats différents à chaque fois","Toujours 1"], correct:0},
  {q:"Une situation de proportionnalité est représentée dans un repère par...",
   opts:["Des points alignés, quels qu'ils soient","Des points alignés avec l'origine du repère","Une courbe quelconque"], correct:1},
  {q:"Un graphique montre des points alignés, mais qui ne passent pas par l'origine du repère. S'agit-il d'une situation de proportionnalité ?",
   opts:["Oui, l'origine n'a pas d'importance","Non","On ne peut pas savoir"], correct:1},
];

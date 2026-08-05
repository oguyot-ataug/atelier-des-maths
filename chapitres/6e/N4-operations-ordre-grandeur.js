/* ============================================================
   CHAPITRE : Opérations et ordre de grandeur (6e, N4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   La division posée décimale s'inspire du même gabarit que la division
   euclidienne posée du chapitre "Nombres entiers" (6e, N1) : lignes
   cumulées, quotient qui se construit chiffre par chiffre, note explicative
   à chaque étape.
   ============================================================ */

/* ---- Division posée décimale : 57 ÷ 8 = 7,125 (exacte) ----
   Colonnes ABSOLUES en valeur de position (pas une boîte à largeur fixe par
   ligne) : le reste d'une soustraction reste dans la colonne qu'il occupait
   (unités, dixièmes...), et chaque chiffre abaissé prend la colonne suivante
   à droite. C'est ce qui fait qu'ici, "1" (reste de 57-56) reste sous les
   unités, et le "0" abaissé va dans la colonne des dixièmes juste à côté --
   au lieu d'un bloc "10" recalé au même endroit que "57".
   Colonnes : 0=signe/dizaines, 1=unités, 2=dixièmes, 3=centièmes, 4=millièmes. */
const OG_CELL_W = 20;
const OG_NCOLS = 7;
function ogCells(map){
  let out = '';
  for(let i=0;i<OG_NCOLS;i++){
    const c = map[i];
    out += `<span style="display:inline-block;width:${OG_CELL_W}px;text-align:center;">${c?c:''}</span>`;
  }
  return out;
}
function ogRow(map, sub){
  const border = sub ? `border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;` : '';
  return `<div style="width:${OG_CELL_W*OG_NCOLS}px;${border}">${ogCells(map)}</div>`;
}
const OG_DP_57  = {0:'5', 1:'7'};
const OG_DP_M56 = {'-1':'−', 0:'5', 1:'6'};
const OG_DP_10  = {1:'1', 2:'0'};
const OG_DP_M8  = {1:'−', 2:'8'};
const OG_DP_20  = {2:'2', 3:'0'};
const OG_DP_M16 = {1:'−', 2:'1', 3:'6'};
const OG_DP_40  = {3:'4', 4:'0'};
const OG_DP_M40 = {2:'−', 3:'4', 4:'0'};
const OG_DP_0   = {4:'0'};
/* décale tous les indices d'un tableau de +2 pour rester dans une plage positive (0..5) */
function ogShift(map){ const r={}; for(const k in map) r[(+k)+2]=map[k]; return r; }
const OG_57s=ogShift(OG_DP_57), OG_M56s=ogShift(OG_DP_M56), OG_10s=ogShift(OG_DP_10), OG_M8s=ogShift(OG_DP_M8),
      OG_20s=ogShift(OG_DP_20), OG_M16s=ogShift(OG_DP_M16), OG_40s=ogShift(OG_DP_40), OG_M40s=ogShift(OG_DP_M40), OG_0s=ogShift(OG_DP_0);
const OG_DIVISION_POSEE_STEPS = [
  {rows:[{t:OG_57s}], quotient:'', note:"57 ÷ 8 : 8 × 7 = 56 est le plus proche de 57 sans le dépasser."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true}], quotient:'7', note:"57 − 56 = 1. Le 1 reste sous la colonne des unités. Le reste n'est pas nul : la division continue."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s}], quotient:'7,', note:"On abaisse un chiffre des dixièmes (0) : dès cet instant, on place la virgule au quotient. Le reste 1 (unités) et le 0 abaissé (dixièmes) forment 10."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true}], quotient:'7,1', note:"10 ÷ 8 : 8 × 1 = 8 est le plus proche de 10 sans le dépasser. 10 − 8 = 2 (colonne des dixièmes)."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true},{t:OG_20s}], quotient:'7,1', note:"On abaisse un nouveau 0 (colonne des centièmes) : le reste 2 devient 20."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true},{t:OG_20s},{t:OG_M16s,sub:true}], quotient:'7,12', note:"20 ÷ 8 : 8 × 2 = 16 est le plus proche de 20 sans le dépasser. 20 − 16 = 4 (colonne des centièmes)."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true},{t:OG_20s},{t:OG_M16s,sub:true},{t:OG_40s}], quotient:'7,12', note:"On abaisse un nouveau 0 (colonne des millièmes) : le reste 4 devient 40."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true},{t:OG_20s},{t:OG_M16s,sub:true},{t:OG_40s},{t:OG_M40s,sub:true}], quotient:'7,125', note:"40 ÷ 8 = 5 exactement (8 × 5 = 40). 40 − 40 = 0."},
  {rows:[{t:OG_57s},{t:OG_M56s,sub:true},{t:OG_10s},{t:OG_M8s,sub:true},{t:OG_20s},{t:OG_M16s,sub:true},{t:OG_40s},{t:OG_M40s,sub:true},{t:OG_0s}], quotient:'7,125', note:"Le reste est 0 : la division est terminée. 57 ÷ 8 = 7,125 (valeur exacte)."},
];
let ogDivisionPoseeIdx = 0;
function ogRenderDivisionPosee(){
  const s = OG_DIVISION_POSEE_STEPS[ogDivisionPoseeIdx];
  document.getElementById('og-dpLeft').innerHTML = s.rows.map(r=>ogRow(r.t, r.sub)).join('');
  document.getElementById('og-dpQuotient').innerHTML = s.quotient;
  document.getElementById('og-dpNote').textContent = s.note;
  const isLastStep = ogDivisionPoseeIdx === OG_DIVISION_POSEE_STEPS.length-1;
  document.getElementById('og-dpResteTag').textContent = isLastStep ? '↑ reste' : '';
}
function ogDivisionPoseeNext(){ if(ogDivisionPoseeIdx<OG_DIVISION_POSEE_STEPS.length-1) ogDivisionPoseeIdx++; ogRenderDivisionPosee(); }
function ogDivisionPoseeReset(){ ogDivisionPoseeIdx=0; ogRenderDivisionPosee(); }

/* ---- Addition/soustraction posées : colonnes absolues calées sur la virgule ----
   Colonnes : 0=signe, 1=dizaines, 2=unités, 3=virgule, 4=dixièmes, 5=centièmes.
   Comme pour la division, on n'aligne jamais par simple "text-align:right" (qui
   ne garantit pas du tout que les virgules tombent dans la même colonne dès
   que les nombres n'ont pas le même nombre de chiffres après la virgule). */
const OG_ADD_NCOLS = 6;
function ogAddCells(map){
  let out = '';
  for(let i=0;i<OG_ADD_NCOLS;i++){
    const c = map[i];
    out += `<span style="display:inline-block;width:${OG_CELL_W}px;text-align:center;">${c?c:''}</span>`;
  }
  return out;
}
function ogAddRow(map, topline){
  const border = topline ? 'border-top:1.5px solid #1C1B2E;padding-top:2px;' : '';
  return `<div style="width:${OG_CELL_W*OG_ADD_NCOLS}px;${border}">${ogAddCells(map)}</div>`;
}
function ogAddBlock(rows){
  return `<div style="font-family:'JetBrains Mono',monospace;font-size:1.15rem;">${rows.map(r=>ogAddRow(r.m, r.top)).join('')}</div>`;
}
const OG_ADD_WELL = [
  {m:{2:'9', 3:',', 4:'4'}},
  {m:{0:'+', 2:'0', 3:',', 4:'6', 5:'3'}},
  {m:{0:'+', 1:'1', 2:'2'}},
  {m:{0:'=', 1:'2', 2:'2', 3:',', 4:'0', 5:'3'}, top:true},
];
/* Erreur classique : 12 est aligné à droite sans tenir compte des unités --
   le 1 tombe sur la colonne des unités et le 2 sur celle des dixièmes (aucune
   virgule n'est écrite), au lieu du 1 en dizaines et du 2 en unités. */
const OG_ADD_BAD = [
  {m:{2:'9', 3:',', 4:'4'}},
  {m:{0:'+', 2:'0', 3:',', 4:'6', 5:'3'}},
  {m:{0:'+', 2:'1', 4:'2'}},
];
const OG_SUB_15 = [
  {m:{1:'1', 2:'5', 3:',', 4:'0'}},
  {m:{0:'−', 2:'6', 3:',', 4:'3'}},
  {m:{0:'=', 2:'8', 3:',', 4:'7'}, top:true},
];

document.getElementById('cours-demo-operations-ordre-grandeur-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Addition et soustraction de nombres décimaux</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour poser et effectuer une <b>addition</b> ou une <b>soustraction</b> de nombres décimaux, on place les nombres les uns en dessous des autres, de sorte que les <b>virgules soient alignées verticalement</b>.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> :</p>
<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start;">
  <div>
    ${ogAddBlock(OG_ADD_WELL)}
    <p class="hint" style="text-align:center;margin:2px 0;">Addition bien posée</p>
  </div>
  <div>
    <div style="color:#9E1F5E;">${ogAddBlock(OG_ADD_BAD)}</div>
    <p class="hint" style="text-align:center;margin:2px 0;color:#9E1F5E;">Addition mal posée (virgules non alignées)</p>
  </div>
</div>
<p style="margin:14px 0 6px;">Pour poser la soustraction 15 − 6,3, on place les nombres correctement et on ajoute un zéro pour que les deux nombres aient le même nombre de chiffres dans leur partie décimale (en effet, 15 = 15,0).</p>
${ogAddBlock(OG_SUB_15)}

<div class="lesson-header"><span class="num">2</span><h3>Multiplication et division par 10 ; 100 ; 1 000</h3></div>
<div style="display:flex;flex-wrap:wrap;gap:24px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Pour multiplier par :</th><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">le chiffre des unités devient :</th></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">10</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des dizaines.</td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">100</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des centaines.</td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">1 000</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des milliers.</td></tr>
  </table>
  <div>
    <p style="margin:0 0 4px;"><b>Exemples</b> :</p>
    <p style="margin:2px 0;">0,58 &times; 10 = 5,8</p>
    <p style="margin:2px 0;">24 &times; 100 = 24,00 &times; 100 = 2 400</p>
    <p style="margin:2px 0;">6,371 &times; 1 000 = 6 371</p>
  </div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:14px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Pour diviser par :</th><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">le chiffre des unités devient :</th></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">10</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des dixièmes.</td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">100</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des centièmes.</td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">1 000</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">le chiffre des millièmes.</td></tr>
  </table>
  <div>
    <p style="margin:0 0 4px;"><b>Exemples</b> :</p>
    <p style="margin:2px 0;">84 ÷ 10 = 84,0 ÷ 10 = 8,4</p>
    <p style="margin:2px 0;">305,2 ÷ 100 = 3,052</p>
    <p style="margin:2px 0;">9 ÷ 1 000 = 0009 ÷ 1 000 = 0,009</p>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Multiplication de deux nombres décimaux</h3></div>
<p class="example-title" style="margin-top:0;">A. Multiplication par 0,1 ; 0,01 ; 0,001</p>
<div style="display:flex;flex-wrap:wrap;gap:24px;">
  <table style="border-collapse:collapse;font-size:.92rem;">
    <tr><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Multiplier par :</th><th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">c'est diviser par :</th></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">0,1</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">10, <span style="color:var(--ink-soft);">0,1 = <span class="tex">\\dfrac{1}{10}</span></span></td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">0,01</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">100, <span style="color:var(--ink-soft);">0,01 = <span class="tex">\\dfrac{1}{100}</span></span></td></tr>
    <tr><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">0,001</td><td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">1 000, <span style="color:var(--ink-soft);">0,001 = <span class="tex">\\dfrac{1}{1000}</span></span></td></tr>
  </table>
  <div>
    <p style="margin:0 0 4px;"><b>Exemples</b> :</p>
    <p style="margin:2px 0;">64 &times; 0,1 = 6,4</p>
    <p style="margin:2px 0;">4,2 &times; 0,01 = 004,2 &times; 0,01 = 0,042</p>
    <p style="margin:2px 0;">38 &times; 0,001 = 0038 &times; 0,001 = 0,038</p>
  </div>
</div>

<p class="example-title" style="margin-top:22px;">B. Multiplication de deux nombres décimaux</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour effectuer la multiplication de deux nombres décimaux,
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>on effectue d'abord <b>la multiplication sans tenir compte des virgules</b> ;</li>
    <li>on <b>place la virgule</b> dans le produit en comptant le nombre total de chiffres après la virgule dans les deux facteurs.</li>
  </ul>
</div>
<p style="margin:12px 0 8px;"><b>Exemple</b> : effectue la multiplication de 1,25 par 3,4.</p>
<p style="margin:2px 0;">On effectue la multiplication de 125 par 34, sans les virgules : <span class="tex">125 \\times 34 = 4 250</span>.</p>
<p style="margin:2px 0;">Le facteur 1,25 a deux chiffres après la virgule. Le facteur 3,4 a un chiffre après la virgule. On doit donc placer la virgule dans le produit de telle sorte qu'il y ait <span class="tex">2 + 1 = 3</span> chiffres après la virgule.</p>
<p style="margin:2px 0;">Finalement, <span class="tex">1,25 \\times 3,4 = 4,250 = 4,25</span>.</p>

<div class="lesson-header"><span class="num">4</span><h3>Division d'un nombre décimal par un nombre entier</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Effectuer la <b>division décimale</b> de deux nombres, c'est trouver la valeur exacte ou une valeur approchée du <b>quotient</b> de ces deux nombres.</div>

<p style="margin:12px 0 8px;"><b>Exemple 1</b> : effectue la division de 57 par 8.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la division posée.</p>
  <div style="display:flex;justify-content:center;align-items:flex-start;gap:0;font-family:'JetBrains Mono',monospace;font-size:1.25rem;padding:20px 10px;background:var(--white);border-radius:8px;border:1px solid rgba(28,43,57,.1);">
    <div style="text-align:right;padding-left:30px;padding-right:40px;">
      <div class="dp-tag" style="color:var(--accent);">dividende</div>
      <div id="og-dpLeft" style="line-height:2;min-width:140px;margin-left:auto;"></div>
      <div class="dp-tag" id="og-dpResteTag" style="color:#9E1F5E;min-height:1.1em;"></div>
    </div>
    <div style="border-left:2px solid #1C1B2E;padding-left:16px;">
      <div class="dp-tag" style="color:var(--accent-orange);">diviseur</div>
      <div style="line-height:2;"><span style="display:inline-block;border-bottom:1.5px solid #1C1B2E;padding-bottom:2px;">8</span></div>
      <div style="display:flex;align-items:baseline;gap:8px;line-height:2;margin-top:6px;">
        <div id="og-dpQuotient" style="font-weight:700;"></div>
        <span class="dp-tag" style="color:#1F6B3A;white-space:nowrap;">← quotient</span>
      </div>
    </div>
  </div>
  <div class="step-note" id="og-dpNote" style="text-align:center;margin-top:10px;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ogDivisionPoseeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogDivisionPoseeReset()">Recommencer</button>
  </div>
</div>
<p class="hint" style="margin:8px 0 0;">57 est la <b>valeur exacte</b> du dividende : 57 ÷ 8 = 7,125 exactement (le reste finit par tomber à 0).</p>

<p style="margin:18px 0 8px;"><b>Exemple 2</b> : effectue la division de 5,3 par 9.</p>
<p style="margin:2px 0;">On pose la division comme précédemment. Le quotient commence par 0, puis 5, puis 8, puis 8, puis 8… Les chiffres 8 se répètent indéfiniment : cette division ne s'arrête jamais.</p>
<p style="margin:2px 0;">On donne alors une <b>valeur approchée</b> du quotient, à la précision demandée. Au millième, 5,3 ÷ 9 ≈ 0,589.</p>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  Remarque : l'algorithme de certaines divisions posées ne s'arrête jamais, comme pour 5,3 ÷ 9.
</div>

<p style="margin:18px 0 8px;"><b>Exemple 3</b> : Farid a payé 42,50 € pour 25 L d'essence. Quel est le prix d'un litre d'essence ?</p>
<p style="margin:2px 0;">Pour résoudre ce genre de problème, on peut utiliser la calculatrice.</p>
<p style="margin:2px 0;">On tape sur la calculatrice : <span style="font-family:'JetBrains Mono',monospace;background:rgba(28,43,57,.06);padding:2px 6px;border-radius:4px;">4 2 . 5 0 ÷ 2 5 =</span> et on lit <b>1,7</b>. Un litre d'essence coûte donc 1,70 €.</p>
`;

/* ================= METHODE ================= */
/* Tableau de valeurs de position : milliers…millièmes, avec une frontière fixe
   (la virgule) entre la colonne des unités et celle des dixièmes. On ne fait
   jamais bouger la virgule : ce sont les CHIFFRES qui changent de colonne. */
const OG_PV_COLS = ['milliers','centaines','dizaines','unités','dixièmes','centièmes','millièmes'];
const OG_PV_NCOLS = 7;
const OG_PV_CELL_W = 50;
function ogPvHeader(hi){
  return `<div style="display:flex;">${OG_PV_COLS.map((label,i)=>
    `<div style="width:${OG_PV_CELL_W}px;text-align:center;font-size:.6rem;line-height:1.15;font-weight:700;color:${i===hi?'var(--accent-orange)':'var(--ink-soft)'};${i===3?'border-right:2px dashed #1C1B2E;':''}">${label}</div>`
  ).join('')}</div>`;
}
function ogPvRow(map, hi){
  let out = `<div style="display:flex;font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:700;">`;
  for(let i=0;i<OG_PV_NCOLS;i++){
    const d = map[i]||'';
    const bg = i===hi ? 'background:rgba(255,130,8,.18);' : '';
    out += `<div style="width:${OG_PV_CELL_W}px;text-align:center;border-radius:6px;${bg}${i===3?'border-right:2px dashed #1C1B2E;':''}">${d}</div>`;
  }
  out += `</div>`;
  return out;
}
function ogPvTable(id, map, hi){
  return `<div id="${id}" style="overflow-x:auto;padding:6px 0;">${ogPvHeader(hi)}${ogPvRow(map, hi)}</div>`;
}

/* ---- Méthode A : multiplier par 10, 100 ou 1 000 -- 13,567 × 100 ---- */
const OG_MA_BEFORE = {2:'1', 3:'3', 4:'5', 5:'6', 6:'7'}; // 13,567 : dizaines=1, unités=3, dixièmes=5, centièmes=6, millièmes=7
const OG_MA_AFTER  = {0:'1', 1:'3', 2:'5', 3:'6', 4:'7'}; // 1356,7 : le chiffre des unités (3) devient le chiffre des centaines
const OG_MA_STEPS = [
  {note:"On repère le chiffre des unités du nombre 13,567 : c'est le 3.", hi:3, map:OG_MA_BEFORE},
  {note:"On multiplie par 100 : le chiffre des unités (3) va devenir le chiffre des centaines.", hi:3, map:OG_MA_BEFORE},
  {note:"On réécrit tous les chiffres à leur nouvelle place, dans le même ordre. Le nouveau chiffre des unités est le 6.", hi:3, map:OG_MA_AFTER},
  {note:"13,567 × 100 = 1 356,7.", hi:3, map:OG_MA_AFTER, final:true},
];
let ogMaIdx = 0;
function ogRenderMa(){
  const s = OG_MA_STEPS[ogMaIdx];
  document.getElementById('og-ma-table').innerHTML = ogPvTable('og-ma-inner', s.map, s.hi);
  document.getElementById('og-ma-note').textContent = s.note;
  document.querySelectorAll('#og-ma-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogMaIdx));
  const btn = document.getElementById('og-ma-next');
  btn.textContent = ogMaIdx>=OG_MA_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogMaIdx>=OG_MA_STEPS.length-1;
}
function ogMaNext(){ if(ogMaIdx<OG_MA_STEPS.length-1) ogMaIdx++; ogRenderMa(); }
function ogMaReset(){ ogMaIdx=0; ogRenderMa(); }

/* ---- Méthode B : multiplier par 0,1 ; 0,01 ou 0,001 -- 24 × 0,1 ---- */
const OG_MB_BEFORE = {2:'2', 3:'4'}; // 24 : dizaines=2, unités=4
const OG_MB_AFTER  = {3:'2', 4:'4'}; // 2,4 : le chiffre des unités (4) devient le chiffre des dixièmes
const OG_MB_STEPS = [
  {note:"On repère le chiffre des unités du nombre 24 : c'est le 4.", hi:3, map:OG_MB_BEFORE},
  {note:"On multiplie par 0,1 : le chiffre des unités (4) va devenir le chiffre des dixièmes.", hi:3, map:OG_MB_BEFORE},
  {note:"On réécrit tous les chiffres à leur nouvelle place, dans le même ordre. Le nouveau chiffre des unités est le 2.", hi:3, map:OG_MB_AFTER},
  {note:"24 × 0,1 = 2,4.", hi:3, map:OG_MB_AFTER, final:true},
];
let ogMbIdx = 0;
function ogRenderMb(){
  const s = OG_MB_STEPS[ogMbIdx];
  document.getElementById('og-mb-table').innerHTML = ogPvTable('og-mb-inner', s.map, s.hi);
  document.getElementById('og-mb-note').textContent = s.note;
  document.querySelectorAll('#og-mb-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogMbIdx));
  const btn = document.getElementById('og-mb-next');
  btn.textContent = ogMbIdx>=OG_MB_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogMbIdx>=OG_MB_STEPS.length-1;
}
function ogMbNext(){ if(ogMbIdx<OG_MB_STEPS.length-1) ogMbIdx++; ogRenderMb(); }
function ogMbReset(){ ogMbIdx=0; ogRenderMb(); }

/* ---- Méthode C : arrondir un nombre décimal ----
   On repère le chiffre au rang demandé (orange), puis le chiffre juste après
   (teal) qui sert à décider : 0-4 → on ne change rien ; 5-9 → on augmente le
   chiffre repéré de 1 (avec parfois une retenue en cascade). */
function ogRoundRow(map, target, decision){
  let out = `<div style="display:flex;font-family:'JetBrains Mono',monospace;font-size:1.3rem;font-weight:700;">`;
  for(let i=0;i<OG_PV_NCOLS;i++){
    const d = map[i]||'';
    let bg = '';
    if(i===target) bg = 'background:rgba(255,130,8,.20);';
    else if(i===decision) bg = 'background:rgba(38,170,177,.22);';
    out += `<div style="width:${OG_PV_CELL_W}px;text-align:center;border-radius:6px;${bg}${i===3?'border-right:2px dashed #1C1B2E;':''}">${d}</div>`;
  }
  out += `</div>`;
  return out;
}
function ogRoundTable(map, target, decision){
  return `<div style="overflow-x:auto;padding:6px 0;">${ogPvHeader(target)}${ogRoundRow(map, target, decision)}</div>`;
}
/* Exemple 1 : arrondis 27,342 au dixième (le chiffre suivant, 4, est < 5 : on ne change rien). */
const OG_R1_STEPS = [
  {note:"On veut arrondir 27,342 au dixième. On repère le chiffre des dixièmes : 3.", map:{2:'2',3:'7',4:'3',5:'4',6:'2'}, target:4, decision:-1},
  {note:"On regarde le chiffre juste après (le chiffre des centièmes) : 4.", map:{2:'2',3:'7',4:'3',5:'4',6:'2'}, target:4, decision:5},
  {note:"4 est inférieur à 5 : on ne change rien au chiffre des dixièmes, et on supprime tout ce qui suit.", map:{2:'2',3:'7',4:'3'}, target:4, decision:-1},
  {note:"27,342 ≈ 27,3 (arrondi au dixième).", map:{2:'2',3:'7',4:'3'}, target:4, decision:-1, final:true},
];
let ogR1Idx = 0;
function ogRenderR1(){
  const s = OG_R1_STEPS[ogR1Idx];
  document.getElementById('og-r1-table').innerHTML = ogRoundTable(s.map, s.target, s.decision);
  document.getElementById('og-r1-note').textContent = s.note;
  document.querySelectorAll('#og-r1-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogR1Idx));
  const btn = document.getElementById('og-r1-next');
  btn.textContent = ogR1Idx>=OG_R1_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogR1Idx>=OG_R1_STEPS.length-1;
}
function ogR1Next(){ if(ogR1Idx<OG_R1_STEPS.length-1) ogR1Idx++; ogRenderR1(); }
function ogR1Reset(){ ogR1Idx=0; ogRenderR1(); }

/* Exemple 2 : arrondis 9,96 à l'unité (le chiffre suivant, 9, est ≥ 5 : on
   augmente le chiffre des unités de 1, ce qui provoque une retenue car 9+1=10). */
const OG_R2_STEPS = [
  {note:"On veut arrondir 9,96 à l'unité. On repère le chiffre des unités : 9.", map:{3:'9',4:'9',5:'6'}, target:3, decision:-1},
  {note:"On regarde le chiffre juste après (le chiffre des dixièmes) : 9.", map:{3:'9',4:'9',5:'6'}, target:3, decision:4},
  {note:"9 est 5 ou plus : il faut augmenter le chiffre des unités de 1. Attention : 9 + 1 = 10, cela provoque une retenue sur le chiffre des dizaines !", map:{2:'1',3:'0'}, target:3, decision:-1},
  {note:"9,96 ≈ 10 (arrondi à l'unité).", map:{2:'1',3:'0'}, target:3, decision:-1, final:true},
];
let ogR2Idx = 0;
function ogRenderR2(){
  const s = OG_R2_STEPS[ogR2Idx];
  document.getElementById('og-r2-table').innerHTML = ogRoundTable(s.map, s.target, s.decision);
  document.getElementById('og-r2-note').textContent = s.note;
  document.querySelectorAll('#og-r2-steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=ogR2Idx));
  const btn = document.getElementById('og-r2-next');
  btn.textContent = ogR2Idx>=OG_R2_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →';
  btn.disabled = ogR2Idx>=OG_R2_STEPS.length-1;
}
function ogR2Next(){ if(ogR2Idx<OG_R2_STEPS.length-1) ogR2Idx++; ogRenderR2(); }
function ogR2Reset(){ ogR2Idx=0; ogRenderR2(); }

document.getElementById('methode-demo-operations-ordre-grandeur-6e').innerHTML = `
<p class="example-title" style="margin-top:0;">Multiplier par 10, 100 ou 1 000 : repérer le chiffre des unités</p>
<p style="margin:0 0 14px;">Plutôt que de "décaler la virgule" sans réfléchir, on peut repérer le chiffre des <b>unités</b> et se demander quel chiffre il devient une fois l'opération effectuée.</p>
<p style="margin:0 0 8px;"><b>Exemple</b> : calcule 13,567 × 100.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-ma-table"></div>
  <div class="step-note" id="og-ma-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-ma-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des unités.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>×100 : le chiffre des unités devient le chiffre des centaines.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On réécrit tous les chiffres à leur nouvelle place.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 1 356,7.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-ma-next" onclick="ogMaNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogMaReset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Multiplier par 0,1 ; 0,01 ou 0,001 : la même méthode, dans l'autre sens</p>
<p style="margin:0 0 14px;">Le chiffre des unités devient cette fois un chiffre après la virgule (dixièmes, centièmes...).</p>
<p style="margin:0 0 8px;"><b>Exemple</b> : calcule 24 × 0,1.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-mb-table"></div>
  <div class="step-note" id="og-mb-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-mb-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des unités.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>×0,1 : le chiffre des unités devient le chiffre des dixièmes.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On réécrit tous les chiffres à leur nouvelle place.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 2,4.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-mb-next" onclick="ogMbNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogMbReset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Arrondir un nombre décimal</p>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour arrondir un nombre à un rang donné, on repère le chiffre de ce rang, puis on regarde le chiffre juste après.
  <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8;">
    <li>S'il vaut <b>0, 1, 2, 3 ou 4</b>, on ne change rien au chiffre repéré, et on supprime tout ce qui suit.</li>
    <li>S'il vaut <b>5, 6, 7, 8 ou 9</b>, on augmente le chiffre repéré de 1 (avec parfois une retenue), et on supprime tout ce qui suit.</li>
  </ul>
</div>

<p class="example-title" style="margin-top:22px;">Troncature, arrondi par défaut, arrondi par excès</p>
<div class="def-box">
  <b>Troncature</b> : on supprime tous les chiffres après le rang demandé, sans regarder le chiffre suivant.<br>
  <b>Arrondi par défaut</b> : la valeur, à ce rang, la plus proche du nombre tout en restant <b>inférieure ou égale</b>.<br>
  <b>Arrondi par excès</b> : la valeur, à ce rang, la plus proche du nombre tout en restant <b>supérieure ou égale</b>.
</div>
<p style="margin:12px 0 8px;">Pour un nombre positif, la troncature et l'arrondi par défaut donnent toujours la même valeur. L'arrondi "classique" (au plus proche), lui, correspond tantôt à l'arrondi par défaut, tantôt à l'arrondi par excès, selon le chiffre suivant.</p>
<p style="margin:0 0 8px;"><b>Exemple</b> : pour le nombre 8,6427 :</p>
<table style="border-collapse:collapse;width:100%;font-size:.88rem;margin:0 0 16px;">
  <tr>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Rang</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Troncature</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi par défaut</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi par excès</th>
    <th style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:rgba(31,58,92,.06);">Arrondi (au plus proche)</th>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">à l'unité</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">9</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">9</td>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">au dixième</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,6</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,6</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,7</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">8,6</td>
  </tr>
  <tr>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);">au centième</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,64</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,64</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;">8,65</td>
    <td style="padding:6px 10px;border:1px solid rgba(28,43,57,.2);text-align:center;font-weight:700;color:var(--accent-orange);">8,64</td>
  </tr>
</table>
<p class="hint" style="margin:0 0 14px;">À l'unité, le chiffre suivant (6) est 5 ou plus : l'arrondi au plus proche correspond à l'arrondi par excès (9). Au dixième et au centième, le chiffre suivant (4 puis 2) est inférieur à 5 : l'arrondi au plus proche correspond à l'arrondi par défaut.</p>

<p style="margin:12px 0 8px;"><b>Exemple 1</b> : arrondis 27,342 au dixième.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-r1-table"></div>
  <div class="step-note" id="og-r1-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-r1-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des dixièmes.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On regarde le chiffre juste après (les centièmes).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Il est inférieur à 5 : on ne change rien, on supprime la suite.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 27,3.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-r1-next" onclick="ogR1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogR1Reset()">Recommencer</button>
  </div>
</div>

<p style="margin:18px 0 8px;"><b>Exemple 2</b> : arrondis 9,96 à l'unité (attention à la retenue).</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div id="og-r2-table"></div>
  <div class="step-note" id="og-r2-note" style="text-align:center;margin-top:10px;"></div>
  <div class="step-list" id="og-r2-steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On repère le chiffre des unités.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On regarde le chiffre juste après (les dixièmes).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>Il est 5 ou plus : on augmente le chiffre des unités de 1, avec une retenue.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>On lit le résultat : 10.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="og-r2-next" onclick="ogR2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ogR2Reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-operations-ordre-grandeur-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Pose et effectue : 23,7 + 4,08 + 9, puis 18 − 5,64.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Calcule sans poser d'opération : 7,3 &times; 100 ; 512 ÷ 1 000 ; 9,4 &times; 0,01 ; 6 ÷ 0,1.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Effectue la multiplication de 2,6 par 1,4, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Pose et effectue la division de 63 par 4. Donne la valeur exacte du quotient.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Pose et effectue la division de 7,1 par 6. Donne une valeur approchée du quotient au centième.
  </div>
</div>
`;

DEMO_REGISTRY['Opérations et ordre de grandeur'] = {
  cours:'cours-demo-operations-ordre-grandeur-6e', methode:'methode-demo-operations-ordre-grandeur-6e', exos:'exos-demo-operations-ordre-grandeur-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-operations-ordre-grandeur-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-operations-ordre-grandeur-6e'));
    ogDivisionPoseeReset();
    ogMaReset(); ogMbReset();
    ogR1Reset(); ogR2Reset();
    injectCourseAddButtons(document.getElementById('methode-demo-operations-ordre-grandeur-6e'));
  }
};

DEMO_QUIZZES['Opérations et ordre de grandeur'] = [
  {q:"Pour poser une addition de nombres décimaux, il faut...",
   opts:["Aligner les chiffres de droite","Aligner les virgules","Aligner les chiffres des unités seulement"], correct:1},
  {q:"64 × 0,01 = ...",
   opts:["6,4","0,64","640"], correct:1},
  {q:"Pour placer la virgule dans un produit de deux décimaux, on compte...",
   opts:["Le nombre de chiffres du plus grand facteur","Le nombre total de chiffres après la virgule des deux facteurs","Toujours 2 chiffres après la virgule"], correct:1},
  {q:"Dans une division posée, on place la virgule au quotient...",
   opts:["Dès le début du calcul","Dès qu'on abaisse le premier chiffre des dixièmes du dividende","Seulement à la toute fin"], correct:1},
];

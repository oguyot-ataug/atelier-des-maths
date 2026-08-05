/* ============================================================
   LE COMPTE EST BON
   Jeu de calcul mental inspiré de "Des chiffres et des lettres".
   -----------------------------------------------------------
   Principes :
   - Tirage de 6 nombres (petits 1-10 x2, grands 25/50/75/100), un
     compte cible entre 100 et 999.
   - Un solveur (recherche exhaustive sur toutes les combinaisons de
     paires + opérations) vérifie AVANT de proposer le tirage qu'un
     compte exact existe : on ne propose donc que des comptes
     réalisables, quitte à retirer plusieurs fois.
   - Le joueur combine les nombres deux par deux ; chaque nombre créé
     mémorise sa propre expression (ex. "(5 + 3)"), ce qui permet de
     reconstituer l'écriture en une seule expression à la fin, sans
     que le joueur n'ait à l'écrire lui-même.
   ============================================================ */

const CEB_SMALL_POOL = (()=>{ const a=[]; for(let i=1;i<=10;i++){ a.push(i); a.push(i); } return a; })();
const CEB_LARGE_POOL = [25,50,75,100];
const CEB_OPS = [
  {sym:'+', label:'+'},
  {sym:'-', label:'−'},
  {sym:'×', label:'×'},
  {sym:'÷', label:'÷'},
];

function cebShuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function cebDrawNumbers(nLarge){
  const large = cebShuffle(CEB_LARGE_POOL).slice(0, nLarge);
  const small = cebShuffle(CEB_SMALL_POOL).slice(0, 6-nLarge);
  return cebShuffle(large.concat(small));
}

/* ---- Solveur : recherche exhaustive avec mémorisation de l'expression ---- */
function cebCombine(a, b){
  const out = [];
  out.push({value:a.value+b.value, expr:`${a.expr} + ${b.expr}`});
  if(a.value>b.value) out.push({value:a.value-b.value, expr:`${a.expr} - ${b.expr}`});
  else if(b.value>a.value) out.push({value:b.value-a.value, expr:`${b.expr} - ${a.expr}`});
  if(a.value!==1 && b.value!==1) out.push({value:a.value*b.value, expr:`${a.expr} * ${b.expr}`});
  if(b.value>1 && a.value%b.value===0) out.push({value:a.value/b.value, expr:`${a.expr} / ${b.expr}`});
  if(a.value>1 && b.value%a.value===0) out.push({value:b.value/a.value, expr:`${b.expr} / ${a.expr}`});
  return out;
}

function cebSolve(numbers, target){
  let best = null, stop = false;
  function consider(node){
    if(!best || Math.abs(node.value-target) < Math.abs(best.value-target)) best = node;
    if(best.value===target) stop = true;
  }
  function recurse(nodes){
    if(stop) return;
    nodes.forEach(consider);
    if(stop || nodes.length<2) return;
    for(let i=0;i<nodes.length && !stop;i++){
      for(let j=i+1;j<nodes.length && !stop;j++){
        const rest=[];
        for(let k=0;k<nodes.length;k++) if(k!==i && k!==j) rest.push(nodes[k]);
        const combos = cebCombine(nodes[i], nodes[j]);
        for(const c of combos){
          recurse(rest.concat([{value:c.value, expr:`(${c.expr})`}]));
          if(stop) break;
        }
      }
    }
  }
  recurse(numbers.map(n=>({value:n, expr:String(n)})));
  return best;
}

function cebGenerateSolvableDraw(nLarge){
  const MAX_TRIES = 80;
  let lastNumbers=null, lastTarget=null, lastSolution=null;
  for(let t=0;t<MAX_TRIES;t++){
    const numbers = cebDrawNumbers(nLarge);
    const target = 100 + Math.floor(Math.random()*900);
    const solution = cebSolve(numbers, target);
    lastNumbers=numbers; lastTarget=target; lastSolution=solution;
    if(solution && solution.value===target) return {numbers, target, solution, exact:true};
  }
  return {numbers:lastNumbers, target:lastTarget, solution:lastSolution, exact:false};
}

/* ---- État du jeu ---- */
let cebState = null; // {numbers, target, solution, exact, tiles, timerId, timeLeft, timerOn, timerDuration, finished}
let cebNextTileId = 1;
let cebSelectedOp = null;
let cebSelectedTileId = null;
let cebSettings = { nLarge: 2, timerOn: true, timerDuration: 60 };

function cebInit(){
  if(document.getElementById('cebRoot').dataset.built) return;
  document.getElementById('cebRoot').dataset.built = '1';
  cebRenderSetup();
}

function cebRenderSetup(){
  const root = document.getElementById('cebRoot');
  root.innerHTML = `
  <div class="ceb-setup plain-card" style="padding:24px 28px;max-width:560px;">
    <p style="margin:0 0 14px;font-weight:700;font-family:'Space Grotesk',sans-serif;">Réglages du tirage</p>
    <p class="hint" style="margin:0 0 6px;">Nombre de "grands nombres" (25, 50, 75, 100) parmi les 6 tirés :</p>
    <div class="figure-toolbar" id="cebNLargePicker" style="margin-bottom:16px;"></div>
    <p class="hint" style="margin:0 0 6px;">Chronomètre :</p>
    <div class="figure-toolbar" id="cebTimerPicker" style="margin-bottom:20px;"></div>
    <button class="btn" onclick="cebStartGame()">Nouveau tirage →</button>
  </div>
  `;
  const nlBox = document.getElementById('cebNLargePicker');
  for(let n=0;n<=4;n++){
    const b = document.createElement('button');
    b.className = 'btn secondary';
    b.textContent = n===0 ? 'Aucun' : String(n);
    b.style.opacity = cebSettings.nLarge===n ? '1' : '.55';
    b.onclick = ()=>{ cebSettings.nLarge=n; cebRenderSetup(); };
    nlBox.appendChild(b);
  }
  const tBox = document.getElementById('cebTimerPicker');
  const opts = [{on:false,label:'Illimité'},{on:true,dur:30,label:'30 s'},{on:true,dur:60,label:'1 min'},{on:true,dur:90,label:'1 min 30'}];
  opts.forEach(o=>{
    const b = document.createElement('button');
    b.className = 'btn secondary';
    b.textContent = o.label;
    const active = o.on===cebSettings.timerOn && (!o.on || o.dur===cebSettings.timerDuration);
    b.style.opacity = active ? '1' : '.55';
    b.onclick = ()=>{ cebSettings.timerOn=o.on; if(o.on) cebSettings.timerDuration=o.dur; cebRenderSetup(); };
    tBox.appendChild(b);
  });
}

function cebStartGame(){
  const draw = cebGenerateSolvableDraw(cebSettings.nLarge);
  const tiles = draw.numbers.map(n=>({id:cebNextTileId++, value:n, expr:String(n), used:false}));
  cebState = {
    numbers: draw.numbers, target: draw.target, solution: draw.solution, exact: draw.exact,
    tiles, timeLeft: cebSettings.timerDuration, timerOn: cebSettings.timerOn, timerId: null, finished:false,
  };
  cebSelectedOp = null;
  cebSelectedTileId = null;
  cebRenderGame();
  if(cebState.timerOn) cebStartTimer();
}

function cebStartTimer(){
  clearInterval(cebState.timerId);
  cebState.timerId = setInterval(()=>{
    cebState.timeLeft--;
    cebUpdateTimerDisplay();
    if(cebState.timeLeft<=0){
      clearInterval(cebState.timerId);
      cebFinish();
    }
  }, 1000);
}

function cebUpdateTimerDisplay(){
  const el = document.getElementById('cebTimer');
  if(!el) return;
  const m = Math.floor(cebState.timeLeft/60), s = cebState.timeLeft%60;
  el.textContent = `⏱ ${m}:${String(s).padStart(2,'0')}`;
  el.style.color = cebState.timeLeft<=10 ? '#9E1F5E' : 'var(--ink)';
}

function cebActiveTiles(){ return cebState.tiles.filter(t=>!t.used); }

function cebRenderGame(){
  const root = document.getElementById('cebRoot');
  root.innerHTML = `
  <div class="ceb-game">
    <div style="display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap;margin-bottom:18px;">
      <div style="text-align:center;">
        <div class="dp-tag" style="color:var(--accent-orange);">compte à atteindre</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:2.4rem;">${cebState.target}</div>
      </div>
      ${cebState.timerOn ? `<div id="cebTimer" style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:1.3rem;"></div>` : ''}
    </div>
    <div id="cebTiles" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:18px;"></div>
    <div id="cebOps" style="display:flex;gap:10px;justify-content:center;margin-bottom:14px;"></div>
    <p class="hint" id="cebHint" style="text-align:center;min-height:1.3em;"></p>
    <div class="figure-toolbar" style="justify-content:center;">
      <button class="btn secondary" onclick="cebUndo()">↩ Annuler la dernière étape</button>
      <button class="btn" onclick="cebFinish()">Valider ce compte</button>
      <button class="btn secondary" onclick="cebRenderSetup()">Nouveau tirage</button>
    </div>
  </div>
  `;
  cebRenderTiles();
  cebRenderOps();
  if(cebState.timerOn) cebUpdateTimerDisplay();
}

function cebRenderTiles(){
  const box = document.getElementById('cebTiles');
  box.innerHTML = '';
  cebActiveTiles().forEach(t=>{
    const b = document.createElement('button');
    b.className = 'ceb-tile' + (t.id===cebSelectedTileId ? ' ceb-tile-selected' : '');
    b.textContent = t.value;
    b.onclick = ()=>cebPickTile(t.id);
    box.appendChild(b);
  });
}

function cebRenderOps(){
  const box = document.getElementById('cebOps');
  box.innerHTML = '';
  CEB_OPS.forEach(op=>{
    const b = document.createElement('button');
    b.className = 'ceb-op-btn' + (cebSelectedOp===op.sym ? ' ceb-op-selected' : '');
    b.textContent = op.label;
    b.disabled = cebSelectedTileId===null;
    b.onclick = ()=>{ cebSelectedOp = op.sym; cebRenderOps(); document.getElementById('cebHint').textContent = 'Choisis le second nombre.'; };
    box.appendChild(b);
  });
}

function cebPickTile(id){
  if(cebSelectedTileId===null){
    cebSelectedTileId = id;
    cebSelectedOp = null;
    document.getElementById('cebHint').textContent = 'Choisis une opération, puis le second nombre.';
    cebRenderTiles(); cebRenderOps();
    return;
  }
  if(id===cebSelectedTileId){
    cebSelectedTileId = null; cebSelectedOp = null;
    document.getElementById('cebHint').textContent = '';
    cebRenderTiles(); cebRenderOps();
    return;
  }
  if(cebSelectedOp===null){
    // change first pick
    cebSelectedTileId = id;
    cebRenderTiles();
    return;
  }
  const a = cebState.tiles.find(t=>t.id===cebSelectedTileId);
  const b = cebState.tiles.find(t=>t.id===id);
  const result = cebApplyOp(a, b, cebSelectedOp);
  if(result===null){
    document.getElementById('cebHint').textContent = "Ce calcul n'est pas autorisé (résultat négatif, non entier, ou multiplication/division par 1).";
    return;
  }
  a.used = true; b.used = true;
  cebState.tiles.push({id:cebNextTileId++, value:result.value, expr:result.expr, used:false, fromA:a.id, fromB:b.id, op:cebSelectedOp});
  cebSelectedTileId = null; cebSelectedOp = null;
  document.getElementById('cebHint').textContent = '';
  cebRenderTiles(); cebRenderOps();
  const activeVals = cebActiveTiles().map(t=>t.value);
  if(activeVals.includes(cebState.target)) document.getElementById('cebHint').textContent = "🎯 Ce nombre est le compte exact ! Tu peux valider.";
}

function cebApplyOp(a, b, op){
  if(op==='+') return {value:a.value+b.value, expr:`(${a.expr} + ${b.expr})`};
  if(op==='-'){
    if(a.value>b.value) return {value:a.value-b.value, expr:`(${a.expr} - ${b.expr})`};
    if(b.value>a.value) return {value:b.value-a.value, expr:`(${b.expr} - ${a.expr})`};
    return null;
  }
  if(op==='×'){
    if(a.value===1||b.value===1) return null;
    return {value:a.value*b.value, expr:`(${a.expr} \\times ${b.expr})`};
  }
  if(op==='÷'){
    if(b.value>1 && a.value%b.value===0) return {value:a.value/b.value, expr:`\\dfrac{${a.expr}}{${b.expr}}`};
    if(a.value>1 && b.value%a.value===0) return {value:b.value/a.value, expr:`\\dfrac{${b.expr}}{${a.expr}}`};
    return null;
  }
  return null;
}

function cebUndo(){
  // retrouve la dernière tuile créée (celle avec le plus grand id parmi les non-utilisées ou utilisées récemment)
  const created = cebState.tiles.filter(t=>t.op).sort((x,y)=>y.id-x.id);
  const last = created.find(t=>!t.used); // seule une tuile finale (non consommée par une étape suivante) peut être annulée
  if(!last){ document.getElementById('cebHint').textContent = "Rien à annuler."; return; }
  const a = cebState.tiles.find(t=>t.id===last.fromA);
  const b = cebState.tiles.find(t=>t.id===last.fromB);
  a.used = false; b.used = false;
  cebState.tiles = cebState.tiles.filter(t=>t.id!==last.id);
  cebSelectedTileId = null; cebSelectedOp = null;
  document.getElementById('cebHint').textContent = '';
  cebRenderTiles(); cebRenderOps();
}

function cebFinish(){
  if(cebState.finished) return;
  cebState.finished = true;
  clearInterval(cebState.timerId);
  const active = cebActiveTiles();
  // meilleure tuile = la plus proche du compte parmi les nombres actuellement disponibles
  let best = active[0];
  active.forEach(t=>{ if(Math.abs(t.value-cebState.target) < Math.abs(best.value-cebState.target)) best = t; });
  cebRenderResult(best);
}

function cebRenderResult(best){
  const root = document.getElementById('cebRoot');
  const gap = best ? Math.abs(best.value - cebState.target) : null;
  const exact = gap===0;
  const finalExprRaw = best ? best.expr.replace(/^\((.*)\)$/, '$1') : null;
  root.innerHTML = `
  <div class="plain-card" style="padding:24px 28px;max-width:640px;">
    <p style="margin:0 0 4px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:1.1rem;">
      ${exact ? '🎯 Compte exact !' : best ? `À ${gap} près (ta réponse : ${best.value}, le compte était ${cebState.target})` : "Tu n'as pas formé de nombre."}
    </p>
    ${best ? `
    <p class="hint" style="margin:8px 0 4px;">Ton calcul, écrit en une seule expression :</p>
    <p style="margin:0 0 16px;font-size:1.05rem;"><span class="tex">${finalExprRaw} = ${best.value}</span></p>
    ` : ''}
    <div class="figure-toolbar">
      <button class="btn secondary" onclick="cebShowSolution()">Voir une solution</button>
      <button class="btn" onclick="cebRenderSetup()">Nouveau tirage →</button>
    </div>
    <div id="cebSolutionBox"></div>
  </div>
  `;
  if(window.renderStaticMath) renderStaticMath(root);
}

function cebShowSolution(){
  const box = document.getElementById('cebSolutionBox');
  if(!cebState.solution){
    box.innerHTML = `<p class="hint" style="margin-top:14px;">Aucune solution exacte n'a été trouvée pour ce tirage (cas rare de secours).</p>`;
    return;
  }
  const expr = cebState.solution.expr.replace(/^\((.*)\)$/, '$1');
  const exactTag = cebState.solution.value===cebState.target ? '' : ` (le plus proche possible : ${cebState.solution.value})`;
  box.innerHTML = `
    <p class="hint" style="margin:14px 0 4px;">Exemple de solution${exactTag} :</p>
    <p style="margin:0;font-size:1.05rem;"><span class="tex">${expr} = ${cebState.solution.value}</span></p>
  `;
  if(window.renderStaticMath) renderStaticMath(box);
}

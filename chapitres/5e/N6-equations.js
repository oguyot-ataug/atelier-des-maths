/* ============================================================
   CHAPITRE : Équations (5e, N6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

const EQ_AB_STEPS = [
  {expr:'<span class="tex">x + 12 = 25</span>', note:"On part de la première équation."},
  {expr:'<span class="tex">x + 12 - 12 = 25 - 12</span>', note:"On soustrait 12 aux deux membres, pour isoler le terme x."},
  {expr:'<span class="tex">x = 13</span>', note:"On simplifie chaque membre. 13 est la solution de x + 12 = 25."},
  {expr:'<div style="margin-top:20px;"><span class="tex">y - 9 = -14</span></div>', note:"On passe à la seconde équation, dont l'inconnue est notée y."},
  {expr:'<span class="tex">y - 9 + 9 = -14 + 9</span>', note:"On ajoute 9 aux deux membres, pour isoler le terme y."},
  {expr:'<span class="tex">y = -5</span>', note:"On simplifie chaque membre. -5 est la solution de y - 9 = -14."},
];
const eqAbDemo = makeStepDemo(EQ_AB_STEPS, 'eqAbDisplay');

const EQ_AX_STEPS = [
  {expr:'<span class="tex">6x = 42</span>', note:"On part de la première équation."},
  {expr:'<span class="tex">\\dfrac{6x}{6} = \\dfrac{42}{6}</span>', note:"On divise les deux membres par 6, pour isoler le terme x."},
  {expr:'<span class="tex">x = 7</span>', note:"On simplifie chaque membre. 7 est la solution de 6x = 42."},
  {expr:'<div style="margin-top:20px;"><span class="tex">\\dfrac{y}{4} = 3,5</span></div>', note:"On passe à la seconde équation, dont l'inconnue est notée y."},
  {expr:'<span class="tex">\\dfrac{y}{4} \\times 4 = 3,5 \\times 4</span>', note:"On multiplie les deux membres par 4, pour isoler le terme y."},
  {expr:'<span class="tex">y = 14</span>', note:"On simplifie chaque membre. 14 est la solution de y/4 = 3,5."},
];
const eqAxDemo = makeStepDemo(EQ_AX_STEPS, 'eqAxDisplay');

document.getElementById('cours-demo-equations-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Notion d'équation</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Une <b>équation</b> à une inconnue est une égalité entre deux expressions littérales (deux membres) comportant une ou plusieurs fois la même lettre.</div>

<p style="margin:12px 0 8px;"><b>Exemple 1</b> : l'égalité <span class="tex">x + 15 = 42</span> est une équation.</p>
<p style="margin:2px 0;">Elle comporte deux membres : le membre de gauche <span class="tex">x + 15</span> et le membre de droite <span class="tex">42</span>.</p>
<p style="margin:2px 0 14px;">Ces deux expressions sont séparées par le symbole « = ». L'inconnue est notée à l'aide de la lettre « x » et est présente dans le membre de gauche.</p>

<span class="def-badge">Définition</span>
<div class="def-box"><b>Résoudre une équation</b> à une inconnue, c'est trouver toutes les valeurs de l'inconnue qui vérifient l'égalité. Ces valeurs sont appelées « <b>solutions</b> » de l'équation.</div>

<p style="margin:12px 0 8px;"><b>Exemple 2</b> : on considère l'équation <span class="tex">x + 9 = 16</span>.</p>
<p style="margin:2px 0 14px;">Quand <span class="tex">x = 7</span>, l'égalité est vérifiée puisque <span class="tex">7 + 9 = 16</span>. Donc 7 est solution de cette équation.</p>

<div class="lesson-header"><span class="num">2</span><h3>Résolution d'équations du premier degré</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Une équation du premier degré a <b>une unique solution</b>.</div>

<p class="example-title" style="margin-top:18px;">A. Équations du type <span class="tex">x + b = c</span></p>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">On ne change pas une égalité quand on <b>additionne</b> ou <b>soustrait</b> un même nombre aux deux membres de l'égalité.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous les équations <span class="tex">x + 12 = 25</span> et <span class="tex">y - 9 = -14</span>.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la résolution.</p>
  <div class="step-display" id="eqAbDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eqAbDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqAbDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:22px;">B. Équations du type <span class="tex">ax = c</span></p>
<span class="prop-badge">Propriété 3</span>
<div class="def-box">On ne change pas une égalité quand on <b>multiplie</b> ou <b>divise</b> les deux membres de l'égalité par un même nombre non nul.</div>

<p style="margin:12px 0 8px;"><b>Exemples</b> : résous les équations <span class="tex">6x = 42</span> et <span class="tex">\\dfrac{y}{4} = 3,5</span>.</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la résolution.</p>
  <div class="step-display" id="eqAxDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eqAxDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqAxDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= METHODE : mise en équation avec une balance ================= */
const EQ_DEFS = `<defs>
  <radialGradient id="eqGradGreen" cx="35%" cy="30%" r="75%">
    <stop offset="0%" stop-color="#C3EC94"/><stop offset="100%" stop-color="#4C8C2B"/>
  </radialGradient>
  <radialGradient id="eqGradOrange" cx="35%" cy="30%" r="75%">
    <stop offset="0%" stop-color="#FFDCA8"/><stop offset="100%" stop-color="#E8952E"/>
  </radialGradient>
  <linearGradient id="eqGradPan" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#FFDD86"/><stop offset="100%" stop-color="#F0A93A"/>
  </linearGradient>
</defs>`;
function eqDrawItem(x, y, item, onclick, dragPayload){
  const click = onclick ? ` onclick="${onclick}" style="cursor:pointer;"` : '';
  const drag = dragPayload ? ` draggable="true" ondragstart="eqGameDragStartItem(event,'${dragPayload}')"` : '';
  if(item.ball){
    const grad = item.color==='orange' ? 'eqGradOrange' : 'eqGradGreen';
    const stroke = item.color==='orange' ? '#c96b12' : '#2f6d1c';
    return `<circle cx="${x}" cy="${y}" r="19" fill="url(#${grad})" stroke="${stroke}" stroke-width="1.4"${click}${drag}/>`;
  }
  return `<g${click}${drag}><rect x="${x-23}" y="${y-15}" width="46" height="28" rx="4" fill="#fff" stroke="#1C1B2E" stroke-width="1.5"/>
    <text x="${x}" y="${y+5}" font-size="13" text-anchor="middle" font-weight="700" fill="#1C1B2E">${item.label}</text></g>`;
}
function eqDrawPanItems(cx, y, items, spacing, side){
  const startX = cx - (items.length-1)*spacing/2;
  return items.map((it,i)=>eqDrawItem(startX+i*spacing, y, it, side?`eqGameRemove('${side}',${i})`:null, side&&!it.fixed?`move:${side}:${i}`:null)).join('');
}
/* Géométrie commune : le fléau (bras horizontal) est en bas, posé sur le pivot ; les plateaux
   reposent sur un court montant AU-DESSUS de chaque bras (pas suspendus par des fils). */
const EQ_MIDX=200, EQ_BEAMY=150, EQ_PANY=105, EQ_LEFTX=90, EQ_RIGHTX=310;
function eqPanHalf(maxCount, spacing){ return Math.max(34, (maxCount-1)*spacing/2 + 24); }
function eqSpacing(maxCount){ return maxCount>=4 ? 110/(maxCount-1) : 40; }
function eqBeamGroup(leftItems, rightItems){
  const maxCount = Math.max(leftItems.length, rightItems.length, 1);
  const spacing = eqSpacing(maxCount);
  const panHalf = eqPanHalf(maxCount, spacing);
  let s = `<line x1="${EQ_LEFTX}" y1="${EQ_BEAMY}" x2="${EQ_RIGHTX}" y2="${EQ_BEAMY}" stroke="#1C1B2E" stroke-width="6" stroke-linecap="round"/>`;
  [EQ_LEFTX,EQ_RIGHTX].forEach(px=>{
    s += `<rect x="${px-4}" y="${EQ_PANY}" width="8" height="${EQ_BEAMY-EQ_PANY}" fill="#1C1B2E"/>`;
    s += `<ellipse cx="${px}" cy="${EQ_PANY}" rx="${panHalf}" ry="12" fill="url(#eqGradPan)" stroke="#C77D1E" stroke-width="1.5"/>`;
  });
  return s;
}
function eqBuildBalanceSvg(svgId, leftItems, rightItems){
  const maxCount = Math.max(leftItems.length, rightItems.length, 1);
  const spacing = eqSpacing(maxCount);
  let s = `<svg id="${svgId}" viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">${EQ_DEFS}`;
  s += `<polygon points="${EQ_MIDX-16},${EQ_BEAMY+34} ${EQ_MIDX+16},${EQ_BEAMY+34} ${EQ_MIDX},${EQ_BEAMY}" fill="#1C1B2E"/>`;
  s += `<rect x="${EQ_MIDX-32}" y="${EQ_BEAMY+34}" width="64" height="8" rx="3" fill="#1C1B2E"/>`;
  s += eqBeamGroup(leftItems, rightItems);
  s += eqDrawPanItems(EQ_LEFTX, EQ_PANY-24, leftItems, spacing);
  s += eqDrawPanItems(EQ_RIGHTX, EQ_PANY-24, rightItems, spacing);
  s += `</svg>`;
  return s;
}

/* Variante inclinable (pour le jeu) : le fléau (bras + montants + plateaux + objets) pivote
   d'un seul bloc autour du pivot fixe ; le socle et le triangle restent immobiles. */
function eqBuildTiltBalanceSvg(svgId, leftItems, rightItems, angleDeg){
  const maxCount = Math.max(leftItems.length, rightItems.length, 1);
  const spacing = eqSpacing(maxCount);
  let s = `<svg id="${svgId}" viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">${EQ_DEFS}`;
  s += `<polygon points="${EQ_MIDX-16},${EQ_BEAMY+34} ${EQ_MIDX+16},${EQ_BEAMY+34} ${EQ_MIDX},${EQ_BEAMY}" fill="#1C1B2E"/>`;
  s += `<rect x="${EQ_MIDX-32}" y="${EQ_BEAMY+34}" width="64" height="8" rx="3" fill="#1C1B2E"/>`;
  s += `<g transform="rotate(${angleDeg} ${EQ_MIDX} ${EQ_BEAMY})">`;
  s += eqBeamGroup(leftItems, rightItems);
  s += eqDrawPanItems(EQ_LEFTX, EQ_PANY-24, leftItems, spacing, 'left');
  s += eqDrawPanItems(EQ_RIGHTX, EQ_PANY-24, rightItems, spacing, 'right');
  s += `</g></svg>`;
  return s;
}
const EQ_BALL = {ball:true};
function eqW(label){ return {label}; }

let eqBal1Step = 0;
function eqBal1Update(step){
  const left = step>=1 ? [EQ_BALL] : [EQ_BALL, eqW('20 g')];
  const right = step>=1 ? [eqW('40 g')] : [eqW('60 g')];
  document.getElementById('eqBal1Wrap').innerHTML = eqBuildBalanceSvg('eqBal1Svg', left, right);
  document.querySelectorAll('#eqBal1Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal1Next').textContent = step>=1 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal1Next').disabled = step>=1;
}
function eqBal1Next(){ if(eqBal1Step<1){ eqBal1Step++; eqBal1Update(eqBal1Step); } }
function eqBal1Reset(){ eqBal1Step=0; eqBal1Update(0); }
const EQ_BAL1_STEPS = [
  {note:"Une boule de masse inconnue x et un poids de 20 g sont posés à gauche ; un poids de 60 g est posé à droite. La balance est équilibrée : x + 20 = 60."},
  {note:"On retire 20 g de chaque plateau : la balance reste équilibrée. À gauche il reste la boule, à droite 60 − 20 = 40 g. Donc x = 40."},
];

let eqBal2Step = 0;
function eqBal2Update(step){
  const left = step>=1 ? [EQ_BALL] : [EQ_BALL, EQ_BALL];
  const right = step>=1 ? [eqW('45 g')] : [eqW('90 g')];
  document.getElementById('eqBal2Wrap').innerHTML = eqBuildBalanceSvg('eqBal2Svg', left, right);
  document.querySelectorAll('#eqBal2Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal2Next').textContent = step>=1 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal2Next').disabled = step>=1;
}
function eqBal2Next(){ if(eqBal2Step<1){ eqBal2Step++; eqBal2Update(eqBal2Step); } }
function eqBal2Reset(){ eqBal2Step=0; eqBal2Update(0); }
const EQ_BAL2_STEPS = [
  {note:"Deux boules identiques (chacune de masse x) sont posées à gauche ; un poids de 90 g est posé à droite. La balance est équilibrée : 2x = 90."},
  {note:"On partage chaque plateau en 2 parts égales : il reste une boule à gauche, et 90 : 2 = 45 g à droite. Donc x = 45."},
];

let eqBal3Step = 0;
function eqBal3Update(step){
  let left, right;
  if(step===0){ left=[EQ_BALL,EQ_BALL,EQ_BALL,eqW('15 g')]; right=[eqW('60 g')]; }
  else if(step===1){ left=[EQ_BALL,EQ_BALL,EQ_BALL]; right=[eqW('45 g')]; }
  else { left=[EQ_BALL]; right=[eqW('15 g')]; }
  document.getElementById('eqBal3Wrap').innerHTML = eqBuildBalanceSvg('eqBal3Svg', left, right);
  document.querySelectorAll('#eqBal3Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  document.getElementById('eqBal3Next').textContent = step>=2 ? 'Terminé ✓' : 'Étape suivante →';
  document.getElementById('eqBal3Next').disabled = step>=2;
}
function eqBal3Next(){ if(eqBal3Step<2){ eqBal3Step++; eqBal3Update(eqBal3Step); } }
function eqBal3Reset(){ eqBal3Step=0; eqBal3Update(0); }
const EQ_BAL3_STEPS = [
  {note:"Trois boules identiques et un poids de 15 g sont posés à gauche ; un poids de 60 g est posé à droite. La balance est équilibrée : 3x + 15 = 60."},
  {note:"On retire 15 g de chaque plateau : il reste 3 boules à gauche, et 60 − 15 = 45 g à droite. 3x = 45."},
  {note:"On partage chaque plateau en 3 parts égales : il reste une boule à gauche, et 45 : 3 = 15 g à droite. Donc x = 15."},
];

/* ---- Jeu : balance inclinable, situation de départ = équation, tout en glisser-déposer ---- */
let eqGameLeft = [], eqGameRight = [];
let EQ_GAME_BALL_WEIGHT = 50; // masse réelle de la boule (cachée), dépend du scénario tiré au sort
const EQ_GAME_SCENARIOS = [
  {leftBalls:1, leftWeight:20, rightWeight:70, ball:50},  // x + 20 = 70
  {leftBalls:1, leftWeight:15, rightWeight:45, ball:30},  // x + 15 = 45
  {leftBalls:1, leftWeight:35, rightWeight:50, ball:15},  // x + 35 = 50
  {leftBalls:1, leftWeight:12, rightWeight:52, ball:40},  // x + 12 = 52
  {leftBalls:2, leftWeight:0,  rightWeight:80, ball:40},  // 2x = 80
  {leftBalls:3, leftWeight:0,  rightWeight:90, ball:30},  // 3x = 90
];
function eqGameWeight(items){
  return items.reduce((sum,it)=>sum+(it.ball?EQ_GAME_BALL_WEIGHT:it.value),0);
}
function eqGameRender(){
  const leftW = eqGameWeight(eqGameLeft), rightW = eqGameWeight(eqGameRight);
  const diff = leftW - rightW;
  const angle = Math.max(-16, Math.min(16, -diff/4));
  const wrap = document.getElementById('eqGameWrap');
  if(wrap) wrap.innerHTML = eqBuildTiltBalanceSvg('eqGameSvg', eqGameLeft, eqGameRight, angle);
  const status = document.getElementById('eqGameStatus');
  if(status){
    status.textContent = diff===0 ? "La balance est à l'équilibre !" : (diff>0 ? 'Le plateau de gauche penche : il est plus lourd.' : 'Le plateau de droite penche : il est plus lourd.');
    status.style.color = diff===0 ? '#1F6B3A' : 'var(--accent-orange)';
  }
}
function eqGameAdd(side, item){
  (side==='left' ? eqGameLeft : eqGameRight).push(item);
  eqGameRender();
}
function eqGameRemove(side, idx){
  const arr = side==='left' ? eqGameLeft : eqGameRight;
  if(arr[idx] && arr[idx].fixed) return; // la boule ne se retire pas, c'est elle qu'on cherche
  arr.splice(idx,1);
  eqGameRender();
}
function eqGameReset(){
  const sc = EQ_GAME_SCENARIOS[Math.floor(Math.random()*EQ_GAME_SCENARIOS.length)];
  EQ_GAME_BALL_WEIGHT = sc.ball;
  eqGameLeft = [];
  for(let i=0;i<sc.leftBalls;i++) eqGameLeft.push({ball:true, color:'green', fixed:true});
  if(sc.leftWeight>0) eqGameLeft.push({label:sc.leftWeight+' g', value:sc.leftWeight});
  eqGameRight = [{label:sc.rightWeight+' g', value:sc.rightWeight}];
  eqGameRender();
}
/* Glisser depuis la réserve (copie infinie) : payload "new:valeur". */
function eqGameDragStart(e, value){
  e.dataTransfer.setData('text/plain', 'new:'+value);
}
/* Glisser un objet déjà posé (déplacement ou suppression) : payload "move:côté:index". */
function eqGameDragStartItem(e, payload){
  e.dataTransfer.setData('text/plain', payload);
  e.stopPropagation();
}
function eqGameDrop(e, side){
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  if(data.indexOf('new:')===0){
    const value = parseInt(data.slice(4), 10);
    if(value) eqGameAdd(side, {label: value+' g', value});
  } else if(data.indexOf('move:')===0){
    const parts = data.split(':'); const fromSide = parts[1], idx = parseInt(parts[2],10);
    const fromArr = fromSide==='left' ? eqGameLeft : eqGameRight;
    const item = fromArr[idx];
    if(!item || item.fixed) return;
    fromArr.splice(idx,1);
    (side==='left' ? eqGameLeft : eqGameRight).push(item);
    eqGameRender();
  }
}
/* Détermine le plateau visé d'après la position du curseur au moment du dépôt (gauche/droite
   de la moitié du conteneur), pour ne pas avoir besoin d'un calque de dépôt superposé au SVG
   (qui bloquerait les clics et le glisser des objets déjà posés). */
function eqGameDropAuto(e){
  const rect = e.currentTarget.getBoundingClientRect();
  const side = (e.clientX - rect.left) < rect.width/2 ? 'left' : 'right';
  eqGameDrop(e, side);
}
function eqGameDropTrash(e){
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  if(data.indexOf('move:')===0){
    const parts = data.split(':'); const fromSide = parts[1], idx = parseInt(parts[2],10);
    const arr = fromSide==='left' ? eqGameLeft : eqGameRight;
    if(arr[idx] && arr[idx].fixed) return;
    arr.splice(idx,1);
    eqGameRender();
  }
}

document.getElementById('methode-demo-equations-5e').innerHTML = `
<p style="margin:0 0 14px;">Une équation peut se représenter par une <b>balance équilibrée</b> : chaque plateau porte le même poids total. Une boule représente la masse inconnue x. Faire la même opération sur les deux plateaux garde la balance équilibrée -- exactement comme faire la même opération sur les deux membres d'une égalité.</p>

<p class="example-title" style="margin-top:0;">Une boule et un poids</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal1Wrap"></div>
  <div class="step-list" id="eqBal1Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation x + 20 = 60.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On retire 20 g de chaque plateau : x = 40.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal1Next" onclick="eqBal1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal1Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">On complexifie : plusieurs boules</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal2Wrap"></div>
  <div class="step-list" id="eqBal2Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation 2x = 90.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On partage chaque plateau en 2 parts égales : x = 45.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal2Next" onclick="eqBal2Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal2Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">On complexifie encore : boules et poids ensemble</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler le raisonnement.</p>
  <div id="eqBal3Wrap"></div>
  <div class="step-list" id="eqBal3Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>La balance équilibrée traduit l'équation 3x + 15 = 60.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On retire 15 g de chaque plateau : 3x = 45.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>On partage chaque plateau en 3 parts égales : x = 15.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="eqBal3Next" onclick="eqBal3Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eqBal3Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">🎮 Jeu : manipule la balance</p>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">La balance part d'une situation qui traduit une équation (par exemple « une boule et 20 g à gauche, 70 g à droite » pour x + 20 = 70). Fais glisser un poids depuis la réserve pour en ajouter un, fais glisser un poids déjà posé vers l'autre plateau pour le déplacer, ou vers la corbeille pour le supprimer. Le bouton "Recommencer" tire une nouvelle situation au hasard.</p>
  <div style="position:relative;max-width:380px;margin:0 auto;">
    <div id="eqGameWrap" ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';" ondrop="eqGameDropAuto(event)"></div>
  </div>
  <p class="hint" id="eqGameStatus" style="text-align:center;font-weight:700;margin:8px 0;"></p>
  <div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:center;">
    <div>
      <p class="hint" style="text-align:center;margin:0 0 6px;">Réserve (glisser pour ajouter) :</p>
      <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;">
        <div draggable="true" ondragstart="eqGameDragStart(event,5)" style="padding:9px 16px;background:#fff;border:2px solid #C77D1E;border-radius:20px;font-weight:700;cursor:grab;user-select:none;">5 g</div>
        <div draggable="true" ondragstart="eqGameDragStart(event,10)" style="padding:9px 16px;background:#fff;border:2px solid #C77D1E;border-radius:20px;font-weight:700;cursor:grab;user-select:none;">10 g</div>
        <div draggable="true" ondragstart="eqGameDragStart(event,20)" style="padding:9px 16px;background:#fff;border:2px solid #C77D1E;border-radius:20px;font-weight:700;cursor:grab;user-select:none;">20 g</div>
        <div draggable="true" ondragstart="eqGameDragStart(event,50)" style="padding:9px 16px;background:#fff;border:2px solid #C77D1E;border-radius:20px;font-weight:700;cursor:grab;user-select:none;">50 g</div>
      </div>
    </div>
    <div style="text-align:center;">
      <p class="hint" style="margin:0 0 6px;">Corbeille (glisser pour supprimer) :</p>
      <div ondragover="event.preventDefault();event.dataTransfer.dropEffect='move';" ondrop="eqGameDropTrash(event)" style="width:64px;height:64px;margin:0 auto;border:2px dashed #9E1F5E;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.8rem;">🗑️</div>
    </div>
  </div>
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn secondary" onclick="eqGameReset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-equations-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Résoudre une équation du type x + b = c »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : résous l'équation <span class="tex">x + 17 = 30</span>.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr"><span class="tex">x + 17 = 30</span></span><span class="we-comment">Ce que je sais : l'équation de départ.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> on ne change pas une égalité en soustrayant un même nombre aux deux membres.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> <span class="tex">x + 17 - 17 = 30 - 17</span>, soit <span class="tex">x = 13</span>. 13 est la solution de cette équation.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Parmi les valeurs 4, 5 et 6, laquelle est solution de l'équation <span class="tex">x + 8 = 13</span> ?
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Résous l'équation <span class="tex">x + 23 = 15</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Résous l'équation <span class="tex">x - 6 = -11</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Résous l'équation <span class="tex">8x = 52</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Résous l'équation <span class="tex">\\dfrac{x}{5} = 1,8</span>, en détaillant chaque étape.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 6</div>
    Toutes les balances suivantes sont à l'équilibre. Pour chaque pesée, écris l'équation correspondante (on pose <span class="tex">x</span> la masse de la boule) et calcule sa solution.
    <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:12px;">
      <div style="flex:1;min-width:260px;text-align:center;">
        <div class="hint" style="font-weight:700;margin-bottom:4px;">a.</div>
        ${eqBuildBalanceSvg('eqExoA', [{ball:true,color:'green'},{ball:true,color:'green'},{label:'20 g'}], [{label:'50 g'}])}
      </div>
      <div style="flex:1;min-width:260px;text-align:center;">
        <div class="hint" style="font-weight:700;margin-bottom:4px;">b.</div>
        ${eqBuildBalanceSvg('eqExoB', [{ball:true,color:'orange'},{ball:true,color:'orange'},{ball:true,color:'orange'},{label:'55 g'}], [{label:'100 g'}])}
      </div>
    </div>
  </div>
</div>
`;

DEMO_REGISTRY['Équations'] = {
  cours:'cours-demo-equations-5e', methode:'methode-demo-equations-5e', exos:'exos-demo-equations-5e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-equations-5e'));
    renderStaticMath(document.getElementById('exos-demo-equations-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-equations-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-equations-5e'));
    eqAbDemo.reset(); eqAxDemo.reset();
    eqBal1Reset(); eqBal2Reset(); eqBal3Reset();
    eqGameReset();
    registerGeoStepDemo('eqBal1Svg', { steps:()=>EQ_BAL1_STEPS, getIdx:()=>eqBal1Step, goto:(i)=>{ eqBal1Step=i; eqBal1Update(i); } });
    registerGeoStepDemo('eqBal2Svg', { steps:()=>EQ_BAL2_STEPS, getIdx:()=>eqBal2Step, goto:(i)=>{ eqBal2Step=i; eqBal2Update(i); } });
    registerGeoStepDemo('eqBal3Svg', { steps:()=>EQ_BAL3_STEPS, getIdx:()=>eqBal3Step, goto:(i)=>{ eqBal3Step=i; eqBal3Update(i); } });
  }
};

DEMO_QUIZZES['Équations'] = [
  {q:"Une équation à une inconnue est...",
   opts:["Une égalité entre deux expressions littérales comportant la même lettre","Une addition de deux nombres","Un tableau de proportionnalité"], correct:0},
  {q:"Résoudre une équation, c'est...",
   opts:["Calculer le membre de gauche","Trouver toutes les valeurs de l'inconnue qui vérifient l'égalité","Développer l'expression"], correct:1},
  {q:"Une équation du premier degré a...",
   opts:["Aucune solution","Une unique solution","Une infinité de solutions"], correct:1},
  {q:"Pour résoudre x + 6 = 20, on...",
   opts:["Multiplie les deux membres par 6","Soustrait 6 aux deux membres","Divise les deux membres par 6"], correct:1},
];

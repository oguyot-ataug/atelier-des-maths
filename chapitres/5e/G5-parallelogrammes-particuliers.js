/* ============================================================
   CHAPITRE : Parallélogrammes particuliers (5e, G5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Réutilise les points/fonctions génériques du parallélogramme déjà définis
   globalement par chapitres/5e/G4-parallelogrammes.js (chargé avant ce fichier) :
   PG_A, PG_B, PG_C, PG_D, pgSub, pgAdd, pgNorm, pgMid, pgLabel, pgTickN,
   pgAngleArc, pgSvgWrap, pgBaseSides, pgBaseLabels -- pour les figures de
   "reconnaître", où l'on part justement d'un parallélogramme quelconque.
   Les figures propres au rectangle/losange/carré utilisent un nouveau
   préfixe pc pour ne pas entrer en conflit avec les fonctions pg.
   ============================================================ */

function pcSub(a,b){ return {x:a.x-b.x, y:a.y-b.y}; }
function pcAdd(a,b){ return {x:a.x+b.x, y:a.y+b.y}; }
function pcScale(a,k){ return {x:a.x*k, y:a.y*k}; }
function pcNorm(v){ const l=Math.hypot(v.x,v.y)||1; return {x:v.x/l, y:v.y/l}; }
function pcMid(a,b){ return {x:(a.x+b.x)/2, y:(a.y+b.y)/2}; }
function pcPerp(v){ return {x:-v.y, y:v.x}; }
function pcLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||13}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}
function pcTickN(mid, dir, n, size){
  size = size||5;
  const perp = pcPerp(dir);
  const spacing = 3.4;
  let out = '';
  for(let i=0;i<n;i++){
    const offset = (i-(n-1)/2)*spacing;
    const base = pcAdd(mid, pcScale(dir, offset));
    const p1 = pcAdd(base, pcScale(perp, size));
    const p2 = pcAdd(base, pcScale(perp, -size));
    out += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  }
  return out;
}
/* Petit carré d'angle droit au sommet, entre les deux côtés adjacents. */
function pcRightAngle(vertex, dirA, dirB, size){
  size = size||14;
  const pA = pcAdd(vertex, pcScale(dirA,size));
  const pB = pcAdd(vertex, pcScale(dirB,size));
  const pC = pcAdd(pA, pcScale(dirB,size));
  return `<polyline points="${pA.x},${pA.y} ${pC.x},${pC.y} ${pB.x},${pB.y}" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>`;
}
function pcSvgWrap(inner, w, h, maxW){
  return `<svg viewBox="0 0 ${w||400} ${h||260}" style="width:100%;max-width:${maxW||380}px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">${inner}</svg>`;
}
function pcQuadSides(A,B,C,D){
  return `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
}

/* ===== Points de référence : un vrai rectangle, un vrai losange, un vrai carré ===== */
const PC_R_A={x:80,y:70}, PC_R_B={x:320,y:70}, PC_R_C={x:320,y:190}, PC_R_D={x:80,y:190};
const PC_R_O = pcMid(PC_R_A,PC_R_C);
const PC_L_A={x:60,y:150}, PC_L_B={x:200,y:60}, PC_L_C={x:340,y:150}, PC_L_D={x:200,y:240};
const PC_L_O = pcMid(PC_L_A,PC_L_C);
const PC_S_A={x:120,y:70}, PC_S_B={x:280,y:70}, PC_S_C={x:280,y:230}, PC_S_D={x:120,y:230};
const PC_S_O = pcMid(PC_S_A,PC_S_C);

function pcQuadLabelsRect(A,B,C,D){
  return pcLabel(A.x-16,A.y-6,'A') + pcLabel(B.x+8,B.y-6,'B') + pcLabel(C.x+8,C.y+18,'C') + pcLabel(D.x-16,D.y+18,'D');
}
/* ================= Figures : rectangle ================= */
function pcRectAngleDirs(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  return {
    A:[pcNorm(pcSub(B,A)), pcNorm(pcSub(D,A))],
    B:[pcNorm(pcSub(A,B)), pcNorm(pcSub(C,B))],
    C:[pcNorm(pcSub(B,C)), pcNorm(pcSub(D,C))],
    D:[pcNorm(pcSub(A,D)), pcNorm(pcSub(C,D))],
  };
}
function pcBuildRectAnglesSvg(marked){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  const dirs = pcRectAngleDirs();
  let marks = '';
  marked.forEach(k=>{ marks += pcRightAngle({A,B,C,D}[k], dirs[k][0], dirs[k][1]); });
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}
function pcBuildRectDiagSvg(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D,O=PC_R_O;
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const ticks = pcTickN(pcMid(O,A), pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,B), pcNorm(pcSub(B,O)),1)
    + pcTickN(pcMid(O,C), pcNorm(pcSub(C,O)),1) + pcTickN(pcMid(O,D), pcNorm(pcSub(D,O)),1);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pcLabel(O.x+7,O.y-6,'O');
  return pcSvgWrap(pcQuadSides(A,B,C,D)+diag+ticks+oMark+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

/* ================= Figures : losange ================= */
function pcQuadLabelsLos(A,B,C,D){
  return pcLabel(A.x-16,A.y+4,'A') + pcLabel(B.x-4,B.y-10,'B') + pcLabel(C.x+8,C.y+4,'C') + pcLabel(D.x-6,D.y+20,'D');
}
function pcBuildLosSidesSvg(){
  const A=PC_L_A,B=PC_L_B,C=PC_L_C,D=PC_L_D;
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(B,C), pcNorm(pcSub(C,B)),1)
    + pcTickN(pcMid(C,D), pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A), pcNorm(pcSub(A,D)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+ticks+pcQuadLabelsLos(A,B,C,D), 400, 300, 380);
}
function pcBuildLosDiagSvg(){
  const A=PC_L_A,B=PC_L_B,C=PC_L_C,D=PC_L_D,O=PC_L_O;
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.3"/>`;
  const dAC = pcNorm(pcSub(C,A)), dBD = pcNorm(pcSub(D,B));
  const rightAngle = pcRightAngle(O, dAC, dBD, 11);
  const ticks = pcTickN(pcMid(O,A), pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C), pcNorm(pcSub(C,O)),1)
    + pcTickN(pcMid(O,B), pcNorm(pcSub(B,O)),2) + pcTickN(pcMid(O,D), pcNorm(pcSub(D,O)),2);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pcLabel(O.x+7,O.y-6,'O');
  return pcSvgWrap(pcQuadSides(A,B,C,D)+diag+rightAngle+ticks+oMark+pcQuadLabelsLos(A,B,C,D), 400, 300, 380);
}

/* ================= Figures : carré ================= */
function pcBuildSquareSvg(){
  const A=PC_S_A,B=PC_S_B,C=PC_S_C,D=PC_S_D;
  const dirs = {
    A:[pcNorm(pcSub(B,A)), pcNorm(pcSub(D,A))], B:[pcNorm(pcSub(A,B)), pcNorm(pcSub(C,B))],
    C:[pcNorm(pcSub(B,C)), pcNorm(pcSub(D,C))], D:[pcNorm(pcSub(A,D)), pcNorm(pcSub(C,D))],
  };
  const marks = ['A','B','C','D'].map(k=>pcRightAngle({A,B,C,D}[k], dirs[k][0], dirs[k][1])).join('');
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(B,C), pcNorm(pcSub(C,B)),1)
    + pcTickN(pcMid(C,D), pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A), pcNorm(pcSub(A,D)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+ticks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

/* ================= Figures "reconnaître" : parallélogramme quelconque (réutilise G4) ================= */
/* ============================================================
   MOTEUR INTERACTIF : on fait glisser le point D (A et B restent fixes) ;
   C = B + (D-A) pour que ABCD reste toujours un parallélogramme, quelle que
   soit la position de D. Un effet d'aimant verrouille D exactement sur la
   condition ciblée (angle droit ou côtés égaux) dès qu'on s'en approche.
   - kind='rect' : la condition est que l'angle en A soit droit (ce qui,
     dans un parallélogramme, équivaut exactement à avoir des diagonales de
     même longueur -- même lieu géométrique pour D, le cercle de Thalès sur [AB]).
   - kind='los'  : la condition est que AD = AB (ce qui équivaut exactement
     à avoir des diagonales perpendiculaires -- même lieu géométrique pour D,
     le cercle de centre A et de rayon AB).
   ============================================================ */
let pcDynState = {};
let pcDragTag = null;
function pcDynC(A,B,D){ return pcAdd(B, pcSub(D,A)); }
function pcDynAngleDeg(A,B,D){
  const v1=pcSub(B,A), v2=pcSub(D,A);
  const dot=v1.x*v2.x+v1.y*v2.y;
  const mag=Math.hypot(v1.x,v1.y)*Math.hypot(v2.x,v2.y)||1;
  return Math.acos(Math.max(-1,Math.min(1,dot/mag)))*180/Math.PI;
}
function pcDynInit(tag, A, B, D, kind, mode){ pcDynState[tag] = {A,B,D,kind,mode}; }
function pcDynRender(tag){
  const st = pcDynState[tag];
  const {A,B,kind,mode} = st;
  const D = st.D;
  const C = pcDynC(A,B,D);
  const abLen = Math.hypot(B.x-A.x,B.y-A.y);
  let satisfied;
  if(kind==='rect' || kind==='carre1'){ satisfied = Math.abs(pcDynAngleDeg(A,B,D)-90)<0.6; }
  else { satisfied = Math.abs(Math.hypot(D.x-A.x,D.y-A.y)-abLen)<2; }
  const dAB = pcNorm(pcSub(B,A)), dAD = pcNorm(pcSub(D,A));
  let extra = '';
  if(kind==='rect' && mode==='angle'){
    if(satisfied) extra += pcRightAngle(A,dAB,dAD,14);
  } else if(kind==='rect' && mode==='diagonals'){
    extra += `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#9E1F5E" stroke-width="1.3"/>`;
    if(satisfied){
      const Od = pcMid(A,C);
      extra += pcTickN(pcMid(Od,A), pcNorm(pcSub(A,Od)),1) + pcTickN(pcMid(Od,C), pcNorm(pcSub(C,Od)),1)
             + pcTickN(pcMid(Od,B), pcNorm(pcSub(B,Od)),1) + pcTickN(pcMid(Od,D), pcNorm(pcSub(D,Od)),1);
    }
  } else if(kind==='los' && mode==='sides'){
    if(satisfied) extra += pcTickN(pcMid(A,B), dAB, 1) + pcTickN(pcMid(A,D), dAD, 1);
  } else if(kind==='los' && mode==='diagonals'){
    extra += `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#9E1F5E" stroke-width="1.3"/>`;
    if(satisfied){
      const Od = pcMid(A,C);
      extra += pcRightAngle(Od, pcNorm(pcSub(C,A)), pcNorm(pcSub(D,B)), 11);
    }
  } else if(kind==='carre1'){
    // toujours un losange (D contraint sur le cercle de rayon AB) : on code les 4 côtés en continu.
    extra += pcTickN(pcMid(A,B), dAB, 1) + pcTickN(pcMid(B,C), pcNorm(pcSub(C,B)),1)
           + pcTickN(pcMid(C,D), pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A), pcNorm(pcSub(A,D)),1);
    if(satisfied) extra += pcRightAngle(A,dAB,dAD,14);
  } else if(kind==='carre2'){
    // toujours un rectangle (D contraint sur la perpendiculaire en A) : on code les 4 angles droits en continu.
    const dirs = {A:[dAB,dAD], B:[pcNorm(pcSub(A,B)),pcNorm(pcSub(C,B))], C:[pcNorm(pcSub(B,C)),pcNorm(pcSub(D,C))], D:[pcNorm(pcSub(A,D)),pcNorm(pcSub(C,D))]};
    extra += pcRightAngle(A,dirs.A[0],dirs.A[1]) + pcRightAngle(B,dirs.B[0],dirs.B[1]) + pcRightAngle(C,dirs.C[0],dirs.C[1]) + pcRightAngle(D,dirs.D[0],dirs.D[1]);
    if(satisfied) extra += pcTickN(pcMid(A,B), dAB, 1) + pcTickN(pcMid(A,D), dAD, 1);
  }
  const labels = pcLabel(A.x-16,A.y+4,'A') + pcLabel(B.x+8,B.y+4,'B') + pcLabel(C.x+8,C.y-6,'C') + pcLabel(D.x-8,D.y-10,'D');
  const handleColor = satisfied ? '#1F6B3A' : 'var(--accent-orange)';
  const handle = `<circle cx="${D.x}" cy="${D.y}" r="10" fill="${handleColor}" stroke="#fff" stroke-width="2" style="cursor:grab;" data-pcdyn="${tag}"/>`;
  const msgMap = {
    'rect-angle': "Angle droit : c'est un rectangle !",
    'rect-diagonals': "Diagonales de même longueur : c'est un rectangle !",
    'los-sides': "Côtés consécutifs égaux : c'est un losange !",
    'los-diagonals': "Diagonales perpendiculaires : c'est un losange !",
    'carre1-angle': "Angle droit : ce losange est un carré !",
    'carre2-sides': "Côtés consécutifs égaux : ce rectangle est un carré !",
  };
  const msgKey = (kind==='carre1') ? 'carre1-angle' : (kind==='carre2') ? 'carre2-sides' : `${kind}-${mode}`;
  const msg = satisfied ? msgMap[msgKey] : 'Fais glisser le point orange.';
  const svgId = 'pcDynSvg-'+tag;
  const svg = `<svg id="${svgId}" viewBox="0 0 440 400" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;touch-action:none;">
    <line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${extra}${labels}${handle}
  </svg>`;
  const wrap = document.getElementById('pcDynWrap-'+tag);
  if(wrap) wrap.innerHTML = svg;
  const status = document.getElementById('pcDynStatus-'+tag);
  if(status){ status.textContent = msg; status.style.color = satisfied ? '#1F6B3A' : 'var(--ink-soft)'; }
  pcDynAttach(tag);
}
function pcDynAttach(tag){
  const wrap = document.getElementById('pcDynWrap-'+tag);
  if(!wrap) return;
  const handle = wrap.querySelector(`[data-pcdyn="${tag}"]`);
  if(!handle) return;
  handle.onpointerdown = function(ev){
    ev.preventDefault();
    pcDragTag = tag;
    document.addEventListener('pointermove', pcDynMove);
    document.addEventListener('pointerup', pcDynUp, {once:true});
  };
}
function pcDynSvgPoint(svg, clientX, clientY){
  const pt = svg.createSVGPoint();
  pt.x = clientX; pt.y = clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function pcDynMove(ev){
  if(!pcDragTag) return;
  const tag = pcDragTag;
  const st = pcDynState[tag];
  const svg = document.getElementById('pcDynSvg-'+tag);
  if(!svg) return;
  const p = pcDynSvgPoint(svg, ev.clientX, ev.clientY);
  let D = {x:p.x, y:p.y};
  const {A,B,kind} = st;
  const abLen = Math.hypot(B.x-A.x,B.y-A.y);
  if(kind==='rect'){
    const angle = pcDynAngleDeg(A,B,D);
    if(Math.abs(angle-90)<4){
      const dist = Math.hypot(D.x-A.x, D.y-A.y);
      const perp = pcPerp(pcNorm(pcSub(B,A)));
      const side = ((D.x-A.x)*perp.x + (D.y-A.y)*perp.y) >= 0 ? 1 : -1;
      D = pcAdd(A, pcScale(perp, side*dist));
    }
  } else if(kind==='los'){
    const adLen = Math.hypot(D.x-A.x, D.y-A.y) || 1;
    if(Math.abs(adLen-abLen)<8){
      D = pcAdd(A, pcScale(pcNorm(pcSub(D,A)), abLen));
    }
  } else if(kind==='carre1'){
    // toujours un losange : D reste en permanence sur le cercle de rayon AB, seul l'angle varie.
    D = pcAdd(A, pcScale(pcNorm(pcSub(D,A)), abLen));
    const angle = pcDynAngleDeg(A,B,D);
    if(Math.abs(angle-90)<4){
      const perp = pcPerp(pcNorm(pcSub(B,A)));
      const side = ((D.x-A.x)*perp.x + (D.y-A.y)*perp.y) >= 0 ? 1 : -1;
      D = pcAdd(A, pcScale(perp, side*abLen));
    }
  } else if(kind==='carre2'){
    // toujours un rectangle : D reste en permanence sur la perpendiculaire en A, seule la distance varie.
    const perp = pcPerp(pcNorm(pcSub(B,A)));
    const v = pcSub(D,A);
    const signedDist = v.x*perp.x + v.y*perp.y;
    let dist = Math.abs(signedDist) || 1;
    if(Math.abs(dist-abLen)<8) dist = abLen;
    D = pcAdd(A, pcScale(perp, (signedDist>=0?1:-1)*dist));
  }
  st.D = D;
  pcDynRender(tag);
}
function pcDynUp(){ document.removeEventListener('pointermove', pcDynMove); pcDragTag = null; }
function pcDynWidget(tag){
  return `<div id="pcDynWrap-${tag}"></div><p class="hint" id="pcDynStatus-${tag}" style="text-align:center;font-weight:700;margin:6px 0;"></p>`;
}
function pcBuildLosOneRightSvg(){
  const dAB = pcNorm(pcSub(PC_L_B,PC_L_A));
  const dAD = pcNorm(pcSub(PC_L_D,PC_L_A));
  const mark = pcRightAngle(PC_L_A, dAB, dAD, 14);
  const ticks = pcTickN(pcMid(PC_L_A,PC_L_B), pcNorm(pcSub(PC_L_B,PC_L_A)),1) + pcTickN(pcMid(PC_L_B,PC_L_C), pcNorm(pcSub(PC_L_C,PC_L_B)),1)
    + pcTickN(pcMid(PC_L_C,PC_L_D), pcNorm(pcSub(PC_L_D,PC_L_C)),1) + pcTickN(pcMid(PC_L_D,PC_L_A), pcNorm(pcSub(PC_L_A,PC_L_D)),1);
  return pcSvgWrap(pcQuadSides(PC_L_A,PC_L_B,PC_L_C,PC_L_D)+mark+ticks+pcQuadLabelsLos(PC_L_A,PC_L_B,PC_L_C,PC_L_D), 400, 300, 380);
}
function pcBuildRectTwoSidesSvg(){
  const A=PC_R_A,B=PC_R_B,C=PC_R_C,D=PC_R_D;
  const dirs = pcRectAngleDirs();
  const marks = pcRightAngle(A,dirs.A[0],dirs.A[1]) + pcRightAngle(B,dirs.B[0],dirs.B[1]) + pcRightAngle(C,dirs.C[0],dirs.C[1]) + pcRightAngle(D,dirs.D[0],dirs.D[1]);
  const ticks = pcTickN(pcMid(A,B), pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(A,D), pcNorm(pcSub(D,A)),1);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+marks+ticks+pcQuadLabelsRect(A,B,C,D), 400, 260, 380);
}

document.getElementById('cours-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Le rectangle</h3></div>

<p class="example-title" style="margin-top:0;">A. Définition et propriétés caractéristiques</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>rectangle</b> est un quadrilatère qui a ses quatre angles droits.</div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère est un <b>rectangle</b> alors c'est un <b>parallélogramme</b>.</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">MNPQ est un rectangle. Il a donc quatre angles droits.</p>
<p style="margin:2px 0;">Les droites (MN) et (QP) sont perpendiculaires à la même droite (NP), donc elles sont parallèles entre elles.</p>
<p style="margin:2px 0 12px;">Les droites (MQ) et (NP) sont perpendiculaires à la même droite (QP), donc elles sont parallèles entre elles. Donc MNPQ est un parallélogramme.</p>
<p class="hint" style="margin:0 0 14px;">Remarque : un rectangle a donc toutes les propriétés du parallélogramme.</p>
<div class="figure-wrap">${pcBuildRectAnglesSvg(['A','B','C','D'])}</div>
<p style="margin:10px 0 14px;">ABCD est un rectangle. Ses quatre angles sont droits.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère est un <b>rectangle</b> alors ses diagonales se coupent en leur milieu et ont la même longueur.</div>
<div class="figure-wrap">${pcBuildRectDiagSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un rectangle de centre O. Donc ses diagonales [AC] et [BD] se coupent en leur milieu O et ont la même longueur : OA = OB = OC = OD et AC = BD.</p>

<p class="example-title" style="margin-top:22px;">B. Reconnaître un rectangle</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère possède <b>trois angles droits</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcBuildRectAnglesSvg(['A','B','C'])}</div>
<p style="margin:10px 0 14px;">Le quadrilatère ABCD a trois angles droits en A, B et C. Or, la somme des angles d'un quadrilatère est toujours égale à 360°. Donc l'angle en D mesure aussi 90°, et ABCD est un rectangle.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>parallélogramme</b> a ses diagonales de <b>même longueur</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcDynWidget('rectDiag')}<p class="hint interaction-hint" style="text-align:center;">Fais glisser le point D : quand les diagonales deviennent égales, la figure devient un rectangle.</p></div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0 14px;">ABCD est un parallélogramme tel que AC = BD. Ses côtés opposés ont donc la même longueur deux à deux, et ses diagonales ont la même longueur : ABCD est donc un rectangle.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">Si un <b>parallélogramme</b> a un <b>angle droit</b> alors c'est un <b>rectangle</b>.</div>
<div class="figure-wrap">${pcDynWidget('rectAngle')}<p class="hint interaction-hint" style="text-align:center;">Fais glisser le point D pour modifier l'angle en A : quand il devient droit, la figure devient un rectangle.</p></div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">ABCD est un parallélogramme dont l'angle en A est droit.</p>
<p style="margin:2px 0;">Les côtés (AB) et (CD) sont parallèles et, comme (AD) est perpendiculaire à (AB), (AD) est également perpendiculaire à (CD). Donc l'angle en D est droit également.</p>
<p style="margin:2px 0 14px;">De la même manière, les angles en B et en C sont droits eux aussi. Donc le parallélogramme ABCD est un rectangle.</p>

<div class="lesson-header"><span class="num">2</span><h3>Le losange</h3></div>

<p class="example-title" style="margin-top:0;">A. Définition et propriétés caractéristiques</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>losange</b> est un quadrilatère qui a ses quatre côtés de même longueur.</div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un quadrilatère est un <b>losange</b> alors c'est un <b>parallélogramme</b>.</div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0 12px;">Les côtés opposés du losange ont la même longueur deux à deux (puisque ses quatre côtés sont égaux), donc c'est un parallélogramme.</p>
<p class="hint" style="margin:0 0 14px;">Remarque : un losange a donc toutes les propriétés du parallélogramme.</p>
<div class="figure-wrap">${pcBuildLosSidesSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un losange. AB = BC = CD = DA, donc ABCD est un losange.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un quadrilatère est un <b>losange</b> alors ses diagonales se coupent en leur milieu et sont perpendiculaires.</div>
<div class="figure-wrap">${pcBuildLosDiagSvg()}</div>
<p style="margin:10px 0 14px;">ABCD est un losange de centre O. Donc ses diagonales [AC] et [BD] se coupent en leur milieu O et sont perpendiculaires : OA = OC, OB = OD et (AC) ⊥ (BD).</p>

<p class="example-title" style="margin-top:22px;">B. Reconnaître un losange</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un <b>parallélogramme</b> a <b>deux côtés consécutifs de même longueur</b> alors c'est un <b>losange</b>.</div>
<div class="figure-wrap">${pcDynWidget('losSides')}<p class="hint interaction-hint" style="text-align:center;">Fais glisser le point D : quand AD devient égal à AB, la figure devient un losange.</p></div>
<p style="margin:10px 0 6px;"><b>Démonstration</b> :</p>
<p style="margin:2px 0;">ABCD est un parallélogramme tel que AB = AD. Ses côtés opposés ont donc la même longueur deux à deux : AB = CD et AD = BC.</p>
<p style="margin:2px 0 14px;">Or AB = AD, donc AB = BC = CD = DA. Le quadrilatère ABCD a ses quatre côtés de même longueur : c'est donc un losange.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>parallélogramme</b> a ses diagonales <b>perpendiculaires</b> alors c'est un <b>losange</b>.</div>
<div class="figure-wrap">${pcDynWidget('losDiag')}<p class="hint interaction-hint" style="text-align:center;">Fais glisser le point D : quand les diagonales deviennent perpendiculaires, la figure devient un losange.</p></div>
<p style="margin:10px 0 14px;">ABCD est un parallélogramme dont les diagonales [AC] et [BD] sont perpendiculaires. Donc le parallélogramme ABCD est un losange.</p>

<div class="lesson-header"><span class="num">3</span><h3>Le carré</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Un <b>carré</b> est un quadrilatère qui a quatre angles droits et quatre côtés de même longueur.</div>
<div class="figure-wrap">${pcBuildSquareSvg()}</div>
<p style="margin:10px 0 6px;">ABCD est un carré. AB = BC = CD = DA et (AB) ⊥ (BC) ; (BC) ⊥ (CD) ; (CD) ⊥ (DA) ; (DA) ⊥ (AB).</p>
<p class="hint" style="margin:0 0 14px;">Remarques : un carré est un quadrilatère qui est à la fois un rectangle et un losange. Un carré a donc toutes les propriétés du parallélogramme, du rectangle et du losange.</p>

<p class="example-title" style="margin-top:0;">Reconnaître un carré</p>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Si un <b>losange</b> a un <b>angle droit</b> alors c'est un <b>carré</b>.</div>
<div class="figure-wrap">${pcDynWidget('carre1')}<p class="hint interaction-hint" style="text-align:center;">Ce quadrilatère reste toujours un losange, quel que soit l'endroit où tu déplaces D. Fais-le glisser pour modifier l'angle en A : quand il devient droit, le losange devient un carré.</p></div>
<p style="margin:10px 0 14px;">ABCD est un losange dont l'angle en A est droit. Un losange a toutes les propriétés du parallélogramme, donc les angles en B, C et D sont droits également (Propriété 3 du rectangle). ABCD a donc ses quatre côtés égaux et ses quatre angles droits : c'est un carré.</p>

<span class="prop-badge">Propriété 2</span>
<div class="def-box">Si un <b>rectangle</b> a <b>deux côtés consécutifs de même longueur</b> alors c'est un <b>carré</b>.</div>
<div class="figure-wrap">${pcDynWidget('carre2')}<p class="hint interaction-hint" style="text-align:center;">Ce quadrilatère reste toujours un rectangle, quel que soit l'endroit où tu déplaces D. Fais-le glisser pour modifier la longueur AD : quand elle devient égale à AB, le rectangle devient un carré.</p></div>
<p style="margin:10px 0 14px;">ABCD est un rectangle tel que AB = AD. Un rectangle est un parallélogramme, donc ABCD est aussi un losange (Propriété 1 du losange). ABCD a donc ses quatre angles droits et ses quatre côtés égaux : c'est un carré.</p>
`;

document.getElementById('histoire-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Bien avant qu'on démontre leurs propriétés, les rectangles et les carrés étaient déjà utilisés en pratique : en Égypte antique, des arpenteurs surnommés les « tendeurs de corde » utilisaient une corde à 12 nœuds régulièrement espacés pour tracer des angles droits sur le terrain, en formant un triangle de côtés 3, 4 et 5 nœuds (aujourd'hui on dirait un « triangle 3-4-5 »). Cette technique très simple leur permettait de construire des rectangles bien droits pour délimiter des champs ou poser les fondations de monuments, sans le moindre instrument de mesure d'angle.
</div>
`;

/* ================= METHODE ================= */
const QC_PROPS = [
  {code:'P1', label:'(AB) ∥ (CD) -- un couple de côtés opposés parallèles'},
  {code:'P2', label:'(AD) ∥ (BC) -- l\'autre couple de côtés opposés parallèles'},
  {code:'Dbis', label:'Les diagonales se coupent en leur milieu'},
  {code:'Deq', label:'Les diagonales sont de même longueur'},
  {code:'Dperp', label:'Les diagonales sont perpendiculaires'},
  {code:'Sconsec', label:'Deux côtés consécutifs sont de même longueur'},
  {code:'Angle90', label:'Un angle est droit'},
  {code:'Kite', label:'Deux paires de côtés consécutifs sont de même longueur'},
];
let qcActive = new Set();
function qcClassify(){
  const has = p => qcActive.has(p);
  const isParallelogram = (has('P1') && has('P2')) || has('Dbis');
  const isRectangle = isParallelogram && (has('Deq') || has('Angle90'));
  const isLosange = isParallelogram && (has('Sconsec') || has('Dperp') || has('Kite'));
  const isCarre = isRectangle && isLosange;
  if(isCarre) return 'Carré';
  if(isLosange) return 'Losange';
  if(isRectangle) return 'Rectangle';
  if(isParallelogram) return 'Parallélogramme';
  if(has('Kite')) return 'Cerf-volant';
  if(has('P1') !== has('P2')) return 'Trapèze';
  return 'Quelconque';
}
function qcToggle(code){
  if(qcActive.has(code)) qcActive.delete(code); else qcActive.add(code);
  qcRender();
}
function qcReset(){ qcActive = new Set(); qcRender(); }
function qcQuadLabelsGeneric(A,B,C,D){
  return pcLabel(A.x-16,A.y+6,'A') + pcLabel(B.x+8,B.y+10,'B') + pcLabel(C.x+8,C.y-6,'C') + pcLabel(D.x-8,D.y-10,'D');
}
/* Points de base selon la classification atteinte, pour que la figure soit réellement
   cohérente avec ce qui a déjà été établi (un vrai parallélogramme dès que Dbis ou P1+P2
   sont cochés, un vrai losange une fois la classification atteinte, etc.). */
function qcPointsFor(name){
  switch(name){
    case 'Carré': return {A:PC_S_A,B:PC_S_B,C:PC_S_C,D:PC_S_D};
    case 'Rectangle': return {A:PC_R_A,B:PC_R_B,C:PC_R_C,D:PC_R_D};
    case 'Losange': return {A:PC_L_A,B:PC_L_B,C:PC_L_C,D:PC_L_D};
    case 'Parallélogramme': return {A:PG_A,B:PG_B,C:PG_C,D:PG_D};
    case 'Trapèze': return {A:{x:70,y:220},B:{x:330,y:220},C:{x:270,y:80},D:{x:130,y:80}};
    case 'Cerf-volant': return {A:{x:200,y:50},B:{x:320,y:150},C:{x:200,y:260},D:{x:80,y:150}};
    default: return {A:{x:90,y:200},B:{x:300,y:230},C:{x:330,y:90},D:{x:150,y:60}};
  }
}
/* Construit la figure en codant exactement les propriétés actuellement cochées (et pas
   seulement la classification finale) : diagonales et leur codage dès qu'une propriété de
   diagonale est cochée, côtés codés dès qu'une propriété de côté est cochée, etc. */
function qcBuildFigure(){
  const name = qcClassify();
  const {A,B,C,D} = qcPointsFor(name);
  const has = p => qcActive.has(p);
  const O = pcMid(A,C);
  let extra = '';
  const needDiag = has('Dbis') || has('Deq') || has('Dperp');
  if(needDiag){
    extra += `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#9E1F5E" stroke-width="1.3"/>`;
    if(has('Dbis')) extra += `<circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>`+pcLabel(O.x+7,O.y-6,'O');
    if(has('Deq') && has('Dbis')){
      extra += pcTickN(pcMid(O,A),pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C),pcNorm(pcSub(C,O)),1)
             + pcTickN(pcMid(O,B),pcNorm(pcSub(B,O)),1) + pcTickN(pcMid(O,D),pcNorm(pcSub(D,O)),1);
    } else if(has('Deq')){
      extra += pcTickN(pcMid(A,C),pcNorm(pcSub(C,A)),1) + pcTickN(pcMid(B,D),pcNorm(pcSub(D,B)),1);
    }
    if(has('Dperp')) extra += pcRightAngle(O, pcNorm(pcSub(C,A)), pcNorm(pcSub(D,B)), 11);
  }
  if(has('Sconsec')){
    extra += pcTickN(pcMid(A,B),pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(A,D),pcNorm(pcSub(D,A)),1);
  }
  const isParallelogramNow = (has('P1') && has('P2')) || has('Dbis');
  if(has('Kite') && isParallelogramNow){
    // Kite + parallélogramme ⇒ les 4 côtés sont en réalité égaux (c'est un losange) : codage uniforme.
    extra += pcTickN(pcMid(A,B),pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(B,C),pcNorm(pcSub(C,B)),1)
           + pcTickN(pcMid(C,D),pcNorm(pcSub(D,C)),1) + pcTickN(pcMid(D,A),pcNorm(pcSub(A,D)),1);
  } else if(has('Kite')){
    extra += pcTickN(pcMid(A,B),pcNorm(pcSub(B,A)),1) + pcTickN(pcMid(A,D),pcNorm(pcSub(D,A)),1)
           + pcTickN(pcMid(C,B),pcNorm(pcSub(B,C)),2) + pcTickN(pcMid(C,D),pcNorm(pcSub(D,C)),2);
  }
  if(has('Angle90')) extra += pcRightAngle(A, pcNorm(pcSub(B,A)), pcNorm(pcSub(D,A)), 14);
  let tagY = 22;
  if(has('P1')){ extra += `<text x="16" y="${tagY}" font-size="12" font-weight="700" fill="#1F3A5C">(AB) ∥ (DC)</text>`; tagY += 16; }
  if(has('P2')){ extra += `<text x="16" y="${tagY}" font-size="12" font-weight="700" fill="#1F3A5C">(AD) ∥ (BC)</text>`; }
  const labels = qcQuadLabelsGeneric(A,B,C,D);
  return pcSvgWrap(pcQuadSides(A,B,C,D)+extra+labels, 420,320,360);
}
function qcRender(){
  document.querySelectorAll('.qc-btn').forEach(btn=>{
    btn.classList.toggle('active', qcActive.has(btn.dataset.code));
  });
  const result = document.getElementById('qcResult');
  if(result) result.textContent = qcClassify();
  const fig = document.getElementById('qcFigure');
  if(fig) fig.innerHTML = qcBuildFigure();
}
/* ================= Constructions pas à pas ================= */
function pccArc(center, radius, angleCenterRad, spanDeg, color){
  return `<polyline points="${pgArcSample(center, radius, angleCenterRad, spanDeg)}" fill="none" stroke="${color||'#1F6B3A'}" stroke-width="1.4"/>`;
}
/* Trait légèrement ondulé (à main levée), via une courbe dont les points de contrôle sont
   décalés perpendiculairement au segment -- volontairement imprécis. */
function pcSketchSide(p1,p2,bulge1,bulge2){
  const dir = pcNorm(pcSub(p2,p1));
  const perp = pcPerp(dir);
  const q1 = pcAdd(pcAdd(p1, pcScale(pcSub(p2,p1),0.33)), pcScale(perp, bulge1));
  const q2 = pcAdd(pcAdd(p1, pcScale(pcSub(p2,p1),0.66)), pcScale(perp, bulge2));
  return `<path d="M ${p1.x} ${p1.y} C ${q1.x} ${q1.y} ${q2.x} ${q2.y} ${p2.x} ${p2.y}" fill="none" stroke="#1C1B2E" stroke-width="1.5" stroke-linecap="round"/>`;
}

/* ---- Construction 1 : rectangle ABCD de centre O, diagonales 3,4 cm, AB = 3 cm ---- */
/* Figure à main levée : quadrilatère volontairement imprécis (pas un vrai rectangle au pixel
   près), avec le codage qui indique ce qui est donné dans l'énoncé. */
function pccR1Sketch(){
  const A={x:85,y:205}, B={x:300,y:190}, C={x:312,y:78}, D={x:80,y:95};
  const O = pcMid(A,C);
  const sides = pcSketchSide(A,B,-3,4)+pcSketchSide(B,C,4,-3)+pcSketchSide(C,D,-3,4)+pcSketchSide(D,A,4,-3);
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1" stroke-dasharray="3,3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1" stroke-dasharray="3,3"/>`;
  const ticks = pcTickN(pcMid(O,A),pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C),pcNorm(pcSub(C,O)),1)
    + pcTickN(pcMid(O,B),pcNorm(pcSub(B,O)),1) + pcTickN(pcMid(O,D),pcNorm(pcSub(D,O)),1);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2" fill="#1C1B2E"/>`+pcLabel(O.x+6,O.y-8,'O');
  const labels = pcLabel(A.x-14,A.y+18,'A')+pcLabel(B.x+6,B.y+18,'B')+pcLabel(C.x+6,C.y-6,'C')+pcLabel(D.x-14,D.y-6,'D');
  const halfLabel = (P,Q,dx,dy)=>pcLabel((P.x+Q.x)/2+dx,(P.y+Q.y)/2+dy,'1,7 cm',11,false);
  const measures = pcLabel((A.x+B.x)/2-16, A.y+34, '3 cm', 12,false)
    + halfLabel(O,A,-38,4) + halfLabel(O,C,10,-2) + halfLabel(O,B,6,-10) + halfLabel(O,D,-6,16);
  return pcSvgWrap(sides+diag+ticks+oMark+labels+measures, 400,280,320);
}
/* Figure de construction précise (échelle agrandie pour la lisibilité à l'impression). */
const PCC_R_A = {x:105,y:250}, PCC_R_B = {x:295,y:250};
const PCC_R_O = {x:200,y:200};
const PCC_R_C = {x:295,y:150}, PCC_R_D = {x:105,y:150};
const PCC_R_RADIUS = Math.hypot(PCC_R_O.x-PCC_R_A.x, PCC_R_O.y-PCC_R_A.y);
let pccR1Step = 0;
function pccR1Render(step){
  const A=PCC_R_A,B=PCC_R_B,O=PCC_R_O,C=PCC_R_C,D=PCC_R_D,r=PCC_R_RADIUS;
  let s = `<svg id="pccR1Svg" viewBox="0 0 400 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  s += `<circle cx="${A.x}" cy="${A.y}" r="2.4" fill="#1C1B2E"/><circle cx="${B.x}" cy="${B.y}" r="2.4" fill="#1C1B2E"/>`;
  s += pcLabel(A.x-14,A.y+18,'A') + pcLabel(B.x+6,B.y+18,'B');
  if(step>=1){
    const angA = Math.atan2(O.y-A.y,O.x-A.x);
    const angB = Math.atan2(O.y-B.y,O.x-B.x);
    s += pccArc(A,r,angA,34,'#1F6B3A') + pccArc(B,r,angB,34,'#9E1F5E');
  }
  if(step>=2){
    s += `<circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>`+pcLabel(O.x+6,O.y-8,'O');
    const extAC = pgExtend(A, C, 18), extBD = pgExtend(B, D, 18);
    s += `<line x1="${A.x}" y1="${A.y}" x2="${extAC.b.x}" y2="${extAC.b.y}" stroke="#1F3A5C" stroke-width="1.2" stroke-dasharray="5,4"/>`;
    s += `<line x1="${B.x}" y1="${B.y}" x2="${extBD.b.x}" y2="${extBD.b.y}" stroke="#9E1F5E" stroke-width="1.2" stroke-dasharray="5,4"/>`;
  }
  if(step>=3){
    const angOC = Math.atan2(C.y-O.y, C.x-O.x), angOD = Math.atan2(D.y-O.y, D.x-O.x);
    s += pccArc(O,r,angOC,26,'#1F6B3A') + pccArc(O,r,angOD,26,'#9E1F5E');
    s += pcTickN(pcMid(O,A), pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C), pcNorm(pcSub(C,O)),1)
       + pcTickN(pcMid(O,B), pcNorm(pcSub(B,O)),1) + pcTickN(pcMid(O,D), pcNorm(pcSub(D,O)),1);
    s += `<circle cx="${C.x}" cy="${C.y}" r="2.4" fill="#1C1B2E"/><circle cx="${D.x}" cy="${D.y}" r="2.4" fill="#1C1B2E"/>`;
    s += pcLabel(C.x+6,C.y-6,'C') + pcLabel(D.x-14,D.y-6,'D');
  }
  if(step>=4){
    s += `<line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  s += `</svg>`;
  const wrap = document.getElementById('pccR1Wrap');
  if(wrap) wrap.innerHTML = s;
  document.querySelectorAll('#pccR1Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  const btn = document.getElementById('pccR1Next');
  if(btn){ btn.textContent = step>=4 ? 'Terminé ✓' : 'Étape suivante →'; btn.disabled = step>=4; }
}
function pccR1Next(){ if(pccR1Step<4){ pccR1Step++; pccR1Render(pccR1Step); } }
function pccR1Reset(){ pccR1Step=0; pccR1Render(0); }
const PCC_R1_STEPS = [
  {note:"On trace le segment [AB] de longueur 3 cm."},
  {note:"On trace un arc de centre A et de rayon 1,7 cm, puis un arc de centre B et de rayon 1,7 cm : ils se coupent en O, au-dessus de [AB]."},
  {note:"O est le centre du rectangle : OA = OB = 1,7 cm. On trace les demi-droites [AO) et [BO), prolongées au-delà de O."},
  {note:"Au compas, on reporte OA au-delà de O sur [AO) (petit arc de centre O) : on obtient C. On reporte de même OB sur [BO) : on obtient D."},
  {note:"On trace les côtés [BC], [CD] et [DA]. ABCD est le rectangle cherché."},
];

/* ---- Construction 2 : losange ABCD de centre O, AC = 3,6 cm, BD = 2 cm ---- */
function pccL1Sketch(){
  const A={x:75,y:190}, C={x:305,y:175}, B={x:200,y:75}, D={x:185,y:260};
  const O = pcMid(A,C);
  const sides = pcSketchSide(A,B,3,-4)+pcSketchSide(B,C,-4,3)+pcSketchSide(C,D,3,-4)+pcSketchSide(D,A,-4,3);
  const ticks = pcTickN(pcMid(O,A),pcNorm(pcSub(A,O)),1) + pcTickN(pcMid(O,C),pcNorm(pcSub(C,O)),1)
    + pcTickN(pcMid(O,B),pcNorm(pcSub(B,O)),2) + pcTickN(pcMid(O,D),pcNorm(pcSub(D,O)),2);
  const diag = `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1" stroke-dasharray="3,3"/>
    <line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1" stroke-dasharray="3,3"/>`;
  const rightAngle = pcRightAngle(O, pcNorm(pcSub(C,A)), pcNorm(pcSub(D,B)), 10);
  const oMark = `<circle cx="${O.x}" cy="${O.y}" r="2" fill="#1C1B2E"/>`+pcLabel(O.x+6,O.y-8,'O');
  const labels = pcLabel(A.x-14,A.y+18,'A')+pcLabel(B.x+6,B.y-6,'B')+pcLabel(C.x+6,C.y+18,'C')+pcLabel(D.x+6,D.y+18,'D');
  const halfLabel = (P,Q,dx,dy,txt)=>pcLabel((P.x+Q.x)/2+dx,(P.y+Q.y)/2+dy,txt,11,false);
  const measures = halfLabel(O,A,-40,2,'1,8 cm') + halfLabel(O,C,8,-4,'1,8 cm') + halfLabel(O,B,8,-8,'1 cm') + halfLabel(O,D,8,16,'1 cm');
  return pcSvgWrap(sides+ticks+diag+rightAngle+oMark+labels+measures, 400,300,320);
}
const PCC_L_A = {x:100,y:210}, PCC_L_C = {x:300,y:210};
const PCC_L_O = pcMid(PCC_L_A, PCC_L_C);
const PCC_L_B = {x:200,y:150}, PCC_L_D = {x:200,y:270};
const PCC_L_MEDIA_R = 130;
const PCC_L_BD_R = Math.hypot(PCC_L_O.x-PCC_L_B.x, PCC_L_O.y-PCC_L_B.y);
let pccL1Step = 0;
function pccL1Render(step){
  const A=PCC_L_A,C=PCC_L_C,O=PCC_L_O,B=PCC_L_B,D=PCC_L_D,r=PCC_L_MEDIA_R,rBD=PCC_L_BD_R;
  const halfAC = Math.hypot(C.x-A.x,C.y-A.y)/2;
  const h = Math.sqrt(Math.max(r*r-halfAC*halfAC,0));
  const upPt = {x:O.x, y:O.y-h}, downPt = {x:O.x, y:O.y+h};
  let s = `<svg id="pccL1Svg" viewBox="0 0 400 340" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">`;
  s += `<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  s += `<circle cx="${A.x}" cy="${A.y}" r="2.4" fill="#1C1B2E"/><circle cx="${C.x}" cy="${C.y}" r="2.4" fill="#1C1B2E"/>`;
  s += pcLabel(A.x-14,A.y+18,'A') + pcLabel(C.x+6,C.y+18,'C');
  if(step>=1){
    const angAUp = Math.atan2(upPt.y-A.y,upPt.x-A.x);
    const angADown = Math.atan2(downPt.y-A.y,downPt.x-A.x);
    const angCUp = Math.atan2(upPt.y-C.y,upPt.x-C.x);
    const angCDown = Math.atan2(downPt.y-C.y,downPt.x-C.x);
    s += pccArc(A,r,angAUp,22,'#1F6B3A') + pccArc(A,r,angADown,22,'#1F6B3A');
    s += pccArc(C,r,angCUp,22,'#9E1F5E') + pccArc(C,r,angCDown,22,'#9E1F5E');
    s += `<line x1="${upPt.x}" y1="${upPt.y}" x2="${downPt.x}" y2="${downPt.y}" stroke="#1F3A5C" stroke-width="1.2" stroke-dasharray="4,3"/>`;
  }
  if(step>=2){
    s += `<circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>`+pcLabel(O.x+6,O.y-8,'O');
  }
  if(step>=3){
    const angOB = Math.atan2(B.y-O.y,B.x-O.x), angOD = Math.atan2(D.y-O.y,D.x-O.x);
    s += pccArc(O,rBD,angOB,30,'#1F6B3A') + pccArc(O,rBD,angOD,30,'#9E1F5E');
    s += `<circle cx="${B.x}" cy="${B.y}" r="2.4" fill="#1C1B2E"/><circle cx="${D.x}" cy="${D.y}" r="2.4" fill="#1C1B2E"/>`;
    s += `<circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>`+pcLabel(O.x+6,O.y-8,'O');
    s += pcLabel(B.x+6,B.y-6,'B') + pcLabel(D.x+6,D.y+18,'D');
  }
  if(step>=4){
    s += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${C.x}" y1="${C.y}" x2="${D.x}" y2="${D.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${D.x}" y1="${D.y}" x2="${A.x}" y2="${A.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  s += `</svg>`;
  const wrap = document.getElementById('pccL1Wrap');
  if(wrap) wrap.innerHTML = s;
  document.querySelectorAll('#pccL1Steps .step-item').forEach((el,i)=>el.classList.toggle('done', i<=step));
  const btn = document.getElementById('pccL1Next');
  if(btn){ btn.textContent = step>=4 ? 'Terminé ✓' : 'Étape suivante →'; btn.disabled = step>=4; }
}
function pccL1Next(){ if(pccL1Step<4){ pccL1Step++; pccL1Render(pccL1Step); } }
function pccL1Reset(){ pccL1Step=0; pccL1Render(0); }
const PCC_L1_STEPS = [
  {note:"On trace le segment [AC] de longueur 3,6 cm."},
  {note:"On trace la médiatrice de [AC] : deux arcs de même rayon, centrés en A et en C, se coupant de part et d'autre de (AC)."},
  {note:"O, milieu de [AC], est le point d'intersection de la médiatrice et du segment [AC]."},
  {note:"Au compas, on reporte 1 cm de part et d'autre de O sur la médiatrice (petits arcs de centre O) : on obtient B et D."},
  {note:"On trace les côtés [AB], [BC], [CD] et [DA]. ABCD est le losange cherché."},
];


document.getElementById('methode-demo-parallelogrammes-particuliers-5e').innerHTML = `
<p class="example-title" style="margin-top:0;">🔎 Utilitaire : quel est ce quadrilatère ?</p>
<p style="margin:0 0 14px;">Coche les propriétés que vérifie un quadrilatère ABCD : l'outil détermine le nom le plus précis qui correspond à cette combinaison, et affiche une figure correspondante.</p>
<div class="figure-wrap">
  <div style="display:flex;flex-direction:column;gap:8px;max-width:440px;margin:0 auto 16px;">
    ${QC_PROPS.map(p=>`<button class="btn secondary qc-btn" data-code="${p.code}" onclick="qcToggle('${p.code}')" style="text-align:left;">${p.label}</button>`).join('')}
  </div>
  <div style="text-align:center;">
    <p class="hint" style="margin:0 0 4px;">Ce quadrilatère est un(e) :</p>
    <p id="qcResult" style="font-size:1.6rem;font-weight:700;font-family:'Space Grotesk',sans-serif;color:var(--accent-orange);margin:0 0 14px;">Quelconque</p>
  </div>
  <div id="qcFigure"></div>
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn secondary" onclick="qcReset()">Tout décocher</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Construis un rectangle ABCD de centre O dont les diagonales mesurent 3,4 cm et tel que AB = 3 cm</p>
<p style="margin:8px 0;"><b>Avant de construire</b>, on représente à main levée ce que l'on cherche, avec les données de l'énoncé codées :</p>
<div class="figure-wrap">${pccR1Sketch()}</div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la construction.</p>
  <div id="pccR1Wrap"></div>
  <div class="step-list" id="pccR1Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On trace le segment [AB] de longueur 3 cm.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>Arcs de centre A et de centre B, de rayon 1,7 cm : ils se coupent en O.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>O est le centre du rectangle. On trace les demi-droites [AO) et [BO), prolongées au-delà de O.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>Au compas, on reporte OA au-delà de O sur [AO) pour obtenir C, et OB au-delà de O sur [BO) pour obtenir D.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">5</div><div>On trace les côtés [BC], [CD] et [DA]. ABCD est le rectangle cherché.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pccR1Next" onclick="pccR1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pccR1Reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">Construis un losange ABCD de centre O dont les diagonales vérifient AC = 3,6 cm et BD = 2 cm</p>
<p style="margin:8px 0;"><b>Avant de construire</b>, on représente à main levée ce que l'on cherche, avec les données de l'énoncé codées :</p>
<div class="figure-wrap">${pccL1Sketch()}</div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:0;">Cliquez sur "Étape suivante" pour dérouler la construction.</p>
  <div id="pccL1Wrap"></div>
  <div class="step-list" id="pccL1Steps">
    <div class="step-item" data-step="0"><div class="step-num">1</div><div>On trace le segment [AC] de longueur 3,6 cm.</div></div>
    <div class="step-item" data-step="1"><div class="step-num">2</div><div>On trace la médiatrice de [AC] (arcs de même rayon centrés en A et en C).</div></div>
    <div class="step-item" data-step="2"><div class="step-num">3</div><div>O, milieu de [AC], est à l'intersection de la médiatrice et de [AC].</div></div>
    <div class="step-item" data-step="3"><div class="step-num">4</div><div>Au compas, on reporte 1 cm de part et d'autre de O sur la médiatrice, pour obtenir B et D.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">5</div><div>On trace les côtés [AB], [BC], [CD] et [DA]. ABCD est le losange cherché.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="pccL1Next" onclick="pccL1Next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pccL1Reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXERCICES ================= */
document.getElementById('exos-demo-parallelogrammes-particuliers-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un quadrilatère est un losange »</h3>
  <p style="margin:0 0 12px;"><b>Énoncé</b> : EFGH est un parallélogramme tel que EF = EH. Justifie que EFGH est un losange.</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">EFGH est un parallélogramme tel que EF = EH.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si un parallélogramme a deux côtés consécutifs de même longueur, alors c'est un losange.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> le quadrilatère EFGH est un losange.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    MNPQ est un rectangle de centre O tel que MP = 7,2 cm. Donne les longueurs OM, ON, OP et OQ. Justifie ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    RSTU est un parallélogramme dont les diagonales [RT] et [SU] sont perpendiculaires. Justifie que RSTU est un losange.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    VWXY est un quadrilatère tel que les angles en V, W et X sont droits. Justifie que VWXY est un rectangle.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    ABCD est un losange tel que l'angle en A mesure 90°. Justifie que ABCD est un carré.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Un quadrilatère peut-il être un losange sans être un parallélogramme ? Justifie ta réponse.
  </div>
</div>
`;

DEMO_REGISTRY['5e|Parallélogrammes particuliers'] = {
  cours:'cours-demo-parallelogrammes-particuliers-5e', methode:'methode-demo-parallelogrammes-particuliers-5e', exos:'exos-demo-parallelogrammes-particuliers-5e', histoire:'histoire-demo-parallelogrammes-particuliers-5e',
  init:()=>{
    injectCourseAddButtons(document.getElementById('cours-demo-parallelogrammes-particuliers-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-parallelogrammes-particuliers-5e'));
    const A={x:160,y:250}, B={x:290,y:250};
    pcDynInit('rectAngle', A, B, {x:190,y:130}, 'rect', 'angle');
    pcDynInit('rectDiag', A, B, {x:210,y:120}, 'rect', 'diagonals');
    pcDynInit('losSides', A, B, {x:220,y:110}, 'los', 'sides');
    pcDynInit('losDiag', A, B, {x:230,y:100}, 'los', 'diagonals');
    pcDynInit('carre1', A, B, {x:238,y:146}, 'carre1', 'angle');
    pcDynInit('carre2', A, B, {x:160,y:100}, 'carre2', 'sides');
    ['rectAngle','rectDiag','losSides','losDiag','carre1','carre2'].forEach(pcDynRender);
    qcRender();
    pccR1Reset(); pccL1Reset();
    registerGeoStepDemo('pccR1Svg', { steps:()=>PCC_R1_STEPS, getIdx:()=>pccR1Step, goto:(i)=>{ pccR1Step=i; pccR1Render(i); } });
    registerGeoStepDemo('pccL1Svg', { steps:()=>PCC_L1_STEPS, getIdx:()=>pccL1Step, goto:(i)=>{ pccL1Step=i; pccL1Render(i); } });
  }
};

DEMO_QUIZZES['5e|Parallélogrammes particuliers'] = [
  {q:"Un rectangle a-t-il forcément des diagonales de même longueur ?",
   opts:["Oui, toujours","Non, jamais","Seulement si c'est un carré"], correct:0},
  {q:"Un parallélogramme dont les diagonales sont perpendiculaires est un...",
   opts:["Rectangle","Losange","Carré"], correct:1},
  {q:"Un quadrilatère a trois angles droits. Que peut-on en conclure ?",
   opts:["Rien, il faut vérifier le 4e angle","C'est forcément un rectangle","C'est forcément un losange"], correct:1},
  {q:"Un carré est...",
   opts:["Un rectangle mais jamais un losange","Un losange mais jamais un rectangle","À la fois un rectangle et un losange"], correct:2},
];

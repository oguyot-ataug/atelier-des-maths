/* ============================================================
   CHAPITRE : Angles et rapporteur (6e, G3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */

/* ---- Petits helpers géométriques (utilisent angleArcPoints/angleDegrees globaux) ---- */
function arDegToPt(vertex, angleDeg, r){ const a=angleDeg*Math.PI/180; return {x:vertex.x+r*Math.cos(a), y:vertex.y-r*Math.sin(a)}; }
function arWedge(vertex,p1,p2,r,color,opacity){
  const {points} = angleArcPoints(vertex,p1,p2,r);
  return `<polygon points="${vertex.x},${vertex.y} ${points}" fill="${color}" fill-opacity="${opacity===undefined?0.5:opacity}"/>`;
}
function arLabel(x,y,text,size,italic){
  return `<text x="${x}" y="${y}" font-size="${size||12}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}
/* Repère un point situé sur un côté (demi-droite) par un petit trait perpendiculaire au côté,
   centré sur le point -- convention du site pour un point sur une droite (jamais un point/rond
   en bout de trait). */
function arPointTick(vertex, pt, size){
  const angle = Math.atan2(pt.y-vertex.y, pt.x-vertex.x);
  const perp = angle + Math.PI/2;
  const s = size || 8;
  const x1 = pt.x - s*Math.cos(perp), y1 = pt.y - s*Math.sin(perp);
  const x2 = pt.x + s*Math.cos(perp), y2 = pt.y + s*Math.sin(perp);
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1C1B2E" stroke-width="1.6"/>`;
}
/* Étiquette d'un point situé sur un côté : décalée PERPENDICULAIREMENT au côté (jamais dans le
   prolongement de la droite, qui donnerait l'impression que l'étiquette fait partie du tracé). */
function arSideLabel(vertex, pt, text, opts){
  opts = opts || {};
  const dist = opts.dist===undefined ? 16 : opts.dist;
  const side = opts.side || 1;
  const angle = Math.atan2(pt.y-vertex.y, pt.x-vertex.x);
  const perp = angle + side*Math.PI/2;
  const x = pt.x + dist*Math.cos(perp);
  const y = pt.y + dist*Math.sin(perp);
  return `<text x="${x}" y="${y}" font-size="${opts.size||13}" text-anchor="middle" dominant-baseline="middle" fill="${opts.fill||'#1C1B2E'}">${text}</text>`;
}
/* Trouve la direction (dans le plus grand espace libre entre les côtés donnés) où placer
   l'étiquette du sommet, pour qu'elle reste à l'extérieur de l'angle étudié. */
function arOutsideDirection(rayAngles){
  const sorted = rayAngles.map(a=>((a%360)+360)%360).sort((a,b)=>a-b);
  let bestGapStart=0, bestGapSize=-1;
  for(let i=0;i<sorted.length;i++){
    const a=sorted[i], b=sorted[(i+1)%sorted.length];
    let gap = b-a; if(gap<=0) gap+=360;
    if(gap>bestGapSize){ bestGapSize=gap; bestGapStart=a; }
  }
  return (bestGapStart + bestGapSize/2) % 360;
}
function arVertexLabel(vertex, rayAngles, text, dist){
  const pt = arDegToPt(vertex, arOutsideDirection(rayAngles), dist===undefined?26:dist);
  return `<text x="${pt.x}" y="${pt.y}" font-size="13" text-anchor="middle" dominant-baseline="middle" fill="#1C1B2E">${text}</text>`;
}

/* ================= Figure : notion d'angle (saillant) ================= */
function arBuildNotionSvg(){
  const O = {x:110, y:190};
  const X = arDegToPt(O, 0, 160);
  const Y = arDegToPt(O, 55, 160);
  const w = arWedge(O, X, Y, 44, '#1F3A5C');
  return `<svg viewBox="0 0 300 220" style="width:100%;max-width:300px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${O.x}" y1="${O.y}" x2="${X.x}" y2="${X.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${Y.x}" y2="${Y.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arLabel(O.x-16, O.y+14, 'O')}
    ${arLabel(X.x+6, X.y+4, 'x')}
    ${arLabel(Y.x-2, Y.y-8, 'y')}
  </svg>`;
}

/* ================= Icônes : différents types d'angles ================= */
function arTypeIcon(angleDeg, label){
  const O = {x:40, y:42};
  let content = '';
  if(angleDeg===0){
    const P = arDegToPt(O,0,32);
    content = `<line x1="${O.x}" y1="${O.y}" x2="${P.x}" y2="${P.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else if(angleDeg===360){
    content = `<circle cx="${O.x}" cy="${O.y}" r="1.6" fill="#1C1B2E"/><circle cx="${O.x}" cy="${O.y}" r="26" fill="none" stroke="#1C1B2E" stroke-width="1.2" stroke-dasharray="3,3"/>`;
  } else if(angleDeg===180){
    const P1 = arDegToPt(O,0,32), P2 = arDegToPt(O,180,32);
    content = `<line x1="${P1.x}" y1="${P1.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else if(angleDeg===200){ // repère "rentrant" : on colore la grande région (le complément du petit angle saillant de 45°)
    const P1 = arDegToPt(O,0,32), P2 = arDegToPt(O,45,32);
    content = `<circle cx="${O.x}" cy="${O.y}" r="26" fill="#1F3A5C" fill-opacity="0.5"/>
      <polygon points="${O.x},${O.y} ${angleArcPoints(O,P1,P2,26).points}" fill="#FFFFFF"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P1.x}" y2="${P1.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else {
    const P1 = arDegToPt(O,0,32), P2 = arDegToPt(O,angleDeg,32);
    content = `${arWedge(O,P1,P2,18,'#1F3A5C')}
      <line x1="${O.x}" y1="${O.y}" x2="${P1.x}" y2="${P1.y}" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="${O.x}" y1="${O.y}" x2="${P2.x}" y2="${P2.y}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  return `<svg viewBox="0 0 80 80" style="width:100%;max-width:80px;display:block;margin:0 auto;">
    <circle cx="${O.x}" cy="${O.y}" r="1.8" fill="#1C1B2E"/>
    ${content}
  </svg>`;
}

/* ================= Figures : paires d'angles particuliers ================= */
function arBuildOpposesSvg(){
  const O = {x:200, y:130};
  const M = arDegToPt(O,0,150), Mp = arDegToPt(O,180,150);
  const N = arDegToPt(O,50,150), Np = arDegToPt(O,230,150);
  const Mext = arDegToPt(O,0,160), Mpext = arDegToPt(O,180,160);
  const Next = arDegToPt(O,50,160), Npext = arDegToPt(O,230,160);
  const w1 = arWedge(O, M, N, 36, '#1F3A5C');
  const w2 = arWedge(O, Mp, Np, 36, '#1F3A5C');
  const w3 = arWedge(O, N, Mp, 36, '#E35D3A');
  const w4 = arWedge(O, Np, M, 36, '#E35D3A');
  return `<svg viewBox="0 0 400 260" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Mpext.x}" y1="${Mpext.y}" x2="${Mext.x}" y2="${Mext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Npext.x}" y1="${Npext.y}" x2="${Next.x}" y2="${Next.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}${w3}${w4}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arPointTick(O,M)}${arPointTick(O,Mp)}${arPointTick(O,N)}${arPointTick(O,Np)}
    ${arSideLabel(O,M,'M')}
    ${arSideLabel(O,Mp,"M'")}
    ${arSideLabel(O,N,'N')}
    ${arSideLabel(O,Np,"N'")}
    ${arVertexLabel(O,[0,180,50,230],'O')}
  </svg>`;
}
function arBuildAdjacentsSvg(){
  const O = {x:180, y:170};
  const I = arDegToPt(O,170,130), J = arDegToPt(O,90,130), K = arDegToPt(O,25,130);
  const Iext = arDegToPt(O,170,145), Jext = arDegToPt(O,90,145), Kext = arDegToPt(O,25,145);
  const w1 = arWedge(O, I, J, 38, '#1F3A5C');
  const w2 = arWedge(O, J, K, 38, '#1F6B3A');
  return `<svg viewBox="0 0 380 220" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${O.x}" y1="${O.y}" x2="${Iext.x}" y2="${Iext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${Jext.x}" y2="${Jext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${Kext.x}" y2="${Kext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arPointTick(O,I)}${arPointTick(O,J)}${arPointTick(O,K)}
    ${arSideLabel(O,I,'A',{side:1})}
    ${arSideLabel(O,J,'B',{side:1})}
    ${arSideLabel(O,K,'C',{side:-1})}
    ${arVertexLabel(O,[170,90,25],'O')}
  </svg>`;
}
function arBuildSupplSvg(){
  const O = {x:200, y:170};
  const D = arDegToPt(O,180,140), F = arDegToPt(O,0,140), E = arDegToPt(O,108,140);
  const Dext = arDegToPt(O,180,155), Fext = arDegToPt(O,0,155), Eext = arDegToPt(O,108,155);
  const w1 = arWedge(O, D, E, 42, '#1F3A5C');
  const w2 = arWedge(O, E, F, 42, '#1F6B3A');
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Dext.x}" y1="${Dext.y}" x2="${Fext.x}" y2="${Fext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${Eext.x}" y2="${Eext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.4" fill="#1C1B2E"/>
    ${arPointTick(O,D)}${arPointTick(O,F)}${arPointTick(O,E)}
    ${arSideLabel(O,D,'D',{side:1})}
    ${arSideLabel(O,F,'F',{side:-1})}
    ${arSideLabel(O,E,'E',{side:1})}
    ${arVertexLabel(O,[180,0,108],'O')}
  </svg>`;
}

/* Figure pour la méthode 3 (rédaction) : angles RST et R'ST' opposés par le sommet, 62° */
function arBuildMethodeOpposesSvg(){
  const S = {x:200, y:150};
  const R = arDegToPt(S,15,120), Rp = arDegToPt(S,195,120);
  const T = arDegToPt(S,77,120), Tp = arDegToPt(S,257,120);
  const Rext = arDegToPt(S,15,130), Rpext = arDegToPt(S,195,130);
  const Text = arDegToPt(S,77,130), Tpext = arDegToPt(S,257,130);
  const w1 = arWedge(S, R, T, 32, '#1F3A5C');
  const w2 = arWedge(S, Rp, Tp, 32, '#1F3A5C');
  return `<svg viewBox="0 0 400 280" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Rpext.x}" y1="${Rpext.y}" x2="${Rext.x}" y2="${Rext.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Tpext.x}" y1="${Tpext.y}" x2="${Text.x}" y2="${Text.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${S.x}" cy="${S.y}" r="2.4" fill="#1C1B2E"/>
    ${arPointTick(S,R)}${arPointTick(S,Rp)}${arPointTick(S,T)}${arPointTick(S,Tp)}
    ${arSideLabel(S,R,'R',{side:1})}
    ${arSideLabel(S,Rp,"R'",{side:1})}
    ${arSideLabel(S,T,'T',{side:-1})}
    ${arSideLabel(S,Tp,"T'",{side:-1})}
    ${arVertexLabel(S,[15,195,77,257],'S')}
  </svg>`;
}

/* ================= Widget interactif : rapporteur translucide, déplaçable et pivotable ================= */
const AR_RATIO = 900/483;      // proportions réelles de l'image assets/rapporteur-translucide.png
/* Le vrai pivot du rapporteur (là où convergent les graduations) n'est pas tout en bas de
   l'image : il y a une marge en dessous (étiquettes "0"/"180°" et un cadre) mesurée précisément
   par analyse des pixels de l'image (voir vérification faite avant intégration). */
/* Position du pivot obtenue par ajustement d'un cercle sur le bord rose du rapporteur
   (plus robuste que le simple repérage de la ligne de base), voir vérification avant intégration. */
const AR_BASELINE_RATIO = 0.9349;
const AR_CENTER_X_RATIO = 0.4992;

const AR_SCENE_W = 860, AR_SCENE_H = 600;   // scène large : assez de place pour déplacer le rapporteur sans être à l'étroit
const AR_PROT_W = 480, AR_PROT_H = AR_PROT_W/AR_RATIO;   // rapporteur grand et lisible
const AR_PROT_PIVOT = {x: AR_PROT_W*AR_CENTER_X_RATIO, y: AR_PROT_H*AR_BASELINE_RATIO};
/* Constantes en POURCENTAGE (de la largeur/hauteur de la scène, ou du rapporteur lui-même) pour
   positionner le rapporteur et le crayon en CSS pur, sans jamais calculer d'échelle en JS : un
   positionnement en % s'adapte automatiquement à la taille réellement affichée, quelle qu'elle
   soit et quel que soit le moment où elle change (bien plus robuste que mesurer la taille rendue
   via JS, qui s'est révélé peu fiable -- timing, onglets cachés, etc.). */
const AR_PROT_PIVOT_X_PCT = (AR_PROT_PIVOT.x/AR_PROT_W)*100;   // position du pivot, en % de la largeur du rapporteur
const AR_PROT_PIVOT_Y_PCT = (AR_PROT_PIVOT.y/AR_PROT_H)*100;   // position du pivot, en % de la hauteur du rapporteur
const AR_PROT_W_PCT = (AR_PROT_W/AR_SCENE_W)*100;              // largeur du rapporteur, en % de la largeur de la scène
const AR_RAY_LEN = 390;          // longueur des côtés de l'angle tracé (dépasse largement le rapporteur)
const AR_SNAP_DIST = 30;         // distance (px, coordonnées de la scène) déclenchant l'aimant sur le sommet
const AR_SNAP_ROT = 4;           // tolérance (°) pour l'accroche de la rotation sur un côté de l'angle
/* Rayon où la pointe du crayon touche le bord du rapporteur : mesuré par ajustement de cercle sur
   le bord rose de l'image (rayon réel ≈ 0,927 x hauteur), avec une petite marge de sécurité. */
const AR_PENCIL_R_RATIO = 0.93;

function arDegToPt(vertex, angleDeg, len){
  const t = angleDeg*Math.PI/180;
  return { x: vertex.x + len*Math.cos(t), y: vertex.y - len*Math.sin(t) };
}
/* Convertit la position d'un événement souris/tactile en coordonnées de la scène (indépendant
   du redimensionnement CSS responsive de la scène, contrairement à ses dimensions déclarées). */
function arScenePoint(sceneEl, evt){
  const rect = sceneEl.getBoundingClientRect();
  const t = evt.touches ? evt.touches[0] : evt;
  const scaleX = AR_SCENE_W/rect.width, scaleY = AR_SCENE_H/rect.height;
  return { x: (t.clientX-rect.left)*scaleX, y: (t.clientY-rect.top)*scaleY };
}
/* ---- Le rapporteur déplaçable/pivotable : un état {x,y,rot} + rendu + glisser-déposer ---- */
function arBuildPencilHtml(id){
  return `<div id="${id}-pencil" title="Crayon : glisse-le le long de l'arc, degré par degré" style="position:absolute;top:0;left:0;width:16px;transform-origin:8px 46px;cursor:grab;user-select:none;z-index:5;">
    <svg viewBox="0 0 16 46" width="16" height="46" style="display:block;overflow:visible;">
      <rect x="4" y="0" width="8" height="5" rx="1.5" fill="#E35D3A"/>
      <rect x="4" y="5" width="8" height="4" fill="#1C1B2E"/>
      <rect x="4" y="9" width="8" height="27" fill="#E9C46A"/>
      <polygon points="4,36 12,36 8,46" fill="#D9A441"/>
      <polygon points="6,42 10,42 8,46" fill="#4A4A55"/>
    </svg>
  </div>`;
}
function arBuildProtractorOverlay(id){
  return `<div id="${id}" style="position:absolute;top:0;left:0;width:${AR_PROT_W_PCT}%;cursor:grab;transform-origin:${AR_PROT_PIVOT_X_PCT}% ${AR_PROT_PIVOT_Y_PCT}%;touch-action:none;user-select:none;">
    <img src="assets/rapporteur-translucide.png" alt="Rapporteur" draggable="false" style="width:100%;display:block;opacity:.9;-webkit-user-drag:none;user-select:none;pointer-events:auto;">
    <div id="${id}-rotate" title="Faire pivoter le rapporteur" style="position:absolute;left:calc(100% - 15px);top:calc(${AR_PROT_PIVOT_Y_PCT}% - 15px);width:30px;height:30px;border-radius:50%;background:rgba(227,93,58,.85);cursor:grab;display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;user-select:none;">↻</div>
  </div>`;
}
function arRenderProtractor(id, state){
  const el = document.getElementById(id);
  if(!el) return;
  el.style.left = (state.x/AR_SCENE_W*100)+'%';
  el.style.top = (state.y/AR_SCENE_H*100)+'%';
  el.style.transform = `translate(-${AR_PROT_PIVOT_X_PCT}%, -${AR_PROT_PIVOT_Y_PCT}%) rotate(${-state.rot}deg)`;
}
/* rayAngles : les orientations (°) des côtés de l'angle sur lesquelles la rotation du rapporteur
   doit s'accrocher (la ligne 0°-180° du rapporteur est une droite : on teste aussi +180). */
function arInitProtractorDrag(id, sceneId, state, vertex, rayAngles, onUpdate){
  const container = document.getElementById(id);
  const img = container.querySelector('img');
  const rotateHandle = document.getElementById(id+'-rotate');
  const sceneEl = document.getElementById(sceneId);
  let mode = null; // 'translate' | 'rotate'
  let startPointer = null, startState = null;

  function pointerDown(m){ return (e)=>{ mode=m; startPointer=arScenePoint(sceneEl,e); startState={...state}; e.stopPropagation(); e.preventDefault(); }; }
  img.onmousedown = pointerDown('translate');
  img.ontouchstart = pointerDown('translate');
  rotateHandle.onmousedown = pointerDown('rotate');
  rotateHandle.ontouchstart = pointerDown('rotate');

  function move(e){
    if(!mode) return;
    const p = arScenePoint(sceneEl, e);
    if(mode==='translate'){
      state.x = startState.x + (p.x-startPointer.x);
      state.y = startState.y + (p.y-startPointer.y);
      const d = Math.hypot(state.x-vertex.x, state.y-vertex.y);
      if(d <= AR_SNAP_DIST){ state.x = vertex.x; state.y = vertex.y; }
    } else if(mode==='rotate'){
      const dx = p.x-state.x, dy = state.y-p.y;
      let deg = Math.atan2(dy,dx)*180/Math.PI;
      for(const ray of rayAngles){
        for(const cand of [ray, ray+180]){
          let diff = Math.abs(((deg-cand)%360+540)%360-180);
          if(diff <= AR_SNAP_ROT){ deg = cand; break; }
        }
      }
      state.rot = deg;
    }
    arRenderProtractor(id, state);
    if(onUpdate) onUpdate(state);
    e.preventDefault();
  }
  function up(){ mode=null; }
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  sceneEl.addEventListener('touchmove', move, {passive:false});
  sceneEl.addEventListener('touchend', up);
}

/* --- Widget 1 : lire une mesure au rapporteur (angle quelconque, à toute orientation) --- */
let arLireVertex = {x:230,y:190}, arLireRay1Deg = 0, arLireSpread = 60;
let arLireProtState = {x:90,y:90,rot:0};
let arLireRayAngles = [0,60];
function arBuildLireScene(){
  return `<div class="ar-scene" id="ar-lireScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
    <svg id="ar-lireAngleSvg" viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <line id="ar-lireRay1" x1="0" y1="0" x2="0" y2="0" stroke="#1C1B2E" stroke-width="1.3"/>
      <line id="ar-lireRay2" x1="0" y1="0" x2="0" y2="0" stroke="#1C1B2E" stroke-width="1.3"/>
    </svg>
    ${arBuildProtractorOverlay('ar-lireProtractor')}
  </div>`;
}
function arDrawLireAngle(){
  const ray1End = arDegToPt(arLireVertex, arLireRay1Deg, AR_RAY_LEN);
  const ray2End = arDegToPt(arLireVertex, arLireRay1Deg+arLireSpread, AR_RAY_LEN);
  const r1 = document.getElementById('ar-lireRay1'), r2 = document.getElementById('ar-lireRay2');
  if(r1){ r1.setAttribute('x1',arLireVertex.x); r1.setAttribute('y1',arLireVertex.y); r1.setAttribute('x2',ray1End.x); r1.setAttribute('y2',ray1End.y); }
  if(r2){ r2.setAttribute('x1',arLireVertex.x); r2.setAttribute('y1',arLireVertex.y); r2.setAttribute('x2',ray2End.x); r2.setAttribute('y2',ray2End.y); }
}
function arResetLire(){
  arLireVertex.x = 320+Math.random()*180; arLireVertex.y = 240+Math.random()*140;
  arLireRay1Deg = Math.floor(Math.random()*360);
  arLireSpread = Math.round(15 + Math.random()*150); // n'importe quel angle entier entre 15° et 165°, pas seulement des multiples de 5
  arDrawLireAngle();
  arLireProtState.x=90; arLireProtState.y=90; arLireProtState.rot=0;
  arLireRayAngles[0] = arLireRay1Deg; arLireRayAngles[1] = arLireRay1Deg+arLireSpread;
  arRenderProtractor('ar-lireProtractor', arLireProtState);
  document.getElementById('ar-lireInput').value = '';
  document.getElementById('ar-lireStatus').textContent = '';
}
function arCheckLire(){
  const val = parseFloat(document.getElementById('ar-lireInput').value);
  const status = document.getElementById('ar-lireStatus');
  if(isNaN(val)){ status.textContent = 'Indique ta lecture en degrés.'; return; }
  if(Math.abs(val-arLireSpread)<=2){ status.textContent = `✅ Bravo, l'angle mesure bien ${arLireSpread}°.`; status.style.color = '#1F6B3A'; }
  else { status.textContent = `❌ Pas tout à fait : l'angle mesure ${arLireSpread}°. Place bien le centre du rapporteur sur le sommet et son 0° sur un côté avant de lire l'autre côté.`; status.style.color = '#E35D3A'; }
}

/* --- Widget 2 : construire un angle donné, avec un crayon qui marque le trait-repère
   degré par degré sur l'arc du rapporteur (au lieu de faire tourner directement un trait) --- */
let arConstruireVertex = {x:230,y:190}, arConstruireBaseDeg = 0, arConstruireTarget = 100;
let arConstruireCurrentDeg = 15; // angle absolu du côté une fois validé (sert à la vérification)
let arConstruireProtState = {x:90,y:90,rot:0};
let arConstruireRayAngles = [0,15];
let arConstruirePencilDeg = 90;  // degré LOCAL du crayon sur l'arc (0 à 180, dans le repère du rapporteur)
let arConstruireValide = false;

function arBuildConstruireScene(){
  return `<div class="ar-scene" id="ar-construireScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
    <svg id="ar-construireAngleSvg" viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <line id="ar-construireRayBase" x1="0" y1="0" x2="0" y2="0" stroke="#1F3A5C" stroke-width="1.3"/>
      <line id="ar-construireRay" x1="0" y1="0" x2="0" y2="0" stroke="#E35D3A" stroke-width="1.3" opacity="0"/>
    </svg>
    ${arBuildProtractorOverlay('ar-construireProtractor') + arBuildPencilHtml('ar-construireProtractor')}
  </div>`;
}
/* Positionne le crayon : sa pointe (transform-origin, en bas du dessin) touche exactement le
   bord/l'arc du rapporteur au degré local demandé, et son corps pivote vers l'extérieur. */
/* Composite manuellement, sur un canvas, une "scène" complète (les traits SVG de l'angle +
   l'image du rapporteur avec sa position/rotation courante + le crayon éventuel) en une seule
   image -- nécessaire pour que la démonstration se capture bien étape par étape dans le cahier/
   PDF (html2canvas gère mal le SVG et les images transformées en CSS, voir les corrections
   précédentes sur ce même sujet). */
let arRapporteurImgCache = null;
function arGetRapporteurImg(){
  return new Promise((resolve)=>{
    if(arRapporteurImgCache){ resolve(arRapporteurImgCache); return; }
    const img = new Image();
    img.onload = ()=>{ arRapporteurImgCache = img; resolve(img); };
    img.onerror = ()=> resolve(null);
    img.src = 'assets/rapporteur-translucide.png';
  });
}
async function arCaptureRapporteurScene(sceneId, svgSelector, protState, protOpacity, pencilStoredDeg, displayWidth){
  const sceneEl = document.getElementById(sceneId);
  if(!sceneEl) return null;
  const svgEl = sceneEl.querySelector(svgSelector||'svg');
  const svgDataUri = await new Promise((resolve)=>{
    if(!svgEl){ resolve(null); return; }
    svgToRasterDataUri(svgEl, displayWidth).then(resolve).catch(()=>resolve(null));
  });
  const displayHeight = displayWidth * (AR_SCENE_H/AR_SCENE_W);
  const scale = displayWidth/AR_SCENE_W;
  const canvas = document.createElement('canvas');
  const dpr = 2;
  canvas.width = Math.round(displayWidth*dpr); canvas.height = Math.round(displayHeight*dpr);
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true; if('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality='high';
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height);
  if(svgDataUri){
    const bgImg = await new Promise((resolve)=>{ const im=new Image(); im.onload=()=>resolve(im); im.onerror=()=>resolve(null); im.src=svgDataUri; });
    if(bgImg) ctx.drawImage(bgImg, 0,0, canvas.width, canvas.height);
  }
  if(protOpacity>0.05){
    const protImg = await arGetRapporteurImg();
    if(protImg){
      ctx.save();
      ctx.globalAlpha = protOpacity*0.9; // l'image a elle-même opacity:.9 en CSS
      ctx.translate(protState.x*scale*dpr, protState.y*scale*dpr);
      ctx.rotate(-protState.rot*Math.PI/180);
      if(protState.mirror) ctx.scale(-1,1);
      ctx.drawImage(protImg, -AR_PROT_PIVOT.x*scale*dpr, -AR_PROT_PIVOT.y*scale*dpr, AR_PROT_W*scale*dpr, AR_PROT_H*scale*dpr);
      ctx.restore();
    }
  }
  if(pencilStoredDeg!==null && pencilStoredDeg!==undefined){
    // le crayon est positionné indépendamment (angle absolu), comme à l'écran (voir arRenderPencilTip)
    const effectiveLocalDeg = protState.mirror ? (180-pencilStoredDeg) : pencilStoredDeg;
    const absDeg = effectiveLocalDeg + protState.rot;
    const R = AR_PROT_H*AR_PENCIL_R_RATIO;
    const rad = absDeg*Math.PI/180;
    const tipX = (protState.x + R*Math.cos(rad))*scale*dpr, tipY = (protState.y - R*Math.sin(rad))*scale*dpr;
    ctx.save();
    ctx.translate(tipX, tipY);
    ctx.rotate((90-absDeg)*Math.PI/180);
    const u = scale*dpr; // 1 unité du dessin local du crayon (16x46) mise à l'échelle
    ctx.fillStyle = '#4A4A55'; ctx.beginPath(); ctx.moveTo(-2*u,-42*u); ctx.lineTo(2*u,-42*u); ctx.lineTo(0,-46*u); ctx.fill();
    ctx.fillStyle = '#D9A441'; ctx.beginPath(); ctx.moveTo(-4*u,-36*u); ctx.lineTo(4*u,-36*u); ctx.lineTo(0,-46*u); ctx.fill();
    ctx.fillStyle = '#E9C46A'; ctx.fillRect(-4*u,-36*u,8*u,27*u);
    ctx.fillStyle = '#1C1B2E'; ctx.fillRect(-4*u,-41*u,8*u,4*u);
    ctx.fillStyle = '#E35D3A'; ctx.fillRect(-4*u,-46*u,8*u,5*u);
    ctx.restore();
  }
  return canvas.toDataURL('image/png');
}
/* Le crayon est positionné indépendamment (pas imbriqué dans le conteneur du rapporteur, pour
   éviter toute ambiguïté d'empilement de transformations CSS) : on calcule directement sa
   position ABSOLUE dans la scène à partir de l'état courant du rapporteur (position, rotation,
   miroir) et du degré LOCAL visé sur l'arc. */
function arRenderPencilTip(pencilEl, protState, localDeg){
  if(!pencilEl) return;
  const R = AR_PROT_H*AR_PENCIL_R_RATIO;
  // en mode miroir, le degré local se lit à l'envers sur l'arc (voir arSetProtractorMirror)
  const effectiveLocalDeg = protState.mirror ? (180-localDeg) : localDeg;
  const absDeg = effectiveLocalDeg + protState.rot;
  const rad = absDeg*Math.PI/180;
  const tipX = protState.x + R*Math.cos(rad);
  const tipY = protState.y - R*Math.sin(rad);
  pencilEl.style.left = (tipX/AR_SCENE_W*100)+'%';
  pencilEl.style.top = (tipY/AR_SCENE_H*100)+'%';
  pencilEl.style.transform = `translate(-8px, -46px) rotate(${90-absDeg}deg)`;
}
function arRenderConstruirePencil(){
  arRenderPencilTip(document.getElementById('ar-construireProtractor-pencil'), arConstruireProtState, arConstruirePencilDeg);
}
function arDrawConstruireAngle(){
  const baseEnd = arDegToPt(arConstruireVertex, arConstruireBaseDeg, AR_RAY_LEN);
  const rb = document.getElementById('ar-construireRayBase');
  if(rb){ rb.setAttribute('x1',arConstruireVertex.x); rb.setAttribute('y1',arConstruireVertex.y); rb.setAttribute('x2',baseEnd.x); rb.setAttribute('y2',baseEnd.y); }
  arConstruireRayAngles[0] = arConstruireBaseDeg;
}
function arEffectiveAbsDeg(protState, storedDeg){
  const effectiveLocalDeg = protState.mirror ? (180-storedDeg) : storedDeg;
  return ((effectiveLocalDeg + protState.rot) % 360 + 360) % 360;
}
function arValiderConstruire(){
  arConstruireCurrentDeg = arEffectiveAbsDeg(arConstruireProtState, arConstruirePencilDeg);
  const rayEnd = arDegToPt(arConstruireVertex, arConstruireCurrentDeg, AR_RAY_LEN);
  const rr = document.getElementById('ar-construireRay');
  if(rr){ rr.setAttribute('x1',arConstruireVertex.x); rr.setAttribute('y1',arConstruireVertex.y); rr.setAttribute('x2',rayEnd.x); rr.setAttribute('y2',rayEnd.y); rr.setAttribute('opacity','1'); }
  arConstruireRayAngles[1] = arConstruireCurrentDeg;
  arConstruireValide = true;
  document.getElementById('ar-construireStatus').textContent = '';
}
function arConstruireSpread(){
  let diff = Math.abs(arConstruireCurrentDeg - arConstruireBaseDeg) % 360;
  if(diff>180) diff = 360-diff;
  return diff;
}
function arResetConstruire(){
  arConstruireVertex.x = 320+Math.random()*180; arConstruireVertex.y = 240+Math.random()*140;
  arConstruireBaseDeg = Math.floor(Math.random()*360);
  arConstruireTarget = Math.round(15 + Math.random()*150); // n'importe quel angle entier entre 15° et 165°, pas seulement des multiples de 5
  arConstruireCurrentDeg = arConstruireBaseDeg;
  arConstruirePencilDeg = 90;
  arConstruireValide = false;
  arDrawConstruireAngle();
  const rr = document.getElementById('ar-construireRay');
  if(rr) rr.setAttribute('opacity','0');
  arConstruireProtState.x=90; arConstruireProtState.y=90; arConstruireProtState.rot=0;
  arConstruireRayAngles[0] = arConstruireBaseDeg; arConstruireRayAngles[1] = arConstruireBaseDeg;
  arRenderProtractor('ar-construireProtractor', arConstruireProtState);
  arRenderConstruirePencil();
  document.getElementById('ar-construireCible').textContent = arConstruireTarget+'°';
  document.getElementById('ar-construireStatus').textContent = '';
}
function arCheckConstruire(){
  const status = document.getElementById('ar-construireStatus');
  if(!arConstruireValide){ status.textContent = "Marque d'abord le trait-repère au crayon, puis clique sur \"Valider le trait-repère\"."; status.style.color = '#E35D3A'; return; }
  const current = Math.round(arConstruireSpread());
  if(Math.abs(current-arConstruireTarget)<=2){ status.textContent = `✅ Bravo, ton angle mesure environ ${current}°, c'est le bon angle !`; status.style.color = '#1F6B3A'; }
  else { status.textContent = `Ton angle mesure pour l'instant environ ${current}°. Repositionne le crayon et revalide pour obtenir ${arConstruireTarget}°.`; status.style.color = '#E35D3A'; }
}
/* Glisser le crayon le long de l'arc, en degrés entiers, dans le repère LOCAL du rapporteur
   (indépendant de sa position/rotation actuelle -- c'est tout l'intérêt : le crayon reste sur
   l'arc quel que soit l'endroit où le rapporteur a été placé). */
function arInitPencilDrag(protractorId, pencilId, sceneId, protState, onDegChange){
  const pencil = document.getElementById(pencilId);
  const sceneEl = document.getElementById(sceneId);
  if(!pencil || !sceneEl) return;
  let dragging = false;
  pencil.onmousedown = (e)=>{ dragging=true; e.stopPropagation(); e.preventDefault(); };
  pencil.ontouchstart = (e)=>{ dragging=true; e.stopPropagation(); e.preventDefault(); };
  function move(e){
    if(!dragging) return;
    const p = arScenePoint(sceneEl, e);
    const dx = p.x-protState.x, dy = protState.y-p.y;
    let geometricDeg = Math.atan2(dy,dx)*180/Math.PI - protState.rot;
    geometricDeg = ((geometricDeg%360)+360)%360;
    if(geometricDeg>180) geometricDeg = geometricDeg>270 ? 0 : 180; // hors de l'arc (0-180) : on ramène à l'extrémité la plus proche
    // en mode miroir, le degré affiché/lu sur l'arc est inversé par rapport au calcul géométrique brut
    const storedDeg = protState.mirror ? (180-geometricDeg) : geometricDeg;
    onDegChange(Math.round(storedDeg));
    e.preventDefault();
  }
  function up(){ dragging=false; }
  window.addEventListener('mousemove', move);
  window.addEventListener('mouseup', up);
  sceneEl.addEventListener('touchmove', move, {passive:false});
  sceneEl.addEventListener('touchend', up);
}

/* --- Démonstrations pas-à-pas (cours) : rien à glisser ici, le rapporteur s'anime tout seul ---
   Deux démonstrations séparées, comme dans le document source : une pour lire une mesure, une
   pour construire un angle donné (avec le crayon qui marque le trait-repère). */

/* Démonstration A : comment lire un angle au rapporteur */
const AR_DEMO_LIRE_VERTEX = {x:430, y:325};
const AR_DEMO_LIRE_BASE_DEG = 25;
const AR_DEMO_LIRE_SPREAD = 63;
let arDemoLireProtState = {x:90, y:90, rot:0};
let arDemoLireStepIdx = 0;
let arDemoLireMode = 'exterieur';
function arDemoLireSteps(){
  return [
    {note:"On souhaite mesurer cet angle. Le rapporteur n'est pas encore placé dessus."},
    {note:"On place le centre du rapporteur exactement sur le sommet de l'angle."},
    {note: arDemoLireMode==='exterieur'
      ? "On fait pivoter le rapporteur pour aligner son 0° extérieur (anneau jaune) sur le second côté de l'angle : l'autre côté reste bien dans le rapporteur."
      : "On fait pivoter le rapporteur pour aligner son 0° intérieur (anneau vert) sur le premier côté de l'angle : l'autre côté reste bien dans le rapporteur."},
    {note: arDemoLireMode==='exterieur'
      ? `On lit alors la mesure sur le premier côté, sur l'anneau jaune extérieur : ici, ${AR_DEMO_LIRE_SPREAD}°.`
      : `On lit alors la mesure sur le second côté, sur l'anneau vert intérieur : ici, ${AR_DEMO_LIRE_SPREAD}°.`},
  ];
}
function arSetDemoLireMode(mode){
  arDemoLireMode = mode;
  const extBtn = document.getElementById('ar-demoLireModeExt'), intBtn = document.getElementById('ar-demoLireModeInt');
  if(extBtn) extBtn.classList.toggle('active', mode==='exterieur');
  if(intBtn) intBtn.classList.toggle('active', mode==='interieur');
  // la rotation ne diffère visiblement qu'à partir de l'étape 2 (alignement) : on s'y place
  // directement si on n'y est pas encore, pour que le clic sur le bouton produise un effet visible.
  arDemoLireGoto(arDemoLireStepIdx < 2 ? 2 : arDemoLireStepIdx);
}
function arBuildDemoLireScene(){
  const end1 = arDegToPt(AR_DEMO_LIRE_VERTEX, AR_DEMO_LIRE_BASE_DEG, AR_RAY_LEN);
  const end2 = arDegToPt(AR_DEMO_LIRE_VERTEX, AR_DEMO_LIRE_BASE_DEG+AR_DEMO_LIRE_SPREAD, AR_RAY_LEN);
  const readingPt = arDegToPt(AR_DEMO_LIRE_VERTEX, AR_DEMO_LIRE_BASE_DEG+AR_DEMO_LIRE_SPREAD, AR_PROT_H*0.55);
  return `<div class="figure-toolbar" style="justify-content:center;margin-bottom:8px;">
    <button class="btn secondary active" id="ar-demoLireModeExt" onclick="arSetDemoLireMode('exterieur')">Lecture extérieure</button>
    <button class="btn secondary" id="ar-demoLireModeInt" onclick="arSetDemoLireMode('interieur')">Lecture intérieure</button>
  </div>
  <p class="hint" style="text-align:center;margin:0 0 10px;">Pour une <b>lecture extérieure</b>, place le 0° jaune sur un des côtés de l'angle, en veillant à ce que l'autre côté reste dans le rapporteur. Pour une <b>lecture intérieure</b>, c'est le 0° vert qui doit être placé sur un des côtés (l'autre côté reste alors aussi dans le rapporteur) : le résultat de la lecture est le même.</p>
  <div class="ar-scene" id="ar-demoLireScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
    <svg viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <line x1="${AR_DEMO_LIRE_VERTEX.x}" y1="${AR_DEMO_LIRE_VERTEX.y}" x2="${end1.x}" y2="${end1.y}" stroke="#1C1B2E" stroke-width="1.3"/>
      <line x1="${AR_DEMO_LIRE_VERTEX.x}" y1="${AR_DEMO_LIRE_VERTEX.y}" x2="${end2.x}" y2="${end2.y}" stroke="#1C1B2E" stroke-width="1.3"/>
      <text id="ar-demoLireReading" x="${readingPt.x}" y="${readingPt.y}" font-size="22" font-weight="700" fill="#E35D3A" text-anchor="middle" opacity="0">${AR_DEMO_LIRE_SPREAD}°</text>
    </svg>
    <div id="ar-demoLireProtractor" style="position:absolute;top:0;left:0;width:${AR_PROT_W_PCT}%;transform-origin:${AR_PROT_PIVOT_X_PCT}% ${AR_PROT_PIVOT_Y_PCT}%;transition:transform 1s ease;">
      <img src="assets/rapporteur-translucide.png" alt="Rapporteur" draggable="false" style="width:100%;display:block;opacity:.9;">
    </div>
  </div>`;
}
function arDemoLireGoto(idx){
  arDemoLireStepIdx = idx;
  const steps = arDemoLireSteps();
  // Extérieur : on aligne le 0° jaune sur le premier côté, on lit le second directement (extérieur).
  // Intérieur : on aligne le 0° vert sur le SECOND côté (l'autre reste bien dans le rapporteur),
  // et on lit le premier côté directement (intérieur) -- aucun miroir, une simple rotation différente.
  // Convention réelle de l'image (confirmée) : jaune (extérieur) a son 0° à GAUCHE, lu en sens
  // horaire ; vert (intérieur) a son 0° à DROITE, lu en sens anti-horaire. Pour que la lecture
  // reste directe (sans calcul supplémentaire) tout en gardant les deux côtés dans le rapporteur :
  // extérieur -> on aligne le 0° jaune sur le SECOND côté (puis on lit le premier) ;
  // intérieur -> on aligne le 0° vert sur le PREMIER côté (puis on lit le second).
  const alignDeg = arDemoLireMode==='exterieur'
    ? ((AR_DEMO_LIRE_BASE_DEG+AR_DEMO_LIRE_SPREAD-180)%360+360)%360
    : AR_DEMO_LIRE_BASE_DEG;
  if(idx===0){ arDemoLireProtState.x=90; arDemoLireProtState.y=90; arDemoLireProtState.rot=0; }
  else if(idx===1){ arDemoLireProtState.x=AR_DEMO_LIRE_VERTEX.x; arDemoLireProtState.y=AR_DEMO_LIRE_VERTEX.y; arDemoLireProtState.rot=0; }
  else { arDemoLireProtState.x=AR_DEMO_LIRE_VERTEX.x; arDemoLireProtState.y=AR_DEMO_LIRE_VERTEX.y; arDemoLireProtState.rot=alignDeg; }
  arRenderProtractor('ar-demoLireProtractor', arDemoLireProtState);
  const noteEl = document.getElementById('ar-demoLireNote');
  if(noteEl) noteEl.textContent = steps[idx].note;
  const reading = document.getElementById('ar-demoLireReading');
  if(reading) reading.setAttribute('opacity', idx>=3?'1':'0');
  const btn = document.getElementById('ar-demoLireNextBtn');
  if(btn){ btn.disabled = (idx===steps.length-1); btn.textContent = idx===steps.length-1 ? 'Terminé ✓' : 'Étape suivante →'; }
}
function arDemoLireNext(){ if(arDemoLireStepIdx<arDemoLireSteps().length-1) arDemoLireGoto(arDemoLireStepIdx+1); }
function arDemoLireReset(){ arDemoLireGoto(0); }

/* Démonstration B : comment construire un angle donné (avec le crayon sur l'arc)
   Convention réelle du rapporteur (confirmée) : jaune (extérieur) a son 0° à gauche, lu en sens
   horaire ; vert (intérieur) a son 0° à droite, lu en sens anti-horaire. Concrètement :
   - Extérieur : on aligne le 0° jaune sur le côté déjà tracé, on compte en sens horaire -- le
     nouveau côté se construit donc du côté HORAIRE du côté déjà tracé.
   - Intérieur : on aligne le 0° vert sur le côté déjà tracé, on compte en sens anti-horaire -- le
     nouveau côté se construit donc du côté ANTI-HORAIRE du côté déjà tracé.
   Les deux constructions sont géométriquement valables (un angle de la mesure demandée existe des
   deux côtés du côté déjà tracé) ; seul le sens diffère. */
const AR_DEMO_CONS_VERTEX = {x:430, y:325};
const AR_DEMO_CONS_BASE_DEG = 200;
const AR_DEMO_CONS_TARGET = 72;
let arDemoConsProtState = {x:90, y:90, rot:0};
let arDemoConsStepIdx = 0;
let arDemoConsMode = 'exterieur';
function arDemoConsFinalDeg(){
  return arDemoConsMode==='exterieur'
    ? ((AR_DEMO_CONS_BASE_DEG - AR_DEMO_CONS_TARGET)%360+360)%360   // jaune : sens horaire depuis la base
    : ((AR_DEMO_CONS_BASE_DEG + AR_DEMO_CONS_TARGET)%360+360)%360; // vert : sens anti-horaire depuis la base
}
function arDemoConsSteps(){
  const anneau = arDemoConsMode==='exterieur' ? 'jaune extérieur' : 'vert intérieur';
  const sens = arDemoConsMode==='exterieur' ? 'horaire' : 'anti-horaire';
  return [
    {note:`On veut construire un angle de ${AR_DEMO_CONS_TARGET}° à partir de ce côté déjà tracé.`},
    {note:`On place le centre du rapporteur sur le sommet, et on aligne son 0° ${arDemoConsMode==='exterieur'?'extérieur (jaune)':'intérieur (vert)'} sur le côté déjà tracé.`},
    {note:`On compte ${AR_DEMO_CONS_TARGET}° en sens ${sens} sur l'anneau ${anneau}, et on place la pointe du crayon sur le bord du rapporteur à cet endroit.`},
    {note:"On trace un petit trait dans le prolongement de cette lecture : c'est le trait-repère."},
    {note:"On retire le rapporteur (et le crayon) : seul le trait-repère reste sur la feuille."},
    {note:"On pose la règle contre le sommet et le trait-repère, et on trace la demi-droite : l'angle est construit."},
  ];
}
function arSetDemoConsMode(mode){
  arDemoConsMode = mode;
  const extBtn = document.getElementById('ar-demoConsModeExt'), intBtn = document.getElementById('ar-demoConsModeInt');
  if(extBtn) extBtn.classList.toggle('active', mode==='exterieur');
  if(intBtn) intBtn.classList.toggle('active', mode==='interieur');
  arDemoConsGoto(arDemoConsStepIdx < 1 ? 1 : arDemoConsStepIdx);
}
function arBuildDemoConsScene(){
  const baseEnd = arDegToPt(AR_DEMO_CONS_VERTEX, AR_DEMO_CONS_BASE_DEG, AR_RAY_LEN);
  return `<div class="figure-toolbar" style="justify-content:center;margin-bottom:8px;">
    <button class="btn secondary active" id="ar-demoConsModeExt" onclick="arSetDemoConsMode('exterieur')">Lecture extérieure</button>
    <button class="btn secondary" id="ar-demoConsModeInt" onclick="arSetDemoConsMode('interieur')">Lecture intérieure</button>
  </div>
  <div class="ar-scene" id="ar-demoConsScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
    <svg viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <line x1="${AR_DEMO_CONS_VERTEX.x}" y1="${AR_DEMO_CONS_VERTEX.y}" x2="${baseEnd.x}" y2="${baseEnd.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line id="ar-demoConsFinalRay" x1="${AR_DEMO_CONS_VERTEX.x}" y1="${AR_DEMO_CONS_VERTEX.y}" x2="${AR_DEMO_CONS_VERTEX.x}" y2="${AR_DEMO_CONS_VERTEX.y}" stroke="#E35D3A" stroke-width="1.3" opacity="0"/>
      <line id="ar-demoConsTick" x1="${AR_DEMO_CONS_VERTEX.x}" y1="${AR_DEMO_CONS_VERTEX.y}" x2="${AR_DEMO_CONS_VERTEX.x}" y2="${AR_DEMO_CONS_VERTEX.y}" stroke="#1C1B2E" stroke-width="2.2" opacity="0"/>
      <text id="ar-demoConsGradLabel" x="0" y="0" font-size="20" font-weight="700" text-anchor="middle" opacity="0"></text>
    </svg>
    <div id="ar-demoConsProtractor" style="position:absolute;top:0;left:0;width:${AR_PROT_W_PCT}%;transform-origin:${AR_PROT_PIVOT_X_PCT}% ${AR_PROT_PIVOT_Y_PCT}%;transition:transform 1s ease, opacity .6s ease;">
      <img src="assets/rapporteur-translucide.png" alt="Rapporteur" draggable="false" style="width:100%;display:block;opacity:.9;">
    </div>
    <div id="ar-demoConsPencil" style="position:absolute;top:0;left:0;width:16px;transform-origin:8px 46px;opacity:0;transition:opacity .4s ease;">
      <svg viewBox="0 0 16 46" width="16" height="46" style="display:block;overflow:visible;">
        <rect x="4" y="0" width="8" height="5" rx="1.5" fill="#E35D3A"/>
        <rect x="4" y="5" width="8" height="4" fill="#1C1B2E"/>
        <rect x="4" y="9" width="8" height="27" fill="#E9C46A"/>
        <polygon points="4,36 12,36 8,46" fill="#D9A441"/>
        <polygon points="6,42 10,42 8,46" fill="#4A4A55"/>
      </svg>
    </div>
  </div>`;
}
function arDemoConsGoto(idx){
  arDemoConsStepIdx = idx;
  const steps = arDemoConsSteps();
  const prot = document.getElementById('ar-demoConsProtractor');
  const pencil = document.getElementById('ar-demoConsPencil');
  const finalDeg = arDemoConsFinalDeg();
  // Extérieur : on aligne le 0° jaune (local=180) sur la base -> rot = base-180.
  // Intérieur : on aligne le 0° vert (local=0) sur la base -> rot = base.
  const alignRot = arDemoConsMode==='exterieur' ? ((AR_DEMO_CONS_BASE_DEG-180)%360+360)%360 : AR_DEMO_CONS_BASE_DEG;
  // Degré LOCAL où se trouve le point à marquer (target sur l'anneau concerné) :
  const pencilLocalDeg = arDemoConsMode==='exterieur' ? (180-AR_DEMO_CONS_TARGET) : AR_DEMO_CONS_TARGET;
  if(idx===0){ arDemoConsProtState.x=90; arDemoConsProtState.y=90; arDemoConsProtState.rot=0; if(prot) prot.style.opacity='1'; }
  else if(idx===1){ arDemoConsProtState.x=AR_DEMO_CONS_VERTEX.x; arDemoConsProtState.y=AR_DEMO_CONS_VERTEX.y; arDemoConsProtState.rot=alignRot; if(prot) prot.style.opacity='1'; }
  else if(prot){ arDemoConsProtState.rot=alignRot; prot.style.opacity = idx>=4 ? '0' : '1'; }
  arRenderProtractor('ar-demoConsProtractor', arDemoConsProtState);
  if(pencil){
    pencil.style.opacity = (idx>=2 && idx<=3) ? '1' : '0';
    arRenderPencilTip(pencil, arDemoConsProtState, pencilLocalDeg);
  }
  const noteEl = document.getElementById('ar-demoConsNote');
  if(noteEl) noteEl.textContent = steps[idx].note;
  const R = AR_PROT_H*AR_PENCIL_R_RATIO;
  const tickInner = arDegToPt(AR_DEMO_CONS_VERTEX, finalDeg, R-6);
  const tickOuter = arDegToPt(AR_DEMO_CONS_VERTEX, finalDeg, R+6);
  const tick = document.getElementById('ar-demoConsTick');
  if(tick){
    tick.setAttribute('x1', tickInner.x); tick.setAttribute('y1', tickInner.y);
    tick.setAttribute('x2', tickOuter.x); tick.setAttribute('y2', tickOuter.y);
    tick.setAttribute('opacity', idx>=3?'1':'0');
  }
  const gradLabel = document.getElementById('ar-demoConsGradLabel');
  if(gradLabel){
    if(idx>=2 && idx<=3){
      const labelPt = arDegToPt(AR_DEMO_CONS_VERTEX, finalDeg, R+30);
      gradLabel.setAttribute('x', labelPt.x); gradLabel.setAttribute('y', labelPt.y);
      gradLabel.textContent = AR_DEMO_CONS_TARGET+'°';
      gradLabel.setAttribute('fill', arDemoConsMode==='exterieur' ? '#B8860B' : '#1F6B3A');
      gradLabel.setAttribute('opacity','1');
    } else {
      gradLabel.setAttribute('opacity','0');
    }
  }
  const finalRay = document.getElementById('ar-demoConsFinalRay');
  if(finalRay){
    if(idx>=5){
      const end = arDegToPt(AR_DEMO_CONS_VERTEX, finalDeg, AR_RAY_LEN);
      finalRay.setAttribute('x2', end.x); finalRay.setAttribute('y2', end.y); finalRay.setAttribute('opacity','1');
    } else {
      finalRay.setAttribute('opacity','0');
    }
  }
  const btn = document.getElementById('ar-demoConsNextBtn');
  if(btn){ btn.disabled = (idx===steps.length-1); btn.textContent = idx===steps.length-1 ? 'Terminé ✓' : 'Étape suivante →'; }
}
function arDemoConsNext(){ if(arDemoConsStepIdx<arDemoConsSteps().length-1) arDemoConsGoto(arDemoConsStepIdx+1); }
function arDemoConsReset(){ arDemoConsGoto(0); }

/* --- Widget 3 : construire la bissectrice d'un angle donné, étape par étape --- */
const AR_BIS_ANGLE = 108;
const AR_BIS_VERTEX = {x:380,y:310};
let arBisProtState = {x:90,y:90,rot:0,mirror:false};
let arBisStepIdx = 0;
const AR_BIS_STEPS = [
  {note:"On veut tracer la bissectrice de l'angle MON."},
  {note:"On place le centre du rapporteur sur le sommet O, aligné sur le côté [ON)."},
  {note:`On mesure l'angle : il mesure ${AR_BIS_ANGLE}°.`},
  {note:`On calcule la moitié de cette mesure : ${AR_BIS_ANGLE}° ÷ 2 = ${AR_BIS_ANGLE/2}°.`},
  {note:`On place la pointe du crayon sur le bord du rapporteur, à la graduation ${AR_BIS_ANGLE/2}°.`},
  {note:"On trace un petit trait dans le prolongement de cette lecture : c'est le trait-repère."},
  {note:"On retire le rapporteur (et le crayon) : seul le trait-repère reste."},
  {note:"On trace la demi-droite [OB) qui part de O et qui passe par le trait-repère : c'est la bissectrice."},
  {note:`On code les angles NOB et BOM du même trait : ils ont tous les deux pour mesure ${AR_BIS_ANGLE/2}°.`},
];
function arBuildBissectriceSvg(){
  const AR_BIS_LABEL_LEN = 280; // distance (< AR_RAY_LEN) pour repérer N, M, B : le trait continue au-delà, comme une vraie demi-droite
  const N = arDegToPt(AR_BIS_VERTEX, 0, AR_RAY_LEN);
  const M = arDegToPt(AR_BIS_VERTEX, AR_BIS_ANGLE, AR_RAY_LEN);
  const Nlbl = arDegToPt(AR_BIS_VERTEX, 0, AR_BIS_LABEL_LEN);
  const Mlbl = arDegToPt(AR_BIS_VERTEX, AR_BIS_ANGLE, AR_BIS_LABEL_LEN);
  const half = AR_BIS_ANGLE/2;
  const B = arDegToPt(AR_BIS_VERTEX, half, AR_RAY_LEN);
  const Blbl = arDegToPt(AR_BIS_VERTEX, half, AR_BIS_LABEL_LEN);
  const R = AR_PROT_H*AR_PENCIL_R_RATIO;
  const tickInner = arDegToPt(AR_BIS_VERTEX, half, R-6);
  const tickOuter = arDegToPt(AR_BIS_VERTEX, half, R+6);
  const readingPt = arDegToPt(AR_BIS_VERTEX, half, AR_PROT_H*0.55);
  // codage des deux angles NOB et BOM (même mesure) : petit arc + trait perpendiculaire au milieu
  const codeR = 40;
  const arc1 = angleArcPoints(AR_BIS_VERTEX, N, B, codeR), arc2 = angleArcPoints(AR_BIS_VERTEX, B, M, codeR);
  const mid1 = {x:AR_BIS_VERTEX.x+codeR*Math.cos(arc1.mid), y:AR_BIS_VERTEX.y+codeR*Math.sin(arc1.mid)};
  const mid2 = {x:AR_BIS_VERTEX.x+codeR*Math.cos(arc2.mid), y:AR_BIS_VERTEX.y+codeR*Math.sin(arc2.mid)};
  const tickLen = 7;
  const codeTick = (mid, arcAngle) => {
    const perp = arcAngle + Math.PI/2;
    return `<line x1="${mid.x-tickLen*Math.cos(perp)}" y1="${mid.y-tickLen*Math.sin(perp)}" x2="${mid.x+tickLen*Math.cos(perp)}" y2="${mid.y+tickLen*Math.sin(perp)}" stroke="#1F6B3A" stroke-width="2"/>`;
  };
  return `<div class="ar-scene" id="ar-bissectriceScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
    <svg viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <line x1="${AR_BIS_VERTEX.x}" y1="${AR_BIS_VERTEX.y}" x2="${N.x}" y2="${N.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line x1="${AR_BIS_VERTEX.x}" y1="${AR_BIS_VERTEX.y}" x2="${M.x}" y2="${M.y}" stroke="#1F3A5C" stroke-width="1.3"/>
      <line id="ar-bisTick" x1="${tickInner.x}" y1="${tickInner.y}" x2="${tickOuter.x}" y2="${tickOuter.y}" stroke="#1C1B2E" stroke-width="2.2" opacity="0"/>
      <line id="ar-bisFinalRay" x1="${AR_BIS_VERTEX.x}" y1="${AR_BIS_VERTEX.y}" x2="${AR_BIS_VERTEX.x}" y2="${AR_BIS_VERTEX.y}" stroke="#E35D3A" stroke-width="1.3" opacity="0"/>
      <text id="ar-bisReading" x="${readingPt.x}" y="${readingPt.y}" font-size="18" font-weight="700" fill="#E35D3A" text-anchor="middle" opacity="0">${AR_BIS_ANGLE}°</text>
      <g id="ar-bisCodage" opacity="0">
        <polyline points="${arc1.points}" fill="none" stroke="#1F6B3A" stroke-width="1.6"/>
        <polyline points="${arc2.points}" fill="none" stroke="#1F6B3A" stroke-width="1.6"/>
        ${codeTick(mid1, arc1.mid)}
        ${codeTick(mid2, arc2.mid)}
      </g>
      ${arPointTick(AR_BIS_VERTEX, Nlbl)}${arPointTick(AR_BIS_VERTEX, Mlbl)}
      ${arSideLabel(AR_BIS_VERTEX, Nlbl, 'N', {side:-1})}
      ${arSideLabel(AR_BIS_VERTEX, Mlbl, 'M', {side:1})}
      ${arVertexLabel(AR_BIS_VERTEX,[0,AR_BIS_ANGLE],'O')}
      <g id="ar-bisLabelBGroup" opacity="0">
        ${arPointTick(AR_BIS_VERTEX, Blbl)}
        ${arSideLabel(AR_BIS_VERTEX, Blbl, 'B', {side:-1, dist:14, fill:'#E35D3A'})}
      </g>
    </svg>
    <div id="ar-bissectriceProtractor" style="position:absolute;top:0;left:0;width:${AR_PROT_W_PCT}%;transform-origin:${AR_PROT_PIVOT_X_PCT}% ${AR_PROT_PIVOT_Y_PCT}%;transition:transform 1s ease, opacity .6s ease;">
      <img src="assets/rapporteur-translucide.png" alt="Rapporteur" draggable="false" style="width:100%;display:block;opacity:.9;">
    </div>
    ${arBuildPencilHtml('ar-bissectriceProtractor')}
  </div>`;
}
function arBisGoto(idx){
  arBisStepIdx = idx;
  const prot = document.getElementById('ar-bissectriceProtractor');
  const pencil = document.getElementById('ar-bissectriceProtractor-pencil');
  const half = AR_BIS_ANGLE/2;
  if(idx===0){ arBisProtState.x=90; arBisProtState.y=90; arBisProtState.rot=0; if(prot) prot.style.opacity='1'; }
  else { arBisProtState.x=AR_BIS_VERTEX.x; arBisProtState.y=AR_BIS_VERTEX.y; arBisProtState.rot=0; if(prot) prot.style.opacity = idx>=6 ? '0' : '1'; }
  arRenderProtractor('ar-bissectriceProtractor', arBisProtState);
  if(pencil){
    pencil.style.opacity = (idx>=4 && idx<=5) ? '1' : '0';
    arRenderPencilTip(pencil, arBisProtState, half);
  }
  const noteEl = document.getElementById('ar-bissectriceNote');
  if(noteEl) noteEl.textContent = AR_BIS_STEPS[idx].note;
  const reading = document.getElementById('ar-bisReading');
  if(reading) reading.setAttribute('opacity', (idx>=2 && idx<=3) ?'1':'0');
  const tick = document.getElementById('ar-bisTick');
  if(tick) tick.setAttribute('opacity', idx>=5?'1':'0');
  const finalRay = document.getElementById('ar-bisFinalRay');
  if(finalRay){
    if(idx>=7){
      const end = arDegToPt(AR_BIS_VERTEX, half, AR_RAY_LEN);
      finalRay.setAttribute('x2', end.x); finalRay.setAttribute('y2', end.y); finalRay.setAttribute('opacity','1');
    } else finalRay.setAttribute('opacity','0');
  }
  const codage = document.getElementById('ar-bisCodage');
  if(codage) codage.setAttribute('opacity', idx>=8?'1':'0');
  const labelB = document.getElementById('ar-bisLabelBGroup');
  if(labelB) labelB.setAttribute('opacity', idx>=7?'1':'0');
  const btn = document.getElementById('ar-bissectriceNextBtn');
  if(btn){ btn.disabled = (idx===AR_BIS_STEPS.length-1); btn.textContent = idx===AR_BIS_STEPS.length-1 ? 'Terminé ✓' : 'Étape suivante →'; }
}
function arBisNext(){ if(arBisStepIdx<AR_BIS_STEPS.length-1) arBisGoto(arBisStepIdx+1); }
function arBisReset(){ arBisGoto(0); }

/* ================= Permis Rapporteur (examen noté, élève, activé par le prof pour sa classe) ================= */
const AR_PERMIS_TOTAL = 20, AR_PERMIS_READ_COUNT = 10;
let arPermisQuestions = [];   // ex: [{type:'lire'}, {type:'construire'}, ...] mélangées
let arPermisIndex = 0;
let arPermisScore = 0;
let arPermisVertex = {x:0,y:0};
let arPermisBaseDeg = 0;
let arPermisValue = 0;        // mesure à lire, ou mesure cible à construire
let arPermisProtState = {x:90,y:90,rot:0};
let arPermisRayAngles = [0,0];
let arPermisPencilDeg = 90;
let arPermisCurrentDeg = 0;
let arPermisValide = false;
let arPermisAnswered = false;

async function arCheckPermisEligibility(){
  const section = document.getElementById('ar-permisSection');
  const staffNote = document.getElementById('ar-permisStaffNote');
  if(!section) return;
  const isStaffRole = typeof currentUserRole!=='undefined' && (currentUserRole==='prof' || currentUserRole==='admin');
  if(staffNote) staffNote.style.display = isStaffRole ? 'block' : 'none';
  const isEleve = typeof currentUserRole!=='undefined' && currentUserRole==='eleve';
  section.style.display = isEleve ? 'block' : 'none';
}
let arPermisSessionId = null, arPermisSessionClasseId = null;
async function arPermisValiderCode(){
  const codeInput = document.getElementById('ar-permisCode');
  const status = document.getElementById('ar-permisCodeStatus');
  const code = (codeInput.value||'').trim().toUpperCase();
  if(!code){ status.textContent = 'Indique le code donné par ton professeur.'; status.style.color='#E35D3A'; return; }
  status.textContent = 'Vérification...'; status.style.color = '';
  try{
    const { data, error } = await sb.from('permis_rapporteur_sessions').select('id,classe_id,cloturee').eq('code', code).single();
    if(error || !data){ status.textContent = 'Code inconnu. Vérifie-le auprès de ton professeur.'; status.style.color='#E35D3A'; return; }
    if(data.cloturee){ status.textContent = 'Cette session est clôturée, elle ne peut plus être utilisée.'; status.style.color='#E35D3A'; return; }
    arPermisSessionId = data.id; arPermisSessionClasseId = data.classe_id;
    status.textContent = '';
    arPermisStart();
  } catch(e){ status.textContent = "Erreur de vérification du code : "+e.message; status.style.color='#E35D3A'; }
}
function arPermisStart(){
  arPermisQuestions = [];
  for(let i=0;i<AR_PERMIS_READ_COUNT;i++) arPermisQuestions.push('lire');
  for(let i=0;i<AR_PERMIS_TOTAL-AR_PERMIS_READ_COUNT;i++) arPermisQuestions.push('construire');
  // mélange (Fisher-Yates)
  for(let i=arPermisQuestions.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arPermisQuestions[i],arPermisQuestions[j]]=[arPermisQuestions[j],arPermisQuestions[i]]; }
  arPermisIndex = 0; arPermisScore = 0;
  document.getElementById('ar-permisIntro').style.display='none';
  document.getElementById('ar-permisResult').style.display='none';
  document.getElementById('ar-permisExam').style.display='block';
  arPermisRenderQuestion();
}
function arPermisRenderQuestion(){
  arPermisValide = false; arPermisAnswered = false;
  document.getElementById('ar-permisProgress').textContent = `Question ${arPermisIndex+1}/${AR_PERMIS_TOTAL}`;
  document.getElementById('ar-permisStatus').textContent = '';
  const type = arPermisQuestions[arPermisIndex];
  arPermisVertex.x = 320+Math.random()*180; arPermisVertex.y = 240+Math.random()*140;
  arPermisBaseDeg = Math.floor(Math.random()*360);
  arPermisValue = Math.round(15 + Math.random()*150);
  arPermisProtState.x=90; arPermisProtState.y=90; arPermisProtState.rot=0;
  arPermisPencilDeg = 90;
  arPermisCurrentDeg = arPermisBaseDeg;

  const typeEl = document.getElementById('ar-permisType');
  const sceneWrap = document.getElementById('ar-permisSceneWrap');
  const toolbar = document.getElementById('ar-permisToolbar');
  if(type==='lire'){
    typeEl.textContent = 'Lis la mesure de cet angle.';
    const end1 = arDegToPt(arPermisVertex, arPermisBaseDeg, AR_RAY_LEN);
    const end2 = arDegToPt(arPermisVertex, arPermisBaseDeg+arPermisValue, AR_RAY_LEN);
    sceneWrap.innerHTML = `<div class="ar-scene" id="ar-permisScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
      <svg viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
        <line x1="${arPermisVertex.x}" y1="${arPermisVertex.y}" x2="${end1.x}" y2="${end1.y}" stroke="#1C1B2E" stroke-width="1.3"/>
        <line x1="${arPermisVertex.x}" y1="${arPermisVertex.y}" x2="${end2.x}" y2="${end2.y}" stroke="#1C1B2E" stroke-width="1.3"/>
      </svg>
      ${arBuildProtractorOverlay('ar-permisProtractor')}
    </div>`;
    toolbar.innerHTML = `<label class="hint" style="margin:0;">Ma lecture : <input type="number" id="ar-permisInput" style="width:70px;"> °</label>
      <button class="btn" onclick="arPermisValidateAnswer()">Valider la réponse</button>`;
    arPermisRayAngles[0] = arPermisBaseDeg; arPermisRayAngles[1] = arPermisBaseDeg+arPermisValue;
    arRenderProtractor('ar-permisProtractor', arPermisProtState);
    arInitProtractorDrag('ar-permisProtractor','ar-permisScene', arPermisProtState, arPermisVertex, arPermisRayAngles);
  } else {
    typeEl.textContent = `Construis un angle de ${arPermisValue}°.`;
    const baseEnd = arDegToPt(arPermisVertex, arPermisBaseDeg, AR_RAY_LEN);
    sceneWrap.innerHTML = `<div class="ar-scene" id="ar-permisScene" style="position:relative;width:100%;max-width:${AR_SCENE_W}px;aspect-ratio:${AR_SCENE_W}/${AR_SCENE_H};margin:0 auto;background:var(--white);border:1px solid rgba(28,43,57,.12);border-radius:8px;overflow:hidden;">
      <svg id="ar-permisAngleSvg" viewBox="0 0 ${AR_SCENE_W} ${AR_SCENE_H}" style="position:absolute;top:0;left:0;width:100%;height:100%;">
        <line x1="${arPermisVertex.x}" y1="${arPermisVertex.y}" x2="${baseEnd.x}" y2="${baseEnd.y}" stroke="#1F3A5C" stroke-width="1.3"/>
        <line id="ar-permisRay" x1="${arPermisVertex.x}" y1="${arPermisVertex.y}" x2="${arPermisVertex.x}" y2="${arPermisVertex.y}" stroke="#E35D3A" stroke-width="1.3" opacity="0"/>
      </svg>
      ${arBuildProtractorOverlay('ar-permisProtractor') + arBuildPencilHtml('ar-permisProtractor')}
    </div>`;
    toolbar.innerHTML = `<button class="btn" onclick="arPermisValiderTrait()">Valider le trait-repère</button>
      <button class="btn" onclick="arPermisValidateAnswer()">Valider la réponse</button>`;
    arPermisRayAngles[0] = arPermisBaseDeg; arPermisRayAngles[1] = arPermisBaseDeg;
    arRenderProtractor('ar-permisProtractor', arPermisProtState);
    arInitProtractorDrag('ar-permisProtractor','ar-permisScene', arPermisProtState, arPermisVertex, arPermisRayAngles);
    arInitPencilDrag('ar-permisProtractor','ar-permisProtractor-pencil','ar-permisScene', arPermisProtState, (deg)=>{ arPermisPencilDeg=deg; arRenderPencilTip(document.getElementById('ar-permisProtractor-pencil'), arPermisProtState, deg); });
    arRenderPencilTip(document.getElementById('ar-permisProtractor-pencil'), arPermisProtState, arPermisPencilDeg);
  }
}
function arPermisValiderTrait(){
  arPermisCurrentDeg = arEffectiveAbsDeg(arPermisProtState, arPermisPencilDeg);
  const rayEnd = arDegToPt(arPermisVertex, arPermisCurrentDeg, AR_RAY_LEN);
  const ray = document.getElementById('ar-permisRay');
  if(ray){ ray.setAttribute('x2', rayEnd.x); ray.setAttribute('y2', rayEnd.y); ray.setAttribute('opacity','1'); }
  arPermisRayAngles[1] = arPermisCurrentDeg;
  arPermisValide = true;
}
function arPermisValidateAnswer(){
  if(arPermisAnswered) return;
  const type = arPermisQuestions[arPermisIndex];
  let correct = false;
  if(type==='lire'){
    const val = parseFloat(document.getElementById('ar-permisInput').value);
    correct = !isNaN(val) && Math.abs(val-arPermisValue)<=2;
  } else {
    let diff = Math.abs(arPermisCurrentDeg - arPermisBaseDeg) % 360;
    if(diff>180) diff = 360-diff;
    correct = arPermisValide && Math.abs(Math.round(diff)-arPermisValue)<=2;
  }
  arPermisAnswered = true;
  if(correct) arPermisScore++;
  const status = document.getElementById('ar-permisStatus');
  status.textContent = correct ? '✅ Correct !' : `❌ Incorrect (la bonne mesure était ${arPermisValue}°).`;
  status.style.color = correct ? '#1F6B3A' : '#E35D3A';
  setTimeout(()=>{
    arPermisIndex++;
    if(arPermisIndex>=AR_PERMIS_TOTAL) arPermisFinish();
    else arPermisRenderQuestion();
  }, 1400);
}
async function arPermisFinish(){
  document.getElementById('ar-permisExam').style.display='none';
  document.getElementById('ar-permisResult').style.display='block';
  document.getElementById('ar-permisScoreText').textContent = `Score : ${arPermisScore} / ${AR_PERMIS_TOTAL}`;
  try{
    if(typeof sb!=='undefined' && typeof currentUser!=='undefined' && currentUser){
      await sb.from('permis_rapporteur_resultats').insert({
        eleve_id: currentUser.id,
        session_id: arPermisSessionId,
        classe_id: arPermisSessionClasseId,
        score: arPermisScore,
      });
    }
  } catch(e){ console.error("Permis Rapporteur : échec de l'enregistrement du résultat", e); }
}

/* ================= COURS ================= */
document.getElementById('cours-demo-angles-rapporteur-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Notion d'angle</h3></div>

<p class="example-title" style="margin-top:0;">A. Généralités</p>
<span class="def-badge">Définition</span>
<div class="def-box">Un <b>angle</b> est une portion du plan délimitée par deux demi-droites de même origine.</div>
<div class="figure-wrap">${arBuildNotionSvg()}</div>
<ul class="example-list">
  <li>Le point O est le <b>sommet</b> de l'angle.</li>
  <li>Les demi-droites [Ox) et [Oy) sont les <b>côtés</b> de l'angle.</li>
  <li>La portion du plan coloriée est un angle <b>saillant</b>. La portion non coloriée est un angle <b>rentrant</b>.</li>
</ul>

<p class="example-title" style="margin-top:20px;">B. Nommer un angle</p>
<div class="def-box">Un angle peut se nommer de différentes manières (le plus souvent avec trois lettres, celle du milieu étant toujours le sommet de l'angle) : par exemple <span class="tex">\\widehat{xOy}</span> ou <span class="tex">\\widehat{yOx}</span>.</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : des angles de même mesure sont codés avec le même symbole (comme pour les longueurs).</div>

<div class="lesson-header"><span class="num">2</span><h3>Différents types d'angles</h3></div>
<p style="margin:0 0 10px;">On classe les angles par catégories selon leur mesure.</p>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;font-size:.85rem;">
  <tr style="background:rgba(31,58,92,.06);">
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Angle</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Nul</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Aigu</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Droit</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Obtus</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Plat</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Rentrant</th>
    <th style="padding:6px;border:1px solid rgba(28,43,57,.15);">Plein</th>
  </tr>
  <tr>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);font-weight:700;">Figure</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(0)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(45)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(90)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(130)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(180)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(200)}</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);">${arTypeIcon(360)}</td>
  </tr>
  <tr>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);font-weight:700;">Mesure</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">0°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 0° et 90°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">90°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 90° et 180°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">180°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">entre 180° et 360°</td>
    <td style="padding:6px;border:1px solid rgba(28,43,57,.15);">360°</td>
  </tr>
</table>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Utilisation du rapporteur</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">On peut mesurer « l'ouverture » d'un angle. L'unité que l'on utilise au collège est le <b>degré</b>. L'instrument qui permet de mesurer des angles est le <b>rapporteur</b>.</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : un rapporteur gradué en degrés a souvent une double graduation (une qui va de 0 à 180° dans un sens, une autre dans l'autre sens), source de nombreuses erreurs. Il faut bien vérifier si l'angle étudié est aigu ou obtus avant de lire sa mesure.</div>

<p class="example-title">Méthode : lire une mesure au rapporteur</p>
<div class="figure-wrap">
  ${arBuildDemoLireScene()}
  <p class="hint" id="ar-demoLireNote" style="text-align:center;margin:10px 0 0;font-weight:600;"></p>
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" id="ar-demoLireNextBtn" onclick="arDemoLireNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="arDemoLireReset()">Recommencer</button>
  </div>
</div>

<p class="example-title">Méthode : construire un angle donné au rapporteur</p>
<div class="figure-wrap">
  ${arBuildDemoConsScene()}
  <p class="hint" id="ar-demoConsNote" style="text-align:center;margin:10px 0 0;font-weight:600;"></p>
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" id="ar-demoConsNextBtn" onclick="arDemoConsNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="arDemoConsReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Paire d'angles particuliers</h3></div>

<p class="example-title" style="margin-top:0;">A. Angles opposés par le sommet</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>opposés par le sommet</b> sont deux angles qui ont un sommet commun et qui ont leurs côtés dans le prolongement l'un de l'autre.</div>
<div class="figure-wrap">${arBuildOpposesSvg()}</div>
<p style="margin:10px 0 4px;">Les angles <span class="tex">\\widehat{MON}</span> et <span class="tex">\\widehat{M'ON'}</span> ont comme sommet commun le point O et ont leurs côtés dans le prolongement l'un de l'autre. Ils sont donc <b>opposés par le sommet</b>.</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Deux angles <b>opposés par le sommet</b> sont de même mesure.</div>
<p style="margin:6px 0 12px;">Dans la figure précédente, les angles <span class="tex">\\widehat{MON}</span> et <span class="tex">\\widehat{M'ON'}</span> sont de même mesure (50°), ainsi que les angles <span class="tex">\\widehat{MON'}</span> et <span class="tex">\\widehat{M'ON}</span> (130°).</p>

<p class="example-title" style="margin-top:20px;">B. Angles adjacents</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>adjacents</b> sont deux angles qui ont un sommet commun, un côté commun, et qui sont situés de part et d'autre de ce côté commun.</div>
<div class="figure-wrap">${arBuildAdjacentsSvg()}</div>
<p style="margin:10px 0 12px;">Les angles <span class="tex">\\widehat{AOB}</span> et <span class="tex">\\widehat{BOC}</span> ont comme sommet commun le point O, comme côté commun la demi-droite [OB), et sont placés de part et d'autre de [OB) : ils sont donc <b>adjacents</b>.</p>

<p class="example-title" style="margin-top:20px;">C. Angles supplémentaires</p>
<span class="def-badge">Définition</span>
<div class="def-box">Deux angles <b>supplémentaires</b> sont deux angles dont la somme de leur mesure fait 180°.</div>
<div class="figure-wrap">${arBuildSupplSvg()}</div>
<p style="margin:10px 0 4px;">Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> partagent un angle plat. Leur somme est donc égale à 180° (72° + 108°).</p>
<p style="margin:4px 0 12px;">Ils sont donc <b>supplémentaires</b>.</p>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">Remarque : deux angles supplémentaires et adjacents forment un angle plat. Cette propriété peut donc être utilisée pour montrer que des points sont alignés.</div>

<div class="lesson-header"><span class="num">5</span><h3>Bissectrice d'un angle saillant</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>bissectrice d'un angle saillant</b> est la droite qui partage cet angle en deux angles adjacents de même mesure.</div>
<p class="example-title">Méthode : construis la bissectrice de l'angle <span class="tex">\\widehat{MON}</span> avec un rapporteur.</p>
<div class="figure-wrap">
  ${arBuildBissectriceSvg()}
  <p class="hint" id="ar-bissectriceNote" style="text-align:center;margin:10px 0 0;font-weight:600;"></p>
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" id="ar-bissectriceNextBtn" onclick="arBisNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="arBisReset()">Recommencer</button>
  </div>
</div>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-angles-rapporteur-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : entraîne-toi à lire une mesure au rapporteur</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:0 0 8px;">Déplace le rapporteur (glisse dessus) pour amener son centre sur le sommet de l'angle (un effet d'aimant t'aide à bien le placer), puis fais-le pivoter (glisse sur le bouton ↻) pour aligner le 0° sur un des côtés. Lis alors la mesure sur l'autre côté, puis vérifie ta lecture.</p>
  ${arBuildLireScene()}
  <div class="figure-toolbar" style="justify-content:center;">
    <label class="hint" style="margin:0;">Ma lecture : <input type="number" id="ar-lireInput" style="width:70px;"> °</label>
    <button class="btn" onclick="arCheckLire()">Vérifier</button>
    <button class="btn secondary" onclick="arResetLire()">Nouvel angle</button>
  </div>
  <p class="hint" id="ar-lireStatus" style="text-align:center;margin-top:8px;"></p>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : entraîne-toi à construire un angle donné</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:0 0 8px;">Place le centre du rapporteur sur le sommet (effet d'aimant) et fais-le pivoter pour aligner le 0° sur le côté bleu. Déplace ensuite le crayon ✏️ le long de l'arc, degré par degré, jusqu'à la graduation demandée, puis valide : le côté se trace tout seul.</p>
  <p style="text-align:center;margin:0 0 8px;">Angle à construire : <b id="ar-construireCible">100°</b></p>
  ${arBuildConstruireScene()}
  <div class="figure-toolbar" style="justify-content:center;">
    <button class="btn" onclick="arValiderConstruire()">Valider le trait-repère</button>
    <button class="btn" onclick="arCheckConstruire()">Vérifier</button>
    <button class="btn secondary" onclick="arResetConstruire()">Nouvel angle à construire</button>
  </div>
  <p class="hint" id="ar-construireStatus" style="text-align:center;margin-top:8px;"></p>
</div>

<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer une mesure grâce aux angles opposés par le sommet</h4></div>
<div class="figure-wrap">
  <p><b>Énoncé :</b> Les droites (RR') et (TT') se coupent en S. On sait que <span class="tex">\\widehat{RST} = 62°</span>. Calcule la mesure de l'angle <span class="tex">\\widehat{R'ST'}</span>.</p>
  ${arBuildMethodeOpposesSvg()}
  <p class="interaction-hint" style="margin:10px 0 6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ar-methodeOpposesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arMethodeOpposesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="arMethodeOpposesDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : justifier un alignement grâce aux angles supplémentaires</h4></div>
<div class="figure-wrap">
  <p><b>Énoncé :</b> Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> sont tels que <span class="tex">\\widehat{DOE} = 72°</span> et <span class="tex">\\widehat{EOF} = 108°</span>. Montre que les points D, O et F sont alignés.</p>
  ${arBuildSupplSvg()}
  <p class="interaction-hint" style="margin:10px 0 6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="ar-methodeAlignementDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="arMethodeAlignementDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="arMethodeAlignementDemo.reset()">Recommencer</button>
  </div>
</div>

<div id="ar-permisStaffNote" style="display:none;">
  <div class="sub-header"><span class="letter">🎓</span><h4>Permis Rapporteur</h4></div>
  <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
    Le <b>Permis Rapporteur</b> est un examen noté sur 20 (10 lectures + 10 constructions) réservé aux élèves. Il n'apparaît ici que pour un élève <b>connecté</b> dont la classe a été <b>activée</b> par un professeur (case à cocher dans Administration → Gestion des classes → « Permis Rapporteur activé pour cette classe »). En tant que prof/admin, tu ne le vois donc pas ici : c'est normal.
  </div>
</div>

<div id="ar-permisSection" style="display:none;">
  <div class="sub-header"><span class="letter">🎓</span><h4>Permis Rapporteur</h4></div>
  <div class="figure-wrap">
    <div id="ar-permisIntro">
      <p>Une fois entraîné·e avec les méthodes ci-dessus, passe le <b>Permis Rapporteur</b> : 10 lectures de mesures et 10 constructions d'angles, noté sur 20.</p>
      <p class="hint">Ton professeur doit avoir démarré une session et t'avoir donné son code.</p>
      <div class="figure-toolbar" style="justify-content:center;">
        <label class="hint" style="margin:0;">Code de session : <input type="text" id="ar-permisCode" maxlength="6" style="width:100px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;letter-spacing:1px;"></label>
        <button class="btn" onclick="arPermisValiderCode()">Valider le code</button>
      </div>
      <p class="hint" id="ar-permisCodeStatus" style="text-align:center;margin-top:8px;"></p>
    </div>
    <div id="ar-permisExam" style="display:none;">
      <p style="text-align:center;margin:0 0 8px;"><b id="ar-permisProgress">Question 1/20</b> — <span id="ar-permisType"></span></p>
      <div id="ar-permisSceneWrap"></div>
      <div class="figure-toolbar" style="justify-content:center;" id="ar-permisToolbar"></div>
      <p class="hint" id="ar-permisStatus" style="text-align:center;margin-top:8px;"></p>
    </div>
    <div id="ar-permisResult" style="display:none;text-align:center;">
      <p style="font-size:1.3rem;font-weight:700;" id="ar-permisScoreText"></p>
      <button class="btn secondary" onclick="arPermisStart()">Repasser le Permis</button>
    </div>
  </div>
</div>
`;

/* ================= EXOS ================= */
document.getElementById('exos-demo-angles-rapporteur-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Utiliser les angles opposés par le sommet »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Les angles <span class="tex">\\widehat{RST}</span> et <span class="tex">\\widehat{R'ST'}</span> sont opposés par le sommet.</span><span class="we-comment">Ce que je sais.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles opposés par le sommet ont la même mesure.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span>, comme <span class="tex">\\widehat{RST} = 62°</span>, on a <span class="tex">\\widehat{R'ST'} = 62°</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un angle <span class="tex">\\widehat{xOy}</span> de 128° avec un rapporteur.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Deux droites sécantes en O forment quatre angles. L'un d'eux mesure 38°. Donne les mesures des trois autres.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> forment un angle plat. Sachant que <span class="tex">\\widehat{DOE} = 95°</span>, calcule la mesure de <span class="tex">\\widehat{EOF}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Construis un angle de 75°, puis trace sa bissectrice à l'aide d'un rapporteur.
  </div>
</div>
`;

/* ================= Méthodes animées ================= */
const AR_METHODE_OPPOSES_STEPS = [
  {expr:"Les angles <span class=\"tex\">\\widehat{RST}</span> et <span class=\"tex\">\\widehat{R'ST'}</span> sont opposés par le sommet.", note:"Ce que je sais : on repère deux angles opposés par le sommet."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles opposés par le sommet ont la même mesure.', note:"On énonce la propriété."},
  {expr:"<span style=\"color:var(--accent);font-weight:700;\">Donc</span>, comme <span class=\"tex\">\\widehat{RST} = 62°</span>, on a <span class=\"tex\">\\widehat{R'ST'} = 62°</span>.", note:"Conclusion."},
];
const arMethodeOpposesDemo = makeStepDemo(AR_METHODE_OPPOSES_STEPS, 'ar-methodeOpposesDisplay');

const AR_METHODE_ALIGNEMENT_STEPS = [
  {expr:'Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> sont tels que <span class="tex">\\widehat{DOE} = 72°</span> et <span class="tex">\\widehat{EOF} = 108°</span>.', note:"Ce que je sais."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> <span class="tex">72° + 108° = 180°</span>, donc les angles DOE et EOF sont supplémentaires.', note:"On calcule la somme des deux mesures."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles adjacents et supplémentaires forment un angle plat.', note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> les points D, O et F sont alignés.', note:"Conclusion."},
];
const arMethodeAlignementDemo = makeStepDemo(AR_METHODE_ALIGNEMENT_STEPS, 'ar-methodeAlignementDisplay');

let arDragInitialized = false;
DEMO_REGISTRY['Angles et rapporteur'] = {
  cours:'cours-demo-angles-rapporteur-6e', methode:'methode-demo-angles-rapporteur-6e', exos:'exos-demo-angles-rapporteur-6e',
  init:()=>{
    arCheckPermisEligibility();
    if(typeof registerSceneStepDemo==='function'){
      registerSceneStepDemo('ar-demoLireScene', {
        steps: ()=>arDemoLireSteps(),
        getIdx: ()=>arDemoLireStepIdx,
        goto: (i)=>arDemoLireGoto(i),
        capture: (i)=>arCaptureRapporteurScene('ar-demoLireScene', 'svg', arDemoLireProtState, 1, null, 260),
      });
      registerSceneStepDemo('ar-demoConsScene', {
        steps: ()=>arDemoConsSteps(),
        getIdx: ()=>arDemoConsStepIdx,
        goto: (i)=>arDemoConsGoto(i),
        capture: (i)=>{
          const protOpacity = i>=4 ? 0 : 1;
          const localDeg = arDemoConsMode==='exterieur' ? (180-AR_DEMO_CONS_TARGET) : AR_DEMO_CONS_TARGET;
          const pencilDeg = (i>=2 && i<=3) ? localDeg : null;
          return arCaptureRapporteurScene('ar-demoConsScene', 'svg', arDemoConsProtState, protOpacity, pencilDeg, 260);
        },
      });
    }
    arDemoLireReset();
    arDemoConsReset();
    arResetLire();
    arResetConstruire();
    arBisReset();
    if(!arDragInitialized){
      arDragInitialized = true;
      arInitProtractorDrag('ar-lireProtractor','ar-lireScene', arLireProtState, arLireVertex, arLireRayAngles);
      arInitProtractorDrag('ar-construireProtractor','ar-construireScene', arConstruireProtState, arConstruireVertex, arConstruireRayAngles);
      registerSceneStepDemo('ar-bissectriceScene', {
        steps: ()=>AR_BIS_STEPS,
        getIdx: ()=>arBisStepIdx,
        goto: (i)=>arBisGoto(i),
        capture: (i)=>{
          const protOpacity = i>=6 ? 0 : 1;
          const pencilDeg = (i>=4 && i<=5) ? (AR_BIS_ANGLE/2) : null;
          return arCaptureRapporteurScene('ar-bissectriceScene', 'svg', arBisProtState, protOpacity, pencilDeg, 260);
        },
      });
      arInitPencilDrag('ar-construireProtractor','ar-construireProtractor-pencil','ar-construireScene', arConstruireProtState, (deg)=>{ arConstruirePencilDeg=deg; arRenderConstruirePencil(); });
    }
    arMethodeOpposesDemo.reset();
    arMethodeAlignementDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-angles-rapporteur-6e'));
    renderStaticMath(document.getElementById('exos-demo-angles-rapporteur-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-angles-rapporteur-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-angles-rapporteur-6e'));
  }
};

DEMO_QUIZZES['Angles et rapporteur'] = [
  {q:"Un angle de 90° est appelé...",
   opts:["Un angle plat","Un angle droit","Un angle nul"], correct:1},
  {q:"Un angle de 130° est un angle...",
   opts:["Aigu","Obtus","Rentrant"], correct:1},
  {q:"L'instrument qui permet de mesurer un angle est...",
   opts:["La règle","L'équerre","Le rapporteur"], correct:2},
  {q:"Deux angles opposés par le sommet ont...",
   opts:["La même mesure","Une somme de 180°","Un côté commun"], correct:0},
  {q:"La bissectrice d'un angle saillant le partage en...",
   opts:["Deux angles opposés par le sommet","Deux angles adjacents de même mesure","Trois angles égaux"], correct:1},
];

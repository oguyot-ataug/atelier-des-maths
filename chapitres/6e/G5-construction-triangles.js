/* ============================================================
   CHAPITRE : Construction de triangles (6e, G5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Trois méthodes de construction (§1.A/B/C dans le support papier
   d'Olivier) : connaissant les 3 côtés (SSS, règle + compas x2),
   connaissant 2 côtés et l'angle qu'ils délimitent (SAS, règle +
   rapporteur + règle), connaissant 1 côté et les 2 angles adjacents
   (ASA, règle + rapporteur x2). Seule la méthode A (SSS) est animée
   pour l'instant -- B et C suivront dans une prochaine session, pour
   garder le même niveau de vérification numérique que sur les autres
   constructions (G1, G2).

   Design réel du tableau interactif (equerreSVG/rulerSVG/compassSVG,
   voir app.js) réutilisé tel quel, même technique que G1/G2 : formes
   fixes posées une fois, positionnées/orientées ensuite par un simple
   <g transform="translate(...) rotate(...)">.
   ============================================================ */

document.getElementById('cours-demo-construction-triangles').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Construction de triangles quelconques</h3></div>

<p class="example-title" style="margin-top:0;">A. Connaissant les longueurs de ses trois côtés</p>
<p style="margin:4px 0 8px;"><b>Exemple</b> : construis un triangle ABC tel que AB = 6 cm, BC = 5 cm et AC = 4,5 cm.</p>

<div class="figure-wrap">
  <svg id="triASvg" viewBox="0 0 300 300" style="width:100%;max-width:420px;display:block;margin:14px auto;">
    <line id="triATickA" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
    <text x="42" y="188" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">A</text>
    <line id="triATickB" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
    <text x="188" y="188" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">B</text>
    <line id="triASegAB" x1="60" y1="170" x2="60" y2="170" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <g id="triARulerTool" opacity="0"></g>
    <g id="triAPencilTool" opacity="0"></g>
    <polyline id="triAArcB" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <g id="triACompassB" opacity="0"></g>
    <polyline id="triAArcA" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <g id="triACompassA" opacity="0"></g>
    <line id="triASegAC" x1="60" y1="170" x2="60" y2="170" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <line id="triASegBC" x1="180" y1="170" x2="180" y2="170" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <line id="triATickC" class="pt-tick" stroke="#E35D3A" stroke-width="2" opacity="0"/>
    <text id="triACLabel" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700" opacity="0">C</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>On trace un segment <b>[AB]</b> de longueur <b>6 cm</b> à la règle.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Le point C est à <b>5 cm</b> du point B donc on trace un arc de cercle de <b>centre B</b> et de rayon <b>5 cm</b>.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>On trace l'arc de cercle de <b>centre A</b> et de rayon <b>4,5 cm</b>. Le point <b>C</b> est le point d'intersection des deux arcs.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>On trace le triangle <b>ABC</b>.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnTriANext" onclick="triANextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="triAReset()">Revoir depuis le début</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">B. Connaissant la longueur de deux côtés et la mesure de l'angle délimité par ces côtés</p>
<p class="hint" style="margin:8px 0;">Cette construction est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>

<p class="example-title" style="margin-top:26px;">C. Connaissant la longueur d'un côté et la mesure des angles adjacents à ce côté</p>
<p class="hint" style="margin:8px 0;">Cette construction est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('methode-demo-construction-triangles').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-construction-triangles').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

/* ---- Construction A : SSS (règle + compas x2), géométrie réelle ---- */
const triA_A = {x:60, y:170};
const triA_B = {x:180, y:170};
const triA_AC_LEN = 90;   // 4,5 cm × 20 px/cm
const triA_BC_LEN = 100;  //   5 cm × 20 px/cm
const triA_AB_LEN = 120;  //   6 cm × 20 px/cm
// Intersection des deux cercles (centre A, rayon AC) et (centre B, rayon BC) -- formule standard,
// vérifiée numériquement (AC/BC/AB retombent exactement sur les longueurs voulues).
const triA_dx = (triA_AB_LEN*triA_AB_LEN + triA_AC_LEN*triA_AC_LEN - triA_BC_LEN*triA_BC_LEN)/(2*triA_AB_LEN);
const triA_dy = Math.sqrt(triA_AC_LEN*triA_AC_LEN - triA_dx*triA_dx);
const triA_C = {x: triA_A.x+triA_dx, y: triA_A.y-triA_dy};

const triA_RulerScale = Math.max(0.44, (triA_AB_LEN+50)/TB_RULER_L);
const triA_RulerStart = {x: triA_A.x - 30*triA_RulerScale, y: triA_A.y};
const triARulerTool = document.getElementById('triARulerTool');
triARulerTool.innerHTML = rulerSVG(true);
triARulerTool.setAttribute('transform', `translate(${triA_RulerStart.x.toFixed(1)},${triA_RulerStart.y.toFixed(1)}) rotate(0) scale(${triA_RulerScale.toFixed(3)})`);
const triAPencilTool = document.getElementById('triAPencilTool');
triAPencilTool.innerHTML = pencilSVG('tri-a-pencil');
const TRI_A_PENCIL_TILT = 55;
function triASetPencilAt(x,y){
  triAPencilTool.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(0-90+TRI_A_PENCIL_TILT).toFixed(1)}) scale(${triA_RulerScale.toFixed(3)})`);
}
triASetPencilAt(triA_A.x, triA_A.y);

// Compas B (rayon BC=5cm) : angle de base 180° (pointe vers A, longueur connue), balayage vers
// l'angle cible (direction de C depuis B).
const triA_LegLenB = 0.7*triA_BC_LEN+30;
document.getElementById('triACompassB').innerHTML = compassSVG(triA_BC_LEN, triA_LegLenB);
const triA_AngleB_target = Math.atan2(triA_C.y-triA_B.y, triA_C.x-triA_B.x)*180/Math.PI;

// Compas A (rayon AC=4,5cm) : angle de base 0° (pointe vers B), balayage vers l'angle cible
// (direction de C depuis A).
const triA_LegLenA = 0.7*triA_AC_LEN+30;
document.getElementById('triACompassA').innerHTML = compassSVG(triA_AC_LEN, triA_LegLenA);
const triA_AngleA_target = Math.atan2(triA_C.y-triA_A.y, triA_C.x-triA_A.x)*180/Math.PI;

const TRI_ARC_HALF_ANGLE = 14*Math.PI/180;

/* Anime un balayage de compas continu (anchor, rayon, longueur de branche fixe) depuis un angle
   de départ jusqu'à un peu au-delà de l'angle cible, en révélant un petit arc de "trait de
   construction" (gris fin) progressivement dès que le balayage entre dans la petite fenêtre
   autour de la cible -- même principe que G1 Symétrie centrale (le compas trace VRAIMENT tout
   l'arc visible lui-même, sa mine continuant de tourner tant que l'arc grandit ; il ne se retire
   qu'une fois le tracé terminé). */
function triAAnimateCompassSweep(opts){
  const {compassId, arcId, anchor, startAngleDeg, targetAngleDeg, dur, onDone} = opts;
  const startRad = startAngleDeg*Math.PI/180, targetRad = targetAngleDeg*Math.PI/180;
  const sweepRad = targetRad-startRad;
  const arcStart = targetRad - TRI_ARC_HALF_ANGLE*Math.sign(sweepRad||1);
  const totalSweepRad = sweepRad + TRI_ARC_HALF_ANGLE*Math.sign(sweepRad||1);
  const start = performance.now();
  const compassEl = document.getElementById(compassId), arcEl = document.getElementById(arcId);
  function pointOnArc(angleRad, radius){ return {x: anchor.x+radius*Math.cos(angleRad), y: anchor.y+radius*Math.sin(angleRad)}; }
  function frame(now){
    const t = Math.min(1, (now-start)/dur);
    const angle = startRad + t*totalSweepRad;
    const enteredWindow = Math.sign(sweepRad||1)>0 ? angle>=arcStart : angle<=arcStart;
    if(enteredWindow){
      const radius = opts.radius;
      const pts=[]; const step = Math.PI/60*Math.sign(totalSweepRad||1);
      for(let a=arcStart; Math.sign(totalSweepRad||1)>0 ? a<=angle+1e-6 : a>=angle-1e-6; a+=step){
        const p = pointOnArc(a, radius); pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
      }
      arcEl.setAttribute('points', pts.join(' '));
      arcEl.setAttribute('opacity','1');
    }
    compassEl.setAttribute('transform', `translate(${anchor.x},${anchor.y}) rotate(${(angle*180/Math.PI).toFixed(2)})`);
    compassEl.setAttribute('opacity','1');
    if(t<1){ requestAnimationFrame(frame); return; }
    compassEl.setAttribute('opacity','0');
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}

let triAStep = 0;
function triAResetVisuals(){
  ['triASegAB','triARulerTool','triAPencilTool','triAArcB','triACompassB','triAArcA','triACompassA','triASegAC','triASegBC','triATickC','triACLabel'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.getElementById('triAArcB').setAttribute('points','');
  document.getElementById('triAArcA').setAttribute('points','');
}
function triASetTick(id, pt, angleDeg){
  const rad = angleDeg*Math.PI/180;
  const el = document.getElementById(id);
  el.setAttribute('x1', (pt.x-9*Math.cos(rad)).toFixed(1)); el.setAttribute('y1', (pt.y-9*Math.sin(rad)).toFixed(1));
  el.setAttribute('x2', (pt.x+9*Math.cos(rad)).toFixed(1)); el.setAttribute('y2', (pt.y+9*Math.sin(rad)).toFixed(1));
}
function triARenderInstant(step){
  document.querySelectorAll('#triASvg + .step-list .step-item').forEach(s=>s.classList.remove('done'));
  triAResetVisuals();
  triASetTick('triATickA', triA_A, 90);
  triASetTick('triATickB', triA_B, 90);
  const doneUpTo = (n)=>{ for(let i=1;i<=n;i++){ const el=document.querySelector(`#cours-demo-construction-triangles .step-item[data-step="${i}"]`); if(el) el.classList.add('done'); } };
  if(step>=1){
    document.getElementById('triASegAB').setAttribute('opacity','1');
    document.getElementById('triASegAB').setAttribute('x2', triA_B.x); document.getElementById('triASegAB').setAttribute('y2', triA_B.y);
  }
  if(step>=2){
    document.getElementById('triAArcB').setAttribute('opacity','1');
    const arcStart = (triA_AngleB_target*Math.PI/180) - TRI_ARC_HALF_ANGLE;
    const pts=[]; for(let a=arcStart; a<=arcStart+2*TRI_ARC_HALF_ANGLE+1e-6; a+=Math.PI/60){ const p={x:triA_B.x+triA_BC_LEN*Math.cos(a), y:triA_B.y+triA_BC_LEN*Math.sin(a)}; pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`); }
    document.getElementById('triAArcB').setAttribute('points', pts.join(' '));
  }
  if(step>=3){
    document.getElementById('triAArcA').setAttribute('opacity','1');
    const arcStart = (triA_AngleA_target*Math.PI/180) - TRI_ARC_HALF_ANGLE;
    const pts=[]; for(let a=arcStart; a<=arcStart+2*TRI_ARC_HALF_ANGLE+1e-6; a+=Math.PI/60){ const p={x:triA_A.x+triA_AC_LEN*Math.cos(a), y:triA_A.y+triA_AC_LEN*Math.sin(a)}; pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`); }
    document.getElementById('triAArcA').setAttribute('points', pts.join(' '));
    document.getElementById('triATickC').setAttribute('opacity','1');
    triASetTick('triATickC', triA_C, 90);
    document.getElementById('triACLabel').setAttribute('opacity','1');
    document.getElementById('triACLabel').setAttribute('x', (triA_C.x-4).toFixed(1));
    document.getElementById('triACLabel').setAttribute('y', (triA_C.y-12).toFixed(1));
  }
  if(step>=4){
    document.getElementById('triASegAC').setAttribute('opacity','1');
    document.getElementById('triASegAC').setAttribute('x2', triA_C.x); document.getElementById('triASegAC').setAttribute('y2', triA_C.y);
    document.getElementById('triASegBC').setAttribute('opacity','1');
    document.getElementById('triASegBC').setAttribute('x2', triA_C.x); document.getElementById('triASegBC').setAttribute('y2', triA_C.y);
  }
  doneUpTo(step);
}
function triAReset(){ triAStep=0; triARenderInstant(0); }
function triANextStep(){
  triAStep++;
  const btn = document.getElementById('btnTriANext');
  if(triAStep===1){
    btn.disabled = true;
    document.getElementById('triASegAB').setAttribute('opacity','1');
    document.getElementById('triASegAB').setAttribute('x2', triA_A.x); document.getElementById('triASegAB').setAttribute('y2', triA_A.y);
    document.getElementById('triARulerTool').setAttribute('opacity','1');
    document.getElementById('triAPencilTool').setAttribute('opacity','1');
    triASetPencilAt(triA_A.x, triA_A.y);
    const start = performance.now(), dur=1000;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curX = triA_A.x + (triA_B.x-triA_A.x)*t;
      document.getElementById('triASegAB').setAttribute('x2', curX.toFixed(1));
      triASetPencilAt(curX, triA_A.y);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('triARulerTool').setAttribute('opacity','0');
      document.getElementById('triAPencilTool').setAttribute('opacity','0');
      document.querySelector("#cours-demo-construction-triangles .step-item[data-step=\"1\"]").classList.add('done');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else if(triAStep===2){
    btn.disabled = true;
    triAAnimateCompassSweep({
      compassId:'triACompassB', arcId:'triAArcB', anchor:triA_B, radius:triA_BC_LEN,
      startAngleDeg:180, targetAngleDeg:triA_AngleB_target, dur:1400,
      onDone:()=>{ document.querySelector('#cours-demo-construction-triangles .step-item[data-step="2"]').classList.add('done'); btn.disabled=false; }
    });
  } else if(triAStep===3){
    btn.disabled = true;
    triAAnimateCompassSweep({
      compassId:'triACompassA', arcId:'triAArcA', anchor:triA_A, radius:triA_AC_LEN,
      startAngleDeg:0, targetAngleDeg:triA_AngleA_target, dur:1400,
      onDone:()=>{
        document.getElementById('triATickC').setAttribute('opacity','1');
        triASetTick('triATickC', triA_C, 90);
        document.getElementById('triACLabel').setAttribute('opacity','1');
        document.getElementById('triACLabel').setAttribute('x', (triA_C.x-4).toFixed(1));
        document.getElementById('triACLabel').setAttribute('y', (triA_C.y-12).toFixed(1));
        document.querySelector('#cours-demo-construction-triangles .step-item[data-step="3"]').classList.add('done');
        btn.disabled=false;
      }
    });
  } else {
    triARenderInstant(triAStep);
    if(triAStep>=4){ btn.textContent='Terminé ✓'; btn.disabled=true; }
  }
}

DEMO_REGISTRY['6e|Construction de triangles'] = {
  cours:'cours-demo-construction-triangles', methode:'methode-demo-construction-triangles', exos:'exos-demo-construction-triangles',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-construction-triangles'));
    renderStaticMath(document.getElementById('methode-demo-construction-triangles'));
    renderStaticMath(document.getElementById('exos-demo-construction-triangles'));
    injectCourseAddButtons(document.getElementById('cours-demo-construction-triangles'));
    injectCourseAddButtons(document.getElementById('methode-demo-construction-triangles'));
    triAReset();
  }
};

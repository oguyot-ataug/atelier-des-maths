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
  <svg id="triASvg" viewBox="0 0 240 380" style="width:100%;max-width:420px;display:block;margin:14px auto;">
    <g id="triAMeasureRuler" opacity="0"></g>
    <text id="triALabelA" x="42" y="298" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700" opacity="0">A</text>
    <text id="triALabelB" x="188" y="298" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700" opacity="0">B</text>
    <line id="triASegAB" x1="60" y1="280" x2="60" y2="280" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <g id="triARulerTool" opacity="0"></g>
    <g id="triAPencilTool" opacity="0"></g>
    <polyline id="triAArcB" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <g id="triACompassB" opacity="0"></g>
    <polyline id="triAArcA" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <g id="triACompassA" opacity="0"></g>
    <line id="triASegAC" x1="60" y1="280" x2="60" y2="280" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <line id="triASegBC" x1="180" y1="280" x2="180" y2="280" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <text id="triACLabel" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700" opacity="0">C</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>On trace un segment <b>[AB]</b> de longueur <b>6 cm</b> à la règle.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Le point C est à <b>5 cm</b> du point B donc on trace un arc de cercle de <b>centre B</b> et de rayon <b>5 cm</b> (mesurés à la règle).</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>On trace l'arc de cercle de <b>centre A</b> et de rayon <b>4,5 cm</b> (mesurés à la règle). Le point <b>C</b> est le point d'intersection des deux arcs.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>On trace le triangle <b>ABC</b>.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnTriANext" onclick="triANextStep()">Étape suivante →</button>

    <button class="btn secondary" onclick="triAReset()">Revoir depuis le début</button>
  </div>
</div>

<p class="example-title" style="margin-top:26px;">B. Connaissant la longueur de deux côtés et la mesure de l'angle délimité par ces côtés</p>
<p style="margin:4px 0 8px;"><b>Exemple</b> : construis un triangle DEF tel que DE = 6 cm, DF = 5 cm et <span class="tex">\\widehat{EDF} = 50°</span>.</p>

<div class="figure-wrap">
  <svg id="triBSvg" viewBox="0 135 265 175" style="width:100%;max-width:420px;display:block;margin:14px auto;">
    <text id="triBLabelD" x="80" y="285" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700" opacity="0">D</text>
    <text id="triBLabelE" x="220" y="285" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700" opacity="0">E</text>
    <line id="triBSegDE" x1="95" y1="265" x2="95" y2="265" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <g id="triBRulerTool" opacity="0"></g>
    <g id="triBPencilTool" opacity="0"></g>
    <g id="triBProtractor" opacity="0"></g>
    <line id="triBRay" x1="95" y1="265" x2="95" y2="265" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <line id="triBSegDF" x1="95" y1="265" x2="95" y2="265" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <line id="triBSegEF" x1="220" y1="265" x2="220" y2="265" stroke="#1C1B2E" stroke-width="1.8" opacity="0"/>
    <text id="triBLabelF" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700" opacity="0">F</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>On trace un segment <b>[DE]</b> de longueur <b>6 cm</b> à la règle.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Au <b>rapporteur</b>, on trace une demi-droite <b>[Dx)</b> telle que <b>EDx = 50°</b>.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>Sur cette demi-droite, à la <b>règle</b>, on place le point <b>F</b> tel que <b>DF = 5 cm</b>.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>On trace <b>[EF]</b> pour compléter le triangle <b>DEF</b>.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnTriBNext" onclick="triBNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="triBReset()">Revoir depuis le début</button>
  </div>
</div>

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
const triA_A = {x:60, y:280};
const triA_B = {x:180, y:280};
const triA_AC_LEN = 90;   // 4,5 cm × 20 px/cm
const triA_BC_LEN = 100;  //   5 cm × 20 px/cm
const triA_AB_LEN = 120;  //   6 cm × 20 px/cm
// Intersection des deux cercles (centre A, rayon AC) et (centre B, rayon BC) -- formule standard,
// vérifiée numériquement (AC/BC/AB retombent exactement sur les longueurs voulues).
const triA_dx = (triA_AB_LEN*triA_AB_LEN + triA_AC_LEN*triA_AC_LEN - triA_BC_LEN*triA_BC_LEN)/(2*triA_AB_LEN);
const triA_dy = Math.sqrt(triA_AC_LEN*triA_AC_LEN - triA_dx*triA_dx);
const triA_C = {x: triA_A.x+triA_dx, y: triA_A.y-triA_dy};

// rulerSVG a sa PROPRE graduation native (22 unités/cm, cmStep dans rulerSVG), différente de la
// convention de ce chapitre (1 cm = 20 unités, cf. triA_AC_LEN etc.). Sans remise à l'échelle
// exacte, les graduations imprimées ne correspondent pas au segment réellement tracé ni à
// l'écartement du compas -- l'échelle doit être fixée précisément à 20/22, pas choisie "au jugé"
// pour la taille visuelle (constante PARTAGÉE par la règle de l'étape 1 et celle de la zone de
// mesure, pour être sûr qu'elles restent toujours cohérentes entre elles).
const TRI_A_RULER_SCALE = 20/22;

const triA_RulerScale = TRI_A_RULER_SCALE;
// Le "0" imprimé de la règle doit tomber EXACTEMENT sur A (pas décalé en arrière) : rulerSVG a
// déjà son propre petit manche cosmétique avant le 0 (-leftMargin, intégré), inutile d'en
// rajouter un qui décale aussi la graduation elle-même hors de A.
const triA_RulerStart = {x: triA_A.x, y: triA_A.y};
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

// Zone de mesure (haut de la figure) : avant chaque tracé d'arc, on montre le compas posé SUR la
// règle, sa pointe au 0 et sa mine au bon nombre de centimètres, pour bien montrer que
// l'écartement se prend en le mesurant -- pas un compas qui apparaît déjà ouvert par magie.
const TRI_A_MEASURE_Y = 105, TRI_A_MEASURE_X0 = 15;
const triAMeasureRuler = document.getElementById('triAMeasureRuler');
triAMeasureRuler.innerHTML = rulerSVG(true);
triAMeasureRuler.setAttribute('transform', `translate(${TRI_A_MEASURE_X0},${TRI_A_MEASURE_Y}) rotate(0) scale(${TRI_A_RULER_SCALE})`);

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

/* Montre d'abord le compas posé SUR la règle pour prendre la mesure : la pointe reste fixe au 0
   tandis que la mine s'écarte progressivement jusqu'au bon nombre de centimètres -- pour bien
   montrer que l'écartement se prend en le mesurant, pas un compas qui apparaît déjà ouvert par
   magie -- puis l'anime en le déplaçant, toujours ouvert à la même mesure, jusqu'au point
   d'ancrage, avant d'enchaîner sur le balayage (triAAnimateCompassSweep). */
function triAMeasureThenSweep(opts){
  const {compassId, arcId, anchor, radius, legLen, startAngleDeg, targetAngleDeg, dur, onDone} = opts;
  const compassEl = document.getElementById(compassId);
  triAMeasureRuler.setAttribute('opacity','1');
  compassEl.setAttribute('transform', `translate(${TRI_A_MEASURE_X0},${TRI_A_MEASURE_Y}) rotate(0)`);
  compassEl.setAttribute('opacity','1');
  const openDur = 700, moveDur = 550, startRadius = 6;
  const openStart = performance.now();
  function openFrame(now){
    const t = Math.min(1, (now-openStart)/openDur);
    const ease = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const curRadius = startRadius + (radius-startRadius)*ease;
    compassEl.innerHTML = compassSVG(curRadius, legLen);
    if(t<1){ requestAnimationFrame(openFrame); return; }
    compassEl.innerHTML = compassSVG(radius, legLen); // forme exacte au rayon cible pour la suite
    startMove();
  }
  requestAnimationFrame(openFrame);
  function startMove(){
    const moveStart = performance.now();
    const fromPos = {x:TRI_A_MEASURE_X0, y:TRI_A_MEASURE_Y};
    function frame(now){
      const t = Math.min(1, (now-moveStart)/moveDur);
      const ease = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
      const curX = fromPos.x + (anchor.x-fromPos.x)*ease;
      const curY = fromPos.y + (anchor.y-fromPos.y)*ease;
      const curAngle = 0 + (startAngleDeg-0)*ease;
      compassEl.setAttribute('transform', `translate(${curX.toFixed(1)},${curY.toFixed(1)}) rotate(${curAngle.toFixed(2)})`);
      if(t<1){ requestAnimationFrame(frame); return; }
      triAMeasureRuler.setAttribute('opacity','0');
      triAAnimateCompassSweep({compassId, arcId, anchor, radius, startAngleDeg, targetAngleDeg, dur, onDone});
    }
    requestAnimationFrame(frame);
  }
}

let triAStep = 0;
function triAResetVisuals(){
  ['triASegAB','triARulerTool','triAPencilTool','triAArcB','triACompassB','triAArcA','triACompassA','triASegAC','triASegBC','triACLabel','triALabelA','triALabelB','triAMeasureRuler'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.getElementById('triAArcB').setAttribute('points','');
  document.getElementById('triAArcA').setAttribute('points','');
}

function triARenderInstant(step){
  document.querySelectorAll('#triASvg + .step-list .step-item').forEach(s=>s.classList.remove('done'));
  triAResetVisuals();
  const doneUpTo = (n)=>{ for(let i=1;i<=n;i++){ const el=document.querySelector(`#triASvg + .step-list .step-item[data-step="${i}"]`); if(el) el.classList.add('done'); } };
  if(step>=1){
    // A et B n'existent qu'UNE FOIS le segment mesuré à la règle -- pas donnés d'avance. Pas de
    // repère en croix : les sommets du triangle tracé suffisent à les marquer.
    document.getElementById('triALabelA').setAttribute('opacity','1');
    document.getElementById('triALabelB').setAttribute('opacity','1');
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
    // C est déjà repéré par le croisement des deux arcs : pas de second repère par-dessus, juste
    // le label.
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
function triAReset(){
  triAStep=0;
  triARenderInstant(0);
  const btn = document.getElementById('btnTriANext');
  btn.textContent = 'Étape suivante →';
  btn.disabled = false;
}
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
      // A et B apparaissent maintenant que le segment [AB] est tracé -- pas avant. Pas de repère
      // en croix : les sommets du triangle tracé suffisent à les marquer.
      document.getElementById('triALabelA').setAttribute('opacity','1');
      document.getElementById('triALabelB').setAttribute('opacity','1');
      document.querySelector("#triASvg + .step-list .step-item[data-step=\"1\"]").classList.add('done');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else if(triAStep===2){
    btn.disabled = true;
    triAMeasureThenSweep({
      compassId:'triACompassB', arcId:'triAArcB', anchor:triA_B, radius:triA_BC_LEN, legLen:triA_LegLenB,
      startAngleDeg:180, targetAngleDeg:triA_AngleB_target, dur:1400,
      onDone:()=>{ document.querySelector('#triASvg + .step-list .step-item[data-step="2"]').classList.add('done'); btn.disabled=false; }
    });
  } else if(triAStep===3){
    btn.disabled = true;
    triAMeasureThenSweep({
      compassId:'triACompassA', arcId:'triAArcA', anchor:triA_A, radius:triA_AC_LEN, legLen:triA_LegLenA,
      startAngleDeg:0, targetAngleDeg:triA_AngleA_target, dur:1400,
      onDone:()=>{
        // C est déjà repéré par le croisement des deux arcs : pas de second repère, juste le
        // label.
        document.getElementById('triACLabel').setAttribute('opacity','1');
        document.getElementById('triACLabel').setAttribute('x', (triA_C.x-4).toFixed(1));
        document.getElementById('triACLabel').setAttribute('y', (triA_C.y-12).toFixed(1));
        document.querySelector('#triASvg + .step-list .step-item[data-step="3"]').classList.add('done');
        btn.disabled=false;
      }
    });
  } else {
    triARenderInstant(triAStep);
    if(triAStep>=4){ btn.textContent='Terminé ✓'; btn.disabled=true; }
  }
}

/* ---- Construction B : SAS (règle + rapporteur + règle), géométrie réelle ---- */
const triB_D = {x:95, y:265};
const triB_E = {x:215, y:265};
const triB_DF_LEN = 100;      // 5 cm × 20 px/cm
const triB_DE_LEN = 120;      // 6 cm × 20 px/cm
const triB_ANGLE_DEG = 50;
const triB_angleRad = -triB_ANGLE_DEG*Math.PI/180; // négatif = vers le haut en SVG (y inversé)
const triB_RAY_LEN = 130; // dépasse F, pour un tracé net (même convention que G1/A)
const triB_rayEnd = {x: triB_D.x+triB_RAY_LEN*Math.cos(triB_angleRad), y: triB_D.y+triB_RAY_LEN*Math.sin(triB_angleRad)};
const triB_F = {x: triB_D.x+triB_DF_LEN*Math.cos(triB_angleRad), y: triB_D.y+triB_DF_LEN*Math.sin(triB_angleRad)};

const triB_RulerScale = TRI_A_RULER_SCALE; // même échelle exacte que la construction A (20/22)
const triBRulerTool = document.getElementById('triBRulerTool');
triBRulerTool.innerHTML = rulerSVG(true);
const triBPencilTool = document.getElementById('triBPencilTool');
triBPencilTool.innerHTML = pencilSVG('tri-b-pencil');
function triBSetRulerAt(origin, angleDeg){
  triBRulerTool.setAttribute('transform', `translate(${origin.x.toFixed(1)},${origin.y.toFixed(1)}) rotate(${angleDeg.toFixed(2)}) scale(${triB_RulerScale.toFixed(3)})`);
}
function triBSetPencilAt(x,y,angleDeg){
  triBPencilTool.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angleDeg-90+TRI_A_PENCIL_TILT).toFixed(1)}) scale(${triB_RulerScale.toFixed(3)})`);
}
triBSetRulerAt(triB_D, 0);
triBSetPencilAt(triB_D.x, triB_D.y, 0);

// Rapporteur posé à D, bord aligné sur [DE) (angle 0) -- prop visuelle positionnée par le calcul,
// pas par decodage de l'image elle-même (voir note compassSVG plus haut sur le même principe).
const TRI_B_PROT_SCALE = 0.46;
const triBProtractor = document.getElementById('triBProtractor');
triBProtractor.innerHTML = protractorSVG();
triBProtractor.setAttribute('transform', `translate(${triB_D.x},${triB_D.y}) rotate(0) scale(${TRI_B_PROT_SCALE})`);

let triBStep = 0;
function triBResetVisuals(){
  ['triBSegDE','triBRulerTool','triBPencilTool','triBProtractor','triBRay','triBSegDF','triBSegEF','triBLabelD','triBLabelE','triBLabelF'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
}
function triBRenderInstant(step){
  document.querySelectorAll('#triBSvg + .step-list .step-item').forEach(s=>s.classList.remove('done'));
  triBResetVisuals();
  const doneUpTo = (n)=>{ for(let i=1;i<=n;i++){ const el=document.querySelector(`#triBSvg + .step-list .step-item[data-step="${i}"]`); if(el) el.classList.add('done'); } };
  if(step>=1){
    document.getElementById('triBLabelD').setAttribute('opacity','1');
    document.getElementById('triBLabelE').setAttribute('opacity','1');
    document.getElementById('triBSegDE').setAttribute('opacity','1');
    document.getElementById('triBSegDE').setAttribute('x2', triB_E.x); document.getElementById('triBSegDE').setAttribute('y2', triB_E.y);
  }
  if(step>=2){
    document.getElementById('triBRay').setAttribute('opacity','1');
    document.getElementById('triBRay').setAttribute('x2', triB_rayEnd.x.toFixed(1)); document.getElementById('triBRay').setAttribute('y2', triB_rayEnd.y.toFixed(1));
  }
  if(step>=3){
    document.getElementById('triBSegDF').setAttribute('opacity','1');
    document.getElementById('triBSegDF').setAttribute('x2', triB_F.x.toFixed(1)); document.getElementById('triBSegDF').setAttribute('y2', triB_F.y.toFixed(1));
    document.getElementById('triBLabelF').setAttribute('opacity','1');
    document.getElementById('triBLabelF').setAttribute('x', (triB_F.x-18).toFixed(1));
    document.getElementById('triBLabelF').setAttribute('y', (triB_F.y-4).toFixed(1));
  }
  if(step>=4){
    document.getElementById('triBSegEF').setAttribute('opacity','1');
    document.getElementById('triBSegEF').setAttribute('x1', triB_E.x); document.getElementById('triBSegEF').setAttribute('y1', triB_E.y);
    document.getElementById('triBSegEF').setAttribute('x2', triB_F.x.toFixed(1)); document.getElementById('triBSegEF').setAttribute('y2', triB_F.y.toFixed(1));
  }
  doneUpTo(step);
}
function triBReset(){
  triBStep=0;
  triBRenderInstant(0);
  const btn = document.getElementById('btnTriBNext');
  btn.textContent = 'Étape suivante →';
  btn.disabled = false;
}
function triBNextStep(){
  triBStep++;
  const btn = document.getElementById('btnTriBNext');
  if(triBStep===1){
    btn.disabled = true;
    document.getElementById('triBSegDE').setAttribute('opacity','1');
    document.getElementById('triBSegDE').setAttribute('x2', triB_D.x); document.getElementById('triBSegDE').setAttribute('y2', triB_D.y);
    document.getElementById('triBRulerTool').setAttribute('opacity','1');
    document.getElementById('triBPencilTool').setAttribute('opacity','1');
    triBSetRulerAt(triB_D, 0);
    triBSetPencilAt(triB_D.x, triB_D.y, 0);
    const start = performance.now(), dur=1300;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curX = triB_D.x + (triB_E.x-triB_D.x)*t;
      document.getElementById('triBSegDE').setAttribute('x2', curX.toFixed(1));
      triBSetPencilAt(curX, triB_D.y, 0);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('triBRulerTool').setAttribute('opacity','0');
      document.getElementById('triBPencilTool').setAttribute('opacity','0');
      document.getElementById('triBLabelD').setAttribute('opacity','1');
      document.getElementById('triBLabelE').setAttribute('opacity','1');
      document.querySelector('#triBSvg + .step-list .step-item[data-step="1"]').classList.add('done');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else if(triBStep===2){
    btn.disabled = true;
    document.getElementById('triBProtractor').setAttribute('opacity','1');
    document.getElementById('triBRay').setAttribute('opacity','1');
    document.getElementById('triBRay').setAttribute('x2', triB_D.x); document.getElementById('triBRay').setAttribute('y2', triB_D.y);
    const start = performance.now(), dur=1800;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curX = triB_D.x + (triB_rayEnd.x-triB_D.x)*t, curY = triB_D.y + (triB_rayEnd.y-triB_D.y)*t;
      document.getElementById('triBRay').setAttribute('x2', curX.toFixed(1)); document.getElementById('triBRay').setAttribute('y2', curY.toFixed(1));
      if(t<1){ requestAnimationFrame(frame); return; }
      // Le rapporteur reste affiché (on a le temps de le lire) -- il ne disparaît qu'au moment de
      // passer à l'étape suivante, pas automatiquement dès que le tracé est terminé.
      document.querySelector('#triBSvg + .step-list .step-item[data-step="2"]').classList.add('done');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else if(triBStep===3){
    btn.disabled = true;
    // Le rapporteur disparaît maintenant, au moment de passer à l'étape suivante -- pas avant.
    document.getElementById('triBProtractor').setAttribute('opacity','0');
    document.getElementById('triBSegDF').setAttribute('opacity','1');
    document.getElementById('triBSegDF').setAttribute('x2', triB_D.x); document.getElementById('triBSegDF').setAttribute('y2', triB_D.y);
    document.getElementById('triBRulerTool').setAttribute('opacity','1');
    document.getElementById('triBPencilTool').setAttribute('opacity','1');
    const angDeg = triB_ANGLE_DEG*-1;
    triBSetRulerAt(triB_D, angDeg);
    triBSetPencilAt(triB_D.x, triB_D.y, angDeg);
    const start = performance.now(), dur=1300;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curX = triB_D.x + (triB_F.x-triB_D.x)*t, curY = triB_D.y + (triB_F.y-triB_D.y)*t;
      document.getElementById('triBSegDF').setAttribute('x2', curX.toFixed(1)); document.getElementById('triBSegDF').setAttribute('y2', curY.toFixed(1));
      triBSetPencilAt(curX, curY, angDeg);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('triBRulerTool').setAttribute('opacity','0');
      document.getElementById('triBPencilTool').setAttribute('opacity','0');
      // F est déjà repéré par la mesure elle-même : pas de repère en croix, juste le label.
      document.getElementById('triBLabelF').setAttribute('opacity','1');
      document.getElementById('triBLabelF').setAttribute('x', (triB_F.x-18).toFixed(1));
      document.getElementById('triBLabelF').setAttribute('y', (triB_F.y-4).toFixed(1));
      document.querySelector('#triBSvg + .step-list .step-item[data-step="3"]').classList.add('done');
      btn.disabled = false;
    }
    requestAnimationFrame(frame);
  } else {
    triBRenderInstant(triBStep);
    if(triBStep>=4){ btn.textContent='Terminé ✓'; btn.disabled=true; }
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
    triBReset();
  }
};

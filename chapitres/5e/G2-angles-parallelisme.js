/* ============================================================
   CHAPITRE : Angles et parallélisme (5e, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Utilise les fonctions globales angleArcPoints(vertex,p1,p2,r) et
   angleDegrees(vertex,p1,p2) déjà définies dans index.html.
   ============================================================ */

function apPt(vertex, angleDeg, r){ const a = angleDeg*Math.PI/180; return {x: vertex.x + r*Math.cos(a), y: vertex.y + r*Math.sin(a)}; }
function apWedge(vertex, p1, p2, r, color, opacity){
  const {points} = angleArcPoints(vertex, p1, p2, r);
  return `<polygon points="${vertex.x},${vertex.y} ${points}" fill="${color}" fill-opacity="${opacity===undefined?0.55:opacity}"/>`;
}
function apLabel(x, y, text, size, italic){
  return `<text x="${x}" y="${y}" font-size="${size||12}" ${italic===false?'':'font-style="italic"'} fill="#1C1B2E">${text}</text>`;
}

/* ================= Figure A : angles opposés par le sommet ================= */
function apBuildOpposesSvg(){
  const O = {x:200, y:110};
  const M = apPt(O,0,150), Mp = apPt(O,180,150);
  const N = apPt(O,-35,150), Np = apPt(O,145,150);
  const w1 = apWedge(O, M, Np, 36, '#1F3A5C');
  const w2 = apWedge(O, Mp, N, 36, '#1F3A5C');
  const w3 = apWedge(O, Np, Mp, 36, '#E35D3A');
  const w4 = apWedge(O, N, M, 36, '#E35D3A');
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Mp.x}" y1="${Mp.y}" x2="${M.x}" y2="${M.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Np.x}" y1="${Np.y}" x2="${N.x}" y2="${N.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}${w3}${w4}
    <circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(M.x+8, M.y+4, 'M')}
    ${apLabel(Mp.x-20, Mp.y+4, "M'")}
    ${apLabel(N.x-2, N.y-8, 'N')}
    ${apLabel(Np.x-18, Np.y+16, "N'")}
    ${apLabel(O.x-16, O.y+18, 'O')}
  </svg>`;
}

/* ================= Figure B : angles adjacents ================= */
function apBuildAdjacentsSvg(){
  const O = {x:190, y:190};
  const I = apPt(O,-160,110), J = apPt(O,-90,110), K = apPt(O,-50,110);
  const w1 = apWedge(O, I, J, 34, '#1F3A5C');
  const w2 = apWedge(O, J, K, 34, '#1F6B3A');
  return `<svg viewBox="0 0 320 220" style="width:100%;max-width:300px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${O.x}" y1="${O.y}" x2="${I.x}" y2="${I.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${J.x}" y2="${J.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${K.x}" y2="${K.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(I.x-14, I.y-2, 'I')}
    ${apLabel(J.x-6, J.y-8, 'J')}
    ${apLabel(K.x+6, K.y-4, 'K')}
    ${apLabel(O.x+6, O.y+16, 'O')}
  </svg>`;
}

/* ================= Figure C : angles supplémentaires ================= */
function apBuildSupplSvg(){
  const O = {x:200, y:150};
  const D = apPt(O,180,140), F = apPt(O,0,140), E = apPt(O,-115,140);
  const w1 = apWedge(O, D, E, 40, '#1F3A5C');
  const w2 = apWedge(O, E, F, 40, '#1F6B3A');
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:380px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${D.x}" y1="${D.y}" x2="${F.x}" y2="${F.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${E.x}" y2="${E.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(D.x-4, D.y-10, 'D')}
    ${apLabel(F.x-6, F.y-10, 'F')}
    ${apLabel(E.x-6, E.y+16, 'E')}
    ${apLabel(O.x-4, O.y+18, 'O')}
  </svg>`;
}

/* ================= Points communs aux figures D (définitions / exemple 1 / exemple 2 interactive) ================= */
const AP_A = {x:202, y:90}, AP_B = {x:278, y:190};
const AP_DLEFT = {x:60,y:90}, AP_DRIGHT = {x:400,y:90};
const AP_DPLEFT = {x:60,y:190}, AP_DPRIGHT = {x:400,y:190};
const AP_STOP = {x:133.6, y:0}, AP_SBOT = {x:346.4, y:280};

function apBuildDefinitionsSvg(){
  const wBleuA = apWedge(AP_A, AP_DRIGHT, AP_SBOT, 34, '#1F3A5C');
  const wBleuB = apWedge(AP_B, AP_DPLEFT, AP_STOP, 34, '#1F3A5C');
  const wVertA = apWedge(AP_A, AP_STOP, AP_DRIGHT, 34, '#1F6B3A');
  const wVertB = apWedge(AP_B, AP_STOP, AP_DPRIGHT, 34, '#1F6B3A');
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:420px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wBleuA}${wBleuB}${wVertA}${wVertB}
    <circle cx="${AP_A.x}" cy="${AP_A.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${AP_B.x}" cy="${AP_B.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(AP_DLEFT.x-2, AP_DLEFT.y-8, '(d)', 11, false)}
    ${apLabel(AP_DPLEFT.x-2, AP_DPLEFT.y-8, "(d')", 11, false)}
    ${apLabel(AP_STOP.x+6, AP_STOP.y+14, '(s)', 11, false)}
    ${apLabel(AP_A.x+8, AP_A.y-8, 'A')}
    ${apLabel(AP_B.x+8, AP_B.y+16, 'B')}
  </svg>
  <p class="hint" style="text-align:center;margin-top:6px;">En bleu : les angles <b>alternes-internes</b>. En vert : les angles <b>correspondants</b>.</p>`;
}

function apBuildExemple1Svg(){
  const wBleuA = apWedge(AP_A, AP_DRIGHT, AP_SBOT, 34, '#1F3A5C');
  const wBleuB = apWedge(AP_B, AP_DPLEFT, AP_STOP, 34, '#1F3A5C');
  const midA = angleArcPoints(AP_A, AP_DRIGHT, AP_SBOT, 50).mid;
  const midB = angleArcPoints(AP_B, AP_DPLEFT, AP_STOP, 50).mid;
  const labA = {x: AP_A.x+50*Math.cos(midA), y: AP_A.y+50*Math.sin(midA)};
  const labB = {x: AP_B.x+50*Math.cos(midB), y: AP_B.y+50*Math.sin(midB)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:420px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wBleuA}${wBleuB}
    <circle cx="${AP_A.x}" cy="${AP_A.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${AP_B.x}" cy="${AP_B.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(AP_DLEFT.x-2, AP_DLEFT.y-8, '(d)', 11, false)}
    ${apLabel(AP_DPLEFT.x-2, AP_DPLEFT.y-8, "(d')", 11, false)}
    ${apLabel(AP_A.x+8, AP_A.y-8, 'A')}
    ${apLabel(AP_B.x+8, AP_B.y+16, 'B')}
    ${apLabel(labA.x-10, labA.y+4, '47°', 12, false)}
    ${apLabel(labB.x-10, labB.y+4, '47°', 12, false)}
  </svg>`;
}

/* ================= Figure interactive : exemple 2 (droites parallèles, sécante réglable) ================= */
function apUpdateAltCorr(){
  const slider = document.getElementById('ap-secAngle');
  if(!slider) return;
  const thetaDeg = parseFloat(slider.value);
  document.getElementById('ap-secAngle-val').textContent = thetaDeg + '°';
  const theta = thetaDeg*Math.PI/180;
  const A = {x:210, y:90};
  const s = 100/Math.sin(theta);
  const B = {x: A.x + s*Math.cos(theta), y: 190};
  const k = 90;
  const Stop = {x: A.x - k*Math.cos(theta), y: A.y - k*Math.sin(theta)};
  const Sbot = {x: B.x + k*Math.cos(theta), y: B.y + k*Math.sin(theta)};
  const Dleft = {x:50,y:90}, Dright = {x:410,y:90};
  const Dpleft = {x:50,y:190}, Dpright = {x:410,y:190};

  const bleuA = apWedge(A, Dright, Sbot, 32, '#1F3A5C');
  const bleuB = apWedge(B, Dpleft, Stop, 32, '#1F3A5C');
  const vertA = apWedge(A, Stop, Dright, 32, '#1F6B3A');
  const vertB = apWedge(B, Stop, Dpright, 32, '#1F6B3A');
  const angBleu = Math.round(angleDegrees(A, Dright, Sbot));
  const angVert = Math.round(angleDegrees(A, Stop, Dright));

  const midBleuA = angleArcPoints(A, Dright, Sbot, 48).mid;
  const midBleuB = angleArcPoints(B, Dpleft, Stop, 48).mid;
  const midVertA = angleArcPoints(A, Stop, Dright, 48).mid;
  const midVertB = angleArcPoints(B, Stop, Dpright, 48).mid;
  const lBleuA = {x:A.x+48*Math.cos(midBleuA), y:A.y+48*Math.sin(midBleuA)};
  const lBleuB = {x:B.x+48*Math.cos(midBleuB), y:B.y+48*Math.sin(midBleuB)};
  const lVertA = {x:A.x+48*Math.cos(midVertA), y:A.y+48*Math.sin(midVertA)};
  const lVertB = {x:B.x+48*Math.cos(midVertB), y:B.y+48*Math.sin(midVertB)};

  document.getElementById('ap-altcorrSvg').innerHTML = `<svg viewBox="0 0 460 300" style="width:100%;max-width:420px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Dleft.x}" y1="${Dleft.y}" x2="${Dright.x}" y2="${Dright.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Dpleft.x}" y1="${Dpleft.y}" x2="${Dpright.x}" y2="${Dpright.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Stop.x}" y1="${Stop.y}" x2="${Sbot.x}" y2="${Sbot.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${bleuA}${bleuB}${vertA}${vertB}
    <circle cx="${A.x}" cy="${A.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${B.x}" cy="${B.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(Dleft.x-2, Dleft.y-10, '(d)', 11, false)}
    ${apLabel(Dpleft.x-2, Dpleft.y-10, "(d')", 11, false)}
    ${apLabel(A.x+8, A.y-8, 'A')}
    ${apLabel(B.x+8, B.y+16, 'B')}
    ${apLabel(lBleuA.x-10, lBleuA.y+4, angBleu+'°', 12, false)}
    ${apLabel(lBleuB.x-10, lBleuB.y+4, angBleu+'°', 12, false)}
    ${apLabel(lVertA.x-14, lVertA.y+4, angVert+'°', 12, false)}
    ${apLabel(lVertB.x-14, lVertB.y+4, angVert+'°', 12, false)}
  </svg>`;
  const note = document.getElementById('ap-altcorrNote');
  if(note) note.textContent = `Les droites (d) et (d') restent parallèles quel que soit l'angle de la sécante : les angles alternes-internes bleus valent toujours ${angBleu}° chacun, et les angles correspondants verts valent toujours ${angVert}° chacun.`;
}

/* ================= Figure : méthode "angles alternes-internes -> parallélisme" ================= */
function apBuildMethodeAltSvg(){
  const B = AP_A, C = AP_B;
  const A = AP_DRIGHT, D = AP_DPLEFT;
  const wB = apWedge(B, A, AP_SBOT, 34, '#1F3A5C');
  const wC = apWedge(C, AP_STOP, D, 34, '#1F3A5C');
  const midB = angleArcPoints(B, A, AP_SBOT, 50).mid;
  const midC = angleArcPoints(C, AP_STOP, D, 50).mid;
  const labB = {x: B.x+50*Math.cos(midB), y: B.y+50*Math.sin(midB)};
  const labC = {x: C.x+50*Math.cos(midC), y: C.y+50*Math.sin(midC)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wB}${wC}
    <circle cx="${B.x}" cy="${B.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${C.x}" cy="${C.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(A.x-16, A.y-8, 'A')}
    ${apLabel(B.x+8, B.y-8, 'B')}
    ${apLabel(C.x-16, C.y+18, 'C')}
    ${apLabel(D.x+6, D.y+18, 'D')}
    ${apLabel(labB.x-10, labB.y+4, '55°', 12, false)}
    ${apLabel(labC.x-10, labC.y+4, '55°', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "angles opposés par le sommet" ================= */
function apBuildMethodeOpposesSvg(){
  const O = {x:200, y:110};
  const P = apPt(O,0,150), Pp = apPt(O,180,150);
  const Q = apPt(O,-35,150), Qp = apPt(O,145,150);
  const wGiven = apWedge(O, Q, P, 36, '#1F3A5C');
  const wFind = apWedge(O, Qp, Pp, 36, '#1F3A5C');
  const midGiven = angleArcPoints(O, Q, P, 52).mid;
  const midFind = angleArcPoints(O, Qp, Pp, 52).mid;
  const labGiven = {x:O.x+52*Math.cos(midGiven), y:O.y+52*Math.sin(midGiven)};
  const labFind = {x:O.x+52*Math.cos(midFind), y:O.y+52*Math.sin(midFind)};
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${Pp.x}" y1="${Pp.y}" x2="${P.x}" y2="${P.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${Qp.x}" y1="${Qp.y}" x2="${Q.x}" y2="${Q.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wGiven}${wFind}
    <circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(P.x+8, P.y+4, 'P')}
    ${apLabel(Pp.x-20, Pp.y+4, "P'")}
    ${apLabel(Q.x-2, Q.y-8, 'Q')}
    ${apLabel(Qp.x-18, Qp.y+16, "Q'")}
    ${apLabel(O.x-16, O.y+18, 'O')}
    ${apLabel(labGiven.x-10, labGiven.y+4, '35°', 12, false)}
    ${apLabel(labFind.x-8, labFind.y+4, '?', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "alignement par angles supplémentaires" ================= */
function apBuildMethodeAlignementSvg(){
  const O = {x:200, y:150};
  const D = apPt(O,180,140), F = apPt(O,0,140), E = apPt(O,-68,140);
  const w1 = apWedge(O, D, E, 42, '#1F3A5C');
  const w2 = apWedge(O, E, F, 42, '#1F6B3A');
  const mid1 = angleArcPoints(O, D, E, 58).mid;
  const mid2 = angleArcPoints(O, E, F, 58).mid;
  const lab1 = {x:O.x+58*Math.cos(mid1), y:O.y+58*Math.sin(mid1)};
  const lab2 = {x:O.x+58*Math.cos(mid2), y:O.y+58*Math.sin(mid2)};
  return `<svg viewBox="0 0 400 220" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${D.x}" y1="${D.y}" x2="${F.x}" y2="${F.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${O.x}" y1="${O.y}" x2="${E.x}" y2="${E.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${w1}${w2}
    <circle cx="${O.x}" cy="${O.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(D.x-4, D.y-10, 'D')}
    ${apLabel(F.x-6, F.y-10, 'F')}
    ${apLabel(E.x-6, E.y-10, 'E')}
    ${apLabel(O.x-4, O.y+18, 'O')}
    ${apLabel(lab1.x-14, lab1.y, '112°', 12, false)}
    ${apLabel(lab2.x-10, lab2.y, '68°', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "somme des angles d'un triangle" ================= */
function apParallelTick(x,y){
  return `<path d="M ${x-6} ${y-6} L ${x+5} ${y} L ${x-6} ${y+6}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>`;
}

/* ================= Figure : méthode "angles correspondants -> parallélisme" ================= */
function apBuildMethodeCorrespParallelSvg(){
  const B = AP_A, C = AP_B;
  const E = AP_STOP, A = AP_DRIGHT, D = AP_DPRIGHT;
  const wB = apWedge(B, E, A, 34, '#1F6B3A');
  const wC = apWedge(C, E, D, 34, '#1F6B3A');
  const midB = angleArcPoints(B, E, A, 52).mid;
  const midC = angleArcPoints(C, E, D, 52).mid;
  const labB = {x:B.x+52*Math.cos(midB), y:B.y+52*Math.sin(midB)};
  const labC = {x:C.x+52*Math.cos(midC), y:C.y+52*Math.sin(midC)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wB}${wC}
    <circle cx="${B.x}" cy="${B.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${C.x}" cy="${C.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(E.x+6, E.y+14, 'E')}
    ${apLabel(B.x+8, B.y-8, 'B')}
    ${apLabel(C.x-16, C.y+18, 'C')}
    ${apLabel(A.x-16, A.y-8, 'A')}
    ${apLabel(D.x-18, D.y+18, 'D')}
    ${apLabel(labB.x-14, labB.y+4, '127°', 12, false)}
    ${apLabel(labC.x-14, labC.y+4, '127°', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "égalité par correspondants" (droites déjà parallèles) ================= */
function apBuildMethodeCorrespEgaliteSvg(){
  const B = AP_A, C = AP_B;
  const E = AP_STOP, A = AP_DRIGHT, D = AP_DPRIGHT;
  const wB = apWedge(B, E, A, 34, '#1F6B3A');
  const wC = apWedge(C, E, D, 34, '#1F6B3A');
  const midB = angleArcPoints(B, E, A, 52).mid;
  const midC = angleArcPoints(C, E, D, 52).mid;
  const labB = {x:B.x+52*Math.cos(midB), y:B.y+52*Math.sin(midB)};
  const labC = {x:C.x+52*Math.cos(midC), y:C.y+52*Math.sin(midC)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${apParallelTick(230,90)}${apParallelTick(230,190)}
    ${wB}${wC}
    <circle cx="${B.x}" cy="${B.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${C.x}" cy="${C.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(E.x+6, E.y+14, 'E')}
    ${apLabel(B.x+8, B.y-8, 'B')}
    ${apLabel(C.x-16, C.y+18, 'C')}
    ${apLabel(A.x-16, A.y-8, 'A')}
    ${apLabel(D.x-18, D.y+18, 'D')}
    ${apLabel(labB.x-14, labB.y+4, '127°', 12, false)}
    ${apLabel(labC.x-14, labC.y+4, '?', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "égalité par alternes-internes" (droites déjà parallèles) ================= */
function apBuildMethodeAltEgaliteSvg(){
  const B = AP_A, C = AP_B;
  const A = AP_DRIGHT, D = AP_DPLEFT;
  const wB = apWedge(B, A, AP_SBOT, 34, '#1F3A5C');
  const wC = apWedge(C, AP_STOP, D, 34, '#1F3A5C');
  const midB = angleArcPoints(B, A, AP_SBOT, 50).mid;
  const midC = angleArcPoints(C, AP_STOP, D, 50).mid;
  const labB = {x:B.x+50*Math.cos(midB), y:B.y+50*Math.sin(midB)};
  const labC = {x:C.x+50*Math.cos(midC), y:C.y+50*Math.sin(midC)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${apParallelTick(230,90)}${apParallelTick(230,190)}
    ${wB}${wC}
    <circle cx="${B.x}" cy="${B.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${C.x}" cy="${C.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(A.x-16, A.y-8, 'A')}
    ${apLabel(B.x+8, B.y-8, 'B')}
    ${apLabel(C.x-16, C.y+18, 'C')}
    ${apLabel(D.x+6, D.y+18, 'D')}
    ${apLabel(labB.x-14, labB.y+4, '55°', 12, false)}
    ${apLabel(labC.x-10, labC.y+4, '?', 12, false)}
  </svg>`;
}

function apBuildMethodeTriangleSvg(){
  const R={x:150,y:30}, S={x:40,y:200}, T={x:340,y:200};
  const wR = apWedge(R, S, T, 26, '#9E1F5E');
  const wS = apWedge(S, R, T, 26, '#1F6B3A');
  const wT = apWedge(T, S, R, 26, '#1F3A5C');
  const midS = angleArcPoints(S, R, T, 40).mid;
  const midT = angleArcPoints(T, S, R, 40).mid;
  const labS = {x:S.x+40*Math.cos(midS), y:S.y+40*Math.sin(midS)};
  const labT = {x:T.x+40*Math.cos(midT), y:T.y+40*Math.sin(midT)};
  return `<svg viewBox="0 0 380 230" style="width:100%;max-width:340px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${R.x},${R.y} ${S.x},${S.y} ${T.x},${T.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wR}${wS}${wT}
    ${apLabel(R.x-4, R.y-8, 'R')}
    ${apLabel(S.x-16, S.y+10, 'S')}
    ${apLabel(T.x+8, T.y+10, 'T')}
    ${apLabel(labS.x-14, labS.y+4, '54°', 12, false)}
    ${apLabel(labT.x-6, labT.y+4, '71°', 12, false)}
    ${apLabel(R.x-6, R.y+30, '?', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "angles correspondants" (M,N,K,L,P) ================= */
function apBuildMethodeCorrespondantsSvg(){
  const M = AP_A, N = AP_B;
  const K = AP_DRIGHT, P = AP_DPRIGHT, L = AP_STOP;
  const wM = apWedge(M, K, L, 34, '#1F6B3A');
  const wN = apWedge(N, M, P, 34, '#1F6B3A');
  const midM = angleArcPoints(M, K, L, 50).mid;
  const midN = angleArcPoints(N, M, P, 50).mid;
  const labM = {x: M.x+50*Math.cos(midM), y: M.y+50*Math.sin(midM)};
  const labN = {x: N.x+50*Math.cos(midN), y: N.y+50*Math.sin(midN)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wM}${wN}
    <circle cx="${M.x}" cy="${M.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${N.x}" cy="${N.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(L.x+6, L.y+14, 'L', 12, false)}
    ${apLabel(K.x-16, K.y-8, 'K')}
    ${apLabel(M.x+8, M.y-8, 'M')}
    ${apLabel(N.x-16, N.y+18, 'N')}
    ${apLabel(P.x-18, P.y+18, 'P')}
    ${apLabel(labM.x-10, labM.y+4, '58°', 12, false)}
    ${apLabel(labN.x-10, labN.y+4, '58°', 12, false)}
  </svg>`;
}

/* ================= Figure : méthode "correspondants, droites déjà parallèles" (M6, points M/K/L/N/P) ================= */
function apBuildMethodeCorrDirectSvg(){
  const M = AP_A, N = AP_B;
  const K = AP_DRIGHT, P = AP_DPRIGHT, L = AP_STOP;
  const wM = apWedge(M, K, L, 34, '#1F6B3A');
  const wN = apWedge(N, M, P, 34, '#1F6B3A');
  const midM = angleArcPoints(M, K, L, 50).mid;
  const midN = angleArcPoints(N, M, P, 50).mid;
  const labM = {x: M.x+50*Math.cos(midM), y: M.y+50*Math.sin(midM)};
  const labN = {x: N.x+50*Math.cos(midN), y: N.y+50*Math.sin(midN)};
  return `<svg viewBox="0 0 460 300" style="width:100%;max-width:400px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line x1="${AP_DLEFT.x}" y1="${AP_DLEFT.y}" x2="${AP_DRIGHT.x}" y2="${AP_DRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_DPLEFT.x}" y1="${AP_DPLEFT.y}" x2="${AP_DPRIGHT.x}" y2="${AP_DPRIGHT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${AP_STOP.x}" y1="${AP_STOP.y}" x2="${AP_SBOT.x}" y2="${AP_SBOT.y}" stroke="#1C1B2E" stroke-width="1.6"/>
    ${apParallelTick(230,90)}${apParallelTick(230,190)}
    ${wM}${wN}
    <circle cx="${M.x}" cy="${M.y}" r="2.6" fill="#1C1B2E"/>
    <circle cx="${N.x}" cy="${N.y}" r="2.6" fill="#1C1B2E"/>
    ${apLabel(L.x+6, L.y+14, 'L', 12, false)}
    ${apLabel(K.x-16, K.y-8, 'K')}
    ${apLabel(M.x+8, M.y-8, 'M')}
    ${apLabel(N.x-16, N.y+18, 'N')}
    ${apLabel(P.x-18, P.y+18, 'P')}
    ${apLabel(labM.x-10, labM.y+4, '58°', 12, false)}
    ${apLabel(labN.x-10, labN.y+4, '?', 12, false)}
  </svg>`;
}

/* ================= Figure : somme des angles d'un triangle (triangle non isocèle, IJ ≠ IK ≠ JK) ================= */
const AP_TRI_I = {x:150,y:30}, AP_TRI_J = {x:40,y:200}, AP_TRI_K = {x:340,y:200};
function apBuildTriangleSvg(){
  const I=AP_TRI_I, J=AP_TRI_J, K=AP_TRI_K;
  const wI = apWedge(I, J, K, 26, '#9E1F5E');
  const wJ = apWedge(J, I, K, 26, '#1F6B3A');
  const wK = apWedge(K, J, I, 26, '#1F3A5C');
  return `<svg viewBox="0 0 380 230" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${I.x},${I.y} ${J.x},${J.y} ${K.x},${K.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wI}${wJ}${wK}
    ${apLabel(I.x-4, I.y-8, 'I')}
    ${apLabel(J.x-16, J.y+10, 'J')}
    ${apLabel(K.x+8, K.y+10, 'K')}
  </svg>`;
}

/* ================= Démonstration pas à pas : somme des angles d'un triangle ================= */
const AP_TRI_STEPS = [
  {note:"On trace la droite parallèle à (JK) qui passe par I."},
  {note:"On repère les angles alternes-internes égaux : à gauche de I, l'angle vert a la même mesure que l'angle IJK ; à droite de I, l'angle bleu a la même mesure que l'angle IKJ."},
  {note:"Comme la droite tracée est une droite (elle forme un angle plat en I), la somme des trois angles autour de I sur cette droite vaut 180°. Donc IJK + JIK + IKJ = 180°."},
];
let apTriIdx = 0;
function apRenderTriDemo(){
  const el = document.getElementById('ap-triDemoSvg');
  if(!el) return;
  const I=AP_TRI_I, J=AP_TRI_J, K=AP_TRI_K;
  const L = {x: I.x-140, y: I.y}, M = {x: I.x+140, y: I.y};
  const wI = apWedge(I, J, K, 26, '#9E1F5E');
  const wJ = apWedge(J, I, K, 26, '#1F6B3A');
  const wK = apWedge(K, J, I, 26, '#1F3A5C');
  let extra = '';
  if(apTriIdx>=1){
    extra += `<line x1="${L.x}" y1="${L.y}" x2="${M.x}" y2="${M.y}" stroke="#5B6B78" stroke-width="1.4" stroke-dasharray="5,4"/>`;
    extra += apLabel(L.x-16, L.y+4, 'L', 12, false) + apLabel(M.x+6, M.y+4, 'M', 12, false);
  }
  if(apTriIdx>=2){
    extra += apWedge(I, L, J, 36, '#1F6B3A', 0.55);
    extra += apWedge(I, K, M, 36, '#1F3A5C', 0.55);
  }
  const svg = `<svg id="ap-tri-svg" viewBox="0 0 380 230" style="width:100%;max-width:360px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <polygon points="${I.x},${I.y} ${J.x},${J.y} ${K.x},${K.y}" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>
    ${wI}${wJ}${wK}
    ${extra}
    ${apLabel(I.x-4, I.y-8, 'I')}
    ${apLabel(J.x-16, J.y+10, 'J')}
    ${apLabel(K.x+8, K.y+10, 'K')}
  </svg>`;
  el.innerHTML = svg + `<div class="step-note">Étape ${apTriIdx+1} : ${AP_TRI_STEPS[apTriIdx].note}</div>`;
}
const apTriDemo = {
  next(){ if(apTriIdx<AP_TRI_STEPS.length-1) apTriIdx++; apRenderTriDemo(); },
  reset(){ apTriIdx=0; apRenderTriDemo(); },
};
registerGeoStepDemo('ap-tri-svg', { steps:()=>AP_TRI_STEPS, getIdx:()=>apTriIdx, goto:(i)=>{ apTriIdx=i; apRenderTriDemo(); } });

/* ================= COURS ================= */
document.getElementById('cours-demo-angles-parallelisme-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Paires d'angles particuliers</h3></div>

<p class="example-title" style="margin-top:0;">A. Angles opposés par le sommet</p>
<span class="prop-badge">Définition</span>
<div class="def-box">
  Deux angles sont <b>opposés par le sommet</b> lorsqu'ils ont un sommet commun et que leurs côtés sont dans le prolongement l'un de l'autre.
</div>
<div class="figure-wrap">${apBuildOpposesSvg()}</div>
<p style="margin:10px 0 4px;">Les angles <span class="tex">\\widehat{MON}</span> et <span class="tex">\\widehat{M'ON'}</span> ont pour sommet commun O, et leurs côtés sont dans le prolongement l'un de l'autre.</p>
<p style="margin:4px 0 12px;">Ils sont donc <b>opposés par le sommet</b>, tout comme les angles <span class="tex">\\widehat{MON'}</span> et <span class="tex">\\widehat{M'ON}</span>.</p>
<span class="prop-badge">Propriété</span>
<div class="def-box">Deux angles <b>opposés par le sommet</b> ont la même mesure.</div>
<p class="example-title">Exemple :</p>
<p style="margin:4px 0 12px;">Sur la figure ci-dessus, si <span class="tex">\\widehat{MON} = 35°</span>, alors <span class="tex">\\widehat{M'ON'} = 35°</span> également. De plus, <span class="tex">\\widehat{MON'} = \\widehat{M'ON} = 145°</span>.</p>

<p class="example-title" style="margin-top:20px;">B. Angles adjacents</p>
<span class="prop-badge">Définition</span>
<div class="def-box">Deux angles sont <b>adjacents</b> lorsqu'ils ont un sommet commun, un côté commun, et qu'ils sont situés de part et d'autre de ce côté commun.</div>
<div class="figure-wrap">${apBuildAdjacentsSvg()}</div>
<p style="margin:10px 0 12px;">Les angles <span class="tex">\\widehat{IOJ}</span> et <span class="tex">\\widehat{JOK}</span> ont pour sommet commun O, pour côté commun la demi-droite [OJ), et sont placés de part et d'autre de [OJ). Ils sont donc <b>adjacents</b>.</p>

<p class="example-title" style="margin-top:20px;">C. Angles supplémentaires</p>
<span class="prop-badge">Définition</span>
<div class="def-box">Deux angles sont <b>supplémentaires</b> lorsque la somme de leurs mesures est égale à 180°.</div>
<div class="figure-wrap">${apBuildSupplSvg()}</div>
<p style="margin:10px 0 4px;">Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> partagent un angle plat : <span class="tex">\\widehat{DOE} = 65°</span> et <span class="tex">\\widehat{EOF} = 115°</span>.</p>
<p style="margin:4px 0 12px;">Or, <span class="tex">65° + 115° = 180°</span>. Ils sont donc <b>supplémentaires</b>.</p>
<div class="redaction-note">Remarque : deux angles supplémentaires et adjacents forment un angle plat. Cette propriété peut donc être utilisée pour montrer que des points sont alignés.</div>

<div class="lesson-header"><span class="num">2</span><h3>Angles correspondants, angles alternes-internes</h3></div>
<span class="prop-badge">Définitions</span>
<div class="def-box">
  Deux droites (d) et (d') sont coupées par une sécante (s) en deux points A et B. Cela forme huit angles.<br>
  Deux de ces angles sont <b>alternes-internes</b> lorsqu'ils sont situés entre (d) et (d'), de part et d'autre de la sécante (s).<br>
  Deux de ces angles sont <b>correspondants</b> lorsqu'ils sont situés du même côté de la sécante (s), l'un en A et l'autre en B, à la même place par rapport à leur droite.
</div>
<div class="figure-wrap">${apBuildDefinitionsSvg()}</div>

<span class="prop-badge">Propriétés 1</span>
<div class="def-box">
  <b>Si</b> deux angles alternes-internes ont la même mesure, <b>alors</b> les deux droites coupées par la sécante sont parallèles.<br>
  <b>Si</b> deux angles correspondants ont la même mesure, <b>alors</b> les deux droites coupées par la sécante sont parallèles.
</div>
<p class="example-title">Exemple 1 :</p>
<div class="figure-wrap">${apBuildExemple1Svg()}</div>
<p style="margin:10px 0 4px;">Les angles bleus en A et en B sont alternes-internes, déterminés par la sécante (AB) et les droites (d) et (d').</p>
<p style="margin:4px 0 4px;">Le codage indique qu'ils ont la même mesure : 47° chacun.</p>
<p style="margin:4px 0 12px;">Donc les droites (d) et (d') sont <b>parallèles</b>.</p>

<span class="prop-badge">Propriétés 2</span>
<div class="def-box">
  <b>Si</b> deux angles alternes-internes sont déterminés par des droites parallèles, <b>alors</b> ils ont la même mesure.<br>
  <b>Si</b> deux angles correspondants sont déterminés par des droites parallèles, <b>alors</b> ils ont la même mesure.
</div>
<p class="example-title">Exemple 2 : les droites (d) et (d') sont parallèles. Déplacez le curseur pour incliner la sécante.</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Déplacez le curseur : la sécante s'incline, mais les angles de même couleur restent toujours égaux entre eux.</p>
<div class="figure-wrap">
  <div id="ap-altcorrSvg"></div>
  <div class="figure-toolbar" style="justify-content:center;">
    <label class="hint" style="margin:0;">Angle de la sécante : <input type="range" id="ap-secAngle" min="35" max="145" value="70" oninput="apUpdateAltCorr()"> <span id="ap-secAngle-val">70°</span></label>
  </div>
  <p class="hint" id="ap-altcorrNote" style="text-align:center;margin-top:8px;"></p>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Mesure des angles dans un triangle</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La somme des mesures des angles d'un triangle est égale à 180°.</div>
<div class="figure-wrap">${apBuildTriangleSvg()}</div>
<p style="text-align:center;margin:8px 0 12px;"><span class="tex">\\widehat{IJK} + \\widehat{JKI} + \\widehat{KIJ} = 180°</span></p>

<p class="example-title" style="margin-top:20px;">Démonstration</p>
<p class="interaction-hint" style="margin:4px 0 8px;">Cliquez sur "Étape suivante" pour dérouler la démonstration (le triangle n'est volontairement pas isocèle).</p>
<div class="figure-wrap">
  <div id="ap-triDemoSvg"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apTriDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apTriDemo.reset()">Recommencer</button>
  </div>
</div>

<p class="example-title" style="margin-top:20px;">Exemple : dans le triangle IJK, <span class="tex">\\widehat{IJK} = 48°</span> et <span class="tex">\\widehat{JKI} = 67°</span>. Quelle est la mesure de l'angle <span class="tex">\\widehat{KIJ}</span> ?</p>
<p style="margin:4px 0 4px;">On sait que <span class="tex">\\widehat{IJK} + \\widehat{JKI} + \\widehat{KIJ} = 180°</span>.</p>
<p style="margin:4px 0 12px;">Donc <span class="tex">\\widehat{KIJ} = 180° - (48° + 67°) = 180° - 115° = 65°</span>.</p>
`;

/* ================= METHODE ================= */
document.getElementById('methode-demo-angles-parallelisme-5e').innerHTML = `
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : justifier que deux droites sont parallèles à l'aide d'angles alternes-internes</h4></div>
<div class="figure-wrap">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeAltSvg()}</div>
  <div class="step-display" id="ap-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : calculer une mesure d'angle à l'aide des angles opposés par le sommet</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeOpposesSvg()}</div>
  <div class="step-display" id="ap-methodeOpposesDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeOpposesDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeOpposesDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : justifier que des points sont alignés à l'aide d'angles supplémentaires</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeAlignementSvg()}</div>
  <div class="step-display" id="ap-methodeAlignementDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeAlignementDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeAlignementDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer une mesure d'angle inconnue dans un triangle</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeTriangleSvg()}</div>
  <div class="step-display" id="ap-methodeTriangleDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeTriangleDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeTriangleDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : justifier que deux droites sont parallèles à l'aide d'angles correspondants</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeCorrespondantsSvg()}</div>
  <div class="step-display" id="ap-methodeCorrDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeCorrDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeCorrDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 6 : deux droites parallèles et une sécante, cas des angles correspondants</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeCorrDirectSvg()}</div>
  <div class="step-display" id="ap-methodeCorrDirectDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeCorrDirectDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeCorrDirectDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 7 : deux droites parallèles et une sécante, cas des angles alternes-internes</h4></div>
<div class="figure-wrap" style="margin-top:24px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="figure-wrap">${apBuildMethodeAltEgaliteSvg()}</div>
  <div class="step-display" id="ap-methodeAltDirectDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="apMethodeAltDirectDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="apMethodeAltDirectDemo.reset()">Recommencer</button>
  </div>
</div>
`;

/* ================= EXOS ================= */
document.getElementById('exos-demo-angles-parallelisme-5e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. La méthode est toujours la même, en trois temps : <b>ce que je sais</b> (les constats), puis <span style="color:var(--accent-orange);font-weight:700;">Or,</span> suivi de la propriété que l'on va utiliser, puis <span style="color:var(--accent);font-weight:700;">Donc</span>, suivi de la conclusion.</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier que deux droites sont parallèles »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Les angles <span class="tex">\\widehat{ABC}</span> et <span class="tex">\\widehat{BCD}</span> sont alternes-internes, déterminés par la sécante (BC) et les droites (AB) et (CD).</span><span class="we-comment">Ce que je sais : on identifie la configuration.</span></div>
    <div class="we-row"><span class="we-expr">De plus, <span class="tex">\\widehat{ABC} = \\widehat{BCD} = 63°</span>.</span><span class="we-comment">Ce que je sais : on relève les mesures égales.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent-orange);font-weight:700;">Or,</span> si deux angles alternes-internes ont la même mesure, alors les deux droites coupées par la sécante sont parallèles.</span><span class="we-comment">On énonce la propriété.</span></div>
    <div class="we-row"><span class="we-expr"><span style="color:var(--accent);font-weight:700;">Donc</span> les droites (AB) et (CD) sont parallèles.</span><span class="we-comment">Conclusion, en appliquant la propriété.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Deux droites se coupent en un point O et forment quatre angles. L'un d'eux mesure 72°. Donne les mesures des trois autres angles.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> forment un angle plat. Sachant que <span class="tex">\\widehat{DOE} = 110°</span>, calcule la mesure de l'angle <span class="tex">\\widehat{EOF}</span>.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Dans un triangle RST, <span class="tex">\\widehat{RST} = 52°</span> et <span class="tex">\\widehat{STR} = 79°</span>. Calcule la mesure de l'angle <span class="tex">\\widehat{SRT}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Les droites (AB) et (CD) sont parallèles et coupées par la sécante (BC). L'angle <span class="tex">\\widehat{ABC}</span>, alterne-interne avec l'angle <span class="tex">\\widehat{BCD}</span>, mesure 58°. Quelle est la mesure de l'angle <span class="tex">\\widehat{BCD}</span> ? Rédige en justifiant.
  </div>
</div>
`;

/* ================= Méthode animée : pas à pas ================= */
const AP_METHODE_STEPS = [
  {expr:"Les droites (AB) et (CD) sont coupées par la sécante (BC).", note:"Ce que je sais : on repère les deux droites concernées et la sécante qui les coupe."},
  {expr:'<span class="tex">\\widehat{ABC}</span> et <span class="tex">\\widehat{BCD}</span> sont alternes-internes.', note:"Ce que je sais : on identifie les deux angles alternes-internes déterminés par cette configuration."},
  {expr:'De plus, <span class="tex">\\widehat{ABC} = \\widehat{BCD} = 55°</span>.', note:"Ce que je sais : on relève que ces deux angles ont la même mesure (donnée dans l'énoncé ou par codage sur la figure)."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> si deux angles alternes-internes ont la même mesure, alors les deux droites coupées par la sécante sont parallèles.', note:"On énonce la propriété qui va permettre de conclure."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> les droites (AB) et (CD) sont parallèles.', note:"Conclusion, en appliquant la propriété énoncée juste avant."},
];
const apMethodeDemo = makeStepDemo(AP_METHODE_STEPS, 'ap-methodeDisplay');

const AP_METHODE_OPPOSES_STEPS = [
  {expr:'Les angles <span class="tex">\\widehat{POQ}</span> et <span class="tex">\\widehat{P\'OQ\'}</span> sont opposés par le sommet.', note:"Ce que je sais : on repère deux angles opposés par le sommet."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles opposés par le sommet ont la même mesure.', note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span>, comme <span class="tex">\\widehat{POQ} = 35°</span>, on a <span class="tex">\\widehat{P\'OQ\'} = 35°</span>.', note:"Conclusion."},
];
const apMethodeOpposesDemo = makeStepDemo(AP_METHODE_OPPOSES_STEPS, 'ap-methodeOpposesDisplay');

const AP_METHODE_ALIGNEMENT_STEPS = [
  {expr:'Les angles adjacents <span class="tex">\\widehat{DOE}</span> et <span class="tex">\\widehat{EOF}</span> sont tels que <span class="tex">\\widehat{DOE} = 112°</span> et <span class="tex">\\widehat{EOF} = 68°</span>.', note:"Ce que je sais."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> <span class="tex">112° + 68° = 180°</span>, donc les angles DOE et EOF sont supplémentaires.', note:"On calcule la somme des deux mesures."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> deux angles adjacents et supplémentaires forment un angle plat.', note:"On énonce la propriété (remarque du cours)."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> les points D, O et F sont alignés.', note:"Conclusion."},
];
const apMethodeAlignementDemo = makeStepDemo(AP_METHODE_ALIGNEMENT_STEPS, 'ap-methodeAlignementDisplay');

const AP_METHODE_TRIANGLE_STEPS = [
  {expr:'Dans le triangle RST, on sait que <span class="tex">\\widehat{RST} = 54°</span> et <span class="tex">\\widehat{STR} = 71°</span>.', note:"Ce que je sais."},
  {expr:"<span style=\"color:var(--accent-orange);font-weight:700;\">Or,</span> la somme des mesures des angles d'un triangle est égale à 180°.", note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> <span class="tex">\\widehat{SRT} = 180° - (54° + 71°) = 180° - 125° = 55°</span>.', note:"Conclusion : on calcule la mesure manquante."},
];
const apMethodeTriangleDemo = makeStepDemo(AP_METHODE_TRIANGLE_STEPS, 'ap-methodeTriangleDisplay');

const AP_METHODE_CORR_STEPS = [
  {expr:'Les droites (MK) et (NP) sont coupées par la sécante (MN).', note:"Ce que je sais : on repère les deux droites concernées et la sécante qui les coupe."},
  {expr:'Les angles <span class="tex">\\widehat{KML}</span> et <span class="tex">\\widehat{MNP}</span> sont correspondants.', note:"On identifie les deux angles correspondants déterminés par cette configuration."},
  {expr:'De plus, <span class="tex">\\widehat{KML} = \\widehat{MNP} = 58°</span>.', note:"On relève que ces deux angles ont la même mesure (donnée dans l'énoncé ou par codage sur la figure)."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> si deux angles correspondants ont la même mesure, alors les deux droites coupées par la sécante sont parallèles.', note:"On énonce la propriété qui va permettre de conclure."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span> les droites (MK) et (NP) sont parallèles.', note:"Conclusion, en appliquant la propriété énoncée juste avant."},
];
const apMethodeCorrDemo = makeStepDemo(AP_METHODE_CORR_STEPS, 'ap-methodeCorrDisplay');

const AP_METHODE_CORR_DIRECT_STEPS = [
  {expr:'Les droites (MK) et (NP) sont parallèles, coupées par la sécante (MN).', note:"Ce que je sais."},
  {expr:'Les angles <span class="tex">\\widehat{KML}</span> et <span class="tex">\\widehat{MNP}</span> sont correspondants.', note:"On identifie la configuration."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> si deux angles correspondants sont déterminés par des droites parallèles, alors ils ont la même mesure.', note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span>, comme <span class="tex">\\widehat{KML} = 58°</span>, on a <span class="tex">\\widehat{MNP} = 58°</span>.', note:"Conclusion."},
];
const apMethodeCorrDirectDemo = makeStepDemo(AP_METHODE_CORR_DIRECT_STEPS, 'ap-methodeCorrDirectDisplay');

const AP_METHODE_ALT_DIRECT_STEPS = [
  {expr:'Les droites (AB) et (CD) sont parallèles, coupées par la sécante (BC).', note:"Ce que je sais."},
  {expr:'Les angles <span class="tex">\\widehat{ABC}</span> et <span class="tex">\\widehat{BCD}</span> sont alternes-internes.', note:"On identifie la configuration."},
  {expr:'<span style="color:var(--accent-orange);font-weight:700;">Or,</span> si deux angles alternes-internes sont déterminés par des droites parallèles, alors ils ont la même mesure.', note:"On énonce la propriété."},
  {expr:'<span style="color:var(--accent);font-weight:700;">Donc</span>, comme <span class="tex">\\widehat{ABC} = 55°</span>, on a <span class="tex">\\widehat{BCD} = 55°</span>.', note:"Conclusion."},
];
const apMethodeAltDirectDemo = makeStepDemo(AP_METHODE_ALT_DIRECT_STEPS, 'ap-methodeAltDirectDisplay');

DEMO_REGISTRY['Angles et parallélisme'] = {
  cours:'cours-demo-angles-parallelisme-5e', methode:'methode-demo-angles-parallelisme-5e', exos:'exos-demo-angles-parallelisme-5e',
  init:()=>{
    apUpdateAltCorr();
    apTriDemo.reset();
    apMethodeDemo.reset();
    apMethodeOpposesDemo.reset();
    apMethodeAlignementDemo.reset();
    apMethodeTriangleDemo.reset();
    apMethodeCorrDemo.reset();
    apMethodeCorrDirectDemo.reset();
    apMethodeAltDirectDemo.reset();
    renderStaticMath(document.getElementById('cours-demo-angles-parallelisme-5e'));
    renderStaticMath(document.getElementById('exos-demo-angles-parallelisme-5e'));
    injectCourseAddButtons(document.getElementById('cours-demo-angles-parallelisme-5e')); injectCourseAddButtons(document.getElementById('methode-demo-angles-parallelisme-5e'));
  }
};

DEMO_QUIZZES['Angles et parallélisme'] = [
  {q:"Deux angles opposés par le sommet ont...",
   opts:["La même mesure","Des mesures supplémentaires","Toujours un côté commun"], correct:0},
  {q:"Deux angles adjacents ont nécessairement...",
   opts:["Un sommet commun et un côté commun, situés de part et d'autre de ce côté","La même mesure","Une somme de 180°"], correct:0},
  {q:"Deux angles supplémentaires ont une somme de mesures égale à...",
   opts:["90°","180°","360°"], correct:1},
  {q:"Si deux angles alternes-internes ont la même mesure, alors...",
   opts:["Les deux droites coupées par la sécante sont parallèles","Les deux droites coupées par la sécante sont perpendiculaires","Le triangle formé est isocèle"], correct:0},
  {q:"La somme des mesures des angles d'un triangle est égale à...",
   opts:["90°","180°","360°"], correct:1},
];

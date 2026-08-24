/* ============================================================
   CHAPITRE : Propriétés des triangles (6e, G6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   §1 Somme des angles d'un triangle (180°) : figure générique avec
   les 3 angles codés (une couleur par angle), démonstration par
   tracé de la parallèle à un côté passant par le sommet opposé
   (reconstitution d'un angle plat), puis exemple numérique (angle
   manquant) avec un modèle de rédaction.
   §2 Cercle circonscrit à un triangle : propriété des médiatrices
   concourantes, figure vérifiée numériquement (OA=OB=OC).

   Toutes les coordonnées de figures ont été calculées et vérifiées
   (angles, distances) avant intégration -- voir calculs en commentaire
   à côté des tableaux de coordonnées.

   Méthode (construction du cercle circonscrit à la règle et au
   compas) et histoire laissées en placeholder pour une prochaine
   session, comme pour D1/D2.
   ============================================================ */

document.getElementById('cours-demo-proprietes-triangles').innerHTML = `

<div class="lesson-header"><span class="num">1</span><h3>Somme des angles d'un triangle</h3></div>

<span class="prop-badge">Propriété</span>
<div class="def-box">La somme des mesures des angles d'un triangle est égale à <b>180°</b>, soit un <b>angle plat</b>.</div>

<p class="example-title" style="margin-top:0;">Exemple :</p>
<div class="figure-wrap" style="max-width:300px;margin:12px auto;">
  <svg viewBox="0 0 240 200" style="width:100%;display:block;">
    <line x1="40" y1="160" x2="200" y2="160" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="200" y1="160" x2="130" y2="50" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="130" y1="50" x2="40" y2="160" stroke="#1C1B2E" stroke-width="1.8"/>
    <path d="M 66.0 160.0 A 26 26 0 0 0 56.5 139.9" fill="none" stroke="#E35D3A" stroke-width="2"/>
    <path d="M 174.0 160.0 A 26 26 0 0 1 186.0 138.1" fill="none" stroke="#2EA8C9" stroke-width="2"/>
    <path d="M 113.5 70.1 A 26 26 0 0 0 144.0 71.9" fill="none" stroke="#F8AF23" stroke-width="2"/>
    <text x="24" y="172" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">A</text>
    <text x="206" y="172" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">B</text>
    <text x="126" y="40" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">C</text>
  </svg>
</div>
<p style="margin:4px 0 0;">Dans le triangle ABC : <span class="tex">\\widehat{BAC} + \\widehat{ABC} + \\widehat{ACB} = 180°</span>.</p>

<p class="example-title" style="margin-top:26px;">Pourquoi cette propriété est-elle vraie ?</p>
<p class="hint" style="margin:6px 0 12px;">On trace la droite (d), parallèle à (AB), passant par C.</p>
<div class="figure-wrap" style="max-width:300px;margin:12px auto;">
  <svg viewBox="0 0 240 200" style="width:100%;display:block;">
    <line x1="40" y1="50" x2="220" y2="50" stroke="#9CA3AF" stroke-width="1.4" stroke-dasharray="4 4"/>
    <line x1="40" y1="160" x2="200" y2="160" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="200" y1="160" x2="130" y2="50" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="130" y1="50" x2="40" y2="160" stroke="#1C1B2E" stroke-width="1.8"/>
    <path d="M 66.0 160.0 A 26 26 0 0 0 56.5 139.9" fill="none" stroke="#E35D3A" stroke-width="2"/>
    <path d="M 174.0 160.0 A 26 26 0 0 1 186.0 138.1" fill="none" stroke="#2EA8C9" stroke-width="2"/>
    <path d="M 108.0 50.0 A 22 22 0 0 0 116.1 67.0" fill="none" stroke="#E35D3A" stroke-width="2"/>
    <path d="M 116.1 67.0 A 22 22 0 0 0 141.8 68.6" fill="none" stroke="#F8AF23" stroke-width="2"/>
    <path d="M 141.8 68.6 A 22 22 0 0 0 152.0 50.0" fill="none" stroke="#2EA8C9" stroke-width="2"/>
    <text x="24" y="172" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">A</text>
    <text x="206" y="172" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">B</text>
    <text x="126" y="40" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">C</text>
    <text x="14" y="44" font-family="Space Grotesk" font-size="13" fill="#6B7A8C" font-style="italic">(d)</text>
  </svg>
</div>
<p style="margin:4px 0 0;">Comme (d) est parallèle à (AB), les trois angles marqués en <b>C</b> (rouge, jaune, bleu) se superposent exactement aux angles <span class="tex">\\widehat{BAC}</span> (rouge), <span class="tex">\\widehat{ACB}</span> (jaune) et <span class="tex">\\widehat{ABC}</span> (bleu) du triangle. Or ces trois angles, mis bout à bout en <b>C</b>, reconstituent un <b>angle plat</b> : ils mesurent donc en tout <b>180°</b>.</p>

<p class="example-title" style="margin-top:26px;">Exemple : angle manquant</p>
<p style="margin:4px 0 10px;">Dans le triangle HJK, <span class="tex">\\widehat{JHK} = 48°</span> et <span class="tex">\\widehat{HJK} = 63°</span>. Quelle est la mesure de l'angle <span class="tex">\\widehat{HKJ}</span> ?</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 240 200" style="width:100%;display:block;">
    <line x1="40" y1="170" x2="220" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="220" y1="170" x2="155.0" y2="42.3" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="155.0" y1="42.3" x2="40" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <path d="M 66.0 170.0 A 26 26 0 0 0 57.4 150.7" fill="none" stroke="#E35D3A" stroke-width="2"/>
    <path d="M 194.0 170.0 A 26 26 0 0 1 208.2 146.8" fill="none" stroke="#2EA8C9" stroke-width="2"/>
    <text x="24" y="182" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">H</text>
    <text x="226" y="182" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">J</text>
    <text x="152" y="30" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">K</text>
    <text x="80" y="160" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">48°</text>
    <text x="175" y="156" font-family="Space Grotesk" font-size="13" fill="#2EA8C9" font-weight="700">63°</text>
    <text x="143" y="72" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">?</text>
  </svg>
</div>
<div class="redaction-block">
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">La somme des mesures des angles du triangle HJK est égale à 180°, donc :</span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">\\widehat{JHK} + \\widehat{HJK} + \\widehat{HKJ} = 180°</span></span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">48° + 63° + \\widehat{HKJ} = 180°</span></span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">111° + \\widehat{HKJ} = 180°</span></span></div>
    <div class="we-row"><span class="we-expr"><span class="tex">\\widehat{HKJ} = 180° - 111° = 69°</span></span></div>
  </div>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Cercle circonscrit à un triangle</h3></div>

<span class="prop-badge">Propriété</span>
<div class="def-box">Dans un triangle, les <b>médiatrices des trois côtés</b> sont <b>concourantes</b> en un point qui est le <b>centre du cercle circonscrit</b> au triangle. (Le cercle circonscrit à un triangle est le cercle qui passe par ses trois sommets.)</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:320px;margin:12px auto;">
  <svg viewBox="0 0 270 250" style="width:100%;display:block;">
    <circle cx="134.7" cy="132.4" r="102.46" fill="none" stroke="#0C5BA0" stroke-width="1.6"/>
    <line x1="140.7" y1="186.0" x2="132.7" y2="114.5" stroke="#9CA3AF" stroke-width="1.4" stroke-dasharray="4 4"/>
    <line x1="184.9" y1="96.5" x2="120.1" y2="142.8" stroke="#9CA3AF" stroke-width="1.4" stroke-dasharray="4 4"/>
    <line x1="84.6" y1="107.3" x2="150.8" y2="140.4" stroke="#9CA3AF" stroke-width="1.4" stroke-dasharray="4 4"/>
    <path d="M 140.0 180.0 L 148.0 179.1 L 147.1 171.2 L 139.1 172.0" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <path d="M 180.0 100.0 L 175.4 93.5 L 168.8 98.1 L 173.5 104.6" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <path d="M 90.0 110.0 L 86.4 117.2 L 93.6 120.7 L 97.2 113.6" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <line x1="50" y1="190" x2="230" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="230" y1="170" x2="130" y2="30" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="130" y1="30" x2="50" y2="190" stroke="#1C1B2E" stroke-width="1.8"/>
    <circle cx="134.7" cy="132.4" r="2.6" fill="#1C1B2E"/>
    <text x="30" y="204" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">R</text>
    <text x="238" y="176" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">S</text>
    <text x="126" y="20" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">T</text>
    <text x="140" y="128" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">O</text>
  </svg>
</div>
<p style="margin:4px 0 0;">Les médiatrices des trois côtés de RST (en pointillés) se coupent au point <b>O</b> : c'est le centre du cercle circonscrit au triangle RST. On a <span class="tex">OR = OS = OT</span> : ce sont trois rayons du même cercle.</p>
`;

document.getElementById('methode-demo-proprietes-triangles').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Construire le cercle circonscrit à un triangle, à la règle et au compas</h4></div>
<p class="hint" style="margin:8px 0;">On construit les médiatrices de deux côtés du triangle ABC : leur point d'intersection O est le centre du cercle circonscrit.</p>
<div class="figure-wrap" style="max-width:340px;margin:12px auto;">
  <svg id="circSvg" viewBox="0 90 330 340" style="width:100%;display:block;">
    <line x1="60" y1="300" x2="220" y2="300" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="220" y1="300" x2="150" y2="150" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="150" y1="150" x2="60" y2="300" stroke="#1C1B2E" stroke-width="1.8"/>
    <polyline id="circArcA1" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcA2" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcB1" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcB2" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcB3" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcB4" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcC1" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <polyline id="circArcC2" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
    <line id="circMedAB" x1="140" y1="300" x2="140" y2="300" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
    <line id="circMedBC" x1="185" y1="225" x2="185" y2="225" stroke="#2EA8C9" stroke-width="1.8" opacity="0"/>
    <circle id="circQ1Dot" cx="140" cy="402.5" r="2" fill="#1C1B2E" opacity="0"/>
    <circle id="circQ2Dot" cx="140" cy="197.5" r="2" fill="#1C1B2E" opacity="0"/>
    <circle id="circQ3Dot" cx="287.3" cy="177.2" r="2" fill="#1C1B2E" opacity="0"/>
    <circle id="circQ4Dot" cx="82.7" cy="272.8" r="2" fill="#1C1B2E" opacity="0"/>
    <text id="circLabelO" x="146" y="242" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700" opacity="0">O</text>
    <circle id="circCircle" cx="140" cy="246" r="96.52" fill="none" stroke="#0C5BA0" stroke-width="1.6" opacity="0"/>
    <g id="circCompass" transform="translate(60,300)" opacity="0"></g>
    <g id="circRulerTool" opacity="0"></g>
    <g id="circPencilTool" opacity="0"></g>
    <text x="46" y="316" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="226" y="316" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
    <text x="146" y="140" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">C</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>Piquer en A avec un écartement supérieur à la moitié de [AB] : tracer un arc de chaque côté de [AB].</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Piquer en B avec le <b>même écartement</b> : tracer deux arcs qui recoupent les précédents.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>Tracer, à la règle, la médiatrice de [AB] (droite passant par les deux points d'intersection).</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>Piquer en B avec un écartement supérieur à la moitié de [BC] : tracer un arc de chaque côté de [BC].</div></div>
    <div class="step-item" data-step="5"><div class="step-num">5</div><div>Piquer en C avec le <b>même écartement</b> : tracer deux arcs qui recoupent les précédents.</div></div>
    <div class="step-item" data-step="6"><div class="step-num">6</div><div>Tracer, à la règle, la médiatrice de [BC] : elle coupe la médiatrice de [AB] au point O.</div></div>
    <div class="step-item" data-step="7"><div class="step-num">7</div><div>Piquer le compas en O avec un écartement égal à OA : tracer le cercle circonscrit au triangle ABC.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnCircNext" onclick="circNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="circReset()">Revoir depuis le début</button>
  </div>
</div>
`;

document.getElementById('exos-demo-proprietes-triangles').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer un angle manquant dans un triangle »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">La somme des mesures des angles d'un triangle est égale à 180°, donc :</span></div>
    <div class="we-row"><span class="we-expr"><span class="fill tex">\\widehat{xyz}</span> + <span class="fill tex">\\widehat{yzx}</span> + <span class="fill tex">\\widehat{zxy}</span> = 180°</span></div>
    <div class="we-row"><span class="we-expr">Donc <span class="fill tex">\\widehat{zxy}</span> = 180° − (<span class="fill">…</span> + <span class="fill">…</span>) = <span class="fill">…</span></span></div>
  </div>
  <h3 style="margin-top:18px;">Rédaction type : « Justifier qu'un point est le centre du cercle circonscrit »</h3>
  <div class="redaction-template">
    <span class="fill">O</span> appartient à la médiatrice de <span class="fill">[AB]</span> et à la médiatrice de <span class="fill">[BC]</span>.<br>Or les médiatrices des côtés d'un triangle sont concourantes en un point qui est le centre du cercle circonscrit à ce triangle.<br>Donc <span class="fill">O</span> est le centre du cercle circonscrit au triangle <span class="fill">ABC</span>.
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Dans un triangle MNP, <span class="tex">\\widehat{NMP} = 62°</span> et <span class="tex">\\widehat{MNP} = 74°</span>. Calcule la mesure de l'angle <span class="tex">\\widehat{MPN}</span>. Rédige ta réponse.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Un triangle a deux angles de même mesure 55°. Calcule la mesure du troisième angle.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    Trace un triangle ABC tel que AB = 7 cm, BC = 6 cm et CA = 5 cm. Construis le cercle circonscrit à ce triangle, en laissant apparents tous les traits de construction (arcs de compas, médiatrices).
  </div>
  <div class="exo-card">
    <div class="num">Exercice 4</div>
    Un point O vérifie OA = OB = OC pour un triangle ABC. Explique pourquoi O est le centre du cercle circonscrit à ce triangle.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 5</div>
    Dans un triangle RST rectangle en S, on donne <span class="tex">\\widehat{RTS} = 35°</span>. Calcule la mesure de l'angle <span class="tex">\\widehat{SRT}</span>. Rédige ta réponse.
  </div>
</div>
`;

/* ================= Construction animée : cercle circonscrit au compas =================
   Réutilise methodOpenInPlace/methodSweepDual (définies dans G4-symetrie-axiale.js,
   chargé avant ce fichier -- voir l'ordre des <script> dans index.html) et
   compassSVG/rulerSVG/pencilSVG (app.js), même principe que la médiatrice de G4,
   appliqué à deux côtés du triangle pour obtenir le centre O du cercle circonscrit.

   Toutes les coordonnées ci-dessous (arcs, angles d'ouverture/balayage du compas,
   point O, rayon du cercle) ont été calculées et vérifiées numériquement :
   OA = OB = OC = 96.52 (écart < 0.01 lors du test), O est bien aligné avec les deux
   points d'intersection de chaque paire d'arcs (produit vectoriel nul, testé). */
const CIRC_A = {x:60,y:300}, CIRC_B = {x:220,y:300}, CIRC_C = {x:150,y:150};
const CIRC_R1 = 130, CIRC_LEG1 = 121;   // écartement pour la médiatrice de [AB] (> AB/2 = 80)
const CIRC_R2 = 140, CIRC_LEG2 = 128;   // écartement pour la médiatrice de [BC] (> BC/2 ≈ 82.76)
const CIRC_Q1 = {x:140,y:402.5}, CIRC_Q2 = {x:140,y:197.5};   // intersections des arcs de A et B
const CIRC_Q3 = {x:287.3,y:177.2}, CIRC_Q4 = {x:82.7,y:272.8}; // intersections des arcs de B et C
const CIRC_O = {x:140,y:246};
const CIRC_R3 = 96.52, CIRC_LEG3 = 97.56;   // écartement OA pour le cercle final
const CIRC_CIRCUM = 2*Math.PI*CIRC_R3;      // longueur du cercle (pour l'effet de tracé progressif)
let circStep = 0;
function circReset(){
  circStep = 0;
  ['circArcA1','circArcA2','circArcB1','circArcB2','circArcB3','circArcB4','circArcC1','circArcC2',
   'circMedAB','circMedBC','circQ1Dot','circQ2Dot','circQ3Dot','circQ4Dot','circLabelO','circCircle',
   'circCompass','circRulerTool','circPencilTool'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.querySelectorAll('#circSvg + .step-list .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnCircNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function circSetRulerAt(origin, angleDeg){
  document.getElementById('circRulerTool').setAttribute('transform', `translate(${origin.x.toFixed(1)},${origin.y.toFixed(1)}) rotate(${angleDeg.toFixed(2)}) scale(0.62)`);
}
function circSetPencilAt(x,y,angleDeg){
  document.getElementById('circPencilTool').setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angleDeg-90+8).toFixed(1)}) scale(0.62)`);
}
document.getElementById('circRulerTool').innerHTML = rulerSVG(false);
document.getElementById('circPencilTool').innerHTML = pencilSVG('circ-pencil');
function circDrawLine(lineEl, from, to, angleDeg, dur, onDone){
  document.getElementById('circRulerTool').setAttribute('opacity','1');
  document.getElementById('circPencilTool').setAttribute('opacity','1');
  circSetRulerAt(from, angleDeg); circSetPencilAt(from.x, from.y, angleDeg);
  lineEl.setAttribute('opacity','1');
  lineEl.setAttribute('x1', from.x); lineEl.setAttribute('y1', from.y);
  lineEl.setAttribute('x2', from.x); lineEl.setAttribute('y2', from.y);
  const start = performance.now();
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const curX = from.x+(to.x-from.x)*t, curY = from.y+(to.y-from.y)*t;
    lineEl.setAttribute('x2', curX.toFixed(1)); lineEl.setAttribute('y2', curY.toFixed(1));
    circSetPencilAt(curX, curY, angleDeg);
    if(t<1){ requestAnimationFrame(frame); return; }
    document.getElementById('circRulerTool').setAttribute('opacity','0');
    document.getElementById('circPencilTool').setAttribute('opacity','0');
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}
function circSweepFull(opts){
  // Trace le cercle final : le compas tourne une fois complète autour de O pendant que
  // le cercle apparaît progressivement (stroke-dashoffset), dans le même mouvement.
  const {compassEl, circleEl, center, radius, legLen, startAngleDeg, dur, onDone} = opts;
  compassEl.innerHTML = compassSVG(radius, legLen);
  circleEl.setAttribute('stroke-dasharray', CIRC_CIRCUM.toFixed(1));
  circleEl.setAttribute('stroke-dashoffset', CIRC_CIRCUM.toFixed(1));
  circleEl.setAttribute('opacity','1');
  const start = performance.now();
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const angle = startAngleDeg + 360*t;
    compassEl.setAttribute('transform', `translate(${center.x},${center.y}) rotate(${angle.toFixed(2)})`);
    compassEl.setAttribute('opacity','1');
    circleEl.setAttribute('stroke-dashoffset', (CIRC_CIRCUM*(1-t)).toFixed(1));
    if(t<1){ requestAnimationFrame(frame); return; }
    compassEl.setAttribute('opacity','0');
    circleEl.removeAttribute('stroke-dasharray'); circleEl.removeAttribute('stroke-dashoffset');
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}
function circNextStep(){
  circStep++;
  const btn = document.getElementById('btnCircNext');
  btn.disabled = true;
  const markDone = n=>document.querySelector(`#circSvg + .step-list .step-item[data-step="${n}"]`).classList.add('done');
  if(circStep===1){
    methodOpenInPlace({compassEl:document.getElementById('circCompass'), anchor:CIRC_A, angleDeg:62.02, radius:CIRC_R1, legLen:CIRC_LEG1, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('circCompass'), arc1El:document.getElementById('circArcA1'), arc2El:document.getElementById('circArcA2'),
          anchor:CIRC_A, radius:CIRC_R1, legLen:CIRC_LEG1, sweepStartDeg:62.02, sweepEndDeg:-62.02, window1Deg:52.02, window2Deg:-52.02, halfWindowDeg:10, dur:1400,
          onDone:()=>{ markDone(1); btn.disabled=false; }});
      }});
  } else if(circStep===2){
    methodOpenInPlace({compassEl:document.getElementById('circCompass'), anchor:CIRC_B, angleDeg:117.98, radius:CIRC_R1, legLen:CIRC_LEG1, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('circCompass'), arc1El:document.getElementById('circArcB1'), arc2El:document.getElementById('circArcB2'),
          anchor:CIRC_B, radius:CIRC_R1, legLen:CIRC_LEG1, sweepStartDeg:117.98, sweepEndDeg:242.02, window1Deg:127.98, window2Deg:232.02, halfWindowDeg:10, dur:1400,
          onDone:()=>{
            document.getElementById('circQ1Dot').setAttribute('opacity','1');
            document.getElementById('circQ2Dot').setAttribute('opacity','1');
            markDone(2); btn.disabled=false;
          }});
      }});
  } else if(circStep===3){
    const overshoot = 14;
    const from = {x:CIRC_Q2.x, y:CIRC_Q2.y-overshoot}, to = {x:CIRC_Q1.x, y:CIRC_Q1.y+overshoot};
    circDrawLine(document.getElementById('circMedAB'), from, to, 90, 1300, ()=>{ markDone(3); btn.disabled=false; });
  } else if(circStep===4){
    methodOpenInPlace({compassEl:document.getElementById('circCompass'), anchor:CIRC_B, angleDeg:-51.26, radius:CIRC_R2, legLen:CIRC_LEG2, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('circCompass'), arc1El:document.getElementById('circArcB3'), arc2El:document.getElementById('circArcB4'),
          anchor:CIRC_B, radius:CIRC_R2, legLen:CIRC_LEG2, sweepStartDeg:-51.26, sweepEndDeg:-178.78, window1Deg:-61.26, window2Deg:-168.78, halfWindowDeg:10, dur:1400,
          onDone:()=>{ markDone(4); btn.disabled=false; }});
      }});
  } else if(circStep===5){
    methodOpenInPlace({compassEl:document.getElementById('circCompass'), anchor:CIRC_C, angleDeg:1.22, radius:CIRC_R2, legLen:CIRC_LEG2, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('circCompass'), arc1El:document.getElementById('circArcC1'), arc2El:document.getElementById('circArcC2'),
          anchor:CIRC_C, radius:CIRC_R2, legLen:CIRC_LEG2, sweepStartDeg:1.22, sweepEndDeg:128.74, window1Deg:11.22, window2Deg:118.74, halfWindowDeg:10, dur:1400,
          onDone:()=>{
            document.getElementById('circQ3Dot').setAttribute('opacity','1');
            document.getElementById('circQ4Dot').setAttribute('opacity','1');
            markDone(5); btn.disabled=false;
          }});
      }});
  } else if(circStep===6){
    const overshoot = 20, angleBC = -25.02;
    const rad = angleBC*Math.PI/180, ux = Math.cos(rad), uy = Math.sin(rad);
    const from = {x:CIRC_Q4.x-overshoot*ux, y:CIRC_Q4.y-overshoot*uy}, to = {x:CIRC_Q3.x+overshoot*ux, y:CIRC_Q3.y+overshoot*uy};
    circDrawLine(document.getElementById('circMedBC'), from, to, angleBC, 1300, ()=>{
      document.getElementById('circLabelO').setAttribute('opacity','1');
      markDone(6); btn.disabled=false;
    });
  } else if(circStep===7){
    circSweepFull({compassEl:document.getElementById('circCompass'), circleEl:document.getElementById('circCircle'),
      center:CIRC_O, radius:CIRC_R3, legLen:CIRC_LEG3, startAngleDeg:145.98, dur:2200,
      onDone:()=>{ markDone(7); btn.textContent='Terminé ✓'; btn.disabled=true; }});
  }
}


document.getElementById('histoire-demo-proprietes-triangles').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  <p style="margin:0 0 12px;">En 1792, en pleine Révolution française, les astronomes <b>Jean-Baptiste Delambre</b> et <b>Pierre Méchain</b> partent chacun de leur côté — l'un vers Dunkerque, l'autre vers Barcelone — pour une mission qui va durer sept ans : mesurer précisément la distance entre les deux villes, afin de définir une nouvelle unité universelle, le <b>mètre</b>. Le mètre est alors fixé comme la dix-millionième partie de la distance entre le pôle Nord et l'équateur, en passant par Paris.</p>
  <p style="margin:0 0 12px;">Mais comment mesurer une distance de plus de 1000 km à la fin du XVIII<sup>e</sup> siècle, sans GPS ni satellite ? Impossible de tendre un ruban aussi long ! Delambre et Méchain utilisent la <b>triangulation</b> : ils repèrent des points élevés (clochers, collines, tours) tout le long du trajet, et forment ainsi une chaîne de triangles reliant Dunkerque à Barcelone.</p>
  <div class="figure-wrap" style="max-width:260px;margin:4px auto 14px;">
    <svg viewBox="0 0 200 320" style="width:100%;display:block;">
      <line x1="100" y1="20" x2="60" y2="110" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="100" y1="20" x2="140" y2="110" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="60" y1="110" x2="140" y2="110" stroke="#E35D3A" stroke-width="2.2"/>
      <line x1="60" y1="110" x2="60" y2="200" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="140" y1="110" x2="60" y2="200" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="140" y1="110" x2="100" y2="290" stroke="#1C1B2E" stroke-width="1.6"/>
      <line x1="60" y1="200" x2="100" y2="290" stroke="#1C1B2E" stroke-width="1.6"/>
      <path d="M 131.9 91.7 A 20 20 0 0 0 120.0 110.0" fill="none" stroke="#2EA8C9" stroke-width="2"/>
      <text x="107" y="97" font-family="Space Grotesk" font-size="10" fill="#2EA8C9" font-weight="700">angle mesuré</text>
      <circle cx="100" cy="20" r="3" fill="#1C1B2E"/>
      <circle cx="60" cy="110" r="3" fill="#1C1B2E"/>
      <circle cx="140" cy="110" r="3" fill="#1C1B2E"/>
      <circle cx="60" cy="200" r="3" fill="#1C1B2E"/>
      <circle cx="100" cy="290" r="3" fill="#1C1B2E"/>
      <text x="104" y="14" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">Dunkerque</text>
      <text x="4" y="102" font-family="Space Grotesk" font-size="11" fill="#1F3A5C" font-weight="700">Paris</text>
      <text x="104" y="306" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">Barcelone</text>
    </svg>
    <p class="hint" style="text-align:center;margin:2px 0 0;">En orange : la seule distance mesurée directement (une courte <b>base</b>, sur un terrain plat). Tout le reste se calcule, triangle après triangle.</p>
  </div>
  <p style="margin:0 0 12px;">À chaque triangle, au lieu de mesurer des distances (très difficile sur le terrain), ils mesurent seulement des <b>angles</b>, avec un instrument de précision appelé cercle répétiteur. En ne connaissant qu'un seul côté du premier triangle (la base, mesurée directement) et tous les angles de la chaîne, ils calculent triangle après triangle la longueur de tous les autres côtés — exactement grâce à la propriété que vous venez d'étudier : <b>la somme des angles d'un triangle vaut toujours 180°</b>.</p>
  <p style="margin:0 0 12px;">Un détail amusant : les clochers et collines choisis pour la triangulation ne sont jamais exactement alignés sur le méridien, la ligne imaginaire qu'on cherche à mesurer ! Impossible de trouver des points parfaitement alignés sur plus de 1000 km. Pour corriger cela, Delambre et Méchain mesurent en plus, à chaque bout du trajet, la hauteur du Soleil à midi : cela leur donne la position exacte de Dunkerque et de Barcelone sur le globe, et leur permet de calculer précisément quelle portion du méridien leur chaîne de triangles représente, même si le chemin suivi zigzague un peu autour de la ligne idéale.</p>
  <p style="margin:0 0 12px;">Le voyage n'est pas de tout repos : Méchain manque plusieurs fois d'être arrêté comme espion (la France est en guerre), et reste obsédé jusqu'à sa mort par une petite erreur de mesure qu'il pense avoir commise. Le mètre, lui, est officiellement adopté en 1799 — et sert toujours de référence aujourd'hui, bien que redéfini depuis à partir de la vitesse de la lumière.</p>
  <p class="hint" style="margin:0;">Envie d'en savoir plus ? Le mathématicien <b>Denis Guedj</b> (auteur du <i>Théorème du Perroquet</i>) a raconté cette expédition sous forme de roman, <i>La Méridienne</i>.</p>
</div>
`;

DEMO_REGISTRY['6e|Propriétés des triangles'] = {
  cours:'cours-demo-proprietes-triangles', methode:'methode-demo-proprietes-triangles', exos:'exos-demo-proprietes-triangles', histoire:'histoire-demo-proprietes-triangles',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proprietes-triangles'));
    renderStaticMath(document.getElementById('methode-demo-proprietes-triangles'));
    renderStaticMath(document.getElementById('exos-demo-proprietes-triangles'));
    renderStaticMath(document.getElementById('histoire-demo-proprietes-triangles'));
    injectCourseAddButtons(document.getElementById('cours-demo-proprietes-triangles'));
    injectCourseAddButtons(document.getElementById('methode-demo-proprietes-triangles'));
    circReset();
  }
};

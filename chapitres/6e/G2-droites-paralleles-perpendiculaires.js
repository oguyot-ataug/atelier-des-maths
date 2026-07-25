/* ============================================================
   CHAPITRE : Droites parallèles et perpendiculaires (6e, G2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   ============================================================ */
document.getElementById('cours-demo-droites-paralleles').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Vocabulaire de base</h3></div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;font-size:.92rem;margin:10px 0 18px;">
  <tr>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Notation</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Signification</th>
    <th style="background:rgba(31,58,92,.06);padding:8px;border:1px solid rgba(28,43,57,.15);text-align:left;">Figure</th>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">[EF]</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « segment [EF] ». C'est le segment d'extrémités E et F.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="20" y1="25" x2="120" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="20" y1="18" x2="20" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><line x1="120" y1="18" x2="120" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><text x="16" y="14" font-size="13" font-style="italic">E</text><text x="116" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">(EF)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « droite (EF) ». C'est la droite qui passe par les points E et F, prolongée à l'infini des deux côtés.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="5" y1="25" x2="135" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><circle cx="35" cy="25" r="2.2"/><circle cx="105" cy="25" r="2.2"/><text x="31" y="14" font-size="13" font-style="italic">E</text><text x="101" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">[EF)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Se lit « demi-droite [EF) ». C'est la demi-droite d'origine E qui passe par F, prolongée au-delà de F seulement.</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 50" style="width:130px;"><line x1="25" y1="25" x2="135" y2="25" stroke="#1C1B2E" stroke-width="1.6"/><line x1="25" y1="18" x2="25" y2="32" stroke="#1C1B2E" stroke-width="1.6"/><circle cx="95" cy="25" r="2.2"/><text x="21" y="14" font-size="13" font-style="italic">E</text><text x="91" y="14" font-size="13" font-style="italic">F</text></svg></td>
  </tr>
  <tr>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);font-family:'JetBrains Mono',monospace;">G ∈ (d)<br>H ∉ (d)</td>
    <td style="padding:8px;border:1px solid rgba(28,43,57,.15);">Le point G <b>appartient</b> à la droite (d). Le point H <b>n'appartient pas</b> à la droite (d).</td>
    <td style="padding:4px;border:1px solid rgba(28,43,57,.15);"><svg viewBox="0 0 140 60" style="width:130px;"><line x1="5" y1="35" x2="135" y2="35" stroke="#1C1B2E" stroke-width="1.6"/><line x1="55" y1="29" x2="55" y2="41" stroke="#1C1B2E" stroke-width="1.6" transform="rotate(-20 55 35)"/><text x="50" y="20" font-size="13" font-style="italic">G</text><line x1="93" y1="9" x2="101" y2="17" stroke="#1C1B2E" stroke-width="1.3"/><line x1="101" y1="9" x2="93" y2="17" stroke="#1C1B2E" stroke-width="1.3"/><text x="106" y="17" font-size="13" font-style="italic">H</text></svg></td>
  </tr>
</table>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Droites perpendiculaires</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>sécantes</b> si elles se coupent en un seul point, appelé <b>point d'intersection</b>.</div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>perpendiculaires</b> si elles sont sécantes en formant un angle droit. On note (d) ⊥ (d').</div>
<p class="example-title">Exemple : construis la droite (d') perpendiculaire à la droite (d) passant par le point M.</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez (d) ou M : la perpendiculaire se reconstruit automatiquement.</p>
<div class="figure-wrap">
  <svg id="dp-perpSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-perpLineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dp-perpLineDp" stroke="#E35D3A" stroke-width="1.8"/>
    <path id="dp-perpAngleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <line id="dp-perpTick1" stroke="#1C1B2E" stroke-width="1.6"/>
    <line id="dp-perpTick2" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle id="dp-perpD1" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-perpD2" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-perpM" r="5.5" fill="#E35D3A" style="cursor:grab;"/>
    <text id="dp-perpLabelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-perpLabelDp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">(d')</text>
    <text id="dp-perpLabelM" font-style="italic" font-size="14">M</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetPerpDemo()">Réinitialiser</button>
  </div>
</div>

<p class="example-title" style="margin-top:16px;">Construction à la règle et à l'équerre :</p>
<div class="figure-wrap">
  <svg id="dp-perpMethodeSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-pm-lineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="dp-pm-M" r="5" fill="#E35D3A"/>
    <text id="dp-pm-labelM" font-style="italic" font-size="14">M</text>
    <polygon id="dp-pm-equerre" fill="rgba(210,214,222,.6)" stroke="#4A4A55" stroke-width="1.8"/>
    <circle id="dp-pm-equerre-hole" r="4" fill="var(--white)" stroke="#4A4A55" stroke-width="1.2"/>
    <polygon id="dp-pm-pencil" fill="#E8A33D" stroke="#8A5A1A" stroke-width="1" style="display:none;"/>
    <polygon id="dp-pm-pencil-tip" fill="#3A2A1A" style="display:none;"/>
    <polygon id="dp-pm-ruler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <line id="dp-pm-lineDp" stroke="#E35D3A" stroke-width="1.8" style="display:none;"/>
    <path id="dp-pm-angleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3" style="display:none;"/>
    <text id="dp-pm-labelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-pm-labelDp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A" style="display:none;">(d')</text>
  </svg>
  <p class="hint" id="dp-pm-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpPerpMethodeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpPerpMethodeReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Droites parallèles</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Deux droites sont <b>parallèles</b> si elles ne sont pas sécantes. On note (d) // (d').</div>
<p class="example-title">Exemple : construis la droite (d'') parallèle à la droite (d) passant par le point N.</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez (d) ou N : la parallèle se reconstruit automatiquement.</p>
<div class="figure-wrap">
  <svg id="dp-paraSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-paraLineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="dp-paraLineDpp" stroke="#E35D3A" stroke-width="1.8"/>
    <circle id="dp-paraP1" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-paraP2" r="5.5" fill="#1F3A5C" style="cursor:grab;"/>
    <circle id="dp-paraN" r="5.5" fill="#E35D3A" style="cursor:grab;"/>
    <text id="dp-paraLabelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-paraLabelDpp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">(d'')</text>
    <text id="dp-paraLabelN" font-style="italic" font-size="14">N</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetParaDemo()">Réinitialiser</button>
  </div>
</div>

<p class="example-title" style="margin-top:16px;">Construction à la règle et à l'équerre :</p>
<div class="figure-wrap">
  <svg id="dp-paraMethodeSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-pam-lineD" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="dp-pam-N" r="5" fill="#E35D3A"/>
    <text id="dp-pam-labelN" font-style="italic" font-size="14">N</text>
    <polygon id="dp-pam-ruler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <polygon id="dp-pam-ruler2" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <polygon id="dp-pam-equerre" fill="rgba(210,214,222,.6)" stroke="#4A4A55" stroke-width="1.8"/>
    <circle id="dp-pam-equerre-hole" r="4" fill="var(--white)" stroke="#4A4A55" stroke-width="1.2"/>
    <polygon id="dp-pam-pencil" fill="#E8A33D" stroke="#8A5A1A" stroke-width="1" style="display:none;"/>
    <polygon id="dp-pam-pencil-tip" fill="#3A2A1A" style="display:none;"/>
    <line id="dp-pam-lineDpp" stroke="#E35D3A" stroke-width="1.8" style="display:none;"/>
    <text id="dp-pam-labelD" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#1F3A5C">(d)</text>
    <text id="dp-pam-labelDpp" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A" style="display:none;">(d'')</text>
  </svg>
  <p class="hint" id="dp-pam-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpParaMethodeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpParaMethodeReset()">Recommencer</button>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Position relative de deux droites</h3></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Deux droites sont : soit <b>sécantes</b> ; soit <b>parallèles</b>.</div>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">Deux droites sécantes sont : soit <b>perpendiculaires</b> ; soit <b>non perpendiculaires</b>.</div>
<p class="hint" style="margin:10px 0 6px;">Remarque : on peut résumer tout cela dans une carte mentale, selon le nombre de points communs aux deux droites.</p>
<svg viewBox="0 0 460 210" style="width:100%;max-width:480px;display:block;margin:10px auto;font-family:'Space Grotesk',sans-serif;">
  <line x1="230" y1="40" x2="112" y2="68" stroke="#1C1B2E" stroke-width="1.3"/>
  <line x1="230" y1="40" x2="348" y2="68" stroke="#1C1B2E" stroke-width="1.3"/>
  <line x1="112" y1="100" x2="58" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="112" y1="100" x2="166" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="348" y1="100" x2="294" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <line x1="348" y1="100" x2="402" y2="128" stroke="#1C1B2E" stroke-width="1.1"/>
  <rect x="170" y="6" width="120" height="34" rx="8" fill="#1F3A5C"/>
  <text x="230" y="27" text-anchor="middle" fill="#fff" font-size="12.5">Deux droites</text>
  <rect x="57" y="68" width="110" height="32" rx="8" fill="#E35D3A"/>
  <text x="112" y="89" text-anchor="middle" fill="#fff" font-size="12.5">Sécantes</text>
  <rect x="293" y="68" width="110" height="32" rx="8" fill="#E35D3A"/>
  <text x="348" y="89" text-anchor="middle" fill="#fff" font-size="12.5">Parallèles</text>
  <rect x="10" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="58" y="147" text-anchor="middle" font-size="11">Perpendiculaires</text>
  <text x="58" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">1 point commun</text>
  <rect x="118" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="166" y="141" text-anchor="middle" font-size="10.5">Non</text>
  <text x="166" y="154" text-anchor="middle" font-size="10.5">perpendiculaires</text>
  <text x="166" y="169" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">1 point commun</text>
  <rect x="246" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="294" y="147" text-anchor="middle" font-size="11">Confondues</text>
  <text x="294" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">une infinité</text>
  <rect x="354" y="128" width="96" height="48" rx="6" fill="rgba(31,58,92,.08)" stroke="#1F3A5C" stroke-width="1"/>
  <text x="402" y="147" text-anchor="middle" font-size="11">Distinctes</text>
  <text x="402" y="164" text-anchor="middle" font-size="11" fill="#8A4210" font-weight="700">0 point commun</text>
</svg>

<div class="lesson-header"><span class="num">5</span><h3>Médiatrice d'un segment</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>médiatrice</b> d'un segment est la droite perpendiculaire à ce segment, en son milieu.</div>
<p class="example-title">Exemple : construis la médiatrice du segment [AB].</p>
<p class="hint" style="margin:4px 0 8px;">Déplacez P ou Q : la médiatrice se reconstruit automatiquement, avec le codage des longueurs égales.</p>
<div class="figure-wrap">
  <svg id="dp-medSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-medSeg" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="dp-medLine" stroke="#E35D3A" stroke-width="1.8"/>
    <path id="dp-medAngleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3"/>
    <line id="dp-medTick1a" stroke="#1F6B3A" stroke-width="1.8"/>
    <line id="dp-medTick1b" stroke="#1F6B3A" stroke-width="1.8"/>
    <circle id="dp-medP" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <circle id="dp-medQ" r="5.5" fill="#1C1B2E" style="cursor:grab;"/>
    <text id="dp-medLabelP" font-style="italic" font-size="14">A</text>
    <text id="dp-medLabelQ" font-style="italic" font-size="14">B</text>
    <text id="dp-medLabelMed" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A">médiatrice</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn secondary" onclick="resetMedDemo()">Réinitialiser</button>
  </div>
</div>

<p class="example-title" style="margin-top:16px;">Construction à la règle et à l'équerre :</p>
<div class="figure-wrap">
  <svg id="dp-medMethodeSvg" viewBox="0 0 400 240" style="width:100%;max-width:460px;display:block;margin:0 auto;background:var(--white);border-radius:8px;">
    <line id="dp-mm-seg" stroke="#1C1B2E" stroke-width="1.8"/>
    <circle id="dp-mm-A" r="5" fill="#1C1B2E"/>
    <circle id="dp-mm-B" r="5" fill="#1C1B2E"/>
    <text id="dp-mm-labelA" font-style="italic" font-size="14">A</text>
    <text id="dp-mm-labelB" font-style="italic" font-size="14">B</text>
    <polygon id="dp-mm-measureRuler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <path id="dp-mm-measureTicks" stroke="#1C1B2E" stroke-width="1" fill="none" style="display:none;"/>
    <g id="dp-mm-measureLabels" style="display:none;"></g>
    <line id="dp-mm-tick1a" stroke="#1F6B3A" stroke-width="1.8" style="display:none;"/>
    <line id="dp-mm-tick1b" stroke="#1F6B3A" stroke-width="1.8" style="display:none;"/>
    <circle id="dp-mm-midpoint" r="3.5" fill="#1C1B2E" style="display:none;"/>
    <polygon id="dp-mm-equerre" fill="rgba(210,214,222,.6)" stroke="#4A4A55" stroke-width="1.8" style="display:none;"/>
    <circle id="dp-mm-equerre-hole" r="4" fill="var(--white)" stroke="#4A4A55" stroke-width="1.2" style="display:none;"/>
    <polygon id="dp-mm-ruler" fill="rgba(28,43,57,.12)" stroke="#1C1B2E" stroke-width="1" style="display:none;"/>
    <polygon id="dp-mm-pencil" fill="#E8A33D" stroke="#8A5A1A" stroke-width="1" style="display:none;"/>
    <polygon id="dp-mm-pencil-tip" fill="#3A2A1A" style="display:none;"/>
    <line id="dp-mm-medLine" stroke="#E35D3A" stroke-width="1.8" style="display:none;"/>
    <path id="dp-mm-angleMark" fill="none" stroke="#1C1B2E" stroke-width="1.3" style="display:none;"/>
    <text id="dp-mm-labelMed" font-family="'Space Grotesk',sans-serif" font-size="14" fill="#E35D3A" style="display:none;">médiatrice</text>
  </svg>
  <p class="hint" id="dp-mm-note" style="text-align:center;margin-top:8px;"></p>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpMedMethodeNext()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpMedMethodeReset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('methode-demo-droites-paralleles').innerHTML = `
<div class="figure-wrap">
  <strong style="font-family:'Space Grotesk',sans-serif;">Méthode : tracer une perpendiculaire à l'équerre et à la règle</strong>
  <p class="hint" style="margin-top:6px;">Cliquez sur "Étape suivante" pour dérouler la méthode.</p>
  <div class="step-display" id="dp-methodeDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="dpMethodeDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="dpMethodeDemo.reset()">Recommencer</button>
  </div>
</div>
<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
  ⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).
</div>
`;

document.getElementById('exos-demo-droites-paralleles').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<div class="redaction-block">
  <h3>Rédaction type : « Justifier que deux droites sont perpendiculaires »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">On sait que (d) ⊥ (d') et (d') ⊥ (d'').</span><span class="we-comment"></span></div>
    <div class="we-row"><span class="we-expr">Or, deux droites perpendiculaires à une même troisième sont parallèles entre elles.</span><span class="we-comment">Propriété utilisée.</span></div>
    <div class="we-row"><span class="we-expr">Donc (d) // (d'').</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card">
    <div class="num">Exercice 1</div>
    Trace un segment [RS] de 6 cm, puis construis sa médiatrice à la règle et à l'équerre.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 2</div>
    Trace une droite (d) et un point T n'appartenant pas à (d). Construis la droite parallèle à (d) passant par T.
  </div>
  <div class="exo-card">
    <div class="num">Exercice 3</div>
    (d) ⊥ (d') et (d') // (d''). Que peut-on dire de la position relative de (d) et (d'') ? Rédige ta réponse.
  </div>
</div>
`;

/* ================= Géométrie : petits utilitaires locaux ================= */
function dpDir(p1,p2){ const dx=p2.x-p1.x, dy=p2.y-p1.y; const len=Math.hypot(dx,dy)||1; return {x:dx/len,y:dy/len}; }
function dpExtend(point, dir, len){ return { x1: point.x-dir.x*len, y1: point.y-dir.y*len, x2: point.x+dir.x*len, y2: point.y+dir.y*len }; }
function dpIntersect(p1,dir1,p2,dir2){
  const denom = dir1.x*dir2.y - dir1.y*dir2.x;
  if(Math.abs(denom)<1e-9) return null;
  const t = ((p2.x-p1.x)*dir2.y - (p2.y-p1.y)*dir2.x)/denom;
  return { x: p1.x+t*dir1.x, y: p1.y+t*dir1.y };
}
function dpRightAngleMark(corner, dir1, dir2, size){
  const s1={x:corner.x+dir1.x*size, y:corner.y+dir1.y*size};
  const s2={x:s1.x+dir2.x*size, y:s1.y+dir2.y*size};
  const s3={x:corner.x+dir2.x*size, y:corner.y+dir2.y*size};
  return `M ${s1.x} ${s1.y} L ${s2.x} ${s2.y} L ${s3.x} ${s3.y}`;
}
function dpRulerPolygon(center, dir, perpToDir, length, width){
  const half=length/2, halfW=width/2;
  const c1={x:center.x-dir.x*half+perpToDir.x*halfW, y:center.y-dir.y*half+perpToDir.y*halfW};
  const c2={x:center.x+dir.x*half+perpToDir.x*halfW, y:center.y+dir.y*half+perpToDir.y*halfW};
  const c3={x:center.x+dir.x*half-perpToDir.x*halfW, y:center.y+dir.y*half-perpToDir.y*halfW};
  const c4={x:center.x-dir.x*half-perpToDir.x*halfW, y:center.y-dir.y*half-perpToDir.y*halfW};
  return `${c1.x},${c1.y} ${c2.x},${c2.y} ${c3.x},${c3.y} ${c4.x},${c4.y}`;
}
/* Crayon (corps + mine) positionné en bout de tracé, orienté selon la direction du trait. */
function dpPencilPolygons(tipPoint, dir, perpDir){
  const bodyLen = 30, halfW = 4.5, tipLen = 9;
  const back = {x:tipPoint.x-dir.x*(bodyLen+tipLen), y:tipPoint.y-dir.y*(bodyLen+tipLen)};
  const shoulder = {x:tipPoint.x-dir.x*tipLen, y:tipPoint.y-dir.y*tipLen};
  const b1={x:back.x+perpDir.x*halfW, y:back.y+perpDir.y*halfW};
  const b2={x:shoulder.x+perpDir.x*halfW, y:shoulder.y+perpDir.y*halfW};
  const b3={x:shoulder.x-perpDir.x*halfW, y:shoulder.y-perpDir.y*halfW};
  const b4={x:back.x-perpDir.x*halfW, y:back.y-perpDir.y*halfW};
  const body = `${b1.x},${b1.y} ${b2.x},${b2.y} ${b3.x},${b3.y} ${b4.x},${b4.y}`;
  const t1={x:shoulder.x+perpDir.x*halfW, y:shoulder.y+perpDir.y*halfW};
  const t2={x:shoulder.x-perpDir.x*halfW, y:shoulder.y-perpDir.y*halfW};
  const tip = `${t1.x},${t1.y} ${t2.x},${t2.y} ${tipPoint.x},${tipPoint.y}`;
  return { body, tip };
}
/* Anime le tracé : le trait grandit de start vers end, le crayon suit le bout qui avance. */
let dpAnimationToken = 0;
function dpAnimateTrace(lineEl, pencilEl, pencilTipEl, start, end, pencilPerpDir, duration){
  const myToken = ++dpAnimationToken;
  const dir = dpDir(start, end);
  const startTime = performance.now();
  function frame(now){
    if(myToken !== dpAnimationToken) return; // une étape plus récente a pris le dessus : on abandonne
    const t = Math.min(1, (now-startTime)/duration);
    const currentEnd = {x:start.x+(end.x-start.x)*t, y:start.y+(end.y-start.y)*t};
    lineEl.setAttribute('x1', start.x); lineEl.setAttribute('y1', start.y);
    lineEl.setAttribute('x2', currentEnd.x); lineEl.setAttribute('y2', currentEnd.y);
    const pencilShapes = dpPencilPolygons(currentEnd, dir, pencilPerpDir);
    pencilEl.setAttribute('points', pencilShapes.body);
    pencilTipEl.setAttribute('points', pencilShapes.tip);
    if(t<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function dpSetLine(el, ext){ el.setAttribute('x1',ext.x1); el.setAttribute('y1',ext.y1); el.setAttribute('x2',ext.x2); el.setAttribute('y2',ext.y2); }
function dpSetPt(el, p){ el.setAttribute('cx',p.x); el.setAttribute('cy',p.y); }
function dpSetTxt(el, p, dx, dy){ el.setAttribute('x',p.x+dx); el.setAttribute('y',p.y+dy); }
function dpMakeDraggable(circleEl, svg, getPoint, setPoint, onMove){
  let dragging=false;
  circleEl.addEventListener('mousedown', e=>{ dragging=true; e.preventDefault(); });
  circleEl.addEventListener('touchstart', e=>{ dragging=true; }, {passive:true});
  function move(e){
    if(!dragging) return;
    const pt = svgPointFromEvent(svg, e);
    setPoint({x:pt.x, y:pt.y});
    onMove();
  }
  function up(){ dragging=false; }
  svg.addEventListener('mousemove', move);
  svg.addEventListener('touchmove', move, {passive:true});
  window.addEventListener('mouseup', up);
  window.addEventListener('touchend', up);
}

/* ---- Figure : droites perpendiculaires ---- */
let dpPerpD1={x:70,y:70}, dpPerpD2={x:330,y:150}, dpPerpM={x:230,y:50};
function updatePerpDemo(){
  const svg = document.getElementById('dp-perpSvg');
  const dDir = dpDir(dpPerpD1, dpPerpD2);
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpPerpD1.x+dpPerpD2.x)/2, y:(dpPerpD1.y+dpPerpD2.y)/2};
  const dExt = dpExtend(mid, dDir, 260);
  const dpExt = dpExtend(dpPerpM, perpDir, 150);
  const inter = dpIntersect(dpPerpD1, dDir, dpPerpM, perpDir) || dpPerpM;
  dpSetLine(document.getElementById('dp-perpLineD'), dExt);
  dpSetLine(document.getElementById('dp-perpLineDp'), dpExt);
  dpSetPt(document.getElementById('dp-perpD1'), dpPerpD1);
  dpSetPt(document.getElementById('dp-perpD2'), dpPerpD2);
  dpSetPt(document.getElementById('dp-perpM'), dpPerpM);
  dpSetTxt(document.getElementById('dp-perpLabelD'), {x:dpPerpD2.x+dDir.x*24+perpDir.x*16, y:dpPerpD2.y+dDir.y*24+perpDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-perpLabelDp'), {x:dpPerpM.x+perpDir.x*45+dDir.x*16, y:dpPerpM.y+perpDir.y*45+dDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-perpLabelM'), dpPerpM, 8, -10);
  // marque d'angle droit : orientée vers l'intérieur (vers le point M et vers D2)
  const dSign = (perpDir.x*(dpPerpM.x-inter.x)+perpDir.y*(dpPerpM.y-inter.y))>=0 ? 1 : -1;
  const dSign2 = (dDir.x*(dpPerpD2.x-inter.x)+dDir.y*(dpPerpD2.y-inter.y))>=0 ? 1 : -1;
  document.getElementById('dp-perpAngleMark').setAttribute('d',
    dpRightAngleMark(inter, {x:dDir.x*dSign2,y:dDir.y*dSign2}, {x:perpDir.x*dSign,y:perpDir.y*dSign}, 14));
}
function resetPerpDemo(){ dpPerpD1={x:70,y:70}; dpPerpD2={x:330,y:150}; dpPerpM={x:230,y:50}; updatePerpDemo(); }
function initPerpDemo(){
  const svg = document.getElementById('dp-perpSvg');
  dpMakeDraggable(document.getElementById('dp-perpD1'), svg, ()=>dpPerpD1, p=>dpPerpD1=p, updatePerpDemo);
  dpMakeDraggable(document.getElementById('dp-perpD2'), svg, ()=>dpPerpD2, p=>dpPerpD2=p, updatePerpDemo);
  dpMakeDraggable(document.getElementById('dp-perpM'), svg, ()=>dpPerpM, p=>dpPerpM=p, updatePerpDemo);
  updatePerpDemo();
}

/* ---- Figure : droites parallèles ---- */
let dpParaP1={x:60,y:190}, dpParaP2={x:300,y:110}, dpParaN={x:150,y:50};
function updateParaDemo(){
  const dDir = dpDir(dpParaP1, dpParaP2);
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpParaP1.x+dpParaP2.x)/2, y:(dpParaP1.y+dpParaP2.y)/2};
  const dExt = dpExtend(mid, dDir, 260);
  const dppExt = dpExtend(dpParaN, dDir, 260);
  dpSetLine(document.getElementById('dp-paraLineD'), dExt);
  dpSetLine(document.getElementById('dp-paraLineDpp'), dppExt);
  dpSetPt(document.getElementById('dp-paraP1'), dpParaP1);
  dpSetPt(document.getElementById('dp-paraP2'), dpParaP2);
  dpSetPt(document.getElementById('dp-paraN'), dpParaN);
  dpSetTxt(document.getElementById('dp-paraLabelD'), {x:dpParaP2.x+dDir.x*24+perpDir.x*16, y:dpParaP2.y+dDir.y*24+perpDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-paraLabelDpp'), {x:dpParaN.x+dDir.x*24+perpDir.x*16, y:dpParaN.y+dDir.y*24+perpDir.y*16}, 0, 0);
  dpSetTxt(document.getElementById('dp-paraLabelN'), dpParaN, 8, -10);
}
function resetParaDemo(){ dpParaP1={x:60,y:190}; dpParaP2={x:300,y:110}; dpParaN={x:150,y:50}; updateParaDemo(); }
function initParaDemo(){
  const svg = document.getElementById('dp-paraSvg');
  dpMakeDraggable(document.getElementById('dp-paraP1'), svg, ()=>dpParaP1, p=>dpParaP1=p, updateParaDemo);
  dpMakeDraggable(document.getElementById('dp-paraP2'), svg, ()=>dpParaP2, p=>dpParaP2=p, updateParaDemo);
  dpMakeDraggable(document.getElementById('dp-paraN'), svg, ()=>dpParaN, p=>dpParaN=p, updateParaDemo);
  updateParaDemo();
}

/* ---- Figure : médiatrice d'un segment ---- */
let dpMedP={x:90,y:170}, dpMedQ={x:310,y:80};
function updateMedDemo(){
  const dDir = dpDir(dpMedP, dpMedQ);
  const perpDir = {x:-dDir.y, y:dDir.x};
  const mid = {x:(dpMedP.x+dpMedQ.x)/2, y:(dpMedP.y+dpMedQ.y)/2};
  const medExt = dpExtend(mid, perpDir, 130);
  dpSetLine(document.getElementById('dp-medSeg'), {x1:dpMedP.x,y1:dpMedP.y,x2:dpMedQ.x,y2:dpMedQ.y});
  dpSetLine(document.getElementById('dp-medLine'), medExt);
  dpSetPt(document.getElementById('dp-medP'), dpMedP);
  dpSetPt(document.getElementById('dp-medQ'), dpMedQ);
  dpSetTxt(document.getElementById('dp-medLabelP'), dpMedP, -14, 4);
  dpSetTxt(document.getElementById('dp-medLabelQ'), dpMedQ, 8, 4);
  dpSetTxt(document.getElementById('dp-medLabelMed'), {x:mid.x+perpDir.x*60, y:mid.y+perpDir.y*60}, -40, -4);
  // codage des longueurs égales (petits traits obliques sur PM et MQ)
  const tickLen=9, tickAngle=Math.atan2(dDir.y,dDir.x)+Math.PI/2.6;
  const quarter1 = {x:(dpMedP.x+mid.x)/2, y:(dpMedP.y+mid.y)/2};
  const quarter2 = {x:(mid.x+dpMedQ.x)/2, y:(mid.y+dpMedQ.y)/2};
  const t1 = document.getElementById('dp-medTick1a');
  t1.setAttribute('x1', quarter1.x-Math.cos(tickAngle)*tickLen); t1.setAttribute('y1', quarter1.y-Math.sin(tickAngle)*tickLen);
  t1.setAttribute('x2', quarter1.x+Math.cos(tickAngle)*tickLen); t1.setAttribute('y2', quarter1.y+Math.sin(tickAngle)*tickLen);
  const t2 = document.getElementById('dp-medTick1b');
  t2.setAttribute('x1', quarter2.x-Math.cos(tickAngle)*tickLen); t2.setAttribute('y1', quarter2.y-Math.sin(tickAngle)*tickLen);
  t2.setAttribute('x2', quarter2.x+Math.cos(tickAngle)*tickLen); t2.setAttribute('y2', quarter2.y+Math.sin(tickAngle)*tickLen);
  // angle droit au milieu
  const dSign = (perpDir.x*(medExt.x2-mid.x)+perpDir.y*(medExt.y2-mid.y))>=0 ? 1 : -1;
  const dSign2 = (dDir.x*(dpMedQ.x-mid.x)+dDir.y*(dpMedQ.y-mid.y))>=0 ? 1 : -1;
  document.getElementById('dp-medAngleMark').setAttribute('d',
    dpRightAngleMark(mid, {x:dDir.x*dSign2,y:dDir.y*dSign2}, {x:perpDir.x*dSign,y:perpDir.y*dSign}, 13));
}
function resetMedDemo(){ dpMedP={x:90,y:170}; dpMedQ={x:310,y:80}; updateMedDemo(); }
function initMedDemo(){
  const svg = document.getElementById('dp-medSvg');
  dpMakeDraggable(document.getElementById('dp-medP'), svg, ()=>dpMedP, p=>dpMedP=p, updateMedDemo);
  dpMakeDraggable(document.getElementById('dp-medQ'), svg, ()=>dpMedQ, p=>dpMedQ=p, updateMedDemo);
  updateMedDemo();
}

/* ---- Construction pas à pas : médiatrice à la règle et à l'équerre ---- */
const DP_MM_A={x:90,y:170}, DP_MM_B={x:310,y:80};
const dpMmDir = dpDir(DP_MM_A, DP_MM_B);
const dpMmPerp = {x:-dpMmDir.y, y:dpMmDir.x};
const dpMmMid = {x:(DP_MM_A.x+DP_MM_B.x)/2, y:(DP_MM_A.y+DP_MM_B.y)/2};
const DP_MM_STEPS = [
  {phase:'measure', note:"On mesure le segment [AB] à la règle graduée : le 0 est posé sur A, on lit 8 cm sur B."},
  {phase:'midpoint', note:"On prend la moitié de 8 cm, soit 4 cm : c'est là que se trouve le milieu M. On code les longueurs égales AM = MB."},
  {phase:'equerre', note:"On place un côté de l'angle droit de l'équerre le long de [AB], au niveau de M."},
  {phase:'ruler', note:"On pose la règle le long de l'autre côté de l'équerre : elle est perpendiculaire à [AB] en M."},
  {phase:'removed', note:"On retire l'équerre : seule la règle reste en place."},
  {phase:'traced', note:"On trace la médiatrice le long de la règle, en codant l'angle droit."},
  {phase:'clean', note:"On retire la règle : cette droite est la médiatrice de [AB]."},
];
let dpMmIdx = 0;
function dpRenderMedMethode(animate){
  dpAnimationToken++;
  const s = DP_MM_STEPS[dpMmIdx];
  dpSetLine(document.getElementById('dp-mm-seg'), {x1:DP_MM_A.x,y1:DP_MM_A.y,x2:DP_MM_B.x,y2:DP_MM_B.y});
  dpSetPt(document.getElementById('dp-mm-A'), DP_MM_A);
  dpSetPt(document.getElementById('dp-mm-B'), DP_MM_B);
  dpSetTxt(document.getElementById('dp-mm-labelA'), DP_MM_A, -16, 5);
  dpSetTxt(document.getElementById('dp-mm-labelB'), DP_MM_B, 8, 5);

  const measureRuler = document.getElementById('dp-mm-measureRuler');
  const measureTicks = document.getElementById('dp-mm-measureTicks'), measureLabels = document.getElementById('dp-mm-measureLabels');
  if(s.phase==='measure'){
    const rulerW = 30; // largeur totale de la règle
    const segLen = Math.hypot(DP_MM_B.x-DP_MM_A.x, DP_MM_B.y-DP_MM_A.y);
    const cmPx = segLen/8, mmPx = cmPx/10;
    const totalCm = 10; // règle qui dépasse la lecture, sans sortir du cadre visible
    const rulerLenPx = cmPx*totalCm;
    // La règle est posée EN DESSOUS du segment, son "0" pile au bord (sur A), et elle se poursuit après la lecture à 8.
    const rulerMidAlong = {x:DP_MM_A.x+dpMmDir.x*(rulerLenPx/2), y:DP_MM_A.y+dpMmDir.y*(rulerLenPx/2)};
    const measureCenter = {x:rulerMidAlong.x+dpMmPerp.x*(rulerW/2), y:rulerMidAlong.y+dpMmPerp.y*(rulerW/2)};
    measureRuler.setAttribute('points', dpRulerPolygon(measureCenter, dpMmDir, dpMmPerp, rulerLenPx, rulerW));
    measureRuler.style.display='';
    // Graduations : 0 posé sur A, lecture à 8 cm sur B, la règle et ses graduations continuent au-delà.
    let ticksPath = '';
    let labelsHtml = '';
    const nbMm = totalCm*10;
    for(let i=0;i<=nbMm;i++){
      const isCm = i%10===0;
      const pt = {x:DP_MM_A.x+dpMmDir.x*mmPx*i, y:DP_MM_A.y+dpMmDir.y*mmPx*i};
      const isHalfCm = i%10===5;
      const tickDepth = isCm ? 11 : (isHalfCm ? 8 : 5);
      const t1 = {x:pt.x, y:pt.y};
      const t2 = {x:pt.x+dpMmPerp.x*tickDepth, y:pt.y+dpMmPerp.y*tickDepth};
      ticksPath += `M ${t1.x} ${t1.y} L ${t2.x} ${t2.y} `;
      if(isCm){
        const cmIndex = i/10;
        const isHalf = cmIndex===4;
        const labelPos = {x:pt.x+dpMmPerp.x*20, y:pt.y+dpMmPerp.y*20};
        labelsHtml += `<text x="${labelPos.x}" y="${labelPos.y}" font-size="${isHalf?11:9}" text-anchor="middle" fill="${isHalf?'#1F6B3A':'#1C1B2E'}" font-weight="${isHalf?700:400}">${cmIndex}</text>`;
      }
    }
    measureTicks.setAttribute('d', ticksPath);
    measureTicks.style.display='';
    measureLabels.innerHTML = labelsHtml;
    measureLabels.style.display='';
  } else {
    measureRuler.style.display='none';
    measureTicks.style.display='none';
    measureLabels.style.display='none';
  }

  const tick1a = document.getElementById('dp-mm-tick1a'), tick1b = document.getElementById('dp-mm-tick1b'), midpoint = document.getElementById('dp-mm-midpoint');
  const midpointOnwards = ['midpoint','equerre','ruler','removed','traced','clean'];
  if(midpointOnwards.indexOf(s.phase)!==-1){
    const tickLen=9, tickAngle=Math.atan2(dpMmDir.y,dpMmDir.x)+Math.PI/2.6;
    const q1 = {x:(DP_MM_A.x+dpMmMid.x)/2, y:(DP_MM_A.y+dpMmMid.y)/2};
    const q2 = {x:(dpMmMid.x+DP_MM_B.x)/2, y:(dpMmMid.y+DP_MM_B.y)/2};
    tick1a.setAttribute('x1', q1.x-Math.cos(tickAngle)*tickLen); tick1a.setAttribute('y1', q1.y-Math.sin(tickAngle)*tickLen);
    tick1a.setAttribute('x2', q1.x+Math.cos(tickAngle)*tickLen); tick1a.setAttribute('y2', q1.y+Math.sin(tickAngle)*tickLen);
    tick1b.setAttribute('x1', q2.x-Math.cos(tickAngle)*tickLen); tick1b.setAttribute('y1', q2.y-Math.sin(tickAngle)*tickLen);
    tick1b.setAttribute('x2', q2.x+Math.cos(tickAngle)*tickLen); tick1b.setAttribute('y2', q2.y+Math.sin(tickAngle)*tickLen);
    tick1a.style.display=''; tick1b.style.display='';
    dpSetPt(midpoint, dpMmMid); midpoint.style.display='';
  } else {
    tick1a.style.display='none'; tick1b.style.display='none'; midpoint.style.display='none';
  }

  const equerre = document.getElementById('dp-mm-equerre'), hole = document.getElementById('dp-mm-equerre-hole');
  if(s.phase==='equerre' || s.phase==='ruler'){
    const c2 = {x:dpMmMid.x+dpMmDir.x*90, y:dpMmMid.y+dpMmDir.y*90};
    const c3 = {x:dpMmMid.x+dpMmPerp.x*80, y:dpMmMid.y+dpMmPerp.y*80};
    equerre.setAttribute('points', `${dpMmMid.x},${dpMmMid.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`);
    equerre.style.display='';
    const holePos = {x:dpMmMid.x+dpMmDir.x*14+dpMmPerp.x*14, y:dpMmMid.y+dpMmDir.y*14+dpMmPerp.y*14};
    dpSetPt(hole, holePos); hole.style.display='';
  } else {
    equerre.style.display='none'; hole.style.display='none';
  }

  const rulerHalfWidth = 6.5, rulerLength = 220;
  const ruler = document.getElementById('dp-mm-ruler');
  if(s.phase==='ruler' || s.phase==='removed' || s.phase==='traced'){
    const rulerCenter = {x:dpMmMid.x-dpMmDir.x*rulerHalfWidth, y:dpMmMid.y-dpMmDir.y*rulerHalfWidth};
    ruler.setAttribute('points', dpRulerPolygon(rulerCenter, dpMmPerp, dpMmDir, rulerLength, rulerHalfWidth*2));
    ruler.style.display='';
  } else {
    ruler.style.display='none';
  }

  const medLine = document.getElementById('dp-mm-medLine'), angleMark = document.getElementById('dp-mm-angleMark');
  const pencil = document.getElementById('dp-mm-pencil'), pencilTip = document.getElementById('dp-mm-pencil-tip');
  const labelMed = document.getElementById('dp-mm-labelMed');
  if(s.phase==='traced' || s.phase==='clean'){
    const medExt = dpExtend(dpMmMid, dpMmPerp, rulerLength/2);
    medLine.style.display='';
    angleMark.setAttribute('d', dpRightAngleMark(dpMmMid, {x:dpMmDir.x,y:dpMmDir.y}, {x:dpMmPerp.x,y:dpMmPerp.y}, 13));
    angleMark.style.display='';
    dpSetTxt(labelMed, {x:medExt.x2+dpMmDir.x*16, y:medExt.y2+dpMmDir.y*16}, 0, 0);
    labelMed.style.display='';
    if(s.phase==='traced'){
      pencil.style.display=''; pencilTip.style.display='';
      if(animate){
        dpAnimateTrace(medLine, pencil, pencilTip, {x:medExt.x1,y:medExt.y1}, {x:medExt.x2,y:medExt.y2}, dpMmDir, 900);
      } else {
        dpSetLine(medLine, medExt);
        const tipPoint = {x:medExt.x2, y:medExt.y2};
        const pencilShapes = dpPencilPolygons(tipPoint, dpMmPerp, dpMmDir);
        pencil.setAttribute('points', pencilShapes.body);
        pencilTip.setAttribute('points', pencilShapes.tip);
      }
    } else {
      dpSetLine(medLine, medExt);
      pencil.style.display='none'; pencilTip.style.display='none';
    }
  } else {
    medLine.style.display='none'; angleMark.style.display='none';
    pencil.style.display='none'; pencilTip.style.display='none';
    labelMed.style.display='none';
  }

  document.getElementById('dp-mm-note').textContent = s.note;
}
function dpMedMethodeNext(){ if(dpMmIdx<DP_MM_STEPS.length-1){ dpMmIdx++; dpRenderMedMethode(DP_MM_STEPS[dpMmIdx].phase==='traced'); } }
function dpMedMethodeReset(){ dpMmIdx=0; dpRenderMedMethode(false); }

/* ---- Construction pas à pas : perpendiculaire à l'équerre ---- */
const DP_PM_D1={x:70,y:70}, DP_PM_D2={x:330,y:150}, DP_PM_M={x:230,y:50};
const dpPmDir = dpDir(DP_PM_D1, DP_PM_D2);
let dpPmPerp = {x:-dpPmDir.y, y:dpPmDir.x};
const dpPmFoot = dpIntersect(DP_PM_D1, dpPmDir, DP_PM_M, dpPmPerp);
if(dpPmPerp.x*(DP_PM_M.x-dpPmFoot.x) + dpPmPerp.y*(DP_PM_M.y-dpPmFoot.y) < 0){ dpPmPerp = {x:-dpPmPerp.x, y:-dpPmPerp.y}; }
const dpPmFootDist = Math.hypot(dpPmFoot.x-DP_PM_D1.x, dpPmFoot.y-DP_PM_D1.y);
const dpPmTouchDist = Math.hypot(DP_PM_M.x-dpPmFoot.x, DP_PM_M.y-dpPmFoot.y);
const DP_PM_STEPS = [
  {dist: 40, phase:'slide', note:"On place un côté de l'angle droit de l'équerre sur la droite (d)."},
  {dist: 95, phase:'slide', note:"On fait glisser l'équerre le long de (d), sans la faire tourner."},
  {dist: dpPmFootDist, phase:'slide', note:"On arrête de glisser dès que l'autre côté de l'équerre touche le point M."},
  {dist: dpPmFootDist, phase:'ruler', note:"On pose la règle le long de ce côté de l'équerre : elle est sécante à la droite (d)."},
  {dist: dpPmFootDist, phase:'removed', note:"On retire l'équerre : seule la règle reste en place."},
  {dist: dpPmFootDist, phase:'traced', note:"On trace la droite le long de la règle, et on nomme (d') en codant l'angle droit."},
  {dist: dpPmFootDist, phase:'clean', note:"On retire la règle : (d) et (d') sont perpendiculaires."},
];
let dpPmIdx = 0;
function dpRenderPerpMethode(animate){
  dpAnimationToken++; // invalide toute animation en cours d'une étape précédente
  const s = DP_PM_STEPS[dpPmIdx];
  const dExt = dpExtend({x:(DP_PM_D1.x+DP_PM_D2.x)/2,y:(DP_PM_D1.y+DP_PM_D2.y)/2}, dpPmDir, 260);
  dpSetLine(document.getElementById('dp-pm-lineD'), dExt);
  dpSetPt(document.getElementById('dp-pm-M'), DP_PM_M);
  dpSetTxt(document.getElementById('dp-pm-labelM'), DP_PM_M, 8, -10);
  dpSetTxt(document.getElementById('dp-pm-labelD'), {x:DP_PM_D2.x+dpPmDir.x*24+dpPmPerp.x*16, y:DP_PM_D2.y+dpPmDir.y*24+dpPmPerp.y*16}, 0, 0);
  const pos = {x:DP_PM_D1.x+dpPmDir.x*s.dist, y:DP_PM_D1.y+dpPmDir.y*s.dist};
  const c2 = {x:pos.x+dpPmDir.x*90, y:pos.y+dpPmDir.y*90};
  const c3 = {x:pos.x+dpPmPerp.x*(dpPmTouchDist+22), y:pos.y+dpPmPerp.y*(dpPmTouchDist+22)};
  const equerre = document.getElementById('dp-pm-equerre');
  const hole = document.getElementById('dp-pm-equerre-hole');
  const lineDp = document.getElementById('dp-pm-lineDp'), angleMark = document.getElementById('dp-pm-angleMark'), ruler = document.getElementById('dp-pm-ruler');
  const pencil = document.getElementById('dp-pm-pencil'), pencilTip = document.getElementById('dp-pm-pencil-tip');

  if(s.phase==='removed' || s.phase==='traced' || s.phase==='clean'){
    equerre.style.display='none';
    hole.style.display='none';
  } else {
    equerre.setAttribute('points', `${pos.x},${pos.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`);
    equerre.style.display='';
    const holePos = {x:pos.x+dpPmDir.x*14+dpPmPerp.x*14, y:pos.y+dpPmDir.y*14+dpPmPerp.y*14};
    dpSetPt(hole, holePos);
    hole.style.display='';
  }

  const rulerHalfWidth = 6.5, rulerLength = 220;
  const rulerCenter = {x:dpPmFoot.x-dpPmDir.x*rulerHalfWidth, y:dpPmFoot.y-dpPmDir.y*rulerHalfWidth};
  if(s.phase==='ruler' || s.phase==='removed' || s.phase==='traced'){
    ruler.setAttribute('points', dpRulerPolygon(rulerCenter, dpPmPerp, dpPmDir, rulerLength, rulerHalfWidth*2));
    ruler.style.display='';
  } else {
    ruler.style.display='none';
  }

  const labelDp = document.getElementById('dp-pm-labelDp');
  if(s.phase==='traced' || s.phase==='clean'){
    const dpExt = dpExtend(dpPmFoot, dpPmPerp, rulerLength/2);
    lineDp.style.display='';
    angleMark.setAttribute('d', dpRightAngleMark(dpPmFoot, {x:dpPmDir.x,y:dpPmDir.y}, {x:dpPmPerp.x,y:dpPmPerp.y}, 13));
    angleMark.style.display='';
    dpSetTxt(labelDp, {x:dpExt.x2+dpPmDir.x*16, y:dpExt.y2+dpPmDir.y*16}, 0, 0);
    labelDp.style.display='';
    if(s.phase==='traced'){
      pencil.style.display=''; pencilTip.style.display='';
      if(animate){
        dpAnimateTrace(lineDp, pencil, pencilTip, {x:dpExt.x1,y:dpExt.y1}, {x:dpExt.x2,y:dpExt.y2}, dpPmDir, 900);
      } else {
        dpSetLine(lineDp, dpExt);
        const tipPoint = {x:dpExt.x2, y:dpExt.y2};
        const pencilShapes = dpPencilPolygons(tipPoint, dpPmPerp, dpPmDir);
        pencil.setAttribute('points', pencilShapes.body);
        pencilTip.setAttribute('points', pencilShapes.tip);
      }
    } else {
      dpSetLine(lineDp, dpExt);
      pencil.style.display='none';
      pencilTip.style.display='none';
    }
  } else {
    lineDp.style.display='none';
    pencil.style.display='none';
    pencilTip.style.display='none';
    angleMark.style.display='none';
    labelDp.style.display='none';
  }
  document.getElementById('dp-pm-note').textContent = s.note;
}
function dpPerpMethodeNext(){ if(dpPmIdx<DP_PM_STEPS.length-1){ dpPmIdx++; dpRenderPerpMethode(DP_PM_STEPS[dpPmIdx].phase==='traced'); } }
function dpPerpMethodeReset(){ dpPmIdx=0; dpRenderPerpMethode(false); }

/* ---- Construction pas à pas : parallèle à l'équerre ---- */
const DP_PAM_P1={x:60,y:190}, DP_PAM_P2={x:300,y:110}, DP_PAM_N={x:150,y:50};
const dpPamDir = dpDir(DP_PAM_P1, DP_PAM_P2);
const dpPamPerp = {x:-dpPamDir.y, y:dpPamDir.x};
const dpPamSlideDist = dpPamPerp.x*(DP_PAM_N.x-DP_PAM_P1.x) + dpPamPerp.y*(DP_PAM_N.y-DP_PAM_P1.y);
const dpPamCornerFinal = {x:DP_PAM_P1.x+dpPamPerp.x*dpPamSlideDist, y:DP_PAM_P1.y+dpPamPerp.y*dpPamSlideDist};
const dpPamTouchDist = Math.hypot(DP_PAM_N.x-dpPamCornerFinal.x, DP_PAM_N.y-dpPamCornerFinal.y);
const DP_PAM_STEPS = [
  {frac: 0, phase:'equerre-only', note:"On place un côté de l'angle droit de l'équerre sur la droite (d)."},
  {frac: 0, phase:'slide', note:"On vient poser la règle le long de l'autre côté de l'équerre."},
  {frac: 0.5, phase:'slide', note:"L'équerre glisse le long de la règle (sans que la règle ne bouge), en direction du point N."},
  {frac: 1, phase:'slide', note:"On arrête de glisser dès que le côté de l'équerre passe par le point N."},
  {frac: 1, phase:'ruler2', note:"On vient poser une seconde règle le long de ce côté de l'équerre."},
  {frac: 1, phase:'removed', note:"On retire l'équerre (et la première règle) : seule la seconde règle reste en place."},
  {frac: 1, phase:'traced', note:"On trace la parallèle le long de cette règle : on nomme (d'') la droite obtenue."},
  {frac: 1, phase:'clean', note:"On retire la seconde règle : (d) et (d'') sont parallèles."},
];
let dpPamIdx = 0;
function dpRenderParaMethode(animate){
  dpAnimationToken++; // invalide toute animation en cours d'une étape précédente
  const s = DP_PAM_STEPS[dpPamIdx];
  const dExt = dpExtend({x:(DP_PAM_P1.x+DP_PAM_P2.x)/2,y:(DP_PAM_P1.y+DP_PAM_P2.y)/2}, dpPamDir, 260);
  dpSetLine(document.getElementById('dp-pam-lineD'), dExt);
  dpSetPt(document.getElementById('dp-pam-N'), DP_PAM_N);
  dpSetTxt(document.getElementById('dp-pam-labelN'), DP_PAM_N, 8, -10);
  dpSetTxt(document.getElementById('dp-pam-labelD'), {x:DP_PAM_P2.x+dpPamDir.x*24+dpPamPerp.x*16, y:DP_PAM_P2.y+dpPamDir.y*24+dpPamPerp.y*16}, 0, 0);

  const ruler = document.getElementById('dp-pam-ruler');
  if(s.phase==='slide'){
    const rulerHalfWidth = 6;
    const rulerCenter = {x:DP_PAM_P1.x-dpPamDir.x*rulerHalfWidth, y:DP_PAM_P1.y-dpPamDir.y*rulerHalfWidth};
    ruler.setAttribute('points', dpRulerPolygon(rulerCenter, dpPamPerp, dpPamDir, 300, rulerHalfWidth*2));
    ruler.style.display='';
  } else {
    ruler.style.display='none';
  }

  const corner = {x:DP_PAM_P1.x+dpPamPerp.x*dpPamSlideDist*s.frac, y:DP_PAM_P1.y+dpPamPerp.y*dpPamSlideDist*s.frac};
  const c2 = {x:corner.x+dpPamDir.x*(dpPamTouchDist+22), y:corner.y+dpPamDir.y*(dpPamTouchDist+22)};
  const sign = (dpPamSlideDist>=0?1:-1);
  const c3 = {x:corner.x+dpPamPerp.x*55*sign, y:corner.y+dpPamPerp.y*55*sign};
  const equerre = document.getElementById('dp-pam-equerre');
  const hole = document.getElementById('dp-pam-equerre-hole');
  if(s.phase==='removed' || s.phase==='traced' || s.phase==='clean'){
    equerre.style.display='none';
    hole.style.display='none';
  } else {
    equerre.setAttribute('points', `${corner.x},${corner.y} ${c2.x},${c2.y} ${c3.x},${c3.y}`);
    equerre.style.display='';
    const holePos = {x:corner.x+dpPamDir.x*14+dpPamPerp.x*14*sign, y:corner.y+dpPamDir.y*14+dpPamPerp.y*14*sign};
    dpSetPt(hole, holePos);
    hole.style.display='';
  }

  const ruler2 = document.getElementById('dp-pam-ruler2');
  const ruler2HalfWidth = 6.5, ruler2Length = 300;
  const ruler2Center = {x:DP_PAM_N.x-dpPamPerp.x*ruler2HalfWidth*sign, y:DP_PAM_N.y-dpPamPerp.y*ruler2HalfWidth*sign};
  if(s.phase==='ruler2' || s.phase==='removed' || s.phase==='traced'){
    ruler2.setAttribute('points', dpRulerPolygon(ruler2Center, dpPamDir, dpPamPerp, ruler2Length, ruler2HalfWidth*2));
    ruler2.style.display='';
  } else {
    ruler2.style.display='none';
  }

  const lineDpp = document.getElementById('dp-pam-lineDpp');
  const pencil = document.getElementById('dp-pam-pencil'), pencilTip = document.getElementById('dp-pam-pencil-tip');
  const labelDpp = document.getElementById('dp-pam-labelDpp');
  if(s.phase==='traced' || s.phase==='clean'){
    const dppExt = dpExtend(DP_PAM_N, dpPamDir, ruler2Length/2);
    lineDpp.style.display='';
    dpSetTxt(labelDpp, {x:dppExt.x2+dpPamPerp.x*16, y:dppExt.y2+dpPamPerp.y*16}, 0, 0);
    labelDpp.style.display='';
    if(s.phase==='traced'){
      pencil.style.display=''; pencilTip.style.display='';
      if(animate){
        dpAnimateTrace(lineDpp, pencil, pencilTip, {x:dppExt.x1,y:dppExt.y1}, {x:dppExt.x2,y:dppExt.y2}, dpPamPerp, 900);
      } else {
        dpSetLine(lineDpp, dppExt);
        const tipPoint = {x:dppExt.x2, y:dppExt.y2};
        const pencilShapes = dpPencilPolygons(tipPoint, dpPamDir, dpPamPerp);
        pencil.setAttribute('points', pencilShapes.body);
        pencilTip.setAttribute('points', pencilShapes.tip);
      }
    } else {
      dpSetLine(lineDpp, dppExt);
      pencil.style.display='none';
      pencilTip.style.display='none';
    }
  } else {
    lineDpp.style.display='none';
    pencil.style.display='none';
    pencilTip.style.display='none';
    labelDpp.style.display='none';
  }
  document.getElementById('dp-pam-note').textContent = s.note;
}
function dpParaMethodeNext(){ if(dpPamIdx<DP_PAM_STEPS.length-1){ dpPamIdx++; dpRenderParaMethode(DP_PAM_STEPS[dpPamIdx].phase==='traced'); } }
function dpParaMethodeReset(){ dpPamIdx=0; dpRenderParaMethode(false); }

/* ---- Méthode animée : tracer une perpendiculaire ---- */
const DP_METHODE_STEPS = [
  {expr:'Droite (d) et point M', note:"On souhaite tracer la perpendiculaire à (d) passant par M."},
  {expr:"Équerre sur (d)", note:"On place un côté de l'angle droit de l'équerre le long de la droite (d)."},
  {expr:"Équerre glissée jusqu'à M", note:"On fait glisser l'équerre le long de (d) jusqu'à ce que son autre côté touche M."},
  {expr:"Tracé et codage", note:"On trace la droite le long de ce second côté, on la prolonge à la règle, et on code l'angle droit."},
];
const dpMethodeDemo = makeStepDemo(DP_METHODE_STEPS, 'dp-methodeDisplay');

DEMO_REGISTRY['Droites parallèles et perpendiculaires'] = { cours:'cours-demo-droites-paralleles', methode:'methode-demo-droites-paralleles', exos:'exos-demo-droites-paralleles',
  init:()=>{ initPerpDemo(); initParaDemo(); initMedDemo(); dpPerpMethodeReset(); dpParaMethodeReset(); dpMedMethodeReset(); dpMethodeDemo.reset(); injectCourseAddButtons(document.getElementById('cours-demo-droites-paralleles')); } };

DEMO_QUIZZES['Droites parallèles et perpendiculaires'] = [
  {q:"Que signifie (d) ⊥ (d') ?",
   opts:["(d) et (d') sont parallèles","(d) et (d') sont perpendiculaires","(d) et (d') sont confondues"], correct:1},
  {q:"Deux droites parallèles distinctes ont combien de points communs ?",
   opts:["0","1","une infinité"], correct:0},
  {q:"La médiatrice d'un segment [AB] est...",
   opts:["la droite (AB) elle-même","la droite perpendiculaire à [AB] passant par son milieu","le milieu de [AB]"], correct:1},
];

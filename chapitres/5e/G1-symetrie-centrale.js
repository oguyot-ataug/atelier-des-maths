/* ============================================================
   CHAPITRE : Symétrie centrale (5e)
   Ce fichier est autonome : il injecte son propre contenu HTML
   dans les conteneurs prévus, définit ses figures interactives,
   et s'enregistre auprès du site (DEMO_REGISTRY / DEMO_QUIZZES).
   Il dépend des fonctions partagées définies dans index.html
   (renderMathText, setTick, svgPointFromEvent, makeStepDemo,
   renderLengthCode, renderAngleCode, injectCourseAddButtons...).
   ============================================================ */
document.getElementById('cours-demo-symetrie').innerHTML = `

      <div class="lesson-header"><span class="num">1</span><h3>Définition de la symétrie centrale</h3></div>

      <div class="sub-header"><span class="letter">A</span><h4>Symétrie centrale et demi-tour</h4></div>
      <span class="def-badge">Définition</span>
      <div class="def-box">On dit que deux figures sont <b>symétriques par rapport à un point O</b> lorsque l'une vient se superposer exactement à l'autre après un <b>demi-tour effectué autour de O</b>. Cette transformation s'appelle la <b>symétrie centrale de centre O</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple : un demi-tour autour de O</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez les 3 sommets du triangle bleu, puis lancez l'animation : elle tourne d'un demi-tour (180°) autour de O et vient se superposer exactement à son image (contour orange).</p>
        <svg id="svgTri" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:10px auto;touch-action:none;">
          <line x1="192" y1="122" x2="208" y2="138" stroke="#1C1B2E" stroke-width="2" class="pt-cross"/>
          <line x1="208" y1="122" x2="192" y2="138" stroke="#1C1B2E" stroke-width="2" class="pt-cross"/>
          <text x="210" y="122" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <polygon id="triGhost" fill="none" stroke="#E35D3A" stroke-width="2" stroke-dasharray="5 4"/>
          <polygon id="triShape" fill="#1F3A5C" fill-opacity=".25" stroke="#1F3A5C" stroke-width="2"/>
          <circle class="triHandle vertex-handle" data-i="0" r="13" style="cursor:grab;"/>
          <circle class="triHandle vertex-handle" data-i="1" r="13" style="cursor:grab;"/>
          <circle class="triHandle vertex-handle" data-i="2" r="13" style="cursor:grab;"/>
        </svg>
        <div class="figure-toolbar">
          <button class="btn" id="btnRotate" onclick="playRotation()">Lancer le demi-tour ↻</button>
          <button class="btn secondary" onclick="resetTriDemo()">Réinitialiser</button>
        </div>
      </div>

      <div class="sub-header"><span class="letter">B</span><h4>Symétrique d'un point</h4></div>
      <span class="def-badge">Définition</span>
      <div class="def-box">Un point <b>A' est le symétrique d'un point A par rapport à un point O</b> lorsque <b>O est le milieu du segment [AA']</b>.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple : le symétrique d'un point</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez le point <b>A</b> (bleu) : son symétrique <b>A'</b> (orange) se recalcule en temps réel. O reste le centre de symétrie.</p>
        <svg id="svgPoint" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:10px auto;touch-action:none;">
          <line id="ptLine" x1="0" y1="0" x2="0" y2="0" stroke="#B7C3CD" stroke-width="1.5" stroke-dasharray="4 4"/>
          <line id="markO" class="pt-tick" stroke="#1C1B2E" stroke-width="2"/>
          <text x="200" y="150" font-family="Space Grotesk" font-size="14" fill="#1C1B2E">O</text>
          <line id="markA" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="ptA" cx="120" cy="60" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="ptALabel" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">A</text>
          <line id="markAprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <text id="ptAprimeLabel" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700">A'</text>
          <line id="codeOA" stroke="#8A2E1C" stroke-width="1.5"/>
          <line id="codeOAprime" stroke="#8A2E1C" stroke-width="1.5"/>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetPointDemo()">Réinitialiser</button>
        </div>
        <p class="hint" style="margin:6px 0 0;">Les petits traits sur [OA] et [OA'] indiquent qu'ils sont codés de <b>même longueur</b> : c'est ce qui prouve que O est le milieu de [AA'].</p>
      </div>
      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : le symétrique de O par rapport à lui-même est O — c'est le seul point que la symétrie centrale laisse à sa place (on dit qu'il est <b>invariant</b>).
      </div>

      <div class="lesson-header"><span class="num">2</span><h3>Propriétés de la symétrie centrale</h3></div>

      <div class="sub-header"><span class="letter">A</span><h4>Symétrique d'une droite</h4></div>
      <span class="prop-badge">Propriété</span>
      <div class="def-box">Le symétrique d'une droite par une symétrie centrale est une droite <b>parallèle</b> à la droite de départ. La symétrie centrale <b>conserve l'alignement</b> des points.</div>
      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez les points I et J : la droite (d) les suit toujours exactement, et son image (d') reste parallèle.</p>
        <svg id="svgDroite" viewBox="0 0 400 240" style="width:100%;max-width:440px;display:block;margin:10px auto;touch-action:none;">
          <line id="lineD" stroke="#1F3A5C" stroke-width="1.6"/>
          <line id="lineDprime" stroke="#E35D3A" stroke-width="1.6" stroke-dasharray="6 4"/>
          <line id="crossO1" stroke="#1C1B2E" stroke-width="2"/>
          <line id="crossO2" stroke="#1C1B2E" stroke-width="2"/>
          <text id="labelO" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <line id="tickI" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="handleI" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="labelI" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">I</text>
          <line id="tickJ" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="handleJ" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="labelJ" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">J</text>
          <line id="tickIprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <text id="labelIprime" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700">I'</text>
          <line id="tickJprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <text id="labelJprime" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700">J'</text>
          <text id="labelDroiteD" font-family="Space Grotesk" font-size="13" fill="#1F3A5C">(d)</text>
          <text id="labelDroiteDprime" font-family="Space Grotesk" font-size="13" fill="#E35D3A">(d')</text>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetDroiteDemo()">Réinitialiser</button>
        </div>
      </div>

      <div class="sub-header"><span class="letter">B</span><h4>Symétrique d'un segment</h4></div>
      <span class="prop-badge">Propriété</span>
      <div class="def-box">Le symétrique d'un segment par une symétrie centrale est un segment de <b>même longueur</b>. La symétrie centrale <b>conserve les longueurs</b>.</div>
      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez R ou S : [R'S'] suit, et les petits traits codent que R'S' = RS.</p>
        <svg id="svgSegment" viewBox="0 0 400 200" style="width:100%;max-width:400px;display:block;margin:10px auto;touch-action:none;">
          <line id="segRS" stroke="#1F3A5C" stroke-width="2.2"/>
          <line id="segRSprime" stroke="#E35D3A" stroke-width="2.2"/>
          <line id="segDropR" stroke="#B7C3CD" stroke-width="1.2" stroke-dasharray="3 3"/>
          <line id="segDropS" stroke="#B7C3CD" stroke-width="1.2" stroke-dasharray="3 3"/>
          <line id="segCrossO1" stroke="#1C1B2E" stroke-width="2"/>
          <line id="segCrossO2" stroke="#1C1B2E" stroke-width="2"/>
          <text id="segLabelO" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <line id="segCodeRS" stroke="#8A2E1C" stroke-width="1.5"/>
          <line id="segCodeRSprime" stroke="#8A2E1C" stroke-width="1.5"/>
          <line id="tickR" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="handleR" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="segLabelR" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">R</text>
          <line id="tickS" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="handleS" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="segLabelS" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">S</text>
          <line id="tickRprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <text id="segLabelRprime" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700">R'</text>
          <line id="tickSprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <text id="segLabelSprime" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700">S'</text>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetSegmentDemo()">Réinitialiser</button>
        </div>
      </div>

      <div class="sub-header"><span class="letter">C</span><h4>Symétrique d'un polygone</h4></div>
      <span class="prop-badge">Propriété</span>
      <div class="def-box">Le symétrique d'un polygone par une symétrie centrale est un polygone <b>superposable</b> au premier : <b>mêmes longueurs de côtés, mêmes mesures d'angles, même périmètre et même aire</b>.</div>
      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez n'importe quel sommet, ou changez le nombre de sommets : l'image et le codage (longueurs, angles) se recalculent automatiquement.</p>
        <div class="tool-row" style="margin:8px 0;">
          <label class="hint" style="display:flex;align-items:center;gap:8px;margin:0;">Nombre de sommets :
            <select id="polySides" onchange="regeneratePolygon()">
              <option value="3">3 (triangle)</option>
              <option value="4">4 (quadrilatère)</option>
              <option value="5">5 (pentagone)</option>
              <option value="6">6 (hexagone)</option>
            </select>
          </label>
        </div>
        <svg id="svgPolygone" viewBox="0 0 400 240" style="width:100%;max-width:400px;display:block;margin:10px auto;touch-action:none;">
          <polygon id="polyShape" fill="#1F3A5C" fill-opacity=".12" stroke="#1F3A5C" stroke-width="2"/>
          <polygon id="polyShapePrime" fill="#E35D3A" fill-opacity=".12" stroke="#E35D3A" stroke-width="2"/>
          <line id="polyCrossO1" stroke="#1C1B2E" stroke-width="2"/>
          <line id="polyCrossO2" stroke="#1C1B2E" stroke-width="2"/>
          <text id="polyLabelO" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <g id="polygoneCodes"></g>
          <g id="polyLabels"></g>
          <g id="polyHandles"></g>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetPolygonDemo()">Réinitialiser</button>
        </div>
      </div>

      <div class="sub-header"><span class="letter">D</span><h4>Symétrique d'un cercle</h4></div>
      <span class="prop-badge">Propriété</span>
      <div class="def-box">Le symétrique d'un cercle par une symétrie centrale est un cercle de <b>même rayon</b>, dont le <b>centre est le symétrique</b> du centre de départ.</div>
      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple</strong>
        <p class="hint interaction-hint" style="margin-top:6px;">Déplacez le centre N ou le point M (qui fixe le rayon) : le cercle symétrique suit, avec le même rayon codé sur les deux figures.</p>
        <svg id="svgCercle" viewBox="0 0 400 220" style="width:100%;max-width:400px;display:block;margin:10px auto;touch-action:none;">
          <circle id="cercleN" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
          <circle id="cercleNprime" fill="none" stroke="#E35D3A" stroke-width="1.8"/>
          <line id="cercleDrop" stroke="#B7C3CD" stroke-width="1.2" stroke-dasharray="3 3"/>
          <line id="rayonNM" stroke="#1F3A5C" stroke-width="1.3" stroke-dasharray="4 3"/>
          <line id="rayonNMprime" stroke="#E35D3A" stroke-width="1.3" stroke-dasharray="4 3"/>
          <line id="codeRayonNM" stroke="#8A2E1C" stroke-width="1.5"/>
          <line id="codeRayonNMprime" stroke="#8A2E1C" stroke-width="1.5"/>
          <line id="cercleCrossO1" stroke="#1C1B2E" stroke-width="2"/>
          <line id="cercleCrossO2" stroke="#1C1B2E" stroke-width="2"/>
          <text id="cercleLabelO" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <text id="cercleNameC" font-family="Caveat" font-size="26" font-weight="700" fill="#1F3A5C">(C)</text>
          <text id="cercleNameCprime" font-family="Caveat" font-size="26" font-weight="700" fill="#E35D3A">(C')</text>
          <line id="crossN1" stroke="#1F3A5C" stroke-width="2"/>
          <line id="crossN2" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="handleN" r="15" fill="transparent" style="cursor:grab;"/>
          <text id="cercleLabelN" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">N</text>
          <line id="tickM" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <circle id="dotM" r="3.5" fill="#1F3A5C"/>
          <circle id="handleM" r="12" fill="transparent" style="cursor:grab;"/>
          <text id="cercleLabelM" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
          <line id="crossNprime1" stroke="#E35D3A" stroke-width="2"/>
          <line id="crossNprime2" stroke="#E35D3A" stroke-width="2"/>
          <text id="cercleLabelNprime" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">N'</text>
          <line id="tickMprime" class="pt-tick" stroke="#E35D3A" stroke-width="2"/>
          <circle id="dotMprime" r="3.5" fill="#E35D3A"/>
          <text id="cercleLabelMprime" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">M'</text>
        </svg>
        <div class="figure-toolbar">
          <button class="btn secondary" onclick="resetCercleDemo()">Réinitialiser</button>
        </div>
      </div>
      <div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">
        Remarque : pour construire le symétrique d'un <b>arc de cercle</b>, on construit les symétriques de son centre et de ses deux extrémités, puis on trace l'arc qui les relie.
      </div>

      <div class="lesson-header"><span class="num">3</span><h3>Centre de symétrie</h3></div>
      <span class="def-badge">Définition</span>
      <div class="def-box">On dit qu'un point O est le <b>centre de symétrie</b> d'une figure lorsque cette figure est sa propre image par la symétrie centrale de centre O — autrement dit, elle se superpose à elle-même après un demi-tour autour de O.</div>

      <div class="figure-wrap">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exemple 1</strong>
        <p class="hint" style="margin-top:6px;">Lancez le demi-tour : l'hexagone tourne de 180° autour de O et vient se superposer exactement à sa position de départ.</p>
        <svg id="svgHexa" viewBox="0 0 400 260" style="width:100%;max-width:380px;display:block;margin:10px auto;">
          <polygon id="hexaGhost" points="120,80 90,140 140,220 280,200 310,140 260,60" fill="none" stroke="#E35D3A" stroke-width="1.6" stroke-dasharray="5 4"/>
          <polygon id="hexaShape" points="120,80 90,140 140,220 280,200 310,140 260,60" fill="#1F3A5C" fill-opacity=".12" stroke="#1C1B2E" stroke-width="2"/>
          <line x1="194" y1="134" x2="206" y2="146" stroke="#1C1B2E" stroke-width="2"/><line x1="206" y1="134" x2="194" y2="146" stroke="#1C1B2E" stroke-width="2"/>
          <text x="208" y="132" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <g id="hexaLabels">
            <text x="104" y="72" font-family="Space Grotesk" font-size="13">G</text>
            <text x="68" y="144" font-family="Space Grotesk" font-size="13">H</text>
            <text x="128" y="240" font-family="Space Grotesk" font-size="13">I</text>
            <text x="286" y="216" font-family="Space Grotesk" font-size="13">J</text>
            <text x="316" y="144" font-family="Space Grotesk" font-size="13">K</text>
            <text x="260" y="48" font-family="Space Grotesk" font-size="13">L</text>
          </g>
        </svg>
        <div class="figure-toolbar">
          <button class="btn" onclick="playHexaRotation()">Lancer le demi-tour ↻</button>
          <button class="btn secondary" onclick="resetHexaDemo()">Réinitialiser</button>
        </div>
        <p class="hint" style="margin-top:8px;">Dans l'hexagone GHIJKL : G a pour symétrique J, H a pour symétrique K, et I a pour symétrique L par rapport à O. Ce polygone admet donc O comme centre de symétrie.</p>
      </div>

      <p class="example-title">Autres exemples :</p>
      <ul class="example-list">
        <li>Un parallélogramme WXYZ a pour centre de symétrie le point d'intersection O de ses diagonales [WY] et [XZ].</li>
        <li>Un triangle quelconque n'a pas de centre de symétrie. Un triangle équilatéral, lui, possède trois axes de symétrie — mais toujours aucun centre de symétrie.</li>
      </ul>

      <div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
        ⚠️ Piège classique : ne pas confondre la <b>symétrie centrale</b> (demi-tour autour d'un point, la figure « tourne ») avec la <b>symétrie axiale</b> (retournement autour d'une droite, la figure est « retournée comme dans un miroir »). Un bon réflexe : si l'énoncé donne un point, c'est une symétrie centrale ; s'il donne une droite, c'est une symétrie axiale.
      </div>
`;

document.getElementById('histoire-demo-symetrie').innerHTML = `
<div class="history-box">
  <div class="history-title">📜 Un peu d'histoire</div>
  Contrairement à beaucoup d'autres notions de ce cours, la symétrie n'a pas vraiment d'inventeur : elle est utilisée depuis la Préhistoire, bien avant d'être étudiée mathématiquement. On retrouve des motifs symétriques (par rotation, comme la symétrie centrale, ou par réflexion) dans des ornements vieux de plusieurs dizaines de milliers d'années, sur toutes les civilisations. Ce sont les mathématiciens grecs, notamment autour d'Euclide, qui commencent à étudier ces transformations de façon rigoureuse, en s'intéressant en particulier aux propriétés des figures régulières.
</div>
`;
document.getElementById('methode-demo-symetrie').innerHTML = `
      <div class="sub-header"><span class="letter">M</span><h4>Construire le symétrique d'un point A, au compas et à la règle</h4></div>
<div class="figure-wrap">
        <svg id="svgMethod" viewBox="0 0 400 260" style="width:100%;max-width:460px;display:block;margin:14px auto;">
          <line id="mTickO" class="pt-tick" stroke="#1C1B2E" stroke-width="2"/>
          <text x="207" y="122" font-family="Space Grotesk" font-size="13" fill="#1C1B2E">O</text>
          <line id="mTickA" class="pt-tick" stroke="#1F3A5C" stroke-width="2"/>
          <text x="100" y="50" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700">A</text>
          <line id="mStep1" x1="120" y1="60" x2="120" y2="60" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
          <g id="mRulerTool" opacity="0"></g>
          <g id="mPencilTool" opacity="0"></g>
          <polyline id="mArc" fill="none" stroke="#9CA3AF" stroke-width="1.2" opacity="0"/>
          <g id="mCompass" opacity="0"></g>
          <line id="mTickAprime" class="pt-tick" stroke="#E35D3A" stroke-width="2" opacity="0"/>
          <text id="mStep3t" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700" opacity="0">A'</text>
          <line id="mCodeAO" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
          <line id="mCodeOAprime" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
        </svg>
        <div class="step-list">
          <div class="step-item" data-step="1"><div class="step-num">1</div><div>Je trace la <b>demi-droite [AO)</b> à la règle, en la prolongeant largement au-delà de O.</div></div>
          <div class="step-item" data-step="2"><div class="step-num">2</div><div>Je pique le <b>compas en A</b>, j'ouvre jusqu'à O, puis je reporte cette longueur <b>OA</b> de l'autre côté de O sur la demi-droite (arc de cercle).</div></div>
          <div class="step-item" data-step="3"><div class="step-num">3</div><div>Le point où l'arc coupe la droite est <b>A'</b>, le symétrique de A : on a bien <b>OA' = OA</b>, avec O entre A et A'.</div></div>
        </div>
        <div class="figure-toolbar">
          <button class="btn" id="btnMethodNext" onclick="nextMethodStep()">Étape suivante →</button>
          <button class="btn secondary" onclick="resetMethod()">Revoir depuis le début</button>
        </div>
      </div>
`;
document.getElementById('exos-demo-symetrie').innerHTML = `
      <div class="redaction-block">
        <h3>Rédaction type : « Construire le symétrique d'un point »</h3>
        <div class="redaction-template">
          <span class="fill">O</span> est le milieu du segment <span class="fill">[AA']</span>.<br>Donc <span class="fill">A'</span> est le symétrique du point <span class="fill">A</span> par rapport au point <span class="fill">O</span>.
        </div>
        <h3 style="margin-top:18px;">Rédaction type : « Justifier une symétrie de figure »</h3>
        <div class="redaction-template">
          <span class="fill">A'B'C'</span> est l'image du triangle <span class="fill">ABC</span> par la symétrie centrale de centre <span class="fill">O</span>.<br>Donc <span class="fill">A'B'C'</span> et <span class="fill">ABC</span> ont la même forme et la même taille, mais sont retournés d'un demi-tour.
        </div>
      </div>
      <div class="redaction-block">
        <h3>Exercices</h3>
        <div class="exo-card">
          <div class="num">Exercice 1</div>
          Place un point O et un point M à 4 cm de O. Construis le symétrique M' de M par rapport à O, en laissant apparents les traits de construction.
        </div>
        <div class="exo-card">
          <div class="num">Exercice 2</div>
          ABCD est un parallélogramme de centre O. Explique pourquoi C est le symétrique de A par rapport à O.
        </div>
      </div>
`;

const O = {x:200,y:130};

let ptA = {x:120,y:60};

function updatePointDemo(){
  const ax=ptA.x, ay=ptA.y;
  const apx = 2*O.x-ax, apy = 2*O.y-ay;
  const svgEl = document.getElementById('svgPoint');
  const angle = Math.atan2(apy-ay, apx-ax);
  svgEl.querySelector('#ptA').setAttribute('cx',ax); svgEl.querySelector('#ptA').setAttribute('cy',ay);
  svgEl.querySelector('#ptALabel').setAttribute('x',ax-18); svgEl.querySelector('#ptALabel').setAttribute('y',ay<20?ay+22:ay-14);
  svgEl.querySelector('#ptAprimeLabel').setAttribute('x',apx+12); svgEl.querySelector('#ptAprimeLabel').setAttribute('y',apy+20);
  svgEl.querySelector('#ptLine').setAttribute('x1',ax); svgEl.querySelector('#ptLine').setAttribute('y1',ay);
  svgEl.querySelector('#ptLine').setAttribute('x2',apx); svgEl.querySelector('#ptLine').setAttribute('y2',apy);
  setTick(svgEl.querySelector('#markA'), ax, ay, angle);
  setTick(svgEl.querySelector('#markO'), O.x, O.y, angle);
  setTick(svgEl.querySelector('#markAprime'), apx, apy, angle);
  const midOA = {x:(O.x+ax)/2, y:(O.y+ay)/2};
  const midOAprime = {x:(O.x+apx)/2, y:(O.y+apy)/2};
  setSlantTick(svgEl.querySelector('#codeOA'), midOA.x, midOA.y, angle, 16);
  setSlantTick(svgEl.querySelector('#codeOAprime'), midOAprime.x, midOAprime.y, angle, 16);
}

function resetPointDemo(){ ptA={x:120,y:60}; updatePointDemo(); }

function initPointDemo(){
  updatePointDemo();
  const svgEl = document.getElementById('svgPoint');
  const handle = svgEl.querySelector('#ptA');
  let dragging=false;
  const start=e=>{dragging=true;e.preventDefault();};
  const move=e=>{ if(!dragging) return; const p=svgPointFromEvent(svgEl,e); ptA.x=Math.max(10,Math.min(390,p.x)); ptA.y=Math.max(10,Math.min(250,p.y)); updatePointDemo(); };
  const end=()=>dragging=false;
  handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- triangle central symmetry demo ---- */

let tri = [{x:110,y:70},{x:170,y:60},{x:140,y:110}];

function reflect(p){ return {x:2*O.x-p.x, y:2*O.y-p.y}; }

function updateTriDemo(){
  const svgEl=document.getElementById('svgTri');
  const shapeStr = tri.map(p=>`${p.x},${p.y}`).join(' ');
  const ghostStr = tri.map(p=>{const r=reflect(p); return `${r.x},${r.y}`;}).join(' ');
  svgEl.querySelector('#triShape').setAttribute('points',shapeStr);
  svgEl.querySelector('#triGhost').setAttribute('points',ghostStr);
  svgEl.querySelectorAll('.triHandle').forEach((h,i)=>{ h.setAttribute('cx',tri[i].x); h.setAttribute('cy',tri[i].y); });
}

function resetTriDemo(){ tri=[{x:110,y:70},{x:170,y:60},{x:140,y:110}]; document.getElementById('triShape').setAttribute('fill-opacity','.25'); updateTriDemo(); }

function initTriDemo(){
  updateTriDemo();
  const svgEl=document.getElementById('svgTri');
  let dragIdx=-1;
  svgEl.querySelectorAll('.triHandle').forEach(h=>{
    h.addEventListener('mousedown',e=>{dragIdx=+h.dataset.i;e.preventDefault();});
    h.addEventListener('touchstart',e=>{dragIdx=+h.dataset.i;});
  });
  const move=e=>{ if(dragIdx<0) return; const p=svgPointFromEvent(svgEl,e); tri[dragIdx]={x:Math.max(10,Math.min(390,p.x)),y:Math.max(10,Math.min(250,p.y))}; updateTriDemo(); };
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',()=>dragIdx=-1);
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',()=>dragIdx=-1);
}

function rotatePt(p,angleDeg){
  const a = angleDeg*Math.PI/180;
  const dx=p.x-O.x, dy=p.y-O.y;
  return {x:O.x+dx*Math.cos(a)-dy*Math.sin(a), y:O.y+dx*Math.sin(a)+dy*Math.cos(a)};
}

function playRotation(){
  const btn=document.getElementById('btnRotate'); btn.disabled=true;
  const start=performance.now(), dur=1400;
  function frame(now){
    const t=Math.min(1,(now-start)/dur);
    const eased = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const angle = 180*eased;
    const pts = tri.map(p=>rotatePt(p,angle));
    document.getElementById('triShape').setAttribute('points', pts.map(p=>`${p.x},${p.y}`).join(' '));
    if(t<1) requestAnimationFrame(frame);
    else { document.getElementById('triShape').setAttribute('fill-opacity','.45'); btn.disabled=false; }
  }
  requestAnimationFrame(frame);
}
/* ---- moteur générique de déroulé pas-à-pas (calculs) ---- */

const droiteO = {x:200,y:120};

let droiteI = {x:100,y:70}, droiteJ = {x:160,y:105};

function droiteReflect(p){ return {x:2*droiteO.x-p.x, y:2*droiteO.y-p.y}; }

function extendLine(a,b,ext){
  const dx=b.x-a.x, dy=b.y-a.y; const len=Math.hypot(dx,dy)||1;
  return {x1:a.x-dx/len*ext, y1:a.y-dy/len*ext, x2:b.x+dx/len*ext, y2:b.y+dy/len*ext};
}

function updateDroiteDemo(){
  const svgEl=document.getElementById('svgDroite');
  const I=droiteI, J=droiteJ, Ip=droiteReflect(I), Jp=droiteReflect(J);
  const dLine=extendLine(I,J,260), dPrimeLine=extendLine(Ip,Jp,260);
  const set=(id,attrs)=>{ const el=svgEl.querySelector(id); Object.keys(attrs).forEach(k=>el.setAttribute(k,attrs[k])); };
  set('#lineD',{x1:dLine.x1,y1:dLine.y1,x2:dLine.x2,y2:dLine.y2});
  set('#lineDprime',{x1:dPrimeLine.x1,y1:dPrimeLine.y1,x2:dPrimeLine.x2,y2:dPrimeLine.y2});
  const angle = Math.atan2(J.y-I.y, J.x-I.x);
  setTick(svgEl.querySelector('#tickI'), I.x, I.y, angle);
  setTick(svgEl.querySelector('#tickJ'), J.x, J.y, angle);
  setTick(svgEl.querySelector('#tickIprime'), Ip.x, Ip.y, angle);
  setTick(svgEl.querySelector('#tickJprime'), Jp.x, Jp.y, angle);
  set('#handleI',{cx:I.x,cy:I.y}); set('#handleJ',{cx:J.x,cy:J.y});
  set('#labelI',{x:I.x-20,y:I.y-10}); set('#labelJ',{x:J.x+8,y:J.y-10});
  set('#labelIprime',{x:Ip.x+8,y:Ip.y+18}); set('#labelJprime',{x:Jp.x-22,y:Jp.y+18});
  setCross(svgEl.querySelector('#crossO1'), svgEl.querySelector('#crossO2'), droiteO.x, droiteO.y);
  set('#labelO',{x:droiteO.x+10,y:droiteO.y-8});
  set('#labelDroiteD',{x:dLine.x1+8,y:dLine.y1-8});
  set('#labelDroiteDprime',{x:dPrimeLine.x2-34,y:dPrimeLine.y2+18});
}

function resetDroiteDemo(){ droiteI={x:100,y:70}; droiteJ={x:160,y:105}; updateDroiteDemo(); }

function initDroiteDemo(){
  updateDroiteDemo();
  const svgEl=document.getElementById('svgDroite');
  let dragTarget=null;
  const startI=e=>{dragTarget='I';e.preventDefault();};
  const startJ=e=>{dragTarget='J';e.preventDefault();};
  const move=e=>{ if(!dragTarget) return; const p=svgPointFromEvent(svgEl,e); if(dragTarget==='I') droiteI={x:p.x,y:p.y}; else droiteJ={x:p.x,y:p.y}; updateDroiteDemo(); };
  const end=()=>dragTarget=null;
  svgEl.querySelector('#handleI').onmousedown=startI; svgEl.querySelector('#handleJ').onmousedown=startJ;
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  svgEl.querySelector('#handleI').ontouchstart=startI; svgEl.querySelector('#handleJ').ontouchstart=startJ;
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- 2.B : symétrique d'un segment (dynamique + codage) ---- */

const segO = {x:200,y:100};

let segR = {x:80,y:60}, segS = {x:130,y:150};

function segReflect(p){ return {x:2*segO.x-p.x, y:2*segO.y-p.y}; }

function updateSegmentDemo(){
  const svgEl=document.getElementById('svgSegment');
  const R=segR, S=segS, Rp=segReflect(R), Sp=segReflect(S);
  const set=(id,attrs)=>{ const el=svgEl.querySelector(id); Object.keys(attrs).forEach(k=>el.setAttribute(k,attrs[k])); };
  set('#segRS',{x1:R.x,y1:R.y,x2:S.x,y2:S.y});
  set('#segRSprime',{x1:Rp.x,y1:Rp.y,x2:Sp.x,y2:Sp.y});
  set('#segDropR',{x1:R.x,y1:R.y,x2:Rp.x,y2:Rp.y});
  set('#segDropS',{x1:S.x,y1:S.y,x2:Sp.x,y2:Sp.y});
  setCross(svgEl.querySelector('#segCrossO1'), svgEl.querySelector('#segCrossO2'), segO.x, segO.y);
  set('#segLabelO',{x:segO.x+10,y:segO.y-8});
  set('#handleR',{cx:R.x,cy:R.y}); set('#handleS',{cx:S.x,cy:S.y});
  const angleRS = Math.atan2(S.y-R.y, S.x-R.x);
  setTick(svgEl.querySelector('#tickR'), R.x, R.y, angleRS);
  setTick(svgEl.querySelector('#tickS'), S.x, S.y, angleRS);
  setTick(svgEl.querySelector('#tickRprime'), Rp.x, Rp.y, angleRS);
  setTick(svgEl.querySelector('#tickSprime'), Sp.x, Sp.y, angleRS);
  set('#segLabelR',{x:R.x-22,y:R.y-6}); set('#segLabelS',{x:S.x+10,y:S.y+16});
  set('#segLabelRprime',{x:Rp.x+8,y:Rp.y+8}); set('#segLabelSprime',{x:Sp.x-18,y:Sp.y-12});
  const midRS = {x:(R.x+S.x)/2, y:(R.y+S.y)/2}, midRSp = {x:(Rp.x+Sp.x)/2, y:(Rp.y+Sp.y)/2};
  setSlantTick(svgEl.querySelector('#segCodeRS'), midRS.x, midRS.y, angleRS, 16);
  setSlantTick(svgEl.querySelector('#segCodeRSprime'), midRSp.x, midRSp.y, angleRS, 16);
}

function resetSegmentDemo(){ segR={x:80,y:60}; segS={x:130,y:150}; updateSegmentDemo(); }

function initSegmentDemo(){
  updateSegmentDemo();
  const svgEl=document.getElementById('svgSegment');
  let dragTarget=null;
  const startR=e=>{dragTarget='R';e.preventDefault();};
  const startS=e=>{dragTarget='S';e.preventDefault();};
  const move=e=>{ if(!dragTarget) return; const p=svgPointFromEvent(svgEl,e); if(dragTarget==='R') segR={x:p.x,y:p.y}; else segS={x:p.x,y:p.y}; updateSegmentDemo(); };
  const end=()=>dragTarget=null;
  svgEl.querySelector('#handleR').onmousedown=startR; svgEl.querySelector('#handleS').onmousedown=startS;
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  svgEl.querySelector('#handleR').ontouchstart=startR; svgEl.querySelector('#handleS').ontouchstart=startS;
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- 2.D : symétrique d'un cercle (dynamique + codage du rayon) ---- */

const cercleO = {x:200,y:110};

let cercleN = {x:110,y:110}, cercleM = {x:160,y:110};

function cercleReflect(p){ return {x:2*cercleO.x-p.x, y:2*cercleO.y-p.y}; }

function updateCercleDemo(){
  const svgEl=document.getElementById('svgCercle');
  const N=cercleN, M=cercleM, Np=cercleReflect(N), Mp=cercleReflect(M);
  const r = Math.hypot(M.x-N.x, M.y-N.y);
  const set=(id,attrs)=>{ const el=svgEl.querySelector(id); Object.keys(attrs).forEach(k=>el.setAttribute(k,attrs[k])); };
  set('#cercleN',{cx:N.x,cy:N.y,r}); set('#cercleNprime',{cx:Np.x,cy:Np.y,r});
  set('#cercleDrop',{x1:N.x,y1:N.y,x2:Np.x,y2:Np.y});
  set('#rayonNM',{x1:N.x,y1:N.y,x2:M.x,y2:M.y}); set('#rayonNMprime',{x1:Np.x,y1:Np.y,x2:Mp.x,y2:Mp.y});
  setCross(svgEl.querySelector('#cercleCrossO1'), svgEl.querySelector('#cercleCrossO2'), cercleO.x, cercleO.y);
  set('#cercleLabelO',{x:cercleO.x+10,y:cercleO.y-8});
  setCross(svgEl.querySelector('#crossN1'), svgEl.querySelector('#crossN2'), N.x, N.y);
  setCross(svgEl.querySelector('#crossNprime1'), svgEl.querySelector('#crossNprime2'), Np.x, Np.y);
  const angleNM=Math.atan2(M.y-N.y,M.x-N.x);
  setTick(svgEl.querySelector('#tickM'), M.x, M.y, angleNM);
  setTick(svgEl.querySelector('#tickMprime'), Mp.x, Mp.y, angleNM);
  set('#dotM',{cx:M.x,cy:M.y}); set('#dotMprime',{cx:Mp.x,cy:Mp.y});
  set('#handleN',{cx:N.x,cy:N.y}); set('#handleM',{cx:M.x,cy:M.y});
  set('#cercleLabelN',{x:N.x+9,y:N.y-9});
  set('#cercleLabelM',{x:M.x+14*Math.cos(angleNM), y:M.y+14*Math.sin(angleNM)});
  const angleNMp = Math.atan2(Mp.y-Np.y, Mp.x-Np.x);
  set('#cercleLabelNprime',{x:Np.x+9,y:Np.y-9});
  set('#cercleLabelMprime',{x:Mp.x+14*Math.cos(angleNMp), y:Mp.y+14*Math.sin(angleNMp)});
  set('#cercleNameC',{x:N.x-14,y:N.y-r-10}); set('#cercleNameCprime',{x:Np.x-16,y:Np.y-r-10});
  const midNM={x:(N.x+M.x)/2,y:(N.y+M.y)/2}, midNMp={x:(Np.x+Mp.x)/2,y:(Np.y+Mp.y)/2};
  setSlantTick(svgEl.querySelector('#codeRayonNM'), midNM.x, midNM.y, angleNM, 14);
  setSlantTick(svgEl.querySelector('#codeRayonNMprime'), midNMp.x, midNMp.y, angleNM, 14);
}

function resetCercleDemo(){ cercleN={x:110,y:110}; cercleM={x:160,y:110}; updateCercleDemo(); }

function initCercleDemo(){
  updateCercleDemo();
  const svgEl=document.getElementById('svgCercle');
  let dragTarget=null;
  const startN=e=>{dragTarget='N';e.preventDefault();};
  const startM=e=>{dragTarget='M';e.preventDefault();};
  const move=e=>{ if(!dragTarget) return; const p=svgPointFromEvent(svgEl,e); if(dragTarget==='N') cercleN={x:p.x,y:p.y}; else cercleM={x:p.x,y:p.y}; updateCercleDemo(); };
  const end=()=>dragTarget=null;
  svgEl.querySelector('#handleN').onmousedown=startN; svgEl.querySelector('#handleM').onmousedown=startM;
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  svgEl.querySelector('#handleN').ontouchstart=startN; svgEl.querySelector('#handleM').ontouchstart=startM;
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- 2.C : symétrique d'un polygone — codage des longueurs et des angles ---- */

const polyO = {x:200,y:120};

let polyPts = [];

let polyDragIdx = -1;

function polyVertexLetter(i){ return 'PQRSTUVWXYZ'[i%10]; }

function regeneratePolygon(){
  const sel = document.getElementById('polySides');
  const n = sel ? +sel.value : 3;
  polyPts = [];
  const R=65, cx=polyO.x-55, cy=polyO.y;
  for(let i=0;i<n;i++){
    const a = -Math.PI/2 + i*2*Math.PI/n;
    polyPts.push({x:cx+R*Math.cos(a), y:cy+R*Math.sin(a)*0.95});
  }
  updatePolygonDemo();
}

function updatePolygonDemo(){
  const svgEl=document.getElementById('svgPolygone');
  if(!svgEl) return;
  const n=polyPts.length;
  const reflected = polyPts.map(p=>({x:2*polyO.x-p.x, y:2*polyO.y-p.y}));
  svgEl.querySelector('#polyShape').setAttribute('points', polyPts.map(p=>`${p.x},${p.y}`).join(' '));
  svgEl.querySelector('#polyShapePrime').setAttribute('points', reflected.map(p=>`${p.x},${p.y}`).join(' '));
  setCross(svgEl.querySelector('#polyCrossO1'), svgEl.querySelector('#polyCrossO2'), polyO.x, polyO.y);
  svgEl.querySelector('#polyLabelO').setAttribute('x', polyO.x+10); svgEl.querySelector('#polyLabelO').setAttribute('y', polyO.y-8);

  let handlesHtml='', labelsHtml='';
  const centroidOf = pts=>{ let cx=0,cy=0; pts.forEach(p=>{cx+=p.x;cy+=p.y;}); return {x:cx/pts.length, y:cy/pts.length}; };
  const cen = centroidOf(polyPts), cenR = centroidOf(reflected);
  polyPts.forEach((p,i)=>{
    const lab = polyVertexLetter(i);
    handlesHtml += `<circle class="poly-handle vertex-handle" data-i="${i}" cx="${p.x}" cy="${p.y}" r="12" style="cursor:grab;"/>`;
    const dx=p.x-cen.x, dy=p.y-cen.y; const len=Math.hypot(dx,dy)||1;
    labelsHtml += `<text x="${p.x+dx/len*20}" y="${p.y+dy/len*20}" font-family="Space Grotesk" font-size="14" fill="#1F3A5C" font-weight="700" text-anchor="middle">${lab}</text>`;
    const rp=reflected[i]; const rdx=rp.x-cenR.x, rdy=rp.y-cenR.y; const rlen=Math.hypot(rdx,rdy)||1;
    labelsHtml += `<text x="${rp.x+rdx/rlen*20}" y="${rp.y+rdy/rlen*20}" font-family="Space Grotesk" font-size="14" fill="#E35D3A" font-weight="700" text-anchor="middle">${lab}'</text>`;
  });
  document.getElementById('polyHandles').innerHTML = handlesHtml;
  document.getElementById('polyLabels').innerHTML = labelsHtml;
  svgEl.querySelectorAll('.poly-handle').forEach(h=>{
    h.onmousedown = e=>{ polyDragIdx=+h.dataset.i; e.preventDefault(); };
    h.ontouchstart = e=>{ polyDragIdx=+h.dataset.i; };
  });

  const CODE_PALETTE = ['#E35D3A','#1F3A5C','#1F6B3A','#9E1F5E','#5B2F9E','#B8860B'];
  const maxCoded = Math.min(n,3); // limite le nombre de codages affichés pour rester lisible
  let codesHtml='';
  for(let i=0;i<maxCoded;i++){
    const a=polyPts[i], b=polyPts[(i+1)%n], ap=reflected[i], bp=reflected[(i+1)%n];
    const color = CODE_PALETTE[i % CODE_PALETTE.length];
    codesHtml += renderSideCode(a,b,i,color) + renderSideCode(ap,bp,i,color);
  }
  for(let i=0;i<maxCoded;i++){
    const prev=polyPts[(i-1+n)%n], cur=polyPts[i], next=polyPts[(i+1)%n];
    const prevp=reflected[(i-1+n)%n], curp=reflected[i], nextp=reflected[(i+1)%n];
    const color = CODE_PALETTE[i % CODE_PALETTE.length];
    codesHtml += renderVertexCode(cur,prev,next,i,color) + renderVertexCode(curp,prevp,nextp,i,color);
  }
  document.getElementById('polygoneCodes').innerHTML = codesHtml;
}

function resetPolygonDemo(){ regeneratePolygon(); }

function initPolygoneCodeDemo(){
  const svgEl=document.getElementById('svgPolygone');
  if(!svgEl) return;
  regeneratePolygon();
  const move=e=>{
    if(polyDragIdx<0) return;
    const p=svgPointFromEvent(svgEl,e);
    polyPts[polyDragIdx]={x:p.x,y:p.y};
    updatePolygonDemo();
  };
  const end=()=>polyDragIdx=-1;
  window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ---- 3 : centre de symétrie — demi-tour de l'hexagone ---- */

const hexaO = {x:200,y:140};

const hexaPts = [{x:120,y:80},{x:90,y:140},{x:140,y:220},{x:280,y:200},{x:310,y:140},{x:260,y:60}];

function resetHexaDemo(){
  document.getElementById('hexaShape').setAttribute('points', hexaPts.map(p=>`${p.x},${p.y}`).join(' '));
  document.getElementById('hexaShape').setAttribute('fill-opacity','.12');
}

function playHexaRotation(){
  const start=performance.now(), dur=1500;
  function frame(now){
    const t=Math.min(1,(now-start)/dur);
    const eased = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const angle = 180*eased;
    const pts = hexaPts.map(p=>rotateAroundPoint(p,hexaO,angle));
    document.getElementById('hexaShape').setAttribute('points', pts.map(p=>`${p.x},${p.y}`).join(' '));
    if(t<1) requestAnimationFrame(frame);
    else document.getElementById('hexaShape').setAttribute('fill-opacity','.28');
  }
  requestAnimationFrame(frame);
}

/* ---- construction method: compass-and-straightedge, real geometry ---- */

const mA = {x:120,y:60};

const mR = Math.hypot(mA.x-O.x, mA.y-O.y);          // true radius OA

const mAngleA = Math.atan2(mA.y-O.y, mA.x-O.x);      // starting angle of OA

const mLegLen = 0.7*mR+30;                            // compass leg length (design choice, > r/2)

// Compas au design du tableau interactif (compassSVG, définie dans app.js) : forme fixe posée
// une seule fois ici (le rayon mR ne change jamais pendant cette construction, seul l'angle
// tourne), positionnée/orientée ensuite par un simple <g transform="translate(...) rotate(...)">
// dans placeCompass() -- pas de logique par-branche à chaque frame comme avant.
document.getElementById('mCompass').innerHTML = compassSVG(mR, mLegLen);

// Règle + crayon (même design que le tableau interactif) montrés le temps de l'étape 1, pour
// illustrer le tracé de la demi-droite [AO) à la règle.
// A' (mAprime) est le reflet exact de A par rapport à O -- le but géométrique de la
// construction -- mais la demi-droite tracée doit le DÉPASSER visiblement (une demi-droite n'a
// pas de fin) : sinon l'arc du compas se contente de "toucher" le bout du trait au lieu de le
// traverser clairement, et l'intersection qui matérialise A' ne se voit pas bien.
const mAprime = {x: 2*O.x-mA.x, y: 2*O.y-mA.y};
const mDirAO = {x:(O.x-mA.x)/mR, y:(O.y-mA.y)/mR};
const mRayOvershoot = 40; // dépassement au-delà de A', dans la continuité de la demi-droite
const mStep1End = {x: mAprime.x+mDirAO.x*mRayOvershoot, y: mAprime.y+mDirAO.y*mRayOvershoot};
const mRayAngleDeg = Math.atan2(mStep1End.y-mA.y, mStep1End.x-mA.x)*180/Math.PI;
const mRayLen = Math.hypot(mStep1End.x-mA.x, mStep1End.y-mA.y);
// La règle (dessinée à l'échelle native du tableau interactif, bien plus grand que ce petit
// viewBox 400×260) doit être mise à l'échelle pour couvrir tout le segment tracé avec de la
// marge des deux côtés -- même technique que rulerScale en 6e G2 (calculée à partir de la
// distance réelle à couvrir, pas choisie à l'œil, sous peine de règle trop petite pour
// atteindre le bout du trait -- bug signalé).
const mRulerScale = Math.max(0.44, (mRayLen+50)/TB_RULER_L);
const mRulerBackOffset = 30*mRulerScale;
const mRulerStart = {
  x: mA.x - Math.cos(mRayAngleDeg*Math.PI/180)*mRulerBackOffset,
  y: mA.y - Math.sin(mRayAngleDeg*Math.PI/180)*mRulerBackOffset
};
const mRulerTool = document.getElementById('mRulerTool');
mRulerTool.innerHTML = rulerSVG(true);
mRulerTool.setAttribute('transform', `translate(${mRulerStart.x.toFixed(1)},${mRulerStart.y.toFixed(1)}) rotate(${mRayAngleDeg.toFixed(1)}) scale(${mRulerScale.toFixed(3)})`);
const mPencilTool = document.getElementById('mPencilTool');
mPencilTool.innerHTML = pencilSVG('m-pencil');
// Même échelle que la règle (comme eqScale=rulerScale en G2) pour que les deux outils restent
// cohérents entre eux, plutôt qu'un facteur choisi indépendamment. Fonction réutilisable : le
// crayon glisse le long de la règle pendant l'étape 1 (voir nextMethodStep), donc sa position
// doit pouvoir être recalculée à chaque frame, pas seulement posée une fois au point final.
// Le crayon n'est PAS aligné avec la règle (une main ne tient pas un crayon bien à plat, parallèle
// au bord de la règle) -- inclinaison de M_PENCIL_TILT par rapport à la direction du tracé.
const M_PENCIL_TILT = 55;
function setMPencilAt(x,y){
  mPencilTool.setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(mRayAngleDeg-90+M_PENCIL_TILT).toFixed(1)}) scale(${mRulerScale.toFixed(3)})`);
}
setMPencilAt(mStep1End.x, mStep1End.y);

let methodStep=0;


function pointOnCircle(angle){ return {x:O.x+mR*Math.cos(angle), y:O.y+mR*Math.sin(angle)}; }


function placeCompass(angle){
  const P = pointOnCircle(angle);
  const g = document.getElementById('mCompass');
  // Repère local de compassSVG : pointe (ancrage) à l'origine, mine à (mR,0) -- il suffit donc
  // de poser le groupe à O (l'ancrage réel de cette construction, voir note ci-dessus) et de le
  // tourner de l'angle courant pour que la mine se retrouve exactement sur P.
  g.setAttribute('transform', `translate(${O.x},${O.y}) rotate(${(angle*180/Math.PI).toFixed(2)})`);
  g.setAttribute('opacity','1');
  return P;
}


function resetMethod(){
  methodStep=0;
  document.querySelectorAll('.step-item').forEach(s=>s.classList.remove('done'));
  ['mStep1','mRulerTool','mPencilTool','mArc','mCompass','mTickAprime','mStep3t','mCodeAO','mCodeOAprime'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.getElementById('mArc').setAttribute('points','');
  document.getElementById('btnMethodNext').disabled=false;
  document.getElementById('btnMethodNext').textContent='Étape suivante →';
  setTick(document.getElementById('mTickA'), mA.x, mA.y, mAngleA);
  setTick(document.getElementById('mTickO'), O.x, O.y, mAngleA);
}

function nextMethodStep(){
  methodStep++;
  if(methodStep===1){
    // La règle est posée d'un coup ("poser la règle") ; le crayon, lui, glisse lentement le
    // long de la règle ("faire glisser le crayon lentement"), et le trait se dessine
    // progressivement à mesure qu'il avance -- plutôt que le trait complet et le crayon
    // n'apparaissant instantanément au point final, comme avant.
    document.querySelector('#methode-demo-symetrie .step-item[data-step="1"]').classList.add('done');
    document.getElementById('btnMethodNext').disabled=true;
    document.getElementById('mStep1').setAttribute('opacity','1');
    document.getElementById('mStep1').setAttribute('x2',mA.x); document.getElementById('mStep1').setAttribute('y2',mA.y);
    document.getElementById('mRulerTool').setAttribute('opacity','1');
    document.getElementById('mPencilTool').setAttribute('opacity','1');
    setMPencilAt(mA.x, mA.y);
    const start=performance.now(), dur=1200;
    function frame(now){
      const t=Math.min(1,(now-start)/dur);
      const curX = mA.x + (mStep1End.x-mA.x)*t, curY = mA.y + (mStep1End.y-mA.y)*t;
      document.getElementById('mStep1').setAttribute('x2',curX.toFixed(1));
      document.getElementById('mStep1').setAttribute('y2',curY.toFixed(1));
      setMPencilAt(curX, curY);
      if(t<1) requestAnimationFrame(frame);
      else document.getElementById('btnMethodNext').disabled=false;
    }
    requestAnimationFrame(frame);
  } else if(methodStep===2){
    // Règle et crayon cachés D'ABORD, et SEULEMENT ENSUITE le compas se pose -- pas les deux en
    // même temps (ordre demandé explicitement).
    document.getElementById('mRulerTool').setAttribute('opacity','0');
    document.getElementById('mPencilTool').setAttribute('opacity','0');
    document.querySelector('#methode-demo-symetrie .step-item[data-step="2"]').classList.add('done');
    document.getElementById('btnMethodNext').disabled=true;
    const target = mAngleA+Math.PI, arcStart = target-M_ARC_HALF_ANGLE, sweepEnd = target+M_ARC_HALF_ANGLE;
    // Balayage UNIQUE et continu de mAngleA jusqu'à sweepEnd (un peu au-delà de A', pas jusqu'à
    // A' pile) : le compas trace VRAIMENT tout l'arc visible lui-même, sa mine continuant de
    // tourner tant que l'arc grandit -- pas de phase où l'arc se complèterait tout seul,
    // compas figé, comme "par magie". Durée mise à l'échelle pour garder la même vitesse
    // angulaire que le demi-tour seul (1600ms pour π).
    const totalSweep = sweepEnd-mAngleA;
    const start=performance.now(), dur=1600*(totalSweep/Math.PI);
    function frame(now){
      const t=Math.min(1,(now-start)/dur);
      const angle = mAngleA + t*totalSweep;
      if(angle>=arcStart){
        const pts=[]; for(let a=arcStart; a<=angle+1e-6; a+=Math.PI/60){ const p=pointOnCircle(a); pts.push(`${p.x},${p.y}`); }
        document.getElementById('mArc').setAttribute('points', pts.join(' '));
        document.getElementById('mArc').setAttribute('opacity','1');
      }
      placeCompass(angle);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('mCompass').setAttribute('opacity','0');
      document.getElementById('btnMethodNext').disabled=false;
    }
    requestAnimationFrame(frame);
  } else {
    mRenderStepInstant(methodStep);
  }
}

/* Petit arc de compas qui vient croiser la demi-droite en A' (pas le demi-cercle complet) --
   utilisé par le rendu instantané (mRenderStepInstant) ; l'animation (nextMethodStep) le
   construit elle-même progressivement, voir plus haut. */
const M_ARC_HALF_ANGLE = 20*Math.PI/180;
function mArcCrossingPoints(){
  const target = mAngleA+Math.PI;
  const pts=[];
  for(let a=target-M_ARC_HALF_ANGLE; a<=target+M_ARC_HALF_ANGLE+1e-6; a+=Math.PI/60){ const p=pointOnCircle(a); pts.push(`${p.x},${p.y}`); }
  return pts.join(' ');
}

/* Rendu instantané (sans animation) de l'état final d'une étape donnée (0, 1, 2 ou 3) --
   utilisé à la fois par resetMethod() et par la reconstitution des étapes pour le cahier
   de l'élève / l'export PDF (voir registerGeoStepDemo ci-dessous). */
function mRenderStepInstant(step){
  document.querySelectorAll('.step-item').forEach(s=>s.classList.remove('done'));
  document.getElementById('mStep1').setAttribute('opacity', step>=1?'1':'0');
  if(step>=1){
    document.getElementById('mStep1').setAttribute('x2',mStep1End.x.toFixed(1)); document.getElementById('mStep1').setAttribute('y2',mStep1End.y.toFixed(1));
    document.querySelector('#methode-demo-symetrie .step-item[data-step="1"]').classList.add('done');
  }
  // Règle + crayon : uniquement pendant l'étape 1 elle-même (comme le compas n'apparaît que
  // pendant l'étape 2) -- une fois la demi-droite tracée, seul le trait noir permanent reste.
  document.getElementById('mRulerTool').setAttribute('opacity', step===1?'1':'0');
  document.getElementById('mPencilTool').setAttribute('opacity', step===1?'1':'0');
  const showArc = step>=2;
  document.getElementById('mArc').setAttribute('opacity', showArc?'1':'0');
  if(showArc){
    document.getElementById('mArc').setAttribute('points', mArcCrossingPoints());
    document.querySelector('#methode-demo-symetrie .step-item[data-step="2"]').classList.add('done');
  } else {
    document.getElementById('mArc').setAttribute('points','');
  }
  document.getElementById('mCompass').setAttribute('opacity', step===2?'1':'0');
  if(step===2) placeCompass(mAngleA+Math.PI);
  const showAprime = step>=3;
  document.getElementById('mTickAprime').setAttribute('opacity', showAprime?'1':'0');
  document.getElementById('mStep3t').setAttribute('opacity', showAprime?'1':'0');
  document.getElementById('mCodeAO').setAttribute('opacity', showAprime?'1':'0');
  document.getElementById('mCodeOAprime').setAttribute('opacity', showAprime?'1':'0');
  if(showAprime){
    const Aprime = pointOnCircle(mAngleA+Math.PI);
    setTick(document.getElementById('mTickAprime'), Aprime.x, Aprime.y, mAngleA);
    // Sous la droite (perpendiculaire à [AO), côté y positif = vers le bas en SVG), pas dans son
    // prolongement (l'ancien décalage fixe +10,+18 pointait quasiment dans la même direction que
    // la demi-droite elle-même) -- et un peu vers la droite en plus, pour ne pas empiéter sur la
    // croix rouge de A' elle-même.
    let perp = {x:-mDirAO.y, y:mDirAO.x};
    if(perp.y<0) perp = {x:mDirAO.y, y:-mDirAO.x};
    const labelOffset = 28, labelRightNudge = 12;
    document.getElementById('mStep3t').setAttribute('x', (Aprime.x+perp.x*labelOffset+labelRightNudge).toFixed(1));
    document.getElementById('mStep3t').setAttribute('y', (Aprime.y+perp.y*labelOffset).toFixed(1));
    // Codage d'égalité de longueur OA = OA' : même convention (trait oblique au milieu du
    // segment) déjà utilisée plus haut dans ce fichier pour la symétrie d'un segment.
    const midAO = {x:(mA.x+O.x)/2, y:(mA.y+O.y)/2}, midOAprime = {x:(O.x+Aprime.x)/2, y:(O.y+Aprime.y)/2};
    setSlantTick(document.getElementById('mCodeAO'), midAO.x, midAO.y, mAngleA);
    setSlantTick(document.getElementById('mCodeOAprime'), midOAprime.x, midOAprime.y, mAngleA);
    document.querySelector('#methode-demo-symetrie .step-item[data-step="3"]').classList.add('done');
  }
  document.getElementById('btnMethodNext').disabled = (step===3);
  document.getElementById('btnMethodNext').textContent = step===3?'Terminé ✓':'Étape suivante →';
}

/* Notes des 3 étapes de la construction, pour la reconstitution en filmstrip (cahier/PDF) */
const M_STEPS = [
  {note:"Je trace la demi-droite [AO) à la règle, en la prolongeant largement au-delà de O."},
  {note:"Je pique le compas en A, j'ouvre jusqu'à O, puis je reporte cette longueur OA de l'autre côté de O sur la demi-droite (arc de cercle)."},
  {note:"Le point où l'arc coupe la droite est A', le symétrique de A : on a bien OA' = OA, avec O entre A et A'."},
];
function mGotoStep(i){ methodStep = i+1; mRenderStepInstant(methodStep); }

/* ---- nombres relatifs : point + opposé sur droite graduée ---- */


DEMO_REGISTRY['5e|Symétrie centrale'] = { cours:'cours-demo-symetrie', methode:'methode-demo-symetrie', exos:'exos-demo-symetrie', histoire:'histoire-demo-symetrie',
  init:()=>{ initPointDemo(); initTriDemo(); resetMethod(); initDroiteDemo(); initSegmentDemo(); initCercleDemo(); initPolygoneCodeDemo(); resetHexaDemo(); registerGeoStepDemo('svgMethod', { steps:()=>M_STEPS, getIdx:()=>methodStep-1, goto:(i)=>mGotoStep(i) }); injectCourseAddButtons(document.getElementById('cours-demo-symetrie')); injectCourseAddButtons(document.getElementById('methode-demo-symetrie')); } };

DEMO_QUIZZES['5e|Symétrie centrale'] = [
  {q:"O est le milieu de [AA']. Que peut-on dire de A' par rapport à A ?",
   opts:["A' est le symétrique de A par rapport à O","A' est le symétrique de A par rapport à une droite","A et A' sont confondus"], correct:0},
  {q:"La symétrie centrale de centre O correspond à :",
   opts:["Une translation","Un demi-tour (rotation de 180°) autour de O","Une symétrie d'axe passant par O"], correct:1},
  {q:"ABCD est un parallélogramme de centre O. Que représente O pour le segment [AC] ?",
   opts:["Un tiers de [AC]","Le milieu de [AC]","Une extrémité de [AC]"], correct:1},
];

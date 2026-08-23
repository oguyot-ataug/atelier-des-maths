/* ============================================================
   CHAPITRE : Symétrie axiale (6e, G4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Cours complet (5 sections : figures symétriques, symétrie d'un
   point, propriétés, axe de symétrie d'un segment -- médiatrice --,
   axe de symétrie d'un angle -- bissectrice). Les constructions aux
   outils (équerre/règle, compas, médiatrice et bissectrice à la
   règle et au compas) sont prévues pour l'onglet Méthode, dans une
   prochaine session -- même approche que G5 Construction de
   triangles : cours d'abord, avec verification numerique systematique
   de chaque figure avant integration.
   ============================================================ */

document.getElementById('cours-demo-symetrie-axiale-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Figures symétriques</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Deux figures sont <b>symétriques</b> par rapport à une droite si elles se superposent par pliage le long de cette droite, appelée l'<b>axe de symétrie</b>.</div>
<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:300px;margin:12px auto;">
  <svg viewBox="0 0 280 160" style="width:100%;display:block;">
    <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <polygon points="60,60 100,60 100,100 80,120 60,100" fill="rgba(31,58,92,.10)" stroke="#1F3A5C" stroke-width="1.8"/>
    <g id="symF1RightGroup">
      <polygon points="220,60 180,60 180,100 200,120 220,100" fill="rgba(227,93,58,.10)" stroke="#E35D3A" stroke-width="1.8"/>
    </g>
    <text x="145" y="20" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <div class="figure-toolbar">
    <button class="btn" onclick="symF1Fold()">Voir le pliage</button>
  </div>
</div>
<p style="margin:4px 0 0;">Les deux figures se superposent par pliage le long de la droite <b>(d)</b> : elles sont donc symétriques par rapport à <b>(d)</b>.</p>
<p style="margin:8px 0 0;">Deux points sont symétriques par rapport à une droite s'ils se superposent par pliage le long de cette droite.</p>

<div class="lesson-header"><span class="num">2</span><h3>Symétrie d'un point</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Le <b>symétrique</b> d'un point M par rapport à une droite (d) est le point M' tel que <b>(d) soit la médiatrice</b> du segment [MM'] (c'est-à-dire tel que (d) soit perpendiculaire au segment [MM'] en son milieu).</div>
<p class="example-title">Exemple : construis M', symétrique du point M par rapport à la droite (d).</p>
<p class="hint" style="margin:0 0 8px;">Axe horizontal ou vertical :</p>
<div class="figure-wrap" style="max-width:320px;margin:12px auto;">
  <svg id="symF2Svg" viewBox="0 0 260 140" style="width:100%;display:block;">
    <defs>
      <pattern id="gridSymAxiale" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4DFD6" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="260" height="140" fill="url(#gridSymAxiale)"/>
    <line x1="140" y1="0" x2="140" y2="140" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF2Line" x1="80" y1="60" x2="200" y2="60" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
    <line id="symF2MpCross1" stroke="#1F3A5C" stroke-width="1.6"/>
    <line id="symF2MpCross2" stroke="#1F3A5C" stroke-width="1.6"/>
    <line id="symF2MCross1" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="symF2MCross2" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="symF2M" cx="80" cy="60" r="11" fill="transparent" style="cursor:grab;"/>
    <text id="symF2MLabel" x="58" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF2MpLabel" x="204" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="145" y="16" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p class="hint" style="text-align:center;margin:4px 0 0;">Déplace le point <b>M</b> (le point bleu).</p>
</div>
<p style="margin:4px 0 0;">M et M' sont situés à la même distance de <b>(d)</b>, de part et d'autre, sur une perpendiculaire à <b>(d)</b>. On compte le nombre de carreaux de M jusqu'à <b>(d)</b>, et on reporte le même nombre de carreaux de l'autre côté de <b>(d)</b>.</p>

<p class="hint" style="margin:16px 0 8px;">Axe en diagonale : on rejoint <b>(d)</b> à l'horizontale en comptant les carreaux, puis on redescend à la verticale en comptant le <b>même nombre</b> de carreaux.</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg id="symF3Svg" viewBox="0 0 200 180" style="width:100%;display:block;">
    <rect x="0" y="0" width="200" height="180" fill="url(#gridSymAxiale)"/>
    <line x1="10" y1="170" x2="190" y2="-10" stroke="#E35D3A" stroke-width="1.4"/>
    <line id="symF3LineH" x1="60" y1="60" x2="120" y2="60" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <line id="symF3LineV" x1="120" y1="60" x2="120" y2="120" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <text id="symF3HCount" x="80" y="52" font-family="JetBrains Mono" font-size="11" fill="#6B7280"></text>
    <text id="symF3VCount" x="127" y="92" font-family="JetBrains Mono" font-size="11" fill="#6B7280"></text>
    <circle id="symF3H" cx="120" cy="60" r="2" fill="#9CA3AF"/>
    <line id="symF3MpCross1" stroke="#1F3A5C" stroke-width="1.6"/>
    <line id="symF3MpCross2" stroke="#1F3A5C" stroke-width="1.6"/>
    <line id="symF3MCross1" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="symF3MCross2" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="symF3M" cx="60" cy="60" r="11" fill="transparent" style="cursor:grab;"/>
    <text id="symF3MLabel" x="38" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text id="symF3MpLabel" x="126" y="128" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="150" y="30" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p class="hint" style="text-align:center;margin:4px 0 0;">Déplace le point <b>M</b> (le point bleu).</p>
</div>
<p style="margin:4px 0 0;">De M, on avance à l'horizontale jusqu'à <b>(d)</b> en comptant les carreaux. À partir de ce point de <b>(d)</b>, on redescend à la verticale en comptant le même nombre de carreaux : on trouve <b>M'</b>.</p>
<div class="def-box" style="margin-top:12px;">
  <p style="margin:0;">Si un point appartient à l'axe de symétrie, alors son symétrique est le point lui-même.</p>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Propriétés de la symétrie axiale</h3></div>

<span class="prop-badge">Propriété 1</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'une droite</p>
<div class="def-box">Le symétrique d'une droite par rapport à un axe est <b>une droite</b>. La symétrie axiale <b>conserve l'alignement</b>.</div>

<span class="prop-badge">Propriété 2</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un segment</p>
<div class="def-box">Le symétrique d'un segment par rapport à un axe est <b>un segment de même longueur</b>. La symétrie axiale <b>conserve les longueurs</b>.</div>
<p class="hint" style="margin:6px 0 0;">Remarque : le symétrique du milieu d'un segment est le milieu du segment symétrique.</p>

<span class="prop-badge">Propriété 3</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un cercle</p>
<div class="def-box">Le symétrique d'un cercle par rapport à un axe est <b>un cercle de même rayon</b>. Les centres de ces cercles sont symétriques par rapport à cet axe.</div>

<span class="prop-badge">Propriété 4</span>
<p style="margin:4px 0 2px;font-weight:700;">Symétrique d'un angle</p>
<div class="def-box">Le symétrique d'un angle est <b>un angle de même mesure</b>. La symétrie axiale <b>conserve les mesures des angles</b>.</div>
<p class="hint" style="margin:6px 0 0;">Remarque : pour construire le symétrique d'une figure complexe, on la décompose en figures usuelles et on construit le symétrique de chacune d'elles.</p>

<p class="example-title" style="margin-top:16px;">Exemples :</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin:10px 0;">
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'une droite</p>
    <svg id="symF4Svg" viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line id="symF4Left" x1="60" y1="40" x2="110" y2="130" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF4Right" x1="220" y1="40" x2="170" y2="130" stroke="#E35D3A" stroke-width="1.8"/>
      <line id="symF4Tick1" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF4Tick2" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle id="symF4P1" cx="60" cy="40" r="11" fill="transparent" style="cursor:grab;"/>
      <circle id="symF4P2" cx="110" cy="130" r="11" fill="transparent" style="cursor:grab;"/>
    </svg>
    <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace les 2 points bleus.</p>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un segment</p>
    <svg id="symF5Svg" viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line id="symF5Left" x1="60" y1="50" x2="100" y2="110" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF5Right" x1="220" y1="50" x2="180" y2="110" stroke="#E35D3A" stroke-width="1.8"/>
      <line id="symF5TickC" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF5TickD" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF5TickCp" stroke="#1F3A5C" stroke-width="1.8"/>
      <line id="symF5TickDp" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle id="symF5C" cx="60" cy="50" r="11" fill="transparent" style="cursor:grab;"/>
      <circle id="symF5D" cx="100" cy="110" r="11" fill="transparent" style="cursor:grab;"/>
      <text id="symF5CLabel" x="48" y="44" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">C</text>
      <text id="symF5DLabel" x="104" y="122" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">D</text>
      <text id="symF5CpLabel" x="224" y="44" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">C'</text>
      <text id="symF5DpLabel" x="160" y="122" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">D'</text>
    </svg>
    <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace les 2 points bleus.</p>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un cercle</p>
    <svg id="symF6Svg" viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line id="symF6Axis" x1="70" y1="80" x2="210" y2="80" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
      <circle id="symF6Left" cx="70" cy="80" r="35" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle id="symF6Right" cx="210" cy="80" r="35" fill="none" stroke="#E35D3A" stroke-width="1.8"/>
      <line id="symF6RightCross1" stroke="#E35D3A" stroke-width="1.4"/>
      <line id="symF6RightCross2" stroke="#E35D3A" stroke-width="1.4"/>
      <line id="symF6LeftCross1" stroke="#1F3A5C" stroke-width="1.6"/>
      <line id="symF6LeftCross2" stroke="#1F3A5C" stroke-width="1.6"/>
      <circle id="symF6LeftCenter" cx="70" cy="80" r="11" fill="transparent" style="cursor:grab;"/>
    </svg>
    <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace le centre bleu.</p>
  </div>
</div>

<div class="lesson-header"><span class="num">4</span><h3>Axe de symétrie d'un segment</h3></div>

<span class="prop-badge">Propriété 1</span>
<div class="def-box">La <b>médiatrice</b> d'un segment est <b>un axe de symétrie</b> de ce segment.</div>

<span class="prop-badge">Propriétés 2</span>
<div class="def-box">
  <ul class="example-list" style="margin:0;">
    <li>Si un point appartient à la médiatrice d'un segment, alors <b>il est situé à égale distance des extrémités</b> de ce segment.</li>
    <li>Réciproquement, si un point est équidistant des extrémités d'un segment, alors <b>il appartient à la médiatrice</b> de ce segment.</li>
  </ul>
</div>
<p class="hint" style="margin:6px 0 0;">Remarque : si un point n'est pas sur la médiatrice d'un segment, alors il est plus proche de l'une des extrémités que de l'autre.</p>

<span class="prop-badge">Propriété 3</span>
<div class="def-box">La médiatrice d'un segment est <b>l'ensemble des points équidistants</b> des extrémités de ce segment.</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg id="symF7Svg" viewBox="0 0 240 170" style="width:100%;display:block;">
    <line x1="120" y1="20" x2="120" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="50" y1="140" x2="190" y2="140" stroke="#1C1B2E" stroke-width="1.8"/>
    <path d="M 108 140 L 108 128 L 120 128 L 120 140" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <line id="symF7PA" x1="50" y1="140" x2="120" y2="50" stroke="#1C1B2E" stroke-width="1"/>
    <line id="symF7PB" x1="190" y1="140" x2="120" y2="50" stroke="#1C1B2E" stroke-width="1"/>
    <line id="symF7TickA" x1="82.9" y1="88.3" x2="87.1" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <line id="symF7TickB" x1="157.1" y1="88.3" x2="152.9" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <line id="symF7PCross1" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="symF7PCross2" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="symF7P" cx="120" cy="50" r="11" fill="transparent" style="cursor:grab;"/>
    <text x="38" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="196" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
    <text id="symF7PLabel" x="126" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">P</text>
    <text x="126" y="18" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
  <p id="symF7Status" class="hint" style="text-align:center;margin:4px 0 0;"></p>
  <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace le point <b>P</b> (le point bleu), sur la médiatrice ou en dehors.</p>
</div>
<p style="margin:4px 0 0;"><b>(d)</b> est la médiatrice de <b>[AB]</b>. Tant que <b>P</b> reste sur <b>(d)</b>, il est équidistant de <b>A</b> et de <b>B</b> : <b>PA = PB</b>.</p>

<div class="lesson-header"><span class="num">5</span><h3>Axe de symétrie d'un angle</h3></div>

<span class="prop-badge">Propriété</span>
<div class="def-box">La <b>bissectrice</b> d'un angle est <b>l'axe de symétrie</b> de cet angle.</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg id="symF8Svg" viewBox="0 0 250 190" style="width:100%;display:block;">
    <line id="symF8RayX" x1="60" y1="170" x2="230" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="symF8RayY" x1="60" y1="170" x2="157.5" y2="30.7" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="symF8Bis" x1="60" y1="170" x2="197.5" y2="98.4" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <path id="symF8Arc1" d="M 92.0 170.0 A 32 32 0 0 0 88.4 155.2" fill="none" stroke="#9CA3AF" stroke-width="1.3"/>
    <path id="symF8Arc2" d="M 88.4 155.2 A 32 32 0 0 0 78.4 143.8" fill="none" stroke="#9CA3AF" stroke-width="1.3"/>
    <line id="symF8TickX" stroke="#1F3A5C" stroke-width="1.8"/>
    <line id="symF8TickY" stroke="#1F3A5C" stroke-width="1.8"/>
    <circle id="symF8X" cx="230" cy="170" r="11" fill="transparent" style="cursor:grab;"/>
    <circle id="symF8Y" cx="157.5" cy="30.7" r="11" fill="transparent" style="cursor:grab;"/>
    <text x="42" y="180" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">O</text>
    <text id="symF8XLabel" x="234" y="176" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text id="symF8YLabel" x="152" y="24" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
  </svg>
  <p class="hint" style="text-align:center;margin:2px 0 0;">Déplace les points <b>A</b> et <b>B</b> (les points bleus).</p>
</div>
<p style="margin:4px 0 0;">La demi-droite (en pointillés), <b>bissectrice</b> de l'angle <span class="tex">\\widehat{AOB}</span>, le partage en deux angles de même mesure.</p>
`;

document.getElementById('methode-demo-symetrie-axiale-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Bissectrice d'un angle au compas</h4></div>
<p class="hint" style="margin:8px 0;">La construction à l'équerre et au rapporteur a déjà été vue dans le chapitre sur les angles. Voici la construction <b>au compas</b>.</p>
<div class="figure-wrap" style="max-width:340px;margin:12px auto;">
  <svg id="bisSvg" viewBox="0 100 280 320" style="width:100%;display:block;">
    <line id="bisRay1" x1="70" y1="300" x2="220" y2="300" stroke="#1C1B2E" stroke-width="1.8"/>
    <line id="bisRay2" x1="70" y1="300" x2="156.0" y2="177.1" stroke="#1C1B2E" stroke-width="1.8"/>
    <polyline id="bisArcO1" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="bisArcO2" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="bisArcP1" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="bisArcP2" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <line id="bisRayFinal" x1="70" y1="300" x2="70" y2="300" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
    <path id="bisAngleArc1" fill="none" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <path id="bisAngleArc2" fill="none" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <line id="bisAngleTick1" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <line id="bisAngleTick2" stroke="#9CA3AF" stroke-width="1.3" opacity="0"/>
    <circle id="bisP1Dot" cx="160" cy="300" r="2" fill="#1C1B2E" opacity="0"/>
    <circle id="bisP2Dot" cx="121.6" cy="226.3" r="2" fill="#1C1B2E" opacity="0"/>
    <g id="bisCompass" transform="translate(70,300)" opacity="0"></g>
    <g id="bisRulerTool" opacity="0"></g>
    <g id="bisPencilTool" opacity="0"></g>
    <text x="52" y="312" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">O</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>Prendre un écartement au compas quelconque.</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Piquer au sommet de l'angle et intercepter les deux côtés (deux petits arcs, sans les joindre).</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>Piquer sur chaque point d'intersection : construire deux arcs de cercle de même écartement, qui se coupent.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>Finir à la règle et au crayon : tracer la demi-droite depuis le sommet, en passant par ce point.</div></div>
    <div class="step-item" data-step="5"><div class="step-num">5</div><div>Coder les deux angles obtenus : ils sont égaux.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnBisNext" onclick="bisNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="bisReset()">Revoir depuis le début</button>
  </div>
</div>

<div class="sub-header" style="margin-top:28px;"><span class="letter">M</span><h4>Médiatrice d'un segment au compas</h4></div>
<p class="hint" style="margin:8px 0;">Une seconde méthode, avec le compas plutôt qu'à la règle et à l'équerre.</p>
<div class="figure-wrap" style="max-width:320px;margin:12px auto;">
  <svg id="medSvg" viewBox="0 190 250 220" style="width:100%;display:block;">
    <line id="medSegAB" x1="50" y1="300" x2="190" y2="300" stroke="#1C1B2E" stroke-width="1.8"/>
    <polyline id="medArcA1" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="medArcA2" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="medArcB1" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <polyline id="medArcB2" fill="none" stroke="#1C1B2E" stroke-width="1.6" opacity="0"/>
    <line id="medLine" x1="120" y1="300" x2="120" y2="300" stroke="#E35D3A" stroke-width="1.8" opacity="0"/>
    <path id="medRightAngle" d="M 110 300 L 110 290 L 120 290 L 120 300" fill="none" stroke="#9CA3AF" stroke-width="1.1" opacity="0"/>
    <circle id="medMidCircle" cx="120" cy="300" r="3.2" fill="none" stroke="#1C1B2E" stroke-width="1.2" opacity="0"/>
    <circle id="medQ1Dot" cx="120" cy="371.4" r="2" fill="#1C1B2E" opacity="0"/>
    <circle id="medQ2Dot" cx="120" cy="228.6" r="2" fill="#1C1B2E" opacity="0"/>
    <g id="medCompass" transform="translate(50,300)" opacity="0"></g>
    <g id="medRulerTool" opacity="0"></g>
    <g id="medPencilTool" opacity="0"></g>
    <text x="38" y="312" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="196" y="312" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
  </svg>
  <div class="step-list">
    <div class="step-item" data-step="1"><div class="step-num">1</div><div>Piquer en A avec un écartement supérieur à la moitié de [AB] : tracer un arc de chaque côté de [AB].</div></div>
    <div class="step-item" data-step="2"><div class="step-num">2</div><div>Piquer en B avec le <b>même écartement</b> : tracer deux arcs qui recoupent les précédents.</div></div>
    <div class="step-item" data-step="3"><div class="step-num">3</div><div>Tracer, à la règle, la droite passant par les deux points d'intersection : c'est la médiatrice.</div></div>
    <div class="step-item" data-step="4"><div class="step-num">4</div><div>Coder le milieu de [AB] et l'angle droit.</div></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" id="btnMedNext" onclick="medNextStep()">Étape suivante →</button>
    <button class="btn secondary" onclick="medReset()">Revoir depuis le début</button>
  </div>
</div>
`;

document.getElementById('exos-demo-symetrie-axiale-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

/* ================= Figure 1 : vrai pliage le long de (d) (figures symétriques) =================
   Le groupe de droite est DÉJÀ positionné à sa forme finale correcte (miroir de la gauche). On
   anime seulement son transform : un second miroir (scaleX=-1 autour de l'axe) ramène exactement
   sur la forme de gauche (état "plié", superposé) -- verifié numériquement avant integration.
   Animer scaleX de -1 à 1 donne donc un vrai effet de pliage le long de (d), pas un simple
   glissement. */
const symF1_axisX = 140;
function symF1SetFold(sx){
  document.getElementById('symF1RightGroup').setAttribute('transform', `translate(${symF1_axisX},0) scale(${sx},1) translate(${-symF1_axisX},0)`);
}
function symF1Reset(){ symF1SetFold(1); }
function symF1Fold(){
  symF1SetFold(-1); // repart plié (superposé sur la gauche)
  const start = performance.now(), dur=1400;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    symF1SetFold(-1+2*t);
    if(t<1){ requestAnimationFrame(frame); }
  }
  requestAnimationFrame(frame);
}

/* ================= Figure 2 : symétrique d'un point, axe vertical (point M déplaçable) ================= */
const symF2_axisX = 140;
let symF2_M = {x:80, y:60};
function symF2Update(){
  const svgEl = document.getElementById('symF2Svg');
  const Mp = {x: 2*symF2_axisX - symF2_M.x, y: symF2_M.y};
  svgEl.querySelector('#symF2M').setAttribute('cx', symF2_M.x); svgEl.querySelector('#symF2M').setAttribute('cy', symF2_M.y);
  setCross(svgEl.querySelector('#symF2MCross1'), svgEl.querySelector('#symF2MCross2'), symF2_M.x, symF2_M.y, 6);
  setCross(svgEl.querySelector('#symF2MpCross1'), svgEl.querySelector('#symF2MpCross2'), Mp.x, Mp.y, 5);
  svgEl.querySelector('#symF2Line').setAttribute('x1', symF2_M.x); svgEl.querySelector('#symF2Line').setAttribute('y1', symF2_M.y);
  svgEl.querySelector('#symF2Line').setAttribute('x2', Mp.x); svgEl.querySelector('#symF2Line').setAttribute('y2', Mp.y);
  svgEl.querySelector('#symF2MLabel').setAttribute('x', symF2_M.x-22); svgEl.querySelector('#symF2MLabel').setAttribute('y', symF2_M.y<20?symF2_M.y+22:symF2_M.y-8);
  svgEl.querySelector('#symF2MpLabel').setAttribute('x', Mp.x+10); svgEl.querySelector('#symF2MpLabel').setAttribute('y', Mp.y<20?Mp.y+22:Mp.y-8);
}
let symF2_initialized = false;
function symF2Init(){
  symF2_M = {x:80, y:60};
  symF2Update();
  if(symF2_initialized) return; // évite d'empiler les écouteurs si le chapitre est réouvert
  symF2_initialized = true;
  const svgEl = document.getElementById('symF2Svg');
  const handle = svgEl.querySelector('#symF2M');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    symF2_M.x = Math.max(10, Math.min(250, Math.round(p.x/20)*20));
    symF2_M.y = Math.max(10, Math.min(130, Math.round(p.y/20)*20));
    symF2Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
}

/* ================= Figure 3 : symétrique d'un point, axe diagonal (point M déplaçable) ================= */
const symF3_axisP1 = {x:10,y:170}, symF3_axisP2 = {x:190,y:-10};
let symF3_M = {x:60, y:60};
function symF3ReflectAcrossAxis(p){
  const dx = symF3_axisP2.x-symF3_axisP1.x, dy = symF3_axisP2.y-symF3_axisP1.y;
  const len2 = dx*dx+dy*dy;
  const t = ((p.x-symF3_axisP1.x)*dx+(p.y-symF3_axisP1.y)*dy)/len2;
  const proj = {x:symF3_axisP1.x+t*dx, y:symF3_axisP1.y+t*dy};
  return {x:2*proj.x-p.x, y:2*proj.y-p.y};
}
function symF3Update(){
  const svgEl = document.getElementById('symF3Svg');
  const M = symF3_M;
  const Mp = symF3ReflectAcrossAxis(M);
  // H : croisement horizontal (même y que M) avec l'axe -- axe de pente -1, donc H.x = M.x + (H.y_axis - M.y) ; plus simple : reprendre l'intersection directe.
  const dx = symF3_axisP2.x-symF3_axisP1.x, dy = symF3_axisP2.y-symF3_axisP1.y;
  const tH = (M.y-symF3_axisP1.y)/dy;
  const H = {x: symF3_axisP1.x+tH*dx, y: M.y};
  svgEl.querySelector('#symF3M').setAttribute('cx', M.x); svgEl.querySelector('#symF3M').setAttribute('cy', M.y);
  setCross(svgEl.querySelector('#symF3MCross1'), svgEl.querySelector('#symF3MCross2'), M.x, M.y, 6);
  setCross(svgEl.querySelector('#symF3MpCross1'), svgEl.querySelector('#symF3MpCross2'), Mp.x, Mp.y, 5);
  svgEl.querySelector('#symF3H').setAttribute('cx', H.x.toFixed(1)); svgEl.querySelector('#symF3H').setAttribute('cy', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineH').setAttribute('x1', M.x); svgEl.querySelector('#symF3LineH').setAttribute('y1', M.y);
  svgEl.querySelector('#symF3LineH').setAttribute('x2', H.x.toFixed(1)); svgEl.querySelector('#symF3LineH').setAttribute('y2', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineV').setAttribute('x1', H.x.toFixed(1)); svgEl.querySelector('#symF3LineV').setAttribute('y1', H.y.toFixed(1));
  svgEl.querySelector('#symF3LineV').setAttribute('x2', Mp.x.toFixed(1)); svgEl.querySelector('#symF3LineV').setAttribute('y2', Mp.y.toFixed(1));
  const nbCarreaux = Math.round(Math.abs(H.x-M.x)/20);
  svgEl.querySelector('#symF3HCount').textContent = nbCarreaux+' carreau'+(nbCarreaux>1?'x':'');
  svgEl.querySelector('#symF3HCount').setAttribute('x', (M.x+H.x)/2-14); svgEl.querySelector('#symF3HCount').setAttribute('y', M.y-6);
  svgEl.querySelector('#symF3VCount').textContent = nbCarreaux+' carreau'+(nbCarreaux>1?'x':'');
  svgEl.querySelector('#symF3VCount').setAttribute('x', H.x+8); svgEl.querySelector('#symF3VCount').setAttribute('y', (H.y+Mp.y)/2+4);
  svgEl.querySelector('#symF3MLabel').setAttribute('x', M.x-22); svgEl.querySelector('#symF3MLabel').setAttribute('y', M.y-8);
  svgEl.querySelector('#symF3MpLabel').setAttribute('x', Mp.x+8); svgEl.querySelector('#symF3MpLabel').setAttribute('y', Mp.y+18);
}
let symF3_initialized = false;
function symF3Init(){
  symF3_M = {x:60, y:60};
  symF3Update();
  if(symF3_initialized) return;
  symF3_initialized = true;
  const svgEl = document.getElementById('symF3Svg');
  const handle = svgEl.querySelector('#symF3M');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    const gx = Math.max(0, Math.min(180, Math.round(p.x/20)*20));
    const gy = Math.max(0, Math.min(160, Math.round(p.y/20)*20));
    symF3_M = {x:gx, y:gy};
    symF3Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
}

/* ================= Figure 4 : symétrique d'une droite (2 points déplaçables) ================= */
const symF4_axisX = 140;
let symF4_P1 = {x:60,y:40}, symF4_P2 = {x:110,y:130};
function symF4Update(){
  const svgEl = document.getElementById('symF4Svg');
  svgEl.querySelector('#symF4P1').setAttribute('cx', symF4_P1.x); svgEl.querySelector('#symF4P1').setAttribute('cy', symF4_P1.y);
  svgEl.querySelector('#symF4P2').setAttribute('cx', symF4_P2.x); svgEl.querySelector('#symF4P2').setAttribute('cy', symF4_P2.y);
  const dx = symF4_P2.x-symF4_P1.x, dy = symF4_P2.y-symF4_P1.y;
  const len = Math.max(1, Math.hypot(dx,dy));
  const ux = dx/len, uy = dy/len, overshoot = 18;
  const lineAngle = Math.atan2(dy,dx);
  setTick(svgEl.querySelector('#symF4Tick1'), symF4_P1.x, symF4_P1.y, lineAngle, 16);
  setTick(svgEl.querySelector('#symF4Tick2'), symF4_P2.x, symF4_P2.y, lineAngle, 16);
  const start = {x:symF4_P1.x-ux*overshoot, y:symF4_P1.y-uy*overshoot};
  const end = {x:symF4_P2.x+ux*overshoot, y:symF4_P2.y+uy*overshoot};
  svgEl.querySelector('#symF4Left').setAttribute('x1', start.x.toFixed(1)); svgEl.querySelector('#symF4Left').setAttribute('y1', start.y.toFixed(1));
  svgEl.querySelector('#symF4Left').setAttribute('x2', end.x.toFixed(1)); svgEl.querySelector('#symF4Left').setAttribute('y2', end.y.toFixed(1));
  const startP = {x:2*symF4_axisX-start.x, y:start.y}, endP = {x:2*symF4_axisX-end.x, y:end.y};
  svgEl.querySelector('#symF4Right').setAttribute('x1', startP.x.toFixed(1)); svgEl.querySelector('#symF4Right').setAttribute('y1', startP.y.toFixed(1));
  svgEl.querySelector('#symF4Right').setAttribute('x2', endP.x.toFixed(1)); svgEl.querySelector('#symF4Right').setAttribute('y2', endP.y.toFixed(1));
}
let symF4_initialized = false;
function symF4Init(){
  symF4_P1 = {x:60,y:40}; symF4_P2 = {x:110,y:130};
  symF4Update();
  if(symF4_initialized) return;
  symF4_initialized = true;
  const svgEl = document.getElementById('symF4Svg');
  function makeDraggable(handle, getPt, setPt){
    let dragging = false;
    const start = e=>{ dragging=true; e.preventDefault(); };
    const move = e=>{ if(!dragging) return; const p=svgPointFromEvent(svgEl,e); setPt({x:Math.max(5,Math.min(275,p.x)), y:Math.max(5,Math.min(155,p.y))}); symF4Update(); };
    const end = ()=>dragging=false;
    handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
    handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
  }
  makeDraggable(svgEl.querySelector('#symF4P1'), ()=>symF4_P1, p=>symF4_P1=p);
  makeDraggable(svgEl.querySelector('#symF4P2'), ()=>symF4_P2, p=>symF4_P2=p);
}

/* ================= Figure 5 : symétrique d'un segment (C, D déplaçables) ================= */
const symF5_axisX = 140;
let symF5_C = {x:60,y:50}, symF5_D = {x:100,y:110};
function symF5Update(){
  const svgEl = document.getElementById('symF5Svg');
  const Cp = {x:2*symF5_axisX-symF5_C.x, y:symF5_C.y}, Dp = {x:2*symF5_axisX-symF5_D.x, y:symF5_D.y};
  svgEl.querySelector('#symF5C').setAttribute('cx', symF5_C.x); svgEl.querySelector('#symF5C').setAttribute('cy', symF5_C.y);
  svgEl.querySelector('#symF5D').setAttribute('cx', symF5_D.x); svgEl.querySelector('#symF5D').setAttribute('cy', symF5_D.y);
  const angleLeft = Math.atan2(symF5_D.y-symF5_C.y, symF5_D.x-symF5_C.x);
  const angleRight = Math.atan2(Dp.y-Cp.y, Dp.x-Cp.x);
  setTick(svgEl.querySelector('#symF5TickC'), symF5_C.x, symF5_C.y, angleLeft, 14);
  setTick(svgEl.querySelector('#symF5TickD'), symF5_D.x, symF5_D.y, angleLeft, 14);
  setTick(svgEl.querySelector('#symF5TickCp'), Cp.x, Cp.y, angleRight, 14);
  setTick(svgEl.querySelector('#symF5TickDp'), Dp.x, Dp.y, angleRight, 14);
  svgEl.querySelector('#symF5Left').setAttribute('x1', symF5_C.x); svgEl.querySelector('#symF5Left').setAttribute('y1', symF5_C.y);
  svgEl.querySelector('#symF5Left').setAttribute('x2', symF5_D.x); svgEl.querySelector('#symF5Left').setAttribute('y2', symF5_D.y);
  svgEl.querySelector('#symF5Right').setAttribute('x1', Cp.x); svgEl.querySelector('#symF5Right').setAttribute('y1', Cp.y);
  svgEl.querySelector('#symF5Right').setAttribute('x2', Dp.x); svgEl.querySelector('#symF5Right').setAttribute('y2', Dp.y);
  svgEl.querySelector('#symF5CLabel').setAttribute('x', symF5_C.x-12); svgEl.querySelector('#symF5CLabel').setAttribute('y', symF5_C.y-6);
  svgEl.querySelector('#symF5DLabel').setAttribute('x', symF5_D.x+4); svgEl.querySelector('#symF5DLabel').setAttribute('y', symF5_D.y+12);
  svgEl.querySelector('#symF5CpLabel').setAttribute('x', Cp.x+4); svgEl.querySelector('#symF5CpLabel').setAttribute('y', Cp.y-6);
  svgEl.querySelector('#symF5DpLabel').setAttribute('x', Dp.x-20); svgEl.querySelector('#symF5DpLabel').setAttribute('y', Dp.y+12);
}
let symF5_initialized = false;
function symF5Init(){
  symF5_C = {x:60,y:50}; symF5_D = {x:100,y:110};
  symF5Update();
  if(symF5_initialized) return;
  symF5_initialized = true;
  const svgEl = document.getElementById('symF5Svg');
  function makeDraggable(handle, getPt, setPt){
    let dragging = false;
    const start = e=>{ dragging=true; e.preventDefault(); };
    const move = e=>{ if(!dragging) return; const p=svgPointFromEvent(svgEl,e); setPt({x:Math.max(5,Math.min(275,p.x)), y:Math.max(5,Math.min(155,p.y))}); symF5Update(); };
    const end = ()=>dragging=false;
    handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
    handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
  }
  makeDraggable(svgEl.querySelector('#symF5C'), ()=>symF5_C, p=>symF5_C=p);
  makeDraggable(svgEl.querySelector('#symF5D'), ()=>symF5_D, p=>symF5_D=p);
}

/* ================= Figure 6 : symétrique d'un cercle (centre déplaçable) ================= */
const symF6_axisX = 140, symF6_R = 35;
let symF6_Center = {x:70,y:80};
function symF6Update(){
  const svgEl = document.getElementById('symF6Svg');
  const Cp = {x:2*symF6_axisX-symF6_Center.x, y:symF6_Center.y};
  svgEl.querySelector('#symF6LeftCenter').setAttribute('cx', symF6_Center.x); svgEl.querySelector('#symF6LeftCenter').setAttribute('cy', symF6_Center.y);
  svgEl.querySelector('#symF6Left').setAttribute('cx', symF6_Center.x); svgEl.querySelector('#symF6Left').setAttribute('cy', symF6_Center.y);
  svgEl.querySelector('#symF6Right').setAttribute('cx', Cp.x); svgEl.querySelector('#symF6Right').setAttribute('cy', Cp.y);
  setCross(svgEl.querySelector('#symF6LeftCross1'), svgEl.querySelector('#symF6LeftCross2'), symF6_Center.x, symF6_Center.y, 6);
  setCross(svgEl.querySelector('#symF6RightCross1'), svgEl.querySelector('#symF6RightCross2'), Cp.x, Cp.y, 5);
  svgEl.querySelector('#symF6Axis').setAttribute('x1', symF6_Center.x); svgEl.querySelector('#symF6Axis').setAttribute('y1', symF6_Center.y);
  svgEl.querySelector('#symF6Axis').setAttribute('x2', Cp.x); svgEl.querySelector('#symF6Axis').setAttribute('y2', Cp.y);
}
let symF6_initialized = false;
function symF6Init(){
  symF6_Center = {x:70,y:80};
  symF6Update();
  if(symF6_initialized) return;
  symF6_initialized = true;
  const svgEl = document.getElementById('symF6Svg');
  const handle = svgEl.querySelector('#symF6LeftCenter');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl,e);
    symF6_Center = {x:Math.max(symF6_R+5,Math.min(280-symF6_R-5,p.x)), y:Math.max(symF6_R+5,Math.min(160-symF6_R-5,p.y))};
    symF6Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
  handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
}

/* ================= Figure 7 : médiatrice (point P déplaçable librement) ================= */
const symF7_A = {x:50,y:140}, symF7_B = {x:190,y:140}, symF7_axisX = 120;
let symF7_P = {x:120, y:50};
function symF7Update(){
  const svgEl = document.getElementById('symF7Svg');
  const P = symF7_P;
  svgEl.querySelector('#symF7P').setAttribute('cx', P.x); svgEl.querySelector('#symF7P').setAttribute('cy', P.y);
  setCross(svgEl.querySelector('#symF7PCross1'), svgEl.querySelector('#symF7PCross2'), P.x, P.y, 6);
  svgEl.querySelector('#symF7PA').setAttribute('x1', symF7_A.x); svgEl.querySelector('#symF7PA').setAttribute('y1', symF7_A.y);
  svgEl.querySelector('#symF7PA').setAttribute('x2', P.x); svgEl.querySelector('#symF7PA').setAttribute('y2', P.y);
  svgEl.querySelector('#symF7PB').setAttribute('x1', symF7_B.x); svgEl.querySelector('#symF7PB').setAttribute('y1', symF7_B.y);
  svgEl.querySelector('#symF7PB').setAttribute('x2', P.x); svgEl.querySelector('#symF7PB').setAttribute('y2', P.y);
  svgEl.querySelector('#symF7PLabel').setAttribute('x', P.x+10); svgEl.querySelector('#symF7PLabel').setAttribute('y', P.y<20?P.y+18:P.y-8);
  const PA = Math.hypot(P.x-symF7_A.x, P.y-symF7_A.y), PB = Math.hypot(P.x-symF7_B.x, P.y-symF7_B.y);
  const onAxis = Math.abs(P.x-symF7_axisX) < 4;
  const tickA = svgEl.querySelector('#symF7TickA'), tickB = svgEl.querySelector('#symF7TickB');
  tickA.setAttribute('opacity', onAxis?'1':'0'); tickB.setAttribute('opacity', onAxis?'1':'0');
  if(onAxis){
    const angleA = Math.atan2(P.y-symF7_A.y, P.x-symF7_A.x), angleB = Math.atan2(P.y-symF7_B.y, P.x-symF7_B.x);
    const midA = {x:(symF7_A.x+P.x)/2, y:(symF7_A.y+P.y)/2}, midB = {x:(symF7_B.x+P.x)/2, y:(symF7_B.y+P.y)/2};
    // A et B sont de part et d'autre de l'axe : le codage doit être en vrai reflet miroir (comme
    // pour le triangle isocèle), donc un signe OPPOSÉ pour chaque côté -- setSlantTick n'ajoute
    // qu'un décalage fixe (+65°), on calcule ici la version en miroir (-65°) pour B.
    setSlantTick(tickA, midA.x, midA.y, angleA, 14);
    const tiltB = angleB - 65*Math.PI/180;
    const dxB = Math.cos(tiltB)*14/2, dyB = Math.sin(tiltB)*14/2;
    tickB.setAttribute('x1', midB.x-dxB); tickB.setAttribute('y1', midB.y-dyB);
    tickB.setAttribute('x2', midB.x+dxB); tickB.setAttribute('y2', midB.y+dyB);
  }
  const status = document.getElementById('symF7Status');
  if(onAxis){
    status.innerHTML = '<b>P</b> est sur la médiatrice : <b>PA = PB</b>.';
  } else {
    status.innerHTML = '<b>P</b> n\'est pas sur la médiatrice : <b>PA ≠ PB</b>, plus proche de <b>'+(PA<PB?'A':'B')+'</b>.';
  }
}
let symF7_initialized = false;
function symF7Init(){
  symF7_P = {x:120, y:50};
  symF7Update();
  if(symF7_initialized) return;
  symF7_initialized = true;
  const svgEl = document.getElementById('symF7Svg');
  const handle = svgEl.querySelector('#symF7P');
  let dragging = false;
  const start = e=>{ dragging=true; e.preventDefault(); };
  const move = e=>{
    if(!dragging) return;
    const p = svgPointFromEvent(svgEl, e);
    symF7_P = {x: Math.max(20,Math.min(220,p.x)), y: Math.max(20,Math.min(135,p.y))};
    symF7Update();
  };
  const end = ()=>dragging=false;
  handle.onmousedown = start; window.addEventListener('mousemove', move); window.addEventListener('mouseup', end);
  handle.ontouchstart = start; svgEl.addEventListener('touchmove', move, {passive:false}); svgEl.addEventListener('touchend', end);
}

/* ================= Figure 8 : bissectrice (points x et y déplaçables) ================= */
const symF8_O = {x:60,y:170};
let symF8_X = {x:230,y:170}, symF8_Y = {x:157.5,y:30.7};
function symF8Update(){
  const svgEl = document.getElementById('symF8Svg');
  const angleX = Math.atan2(symF8_X.y-symF8_O.y, symF8_X.x-symF8_O.x);
  const angleY = Math.atan2(symF8_Y.y-symF8_O.y, symF8_Y.x-symF8_O.x);
  const overshoot = 18;
  const rayXEnd = {x:symF8_X.x+overshoot*Math.cos(angleX), y:symF8_X.y+overshoot*Math.sin(angleX)};
  const rayYEnd = {x:symF8_Y.x+overshoot*Math.cos(angleY), y:symF8_Y.y+overshoot*Math.sin(angleY)};
  svgEl.querySelector('#symF8RayX').setAttribute('x2', rayXEnd.x.toFixed(1)); svgEl.querySelector('#symF8RayX').setAttribute('y2', rayXEnd.y.toFixed(1));
  svgEl.querySelector('#symF8RayY').setAttribute('x2', rayYEnd.x.toFixed(1)); svgEl.querySelector('#symF8RayY').setAttribute('y2', rayYEnd.y.toFixed(1));
  setTick(svgEl.querySelector('#symF8TickX'), symF8_X.x, symF8_X.y, angleX, 16);
  setTick(svgEl.querySelector('#symF8TickY'), symF8_Y.x, symF8_Y.y, angleY, 16);
  svgEl.querySelector('#symF8X').setAttribute('cx', symF8_X.x); svgEl.querySelector('#symF8X').setAttribute('cy', symF8_X.y);
  svgEl.querySelector('#symF8Y').setAttribute('cx', symF8_Y.x); svgEl.querySelector('#symF8Y').setAttribute('cy', symF8_Y.y);
  svgEl.querySelector('#symF8XLabel').setAttribute('x', symF8_X.x+4); svgEl.querySelector('#symF8XLabel').setAttribute('y', symF8_X.y+6);
  svgEl.querySelector('#symF8YLabel').setAttribute('x', symF8_Y.x-6); svgEl.querySelector('#symF8YLabel').setAttribute('y', symF8_Y.y-8);

  let diff = angleY-angleX;
  while(diff>Math.PI) diff-=2*Math.PI;
  while(diff<-Math.PI) diff+=2*Math.PI;
  const bisAngle = angleX+diff/2;
  const bisLen = 140;
  const bisEnd = {x:symF8_O.x+bisLen*Math.cos(bisAngle), y:symF8_O.y+bisLen*Math.sin(bisAngle)};
  svgEl.querySelector('#symF8Bis').setAttribute('x2', bisEnd.x.toFixed(1)); svgEl.querySelector('#symF8Bis').setAttribute('y2', bisEnd.y.toFixed(1));

  const r=32;
  function arcPt(a){ return {x:symF8_O.x+r*Math.cos(a), y:symF8_O.y+r*Math.sin(a)}; }
  const pX=arcPt(angleX), pBis=arcPt(bisAngle), pY=arcPt(angleY);
  const sweep = diff>=0 ? 1 : 0;
  svgEl.querySelector('#symF8Arc1').setAttribute('d', `M ${pX.x.toFixed(1)} ${pX.y.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${pBis.x.toFixed(1)} ${pBis.y.toFixed(1)}`);
  svgEl.querySelector('#symF8Arc2').setAttribute('d', `M ${pBis.x.toFixed(1)} ${pBis.y.toFixed(1)} A ${r} ${r} 0 0 ${sweep} ${pY.x.toFixed(1)} ${pY.y.toFixed(1)}`);
}
let symF8_initialized = false;
function symF8Init(){
  symF8_X = {x:230,y:170}; symF8_Y = {x:157.5,y:30.7};
  symF8Update();
  if(symF8_initialized) return;
  symF8_initialized = true;
  const svgEl = document.getElementById('symF8Svg');
  function makeDraggable(handle, setPt){
    let dragging = false;
    const start = e=>{ dragging=true; e.preventDefault(); };
    const move = e=>{
      if(!dragging) return;
      const p = svgPointFromEvent(svgEl,e);
      // on garde le point à une distance raisonnable de O, pour que les rayons restent bien visibles
      const dx=p.x-symF8_O.x, dy=p.y-symF8_O.y;
      const dist = Math.max(60, Math.min(180, Math.hypot(dx,dy)));
      const angle = Math.atan2(dy,dx);
      setPt({x:symF8_O.x+dist*Math.cos(angle), y:symF8_O.y+dist*Math.sin(angle)});
      symF8Update();
    };
    const end = ()=>dragging=false;
    handle.onmousedown=start; window.addEventListener('mousemove',move); window.addEventListener('mouseup',end);
    handle.ontouchstart=start; svgEl.addEventListener('touchmove',move,{passive:false}); svgEl.addEventListener('touchend',end);
  }
  makeDraggable(svgEl.querySelector('#symF8X'), p=>symF8_X=p);
  makeDraggable(svgEl.querySelector('#symF8Y'), p=>symF8_Y=p);
}

/* ================= Constructions au compas : helpers génériques =================
   Repris du même principe que G5 (fenêtre d'encre autour de la cible, balayage réel du
   compas), avec deux variantes : une fenêtre unique (comme G5), et une double fenêtre
   pour "intercepter sans joindre" (deux petits arcs distincts pendant UN même balayage
   continu, avec un blanc entre les deux). */
function methodOpenInPlace(opts){
  const {compassEl, anchor, angleDeg, radius, legLen, dur, onDone} = opts;
  const start = performance.now(), startRadius = 6;
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const ease = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const curRadius = startRadius + (radius-startRadius)*ease;
    compassEl.innerHTML = compassSVG(curRadius, legLen);
    compassEl.setAttribute('transform', `translate(${anchor.x},${anchor.y}) rotate(${angleDeg})`);
    compassEl.setAttribute('opacity','1');
    if(t<1){ requestAnimationFrame(frame); return; }
    compassEl.innerHTML = compassSVG(radius, legLen);
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}
function methodSweepSingle(opts){
  const {compassEl, arcEl, anchor, radius, legLen, startAngleDeg, targetAngleDeg, dur, halfWindowDeg, onDone} = opts;
  const startRad = startAngleDeg*Math.PI/180, targetRad = targetAngleDeg*Math.PI/180;
  const sweepRad = targetRad-startRad;
  const hw = (halfWindowDeg||10)*Math.PI/180*Math.sign(sweepRad||1);
  const winStart = targetRad-hw, totalSweep = sweepRad+hw;
  const start = performance.now();
  function pointOnArc(a){ return {x:anchor.x+radius*Math.cos(a), y:anchor.y+radius*Math.sin(a)}; }
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const angle = startRad + t*totalSweep;
    const entered = Math.sign(sweepRad||1)>0 ? angle>=winStart : angle<=winStart;
    if(entered){
      const pts=[]; const step=Math.PI/60*Math.sign(totalSweep||1);
      for(let a=winStart; Math.sign(totalSweep||1)>0 ? a<=angle+1e-6 : a>=angle-1e-6; a+=step){
        const p=pointOnArc(a); pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
      }
      arcEl.setAttribute('points', pts.join(' ')); arcEl.setAttribute('opacity','1');
    }
    compassEl.setAttribute('transform', `translate(${anchor.x},${anchor.y}) rotate(${(angle*180/Math.PI).toFixed(2)})`);
    compassEl.setAttribute('opacity','1');
    if(t<1){ requestAnimationFrame(frame); return; }
    compassEl.setAttribute('opacity','0');
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}
function methodSweepDual(opts){
  const {compassEl, arc1El, arc2El, anchor, radius, legLen, sweepStartDeg, sweepEndDeg, window1Deg, window2Deg, halfWindowDeg, dur, onDone} = opts;
  const startRad = sweepStartDeg*Math.PI/180, endRad = sweepEndDeg*Math.PI/180;
  const totalSweep = endRad-startRad, dir = Math.sign(totalSweep||1);
  const hw = (halfWindowDeg||10)*Math.PI/180;
  const w1 = window1Deg*Math.PI/180, w2 = window2Deg*Math.PI/180;
  const start = performance.now();
  function pointOnArc(a){ return {x:anchor.x+radius*Math.cos(a), y:anchor.y+radius*Math.sin(a)}; }
  function updateWindow(arcEl, windowCenter, curAngle){
    const winStart = windowCenter - hw*dir;
    const entered = dir>0 ? curAngle>=winStart : curAngle<=winStart;
    if(!entered) return;
    const winEnd = windowCenter + hw*dir;
    const clipped = dir>0 ? Math.min(curAngle,winEnd) : Math.max(curAngle,winEnd);
    const pts=[]; const step=Math.PI/60*dir;
    for(let a=winStart; dir>0 ? a<=clipped+1e-6 : a>=clipped-1e-6; a+=step){
      const p=pointOnArc(a); pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    arcEl.setAttribute('points', pts.join(' ')); arcEl.setAttribute('opacity','1');
  }
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const angle = startRad + t*totalSweep;
    updateWindow(arc1El, w1, angle);
    updateWindow(arc2El, w2, angle);
    compassEl.setAttribute('transform', `translate(${anchor.x},${anchor.y}) rotate(${(angle*180/Math.PI).toFixed(2)})`);
    compassEl.setAttribute('opacity','1');
    if(t<1){ requestAnimationFrame(frame); return; }
    compassEl.setAttribute('opacity','0');
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}

function methodMoveKeepRadius(opts){
  const {compassEl, fromAnchor, fromAngleDeg, toAnchor, toAngleDeg, radius, legLen, dur, onDone} = opts;
  compassEl.innerHTML = compassSVG(radius, legLen);
  const start = performance.now();
  function frame(now){
    const t = Math.min(1,(now-start)/dur);
    const ease = t<0.5 ? 2*t*t : 1-Math.pow(-2*t+2,2)/2;
    const curX = fromAnchor.x+(toAnchor.x-fromAnchor.x)*ease, curY = fromAnchor.y+(toAnchor.y-fromAnchor.y)*ease;
    const curAngle = fromAngleDeg+(toAngleDeg-fromAngleDeg)*ease;
    compassEl.setAttribute('transform', `translate(${curX.toFixed(1)},${curY.toFixed(1)}) rotate(${curAngle.toFixed(2)})`);
    compassEl.setAttribute('opacity','1');
    if(t<1){ requestAnimationFrame(frame); return; }
    if(onDone) onDone();
  }
  requestAnimationFrame(frame);
}

/* ================= Bissectrice au compas ================= */
const BIS_O = {x:70,y:300};
const BIS_RADIUS = 90, BIS_LEGLEN = 0.7*BIS_RADIUS+30;
const BIS_P1 = {x:160,y:300}, BIS_P2 = {x:121.6,y:226.3};
const BIS_Q = {x:211.62,y:226.28};
let bisStep = 0;
function bisReset(){
  bisStep = 0;
  ['bisArcO1','bisArcO2','bisArcP1','bisArcP2','bisRayFinal','bisAngleArc1','bisAngleArc2','bisAngleTick1','bisAngleTick2','bisP1Dot','bisP2Dot','bisCompass','bisRulerTool','bisPencilTool'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.querySelectorAll('#bisSvg + .step-list .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnBisNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function bisSetRulerAt(origin, angleDeg){
  document.getElementById('bisRulerTool').setAttribute('transform', `translate(${origin.x.toFixed(1)},${origin.y.toFixed(1)}) rotate(${angleDeg.toFixed(2)}) scale(0.62)`);
}
function bisSetPencilAt(x,y,angleDeg){
  document.getElementById('bisPencilTool').setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angleDeg-90+8).toFixed(1)}) scale(0.62)`);
}
document.getElementById('bisRulerTool').innerHTML = rulerSVG(false);
document.getElementById('bisPencilTool').innerHTML = pencilSVG('bis-pencil');
function bisNextStep(){
  bisStep++;
  const btn = document.getElementById('btnBisNext');
  btn.disabled = true;
  const markDone = n=>document.querySelector(`#bisSvg + .step-list .step-item[data-step="${n}"]`).classList.add('done');
  if(bisStep===1){
    methodOpenInPlace({compassEl:document.getElementById('bisCompass'), anchor:BIS_O, angleDeg:10, radius:BIS_RADIUS, legLen:BIS_LEGLEN, dur:700,
      onDone:()=>{ markDone(1); btn.disabled=false; }});
  } else if(bisStep===2){
    methodSweepDual({compassEl:document.getElementById('bisCompass'), arc1El:document.getElementById('bisArcO1'), arc2El:document.getElementById('bisArcO2'),
      anchor:BIS_O, radius:BIS_RADIUS, legLen:BIS_LEGLEN, sweepStartDeg:10, sweepEndDeg:-65, window1Deg:0, window2Deg:-55, halfWindowDeg:10, dur:1400,
      onDone:()=>{
        document.getElementById('bisP1Dot').setAttribute('opacity','1');
        document.getElementById('bisP2Dot').setAttribute('opacity','1');
        markDone(2); btn.disabled=false;
      }});
  } else if(bisStep===3){
    // Même écartement du début à la fin : on déplace le compas (sans le refermer/rouvrir) de O
    // vers P1, puis de P1 vers P2.
    methodMoveKeepRadius({compassEl:document.getElementById('bisCompass'), fromAnchor:BIS_O, fromAngleDeg:-65, toAnchor:BIS_P1, toAngleDeg:180,
      radius:BIS_RADIUS, legLen:BIS_LEGLEN, dur:700,
      onDone:()=>{
        methodSweepSingle({compassEl:document.getElementById('bisCompass'), arcEl:document.getElementById('bisArcP1'), anchor:BIS_P1,
          radius:BIS_RADIUS, legLen:BIS_LEGLEN, startAngleDeg:180, targetAngleDeg:-55.00, dur:1300, halfWindowDeg:12,
          onDone:()=>{
            methodMoveKeepRadius({compassEl:document.getElementById('bisCompass'), fromAnchor:BIS_P1, fromAngleDeg:-55.00, toAnchor:BIS_P2, toAngleDeg:125,
              radius:BIS_RADIUS, legLen:BIS_LEGLEN, dur:500,
              onDone:()=>{
                methodSweepSingle({compassEl:document.getElementById('bisCompass'), arcEl:document.getElementById('bisArcP2'), anchor:BIS_P2,
                  radius:BIS_RADIUS, legLen:BIS_LEGLEN, startAngleDeg:125, targetAngleDeg:0.00, dur:1300, halfWindowDeg:12,
                  onDone:()=>{ markDone(3); btn.disabled=false; }});
              }});
          }});
      }});
  } else if(bisStep===4){
    const angDeg = Math.atan2(BIS_Q.y-BIS_O.y, BIS_Q.x-BIS_O.x)*180/Math.PI;
    document.getElementById('bisRulerTool').setAttribute('opacity','1');
    document.getElementById('bisPencilTool').setAttribute('opacity','1');
    bisSetRulerAt(BIS_O, angDeg); bisSetPencilAt(BIS_O.x, BIS_O.y, angDeg);
    document.getElementById('bisRayFinal').setAttribute('opacity','1');
    document.getElementById('bisRayFinal').setAttribute('x2', BIS_O.x); document.getElementById('bisRayFinal').setAttribute('y2', BIS_O.y);
    const finalEnd = {x:BIS_O.x+(BIS_Q.x-BIS_O.x)*1.15, y:BIS_O.y+(BIS_Q.y-BIS_O.y)*1.15};
    const start = performance.now(), dur=1300;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curX = BIS_O.x+(finalEnd.x-BIS_O.x)*t, curY = BIS_O.y+(finalEnd.y-BIS_O.y)*t;
      document.getElementById('bisRayFinal').setAttribute('x2', curX.toFixed(1)); document.getElementById('bisRayFinal').setAttribute('y2', curY.toFixed(1));
      bisSetPencilAt(curX, curY, angDeg);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('bisRulerTool').setAttribute('opacity','0');
      document.getElementById('bisPencilTool').setAttribute('opacity','0');
      markDone(4); btn.disabled=false;
    }
    requestAnimationFrame(frame);
  } else if(bisStep===5){
    document.getElementById('bisAngleArc1').setAttribute('d', 'M 98.0 300.0 A 28 28 0 0 0 94.8 287.1');
    document.getElementById('bisAngleArc2').setAttribute('d', 'M 94.8 287.1 A 28 28 0 0 0 86.1 277.1');
    document.getElementById('bisAngleTick1').setAttribute('x1','92.3'); document.getElementById('bisAngleTick1').setAttribute('y1','294.5');
    document.getElementById('bisAngleTick1').setAttribute('x2','102.1'); document.getElementById('bisAngleTick1').setAttribute('y2','292.2');
    document.getElementById('bisAngleTick2').setAttribute('x1','87.3'); document.getElementById('bisAngleTick2').setAttribute('y1','284.8');
    document.getElementById('bisAngleTick2').setAttribute('x2','94.8'); document.getElementById('bisAngleTick2').setAttribute('y2','278.2');
    ['bisAngleArc1','bisAngleArc2','bisAngleTick1','bisAngleTick2'].forEach(id=>document.getElementById(id).setAttribute('opacity','1'));
    markDone(5); btn.textContent='Terminé ✓'; btn.disabled=true;
  }
}

/* ================= Médiatrice au compas ================= */
const MED_A = {x:50,y:300}, MED_B = {x:190,y:300};
const MED_RADIUS = 100, MED_LEGLEN = 0.7*MED_RADIUS+30;
const MED_Q1 = {x:120,y:371.4}, MED_Q2 = {x:120,y:228.6};
let medStep = 0;
function medReset(){
  medStep = 0;
  ['medArcA1','medArcA2','medArcB1','medArcB2','medLine','medMidCircle','medRightAngle','medQ1Dot','medQ2Dot','medCompass','medRulerTool','medPencilTool'].forEach(id=>document.getElementById(id).setAttribute('opacity','0'));
  document.querySelectorAll('#medSvg + .step-list .step-item').forEach(el=>el.classList.remove('done'));
  const btn = document.getElementById('btnMedNext');
  btn.textContent = 'Étape suivante →'; btn.disabled = false;
}
function medSetRulerAt(origin, angleDeg){
  document.getElementById('medRulerTool').setAttribute('transform', `translate(${origin.x.toFixed(1)},${origin.y.toFixed(1)}) rotate(${angleDeg.toFixed(2)}) scale(0.62)`);
}
function medSetPencilAt(x,y,angleDeg){
  document.getElementById('medPencilTool').setAttribute('transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(angleDeg-90+8).toFixed(1)}) scale(0.62)`);
}
document.getElementById('medRulerTool').innerHTML = rulerSVG(false);
document.getElementById('medPencilTool').innerHTML = pencilSVG('med-pencil');
function medNextStep(){
  medStep++;
  const btn = document.getElementById('btnMedNext');
  btn.disabled = true;
  const markDone = n=>document.querySelector(`#medSvg + .step-list .step-item[data-step="${n}"]`).classList.add('done');
  if(medStep===1){
    methodOpenInPlace({compassEl:document.getElementById('medCompass'), anchor:MED_A, angleDeg:55.57, radius:MED_RADIUS, legLen:MED_LEGLEN, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('medCompass'), arc1El:document.getElementById('medArcA1'), arc2El:document.getElementById('medArcA2'),
          anchor:MED_A, radius:MED_RADIUS, legLen:MED_LEGLEN, sweepStartDeg:55.57, sweepEndDeg:-55.57, window1Deg:45.57, window2Deg:-45.57, halfWindowDeg:10, dur:1400,
          onDone:()=>{ markDone(1); btn.disabled=false; }});
      }});
  } else if(medStep===2){
    methodOpenInPlace({compassEl:document.getElementById('medCompass'), anchor:MED_B, angleDeg:124.43, radius:MED_RADIUS, legLen:MED_LEGLEN, dur:700,
      onDone:()=>{
        methodSweepDual({compassEl:document.getElementById('medCompass'), arc1El:document.getElementById('medArcB1'), arc2El:document.getElementById('medArcB2'),
          anchor:MED_B, radius:MED_RADIUS, legLen:MED_LEGLEN, sweepStartDeg:124.43, sweepEndDeg:235.57, window1Deg:134.43, window2Deg:225.57, halfWindowDeg:10, dur:1400,
          onDone:()=>{
            document.getElementById('medQ1Dot').setAttribute('opacity','1');
            document.getElementById('medQ2Dot').setAttribute('opacity','1');
            markDone(2); btn.disabled=false;
          }});
      }});
  } else if(medStep===3){
    const angDeg = 90; // Q1Q2 est vertical
    document.getElementById('medRulerTool').setAttribute('opacity','1');
    document.getElementById('medPencilTool').setAttribute('opacity','1');
    const overshoot = 14;
    const drawStart = {x:MED_Q2.x, y:MED_Q2.y-overshoot}, drawEnd = {x:MED_Q1.x, y:MED_Q1.y+overshoot};
    medSetRulerAt(drawStart, angDeg); medSetPencilAt(drawStart.x, drawStart.y, angDeg);
    document.getElementById('medLine').setAttribute('opacity','1');
    document.getElementById('medLine').setAttribute('x1', drawStart.x); document.getElementById('medLine').setAttribute('y1', drawStart.y);
    document.getElementById('medLine').setAttribute('x2', drawStart.x); document.getElementById('medLine').setAttribute('y2', drawStart.y);
    const start = performance.now(), dur=1300;
    function frame(now){
      const t = Math.min(1,(now-start)/dur);
      const curY = drawStart.y+(drawEnd.y-drawStart.y)*t;
      document.getElementById('medLine').setAttribute('x2', drawStart.x); document.getElementById('medLine').setAttribute('y2', curY.toFixed(1));
      medSetPencilAt(drawStart.x, curY, angDeg);
      if(t<1){ requestAnimationFrame(frame); return; }
      document.getElementById('medRulerTool').setAttribute('opacity','0');
      document.getElementById('medPencilTool').setAttribute('opacity','0');
      markDone(3); btn.disabled=false;
    }
    requestAnimationFrame(frame);
  } else if(medStep===4){
    document.getElementById('medMidCircle').setAttribute('opacity','1');
    document.getElementById('medRightAngle').setAttribute('opacity','1');
    markDone(4); btn.textContent='Terminé ✓'; btn.disabled=true;
  }
}

DEMO_REGISTRY['6e|Symétrie axiale'] = {
  cours:'cours-demo-symetrie-axiale-6e', methode:'methode-demo-symetrie-axiale-6e', exos:'exos-demo-symetrie-axiale-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('methode-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('exos-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-symetrie-axiale-6e'));
    symF1Reset(); symF2Init(); symF3Init(); symF4Init(); symF5Init(); symF6Init(); symF7Init(); symF8Init();
    bisReset(); medReset();
  }
};

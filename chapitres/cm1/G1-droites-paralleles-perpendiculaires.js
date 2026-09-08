/* ============================================================
   CHAPITRE : Droites parallèles et perpendiculaires (CM1, G1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Inspiré du programme officiel de CM1 (cycle 3) et de la structure d'un manuel de référence
   (droites perpendiculaires vérifiées à l'équerre, droites parallèles qui ne se coupent
   jamais), avec des exemples originaux.
   ============================================================ */
document.getElementById('cours-demo-cm1-droites-paralleles').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Droites perpendiculaires</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">Deux droites <b>perpendiculaires</b> se coupent en formant quatre angles droits.</div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;margin:10px 0 16px;">
  <tr>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.15);">
      <svg viewBox="0 0 160 120" style="width:100%;max-width:220px;">
        <line x1="20" y1="95" x2="140" y2="25" stroke="#1F7A4D" stroke-width="3"/>
        <line x1="30" y1="20" x2="120" y2="100" stroke="#1F7A4D" stroke-width="3"/>
        <rect x="72" y="52" width="14" height="14" fill="none" stroke="#B8860B" stroke-width="2" transform="rotate(-32 79 59)"/>
      </svg>
      <p class="hint" style="margin:4px 0 0;">Les droites vertes <b>sont perpendiculaires</b>.</p>
    </td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.15);">
      <svg viewBox="0 0 160 120" style="width:100%;max-width:220px;">
        <line x1="15" y1="90" x2="145" y2="45" stroke="#9E1F5E" stroke-width="3"/>
        <line x1="40" y1="15" x2="115" y2="105" stroke="#9E1F5E" stroke-width="3"/>
      </svg>
      <p class="hint" style="margin:4px 0 0;">Les droites violettes <b>ne sont pas perpendiculaires</b>.</p>
    </td>
  </tr>
</table>
</div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On utilise une <b>équerre</b> pour vérifier que deux droites sont perpendiculaires : si les deux côtés de l'angle droit de l'équerre suivent exactement les deux droites, alors elles sont bien perpendiculaires.</div>
<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">
  Le petit carré dessiné à l'intersection de deux droites est le symbole de l'<b>angle droit</b> : il indique que les droites sont perpendiculaires.
</div>

<div class="lesson-header"><span class="num">2</span><h3>Droites parallèles</h3></div>
<span class="def-badge">Vocabulaire</span>
<div class="def-box">Deux droites <b>parallèles</b> ne se coupent jamais, même si on les prolonge très loin.</div>
<div style="overflow-x:auto;">
<table style="border-collapse:collapse;width:100%;text-align:center;margin:10px 0 16px;">
  <tr>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.15);">
      <svg viewBox="0 0 160 100" style="width:100%;max-width:220px;">
        <line x1="15" y1="75" x2="145" y2="25" stroke="#FF8208" stroke-width="3"/>
        <line x1="15" y1="90" x2="145" y2="40" stroke="#FF8208" stroke-width="3"/>
      </svg>
      <p class="hint" style="margin:4px 0 0;">Les droites orange <b>sont parallèles</b>.</p>
    </td>
    <td style="padding:10px;border:1px solid rgba(28,43,57,.15);">
      <svg viewBox="0 0 160 100" style="width:100%;max-width:220px;">
        <line x1="15" y1="80" x2="145" y2="30" stroke="#0C5BA0" stroke-width="3"/>
        <line x1="20" y1="20" x2="140" y2="70" stroke="#0C5BA0" stroke-width="3"/>
      </svg>
      <p class="hint" style="margin:4px 0 0;">Les droites bleues <b>ne sont pas parallèles</b> : elles sont <b>sécantes</b> (elles se coupent).</p>
    </td>
  </tr>
</table>
</div>
<span class="prop-badge">Méthode</span>
<div class="def-box">On utilise une règle et une équerre pour vérifier que deux droites sont parallèles : on fait glisser l'équerre le long d'une règle fixe, sans jamais la faire tourner -- si son bord reste tout le temps sur les deux droites, elles sont parallèles.</div>
`;

document.getElementById('methode-demo-cm1-droites-paralleles').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Aide animée : ces deux droites sont-elles perpendiculaires ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Clique sur « Étape suivante » pour voir comment l'équerre permet de vérifier.</p>
  <div class="step-display" id="cm1dp-perpOuiDisplay" style="text-align:center;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1dpPerpOuiDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1dpPerpOuiDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Et si ce n'était pas le cas ?</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Avec ces deux droites-ci, l'équerre ne « rentre » pas parfaitement. Clique pour voir pourquoi.</p>
  <div class="step-display" id="cm1dp-perpNonDisplay" style="text-align:center;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cm1dpPerpNonDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cm1dpPerpNonDemo.reset()">Recommencer</button>
  </div>
</div>
`;

document.getElementById('exos-demo-cm1-droites-paralleles').innerHTML = `
<div class="placeholder-box">
  <strong>Exercices en construction</strong>
  Les exercices corrigés de ce chapitre arrivent dans une prochaine session.
</div>
`;

/* Aide animée "perpendiculaire ou non", avec un vrai diagramme SVG qui évolue à chaque étape
   (makeSingleStepDemo : l'étape courante remplace la précédente, comme pour une figure qui se
   complète -- pas un empilement de lignes de texte). Réutilise equerreSVG (proportions réelles
   d'une équerre 30-60-90, déjà utilisée et validée pour le chapitre équivalent en 6e) plutôt
   qu'un triangle dessiné à la main -- une équerre approximative pouvait donner l'impression
   fausse de "coller" à une droite alors que le premier essai n'avait AUCUNE rotation : dans le
   cas "non perpendiculaire", elle ne suivait même pas correctement la première droite. */
const CM1DP_EQ_LEGX = 100, CM1DP_EQ_LEGY = CM1DP_EQ_LEGX * Math.tan(30*Math.PI/180);
function cm1dpEquerre(x, y, angleDeg, opacity){
  return `<g transform="translate(${x},${y}) rotate(${angleDeg})" opacity="${opacity}">${equerreSVG(CM1DP_EQ_LEGX, CM1DP_EQ_LEGY)}</g>`;
}
// Cas 1 : droite horizontale (verte) et droite verticale (bleue), qui se coupent en (150,120) --
// deux droites l'une horizontale et l'autre verticale sont perpendiculaires par définition
// (angle de 90° entre elles). L'équerre, posée SANS rotation (son 1er côté déjà horizontal),
// a son 1er côté qui suit exactement la droite verte, et son 2e côté (vertical) qui suit
// exactement la droite bleue.
const CM1DP_PERP_OUI_STEPS = [
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(190,150,0,0.4)}
  </svg>`, note:"On approche l'équerre de leur point de croisement."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(150,120,0,0.5)}
  </svg>`, note:"On pose le 1er côté de l'équerre bien le long de la droite verte : le 2e côté suit alors exactement la droite bleue !"},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(150,120,0,0.5)}
    <rect x="150" y="120" width="16" height="16" fill="none" stroke="#B8860B" stroke-width="2.5"/>
    <text x="225" y="60" font-size="34" fill="#1F7A4D" font-weight="700">✓</text>
  </svg>`, note:'Les deux droites sont donc perpendiculaires !'},
];
const cm1dpPerpOuiDemo = makeSingleStepDemo(CM1DP_PERP_OUI_STEPS, 'cm1dp-perpOuiDisplay');

// Cas 2 : droite verte TOUJOURS horizontale (même 1er côté d'équerre que le cas 1, posé sans
// rotation), mais droite bleue clairement PAS verticale cette fois (inclinée, de (110,220) à
// (190,20) -- ces deux droites se coupent bien au même point (150,120), calcul vérifié). Le
// 2e côté de l'équerre (toujours vertical puisqu'aucune rotation) ne suit alors PAS la droite
// bleue : l'écart entre les deux est bien réel et visible, pas juste suggéré par du texte.
const CM1DP_PERP_NON_STEPS = [
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="110" y1="220" x2="190" y2="20" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="110" y1="220" x2="190" y2="20" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(150,120,0,0.5)}
  </svg>`, note:"On pose le 1er côté de l'équerre le long de la droite verte, comme avant."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="110" y1="220" x2="190" y2="20" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(150,120,0,0.5)}
    <path d="M 150,150 L 138,150" stroke="#9E1F5E" stroke-width="2.5" stroke-dasharray="3,2"/>
    <text x="95" y="165" font-size="22" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Cette fois, le 2e côté de l'équerre ne suit pas la droite bleue : il reste un petit écart (en pointillés)."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="110" y1="220" x2="190" y2="20" stroke="#0C5BA0" stroke-width="3"/>
    <text x="185" y="55" font-size="30" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Les deux droites ne sont donc pas perpendiculaires."},
];
const cm1dpPerpNonDemo = makeSingleStepDemo(CM1DP_PERP_NON_STEPS, 'cm1dp-perpNonDisplay');

DEMO_REGISTRY['cm1|Droites parallèles et perpendiculaires'] = { cours:'cours-demo-cm1-droites-paralleles', methode:'methode-demo-cm1-droites-paralleles', exos:'exos-demo-cm1-droites-paralleles',
  init:()=>{ cm1dpPerpOuiDemo.reset(); cm1dpPerpNonDemo.reset(); } };

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
        <line x1="32" y1="92" x2="128" y2="28" stroke="#1F7A4D" stroke-width="3"/>
        <line x1="48" y1="12" x2="112" y2="108" stroke="#1F7A4D" stroke-width="3"/>
        <polygon points="80,60 91.65,52.23 99.41,63.88 87.77,71.65" fill="none" stroke="#B8860B" stroke-width="2"/>
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
   d'une équerre 30-60-90, déjà utilisée et validée pour le chapitre équivalent en 6e). Le
   décalage intérieur de equerreSVG (34px) est FIXE, calibré pour la taille utilisée en 6e
   (legX=340, ~10%) -- une équerre trop petite ici (legX=100 essayé au départ) rendait ce même
   décalage proportionnellement énorme (~34%), donnant l'impression de deux équerres
   superposées au lieu d'une seule équerre nette. Agrandi à legX=200 (~17%, cohérent) et le
   canevas proportionnellement ; toutes les coordonnées revérifiées à la main (voir calculs
   en commentaire ci-dessous). */
const CM1DP_EQ_LEGX = 200, CM1DP_EQ_LEGY = CM1DP_EQ_LEGX * Math.tan(30*Math.PI/180);
function cm1dpEquerre(x, y, angleDeg, opacity){
  return `<g transform="translate(${x},${y}) rotate(${angleDeg})" opacity="${opacity}">${equerreSVG(CM1DP_EQ_LEGX, CM1DP_EQ_LEGY)}</g>`;
}
// Cas 1 : droite horizontale (verte) et droite verticale (bleue), qui se coupent en (250,190) --
// deux droites l'une horizontale et l'autre verticale sont perpendiculaires par définition.
// L'équerre, posée SANS rotation (son 1er côté déjà horizontal), a son 1er côté qui suit
// exactement la droite verte (jusqu'à x=450, bien à l'intérieur des bornes 60-470 de la
// droite), et son 2e côté qui suit exactement la droite bleue (jusqu'à y=305, à l'intérieur
// des bornes 40-340).
const CM1DP_PERP_OUI_STEPS = [
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="250" y1="40" x2="250" y2="340" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="250" y1="40" x2="250" y2="340" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(310,250,0,0.4)}
  </svg>`, note:"On approche l'équerre de leur point de croisement."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="250" y1="40" x2="250" y2="340" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,0,0.5)}
  </svg>`, note:"On pose le 1er côté de l'équerre bien le long de la droite verte : le 2e côté suit alors exactement la droite bleue !"},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="250" y1="40" x2="250" y2="340" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,0,0.5)}
    <rect x="250" y="190" width="22" height="22" fill="none" stroke="#B8860B" stroke-width="3"/>
    <text x="365" y="110" font-size="46" fill="#1F7A4D" font-weight="700">✓</text>
  </svg>`, note:'Les deux droites sont donc perpendiculaires !'},
];
const cm1dpPerpOuiDemo = makeSingleStepDemo(CM1DP_PERP_OUI_STEPS, 'cm1dp-perpOuiDisplay');

// Cas 2 : droite verte TOUJOURS horizontale (même 1er côté d'équerre, posé sans rotation),
// mais droite bleue clairement PAS verticale cette fois (inclinée, de (205,340) à (295,40) --
// passe bien par le même point de croisement (250,190), vérifié par calcul direct). Le 2e côté
// de l'équerre (toujours vertical) ne suit alors PAS la droite bleue : à la hauteur où il
// s'arrête (y=305), la droite bleue est à x=215 -- un écart réel de 35px, pas juste suggéré.
const CM1DP_PERP_NON_STEPS = [
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="205" y1="340" x2="295" y2="40" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="205" y1="340" x2="295" y2="40" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,0,0.5)}
  </svg>`, note:"On pose le 1er côté de l'équerre le long de la droite verte, comme avant."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="205" y1="340" x2="295" y2="40" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,0,0.5)}
    <path d="M 250,250 L 232,250" stroke="#9E1F5E" stroke-width="3" stroke-dasharray="4,3"/>
    <text x="150" y="270" font-size="30" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Cette fois, le 2e côté de l'équerre ne suit pas la droite bleue : il reste un écart (en pointillés)."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="60" y1="190" x2="470" y2="190" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="205" y1="340" x2="295" y2="40" stroke="#0C5BA0" stroke-width="3"/>
    <text x="330" y="100" font-size="40" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Les deux droites ne sont donc pas perpendiculaires."},
];
const cm1dpPerpNonDemo = makeSingleStepDemo(CM1DP_PERP_NON_STEPS, 'cm1dp-perpNonDisplay');

DEMO_REGISTRY['cm1|Droites parallèles et perpendiculaires'] = { cours:'cours-demo-cm1-droites-paralleles', methode:'methode-demo-cm1-droites-paralleles', exos:'exos-demo-cm1-droites-paralleles',
  init:()=>{ cm1dpPerpOuiDemo.reset(); cm1dpPerpNonDemo.reset(); } };

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
   complète -- pas un empilement de lignes de texte). */
function cm1dpEquerreSVG(x, y, opacity){
  return `<g transform="translate(${x},${y})"><polygon points="0,0 90,0 0,60" fill="rgba(184,134,11,${opacity})" stroke="#8A5A00" stroke-width="2"/></g>`;
}
const CM1DP_PERP_OUI_STEPS = [
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerreSVG(165,135,0.35)}
  </svg>`, note:"On approche l'équerre, en posant un de ses côtés bien le long de la droite verte."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerreSVG(150,120,0.4)}
  </svg>`, note:"Le deuxième côté de l'équerre suit exactement la droite bleue : l'angle est bien droit !"},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="120" x2="270" y2="120" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="150" y1="20" x2="150" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerreSVG(150,120,0.4)}
    <rect x="150" y="120" width="18" height="18" fill="none" stroke="#B8860B" stroke-width="2.5"/>
    <text x="220" y="55" font-size="36" fill="#1F7A4D" font-weight="700">✓</text>
  </svg>`, note:'Les deux droites sont donc perpendiculaires !'},
];
const cm1dpPerpOuiDemo = makeSingleStepDemo(CM1DP_PERP_OUI_STEPS, 'cm1dp-perpOuiDisplay');

const CM1DP_PERP_NON_STEPS = [
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="130" x2="270" y2="110" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="170" y1="20" x2="120" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerreSVG(160,118,0.4)}
  </svg>`, note:"On pose l'équerre sur la droite verte, comme avant."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="130" x2="270" y2="110" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="170" y1="20" x2="120" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerreSVG(160,118,0.4)}
    <text x="185" y="90" font-size="28" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Cette fois, le deuxième côté de l'équerre ne suit PAS la droite bleue : il y a un petit écart."},
  {expr:`<svg viewBox="0 0 300 220" style="width:100%;max-width:320px;">
    <line x1="30" y1="130" x2="270" y2="110" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="170" y1="20" x2="120" y2="220" stroke="#0C5BA0" stroke-width="3"/>
    <text x="180" y="55" font-size="28" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Les deux droites ne sont donc pas perpendiculaires."},
];
const cm1dpPerpNonDemo = makeSingleStepDemo(CM1DP_PERP_NON_STEPS, 'cm1dp-perpNonDisplay');

DEMO_REGISTRY['cm1|Droites parallèles et perpendiculaires'] = { cours:'cours-demo-cm1-droites-paralleles', methode:'methode-demo-cm1-droites-paralleles', exos:'exos-demo-cm1-droites-paralleles',
  init:()=>{ cm1dpPerpOuiDemo.reset(); cm1dpPerpNonDemo.reset(); } };

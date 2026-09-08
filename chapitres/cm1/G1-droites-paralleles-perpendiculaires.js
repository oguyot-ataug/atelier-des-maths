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
   superposées au lieu d'une seule équerre nette. Agrandi à legX=200 (~17%, cohérent).
   Droites INCLINÉES (ni horizontales ni verticales, angle de 22°) plutôt qu'un cas
   horizontal/vertical trop particulier -- démonstration plus rigoureuse (l'équerre doit
   vraiment pivoter, pas juste se poser telle quelle). Toutes les coordonnées calculées et
   vérifiées par script Python avant intégration (produit scalaire des vecteurs directeurs nul
   pour le cas perpendiculaire, extrémités de l'équerre exactement sur les droites). */
const CM1DP_EQ_LEGX = 200, CM1DP_EQ_LEGY = CM1DP_EQ_LEGX * Math.tan(30*Math.PI/180);
function cm1dpEquerre(x, y, angleDeg, opacity){
  return `<g transform="translate(${x},${y}) rotate(${angleDeg})" opacity="${opacity}">${equerreSVG(CM1DP_EQ_LEGX, CM1DP_EQ_LEGY)}</g>`;
}
// Cas 1 : droite verte inclinée à 22°, droite bleue inclinée à 22+90=112° -- deux droites dont
// les directions sont perpendiculaires (produit scalaire des vecteurs = 0, vérifié), se coupant
// en (250,190). L'équerre, tournée de 22° (son 1er côté suit alors la droite verte), a son 2e
// côté qui suit exactement la droite bleue -- calculé et vérifié : les deux extrémités tombent
// pile sur les droites, à l'intérieur de leurs bornes affichées.
const CM1DP_PERP_OUI_STEPS = [
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="306.2" y1="50.9" x2="193.8" y2="329.1" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="306.2" y1="50.9" x2="193.8" y2="329.1" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(310,160,22,0.4)}
  </svg>`, note:"On approche l'équerre de leur point de croisement."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="306.2" y1="50.9" x2="193.8" y2="329.1" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,22,0.5)}
  </svg>`, note:"On tourne l'équerre pour poser son 1er côté bien le long de la droite verte : le 2e côté suit alors exactement la droite bleue !"},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="306.2" y1="50.9" x2="193.8" y2="329.1" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,22,0.5)}
    <polygon points="250,190 264.8,196.0 258.8,210.8 244.0,204.8" fill="none" stroke="#B8860B" stroke-width="3"/>
    <text x="365" y="140" font-size="46" fill="#1F7A4D" font-weight="700">✓</text>
  </svg>`, note:'Les deux droites sont donc perpendiculaires !'},
];
const cm1dpPerpOuiDemo = makeSingleStepDemo(CM1DP_PERP_OUI_STEPS, 'cm1dp-perpOuiDisplay');

// Cas 2 : droite verte TOUJOURS inclinée à 22° (même 1er côté d'équerre que le cas 1, tournée
// de 22°), mais droite bleue à 22+70=92°... non -- à 22+70° (PAS 22+90°) cette fois : clairement
// pas perpendiculaire (produit scalaire = 0,34, vérifié), mais assez proche de 90° pour être un
// vrai piège pédagogique plutôt qu'un écart grossier. Le 2e côté de l'équerre (tournée de 22°,
// donc à 22+90°) ne suit alors PAS la droite bleue (à 22+70°) : écart réel de 40px calculé à
// l'extrémité du petit côté, pas juste suggéré par le texte.
const CM1DP_PERP_NON_STEPS = [
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="255.2" y1="40.1" x2="244.8" y2="339.9" stroke="#0C5BA0" stroke-width="3"/>
  </svg>`, note:'On veut savoir si la droite verte et la droite bleue sont perpendiculaires.'},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="255.2" y1="40.1" x2="244.8" y2="339.9" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,22,0.5)}
  </svg>`, note:"On tourne l'équerre pour poser son 1er côté le long de la droite verte, comme avant."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="255.2" y1="40.1" x2="244.8" y2="339.9" stroke="#0C5BA0" stroke-width="3"/>
    ${cm1dpEquerre(250,190,22,0.5)}
    <path d="M 224,254.2 L 247.6,259.2" stroke="#9E1F5E" stroke-width="3" stroke-dasharray="4,3"/>
    <text x="160" y="230" font-size="30" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Cette fois, le 2e côté de l'équerre ne suit pas la droite bleue : il reste un écart (en pointillés)."},
  {expr:`<svg viewBox="0 0 500 380" style="width:100%;max-width:340px;">
    <line x1="55.3" y1="111.3" x2="444.7" y2="268.7" stroke="#1F7A4D" stroke-width="3"/>
    <line x1="255.2" y1="40.1" x2="244.8" y2="339.9" stroke="#0C5BA0" stroke-width="3"/>
    <text x="300" y="100" font-size="40" fill="#9E1F5E" font-weight="700">✗</text>
  </svg>`, note:"Les deux droites ne sont donc pas perpendiculaires."},
];
const cm1dpPerpNonDemo = makeSingleStepDemo(CM1DP_PERP_NON_STEPS, 'cm1dp-perpNonDisplay');

document.getElementById('histoire-demo-cm1-droites-paralleles').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire : la corde à 13 nœuds</div>
  Bien avant l'invention de l'équerre, comment faisait-on pour tracer un angle droit bien précis ? Il y a environ 4 000 ans, en Égypte ancienne, des arpenteurs appelés « tendeurs de corde » utilisaient une astuce étonnante : une corde avec 12 espaces égaux entre 13 nœuds.<br><br>
  En tendant cette corde pour former un triangle avec 3 espaces d'un côté, 4 espaces d'un deuxième côté et 5 espaces du troisième, ils obtenaient <b>à chaque fois</b> un triangle avec un angle parfaitement droit, entre le côté de 3 et le côté de 4 ! Pas besoin d'équerre : juste une corde et trois piquets.<br><br>
  Cette technique servait à re-tracer les limites des champs après les crues du Nil (le fleuve inondait les terres chaque année et effaçait les repères), mais aussi à construire les pyramides bien d'équerre. Aujourd'hui encore, les maçons utilisent parfois cette même astuce du triangle 3-4-5 pour vérifier qu'un mur forme bien un angle droit !
</div>
`;

DEMO_QUIZZES['cm1|Droites parallèles et perpendiculaires'] = [
  {q:"Que forment deux droites perpendiculaires en se coupant ?",
   opts:["Quatre angles droits","Deux droites parallèles","Un seul point sans angle"], correct:0},
  {q:"Quel outil utilise-t-on pour vérifier que deux droites sont perpendiculaires ?",
   opts:["Une règle seule","Une équerre","Un compas"], correct:1},
  {q:"Que peut-on dire de deux droites parallèles ?",
   opts:["Elles se coupent toujours une fois","Elles ne se coupent jamais","Elles forment un angle droit"], correct:1},
];

DEMO_REGISTRY['cm1|Droites parallèles et perpendiculaires'] = { cours:'cours-demo-cm1-droites-paralleles', methode:'methode-demo-cm1-droites-paralleles', exos:'exos-demo-cm1-droites-paralleles', histoire:'histoire-demo-cm1-droites-paralleles',
  init:()=>{ cm1dpPerpOuiDemo.reset(); cm1dpPerpNonDemo.reset(); } };

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
<span class="prop-badge">Tracer</span>
<div class="def-box">Pour tracer la droite <b>perpendiculaire</b> à une droite (d) <b>passant par un point</b> M, on fait glisser l'équerre le long de la droite (d) jusqu'à ce que l'autre côté de l'angle droit touche M, puis on trace le long de ce côté. Sur un quadrillage, si la droite (d) suit les lignes, la perpendiculaire suit l'autre direction des lignes ; si elle suit les diagonales des carreaux, la perpendiculaire suit les diagonales dans l'autre sens. <i>Voir l'onglet Méthodes.</i></div>

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
<div class="def-box">Deux droites <b>perpendiculaires à une même droite</b> sont parallèles entre elles. On peut aussi vérifier que l'<b>écart</b> entre les deux droites reste toujours le même.</div>
<div class="def-box">On utilise une règle et une équerre pour vérifier que deux droites sont parallèles : on fait glisser l'équerre le long d'une règle fixe, sans jamais la faire tourner -- si son bord reste tout le temps sur les deux droites, elles sont parallèles.</div>
${ce2Film('cm1-dp-paral', { duree: 8000, legende: 'La règle ne bouge pas ; l\'équerre glisse contre elle, sans tourner.', film: { w: 460, h: 220, scenes: [
  { de: 0, a: .1, dessin: k => `<g opacity="${k}"><rect x="20" y="170" width="420" height="26" fill="#FFF3D6" stroke="#C9A24A"/>${ce2T(230, 213, 'règle fixe', { t: 12, c: '#8A6D1F' })}</g>`, texte: 'Je pose la règle et je la tiens bien.' },
  { de: .12, a: .25, dessin: k => `<g opacity="${k}"><polygon points="100,170 100,40 175,170" fill="#9BB7D4" fill-opacity=".45" stroke="#6B88A8" stroke-width="1.5"/></g>`, texte: 'Je pose l\'équerre contre la règle : son angle droit est sur le bord de la règle.' },
  { de: .26, a: .4, dessin: k => k < 1 ? '' : `<line x1="100" y1="20" x2="100" y2="170" stroke="#E35D3A" stroke-width="3"/>`, texte: 'Je trace une première droite le long de l\'équerre.' },
  { de: .42, a: .72, dessin: k => k >= 1 ? '' : `<polygon points="${100 + 200 * k},170 ${100 + 200 * k},40 ${175 + 200 * k},170" fill="#9BB7D4" fill-opacity=".45" stroke="#6B88A8" stroke-width="1.5"/>`, texte: 'Je fais glisser l\'équerre le long de la règle, sans la faire tourner.' },
  { de: .72, a: .73, dessin: () => `<polygon points="300,170 300,40 375,170" fill="#9BB7D4" fill-opacity=".45" stroke="#6B88A8" stroke-width="1.5"/>` },
  { de: .76, a: .9, dessin: k => `<line x1="300" y1="${170 - 150 * k}" x2="300" y2="170" stroke="#E35D3A" stroke-width="3"/>`, texte: 'Je trace une deuxième droite.' },
  { de: .93, a: 1, dessin: k => `<path d="M100 170 h12 v-12 h-12 M300 170 h12 v-12 h-12" fill="none" stroke="#2E9C6A" stroke-width="2" opacity="${k}"/>`, texte: 'Les deux droites rouges sont perpendiculaires à la règle : elles sont <b>parallèles</b> entre elles.' }] } })}
`;

/* Méthodes -- demandé : « mettre les méthodes de construction (6e) en méthodes de ce chapitre CM1 ».
   Au CM1 : tracer la perpendiculaire à une droite passant par un point est attendu (on en a besoin
   pour construire un rectangle ou un triangle rectangle sur papier uni) ; la parallèle passant par
   un point est « pour aller plus loin » (attendue au CM2). Les outils animés viennent du chapitre de
   6e (chargé après ce fichier) : la page est donc écrite une fois tous les scripts chargés. */
let cm1dpPm = null, cm1dpPam = null, cm1dpDblDemo = null, cm1dpQuadDemo = null;
function cm1dpMethodes(){
  const el = document.getElementById('methode-demo-cm1-droites-paralleles'); if(!el) return;
  el.innerHTML = `
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

<div class="sub-header"><span class="letter">M</span><h4>Tracer la droite perpendiculaire à une droite passant par un point (à l'équerre)</h4></div>
<div class="figure-wrap">
  <p class="hint interaction-hint" style="margin-top:6px;">Clique sur « Étape suivante » : l'équerre glisse le long de la droite (d) jusqu'au point M.</p>
  ${dpPerpMethodeSVGBlock('cm1dp-pm', '(d)', "(d')", 'M')}
  <div class="figure-toolbar"><button class="btn" onclick="cm1dpPm.next()">Étape suivante →</button><button class="btn secondary" onclick="cm1dpPm.reset()">Recommencer</button></div>
</div>
${cm1Astuce('Le point peut aussi être <b>sur</b> la droite (d) : on fait glisser l\'équerre jusqu\'à ce que son angle droit soit sur le point, puis on trace le long de l\'autre côté.')}

<div class="sub-header"><span class="letter">M</span><h4>Tracer une perpendiculaire sur un quadrillage, sans équerre</h4></div>
<p class="hint" style="margin:4px 0 8px;">Au CM1, la droite (d) suit les lignes du quadrillage ou les diagonales des carreaux. Sinon, on prend l'équerre.</p>
<div class="figure-wrap">
  <div class="step-display" id="cm1dp-quadDisplay" style="text-align:center;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="cm1dpQuadDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="cm1dpQuadDemo.reset()">Recommencer</button></div>
</div>

<div class="sub-header" data-oliv-plus="En route vers le CM2 !"><span class="letter">+</span><h4>Pour aller plus loin : tracer la droite parallèle à une droite passant par un point</h4></div>
${cm1Rem('Au CM1, il faut surtout savoir <b>reconnaître</b> et <b>vérifier</b> que deux droites sont parallèles. Les tracés qui suivent seront travaillés au CM2.')}
<p class="example-title">Avec deux perpendiculaires (le plus simple) :</p>
<div class="figure-wrap">
  <div class="step-display" id="cm1dp-dblDisplay" style="text-align:center;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="cm1dpDblDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="cm1dpDblDemo.reset()">Recommencer</button></div>
</div>
<p class="example-title">Sur un quadrillage (la méthode du « L ») :</p>
${dpAnimL('cm1dp-para-L', 'para')}
<p class="example-title">Avec la règle et l'équerre qui glisse :</p>
<div class="figure-wrap">
  ${dpParaMethodeSVGBlock('cm1dp-pam', '0 0 400 430', '(d)', "(d')", 'N')}
  <div class="figure-toolbar"><button class="btn" onclick="cm1dpPam.next()">Étape suivante →</button><button class="btn secondary" onclick="cm1dpPam.reset()">Recommencer</button></div>
</div>
`;
  cm1dpPm = makePerpMethodeDemo('cm1dp-pm', { x: 50, y: 215 }, { x: 330, y: 160 }, { x: 225, y: 88 }, [
    'Je pose un côté de l\'angle droit de l\'équerre le long de la droite (d).',
    'Je fais glisser l\'équerre le long de la droite (d), sans la faire tourner.',
    'Je m\'arrête quand l\'autre côté de l\'angle droit touche le point M.',
    'Je pose la règle le long de ce côté de l\'équerre.',
    'J\'enlève l\'équerre ; la règle reste bien en place.',
    'Je trace la droite le long de la règle et je code l\'angle droit : c\'est la droite (d\').',
    'La droite (d\') passe par M et elle est perpendiculaire à la droite (d).']);
  cm1dpPam = makeParaMethodeDemo('cm1dp-pam', { x: 60, y: 165 }, { x: 300, y: 85 }, { x: 216, y: 223 }, '(d)', "(d')", 'N');
  cm1dpDblDemo = makeSingleStepDemo(CM1DP_DBL_STEPS, 'cm1dp-dblDisplay');
  cm1dpQuadDemo = makeSingleStepDemo(CM1DP_QUAD_STEPS, 'cm1dp-quadDisplay');
  registerGeoStepDemo('cm1dp-pmSvg', { steps: () => cm1dpPm.steps(), getIdx: () => cm1dpPm.getIdx(), goto: (i, a) => cm1dpPm.goto(i, a) });
}
/* Perpendiculaire sur quadrillage, au CM1 : (d) suit les lignes, ou les diagonales des carreaux (demandé :
   « pour les perpendiculaires dans un quadrillage, on doit se limiter aux diagonales » ; la méthode du
   « L » pour une droite oblique quelconque est vue en 6e). */
const CM1DP_CARREAU = `<svg viewBox="0 0 70 70" style="width:64px;vertical-align:middle;"><rect x="5" y="5" width="60" height="60" fill="#fff" stroke="#8FB3D0" stroke-width="1.5"/><line x1="5" y1="5" x2="65" y2="65" stroke="#1F3A5C" stroke-width="2"/><line x1="65" y1="5" x2="5" y2="65" stroke="#E35D3A" stroke-width="2"/><path d="M40.66,40.66 L46.31,35 L40.66,29.34" fill="none" stroke="#1F3A5C" stroke-width="1.5"/></svg>`;
const CM1DP_QH = { w: 288, h: 168, k: 24, d: [[0, 120], [288, 120]], M: [168, 48], taille: 300 }, CM1DP_QD = { w: 288, h: 168, k: 24, d: [[24, 144], [144, 24]], M: [168, 96], taille: 300 };
const CM1DP_QUAD_STEPS = [
  { expr: cm1dpFig(CM1DP_QH), note: 'La droite (d) suit une ligne du quadrillage.' },
  { expr: cm1dpFig(Object.assign({ sol: 'perp' }, CM1DP_QH)), note: 'La droite (d\') qui passe par M suit l\'autre direction des lignes : les lignes du quadrillage sont perpendiculaires. Je code l\'angle droit.' },
  { expr: cm1dpFig(CM1DP_QD), note: 'Cette fois, la droite (d) suit les diagonales des carreaux.' },
  { expr: cm1dpFig(Object.assign({ sol: 'perp' }, CM1DP_QD)) + CM1DP_CARREAU, note: 'Dans un carreau, les deux diagonales sont perpendiculaires : la droite (d\') qui passe par M suit les diagonales <b>dans l\'autre sens</b>.' },
];
/* Parallèle par double perpendiculaire : (d) et N ; la perpendiculaire (d') à (d) passant par N ; la
   perpendiculaire (d'') à (d') passant par N : elle est parallèle à (d). Figures calculées (cm1dpFig). */
const CM1DP_DBL_STEPS = [
  { expr: cm1dpFig({ w: 360, h: 220, d: [[30, 170], [330, 110]], M: [190, 50], nomM: 'N', taille: 340 }), note: 'Une droite (d) et un point N qui n\'est pas sur la droite (d).' },
  { expr: cm1dpFig({ w: 360, h: 220, d: [[30, 170], [330, 110]], M: [190, 50], nomM: 'N', sol: 'perp', nomSol: "(d')", taille: 340 }), note: 'Avec l\'équerre, je trace la droite (d\') perpendiculaire à la droite (d) passant par N.' },
  { expr: cm1dpFig({ w: 360, h: 220, d: [[30, 170], [330, 110]], M: [190, 50], nomM: 'N', sol: 'para', constr: true, nomConstr: "(d')", nomSol: "(d'')", taille: 340 }), note: 'Je trace la droite (d\'\') perpendiculaire à la droite (d\'), passant aussi par N.' },
  { expr: cm1dpFig({ w: 360, h: 220, d: [[30, 170], [330, 110]], M: [190, 50], nomM: 'N', sol: 'para', constr: true, nomConstr: "(d')", nomSol: "(d'')", taille: 340 }), note: 'Les droites (d) et (d\'\') sont toutes les deux perpendiculaires à la droite (d\') : elles sont <b>parallèles</b>.' },
];

document.getElementById('exos-demo-cm1-droites-paralleles').innerHTML = cm1Exos('dp', [
  ['ABCD est un rectangle. Cite deux côtés perpendiculaires, puis deux côtés parallèles.',
    cm1Redac('Côtés perpendiculaires', 'Les côtés [AB] et [BC] se coupent en B en formant un angle droit.', 'Les côtés [AB] et [BC] sont perpendiculaires.')
    + cm1Redac('Côtés parallèles', 'Les côtés [AB] et [DC] ne se coupent jamais, même prolongés.', 'Les côtés [AB] et [DC] sont parallèles.', cm1dpRect())],
  ['Trace une droite, appelée (d), et place un point A qui n\'est pas sur la droite (d). Trace la droite perpendiculaire à la droite (d) qui passe par A.',
    cm1Redac('Méthode', { suite: ['Je pose un côté de l\'angle droit de l\'équerre le long de (d).', 'Je fais glisser l\'équerre le long de (d) jusqu\'à ce que l\'autre côté touche A.', 'Je trace le long de ce côté, puis je code l\'angle droit.'] }, 'La droite tracée passe par A et coupe la droite (d) en formant un angle droit : elle est perpendiculaire à la droite (d).', cm1dpFig({ w: 260, h: 160, d: [[10, 130], [250, 80]], M: [150, 30], nomM: 'A', sol: 'perp', taille: 260 }))],
  ['<b>Pour aller plus loin</b> (CM2) : trace une droite (d) et place un point B qui n\'est pas sur la droite (d). Trace la droite parallèle à la droite (d) qui passe par B.',
    cm1Redac('Méthode avec deux perpendiculaires', { suite: ['Je trace la droite (d\') perpendiculaire à la droite (d) passant par B.', 'Je trace la droite (d\'\') perpendiculaire à la droite (d\') passant par B.'] }, 'Les droites (d) et (d\'\') sont perpendiculaires à la droite (d\') : la droite (d\'\') est parallèle à la droite (d).', cm1dpFig({ w: 260, h: 160, d: [[10, 130], [250, 80]], M: [150, 35], nomM: 'B', sol: 'para', constr: true, nomConstr: "(d')", nomSol: "(d'')", taille: 260 }))],
  ['Les droites (d1) et (d2) sont toutes les deux perpendiculaires à la droite (d). Que peut-on dire de (d1) et de (d2) ?',
    cm1Redac('Position de (d1) et (d2)', 'Deux droites perpendiculaires à une même droite', 'Les droites (d1) et (d2) sont parallèles entre elles.', `<svg viewBox="0 0 240 130" style="width:220px;display:block;"><line x1="10" y1="100" x2="230" y2="100" stroke="#1F3A5C" stroke-width="2"/><line x1="80" y1="10" x2="80" y2="125" stroke="#E35D3A" stroke-width="2"/><line x1="160" y1="10" x2="160" y2="125" stroke="#2EA8C9" stroke-width="2"/><path d="M80,91 h9 v9 M160,91 h9 v9" fill="none" stroke="#1F3A5C" stroke-width="1.4"/><text x="215" y="94" font-size="13" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">(d)</text><text x="58" y="22" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk">(d1)</text><text x="166" y="22" font-size="13" font-weight="700" fill="#2EA8C9" font-family="Space Grotesk">(d2)</text></svg>`)],
  ['Dans la classe, trouve deux bords parallèles et deux bords perpendiculaires.',
    cm1Redac('Bords parallèles', '', 'Par exemple, les deux grands bords d\'une feuille de cahier sont parallèles.')
    + cm1Redac('Bords perpendiculaires', '', 'Par exemple, deux bords voisins de la table forment un angle droit : ils sont perpendiculaires. Je vérifie avec l\'équerre.')],
  ['Deux droites qui se coupent sont-elles toujours perpendiculaires ?',
    cm1Redac('Droites qui se coupent', 'Elles sont perpendiculaires seulement si elles forment un angle droit.', 'Non : deux droites qui se coupent sont sécantes, mais elles ne sont perpendiculaires que si elles forment un angle droit.')],
]);

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


/* ---- Figures calculées (corrections, planches) ----
   cm1dpFig({ w, h, k (quadrillage, en px), d: [P, Q] (deux points de la droite (d)), nomD, M, nomM,
   sol: 'perp' | 'para' (la droite cherchée, en rouge), nomSol, constr (parallèle : la perpendiculaire
   de construction en pointillés), taille (largeur affichée) }). */
function cm1dpFig(o){
  const W = o.w, H = o.h, [P, Q] = o.d, L = Math.hypot(Q[0] - P[0], Q[1] - P[1]), u = [(Q[0] - P[0]) / L, (Q[1] - P[1]) / L];
  // Droite (point, direction) coupée au bord de la figure.
  const ligne = (A, v, c, l, extra) => { let t0 = -1e9, t1 = 1e9; [[0, W], [0, H]].forEach(([mn, mx], i) => { if(Math.abs(v[i]) < 1e-9) return; const a = (mn - A[i]) / v[i], b = (mx - A[i]) / v[i]; t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b)); });
    return `<line x1="${(A[0] + v[0] * t0).toFixed(1)}" y1="${(A[1] + v[1] * t0).toFixed(1)}" x2="${(A[0] + v[0] * t1).toFixed(1)}" y2="${(A[1] + v[1] * t1).toFixed(1)}" stroke="${c}" stroke-width="${l}"${extra || ''}/>`; };
  const txt = (x, y, t, c, it) => `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="14" font-weight="700" fill="${c}" font-family="Space Grotesk"${it ? ' font-style="italic"' : ''} text-anchor="middle">${t}</text>`;
  const coin = (Hh, a, b) => { const z = 9; return `<path d="M${(Hh[0] + a[0] * z).toFixed(1)},${(Hh[1] + a[1] * z).toFixed(1)} L${(Hh[0] + a[0] * z + b[0] * z).toFixed(1)},${(Hh[1] + a[1] * z + b[1] * z).toFixed(1)} L${(Hh[0] + b[0] * z).toFixed(1)},${(Hh[1] + b[1] * z).toFixed(1)}" fill="none" stroke="#1F3A5C" stroke-width="1.5"/>`; };
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${o.taille || W}px;max-width:100%;display:inline-block;vertical-align:middle;background:#fff;overflow:hidden;">`;
  if(o.k){ for(let x = 0; x <= W; x += o.k) s += `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="#C9DCEB" stroke-width="1"/>`; for(let y = 0; y <= H; y += o.k) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#C9DCEB" stroke-width="1"/>`; }
  s += ligne(P, u, '#1F3A5C', 2);
  const fin = u[0] >= 0 ? Q : P;
  s += txt(Math.min(W - 18, Math.max(18, fin[0] + 4)), Math.min(H - 5, Math.max(15, fin[1] + (u[1] * (u[0] >= 0 ? 1 : -1) > 0 ? 20 : -10))), o.nomD || '(d)', '#1F3A5C');
  if(o.M){
    const M = o.M, n0 = [-u[1], u[0]], t = (M[0] - P[0]) * u[0] + (M[1] - P[1]) * u[1], Hh = [P[0] + u[0] * t, P[1] + u[1] * t];
    const dM = Math.hypot(M[0] - Hh[0], M[1] - Hh[1]), n = dM > .5 ? [(M[0] - Hh[0]) / dM, (M[1] - Hh[1]) / dM] : n0;
    if(o.sol === 'perp'){ s += ligne(M, n, '#E35D3A', 2.2) + coin(Hh, u, n); const e = [M[0] + n[0] * 26, M[1] + n[1] * 26]; s += txt(Math.min(W - 16, Math.max(16, e[0] + 22)), Math.max(14, e[1]), o.nomSol || "(d')", '#E35D3A'); }
    if(o.sol === 'para'){
      if(o.constr){ s += ligne(M, n, '#7A8BA0', 1.4, ' stroke-dasharray="5 4"') + coin(Hh, u, n) + coin(M, u, [-n[0], -n[1]]); if(o.nomConstr){ const e = [Hh[0] - n[0] * 26, Hh[1] - n[1] * 26]; s += txt(Math.min(W - 16, Math.max(16, e[0] + 18)), Math.min(H - 6, Math.max(14, e[1])), o.nomConstr, '#7A8BA0'); } }
      s += ligne(M, u, '#E35D3A', 2.2) + txt(Math.min(W - 18, Math.max(18, M[0] + u[0] * 120)), Math.max(14, M[1] + u[1] * 120 - 10), o.nomSol || "(d')", '#E35D3A');
    }
    s += `<path d="M${M[0] - 5},${M[1] - 5} L${M[0] + 5},${M[1] + 5} M${M[0] - 5},${M[1] + 5} L${M[0] + 5},${M[1] - 5}" stroke="#1F3A5C" stroke-width="2"/>` + txt(M[0] - 12, M[1] - 8, o.nomM || 'M', '#1F3A5C', true);
    // trace : 'perp' ou 'para' -- à l'écran, l'élève trace la droite en touchant deux nœuds du quadrillage (planches-num.js).
    if(o.trace && o.k){ const v = o.trace === 'perp' ? n : u; s = s.replace('<svg ', `<svg data-pltrace='${JSON.stringify({ k: o.k, w: W, h: H, M, v: [+v[0].toFixed(4), +v[1].toFixed(4)] })}' `); }
  }
  return s + '</svg>';
}
// Deux droites qui se coupent au centre : angles (en degrés) de chacune ; ou parallèles (ecart en px).
// equerre : l'équerre posée (corrigé) -- son angle droit au point de croisement, un côté le long de la
// droite verte ; si l'autre côté suit la droite bleue, les droites sont perpendiculaires.
function cm1dpPaire(a1, a2, ecart, equerre){
  const r = Math.PI / 180, c = [60, 42], v1 = [Math.cos(a1 * r), Math.sin(a1 * r)], v2 = [Math.cos(a2 * r), Math.sin(a2 * r)];
  const seg = (A, v, col) => `<line x1="${(A[0] - v[0] * 52).toFixed(1)}" y1="${(A[1] - v[1] * 52).toFixed(1)}" x2="${(A[0] + v[0] * 52).toFixed(1)}" y2="${(A[1] + v[1] * 52).toFixed(1)}" stroke="${col}" stroke-width="2.5" stroke-linecap="round"/>`;
  const A2 = ecart ? [c[0] - v1[1] * ecart, c[1] + v1[0] * ecart] : c, A1 = ecart ? [c[0] + v1[1] * ecart, c[1] - v1[0] * ecart] : c;
  let eq = '';
  if(equerre && !ecart){
    // Côté de l'équerre le long de la droite verte, vers la droite bleue ; l'autre côté à angle droit, du côté de la bleue.
    let u = v1, w = [-v1[1], v1[0]]; if(w[0] * v2[0] + w[1] * v2[1] < 0) w = [-w[0], -w[1]];
    if(u[0] * v2[0] + u[1] * v2[1] < 0) u = [-u[0], -u[1]];
    const P = (a, b) => `${(c[0] + u[0] * a + w[0] * b).toFixed(1)},${(c[1] + u[1] * a + w[1] * b).toFixed(1)}`;
    eq = `<path d="M${P(0, 0)} L${P(40, 0)} L${P(0, 30)} Z M${P(7, 6)} L${P(26, 6)} L${P(7, 20)} Z" fill="#9BB7D4" fill-opacity=".6" fill-rule="evenodd" stroke="#4E6E91" stroke-width="1"/>`;
  }
  return `<svg class="pl-libre" viewBox="0 0 120 84" style="width:110px;display:block;margin:0 auto;">${eq}${seg(A1, v1, '#2E9C6A')}${seg(A2, v2, '#2EA8C9')}</svg>`;
}
function cm1dpRect(){ return `<svg class="pl-libre" viewBox="0 0 170 104" style="width:150px;display:inline-block;vertical-align:middle;"><rect x="22" y="18" width="126" height="66" fill="#2EA8C9" fill-opacity=".1" stroke="#1F3A5C" stroke-width="2"/>${[[22, 18, 'A', -9, -4], [148, 18, 'B', 9, -4], [148, 84, 'C', 9, 14], [22, 84, 'D', -9, 14]].map(([x, y, t, dx, dy]) => `<text x="${x + dx}" y="${y + dy}" font-size="13" font-weight="700" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${t}</text>`).join('')}<path d="M22,28 h10 v-10 M138,18 v10 h10 M148,74 h-10 v10 M32,84 v-10 h-10" fill="none" stroke="#1F3A5C" stroke-width="1.3"/></svg>`; }

/* Planches d'exercices imprimables (planches.js), aussi faisables à l'écran quand on entoure. */
(() => {
  const ouiNon = (fig, r) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${fig}${r ? plEntoure(r) : '<b>oui · non</b>'}</span>`;
  const PERP = [[20, 110, 'oui'], [0, 78, 'non'], [-35, 55, 'oui'], [40, 100, 'non']], PARA = [[15, 15, 'oui', 16], [-20, -11, 'non', 14], [70, 70, 'oui', 18], [0, 8, 'non', 16]];
  const RECT = [['Les côtés [AB] et [BC] sont ', 'perpendiculaires'], ['Les côtés [AB] et [DC] sont ', 'parallèles'], ['Les côtés [AD] et [BC] sont ', 'parallèles'], ['Les côtés [DC] et [CB] sont ', 'perpendiculaires']];
  const VF = [['Deux droites perpendiculaires forment quatre angles droits. ', 'vrai'], ['Deux droites qui se coupent sont toujours perpendiculaires. ', 'faux'], ['Deux droites parallèles ne se coupent jamais. ', 'vrai'], ['Deux droites perpendiculaires à une même droite sont parallèles. ', 'vrai']];
  const F = o => cm1dpFig(Object.assign({ taille: 175 }, o));
  const G1 = { w: 192, h: 128, k: 16, d: [[16, 96], [176, 96]], M: [112, 32] }, G2 = { w: 192, h: 128, k: 16, d: [[16, 112], [112, 16]], M: [128, 80] }, G3 = { w: 192, h: 128, k: 16, d: [[16, 112], [80, 48]], M: [128, 112], nomM: 'N' };
  const U1 = { w: 240, h: 125, d: [[10, 110], [230, 65]], M: [130, 25], nomM: 'A' }, U2 = { w: 240, h: 125, d: [[10, 30], [230, 100]], M: [120, 65], nomM: 'B' }, U3 = { w: 340, h: 120, d: [[10, 100], [330, 70]], M: [190, 25], nomM: 'N' };
  PLANCHES['cm1|Droites parallèles et perpendiculaires'] = [
    { titre: 'Reconnaître des droites perpendiculaires et parallèles', duree: '30 min',
      attendus: ['Reconnaître et vérifier à l\'équerre que deux droites sont perpendiculaires', 'Reconnaître que deux droites sont parallèles'],
      exos: [
        { etoiles: 1, consigne: 'Ces deux droites sont-elles perpendiculaires ? Vérifie avec ton équerre, puis entoure.',
          eleve: plGrille(PERP.map(([a, b]) => ouiNon(cm1dpPaire(a, b))), 4), corr: plGrille(PERP.map(([a, b, r]) => ouiNon(cm1dpPaire(a, b, 0, true), r)), 4) },
        { etoiles: 1, consigne: 'Ces deux droites sont-elles parallèles ? Imagine-les prolongées, puis entoure.',
          eleve: plGrille(PARA.map(([a, b, , e]) => ouiNon(cm1dpPaire(a, b, e))), 4), corr: plGrille(PARA.map(([a, b, r, e]) => ouiNon(cm1dpPaire(a, b, e), r)), 4) },
        { etoiles: 2, col: 1, consigne: `ABCD est un rectangle. Entoure le bon mot.<div style="margin:3px 0;">${cm1dpRect()}</div>`,
          eleve: plListe(RECT.map(([t]) => t + '<b>perpendiculaires · parallèles</b>')), corr: plListe(RECT.map(([t, r]) => t + plEntoure(r))) },
        { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
          eleve: plListe(VF.map(([t]) => t + '<b>vrai · faux</b>')), corr: plListe(VF.map(([t, r]) => t + plEntoure(r))) },
      ] },
    { titre: 'Tracer une droite perpendiculaire', duree: '35 min',
      attendus: ['Tracer la droite perpendiculaire à une droite passant par un point : sur quadrillage (lignes et diagonales) et à l\'équerre', 'Pour aller plus loin : tracer la droite parallèle passant par un point'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Trace la droite perpendiculaire à la droite (d) passant par le point M, en suivant les lignes du quadrillage.', eleve: F(Object.assign({ trace: 'perp' }, G1)), corr: F(Object.assign({ sol: 'perp' }, G1)) },
        { etoiles: 2, col: 1, consigne: 'La droite (d) suit les diagonales des carreaux. Trace la droite perpendiculaire à la droite (d) passant par le point M.', eleve: F(Object.assign({ trace: 'perp' }, G2)), corr: F(Object.assign({ sol: 'perp' }, G2)) },
        { etoiles: 2, consigne: 'Avec ton équerre, trace la droite perpendiculaire à la droite (d) passant par le point A, puis celle passant par le point B. Code les angles droits.',
          eleve: plGrille([F(Object.assign({ taille: 200 }, U1)), F(Object.assign({ taille: 200 }, U2))], 2), corr: plGrille([F(Object.assign({ sol: 'perp', taille: 200 }, U1)), F(Object.assign({ sol: 'perp', taille: 200 }, U2))], 2) },
        { etoiles: 3, col: 1, plus: true, consigne: 'Trace la droite parallèle à la droite (d) passant par le point N, sur le quadrillage.', eleve: F(Object.assign({ trace: 'para' }, G3)), corr: F(Object.assign({ sol: 'para' }, G3)) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une feuille blanche, construis un rectangle ABCD de 6 cm de long et 3 cm de large, avec ta règle et ton équerre.',
          corr: cm1Redac('Construction du rectangle ABCD', { suite: ['Je trace le segment [AB] de 6 cm.', 'En A et en B, je trace les perpendiculaires au segment [AB] et j\'y place D et C à 3 cm.', 'Je trace le segment [DC].'] }, 'ABCD a quatre angles droits : c\'est un rectangle de 6 cm sur 3 cm.', cm1dpRect()) },
        { etoiles: 3, plus: true, consigne: 'Trace la droite parallèle à la droite (d) passant par le point N (avec deux perpendiculaires, ou avec la règle et l\'équerre qui glisse).', eleve: F(Object.assign({ taille: 300 }, U3)), corr: F(Object.assign({ taille: 300, sol: 'para', constr: true, nomConstr: "(d')", nomSol: "(d'')" }, U3)) },
      ] },
  ];
})();

DEMO_QUIZZES['cm1|Droites parallèles et perpendiculaires'] = [
  {q:"Que forment deux droites perpendiculaires en se coupant ?",
   opts:["Quatre angles droits","Deux droites parallèles","Un seul point sans angle"], correct:0},
  {q:"Quel outil utilise-t-on pour vérifier que deux droites sont perpendiculaires ?",
   opts:["Une règle seule","Une équerre","Un compas"], correct:1},
  {q:"Que peut-on dire de deux droites parallèles ?",
   opts:["Elles se coupent toujours une fois","Elles ne se coupent jamais","Elles forment un angle droit"], correct:1},
];

DEMO_REGISTRY['cm1|Droites parallèles et perpendiculaires'] = { cours:'cours-demo-cm1-droites-paralleles', methode:'methode-demo-cm1-droites-paralleles', exos:'exos-demo-cm1-droites-paralleles', histoire:'histoire-demo-cm1-droites-paralleles',
  init:()=>{ cm1dpPerpOuiDemo.reset(); cm1dpPerpNonDemo.reset(); cmAnimDessiner('cm1-dp-paral'); if(cm1dpPm){ cm1dpPm.reset(); cm1dpPam.reset(); cm1dpDblDemo.reset(); cm1dpQuadDemo.reset(); cmAnimDessiner('cm1dp-para-L'); } } };
document.addEventListener('DOMContentLoaded', cm1dpMethodes);

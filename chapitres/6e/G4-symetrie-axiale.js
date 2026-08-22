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
    <polygon points="220,60 180,60 180,100 200,120 220,100" fill="rgba(227,93,58,.10)" stroke="#E35D3A" stroke-width="1.8"/>
    <text x="145" y="20" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
</div>
<p style="margin:4px 0 0;">Les deux figures se superposent par pliage le long de la droite <b>(d)</b> : elles sont donc symétriques par rapport à <b>(d)</b>.</p>
<p style="margin:8px 0 0;">Deux points sont symétriques par rapport à une droite s'ils se superposent par pliage le long de cette droite.</p>

<div class="lesson-header"><span class="num">2</span><h3>Symétrie d'un point</h3></div>

<span class="def-badge">Définition</span>
<div class="def-box">Le <b>symétrique</b> d'un point M par rapport à une droite (d) est le point M' tel que <b>(d) soit la médiatrice</b> du segment [MM'] (c'est-à-dire tel que (d) soit perpendiculaire au segment [MM'] en son milieu).</div>
<p class="example-title">Exemple : construis M', symétrique du point M par rapport à la droite (d).</p>
<p class="hint" style="margin:0 0 8px;">Axe horizontal ou vertical :</p>
<div class="figure-wrap" style="max-width:320px;margin:12px auto;">
  <svg viewBox="0 0 260 140" style="width:100%;display:block;">
    <defs>
      <pattern id="gridSymAxiale" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E4DFD6" stroke-width="1"/>
      </pattern>
    </defs>
    <rect x="0" y="0" width="260" height="140" fill="url(#gridSymAxiale)"/>
    <line x1="140" y1="0" x2="140" y2="140" stroke="#E35D3A" stroke-width="1.4"/>
    <line x1="80" y1="60" x2="200" y2="60" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
    <circle cx="80" cy="60" r="3" fill="#1F3A5C"/>
    <circle cx="200" cy="60" r="3" fill="#1F3A5C"/>
    <text x="70" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text x="204" y="52" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="145" y="16" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
</div>
<p style="margin:4px 0 0;">M et M' sont situés à la même distance de <b>(d)</b>, de part et d'autre, sur une perpendiculaire à <b>(d)</b>. On compte le nombre de carreaux de M jusqu'à <b>(d)</b> (ici 3), et on reporte le même nombre de carreaux de l'autre côté de <b>(d)</b>.</p>

<p class="hint" style="margin:16px 0 8px;">Axe en diagonale : la méthode est la même, mais on compte les carreaux <b>en escalier</b>, en suivant les côtés des carreaux (jamais en diagonale d'un seul trait).</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 200 180" style="width:100%;display:block;">
    <rect x="0" y="0" width="200" height="180" fill="url(#gridSymAxiale)"/>
    <line x1="10" y1="170" x2="190" y2="-10" stroke="#E35D3A" stroke-width="1.4"/>
    <polyline points="60,60 70,60 70,70 80,70 80,80 90,80 90,90" fill="none" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <polyline points="90,90 100,90 100,100 110,100 110,110 120,110 120,120" fill="none" stroke="#9CA3AF" stroke-width="1.3" stroke-dasharray="3 3"/>
    <text x="62" y="57" font-family="JetBrains Mono" font-size="10" fill="#6B7280">1</text>
    <text x="72" y="67" font-family="JetBrains Mono" font-size="10" fill="#6B7280">2</text>
    <text x="82" y="77" font-family="JetBrains Mono" font-size="10" fill="#6B7280">3</text>
    <text x="102" y="87" font-family="JetBrains Mono" font-size="10" fill="#6B7280">3</text>
    <text x="112" y="97" font-family="JetBrains Mono" font-size="10" fill="#6B7280">2</text>
    <text x="122" y="107" font-family="JetBrains Mono" font-size="10" fill="#6B7280">1</text>
    <circle cx="60" cy="60" r="3" fill="#1F3A5C"/>
    <circle cx="120" cy="120" r="3" fill="#1F3A5C"/>
    <text x="46" y="56" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M</text>
    <text x="126" y="128" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">M'</text>
    <text x="150" y="30" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
</div>
<p style="margin:4px 0 0;">De M, on compte 3 carreaux en escalier (perpendiculairement à <b>(d)</b>) pour atteindre <b>(d)</b>, puis on reporte les 3 mêmes carreaux, toujours en escalier, de l'autre côté de <b>(d)</b> pour trouver <b>M'</b>.</p>
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
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="60" y1="40" x2="110" y2="130" stroke="#1F3A5C" stroke-width="1.8"/>
      <line x1="220" y1="40" x2="170" y2="130" stroke="#1F3A5C" stroke-width="1.8"/>
    </svg>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un segment</p>
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="60" y1="50" x2="100" y2="110" stroke="#1F3A5C" stroke-width="1.8"/>
      <line x1="220" y1="50" x2="180" y2="110" stroke="#1F3A5C" stroke-width="1.8"/>
      <text x="48" y="48" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">C</text>
      <text x="104" y="118" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">D</text>
      <text x="224" y="48" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">C'</text>
      <text x="160" y="118" font-family="Space Grotesk" font-size="12" fill="#1F3A5C" font-weight="700">D'</text>
    </svg>
  </div>
  <div class="figure-wrap" style="margin:0;">
    <p class="hint" style="text-align:center;margin:0 0 4px;">Symétrique d'un cercle</p>
    <svg viewBox="0 0 280 160" style="width:100%;display:block;">
      <line x1="140" y1="10" x2="140" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
      <line x1="70" y1="80" x2="210" y2="80" stroke="#9CA3AF" stroke-width="1.2" stroke-dasharray="4 3"/>
      <circle cx="70" cy="80" r="35" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle cx="70" cy="80" r="2.5" fill="#1F3A5C"/>
      <circle cx="210" cy="80" r="35" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>
      <circle cx="210" cy="80" r="2.5" fill="#1F3A5C"/>
    </svg>
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
  <svg viewBox="0 0 240 170" style="width:100%;display:block;">
    <line x1="120" y1="20" x2="120" y2="150" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <line x1="50" y1="140" x2="190" y2="140" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="120" y1="140" x2="120" y2="50" stroke="#1C1B2E" stroke-width="1.4"/>
    <path d="M 108 140 L 108 128 L 120 128 L 120 140" fill="none" stroke="#9CA3AF" stroke-width="1.1"/>
    <line x1="82.9" y1="88.3" x2="87.1" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="157.1" y1="88.3" x2="152.9" y2="101.7" stroke="#1C1B2E" stroke-width="1.6"/>
    <circle cx="120" cy="50" r="3" fill="#1F3A5C"/>
    <text x="38" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">A</text>
    <text x="196" y="150" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">B</text>
    <text x="126" y="46" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">P</text>
    <text x="126" y="18" font-family="Space Grotesk" font-size="13" fill="#E35D3A" font-weight="700">(d)</text>
  </svg>
</div>
<p style="margin:4px 0 0;"><b>(d)</b> est la médiatrice de <b>[AB]</b>. Le point <b>P</b>, situé sur <b>(d)</b>, est équidistant de <b>A</b> et de <b>B</b> : <b>PA = PB</b>.</p>

<div class="lesson-header"><span class="num">5</span><h3>Axe de symétrie d'un angle</h3></div>

<span class="prop-badge">Propriété</span>
<div class="def-box">La <b>bissectrice</b> d'un angle est <b>l'axe de symétrie</b> de cet angle.</div>

<p class="example-title">Exemple :</p>
<div class="figure-wrap" style="max-width:280px;margin:12px auto;">
  <svg viewBox="0 0 250 190" style="width:100%;display:block;">
    <line x1="60" y1="170" x2="230" y2="170" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="60" y1="170" x2="157.5" y2="30.7" stroke="#1C1B2E" stroke-width="1.8"/>
    <line x1="60" y1="170" x2="197.5" y2="98.4" stroke="#E35D3A" stroke-width="1.4" stroke-dasharray="5 4"/>
    <path d="M 92.0 170.0 A 32 32 0 0 0 88.4 155.2" fill="none" stroke="#9CA3AF" stroke-width="1.3"/>
    <path d="M 88.4 155.2 A 32 32 0 0 0 78.4 143.8" fill="none" stroke="#9CA3AF" stroke-width="1.3"/>
    <text x="42" y="180" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">O</text>
    <text x="234" y="176" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">x</text>
    <text x="152" y="24" font-family="Space Grotesk" font-size="13" fill="#1F3A5C" font-weight="700">y</text>
  </svg>
</div>
<p style="margin:4px 0 0;">La demi-droite (en pointillés), <b>bissectrice</b> de l'angle <span class="tex">\\widehat{xOy}</span>, le partage en deux angles de même mesure.</p>
`;

document.getElementById('methode-demo-symetrie-axiale-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Constructions</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie (symétrique d'un point à l'équerre/à la règle/au compas, médiatrice et bissectrice à la règle et au compas) est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-symetrie-axiale-6e').innerHTML = `
<div class="redaction-note">⚠️ En rédaction, on n'utilise jamais <b>car</b> ni <b>parce que</b>. On énonce d'abord ce que l'on sait, puis on conclut avec <b>donc</b> (ou <b>or … donc</b>).</div>
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Symétrie axiale'] = {
  cours:'cours-demo-symetrie-axiale-6e', methode:'methode-demo-symetrie-axiale-6e', exos:'exos-demo-symetrie-axiale-6e',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('methode-demo-symetrie-axiale-6e'));
    renderStaticMath(document.getElementById('exos-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('cours-demo-symetrie-axiale-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-symetrie-axiale-6e'));
  }
};

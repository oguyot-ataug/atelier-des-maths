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
<div class="sub-header"><span class="letter">M</span><h4>Méthode</h4></div>
<p class="hint" style="margin:8px 0;">Cette partie (construction du cercle circonscrit à la règle et au compas) est en cours de préparation, elle arrivera dans une prochaine mise à jour.</p>
`;

document.getElementById('exos-demo-proprietes-triangles').innerHTML = `
<p class="hint" style="margin:8px 0;">Les exercices de ce chapitre sont en cours de préparation, ils arriveront dans une prochaine mise à jour.</p>
`;

DEMO_REGISTRY['6e|Propriétés des triangles'] = {
  cours:'cours-demo-proprietes-triangles', methode:'methode-demo-proprietes-triangles', exos:'exos-demo-proprietes-triangles',
  init:()=>{
    renderStaticMath(document.getElementById('cours-demo-proprietes-triangles'));
    renderStaticMath(document.getElementById('methode-demo-proprietes-triangles'));
    renderStaticMath(document.getElementById('exos-demo-proprietes-triangles'));
    injectCourseAddButtons(document.getElementById('cours-demo-proprietes-triangles'));
    injectCourseAddButtons(document.getElementById('methode-demo-proprietes-triangles'));
  }
};

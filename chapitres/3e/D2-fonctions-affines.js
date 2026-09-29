/* ============================================================
   CHAPITRE : Fonctions linéaires et affines (3e, D2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 105-107) : plan du manuel (fonction affine : définition, image et
   antécédent, représentation graphique, coefficient directeur et ordonnée à l'origine ; fonction
   linéaire : définition et droite passant par l'origine ; proportionnalité : fonction linéaire et
   proportionnalité, pourcentages), titres reformulés, exemples nouveaux.
   Méthode animée : une droite y = ax + b réglable (escalier du coefficient directeur), tracer une
   droite pas à pas, retrouver la fonction à partir de deux points, un calculateur de pourcentages
   (et le piège « +20 % puis −20 % »).
   Réutilise fn3Repere / fn3Tab (chapitres/3e/D1-fonctions.js), ro3Croix (chapitres/3e/G3-rotation.js),
   r4Ex / r4Colonne / R4_REM (chargés avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const FA3_BLEU = '#0C5BA0', FA3_VERT = '#1E7B34', FA3_ROUGE = '#C0392B', FA3_ORANGE = '#E07B00', FA3_VIOLET = '#7A3E9D', FA3_ENCRE = '#1C1B2E';
const fa3Tex = s => `<span class="tex"${s.length < 34 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const fa3C = (c, s) => `\\textcolor{${c}}{${s}}`;
const fa3N = v => { const r = Math.round(v * 1000) / 1000; return String(r).replace('.', ',').replace('-', '−'); };
const fa3T = v => { const r = Math.round(v * 1000) / 1000; return String(r).replace('.', '{,}'); };
// Expression ax + b en KaTeX.
function fa3Expr(a, b){
  const ax = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '-x' : fa3T(a) + 'x';
  if(b === 0) return ax || '0';
  return ax ? `${ax} ${b < 0 ? '-' : '+'} ${fa3T(Math.abs(b))}` : fa3T(b);
}
// Repère + droite(s) : [{ a, b, c }] ; points [{ x, y, nom, c }].
function fa3Fig(droites, pts, x0, x1, y0, y1, o){
  o = o || {};
  const R = fn3Repere(null, x0, x1, y0, y1, { W: o.W || 360, H: o.H || 320 });
  let h = R.svg;
  droites.forEach(d => { let xa = x0, xb = x1; // on coupe la droite aux bords du cadre
    if(d.a){ const u = (y0 - d.b) / d.a, v = (y1 - d.b) / d.a; xa = Math.max(x0, Math.min(u, v)); xb = Math.min(x1, Math.max(u, v)); }
    h += `<line x1="${R.X(xa)}" y1="${R.Y(d.a * xa + d.b)}" x2="${R.X(xb)}" y2="${R.Y(d.a * xb + d.b)}" stroke="${d.c || FA3_BLEU}" stroke-width="2.4"/>`;
    if(d.nom){ const xn = d.xn != null ? d.xn : x1 - 0.6; h += `<text x="${R.X(xn) + 6}" y="${R.Y(d.a * xn + d.b) - 6}" font-size="13" font-weight="700" fill="${d.c || FA3_BLEU}">${d.nom}</text>`; } });
  // Convention : un point d'une droite tracée = petit trait perpendiculaire ; un point isolé = croix.
  (pts || []).forEach(p => { const d = droites.find(d => Math.abs(d.a * p.x + d.b - p.y) < 1e-9), P = [R.X(p.x), R.Y(p.y)];
    h += (d ? ro3Trait(P, [-(R.Y(d.a) - R.Y(0)), R.X(1) - R.X(0)], p.c || FA3_ROUGE) : ro3Croix(P, p.c || FA3_ROUGE)) + (p.nom ? `<text x="${R.X(p.x) + 8}" y="${R.Y(p.y) - 6}" font-size="12" font-weight="700" fill="${p.c || FA3_ROUGE}">${p.nom}</text>` : ''); });
  if(o.extra) h += o.extra(R);
  return `<svg viewBox="0 0 ${R.W} ${R.H}" style="width:100%;max-width:${o.maxW || 360}px;display:block;margin:8px auto;">${h}</svg>`;
}
// Escalier du coefficient directeur à partir du point d'abscisse x.
const fa3Escalier = (R, a, b, x, c) => `<path d="M${R.X(x)},${R.Y(a * x + b)} L${R.X(x + 1)},${R.Y(a * x + b)} L${R.X(x + 1)},${R.Y(a * (x + 1) + b)}" fill="none" stroke="${c || FA3_ORANGE}" stroke-width="2" stroke-dasharray="4 3"/>`
  + `<text x="${(R.X(x) + R.X(x + 1)) / 2}" y="${R.Y(a * x + b) + (a > 0 ? 14 : -6)}" text-anchor="middle" font-size="11" fill="${c || FA3_ORANGE}">+1</text>`
  + `<text x="${R.X(x + 1) + 6}" y="${(R.Y(a * x + b) + R.Y(a * (x + 1) + b)) / 2 + 4}" font-size="11" font-weight="700" fill="${c || FA3_ORANGE}">${a > 0 ? '+' : ''}${fa3N(a)}</text>`;

document.getElementById('cours-demo-fonctions-affines-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>La fonction affine</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Définition</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">On appelle <b>fonction affine</b> une fonction qui, à tout nombre noté <i>x</i>, associe le nombre ${fa3Tex(fa3C(FA3_BLEU, 'a') + ' \\times x + ' + fa3C(FA3_ORANGE, 'b'))} (c'est-à-dire ${fa3Tex('x \\longmapsto ' + fa3C(FA3_BLEU, 'a') + 'x + ' + fa3C(FA3_ORANGE, 'b'))}), où <b style="color:${FA3_BLEU};">a</b> et <b style="color:${FA3_ORANGE};">b</b> sont deux nombres fixés.</div>
<p class="example-title">Exemple : la fonction <i>f</i> définie par ${fa3Tex('f(x) = 2x - 5')} est une fonction affine (avec ${fa3Tex('a = 2')} et ${fa3Tex('b = -5')}).</p>
<p class="example-title">Remarques :</p>
<ul class="example-list">
  <li>Lorsque <i>a</i> = 0, la fonction est une <b>fonction constante</b> : à tout nombre <i>x</i>, elle associe le nombre <i>b</i> (par exemple ${fa3Tex('x \\longmapsto 4')}).</li>
  <li>Lorsque <i>b</i> = 0, la fonction est une <b>fonction linéaire</b> : à tout nombre <i>x</i>, elle associe le nombre <i>ax</i> (par exemple ${fa3Tex('x \\longmapsto -1{,}5x')}).</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Image et antécédent</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Par une fonction affine <b>non constante</b>, tout nombre admet un <b>unique antécédent</b>.</div>
<p class="example-title">Exemple : soit <i>f</i> la fonction affine telle que ${fa3Tex('f(x) = 2x - 5')}.</p>
<div style="display:flex;flex-wrap:wrap;gap:10px 20px;">
  <div style="flex:1 1 280px;">${r4Ex('Calculer l\'image de −3 par <i>f</i>.', [
    [fa3Tex('f(-3) = 2 \\times (-3) - 5'), 'On remplace x par −3.'],
    [fa3Tex('f(-3) = -6 - 5 = -11'), 'L\'image de −3 par f est −11.'],
  ])}</div>
  <div style="flex:1 1 280px;">${r4Ex('Calculer l\'antécédent de 9 par <i>f</i>.', [
    [fa3Tex('f(x) = 9') + ', soit ' + fa3Tex('2x - 5 = 9'), 'On cherche x qui a pour image 9 : on résout l\'équation.'],
    [fa3Tex('2x = 14') + ', donc ' + fa3Tex('x = 7'), 'L\'antécédent de 9 par f est 7.'],
  ])}</div>
</div>

<div class="sub-header"><span class="letter">C</span><h4>Représentation graphique</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La représentation graphique d'une fonction affine ${fa3Tex('f : x \\longmapsto ' + fa3C(FA3_BLEU, 'a') + 'x + ' + fa3C(FA3_ORANGE, 'b'))} est une <b>droite</b>.</div>
<span class="def-badge">Définitions</span>
<div class="def-box">Pour la droite représentant ${fa3Tex('f(x) = ' + fa3C(FA3_BLEU, 'a') + 'x + ' + fa3C(FA3_ORANGE, 'b'))} :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.9;">
    <li><b style="color:${FA3_BLEU};">a</b> s'appelle le <b>coefficient directeur</b> de la droite : c'est l'accroissement de <i>f</i>(<i>x</i>) lorsque <i>x</i> augmente d'une unité ;</li>
    <li><b style="color:${FA3_ORANGE};">b</b> s'appelle l'<b>ordonnée à l'origine</b> : ${fa3Tex('f(0) = b')}, et la droite passe par le point de coordonnées (0 ; <i>b</i>).</li></ul></div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;">
    <p class="example-title">Exemple : représenter graphiquement la fonction affine ${fa3Tex('f : x \\longmapsto 2x - 5')}.</p>
    <ul class="example-list">
      <li><i>f</i> est une fonction affine : sa représentation graphique est une droite. Pour la tracer, il suffit de connaître <b>deux</b> de ses points :
        ${fa3Tex('f(1) = 2 \\times 1 - 5 = -3')} et ${fa3Tex('f(4) = 2 \\times 4 - 5 = 3')}.</li>
      <li>On trace la droite (<i>d</i>) qui passe par les points A(1 ; −3) et B(4 ; 3).</li>
      <li>Vérification : elle passe bien par le point (0 ; −5), l'ordonnée à l'origine.</li>
      <li>Le coefficient directeur 2 est positif : la droite « <b>monte</b> » quand on la regarde de gauche à droite. Quand <i>x</i> augmente de 1, <i>f</i>(<i>x</i>) augmente de 2.</li>
    </ul></div>
  <div style="flex:1 1 260px;max-width:340px;">${fa3Fig([{ a: 2, b: -5, nom: '(d)', xn: 4.3 }], [{ x: 1, y: -3, nom: 'A' }, { x: 4, y: 3, nom: 'B' }, { x: 0, y: -5, nom: '', c: FA3_ORANGE }], -2, 5, -6, 5, { extra: R => fa3Escalier(R, 2, -5, 2) })}</div>
</div>

<div class="lesson-header"><span class="num">2</span><h3>La fonction linéaire</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Définition</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">On appelle <b>fonction linéaire</b> de coefficient <i>a</i> la fonction qui, à tout nombre <i>x</i>, associe le nombre ${fa3Tex('a \\times x')} (c'est-à-dire ${fa3Tex('x \\longmapsto ax')}), où <i>a</i> est un nombre fixé.</div>
<p class="example-title">Exemples : les fonctions définies par ${fa3Tex('g(x) = -1{,}5x')} et ${fa3Tex('h(x) = 0{,}8x')} sont linéaires.</p>
<div class="redaction-note" ${R4_REM}>Remarque : une fonction linéaire est une fonction affine particulière (le cas où <i>b</i> = 0).</div>

<div class="sub-header"><span class="letter">B</span><h4>Représentation graphique</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">La représentation graphique d'une <b>fonction linéaire</b> ${fa3Tex('x \\longmapsto ax')} est une <b>droite passant par l'origine</b> du repère.</div>
<div style="display:flex;flex-wrap:wrap;gap:6px 20px;align-items:center;">
  <div style="flex:1 1 300px;">
    <p class="example-title">Exemple : représenter graphiquement la fonction linéaire ${fa3Tex('g(x) = -1{,}5x')}.</p>
    <ul class="example-list">
      <li><i>g</i> est linéaire : sa représentation graphique est une droite qui passe par l'origine O. Il suffit de connaître <b>un autre</b> de ses points : ${fa3Tex('g(2) = -1{,}5 \\times 2 = -3')}.</li>
      <li>On trace la droite (<i>d′</i>) qui passe par O et par le point D(2 ; −3).</li>
      <li>Le coefficient directeur −1,5 est négatif : la droite « <b>descend</b> » de gauche à droite.</li>
    </ul></div>
  <div style="flex:1 1 260px;max-width:340px;">${fa3Fig([{ a: -1.5, b: 0, c: FA3_VIOLET, nom: '(d′)', xn: -2.8 }], [{ x: 2, y: -3, nom: 'D' }], -3, 4, -5, 5, { extra: R => fa3Escalier(R, -1.5, 0, 0, FA3_ORANGE) })}</div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Proportionnalité et pourcentages</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Fonction linéaire et proportionnalité</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Toute situation de <b>proportionnalité</b> peut être modélisée par une <b>fonction linéaire</b> (son coefficient est le coefficient de proportionnalité).</div>
<p class="example-title">Exemple 1 : l'aire d'un rectangle de largeur 4 cm est proportionnelle à sa longueur <i>x</i> : elle est modélisée par la fonction linéaire ${fa3Tex('x \\longmapsto 4x')}.</p>
<p class="example-title">Exemple 2 : à la station-service, l'essence coûte 1,80 € le litre. Le prix payé est proportionnel au nombre de litres : la fonction linéaire ${fa3Tex('p(x) = 1{,}8x')} traduit cette situation.</p>
<ul class="example-list"><li>${fa3Tex('p(20) = 1{,}8 \\times 20 = 36')} : 20 litres coûtent 36 €. La représentation graphique de <i>p</i> (une droite passant par l'origine) donne le prix en fonction du nombre de litres.</li></ul>

<div class="sub-header"><span class="letter">B</span><h4>Pourcentages</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:2.4;">
  <li>Pour <b>augmenter</b> un nombre de <i>t</i> %, on le multiplie par ${fa3Tex('1 + \\dfrac{t}{100}')}.</li>
  <li>Pour <b>diminuer</b> un nombre de <i>t</i> %, on le multiplie par ${fa3Tex('1 - \\dfrac{t}{100}')}.</li></ul></div>
<p><b>Preuve :</b> augmenter un nombre <i>N</i> de <i>t</i> %, c'est lui ajouter ${fa3Tex('\\dfrac{t}{100} \\times N')} : ${fa3Tex('N + \\dfrac{t}{100} \\times N = \\left(1 + \\dfrac{t}{100}\\right) \\times N')}. De même pour une diminution. C'est une fonction linéaire de <i>N</i> !</p>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Une augmentation de 15 % se traduit par une multiplication par ${fa3Tex('1 + \\dfrac{15}{100} = 1{,}15')} ; une diminution de 30 % par une multiplication par ${fa3Tex('1 - \\dfrac{30}{100} = 0{,}7')}.</li>
  <li>Un vélo coûte 240 €. Son prix augmente de 15 % : ${fa3Tex('240 \\times 1{,}15 = 276')}. Il coûte désormais 276 €.</li>
  <li>Une ville comptait 12 500 habitants ; sa population a diminué de 4 % : ${fa3Tex('12\\,500 \\times 0{,}96 = 12\\,000')}. Elle compte désormais 12 000 habitants.</li>
</ul>
`;

document.getElementById('histoire-demo-fonctions-affines-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Vers 1636, bien avant qu'on parle de « fonctions », le magistrat toulousain et mathématicien amateur <b>Pierre de Fermat</b> écrit un court traité, l'<i>Introduction aux lieux plans et solides</i>. Il y montre que lorsqu'une équation relie deux quantités inconnues au premier degré (ce que nous écririons aujourd'hui <i>y</i> = <i>ax</i> + <i>b</i>), les points correspondants forment une <b>ligne droite</b>. Au même moment, <b>René Descartes</b> publie sa <i>Géométrie</i> (1637). Ensemble, ils fondent la <b>géométrie analytique</b>, qui permet de traduire une figure en calculs et des calculs en figures : c'est exactement ce que l'on fait quand on trace la droite d'une fonction affine !
</div>
`;

document.getElementById('methode-demo-fonctions-affines-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : l'effet de a et de b sur la droite</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez le coefficient directeur <i>a</i> et l'ordonnée à l'origine <i>b</i> de la droite représentant ${fa3Tex('f(x) = ax + b')}.</p>
  <svg id="fa3-droiteSvg" viewBox="0 0 400 360" style="width:100%;max-width:420px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:420px;margin:0 auto;">
    <label for="fa3-a" style="font-weight:700;color:${FA3_BLEU};">a</label><input id="fa3-a" type="range" min="-3" max="3" step="0.5" value="2" oninput="fa3DroiteMaj()"><span id="fa3-aV" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
    <label for="fa3-b" style="font-weight:700;color:${FA3_ORANGE};">b</label><input id="fa3-b" type="range" min="-4" max="4" step="0.5" value="-1" oninput="fa3DroiteMaj()"><span id="fa3-bV" style="font-family:'JetBrains Mono',monospace;"></span>
  </div>
  <div id="fa3-droiteInfo" style="text-align:center;margin:10px 0 4px;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : tracer la droite d'une fonction affine</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Tracer la représentation graphique de ${fa3Tex('k(x) = -0{,}5x + 3')}. Cliquez sur « Étape suivante ».</p>
  <svg id="fa3-traceSvg" viewBox="0 0 360 320" style="width:100%;max-width:380px;display:block;margin:8px auto;"></svg>
  <div id="fa3-traceNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fa3TraceSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="fa3TraceReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : retrouver une fonction affine à partir de deux images</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On sait que <i>f</i> est affine, que ${fa3Tex('f(1) = 2')} et que ${fa3Tex('f(4) = 11')}. Déterminer ${fa3Tex('f(x)')}. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="fa3-retrouverDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fa3RetrouverDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fa3RetrouverDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : augmenter ou diminuer d'un pourcentage</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un prix et un pourcentage : on multiplie par le coefficient. Essayez ensuite d'enchaîner une hausse puis une baisse du même pourcentage.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="fa3-pPrix" type="text" inputmode="decimal" value="50" style="font-family:'JetBrains Mono',monospace;font-size:1.05rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:90px;text-align:center;" oninput="fa3PourcMaj()"> €
    <select id="fa3-pSens" onchange="fa3PourcMaj()" style="font-size:1rem;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"><option value="1">augmenté de</option><option value="-1">diminué de</option></select>
    <input id="fa3-pT" type="text" inputmode="decimal" value="20" style="font-family:'JetBrains Mono',monospace;font-size:1.05rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:70px;text-align:center;" oninput="fa3PourcMaj()"> %
  </div>
  <div id="fa3-pourc" style="text-align:center;line-height:2.3;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function fa3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="fa3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="fa3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-fonctions-affines-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer l'antécédent d'un nombre par une fonction affine »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">${fa3Tex('f(x) = -3x + 4')} ; antécédent de 10 ?</span><span class="we-comment">La question.</span></div>
    <div class="we-row"><span class="we-expr">${fa3Tex('-3x + 4 = 10')}</span><span class="we-comment">1. On écrit l'équation f(x) = 10.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">${fa3Tex('-3x = 6')}, donc ${fa3Tex('x = -2')}</span><span class="we-comment">2. On résout.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Vérification : f(−2) = 6 + 4 = 10. L'antécédent de 10 est −2.</span><span class="we-comment">3. On vérifie et on conclut.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${fa3Exo(1, 'Pour chaque fonction, dis si elle est affine, linéaire, constante ou rien de tout cela : ' + fa3Tex('f(x) = 4x - 1') + ' ; ' + fa3Tex('g(x) = -7x') + ' ; ' + fa3Tex('h(x) = 5') + ' ; ' + fa3Tex('k(x) = x^2 + 1') + ' ; ' + fa3Tex('m(x) = 3(x + 2)') + '.', [
    'f : affine (a = 4, b = −1). g : linéaire (donc aussi affine). h : constante (affine avec a = 0).', 'k : ni affine ni linéaire (x est au carré). m(x) = 3x + 6 : affine.'])}
  ${fa3Exo(2, 'Soit ' + fa3Tex('f(x) = -3x + 4') + '. Calcule l\'image de 2 et celle de −1, puis l\'antécédent de 10.', [
    fa3Tex('f(2) = -6 + 4 = -2') + ' ; ' + fa3Tex('f(-1) = 3 + 4 = 7') + '.', fa3Tex('-3x + 4 = 10') + ' : ' + fa3Tex('x = -2') + '.'])}
  ${fa3Exo(3, 'g est une fonction linéaire telle que g(5) = 12. Détermine son coefficient, puis calcule l\'image de 8.', [
    fa3Tex('g(x) = ax') + ' et ' + fa3Tex('5a = 12') + ', donc ' + fa3Tex('a = 2{,}4') + ' : ' + fa3Tex('g(x) = 2{,}4x') + '.', fa3Tex('g(8) = 2{,}4 \\times 8 = 19{,}2') + '.'])}
  ${fa3Exo(4, 'h est une fonction affine telle que h(0) = 3 et h(2) = 7. Détermine h(x).', [
    'h(0) = b = 3 (ordonnée à l\'origine).', 'Quand x augmente de 2, h(x) augmente de 7 − 3 = 4 : ' + fa3Tex('a = \\dfrac{4}{2} = 2') + '. Donc ' + fa3Tex('h(x) = 2x + 3') + '.'])}
  ${fa3Exo(5, 'Voici la droite représentant une fonction affine u. Lis l\'ordonnée à l\'origine et le coefficient directeur, puis donne u(x).', [
    'La droite coupe l\'axe des ordonnées en (0 ; −1) : b = −1.', 'Elle passe aussi par (2 ; 3) : quand x augmente de 2, u(x) augmente de 4, donc a = 2.', fa3Tex('u(x) = 2x - 1') + '.'],
    fa3Fig([{ a: 2, b: -1, c: FA3_VERT }], [{ x: 0, y: -1, c: FA3_ORANGE }, { x: 2, y: 3, c: FA3_ROUGE }], -2, 4, -4, 5, { maxW: 280 }))}
  ${fa3Exo(6, 'Piscine : tarif A, 12 € la séance ; tarif B, un abonnement de 30 € puis 7 € la séance. Exprime le prix de x séances avec chaque tarif, puis trouve à partir de combien de séances le tarif B est le plus avantageux.', [
    'Tarif A : ' + fa3Tex('A(x) = 12x') + ' (linéaire) ; tarif B : ' + fa3Tex('B(x) = 7x + 30') + ' (affine).', fa3Tex('12x = 7x + 30') + ' donne ' + fa3Tex('5x = 30') + ', soit x = 6 : pour 6 séances, les deux tarifs coûtent 72 €.',
    'Au-delà de 6 séances, le tarif B est le plus avantageux (par exemple 7 séances : A = 84 €, B = 79 €).'])}
  ${fa3Exo(7, 'Un jean coûte 50 €. Son prix augmente de 20 %, puis le nouveau prix baisse de 20 %. Retrouve-t-on le prix de départ ?', [
    '50 × 1,2 = 60 €, puis 60 × 0,8 = 48 €.', 'Non : on obtient 48 €, car la baisse de 20 % s\'applique à un prix plus grand. Globalement, 1,2 × 0,8 = 0,96 : c\'est une baisse de 4 %.'])}
  ${fa3Exo(8, 'Après une réduction de 25 %, un article coûte 36 €. Quel était son prix avant la réduction ?', [
    'Diminuer de 25 %, c\'est multiplier par 0,75 : ' + fa3Tex('0{,}75 \\times P = 36') + '.', fa3Tex('P = \\dfrac{36}{0{,}75} = 48') + ' : l\'article coûtait 48 €.'])}
  ${fa3Exo(9, 'Le point E(3 ; 5) appartient-il à la droite représentant ' + fa3Tex('f(x) = 2x - 1') + ' ? Et le point F(−2 ; −4) ?', [
    fa3Tex('f(3) = 6 - 1 = 5') + ' : E appartient à la droite.', fa3Tex('f(-2) = -4 - 1 = -5 \\neq -4') + ' : F n\'appartient pas à la droite.'])}
</div>
`;

/* ---- Méthode 1 : droite réglable ---- */
function fa3DroiteMaj(){
  const a = Number(document.getElementById('fa3-a').value), b = Number(document.getElementById('fa3-b').value);
  document.getElementById('fa3-aV').textContent = fa3N(a); document.getElementById('fa3-bV').textContent = fa3N(b);
  const svg = fa3Fig([{ a, b }], [{ x: 0, y: b, c: FA3_ORANGE }], -4, 4, -6, 6, { W: 400, H: 360, maxW: 420, extra: R => a !== 0 && Math.abs(a + b) <= 6 ? fa3Escalier(R, a, b, 0) : '' });
  document.getElementById('fa3-droiteSvg').innerHTML = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  const type = a === 0 ? 'fonction <b>constante</b> : la droite est horizontale' : b === 0 ? 'fonction <b>linéaire</b> : la droite passe par l\'origine' : 'fonction <b>affine</b>';
  const sens = a > 0 ? `a &gt; 0 : la droite <b style="color:${FA3_VERT};">monte</b> ; quand x augmente de 1, f(x) augmente de ${fa3N(a)}.` : a < 0 ? `a &lt; 0 : la droite <b style="color:${FA3_ROUGE};">descend</b> ; quand x augmente de 1, f(x) diminue de ${fa3N(-a)}.` : '';
  const info = document.getElementById('fa3-droiteInfo');
  info.innerHTML = `${fa3Tex('f(x) = ' + fa3Expr(a, b))} — ${type}.<br>${sens}${sens ? '<br>' : ''}La droite coupe l'axe des ordonnées au point <span style="color:${FA3_ORANGE};font-weight:700;">(0 ; ${fa3N(b)})</span>.`;
  renderStaticMath(info);
}

/* ---- Méthode 2 : tracer une droite ---- */
const FA3_T_NOTES = [
  'k est affine : sa représentation graphique est une droite. Il suffit de deux points.',
  'On calcule deux images : k(0) = 3 et k(4) = −0,5 × 4 + 3 = 1. On place A(0 ; 3) et B(4 ; 1).',
  'On trace la droite (AB) à la règle, en la prolongeant de part et d\'autre.',
  'Contrôle avec un troisième point : k(−2) = 1 + 3 = 4. Le point C(−2 ; 4) est bien sur la droite.',
];
let fa3TK = 0;
function fa3TraceDessin(k){
  const pts = k >= 1 ? [{ x: 0, y: 3, nom: 'A' }, { x: 4, y: 1, nom: 'B' }] : [];
  if(k >= 3) pts.push({ x: -2, y: 4, nom: 'C', c: FA3_VERT });
  const svg = fa3Fig(k >= 2 ? [{ a: -0.5, b: 3 }] : [], pts, -3, 5, -2, 6);
  document.getElementById('fa3-traceSvg').innerHTML = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  document.getElementById('fa3-traceNote').textContent = FA3_T_NOTES[k];
}
function fa3TraceSuivant(){ if(fa3TK < FA3_T_NOTES.length - 1) fa3TK++; fa3TraceDessin(fa3TK); }
function fa3TraceReset(){ fa3TK = 0; fa3TraceDessin(0); }

/* ---- Méthode 3 : retrouver f ---- */
const FA3_RET_STEPS = [
  { expr: 'f est affine : ' + fa3Tex('f(x) = ax + b') + '.', note: 'On cherche les deux nombres a et b.' },
  { expr: 'De x = 1 à x = 4, x augmente de 3 ; f(x) passe de 2 à 11 : il augmente de 9.', note: 'Le coefficient directeur est l\'accroissement de f(x) quand x augmente de 1.' },
  { expr: fa3Tex('a = \\dfrac{f(4) - f(1)}{4 - 1} = \\dfrac{11 - 2}{3} = 3'), note: 'Accroissement des images divisé par l\'accroissement des nombres.' },
  { expr: fa3Tex('f(1) = 3 \\times 1 + b = 2') + ', donc ' + fa3Tex('b = -1'), note: 'On utilise une des deux images pour trouver b.' },
  { expr: fa3Tex('f(x) = 3x - 1') + ' ; vérification : ' + fa3Tex('f(4) = 12 - 1 = 11'), note: 'On vérifie avec l\'autre image.' },
];
const fa3RetrouverDemo = makeStepDemo(FA3_RET_STEPS, 'fa3-retrouverDisplay');

/* ---- Méthode 4 : pourcentages ---- */
function fa3PourcMaj(){
  const lire = id => parseFloat(String(document.getElementById(id).value).replace(',', '.').replace(/\s/g, ''));
  const P = lire('fa3-pPrix'), t = lire('fa3-pT'), s = Number(document.getElementById('fa3-pSens').value), out = document.getElementById('fa3-pourc');
  if(!(P >= 0) || !(t >= 0) || (s < 0 && t > 100)){ out.innerHTML = '<span class="hint" style="margin:0;color:#a83c1f;">Écrivez un prix positif et un pourcentage (au plus 100 % pour une baisse).</span>'; return; }
  const k = 1 + s * t / 100, R = P * k, k2 = 1 - s * t / 100, R2 = R * k2;
  out.innerHTML = `Coefficient multiplicateur : ${fa3Tex(`1 ${s > 0 ? '+' : '-'} \\dfrac{${fa3T(t)}}{100} = ${fa3T(k)}`)}<br>`
    + `${fa3Tex(`${fa3T(P)} \\times ${fa3T(k)} = ${fa3T(R)}`)} : le prix devient <b>${fa3N(Math.round(R * 100) / 100)} €</b>.<br>`
    + `<span class="hint" style="margin:0;">Et si ensuite on ${s > 0 ? 'baisse' : 'augmente'} de ${fa3N(t)} % : ${fa3N(Math.round(R * 100) / 100)} × ${fa3N(k2)} = <b>${fa3N(Math.round(R2 * 100) / 100)} €</b> ${Math.abs(R2 - P) < 1e-9 ? '' : `— on ne retrouve pas ${fa3N(P)} € (coefficient global ${fa3N(k)} × ${fa3N(k2)} = ${fa3N(Math.round(k * k2 * 10000) / 10000)})`}.</span>`;
  renderStaticMath(out);
}

DEMO_REGISTRY['3e|Fonctions linéaires et affines'] = {
  cours: 'cours-demo-fonctions-affines-3e', methode: 'methode-demo-fonctions-affines-3e', exos: 'exos-demo-fonctions-affines-3e', histoire: 'histoire-demo-fonctions-affines-3e',
  init: () => {
    fa3DroiteMaj(); fa3TraceReset(); fa3RetrouverDemo.reset(); fa3PourcMaj();
    ['cours-demo-fonctions-affines-3e', 'methode-demo-fonctions-affines-3e', 'exos-demo-fonctions-affines-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fonctions-affines-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fonctions-affines-3e'));
  }
};

DEMO_QUIZZES['3e|Fonctions linéaires et affines'] = [
  { q: 'La fonction f(x) = 2x − 5 est...', opts: ['affine', 'linéaire', 'constante'], correct: 0 },
  { q: 'La représentation graphique d\'une fonction linéaire est...', opts: ['une droite passant par l\'origine', 'une courbe', 'une droite horizontale'], correct: 0 },
  { q: 'Pour f(x) = −2x + 3, l\'ordonnée à l\'origine est...', opts: ['−2', '3', '0'], correct: 1 },
  { q: 'Pour f(x) = −2x + 3, la droite...', opts: ['monte', 'descend', 'est horizontale'], correct: 1 },
  { q: 'L\'antécédent de 9 par f(x) = 2x − 5 est...', opts: ['7', '13', '2'], correct: 0 },
  { q: 'Augmenter un prix de 15 %, c\'est le multiplier par...', opts: ['0,15', '1,15', '15'], correct: 1 },
  { q: 'Diminuer un nombre de 30 %, c\'est le multiplier par...', opts: ['0,3', '0,7', '1,3'], correct: 1 },
];

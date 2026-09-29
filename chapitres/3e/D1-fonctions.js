/* ============================================================
   CHAPITRE : Généralités sur les fonctions (3e, D1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 90-91) : plan du manuel (notion de fonction -- processus, « machine »,
   notations f : x ↦ f(x) et f(x) = … ; image et antécédent, tableau de valeurs ; représentation
   graphique et lectures graphiques d'une image et des antécédents, vérifiées par le calcul), titres
   reformulés, exemples nouveaux. Une même fonction f(x) = 0,5x² − 2 sert du tableau de valeurs à
   la courbe. Le chapitre de 5e (chapitres/5e/P2-fonctions.js) traite des grandeurs sans la notation
   f(x) : ici, tout le vocabulaire image / antécédent.
   Méthode animée : une machine à fonctions, un lecteur graphique dans les deux sens, du tableau de
   valeurs à la courbe, calculer des antécédents.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const FN3_BLEU = '#0C5BA0', FN3_VERT = '#1E7B34', FN3_ROUGE = '#C0392B', FN3_ORANGE = '#E07B00', FN3_VIOLET = '#7A3E9D', FN3_ENCRE = '#1C1B2E';
const fn3Tex = s => `<span class="tex"${s.length < 34 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const fn3Nb = v => { const r = Math.round(v * 1000) / 1000; return String(r).replace('.', ','); };
const fn3NbT = v => fn3Nb(v).replace(',', '{,}').replace('-', '-');
const fn3F = x => 0.5 * x * x - 2; // la fonction du cours
function fn3Tab(lignes, o){
  o = o || {};
  return `<div style="overflow-x:auto;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.95rem;">${lignes.map((l, i) => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:5px 10px;text-align:center;white-space:nowrap;${j === 0 ? 'background:#F4F5F8;font-weight:700;' : ''}${o.fond ? o.fond(i, j) : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Repère avec quadrillage et courbe de f sur [x0 ; x1] × [y0 ; y1] ; renvoie { svg, X, Y }.
function fn3Repere(f, x0, x1, y0, y1, o){
  o = o || {};
  const W = o.W || 420, H = o.H || 320, m = 24, X = x => m + (x - x0) / (x1 - x0) * (W - 2 * m), Y = y => H - m - (y - y0) / (y1 - y0) * (H - 2 * m), pas = o.pas || 1;
  let h = '';
  for(let x = Math.ceil(x0 / 0.5) * 0.5; x <= x1 + 1e-9; x += 0.5) h += `<line x1="${X(x)}" y1="${Y(y0)}" x2="${X(x)}" y2="${Y(y1)}" stroke="${Number.isInteger(x) ? '#DDE2E8' : '#F1F3F6'}"/>`;
  for(let y = Math.ceil(y0 / 0.5) * 0.5; y <= y1 + 1e-9; y += 0.5) h += `<line x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}" stroke="${Number.isInteger(y) ? '#DDE2E8' : '#F1F3F6'}"/>`;
  h += `<line x1="${X(x0)}" y1="${Y(0)}" x2="${X(x1)}" y2="${Y(0)}" stroke="${FN3_ENCRE}" stroke-width="1.3"/><line x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(y1)}" stroke="${FN3_ENCRE}" stroke-width="1.3"/>`;
  for(let x = Math.ceil(x0); x <= x1; x += pas) if(x) h += `<text x="${X(x)}" y="${Y(0) + 13}" text-anchor="middle" font-size="10" fill="#4E5665">${String(x).replace('-', '−')}</text>`;
  for(let y = Math.ceil(y0); y <= y1; y += pas) if(y) h += `<text x="${X(0) - 4}" y="${Y(y) + 4}" text-anchor="end" font-size="10" fill="#4E5665">${String(y).replace('-', '−')}</text>`;
  h += `<text x="${X(0) - 4}" y="${Y(0) + 13}" text-anchor="end" font-size="10" fill="#4E5665">0</text>`;
  if(f){ let d = '', stylo = false; // on lève le crayon quand la courbe sort du cadre
    for(let x = x0; x <= x1 + 1e-9; x += (x1 - x0) / 200){ const y = f(x); if(y >= y0 - 0.3 && y <= y1 + 0.3){ d += `${stylo ? 'L' : 'M'}${X(x).toFixed(1)},${Y(y).toFixed(1)}`; stylo = true; } else stylo = false; }
    h += `<path d="${d}" fill="none" stroke="${o.couleur || FN3_BLEU}" stroke-width="2.4"/>`; }
  return { svg: h, X, Y, W, H };
}
// Lecture graphique (pointillés) de l'image de a, ou des antécédents de b.
function fn3Lecture(R, x, y, c){
  return `<line x1="${R.X(x)}" y1="${R.Y(0)}" x2="${R.X(x)}" y2="${R.Y(y)}" stroke="${c}" stroke-width="1.8" stroke-dasharray="5 3"/><line x1="${R.X(x)}" y1="${R.Y(y)}" x2="${R.X(0)}" y2="${R.Y(y)}" stroke="${c}" stroke-width="1.8" stroke-dasharray="5 3"/>${ro3Croix([R.X(x), R.Y(y)], c)}`; // croix : pas de petit disque pour un point (convention du cours)
}
// Machine à fonctions (cours) : entrée → boîte f → sortie.
function fn3Machine(entree, sortie, nom){
  return `<svg viewBox="0 0 440 130" style="width:100%;max-width:440px;display:block;margin:8px auto;">
    <rect x="10" y="40" width="110" height="46" rx="6" fill="rgba(224,123,0,.15)" stroke="${FN3_ORANGE}"/><text x="65" y="68" text-anchor="middle" font-size="13">${entree}</text>
    <path d="M122,63 L160,63" stroke="${FN3_ENCRE}" stroke-width="2" marker-end="url(#fn3Fl)"/>
    <rect x="162" y="22" width="116" height="82" rx="10" fill="#E8EDF3" stroke="#6B7280" stroke-width="2"/><text x="220" y="58" text-anchor="middle" font-size="16" font-weight="700">fonction</text><text x="220" y="82" text-anchor="middle" font-size="18" font-style="italic" font-weight="700" fill="${FN3_VIOLET}">${nom || 'f'}</text>
    <path d="M280,63 L318,63" stroke="${FN3_ENCRE}" stroke-width="2" marker-end="url(#fn3Fl)"/>
    <rect x="320" y="40" width="110" height="46" rx="6" fill="rgba(30,123,52,.13)" stroke="${FN3_VERT}"/><text x="375" y="68" text-anchor="middle" font-size="13">${sortie}</text>
    <defs><marker id="fn3Fl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="${FN3_ENCRE}"/></marker></defs></svg>`;
}

const FN3_XS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

document.getElementById('cours-demo-fonctions-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Qu'est-ce qu'une fonction ?</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Un processus qui transforme un nombre</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>fonction</b> est un <b>processus</b> qui, à un nombre, associe un <b>unique</b> nombre.</div>
<p class="example-title">Exemple : on appelle <i>f</i> la fonction qui, à la longueur du côté d'un triangle équilatéral, associe le périmètre de ce triangle.</p>
${fn3Machine('côté du triangle', 'périmètre', 'f')}
<ul class="example-list">
  <li>La fonction <i>f</i> associe au nombre 5 le nombre 15 (un triangle équilatéral de côté 5 cm a un périmètre de 15 cm).</li>
  <li>Plus généralement, elle associe au nombre <i>x</i> le nombre 3<i>x</i>. On note ${fn3Tex('f : x \\longmapsto 3x')} ou encore ${fn3Tex('f(x) = 3x')}.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : la notation ${fn3Tex('f : x \\longmapsto f(x)')} se lit « <i>f</i> est la fonction qui, à <i>x</i>, associe le nombre <i>f</i>(<i>x</i>) ». Attention : <i>f</i> est le nom de la fonction, <i>f</i>(<i>x</i>) est un nombre.</div>

<div class="sub-header"><span class="letter">B</span><h4>Image et antécédent</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Soit <i>f</i> une fonction qui, au nombre <i>a</i>, associe le nombre <i>b</i>. On peut l'écrire ${fn3Tex('f(a) = b')}, et on dit que :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;"><li><i>b</i> est <b>l'image</b> de <i>a</i> par <i>f</i> ;</li><li><i>a</i> est <b>un antécédent</b> de <i>b</i> par <i>f</i>.</li></ul></div>
<div class="redaction-note" ${R4_REM}>Remarque : l'<b>image</b> d'un nombre est <b>unique</b> (« <b>l'</b>image »). En revanche, un nombre peut avoir <b>plusieurs antécédents</b> (« <b>un</b> antécédent »), ou aucun.</div>
<p class="example-title">Exemple 1 : soit <i>g</i> une fonction telle que ${fn3Tex('g(4) = -1')}.</p>
<ul class="example-list"><li>−1 est <b>l'image</b> de 4 par la fonction <i>g</i> ; 4 est <b>un antécédent</b> de −1 par la fonction <i>g</i>.</li></ul>
<p class="example-title">Exemple 2 : soit la fonction ${fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2')}.</p>
<ul class="example-list"><li>À tout nombre <i>x</i>, la fonction <i>f</i> associe un unique nombre, calculé avec la formule ${fn3Tex('0{,}5x^2 - 2')}. On dit que l'image de <i>x</i> par <i>f</i> est ${fn3Tex('0{,}5x^2 - 2')} et on note ${fn3Tex('f(x) = 0{,}5x^2 - 2')}.</li></ul>
${r4Ex('', [
  [fn3Tex('f(-4) = 0{,}5 \\times (-4)^2 - 2 = 0{,}5 \\times 16 - 2 = 8 - 2 = 6'), 'On remplace x par −4, puis on calcule.'],
  [fn3Tex('f(4) = 0{,}5 \\times 4^2 - 2 = 0{,}5 \\times 16 - 2 = 6'), 'On remplace x par 4.'],
  ['L\'image de −4 par <i>f</i> est 6, et celle de 4 est 6 également.', ''],
])}
<ul class="example-list"><li>−4 et 4 ont <b>la même image</b>, 6 : le nombre 6 a au moins <b>deux antécédents</b> par <i>f</i>.</li></ul>
<span class="def-badge">Définition</span>
<div class="def-box">Les images de certaines valeurs de <i>x</i> par une fonction <i>f</i> peuvent être présentées dans un <b>tableau de valeurs</b>.</div>
<p class="example-title">Exemple 3 : un tableau de valeurs de la fonction ${fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2')}.</p>
${fn3Tab([['<i>x</i>', ...FN3_XS.map(x => String(x).replace('-', '−'))], ['<i>f</i>(<i>x</i>)', ...FN3_XS.map(x => fn3Nb(fn3F(x)).replace('-', '−'))]], { fond: (i, j) => j === 5 ? 'background:rgba(224,123,0,.2);' : (j === 3 || j === 7) ? 'background:rgba(192,57,43,.13);' : '' })}
<ul class="example-list">
  <li>La 2e ligne du tableau donne les images des nombres de la 1re ligne par la fonction <i>f</i>.</li>
  <li>Pour déterminer <b>l'image de 0</b>, on cherche 0 sur la 1re ligne et on lit son image sur la 2e ligne : <span style="color:${FN3_ORANGE};font-weight:700;">l'image de 0 par <i>f</i> est −2</span>. On écrit ${fn3Tex('f(0) = -2')}.</li>
  <li>Pour déterminer <b>les antécédents de 0</b>, on cherche 0 sur la 2e ligne et on lit les nombres correspondants sur la 1re ligne : <span style="color:${FN3_ROUGE};font-weight:700;">les antécédents de 0 par <i>f</i> sont −2 et 2</span>. On écrit ${fn3Tex('f(-2) = f(2) = 0')}.</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>La représentation graphique d'une fonction</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>représentation graphique</b> d'une fonction <i>f</i> est la courbe constituée de l'ensemble des points de coordonnées ${fn3Tex('(x\\,;\\,f(x))')}.</div>
<p class="example-title">Exemple : les graphiques ci-dessous représentent la fonction ${fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2')}. Comme ${fn3Tex('f(2) = 0')}, le point de coordonnées (2 ; 0) est un point de la courbe.</p>
<div style="display:flex;flex-wrap:wrap;gap:10px 24px;justify-content:center;">
  <div style="flex:1 1 280px;max-width:380px;">${(R => `<svg viewBox="0 0 ${R.W} ${R.H}" style="width:100%;">${R.svg}${fn3Lecture(R, 1.5, fn3F(1.5), FN3_ORANGE)}</svg>`)(fn3Repere(fn3F, -4, 4, -3, 6, { W: 360, H: 300 }))}
    <p style="margin:4px 0;">Pour déterminer graphiquement <b>l'image de 1,5</b> par <i>f</i>, on cherche l'<b>ordonnée</b> du point de la courbe qui a pour abscisse 1,5. Elle semble égale à <b>−0,9</b> environ. On le vérifie par le calcul : ${fn3Tex('f(1{,}5) = 0{,}5 \\times 2{,}25 - 2 = -0{,}875')}.</p></div>
  <div style="flex:1 1 280px;max-width:380px;">${(R => `<svg viewBox="0 0 ${R.W} ${R.H}" style="width:100%;">${R.svg}<line x1="${R.X(-4)}" y1="${R.Y(-1.5)}" x2="${R.X(4)}" y2="${R.Y(-1.5)}" stroke="${FN3_VERT}" stroke-width="1.6"/>${fn3Lecture(R, -1, -1.5, FN3_VERT)}${fn3Lecture(R, 1, -1.5, FN3_VERT)}</svg>`)(fn3Repere(fn3F, -4, 4, -3, 6, { W: 360, H: 300 }))}
    <p style="margin:4px 0;">Pour déterminer graphiquement <b>les antécédents de −1,5</b>, on cherche les <b>abscisses</b> des points de la courbe qui ont pour ordonnée −1,5. Deux points conviennent : les antécédents semblent être <b>−1 et 1</b>. Vérification : ${fn3Tex('f(-1) = 0{,}5 - 2 = -1{,}5')} et ${fn3Tex('f(1) = -1{,}5')}.</p></div>
</div>
<div class="redaction-note" ${R4_REM}>Une lecture graphique donne en général une valeur <b>approchée</b> : on la confirme, quand c'est possible, par un calcul.</div>
`;

document.getElementById('histoire-demo-fonctions-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « <b>fonction</b> » apparaît en 1692 sous la plume du philosophe et mathématicien allemand <b>Gottfried Wilhelm Leibniz</b>, pour désigner des grandeurs liées à une courbe. C'est le Suisse <b>Leonhard Euler</b>, le mathématicien le plus prolifique de l'histoire, qui introduit en 1734 la notation <b><i>f</i>(<i>x</i>)</b> que nous utilisons encore aujourd'hui. Mais l'idée de relier deux grandeurs est bien plus ancienne : au 14e siècle, l'évêque français <b>Nicole Oresme</b> représentait déjà la vitesse d'un objet en fonction du temps par des segments dessinés côte à côte… un ancêtre de nos représentations graphiques ! Au 17e siècle, <b>René Descartes</b> invente le repère qui porte son nom (repère cartésien), où chaque point est repéré par deux nombres.
</div>
`;

document.getElementById('methode-demo-fonctions-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : la machine à fonctions</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez une fonction, écrivez un nombre et lancez la machine : elle calcule son image.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:8px 0;">
    <select id="fn3-mFonc" onchange="fn3MachineMaj()" style="font-size:1rem;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;">
      <option value="0">f(x) = 0,5x² − 2</option><option value="1">g(x) = 3x − 7</option><option value="2">h(x) = (x + 1)²</option><option value="3">k(x) = 10 − x²</option>
    </select>
    <input id="fn3-mX" type="text" inputmode="decimal" value="-3" style="font-family:'JetBrains Mono',monospace;font-size:1.05rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:90px;text-align:center;" onkeydown="if(event.key==='Enter') fn3MachineLancer()">
    <button class="btn" onclick="fn3MachineLancer()"><span class="gicon">play_arrow</span> Lancer</button>
  </div>
  <svg id="fn3-mSvg" viewBox="0 0 440 130" style="width:100%;max-width:440px;display:block;margin:8px auto;"></svg>
  <div id="fn3-mInfo" style="text-align:center;min-height:3.2em;line-height:1.9;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : lire une image ou des antécédents sur la courbe</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Courbe de ${fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2')}. Choisissez le sens de la lecture, puis déplacez le curseur.</p>
  <div class="figure-toolbar" style="margin-bottom:4px;"><button class="btn" id="fn3-lModeI" onclick="fn3LectMode('image')">Lire une image</button><button class="btn secondary" id="fn3-lModeA" onclick="fn3LectMode('ante')">Lire des antécédents</button></div>
  <svg id="fn3-lSvg" viewBox="0 0 420 320" style="width:100%;max-width:430px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:430px;margin:0 auto;">
    <label id="fn3-lLab" for="fn3-lVal" style="font-weight:700;"><i>x</i></label><input id="fn3-lVal" type="range" min="-4" max="4" step="0.5" value="1.5" oninput="fn3LectMaj()"><span id="fn3-lValV" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
  </div>
  <div id="fn3-lInfo" style="text-align:center;margin:10px 0 4px;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : du tableau de valeurs à la courbe</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Tracer la représentation graphique de ${fn3Tex('k : x \\longmapsto 10 - x^2')} pour <i>x</i> entre −3 et 3. Cliquez sur « Étape suivante ».</p>
  <div id="fn3-tTab"></div>
  <svg id="fn3-tSvg" viewBox="0 0 420 320" style="width:100%;max-width:430px;display:block;margin:8px auto;"></svg>
  <div id="fn3-tNote" class="step-note" style="text-align:center;min-height:2.4em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fn3TraceSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="fn3TraceReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer les antécédents d'un nombre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Déterminer par le calcul les antécédents de 6 par ${fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2')}. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="fn3-anteDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="fn3AnteDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="fn3AnteDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function fn3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="fn3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="fn3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
const FN3_U = x => 4 - x * x; // exercice de lecture graphique
document.getElementById('exos-demo-fonctions-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une image avec une formule »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${fn3Tex('f(x) = 0{,}5x^2 - 2')}</span><span class="we-comment">La formule de la fonction.</span></div>
    <div class="we-row"><span class="we-expr">${fn3Tex('f(-3) = 0{,}5 \\times (-3)^2 - 2')}</span><span class="we-comment">1. On remplace x par le nombre, entre parenthèses s'il est négatif.</span></div>
    <div class="we-row"><span class="we-expr">${fn3Tex('f(-3) = 0{,}5 \\times 9 - 2 = 2{,}5')}</span><span class="we-comment">2. On calcule en respectant les priorités.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">L'image de −3 par f est 2,5.</span><span class="we-comment">3. On conclut avec le vocabulaire.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${fn3Exo(1, 'Soit la fonction ' + fn3Tex('f : x \\longmapsto 2x - 3') + '. Calcule l\'image de 4, puis celle de −1. Détermine l\'antécédent de 7.', [
    fn3Tex('f(4) = 2 \\times 4 - 3 = 5') + ' ; ' + fn3Tex('f(-1) = 2 \\times (-1) - 3 = -5') + '.', 'On cherche x tel que ' + fn3Tex('2x - 3 = 7') + ' : ' + fn3Tex('2x = 10') + ', donc x = 5. L\'antécédent de 7 est 5.'])}
  ${fn3Exo(2, 'Soit la fonction ' + fn3Tex('g(x) = x^2 + 1') + '. Calcule g(3) et g(−3). Quels sont les antécédents de 10 ? Le nombre 0 a-t-il des antécédents ?', [
    fn3Tex('g(3) = 9 + 1 = 10') + ' et ' + fn3Tex('g(-3) = 9 + 1 = 10') + '.', '10 a (au moins) deux antécédents : 3 et −3. (En fait exactement ceux-là : ' + fn3Tex('x^2 = 9') + '.)',
    fn3Tex('x^2 + 1 = 0') + ' donne ' + fn3Tex('x^2 = -1') + ' : impossible. 0 n\'a pas d\'antécédent par g.'])}
  ${fn3Exo(3, 'Voici un tableau de valeurs d\'une fonction p. Quelle est l\'image de 2 ? Quels sont les antécédents de 1 ? Écris deux égalités avec la notation p(…).' + fn3Tab([['<i>x</i>', '−2', '−1', '0', '1', '2', '3'], ['<i>p</i>(<i>x</i>)', '5', '1', '−1', '−1', '1', '5']]), [
    'L\'image de 2 est 1 : p(2) = 1.', 'Les antécédents de 1 (dans le tableau) sont −1 et 2 : p(−1) = p(2) = 1.'])}
  ${fn3Exo(4, 'On sait que h(5) = 12. Complète les phrases : 12 est … de 5 par h ; 5 est … de 12 par h. Le point de coordonnées (… ; …) est sur la courbe de h.', [
    '12 est l\'image de 5 par h ; 5 est un antécédent de 12 par h.', 'Le point (5 ; 12) est sur la représentation graphique de h.'])}
  ${fn3Exo(5, 'Voici la courbe d\'une fonction u. Lis graphiquement : a) l\'image de 1 ; b) les antécédents de 0 ; c) les antécédents de 4. Vérifie avec ' + fn3Tex('u(x) = 4 - x^2') + '.', [
    'a) L\'image de 1 est 3 (u(1) = 4 − 1 = 3).', 'b) Les antécédents de 0 sont −2 et 2 (u(2) = u(−2) = 0).', 'c) 4 a un seul antécédent : 0 (le sommet de la courbe).'],
    (R => `<svg viewBox="0 0 ${R.W} ${R.H}" style="width:100%;max-width:320px;display:block;margin:8px auto;">${R.svg}</svg>`)(fn3Repere(FN3_U, -3, 3, -3, 5, { W: 320, H: 280, couleur: FN3_VIOLET })))}
  ${fn3Exo(6, 'Le point A(3 ; 2,5) est-il sur la courbe de ' + fn3Tex('f : x \\longmapsto 0{,}5x^2 - 2') + ' ? Et le point B(−2 ; 1) ?', [
    fn3Tex('f(3) = 0{,}5 \\times 9 - 2 = 2{,}5') + ' : A est sur la courbe.', fn3Tex('f(-2) = 0{,}5 \\times 4 - 2 = 0 \\neq 1') + ' : B n\'est pas sur la courbe.'])}
  ${fn3Exo(7, 'Programme de calcul : « Choisir un nombre. Le mettre au carré. Soustraire 4. » On note f la fonction qui, au nombre choisi, associe le résultat. Écris f(x), puis calcule l\'image de −3.', [
    fn3Tex('f(x) = x^2 - 4') + '.', fn3Tex('f(-3) = (-3)^2 - 4 = 9 - 4 = 5') + '.'])}
  ${fn3Exo(8, 'Un taxi facture 4 € de prise en charge, puis 1,50 € par kilomètre. On note T(x) le prix, en euros, d\'une course de x km. Exprime T(x), calcule T(10), puis trouve l\'antécédent de 25 et interprète-le.', [
    fn3Tex('T(x) = 1{,}5x + 4') + ' ; ' + fn3Tex('T(10) = 15 + 4 = 19') + ' : une course de 10 km coûte 19 €.', fn3Tex('1{,}5x + 4 = 25') + ' donne ' + fn3Tex('1{,}5x = 21') + ', soit x = 14 : avec 25 €, on parcourt 14 km.'])}
  ${fn3Exo(9, 'Vrai ou faux ? Justifie. a) Un nombre peut avoir deux images par une fonction. b) Un nombre peut avoir plusieurs antécédents. c) Si f(2) = 5, alors le point (5 ; 2) est sur la courbe de f.', [
    'a) Faux : une fonction associe à chaque nombre une <b>unique</b> image.', 'b) Vrai : par exemple, 6 a deux antécédents, −4 et 4, par f(x) = 0,5x² − 2.',
    'c) Faux : c\'est le point (2 ; 5) — abscisse x, ordonnée f(x).'])}
</div>
`;

/* ---- Méthode 1 : machine ---- */
const FN3_FONCS = [
  { n: 'f', f: x => 0.5 * x * x - 2, t: x => `0{,}5 \\times ${x < 0 ? '(' + fn3NbT(x) + ')' : fn3NbT(x)}^2 - 2` },
  { n: 'g', f: x => 3 * x - 7, t: x => `3 \\times ${x < 0 ? '(' + fn3NbT(x) + ')' : fn3NbT(x)} - 7` },
  { n: 'h', f: x => (x + 1) * (x + 1), t: x => `(${fn3NbT(x)} + 1)^2` },
  { n: 'k', f: x => 10 - x * x, t: x => `10 - ${x < 0 ? '(' + fn3NbT(x) + ')' : fn3NbT(x)}^2` },
];
let fn3MRaf = null;
function fn3MachineDessin(t, x, y, nom){
  const svg = document.getElementById('fn3-mSvg'); if(!svg) return;
  let bx = t < 0.4 ? 20 + (t / 0.4) * 180 : t < 0.6 ? 200 : 200 + (t - 0.6) / 0.4 * 180, lab = t < 0.5 ? fn3Nb(x).replace('-', '−') : fn3Nb(y).replace('-', '−'), c = t < 0.5 ? FN3_ORANGE : FN3_VERT;
  svg.innerHTML = `<rect x="0" y="92" width="440" height="10" rx="5" fill="#9AA3AF"/>`
    + `<rect x="162" y="18" width="116" height="78" rx="10" fill="#E8EDF3" stroke="#6B7280" stroke-width="2"/><text x="220" y="52" text-anchor="middle" font-size="15" font-weight="700">fonction</text><text x="220" y="78" text-anchor="middle" font-size="18" font-style="italic" font-weight="700" fill="${FN3_VIOLET}">${nom}</text>`
    + (t >= 0.4 && t < 0.6 ? '' : `<g><rect x="${bx}" y="62" width="${Math.max(40, lab.length * 10 + 16)}" height="30" rx="8" fill="${c}"/><text x="${bx + Math.max(40, lab.length * 10 + 16) / 2}" y="82" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">${lab}</text></g>`);
}
function fn3MachineMaj(){ cancelAnimationFrame(fn3MRaf); const F = FN3_FONCS[Number(document.getElementById('fn3-mFonc').value)]; fn3MachineDessin(0, fn3MLire() || 0, 0, F.n); document.getElementById('fn3-mInfo').innerHTML = ''; }
function fn3MLire(){ const v = parseFloat(String(document.getElementById('fn3-mX').value).replace(',', '.').replace('−', '-')); return isNaN(v) ? null : Math.max(-1000, Math.min(1000, v)); }
function fn3MachineLancer(){
  cancelAnimationFrame(fn3MRaf);
  const F = FN3_FONCS[Number(document.getElementById('fn3-mFonc').value)], x = fn3MLire(), info = document.getElementById('fn3-mInfo');
  if(x === null){ info.innerHTML = '<span class="hint" style="margin:0;color:#a83c1f;">Écrivez un nombre.</span>'; return; }
  const y = F.f(x), t0 = performance.now();
  const f = now => { const t = Math.min(1, (now - t0) / 1800); fn3MachineDessin(t, x, y, F.n); if(t < 1) fn3MRaf = requestAnimationFrame(f);
    else { info.innerHTML = fn3Tex(`${F.n}(${fn3NbT(x)}) = ${F.t(x)} = ${fn3NbT(y)}`) + `<br>L'image de ${fn3Nb(x).replace('-', '−')} par ${F.n} est ${fn3Nb(y).replace('-', '−')} ; ${fn3Nb(x).replace('-', '−')} est un antécédent de ${fn3Nb(y).replace('-', '−')}.`; renderStaticMath(info); } };
  fn3MRaf = requestAnimationFrame(f);
}

/* ---- Méthode 2 : lecteur graphique ---- */
let fn3LMode = 'image';
function fn3LectMode(m){
  fn3LMode = m; const s = document.getElementById('fn3-lVal');
  document.getElementById('fn3-lModeI').className = 'btn' + (m === 'image' ? '' : ' secondary'); document.getElementById('fn3-lModeA').className = 'btn' + (m === 'ante' ? '' : ' secondary');
  document.getElementById('fn3-lLab').innerHTML = m === 'image' ? '<i>x</i>' : '<i>y</i>';
  if(m === 'image'){ s.min = -4; s.max = 4; s.step = 0.5; s.value = 1.5; } else { s.min = -3; s.max = 6; s.step = 0.5; s.value = -1.5; }
  fn3LectMaj();
}
function fn3LectMaj(){
  const v = Number(document.getElementById('fn3-lVal').value), R = fn3Repere(fn3F, -4, 4, -3, 6);
  document.getElementById('fn3-lValV').textContent = fn3Nb(v).replace('-', '−');
  let h = R.svg, txt;
  if(fn3LMode === 'image'){ const y = fn3F(v); h += fn3Lecture(R, v, y, FN3_ORANGE);
    txt = `On part de l'abscisse ${fn3Nb(v).replace('-', '−')} sur l'axe horizontal, on monte (ou descend) jusqu'à la courbe, puis on lit l'ordonnée.<br><b style="color:${FN3_ORANGE};">L'image de ${fn3Nb(v).replace('-', '−')} est ${fn3Nb(y).replace('-', '−')}</b> : ${fn3Tex(`f(${fn3NbT(v)}) = ${fn3NbT(y)}`)}`; }
  else { h += `<line x1="${R.X(-4)}" y1="${R.Y(v)}" x2="${R.X(4)}" y2="${R.Y(v)}" stroke="${FN3_VERT}" stroke-width="1.6"/>`;
    if(v < -2) txt = `<b style="color:${FN3_ROUGE};">Aucun point de la courbe n'a pour ordonnée ${fn3Nb(v).replace('-', '−')}</b> : ce nombre n'a pas d'antécédent (la courbe ne descend pas en dessous de −2).`;
    else if(v === -2){ h += fn3Lecture(R, 0, -2, FN3_VERT); txt = `<b style="color:${FN3_VERT};">Un seul point</b> : −2 a un seul antécédent, 0.`; }
    else { const r = Math.sqrt(2 * (v + 2)); h += fn3Lecture(R, -r, v, FN3_VERT) + fn3Lecture(R, r, v, FN3_VERT);
      const ex = Math.abs(r * 100 - Math.round(r * 100)) < 1e-9;
      const r2 = Math.round(r * 100) / 100; txt = `On part de l'ordonnée ${fn3Nb(v).replace('-', '−')}, on va horizontalement jusqu'à la courbe, puis on lit les abscisses.<br><b style="color:${FN3_VERT};">Deux antécédents : ${ex ? '' : 'environ '}${fn3Nb(-r2).replace('-', '−')} et ${fn3Nb(r2)}</b>${ex ? '' : ' (valeurs arrondies)'}.`; } }
  document.getElementById('fn3-lSvg').innerHTML = h;
  const info = document.getElementById('fn3-lInfo'); info.innerHTML = txt; renderStaticMath(info);
}

/* ---- Méthode 3 : du tableau à la courbe ---- */
const FN3_K = x => 10 - x * x, FN3_KX = [-3, -2, -1, 0, 1, 2, 3];
const FN3_T_NOTES = [
  'On calcule les images de quelques valeurs de x : c\'est le tableau de valeurs. Par exemple k(−3) = 10 − 9 = 1.',
  'Chaque colonne du tableau donne un point de coordonnées (x ; k(x)). On les place dans le repère.',
  'On relie les points par une courbe régulière, sans règle (ce n\'est pas une droite !).',
  'On peut contrôler : le point (1,5 ; 7,75) doit être sur la courbe, car k(1,5) = 10 − 2,25 = 7,75.',
];
let fn3TK = 0;
function fn3TraceDessin(k){
  document.getElementById('fn3-tTab').innerHTML = fn3Tab([['<i>x</i>', ...FN3_KX.map(x => String(x).replace('-', '−'))], ['<i>k</i>(<i>x</i>)', ...FN3_KX.map(x => String(FN3_K(x)))]]);
  const R = fn3Repere(k >= 2 ? FN3_K : null, -3.5, 3.5, -1, 11, { couleur: FN3_VIOLET });
  let h = R.svg;
  if(k >= 1) FN3_KX.forEach(x => { h += ro3Croix([R.X(x), R.Y(FN3_K(x))], FN3_ROUGE); });
  if(k >= 3) h += fn3Lecture(R, 1.5, 7.75, FN3_VERT);
  document.getElementById('fn3-tSvg').innerHTML = h;
  document.getElementById('fn3-tNote').textContent = FN3_T_NOTES[k];
}
function fn3TraceSuivant(){ if(fn3TK < FN3_T_NOTES.length - 1) fn3TK++; fn3TraceDessin(fn3TK); }
function fn3TraceReset(){ fn3TK = 0; fn3TraceDessin(0); }

/* ---- Méthode 4 : antécédents par le calcul ---- */
const FN3_ANTE_STEPS = [
  { expr: 'On cherche les nombres x tels que ' + fn3Tex('f(x) = 6') + '.', note: 'Chercher un antécédent, c\'est résoudre une équation.' },
  { expr: fn3Tex('0{,}5x^2 - 2 = 6'), note: 'On remplace f(x) par sa formule.' },
  { expr: fn3Tex('0{,}5x^2 = 8') + ', donc ' + fn3Tex('x^2 = 16'), note: 'On ajoute 2 aux deux membres, puis on divise par 0,5.' },
  { expr: fn3Tex('x = 4') + ' ou ' + fn3Tex('x = -4'), note: 'L\'équation x² = 16 a deux solutions (chapitre Équations).' },
  { expr: 'Les antécédents de 6 par f sont −4 et 4.', note: 'On le lit aussi sur la courbe (Méthode 2, mode antécédents, y = 6).' },
];
const fn3AnteDemo = makeStepDemo(FN3_ANTE_STEPS, 'fn3-anteDisplay');

DEMO_REGISTRY['3e|Généralités sur les fonctions'] = {
  cours: 'cours-demo-fonctions-3e', methode: 'methode-demo-fonctions-3e', exos: 'exos-demo-fonctions-3e', histoire: 'histoire-demo-fonctions-3e',
  init: () => {
    fn3MachineMaj(); fn3LectMode('image'); fn3TraceReset(); fn3AnteDemo.reset();
    ['cours-demo-fonctions-3e', 'methode-demo-fonctions-3e', 'exos-demo-fonctions-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fonctions-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fonctions-3e'));
  }
};

DEMO_QUIZZES['3e|Généralités sur les fonctions'] = [
  { q: 'Si f(3) = 7, alors...', opts: ['7 est l\'image de 3 par f', '3 est l\'image de 7 par f', '7 est un antécédent de 3'], correct: 0 },
  { q: 'Par une fonction, un nombre a...', opts: ['une seule image', 'plusieurs images possibles', 'toujours deux images'], correct: 0 },
  { q: 'Avec f(x) = 0,5x² − 2, f(2) =', opts: ['0', '−1', '2'], correct: 0 },
  { q: 'Avec f(x) = 0,5x² − 2, les antécédents de 6 sont...', opts: ['−4 et 4', '16', '4 seulement'], correct: 0 },
  { q: 'La représentation graphique de f est l\'ensemble des points de coordonnées...', opts: ['(f(x) ; x)', '(x ; f(x))', '(x ; x)'], correct: 1 },
  { q: 'Pour lire l\'image de 2 sur une courbe, on part...', opts: ['de 2 sur l\'axe des abscisses', 'de 2 sur l\'axe des ordonnées', 'de l\'origine'], correct: 0 },
  { q: 'Si g(x) = 3x − 7, l\'antécédent de 5 est...', opts: ['4', '8', '−2'], correct: 0 },
];

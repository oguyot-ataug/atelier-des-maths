/* ============================================================
   CHAPITRE : Proportionnalité (4e, D1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 125-126 : quatrième proportionnelle, pourcentage, vitesse moyenne,
   grandeurs composées : débit et masse volumique). Plan du manuel, titres reformulés, exemples
   nouveaux. Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const PO4_BLEU = '#0C5BA0', PO4_ORANGE = '#E07B00', PO4_VERT = '#1E7B34', PO4_ENCRE = '#1C1B2E';
const po4Tex = s => `<span class="tex"${s.length < 32 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
// Nombre arrondi à d décimales, à la française (espace des milliers dans la partie entière seulement).
const po4N = (v, d) => { const p = Math.pow(10, d == null ? 2 : d); const [e, f] = String(Math.round(v * p) / p).split('.'); return e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + (f ? ',' + f : ''); };
const po4T = (v, d) => po4N(v, d).replace(',', '{,}').replace(/ /g, '\\,');
// Durée en heures décimales → « 2 h 24 min » (arrondi à la minute).
function po4Hmin(h){ let mn = Math.round(h * 60); const H = Math.floor(mn / 60); mn -= H * 60; return (H ? H + ' h' : '') + (H && mn ? ' ' : '') + (mn || !H ? String(mn).padStart(H ? 2 : 1, '0') + ' min' : ''); }
// Durée en minutes décimales → « 1 h 15 min » (au-delà d'une heure) ou « 1 min 40 s ».
function po4MinS(mn){ if(mn >= 60) return po4Hmin(mn / 60); let sec = Math.round(mn * 60); const m = Math.floor(sec / 60); sec -= m * 60; return (m ? m + ' min' : '') + (m && sec ? ' ' : '') + (sec || !m ? String(sec).padStart(m ? 2 : 1, '0') + ' s' : ''); }
// Tableau de proportionnalité (2 lignes) ; « ? » en orange.
function po4Tab(l1, l2, t1, t2){
  const td = (c, h) => `<td style="border:1px solid #C9D6E6;padding:6px 12px;text-align:center;white-space:nowrap;${h ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}${c === '?' ? `color:${PO4_ORANGE};font-weight:700;` : ''}">${c === '?' ? '<i>x</i> ?' : c}</td>`;
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 12px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.95rem;"><tr>${td(t1, 1)}${l1.map(c => td(c)).join('')}</tr><tr>${td(t2, 1)}${l2.map(c => td(c)).join('')}</tr></table></div>`;
}

document.getElementById('cours-demo-proportionnalite-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>La quatrième proportionnelle</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Dans un tableau de proportionnalité dont on connaît trois valeurs <i>a</i>, <i>b</i> et <i>c</i>, on peut calculer la valeur manquante <i>x</i>, appelée <b>quatrième proportionnelle</b>, grâce à l'égalité des <b>produits en croix</b> :
  ${po4Tab(['<i>a</i>', '<i>c</i>'], ['<i>b</i>', '?'], 'Grandeur 1', 'Grandeur 2')}
  <div style="text-align:center;">${po4Tex('a \\times x = b \\times c')} &nbsp; donc &nbsp; ${po4Tex('x = \\dfrac{b \\times c}{a}')}</div></div>
${r4Ex('Exemple 1 : 4 kg de pommes coûtent 9,80 €. Le prix payé est proportionnel à la masse achetée. Combien coûtent 7 kg ?', [
  [po4Tab(['4', '7'], ['9,80', '?'], 'Masse (kg)', 'Prix (€)'), 'On regroupe les données dans un tableau de proportionnalité.'],
  [po4Tex('x = \\dfrac{7 \\times 9{,}80}{4} = 17{,}15'), 'On calcule la quatrième proportionnelle.'],
  ['7 kg de pommes coûtent 17,15 €.', 'On conclut par une phrase.'],
])}
${r4Ex('Exemple 2 : un fichier de 360 Mo est téléchargé en 48 secondes. Combien de temps faut-il, dans les mêmes conditions, pour un fichier de 1 500 Mo ?', [
  ['On suppose le débit de la connexion constant : la durée est proportionnelle à la taille du fichier.', ''],
  [po4Tab(['360', '1 500'], ['48', '?'], 'Taille (Mo)', 'Durée (s)'), ''],
  [po4Tex('x = \\dfrac{1\\,500 \\times 48}{360} = 200'), '200 s = 3 × 60 s + 20 s.'],
  ['Il faut 200 s, soit 3 min 20 s.', ''],
])}
<div class="redaction-note" ${R4_REM}>Remarque : dans l'exemple 1, on peut aussi passer par l'unité : 9,80 ÷ 4 = 2,45 € le kilogramme, puis 2,45 × 7 = 17,15 €. Dans l'exemple 2, le « passage à l'unité » donne 48 ÷ 360 = 0,133 3… s par Mo, un nombre peu pratique : le calcul direct de la quatrième proportionnelle est alors bien plus efficace.</div>

<div class="lesson-header"><span class="num">2</span><h3>Utiliser la proportionnalité</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Calculer un pourcentage</h4></div>
${r4Ex('Exemple : un club sportif compte 240 adhérents, dont 84 sont mineurs. Quel est le pourcentage de mineurs dans ce club ?', [
  ['On cherche le nombre de mineurs pour 100 adhérents, avec la même proportion.', ''],
  [po4Tab(['84', '?'], ['240', '100'], 'Mineurs', 'Adhérents'), 'Un pourcentage est une proportion « sur 100 ».'],
  [po4Tex('x = \\dfrac{84 \\times 100}{240} = 35'), ''],
  ['35 % des adhérents sont mineurs.', ''],
])}

<div class="sub-header"><span class="letter">B</span><h4>La vitesse moyenne</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Si un mobile parcourt une distance <i>d</i> pendant une durée <i>t</i>, sa <b>vitesse moyenne</b> <i>v</i> est le quotient de <i>d</i> par <i>t</i> :
  <div style="text-align:center;margin:6px 0 2px;">${po4Tex('v = \\dfrac{d}{t}')} &nbsp; et donc &nbsp; ${po4Tex('d = v \\times t')} &nbsp; ; &nbsp; ${po4Tex('t = \\dfrac{d}{v}')}</div></div>
${r4Ex('Exemple 1 : un cycliste parcourt 45 km en 1 h 48 min. Quelle est sa vitesse moyenne ?', [
  ['t = 1 h 48 min = 1 h + ' + po4Tex('\\dfrac{48}{60}') + ' h = 1,8 h', 'On convertit la durée en heures décimales.'],
  [po4Tex('v = \\dfrac{45 \\text{ km}}{1{,}8 \\text{ h}} = 25 \\text{ km/h}'), ''],
])}
${r4Ex('Exemple 2 : à 90 km/h, combien de temps faut-il pour parcourir 60 km ?', [
  [po4Tex('t = \\dfrac{60}{90} \\text{ h} = \\dfrac{2}{3} \\text{ h}'), ''],
  [po4Tex('\\dfrac{2}{3} \\times 60 \\text{ min} = 40 \\text{ min}'), 'On convertit en minutes.'],
])}
<div class="redaction-note" ${R4_REM}>Attention aux unités : 1 h 48 min n'est <b>pas</b> 1,48 h (48 minutes, c'est 0,8 h). Et la vitesse s'exprime dans les unités de <i>d</i> et de <i>t</i> : en km/h, en m/s… Pour passer des m/s aux km/h, on multiplie par 3,6 (1 m/s = 3 600 m/h = 3,6 km/h).</div>

<div class="sub-header"><span class="letter">C</span><h4>Les grandeurs composées</h4></div>
<p style="margin:4px 0 8px;">Une vitesse est une <b>grandeur quotient</b> : elle s'obtient en divisant une grandeur par une autre (km/h). En voici deux autres.</p>
${r4Ex('Exemple 1 : le débit. Un robinet qui fuit perd 432 L d\'eau par jour. Quel est son débit, en L/min ?', [
  ['Le débit est la quantité d\'eau écoulée par unité de temps. Une journée compte 24 × 60 = 1 440 min.', ''],
  [po4Tab(['432', '?'], ['1 440', '1'], 'Volume (L)', 'Durée (min)'), ''],
  [po4Tex('x = \\dfrac{432 \\times 1}{1\\,440} = 0{,}3') + ' : le débit de la fuite est de 0,3 L/min.', ''],
])}
${r4Ex('Exemple 2 : la masse volumique. L\'aluminium a une masse volumique de 2,7 kg/dm³ : 1 dm³ d\'aluminium pèse 2,7 kg. Combien pèse une plaque d\'aluminium de 3,2 dm³ ?', [
  [po4Tab(['1', '3,2'], ['2,7', '?'], 'Volume (dm³)', 'Masse (kg)'), ''],
  [po4Tex('x = \\dfrac{3{,}2 \\times 2{,}7}{1} = 8{,}64') + ' : la plaque pèse 8,64 kg.', ''],
])}
<div class="redaction-note" ${R4_REM}>Remarque : l'eau a une masse volumique de 1 kg/dm³ (1 litre d'eau pèse 1 kg). Un matériau de masse volumique inférieure à 1 kg/dm³, comme le bois de chêne (environ 0,7 kg/dm³), flotte sur l'eau.</div>
`;

document.getElementById('histoire-demo-proportionnalite-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  La « <b>règle de trois</b> », qui permet de calculer une quatrième proportionnelle à partir de trois nombres, est très ancienne : les mathématiciens indiens, comme <b>Brahmagupta</b> au 7e siècle, l'appellent <i>trairāśika</i> (« les trois quantités ») et l'utilisent pour le commerce. Elle passe par les savants arabes et arrive en Europe grâce au <i>Liber abaci</i> de <b>Fibonacci</b> (1202), où les marchands italiens apprennent à convertir des monnaies et des poids. La masse volumique a sa propre légende : selon l'architecte romain Vitruve, <b>Archimède</b> aurait compris, en entrant dans son bain, comment mesurer le volume d'une couronne pour vérifier qu'elle était en or pur… et serait sorti dans la rue en criant « Eurêka ! » (« J'ai trouvé ! »). Enfin, en 1795, les révolutionnaires français définissent le <b>kilogramme</b> comme la masse d'un décimètre cube d'eau : c'est pour cela que la masse volumique de l'eau vaut exactement 1 kg/dm³.
</div>
`;

document.getElementById('methode-demo-proportionnalite-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une quatrième proportionnelle</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Remplissez trois cases du tableau et laissez la quatrième vide : les produits en croix apparaissent et le calcul est rédigé.</p>
  <div id="po4-qTab" style="position:relative;width:max-content;margin:34px auto 8px;">
    <div style="display:grid;grid-template-columns:repeat(2,96px);gap:14px;">
      ${['a', 'c', 'b', 'd'].map((k, i) => `<input id="po4-q${k}" type="text" inputmode="decimal" value="${['4', '7', '9,8', ''][i]}" placeholder="?" style="height:44px;border-radius:8px;border:2px solid #C9D6E6;text-align:center;font-size:1.15rem;font-family:'JetBrains Mono',monospace;" oninput="po4Quatrieme()">`).join('')}
    </div>
    <svg id="po4-qFl" style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none;"></svg>
  </div>
  <div id="po4-qRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : distance, durée et vitesse sur un trajet</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez la distance et la vitesse, puis lancez la voiture : l'horloge compte le temps de trajet (en accéléré), et la durée est convertie en heures et minutes.</p>
  <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Distance : <input id="po4-tD" type="range" min="10" max="300" step="5" value="120" style="width:150px;" oninput="po4Trajet()"> <b id="po4-tDa"></b></label>
    <label>Vitesse : <input id="po4-tV" type="range" min="10" max="130" step="5" value="50" style="width:150px;" oninput="po4Trajet()"> <b id="po4-tVa"></b></label>
  </div>
  <svg id="po4-tSvg" viewBox="0 0 520 130" style="width:100%;max-width:560px;display:block;margin:10px auto;"></svg>
  <div id="po4-tRes"></div>
  <div class="figure-toolbar"><button class="btn" id="po4-tBtn" onclick="po4Partir()">Partir</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : remplir une cuve (le débit)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez le volume de la cuve et le débit du robinet, puis ouvrez-le : la durée de remplissage est calculée avec t = V ÷ débit.</p>
  <div style="display:flex;gap:14px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Volume : <input id="po4-cV" type="range" min="100" max="3000" step="50" value="1200" style="width:150px;" oninput="po4Cuve()"> <b id="po4-cVa"></b></label>
    <label>Débit : <input id="po4-cQ" type="range" min="2" max="60" step="1" value="16" style="width:150px;" oninput="po4Cuve()"> <b id="po4-cQa"></b></label>
  </div>
  <svg id="po4-cSvg" viewBox="0 0 520 200" style="width:100%;max-width:560px;display:block;margin:10px auto;"></svg>
  <div id="po4-cRes"></div>
  <div class="figure-toolbar"><button class="btn" id="po4-cBtn" onclick="po4Remplir()">Ouvrir le robinet</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : convertir une vitesse, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un TGV roule à 300 km/h. Quelle est sa vitesse en mètres par seconde ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="po4-convDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="po4ConvDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="po4ConvDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function po4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="po4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="po4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-proportionnalite-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une vitesse moyenne »</h3>
  <p style="margin:0 0 8px;">Léo court 10 km en 50 minutes. Quelle est sa vitesse moyenne en km/h ?</p>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">d = 10 km et t = 50 min = ${po4Tex('\\dfrac{50}{60}')} h = ${po4Tex('\\dfrac{5}{6}')} h.</span><span class="we-comment">On veut des km/h : on convertit la durée en heures.</span></div>
    <div class="we-row"><span class="we-expr">${po4Tex('v = \\dfrac{d}{t} = 10 \\div \\dfrac{5}{6} = 10 \\times \\dfrac{6}{5} = 12')}</span><span class="we-comment">On applique la formule (diviser par 5/6, c'est multiplier par 6/5).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La vitesse moyenne de Léo est de 12 km/h.</span><span class="we-comment">On conclut avec l'unité.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${po4Exo(1, 'Calcule la quatrième proportionnelle dans chaque tableau.' + po4Tab(['12', '18'], ['30', '?'], 'Grandeur 1', 'Grandeur 2') + po4Tab(['2,5', '?'], ['7', '21'], 'Grandeur 1', 'Grandeur 2'), [
    po4Tex('x = \\dfrac{18 \\times 30}{12} = 45') + ' ; ' + po4Tex('x = \\dfrac{21 \\times 2{,}5}{7} = 7{,}5') + '.'])}
  ${po4Exo(2, 'Pour 6 personnes, une recette de crêpes utilise 450 g de farine. Quelle quantité faut-il pour 10 personnes ?', [
    po4Tex('x = \\dfrac{10 \\times 450}{6} = 750') + ' : il faut 750 g de farine.'])}
  ${po4Exo(3, 'a) 27 élèves sur 36 ont réussi un test : quel pourcentage cela représente-t-il ? b) Un pull passe de 45 € à 36 € : quel est le pourcentage de réduction ?', [
    'a) ' + po4Tex('\\dfrac{27 \\times 100}{36} = 75') + ' : 75 % des élèves ont réussi.',
    'b) La réduction est de 45 − 36 = 9 € ; ' + po4Tex('\\dfrac{9 \\times 100}{45} = 20') + ' : la réduction est de 20 %.'])}
  ${po4Exo(4, 'Un train parcourt 210 km en 1 h 30 min. Calcule sa vitesse moyenne.', [
    't = 1 h 30 min = 1,5 h ; ' + po4Tex('v = \\dfrac{210}{1{,}5} = 140') + ' km/h.'])}
  ${po4Exo(5, 'Une voiture roule à la vitesse moyenne de 80 km/h. a) Quelle distance parcourt-elle en 2 h 15 min ? b) Combien de temps met-elle pour parcourir 100 km ?', [
    'a) 2 h 15 min = 2,25 h ; ' + po4Tex('d = 80 \\times 2{,}25 = 180') + ' km.',
    'b) ' + po4Tex('t = \\dfrac{100}{80} = 1{,}25') + ' h, soit 1 h 15 min (0,25 h = 15 min).'])}
  ${po4Exo(6, 'Convertis : 72 km/h en m/s ; 15 m/s en km/h.', [
    '72 km/h = 72 000 m en 3 600 s : ' + po4Tex('\\dfrac{72\\,000}{3\\,600} = 20') + ' m/s (ou 72 ÷ 3,6).', '15 m/s = 15 × 3,6 = 54 km/h.'])}
  ${po4Exo(7, 'Un tuyau d\'arrosage débite 24 L par minute. Combien de temps faut-il pour remplir une piscine gonflable de 3 000 L ?', [
    po4Tex('t = \\dfrac{3\\,000}{24} = 125') + ' min, soit 2 h 05 min.'])}
  ${po4Exo(8, 'Le fer a une masse volumique de 7,9 kg/dm³. Combien pèse un cube de fer de 2 dm d\'arête ? Flotte-t-il sur l\'eau ?', [
    'Volume : 2 × 2 × 2 = 8 dm³. Masse : 7,9 × 8 = <b>63,2 kg</b>.',
    'Il coule : sa masse volumique (7,9 kg/dm³) est bien supérieure à celle de l\'eau (1 kg/dm³).'])}
</div>
`;

/* ---- Méthode 1 : quatrième proportionnelle ---- */
function po4Quatrieme(){
  const cles = ['a', 'c', 'b', 'd'], el = k => document.getElementById('po4-q' + k), out = document.getElementById('po4-qRes'), fl = document.getElementById('po4-qFl');
  const val = {}; cles.forEach(k => { const t = String(el(k).value).trim().replace(',', '.'); val[k] = t === '' || t === '?' ? null : Number(t); });
  cles.forEach(k => { el(k).style.borderColor = '#C9D6E6'; el(k).style.background = '#fff'; });
  fl.innerHTML = '';
  const vides = cles.filter(k => val[k] === null);
  const err = t => { out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">${t}</p>`; };
  if(vides.length !== 1) return err('Laissez exactement une case vide : c\'est la valeur cherchée.');
  if(cles.some(k => val[k] !== null && !(Number.isFinite(val[k])))) return err('Écrivez des nombres (virgule pour les décimaux).');
  // Disposition : a | c (ligne 1) et b | d (ligne 2). La diagonale qui contient x donne le diviseur (le coin opposé à x).
  const x = vides[0], opp = { a: 'd', d: 'a', c: 'b', b: 'c' }[x], diag = cles.filter(k => k !== x && k !== opp);
  if(val[opp] === 0) return err('Le nombre qui divise ne peut pas être 0.');
  const res = val[diag[0]] * val[diag[1]] / val[opp];
  diag.forEach(k => { el(k).style.borderColor = PO4_VERT; el(k).style.background = '#EAF5EC'; });
  el(opp).style.borderColor = PO4_ORANGE; el(opp).style.background = '#FDF0E1';
  el(x).style.borderColor = PO4_BLEU; el(x).placeholder = po4N(res, 4);
  const n = k => po4N(val[k], 4), t = k => po4T(val[k], 4);
  out.innerHTML = r4Ex('', [
    [po4Tex(`x \\times ${t(opp)} = ${t(diag[0])} \\times ${t(diag[1])}`), 'Les produits en croix sont égaux : x est sur la même diagonale que le nombre en orange.'],
    [po4Tex(`x = \\dfrac{${t(diag[0])} \\times ${t(diag[1])}}{${t(opp)}}`), 'On multiplie les deux nombres de l\'autre diagonale (en vert) et on divise par le troisième (en orange).'],
    [po4Tex(`x ${Math.abs(res * 100 - Math.round(res * 100)) < 1e-9 ? '=' : '\\approx'} ${po4T(res, 2)}`), `Calcul : ${n(diag[0])} × ${n(diag[1])} ÷ ${n(opp)}.`],
  ]);
  renderStaticMath(out);
  // Diagonale verte (produit) et flèche vers x, tracées d'après la position des cases.
  const tracer = () => {
    // Chaque trait relie les coins qui se font face : il ne traverse que l'espace entre les cases.
    const r0 = fl.getBoundingClientRect(), R = k => el(k).getBoundingClientRect();
    const coin = (k, versK) => { const r = R(k), o = R(versK); return [(o.left > r.left ? r.right : r.left) - r0.left, (o.top > r.top ? r.bottom : r.top) - r0.top]; };
    const [p1, p2] = [coin(diag[0], diag[1]), coin(diag[1], diag[0])], [q1, q2] = [coin(opp, x), coin(x, opp)];
    fl.innerHTML = `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${PO4_VERT}" stroke-width="3" stroke-linecap="round"/><line x1="${q1[0]}" y1="${q1[1]}" x2="${q2[0]}" y2="${q2[1]}" stroke="${PO4_ORANGE}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  };
  if(fl.getBoundingClientRect().width > 0) tracer();
  else if(window.ResizeObserver){ const ro = new ResizeObserver(() => { if(fl.getBoundingClientRect().width > 0){ ro.disconnect(); tracer(); } }); ro.observe(fl); }
}

/* ---- Méthode 2 : trajet ---- */
let po4TRaf = null, po4TProg = 0;
function po4TrajetDessin(prog){
  const svg = document.getElementById('po4-tSvg'); if(!svg) return;
  const d = Number(document.getElementById('po4-tD').value), v = Number(document.getElementById('po4-tV').value), t = d / v, x0 = 30, L = 460, x = x0 + L * prog;
  let s = `<rect x="${x0 - 10}" y="58" width="${L + 20}" height="34" rx="6" fill="#5B6472"/><line x1="${x0}" y1="75" x2="${x0 + L}" y2="75" stroke="#fff" stroke-width="2" stroke-dasharray="14 10"/>`;
  s += `<text x="${x0}" y="112" text-anchor="middle" font-size="12" fill="#4E5665">0 km</text><text x="${x0 + L}" y="112" text-anchor="middle" font-size="12" fill="#4E5665">${d} km</text><polygon points="${x0 + L},30 ${x0 + L},56 ${x0 + L + 16},38" fill="${PO4_ORANGE}"/><line x1="${x0 + L}" y1="30" x2="${x0 + L}" y2="58" stroke="${PO4_ENCRE}" stroke-width="2"/>`;
  s += `<g transform="translate(${x - 22},52)"><rect x="0" y="6" width="44" height="14" rx="4" fill="${PO4_BLEU}"/><path d="M8,6 L14,-2 H30 L36,6 Z" fill="${PO4_BLEU}"/><circle cx="11" cy="21" r="5" fill="${PO4_ENCRE}"/><circle cx="33" cy="21" r="5" fill="${PO4_ENCRE}"/></g>`;
  s += `<text x="${Math.max(60, Math.min(460, x))}" y="28" text-anchor="middle" font-size="14" font-weight="700" fill="${PO4_ENCRE}">${po4N(d * prog, 1)} km · ${po4Hmin(t * prog)}</text>`;
  svg.innerHTML = s;
}
function po4Trajet(){
  cancelAnimationFrame(po4TRaf); po4TProg = 0;
  const d = Number(document.getElementById('po4-tD').value), v = Number(document.getElementById('po4-tV').value), t = d / v;
  document.getElementById('po4-tDa').textContent = d + ' km'; document.getElementById('po4-tVa').textContent = v + ' km/h';
  po4TrajetDessin(0);
  const H = Math.floor(t + 1e-9), dec = t - H;
  const out = document.getElementById('po4-tRes');
  out.innerHTML = r4Ex('', [
    [po4Tex(`t = \\dfrac{d}{v} = \\dfrac{${d}}{${v}} ${Math.abs(t * 1000 - Math.round(t * 1000)) < 1e-9 ? '=' : '\\approx'} ${po4T(t, 3)} \\text{ h}`), 'Durée = distance ÷ vitesse, en heures.'],
    [dec < 1e-9 ? `${H} h exactement.` : (H === 0 ? `En minutes : ${d} ÷ ${v} × 60 ${Math.abs(t * 60 - Math.round(t * 60)) < 1e-6 ? '=' : '≈'} <b>${po4Hmin(t)}</b>` : `${po4N(t, 3)} h = ${H} h + ${po4N(dec, 3)} × 60 min ${Math.abs(dec * 60 - Math.round(dec * 60)) < 1e-6 ? '=' : '≈'} <b>${po4Hmin(t)}</b>`), H === 0 ? 'Moins d\'une heure : on multiplie par 60 pour avoir des minutes.' : 'On convertit la partie décimale des heures en minutes (× 60).'],
  ]);
  renderStaticMath(out);
  const b = document.getElementById('po4-tBtn'); if(b) b.disabled = false;
}
function po4Partir(){
  cancelAnimationFrame(po4TRaf);
  const b = document.getElementById('po4-tBtn'); if(b) b.disabled = true;
  const t0 = performance.now(), duree = 3500;
  const f = now => { const p = Math.max(0, Math.min(1, (now - t0) / duree)); po4TrajetDessin(p); if(p < 1) po4TRaf = requestAnimationFrame(f); else if(b) b.disabled = false; };
  po4TRaf = requestAnimationFrame(f);
}

/* ---- Méthode 3 : cuve ---- */
let po4CRaf = null;
function po4CuveDessin(prog){
  const svg = document.getElementById('po4-cSvg'); if(!svg) return;
  const V = Number(document.getElementById('po4-cV').value), Q = Number(document.getElementById('po4-cQ').value), t = V / Q;
  const X = 150, Y = 40, W = 160, H = 140, h = H * prog;
  let s = `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="#F4F8FC" stroke="${PO4_ENCRE}" stroke-width="2.4"/>`;
  s += `<rect x="${X + 1.2}" y="${Y + H - h}" width="${W - 2.4}" height="${h}" fill="#5DADE2" opacity=".75"/>`;
  s += `<path d="M${X - 60},18 H${X + 30} V28" fill="none" stroke="#8A93A3" stroke-width="10" stroke-linecap="round"/>`;
  if(prog > 0 && prog < 1) s += `<line x1="${X + 30}" y1="32" x2="${X + 30}" y2="${Y + H - h}" stroke="#5DADE2" stroke-width="5"/>`;
  s += `<text x="${X + W + 16}" y="${Y + 20}" font-size="14" fill="${PO4_ENCRE}">Volume : ${po4N(V * prog, 0)} L / ${po4N(V, 0)} L</text><text x="${X + W + 16}" y="${Y + 46}" font-size="14" fill="${PO4_ENCRE}">Temps : ${po4MinS(t * prog)}</text><text x="${X + W + 16}" y="${Y + 72}" font-size="14" fill="${PO4_BLEU}" font-weight="700">Débit : ${Q} L/min</text>`;
  svg.innerHTML = s;
}
function po4Cuve(){
  cancelAnimationFrame(po4CRaf);
  const V = Number(document.getElementById('po4-cV').value), Q = Number(document.getElementById('po4-cQ').value), t = V / Q;
  document.getElementById('po4-cVa').textContent = V + ' L'; document.getElementById('po4-cQa').textContent = Q + ' L/min';
  po4CuveDessin(0);
  const out = document.getElementById('po4-cRes');
  out.innerHTML = r4Ex('', [
    [po4Tex(`t = \\dfrac{V}{\\text{débit}} = \\dfrac{${po4T(V, 0)}}{${Q}} ${Math.abs(t * 100 - Math.round(t * 100)) < 1e-9 ? '=' : '\\approx'} ${po4T(t, 2)} \\text{ min}`), 'Le débit est le volume écoulé par minute : on divise le volume par le débit.'],
    [t >= 60 ? `${po4N(t, 2)} min ${Number.isInteger(Math.round(t * 1e6) / 1e6) ? '=' : '≈'} <b>${po4Hmin(t / 60)}</b>` : `Soit ${Math.abs(t * 60 - Math.round(t * 60)) < 1e-6 ? '' : 'environ '}<b>${po4MinS(t)}</b>.`, t >= 60 ? 'Conversion en heures et minutes (60 min = 1 h).' : 'La partie décimale des minutes × 60 donne les secondes.'],
  ]);
  renderStaticMath(out);
  const b = document.getElementById('po4-cBtn'); if(b) b.disabled = false;
}
function po4Remplir(){
  cancelAnimationFrame(po4CRaf);
  const b = document.getElementById('po4-cBtn'); if(b) b.disabled = true;
  const t0 = performance.now(), duree = 3000;
  const f = now => { const p = Math.max(0, Math.min(1, (now - t0) / duree)); po4CuveDessin(p); if(p < 1) po4CRaf = requestAnimationFrame(f); else if(b) b.disabled = false; };
  po4CRaf = requestAnimationFrame(f);
}

/* ---- Méthode 4 : conversion ---- */
const PO4_CONV_STEPS = [
  { expr: 'v = 300 km/h : le train parcourt 300 km en 1 h.', note: 'On traduit la vitesse en une distance parcourue pendant une durée.' },
  { expr: '300 km = 300 000 m et 1 h = 3 600 s.', note: 'On convertit la distance en mètres et la durée en secondes.' },
  { expr: po4Tex('v = \\dfrac{300\\,000 \\text{ m}}{3\\,600 \\text{ s}}'), note: 'Vitesse = distance ÷ durée, dans les nouvelles unités.' },
  { expr: po4Tex('v \\approx 83{,}3 \\text{ m/s}'), note: 'Le TGV parcourt plus de 83 mètres chaque seconde !' },
  { expr: 'Raccourci : 300 ÷ 3,6 ≈ 83,3.', note: 'Comme 1 m/s = 3,6 km/h, on divise par 3,6 pour passer des km/h aux m/s (et on multiplie par 3,6 dans l\'autre sens).' },
];
const po4ConvDemo = makeStepDemo(PO4_CONV_STEPS, 'po4-convDisplay');

DEMO_REGISTRY['4e|Proportionnalité'] = {
  cours: 'cours-demo-proportionnalite-4e', methode: 'methode-demo-proportionnalite-4e', exos: 'exos-demo-proportionnalite-4e', histoire: 'histoire-demo-proportionnalite-4e',
  init: () => {
    po4Quatrieme(); po4Trajet(); po4Cuve(); po4ConvDemo.reset();
    ['cours-demo-proportionnalite-4e', 'exos-demo-proportionnalite-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-proportionnalite-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-proportionnalite-4e'));
  }
};

DEMO_QUIZZES['4e|Proportionnalité'] = [
  { q: '3 cahiers coûtent 4,50 €. Combien coûtent 5 cahiers ?', opts: ['7,50 €', '6,50 €', '9 €'], correct: 0 },
  { q: 'Dans un tableau de proportionnalité, 4 correspond à 10. À quoi correspond 6 ?', opts: ['12', '15', '16'], correct: 1 },
  { q: '12 élèves sur 48, cela représente...', opts: ['12 %', '25 %', '40 %'], correct: 1 },
  { q: 'Une voiture parcourt 150 km en 2 h. Sa vitesse moyenne est...', opts: ['75 km/h', '300 km/h', '152 km/h'], correct: 0 },
  { q: '1 h 30 min, c\'est...', opts: ['1,30 h', '1,5 h', '1,3 h'], correct: 1 },
  { q: '36 km/h, c\'est...', opts: ['10 m/s', '36 m/s', '3,6 m/s'], correct: 0 },
  { q: 'L\'eau a une masse volumique de 1 kg/dm³. 2,5 L d\'eau pèsent...', opts: ['2,5 kg', '25 kg', '0,4 kg'], correct: 0 },
];

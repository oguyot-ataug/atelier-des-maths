/* ============================================================
   CHAPITRE : Initiation à l'algèbre (6e, N6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (capture du manuel p. 56 : problème algébrique ; résoudre avec un schéma en barres ;
   résoudre avec une balance). Titres reformulés, exemples nouveaux. Le schéma en barres et le
   raisonnement de la balance se déroulent pas à pas (et s'ajoutent au cahier étape par étape) ;
   une balance interactive permet de chercher une masse inconnue.
   ============================================================ */

const AL_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const AL_VERT = '#1E7B34', AL_ORANGE = '#E07B00', AL_ROUGE = '#C0392B', AL_BLEU = '#0C5BA0', AL_ENCRE = '#1C1B2E';
const alNum = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
function alEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}

/* ---- Schéma en barres (problème des billes : Léa, Tom = Léa + 25, Sam = Léa − 10, total 150) ---- */
// k = étape (0 à 4) : 0 les trois barres ; 1 on rassemble ; 2 on retire 15 ; 3 on partage en 3 ; 4 on conclut.
function alBarres(k){
  const u = 64, x0 = 110, h = 30, y = [16, 58, 100], lab = ['Léa', 'Tom', 'Sam'];
  const bloc = (x, yy, w, txt, c, op) => `<rect x="${x}" y="${yy}" width="${w}" height="${h}" rx="3" fill="${c}" fill-opacity="${op == null ? 0.25 : op}" stroke="${AL_ENCRE}" stroke-width="1.3"/>` + (txt ? `<text x="${x + w / 2}" y="${yy + 20}" text-anchor="middle" font-family="Inter" font-size="12.5" font-weight="700" fill="${AL_ENCRE}">${txt}</text>` : '');
  let s = '';
  if(k === 0){
    lab.forEach((l, i) => { s += `<text x="${x0 - 10}" y="${y[i] + 20}" text-anchor="end" font-family="Inter" font-size="13" fill="${AL_ENCRE}">${l}</text>`; });
    s += bloc(x0, y[0], u, '?', AL_BLEU) + bloc(x0, y[1], u, '?', AL_BLEU) + bloc(x0 + u, y[1], 52, '+ 25', AL_VERT)
      + bloc(x0, y[2], u, '?', AL_BLEU) + `<rect x="${x0 + u - 26}" y="${y[2]}" width="26" height="${h}" fill="#fff" stroke="${AL_ROUGE}" stroke-width="1.3" stroke-dasharray="4 3"/><text x="${x0 + u - 13}" y="${y[2] + 48}" text-anchor="middle" font-family="Inter" font-size="12" font-weight="700" fill="${AL_ROUGE}">− 10</text>`
      + `<path d="M${x0 + u + 70},${y[0]} q14,0 14,14 v${y[2] + h - y[0] - 28} q0,14 -14,14" fill="none" stroke="${AL_ENCRE}" stroke-width="1.3"/><text x="${x0 + u + 92}" y="${(y[0] + y[2] + h) / 2 + 5}" font-family="Inter" font-size="14" font-weight="700" fill="${AL_ENCRE}">150 billes</text>`;
  } else {
    const yy = 50;
    const barres = k >= 3 ? [bloc(x0, yy, u, '45', AL_BLEU, 0.45), bloc(x0 + u, yy, u, '45', AL_BLEU, 0.45), bloc(x0 + 2 * u, yy, u, '45', AL_BLEU, 0.45)] : [bloc(x0, yy, u, '?', AL_BLEU), bloc(x0 + u, yy, u, '?', AL_BLEU), bloc(x0 + 2 * u, yy, u, '?', AL_BLEU)];
    s += `<text x="${x0 - 10}" y="${yy + 20}" text-anchor="end" font-family="Inter" font-size="13" fill="${AL_ENCRE}">soit</text>` + barres.join('');
    if(k === 1) s += bloc(x0 + 3 * u, yy, 52, '+ 25', AL_VERT) + bloc(x0 + 3 * u + 52, yy, 42, '− 10', AL_ROUGE, 0.15) + `<text x="${x0 + 3 * u + 104}" y="${yy + 20}" font-family="Inter" font-size="13.5" font-weight="700" fill="${AL_ENCRE}">= 150</text>`;
    if(k === 2) s += `<text x="${x0 + 3 * u + 10}" y="${yy + 20}" font-family="Inter" font-size="13.5" font-weight="700" fill="${AL_ENCRE}">= 150 − 15 = 135</text>`;
    if(k >= 3) s += `<text x="${x0 + 3 * u + 10}" y="${yy + 20}" font-family="Inter" font-size="13.5" font-weight="700" fill="${AL_ENCRE}">= 135</text>`;
    if(k >= 3) s += `<text x="${x0 + 1.5 * u}" y="${yy + 56}" text-anchor="middle" font-family="Inter" font-size="12.5" fill="#4E5665">135 ÷ 3 = 45 : une barre vaut 45 billes</text>`;
    if(k === 4) s += `<text x="${x0 + 1.5 * u}" y="${yy + 80}" text-anchor="middle" font-family="Inter" font-size="13" font-weight="700" fill="${AL_VERT}">Léa : 45 · Tom : 45 + 25 = 70 · Sam : 45 − 10 = 35</text>`;
  }
  return s;
}
const AL_BARRES_NOTES = [
  'On représente la part de Léa par une barre « ? ». Tom a la même barre plus 25 billes ; Sam a la même barre moins 10 billes. En tout : 150 billes.',
  'On met les trois barres bout à bout : trois barres « ? », plus 25, moins 10, font 150.',
  '+ 25 puis − 10, c\'est + 15 en tout. Sans ces 15 billes, les trois barres valent 150 − 15 = 135.',
  'Les trois barres sont égales : chacune vaut 135 ÷ 3 = 45.',
  'Léa a 45 billes, Tom 70 et Sam 35. Vérification : 45 + 70 + 35 = 150.',
];

/* ---- Balance (même modèle que le chapitre Équations de 5e) ----
   Le fléau est en bas, posé sur le pivot ; les plateaux reposent sur un court montant au-dessus de
   chaque bras. Quand la balance penche, tout le fléau (plateaux et objets compris) pivote d'un bloc.
   Objets : 'o' orange, 'm' melon, texte commençant par « ¤ » = boule de masse inconnue (le reste du
   texte est écrit dessus), autre texte = poids marqué. Les dégradés ont un identifiant propre à chaque
   figure (uid) : un dégradé défini dans un onglet masqué ne s'afficherait pas ailleurs. */
const AL_MIDX = 200, AL_BEAMY = 150, AL_PANY = 105, AL_LEFTX = 90, AL_RIGHTX = 310;
const AL_BAL_VB = '-20 -12 440 232';
function alObjetTaille(o){
  if(o === 'o') return { w: 30, h: 30 };
  if(o === 'm') return { w: 50, h: 46 };
  if(o.startsWith('¤')) return { w: 40, h: 38 };
  return { w: Math.max(46, 8.5 * o.length + 16), h: 28 };
}
function alObjet(o, x, base, uid){
  if(o === 'o') return `<circle cx="${x}" cy="${base - 15}" r="15" fill="url(#${uid}-or)" stroke="#c96b12" stroke-width="1.3"/><path d="M${x + 1},${base - 29} q4,-7 10,-5 q-3,6 -10,5z" fill="#4C8C2B"/>`;
  if(o === 'm') return `<ellipse cx="${x}" cy="${base - 23}" rx="25" ry="23" fill="url(#${uid}-ve)" stroke="#2f6d1c" stroke-width="1.4"/>`
    + [-13, -5, 5, 13].map(d => `<path d="M${x + d * 0.35},${base - 45} Q${x + d * 1.45},${base - 23} ${x + d * 0.35},${base - 1}" fill="none" stroke="#2f6d1c" stroke-width="1.2" opacity=".55"/>`).join('');
  if(o.startsWith('¤')){ const t = o.slice(1); return `<circle cx="${x}" cy="${base - 19}" r="19" fill="url(#${uid}-bo)" stroke="#2f6d1c" stroke-width="1.4"/><text x="${x}" y="${base - 14.5}" text-anchor="middle" font-size="${t.length > 3 ? 11 : 14}" font-weight="700" fill="#1C1B2E">${t}</text>`; }
  const w = alObjetTaille(o).w;
  return `<rect x="${x - w / 2}" y="${base - 28}" width="${w}" height="28" rx="4" fill="#fff" stroke="#1C1B2E" stroke-width="1.5"/><text x="${x}" y="${base - 9}" font-size="13" text-anchor="middle" font-weight="700" fill="#1C1B2E">${o}</text>`;
}
// Range les objets d'un plateau : les poids et le melon en bas, puis des rangées d'au plus 186 unités.
const alRond = o => o === 'o' || o.startsWith('¤');
function alRangees(objets){
  const tous = objets.filter(o => !alRond(o)).concat(objets.filter(alRond)), r = [];
  let ligne = [], larg = 0;
  tous.forEach(o => { const w = alObjetTaille(o).w; if(ligne.length && larg + 4 + w > 186){ r.push(ligne); ligne = []; larg = 0; } larg += (ligne.length ? 4 : 0) + w; ligne.push(o); });
  if(ligne.length) r.push(ligne);
  return r;
}
function alRangeesLargeur(r){ return r.reduce((m, ligne) => Math.max(m, ligne.reduce((t, o) => t + alObjetTaille(o).w, 0) + 4 * (ligne.length - 1)), 0); }
function alPlateau(cx, objets, demi, uid){
  let s = `<rect x="${cx - 4}" y="${AL_PANY}" width="8" height="${AL_BEAMY - AL_PANY}" fill="#1C1B2E"/>`
    + `<ellipse cx="${cx}" cy="${AL_PANY}" rx="${demi}" ry="12" fill="url(#${uid}-pl)" stroke="#C77D1E" stroke-width="1.5"/>`;
  let base = AL_PANY - 5, centre = cx, dessous = null;
  alRangees(objets).forEach(ligne => {
    const t = ligne.map(alObjetTaille), larg = t.reduce((a, v) => a + v.w, 0) + 4 * (ligne.length - 1);
    if(dessous){
      // Rangée du dessus : centrée sur les boules de la rangée du dessous, posée dans leurs creux
      // quand elles sont assez nombreuses pour la porter.
      const ronds = dessous.pos.filter(q => alRond(q.o)), d = t[0].w;
      if(ronds.length){ centre = (ronds[0].x + ronds[ronds.length - 1].x) / 2; }
      base = ronds.length > ligne.length ? dessous.base - Math.sqrt(d * d - Math.pow((d + 4) / 2, 2)) : dessous.base - Math.max(...dessous.pos.map(q => alObjetTaille(q.o).h)) + 1;
    }
    let x = centre - larg / 2; const pos = [];
    ligne.forEach((o, i) => { pos.push({ o, x: x + t[i].w / 2 }); s += alObjet(o, x + t[i].w / 2, base, uid); x += t[i].w + 4; });
    dessous = { pos, base };
  });
  return s;
}
// pente en degrés : négative, la gauche descend (plus lourde) ; positive, la droite descend.
function alBalance(gauche, droite, pente, uid){
  uid = uid || 'alb';
  const demi = Math.max(38, Math.max(alRangeesLargeur(alRangees(gauche)), alRangeesLargeur(alRangees(droite))) / 2 + 12);
  return `<defs>
    <radialGradient id="${uid}-bo" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#C3EC94"/><stop offset="100%" stop-color="#4C8C2B"/></radialGradient>
    <radialGradient id="${uid}-ve" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#A8DC7A"/><stop offset="100%" stop-color="#3E7A22"/></radialGradient>
    <radialGradient id="${uid}-or" cx="35%" cy="30%" r="75%"><stop offset="0%" stop-color="#FFDCA8"/><stop offset="100%" stop-color="#E8952E"/></radialGradient>
    <linearGradient id="${uid}-pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#FFDD86"/><stop offset="100%" stop-color="#F0A93A"/></linearGradient>
  </defs>`
    + `<polygon points="${AL_MIDX - 16},${AL_BEAMY + 34} ${AL_MIDX + 16},${AL_BEAMY + 34} ${AL_MIDX},${AL_BEAMY}" fill="#1C1B2E"/>`
    + `<rect x="${AL_MIDX - 32}" y="${AL_BEAMY + 34}" width="64" height="8" rx="3" fill="#1C1B2E"/>`
    + `<g transform="rotate(${(pente || 0).toFixed(2)} ${AL_MIDX} ${AL_BEAMY})">`
    + `<line x1="${AL_LEFTX}" y1="${AL_BEAMY}" x2="${AL_RIGHTX}" y2="${AL_BEAMY}" stroke="#1C1B2E" stroke-width="6" stroke-linecap="round"/>`
    + alPlateau(AL_LEFTX, gauche, demi, uid) + alPlateau(AL_RIGHTX, droite, demi, uid) + `</g>`;
}
const AL_BAL_STEPS = [
  { g: ['o', 'o', 'm'], d: ['1,6 kg'], note: 'Première pesée : 2 oranges et 1 melon pèsent 1,6 kg. (Toutes les oranges ont la même masse.)' },
  { g: ['o', 'o', 'o', 'm'], d: ['1,85 kg'], note: 'Deuxième pesée : 3 oranges et 1 melon pèsent 1,85 kg. Il y a juste une orange de plus.' },
  { g: ['o', '1,6 kg'], d: ['1,85 kg'], note: 'Dans la deuxième pesée, on remplace « 2 oranges et 1 melon » par ce qu\'ils pèsent : 1,6 kg.' },
  { g: ['o'], d: ['0,25 kg'], note: 'Une orange pèse donc 1,85 − 1,6 = 0,25 kg.' },
  { g: ['m'], d: ['1,1 kg'], note: 'Le melon pèse 1,6 − (2 × 0,25) = 1,6 − 0,5 = 1,1 kg.' },
];

document.getElementById('cours-demo-algebre-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Qu'est-ce qu'un problème algébrique ?</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">L'<b>algèbre</b> est un outil qui permet de résoudre des problèmes en raisonnant sur des nombres <b>sans connaître leur valeur</b> au départ. On représente ces nombres inconnus (par une barre, une boîte, un fruit sur une balance… et plus tard par une lettre), puis on raisonne jusqu'à les trouver.</div>

<div class="lesson-header"><span class="num">2</span><h3>Résoudre un problème algébrique</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Avec un schéma en barres</h4></div>
<p class="example-title">Exemple : Léa, Tom et Sam se partagent 150 billes. Tom a 25 billes de plus que Léa, et Sam a 10 billes de moins que Léa. Combien de billes chacun a-t-il ?</p>
<svg viewBox="0 0 470 150" style="width:100%;max-width:500px;display:block;margin:8px auto;">${alBarres(0)}</svg>
${alEx('', [
  ['3 barres + 25 − 10 = 150', 'On met les barres bout à bout : + 25 − 10, c\'est + 15.'],
  ['3 barres = 150 − 15 = 135', 'On retire les 15 billes « en trop ».'],
  ['1 barre = 135 ÷ 3 = 45', 'Les trois barres sont égales : on partage en 3.'],
  ['Léa : 45 billes ; Tom : 45 + 25 = 70 billes ; Sam : 45 − 10 = 35 billes.', 'On calcule chaque part, et on vérifie : 45 + 70 + 35 = 150.'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Avec une balance</h4></div>
<p class="example-title">Exemple : on a fait deux pesées. Toutes les oranges ont la même masse. Quelle est la masse d'une orange ? Celle du melon ?</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:8px;">
  <svg viewBox="${AL_BAL_VB}" style="width:100%;max-width:320px;display:block;margin:0 auto;">${alBalance(['o', 'o', 'm'], ['1,6 kg'], 0, 'alc1')}</svg>
  <svg viewBox="${AL_BAL_VB}" style="width:100%;max-width:320px;display:block;margin:0 auto;">${alBalance(['o', 'o', 'o', 'm'], ['1,85 kg'], 0, 'alc2')}</svg>
</div>
${alEx('', [
  ['Dans la 2e pesée, « 2 oranges + 1 melon » pèsent 1,6 kg.', 'On remplace par la 1re pesée : il reste 1 orange + 1,6 kg = 1,85 kg.'],
  ['1 orange = 1,85 kg − 1,6 kg = 0,25 kg', 'Une orange pèse 0,25 kg, soit 250 g.'],
  ['1 melon = 1,6 kg − 2 × 0,25 kg = 1,1 kg', 'On revient à la 1re pesée.'],
])}
<div class="redaction-note" ${AL_REM}>Remarque : une balance en équilibre reste en équilibre si l'on <b>retire (ou ajoute) la même masse des deux côtés</b>. C'est l'idée qui sert, plus tard, à résoudre les équations.</div>
`;

document.getElementById('histoire-demo-algebre-6e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « algèbre » vient de l'arabe <i>al-jabr</i>, qui figure dans le titre d'un livre écrit vers 820 à Bagdad par le savant <b>Al-Khwârizmî</b>. <i>Al-jabr</i> signifie « la restauration » : c'est l'opération qui consiste à rééquilibrer une égalité, un peu comme on rééquilibre une balance. Le nom d'Al-Khwârizmî, lui, a donné le mot « algorithme ». Bien avant lui, le Grec <b>Diophante</b> d'Alexandrie (3e siècle) résolvait déjà des problèmes avec des nombres inconnus, et les Babyloniens savaient en résoudre il y a près de 4 000 ans. L'usage d'une lettre comme <i>x</i> pour l'inconnue ne s'est imposé qu'au 17e siècle, avec Descartes.
</div>
`;

document.getElementById('methode-demo-algebre-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : construire un schéma en barres, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="al-barresSvg" viewBox="0 0 470 150" style="width:100%;max-width:500px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="al-barresSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="al-barresNext" onclick="alBarresDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="alBarresDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : raisonner avec une balance, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="al-balSvg" viewBox="${AL_BAL_VB}" style="width:100%;max-width:340px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="al-balSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="al-balNext" onclick="alBalDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="alBalDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : équilibrer la balance</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Les boules vertes ont toutes la même masse, inconnue. Proposez une masse : la balance penche du côté le plus lourd. Trouvez la masse qui l'équilibre !</p>
  <svg id="al-jeuSvg" viewBox="${AL_BAL_VB}" style="width:100%;max-width:360px;display:block;margin:8px auto;"></svg>
  <div id="al-jeuEnonce" style="text-align:center;font-size:1.05rem;margin:4px 0;"></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <label>Masse d'une boule : <input id="al-jeuVal" type="number" min="0" step="1" value="1" style="width:80px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;" onkeydown="if(event.key==='Enter') alJeuEssayer()"> kg</label>
    <button class="btn" onclick="alJeuEssayer()">Peser</button>
    <button class="btn secondary" onclick="alJeuIndice()">Un indice</button>
    <button class="btn secondary" onclick="alJeuNouveau()">Nouvelle balance</button>
  </div>
  <div id="al-jeuRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
</div>
`;

function alExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="al-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="al-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-algebre-6e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Résoudre un problème avec un schéma en barres »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Je représente la quantité inconnue par une barre.</span><span class="we-comment">1. On choisit l'inconnue (la plus petite part, souvent).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">J'écris ce que valent les barres ensemble, puis je retire ce qui dépasse.</span><span class="we-comment">2. On se ramène à des barres égales.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Je divise par le nombre de barres, puis je calcule chaque part.</span><span class="we-comment">3. On trouve la valeur d'une barre.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Je vérifie avec l'énoncé et je réponds par une phrase.</span><span class="we-comment">4. On contrôle le total.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${alExo(1, 'Deux frères ont 26 ans à eux deux. L\'aîné a 4 ans de plus que le cadet. Quel âge a chacun ?', [
    '2 barres + 4 = 26, donc 2 barres = 22 et 1 barre = 11.', 'Le cadet a 11 ans et l\'aîné 15 ans (11 + 15 = 26).'])}
  ${alExo(2, 'Un stylo et une gomme coûtent ensemble 3,20 €. Le stylo coûte 2 € de plus que la gomme. Quel est le prix de chacun ?', [
    '2 barres + 2 = 3,20, donc 2 barres = 1,20 et 1 barre = 0,60.', 'La gomme coûte 0,60 € et le stylo 2,60 €.'])}
  ${alExo(3, 'La somme de trois nombres entiers qui se suivent est 72. Quels sont ces nombres ?', [
    'Le plus petit : 1 barre ; les suivants : 1 barre + 1 et 1 barre + 2.', '3 barres + 3 = 72, donc 3 barres = 69 et 1 barre = 23.', 'Les nombres sont 23, 24 et 25.'])}
  ${alExo(4, 'Sur une balance en équilibre, il y a 3 boîtes identiques et un poids de 2 kg d\'un côté, et un poids de 11 kg de l\'autre. Quelle est la masse d\'une boîte ?', [
    'On retire 2 kg des deux côtés : 3 boîtes = 9 kg.', 'Une boîte pèse 9 ÷ 3 = 3 kg.'])}
  ${alExo(5, 'Deux pesées : 2 cubes et 1 boule pèsent 10 kg ; 3 cubes et 1 boule pèsent 13 kg. Quelle est la masse d\'un cube ? d\'une boule ?', [
    'La 2e pesée a juste un cube de plus : 1 cube = 13 − 10 = 3 kg.', '1 boule = 10 − 2 × 3 = 4 kg.'])}
  ${alExo(6, 'Je pense à un nombre. Je le multiplie par 5, puis je retire 8. J\'obtiens 37. Quel est mon nombre ?', [
    'On fait le chemin à l\'envers : 37 + 8 = 45, puis 45 ÷ 5 = 9.', 'Le nombre est 9 (vérification : 9 × 5 − 8 = 37).'])}
  ${alExo(7, 'Un rectangle a un périmètre de 30 cm. Sa longueur mesure 3 cm de plus que sa largeur. Quelles sont ses dimensions ?', [
    'Une longueur + une largeur = la moitié du périmètre : 15 cm.', '2 barres + 3 = 15, donc 1 barre = 6 : largeur 6 cm, longueur 9 cm.'])}
  ${alExo(8, 'Inès, Zoé et Lina se partagent 90 €. Zoé reçoit 10 € de plus qu\'Inès, et Lina reçoit le double de ce que reçoit Inès. Combien reçoit chacune ?', [
    'Inès : 1 barre ; Zoé : 1 barre + 10 ; Lina : 2 barres. En tout : 4 barres + 10 = 90.', '4 barres = 80, donc 1 barre = 20.', 'Inès reçoit 20 €, Zoé 30 € et Lina 40 €.'])}
</div>
`;

/* ---- Petit moteur d'étapes (cahier : une image par étape, via registerGeoStepDemo) ---- */
function alEtapes(svgId, listeId, btnId, n, dessiner, notes){
  let k = 0;
  const maj = () => {
    const s = document.getElementById(svgId); if(s) s.innerHTML = dessiner(k);
    document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
    const b = document.getElementById(btnId); if(b){ b.disabled = k >= n - 1; b.textContent = k >= n - 1 ? 'Terminé ✓' : 'Étape suivante →'; }
  };
  const demo = {
    init(){ const l = document.getElementById(listeId); if(l) l.innerHTML = notes.map((t, i) => `<div class="step-item" data-step="${i + 1}"><div class="step-num">${i + 1}</div><div>${t}</div></div>`).join(''); k = 0; maj(); },
    next(){ if(k < n - 1){ k++; maj(); } },
    reset(){ k = 0; maj(); },
    goto(i){ k = Math.max(0, Math.min(n - 1, i)); maj(); },
    steps: () => notes.map(t => ({ note: t })),
    getIdx: () => k,
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto });
  return demo;
}
const alBarresDemo = alEtapes('al-barresSvg', 'al-barresSteps', 'al-barresNext', 5, alBarres, AL_BARRES_NOTES);
const alBalDemo = alEtapes('al-balSvg', 'al-balSteps', 'al-balNext', AL_BAL_STEPS.length, k => alBalance(AL_BAL_STEPS[k].g, AL_BAL_STEPS[k].d, 0, 'albd'), AL_BAL_STEPS.map(e => e.note));

/* ---- Méthode 3 : balance à équilibrer ---- */
let alJeu = null, alJeuRaf = null, alPente = 0;
function alJeuDessin(pente, essai){
  const g = Array.from({ length: alJeu.n }, () => '¤' + (essai == null ? '?' : essai + ' kg')).concat(alJeu.b ? [alJeu.b + ' kg'] : []);
  document.getElementById('al-jeuSvg').innerHTML = alBalance(g, [alJeu.c + ' kg'], pente, 'alj');
}
function alJeuNouveau(){
  const n = 2 + Math.floor(Math.random() * 3), x = 2 + Math.floor(Math.random() * 7), b = Math.floor(Math.random() * 6);
  alJeu = { n, x, b, c: n * x + b }; alPente = 0;
  alJeuDessin(0);
  document.getElementById('al-jeuEnonce').innerHTML = `À gauche : <b>${n} boules vertes</b>${b ? ` et un poids de <b>${b} kg</b>` : ''}. À droite : <b>${alJeu.c} kg</b>.`;
  document.getElementById('al-jeuRes').textContent = '';
  document.getElementById('al-jeuVal').value = 1;
}
function alJeuEssayer(){
  const v = Number(String(document.getElementById('al-jeuVal').value).replace(',', '.'));
  if(!Number.isFinite(v) || v < 0) return;
  const gauche = alJeu.n * v + alJeu.b, droite = alJeu.c, cible = gauche > droite ? -12 : gauche < droite ? 12 : 0, depart = alPente, t0 = performance.now();
  cancelAnimationFrame(alJeuRaf);
  const f = now => { const t = Math.max(0, Math.min(1, (now - t0) / 600)); alPente = depart + (cible - depart) * (1 - Math.pow(1 - t, 3)); alJeuDessin(alPente, alNum(v)); if(t < 1) alJeuRaf = requestAnimationFrame(f); };
  alJeuRaf = requestAnimationFrame(f);
  document.getElementById('al-jeuRes').innerHTML = gauche === droite
    ? `<b style="color:${AL_VERT};">Équilibre !</b> ${alJeu.n} × ${alNum(v)}${alJeu.b ? ' + ' + alJeu.b : ''} = ${alJeu.c}. Une boule pèse <b>${alNum(v)} kg</b>.`
    : `À gauche : ${alJeu.n} × ${alNum(v)}${alJeu.b ? ' + ' + alJeu.b : ''} = ${alNum(gauche)} kg ; à droite : ${droite} kg. ${gauche > droite ? 'La gauche est <b>trop lourde</b> : essayez plus petit.' : 'La gauche est <b>trop légère</b> : essayez plus grand.'}`;
}
function alJeuIndice(){
  document.getElementById('al-jeuRes').innerHTML = alJeu.b
    ? `Retirez ${alJeu.b} kg des deux côtés : il reste ${alJeu.n} boules = ${alJeu.c - alJeu.b} kg. Puis partagez en ${alJeu.n}.`
    : `${alJeu.n} boules pèsent ${alJeu.c} kg : partagez ${alJeu.c} en ${alJeu.n}.`;
}

DEMO_REGISTRY["6e|Initiation à l'algèbre"] = {
  cours: 'cours-demo-algebre-6e', methode: 'methode-demo-algebre-6e', exos: 'exos-demo-algebre-6e', histoire: 'histoire-demo-algebre-6e',
  init: () => {
    alBarresDemo.init(); alBalDemo.init(); alJeuNouveau();
    injectCourseAddButtons(document.getElementById('cours-demo-algebre-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-algebre-6e'));
  }
};

DEMO_QUIZZES["6e|Initiation à l'algèbre"] = [
  { q: 'Deux nombres ont pour somme 20, et l\'un vaut 4 de plus que l\'autre. Le plus petit est...', opts: ['8', '10', '16'], correct: 0 },
  { q: 'Une balance est en équilibre. Si on retire 2 kg d\'un seul côté...', opts: ['elle reste en équilibre', 'elle penche'], correct: 1 },
  { q: '3 boîtes identiques + 1 kg = 13 kg. Une boîte pèse...', opts: ['4 kg', '3 kg', '12 kg'], correct: 0 },
  { q: 'Je pense à un nombre, je lui ajoute 6, j\'obtiens 15. Ce nombre est...', opts: ['21', '9', '2,5'], correct: 1 },
  { q: 'Dans un schéma en barres, les barres de même longueur représentent...', opts: ['des nombres différents', 'le même nombre inconnu'], correct: 1 },
  { q: '2 oranges + 1 melon = 1 kg et 3 oranges + 1 melon = 1,2 kg. Une orange pèse...', opts: ['0,2 kg', '0,4 kg', '1,2 kg'], correct: 0 },
  { q: 'Le mot « algèbre » vient...', opts: ['du grec', 'de l\'arabe', 'du latin'], correct: 1 },
];

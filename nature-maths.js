/* =====================================================================
   nature-maths.js -- Maths et nature : trois méthodes animées et une page Histoire.
   Demandé : « fais maintenant maths et nature » (après musique, arts, sport et cuisine).

   1. « Fabrique un flocon » (CM2 et 6e Symétrie axiale, 3e Rotation) : on dessine à main levée, le tracé
      est recopié par symétrie(s) et/ou rotation(s) : papillon (un axe), flocon (6 branches : 6 axes et
      rotations de 60°), moulin (rotations seules, 3e).
   2. « Le tournesol et l'angle d'or » (6e Angles) : chaque nouvelle graine tourne d'un même angle par
      rapport à la précédente ; 90°, 120°, 137,5°… seul l'angle d'or remplit la fleur sans trou ; spirales
      de Fibonacci (13 et 21).
   3. « Combien de poissons dans l'étang ? » (4e et 3e Probabilités) : capture, marquage, recapture ;
      proportion de poissons marqués → estimation (quatrième proportionnelle) ; fluctuation des estimations.

   Placement : <div class="na-flocon" data-modes="axe,flocon,moulin"></div>, <div class="na-tournesol"></div>,
   <div class="na-etang"></div> ; naInitTout(conteneur). NA_HISTOIRE_HTML : la page Histoire.
   ===================================================================== */
const naF = v => (+v).toFixed(1);
const naN = (v, d) => (Math.round(v * Math.pow(10, d == null ? 1 : d)) / Math.pow(10, d == null ? 1 : d)).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 1 : d });
function naDire(el, h, cls){ const m = el.querySelector('.na-msg'); if(!m) return; m.className = 'na-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }
function naPoint(svg, e){ const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [q.x, q.y]; }

/* =====================================================================
   1. Fabrique un flocon
   ===================================================================== */
const NA_MODES = {
  axe: { nom: 'Papillon', sous: '1 axe de symétrie', tr: ['', 'scale(-1,1)'], axes: [90],
    expl: 'Ce que tu dessines d\'un côté est recopié de l\'autre côté par <b>symétrie axiale</b> : l\'axe (en pointillés) est comme un miroir, ou comme le pli d\'une feuille. Les ailes d\'un papillon sont symétriques.' },
  flocon: { nom: 'Flocon', sous: '6 branches', tr: [0, 1, 2, 3, 4, 5].flatMap(k => [`rotate(${60 * k})`, `rotate(${60 * k}) scale(-1,1)`]), axes: [90, 60, 30, 0, -30, -60],
    expl: 'Ton tracé est recopié <b>12 fois</b> : un flocon de neige a <b>6 axes de symétrie</b> (en pointillés), et il revient sur lui-même quand on le fait tourner de 60° (un sixième de tour).' },
  moulin: { nom: 'Moulin', sous: 'rotations seules', tr: [0, 1, 2, 3, 4, 5].map(k => `rotate(${60 * k})`), axes: [],
    expl: 'Ici, ton tracé est recopié par <b>rotations</b> de 60°, 120°, 180°, 240° et 300° autour du centre, sans symétrie axiale : la figure « tourne » comme un moulin à vent ou une hélice, et n\'a en général <b>aucun axe de symétrie</b>.' } };
const NA_COULEURS = ['#2F6FB3', '#7A4FC0', '#1E8A6E', '#D3302F'];
function naFloconMonter(el){
  const modes = (el.dataset.modes || 'axe,flocon').split(',').filter(k => NA_MODES[k]);
  const st = { m: modes[modes.length > 1 ? 1 : 0], traits: [], cour: null, c: 0 };
  el.innerHTML = `<div class="na-box">
    <div class="na-chips">${modes.map(k => `<button type="button" data-m="${k}"><b>${NA_MODES[k].nom}</b><small>${NA_MODES[k].sous}</small></button>`).join('')}
      <span class="na-coul">${NA_COULEURS.map((c, i) => `<button type="button" data-c="${i}" style="background:${c}" aria-label="Couleur ${i + 1}"></button>`).join('')}</span></div>
    <div class="na-consigne">Dessine avec la souris (ou le doigt) <b>n'importe où</b> : ton tracé est recopié aussitôt.</div>
    <svg class="na-svg na-dessin" viewBox="0 0 400 400"></svg>
    <div class="na-msg" aria-live="polite"></div>
    <div class="na-actions"><button type="button" class="btn secondary" data-a="annuler"><span class="gicon">undo</span> Annuler</button>
      <button type="button" class="btn secondary" data-a="effacer"><span class="gicon">delete</span> Tout effacer</button>
      <button type="button" class="btn" data-a="exemple"><span class="gicon">ac_unit</span> Un exemple</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.na-svg');
  const chemin = t => 'M' + t.pts.map(p => naF(p[0]) + ',' + naF(p[1])).join(' L');
  function dessiner(){
    const M = NA_MODES[st.m];
    let h = `<rect width="400" height="400" fill="${st.m === 'axe' ? '#F6FAF2' : '#EEF5FB'}"/><g transform="translate(200,200)">`;
    M.axes.forEach(a => { const r = Math.PI * a / 180; h += `<line x1="${naF(-195 * Math.cos(r))}" y1="${naF(-195 * Math.sin(r))}" x2="${naF(195 * Math.cos(r))}" y2="${naF(195 * Math.sin(r))}" stroke="#D3302F" stroke-width="1" stroke-dasharray="5 4" opacity=".55"/>`; });
    if(st.m !== 'axe') h += `<circle r="3" fill="#D3302F" opacity=".6"/>`;
    st.traits.concat(st.cour ? [st.cour] : []).forEach(t => { if(t.pts.length < 2) return; const d = chemin(t);
      M.tr.forEach(tr => { h += `<path d="${d}" transform="${tr}" fill="none" stroke="${NA_COULEURS[t.c]}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`; }); });
    svg.innerHTML = h + '</g>';
  }
  function choisir(m){ st.m = m; el.querySelectorAll('[data-m]').forEach(b => b.classList.toggle('on', b.dataset.m === m)); naDire(el, NA_MODES[m].expl); dessiner(); }
  svg.addEventListener('pointerdown', e => { const p = naPoint(svg, e); st.cour = { c: st.c, pts: [[p[0] - 200, p[1] - 200]] }; svg.setPointerCapture(e.pointerId); });
  svg.addEventListener('pointermove', e => { if(!st.cour) return; const p = naPoint(svg, e), q = [p[0] - 200, p[1] - 200], l = st.cour.pts[st.cour.pts.length - 1]; if(Math.hypot(q[0] - l[0], q[1] - l[1]) > 2.5){ st.cour.pts.push(q); dessiner(); } });
  svg.addEventListener('pointerup', () => { if(st.cour && st.cour.pts.length > 1) st.traits.push(st.cour); st.cour = null; dessiner(); });
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => choisir(b.dataset.m));
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { st.c = +b.dataset.c; el.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === b)); });
  $('[data-a="annuler"]').onclick = () => { st.traits.pop(); dessiner(); };
  $('[data-a="effacer"]').onclick = () => { st.traits = []; dessiner(); };
  $('[data-a="exemple"]').onclick = () => {
    // Une branche de flocon dessinée dans un douzième (entre l'axe vertical et l'axe à 60°).
    st.traits = [{ c: 0, pts: [[0, -10], [0, -170]] }, { c: 0, pts: [[0, -60], [22, -86]] }, { c: 0, pts: [[0, -100], [30, -136]] }, { c: 1, pts: [[0, -140], [16, -158]] }, { c: 2, pts: [[0, -30], [14, -36], [14, -50], [0, -56]] }];
    if(st.m === 'axe') st.traits = [{ c: 3, pts: [[-6, -60], [-60, -140], [-140, -120], [-120, -40], [-6, -10]] }, { c: 1, pts: [[-6, 10], [-90, 30], [-110, 110], [-40, 120], [-6, 40]] }, { c: 0, pts: [[-70, -100], [-90, -80], [-70, -70]] }];
    dessiner();
  };
  el.querySelector(`[data-c="0"]`).classList.add('on');
  choisir(st.m);
}

/* =====================================================================
   2. Le tournesol et l'angle d'or
   ===================================================================== */
const NA_OR = 360 * (1 - (Math.sqrt(5) - 1) / 2); // 137,507…°
const NA_PRESETS = [[90, 'un quart de tour : les graines s\'alignent sur 4 rayons, il reste d\'énormes trous.'], [120, 'un tiers de tour : 3 rayons, la fleur est presque vide.'], [144, 'deux cinquièmes de tour : 5 rayons.'], [137, 'presque l\'angle d\'or… mais au loin, des rayons apparaissent.'], [NA_OR, 'l\'angle d\'or : les graines ne s\'alignent jamais, elles remplissent la fleur sans laisser de trou.']];
function naTournesolMonter(el){
  const st = { a: 90, n: 0, raf: 0, spir: false };
  el.innerHTML = `<div class="na-box">
    <div class="na-consigne">Un tournesol fabrique ses graines <b>une à une</b>, au centre : chaque nouvelle graine tourne d'un <b>même angle</b> par rapport à la précédente, puis toutes s'écartent un peu. Quel angle la nature a-t-elle choisi ?</div>
    <div class="na-chips">${NA_PRESETS.map(([a], i) => `<button type="button" data-p="${i}">${i === NA_PRESETS.length - 1 ? '137,5° (angle d\'or)' : naN(a) + '°'}</button>`).join('')}</div>
    <div class="na-curseur"><input type="range" min="60" max="180" step=".1" value="90" aria-label="Angle entre deux graines"><b class="na-ang"></b></div>
    <svg class="na-svg" viewBox="0 0 400 400"></svg>
    <div class="na-msg" aria-live="polite"></div>
    <div class="na-actions"><button type="button" class="btn" data-a="pousse" style="background:#B7791F;"><span class="gicon">local_florist</span> Faire pousser</button>
      <label class="na-case"><input type="checkbox" data-a="spir"> colorer les spirales</label></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.na-svg'), N = 420;
  function dessiner(){
    let h = `<rect width="400" height="400" fill="#FFF8E6"/><circle cx="200" cy="200" r="190" fill="#F2C230"/><circle cx="200" cy="200" r="${naF(9 * Math.sqrt(N) + 8)}" fill="#6B4A22"/>`;
    const ar = st.a * Math.PI / 180;
    for(let k = 0; k < st.n; k++){
      const r = 9 * Math.sqrt(k + .5), t = k * ar, x = 200 + r * Math.cos(t), y = 200 + r * Math.sin(t);
      const c = st.spir ? (k % 21 === 0 ? '#D3302F' : k % 13 === 0 ? '#2F6FB3' : '#F5E6C8') : '#F5E6C8';
      h += `<circle cx="${naF(x)}" cy="${naF(y)}" r="${naF(3.2 + k / N * 1.6)}" fill="${c}" stroke="#3A2610" stroke-width=".6"/>`;
    }
    svg.innerHTML = h;
    $('.na-ang').textContent = 'angle entre deux graines : ' + naN(st.a, 1) + '°';
  }
  function pousser(){
    cancelAnimationFrame(st.raf); st.n = 0; const t0 = performance.now();
    const pas = now => { st.n = Math.min(N, Math.floor((now - t0) / 6)); dessiner(); if(st.n < N) st.raf = requestAnimationFrame(pas); else commenter(); };
    st.raf = requestAnimationFrame(pas);
  }
  function commenter(){
    const p = NA_PRESETS.find(([a]) => Math.abs(a - st.a) < .06);
    naDire(el, p ? `<b>${naN(st.a, 1)}°</b>, c'est ${p[1]}` + (Math.abs(st.a - NA_OR) < .06 ? ` C'est l'angle des vrais tournesols : 360° × 0,382 ≈ 137,5°. Coche « colorer les spirales » : on voit des spirales qui tournent dans un sens et dans l'autre, et leurs nombres (13, 21, 34, 55…) sont des <b>nombres de Fibonacci</b>.` : '')
      : `Avec ${naN(st.a, 1)}°, regarde : des rayons ou des trous apparaissent-ils ? Essaie de trouver l'angle qui remplit le mieux la fleur.`, p && Math.abs(st.a - NA_OR) < .06 ? 'ok' : '');
  }
  el.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { st.a = NA_PRESETS[+b.dataset.p][0]; $('input[type=range]').value = st.a; el.querySelectorAll('[data-p]').forEach(x => x.classList.toggle('on', x === b)); pousser(); });
  $('input[type=range]').oninput = e => { st.a = +e.target.value; el.querySelectorAll('[data-p]').forEach(x => x.classList.remove('on')); st.n = N; dessiner(); commenter(); };
  $('[data-a="pousse"]').onclick = pousser;
  $('[data-a="spir"]').onchange = e => { st.spir = e.target.checked; dessiner(); };
  st.n = N; dessiner(); naDire(el, 'Clique sur un angle : les graines poussent une à une. Commence par 90°.');
}

/* =====================================================================
   3. Combien de poissons dans l'étang ? (capture - recapture)
   ===================================================================== */
function naEtangMonter(el){
  const st = { N: 0, poissons: [], etape: 0, c1: 40, c2: 50, prise: [], m: 0, ests: [], tick: 0 };
  el.innerHTML = `<div class="na-box">
    <div class="na-consigne">Les biologistes veulent savoir combien de poissons vivent dans un étang… sans pouvoir tous les pêcher. Leur méthode : <b>pêcher, marquer, relâcher, puis repêcher</b>.</div>
    <svg class="na-svg" viewBox="0 0 640 300"></svg>
    <div class="na-etapes"></div>
    <div class="na-msg" aria-live="polite"></div>
    <div class="na-ests"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.na-svg');
  const dansEtang = (x, y) => Math.pow((x - 320) / 290, 2) + Math.pow((y - 150) / 125, 2) < 1;
  function nouveau(){
    st.N = 150 + Math.floor(Math.random() * 251); st.etape = 0; st.prise = []; st.m = 0;
    st.poissons = [...Array(st.N)].map(() => { let x, y; do { x = 40 + Math.random() * 560; y = 30 + Math.random() * 240; } while(!dansEtang(x, y)); const a = Math.random() * 2 * Math.PI; return { x, y, vx: Math.cos(a) * .6, vy: Math.sin(a) * .35, marque: false }; });
    etapes();
  }
  function dessiner(){
    let h = `<rect width="640" height="300" fill="#DDEFD2"/><ellipse cx="320" cy="150" rx="296" ry="131" fill="#7FB0D9"/><ellipse cx="320" cy="150" rx="290" ry="125" fill="#9CC6E8"/>`;
    const pris = new Set(st.prise);
    st.poissons.forEach((p, i) => {
      const dir = p.vx >= 0 ? 1 : -1, c = p.marque ? '#E67E22' : '#4E6E8E';
      h += `<g transform="translate(${naF(p.x)},${naF(p.y)}) scale(${dir},1)"><ellipse rx="6" ry="3" fill="${c}"/><path d="M-5,0 l-5,-3.5 v7 Z" fill="${c}"/>${pris.has(i) ? '<circle r="9" fill="none" stroke="#D3302F" stroke-width="1.6"/>' : ''}</g>`;
    });
    svg.innerHTML = h;
  }
  function bouger(){ // les poissons nagent (mélange de l'étang)
    st.poissons.forEach(p => { p.x += p.vx; p.y += p.vy; if(!dansEtang(p.x, p.y)){ p.vx = -p.vx + (Math.random() - .5) * .3; p.vy = -p.vy + (Math.random() - .5) * .3; p.x += 2 * p.vx; p.y += 2 * p.vy; } if(Math.random() < .01){ const a = Math.random() * 2 * Math.PI; p.vx = Math.cos(a) * .6; p.vy = Math.sin(a) * .35; } });
    dessiner();
  }
  const tirage = k => { const idx = [...st.poissons.keys()]; for(let i = idx.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } return idx.slice(0, k); };
  function etapes(){
    const e = $('.na-etapes');
    const btn = (a, t, ic, coul) => `<button type="button" class="btn" data-a="${a}"${coul ? ` style="background:${coul};"` : ''}><span class="gicon">${ic}</span> ${t}</button>`;
    if(st.etape === 0){ e.innerHTML = btn('peche1', `Pêche 1 : attraper ${st.c1} poissons et les marquer`, 'phishing'); naDire(el, 'Combien de poissons y a-t-il ? Trop nombreux pour les compter un par un…'); }
    if(st.etape === 1){ e.innerHTML = btn('melange', 'Les relâcher et attendre qu\'ils se mélangent', 'water'); }
    if(st.etape === 2){ e.innerHTML = btn('peche2', `Pêche 2 : attraper ${st.c2} poissons`, 'phishing'); }
    if(st.etape === 3){ e.innerHTML = `<span>Dans la 2e pêche, <b>${st.m}</b> poissons sur ${st.c2} sont marqués. Ton estimation du nombre total de poissons : <input type="number" min="1" data-a="est" style="width:80px;"> </span>` + btn('verif', 'Vérifier', 'task_alt') + ' <button type="button" class="btn secondary" data-a="aide"><span class="gicon">calculate</span> Le calcul</button>'; }
    if(st.etape === 4){ e.innerHTML = btn('nouveau', 'Un autre étang', 'refresh', '#1E8A6E') + ' <button type="button" class="btn secondary" data-a="encore"><span class="gicon">phishing</span> Refaire la pêche 2 ici</button>'; }
    e.querySelectorAll('[data-a]').forEach(b => b.onclick = () => action(b.dataset.a));
  }
  function calcul(){
    const est = st.c1 * st.c2 / st.m;
    return `<b>Le raisonnement :</b> les poissons se sont bien mélangés, donc la <b>proportion</b> de poissons marqués est (à peu près) la même dans la pêche 2 que dans tout l'étang.
      <table class="na-tab"><tr><th></th><th>poissons marqués</th><th>poissons en tout</th></tr><tr><th>pêche 2</th><td>${st.m}</td><td>${st.c2}</td></tr><tr><th>étang</th><td>${st.c1}</td><td><b>N</b></td></tr></table>
      C'est une situation de proportionnalité : N = ${st.c1} × ${st.c2} ÷ ${st.m} ≈ <b>${naN(est, 0)}</b> poissons.`;
  }
  function action(a){
    if(a === 'peche1'){ st.prise = tirage(st.c1); dessiner(); setTimeout(() => { st.prise.forEach(i => { st.poissons[i].marque = true; }); dessiner(); naDire(el, `${st.c1} poissons pêchés ont reçu une <b>marque orange</b>.`); st.etape = 1; etapes(); }, 700); }
    if(a === 'melange'){ st.prise = []; let n = 0; const id = setInterval(() => { bouger(); if(++n > 110){ clearInterval(id); st.etape = 2; etapes(); naDire(el, 'Les poissons marqués se sont mélangés aux autres.'); } }, 30); }
    if(a === 'peche2' || a === 'encore'){ st.prise = tirage(st.c2); st.m = st.prise.filter(i => st.poissons[i].marque).length; if(!st.m){ st.prise = tirage(st.c2); st.m = Math.max(1, st.prise.filter(i => st.poissons[i].marque).length); } dessiner(); st.etape = 3; etapes(); naDire(el, `Les poissons de la 2e pêche sont entourés en rouge : compte les orange parmi eux !`); }
    if(a === 'aide'){ naDire(el, calcul()); }
    if(a === 'verif'){
      const g = parseFloat($('[data-a="est"]').value), est = st.c1 * st.c2 / st.m;
      const ok = isFinite(g) && Math.abs(g - est) <= Math.max(3, est * .03);
      st.ests.push(est);
      naDire(el, (ok ? '<span class="gicon">celebration</span> Bon calcul ! ' : '<span class="gicon">info</span> ') + calcul() + `<br>Le vrai nombre de poissons était <b>${st.N}</b> : l'estimation est ${Math.abs(est - st.N) / st.N < .1 ? 'très proche' : 'du bon ordre de grandeur'} (écart de ${naN(Math.abs(est - st.N) / st.N * 100, 0)} %). Une autre pêche donnerait une estimation un peu différente : c'est la <b>fluctuation d'échantillonnage</b>.`, ok ? 'ok' : 'ko');
      $('.na-ests').innerHTML = st.ests.length > 1 ? `Tes estimations successives : ${st.ests.map(v => naN(v, 0)).join(' ; ')}` : '';
      st.etape = 4; etapes();
    }
    if(a === 'nouveau'){ st.ests = []; $('.na-ests').innerHTML = ''; nouveau(); dessiner(); }
  }
  nouveau(); dessiner();
}

/* ---------- Construction ---------- */
function naInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.na-flocon').forEach(naFloconMonter);
  racine.querySelectorAll('.na-tournesol').forEach(naTournesolMonter);
  racine.querySelectorAll('.na-etang').forEach(naEtangMonter);
}

/* =====================================================================
   Onglet Histoire « Maths et nature » (sans fraction écrite : lisible du CM2 à la 3e)
   ===================================================================== */
const NA_HISTOIRE_HTML = `
<div class="history-box na-hist">
  <div class="history-title"><span class="gicon">eco</span> Maths et nature : les formes du vivant</div>

  <h4 class="na-hist-h">Les lapins de Fibonacci et les spirales des fleurs</h4>
  <p>En 1202, l'Italien <b>Fibonacci</b> pose un petit problème : un couple de lapins donne naissance chaque mois à un nouveau couple, qui se reproduit à son tour dès son deuxième mois. Combien de couples au bout d'un an ? Les nombres de couples forment la suite <b>1, 1, 2, 3, 5, 8, 13, 21, 34, 55…</b> : chaque nombre est la somme des deux précédents. Surprise : on retrouve ces nombres partout dans les plantes. Sur une pomme de pin, on compte souvent 8 spirales dans un sens et 13 dans l'autre ; sur un tournesol, 34 et 55. C'est la conséquence de l'<b>angle d'or</b> (environ 137,5°) entre deux graines successives.</p>

  <h4 class="na-hist-h">Kepler et le flocon à six branches (1611)</h4>
  <p>Pour le Nouvel An 1611, l'astronome <b>Johannes Kepler</b> offre à un ami un petit livre : <i>L'étrenne, ou la neige à six angles</i>. Il s'y demande pourquoi tous les flocons de neige ont <b>six branches</b>. Il faudra attendre le 20e siècle et l'étude des cristaux pour le comprendre : les molécules d'eau de la glace s'assemblent en hexagones. Chaque flocon a ainsi 6 axes de symétrie… et pourtant, comme l'a montré l'Américain <b>Wilson Bentley</b>, qui en a photographié plus de 5 000 à partir de 1885, deux flocons ne sont jamais tout à fait identiques.</p>

  <h4 class="na-hist-h">Les abeilles, championnes de géométrie</h4>
  <p>Pourquoi les alvéoles des ruches sont-elles des <b>hexagones</b> ? Le savant grec <b>Pappus d'Alexandrie</b>, au 4e siècle, parlait déjà de la « sagacité des abeilles » : avec des hexagones, on pave tout le plan sans laisser de trou, en utilisant le moins de cire possible pour une même surface. Ce n'est qu'en <b>1999</b> que le mathématicien américain <b>Thomas Hales</b> a démontré que l'hexagone est vraiment la meilleure solution.</p>

  <h4 class="na-hist-h">Compter les poissons sans les pêcher tous</h4>
  <p>Vers 1890, le biologiste danois <b>Carl Petersen</b> marque des poissons (des plies) pour étudier leurs déplacements, et comprend qu'il peut aussi <b>estimer leur nombre</b> par proportionnalité : c'est la méthode de <b>capture-recapture</b>. Un siècle plus tôt, <b>Laplace</b> avait déjà utilisé une idée semblable pour estimer la population de la France à partir des naissances. Aujourd'hui, on compte ainsi les oiseaux, les papillons, les loups… ou les ours, grâce à des poils laissés sur des barbelés.</p>

  <h4 class="na-hist-h">Les fractales : le chou romanesco et la fougère</h4>
  <p>Regarde un <b>chou romanesco</b> : chaque petite pointe est une copie réduite du chou entier, elle-même faite de pointes encore plus petites. Une <b>feuille de fougère</b> aussi est faite de petites feuilles qui lui ressemblent. En 1975, le mathématicien <b>Benoît Mandelbrot</b> appelle ces formes des <b>fractales</b>. Il pose une question étonnante : quelle est la longueur de la côte de la Bretagne ? Plus on la mesure finement, en suivant chaque rocher, plus elle est longue !</p>

  <div class="na-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Ramasse une pomme de pin (ou regarde le cœur d'un tournesol, d'une marguerite, d'un ananas). Avec un feutre, suis une spirale de la base jusqu'au sommet, puis compte combien il y en a qui tournent dans ce sens. Compte ensuite celles qui tournent dans l'autre sens. Trouves-tu deux nombres de Fibonacci, comme 8 et 13 ?</div>
</div>`;

(function naStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .na-box{ display:flex; flex-direction:column; gap:10px; }
    .na-chips{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; justify-content:center; }
    .na-chips button{ border:1.5px solid rgba(30,123,52,.3); background:#fff; color:#1E5E30; border-radius:12px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; display:inline-flex; flex-direction:column; align-items:center; line-height:1.2; }
    .na-chips button small{ font-weight:400; font-size:.74rem; opacity:.85; }
    .na-chips button.on{ background:#1E5E30; color:#fff; border-color:#1E5E30; }
    .na-coul{ display:inline-flex; gap:5px; margin-left:10px; } .na-coul button{ width:24px; height:24px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 1px #9AA5B4; padding:0; cursor:pointer; } .na-coul button.on{ box-shadow:0 0 0 2.5px #1C1B2E; }
    .na-consigne{ font-size:.95rem; line-height:1.55; }
    .na-svg{ width:100%; max-width:640px; display:block; margin:0 auto; border-radius:12px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .na-dessin{ max-width:420px; cursor:crosshair; touch-action:none; user-select:none; }
    .na-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.55; } .na-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .na-msg.ok{ color:#1E5E30; } .na-msg.ko{ color:#9A3A12; }
    .na-actions, .na-etapes{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .na-curseur{ display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; } .na-curseur input{ width:min(360px,90%); }
    .na-ang{ font:600 .9rem 'JetBrains Mono',monospace; }
    .na-case{ display:inline-flex; align-items:center; gap:5px; font-size:.88rem; color:#4E5665; }
    .na-tab{ margin:8px auto; border-collapse:collapse; font-size:.9rem; } .na-tab th, .na-tab td{ border:1px solid #CFE0C8; padding:3px 12px; text-align:center; } .na-tab th{ background:#EEF6EA; }
    .na-ests{ text-align:center; font-size:.88rem; color:#4E5665; }
    .na-hist p{ margin:6px 0 10px; line-height:1.6; }
    .na-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#1E5E30; margin:16px 0 4px; }
    .na-hist-a-toi{ margin-top:14px; background:#E9F5EC; border:1px solid #B6DDBF; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .na-hist-a-toi .gicon{ color:#1E7B34; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

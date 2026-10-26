/* =====================================================================
   sport-maths.js -- Maths et sport : trois méthodes animées et une page Histoire.
   Demandé : « fais maintenant maths et sport » (à la suite de « maths et musique » et « maths et arts »).

   1. « La piste d'athlétisme » (6e, Aire et périmètre) : pourquoi les départs du 400 m sont décalés ;
      longueur d'un tour de couloir = 2 lignes droites + un cercle (2 × π × r) ; course animée, départs
      alignés ou décalés.
   2. « Cours contre Usain Bolt » (4e Proportionnalité, 3e Grandeurs composées) : course de 100 m animée
      (Bolt, Florence Griffith-Joyner, toi, un guépard, un piéton), graphique distance-durée (droites :
      proportionnalité, la vitesse est le coefficient), vitesses en m/s et en km/h.
   3. « Qui sélectionner ? » (5e, 4e, 3e Statistiques) : trois sauteurs en longueur, six sauts chacun ;
      selon l'épreuve, on choisit avec le meilleur saut, la moyenne, la médiane ou l'étendue… et ce n'est
      jamais le même !

   Placement : <div class="sp-piste"></div>, <div class="sp-bolt"></div>,
   <div class="sp-stats" data-crit="max,moyenne,mediane,etendue"></div> ; spInitTout(conteneur) à
   l'ouverture du chapitre. SP_HISTOIRE_HTML : la page Histoire (ajoutée par les chapitres).
   ===================================================================== */
const spF = v => (+v).toFixed(1);
const spV = (v, d) => (Math.round(v * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 2 : d });
const spTxt = (x, y, t, o) => { o = o || {}; return `<text x="${spF(x)}" y="${spF(y)}" text-anchor="${o.a || 'middle'}" font-family="${o.f || 'Inter,sans-serif'}" font-size="${o.s || 11}" font-weight="${o.b ? 700 : 400}" fill="${o.c || '#1C1B2E'}">${t}</text>`; };
function spBoite(el, html){ el.innerHTML = `<div class="sp-box">${html}</div>`; return s => el.querySelector(s); }
function spDire(el, h, cls){ const m = el.querySelector('.sp-msg'); if(!m) return; m.className = 'sp-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }

/* =====================================================================
   1. La piste d'athlétisme
   ===================================================================== */
// Piste réglementaire (simplifiée) : lignes droites de 84,39 m ; rayon du couloir 1 : 36,8 m (on court à
// 30 cm de la bordure) ; couloirs de 1,22 m.
const SP_P = { droite: 84.39, r1: 36.8, larg: 1.22, n: 6, s: 3.3, cx: 320, cy: 158 };
const spRayon = k => SP_P.r1 + SP_P.larg * (k - 1);
const spTour = k => 2 * SP_P.droite + 2 * Math.PI * spRayon(k);
const SP_COUL = ['#D3302F', '#2F6FB3', '#1E8A6E', '#E67E22', '#7A4FC0', '#B7791F'];
// Position (en px) d'un coureur du couloir k, à la distance d (m) de la ligne d'arrivée, dans le sens de la
// course (sens inverse des aiguilles d'une montre) : virage de droite, ligne opposée, virage de gauche,
// ligne d'arrivée.
function spPos(k, d){
  const { droite, s, cx, cy } = SP_P, r = spRayon(k), L = spTour(k), xR = cx + droite / 2 * s, xL = cx - droite / 2 * s;
  d = ((d % L) + L) % L;
  if(d < Math.PI * r){ const t = Math.PI / 2 - d / r; return [xR + r * s * Math.cos(t), cy + r * s * Math.sin(t)]; }
  d -= Math.PI * r;
  if(d < droite) return [xR - d * s, cy - r * s];
  d -= droite;
  if(d < Math.PI * r){ const t = -Math.PI / 2 - d / r; return [xL + r * s * Math.cos(t), cy + r * s * Math.sin(t)]; }
  d -= Math.PI * r;
  return [xL + d * s, cy + r * s];
}
function spPisteFond(){
  const { droite, s, cx, cy, n, larg } = SP_P, xR = cx + droite / 2 * s, xL = cx - droite / 2 * s;
  const ovale = r => `M${spF(xL)},${spF(cy - r * s)} H${spF(xR)} A${spF(r * s)},${spF(r * s)} 0 0 1 ${spF(xR)},${spF(cy + r * s)} H${spF(xL)} A${spF(r * s)},${spF(r * s)} 0 0 1 ${spF(xL)},${spF(cy - r * s)} Z`;
  const rIn = SP_P.r1 - .3, rOut = rIn + n * larg;
  let h = `<rect width="640" height="320" fill="#E8F1E4"/><path d="${ovale(rOut + 1.5)}" fill="#C0533E"/><path d="${ovale(rIn)}" fill="#7DB86A"/>`;
  for(let k = 0; k <= n; k++) h += `<path d="${ovale(rIn + k * larg)}" fill="none" stroke="#fff" stroke-width="${k === 0 || k === n ? 1.6 : 1}"/>`;
  h += `<rect x="${spF(xL + 40)}" y="${spF(cy - 22)}" width="${spF((xR - xL) - 80)}" height="44" rx="6" fill="none" stroke="#fff" stroke-width="1.4"/>`;
  h += `<line x1="${spF(xR)}" y1="${spF(cy + rIn * s)}" x2="${spF(xR)}" y2="${spF(cy + rOut * s)}" stroke="#fff" stroke-width="3"/>` + spTxt(xR, cy + rOut * s + 13, 'arrivée', { b: true, c: '#1C1B2E' });
  return h;
}
function spPisteMonter(el){
  const st = { decale: true, raf: 0, t: 0, fini: false };
  const $ = spBoite(el, `
    <div class="sp-chips"><button type="button" data-m="0">Départs alignés</button><button type="button" data-m="1" class="on">Départs décalés</button></div>
    <div class="sp-consigne">Six coureurs, aussi rapides les uns que les autres, font <b>un tour de piste</b> (400 m), chacun dans son couloir. Compare les départs alignés et les départs décalés, puis lance la course.</div>
    <svg class="sp-svg" viewBox="0 0 640 320"></svg>
    <div class="sp-msg" aria-live="polite"></div>
    <div class="sp-actions"><button type="button" class="btn" data-a="go"><span class="gicon">sports_score</span> Partez !</button><button type="button" class="btn secondary" data-a="calc"><span class="gicon">calculate</span> Les calculs</button></div>
    <div class="sp-calc" hidden></div>`);
  const svg = $('.sp-svg');
  // Départ du couloir k : à (tour du couloir − 400 m) devant la ligne d'arrivée si les départs sont décalés.
  const depart = k => st.decale ? spTour(k) - 400 : 0;
  const parcours = k => st.decale ? 400 : spTour(k);
  function dessiner(t){ // t : temps de course en secondes (tous courent à 8 m/s)
    let h = spPisteFond();
    for(let k = 1; k <= SP_P.n; k++){
      const d0 = depart(k), P0 = spPos(k, d0), fait = Math.min(parcours(k), 8 * t), P = spPos(k, d0 + fait);
      h += `<line x1="${spF(P0[0] - 5)}" y1="${spF(P0[1])}" x2="${spF(P0[0] + 5)}" y2="${spF(P0[1])}" stroke="${SP_COUL[k - 1]}" stroke-width="2.5" transform="rotate(0)"/>`;
      h += `<circle cx="${spF(P[0])}" cy="${spF(P[1])}" r="6.5" fill="${SP_COUL[k - 1]}" stroke="#fff" stroke-width="1.5"/>` + spTxt(P[0], P[1] + 3.5, k, { s: 8.5, b: true, c: '#fff' });
    }
    svg.innerHTML = h;
  }
  function courir(){
    cancelAnimationFrame(st.raf); spDire(el, '');
    const fin = Math.max(...[1, 2, 3, 4, 5, 6].map(k => parcours(k))) / 8, t0 = performance.now(), acc = 7; // film accéléré 7 fois
    const pas = now => {
      const t = Math.min(fin, (now - t0) / 1000 * acc); dessiner(t);
      if(t < fin) st.raf = requestAnimationFrame(pas);
      else spDire(el, st.decale
        ? '<span class="gicon">celebration</span> Tous les coureurs arrivent <b>en même temps</b> : chacun a couru exactement 400 m. Le décalage compense les virages, plus longs à l\'extérieur.'
        : `<span class="gicon">info</span> Le coureur du couloir 1 gagne… mais c'est injuste : celui du couloir 6 a couru <b>${spV(spTour(6) - 400, 1)} m de plus</b>, car son virage est plus large.`, st.decale ? 'ok' : 'ko');
    };
    st.raf = requestAnimationFrame(pas);
  }
  function calculs(){
    const lignes = [1, 2, 3, 4, 5, 6].map(k => `<tr><td style="color:${SP_COUL[k - 1]};font-weight:700;">${k}</td><td>${spV(spRayon(k))} m</td><td>2 × 84,39 + 2 × π × ${spV(spRayon(k))} ≈ <b>${spV(spTour(k))} m</b></td><td>${k === 1 ? '—' : spV(spTour(k) - spTour(1)) + ' m'}</td></tr>`).join('');
    return `Un tour de couloir = <b>deux lignes droites</b> de 84,39 m + <b>deux demi-cercles</b>, qui font ensemble <b>un cercle entier</b> de longueur 2 × π × rayon.
      <table class="sp-tab"><tr><th>couloir</th><th>rayon du virage</th><th>longueur du tour</th><th>de plus que le couloir 1</th></tr>${lignes}</table>
      D'un couloir au suivant, le rayon augmente de 1,22 m, donc le tour s'allonge de 2 × π × 1,22 ≈ <b>7,67 m</b> : on <b>avance</b> le départ de chaque couloir d'environ 7,67 m par rapport au couloir précédent. (Sur une vraie piste, les mesures officielles tiennent compte de quelques détails : le décalage est d'environ 7 m.)`;
  }
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { cancelAnimationFrame(st.raf); st.decale = b.dataset.m === '1'; el.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); dessiner(0); spDire(el, st.decale ? 'Les départs sont décalés : le coureur du couloir 6 part loin devant… est-ce juste ?' : 'Tous les coureurs partent de la ligne d\'arrivée. Qui va gagner ?'); });
  $('[data-a="go"]').onclick = courir;
  $('[data-a="calc"]').onclick = () => { const c = $('.sp-calc'); c.hidden = !c.hidden; c.innerHTML = calculs(); };
  dessiner(0); spDire(el, 'Les départs sont décalés : le coureur du couloir 6 part loin devant… est-ce juste ?');
}

/* =====================================================================
   2. Cours contre Usain Bolt (100 m)
   ===================================================================== */
const SP_COUREURS = [
  { id: 'bolt', nom: 'Usain Bolt', t: 9.58, c: '#E9A21C', info: 'record du monde, Berlin 2009' },
  { id: 'flojo', nom: 'Florence Griffith-Joyner', t: 10.49, c: '#7A4FC0', info: 'record du monde, Indianapolis 1988' },
  { id: 'toi', nom: 'Toi', t: 15, c: '#D3302F', info: 'ton temps' },
  { id: 'guepard', nom: 'Un guépard', t: 3.4, c: '#B7791F', info: 'à sa vitesse de pointe, environ 30 m/s' },
  { id: 'pieton', nom: 'Un piéton', t: 72, c: '#5B6472', info: 'qui marche à 5 km/h' }];
function spBoltMonter(el){
  const st = { choix: new Set(['bolt', 'toi', 'flojo']), toi: 15, film: 1, raf: 0 };
  const $ = spBoite(el, `
    <div class="sp-consigne">Choisis les coureurs, donne <b>ton temps</b> au 100 m, puis lance la course. Chacun court à sa <b>vitesse moyenne</b> (en vrai, un sprinteur accélère au départ).</div>
    <div class="sp-chips sp-coureurs">${SP_COUREURS.map(c => `<label class="sp-cr" style="--c:${c.c}"><input type="checkbox" value="${c.id}"${st.choix.has(c.id) ? ' checked' : ''}> ${c.nom}${c.id === 'toi' ? ` <input type="number" class="sp-toi" min="7" max="90" step="0.1" value="15" aria-label="Ton temps au 100 m, en secondes"> s` : ''}</label>`).join('')}</div>
    <svg class="sp-svg" viewBox="0 0 640 210"></svg>
    <svg class="sp-svg sp-graphe" viewBox="0 0 640 250"></svg>
    <div class="sp-msg" aria-live="polite"></div>
    <div class="sp-actions"><button type="button" class="btn" data-a="go"><span class="gicon">sprint</span> Partez !</button>
      <label class="sp-case">film <select data-a="film"><option value="1">en temps réel</option><option value="3">accéléré ×3</option></select></label>
      <button type="button" class="btn secondary" data-a="calc"><span class="gicon">calculate</span> Les vitesses</button></div>
    <div class="sp-calc" hidden></div>`);
  const piste = el.querySelectorAll('.sp-svg')[0], graphe = el.querySelectorAll('.sp-svg')[1];
  const liste = () => SP_COUREURS.filter(c => st.choix.has(c.id)).map(c => Object.assign({}, c, c.id === 'toi' ? { t: st.toi } : {}));
  const X0 = 40, X1 = 600, TMAX = () => Math.min(20, Math.max(12, ...liste().map(c => c.t).filter(t => t <= 20)));
  function dessiner(t){
    const l = liste(), n = Math.max(1, l.length), hl = Math.min(36, 170 / n);
    let h = `<rect width="640" height="210" fill="#E8F1E4"/><rect x="${X0 - 10}" y="16" width="${X1 - X0 + 20}" height="${hl * n}" fill="#C0533E"/>`;
    for(let i = 0; i <= n; i++) h += `<line x1="${X0 - 10}" y1="${16 + i * hl}" x2="${X1 + 10}" y2="${16 + i * hl}" stroke="#fff" stroke-width="1"/>`;
    for(let m = 0; m <= 100; m += 10) h += `<line x1="${X0 + m * 5.6}" y1="${16 + hl * n}" x2="${X0 + m * 5.6}" y2="${22 + hl * n}" stroke="#5B6472"/>` + spTxt(X0 + m * 5.6, 34 + hl * n, m + ' m', { s: 9.5, c: '#5B6472' });
    h += `<line x1="${X0}" y1="16" x2="${X0}" y2="${16 + hl * n}" stroke="#fff" stroke-width="2.5"/><line x1="${X1}" y1="16" x2="${X1}" y2="${16 + hl * n}" stroke="#fff" stroke-width="4" stroke-dasharray="4 4"/>`;
    l.forEach((c, i) => { const d = Math.min(100, 100 * t / c.t), x = X0 + d * 5.6, y = 16 + (i + .5) * hl;
      h += `<circle cx="${spF(x)}" cy="${spF(y)}" r="${Math.min(9, hl / 2 - 2)}" fill="${c.c}" stroke="#fff" stroke-width="1.6"/>` + spTxt(x - 14, y + 4, c.nom, { a: 'end', s: 10, b: true, c: '#fff' }); });
    h += spTxt(320, 200, 'temps : ' + spV(t, 2) + ' s', { s: 13, b: true, f: 'JetBrains Mono,monospace' });
    piste.innerHTML = h;
    // Graphique distance en fonction de la durée : des droites passant par l'origine.
    const tm = TMAX(), gx = 60, gy = 220, gw = 540, gh = 190, X = s => gx + s / tm * gw, Y = d => gy - d / 100 * gh;
    let g = `<rect width="640" height="250" fill="#fff"/>`;
    for(let s = 0; s <= tm; s += 2) g += `<line x1="${spF(X(s))}" y1="${gy}" x2="${spF(X(s))}" y2="${gy - gh}" stroke="#EEF2F7"/>` + spTxt(X(s), gy + 14, s, { s: 9.5, c: '#5B6472' });
    for(let d = 0; d <= 100; d += 20) g += `<line x1="${gx}" y1="${spF(Y(d))}" x2="${gx + gw}" y2="${spF(Y(d))}" stroke="#EEF2F7"/>` + spTxt(gx - 6, Y(d) + 3, d, { a: 'end', s: 9.5, c: '#5B6472' });
    g += `<line x1="${gx}" y1="${gy}" x2="${gx + gw + 6}" y2="${gy}" stroke="#1C1B2E" stroke-width="1.4"/><line x1="${gx}" y1="${gy}" x2="${gx}" y2="${gy - gh - 6}" stroke="#1C1B2E" stroke-width="1.4"/>`
      + spTxt(gx + gw, gy + 28, 'durée (s)', { a: 'end', s: 10.5, c: '#1C1B2E' }) + spTxt(gx + 4, gy - gh - 10, 'distance (m)', { a: 'start', s: 10.5, c: '#1C1B2E' });
    l.forEach(c => { const tt = Math.min(t, c.t, tm), d = 100 * tt / c.t; if(tt > 0) g += `<line x1="${X(0)}" y1="${Y(0)}" x2="${spF(X(tt))}" y2="${spF(Y(d))}" stroke="${c.c}" stroke-width="2.6" stroke-linecap="round"/>`;
      if(t >= c.t && c.t <= tm) g += `<circle cx="${spF(X(c.t))}" cy="${spF(Y(100))}" r="3.5" fill="${c.c}"/>` + spTxt(X(c.t), Y(100) - 8, spV(c.t) + ' s', { s: 9.5, b: true, c: c.c }); });
    graphe.innerHTML = g;
  }
  function courir(){
    cancelAnimationFrame(st.raf); spDire(el, '');
    const l = liste(); if(!l.length){ spDire(el, 'Choisis au moins un coureur.', 'ko'); return; }
    const fin = Math.min(Math.max(...l.map(c => c.t)), 25), t0 = performance.now();
    const pas = now => {
      const t = Math.min(fin, (now - t0) / 1000 * st.film); dessiner(t);
      if(t < fin) { st.raf = requestAnimationFrame(pas); return; }
      const bolt = l.find(c => c.id === 'bolt'), toi = l.find(c => c.id === 'toi');
      let m = 'Sur le graphique, chaque coureur est une <b>droite qui passe par l\'origine</b> : la distance est <b>proportionnelle</b> à la durée. Plus la droite est pentue, plus le coureur est rapide : le coefficient de proportionnalité, c\'est la <b>vitesse</b>.';
      if(bolt && toi && toi.t > bolt.t) m = `Quand Usain Bolt franchit la ligne, tu n'as parcouru que <b>${spV(100 * bolt.t / toi.t, 1)} m</b>. ` + m;
      if(l.some(c => c.t > 25)) m += ' (Le piéton, lui, n\'est pas encore arrivé : il lui faut 72 s !)';
      spDire(el, m, 'ok');
    };
    st.raf = requestAnimationFrame(pas);
  }
  function calculs(){
    return `Vitesse moyenne = distance ÷ durée. Pour passer des <b>m/s</b> aux <b>km/h</b>, on multiplie par 3,6 (en 1 h = 3 600 s, on parcourt 3 600 fois plus, soit 3 600 m = 3,6 km pour chaque mètre par seconde).
      <table class="sp-tab"><tr><th>coureur</th><th>temps au 100 m</th><th>vitesse (m/s)</th><th>vitesse (km/h)</th></tr>${liste().map(c => `<tr><td style="color:${c.c};font-weight:700;">${c.nom}</td><td>${spV(c.t)} s</td><td>100 ÷ ${spV(c.t)} ≈ <b>${spV(100 / c.t)}</b></td><td>${spV(100 / c.t)} × 3,6 ≈ <b>${spV(360 / c.t, 1)}</b></td></tr>`).join('')}</table>
      En pointe (entre 60 et 80 m), Usain Bolt a atteint environ 12,4 m/s, soit près de 45 km/h.`;
  }
  el.querySelectorAll('.sp-coureurs input[type=checkbox]').forEach(c => c.onchange = () => { if(c.checked) st.choix.add(c.value); else st.choix.delete(c.value); cancelAnimationFrame(st.raf); dessiner(0); if(!$('.sp-calc').hidden) $('.sp-calc').innerHTML = calculs(); });
  $('.sp-toi').oninput = e => { const v = parseFloat(String(e.target.value).replace(',', '.')); if(v >= 5 && v <= 120){ st.toi = v; cancelAnimationFrame(st.raf); dessiner(0); if(!$('.sp-calc').hidden) $('.sp-calc').innerHTML = calculs(); } };
  $('.sp-toi').onclick = e => e.stopPropagation();
  $('[data-a="film"]').onchange = e => { st.film = +e.target.value; };
  $('[data-a="go"]').onclick = courir;
  $('[data-a="calc"]').onclick = () => { const c = $('.sp-calc'); c.hidden = !c.hidden; c.innerHTML = calculs(); };
  dessiner(0);
}

/* =====================================================================
   3. Qui sélectionner ? (saut en longueur, statistiques)
   ===================================================================== */
const SP_SAUTEURS = [
  { nom: 'Léa', c: '#2F6FB3', sauts: [6.10, 6.15, 6.05, 6.12, 6.08, 6.14] },
  { nom: 'Sami', c: '#E67E22', sauts: [5.40, 6.62, 5.55, 6.48, 5.30, 5.65] },
  { nom: 'Noé', c: '#1E8A6E', sauts: [6.30, 6.28, 6.32, 5.10, 6.26, 5.00] }];
const spM = v => (+v).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // longueur de saut : toujours deux décimales
const spLa = n => (/^[aeéiou]/i.test(n) ? 'l\'' : 'la ') + n;
const spMoy = l => l.reduce((a, b) => a + b, 0) / l.length;
const spTri = l => l.slice().sort((a, b) => a - b);
const spMed = l => { const s = spTri(l), n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const SP_CRITERES = {
  max: { titre: 'Finale du concours', q: 'En finale, <b>seul le meilleur saut compte</b>. Qui envoyer pour avoir le plus de chances de gagner ?', val: l => Math.max(...l), nom: 'meilleur saut', mieux: 'grand',
    calc: a => `meilleur saut : <b>${spM(Math.max(...a.sauts))} m</b>` },
  moyenne: { titre: 'Épreuve par équipes', q: 'Dans l\'épreuve par équipes, on <b>additionne les six sauts</b> de chaque athlète. Qui sélectionner ?', val: spMoy, nom: 'moyenne', mieux: 'grand',
    calc: a => `moyenne : (${a.sauts.map(v => spM(v)).join(' + ')}) ÷ 6 ≈ <b>${spM(spMoy(a.sauts))} m</b>` },
  mediane: { titre: 'Qualification', q: 'Pour être qualifié, <b>au moins la moitié des sauts</b> doivent atteindre 6,20 m. Qui est qualifié ?', val: spMed, nom: 'médiane', mieux: 'grand',
    calc: a => { const s = spTri(a.sauts); return `sauts rangés : ${s.map(v => spM(v)).join(' ; ')} → médiane = (${spM(s[2])} + ${spM(s[3])}) ÷ 2 = <b>${spM(spMed(a.sauts))} m</b>`; } },
  etendue: { titre: 'Le plus régulier', q: 'L\'entraîneur cherche l\'athlète <b>le plus régulier</b>, celui dont les sauts sont les plus proches les uns des autres. Qui choisir ?', val: l => Math.max(...l) - Math.min(...l), nom: 'étendue', mieux: 'petit',
    calc: a => `étendue : ${spM(Math.max(...a.sauts))} − ${spM(Math.min(...a.sauts))} = <b>${spM(Math.max(...a.sauts) - Math.min(...a.sauts))} m</b>` } };
function spStatsMonter(el){
  const crits = (el.dataset.crit || 'max,moyenne').split(',').filter(k => SP_CRITERES[k]);
  const st = { k: crits[0], rep: null, score: 0, faits: new Set() };
  const $ = spBoite(el, `
    <div class="sp-chips">${crits.map(k => `<button type="button" data-k="${k}">${SP_CRITERES[k].titre}</button>`).join('')}<span class="sp-score"></span></div>
    <div class="sp-consigne"></div>
    <svg class="sp-svg" viewBox="0 0 640 230"></svg>
    <div class="sp-sauteurs">${SP_SAUTEURS.map((a, i) => `<button type="button" data-i="${i}" style="--c:${a.c}"><span class="gicon">person</span> ${a.nom}</button>`).join('')}</div>
    <div class="sp-msg" aria-live="polite"></div>
    <div class="sp-calc" hidden></div>`);
  const svg = $('.sp-svg');
  function dessiner(){
    const y = v => 200 - (v - 4.8) / (6.8 - 4.8) * 180, bw = 22;
    let h = `<rect width="640" height="230" fill="#FBFAF6"/>`;
    for(let v = 5; v <= 6.8; v += .2) h += `<line x1="40" y1="${spF(y(v))}" x2="630" y2="${spF(y(v))}" stroke="#EEF2F7"/>` + spTxt(34, y(v) + 3, spV(v, 1), { a: 'end', s: 9.5, c: '#5B6472' });
    if(st.k === 'mediane') h += `<line x1="40" y1="${spF(y(6.2))}" x2="630" y2="${spF(y(6.2))}" stroke="#D3302F" stroke-width="1.6" stroke-dasharray="6 4"/>` + spTxt(630, y(6.2) - 5, '6,20 m', { a: 'end', s: 10, b: true, c: '#D3302F' });
    SP_SAUTEURS.forEach((a, i) => {
      const x0 = 60 + i * 195;
      a.sauts.forEach((v, j) => { const x = x0 + j * (bw + 5); h += `<rect x="${x}" y="${spF(y(v))}" width="${bw}" height="${spF(200 - y(v))}" rx="3" fill="${a.c}" fill-opacity="${st.rep != null ? .85 : .7}"/>` + spTxt(x + bw / 2, y(v) - 4, spM(v), { s: 8, c: '#1C1B2E' }); });
      h += spTxt(x0 + 3 * (bw + 5) - 2, 220, a.nom + ' : 6 sauts', { b: true, s: 11.5, c: a.c });
      if(st.rep != null){ const c = SP_CRITERES[st.k], v = c.val(a.sauts);
        if(st.k === 'max' || st.k === 'moyenne') h += `<line x1="${x0 - 4}" y1="${spF(y(v))}" x2="${x0 + 6 * (bw + 5)}" y2="${spF(y(v))}" stroke="#1C1B2E" stroke-width="2" stroke-dasharray="${st.k === 'moyenne' ? '5 3' : '0'}"/>`;
        if(st.k === 'etendue'){ const mx = Math.max(...a.sauts), mn = Math.min(...a.sauts), x = x0 + 6 * (bw + 5) + 2; h += `<line x1="${x}" y1="${spF(y(mx))}" x2="${x}" y2="${spF(y(mn))}" stroke="#1C1B2E" stroke-width="2.4"/>`; }
        if(st.k === 'mediane') h += `<line x1="${x0 - 4}" y1="${spF(y(v))}" x2="${x0 + 6 * (bw + 5)}" y2="${spF(y(v))}" stroke="#1C1B2E" stroke-width="2" stroke-dasharray="2 3"/>`;
      }
    });
    svg.innerHTML = h;
  }
  function charger(k){
    st.k = k; st.rep = null;
    el.querySelectorAll('.sp-chips [data-k]').forEach(b => b.classList.toggle('on', b.dataset.k === k));
    el.querySelectorAll('.sp-sauteurs button').forEach(b => b.classList.remove('bon', 'faux'));
    $('.sp-consigne').innerHTML = SP_CRITERES[k].q + ' <i>Clique sur ton choix.</i>';
    $('.sp-calc').hidden = true; spDire(el, ''); dessiner();
  }
  el.querySelectorAll('.sp-chips [data-k]').forEach(b => b.onclick = () => charger(b.dataset.k));
  el.querySelectorAll('.sp-sauteurs button').forEach(b => b.onclick = () => {
    if(st.rep != null) return;
    const c = SP_CRITERES[st.k], vals = SP_SAUTEURS.map(a => c.val(a.sauts));
    const best = c.mieux === 'grand' ? vals.indexOf(Math.max(...vals)) : vals.indexOf(Math.min(...vals));
    st.rep = +b.dataset.i;
    const ok = st.rep === best;
    if(ok && !st.faits.has(st.k)){ st.faits.add(st.k); st.score++; }
    $('.sp-score').textContent = st.score ? '⭐ ' + st.score : '';
    el.querySelectorAll('.sp-sauteurs button').forEach(x => { if(+x.dataset.i === best) x.classList.add('bon'); else if(x === b) x.classList.add('faux'); });
    const autres = crits.filter(k => k !== st.k).map(k => { const cc = SP_CRITERES[k], vv = SP_SAUTEURS.map(a => cc.val(a.sauts)), bb = cc.mieux === 'grand' ? vv.indexOf(Math.max(...vv)) : vv.indexOf(Math.min(...vv)); return `avec ${cc.nom === 'meilleur saut' ? 'la règle du meilleur saut' : spLa(cc.nom)}, c'est ${SP_SAUTEURS[bb].nom}`; });
    spDire(el, (ok ? '<span class="gicon">celebration</span> Bien vu ! ' : `<span class="gicon">info</span> Pas tout à fait : c'est <b>${SP_SAUTEURS[best].nom}</b>. `)
      + `Ici, l'indicateur qui compte est <b>${c.nom === 'meilleur saut' ? 'le meilleur saut (le maximum)' : spLa(c.nom)}</b>.` + (autres.length ? ` Remarque : ${autres.join(' ; ')}. <b>Le bon choix dépend de ce qu'on cherche !</b>` : ''), ok ? 'ok' : 'ko');
    const calc = $('.sp-calc'); calc.hidden = false; calc.innerHTML = SP_SAUTEURS.map(a => `<div><b style="color:${a.c}">${a.nom}</b> · ${c.calc(a)}</div>`).join('');
    dessiner();
  });
  charger(st.k);
}

/* ---------- Construction ---------- */
function spInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.sp-piste').forEach(spPisteMonter);
  racine.querySelectorAll('.sp-bolt').forEach(spBoltMonter);
  racine.querySelectorAll('.sp-stats').forEach(spStatsMonter);
}

/* =====================================================================
   Onglet Histoire « Maths et sport »
   ===================================================================== */
const SP_HISTOIRE_HTML = `
<div class="history-box sp-hist">
  <div class="history-title"><span class="gicon">sports_soccer</span> Maths et sport : mesurer, compter, comparer</div>

  <h4 class="sp-hist-h">Le stade : une unité de longueur devenue un lieu</h4>
  <p>Aux premiers Jeux olympiques connus, en <b>776 av. J.-C.</b> à Olympie, il n'y avait qu'une épreuve : la course du <b>stade</b>. Le stade était d'abord une <b>unité de longueur</b> (environ 192 m à Olympie, soit 600 « pieds ») ; c'est ensuite le nom du terrain où l'on courait cette distance qui est resté. Quand tu vas au stade, tu vas donc… dans une unité de mesure !</p>

  <h4 class="sp-hist-h">42,195 km : le marathon le plus précis du monde</h4>
  <p>Le premier marathon olympique, à Athènes en 1896, mesurait environ 40 km, en souvenir du messager grec qui aurait couru de Marathon à Athènes. Aux Jeux de Londres, en <b>1908</b>, le parcours part du château de Windsor et s'arrête devant la loge royale du stade : il mesure <b>42,195 km</b>. Cette longueur est devenue la distance officielle en 1921.</p>

  <h4 class="sp-hist-h">Des secondes aux millièmes de seconde</h4>
  <p>Aux premiers Jeux modernes, on chronométrait à la main, au cinquième de seconde. Aujourd'hui, le chronométrage électronique et la <b>photo-finish</b> mesurent les temps au <b>centième</b> de seconde, et peuvent départager deux athlètes au <b>millième</b>. Un centième de seconde au 100 m, à la vitesse d'Usain Bolt (environ 10 mètres par seconde), c'est à peine 10 cm : la longueur d'une main !</p>

  <h4 class="sp-hist-h">La piste de 400 m et ses départs décalés</h4>
  <p>Sur une piste d'athlétisme, les deux virages forment un cercle. Dans le couloir extérieur, le rayon est plus grand, donc le cercle est plus long : 2 × π × r. Pour que tous les coureurs du 400 m parcourent la même distance, on <b>décale les départs</b> d'environ 7 m d'un couloir au suivant. <span data-avant="4e">C'est la méthode « La piste d'athlétisme ».</span></p>

  <h4 class="sp-hist-h">Un ballon d'Archimède</h4>
  <p>Le ballon de la Coupe du monde 1970, le célèbre <b>Telstar</b>, était cousu de <b>12 pentagones</b> noirs et de <b>20 hexagones</b> blancs : c'est un <b>icosaèdre tronqué</b>, l'un des solides décrits par Archimède il y a plus de 2 000 ans, « gonflé » pour devenir presque une sphère. Compte bien : 12 + 20 = 32 faces.</p>

  <h4 class="sp-hist-h">Quand les statistiques choisissent les joueurs</h4>
  <p>Au début des années 2000, l'équipe de baseball des <b>Oakland Athletics</b>, aux États-Unis, n'a pas d'argent pour acheter des stars. Son directeur, <b>Billy Beane</b>, recrute alors des joueurs grâce aux <b>statistiques</b> : moyennes, pourcentages de réussite… et son équipe enchaîne les victoires (l'histoire a été racontée dans le film <i>Le Stratège</i>). Aujourd'hui, tous les grands clubs de football ou de basket ont des analystes de données.<span data-des="4e"> Mais, comme dans la méthode « Qui sélectionner ? », il faut choisir le bon indicateur : le meilleur résultat, la moyenne, la médiane ou la régularité ne désignent pas toujours le même joueur.</span></p>

  <h4 class="sp-hist-h">Le saut qui a défié les calculs</h4>
  <p>Aux Jeux de Mexico, en 1968, l'Américain <b>Bob Beamon</b> saute <b>8,90 m</b> en longueur : il améliore le record du monde de 55 cm d'un coup ! Les juges ont même dû mesurer à la main, l'appareil optique n'allant pas assez loin. Son record a tenu près de 23 ans, jusqu'aux 8,95 m de <b>Mike Powell</b> en 1991, toujours record du monde.</p>

  <div class="sp-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Mesure d'abord <b>la longueur de ton pas</b> : compte tes pas sur une distance connue (10 m tracés dans la cour, ou la longueur d'un terrain de basket, 28 m), puis divise la distance par le nombre de pas. En EPS, compte ensuite tes pas sur un tour de piste : nombre de pas × longueur d'un pas, et tu connais la longueur du tour ! Compare avec celle que donne ton professeur d'EPS.<span data-des="4e"> Chronomètre-toi enfin sur ce tour et calcule ta vitesse moyenne en m/s, puis en km/h (multiplie par 3,6).</span></div>
</div>`;

(function spStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .sp-box{ display:flex; flex-direction:column; gap:10px; }
    .sp-chips{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
    .sp-chips button{ border:1.5px solid rgba(31,58,92,.25); background:#fff; color:#1F3A5C; border-radius:999px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; }
    .sp-chips button.on{ background:#1F3A5C; color:#fff; border-color:#1F3A5C; }
    .sp-cr{ display:inline-flex; align-items:center; gap:5px; border:1.5px solid var(--c); border-radius:999px; padding:4px 10px; font:600 .84rem Inter,sans-serif; color:#1C1B2E; cursor:pointer; background:#fff; }
    .sp-cr:has(input:checked){ background:color-mix(in srgb, var(--c) 14%, #fff); }
    .sp-toi{ width:62px; padding:2px 5px; border:1px solid #C9D6E6; border-radius:6px; font:inherit; }
    .sp-case{ display:inline-flex; align-items:center; gap:5px; font-size:.85rem; color:#4E5665; }
    .sp-case select{ padding:4px 6px; border-radius:8px; border:1px solid #C9D6E6; font:inherit; }
    .sp-score{ margin-left:auto; font:700 .95rem 'Space Grotesk',sans-serif; color:#B7791F; }
    .sp-consigne{ font-size:.95rem; line-height:1.5; }
    .sp-svg{ width:100%; max-width:680px; display:block; margin:0 auto; border-radius:10px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .sp-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.5; } .sp-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .sp-msg.ok{ color:#1E5E30; } .sp-msg.ko{ color:#9A3A12; }
    .sp-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .sp-calc{ background:#F6F8FB; border:1px solid #DDE5EF; border-radius:10px; padding:10px 14px; line-height:1.6; font-size:.92rem; }
    .sp-tab{ margin:8px auto; border-collapse:collapse; font-size:.86rem; } .sp-tab th, .sp-tab td{ border:1px solid #D5DEE9; padding:3px 9px; text-align:center; } .sp-tab th{ background:#EEF4FB; }
    .sp-sauteurs{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
    .sp-sauteurs button{ border:2px solid var(--c); color:var(--c); background:#fff; border-radius:12px; padding:6px 18px; font:700 .95rem 'Space Grotesk',sans-serif; cursor:pointer; display:inline-flex; align-items:center; gap:4px; }
    .sp-sauteurs button:hover{ background:color-mix(in srgb, var(--c) 10%, #fff); }
    .sp-sauteurs button.bon{ background:#1E7B34; border-color:#1E7B34; color:#fff; } .sp-sauteurs button.faux{ background:#F9E1DE; border-color:#B3261E; color:#B3261E; }
    .sp-hist p{ margin:6px 0 10px; line-height:1.6; }
    .sp-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#1E5E30; margin:16px 0 4px; }
    .sp-hist-a-toi{ margin-top:14px; background:#E9F5EC; border:1px solid #B6DDBF; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .sp-hist-a-toi .gicon{ color:#1E7B34; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

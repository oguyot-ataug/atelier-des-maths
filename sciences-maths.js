/* =====================================================================
   sciences-maths.js -- Maths et sciences : quatre activités et une page Histoire (onglet « Maths & la vie »).
   Demandé : « fais maintenant maths et sciences » (après argent et jeux).

   1. « À quelle distance est l'orage ? » (CM2, 6e et 5e Proportionnalité, 3e Grandeurs composées) : l'éclair,
      le chronomètre, le tonnerre (son de synthèse) ; le son parcourt 340 m chaque seconde.
      data-niv="cm" (secondes entières), "5e" (dixièmes), "3e" (d = v × t, km/h).
   2. « Le volume d'un caillou » (CM1, CM2 Longueurs, masses, contenances ; 6e Solides et volumes ;
      3e Grandeurs composées) : lecture d'une éprouvette graduée, volume par différence ; en 6e,
      1 mL = 1 cm³ ; en 3e (data-niv="3e"), balance et masse volumique : flotte ou coule ?
   3. « De l'atome à l'Univers » (4e et 3e Puissances) : un curseur sur les puissances de 10, des objets de
      chaque taille, l'écriture scientifique ; quiz « quelle puissance de 10 ? ».
   4. « La bille de Galilée » (5e Fonctions, 3e Généralités sur les fonctions) : sur un plan incliné, les
      distances parcourues chaque seconde sont 1, 3, 5, 7… ; au total 1, 4, 9, 16… : pas de proportionnalité.

   Placement : <div class="sc-orage" data-niv></div>, <div class="sc-eprouvette" data-niv="cm|6e|3e"></div>,
   <div class="sc-univers"></div>, <div class="sc-chute" data-niv="5e|3e"></div> ; scInitTout(conteneur).
   SC_HISTOIRE_HTML : la page Histoire.
   ===================================================================== */
const scN = (v, d) => (+v).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 2 : d });
const scF = v => (+v).toFixed(1);
function scDire(el, h, cls){ const m = el.querySelector('.sc-msg'); if(!m) return; m.className = 'sc-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }
let scAudio = null;
const scCtx = () => { try{ if(!scAudio) scAudio = new (window.AudioContext || window.webkitAudioContext)(); if(scAudio.state === 'suspended') scAudio.resume(); return scAudio; }catch(e){ return null; } };
// Tonnerre de synthèse : bruit grave filtré, roulement irrégulier qui s'éteint.
function scTonnerre(){
  const A = scCtx(); if(!A) return;
  const n = Math.floor(A.sampleRate * 3), buf = A.createBuffer(1, n, A.sampleRate), d = buf.getChannelData(0);
  let b = 0, env = 1;
  for(let i = 0; i < n; i++){
    b = (b + .04 * (Math.random() * 2 - 1)) / 1.04;
    if(i % 2000 === 0) env = .55 + Math.random() * .9;
    d[i] = b * 7 * env * Math.exp(-i / (A.sampleRate * .9)) * Math.min(1, i / (A.sampleRate * .05));
  }
  const s = A.createBufferSource(), f = A.createBiquadFilter(), g = A.createGain();
  s.buffer = buf; f.type = 'lowpass'; f.frequency.value = 380; g.gain.value = 1.2;
  s.connect(f); f.connect(g); g.connect(A.destination); s.start();
}
function scDing(h){
  const A = scCtx(); if(!A) return;
  const o = A.createOscillator(), g = A.createGain(); o.frequency.value = h || 880; o.type = 'sine';
  g.gain.setValueAtTime(.25, A.currentTime); g.gain.exponentialRampToValueAtTime(.001, A.currentTime + .5);
  o.connect(g); g.connect(A.destination); o.start(); o.stop(A.currentTime + .5);
}

/* =====================================================================
   1. À quelle distance est l'orage ?
   ===================================================================== */
function scOrageMonter(el){
  const niv = el.dataset.niv || 'cm', st = { t: 0, chrono: 0, tic: 0, fini: false };
  el.innerHTML = `<div class="sc-box">
    <div class="sc-consigne">Un orage approche. La lumière de l'éclair nous arrive <b>presque tout de suite</b>, mais le son du tonnerre est beaucoup plus lent : il parcourt environ <b>340 mètres chaque seconde</b>. Monte le son, déclenche l'orage et regarde le chronomètre.</div>
    <svg class="sc-svg sc-ciel" viewBox="0 0 600 220"></svg>
    <div class="sc-chrono">0,0 s</div>
    <div class="sc-actions sc-orage-q"></div>
    <div class="sc-msg" aria-live="polite"></div>
    <div class="sc-actions"><button type="button" class="btn" data-a="orage"><span class="gicon">thunderstorm</span> Déclencher l'orage</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.sc-ciel');
  const ciel = (eclair, x) => {
    let h = `<rect width="600" height="220" fill="${eclair ? '#B9C4E6' : '#2C3350'}"/><circle cx="80" cy="40" r="2" fill="#fff" opacity=".5"/><circle cx="300" cy="25" r="1.5" fill="#fff" opacity=".5"/>`;
    h += `<g fill="#555D78"><ellipse cx="${x}" cy="45" rx="70" ry="26"/><ellipse cx="${x + 50}" cy="35" rx="50" ry="24"/><ellipse cx="${x - 45}" cy="40" rx="45" ry="20"/></g>`;
    if(eclair) h += `<path d="M${x},65 l-18,48 h16 l-14,52 l40,-66 h-18 l16,-34 Z" fill="#FFE45C" stroke="#fff" stroke-width="2"/>`;
    h += `<rect y="185" width="600" height="35" fill="#24402A"/><g transform="translate(470,140)"><rect width="56" height="45" fill="#C9B07A"/><path d="M-6,0 L28,-28 L62,0 Z" fill="#8E3B2E"/><rect x="20" y="20" width="16" height="25" fill="#6B4A22"/><rect x="6" y="8" width="11" height="10" fill="${eclair ? '#FFF6C0' : '#F2D777'}"/></g>`;
    svg.innerHTML = h;
  };
  const tTxt = t => scN(t, niv === 'cm' ? 0 : 1) + ' s';
  function orage(){
    clearInterval(st.tic); scCtx();
    st.t = niv === 'cm' ? 2 + Math.floor(Math.random() * 8) : Math.round((1.5 + Math.random() * 8) * 10) / 10;
    st.fini = false; $('.sc-orage-q').innerHTML = ''; scDire(el, 'Regarde bien l\'éclair… puis écoute !');
    const x = 120 + Math.random() * 220;
    ciel(true, x); setTimeout(() => ciel(false, x), 180); setTimeout(() => ciel(true, x), 300); setTimeout(() => ciel(false, x), 420);
    const t0 = performance.now();
    st.tic = setInterval(() => {
      const t = (performance.now() - t0) / 1000;
      if(t >= st.t){ clearInterval(st.tic); $('.sc-chrono').textContent = tTxt(st.t); $('.sc-chrono').classList.add('boum'); scTonnerre(); setTimeout(() => $('.sc-chrono').classList.remove('boum'), 900); question(); return; }
      $('.sc-chrono').textContent = scN(Math.floor(t * 10) / 10, 1) + ' s';
    }, 100);
  }
  function question(){
    scDire(el, `<b>BRAOUM !</b> Le tonnerre est arrivé <b>${tTxt(st.t)}</b> après l'éclair. À quelle distance est l'orage ?`);
    $('.sc-orage-q').innerHTML = `<label>Distance : <input type="number" min="0" step="10" data-a="d" style="width:100px;"> m</label><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button>`;
    $('[data-a="verif"]').onclick = verifier;
  }
  function verifier(){
    const d = 340 * st.t, g = parseFloat($('[data-a="d"]').value), ok = isFinite(g) && Math.abs(g - d) <= Math.max(10, d * .02);
    const calc = niv === '3e'
      ? `<div>Le son va à v = 340 m/s, pendant t = ${tTxt(st.t)}.</div><div>d = v × t = 340 × ${scN(st.t, 1)} = <b>${scN(d, 0)} m</b>.</div><div>En km/h, le son va à 340 × 3 600 ÷ 1 000 = 1 224 km/h.</div>`
      : `<div>En 1 seconde, le son parcourt 340 m.</div><div>En ${tTxt(st.t)} : 340 × ${scN(st.t, 1)} = <b>${scN(d, 0)} m</b>.</div><div>C'est environ <b>${scN(d / 1000, 1)} km</b>.</div>`;
    scDire(el, `${ok ? '<span class="gicon">celebration</span> Exact !' : '<span class="gicon">info</span> Voici le calcul :'}<div class="sc-etapes">${calc}</div>
      Astuce : le son parcourt à peu près 1 km en 3 secondes. Divise le nombre de secondes par 3 et tu as la distance en kilomètres. ${d < 2000 ? 'Ici, l\'orage est tout près : on rentre à l\'abri !' : ''}`, ok ? 'ok' : 'ko');
  }
  $('[data-a="orage"]').onclick = orage;
  ciel(false, 200);
}

/* =====================================================================
   2. Le volume d'un caillou (éprouvette graduée ; masse volumique en 3e)
   ===================================================================== */
const SC_OBJETS = [
  { nom: 'une bille de verre', e: '🔮', v: 8, rho: 2.5, coul: '#7FB8E0' },
  { nom: 'un caillou', e: '🪨', v: 14, rho: 2.6, coul: '#8E8E8E' },
  { nom: 'un écrou en fer', e: '🔩', v: 6, rho: 7.8, coul: '#6E7682' },
  { nom: 'un morceau de pâte à modeler', e: '🟠', v: 22, rho: 1.4, coul: '#E67E22' },
  { nom: 'un cube de bois', e: '🟫', v: 18, rho: .6, coul: '#B5651D', flotte: true },
  { nom: 'un bouchon de liège', e: '🍾', v: 12, rho: .24, coul: '#D9B27A', flotte: true },
  { nom: 'un glaçon', e: '🧊', v: 16, rho: .92, coul: '#CFEFFF', flotte: true }];
function scEprouvetteMonter(el){
  const niv = el.dataset.niv || 'cm', trois = niv === '3e', objets = SC_OBJETS.filter(o => trois || !o.flotte);
  const st = { v0: 50, o: null, dedans: false, anim: 0 };
  el.innerHTML = `<div class="sc-box">
    <div class="sc-consigne">Comment mesurer le volume d'un objet qui n'a pas une forme simple ? On le plonge dans une <b>éprouvette graduée</b> remplie d'eau : l'eau monte exactement du volume de l'objet${trois ? ' (un objet qui flotte, on l\'enfonce entièrement avec une fine aiguille)' : ''}.</div>
    <div class="sc-chips">${objets.map((o, i) => `<button type="button" data-o="${i}"><span>${o.e}</span> ${o.nom}</button>`).join('')}</div>
    <div class="sc-labo"><svg class="sc-svg sc-ep" viewBox="0 0 260 380"></svg>${trois ? '<svg class="sc-svg sc-balance" viewBox="0 0 220 160"></svg>' : ''}</div>
    <div class="sc-actions sc-ep-q"></div>
    <div class="sc-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.sc-ep');
  const Y = v => 340 - v * 3;                                     // 0 mL en bas (y = 340), 100 mL en haut (y = 40)
  function dessiner(niveau, yObj){
    let h = '<rect width="260" height="380" fill="#FAFBFC"/>';
    h += `<rect x="90" y="${Y(niveau)}" width="80" height="${340 - Y(niveau)}" fill="#9CC9EE" opacity=".8"/><path d="M90,${Y(niveau)} q40,6 80,0" fill="#7FB6E3" opacity=".9"/>`;
    if(st.o && yObj != null){ const r = 6 + Math.sqrt(st.o.v) * 2.2; h += `<circle cx="130" cy="${yObj}" r="${r}" fill="${st.o.coul}" stroke="#1C1B2E" stroke-opacity=".4"/>`; }
    h += '<path d="M90,30 V340 q0,10 10,10 h60 q10,0 10,-10 V30" fill="none" stroke="#5A6475" stroke-width="3"/><rect x="70" y="350" width="120" height="10" rx="3" fill="#5A6475"/>';
    for(let v = 0; v <= 100; v += 2){ const y = Y(v), long = v % 10 === 0; h += `<line x1="170" x2="${long ? 152 : 160}" y1="${y}" y2="${y}" stroke="#1C1B2E" stroke-width="${long ? 1.4 : .8}"/>`; if(long) h += `<text x="178" y="${y + 4}" font-size="12" fill="#1C1B2E">${v}</text>`; }
    h += '<text x="178" y="22" font-size="12" fill="#4E5665">mL</text>';
    svg.innerHTML = h;
  }
  function balance(){
    const b = $('.sc-balance'); if(!b) return;
    const m = st.o ? Math.round(st.o.v * st.o.rho * 10) / 10 : 0;
    b.innerHTML = `<rect width="220" height="160" fill="#FAFBFC"/><rect x="20" y="90" width="180" height="50" rx="8" fill="#3E4A5E"/><rect x="40" y="104" width="140" height="24" rx="4" fill="#C8F0C0"/><text x="110" y="122" font-size="17" text-anchor="middle" font-family="JetBrains Mono,monospace" fill="#1C1B2E">${scN(m, 1)} g</text><rect x="40" y="80" width="140" height="10" rx="3" fill="#8A93A5"/>${st.o ? `<text x="110" y="70" font-size="34" text-anchor="middle">${st.o.e}</text>` : ''}`;
  }
  function choisir(i){
    cancelAnimationFrame(st.anim);
    st.o = objets[i]; st.v0 = 30 + 2 * Math.floor(Math.random() * 11); st.dedans = false;
    el.querySelectorAll('[data-o]').forEach(b => b.classList.toggle('on', +b.dataset.o === i));
    dessiner(st.v0, 15); balance(); $('.sc-ep-q').innerHTML = '';
    scDire(el, `L'eau est à <b>${st.v0} mL</b> (lis la graduation). Clique sur « Plonger » !`);
    $('.sc-ep-q').innerHTML = `<button type="button" class="btn" data-a="plonger"><span class="gicon">water_drop</span> Plonger ${st.o.nom}</button>`;
    $('[data-a="plonger"]').onclick = plonger;
  }
  function plonger(){
    const fond = 330 - (6 + Math.sqrt(st.o.v) * 2.2), t0 = performance.now(), v1 = st.v0 + st.o.v;
    const pas = now => {
      const k = Math.min(1, (now - t0) / 1100), y = 15 + (fond - 15) * k * k, sous = y > Y(st.v0);
      dessiner(sous ? st.v0 + st.o.v * Math.min(1, (y - Y(st.v0)) / 40) : st.v0, y);
      if(k < 1) st.anim = requestAnimationFrame(pas); else { dessiner(v1, fond); question(); }
    };
    st.anim = requestAnimationFrame(pas);
  }
  function question(){
    scDire(el, 'L\'objet est au fond. Lis le nouveau niveau de l\'eau, puis trouve le volume de l\'objet.');
    $('.sc-ep-q').innerHTML = `<label>Volume de l'objet : <input type="number" min="0" data-a="v" style="width:70px;"> ${niv === 'cm' ? 'mL' : 'cm³'}</label>${trois ? '<label>Masse volumique : <input type="text" inputmode="decimal" data-a="r" style="width:80px;" placeholder="0,00"> g/cm³</label>' : ''}<button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button>`;
    $('[data-a="verif"]').onclick = verifier;
  }
  function verifier(){
    const o = st.o, v1 = st.v0 + o.v, g = parseFloat($('[data-a="v"]').value), m = Math.round(o.v * o.rho * 10) / 10, rho = m / o.v;
    const okV = g === o.v, gr = trois ? parseFloat(String($('[data-a="r"]').value).replace(',', '.')) : 0, okR = !trois || Math.abs(gr - rho) < .02;
    let h = `<div class="sc-etapes"><div>Avant : ${st.v0} mL.</div><div>Après : ${v1} mL.</div><div>Volume de l'objet : ${v1} − ${st.v0} = <b>${o.v} mL</b>.</div>${niv !== 'cm' ? `<div>Comme 1 mL = 1 cm³, le volume est <b>${o.v} cm³</b>.</div>` : ''}`;
    if(trois) h += `<div>Masse volumique : ρ = m ÷ V = ${scN(m, 1)} ÷ ${o.v} ≈ <b>${scN(rho, 2)} g/cm³</b>.</div>`;
    h += '</div>';
    if(trois) h += `L'eau a une masse volumique de 1 g/cm³ : ${o.nom} est <b>${rho < 1 ? 'moins dense que l\'eau, il flotte' : 'plus dense que l\'eau, il coule'}</b>${rho < 1 ? ` (et ${scN(rho * 100, 0)} % de son volume reste sous l'eau, comme pour un iceberg)` : ''}.`;
    scDire(el, (okV && okR ? '<span class="gicon">celebration</span> Bravo !' : '<span class="gicon">info</span> Voici comment faire :') + h, okV && okR ? 'ok' : 'ko');
  }
  el.querySelectorAll('[data-o]').forEach(b => b.onclick = () => choisir(+b.dataset.o));
  dessiner(50, null); balance();
  scDire(el, 'Choisis un objet.');
}

/* =====================================================================
   3. De l'atome à l'Univers (puissances de 10)
   ===================================================================== */
const SC_ECHELLES = [
  [-10, 1, 'un atome', '⚛️'], [-9, 2, 'une molécule d\'ADN (largeur)', '🧬'], [-7, 1, 'un virus', '🦠'], [-5, 1, 'une cellule', '🔬'], [-4, 1, 'l\'épaisseur d\'un cheveu', '💇'],
  [-3, 1, 'un grain de sable', '⏳'], [-2, 1, 'une fourmi', '🐜'], [-1, 1, 'une souris', '🐭'], [0, 1.4, 'un enfant de 11 ans', '🧒'], [1, 3, 'une baleine bleue', '🐋'],
  [2, 3.3, 'la tour Eiffel', '🗼'], [3, 8.8, 'le mont Everest', '🏔️'], [5, 9.5, 'la France', '🇫🇷'], [7, 1.27, 'la Terre (diamètre)', '🌍'], [8, 3.84, 'la distance de la Terre à la Lune', '🌙'],
  [9, 1.39, 'le Soleil (diamètre)', '☀️'], [11, 1.5, 'la distance de la Terre au Soleil', '🛰️'], [15, 9.46, 'une année-lumière', '✨'], [20, 9.5, 'notre galaxie, la Voie lactée', '🌌'], [26, 8.8, 'l\'Univers observable', '🔭']];
function scSci(m, p){ return `${scN(m, 2)} × 10<sup>${p < 0 ? '−' + (-p) : p}</sup> m`; }
function scDec(m, p){
  if(p < -6 || p > 9) return '';
  const v = m * Math.pow(10, p);
  return (v >= 1000 ? (v >= 1e6 ? scN(v / 1000, 0) + ' km' : scN(v / 1000, 1) + ' km') : v >= 1 ? scN(v, 2) + ' m' : v.toLocaleString('fr-FR', { maximumSignificantDigits: 3 }).replace(/\s/g, ' ') + ' m');
}
function scUniversMonter(el){
  const st = { i: 8, q: null, ok: 0, n: 0 };
  el.innerHTML = `<div class="sc-box">
    <div class="sc-consigne">Fais glisser le curseur : à chaque cran, on change d'échelle d'une <b>puissance de 10</b>. Les scientifiques écrivent ces très grands et très petits nombres en <b>écriture scientifique</b>.</div>
    <input type="range" class="sc-range" min="0" max="${SC_ECHELLES.length - 1}" step="1" value="8" aria-label="Échelle">
    <div class="sc-echelle"></div>
    <div class="sc-quiz"><b><span class="gicon">quiz</span> Quiz :</b> <span class="sc-quiz-q"></span><div class="sc-actions sc-quiz-r"></div></div>
    <div class="sc-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  function montrer(){
    const [p, m, nom, e] = SC_ECHELLES[st.i], dec = scDec(m, p);
    const reg = SC_ECHELLES.map((x, k) => `<span class="${k === st.i ? 'on' : ''}" style="left:${(x[0] + 10) / 36 * 100}%"></span>`).join('');
    $('.sc-echelle').innerHTML = `<div class="sc-emoji">${e}</div><div class="sc-nom">${nom}</div><div class="sc-taille">environ <b>${scSci(m, p)}</b>${dec ? ' = ' + dec : ''}</div>
      <div class="sc-regle">${reg}<i style="left:${(p + 10) / 36 * 100}%"></i></div><div class="sc-regle-l"><span>10<sup>−10</sup> m</span><span>1 m</span><span>10<sup>26</sup> m</span></div>
      <div class="sc-cmp">${st.i ? `Par rapport au cran précédent (${SC_ECHELLES[st.i - 1][2]}) : environ <b>${scN(Math.round(m * Math.pow(10, p) / (SC_ECHELLES[st.i - 1][1] * Math.pow(10, SC_ECHELLES[st.i - 1][0]))), 0)} fois</b> plus grand.` : 'L\'atome : le plus petit objet de la liste.'}</div>`;
  }
  function quiz(){
    const k = Math.floor(Math.random() * SC_ECHELLES.length), [p, , nom, e] = SC_ECHELLES[k];
    const choix = [p, p + (Math.random() < .5 ? 3 : -3), p + (Math.random() < .5 ? 6 : -6)].sort(() => Math.random() - .5);
    st.q = p;
    $('.sc-quiz-q').innerHTML = `${e} Quelle est la taille de <b>${nom}</b> ?`;
    $('.sc-quiz-r').innerHTML = choix.map(c => `<button type="button" class="btn secondary" data-c="${c}">environ 10<sup>${c < 0 ? '−' + (-c) : c}</sup> m</button>`).join('') + ' <span class="sc-score"></span>';
    el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => {
      st.n++; const ok = +b.dataset.c === st.q; if(ok) st.ok++;
      scDire(el, ok ? `<span class="gicon">celebration</span> Oui : ${nom}, c'est environ ${scSci(SC_ECHELLES[k][1], p)}.` : `<span class="gicon">info</span> Non : ${nom}, c'est environ ${scSci(SC_ECHELLES[k][1], p)}.`, ok ? 'ok' : 'ko');
      st.i = k; $('.sc-range').value = k; montrer(); quiz(); $('.sc-score').textContent = `Score : ${st.ok} sur ${st.n}`;
    });
  }
  $('.sc-range').oninput = e => { st.i = +e.target.value; montrer(); };
  montrer(); quiz();
}

/* =====================================================================
   4. La bille de Galilée (plan incliné)
   ===================================================================== */
function scChuteMonter(el){
  const trois = el.dataset.niv === '3e', st = { s: 0, anim: 0 }, T = 5;
  el.innerHTML = `<div class="sc-box">
    <div class="sc-consigne">Vers 1604, <b>Galilée</b> fait rouler des billes sur une longue planche inclinée et place une petite cloche là où la bille arrive à chaque battement de son pouls. Lâche la bille : où sont les cloches ?</div>
    <svg class="sc-svg sc-plan" viewBox="0 0 640 230"></svg>
    <div class="sc-actions"><button type="button" class="btn" data-a="lacher"><span class="gicon">play_arrow</span> Lâcher la bille</button></div>
    <div class="sc-tableau"></div>
    <div class="sc-actions sc-chute-q"></div>
    <div class="sc-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.sc-plan');
  const L = 560 / 25, pos = d => [40 + d * L * .97, 30 + d * L * .26];   // le long de la planche (d en unités, 25 au bout)
  function dessiner(t){
    let h = '<rect width="640" height="230" fill="#FBF7EE"/><path d="M30,30 L620,186 L620,200 L30,44 Z" fill="#B5814B"/><path d="M620,200 L620,215 L30,215 L30,44" fill="none" stroke="#8B5E3C" stroke-width="3"/>';
    for(let s = 1; s <= T; s++){ const [x, y] = pos(s * s); const vue = t >= s; h += `<g opacity="${vue ? 1 : .15}"><line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y - 26}" stroke="#6B4A22" stroke-width="2"/><path d="M${x - 7},${y - 24} q7,-14 14,0 Z" fill="#E0A82E"/><text x="${x}" y="${y + 26}" font-size="12" text-anchor="middle" fill="#4E5665">${s} s</text></g>`; }
    const d = Math.min(25, t * t), [bx, by] = pos(d);
    h += `<circle cx="${bx}" cy="${by - 9}" r="9" fill="#2F6FB3" stroke="#1C1B2E" stroke-opacity=".4"/>`;
    svg.innerHTML = h;
  }
  function tableau(n){
    const cols = [...Array(T + 1).keys()];
    $('.sc-tableau').innerHTML = `<table class="sc-tab"><tr><th>temps (s)</th>${cols.map(t => `<td>${t}</td>`).join('')}<td>6</td></tr>
      <tr><th>distance depuis le départ</th>${cols.map(t => `<td>${t <= n ? t * t : '?'}</td>`).join('')}<td>?</td></tr>
      <tr><th>parcourue pendant la seconde</th><td>–</td>${cols.slice(1).map(t => `<td>${t <= n ? 2 * t - 1 : '?'}</td>`).join('')}<td>?</td></tr></table>`;
  }
  function lacher(){
    cancelAnimationFrame(st.anim); scCtx(); st.s = 0; tableau(0); $('.sc-chute-q').innerHTML = ''; scDire(el, '');
    const t0 = performance.now();
    const pas = now => {
      const t = (now - t0) / 1000 * 1.1;
      if(Math.floor(t) > st.s && st.s < T){ st.s = Math.floor(t); scDing(660 + st.s * 110); tableau(st.s); }
      dessiner(t);
      if(t < T) st.anim = requestAnimationFrame(pas); else { dessiner(T); question(); }
    };
    st.anim = requestAnimationFrame(pas);
  }
  function question(){
    scDire(el, 'Regarde le tableau : les distances parcourues chaque seconde sont 1, 3, 5, 7, 9… les nombres impairs ! Si la planche était plus longue, quelle distance depuis le départ au bout de <b>6 secondes</b> ?');
    $('.sc-chute-q').innerHTML = `<label>Distance à 6 s : <input type="number" min="0" data-a="d6" style="width:70px;"> unités</label><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button>`;
    $('[data-a="verif"]').onclick = () => {
      const ok = parseFloat($('[data-a="d6"]').value) === 36;
      scDire(el, `${ok ? '<span class="gicon">celebration</span> Oui : 36 !' : '<span class="gicon">info</span> Réponse : 36.'}<div class="sc-etapes"><div>Pendant la 6e seconde, la bille parcourt le nombre impair suivant : 11.</div><div>Distance depuis le départ : 25 + 11 = <b>36</b>.</div><div>Et 36 = 6 × 6 : la distance est le <b>carré</b> du temps.</div></div>
        ${trois ? 'La distance est une fonction du temps : d(t) = t². Ce n\'est <b>ni une fonction linéaire, ni une fonction affine</b> : sa courbe est une parabole, pas une droite. Galilée a découvert que tous les corps qui tombent suivent cette loi.' : 'À chaque durée correspond une seule distance : la distance est une <b>fonction</b> du temps. Mais ce n\'est pas une situation de proportionnalité : en 2 fois plus de temps, la bille va 4 fois plus loin !'}`, ok ? 'ok' : 'ko');
    };
  }
  $('[data-a="lacher"]').onclick = lacher;
  dessiner(0); tableau(0);
}

/* ---------- Construction ---------- */
function scInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.sc-orage').forEach(scOrageMonter);
  racine.querySelectorAll('.sc-eprouvette').forEach(scEprouvetteMonter);
  racine.querySelectorAll('.sc-univers').forEach(scUniversMonter);
  racine.querySelectorAll('.sc-chute').forEach(scChuteMonter);
}

/* =====================================================================
   Page Histoire « Maths et sciences » (sans fraction écrite : lisible du CM1 à la 3e)
   ===================================================================== */
const SC_HISTOIRE_HTML = `
<div class="history-box sc-hist">
  <div class="history-title"><span class="gicon">science</span> Maths et sciences : mesurer le monde</div>

  <h4 class="sc-hist-h">Archimède et la couronne du roi (vers 250 avant J.-C.)</h4>
  <p>Le roi de Syracuse soupçonne son orfèvre d'avoir mélangé de l'argent à l'or de sa couronne. Il demande au savant <b>Archimède</b> de le vérifier… sans abîmer la couronne. Selon la légende, Archimède trouve la solution dans son bain, en voyant l'eau monter quand il s'y plonge, et court dans la rue en criant « <b>Eurêka !</b> » (j'ai trouvé !). En plongeant la couronne dans l'eau, on mesure son <b>volume</b> ; si elle était en or pur, elle déplacerait autant d'eau qu'un lingot d'or de même masse. La couronne déplaçait plus d'eau : l'orfèvre avait triché !</p>

  <h4 class="sc-hist-h">Ératosthène mesure la Terre avec une ombre (vers 240 avant J.-C.)</h4>
  <p>À Syène, en Égypte, le jour le plus long de l'année, le Soleil éclaire le fond des puits à midi : il est exactement au-dessus. Le même jour, à Alexandrie, plus au nord, un bâton vertical fait une petite ombre : les rayons du Soleil arrivent avec un angle d'environ 7°, un cinquantième de tour complet. <b>Ératosthène</b> en déduit que le tour de la Terre mesure 50 fois la distance d'Alexandrie à Syène : environ <b>40 000 km</b>. C'est presque la vraie valeur !</p>

  <h4 class="sc-hist-h">Archimède compte les grains de sable de l'Univers</h4>
  <p>Combien faudrait-il de grains de sable pour remplir tout l'Univers ? Dans un petit livre, <i>L'Arénaire</i>, Archimède invente une façon d'écrire des nombres immenses, en les regroupant par « myriades de myriades ». <span data-des="4e">Il trouve un nombre qui s'écrirait aujourd'hui 10<sup>63</sup> : un 1 suivi de 63 zéros. C'est l'ancêtre de nos <b>puissances de 10</b>.</span><span data-avant="4e">Il trouve un nombre qui s'écrit avec un 1 suivi de <b>63 zéros</b> !</span></p>

  <h4 class="sc-hist-h">Galilée, la bille et le pendule</h4>
  <p>Vers 1583, à la cathédrale de Pise, le jeune <b>Galilée</b> observe un lustre qui se balance et mesure ses oscillations avec son pouls : elles durent toujours le même temps, qu'elles soient grandes ou petites. Plus tard, avec ses billes sur un plan incliné, il découvre que <span data-des="4e">la distance parcourue est proportionnelle au <b>carré</b> du temps.</span><span data-avant="4e">en deux fois plus de temps, la bille parcourt <b>quatre fois</b> plus de distance.</span> Galilée écrit que le grand livre de la nature « est écrit dans la langue des mathématiques ».</p>

  <h4 class="sc-hist-h">Coups de canon pour mesurer la vitesse du son (1738)</h4>
  <p>Comment mesurer la vitesse du son ? En 1738, des savants de l'Académie des sciences tirent au canon, la nuit, entre Montmartre et Montlhéry, près de Paris. De l'autre côté, on voit l'éclair du canon tout de suite et on chronomètre le temps avant d'entendre la détonation. Ils trouvent environ <b>337 mètres par seconde</b>, très proche de la valeur d'aujourd'hui : 340 mètres par seconde dans l'air.</p>

  <h4 class="sc-hist-h">Le mètre, mesuré sur la Terre (1792-1799)</h4>
  <p>Pendant la Révolution, les astronomes <b>Delambre</b> et <b>Méchain</b> mesurent pendant sept ans la distance entre Dunkerque et Barcelone, avec des triangles. But : définir une unité de longueur valable pour tous, le <b>mètre</b>, égal à un dix-millionième de la distance entre le pôle Nord et l'équateur. Le litre et le kilogramme en découlent : un litre, c'est un cube de 10 cm de côté ; un kilogramme, la masse d'un litre d'eau.</p>

  <div class="sc-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Chez toi, verse de l'eau dans un verre doseur gradué. Note le niveau, plonge une pomme de terre, un œuf ou une petite figurine, et lis le nouveau niveau : quel est le volume de l'objet ? Et au prochain orage, compte les secondes entre l'éclair et le tonnerre, puis divise par 3 : l'orage est à combien de kilomètres ?</div>
</div>`;

(function scStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .sc-box{ display:flex; flex-direction:column; gap:10px; }
    .sc-consigne{ font-size:.95rem; line-height:1.55; }
    .sc-svg{ width:100%; max-width:600px; display:block; margin:0 auto; border-radius:12px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .sc-plan{ max-width:640px; }
    .sc-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.6; } .sc-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .sc-msg.ok{ color:#1E5E30; } .sc-msg.ko{ color:#9A3A12; }
    .sc-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; font-size:.93rem; }
    .sc-etapes{ display:flex; width:fit-content; max-width:100%; flex-direction:column; gap:3px; text-align:left; margin:6px auto; background:#EEF5FB; border-radius:10px; padding:8px 14px; color:#1C1B2E; }
    .sc-chrono{ text-align:center; font:700 1.8rem 'JetBrains Mono',monospace; color:#2C3350; transition:transform .1s; }
    .sc-chrono.boum{ animation:scBoum .9s; color:#C0392B; }
    @keyframes scBoum{ 0%,100%{ transform:translateX(0); } 10%,50%,90%{ transform:translateX(-6px); } 30%,70%{ transform:translateX(6px); } }
    .sc-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
    .sc-chips button{ border:1.5px solid rgba(47,111,179,.3); background:#fff; color:#123B6B; border-radius:12px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; }
    .sc-chips button.on{ background:#123B6B; color:#fff; border-color:#123B6B; }
    .sc-labo{ display:flex; gap:16px; justify-content:center; align-items:flex-end; flex-wrap:wrap; }
    .sc-ep{ max-width:260px; } .sc-balance{ max-width:220px; }
    .sc-range{ width:min(560px,94%); margin:0 auto; display:block; }
    .sc-echelle{ text-align:center; display:flex; flex-direction:column; gap:4px; align-items:center; }
    .sc-emoji{ font-size:3.4rem; line-height:1.1; } .sc-nom{ font:700 1.15rem 'Space Grotesk',sans-serif; color:#123B6B; } .sc-taille{ font-size:1rem; }
    .sc-regle{ position:relative; width:min(520px,92%); height:10px; background:linear-gradient(90deg,#7A4FC0,#2F6FB3,#1E8A6E,#B7791F,#C0392B); border-radius:5px; margin-top:8px; }
    .sc-regle span{ position:absolute; top:2px; width:6px; height:6px; margin-left:-3px; border-radius:50%; background:#fff; opacity:.7; }
    .sc-regle i{ position:absolute; top:-5px; width:4px; height:20px; margin-left:-2px; background:#1C1B2E; border-radius:2px; }
    .sc-regle-l{ display:flex; justify-content:space-between; width:min(520px,92%); font-size:.78rem; color:#4E5665; }
    .sc-cmp{ font-size:.9rem; color:#4E5665; }
    .sc-quiz{ background:#EEF5FB; border:1px solid #CFE0F0; border-radius:12px; padding:10px 14px; display:flex; flex-direction:column; gap:8px; align-items:center; text-align:center; }
    .sc-quiz .gicon{ vertical-align:-4px; color:#2F6FB3; }
    .sc-score{ font:600 .88rem 'JetBrains Mono',monospace; color:#4E5665; }
    .sc-tab{ margin:4px auto; border-collapse:collapse; font-size:.9rem; } .sc-tab th, .sc-tab td{ border:1px solid #CFE0F0; padding:3px 10px; text-align:center; } .sc-tab th{ background:#EEF5FB; text-align:left; }
    .sc-hist p{ margin:6px 0 10px; line-height:1.6; }
    .sc-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#123B6B; margin:16px 0 4px; }
    .sc-hist-a-toi{ margin-top:14px; background:#EEF5FB; border:1px solid #CFE0F0; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .sc-hist-a-toi .gicon{ color:#2F6FB3; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

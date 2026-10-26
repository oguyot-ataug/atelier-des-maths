/* =====================================================================
   geographie-maths.js -- Maths et géographie : quatre activités et une page Histoire (onglet
   « Maths & la vie »). Demandé : « fais maintenant maths et géographie ».

   1. « L'échelle d'une carte » (CM2 Résolution de problèmes, 6e Opérations, 5e Proportionnalité) : carte
      de France à l'échelle (1 cm pour 100 km), on clique deux villes, une règle graduée se pose entre
      elles ; distance sur la carte puis distance réelle. data-niv="5e" : échelle écrite en fraction.
   2. « Les fuseaux horaires » (CM1, CM2, 6e Heures et durées ; 5e Nombres relatifs : data-niv="5e") :
      l'heure de Paris au curseur, l'heure dans le monde ; décalages « 6 h de moins » au CM, relatifs en 5e.
   3. « Le climat en graphique » (CM1, CM2, 6e Gestion de données ; 5e Statistiques : data-niv="5e") :
      climatogrammes (températures et pluies), questions de lecture ; moyenne en 5e.
   4. « Des sommets aux abysses » (5e et 4e Opérations sur les nombres relatifs) : altitudes positives et
      négatives sur un axe vertical, différence d'altitude.

   Placement : <div class="ge-echelle"></div>, <div class="ge-fuseaux"></div>, <div class="ge-climat"></div>,
   <div class="ge-altitudes"></div> (data-niv selon le niveau) ; geInitTout(conteneur). GE_HISTOIRE_HTML.
   ===================================================================== */
const geN = (v, d) => (+v).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 1 : d });
const geS = v => v < 0 ? '−' + geN(-v, 0) : geN(v, 0);
const geF = v => (+v).toFixed(1);
function geDire(el, h, cls){ const m = el.querySelector('.ge-msg'); if(!m) return; m.className = 'ge-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }

/* =====================================================================
   1. L'échelle d'une carte
   ===================================================================== */
// Contour simplifié de la France métropolitaine et de la Corse (longitude, latitude).
const GE_FRANCE = [[2.37, 51.04], [3.0, 50.78], [3.6, 50.5], [4.2, 50.3], [4.8, 50.15], [4.85, 49.8], [5.4, 49.6], [5.9, 49.5], [6.4, 49.45], [7.0, 49.15], [7.6, 49.05], [8.2, 48.97],
  [7.8, 48.6], [7.6, 48.1], [7.55, 47.6], [7.0, 47.45], [6.45, 47.0], [6.1, 46.6], [6.1, 46.25], [6.8, 46.4], [6.8, 45.9], [7.0, 45.8], [6.8, 45.15], [7.1, 44.6], [6.9, 44.4], [7.5, 43.8],
  [7.25, 43.7], [6.9, 43.45], [6.6, 43.15], [5.9, 43.1], [5.35, 43.3], [4.8, 43.4], [4.2, 43.45], [3.5, 43.27], [3.1, 43.1], [3.05, 42.55], [2.5, 42.35], [1.7, 42.5], [0.7, 42.8], [0.0, 42.7],
  [-0.7, 42.9], [-1.78, 43.37], [-1.45, 43.6], [-1.25, 44.4], [-1.2, 45.3], [-1.15, 46.15], [-1.8, 46.5], [-2.1, 47.0], [-2.5, 47.3], [-3.0, 47.5], [-4.1, 47.8], [-4.7, 48.05], [-4.75, 48.4],
  [-4.2, 48.7], [-3.5, 48.8], [-2.7, 48.6], [-2.0, 48.65], [-1.6, 48.65], [-1.6, 49.2], [-1.9, 49.7], [-1.25, 49.7], [-1.1, 49.4], [-0.2, 49.3], [0.2, 49.45], [1.1, 49.9], [1.6, 50.3], [1.6, 50.9]];
const GE_CORSE = [[9.4, 43.0], [9.55, 42.6], [9.5, 42.0], [9.25, 41.4], [8.8, 41.55], [8.6, 42.0], [8.6, 42.4], [9.0, 42.7], [9.3, 42.7]];
const GE_VILLES = [['Paris', 2.35, 48.86], ['Lille', 3.06, 50.63], ['Strasbourg', 7.75, 48.58], ['Lyon', 4.84, 45.76], ['Marseille', 5.37, 43.3], ['Nice', 7.26, 43.7], ['Bordeaux', -0.58, 44.84],
  ['Toulouse', 1.44, 43.6], ['Nantes', -1.55, 47.22], ['Brest', -4.49, 48.39], ['Rennes', -1.68, 48.11], ['Montpellier', 3.88, 43.61], ['Clermont-Ferrand', 3.09, 45.78], ['Dijon', 5.04, 47.32],
  ['Ajaccio', 8.74, 41.93], ['Perpignan', 2.9, 42.7], ['Le Havre', 0.11, 49.49], ['Limoges', 1.26, 45.83]];
const GE_PX_KM = .4;                                                        // 1 cm de carte = 40 px = 100 km
const geProj = (lon, lat) => [((lon + 5.2) * Math.cos(46.5 * Math.PI / 180) * 111.32) * GE_PX_KM + 10, ((51.2 - lat) * 110.57) * GE_PX_KM + 10];
function geVolOiseau(a, b){ // distance réelle sur la sphère terrestre (km)
  const r = Math.PI / 180, dLat = (b[2] - a[2]) * r, dLon = (b[1] - a[1]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[2] * r) * Math.cos(b[2] * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}
function geEchelleMonter(el){
  const cinq = el.dataset.niv === '5e', st = { a: null, b: null, choix: [] };
  el.innerHTML = `<div class="ge-box">
    <div class="ge-consigne">Sur cette carte, <b>1 cm représente 100 km</b> en vrai${cinq ? ` : c'est une carte à l'échelle <span class="tex">\\dfrac{1}{10\\,000\\,000}</span>` : ''}. Clique sur deux villes : une règle graduée se pose entre elles. Mesure, puis calcule la vraie distance.</div>
    <svg class="ge-svg ge-carte" viewBox="0 0 480 456"></svg>
    <div class="ge-actions ge-q"></div>
    <div class="ge-msg" aria-live="polite"></div>
    <div class="ge-actions"><button type="button" class="btn secondary" data-a="hasard"><span class="gicon">shuffle</span> Deux villes au hasard</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.ge-carte');
  const poly = l => l.map(p => geProj(p[0], p[1]).map(geF).join(',')).join(' ');
  function dessiner(){
    let h = `<rect width="480" height="456" fill="#DCEBF5"/><polygon points="${poly(GE_FRANCE)}" fill="#F3EBD6" stroke="#8B7B5A" stroke-width="1.5"/><polygon points="${poly(GE_CORSE)}" fill="#F3EBD6" stroke="#8B7B5A" stroke-width="1.5"/>`;
    h += `<g transform="translate(310,425)"><rect width="40" height="7" fill="#1C1B2E"/><rect x="40" width="40" height="7" fill="#fff" stroke="#1C1B2E"/><text x="0" y="-4" font-size="10">0</text><text x="40" y="-4" font-size="10" text-anchor="middle">100</text><text x="80" y="-4" font-size="10" text-anchor="middle">200 km</text></g>`;
    if(st.a && st.b){
      const [x1, y1] = geProj(st.a[1], st.a[2]), [x2, y2] = geProj(st.b[1], st.b[2]), L = Math.hypot(x2 - x1, y2 - y1), ang = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      h += `<line x1="${geF(x1)}" y1="${geF(y1)}" x2="${geF(x2)}" y2="${geF(y2)}" stroke="#C0392B" stroke-width="2" stroke-dasharray="5 3"/>`;
      let r = `<rect x="-4" y="4" width="${geF(L + 12)}" height="24" fill="#FFF3B0" fill-opacity=".9" stroke="#B7791F" rx="2"/>`;
      for(let k = 0; k * 4 <= L + 6; k++){ const lg = k % 10 === 0 ? 11 : k % 5 === 0 ? 8 : 5; r += `<line x1="${k * 4}" x2="${k * 4}" y1="4" y2="${4 + lg}" stroke="#1C1B2E" stroke-width="${k % 10 ? .6 : 1}"/>`; if(k % 10 === 0) r += `<text x="${k * 4}" y="25" font-size="8" text-anchor="middle">${k / 10}</text>`; }
      h += `<g transform="translate(${geF(x1)},${geF(y1)}) rotate(${geF(ang)})">${r}</g>`;
    }
    GE_VILLES.forEach((v, i) => {
      const [x, y] = geProj(v[1], v[2]), on = v === st.a || v === st.b;
      h += `<g data-v="${i}" style="cursor:pointer"><circle cx="${geF(x)}" cy="${geF(y)}" r="${on ? 6 : 4.5}" fill="${on ? '#C0392B' : '#2F6FB3'}" stroke="#fff" stroke-width="1.5"/><circle cx="${geF(x)}" cy="${geF(y)}" r="12" fill="transparent"/><text x="${geF(x + 7)}" y="${geF(y - 6)}" font-size="11" font-weight="${on ? 700 : 500}" fill="#1C1B2E" paint-order="stroke" stroke="#F3EBD6" stroke-width="3">${v[0]}</text></g>`;
    });
    svg.innerHTML = h;
    svg.querySelectorAll('[data-v]').forEach(g => g.onclick = () => clic(GE_VILLES[+g.dataset.v]));
  }
  function clic(v){
    if(!st.a || st.b){ st.a = v; st.b = null; $('.ge-q').innerHTML = ''; geDire(el, `${v[0]}… et l'autre ville ?`); dessiner(); return; }
    if(v === st.a) return;
    st.b = v; dessiner(); question();
  }
  const longueur = () => { const [x1, y1] = geProj(st.a[1], st.a[2]), [x2, y2] = geProj(st.b[1], st.b[2]); return Math.round(Math.hypot(x2 - x1, y2 - y1) / 4) / 10; };
  function question(){
    geDire(el, `<b>${st.a[0]} – ${st.b[0]}</b> : lis la règle (en cm), puis calcule la distance réelle.`);
    $('.ge-q').innerHTML = `<label>Sur la carte : <input type="text" inputmode="decimal" data-a="cm" style="width:60px;"> cm</label><label>En vrai : <input type="number" min="0" data-a="km" style="width:80px;"> km</label><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button>`;
    $('[data-a="verif"]').onclick = verifier;
  }
  function verifier(){
    const L = longueur(), D = Math.round(L * 100), cm = parseFloat(String($('[data-a="cm"]').value).replace(',', '.')), km = parseFloat($('[data-a="km"]').value);
    const okCm = Math.abs(cm - L) <= .15, okKm = Math.abs(km - D) <= 15;
    geDire(el, `${okCm && okKm ? '<span class="gicon">celebration</span> Bravo !' : '<span class="gicon">info</span> Voici le calcul :'}
      <div class="ge-etapes"><div>Sur la carte : ${geN(L)} cm.</div>${cinq ? '<div>1 cm sur la carte représente 10 000 000 cm, c\'est-à-dire 100 km.</div>' : '<div>1 cm sur la carte représente 100 km.</div>'}<div>${geN(L)} × 100 = <b>${geN(D, 0)} km</b>.</div></div>
      La vraie distance « à vol d'oiseau » entre ${st.a[0]} et ${st.b[0]} est d'environ ${geN(geVolOiseau(st.a, st.b), 0)} km. Par la route, c'est plus long : les routes font des détours !`, okCm && okKm ? 'ok' : 'ko');
  }
  $('[data-a="hasard"]').onclick = () => { const i = Math.floor(Math.random() * GE_VILLES.length); let j; do { j = Math.floor(Math.random() * GE_VILLES.length); } while(j === i); st.a = GE_VILLES[i]; st.b = GE_VILLES[j]; dessiner(); question(); };
  st.a = GE_VILLES[0]; st.b = GE_VILLES[4]; dessiner(); question();
  if(typeof renderStaticMath === 'function') renderStaticMath(el);
}

/* =====================================================================
   2. Les fuseaux horaires (heure d'hiver en France)
   ===================================================================== */
const GE_FUSEAUX = [['Papeete', -11, '🌺'], ['Los Angeles', -9, '🎬'], ['New York', -6, '🗽'], ['Montréal', -6, '🍁'], ['Rio de Janeiro', -4, '🏖️'], ['Londres', -1, '💂'], ['Paris', 0, '🗼'],
  ['Moscou', 2, '🏰'], ['Dubaï', 3, '🏙️'], ['La Réunion', 3, '🌋'], ['Pékin', 7, '🏯'], ['Tokyo', 8, '🗾'], ['Nouméa', 10, '🐢']];
function geFuseauxMonter(el){
  const cinq = el.dataset.niv === '5e', st = { h: 14, q: null };
  el.innerHTML = `<div class="ge-box">
    <div class="ge-consigne">Quand il fait jour en France, il fait nuit de l'autre côté de la Terre : chaque pays règle ses horloges sur le Soleil. Choisis l'heure à Paris (en hiver) et regarde l'heure ailleurs.</div>
    <div class="ge-curseur"><label>À Paris, il est <b class="ge-hp"></b> <input type="range" min="0" max="23" value="14" data-r="h"></label></div>
    <div class="ge-villes"></div>
    ${cinq ? '<svg class="ge-svg ge-axe" viewBox="0 0 600 70"></svg>' : ''}
    <div class="ge-quiz"><b><span class="gicon">quiz</span></b> <span class="ge-qq"></span> <input type="number" min="0" max="23" data-a="rep" style="width:60px;"> h <button type="button" class="btn" data-a="verif">Vérifier</button></div>
    <div class="ge-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  const heure = (h, d) => { const t = h + d, j = t < 0 ? ' (la veille)' : t > 23 ? ' (le lendemain)' : ''; return [((t % 24) + 24) % 24, j]; };
  const dec = d => cinq ? (d > 0 ? '+' + d : d < 0 ? '−' + (-d) : '0') + ' h' : d > 0 ? d + ' h de plus' : d < 0 ? (-d) + ' h de moins' : 'heure de Paris';
  function rendre(){
    $('.ge-hp').textContent = st.h + ' h';
    $('.ge-villes').innerHTML = GE_FUSEAUX.map(([v, d, e]) => { const [hh, j] = heure(st.h, d), jour = hh >= 7 && hh < 19;
      return `<div class="ge-ville ${jour ? 'jour' : 'nuit'}${v === 'Paris' ? ' paris' : ''}"><span class="ge-ve">${e}</span><b>${v}</b><span class="ge-h">${hh} h<small>${j}</small></span><span class="ge-dec">${dec(d)}</span><span class="gicon">${jour ? 'light_mode' : 'dark_mode'}</span></div>`; }).join('');
    if(cinq){
      let h = '<line x1="20" x2="580" y1="30" y2="30" stroke="#1C1B2E"/>';
      for(let d = -12; d <= 12; d++){ const x = 300 + d * 23; h += `<line x1="${x}" x2="${x}" y1="25" y2="35" stroke="#1C1B2E"/>${d % 3 === 0 ? `<text x="${x}" y="50" font-size="11" text-anchor="middle">${d > 0 ? '+' + d : d < 0 ? '−' + (-d) : 0}</text>` : ''}`; }
      GE_FUSEAUX.forEach(([v, d], i) => { const x = 300 + d * 23; h += `<circle cx="${x}" cy="30" r="4" fill="${v === 'Paris' ? '#C0392B' : '#2F6FB3'}"/><text x="${x}" y="${i % 2 ? 66 : 16}" font-size="9" text-anchor="middle" fill="#4E5665">${v}</text>`; });
      $('.ge-axe').innerHTML = h;
    }
  }
  function quiz(){
    const l = GE_FUSEAUX.filter(f => f[1]), f = l[Math.floor(Math.random() * l.length)], hp = 6 + Math.floor(Math.random() * 14);
    st.q = { f, hp }; $('.ge-qq').innerHTML = `Il est <b>${hp} h</b> à Paris. Quelle heure est-il à <b>${f[0]}</b> ?`; $('[data-a="rep"]').value = '';
  }
  $('[data-a="verif"]').onclick = () => {
    const { f, hp } = st.q, [hh, j] = heure(hp, f[1]), ok = parseInt($('[data-a="rep"]').value, 10) === hh, d = f[1];
    const lignes = cinq ? `<div>Décalage de ${f[0]} : ${dec(d)}.</div><div>${hp} + (${d > 0 ? '+' + d : '−' + (-d)}) = ${hp + d}.</div>${j ? `<div>${hp + d < 0 ? `${hp + d} + 24 = ${hh}` : `${hp + d} − 24 = ${hh}`} : on change de jour.</div>` : ''}`
      : `<div>À Paris : ${hp} h.</div><div>${f[0]} a ${dec(d)}.</div>` + (hp + d < 0
        ? `<div>On recule avant minuit : ${hp} + 24 = ${hp + 24}.</div><div>${hp + 24} − ${-d} = ${hh} : il est ${hh} h la veille.</div>`
        : `<div>${d > 0 ? `${hp} + ${d}` : `${hp} − ${-d}`} = ${hp + d}.</div>` + (hp + d > 23 ? `<div>On passe minuit : ${hp + d} − 24 = ${hh}, il est ${hh} h le lendemain.</div>` : ''));
    geDire(el, `${ok ? '<span class="gicon">celebration</span> Exact :' : '<span class="gicon">info</span> Il est'} <b>${hh} h${j}</b> à ${f[0]}.<div class="ge-etapes">${lignes}</div>`, ok ? 'ok' : 'ko');
    st.h = hp; $('[data-r="h"]').value = hp; rendre(); setTimeout(quiz, 300);
  };
  $('[data-r="h"]').oninput = e => { st.h = +e.target.value; rendre(); };
  rendre(); quiz();
}

/* =====================================================================
   3. Le climat en graphique (climatogrammes, valeurs moyennes arrondies)
   ===================================================================== */
const GE_MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const GE_CLIMATS = {
  Paris: { t: [5, 6, 9, 12, 15, 18, 20, 20, 17, 13, 8, 5], p: [50, 45, 50, 50, 65, 55, 60, 60, 50, 60, 55, 55], e: '🗼' },
  Brest: { t: [7, 7, 9, 10, 13, 15, 17, 17, 16, 13, 10, 8], p: [130, 100, 95, 75, 70, 55, 55, 60, 75, 110, 120, 140], e: '⚓' },
  Strasbourg: { t: [2, 3, 7, 11, 15, 18, 20, 20, 16, 11, 6, 3], p: [35, 35, 40, 50, 80, 75, 80, 70, 60, 55, 50, 45], e: '🥨' },
  Marseille: { t: [7, 8, 11, 14, 18, 22, 25, 24, 21, 17, 11, 8], p: [50, 30, 30, 55, 40, 25, 10, 30, 75, 80, 65, 55], e: '⛵' },
  'Fort-de-France': { t: [26, 26, 26, 27, 28, 28, 28, 28, 28, 28, 27, 26], p: [115, 90, 75, 95, 120, 180, 225, 250, 240, 235, 210, 150], e: '🌴' },
  'Le Caire': { t: [14, 15, 18, 21, 25, 27, 28, 28, 26, 24, 19, 15], p: [5, 4, 4, 1, 0, 0, 0, 0, 0, 1, 3, 5], e: '🐫' },
  Moscou: { t: [-6, -6, -1, 7, 13, 17, 19, 17, 12, 6, -1, -5], p: [50, 40, 35, 40, 50, 80, 85, 80, 65, 70, 55, 50], e: '❄️', rel: true } };
function geClimatMonter(el){
  const cinq = el.dataset.niv === '5e', villes = Object.keys(GE_CLIMATS).filter(v => cinq || !GE_CLIMATS[v].rel), st = { v: 'Paris', q: null };
  el.innerHTML = `<div class="ge-box">
    <div class="ge-consigne">Un <b>climatogramme</b> résume le climat d'une ville : les <b style="color:#2F6FB3">barres</b> donnent la pluie de chaque mois (en millimètres, échelle de droite) et la <b style="color:#C0392B">courbe</b> la température moyenne (en degrés, échelle de gauche).</div>
    <div class="ge-chips">${villes.map(v => `<button type="button" data-v="${v}">${GE_CLIMATS[v].e} ${v}</button>`).join('')}</div>
    <svg class="ge-svg ge-clim" viewBox="0 0 600 300"></svg>
    <div class="ge-quiz"><b><span class="gicon">quiz</span></b> <span class="ge-qq"></span><span class="ge-qr"></span></div>
    <div class="ge-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s);
  function dessiner(){
    const c = GE_CLIMATS[st.v], tmin = cinq ? -10 : 0, tmax = 30, pmax = 300;
    const X = m => 70 + m * 40, Yt = t => 250 - (t - tmin) / (tmax - tmin) * 220, Yp = p => 250 - p / pmax * 220;
    let h = '<rect width="600" height="300" fill="#FCFCFA"/>';
    for(let t = tmin; t <= tmax; t += 5) h += `<line x1="60" x2="550" y1="${Yt(t)}" y2="${Yt(t)}" stroke="#EEE"/><text x="54" y="${Yt(t) + 4}" font-size="11" text-anchor="end" fill="#C0392B">${geS(t)} °C</text>`;
    for(let p = 0; p <= pmax; p += 50) h += `<text x="556" y="${Yp(p) + 4}" font-size="11" fill="#2F6FB3">${p} mm</text>`;
    c.p.forEach((p, m) => { h += `<rect x="${X(m) + 4}" y="${Yp(p)}" width="32" height="${250 - Yp(p)}" fill="#7FB3E0"/><text x="${X(m) + 20}" y="268" font-size="11" text-anchor="middle" fill="#4E5665">${GE_MOIS[m][0].toUpperCase()}</text>`; });
    h += `<polyline points="${c.t.map((t, m) => `${X(m) + 20},${geF(Yt(t))}`).join(' ')}" fill="none" stroke="#C0392B" stroke-width="2.5"/>` + c.t.map((t, m) => `<circle cx="${X(m) + 20}" cy="${geF(Yt(t))}" r="3.5" fill="#C0392B"/>`).join('');
    if(tmin < 0) h += `<line x1="60" x2="550" y1="${Yt(0)}" y2="${Yt(0)}" stroke="#1C1B2E" stroke-dasharray="4 3"/>`;
    h += `<line x1="60" x2="550" y1="250" y2="250" stroke="#1C1B2E"/><text x="300" y="290" font-size="13" text-anchor="middle" font-weight="700" fill="#1C1B2E">${c.e} ${st.v}</text>`;
    $('.ge-clim').innerHTML = h;
    el.querySelectorAll('[data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === st.v));
  }
  function quiz(){
    const c = GE_CLIMATS[st.v], types = ['chaud', 'pluie', 'ecart'].concat(cinq ? ['moyenne'] : []), t = types[Math.floor(Math.random() * types.length)], m = Math.floor(Math.random() * 12);
    const imax = c.t.indexOf(Math.max(...c.t)), tmoy = c.t.reduce((a, b) => a + b, 0) / 12;
    st.q = { t, m, rep: t === 'chaud' ? imax : t === 'pluie' ? c.p[m] : t === 'ecart' ? Math.max(...c.t) - Math.min(...c.t) : tmoy };
    $('.ge-qq').innerHTML = t === 'chaud' ? `À ${st.v}, quel est le mois le plus chaud ?` : t === 'pluie' ? `À ${st.v}, combien de millimètres de pluie tombent en ${GE_MOIS[m]} ?` : t === 'ecart' ? `À ${st.v}, quel est l'écart entre la température du mois le plus chaud et celle du mois le plus froid ?` : `À ${st.v}, quelle est la température moyenne de l'année (au dixième près) ?`;
    $('.ge-qr').innerHTML = t === 'chaud' ? `<span class="ge-mois">${GE_MOIS.map((n, i) => `<button type="button" data-m="${i}">${n.slice(0, 4)}${n.length > 4 ? '.' : ''}</button>`).join('')}</span>`
      : ` <input type="text" inputmode="decimal" data-a="rep" style="width:70px;"> ${t === 'pluie' ? 'mm' : '°C'} <button type="button" class="btn" data-a="verif">Vérifier</button>`;
    el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => corriger(+b.dataset.m));
    const v = $('[data-a="verif"]'); if(v) v.onclick = () => corriger(parseFloat(String($('[data-a="rep"]').value).replace(',', '.')));
  }
  function corriger(r){
    const c = GE_CLIMATS[st.v], q = st.q, tmax = Math.max(...c.t), tmin = Math.min(...c.t);
    const ok = q.t === 'chaud' ? c.t[r] === tmax : q.t === 'moyenne' ? Math.abs(r - q.rep) < .06 : r === q.rep;
    const expl = q.t === 'chaud' ? `Le point le plus haut de la courbe : <b>${GE_MOIS.filter((n, i) => c.t[i] === tmax).join(' et ')}</b> (${geS(tmax)} °C).`
      : q.t === 'pluie' ? `La barre de ${GE_MOIS[q.m]} monte jusqu'à <b>${c.p[q.m]} mm</b>.`
      : q.t === 'ecart' ? `<div class="ge-etapes"><div>Mois le plus chaud : ${geS(tmax)} °C.</div><div>Mois le plus froid : ${geS(tmin)} °C.</div><div>Écart : ${geS(tmax)} − ${tmin < 0 ? '(' + geS(tmin) + ')' : geS(tmin)} = <b>${tmax - tmin} °C</b>.</div></div>`
      : `<div class="ge-etapes"><div>Somme des 12 températures : ${c.t.reduce((a, b) => a + b, 0)}.</div><div>Moyenne : ${c.t.reduce((a, b) => a + b, 0)} ÷ 12 ≈ <b>${geN(q.rep)} °C</b>.</div></div>`;
    geDire(el, (ok ? '<span class="gicon">celebration</span> Bien lu ! ' : '<span class="gicon">info</span> ') + expl, ok ? 'ok' : 'ko');
    setTimeout(quiz, 400);
  }
  el.querySelectorAll('[data-v]').forEach(b => b.onclick = () => { st.v = b.dataset.v; dessiner(); quiz(); geDire(el, ''); });
  dessiner(); quiz();
}

/* =====================================================================
   4. Des sommets aux abysses (altitudes et nombres relatifs)
   ===================================================================== */
const GE_ALT = [['un avion de ligne', 11000, '✈️'], ['le mont Everest', 8849, '🏔️'], ['le Kilimandjaro', 5895, '🌋'], ['le mont Blanc', 4806, '⛰️'], ['Paris', 35, '🗼'], ['le niveau de la mer', 0, '🌊'],
  ['la mer Morte', -430, '🧂'], ['le fond du lac Baïkal', -1186, '🐟'], ['l\'épave du Titanic', -3800, '🚢'], ['la fosse des Mariannes', -10994, '🐙']];
function geAltitudesMonter(el){
  const st = { a: null, b: null };
  el.innerHTML = `<div class="ge-box">
    <div class="ge-consigne">Les altitudes se mesurent à partir du <b>niveau de la mer</b> (0 m) : au-dessus, elles sont positives ; en dessous, négatives. Clique sur deux lieux pour calculer la <b>différence d'altitude</b>.</div>
    <div class="ge-alt-zone"><svg class="ge-svg ge-alt" viewBox="0 0 570 470"></svg></div>
    <div class="ge-actions ge-q"></div>
    <div class="ge-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.ge-alt'), Y = a => 235 - a / 12000 * 215;
  function dessiner(){
    let h = `<rect width="570" height="${Y(0)}" fill="#E4F1FB"/><rect y="${Y(0)}" width="570" height="${470 - Y(0)}" fill="#2E5E8E"/><line x1="0" x2="570" y1="${Y(0)}" y2="${Y(0)}" stroke="#1C1B2E" stroke-width="1.5"/>`;
    h += `<path d="M150,${Y(0)} L215,${Y(8849)} L240,${Y(6000)} L265,${Y(4806)} L330,${Y(0)} Z" fill="#9A8A70"/><path d="M203,${Y(7400)} L215,${Y(8849)} L227,${Y(7400)} Z" fill="#fff"/>`;
    for(let a = -10000; a <= 10000; a += 2000) h += `<line x1="60" x2="66" y1="${Y(a)}" y2="${Y(a)}" stroke="${a < 0 ? '#fff' : '#1C1B2E'}"/><text x="56" y="${Y(a) + 4}" font-size="11" text-anchor="end" fill="${a < 0 ? '#fff' : '#1C1B2E'}">${geS(a)} m</text>`;
    h += `<line x1="63" x2="63" y1="${Y(12000)}" y2="${Y(-11500)}" stroke="#888"/>`;
    let ly = -1e9;
    GE_ALT.forEach((p, i) => {
      const y = Y(p[1]), on = p === st.a || p === st.b, x = 346, fond = p[1] < 0, yl = ly = Math.max(y, ly + 22);
      h += `<g data-p="${i}" style="cursor:pointer"><line x1="63" x2="${x - 8}" y1="${y}" y2="${yl}" stroke="${fond ? '#fff' : '#1C1B2E'}" stroke-opacity="${on ? .9 : .25}" stroke-dasharray="3 3"/><circle cx="63" cy="${y}" r="${on ? 6 : 4}" fill="${on ? '#C0392B' : '#F1C40F'}" stroke="#1C1B2E"/>
        <rect x="${x - 6}" y="${yl - 10}" width="210" height="20" rx="10" fill="${on ? '#C0392B' : fond ? '#1F4A70' : '#fff'}" stroke="${fond ? '#9CC6E8' : '#C9CED6'}"/><text x="${x + 4}" y="${yl + 4}" font-size="11" fill="${on || fond ? '#fff' : '#1C1B2E'}">${p[2]} ${p[0]} : ${geS(p[1])} m</text></g>`;
    });
    svg.innerHTML = h;
    svg.querySelectorAll('[data-p]').forEach(g => g.onclick = () => clic(GE_ALT[+g.dataset.p]));
  }
  function clic(p){
    if(!st.a || st.b){ st.a = p; st.b = null; dessiner(); geDire(el, `${p[0]} (${geS(p[1])} m)… et le deuxième lieu ?`); $('.ge-q').innerHTML = ''; return; }
    if(p === st.a) return;
    st.b = p; dessiner();
    const [h, b] = st.a[1] >= st.b[1] ? [st.a, st.b] : [st.b, st.a];
    geDire(el, `Quelle est la différence d'altitude entre <b>${h[0]}</b> et <b>${b[0]}</b> ?`);
    $('.ge-q').innerHTML = `<label><input type="number" data-a="rep" style="width:90px;"> m</label><button type="button" class="btn" data-a="verif"><span class="gicon">task_alt</span> Vérifier</button>`;
    $('[data-a="verif"]').onclick = () => {
      const d = h[1] - b[1], ok = parseInt($('[data-a="rep"]').value, 10) === d;
      geDire(el, `${ok ? '<span class="gicon">celebration</span> Exact !' : '<span class="gicon">info</span> Voici le calcul :'}<div class="ge-etapes"><div>Différence : altitude la plus haute moins altitude la plus basse.</div><div>${geS(h[1])} − ${b[1] < 0 ? '(' + geS(b[1]) + ')' : geS(b[1])}${b[1] < 0 ? ` = ${geS(h[1])} + ${geS(-b[1])}` : ''} = <b>${geS(d)} m</b>.</div></div>${b[1] < 0 && h[1] > 0 ? 'Soustraire un nombre négatif, c\'est ajouter son opposé : on additionne la hauteur au-dessus de la mer et la profondeur en dessous.' : ''}`, ok ? 'ok' : 'ko');
    };
  }
  dessiner(); geDire(el, 'Clique sur un premier lieu.');
}

/* ---------- Construction ---------- */
function geInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.ge-echelle').forEach(geEchelleMonter);
  racine.querySelectorAll('.ge-fuseaux').forEach(geFuseauxMonter);
  racine.querySelectorAll('.ge-climat').forEach(geClimatMonter);
  racine.querySelectorAll('.ge-altitudes').forEach(geAltitudesMonter);
}

/* =====================================================================
   Page Histoire « Maths et géographie » (sans fraction écrite : lisible du CM1 à la 3e)
   ===================================================================== */
const GE_HISTOIRE_HTML = `
<div class="history-box ge-hist">
  <div class="history-title"><span class="gicon">public</span> Maths et géographie : dessiner et mesurer la Terre</div>

  <h4 class="ge-hist-h">Ptolémée invente la latitude et la longitude (2e siècle)</h4>
  <p>À Alexandrie, en Égypte, le savant grec <b>Claude Ptolémée</b> rassemble dans sa <i>Géographie</i> la position de plus de 8 000 lieux, chacun repéré par deux nombres : sa <b>latitude</b> (au nord ou au sud de l'équateur) et sa <b>longitude</b> (à l'est ou à l'ouest). C'est le même principe qu'un repère du plan… sur une sphère. Son livre, recopié à la main pendant des siècles, guidera les explorateurs jusqu'à la Renaissance.</p>

  <h4 class="ge-hist-h">La carte de Mercator (1569)</h4>
  <p>Comment aplatir une sphère sur une feuille ? C'est impossible sans déformer ! Le Flamand <b>Gérard Mercator</b> invente une carte où les angles sont respectés : un marin peut y tracer sa route en ligne droite avec sa boussole. Mais les pays proches des pôles y paraissent énormes : sur cette carte, le Groenland semble aussi grand que l'Afrique, alors que l'Afrique est 14 fois plus grande !</p>

  <h4 class="ge-hist-h">Les Cassini cartographient la France (1750-1815)</h4>
  <p>Pendant quatre générations, la famille <b>Cassini</b> dessine la première carte précise d'un pays entier. Méthode : couvrir la France d'un réseau de <b>triangles</b> dont on mesure les angles depuis les clochers et les collines ; un seul côté est mesuré au sol, tous les autres se calculent. Résultat : 180 grandes feuilles à l'échelle d'une ligne pour cent toises, soit 1 cm pour 864 m environ.</p>

  <h4 class="ge-hist-h">L'horloge qui trouve la longitude (1761)</h4>
  <p>En mer, la latitude se lit avec la hauteur du Soleil, mais la longitude restait un mystère : des centaines de navires se sont perdus. L'astuce : la Terre fait un tour (360°) en 24 heures, donc <b>1 heure de décalage = 15° de longitude</b>. Il suffit de comparer l'heure du bateau (midi, quand le Soleil est au plus haut) avec l'heure du port de départ… à condition d'avoir une horloge qui ne se dérègle pas sur un bateau qui tangue. L'horloger anglais <b>John Harrison</b> la construit : en 1761, sa montre ne prend que 5 secondes de retard en 81 jours de traversée !</p>

  <h4 class="ge-hist-h">Les trains inventent les fuseaux horaires (1884)</h4>
  <p>Autrefois, chaque ville vivait à sa propre heure, réglée sur le Soleil : midi à Brest arrivait 49 minutes après midi à Strasbourg ! Avec les trains, c'était un casse-tête pour les horaires. En 1884, une conférence internationale à Washington choisit le méridien de <b>Greenwich</b>, près de Londres, comme méridien de référence, et le monde est découpé en <b>24 fuseaux horaires</b> d'une heure chacun.</p>

  <div class="ge-hist-a-toi"><span class="gicon">map</span> <b>À toi !</b> Sur une carte routière ou un atlas, trouve l'<b>échelle</b> (une petite barre graduée dans un coin). Mesure avec ta règle la distance entre ta ville et une ville que tu connais, puis calcule la vraie distance. Compare avec la distance par la route indiquée sur un panneau ou un site d'itinéraire : laquelle est la plus grande ?</div>
</div>`;

(function geStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .ge-box{ display:flex; flex-direction:column; gap:10px; }
    .ge-consigne{ font-size:.95rem; line-height:1.55; }
    .ge-svg{ width:100%; max-width:600px; display:block; margin:0 auto; border-radius:12px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .ge-carte{ max-width:480px; } .ge-alt{ max-width:570px; }
    .ge-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.6; } .ge-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .ge-msg.ok{ color:#1E5E30; } .ge-msg.ko{ color:#9A3A12; }
    .ge-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; font-size:.93rem; }
    .ge-etapes{ display:flex; width:fit-content; max-width:100%; flex-direction:column; gap:3px; text-align:left; margin:6px auto; background:#EEF6EF; border-radius:10px; padding:8px 14px; color:#1C1B2E; }
    .ge-curseur{ text-align:center; font-size:1rem; } .ge-curseur input{ width:min(320px,80%); vertical-align:middle; } .ge-hp{ font:700 1.3rem 'JetBrains Mono',monospace; color:#C0392B; min-width:3.5ch; display:inline-block; }
    .ge-villes{ display:grid; grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); gap:8px; }
    .ge-ville{ display:grid; grid-template-columns:auto 1fr auto; grid-template-areas:"e v i" "e h i" "e d i"; align-items:center; column-gap:8px; border-radius:12px; padding:6px 10px; font-size:.85rem; }
    .ge-ville.jour{ background:#FFF6D6; color:#1C1B2E; } .ge-ville.nuit{ background:#24304F; color:#E8ECF6; } .ge-ville.paris{ outline:2px solid #C0392B; }
    .ge-ve{ grid-area:e; font-size:1.5rem; } .ge-ville b{ grid-area:v; } .ge-h{ grid-area:h; font:700 1.05rem 'JetBrains Mono',monospace; } .ge-h small{ font:400 .7rem Inter,sans-serif; margin-left:3px; }
    .ge-dec{ grid-area:d; font-size:.75rem; opacity:.8; } .ge-ville .gicon{ grid-area:i; font-size:20px; }
    .ge-axe{ max-width:600px; box-shadow:none; }
    .ge-quiz{ background:#EEF6EF; border:1px solid #CFE3D2; border-radius:12px; padding:10px 14px; text-align:center; line-height:2; font-size:.93rem; }
    .ge-quiz .gicon{ vertical-align:-4px; color:#2E7D4F; }
    .ge-chips{ display:flex; flex-wrap:wrap; gap:6px; justify-content:center; }
    .ge-chips button, .ge-mois button{ border:1.5px solid rgba(46,125,79,.3); background:#fff; color:#1E5E30; border-radius:12px; padding:4px 10px; font:600 .85rem Inter,sans-serif; cursor:pointer; }
    .ge-chips button.on{ background:#1E5E30; color:#fff; border-color:#1E5E30; }
    .ge-mois{ display:inline-flex; flex-wrap:wrap; gap:4px; justify-content:center; margin-left:6px; } .ge-mois button{ padding:2px 8px; font-size:.8rem; }
    .ge-hist p{ margin:6px 0 10px; line-height:1.6; }
    .ge-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#1E5E30; margin:16px 0 4px; }
    .ge-hist-a-toi{ margin-top:14px; background:#EEF6EF; border:1px solid #CFE3D2; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .ge-hist-a-toi .gicon{ color:#2E7D4F; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

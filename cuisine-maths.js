/* =====================================================================
   cuisine-maths.js -- Maths et cuisine : trois méthodes animées et une page Histoire.
   Demandé : « fais maintenant maths et cuisine » (après musique, arts et sport).

   1. « Adapter une recette » (CM2, 6e, 5e Proportionnalité) : crêpes, cookies, quatre-quarts ; on change
      le nombre de personnes, les quantités suivent ; « Défi du chef » : l'élève calcule lui-même.
      Au CM2 : passage par l'unité, une opération par ligne, pas de tableau de proportionnalité ;
      en 6e et 5e : tableau de proportionnalité et coefficient.
   2. « Pizza party » (CM2 Fractions, 6e Multiplier des fractions) : n invités mangent chacun a/b de pizza ;
      combien de pizzas commander ? n × a/b, partie entière et reste ; parts servies une à une.
   3. « La recette américaine » (3e Fonctions affines) : °C = (°F − 32) × 5/9 ; graphique, curseur,
      questions (350 °F, 400 °F, l'eau qui bout, la température où les deux échelles sont égales).

   Placement : <div class="cu-recette" data-niv="cm2|6e|5e"></div>, <div class="cu-pizza"></div>,
   <div class="cu-four"></div> ; cuInitTout(conteneur). CU_HISTOIRE_HTML : la page Histoire.
   Fractions : LaTeX (span.tex), rendues par cuTex.
   ===================================================================== */
const cuF = v => (+v).toFixed(1);
const cuN = (v, d) => (Math.round(v * Math.pow(10, d == null ? 2 : d)) / Math.pow(10, d == null ? 2 : d)).toLocaleString('fr-FR', { maximumFractionDigits: d == null ? 2 : d });
const cuFr = (a, b) => `<span class="tex">\\dfrac{${a}}{${b}}</span>`;
const cuTexS = s => `<span class="tex">${s}</span>`;
function cuTex(el){ if(el && typeof renderStaticMath === 'function') renderStaticMath(el); }
function cuDire(el, h, cls){ const m = el.querySelector('.cu-msg'); if(!m) return; m.className = 'cu-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; cuTex(m); }
const cuTxt = (x, y, t, o) => { o = o || {}; return `<text x="${cuF(x)}" y="${cuF(y)}" text-anchor="${o.a || 'middle'}" font-family="Inter,sans-serif" font-size="${o.s || 11}" font-weight="${o.b ? 700 : 400}" fill="${o.c || '#1C1B2E'}">${t}</text>`; };

/* =====================================================================
   1. Adapter une recette
   ===================================================================== */
const CU_RECETTES = [
  { nom: 'Crêpes', pour: 4, qui: 'personnes', max: 16, ingr: [['Farine', 250, 'g'], ['Œufs', 4, ''], ['Lait', 500, 'mL'], ['Beurre fondu', 50, 'g'], ['Sucre', 30, 'g']] },
  { nom: 'Cookies', pour: 12, qui: 'cookies', max: 48, ingr: [['Farine', 200, 'g'], ['Beurre', 100, 'g'], ['Sucre', 120, 'g'], ['Œuf', 1, ''], ['Pépites de chocolat', 100, 'g']] },
  { nom: 'Quatre-quarts', pour: 6, qui: 'parts', max: 24, ingr: [['Œufs', 3, ''], ['Beurre', 150, 'g'], ['Sucre', 150, 'g'], ['Farine', 150, 'g']] }];
const CU_COUL = ['#E9A21C', '#E67E22', '#2F6FB3', '#C08A3A', '#7A4FC0'];
const cuQte = (q, u) => cuN(q, 2) + (u ? ' ' + u : '');
function cuRecetteMonter(el){
  const niv = el.dataset.niv || '6e', cm = niv === 'cm2';
  const st = { r: 0, n: 6, defi: null, score: 0 };
  el.innerHTML = `<div class="cu-box">
    <div class="cu-chips">${CU_RECETTES.map((r, i) => `<button type="button" data-r="${i}">${r.nom}</button>`).join('')}<span class="cu-score"></span></div>
    <div class="cu-consigne"></div>
    <div class="cu-nb"><button type="button" data-a="moins" aria-label="Moins">−</button><b class="cu-nbv"></b><button type="button" data-a="plus" aria-label="Plus">+</button></div>
    <div class="cu-ingr"></div>
    <div class="cu-msg" aria-live="polite"></div>
    <div class="cu-actions"><button type="button" class="btn secondary" data-a="methode"><span class="gicon">calculate</span> La méthode</button><button type="button" class="btn" data-a="defi" style="background:#B7791F;"><span class="gicon">skillet</span> Défi du chef</button></div>
    <div class="cu-calc" hidden></div></div>`;
  const $ = s => el.querySelector(s);
  const R = () => CU_RECETTES[st.r];
  function methode(){
    const r = R(), n = st.n, k = n / r.pour;
    if(cm){ // passage par l'unité, une opération par ligne
      const [nom, q, u] = r.ingr[0];
      return `<b>Méthode : on passe par ${r.qui === 'personnes' ? 'une personne' : r.qui === 'cookies' ? 'un cookie' : 'une part'}.</b>
        <ul class="cu-liste"><li>${nom} pour 1 : ${q} ÷ ${r.pour} = ${cuN(q / r.pour, 3)}${u ? ' ' + u : ''}</li><li>${nom} pour ${n} : ${cuN(q / r.pour, 3)} × ${n} = ${cuQte(q * k, u)}</li></ul>
        On fait de même pour chaque ingrédient.${Number.isInteger(k) ? ` Ici, c'est plus rapide : ${n} = ${r.pour} × ${k}, donc on multiplie chaque quantité par ${k}.` : ''}`;
    }
    const coef = Number.isInteger(k) ? String(k) : cuN(k, 3);
    return `<b>Tableau de proportionnalité</b> : on passe de la première colonne à la seconde en multipliant par le même nombre, le <b>coefficient</b> ${r.pour === n ? '1' : `${n} ÷ ${r.pour} = ${coef}`}.
      <table class="cu-tab"><tr><th>${r.qui}</th><td>${r.pour}</td><td>${n}</td><td rowspan="${r.ingr.length + 1}" class="cu-coef">× ${coef}</td></tr>${r.ingr.map(([nm, q, u]) => `<tr><th>${nm}${u ? ' (' + u + ')' : ''}</th><td>${cuN(q)}</td><td><b>${cuN(q * k)}</b></td></tr>`).join('')}</table>`;
  }
  function rendre(){
    const r = R(), k = st.n / r.pour, mx = Math.max(...r.ingr.map(i => i[1])) * r.max / r.pour;
    el.querySelectorAll('[data-r]').forEach(b => b.classList.toggle('on', +b.dataset.r === st.r));
    $('.cu-consigne').innerHTML = st.defi ? `<b>Défi du chef :</b> prépare des ${r.nom.toLowerCase()} pour <b>${st.n} ${r.qui}</b>. La recette est donnée pour ${r.pour} ${r.qui} : calcule chaque quantité, puis clique sur « Vérifier ».`
      : `Recette de base : <b>${r.nom.toLowerCase()} pour ${r.pour} ${r.qui}</b>. Change le nombre de ${r.qui} : toutes les quantités sont multipliées par le même nombre.`;
    $('.cu-nbv').textContent = st.n + ' ' + r.qui;
    $('.cu-ingr').innerHTML = r.ingr.map(([nm, q, u], i) => {
      const v = q * k, oeuf = !u && !Number.isInteger(Math.round(v * 100) / 100);
      return `<div class="cu-l"><span class="cu-nom">${nm}</span><span class="cu-base">${cuQte(q, u)} pour ${r.pour}</span>
        <span class="cu-barre"><i style="width:${Math.min(100, v / mx * 100).toFixed(1)}%;background:${CU_COUL[i % CU_COUL.length]}"></i></span>
        ${st.defi ? `<span class="cu-saisie"><input type="text" inputmode="decimal" data-i="${i}" aria-label="${nm} pour ${st.n}"> ${u}</span>` : `<b class="cu-v">${cuQte(v, u)}${oeuf ? ' <small>(on arrondit !)</small>' : ''}</b>`}</div>`;
    }).join('');
    if(st.defi) $('.cu-actions [data-a="defi"]').innerHTML = '<span class="gicon">task_alt</span> Vérifier';
    else $('.cu-actions [data-a="defi"]').innerHTML = '<span class="gicon">skillet</span> Défi du chef';
    $('.cu-score').textContent = st.score ? '⭐ ' + st.score : '';
    const c = $('.cu-calc'); if(!c.hidden){ c.innerHTML = methode(); cuTex(c); }
  }
  function verifier(){
    const r = R(), k = st.n / r.pour; let bons = 0;
    el.querySelectorAll('.cu-saisie input').forEach(inp => {
      const i = +inp.dataset.i, [, q, u] = r.ingr[i], v = q * k, x = parseFloat(String(inp.value).replace(',', '.').replace(/\s/g, ''));
      const ok = isFinite(x) && (Math.abs(x - v) < .011 || (!u && Math.abs(x - Math.round(v)) < .011 && Math.abs(v - Math.round(v)) <= .5));
      inp.classList.toggle('bon', ok); inp.classList.toggle('faux', !ok); if(ok) bons++;
    });
    const tout = bons === r.ingr.length;
    if(tout){ st.score++; $('.cu-score').textContent = '⭐ ' + st.score; }
    cuDire(el, tout ? '<span class="gicon">celebration</span> Parfait, chef ! Toutes les quantités sont justes.' : `${bons} quantité${bons > 1 ? 's' : ''} juste${bons > 1 ? 's' : ''} sur ${r.ingr.length}. Corrige celles en rouge (aide : bouton « La méthode »).`, tout ? 'ok' : 'ko');
    if(tout) st.defi = null;
    if(tout) setTimeout(() => { if(!st.defi) rendre(); }, 1600);
  }
  el.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { st.r = +b.dataset.r; st.n = Math.min(R().max, Math.max(1, R().pour + (R().pour > 6 ? 6 : 2))); st.defi = null; cuDire(el, ''); rendre(); });
  $('[data-a="moins"]').onclick = () => { if(st.defi) return; st.n = Math.max(1, st.n - 1); rendre(); };
  $('[data-a="plus"]').onclick = () => { if(st.defi) return; st.n = Math.min(R().max, st.n + 1); rendre(); };
  $('[data-a="methode"]').onclick = () => { const c = $('.cu-calc'); c.hidden = !c.hidden; if(!c.hidden){ c.innerHTML = methode(); cuTex(c); } };
  $('[data-a="defi"]').onclick = () => {
    if(st.defi) return verifier();
    const r = R(); let n; do { n = 1 + Math.floor(Math.random() * r.max); } while(n === r.pour);
    st.defi = true; st.n = n; cuDire(el, ''); rendre();
    const f = el.querySelector('.cu-saisie input'); if(f) f.focus();
  };
  rendre();
}

/* =====================================================================
   2. Pizza party
   ===================================================================== */
const CU_PARTS = [[1, 4], [1, 3], [3, 8], [1, 2], [2, 3], [5, 8], [3, 4]];
const CU_INVITES_C = ['#E35D3A', '#2F6FB3', '#1E8A6E', '#7A4FC0', '#E9A21C', '#B03A7A', '#4E7A9A', '#8A6A2A', '#3A8A3A', '#C0533E', '#5A5AB0', '#A0782A'];
function cuPizzaMonter(el){
  const st = { n: 8, p: 2, t: [] };
  el.innerHTML = `<div class="cu-box">
    <div class="cu-consigne">Tu organises une <b>pizza party</b>. Chaque invité mange la même part de pizza. <b>Combien de pizzas faut-il commander ?</b> Fais ton estimation, puis clique sur « Servir ! ».</div>
    <div class="cu-reglages"><label>Invités <select data-a="n">${[...Array(11)].map((_, i) => `<option value="${i + 2}"${i + 2 === st.n ? ' selected' : ''}>${i + 2}</option>`).join('')}</select></label>
      <span class="cu-fr">Chacun mange ${CU_PARTS.map(([a, b], i) => `<button type="button" data-p="${i}"${i === st.p ? ' class="on"' : ''}>${cuFr(a, b)}</button>`).join('')} de pizza</span>
      <label>Ton estimation <input type="number" min="1" max="12" data-a="g" style="width:60px;"> pizzas</label></div>
    <div class="cu-part"></div>
    <svg class="cu-svg" viewBox="0 0 640 170"></svg>
    <div class="cu-msg" aria-live="polite"></div>
    <div class="cu-actions"><button type="button" class="btn" data-a="go" style="background:#C0533E;"><span class="gicon">local_pizza</span> Servir !</button></div>
    <div class="cu-calc" hidden></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.cu-svg');
  const parts = () => CU_PARTS[st.p];
  function partAff(){ const [a, b] = parts(); $('.cu-part').innerHTML = `Chaque invité mange ${cuFr(a, b)} de pizza : les pizzas sont coupées en <b>${b} parts égales</b>, chacun en prend <b>${a}</b>.`; cuTex($('.cu-part')); }
  function dessiner(servies){
    const [a, b] = parts(), total = st.n * a, nb = Math.ceil(total / b), r = Math.min(56, 600 / Math.max(nb, 1) / 2 - 8), cy = 80;
    let h = '<rect width="640" height="170" fill="#FBF6EE"/>';
    for(let k = 0; k < nb; k++){
      const cx = 320 + (k - (nb - 1) / 2) * (2 * r + 14);
      h += `<circle cx="${cuF(cx)}" cy="${cy}" r="${cuF(r + 3)}" fill="#E2B05A"/>`;
      for(let j = 0; j < b; j++){
        const idx = k * b + j, a0 = -Math.PI / 2 + j * 2 * Math.PI / b, a1 = a0 + 2 * Math.PI / b, inv = idx < Math.min(servies, total) ? Math.floor(idx / a) : -1;
        const P = t => [cx + r * Math.cos(t), cy + r * Math.sin(t)], p0 = P(a0), p1 = P(a1);
        h += `<path d="M${cuF(cx)},${cy} L${cuF(p0[0])},${cuF(p0[1])} A${cuF(r)},${cuF(r)} 0 ${b === 1 ? 1 : 0} 1 ${cuF(p1[0])},${cuF(p1[1])} Z" fill="${inv >= 0 ? CU_INVITES_C[inv % CU_INVITES_C.length] : '#F3D9A0'}" fill-opacity="${inv >= 0 ? .85 : 1}" stroke="#B5762E" stroke-width="1.4"/>`;
        if(inv >= 0 && r > 28){ const m = P((a0 + a1) / 2), q = [cx + (m[0] - cx) * .62, cy + (m[1] - cy) * .62]; h += cuTxt(q[0], q[1] + 4, inv + 1, { s: 10, b: true, c: '#fff' }); }
      }
      h += cuTxt(cx, cy + r + 18, 'pizza ' + (k + 1), { s: 10.5, c: '#7A5530' });
    }
    svg.innerHTML = h;
  }
  function calcul(){
    const [a, b] = parts(), n = st.n, t = n * a, q = Math.floor(t / b), rr = t % b, nb = Math.ceil(t / b);
    const l = [`Chaque invité mange ${cuFr(a, b)} de pizza.`, `${n} invités : ${cuTexS(`${n} \\times \\dfrac{${a}}{${b}} = \\dfrac{${t}}{${b}}`)}`];
    if(rr === 0) l.push(`${cuTexS(`\\dfrac{${t}}{${b}} = ${q}`)} : il faut exactement <b>${q} pizza${q > 1 ? 's' : ''}</b>, rien ne reste.`);
    else { l.push(`${cuTexS(`\\dfrac{${t}}{${b}} = ${q} + \\dfrac{${rr}}{${b}}`)} : ${q} pizza${q > 1 ? 's' : ''} ne suffi${q > 1 ? 'sent' : 't'} pas.`); l.push(`Il faut commander <b>${nb} pizzas</b>. Il restera ${cuFr(b - rr, b)} de pizza.`); }
    return `<ul class="cu-liste">${l.map(x => `<li>${x}</li>`).join('')}</ul>`;
  }
  function servir(){
    st.t.forEach(clearTimeout); st.t = [];
    const [a, b] = parts(), total = st.n * a, nb = Math.ceil(total / b), g = parseInt($('[data-a="g"]').value, 10);
    for(let s = 0; s <= total; s++) st.t.push(setTimeout(() => dessiner(s), s * Math.max(60, 1600 / total)));
    st.t.push(setTimeout(() => {
      cuDire(el, isFinite(g) ? (g === nb ? `<span class="gicon">celebration</span> Bonne estimation : il faut bien <b>${nb} pizzas</b> !` : `<span class="gicon">info</span> Tu avais prévu ${g} pizza${g > 1 ? 's' : ''} : il en faut <b>${nb}</b>.`) : `Il faut <b>${nb} pizzas</b>.`, isFinite(g) && g === nb ? 'ok' : (isFinite(g) ? 'ko' : ''));
      const c = $('.cu-calc'); c.hidden = false; c.innerHTML = calcul(); cuTex(c);
    }, (total + 1) * Math.max(60, 1600 / total)));
  }
  const raz = () => { st.t.forEach(clearTimeout); st.n = +$('[data-a="n"]').value; el.querySelectorAll('[data-p]').forEach(b => b.classList.toggle('on', +b.dataset.p === st.p)); partAff(); dessiner(0); cuDire(el, ''); $('.cu-calc').hidden = true; };
  $('[data-a="n"]').onchange = raz;
  el.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { st.p = +b.dataset.p; raz(); });
  cuTex($('.cu-reglages'));
  $('[data-a="go"]').onclick = servir;
  partAff(); dessiner(0);
}

/* =====================================================================
   3. La recette américaine : degrés Fahrenheit et fonction affine
   ===================================================================== */
const cuC = f => (f - 32) * 5 / 9;
const CU_FOUR_Q = [
  { q: 'La recette de cookies dit : « cuire à <b>350 °F</b> ». Quelle température régler sur un four en °C ?', rep: cuC(350), tol: 1.5, u: '°C', corr: '(350 − 32) × 5 ÷ 9 ≈ 176,7 °C, soit environ 180 °C (thermostat 6).' },
  { q: 'Pour des muffins : <b>400 °F</b>. Combien en °C ?', rep: cuC(400), tol: 1.5, u: '°C', corr: '(400 − 32) × 5 ÷ 9 ≈ 204,4 °C, soit environ 200 °C.' },
  { q: 'L\'eau bout à <b>100 °C</b>. Combien cela fait-il en °F ? (Cherche le nombre de °F qui donne 100 °C.)', rep: 212, tol: 1, u: '°F', corr: 'On résout (F − 32) × 5 ÷ 9 = 100 : F − 32 = 180, donc F = 212 °F.' },
  { q: 'À quelle température les deux thermomètres affichent-ils <b>le même nombre</b> ?', rep: -40, tol: 1, u: '', corr: 'On résout (x − 32) × 5 ÷ 9 = x : 5x − 160 = 9x, donc x = −40. −40 °F = −40 °C : sur le graphique, c\'est là que la droite coupe la droite d\'équation y = x.' }];
function cuFourMonter(el){
  const st = { F: 350, q: 0, score: 0, faits: new Set() };
  el.innerHTML = `<div class="cu-box">
    <div class="cu-consigne">Les recettes américaines donnent la température du four en <b>degrés Fahrenheit</b> (°F). Pour convertir en degrés Celsius : <b>°C = (°F − 32) × 5 ÷ 9</b>. C'est une <b>fonction affine</b> : ${cuTexS('f(x) = \\dfrac{5}{9}x - \\dfrac{160}{9}')}. Fais glisser le curseur.</div>
    <div class="cu-curseur"><input type="range" min="-60" max="480" step="1" value="350" aria-label="Température en degrés Fahrenheit"><span class="cu-lect"></span></div>
    <svg class="cu-svg" viewBox="0 0 640 300"></svg>
    <div class="cu-quiz"></div>
    <div class="cu-msg" aria-live="polite"></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.cu-svg');
  cuTex($('.cu-consigne'));
  const gx = 60, gy = 250, gw = 560, gh = 230, X = f => gx + (f + 60) / 540 * gw, Y = c => gy - (c + 60) / 320 * gh;
  function dessiner(){
    let h = '<rect width="640" height="300" fill="#fff"/>';
    for(let f = -60; f <= 480; f += 60) h += `<line x1="${cuF(X(f))}" y1="${gy}" x2="${cuF(X(f))}" y2="${gy - gh}" stroke="#EEF2F7"/>` + cuTxt(X(f), gy + 14, f, { s: 9.5, c: '#5B6472' });
    for(let c = -60; c <= 260; c += 40) h += `<line x1="${gx}" y1="${cuF(Y(c))}" x2="${gx + gw}" y2="${cuF(Y(c))}" stroke="#EEF2F7"/>` + cuTxt(gx - 6, Y(c) + 3, c, { a: 'end', s: 9.5, c: '#5B6472' });
    h += `<line x1="${cuF(X(0))}" y1="${gy}" x2="${cuF(X(0))}" y2="${gy - gh}" stroke="#9AA5B4"/><line x1="${gx}" y1="${cuF(Y(0))}" x2="${gx + gw}" y2="${cuF(Y(0))}" stroke="#9AA5B4"/>`;
    h += cuTxt(gx + gw, gy + 28, 'température en °F', { a: 'end', s: 10.5 }) + cuTxt(gx + 4, gy - gh - 6, 'température en °C', { a: 'start', s: 10.5 });
    // y = x (pointillés) et la droite de la fonction.
    h += `<line x1="${cuF(X(-60))}" y1="${cuF(Y(-60))}" x2="${cuF(X(260))}" y2="${cuF(Y(260))}" stroke="#B9C2CF" stroke-dasharray="5 4"/>` + cuTxt(X(225), Y(240), 'y = x', { s: 10, c: '#8A93A2' });
    h += `<line x1="${cuF(X(-60))}" y1="${cuF(Y(cuC(-60)))}" x2="${cuF(X(480))}" y2="${cuF(Y(cuC(480)))}" stroke="#C0533E" stroke-width="2.6"/>`;
    [[32, 'l\'eau gèle'], [212, 'l\'eau bout'], [350, 'cookies'], [-40, '−40 = −40']].forEach(([f, t]) => { h += `<circle cx="${cuF(X(f))}" cy="${cuF(Y(cuC(f)))}" r="3.5" fill="#1C1B2E"/>` + cuTxt(X(f) + 6, Y(cuC(f)) + 14, t, { a: 'start', s: 9.5, c: '#5B6472' }); });
    const F = st.F, C = cuC(F);
    h += `<line x1="${cuF(X(F))}" y1="${gy}" x2="${cuF(X(F))}" y2="${cuF(Y(C))}" stroke="#2F6FB3" stroke-dasharray="4 3"/><line x1="${gx}" y1="${cuF(Y(C))}" x2="${cuF(X(F))}" y2="${cuF(Y(C))}" stroke="#2F6FB3" stroke-dasharray="4 3"/><circle cx="${cuF(X(F))}" cy="${cuF(Y(C))}" r="6" fill="#2F6FB3" stroke="#fff" stroke-width="2"/>`;
    svg.innerHTML = h;
    $('.cu-lect').innerHTML = `${F} °F → (${F} − 32) × 5 ÷ 9 ≈ <b>${cuN(C, 1)} °C</b>${C >= 30 && C <= 300 ? ` · thermostat ≈ ${cuN(C / 30, 1)}` : ''}`;
  }
  function question(){
    const Q = CU_FOUR_Q[st.q];
    $('.cu-quiz').innerHTML = `<b>Question ${st.q + 1} / ${CU_FOUR_Q.length}</b> · ${Q.q} <span class="cu-saisie"><input type="text" inputmode="decimal" aria-label="Réponse"> ${Q.u}</span> <button type="button" class="btn qz-mini" data-a="ok">Vérifier</button> <button type="button" class="btn secondary qz-mini" data-a="suiv">Question suivante</button>`;
    $('[data-a="ok"]').onclick = () => {
      const x = parseFloat(String($('.cu-quiz input').value).replace(',', '.').replace('−', '-'));
      const ok = isFinite(x) && Math.abs(x - Q.rep) <= Q.tol;
      if(ok && !st.faits.has(st.q)){ st.faits.add(st.q); st.score++; }
      cuDire(el, (ok ? '<span class="gicon">celebration</span> Juste ! ' : '<span class="gicon">info</span> Pas tout à fait. ') + Q.corr + (st.score ? ` ⭐ ${st.score}` : ''), ok ? 'ok' : 'ko');
    };
    $('[data-a="suiv"]').onclick = () => { st.q = (st.q + 1) % CU_FOUR_Q.length; cuDire(el, ''); question(); };
  }
  $('input[type=range]').oninput = e => { st.F = +e.target.value; dessiner(); };
  dessiner(); question();
}

/* ---------- Construction ---------- */
function cuInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.cu-recette').forEach(cuRecetteMonter);
  racine.querySelectorAll('.cu-pizza').forEach(cuPizzaMonter);
  racine.querySelectorAll('.cu-four').forEach(cuFourMonter);
}

/* =====================================================================
   Onglet Histoire « Maths et cuisine » (sans fraction écrite : lisible du CM2 à la 3e sans rendu LaTeX)
   ===================================================================== */
const CU_HISTOIRE_HTML = `
<div class="history-box cu-hist">
  <div class="history-title"><span class="gicon">skillet</span> Maths et cuisine : peser, partager, convertir</div>

  <h4 class="cu-hist-h">Les plus vieilles recettes du monde… babyloniennes</h4>
  <p>Les plus anciennes recettes écrites que l'on connaisse ont près de <b>4 000 ans</b> : ce sont des tablettes d'argile de Mésopotamie (l'Irak actuel), conservées à l'université Yale, aux États-Unis. On y lit des recettes de ragoûts. Les Babyloniens étaient aussi de grands calculateurs : ils comptaient en base 60, et c'est d'eux que viennent nos 60 minutes dans une heure… et nos minuteurs de cuisine !</p>

  <h4 class="cu-hist-h">Une livre ici, une autre livre là-bas</h4>
  <p>Avant la Révolution française, chaque région avait ses unités : la livre, l'once, la pinte… et une livre de Paris ne pesait pas autant qu'une livre de Lyon ! En <b>1795</b>, le système métrique définit le <b>gramme</b> comme la masse d'un centimètre cube d'eau, et le <b>litre</b> comme le volume d'un décimètre cube. Une même recette peut enfin être refaite partout à l'identique.</p>

  <h4 class="cu-hist-h">« Une pincée », « un verre », « gros comme un œuf »</h4>
  <p>Pendant longtemps, les livres de cuisine donnaient des quantités approximatives. En <b>1896</b>, l'Américaine <b>Fannie Farmer</b> publie un livre de recettes à Boston où toutes les mesures sont précises et prises « à ras bord ». On la surnomme « la mère des mesures exactes ». Aujourd'hui encore, les recettes américaines utilisent des tasses (les <i>cups</i>) et des cuillères… et des degrés Fahrenheit.</p>

  <h4 class="cu-hist-h">Fahrenheit, Celsius et le thermostat</h4>
  <p>L'Allemand <b>Daniel Fahrenheit</b> invente son échelle de température en <b>1724</b> : l'eau y gèle à 32 °F et bout à 212 °F. Le Suédois <b>Anders Celsius</b> propose la sienne en <b>1742</b>… mais à l'envers : 0 pour l'eau qui bout et 100 pour la glace ! L'échelle est retournée peu après sa mort, pour devenir celle que nous utilisons. Sur les fours français, le thermostat donne à peu près la température divisée par 30 : thermostat 6, c'est environ 180 °C.</p>

  <h4 class="cu-hist-h">Le quatre-quarts : une recette en fractions</h4>
  <p>Le <b>quatre-quarts</b> breton porte son nom de sa recette : quatre ingrédients, chacun <b>un quart</b> de la pâte. Beurre, sucre, farine et œufs ont exactement la même masse. Pas besoin de livre de recettes : il suffit de peser les œufs !</p>

  <h4 class="cu-hist-h">Combien de pizzas différentes ?</h4>
  <p>Une pizzeria propose 8 garnitures. Pour chacune, on a deux choix : on la met ou non. Il y a donc 2 × 2 × 2 × 2 × 2 × 2 × 2 × 2 = 2<sup>8</sup> = <b>256 pizzas différentes</b> (en comptant la pizza nature). Avec 20 garnitures, il y en aurait plus d'un million : c'est la force des puissances !</p>

  <div class="cu-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Fais un quatre-quarts. Pèse 3 œufs dans leur coquille (souvent entre 150 g et 180 g), puis prends <b>la même masse</b> de beurre fondu, de sucre et de farine. Pour un gâteau deux fois plus gros, combien d'œufs faudrait-il ? Et quelle masse de farine ?</div>
</div>`;

(function cuStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .cu-box{ display:flex; flex-direction:column; gap:10px; }
    .cu-chips{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
    .cu-chips button{ border:1.5px solid rgba(122,85,48,.35); background:#fff; color:#5A3E22; border-radius:999px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; }
    .cu-chips button.on{ background:#7A5530; color:#fff; border-color:#7A5530; }
    .cu-score{ margin-left:auto; font:700 .95rem 'Space Grotesk',sans-serif; color:#B7791F; }
    .cu-consigne, .cu-part{ font-size:.95rem; line-height:1.55; }
    .cu-nb{ display:flex; align-items:center; justify-content:center; gap:14px; }
    .cu-nb button{ width:36px; height:36px; border-radius:50%; border:1.5px solid #7A5530; background:#fff; color:#7A5530; font:700 1.2rem Inter,sans-serif; cursor:pointer; }
    .cu-nbv{ font:700 1.15rem 'Space Grotesk',sans-serif; min-width:130px; text-align:center; }
    .cu-ingr{ display:flex; flex-direction:column; gap:6px; }
    .cu-l{ display:grid; grid-template-columns:minmax(110px,1.2fr) minmax(90px,1fr) 2fr minmax(110px,1fr); gap:8px; align-items:center; background:#FBF6EE; border-radius:10px; padding:6px 10px; }
    .cu-nom{ font-weight:700; } .cu-base{ color:#7A6A55; font-size:.85rem; }
    .cu-barre{ height:12px; background:#EFE6D6; border-radius:6px; overflow:hidden; } .cu-barre i{ display:block; height:100%; border-radius:6px; transition:width .35s; }
    .cu-v{ text-align:right; } .cu-v small{ color:#B3261E; font-weight:600; }
    .cu-saisie input{ width:80px; padding:4px 6px; border:1.5px solid #C9D6E6; border-radius:8px; font:inherit; text-align:right; }
    .cu-saisie input.bon{ border-color:#1E7B34; background:#EAF6EC; } .cu-saisie input.faux{ border-color:#B3261E; background:#FDECEA; }
    .cu-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.55; } .cu-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .cu-msg.ok{ color:#1E5E30; } .cu-msg.ko{ color:#9A3A12; }
    .cu-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
    .cu-calc{ background:#FBF6EE; border:1px solid #EAD9BD; border-radius:10px; padding:10px 14px; line-height:1.7; }
    .cu-liste{ margin:4px 0; padding-left:20px; }
    .cu-tab{ margin:8px auto; border-collapse:collapse; font-size:.9rem; } .cu-tab th, .cu-tab td{ border:1px solid #D9C7A8; padding:3px 10px; text-align:center; } .cu-tab th{ background:#F5EBDA; text-align:left; }
    .cu-coef{ border:none !important; color:#B7791F; font-weight:700; font-size:1rem; }
    .cu-reglages{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; font-size:.92rem; }
    .cu-fr{ display:inline-flex; align-items:center; gap:5px; flex-wrap:wrap; } .cu-fr button{ border:1.5px solid rgba(192,83,62,.4); background:#fff; border-radius:10px; padding:2px 8px; cursor:pointer; } .cu-fr button.on{ background:#C0533E; color:#fff; border-color:#C0533E; }
    .cu-reglages select, .cu-reglages input{ padding:4px 6px; border-radius:8px; border:1px solid #C9D6E6; font:inherit; }
    .cu-svg{ width:100%; max-width:680px; display:block; margin:0 auto; border-radius:10px; box-shadow:0 1px 6px rgba(28,27,46,.15); }
    .cu-curseur{ display:flex; gap:12px; align-items:center; justify-content:center; flex-wrap:wrap; } .cu-curseur input{ width:min(420px,90%); }
    .cu-lect{ font-family:'JetBrains Mono',monospace; font-size:.9rem; }
    .cu-quiz{ background:#F6F8FB; border:1px solid #DDE5EF; border-radius:10px; padding:10px 14px; line-height:2; }
    .cu-hist p{ margin:6px 0 10px; line-height:1.6; }
    .cu-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#7A4A1E; margin:16px 0 4px; }
    .cu-hist-a-toi{ margin-top:14px; background:#FBEFDF; border:1px solid #EBCB9A; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .cu-hist-a-toi .gicon{ color:#B7791F; vertical-align:-4px; }
    @media (max-width:600px){ .cu-l{ grid-template-columns:1fr 1fr; } .cu-barre{ grid-column:1 / -1; } }
  `;
  document.head.appendChild(s);
})();

/* =====================================================================
   tables-cercle.js -- « Les tables de multiplication sur le cercle » (5e, Divisibilité).
   Demandé : « Dans la conversation Tables de multiplication en cercle, peux-tu récupérer le code pour
   l'intégrer à un chapitre bien choisi ? » -- repris de l'artefact « Tables sur le cercle », adapté au
   site (polices et couleurs du site, vocabulaire de 5e : « reste de la division euclidienne » plutôt
   que « modulo »).

   Les nombres de 0 à n − 1 sont répartis sur un cercle. Pour la table de k, chaque nombre i est relié
   au reste de la division euclidienne de k × i par n. Table de 2 : une cardioïde ; table de 3 : une
   néphroïde… Survol (ou toucher) d'un point : le calcul « i × k = q × n + r » s'affiche.
   Placement : <div class="tc-cercle"></div> ; tcInitTout(conteneur) à l'ouverture du chapitre.
   ===================================================================== */
function tcMonter(el){
  el.innerHTML = `<div class="tc-box">
    <div class="tc-stage"><div class="tc-canvas"><canvas aria-label="Cercle des tables de multiplication"></canvas></div><div class="tc-lecture" aria-live="polite"></div></div>
    <div class="tc-panneau">
      <div class="tc-grp"><label class="tc-lab">Nombre de points n (on divise par n)</label>
        <div class="tc-ligne"><input type="range" data-a="nR" min="2" max="300" step="1" value="10"><input type="number" data-a="nN" min="2" max="300" value="10" aria-label="n"></div></div>
      <div class="tc-grp"><div class="tc-tete"><label class="tc-lab">Table de k</label><span class="tc-formule"></span></div>
        <div class="tc-ligne"><input type="range" data-a="kR" min="0" max="10" step="0.01" value="2"><input type="number" data-a="kN" min="0" step="0.01" value="2" aria-label="k"></div>
        <div class="tc-ligne"><button type="button" data-a="kM">−1</button><button type="button" data-a="kP">+1</button><button type="button" class="tc-prim" data-a="jouer">Animer</button>
          <label class="tc-lab" style="margin-left:auto;">vitesse</label><input type="range" data-a="v" min="0.02" max="3" step="0.01" value="0.25" style="width:90px;" aria-label="Vitesse"></div></div>
      <div class="tc-grp"><span class="tc-lab">Couleurs</span>
        <div class="tc-seg">${[['encre', 'Encre'], ['arc', 'Arc-en-ciel'], ['long', 'Longueur']].map(([v, t]) => `<button type="button" data-c="${v}"${v === 'arc' ? ' class="on"' : ''}>${t}</button>`).join('')}</div>
        <div class="tc-ligne"><label><input type="checkbox" data-a="nb" checked> nombres</label><label><input type="checkbox" data-a="pts" checked> points</label></div></div>
      <div class="tc-grp"><span class="tc-lab">Figures célèbres</span>
        <div class="tc-presets">${[[2, 10], [2, 200], [3, 200], [4, 200], [7, 300], [21, 200], [34, 200], [51, 100]].map(([k, n]) => `<button type="button" data-k="${k}" data-n="${n}">table de ${k} <span>· ${n} points</span></button>`).join('')}</div>
        <p class="tc-note">Table de 2 : une <b>cardioïde</b> (en forme de cœur) ; table de 3 : une <b>néphroïde</b> (en forme de rein) ; table de k : une courbe à k − 1 « pétales ».</p></div>
      <div class="tc-grp"><span class="tc-lab">i → reste de k × i par n</span><div class="tc-paires"></div></div>
    </div></div>`;
  const $ = s => el.querySelector(s), canvas = $('canvas'), ctx = canvas.getContext('2d'), boite = $('.tc-canvas');
  const st = { n: 10, k: 2, coul: 'arc', nb: true, pts: true, joue: false, survol: null, epingle: null };
  let taille = 500, R = 0, cx = 0, cy = 0, marge = 30;
  const mod = (a, n) => ((a % n) + n) % n, entier = x => Math.abs(x - Math.round(x)) < 1e-9;
  const ecr = x => (entier(x) ? String(Math.round(x)) : x.toFixed(2).replace('.', ','));
  const angle = x => -Math.PI / 2 + 2 * Math.PI * x / st.n, pt = x => [cx + R * Math.cos(angle(x)), cy + R * Math.sin(angle(x))];
  const ENCRE = '#1C1B2E', DOUX = '#5B6472', FILET = '#D5DEE9', ACC = '#2F6FB3', FOND = '#FFFFFF';
  function redim(){ const dpr = window.devicePixelRatio || 1; taille = boite.clientWidth; if(!taille) return; canvas.width = Math.round(taille * dpr); canvas.height = Math.round(taille * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); dessiner(); }
  function couleur(i, t){
    if(st.coul === 'arc') return `hsl(${(360 * i / st.n).toFixed(1)} 70% 44%)`;
    if(st.coul === 'long'){ const d = Math.abs(Math.sin(Math.PI * (t - i) / st.n)); return `hsl(${(210 + d * 130).toFixed(1)} 72% ${42 + d * 4}%)`; }
    return null;
  }
  function dessiner(){
    if(!taille) return;
    const { n, k } = st;
    marge = st.nb ? Math.max(22, taille * .055) : 12; cx = cy = taille / 2; R = taille / 2 - marge;
    ctx.clearRect(0, 0, taille, taille);
    ctx.lineWidth = 1; ctx.strokeStyle = FILET; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 2 * Math.PI); ctx.stroke();
    const alpha = Math.max(.35, Math.min(.9, 1.1 - n / 500));
    ctx.lineWidth = n > 200 ? .8 : n > 100 ? 1 : 1.4;
    ctx.globalAlpha = (st.survol ?? st.epingle) !== null ? alpha * .45 : alpha;
    const mono = st.coul === 'encre';
    if(mono){ ctx.strokeStyle = ACC; ctx.beginPath(); }
    for(let i = 0; i < n; i++){
      const t = mod(k * i, n), [x1, y1] = pt(i), [x2, y2] = pt(t);
      if(mono){ ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); continue; }
      ctx.strokeStyle = couleur(i, t); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    if(mono) ctx.stroke();
    ctx.globalAlpha = 1;
    if(st.pts && n <= 300){ ctx.fillStyle = ENCRE; const r = n > 150 ? 1.3 : n > 60 ? 2 : 3; for(let i = 0; i < n; i++){ const [x, y] = pt(i); ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill(); } }
    const fpx = Math.max(10, Math.min(14, taille / 44));
    if(st.nb){
      const ecart = 2 * Math.PI * R / n, pas = [1, 2, 5, 10, 20, 25, 50, 100].find(s => ecart * s >= fpx * 2.1) || n;
      ctx.font = `400 ${fpx}px "JetBrains Mono", monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = DOUX;
      for(let i = 0; i < n; i += pas){ const a = angle(i), rr = R + marge * .52; ctx.fillText(String(i), cx + rr * Math.cos(a), cy + rr * Math.sin(a)); }
    }
    const h = st.survol ?? st.epingle;
    if(h !== null && h < n){
      const t = mod(k * h, n), [x1, y1] = pt(h), [x2, y2] = pt(t);
      ctx.strokeStyle = ACC; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      [[x1, y1, true], [x2, y2, false]].forEach(([x, y, plein]) => { ctx.beginPath(); ctx.arc(x, y, 5.5, 0, 2 * Math.PI); ctx.fillStyle = plein ? ACC : FOND; ctx.fill(); ctx.lineWidth = 2; ctx.strokeStyle = ACC; ctx.stroke(); });
      ctx.font = `600 ${fpx + 1}px "JetBrains Mono", monospace`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      [[h, String(h)], [t, ecr(t)]].forEach(([v, txt]) => { const a = angle(v), rr = R - 16, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a), w = ctx.measureText(txt).width + 8;
        ctx.fillStyle = FOND; ctx.fillRect(x - w / 2, y - fpx * .75, w, fpx * 1.5); ctx.fillStyle = ENCRE; ctx.fillText(txt, x, y); });
    }
    lecture();
  }
  function lecture(){
    const h = st.survol ?? st.epingle, { n, k } = st, l = $('.tc-lecture');
    if(h === null || h >= n){ l.innerHTML = '<span class="tc-aide">Survole ou touche un point du cercle pour lire son calcul.</span>'; return; }
    const p = k * h, t = mod(p, n), q = Math.floor(p / n);
    l.innerHTML = `<span>${h} × ${ecr(k)} = ${ecr(p)}</span><span>= ${q} × ${n} + <b>${ecr(t)}</b></span><span>donc ${h} est relié à <b>${ecr(t)}</b> (le reste de la division par ${n})</span>`
      + (st.epingle !== null ? '<span class="tc-aide">point épinglé : touche-le à nouveau pour le libérer</span>' : '');
  }
  function paires(){
    const l = $('.tc-paires'), { n, k } = st;
    if(n > 120){ l.innerHTML = '<p class="tc-note" style="grid-column:1/-1">Liste affichée jusqu\'à 120 points.</p>'; return; }
    l.innerHTML = [...Array(n).keys()].map(i => { const t = mod(k * i, n), fixe = entier(t) && Math.round(t) === i; return `<span${fixe ? ' class="fixe" title="le point reste à sa place"' : ''}>${i} → <b>${ecr(t)}</b></span>`; }).join('');
  }
  function synchro(){ $('[data-a="nR"]').value = st.n; $('[data-a="nN"]').value = st.n; $('[data-a="kR"]').max = st.n; $('[data-a="kR"]').value = st.k; $('[data-a="kN"]').value = ecr(st.k).replace(',', '.'); $('.tc-formule').textContent = `i → reste de ${ecr(st.k)} × i par ${st.n}`; }
  function setN(v){ v = Math.round(Number(v)); if(!isFinite(v)) return; st.n = Math.max(2, Math.min(300, v)); if(st.k > st.n) st.k = mod(st.k, st.n); if(st.epingle !== null && st.epingle >= st.n) st.epingle = null; synchro(); paires(); dessiner(); }
  function setK(v){ v = Number(String(v).replace(',', '.')); if(!isFinite(v)) return; st.k = Math.round(Math.max(0, Math.min(st.n, v)) * 100) / 100; synchro(); paires(); dessiner(); }
  $('[data-a="nR"]').oninput = e => setN(e.target.value); $('[data-a="nN"]').onchange = e => setN(e.target.value);
  $('[data-a="kR"]').oninput = e => setK(e.target.value); $('[data-a="kN"]').onchange = e => setK(e.target.value);
  $('[data-a="kM"]').onclick = () => setK(Math.max(0, Math.ceil(st.k) - 1)); $('[data-a="kP"]').onclick = () => setK(Math.min(st.n, Math.floor(st.k) + 1));
  el.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { st.coul = b.dataset.c; el.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === b)); dessiner(); });
  $('[data-a="nb"]').onchange = e => { st.nb = e.target.checked; dessiner(); }; $('[data-a="pts"]').onchange = e => { st.pts = e.target.checked; dessiner(); };
  $('.tc-presets').onclick = e => { const b = e.target.closest('button'); if(!b) return; st.epingle = null; setN(b.dataset.n); setK(b.dataset.k); };
  // Animation : k avance en continu (entre deux tables, il passe par des nombres décimaux).
  let avant = 0;
  const tic = now => { if(!st.joue || !el.isConnected) { st.joue = false; return; } const dt = Math.min(.1, (now - avant) / 1000); avant = now;
    st.k = mod(st.k + Number($('[data-a="v"]').value) * dt, st.n); $('[data-a="kR"]').value = st.k; $('[data-a="kN"]').value = st.k.toFixed(2); $('.tc-formule').textContent = `i → reste de ${st.k.toFixed(2).replace('.', ',')} × i par ${st.n}`; dessiner(); requestAnimationFrame(tic); };
  $('[data-a="jouer"]').onclick = e => { st.joue = !st.joue; e.target.textContent = st.joue ? 'Pause' : 'Animer'; if(st.joue){ avant = performance.now(); requestAnimationFrame(tic); } else setK(st.k); };
  const indice = e => { const r = canvas.getBoundingClientRect(), x = e.clientX - r.left - cx, y = e.clientY - r.top - cy, d = Math.hypot(x, y); if(d < R * .6 || d > R + marge) return null; const a = mod(Math.atan2(y, x) + Math.PI / 2, 2 * Math.PI); return mod(Math.round(a / (2 * Math.PI) * st.n), st.n); };
  canvas.addEventListener('pointermove', e => { if(e.pointerType === 'touch') return; const i = indice(e); if(i !== st.survol){ st.survol = i; if(!st.joue) dessiner(); } });
  canvas.addEventListener('pointerleave', () => { st.survol = null; if(!st.joue) dessiner(); });
  canvas.addEventListener('click', e => { const i = indice(e); st.epingle = (i === null || i === st.epingle) ? null : i; st.survol = null; if(!st.joue) dessiner(); });
  new ResizeObserver(redim).observe(boite);
  synchro(); paires(); redim();
}
function tcInitTout(racine){ if(racine) racine.querySelectorAll('.tc-cercle').forEach(tcMonter); }

(function tcStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .tc-box{ display:grid; grid-template-columns:minmax(0,1fr) 320px; gap:18px; align-items:start; text-align:left; }
    @media (max-width:860px){ .tc-box{ grid-template-columns:minmax(0,1fr); } }
    .tc-stage{ background:#fff; border:1px solid #D5DEE9; border-radius:10px; padding:10px; min-width:0; }
    .tc-canvas{ position:relative; width:100%; aspect-ratio:1; } .tc-canvas canvas{ display:block; width:100%; height:100%; touch-action:none; cursor:crosshair; }
    .tc-lecture{ font:500 .92rem 'JetBrains Mono',monospace; padding:8px 6px 2px; border-top:1px solid #D5DEE9; min-height:2.6em; display:flex; flex-wrap:wrap; gap:4px 14px; }
    .tc-lecture b{ color:#2F6FB3; } .tc-aide{ color:#5B6472; font-family:Inter,sans-serif; font-weight:400; }
    .tc-panneau{ display:grid; gap:14px; min-width:0; }
    .tc-grp{ display:grid; gap:7px; padding-bottom:12px; border-bottom:1px solid #E3E9F1; } .tc-grp:last-child{ border-bottom:0; }
    .tc-tete{ display:flex; justify-content:space-between; gap:8px; align-items:baseline; flex-wrap:wrap; }
    .tc-lab{ font:700 .72rem Inter,sans-serif; letter-spacing:.06em; text-transform:uppercase; color:#5B6472; }
    .tc-formule{ font:500 .8rem 'JetBrains Mono',monospace; color:#1C1B2E; }
    .tc-ligne{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; } .tc-ligne input[type=range]{ flex:1; min-width:0; accent-color:#2F6FB3; }
    .tc-ligne input[type=number]{ width:76px; font:500 .9rem 'JetBrains Mono',monospace; border:1px solid #C9D6E6; border-radius:6px; padding:4px 6px; }
    .tc-ligne label{ display:inline-flex; gap:5px; align-items:center; font-size:.88rem; }
    .tc-box button{ font:600 .82rem Inter,sans-serif; color:#1C1B2E; background:#F4F7FB; border:1px solid #C9D6E6; border-radius:6px; padding:5px 10px; cursor:pointer; }
    .tc-box button:hover{ border-color:#2F6FB3; } .tc-box button.tc-prim{ background:#2F6FB3; border-color:#2F6FB3; color:#fff; min-width:80px; }
    .tc-seg{ display:flex; gap:6px; flex-wrap:wrap; } .tc-seg button.on{ background:#E3EBF8; border-color:#2F6FB3; }
    .tc-presets{ display:flex; flex-wrap:wrap; gap:5px; } .tc-presets button{ font:500 .76rem 'JetBrains Mono',monospace; } .tc-presets span{ color:#5B6472; }
    .tc-note{ margin:0; font-size:.84rem; color:#5B6472; line-height:1.45; }
    .tc-paires{ display:grid; grid-template-columns:repeat(auto-fill,minmax(74px,1fr)); gap:2px 8px; font:400 .78rem 'JetBrains Mono',monospace; max-height:200px; overflow-y:auto; }
    .tc-paires span{ color:#5B6472; white-space:nowrap; } .tc-paires b{ color:#1C1B2E; font-weight:600; } .tc-paires .fixe b{ color:#2F6FB3; }
  `;
  document.head.appendChild(s);
})();

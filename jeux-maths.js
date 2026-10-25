/* =====================================================================
   jeux-maths.js -- Maths et jeux : quatre jeux venus de l'histoire et une page Histoire (onglet
   « Maths & la vie »). Demandé : « On peut faire un thème maths et argent et maths et jeux dans l'histoire ».

   1. « Le carré magique » (CM1, CM2 calcul mental, 6e ; 5e nombres relatifs : data-niv="relatifs") :
      placer 1 à 9 (ou −4 à 4) pour que chaque ligne, colonne et diagonale ait la même somme (Lo Shu).
   2. « Le jeu des allumettes » (CM2 Division et Multiples, 6e Multiplication et division, 5e Divisibilité) :
      jeu de Nim (Fort Boyard), 1 à 3 allumettes, celui qui prend la dernière a perdu ; le secret : laisser
      un nombre dont le reste dans la division par 4 est 1.
   3. « Les tours de Hanoï » (6e pensée informatique, 4e et 3e Puissances) : déplacer la tour, nombre
      minimal de déplacements 2ⁿ − 1, solution animée.
   4. « Les trois dés de Galilée » (5e, 4e, 3e Probabilités) : pourquoi 10 sort plus souvent que 9 avec trois
      dés ; simulation puis dénombrement (27 et 25 issues sur 216).

   Placement : <div class="jx-carre" data-niv="relatifs?"></div>, <div class="jx-nim" data-niv="5e?"></div>,
   <div class="jx-hanoi"></div>, <div class="jx-des"></div> ; jxInitTout(conteneur). JX_HISTOIRE_HTML : l'histoire.
   ===================================================================== */
const jxN = v => (+v).toLocaleString('fr-FR', { maximumFractionDigits: 1 });
const jxS = v => v < 0 ? '−' + (-v) : String(v);                                     // vrai signe moins
function jxDire(el, h, cls){ const m = el.querySelector('.jx-msg'); if(!m) return; m.className = 'jx-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; }

/* =====================================================================
   1. Le carré magique
   ===================================================================== */
const JX_LIGNES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
function jxCarreMonter(el){
  const rel = el.dataset.niv === 'relatifs', nums = rel ? [-4, -3, -2, -1, 0, 1, 2, 3, 4] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cible = rel ? 0 : 15, st = { g: Array(9).fill(null), sel: null };
  el.innerHTML = `<div class="jx-box">
    <div class="jx-consigne">Place les nombres de ${jxS(nums[0])} à ${nums[8]}, chacun une seule fois, pour que <b>chaque ligne, chaque colonne et chaque diagonale</b> ait la même somme. Clique sur un nombre, puis sur une case.</div>
    <div class="jx-palette"></div>
    <div class="jx-carre-zone"><div class="jx-grille"></div></div>
    <div class="jx-msg" aria-live="polite"></div>
    <div class="jx-actions"><button type="button" class="btn secondary" data-a="indice"><span class="gicon">lightbulb</span> Un indice</button>
      <button type="button" class="btn secondary" data-a="effacer"><span class="gicon">delete</span> Tout effacer</button>
      <button type="button" class="btn secondary" data-a="solution"><span class="gicon">visibility</span> La solution du Lo Shu</button></div></div>`;
  const $ = s => el.querySelector(s);
  function rendre(){
    const libres = nums.filter(n => !st.g.includes(n));
    $('.jx-palette').innerHTML = libres.map(n => `<button type="button" data-n="${n}" class="${st.sel === n ? 'on' : ''}">${jxS(n)}</button>`).join('') || '<span class="jx-vide">Tous les nombres sont placés.</span>';
    const somme = l => l.every(i => st.g[i] !== null) ? l.reduce((a, i) => a + st.g[i], 0) : null;
    const etiq = l => { const v = somme(l); return v === null ? '<span class="jx-som"></span>' : `<span class="jx-som ${v === cible ? 'ok' : 'ko'}">${jxS(v)}</span>`; };
    let h = '';
    for(let r = 0; r < 3; r++){
      for(let c = 0; c < 3; c++){ const i = 3 * r + c; h += `<button type="button" class="jx-case${st.g[i] === null ? '' : ' pleine'}" data-i="${i}">${st.g[i] === null ? '' : jxS(st.g[i])}</button>`; }
      h += etiq(JX_LIGNES[r]);
    }
    for(let c = 0; c < 3; c++) h += etiq(JX_LIGNES[3 + c]);
    h += etiq(JX_LIGNES[6]);
    $('.jx-grille').innerHTML = h;
    $('.jx-carre-zone').dataset.d2 = somme(JX_LIGNES[7]) === null ? '' : jxS(somme(JX_LIGNES[7]));
    $('.jx-carre-zone').classList.toggle('d2ok', somme(JX_LIGNES[7]) === cible);
    el.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { st.sel = st.sel === +b.dataset.n ? null : +b.dataset.n; rendre(); });
    el.querySelectorAll('[data-i]').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      if(st.sel !== null){ st.g[i] = st.sel; st.sel = null; }
      else if(st.g[i] !== null) st.g[i] = null;
      rendre(); bilan();
    });
  }
  function bilan(){
    if(st.g.some(v => v === null)) return jxDire(el, 'Les sommes apparaissent quand une ligne est complète : en vert si elles valent ' + jxS(cible) + '.');
    const ok = JX_LIGNES.every(l => l.reduce((a, i) => a + st.g[i], 0) === cible);
    jxDire(el, ok ? `<span class="gicon">celebration</span> Bravo, c'est un <b>carré magique</b> : les 8 sommes valent ${jxS(cible)} ! Il n'en existe que 8, et ce sont tous des retournements du même carré, le Lo Shu chinois.` : '<span class="gicon">info</span> Toutes les cases sont remplies, mais certaines sommes ne valent pas ' + jxS(cible) + '. Clique sur une case pour reprendre son nombre.', ok ? 'ok' : 'ko');
  }
  $('[data-a="indice"]').onclick = () => jxDire(el, rel
    ? `<div class="jx-etapes"><div>La somme de tous les nombres : (−4) + (−3) + … + 3 + 4 = 0.</div><div>Elle se partage entre 3 lignes : chaque ligne vaut donc <b>0</b>.</div><div>Le nombre du milieu appartient à 4 lignes : c'est <b>0</b>.</div><div>Chaque nombre a son opposé de l'autre côté du centre.</div></div>`
    : `<div class="jx-etapes"><div>La somme de tous les nombres : 1 + 2 + … + 9 = 45.</div><div>Elle se partage entre 3 lignes : 45 ÷ 3 = <b>15</b>.</div><div>Le nombre du milieu appartient à 4 lignes : c'est <b>5</b>.</div><div>Les nombres pairs vont dans les coins.</div></div>`);
  $('[data-a="effacer"]').onclick = () => { st.g = Array(9).fill(null); st.sel = null; rendre(); jxDire(el, ''); };
  $('[data-a="solution"]').onclick = () => { st.g = [4, 9, 2, 3, 5, 7, 8, 1, 6].map(v => rel ? v - 5 : v); st.sel = null; rendre(); bilan(); };
  rendre(); jxDire(el, 'Les sommes apparaissent quand une ligne est complète.');
}

/* =====================================================================
   2. Le jeu des allumettes (Nim)
   ===================================================================== */
function jxNimMonter(el){
  const cinq = el.dataset.niv === '5e', st = { n: 0, depart: 0, tour: '', fini: true, pris: 0, vict: 0, def: 0 };
  el.innerHTML = `<div class="jx-box">
    <div class="jx-consigne">Chacun à son tour, on prend <b>1, 2 ou 3 allumettes</b>. Celui qui prend <b>la dernière</b> a perdu. L'ordinateur connaît le secret… et toi ?</div>
    <svg class="jx-svg jx-allum" viewBox="0 0 640 130"></svg>
    <div class="jx-actions jx-coups"></div>
    <div class="jx-msg" aria-live="polite"></div>
    <div class="jx-actions"><button type="button" class="btn secondary" data-a="secret"><span class="gicon">key</span> Le secret</button><span class="jx-score"></span></div></div>`;
  const $ = s => el.querySelector(s);
  function dessiner(prises){
    let h = '<rect width="640" height="130" rx="12" fill="#2F2A26"/>';
    const tot = st.depart, w = Math.min(24, 600 / tot);
    for(let k = 0; k < tot; k++){
      const x = 20 + k * w + w / 2, reste = k < st.n, prise = prises && k >= st.n && k < st.n + prises;
      if(!reste && !prise) continue;
      h += `<g opacity="${prise ? .35 : 1}"><rect x="${x - 3}" y="28" width="6" height="80" rx="2" fill="#E9C98B"/><ellipse cx="${x}" cy="27" rx="5" ry="7" fill="#C0392B"/></g>`;
    }
    h += `<text x="620" y="122" font-size="14" text-anchor="end" fill="#F4EEE1">${st.n} allumette${st.n > 1 ? 's' : ''}</text>`;
    $('.jx-allum').innerHTML = h;
  }
  function coups(){
    const c = $('.jx-coups');
    if(st.fini){ c.innerHTML = `<button type="button" class="btn" data-a="moi"><span class="gicon">person</span> Nouvelle partie : je commence</button><button type="button" class="btn secondary" data-a="ordi"><span class="gicon">computer</span> L'ordinateur commence</button>`; }
    else if(st.tour === 'moi') c.innerHTML = [1, 2, 3].filter(k => k <= st.n).map(k => `<button type="button" class="btn" data-k="${k}">J'en prends ${k}</button>`).join('');
    else c.innerHTML = '<span class="jx-attente"><span class="gicon">hourglass_top</span> L\'ordinateur réfléchit…</span>';
    c.querySelectorAll('[data-k]').forEach(b => b.onclick = () => jouer(+b.dataset.k, 'moi'));
    c.querySelectorAll('[data-a]').forEach(b => b.onclick = () => partie(b.dataset.a));
  }
  function partie(qui){
    st.depart = st.n = 13 + Math.floor(Math.random() * 13); st.fini = false; st.tour = qui; dessiner(); coups();
    jxDire(el, `Il y a ${st.n} allumettes. ${qui === 'moi' ? 'À toi de jouer !' : 'L\'ordinateur commence.'}`);
    if(qui === 'ordi') setTimeout(ordi, 900);
  }
  function jouer(k, qui){
    st.n -= k; dessiner(k);
    if(st.n === 0){
      st.fini = true; qui === 'moi' ? st.def++ : st.vict++;
      jxDire(el, qui === 'moi' ? '<span class="gicon">sentiment_dissatisfied</span> Tu as pris la dernière allumette : perdu ! Regarde « Le secret ».' : '<span class="gicon">celebration</span> L\'ordinateur a dû prendre la dernière allumette : <b>tu as gagné</b> !', qui === 'moi' ? 'ko' : 'ok');
      $('.jx-score').textContent = `Toi ${st.vict} · ordinateur ${st.def}`;
      return coups();
    }
    st.tour = qui === 'moi' ? 'ordi' : 'moi'; coups();
    if(qui === 'moi'){ jxDire(el, `Tu en prends ${k}. Il en reste ${st.n}.`); setTimeout(ordi, 1100); }
    else jxDire(el, `L'ordinateur en prend ${k}. Il en reste <b>${st.n}</b>. À toi !`);
  }
  // Stratégie gagnante : laisser à l'adversaire 1, 5, 9, 13… allumettes (reste 1 dans la division par 4).
  function ordi(){ if(st.fini) return; const r = (st.n - 1) % 4; jouer(r ? r : Math.min(st.n, 1 + Math.floor(Math.random() * 3)), 'ordi'); }
  $('[data-a="secret"]').onclick = () => jxDire(el, `<div class="jx-etapes">
      <div>Celui qui doit jouer quand il reste <b>1</b> allumette a perdu.</div>
      <div>S'il en reste <b>5</b> à ton adversaire : s'il en prend 1, 2 ou 3, tu en prends 3, 2 ou 1 et il en reste 1.</div>
      <div>De même, laisse-lui <b>9</b>, puis <b>13</b>, <b>17</b>, <b>21</b>, <b>25</b> : à chaque tour, vous en enlevez 4 à vous deux.</div>
      <div>Ces nombres, divisés par 4, ont tous un <b>reste de 1</b>${cinq ? ' : ce sont les multiples de 4, plus 1' : ''}.</div></div>
      Exemple : il reste 15 allumettes.<div class="jx-etapes"><div>15 = 4 × 3 + 3 : le reste est 3.</div><div>Prends 2 allumettes : il en reste 13.</div><div>13 = 4 × 3 + 1 : le reste est 1, c'est gagné.</div></div>`);
  st.depart = st.n = 21; dessiner(); coups();
  jxDire(el, 'Choisis qui commence.');
}

/* =====================================================================
   3. Les tours de Hanoï
   ===================================================================== */
const JX_COUL = ['#C0392B', '#E67E22', '#F1C40F', '#27AE60', '#2F6FB3', '#7A4FC0'];
function jxHanoiMonter(el){
  const st = { d: 3, t: [[], [], []], sel: null, coups: 0, anim: 0 };
  el.innerHTML = `<div class="jx-box">
    <div class="jx-consigne">Déplace toute la tour sur le <b>piquet de droite</b>. Une seule règle : on bouge un disque à la fois, et <b>jamais un grand disque sur un plus petit</b>. Clique sur un piquet pour prendre son disque du haut, puis sur un autre pour le poser.</div>
    <div class="jx-chips">${[3, 4, 5, 6].map(d => `<button type="button" data-d="${d}">${d} disques</button>`).join('')}</div>
    <svg class="jx-svg jx-hanoi-svg" viewBox="0 0 600 220"></svg>
    <div class="jx-compteur"></div>
    <div class="jx-msg" aria-live="polite"></div>
    <div class="jx-actions"><button type="button" class="btn secondary" data-a="recommencer"><span class="gicon">restart_alt</span> Recommencer</button>
      <button type="button" class="btn secondary" data-a="solution"><span class="gicon">play_circle</span> Regarder la solution</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.jx-hanoi-svg');
  const min = () => Math.pow(2, st.d) - 1;
  function dessiner(){
    let h = '<rect width="600" height="220" rx="12" fill="#F6F1E7"/><rect x="20" y="190" width="560" height="12" rx="4" fill="#8B5E3C"/>';
    st.t.forEach((p, i) => {
      const x = 100 + i * 200;
      h += `<rect x="${x - 4}" y="40" width="8" height="150" rx="3" fill="#8B5E3C"/><rect x="${x - 95}" y="30" width="190" height="172" fill="transparent" data-p="${i}" style="cursor:pointer"/>`;
      p.forEach((dk, k) => {
        const w = 40 + dk * 22, y = 172 - k * 20 - (st.sel === i && k === p.length - 1 ? 30 : 0);
        h += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="18" rx="9" fill="${JX_COUL[dk]}" stroke="#1C1B2E" stroke-opacity=".25" pointer-events="none"/>`;
      });
    });
    svg.innerHTML = h;
    svg.querySelectorAll('[data-p]').forEach(r => r.onclick = () => clic(+r.dataset.p));
    $('.jx-compteur').innerHTML = `Déplacements : <b>${st.coups}</b>`;
  }
  function nouveau(d){
    clearTimeout(st.anim); st.anim = 0; st.d = d || st.d; st.t = [[...Array(st.d).keys()].reverse(), [], []]; st.sel = null; st.coups = 0;
    el.querySelectorAll('[data-d]').forEach(b => b.classList.toggle('on', +b.dataset.d === st.d));
    dessiner(); jxDire(el, `Avec ${st.d} disques, peux-tu y arriver en moins de ${min() + 1} déplacements ?`);
  }
  function deplacer(a, b){ st.t[b].push(st.t[a].pop()); st.coups++; }
  function clic(i){
    if(st.anim) return;
    if(st.sel === null){ if(st.t[i].length) st.sel = i; dessiner(); return; }
    if(i === st.sel){ st.sel = null; dessiner(); return; }
    const dk = st.t[st.sel][st.t[st.sel].length - 1], top = st.t[i][st.t[i].length - 1];
    if(top !== undefined && top < dk){ jxDire(el, '<span class="gicon">block</span> Interdit : on ne pose jamais un disque sur un plus petit.', 'ko'); st.sel = null; dessiner(); return; }
    deplacer(st.sel, i); st.sel = null; dessiner();
    if(st.t[2].length === st.d) fin(false);
    else jxDire(el, '');
  }
  function fin(auto){
    const tab = [1, 2, 3, 4, 5, 6].map(n => `<td>${Math.pow(2, n) - 1}</td>`).join('');
    jxDire(el, `${auto ? '' : st.coups === min() ? '<span class="gicon">celebration</span> Parfait, ' : '<span class="gicon">celebration</span> Réussi, '}${auto ? 'La tour est déplacée' : 'en ' + st.coups + ' déplacements'} ! Le minimum pour ${st.d} disques est <b>${min()}</b>.
      <table class="jx-tab"><tr><th>disques</th>${[1, 2, 3, 4, 5, 6].map(n => `<td>${n}</td>`).join('')}</tr><tr><th>déplacements</th>${tab}</tr></table>
      Avec un disque de plus, on déplace la tour du dessus, puis le grand disque, puis de nouveau la tour : on double et on ajoute 1. Le minimum est <b>2<sup>n</sup> − 1</b> : 2<sup>${st.d}</sup> − 1 = ${min()}.`, 'ok');
  }
  function solution(){
    nouveau(); const l = [];
    const h = (n, a, b, c) => { if(!n) return; h(n - 1, a, c, b); l.push([a, c]); h(n - 1, b, a, c); };
    h(st.d, 0, 1, 2);
    let k = 0;
    const pas = () => { if(k >= l.length){ st.anim = 0; return fin(true); } deplacer(...l[k++]); dessiner(); st.anim = setTimeout(pas, Math.max(180, 1400 / st.d - 100)); };
    st.anim = setTimeout(pas, 500);
  }
  el.querySelectorAll('[data-d]').forEach(b => b.onclick = () => nouveau(+b.dataset.d));
  $('[data-a="recommencer"]').onclick = () => nouveau();
  $('[data-a="solution"]').onclick = solution;
  nouveau(3);
}

/* =====================================================================
   4. Les trois dés de Galilée
   ===================================================================== */
const JX_POINTS = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] };
const jxDe = (v, x) => `<g transform="translate(${x},10)"><rect width="60" height="60" rx="11" fill="#fff" stroke="#1C1B2E" stroke-width="2"/>${JX_POINTS[v].map(([i, j]) => `<circle cx="${14 + i * 16}" cy="${14 + j * 16}" r="5.5" fill="#1C1B2E"/>`).join('')}</g>`;
function jxDesMonter(el){
  const st = { c: Array(19).fill(0), n: 0, des: [3, 3, 4] };
  el.innerHTML = `<div class="jx-box">
    <div class="jx-consigne">Vers 1620, des joueurs de Florence posent une énigme à <b>Galilée</b>. Avec trois dés, la somme <b>9</b> s'obtient de 6 façons, et la somme <b>10</b> aussi. Pourtant, en jouant, ils voient sortir 10 plus souvent que 9. Pourquoi ?</div>
    <div class="jx-facons"><div><b style="color:#2F6FB3">9</b> : 1+2+6 · 1+3+5 · 1+4+4 · 2+2+5 · 2+3+4 · 3+3+3</div><div><b style="color:#C0533E">10</b> : 1+3+6 · 1+4+5 · 2+2+6 · 2+3+5 · 2+4+4 · 3+3+4</div></div>
    <svg class="jx-svg jx-trois" viewBox="0 0 240 80"></svg>
    <div class="jx-actions"><button type="button" class="btn" data-l="1"><span class="gicon">casino</span> Lancer</button><button type="button" class="btn secondary" data-l="1000">Lancer 1 000 fois</button><button type="button" class="btn secondary" data-l="10000">Lancer 10 000 fois</button><button type="button" class="btn secondary" data-a="zero"><span class="gicon">restart_alt</span></button></div>
    <svg class="jx-svg jx-histo" viewBox="0 0 600 220"></svg>
    <div class="jx-msg" aria-live="polite"></div>
    <div class="jx-actions"><button type="button" class="btn secondary" data-a="galilee"><span class="gicon">school</span> L'explication de Galilée</button></div></div>`;
  const $ = s => el.querySelector(s), d = () => 1 + Math.floor(Math.random() * 6);
  function dessiner(){
    $('.jx-trois').innerHTML = st.des.map((v, i) => jxDe(v, 10 + i * 80)).join('');
    const max = Math.max(5, ...st.c);
    let h = '<rect width="600" height="220" rx="12" fill="#FAFAF7"/>';
    for(let s = 3; s <= 18; s++){
      const x = 24 + (s - 3) * 35, hh = st.c[s] / max * 160, coul = s === 9 ? '#2F6FB3' : s === 10 ? '#C0533E' : '#C9CED6';
      h += `<rect x="${x}" y="${190 - hh}" width="28" height="${hh}" rx="3" fill="${coul}"/><text x="${x + 14}" y="206" font-size="12" text-anchor="middle" fill="#4E5665">${s}</text>`;
      if(s === 9 || s === 10) h += `<text x="${x + 14}" y="${184 - hh}" font-size="12" font-weight="700" text-anchor="middle" fill="${coul}">${st.c[s]}</text>`;
    }
    $('.jx-histo').innerHTML = h;
    if(st.n) jxDire(el, `${st.n} lancers : la somme 9 est sortie <b style="color:#2F6FB3">${st.c[9]} fois</b> (${jxN(st.c[9] / st.n * 100)} %), la somme 10 <b style="color:#C0533E">${st.c[10]} fois</b> (${jxN(st.c[10] / st.n * 100)} %).${st.n < 1000 ? '' : st.c[10] > st.c[9] ? ' La somme 10 sort bien plus souvent : plus on lance, plus la différence se confirme.' : ' Avec ' + st.n.toLocaleString('fr-FR') + ' lancers, le hasard peut encore inverser l\'ordre : l\'écart est petit. Lance 10 000 fois de plus !'}`);
  }
  function lancer(k){
    if(k === 1){ let t = 0; const r = setInterval(() => { st.des = [d(), d(), d()]; dessiner(); if(++t > 7){ clearInterval(r); st.c[st.des[0] + st.des[1] + st.des[2]]++; st.n++; dessiner(); } }, 70); return; }
    for(let i = 0; i < k; i++){ st.des = [d(), d(), d()]; st.c[st.des[0] + st.des[1] + st.des[2]]++; st.n++; }
    dessiner();
  }
  function galilee(){
    const ordre = t => new Set([[t[0], t[1], t[2]], [t[0], t[2], t[1]], [t[1], t[0], t[2]], [t[1], t[2], t[0]], [t[2], t[0], t[1]], [t[2], t[1], t[0]]].map(x => x.join(''))).size;
    const col = (s, l) => { const lignes = l.map(t => `<tr><td>${t.join(' + ')}</td><td>${ordre(t)}</td></tr>`).join(''); return `<table class="jx-tab"><tr><th>somme ${s}</th><th>dans un ordre</th></tr>${lignes}<tr><th>en tout</th><th>${l.reduce((a, t) => a + ordre(t), 0)}</th></tr></table>`; };
    jxDire(el, `L'idée de Galilée : les trois dés sont <b>différents</b> (imagine-les rouge, vert et bleu). « 1 + 2 + 6 » peut sortir dans 6 ordres (1-2-6, 1-6-2, 2-1-6…), mais « 3 + 3 + 3 » dans un seul !
      <div class="jx-galilee">${col(9, [[1, 2, 6], [1, 3, 5], [1, 4, 4], [2, 2, 5], [2, 3, 4], [3, 3, 3]])}${col(10, [[1, 3, 6], [1, 4, 5], [2, 2, 6], [2, 3, 5], [2, 4, 4], [3, 3, 4]])}</div>
      En tout, il y a 6 × 6 × 6 = 216 issues, toutes aussi probables. La probabilité d'obtenir 9 est <span class="tex">\\dfrac{25}{216}</span> ≈ 11,6 %, celle d'obtenir 10 est <span class="tex">\\dfrac{27}{216}</span> = 12,5 %.`, 'ok');
    if(typeof renderStaticMath === 'function') renderStaticMath(el.querySelector('.jx-msg'));
  }
  el.querySelectorAll('[data-l]').forEach(b => b.onclick = () => lancer(+b.dataset.l));
  $('[data-a="zero"]').onclick = () => { st.c = Array(19).fill(0); st.n = 0; dessiner(); jxDire(el, ''); };
  $('[data-a="galilee"]').onclick = galilee;
  dessiner(); jxDire(el, 'Lance les dés, beaucoup de fois, et compare les barres de 9 et de 10.');
}

/* ---------- Construction ---------- */
function jxInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.jx-carre').forEach(jxCarreMonter);
  racine.querySelectorAll('.jx-nim').forEach(jxNimMonter);
  racine.querySelectorAll('.jx-hanoi').forEach(jxHanoiMonter);
  racine.querySelectorAll('.jx-des').forEach(jxDesMonter);
}

/* =====================================================================
   Page Histoire « Maths et jeux » (sans fraction écrite : lisible du CM1 à la 3e)
   ===================================================================== */
const JX_HISTOIRE_HTML = `
<div class="history-box jx-hist">
  <div class="history-title"><span class="gicon">extension</span> Maths et jeux : une très longue histoire</div>

  <h4 class="jx-hist-h">Le carré magique de la tortue (Chine)</h4>
  <p>Une légende chinoise raconte qu'il y a plus de 4 000 ans, une <b>tortue</b> sortit du fleuve Luo. Sur sa carapace, des points dessinaient les nombres de 1 à 9 rangés en carré : chaque ligne, chaque colonne et chaque diagonale faisait <b>15</b>. C'est le <b>Lo Shu</b>, le plus ancien carré magique connu. Bien plus tard, en 1514, le peintre allemand <b>Albrecht Dürer</b> cache un carré magique de 4 cases sur 4 dans sa gravure <i>Melencolia I</i> : en bas, au milieu, on lit l'année… 15 14 !</p>

  <h4 class="jx-hist-h">Les osselets et les premiers dés</h4>
  <p>Dans l'Antiquité, on jouait avec des <b>astragales</b>, de petits os de mouton à quatre faces : nos osselets. Les Égyptiens, les Grecs et les Romains jouaient aussi aux <b>dés</b>, déjà marqués de 1 à 6, avec les faces opposées qui font toujours 7. Au jeu royal d'Ur, en Mésopotamie, on lançait des dés en forme de pyramide il y a 4 500 ans.</p>

  <h4 class="jx-hist-h">Quand les jeux de hasard inventent les probabilités</h4>
  <p>Vers 1620, <b>Galilée</b> explique à des joueurs de Florence pourquoi, avec trois dés, la somme 10 sort plus souvent que la somme 9. En 1654, le chevalier de Méré, grand joueur, pose à <b>Blaise Pascal</b> le « problème des partis » : une partie est interrompue, comment partager équitablement l'argent misé ? Pascal en discute par lettres avec <b>Pierre de Fermat</b> : leur correspondance est considérée comme la naissance du calcul des <b>probabilités</b>.</p>

  <h4 class="jx-hist-h">Le jeu des allumettes : un jeu « résolu »</h4>
  <p>On joue à prendre des objets chacun son tour depuis très longtemps, partout dans le monde. En 1901, le mathématicien américain <b>Charles Bouton</b> donne à ce jeu le nom de <b>Nim</b> et trouve la stratégie gagnante pour toutes ses variantes. Le jeu est devenu célèbre en France grâce à l'émission <i>Fort Boyard</i>, où les candidats affrontent un maître du jeu… qui connaît le secret.</p>

  <h4 class="jx-hist-h">Les tours de Hanoï et la légende de Bénarès (1883)</h4>
  <p>Le mathématicien français <b>Édouard Lucas</b> invente ce casse-tête en 1883 et le vend sous un faux nom, « N. Claus de Siam »… l'anagramme de « Lucas d'Amiens ». Il l'accompagne d'une légende : dans un temple, des moines déplacent jour et nuit une tour de <b>64 disques d'or</b> ; quand ils auront fini, ce sera la fin du monde. Rassure-toi : il faut 2<sup>64</sup> − 1 déplacements, soit plus de <b>580 milliards d'années</b> à raison d'un déplacement par seconde !</p>

  <div class="jx-hist-a-toi"><span class="gicon">sports_esports</span> <b>À toi !</b> Joue au jeu des allumettes avec quelqu'un de ta famille, avec des crayons ou des pièces, en utilisant le secret. Gagnes-tu à chaque fois ? Puis invente une variante (on peut prendre 1, 2, 3 ou 4 objets) : quel est le nouveau secret ?</div>
</div>`;

(function jxStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .jx-box{ display:flex; flex-direction:column; gap:10px; }
    .jx-consigne{ font-size:.95rem; line-height:1.55; }
    .jx-svg{ width:100%; max-width:600px; display:block; margin:0 auto; border-radius:12px; }
    .jx-trois{ max-width:240px; }
    .jx-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.6; } .jx-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .jx-msg.ok{ color:#1E5E30; } .jx-msg.ko{ color:#9A3A12; }
    .jx-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .jx-chips{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; }
    .jx-chips button, .jx-palette button{ border:1.5px solid rgba(91,47,158,.3); background:#fff; color:#3A1D66; border-radius:12px; padding:5px 12px; font:600 .9rem Inter,sans-serif; cursor:pointer; }
    .jx-chips button.on, .jx-palette button.on{ background:#5B2F9E; color:#fff; border-color:#5B2F9E; }
    .jx-palette{ display:flex; gap:6px; flex-wrap:wrap; justify-content:center; min-height:40px; } .jx-palette button{ min-width:44px; font:700 1.1rem 'Space Grotesk',sans-serif; }
    .jx-vide{ color:#8A8F98; font-size:.9rem; align-self:center; }
    .jx-carre-zone{ position:relative; margin:0 auto; padding:0 0 0 0; }
    .jx-carre-zone::before{ content:attr(data-d2); position:absolute; left:-30px; bottom:-2px; width:26px; text-align:center; font:700 .95rem 'Space Grotesk',sans-serif; color:#9A3A12; }
    .jx-carre-zone.d2ok::before{ color:#1E7B34; }
    .jx-grille{ display:grid; grid-template-columns:repeat(3,64px) 40px; gap:6px; align-items:center; justify-items:center; }
    .jx-case{ width:64px; height:64px; border:2px solid #C9B6E6; border-radius:12px; background:#FBF8FF; font:700 1.6rem 'Space Grotesk',sans-serif; color:#3A1D66; cursor:pointer; }
    .jx-case.pleine{ background:#EFE6FA; } .jx-case:hover{ border-color:#5B2F9E; }
    .jx-som{ font:700 .95rem 'Space Grotesk',sans-serif; min-width:26px; text-align:center; } .jx-som.ok{ color:#1E7B34; } .jx-som.ko{ color:#9A3A12; }
    .jx-etapes{ display:flex; width:fit-content; max-width:100%; flex-direction:column; gap:3px; text-align:left; margin:6px auto; background:#F7F2FC; border-radius:10px; padding:8px 14px; color:#1C1B2E; }
    .jx-score, .jx-compteur{ font:600 .9rem 'JetBrains Mono',monospace; color:#4E5665; text-align:center; }
    .jx-attente{ color:#4E5665; font-size:.92rem; } .jx-attente .gicon{ vertical-align:-4px; }
    .jx-tab{ margin:8px auto; border-collapse:collapse; font-size:.9rem; } .jx-tab th, .jx-tab td{ border:1px solid #DCCDF0; padding:3px 10px; text-align:center; } .jx-tab th{ background:#F3ECFB; }
    .jx-galilee{ display:flex; gap:12px; flex-wrap:wrap; justify-content:center; color:#1C1B2E; }
    .jx-facons{ display:flex; flex-direction:column; gap:3px; align-items:center; font-size:.9rem; background:#FAFAF7; border-radius:10px; padding:8px; }
    .jx-hist p{ margin:6px 0 10px; line-height:1.6; }
    .jx-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#5B2F9E; margin:16px 0 4px; }
    .jx-hist-a-toi{ margin-top:14px; background:#F3ECFB; border:1px solid #DCCDF0; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .jx-hist-a-toi .gicon{ color:#5B2F9E; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

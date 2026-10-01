/* ============================================================
   Outils communs aux chapitres de CM1 -- « notre propre manuel complet » (demandé : « Il n'y a
   pas besoin des pages du manuel car on crée notre propre manuel complet. Avance »).

   Un chapitre s'écrit en un seul appel : cm1Chapitre({ titre, slug, cours, methode, demos, exos,
   histoire, quiz, init }). Les conteneurs cachés des 4 onglets sont créés ici (plus besoin de les
   ajouter à la main dans index.html), puis le chapitre est inscrit dans DEMO_REGISTRY et
   DEMO_QUIZZES sous la clé 'cm1|<titre>' (le titre doit être celui de CHCM1, app.js).

   Règles du programme du cycle 3 (BO) suivies dans tous les chapitres de CM1 : entiers d'au plus
   4 chiffres en périodes 1 et 2 ; décimaux jusqu'aux centièmes ; fractions de dénominateur ≤ 20
   (fractions décimales : 100) ; pas de tableau de conversion ni de tableau de proportionnalité ;
   notations géométriques toujours explicitées (« le segment [AB] ») ; langage simple.
   ============================================================ */
const CM1_DEMOS = {};
function cm1Lecon(n, titre){ return `<div class="lesson-header"><span class="num">${n}</span><h3>${titre}</h3></div>`; }
function cm1Sous(l, titre){ return `<div class="sub-header"><span class="letter">${l}</span><h4>${titre}</h4></div>`; }
function cm1Def(html, badge){ return `<span class="def-badge">${badge || 'Définition'}</span><div class="def-box">${html}</div>`; }
function cm1Regle(html, badge){ return `<span class="prop-badge">${badge || 'Règle'}</span><div class="def-box">${html}</div>`; }
function cm1Astuce(html){ return `<div class="redaction-note" style="background:rgba(227,93,58,.07);border-color:rgba(227,93,58,.25);color:#8A2E1C;">${html}</div>`; }
function cm1Rem(html){ return `<div class="redaction-note" style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;">${html}</div>`; }
function cm1Exemple(titre, items){ return `<p class="example-title">${titre}</p>` + (items ? `<ul class="example-list">${items.map(x => `<li>${x}</li>`).join('')}</ul>` : ''); }
// Méthode animée pas à pas (makeStepDemo d'app.js) : bloc HTML ; les étapes sont passées dans « demos ».
function cm1Demo(id, titre, consigne){
  return `${cm1Sous('M', titre)}<div class="figure-wrap"><p class="hint interaction-hint" style="margin-top:6px;">${consigne || 'Clique sur « Étape suivante » pour dérouler la méthode.'}</p>
    <div class="step-display" id="cm1d-${id}"></div><div class="figure-toolbar"><button class="btn" onclick="CM1_DEMOS['${id}'].next()">Étape suivante →</button>
    <button class="btn secondary" onclick="CM1_DEMOS['${id}'].reset()">Recommencer</button></div></div>`;
}
// Tableau (en-têtes colorés) : entetes = [texte...], lignes = [[cellule...]...]
function cm1Tableau(entetes, lignes, opts){
  opts = opts || {};
  const th = 'padding:6px 10px;border:1px solid rgba(28,43,57,.2);background:' + (opts.coul || 'var(--accent-orange)') + ';color:#fff;font-family:\'Space Grotesk\',sans-serif;';
  const td = 'padding:8px 10px;border:1px solid rgba(28,43,57,.2);';
  return `<div style="overflow-x:auto;margin:6px 0 14px;"><table style="border-collapse:collapse;text-align:center;font-size:.95rem;${opts.large ? 'width:100%;' : ''}">
    ${entetes ? `<tr>${entetes.map(h => `<th style="${th}">${h}</th>`).join('')}</tr>` : ''}
    ${lignes.map(l => `<tr>${l.map(c => `<td style="${td}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Exercices avec correction dépliable ; redaction = { titre, lignes: [[expression, commentaire]...] } (facultatif).
function cm1Exos(slug, liste, redaction){
  // slug unique par chapitre ET par niveau (en CM2 : préfixe « c2- ») : il sert aux id des corrections.
  return (redaction ? `<div class="redaction-block"><h3>${redaction.titre}</h3><div class="redaction-template">${redaction.lignes.map(([e, c]) => `<div class="we-row"><span class="we-expr">${e}</span><span class="we-comment">${c}</span></div>`).join('')}</div></div>` : '')
    + `<div class="redaction-block"><h3>Exercices</h3>${liste.map(([e, c], i) => `<div class="exo-card"><div class="num">Exercice ${i + 1}</div>${e}
      <button type="button" class="exo-correction-toggle" data-target="cm1-${slug}-c${i + 1}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
      <div class="exo-correction" id="cm1-${slug}-c${i + 1}"><p style="margin:0;">${c}</p></div></div>`).join('')}</div>`;
}
function cm1Histoire(titre, paras){ return `<div class="history-box"><div class="history-title"><span class=gicon>history_edu</span> ${titre}</div>${paras.map(p => `<p style="margin:0 0 12px;">${p}</p>`).join('')}</div>`; }
function cm1Conteneurs(slug, niveau){
  niveau = niveau || 'cm1';
  [['panel-cours', 'cours'], ['panel-methode', 'methode'], ['panel-exercices', 'exos'], ['panel-histoire', 'histoire']].forEach(([p, k]) => {
    const id = k + '-demo-' + niveau + '-' + slug; if(document.getElementById(id)) return;
    const panel = document.getElementById(p); if(!panel) return;
    const d = document.createElement('div'); d.id = id; d.style.display = 'none'; panel.appendChild(d);
  });
}
// o.niveau : 'cm1' (par défaut) ou 'cm2' -- mêmes outils pour les deux années du cours moyen.
function cm1Chapitre(o){
  const niv = o.niveau || 'cm1';
  cm1Conteneurs(o.slug, niv);
  const id = k => k + '-demo-' + niv + '-' + o.slug;
  const poser = (k, html) => { const el = document.getElementById(id(k)); if(el) el.innerHTML = html || ''; };
  poser('cours', o.cours); poser('methode', o.methode); poser('exos', o.exos); poser('histoire', o.histoire);
  (o.demos || []).forEach(([k, steps]) => { CM1_DEMOS[k] = makeStepDemo(steps, 'cm1d-' + k); });
  if(o.quiz) DEMO_QUIZZES[niv + '|' + o.titre] = o.quiz;
  DEMO_REGISTRY[niv + '|' + o.titre] = { cours: id('cours'), methode: id('methode'), exos: id('exos'), histoire: id('histoire'),
    init: () => {
      ['cours', 'methode', 'exos', 'histoire'].forEach(k => { const el = document.getElementById(id(k)); if(el && typeof renderStaticMath === 'function') renderStaticMath(el); });
      ['cours', 'methode'].forEach(k => { const el = document.getElementById(id(k)); if(el && typeof injectCourseAddButtons === 'function') injectCourseAddButtons(el); });
      (o.demos || []).forEach(([k]) => CM1_DEMOS[k].reset());
      ['cours', 'methode', 'exos'].forEach(k => { const el = document.getElementById(id(k)); if(el) el.querySelectorAll('.cm-pliage').forEach(b => cmPliageDessiner(b.dataset.pliage)); if(typeof cmAnimDessiner === 'function') el.querySelectorAll('.cm-anim').forEach(b => cmAnimDessiner(b.dataset.anim)); });
      if(o.init) o.init();
    } };
}
/* ---- Petites figures SVG réutilisables ---- */
// Bande (rectangle) partagée en n parts égales dont k sont coloriées ; plusieurs bandes si k > n.
function cm1Bande(n, k, opts){
  opts = opts || {}; const L = opts.largeur || 240, H = 34, c = opts.coul || '#E35D3A';
  const nb = Math.max(1, Math.ceil(k / n)); let s = `<svg viewBox="0 0 ${nb * (L + 14)} ${H + 6}" style="width:${Math.min(100, nb * 46)}%;max-width:${nb * (L + 14)}px;display:inline-block;vertical-align:middle;">`;
  for(let b = 0; b < nb; b++){ const x0 = 3 + b * (L + 14);
    for(let i = 0; i < n; i++){ const on = b * n + i < k; s += `<rect x="${x0 + i * L / n}" y="3" width="${L / n}" height="${H}" fill="${on ? c : '#fff'}" fill-opacity="${on ? .75 : 1}" stroke="#1F3A5C" stroke-width="1.4"/>`; } }
  return s + '</svg>';
}
// Disque partagé en n parts égales dont k sont coloriées.
function cm1Disque(n, k, opts){
  opts = opts || {}; const r = 40, cx = 45, cy = 45, c = opts.coul || '#2EA8C9'; let s = `<svg viewBox="0 0 90 90" style="width:${opts.taille || 90}px;display:inline-block;vertical-align:middle;">`;
  for(let i = 0; i < n; i++){ const a0 = -Math.PI / 2 + 2 * Math.PI * i / n, a1 = a0 + 2 * Math.PI / n;
    const p = n === 1 ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - .01} ${cy - r} Z` : `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(2)} ${(cy + r * Math.sin(a0)).toFixed(2)} A ${r} ${r} 0 ${n === 2 ? 0 : 0} 1 ${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy + r * Math.sin(a1)).toFixed(2)} Z`;
    s += `<path d="${p}" fill="${i < k ? c : '#fff'}" fill-opacity="${i < k ? .75 : 1}" stroke="#1F3A5C" stroke-width="1.4"/>`; }
  return s + '</svg>';
}
// Demi-droite graduée : de 0 à max unités, chaque unité partagée en n ; points = [[valeurNumérique, nom, couleur]].
// etiquettes(v) renvoie le texte sous une graduation (par défaut : les entiers).
function cm1Graduation(max, n, points, opts){
  opts = opts || {}; const U = opts.unite || Math.min(150, 440 / max), W = 40 + max * U + 30;
  let s = `<svg viewBox="0 0 ${W} 86" style="width:100%;max-width:${W}px;display:block;margin:6px auto;"><line x1="20" y1="45" x2="${W - 8}" y2="45" stroke="#1F3A5C" stroke-width="2"/><polygon points="${W - 8},45 ${W - 16},40 ${W - 16},50" fill="#1F3A5C"/>`;
  for(let i = 0; i <= max * n; i++){ const x = 30 + i * U / n, g = i % n === 0;
    s += `<line x1="${x}" y1="${g ? 34 : 39}" x2="${x}" y2="${g ? 56 : 51}" stroke="#1F3A5C" stroke-width="${g ? 1.8 : 1}"/>`;
    const lab = opts.etiquettes ? opts.etiquettes(i) : (g ? String(i / n) : '');
    if(lab) s += `<text x="${x}" y="74" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${lab}</text>`; }
  (points || []).forEach(([v, nom, c]) => { const x = 30 + v * U; s += `<circle cx="${x}" cy="45" r="5" fill="${c || '#E35D3A'}"/><text x="${x}" y="24" font-size="14" font-weight="700" text-anchor="middle" fill="${c || '#E35D3A'}" font-family="Space Grotesk">${nom}</text>`; });
  return s + '</svg>';
}
// Fraction écrite « en étage » sans KaTeX (lisible partout, y compris dans les tableaux).
function cm1Frac(a, b){ return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1.05;margin:0 2px;font-weight:600;"><span style="padding:0 3px;">${a}</span><span style="border-top:1.6px solid currentColor;padding:0 3px;">${b}</span></span>`; }
// Opération posée alignée sur la virgule : lignes = [[signe, 'chiffres']], la dernière est le résultat ;
// un 3e élément vrai dans une ligne trace un trait au-dessus d'elle (produits partiels) ;
// retenues = chaîne alignée à droite (espaces = pas de retenue). Commune au CM1 et au CM2.
function cm1Posee(lignes, retenues){
  const larg = Math.max(...lignes.map(l => l[1].length), retenues ? retenues.length : 0);
  const cell = (c, st) => `<td style="width:22px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.15rem;font-weight:700;padding:2px 0;${st || ''}">${c === ' ' ? '' : c}</td>`;
  let h = '<table style="border-collapse:collapse;margin:8px auto;">';
  if(retenues) h += `<tr><td></td>${retenues.padStart(larg).split('').map(c => cell(c, 'font-size:.75rem;color:#E35D3A;')).join('')}</tr>`;
  lignes.forEach(([s, n, trait], i) => { const res = i === lignes.length - 1;
    h += `<tr style="${res || trait ? 'border-top:2px solid #1F3A5C;' : ''}">${cell(s, 'color:#E35D3A;')}${n.padStart(larg).split('').map(c => cell(c, res ? 'color:#2E9C6A;' : '')).join('')}</tr>`; });
  return h + '</table>';
}

/* ---- Pliage animé d'un patron (cube, pavé) -- demandé : « animer un patron de cube en le pliant
   (avec choix des différents modèles) ». Un patron est une liste de faces rectangulaires [x, y, l, h]
   dans le plan ; les charnières sont trouvées toutes seules (côtés communs), puis chaque face tourne
   de 0 à 90° autour de sa charnière (vers le haut), en suivant la face à laquelle elle est attachée.
   Dessin en 3D (SVG), vue orientable en faisant glisser. Si deux faces finissent au même endroit,
   elles passent en rouge : la figure n'est pas un patron.
   cm1Pliage(id, { modeles: [{ nom, faces, couleurs? }], legende? }) renvoie le bloc HTML ; le dessin
   est lancé à l'ouverture du chapitre (cm1Chapitre › init). ---- */
const CM_PLIAGES = {};
const CM_PLIAGE_COUL = ['#2EA8C9', '#E35D3A', '#2E9C6A', '#F2A93B', '#7A4FC0', '#C2185B'];
function cmCube(cases){ return cases.map(([x, y]) => [x, y, 1, 1]); }
// Les 11 patrons du cube (cases [colonne, ligne]).
const CM_CUBE_PATRONS = [
  { nom: 'La croix', cases: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]] },
  { nom: 'Le T', cases: [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2]] },
  { nom: 'Le décalé', cases: [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]] },
  { nom: 'Le grand Z', cases: [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]] },
  { nom: 'Le L', cases: [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]] },
  { nom: 'Le crochet', cases: [[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [2, 2]] },
  { nom: 'Le 2-3-1 (a)', cases: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [1, 2]] },
  { nom: 'Le 2-3-1 (b)', cases: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [2, 2]] },
  { nom: 'Le 2-3-1 (c)', cases: [[0, 0], [1, 0], [1, 1], [2, 1], [3, 1], [3, 2]] },
  { nom: 'L\'escalier', cases: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { nom: 'Le 3-3', cases: [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]] },
];
function cm1Pliage(id, o){
  CM_PLIAGES[id] = { modeles: o.modeles, m: 0, t: 0, yaw: -0.55, pitch: 0.95, anim: null, cadre: null };
  const choix = o.modeles.length > 1 ? `<div class="cmp-modeles">${o.modeles.map((m, i) => `<button type="button" class="cmp-mod${i ? '' : ' on'}" onclick="cmPliageModele('${id}',${i})">${m.nom}</button>`).join('')}</div>` : '';
  return `<div class="figure-wrap cm-pliage" data-pliage="${id}">${choix}
    <svg class="cmp-svg" viewBox="-100 -70 200 140" onpointerdown="cmPliageTourner(event,'${id}')"></svg>
    <div class="cmp-barre"><button type="button" class="btn cmp-jouer" onclick="cmPliageJouer('${id}')"><span class="gicon">play_arrow</span> Plier</button>
      <input type="range" min="0" max="100" value="0" aria-label="Pliage" oninput="cmPliageT('${id}', this.value / 100)">
      <span class="cmp-msg"></span></div>
    <p class="hint" style="margin:4px 0 0;">${o.legende || 'Clique sur « Plier », ou fais glisser le curseur. Fais glisser le dessin pour le voir sous un autre angle.'}</p></div>`;
}
// Préparation d'un modèle : arbre des charnières depuis la face de base (celle qui a le plus de voisines).
function cmPliagePrep(m){
  if(m._faces) return m._faces;
  const F = m.faces.map(([x, y, w, h], i) => ({ i, x, y, w, h, c: [x + w / 2, y + h / 2], vois: [] })), e = 1e-6;
  for(let a = 0; a < F.length; a++) for(let b = a + 1; b < F.length; b++){
    const A = F[a], B = F[b];
    let seg = null;
    const hx = [Math.max(A.x, B.x), Math.min(A.x + A.w, B.x + B.w)], vy = [Math.max(A.y, B.y), Math.min(A.y + A.h, B.y + B.h)];
    if(Math.abs(A.y + A.h - B.y) < e && hx[1] - hx[0] > e) seg = [[hx[0], B.y], [hx[1], B.y]];
    else if(Math.abs(B.y + B.h - A.y) < e && hx[1] - hx[0] > e) seg = [[hx[0], A.y], [hx[1], A.y]];
    else if(Math.abs(A.x + A.w - B.x) < e && vy[1] - vy[0] > e) seg = [[B.x, vy[0]], [B.x, vy[1]]];
    else if(Math.abs(B.x + B.w - A.x) < e && vy[1] - vy[0] > e) seg = [[A.x, vy[0]], [A.x, vy[1]]];
    if(seg){ A.vois.push([b, seg]); B.vois.push([a, seg]); }
  }
  const base = F.reduce((p, f) => f.vois.length > p.vois.length ? f : p, F[0]);
  base.parent = null; const vu = new Set([base.i]), file = [base];
  while(file.length){
    const f = file.shift();
    f.vois.forEach(([j, seg]) => { if(vu.has(j)) return; vu.add(j); const g = F[j];
      const P = [seg[0][0], seg[0][1], 0], dx = seg[1][0] - seg[0][0], dy = seg[1][1] - seg[0][1], L = Math.hypot(dx, dy);
      // n : du côté de la charnière vers le centre de la face ; axe d = n × z (la face monte en tournant).
      const ux = dx / L, uy = dy / L, cx = g.c[0] - seg[0][0], cy = g.c[1] - seg[0][1], s = cx * -uy + cy * ux;
      const nx = -uy * Math.sign(s), ny = ux * Math.sign(s);
      g.parent = f; g.P = P; g.d = [ny, -nx, 0]; file.push(g); });
  }
  return m._faces = F;
}
function cmRot(p, P, d, a){ // rotation de p autour de la droite (P, d) d'angle a (Rodrigues)
  const v = [p[0] - P[0], p[1] - P[1], p[2] - P[2]], c = Math.cos(a), s = Math.sin(a), k = d[0] * v[0] + d[1] * v[1] + d[2] * v[2];
  const x = [d[1] * v[2] - d[2] * v[1], d[2] * v[0] - d[0] * v[2], d[0] * v[1] - d[1] * v[0]];
  return [0, 1, 2].map(i => P[i] + v[i] * c + x[i] * s + d[i] * k * (1 - c));
}
function cmPliagePoint(f, p, a){ while(f && f.parent){ p = cmRot(p, f.P, f.d, a); f = f.parent; } return p; }
function cmPliageFaces(st, t){
  const F = cmPliagePrep(st.modeles[st.m]), a = t * Math.PI / 2;
  return F.map(f => ({ f, pts: [[f.x, f.y, 0], [f.x + f.w, f.y, 0], [f.x + f.w, f.y + f.h, 0], [f.x, f.y + f.h, 0]].map(p => cmPliagePoint(f, p, a)) }));
}
function cmProj(st, p, cx, cy){ // vue : rotation autour de la verticale (yaw), puis inclinaison (pitch)
  const x = p[0] - cx, y = p[1] - cy, z = p[2], cyw = Math.cos(st.yaw), syw = Math.sin(st.yaw);
  const xr = x * cyw - y * syw, yr = x * syw + y * cyw, ce = Math.cos(st.pitch), se = Math.sin(st.pitch);
  return [xr, -(yr * se + z * ce) + 0, -yr * ce + z * se]; // [écran x, écran y (vers le bas), profondeur vers l'œil]
}
function cmPliageDessiner(id){
  const st = CM_PLIAGES[id], box = document.querySelector(`.cm-pliage[data-pliage="${id}"]`); if(!st || !box) return;
  const svg = box.querySelector('.cmp-svg'), F = cmPliagePrep(st.modeles[st.m]);
  // Centre : celui du patron à plat ; cadre fixe pour tout le pliage (pas de zoom qui saute).
  const xs = F.flatMap(f => [f.x, f.x + f.w]), ys = F.flatMap(f => [f.y, f.y + f.h]);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const cle = st.m + ':' + st.yaw.toFixed(2) + ':' + st.pitch.toFixed(2);
  if(st.cadre !== cle){
    const pts = [0, .35, .7, 1].flatMap(t => cmPliageFaces(st, t).flatMap(o => o.pts)).map(p => cmProj(st, p, cx, cy));
    const X = pts.map(p => p[0]), Y = pts.map(p => p[1]), m = .35;
    const x0 = Math.min(...X) - m, y0 = Math.min(...Y) - m, w = Math.max(...X) - x0 + m, h = Math.max(...Y) - y0 + m;
    svg.setAttribute('viewBox', `${x0} ${y0} ${w} ${h}`); st.cadre = cle; st.ech = Math.max(w, h);
  }
  const faces = cmPliageFaces(st, st.t);
  // Faces superposées en fin de pliage : pas un patron.
  const fin = st.t > .985, clef = o => o.pts.reduce((s, p) => [s[0] + p[0] / 4, s[1] + p[1] / 4, s[2] + p[2] / 4], [0, 0, 0]).map(v => v.toFixed(2)).join(',');
  const compte = {}; if(fin) faces.forEach(o => { const k = clef(o); compte[k] = (compte[k] || 0) + 1; });
  const sw = (st.ech / 140).toFixed(3), lum = [-.4, -.5, .77];
  const proj = faces.map(o => {
    const P = o.pts.map(p => cmProj(st, p, cx, cy)), prof = P.reduce((s, p) => s + p[2], 0) / 4;
    const u = [o.pts[1][0] - o.pts[0][0], o.pts[1][1] - o.pts[0][1], o.pts[1][2] - o.pts[0][2]], v = [o.pts[3][0] - o.pts[0][0], o.pts[3][1] - o.pts[0][1], o.pts[3][2] - o.pts[0][2]];
    const n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]], L = Math.hypot(...n) || 1;
    const ombre = .55 + .45 * Math.abs((n[0] * lum[0] + n[1] * lum[1] + n[2] * lum[2]) / L);
    const doublon = fin && compte[clef(o)] > 1;
    const coul = doublon ? '#D93025' : ((st.modeles[st.m].couleurs || [])[o.f.i] || CM_PLIAGE_COUL[o.f.i % CM_PLIAGE_COUL.length]);
    return { P, prof, ombre, coul, doublon };
  }).sort((a, b) => (a.doublon - b.doublon) || (a.prof - b.prof)); // faces superposées dessinées par-dessus, pour qu'on les voie
  svg.innerHTML = proj.map(q => `<polygon points="${q.P.map(p => p[0].toFixed(3) + ',' + p[1].toFixed(3)).join(' ')}" fill="${q.coul}" fill-opacity="${q.doublon ? .8 : (.35 + .5 * q.ombre).toFixed(2)}" stroke="${q.doublon ? '#8E1B12' : '#1F3A5C'}" stroke-width="${sw}" stroke-linejoin="round"/>`).join('');
  const nDoublons = Object.values(compte).filter(n => n > 1).length;
  box.querySelector('.cmp-msg').innerHTML = !fin ? '' : nDoublons ? '<b style="color:#D93025;">Deux faces se superposent : ce n\'est pas un patron.</b>' : '<b style="color:#1F7A4D;">Le solide est fermé : c\'est un patron ✔</b>';
  box.querySelector('input[type=range]').value = Math.round(st.t * 100);
  box.querySelector('.cmp-jouer').innerHTML = st.t > .5 ? '<span class="gicon">replay</span> Déplier' : '<span class="gicon">play_arrow</span> Plier';
}
function cmPliageT(id, t){ const st = CM_PLIAGES[id]; cancelAnimationFrame(st.anim); st.anim = null; st.t = t; cmPliageDessiner(id); }
function cmPliageModele(id, i){
  const st = CM_PLIAGES[id]; cancelAnimationFrame(st.anim); st.anim = null; st.m = i; st.t = 0; st.cadre = null;
  document.querySelectorAll(`.cm-pliage[data-pliage="${id}"] .cmp-mod`).forEach((b, k) => b.classList.toggle('on', k === i));
  cmPliageDessiner(id);
}
function cmPliageJouer(id){
  const st = CM_PLIAGES[id]; cancelAnimationFrame(st.anim);
  const t0 = st.t, but = t0 > .5 ? 0 : 1, d = 2200 * Math.abs(but - t0) || 1, debut = performance.now();
  const pas = now => { const k = Math.min(1, (now - debut) / d), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    st.t = t0 + (but - t0) * e; cmPliageDessiner(id); st.anim = k < 1 ? requestAnimationFrame(pas) : null; };
  st.anim = requestAnimationFrame(pas);
}
function cmPliageTourner(e, id){
  const st = CM_PLIAGES[id], x0 = e.clientX, y0 = e.clientY, a0 = st.yaw, b0 = st.pitch; e.preventDefault();
  const bouge = ev => { st.yaw = a0 + (ev.clientX - x0) / 120; st.pitch = Math.max(.15, Math.min(1.45, b0 - (ev.clientY - y0) / 160)); st.cadre = null; cmPliageDessiner(id); };
  const fin = () => { window.removeEventListener('pointermove', bouge); window.removeEventListener('pointerup', fin); };
  window.addEventListener('pointermove', bouge); window.addEventListener('pointerup', fin);
}

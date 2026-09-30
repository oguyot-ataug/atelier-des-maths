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
  return (redaction ? `<div class="redaction-block"><h3>${redaction.titre}</h3><div class="redaction-template">${redaction.lignes.map(([e, c]) => `<div class="we-row"><span class="we-expr">${e}</span><span class="we-comment">${c}</span></div>`).join('')}</div></div>` : '')
    + `<div class="redaction-block"><h3>Exercices</h3>${liste.map(([e, c], i) => `<div class="exo-card"><div class="num">Exercice ${i + 1}</div>${e}
      <button type="button" class="exo-correction-toggle" data-target="cm1-${slug}-c${i + 1}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
      <div class="exo-correction" id="cm1-${slug}-c${i + 1}"><p style="margin:0;">${c}</p></div></div>`).join('')}</div>`;
}
function cm1Histoire(titre, paras){ return `<div class="history-box"><div class="history-title"><span class=gicon>history_edu</span> ${titre}</div>${paras.map(p => `<p style="margin:0 0 12px;">${p}</p>`).join('')}</div>`; }
function cm1Conteneurs(slug){
  [['panel-cours', 'cours'], ['panel-methode', 'methode'], ['panel-exercices', 'exos'], ['panel-histoire', 'histoire']].forEach(([p, k]) => {
    const id = k + '-demo-cm1-' + slug; if(document.getElementById(id)) return;
    const panel = document.getElementById(p); if(!panel) return;
    const d = document.createElement('div'); d.id = id; d.style.display = 'none'; panel.appendChild(d);
  });
}
function cm1Chapitre(o){
  cm1Conteneurs(o.slug);
  const id = k => k + '-demo-cm1-' + o.slug;
  const poser = (k, html) => { const el = document.getElementById(id(k)); if(el) el.innerHTML = html || ''; };
  poser('cours', o.cours); poser('methode', o.methode); poser('exos', o.exos); poser('histoire', o.histoire);
  (o.demos || []).forEach(([k, steps]) => { CM1_DEMOS[k] = makeStepDemo(steps, 'cm1d-' + k); });
  if(o.quiz) DEMO_QUIZZES['cm1|' + o.titre] = o.quiz;
  DEMO_REGISTRY['cm1|' + o.titre] = { cours: id('cours'), methode: id('methode'), exos: id('exos'), histoire: id('histoire'),
    init: () => {
      ['cours', 'methode', 'exos', 'histoire'].forEach(k => { const el = document.getElementById(id(k)); if(el && typeof renderStaticMath === 'function') renderStaticMath(el); });
      ['cours', 'methode'].forEach(k => { const el = document.getElementById(id(k)); if(el && typeof injectCourseAddButtons === 'function') injectCourseAddButtons(el); });
      (o.demos || []).forEach(([k]) => CM1_DEMOS[k].reset());
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

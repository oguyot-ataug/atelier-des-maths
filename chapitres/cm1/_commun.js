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
const PLANCHES = {}; // « niveau|titre » → planches d'exercices imprimables [{ titre, attendus, duree, exos }] (voir planches.js)
const CM_FLASH = {}; // « niveau|titre » → [{ q, r:[réponses A à D], ok:indice }] (voir flash-prets.js)
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
      <div class="exo-correction" id="cm1-${slug}-c${i + 1}"><div>${c}</div></div></div>`).join('')}</div>`;
}
/* Rédaction d'une réponse -- demandé : « Commencer par un titre qui reprend la demande de l'énoncé
   (" Âge de mamie : ") souligné. Puis un calcul. Si le calcul tient sur une ligne, on peut le garder
   ainsi, sinon on écrira A = ou B = et on développera le calcul en colonne. On en encadrera le
   résultat. Ensuite on conclut systématiquement. » Et : « ne jamais écrire plusieurs calculs sur une
   même ligne ».
   calc : une chaîne (calcul sur une seule ligne) ; un tableau de chaînes (calcul en colonne « A = … »,
   la dernière ligne, le résultat, est encadrée) ; ou { nom: 'B', lignes: [...] } pour une autre
   lettre ; { pose: html } pour une opération posée (cm1Posee), suivie au besoin de ses lignes ;
   { suite: [...] } pour plusieurs calculs courts, chacun sur sa ligne. Plusieurs blocs à la suite :
   un tableau de ces objets. */
// fig (facultatif) : un dessin qui montre la correction (frise, schéma en barres, figure…), placé
// sous le titre, avant les calculs -- demandé : « mieux représenter la correction par des dessins ».
function cm1Redac(titre, calc, phrase, fig){
  const un = x => {
    if(x == null || x === '') return '';
    if(typeof x === 'string') return `<div class="cm-redac-ligne">${x}</div>`;
    if(x.suite) return x.suite.map(l => `<div class="cm-redac-ligne">${l}</div>`).join(''); // plusieurs calculs, un par ligne
    const lignes = Array.isArray(x) ? x : (x.lignes || []), nom = (!Array.isArray(x) && x.nom) || 'A';
    return (x.pose ? `<div class="cm-redac-pose">${x.pose}</div>` : '')
      + (lignes.length ? `<table class="cm-redac-col">${lignes.map((l, i) => `<tr><td>${nom}</td><td>=</td><td>${i === lignes.length - 1 ? `<span class="cm-encadre">${l}</span>` : l}</td></tr>`).join('')}</table>` : '');
  };
  const calcs = Array.isArray(calc) && calc.some(x => typeof x === 'object' && x !== null) ? calc : [calc];
  return `<div class="cm-redac"><div class="cm-redac-titre">${titre} :</div>${fig ? `<div class="cm-redac-fig">${fig}</div>` : ''}${calcs.map(un).join('')}${phrase ? `<p class="cm-redac-phrase">${phrase}</p>` : ''}</div>`;
}
// Liste sans numéro (une question ou un calcul par ligne) -- demandé : pas de « 1. », « 2. » devant
// une question, surtout s'il est suivi d'un nombre ou d'un calcul.
function cm1Liste(items){ return `<ul class="cm-liste">${items.map(x => `<li>${x}</li>`).join('')}</ul>`; }
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
  (o.demos || []).forEach(([k, steps]) => { CM1_DEMOS[k] = makeStepDemo(steps, 'cm1d-' + k); CM1_DEMOS[k].steps = steps; }); // steps : les dessins des étapes y sont ajoutés (_demos-figs.js)
  // Une fraction écrite « 3/4 » dans un quiz s'affiche en LaTeX (demandé : jamais « a/b »).
  const frac = t => String(t).replace(/(\d+)\/(\d+)/g, (m, a, b) => cm1Frac(a, b));
  if(o.quiz) DEMO_QUIZZES[niv + '|' + o.titre] = o.quiz.map(x => Object.assign({}, x, { q: frac(x.q), opts: x.opts.map(frac) }));
  if(o.flash) CM_FLASH[niv + '|' + o.titre] = o.flash; // questions prêtes pour les Questions flash (cartes A à D)
  if(o.planches) PLANCHES[niv + '|' + o.titre] = o.planches; // planches d'exercices imprimables (planches.js)
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
/* Dessin des méthodes pas à pas (demandé : « il y a des consignes sans illustrations ; c'est compliqué »).
   cmFig({ w, h, k, grille, px }, items) : si k est donné, les coordonnées sont en carreaux (quadrillage
   dessiné si grille ≠ false). Items :
   ['l', x1, y1, x2, y2, o]   segment (o.c couleur, o.w épaisseur, o.d pointillés, o.f flèche au bout)
   ['p', x, y, nom, o]        point nommé (o.dx, o.dy : décalage du nom)
   ['pg', [[x, y]…], o]       polygone (o.f remplissage, o.op opacité)
   ['c', x, y, r, o]          cercle (r dans la même unité)
   ['r', x, y, w, h, o]       rectangle (carreau colorié…)
   ['t', x, y, texte, o]      texte (o.fs taille en px, o.a ancrage)
   ['ad', x, y, ux, uy, vx, vy] angle droit en (x, y) entre les directions u et v
   ['cd', x1, y1, x2, y2, n]  codage : n petits traits au milieu du segment
   ['acc', x1, x2, y, texte]  accolade horizontale de x1 à x2 (au-dessus si o.haut) avec un texte
   ['raw', '<path …/>']       morceau de SVG tel quel (dessin libre, en pixels) */
const CMF_K = '#1F3A5C', CMF_R = '#E35D3A', CMF_B = '#2EA8C9', CMF_V = '#2E9C6A', CMF_VI = '#7A4FC0', CMF_O = '#F2A93B';
function cmFig(o, items){
  const k = o.k || 1, m = o.m == null ? (o.k ? 10 : 0) : o.m, X = x => m + x * k, W = o.k ? 2 * m + o.w * k : o.w, H = o.k ? 2 * m + o.h * k : o.h;
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${o.px || W}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  if(o.k && o.grille !== false){ for(let i = 0; i <= o.w; i++) s += `<line x1="${X(i)}" y1="${X(0)}" x2="${X(i)}" y2="${X(o.h)}" stroke="#C6D2DE" stroke-width=".8"/>`; for(let j = 0; j <= o.h; j++) s += `<line x1="${X(0)}" y1="${X(j)}" x2="${X(o.w)}" y2="${X(j)}" stroke="#C6D2DE" stroke-width=".8"/>`; }
  const T = (x, y, t, q) => `<text x="${x}" y="${y}" font-size="${(q && q.fs) || 13}" text-anchor="${(q && q.a) || 'middle'}" fill="${(q && q.c) || CMF_K}" font-family="Space Grotesk" font-weight="700">${t}</text>`;
  (items || []).filter(Boolean).forEach(it => { const [t] = it, q = it[it.length - 1] && typeof it[it.length - 1] === 'object' && !Array.isArray(it[it.length - 1]) ? it[it.length - 1] : {};
    if(t === 'l'){ const [, x1, y1, x2, y2] = it, c = q.c || CMF_K; s += `<line x1="${X(x1)}" y1="${X(y1)}" x2="${X(x2)}" y2="${X(y2)}" stroke="${c}" stroke-width="${q.w || 2.2}"${q.d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
      if(q.f){ const a = Math.atan2(X(y2) - X(y1), X(x2) - X(x1)), L = 9; s += `<polygon points="${X(x2)},${X(y2)} ${X(x2) - L * Math.cos(a - .45)},${X(y2) - L * Math.sin(a - .45)} ${X(x2) - L * Math.cos(a + .45)},${X(y2) - L * Math.sin(a + .45)}" fill="${c}"/>`; } }
    else if(t === 'p'){ const [, x, y, n] = it, c = q.c || CMF_K; s += `<circle cx="${X(x)}" cy="${X(y)}" r="${q.r || 3.6}" fill="${c}"/>` + (n ? T(X(x) + (q.dx == null ? 9 : q.dx), X(y) + (q.dy == null ? -7 : q.dy), n, { c, fs: q.fs || 14 }) : ''); }
    else if(t === 'pg'){ const [, pts] = it; s += `<polygon points="${pts.map(([x, y]) => X(x) + ',' + X(y)).join(' ')}" fill="${q.f || 'none'}" fill-opacity="${q.op || .35}" stroke="${q.c || CMF_K}" stroke-width="${q.w || 2.2}" stroke-linejoin="round"${q.d ? ' stroke-dasharray="6 4"' : ''}/>`; }
    else if(t === 'c'){ const [, x, y, r] = it; s += `<circle cx="${X(x)}" cy="${X(y)}" r="${r * k}" fill="${q.f || 'none'}" fill-opacity="${q.op || .3}" stroke="${q.c || CMF_K}" stroke-width="${q.w || 2.2}"${q.d ? ' stroke-dasharray="6 4"' : ''}/>`; }
    else if(t === 'r'){ const [, x, y, w, h] = it; s += `<rect x="${X(x)}" y="${X(y)}" width="${w * k}" height="${h * k}" fill="${q.f || CMF_B}" fill-opacity="${q.op || .55}" stroke="${q.c || CMF_K}" stroke-width="${q.w || 1}"${q.rx ? ` rx="${q.rx}"` : ''}/>`; }
    else if(t === 't'){ const [, x, y, txt] = it; s += T(X(x), X(y), txt, q); }
    else if(t === 'ad'){ const [, x, y, ux, uy, vx, vy] = it, e = 10, nu = Math.hypot(ux, uy), nv = Math.hypot(vx, vy), a = [ux / nu * e, uy / nu * e], b = [vx / nv * e, vy / nv * e];
      s += `<polyline points="${X(x) + a[0]},${X(y) + a[1]} ${X(x) + a[0] + b[0]},${X(y) + a[1] + b[1]} ${X(x) + b[0]},${X(y) + b[1]}" fill="none" stroke="${q.c || CMF_R}" stroke-width="1.8"/>`; }
    else if(t === 'cd'){ const [, x1, y1, x2, y2, n] = it, mx = (X(x1) + X(x2)) / 2, my = (X(y1) + X(y2)) / 2, l = Math.hypot(X(x2) - X(x1), X(y2) - X(y1)), ux = (X(x2) - X(x1)) / l, uy = (X(y2) - X(y1)) / l;
      for(let i = 0; i < (n || 1); i++){ const d = (i - ((n || 1) - 1) / 2) * 4; s += `<line x1="${mx + ux * d - uy * 6}" y1="${my + uy * d + ux * 6}" x2="${mx + ux * d + uy * 6}" y2="${my + uy * d - ux * 6}" stroke="${q.c || CMF_R}" stroke-width="1.8"/>`; } }
    else if(t === 'raw') s += it[1]; // morceau de SVG déjà écrit (arc de compas…), en pixels
    else if(t === 'acc'){ const [, x1, x2, y, txt] = it, Y = X(y), sg = q.haut ? -1 : 1, a = X(x1) + 2, b = X(x2) - 2, mi = (a + b) / 2, c = q.c || CMF_VI;
      s += `<path d="M${a} ${Y} Q${a} ${Y + 6 * sg} ${a + 8} ${Y + 6 * sg} L${mi - 6} ${Y + 6 * sg} L${mi} ${Y + 12 * sg} L${mi + 6} ${Y + 6 * sg} L${b - 8} ${Y + 6 * sg} Q${b} ${Y + 6 * sg} ${b} ${Y}" fill="none" stroke="${c}" stroke-width="1.8"/>` + (txt ? T(mi, Y + (q.haut ? -18 : 27), txt, { c, fs: q.fs || 13 }) : ''); }
  });
  return s + '</svg>';
}
// Droite des nombres avec des sauts (calcul mental, durées…) : de min à max, graduations tous les pas ;
// depart, sauts = [[valeur, étiquette]] (négatif = vers la gauche) ; o.etiq : nombres écrits tous les etiq.
function cmSauts(min, max, depart, sauts, o){
  o = o || {}; const L = o.L || 440, W = L + 60, px = v => 30 + L * (v - min) / (max - min), pas = o.pas || (max - min) / 10;
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} 112" style="width:${o.px || W}px;max-width:100%;display:inline-block;vertical-align:middle;"><line x1="20" y1="80" x2="${W - 10}" y2="80" stroke="${CMF_K}" stroke-width="2"/><polygon points="${W - 10},80 ${W - 18},75 ${W - 18},85" fill="${CMF_K}"/>`;
  for(let v = min; v <= max + 1e-9; v += pas) s += `<line x1="${px(v)}" y1="74" x2="${px(v)}" y2="86" stroke="${CMF_K}" stroke-width="1.2"/>`;
  const marques = new Set([depart]); let v = depart;
  (sauts || []).forEach(([d, lab], i) => { const a = px(v), b = px(v + d), h = 24 + 10 * (i % 2), c = d > 0 ? CMF_V : CMF_R;
    s += `<path d="M${a} 76 Q${(a + b) / 2} ${76 - h * 2} ${b} 76" fill="none" stroke="${c}" stroke-width="2.2"/><polygon points="${b},76 ${b - (d > 0 ? 9 : -9)},70 ${b - (d > 0 ? 4 : -4)},66" fill="${c}"/>`
      + `<text x="${(a + b) / 2}" y="${74 - h}" font-size="14" text-anchor="middle" fill="${c}" font-family="Space Grotesk" font-weight="700">${lab}</text>`; v += d; marques.add(v); });
  [...marques].forEach((x, i) => { s += `<circle cx="${px(x)}" cy="80" r="4" fill="${i === marques.size - 1 && sauts && sauts.length ? CMF_R : CMF_K}"/><text x="${px(x)}" y="104" font-size="13" text-anchor="middle" fill="${CMF_K}" font-family="Space Grotesk" font-weight="700">${(o.fmt || (n => String(n).replace('.', ',')))(x)}</text>`; });
  return s + '</svg>';
}

// Bande (rectangle) partagée en n parts égales dont k sont coloriées ; plusieurs bandes si k > n.
function cm1Bande(n, k, opts){
  opts = opts || {}; const L = opts.largeur || 240, H = 34, c = opts.coul || '#FF8208', op = opts.coul ? .75 : 1;
  const nb = Math.max(1, Math.ceil(k / n)); let s = `<svg viewBox="0 0 ${nb * (L + 14)} ${H + 6}" style="width:${Math.min(100, nb * 46)}%;max-width:${nb * (L + 14)}px;display:inline-block;vertical-align:middle;">`;
  for(let b = 0; b < nb; b++){ const x0 = 3 + b * (L + 14);
    for(let i = 0; i < n; i++){ const on = b * n + i < k; s += `<rect x="${x0 + i * L / n}" y="3" width="${L / n}" height="${H}" fill="${on ? c : '#fff'}" fill-opacity="${on ? op : 1}" stroke="#1C1B2E" stroke-width="1.5"/>`; } }
  return s + '</svg>';
}
// Disque partagé en n parts égales dont k sont coloriées.
function cm1Disque(n, k, opts){
  opts = opts || {}; const r = 40, cx = 45, cy = 45, c = opts.coul || '#FF8208', op = opts.coul ? .75 : 1; let s = `<svg viewBox="0 0 90 90" style="width:${opts.taille || 90}px;display:inline-block;vertical-align:middle;">`;
  for(let i = 0; i < n; i++){ const a0 = -Math.PI / 2 + 2 * Math.PI * i / n, a1 = a0 + 2 * Math.PI / n;
    const p = n === 1 ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - .01} ${cy - r} Z` : `M ${cx} ${cy} L ${(cx + r * Math.cos(a0)).toFixed(2)} ${(cy + r * Math.sin(a0)).toFixed(2)} A ${r} ${r} 0 ${n === 2 ? 0 : 0} 1 ${(cx + r * Math.cos(a1)).toFixed(2)} ${(cy + r * Math.sin(a1)).toFixed(2)} Z`;
    s += `<path d="${p}" fill="${i < k ? c : '#fff'}" fill-opacity="${i < k ? op : 1}" stroke="#1C1B2E" stroke-width="1.5"/>`; }
  return s + '</svg>';
}
// Demi-droite graduée : de 0 à max unités, chaque unité partagée en n ; points = [[valeurNumérique, nom, couleur]].
// etiquettes(i) renvoie le texte sous la graduation i (par défaut : les entiers), ou [a, b] pour une fraction.
function cm1Graduation(max, n, points, opts){
  opts = opts || {}; const U = opts.unite || Math.min(150, 440 / max), W = 40 + max * U + 30;
  let s = `<svg viewBox="0 0 ${W} 94" style="width:100%;max-width:${W}px;display:block;margin:6px auto;"><line x1="20" y1="45" x2="${W - 8}" y2="45" stroke="#1C1B2E" stroke-width="1.6"/><polygon points="${W - 8},45 ${W - 16},40 ${W - 16},50" fill="#1C1B2E"/>`;
  for(let i = 0; i <= max * n; i++){ const x = 30 + i * U / n, g = i % n === 0;
    s += `<line x1="${x}" y1="${g ? 34 : 39}" x2="${x}" y2="${g ? 56 : 51}" stroke="#1C1B2E" stroke-width="${g ? 1.3 : 1}"/>`;
    const lab = opts.etiquettes ? opts.etiquettes(i) : (g ? String(i / n) : '');
    // [a, b] : fraction écrite en étage (jamais « a/b »).
    if(Array.isArray(lab)) s += `<text x="${x}" y="70" font-size="12" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${lab[0]}</text><line x1="${x - 7}" y1="74" x2="${x + 7}" y2="74" stroke="#1F3A5C" stroke-width="1.2"/><text x="${x}" y="87" font-size="12" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${lab[1]}</text>`;
    else if(lab) s += `<text x="${x}" y="74" font-size="13" text-anchor="middle" fill="#1C1B2E" font-family="JetBrains Mono, monospace">${lab}</text>`; }
  (points || []).forEach(([v, nom, c]) => { const x = 30 + v * U; s += `<circle cx="${x}" cy="45" r="4.5" fill="${c || '#FF8208'}"/><text x="${x}" y="24" font-size="14" font-weight="700" text-anchor="middle" fill="${c || '#FF8208'}" font-family="Space Grotesk">${nom}</text>`; });
  return s + '</svg>';
}
/* ---- Dessins des corrections rédigées et des planches (demandé : « mieux représenter la correction
   par des dessins ») ---- */
const cmT = (x, y, t, o) => `<text x="${x}" y="${y}" font-size="${(o && o.fs) || 12}" text-anchor="${(o && o.a) || 'middle'}" fill="${(o && o.c) || '#1F3A5C'}" font-family="Space Grotesk" font-weight="${(o && o.fw) || 700}">${t}</text>`;
// Une quantité en paquets (schéma en barres) : parts [valeur, texte dans la case, texte sous la case,
// couleur] ; la largeur suit la valeur. opts : titre (à gauche), L (largeur), echelle (valeur qui
// occupe L : deux barres dessinées avec la même échelle se comparent), uni (une seule couleur),
// accolade (texte sous toute la barre).
function cm1Paquets(parts, opts){
  opts = opts || {};
  const tot = parts.reduce((a, p) => a + p[0], 0), X0 = opts.titre ? (opts.xt || 96) : 4, L = opts.L || 380, ech = opts.echelle || tot;
  const Lr = L * tot / ech, W = X0 + L + 6, H = opts.accolade ? 86 : 52;
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:2px 0;">` + (opts.titre ? cmT(X0 - 10, 25, opts.titre, { a: 'end', fs: 13 }) : '');
  let x = X0;
  parts.forEach(([v, haut, bas, coul], i) => {
    const w = L * v / ech, c = coul || (i < parts.length - 1 || opts.uni ? '#CFE8F3' : '#FBE0D6');
    s += `<rect x="${x + 1}" y="6" width="${Math.max(1, w - 2)}" height="28" rx="4" fill="${c}" stroke="#1F3A5C" stroke-width="1.5"${haut === '?' ? ' stroke-dasharray="4 3"' : ''}/>` + (haut ? cmT(x + w / 2, 25, haut, { fs: 12, c: haut === '?' ? '#E35D3A' : '#1F3A5C' }) : '') + (bas ? cmT(x + w / 2, 48, bas, { fs: 11, c: '#1F7A4D' }) : '');
    x += w;
  });
  if(opts.accolade){ const m = X0 + Lr / 2; s += `<path d="M${X0 + 2} 52 Q${X0 + 2} 58 ${X0 + 10} 58 L${m - 6} 58 L${m} 64 L${m + 6} 58 L${X0 + Lr - 10} 58 Q${X0 + Lr - 2} 58 ${X0 + Lr - 2} 52" fill="none" stroke="#7A4FC0" stroke-width="1.5"/>` + cmT(m, 80, opts.accolade, { fs: 12, c: '#7A4FC0' }); }
  return s + '</svg>';
}
// Quadrillage : cases [[x, y]] coloriées (opts.c), les autres blanches -- chaque case n'est dessinée
// qu'une fois, pour qu'une planche « colorie » puisse se faire à l'écran (planches-num.js).
// opts : demis [[x, y, coin]] (coin hg, hd, bg, bd : le triangle colorié), k (taille d'un carreau),
// contour (trait épais autour de la figure), cote (étiquettes de côtés : [[x, y, 'texte']] en carreaux).
function cm1Quad(w, h, cases, opts){
  opts = opts || {}; const k = opts.k || 20, c = opts.c || '#FF8208', on = new Set((cases || []).map(([x, y]) => x + ',' + y));
  const W = w * k + 2, H = h * k + 2;
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${opts.largeur || W}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){ const p = on.has(x + ',' + y); s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="${p ? c : '#fff'}" fill-opacity="${p ? .6 : 1}" stroke="#B9C7D6" stroke-width=".8"/>`; }
  (opts.demis || []).forEach(([x, y, co]) => { const X = 1 + x * k, Y = 1 + y * k;
    const pts = { hg: [[X, Y], [X + k, Y], [X, Y + k]], hd: [[X, Y], [X + k, Y], [X + k, Y + k]], bg: [[X, Y], [X, Y + k], [X + k, Y + k]], bd: [[X + k, Y], [X + k, Y + k], [X, Y + k]] }[co];
    s += `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${c}" fill-opacity=".6" stroke="#1F3A5C" stroke-width=".8"/>`; });
  if(opts.contour && !(opts.demis || []).length){
    const tr = (a, b, d, e) => `<line x1="${1 + a * k}" y1="${1 + b * k}" x2="${1 + d * k}" y2="${1 + e * k}" stroke="${opts.contour === true ? '#1F3A5C' : opts.contour}" stroke-width="2.6" stroke-linecap="round"/>`;
    on.forEach(z => { const [x, y] = z.split(',').map(Number);
      if(!on.has(x + ',' + (y - 1))) s += tr(x, y, x + 1, y); if(!on.has(x + ',' + (y + 1))) s += tr(x, y + 1, x + 1, y + 1);
      if(!on.has((x - 1) + ',' + y)) s += tr(x, y, x, y + 1); if(!on.has((x + 1) + ',' + y)) s += tr(x + 1, y, x + 1, y + 1); });
  }
  (opts.textes || []).forEach(([x, y, t]) => { s += cmT(1 + x * k, 1 + y * k + 5, t, { fs: Math.max(11, k * .6) }); });
  return s + '</svg>';
}
// Périmètre (en côtés de carreau) d'une figure faite de cases entières.
function cm1QuadPerim(cases){ const on = new Set(cases.map(([x, y]) => x + ',' + y)); let p = 0; cases.forEach(([x, y]) => { [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([a, b]) => { if(!on.has((x + a) + ',' + (y + b))) p++; }); }); return p; }
// Cases d'un rectangle de l × h carreaux, coin en haut à gauche (x0, y0).
function cm1Rect(x0, y0, l, h){ const r = []; for(let y = y0; y < y0 + h; y++) for(let x = x0; x < x0 + l; x++) r.push([x, y]); return r; }
// Axe gradué pour ranger des mesures : de min à max, graduations tous les pas, étiquette tous les
// etiq ; points [[valeur, nom]].
function cm1Axe(min, max, pas, etiq, points, opts){
  opts = opts || {}; const L = opts.L || 460, W = L + 60, px = v => 30 + L * (v - min) / (max - min);
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} 76" style="width:100%;max-width:${W}px;display:block;margin:2px 0;"><line x1="20" y1="44" x2="${W - 10}" y2="44" stroke="#1C1B2E" stroke-width="1.6"/><polygon points="${W - 10},44 ${W - 18},40 ${W - 18},48" fill="#1C1B2E"/>`;
  for(let v = min; v <= max + 1e-9; v += pas){ const e = Math.abs((v - min) / etiq - Math.round((v - min) / etiq)) < 1e-6; s += `<line x1="${px(v)}" y1="${e ? 37 : 40}" x2="${px(v)}" y2="${e ? 51 : 48}" stroke="#1C1B2E" stroke-width="${e ? 1.3 : 1}"/>` + (e ? `<text x="${px(v)}" y="68" font-size="12" text-anchor="middle" fill="#1C1B2E" font-family="JetBrains Mono, monospace">${(opts.fmt || String)(v)}</text>` : ''); }
  (points || []).forEach(([v, nom], i) => { s += `<circle cx="${px(v)}" cy="44" r="4.5" fill="#FF8208"/>` + cmT(px(v), i % 2 && opts.alterne ? 30 : 28, nom, { fs: 13, c: '#FF8208' }); });
  return s + '</svg>';
}
// Balance à plateaux en équilibre : un objet à gauche, des masses marquées à droite.
function cm1Balance(objet, masses, opts){
  opts = opts || {};
  let s = `<svg class="pl-libre" viewBox="0 0 280 112" style="width:${opts.largeur || 220}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  s += `<polygon points="128,106 152,106 140,38" fill="#8E9AA8"/><line x1="36" y1="38" x2="244" y2="38" stroke="#4E5665" stroke-width="4" stroke-linecap="round"/><circle cx="140" cy="38" r="4" fill="#4E5665"/>`;
  s += `<path d="M6 76 L80 76 L72 86 L14 86 Z" fill="#C8D1DC" stroke="#4E5665"/><path d="M160 76 L274 76 L266 86 L168 86 Z" fill="#C8D1DC" stroke="#4E5665"/>`
    + `<line x1="36" y1="38" x2="12" y2="76" stroke="#4E5665"/><line x1="36" y1="38" x2="74" y2="76" stroke="#4E5665"/><line x1="244" y1="38" x2="166" y2="76" stroke="#4E5665"/><line x1="244" y1="38" x2="268" y2="76" stroke="#4E5665"/>`;
  s += `<ellipse cx="43" cy="62" rx="32" ry="14" fill="${opts.coul || '#8DB84A'}" stroke="#4E5665"/>` + cmT(43, 67, objet, { fs: 14 });
  const n = masses.length, w = Math.min(40, 108 / n);
  masses.forEach((m, i) => { const big = /kg/.test(m), h = big ? 26 : 20, x = 217 - (n * w) / 2 + i * w; s += `<rect x="${x + 1}" y="${76 - h}" width="${w - 2}" height="${h}" rx="3" fill="${big ? '#4E5665' : '#B8962E'}"/>` + cmT(x + w / 2, 76 - h / 2 + 5, m, { fs: 13, c: '#fff' }); });
  return s + '</svg>';
}
// Règle graduée (cm et mm) avec un segment posé dessus, de 0 à mm millimètres ; nom : « AB ».
function cm1RegleGraduee(mm, nom, opts){
  opts = opts || {}; const u = 40, x0 = 16, n = opts.n || Math.max(6, Math.ceil(mm / 10) + 1), W = x0 * 2 + n * u, a = (nom || 'AB')[0], b = (nom || 'AB')[1];
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} 92" style="width:${opts.largeur || '100%'};max-width:${W}px;display:block;margin:2px ${opts.largeur ? '0' : 'auto'};">`;
  s += `<line x1="${x0}" y1="16" x2="${x0 + mm * u / 10}" y2="16" stroke="#E35D3A" stroke-width="3"/><circle cx="${x0}" cy="16" r="3" fill="#E35D3A"/><circle cx="${x0 + mm * u / 10}" cy="16" r="3" fill="#E35D3A"/>` + cmT(x0, 10, a, { fs: 12, c: '#E35D3A' }) + cmT(x0 + mm * u / 10, 10, b, { fs: 12, c: '#E35D3A' });
  s += `<rect x="${x0 - 10}" y="24" width="${n * u + 20}" height="56" rx="5" fill="#FFF6D6" stroke="#B8962E"/>`;
  for(let i = 0; i <= n * 10; i++){ const x = x0 + i * u / 10, h = i % 10 === 0 ? 18 : i % 5 === 0 ? 12 : 7;
    s += `<line x1="${x}" y1="24" x2="${x}" y2="${24 + h}" stroke="#5B4A12" stroke-width="${i % 10 === 0 ? 1.3 : .7}"/>`;
    if(i % 10 === 0) s += cmT(x, 58, i / 10, { fs: 11, fw: 500, c: '#5B4A12' }); }
  return s + cmT(x0 + n * u, 74, 'cm', { fs: 10, fw: 500, a: 'end', c: '#5B4A12' }) + '</svg>';
}
// Fraction écrite en LaTeX (demandé : « ne pas écrire les fractions a/b mais toujours en LaTeX ») :
// rendue par KaTeX (renderStaticMath) à l'ouverture du chapitre, dans les étapes des méthodes,
// les quiz et le texte des animations.
function cm1Frac(a, b){ return `<span class="tex">\\dfrac{${a}}{${b}}</span>`; }
// Formule LaTeX quelconque dans le cours (ex. cm1Tex('\\dfrac{1}{2} = \\dfrac{5}{10}')).
function cm1Tex(src){ return `<span class="tex">${src}</span>`; }
// Opération posée alignée sur la virgule : lignes = [[signe, 'chiffres']], la dernière est le résultat ;
// un 3e élément vrai dans une ligne trace un trait au-dessus d'elle (produits partiels) ;
// retenues = chaîne alignée à droite (espaces = pas de retenue). Commune au CM1 et au CM2.
// opts.trous : le résultat est remplacé par des cases à remplir (planche à l'écran) ; opts.rep : le
// résultat est marqué comme réponse (corrigé lu par planches-num.js, case par case).
function cm1Posee(lignes, retenues, opts){
  opts = opts || {};
  const larg = Math.max(...lignes.map(l => l[1].length), retenues ? retenues.length : 0);
  const virg = new Set(); lignes.forEach(([, n]) => n.padStart(larg).split('').forEach((c, j) => { if(c === ',') virg.add(j); }));
  const cell = (c, st, res, j) => `<td style="width:${virg.has(j) ? 12 : 30}px;height:28px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.1rem;font-weight:700;padding:2px 0;color:#1C1B2E;${st || ''}">${c === ' ' ? '' : res && opts.trous && typeof plCase === 'function' ? '<span class="pl-case pl-case-seule" style="margin:0;width:18px;"></span>' : res && opts.rep && typeof plRep === 'function' ? plRep(c) : c}</td>`;
  let h = '<table style="border-collapse:collapse;margin:5px auto;">';
  if(retenues) h += `<tr><td></td>${retenues.padStart(larg).split('').map(c => cell(c, 'font-size:.72rem;color:#FF8208;')).join('')}</tr>`;
  lignes.forEach(([s, n, trait], i) => { const res = i === lignes.length - 1;
    h += `<tr style="${res || trait ? 'border-top:2px solid #1C1B2E;' : ''}">${cell(s, 'width:26px;color:#FF8208;')}${n.padStart(larg).split('').map((c, j) => cell(c, res ? 'color:#FF8208;font-size:1.2rem;' : '', res, j)).join('')}</tr>`; });
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
// Le bloc vivant (dans le chapitre, ou montré dans une session COURS), pas une copie figée du cahier.
function cmBoiteVivante(sel){ const l = document.querySelectorAll(sel); return [...l].find(b => b.closest('#view-chapitre, .cd-vivant')) || l[0] || null; }
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
  const st = CM_PLIAGES[id], box = cmBoiteVivante(`.cm-pliage[data-pliage="${id}"]`); if(!st || !box) return;
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

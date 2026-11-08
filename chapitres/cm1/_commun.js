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
      <div class="exo-correction" id="cm1-${slug}-c${i + 1}"><div class="cahier-page">${c}</div></div></div>`).join('')}</div>`;
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
// Le titre est souligné jusqu'à sa dernière lettre, jamais les deux-points (demandé : « on ne souligne jamais les ":" »).
// Division écrite « : » dans les rédactions, jamais « ÷ » (demandé le 07/11/2026 : « Dans les rédactions d'exercices, il est
// aussi préférable d'utiliser : pour la division et non ÷ ») : texte et formules LaTeX (\div) des lignes de calcul.
function cm1Deux(x){ return typeof x === 'string' ? x.replace(/÷/g, ':').replace(/\\div(?![a-zA-Z])/g, ':') : x; }
function cm1Redac(titre, calc, phrase, fig){
  const un = x => {
    if(x == null || x === '') return '';
    if(typeof x === 'string') return `<div class="cm-redac-ligne">${cm1Deux(x)}</div>`;
    if(x.suite) return x.suite.map(l => `<div class="cm-redac-ligne">${cm1Deux(l)}</div>`).join(''); // plusieurs calculs, un par ligne
    const lignes = Array.isArray(x) ? x : (x.lignes || []), nom = (!Array.isArray(x) && x.nom) || 'A';
    return (x.pose ? `<div class="cm-redac-pose">${x.pose}</div>` : '')
      + (lignes.length ? `<table class="cm-redac-col">${lignes.map((l, i) => `<tr><td>${nom}</td><td>=</td><td>${i === lignes.length - 1 ? `<span class="cm-encadre">${cm1Deux(l)}</span>` : cm1Deux(l)}</td></tr>`).join('')}</table>` : '');
  };
  const calcs = Array.isArray(calc) && calc.some(x => typeof x === 'object' && x !== null) ? calc : [calc];
  return `<div class="cm-redac"><div class="cm-redac-titre"><span class="cm-redac-sou">${titre}</span> :</div>${fig ? `<div class="cm-redac-fig">${fig}</div>` : ''}${calcs.map(un).join('')}${phrase ? `<p class="cm-redac-phrase">${phrase}</p>` : ''}</div>`;
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
      // Bouton « Dans mon cahier » en tête des onglets qui ont des opérations posées (07/11/2026).
      // Méthode : les opérations n'apparaissent qu'au fil des étapes (makeStepDemo), on les cherche donc dans les étapes.
      const etapesPosees = (o.demos || []).some(([, steps]) => { try{ return JSON.stringify(steps).includes('pose-ecran'); }catch(e){ return false; } });
      ['cours', 'methode', 'exos'].forEach(k => { const el = document.getElementById(id(k)); if(el && !el.querySelector(':scope > .cahier-barre') && (el.querySelector('table.pose-ecran[data-cahier]') || (k === 'methode' && etapesPosees))) el.insertAdjacentHTML('afterbegin', cahierBouton()); });
      cahierMaj();
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
  opts = opts || {}; const L = opts.L || 460;
  // Marge à la taille des étiquettes des extrémités (relecture 6e-N1-P3-E3 : « 40 000 000 et 41 000 000 sont légèrement
  // coupés, à gauche et à droite ») : chiffres de 12 px en police à chasse fixe, environ 7,3 px chacun.
  const lg = Math.max(String((opts.fmt || String)(min)).length, String((opts.fmt || String)(max)).length), m = Math.max(30, Math.ceil(lg * 7.3 / 2) + 6);
  const W = L + 2 * m, px = v => m + L * (v - min) / (max - min);
  let s = `<svg class="pl-libre" viewBox="0 0 ${W} 76" style="width:100%;max-width:${W}px;display:block;margin:2px 0;"><line x1="${m - 10}" y1="44" x2="${W - 10}" y2="44" stroke="#1C1B2E" stroke-width="1.6"/><polygon points="${W - 10},44 ${W - 18},40 ${W - 18},48" fill="#1C1B2E"/>`;
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
// Virgule décimale sans espace dans KaTeX : « 1,2 » et non « 1, 2 » (07/11/2026).
function cm1Frac(a, b){ const v = x => String(x).replace(/(\d),(?=\d)/g, '$1{,}'); return `<span class="tex">\\dfrac{${v(a)}}{${v(b)}}</span>`; }
// Formule LaTeX quelconque dans le cours (ex. cm1Tex('\\dfrac{1}{2} = \\dfrac{5}{10}')).
function cm1Tex(src){ return `<span class="tex">${src}</span>`; }
// Opération posée alignée sur la virgule : lignes = [[signe, 'chiffres']], la dernière est le résultat ;
// un 3e élément vrai dans une ligne trace un trait au-dessus d'elle (produits partiels) ;
// retenues = chaîne alignée à droite (espaces = pas de retenue). Commune au CM1 et au CM2.
// opts.trous : le résultat est remplacé par des cases à remplir (planche à l'écran) ; opts.rep : le
// résultat est marqué comme réponse (corrigé lu par planches-num.js, case par case).
// Retenues à l'écran (relecture CE2-N3-P1-E3 : « permettre d'ajouter des retenues ») : avec opts.trous, de
// petites cases de retenue sont prévues (cachées sur papier, où elles laissent la place d'écrire) --
// au-dessus de chaque rang pour une addition ou une multiplication, et pour une soustraction les marques de
// la compensation (« 1 » devant le chiffre du haut, « +1 » sous le chiffre du bas). planches-num.js en fait
// des cases à remplir, non notées. Avec opts.rep (corrigé à l'écran), ces retenues sont écrites.
// opts.retenues === false : pas de cases de retenue.
function cm1PoseeMarques(lignes, larg){
  const L = lignes.map(([s, n, t]) => [s, n.padStart(larg), t]), op = (L.find(l => /[+−×]/.test(l[0])) || [])[0];
  const chiffre = (n, j) => /\d/.test(n[j]) ? +n[j] : 0, cols = []; for(let j = larg - 1; j >= 0; j--) if(!L.some(l => l[1][j] === ',')) cols.push(j);
  const m = { op, ret: {}, haut: {}, bas: {} };
  if(op === '+' && !L.some(l => l[2]) && L.slice(0, -1).every(l => l[0] === ' ' || l[0] === '+')){
    const termes = L.slice(0, -1); let c = 0;
    cols.forEach((j, k) => { const t = termes.reduce((x, l) => x + chiffre(l[1], j), 0) + c; c = Math.floor(t / 10); const g = cols[k + 1];
      if(c && g != null && termes.some(l => /\d/.test(l[1].slice(0, g + 1)))) m.ret[g] = c; }); // pas de retenue au-dessus du chiffre qui dépasse tous les termes
  } else if(op === '−' && L.length === 3){
    let r = 0;
    cols.forEach(j => { const y = chiffre(L[1][1], j) + r; if(r) m.bas[j] = true; if(chiffre(L[0][1], j) < y){ m.haut[j] = true; r = 1; } else r = 0; });
  }
  return m;
}
function cm1Posee(lignes, retenues, opts){
  opts = opts || {};
  const larg = Math.max(...lignes.map(l => l[1].length), retenues ? retenues.length : 0);
  const virg = new Set(); lignes.forEach(([, n]) => n.padStart(larg).split('').forEach((c, j) => { if(c === ',') virg.add(j); }));
  // Espace des classes (« 2 476 ») : une colonne étroite, pas une colonne vide entière entre 2 et 4 (signalé le 05/11/2026).
  const esp = new Set(); lignes.forEach(([, n]) => { const p = n.padStart(larg); p.split('').forEach((c, j) => { if(c === ' ' && /\d/.test(p.slice(0, j)) && /\d/.test(p.slice(j + 1))) esp.add(j); }); });
  [...esp].forEach(j => { if(lignes.some(([, n]) => /\d/.test(n.padStart(larg)[j]))) esp.delete(j); });
  const op = (lignes.find(l => /[+−×]/.test(l[0])) || [])[0], cases = opts.trous && opts.retenues !== false && !retenues;
  const M = opts.rep && !retenues ? cm1PoseeMarques(lignes, larg) : null;
  if(M && M.op === '+' && Object.keys(M.ret).length) retenues = Array.from({ length: larg }, (_, j) => M.ret[j] ? String(M.ret[j]) : ' ').join('');
  // Rang compté depuis la droite (pour l'ordre de saisie à l'écran : unités, retenue, dizaines…).
  const rang = j => larg - 1 - j;
  const caseRet = (k, j, st) => `<span class="pl-ret-case" data-plret="${k}" data-plcol="${rang(j)}" style="visibility:hidden;${st || ''}"></span>`;
  // res : ligne à remplir (n° de ligne + 1, pour l'ordre de saisie à l'écran). opts.cases : version papier, une case vide
  // dans chaque colonne des lignes à remplir (relecture 6e-N1-P4-E2 : « préparer des cases pour la réponse sur papier »).
  const cell = (c, st, res, j, plus) => `<td${res && opts.trous && c !== ' ' ? ` data-plcol="${rang(j)}" data-plrow="${res}"` : ''} style="position:relative;width:${virg.has(j) ? 12 : esp.has(j) ? 7 : 30}px;height:28px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.1rem;font-weight:700;padding:2px 0;color:#1C1B2E;${st || ''}">${res && opts.cases && !virg.has(j) && !esp.has(j) ? '<span style="display:inline-block;width:20px;height:23px;border:1px solid #A9A4BE;border-radius:3px;vertical-align:middle;"></span>' : c === ' ' ? '' : res && opts.trous && typeof plCase === 'function' ? '<span class="pl-case pl-case-seule" style="margin:0;width:18px;"></span>' : res && opts.rep && typeof plRep === 'function' ? plRep(c) : c}${plus || ''}</td>`;
  const marque = (t, ou) => `<span style="position:absolute;${ou};font-size:.68rem;line-height:1;color:#E35D3A;font-weight:700;">${t}</span>`;
  const sous = op === '−' && lignes.length === 3;
  // « Dans mon cahier » (demandé le 07/11/2026) : la même opération sur une feuille Seyès, dessinée à la demande (cm1PoseeCahier).
  // Opération à compléter (cases à remplir) : elle reste interactive ; en mode cahier, la feuille Seyès est dessinée en fond (classe
  // pose-trous, styles.css) -- signalé le 07/11/2026 : « la fonctionnalité ne marche pas en plein écran ».
  const cahier = opts.trous || opts.cases ? ' class="pose-trous"' : ` class="pose-ecran" data-cahier="${JSON.stringify({ l: lignes.map(([s, n, t]) => t ? [s, n, 1] : [s, n]), r: retenues || '', h: M ? Object.keys(M.haut).map(Number) : [], b: M ? Object.keys(M.bas).map(Number) : [] }).replace(/"/g, '&quot;')}"`;
  let h = `<table${cahier} style="border-collapse:collapse;margin:${sous && (cases || M) ? 10 : 5}px auto 5px;">`;
  // Retenues juste au-dessus des chiffres (demandé le 05/11/2026 : « les retenues plus près du nombre ») : ligne basse, chiffre en bas.
  if(retenues) h += `<tr><td></td>${retenues.padStart(larg).split('').map((c, j) => cell(c, 'font-size:.72rem;color:#FF8208;height:13px;padding:0;line-height:1;vertical-align:bottom;', 0, j)).join('')}</tr>`;
  else if(cases && (op === '+' || op === '×')) h += `<tr><td></td>${Array.from({ length: larg }, (_, j) => `<td style="height:20px;padding:0;text-align:center;">${rang(j) > 0 && !virg.has(j) ? caseRet('a', j, 'display:inline-block;width:16px;height:16px;') : ''}</td>`).join('')}</tr>`;
  // Lignes à remplir : le résultat, et dans une multiplication les produits intermédiaires aussi (relecture 6e-N1-P4-E2 :
  // « en ligne, les produits ont déjà été réalisés »).
  lignes.forEach(([s, n, trait], i) => { const fin = i === lignes.length - 1, res = fin || (op === '×' && i >= 2 && (opts.trous || opts.rep || opts.cases)) ? i + 1 : 0, ch = n.padStart(larg).split('');
    // Soustraction : « 1 » devant le chiffre du haut (+10), « +1 » sous le chiffre du bas (compensation).
    const plus = j => !sous || virg.has(j) ? '' : i === 0 ? (cases && rang(j) < larg - 1 ? caseRet('h', j, 'position:absolute;left:-5px;top:-7px;') : M && M.haut[j] ? marque('+10', 'left:50%;top:-5px;transform:translateX(-50%);white-space:nowrap') : '') // « +10 » juste au-dessus du chiffre (05/11/2026)
      : i === 1 ? (cases && rang(j) > 0 ? caseRet('b', j, 'position:absolute;right:-5px;bottom:-6px;') : M && M.bas[j] ? marque('+1', 'left:calc(50% + 5px);bottom:3px;font-size:.6rem;white-space:nowrap') : '') : ''; // « +1 » en indice collé à son chiffre
    h += `<tr style="${fin || trait ? 'border-top:2px solid #1C1B2E;' : ''}">${cell(s, 'width:26px;color:#FF8208;')}${ch.map((c, j) => cell(c, fin ? 'color:#FF8208;font-size:1.2rem;' : '', res, j, plus(j))).join('')}</tr>`; });
  return h + '</table>';
}

/* ---- « Dans mon cahier » : opérations posées sur une feuille Seyès (demandé le 07/11/2026 : « mettre un fond type feuilles
   Seyès en respectant la marge et les lignes principales […] un bouton "dans mon cahier" »). Un chiffre par carreau, chaque
   nombre posé sur une ligne principale et haut de deux interlignes ; retenues et « +10 » dans l'interligne au-dessus du chiffre,
   « +1 » en indice ; virgule sur le trait vertical ; trait de l'opération sur la première ligne fine sous le nombre.
   Mode retenu sur l'appareil (cahierSeyes), pour tout le site : chaque tableau d'opération (cm1Posee, data-cahier) reçoit à
   côté son dessin, et l'écran montre l'un ou l'autre (classe cahier-on) ; l'impression garde toujours l'opération habituelle. ---- */
function cm1PoseeCahier(d, nu){
  const C = 32, MG = nu ? -C : 40, l = d.l, larg = Math.max(...l.map(x => x[1].length), (d.r || '').length), P = l.map(x => x[1].padStart(larg));
  const virg = new Set(), esp = new Set();
  P.forEach(n => n.split('').forEach((c, j) => { if(c === ',') virg.add(j); if(c === ' ' && /\d/.test(n.slice(0, j)) && /\d/.test(n.slice(j + 1))) esp.add(j); }));
  [...esp, ...virg].forEach(j => { if(P.some(n => /\d/.test(n[j]))){ esp.delete(j); virg.delete(j); } }); // nombres mal alignés : la colonne reste un carreau
  const col = {}; let k = 0; for(let j = 0; j < larg; j++) if(!virg.has(j) && !esp.has(j)) col[j] = k++;
  let prem = k; P.forEach(n => n.split('').forEach((c, j) => { if(/\d/.test(c)) prem = Math.min(prem, col[j]); }));
  // nu : posée sur la page d'une correction « cahier » (cahier-page) : pas de feuille à soi, mais les lignes de la page :
  // chiffres sur les lignes principales (CAHIER_B sous le haut de chaque carreau), colonnes sur les traits verticaux.
  // Retenues, « +10 » : un carreau de plus au-dessus, pour les écrire dans son interligne du haut.
  const haut = nu && (/\d/.test(d.r || '') || (d.h || []).length) ? 1 : 0;
  const x = c => MG + C * (2 + c - prem), yb = i => nu ? CAHIER_B + C * (i + haut) : 16 + C * (1 + i), dern = l.length - 1, W = x(k) + (nu ? 4 : C), H = nu ? C * (l.length + haut) : yb(dern) + 24;
  const ENCRE = '#1E3A8A', ROUGE = '#E35D3A', RES = '#15803D'; // résultat en vert (demandé le 07/11/2026 : « du vert pour souligner et pour les résultats »)
  let g = nu ? '' : `<rect width="${W}" height="${H}" fill="#fff"/>`;
  if(!nu){
  for(let y = 0; y <= H; y += 8) if((y - 16) % 32) g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#CDD2EE" stroke-width=".7"/>`;
  for(let x1 = MG + C; x1 < W; x1 += C) g += `<line x1="${x1}" y1="0" x2="${x1}" y2="${H}" stroke="#CDD2EE" stroke-width=".7"/>`;
  for(let y = 16; y <= H; y += 32) g += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="#8C93CF" stroke-width="1.1"/>`;
  g += `<line x1="${MG}" y1="0" x2="${MG}" y2="${H}" stroke="#E2626E" stroke-width="1.5"/>`; }
  const txt = (t, x1, y, taille, coul, ancre) => `<text x="${x1}" y="${y}" font-size="${taille}" fill="${coul}" text-anchor="${ancre || 'middle'}">${t}</text>`;
  l.forEach(([s, n, trait], i) => {
    const ch = P[i].split(''), coul = i === dern ? RES : ENCRE;
    if((i === dern || trait) && i > 0) g += `<line x1="${x(prem - 1) + 4}" y1="${yb(i - 1) + 8}" x2="${x(k) - 3}" y2="${yb(i - 1) + 8}" stroke="${ENCRE}" stroke-width="1.6" stroke-linecap="round"/>`;
    if(s && s.trim()) g += txt(s, x(prem - 1) + C / 2, yb(i) - 1, 26, '#F08C00');
    ch.forEach((c, j) => {
      if(/\d/.test(c)) g += txt(c, x(col[j]) + C / 2, yb(i), 27, coul);
      else if(c === ',' && virg.has(j)) { const g0 = Object.keys(col).map(Number).filter(m => m < j).pop(); g += txt(',', x(col[g0]) + C, yb(i) + 1, 27, coul); }
    });
  });
  (d.r || '').padStart(larg).split('').forEach((c, j) => { if(/\d/.test(c) && col[j] != null) g += txt(c, x(col[j]) + C / 2, yb(0) - 19, 15, ROUGE); });
  (d.h || []).forEach(j => { if(col[j] != null) g += txt('+10', x(col[j]) + C / 2, yb(0) - 19, 13, ROUGE); });
  (d.b || []).forEach(j => { if(col[j] != null) g += txt('+1', x(col[j]) + C / 2 + 6, yb(1) + 5, 10, ROUGE, 'start'); });
  return `<svg class="pose-cahier${nu ? ' nu' : ''}" data-geo-garde aria-hidden="true" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="display:none;max-width:100%;height:auto;margin:6px auto;font-family:Caveat,'Comic Sans MS',cursive;font-weight:700;border:1px solid #E1E4F2;border-radius:4px;">${g}</svg>`;
}
/* Corrections des exercices faits dans le cahier (demandé le 07/11/2026 : « Quid des corrections des exercices à faire dans le
   cahier ? Peux-tu aussi mettre le même fond ? ») : la correction (.cahier-page : onglet Exercices des chapitres, exercices de
   planche « cahier » ou « dans ton cahier ») s'écrit sur la feuille Seyès, à la main, chaque ligne posée sur une ligne principale.
   Chaque bloc (titre, ligne de calcul, phrase…) est allongé jusqu'au carreau suivant (cahierCaler) pour que la suite reste sur les
   lignes. Jamais dans les pages du Manuel ni à l'impression (.pl-page). */
const CAHIER_B = 23; // ligne principale : 23 px sous le haut de chaque carreau de 32 px (ligne de base de l'écriture)
let cahierOn = false; try{ cahierOn = localStorage.getItem('cahierSeyes') === '1'; }catch(e){}
let cahierRO = null;
/* Lignes avec une fraction (demandé le 07/11/2026 : « La barre de fraction doit être posée sur la ligne principale. Le signe = a
   comme axe de symétrie la ligne principale et les opérations s'alignent sur la ligne principale (- posé dessus, et + barre
   horizontale au même niveau que la barre de fraction) ») : la barre de fraction et les signes = + − × : < > sont centrés sur la ligne
   principale (styles.css, .cahier-op et .katex:has(.mfrac)) ; numérateur dans le carreau du dessus, dénominateur dans celui du
   dessous. Les signes écrits en texte entre deux fractions sont enveloppés ici (cahierOps) pour être descendus de même. */
const CAHIER_OP = /^\s*[=+\u2212\-×÷:<>≈≠≤≥]\s*$/;
function cahierOps(bloc){
  // « : » de la division (rédactions) : seulement dans une ligne de calcul, jamais dans une phrase (« Prix : … »).
  const deux = bloc.matches('.cm-redac-ligne, .cm-redac-col, .cm-redac-col *') ? ':' : '';
  const w = document.createTreeWalker(bloc, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('.katex, .cahier-op') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  const L = []; for(let n = w.nextNode(); n; n = w.nextNode()) L.push(n);
  L.forEach(n => {
    const S = `[=+\\u2212\\-×÷<>≈≠≤≥${deux}]`, t = n.nodeValue; if(!new RegExp(S).test(t)) return;
    const parts = t.split(new RegExp(`(\\s${S}\\s|^${S}\\s|\\s${S}$)`));
    if(parts.length < 2) return;
    const f = document.createDocumentFragment();
    parts.forEach(x => { if(!x) return; if(CAHIER_OP.test(x)){ const sp = document.createElement('span'); sp.className = 'cahier-op' + (/[≈≠≤≥]/.test(x) ? ' cahier-op-fin' : ''); sp.textContent = x; f.appendChild(sp); } else f.appendChild(document.createTextNode(x)); });
    n.parentNode.replaceChild(f, n);
  });
}
// Haut et bas de l'encre d'un élément (texte et formules), d'après les glyphes eux-mêmes.
function cahierEncre(el){ const L = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for(let n = w.nextNode(); n; n = w.nextNode()){ if(!n.nodeValue.trim()) continue; const g = document.createRange(); g.selectNodeContents(n); L.push(...[...g.getClientRects()].filter(x => x.height > 2 && x.width > 0)); }
  return L.length ? { t: Math.min(...L.map(x => x.top)), b: Math.max(...L.map(x => x.bottom)) } : null; }
function cahierCaler(page){
  if(!cahierOn || !page.isConnected || !page.offsetParent) return;
  const blocs = [], voir = el => [...el.children].forEach(c => { if(c.classList.contains('cm-redac') || c.classList.contains('redaction-template') || /^(UL|OL)$/.test(c.tagName) || (c.tagName === 'DIV' && !c.attributes.length && c.children.length && [...c.children].every(x => getComputedStyle(x).display !== 'inline'))) voir(c); else if(getComputedStyle(c).display !== 'inline') blocs.push(c); });
  voir(page);
  blocs.forEach(b => { b.style.removeProperty('--cal'); b.style.removeProperty('--calh'); b.style.removeProperty('--calm'); });
  // Hauteurs en pixels de la page, pas de l'écran : la projection et le Manuel agrandissent par zoom (signalé le 07/11/2026 :
  // « Le texte est bien sur les lignes principales mais pas les nombres »).
  const k = page.offsetHeight ? page.getBoundingClientRect().height / page.offsetHeight : 1;
  // Ligne avec une fraction : la ligne d'écriture (donc la barre de fraction) est descendue jusqu'à une ligne principale.
  const fr = blocs.map(b => !!b.querySelector('.mfrac'));
  blocs.forEach((b, i) => { if(fr[i]) cahierOps(b); });
  // Phrase à fraction écrite sur plusieurs lignes (relecture du 08/11/2026 : « "écriture fractionnaire" n'est pas écrit sur la ligne
  // principale ») : une ligne sur deux carreaux, le numérateur et le dénominateur gardent le leur, chaque ligne reste sur une ligne principale.
  blocs.forEach((b, i) => { b.classList.remove('cahier-fr2'); if(!fr[i]) return;
    const L = [], w = document.createTreeWalker(b, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('.katex, .cahier-op') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    for(let n = w.nextNode(); n; n = w.nextNode()){ if(!n.nodeValue.trim()) continue; const g = document.createRange(); g.selectNodeContents(n);
      [...g.getClientRects()].filter(r => r.height > 4 && r.width > 1).forEach(r => { if(!L.some(y => Math.abs(y - r.bottom) < 12 * (k || 1))) L.push(r.bottom); }); }
    if(L.length > 1 && !b.matches('table, .cm-redac-col') && !b.querySelector('table, svg, .katex-display')) b.classList.add('cahier-fr2'); });
  const haut = blocs.map((b, i) => {
    if(!fr[i]) return 0;
    const s = document.createElement('span'); s.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    b.insertBefore(s, b.firstChild); const bl = (s.getBoundingClientRect().bottom - b.getBoundingClientRect().top) / (k || 1); s.remove();
    return Math.round((((CAHIER_B - bl) % 32 + 32) % 32) * 100) / 100; // sans arrondi au pixel : sinon un « = » sur deux décalé d'1 px
  });
  // Deux lignes à fraction de suite (demandé le 07/11/2026 : « on peut remonter 2/5 × 240 d'un carreau ») : la seconde remonte
  // d'un carreau quand son numérateur tient encore dans son propre carreau (sous le dénominateur de la ligne précédente).
  const mont = blocs.map((b, i) => {
    if(!fr[i] || !fr[i - 1] || haut[i] < 16 || !(b.classList.contains('cm-redac-ligne') || b.classList.contains('cm-redac-phrase') || b.classList.contains('we-row')) || b.previousElementSibling !== blocs[i - 1]) return 0;
    const t = Math.min(...[...b.querySelectorAll('.katex-html')].map(e => e.getBoundingClientRect().top)), t0 = b.getBoundingClientRect().top;
    return (t - t0) / (k || 1) + haut[i] - 32 >= -1 ? -32 : 0;
  });
  blocs.forEach((b, i) => { if(haut[i]) b.style.setProperty('--calh', haut[i] + 'px'); if(mont[i]) b.style.setProperty('--calm', mont[i] + 'px'); });
  const H = blocs.map(b => b.getBoundingClientRect().height / (k || 1));
  // Titre souligné SUR L'INTERLIGNE, la première ligne fine sous la ligne principale (demandé le 07/11/2026 : « Souligner : sur
  // l'interligne ! ») : trait dessiné à 8,5 px sous la ligne d'écriture (--soul, styles.css), continu sous les jambages.
  page.querySelectorAll('.cm-redac-sou').forEach(u => {
    const s = document.createElement('span'); s.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline;';
    u.insertBefore(s, u.firstChild); const bl = (s.getBoundingClientRect().bottom - u.getBoundingClientRect().top) / (k || 1); s.remove();
    // Titre avec une fraction : le trait passe sous le dénominateur, sur la ligne fine suivante (jamais à travers le chiffre).
    let so = bl + 9.25; const kx = u.querySelector('.mfrac') ? cahierEncre(u) : null;
    const kb = kx ? (kx.b - u.getBoundingClientRect().top) / (k || 1) : 0; if(kb > so - 1) so += 8 * Math.ceil((kb + 1 - so) / 8);
    u.style.setProperty('--soul', (Math.round(so * 100) / 100) + 'px');
  });
  // Un dépassement de moins d'un pixel ne vaut pas un carreau de plus.
  blocs.forEach((b, i) => { const m = H[i] % 32, r = m < 1 ? 0 : Math.round((32 - m) * 100) / 100; if(r > .01) b.style.setProperty('--cal', r + 'px'); });
  // Un seul carreau entre un résultat et le titre suivant (demandé le 08/11/2026 : « ne passer qu'un seul carreau entre un résultat
  // et un nouveau titre ») : quand le raisonnement précédent finit par une ligne à fraction, son dénominateur occupe déjà ce carreau.
  page.querySelectorAll('.cm-redac').forEach(r => { const p = r.previousElementSibling;
    const fin = p && p.classList.contains('cm-redac') ? [...p.children].filter(c => c.offsetHeight).pop() : null;
    // Titre qui contient une fraction : son numérateur occupe le carreau au-dessus de sa ligne, qui sert de carreau d'écart.
    const titreFr = r.firstElementChild && r.firstElementChild.querySelector('.mfrac');
    if(p && p.classList.contains('cm-redac') && ((fin && fin.querySelector('.mfrac')) || titreFr)) r.style.setProperty('--redm', '0px'); else r.style.removeProperty('--redm');
    // Le numérateur du titre déborde un peu au-dessus de son carreau : on remonte le titre d'un carreau si la place est libre
    // (sous le dénominateur du résultat précédent), plutôt que de laisser un carreau vide.
    const ef = titreFr && fin ? cahierEncre(fin) : null, et = ef ? cahierEncre(r.firstElementChild) : null;
    if(ef && et && (et.t - ef.b) / (k || 1) >= 33) r.style.setProperty('--redm', '-32px'); });
}
function cahierAppliquer(racine){
  if(!cahierOn || !racine || !racine.querySelectorAll) return;
  const P = [...(racine.matches && racine.matches('.cahier-page') ? [racine] : []), ...racine.querySelectorAll('.cahier-page')];
  P.forEach(p => { if(p.closest('.pl-page') || p.classList.contains('cahier-actif')) return; p.classList.add('cahier-actif');
    if(!cahierRO && typeof ResizeObserver !== 'undefined') cahierRO = new ResizeObserver(es => es.forEach(e => cahierCaler(e.target)));
    if(cahierRO) cahierRO.observe(p); });
  const T = racine.matches && racine.matches('table.pose-ecran[data-cahier]') ? [racine] : racine.querySelectorAll('table.pose-ecran[data-cahier]');
  T.forEach(t => { const s = t.nextElementSibling; if(s && s.classList.contains('pose-cahier')) return;
    try{ t.insertAdjacentHTML('afterend', cm1PoseeCahier(JSON.parse(t.dataset.cahier), !!t.closest('.cahier-actif .cm-redac-pose, .cahier-actif .pl-poses-auto'))); }catch(e){} });
  P.forEach(p => { if(p.classList.contains('cahier-actif')) cahierCaler(p); });
}
if(typeof document !== 'undefined' && document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if(cahierOn) document.querySelectorAll('.cahier-actif').forEach(cahierCaler); });
let cahierObs = null;
function cahierMaj(){
  if(!document.body) return;
  document.body.classList.toggle('cahier-on', cahierOn);
  document.querySelectorAll('.cahier-btn').forEach(b => { b.setAttribute('aria-pressed', cahierOn ? 'true' : 'false'); b.classList.toggle('actif', cahierOn); });
  if(cahierOn){ cahierAppliquer(document.body);
    if(!cahierObs && typeof MutationObserver !== 'undefined'){ cahierObs = new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => { if(n.nodeType === 1 && !n.classList.contains('pose-cahier')) cahierAppliquer(n); }))); cahierObs.observe(document.body, { childList: true, subtree: true }); }
  } else { if(cahierObs){ cahierObs.disconnect(); cahierObs = null; } if(cahierRO){ cahierRO.disconnect(); cahierRO = null; } document.querySelectorAll('.cahier-actif').forEach(p => p.classList.remove('cahier-actif')); }
}
/* Tous les chapitres (demandé le 08/11/2026 : « étends-le au collège et aux 4 chapitres de CM1 ») : à l'ouverture d'un chapitre
   (openChapitre, app.js), chaque correction de l'onglet Exercices devient une page de cahier (.cahier-page) et le bouton
   « Dans mon cahier » est ajouté en tête des onglets qui ont une opération posée, une opération animée sur feuille (table.cma-op, division .dp-boite)
   ou des corrections. Les chapitres du primaire faits avec cm1Chapitre ont déjà leurs pages : rien n'est enveloppé deux fois. */
function cahierChapitre(demo){
  if(!demo || typeof document === 'undefined') return;
  const ex = document.getElementById(demo.exos);
  if(ex) ex.querySelectorAll('.exo-correction').forEach(c => {
    if(c.querySelector('.cahier-page') || c.closest('.cahier-page')) return;
    // Correction animée ou interactive (construction pas à pas, boutons, saisie) : elle garde sa présentation.
    if(c.querySelector('button, input, select, textarea, canvas, .figure-toolbar')) return;
    const els = [...c.children];
    // Division posée (.dp-boite, dessinée sur sa propre feuille comme dans le cours) : elle reste hors de la page, le texte qui
    // la suit forme la page de cahier (relecture du 08/11/2026 : division de 946 par 15 déformée dans la page).
    if(els.some(e => e.classList.contains('dp-boite'))){ const reste = els.filter(e => !e.classList.contains('dp-boite'));
      if(reste.length){ const d = document.createElement('div'); d.className = 'cahier-page'; reste[0].before(d); reste.forEach(e => d.appendChild(e)); } return; }
    if(els.length === 1 && els[0].tagName === 'DIV' && !els[0].className) els[0].classList.add('cahier-page');
    else if(els.length){ const d = document.createElement('div'); d.className = 'cahier-page'; while(c.firstChild) d.appendChild(c.firstChild); c.appendChild(d); }
  });
  // Exemples rédigés des cours, méthodes et rédactions types (demandé le 08/11/2026 : « Ces exemples aussi doivent être placés sur
  // papier seyes ») : chaque .redaction-template hors correction devient une page de cahier, sauf s'il est interactif.
  ['cours', 'methode', 'exos'].forEach(k => { const el = document.getElementById(demo[k]); if(!el) return;
    el.querySelectorAll('.redaction-template').forEach(t => {
      if(t.closest('.cahier-page, .exo-correction') || t.querySelector('button, input, select, textarea, canvas')) return;
      const d = document.createElement('div'); d.className = 'cahier-page cahier-exemple'; t.replaceWith(d); d.appendChild(t); }); });
  ['cours', 'methode', 'exos'].forEach(k => { const el = document.getElementById(demo[k]); if(!el || el.querySelector(':scope > .cahier-barre')) return;
    if(el.querySelector('table.pose-ecran[data-cahier], table.cma-op, .dp-boite, .cahier-page')) el.insertAdjacentHTML('afterbegin', cahierBouton()); });
  cahierMaj();
}
function cahierBasculer(){ cahierOn = !cahierOn; try{ localStorage.setItem('cahierSeyes', cahierOn ? '1' : '0'); }catch(e){} cahierMaj(); if(typeof cahierFlottantMaj === 'function') cahierFlottantMaj(); }
function cahierBouton(){ return `<div class="cahier-barre"><button type="button" class="cahier-btn${cahierOn ? ' actif' : ''}" aria-pressed="${cahierOn}" onclick="cahierBasculer()" title="Voir les opérations posées comme dans le cahier, sur une feuille à grands carreaux"><span class="gicon">menu_book</span> Dans mon cahier</button></div>`; }
/* Bouton flottant « Dans mon cahier » (demandé le 07/11/2026 : « Je préfère que le bouton "Dans mon cahier" soit accessible
   partout, pas seulement dans le cours car il faut retourner sur le cours pour changer la version ») : en bas à gauche, dès
   qu'une opération posée ou une correction « cahier » est à l'écran (exercices, corrections et vignettes de planches,
   projection, Manuel…), sauf si le bouton en tête d'onglet est déjà visible. Jamais à l'impression. */
let cahierFlotT = null;
function cahierFlottantPlanifier(){ if(!cahierFlotT) cahierFlotT = setTimeout(() => { cahierFlotT = null; cahierFlottantMaj(); }, 180); }
function cahierFlottantMaj(){
  if(!document.body) return;
  const H = window.innerHeight || 0, vu = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < H; };
  // Exercice de planche « Dans ton cahier ! » (.pl-cahier) : le bouton est là dès l'énoncé (08/11/2026 : « Tous les exercices "dans ton
  // cahier" doivent avoir cet outil ! »), sauf dans les pages du Manuel, qui ne changent pas.
  const contenu = [...document.querySelectorAll('.cahier-page, table.pose-ecran[data-cahier], table.pose-trous, table.cma-op, .dp-boite, svg.pose-cahier, .pl-cahier, .pl-cahier-m')].some(e => vu(e) && !(/pl-cahier/.test(e.className) && e.closest('.pl-page')));
  const enTete = [...document.querySelectorAll('.cahier-barre .cahier-btn')].some(vu);
  let b = document.getElementById('cahierFlottant');
  if(!contenu || enTete){ if(b) b.hidden = true; return; }
  if(!b){
    document.body.insertAdjacentHTML('beforeend', `<button type="button" id="cahierFlottant" class="cahier-btn cahier-flottant" onclick="cahierBasculer()" title="Voir les opérations et les corrections comme dans le cahier, sur une feuille à grands carreaux"><span class="gicon">menu_book</span> Dans mon cahier</button>`);
    b = document.getElementById('cahierFlottant');
  }
  b.hidden = false; b.classList.toggle('actif', cahierOn); b.setAttribute('aria-pressed', cahierOn ? 'true' : 'false');
}
function cahierFlottantInit(){
  window.addEventListener('scroll', cahierFlottantPlanifier, { passive: true, capture: true });
  window.addEventListener('resize', cahierFlottantPlanifier);
  if(typeof MutationObserver !== 'undefined') new MutationObserver(ms => { if(ms.some(m => !(m.target && m.target.id === 'cahierFlottant'))) cahierFlottantPlanifier(); })
    .observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden', 'open'] });
  cahierFlottantPlanifier();
}
if(typeof document !== 'undefined'){
  const go = () => { cahierMaj(); cahierFlottantInit(); };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
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

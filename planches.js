/* =====================================================================
   planches.js -- Planches d'exercices imprimables, chapitre par chapitre (primaire d'abord).

   Demandé : « Pour le primaire, je veux penser le site comme une aide véritable pour les professeurs
   des écoles. Ceux-ci n'ont souvent pas de formation scientifique et il faut que le site soit un
   véritable couteau suisse. Idéalement chaque chapitre doit être accompagné de planches d'exercices
   imprimables bien référencées. »

   - Un chapitre déclare ses planches dans cm1Chapitre({ planches: [...] }) (chapitres/cm1/_commun.js
     › PLANCHES) : [{ titre, attendus: [...], duree, exos: [{ etoiles: 1 à 3, consigne, eleve, corr }] }].
     « eleve » = ce que l'élève a sous les yeux (cases et pointillés pour répondre) ; « corr » = la
     même chose, réponses écrites, pour le corrigé du professeur.
   - Référence de chaque planche : NIVEAU-CODE-Pn (ex. CM1-N2-P1), rappelée en haut et en pied de page,
     avec l'attendu du programme travaillé et une durée indicative.
   - Page du chapitre : bouton « Planches à imprimer » (professeur, administrateur, parent) → la liste
     des planches ; chacune s'imprime seule, avec ou sans son corrigé, ou toutes d'un coup. Impression
     A4 par la fenêtre du navigateur (« Enregistrer au format PDF » possible), comme le cahier.
   - Exercice { col: 1 } = demi-largeur (deux exercices côte à côte) ; { cahier: true } = rédaction dans le
     cahier (Oliv'IA : « Dans ton cahier ! »). Réglages mémorisés sur l'appareil : identité (aucune,
     Prénom, NOM Prénom ; date), aménagements dys (police, taille, interligne, espacement).
   - Projection : chaque exercice, un par un, en grand, avec le bouton Correction.
   - Livre d'exercices d'un niveau : couverture, sommaire, planches dans l'ordre des chapitres, corrigés
     à la fin, pages numérotées ; il grandit avec les planches écrites (pour un éditeur ou un imprimeur).
   - Règles de rédaction du primaire (CLAUDE.md) : fractions en LaTeX (cm1Frac), pas de numérotation
     « 1. » devant les questions, un calcul par ligne, problèmes corrigés avec cm1Redac.
   ===================================================================== */

/* ---------- Petits outils pour écrire une planche (utilisés par les chapitres) ---------- */
// Fraction à compléter : deux cases et la barre.
function plFrac(){ return '<span class="pl-frac"><span class="pl-case"></span><span class="pl-barre"></span><span class="pl-case"></span></span>'; }
// Pointillés pour écrire une réponse (largeur en caractères environ).
function plPointilles(n){ return `<span class="pl-pts" style="min-width:${(n || 12) * 0.55}em;"></span>`; }
// Case vide (signe <, = ou >, une lettre…).
function plCase(){ return '<span class="pl-case pl-case-seule"></span>'; }
// Réponse écrite dans le corrigé.
function plRep(html){ return `<span class="pl-rep">${html}</span>`; }
// Réponse barrée dans le corrigé.
function plBarre(html){ return `<span class="pl-barre-rep">${html}</span>`; }
// Réponse entourée dans le corrigé.
function plEntoure(html){ return `<span class="pl-entoure">${html}</span>`; }
// Grille d'items (cols colonnes) : items = [html...].
function plGrille(items, cols){ return `<div class="pl-grille" style="grid-template-columns:repeat(${cols || 2},1fr);">${items.map(x => `<div class="pl-item">${x}</div>`).join('')}</div>`; }
// Liste à puces (jamais « 1. », « 2. »).
function plListe(items){ return `<ul class="pl-liste">${items.map(x => `<li>${x}</li>`).join('')}</ul>`; }
// Exercice de rédaction : l'élève répond dans son cahier (exo { cahier: true } : Oliv'IA et sa bulle).
// Lignes pour rédiger sur la planche, quand on veut quand même de la place.
function plLignes(n){ return `<div class="pl-lignes">${'<div></div>'.repeat(n || 3)}</div>`; }

/* ---------- Réglages (mémorisés sur l'appareil) ---------- */
const PL_POLICES = {
  standard: { nom: 'Standard', css: "Inter, Arial, sans-serif" },
  andika: { nom: 'Andika (lecteurs débutants)', css: "'Andika', Arial, sans-serif", gf: 'Andika:wght@400;700' },
  lexend: { nom: 'Lexend (lisibilité)', css: "'Lexend', Arial, sans-serif", gf: 'Lexend:wght@400;600;700' },
  atkinson: { nom: 'Atkinson Hyperlegible', css: "'Atkinson Hyperlegible', Arial, sans-serif", gf: 'Atkinson+Hyperlegible:wght@400;700' },
};
const PL_DEFAUT = { identite: 'prenom', date: true, police: 'standard', taille: 'normale', interligne: 'normal', espace: 'normal' };
function plPrefs(){ try{ return Object.assign({}, PL_DEFAUT, JSON.parse(localStorage.getItem('plPrefs') || '{}')); }catch(e){ return Object.assign({}, PL_DEFAUT); } }
function plPrefsSauver(p){ try{ localStorage.setItem('plPrefs', JSON.stringify(p)); }catch(e){} }
function plCssReglages(p){
  const taille = { normale: 11.5, grande: 13.5, tres: 15.5 }[p.taille] || 11.5;
  const lh = { normal: 1.35, aere: 1.7, tres: 2 }[p.interligne] || 1.35;
  const esp = p.espace === 'large' ? 'letter-spacing:.06em; word-spacing:.18em;' : '';
  return `body.pl-imp{ font-family:${(PL_POLICES[p.police] || PL_POLICES.standard).css}; font-size:${taille}pt; line-height:${lh}; ${esp} }
    .pl-page h1, .pl-num, .pl-ref{ font-family:${(PL_POLICES[p.police] || PL_POLICES.standard).css}; }`;
}
function plFontsLien(p){ const f = PL_POLICES[p.police]; return f && f.gf ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${f.gf}&display=swap">` : ''; }
// Logo du site, intégré à la page imprimée (data URL : rien à télécharger au moment d'imprimer).
let plLogoData = null;
async function plLogo(){
  if(plLogoData) return plLogoData;
  try{ const r = await fetch('assets/logo-horizontal.png'); const b = await r.blob();
    plLogoData = await new Promise(ok => { const fr = new FileReader(); fr.onload = () => ok(fr.result); fr.readAsDataURL(b); }); }catch(e){ plLogoData = ''; }
  return plLogoData;
}
function plOliv(pose){ return typeof olivPoseSvg === 'function' ? olivPoseSvg(pose) : ''; }

/* ---------- Bouton et fenêtre du chapitre ---------- */
const PL_NIVEAUX_TXT = { ce2: 'CE2', cm1: 'CM1', cm2: 'CM2', '6e': '6e', '5e': '5e', '4e': '4e', '3e': '3e' };
function plDe(lvl, titre){ return (typeof PLANCHES !== 'undefined' && PLANCHES[lvl + '|' + titre]) || []; }
function plRef(lvl, code, i){ return `${PL_NIVEAUX_TXT[lvl] || lvl}-${code}-P${i + 1}`; }
function plMaj(lvl, c){
  let b = document.getElementById('plBouton');
  const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null;
  const ok = (role === 'prof' || role === 'admin' || role === 'parent') && c && plDe(lvl, c.t).length > 0;
  if(!ok){ if(b) b.remove(); return; }
  if(!b){
    const meta = document.getElementById('chap-meta'); if(!meta) return;
    b = document.createElement('button'); b.id = 'plBouton'; b.type = 'button'; b.className = 'btn secondary pl-bouton';
    b.innerHTML = '<span class="gicon">print</span> Planches à imprimer';
    b.title = 'Planches d\'exercices de ce chapitre, à imprimer ou à projeter, avec leur corrigé';
    meta.insertAdjacentElement('afterend', b);
  }
  b.onclick = () => plOuvrir(lvl, c);
}
function plOuvrir(lvl, c){
  const liste = plDe(lvl, c.t); if(!liste.length) return;
  const esc = s => escapeHtml(String(s ?? ''));
  const p = plPrefs(), niv = PL_NIVEAUX_TXT[lvl] || lvl;
  const nbLivre = (CHAPITRES_BY_LEVEL[lvl] || []).filter(x => plDe(lvl, x.t).length).length;
  const sel = (id, opts, v) => `<select data-pref="${id}">${opts.map(([k, t]) => `<option value="${k}"${k === v ? ' selected' : ''}>${t}</option>`).join('')}</select>`;
  const o = document.createElement('div'); o.className = 'qzd-ov';
  o.innerHTML = `<div class="qzd-modal pl-modal" role="dialog" aria-label="Planches à imprimer">
    <h3><span class="gicon">print</span> Planches d'exercices : ${esc(c.t)}</h3>
    <p class="hint" style="margin:4px 0 10px;">${liste.length} planche${liste.length > 1 ? 's' : ''}, du plus simple (★) au plus difficile (★★★), chacune avec son corrigé. À imprimer (ou « Enregistrer au format PDF »), ou à projeter exercice par exercice.</p>
    <div class="pl-cartes">${liste.map((pl, i) => `<div class="pl-carte">
      <div class="pl-carte-tete"><span class="pl-ref">${plRef(lvl, c.code, i)}</span><b>${esc(pl.titre)}</b></div>
      <div class="pl-carte-att">${(pl.attendus || []).map(a => `<div><span class="gicon">flag</span> ${esc(a)}</div>`).join('')}</div>
      <div class="pl-carte-pied"><span class="hint" style="margin:0;">${pl.exos.length} exercices${pl.duree ? ' · environ ' + esc(pl.duree) : ''}</span>
        <button type="button" class="btn secondary" data-proj="${i}" title="Les exercices un par un, en grand, avec la correction"><span class="gicon">present_to_all</span> Projeter</button>
        <button type="button" class="btn secondary" data-imp="${i}" data-mode="eleve"><span class="gicon">print</span> Planche</button>
        <button type="button" class="btn secondary" data-imp="${i}" data-mode="corr"><span class="gicon">fact_check</span> Corrigé</button></div></div>`).join('')}</div>
    <details class="pl-reglages"${localStorage.getItem('plReglagesOuverts') ? ' open' : ''}><summary><span class="gicon">tune</span> Mise en page : nom, date, aménagements dys</summary>
      <div class="pl-reg-grille">
        <label>En-tête de l'élève ${sel('identite', [['prenom', 'Prénom'], ['nom', 'NOM et Prénom'], ['aucun', 'Rien']], p.identite)}</label>
        <label class="pl-reg-case"><input type="checkbox" data-pref="date" ${p.date ? 'checked' : ''}> Ligne « Date »</label>
        <label>Police ${sel('police', Object.entries(PL_POLICES).map(([k, f]) => [k, f.nom]), p.police)}</label>
        <label>Taille du texte ${sel('taille', [['normale', 'Normale'], ['grande', 'Grande'], ['tres', 'Très grande']], p.taille)}</label>
        <label>Interligne ${sel('interligne', [['normal', 'Normal'], ['aere', 'Aéré'], ['tres', 'Très aéré']], p.interligne)}</label>
        <label>Espacement ${sel('espace', [['normal', 'Normal'], ['large', 'Lettres et mots espacés']], p.espace)}</label>
      </div>
      <p class="hint" style="margin:6px 0 0;">Avec une grande taille ou un interligne aéré, une planche peut tenir sur deux pages. Ces réglages restent mémorisés sur cet appareil.</p></details>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;flex-wrap:wrap;">
      <button type="button" class="btn secondary" data-livre title="Toutes les planches du niveau, chapitre par chapitre, avec couverture, sommaire et corrigés : pour imprimer un livre"><span class="gicon">menu_book</span> Livre d'exercices ${esc(niv)} (${nbLivre} chapitre${nbLivre > 1 ? 's' : ''})</button>
      <span style="flex:1"></span>
      <button type="button" class="btn secondary" data-x>Fermer</button>
      <button type="button" class="btn secondary" data-tout="corr"><span class="gicon">fact_check</span> Tous les corrigés</button>
      <button type="button" class="btn" data-tout="eleve"><span class="gicon">print</span> Toutes les planches</button></div></div>`;
  document.body.appendChild(o);
  o.querySelectorAll('[data-pref]').forEach(el => el.onchange = () => {
    const q = plPrefs(); q[el.dataset.pref] = el.type === 'checkbox' ? el.checked : el.value; plPrefsSauver(q);
  });
  o.querySelector('.pl-reglages').addEventListener('toggle', e => { try{ if(e.target.open) localStorage.setItem('plReglagesOuverts', '1'); else localStorage.removeItem('plReglagesOuverts'); }catch(x){} });
  o.addEventListener('click', e => {
    const t = e.target;
    if(t === o || t.closest('[data-x]')){ o.remove(); return; }
    const pr = t.closest('[data-proj]'); if(pr){ plProjeter(lvl, c, Number(pr.dataset.proj)); return; }
    const b = t.closest('[data-imp]'); if(b){ plImprimer(lvl, [{ c, indices: [Number(b.dataset.imp)] }], b.dataset.mode); return; }
    const a = t.closest('[data-tout]'); if(a){ plImprimer(lvl, [{ c, indices: liste.map((_, i) => i) }], a.dataset.tout); return; }
    if(t.closest('[data-livre]')) plLivre(lvl);
  });
}

/* ---------- Une page ---------- */
const plEtoiles = k => '★'.repeat(k) + '<span class="pl-et-off">' + '★'.repeat(3 - k) + '</span>';
function plCahierHtml(){ return `<div class="pl-cahier"><span class="pl-oliv">${plOliv('savoir')}</span><span class="pl-bulle">Dans ton cahier !</span></div>`; }
function plExoCorps(x, corr){ return corr ? (x.corr || x.eleve || '') : ((x.eleve || '') + (x.cahier ? plCahierHtml() : '')); }
function plPageHtml(lvl, c, p, i, n, mode, pr, logo){
  const corr = mode === 'corr', ref = plRef(lvl, c.code, i), niv = PL_NIVEAUX_TXT[lvl] || lvl;
  const ident = corr ? '<p class="pl-pour-prof">Corrigé réservé au professeur.</p>'
    : (pr.identite !== 'aucun' || pr.date) ? `<div class="pl-nom">${pr.identite === 'nom' ? '<span>NOM : <span class="pl-pts" style="min-width:10em;"></span></span><span>Prénom : <span class="pl-pts" style="min-width:9em;"></span></span>'
        : pr.identite === 'prenom' ? '<span>Prénom : <span class="pl-pts" style="min-width:13em;"></span></span>' : ''}${pr.date ? '<span>Date : <span class="pl-pts" style="min-width:7em;"></span></span>' : ''}</div>` : '';
  return `<section class="pl-page${corr ? ' pl-corrige' : ''}">
    <header class="pl-tete">${logo ? `<img class="pl-logo" src="${logo}" alt="L'Atelier des Maths">` : '<span class="pl-site">L\'Atelier des Maths</span>'}<span class="pl-site">${niv} · ${escapeHtml(c.t)}</span><span class="pl-ref">${ref}${corr ? ' · CORRIGÉ' : ''}</span></header>
    <div class="pl-titre"><h1>Planche ${i + 1} : ${escapeHtml(p.titre)}</h1>${corr ? '' : `<span class="pl-oliv-tete"><span class="pl-oliv">${plOliv('muscle')}</span><span class="pl-bulle">Muscle ton jeu !</span></span>`}</div>
    ${ident}
    <div class="pl-attendus"><b>Je travaille :</b> ${(p.attendus || []).map(a => escapeHtml(a)).join(' ; ')}</div>
    <div class="pl-exos">${p.exos.map((x, k) => `<div class="pl-exo${x.col === 1 ? ' pl-demi' : ''}"><div class="pl-exo-tete"><span class="pl-num">Exercice ${k + 1}</span><span class="pl-et">${plEtoiles(x.etoiles || 1)}</span></div>
      <div class="pl-consigne">${x.consigne}</div><div class="pl-corps">${plExoCorps(x, corr)}</div></div>`).join('')}</div>
    <footer class="pl-pied">${ref} · Planche ${i + 1} sur ${n} · ${niv} · ${escapeHtml(c.t)} · ${p.duree ? 'environ ' + escapeHtml(p.duree) + ' · ' : ''}L'Atelier des Maths</footer>
  </section>`;
}
// Fractions dessinées en HTML (aucune dépendance au réseau au moment d'imprimer) ; le reste des
// formules, s'il y en a, passe par KaTeX.
function plFigerMaths(el){
  el.querySelectorAll('span.tex').forEach(t => {
    const h = t.textContent.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => `<span class="pl-f"><span>${a}</span><span>${b}</span></span>`);
    if(!/\\/.test(h)){ const sp = document.createElement('span'); sp.className = 'pl-tex'; sp.innerHTML = h; t.replaceWith(sp); }
  });
  if(typeof renderStaticMath === 'function') renderStaticMath(el);
  el.querySelectorAll('.katex-mathml').forEach(x => x.remove()); // copie pour lecteur d'écran : sur papier, elle doublerait chaque formule
}

/* ---------- Impression : des planches, ou un livre ---------- */
// blocs = [{ c, indices }] (un chapitre et ses planches) ; avant / apres = pages en plus (couverture…).
async function plImprimer(lvl, blocs, mode, opts){
  opts = opts || {};
  const pr = plPrefs(), logo = await plLogo();
  const pages = m => blocs.map(({ c, indices }) => { const l = plDe(lvl, c.t); return indices.map(i => plPageHtml(lvl, c, l[i], i, l.length, m, pr, logo)).join(''); }).join('');
  const tmp = document.createElement('div'); tmp.style.cssText = 'position:absolute;left:-9999px;top:0;width:180mm;';
  tmp.innerHTML = (opts.avant || '') + (mode === 'livre' ? pages('eleve') + (opts.entreCorriges || '') + pages('corr') : pages(mode));
  document.body.appendChild(tmp);
  plFigerMaths(tmp);
  const corps = tmp.innerHTML; tmp.remove();
  const w = window.open('', '_blank', 'width=900,height=1000');
  if(!w){ await niceAlert('La fenêtre n\'a pas pu s\'ouvrir : autorisez les fenêtres (pop-up) pour ce site.'); return; }
  const premier = blocs[0], titre = opts.titre || `${plRef(lvl, premier.c.code, premier.indices[0])}${blocs.length > 1 || premier.indices.length > 1 ? ' et suivantes' : ''}${mode === 'corr' ? ' (corrigé)' : ''}`;
  w.document.open();
  w.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(titre)}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">${plFontsLien(pr)}
    <style>${PL_CSS}${plCssReglages(pr)}${mode === 'livre' ? PL_CSS_LIVRE : ''}</style></head><body class="pl-imp">
    <button type="button" class="pl-bouton-imp" onclick="window.print()">Imprimer / Enregistrer en PDF</button>${corps}</body></html>`);
  w.document.close();
  const lancer = () => setTimeout(() => { w.focus(); w.print(); }, 300);
  w.onload = () => { if(w.document.fonts && w.document.fonts.ready) w.document.fonts.ready.then(lancer); else lancer(); };
}

/* ---------- Livre d'exercices d'un niveau ---------- */
async function plLivre(lvl){
  const niv = PL_NIVEAUX_TXT[lvl] || lvl, logo = await plLogo();
  const chaps = (CHAPITRES_BY_LEVEL[lvl] || []).filter(c => plDe(lvl, c.t).length);
  if(!chaps.length){ await niceAlert('Aucune planche n\'est encore écrite pour ce niveau.'); return; }
  const nb = chaps.reduce((s, c) => s + plDe(lvl, c.t).length, 0);
  const couv = `<section class="pl-page pl-couv">${logo ? `<img class="pl-couv-logo" src="${logo}" alt="L'Atelier des Maths">` : ''}
    <div class="pl-couv-niv">${niv}</div><h1 class="pl-couv-titre">Mon livre d'exercices de mathématiques</h1>
    <p class="pl-couv-sous">${chaps.length} chapitre${chaps.length > 1 ? 's' : ''} · ${nb} planche${nb > 1 ? 's' : ''} d'exercices · corrigés à la fin</p>
    <span class="pl-couv-oliv">${plOliv('muscle')}</span>
    <p class="pl-couv-pied">L'Atelier des Maths · L'Atelier Augmenté · édition du ${new Date().toLocaleDateString('fr-FR')}</p></section>`;
  const sommaire = `<section class="pl-page pl-sommaire"><h1>Sommaire</h1>
    ${chaps.map(c => `<div class="pl-som-chap"><b>${escapeHtml(c.code)} · ${escapeHtml(c.t)}</b>${c.n ? ` <span class="pl-som-per">chapitre ${c.n}</span>` : ''}
      ${plDe(lvl, c.t).map((p, i) => `<div class="pl-som-pl"><span class="pl-som-ref">${plRef(lvl, c.code, i)}</span>${escapeHtml(p.titre)}</div>`).join('')}</div>`).join('')}
    <div class="pl-som-chap"><b>Corrigés</b><div class="pl-som-pl">Toutes les planches, dans le même ordre</div></div></section>`;
  const sep = `<section class="pl-page pl-separation"><h1>Corrigés</h1><p>Les planches du livre, dans le même ordre, avec leurs réponses.</p></section>`;
  plImprimer(lvl, chaps.map(c => ({ c, indices: plDe(lvl, c.t).map((_, i) => i) })), 'livre', { avant: couv + sommaire, entreCorriges: sep, titre: `Livre d'exercices ${niv}` });
}

/* ---------- Projection : un exercice à la fois, avec la correction ---------- */
let plProj = null; // { lvl, c, i, k, corr }
function plProjeter(lvl, c, i){
  plProj = { lvl, c, i, k: 0, corr: false };
  let v = document.getElementById('plProj');
  if(!v){ v = document.createElement('div'); v.id = 'plProj'; document.body.appendChild(v); }
  v.style.display = 'flex'; document.body.classList.add('plp-ouvert');
  document.addEventListener('keydown', plProjClavier);
  const el = document.documentElement; if(el.requestFullscreen && !document.fullscreenElement){ try{ const pz = el.requestFullscreen(); if(pz && pz.catch) pz.catch(() => {}); }catch(e){} }
  plProjRendre();
}
function plProjFermer(){
  plProj = null; document.removeEventListener('keydown', plProjClavier);
  const v = document.getElementById('plProj'); if(v) v.style.display = 'none';
  document.body.classList.remove('plp-ouvert');
  if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
}
function plProjClavier(e){
  if(!plProj) return;
  if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); plProjAller(1); }
  else if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); plProjAller(-1); }
  else if(e.key === 'c' || e.key === 'C'){ plProjCorr(); }
  else if(e.key === 'Escape'){ plProjFermer(); }
}
function plProjAller(d){
  if(!plProj) return;
  const liste = plDe(plProj.lvl, plProj.c.t), p = liste[plProj.i];
  let k = plProj.k + d, i = plProj.i;
  if(k >= p.exos.length && i + 1 < liste.length){ i++; k = 0; } else if(k < 0 && i > 0){ i--; k = liste[i].exos.length - 1; }
  k = Math.max(0, Math.min(liste[i].exos.length - 1, k));
  Object.assign(plProj, { i, k, corr: false }); plProjRendre();
}
function plProjCorr(){ if(plProj){ plProj.corr = !plProj.corr; plProjRendre(); } }
function plProjRendre(){
  const v = document.getElementById('plProj'); if(!v || !plProj) return;
  const { lvl, c, i, k, corr } = plProj, liste = plDe(lvl, c.t), p = liste[i], x = p.exos[k];
  const premier = i === 0 && k === 0, dernier = i === liste.length - 1 && k === p.exos.length - 1;
  v.innerHTML = `<div class="plp-tete"><span class="pl-ref">${plRef(lvl, c.code, i)}</span><b>${escapeHtml(p.titre)}</b>
      <span class="plp-pos">Exercice ${k + 1} / ${p.exos.length}</span><span class="pl-et">${plEtoiles(x.etoiles || 1)}</span>
      <button class="plp-fermer" onclick="plProjFermer()" title="Fermer (Échap)"><span class="gicon">close</span></button></div>
    <div class="plp-corps${corr ? ' corr' : ''}"><div class="plp-consigne">${x.consigne}</div><div class="plp-rep">${plExoCorps(x, corr)}</div></div>
    <div class="plp-pied"><button class="btn secondary" onclick="plProjAller(-1)" ${premier ? 'disabled' : ''}><span class="gicon">arrow_back</span> Précédent</button>
      <button class="btn plp-corr${corr ? ' on' : ''}" onclick="plProjCorr()"><span class="gicon">${corr ? 'visibility_off' : 'fact_check'}</span> ${corr ? 'Cacher la correction' : 'Correction'}</button>
      <button class="btn secondary" onclick="plProjAller(1)" ${dernier ? 'disabled' : ''}>Suivant <span class="gicon">arrow_forward</span></button></div>`;
  if(typeof renderStaticMath === 'function') renderStaticMath(v);
}
const PL_CSS = `
  @page{ size:A4; margin:10mm 12mm; }
  *{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
  body.pl-imp{ background:#fff; color:#1C2B39; font-family:Inter,Arial,sans-serif; font-size:11.5pt; line-height:1.35; margin:0; padding:0; }
  .pl-bouton-imp{ display:block; margin:12px auto; padding:10px 18px; border:0; border-radius:24px; background:#0C5BA0; color:#fff; font:600 14px Inter,Arial,sans-serif; cursor:pointer; }
  @media print{ .pl-bouton-imp{ display:none; } }
  .pl-page{ max-width:184mm; margin:0 auto 10mm; page-break-after:always; break-after:page; position:relative; }
  .pl-page:last-child{ page-break-after:auto; break-after:auto; }
  .pl-tete{ display:flex; justify-content:space-between; align-items:center; gap:10px; border-bottom:2px solid #1F3A5C; padding-bottom:4px; font-size:9pt; color:#4E5665; }
  .pl-logo{ height:24px; width:auto; } .pl-tete .pl-site{ margin-right:auto; }
  .pl-titre{ display:flex; align-items:center; gap:10px; } .pl-titre h1{ flex:1; }
  .pl-oliv{ display:inline-block; width:36px; height:36px; flex:none; } .pl-oliv svg{ width:100%; height:100%; }
  .pl-oliv-tete{ display:inline-flex; align-items:center; gap:4px; }
  .pl-bulle{ background:#fff; color:#3E5A1E; border:2px solid #8DB84A; border-radius:12px 12px 12px 3px; padding:1px 9px; font:700 9.5pt 'Space Grotesk',Arial,sans-serif; white-space:nowrap; }
  .pl-cahier{ display:flex; align-items:center; gap:6px; margin-top:2px; }
  .pl-exos{ display:grid; grid-template-columns:1fr 1fr; gap:6px 8px; grid-auto-flow:row dense; }
  .pl-exos > .pl-exo{ grid-column:1 / -1; margin:0; } .pl-exos > .pl-exo.pl-demi{ grid-column:auto; }
  .pl-demi .pl-liste{ columns:1; }
  .pl-corrige{ font-size:.9em; } .pl-corrige .pl-exo{ padding:4px 10px 5px; } .pl-corrige .cm-redac{ margin:1px 0 3px; line-height:1.3; }
  .pl-ref{ font:700 10pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; border:1.5px solid #1F3A5C; border-radius:6px; padding:1px 8px; }
  .pl-corrige .pl-ref{ color:#1F7A4D; border-color:#1F7A4D; }
  .pl-page h1{ font:700 15pt 'Space Grotesk',Arial,sans-serif; margin:5px 0 3px; color:#1F3A5C; }
  .pl-nom{ display:flex; gap:28px; margin:2px 0 6px; font-weight:600; }
  .pl-pour-prof{ margin:0 0 8px; color:#1F7A4D; font-weight:700; }
  .pl-attendus{ font-size:9.5pt; background:#F3F5F8; border-radius:8px; padding:3px 10px; margin-bottom:6px; }
  .pl-exo{ border:1px solid #CBD2DC; border-radius:10px; padding:5px 11px 7px; margin:0 0 6px; break-inside:avoid; page-break-inside:avoid; }
  .pl-exo-tete{ display:flex; justify-content:space-between; align-items:center; margin-bottom:2px; }
  .pl-num{ font:700 11pt 'Space Grotesk',Arial,sans-serif; color:#E35D3A; }
  .pl-et{ color:#E9A21C; letter-spacing:2px; font-size:11pt; } .pl-et-off{ color:#D8DCE3; }
  .pl-consigne{ font-weight:600; margin-bottom:4px; }
  .pl-grille{ display:grid; gap:4px 18px; align-items:center; }
  .pl-item{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; min-height:26px; }
  .pl-liste{ margin:0; padding-left:20px; columns:2; } .pl-liste li{ margin:2px 0; break-inside:avoid; }
  .pl-frac{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; gap:2px; margin:0 3px; }
  .pl-case{ display:inline-block; width:22px; height:18px; border:1.5px solid #8A93A3; border-radius:4px; background:#fff; }
  .pl-case-seule{ vertical-align:middle; margin:0 4px; }
  .pl-barre{ display:block; width:28px; height:0; border-top:2px solid #1C2B39; }
  .pl-pts{ display:inline-block; border-bottom:1.5px dotted #8A93A3; height:1.1em; vertical-align:baseline; }
  .pl-lignes div{ height:24px; border-bottom:1px solid #CBD2DC; }
  .pl-rep{ color:#1F7A4D; font-weight:700; }
  .pl-entoure{ display:inline-block; border:2px solid #1F7A4D; border-radius:50%; padding:2px 6px; }
  .pl-barre-rep{ position:relative; display:inline-block; } .pl-barre-rep::after{ content:''; position:absolute; left:-4px; right:-4px; top:50%; border-top:2.5px solid #C0392B; transform:rotate(-20deg); }
  .pl-corps svg{ max-width:100%; height:auto; max-height:62px; }
  .pl-corps svg[viewBox$=' 94']{ max-height:none; width:auto !important; height:54px !important; margin:0 auto !important; }
  .pl-corps .cm-redac{ margin:2px 0 6px; }
  .pl-pied{ margin-top:4px; border-top:1px solid #CBD2DC; padding-top:4px; font-size:8.5pt; color:#6B7280; text-align:center; }
  .pl-f{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; margin:0 2px; line-height:1.1; font-size:1.05em; }
  .pl-f > span{ padding:0 3px; } .pl-f > span:first-child{ border-bottom:1.5px solid currentColor; }
  .pl-consigne .pl-f{ font-size:.78em; vertical-align:middle; line-height:1; }
  .cm-redac{ margin:2px 0 6px; line-height:1.45; } .cm-redac-titre{ text-decoration:underline; text-underline-offset:3px; font-weight:600; margin-bottom:2px; }
  .cm-redac-ligne{ margin:2px 0 2px 18px; } .cm-redac-phrase{ margin:3px 0 0; } .cm-encadre{ display:inline-block; border:2px solid #1F3A5C; border-radius:3px; padding:1px 8px; font-weight:700; }
  .cm-redac-col{ border-collapse:collapse; margin:2px 0 4px 18px; } .cm-redac-col td{ padding:2px 4px; }
  .katex{ font-size:1.12em; }
  .pl-consigne .katex{ font-size:1em; } .pl-consigne .katex .mfrac .frac-line{ border-bottom-width:1px; }
`;
// Livre : couverture, sommaire, séparation des corrigés, numéros de page.
const PL_CSS_LIVRE = `
  @page{ @bottom-center{ content:counter(page); font:9pt Arial,sans-serif; color:#6B7280; } }
  @page :first{ @bottom-center{ content:none; } }
  .pl-couv{ min-height:265mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:14px; }
  .pl-couv-logo{ height:70px; width:auto; } .pl-couv-niv{ font:800 64pt 'Space Grotesk',Arial,sans-serif; color:#2E7D32; line-height:1; }
  .pl-couv-titre{ font:700 26pt 'Space Grotesk',Arial,sans-serif !important; color:#1F3A5C; margin:0; } .pl-couv-sous{ color:#4E5665; font-size:13pt; margin:0; }
  .pl-couv-oliv{ width:150px; height:150px; display:block; } .pl-couv-oliv svg{ width:100%; height:100%; } .pl-couv-pied{ margin-top:30px; color:#6B7280; font-size:10pt; }
  .pl-sommaire h1, .pl-separation h1{ font:700 22pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; }
  .pl-som-chap{ margin:0 0 10px; break-inside:avoid; } .pl-som-chap > b{ font-family:'Space Grotesk',Arial,sans-serif; color:#1F3A5C; } .pl-som-per{ color:#6B7280; font-size:9pt; }
  .pl-som-pl{ margin:2px 0 2px 18px; font-size:10.5pt; } .pl-som-ref{ display:inline-block; min-width:90px; font:700 9pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; }
  .pl-separation{ min-height:240mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; }
`;
(function plStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .pl-bouton{ margin:6px 0 0 8px; }
    .pl-modal{ max-width:720px; width:94vw; max-height:88vh; overflow:auto; }
    .pl-cartes{ display:flex; flex-direction:column; gap:10px; }
    .pl-carte{ border:1.5px solid rgba(28,43,57,.12); border-radius:12px; padding:10px 12px; background:#fff; }
    .pl-carte-tete{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; font-family:'Space Grotesk',sans-serif; }
    .pl-carte .pl-ref{ font:700 .8rem 'Space Grotesk',sans-serif; color:#1F3A5C; border:1.5px solid #1F3A5C; border-radius:6px; padding:0 7px; }
    .pl-carte-att{ margin:6px 0; font-size:.85rem; color:var(--ink-soft); } .pl-carte-att .gicon{ font-size:15px; vertical-align:middle; color:#1F7A4D; }
    .pl-carte-pied{ display:flex; gap:8px; align-items:center; flex-wrap:wrap; } .pl-carte-pied .hint{ margin-right:auto !important; }
    .pl-reglages{ margin-top:12px; border:1px solid rgba(28,43,57,.12); border-radius:12px; padding:8px 12px; background:#FAFBFC; }
    .pl-reglages summary{ cursor:pointer; font-weight:700; color:#1F3A5C; } .pl-reglages summary .gicon{ vertical-align:middle; font-size:18px; }
    .pl-reg-grille{ display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:8px 14px; margin-top:8px; }
    .pl-reg-grille label{ display:flex; flex-direction:column; gap:3px; font-size:.85rem; font-weight:600; } .pl-reg-grille .pl-reg-case{ flex-direction:row; align-items:center; gap:6px; margin-top:18px; }
    #plProj{ position:fixed; inset:0; z-index:9500; background:#FBF8F2; display:none; flex-direction:column; }
    .plp-tete{ display:flex; align-items:center; gap:14px; padding:10px 20px; background:#1F3A5C; color:#fff; font-family:'Space Grotesk',sans-serif; flex-wrap:wrap; }
    .plp-tete .pl-ref{ color:#fff; border:1.5px solid #fff; border-radius:6px; padding:0 8px; font-weight:700; } .plp-tete b{ font-size:1.15rem; }
    .plp-pos{ margin-left:auto; font-weight:700; } .plp-tete .pl-et{ color:#F4C04E; letter-spacing:2px; } .plp-tete .pl-et-off{ color:rgba(255,255,255,.3); }
    .plp-fermer{ border:0; background:rgba(255,255,255,.15); color:#fff; border-radius:8px; cursor:pointer; display:flex; padding:4px; }
    .plp-corps{ flex:1; overflow:auto; padding:24px max(24px, calc((100vw - 1100px) / 2)); }
    .plp-corps > div{ zoom:1.7; font-size:13px; line-height:1.45; color:#1C2B39; }
    .plp-consigne{ font-weight:700; margin-bottom:10px; }
    .plp-corps .pl-grille{ display:grid; gap:8px 26px; align-items:center; } .plp-corps .pl-item{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
    .plp-corps .pl-liste{ padding-left:20px; margin:0; } .plp-corps .pl-liste li{ margin:6px 0; }
    .plp-corps .pl-frac{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; gap:2px; margin:0 3px; }
    .plp-corps .pl-case{ display:inline-block; width:22px; height:18px; border:1.5px solid #8A93A3; border-radius:4px; background:#fff; } .plp-corps .pl-case-seule{ vertical-align:middle; margin:0 4px; }
    .plp-corps .pl-barre{ display:block; width:28px; border-top:2px solid #1C2B39; }
    .plp-corps .pl-pts{ display:inline-block; border-bottom:1.5px dotted #8A93A3; height:1.1em; }
    .plp-corps .pl-lignes div{ height:24px; border-bottom:1px solid #CBD2DC; }
    .plp-corps .pl-rep{ color:#1F7A4D; font-weight:800; } .plp-corps .pl-entoure{ display:inline-block; border:2px solid #1F7A4D; border-radius:50%; padding:2px 6px; }
    .plp-corps svg{ max-width:100%; height:auto; } .plp-corps .cm-redac{ margin:2px 0 8px; }
    .plp-corps.corr{ background:rgba(31,122,77,.05); }
    .plp-corps .pl-barre-rep{ position:relative; display:inline-block; } .plp-corps .pl-barre-rep::after{ content:''; position:absolute; left:-4px; right:-4px; top:50%; border-top:2.5px solid #C0392B; transform:rotate(-20deg); }
    .plp-corps .pl-cahier{ display:flex; align-items:center; gap:6px; margin-top:12px; }
    .plp-corps .pl-oliv{ width:48px; height:48px; display:inline-block; } .plp-corps .pl-oliv svg{ width:100%; height:100%; }
    .plp-corps .pl-bulle{ background:#fff; color:#3E5A1E; border:2px solid #8DB84A; border-radius:12px 12px 12px 3px; padding:2px 10px; font:800 13px 'Space Grotesk',sans-serif; }
    body.plp-ouvert #aideBtn, body.plp-ouvert #aideBulle{ display:none !important; }
    .plp-pied{ display:flex; justify-content:center; gap:14px; padding:12px; border-top:1px solid rgba(28,43,57,.12); background:#fff; }
    .plp-pied .btn{ font-size:1.05rem; padding:10px 18px; } .plp-corr{ background:#1F7A4D !important; border-color:#1F7A4D !important; } .plp-corr.on{ background:#5B6472 !important; border-color:#5B6472 !important; }
  `;
  document.head.appendChild(st);
})();

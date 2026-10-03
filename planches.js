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

/* ---------- Figures pour les planches (réutilisables dans tous les chapitres) ---------- */
const PL_TRAIT = '#1F3A5C', PL_COUL = { carre: '#9CCB6B', disque: '#5CB8D6', bande: '#E8896A', u: '#F08A3C' };
// Carré partagé en parts égales, k parts coloriées. mode : 'bandes' (horizontales), 'colonnes', 'grille'
// (opts.l lignes × n / opts.l colonnes), 'triangles' (n = 2, 4 ou 8 : diagonales, puis médianes).
function plCarreParts(mode, n, opts){
  opts = opts || {}; const R = [];
  if(mode === 'bandes') for(let i = 0; i < n; i++) R.push([[0, i / n], [1, i / n], [1, (i + 1) / n], [0, (i + 1) / n]]);
  else if(mode === 'colonnes') for(let i = 0; i < n; i++) R.push([[i / n, 0], [(i + 1) / n, 0], [(i + 1) / n, 1], [i / n, 1]]);
  else if(mode === 'grille'){ const l = opts.l || Math.round(Math.sqrt(n)), c = n / l;
    for(let y = 0; y < l; y++) for(let x = 0; x < c; x++) R.push([[x / c, y / l], [(x + 1) / c, y / l], [(x + 1) / c, (y + 1) / l], [x / c, (y + 1) / l]]); }
  else if(mode === 'triangles'){ const C = [.5, .5];
    if(n === 2) R.push([[0, 0], [1, 0], [1, 1]], [[0, 0], [1, 1], [0, 1]]);
    else if(n === 4) R.push([[0, 0], [1, 0], C], [[1, 0], [1, 1], C], [[1, 1], [0, 1], C], [[0, 1], [0, 0], C]);
    else R.push([[0, 0], [.5, 0], C], [[.5, 0], [1, 0], C], [[1, 0], [1, .5], C], [[1, .5], [1, 1], C], [[1, 1], [.5, 1], C], [[.5, 1], [0, 1], C], [[0, 1], [0, .5], C], [[0, .5], [0, 0], C]); }
  return R;
}
function plCarre(mode, n, k, opts){
  opts = opts || {}; const t = opts.taille || 62, m = 2, c = opts.coul || PL_COUL.carre;
  const ordre = opts.ordre || plCarreParts(mode, n, opts).map((_, i) => i);
  const parts = plCarreParts(mode, n, opts);
  return `<svg viewBox="0 0 ${t + 2 * m} ${t + 2 * m}" style="width:${t + 2 * m}px;height:${t + 2 * m}px;display:inline-block;vertical-align:middle;">${parts.map((poly, i) =>
    `<polygon points="${poly.map(([x, y]) => `${m + x * t},${m + y * t}`).join(' ')}" fill="${ordre.indexOf(i) < k ? c : '#fff'}" stroke="${PL_TRAIT}" stroke-width="1.3" stroke-linejoin="round"/>`).join('')}</svg>`;
}
// Plusieurs unités (carrés ou disques) de n parts, k parts coloriées en tout : fractions plus grandes que 1.
// figure : { carre: mode } ou 'disque' ; unites : nombre de figures (par défaut, juste ce qu'il faut).
function plUnites(figure, n, k, unites, opts){
  opts = opts || {}; const nb = unites || Math.max(1, Math.ceil(k / n)); let h = '';
  for(let u = 0; u < nb; u++){ const ku = Math.max(0, Math.min(n, k - u * n));
    h += figure === 'disque' ? cm1Disque(n, ku, { taille: opts.taille || 60, coul: opts.coul }) : plCarre(figure.carre, n, ku, Object.assign({ taille: opts.taille || 56 }, figure)); }
  return `<span class="pl-unites">${h}</span>`;
}
// Disque partagé en parts INÉGALES (angles en degrés) : la part k est coloriée.
function plDisqueInegal(angles, k, opts){
  opts = opts || {}; const r = 28, cx = 31, cy = 31; let a0 = -90, s = `<svg viewBox="0 0 62 62" style="width:${opts.taille || 62}px;display:inline-block;vertical-align:middle;">`;
  angles.forEach((a, i) => { const a1 = a0 + a, p = d => [cx + r * Math.cos(d * Math.PI / 180), cy + r * Math.sin(d * Math.PI / 180)].map(v => v.toFixed(2)).join(' ');
    s += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 ${a > 180 ? 1 : 0} 1 ${p(a1)} Z" fill="${i === k ? PL_COUL.disque : '#fff'}" stroke="${PL_TRAIT}" stroke-width="1.3"/>`; a0 = a1; });
  return s + '</svg>';
}
// Quadrillage avec une bande-unité u (u carreaux) en haut, puis une ligne par bande :
// lignes = [{ lab: 'A' | [a, b] (fraction de u), len: carreaux, cache: vrai si l'élève doit la tracer }] ;
// corr : les bandes cachées sont tracées (en vert).
function plBandesU(u, lignes, corr, opts){
  opts = opts || {}; const c = 13, lab = 64, maxLen = Math.max(u, ...lignes.map(l => l.len || 0)), cols = maxLen + 2, rows = 2 + lignes.length * 2;
  const W = lab + cols * c, H = rows * c + 4; let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:block;">`;
  for(let i = 0; i <= cols; i++) s += `<line x1="${lab + i * c}" y1="2" x2="${lab + i * c}" y2="${2 + rows * c}" stroke="#BFD9EA" stroke-width=".8"/>`;
  for(let j = 0; j <= rows; j++) s += `<line x1="${lab}" y1="${2 + j * c}" x2="${W}" y2="${2 + j * c}" stroke="#BFD9EA" stroke-width=".8"/>`;
  const bande = (y, len, coul, txt) => `<rect x="${lab + c}" y="${2 + y * c + 2}" width="${len * c}" height="${c - 4}" fill="${coul}" stroke="${PL_TRAIT}" stroke-width="1.2"/>${txt ? `<text x="${lab + c + len * c / 2}" y="${2 + y * c + c - 3.5}" font-size="9" font-style="italic" text-anchor="middle" fill="#fff" font-family="Arial">${txt}</text>` : ''}`;
  s += bande(0.5, u, PL_COUL.u, 'u') + `<text x="${lab - 8}" y="${2 + 1 * c + 4}" font-size="12" font-style="italic" text-anchor="end" fill="${PL_TRAIT}" font-family="Arial">u</text>`;
  lignes.forEach((l, i) => { const y = 2 + i * 2 + .5, ty = 2 + (y + .5) * c;
    if(Array.isArray(l.lab)) s += `<text x="${lab - 22}" y="${ty - 3}" font-size="10.5" text-anchor="middle" fill="${PL_TRAIT}" font-family="Arial">${l.lab[0]}</text><line x1="${lab - 29}" y1="${ty}" x2="${lab - 15}" y2="${ty}" stroke="${PL_TRAIT}" stroke-width="1"/><text x="${lab - 22}" y="${ty + 10}" font-size="10.5" text-anchor="middle" fill="${PL_TRAIT}" font-family="Arial">${l.lab[1]}</text><text x="${lab - 8}" y="${ty + 4}" font-size="11" font-style="italic" text-anchor="end" fill="${PL_TRAIT}" font-family="Arial">u</text>`;
    else s += `<text x="${lab - 8}" y="${ty + 4}" font-size="12" font-weight="700" text-anchor="end" fill="${PL_TRAIT}" font-family="Arial">${l.lab}</text>`;
    if(l.len && (!l.cache || corr)) s += bande(y, l.len, l.cache ? '#7FC29B' : PL_COUL.bande); });
  return s + '</svg>';
}

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
  plTdMaj(lvl, c);
  let b = document.getElementById('plBouton');
  const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null;
  const ok = (role === 'prof' || role === 'admin' || role === 'parent') && c && (plDe(lvl, c.t).length > 0 || (typeof plProgDe === 'function' && plProgDe(lvl, c.t).length > 0));
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
/* ---------- Mon TD : les exercices des planches en vignettes ----------
   Demandé : « Pour les exercices projetés je les imaginais plutôt dans la partie Exercices et
   Rédaction, ou une nouvelle rubrique : mon TD. Ces exercices sont affichés à l'écran sous forme de
   vignettes, permettent d'être projetés en grand et d'être également corrigés. On doit pouvoir s'en
   servir dans l'outil de partage d'écran [session COURS], et ajouter au cahier de correction. »
   Onglet du chapitre (professeur, administrateur, parent) : une vignette par exercice, avec
   Projeter (en grand, un par un), Correction (sur la vignette) et + Cahier (énoncé et correction).
   Dans une session COURS : « Ajouter une partie de cours » propose aussi les exercices de Mon TD ;
   le professeur montre ensuite la correction aux élèves depuis la télécommande. */
function plTdMaj(lvl, c){
  const tab = document.getElementById('tabTd'), root = document.getElementById('tdRoot'); if(!tab || !root) return;
  const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null;
  const ok = (role === 'prof' || role === 'admin' || role === 'parent') && c && (plDe(lvl, c.t).length > 0 || (typeof plProgDe === 'function' && plProgDe(lvl, c.t).length > 0));
  tab.style.display = ok ? '' : 'none';
  if(!ok){ root.innerHTML = ''; if(tab.classList.contains('active')){ const b = document.querySelector('.tab-btn[data-tab="cours"]'); if(b) b.click(); } return; }
  plTdRendre(lvl, c);
}
function plTdRendre(lvl, c){
  const root = document.getElementById('tdRoot'); if(!root) return;
  const liste = plDe(lvl, c.t), esc = s => escapeHtml(String(s ?? ''));
  root.innerHTML = `<div class="td-intro"><span class="pl-oliv">${plOliv('muscle')}</span><div><b>Mon TD : ${liste.reduce((n, p) => n + p.exos.length, 0)} exercices</b>
      <p class="hint" style="margin:2px 0 0;">Les exercices des planches de ce chapitre. Projetez-les un par un, affichez la correction, ajoutez-les au cahier de la classe ou à une session COURS (« Ajouter une partie de cours »).</p></div>
      <button type="button" class="btn secondary" onclick="plOuvrir('${lvl}', CHAPITRES_BY_LEVEL['${lvl}'].find(x => x.code === '${c.code}'))"><span class="gicon">print</span> Planches à imprimer</button></div>
    ${liste.map((p, i) => `<section class="td-planche"><div class="td-p-tete"><span class="pl-ref">${plRef(lvl, c.code, i)}</span><b>${esc(p.titre)}</b>
        <span class="hint" style="margin:0;">${(p.attendus || []).map(esc).join(' · ')}</span>
        <button type="button" class="btn secondary td-mini" data-tdproj="${i}|0"><span class="gicon">present_to_all</span> Projeter la planche</button></div>
      <div class="td-grille">${p.exos.map((x, k) => `<div class="td-vig${x.col === 1 ? '' : ' td-plein'}" id="tdv-${i}-${k}">
        <div class="td-v-tete"><span class="pl-num">Exercice ${k + 1}</span>${plMarque(lvl, x)}${typeof plNumPossible === 'function' && plNumPossible(x) ? '<span class="td-num" title="Se fait aussi à l\'écran (au tableau ou en session) : colorier, compléter avec le clavier, vérifier"><span class="gicon">touch_app</span> à l\'écran</span>' : ''}<span class="pl-et">${plEtoiles(x.etoiles || 1)}</span></div>
        <div class="td-v-corps"><div class="pl-consigne">${x.consigne}</div><div class="pl-corps">${plExoCorps(x, false)}</div></div>
        <div class="td-v-pied"><button type="button" class="btn secondary td-mini" data-tdproj="${i}|${k}" title="En grand, un par un"><span class="gicon">present_to_all</span> Projeter</button>
          <button type="button" class="btn secondary td-mini" data-tdcorr="${i}|${k}"><span class="gicon">fact_check</span> Correction</button>
          <button type="button" class="btn secondary td-mini" data-tdcahier="${i}|${k}" title="Énoncé et correction dans le cahier de la classe"><span class="gicon">add</span> Cahier</button>
          <button type="button" class="btn secondary td-mini" data-tdsess="${i}|${k}" title="Dans la session COURS en cours, ou en ouverture de la prochaine"><span class="gicon">cast_for_education</span> Session</button></div></div>`).join('')}</div></section>`).join('')}${typeof plTdProgHtml === 'function' ? plTdProgHtml(lvl, c) : ''}`;
  if(typeof renderStaticMath === 'function') renderStaticMath(root);
  root.onclick = e => {
    const t = e.target, pj = t.closest('[data-tdproj]'), co = t.closest('[data-tdcorr]'), ca = t.closest('[data-tdcahier]'), pg = t.closest('[data-tdprog]');
    const ps = t.closest('[data-tdprogsess]');
    if(ps){ plProgAjouterSession(ps.dataset.tdprogsess, ps); }
    else if(pg){ plProgProjeter(lvl, c, +pg.dataset.tdprog); }
    else if(pj){ const [i, k] = pj.dataset.tdproj.split('|').map(Number); plProjeter(lvl, c, i, k); }
    else if(co){ const [i, k] = co.dataset.tdcorr.split('|').map(Number), x = liste[i].exos[k], v = document.getElementById(`tdv-${i}-${k}`), on = !v.classList.contains('corr');
      v.classList.toggle('corr', on); v.querySelector('.pl-corps').innerHTML = plExoCorps(x, on); co.innerHTML = on ? '<span class="gicon">visibility_off</span> Énoncé' : '<span class="gicon">fact_check</span> Correction';
      if(typeof renderStaticMath === 'function') renderStaticMath(v); }
    else if(ca){ const [i, k] = ca.dataset.tdcahier.split('|').map(Number); plAjouterCahier(lvl, c, i, k, ca); }
    else if(t.closest('[data-tdsess]')){ const b = t.closest('[data-tdsess]'), [i, k] = b.dataset.tdsess.split('|').map(Number); plAjouterSession(lvl, c, i, k, b); }
  };
}
// Énoncé (et correction) d'un exercice en HTML autonome, formules rendues : pour le cahier et les sessions.
function plExoHtml(lvl, c, i, k, mode){
  const x = plDe(lvl, c.t)[i].exos[k], d = document.createElement('div');
  d.style.cssText = 'position:absolute;left:-9999px;top:0;width:700px;';
  d.innerHTML = mode === 'corr' ? `<div class="pl-consigne"><b>${x.consigne}</b></div><div class="pl-corps">${plExoCorps(x, true)}</div>`
    : `<div class="pl-consigne"><b>${x.consigne}</b></div><div class="pl-corps">${plExoCorps(x, false)}</div>`;
  document.body.appendChild(d); if(typeof renderStaticMath === 'function') renderStaticMath(d);
  const h = `<div class="pl-ex-cahier">${d.innerHTML}</div>`; d.remove(); return h;
}
// Élément de session COURS : l'exercice à faire à l'écran (planches-num.js) s'il s'y prête, sinon
// l'énoncé, dont le professeur montre ensuite la correction.
function plSessionItem(lvl, c, i, k){
  const x = plDe(lvl, c.t)[i].exos[k], it = { titre: `TD ${plRef(lvl, c.code, i)} · exercice ${k + 1}`, chapitre: `${c.code} · ${c.t}`, html: plExoHtml(lvl, c, i, k, 'eleve'), corr: plExoHtml(lvl, c, i, k, 'corr') };
  if(typeof plNumPossible === 'function' && plNumPossible(x)){ it.exo = { type: 'td', lvl, code: c.code, t: c.t, i, k }; it.prog = null; }
  return it;
}
// « Ajouter à la session » : dans la session ouverte, sinon en attente pour l'ouverture de la prochaine.
function plAttente(){ try{ return JSON.parse(localStorage.getItem('cdAttente') || '[]'); }catch(e){ return []; } }
function plAttenteSauver(l){ try{ localStorage.setItem('cdAttente', JSON.stringify(l)); }catch(e){} }
async function plAjouterSession(lvl, c, i, k, btn){
  const it = plSessionItem(lvl, c, i, k);
  if(typeof cdP !== 'undefined' && cdP){ await cxProfAjouterItems([it], 'Exercice'); return; }
  const l = plAttente(); if(!l.some(x => x.titre === it.titre)){ it.ouverture = true; l.push(it); plAttenteSauver(l); }
  if(btn){ const old = btn.innerHTML; btn.innerHTML = `<span class="gicon">check</span> Prochaine session (${l.length})`; setTimeout(() => btn.innerHTML = old, 2200); }
  if(typeof cdToast === 'function') cdToast(`<span class="gicon">cast_for_education</span> Exercice mis de côté : il ouvrira votre prochaine session COURS (${l.length} en attente).`);
}
async function plAjouterCahier(lvl, c, i, k, btn){
  if(typeof cahier === 'undefined'){ await niceAlert('Cahier indisponible.'); return; }
  if(typeof currentClassId !== 'undefined' && !currentClassId){ await niceAlert('Choisissez d\'abord la classe en haut de la page : l\'exercice s\'ajoute au cahier de cette classe.'); return; }
  const ref = plRef(lvl, c.code, i);
  const entry = { niveau: lvl, chapitre: `${c.code} · ${c.t}`, exo: 'TD', titre: `${ref} · exercice ${k + 1}`, date: todayISO(), raw: '',
    html: plExoHtml(lvl, c, i, k, 'eleve').replace('class="pl-ex-cahier"', 'class="pl-ex-cahier pl-ex-enonce"') + `<div class="pl-ex-corr-titre">Correction</div>` + plExoHtml(lvl, c, i, k, 'corr').replace(/^<div class="pl-ex-cahier"><div class="pl-consigne">[\s\S]*?<\/div>/, '<div class="pl-ex-cahier">') };
  cahier.push(entry);
  if(typeof sortCahierInPlace === 'function') sortCahierInPlace();
  if(typeof saveCahier === 'function') saveCahier();
  if(document.getElementById('cahierList') && typeof renderCahier === 'function') renderCahier();
  if(btn){ const old = btn.innerHTML; btn.innerHTML = '<span class="gicon">check</span> Ajouté'; setTimeout(() => btn.innerHTML = old, 1600); }
  if(typeof isSyncEnabled === 'function' && isSyncEnabled()){
    const res = await syncAddEntry(entry);
    if(res.ok){ entry.id = res.id; saveCahier(); }
    else if(!res.offline) await niceAlert('Ajouté sur cet appareil, mais pas dans le cahier partagé : ' + (res.error || 'erreur inconnue') + '.');
  }
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
      ${plLivreAutorise() ? `<span class="pl-livre-grp"><span class="pl-livre-t"><span class="gicon">menu_book</span> Livre d'exercices ${esc(niv)} (${nbLivre} chapitre${nbLivre > 1 ? 's' : ''})</span>
        <button type="button" class="btn secondary td-mini" data-livre="eleve" title="Couverture, sommaire et toutes les planches du niveau, sans les corrigés : le livre de l'élève">Sans corrigés</button>
        <button type="button" class="btn secondary td-mini" data-livre="corr" title="Le même livre, avec tous les corrigés à la fin">Avec corrigés</button></span>` : ''}
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
    const lv = t.closest('[data-livre]'); if(lv) plLivre(lvl, lv.dataset.livre === 'corr');
  });
}

/* ---------- Une page ---------- */
const plEtoiles = k => '★'.repeat(k) + '<span class="pl-et-off">' + '★'.repeat(3 - k) + '</span>';
// Exercice « Pour aller plus loin » (x.plus) : la randonneuse, en route vers l'année suivante ; exercice ★★★
// (un défi) : la petite super-héroïne. Petite vignette dans la ligne du titre (ne change pas la hauteur).
const PL_SUIVANTE = { ce2: 'En route vers le CM1 !', cm1: 'En route vers le CM2 !', cm2: 'En route vers la 6e !' };
function plMarque(lvl, x){
  if(x.plus) return `<span class="pl-marque"><span class="pl-oliv">${plOliv('cm2')}</span><span class="pl-bulle">${PL_SUIVANTE[lvl] || 'Pour aller plus loin !'}</span></span>`;
  if((x.etoiles || 1) >= 3) return `<span class="pl-marque"><span class="pl-oliv">${plOliv('defi')}</span><span class="pl-bulle">Défi !</span></span>`;
  return '';
}
function plCahierHtml(){ return `<div class="pl-cahier"><span class="pl-oliv">${plOliv('savoir')}</span><span class="pl-bulle">Dans ton cahier !</span></div>`; }
function plExoCorps(x, corr){ return corr ? (x.corr || x.eleve || '') : ((x.eleve || '') + (x.cahier ? plCahierHtml() : '')); }
function plPageHtml(lvl, c, p, i, n, mode, pr, logo){
  const corr = mode === 'corr', ref = plRef(lvl, c.code, i), niv = PL_NIVEAUX_TXT[lvl] || lvl;
  const ident = corr ? '<p class="pl-pour-prof">Corrigé réservé au professeur.</p>'
    : (pr.identite !== 'aucun' || pr.date) ? `<div class="pl-nom">${pr.identite === 'nom' ? '<span>NOM : <span class="pl-pts" style="min-width:10em;"></span></span><span>Prénom : <span class="pl-pts" style="min-width:9em;"></span></span>'
        : pr.identite === 'prenom' ? '<span>Prénom : <span class="pl-pts" style="min-width:13em;"></span></span>' : ''}${pr.date ? '<span>Date : <span class="pl-pts" style="min-width:7em;"></span></span>' : ''}</div>` : '';
  return `<section class="pl-page pl-planche${corr ? ' pl-corrige' : ''}" data-ref="${ref}${corr ? '-c' : ''}">
    <header class="pl-tete">${logo ? `<img class="pl-logo" src="${logo}" alt="L'Atelier des Maths">` : '<span class="pl-site">L\'Atelier des Maths</span>'}<span class="pl-site">${niv} · ${escapeHtml(c.t)}</span><span class="pl-ref">${ref}${corr ? ' · CORRIGÉ' : ''}</span></header>
    <div class="pl-titre"><h1>Planche ${i + 1} : ${escapeHtml(p.titre)}</h1>${corr ? '' : `<span class="pl-oliv-tete"><span class="pl-oliv">${plOliv('muscle')}</span><span class="pl-bulle">Muscle ton jeu !</span></span>`}</div>
    ${ident}
    <div class="pl-attendus"><b>Je travaille :</b> ${(p.attendus || []).map(a => escapeHtml(a)).join(' ; ')}</div>
    <div class="pl-exos">${p.exos.map((x, k) => `<div class="pl-exo${x.col === 1 ? ' pl-demi' : ''}"><div class="pl-exo-tete"><span class="pl-num">Exercice ${k + 1}</span>${plMarque(lvl, x)}<span class="pl-et">${plEtoiles(x.etoiles || 1)}</span></div>
      <div class="pl-consigne">${x.consigne}</div><div class="pl-corps">${plExoCorps(x, corr)}</div></div>`).join('')}</div>
    ${corr ? '' : plPointHtml(p)}
    <footer class="pl-pied">${ref} · Planche ${i + 1} sur ${n} · ${niv} · ${escapeHtml(c.t)} · ${p.duree ? 'environ ' + escapeHtml(p.duree) + ' · ' : ''}L'Atelier des Maths</footer>
  </section>`;
}
// Fractions dessinées en HTML (aucune dépendance au réseau au moment d'imprimer) ; le reste des
// formules, s'il y en a, passe par KaTeX.
function plFigerMaths(el){
  // Les nombres « 5 400 » ne se coupent pas en fin de ligne (espace insécable entre les classes de chiffres).
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement && n.parentElement.closest('svg') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  for(let n = tw.nextNode(); n; n = tw.nextNode()) if(/\d \d{3}/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0');
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
  tmp.innerHTML = (opts.avant || '') + (mode === 'livre' ? pages('eleve') + (opts.sansCorriges ? '' : (opts.entreCorriges || '') + pages('corr')) : pages(mode));
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
  const lancer = () => setTimeout(() => { try{ plRemplirPages(w.document); }catch(e){ console.warn(e); } w.focus(); w.print(); }, 300);
  let parti = false; const pret = () => { if(parti) return; parti = true; const f = w.document.fonts && w.document.fonts.ready; Promise.race([f || Promise.resolve(), new Promise(ok => setTimeout(ok, 2000))]).then(lancer); };
  w.onload = pret; if(w.document.readyState === 'complete') pret(); setTimeout(pret, 2500);
}

/* ---------- Pages pleines (demandé : « Il faut impérativement que toutes les feuilles soient pleines,
   au prix de l'impression ») ----------
   Juste avant d'imprimer, chaque planche est mesurée dans la fenêtre d'impression : un exercice
   demi-largeur resté seul sur sa ligne prend toute la largeur ; s'il reste de la place sur une planche
   de l'élève, le bloc « Je fais le point » (auto-évaluation sur les attendus de la planche) s'affiche ;
   enfin les exercices s'étirent jusqu'en bas de la feuille A4 (plus de place pour écrire, aucun blanc).
   Une planche qui dépasse déjà une page (gros caractères, interligne aéré) n'est pas touchée. */
function plVisage(k){
  const c = ['#2E9E5B', '#E9A21C', '#E35D3A'][k], bouche = ['M7 13 Q11 17 15 13', 'M7 14 L15 14', 'M7 15.5 Q11 11.5 15 15.5'][k];
  return `<svg viewBox="0 0 22 22" width="20" height="20"><circle cx="11" cy="11" r="9.5" fill="#fff" stroke="${c}" stroke-width="1.8"/><circle cx="8" cy="9" r="1.2" fill="${c}"/><circle cx="14" cy="9" r="1.2" fill="${c}"/><path d="${bouche}" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}
function plPointHtml(p){
  const att = (p.attendus || []).length ? p.attendus : [p.titre];
  return `<div class="pl-point" hidden><div class="pl-point-tete"><span class="pl-oliv">${plOliv('quiz')}</span><b>Je fais le point</b><span class="pl-point-aide">Je colorie le visage qui me ressemble.</span>
      <span class="pl-point-leg">${[0, 1, 2].map(k => `<span>${plVisage(k)} ${['Je sais faire', 'Presque', 'J\'ai besoin d\'aide'][k]}</span>`).join('')}</span></div>
    ${att.map(a => `<div class="pl-point-l"><span>${escapeHtml(a)}</span><span class="pl-point-v">${[0, 1, 2].map(plVisage).join('')}</span></div>`).join('')}</div>`;
}
function plRemplirPages(doc){
  const sonde = doc.createElement('div'); sonde.style.cssText = 'position:absolute;visibility:hidden;height:277mm;width:1px;';
  doc.body.appendChild(sonde); const L = sonde.getBoundingClientRect().height - 4; sonde.remove();
  const H = el => el.getBoundingClientRect().height;
  doc.querySelectorAll('.pl-planche').forEach(pg => {
    if(H(pg) > L) return;
    const ex = [...pg.querySelectorAll('.pl-exos > .pl-exo')];
    ex.forEach(e => { if(!e.classList.contains('pl-demi')) return; const t = e.getBoundingClientRect().top;
      if(!ex.some(f => f !== e && f.classList.contains('pl-demi') && Math.abs(f.getBoundingClientRect().top - t) < 3)) e.classList.add('pl-seul'); });
    const pt = pg.querySelector('.pl-point');
    if(pt && L - H(pg) > 100){ pt.hidden = false; if(H(pg) > L) pt.hidden = true; }
    if(H(pg) <= L){ pg.classList.add('pl-plein'); pg.style.height = L + 'px'; }
  });
  // Pages pleines du livre (couverture, séparation) et numéros de page du sommaire.
  doc.querySelectorAll('.pl-couv, .pl-sommaire').forEach(pg => { if(H(pg) < L) pg.style.minHeight = L + 'px'; });
  let n = 1; const debut = {};
  doc.querySelectorAll('.pl-page').forEach(pg => { if(pg.dataset.ref) debut[pg.dataset.ref] = n; if(pg.classList.contains('pl-corrige') && !debut.corriges) debut.corriges = n; n += Math.max(1, Math.ceil((H(pg) - 2) / L)); });
  doc.querySelectorAll('[data-page]').forEach(el => { el.textContent = debut[el.dataset.page] || ''; });
}

/* ---------- Livre d'exercices d'un niveau (réservé aux professeurs) ----------
   Demandé : « L'impression d'un livre d'exercices doit être réservée aux profs seulement. Permettre
   d'imprimer le livre sans les corrections. Bien faire une belle mise en forme de la page de garde et
   du sommaire (colorée) sans oublier Oliv'IA. » */
function plLivreAutorise(){ return typeof currentUserRole !== 'undefined' && (currentUserRole === 'prof' || currentUserRole === 'admin'); }
const PL_DOMAINES = { N: ['Nombres et calcul', '#2E6FD8', '#E8F0FD'], G: ['Espace et géométrie', '#2E9E5B', '#E6F5EC'], M: ['Grandeurs et mesures', '#E8862E', '#FDF0E3'], D: ['Données, probabilités, pensée informatique', '#8E44AD', '#F3EAF8'], P: ['Problèmes', '#C0392B', '#FBE9E7'] };
const plDom = c => PL_DOMAINES[c.cat] || PL_DOMAINES[String(c.code || '')[0]] || PL_DOMAINES.N;
function plCouvDeco(){
  // Petits symboles de maths, en couleur, autour de la page de garde.
  const f = [['+', 8, 12, '#2E6FD8', 40, -10], ['×', 86, 9, '#E35D3A', 44, 12], ['÷', 92, 44, '#2E9E5B', 36, 0], ['=', 5, 52, '#E8862E', 40, 0], ['π', 88, 78, '#8E44AD', 34, -8], ['%', 9, 84, '#2EA8C9', 32, 10]];
  const formes = `<svg class="pl-couv-formes" viewBox="0 0 100 100" preserveAspectRatio="none">
    <polygon points="14,30 22,30 18,23" fill="#F6C343" opacity=".75"/><circle cx="80" cy="28" r="3.4" fill="#2EA8C9" opacity=".55"/>
    <rect x="76" y="62" width="7" height="5" fill="#9CCB6B" opacity=".7" transform="rotate(12 79 64)"/><circle cx="20" cy="70" r="2.6" fill="#E35D3A" opacity=".5"/></svg>`;
  return formes + f.map(([t, x, y, c, fs, r]) => `<span class="pl-couv-sym" style="left:${x}%;top:${y}%;color:${c};font-size:${fs}pt;transform:translate(-50%,-50%) rotate(${r}deg);">${t}</span>`).join('');
}
async function plLivre(lvl, avecCorriges){
  if(!plLivreAutorise()){ await niceAlert('Le livre d\'exercices est réservé aux professeurs.'); return; }
  const niv = PL_NIVEAUX_TXT[lvl] || lvl, logo = await plLogo();
  const chaps = (CHAPITRES_BY_LEVEL[lvl] || []).filter(c => plDe(lvl, c.t).length);
  if(!chaps.length){ await niceAlert('Aucune planche n\'est encore écrite pour ce niveau.'); return; }
  const nb = chaps.reduce((s, c) => s + plDe(lvl, c.t).length, 0);
  const doms = [...new Set(chaps.map(c => plDom(c)))];
  const couv = `<section class="pl-page pl-couv">${plCouvDeco()}
    <div class="pl-couv-haut">${logo ? `<img class="pl-couv-logo" src="${logo}" alt="L'Atelier des Maths">` : '<b>L\'Atelier des Maths</b>'}</div>
    <div class="pl-couv-niv">${niv}</div>
    <h1 class="pl-couv-titre">Mon livre d'exercices<br><span>de mathématiques</span></h1>
    <div class="pl-couv-olivia"><span class="pl-couv-oliv">${plOliv('muscle')}</span><span class="pl-couv-bulle">À toi de jouer !<small>Du plus simple ★ au défi ★★★</small></span></div>
    <div class="pl-couv-doms">${Object.values(PL_DOMAINES).filter(d => doms.includes(d)).map(([t, c, f]) => `<span style="background:${f};color:${c};border-color:${c};">${t}</span>`).join('')}</div>
    <div class="pl-couv-nom">Ce livre appartient à : <span></span></div>
    <p class="pl-couv-sous">${chaps.length} chapitre${chaps.length > 1 ? 's' : ''} · ${nb} planche${nb > 1 ? 's' : ''} d'exercices${avecCorriges ? ' · corrigés à la fin' : ''}</p>
    <p class="pl-couv-pied">L'Atelier des Maths · L'Atelier Augmenté · édition du ${new Date().toLocaleDateString('fr-FR')}</p></section>`;
  const ligne = (ref, titre, page, et) => `<div class="pl-som-pl"><span class="pl-som-ref">${ref}</span><span class="pl-som-t">${titre}</span>${et ? `<span class="pl-som-et">${et}</span>` : ''}<span class="pl-som-pts"></span><span class="pl-som-num" data-page="${page}"></span></div>`;
  const sommaire = `<section class="pl-page pl-sommaire">
    <div class="pl-som-tete"><h1>Sommaire</h1><span class="pl-som-olivia"><span class="pl-couv-bulle">Choisis ta planche,<br>et c'est parti !</span><span class="pl-oliv">${plOliv('methode')}</span></span></div>
    <div class="pl-som-leg">${Object.values(PL_DOMAINES).filter(d => doms.includes(d)).map(([t, c]) => `<span><i style="background:${c};"></i>${t}</span>`).join('')}</div>
    ${chaps.map(c => { const [, coul, fond] = plDom(c), l = plDe(lvl, c.t);
      return `<div class="pl-som-chap" style="--c:${coul};--f:${fond};"><div class="pl-som-ct"><span class="pl-som-code">${escapeHtml(c.code)}</span><b>${escapeHtml(c.t)}</b><span class="pl-som-nb">${l.length} planche${l.length > 1 ? 's' : ''}</span></div>
        ${l.map((p, i) => ligne(plRef(lvl, c.code, i), escapeHtml(p.titre), plRef(lvl, c.code, i), plEtoiles(Math.max(...p.exos.map(x => x.etoiles || 1))))).join('')}</div>`; }).join('')}
    ${avecCorriges ? `<div class="pl-som-chap" style="--c:#1F7A4D;--f:#E8F5EE;"><div class="pl-som-ct"><span class="pl-som-code">✓</span><b>Corrigés</b></div>${ligne('', 'Toutes les planches, dans le même ordre, avec leurs réponses', 'corriges')}</div>` : ''}
    <div class="pl-guide"><h2>Comment utiliser ce livre ?</h2><div class="pl-guide-g">
      <div><span class="pl-guide-i pl-et">★<span class="pl-et-off">★★</span></span><span><b>Les étoiles</b> : dans chaque planche, les exercices vont du plus simple (★) au plus difficile (★★★).</span></div>
      <div><span class="pl-guide-i pl-oliv">${plOliv('defi')}</span><span><b>Défi !</b> Un exercice ★★★ pour aller au bout de ce que tu sais faire.</span></div>
      <div><span class="pl-guide-i pl-oliv">${plOliv('savoir')}</span><span><b>Dans ton cahier !</b> Tu rédiges la réponse dans ton cahier : une phrase, un calcul, une conclusion.</span></div>
      ${lvl in PL_SUIVANTE ? `<div><span class="pl-guide-i pl-oliv">${plOliv('cm2')}</span><span><b>${PL_SUIVANTE[lvl]}</b> Pour aller plus loin, un avant-goût de l'année prochaine.</span></div>` : ''}
      <div><span class="pl-guide-i">${plVisage(0)}${plVisage(1)}${plVisage(2)}</span><span><b>Je fais le point</b> : à la fin d'une planche, tu colories le visage qui te ressemble.</span></div>
      <div><span class="pl-guide-i pl-guide-ref">CM1-N2-P1</span><span><b>La référence</b> de chaque planche : le niveau, le chapitre, puis le numéro de la planche.</span></div>
    </div></div></section>`;
  plImprimer(lvl, chaps.map(c => ({ c, indices: plDe(lvl, c.t).map((_, i) => i) })), 'livre', { avant: couv + sommaire, sansCorriges: !avecCorriges, titre: `Livre d'exercices ${niv}${avecCorriges ? ' (avec corrigés)' : ''}` });
}

/* ---------- Projection : un exercice à la fois, avec la correction ---------- */
let plProj = null; // { lvl, c, i, k, corr, pn (exercice à l'écran), res }
function plProjeter(lvl, c, i, k){
  if(plProj && plProj.prog && typeof plProgQuitter === 'function') plProgQuitter();
  plProj = { lvl, c, i, k: k || 0, corr: false };
  plProjOuvrirVue();
  plProjRendre();
}
// Fenêtre de projection (plein écran) : aussi pour les défis de programmation (planches-prog.js).
function plProjOuvrirVue(){
  let v = document.getElementById('plProj');
  if(!v){ v = document.createElement('div'); v.id = 'plProj'; document.body.appendChild(v); }
  v.style.display = 'flex'; document.body.classList.add('plp-ouvert');
  document.addEventListener('keydown', plProjClavier);
  window.addEventListener('resize', plProjAjuster);
  const el = document.documentElement; if(el.requestFullscreen && !document.fullscreenElement){ try{ const pz = el.requestFullscreen(); if(pz && pz.catch) pz.catch(() => {}); }catch(e){} }
  return v;
}
function plProjFermer(){
  if(plProj && plProj.prog && typeof plProgQuitter === 'function') plProgQuitter();
  plProj = null; document.removeEventListener('keydown', plProjClavier); window.removeEventListener('resize', plProjAjuster);
  if(typeof plClavier !== 'undefined') plClavier.fermer();
  const v = document.getElementById('plProj'); if(v) v.style.display = 'none';
  document.body.classList.remove('plp-ouvert');
  if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
}
function plProjClavier(e){
  if(!plProj || (typeof plClavier !== 'undefined' && plClavier.cb)) return;
  if(plProj.prog){ // éditeur de blocs : on ne vole pas les touches (champs des blocs) ; Échap seulement hors saisie
    const a = document.activeElement; if(e.key === 'Escape' && !(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) && !document.querySelector('.blocklyWidgetDiv input')) plProjFermer();
    return; }
  if(e.key === 'ArrowRight' || e.key === 'PageDown'){ e.preventDefault(); plProjAller(1); }
  else if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); plProjAller(-1); }
  else if(e.key === 'c' || e.key === 'C'){ plProjCorr(); }
  else if(e.key === 'Escape'){ plProjFermer(); }
}
function plProjAller(d){
  if(!plProj) return;
  if(plProj.prog){ plProgAller(d); return; }
  const liste = plDe(plProj.lvl, plProj.c.t), p = liste[plProj.i];
  let k = plProj.k + d, i = plProj.i;
  if(k >= p.exos.length && i + 1 < liste.length){ i++; k = 0; } else if(k < 0 && i > 0){ i--; k = liste[i].exos.length - 1; }
  k = Math.max(0, Math.min(liste[i].exos.length - 1, k));
  Object.assign(plProj, { i, k, corr: false, etat: null, res: null }); plProjRendre();
}
function plProjCorr(){ if(plProj && plProj.prog){ if(typeof progAide === 'function') progAide(); return; } if(plProj){ if(plProj.pn) plProj.etat = plProj.pn.etat(); plProj.corr = !plProj.corr; plProjRendre(); } }
function plProjVerifier(){
  if(!plProj || !plProj.pn) return;
  plProj.res = plProj.pn.verifier();
  const b = document.getElementById('plpBilan'); if(b){ b.className = 'pn-bilan ' + (plProj.res.juste === plProj.res.total ? 'ok' : 'ko'); b.innerHTML = plNumBilan(plProj.res); }
  plProjAjuster();
}
function plProjEffacer(){ if(plProj && plProj.pn){ plProj.pn.effacer(); plProj.res = null; const b = document.getElementById('plpBilan'); if(b) b.innerHTML = ''; } }
function plProjRendre(){
  const v = document.getElementById('plProj'); if(!v || !plProj) return;
  if(typeof plClavier !== 'undefined') plClavier.fermer();
  const { lvl, c, i, k, corr } = plProj, liste = plDe(lvl, c.t), p = liste[i], x = p.exos[k];
  const premier = i === 0 && k === 0, dernier = i === liste.length - 1 && k === p.exos.length - 1;
  const num = !corr && typeof plNumPossible === 'function' && plNumPossible(x);
  v.innerHTML = `<div class="plp-tete"><span class="pl-ref">${plRef(lvl, c.code, i)}</span><b>${escapeHtml(p.titre)}</b>
      <span class="plp-pos">Exercice ${k + 1} / ${p.exos.length}</span><span class="pl-et">${plEtoiles(x.etoiles || 1)}</span>
      <button class="plp-fermer" onclick="plProjFermer()" title="Fermer (Échap)"><span class="gicon">close</span></button></div>
    <div class="plp-corps${corr ? ' corr' : ''}" id="plpCorps"><div class="plp-boite" id="plpBoite"><div class="plp-consigne">${x.consigne}</div><div class="plp-rep" id="plpRep">${num ? '' : plExoCorps(x, corr)}</div>
</div></div>
    <div class="plp-pied">${num ? `<div class="pn-bilan" id="plpBilan"></div>` : ''}<button class="btn secondary" onclick="plProjAller(-1)" ${premier ? 'disabled' : ''}><span class="gicon">arrow_back</span> Précédent</button>
      ${num ? `<button class="btn plp-verif" onclick="plProjVerifier()"><span class="gicon">task_alt</span> Vérifier ma réponse</button>
        <button class="btn secondary" onclick="plProjEffacer()" title="Tout effacer"><span class="gicon">ink_eraser</span> Effacer</button>` : ''}
      <button class="btn plp-corr${corr ? ' on' : ''}" onclick="plProjCorr()"><span class="gicon">${corr ? 'visibility_off' : 'fact_check'}</span> ${corr ? 'Cacher la correction' : 'Correction'}</button>
      <button class="btn secondary" onclick="plProjAller(1)" ${dernier ? 'disabled' : ''}>Suivant <span class="gicon">arrow_forward</span></button></div>`;
  plProj.pn = null;
  if(num){
    plProj.pn = plNum(document.getElementById('plpRep'), x, { etat: plProj.etat, res: plProj.res, onChange: e => { plProj.etat = e; const b = document.getElementById('plpBilan'); if(b && plProj.res){ plProj.res = null; b.innerHTML = ''; } } });
    if(plProj.res) plProjVerifier();
  } else if(typeof renderStaticMath === 'function') renderStaticMath(v);
  plProjAjuster();
}
// L'exercice est centré et agrandi pour remplir l'écran (élève au tableau, fond de classe).
function plProjAjuster(){
  const corps = document.getElementById('plpCorps'), boite = document.getElementById('plpBoite'); if(!corps || !boite) return;
  boite.style.zoom = 1;
  const r = boite.getBoundingClientRect(), cl = document.getElementById('plClavier');
  const droite = cl && cl.style.display === 'block' ? cl.getBoundingClientRect().width + 24 : 0;
  const W = corps.clientWidth - 48 - droite, H = corps.clientHeight - 32;
  const z = Math.max(.6, Math.min(W / r.width, H / r.height, 3.4));
  boite.style.zoom = z.toFixed(3);
  corps.style.paddingRight = droite ? droite + 24 + 'px' : '';
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
  .pl-marque{ display:inline-flex; align-items:center; gap:3px; margin:-9px auto -9px 8px; } .pl-marque .pl-oliv{ width:30px; height:30px; } .pl-marque .pl-bulle{ font-size:8.5pt; padding:0 7px; }
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
  .pl-exos > .pl-exo.pl-demi.pl-seul{ grid-column:1 / -1; }
  .pl-tab{ border-collapse:collapse; margin:2px auto; } .pl-tab th, .pl-tab td{ border:1px solid #8A93A3; padding:3px 8px; text-align:center; } .pl-tab th{ background:#F3F5F8; font-size:.85em; font-weight:600; }
  body.pl-imp{ --ink:#1C2B39; --ink-soft:#4E5665; --accent-orange:#E35D3A; --accent-blue:#2EA8C9; --accent-green:#2E9C6A; }
  .pl-plein{ display:flex; flex-direction:column; box-sizing:border-box; }
  .pl-plein .pl-exos{ flex:1; align-content:stretch; }
  .pl-plein .pl-exo{ display:flex; flex-direction:column; }
  .pl-plein .pl-corps{ flex:1; display:flex; flex-direction:column; justify-content:space-evenly; }
  .pl-plein .pl-pied{ margin-top:auto; }
  .pl-point{ border:1.5px solid #8DB84A; background:#F6FAEF; border-radius:10px; padding:4px 11px 5px; margin:0 0 4px; break-inside:avoid; }
  .pl-point[hidden]{ display:none; }
  .pl-point-tete{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:2px; } .pl-point-tete b{ font:700 11pt 'Space Grotesk',Arial,sans-serif; color:#3E5A1E; }
  .pl-point-tete .pl-oliv{ width:28px; height:28px; } .pl-point-aide{ font-size:9pt; color:#4E5665; }
  .pl-point-leg{ margin-left:auto; display:flex; gap:10px; font-size:8.5pt; color:#4E5665; } .pl-point-leg span{ display:inline-flex; align-items:center; gap:3px; } .pl-point-leg svg{ width:14px; height:14px; }
  .pl-point-l{ display:flex; align-items:center; gap:10px; border-top:1px dashed #CFE3B4; padding:2px 0; font-size:10pt; } .pl-point-l > span:first-child{ flex:1; }
  .pl-point-v{ display:inline-flex; gap:6px; }
  .pl-corps svg{ max-width:100%; height:auto; max-height:66px; }
  .pl-corps svg.pl-libre, .pl-corps .pl-quad svg{ max-height:none; }
  .pl-unites{ display:inline-flex; gap:5px; flex-wrap:wrap; align-items:center; vertical-align:middle; }
  .pl-corps svg[viewBox$=' 94']{ max-height:none; width:auto !important; height:54px !important; margin:0 auto !important; }
  .pl-corps .cm-redac{ margin:2px 0 6px; }
  .pl-pied{ margin-top:4px; border-top:1px solid #CBD2DC; padding-top:4px; font-size:8.5pt; color:#6B7280; text-align:center; }
  .pl-f{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; margin:0 2px; line-height:1.1; font-size:1.05em; }
  .pl-f > span{ padding:0 3px; } .pl-f > span:first-child{ border-bottom:1.5px solid currentColor; }
  .pl-consigne .pl-f{ font-size:.78em; vertical-align:middle; line-height:1; }
  .cm-redac{ margin:2px 0 6px; line-height:1.45; } .cm-redac-titre{ text-decoration:underline; text-underline-offset:3px; font-weight:600; margin-bottom:2px; }
  .cm-redac-ligne{ margin:2px 0 2px 18px; } .cm-redac-phrase{ margin:3px 0 0; } .cm-encadre{ display:inline-block; border:2px solid #1F3A5C; border-radius:3px; padding:1px 8px; font-weight:700; } .cm-redac-fig{ margin:2px 0 3px 18px; } .cm-redac-fig svg{ max-width:100%; height:auto; } .pl-corrige .cm-redac-fig svg{ max-height:64px; width:auto !important; margin:0 !important; }
  .cm-fig-d{ float:right; margin:0 0 2px 8px; } .cm-fig-d svg, .pl-corrige .cm-redac-fig .cm-fig-d svg{ max-width:none !important; height:72px !important; max-height:none !important; width:auto !important; } .cm-redac::after{ content:''; display:block; clear:both; }
  .cm-redac-col{ border-collapse:collapse; margin:2px 0 4px 18px; } .cm-redac-col td{ padding:2px 4px; }
  .katex{ font-size:1.12em; }
  .pl-consigne .katex{ font-size:1em; } .pl-consigne .katex .mfrac .frac-line{ border-bottom-width:1px; }
`;
// Livre : couverture, sommaire, séparation des corrigés, numéros de page.
const PL_CSS_LIVRE = `
  @page{ @bottom-center{ content:counter(page); font:9pt Arial,sans-serif; color:#6B7280; } }
  @page :first{ @bottom-center{ content:none; } }
  .pl-couv{ display:flex; flex-direction:column; align-items:center; justify-content:space-between; text-align:center; gap:10px; padding:16px 18px 10px; box-sizing:border-box; overflow:hidden;
    border-radius:18px; background:linear-gradient(165deg,#FFF6DA 0%,#FFFFFF 38%,#E9F3FD 100%); border:3px solid #1F3A5C; }
  .pl-couv > *{ position:relative; z-index:1; }
  .pl-couv-formes{ position:absolute !important; inset:0; width:100%; height:100%; z-index:0 !important; }
  .pl-couv-sym{ position:absolute !important; z-index:0 !important; font-family:'Space Grotesk',Arial,sans-serif; font-weight:800; opacity:.55; }
  .pl-couv-logo{ height:62px; width:auto; }
  .pl-couv-niv{ font:800 58pt 'Space Grotesk',Arial,sans-serif; color:#fff; line-height:1; background:linear-gradient(135deg,#E35D3A,#F08A3C); border-radius:26px; padding:8px 34px 12px; box-shadow:0 6px 0 #B8452A; }
  .pl-couv-titre{ font:800 30pt 'Space Grotesk',Arial,sans-serif !important; color:#1F3A5C !important; margin:6px 0 0 !important; line-height:1.1; }
  .pl-couv-titre span{ color:#2E6FD8; }
  .pl-couv-olivia{ display:flex; align-items:center; gap:10px; }
  .pl-couv-oliv{ width:190px; height:190px; display:block; } .pl-couv-oliv svg{ width:100%; height:100%; }
  .pl-couv-bulle{ background:#fff; color:#3E5A1E; border:3px solid #8DB84A; border-radius:20px 20px 20px 4px; padding:8px 16px; font:800 17pt 'Space Grotesk',Arial,sans-serif; display:flex; flex-direction:column; text-align:left; }
  .pl-couv-bulle small{ font:600 10pt Inter,Arial,sans-serif; color:#4E5665; margin-top:2px; }
  .pl-couv-doms{ display:flex; flex-wrap:wrap; gap:8px; justify-content:center; max-width:150mm; }
  .pl-couv-doms span{ border:2px solid; border-radius:999px; padding:3px 12px; font:700 10.5pt 'Space Grotesk',Arial,sans-serif; }
  .pl-couv-nom{ font:700 13pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; display:flex; align-items:flex-end; gap:8px; width:140mm; background:#fff; border:2px dashed #8DB84A; border-radius:14px; padding:12px 16px; }
  .pl-couv-nom span{ flex:1; border-bottom:2px dotted #8A93A3; height:1.2em; }
  .pl-couv-sous{ color:#1F3A5C; font:600 12pt Inter,Arial,sans-serif; margin:0; }
  .pl-couv-pied{ margin:0; color:#6B7280; font-size:9.5pt; }
  .pl-som-tete{ display:flex; align-items:center; justify-content:space-between; border-bottom:3px solid #1F3A5C; margin-bottom:6px; }
  .pl-sommaire h1{ font:800 26pt 'Space Grotesk',Arial,sans-serif !important; color:#1F3A5C; margin:0 !important; }
  .pl-som-olivia{ display:flex; align-items:center; gap:6px; } .pl-som-olivia .pl-oliv{ width:76px; height:76px; } .pl-som-olivia .pl-couv-bulle{ font-size:11pt; padding:5px 12px; border-radius:16px 16px 4px 16px; }
  .pl-som-leg{ display:flex; flex-wrap:wrap; gap:6px 16px; font-size:9pt; color:#4E5665; margin:0 0 10px; } .pl-som-leg i{ display:inline-block; width:12px; height:12px; border-radius:3px; margin-right:5px; vertical-align:-1px; }
  .pl-som-chap{ margin:0 0 8px; break-inside:avoid; border-left:6px solid var(--c); background:var(--f); border-radius:10px; padding:5px 12px 6px; }
  .pl-som-ct{ display:flex; align-items:center; gap:8px; margin-bottom:2px; } .pl-som-ct b{ font:700 12pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; flex:1; }
  .pl-som-code{ background:var(--c); color:#fff; font:800 9.5pt 'Space Grotesk',Arial,sans-serif; border-radius:6px; padding:1px 7px; }
  .pl-som-nb{ font-size:8.5pt; color:var(--c); font-weight:700; }
  .pl-som-pl{ display:flex; align-items:baseline; gap:6px; margin:1px 0 1px 4px; font-size:10.5pt; }
  .pl-som-ref{ min-width:84px; font:700 8.5pt 'Space Grotesk',Arial,sans-serif; color:var(--c); }
  .pl-som-et{ color:#E9A21C; font-size:8.5pt; letter-spacing:1px; } .pl-som-et .pl-et-off{ color:#D8DCE3; }
  .pl-som-pts{ flex:1; border-bottom:1.5px dotted #A7B0BD; transform:translateY(-3px); min-width:20px; }
  .pl-som-num{ font:800 10.5pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; min-width:22px; text-align:right; }
  .pl-sommaire{ display:flex; flex-direction:column; justify-content:space-between; }
  .pl-guide{ margin-top:6px; border:2px solid #8DB84A; background:#F6FAEF; border-radius:14px; padding:8px 14px 10px; break-inside:avoid; }
  .pl-guide h2{ font:800 13pt 'Space Grotesk',Arial,sans-serif; color:#3E5A1E; margin:0 0 6px; }
  .pl-guide-g{ display:grid; grid-template-columns:1fr 1fr; gap:6px 16px; font-size:9.5pt; }
  .pl-guide-g > div{ display:flex; align-items:center; gap:8px; }
  .pl-guide-i{ flex:none; display:inline-flex; align-items:center; justify-content:center; min-width:46px; } .pl-guide .pl-oliv{ width:40px; height:40px; } .pl-guide-i svg{ width:16px; height:16px; } .pl-guide .pl-oliv svg{ width:100%; height:100%; }
  .pl-guide-ref{ font:700 7.5pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; border:1.5px solid #1F3A5C; border-radius:5px; padding:1px 4px; }
`;
(function plStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .pl-bouton{ margin:6px 0 0 8px; }
    .pl-modal{ max-width:720px; width:94vw; max-height:88vh; overflow:auto; }
    .td-vig .pl-tab, .plp-boite .pl-tab, .cd-contenu .pl-tab{ border-collapse:collapse; margin:2px auto; } .td-vig .pl-tab th, .td-vig .pl-tab td, .plp-boite .pl-tab th, .plp-boite .pl-tab td, .cd-contenu .pl-tab th, .cd-contenu .pl-tab td{ border:1px solid #8A93A3; padding:3px 8px; text-align:center; }
    .pl-livre-grp{ display:inline-flex; align-items:center; gap:6px; flex-wrap:wrap; background:#FFF6DA; border:1.5px solid #F0C75E; border-radius:12px; padding:5px 8px; } .pl-livre-t{ font:700 .85rem 'Space Grotesk',sans-serif; color:#7A5A00; display:inline-flex; align-items:center; gap:4px; } .pl-livre-t .gicon{ font-size:18px; }
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
    .td-intro{ display:flex; align-items:center; gap:12px; flex-wrap:wrap; background:#F4F9EC; border:1.5px solid #CFE3B4; border-radius:14px; padding:10px 14px; margin:6px 0 14px; }
    .td-intro > div{ flex:1; min-width:240px; } .td-intro .pl-oliv{ width:54px; height:54px; display:inline-block; } .td-intro .pl-oliv svg{ width:100%; height:100%; }
    .td-planche{ margin:0 0 18px; } .td-p-tete{ display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin:0 0 8px; font-family:'Space Grotesk',sans-serif; }
    .td-p-tete .pl-ref, .td-planche .pl-ref{ font:700 .8rem 'Space Grotesk',sans-serif; color:#1F3A5C; border:1.5px solid #1F3A5C; border-radius:6px; padding:0 7px; }
    .td-p-tete .hint{ flex:1; min-width:200px; }
    /* Comme sur la planche A4 : un exercice pleine largeur prend toute la ligne, deux demi-largeur côte à côte (même hauteur). */
    .td-grille{ display:grid; grid-template-columns:1fr 1fr; gap:12px; align-items:stretch; grid-auto-flow:row dense; } .td-vig.td-plein{ grid-column:1 / -1; }
    @media (max-width:760px){ .td-grille{ grid-template-columns:1fr; } }
    .td-vig{ background:#fff; border:1.5px solid rgba(28,43,57,.12); border-radius:14px; padding:10px 12px; display:flex; flex-direction:column; gap:6px; min-width:0; }
    .td-vig.corr{ border-color:#1F7A4D; background:#F6FBF8; }
    .td-v-tete{ display:flex; justify-content:space-between; align-items:center; } .td-v-tete .pl-marque{ display:inline-flex; align-items:center; gap:3px; margin:-8px 0 -8px 8px; } .td-v-tete .pl-marque .pl-oliv{ width:30px; height:30px; display:inline-block; } .td-v-tete .pl-marque .pl-oliv svg{ width:100%; height:100%; } .td-v-tete .pl-marque .pl-bulle{ background:#fff; color:#3E5A1E; border:2px solid #8DB84A; border-radius:10px 10px 10px 3px; padding:0 7px; font:700 .72rem 'Space Grotesk',sans-serif; white-space:nowrap; } .td-v-tete .pl-marque + .td-num{ margin-left:8px; } .td-v-tete .pl-et{ margin-left:auto; } .td-vig .pl-num{ font:700 .95rem 'Space Grotesk',sans-serif; color:#E35D3A; }
    .td-vig .pl-et{ color:#E9A21C; letter-spacing:2px; } .td-vig .pl-et-off{ color:#D8DCE3; }
    .td-v-corps{ font-size:.92rem; overflow-x:auto; } .td-v-corps .pl-consigne{ font-weight:600; margin-bottom:6px; }
    .td-num{ margin:0 auto 0 10px; font:700 .72rem 'Space Grotesk',sans-serif; color:#3A6EA5; background:#EEF4FB; border-radius:999px; padding:1px 8px; display:inline-flex; align-items:center; gap:3px; } .td-num .gicon{ font-size:14px; }
    .td-v-pied{ display:flex; gap:6px; flex-wrap:wrap; margin-top:auto; } .td-mini{ padding:4px 10px !important; font-size:.82rem !important; }
    .td-vig .pl-grille, .pl-ex-cahier .pl-grille{ display:grid; gap:6px 14px; align-items:center; } .td-vig .pl-item, .pl-ex-cahier .pl-item{ display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
    .td-vig .pl-liste, .pl-ex-cahier .pl-liste{ margin:0; padding-left:18px; } .td-vig .pl-liste li, .pl-ex-cahier .pl-liste li{ margin:3px 0; }
    .td-vig .pl-frac, .pl-ex-cahier .pl-frac, .cd-contenu .pl-frac{ display:inline-flex; flex-direction:column; align-items:center; vertical-align:middle; gap:2px; margin:0 3px; }
    .td-vig .pl-case, .pl-ex-cahier .pl-case, .cd-contenu .pl-case{ display:inline-block; width:20px; height:16px; border:1.5px solid #8A93A3; border-radius:4px; background:#fff; } .pl-case-seule{ vertical-align:middle; margin:0 4px; }
    .td-vig .pl-barre, .pl-ex-cahier .pl-barre, .cd-contenu .pl-barre{ display:block; width:26px; border-top:2px solid #1C2B39; }
    .td-vig .pl-pts, .pl-ex-cahier .pl-pts, .cd-contenu .pl-pts{ display:inline-block; border-bottom:1.5px dotted #8A93A3; height:1.1em; min-width:3em; }
    .td-vig .pl-rep, .pl-ex-cahier .pl-rep, .cd-contenu .pl-rep{ color:#1F7A4D; font-weight:800; } .pl-entoure{ display:inline-block; border:2px solid #1F7A4D; border-radius:50%; padding:1px 6px; }
    .pl-barre-rep{ position:relative; display:inline-block; } .pl-barre-rep::after{ content:''; position:absolute; left:-4px; right:-4px; top:50%; border-top:2.5px solid #C0392B; transform:rotate(-20deg); }
    .td-vig svg, .pl-ex-cahier svg{ max-width:100%; height:auto; } .pl-unites{ display:inline-flex; gap:5px; flex-wrap:wrap; align-items:center; vertical-align:middle; }
    .pl-cahier{ display:flex; align-items:center; gap:6px; margin-top:4px; } .pl-cahier .pl-oliv{ width:38px; height:38px; display:inline-block; } .pl-cahier .pl-oliv svg{ width:100%; height:100%; }
    .pl-cahier .pl-bulle{ background:#fff; color:#3E5A1E; border:2px solid #8DB84A; border-radius:12px 12px 12px 3px; padding:1px 9px; font:700 .8rem 'Space Grotesk',sans-serif; white-space:nowrap; }
    .pl-lignes div{ height:22px; border-bottom:1px solid #CBD2DC; }
    .pl-ex-corr-titre{ margin:10px 0 4px; font:700 .9rem 'Space Grotesk',sans-serif; color:#1F7A4D; }
    .plp-corps .pl-unites{ display:inline-flex; gap:5px; flex-wrap:wrap; align-items:center; }
    #plProj{ position:fixed; inset:0; z-index:9500; background:#FBF8F2; display:none; flex-direction:column; }
    .plp-tete{ display:flex; align-items:center; gap:14px; padding:10px 20px; background:#1F3A5C; color:#fff; font-family:'Space Grotesk',sans-serif; flex-wrap:wrap; }
    .plp-tete .pl-ref{ color:#fff; border:1.5px solid #fff; border-radius:6px; padding:0 8px; font-weight:700; } .plp-tete b{ font-size:1.15rem; }
    .plp-pos{ margin-left:auto; font-weight:700; } .plp-tete .pl-et{ color:#F4C04E; letter-spacing:2px; } .plp-tete .pl-et-off{ color:rgba(255,255,255,.3); }
    .plp-fermer{ border:0; background:rgba(255,255,255,.15); color:#fff; border-radius:8px; cursor:pointer; display:flex; padding:4px; }
    .plp-corps{ flex:1; overflow:auto; padding:16px 24px; display:flex; align-items:center; justify-content:center; min-height:0; }
    .plp-boite{ width:max-content; max-width:760px; font-size:13px; line-height:1.45; color:#1C2B39; margin:auto; }
    .plp-pied .pn-bilan{ flex-basis:100%; margin:0; font-size:1.15rem; } .plp-pied .pn-bilan:empty{ display:none; }
    body.plp-ouvert #plClavier{ left:auto; right:16px; transform:none; bottom:84px; }
    .plp-verif{ background:#F08A3C !important; border-color:#F08A3C !important; }
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
    .plp-pied{ display:flex; flex-wrap:wrap; justify-content:center; gap:10px 14px; padding:12px; border-top:1px solid rgba(28,43,57,.12); background:#fff; }
    .plp-pied .btn{ font-size:1.05rem; padding:10px 18px; } .plp-corr{ background:#1F7A4D !important; border-color:#1F7A4D !important; } .plp-corr.on{ background:#5B6472 !important; border-color:#5B6472 !important; }
  `;
  document.head.appendChild(st);
})();

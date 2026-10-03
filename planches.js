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
// Réponse entourée dans le corrigé.
function plEntoure(html){ return `<span class="pl-entoure">${html}</span>`; }
// Grille d'items (cols colonnes) : items = [html...].
function plGrille(items, cols){ return `<div class="pl-grille" style="grid-template-columns:repeat(${cols || 2},1fr);">${items.map(x => `<div class="pl-item">${x}</div>`).join('')}</div>`; }
// Liste à puces (jamais « 1. », « 2. »).
function plListe(items){ return `<ul class="pl-liste">${items.map(x => `<li>${x}</li>`).join('')}</ul>`; }
// Lignes pour rédiger (problèmes).
function plLignes(n){ return `<div class="pl-lignes">${'<div></div>'.repeat(n || 3)}</div>`; }

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
    b.title = 'Planches d\'exercices de ce chapitre, à imprimer pour la classe, avec leur corrigé';
    meta.insertAdjacentElement('afterend', b);
  }
  b.onclick = () => plOuvrir(lvl, c);
}
function plOuvrir(lvl, c){
  const liste = plDe(lvl, c.t); if(!liste.length) return;
  const esc = s => escapeHtml(String(s ?? ''));
  const o = document.createElement('div'); o.className = 'qzd-ov';
  o.innerHTML = `<div class="qzd-modal pl-modal" role="dialog" aria-label="Planches à imprimer">
    <h3><span class="gicon">print</span> Planches à imprimer : ${esc(c.t)}</h3>
    <p class="hint" style="margin:4px 0 10px;">${liste.length} planche${liste.length > 1 ? 's' : ''} d'exercices, du plus simple (★) au plus difficile (★★★). Chacune tient sur une page A4 et a son corrigé pour vous. Dans la fenêtre d'impression, choisissez l'imprimante ou « Enregistrer au format PDF ».</p>
    <div class="pl-cartes">${liste.map((p, i) => `<div class="pl-carte">
      <div class="pl-carte-tete"><span class="pl-ref">${plRef(lvl, c.code, i)}</span><b>${esc(p.titre)}</b></div>
      <div class="pl-carte-att">${(p.attendus || []).map(a => `<div><span class="gicon">flag</span> ${esc(a)}</div>`).join('')}</div>
      <div class="pl-carte-pied"><span class="hint" style="margin:0;">${p.exos.length} exercices${p.duree ? ' · environ ' + esc(p.duree) : ''}</span>
        <button type="button" class="btn secondary" data-imp="${i}" data-mode="eleve"><span class="gicon">print</span> Planche</button>
        <button type="button" class="btn secondary" data-imp="${i}" data-mode="corr"><span class="gicon">fact_check</span> Corrigé</button></div></div>`).join('')}</div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;flex-wrap:wrap;">
      <button type="button" class="btn secondary" data-x>Fermer</button>
      <button type="button" class="btn secondary" data-tout="corr"><span class="gicon">fact_check</span> Tous les corrigés</button>
      <button type="button" class="btn" data-tout="eleve"><span class="gicon">print</span> Toutes les planches</button></div></div>`;
  document.body.appendChild(o);
  o.addEventListener('click', e => {
    const t = e.target;
    if(t === o || t.closest('[data-x]')){ o.remove(); return; }
    const b = t.closest('[data-imp]'); if(b){ plImprimer(lvl, c, [Number(b.dataset.imp)], b.dataset.mode); return; }
    const a = t.closest('[data-tout]'); if(a) plImprimer(lvl, c, liste.map((_, i) => i), a.dataset.tout);
  });
}

/* ---------- Impression ---------- */
function plPageHtml(lvl, c, p, i, n, mode){
  const corr = mode === 'corr', ref = plRef(lvl, c.code, i), niv = PL_NIVEAUX_TXT[lvl] || lvl;
  const etoiles = k => '★'.repeat(k) + '<span class="pl-et-off">' + '★'.repeat(3 - k) + '</span>';
  return `<section class="pl-page${corr ? ' pl-corrige' : ''}">
    <header class="pl-tete"><span class="pl-site">L'Atelier des Maths · ${niv} · ${escapeHtml(c.t)}</span><span class="pl-ref">${ref}${corr ? ' · CORRIGÉ' : ''}</span></header>
    <h1>Planche ${i + 1} : ${escapeHtml(p.titre)}</h1>
    ${corr ? '<p class="pl-pour-prof">Corrigé réservé au professeur.</p>' : '<div class="pl-nom"><span>Prénom : <span class="pl-pts" style="min-width:14em;"></span></span><span>Date : <span class="pl-pts" style="min-width:8em;"></span></span></div>'}
    <div class="pl-attendus"><b>Je travaille :</b> ${(p.attendus || []).map(a => escapeHtml(a)).join(' ; ')}</div>
    ${p.exos.map((x, k) => `<div class="pl-exo"><div class="pl-exo-tete"><span class="pl-num">Exercice ${k + 1}</span><span class="pl-et">${etoiles(x.etoiles || 1)}</span></div>
      <div class="pl-consigne">${x.consigne}</div><div class="pl-corps">${corr ? (x.corr || x.eleve) : x.eleve}</div></div>`).join('')}
    <footer class="pl-pied">${ref} · Planche ${i + 1} sur ${n} · ${niv} · ${escapeHtml(c.t)} · ${p.duree ? 'environ ' + escapeHtml(p.duree) + ' · ' : ''}L'Atelier des Maths</footer>
  </section>`;
}
async function plImprimer(lvl, c, indices, mode){
  const liste = plDe(lvl, c.t);
  // Formules rendues ici (KaTeX est chargé dans la page), puis recopiées dans la fenêtre d'impression.
  const tmp = document.createElement('div'); tmp.style.cssText = 'position:absolute;left:-9999px;top:0;width:180mm;';
  tmp.innerHTML = indices.map(i => plPageHtml(lvl, c, liste[i], i, liste.length, mode)).join('');
  document.body.appendChild(tmp);
  // Fractions dessinées en HTML (aucune dépendance au réseau au moment d'imprimer) ; le reste des
  // formules, s'il y en a, passe par KaTeX.
  tmp.querySelectorAll('span.tex').forEach(el => {
    const h = el.textContent.replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, (m, a, b) => `<span class="pl-f"><span>${a}</span><span>${b}</span></span>`);
    if(!/\\/.test(h)){ const sp = document.createElement('span'); sp.className = 'pl-tex'; sp.innerHTML = h; el.replaceWith(sp); }
  });
  if(typeof renderStaticMath === 'function') renderStaticMath(tmp);
  tmp.querySelectorAll('.katex-mathml').forEach(x => x.remove()); // copie pour lecteur d'écran : sur papier, elle doublerait chaque formule
  const corps = tmp.innerHTML; tmp.remove();
  const w = window.open('', '_blank', 'width=900,height=1000');
  if(!w){ await niceAlert('La fenêtre n\'a pas pu s\'ouvrir : autorisez les fenêtres (pop-up) pour ce site.'); return; }
  const feuille = document.querySelector('link[href*="styles.css"]');
  w.document.open();
  w.document.write(`<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${plRef(lvl, c.code, indices[0])}${indices.length > 1 ? ' et suivantes' : ''}${mode === 'corr' ? ' (corrigé)' : ''}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
    ${feuille ? `<link rel="stylesheet" href="${feuille.href}">` : ''}
    <style>${PL_CSS}</style></head><body class="pl-imp">
    <button type="button" class="pl-bouton-imp" onclick="window.print()">Imprimer / Enregistrer en PDF</button>${corps}</body></html>`);
  w.document.close();
  w.onload = () => setTimeout(() => { w.focus(); w.print(); }, 300);
}
const PL_CSS = `
  @page{ size:A4; margin:10mm 12mm; }
  *{ -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; }
  body.pl-imp{ background:#fff; color:#1C2B39; font-family:Inter,Arial,sans-serif; font-size:11.5pt; line-height:1.35; margin:0; padding:0; }
  .pl-bouton-imp{ display:block; margin:12px auto; padding:10px 18px; border:0; border-radius:24px; background:#0C5BA0; color:#fff; font:600 14px Inter,Arial,sans-serif; cursor:pointer; }
  @media print{ .pl-bouton-imp{ display:none; } }
  .pl-page{ max-width:184mm; margin:0 auto 10mm; page-break-after:always; break-after:page; position:relative; }
  .pl-page:last-child{ page-break-after:auto; break-after:auto; }
  .pl-tete{ display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #1F3A5C; padding-bottom:4px; font-size:9.5pt; color:#4E5665; }
  .pl-ref{ font:700 10pt 'Space Grotesk',Arial,sans-serif; color:#1F3A5C; border:1.5px solid #1F3A5C; border-radius:6px; padding:1px 8px; }
  .pl-corrige .pl-ref{ color:#1F7A4D; border-color:#1F7A4D; }
  .pl-page h1{ font:700 15pt 'Space Grotesk',Arial,sans-serif; margin:7px 0 4px; color:#1F3A5C; }
  .pl-nom{ display:flex; gap:28px; margin:2px 0 6px; font-weight:600; }
  .pl-pour-prof{ margin:0 0 8px; color:#1F7A4D; font-weight:700; }
  .pl-attendus{ font-size:9.5pt; background:#F3F5F8; border-radius:8px; padding:4px 10px; margin-bottom:7px; }
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
  .pl-corps svg{ max-width:100%; height:auto; max-height:62px; }
  .pl-corps svg[viewBox$=' 94']{ max-height:none; width:auto !important; height:60px !important; margin:0 auto !important; }
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
  `;
  document.head.appendChild(st);
})();

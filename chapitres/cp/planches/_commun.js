/* ============================================================
   CP, CE1 et CE2 · Outils communs aux planches (manuels du CP, du CE1 et du CE2)
   Demandé : « Avant de publier, il faut créer les manuels ». Au CP, l'élève lit peu : consignes
   courtes (l'enseignant les lit), beaucoup de dessins à compter, entourer, colorier, compléter ;
   une seule réponse par case. Les dessins viennent de chapitres/cp/_anims.js (dé, boîte de dix,
   pommes, barres de dix, bande et tableau des nombres, monnaie, horloge, règle, quadrillage…).
   ============================================================ */
const PCP = {
  // Une rangée de dessins centrée.
  lig: (...l) => `<div class="cpn-rang" style="margin:4px 0;">${l.join('')}</div>`,
  // Dessins à compter : [[dessin, réponse], …] → dessin + case (élève) / dessin + réponse (corrigé).
  compte: (items, cols, n) => ({
    eleve: plGrille(items.map(([f]) => `${f}<br>${P3.B(n || 2)}`), cols || items.length),
    corr: plGrille(items.map(([f, r]) => `${f}<br>${P3.R(r)}`), cols || items.length) }),
  // Entourer le bon dessin : [[dessin, bon ?], …].
  entoure: (items, cols) => ({
    eleve: plGrille(items.map(([f]) => f), cols || items.length),
    corr: plGrille(items.map(([f, ok]) => ok ? plEntoure(f) : f), cols || items.length) }),
  // Dessin vierge pour l'élève, dessin complété pour le corrigé.
  dessin: (vierge, rempli) => ({ eleve: PCP.lig(vierge), corr: PCP.lig(rempli) }),
  // Une suite de nombres avec des trous (@) : 'à compléter'.
  suite: (L, n) => ({
    eleve: `<div class="cpn-cartes" style="margin:4px 0;">${L.map(v => String(v).startsWith('@') ? `<span>${P3.B(n || 2)}</span>` : `<span>${v}</span>`).join('')}</div>`,
    corr: `<div class="cpn-cartes" style="margin:4px 0;">${L.map(v => String(v).startsWith('@') ? `<span>${P3.R(String(v).slice(1))}</span>` : `<span>${v}</span>`).join('')}</div>` }),
  // Une collection de pommes en vrac, toutes visibles (pour compter).
  pommes: (n, graine, px) => { const W = 40 + Math.ceil(Math.sqrt(n * 1.6)) * 34, H = 30 + Math.ceil(n / Math.ceil(Math.sqrt(n * 1.6))) * 34 + 20;
    return cpSvg(W, H, cpVrac(n, graine || n * 5 + 1, W, H, 30).map(([x, y]) => cpPomme(x, y + 6, { r: 12 })).join(''), px || Math.min(150, W)); },
  // À l'écran, on y dessine en touchant (outils « ronds » et « boite » de planches-num.js) -- relecture CP-N1 :
  // « permettre de dessiner les ronds », « case non cliquable ». Sur papier : un cadre en pointillés, une boîte de dix vide.
  zone: (n, o) => { o = o || {}; const k = 28, w = o.w || 10, h = o.h || 2, W = w * k + 8, H = h * k + 8;
    return plX(cpSvg(W, H, `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="10" fill="#fff" stroke="#9FB0C4" stroke-width="2" stroke-dasharray="7 5"/>`, o.px || W), { t: 'ronds', n, k, ox: 4, oy: 4, w, h, c: o.c }); },
  boite: (n, o) => { o = o || {}; const c = o.c || 22, d = o.deja || 0; return plX(cpBoiteDix(d, { c }), { t: 'boite', n, k: c, ox: 3, oy: 3, c: o.coul, plein: o.plein, deja: d }); },
  // Jetons blancs à colorier : r en rouge, b en bleu.
  bicolore: (r, b) => { const n = r + b, k = 30; return plX(cpSvg(n * k + 8, k + 8, Array.from({ length: n }, (_, i) => `<circle cx="${4 + i * k + k / 2}" cy="${4 + k / 2}" r="${k * .37}" fill="#fff" stroke="${CPC.bord}"/>`).join(''), n * k + 8), { t: 'bicolore', n, k, ox: 4, oy: 4, r, b }); },
  // Deux mains aux doigts repliés ; att : doigts levés attendus sur chaque main.
  mains: (att, px) => plX(cpSvg(214, 96, cpMainSvg(30, 6, 0) + cpMainSvg(126, 6, 0, { droite: true }), px || 200), { t: 'mains', mains: [[30, 6, false], [126, 6, true]], att }),
  // Cadre vide où l'élève dessine.
  cadre: (h, txt) => `<div style="flex:1 1 100%;min-width:100px;box-sizing:border-box;border:2px dashed #9FB0C4;border-radius:10px;min-height:${h || 70}px;margin:4px 0;padding:4px 8px;color:#9AA3AE;font-size:.85rem;">${txt || ''}</div>`,
};

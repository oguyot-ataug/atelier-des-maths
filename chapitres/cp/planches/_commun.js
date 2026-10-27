/* ============================================================
   CP et CE1 · Outils communs aux planches (manuels du CP et du CE1)
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
  // Cadre vide où l'élève dessine.
  cadre: (h, txt) => `<div style="flex:1 1 100%;min-width:100px;box-sizing:border-box;border:2px dashed #9FB0C4;border-radius:10px;min-height:${h || 70}px;margin:4px 0;padding:4px 8px;color:#9AA3AE;font-size:.85rem;">${txt || ''}</div>`,
};

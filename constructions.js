/* ============================================================
   Corrections animées des constructions -- AUX INSTRUMENTS DU SITE
   -- demandé le 01/11/2026 (relecture 6e-G1-P4-E5 : « Est-il possible d'y mettre une correction animée avec notre
   outil ? », « Oui, mets en place la correction animée », puis « Tu n'as pas utilisé les instruments du site ! »).

   plConstruction({ w, h, px, depart, etapes: [{ texte, el: [éléments] }], programme: [...], outils: [...] }) :
   - la figure FINALE en SVG (papier, Manuel, impressions : rien ne change) ;
   - `programme` : le programme de construction du tableau interactif (format de tableau-ia.js : point,
     segment_length, circle, intersect, perpendicular, midpoint, perpendicular_bisector, angle_bisector…) ;
     `outils` : instruments autorisés (regle, equerre, requerre, compas, rapporteur ; tous par défaut).
   À l'écran (vignettes, correction, projection), un bouton « Voir la construction aux instruments » sous la figure
   ouvre le lecteur du tableau (tbAiOpenPlayer) : la vraie règle graduée, l'équerre, le compas, pas à pas, avec la
   barre de lecture habituelle.

   Éléments de la figure (coordonnées SVG, y vers le bas ; angles en degrés, sens trigonométrique) :
     { seg: [a, b], c, ep, tirets }   { arc: [o, r, de, a], c }   { cercle: [o, r], c, tirets }
     { pt: p, nom, dx, dy, c }        { txt: [x, y], t, c, fs, a } { codage: [a, b], n }   { droit: [a, b, c] }   { svg: '…' }
   ============================================================ */
(() => {
const NS = 'http://www.w3.org/2000/svg';
const K = '#1F3A5C';
const f1 = v => (Math.round(v * 10) / 10).toString();
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const pt = (o, r, a) => [o[0] + r * Math.cos(a * Math.PI / 180), o[1] - r * Math.sin(a * Math.PI / 180)];
function el(e){
  if(e.seg){ const [a, b] = e.seg; return `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="${e.c || K}" stroke-width="${e.ep || 2}" stroke-linecap="round"${e.tirets ? ' stroke-dasharray="5 4"' : ''}/>`; }
  if(e.arc){ const [o, r, a1, a2] = e.arc, u = pt(o, r, a1), v = pt(o, r, a2), g = (a2 - a1) > 180 ? 1 : 0;
    return `<path d="M${f1(u[0])},${f1(u[1])} A${r},${r} 0 ${g} 0 ${f1(v[0])},${f1(v[1])}" fill="none" stroke="${e.c || '#2EA8C9'}" stroke-width="${e.ep || 1.5}" data-compas="${f1(o[0])},${f1(o[1])}"/>`; }
  if(e.cercle){ const [o, r] = e.cercle, u = pt(o, r, 0), v = pt(o, r, 180);
    // en deux demi-arcs (un cercle se trace comme un arc : le compas fait le tour)
    return `<path d="M${f1(u[0])},${f1(u[1])} A${r},${r} 0 1 0 ${f1(v[0])},${f1(v[1])} A${r},${r} 0 1 0 ${f1(u[0])},${f1(u[1])}" fill="none" stroke="${e.c || '#2EA8C9'}" stroke-width="${e.ep || 1.8}"${e.tirets ? ' stroke-dasharray="5 4"' : ''} data-compas="${f1(o[0])},${f1(o[1])}"/>`; }
  if(e.pt){ const p = e.pt, c = e.c || K;
    return `<path d="M${f1(p[0] - 4)},${f1(p[1] - 4)} L${f1(p[0] + 4)},${f1(p[1] + 4)} M${f1(p[0] - 4)},${f1(p[1] + 4)} L${f1(p[0] + 4)},${f1(p[1] - 4)}" stroke="${c}" stroke-width="2"/>`
      + (e.nom ? txt(p[0] + (e.dx == null ? 10 : e.dx), p[1] + (e.dy == null ? -7 : e.dy), e.nom, c, 13) : ''); }
  if(e.txt) return txt(e.txt[0], e.txt[1], e.t, e.c, e.fs, e.a);
  if(e.codage){ const [a, b] = e.codage, n = e.n || 1, m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]), u = [(b[0] - a[0]) / l, (b[1] - a[1]) / l], v = [-u[1] * 5, u[0] * 5];
    let s = ''; for(let i = 0; i < n; i++){ const d = (i - (n - 1) / 2) * 4; s += el({ seg: [[m[0] + u[0] * d - v[0], m[1] + u[1] * d - v[1]], [m[0] + u[0] * d + v[0], m[1] + u[1] * d + v[1]]], c: '#E35D3A', ep: 1.6 }); } return s; }
  if(e.droit){ const [a, b, c] = e.droit, n = (p, q) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [(q[0] - p[0]) / l * 8, (q[1] - p[1]) / l * 8]; }, u = n(b, a), w = n(b, c);
    return `<polyline points="${f1(b[0] + u[0])},${f1(b[1] + u[1])} ${f1(b[0] + u[0] + w[0])},${f1(b[1] + u[1] + w[1])} ${f1(b[0] + w[0])},${f1(b[1] + w[1])}" fill="none" stroke="${e.c || '#E35D3A'}" stroke-width="1.4"/>`; }
  if(e.svg) return e.svg;
  return '';
}
function txt(x, y, t, c, fs, a){ return `<text x="${f1(x)}" y="${f1(y)}" font-size="${fs || 11}" text-anchor="${a || 'middle'}" fill="${c || K}" font-family="Space Grotesk" font-weight="700">${t}</text>`; }
window.plConstruction = function(o){
  const et = o.etapes || [];
  const g = (n, l) => `<g data-etape="${n}">${(l || []).map(el).join('')}</g>`;
  const prog = o.programme ? ` data-tbprog="${esc(JSON.stringify({ program: o.programme, tools: o.outils || ['regle', 'equerre', 'compas', 'rapporteur'] }))}"` : '';
  return `<svg class="pl-libre pl-constr" viewBox="0 0 ${o.w} ${o.h}" style="width:${o.px || o.w}px;max-width:100%;display:inline-block;vertical-align:middle;"${prog}>`
    + g(0, o.depart) + et.map((e, i) => g(i + 1, e.el)).join('') + '</svg>';
};

/* ---------- Bouton « Voir la construction aux instruments » (écran seulement) ---------- */
const CSS = `.pl-constr-bar{ display:flex; justify-content:center; margin:6px auto 2px; }
.pl-constr-bar button{ display:inline-flex; align-items:center; gap:6px; border:1px solid #1F3A5C !important; background:#1F3A5C !important; color:#fff !important; opacity:1 !important; border-radius:999px; padding:4px 14px; font:inherit; font-size:.86rem; font-weight:700; cursor:pointer; }
.pl-constr-bar button:hover{ background:#2C4E75 !important; }
@media print{ .pl-constr-bar{ display:none !important; } }`;
function css(doc){ if(doc.getElementById('pl-constr-css')) return; const s = doc.createElement('style'); s.id = 'pl-constr-css'; s.textContent = CSS; (doc.head || doc.body).appendChild(s); }
function preparer(svg){
  if(svg.hasAttribute('data-constr-pret')) return; svg.setAttribute('data-constr-pret', '1');
  if(svg.closest('.pl-planche, .pl-page')) return; // feuille imprimée ou Manuel : la figure finale seule
  const doc = svg.ownerDocument, win = doc.defaultView || window;
  if(typeof win.tbAiOpenPlayer !== 'function' || !doc.getElementById('tbAiPlayerOverlay')) return; // lecteur du tableau absent (autre fenêtre)
  let d; try{ d = JSON.parse(svg.getAttribute('data-tbprog')); }catch(e){ return; } if(!d || !Array.isArray(d.program)) return;
  css(doc);
  const bar = doc.createElement('div'); bar.className = 'pl-constr-bar';
  bar.innerHTML = '<button type="button" title="La construction pas à pas, avec la règle graduée, l\'équerre et le compas du tableau"><span class="gicon">play_circle</span> Voir la construction aux instruments</button>';
  const ancre = svg.parentElement && svg.parentElement.classList.contains('cm-fig-d') ? svg.parentElement : svg;
  ancre.insertAdjacentElement('afterend', bar);
  bar.querySelector('button').addEventListener('click', ev => {
    ev.stopPropagation();
    // au-dessus de la projection d'une planche (plein écran)
    const ov = doc.getElementById('tbAiPlayerOverlay'); if(ov) ov.style.zIndex = svg.closest('#plProj') ? '9700' : '300';
    win.tbAiOpenPlayer(d);
  });
}
window.plConstrPreparer = preparer;
// Suivi d'un document : toute figure de construction affichée reçoit son bouton.
window.plConstrSuivre = function(doc){
  doc = doc || document; if(!doc.body || doc.__constrSuivi) return; doc.__constrSuivi = true;
  let prevu = false; const scan = () => { prevu = false; doc.querySelectorAll('svg[data-tbprog]:not([data-constr-pret])').forEach(s => { try{ preparer(s); }catch(e){} }); };
  new (doc.defaultView || window).MutationObserver(() => { if(!prevu){ prevu = true; (doc.defaultView || window).setTimeout(scan, 60); } }).observe(doc.body, { childList: true, subtree: true });
  scan();
};
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => plConstrSuivre(document)); else plConstrSuivre(document);
})();

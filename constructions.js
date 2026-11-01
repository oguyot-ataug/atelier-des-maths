/* ============================================================
   Corrections animées des constructions (règle, équerre, compas)
   -- demandé le 01/11/2026 (relecture 6e-G1-P4-E5 : « Est-il possible d'y mettre une correction animée avec notre
   outil ? », puis « Oui, mets en place la correction animée »).

   plConstruction({ w, h, px, depart: [éléments], etapes: [{ texte, el: [éléments] }] }) renvoie la figure FINALE
   (papier, Manuel, impressions : rien ne change). À l'écran (vignettes, correction, projection), une barre
   « Voir la construction » est ajoutée sous la figure : les étapes se tracent l'une après l'autre, avec leur phrase ;
   le compas apparaît pour tracer les arcs et les cercles ; ◀ ▶ pour avancer pas à pas (projection en classe).

   Éléments (coordonnées SVG, y vers le bas ; angles en degrés, sens trigonométrique, comme sur une feuille) :
     { seg: [a, b], c, ep, tirets }        segment
     { arc: [o, r, de, a], c }             arc de cercle de centre o (tracé au compas)
     { cercle: [o, r], c, tirets }         cercle (tracé au compas)
     { pt: p, nom, dx, dy, c }             point (croix ; geo-points.js la change en trait ou l'efface selon la figure)
     { txt: [x, y], t, c, fs, a }          texte
     { codage: [a, b], n }                 codage de longueur au milieu de [ab] (n traits)
     { droit: [a, b, c] }                  angle droit en b
     { svg: '…' }                          dessin libre
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
  return `<svg class="pl-libre pl-constr" viewBox="0 0 ${o.w} ${o.h}" style="width:${o.px || o.w}px;max-width:100%;display:inline-block;vertical-align:middle;" data-constr="${esc(JSON.stringify(et.map(e => e.texte || '')))}">`
    + g(0, o.depart) + et.map((e, i) => g(i + 1, e.el)).join('') + '</svg>';
};

/* ---------- Lecteur (écran seulement) ---------- */
const CSS = `.pl-constr-bar{ display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:6px; margin:6px auto 2px; max-width:440px; font-size:.86rem; }
.pl-constr-bar button{ border:1px solid #C9DCEB !important; background:#fff !important; color:#1F3A5C !important; opacity:1 !important; border-radius:999px; padding:3px 10px; font:inherit; font-weight:700; cursor:pointer; }
.pl-constr-bar button:hover{ background:#EAF4FB !important; } .pl-constr-bar button.pl-constr-jouer{ background:#1F3A5C !important; color:#fff !important; border-color:#1F3A5C !important; }
.pl-constr-txt{ flex-basis:100%; text-align:center; color:#1F3A5C; min-height:1.3em; line-height:1.35; }
.pl-constr-txt:empty{ display:none; }
@media print{ .pl-constr-bar{ display:none !important; } }`;
function css(doc){ if(doc.getElementById('pl-constr-css')) return; const s = doc.createElement('style'); s.id = 'pl-constr-css'; s.textContent = CSS; (doc.head || doc.body).appendChild(s); }
function preparer(svg){
  if(svg.hasAttribute('data-constr-pret')) return; svg.setAttribute('data-constr-pret', '1');
  if(svg.closest('.pl-planche, .pl-page')) return; // feuille imprimée ou Manuel : la figure finale seule
  let T; try{ T = JSON.parse(svg.getAttribute('data-constr')); }catch(e){ return; } if(!T || !T.length) return;
  const doc = svg.ownerDocument, win = doc.defaultView || window, n = T.length; css(doc);
  const bar = doc.createElement('div'); bar.className = 'pl-constr-bar';
  bar.innerHTML = '<button type="button" class="pl-constr-jouer">▶ Voir la construction</button><button type="button" class="pl-constr-prec" title="Étape précédente" aria-label="Étape précédente">◀</button><button type="button" class="pl-constr-suiv" title="Étape suivante" aria-label="Étape suivante">▶</button><span class="pl-constr-txt"></span>';
  // la barre sous la figure (hors d'un petit bloc flottant)
  const ancre = svg.parentElement && svg.parentElement.classList.contains('cm-fig-d') ? svg.parentElement : svg;
  ancre.insertAdjacentElement('afterend', bar);
  const jouer = bar.querySelector('.pl-constr-jouer'), txt = bar.querySelector('.pl-constr-txt');
  let k = n, anim = null, auto = false, compas = null;
  const groupes = () => [...svg.querySelectorAll('g[data-etape]')];
  const traits = g => [...g.querySelectorAll('line, path, circle, ellipse, polyline, polygon, text')];
  function remettre(e){ e.style.strokeDasharray = ''; e.style.strokeDashoffset = ''; e.style.opacity = ''; }
  function legende(){ txt.textContent = k === 0 ? 'Au départ.' : `Étape ${k} sur ${n} : ${T[k - 1]}`; }
  function boutons(){ jouer.textContent = auto ? '⏸ Pause' : (k >= n && !anim ? '↻ Revoir la construction' : '▶ Voir la construction'); }
  function arreter(){ if(anim){ win.cancelAnimationFrame(anim); anim = null; } if(compas){ compas.remove(); compas = null; } }
  // état fixe : étapes ≤ k visibles, les suivantes cachées
  function poser(){ arreter(); groupes().forEach(g => { const e = +g.getAttribute('data-etape'); g.style.visibility = e <= k ? '' : 'hidden'; traits(g).forEach(remettre); }); legende(); boutons(); }
  function dessinerCompas(o, p){
    if(!compas){ compas = doc.createElementNS(NS, 'g'); compas.setAttribute('data-geo-garde', '1'); compas.setAttribute('pointer-events', 'none'); svg.appendChild(compas); }
    const d = Math.hypot(p[0] - o[0], p[1] - o[1]), m = [(o[0] + p[0]) / 2, (o[1] + p[1]) / 2], l = Math.max(d * .78, d / 2 + 14), hh = Math.sqrt(Math.max(l * l - d * d / 4, 0));
    let u = d ? [-(p[1] - o[1]) / d, (p[0] - o[0]) / d] : [0, -1]; if(u[1] > 0) u = [-u[0], -u[1]]; // la charnière vers le haut
    const h = [m[0] + u[0] * hh, m[1] + u[1] * hh];
    compas.innerHTML = `<line x1="${o[0]}" y1="${o[1]}" x2="${h[0]}" y2="${h[1]}" stroke="#5B6472" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>`
      + `<line x1="${h[0]}" y1="${h[1]}" x2="${p[0]}" y2="${p[1]}" stroke="#5B6472" stroke-width="2.6" stroke-linecap="round" opacity=".85"/>`
      + `<circle cx="${h[0]}" cy="${h[1]}" r="3.4" fill="#5B6472"/><circle cx="${o[0]}" cy="${o[1]}" r="1.8" fill="#1F3A5C"/><circle cx="${p[0]}" cy="${p[1]}" r="2.6" fill="#E35D3A"/>`;
  }
  // tracer l'étape k (les précédentes visibles)
  function tracer(fin){
    arreter(); const g = groupes().find(x => +x.getAttribute('data-etape') === k); groupes().forEach(x => { const e = +x.getAttribute('data-etape'); x.style.visibility = e <= k ? '' : 'hidden'; if(e < k) traits(x).forEach(remettre); });
    legende(); boutons(); if(!g){ if(fin) fin(); return; }
    const L = traits(g).map(e => { let lg = 0; try{ lg = e.tagName !== 'text' && e.getTotalLength ? e.getTotalLength() : 0; }catch(err){}
      const pointille = (e.getAttribute('stroke-dasharray') || '') !== '', petit = lg < 26; return { e, lg, mode: e.tagName === 'text' || pointille || petit || !lg ? 'fondu' : 'trait', o: e.getAttribute('data-compas') }; });
    const longs = L.filter(x => x.mode === 'trait'), duree = Math.max(1300, longs.reduce((z, x) => z + (x.o ? 1500 : 650), 0)), t0 = win.performance.now();
    L.forEach(x => { if(x.mode === 'trait'){ x.e.style.strokeDasharray = x.lg; x.e.style.strokeDashoffset = x.lg; } else x.e.style.opacity = 0; });
    const pas = now => {
      const t = Math.min(1, (now - t0) / duree);
      // les traits l'un après l'autre ; points et textes à la fin
      const part = longs.length ? .82 / longs.length : 0;
      longs.forEach((x, i) => { const p = Math.max(0, Math.min(1, (t - i * part) / part)); x.e.style.strokeDashoffset = x.lg * (1 - p);
        if(x.o && p > 0 && p < 1){ try{ const q = x.e.getPointAtLength(x.lg * p), o = x.o.split(',').map(Number); dessinerCompas(o, [q.x, q.y]); }catch(err){} } });
      if(!longs.some((x, i) => x.o && t > i * part && t < (i + 1) * part) && compas){ compas.remove(); compas = null; }
      const tf = longs.length ? Math.max(0, (t - .8) / .2) : t; L.filter(x => x.mode === 'fondu').forEach(x => { x.e.style.opacity = tf; });
      if(t < 1){ anim = win.requestAnimationFrame(pas); return; }
      anim = null; if(compas){ compas.remove(); compas = null; } L.forEach(x => remettre(x.e)); boutons(); if(fin) fin();
    };
    anim = win.requestAnimationFrame(pas);
  }
  function suite(){ if(!auto) return; if(k >= n){ auto = false; boutons(); return; } win.setTimeout(() => { if(!auto) return; k++; tracer(suite); }, 700); }
  jouer.addEventListener('click', () => {
    if(auto){ auto = false; boutons(); return; }
    if(k >= n){ k = 0; poser(); }
    auto = true; boutons(); if(k === 0) suite(); else tracer(suite);
  });
  bar.querySelector('.pl-constr-suiv').addEventListener('click', () => { auto = false; if(k >= n && !anim){ k = 0; poser(); return; } if(anim){ poser(); } if(k < n){ k++; tracer(); } });
  bar.querySelector('.pl-constr-prec').addEventListener('click', () => { auto = false; if(k > 0) k--; poser(); });
  txt.textContent = '';
}
window.plConstrPreparer = preparer;
// Suivi d'un document (fenêtre principale, fenêtre de projection) : toute figure de construction affichée reçoit sa barre.
window.plConstrSuivre = function(doc){
  doc = doc || document; if(!doc.body || doc.__constrSuivi) return; doc.__constrSuivi = true;
  let prevu = false; const scan = () => { prevu = false; doc.querySelectorAll('svg[data-constr]:not([data-constr-pret])').forEach(s => { try{ preparer(s); }catch(e){} }); };
  new (doc.defaultView || window).MutationObserver(() => { if(!prevu){ prevu = true; (doc.defaultView || window).setTimeout(scan, 60); } }).observe(doc.body, { childList: true, subtree: true });
  scan();
};
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => plConstrSuivre(document)); else plConstrSuivre(document);
})();

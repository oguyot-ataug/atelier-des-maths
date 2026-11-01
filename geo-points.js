/* ============================================================
   Marques des points dans les figures (toutes les figures SVG du site)
   Demandé le 01/11/2026 : « ne pas oublier les règles de construction et de représentation des points :
   point isolé : une croix ; point sur une droite, un segment, une demi-droite : un petit trait perpendiculaire ;
   point d'intersection : rien. Vérifie l'ensemble des figures tracées. »

   Plutôt que de reprendre chaque figure à la main, on analyse la figure une fois dessinée : chaque croix (deux petits
   traits qui se croisent en leur milieu) est comparée aux lignes de la figure qui passent par son centre.
     - aucune ligne : la croix reste ;
     - une seule ligne (droite, segment, demi-droite, cercle, arc) : la croix devient un petit trait perpendiculaire ;
     - deux lignes ou plus (intersection, sommet d'un polygone…) : la croix est retirée, le nom du point reste.
   Le quadrillage (traits fins et clairs) ne compte pas comme une ligne de la figure.
   geoPoints(racine) traite toutes les figures sous racine (une seule fois chacune) ; geoPointsAnalyse(svg) renvoie le
   diagnostic sans rien changer (utilisé par l'outil de contrôle).
   ============================================================ */
(function(){
  const NS = 'http://www.w3.org/2000/svg';
  const gcs = el => (el.ownerDocument.defaultView || window).getComputedStyle(el); // aussi dans une fenêtre d'impression
  const rgb = c => { const m = String(c || '').match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/); return m ? [+m[1], +m[2], +m[3], m[4] == null ? 1 : +m[4]] : null; };
  // Trait de quadrillage, de cadre ou de décor : clair, ou très fin, ou transparent.
  function decor(el){
    const cs = gcs(el), s = cs.stroke, c = rgb(s), w = parseFloat(cs.strokeWidth) || 0, op = (+cs.opacity || 1) * (+cs.strokeOpacity || 1);
    if(!c || s === 'none' || w === 0 || op < .35 || c[3] < .35) return true;
    const lum = .3 * c[0] + .59 * c[1] + .11 * c[2];
    return lum > 200 || (w <= 1.05 && lum > 150);
  }
  // Matrice élément -> repère du svg.
  function mat(svg, el){ try{ const a = svg.getScreenCTM(), b = el.getScreenCTM(); if(!a || !b) return null; return a.inverse().multiply(b); }catch(e){ return null; } }
  const app = (m, x, y) => m ? [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f] : [x, y];
  // Échelle : unités du svg par pixel affiché (les tolérances sont en pixels d'écran ramenés au svg).
  function echelle(svg){ const m = svg.getScreenCTM(); return m ? 1 / Math.max(1e-6, Math.hypot(m.a, m.b)) : 1; }
  // Sous-chemins droits d'un « d » simple (M, L, H, V, Z, absolus ou relatifs) ; null s'il y a des courbes.
  function sousChemins(d){
    const t = String(d || '').match(/[MLHVZmlhvz]|[-+]?(?:\d*\.\d+|\d+)(?:e[-+]?\d+)?/g); if(!t || /[CSQTAcsqta]/.test(d)) return null;
    const res = []; let cur = null, x = 0, y = 0, x0 = 0, y0 = 0, cmd = null, i = 0;
    const num = () => +t[i++];
    while(i < t.length){
      if(/[A-Za-z]/.test(t[i])) cmd = t[i++];
      if(cmd === 'M' || cmd === 'm'){ const a = num(), b = num(); x = cmd === 'm' ? x + a : a; y = cmd === 'm' ? y + b : b; x0 = x; y0 = y; cur = [[x, y]]; res.push(cur); cmd = cmd === 'm' ? 'l' : 'L'; }
      else if(cmd === 'L' || cmd === 'l'){ const a = num(), b = num(); x = cmd === 'l' ? x + a : a; y = cmd === 'l' ? y + b : b; cur && cur.push([x, y]); }
      else if(cmd === 'H' || cmd === 'h'){ const a = num(); x = cmd === 'h' ? x + a : a; cur && cur.push([x, y]); }
      else if(cmd === 'V' || cmd === 'v'){ const a = num(); y = cmd === 'v' ? y + a : a; cur && cur.push([x, y]); }
      else if(cmd === 'Z' || cmd === 'z'){ cur && cur.push([x0, y0]); x = x0; y = y0; cmd = null; }
      else i++;
    }
    return res;
  }
  // Les croix : un chemin de deux petits traits, ou deux <line> courtes, qui se coupent en leur milieu.
  function trouverCroix(svg, k){
    const croix = [], petits = [];
    svg.querySelectorAll('path, line').forEach(el => {
      if(el.closest('defs, marker, pattern, clipPath, mask, symbol') || el.closest('[data-geo-garde]')) return;
      const m = mat(svg, el); let traits = [];
      if(el.tagName === 'line') traits = [[[+el.getAttribute('x1'), +el.getAttribute('y1')], [+el.getAttribute('x2'), +el.getAttribute('y2')]]];
      else { const sc = sousChemins(el.getAttribute('d')); if(!sc || sc.length !== 2 || sc.some(s => s.length !== 2)) return; traits = sc; }
      traits = traits.map(([a, b]) => [app(m, ...a), app(m, ...b)]);
      const L = s => Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]) / k;
      if(!traits.every(s => L(s) >= 4.5 && L(s) <= 18)) return;
      if(el.tagName === 'path'){ const c = croise(traits[0], traits[1], k); if(c) croix.push({ els: [el], c, traits }); }
      else petits.push({ el, s: traits[0] });
    });
    // deux <line> courtes qui se croisent en leur milieu
    const pris = new Set();
    for(let i = 0; i < petits.length; i++) for(let j = i + 1; j < petits.length; j++){
      if(pris.has(i) || pris.has(j)) continue; const c = croise(petits[i].s, petits[j].s, k);
      if(c && gcs(petits[i].el).stroke === gcs(petits[j].el).stroke){ croix.push({ els: [petits[i].el, petits[j].el], c, traits: [petits[i].s, petits[j].s] }); pris.add(i); pris.add(j); }
    }
    return croix;
  }
  function croise(s1, s2, k){
    const m1 = [(s1[0][0] + s1[1][0]) / 2, (s1[0][1] + s1[1][1]) / 2], m2 = [(s2[0][0] + s2[1][0]) / 2, (s2[0][1] + s2[1][1]) / 2];
    if(Math.hypot(m1[0] - m2[0], m1[1] - m2[1]) > 1.2 * k) return null;
    const u = [s1[1][0] - s1[0][0], s1[1][1] - s1[0][1]], v = [s2[1][0] - s2[0][0], s2[1][1] - s2[0][1]];
    const cos = Math.abs(u[0] * v[0] + u[1] * v[1]) / (Math.hypot(...u) * Math.hypot(...v));
    if(cos > .72) return null; // pas un « x » ni un « + »
    return [(m1[0] + m2[0]) / 2, (m1[1] + m2[1]) / 2];
  }
  // Lignes de la figure : chaque élément tracé, échantillonné en ligne brisée (repère du svg).
  function lignes(svg, exclus, k){
    const out = [];
    svg.querySelectorAll('line, polyline, polygon, path, circle, ellipse, rect').forEach(el => {
      if(exclus.has(el) || el.closest('defs, marker, pattern, clipPath, mask, symbol, text')) return;
      if(decor(el)) return;
      const m = mat(svg, el); if(!m) return;
      let pts = [];
      try{
        if(el.tagName === 'line') pts = [[[+el.getAttribute('x1'), +el.getAttribute('y1')], [+el.getAttribute('x2'), +el.getAttribute('y2')]]];
        else if(el.tagName === 'polyline' || el.tagName === 'polygon'){ const p = (el.getAttribute('points') || '').trim().split(/[\s,]+/).map(Number), l = []; for(let i = 0; i + 1 < p.length; i += 2) l.push([p[i], p[i + 1]]); if(el.tagName === 'polygon' && l.length) l.push(l[0]); pts = [l]; }
        else if(el.tagName === 'path'){ const sc = sousChemins(el.getAttribute('d')); if(sc) pts = sc; else { // courbes : échantillonnage
            const T = el.getTotalLength(), n = Math.min(400, Math.max(8, Math.ceil(T / (2 * k)))); let l = [], prec = null;
            for(let i = 0; i <= n; i++){ const q = el.getPointAtLength(T * i / n), p = [q.x, q.y]; if(prec && Math.hypot(p[0] - prec[0], p[1] - prec[1]) > 4 * T / n + 1){ pts.push(l); l = []; } l.push(p); prec = p; } pts.push(l); } }
        else if(el.tagName === 'circle' || el.tagName === 'ellipse'){ const cx = +el.getAttribute('cx'), cy = +el.getAttribute('cy'), rx = +(el.getAttribute('r') || el.getAttribute('rx')), ry = +(el.getAttribute('r') || el.getAttribute('ry'));
          if(rx * Math.max(1, 1) / k < 6) return; // petit disque (point dessiné en rond) : ce n'est pas une ligne
          const l = []; for(let i = 0; i <= 96; i++){ const a = i / 96 * 2 * Math.PI; l.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); } pts = [l]; }
        else if(el.tagName === 'rect'){ const x = +el.getAttribute('x') || 0, y = +el.getAttribute('y') || 0, w = +el.getAttribute('width'), h = +el.getAttribute('height'); if(!(w > 0 && h > 0)) return; pts = [[[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]]; }
      }catch(e){ return; }
      pts.forEach(l => { if(l.length > 1) out.push({ el, l: l.map(p => app(m, p[0], p[1])) }); });
    });
    return out;
  }
  // Directions des lignes qui passent par c (une direction par ligne ; une ligne qui s'arrête en c compte aussi).
  function supports(c, L, k){
    const tol = 1.6 * k, dirs = [];
    L.forEach(({ l }) => {
      for(let i = 0; i + 1 < l.length; i++){
        const a = l[i], b = l[i + 1], ab = [b[0] - a[0], b[1] - a[1]], n2 = ab[0] * ab[0] + ab[1] * ab[1]; if(n2 < 1e-9) continue;
        let t = ((c[0] - a[0]) * ab[0] + (c[1] - a[1]) * ab[1]) / n2; t = Math.max(0, Math.min(1, t));
        const p = [a[0] + t * ab[0], a[1] + t * ab[1]];
        if(Math.hypot(p[0] - c[0], p[1] - c[1]) <= tol){ const ang = Math.atan2(ab[1], ab[0]); dirs.push({ ang, bout: (t < 1e-3 && i === 0) || (t > 1 - 1e-3 && i + 2 === l.length) }); }
      }
    });
    // directions distinctes (à 12° près, sans orientation)
    const d = [];
    dirs.forEach(x => { if(!d.some(y => { let e = Math.abs(x.ang - y.ang) % Math.PI; e = Math.min(e, Math.PI - e); return e < .21; })) d.push(x); });
    return d;
  }
  function analyse(svg){
    const k = echelle(svg), cr = trouverCroix(svg, k), exclus = new Set(cr.flatMap(x => x.els)), L = lignes(svg, exclus, k);
    return cr.map(x => { const d = supports(x.c, L, k); return Object.assign(x, { n: d.length, dirs: d, k }); });
  }
  function corriger(svg){
    if(svg.getAttribute('data-geo-points') || !svg.isConnected) return 0;
    const r = analyse(svg); let n = 0;
    r.forEach(x => {
      if(x.n === 0) return;
      const el0 = x.els[0], cs = gcs(el0);
      if(x.n === 1){ // petit trait perpendiculaire à la ligne, de la longueur d'une branche de la croix
        const a = x.dirs[0].ang + Math.PI / 2, h = Math.max(...x.traits.map(s => Math.hypot(s[1][0] - s[0][0], s[1][1] - s[0][1]))) / 2;
        const t = el0.ownerDocument.createElementNS(NS, 'line'), m = mat(svg, el0.parentNode.tagName ? el0.parentNode : svg);
        // coordonnées dans le repère du parent de la croix
        let inv = null; try{ inv = m && m.inverse(); }catch(e){}
        const p1 = app(inv, x.c[0] - Math.cos(a) * h, x.c[1] - Math.sin(a) * h), p2 = app(inv, x.c[0] + Math.cos(a) * h, x.c[1] + Math.sin(a) * h);
        t.setAttribute('x1', p1[0].toFixed(2)); t.setAttribute('y1', p1[1].toFixed(2)); t.setAttribute('x2', p2[0].toFixed(2)); t.setAttribute('y2', p2[1].toFixed(2));
        t.setAttribute('stroke', cs.stroke); t.setAttribute('stroke-width', el0.getAttribute('stroke-width') || cs.strokeWidth); t.setAttribute('stroke-linecap', 'round'); t.setAttribute('data-geo-trait', '1');
        el0.parentNode.insertBefore(t, el0);
      }
      x.els.forEach(e => e.remove()); n++;
    });
    try{ n += codages(svg); }catch(e){}
    svg.setAttribute('data-geo-points', '1');
    return n;
  }
  /* Codages de longueur (demandé le 01/11/2026 : « les faire inclinés et assez petits pour ne pas les confondre avec des
     points ») : un petit trait (ou deux, trois traits parallèles) qui coupe une ligne en son milieu devient un trait court
     (7 px) incliné à 60° sur la ligne. Ne sont pas des codages : les traits des points (nom de point à côté), les
     graduations (une ligne qui en porte à son extrémité, plus de trois traits serrés, ou au moins cinq groupes de traits). */
  function codages(svg){
    const k = echelle(svg), cand = [];
    svg.querySelectorAll('path, line').forEach(el => {
      if(el.closest('defs, marker, pattern, clipPath, mask, symbol, [data-geo-garde]') || el.hasAttribute('data-geo-trait') || decor(el)) return;
      let tr;
      if(el.tagName === 'line') tr = [[[+el.getAttribute('x1'), +el.getAttribute('y1')], [+el.getAttribute('x2'), +el.getAttribute('y2')]]];
      else { const sc = sousChemins(el.getAttribute('d')); if(!sc || !sc.length || sc.length > 3 || sc.some(q => q.length !== 2)) return; tr = sc; }
      const m = mat(svg, el); if(!m) return;
      const T = tr.map(([a, b]) => [app(m, ...a), app(m, ...b)]), lg = q => Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1]) / k;
      if(!T.every(q => lg(q) >= 5 && lg(q) <= 20)) return;
      if(T.length > 1){ const u = T[0], du = [u[1][0] - u[0][0], u[1][1] - u[0][1]]; if(!T.every(q => { const d = [q[1][0] - q[0][0], q[1][1] - q[0][1]]; return Math.abs(du[0] * d[1] - du[1] * d[0]) / (Math.hypot(...du) * Math.hypot(...d)) < .12; })) return; }
      cand.push({ el, T, m });
    });
    if(!cand.length) return 0;
    const L = lignes(svg, new Set(cand.map(c => c.el)), k), tol = 1.6 * k;
    const textes = [...svg.querySelectorAll('text')].map(t => { try{ const b = t.getBBox(), m = mat(svg, t); return app(m, b.x + b.width / 2, b.y + b.height / 2); }catch(e){ return null; } }).filter(Boolean);
    const traits = [];
    cand.forEach(c => c.T.forEach((q, i) => {
      const mid = [(q[0][0] + q[1][0]) / 2, (q[0][1] + q[1][1]) / 2], d = [q[1][0] - q[0][0], q[1][1] - q[0][1]];
      // ligne coupée en son milieu, presque perpendiculairement
      let sup = null;
      L.forEach((s, si) => { for(let j = 0; j + 1 < s.l.length && !sup; j++){ const a = s.l[j], b = s.l[j + 1], ab = [b[0] - a[0], b[1] - a[1]], n2 = ab[0] * ab[0] + ab[1] * ab[1]; if(n2 < 1e-9) continue;
        let t = ((mid[0] - a[0]) * ab[0] + (mid[1] - a[1]) * ab[1]) / n2; if(t < -.01 || t > 1.01) continue;
        const p = [a[0] + t * ab[0], a[1] + t * ab[1]]; if(Math.hypot(p[0] - mid[0], p[1] - mid[1]) > tol) continue;
        const sin = Math.abs(ab[0] * d[1] - ab[1] * d[0]) / (Math.sqrt(n2) * Math.hypot(...d)); if(sin < .82) continue;
        const bout = (j === 0 && t < .02 * Math.sqrt(1)) || (j + 2 === s.l.length && t > .98);
        const pres = Math.min(Math.hypot(mid[0] - s.l[0][0], mid[1] - s.l[0][1]), Math.hypot(mid[0] - s.l[s.l.length - 1][0], mid[1] - s.l[s.l.length - 1][1])) < 2.5 * k;
        sup = { si, ang: Math.atan2(ab[1], ab[0]), bout: pres }; } });
      if(sup) traits.push({ c, i, mid, sup });
    }));
    // graduations : ligne qui porte un trait à son extrémité, ou au moins quatre traits isolés
    const parLigne = new Map(); traits.forEach(t => { if(!parLigne.has(t.sup.si)) parLigne.set(t.sup.si, []); parLigne.get(t.sup.si).push(t); });
    let n = 0;
    parLigne.forEach(l => {
      if(l.some(t => t.sup.bout)) return;
      // groupes de traits voisins (moins de 8 px) : un codage a 1 à 3 traits ; une graduation, des traits réguliers en nombre
      const groupes = []; l.forEach(t => { const g = groupes.find(g => g.some(u => Math.hypot(u.mid[0] - t.mid[0], u.mid[1] - t.mid[1]) < 8 * k)); if(g) g.push(t); else groupes.push([t]); });
      if(groupes.some(g => g.length > 3) || groupes.length >= 5) return;
      // un trait accompagné d'une étiquette (nombre, heure, nom de point) : graduation ou point, pas un codage
      if(l.some(t => textes.some(p => Math.hypot(p[0] - t.mid[0], p[1] - t.mid[1]) < 22 * k))) return;
      l.forEach(t => {
        if(textes.some(p => Math.hypot(p[0] - t.mid[0], p[1] - t.mid[1]) < 13 * k)) return; // trait d'un point nommé
        let th = t.sup.ang; if(th > Math.PI / 2) th -= Math.PI; if(th <= -Math.PI / 2) th += Math.PI;
        const a = th - Math.PI / 3, h = 3.6 * k, p1 = [t.mid[0] - Math.cos(a) * h, t.mid[1] - Math.sin(a) * h], p2 = [t.mid[0] + Math.cos(a) * h, t.mid[1] + Math.sin(a) * h];
        t.c.T[t.i] = [p1, p2]; t.c.fait = true; n++;
      });
    });
    cand.filter(c => c.fait).forEach(c => { let inv = null; try{ inv = c.m.inverse(); }catch(e){ return; }
      const loc = c.T.map(([a, b]) => [app(inv, ...a), app(inv, ...b)]);
      if(c.el.tagName === 'line'){ const [[x1, y1], [x2, y2]] = loc[0]; c.el.setAttribute('x1', x1.toFixed(2)); c.el.setAttribute('y1', y1.toFixed(2)); c.el.setAttribute('x2', x2.toFixed(2)); c.el.setAttribute('y2', y2.toFixed(2)); }
      else c.el.setAttribute('d', loc.map(([a, b]) => `M${a[0].toFixed(2)},${a[1].toFixed(2)} L${b[0].toFixed(2)},${b[1].toFixed(2)}`).join(' '));
      c.el.setAttribute('stroke-linecap', 'round'); c.el.setAttribute('data-geo-codage', '1'); });
    return n;
  }
  window.geoPointsAnalyse = analyse;
  window.geoPoints = function(racine){ let n = 0; (racine || document).querySelectorAll('svg:not([data-geo-points])').forEach(s => { try{ n += corriger(s); }catch(e){} }); return n; };
  // Suivi d'un document : toute figure ajoutée (vignette, planche, écran, cours, image d'une animation…) est traitée
  // juste après son affichage. Une figure masquée (sans taille) attend d'être affichée.
  window.geoPointsSuivre = function(doc){
    doc = doc || document; if(!doc.body || doc.__geoSuivi) return; doc.__geoSuivi = true;
    const vue = doc.defaultView || window; let prevu = false;
    const passe = () => { prevu = false; doc.querySelectorAll('svg:not([data-geo-points])').forEach(s => { const r = s.getBoundingClientRect(); if(!r.width || !r.height) return; try{ corriger(s); }catch(e){} }); };
    const plus = () => { if(!prevu){ prevu = true; vue.requestAnimationFrame(passe); } };
    new vue.MutationObserver(plus).observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
    plus();
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => geoPointsSuivre(document)); else geoPointsSuivre(document);
})();

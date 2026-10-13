/* =====================================================================
   fractions-figures.js -- Figures partagées en parts pour les fractions (manuels et questionnaires)

   Demandé (exemple d'un manuel de 6e) : « Reconnaître les parts coloriées et remplir les parts… Il faut
   ce genre d'exercices en nombre. Dans la création de questionnaires, il faut aussi ce genre
   d'exercices. »

   Une figure : { forme, … } parmi
     - disque   { n }          : n secteurs égaux ;
     - rect     { l, c }       : l lignes × c colonnes de carreaux ;
     - barre    { n }          : une bande partagée en n parts ;
     - hexagone {}             : 6 triangles ;
     - triangle { k }          : triangle équilatéral partagé en k² petits triangles (k = 2, 3, 4) ;
     - carre4   {}             : carré partagé par ses diagonales (4 triangles) ;
     - carre8   {}             : carré partagé par ses diagonales et ses médianes (8 triangles) ;
     - pieces   { p: [[x, y, w, h], …] } : carré partagé en rectangles INÉGAUX (coordonnées de 0 à 1 ;
       la fraction se lit par les aires : « lire » seulement).
   FRF.svg(fig, colories, o) : le dessin ; les parts sont des <path> (fill blanc ou coloré) -- les
   planches à l'écran (planches-num.js) les reconnaissent pour le coloriage. Le contour d'un disque est
   un <circle>, qui n'est pas une part.
   ===================================================================== */
const FRF = (() => {
  const K = '#1F3A5C', f = v => (+v).toFixed(2);
  const poly = pts => 'M' + pts.map(p => f(p[0]) + ',' + f(p[1])).join(' L') + ' Z';
  // Parts (chemins) et taille de la boîte, avec l'aire relative de chaque part.
  function parts(F){
    const fo = F.forme;
    if(fo === 'disque'){
      const n = Math.max(1, F.n | 0), r = 46, c = 50, out = [];
      if(n === 1) return { w: 100, h: 100, p: [{ d: `M${c},${c - r} A${r},${r} 0 1 1 ${c - .01},${c - r} Z`, a: 1 }], cercle: [c, c, r] };
      for(let i = 0; i < n; i++){
        const a0 = -Math.PI / 2 + 2 * Math.PI * i / n, a1 = a0 + 2 * Math.PI / n;
        out.push({ d: `M${c},${c} L${f(c + r * Math.cos(a0))},${f(c + r * Math.sin(a0))} A${r},${r} 0 ${n === 1 ? 1 : 0} 1 ${f(c + r * Math.cos(a1))},${f(c + r * Math.sin(a1))} Z`, a: 1 / n });
      }
      return { w: 100, h: 100, p: out, cercle: [c, c, r] };
    }
    if(fo === 'rect' || fo === 'barre'){
      const l = fo === 'barre' ? 1 : Math.max(1, F.l | 0), co = Math.max(1, (fo === 'barre' ? F.n : F.c) | 0);
      const cw = fo === 'barre' ? Math.min(30, 170 / co) : Math.min(24, 140 / Math.max(l, co)), ch = fo === 'barre' ? 30 : cw, out = [];
      for(let y = 0; y < l; y++) for(let x = 0; x < co; x++) out.push({ d: poly([[2 + x * cw, 2 + y * ch], [2 + (x + 1) * cw, 2 + y * ch], [2 + (x + 1) * cw, 2 + (y + 1) * ch], [2 + x * cw, 2 + (y + 1) * ch]]), a: 1 / (l * co) });
      return { w: co * cw + 4, h: l * ch + 4, p: out };
    }
    if(fo === 'hexagone'){
      const c = 50, r = 46, s = [];
      for(let i = 0; i < 6; i++){ const a = Math.PI / 6 + Math.PI / 3 * i; s.push([c + r * Math.cos(a), c + r * Math.sin(a)]); }
      return { w: 100, h: 100, p: s.map((p, i) => ({ d: poly([[c, c], p, s[(i + 1) % 6]]), a: 1 / 6 })) };
    }
    if(fo === 'triangle'){
      const k = Math.max(1, Math.min(5, F.k | 0)), L = 100, H = L * Math.sqrt(3) / 2, out = [];
      const P = (i, j) => [2 + L / 2 - i * L / (2 * k) + j * L / k, 2 + i * H / k]; // rangée i (du haut), j-ième point
      for(let i = 0; i < k; i++){
        for(let j = 0; j <= i; j++) out.push({ d: poly([P(i, j), P(i + 1, j), P(i + 1, j + 1)]), a: 1 / (k * k) });
        for(let j = 0; j < i; j++) out.push({ d: poly([P(i, j), P(i, j + 1), P(i + 1, j + 1)]), a: 1 / (k * k) });
      }
      return { w: L + 4, h: H + 4, p: out };
    }
    if(fo === 'carre4' || fo === 'carre8'){
      const a = 2, b = 98, m = 50, C = [m, m], S = [[a, a], [b, a], [b, b], [a, b]];
      if(fo === 'carre4') return { w: 100, h: 100, p: S.map((p, i) => ({ d: poly([C, p, S[(i + 1) % 4]]), a: 1 / 4 })) };
      const M = [[m, a], [b, m], [m, b], [a, m]], out = [];
      S.forEach((p, i) => { out.push({ d: poly([C, p, M[i]]), a: 1 / 8 }); out.push({ d: poly([C, M[i], S[(i + 1) % 4]]), a: 1 / 8 }); });
      return { w: 100, h: 100, p: out };
    }
    if(fo === 'pieces'){
      const T = 96;
      return { w: 100, h: 100, p: (F.p || []).map(([x, y, w, h]) => ({ d: poly([[2 + x * T, 2 + y * T], [2 + (x + w) * T, 2 + y * T], [2 + (x + w) * T, 2 + (y + h) * T], [2 + x * T, 2 + (y + h) * T]]), a: w * h })) };
    }
    return { w: 10, h: 10, p: [] };
  }
  function nb(F){ return parts(F).p.length; }
  // Dessin. colories : indices des parts coloriées ; o = { px, coul, clic: i => 'attributs', classe }.
  function svg(F, colories, o){
    o = o || {}; const P = parts(F), on = new Set(colories || []), coul = o.coul || '#2EA8C9';
    const g = P.p.map((p, i) => `<path d="${p.d}" fill="${on.has(i) ? coul : '#fff'}" stroke="${K}" stroke-width="1.5" stroke-linejoin="round"${o.clic ? ' ' + o.clic(i) : ''}/>`).join('')
      + (P.cercle ? `<circle cx="${P.cercle[0]}" cy="${P.cercle[1]}" r="${P.cercle[2]}" fill="none" stroke="${K}" stroke-width="2.2" pointer-events="none"/>` : '');
    let px = o.px || (F.forme === 'barre' ? Math.round(P.w) : 90);
    // Rectangle : carreaux de même taille d'une figure à l'autre (au plus 22 px), sans dépasser px.
    if(F.forme === 'rect'){ const l = Math.max(1, F.l | 0), c = Math.max(1, F.c | 0), cw = (P.w - 4) / c, cell = Math.min(o.cellMax || 22, px * 1.5 / c, px / l); px = Math.round(P.w * cell / cw); }
    return `<svg class="pl-libre${o.classe ? ' ' + o.classe : ''}" viewBox="0 0 ${f(P.w)} ${f(P.h)}" style="width:${px}px;max-width:100%;display:inline-block;vertical-align:middle;">${g}</svg>`;
  }
  // Fraction coloriée : [numérateur, dénominateur] (parts égales), ou aire (pieces) en fraction simple.
  function lue(F, colories){
    const P = parts(F), on = colories || [];
    if(F.forme !== 'pieces') return [on.length, P.p.length];
    const a = on.reduce((s, i) => s + (P.p[i] ? P.p[i].a : 0), 0);
    for(let d = 1; d <= 64; d++){ const n = Math.round(a * d); if(Math.abs(n / d - a) < 1e-9) return [n, d]; }
    return [Math.round(a * 64), 64];
  }
  const pgcd = (a, b) => b ? pgcd(b, a % b) : Math.abs(a);
  /* Exercices de planches (planches.js : plGrille, plFrac, plRep ; cm1Frac). La figure est au-dessus,
     la case fraction (ou la fraction à colorier) en dessous ; o = { cols, px, coul }.
     lire : items [[figure, parts coloriées, réponse [a, b] facultative], …] -> { eleve, corr } ;
     colorier : items [[figure, a, b], …] : l'élève colorie a/b de la figure (le corrigé colorie les
     premières parts ; à l'écran, n'importe quelles parts en bon nombre sont acceptées). */
  const carte = (fig, bas) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${fig}<span>${bas}</span></span>`;
  function lire(items, o){
    o = o || {}; const Fr = plFrac(), cols = o.cols || 6;
    const fig = it => svg(it[0], it[1], { px: o.px || 66, coul: o.coul });
    const rep = it => { const [a, b] = it[2] || lue(it[0], it[1]); return plRep(cm1Frac(a, b)).replace('class="pl-rep"', 'class="pl-rep" data-equiv="1"'); }; // à l'écran : une fraction égale est acceptée
    return { eleve: plGrille(items.map(it => carte(fig(it), Fr)), cols), corr: plGrille(items.map(it => carte(fig(it), rep(it))), cols) };
  }
  function colorier(items, o){
    o = o || {}; const cols = o.cols || 6;
    const k = it => Math.round(it[1] * nb(it[0]) / it[2]);
    const fig = (it, c) => svg(it[0], c ? Array.from({ length: k(it) }, (_, i) => i) : [], { px: o.px || 66, coul: o.coul || '#E9A21C' });
    return { eleve: plGrille(items.map(it => carte(fig(it, false), cm1Frac(it[1], it[2]))), cols), corr: plGrille(items.map(it => carte(fig(it, true), cm1Frac(it[1], it[2]))), cols) };
  }
  return { parts, nb, svg, lue, pgcd, lire, colorier };
})();

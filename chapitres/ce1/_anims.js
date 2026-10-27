/* ============================================================
   chapitres/ce1/_anims.js -- Dessins et animations du CE1.

   Le CE1 réutilise les dessins et animations du CP (chapitres/cp/_anims.js : boîtes de dix, barres
   de dix cubes, bande et tableau des nombres, schéma en barres, monnaie, horloge, règle, robot…)
   et ceux du CE2 (chapitres/ce2/_anims.js). Ici, ce qui est propre au CE1 :
   - ce1Plaques / ce1AnimCentaines : la centaine (une plaque de 100 = 10 barres de dix) ;
   - ce1AnimTable : une table de multiplication qui se construit rangée par rangée ;
   - ce1Rangees : un quadrillage de jetons (rangées × colonnes) pour le signe ×.
   ============================================================ */
// Nombre écrit sans espace jusqu'à 1 000 (999, 1 000 avec l'espace des milliers).
const ce1Nb = n => n >= 1000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : String(n);

/* ---- Plaques de cent, barres de dix et cubes (dessin SVG brut) ---- */
function ce1PlaquesSvg(x, y, n, q, o){
  o = o || {}; const c = Math.floor(n / 100), d = Math.floor(n % 100 / 10), u = n % 10, P = 10 * q;
  let s = '', X = x;
  for(let i = 0; i < c; i++){ s += `<rect x="${X}" y="${y}" width="${P}" height="${P}" fill="${o.cc || '#E9C46A'}" stroke="#8A6D1F" stroke-width="1.2"/>`;
    for(let k = 1; k < 10; k++) s += `<line x1="${X + k * q}" y1="${y}" x2="${X + k * q}" y2="${y + P}" stroke="#8A6D1F" stroke-width=".5"/><line x1="${X}" y1="${y + k * q}" x2="${X + P}" y2="${y + k * q}" stroke="#8A6D1F" stroke-width=".5"/>`;
    X += P + 8; }
  if(c && (d || u)) X += 6;
  for(let b = 0; b < d; b++){ s += `<rect x="${X}" y="${y}" width="${q}" height="${P}" fill="${CE2C.vert}" stroke="#14583A" stroke-width="1"/>`;
    for(let k = 1; k < 10; k++) s += `<line x1="${X}" y1="${y + k * q}" x2="${X + q}" y2="${y + k * q}" stroke="#14583A" stroke-width=".6"/>`;
    X += q + 4; }
  if(d && u) X += 6;
  for(let j = 0; j < u; j++) s += `<rect x="${X + Math.floor(j / 5) * (q + 3)}" y="${y + P - (j % 5 + 1) * (q + 2)}" width="${q}" height="${q}" fill="${CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`;
  return s;
}
function ce1PlaquesL(n, q){ const c = Math.floor(n / 100), d = Math.floor(n % 100 / 10), u = n % 10; return c * (10 * q + 8) + (c && (d || u) ? 6 : 0) + d * (q + 4) + (d && u ? 6 : 0) + (u ? (u > 5 ? 2 : 1) * (q + 3) : 0) + 2; }
function ce1Plaques(n, o){ o = o || {}; const q = o.q || 8; return cpSvg(ce1PlaquesL(n, q) + 6, 10 * q + 6, ce1PlaquesSvg(3, 3, n, q, o), o.px); }

/* ---- La centaine : dix barres de dix se collent en une plaque de cent ---- */
function ce1AnimCentaines(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 243 }, duree: 9000,
    legende: o.legende || 'Dix barres de dix se rassemblent : cela fait une plaque de cent, une centaine.',
    controles: a => `<div class="cmp-modeles">${[136, 243, 305, 420, 999].map(v => cmBtn(id, 'n', v, String(v), a.etat.n === v)).join('')}</div>`,
    dessin: (t, a) => {
      const n = a.etat.n, c = Math.floor(n / 100), d = Math.floor(n % 100 / 10), u = n % 10, q = 8, P = 10 * q, W = Math.max(620, 20 + c * (P + 10) + 6 + d * (q + 4) + 50);
      // Au début : toutes les dizaines sont des barres séparées (c × 10 + d barres), en rangées.
      const nb = c * 10 + d, k = cmDoux(cmPhase(t, .25, .65)), fin = t > .7;
      let s = '';
      const X0 = 20, Y0 = 20;
      for(let b = 0; b < nb; b++){
        const plaque = Math.floor(b / 10), dansPlaque = b < c * 10;
        const xa = X0 + (b % 30) * (q + 6), ya = Y0 + Math.floor(b / 30) * (P + 10);
        const xb = dansPlaque ? X0 + plaque * (P + 10) + (b % 10) * q : X0 + c * (P + 10) + 6 + (b - c * 10) * (q + 4), yb = Y0;
        const x = xa + (xb - xa) * k, y = ya + (yb - ya) * k;
        s += `<rect x="${x}" y="${y}" width="${q}" height="${P}" fill="${dansPlaque && fin ? '#E9C46A' : CE2C.vert}" stroke="${dansPlaque && fin ? '#8A6D1F' : '#14583A'}" stroke-width="1"/>`; }
      const xu = X0 + (fin || k > .5 ? c * (P + 10) + 6 + d * (q + 4) + 8 : 30 * (q + 6) - 20);
      for(let j = 0; j < u; j++) s += `<rect x="${xu + Math.floor(j / 5) * (q + 3)}" y="${Y0 + P - (j % 5 + 1) * (q + 2)}" width="${q}" height="${q}" fill="${CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`;
      if(fin){ for(let i = 0; i < c; i++) s += ce2T(X0 + i * (P + 10) + P / 2, Y0 + P + 20, '100', { t: 13, g: 700, c: '#8A6D1F' });
        if(d) s += ce2T(X0 + c * (P + 10) + 6 + d * (q + 4) / 2, Y0 + P + 20, d * 10, { t: 13, g: 700, c: CE2C.vert });
        if(u) s += ce2T(xu + q, Y0 + P + 20, u, { t: 13, g: 700, c: CPC.jeton2 }); }
      const H = fin || k > .5 ? P + 50 : Y0 + Math.ceil(nb / 30) * (P + 10) + 20;
      const texte = t < .25 ? `${nb} barres de dix et ${u} cube${u > 1 ? 's' : ''}. Combien de cubes ?`
        : !fin ? 'Dix barres de dix se rassemblent : une plaque de cent…'
        : `<b>${c} centaine${c > 1 ? 's' : ''}</b>, <b>${d} dizaine${d > 1 ? 's' : ''}</b> et <b>${u} unité${u > 1 ? 's' : ''}</b> : ${c * 100} + ${d * 10} + ${u} = <b>${n}</b>.`;
      return { scene: `<svg viewBox="0 0 ${W} ${Math.max(H, 140)}" class="cma-svg" style="max-width:${W}px;">${s}</svg>`, texte };
    } });
}

/* ---- Jetons en rangées : r rangées de c jetons (pour le signe ×) ---- */
function ce1Rangees(r, c, o){
  o = o || {}; const p = o.p || 26; let s = '';
  for(let i = 0; i < r; i++) for(let j = 0; j < c; j++) s += `<circle cx="${14 + j * p}" cy="${14 + i * p}" r="${p * .36}" fill="${o.c || (i % 2 ? CPC.jeton2 : CPC.jeton)}" stroke="${CPC.bord}"/>`;
  return cpSvg(c * p + 4, r * p + 4, s, o.px);
}

/* ---- Une table de multiplication qui se construit : 1 × t, 2 × t… avec les rangées de jetons ---- */
function ce1AnimTable(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { t: o.t || 5 }, duree: 11000,
    legende: o.legende || 'Chaque nouvelle rangée ajoute le même nombre : on avance de ' + (o.t || 5) + ' en ' + (o.t || 5) + '.',
    controles: a => `<div class="cmp-modeles">${(o.tables || [2, 3, 4, 5, 10]).map(v => cmBtn(id, 't', v, 'Table de ' + v, a.etat.t === v)).join('')}</div>`,
    dessin: (t, a) => {
      const T = a.etat.t, k = Math.min(10, Math.floor(cmPhase(t, .05, .92) * 10 + 1e-6) + 1), p = T > 5 ? 17 : 22;
      let s = '';
      for(let i = 0; i < k; i++) for(let j = 0; j < T; j++) s += `<circle cx="${20 + j * p}" cy="${16 + i * 21}" r="${Math.min(8, p * .38)}" fill="${i === k - 1 ? CPC.jeton : CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1"/>`;
      for(let i = 0; i < k; i++) s += ce2T(330, 21 + i * 21, `${i + 1} × ${T} = ${(i + 1) * T}`, { t: 14, g: i === k - 1 ? 700 : 500, a: 'start', c: i === k - 1 ? CPC.jeton : CPC.bord });
      const texte = `<b>${k} × ${T} = ${k * T}</b> : ${k} rangée${k > 1 ? 's' : ''} de ${T}${k > 1 ? `, c'est ${(k - 1) * T} + ${T}` : ''}.`;
      return { scene: `<svg viewBox="0 0 480 228" class="cma-svg" style="max-width:520px;">${s}</svg>`, texte };
    } });
}

// Le nom d'un nombre jusqu'à 1 000 (orthographe traditionnelle : deux cents, deux cent trois, mille).
function ce1Mot(n){
  if(n === 1000) return 'mille';
  const c = Math.floor(n / 100), r = n % 100;
  if(!c) return cpMot(r);
  const tete = c === 1 ? 'cent' : cpMot(c) + ' cent' + (r === 0 ? 's' : '');
  return r === 0 ? tete : tete + ' ' + cpMot(r);
}
// Tableau de numération (centaines, dizaines, unités) d'un nombre.
function ce1CDU(n, o){
  o = o || {}; const c = Math.floor(n / 100), d = Math.floor(n % 100 / 10), u = n % 10;
  return cm1Tableau(['centaines', 'dizaines', 'unités'], [[`<b style="color:#8A6D1F;font-size:1.3rem;">${c}</b>`, `<b style="color:#2E9C6A;font-size:1.3rem;">${d}</b>`, `<b style="color:#2EA8C9;font-size:1.3rem;">${u}</b>`]]);
}

/* ---- L'angle droit : on pose le gabarit (un coin de feuille pliée en quatre) dans chaque coin ---- */
function ce1AnimGabarit(id, o){
  const P = (o && o.presets) || [
    { nom: 'Le rectangle', pts: [[90, 50], [330, 50], [330, 180], [90, 180]] },
    { nom: 'Un quadrilatère', pts: [[80, 60], [300, 40], [350, 190], [100, 180]] },
    { nom: 'Un triangle', pts: [[90, 190], [90, 50], [320, 190]] }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2000 + P[a.etat.p].pts.length * 1600,
    legende: (o && o.legende) || 'Le gabarit d\'angle droit (un coin de feuille pliée en quatre) se pose dans chaque coin : s\'il s\'ajuste exactement, l\'angle est droit.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], n = p.pts.length, f = cmPhase(t, .1, .95) * n, i = Math.min(n - 1, Math.floor(f)), k = cmDoux(Math.min(1, (f - i) * 2));
      const ang = q => { const A = p.pts[(q + n - 1) % n], S = p.pts[q], B = p.pts[(q + 1) % n];
        const u = [A[0] - S[0], A[1] - S[1]], v = [B[0] - S[0], B[1] - S[1]], c = (u[0] * v[0] + u[1] * v[1]) / Math.hypot(...u) / Math.hypot(...v); return Math.abs(c) < .02; };
      let s = `<polygon points="${p.pts.map(q => q.join(',')).join(' ')}" fill="#2EA8C9" fill-opacity=".15" stroke="${CPC.bord}" stroke-width="2.5"/>`;
      // Les angles déjà vérifiés : un petit carré rouge (droit) ou une croix grise (pas droit).
      for(let q = 0; q < (t >= .95 ? n : i); q++){ const S = p.pts[q], A = p.pts[(q + n - 1) % n], B = p.pts[(q + 1) % n], ua = [(A[0] - S[0]), (A[1] - S[1])], ub = [(B[0] - S[0]), (B[1] - S[1])], la = Math.hypot(...ua), lb = Math.hypot(...ub), e = 16;
        const P1 = [S[0] + ua[0] / la * e, S[1] + ua[1] / la * e], P2 = [S[0] + ub[0] / lb * e, S[1] + ub[1] / lb * e], P3 = [P1[0] + ub[0] / lb * e, P1[1] + ub[1] / lb * e];
        s += ang(q) ? `<path d="M${P1[0]} ${P1[1]} L${P3[0]} ${P3[1]} L${P2[0]} ${P2[1]}" fill="none" stroke="${CE2C.rouge}" stroke-width="2.4"/>` : `<circle cx="${S[0]}" cy="${S[1]}" r="6" fill="#8A8F98"/>`; }
      if(t >= .1 && t < .95){ // le gabarit, aligné sur un côté de l'angle
        const S = p.pts[i], B = p.pts[(i + 1) % n], A = p.pts[(i + n - 1) % n], ub = [B[0] - S[0], B[1] - S[1]], lb = Math.hypot(...ub), u = [ub[0] / lb, ub[1] / lb];
        // perpendiculaire du côté de A
        let v = [-u[1], u[0]]; if(v[0] * (A[0] - S[0]) + v[1] * (A[1] - S[1]) < 0) v = [-v[0], -v[1]];
        const g = 60, X = S[0] + 80 * (1 - k), Y = S[1] - 60 * (1 - k);
        s += `<polygon points="${X},${Y} ${X + u[0] * g},${Y + u[1] * g} ${X + (u[0] + v[0]) * g},${Y + (u[1] + v[1]) * g} ${X + v[0] * g},${Y + v[1] * g}" fill="#F7E7A9" fill-opacity=".85" stroke="#B8962E" stroke-width="1.6"/>`; }
      const nb = p.pts.filter((_, q) => ang(q)).length;
      const texte = t < .1 ? `${p.nom} : combien d'<b>angles droits</b> ?` : t < .95 ? (ang(i) ? `Coin ${i + 1} : le gabarit s'ajuste exactement, c'est un <b>angle droit</b>.` : `Coin ${i + 1} : le gabarit ne s'ajuste pas, l'angle <b>n'est pas droit</b>.`)
        : `${p.nom} a <b>${nb} angle${nb > 1 ? 's' : ''} droit${nb > 1 ? 's' : ''}</b>. On les code par un petit carré.`;
      return { scene: `<svg viewBox="0 0 420 240" class="cma-svg" style="max-width:460px;">${s}</svg>`, texte };
    } });
}

/* ---- Comparer deux nombres de trois chiffres : centaines, puis dizaines, puis unités ---- */
function ce1AnimComparer(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: 9000, legende: o.legende || 'On compare rang par rang, en commençant par les centaines : dès qu\'un rang est différent, on a la réponse.',
    controles: a => ce2Choix(id, P.map(([x, y]) => ({ nom: `${x} et ${y}` })), a),
    dessin: (t, a) => {
      const [A, B] = P[a.etat.p], ca = String(A).padStart(3, '0'), cb = String(B).padStart(3, '0'), q = 6;
      let rang = 0; while(rang < 2 && ca[rang] === cb[rang]) rang++;
      const etape = Math.min(rang, Math.floor(cmPhase(t, .15, .6) * 3)), fin = t > .65, NOMS = ['centaines', 'dizaines', 'unités'], COUL = ['#8A6D1F', CE2C.vert, CPC.jeton2];
      let s = ce1PlaquesSvg(20, 14, A, q) + ce1PlaquesSvg(20, 104, B, q);
      [ca, cb].forEach((ch, l) => { ch.split('').forEach((c, i) => { const on = i <= etape && t > .15;
        s += `<rect x="${330 + i * 40}" y="${24 + l * 90}" width="34" height="46" rx="6" fill="${on && i === etape ? '#FFF3D6' : '#fff'}" stroke="${on ? COUL[i] : '#C7D2DE'}" stroke-width="${on ? 3 : 1.5}"/>` + ce2T(347 + i * 40, 57 + l * 90, c, { t: 26, g: 700, c: COUL[i] }); }); });
      if(fin) s += ce2T(487, 102, A < B ? '&lt;' : A > B ? '&gt;' : '=', { t: 44, g: 700, c: CE2C.vert }) + ce2T(487, 132, A < B ? 'plus petit' : A > B ? 'plus grand' : 'égal', { t: 11, c: CE2C.gris });
      const texte = t < .15 ? `Qui est le plus grand : <b>${A}</b> ou <b>${B}</b> ?`
        : !fin ? `On compare les <b>${NOMS[etape]}</b> : ${ca[etape]} et ${cb[etape]}${ca[etape] === cb[etape] ? ' : pareil, on passe au rang suivant.' : '.'}`
        : A === B ? `Les deux nombres sont égaux : <b>${A} = ${B}</b>.` : `<b>${A} ${A < B ? '&lt;' : '&gt;'} ${B}</b> : ${Math.max(A, B)} a plus de ${NOMS[rang]}.`;
      return { scene: `<svg viewBox="0 0 540 200" class="cma-svg" style="max-width:560px;">${s}</svg>`, texte };
    } });
}

/* ---- Un demi, un tiers, un quart : on partage l'unité en parts ÉGALES, puis on colorie ---- */
const CE1_FRAC_MOTS = { 2: ['un demi', 'deux demis'], 3: ['un tiers', 'deux tiers', 'trois tiers'], 4: ['un quart', 'deux quarts', 'trois quarts', 'quatre quarts'] };
// Dessin d'une unité (bande, disque ou carré) partagée en n parts, k coloriées ; coupes : nombre de traits déjà tracés.
function ce1FracSvg(forme, n, k, o){
  o = o || {}; const c = o.c || '#E35D3A', coupes = o.coupes == null ? n - 1 : o.coupes; let s = '';
  if(forme === 'disque'){ const cx = 70, cy = 70, r = 60;
    for(let i = 0; i < n; i++){ const a0 = -Math.PI / 2 + i * 2 * Math.PI / n, a1 = a0 + 2 * Math.PI / n;
      s += `<path d="M${cx} ${cy} L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 ${n === 1 ? 1 : 0} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)} Z" fill="${i < k ? c : '#fff'}" fill-opacity="${i < k ? .8 : 1}" stroke="none"/>`; }
    for(let i = 0; i < Math.min(coupes + 1, n); i++){ const a = -Math.PI / 2 + i * 2 * Math.PI / n; if(n > 1 && (i > 0 || coupes > 0)) s += `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a)}" y2="${cy + r * Math.sin(a)}" stroke="${CPC.bord}" stroke-width="2"/>`; }
    s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/>`;
    return { s, w: 140, h: 140 }; }
  if(forme === 'carre'){ const L = 120, x0 = 10, y0 = 10, sous = n === 4 && o.quadrants;
    for(let i = 0; i < n; i++){ const [x, y, w, h] = sous ? [x0 + (i % 2) * L / 2, y0 + Math.floor(i / 2) * L / 2, L / 2, L / 2] : [x0 + i * L / n, y0, L / n, L];
      s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${i < k ? c : '#fff'}" fill-opacity="${i < k ? .8 : 1}" stroke="${i < coupes + 1 ? CPC.bord : 'none'}" stroke-width="2"/>`; }
    s += `<rect x="${x0}" y="${y0}" width="${L}" height="${L}" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/>`;
    return { s, w: 140, h: 140 }; }
  const L = o.L || 240, H = 46;
  for(let i = 0; i < n; i++) s += `<rect x="${6 + i * L / n}" y="6" width="${L / n}" height="${H}" fill="${i < k ? c : '#fff'}" fill-opacity="${i < k ? .8 : 1}"/>`;
  for(let i = 1; i <= Math.min(coupes, n - 1); i++) s += `<line x1="${6 + i * L / n}" y1="6" x2="${6 + i * L / n}" y2="${6 + H}" stroke="${CPC.bord}" stroke-width="2"/>`;
  s += `<rect x="6" y="6" width="${L}" height="${H}" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/>`;
  return { s, w: L + 12, h: H + 12 };
}
function ce1Frac(forme, n, k, o){ o = o || {}; const f = ce1FracSvg(forme, n, k, o); return cpSvg(f.w, f.h, f.s, o.px || (forme === 'bande' ? 200 : 100)); }
function ce1AnimFraction(id, o){
  o = o || {};
  return cmAnim(id, {
    etat: { n: o.n || 3, forme: o.forme || 'disque' }, duree: 7500,
    legende: o.legende || 'On partage l\'unité en parts égales, puis on colorie une part.',
    controles: a => `<div class="cmp-modeles">${[['bande', 'Bande'], ['disque', 'Disque'], ['carre', 'Carré']].map(([f, l]) => cmBtn(id, 'forme', f, l, a.etat.forme === f)).join('')}${[2, 3, 4].map(v => cmBtn(id, 'n', v, ['', '', 'En 2', 'En 3', 'En 4'][v], a.etat.n === v)).join('')}</div>`,
    dessin: (t, a) => {
      const { n, forme } = a.etat, coupes = Math.floor(cmPhase(t, .12, .5) * (n - 1) + 1e-6) + (t >= .5 ? 0 : 0), k = t > .6 ? 1 : 0;
      const f = ce1FracSvg(forme, n, k, { coupes: t < .12 ? -1 : coupes });
      const nom = CE1_FRAC_MOTS[n][0];
      const texte = t < .12 ? 'Voici l\'unité, entière.' : t < .55 ? `On la partage en <b>${n} parts égales</b>.` : `Une part sur ${n}, c'est <b>${nom}</b> de l'unité. On écrit ${cm1Frac(1, n)}.`;
      return { scene: `<svg viewBox="0 0 ${f.w} ${f.h}" class="cma-svg" style="max-width:${forme === 'bande' ? 420 : 240}px;">${f.s}</svg>`, texte };
    } });
}

/* ---- La soustraction posée en cassant une dizaine (ou une centaine) : colonne par colonne ----
   Technique « par cassage » (échange 1 dizaine = 10 unités), dans la continuité du CP. Les presets
   évitent les zéros à casser en cascade (ex. 302 − 7), traités au CE2. */
// Dessin de la soustraction posée par cassage, après k étapes (toutes si k est omis).
function ce1SoustEtat(A, B, k, cadre){
  const n = String(A).length, ha = String(A).split('').map(Number), hb = String(B).padStart(n, ' ').split('').map(c => c === ' ' ? null : +c);
      // Calcul des étapes, de droite à gauche.
      const haut = ha.slice(), casse = Array(n).fill(false), plus10 = Array(n).fill(false), res = Array(n).fill(null), et = [];
      for(let j = n - 1; j >= 0; j--){ const y = hb[j] || 0;
        if(haut[j] < y){ haut[j - 1]--; casse[j - 1] = true; haut[j] += 10; plus10[j] = true; et.push({ j, type: 'casse', h: haut.slice(), c: casse.slice(), p: plus10.slice(), r: res.slice() }); }
        res[j] = haut[j] - y; et.push({ j, type: 'calc', h: haut.slice(), c: casse.slice(), p: plus10.slice(), r: res.slice() }); }
  if(k == null || k > et.length) k = et.length;
  const E = k ? et[k - 1] : { h: ha, c: Array(n).fill(false), p: Array(n).fill(false), r: Array(n).fill(null) };
      const X = j => 110 + j * 48, RANG = ['centaines', 'dizaines', 'unités'].slice(3 - n);
      let s = '';
      RANG.forEach((r, j) => { s += ce2T(X(j), 18, r[0], { t: 12, c: CE2C.gris }); });
      for(let j = 0; j < n; j++){
        const mod = E.c[j] || E.p[j];
        s += ce2T(X(j), 80, ha[j], { t: 30, g: 700, c: E.c[j] ? '#9AA3AE' : CPC.bord });
        if(E.c[j]) s += `<line x1="${X(j) - 12}" y1="88" x2="${X(j) + 12}" y2="58" stroke="${CE2C.rouge}" stroke-width="2.5"/>` + ce2T(E.p[j] ? X(j) + 3 : X(j), 46, E.h[j] + (E.p[j] ? -10 : 0), { t: 17, g: 700, c: CE2C.rouge });
        if(E.p[j]) s += E.c[j] ? ce2T(X(j) - 12, 46, '1', { t: 17, g: 700, c: CE2C.rouge }) : ce2T(X(j) - 19, 74, '1', { t: 20, g: 700, c: CE2C.rouge });
        if(hb[j] != null) s += ce2T(X(j), 122, hb[j], { t: 30, g: 700 });
        if(E.r[j] != null) s += ce2T(X(j), 168, E.r[j], { t: 30, g: 700, c: CE2C.vert });
        if(cadre && k && et[k - 1].j === j) s += `<rect x="${X(j) - 22}" y="30" width="44" height="150" rx="8" fill="none" stroke="${CE2C.violet}" stroke-width="2" stroke-dasharray="5 4"/>`; }
      s += ce2T(X(0) - 40, 122, '−', { t: 30, g: 700 }) + `<line x1="${X(0) - 50}" y1="134" x2="${X(n - 1) + 24}" y2="134" stroke="${CPC.bord}" stroke-width="2.5"/>`;
  return { s, et, k, n, hb, RANG, X };
}
function ce1Sous(A, B, px){ const r = ce1SoustEtat(A, B); return cpSvg(r.X(r.n - 1) + 90, 190, r.s, px || 170); }
function ce1AnimSoustraction(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2000 + String(P[a.etat.p][0]).length * 2600,
    legende: o.legende || 'On commence par les unités. S\'il n\'y en a pas assez en haut, on casse une dizaine : 1 dizaine = 10 unités.',
    controles: a => ce2Choix(id, P.map(([x, y]) => ({ nom: `${x} − ${y}` })), a),
    dessin: (t, a) => {
      const [A, B] = P[a.etat.p], nE = ce1SoustEtat(A, B).et.length, kk = Math.min(nE, Math.floor(cmPhase(t, .1, .95) * nE + 1e-6));
      const { s, et, k, n, hb, RANG, X } = ce1SoustEtat(A, B, kk, true);
      const cur = k ? et[k - 1] : null, y = cur ? (hb[cur.j] || 0) : 0, nom = cur ? RANG[cur.j] : '';
      const texte = !cur ? `On pose <b>${A} − ${B}</b> : les unités sous les unités.`
        : cur.type === 'casse' ? `Colonne des ${nom} : pas assez en haut pour enlever ${y}. On <b>casse</b> 1 ${RANG[cur.j - 1].slice(0, -1)} : il en reste ${cur.h[cur.j - 1]}, et il y a maintenant ${cur.h[cur.j]} ${nom}.`
        : k === et.length ? `${cur.h[cur.j]} − ${y} = ${cur.r[cur.j]}. Résultat : <b>${A} − ${B} = ${A - B}</b>.` : `Colonne des ${nom} : ${cur.h[cur.j]} − ${y} = <b>${cur.r[cur.j]}</b>.`;
      return { scene: `<svg viewBox="0 0 ${X(n - 1) + 90} 190" class="cma-svg" style="max-width:340px;">${s}</svg>`, texte };
    } });
}

/* ---- Cube ou pavé en perspective : on compte les arêtes, puis les sommets ---- */
function ce1SolidePts(type){
  const [w, h, dx, dy] = type === 'pave' ? [170, 80, 70, 50] : [110, 110, 60, 45], x = 60, y = 80;
  // sommets : 0-3 face avant (haut-gauche, haut-droit, bas-droit, bas-gauche), 4-7 face arrière
  const S = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], T = S.map(([a, b]) => [a + dx, b - dy]);
  return S.concat(T);
}
const CE1_ARETES = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
const CE1_CACHEES = [[6, 7], [7, 4], [3, 7]]; // arêtes cachées (sommet 7 en arrière-bas-gauche)
function ce1SolideSvg(type, o){
  o = o || {}; const p = ce1SolidePts(type), c = type === 'pave' ? '#2E9C6A' : '#2EA8C9';
  const cachee = ([a, b]) => CE1_CACHEES.some(([u, v]) => (u === a && v === b) || (u === b && v === a));
  let s = `<polygon points="${[0, 1, 2, 3].map(i => p[i].join(',')).join(' ')}" fill="${c}" fill-opacity=".18"/><polygon points="${[0, 1, 5, 4].map(i => p[i].join(',')).join(' ')}" fill="${c}" fill-opacity=".3"/><polygon points="${[1, 2, 6, 5].map(i => p[i].join(',')).join(' ')}" fill="${c}" fill-opacity=".42"/>`;
  CE1_ARETES.forEach((e, i) => { const [a, b] = e, on = o.aretes != null && i < o.aretes;
    s += `<line x1="${p[a][0]}" y1="${p[a][1]}" x2="${p[b][0]}" y2="${p[b][1]}" stroke="${on ? CE2C.rouge : CPC.bord}" stroke-width="${on ? 4 : 2}"${cachee(e) ? ' stroke-dasharray="6 5"' : ''}/>`; });
  if(o.sommets) p.slice(0, o.sommets).forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="7" fill="${CE2C.violet}"/>` + ce2T(x + (i % 4 === 0 || i % 4 === 3 ? -14 : 14), y + 5, i + 1, { t: 12, g: 700, c: CE2C.violet }); });
  return s;
}
function ce1AnimSolide(id){
  const PR = [{ nom: 'Le cube', type: 'cube' }, { nom: 'Le pavé', type: 'pave' }];
  return cmAnim(id, {
    etat: { p: 0 }, duree: 12000, legende: 'Les arêtes cachées sont en pointillés. On compte les arêtes une par une, puis les sommets.',
    controles: a => ce2Choix(id, PR, a),
    dessin: (t, a) => {
      const P = PR[a.etat.p], na = Math.min(12, Math.floor(cmPhase(t, .08, .55) * 12 + 1e-6) + (t >= .08 ? 1 : 0)), ns = t < .6 ? 0 : Math.min(8, Math.floor(cmPhase(t, .6, .92) * 8 + 1e-6) + 1);
      const s = ce1SolideSvg(P.type, { aretes: t >= .08 ? na : null, sommets: ns });
      const texte = t < .08 ? `${P.nom} : combien d'arêtes ? combien de sommets ?` : t < .58 ? `Arête ${na}…` : t < .94 ? `${na} arêtes. Sommet ${ns}…`
        : `${P.nom} a <b>6 faces</b>, <b>12 arêtes</b> et <b>8 sommets</b>${P.type === 'cube' ? ' ; ses faces sont des carrés' : ' ; ses faces sont des rectangles'}.`;
      return { scene: `<svg viewBox="0 0 320 210" class="cma-svg" style="max-width:380px;">${s}</svg>`, texte };
    } });
}

/* ---- Le robot-tortue : « avance », « tourne à gauche », « tourne à droite » (déplacements relatifs) ----
   Programme : chaîne de A (avance d'une case), G (quart de tour à gauche), D (quart de tour à droite). */
const CE1_DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // 0 : vers le haut, 1 : droite, 2 : bas, 3 : gauche
function ce1CarteInstr(c, on){
  // « avance » : des traces de pas (pour ne pas confondre avec la flèche « vers le haut » du CP).
  const ic = c === 'A' ? `<ellipse cx="12" cy="21" rx="4" ry="6.5" fill="${CPC.bord}"/><circle cx="12" cy="11.5" r="2" fill="${CPC.bord}"/><ellipse cx="22" cy="15" rx="4" ry="6.5" fill="${CPC.bord}"/><circle cx="22" cy="5.8" r="2" fill="${CPC.bord}"/>`
    : `<path d="M${c === 'G' ? 24 : 10} 24 V16 A8 8 0 0 ${c === 'G' ? 0 : 1} ${c === 'G' ? 16 : 18} 8 H${c === 'G' ? 10 : 24} M${c === 'G' ? 14 : 20} 4 L${c === 'G' ? 10 : 24} 8 L${c === 'G' ? 14 : 20} 12" fill="none" stroke="${c === 'G' ? CE2C.violet : CE2C.vert}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<rect x="1" y="1" width="32" height="32" rx="7" fill="${on ? '#EDE4FA' : '#fff'}" stroke="${on ? CE2C.violet : '#9FB0C4'}" stroke-width="${on ? 2.4 : 1.4}"/>${ic}`;
}
const ce1Instr = (prog, on) => `<span class="cpn-code">${prog.split('').map((c, i) => cpSvg(34, 34, ce1CarteInstr(c, i === on), 30)).join('')}</span>`;
function ce1AnimTortue(id, o){
  const P = o.presets;
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2500 + P[a.etat.p].prog.length * 900,
    legende: o.legende || '« Avance » : une case devant soi. « Tourne » : un quart de tour sur place, sans changer de case.',
    controles: a => ce2Choix(id, P, a),
    dessin: (t, a) => {
      const p = P[a.etat.p], nc = p.nc || 6, nr = p.nr || 5, C = 40;
      // États successifs : position et direction.
      const E = [{ x: p.dep[0], y: p.dep[1], d: p.dir || 1 }];
      p.prog.split('').forEach(c => { const e = Object.assign({}, E[E.length - 1]); if(c === 'A'){ e.x += CE1_DIR[e.d][0]; e.y += CE1_DIR[e.d][1]; } else e.d = (e.d + (c === 'D' ? 1 : 3)) % 4; E.push(e); });
      const n = p.prog.length, f = cmPhase(t, .1, .9) * n, i = Math.min(n - 1, Math.floor(f)), k = cmDoux(Math.min(1, (f - i) * 1.6));
      const A = t < .1 ? E[0] : E[i], B = t < .1 ? E[0] : E[i + 1];
      const x = A.x + (B.x - A.x) * k, y = A.y + (B.y - A.y) * k;
      let da = B.d - A.d; if(da > 2) da -= 4; if(da < -2) da += 4; const ang = (A.d + da * k) * 90;
      let s = `<rect x="3" y="3" width="${nc * C}" height="${nr * C}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
      for(let c = 1; c < nc; c++) s += `<line x1="${3 + c * C}" y1="3" x2="${3 + c * C}" y2="${3 + nr * C}" stroke="#9FB0C4"/>`;
      for(let r = 1; r < nr; r++) s += `<line x1="3" y1="${3 + r * C}" x2="${3 + nc * C}" y2="${3 + r * C}" stroke="#9FB0C4"/>`;
      if(p.but) s += CP_ICO.etoile(3 + p.but[0] * C + C / 2, 3 + p.but[1] * C + C / 2);
      const vu = E.slice(0, (t < .1 ? 0 : i) + 1).map(e => [e.x, e.y]).concat([[x, y]]);
      s += `<polyline points="${vu.map(([c, r]) => `${3 + c * C + C / 2},${3 + r * C + C / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4"/>`;
      const cx = 3 + x * C + C / 2, cy = 3 + y * C + C / 2;
      s += `<g transform="translate(${cx} ${cy}) rotate(${ang})"><circle r="14" fill="#3E9B4F" stroke="#1F5C2E" stroke-width="2"/><polygon points="0,-20 -7,-10 7,-10" fill="#1F5C2E"/><circle cx="-5" cy="-6" r="2.4" fill="#fff"/><circle cx="5" cy="-6" r="2.4" fill="#fff"/></g>`;
      const cartes = p.prog.split('').map((c, q) => `<g transform="translate(${nc * C + 16 + (q % 5) * 36} ${6 + Math.floor(q / 5) * 38})">${ce1CarteInstr(c, t >= .1 && t < .9 && q === i)}</g>`).join('');
      const fin = t >= .9, ok = p.but && E[n].x === p.but[0] && E[n].y === p.but[1];
      const NOM = { A: 'avance d\'une case', G: 'tourne d\'un quart de tour à gauche', D: 'tourne d\'un quart de tour à droite' };
      const texte = t < .1 ? 'La tortue regarde dans la direction de sa pointe. Elle va suivre le programme.' : !fin ? `Instruction ${i + 1} : elle <b>${NOM[p.prog[i]]}</b>.` : ok ? 'La tortue est arrivée sur l\'étoile !' : (p.fin || 'Le programme est terminé.');
      return { scene: `<svg viewBox="0 0 ${nc * C + 200} ${nr * C + 8}" class="cma-svg" style="max-width:600px;">${s}${cartes}</svg>`, texte };
    } });
}

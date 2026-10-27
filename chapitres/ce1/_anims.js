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

/* =====================================================================
   perspective-arts.js -- Maths et arts : la perspective des peintres. Trois méthodes animées.
   Demandé : « maths et arts (peinture) avec les perspectives et points fuyants » ; « fais le 1 et le 3
   et le 2 aussi ».

   1. « Trouve le point de fuite » (5e, Espace) : des tableaux redessinés (une salle à la manière de La
      Cène de Léonard de Vinci, une place à la manière de La Cité idéale, un bâtiment vu de l'angle).
      L'élève devine où se rejoignent les lignes, puis prolonge les bords des murs, du plafond, du sol :
      elles sont concourantes au point de fuite, sur la ligne d'horizon.
   2. « Dessine en perspective » (6e Solides, 5e Espace) : des solides dont on déplace le point de fuite ;
      bascule en perspective cavalière (les fuyantes restent parallèles) ; petits défis.
   3. « Le pavement d'Alberti » (4e Triangles et parallèles, 3e Thalès) : construction pas à pas d'un
      carrelage en perspective (ligne de terre, horizon, point de fuite, point de distance, diagonale),
      puis la mesure : la taille sur le tableau est inversement proportionnelle à la distance ; Thalès.

   Placement : <div class="pa-fuite"></div>, <div class="pa-cube"></div>, <div class="pa-alberti"></div>
   dans le HTML d'une méthode ; paInitTout(conteneur) les construit à l'ouverture du chapitre.
   ===================================================================== */

/* ---------- Géométrie commune ---------- */
const paF = v => (+v).toFixed(1);
const paPts = l => l.map(p => paF(p[0]) + ',' + paF(p[1])).join(' ');
function paPoint(svg, e){ const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; const q = p.matrixTransform(svg.getScreenCTM().inverse()); return [q.x, q.y]; }
// Paramètres t (droite A + t·D) qui restent dans le cadre [0, W] × [0, H] (Liang-Barsky).
function paClipT(A, D, W, H){
  let t0 = -1e9, t1 = 1e9;
  const c = (p, q) => { if(Math.abs(p) < 1e-12) return q >= 0; const r = q / p; if(p < 0){ if(r > t1) return false; if(r > t0) t0 = r; } else { if(r < t0) return false; if(r < t1) t1 = r; } return true; };
  if(!c(-D[0], A[0]) || !c(D[0], W - A[0]) || !c(-D[1], A[1]) || !c(D[1], H - A[1])) return null;
  return [t0, t1];
}
const paAt = (A, D, t) => [A[0] + t * D[0], A[1] + t * D[1]];
function paDroite(A, B, W, H){ const D = [B[0] - A[0], B[1] - A[1]], r = paClipT(A, D, W, H); return r && [paAt(A, D, r[0]), paAt(A, D, r[1])]; }
// Point de la droite (V, B) « à la profondeur k » : V + k·(B − V) (k = 1 : B ; k > 1 : plus près du spectateur).
const paK = (V, B, k) => [V[0] + k * (B[0] - V[0]), V[1] + k * (B[1] - V[1])];
function paInter(A, B, C, D){
  const r = [B[0] - A[0], B[1] - A[1]], s = [D[0] - C[0], D[1] - C[1]], den = r[0] * s[1] - r[1] * s[0];
  if(Math.abs(den) < 1e-9) return null;
  const t = ((C[0] - A[0]) * s[1] - (C[1] - A[1]) * s[0]) / den;
  return [A[0] + t * r[0], A[1] + t * r[1]];
}
const paLigne = (A, B, c, w, extra) => `<line x1="${paF(A[0])}" y1="${paF(A[1])}" x2="${paF(B[0])}" y2="${paF(B[1])}" stroke="${c}" stroke-width="${w || 1.5}"${extra || ''}/>`;
const paPoly = (l, fill, extra) => `<polygon points="${paPts(l)}" fill="${fill}"${extra || ''}/>`;
const paTexte = (x, y, t, o) => { o = o || {}; return `<text x="${paF(x)}" y="${paF(y)}" text-anchor="${o.a || 'middle'}" font-family="${o.f || 'Space Grotesk,sans-serif'}" font-size="${o.s || 13}" font-weight="${o.b === false ? 400 : 700}" fill="${o.c || '#1C1B2E'}">${t}</text>`; };

/* =====================================================================
   1. Trouve le point de fuite
   ===================================================================== */
const PA_W = 600, PA_H = 380;
// Chaque scène : décor SVG, arêtes « fuyantes » cliquables { a, b, vp } et point(s) de fuite.
function paSceneCene(){
  const V = [300, 150], TL = [225, 85], TR = [375, 85], BR = [375, 205], BL = [225, 205];
  const bord = B => paDroite(V, B, PA_W, PA_H)[1]; // B prolongé jusqu'au cadre, du côté opposé à V
  const eTL = bord(TL), eTR = bord(TR), eBL = bord(BL), eBR = bord(BR);
  const A = []; let h = '';
  h += `<rect width="${PA_W}" height="${PA_H}" fill="#C9B79A"/>`;
  h += paPoly([TL, TR, eTR, [eTR[0], 0], [eTL[0], 0], eTL], '#B79B72'); // plafond
  h += paPoly([BL, BR, eBR, [PA_W, PA_H], [0, PA_H], eBL], '#8C6E4E'); // sol
  h += paPoly([TL, eTL, [0, 0], [0, eBL[1]], eBL, BL], '#C2AA84'); // mur de gauche
  h += paPoly([TR, eTR, [PA_W, 0], [PA_W, eBR[1]], eBR, BR], '#BEA47C'); // mur de droite
  h += paPoly([TL, TR, BR, BL], '#D8C7A6'); // mur du fond
  // Plafond à caissons : poutres qui s'enfoncent, et deux traverses.
  for(let x = 250; x <= 350; x += 25){ const P = [x, 85], E = bord(P); h += paLigne(P, E, '#8E7350', 2.2); A.push({ a: P, b: paK(V, P, 2.05), vp: 0 }); }
  [1.3, 1.75].forEach(k => { const g = paK(V, TL, k), d = paK(V, TR, k); h += paLigne(g, d, '#8E7350', 2); });
  // Arêtes plafond / murs, sol / murs.
  [TL, TR].forEach(P => { h += paLigne(P, bord(P), '#6E5638', 2.4); A.push({ a: P, b: paK(V, P, 2.2), vp: 0 }); });
  [BL, BR].forEach(P => { h += paLigne(P, bord(P), '#5C452C', 2.4); A.push({ a: P, b: paK(V, P, 1.3), vp: 0 }); });
  // Tapisseries sur les murs : bords haut et bas fuyants.
  [[1.12, 1.38], [1.5, 1.85], [2.0, 2.5]].forEach(([k1, k2], i) => [[225, -1], [375, 1]].forEach(([x]) => {
    const H1 = [x, 85 + .2 * 120], H2 = [x, 85 + .78 * 120];
    const q = [paK(V, H1, k1), paK(V, H1, k2), paK(V, H2, k2), paK(V, H2, k1)];
    h += paPoly(q, ['#4E6E8E', '#7A3B3B', '#4F7A4A'][i], ' stroke="#3B2C1C" stroke-width="1.2"');
    A.push({ a: q[0], b: q[1], vp: 0 }, { a: q[3], b: q[2], vp: 0 });
  }));
  // Mur du fond : trois fenêtres et le paysage.
  [[238, 262, 108, 160], [270, 330, 100, 172], [338, 362, 108, 160]].forEach(([x1, x2, y1, y2]) => {
    h += `<rect x="${x1}" y="${y1}" width="${x2 - x1}" height="${y2 - y1}" fill="#BFD9EA" stroke="#6E5638" stroke-width="2"/>`;
    h += `<path d="M${x1},${y2 - 14} q${(x2 - x1) / 3},-12 ${(x2 - x1) / 2},-4 t${(x2 - x1) / 2},-6 V${y2} H${x1} Z" fill="#7FA36B"/>`;
  });
  // Personnages derrière la table : le Christ au centre, la tête au point de fuite.
  const pers = (x, y, c, r) => `<path d="M${x - 16},228 Q${x - 14},${y + 10} ${x},${y + 8} Q${x + 14},${y + 10} ${x + 16},228 Z" fill="${c}"/><circle cx="${x}" cy="${y}" r="${r || 8.5}" fill="#E8C7A0" stroke="#7A5A3A" stroke-width=".8"/>`;
  [[118, 196, '#7A6A9A'], [146, 192, '#C08A3A'], [174, 198, '#4E7A5A'], [212, 194, '#9A4A3A'], [240, 199, '#3E5E8E'], [266, 193, '#B9A04A'],
   [334, 193, '#5E8A7A'], [360, 198, '#A65A4A'], [388, 192, '#6A6AA0'], [424, 197, '#8A7A3A'], [452, 193, '#4A6A9A'], [482, 198, '#9A5A7A']].forEach(([x, y, c]) => { h += pers(x, y, c); });
  h += `<path d="M276,228 Q280,170 300,164 Q320,170 324,228 Z" fill="#B23A2E"/><path d="M276,228 Q284,190 300,182 L300,228 Z" fill="#2F5E9E"/>`;
  h += `<circle cx="300" cy="${V[1]}" r="11" fill="#E8C7A0" stroke="#7A5A3A" stroke-width=".9"/><path d="M289,146 q11,-12 22,0" fill="none" stroke="#6B4A2A" stroke-width="3"/>`;
  // La table.
  h += `<rect x="92" y="222" width="416" height="8" fill="#EDE6D6"/><rect x="92" y="230" width="416" height="34" fill="#F7F3EA" stroke="#C9BFA8"/><path d="M92,264 h416" stroke="#B9AE96" stroke-width="2"/>`;
  return { titre: 'La salle (à la manière de La Cène, Léonard de Vinci, 1498)', vps: [V], decor: h, aretes: A, devine: true,
    fin: 'Toutes les lignes fuyantes passent par <b>le même point</b> : le point de fuite. Chez Léonard de Vinci, il est exactement sur <b>la tête du Christ</b> : sans s\'en rendre compte, le regard du spectateur y est conduit. La ligne d\'horizon (en bleu) est à la hauteur des yeux du peintre.' };
}
function paSceneCite(){
  const V = [300, 200], A = []; let h = '';
  h += `<defs><linearGradient id="paCiel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9EC6E6"/><stop offset="1" stop-color="#E9F1F6"/></linearGradient></defs>`;
  h += `<rect width="${PA_W}" height="${V[1]}" fill="url(#paCiel)"/><path d="M0,200 q90,-22 170,-8 t150,-6 t140,4 t140,-6 V200 Z" fill="#9DB28A"/>`;
  h += `<rect y="${V[1]}" width="${PA_W}" height="${PA_H - V[1]}" fill="#E4D8C2"/>`;
  // Dallage : lignes qui fuient vers V, et rangées de plus en plus serrées au loin.
  for(let x = -900; x <= 1500; x += 150){ const s = paDroite(V, [x, PA_H], PA_W, PA_H); if(!s) continue; h += paLigne([V[0] + (x - V[0]) * .02, V[1] + 3.6], s[1], '#B9A882', 1.2); if(x >= -300 && x <= 900 && x !== 300) A.push({ a: paK(V, [x, PA_H], .35), b: [x, PA_H], vp: 0 }); }
  for(let k = 0; k < 14; k++){ const y = V[1] + 180 * 5 / (5 + k); h += paLigne([0, y], [PA_W, y], '#B9A882', 1); }
  // Façades à gauche et à droite.
  [[40, -1], [560, 1]].forEach(([xn]) => {
    const N1 = [xn, 52], N2 = [xn, 336], t = (xn < 300 ? 205 : 395) - V[0], s = t / (xn - V[0]);
    const F1 = paK(V, N1, s), F2 = paK(V, N2, s);
    h += paPoly([N1, F1, F2, N2], xn < 300 ? '#E8D4B4' : '#DCC4A0', ' stroke="#9A7E58" stroke-width="1.5"');
    h += paPoly([[xn, 0], paK(V, [xn, 0], s), F1, N1], xn < 300 ? '#C9AE86' : '#BFA27A'); // toit
    A.push({ a: N1, b: F1, vp: 0 }, { a: N2, b: F2, vp: 0 });
    // Fenêtres en rangées (bords haut et bas fuyants) et arcades au rez-de-chaussée.
    const prof = [1, .78, .62, .5, .41]; // profondeurs (fractions de la façade, de l'avant vers le fond)
    [[.14, .3], [.42, .58]].forEach(([h1, h2]) => {
      const P1 = [xn, 52 + h1 * 284], P2 = [xn, 52 + h2 * 284];
      for(let j = 0; j < prof.length - 1; j++){
        const k1 = s + (1 - s) * prof[j] * .93, k2 = s + (1 - s) * (prof[j + 1] * 1.04);
        const q = [paK(V, P1, k1), paK(V, P1, k2), paK(V, P2, k2), paK(V, P2, k1)];
        h += paPoly(q, '#5E6E80', ' stroke="#7A5E3A" stroke-width="1"');
      }
      A.push({ a: paK(V, P1, s + (1 - s) * .9), b: paK(V, P1, s + (1 - s) * .45), vp: 0 });
    });
    const P3 = [xn, 52 + .72 * 284];
    h += paLigne(paK(V, P3, 1), paK(V, P3, s), '#9A7E58', 1.6); A.push({ a: paK(V, P3, 1), b: paK(V, P3, s), vp: 0 });
  });
  // Le temple rond au fond, porte au point de fuite.
  h += `<rect x="245" y="128" width="110" height="80" fill="#EFE3CC" stroke="#9A7E58"/>`;
  for(let x = 255; x <= 345; x += 18) h += paLigne([x, 132], [x, 208], '#C8B48E', 3);
  h += `<path d="M240,130 Q300,72 360,130 Z" fill="#C9AE86" stroke="#9A7E58"/><rect x="240" y="126" width="120" height="7" fill="#D8C29C"/>`;
  h += `<rect x="290" y="176" width="20" height="32" fill="#5A4632"/>`;
  return { titre: 'La place (à la manière de La Cité idéale, vers 1480)', vps: [V], decor: h, aretes: A, devine: true,
    fin: 'Le dallage, les façades, les fenêtres : toutes les fuyantes se rejoignent au point de fuite, placé sur <b>la porte du temple</b>, au centre du tableau. Les rangées du dallage se resserrent au loin : c\'est la méthode d\'Alberti (voir le pavement d\'Alberti, en 4e).' };
}
function paSceneAngle(){
  const L = [40, 215], R = [560, 215], Ft = [300, 70], Fb = [300, 336], A = []; let h = '';
  h += `<rect width="${PA_W}" height="${L[1]}" fill="#CFE3F1"/><rect y="${L[1]}" width="${PA_W}" height="${PA_H - L[1]}" fill="#B9BDB4"/>`;
  const sx = (P, X) => (X - P[0]) / (Ft[0] - P[0]); // paramètre du point d'abscisse X sur (P, avant)
  const sur = (P, Y, X) => paK(P, [300, Y], sx(P, X));
  [[L, 128, '#E2B887'], [R, 472, '#C99A66']].forEach(([P, Xf, c]) => {
    const top = sur(P, 70, Xf), bot = sur(P, 336, Xf);
    h += paPoly([Ft, top, bot, Fb], c, ' stroke="#7A5530" stroke-width="1.5"');
    A.push({ a: Ft, b: top, vp: P === L ? 0 : 1 }, { a: Fb, b: bot, vp: P === L ? 0 : 1 });
    // Fenêtres : rangées dont les bords haut et bas fuient vers le même point.
    const cols = [.92, .76, .62, .5, .4].map(f => 300 + (Xf - 300) * (1 - f));
    [[96, 128], [150, 182], [204, 236], [258, 290]].forEach(([y1, y2], r) => {
      for(let j = 0; j < cols.length - 1; j++){
        const xa = cols[j] + (cols[j + 1] - cols[j]) * .18, xb = cols[j] + (cols[j + 1] - cols[j]) * .82;
        h += paPoly([sur(P, y1, xa), sur(P, y1, xb), sur(P, y2, xb), sur(P, y2, xa)], '#46617A', ' stroke="#F3E6D2" stroke-width="1"');
      }
      if(r % 2 === 0) A.push({ a: sur(P, y1, cols[0]), b: sur(P, y1, cols[cols.length - 1]), vp: P === L ? 0 : 1 }, { a: sur(P, y2, cols[0]), b: sur(P, y2, cols[cols.length - 1]), vp: P === L ? 0 : 1 });
    });
  });
  h += paLigne(Ft, Fb, '#5A3E22', 2);
  // Trottoir au pied du bâtiment.
  h += paPoly([Fb, sur(L, 336, 128), sur(L, 350, 100), [300, 352], sur(R, 350, 500), sur(R, 336, 472)], '#D9D6CC', ' stroke="#9A9A90"');
  return { titre: 'Un bâtiment vu de l\'angle (perspective à deux points de fuite)', vps: [L, R], decor: h, aretes: A, devine: false,
    fin: 'Ici, il y a <b>deux points de fuite</b> : les fuyantes de la façade de gauche se rejoignent en un point, celles de la façade de droite en un autre. Les deux points de fuite sont <b>sur la ligne d\'horizon</b>, à la hauteur des yeux. Les arêtes verticales, elles, restent verticales.' };
}
const PA_SCENES = [paSceneCene, paSceneCite, paSceneAngle];

function paFuiteMonter(el){
  const st = { i: 0, sc: null, phase: 'devine', guess: null, traces: [], sol: false };
  el.innerHTML = `<div class="pa-box">
    <div class="pa-chips">${PA_SCENES.map((f, i) => `<button type="button" data-i="${i}">${['La salle', 'La place', 'Le bâtiment'][i]}</button>`).join('')}</div>
    <div class="pa-titre"></div><div class="pa-consigne"></div>
    <svg class="pa-svg" viewBox="0 0 ${PA_W} ${PA_H}"></svg>
    <div class="pa-msg" aria-live="polite"></div>
    <div class="pa-actions"><button type="button" class="btn secondary" data-a="sol"><span class="gicon">visibility</span> Montrer toutes les fuyantes</button>
      <button type="button" class="btn secondary" data-a="raz"><span class="gicon">restart_alt</span> Recommencer</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.pa-svg');
  const dire = (h, cls) => { const m = $('.pa-msg'); m.className = 'pa-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; };
  const besoin = () => st.sc.vps.length > 1 ? 'au moins deux bords de chaque façade' : 'au moins trois bords';
  const fini = () => st.sc.vps.every((V, v) => st.traces.filter(i => st.sc.aretes[i].vp === v).length >= (st.sc.vps.length > 1 ? 2 : 3));
  function consigne(){
    $('.pa-titre').innerHTML = st.sc.titre;
    $('.pa-consigne').innerHTML = st.phase === 'devine'
      ? '<b>À ton avis</b>, où se rejoignent les lignes du plafond, des murs et du sol ? <b>Clique à l\'endroit</b> où tu penses que se trouve le point de fuite.'
      : st.phase === 'trace' ? `Vérifie : clique sur les bords qui <b>s'enfoncent</b> dans le tableau (plafond, murs, sol, fenêtres…) pour les prolonger. Il en faut ${besoin()}.`
      : 'Tu peux continuer à prolonger d\'autres bords : ils passent tous par le point de fuite.';
  }
  function dessiner(){
    const sc = st.sc, couls = ['#D3302F', '#7A4FC0'];
    let h = sc.decor;
    const montre = st.sol ? sc.aretes.map((a, i) => i) : st.traces;
    montre.forEach(i => { const a = sc.aretes[i], s = paDroite(a.a, a.b, PA_W, PA_H); if(s) h += paLigne(s[0], s[1], couls[a.vp], st.sol && !st.traces.includes(i) ? 1 : 1.6, ' stroke-dasharray="6 4" opacity=".9"'); });
    st.traces.forEach(i => { const a = sc.aretes[i]; h += paLigne(a.a, a.b, couls[a.vp], 4, ' stroke-linecap="round"'); });
    if(st.phase === 'fini' || st.sol){
      h += paLigne([0, sc.vps[0][1]], [PA_W, sc.vps[0][1]], '#2F6FB3', 1.6, ' stroke-dasharray="10 5"') + paTexte(PA_W / 2, sc.vps[0][1] + 16, 'ligne d\'horizon', { s: 11, c: '#2F6FB3' });
      sc.vps.forEach((V, v) => { h += `<circle cx="${V[0]}" cy="${V[1]}" r="7" fill="#fff" stroke="${couls[v]}" stroke-width="3"/>` + paTexte(V[0], V[1] - 12, sc.vps.length > 1 ? 'F' + (v + 1) : 'F', { c: couls[v] }); });
    }
    if(st.guess) h += `<path d="M${st.guess[0] - 8},${st.guess[1] - 8} L${st.guess[0] + 8},${st.guess[1] + 8} M${st.guess[0] - 8},${st.guess[1] + 8} L${st.guess[0] + 8},${st.guess[1] - 8}" stroke="#1C1B2E" stroke-width="3.2" stroke-linecap="round"/><path d="M${st.guess[0] - 8},${st.guess[1] - 8} L${st.guess[0] + 8},${st.guess[1] + 8} M${st.guess[0] - 8},${st.guess[1] + 8} L${st.guess[0] + 8},${st.guess[1] - 8}" stroke="#FFD45E" stroke-width="1.6" stroke-linecap="round"/>`;
    // Zones cliquables, par-dessus le dessin.
    if(st.phase !== 'devine') sc.aretes.forEach((a, i) => { h += `<line class="pa-cible${st.traces.includes(i) ? ' fait' : ''}" data-i="${i}" x1="${paF(a.a[0])}" y1="${paF(a.a[1])}" x2="${paF(a.b[0])}" y2="${paF(a.b[1])}"/>`; });
    svg.innerHTML = h;
  }
  function charger(i){
    st.i = i; st.sc = PA_SCENES[i](); st.traces = []; st.guess = null; st.sol = false;
    st.phase = st.sc.devine ? 'devine' : 'trace';
    el.querySelectorAll('.pa-chips button').forEach(b => b.classList.toggle('on', +b.dataset.i === i));
    consigne(); dessiner(); dire('');
  }
  svg.onclick = e => {
    if(st.phase === 'devine'){ st.guess = paPoint(svg, e); st.phase = 'trace'; consigne(); dessiner(); dire('Ta réponse est marquée d\'une croix. Maintenant, vérifions !'); return; }
    const c = e.target.closest('.pa-cible'); if(!c) return;
    const i = +c.dataset.i; if(st.traces.includes(i)) return;
    st.traces.push(i);
    if(st.phase === 'trace' && fini()){
      st.phase = 'fini';
      let bilan = '';
      if(st.guess){ const V = st.sc.vps[0], d = Math.hypot(st.guess[0] - V[0], st.guess[1] - V[1]);
        bilan = d < 22 ? '<b>En plein dans le mille !</b> ' : d < 60 ? '<b>Pas loin du tout !</b> ' : 'Ta croix était un peu loin, mais maintenant tu sais le trouver. '; }
      dire('<span class="gicon">celebration</span> ' + bilan + st.sc.fin, 'ok');
    } else if(st.phase === 'trace') dire(st.traces.length === 1 ? 'Une droite… prolonge un autre bord.' : 'Les droites se croisent… continue pour voir si elles passent toutes par le même point.');
    consigne(); dessiner();
  };
  el.querySelectorAll('.pa-chips button').forEach(b => b.onclick = () => charger(+b.dataset.i));
  $('[data-a="sol"]').onclick = () => { st.sol = true; if(st.phase === 'devine') st.phase = 'trace'; dessiner(); dire(st.sc.fin, 'ok'); };
  $('[data-a="raz"]').onclick = () => charger(st.i);
  charger(0);
}

/* =====================================================================
   2. Dessine en perspective : centrale (point de fuite) ou cavalière
   ===================================================================== */
const PA_CW = 600, PA_CH = 360;
const PA_SOLIDES = [{ x: 60, y: 238, w: 104, h: 104, c: '#E35D3A', nom: 'le cube rouge' }, { x: 262, y: 118, w: 84, h: 224, c: '#2F6FB3', nom: 'la tour bleue' }, { x: 440, y: 52, w: 104, h: 66, c: '#1E8A6E', nom: 'la boîte verte' }];
const PA_CUBE_DEFIS = [
  { t: 'Place le point de fuite pour voir <b>le dessus</b> des trois solides.', ok: V => V[1] < 52 },
  { t: 'Place le point de fuite pour voir <b>le dessous</b> de la boîte verte et <b>le dessus</b> du cube rouge.', ok: V => V[1] > 118 && V[1] < 238 },
  { t: 'Fais en sorte de voir <b>le côté gauche</b> de la tour bleue et <b>le côté droit</b> du cube rouge.', ok: V => V[0] > 164 && V[0] < 262 },
  { t: 'Place le point de fuite <b>sur la face avant</b> de la tour bleue. Que vois-tu de la tour ?', ok: V => V[0] > 262 && V[0] < 346 && V[1] > 118 && V[1] < 342, bravo: 'De la tour, on ne voit plus que sa face avant : on la regarde <b>bien en face</b>, les yeux à sa hauteur.' }];
function paCubeMonter(el){
  const st = { V: [300, 150], mode: 'centrale', fuy: true, defi: 0, score: 0, tire: false };
  el.innerHTML = `<div class="pa-box">
    <div class="pa-chips"><button type="button" data-m="centrale" class="on">Perspective centrale (point de fuite)</button><button type="button" data-m="cavaliere">Perspective cavalière (cahier de maths)</button>
      <label class="pa-case"><input type="checkbox" checked data-a="fuy"> fuyantes</label><span class="pa-score"></span></div>
    <div class="pa-consigne"></div>
    <svg class="pa-svg pa-cube-svg" viewBox="0 0 ${PA_CW} ${PA_CH}"></svg>
    <div class="pa-msg" aria-live="polite"></div>
    <div class="pa-actions"><button type="button" class="btn secondary" data-a="defi"><span class="gicon">emoji_events</span> Défi suivant</button></div></div>`;
  const $ = s => el.querySelector(s), svg = $('.pa-svg');
  const dire = (h, cls) => { const m = $('.pa-msg'); m.className = 'pa-msg' + (cls ? ' ' + cls : ''); m.innerHTML = h; };
  function consigne(){
    $('.pa-consigne').innerHTML = st.mode === 'centrale'
      ? `<b>Fais glisser le point de fuite F</b> (ou clique ailleurs) : tout le dessin change. Dans la réalité, les arêtes qui s'enfoncent sont parallèles ; sur le dessin, elles se rejoignent en F, sur la ligne d'horizon.<br><span class="pa-defi"><span class="gicon">emoji_events</span> Défi ${st.defi + 1} / ${PA_CUBE_DEFIS.length} : ${PA_CUBE_DEFIS[st.defi].t}</span>`
      : 'En <b>perspective cavalière</b>, celle du cahier de maths, les fuyantes restent <b>parallèles</b> (ici à 45°) et sont réduites de moitié. C\'est moins réaliste, mais les faces avant gardent leurs vraies mesures : on peut y lire les longueurs.';
  }
  function dessiner(){
    const V = st.V, cav = st.mode === 'cavaliere';
    let h = `<rect width="${PA_CW}" height="${PA_CH}" fill="#F7F4EE"/>`;
    if(!cav) h += `<rect width="${PA_CW}" height="${paF(Math.max(0, Math.min(PA_CH, V[1])))}" fill="#E7F0F8"/>` + paLigne([0, V[1]], [PA_CW, V[1]], '#2F6FB3', 1.4, ' stroke-dasharray="9 5"') + paTexte(8, V[1] - 6, 'ligne d\'horizon', { a: 'start', s: 11, c: '#2F6FB3' });
    PA_SOLIDES.forEach(S => {
      const av = [[S.x, S.y], [S.x + S.w, S.y], [S.x + S.w, S.y + S.h], [S.x, S.y + S.h]]; // haut-gauche, haut-droit, bas-droit, bas-gauche
      const f = 300 / (300 + S.w), ar = av.map(P => cav ? [P[0] + S.w * .5 * Math.SQRT1_2, P[1] - S.w * .5 * Math.SQRT1_2] : paK(V, P, f));
      const vis = cav ? { haut: true, droite: true, bas: false, gauche: false }
        : { haut: V[1] < S.y, bas: V[1] > S.y + S.h, gauche: V[0] < S.x, droite: V[0] > S.x + S.w };
      const faces = { haut: [0, 1], droite: [1, 2], bas: [2, 3], gauche: [3, 0] };
      if(st.fuy) av.forEach((P, j) => { const s = cav ? paDroite(P, ar[j], PA_CW, PA_CH) : [P, V]; if(s) h += paLigne(cav ? P : P, cav ? s[1] : V, '#9AA5B4', .8, ' stroke-dasharray="3 3"'); });
      // Arêtes cachées (pointillés) : celles qui ne bordent aucune face vue (la face arrière ne se voit jamais).
      const vues = Object.keys(faces).filter(n => vis[n]).map(n => faces[n]);
      for(let j = 0; j < 4; j++){
        const k = (j + 1) % 4;
        if(!vues.some(f => f.includes(j) && f.includes(k))) h += paLigne(ar[j], ar[k], '#5B6472', 1.2, ' stroke-dasharray="5 4"'); // arête du fond
        if(!vues.some(f => f.includes(j))) h += paLigne(av[j], ar[j], '#5B6472', 1.2, ' stroke-dasharray="5 4"'); // arête fuyante
      }
      Object.keys(faces).forEach(n => { if(!vis[n]) return; const [a, b] = faces[n];
        h += paPoly([av[a], av[b], ar[b], ar[a]], S.c, ` fill-opacity="${n === 'haut' ? .45 : n === 'bas' ? .3 : .62}" stroke="#1C1B2E" stroke-width="1.6" stroke-linejoin="round"`); });
      h += paPoly(av, S.c, ' fill-opacity=".9" stroke="#1C1B2E" stroke-width="1.8" stroke-linejoin="round"');
    });
    if(!cav) h += `<g class="pa-poignee"><circle cx="${paF(V[0])}" cy="${paF(V[1])}" r="13" fill="rgba(211,48,47,.15)"/><circle cx="${paF(V[0])}" cy="${paF(V[1])}" r="6.5" fill="#D3302F" stroke="#fff" stroke-width="2"/></g>` + paTexte(V[0] + 13, V[1] - 9, 'F', { c: '#D3302F', a: 'start' });
    svg.innerHTML = h;
  }
  const deplacer = e => { st.V = paPoint(svg, e).map((v, i) => Math.max(4, Math.min(i ? PA_CH - 4 : PA_CW - 4, v))); dessiner(); };
  const verifier = () => {
    if(st.mode !== 'centrale') return;
    const d = PA_CUBE_DEFIS[st.defi];
    if(d.ok(st.V)){ if(!d.reussi){ d.reussi = true; st.score++; } $('.pa-score').textContent = '⭐ ' + st.score; dire('<span class="gicon">celebration</span> Défi réussi ! ' + (d.bravo || 'Regarde quelles faces on voit, et lesquelles sont cachées (en pointillés).'), 'ok'); }
    else dire('');
  };
  svg.addEventListener('pointerdown', e => { if(st.mode !== 'centrale') return; st.tire = true; svg.setPointerCapture(e.pointerId); deplacer(e); });
  svg.addEventListener('pointermove', e => { if(st.tire) deplacer(e); });
  svg.addEventListener('pointerup', () => { if(!st.tire) return; st.tire = false; verifier(); });
  el.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { st.mode = b.dataset.m; el.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); $('[data-a="defi"]').hidden = st.mode !== 'centrale'; consigne(); dessiner(); dire(''); });
  $('[data-a="fuy"]').onchange = e => { st.fuy = e.target.checked; dessiner(); };
  $('[data-a="defi"]').onclick = () => { st.defi = (st.defi + 1) % PA_CUBE_DEFIS.length; consigne(); dire(''); };
  consigne(); dessiner();
}

/* =====================================================================
   3. Le pavement d'Alberti (1435) : perspective et Thalès
   ===================================================================== */
const PA_AW = 640, PA_AH = 384;
const PA_AL = { V: [320, 120], y0: 340, x0: 140, c: 60, n: 6, d: 300 }; // ligne de terre y0, carreaux de c, œil à d du tableau
function paAlbertiGeo(){
  const { V, y0, x0, c, n, d } = PA_AL, G = [...Array(n + 1)].map((_, i) => [x0 + c * i, y0]), D = [V[0] + d, V[1]];
  // Rangée k : là où la diagonale (G0, D) coupe la k-ième fuyante.
  const Y = [y0]; for(let k = 1; k <= n; k++) Y.push(paInter(G[0], D, G[k], V)[1]);
  const surF = (i, y) => [V[0] + (G[i][0] - V[0]) * (y - V[1]) / (y0 - V[1]), y]; // point d'ordonnée y sur la fuyante i
  return { G, D, Y, surF };
}
const PA_AL_ETAPES = [
  { note: 'Le tableau est une <b>fenêtre</b> ouverte sur le monde (Alberti, <i>De pictura</i>, 1435). En bas, la <b>ligne de terre</b> : on la partage en carreaux égaux, ici 6 carreaux de même largeur.' },
  { note: 'On trace la <b>ligne d\'horizon</b>, à la hauteur des yeux du peintre, et sur elle le <b>point de fuite</b> F, juste en face de l\'œil.' },
  { note: 'On relie chaque division de la ligne de terre au point de fuite : ce sont les <b>fuyantes</b>. Dans la réalité, ce sont les joints parallèles du carrelage qui s\'éloignent.' },
  { note: 'Pour savoir où placer les rangées, on trace une <b>diagonale</b> du carrelage : elle part du coin et file vers le <b>point de distance</b> D, sur l\'horizon (FD est la distance entre l\'œil et le tableau : ici 5 carreaux).' },
  { note: 'La diagonale coupe chaque fuyante à la hauteur d\'une nouvelle rangée : on trace ces <b>horizontales</b>. Le carrelage est construit : ses rangées se resserrent au loin.' },
  { note: '' }, // mesure (complétée par paAlbertiNoteMesure)
  { note: '<b>Thalès</b> : la rangée 2 est parallèle à la ligne de terre, dans le triangle F G₀ G₆. Donc <span class="pa-f">largeur de la rangée 2 ÷ G₀G₆ = FL ÷ FG₀</span>, et ce rapport est aussi celui des hauteurs sous l\'horizon. Ici : <span class="pa-f">LR ÷ G₀G₆ ≈ 257 ÷ 360 ≈ 0,71</span> et <span class="pa-f">h₂ ÷ h₀ ≈ 157 ÷ 220 ≈ 0,71</span> (c\'est 5 ÷ 7). Toutes les longueurs de la rangée sont réduites dans le même rapport.' },
  { note: '<b>Plus loin, plus petit</b> : trois colonnes identiques, posées sur les rangées 0, 3 et 6. Sur le tableau, leur hauteur est inversement proportionnelle à leur distance à l\'œil (5, 8 et 11 carreaux) : <span class="pa-f">150 × 5 ≈ 94 × 8 ≈ 68 × 11 ≈ 750</span>. Les peintres de la Renaissance appliquaient, sans le nommer, le <b>théorème de Thalès</b>.' }];
function paAlbertiDessin(e){
  const { V, y0, x0, c, n } = PA_AL, { G, D, Y, surF } = paAlbertiGeo(), A = PA_AW;
  let h = `<rect width="${A}" height="${PA_AH}" fill="#FBF8F1"/>`;
  if(e >= 4){ for(let k = 0; k < n; k++) for(let i = 0; i < n; i++){ if((i + k) % 2) continue; h += paPoly([surF(i, Y[k]), surF(i + 1, Y[k]), surF(i + 1, Y[k + 1]), surF(i, Y[k + 1])], '#C9A27A', ' fill-opacity=".55"'); } }
  h += paLigne([x0 - 40, y0], [x0 + c * n + 40, y0], '#1C1B2E', 2.2);
  G.forEach((P, i) => { h += paLigne([P[0], y0 - 5], [P[0], y0 + 5], '#1C1B2E', 1.6); if(e < 6) h += paTexte(P[0], y0 + 20, 'G' + '₀₁₂₃₄₅₆'[i], { s: 11, c: '#5B6472', b: false }); });
  if(e === 0) for(let i = 0; i < n; i++) h += paTexte(x0 + c * (i + .5), y0 + 34, '1', { s: 11, c: '#B7791F' });
  if(e >= 1){ h += paLigne([0, V[1]], [A, V[1]], '#2F6FB3', 1.6, ' stroke-dasharray="10 5"') + paTexte(8, V[1] - 7, 'ligne d\'horizon', { a: 'start', s: 11, c: '#2F6FB3' });
    h += `<circle cx="${V[0]}" cy="${V[1]}" r="5.5" fill="#D3302F"/>` + paTexte(V[0], V[1] - 11, 'F', { c: '#D3302F' }); }
  if(e >= 2) G.forEach(P => { h += paLigne(P, V, e >= 4 ? '#8C6E4E' : '#D3302F', e >= 4 ? 1.2 : 1.5); });
  if(e >= 3 && e < 6){ h += paLigne(G[0], D, '#7A4FC0', 1.8) + `<circle cx="${D[0]}" cy="${D[1]}" r="5.5" fill="#7A4FC0"/>` + paTexte(D[0], D[1] - 11, 'D', { c: '#7A4FC0' });
    if(e === 3) for(let k = 1; k <= n; k++){ const P = surF(k, Y[k]); h += `<circle cx="${paF(P[0])}" cy="${paF(P[1])}" r="4" fill="#7A4FC0"/>`; } }
  if(e >= 4) for(let k = 1; k <= n; k++) h += paLigne(surF(0, Y[k]), surF(n, Y[k]), '#8C6E4E', 1.3);
  if(e === 5){ // hauteurs sous l'horizon, mesurées à gauche du carrelage
    [0, 1, 2, 6].forEach(k => { const yk = Y[k], g = surF(0, yk)[0];
      h += paLigne([96, yk], [g - 4, yk], '#9AA5B4', .8, ' stroke-dasharray="2 3"') + paTexte(g + (surF(n, yk)[0] - g) / 2, yk - 4, 'rangée ' + k, { s: 10, c: '#5B6472', b: false }); });
    h += paLigne([110, V[1]], [110, Y[0]], '#1E7B34', 1.8) + paTexte(102, (V[1] + Y[0]) / 2, 'h₀', { a: 'end', c: '#1E7B34', s: 13 });
    h += paLigne([124, V[1]], [124, Y[2]], '#E67E22', 2.4) + paTexte(132, V[1] + 30, 'h₂', { a: 'start', c: '#E67E22', s: 13 });
  }
  if(e === 6){ // Thalès dans le triangle F G0 G6, rangée 2
    h += paPoly([V, G[0], G[n]], '#E67E22', ' fill-opacity=".12" stroke="#E67E22" stroke-width="2"');
    const L = surF(0, Y[2]), Rr = surF(n, Y[2]);
    h += paLigne(L, Rr, '#2F6FB3', 3.2) + paTexte(L[0] - 10, L[1] + 4, 'L', { a: 'end', c: '#2F6FB3' }) + paTexte(Rr[0] + 10, Rr[1] + 4, 'R', { a: 'start', c: '#2F6FB3' });
    h += paLigne(G[0], G[n], '#1E7B34', 3.2) + paTexte(G[0][0] - 10, G[0][1] + 4, 'G₀', { a: 'end', c: '#1E7B34' }) + paTexte(G[n][0] + 10, G[n][1] + 4, 'G₆', { a: 'start', c: '#1E7B34' });
    const lr = Rr[0] - L[0], gg = G[n][0] - G[0][0];
    h += paTexte(V[0], Y[2] - 10, 'LR ≈ ' + Math.round(lr) + ' px', { c: '#2F6FB3', s: 12 }) + paTexte(V[0], y0 + 24, 'G₀G₆ = ' + gg + ' px', { c: '#1E7B34', s: 12 });
  }
  if(e === 7){ // colonnes identiques à trois profondeurs
    [[0, 1], [3, 3], [6, 5]].forEach(([k, i]) => {
      const base = surF(i, Y[k]), ech = (Y[k] - V[1]) / (y0 - V[1]), H = 150 * ech, W = 26 * ech;
      h += `<rect x="${paF(base[0] - W / 2)}" y="${paF(base[1] - H)}" width="${paF(W)}" height="${paF(H)}" fill="#EFE3CC" stroke="#7A5E3A" stroke-width="1.3"/>`
        + `<rect x="${paF(base[0] - W * .75)}" y="${paF(base[1] - H - 6 * ech)}" width="${paF(W * 1.5)}" height="${paF(6 * ech)}" fill="#D8C29C" stroke="#7A5E3A"/>`
        + paTexte(base[0] + W, base[1] - H / 2, Math.round(H) + ' px', { a: 'start', s: 11, c: '#7A5E3A' });
    });
  }
  return h;
}
function paAlbertiNoteMesure(){
  const { V, d, c } = PA_AL, { Y } = paAlbertiGeo(), e = d / c; // distance œil - tableau, en carreaux
  const lignes = [0, 1, 2, 3, 4, 6].map(k => { const hk = Y[k] - V[1], dist = e + k; return `<tr><td>${k}</td><td>${dist}</td><td>${Math.round(hk * 10) / 10}</td><td><b>${Math.round(hk * dist)}</b></td></tr>`; }).join('');
  return `On mesure, pour chaque rangée, sa <b>hauteur sous l'horizon</b> sur le tableau (en pixels) et sa <b>distance à l'œil</b> (en carreaux : 5 jusqu'au tableau, plus le numéro de la rangée).
    <table class="pa-tab"><tr><th>rangée</th><th>distance à l'œil</th><th>hauteur h</th><th>distance × h</th></tr>${lignes}</table>
    Le produit est toujours le même : la hauteur sur le tableau est <b>inversement proportionnelle</b> à la distance. Deux fois plus loin, deux fois plus petit.`;
}
function paAlbertiMonter(el){
  const st = { e: 0 };
  el.innerHTML = `<div class="pa-box">
    <svg class="pa-svg" viewBox="0 0 ${PA_AW} ${PA_AH}"></svg>
    <div class="pa-note step-note"></div>
    <div class="pa-actions"><button type="button" class="btn" data-a="suiv">Étape suivante →</button><button type="button" class="btn secondary" data-a="raz">Recommencer</button><span class="pa-etape"></span></div></div>`;
  const $ = s => el.querySelector(s);
  const aller = e => {
    st.e = e; $('.pa-svg').innerHTML = paAlbertiDessin(e);
    $('.pa-note').innerHTML = e === 5 ? paAlbertiNoteMesure() : PA_AL_ETAPES[e].note;
    $('[data-a="suiv"]').disabled = e >= PA_AL_ETAPES.length - 1;
    $('.pa-etape').textContent = 'Étape ' + (e + 1) + ' / ' + PA_AL_ETAPES.length;
  };
  $('[data-a="suiv"]').onclick = () => { if(st.e < PA_AL_ETAPES.length - 1) aller(st.e + 1); };
  $('[data-a="raz"]').onclick = () => aller(0);
  aller(0);
}

/* ---------- Construction des méthodes présentes dans un conteneur ---------- */
function paInitTout(racine){
  if(!racine) return;
  racine.querySelectorAll('.pa-fuite').forEach(paFuiteMonter);
  racine.querySelectorAll('.pa-cube').forEach(paCubeMonter);
  racine.querySelectorAll('.pa-alberti').forEach(paAlbertiMonter);
}

(function paStyles(){
  const s = document.createElement('style');
  s.textContent = `
    .pa-box{ display:flex; flex-direction:column; gap:10px; }
    .pa-chips{ display:flex; flex-wrap:wrap; gap:6px; align-items:center; }
    .pa-chips button{ border:1.5px solid rgba(31,58,92,.25); background:#fff; color:#1F3A5C; border-radius:999px; padding:5px 12px; font:600 .85rem Inter,sans-serif; cursor:pointer; }
    .pa-chips button.on{ background:#1F3A5C; color:#fff; border-color:#1F3A5C; }
    .pa-case{ display:inline-flex; align-items:center; gap:5px; font-size:.85rem; color:#4E5665; margin-left:6px; }
    .pa-score{ margin-left:auto; font:700 .95rem 'Space Grotesk',sans-serif; color:#B7791F; }
    .pa-titre{ font:700 .95rem 'Space Grotesk',sans-serif; color:#5B3A1E; }
    .pa-consigne{ font-size:.95rem; line-height:1.5; }
    .pa-defi{ display:inline-block; margin-top:6px; background:#FFF6DF; border:1px solid #F0D58A; border-radius:8px; padding:3px 9px; }
    .pa-defi .gicon{ font-size:17px; vertical-align:-3px; color:#B7791F; }
    .pa-svg{ width:100%; max-width:680px; display:block; margin:0 auto; border-radius:10px; box-shadow:0 1px 6px rgba(28,27,46,.15); touch-action:none; user-select:none; }
    .pa-cube-svg{ cursor:crosshair; }
    .pa-cible{ stroke:transparent; stroke-width:14; stroke-linecap:round; cursor:pointer; }
    .pa-cible:hover{ stroke:rgba(255,212,94,.75); }
    .pa-cible.fait{ cursor:default; } .pa-cible.fait:hover{ stroke:transparent; }
    .pa-msg{ min-height:1.4em; text-align:center; font-size:.95rem; line-height:1.5; } .pa-msg .gicon{ font-size:18px; vertical-align:-3px; }
    .pa-msg.ok{ color:#1E5E30; } .pa-msg.ko{ color:#B3261E; }
    .pa-actions{ display:flex; gap:8px; flex-wrap:wrap; justify-content:center; align-items:center; }
    .pa-etape{ font:600 .82rem 'JetBrains Mono',monospace; color:#5B6472; }
    .pa-note{ text-align:center; min-height:3.2em; line-height:1.55; }
    .pa-tab{ margin:8px auto; border-collapse:collapse; font-size:.88rem; } .pa-tab th, .pa-tab td{ border:1px solid #D5DEE9; padding:3px 10px; text-align:center; } .pa-tab th{ background:#EEF4FB; }
    .pa-f{ white-space:nowrap; font-weight:600; }
    .pa-hist p{ margin:6px 0 10px; line-height:1.6; }
    .pa-hist-h{ font:700 1rem 'Space Grotesk',sans-serif; color:#5B3A1E; margin:16px 0 4px; }
    .pa-hist-fig svg{ width:100%; max-width:560px; display:block; margin:6px auto; border-radius:10px; box-shadow:0 1px 4px rgba(28,27,46,.12); }
    .pa-hist-a-toi{ margin-top:14px; background:#FFF6DF; border:1px solid #F0D58A; border-radius:10px; padding:10px 14px; line-height:1.55; }
    .pa-hist-a-toi .gicon{ color:#B7791F; vertical-align:-4px; }
  `;
  document.head.appendChild(s);
})();

/* =====================================================================
   Onglet Histoire -- demandé : « Oui, fais la page Histoire aussi ». La même page dans les chapitres qui
   ont les méthodes « Maths et arts » (6e Solides, 5e Espace, 4e Triangles et parallèles, 3e Thalès) :
   les chapitres l'ajoutent à leur onglet Histoire (perspective-arts.js est chargé avant eux).
   ===================================================================== */
const PA_HISTOIRE_HTML = `
<div class="history-box pa-hist">
  <div class="history-title"><span class="gicon">palette</span> Maths et arts : la perspective, une invention de peintres-géomètres</div>
  <p><b>Avant la Renaissance</b>, les peintres ne cherchent pas à imiter ce que voit l'œil : au Moyen Âge, un personnage est souvent dessiné d'autant plus grand qu'il est important. Vers 1300, le Florentin <b>Giotto</b> donne de la profondeur à ses scènes, mais « à l'œil », sans règle : ses lignes fuyantes ne se rejoignent pas en un seul point.</p>

  <h4 class="pa-hist-h">Brunelleschi et l'expérience du miroir (Florence, vers 1415)</h4>
  <div class="pa-hist-fig"><svg viewBox="0 0 520 150" role="img" aria-label="L'expérience de Brunelleschi : l'œil regarde par un trou du tableau, à travers le panneau, l'image du tableau dans un miroir, qui se superpose au baptistère.">
    <rect width="520" height="150" fill="#F7F3EA"/>
    <circle cx="28" cy="78" r="9" fill="#fff" stroke="#1C1B2E" stroke-width="1.6"/><circle cx="31" cy="78" r="3.5" fill="#1C1B2E"/><text x="28" y="108" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">l'œil</text>
    <rect x="58" y="30" width="9" height="96" fill="#C9A27A" stroke="#7A5530"/><circle cx="62.5" cy="78" r="2.4" fill="#F7F3EA"/><text x="62" y="22" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">tableau percé</text>
    <rect x="178" y="36" width="5" height="84" fill="#9EC6E6" stroke="#2F6FB3"/><text x="180" y="28" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#2F6FB3">miroir</text>
    <path d="M37,78 L178,78" stroke="#D3302F" stroke-width="1.4" stroke-dasharray="5 3"/>
    <path d="M378,120 L378,62 Q420,26 462,62 L462,120 Z" fill="#EFE3CC" stroke="#7A5530"/><rect x="408" y="88" width="24" height="32" fill="#7A5530"/><text x="420" y="140" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">le baptistère, au loin</text>
    <path d="M183,78 L378,78" stroke="#9AA5B4" stroke-width="1" stroke-dasharray="3 4"/>
    <text x="280" y="70" text-anchor="middle" font-size="10.5" font-family="Inter,sans-serif" fill="#5B6472">on abaisse le miroir : le vrai bâtiment</text><text x="280" y="96" text-anchor="middle" font-size="10.5" font-family="Inter,sans-serif" fill="#5B6472">et sa peinture se superposent</text>
  </svg></div>
  <p>L'architecte <b>Filippo Brunelleschi</b> peint le baptistère de Florence sur un petit panneau, en suivant des règles géométriques. Il perce un trou au <b>point de fuite</b> et demande au spectateur de regarder, par l'arrière du panneau, le reflet de la peinture dans un miroir. En retirant le miroir, on voit le vrai baptistère : la peinture et le monument se superposent exactement. La perspective vient de naître !</p>

  <h4 class="pa-hist-h">Alberti : le tableau est une fenêtre (1435)</h4>
  <p>Dans son livre <i>De pictura</i> (« De la peinture »), <b>Leon Battista Alberti</b> écrit la première méthode : le tableau est « une fenêtre ouverte » à travers laquelle on regarde la scène. Il explique comment dessiner un <b>carrelage</b> : ligne de terre, point de fuite, puis une diagonale pour placer les rangées. C'est la construction de la méthode « Le pavement d'Alberti » ; elle repose sur ce que nous appelons aujourd'hui le <b>théorème de Thalès</b>.</p>

  <h4 class="pa-hist-h">Piero della Francesca, peintre et mathématicien</h4>
  <p><b>Piero della Francesca</b> (vers 1412-1492) est à la fois un grand peintre et un mathématicien : il écrit un traité de perspective pour les peintres (<i>De prospectiva pingendi</i>), mais aussi des livres de calcul et un traité sur les <b>polyèdres réguliers</b>. Ses tableaux sont construits comme des figures de géométrie. Au même moment, à Urbino, un peintre resté inconnu peint <b>La Cité idéale</b> : une place parfaite, toute en fuyantes, dont le point de fuite est la porte d'un temple rond.</p>

  <h4 class="pa-hist-h">Léonard de Vinci et La Cène (Milan, 1495-1498)</h4>
  <p>Dans <b>La Cène</b>, toutes les lignes du plafond, des murs et des tapisseries conduisent le regard vers <b>la tête du Christ</b>, au centre. Les restaurateurs ont même retrouvé, dans l'enduit, à cet endroit, la trace d'un <b>clou</b> : Léonard y avait sans doute attaché des fils tendus pour tracer ses fuyantes, exactement comme on le fait dans la méthode « Trouve le point de fuite ».</p>

  <h4 class="pa-hist-h">Dürer et ses machines à dessiner (1525)</h4>
  <div class="pa-hist-fig"><svg viewBox="0 0 520 150" role="img" aria-label="La machine de Dürer : un fil tendu d'un clou au mur vers l'objet traverse un cadre ; on note le point où il traverse le cadre.">
    <rect width="520" height="150" fill="#F7F3EA"/>
    <rect x="490" y="10" width="10" height="130" fill="#D8C7A6"/><circle cx="490" cy="46" r="4" fill="#5A3E22"/><text x="478" y="36" text-anchor="end" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">clou (l'œil)</text>
    <rect x="270" y="30" width="96" height="96" fill="none" stroke="#7A5530" stroke-width="4"/><text x="318" y="144" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">le cadre (le tableau)</text>
    <path d="M60,104 q36,-58 96,-34 q30,14 40,30 q-62,32 -136,4 Z" fill="#C08A3A" stroke="#7A5530"/><path d="M156,70 l60,-26" stroke="#7A5530" stroke-width="5" stroke-linecap="round"/><text x="120" y="132" text-anchor="middle" font-size="11" font-family="Inter,sans-serif" fill="#5B6472">un luth</text>
    <path d="M490,46 L196,96" stroke="#D3302F" stroke-width="1.5"/><circle cx="${paF(490 + (318 - 490))}" cy="${paF(46 + (318 - 490) * (96 - 46) / (196 - 490))}" r="4.5" fill="#D3302F"/>
    <text x="376" y="104" font-size="10.5" font-family="Inter,sans-serif" fill="#D3302F">le fil traverse le cadre ici :</text><text x="376" y="117" font-size="10.5" font-family="Inter,sans-serif" fill="#D3302F">on marque le point</text>
  </svg></div>
  <p>Le peintre allemand <b>Albrecht Dürer</b> publie en 1525 un livre de géométrie pour les artistes. Une de ses gravures montre deux hommes dessinant un <b>luth</b> (encore la musique !) : un fil part d'un clou planté au mur, qui joue le rôle de l'œil, et va toucher un point du luth. On note l'endroit où le fil traverse un cadre ; point après point, le dessin en perspective apparaît sur le cadre. C'est exactement une <b>projection</b> : chaque point de l'objet est relié à l'œil.</p>

  <h4 class="pa-hist-h">Des peintres aux mathématiciens… et aux jeux vidéo</h4>
  <p>Au 17e siècle, le Lyonnais <b>Girard Desargues</b> fait de la perspective une branche des mathématiques : pour lui, des droites parallèles se rejoignent en un <b>point à l'infini</b>, comme les fuyantes au point de fuite. Au 19e siècle, <b>Jean-Victor Poncelet</b> en fait la <b>géométrie projective</b>. Aujourd'hui, chaque image d'un jeu vidéo en 3D est calculée de la même façon : pour dessiner un objet, l'ordinateur divise ses dimensions par sa distance à la caméra. Plus loin, plus petit… comme chez Alberti.</p>

  <div class="pa-hist-a-toi"><span class="gicon">science</span> <b>À toi !</b> Colle une feuille de calque ou de plastique transparent sur une vitre qui donne sur une rue ou un couloir. Ferme un œil, garde la tête immobile, et décalque au feutre les bords des trottoirs, des toits, des fenêtres. Prolonge ensuite tes traits à la règle : où se rejoignent-ils ? Tu viens de refaire l'expérience des peintres de la Renaissance.</div>
</div>`;

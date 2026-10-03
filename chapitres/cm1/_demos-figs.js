/* ============================================================
   chapitres/cm1/_demos-figs.js -- Les dessins des méthodes pas à pas du primaire (CE2, CM1, CM2).

   Demandé : « Sur la copie d'écran, il y a des consignes sans illustrations. C'est compliqué. »
   Chaque méthode (cm1Chapitre › demos) reçoit ici un dessin par étape, affiché à droite des lignes
   (app.js › stepAvecFig) ; une étape sans dessin garde celui de l'étape précédente.
   DF(id, [dessin étape 1, dessin étape 2, …]) ; null = on garde le dessin précédent.
   Outils : cmFig, cmSauts (chapitres/cm1/_commun.js), cm1Bande, cm1Disque, cm1Paquets, cm1Quad,
   cm1Axe, cm1RegleGraduee, cm1Balance, cm1Tableau.
   ============================================================ */
(() => {
const DEMO_FIGS = {};
const DF = (id, figs) => { DEMO_FIGS[id] = figs; };
const K = CMF_K, Ro = CMF_R, Bl = CMF_B, Ve = CMF_V, Vi = CMF_VI, Or = CMF_O;
const Q = (w, h, items, k) => cmFig({ w, h, k: k || 24 }, items);
const D = (w, h, items, px) => cmFig({ w, h, px }, items); // dessin libre, coordonnées en pixels
const rang = (...l) => `<div style="display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;">${l.join('')}</div>`;
// Bande de fraction à taille fixe (cm1Bande prend sinon un pourcentage de la place disponible).
const bd = (n, k, o) => { o = o || {}; const L = o.largeur || 240, nb = Math.max(1, Math.ceil(k / n)); return cm1Bande(n, k, o).replace(/style="width:[^;]*;max-width:[^;]*;/, `style="width:${nb * (L + 14)}px;max-width:100%;`); };
// Droite graduée et schéma en barres à leur vraie largeur (sinon « width:100% » les écrase à côté du texte).
const larg = h => h.replace(/style="width:100%;max-width:(\d+)px;/, (m, w) => `style="width:${w}px;max-width:100%;`);
const AX = (...a) => larg(cm1Axe(...a)), PQ = (...a) => larg(cm1Paquets(...a));
const pile = (...l) => `<div style="display:flex;flex-direction:column;gap:6px;align-items:center;">${l.join('')}</div>`;
const tx = (t, c, fs) => `<div style="font:700 ${fs || 15}px 'Space Grotesk',sans-serif;color:${c || K};">${t}</div>`;
const fr = (a, b) => `<span class="tex">\\dfrac{${a}}{${b}}</span>`;
const hm = m => { const h = Math.floor(m / 60), r = Math.round(m % 60); return r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`; };
// Horloge à aiguilles (h, m) ; o.taille.
function horl(h, m, o){ o = o || {}; const t = o.taille || 130, R = Math.PI / 180; let s = `<svg class="pl-libre" viewBox="0 0 120 120" style="width:${t}px;display:inline-block;vertical-align:middle;"><circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="${K}" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * 6 * R, g = i % 5 === 0, r1 = g ? 47 : 51; s += `<line x1="${60 + r1 * Math.sin(a)}" y1="${60 - r1 * Math.cos(a)}" x2="${60 + 54 * Math.sin(a)}" y2="${60 - 54 * Math.cos(a)}" stroke="${K}" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * 30 * R; s += `<text x="${60 + 38 * Math.sin(a)}" y="${60 - 38 * Math.cos(a) + 4}" font-size="11" text-anchor="middle" fill="${K}" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
  const ah = ((h % 12) + m / 60) * 30 * R, am = m * 6 * R;
  return s + `<line x1="60" y1="60" x2="${60 + 26 * Math.sin(ah)}" y2="${60 - 26 * Math.cos(ah)}" stroke="${Ro}" stroke-width="5" stroke-linecap="round"/><line x1="60" y1="60" x2="${60 + 44 * Math.sin(am)}" y2="${60 - 44 * Math.cos(am)}" stroke="${Bl}" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="${K}"/></svg>`; }
// Frise du temps : minutes depuis minuit ; bonds [[durée en min, étiquette]].
const frise = (deb, fin, depart, bonds, pas, px) => cmSauts(deb, fin, depart, bonds, { pas: pas || 10, fmt: hm, px: px || 440 });
// Frise à bonds (comme dans le cours, chaque bond a la même largeur) : bonds = [[de, à, étiquette]] ; o.recul : on remonte le temps.
function friseB(bonds, o){ o = o || {}; const n = bonds.length, W = 110 + n * 130, H = 92; let s = `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:inline-block;vertical-align:middle;"><line x1="14" y1="62" x2="${W - 14}" y2="62" stroke="${K}" stroke-width="2"/>`;
  bonds.forEach(([de, a, lab], i) => { const x1 = 30 + i * 130, x2 = x1 + 130, c = o.recul ? Ro : Ve;
    if(i === 0) s += `<line x1="${x1}" y1="54" x2="${x1}" y2="70" stroke="${K}" stroke-width="2"/><text x="${x1}" y="86" font-size="14" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${de}</text>`;
    s += `<line x1="${x2}" y1="54" x2="${x2}" y2="70" stroke="${K}" stroke-width="2"/><text x="${x2}" y="86" font-size="14" text-anchor="middle" font-weight="700" fill="${i === n - 1 ? Ro : K}" font-family="Space Grotesk">${a}</text>`
      + `<path d="M${x1 + 4} 54 Q${(x1 + x2) / 2} 12 ${x2 - 4} 54" fill="none" stroke="${c}" stroke-width="2.2"/>` + (o.recul ? `<polygon points="${x1 + 4},54 ${x1 + 12},45 ${x1 + 2},43" fill="${c}"/>` : `<polygon points="${x2 - 4},54 ${x2 - 12},45 ${x2 - 2},43" fill="${c}"/>`)
      + `<text x="${(x1 + x2) / 2}" y="28" font-size="14" text-anchor="middle" font-weight="700" fill="${c}" font-family="Space Grotesk">${lab}</text>`; });
  return s + '</svg>'; }
// Pièces et billets : liste de valeurs en euros (0.5 = 50 c…).
function monnaie(l){ let x = 6, s = ''; const H = 64;
  l.forEach(v => { if(v >= 5){ s += `<rect x="${x}" y="10" width="78" height="44" rx="5" fill="${v === 5 ? '#B9C7D6' : v === 10 ? '#F4B6A8' : '#9CC9E8'}" stroke="${K}"/><text x="${x + 39}" y="38" font-size="16" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${v} €</text>`; x += 86; }
    else { const r = v >= 1 ? 22 : v >= .1 ? 18 : 14, c = v >= 1 ? '#E2C35A' : v >= .1 ? '#E9C46A' : '#C9824A'; s += `<circle cx="${x + r}" cy="32" r="${r}" fill="${c}" stroke="${K}"/><text x="${x + r}" y="37" font-size="${r > 16 ? 13 : 11}" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${v >= 1 ? v + ' €' : Math.round(v * 100) + ' c'}</text>`; x += 2 * r + 8; } });
  return `<svg class="pl-libre" viewBox="0 0 ${x} ${H}" style="width:${x}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`; }
// Robot sur quadrillage : chemin = centres de cases [[x + .5, y + .5]…] ; o.but (étoile), o.fin (case entourée).
const robot = (w, h, ch, o) => Q(w, h, ch.slice(1).map((p, i) => ['l', ch[i][0], ch[i][1], p[0], p[1], { c: Ro, w: 3, d: true }])
  .concat([['t', ch[0][0], ch[0][1] + .25, '🤖', { fs: 20 }], o && o.but ? ['t', o.but[0], o.but[1] + .25, '⭐', { fs: 20 }] : null, o && o.fin ? ['c', ch[ch.length - 1][0], ch[ch.length - 1][1], .4, { c: Ve, w: 3 }] : null]), 34);
// Tableau de numération : ent = en-têtes, lignes = [[chiffres…]] ; hi = colonnes surlignées ; rouge = [ligne, colonne] en rouge.
function tabN(ent, lignes, hi, o){ o = o || {}; hi = hi || [];
  return `<table style="border-collapse:collapse;font-family:'Space Grotesk',sans-serif;margin:0 auto;"><tr>${ent.map((e, j) => `<th style="border:1.5px solid ${K};padding:3px 8px;font-size:12px;background:${hi.includes(j) ? '#FFE3C2' : '#EEF4FB'};color:${K};">${e}</th>`).join('')}</tr>${lignes.map((l, i) => `<tr>${l.map((c, j) => `<td style="border:1.5px solid ${K};padding:4px 10px;text-align:center;font-size:20px;font-weight:700;background:${hi.includes(j) ? '#FFF3E3' : '#fff'};color:${(o.rouge || []).some(([a, b]) => a === i && b === j) ? Ro : K};">${c}</td>`).join('')}</tr>`).join('')}</table>`; }
// Points (jetons) : n jetons, par rangées de r ; coul(i) = couleur du jeton i ; groupes de g entourés.
function jetons(n, r, coul, g){ const k = 22, rows = Math.ceil(n / r); let s = '';
  if(g) for(let i = 0; i < Math.ceil(n / g); i++){ const x0 = (i * g) % r, y0 = Math.floor(i * g / r); s += `<rect x="${4 + x0 * k}" y="${4 + y0 * k}" width="${g * k - 2}" height="${k - 2}" rx="9" fill="none" stroke="${Vi}" stroke-width="1.6"/>`; }
  for(let i = 0; i < n; i++) s += `<circle cx="${5 + (i % r) * k + k / 2}" cy="${5 + Math.floor(i / r) * k + k / 2}" r="${k * .36}" fill="${coul ? coul(i) : Bl}" stroke="${K}" stroke-width="1"/>`;
  return `<svg class="pl-libre" viewBox="0 0 ${r * k + 10} ${rows * k + 10}" style="width:${r * k + 10}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`; }
// Barres horizontales à comparer : [[étiquette, valeur, texte, couleur]] ; ech = valeur de la plus longue barre.
function barresH(l, ech, o){ o = o || {}; const L = o.L || 300, X0 = o.x0 || 70, W = X0 + L + 150, H = l.length * 36 + 8; let s = '';
  l.forEach(([e, v, t, c], i) => { const y = 6 + i * 36, w = L * v / ech; s += `<text x="${X0 - 8}" y="${y + 19}" font-size="13" text-anchor="end" font-weight="700" fill="${K}" font-family="Space Grotesk">${e}</text><rect x="${X0}" y="${y}" width="${w}" height="26" rx="4" fill="${c || Bl}" fill-opacity=".55" stroke="${K}"/><text x="${X0 + w + 6}" y="${y + 18}" font-size="13" font-weight="700" fill="${K}" font-family="Space Grotesk">${t}</text>`; });
  return `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`; }
// Récipients : une bouteille (contenance) et des verres (n, plein ?).
function verres(n, pleins, lab, bouteille){ let x = 8, s = '';
  if(bouteille) { s += `<path d="M${x + 14} 8 h16 v14 q14 8 14 22 v56 h-44 v-56 q0 -14 14 -22 z" fill="#CFE8F3" stroke="${K}" stroke-width="2"/><text x="${x + 22}" y="78" font-size="12" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${bouteille}</text>`; x += 62; }
  for(let i = 0; i < n; i++){ s += `<path d="M${x} 52 l4 48 h22 l4 -48 z" fill="${i < pleins ? '#F4B183' : '#fff'}" stroke="${K}" stroke-width="1.8"/><text x="${x + 15}" y="114" font-size="10" text-anchor="middle" fill="${K}" font-family="Space Grotesk">${lab}</text>`; x += 38; }
  return `<svg class="pl-libre" viewBox="0 0 ${x + 4} 118" style="width:${x + 4}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`; }
// Faces d'un dé (n points) ; on = surligné.
function de(n, on){ const P = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [2, 0], [0, 1], [2, 1], [0, 2], [2, 2]] }[n];
  return `<svg class="pl-libre" viewBox="0 0 46 46" style="width:42px;display:inline-block;vertical-align:middle;"><rect x="2" y="2" width="42" height="42" rx="8" fill="${on ? '#FFE3C2' : '#fff'}" stroke="${on ? Ro : K}" stroke-width="${on ? 3 : 1.8}"/>${P.map(([a, b]) => `<circle cx="${11 + a * 12}" cy="${11 + b * 12}" r="4" fill="${K}"/>`).join('')}</svg>`; }
// Chaîne de calcul : cases et flèches [['5', '+ 4'], …] ; retour = flèches inverses dessous.
function chaine(l, retour){ let s = '', x = 6; const W = l.length * 112 + 60;
  l.forEach(([v, op], i) => { s += `<rect x="${x}" y="18" width="60" height="34" rx="8" fill="${i === l.length - 1 ? '#FFE3C2' : '#EEF4FB'}" stroke="${K}" stroke-width="1.8"/><text x="${x + 30}" y="41" font-size="16" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${v}</text>`;
    if(op){ s += `<line x1="${x + 62}" y1="35" x2="${x + 108}" y2="35" stroke="${Ve}" stroke-width="2.2"/><polygon points="${x + 110},35 ${x + 102},31 ${x + 102},39" fill="${Ve}"/><text x="${x + 85}" y="13" font-size="13" text-anchor="middle" font-weight="700" fill="${Ve}" font-family="Space Grotesk">${op}</text>`;
      if(retour && retour[i]) s += `<path d="M${x + 106} 58 Q${x + 85} 80 ${x + 64} 58" fill="none" stroke="${Ro}" stroke-width="2.2"/><polygon points="${x + 64},58 ${x + 66},67 ${x + 71},61" fill="${Ro}"/><text x="${x + 85}" y="92" font-size="13" text-anchor="middle" font-weight="700" fill="${Ro}" font-family="Space Grotesk">${retour[i]}</text>`; }
    x += 112; });
  return `<svg class="pl-libre" viewBox="0 0 ${x} 98" style="width:${x}px;max-width:100%;display:inline-block;vertical-align:middle;">${s}</svg>`; }

/* ---------- CE2 ---------- */
{ // 1 235 filtres en lots de 100
  const lots = (n, msg) => { const u = .3; let it = [];
    for(let i = 0; i < n; i++) it.push(['r', 6 + i * 100 * u, 14, 100 * u - 2, 26, { f: i < 12 ? Bl : Ve, rx: 3 }], ['t', 6 + i * 100 * u + 14, 31, '100', { fs: 9 }]);
    it.push(['l', 6 + 1235 * u, 4, 6 + 1235 * u, 50, { c: Ro, w: 2.4 }], ['t', 6 + 1235 * u, 64, '1 235', { c: Ro, fs: 13 }]); if(msg) it.push(['t', 210, 82, msg, { c: K, fs: 13 }]);
    return D(410, 88, it); };
  DF('ce2-ne-lots', [tabN(['milliers', 'centaines', 'dizaines', 'unités'], [[1, 2, 3, 5]], [0, 1]) + tx('12 centaines', Ro, 13), lots(12, 'il manque 35 filtres'), lots(13, '13 lots : on dépasse 1 235'), null]);
}
DF('ce2-ta-trou', [jetons(8, 8), jetons(40, 8), jetons(48, 8), jetons(56, 8, i => i >= 48 ? Ro : Bl)]);
DF('ce2-ta-oubli', [jetons(56, 8), jetons(56, 8, i => i % 8 < 4 ? Or : '#fff'), jetons(56, 8, i => i % 8 < 4 ? Or : Ve), null]);
{ const A = ['p', 1, 1.5, 'A', { dx: -4, dy: -12 }], seg = n => cm1RegleGraduee(70, 'AB', { n: 8, largeur: '360px' });
  DF('ce2-pd-tracer', [Q(9, 2.5, [A], 40), seg(), seg(), seg(), null]); }
{ const f = (l) => Q(10, 2, [['l', 1, 1, 9, 1, { w: 2.6 }], ['p', 1, 1, 'A', { dx: -4, dy: -12 }], ['p', 9, 1, 'B', { dx: 4, dy: -12 }]].concat(l), 40);
  DF('ce2-pd-milieu', [f([['acc', 1, 9, 1.25, '8 cm']]), f([['acc', 1, 9, 1.25, '8 cm']].concat([1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ['l', i, .82, i, 1.18, { w: 1.4 }]))), f([['acc', 1, 5, 1.25, '4 cm'], ['acc', 5, 9, 1.25, '4 cm'], ['p', 5, 1, 'I', { c: Ro, dy: -12 }]]), f([['cd', 1, 1, 5, 1, 1], ['cd', 5, 1, 9, 1, 1], ['p', 5, 1, 'I', { c: Ro, dy: -12 }]])]); }
{ const eu = v => (v / 100).toFixed(2).replace('.', ',') + ' €';
  DF('ce2-mo-rendre', [cmSauts(700, 1000, 740, [[60, '+ 60 c']], { pas: 20, fmt: eu }), cmSauts(700, 1000, 740, [[60, '+ 60 c'], [200, '+ 2 €']], { pas: 20, fmt: eu }), rang(cmSauts(700, 1000, 740, [[60, '+ 60 c'], [200, '+ 2 €']], { pas: 20, fmt: eu, px: 330 }), monnaie([2, .5, .1])), null]);
  DF('ce2-mo-payer', [tx('8,75 € = 8 € + 75 c', K, 18), monnaie([5, 2, 1]), monnaie([5, 2, 1, .5, .2, .05]), null]); }
{ const b = (n, k, c) => bd(n, k, { largeur: 180, coul: c }), ref = pile(tx('un demi', K, 12), b(2, 1, Ro));
  const cmp = (n, k, ok) => pile(ref, b(n, k, ok ? Ve : '#8A93A3'), tx(ok ? 'égal à un demi ✔' : 'pas égal', ok ? Ve : '#8A93A3', 13));
  DF('ce2-fe-trier', [ref, cmp(3, 1), cmp(4, 2, 1), cmp(4, 3), cmp(6, 2), cmp(6, 3, 1), pile(ref, b(4, 2, Ve), b(6, 3, Ve))]); }
DF('ce2-lo-conv', [PQ([[200, '2 m = 200 cm'], [35, '35 cm']], { titre: '?', L: 320, xt: 40 }), null, PQ([[200, '200 cm'], [35, '35 cm']], { titre: '235 cm', L: 320, xt: 70 })]);
DF('ce2-lo-comp', [barresH([['Léo', 208, '2 m 8 cm = 208 cm', Bl]], 215), barresH([['Léo', 208, '208 cm', Bl], ['Inès', 215, '215 cm', Ve]], 215), null, barresH([['Léo', 208, '208 cm', Bl], ['Inès', 215, '215 cm  (+ 7 cm)', Ve]], 215)]);
{ const r = (a, b) => D(270, 100, [['r', 20, 20, 180, 60, { f: a ? Bl : '#fff' }], ['r', 200, 20, 24, 60, { f: b ? Or : '#fff' }], ['t', 110, 14, '30', { fs: 13 }], ['t', 212, 14, '4', { fs: 13 }], ['t', 10, 55, '6', { fs: 13 }], a ? ['t', 110, 56, '30 × 6 = 180', { fs: 14 }] : null, b ? ['t', 246, 56, '24', { fs: 13, c: Or }] : null]);
  DF('ce2-mu-dec', [r(0, 0), r(1, 0), r(1, 1), null, null]); }
DF('ce2-mu-pb', [PQ(Array.from({ length: 7 }, () => [8, '8']), { titre: '?', L: 320, xt: 40 }), PQ(Array.from({ length: 7 }, () => [8, '8']), { titre: '56', L: 320, xt: 40 }), null]);
{ const rect = l => Q(8, 6, [['pg', [[1, 1], [7, 1], [7, 5], [1, 5]], { f: Bl, op: .2 }], ['t', 4, .7, '6 cm', { fs: 12 }], ['t', 6.8, 3.2, '4 cm', { fs: 12, a: 'end' }], ['t', 4, 5.8, '6 cm', { fs: 12 }], ['t', 1.2, 3.2, '4 cm', { fs: 12, a: 'start' }]].concat(l), 28);
  const ad = [['ad', 1, 1, 1, 0, 0, 1], ['ad', 7, 1, -1, 0, 0, 1], ['ad', 7, 5, -1, 0, 0, -1], ['ad', 1, 5, 1, 0, 0, -1]];
  DF('ce2-po-nature', [rect(ad), rect(ad.concat([['cd', 1, 1, 7, 1, 2], ['cd', 1, 5, 7, 5, 2], ['cd', 7, 1, 7, 5, 1], ['cd', 1, 1, 1, 5, 1]])), null, null]); }
DF('ce2-pa-deux', [cmSauts(30, 50, 48, [[-15, '− 15']], { pas: 2 }), cmSauts(30, 50, 48, [[-15, '− 15'], [9, '+ 9']], { pas: 2 }), null]);
{ const B = [['7 h 10', '8 h 10', '+ 1 h'], ['8 h 10', '8 h 40', '+ 30 min'], ['8 h 40', '9 h', '+ 20 min'], ['9 h', '9 h 20', '+ 20 min']];
  DF('ce2-hd-arrivee', [friseB(B.slice(0, 1)), friseB(B.slice(0, 2)), friseB(B.slice(0, 3)), friseB(B), null]); }
DF('ce2-hd-depart', [friseB([['8 h 30 ?', '12 h 30', '4 h']], { recul: true }), friseB([['8 h 30', '12 h 30', '− 4 h']], { recul: true }), rang(horl(8, 30, { taille: 90 }), horl(12, 30, { taille: 90 }))]);
{ const A = [1, 5], B = [8, 5], C = [8, 2], Dp = [1, 2], f = l => Q(9, 6, l, 30);
  const base = [['l', ...A, ...B, { w: 2.6 }], ['p', ...A, 'A', { dx: -12, dy: 14 }], ['p', ...B, 'B', { dx: 8, dy: 14 }], ['t', 4.5, 5.7, '7 cm', { fs: 12 }]];
  DF('ce2-ac-rect', [f(base), f(base.concat([['l', 1, 5, 1, .5, { c: Bl, d: true }], ['l', 8, 5, 8, .5, { c: Bl, d: true }], ['ad', 1, 5, 1, 0, 0, -1], ['ad', 8, 5, -1, 0, 0, -1]])),
    f(base.concat([['l', 1, 5, 1, .5, { c: Bl, d: true }], ['l', 8, 5, 8, .5, { c: Bl, d: true }], ['ad', 1, 5, 1, 0, 0, -1], ['ad', 8, 5, -1, 0, 0, -1], ['p', ...Dp, 'D', { dx: -12 }], ['p', ...C, 'C', { dx: 8 }], ['t', .6, 3.6, '3 cm', { fs: 11, a: 'end' }]])),
    f(base.concat([['pg', [A, B, C, Dp], { f: Ve, op: .15, c: Ve }], ['ad', 1, 5, 1, 0, 0, -1], ['ad', 8, 5, -1, 0, 0, -1], ['ad', 8, 2, -1, 0, 0, 1], ['ad', 1, 2, 1, 0, 0, 1], ['p', ...Dp, 'D', { dx: -12 }], ['p', ...C, 'C', { dx: 8 }]]))]); }
{ const f = l => Q(12, 4, l, 26), base = [['l', 1, 3.5, 11, 3.5, { w: 2.6 }], ['p', 1, 3.5, 'A', { dx: -12, dy: 4 }], ['p', 11, 3.5, 'B', { dx: 8, dy: 4 }], ['t', 6, 3.95, '10 cm', { fs: 11 }]];
  DF('ce2-ac-tri', [f(base), f(base.concat([['l', 1, 3.5, 1, 0, { c: Bl, d: true }], ['ad', 1, 3.5, 1, 0, 0, -1]])), f(base.concat([['l', 1, 3.5, 1, 0, { c: Bl, d: true }], ['ad', 1, 3.5, 1, 0, 0, -1], ['p', 1, 1.5, 'C', { dx: -14 }], ['t', .5, 2.7, '4 cm', { fs: 11, a: 'end' }]])),
    f(base.concat([['pg', [[1, 3.5], [11, 3.5], [1, 1.5]], { f: Ve, op: .15, c: Ve }], ['ad', 1, 3.5, 1, 0, 0, -1], ['p', 1, 1.5, 'C', { dx: -14 }]]))]); }
{ const ax = AX(0, 2000, 100, 500, [[950, '950 g'], [1050, '1 050 g'], [1200, '1 200 g'], [2000, '2 000 g']], { alterne: true, fmt: v => v.toLocaleString('fr-FR') });
  DF('ce2-mc-ranger', [cm1Balance('1 kg', ['500 g', '500 g']), tx('1 kg 200 g = 1 000 g + 200 g = 1 200 g', K, 15), tx('2 kg = 2 000 g', K, 15), ax]); }
DF('ce2-mc-verres', [verres(0, 0, '', '1 L = 100 cL'), verres(5, 5, '20 cL', '100 cL'), null]);
DF('ce2-dv-groupes', [jetons(40, 10), jetons(40, 10, null, 5), null, jetons(40, 10, i => [Bl, Ve, Or, Vi, Ro, '#9CCB6B', '#F2C14E', '#C9824A'][Math.floor(i / 5)], 5)]);
DF('ce2-cm-plus', [tx('39 = 40 − 1', K, 18), cmSauts(240, 290, 247, [[40, '+ 40']], { pas: 5 }), pile(cmSauts(240, 290, 247, [[40, '+ 40']], { pas: 5, px: 380 }), tx('on regarde de plus près :', '#4E5665', 12), cmSauts(282, 292, 287, [[-1, '− 1']], { pas: 1, px: 300 })), null]);
DF('ce2-cm-fois4', [PQ([[45, '45'], [45, '45']], { titre: '90', L: 200, xt: 50, echelle: 180 }), PQ([[45, '45'], [45, '45'], [45, '45'], [45, '45']], { titre: '180', L: 200, xt: 50 }), null]);
{ const pyr = (base, apex) => D(170, 140, [['pg', [[20, 110], [110, 110], [150, 82], [60, 82]], { f: base ? Or : '#fff', op: .45 }], ['pg', [[20, 110], [110, 110], [85, 15]], { f: apex ? Bl : '#fff', op: .3 }], ['pg', [[110, 110], [150, 82], [85, 15]], { f: apex ? Bl : '#fff', op: .45 }], ['l', 60, 82, 85, 15, { d: true, w: 1.4 }], ['l', 20, 110, 60, 82, { d: true, w: 1.4 }], ['l', 60, 82, 150, 82, { d: true, w: 1.4 }], ['p', 85, 15, 'sommet', { c: Ro, dx: 10, dy: 0, fs: 12 }]]);
  DF('ce2-so-justifier', [pyr(0, 1), pyr(1, 1), null]); }
DF('ce2-pe-carre', [Q(9, 9, [['pg', [[1, 1], [8, 1], [8, 8], [1, 8]], { f: Bl, op: .2 }], ['cd', 1, 1, 8, 1, 1], ['cd', 8, 1, 8, 8, 1], ['cd', 8, 8, 1, 8, 1], ['cd', 1, 8, 1, 1, 1], ['t', 4.5, .7, '7 cm', { fs: 12 }]], 20),
  Q(9, 9, [['pg', [[1, 1], [8, 1], [8, 8], [1, 8]], { f: Bl, op: .2, c: Ro, w: 3.4 }], ['t', 4.5, .7, '7', { fs: 12 }], ['t', 8.4, 4.6, '7', { fs: 12, a: 'start' }], ['t', 4.5, 8.8, '7', { fs: 12 }], ['t', .6, 4.6, '7', { fs: 12, a: 'end' }]], 20), null]);
{ const j = tour => D(330, 150, [['r', 40, 25, 250, 100, { f: '#9CCB6B', op: .45, c: tour ? Ro : K, w: tour ? 3.4 : 1.6 }], ['t', 165, 18, '25 m', { fs: 13 }], ['t', 298, 80, '10 m', { fs: 13, a: 'start' }], ['t', 165, 142, '25 m', { fs: 13 }], ['t', 32, 80, '10 m', { fs: 13, a: 'end' }], ['t', 165, 80, 'jardin', { fs: 14, c: '#3E5A1E' }]]);
  DF('ce2-pe-jardin', [j(1), null, null]); }
DF('ce2-pm-moins', [PQ(Array.from({ length: 8 }, () => [30, '']), { titre: 'vélo : 240 €', L: 320, xt: 100, uni: true }) + PQ([[30, '?']], { titre: 'ballon', L: 320, xt: 100, echelle: 240 }), null, null,
  PQ(Array.from({ length: 8 }, () => [30, '30']), { titre: 'vélo : 240 €', L: 320, xt: 100, uni: true }) + PQ([[30, '30 €']], { titre: 'ballon', L: 320, xt: 100, echelle: 240 })]);

/* ---------- CM1 ---------- */
{ const E = ['unités de mille', 'centaines', 'dizaines', 'unités'], t = (hi, r) => tabN(E, [[6, 0, 8, 5]], hi, { rouge: r });
  DF('ne-lire', [t([]), t([0]), t([1], [[0, 1]]), t([2, 3]), t([0, 1, 2, 3])]);
  const c = hi => tabN(E, [[5, 3, 0, 6], [5, 3, 6, 0]], hi);
  DF('ne-comparer', [c([]), c([0]), c([1]), c([2]), c([2])]);
  DF('ne-graduer', [AX(2000, 3000, 100, 1000, [], { fmt: v => v.toLocaleString('fr-FR') }), cmSauts(2000, 3000, 2000, [[100, '100']], { pas: 100, fmt: v => v.toLocaleString('fr-FR') }),
    cmSauts(2000, 3000, 2000, [[700, '7 écarts de 100']], { pas: 100, fmt: v => v.toLocaleString('fr-FR') }), AX(2000, 3000, 100, 1000, [[2700, 'C : 2 700']], { fmt: v => v.toLocaleString('fr-FR') })]); }
{ const tab = n => cm1Quad(4, 2, cm1Rect(0, 0, 4, 2).slice(0, n), { k: 34, c: '#8B5A2B' });
  DF('fr-lire', [tab(0), tab(5), pile(tab(5), tx(`${fr(5, 8)} de la tablette`, K, 15))]);
  DF('fr-decomp', [bd(3, 11, { largeur: 110 }), bd(3, 9, { largeur: 110 }), bd(3, 11, { largeur: 110 }), null, pile(bd(3, 11, { largeur: 110 }), AX(0, 4, 1 / 3, 1, [[11 / 3, '11 tiers']], { L: 360, fmt: v => String(Math.round(v)) }))]);
  DF('fr-quantite', [jetons(24, 8, i => [Bl, Ve, Or][Math.floor(i / 8)]), jetons(24, 8, i => i < 16 ? Ro : '#fff'), null]); }
DF('lmc-conv', [PQ([[100, '1 m = 100 cm']], { L: 110, echelle: 345 }), PQ([[100, '1 m'], [100, '1 m'], [100, '1 m']], { titre: '300 cm', L: 330, xt: 70, echelle: 345 }), PQ([[100, '100'], [100, '100'], [100, '100'], [45, '45']], { titre: '345 cm', L: 330, xt: 70 }), null]);
DF('lmc-comp', [barresH([['sac 1', 2500, '2 kg 500 g', Or], ['sac 2', 2050, '2 050 g', Bl]], 2500), cm1Balance('2 kg', ['1 kg', '500 g', '500 g']), barresH([['sac 1', 2500, '2 500 g', Or], ['sac 2', 2050, '2 050 g', Bl]], 2500), null]);
DF('lmc-cont', [verres(0, 0, '', '1 L = 100 cL'), verres(5, 5, '20 cL', '100 cL'), null]);
{ const g = (n, c) => { const l = []; for(let i = 0; i < n; i++) l.push([i % 10, Math.floor(i / 10)]); return cm1Quad(10, 10, l, { k: 6, c: c || Bl }); };
  DF('dec-ecrire', [rang(g(100), g(100), g(100), g(47, Or)), null, rang(pile(rang(g(100), g(100), g(100)), tx('3 unités', K, 13)), pile(g(47, Or), tx(fr(47, 100), K, 13))), tx('3,47', Ro, 26)]); }
{ const t = (hi, r) => tabN(['unités', ',', 'dixièmes', 'centièmes'], [[3, ',', 8, ''], [3, ',', 7, 5]], hi, { rouge: r });
  DF('dec-comparer', [t([]), t([0]), t([2], [[0, 2]]), t([2], [[0, 2]])]); }
DF('fo-comparer', [pile(bd(6, 5, { largeur: 150 }), bd(6, 7, { largeur: 150, coul: Ve })), null, pile(bd(6, 5, { largeur: 150 }), bd(6, 7, { largeur: 150, coul: Ve }), tx('l\'unité : la première bande', '#4E5665', 12))]);
{ const d = (k1, k2) => { const c = Array.from({ length: 8 }, (_, i) => i < k1 ? Ro : i < k1 + k2 ? Or : '#fff'); let s = `<svg class="pl-libre" viewBox="0 0 100 100" style="width:110px;"><g>`;
    c.forEach((f, i) => { const a0 = -Math.PI / 2 + i * Math.PI / 4, a1 = a0 + Math.PI / 4; s += `<path d="M50 50 L${50 + 44 * Math.cos(a0)} ${50 + 44 * Math.sin(a0)} A44 44 0 0 1 ${50 + 44 * Math.cos(a1)} ${50 + 44 * Math.sin(a1)} Z" fill="${f}" fill-opacity=".8" stroke="${K}" stroke-width="1.4"/>`; }); return s + '</g></svg>'; };
  DF('fo-probleme', [rang(pile(d(2, 0), tx('lundi', Ro, 12)), pile(d(0, 3).replace(/#F2A93B/g, Or), tx('mardi', Or, 12))), pile(d(2, 3), tx(`mangé : ${fr(5, 8)}`, K, 13)), pile(d(2, 3), tx(`reste : ${fr(3, 8)} (en blanc)`, K, 13)), null]); }
{ const ch = (lec) => { const W = 330, y0 = 150, u = 13; let it = [['l', 40, y0, W, y0], ['l', 40, y0, 40, 10]];
    for(let v = 0; v <= 10; v += 2) it.push(['l', 36, y0 - v * u, W, y0 - v * u, { c: '#C6D2DE', w: .8 }], ['t', 30, y0 - v * u + 4, String(v), { fs: 11, a: 'end' }]);
    [['Pomme', 8], ['Banane', 5], ['Kiwi', 3], ['Fraise', 9], ['Orange', 4]].forEach(([n, v], i) => { it.push(['r', 55 + i * 55, y0 - v * u, 34, v * u, { f: n === 'Banane' && lec ? Or : Bl }], ['t', 72 + i * 55, y0 + 15, n, { fs: 10 }]); });
    if(lec) it.push(['l', 40, y0 - 5 * u, 110, y0 - 5 * u, { c: Ro, d: true, w: 2 }], ['t', 26, y0 - 5 * u + 4, lec > 1 ? '5' : '', { c: Ro, fs: 14, a: 'end' }]);
    return D(340, 168, it); };
  DF('do-barre', [ch(0), ch(1), ch(2), null]); }
DF('do-tab', [tabN(['', 'filles', 'garçons', 'total'], [['judo', 27, '?', 48]], [3]), tabN(['', 'filles', 'garçons', 'total'], [['judo', 27, '?', 48]], [1, 2, 3]), PQ([[27, 'filles : 27'], [21, 'garçons : ?']], { titre: '48', L: 300, xt: 40 }), tabN(['', 'filles', 'garçons', 'total'], [['judo', 27, 21, 48]], [2], { rouge: [[0, 2]] })]);
{ const E = ['unités', ',', 'dixièmes', 'centièmes'];
  DF('od-dix', [tabN(E, [[0, ',', 5, 6]], [], { rouge: [[0, 2]] }), tabN(E, [[0, ',', 5, 6], [5, ',', 6, '']], [], { rouge: [[0, 2], [1, 0]] }), null]); }
{ const r = (hi) => D(320, 170, [['r', 50, 30, 220, 110, { f: '#9CCB6B', op: .35, c: K, w: 1.6 }], ['t', 160, 22, '12 m', { fs: 13, c: hi === 'L' ? Ro : K }], ['t', 160, 162, '12 m', { fs: 13, c: hi === 'L' ? Ro : K }], ['t', 280, 90, '7 m', { fs: 13, a: 'start', c: hi === 'l' ? Ro : K }], ['t', 42, 90, '7 m', { fs: 13, a: 'end', c: hi === 'l' ? Ro : K }],
    hi === 'L' ? ['l', 50, 30, 270, 30, { c: Ro, w: 4 }] : null, hi === 'L' ? ['l', 50, 140, 270, 140, { c: Ro, w: 4 }] : null, hi === 'l' ? ['l', 270, 30, 270, 140, { c: Ro, w: 4 }] : null, hi === 'l' ? ['l', 50, 30, 50, 140, { c: Ro, w: 4 }] : null, hi === 't' ? ['r', 50, 30, 220, 110, { f: 'none', c: Ro, w: 4 }] : null]);
  DF('pe-rect', [r(''), r('L'), r('l'), r('t')]); }
DF('pe-unite', [D(260, 160, [['pg', [[30, 140], [230, 140], [100, 30]], { f: Bl, op: .2 }], ['t', 130, 156, '1 m = 100 cm', { fs: 12 }], ['t', 52, 82, '45 cm', { fs: 12, a: 'end' }], ['t', 178, 80, '80 cm', { fs: 12, a: 'start' }]]), null, null]);
DF('cm-9', [tx('99 = 100 − 1', K, 18), cmSauts(260, 370, 368, [[-100, '− 100']], { pas: 10 }), pile(cmSauts(260, 370, 368, [[-100, '− 100']], { pas: 10, px: 380 }), tx('on regarde de plus près :', '#4E5665', 12), cmSauts(264, 274, 268, [[1, '+ 1']], { pas: 1, px: 300 })), null]);
DF('cm-5', [PQ([[480, '48 × 10 = 480']], { L: 320, echelle: 480 }), PQ([[240, '240'], [240, '240']], { titre: '480', L: 320, xt: 50 }), null]);
DF('pr-de', [rang(...[1, 2, 3, 4, 5, 6].map(n => de(n))), rang(...[1, 2, 3, 4, 5, 6].map(n => de(n, n % 2 === 0))), null, null]);
{ const bus = (n, last) => { let s = ''; for(let i = 0; i < n; i++){ const x = 6 + (i % 7) * 54, y = 6 + Math.floor(i / 7) * 40, p = i === n - 1 && last != null ? last : 8; s += `<rect x="${x}" y="${y}" width="48" height="28" rx="6" fill="${p < 8 ? Or : Bl}" fill-opacity=".6" stroke="${K}"/><text x="${x + 24}" y="${y + 19}" font-size="13" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${p}</text>`; }
    return `<svg class="pl-libre" viewBox="0 0 390 ${Math.ceil(n / 7) * 40 + 8}" style="width:390px;max-width:100%;">${s}</svg>`; };
  DF('rp-division', [jetons(100, 20), bus(12) + tx('12 minibus pleins : 96 élèves ; il en reste 4', K, 13), bus(13, 4), null]); }
{ const pave = hi => { const A = [20, 60], B = [150, 60], C = [150, 130], Dd = [20, 130], o = [45, -28], E = [A[0] + o[0], A[1] + o[1]], F = [B[0] + o[0], B[1] + o[1]], G = [C[0] + o[0], C[1] + o[1]], H = [Dd[0] + o[0], Dd[1] + o[1]];
    const it = [['pg', [A, B, C, Dd], { f: hi === 'f' ? Bl : '#fff', op: .35 }], ['pg', [A, B, F, E], { f: hi === 'f' ? Ve : '#fff', op: .35 }], ['pg', [B, F, G, C], { f: hi === 'f' ? Or : '#fff', op: .35 }], ['l', ...E, ...H, { d: true, w: 1.4 }], ['l', ...H, ...G, { d: true, w: 1.4 }], ['l', ...H, ...Dd, { d: true, w: 1.4 }]];
    if(hi === 'a') [[A, B], [B, C], [C, Dd], [Dd, A], [A, E], [B, F], [C, G], [Dd, H], [E, F], [F, G], [G, H], [H, E]].forEach(([p, q]) => it.push(['l', ...p, ...q, { c: Ro, w: 3 }]));
    if(hi === 's') [A, B, C, Dd, E, F, G, H].forEach(p => it.push(['p', ...p, '', { c: Ro, r: 5 }]));
    return D(210, 140, it); };
  DF('so-compter', [pave('f'), pave('a'), pave('s'), null]); }
DF('ai-cm2', [cm1Quad(6, 3, [], { k: 26 }), cm1Quad(6, 3, cm1Rect(0, 0, 6, 3), { k: 26, c: '#2E9C6A' }), null, null]);
DF('pp-recette', [barresH([['6 pers.', 150, '150 g', Bl]], 450), barresH([['6 pers.', 150, '150 g', Bl], ['18 pers.', 450, '3 × 150 g = 450 g', Ve]], 450), barresH([['6 pers.', 150, '150 g', Bl], ['3 pers.', 75, '75 g', Or]], 450), barresH([['6 pers.', 150, '150 g', Bl], ['3 pers.', 75, '75 g', Or], ['9 pers.', 225, '225 g', Ve]], 450), null]);
DF('pp-unite', [PQ(Array.from({ length: 5 }, () => [1, '?']), { titre: '6 €', L: 300, xt: 40, uni: true }), tx('6 € = 600 centimes', K, 16), PQ(Array.from({ length: 5 }, () => [1, '1,20 €']), { titre: '6 €', L: 300, xt: 40, uni: true }), PQ(Array.from({ length: 8 }, () => [1, '1,20']), { titre: '?', L: 340, xt: 30, uni: true }), PQ(Array.from({ length: 8 }, () => [1, '1,20']), { titre: '9,60 €', L: 340, xt: 60, uni: true })]);
DF('al-suite', [cmSauts(0, 50, 3, [[5, '+5'], [5, '+5'], [5, '+5']], { pas: 1, L: 460, fmt: v => [3, 8, 13, 18, 48].includes(v) ? String(v) : '' }), null, null, cmSauts(0, 50, 3, Array.from({ length: 9 }, () => [5, '+5']), { pas: 1, L: 460 })]);
DF('al-remonter', [chaine([['?', '+ 4'], ['', '× 3'], ['30']]), chaine([['?', '+ 4'], ['10', '× 3'], ['30']], [null, '÷ 3']), chaine([['6', '+ 4'], ['10', '× 3'], ['30']], ['− 4', '÷ 3']), null]);
{ const eq = (deg, lab) => { const r = deg * Math.PI / 180, O = [30, 110], L = 110; return D(170, 130, [['pg', [O, [O[0] + 80, O[1]], [O[0], O[1] - 80]], { f: '#F2C14E', op: .35, c: '#B8962E' }], ['l', ...O, O[0] + L + 20, O[1], { w: 2.6 }], ['l', ...O, O[0] + L * Math.cos(r), O[1] - L * Math.sin(r), { w: 2.6, c: Ro }], lab ? ['t', 95, 126, lab, { fs: 13, c: Ro }] : null]); };
  DF('an-classer', [eq(90), null, eq(60), rang(eq(50, 'aigu'), eq(90, 'droit'), eq(125, 'obtus'))]); }
{ const B = [['9 h 50', '11 h 50', '+ 2 h'], ['11 h 50', '12 h', '+ 10 min'], ['12 h', '12 h 15', '+ 15 min']];
  DF('hd-fin', [friseB(B.slice(0, 1)), friseB(B.slice(0, 2)), friseB(B), null]); }
DF('hd-debut', [friseB([['10 h', '10 h 15', '− 15 min']], { recul: true }), friseB([['9 h 55', '10 h', '− 5 min'], ['10 h', '10 h 15', '− 15 min']], { recul: true }), rang(horl(9, 55, { taille: 90 }), horl(10, 15, { taille: 90 }))]);
DF('pi-lire', [robot(5, 4, [[.5, 3.5]]), robot(5, 4, [[.5, 3.5], [3.5, 3.5]]), robot(5, 4, [[.5, 3.5], [3.5, 3.5], [3.5, 1.5]]), robot(5, 4, [[.5, 3.5], [3.5, 3.5], [3.5, 1.5], [2.5, 1.5]]), robot(5, 4, [[.5, 3.5], [3.5, 3.5], [3.5, 1.5], [2.5, 1.5]], { fin: 1 })]);

/* ---------- CM2 ---------- */
// Arc de cercle (compas) de centre c, rayon r, autour de l'angle a (degrés, sens trigonométrique), ouverture d.
const arc = (c, r, a, d, col) => { const R = Math.PI / 180, p = t => [c[0] + r * Math.cos(t * R), c[1] - r * Math.sin(t * R)], [x0, y0] = p(a - d), [x1, y1] = p(a + d);
  return ['raw', `<path d="M${x0} ${y0} A${r} ${r} 0 0 0 ${x1} ${y1}" fill="none" stroke="${col || Bl}" stroke-width="1.8" stroke-dasharray="5 3"/>`]; };
const deg = (a, b) => Math.atan2(a[1] - b[1], b[0] - a[0]) * 180 / Math.PI; // angle de a vers b (y vers le bas)
{ const E6 = ['c. de mille', 'd. de mille', 'u. de mille', 'centaines', 'dizaines', 'unités'];
  DF('c2-ne-lire', [tabN(['classe des mille', 'classe des unités'], [['six-cent-mille', 'quarante']], [0]), tabN(E6, [[6, 0, 0, '', '', '']], [0, 1, 2]), tabN(E6, [[6, 0, 0, 0, 4, 0]], [3, 4, 5], { rouge: [[0, 3]] }), tx('600 040', Ro, 26)]);
  const ax = (pts) => AX(186000, 187000, 100, 500, pts, { alterne: true, fmt: v => v.toLocaleString('fr-FR') });
  DF('c2-ne-arrondi', [ax([[186540, '186 540']]), ax([[186540, '186 540'], [186500, 'milieu']]), null, ax([[186540, '186 540'], [187000, 'arrondi']])]); }
DF('c2-fr-ecrire', [bd(6, 29, { largeur: 90 }), rang(bd(6, 24, { largeur: 90 }), bd(6, 5, { largeur: 90, coul: Or })), null, AX(0, 5, 1, 1, [[29 / 6, '29 sixièmes']], { L: 360 })]);
DF('c2-fr-une', [bd(7, 28, { largeur: 84 }), rang(bd(7, 28, { largeur: 84 }), bd(7, 5, { largeur: 84, coul: Or })), null]);
{ const d = [[10, 120], [300, 120]], A = [190, 40], eq = x => ['pg', [[x, 120], [x - 70, 120], [x, 50]], { f: '#F2C14E', op: .45, c: '#B8962E' }];
  const base = [['l', ...d[0], ...d[1], { w: 2.6 }], ['t', 290, 112, '(d)', { fs: 13 }], ['p', ...A, 'A', { c: Ro }]];
  DF('c2-g1-perp', [D(310, 140, base.concat([eq(110)])), D(310, 140, base.concat([eq(190)])), D(310, 140, base.concat([eq(190), ['l', 190, 135, 190, 20, { c: Ve, w: 2.4 }]])), D(310, 140, base.concat([['l', 190, 135, 190, 20, { c: Ve, w: 2.4 }], ['ad', 190, 120, 1, 0, 0, -1], ['t', 198, 30, '(d\')', { fs: 13, c: Ve, a: 'start' }]]))]);
  const B = [150, 50], base2 = [['l', 10, 120, 300, 120, { w: 2.6 }], ['t', 290, 112, '(d)', { fs: 13 }], ['p', ...B, 'B', { c: Ro, dx: 10 }]];
  const perp = [['l', 150, 135, 150, 15, { c: Ve, w: 2.2 }], ['ad', 150, 120, 1, 0, 0, -1], ['t', 158, 22, '(d\')', { fs: 13, c: Ve, a: 'start' }]];
  DF('c2-g1-para', [D(310, 140, base2.concat(perp)), D(310, 140, base2.concat(perp, [['l', 10, 50, 300, 50, { c: Bl, w: 2.4 }], ['ad', 150, 50, 1, 0, 0, 1], ['t', 290, 42, '(d\'\')', { fs: 13, c: Bl, a: 'end' }]])), null]); }
{ const E = ['unités', ',', 'dixièmes', 'centièmes', 'millièmes'];
  DF('c2-dec-dec', [tabN(E, [[3, ',', '', '', '']], [0]), tabN(E, [[3, ',', '', 5, 2]], [3, 4]), tabN(E, [[3, ',', 0, 5, 2]], [2], { rouge: [[0, 2]] }), tx('3,052', Ro, 26)]);
  DF('c2-dec-comp', [tabN(E.slice(0, 4), [[7, ',', 0, 9], [7, ',', 1, '']], [0]), tabN(E.slice(0, 4), [[7, ',', 0, 9], [7, ',', 1, '']], [2], { rouge: [[0, 2], [1, 2]] }), null]); }
{ const E = ['centaines', 'dizaines', 'unités', ',', 'dixièmes', 'centièmes', 'millièmes'];
  DF('c2-lmc-conv', [tx('1 m = 100 cm', K, 18), tabN(E, [['', '', 4, ',', 0, 8, ''], [4, 0, 8, ',', '', '', '']], [], { rouge: [[0, 2], [1, 0]] }), tx('1 km = 1 000 m', K, 18), tabN(E, [[6, 2, 5, ',', '', '', ''], ['', '', 0, ',', 6, 2, 5]], [], { rouge: [[0, 0], [1, 4]] })]); }
DF('c2-lmc-pb', [verres(0, 0, '', '1,5 L = 150 cL'), verres(6, 6, '25 cL', '150 cL'), null]);
DF('c2-as-par', [cmSauts(40, 80, 72, [[-22, '− 22']], { pas: 2 }), null, cmSauts(40, 80, 72, [[-18.5, '− 18,5'], [3.5, '+ 3,5']], { pas: 2 }), rang(pile(tx('avec parenthèses', Ro, 13), tx('50', Ro, 24)), pile(tx('sans parenthèses', Bl, 13), tx('57', Bl, 24)))]);
{ const k = 30, A = [30, 160], B = [30 + 6 * k, 160], xc = (16 - 25 + 36) / 12, C = [30 + xc * k, 160 - Math.sqrt(16 - xc * xc) * k];
  const base = [['l', ...A, ...B, { w: 2.6 }], ['p', ...A, 'A', { dx: -12, dy: 14 }], ['p', ...B, 'B', { dx: 6, dy: 14 }], ['t', 120, 178, '6 cm', { fs: 12 }]];
  const aA = arc(A, 4 * k, deg(A, C), 22), aB = arc(B, 5 * k, deg(B, C), 18, Or);
  DF('c2-fp-tri', [D(250, 185, base), D(250, 185, base.concat([aA])), D(250, 185, base.concat([aA, aB])), D(250, 185, base.concat([aA, aB, ['pg', [A, B, C], { f: Ve, op: .15, c: Ve }], ['p', ...C, 'C', { dx: -4, dy: -10 }], ['t', 52, 100, '4 cm', { fs: 11, a: 'end' }], ['t', 165, 100, '5 cm', { fs: 11, a: 'start' }]]))]); }
{ const f = l => Q(7, 5, l, 30), E = [1, 4], F = [6, 4], G = [6, 1], H = [1, 1], base = [['l', ...E, ...F, { w: 2.6 }], ['p', ...E, 'E', { dx: -12, dy: 14 }], ['p', ...F, 'F', { dx: 8, dy: 14 }], ['t', 3.5, 4.7, '5 cm', { fs: 12 }]];
  DF('c2-fp-rect', [f(base), f(base.concat([['l', 6, 4, 6, .3, { c: Bl, d: true }], ['ad', 6, 4, -1, 0, 0, -1], ['p', ...G, 'G', { dx: 8 }], ['t', 6.4, 2.6, '3 cm', { fs: 11, a: 'start' }]])),
    f(base.concat([['l', 6, 4, 6, .3, { c: Bl, d: true }], ['l', 1, 4, 1, .3, { c: Bl, d: true }], ['ad', 6, 4, -1, 0, 0, -1], ['ad', 1, 4, 1, 0, 0, -1], ['p', ...G, 'G', { dx: 8 }], ['p', ...H, 'H', { dx: -14 }]])),
    f(base.concat([['pg', [E, F, G, H], { f: Ve, op: .15, c: Ve }], ['ad', 6, 4, -1, 0, 0, -1], ['ad', 1, 4, 1, 0, 0, -1], ['ad', 6, 1, -1, 0, 0, 1], ['ad', 1, 1, 1, 0, 0, 1], ['p', ...G, 'G', { dx: 8 }], ['p', ...H, 'H', { dx: -14 }]]))]); }
DF('c2-mu-pb', [PQ(Array.from({ length: 12 }, () => [1.35, '']), { titre: '?', L: 330, xt: 30, uni: true }), PQ([[13.5, '10 croissants : 13,5'], [2.7, '2 : 2,7']], { titre: '?', L: 330, xt: 30 }), PQ([[13.5, '13,5'], [2.7, '2,7']], { titre: '16,2', L: 330, xt: 50 }), null]);
{ const C = ['#E35D3A', '#E35D3A', '#E35D3A', '#E35D3A', '#E35D3A', '#2E9C6A', '#2E9C6A', '#2E9C6A', '#F2C14E', '#F2C14E'];
  DF('c2-pr-urne', [jetons(10, 5, i => C[i]), jetons(10, 5, i => i >= 5 && i < 8 ? C[i] : '#EEF1F5'), pile(jetons(10, 5, i => i >= 5 && i < 8 ? C[i] : '#EEF1F5'), tx('3 chances sur 10', Ve, 15)), jetons(10, 5, i => C[i])]); }
DF('c2-fc-add', [pile(bd(3, 2, { largeur: 240 }), bd(12, 5, { largeur: 240, coul: Or })), pile(bd(3, 2, { largeur: 240 }), bd(12, 8, { largeur: 240 })), bd(12, 13, { largeur: 240, coul: Ve }), null]);
DF('c2-fc-comp', [pile(bd(4, 3, { largeur: 240 }), bd(8, 6, { largeur: 240 })), pile(bd(8, 5, { largeur: 240, coul: Bl }), bd(8, 6, { largeur: 240 }), bd(8, 7, { largeur: 240, coul: Ve })), null]);
{ const E9 = ['c. M', 'd. M', 'u. M', 'c. m', 'd. m', 'u. m', 'c.', 'd.', 'u.'];
  DF('c2-gn-ecrire', [tabN(['millions', 'mille', 'unités'], [['quarante', 'trois', 'cinq']]), tabN(E9, [['', 4, 0, '', '', '', '', '', '']], [1, 2]), tabN(E9, [['', 4, 0, 0, 0, 3, 0, 0, 5]], [3, 4, 5, 6, 7, 8]), tx('40 003 005', Ro, 24)]);
  DF('c2-gn-ranger', [tabN(E9, [[7, 0, 8, 6, 5, 0, 0, 0, 0], [7, 8, 0, 0, 6, 5, 0, 0, 0]], []), tabN(E9, [[7, 0, 8, 6, 5, 0, 0, 0, 0], [7, 8, 0, 0, 6, 5, 0, 0, 0]], [0, 1], { rouge: [[0, 1], [1, 1]] }), null]); }
DF('c2-ai-rect', [D(290, 150, [['r', 20, 20, 250, 120, { f: '#9CCB6B', op: .4 }], ['t', 145, 14, '25 m', { fs: 13 }], ['t', 276, 84, '12 m', { fs: 13, a: 'start' }]]), null, cm1Quad(25, 12, cm1Rect(0, 0, 25, 12), { k: 10, c: '#9CCB6B' }), null]);
{ const L = (r, c) => Q(8, 5, [['r', 1, 2, 6, 2, { f: r ? Bl : '#fff' }], ['r', 1, 0, 2, 2, { f: c ? Or : '#fff' }], ['t', 4, 4.7, '6 cm', { fs: 11 }], ['t', 7.3, 3.2, '2 cm', { fs: 11, a: 'start' }], ['t', 3.3, 1.2, '2 cm', { fs: 11, a: 'start' }]], 26);
  DF('c2-ai-L', [L(1, 0), L(0, 1), L(1, 1)]); }
{ const re = (l, h, c) => cm1Quad(l, h, cm1Rect(0, 0, l, h), { k: 8, c }), lab = (l, h, c) => pile(re(l, h, c), tx(`${h} × ${l}`, K, 12));
  DF('c2-md-div', [lab(30, 1, Bl), rang(lab(30, 1, Bl), lab(15, 2, Ve), lab(10, 3, Or)), rang(lab(15, 2, Ve), lab(10, 3, Or), lab(6, 5, Vi)), null, null]); }
DF('c2-do-circ', [pile(cm1Disque(4, 0, { taille: 120 }), tx('200 élèves', K, 13)), pile(cm1Disque(4, 1, { taille: 120 }), tx('un quart : 50', K, 13)), pile(cm1Disque(4, 3, { taille: 120 }), tx('trois quarts : 150', K, 13)), null]);
{ const rep = (h, v, pt) => { const X = i => 40 + i * 40, Y = j => 170 - j * 10; const it = [['l', 40, 170, 300, 170, { f: true }], ['l', 40, 170, 40, 20, { f: true }]];
    for(let i = 1; i <= 6; i++) it.push(['l', X(i), 166, X(i), 174], ['t', X(i), 188, String(i), { fs: 11 }]);
    for(let j = 2; j <= 14; j += 2) it.push(['l', 36, Y(j), 44, Y(j)], ['t', 32, Y(j) + 4, String(j), { fs: 10, a: 'end' }]);
    it.push(['t', 300, 186, 'semaine', { fs: 11, a: 'end' }], ['t', 46, 16, 'hauteur (cm)', { fs: 11, a: 'start' }]);
    if(h) it.push(['l', X(3), 170, X(3), Y(10), { c: Bl, d: true }]); if(v) it.push(['l', 40, Y(10), X(3), Y(10), { c: Or, d: true }]); if(pt) it.push(['p', X(3), Y(10), '', { c: Ro, r: 6 }]);
    return D(310, 196, it); };
  DF('c2-do-pts', [rep(1, 0, 0), rep(1, 1, 0), rep(1, 1, 1)]); }
{ const cars = (n, last) => { let s = ''; for(let i = 0; i < n; i++){ const p = i === n - 1 && last ? last : 45, x = 6 + i * 92; s += `<rect x="${x}" y="8" width="84" height="40" rx="8" fill="${p < 45 ? Or : Bl}" fill-opacity=".6" stroke="${K}"/><text x="${x + 42}" y="33" font-size="14" text-anchor="middle" font-weight="700" fill="${K}" font-family="Space Grotesk">${p} élèves</text>`; } return `<svg class="pl-libre" viewBox="0 0 ${n * 92 + 10} 56" style="width:${n * 92 + 10}px;max-width:100%;">${s}</svg>`; };
  DF('c2-dv-reste', [tx('150 élèves ; cars de 45 places', K, 15), cars(3), cars(4, 15), null]); }
DF('c2-rp-algo', [monnaie(Array(10).fill(2)), pile(monnaie(Array(10).fill(2)), tx('1 billet : il reste 15 € → impossible', Ro, 13)), pile(monnaie(Array(10).fill(2)), monnaie([5, 5, 2, 2, 2, 2, 2]), monnaie([5, 5, 5, 5])), null]);
{ const k = 28, F = [40, 170], G = [40 + 4 * k, 170], h = Math.sqrt(25 - 4) * k, E = [40 + 2 * k, 170 - h];
  const base = [['l', ...F, ...G, { w: 2.6 }], ['p', ...F, 'F', { dx: -12, dy: 14 }], ['p', ...G, 'G', { dx: 6, dy: 14 }], ['t', 96, 188, '4 cm', { fs: 12 }]];
  const aF = arc(F, 5 * k, deg(F, E), 16), aG = arc(G, 5 * k, deg(G, E), 16, Or);
  DF('c2-pc-ecrire', [D(200, 195, base), D(200, 195, base.concat([aF])), D(200, 195, base.concat([aF, aG, ['p', ...E, 'E', { dx: 8, dy: -6 }]])), D(200, 195, base.concat([aF, aG, ['pg', [F, G, E], { f: Ve, op: .15, c: Ve }], ['cd', ...F, ...E, 1], ['cd', ...G, ...E, 1], ['p', ...E, 'E', { dx: 8, dy: -6 }]]))]); }
DF('c2-pp-recette', [barresH([['4 pers.', 300, '300 g', Bl], ['2 pers.', 150, '150 g', Or]], 750), barresH([['4 pers.', 300, '300 g', Bl], ['2 pers.', 150, '150 g', Or], ['8 pers.', 600, '600 g', Bl]], 750), barresH([['8 pers.', 600, '600 g', Bl], ['2 pers.', 150, '150 g', Or], ['10 pers.', 750, '750 g', Ve]], 750), null]);
DF('c2-pp-vitesse', [cmSauts(0, 400, 0, [[300, '2 h : 300 km']], { pas: 25 }), cmSauts(0, 400, 0, [[300, '2 h'], [75, '30 min : 75 km']], { pas: 25 }), null]);
{ const M = [150, 40], base = [['l', 10, 120, 300, 120, { w: 2.6 }], ['t', 290, 112, '(d)', { fs: 13 }], ['p', ...M, 'M', { c: Ro, dx: 10 }]], perp = ['l', 150, 25, 150, 215, { c: Ve, d: true, w: 1.6 }];
  DF('c2-sy-pt', [D(310, 220, base.concat([perp, ['ad', 150, 120, 1, 0, 0, -1]])), D(310, 220, base.concat([perp, ['acc', 120, 40, 150, '2,5 cm', { c: Bl }]].map(x => x[0] === 'acc' ? ['t', 160, 85, '2,5 cm', { fs: 12, a: 'start', c: Bl }] : x))),
    D(310, 220, base.concat([perp, ['t', 160, 85, '2,5 cm', { fs: 12, a: 'start', c: Bl }], ['t', 160, 165, '2,5 cm', { fs: 12, a: 'start', c: Bl }], ['p', 150, 200, 'M\'', { c: Ve, dx: 10 }]])),
    D(310, 220, base.concat([perp, ['cd', 150, 40, 150, 120, 2], ['cd', 150, 120, 150, 200, 2], ['ad', 150, 120, 1, 0, 0, -1], ['p', 150, 200, 'M\'', { c: Ve, dx: 10 }]]))]); }
{ const f = (pli, mi) => D(190, 170, [['pg', [[20, 150], [170, 150], [170, 10], [20, 10]], { f: '#FFFDF7', op: 1 }], ['ad', 20, 150, 1, 0, 0, -1], pli ? ['l', 20, 150, 160, 10, { c: Ro, d: true, w: 2.2 }] : null,
    mi ? ['raw', `<path d="M60 150 A40 40 0 0 0 48.3 121.7" fill="none" stroke="${Bl}" stroke-width="2"/><path d="M48.3 121.7 A40 40 0 0 0 20 110" fill="none" stroke="${Ve}" stroke-width="2"/>`] : null, mi ? ['t', 72, 128, '45°', { fs: 12, c: Bl, a: 'start' }] : null, mi ? ['t', 30, 100, '45°', { fs: 12, c: Ve, a: 'start' }] : null]);
  DF('c2-an-pli', [f(0, 0), f(1, 0), f(1, 1), null]); }
DF('c2-cm-50', [tx('× 50 = × 100, puis la moitié', K, 15), PQ([[340, '3,4 × 100 = 340']], { L: 320 }), PQ([[170, '170'], [170, '170']], { titre: '340', L: 320, xt: 50 }), null]);
{ const pat = hi => { const k = 26, it = [], face = (x, y, w, h, c, n) => it.push(['r', x, y, w, h, { f: c, op: hi === n || hi === 'tout' ? .75 : .3 }]);
    face(3, 0, 4, 2, Ve, 'v'); face(3, 2, 4, 1, Bl, 'b'); face(3, 3, 4, 2, Ve, 'v'); face(3, 5, 4, 1, Bl, 'b'); face(2, 0, 1, 2, Ro, 'r'); face(7, 0, 1, 2, Ro, 'r');
    return cmFig({ w: 9, h: 6, k }, it); };
  DF('c2-so-patron', [pat('tout'), pat('v'), pat('r'), pat('tout')]); }
DF('c2-al-trou', [tx('9 × 12 = 108', K, 18), PQ([[108, '108'], [142, '■']], { titre: '250', L: 320, xt: 50 }), PQ([[108, '108'], [142, '■ = 142']], { titre: '250', L: 320, xt: 50 }), null]);
{ const it = (n, cl, y) => { const l = []; for(let i = 0; i < n; i++) l.push(['r', 20 + i * 44, y, 38, 28, { f: Bl, rx: 4 }], ['t', 39 + i * 44, y + 19, 'cahier', { fs: 9 }]); if(cl) l.push(['r', 20 + n * 44, y, 50, 28, { f: Or, rx: 4 }], ['t', 45 + n * 44, y + 19, 'classeur', { fs: 9 }]); return l; };
  const f = (a, b, c) => D(320, 136, [].concat(a ? it(3, 1, 10).concat([['t', 300, 30, '11 €', { fs: 14, a: 'end' }]]) : [], b ? it(1, 1, 96).concat([['t', 300, 116, '5 €', { fs: 14, a: 'end' }]]) : [], c ? [['acc', 20, 108, 40, '2 cahiers = 6 €', { c: Ro }]] : []));
  DF('c2-al-balance', [f(1, 0, 0), f(1, 1, 0), f(1, 1, 1), null]); }
{ const B = [['8 h 30', '9 h', '+ 30 min'], ['9 h', '11 h', '+ 2 h'], ['11 h', '11 h 12 min 45 s', '+ 12 min 45 s']];
  DF('c2-hd-course', [friseB(B.slice(0, 1)), friseB(B.slice(0, 2)), friseB(B), null]); }
DF('c2-pi-lire', [robot(5, 4, [[.5, 3.5], [.5, 1.5]]), Q(5, 4, [['t', .5, 1.75, '🤖', { fs: 20 }], ['l', .5, 1.5, 1.4, 1.5, { c: Ro, w: 3, f: true }]], 34), robot(5, 4, [[.5, 3.5], [.5, 1.5], [3.5, 1.5]]), robot(5, 4, [[.5, 3.5], [.5, 1.5], [3.5, 1.5], [3.5, 2.5]]), robot(5, 4, [[.5, 3.5], [.5, 1.5], [3.5, 1.5], [3.5, 2.5]], { fin: 1 })]);

// On accroche les dessins aux étapes des méthodes (CM1_DEMOS[id].steps, voir cm1Chapitre).
function brancher(){ Object.entries(DEMO_FIGS).forEach(([id, figs]) => { const d = typeof CM1_DEMOS !== 'undefined' && CM1_DEMOS[id]; if(!d || !d.steps) return;
  figs.forEach((f, i) => { if(f != null && d.steps[i]) d.steps[i].fig = f; }); }); }
brancher();
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', brancher);
})();

/* ============================================================
   5e · Planches : Angles et parallélisme (G2)
   Angles adjacents, opposés par le sommet, supplémentaires (complémentaires : « Pour aller plus loin ») ; angles alternes-internes et
   correspondants ; parallélisme ; somme des angles d'un triangle.
   Relecture du 02/11/2026 (version 1307) : chapeaux sur les angles, lettres a et b inutiles retirées, figures à main levée (P4-E2),
   P2-E3 remplacé (angle triple), figures ajoutées aux corrigés (P2-E5, P2-E6, P3-E5), corrigés rédigés avec la propriété (P1-E5, P4-E4, P5-E2).
   Relecture du 03/11/2026 (version 1309) : P1-E3 quatre figures, P2-E5 de nouveau cliquable à l'écran, P2-E6 figure aux instruments,
   P5-E6 propriétés rédigées, P5-E7 triangle isocèle (36°, 108°, 36°), P6-E2 cases à cocher, P6-E3 dessin à main levée â et 2â.
   Relecture du 03/11/2026 (version 1313) : P6-E1 et P6-E2 en pleine largeur, P6-E2 sur deux colonnes (cases sur une ligne).
   Version 1311 : P1-E3 4e figure (sommets différents, côtés dans le prolongement), P2-E6 construction dans l'ordre (droite, O, rapporteur, sécante).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0', Or = '#E9A21C';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const rad = a => a * Math.PI / 180, P = (V, a, r) => [V[0] + r * Math.cos(rad(a)), V[1] - r * Math.sin(rad(a))];
// Arc d'angle au sommet V, entre les directions a1 et a2 (degrés, sens direct), étiquette au milieu.
function arc(V, a1, a2, r, c, txt){ let b = a2; while(b <= a1) b += 360; const p = P(V, a1, r), q = P(V, b, r), large = b - a1 > 180 ? 1 : 0;
  return `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} A${r},${r} 0 ${large} 0 ${q[0].toFixed(1)},${q[1].toFixed(1)}" fill="none" stroke="${c || Ro}" stroke-width="2"/>` + (txt != null ? (() => { const h = /\u0302$/.test(txt), L = P(V, (a1 + b) / 2, r + (h ? 17 : 12)), t = h ? txt.slice(0, -1) : txt;
    // Lettre d'angle avec un chapeau (x̂) : chapeau dessiné au-dessus de la lettre (l'accent combinant se plaçait mal dans les figures).
    return T(L, t, c || Ro, 11) + (h ? `<path d="M${(L[0] - 3).toFixed(1)},${(L[1] - 8.5).toFixed(1)} L${L[0].toFixed(1)},${(L[1] - 11.5).toFixed(1)} L${(L[0] + 3).toFixed(1)},${(L[1] - 8.5).toFixed(1)}" fill="none" stroke="${c || Ro}" stroke-width="1.1"/>` : ''); })() : ''); }
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const W = n => cm1Tex(`\\widehat{${n}}`);
// Correction : la propriété en phrase, puis le calcul seul sur la ligne suivante.
const PH = (phrase, calcul) => `<div>${phrase}</div><div style="margin:2px 0 4px;">${calcul}</div>`;
// Deux droites (d1) et (d2) (pentes p1, p2 en degrés) coupées par une sécante d'angle s ; angles numérotés 1 à 8.
// Aux points E (sur d1) et F (sur d2) : 1 = entre sécante haute et d1 droite, puis sens direct.
function secante(o){ const { p1 = 0, p2 = 0, s = 62, w = 250, h = 170, num = true, marques = [], noms = true } = o, E = [w * .56, h * .3], F = [E[0] - (h * .42) / Math.tan(rad(s)), h * .72]; // F sur la sécante, sous E (direction s de F vers E)
  let g = ''; const dr = (V, a, len) => (o.ml ? ML : L)(P(V, a + 180, len), P(V, a, len), K, 1.8, o.ml);
  g += dr(E, p1, w * .48) + dr(F, p2, w * .48) + (o.ml ? ML : L)(P(E, s, 52), P(F, s + 180, 52), Bl, 1.8, -(o.ml || 0));
  // directions aux deux sommets : d droite, sécante haute, d gauche, sécante basse
  const dirs = (pd, ss) => [pd, ss, pd + 180, ss + 180];
  const A = (V, k, pd, c, txt) => { const D = dirs(pd, s); return arc(V, D[k], D[(k + 1) % 4], 16, c, txt); };
  marques.forEach(([n, c, txt]) => { const V = n <= 4 ? E : F, pd = n <= 4 ? p1 : p2; g += A(V, (n - 1) % 4, pd, c, txt); });
  if(num) [E, F].forEach((V, i) => { const D = dirs(i ? p2 : p1, s); for(let k = 0; k < 4; k++){ if(marques.some(m => m[0] === i * 4 + k + 1)) continue; let a1 = D[k], a2 = D[(k + 1) % 4]; while(a2 <= a1) a2 += 360; g += T(P(V, (a1 + a2) / 2, 22), String(i * 4 + k + 1), Vi, 11); } });
  const nom = (V, p, t) => { const q = P(V, p + 180, (V[0] - 18) / Math.cos(rad(p))); g += T([Math.max(18, q[0]), q[1] - 7], t, K, 11); };
  if(noms){ nom(E, p1, '(d₁)'); nom(F, p2, '(d₂)'); }
  return S(w, h, g, o.px || w); }
// Triangle ABC (sommets), angles marqués : [[sommet, texte, couleur]].
function tri(Pts, noms, marques, px){ const [A, Bp, C] = Pts; let g = `<polygon points="${Pts.map(p => p.join(',')).join(' ')}" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>`;
  const ang = (V, U) => Math.atan2(V[1] - U[1], U[0] - V[0]) * 180 / Math.PI;
  marques.forEach(([i, txt, c]) => { const V = Pts[i], U1 = Pts[(i + 1) % 3], U2 = Pts[(i + 2) % 3]; let a1 = ang(V, U1), a2 = ang(V, U2); let d = ((a2 - a1) % 360 + 360) % 360; if(d > 180){ [a1, a2] = [a2, a1]; }
    g += arc(V, a1, a2, 18, c || Ro, txt); });
  const G = [(A[0] + Bp[0] + C[0]) / 3, (A[1] + Bp[1] + C[1]) / 3];
  Pts.forEach((p, i) => { const v = [p[0] - G[0], p[1] - G[1]], n = Math.hypot(...v); g += T([p[0] + v[0] / n * 13, p[1] + v[1] / n * 13 + 4], noms[i], K, 13); });
  return S(Math.max(...Pts.map(p => p[0])) + 30, Math.max(...Pts.map(p => p[1])) + 26, g, px); }
// Trait « à main levée » (demandé le 02/11/2026, 5e-G2-P4-E2 : « plutôt des figures à main levée car là on peut imaginer qu'elles
// sont parallèles en regardant la figure ») : légère ondulation, toujours la même pour une figure donnée.
const ML = (a, b, c, w, k) => { const dx = b[0] - a[0], dy = b[1] - a[1], n = Math.hypot(dx, dy) || 1, nx = -dy / n, ny = dx / n, j = (k || 1) * 2.2;
  const q = (t, e) => [a[0] + dx * t + nx * e, a[1] + dy * t + ny * e];
  const p1 = q(.3, j), p2 = q(.7, -j * .8), m = q(.5, j * .2);
  return `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} Q${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} T${b[0].toFixed(1)},${b[1].toFixed(1)}" fill="none" stroke="${c || K}" stroke-width="${w || 2}" stroke-linecap="round"/>`; };
// Deux droites sécantes en V (directions d1 et d2, degrés), angles marqués : [[a1, a2, couleur, texte]].
const croix = (d1, d2, marques, w, h, px) => { const V = [w / 2, h / 2]; let g = L(P(V, d1, w * .45), P(V, d1 + 180, w * .45)) + L(P(V, d2, h * .5), P(V, d2 + 180, h * .5));
  marques.forEach(([a1, a2, c, t], i) => { g += arc(V, a1, a2, i % 2 ? 26 : 20, c, t); }); return S(w, h, g, px || w); };
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
// Codage d'une longueur : n petits traits au milieu de [ab] (inclinés automatiquement par geo-points.js).
const tk = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, u = [(b[0] - a[0]) / l, (b[1] - a[1]) / l], v = [-u[1] * 5, u[0] * 5]; let g = '';
  for(let i = 0; i < (n || 1); i++){ const d = (i - ((n || 1) - 1) / 2) * 4; g += L([m[0] + u[0] * d - v[0], m[1] + u[1] * d - v[1]], [m[0] + u[0] * d + v[0], m[1] + u[1] * d + v[1]], Ro, 1.5); } return g; };
// Codage d'un angle droit en V, entre les directions de a et de c.
const rangle = (V, a, c) => { const n = q => { const l = Math.hypot(q[0] - V[0], q[1] - V[1]); return [(q[0] - V[0]) / l * 9, (q[1] - V[1]) / l * 9]; }, u = n(a), w = n(c);
  return `<polyline points="${V[0] + u[0]},${V[1] + u[1]} ${V[0] + u[0] + w[0]},${V[1] + u[1] + w[1]} ${V[0] + w[0]},${V[1] + w[1]}" fill="none" stroke="${Ro}" stroke-width="1.4"/>`; };
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
PLANCHES['5e|Angles et parallélisme'] = [
  { titre: 'Angles adjacents, supplémentaires', duree: '35 min',
    attendus: ['Reconnaître deux angles adjacents', 'Savoir que deux angles supplémentaires ont pour somme 180°', 'Calculer le supplément d\'un angle'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Les angles ${W('a')} et ${W('b')} sont supplémentaires. Calcule ${W('b')}.`,
        ...(() => { const l = [35, 72, 110, 45, 90]; return { eleve: plListe(l.map(a => `${W('a')} = ${a}° : ${W('b')} = ${B(6)}`)), corr: plListe(l.map(a => `${W('a')} = ${a}° : ${W('b')} = 180° − ${a}° = ${R((180 - a) + '°')}`)) }; })() },
      { etoiles: 1, col: 1, consigne: 'Ces deux angles sont-ils supplémentaires ? Entoure.',
        ...ch([['30° et 150° :', 'oui'], ['100° et 80° :', 'oui'], ['45° et 145° :', 'non'], ['90° et 90° :', 'oui'], ['50° et 50° :', 'non']], 'oui · non') },
      { etoiles: 2, consigne: 'Les angles marqués sont-ils adjacents ? Entoure.',
        // Relecture du 03/11/2026 : « une troisième figure avec un côté commun mais les angles situés du même côté, puis une
        // quatrième avec un sommet qui n'est pas commun ».
        ...(() => { const f1 = S(140, 90, L([20, 75], [125, 75]) + L([60, 75], [95, 15]) + L([60, 75], [25, 20]) + arc([60, 75], 0, 60, 18, Ro) + arc([60, 75], 60, 124, 26, Bl), 120),
            f2 = S(140, 90, L([15, 75], [125, 75]) + L([70, 75], [40, 15]) + L([70, 75], [110, 20]) + arc([70, 75], 0, 54, 18, Ro) + arc([70, 75], 117, 180, 18, Bl), 120),
            V3 = [40, 75], f3 = S(140, 90, L(V3, [130, 75]) + L(V3, P(V3, 48, 70)) + L(V3, P(V3, 105, 66)) + arc(V3, 0, 48, 20, Ro) + arc(V3, 0, 105, 30, Bl), 120),
            // 4e figure (relecture du 03/11/2026, « deux sommets différents mais des côtés dans le prolongement l'un de l'autre ») :
            // [V4V5] côté de l'angle rouge, prolongé au-delà de V5 par le côté de l'angle bleu.
            V4 = [22, 75], V5 = [78, 75], f4 = S(140, 90, L(V4, V5) + L(V5, [132, 75]) + L(V4, P(V4, 115, 52)) + L(V5, P(V5, 62, 56)) + arc(V4, 0, 115, 16, Ro) + arc(V5, 0, 62, 20, Bl), 120),
            pq = t => `<br><small style="font-weight:400;">${t}</small>`;
          return { eleve: duo([col(f1, '<b>oui · non</b>'), col(f2, '<b>oui · non</b>'), col(f3, '<b>oui · non</b>'), col(f4, '<b>oui · non</b>')]),
            corr: duo([col(f1, plEntoure('oui') + pq('même sommet, un côté commun,<br>de part et d\'autre')), col(f2, plEntoure('non') + pq('pas de côté commun')), col(f3, plEntoure('non') + pq('du même côté du côté commun')), col(f4, plEntoure('non') + pq('pas le même sommet'))]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles adjacents ont le même sommet et un côté commun :', 'vrai'], ['Deux angles supplémentaires sont forcément adjacents :', 'faux'], ['Un angle obtus peut avoir un supplément :', 'vrai'], ['Deux angles droits sont supplémentaires :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: `Les points A, O, B sont alignés. Calcule la mesure de l'angle ${W('AOx')}.`,
        ...(() => { const f = S(220, 100, L([15, 85], [205, 85]) + L([110, 85], [160, 18]) + arc([110, 85], 0, 53, 20, Ro, '53°') + arc([110, 85], 53, 180, 26, Bl, '?') + T([12, 98], 'A', K) + T([208, 98], 'B', K) + T([110, 99], 'O', K) + T([168, 16], 'x', K), 220);
          return { eleve: f + plListe([`${W('AOx')} = ${B(6)}`]),
            corr: f + plListe([`A, O et B sont alignés : ${W('AOB')} = 180°.`, `${W('AOx')} = ${W('AOB')} − ${W('xOB')}`, `${W('AOx')} = 180° − 53°`, `${W('AOx')} = ${R('127°')}`]) }; })() },
    ] },
  { titre: 'Angles opposés par le sommet', duree: '30 min',
    attendus: ['Reconnaître deux angles opposés par le sommet', 'Savoir que deux angles opposés par le sommet ont la même mesure', 'Calculer les quatre angles formés par deux droites sécantes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Deux droites sécantes forment les angles 1, 2, 3 et 4. Entoure.',
        ...(() => { const V = [110, 62], D = [20, 75, 200, 255], f = S(220, 124, L(P(V, 20, 100), P(V, 200, 100)) + L(P(V, 75, 60), P(V, 255, 60)) + D.map((a, k) => { let b = D[(k + 1) % 4]; while(b <= a) b += 360; return T(P(V, (a + b) / 2, 26), String(k + 1), Vi, 12); }).join(''), 220),
            q = chx([['L\'angle opposé par le sommet à l\'angle 1 :', 'l\'angle 3', 'l\'angle 2 · l\'angle 3 · l\'angle 4'], ['Les angles 1 et 2 sont…', 'adjacents et supplémentaires', 'opposés par le sommet · adjacents et supplémentaires']]);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 1, col: 1, consigne: 'Deux droites sécantes ; un des angles mesure 40°. Complète les trois autres (dans l\'ordre, en tournant).',
        ...(() => { const V = [110, 60], f = S(220, 120, L(P(V, 20, 100), P(V, 200, 100)) + L(P(V, 60, 70), P(V, 240, 70)) + arc(V, 20, 60, 22, Ro, '40°') + arc(V, 60, 200, 30, Bl, 'a\u0302') + arc(V, 200, 240, 22, Ve, 'b\u0302') + arc(V, 240, 380, 30, Vi, 'c\u0302'), 220), q = rmp([[`${W('a')} = @ °`, 140], [`${W('b')} = @ °`, 40], [`${W('c')} = @ °`, 140]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      // Remplacé le 02/11/2026 (« A remplacer. Aucun intérêt ») : un petit problème qui combine angles opposés et supplémentaires.
      { etoiles: 2, col: 1, consigne: `Les droites (AB) et (CD) se coupent en O. L'angle ${W('AOC')} est le triple de l'angle ${W('AOD')}. Calcule les quatre angles.`,
        ...(() => { const V = [100, 58], f = S(200, 116, L(P(V, 10, 90), P(V, 190, 90)) + L(P(V, 145, 62), P(V, 325, 62)) + arc(V, 190, 325, 18, Ro) + arc(V, 145, 190, 22, Bl)
            + T(P(V, 190, 96), 'A', K) + T(P(V, 10, 96), 'B', K) + T(P(V, 145, 70), 'D', K) + T(P(V, 325, 70), 'C', K) + T([V[0] + 2, V[1] - 9], 'O', K), 200);
          return { eleve: f + plListe([`${W('AOD')} = ${B(4)}`, `${W('AOC')} = ${B(4)}`, `${W('BOC')} = ${B(4)}`, `${W('BOD')} = ${B(4)}`]),
            corr: f + plListe([`${W('AOC')} et ${W('AOD')} sont adjacents et supplémentaires : ${W('AOC')} + ${W('AOD')} = 180°.`, `Donc 3 × ${W('AOD')} + ${W('AOD')} = 180°, soit 4 × ${W('AOD')} = 180°.`, `${W('AOD')} = 180° : 4 = ${R('45°')}`, `${W('AOC')} = 3 × 45° = ${R('135°')}`, `${W('BOC')} = ${W('AOD')} = ${R('45°')} (opposés par le sommet)`, `${W('BOD')} = ${W('AOC')} = ${R('135°')} (opposés par le sommet)`]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles opposés par le sommet sont adjacents :', 'faux'], ['Deux angles opposés par le sommet ont la même mesure :', 'vrai'], ['Deux droites sécantes forment toujours deux paires d\'angles égaux :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Deux droites sécantes forment un angle de 112°. Entoure les mesures des trois autres angles.',
        ...(() => { const q = chx([['L\'angle opposé par le sommet :', '112°', '68° · 112° · 180°'], ['Les deux autres angles :', '68° et 68°', '68° et 68° · 112° et 68° · 78° et 78°']]);
          const f = croix(0, 112, [[0, 112, Ro, '112°'], [112, 180, Bl, '68°'], [180, 292, Ro, '112°'], [292, 360, Bl, '68°']], 210, 120);
          // Relecture du 03/11/2026 (« on ne peut pas entourer à l'écran ») : la figure du corrigé empêchait la version écran ;
          // l'écran garde les choix à cliquer, le papier la figure.
          return { eleve: q.eleve, corr: q.corr + `<div style="text-align:center;">${f}</div>`, ecran: { corr: q.corr } }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace deux droites sécantes en O formant un angle de 35°. Sans rapporteur, donne la mesure des trois autres angles. Justifie.',
        // Relecture du 03/11/2026 : « une figure aux instruments pour illustrer la correction » (constructions.js).
        corr: `<div style="text-align:center;">${(() => { const V = [110, 66];
            return plConstruction({ w: 220, h: 132, px: 220, outils: ['regle', 'rapporteur'],
              // Relecture du 03/11/2026 : « commence par faire une droite à la règle sans placer de point, puis place un point O sur
              // cette droite ; avec le rapporteur, crée l'angle, puis trace la sécante ». Points A, B, C, D : appuis invisibles.
              programme: [{ op: 'point', name: 'X', hidden: true }, { op: 'line', id: 'd1', through: 'X', direction: 0 },
                { op: 'point', name: 'O', on: 'd1', at: 5 }, { op: 'point', name: 'A', on: 'd1', at: 9, hidden: true },
                { op: 'angle', id: 'dB', vertex: 'O', from: 'A', degrees: 35, side: 'up' }, { op: 'line', id: 'd2', through: 'O', direction: 35 },
                { op: 'point', name: 'B', on: 'd2', at: 3, hidden: true }, { op: 'point', name: 'C', on: 'd1', at: 1, hidden: true }, { op: 'point', name: 'D', on: 'd2', at: -3, hidden: true },
                { op: 'mark_angle', vertex: 'O', points: ['B', 'C'] }, { op: 'mark_angle', vertex: 'O', points: ['C', 'D'] }, { op: 'mark_angle', vertex: 'O', points: ['D', 'A'] }],
              depart: [{ seg: [P(V, 0, 100), P(V, 180, 100)] }, { seg: [P(V, 35, 76), P(V, 215, 76)] },
                { svg: arc(V, 0, 35, 20, Ro, '35°') + arc(V, 35, 180, 26, Bl, '145°') + arc(V, 180, 215, 20, Ro, '35°') + arc(V, 215, 360, 26, Bl, '145°') + T([V[0] + 8, V[1] + 18], 'O', K) }] }); })()}</div>`
          + cm1Redac('Angle opposé par le sommet', '', 'Il mesure aussi 35°.') + cm1Redac('Mesures des deux autres angles', '180° − 35° = 145°', 'Ils sont supplémentaires de l\'angle de 35° : les quatre angles mesurent 35°, 145°, 35° et 145°.') },
    ] },
  { titre: 'Angles alternes-internes et correspondants', duree: '40 min',
    attendus: ['Repérer deux angles alternes-internes formés par deux droites et une sécante', 'Repérer deux angles correspondants', 'Utiliser les bons mots pour décrire une figure'],
    exos: [
      { etoiles: 1, consigne: 'Les droites (d₁) et (d₂) sont coupées par une sécante (en bleu). Les angles sont numérotés de 1 à 8.',
        ...(() => { const f = `<div style="text-align:center;">${secante({ p1: 0, p2: 0, s: 62, w: 280, h: 180 })}</div>`, q = chx([['Les angles 1 et 5 sont…', 'correspondants', 'alternes-internes · correspondants · opposés par le sommet'], ['Les angles 4 et 6 sont…', 'alternes-internes', 'alternes-internes · correspondants · opposés par le sommet'], ['Les angles 1 et 3 sont…', 'opposés par le sommet', 'alternes-internes · correspondants · opposés par le sommet'], ['Les angles 3 et 5 sont…', 'alternes-internes', 'alternes-internes · correspondants · opposés par le sommet']]);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Même figure. Donne le numéro de l\'angle…',
        ...rmp([['correspondant à l\'angle 2 : @', 6], ['correspondant à l\'angle 8 : @', 4], ['alterne-interne à l\'angle 4 : @', 6], ['alterne-interne à l\'angle 3 : @', 5]], 1) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles alternes-internes sont de part et d\'autre de la sécante :', 'vrai'], ['Deux angles alternes-internes sont entre les deux droites :', 'vrai'], ['Deux angles correspondants sont du même côté de la sécante :', 'vrai'], ['Deux angles correspondants ont toujours la même mesure :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Même figure (angles 1 à 8). Entoure les paires d\'angles correspondants.',
        ...(() => { const l = ['1 et 5', '2 et 8', '3 et 7', '4 et 6', '4 et 8', '2 et 4'], ok = [0, 2, 4]; return { eleve: plGrille(l, 3), corr: plGrille(l.map((t, i) => ok.includes(i) ? plEntoure(t) : t), 3) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace deux droites non parallèles et une sécante. Colorie en rouge deux angles alternes-internes et en vert deux angles correspondants. Ont-ils la même mesure ?',
        corr: `<div style="text-align:center;">${secante({ p1: 0, p2: 14, s: 62, w: 250, h: 165, num: false, marques: [[4, Ro, '118°'], [6, Ro, '132°'], [1, Ve, '62°'], [5, Ve, '48°']] })}</div>`
          + cm1Redac('Mesures des angles alternes-internes et correspondants', 'Quand les droites ne sont pas parallèles, les angles alternes-internes (ou correspondants) n\'ont pas la même mesure.', 'Ils ne sont égaux que si les deux droites sont parallèles.') },
    ] },
  { titre: 'Angles et droites parallèles', duree: '40 min',
    attendus: ['Si deux droites parallèles sont coupées par une sécante, alors les angles alternes-internes (et correspondants) sont égaux', 'Réciproque : des angles alternes-internes égaux prouvent le parallélisme', 'Calculer des angles et rédiger une justification'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Les droites (d₁) et (d₂) sont parallèles. L\'angle 1 mesure 62°. Complète.',
        ...(() => { const f = secante({ p1: 0, p2: 0, s: 62, w: 250, h: 160, marques: [[1, Ro, '62°']] }), q = rmp([['Angle 5 (correspondant) : @ °', 62], ['Angle 3 (opposé) : @ °', 62], ['Angle 2 : @ °', 118], ['Angle 7 : @ °', 62]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Figures à main levée : les droites sont-elles parallèles ? Entoure (angles alternes-internes marqués).',
        ...(() => { const f1 = secante({ p1: 3, p2: -4, s: 60, w: 160, h: 120, num: false, noms: false, ml: 1, marques: [[4, Ro, '60°'], [6, Bl, '60°']], px: 150 }), f2 = secante({ p1: -2, p2: 3, s: 60, w: 160, h: 120, num: false, noms: false, ml: -1, marques: [[4, Ro, '60°'], [6, Bl, '52°']], px: 150 });
          return { eleve: duo([col(f1, '<b>oui · non</b>'), col(f2, '<b>oui · non</b>')]), corr: duo([col(f1, plEntoure('oui')), col(f2, plEntoure('non'))]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète la propriété.',
        ...rmp([['Si deux droites @ sont coupées par une sécante, alors les angles alternes-internes ont la même mesure.', 'parallèles'], ['Si deux angles correspondants ont la même mesure, alors les droites sont @.', 'parallèles']], 9) },
      { etoiles: 2, col: 1, consigne: '(d₁) // (d₂). Calcule la mesure des angles x et y.',
        ...(() => { const f = secante({ p1: 0, p2: 0, s: 70, w: 230, h: 150, num: false, marques: [[2, Ro, '110°'], [6, Bl, 'x'], [5, Ve, 'y']] }), q = rmp([['x = @ °', 110], ['y = @ °', 70]], 2);
          return { eleve: f + q.eleve, corr: f + plListe(['Les angles marqués 110° et x sont correspondants, et (d₁) // (d₂).', 'Or, si deux droites parallèles sont coupées par une sécante, alors deux angles correspondants ont la même mesure.', `Donc x = ${R('110°')}`, 'Les angles x et y sont adjacents et forment un angle plat : ils sont supplémentaires.', `y = 180° − 110° = ${R('70°')}`]) }; })() },
      { etoiles: 3, cahier: true, consigne: 'Deux droites (d) et (d\') sont coupées par une sécante. Deux angles alternes-internes mesurent 47° chacun. Démontre que (d) et (d\') sont parallèles (rédige : données, propriété, conclusion).',
        corr: cm1Redac('Démonstration', { suite: ['Données : les angles alternes-internes mesurent tous les deux 47°.', 'Propriété : si deux angles alternes-internes ont la même mesure, alors les droites sont parallèles.'] }, 'Conclusion : (d) et (d\') sont parallèles.') },
    ] },
  { titre: 'Somme des angles d\'un triangle', duree: '40 min',
    attendus: ['Savoir que la somme des angles d\'un triangle vaut 180°', 'Calculer la mesure du troisième angle d\'un triangle', 'Utiliser les angles des triangles particuliers (isocèle, équilatéral, rectangle)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la mesure du troisième angle du triangle.',
        ...(() => { const l = [['50° et 70°', 60], ['90° et 35°', 55], ['110° et 25°', 45], ['60° et 60°', 60], ['12,5° et 100°', '67,5']]; return { eleve: plListe(l.map(([t]) => `${t} : ${B(2)} °`)), corr: plListe(l.map(([t, r]) => `${t} : ${R(r)} °`)) }; })() },
      { etoiles: 1, col: 1, consigne: 'Calcule la mesure de l\'angle marqué d\'un point d\'interrogation.',
        ...(() => { const f = tri([[20, 110], [190, 110], [80, 20]], ['A', 'B', 'C'], [[0, '57°', Ro], [1, '34°', Bl], [2, '?', Ve]], 210), q = rmp([[`${W('ACB')} = @ °`, 89]], 2);
          return { eleve: f + q.eleve, corr: f + plListe(['Dans un triangle, la somme des trois angles vaut 180°.', `${W('BAC')} + ${W('ABC')} + ${W('ACB')} = 180°`, `${W('ACB')} = 180° − ${W('BAC')} − ${W('ABC')}`, `${W('ACB')} = 180° − 57° − 34°`, `${W('ACB')} = ${R('89°')}`]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Triangles particuliers : complète.',
        ...rmp([['Triangle équilatéral : chaque angle mesure @ °', 60], ['Triangle rectangle avec un angle de 28° : le troisième mesure @ °', 62], ['Triangle isocèle, angle au sommet 40° : chaque angle à la base mesure @ °', 70], ['Triangle isocèle, angles à la base de 35° : angle au sommet @ °', 110]], 2) },
      { etoiles: 2, col: 1, consigne: 'Ces triangles existent-ils ? Entoure.',
        ...ch([['Angles de 90°, 60° et 30° :', 'oui'], ['Angles de 100°, 50° et 40° :', 'non'], ['Deux angles droits :', 'non'], ['Angles de 45°, 45° et 90° :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un triangle peut avoir deux angles obtus :', 'faux'], ['Dans un triangle rectangle, la somme des deux angles aigus vaut 90° :', 'vrai'], ['Un triangle peut avoir trois angles aigus :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: `ABC est un triangle isocèle en A tel que l'angle ${W('BAC')} mesure 48°. Calcule la mesure des angles ${W('ABC')} et ${W('ACB')}. Rédige.`,
        // Relecture du 03/11/2026 : « bien écrire les propriétés » (données, propriétés, puis les calculs une étape par ligne).
        corr: cm1Redac('Angles à la base', { suite: [`ABC est un triangle isocèle en A et ${W('BAC')} = 48°.`,
          'Or, dans un triangle, la somme des angles est égale à 180° ; et dans un triangle isocèle, les angles à la base ont la même mesure.',
          `Donc ${W('ACB')} = ${W('ABC')} et ${W('BAC')} + ${W('ABC')} + ${W('ACB')} = 180°.`, `Donc ${W('BAC')} + 2 × ${W('ACB')} = 180°`, `48° + 2 × ${W('ACB')} = 180°`,
          `2 × ${W('ACB')} = 180° − 48° = 132°`, `${W('ACB')} = 132° : 2 = 66°`] }, `Les angles ${W('ABC')} et ${W('ACB')} mesurent 66° chacun.`) },
      // Relecture du 03/11/2026 : « jamais entendu le terme obtusangle ; prends des valeurs qui donnent un triangle isocèle ».
      { etoiles: 3, cahier: true, consigne: 'Un triangle a un angle de 36° ; le deuxième angle est le triple du premier. Quel est le troisième angle ? Quelle est la nature du triangle ?',
        corr: cm1Redac('Deuxième angle', '3 × 36° = 108°', 'Le deuxième angle mesure 108°.') + cm1Redac('Troisième angle', '180° − 36° − 108° = 36°', 'Le troisième angle mesure 36°. Le triangle a deux angles de même mesure (36° et 36°) : il est isocèle.') },
    ] },
  // Hors programme de 5e (BO 2026 ; en 6e, BO 2025, seul « supplémentaires » est nommé) -- demandé le 02/11/2026 :
  // « pour aller plus loin ».
  { titre: 'Pour aller plus loin : angles complémentaires', duree: '25 min',
    attendus: ['Savoir que deux angles complémentaires ont pour somme 90°', 'Calculer le complément d\'un angle aigu', 'Reconnaître des angles complémentaires ou supplémentaires'],
    exos: [
      // Pleine largeur (relecture 5e-G2-P6-E2 du 03/11/2026 : l'exercice voisin passe en pleine largeur) : huit calculs sur deux colonnes.
      { etoiles: 1, consigne: 'Pour aller plus loin : deux angles complémentaires ont une somme de 90°. Calcule.',
        ...rmp([['Complément de 35° : @ °', 55], ['Complément de 72° : @ °', 18], ['Complément de 45° : @ °', 45], ['Complément de 89° : @ °', 1], ['Complément de 18° : @ °', 72], ['Complément de 60° : @ °', 30], ['Complément de 9° : @ °', 81], ['Complément de 37,5° : @ °', '52,5']], 2) },
      // Relecture du 03/11/2026 : « sur un cahier, une case à cocher est préférable à entourer ». Papier : cases ☐ ; écran : choix à cliquer.
      // Relecture du 03/11/2026 : « ça prend trop de place, à mettre en pleine largeur et sur deux colonnes ».
      { etoiles: 1, consigne: 'Pour aller plus loin : ces deux angles sont-ils complémentaires, supplémentaires, ou aucun des deux ? Coche la bonne case.',
        ...(() => { const O = ['complémentaires', 'supplémentaires', 'aucun des deux'], l = [['30° et 60° :', 0], ['100° et 80° :', 1], ['45° et 135° :', 1], ['50° et 50° :', 2], ['25° et 65° :', 0], ['90° et 90° :', 1], ['40° et 40° :', 2], ['120° et 50° :', 2]];
          const ec = chx(l.map(([t, r]) => [t, O[r], O.join(' · ')]));
          // Tableau à cocher : les trois mots en tête de colonne, une ligne par paire d'angles, deux tableaux côte à côte.
          const tb = (L, corr) => `<table style="border-collapse:collapse;width:100%;"><tr><th></th>${O.map(o => `<th style="font-size:.78em;font-weight:600;color:#5B6472;padding:0 3px 3px;text-align:center;">${o}</th>`).join('')}</tr>`
            + L.map(([t, r]) => `<tr style="border-top:1px solid #E3E8EF;"><td style="white-space:nowrap;padding:4px 6px 4px 0;">${t.replace(' :', '')}</td>${O.map((o, i) => `<td style="text-align:center;font-size:1.15em;">${corr && i === r ? '<span class="pl-rep">☑</span>' : '☐'}</td>`).join('')}</tr>`).join('') + '</table>';
          const g = corr => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;">${tb(l.slice(0, 4), corr)}${tb(l.slice(4), corr)}</div>`;
          // À l'écran aussi des cases à cocher (relecture 5e-G2-P6-E2 du 12/11/2026 : « Pourquoi ne pas mettre des cases à cocher
          // (ou bouton radio) également à l'écran ? ») : un clic coche ✓, un autre décoche ; les cases à laisser vides comptent faux si cochées.
          const tbE = (L, corr) => `<table style="border-collapse:collapse;width:100%;"><tr><th></th>${O.map(o => `<th style="font-size:.78em;font-weight:600;color:#5B6472;padding:0 3px 3px;text-align:center;">${o}</th>`).join('')}</tr>`
            + L.map(([t, r]) => `<tr style="border-top:1px solid #E3E8EF;"><td style="white-space:nowrap;padding:4px 6px 4px 0;">${t.replace(' :', '')}</td>${O.map((o, i) => `<td style="text-align:center;">${corr ? (i === r ? plRep('✓') : '<span class="pl-rep" data-vide></span>') : plCase('✓')}</td>`).join('')}</tr>`).join('') + '</table>';
          const gE = corr => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;">${tbE(l.slice(0, 4), corr)}${tbE(l.slice(4), corr)}</div>`;
          void ec;
          return { eleve: g(false), corr: g(true),
            ecran: { eleve: gE(false), corr: gE(true) } }; })() },
      { etoiles: 3, cahier: true, consigne: 'Pour aller plus loin : deux angles sont complémentaires et l\'un est le double de l\'autre. Quelles sont leurs mesures ?',
        // Relecture du 03/11/2026 : « un dessin à main levée avec â et 2â dans la correction uniquement ».
        corr: `<div style="text-align:center;">${(() => { const V = [30, 100];
            return S(170, 116, ML(V, [160, 100], K, 2, 1) + ML(V, [30, 8], K, 2, -1) + ML(V, P(V, 30, 128), K, 2, 1)
              + `<polyline points="${V[0] + 10},${V[1]} ${V[0] + 10},${V[1] - 10} ${V[0]},${V[1] - 10}" fill="none" stroke="${Ro}" stroke-width="1.4"/>`
              + arc(V, 0, 30, 46, Bl, 'â') + arc(V, 30, 90, 34, Ve, '2â'), 170); })()}</div>`
          + cm1Redac('Mesures des deux angles', { suite: [`${W('a')} + 2${W('a')} = 90° (angles complémentaires)`, `3 × ${W('a')} = 90°`, `${W('a')} = 90° : 3 = 30°`, `2${W('a')} = 2 × 30° = 60°`] }, 'Les angles mesurent 30° et 60°.') },
    ] },
  // Demandé le 03/11/2026 : « il manque des exercices plus complexes dans ces chapitres » -- problèmes qui enchaînent plusieurs
  // propriétés (alignement, parallélisme, triangles particuliers). Énoncés et figures originaux.
  { titre: 'Problèmes : enchaîner les propriétés', duree: '50 min',
    attendus: ['Enchaîner plusieurs propriétés pour calculer des angles', 'Démontrer que des points sont alignés', 'Démontrer que deux droites sont parallèles'],
    exos: [
      { etoiles: 3, cahier: true, consigne: `Sur cette figure, DA = DB, le triangle DBE est équilatéral et EB = EC.<br>a. Calcule la mesure des angles ${W('ABD')}, ${W('DBE')} et ${W('EBC')}.<br>b. Déduis-en que les points A, B et C sont alignés.<br>c. Reproduis la figure en commençant par le segment [AB] de 8 cm.`,
        ...(() => { const A = [40, 160], Bp = [200, 160], D = [120, 160 - 80 * Math.tan(rad(40))], E = P(Bp, 80, Math.hypot(80, 80 * Math.tan(rad(40)))), C = [2 * E[0] - Bp[0], 160];
          const f = px => S(280, 144, `<g transform="translate(0,-38)"><polygon points="${[D, Bp, E].map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#FFF3D6"/>` + L(A, Bp) + L(Bp, C) + L(A, D) + L(D, Bp) + L(D, E) + L(Bp, E) + L(E, C)
            + tk(A, D) + tk(D, Bp) + tk(D, E) + tk(Bp, E) + tk(E, C) + arc(D, 220, 320, 16, Ro, '100°') + arc(E, 260, 280, 30, Bl) + T([E[0] + 26, E[1] + 30], '20°', Bl, 11)
            + T([A[0] - 8, A[1] + 13], 'A', K) + T([Bp[0], Bp[1] + 15], 'B', K) + T([C[0] + 8, C[1] + 13], 'C', K) + T([D[0] - 10, D[1] - 6], 'D', K) + T([E[0] + 4, E[1] - 8], 'E', K) + '</g>', px);
          // Corrigé (relecture du 13/11/2026) : la propriété en phrase, puis le calcul seul sur sa ligne ; figure à droite du texte.
          return { eleve: `<div style="text-align:center;">${f(280)}</div>`,
            corr: `<div style="float:right;margin:0 0 4px 12px;">${f(220)}</div>` + cm1Redac('Mesures des trois angles en B', { suite: [
              `Le triangle ABD est isocèle en D (DA = DB) : ses angles à la base ont la même mesure, et la somme de ses angles vaut 180°.`,
              `${W('ABD')} = ${cm1Frac('180° − 100°', 2)} = ${cm1Frac('80°', 2)} = ${R('40°')}`,
              `Le triangle DBE est équilatéral : ses trois angles mesurent 60°.`,
              `${W('DBE')} = ${R('60°')}`,
              `Le triangle BEC est isocèle en E (EB = EC), et son angle en E mesure 20°.`,
              `${W('EBC')} = ${cm1Frac('180° − 20°', 2)} = ${cm1Frac('160°', 2)} = ${R('80°')}`] }, '')
              + cm1Redac('Les points sont-ils alignés ?', { suite: [`Les angles ${W('ABD')}, ${W('DBE')} et ${W('EBC')} sont adjacents deux à deux.`, `${W('ABD')} + ${W('DBE')} + ${W('EBC')} = 40° + 60° + 80° = 180°`, `L'angle ${W('ABC')} mesure donc 180° : c'est un angle plat.`] }, 'Les points A, B et C sont alignés.') }; })() },
      { etoiles: 3, cahier: true, consigne: `ABC est un triangle isocèle en A tel que ${W('BAC')} = 50°. M est un point de [AB] et N un point de [AC] tels que AM = AN.<br>Démontre que les droites (MN) et (BC) sont parallèles.`,
        ...(() => { const A = [140, 22], Bp = [70, 172], C = [210, 172], M = [A[0] + .45 * (Bp[0] - A[0]), A[1] + .45 * (Bp[1] - A[1])], N = [A[0] + .45 * (C[0] - A[0]), A[1] + .45 * (C[1] - A[1])];
          const f = px => S(280, 192, L(A, Bp) + L(A, C) + L(Bp, C) + L(M, N, Bl) + tk(A, M) + tk(A, N) + tk(M, Bp, 2) + tk(N, C, 2) + arc(A, 245, 295, 20, Ro, '50°')
            + T([A[0], A[1] - 6], 'A', K) + T([Bp[0] - 9, Bp[1] + 12], 'B', K) + T([C[0] + 9, C[1] + 12], 'C', K) + T([M[0] - 11, M[1] + 2], 'M', K) + T([N[0] + 11, N[1] + 2], 'N', K), px);
          return { eleve: `<div style="text-align:center;">${f(280)}</div>`,
            corr: `<div style="float:right;margin:0 0 4px 12px;">${f(190)}</div>` + cm1Redac('Démonstration', { suite: [
              `Le triangle ABC est isocèle en A : ses angles à la base ont la même mesure, et la somme de ses angles vaut 180°.`,
              `${W('ABC')} = ${cm1Frac('180° − 50°', 2)} = ${cm1Frac('130°', 2)} = 65°`,
              `Le triangle AMN est isocèle en A (AM = AN), et son angle en A est l'angle ${W('BAC')}, de 50°.`,
              `${W('AMN')} = ${cm1Frac('180° − 50°', 2)} = ${cm1Frac('130°', 2)} = 65°`,
              `Les angles ${W('AMN')} et ${W('ABC')} sont correspondants (droites (MN) et (BC), sécante (AB)) et ont la même mesure, 65°.`,
              `Or, si deux angles correspondants ont la même mesure, alors les droites sont parallèles.`] }, 'Les droites (MN) et (BC) sont parallèles.') }; })() },
      { etoiles: 2, col: 1, consigne: `Les droites (d1) et (d2) sont parallèles. Calcule la mesure des angles ${W('x')}, ${W('y')} et ${W('z')} du triangle ABC.`,
        ...(() => { const A = [122, 34], Bp = [A[0] - 110 / Math.tan(rad(50)), 144], C = [A[0] + 110 / Math.tan(rad(70)), 144];
          const f = S(250, 166, L([10, 34], [240, 34]) + L([10, 144], [240, 144]) + L(A, Bp) + L(A, C) + arc(A, 180, 230, 22, Ro, '50°') + arc(A, 290, 360, 22, Bl, '70°')
            + arc(Bp, 0, 50, 20, Ve, 'x\u0302') + arc(C, 110, 180, 20, Ve, 'y\u0302') + arc(A, 230, 290, 16, Vi, 'z\u0302')
            + T([A[0], A[1] - 7], 'A', K) + T([Bp[0] - 4, Bp[1] + 14], 'B', K) + T([C[0] + 4, C[1] + 14], 'C', K) + T([226, 26], '(d1)', K, 11) + T([226, 136], '(d2)', K, 11), 240), fc = f.replace('width:240px', 'width:190px');
          const q = rmp([[`${W('x')} = @ °`, 50], [`${W('y')} = @ °`, 70], [`${W('z')} = @ °`, 60]], 2);
          // Une phrase (la propriété), puis le calcul seul sur sa ligne (relecture du 13/11/2026 : pas de mots dans une ligne de calcul).
          return { eleve: f + q.eleve, corr: fc + plListe([PH(`Les droites (d1) et (d2) sont parallèles ; ${W('x')} et l'angle de 50° sont alternes-internes, donc ils ont la même mesure.`, `${W('x')} = ${R('50°')}`),
            PH(`De même, ${W('y')} et l'angle de 70° sont alternes-internes.`, `${W('y')} = ${R('70°')}`), PH('Dans le triangle ABC, la somme des angles vaut 180°.', `${W('z')} = 180° − 50° − 70° = ${R('60°')}`)]) }; })() },
      { etoiles: 2, col: 1, consigne: `ABC est un triangle rectangle en A tel que ${W('ABC')} = 35°. H est le pied de la hauteur issue de A. Calcule la mesure des angles ${W('ACB')}, ${W('BAH')} et ${W('HAC')}.`,
        ...(() => { const Bp = [20, 150], C = [235, 150], A = P(Bp, 35, 215 * Math.cos(rad(35))), H = [A[0], 150];
          const f = S(250, 170, L(Bp, C) + L(Bp, A) + L(A, C) + L(A, H, Bl)  + rangle(A, Bp, C) + rangle(H, A, C)
            + arc(Bp, 0, 35, 26, Ro, '35°') + T([A[0] + 2, A[1] - 7], 'A', K) + T([Bp[0] - 2, Bp[1] + 14], 'B', K) + T([C[0] + 2, C[1] + 14], 'C', K) + T([H[0], H[1] + 14], 'H', K), 240), fc = f.replace('width:240px', 'width:190px');
          const q = rmp([[`${W('ACB')} = @ °`, 55], [`${W('BAH')} = @ °`, 55], [`${W('HAC')} = @ °`, 35]], 2);
          // Relecture du 13/11/2026 : la propriété utilisée en phrase, puis le calcul seul sur sa ligne (plus de « Triangle ABC : … », « donc »).
          return { eleve: f + q.eleve, corr: fc + plListe([PH('Dans le triangle ABC, rectangle en A, la somme des angles vaut 180°.', `${W('ACB')} = 180° − 90° − 35° = ${R('55°')}`),
            PH('Dans le triangle ABH, rectangle en H, la somme des angles vaut 180°.', `${W('BAH')} = 180° − 90° − 35° = ${R('55°')}`),
            PH(`L'angle ${W('BAC')} est droit, et ${W('BAH')} + ${W('HAC')} = ${W('BAC')}.`, `${W('HAC')} = 90° − 55° = ${R('35°')}`)]) }; })() },
    ] },
  // Hors programme de 5e (« pour aller plus loin ») : la somme des angles d'un polygone, d'après la somme des angles d'un triangle.
  { titre: 'Pour aller plus loin : angles d\'un polygone', duree: '40 min',
    attendus: ['Partager un polygone en triangles', 'Calculer la somme des angles d\'un polygone', 'Calculer la mesure de l\'angle d\'un polygone régulier'],
    exos: [
      { etoiles: 2, consigne: 'Pour aller plus loin : les diagonales issues d\'un même sommet partagent un polygone en triangles. Complète.',
        ...(() => { const poly = n => { const V = [55, 52], Q = Array.from({ length: n }, (_, k) => P(V, 90 + 360 * k / n + (n === 4 ? 45 : 0), 44)), sh = ['#FFF3D6', '#E3F2F7', '#E7F4EC', '#F0E9FA'];
              let g = ''; for(let k = 1; k < n - 1; k++) g += `<polygon points="${[Q[0], Q[k], Q[k + 1]].map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${sh[(k - 1) % 4]}" stroke="${K}" stroke-width="1.2"/>`;
              return S(110, 104, g, 100); };
          const figs = duo([col(poly(4), 'quadrilatère'), col(poly(5), 'pentagone'), col(poly(6), 'hexagone')]);
          const q = rmp([['Quadrilatère : @ triangles', 2], ['Somme des angles d\'un quadrilatère : @ °', 360], ['Pentagone : @ triangles', 3], ['Somme des angles d\'un pentagone : @ °', 540], ['Hexagone : @ triangles', 4], ['Somme des angles d\'un hexagone : @ °', 720], ['Polygone à n côtés : (n − @) × 180°', 2], ['Décagone (10 côtés) : @ °', 1440]], 3);
          return { eleve: figs + q.eleve, corr: figs + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Pour aller plus loin : un polygone régulier a tous ses angles de même mesure. Calcule la mesure d\'un de ses angles.',
        ...rmp([['Triangle équilatéral : @ °', 60], ['Carré : @ °', 90], ['Pentagone régulier : @ °', 108], ['Hexagone régulier : @ °', 120], ['Octogone régulier : @ °', 135]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Pour aller plus loin : ABCDE est un pentagone régulier ; on trace les diagonales [AC] et [AD].<br>a. Calcule ${W('BAC')}, puis ${W('DAE')} et ${W('CAD')}. Que remarques-tu ?<br>b. Vérifie avec la Géométrie interactive du site (menu L'Atelier) : un polygone régulier à 5 sommets, ses diagonales issues de A, puis la mesure des angles. Déplace les points : le résultat change-t-il ?`,
        ...(() => { const V = [100, 92], Q = [90, 18, -54, -126, 162].map(a => P(V, a, 72)), nm = ['A', 'B', 'C', 'D', 'E'];
          const base = Q.map((q, i) => L(q, Q[(i + 1) % 5])).join('') + L(Q[0], Q[2], Bl) + L(Q[0], Q[3], Bl) + Q.map((q, i) => T(P(V, [90, 18, -54, -126, 162][i], 85), nm[i], K)).join('');
          const f = S(200, 180, base, 190), fc = S(200, 180, base + arc(Q[0], 216, 252, 40, Ro, '36°') + arc(Q[0], 252, 288, 46, Ve, '36°') + arc(Q[0], 288, 324, 40, Ro, '36°'), 190);
          return { eleve: `<div style="text-align:center;">${f}</div>`, corr: `<div style="text-align:center;">${fc}</div>` + cm1Redac('Angle du pentagone régulier', { suite: ['(5 − 2) × 180° = 540°', '540° : 5 = 108°'] }, 'Chaque angle du pentagone régulier mesure 108°.')
            + cm1Redac('Angle ' + W('BAC'), `${cm1Frac('180° − 108°', 2)} = ${cm1Frac('72°', 2)} = 36°`, 'Le triangle ABC est isocèle en B (BA = BC) et ' + W('ABC') + ' = 108°.')
            + cm1Redac('Angle ' + W('DAE'), '', 'De même, le triangle AED est isocèle en E : ' + W('DAE') + ' = 36°.')
            + cm1Redac('Angle ' + W('CAD'), '108° − 36° − 36° = 36°', 'Les deux diagonales partagent l\'angle en A en trois angles égaux de 36°.') }; })() },
    ] },
  { titre: 'Automatismes', duree: '20 min',
    attendus: ['Calculer un angle supplémentaire ou opposé par le sommet', 'Utiliser la somme des angles d\'un triangle', 'Utiliser les angles formés par des parallèles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Supplémentaire d\'un angle de 70° : @', '110°'], ['Supplémentaire d\'un angle de 125° : @', '55°'], ['Opposé par le sommet à un angle de 38° : @', '38°']]) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Angle droit : @', '90°'], ['Angle plat : @', '180°'], ['Tour complet : @', '360°'], ['Angles de l\'équerre : 30°, 60° et @', '90°']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule le troisième angle du triangle.', ...P3.rmp([['50° et 60° : @', '70°'], ['90° et 35° : @', '55°'], ['112° et 41° : @', '27°']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Triangle isocèle, angle au sommet 40° : angles à la base @', '70°'], ['Triangle équilatéral : chaque angle @', '60°'], ['Triangle rectangle isocèle : angles aigus @', '45°']]) },
      { etoiles: 2, consigne: 'Deux droites parallèles sont coupées par une sécante. Un des angles formés mesure 72°. Complète.', ...P3.rmp([['Son alterne-interne : @', '72°'], ['Son correspondant : @', '72°'], ['Son adjacent supplémentaire : @', '108°']], 3) },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.', ...P3.ch([['Deux angles alternes-internes formés par deux parallèles ont la même mesure.', 'vrai'], ['Deux angles correspondants ont toujours la même mesure.', 'faux'], ['Un triangle peut avoir des angles de 90°, 60° et 40°.', 'faux']], 'vrai · faux') },
    ] },
];
})();

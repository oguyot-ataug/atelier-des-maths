/* ============================================================
   5e · Planches : Angles et parallélisme (G2)
   Angles adjacents, opposés par le sommet, complémentaires, supplémentaires ; angles alternes-internes et
   correspondants ; parallélisme ; somme des angles d'un triangle.
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
  return `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} A${r},${r} 0 ${large} 0 ${q[0].toFixed(1)},${q[1].toFixed(1)}" fill="none" stroke="${c || Ro}" stroke-width="2"/>` + (txt != null ? T(P(V, (a1 + b) / 2, r + 12), txt, c || Ro, 11) : ''); }
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const W = n => cm1Tex(`\\widehat{${n}}`);
// Deux droites (d1) et (d2) (pentes p1, p2 en degrés) coupées par une sécante d'angle s ; angles numérotés 1 à 8.
// Aux points E (sur d1) et F (sur d2) : 1 = entre sécante haute et d1 droite, puis sens direct.
function secante(o){ const { p1 = 0, p2 = 0, s = 62, w = 250, h = 170, num = true, marques = [], noms = true } = o, E = [w * .56, h * .3], F = [E[0] - (h * .42) / Math.tan(rad(s)), h * .72]; // F sur la sécante, sous E (direction s de F vers E)
  let g = ''; const dr = (V, a, len) => L(P(V, a + 180, len), P(V, a, len), K, 1.8);
  g += dr(E, p1, w * .48) + dr(F, p2, w * .48) + L(P(E, s, 52), P(F, s + 180, 52), Bl, 1.8);
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
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
PLANCHES['5e|Angles et parallélisme'] = [
  { titre: 'Angles adjacents, complémentaires, supplémentaires', duree: '35 min',
    attendus: ['Reconnaître deux angles adjacents', 'Savoir que deux angles complémentaires ont pour somme 90°, supplémentaires 180°', 'Calculer le complément ou le supplément d\'un angle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['Complément de 35° : @ °', 55], ['Complément de 72° : @ °', 18], ['Supplément de 110° : @ °', 70], ['Supplément de 45° : @ °', 135], ['Supplément de 90° : @ °', 90]], 2) },
      { etoiles: 1, col: 1, consigne: 'Ces deux angles sont-ils complémentaires, supplémentaires, ou ni l\'un ni l\'autre ? Entoure.',
        ...chx([['30° et 60° :', 'complémentaires', 'complémentaires · supplémentaires · ni l\'un ni l\'autre'], ['100° et 80° :', 'supplémentaires', 'complémentaires · supplémentaires · ni l\'un ni l\'autre'], ['45° et 135° :', 'supplémentaires', 'complémentaires · supplémentaires · ni l\'un ni l\'autre'], ['50° et 50° :', 'ni l\'un ni l\'autre', 'complémentaires · supplémentaires · ni l\'un ni l\'autre']]) },
      { etoiles: 2, consigne: 'Les angles marqués sont-ils adjacents ? Entoure.',
        ...(() => { const f1 = S(140, 90, L([20, 75], [125, 75]) + L([60, 75], [95, 15]) + L([60, 75], [25, 20]) + arc([60, 75], 0, 60, 18, Ro) + arc([60, 75], 60, 124, 26, Bl), 120),
            f2 = S(140, 90, L([15, 75], [125, 75]) + L([70, 75], [40, 15]) + L([70, 75], [110, 20]) + arc([70, 75], 0, 54, 18, Ro) + arc([70, 75], 117, 180, 18, Bl), 120);
          return { eleve: duo([col(f1, '<b>a</b> <b>oui · non</b>'), col(f2, '<b>b</b> <b>oui · non</b>')]), corr: duo([col(f1, '<b>a</b> ' + plEntoure('oui')), col(f2, '<b>b</b> ' + plEntoure('non'))]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles adjacents ont le même sommet et un côté commun :', 'vrai'], ['Deux angles complémentaires sont forcément adjacents :', 'faux'], ['Un angle obtus peut avoir un complément :', 'faux'], ['Deux angles droits sont supplémentaires :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Les points A, O, B sont alignés. Calcule l\'angle manquant.',
        ...(() => { const f = S(220, 100, L([15, 85], [205, 85]) + L([110, 85], [160, 18]) + arc([110, 85], 0, 53, 20, Ro, '53°') + arc([110, 85], 53, 180, 26, Bl, '?') + T([12, 98], 'A', K) + T([208, 98], 'B', K) + T([110, 99], 'O', K), 220), q = rmp([['Angle manquant : @ °', 127]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux angles sont complémentaires et l\'un est le double de l\'autre. Quelles sont leurs mesures ?',
        corr: cm1Redac('Mesures', { suite: ['Le petit angle et son double font 3 fois le petit angle : 3 × a = 90°.', 'a = 90 : 3 = 30° ; le double vaut 60°.'] }, 'Les angles mesurent 30° et 60°.') },
    ] },
  { titre: 'Angles opposés par le sommet', duree: '30 min',
    attendus: ['Reconnaître deux angles opposés par le sommet', 'Savoir que deux angles opposés par le sommet ont la même mesure', 'Calculer les quatre angles formés par deux droites sécantes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Deux droites sécantes forment les angles 1, 2, 3 et 4. Entoure.',
        ...(() => { const V = [110, 62], D = [20, 75, 200, 255], f = S(220, 124, L(P(V, 20, 100), P(V, 200, 100)) + L(P(V, 75, 60), P(V, 255, 60)) + D.map((a, k) => { let b = D[(k + 1) % 4]; while(b <= a) b += 360; return T(P(V, (a + b) / 2, 26), String(k + 1), Vi, 12); }).join(''), 220),
            q = chx([['L\'angle opposé par le sommet à l\'angle 1 :', 'l\'angle 3', 'l\'angle 2 · l\'angle 3 · l\'angle 4'], ['Les angles 1 et 2 sont…', 'adjacents et supplémentaires', 'opposés par le sommet · adjacents et supplémentaires']]);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 1, col: 1, consigne: 'Deux droites sécantes ; un des angles mesure 40°. Complète les trois autres (dans l\'ordre, en tournant).',
        ...(() => { const V = [110, 60], f = S(220, 120, L(P(V, 20, 100), P(V, 200, 100)) + L(P(V, 60, 70), P(V, 240, 70)) + arc(V, 20, 60, 22, Ro, '40°') + arc(V, 60, 200, 30, Bl, 'a') + arc(V, 200, 240, 22, Ve, 'b') + arc(V, 240, 380, 30, Vi, 'c'), 220), q = rmp([['a = @ °', 140], ['b = @ °', 40], ['c = @ °', 140]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Deux angles opposés par le sommet mesurent 75° et @ °.', 75], ['Deux droites sécantes forment un angle de 90° : les trois autres mesurent @ °.', 90], ['Si un angle mesure 128°, l\'angle adjacent sur la même droite mesure @ °.', 52]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles opposés par le sommet sont adjacents :', 'faux'], ['Deux angles opposés par le sommet ont la même mesure :', 'vrai'], ['Deux droites sécantes forment toujours deux paires d\'angles égaux :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Deux droites sécantes forment un angle de 112°. Entoure les mesures des trois autres angles.',
        ...chx([['L\'angle opposé par le sommet :', '112°', '68° · 112° · 180°'], ['Les deux autres angles :', '68° et 68°', '68° et 68° · 112° et 68° · 78° et 78°']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace deux droites sécantes en O formant un angle de 35°. Sans rapporteur, donne la mesure des trois autres angles. Justifie.',
        corr: cm1Redac('Mesures', { suite: ['L\'angle opposé par le sommet mesure aussi 35°.', 'Les deux autres sont supplémentaires de 35° : 180 − 35 = 145°.'] }, 'Les quatre angles mesurent 35°, 145°, 35° et 145°.') },
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
        corr: cm1Redac('Observation', 'Quand les droites ne sont pas parallèles, les angles alternes-internes (ou correspondants) n\'ont pas la même mesure.', 'Ils ne sont égaux que si les deux droites sont parallèles.') },
    ] },
  { titre: 'Angles et droites parallèles', duree: '40 min',
    attendus: ['Si deux droites parallèles sont coupées par une sécante, alors les angles alternes-internes (et correspondants) sont égaux', 'Réciproque : des angles alternes-internes égaux prouvent le parallélisme', 'Calculer des angles et rédiger une justification'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Les droites (d₁) et (d₂) sont parallèles. L\'angle 1 mesure 62°. Complète.',
        ...(() => { const f = secante({ p1: 0, p2: 0, s: 62, w: 250, h: 160, marques: [[1, Ro, '62°']] }), q = rmp([['Angle 5 (correspondant) : @ °', 62], ['Angle 3 (opposé) : @ °', 62], ['Angle 2 : @ °', 118], ['Angle 7 : @ °', 62]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Les droites sont-elles parallèles ? Entoure (angles alternes-internes marqués).',
        ...(() => { const f1 = secante({ p1: 0, p2: 0, s: 60, w: 160, h: 120, num: false, noms: false, marques: [[4, Ro, '60°'], [6, Bl, '60°']], px: 150 }), f2 = secante({ p1: 0, p2: 8, s: 60, w: 160, h: 120, num: false, noms: false, marques: [[4, Ro, '60°'], [6, Bl, '52°']], px: 150 });
          return { eleve: duo([col(f1, '<b>a</b> <b>oui · non</b>'), col(f2, '<b>b</b> <b>oui · non</b>')]), corr: duo([col(f1, '<b>a</b> ' + plEntoure('oui')), col(f2, '<b>b</b> ' + plEntoure('non'))]) }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète la propriété.',
        ...rmp([['Si deux droites @ sont coupées par une sécante, alors les angles alternes-internes ont la même mesure.', 'parallèles'], ['Si deux angles correspondants ont la même mesure, alors les droites sont @.', 'parallèles']], 9) },
      { etoiles: 2, col: 1, consigne: '(d₁) // (d₂). Calcule les angles x et y.',
        ...(() => { const f = secante({ p1: 0, p2: 0, s: 70, w: 230, h: 150, num: false, marques: [[2, Ro, '110°'], [6, Bl, 'x'], [5, Ve, 'y']] }), q = rmp([['x = @ °', 110], ['y = @ °', 70]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux droites (d) et (d\') sont coupées par une sécante. Deux angles alternes-internes mesurent 47° chacun. Démontre que (d) et (d\') sont parallèles (rédige : données, propriété, conclusion).',
        corr: cm1Redac('Démonstration', { suite: ['Données : les angles alternes-internes mesurent tous les deux 47°.', 'Propriété : si deux angles alternes-internes ont la même mesure, alors les droites sont parallèles.'] }, 'Conclusion : (d) et (d\') sont parallèles.') },
    ] },
  { titre: 'Somme des angles d\'un triangle', duree: '40 min',
    attendus: ['Savoir que la somme des angles d\'un triangle vaut 180°', 'Calculer le troisième angle d\'un triangle', 'Utiliser les angles des triangles particuliers (isocèle, équilatéral, rectangle)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le troisième angle du triangle.',
        ...(() => { const l = [['50° et 70°', 60], ['90° et 35°', 55], ['110° et 25°', 45], ['60° et 60°', 60], ['12,5° et 100°', '67,5']]; return { eleve: plListe(l.map(([t]) => `${t} : ${B(2)} °`)), corr: plListe(l.map(([t, r]) => `${t} : ${R(r)} °`)) }; })() },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'angle marqué d\'un point d\'interrogation.',
        ...(() => { const f = tri([[20, 110], [190, 110], [80, 20]], ['A', 'B', 'C'], [[0, '57°', Ro], [1, '34°', Bl], [2, '?', Ve]], 210), q = rmp([[`${W('ACB')} = @ °`, 89]], 2);
          return { eleve: f + q.eleve, corr: f + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Triangles particuliers : complète.',
        ...rmp([['Triangle équilatéral : chaque angle mesure @ °', 60], ['Triangle rectangle avec un angle de 28° : le troisième mesure @ °', 62], ['Triangle isocèle, angle au sommet 40° : chaque angle à la base mesure @ °', 70], ['Triangle isocèle, angles à la base de 35° : angle au sommet @ °', 110]], 2) },
      { etoiles: 2, col: 1, consigne: 'Ces triangles existent-ils ? Entoure.',
        ...ch([['Angles de 90°, 60° et 30° :', 'oui'], ['Angles de 100°, 50° et 40° :', 'non'], ['Deux angles droits :', 'non'], ['Angles de 45°, 45° et 90° :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un triangle peut avoir deux angles obtus :', 'faux'], ['Dans un triangle rectangle, les deux angles aigus sont complémentaires :', 'vrai'], ['Un triangle peut avoir trois angles aigus :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'ABC est un triangle isocèle en A tel que l\'angle BAC mesure 48°. Calcule les angles ABC et ACB. Rédige.',
        corr: cm1Redac('Angles à la base', { suite: ['Somme des angles : 180°. Les deux angles à la base sont égaux (triangle isocèle).', '(180 − 48) : 2 = 132 : 2 = 66'] }, 'Les angles ABC et ACB mesurent 66° chacun.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un triangle a un angle de 40° ; le deuxième angle est le triple du premier. Quel est le troisième angle ? Quelle est la nature du triangle ?',
        corr: cm1Redac('Troisième angle', '40 × 3 = 120 et 180 − 40 − 120 = 20', 'Le troisième angle mesure 20° : le triangle a un angle obtus (120°), il est obtusangle.') },
    ] },
];
})();

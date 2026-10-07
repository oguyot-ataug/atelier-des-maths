/* ============================================================
   5e · Planches : Parallélogrammes (G4)
   Définition, propriétés (côtés, diagonales, angles, centre de symétrie), reconnaître un parallélogramme,
   construire (4e sommet à placer et côtés à tracer sur quadrillage, à l'écran), calculer.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
const vig = inner => S(120, 96, `<rect x="1" y="1" width="118" height="94" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 104);
const W = n => cm1Tex(`\\widehat{${n}}`);
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
const pt = (p, n, c, dx, dy) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${c || K}"/>` + T([p[0] + (dx == null ? 8 : dx), p[1] + (dy == null ? -6 : dy)], n, c || K, 13);
// Quatrième sommet D tel que ABCD soit un parallélogramme (outil points) : D = A + C − B.
function quatrieme(A, Bp, C, w, h, k){ k = k || 22; const D = [A[0] + C[0] - Bp[0], A[1] + C[1] - Bp[1]];
  const base = g => L(g(...A), g(...Bp), K, 2) + L(g(...Bp), g(...C), K, 2) + pt(g(...A), 'A') + pt(g(...Bp), 'B') + pt(g(...C), 'C');
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: ['D'], att: { D: D.map(v => v * k) } }),
    corr: Gq(w, h, k, g => base(g) + L(g(...C), g(...D), Ve, 2, true) + L(g(...A), g(...D), Ve, 2, true) + pt(g(...D), 'D', Ve)) }; }
// Tracer les deux côtés manquants (outil segments).
function finir(A, Bp, C, w, h, k){ k = k || 20; const D = [A[0] + C[0] - Bp[0], A[1] + C[1] - Bp[1]];
  const base = g => L(g(...A), g(...Bp), K, 2.4) + L(g(...Bp), g(...C), K, 2.4) + pt(g(...A), 'A') + pt(g(...Bp), 'B') + pt(g(...C), 'C');
  return { eleve: plX(Gq(w, h, k, base), { t: 'seg', k, ox: 0, oy: 0, w, h, att: [[...C, ...D], [...D, ...A]] }), corr: Gq(w, h, k, g => base(g) + L(g(...C), g(...D), Ve, 2.4) + L(g(...D), g(...A), Ve, 2.4) + pt(g(...D), 'D', Ve)) }; }
PLANCHES['5e|Parallélogrammes'] = [
  { titre: 'Définition et construction', duree: '35 min',
    attendus: ['Savoir qu\'un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles', 'Construire un parallélogramme sur quadrillage', 'Nommer un parallélogramme dans le bon ordre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Place le point D pour que ABCD soit un parallélogramme.', ...quatrieme([1, 4], [3, 1], [8, 2], 9, 6) },
      { etoiles: 1, col: 1, consigne: 'Même consigne.', ...quatrieme([2, 1], [1, 5], [6, 5], 9, 6) },
      { etoiles: 2, col: 1, consigne: 'Trace les deux côtés manquants du parallélogramme ABCD.', ...finir([1, 2], [3, 6], [8, 5], 10, 7) },
      { etoiles: 1, col: 1, consigne: 'Ces quadrilatères sont-ils des parallélogrammes ? Entoure.',
        ...(() => { const V = [vig(poly([[15, 75], [35, 20], [105, 20], [85, 75]])), vig(poly([[15, 75], [35, 20], [95, 20], [105, 75]])), vig(poly([[20, 25], [100, 25], [100, 75], [20, 75]]))];
          return { eleve: duo(V.map((v, i) => col(v, `<b>${'abc'[i]}</b> <b>oui · non</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${'abc'[i]}</b> ${plEntoure(['oui', 'non', 'oui'][i])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'ABCD est un parallélogramme. Entoure.',
        ...chx([['Le côté opposé à [AB] :', '[CD]', '[BC] · [CD] · [AD]'], ['La droite parallèle à (AD) passant par B :', '(BC)', '(BC) · (BD) · (CD)'], ['Les diagonales sont…', '[AC] et [BD]', '[AB] et [CD] · [AC] et [BD]']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis à la règle et à l\'équerre un parallélogramme EFGH tel que EF = 6 cm, FG = 4 cm et l\'angle EFG = 70° (utilise aussi le rapporteur). Décris tes étapes.',
        corr: cm1Redac('Étapes', { suite: ['Je trace [EF] de 6 cm, puis l\'angle de 70° en F et [FG] de 4 cm.', 'Je trace la parallèle à (EF) passant par G et la parallèle à (FG) passant par E : elles se coupent en H.'] }, 'EFGH est un parallélogramme : ses côtés opposés sont parallèles.') },
    ] },
  { titre: 'Côtés et diagonales', duree: '35 min',
    attendus: ['Savoir que les côtés opposés d\'un parallélogramme ont la même longueur', 'Savoir que ses diagonales se coupent en leur milieu', 'Savoir que le point d\'intersection des diagonales est son centre de symétrie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABCD est un parallélogramme de centre O. AB = 7 cm, BC = 4 cm, AC = 9 cm, BD = 6 cm. Complète.',
        ...rmp([['CD = @ cm', 7], ['AD = @ cm', 4], ['OA = @ cm', '4,5'], ['OD = @ cm', 3], ['Périmètre de ABCD : @ cm', 22]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure (ABCD parallélogramme de centre O).',
        ...ch([['O est le milieu de [AC] :', 'vrai'], ['O est le milieu de [AB] :', 'faux'], ['Les diagonales ont toujours la même longueur :', 'faux'], ['O est le centre de symétrie de ABCD :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'EFGH est un parallélogramme de centre I. Complète.',
        ...rmp([['Si EI = 3,5 cm, alors EG = @ cm', 7], ['Si FH = 10 cm, alors IH = @ cm', 5], ['Le symétrique de E par rapport à I est @', 'G'], ['Le symétrique de [EF] par rapport à I est @', '[GH]']], 4) },
      { etoiles: 2, col: 1, consigne: 'Le périmètre d\'un parallélogramme est 30 cm et un côté mesure 9 cm. Complète.',
        ...rmp([['Le côté opposé mesure @ cm', 9], ['Les deux autres côtés mesurent chacun @ cm', 6]], 2) },
      { etoiles: 2, col: 1, consigne: 'Place le point D, symétrique de B par rapport au centre O du parallélogramme ABCD (O est le milieu de [AC]).', ...quatrieme([1, 2], [3, 5], [7, 4], 9, 6) },
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse (ABCD parallélogramme de centre O).',
        ...chx([['Le milieu de [BD] est…', 'O', 'A · O · C'], ['Si OB = 2,5 cm, alors BD =', '5 cm', '2,5 cm · 5 cm · 10 cm'], ['Le symétrique de [AD] par rapport à O est…', '[CB]', '[CB] · [AB] · [CD]']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un parallélogramme ABCD dont les diagonales mesurent AC = 8 cm et BD = 5 cm. Explique ta méthode.',
        corr: cm1Redac('Méthode', { suite: ['Je trace [AC] de 8 cm et je place son milieu O.', 'Je trace une droite passant par O et je place B et D de part et d\'autre de O, à 2,5 cm.'] }, 'Les diagonales se coupent en leur milieu : ABCD est un parallélogramme.') },
    ] },
  { titre: 'Angles d\'un parallélogramme', duree: '35 min',
    attendus: ['Savoir que les angles opposés d\'un parallélogramme ont la même mesure', 'Savoir que deux angles consécutifs sont supplémentaires', 'Calculer les angles d\'un parallélogramme'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABCD est un parallélogramme et l\'angle A mesure 65°. Complète.',
        ...rmp([[`${W('C')} = @ °`, 65], [`${W('B')} = @ °`, 115], [`${W('D')} = @ °`, 115], ['Somme des quatre angles : @ °', 360]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète les angles du parallélogramme EFGH.',
        ...rmp([[`${W('E')} = 100°, donc ${W('F')} = @ °`, 80], [`${W('F')} = 37°, donc ${W('H')} = @ °`, 37], [`${W('G')} = 90°, donc ${W('E')} = @ °`, 90]], 2) },
      { etoiles: 2, col: 1, consigne: 'Ces angles peuvent-ils être ceux d\'un parallélogramme (dans l\'ordre) ? Entoure.',
        ...ch([['60°, 120°, 60°, 120° :', 'oui'], ['70°, 110°, 80°, 100° :', 'non'], ['90°, 90°, 90°, 90° :', 'oui'], ['50°, 50°, 130°, 130° :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles consécutifs d\'un parallélogramme sont complémentaires :', 'faux'], ['Si un angle est droit, les quatre le sont :', 'vrai'], ['Un parallélogramme peut avoir trois angles aigus :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Dans le parallélogramme KLMN, complète.',
        ...rmp([[`${W('K')} = 72°, donc ${W('M')} = @ ° et ${W('L')} = 108°`, 72], [`${W('L')} + ${W('M')} = @ °`, 180], [`Si ${W('N')} = 3 × ${W('K')}, alors ${W('K')} = @ °`, 45]], 2) },
      { etoiles: 1, col: 1, consigne: 'Entoure la propriété utilisée.',
        ...chx([['Les angles opposés…', 'ont la même mesure', 'ont la même mesure · sont supplémentaires'], ['Deux angles consécutifs…', 'sont supplémentaires', 'ont la même mesure · sont supplémentaires']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans le parallélogramme ABCD, l\'angle B mesure le double de l\'angle A. Calcule les quatre angles.',
        corr: cm1Redac('Angles', { suite: ['Deux angles consécutifs sont supplémentaires : A + B = 180°, avec B = 2 × A.', 'Donc 3 × A = 180°, A = 60° et B = 120°.'] }, 'Les angles mesurent 60°, 120°, 60° et 120°.') },
    ] },
  { titre: 'Reconnaître un parallélogramme', duree: '40 min',
    attendus: ['Utiliser une propriété réciproque pour prouver qu\'un quadrilatère est un parallélogramme', 'Lire les codages d\'une figure', 'Rédiger une justification'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le quadrilatère ABCD est-il forcément un parallélogramme ? Entoure.',
        ...ch([['Ses diagonales se coupent en leur milieu :', 'oui'], ['Ses côtés opposés sont parallèles deux à deux :', 'oui'], ['Il a deux côtés parallèles :', 'non'], ['Ses côtés opposés ont la même longueur deux à deux (non croisé) :', 'oui'], ['Ses diagonales ont la même longueur :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'D\'après les codages, est-ce un parallélogramme ? Entoure.',
        ...(() => { const tick = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(...d), u = [-d[1] / l * 5, d[0] / l * 5]; let s = ''; for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2) * 4; s += L([m[0] + d[0] / l * o - u[0], m[1] + d[1] / l * o - u[1]], [m[0] + d[0] / l * o + u[0], m[1] + d[1] / l * o + u[1]], Ro, 1.5); } return s; };
          const Q1 = [[15, 75], [30, 20], [105, 25], [90, 80]], O1 = [60, 50];
          const v1 = vig(poly(Q1) + L(Q1[0], Q1[2], Bl, 1.2) + L(Q1[1], Q1[3], Bl, 1.2) + tick(Q1[0], O1, 1) + tick(O1, Q1[2], 1) + tick(Q1[1], O1, 2) + tick(O1, Q1[3], 2));
          const Q2 = [[15, 75], [35, 20], [95, 20], [105, 75]], v2 = vig(poly(Q2) + tick(Q2[0], Q2[1], 1) + tick(Q2[2], Q2[3], 1));
          const Q3 = [[15, 75], [35, 20], [105, 20], [85, 75]], v3 = vig(poly(Q3) + tick(Q3[0], Q3[1], 1) + tick(Q3[2], Q3[3], 1) + tick(Q3[1], Q3[2], 2) + tick(Q3[3], Q3[0], 2));
          return { eleve: duo([v1, v2, v3].map((v, i) => col(v, `<b>${'abc'[i]}</b> <b>oui · non</b>`))), corr: duo([v1, v2, v3].map((v, i) => col(v, `<b>${'abc'[i]}</b> ${plEntoure(['oui', 'non', 'oui'][i])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète la propriété utilisée.',
        ...rmp([['Si un quadrilatère a ses diagonales qui se coupent en leur @, alors c\'est un parallélogramme.', 'milieu'], ['Si un quadrilatère non croisé a ses côtés opposés de même @, alors c\'est un parallélogramme.', 'longueur']], 7) },
      { etoiles: 2, col: 1, consigne: 'Sur quadrillage : place D pour que les diagonales de ABCD se coupent en leur milieu.', ...quatrieme([1, 1], [6, 2], [7, 5], 9, 6) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Soit ABC un triangle et I le milieu de [BC]. On place D, symétrique de A par rapport à I. Démontre que ABDC est un parallélogramme.',
        corr: cm1Redac('Démonstration', { suite: ['I est le milieu de [BC] (donnée) et le milieu de [AD] (D est le symétrique de A par rapport à I).', 'Les diagonales [AD] et [BC] du quadrilatère ABDC se coupent donc en leur milieu.'] }, 'ABDC est un parallélogramme.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un quadrilatère EFGH vérifie EF = GH = 5 cm et FG = HE = 3 cm. Est-ce forcément un parallélogramme ? Dessine pour vérifier.',
        corr: cm1Redac('Réponse', 'Si EFGH n\'est pas croisé, ses côtés opposés ont la même longueur deux à deux : c\'est un parallélogramme.', 'Attention : un quadrilatère croisé peut aussi avoir ces longueurs sans être un parallélogramme.') },
    ] },
];
})();

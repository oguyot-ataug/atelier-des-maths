/* ============================================================
   5e · Planches : Parallélogrammes particuliers (G5)
   Rectangle, losange, carré : propriétés (côtés, angles, diagonales), reconnaître, construire sur
   quadrillage (4e sommet à placer à l'écran), justifier.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
const vig = inner => S(120, 96, `<rect x="1" y="1" width="118" height="94" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 100);
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
const pt = (p, n, c) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${c || K}"/>` + T([p[0] + 8, p[1] - 6], n, c || K, 13);
function quatrieme(A, Bp, C, w, h, k){ k = k || 20; const D = [A[0] + C[0] - Bp[0], A[1] + C[1] - Bp[1]];
  const base = g => L(g(...A), g(...Bp), K, 2) + L(g(...Bp), g(...C), K, 2) + pt(g(...A), 'A') + pt(g(...Bp), 'B') + pt(g(...C), 'C');
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: ['D'], att: { D: D.map(v => v * k) } }),
    corr: Gq(w, h, k, g => base(g) + L(g(...C), g(...D), Ve, 2, true) + L(g(...A), g(...D), Ve, 2, true) + pt(g(...D), 'D', Ve)) }; }
// Codages : petit trait sur un côté, angle droit.
const tick = (a, b, n) => { const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], d = [b[0] - a[0], b[1] - a[1]], l = Math.hypot(...d), u = [-d[1] / l * 5, d[0] / l * 5]; let s = ''; for(let i = 0; i < (n || 1); i++){ const o = (i - ((n || 1) - 1) / 2) * 4; s += L([m[0] + d[0] / l * o - u[0], m[1] + d[1] / l * o - u[1]], [m[0] + d[0] / l * o + u[0], m[1] + d[1] / l * o + u[1]], Ro, 1.5); } return s; };
const droit = (V, a, b) => { const u = [(a[0] - V[0]), (a[1] - V[1])], v = [(b[0] - V[0]), (b[1] - V[1])], nu = Math.hypot(...u), nv = Math.hypot(...v), p = [V[0] + u[0] / nu * 8, V[1] + u[1] / nu * 8], q = [V[0] + v[0] / nv * 8, V[1] + v[1] / nv * 8], r = [p[0] + v[0] / nv * 8, p[1] + v[1] / nv * 8];
  return `<polyline points="${p.join(',')} ${r.join(',')} ${q.join(',')}" fill="none" stroke="${Ro}" stroke-width="1.4"/>`; };
PLANCHES['5e|Parallélogrammes particuliers'] = [
  { titre: 'Le rectangle', duree: '35 min',
    attendus: ['Savoir qu\'un rectangle est un parallélogramme qui a un angle droit', 'Savoir que ses diagonales ont la même longueur', 'Reconnaître un rectangle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABCD est un rectangle de centre O. AB = 8 cm, BC = 6 cm, AC = 10 cm. Complète.',
        ...rmp([['BD = @ cm', 10], ['OA = @ cm', 5], ['OB = @ cm', 5], ['CD = @ cm', 8], ['Angle ABC = @ °', 90]], 2) },
      { etoiles: 1, col: 1, consigne: 'Place D pour que ABCD soit un rectangle.', ...quatrieme([1, 2], [1, 6], [8, 6], 10, 7) },
      { etoiles: 2, col: 1, consigne: 'Place D pour que ABCD soit un rectangle (côtés « en biais »).', ...quatrieme([3, 1], [1, 5], [7, 8], 10, 9) },
      { etoiles: 2, col: 1, consigne: 'Un parallélogramme ABCD est-il un rectangle ? Entoure.',
        ...ch([['Il a un angle droit :', 'oui'], ['Ses diagonales ont la même longueur :', 'oui'], ['Ses diagonales sont perpendiculaires :', 'non'], ['Ses côtés consécutifs sont perpendiculaires :', 'oui']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'EFGH est un parallélogramme tel que EG = FH = 7 cm. Quelle est sa nature ? Justifie.',
        corr: cm1Redac('Justification', 'EFGH est un parallélogramme dont les diagonales [EG] et [FH] ont la même longueur.', 'Un parallélogramme dont les diagonales ont la même longueur est un rectangle : EFGH est un rectangle.') },
      { etoiles: 2, col: 1, consigne: 'RSTU est un rectangle de centre O avec RT = 9 cm. Complète.',
        ...rmp([['SU = @ cm', 9], ['OR = @ cm', '4,5'], ['OU = @ cm', '4,5'], ['Angle RST = @ °', 90]], 2) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le quadrilatère MNPQ a trois angles droits. Quelle est sa nature ? Justifie.',
        corr: cm1Redac('Nature de MNPQ', { suite: ['La somme des angles d\'un quadrilatère vaut 360°.', '360 − 3 × 90 = 90 : le quatrième angle est droit aussi.'] }, 'Un quadrilatère qui a quatre angles droits est un rectangle : MNPQ est un rectangle.') },
    ] },
  { titre: 'Le losange', duree: '35 min',
    attendus: ['Savoir qu\'un losange a quatre côtés de même longueur', 'Savoir que ses diagonales sont perpendiculaires (et se coupent en leur milieu)', 'Reconnaître un losange'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'KLMN est un losange de centre O. KL = 5 cm, KM = 8 cm, LN = 6 cm. Complète.',
        ...rmp([['LM = @ cm', 5], ['Périmètre : @ cm', 20], ['OK = @ cm', 4], ['OL = @ cm', 3], ['Angle KOL = @ °', 90]], 2) },
      { etoiles: 1, col: 1, consigne: 'Place D pour que ABCD soit un losange.', ...quatrieme([1, 4], [4, 2], [7, 4], 8, 8) },
      { etoiles: 2, col: 1, consigne: 'Place D pour que ABCD soit un losange (A, B, C donnés).', ...quatrieme([1, 3], [5, 1], [9, 3], 10, 6) },
      { etoiles: 2, col: 1, consigne: 'Un parallélogramme est-il un losange ? Entoure.',
        ...ch([['Deux côtés consécutifs ont la même longueur :', 'oui'], ['Ses diagonales sont perpendiculaires :', 'oui'], ['Ses diagonales ont la même longueur :', 'non'], ['Il a un angle droit :', 'non']], 'oui · non') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un losange RSTU dont les diagonales mesurent RT = 8 cm et SU = 5 cm. Explique ta méthode.',
        corr: cm1Redac('Méthode', { suite: ['Je trace [RT] de 8 cm et son milieu O.', 'Je trace la perpendiculaire à (RT) en O et je place S et U à 2,5 cm de O.'] }, 'Les diagonales se coupent en leur milieu et sont perpendiculaires : RSTU est un losange.') },
      { etoiles: 2, col: 1, consigne: 'ABCD est un losange de centre O et l\'angle ABC mesure 70°. Complète.',
        ...rmp([['Angle ADC = @ °', 70], ['Angle BAD = @ °', 110], ['Angle BCD = @ °', 110], ['Angle AOB = @ °', 90]], 2) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'EFGH est un parallélogramme avec EF = FG = 4,5 cm. Quelle est sa nature ? Calcule son périmètre.',
        corr: cm1Redac('Nature et périmètre', { suite: ['EFGH est un parallélogramme qui a deux côtés consécutifs de même longueur : c\'est un losange.', 'P = 4 × 4,5 = 18'] }, 'EFGH est un losange de périmètre 18 cm.') },
    ] },
  { titre: 'Le carré', duree: '30 min',
    attendus: ['Savoir qu\'un carré est à la fois un rectangle et un losange', 'Utiliser toutes ses propriétés', 'Reconnaître un carré'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Place D pour que ABCD soit un carré.', ...quatrieme([2, 1], [1, 4], [4, 5], 8, 7) },
      { etoiles: 1, col: 1, consigne: 'ABCD est un carré de centre O, de côté 6 cm. Complète.',
        ...rmp([['Périmètre : @ cm', 24], ['Aire : @ cm²', 36], ['Angle AOB = @ °', 90], ['Angle OAB = @ °', 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Ce parallélogramme est-il un carré ? Entoure.',
        ...ch([['Un angle droit et deux côtés consécutifs égaux :', 'oui'], ['Des diagonales perpendiculaires et de même longueur :', 'oui'], ['Quatre côtés égaux :', 'non'], ['Un angle droit :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un carré est un rectangle :', 'vrai'], ['Un carré est un losange :', 'vrai'], ['Un rectangle est un carré :', 'faux'], ['Un losange qui a un angle droit est un carré :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un carré dont les diagonales mesurent 6 cm, sans mesurer ses côtés. Explique.',
        corr: cm1Redac('Méthode', { suite: ['Je trace une diagonale de 6 cm et son milieu O.', 'Je trace la perpendiculaire en O et je reporte 3 cm de chaque côté.'] }, 'Diagonales de même longueur, perpendiculaires et de même milieu : c\'est un carré.') },
      { etoiles: 2, col: 1, consigne: 'Place D pour que ABCD soit un carré (carré « penché »).', ...quatrieme([1, 3], [4, 1], [6, 4], 8, 7) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un carré a un périmètre de 28 cm. Calcule la longueur de son côté puis son aire.',
        corr: cm1Redac('Côté et aire du carré', { suite: ['c = 28 ÷ 4 = 7', 'A = 7 × 7 = 49'] }, 'Le côté mesure 7 cm et l\'aire vaut 49 cm².') },
    ] },
  { titre: 'Reconnaître et justifier', duree: '40 min',
    attendus: ['Identifier un quadrilatère à partir de ses codages', 'Choisir la propriété qui justifie la nature d\'un quadrilatère', 'Rédiger une démonstration courte'],
    exos: [
      { etoiles: 1, consigne: 'Quelle est la nature de chaque quadrilatère, d\'après ses codages ? Entoure.',
        ...(() => { const Q1 = [[20, 70], [20, 25], [100, 25], [100, 70]], Q2 = [[60, 10], [100, 48], [60, 86], [20, 48]], Q3 = [[30, 20], [90, 20], [90, 80], [30, 80]];
          const v1 = vig(poly(Q1) + droit(Q1[1], Q1[0], Q1[2]) + tick(Q1[0], Q1[1], 1) + tick(Q1[2], Q1[3], 1) + tick(Q1[1], Q1[2], 2) + tick(Q1[3], Q1[0], 2));
          const v2 = vig(poly(Q2) + Q2.map((p, i) => tick(p, Q2[(i + 1) % 4], 1)).join(''));
          const v3 = vig(poly(Q3) + Q3.map((p, i) => tick(p, Q3[(i + 1) % 4], 1)).join('') + droit(Q3[0], Q3[3], Q3[1]));
          const r = ['rectangle', 'losange', 'carré'];
          return { eleve: duo([v1, v2, v3].map((v, i) => col(v, `<b>${'abc'[i]}</b><br><b>rectangle · losange · carré</b>`))), corr: duo([v1, v2, v3].map((v, i) => col(v, `<b>${'abc'[i]}</b><br>${plEntoure(r[i])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure la nature la plus précise du parallélogramme.',
        ...chx([['Diagonales de même longueur :', 'rectangle', 'rectangle · losange · carré'], ['Diagonales perpendiculaires :', 'losange', 'rectangle · losange · carré'], ['Diagonales perpendiculaires et de même longueur :', 'carré', 'rectangle · losange · carré'], ['Deux côtés consécutifs égaux et un angle droit :', 'carré', 'rectangle · losange · carré']]) },
      { etoiles: 2, col: 1, consigne: 'Complète par oui ou non.',
        ...{ eleve: plListe(['Diagonales de même milieu : rectangle ' + B(1) + ' ; losange ' + B(1) + ' ; carré ' + B(1), 'Diagonales de même longueur : rectangle ' + B(1) + ' ; losange ' + B(1) + ' ; carré ' + B(1), 'Diagonales perpendiculaires : rectangle ' + B(1) + ' ; losange ' + B(1) + ' ; carré ' + B(1)]),
          corr: plListe(['Diagonales de même milieu : rectangle ' + R('oui') + ' ; losange ' + R('oui') + ' ; carré ' + R('oui'), 'Diagonales de même longueur : rectangle ' + R('oui') + ' ; losange ' + R('non') + ' ; carré ' + R('oui'), 'Diagonales perpendiculaires : rectangle ' + R('non') + ' ; losange ' + R('oui') + ' ; carré ' + R('oui')]) } },
      { etoiles: 3, col: 1, cahier: true, consigne: 'ABCD est un rectangle et ses diagonales sont perpendiculaires. Démontre que ABCD est un carré.',
        corr: cm1Redac('Démonstration', { suite: ['Un rectangle est un parallélogramme. Ses diagonales sont perpendiculaires : c\'est donc aussi un losange.', 'Un quadrilatère à la fois rectangle et losange est un carré.'] }, 'ABCD est un carré.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un cercle de centre O, on trace deux diamètres [AC] et [BD]. Quelle est la nature de ABCD ? Et si les diamètres sont perpendiculaires ?',
        corr: cm1Redac('Nature', { suite: ['Les diagonales [AC] et [BD] ont le même milieu O et la même longueur (deux diamètres) : ABCD est un rectangle.', 'Si, en plus, elles sont perpendiculaires, ABCD est un carré.'] }, 'ABCD est un rectangle ; c\'est un carré si les diamètres sont perpendiculaires.') },
      { etoiles: 1, col: 1, consigne: 'Qui suis-je ? Entoure.',
        ...chx([['Mes quatre côtés sont égaux mais je n\'ai pas d\'angle droit :', 'losange', 'rectangle · losange · carré'], ['J\'ai quatre angles droits et des côtés de longueurs différentes :', 'rectangle', 'rectangle · losange · carré'], ['Je suis un losange et un rectangle :', 'carré', 'rectangle · losange · carré']]) },
    ] },
];
})();

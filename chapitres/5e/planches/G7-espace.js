/* ============================================================
   5e · Planches : Représentation de l'espace (G7)
   Prisme droit et cylindre de révolution : reconnaître, décrire (faces, arêtes, sommets), perspective
   cavalière (arêtes à tracer sur quadrillage, à l'écran), patrons, volumes et unités de volume.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${h}<span class="pl-item" style="text-align:center;display:block;line-height:2;">${t}</span></span>`;
const vig = (inner, w, h) => S(w || 120, h || 96, `<rect x="1" y="1" width="${(w || 120) - 2}" height="${(h || 96) - 2}" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, (w || 120) * .86);
const vigs = (V, it, m) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${'abcd'[i]}</b><br><b>${m}</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${'abcd'[i]}</b><br>${plEntoure(it[i])}`))) });
const figs = l => ({ eleve: duo(l.map(([f, it]) => col(f, it.map(([t]) => t.replace('@', B(2))).join('<br>')))), corr: duo(l.map(([f, it]) => col(f, it.map(([t, r]) => t.replace('@', R(r))).join('<br>')))) });
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
const add = (p, d) => [p[0] + d[0], p[1] + d[1]];
// Prisme droit en perspective cavalière : face avant (polygone), fuyante d ; cache = indices des sommets dont
// les arêtes arrière sont cachées.
function prisme(F, d, cache, opt){ opt = opt || {}; const Bk = F.map(p => add(p, d)), n = F.length; let s = '';
  for(let i = 0; i < n; i++){ const j = (i + 1) % n, h = cache.includes(i) || cache.includes(j); s += L(Bk[i], Bk[j], K, 1.6, h); s += L(F[i], Bk[i], K, 1.6, cache.includes(i)); }
  return s + poly(F, K, 'rgba(46,168,201,.18)') + (opt.noms ? F.map((p, i) => T(add(p, opt.noms[i]), opt.lettres[i])).join('') : ''); }
function cylindre(cx, top, bot, rx, ry, f){ return `<ellipse cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}" fill="${f || 'rgba(46,168,201,.18)'}" stroke="${K}" stroke-width="1.8"/>`
  + `<path d="M${cx - rx},${bot} A${rx},${ry} 0 0 0 ${cx + rx},${bot}" fill="none" stroke="${K}" stroke-width="1.8"/>`
  + `<path d="M${cx - rx},${bot} A${rx},${ry} 0 0 1 ${cx + rx},${bot}" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="5 4"/>`
  + L([cx - rx, top], [cx - rx, bot], K, 1.8) + L([cx + rx, top], [cx + rx, bot], K, 1.8); }
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
const pt = (p, n, c) => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${c || K}"/>` + (n ? T([p[0] - 9, p[1] + 4], n, c || K, 12) : '');
// Arêtes à tracer sur quadrillage (outil segments) : donnees = arêtes dessinées, att = arêtes à tracer
// ([x1, y1, x2, y2, cachée] : au corrigé, une arête cachée est en pointillés).
function aretes(donnees, att, w, h, k){ k = k || 20; const base = g => donnees.map(([a, b, c, d]) => L(g(a, b), g(c, d), K, 2.2)).join('');
  return { eleve: plX(Gq(w, h, k, base), { t: 'seg', k, ox: 0, oy: 0, w, h, att: att.map(x => x.slice(0, 4)) }), corr: Gq(w, h, k, g => base(g) + att.map(([a, b, c, d, cache]) => L(g(a, b), g(c, d), Ve, 2.4, cache)).join('')) }; }

const V_PRISME = vig(prisme([[15, 85], [65, 85], [25, 40]], [35, -25], [0]));
const V_CYL = vig(cylindre(60, 22, 76, 32, 9));
const V_CONE = vig(`<path d="M28,78 A32,9 0 0 0 92,78" fill="none" stroke="${K}" stroke-width="1.8"/><path d="M28,78 A32,9 0 0 1 92,78" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="5 4"/>` + L([60, 12], [28, 78], K, 1.8) + L([60, 12], [92, 78], K, 1.8));
const V_PAVE = vig(prisme([[15, 85], [70, 85], [70, 45], [15, 45]], [32, -26], [0]));
const V_PYR = vig(poly([[15, 80], [85, 80], [55, 15]], K, 'rgba(46,168,201,.18)') + L([85, 80], [105, 62], K, 1.6) + L([55, 15], [105, 62], K, 1.6) + L([15, 80], [45, 62], K, 1.4, true) + L([45, 62], [105, 62], K, 1.4, true) + L([45, 62], [55, 15], K, 1.4, true));
const PR_COTE = S(210, 130, prisme([[20, 115], [80, 115], [20, 70]], [100, -55], [0]) + `<polyline points="20,107 28,107 28,115" fill="none" stroke="${Ro}" stroke-width="1.4"/>` + T([50, 128], '4 cm') + T([8, 95], '3', K) + T([8, 107], 'cm', K, 10) + T([145, 100], '10 cm'), 190);
const CYL_COTE = S(140, 130, cylindre(60, 18, 108, 34, 9) + L([60, 108], [94, 108], Ro, 2) + `<circle cx="60" cy="108" r="2.5" fill="${K}"/>` + T([77, 124], '3 cm', Ro) + L([110, 18], [110, 108], Ro, 1.2) + T([124, 66], '10', Ro) + T([124, 78], 'cm', Ro, 10), 125);
// Patrons (prisme à base triangulaire, cylindre).
const PAT_A = vig(poly([[10, 35], [40, 35], [40, 75], [10, 75]]) + poly([[40, 35], [70, 35], [70, 75], [40, 75]]) + poly([[70, 35], [100, 35], [100, 75], [70, 75]]) + poly([[40, 35], [70, 35], [55, 9]]) + poly([[40, 75], [70, 75], [55, 101]]), 112, 108);
const PAT_B = vig(poly([[10, 45], [40, 45], [40, 85], [10, 85]]) + poly([[40, 45], [70, 45], [70, 85], [40, 85]]) + poly([[70, 45], [100, 45], [100, 85], [70, 85]]) + poly([[10, 45], [40, 45], [25, 19]]) + poly([[70, 45], [100, 45], [85, 19]]), 112, 108);
const PAT_C = vig(poly([[8, 36], [108, 36], [108, 72], [8, 72]]) + `<circle cx="30" cy="20" r="16" fill="#EAF4FB" stroke="${K}" stroke-width="2"/><circle cx="86" cy="88" r="16" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>`, 116, 108);
const PAT_D = vig(poly([[8, 50], [108, 50], [108, 86], [8, 86]]) + `<circle cx="30" cy="42" r="8" fill="#EAF4FB" stroke="${K}" stroke-width="2"/><circle cx="86" cy="94" r="8" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>`, 116, 108);
// Patron d'un prisme à base « 3-4-5 » sur quadrillage : il manque le sommet E du triangle du bas.
const PAT_Q = (() => { const k = 14, w = 13, h = 11, base = g => poly([g(0, 3), g(3, 3), g(3, 7), g(0, 7)]) + poly([g(3, 3), g(7, 3), g(7, 7), g(3, 7)]) + poly([g(7, 3), g(12, 3), g(12, 7), g(7, 7)]) + poly([g(3, 3), g(7, 3), g(3, 0)], K, 'rgba(227,93,58,.2)') + pt(g(3, 7)) + pt(g(7, 7));
  return { eleve: plX(Gq(w, h, k, base), { t: 'pts', grille: { k, ox: 0, oy: 0, w, h }, noms: ['E'], att: { E: [3 * k, 10 * k] } }),
    corr: Gq(w, h, k, g => base(g) + poly([g(3, 7), g(7, 7), g(3, 10)], Ve, 'rgba(46,156,106,.2)') + pt(g(3, 10), 'E', Ve)) }; })();

PLANCHES['5e|Représentation de l\'espace'] = [
  { titre: 'Prismes droits et cylindres', duree: '35 min',
    attendus: ['Reconnaître un prisme droit et un cylindre de révolution', 'Utiliser le vocabulaire : base, face latérale, arête, sommet, hauteur', 'Compter faces, arêtes et sommets'],
    exos: [
      { etoiles: 1, consigne: 'Nomme chaque solide. Entoure.',
        ...vigs([V_PRISME, V_CYL, V_CONE, V_PAVE], ['prisme', 'cylindre', 'autre', 'prisme'], 'prisme · cylindre<br>autre') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Prisme à base triangulaire : @ faces', 5], ['Prisme à base triangulaire : @ arêtes', 9], ['Prisme à base triangulaire : @ sommets', 6], ['Prisme à base hexagonale : @ faces', 8], ['Prisme à base hexagonale : @ arêtes', 18], ['Prisme à base hexagonale : @ sommets', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...chx([['Les faces latérales d\'un prisme droit sont des rectangles :', 'vrai', 'vrai · faux'], ['Les deux bases d\'un prisme sont superposables :', 'vrai', 'vrai · faux'], ['Un cylindre a des arêtes droites :', 'faux', 'vrai · faux'], ['Les bases d\'un cylindre sont des disques :', 'vrai', 'vrai · faux'], ['Un prisme droit a toujours une base carrée :', 'faux', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Observe ce prisme.',
        ...figs([[S(160, 110, prisme([[15, 100], [85, 100], [30, 45]], [55, -35], [0]), 150), [['Arêtes cachées : @', 3], ['Faces latérales : @', 3], ['Nombre de bases : @', 2]]]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un prisme droit a 12 sommets. Combien a-t-il de faces et d\'arêtes ? Explique.',
        corr: cm1Redac('Faces et arêtes', { suite: ['Chaque base a 12 ÷ 2 = 6 sommets : c\'est un hexagone.', 'Faces : 2 bases + 6 faces latérales = 8', 'Arêtes : 6 + 6 + 6 = 18'] }, 'Le prisme a 8 faces et 18 arêtes.') },
    ] },
  { titre: 'Perspective cavalière', duree: '35 min',
    attendus: ['Compléter un solide en perspective cavalière', 'Dessiner les arêtes cachées en pointillés', 'Savoir que des arêtes parallèles restent parallèles sur le dessin'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Trace les 3 arêtes visibles qui manquent au pavé droit.',
        ...aretes([[1, 7, 6, 7], [6, 7, 6, 4], [6, 4, 1, 4], [1, 4, 1, 7], [1, 4, 3, 2], [3, 2, 8, 2]], [[6, 4, 8, 2], [8, 2, 8, 5], [8, 5, 6, 7]], 9, 8) },
      { etoiles: 2, col: 1, consigne: 'Trace les 3 arêtes cachées du pavé droit (en pointillés sur papier).',
        ...aretes([[1, 7, 6, 7], [6, 7, 6, 4], [6, 4, 1, 4], [1, 4, 1, 7], [1, 4, 3, 2], [3, 2, 8, 2], [6, 4, 8, 2], [8, 2, 8, 5], [8, 5, 6, 7]], [[1, 7, 3, 5, 1], [3, 5, 8, 5, 1], [3, 5, 3, 2, 1]], 9, 8) },
      { etoiles: 2, col: 1, consigne: 'Termine le prisme à base triangulaire : trace les 4 arêtes qui manquent.',
        ...aretes([[1, 7, 5, 7], [5, 7, 1, 3], [1, 3, 1, 7], [1, 3, 4, 1], [5, 7, 8, 5]], [[4, 1, 8, 5], [1, 7, 4, 5, 1], [4, 5, 4, 1, 1], [4, 5, 8, 5, 1]], 9, 8) },
      { etoiles: 2, col: 1, consigne: 'Perspective cavalière : entoure.',
        ...chx([['Les arêtes cachées sont dessinées :', 'en pointillés', 'en trait plein · en pointillés'], ['La face avant est dessinée :', 'en vraie grandeur', 'en vraie grandeur · déformée'], ['Deux arêtes parallèles dans la réalité sont dessinées :', 'parallèles', 'parallèles · sécantes'], ['Les fuyantes sont dessinées :', 'en oblique', 'à l\'horizontale · en oblique']]) },
      { etoiles: 2, col: 1, consigne: 'On dessine en perspective cavalière un pavé de 5 cm sur 3 cm sur 4 cm (face avant : 5 cm sur 3 cm). Les fuyantes sont réduites de moitié. Complète.',
        ...rmp([['Longueur de la face avant sur le dessin : @ cm', 5], ['Hauteur de la face avant sur le dessin : @ cm', 3], ['Longueur d\'une fuyante sur le dessin : @ cm', 2]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine sur ton cahier un prisme droit à base triangulaire en perspective cavalière. Explique les étapes.',
        corr: cm1Redac('Étapes', { suite: ['Je dessine la base avant en vraie grandeur.', 'Je trace des fuyantes parallèles et de même longueur depuis chaque sommet.', 'Je relie leurs extrémités, puis je repasse en pointillés les arêtes cachées.'] }, 'J\'obtiens un prisme droit en perspective cavalière.') },
    ] },
  { titre: 'Patrons', duree: '40 min',
    attendus: ['Reconnaître un patron de prisme droit ou de cylindre', 'Compléter un patron', 'Calculer la longueur du rectangle d\'un patron de cylindre'],
    exos: [
      { etoiles: 1, consigne: 'Est-ce un patron de prisme (a, b) ou de cylindre (c, d) ? Entoure.',
        ...vigs([PAT_A, PAT_B, PAT_C, PAT_D], ['oui', 'non', 'oui', 'non'], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Place le sommet E pour terminer le patron de ce prisme (bases : triangles rectangles).', ...PAT_Q },
      { etoiles: 2, col: 1, consigne: 'Patron d\'un cylindre : la longueur du rectangle est le périmètre du disque de base. Complète (au dixième).',
        ...rmp([['Rayon 3 cm, hauteur 5 cm : rectangle de @ cm', 5], ['sur @ cm', '18,8'], ['Rayon 2 cm, hauteur 7 cm : rectangle de @ cm', 7], ['sur @ cm', '12,6']], 2) },
      { etoiles: 2, col: 1, consigne: 'Un prisme a pour bases des triangles de côtés 3 cm, 4 cm et 5 cm et une hauteur de 6 cm. Complète.',
        ...rmp([['Nombre de rectangles du patron : @', 3], ['Longueur totale des rectangles mis bout à bout : @ cm', 12], ['Aire des faces latérales : @ cm²', 72]], 2) },
      { etoiles: 2, col: 1, consigne: 'Un prisme a une base à n côtés. Complète.',
        ...rmp([['Base à 4 côtés : @ faces', 6], ['Base à 4 côtés : @ sommets', 8], ['Base à 5 côtés : @ faces', 7], ['Base à 5 côtés : @ arêtes', 15]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une boîte cylindrique a un diamètre de 10 cm et une hauteur de 12 cm. Quelles sont les dimensions de l\'étiquette qui fait le tour de la boîte ?',
        corr: cm1Redac('Dimensions de l\'étiquette', { suite: ['Largeur : la hauteur, 12 cm.', 'Longueur : π × 10 ≈ 31,4'] }, 'L\'étiquette mesure environ 31,4 cm sur 12 cm.') },
    ] },
  { titre: 'Volumes', duree: '45 min',
    attendus: ['Calculer le volume d\'un prisme droit : aire de la base × hauteur', 'Calculer le volume d\'un cylindre : π × r × r × h', 'Convertir des unités de volume et de contenance'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le volume (V = aire de la base × hauteur).',
        ...rmp([['Prisme : base de 12 cm², hauteur 5 cm : @ cm³', 60], ['Prisme : base de 7,5 cm², hauteur 4 cm : @ cm³', 30], ['Cylindre : base de 20 cm², hauteur 3 cm : @ cm³', 60]], 2) },
      { etoiles: 1, col: 1, consigne: 'Convertis.',
        ...rmp([['1 L = @ dm³', 1], ['1 dm³ = @ cm³', 1000], ['2,5 L = @ cm³', 2500], ['750 cm³ = @ L', '0,75'], ['1 m³ = @ L', 1000]], 2) },
      { etoiles: 2, consigne: 'Calcule le volume de chaque solide (cylindre : arrondi au dixième).',
        ...figs([[PR_COTE, [['Aire de la base : @ cm²', 6], ['V = @ cm³', 60]]], [CYL_COTE, [['V = @ π cm³', 90], ['V ≈ @ cm³', '282,7']]]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'unité la mieux adaptée.',
        ...chx([['Le volume d\'une piscine :', 'm³', 'cm³ · L · m³'], ['Le volume d\'un dé à jouer :', 'cm³', 'cm³ · L · m³'], ['La contenance d\'une bouteille d\'eau :', 'L', 'mm³ · L · m³']]) },
      { etoiles: 2, col: 1, consigne: 'Un aquarium est un pavé droit de 50 cm sur 30 cm sur 40 cm. Complète.',
        ...rmp([['V = @ cm³', 60000], ['V = @ dm³', 60], ['Contenance : @ L', 60]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une boîte de conserve est un cylindre de diamètre 8 cm et de hauteur 11 cm. Calcule son volume (arrondi au cm³), puis sa contenance en litres.',
        corr: cm1Redac('Volume de la boîte', { suite: ['r = 8 ÷ 2 = 4', 'V = π × 4 × 4 × 11 = 176π ≈ 553'] }, 'La boîte a un volume d\'environ 553 cm³, soit environ 0,55 L.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une tente est un prisme droit. Sa base est un triangle de base 2 m et de hauteur 1,5 m ; la tente est longue de 3 m. Calcule son volume.',
        corr: cm1Redac('Volume de la tente', { suite: ['Aire de la base : 2 × 1,5 ÷ 2 = 1,5', 'V = 1,5 × 3 = 4,5'] }, 'La tente a un volume de 4,5 m³.') },
    ] },
];
})();

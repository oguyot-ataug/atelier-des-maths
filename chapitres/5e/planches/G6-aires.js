/* ============================================================
   5e · Planches : Aires (G6)
   Aire du parallélogramme et du triangle (hauteur relative à une base), aire du disque (valeur exacte
   et arrondie), figures composées, unités d'aire et problèmes.
   ============================================================ */
(() => {
// Illustrations des problèmes concrets (chapitres/planches-dessins.js).
const DS = PL_DESSINS, illu = plIllu;
const jardinBassin = DS.fig(214, 128, '<g transform="translate(14,0)">' + `<rect x="20" y="10" width="160" height="96" fill="#BFE3B0" stroke="#2E9C6A" stroke-width="2"/><circle cx="112" cy="54" r="24" fill="#9CC8E8" stroke="#2EA8C9" stroke-width="2"/>`
  + DS.ln([112, 54], [136, 54], '#E35D3A', 1.4) + DS.pt([112, 54], '') + DS.tx([124, 50], '3 m', { c: '#E35D3A', fs: 10 }) + DS.cote([20, 106], [180, 106], '20 m', -8, { dt: 7 }) + DS.cote([14, 106], [14, 10], '12 m', 0, { dt: 3, a: 'end' }) + '</g>', 158);
const disqueCarre = DS.fig(138, 132, `<rect x="20" y="8" width="100" height="100" fill="#F6C343" stroke="#1F3A5C" stroke-width="1.6"/><circle cx="70" cy="58" r="50" fill="#fff" stroke="#1F3A5C" stroke-width="1.6"/>`
  + DS.ln([70, 58], [120, 58], '#E35D3A', 1.3) + DS.pt([70, 58], '') + DS.tx([95, 54], '5 cm', { c: '#E35D3A', fs: 10 }) + DS.cote([20, 108], [120, 108], '10 cm', -8, { dt: 7 }), 112);
const carrelage = (() => { let g = `<rect x="22" y="8" width="130" height="104" fill="#F4F1EA" stroke="#1F3A5C" stroke-width="1.8"/>`;
  for(let i = 1; i < 10; i++) g += DS.ln([22 + i * 13, 8], [22 + i * 13, 112], '#B9C2CC', .8);
  for(let j = 1; j < 8; j++) g += DS.ln([22, 8 + j * 13], [152, 8 + j * 13], '#B9C2CC', .8);
  return DS.fig(184, 136, '<g transform="translate(12,0)">' + g + `<rect x="22" y="99" width="13" height="13" fill="#E9A21C" stroke="#1F3A5C" stroke-width="1"/>` + DS.tx([40, 108], '50 cm', { a: 'start', fs: 9, c: '#A0620F' }).replace(/y="108"/, 'y="96"')
    + DS.cote([22, 112], [152, 112], '5 m', -8, { dt: 7 }) + DS.cote([16, 112], [16, 8], '4 m', 0, { dt: 3, a: 'end' }) + '</g>', 124); })();
const champ = (() => { const A = [12, 104], B = [180, 104], C = [70, 14], H = [70, 104];
  return DS.fig(192, 130, DS.poly([A, B, C], '#CFE8B5', '#2E9C6A', 2) + DS.ln(C, H, '#E35D3A', 1.4, true) + DS.droit(A, H, C) + DS.tx([76, 70], '80 m', { a: 'start', c: '#E35D3A', fs: 10 })
    + DS.cote(A, B, '150 m', -8, { dt: 7 }), 140); })();
const triHauteur = (() => { const A = [42, 100], B = [162, 100], C = [17, 28], H = [17, 100];
  return DS.fig(180, 124, DS.poly([A, B, C], '#EAF4FB', '#1F3A5C', 1.8) + DS.ln(A, H, '#1F3A5C', 1, true) + DS.ln(C, H, '#E35D3A', 1.4, true) + DS.droit(A, H, C)
    + DS.pt(A, 'A', [2, 14]) + DS.pt(B, 'B', [6, 14]) + DS.pt(C, 'C', [-2, -6]) + DS.pt(H, 'H', [-8, 12]) + DS.tx([20, 70], '6 cm', { a: 'start', fs: 10, c: '#E35D3A' })
    + DS.tx([102, 114], '10 cm', { fs: 10, c: '#2E9C6A' }) + DS.tx([98, 56], '12 cm', { fs: 10, c: '#2E9C6A' }), 150); })();
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 12, c: c || K });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${h}<span class="pl-item" style="text-align:left;display:block;line-height:2;">${t}</span></span>`;
const poly = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#EAF4FB'}" stroke="${c || K}" stroke-width="2"/>`;
const path = (d, f) => `<path d="${d}" fill="${f || '#EAF4FB'}" stroke="${K}" stroke-width="2"/>`;
const droit = (V, a, b) => { const u = [a[0] - V[0], a[1] - V[1]], v = [b[0] - V[0], b[1] - V[1]], nu = Math.hypot(...u), nv = Math.hypot(...v), p = [V[0] + u[0] / nu * 8, V[1] + u[1] / nu * 8], q = [V[0] + v[0] / nv * 8, V[1] + v[1] / nv * 8], r = [p[0] + v[0] / nv * 8, p[1] + v[1] / nv * 8];
  return `<polyline points="${p.join(',')} ${r.join(',')} ${q.join(',')}" fill="none" stroke="${Ro}" stroke-width="1.4"/>`; };
// Hauteur en pointillés (du sommet S au pied H, sur la droite qui porte la base, vers le point P) avec l'angle droit.
const haut = (Sm, H, P, t, dx) => L(Sm, H, Ro, 1.6, true) + droit(H, Sm, P) + T([H[0] + (dx || 14), (Sm[1] + H[1]) / 2 + 4], t, Ro);
function Gq(w, h, k, f){ let s = ''; for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s + f((i, j) => [i * k, j * k]), w * k); }
// Figures : chaque figure + ses réponses à compléter (même ordre que les plRep).
const figs = l => ({ eleve: duo(l.map(([f, it]) => col(f, it.map(([t]) => t.replace('@', B(2))).join('<br>')))), corr: duo(l.map(([f, it]) => col(f, it.map(([t, r]) => t.replace('@', R(r))).join('<br>')))) });

const PARA = S(190, 112, poly([[20, 90], [140, 90], [170, 30], [50, 30]]) + haut([50, 30], [50, 90], [140, 90], '3 cm') + T([80, 106], '6 cm'), 170);
const TRI = S(190, 112, poly([[15, 95], [175, 95], [70, 20]]) + haut([70, 20], [70, 95], [175, 95], '5 cm') + T([110, 109], '8 cm'), 170);
const OBT = S(180, 112, L([20, 95], [80, 95], Ro, 1.4, true) + poly([[80, 95], [160, 95], [20, 20]]) + haut([20, 20], [20, 95], [80, 95], '6 cm', 18) + T([120, 109], '4 cm'), 160);
const DEMI = S(170, 100, path('M15,85 A70,70 0 0 1 155,85 Z') + L([85, 85], [155, 85], Ro, 2) + `<circle cx="85" cy="85" r="3" fill="${K}"/>` + T([120, 98], '4 cm', Ro), 150);
const QUART = S(120, 112, path('M15,100 L105,100 A90,90 0 0 0 15,10 Z') + T([60, 112 - 2], '6 cm', Ro), 105);
const MAISON = S(200, 186, poly([[20, 70], [180, 70], [180, 170], [20, 170]]) + poly([[20, 70], [180, 70], [100, 10]], K, '#FDEBD3') + haut([100, 10], [100, 70], [180, 70], '3 cm') + T([100, 184], '8 cm') + T([44, 124], '5 cm'), 160);
const ENCOCHE = S(176, 120, poly([[10, 10], [130, 10], [130, 40], [160, 40], [160, 100], [10, 100]]) + T([85, 116], '10 cm') + T([36, 58], '6 cm') + T([145, 32], '2 cm', Ro), 160);
const STADE = S(200, 100, `<path d="M10,10 L154,10 A36,36 0 0 1 154,82 L10,82 Z" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([154, 10], [154, 82], Ro, 1.4, true) + T([82, 96], '8 cm') + T([140, 50], '4 cm', Ro), 175);
const GL = Gq(8, 7, 18, g => poly([g(1, 6), g(7, 6), g(7, 4), g(4, 1), g(1, 4)], K, 'rgba(46,168,201,.25)'));
const GP = Gq(8, 6, 16, g => poly([g(1, 5), g(5, 5), g(6, 2), g(2, 2)], K, 'rgba(46,168,201,.25)'));
const GT = Gq(8, 6, 16, g => poly([g(1, 5), g(7, 5), g(3, 1)], K, 'rgba(227,93,58,.2)'));

PLANCHES['5e|Aires'] = [
  { titre: 'Parallélogramme et triangle', duree: '40 min',
    attendus: ['Calculer l\'aire d\'un parallélogramme : base × hauteur', 'Calculer l\'aire d\'un triangle : base × hauteur ÷ 2', 'Repérer la hauteur relative à une base'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire.',
        ...rmp([['Parallélogramme de base 7 cm et de hauteur 4 cm : @ cm²', 28], ['Triangle de base 9 cm et de hauteur 6 cm : @ cm²', 27], ['Triangle rectangle de côtés de l\'angle droit 5 cm et 8 cm : @ cm²', 20], ['Parallélogramme de base 12,5 cm et de hauteur 2 cm : @ cm²', 25]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire de chaque figure.',
        ...figs([[PARA, [['A = @ cm²', 18]]], [TRI, [['A = @ cm²', 20]]]]) },
      { etoiles: 2, col: 1, consigne: 'La hauteur peut être à l\'extérieur du triangle ! Calcule l\'aire.',
        ...figs([[OBT, [['A = @ cm²', 12]]]]) },
      { etoiles: 2, col: 1, consigne: 'Un carreau vaut 1 u.a. Calcule l\'aire de chaque figure.',
        ...figs([[GP, [['A = @ u.a.', 12]]], [GT, [['A = @ u.a.', 12]]]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un parallélogramme a une base de 8 cm et une aire de 36 cm². Calcule sa hauteur.',
        corr: cm1Redac('Hauteur du parallélogramme', { suite: ['b × h = 36, donc 8 × h = 36', 'h = 36 ÷ 8 = 4,5'] }, 'La hauteur mesure 4,5 cm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(triHauteur, 'Dans le triangle ABC, AB = 10 cm et la hauteur issue de C mesure 6 cm. BC = 12 cm. Calcule l\'aire de ABC, puis la hauteur issue de A.'),
        corr: cm1Redac('Aire et hauteur', { suite: ['A = 10 × 6 ÷ 2 = 30', 'BC × h ÷ 2 = 30, donc 12 × h = 60', 'h = 60 ÷ 12 = 5'] }, 'L\'aire vaut 30 cm² et la hauteur issue de A mesure 5 cm.') },
    ] },
  { titre: 'Aire d\'un disque', duree: '40 min',
    attendus: ['Calculer l\'aire d\'un disque : π × r × r', 'Donner une valeur exacte (avec π) et une valeur arrondie', 'Ne pas confondre aire du disque et périmètre du cercle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne la valeur exacte de l\'aire du disque.',
        ...rmp([['Rayon 4 cm : A = @ π cm²', 16], ['Rayon 7 cm : A = @ π cm²', 49], ['Diamètre 10 cm : A = @ π cm²', 25], ['Diamètre 2 m : A = @ π m²', 1]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire du disque, arrondie au dixième (touche π de la calculatrice).',
        ...rmp([['Rayon 3 cm : A ≈ @ cm²', '28,3'], ['Rayon 5 cm : A ≈ @ cm²', '78,5'], ['Rayon 10 cm : A ≈ @ cm²', '314,2'], ['Diamètre 8 cm : A ≈ @ cm²', '50,3']], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne formule (r : rayon).',
        ...chx([['Aire d\'un disque :', 'π × r × r', 'π × r × r · 2 × π × r · π × r'], ['Périmètre d\'un cercle :', '2 × π × r', 'π × r × r · 2 × π × r · π × r × 2 × r'], ['Aire d\'un demi-disque :', 'π × r × r ÷ 2', 'π × r ÷ 2 · π × r × r ÷ 2 · 2 × π × r ÷ 2']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule l\'aire : valeur exacte, puis arrondie au dixième.',
        ...figs([[DEMI, [['A = @ π cm²', 8], ['A ≈ @ cm²', '25,1']]], [QUART, [['A = @ π cm²', 9], ['A ≈ @ cm²', '28,3']]]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un disque a une aire de 36π cm². Son rayon mesure @ cm.', 6], ['Un disque a une aire de 100π m². Son diamètre mesure @ m.', 20], ['Rayon 1 m : aire arrondie au centième : @ m²', '3,14']], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une pizza a un diamètre de 30 cm. Calcule son aire, arrondie au dixième.',
        corr: cm1Redac('Aire de la pizza', { suite: ['r = 30 ÷ 2 = 15', 'A = π × 15 × 15 = 225π', 'A ≈ 706,9'] }, 'L\'aire de la pizza est d\'environ 706,9 cm².') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Qui a la plus grande aire : un carré de côté 4 cm ou un disque de rayon 2,5 cm ?',
        corr: cm1Redac('Comparaison', { suite: ['Carré : 4 × 4 = 16', 'Disque : π × 2,5 × 2,5 = 6,25π ≈ 19,6'] }, 'Le disque a la plus grande aire (environ 19,6 cm² contre 16 cm²).') },
    ] },
  { titre: 'Figures composées', duree: '45 min',
    attendus: ['Découper une figure en figures usuelles', 'Ajouter ou soustraire des aires', 'Rédiger le calcul d\'une aire composée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire de cette maison (rectangle de 8 cm sur 5 cm et triangle).',
        ...figs([[MAISON, [['Rectangle : @ cm²', 40], ['Triangle : @ cm²', 12], ['Maison : @ cm²', 52]]]]) },
      { etoiles: 1, col: 1, consigne: 'On a retiré un carré de 2 cm de côté à un rectangle. Calcule l\'aire.',
        ...figs([[ENCOCHE, [['Rectangle : @ cm²', 60], ['Carré : @ cm²', 4], ['Figure : @ cm²', 56]]]]) },
      { etoiles: 2, col: 1, consigne: 'Un rectangle de 8 cm sur 4 cm et un demi-disque. Calcule l\'aire, arrondie au dixième.',
        ...figs([[STADE, [['Rectangle : @ cm²', 32], ['Demi-disque : @ π cm²', 2], ['Figure : A ≈ @ cm²', '38,3']]]]) },
      { etoiles: 2, col: 1, consigne: 'Un carreau vaut 1 u.a. Découpe la figure et calcule son aire.',
        ...figs([[GL, [['Rectangle : @ u.a.', 12], ['Triangle : @ u.a.', 9], ['Figure : @ u.a.', 21]]]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(jardinBassin, 'Un jardin rectangulaire de 20 m sur 12 m contient un bassin circulaire de rayon 3 m. Quelle est l\'aire de pelouse, arrondie au dixième ?'),
        corr: cm1Redac('Aire de la pelouse', { suite: ['Jardin : 20 × 12 = 240', 'Bassin : π × 3 × 3 = 9π ≈ 28,27', 'Pelouse : 240 − 28,27 ≈ 211,7'] }, 'L\'aire de pelouse est d\'environ 211,7 m².') },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(disqueCarre, 'Un disque de rayon 5 cm est dessiné dans un carré de 10 cm de côté (il touche les 4 côtés). Calcule l\'aire de la partie du carré hors du disque, arrondie au dixième.'),
        corr: cm1Redac('Aire hors du disque', { suite: ['Carré : 10 × 10 = 100', 'Disque : π × 5 × 5 = 25π ≈ 78,54', 'Reste : 100 − 78,54 ≈ 21,5'] }, 'La partie hors du disque mesure environ 21,5 cm².') },
    ] },
  { titre: 'Unités d\'aire et problèmes', duree: '40 min',
    attendus: ['Convertir des unités d\'aire (1 m² = 100 dm²)', 'Utiliser l\'hectare', 'Distinguer aire et périmètre dans un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Convertis.',
        ...rmp([['1 m² = @ dm²', 100], ['3 m² = @ cm²', 30000], ['250 cm² = @ dm²', '2,5'], ['0,5 dm² = @ cm²', 50], ['4 ha = @ m²', 40000], ['1 km² = @ ha', 100]], 2) },
      { etoiles: 1, col: 1, consigne: 'Entoure l\'unité la mieux adaptée.',
        ...chx([['L\'aire d\'un timbre :', 'cm²', 'cm² · m² · km²'], ['L\'aire d\'une cour de récréation :', 'm²', 'cm² · m² · km²'], ['L\'aire d\'un champ :', 'ha', 'cm² · dm² · ha'], ['L\'aire de la France :', 'km²', 'm² · ha · km²']]) },
      { etoiles: 2, col: 1, consigne: 'Aire ou périmètre ? Entoure ce qu\'il faut calculer.',
        ...chx([['Poser une clôture autour d\'un jardin :', 'périmètre', 'aire · périmètre'], ['Carreler le sol d\'une cuisine :', 'aire', 'aire · périmètre'], ['Coudre un galon autour d\'une nappe :', 'périmètre', 'aire · périmètre'], ['Semer du gazon :', 'aire', 'aire · périmètre']]) },
      { etoiles: 2, col: 1, consigne: 'Un mur mesure 4 m sur 2,5 m. Un litre de peinture couvre 5 m². Complète.',
        ...rmp([['Aire du mur : @ m²', 10], ['Peinture nécessaire : @ L', 2], ['Pour deux couches : @ L', 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne formule (b : base, h : hauteur).',
        ...chx([['Aire d\'un parallélogramme :', 'b × h', 'b × h · b × h ÷ 2 · (b + h) × 2'], ['Aire d\'un triangle :', 'b × h ÷ 2', 'b × h · b × h ÷ 2 · b + h'], ['Aire d\'un rectangle de longueur L et de largeur ℓ :', 'L × ℓ', 'L × ℓ · (L + ℓ) × 2 · L × ℓ ÷ 2']]) },
      { etoiles: 2, col: 1, consigne: 'Attention aux unités ! Calcule l\'aire dans l\'unité demandée.',
        ...rmp([['Rectangle de 2,5 m sur 80 cm : @ m²', 2], ['Carré de 30 cm de côté : @ dm²', 9], ['Triangle de base 4 dm et de hauteur 50 cm : @ cm²', 1000]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(carrelage, 'Une pièce de 5 m sur 4 m est carrelée avec des carreaux carrés de 50 cm de côté. Combien faut-il de carreaux ?'),
        corr: cm1Redac('Nombre de carreaux', { suite: ['Pièce : 5 × 4 = 20 m²', 'Carreau : 0,5 × 0,5 = 0,25 m²', '20 ÷ 0,25 = 80'] }, 'Il faut 80 carreaux.') },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(champ, 'Un champ triangulaire a une base de 150 m et une hauteur de 80 m. Calcule son aire en m², puis en hectares.'),
        corr: cm1Redac('Aire du champ', { suite: ['A = 150 × 80 ÷ 2 = 6 000 m²', '6 000 m² = 0,6 ha'] }, 'Le champ mesure 6 000 m², soit 0,6 ha.') },
    ] },
];
})();

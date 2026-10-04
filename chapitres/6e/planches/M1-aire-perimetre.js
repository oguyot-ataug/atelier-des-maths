/* ============================================================
   6e · Planches : Aire et périmètre (M1)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="5 4"' : ''}/>`;
const T = (x, y, t, o) => cmT(x, y, t, Object.assign({ fs: 11 }, o || {}));
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:3px;">${h}<span>${t}</span></span>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
// Figure en carreaux sur quadrillage : cases [[i, j]] coloriées (w × h, k px).
function cases(c, w, h, k, coul){ k = k || 16; let s = ''; c.forEach(([i, j]) => s += `<rect x="${i * k}" y="${j * k}" width="${k}" height="${k}" fill="${coul || Bl}" fill-opacity=".55"/>`);
  for(let x = 0; x <= w; x++) s += L([x * k, 0], [x * k, h * k], '#C9DCEB', 1); for(let y = 0; y <= h; y++) s += L([0, y * k], [w * k, y * k], '#C9DCEB', 1); return S(w * k, h * k, s, w * k); }
const rect = (x0, y0, w, h) => { const l = []; for(let i = 0; i < w; i++) for(let j = 0; j < h; j++) l.push([x0 + i, y0 + j]); return l; };
const FA = rect(1, 1, 4, 3), FB = rect(1, 1, 6, 2), FC = [...rect(1, 1, 2, 4), ...rect(3, 3, 2, 2)];
// Rectangle coté (longueurs en texte).
const rc = (w, h, lw, lh, c) => S(w + 70, h + 40, `<rect x="35" y="12" width="${w}" height="${h}" fill="${c || '#EAF4FB'}" stroke="${K}" stroke-width="2"/>` + T(35 + w / 2, h + 32, lw) + T(30, 16 + h / 2, lh, { a: 'end' }));
PLANCHES['6e|Aire et périmètre'] = [
  { titre: 'Périmètre et aire sur quadrillage', duree: '35 min',
    attendus: ['Distinguer périmètre (longueur du contour) et aire (surface)', 'Mesurer un périmètre et une aire en unités du quadrillage', 'Comparer des figures selon leur aire ou leur périmètre'],
    exos: [
      { etoiles: 1, consigne: 'L\'unité de longueur est le côté d\'un carreau ; l\'unité d\'aire est un carreau. Complète.',
        eleve: duo([[FA, 'A'], [FB, 'B'], [FC, 'C']].map(([f, n]) => col(cases(f, 8, 6, 16), `<b>Figure ${n}</b><br>périmètre : ${B(2)} u<br>aire : ${B(2)} carreaux`))),
        corr: duo([[FA, 'A', 14, 12], [FB, 'B', 16, 12], [FC, 'C', 16, 12]].map(([f, n, p, a]) => col(cases(f, 8, 6, 16), `<b>Figure ${n}</b><br>périmètre : ${R(p)} u<br>aire : ${R(a)} carreaux`))) },
      { etoiles: 1, col: 1, consigne: 'D\'après l\'exercice précédent, vrai ou faux ?',
        ...ch([['Les figures A, B et C ont la même aire.', 'vrai'], ['Elles ont le même périmètre.', 'faux'], ['Deux figures de même aire ont toujours le même périmètre.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Un rectangle est formé de carreaux de 1 cm de côté. Complète.',
        eleve: plListe(['5 carreaux sur 3 : aire ' + B() + ' cm², périmètre ' + B() + ' cm', '6 carreaux sur 6 : aire ' + B() + ' cm², périmètre ' + B() + ' cm', '9 carreaux sur 1 : aire ' + B() + ' cm², périmètre ' + B() + ' cm']),
        corr: plListe(['5 carreaux sur 3 : aire ' + R(15) + ' cm², périmètre ' + R(16) + ' cm', '6 carreaux sur 6 : aire ' + R(36) + ' cm², périmètre ' + R(24) + ' cm', '9 carreaux sur 1 : aire ' + R(9) + ' cm², périmètre ' + R(20) + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Entoure la grandeur demandée.',
        ...ch([['La longueur de grillage pour clôturer un jardin :', 'périmètre'], ['La quantité de moquette pour une chambre :', 'aire'], ['La longueur de ruban autour d\'un cadre :', 'périmètre'], ['La peinture pour un mur :', 'aire']], 'périmètre · aire') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur un quadrillage, dessine trois rectangles différents d\'aire 24 carreaux. Lequel a le plus petit périmètre ?',
        corr: cm1Redac('Rectangles d\'aire 24', { suite: ['1 × 24 : périmètre 50', '2 × 12 : périmètre 28', '3 × 8 : périmètre 22', '4 × 6 : périmètre 20'] }, 'Le rectangle 4 × 6, le plus proche d\'un carré, a le plus petit périmètre.') },
    ] },
  { titre: 'Périmètres des figures usuelles', duree: '35 min',
    attendus: ['Calculer le périmètre d\'un polygone, d\'un rectangle, d\'un carré', 'Calculer la longueur d\'un cercle : 2 × π × rayon ou π × diamètre', 'Utiliser une valeur approchée de π (3,14)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le périmètre.',
        eleve: plListe(['Carré de côté 7 cm : ' + B() + ' cm', 'Rectangle de 8 cm sur 5 cm : ' + B() + ' cm', 'Triangle de côtés 4 cm, 6 cm, 7,5 cm : ' + B() + ' cm', 'Hexagone régulier de côté 3 cm : ' + B() + ' cm']),
        corr: plListe(['Carré de côté 7 cm : ' + R(28) + ' cm', 'Rectangle de 8 cm sur 5 cm : ' + R(26) + ' cm', 'Triangle de côtés 4 cm, 6 cm, 7,5 cm : ' + R('17,5') + ' cm', 'Hexagone régulier de côté 3 cm : ' + R(18) + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Calcule la longueur du cercle, avec π ≈ 3,14.',
        eleve: plListe(['rayon 5 cm : ' + B() + ' cm', 'diamètre 10 cm : ' + B() + ' cm', 'rayon 2 cm : ' + B() + ' cm', 'diamètre 1 m : ' + B() + ' m']),
        corr: plListe(['rayon 5 cm : 2 × 3,14 × 5 = ' + R('31,4') + ' cm', 'diamètre 10 cm : 3,14 × 10 = ' + R('31,4') + ' cm', 'rayon 2 cm : ' + R('12,56') + ' cm', 'diamètre 1 m : ' + R('3,14') + ' m']) },
      { etoiles: 2, col: 1, consigne: 'Retrouve la longueur manquante.',
        eleve: plListe(['Carré de périmètre 36 cm : côté ' + B() + ' cm', 'Rectangle de périmètre 30 cm et de longueur 9 cm : largeur ' + B() + ' cm', 'Triangle équilatéral de périmètre 21 cm : côté ' + B() + ' cm']),
        corr: plListe(['Carré de périmètre 36 cm : côté ' + R(9) + ' cm', 'Rectangle de périmètre 30 cm et de longueur 9 cm : largeur ' + R(6) + ' cm', 'Triangle équilatéral de périmètre 21 cm : côté ' + R(7) + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Calcule le périmètre de cette figure : un carré de 4 cm de côté surmonté d'un demi-cercle de diamètre 4 cm (π ≈ 3,14).<span class="cm-fig-d">${S(90, 100, `<path d="M15,90 L15,40 A30,30 0 0 1 75,40 L75,90 Z" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([15, 40], [75, 40], K, 1, true), 80)}</span>`,
        corr: cm1Redac('Périmètre', { suite: ['Trois côtés du carré : 3 × 4 = 12 cm.', 'Demi-cercle : 3,14 × 4 ÷ 2 = 6,28 cm.'] }, 'Le périmètre vaut 12 + 6,28 = 18,28 cm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La roue d\'un vélo a un diamètre de 70 cm. Quelle distance parcourt le vélo quand la roue fait 100 tours ? (π ≈ 3,14)',
        corr: cm1Redac('Un tour', '3,14 × 70 = 219,8', 'Un tour fait 219,8 cm.') + cm1Redac('100 tours', '219,8 × 100 = 21 980', 'Le vélo parcourt 21 980 cm, soit environ 220 m.') },
    ] },
  { titre: 'Aires des figures usuelles', duree: '40 min',
    attendus: ['Calculer l\'aire d\'un rectangle, d\'un carré, d\'un triangle rectangle', 'Calculer l\'aire d\'un triangle : base × hauteur ÷ 2', 'Calculer l\'aire d\'un disque : π × rayon × rayon'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule l\'aire.',
        eleve: plListe(['Rectangle de 7 cm sur 4 cm : ' + B() + ' cm²', 'Carré de côté 9 m : ' + B() + ' m²', 'Triangle rectangle dont les côtés de l\'angle droit mesurent 6 cm et 5 cm : ' + B() + ' cm²']),
        corr: plListe(['Rectangle de 7 cm sur 4 cm : ' + R(28) + ' cm²', 'Carré de côté 9 m : ' + R(81) + ' m²', 'Triangle rectangle dont les côtés de l\'angle droit mesurent 6 cm et 5 cm : ' + R(15) + ' cm²']) },
      { etoiles: 2, col: 1, consigne: `Calcule l'aire de chaque triangle (base × hauteur ÷ 2).<div style="text-align:center;">${S(230, 100, `<polygon points="10,85 110,85 40,20" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([40, 20], [40, 85], Ro, 1.4, true) + T(60, 98, 'base 8 cm') + T(44, 55, 'h = 5 cm', { a: 'start', c: Ro }) + `<polygon points="130,85 220,85 200,25" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([200, 25], [200, 85], Ro, 1.4, true) + T(175, 98, 'base 6 cm') + T(196, 55, 'h = 4,5 cm', { a: 'end', c: Ro }), 220)}</div>`,
        eleve: plListe(['Triangle 1 : ' + B() + ' cm²', 'Triangle 2 : ' + B() + ' cm²']), corr: plListe(['Triangle 1 : 8 × 5 ÷ 2 = ' + R(20) + ' cm²', 'Triangle 2 : 6 × 4,5 ÷ 2 = ' + R('13,5') + ' cm²']) },
      { etoiles: 2, col: 1, consigne: 'Calcule l\'aire du disque (π ≈ 3,14).',
        eleve: plListe(['rayon 10 cm : ' + B() + ' cm²', 'rayon 3 m : ' + B() + ' m²', 'diamètre 4 cm : ' + B() + ' cm²']),
        corr: plListe(['rayon 10 cm : 3,14 × 10 × 10 = ' + R(314) + ' cm²', 'rayon 3 m : ' + R('28,26') + ' m²', 'diamètre 4 cm (rayon 2 cm) : ' + R('12,56') + ' cm²']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un terrain rectangulaire de 25 m sur 18 m contient une piscine ronde de 3 m de rayon. Quelle est l\'aire du terrain sans la piscine ? (π ≈ 3,14)',
        corr: cm1Redac('Terrain', '25 × 18 = 450', 'Le terrain mesure 450 m².') + cm1Redac('Piscine', '3,14 × 3 × 3 = 28,26', 'Il reste 450 − 28,26 = 421,74 m².') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un triangle quelconque, mesure une base et la hauteur correspondante, puis calcule son aire. Recommence avec une autre base : retrouves-tu la même aire ?',
        corr: cm1Redac('Vérification', 'Aire = base × hauteur ÷ 2, quelle que soit la base choisie.', 'On retrouve la même aire (aux erreurs de mesure près).') },
    ] },
  { titre: 'Unités d\'aire', duree: '35 min',
    attendus: ['Connaître les unités d\'aire : mm², cm², dm², m², km², ha', 'Convertir : 1 m² = 100 dm² = 10 000 cm²', 'Choisir une unité adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['1 m² = ' + B() + ' dm²', '1 dm² = ' + B() + ' cm²', '1 m² = ' + B(6) + ' cm²', '1 ha = ' + B(6) + ' m²', '1 km² = ' + B() + ' ha']),
        corr: plListe(['1 m² = ' + R(100) + ' dm²', '1 dm² = ' + R(100) + ' cm²', '1 m² = ' + R('10 000') + ' cm²', '1 ha = ' + R('10 000') + ' m²', '1 km² = ' + R(100) + ' ha']) },
      { etoiles: 2, col: 1, consigne: 'Convertis.',
        eleve: plListe(['3 m² = ' + B() + ' dm²', '450 cm² = ' + B() + ' dm²', '2,5 m² = ' + B(6) + ' cm²', '7 500 m² = ' + B() + ' ha']),
        corr: plListe(['3 m² = ' + R(300) + ' dm²', '450 cm² = ' + R('4,5') + ' dm²', '2,5 m² = ' + R('25 000') + ' cm²', '7 500 m² = ' + R('0,75') + ' ha']) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'unité adaptée.',
        ...ch([['Aire d\'un timbre :', 'cm²'], ['Aire d\'une salle de classe :', 'm²'], ['Aire d\'un pays :', 'km²'], ['Aire d\'un champ :', 'ha']], 'cm² · m² · ha · km²') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un champ rectangulaire mesure 250 m sur 120 m. Calcule son aire en m², puis en hectares.',
        corr: cm1Redac('Aire', '250 × 120 = 30 000', 'Le champ mesure 30 000 m², soit 3 ha.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien de carreaux de 20 cm sur 20 cm faut-il pour carreler une pièce de 4 m sur 3 m ?',
        corr: cm1Redac('Aires en cm²', { suite: ['Pièce : 400 × 300 = 120 000 cm²', 'Carreau : 20 × 20 = 400 cm²'] }, 'Il faut 120 000 ÷ 400 = 300 carreaux.') },
    ] },
  { titre: 'Figures composées et problèmes', duree: '40 min',
    attendus: ['Découper une figure en figures usuelles', 'Calculer une aire par addition ou soustraction', 'Résoudre des problèmes d\'aire et de périmètre'],
    exos: [
      { etoiles: 2, col: 1, consigne: `Cette figure en L est formée de deux rectangles. Complète (longueurs en cm).<div style="text-align:center;">${S(200, 140, `<path d="M20,10 L80,10 L80,70 L180,70 L180,120 L20,120 Z" fill="#EAF4FB" stroke="${K}" stroke-width="2"/>` + L([20, 70], [80, 70], Ro, 1.2, true) + T(50, 8, '6', { a: 'middle' }) + T(130, 134, '16') + T(14, 68, '11', { a: 'end' }) + T(188, 98, '5', { a: 'start' }) + T(90, 42, '6', { a: 'start' }), 180)}</div>`,
        eleve: plListe(['Aire du rectangle du haut : ' + B() + ' cm²', 'Aire du rectangle du bas : ' + B() + ' cm²', 'Aire de la figure : ' + B() + ' cm²', 'Périmètre de la figure : ' + B() + ' cm']),
        corr: plListe(['Aire du rectangle du haut : 6 × 6 = ' + R(36) + ' cm²', 'Aire du rectangle du bas : 16 × 5 = ' + R(80) + ' cm²', 'Aire de la figure : ' + R(116) + ' cm²', 'Périmètre de la figure : 6 + 6 + 10 + 5 + 16 + 11 = ' + R(54) + ' cm']) },
      { etoiles: 2, col: 1, consigne: 'Un cadre carré de 30 cm de côté contient une photo carrée de 20 cm de côté. Complète.',
        eleve: plListe(['Aire du cadre entier : ' + B() + ' cm²', 'Aire de la photo : ' + B() + ' cm²', 'Aire de la bordure : ' + B() + ' cm²']),
        corr: plListe(['Aire du cadre entier : ' + R(900) + ' cm²', 'Aire de la photo : ' + R(400) + ' cm²', 'Aire de la bordure : ' + R(500) + ' cm²']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un pot de peinture couvre 12 m². Un mur mesure 5 m sur 2,6 m et comporte une fenêtre de 1,2 m sur 1 m. Un pot suffit-il pour peindre ce mur ?',
        corr: cm1Redac('Surface à peindre', { suite: ['Mur : 5 × 2,6 = 13 m²', 'Fenêtre : 1,2 × 1 = 1,2 m²', '13 − 1,2 = 11,8 m²'] }, 'Il faut peindre 11,8 m² : un pot (12 m²) suffit.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On double la longueur des côtés d\'un carré. Son périmètre est-il doublé ? Et son aire ? Teste avec un carré de 3 cm.',
        corr: cm1Redac('Test', { suite: ['Côté 3 cm : périmètre 12 cm, aire 9 cm².', 'Côté 6 cm : périmètre 24 cm, aire 36 cm².'] }, 'Le périmètre est doublé, mais l\'aire est multipliée par 4.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une piste d\'athlétisme est formée d\'un rectangle de 100 m sur 60 m et de deux demi-disques de diamètre 60 m aux extrémités. Calcule la longueur d\'un tour (π ≈ 3,14).',
        corr: cm1Redac('Longueur d\'un tour', { suite: ['Deux lignes droites : 2 × 100 = 200 m', 'Deux demi-cercles = un cercle : 3,14 × 60 = 188,4 m'] }, 'Un tour mesure 200 + 188,4 = 388,4 m.') },
    ] },
];
})();

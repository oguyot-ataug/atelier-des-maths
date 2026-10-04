/* ============================================================
   6e · Planches : Angles et rapporteur (G3)
   Nommer un angle, types d'angles, lire et construire au rapporteur, paires d'angles, bissectrice.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const T = (p, t, c, fs) => cmT(p[0], p[1], t, { fs: fs || 13, c: c || K });
const X = (p, c) => `<path d="M${p[0] - 4},${p[1] - 4} L${p[0] + 4},${p[1] + 4} M${p[0] - 4},${p[1] + 4} L${p[0] + 4},${p[1] - 4}" stroke="${c || K}" stroke-width="2"/>`;
const pt = (V, d, l) => [V[0] + l * Math.cos(d * Math.PI / 180), V[1] - l * Math.sin(d * Math.PI / 180)];
const W = n => cm1Tex(`\\widehat{${n}}`);
// Arc d'angle de d1 à d2 (degrés, sens trigonométrique), rempli en couleur ; un angle droit est codé par un carré.
function arc(V, d1, d2, r, c){ if(Math.abs(d2 - d1 - 90) < .01){ const a = pt(V, d1, 11), b = pt(V, d2, 11), m = [a[0] + b[0] - V[0], a[1] + b[1] - V[1]]; return `<polyline points="${a.join(',')} ${m.join(',')} ${b.join(',')}" fill="none" stroke="${c}" stroke-width="1.8"/>`; }
  const a = pt(V, d1, r), b = pt(V, d2, r); return `<path d="M${V[0]},${V[1]} L${a[0].toFixed(1)},${a[1].toFixed(1)} A${r},${r} 0 ${d2 - d1 > 180 ? 1 : 0} 0 ${b[0].toFixed(1)},${b[1].toFixed(1)} Z" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="1.4"/>`; }
// Angle de sommet V, côtés de directions d1 et d2 ; n : [nom sur d1, nom du sommet, nom sur d2].
function ang(V, d1, d2, l, n, c, sansArc){ const a = pt(V, d1, l), b = pt(V, d2, l); let s = (sansArc ? '' : arc(V, d1, d2, 20, c || Ro)) + L(V, pt(V, d1, l + 18)) + L(V, pt(V, d2, l + 18));
  if(n){ const m = (d1 + d2) / 2 + 180; s += X(a) + X(b) + T(pt(a, d1 - 90, 12), n[0]) + T(pt(b, d2 + 90, 12), n[2]) + T(pt(V, m, 14), n[1]); } return s; }
// Rapporteur centré en V (rayon r) : graduation extérieure de 0 (à droite) à 180, graduation intérieure de 0 (à gauche) à 180.
function rapp(V, r){ let s = `<path d="M${V[0] - r},${V[1]} A${r},${r} 0 0 1 ${V[0] + r},${V[1]} Z" fill="#EAF4FB" fill-opacity=".85" stroke="#3A6EA5" stroke-width="1.2"/>`;
  for(let t = 0; t <= 180; t += 5){ const g = t % 10 === 0, a = pt(V, t, r), b = pt(V, t, r - (g ? 8 : 4)); s += L(a, b, '#3A6EA5', g ? 1 : .7);
    if(t % 20 === 0){ s += cmT(...pt(V, t, r - 15), t, { fs: 7.5, c: '#1F3A5C' }) + cmT(...pt(V, t, r - 26), 180 - t, { fs: 7, c: '#B4472B' }); } }
  return s + `<circle cx="${V[0]}" cy="${V[1]}" r="2.5" fill="#3A6EA5"/>`; }
// Lecture au rapporteur : angle de m degrés, un côté sur le 0 de droite (g = false) ou de gauche (g = true).
const lect = (m, g, n) => { const V = [120, 125], d1 = g ? 180 - m : 0, d2 = g ? 180 : m; return S(240, 140, rapp(V, 100) + L(V, pt(V, d1, 112), Ro, 2.2) + L(V, pt(V, d2, 112), Ro, 2.2) + T([V[0], V[1] + 13], n || 'O'), 220); };
// Horloge à h heures pile (grande aiguille sur 12).
const horl = h => { const O = [40, 40]; let s = `<circle cx="40" cy="40" r="35" fill="#fff" stroke="${K}" stroke-width="2"/>`; for(let i = 0; i < 12; i++) s += L(pt(O, 90 - i * 30, 35), pt(O, 90 - i * 30, i % 3 ? 31 : 28), K, i % 3 ? 1 : 2);
  return S(80, 80, s + L(O, pt(O, 90, 27), Bl, 2.6) + L(O, pt(O, 90 - h * 30, 18), Ro, 3.4) + `<circle cx="40" cy="40" r="3" fill="${K}"/>`, 70); };
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t, w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;max-width:${w || 130}px;line-height:1.35;">${t}</span></span>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const vig = (inner, w) => S(110, 80, `<rect x="1" y="1" width="108" height="78" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, w || 98);
const vigs = (V, it, m) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${m}</b>`, 116))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`, 116))) });
PLANCHES['6e|Angles et rapporteur'] = [
  { titre: 'Notion d\'angle et notations', duree: '35 min',
    attendus: ['Reconnaître un angle : un sommet et deux côtés (demi-droites)', 'Nommer un angle avec trois lettres, le sommet au milieu', 'Comparer des angles sans les mesurer'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Observe l'angle ${W('xOy')} colorié, puis complète.<div style="text-align:center;">${S(200, 110, arc([40, 90], 0, 40, 26, Ro) + L([40, 90], [190, 90]) + L([40, 90], pt([40, 90], 40, 118)) + T([30, 100], 'O') + T([180, 104], 'x') + T([142, 24], 'y'), 190)}</div>`,
        eleve: plListe(['Le sommet de l\'angle est le point ' + B(1), 'Ses côtés sont les demi-droites [Ox) et ' + B(3), 'On peut aussi le nommer ' + W('yOx') + ' : <b>oui · non</b>']),
        corr: plListe(['Le sommet de l\'angle est le point ' + R('O'), 'Ses côtés sont les demi-droites [Ox) et ' + R('[Oy)'), 'On peut aussi le nommer ' + W('yOx') + ' : ' + plEntoure('oui')]) },
      { etoiles: 1, col: 1, consigne: `Dans le triangle ABC, complète.<div style="text-align:center;">${S(200, 120, arc([30, 100], 0, 37, 22, Ro) + arc([170, 100], 140, 180, 22, Bl) + `<polygon points="30,100 170,100 110,40" fill="none" stroke="${K}" stroke-width="2"/>` + T([20, 112], 'A') + T([180, 112], 'B') + T([110, 32], 'C'), 165)}</div>`,
        eleve: plListe(['L\'angle rouge a pour sommet ' + B(1) + ' : il se nomme ' + W('BAC') + ' ou ' + W('CAB') + '.', 'L\'angle bleu a pour sommet ' + B(1) + ' : il se nomme ' + B(3) + ' (commence par A).', 'Le troisième angle du triangle a pour sommet ' + B(1)]),
        corr: plListe(['L\'angle rouge a pour sommet ' + R('A') + ' : il se nomme ' + W('BAC') + ' ou ' + W('CAB') + '.', 'L\'angle bleu a pour sommet ' + R('B') + ' : il se nomme ' + R('ABC') + ' (commence par A).', 'Le troisième angle du triangle a pour sommet ' + R('C')]) },
      { etoiles: 2, col: 1, consigne: `Quel est le nom de l'angle colorié ? Entoure.<div style="text-align:center;">${S(210, 115, arc([100, 100], 30, 110, 24, Ve) + L([20, 100], [200, 100]) + L([100, 100], pt([100, 100], 30, 100)) + L([100, 100], pt([100, 100], 110, 90)) + X([20, 100]) + X([190, 100]) + X(pt([100, 100], 30, 90)) + X(pt([100, 100], 110, 80)) + T([18, 89], 'D') + T([192, 89], 'F') + T([100, 113], 'E') + T(pt([100, 100], 30, 102), 'G') + T([62, 22], 'H'), 170)}</div>`,
        eleve: plListe(['L\'angle vert est l\'angle <b>DEH · GEH · EGH</b>']), corr: plListe(['L\'angle vert est l\'angle ' + plEntoure('GEH') + ' : le sommet E est la lettre du milieu.']) },
      { etoiles: 2, consigne: 'Sans mesurer, entoure le plus grand angle de chaque paire. Attention : la longueur des côtés ne compte pas.',
        ...(() => { const P = [[ang([20, 65], 0, 35, 60), ang([20, 65], 0, 50, 30)], [ang([20, 65], 0, 80, 25), ang([20, 65], 0, 60, 75)]];
          const it = [['paire 1', 'le second'], ['paire 2', 'le premier']];
          return { eleve: duo(P.map(([a, b], i) => col(`<span style="display:flex;gap:6px;">${vig(a, 92)}${vig(b, 92)}</span>`, `${it[i][0]} : <b>le premier · le second</b>`, 300))), corr: duo(P.map(([a, b], i) => col(`<span style="display:flex;gap:6px;">${vig(a, 92)}${vig(b, 92)}</span>`, `${it[i][0]} : ${plEntoure(it[i][1])}`, 300))) }; })() },
      { etoiles: 2, col: 1, consigne: `Combien d'angles de sommet O vois-tu sur cette figure ? (Trois demi-droites de même origine.)<div style="text-align:center;">${S(180, 110, L([20, 90], [170, 90]) + L([20, 90], pt([20, 90], 35, 128)) + L([20, 90], pt([20, 90], 70, 78)) + T([12, 102], 'O') + T([166, 104], 'x') + T([138, 24], 'y') + T([60, 16], 'z'), 170)}</div>`,
        eleve: plListe(['Nombre d\'angles saillants : ' + B(1), 'Le plus grand est ' + W('xOz') + ' : <b>oui · non</b>']),
        corr: plListe(['Nombre d\'angles saillants : ' + R(3) + ' (' + W('xOy') + ', ' + W('yOz') + ', ' + W('xOz') + ')', 'Le plus grand est ' + W('xOz') + ' : ' + plEntoure('oui')]) },
    ] },
  { titre: 'Différents types d\'angles', duree: '30 min',
    attendus: ['Reconnaître un angle aigu, droit, obtus, plat', 'Connaître les mesures qui les caractérisent', 'Utiliser l\'équerre pour vérifier un angle droit'],
    exos: [
      { etoiles: 1, consigne: 'Pour chaque angle, entoure sa nature.',
        ...vigs([vig(ang([20, 65], 0, 50, 70)), vig(ang([20, 65], 0, 90, 55)), vig(ang([45, 65], 0, 130, 55)), vig(ang([55, 50], 0, 180, 45)), vig(ang([20, 65], 0, 20, 75))],
          [['a', 'aigu'], ['b', 'droit'], ['c', 'obtus'], ['d', 'plat'], ['e', 'aigu']], 'aigu · droit · obtus · plat') },
      { etoiles: 1, col: 1, consigne: 'Complète avec aigu, droit, obtus ou plat.',
        eleve: plListe(['Un angle de 90° est ' + B(4), 'Un angle de 35° est ' + B(4), 'Un angle de 180° est ' + B(4), 'Un angle de 120° est ' + B(4)]),
        corr: plListe(['Un angle de 90° est ' + R('droit'), 'Un angle de 35° est ' + R('aigu'), 'Un angle de 180° est ' + R('plat'), 'Un angle de 120° est ' + R('obtus')]) },
      { etoiles: 1, col: 1, consigne: 'Entoure la nature de chaque angle, d\'après sa mesure.',
        ...ch([['89° :', 'aigu'], ['91° :', 'obtus'], ['179° :', 'obtus'], ['5° :', 'aigu']], 'aigu · obtus') },
      { etoiles: 2, consigne: 'Quel angle forment les aiguilles de l\'horloge ? Entoure.',
        ...(() => { const h = [3, 6, 2, 4].map(horl), it = [['3 h', 'droit'], ['6 h', 'plat'], ['2 h', 'aigu'], ['4 h', 'obtus']];
          return { eleve: duo(h.map((x, i) => col(x, `${it[i][0]}<br><b>aigu · droit · obtus · plat</b>`))), corr: duo(h.map((x, i) => col(x, `${it[i][0]}<br>${plEntoure(it[i][1])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un angle obtus est plus grand qu\'un angle droit.', 'vrai'], ['Un angle plat mesure 90°.', 'faux'], ['Un triangle peut avoir un angle obtus.', 'vrai'], ['Deux angles aigus ont forcément la même mesure.', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un angle aigu, un angle droit et un angle obtus. Explique comment tu vérifies chacun avec ton équerre.',
        corr: cm1Redac('Avec l\'équerre', { suite: ['Je place l\'angle droit de l\'équerre sur le sommet, un côté de l\'équerre le long d\'un côté de l\'angle.', 'Si le second côté est dans l\'équerre : angle aigu ; le long de l\'équerre : angle droit ; à l\'extérieur : angle obtus.'] }, 'L\'équerre sert de repère : elle compare l\'angle à un angle droit.') },
    ] },
  { titre: 'Mesurer un angle avec le rapporteur', duree: '40 min',
    attendus: ['Placer le centre du rapporteur sur le sommet et le zéro sur un côté', 'Choisir la bonne graduation (celle qui part de 0 sur le côté)', 'Vérifier la mesure par la nature de l\'angle'],
    exos: [
      { etoiles: 1, consigne: 'Le zéro de la graduation noire est à droite. Lis la mesure de chaque angle.',
        eleve: duo([col(lect(40), 'Mesure : ' + B() + ' °'), col(lect(120), 'Mesure : ' + B() + ' °')]), corr: duo([col(lect(40), 'Mesure : ' + R(40) + ' °'), col(lect(120), 'Mesure : ' + R(120) + ' °')]) },
      { etoiles: 2, consigne: 'Ici, un côté de l\'angle passe par le zéro de gauche : lis sur la graduation rouge (intérieure).',
        eleve: duo([col(lect(70, true), 'Mesure : ' + B() + ' °'), col(lect(150, true), 'Mesure : ' + B() + ' °')]), corr: duo([col(lect(70, true), 'Mesure : ' + R(70) + ' °'), col(lect(150, true), 'Mesure : ' + R(150) + ' °')]) },
      { etoiles: 2, consigne: 'Sans rapporteur, entoure la mesure la plus vraisemblable.',
        ...(() => { const V = [vig(ang([20, 65], 0, 30, 75)), vig(ang([40, 65], 0, 100, 55)), vig(ang([60, 65], 0, 150, 45))], it = [['a', '30°', '30° · 60° · 120°'], ['b', '100°', '45° · 100° · 170°'], ['c', '150°', '15° · 90° · 150°']];
          return { eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${it[i][2]}</b>`))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Tom a lu 140° pour un angle aigu. Où est son erreur ? Entoure.',
        eleve: plListe(['Tom a lu <b>la mauvaise graduation · le bon nombre</b>', 'La bonne mesure est ' + B() + ' °']),
        corr: plListe(['Tom a lu ' + plEntoure('la mauvaise graduation'), 'La bonne mesure est 180 − 140 = ' + R(40) + ' ° (un angle aigu mesure moins de 90°).']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un triangle quelconque. Mesure ses trois angles au rapporteur, puis calcule leur somme. Que remarques-tu ?',
        corr: cm1Redac('Somme des angles', 'Par exemple : 50° + 60° + 70° = 180°', 'La somme des trois angles d\'un triangle vaut toujours 180° (aux erreurs de mesure près).') },
    ] },
  { titre: 'Construire un angle avec le rapporteur', duree: '40 min',
    attendus: ['Construire un angle de mesure donnée', 'Construire une figure à partir de mesures d\'angles et de longueurs', 'Vérifier une construction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Remets dans l\'ordre les étapes pour construire un angle ' + W('xOy') + ' de 65° (écris le numéro de 1 à 4).',
        eleve: plListe(['Étape ' + B(1) + ' : je place un repère à 65° sur la graduation qui part de 0 sur [Ox).', 'Étape ' + B(1) + ' : je trace une demi-droite [Ox).', 'Étape ' + B(1) + ' : je trace la demi-droite [Oy) qui passe par le repère.', 'Étape ' + B(1) + ' : je place le centre du rapporteur sur O et le zéro sur [Ox).']),
        corr: plListe(['Étape ' + R(3) + ' : je place un repère à 65° sur la graduation qui part de 0 sur [Ox).', 'Étape ' + R(1) + ' : je trace une demi-droite [Ox).', 'Étape ' + R(4) + ' : je trace la demi-droite [Oy) qui passe par le repère.', 'Étape ' + R(2) + ' : je place le centre du rapporteur sur O et le zéro sur [Ox).']) },
      { etoiles: 1, col: 1, consigne: 'Pour construire ces angles, sur quelle graduation lis-tu ? Le côté [Ox) part vers la gauche (zéro rouge).',
        eleve: plListe(['Angle de 30° : repère à <b>30 · 150</b> sur la graduation rouge', 'Angle de 110° : repère à <b>110 · 70</b> sur la graduation rouge']),
        corr: plListe(['Angle de 30° : repère à ' + plEntoure('30') + ' sur la graduation rouge', 'Angle de 110° : repère à ' + plEntoure('110') + ' sur la graduation rouge']) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis les angles ' + W('ABC') + ' = 45°, ' + W('DEF') + ' = 120° et ' + W('GHI') + ' = 90° (sans équerre). Indique leur nature.',
        corr: cm1Redac('Nature', { suite: [W('ABC') + ' = 45° : angle aigu.', W('DEF') + ' = 120° : angle obtus.', W('GHI') + ' = 90° : angle droit.'] }, 'On vérifie l\'angle droit avec l\'équerre.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis un triangle ABC tel que AB = 6 cm, ' + W('BAC') + ' = 50° et ' + W('ABC') + ' = 70°. Mesure ensuite l\'angle ' + W('ACB') + '.',
        corr: cm1Redac('Construction', { suite: ['Je trace [AB] de 6 cm.', 'En A, je construis un angle de 50° ; en B, un angle de 70°.', 'Les deux demi-droites se coupent en C.'] }, 'Je mesure ' + W('ACB') + ' = 60° (car 180 − 50 − 70 = 60).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un angle ' + W('xOy') + ' de 200° : un angle rentrant. Explique ta méthode.',
        corr: cm1Redac('Angle rentrant', { suite: ['Un rapporteur ne va que jusqu\'à 180°.', '360 − 200 = 160 : je construis un angle saillant de 160°.'] }, 'L\'angle rentrant ' + W('xOy') + ' est l\'autre partie du plan : il mesure 360 − 160 = 200°.') },
    ] },
  { titre: 'Paires d\'angles particuliers', duree: '40 min',
    attendus: ['Reconnaître des angles adjacents', 'Reconnaître des angles opposés par le sommet et savoir qu\'ils ont la même mesure', 'Reconnaître des angles complémentaires et supplémentaires'],
    exos: [
      { etoiles: 1, consigne: 'Les angles colorés sont-ils adjacents (même sommet, un côté commun, de part et d\'autre de ce côté) ? Entoure.',
        ...(() => { const V = [vig(arc([20, 65], 0, 35, 22, Ro) + arc([20, 65], 35, 80, 22, Bl) + L([20, 65], [100, 65]) + L([20, 65], pt([20, 65], 35, 85)) + L([20, 65], pt([20, 65], 80, 60))),
            vig(arc([20, 65], 0, 30, 30, Ro) + arc([20, 65], 0, 60, 18, Bl) + L([20, 65], [100, 65]) + L([20, 65], pt([20, 65], 30, 85)) + L([20, 65], pt([20, 65], 60, 65))),
            vig(arc([25, 65], 0, 45, 22, Ro) + arc([70, 65], 0, 60, 18, Bl) + L([25, 65], [104, 65]) + L([25, 65], pt([25, 65], 45, 55)) + L([70, 65], pt([70, 65], 60, 50))),
            vig(arc([55, 60], 0, 90, 20, Ro) + arc([55, 60], 90, 180, 20, Bl) + L([10, 60], [100, 60]) + L([55, 60], [55, 8]))];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'non'], ['d', 'oui']], 'oui · non'); })() },
      { etoiles: 1, col: 1, consigne: `Deux droites se coupent en O. L'angle rouge mesure 40°. Complète.<div style="text-align:center;">${S(200, 120, arc([100, 60], 20, 60, 22, Ro) + arc([100, 60], 200, 240, 22, Bl) + arc([100, 60], 60, 200, 14, Ve) + L(pt([100, 60], 20, 95), pt([100, 60], 200, 95)) + L(pt([100, 60], 60, 70), pt([100, 60], 240, 70)) + T([112, 76], 'O'), 190)}</div>`,
        eleve: plListe(['L\'angle bleu est opposé par le sommet à l\'angle rouge : il mesure ' + B() + ' °', 'Les angles rouge et vert sont supplémentaires : le vert mesure ' + B() + ' °']),
        corr: plListe(['L\'angle bleu est opposé par le sommet à l\'angle rouge : il mesure ' + R(40) + ' °', 'Les angles rouge et vert sont supplémentaires : le vert mesure 180 − 40 = ' + R(140) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Complète : deux angles complémentaires ont une somme de 90°, deux angles supplémentaires une somme de 180°.',
        eleve: plListe(['Complémentaire de 30° : ' + B() + ' °', 'Complémentaire de 72° : ' + B() + ' °', 'Supplémentaire de 50° : ' + B() + ' °', 'Supplémentaire de 125° : ' + B() + ' °']),
        corr: plListe(['Complémentaire de 30° : ' + R(60) + ' °', 'Complémentaire de 72° : ' + R(18) + ' °', 'Supplémentaire de 50° : ' + R(130) + ' °', 'Supplémentaire de 125° : ' + R(55) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux angles opposés par le sommet ont la même mesure.', 'vrai'], ['Deux angles adjacents sont forcément égaux.', 'faux'], ['Un angle obtus a un complémentaire.', 'faux'], ['Deux angles de 90° sont supplémentaires.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Les points A, O et B sont alignés. ${W('AOC')} = 35° et ${W('COD')} = 90°. Calcule ${W('DOB')}.<span class="cm-fig-d">${S(150, 90, L([10, 70], [140, 70]) + L([75, 70], pt([75, 70], 145, 62)) + L([75, 70], pt([75, 70], 55, 62)) + T([8, 64], 'A') + T([142, 64], 'B') + T([75, 85], 'O') + T([18, 30], 'C') + T([122, 12], 'D'), 140)}</span>`,
        corr: cm1Redac('Calcul', { suite: [W('AOB') + ' est un angle plat : 180°.', W('DOB') + ' = 180° − 35° − 90°'] }, W('DOB') + ' = 55°.') },
    ] },
  { titre: 'Bissectrice d\'un angle', duree: '35 min',
    attendus: ['Connaître la définition de la bissectrice : la demi-droite qui partage l\'angle en deux angles de même mesure', 'Calculer la mesure des deux angles obtenus', 'Construire la bissectrice au rapporteur ou au compas'],
    exos: [
      { etoiles: 1, col: 1, consigne: `La demi-droite [Oz) est la bissectrice de l'angle ${W('xOy')}. Complète.<div style="text-align:center;">${S(190, 110, arc([20, 95], 0, 30, 34, Ro) + arc([20, 95], 30, 60, 24, Bl) + L([20, 95], [180, 95]) + L([20, 95], pt([20, 95], 60, 92)) + L([20, 95], pt([20, 95], 30, 160), Ve, 2.2) + T([12, 106], 'O') + T([176, 108], 'x') + T([78, 16], 'y') + T(pt([20, 95], 30, 168), 'z', Ve), 180)}</div>`,
        eleve: plListe(['Si ' + W('xOy') + ' = 60°, alors ' + W('xOz') + ' = ' + B() + ' °', 'Si ' + W('xOz') + ' = 25°, alors ' + W('xOy') + ' = ' + B() + ' °', 'Si ' + W('xOy') + ' = 130°, alors ' + W('zOy') + ' = ' + B() + ' °']),
        corr: plListe(['Si ' + W('xOy') + ' = 60°, alors ' + W('xOz') + ' = ' + R(30) + ' °', 'Si ' + W('xOz') + ' = 25°, alors ' + W('xOy') + ' = ' + R(50) + ' °', 'Si ' + W('xOy') + ' = 130°, alors ' + W('zOy') + ' = ' + R(65) + ' °']) },
      { etoiles: 1, consigne: 'La demi-droite verte est-elle la bissectrice de l\'angle ? Entoure (les arcs de même couleur ont même mesure).',
        ...(() => { const V0 = [15, 68], b = (d, z, codes) => vig(arc(V0, 0, z, 30, codes[0]) + arc(V0, z, d, 22, codes[1]) + L(V0, [104, 68]) + L(V0, pt(V0, d, 85)) + L(V0, pt(V0, z, 95), Ve, 2.2));
          return vigs([b(80, 40, [Ro, Ro]), b(80, 25, [Ro, Bl]), b(60, 30, [Bl, Bl])], [['a', 'oui'], ['b', 'non'], ['c', 'oui']], 'oui · non'); })() },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        eleve: plListe(['Un angle plat est partagé par sa bissectrice en deux angles de ' + B() + ' °', 'Un angle droit est partagé par sa bissectrice en deux angles de ' + B() + ' °', 'Un angle de 75° est partagé en deux angles de ' + B() + ' °']),
        corr: plListe(['Un angle plat est partagé par sa bissectrice en deux angles de ' + R(90) + ' °', 'Un angle droit est partagé par sa bissectrice en deux angles de ' + R(45) + ' °', 'Un angle de 75° est partagé en deux angles de ' + R('37,5') + ' °']) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Construis un angle ' + W('xOy') + ' de 110°, puis sa bissectrice au rapporteur.',
        corr: cm1Redac('Au rapporteur', '110 ÷ 2 = 55', 'Je place un repère à 55° à partir de [Ox), puis je trace la demi-droite [Oz) : ' + W('xOz') + ' = ' + W('zOy') + ' = 55°.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis la bissectrice d\'un angle ' + W('xOy') + ' au compas, sans rapporteur. Explique.',
        corr: cm1Redac('Au compas', { suite: ['Je trace un arc de centre O qui coupe [Ox) en A et [Oy) en B.', 'Je trace deux arcs de même rayon, de centres A et B, qui se coupent en un point C.'] }, 'La demi-droite [OC) est la bissectrice de ' + W('xOy') + '.') },
    ] },
  { titre: 'Calculer des angles : synthèse', duree: '35 min',
    attendus: ['Calculer des mesures d\'angles par addition et soustraction', 'Utiliser les angles d\'un tour complet (360°) et d\'un angle plat (180°)', 'Réinvestir le vocabulaire des angles'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Entre deux nombres voisins du cadran d\'une horloge, l\'angle mesure 360° ÷ 12 = 30°. Quel angle (saillant) forment les aiguilles ?',
        eleve: plListe(['à 1 h : ' + B() + ' °', 'à 5 h : ' + B() + ' °', 'à 10 h : ' + B() + ' °', 'à 6 h : ' + B() + ' °']),
        corr: plListe(['à 1 h : ' + R(30) + ' °', 'à 5 h : 5 × 30 = ' + R(150) + ' °', 'à 10 h : 2 × 30 = ' + R(60) + ' °', 'à 6 h : ' + R(180) + ' °']) },
      { etoiles: 2, col: 1, consigne: 'Les angles ' + W('xOy') + ' = 40°, ' + W('yOz') + ' = 35° et ' + W('zOt') + ' = 50° sont adjacents, dans cet ordre. Calcule.',
        eleve: plListe([W('xOz') + ' = ' + B() + ' °', W('yOt') + ' = ' + B() + ' °', W('xOt') + ' = ' + B() + ' °', W('xOt') + ' est un angle <b>aigu · droit · obtus</b>']),
        corr: plListe([W('xOz') + ' = 40 + 35 = ' + R(75) + ' °', W('yOt') + ' = 35 + 50 = ' + R(85) + ' °', W('xOt') + ' = 40 + 35 + 50 = ' + R(125) + ' °', W('xOt') + ' est un angle ' + plEntoure('obtus')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace un angle ' + W('RST') + ' puis un angle ' + W('TSU') + ' qui a le même sommet et un côté commun avec le premier. Repasse le côté commun en couleur et nomme-le.',
        corr: cm1Redac('Côté commun', { suite: ['Les deux angles ont pour sommet S (la lettre du milieu).', 'Le côté commun est la demi-droite [ST).'] }, 'Les angles ' + W('RST') + ' et ' + W('TSU') + ' ont le même sommet S et le côté commun [ST).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Construis un hexagone régulier : trace un cercle de rayon 4 cm, puis six rayons qui forment entre eux des angles de 60°. Relie les extrémités. Pourquoi 60° ?',
        corr: cm1Redac('Pourquoi 60° ?', '360 ÷ 6 = 60', 'Les six angles autour du centre font un tour complet (360°), partagé en six angles égaux de 60°.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux angles adjacents ' + W('xOy') + ' = 50° et ' + W('yOz') + ' = 70° sont tracés. Quelle est la mesure de l\'angle formé par leurs deux bissectrices ? Justifie.',
        corr: cm1Redac('Calcul', { suite: ['La bissectrice de ' + W('xOy') + ' fait 25° avec [Oy).', 'La bissectrice de ' + W('yOz') + ' fait 35° avec [Oy).'] }, 'L\'angle formé par les deux bissectrices mesure 25° + 35° = 60°.') },
    ] },
];
})();

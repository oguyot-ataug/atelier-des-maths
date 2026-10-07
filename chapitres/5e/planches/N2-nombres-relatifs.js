/* ============================================================
   5e · Planches : Nombres relatifs (N2)
   Signe et opposé, droite graduée (lire, placer), comparer et ranger, repérage dans le plan.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rel = v => String(+(+v).toFixed(3)).replace('-', '−').replace('.', ',');
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
const lt = '&lt;', gt = '&gt;', C = plCase();
// Droite graduée : lire les abscisses / placer des points (outil points à l'écran).
const axe = (min, max, pas, etiq, pts) => cm1Axe(min, max, pas, etiq, pts, { fmt: rel, alterne: true });
function place(min, max, pas, etiq, pts){ const L = 460, px = v => 30 + L * (v - min) / (max - min), n = Math.round((max - min) / pas);
  return { eleve: plX(cm1Axe(min, max, pas, etiq, [], { fmt: rel }), { t: 'pts', tol: Math.min(18, L / n * .45), noms: pts.map(p => p[1]), cands: Array.from({ length: n + 1 }, (_, i) => [px(min + i * pas), 44]), att: Object.fromEntries(pts.map(([v, nm]) => [nm, [px(v), 44]])) }),
    corr: axe(min, max, pas, etiq, pts) }; }
const lire = (min, max, pas, etiq, pts) => { const a = axe(min, max, pas, etiq, pts), l = f => `<div style="display:flex;gap:22px;justify-content:center;flex-wrap:wrap;">${pts.map(([v, n]) => `<span>${n} : ${f(v)}</span>`).join('')}</div>`;
  return { eleve: a + l(() => B(3)), corr: a + l(v => R(rel(v))) }; };
// Repère du plan : x de x0 à x1, y de y0 à y1 (unités), k px par unité.
function repere(x0, x1, y0, y1, k, inner){ const W = (x1 - x0) * k + 40, H = (y1 - y0) * k + 40, X = x => 20 + (x - x0) * k, Y = y => 20 + (y1 - y) * k;
  let s = ''; for(let x = x0; x <= x1; x++) s += `<line x1="${X(x)}" y1="${Y(y1)}" x2="${X(x)}" y2="${Y(y0)}" stroke="#C9DCEB"/>`; for(let y = y0; y <= y1; y++) s += `<line x1="${X(x0)}" y1="${Y(y)}" x2="${X(x1)}" y2="${Y(y)}" stroke="#C9DCEB"/>`;
  s += `<line x1="${X(x0) - 8}" y1="${Y(0)}" x2="${X(x1) + 12}" y2="${Y(0)}" stroke="#1C2B39" stroke-width="1.6"/><line x1="${X(0)}" y1="${Y(y0) + 8}" x2="${X(0)}" y2="${Y(y1) - 12}" stroke="#1C2B39" stroke-width="1.6"/>`;
  for(let x = x0; x <= x1; x++) if(x) s += cmT(X(x), Y(0) + 15, rel(x), { fs: 10, fw: 500, c: '#4E5665' });
  for(let y = y0; y <= y1; y++) if(y) s += cmT(X(0) - 11, Y(y) + 4, rel(y), { fs: 10, fw: 500, c: '#4E5665' });
  s += cmT(X(0) - 9, Y(0) + 14, '0', { fs: 10, fw: 500, c: '#4E5665' });
  return { svg: `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:block;margin:0 auto;">${s}${inner ? inner(X, Y) : ''}</svg>`, X, Y, grille: { k, ox: X(x0), oy: Y(y1), w: x1 - x0, h: y1 - y0 } }; }
const pt = (X, Y, x, y, n, c) => `<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${c || '#FF8208'}"/>` + cmT(X(x) + 9, Y(y) - 7, n, { fs: 13, c: c || '#FF8208' });
PLANCHES['5e|Nombres relatifs'] = [
  { titre: 'Des nombres positifs et négatifs', duree: '30 min',
    attendus: ['Utiliser un nombre relatif dans une situation (température, altitude, gain, perte)', 'Reconnaître le signe d\'un nombre', 'Donner l\'opposé d\'un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris un nombre relatif pour chaque situation.',
        ...rmp([['Il fait 4 degrés sous zéro : @ °C', '−4'], ['Un plongeur est à 25 m sous la mer : @ m', '−25'], ['Le mont Blanc culmine à 4 806 m : @ m', '4806'], ['Je perds 12 points : @', '−12'], ['L\'an 52 avant J.-C. : @', '−52']], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure le signe de chaque nombre.',
        ...ch([['−7 :', 'négatif'], ['+3,5 :', 'positif'], ['0 :', 'les deux'], ['−0,01 :', 'négatif'], ['18 :', 'positif']], 'positif · négatif · les deux') },
      { etoiles: 1, col: 1, consigne: 'Donne l\'opposé de chaque nombre.',
        ...rmp([['Opposé de 8 : @', '−8'], ['Opposé de −3 : @', '3'], ['Opposé de −12,5 : @', '12,5'], ['Opposé de 0 : @', '0'], ['Opposé de l\'opposé de 6 : @', '6']], 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['−5 est un nombre négatif :', 'vrai'], ['L\'opposé d\'un nombre négatif est positif :', 'vrai'], ['+9 et 9 désignent le même nombre :', 'vrai'], ['Un nombre et son opposé ont le même signe :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Le thermomètre indique le matin et l\'après-midi. Complète.',
        ...rmp([['Matin −6 °C, il gagne 9 degrés : après-midi @ °C', '3'], ['Matin 2 °C, il perd 5 degrés : soir @ °C', '−3'], ['Matin −1 °C, il perd 4 degrés : soir @ °C', '−5']], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres négatifs.',
        ...(() => { const l = ['−4', '7', '−0,5', '+2', '−10', '0', '3,2', '−1']; return { eleve: plGrille(l, 4), corr: plGrille(l.map(t => t[0] === '−' ? plEntoure(t) : t), 4) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un ascenseur part du rez-de-chaussée (étage 0). Il descend de 2 étages, monte de 5, puis descend de 4. À quel étage arrive-t-il ? Explique avec des nombres relatifs.',
        corr: cm1Redac('Étage d\'arrivée', '0 → −2 → +3 → −1', 'L\'ascenseur arrive à l\'étage −1 (le premier sous-sol).') },
    ] },
  { titre: 'Repérer sur une droite graduée', duree: '35 min',
    attendus: ['Lire l\'abscisse d\'un point d\'une droite graduée', 'Placer un point d\'abscisse donnée', 'Repérer deux points opposés, symétriques par rapport à l\'origine'],
    exos: [
      { etoiles: 1, consigne: 'Lis l\'abscisse de chaque point.', ...lire(-5, 5, 1, 1, [[-4, 'A'], [-1, 'B'], [2, 'C'], [5, 'D'], [-3, 'E']]) },
      { etoiles: 1, consigne: 'Place les points F(−3), G(2), H(−5), K(4) et L(0).', ...place(-6, 6, 1, 1, [[-3, 'F'], [2, 'G'], [-5, 'H'], [4, 'K'], [0, 'L']]) },
      { etoiles: 2, consigne: 'Lis l\'abscisse de chaque point (attention à la graduation).', ...lire(-2, 2, .5, 1, [[-1.5, 'M'], [-.5, 'N'], [.5, 'P'], [2, 'Q']]) },
      { etoiles: 2, consigne: 'Place les points R(−20), S(15), T(−35) et U(40).', ...place(-40, 40, 5, 10, [[-20, 'R'], [15, 'S'], [-35, 'T'], [40, 'U']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Le point d\'abscisse −7 et le point d\'abscisse @ sont à la même distance de l\'origine.', '7'], ['Distance à zéro de −9 : @', '9'], ['Le milieu du segment joignant −4 et 4 a pour abscisse @', '0'], ['Deux nombres opposés ont pour somme @', '0']], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une droite graduée, A a pour abscisse −3 et B a pour abscisse 5. Quelle est la distance AB ? Quelle est l\'abscisse du milieu de [AB] ?',
        corr: cm1Redac('Distance et milieu', { suite: ['De −3 à 0 : 3 unités ; de 0 à 5 : 5 unités ; AB = 3 + 5 = 8.', 'Le milieu est à 4 unités de A : −3 + 4 = 1.'] }, 'AB = 8 unités et le milieu de [AB] a pour abscisse 1.') },
    ] },
  { titre: 'Comparer et ranger des nombres relatifs', duree: '35 min',
    attendus: ['Comparer deux nombres relatifs (positif, négatif, deux négatifs)', 'Ranger des nombres relatifs', 'Utiliser une droite graduée pour comparer'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt; ou &gt;.',
        ...(() => { const l = [[-3, 2], [5, -8], [-1, -6], [-4, -2], [0, -0.5], [-7.5, -7]]; return { eleve: plListe(l.map(([a, b]) => `${rel(a)} ${C} ${rel(b)}`)), corr: plListe(l.map(([a, b]) => `${rel(a)} ${R(a < b ? lt : gt)} ${rel(b)}`)) }; })() },
      { etoiles: 1, col: 1, consigne: 'Entoure le plus grand nombre.',
        ...ch([['−9 ou −2 :', '−2'], ['−15 ou 1 :', '1'], ['−3,4 ou −3,5 :', '−3,4'], ['−100 ou −99 :', '−99']], '−100 · −99 · −15 · −9 · −3,5 · −3,4 · −2 · 1') },
      { etoiles: 2, consigne: 'Range dans l\'ordre croissant : 3 ; −5 ; 0 ; −1,5 ; 7 ; −8 ; 2.',
        eleve: '<div style="text-align:center;line-height:2.4;">' + Array.from({ length: 7 }, () => B(2)).join(' &lt; ') + '</div>',
        corr: '<div style="text-align:center;line-height:2.4;">' + ['−8', '−5', '−1,5', '0', '2', '3', '7'].map(R).join(' &lt; ') + '</div>' },
      { etoiles: 2, consigne: 'Range dans l\'ordre décroissant : −2,1 ; −2,01 ; −12 ; 1,2 ; −0,2.',
        eleve: '<div style="text-align:center;line-height:2.4;">' + Array.from({ length: 5 }, () => B(2)).join(' &gt; ') + '</div>',
        corr: '<div style="text-align:center;line-height:2.4;">' + ['1,2', '−0,2', '−2,01', '−2,1', '−12'].map(R).join(' &gt; ') + '</div>' },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['−8 &lt; −3 :', 'vrai'], ['Entre deux nombres négatifs, le plus grand est celui qui a la plus grande distance à zéro :', 'faux'], ['Tout nombre négatif est plus petit que tout nombre positif :', 'vrai'], ['−0,5 &gt; −0,45 :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Donne tous les nombres entiers, dans l\'ordre croissant.',
        eleve: plListe(['compris strictement entre −3 et 1 : ' + B(2) + ' ; ' + B(2) + ' ; ' + B(2), 'compris strictement entre −6 et −2 : ' + B(2) + ' ; ' + B(2) + ' ; ' + B(2)]),
        corr: plListe(['compris strictement entre −3 et 1 : ' + R('−2') + ' ; ' + R('−1') + ' ; ' + R('0'), 'compris strictement entre −6 et −2 : ' + R('−5') + ' ; ' + R('−4') + ' ; ' + R('−3')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Températures minimales d\'une semaine : lundi −4 °C, mardi −7 °C, mercredi 1 °C, jeudi −2 °C, vendredi 0 °C. Range-les de la plus froide à la plus douce. Quel jour a-t-il fait le plus froid ?',
        corr: cm1Redac('Rangement', '−7 &lt; −4 &lt; −2 &lt; 0 &lt; 1', 'Le jour le plus froid est mardi (−7 °C).') },
    ] },
  { titre: 'Se repérer dans le plan', duree: '40 min',
    attendus: ['Lire les coordonnées d\'un point dans un repère', 'Placer un point de coordonnées données', 'Connaître l\'abscisse et l\'ordonnée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Lis les coordonnées des points A, B, C, D et E.',
        ...(() => { const P = [[3, 2, 'A'], [-2, 3, 'B'], [-4, -1, 'C'], [1, -3, 'D'], [0, 2, 'E']], r = repere(-5, 5, -4, 4, 25, (X, Y) => P.map(([x, y, n]) => pt(X, Y, x, y, n)).join(''));
          const l = f => `<div style="display:flex;gap:6px 18px;justify-content:center;flex-wrap:wrap;margin-top:6px;">${P.map(([x, y, n]) => `<span>${n} (${f(x)} ; ${f(y)})</span>`).join('')}</div>`;
          return { eleve: r.svg + l(() => B(2)), corr: r.svg + l(v => R(rel(v))) }; })() },
      { etoiles: 1, col: 1, consigne: 'Place les points F(4 ; −2), G(−3 ; −3), H(−1 ; 4), K(0 ; −1) et L(2 ; 0).',
        ...(() => { const P = [[4, -2, 'F'], [-3, -3, 'G'], [-1, 4, 'H'], [0, -1, 'K'], [2, 0, 'L']], r = repere(-5, 5, -4, 4, 25), rc = repere(-5, 5, -4, 4, 25, (X, Y) => P.map(([x, y, n]) => pt(X, Y, x, y, n, '#1F7A4D')).join(''));
          return { eleve: plX(r.svg, { t: 'pts', grille: r.grille, noms: P.map(p => p[2]), att: Object.fromEntries(P.map(([x, y, n]) => [n, [r.X(x), r.Y(y)]])) }), corr: rc.svg }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète avec abscisse ou ordonnée.',
        ...ch([['Dans M(5 ; −2), le nombre 5 est l\'… de M :', 'abscisse'], ['Dans M(5 ; −2), le nombre −2 est l\'… de M :', 'ordonnée'], ['Un point sur l\'axe des abscisses a une … nulle :', 'ordonnée'], ['Un point sur l\'axe des ordonnées a une … nulle :', 'abscisse']], 'abscisse · ordonnée') },
      { etoiles: 2, col: 1, consigne: 'Dans quelle zone est le point ? Entoure.',
        ...ch([['P(−3 ; 5) :', 'en haut à gauche'], ['Q(4 ; −1) :', 'en bas à droite'], ['S(−2 ; −6) :', 'en bas à gauche']], 'en haut à gauche · en haut à droite · en bas à gauche · en bas à droite') },
      { etoiles: 2, col: 1, consigne: 'On change le signe de l\'abscisse et de l\'ordonnée. Complète les coordonnées du nouveau point.',
        eleve: plListe(['M(3 ; −2) → M\'(' + B(1) + ' ; ' + B(1) + ')', 'N(−4 ; −1) → N\'(' + B(1) + ' ; ' + B(1) + ')', 'P(0 ; 5) → P\'(' + B(1) + ' ; ' + B(1) + ')']),
        corr: plListe(['M(3 ; −2) → M\'(' + R('−3') + ' ; ' + R('2') + ')', 'N(−4 ; −1) → N\'(' + R('4') + ' ; ' + R('1') + ')', 'P(0 ; 5) → P\'(' + R('0') + ' ; ' + R('−5') + ')']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un repère, place A(−2 ; 1), B(3 ; 1) et C(3 ; −2). Où placer D pour que ABCD soit un rectangle ? Donne ses coordonnées.',
        corr: cm1Redac('Point D', { suite: ['[AB] est horizontal et [BC] vertical.', 'D a la même abscisse que A et la même ordonnée que C.'] }, 'D(−2 ; −2).') },
    ] },
  { titre: 'Problèmes avec des nombres relatifs', duree: '35 min',
    attendus: ['Utiliser les relatifs pour des températures, des altitudes, des dates', 'Calculer un écart entre deux nombres relatifs', 'Interpréter un tableau de valeurs relatives'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule l\'écart de température (en degrés).',
        ...rmp([['De −3 °C à 5 °C : @', 8], ['De −10 °C à −4 °C : @', 6], ['De 2 °C à −6 °C : @', 8], ['De −15 °C à 0 °C : @', 15]], 2) },
      { etoiles: 2, col: 1, consigne: 'Altitudes.',
        ...rmp([['Un sous-marin à −120 m remonte de 45 m : il est à @ m', '−75'], ['Un avion à 900 m descend de 650 m : il est à @ m', '250'], ['Écart entre un sommet à 350 m et une grotte à −40 m : @ m', '390']], 3) },
      { etoiles: 2, col: 1, consigne: 'Frise chronologique (une année 0 n\'existe pas, mais on l\'ignore ici).',
        ...rmp([['Nombre d\'années de −50 à 30 : @', 80], ['Jules César est né en −100 et mort en −44. Il a vécu @ ans environ.', 56], ['De −753 (fondation de Rome) à 2026 : @ ans', 2779]], 4) },
      { etoiles: 2, col: 1, consigne: 'Compte en banque : entoure le solde le plus faible.',
        ...ch([['Lundi −35 € ou mardi −12 € :', 'lundi'], ['Mercredi 0 € ou jeudi −5 € :', 'jeudi'], ['Vendredi −100 € ou samedi 20 € :', 'vendredi']], 'lundi · mardi · mercredi · jeudi · vendredi · samedi') },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau des températures.',
        ...rmp([['Minimale −5 °C, maximale 3 °C : écart @ degrés', 8], ['Minimale −8 °C, écart 6 degrés : maximale @ °C', '−2'], ['Maximale 1 °C, écart 9 degrés : minimale @ °C', '−8'], ['Minimale −2,5 °C, maximale 4,5 °C : écart @ degrés', 7]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'À Moscou, il fait −18 °C ; à Paris, 25 degrés de plus ; à Madrid, 9 degrés de plus qu\'à Paris. Quelle température fait-il à Paris ? À Madrid ?',
        corr: cm1Redac('Températures', { suite: ['Paris : −18 + 25 = 7 °C', 'Madrid : 7 + 9 = 16 °C'] }, 'Il fait 7 °C à Paris et 16 °C à Madrid.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un jeu : on gagne 5 points par bonne réponse et on perd 3 points par erreur. Zoé part de 0, a 4 bonnes réponses et 9 erreurs. Quel est son score ?',
        corr: cm1Redac('Score', '4 × 5 − 9 × 3 = 20 − 27 = −7', 'Le score de Zoé est −7 points.') },
    ] },
];
})();

/* ============================================================
   4e · Planches : Triangles et parallèles (G1)
   Triangles égaux (cas d'égalité) ; théorème de Thalès dans le triangle (calculer une longueur) ;
   réciproque et contraposée (droites parallèles ou non) ; problèmes concrets.
   ============================================================ */
(() => {
const { R, F, T, ligne, rmp, ch, chx, geo, cote, Bl } = P3, Fr = plFrac();
const DS = PL_DESSINS, illu = plIllu;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const sur = (P, Q, t) => [P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t];
// Triangle ABC, M sur [AB], N sur [AC], (MN) // (BC) ; k = AM/AB.
const tri = (k, cotes, px) => { const A = [110, 12], B = [14, 150], C = [226, 150];
  return geo({ pts: { A, B, C, M: sur(A, B, k), N: sur(A, C, k) }, poly: [[['A', 'B', 'C']]], segs: [['A', 'B'], ['A', 'C'], ['B', 'C', { c: Bl, w: 2.4 }], ['M', 'N', { c: Bl, w: 2.4 }]], cotes: cotes || [], px: px || 190 }); };
// Deux triangles égaux à reconnaître.
const deuxTri = geo({ pts: { A: [10, 90], B: [90, 90], C: [40, 20], D: [130, 20], E: [210, 20], F: [180, 90] }, poly: [[['A', 'B', 'C'], '#EAF4FB'], [['D', 'E', 'F'], '#FDE3C8']], segs: [['A', 'B'], ['B', 'C'], ['C', 'A'], ['D', 'E'], ['E', 'F'], ['F', 'D']],
  marques: [['A', 'B', 1], ['D', 'E', 1], ['B', 'C', 2], ['E', 'F', 2]], arcs: [['A', 'B', 'C', ''], ['D', 'E', 'F', '']], px: 200 });
// Ombres : bâton et poteau électrique.
const ombre = (() => { const y = 96, X = 30, H = 76, S = [176, y], xp = S[0] - (S[0] - X) * 18 / H;
  return DS.fig(186, 128, DS.soleil(14, 10, 5) + DS.ln([X, y - H], S, '#E9A21C', 1.2, true) + DS.sol(4, 182, y) + `<rect x="${X - 3}" y="${y - H}" width="6" height="${H}" fill="#8A93A3"/><line x1="${X - 10}" y1="${y - H + 8}" x2="${X + 10}" y2="${y - H + 8}" stroke="#8A93A3" stroke-width="2"/>`
    + DS.ln([xp, y], [xp, y - 18], '#A0622D', 3) + DS.tx([xp - 4, y - 6], '1 m', { a: 'end', fs: 10 }) + DS.cote([xp, y], S, '1,5 m', -9, { dt: 7 }) + DS.cote([X, y], S, '9 m', -24, { dt: 7 }) + DS.tx([X + 7, y - H / 2], '?', { a: 'start', c: '#2E9C6A' }), 165); })();
// Toboggan : poutre de renfort (MN) parallèle au sol.
const toboggan = (() => { const A = [30, 14], B = [30, 112], C = [170, 112], M = sur(A, B, .6), N = sur(A, C, .6);
  return DS.fig(186, 130, DS.sol(10, 182, 112) + DS.ln(A, B, '#A0622D', 4) + DS.ln(A, C, '#E35D3A', 5) + DS.ln(M, N, '#2EA8C9', 3) + DS.droit(A, B, C)
    + DS.pt(A, 'A', [-9, 2]) + DS.pt(B, 'B', [-9, 4]) + DS.pt(C, 'C', [6, 14]) + DS.pt(M, 'M', [-11, 4]) + DS.pt(N, 'N', [6, -4]), 155); })();
PLANCHES['4e|Triangles et parallèles'] = [
  { titre: 'Triangles égaux', duree: '30 min',
    attendus: ['Connaître les trois cas d\'égalité des triangles', 'Reconnaître deux triangles égaux', 'Utiliser l\'égalité pour trouver une longueur ou un angle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quel cas d\'égalité permet de conclure ? Entoure.',
        ...chx([['AB = DE, BC = EF et AC = DF :', 'trois côtés', 'trois côtés · deux côtés et l\'angle compris · un côté et deux angles'], ['AB = DE, AC = DF et Â = D̂ :', 'deux côtés et l\'angle compris', 'trois côtés · deux côtés et l\'angle compris · un côté et deux angles'], ['BC = EF, B̂ = Ê et Ĉ = F̂ :', 'un côté et deux angles', 'trois côtés · deux côtés et l\'angle compris · un côté et deux angles']]) },
      { etoiles: 2, col: 1, consigne: 'Ces deux triangles sont-ils forcément égaux ? Entoure.',
        ...ch([['Côtés 4 cm, 5 cm, 6 cm et côtés 6 cm, 4 cm, 5 cm :', 'oui'], ['Tous deux ont des angles de 50°, 60° et 70° :', 'non'], ['AB = 3, BC = 7, B̂ = 40° et DE = 3, EF = 7, Ê = 40° :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Les codages indiquent les égalités. Les triangles ABC et DEF sont égaux.',
        ...fig(deuxTri, [['Cas d\'égalité utilisé : @', 'deux côtés et l\'angle compris'], ['Le côté homologue de [AC] est @', '[DF]'], ['Si AC = 5,2 cm, alors DF = @ cm', '5,2']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Deux triangles égaux ont la même aire.', 'vrai'], ['Deux triangles qui ont les mêmes angles sont égaux.', 'faux'], ['Deux triangles égaux ont le même périmètre.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'ABCD est un parallélogramme. Justifie que les triangles ABC et CDA sont égaux.',
        corr: cm1Redac('Égalités', { suite: ['Dans un parallélogramme, les côtés opposés ont la même longueur : AB = CD et BC = DA.', 'Le côté [AC] est commun aux deux triangles.'] }, 'Les triangles ABC et CDA ont leurs trois côtés égaux deux à deux : ils sont égaux.') },
    ] },
  { titre: 'Le théorème de Thalès : calculer une longueur', duree: '35 min',
    attendus: ['Reconnaître la configuration de Thalès', 'Écrire l\'égalité des trois rapports', 'Calculer une longueur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'M ∈ [AB], N ∈ [AC] et (MN) // (BC). Complète l\'égalité des rapports.',
        ...fig(tri(.45, [], 170), [[`${T('AM', 'AB')} = ${T('AN', '?')} = ${T('?', 'BC')} : on complète par @ et @`, 'AC', 'MN']]) },
      { etoiles: 2, col: 1, consigne: '(MN) // (BC), AM = 3 cm, AB = 5 cm, AC = 7,5 cm et BC = 6 cm.',
        ...fig(tri(.6, [['A', 'M', '3', -1], ['B', 'C', '6', -1]], 170), [['AN = @ cm', '4,5'], ['MN = @ cm', '3,6']]) },
      { etoiles: 2, col: 1, consigne: '(MN) // (BC), AN = 4 cm, AC = 10 cm et BC = 12 cm.',
        ...rmp([[`${T('AN', 'AC')} = ${T(4, 10)} = @ (écriture décimale)`, '0,4'], ['MN = @ cm', '4,8']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon calcul de MN, sachant que (MN) // (BC), AM = 2, AB = 8 et BC = 6.',
        ...chx([['MN =', '6 × 2 : 8', '6 × 2 : 8 · 6 × 8 : 2 · 8 × 2 : 6']]) },
      { etoiles: 3, cahier: true, consigne: 'Dans le triangle RST, U ∈ [RS] et V ∈ [RT], avec (UV) // (ST). RU = 6 cm, RS = 9 cm et UV = 4 cm. Calcule ST. Rédige.',
        corr: cm1Redac('Thalès', { suite: [`U ∈ [RS], V ∈ [RT] et (UV) // (ST), donc ${F('RU', 'RS')} = ${F('RV', 'RT')} = ${F('UV', 'ST')}`, `${F(6, 9)} = ${F(4, 'ST')}`, 'ST = 9 × 4 : 6 = 6'] }, 'ST mesure 6 cm.') },
    ] },
  { titre: 'Droites parallèles ou non', duree: '35 min',
    attendus: ['Comparer deux rapports', 'Utiliser la réciproque du théorème de Thalès', 'Prouver que deux droites ne sont pas parallèles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces deux rapports sont-ils égaux ? Entoure (utilise les produits en croix).',
        ...ch([[`${T(3, 5)} et ${T('4{,}5', '7{,}5')} :`, 'oui'], [`${T(2, 7)} et ${T(3, 10)} :`, 'non'], [`${T(6, 8)} et ${T(9, 12)} :`, 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'M ∈ [AB] et N ∈ [AC]. Les droites (MN) et (BC) sont-elles parallèles ? Entoure.',
        ...ch([['AM = 2, AB = 5, AN = 3, AC = 7,5 :', 'oui'], ['AM = 3, AB = 8, AN = 4, AC = 10 :', 'non'], ['AM = 1,5, AB = 6, AN = 2, AC = 8 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Complète le raisonnement : AM = 4, AB = 6, AN = 5, AC = 7,5 (M ∈ [AB], N ∈ [AC]).',
        eleve: plListe([ligne(`${T('AM', 'AB')} = ${T(4, 6)} = ${T(2, 3)} et ${T('AN', 'AC')} = ${T(5, '7{,}5')} =`, Fr), 'Les rapports sont égaux et les points sont dans le même ordre : les droites (MN) et (BC) sont ' + P3.B(6)]),
        corr: plListe([ligne(`${T('AM', 'AB')} = ${T(4, 6)} = ${T(2, 3)} et ${T('AN', 'AC')} = ${T(5, '7{,}5')} =`, R(F(2, 3))), 'Les rapports sont égaux et les points sont dans le même ordre : les droites (MN) et (BC) sont ' + R('parallèles')]) },
      { etoiles: 3, cahier: true, consigne: 'Dans le triangle EFG, H ∈ [EF] et K ∈ [EG]. EH = 3,5 cm, EF = 5 cm, EK = 4 cm et EG = 6 cm. Les droites (HK) et (FG) sont-elles parallèles ? Rédige.',
        corr: cm1Redac('Rapports', { suite: [`${F('EH', 'EF')} = ${F('3{,}5', 5)} = 0,7`, `${F('EK', 'EG')} = ${F(4, 6)} ≈ 0,67`] }, 'Les rapports ne sont pas égaux : d\'après le théorème de Thalès, les droites (HK) et (FG) ne sont pas parallèles.') },
      { etoiles: 3, cahier: true, consigne: 'Dans le triangle ABC, M ∈ [AB] et N ∈ [AC]. AM = 2,4 cm, AB = 6 cm, AN = 3 cm et AC = 7,5 cm. Prouve que (MN) // (BC).',
        corr: cm1Redac('Rapports', { suite: [`${F('AM', 'AB')} = ${F('2{,}4', 6)} = 0,4`, `${F('AN', 'AC')} = ${F(3, '7{,}5')} = 0,4`] }, 'Les rapports sont égaux et les points A, M, B et A, N, C sont alignés dans le même ordre : d\'après la réciproque du théorème de Thalès, (MN) // (BC).') },
    ] },
  { titre: 'Problèmes avec le théorème de Thalès', duree: '40 min',
    attendus: ['Reconnaître une configuration de Thalès dans une situation concrète', 'Calculer une longueur inaccessible', 'Rédiger la solution'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le théorème de Thalès permet de calculer une longueur.', 'vrai'], ['Sa réciproque permet de prouver que deux droites sont parallèles.', 'vrai'], ['Il faut un angle droit pour utiliser le théorème de Thalès.', 'faux']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: illu(ombre, 'Au même moment, un bâton vertical de 1 m a une ombre de 1,5 m et un poteau électrique a une ombre de 9 m. Les rayons du soleil sont parallèles. Quelle est la hauteur du poteau ?'),
        corr: cm1Redac('Thalès', { suite: [`${F('h', 1)} = ${F(9, '1{,}5')}`, 'h = 9 : 1,5 = 6'] }, 'Le poteau mesure 6 m de haut.') },
      { etoiles: 3, cahier: true, consigne: illu(toboggan, 'Sur ce toboggan, le montant [AB] est vertical et le sol (BC) horizontal. Une barre de renfort [MN] est parallèle au sol. AB = 2,5 m, BC = 4 m et AM = 1,5 m. Calcule la longueur de la barre MN.'),
        corr: cm1Redac('Thalès', { suite: [`M ∈ [AB], N ∈ [AC] et (MN) // (BC), donc ${F('AM', 'AB')} = ${F('MN', 'BC')}`, `${F('1{,}5', '2{,}5')} = ${F('MN', 4)}`, 'MN = 4 × 1,5 : 2,5 = 2,4'] }, 'La barre mesure 2,4 m.') },
      { etoiles: 3, cahier: true, consigne: 'Pour estimer la largeur d\'une route, Lina repère les points A, M, B alignés sur un bord, et A, N, C alignés, avec (MN) // (BC). AM = 4 m, MB = 6 m et MN = 3 m. Calcule BC.',
        corr: cm1Redac('Thalès', { suite: ['AB = AM + MB = 4 + 6 = 10 m', `${F('AM', 'AB')} = ${F('MN', 'BC')}, soit ${F(4, 10)} = ${F(3, 'BC')}`, 'BC = 10 × 3 : 4 = 7,5'] }, 'BC mesure 7,5 m.') },
    ] },
];
})();

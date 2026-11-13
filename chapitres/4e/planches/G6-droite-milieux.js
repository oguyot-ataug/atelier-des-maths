/* ============================================================
   4e · Planches : Droite des milieux (G6) -- nouveau programme (rentrée 2027), écrites le 13/11/2026.
   Reconnaître le théorème ; calculer des longueurs ; démontrer (parallèles, milieu) ; problèmes et défi (Varignon).
   ============================================================ */
(() => {
const { rmp, ch, chx, geo } = P3;
const F = cm1Frac;
// Triangle ABC (ou autres noms) ; mil : [[sommet1, sommet2, nom du milieu, n traits]] ; par : [[P, Q]] droite (PQ) prolongée en orange.
const triM = (o) => {
  const [a, b, c] = o.noms || ['A', 'B', 'C'], P = {}; P[a] = o.A || [96, 12]; P[b] = o.B || [14, 132]; P[c] = o.C || [214, 132];
  const segs = [[a, b], [b, c], [a, c]], marques = [];
  (o.mil || []).forEach(([u, v, m, n]) => { P[m] = [(P[u][0] + P[v][0]) / 2, (P[u][1] + P[v][1]) / 2]; marques.push([u, m, n], [m, v, n]); });
  (o.pts || []).forEach(([m, u, v, k]) => { P[m] = [P[u][0] + (P[v][0] - P[u][0]) * k, P[u][1] + (P[v][1] - P[u][1]) * k]; });
  (o.par || []).forEach(([u, v]) => { segs.push([u, v, { c: '#E35D3A', w: 2.2 }]); });
  return geo({ pts: P, segs, marques, cotes: o.cotes || [], px: o.px || 180 });
};
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const TH = 'D\'après le théorème de la droite des milieux,';
const illu = plIllu;
// Triangle S, A, B avec les milieux M et N de [SA] et [SB] ; cotes : [[P, Q, texte, côté]].
const triSAB = (cotes, px) => triM({ noms: ['S', 'A', 'B'], A: [70, 10], B: [14, 132], C: [126, 132], mil: [['S', 'A', 'M', 1], ['S', 'B', 'N', 2]], par: [['M', 'N']], cotes, px: px || 120 });
// Quadrilatère ABCD et ses milieux I, J, K, L (parallélogramme de Varignon en orange).
const varignon = (px) => { const P = { A: [40, 14], B: [10, 120], C: [190, 136], D: [150, 20] }, m = (u, v) => [(P[u][0] + P[v][0]) / 2, (P[u][1] + P[v][1]) / 2];
  P.I = m('A', 'B'); P.J = m('B', 'C'); P.K = m('C', 'D'); P.L = m('D', 'A');
  return geo({ pts: P, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['I', 'J', { c: '#E35D3A' }], ['J', 'K', { c: '#E35D3A' }], ['K', 'L', { c: '#E35D3A' }], ['L', 'I', { c: '#E35D3A' }], ['A', 'C', { d: true, c: '#8A93A3', w: 1.4 }]],
    marques: [['A', 'I', 1], ['I', 'B', 1], ['B', 'J', 2], ['J', 'C', 2], ['C', 'K', 3], ['K', 'D', 3]], px: px || 170 }); };
PLANCHES['4e|Droite des milieux'] = [
  { titre: 'Les trois théorèmes de la droite des milieux', duree: '25 min',
    attendus: ['Reconnaître les hypothèses de chaque théorème', 'Conclure au parallélisme, à une longueur ou à un milieu'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'I est le milieu de [AB] et J est le milieu de [AC]. Complète.',
        ...fig(triM({ mil: [['A', 'B', 'I', 1], ['A', 'C', 'J', 2]], par: [['I', 'J']], px: 170 }), [['(IJ) est parallèle à @', '(BC)'], ['BC = @ × IJ', 2]]) },
      { etoiles: 1, col: 1, consigne: 'K est le milieu de [EF] et (KL) est parallèle à (FG). Complète.',
        ...fig(triM({ noms: ['E', 'F', 'G'], mil: [['E', 'F', 'K', 1]], pts: [['L', 'E', 'G', .5]], par: [['K', 'L']], px: 170 }), [['L est le milieu de @', '[EG]'], ['EL = @', 'LG']]) },
      { etoiles: 2, consigne: 'Dans un triangle ABC, entoure ce que l\'on peut conclure.',
        ...chx([['I milieu de [AB] et J milieu de [AC] :', '(IJ) // (BC)', '(IJ) // (BC) · (IJ) ⊥ (BC) · IJ = BC'],
                ['M milieu de [AB], N sur [AC] et (MN) // (BC) :', 'N milieu de [AC]', 'N milieu de [AC] · MN = BC · (MN) ⊥ (AC)'],
                ['I milieu de [BC] et J milieu de [AC] :', '(IJ) // (AB)', '(IJ) // (AB) · (IJ) // (BC) · IJ = AB'],
                ['K milieu de [AB] et L milieu de [BC], KL = 3 cm :', 'AC = 6 cm', 'AC = 1,5 cm · AC = 3 cm · AC = 6 cm']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une droite qui passe par deux milieux de côtés d\'un triangle est parallèle au troisième côté.', 'vrai'],
               ['Une droite qui passe par le milieu d\'un côté est parallèle à un autre côté.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le segment qui joint deux milieux mesure le double du troisième côté.', 'faux'],
               ['Le segment qui joint deux milieux mesure la moitié du troisième côté.', 'vrai']], 'vrai · faux') },
    ] },
  { titre: 'Calculer des longueurs', duree: '30 min',
    attendus: ['Calculer la longueur du segment qui joint deux milieux', 'Calculer la longueur du troisième côté', 'Rédiger le calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'I et J sont les milieux de [AB] et [AC]. Complète.',
        ...rmp([['BC = 10 cm : IJ = @ cm', 5], ['BC = 7 cm : IJ = @ cm', '3,5'], ['BC = 13 cm : IJ = @ cm', '6,5']]) },
      { etoiles: 1, col: 1, consigne: 'I et J sont les milieux de [AB] et [AC]. Complète.',
        ...rmp([['IJ = 4 cm : BC = @ cm', 8], ['IJ = 2,6 cm : BC = @ cm', '5,2'], ['IJ = 7,5 cm : BC = @ cm', 15]]) },
      { etoiles: 1, col: 1, consigne: 'Lis la figure et complète.',
        ...fig(triM({ mil: [['A', 'B', 'I', 1], ['A', 'C', 'J', 2]], par: [['I', 'J']], cotes: [['B', 'C', '9,6 cm', -1]], px: 170 }), [['IJ = @ cm', '4,8']]) },
      { etoiles: 1, col: 1, consigne: 'Lis la figure et complète.',
        ...fig(triM({ noms: ['R', 'S', 'T'], mil: [['R', 'S', 'U', 1], ['R', 'T', 'V', 2]], par: [['U', 'V']], cotes: [['U', 'V', '5,5 cm', -1]], px: 170 }), [['ST = @ cm', 11]]) },
      { etoiles: 2, cahier: true, consigne: 'Dans le triangle EFG, K est le milieu de [EF] et L est le milieu de [EG]. FG = 11 cm. Calcule la longueur KL. Rédige.',
        corr: cm1Redac('Droite des milieux', { suite: ['Dans le triangle EFG, K est le milieu de [EF] et L est le milieu de [EG].', TH] }, '')
          + cm1Redac('Longueur KL', { nom: 'KL', lignes: [F('FG', 2), F(11, 2), '5,5'] }, 'KL mesure 5,5 cm.') },
      { etoiles: 2, cahier: true, consigne: 'Dans le triangle RST, M est le milieu de [RS] et N est le milieu de [RT]. MN = 4,3 cm. Calcule la longueur ST. Rédige.',
        corr: cm1Redac('Droite des milieux', { suite: ['Dans le triangle RST, M est le milieu de [RS] et N est le milieu de [RT].', TH + ' MN est la moitié de ST.'] }, '')
          + cm1Redac('Longueur ST', { nom: 'ST', lignes: ['2 × MN', '2 × 4,3', '8,6'] }, 'ST mesure 8,6 cm.') },
    ] },
  { titre: 'Démontrer avec la droite des milieux', duree: '35 min',
    attendus: ['Démontrer que deux droites sont parallèles', 'Démontrer qu\'un point est le milieu d\'un segment', 'Enchaîner deux théorèmes'],
    exos: [
      { etoiles: 1, consigne: 'Complète la démonstration : I est le milieu de [AB] et J est le milieu de [BC].',
        ...fig(triM({ mil: [['A', 'B', 'I', 1], ['B', 'C', 'J', 2]], par: [['I', 'J']], px: 170 }),
          [['Dans le triangle @, I est le milieu de @ et J est le milieu de @.', 'ABC', '[AB]', '[BC]'], ['D\'après le théorème de la @, (IJ) // @.', 'droite des milieux', '(AC)']]) },
      { etoiles: 2, cahier: true, consigne: 'DEF est un triangle. M est le milieu de [DE]. La parallèle à (EF) passant par M coupe [DF] en N. Démontre que N est le milieu de [DF].',
        corr: cm1Redac('Démonstration', { suite: ['Dans le triangle DEF, M est le milieu de [DE] et (MN) // (EF).', TH + ' (MN) coupe [DF] en son milieu.'] }, 'N est le milieu de [DF].') },
      { etoiles: 3, cahier: true, consigne: 'ABC est un triangle tel que BC = 9 cm. I est le milieu de [AB]. La parallèle à (BC) passant par I coupe [AC] en J. Démontre que J est le milieu de [AC], puis calcule IJ.',
        corr: cm1Redac('Démonstration', { suite: ['Dans le triangle ABC, I est le milieu de [AB] et (IJ) // (BC).', TH + ' (IJ) coupe [AC] en son milieu.'] }, 'J est le milieu de [AC].')
          + cm1Redac('Longueur IJ', { nom: 'IJ', lignes: [F('BC', 2), F(9, 2), '4,5'] }, 'I et J sont les milieux de [AB] et [AC] : d\'après le théorème de la droite des milieux, IJ mesure 4,5 cm.') },
      { etoiles: 3, cahier: true, consigne: 'ABCD est un rectangle de centre O. I est le milieu de [AB]. Démontre que (OI) est parallèle à (BC).',
        corr: cm1Redac('Démonstration', { suite: ['Les diagonales d\'un rectangle ont le même milieu : O est le milieu de [AC].', 'Dans le triangle ABC, I est le milieu de [AB] et O est le milieu de [AC].', TH] }, '(OI) // (BC).') },
    ] },
  { titre: 'Problèmes', duree: '35 min',
    attendus: ['Repérer un triangle et des milieux dans une situation', 'Choisir le théorème utile', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 2, cahier: true, consigne: illu(triSAB([['A', 'B', '1,20 m', -1]]), 'Une échelle double a deux montants de même longueur, [SA] et [SB]. Une barre [MN] relie les milieux des montants. Les pieds A et B sont à 1,20 m l\'un de l\'autre. Calcule la longueur de la barre et démontre qu\'elle est parallèle au sol (AB).'),
        corr: cm1Redac('Droite des milieux', { suite: ['Dans le triangle SAB, M est le milieu de [SA] et N est le milieu de [SB].', TH + ' (MN) // (AB).'] }, 'La barre est parallèle au sol.')
          + cm1Redac('Longueur de la barre', { nom: 'MN', lignes: [F('AB', 2), F('1{,}20', 2), '0,60'] }, 'La barre mesure 0,60 m.') },
      { etoiles: 2, cahier: true, consigne: illu(triSAB([['M', 'N', '23 m', 1], ['A', 'B', '?', -1]]), 'Pour mesurer la largeur AB d\'un étang, Léo plante un piquet S, puis place M au milieu de [SA] et N au milieu de [SB]. Il mesure MN = 23 m. Quelle est la largeur AB de l\'étang ?'),
        corr: cm1Redac('Droite des milieux', { suite: ['Dans le triangle SAB, M est le milieu de [SA] et N est le milieu de [SB].', TH + ' MN est la moitié de AB.'] }, '')
          + cm1Redac('Largeur de l\'étang', { nom: 'AB', lignes: ['2 × MN', '2 × 23', '46'] }, 'L\'étang mesure 46 m de large.') },
      { etoiles: 3, cahier: true, consigne: 'ABC est un triangle tel que AB = 7 cm, BC = 9 cm et AC = 12 cm. I, J et K sont les milieux de [AB], [BC] et [AC]. Calcule le périmètre du triangle IJK.',
        corr: cm1Redac('Droite des milieux', { suite: ['Dans le triangle ABC, chaque côté du triangle IJK joint deux milieux.', TH + ' chacun mesure la moitié d\'un côté de ABC.'] }, '')
          + plCote(cm1Redac('Longueur IJ', { nom: 'IJ', lignes: [F('AC', 2), F(12, 2), '6'] }, ''),
            cm1Redac('Longueur JK', { nom: 'JK', lignes: [F('AB', 2), F(7, 2), '3,5'] }, ''),
            cm1Redac('Longueur IK', { nom: 'IK', lignes: [F('BC', 2), F(9, 2), '4,5'] }, ''))
          + cm1Redac('Périmètre du triangle IJK', { nom: 'P', lignes: ['6 + 3,5 + 4,5', '14'] }, 'Le périmètre du triangle IJK est 14 cm, la moitié de celui de ABC.') },
    ] },
  { titre: 'Défi : le parallélogramme de Varignon', duree: '30 min',
    attendus: ['Repérer deux triangles dans un quadrilatère', 'Enchaîner deux fois le théorème', 'Conclure avec une propriété des parallélogrammes'],
    exos: [
      { etoiles: 3, cahier: true, consigne: illu(varignon(), 'Défi (théorème de Varignon). ABCD est un quadrilatère. I, J, K et L sont les milieux de [AB], [BC], [CD] et [DA]. Démontre que IJKL est un parallélogramme. Aide : utilise la diagonale [AC], en pointillés.'),
        corr: plCote(cm1Redac('Triangle ABC', { suite: ['I et J sont les milieux de [AB] et [BC].', TH + ' (IJ) // (AC) et IJ est la moitié de AC.'] }, ''),
          cm1Redac('Triangle ACD', { suite: ['L et K sont les milieux de [AD] et [CD].', TH + ' (LK) // (AC) et LK est la moitié de AC.'] }, ''))
          + cm1Redac('Conclusion', { suite: ['(IJ) // (LK) et IJ = LK.'] }, 'IJKL a deux côtés opposés parallèles et de même longueur : c\'est un parallélogramme.') },
      { etoiles: 2, consigne: 'Sur la figure du défi, les diagonales du quadrilatère ABCD mesurent AC = 10 cm et BD = 6 cm. Complète.',
        ...rmp([['IJ = @ cm', 5], ['JK = @ cm', 3], ['KL = @ cm', 5], ['LI = @ cm', 3], ['Périmètre de IJKL : @ cm', 16], ['Ce périmètre est égal à AC + BD : @ cm', 16]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Défi. ABCD est un rectangle. I, J, K et L sont les milieux de [AB], [BC], [CD] et [DA]. Démontre que IJKL est un losange. Aide : utilise les deux diagonales du rectangle.',
        corr: plCote(cm1Redac('Triangle ABC', { suite: ['I et J sont les milieux de [AB] et [BC].', TH + ' IJ est la moitié de AC.'] }, ''),
          cm1Redac('Triangle ABD', { suite: ['I et L sont les milieux de [AB] et [AD].', TH + ' IL est la moitié de BD.'] }, ''))
          + cm1Redac('Conclusion', { suite: ['Les diagonales d\'un rectangle ont la même longueur : AC = BD, donc IJ = IL.', 'De même, JK et KL sont la moitié de BD et de AC.'] }, 'Les quatre côtés de IJKL ont la même longueur : IJKL est un losange.') },
    ] },
];
})();

/* ============================================================
   CM2 · Planches : Programmes de construction (G3)
   Lire et suivre un programme ; vocabulaire des instructions ; écrire un programme.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const { K, RO, VE, BL, svg, L, P, X, Q, carte, droit } = CM2G;
const C = (c, r, col) => `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="none" stroke="${col || BL}" stroke-width="1.8"/>`;
// Trois figures pour un même programme (carré, diagonales, cercle).
const sq = [[30, 25], [90, 25], [90, 85], [30, 85]];
const FIGS = [
  svg(120, 110, P(sq, K, 2) + C([60, 55], 30) + L(sq[0], sq[2], K, 1.4) + L(sq[1], sq[3], K, 1.4), 110),
  svg(120, 110, P(sq, K, 2) + C([60, 55], 42.4) + L(sq[0], sq[2], K, 1.4) + L(sq[1], sq[3], K, 1.4), 110),
  svg(120, 110, P(sq, K, 2) + C([60, 55], 42.4) + L([60, 25], [60, 85], K, 1.4) + L([30, 55], [90, 55], K, 1.4), 110),
];
// Sur quadrillage : A et B donnés.
const q1 = sol => Q(10, 7, 20, g => (sol ? L(g(2, 5), g(7, 5), VE, 2.4) + L(g(7, 5), g(7, 2), VE, 2.4) + L(g(2, 5), g(7, 2), VE, 2.4) + droit(g(2, 5), g(7, 5), g(7, 2), VE) + X(g(7, 2), 'C', [9, -4], VE) : '') + X(g(2, 5), 'A', [-8, 12]) + X(g(7, 5), 'B', [8, 12]), 200);
const q2 = sol => Q(10, 8, 20, g => L(g(1, 4), g(4, 1), K, 2) + L(g(4, 1), g(7, 4), K, 2)
  + (sol ? L(g(7, 4), g(4, 7), VE, 2.4) + L(g(4, 7), g(1, 4), VE, 2.4) + X(g(4, 7), 'D', [12, 4], VE) : '') + X(g(1, 4), 'A', [-9, 4]) + X(g(4, 1), 'B', [0, -8]) + X(g(7, 4), 'C', [9, 4]), 200);
// Figure à décrire : carré ABCD et cercle de centre A passant par B.
const ABCD = [[80, 80], [150, 80], [150, 150], [80, 150]];
const figProg = svg(200, 200, `<circle cx="80" cy="80" r="70" fill="none" stroke="${BL}" stroke-width="1.8"/>` + P(ABCD, K, 2) + ABCD.map((p, i) => X(p, 'ABCD'[i], [[-9, -6], [10, -6], [10, 12], [-10, 12]][i])).join(''), 150);
const rectDiag = svg(190, 120, P([[20, 20], [170, 20], [170, 100], [20, 100]], K, 2) + L([20, 20], [170, 100], K, 1.5) + L([170, 20], [20, 100], K, 1.5)
  + X([20, 20], 'E', [-8, -4]) + X([170, 20], 'F', [8, -4]) + X([170, 100], 'G', [8, 12]) + X([20, 100], 'H', [-8, 12]) + X([95, 60], 'O', [0, 16]), 180);
PLANCHES['cm2|Programmes de construction'] = [
  { titre: 'Lire un programme de construction', duree: '30 min',
    attendus: ['Comprendre le vocabulaire d\'un programme', 'Associer un programme à une figure', 'Choisir le bon instrument'],
    exos: [
      { etoiles: 1, consigne: `Programme : « Trace un carré. Trace ses deux diagonales. Trace le cercle dont le centre est le point où se coupent les diagonales et qui passe par les quatre sommets du carré. » Quelle figure correspond ?${plGrille(FIGS.map((f, i) => carte(f, '<b>' + (i + 1) + '</b>')), 3)}`,
        ...chx([['La figure qui correspond est la figure', '2', '1 · 2 · 3']]) },
      { etoiles: 1, col: 1, consigne: 'Entoure l\'instrument qui convient.',
        ...chx([['Tracer un cercle :', 'compas', 'règle · équerre · compas'], ['Tracer un angle droit :', 'équerre', 'règle · équerre · compas'], ['Tracer un segment de 5 cm :', 'règle', 'règle · équerre · compas']]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec le bon mot.',
        ...rmp([['Le point où deux droites se coupent est leur point d\'@.', 'intersection'], ['Le @ du segment [AB] est le point de [AB] situé à égale distance de A et de B.', 'milieu'], ['[AB] et [AC] ont la même longueur : on dit que A est à égale @ de B et de C.', 'distance']], 4) },
      { etoiles: 3, cahier: true, consigne: 'Suis ce programme sur une feuille blanche : « Trace un segment [AB] de 6 cm. Place son milieu I. Trace le cercle de centre I qui passe par A. Place un point C sur ce cercle. Trace le triangle ABC. » Avec ton équerre, que remarques-tu pour l\'angle en C ?',
        corr: cm1Redac('Construction', { suite: ['AI = 3 cm : le cercle de centre I a pour rayon 3 cm.', 'Il passe par A et par B, car [AB] est un diamètre.'] }, 'Où que soit le point C sur le cercle, l\'angle en C est un angle droit : le triangle ABC est rectangle en C.') },
    ] },
  { titre: 'Suivre un programme sur quadrillage', duree: '30 min',
    attendus: ['Suivre un programme pas à pas', 'Utiliser le quadrillage pour tracer des perpendiculaires', 'Construire un triangle avec le compas'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Trace le segment [AB]. Trace la perpendiculaire à [AB] passant par B. Place le point C sur cette droite, 3 carreaux au-dessus de B. Trace le triangle ABC.', eleve: q1(false), corr: q1(true) },
      { etoiles: 2, col: 1, consigne: 'Place le point D pour que ABCD soit un carré (ses côtés suivent les diagonales des carreaux). Trace le carré.', eleve: q2(false), corr: q2(true) },
      { etoiles: 3, cahier: true, consigne: 'Suis ce programme : « Trace un segment [EF] de 5 cm. Trace le cercle de centre E et de rayon 3 cm, puis le cercle de centre F et de rayon 4 cm. Ils se coupent en deux points ; appelle G l\'un d\'eux. Trace le triangle EFG. » Vérifie l\'angle en G avec ton équerre.',
        corr: cm1Redac('Le triangle EFG', { suite: ['EF = 5 cm', 'EG = 3 cm (rayon du premier cercle)', 'FG = 4 cm (rayon du deuxième cercle)'] }, 'L\'angle en G est un angle droit : EFG est un triangle rectangle en G.') },
    ] },
  { titre: 'Écrire un programme de construction', duree: '35 min',
    attendus: ['Décrire une figure avec le vocabulaire précis', 'Écrire les étapes dans l\'ordre', 'Vérifier un programme en le faisant suivre'],
    exos: [
      { etoiles: 2, consigne: `Complète le programme de construction de cette figure.<div style="text-align:center;">${figProg}</div>`,
        ...rmp([['Trace un @ ABCD de 4 cm de côté.', 'carré'], ['Trace le @ de centre A et de rayon 4 cm.', 'cercle'], ['Ce cercle passe par les sommets @ et @.', 'B', 'D']], 4) },
      { etoiles: 3, cahier: true, consigne: plIllu(rectDiag, 'Écris le programme de construction de cette figure : EFGH est un rectangle de 6 cm sur 3 cm ; O est le point d\'intersection de ses diagonales.'),
        corr: cm1Redac('Programme', { suite: ['Trace un rectangle EFGH de 6 cm de longueur et 3 cm de largeur.', 'Trace ses diagonales [EG] et [FH].', 'Place le point O, intersection des diagonales.'] }, 'On vérifie en faisant suivre le programme à un camarade.') },
      { etoiles: 3, cahier: true, consigne: 'Dessine une figure simple (avec un carré, un cercle ou un triangle), écris son programme, puis donne-le à ton voisin sans lui montrer ta figure. Comparez.',
        corr: cm1Redac('Pour réussir', { suite: ['Nommer chaque point.', 'Donner les longueurs.', 'Écrire les étapes dans l\'ordre du tracé.'] }, 'Si les deux figures sont pareilles, le programme est précis.') },
    ] },
];
})();

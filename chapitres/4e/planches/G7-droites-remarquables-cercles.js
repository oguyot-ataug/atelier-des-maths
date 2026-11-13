/* ============================================================
   4e · Planches : Droites remarquables et cercles (G7) -- nouveau programme (rentrée 2027), écrites le 13/11/2026.
   Droites remarquables et cercle circonscrit ; triangle rectangle et cercle ; diagonales des parallélogrammes
   particuliers et rectangle sans équerre ; problèmes. Constructions des corrigés aux instruments du site (plConstruction).
   ============================================================ */
(() => {
const { rmp, ch, chx } = P3;
const F = cm1Frac, illu = plIllu;
const CPT = (p, nom, dx, dy, c) => ({ pt: p, nom, dx, dy, c });
// Triangle AB = 6 cm, AC = 4 cm, BC = 5 cm (1 cm = 20 px), puis son cercle circonscrit (médiatrices au compas).
const CIRCONSCRIT = (() => { const A = [40, 130], B = [160, 130], C = [85, 130 - Math.sqrt(16 - 2.25 * 2.25) * 20], O = dr4O(A, B, C), r = dr4D(O, A);
  const med = (P, Q, k) => { const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], n = [-(Q[1] - P[1]), Q[0] - P[0]], l = Math.hypot(...n); return { seg: [[M[0] - n[0] / l * k, M[1] - n[1] / l * k], [M[0] + n[0] / l * k, M[1] + n[1] / l * k]], c: '#E07B00', ep: 1.5 }; };
  return plConstruction({ programme: [{"op": "point", "name": "A"}, {"op": "segment_length", "from": "A", "to": "B", "length": 6}, {"op": "circle", "id": "cA", "center": "A", "radius": 4}, {"op": "circle", "id": "cB", "center": "B", "radius": 5}, {"op": "intersect", "name": "C", "of": ["cA", "cB"], "pick": "up"}, {"op": "segment", "from": "A", "to": "C"}, {"op": "segment", "from": "B", "to": "C"},
      {"op": "perpendicular_bisector", "id": "m1", "of": ["A", "B"], "color": "orange"}, {"op": "perpendicular_bisector", "id": "m2", "of": ["B", "C"], "color": "orange"}, {"op": "intersect", "name": "O", "of": ["m1", "m2"]}, {"op": "circle", "id": "cO", "center": "O", "radius_from": ["O", "A"], "full": true, "color": "bleu"}],
    outils: ['regle', 'compas'], w: 200, h: 200, px: 190, etapes: [
      { texte: 'Je construis le triangle ABC (règle et compas).', el: [{ seg: [A, B] }, { seg: [A, C] }, { seg: [B, C] }, CPT(A, 'A', -11, 4), CPT(B, 'B', 11, 4), CPT(C, 'C', 0, -9)] },
      { texte: 'Je trace au compas la médiatrice de [AB], puis celle de [BC].', el: [med(A, B, 70), med(B, C, 70)] },
      { texte: 'Elles se coupent en O, centre du cercle circonscrit.', el: [CPT(O, 'O', 10, 12, '#E07B00')] },
      { texte: 'Je trace le cercle de centre O qui passe par A : il passe aussi par B et C.', el: [{ cercle: [O, r], c: '#0C5BA0' }] }] }); })();
// Rectangle sans équerre : cercle de centre O de rayon 3 cm (1 cm = 20 px), deux diamètres.
const RECT_SANS = (() => { const O = [90, 80], r = 60, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)], A = P(20), B = P(130), C = P(200), D = P(310);
  return plConstruction({ programme: [{"op": "point", "name": "O"}, {"op": "circle", "id": "c", "center": "O", "radius": 3, "full": true, "color": "bleu"}, {"op": "line", "id": "d1", "through": "O", "direction": 20}, {"op": "line", "id": "d2", "through": "O", "direction": 130},
      {"op": "intersect", "name": "A", "of": ["d1", "c"], "pick": "right"}, {"op": "intersect", "name": "C", "of": ["d1", "c"], "pick": "left"}, {"op": "intersect", "name": "B", "of": ["d2", "c"], "pick": "up"}, {"op": "intersect", "name": "D", "of": ["d2", "c"], "pick": "down"},
      {"op": "segment", "from": "A", "to": "B"}, {"op": "segment", "from": "B", "to": "C"}, {"op": "segment", "from": "C", "to": "D"}, {"op": "segment", "from": "D", "to": "A"}],
    outils: ['regle', 'compas'], w: 180, h: 160, px: 170, etapes: [
      { texte: 'Je trace un cercle de centre O et de rayon 3 cm.', el: [{ cercle: [O, r], c: '#0C5BA0' }, CPT(O, 'O', -4, 16)] },
      { texte: 'Je trace deux diamètres [AC] et [BD].', el: [{ seg: [A, C], c: '#E07B00', ep: 1.4 }, { seg: [B, D], c: '#2E9C6A', ep: 1.4 }, CPT(A, 'A', 9, 2), CPT(B, 'B', -8, -8), CPT(C, 'C', -12, 6), CPT(D, 'D', 6, 12)] },
      { texte: 'Je trace ABCD : ses diagonales ont le même milieu et la même longueur, c\'est un rectangle.', el: [{ seg: [A, B] }, { seg: [B, C] }, { seg: [C, D] }, { seg: [D, A] }] }] }); })();
// Triangle inscrit dans un demi-cercle (pour les énoncés).
const DEMI = (() => { const O = [90, 70], r = 70, P = a => [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)], E = P(180), F2 = P(0), G = P(60);
  return P3.svg(190, 150, `<circle cx="${O[0] + 5}" cy="${O[1] + 5}" r="${r}" fill="none" stroke="#2EA8C9" stroke-width="1.6"/>` + [[E, F2], [E, G], [F2, G]].map(([a, b]) => P3.L([a[0] + 5, a[1] + 5], [b[0] + 5, b[1] + 5], '#1F3A5C', 2)).join('')
    + [[E, 'E', -12, 4], [F2, 'F', 12, 4], [G, 'G', 6, -6], [O, 'O', 0, 16]].map(([p, n, dx, dy]) => `<circle cx="${p[0] + 5}" cy="${p[1] + 5}" r="1.8" fill="#1F3A5C"/>` + P3.Tx([p[0] + 5 + dx, p[1] + 5 + dy], n, '#1F3A5C', 12)).join(''), 150); })();
PLANCHES['4e|Droites remarquables et cercles'] = [
  { titre: 'Les droites remarquables d\'un triangle', duree: '30 min',
    attendus: ['Connaître les quatre familles de droites remarquables', 'Connaître leurs points de concours', 'Construire le cercle circonscrit à un triangle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec le nom du point de concours.',
        ...rmp([['Médiatrices : centre du cercle @', 'circonscrit'], ['Hauteurs : @', 'orthocentre'], ['Médianes : centre de @', 'gravité'], ['Bissectrices : centre du cercle @', 'inscrit']]) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une médiane passe par un sommet.', 'vrai'], ['Une médiatrice passe toujours par un sommet.', 'faux'], ['Une hauteur est perpendiculaire à un côté.', 'vrai'], ['L\'orthocentre est toujours dans le triangle.', 'faux']], 'vrai · faux') },
      { etoiles: 2, consigne: 'Pour chaque droite, entoure son nom.',
        ...chx([['Elle passe par un sommet et par le milieu du côté opposé :', 'médiane', 'médiane · hauteur · médiatrice'],
                ['Elle est perpendiculaire à un côté en son milieu :', 'médiatrice', 'médiane · hauteur · médiatrice'],
                ['Elle passe par un sommet et elle est perpendiculaire au côté opposé :', 'hauteur', 'médiane · hauteur · médiatrice'],
                ['Elle partage un angle en deux angles de même mesure :', 'bissectrice', 'bissectrice · hauteur · médiatrice']]) },
      { etoiles: 2, cahier: true, consigne: 'Construis le triangle ABC tel que AB = 6 cm, AC = 4 cm et BC = 5 cm, puis son cercle circonscrit.',
        corr: CIRCONSCRIT },
      { etoiles: 3, cahier: true, consigne: 'O est le centre du cercle circonscrit au triangle ABC, et OA = 4,2 cm. Combien mesurent OB et OC ? Justifie.',
        corr: cm1Redac('Démonstration', { suite: ['O est sur les médiatrices de [AB] et de [AC].', 'Donc OB = OA et OC = OA.'] }, 'OB = OC = 4,2 cm : le cercle circonscrit a pour rayon 4,2 cm.') },
    ] },
  { titre: 'Triangle rectangle et cercle', duree: '35 min',
    attendus: ['Situer le centre du cercle circonscrit à un triangle rectangle', 'Calculer la longueur de la médiane issue de l\'angle droit', 'Démontrer qu\'un triangle est rectangle avec un cercle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABC est rectangle en A et O est le milieu de [BC]. Complète.',
        ...rmp([['BC = 10 cm : OA = @ cm', 5], ['BC = 7 cm : OA = @ cm', '3,5'], ['OA = 4 cm : BC = @ cm', 8]]) },
      { etoiles: 2, col: 1, consigne: 'M est le milieu de [ST]. Le triangle RST est-il rectangle en R ? Entoure.',
        ...ch([['ST = 8 cm et RM = 4 cm :', 'oui'], ['ST = 10 cm et RM = 4 cm :', 'non'], ['ST = 9 cm et RM = 4,5 cm :', 'oui']], 'oui · non') },
      { etoiles: 2, cahier: true, consigne: illu(DEMI, '[EF] est un diamètre du cercle de centre O, et G est un point de ce cercle. Démontre que le triangle EFG est rectangle.'),
        corr: cm1Redac('Démonstration', { suite: ['G est sur le cercle de diamètre [EF] : le triangle EFG est inscrit dans un demi-cercle.'] }, 'D\'après le théorème du triangle inscrit dans un demi-cercle, EFG est rectangle en G.') },
      { etoiles: 3, cahier: true, consigne: 'RST est un triangle rectangle en R tel que RS = 6 cm et RT = 8 cm. M est le milieu de [ST]. Calcule ST, puis RM.',
        corr: cm1Redac('Pythagore', { suite: ['RST est rectangle en R : d\'après le théorème de Pythagore,'] }, '')
          + cm1Redac('Longueur ST', { nom: 'ST²', lignes: ['RS² + RT²', '6² + 8²', '36 + 64', '100'] }, 'ST = √100 = 10 : ST mesure 10 cm.')
          + cm1Redac('Longueur RM', { nom: 'RM', lignes: [F('ST', 2), F(10, 2), '5'] }, 'M est le centre du cercle circonscrit à RST, rectangle en R : RM mesure 5 cm.') },
    ] },
  { titre: 'Parallélogrammes particuliers et diagonales', duree: '30 min',
    attendus: ['Reconnaître un rectangle, un losange, un carré par ses diagonales', 'Construire un rectangle sans équerre'],
    exos: [
      { etoiles: 1, consigne: 'ABCD est un parallélogramme. Entoure sa nature.',
        ...chx([['Ses diagonales ont la même longueur :', 'rectangle', 'rectangle · losange · carré'],
                ['Ses diagonales sont perpendiculaires :', 'losange', 'rectangle · losange · carré'],
                ['Ses diagonales ont la même longueur et sont perpendiculaires :', 'carré', 'rectangle · losange · carré']]) },
      { etoiles: 2, col: 1, consigne: 'ABCD est un parallélogramme de centre O. Complète.',
        ...rmp([['OA = 2,5 cm : AC = @ cm', 5], ['OB = 2,5 cm : BD = @ cm', 5], ['ABCD est un @', 'rectangle']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un quadrilatère dont les diagonales ont la même longueur est un rectangle.', 'faux'], ['Un parallélogramme dont les diagonales ont la même longueur est un rectangle.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: 'Construis un rectangle ABCD sans équerre, en traçant deux diamètres d\'un cercle de centre O et de rayon 3 cm. Justifie que c\'est un rectangle.',
        corr: RECT_SANS + cm1Redac('Justification', { suite: ['[AC] et [BD] ont le même milieu O : ABCD est un parallélogramme.', 'AC = BD = 6 cm (deux diamètres).'] }, 'Le parallélogramme ABCD a des diagonales de même longueur : c\'est un rectangle.') },
      { etoiles: 3, cahier: true, consigne: 'EFGH est un quadrilatère dont les diagonales [EG] et [FH] se coupent en leur milieu K, avec EG = FH = 7 cm et (EG) ⊥ (FH). Quelle est la nature de EFGH ? Justifie.',
        corr: cm1Redac('Démonstration', { suite: ['Les diagonales ont le même milieu K : EFGH est un parallélogramme.', 'Ses diagonales ont la même longueur : c\'est un rectangle.', 'Ses diagonales sont perpendiculaires : c\'est un losange.'] }, 'EFGH est à la fois un rectangle et un losange : c\'est un carré.') },
    ] },
  { titre: 'Problèmes', duree: '35 min',
    attendus: ['Reconnaître un triangle rectangle et son cercle circonscrit dans une situation', 'Utiliser les diagonales pour justifier une forme'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Un menuisier fabrique un cadre. Les côtés opposés mesurent 1,20 m et 0,80 m, et il mesure les deux diagonales : 1,44 m chacune. Son cadre est-il rectangulaire ? Justifie.',
        corr: cm1Redac('Démonstration', { suite: ['Les côtés opposés ont deux à deux la même longueur : le cadre est un parallélogramme.', 'Ses diagonales ont la même longueur (1,44 m).'] }, 'C\'est un parallélogramme dont les diagonales ont la même longueur : le cadre est rectangulaire.') },
      { etoiles: 2, cahier: true, consigne: 'Pour trouver le centre d\'une assiette ronde, Inès pose le coin d\'une équerre sur le bord : les deux côtés de l\'équerre coupent le bord en P et en Q. Elle trace [PQ]. Pourquoi [PQ] est-il un diamètre ? Comment finir pour trouver le centre ?',
        corr: cm1Redac('Démonstration', { suite: ['Le coin E de l\'équerre est sur le cercle et l\'angle PEQ est droit : le triangle PEQ est rectangle en E.', 'Le centre de son cercle circonscrit (le bord de l\'assiette) est le milieu de l\'hypoténuse [PQ].'] }, '[PQ] est un diamètre. En recommençant ailleurs, on obtient un deuxième diamètre : le centre est le point où ils se coupent.') },
      { etoiles: 3, cahier: true, consigne: 'ABC est un triangle rectangle en A. Démontre que son orthocentre est le point A.',
        corr: cm1Redac('Démonstration', { suite: ['(AB) ⊥ (AC) : la hauteur issue de B est la droite (AB).', 'De même, la hauteur issue de C est la droite (AC).', 'Ces deux hauteurs se coupent en A.'] }, 'L\'orthocentre du triangle ABC est le point A, sommet de l\'angle droit.') },
      { etoiles: 3, cahier: true, consigne: 'Défi. ABC est rectangle en A, et O est le milieu de [BC]. Démontre que les triangles OAB et OAC sont isocèles en O.',
        corr: cm1Redac('Démonstration', { suite: ['ABC est rectangle en A : O, milieu de l\'hypoténuse [BC], est le centre de son cercle circonscrit.', 'Donc OA = OB = OC.'] }, 'OA = OB : OAB est isocèle en O ; OA = OC : OAC est isocèle en O.') },
    ] },
];
})();

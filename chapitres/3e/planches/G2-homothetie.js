/* ============================================================
   3e · Planches : Homothétie (G2)
   Image d'un point et d'une figure, rapport positif ou négatif ; effet sur les longueurs, les aires et les
   volumes ; homothétie et Thalès ; Objectif Brevet.
   ============================================================ */
(() => {
const { T, rmp, ch, chx, auto, qs, repere, geo, cote, Bl, Ro } = P3;
// Illustrations des problèmes concrets.
const DS = P3.D, illu = P3.illu;
const verreTiers = DS.fig(118, 116, DS.verreCone(50, 12, 40, 96, 1 / 3) + DS.cote([100, 108], [100, 12], 'h', 0, { dt: -6, a: 'start' }) + DS.tx([50, 98], 'eau', { c: '#2EA8C9', fs: 10 }), 92);
const pizza = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#E9B872" stroke="#A0622D" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${r - 5}" fill="#E35D3A" opacity=".8"/>`
  + [[.3, .2], [-.35, .1], [.05, -.4], [-.1, .45], [.45, -.3]].map(([a, b]) => `<circle cx="${cx + a * r}" cy="${cy + b * r}" r="${r * .12}" fill="#FFF3D6"/>`).join('');
const pizzas = DS.fig(186, 94, pizza(40, 42, 36) + DS.tx([40, 92], '30 cm', { fs: 10 }) + pizza(106, 42, 24) + pizza(158, 42, 24) + DS.tx([106, 82], '20 cm', { fs: 10 }) + DS.tx([158, 82], '20 cm', { fs: 10 }), 150);
const lampeOmbre = (() => { const L = [14, 62], m = [56, 54], M = [56, 70], E = 182, k = (E - L[0]) / (m[0] - L[0]), o1 = [E, L[1] + (m[1] - L[1]) * k], o2 = [E, L[1] + (M[1] - L[1]) * k];
  return DS.fig(200, 150, DS.ln(L, o1, '#E9A21C', 1, true) + DS.ln(L, o2, '#E9A21C', 1, true) + `<rect x="${E}" y="6" width="8" height="112" fill="#F3F6FA" stroke="#1F3A5C" stroke-width="1.2"/>`
    + DS.ln(o1, o2, '#5B6676', 5) + DS.ln(m, M, '#E35D3A', 4) + DS.lampe(L[0], L[1]) + DS.tx([56, 48], 'main', { fs: 10, c: '#E35D3A' }) + DS.tx([176, 62], 'ombre', { fs: 10, a: 'end' })
    + DS.cote([L[0], 120], [56, 120], '1 m', 0, { dt: 8 }) + DS.cote([L[0], 120], [E, 120], '4 m', -12, { dt: 7 }), 168); })();
// Triangle ABC et centre O sur quadrillage ; image par l'homothétie de centre O, rapport 2 (dans le corrigé).
const tri = [[3, 2], [5, 2], [3, 4]], img = tri.map(([x, y]) => [1 + 2 * (x - 1), 1 + 2 * (y - 1)]);
const quad = corr => repere({ x: [0, 10], y: [0, 8], u: 18, axes: false, px: 150,
  polys: [[tri, '#1F3A5C', '#EAF4FB'], ...(corr ? [[img, Ro, 'rgba(227,93,58,.10)']] : [])],
  segs: corr ? img.map(p => [[1, 1], p, '#9FBEDC', true]) : [],
  pts: [{ x: 1, y: 1, c: '#1F3A5C', t: 'O', dx: -12, dy: 4 }, { x: 3, y: 2, c: '#1F3A5C', t: 'A', dx: -12, dy: 12 }, { x: 5, y: 2, c: '#1F3A5C', t: 'B', dx: 4, dy: 12 }, { x: 3, y: 4, c: '#1F3A5C', t: 'C', dx: -12, dy: -4 },
    ...(corr ? [{ x: 5, y: 3, c: Ro, t: 'A\'', dx: -16, dy: 14 }, { x: 9, y: 3, c: Ro, t: 'B\'' }, { x: 5, y: 7, c: Ro, t: 'C\'' }] : [])] });
// Logo agrandi (brevet) : triangle rectangle en A et son image par l'homothétie de centre A.
const logo = geo({ pts: { A: [10, 120], B: [70, 120], C: [10, 75], 'B\'': [160, 120], 'C\'': [10, 7] }, poly: [[['A', 'B\'', 'C\''], '#FDF0EC'], [['A', 'B', 'C']]], segs: [['A', 'B\''], ['A', 'C\''], ['B\'', 'C\'', { c: Ro }], ['B', 'C', { c: Bl, w: 2.4 }]], droits: [['B', 'A', 'C']], px: 150 });
// Ombre (brevet) : lampe L, figurine [MN], ombre [M'N'] sur l'écran.
const ombre = geo({ pts: { L: [10, 60], M: [70, 45], N: [70, 75], 'M\'': [250, 0], 'N\'': [250, 120] }, segs: [['L', 'M\'', { c: '#E9A21C', d: true, w: 1.4 }], ['L', 'N\'', { c: '#E9A21C', d: true, w: 1.4 }], ['M', 'N', { c: Bl, w: 4 }], ['M\'', 'N\'', { c: '#1F3A5C', w: 3 }]], off: { L: [-10, 4] }, px: 210 });
PLANCHES['3e|Homothétie'] = [
  { titre: 'Image par une homothétie', duree: '35 min',
    attendus: ['Construire l\'image d\'un point par une homothétie (rapport positif ou négatif)', 'Reconnaître agrandissement, réduction, symétrie centrale', 'Retrouver le rapport d\'une homothétie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Centre O, rapport 3 : OA = 2 cm, donc OA\' = @ cm', 6], ['Centre O, rapport 0,5 : OB = 7 cm, donc OB\' = @ cm', '3,5'], ['Centre O, rapport −2 : OC = 1,5 cm, donc OC\' = @ cm', 3], ['A\' est du même côté que A par rapport à O quand le rapport est @', 'positif']]) },
      { etoiles: 1, col: 1, consigne: 'Entoure ce que fait l\'homothétie.',
        ...ch([['Rapport 4 :', 'agrandissement'], ['Rapport 0,25 :', 'réduction'], ['Rapport −1 :', 'symétrie centrale'], ['Rapport −3 :', 'agrandissement']], 'agrandissement · réduction · symétrie centrale') },
      { etoiles: 2, col: 1, consigne: 'A\' est l\'image de A par une homothétie de centre O. Trouve le rapport k.',
        ...rmp([['OA = 2, OA\' = 5, A et A\' du même côté de O : k = @', '2,5'], ['OB = 4, OB\' = 2, de part et d\'autre de O : k = @', '−0,5'], ['OC = 5, OC\' = 2, du même côté de O : k = @', '0,4']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Reproduis la figure, puis construis l\'image du triangle ABC par l\'homothétie de centre O et de rapport 2.',
        eleve: `<div style="text-align:center;">${quad(false)}</div>`, corr: `<div style="text-align:center;">${quad(true)}</div>` },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un rectangle de 4 cm sur 6 cm est agrandi par une homothétie de rapport 1,5. Donne les dimensions et l\'aire de l\'image. Par combien l\'aire a-t-elle été multipliée ?',
        corr: cm1Redac('Dimensions', '4 × 1,5 = 6 et 6 × 1,5 = 9', 'L\'image mesure 6 cm sur 9 cm.') + cm1Redac('Aires', { suite: ['4 × 6 = 24 cm² et 6 × 9 = 54 cm²', '54 : 24 = 2,25 = 1,5²'] }, 'L\'aire est multipliée par 2,25.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une photo de 10 cm sur 15 cm est agrandie en 20 cm sur 30 cm. Le prix du tirage est proportionnel à l\'aire : la petite coûte 0,20 €. Combien coûte la grande ?',
        corr: cm1Redac('Raisonnement', { suite: ['Rapport d\'agrandissement : 2', 'L\'aire est multipliée par 2² = 4', '0,20 × 4 = 0,80'] }, 'La grande photo coûte 0,80 €.') },
    ] },
  { titre: 'Longueurs, aires et volumes', duree: '35 min',
    attendus: ['Savoir qu\'un rapport k multiplie les longueurs par |k|, les aires par k² et les volumes par |k|³', 'Calculer une aire ou un volume après agrandissement ou réduction', 'Retrouver un rapport'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Rapport 3 : les longueurs sont multipliées par @', 3], ['Rapport 3 : les aires sont multipliées par @', 9], ['Rapport 3 : les volumes sont multipliés par @', 27], ['Rapport 0,5 : les aires sont multipliées par @', '0,25']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Triangle d\'aire 12 cm², rapport 2 : aire de l\'image @ cm²', 48], ['Même triangle, rapport −3 : aire de l\'image @ cm²', 108], ['Cube de 8 cm³, rapport 0,5 : volume de l\'image @ cm³', 1]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le rapport (positif) de l\'homothétie.',
        ...chx([['Une aire de 20 cm² devient 80 cm² :', '2', '2 · 4 · 16'], ['Une aire est divisée par 9 :', T(1, 3), `${T(1, 3)} · ${T(1, 9)} · 3`], ['Un volume est multiplié par 8 :', '2', '2 · 4 · 8']]) },
      { etoiles: 2, col: 1, consigne: 'Une carte est à l\'échelle 1/25 000.',
        ...rmp([['1 cm sur la carte représente @ m', 250], ['1 cm² sur la carte représente @ m²', '62 500']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La maquette d\'un immeuble est à l\'échelle 1/100. Elle mesure 45 cm de haut et a un volume de 0,03 m³. Quelle est la hauteur réelle ? Le volume réel ?',
        corr: cm1Redac('Hauteur', '45 × 100 = 4 500 cm', 'L\'immeuble mesure 45 m.') + cm1Redac('Volume', '0,03 × 100³ = 0,03 × 1 000 000 = 30 000', 'Le volume réel est 30 000 m³.') },
      { etoiles: 2, col: 1, cahier: true, consigne: illu(pizzas, 'Une pizza de 30 cm de diamètre, ou deux pizzas de 20 cm de même épaisseur : où y a-t-il le plus à manger ?'),
        corr: cm1Redac('Aires', { suite: ['Grande : π × 15² = 225π', 'Deux petites : 2 × π × 10² = 200π'] }, 'La grande pizza est plus copieuse.') },
      { etoiles: 3, col: 1, cahier: true, consigne: illu(verreTiers, 'Un verre conique est rempli d\'eau jusqu\'au tiers de sa hauteur (en partant de la pointe). Quelle fraction du volume du verre contient-il ?'),
        corr: cm1Redac('Réduction', 'Le cône d\'eau est une réduction de rapport 1/3 du verre : volume multiplié par (1/3)³ = 1/27', 'Le verre ne contient que 1/27 de son volume, moins de 4 % !') },
    ] },
  { titre: 'Homothétie et Thalès', duree: '35 min',
    attendus: ['Relier homothétie et configurations de Thalès', 'Utiliser une homothétie pour calculer une longueur', 'Composer deux homothéties de même centre'],
    exos: [
      { etoiles: 1, col: 1, consigne: '[A\'B\'] est l\'image de [AB] par l\'homothétie de centre O et de rapport 1,5.',
        ...rmp([['AB = 3 cm, donc A\'B\' = @ cm', '4,5'], ['OB = 5 cm, donc OB\' = @ cm', '7,5'], ['Les droites (AB) et (A\'B\') sont @', 'parallèles']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le rapport de l\'homothétie de centre C qui envoie A sur A\'.',
        ...chx([['C est entre A et A\', et CA\' = 2 CA :', '−2', '2 · −2 · 0,5'], ['A\' est sur [CA] et CA\' = CA : 4 :', '0,25', '4 · −4 · 0,25'], ['A\' = A :', '1', '0 · 1 · −1']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'M ∈ [AB], N ∈ [AC] et (MN) // (BC), avec AM = 3 et AB = 7,5. Quelle homothétie transforme le triangle ABC en AMN ? Calcule MN si BC = 10.',
        corr: cm1Redac('Homothétie', 'Centre A, rapport AM : AB = 3 : 7,5 = 0,4', '') + cm1Redac('Longueur MN', 'MN = 0,4 × 10 = 4', 'MN = 4.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un projecteur agrandit une diapositive de 3,6 cm de large en une image de 2,4 m de large. Quel est le rapport ? Quelle est la hauteur de l\'image si la diapositive mesure 2,4 cm de haut ?',
        corr: cm1Redac('Rapport', '240 : 3,6 ≈ 66,7', '') + cm1Redac('Hauteur', '2,4 × 240 : 3,6 = 160', 'L\'image mesure 160 cm, soit 1,6 m de haut.') },
      { etoiles: 2, col: 1, cahier: true, consigne: illu(lampeOmbre, 'Une lampe éclaire une main de 15 cm placée à 1 m d\'elle. L\'écran est à 4 m de la lampe. Quelle est la taille de l\'ombre ?'),
        corr: cm1Redac('Homothétie', { suite: ['Centre : la lampe ; rapport 4 : 1 = 4', '15 × 4 = 60'] }, 'L\'ombre mesure 60 cm.') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le centre d\'une homothétie est sa propre image.', 'vrai'], ['A, A\' et le centre sont toujours alignés.', 'vrai'], ['Une homothétie de rapport 1 ne bouge aucun point.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On applique l\'homothétie de centre O et de rapport 2, puis celle de même centre et de rapport −3. Quelle transformation obtient-on ?',
        corr: cm1Redac('Composition', 'OA\' = 2 OA dans le même sens, puis OA" = 3 OA\' dans le sens opposé : 2 × (−3) = −6', 'On obtient l\'homothétie de centre O et de rapport −6.') },
    ] },
  { titre: 'Homothétie', duree: '45 min', brevet: true,
    attendus: ['Automatismes : homothétie, agrandissement, aires et volumes', 'Agrandir une figure et calculer des aires', 'Utiliser une homothétie dans une situation concrète'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Homothétie de rapport 2 : un segment de 3 cm devient (en cm)', 6], ['Rapport 3 : les aires sont multipliées par', '9', ['3', '6', '9']], ['Homothétie de rapport −1 :', 'symétrie centrale', ['symétrie centrale', 'symétrie axiale', 'translation']], ['Rapport 0,5 : c\'est', 'une réduction', ['un agrandissement', 'une réduction']], ['OA = 4 cm, rapport 1,5 : OA\' = (en cm)', 6], ['Cube de 2 cm d\'arête, rapport 3 : volume de l\'image (en cm³)', 216]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: `<span>Le logo d'un club est un triangle ABC avec AB = 4 cm, AC = 3 cm et BC = 5 cm. Pour une affiche, on l'agrandit par l'homothétie de centre A et de rapport 2,5.</span>` + cote(logo, qs(['Montrer que le triangle ABC est rectangle en A.', 'Calculer les longueurs des côtés du triangle agrandi.', 'Calculer l\'aire du triangle ABC, puis celle du triangle agrandi.', 'Le graphiste veut un logo de 150 cm². Quel rapport doit-il choisir ?'])),
        corr: cm1Redac('ABC rectangle', '5² = 25 et 4² + 3² = 16 + 9 = 25', 'D\'après la réciproque du théorème de Pythagore, ABC est rectangle en A.')
          + cm1Redac('Côtés agrandis', '4 × 2,5 = 10 ; 3 × 2,5 = 7,5 ; 5 × 2,5 = 12,5', 'Le triangle agrandi mesure 10 cm, 7,5 cm et 12,5 cm.')
          + cm1Redac('Aires', { suite: ['ABC : 4 × 3 : 2 = 6 cm²', 'Agrandi : 6 × 2,5² = 6 × 6,25 = 37,5 cm²'] }, '')
          + cm1Redac('Aire de 150 cm²', { suite: ['150 : 6 = 25', 'k² = 25, donc k = 5'] }, 'Il doit choisir le rapport 5.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: `<span>Pour un spectacle d'ombres, une lampe L éclaire une figurine [MN] de 12 cm, placée à 50 cm de la lampe. L'écran est à 2 m de la lampe ; l'ombre est [M'N'].</span>` + cote(ombre, qs(['Quel est le rapport de l\'homothétie de centre L qui transforme [MN] en [M\'N\'] ?', 'Quelle est la taille de l\'ombre ?', 'À quelle distance de la lampe faut-il placer la figurine pour obtenir une ombre de 1,20 m ?'])),
        corr: cm1Redac('Rapport', '200 : 50 = 4', 'Le rapport est 4.') + cm1Redac('Taille de l\'ombre', '12 × 4 = 48', 'L\'ombre mesure 48 cm.')
          + cm1Redac('Ombre de 1,20 m', { suite: ['120 : 12 = 10 : il faut un rapport 10.', '200 : 10 = 20'] }, 'Il faut placer la figurine à 20 cm de la lampe.') },
    ] },
];
})();

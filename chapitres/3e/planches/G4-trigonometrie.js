/* ============================================================
   3e · Planches : Trigonométrie (G4)
   Cosinus, sinus, tangente ; calculer une longueur ; calculer un angle ; problèmes (Pythagore, Thalès,
   trigonométrie) ; Objectif Brevet (tyrolienne, rampe d'accès).
   Valeurs arrondies : calculatrice en mode degrés.
   ============================================================ */
(() => {
const { T, rmp, ch, chx, auto, qs, geo, cote, Bl } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
// Triangle ABC rectangle en B, angle en A marqué.
const triABC = (cotes, px, angle) => geo({ pts: { A: [10, 130], B: [200, 130], C: [200, 20] }, poly: [[['A', 'B', 'C']]], segs: [['A', 'B'], ['B', 'C'], ['A', 'C']], droits: [['A', 'B', 'C']], arcs: [['B', 'A', 'C', angle || '']], cotes: cotes || [], px: px || 170 });
const tyro = geo({ pts: { D: [220, 10], E: [220, 120], A: [10, 120] }, segs: [['A', 'E'], ['E', 'D', { w: 4, c: '#7A4FC0' }], ['A', 'D', { c: Bl, w: 2 }]], droits: [['A', 'E', 'D']], arcs: [['E', 'A', 'D', '']], cotes: [['A', 'E', '45 m', -1], ['E', 'D', '12 m', -1]], px: 200 });
const rampe = geo({ pts: { A: [10, 70], H: [230, 70], B: [230, 25] }, segs: [['A', 'H', { d: true, w: 1.4 }], ['H', 'B', { d: true, w: 1.4 }], ['A', 'B', { c: Bl, w: 3 }]], droits: [['A', 'H', 'B']], arcs: [['H', 'A', 'B', '']], cotes: [['A', 'B', '4,5 m', 1], ['H', 'B', '0,35 m', -1]], px: 200 });
PLANCHES['3e|Trigonométrie'] = [
  { titre: 'Cosinus, sinus et tangente', duree: '35 min',
    attendus: ['Repérer l\'hypoténuse, le côté adjacent et le côté opposé à un angle', 'Écrire le cosinus, le sinus et la tangente d\'un angle aigu', 'Utiliser la calculatrice (mode degrés)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle ABC est rectangle en B. Pour l\'angle Â, entoure.',
        eleve: `<div style="text-align:center;">${triABC([], 140)}</div>` + chx([['Hypoténuse :', '[AC]', '[AB] · [BC] · [AC]'], ['Côté adjacent à Â :', '[AB]', '[AB] · [BC] · [AC]'], ['Côté opposé à Â :', '[BC]', '[AB] · [BC] · [AC]']]).eleve,
        corr: `<div style="text-align:center;">${triABC([], 140)}</div>` + chx([['Hypoténuse :', '[AC]', '[AB] · [BC] · [AC]'], ['Côté adjacent à Â :', '[AB]', '[AB] · [BC] · [AC]'], ['Côté opposé à Â :', '[BC]', '[AB] · [BC] · [AC]']]).corr },
      { etoiles: 1, col: 1, consigne: 'Dans le même triangle, entoure la bonne formule.',
        ...chx([['cos Â =', T('AB', 'AC'), `${T('AB', 'AC')} · ${T('BC', 'AC')} · ${T('BC', 'AB')}`], ['sin Â =', T('BC', 'AC'), `${T('AB', 'AC')} · ${T('BC', 'AC')} · ${T('BC', 'AB')}`], ['tan Â =', T('BC', 'AB'), `${T('AB', 'AC')} · ${T('BC', 'AC')} · ${T('BC', 'AB')}`]]) },
      { etoiles: 2, col: 1, consigne: 'Dans ABC rectangle en B : AB = 4 cm, BC = 3 cm et AC = 5 cm.',
        ...rmp([['cos Â = @', '0,8'], ['sin Â = @', '0,6'], ['tan Â = @', '0,75']]) },
      { etoiles: 2, col: 1, consigne: 'À la calculatrice (au centième si besoin).',
        ...rmp([['cos 60° = @', '0,5'], ['sin 30° = @', '0,5'], ['tan 45° = @', 1], ['cos 35° ≈ @', '0,82'], ['sin 72° ≈ @', '0,95']]) },
      { etoiles: 2, col: 1, consigne: 'Trouve l\'angle aigu x (au degré près).',
        ...rmp([['cos x = 0,5 : x = @°', 60], ['tan x = 1 : x = @°', 45], ['sin x = 0,8 : x ≈ @°', 53], ['cos x = 0,3 : x ≈ @°', 73]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le cosinus d\'un angle aigu est compris entre 0 et 1.', 'vrai'], ['tan x = sin x : cos x', 'vrai'], ['sin 30° est la moitié de sin 60°.', 'faux'], ['(cos x)² + (sin x)² = 1', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Prouve que, dans un triangle rectangle, (cos Â)² + (sin Â)² = 1. (Utilise le théorème de Pythagore.)',
        corr: cm1Redac('Preuve', { suite: [`(cos Â)² + (sin Â)² = ${cm1Frac('AB²', 'AC²')} + ${cm1Frac('BC²', 'AC²')} = ${cm1Frac('AB² + BC²', 'AC²')}`, 'Pythagore : AB² + BC² = AC²'] }, 'Donc (cos Â)² + (sin Â)² = 1.') },
    ] },
  { titre: 'Calculer une longueur', duree: '40 min',
    attendus: ['Choisir la bonne relation trigonométrique', 'Calculer une longueur dans un triangle rectangle', 'Rédiger le calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la relation à utiliser.',
        ...chx([['On connaît l\'hypoténuse et Â ; on cherche le côté opposé :', 'sinus', 'cosinus · sinus · tangente'], ['On connaît le côté adjacent et Â ; on cherche le côté opposé :', 'tangente', 'cosinus · sinus · tangente'], ['On connaît le côté adjacent et Â ; on cherche l\'hypoténuse :', 'cosinus', 'cosinus · sinus · tangente']]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en B, Â = 40° et AC = 10 cm (au dixième).',
        ...fig(triABC([['A', 'C', '10 cm', -1]], 150, '40°'), [['AB ≈ @ cm', '7,7'], ['BC ≈ @ cm', '6,4']]) },
      { etoiles: 2, col: 1, consigne: 'DEF est rectangle en E, D̂ = 35° et DE = 8 cm (au dixième).',
        ...rmp([['EF = DE × tan 35° ≈ @ cm', '5,6'], ['DF = DE : cos 35° ≈ @ cm', '9,8']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'RST est rectangle en S, R̂ = 52° et RT = 12 cm. Calcule RS, arrondi au dixième.',
        corr: cm1Redac('Cosinus', { suite: [`cos R̂ = ${cm1Frac('RS', 'RT')}`, 'RS = 12 × cos 52° ≈ 7,4'] }, 'RS ≈ 7,4 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une échelle de 6 m fait un angle de 70° avec le sol horizontal. À quelle hauteur arrive-t-elle contre le mur ?',
        corr: cm1Redac('Sinus', 'h = 6 × sin 70° ≈ 5,64', 'L\'échelle arrive à environ 5,6 m de hauteur.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le fil d\'un cerf-volant mesure 50 m et fait un angle de 40° avec le sol. À quelle hauteur vole le cerf-volant (main au sol) ?',
        corr: cm1Redac('Sinus', 'h = 50 × sin 40° ≈ 32,1', 'Le cerf-volant vole à environ 32 m de hauteur.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'À 15 m du pied d\'un arbre, Inès voit son sommet sous un angle de 38° ; ses yeux sont à 1,6 m du sol. Quelle est la hauteur de l\'arbre ?',
        corr: cm1Redac('Tangente', { suite: ['h₁ = 15 × tan 38° ≈ 11,7 m', '11,7 + 1,6 = 13,3'] }, 'L\'arbre mesure environ 13,3 m.') },
    ] },
  { titre: 'Calculer un angle', duree: '35 min',
    attendus: ['Calculer le cosinus, le sinus ou la tangente d\'un angle', 'Retrouver l\'angle avec la calculatrice', 'Utiliser la somme des angles d\'un triangle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABC est rectangle en B, AB = 6 cm et AC = 10 cm.',
        ...rmp([['cos Â = @', '0,6'], ['Â ≈ @° (au degré)', 53], ['Ĉ ≈ @°', 37]]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en B, BC = 5 cm et AB = 12 cm.',
        ...rmp([['tan Â ≈ @ (au centième)', '0,42'], ['Â ≈ @° (au degré)', 23]]) },
      { etoiles: 2, col: 1, consigne: 'Dans un triangle rectangle de côtés 3, 4 et 5 :',
        ...rmp([['le plus petit angle aigu mesure environ @°', 37], ['le plus grand angle aigu mesure environ @°', 53]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Les deux angles aigus d\'un triangle rectangle sont complémentaires.', 'vrai'], ['Si cos Â = 0,5, alors Â = 30°.', 'faux'], ['Plus un angle aigu est grand, plus son cosinus est grand.', 'faux'], ['tan 45° = 1', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une route a une pente de 12 % : elle monte de 12 m pour 100 m parcourus à l\'horizontale. Quel angle fait-elle avec l\'horizontale ?',
        corr: cm1Redac('Tangente', { suite: ['tan x = 12 : 100 = 0,12', 'x ≈ 6,8°'] }, 'La route fait un angle d\'environ 7° avec l\'horizontale.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une rampe de 5 m de long monte de 0,8 m. Quel angle fait-elle avec le sol ?',
        corr: cm1Redac('Sinus', { suite: ['sin x = 0,8 : 5 = 0,16', 'x ≈ 9,2°'] }, 'La rampe fait un angle d\'environ 9° avec le sol.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un rectangle mesure 8 cm sur 6 cm. Quels angles sa diagonale fait-elle avec ses côtés ?',
        corr: cm1Redac('Tangente', { suite: ['tan x = 6 : 8 = 0,75', 'x ≈ 36,9°', '90 − 36,9 = 53,1'] }, 'La diagonale fait environ 37° avec la longueur et 53° avec la largeur.') },
    ] },
  { titre: 'Problèmes : Pythagore, Thalès ou trigonométrie ?', duree: '40 min',
    attendus: ['Choisir l\'outil adapté à la situation', 'Enchaîner plusieurs calculs', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'outil adapté.',
        ...chx([['Une longueur dans un triangle rectangle, connaissant deux longueurs :', 'Pythagore', 'Pythagore · Thalès · trigonométrie'], ['Un angle dans un triangle rectangle :', 'trigonométrie', 'Pythagore · Thalès · trigonométrie'], ['Une longueur avec deux droites parallèles :', 'Thalès', 'Pythagore · Thalès · trigonométrie']]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en A, AB = 7 cm et Ĉ = 30°.',
        ...rmp([['BC = @ cm', 14], ['AC ≈ @ cm (au dixième)', '12,1']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le toit symétrique d\'une maison de 8 m de large a une pente de 35°. Calcule la hauteur du toit et la longueur d\'un pan (au centième).',
        corr: cm1Redac('Hauteur', 'h = 4 × tan 35° ≈ 2,80', 'Le toit mesure environ 2,80 m de haut.') + cm1Redac('Longueur d\'un pan', 'L = 4 : cos 35° ≈ 4,88', 'Un pan mesure environ 4,88 m.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un avion décolle en ligne droite avec un angle de 15°. Quelle est son altitude après avoir parcouru 2 km ?',
        corr: cm1Redac('Sinus', '2 000 × sin 15° ≈ 518', 'Son altitude est d\'environ 518 m.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Du haut d\'un phare de 40 m, on voit un bateau 8° sous l\'horizontale. À quelle distance du pied du phare est-il ?',
        corr: cm1Redac('Tangente', { suite: ['L\'angle au bateau mesure aussi 8° (angles alternes-internes).', 'd = 40 : tan 8° ≈ 285'] }, 'Le bateau est à environ 285 m du phare.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'A et B sont deux points d\'une côte, à 500 m l\'un de l\'autre. Un bateau S est tel que l\'angle BAS est droit et l\'angle ABS mesure 60°. Quelle est la distance AS ?',
        corr: cm1Redac('Tangente', 'AS = 500 × tan 60° ≈ 866', 'Le bateau est à environ 866 m de A.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'D\'un point A, on voit le sommet d\'une tour sous un angle de 30°. En avançant de 20 m vers la tour, on le voit sous un angle de 45°. Quelle est la hauteur de la tour ?',
        corr: cm1Redac('Mise en équation', { suite: ['À 45°, la hauteur h est égale à la distance d au pied de la tour : h = d.', 'Depuis A : tan 30° = h : (d + 20)', 'd = (d + 20) × tan 30°, donc d × (1 − tan 30°) = 20 × tan 30°', 'd = 20 × tan 30° : (1 − tan 30°) ≈ 27,3'] }, 'La tour mesure environ 27,3 m.') },
    ] },
  { titre: 'Trigonométrie', duree: '45 min', brevet: true,
    attendus: ['Automatismes : formules, valeurs, triangle rectangle', 'Étudier une tyrolienne : longueur, angle, durée', 'Vérifier la conformité d\'une rampe d\'accès'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['ABC rectangle en B : cos Â =', T('AB', 'AC'), [T('AB', 'AC'), T('BC', 'AC'), T('AB', 'BC')]], ['cos 60° =', '0,5'], ['tan 45° =', 1], ['Hypoténuse d\'un triangle rectangle de côtés 6 et 8 :', 10], ['Un angle aigu d\'un triangle rectangle mesure 35°. L\'autre mesure (en degrés)', 55], ['sin x = 0,5 et x est aigu : x =', '30°', ['30°', '45°', '60°']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: '<span>Une tyrolienne relie le sommet D d\'une tour de 12 m de haut à un point A du sol, situé à 45 m du pied E de la tour. Le câble [AD] est supposé tendu.</span>' + cote(tyro, qs(['Calculer la longueur du câble AD, au centimètre près.', 'Calculer l\'angle DAE, au degré près.', 'Pour la sécurité, cet angle doit être compris entre 5° et 25°. La tyrolienne est-elle conforme ?', 'On descend à 18 km/h en moyenne. Combien de temps dure la descente ?'])),
        corr: cm1Redac('Longueur du câble (Pythagore)', { suite: ['AD² = 45² + 12² = 2 025 + 144 = 2 169', 'AD = √2 169 ≈ 46,57'] }, 'Le câble mesure environ 46,57 m.')
          + cm1Redac('Angle DAE', { suite: ['tan DAE = 12 : 45 ≈ 0,267', 'DAE ≈ 15°'] }, '') + cm1Redac('Conformité', '5° &lt; 15° &lt; 25°', 'La tyrolienne est conforme.')
          + cm1Redac('Durée', { suite: ['18 km/h = 18 000 m : 3 600 s = 5 m/s', '46,57 : 5 ≈ 9,3'] }, 'La descente dure environ 9 secondes.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: '<span>Une rampe [AB] de 4,5 m relie le trottoir au seuil d\'une porte situé 0,35 m plus haut.</span>' + cote(rampe, qs(['Calculer l\'angle que fait la rampe avec le sol, au dixième de degré.', 'Calculer la longueur horizontale AH, au centimètre près.', 'La réglementation impose une pente (hauteur : longueur horizontale) d\'au plus 5 %. La rampe est-elle conforme ?'])),
        corr: cm1Redac('Angle', { suite: ['sin Â = 0,35 : 4,5 ≈ 0,078', 'Â ≈ 4,5°'] }, '') + cm1Redac('Longueur horizontale', 'AH² = 4,5² − 0,35² = 20,127 5 ; AH ≈ 4,49 m', '')
          + cm1Redac('Pente', '0,35 : 4,49 ≈ 0,078 = 7,8 %', 'La pente dépasse 5 % : la rampe n\'est pas conforme (il faudrait 7 m à l\'horizontale).') },
    ] },
];
})();

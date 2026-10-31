/* ============================================================
   4e · Planches : Cosinus (G3)
   Côté adjacent et hypoténuse ; cosinus d'un angle aigu ; calculer une longueur (côté adjacent,
   hypoténuse) ; calculer un angle ; problèmes concrets (rampe, échelle, câble). Calculatrice en degrés.
   ============================================================ */
(() => {
const { R, F, T, rmp, ch, chx, geo } = P3;
const DS = PL_DESSINS, illu = plIllu;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
const rad = d => d * Math.PI / 180;
// Triangle ABC rectangle en B, angle marqué en A.
const triA = (cotes, px, ang) => geo({ pts: { A: [10, 130], B: [200, 130], C: [200, 30] }, poly: [[['A', 'B', 'C']]], segs: [['A', 'B'], ['B', 'C'], ['A', 'C']], droits: [['A', 'B', 'C']], arcs: [['B', 'A', 'C', ang || '']], cotes: cotes || [], px: px || 170 });
// Rampe d'accès.
const rampe = DS.fig(200, 104, DS.sol(4, 196, 92) + `<rect x="150" y="62" width="40" height="30" fill="#D5DCE4" stroke="#1F3A5C" stroke-width="1.2"/>` + DS.ln([20, 92], [150, 62], '#2EA8C9', 3.5)
  + DS.ln([20, 92], [150, 92], '#1F3A5C', 1, true) + DS.droit([20, 92], [150, 92], [150, 62]) + DS.angle([150, 92], [20, 92], [150, 62], '?', { r: 30, d: 8 }) + DS.tx([80, 70], '5 m', { c: '#2EA8C9' }) + DS.cote([20, 92], [150, 92], '4,9 m', -9, { dt: 7 }), 175);
// Câble de haubanage d'un mât.
const mat = (() => { const P = [150, 112], H = [150, 14], A = [150 - 100, 112];
  return DS.fig(186, 128, DS.sol(10, 182, 112) + DS.ln(P, H, '#8A93A3', 5) + DS.ln(A, [150, 30], '#1F3A5C', 1.5) + DS.droit(A, P, [150, 30]) + DS.angle(P, A, [150, 30], '50°', { r: 24, d: 10 })
    + DS.tx([92, 60], '12 m', { a: 'end' }) + DS.cote(A, P, '?', -9, { dt: 7 }), 160); })();
PLANCHES['4e|Cosinus'] = [
  { titre: 'Le cosinus d\'un angle aigu', duree: '30 min',
    attendus: ['Repérer l\'hypoténuse et le côté adjacent à un angle', 'Écrire le cosinus d\'un angle aigu', 'Utiliser la calculatrice en mode degrés'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le triangle ABC est rectangle en B. Pour l\'angle Â, entoure.',
        eleve: `<div style="text-align:center;">${triA([], 140)}</div>` + chx([['Hypoténuse :', '[AC]', '[AB] · [BC] · [AC]'], ['Côté adjacent à Â :', '[AB]', '[AB] · [BC] · [AC]']]).eleve,
        corr: `<div style="text-align:center;">${triA([], 140)}</div>` + chx([['Hypoténuse :', '[AC]', '[AB] · [BC] · [AC]'], ['Côté adjacent à Â :', '[AB]', '[AB] · [BC] · [AC]']]).corr },
      { etoiles: 1, col: 1, consigne: 'Entoure l\'écriture de cos Â (triangle rectangle en B).',
        ...chx([['cos Â =', `${T('AB', 'AC')}`, `${T('AB', 'AC')} · ${T('BC', 'AC')} · ${T('AC', 'AB')}`]]) },
      { etoiles: 2, col: 1, consigne: 'À la calculatrice (mode degrés), arrondis au centième.',
        ...rmp([['cos 30° ≈ @', '0,87'], ['cos 45° ≈ @', '0,71'], ['cos 72° ≈ @', '0,31'], ['cos 60° = @', '0,5']]) },
      { etoiles: 2, col: 1, consigne: 'Trouve l\'angle (au degré près).',
        ...rmp([['cos x = 0,5 : x = @°', 60], ['cos x = 0,8 : x ≈ @°', 37], ['cos x = 0,25 : x ≈ @°', 76]]) },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le cosinus d\'un angle aigu est compris entre 0 et 1.', 'vrai'], ['Plus un angle aigu est grand, plus son cosinus est grand.', 'faux'], ['Le cosinus dépend de la taille du triangle.', 'faux']], 'vrai · faux') },
    ] },
  { titre: 'Calculer une longueur avec le cosinus', duree: '35 min',
    attendus: ['Calculer la longueur du côté adjacent', 'Calculer la longueur de l\'hypoténuse', 'Rédiger le calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'ABC est rectangle en B, Â = 40° et AC = 10 cm (au dixième).',
        ...fig(triA([['A', 'C', '10 cm', 1]], 150, '40°'), [['AB = 10 × cos 40° ≈ @ cm', '7,7']]) },
      { etoiles: 2, col: 1, consigne: 'ABC est rectangle en B. Calcule AB (au dixième).',
        ...rmp([['Â = 25°, AC = 8 cm : AB ≈ @ cm', '7,3'], ['Â = 60°, AC = 9 cm : AB = @ cm', '4,5'], ['Â = 52°, AC = 6,5 cm : AB ≈ @ cm', '4']]) },
      { etoiles: 2, consigne: 'ABC est rectangle en B. Calcule l\'hypoténuse AC (au dixième).',
        ...rmp([['Â = 35°, AB = 6 cm : AC ≈ @ cm', '7,3'], ['Â = 60°, AB = 4 cm : AC = @ cm', 8], ['Â = 20°, AB = 12 cm : AC ≈ @ cm', '12,8'], ['Â = 45°, AB = 5 cm : AC ≈ @ cm', '7,1'], ['Â = 50°, AB = 9 cm : AC ≈ @ cm', '14,0'], ['Â = 30°, AB = 10 cm : AC ≈ @ cm', '11,5']]) },
      { etoiles: 3, cahier: true, consigne: 'Le triangle EFG est rectangle en F, avec Ê = 33° et EG = 7,4 cm. Calcule EF, arrondi au millimètre. Rédige.',
        corr: cm1Redac('Cosinus', { suite: [`EFG est rectangle en F, donc cos Ê = ${F('EF', 'EG')}`, `cos 33° = ${F('EF', '7{,}4')}`, 'EF = 7,4 × cos 33° ≈ 6,2'] }, 'EF mesure environ 6,2 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Le triangle RST est rectangle en S, avec R̂ = 48° et RS = 5 cm. Calcule RT, arrondi au millimètre.',
        corr: cm1Redac('Cosinus', { suite: [`RST est rectangle en S, donc cos R̂ = ${F('RS', 'RT')}`, `cos 48° = ${F(5, 'RT')}`, 'RT = 5 : cos 48° ≈ 7,5'] }, 'RT mesure environ 7,5 cm.') },
    ] },
  { titre: 'Calculer un angle avec le cosinus', duree: '30 min',
    attendus: ['Calculer le cosinus à partir de deux longueurs', 'Retrouver l\'angle avec la calculatrice', 'Utiliser la somme des angles d\'un triangle'],
    exos: [
      { etoiles: 1, uneLigne: true, consigne: 'ABC est rectangle en B. Calcule cos Â, puis Â (au degré).',
        ...rmp([['AB = 4, AC = 5 : cos Â = @ ; Â ≈ @°', '0,8', 37], ['AB = 3, AC = 6 : cos Â = @ ; Â = @°', '0,5', 60]]) },
      { etoiles: 2, uneLigne: true, consigne: 'ABC est rectangle en B. Calcule Â, puis Ĉ (au degré).',
        ...rmp([['AB = 7, AC = 10 : Â ≈ @° et Ĉ ≈ @°', 46, 44], ['AB = 9, AC = 15 : Â ≈ @° et Ĉ ≈ @°', 53, 37]]) },
      { etoiles: 2, consigne: 'Entoure la bonne réponse.',
        ...chx([['Si cos Â = 1, alors…', 'ce n\'est pas possible dans un triangle rectangle', 'Â = 90° · Â = 0° · ce n\'est pas possible dans un triangle rectangle'], ['Dans un triangle rectangle, si Â = 30°, l\'autre angle aigu mesure :', '60°', '30° · 60° · 150°']]) },
      { etoiles: 3, cahier: true, consigne: 'KLM est rectangle en L, avec KL = 5,6 cm et KM = 8 cm. Calcule l\'angle K̂, au degré près. Rédige.',
        corr: cm1Redac('Cosinus', { suite: [`KLM est rectangle en L, donc cos K̂ = ${F('KL', 'KM')}`, `cos K̂ = ${F('5{,}6', 8)} = 0,7`, 'K̂ ≈ 46°'] }, 'L\'angle K̂ mesure environ 46°.') },
      { etoiles: 2, uneLigne: true, consigne: 'ABC est rectangle en B. Calcule Â (au degré près).', ...P3.rmp([['AB = 4 cm et AC = 8 cm : Â = @°', 60], ['AB = 7 cm et AC = 10 cm : Â ≈ @°', 46]], 2) },
      { etoiles: 2, consigne: 'Le cosinus d\'un angle aigu est toujours… Entoure.', ...P3.chx([['', 'compris entre 0 et 1', 'compris entre 0 et 1 · plus grand que 1']]) },
    ] },
  { titre: 'Problèmes avec le cosinus', duree: '40 min',
    attendus: ['Repérer le triangle rectangle et l\'angle utile', 'Choisir entre Pythagore et le cosinus', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 2, consigne: 'Entoure l\'outil à utiliser (triangle rectangle).',
        ...chx([['On connaît deux côtés, on cherche le troisième :', 'Pythagore', 'Pythagore · cosinus'], ['On connaît l\'hypoténuse et un angle aigu, on cherche le côté adjacent :', 'cosinus', 'Pythagore · cosinus'], ['On connaît deux côtés, on cherche un angle :', 'cosinus', 'Pythagore · cosinus']]) },
      { etoiles: 2, cahier: true, consigne: illu(rampe, 'Une rampe d\'accès de 5 m de long couvre une distance horizontale de 4,9 m. Quel angle fait-elle avec le sol ? Arrondis au dixième de degré.'),
        corr: cm1Redac('Cosinus', { suite: [`cos a = ${F('4{,}9', 5)} = 0,98`, 'a ≈ 11,5°'] }, 'La rampe fait un angle d\'environ 11,5° avec le sol.') },
      { etoiles: 3, cahier: true, consigne: illu(mat, 'Un câble de 12 m relie le haut d\'un mât vertical à un point du sol. Il fait un angle de 50° avec le sol. À quelle distance du pied du mât le câble est-il fixé au sol ? Arrondis au centimètre.'),
        corr: cm1Redac('Cosinus', { suite: [`cos 50° = ${F('d', 12)}`, 'd = 12 × cos 50° ≈ 7,71'] }, 'Le câble est fixé à environ 7,71 m du pied du mât.') },
      { etoiles: 3, cahier: true, consigne: 'Une échelle de 3,5 m est appuyée contre un mur. Pour être stable, elle doit faire avec le sol un angle compris entre 65° et 75°. Son pied est à 1,2 m du mur. Est-elle bien placée ?',
        corr: cm1Redac('Angle avec le sol', { suite: [`cos a = ${F('1{,}2', '3{,}5')} ≈ 0,343`, 'a ≈ 70°'] }, 'L\'angle est d\'environ 70°, entre 65° et 75° : l\'échelle est bien placée.') },
    ] },
];
})();

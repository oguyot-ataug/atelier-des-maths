/* ============================================================
   5e · Planches : Puissances (N7)
   Carré et cube, carrés de 0 à 12 et cube de 10, écrire un nombre comme une puissance, priorités,
   expressions littérales avec une puissance simple, problèmes d'aire et de volume.
   Relecture 5e-N7 (30/10/2026) : à l'écran, les exposants se complètent dans une case en exposant (comme en 3e),
   « 6 × 6 » tapé au clavier est accepté (planches-num.js) ; vrai ou faux en tableau ; « 64 de deux façons » devient
   « sous la forme d'un carré, puis d'un cube » (une seule réponse juste pour chaque case). Planche 2 : l'élève écrit
   aussi l'exposant, rien n'est imprimé d'avance -- relecture du 30/10 : « pourquoi avoir ajouté les puissances ? Il faut
   laisser l'élève les écrire ». Planche 3 : corrigés des calculs sans titre, la première ligne est le calcul demandé.
   Planche 4 : six questions sur deux colonnes à l'exercice 1 ; l'exercice 2 (côté d'un carré de 81 m²) devient un calcul d'aire à partir
   du périmètre -- relecture : « une réponse qui n'est pas le résultat d'un calcul ».
   ============================================================ */
(() => {
const T = cm1Tex, R = P3.R, B = P3.B;
// Calcul en colonne sans titre : la première ligne est toujours le calcul demandé, le résultat encadré -- relecture
// 5e-N7-P3-E2 et E4 : « Pas la peine d'écrire B : … ni la phrase réponse. La première ligne de calcul doit toujours être
// celle du calcul demandé. » [[nom, [lignes]], …], phrase facultative (quand la question en demande une).
const etapes = (calcs, phrase) => `<div class="cm-redac">${calcs.map(([nom, lignes]) => `<table class="cm-redac-col">${lignes.map((l, i) => `<tr><td>${nom}</td><td>=</td><td>${i === lignes.length - 1 ? `<span class="cm-encadre">${T(l)}</span>` : T(l)}</td></tr>`).join('')}</table>`).join('')}${phrase ? `<p class="cm-redac-phrase">${phrase}</p>` : ''}</div>`;
PLANCHES['5e|Puissances'] = [
  { titre: 'Carré et cube d\'un nombre', duree: '30 min',
    attendus: ['Comprendre les notations a² et a³', 'Connaître les carrés de 0 à 12 et le cube de 10'],
    exos: [
      { etoiles: 1, uneLigne: true, consigne: 'Écris sous la forme d\'un produit, puis calcule.', ...P3.rmp([[`${T('6^2')} = @ = @`, T('6 \\times 6'), 36], [`${T('4^3')} = @ = @`, T('4 \\times 4 \\times 4'), 64], [`${T('0{,}3^2')} = @ = @`, T('0{,}3 \\times 0{,}3'), '0,09']], 5) },
      { etoiles: 1, col: 1, consigne: 'Complète sans calculatrice.', ...P3.rmp([[`${T('7^2')} = @`, 49], [`${T('11^2')} = @`, 121], [`${T('12^2')} = @`, 144], [`${T('10^3')} = @`, '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Écris avec une puissance.', ...P3.rmp([['5 × 5 = @<sup>@</sup>', 5, 2], ['2 × 2 × 2 = @<sup>@</sup>', 2, 3], ['9 × 9 = @<sup>@</sup>', 9, 2], ['7 × 7 × 7 = @<sup>@</sup>', 7, 3]], 2) },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.', ...P3.chxTab([[T('3^2 = 6'), 'faux', 'vrai · faux'], [T('10^2 = 100'), 'vrai', 'vrai · faux'], [T('2^3 = 3^2'), 'faux', 'vrai · faux'], [T('1^3 = 1'), 'vrai', 'vrai · faux']]) },
      { etoiles: 3, cahier: true, consigne: 'Léa dit : « 5² = 10 ». Explique son erreur.', corr: cm1Redac('L\'erreur de Léa', T('5^2 = 5 \\times 5 = 25'), 'Léa a calculé 5 × 2. Le carré de 5, c\'est 5 multiplié par lui-même : 25.') },
    ] },
  { titre: 'Écrire un nombre comme une puissance', duree: '25 min',
    attendus: ['Écrire un nombre sous la forme d\'un carré ou d\'un cube'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'un carré.', ...P3.rmp([['36 = @<sup>@</sup>', 6, 2], ['81 = @<sup>@</sup>', 9, 2], ['100 = @<sup>@</sup>', 10, 2], ['144 = @<sup>@</sup>', 12, 2]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris sous la forme d\'un cube.', ...P3.rmp([['27 = @<sup>@</sup>', 3, 3], ['125 = @<sup>@</sup>', 5, 3], ['1 000 = @<sup>@</sup>', 10, 3], ['8 = @<sup>@</sup>', 2, 3]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris 64 sous la forme d\'un carré, puis sous la forme d\'un cube.', ...P3.rmp([['64 = @<sup>@</sup> = @<sup>@</sup>', 8, 2, 4, 3]], 2) },
      { etoiles: 3, col: 1, consigne: 'Entre quels carrés consécutifs se trouve chaque nombre ?', ...P3.rmp([['@<sup>@</sup> &lt; 50 &lt; @<sup>@</sup>', 7, 2, 8, 2], ['@<sup>@</sup> &lt; 130 &lt; @<sup>@</sup>', 11, 2, 12, 2]], 2) },
    ] },
  { titre: 'Calculer avec des puissances', duree: '35 min',
    attendus: ['Respecter les priorités : puissances, puis multiplications, puis additions', 'Calculer une expression littérale avec une puissance'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([[`${T('3 + 2^2')} = @`, 7], [`${T('2 \\times 5^2')} = @`, 50], [`${T('(2 \\times 5)^2')} = @`, 100], [`${T('6^2 - 2^3')} = @`, 28]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Calcule B = 4 + 3 × 2³ en écrivant les étapes.', corr: etapes([['B', ['4 + 3 \\times 2^3', '4 + 3 \\times 8', '4 + 24', '28']]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule pour x = 3.', ...P3.rmp([[`${T('x^2')} = @`, 9], [`${T('2x^2')} = @`, 18], [`${T('x^2 + x')} = @`, 12], [`${T('x^3 - 1')} = @`, 26]], 3) },
      { etoiles: 3, cahier: true, consigne: 'Calcule C = (5 + 4)² et D = 5² + 4². Les résultats sont-ils égaux ?', corr: etapes([['C', ['(5 + 4)^2', '9^2', '81']], ['D', ['5^2 + 4^2', '25 + 16', '41']]], 'Non : C = 81 et D = 41. Le carré d\'une somme n\'est pas la somme des carrés.') },
    ] },
  { titre: 'Problèmes : aires et volumes', duree: '30 min',
    attendus: ['Utiliser le carré pour l\'aire d\'un carré et le cube pour le volume d\'un cube'],
    exos: [
      { etoiles: 1, consigne: 'Complète.', ...P3.rmp([['Carré de côté 8 cm : aire = @ cm²', 64], ['Carré de côté 5 cm : aire = @ cm²', 25], ['Carré de côté 12 m : aire = @ m²', 144], ['Cube d\'arête 4 cm : volume = @ cm³', 64], ['Cube d\'arête 3 cm : volume = @ cm³', 27], ['Cube d\'arête 5 cm : volume = @ cm³', 125]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Un carré a un périmètre de 36 m. Calcule son aire.', corr: cm1Redac('Aire du carré', { suite: [`Côté : ${T('36 \\div 4 = 9')} m`, `Aire : ${T('9^2 = 9 \\times 9 = 81')} m²`] }, 'L\'aire du carré est 81 m².') },
      { etoiles: 3, cahier: true, consigne: 'Un aquarium a la forme d\'un cube de 30 cm d\'arête. Combien de litres d\'eau peut-il contenir ? (1 L = 1 000 cm³)', corr: cm1Redac('Contenance de l\'aquarium', { suite: [T('30^3 = 30 \\times 30 \\times 30 = 27\\,000'), '27 000 cm³ = 27 L'] }, 'L\'aquarium peut contenir 27 L d\'eau.') },
    ] },
];
})();

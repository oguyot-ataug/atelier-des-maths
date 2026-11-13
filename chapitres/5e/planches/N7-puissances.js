/* ============================================================
   5e · Planches : Puissances (N7)
   Carré et cube, carrés de 0 à 12 et cube de 10, écrire un nombre comme une puissance, priorités,
   expressions littérales avec une puissance simple, problèmes d'aire et de volume.
   Relecture 5e-N7 (30/10/2026) : à l'écran, les exposants se complètent dans une case en exposant (comme en 3e),
   « 6 × 6 » tapé au clavier est accepté (planches-num.js) ; vrai ou faux en tableau ; « 64 de deux façons » devient
   « sous la forme d'un carré, puis d'un cube » (une seule réponse juste pour chaque case). Planche 2 : l'élève écrit
   aussi l'exposant, rien n'est imprimé d'avance -- relecture du 30/10 : « pourquoi avoir ajouté les puissances ? Il faut
   laisser l'élève les écrire ». Planche 3 : corrigés des calculs sans titre, la première ligne est le calcul demandé.
   Planche 4 refaite le 13/11/2026 (feuille trop vide). Avant : six questions sur deux colonnes à l'exercice 1 ; l'exercice 2 (côté d'un carré de 81 m²) devient un calcul d'aire à partir
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
      { etoiles: 2, consigne: 'Complète par = ou ≠.', ...P3.egal([[T('3^2'), '6', 0], [T('10^2'), '100', 1], [T('2^3'), T('3^2'), 0], [T('1^3'), '1', 1], [T('2^4'), T('4^2'), 1], [T('5^2'), '10', 0]], 3) },
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
  // Refaite le 13/11/2026 (« Que penses-tu de cette planche ? » : trois exercices, feuille presque vide, puissances peu présentes) :
  // la puissance s'écrit (8², 4³), unités cm / cm² / cm³, tableau d'un cube, problèmes rédigés en colonne, effet du doublement de l'arête.
  // Pas de « retrouve le côté à partir de l'aire » (relecture antérieure : « une réponse qui n'est pas le résultat d'un calcul »).
  { titre: 'Problèmes : aires et volumes', duree: '40 min',
    attendus: ['Écrire une aire avec un carré et un volume avec un cube', 'Distinguer cm, cm² et cm³', 'Résoudre un problème d\'aire ou de volume'],
    exos: [
      { etoiles: 1, uneLigne: true, consigne: 'Écris l\'aire A ou le volume V avec une puissance, puis calcule.',
        ...P3.rmp([['Carré de côté 8 cm : A = @<sup>@</sup> = @ cm²', 8, 2, 64], ['Carré de côté 5 cm : A = @<sup>@</sup> = @ cm²', 5, 2, 25], ['Carré de côté 12 m : A = @<sup>@</sup> = @ m²', 12, 2, 144],
          ['Cube d\'arête 4 cm : V = @<sup>@</sup> = @ cm³', 4, 3, 64], ['Cube d\'arête 3 cm : V = @<sup>@</sup> = @ cm³', 3, 3, 27], ['Cube d\'arête 10 cm : V = @<sup>@</sup> = @ cm³', 10, 3, '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète par cm, cm² ou cm³.',
        ...(() => { const l = [['Côté d\'un carré : 5', 'cm'], ['Aire d\'une face d\'un dé : 4', 'cm²'], ['Volume d\'une boîte : 1 000', 'cm³'], ['Périmètre d\'un carré : 20', 'cm'], ['Aire d\'un timbre : 6', 'cm²']];
          return { eleve: plListe(l.map(([t]) => `${t} ${plCase('cm|cm²|cm³')}`)), corr: plListe(l.map(([t, r]) => `${t} ${R(r)}`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau pour un cube.',
        ...(() => { const L = [['Arête (cm)', '2', '3', '5', '10'], ['Aire d\'une face (cm²)', '@', '@', '@', '@'], ['Volume (cm³)', '@', '@', '@', '@']], r = [4, 9, 25, 100, 8, 27, 125, '1 000'];
          return { eleve: P3.tab(L, false), corr: P3.tab(L, true, r) }; })() },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un carré a un périmètre de 36 m. Calcule son aire.',
        corr: cm1Redac('Côté du carré', [{ nom: 'C', lignes: ['36 : 4', '9'] }], 'Le côté mesure 9 m.') + cm1Redac('Aire du carré', [{ nom: 'A', lignes: [T('9^2'), '9 × 9', '81'] }], 'L\'aire du carré est 81 m².') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un aquarium a la forme d\'un cube de 30 cm d\'arête. Combien de litres d\'eau peut-il contenir ? (1 L = 1 000 cm³)',
        corr: cm1Redac('Volume de l\'aquarium', [{ nom: 'V', lignes: [T('30^3'), '30 × 30 × 30', '27 000'] }], 'Le volume de l\'aquarium est 27 000 cm³.') + cm1Redac('Contenance en litres', [{ nom: 'L', lignes: ['27 000 : 1 000', '27'] }], 'L\'aquarium peut contenir 27 L d\'eau.') },
      { etoiles: 3, cahier: true, consigne: 'On double l\'arête d\'un cube de 3 cm : elle passe à 6 cm. Par combien le volume du cube est-il multiplié ? Et l\'aire d\'une face ?',
        corr: plCote(cm1Redac('Volume du petit cube', [{ nom: 'V<sub>1</sub>', lignes: [T('3^3'), '3 × 3 × 3', '27'] }], 'Le petit cube a un volume de 27 cm³.')
            + cm1Redac('Volume du grand cube', [{ nom: 'V<sub>2</sub>', lignes: [T('6^3'), '6 × 6 × 6', '216'] }], 'Le grand cube a un volume de 216 cm³.')
            + cm1Redac('Coefficient pour le volume', [{ nom: 'k', lignes: ['216 : 27', '8'] }], `Le volume est multiplié par 8, c'est-à-dire ${T('2^3')}.`),
          cm1Redac('Aire d\'une face du petit cube', [{ nom: 'A<sub>1</sub>', lignes: [T('3^2'), '3 × 3', '9'] }], 'Une face du petit cube mesure 9 cm².')
            + cm1Redac('Aire d\'une face du grand cube', [{ nom: 'A<sub>2</sub>', lignes: [T('6^2'), '6 × 6', '36'] }], 'Une face du grand cube mesure 36 cm².')
            + cm1Redac('Coefficient pour l\'aire', [{ nom: 'k\'', lignes: ['36 : 9', '4'] }], `L'aire d'une face est multipliée par 4, c'est-à-dire ${T('2^2')}.`)) },
    ] },
  { titre: 'Automatismes', duree: '20 min',
    attendus: ['Connaître les carrés et les cubes usuels', 'Écrire un produit sous forme de puissance', 'Calculer avec des puissances'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['7<sup>2</sup> = @', 49], ['11<sup>2</sup> = @', 121], ['0,3<sup>2</sup> = @', '0,09'], ['12<sup>2</sup> = @', 144]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['2<sup>3</sup> = @', 8], ['3<sup>3</sup> = @', 27], ['10<sup>3</sup> = @', '1 000'], ['0,1<sup>3</sup> = @', '0,001']]) },
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'une puissance.', ...P3.rmp([['5 × 5 × 5 × 5 = @', '5<sup>4</sup>'], ['7 × 7 = @', '7<sup>2</sup>'], ['2 × 2 × 2 × 2 × 2 × 2 = @', '2<sup>6</sup>'], ['10 × 10 × 10 = @', '10<sup>3</sup>']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['10<sup>2</sup> = @', 100], ['10<sup>4</sup> = @', '10 000'], ['10<sup>6</sup> = @', '1 000 000'], ['10<sup>1</sup> = @', 10]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule en respectant les priorités.', ...P3.rmp([['2 + 3<sup>2</sup> = @', 11], ['(2 + 3)<sup>2</sup> = @', 25], ['2 × 4<sup>2</sup> = @', 32], ['(2 × 4)<sup>2</sup> = @', 64]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Aire d\'un carré de côté 6 cm : @ cm²', 36], ['Volume d\'un cube d\'arête 4 cm : @ cm³', 64], ['Côté d\'un carré d\'aire 81 cm² : @ cm', 9]]) },
    ] },
];
})();

/* ============================================================
   4e · Planches : Probabilités (D3)
   Vocabulaire (expérience aléatoire, issues, évènements) ; probabilité dans une situation
   d'équiprobabilité ; évènement contraire ; fréquences et probabilités.
   ============================================================ */
(() => {
const { R, F, T, ligne, rmp, ch, chx } = P3, Fr = plFrac();
const DS = PL_DESSINS, illu = plIllu;
const K = '#1F3A5C';
// Urne : 5 boules rouges, 3 vertes, 2 bleues.
const urne = (() => { const cols = ['#E35D3A', '#E35D3A', '#E35D3A', '#E35D3A', '#E35D3A', '#2E9C6A', '#2E9C6A', '#2E9C6A', '#2EA8C9', '#2EA8C9'];
  const pos = [[40, 96], [62, 98], [84, 96], [106, 94], [50, 76], [72, 78], [94, 76], [116, 78], [60, 56], [86, 58]];
  return DS.fig(150, 116, `<path d="M24,30 Q20,108 76,112 Q132,108 128,30 Z" fill="#F3F6FA" stroke="${K}" stroke-width="1.8"/><ellipse cx="76" cy="30" rx="52" ry="8" fill="#E6EEF6" stroke="${K}" stroke-width="1.6"/>`
    + pos.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="9" fill="${cols[i]}" stroke="${K}" stroke-width="1"/>`).join(''), 120); })();
// Roue de loterie : 8 secteurs égaux, numérotés de 1 à 8.
const roue = (() => { const cx = 60, cy = 60, r = 52, coul = ['#F6C343', '#9CC8E8', '#F2B8C9', '#BFE3B0']; let g = '';
  for(let k = 0; k < 8; k++){ const a1 = (k * 45 - 90) * Math.PI / 180, a2 = ((k + 1) * 45 - 90) * Math.PI / 180, am = (a1 + a2) / 2;
    g += `<path d="M${cx},${cy} L${(cx + r * Math.cos(a1)).toFixed(1)},${(cy + r * Math.sin(a1)).toFixed(1)} A${r},${r} 0 0 1 ${(cx + r * Math.cos(a2)).toFixed(1)},${(cy + r * Math.sin(a2)).toFixed(1)} Z" fill="${coul[k % 4]}" stroke="${K}" stroke-width="1.2"/>` + DS.tx([cx + r * .68 * Math.cos(am), cy + r * .68 * Math.sin(am) + 4], String(k + 1), { fs: 12 }); }
  return DS.fig(124, 132, g + `<circle cx="${cx}" cy="${cy}" r="4" fill="${K}"/><path d="M${cx - 6},4 L${cx + 6},4 L${cx},14 Z" fill="#E35D3A"/>`.replace(/4 L/, '0 L').replace(`L${cx + 6},4`, `L${cx + 6},0`) + DS.tx([60, 126], 'roue équilibrée', { fs: 9 }), 104); })();
PLANCHES['4e|Probabilités'] = [
  { titre: 'Le vocabulaire des probabilités', duree: '25 min',
    attendus: ['Reconnaître une expérience aléatoire', 'Lister les issues', 'Décrire un évènement, un évènement impossible ou certain'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Est-ce une expérience aléatoire ? Entoure.',
        ...ch([['Lancer un dé et noter le résultat :', 'oui'], ['Calculer 3 × 4 :', 'non'], ['Tirer une carte dans un jeu mélangé :', 'oui'], ['Mesurer la longueur de sa table :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Entoure.',
        ...chx([['« Obtenir 7 » est un évènement…', 'impossible', 'impossible · certain · possible'], ['« Obtenir un nombre inférieur à 7 » est un évènement…', 'certain', 'impossible · certain · possible'], ['« Obtenir un nombre pair » est un évènement…', 'possible', 'impossible · certain · possible']]) },
      { etoiles: 2, col: 1, consigne: 'On fait tourner la roue (8 secteurs égaux). Écris les issues qui réalisent l\'évènement.',
        eleve: `<div style="text-align:center;">${roue}</div>` + rmp([['« Obtenir un multiple de 3 » : @', '3 ; 6'], ['« Obtenir un nombre premier » : @', '2 ; 3 ; 5 ; 7'], ['Contraire de « obtenir plus de 5 » : @', '1 ; 2 ; 3 ; 4 ; 5']], 6).eleve,
        corr: `<div style="text-align:center;">${roue}</div>` + rmp([['« Obtenir un multiple de 3 » : @', '3 ; 6'], ['« Obtenir un nombre premier » : @', '2 ; 3 ; 5 ; 7'], ['Contraire de « obtenir plus de 5 » : @', '1 ; 2 ; 3 ; 4 ; 5']], 6).corr },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une probabilité est toujours comprise entre 0 et 1.', 'vrai'], ['Un évènement certain a une probabilité de 1.', 'vrai'], ['Une probabilité peut valoir 1,5.', 'faux']], 'vrai · faux') },
    ] },
  { titre: 'Calculer une probabilité', duree: '35 min',
    attendus: ['Calculer une probabilité quand les issues sont équiprobables', 'Écrire une probabilité sous forme de fraction, de décimal, de pourcentage', 'Calculer la probabilité de l\'évènement contraire'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé équilibré à 6 faces. Donne la probabilité (fraction irréductible).',
        eleve: plListe([ligne('P(obtenir 4) =', Fr), ligne('P(obtenir un nombre pair) =', Fr), ligne('P(obtenir au moins 5) =', Fr)]),
        corr: plListe([ligne('P(obtenir 4) =', R(F(1, 6))), ligne('P(obtenir un nombre pair) =', F(3, 6), '=', R(F(1, 2))), ligne('P(obtenir au moins 5) =', F(2, 6), '=', R(F(1, 3)))]) },
      { etoiles: 2, col: 1, consigne: 'On tire une boule au hasard dans cette urne.',
        eleve: `<div style="text-align:center;">${urne}</div>` + plListe([ligne('P(rouge) =', Fr), ligne('P(verte) =', Fr), ligne('P(pas bleue) =', Fr), ligne('P(jaune) =', P3.B(3))]),
        corr: `<div style="text-align:center;">${urne}</div>` + plListe([ligne('P(rouge) =', F(5, 10), '=', R(F(1, 2))), ligne('P(verte) =', R(F(3, 10))), ligne('P(pas bleue) =', F(8, 10), '=', R(F(4, 5))), ligne('P(jaune) =', R('0'))]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Si P(A) = 0,3, alors P(non A) = @', '0,7'], ['Si P(A) = 45 %, alors P(non A) = @ %', 55], ['Une probabilité de 0,25 s\'écrit aussi @ %', 25]]) },
      { etoiles: 3, cahier: true, consigne: 'Dans un jeu de 32 cartes, on tire une carte au hasard. Quelle est la probabilité de tirer un as ? un cœur ? une carte qui n\'est pas un cœur ?',
        corr: cm1Redac('Un as', `4 as sur 32 cartes : ${F(4, 32)} = ${F(1, 8)}`, `La probabilité de tirer un as est ${F(1, 8)}.`) + cm1Redac('Un cœur', `8 cœurs sur 32 cartes : ${F(8, 32)} = ${F(1, 4)}`, `La probabilité de tirer un cœur est ${F(1, 4)}.`) + cm1Redac('Pas un cœur', `1 − ${F(1, 4)} = ${F(3, 4)}`, `La probabilité de ne pas tirer un cœur est ${F(3, 4)}.`) },
    ] },
  { titre: 'Des fréquences aux probabilités', duree: '30 min',
    attendus: ['Calculer une fréquence', 'Comprendre que la fréquence se rapproche de la probabilité quand on répète l\'expérience', 'Estimer une probabilité inconnue'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On a lancé une pièce 50 fois et obtenu 22 fois « pile ».',
        ...rmp([['Fréquence de « pile » : @', '0,44'], ['Probabilité d\'obtenir « pile » : @', '0,5']]) },
      { etoiles: 2, col: 1, consigne: 'On a lancé un dé 600 fois ; le 6 est sorti 95 fois.',
        ...rmp([['Fréquence du 6 (au centième) : @', '0,16'], ['Probabilité d\'obtenir 6 (au centième) : @', '0,17'], ['Nombre de 6 « attendu » sur 600 lancers : @', 100]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['Quand on répète une expérience un grand nombre de fois, la fréquence d\'une issue…', 'se rapproche de sa probabilité', 'est toujours égale à sa probabilité · se rapproche de sa probabilité · n\'a aucun lien avec sa probabilité']]) },
      { etoiles: 3, cahier: true, consigne: 'Une urne contient 40 billes, rouges ou noires. On fait 500 tirages avec remise et on obtient 150 fois une bille rouge. Estime le nombre de billes rouges dans l\'urne.',
        corr: cm1Redac('Fréquence', '150 : 500 = 0,3', 'La fréquence de « rouge » est 0,3 : la probabilité de tirer une rouge est proche de 0,3.') + cm1Redac('Nombre de billes rouges', '40 × 0,3 = 12', 'Il y a probablement environ 12 billes rouges dans l\'urne.') },
      { etoiles: 1, col: 1, consigne: 'Calcule la fréquence (en écriture décimale).', ...P3.rmp([['30 « pile » sur 50 lancers : @', '0,6'], ['12 fois le 6 sur 60 lancers : @', '0,2']], 2) },
      { etoiles: 2, col: 1, consigne: 'Quand on fait beaucoup de lancers, la fréquence se rapproche… Entoure.', ...P3.chx([['', 'de la probabilité', 'de la probabilité · de 0 · de 1']]) },
    ] },
  { titre: 'Problèmes de probabilités', duree: '35 min',
    attendus: ['Comparer des probabilités pour choisir', 'Rédiger un calcul de probabilité', 'Justifier une réponse'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Quel jeu offre la meilleure chance de gagner ? Entoure.',
        ...chx([[`Jeu A : obtenir 5 ou 6 avec un dé. Jeu B : tirer une boule rouge dans une urne de 2 rouges et 4 noires.`, 'c\'est pareil', 'le jeu A · le jeu B · c\'est pareil'], [`Jeu C : obtenir un nombre pair avec un dé. Jeu D : tirer un cœur dans un jeu de 32 cartes.`, 'le jeu C', 'le jeu C · le jeu D · c\'est pareil']]) },
      { etoiles: 2, col: 1, consigne: 'Un sac contient 4 jetons verts, 6 jetons rouges et des jetons bleus. La probabilité de tirer un jeton bleu est 0,5.',
        ...rmp([['Nombre de jetons bleus : @', 10], ['Nombre total de jetons : @', 20], ['P(vert) = @', '0,2']]) },
      { etoiles: 3, cahier: true, consigne: illu(roue, 'À la fête foraine, on gagne si la roue s\'arrête sur un nombre premier. Léo dit : « J\'ai plus d\'une chance sur deux de gagner. » A-t-il raison ?'),
        corr: cm1Redac('Issues gagnantes', 'Nombres premiers de 1 à 8 : 2 ; 3 ; 5 ; 7', '4 issues gagnantes sur 8.') + cm1Redac('Probabilité', `${F(4, 8)} = ${F(1, 2)}`, 'Léo a exactement une chance sur deux de gagner, pas plus : il a tort.') },
      { etoiles: 3, cahier: true, consigne: 'Une urne contient 5 boules rouges, 3 vertes et 2 bleues. Combien de boules bleues faut-il ajouter pour que la probabilité de tirer une boule bleue soit 0,5 ?',
        corr: cm1Redac('Mise en équation', { suite: ['Avec x boules ajoutées : 2 + x bleues sur 10 + x boules.', 'Il faut autant de bleues que d\'autres boules : 2 + x = 8', 'x = 6'] }, 'Il faut ajouter 6 boules bleues (8 bleues sur 16 boules).') },
    ] },
];
})();

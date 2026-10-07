/* ============================================================
   5e · Planches : Divisibilité (N1)
   Multiples et diviseurs, critères de divisibilité par 2, 3, 4, 5, 9 et 10, problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Ligne à trous : les @ sont remplacés dans l'ordre par les réponses.
const trous = (t, reps, n) => { let i = 0, j = 0; return { e: t.replace(/@/g, () => B(n || 2)), c: t.replace(/@/g, () => R(reps[j++])) }; };
const rmpM = (l, n) => { const r = l.map(([t, reps]) => trous(t, [].concat(reps), n)); return { eleve: plListe(r.map(x => x.e)), corr: plListe(r.map(x => x.c)) }; };
// Grille de nombres : on entoure ceux qui vérifient f.
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const entoure = (l, f, cols) => ({ eleve: plGrille(l.map(fmt), cols || 4), corr: plGrille(l.map(n => f(n) ? plEntoure(fmt(n)) : fmt(n)), cols || 4) });
PLANCHES['5e|Divisibilité'] = [
  { titre: 'Multiples et diviseurs', duree: '35 min',
    attendus: ['Reconnaître qu\'un nombre est un multiple ou un diviseur d\'un autre', 'Lister les multiples d\'un nombre', 'Trouver tous les diviseurs d\'un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète les listes de multiples.',
        ...rmpM([['Multiples de 7 : 7 ; @ ; 21 ; @ ; @', [14, 28, 35]], ['Multiples de 12 : 12 ; @ ; @ ; 48 ; @', [24, 36, 60]], ['Multiples de 25 : 25 ; @ ; 75 ; @ ; @', [50, 100, 125]]], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure les multiples de 6.', ...entoure([12, 26, 36, 40, 54, 60, 63, 72, 81, 96, 100, 108], n => n % 6 === 0) },
      { etoiles: 1, col: 1, consigne: 'Complète, puis conclus.',
        ...rmpM([['48 = 6 × @ : 48 est un multiple de 6.', [8]], ['91 = 7 × @ : 7 est un diviseur de 91.', [13]], ['120 = @ × 15 : 15 divise 120.', [8]], ['@ = 9 × 11 : 99 est divisible par 9.', [99]]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la liste de tous les diviseurs.',
        ...rmpM([['Diviseurs de 24 : 1 ; 2 ; @ ; 4 ; @ ; 8 ; @ ; 24', [3, 6, 12]], ['Diviseurs de 30 : 1 ; @ ; 3 ; @ ; 6 ; @ ; 15 ; 30', [2, 5, 10]], ['Diviseurs de 49 : 1 ; @ ; 49', [7]]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['54 est un multiple de 9 :', 'vrai'], ['8 est un diviseur de 52 :', 'faux'], ['1 est un diviseur de tous les nombres entiers :', 'vrai'], ['0 est un multiple de 5 :', 'vrai'], ['17 a exactement deux diviseurs :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon mot.',
        ...ch([['35 … de 7 :', 'est un multiple'], ['4 … de 28 :', 'est un diviseur'], ['100 … de 25 :', 'est un multiple'], ['9 … de 81 :', 'est un diviseur']], 'est un multiple · est un diviseur') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris la liste de tous les diviseurs de 36, puis de 60. Quels sont leurs diviseurs communs ?',
        corr: cm1Redac('Diviseurs', { suite: ['Diviseurs de 36 : 1 ; 2 ; 3 ; 4 ; 6 ; 9 ; 12 ; 18 ; 36', 'Diviseurs de 60 : 1 ; 2 ; 3 ; 4 ; 5 ; 6 ; 10 ; 12 ; 15 ; 20 ; 30 ; 60'] }, 'Les diviseurs communs sont 1, 2, 3, 4, 6 et 12 ; le plus grand est 12.') },
    ] },
  { titre: 'Critères de divisibilité par 2, 5 et 10', duree: '30 min',
    attendus: ['Reconnaître un nombre divisible par 2 (chiffre des unités pair)', 'Reconnaître un nombre divisible par 5 (unités 0 ou 5) ou par 10 (unités 0)', 'Utiliser plusieurs critères en même temps'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure les nombres divisibles par 2.', ...entoure([134, 207, 590, 723, 888, 47, 1000, 9135], n => n % 2 === 0) },
      { etoiles: 1, col: 1, consigne: 'Entoure les nombres divisibles par 5.', ...entoure([75, 102, 340, 555, 1004, 2025, 606, 9990], n => n % 5 === 0) },
      { etoiles: 1, col: 1, consigne: 'Le nombre est-il divisible par 10 ? Entoure.',
        ...ch([['4 500 :', 'oui'], ['3 205 :', 'non'], ['70 :', 'oui'], ['1 001 :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Trouve le chiffre des unités manquant.',
        ...rmpM([['47… est divisible par 10 : 47@', [0]], ['38… est divisible par 5 et pair : 38@', [0]], ['52… est divisible par 5 et impair : 52@', [5]], ['6 01… est divisible par 2 et par 5 : 6 01@', [0]]], 1) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un nombre divisible par 10 est divisible par 2 et par 5 :', 'vrai'], ['Un nombre divisible par 5 est divisible par 10 :', 'faux'], ['Un nombre qui finit par 5 est impair :', 'vrai'], ['2 × 7 × 5 est divisible par 10 :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Écris le plus petit nombre de trois chiffres…',
        ...rmpM([['divisible par 5 : @', [100]], ['impair et divisible par 5 : @', [105]], ['divisible par 2, mais pas par 10 : @', [102]], ['divisible par 10, avec trois chiffres différents : @', [120]]], 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Léo a entre 60 et 80 billes. S\'il les range par 2, il n\'en reste aucune ; par 5, il n\'en reste aucune non plus ; par 3, non plus. Combien a-t-il de billes ?',
        corr: cm1Redac('Nombre de billes', { suite: ['Divisible par 2 et par 5, donc par 10 : 60 ; 70 ou 80.', '60 = 3 × 20 est divisible par 3 ; 70 et 80 ne le sont pas.'] }, 'Léo a 60 billes.') },
    ] },
  { titre: 'Critères de divisibilité par 3, 9 et 4', duree: '40 min',
    attendus: ['Utiliser la somme des chiffres pour la divisibilité par 3 et par 9', 'Utiliser les deux derniers chiffres pour la divisibilité par 4', 'Justifier une divisibilité par une phrase'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la somme des chiffres, puis conclus.',
        ...rmpM([['471 : somme @ ; divisible par 3 ? @', [12, 'oui']], ['2 018 : somme @ ; divisible par 3 ? @', [11, 'non']], ['5 616 : somme @ ; divisible par 9 ? @', [18, 'oui']], ['3 330 : somme @ ; divisible par 9 ? @', [9, 'oui']]], 3) },
      { etoiles: 1, col: 1, consigne: 'Entoure les nombres divisibles par 3.', ...entoure([45, 58, 111, 202, 333, 1002, 2222, 4005], n => n % 3 === 0) },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 9.', ...entoure([81, 108, 207, 3330, 4444, 9909, 12345, 18018], n => n % 9 === 0) },
      { etoiles: 2, col: 1, consigne: 'Divisible par 4 ? Regarde le nombre formé par les deux derniers chiffres. Entoure.',
        ...ch([['1 316 (16 = 4 × 4) :', 'oui'], ['2 542 :', 'non'], ['7 100 :', 'oui'], ['938 :', 'non'], ['5 024 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Remplace … par un chiffre pour que le nombre soit divisible par 9.',
        ...rmpM([['4…6 → 4@6', [8]], ['26… → 26@', [1]], ['1…34 → 1@34', [1]], ['8…8 → 8@8', [2]]], 1) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un nombre divisible par 9 est divisible par 3 :', 'vrai'], ['Un nombre divisible par 3 est divisible par 9 :', 'faux'], ['La somme des chiffres de 999 999 est 54 : il est divisible par 9 :', 'vrai'], ['234 est divisible par 2, par 3 et par 9 :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Justifie, en citant le critère, que 7 515 est divisible par 5 et par 9 mais pas par 2.',
        corr: cm1Redac('Justification', { suite: ['Son chiffre des unités est 5 : 7 515 est divisible par 5 mais pas par 2 (5 est impair).', 'La somme de ses chiffres est 7 + 5 + 1 + 5 = 18, et 18 est divisible par 9.'] }, '7 515 est donc divisible par 5 et par 9, mais pas par 2.') },
    ] },
  { titre: 'Résoudre des problèmes de divisibilité', duree: '40 min',
    attendus: ['Faire le lien entre divisibilité et reste nul', 'Utiliser multiples et diviseurs pour partager ou grouper', 'Chercher un nombre avec plusieurs conditions'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le reste de la division euclidienne est-il nul ? Entoure.',
        ...ch([['126 divisé par 7 :', 'oui'], ['145 divisé par 6 :', 'non'], ['208 divisé par 8 :', 'oui'], ['1 000 divisé par 3 :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Qui suis-je ?',
        ...rmpM([['Multiple de 7 et de 2, compris entre 50 et 60 : @', [56]], ['Diviseur de 36, compris entre 10 et 15 : @', [12]], ['Multiple de 9, pair, compris entre 60 et 75 : @', [72]], ['Plus petit multiple commun de 4 et de 6 (non nul) : @', [12]]], 3) },
      { etoiles: 2, col: 1, consigne: 'Partages.',
        ...rmpM([['84 élèves en 7 équipes égales : élèves par équipe @', [12]], ['Peut-on faire des équipes égales de 9 élèves ? @', ['non']], ['On partage 90 cartes entre 4 joueurs : est-ce possible sans reste ? @', ['non']], ['Et entre 6 joueurs ? Cartes chacun : @', [15]]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau : écris oui ou non.',
        ...rmpM([['360 : par 2 @ ; par 3 @ ; par 5 @ ; par 9 @', ['oui', 'oui', 'oui', 'oui']], ['1 245 : par 2 @ ; par 3 @ ; par 5 @ ; par 9 @', ['non', 'oui', 'oui', 'non']], ['702 : par 2 @ ; par 3 @ ; par 5 @ ; par 9 @', ['oui', 'oui', 'non', 'oui']]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles à la fois par 3 et par 5.', ...entoure([30, 45, 50, 63, 75, 90, 105, 110, 120, 135, 150, 200], n => n % 15 === 0) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un fleuriste a 48 roses et 36 tulipes. Il veut faire des bouquets tous identiques, en utilisant toutes les fleurs. Combien de bouquets au maximum ? Que contient chaque bouquet ?',
        corr: cm1Redac('Bouquets', { suite: ['Le nombre de bouquets divise 48 et 36.', 'Diviseurs communs : 1 ; 2 ; 3 ; 4 ; 6 ; 12. Le plus grand est 12.'] }, 'Il peut faire 12 bouquets de 4 roses et 3 tulipes.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux phares s\'allument en même temps. L\'un s\'allume toutes les 6 secondes, l\'autre toutes les 8 secondes. Dans combien de secondes s\'allumeront-ils de nouveau ensemble ?',
        corr: cm1Redac('Multiples communs', { suite: ['Multiples de 6 : 6 ; 12 ; 18 ; 24 ; 30…', 'Multiples de 8 : 8 ; 16 ; 24 ; 32…'] }, 'Ils s\'allumeront de nouveau ensemble dans 24 secondes.') },
    ] },
];
})();

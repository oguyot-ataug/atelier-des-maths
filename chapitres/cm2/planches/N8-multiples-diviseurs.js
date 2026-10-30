/* ============================================================
   CM2 · Planches : Multiples et diviseurs (N8)
   Multiple et diviseur ; critères de divisibilité par 2, 5 et 10 ; trouver tous les diviseurs
   d'un nombre ; diviseurs communs, multiples communs ; problèmes.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
PLANCHES['cm2|Multiples et diviseurs'] = [
  { titre: 'Multiples et critères de divisibilité', duree: '30 min',
    attendus: ['Reconnaître un multiple', 'Utiliser les critères de divisibilité par 2, 5 et 10', 'Écrire la liste des premiers multiples d\'un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris les six premiers multiples (sans 0).',
        ...rmp([['de 6 : @', '6 ; 12 ; 18 ; 24 ; 30 ; 36'], ['de 9 : @', '9 ; 18 ; 27 ; 36 ; 45 ; 54']], 10) },
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse.',
        ...ch([['348 est divisible par 2 :', 'oui'], ['735 est divisible par 2 :', 'non'], ['735 est divisible par 5 :', 'oui'], ['1 240 est divisible par 10 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 5 et par 2 à la fois.',
        ...chx([['Parmi ces nombres :', '450', '455 · 450 · 452'], ['Parmi ces nombres :', '1 000', '1 005 · 1 000 · 998']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un nombre qui se termine par 0 est divisible par 10.', 'vrai'], ['Tous les multiples de 5 se terminent par 5.', 'faux'], ['24 est un multiple de 8.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Léo a plus de 40 billes et moins de 60 billes. Il peut les ranger par 5 sans reste, et aussi par 2 sans reste. Combien peut-il avoir de billes ?',
        corr: cm1Redac('Multiples de 5 et de 2', 'Un nombre divisible par 2 et par 5 se termine par 0.', 'Entre 40 et 60, le seul nombre qui se termine par 0 est 50 : Léo a 50 billes.') },
      { etoiles: 1, col: 1, consigne: 'Continue la liste des multiples.', ...P3.rmp([['de 7 : 7, 14, @, @, @', 21, 28, 35], ['de 12 : 12, 24, @, @', 36, 48]], 2) },
      { etoiles: 2, col: 1, consigne: 'Divisible par 3 ? Entoure.', ...P3.chx([['123', 'oui', 'oui · non'], ['250', 'non', 'oui · non'], ['999', 'oui', 'oui · non']]) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([['Divisible par 2 : le chiffre des unités est @.', 'pair'], ['Divisible par 5 : il se termine par @ ou @.', 0, 5], ['Divisible par 10 : il se termine par @.', 0], ['Divisible par 3 : la somme de ses chiffres est dans la table de @.', 3], ['Divisible par 9 : la somme de ses chiffres est dans la table de @.', 9], ['Un nombre pair est divisible par @.', 2]], 2) },
    ] },
  { titre: 'Trouver tous les diviseurs', duree: '30 min',
    attendus: ['Trouver tous les diviseurs d\'un nombre', 'Reconnaître un diviseur', 'Utiliser les tables de multiplication'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris tous les diviseurs.',
        ...rmp([['de 12 : @', '1 ; 2 ; 3 ; 4 ; 6 ; 12'], ['de 20 : @', '1 ; 2 ; 4 ; 5 ; 10 ; 20'], ['de 7 : @', '1 ; 7']], 9) },
      { etoiles: 2, col: 1, consigne: 'Écris tous les diviseurs.',
        ...rmp([['de 36 : @', '1 ; 2 ; 3 ; 4 ; 6 ; 9 ; 12 ; 18 ; 36'], ['de 45 : @', '1 ; 3 ; 5 ; 9 ; 15 ; 45']], 12) },
      { etoiles: 2, col: 1, consigne: 'Est-ce un diviseur de 48 ? Entoure.',
        ...ch([['6 :', 'oui'], ['9 :', 'non'], ['16 :', 'oui'], ['24 :', 'oui']], 'oui · non') },
      { etoiles: 3, cahier: true, consigne: 'Une maîtresse veut répartir ses 24 élèves en équipes de même effectif. Quelles sont toutes les possibilités ?',
        corr: cm1Redac('Diviseurs de 24', '1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24', 'Elle peut faire 24 équipes de 1, 12 équipes de 2, 8 de 3, 6 de 4, 4 de 6, 3 de 8, 2 de 12 ou une seule équipe de 24.') },
      { etoiles: 1, col: 1, consigne: 'Écris tous les diviseurs.', ...P3.rmp([['de 12 : @', '1, 2, 3, 4, 6, 12'], ['de 20 : @', '1, 2, 4, 5, 10, 20']], 8) },
      { etoiles: 2, col: 1, consigne: 'Écris tous les diviseurs.', ...P3.rmp([['de 17 : @', '1 et 17'], ['de 36 : @', '1, 2, 3, 4, 6, 9, 12, 18, 36']], 10) },
      { etoiles: 2, col: 1, consigne: 'Est-ce un diviseur de 30 ? Entoure.', ...P3.chx([['4', 'non', 'oui · non'], ['6', 'oui', 'oui · non'], ['15', 'oui', 'oui · non']]) },
    ] },
  { titre: 'Diviseurs communs, multiples communs', duree: '35 min',
    attendus: ['Trouver des diviseurs communs à deux nombres', 'Trouver un multiple commun à deux nombres', 'Résoudre un problème de partage ou de rendez-vous'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Diviseurs communs à 12 et 18 : @', '1 ; 2 ; 3 ; 6'], ['Le plus grand diviseur commun à 12 et 18 : @', 6]], 7) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Multiples communs à 4 et 6, jusqu\'à 40 : @', '12 ; 24 ; 36'], ['Le plus petit multiple commun à 4 et 6 : @', 12]], 7) },
      { etoiles: 2, cahier: true, consigne: 'Une fleuriste a 24 roses et 36 tulipes. Elle veut faire le plus grand nombre possible de bouquets identiques en utilisant toutes les fleurs. Combien de bouquets fera-t-elle ? Que contiendra chaque bouquet ?',
        corr: cm1Redac('Plus grand diviseur commun', { suite: ['Diviseurs de 24 : 1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 24', 'Diviseurs de 36 : 1 ; 2 ; 3 ; 4 ; 6 ; 9 ; 12 ; 18 ; 36'] }, 'Le plus grand diviseur commun est 12 : elle fera 12 bouquets.') + cm1Redac('Contenu d\'un bouquet', { suite: ['24 : 12 = 2', '36 : 12 = 3'] }, 'Chaque bouquet contiendra 2 roses et 3 tulipes.') },
      { etoiles: 3, cahier: true, consigne: 'Deux phares s\'allument ensemble. L\'un s\'allume toutes les 6 secondes, l\'autre toutes les 10 secondes. Dans combien de secondes s\'allumeront-ils de nouveau ensemble ?',
        corr: cm1Redac('Multiples communs', { suite: ['Multiples de 6 : 6 ; 12 ; 18 ; 24 ; 30', 'Multiples de 10 : 10 ; 20 ; 30'] }, 'Ils s\'allumeront de nouveau ensemble dans 30 secondes.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Diviseurs communs à 12 et 18 : @', '1, 2, 3, 6'], ['Le plus grand : @', 6]], 6) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Multiples communs à 4 et 6, jusqu\'à 30 : @', '12 et 24'], ['Le plus petit : @', 12]], 5) },
      { etoiles: 3, consigne: 'Complète.', ...P3.rmp([['Diviseurs communs à 24 et 36 : @', '1, 2, 3, 4, 6, 12'], ['Diviseurs communs à 18 et 30 : @', '1, 2, 3, 6']], 8) },
    ] },
];
})();

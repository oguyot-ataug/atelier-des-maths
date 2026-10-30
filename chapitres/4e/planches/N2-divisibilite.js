/* ============================================================
   4e · Planches : Divisibilité (N2)
   Multiples, diviseurs et critères de divisibilité ; nombres premiers ; décomposition en facteurs
   premiers ; fractions irréductibles et problèmes (partages, rendez-vous, carrelage).
   ============================================================ */
(() => {
const { R, F, T, ligne, rmp, ch } = P3, Fr = plFrac();
const DS = PL_DESSINS, illu = plIllu;
// Pièce rectangulaire à carreler (360 cm sur 270 cm).
const piece = DS.fig(190, 140, `<rect x="30" y="10" width="144" height="108" fill="#F4F1EA" stroke="#1F3A5C" stroke-width="1.8"/><rect x="30" y="10" width="20" height="20" fill="#E9A21C" opacity=".7"/>`
  + DS.tx([60, 26], 'carreau ?', { a: 'start', fs: 9, c: '#A0620F' }) + DS.cote([30, 118], [174, 118], '360 cm', -8, { dt: 7 }) + DS.cote([24, 118], [24, 10], '270 cm', 0, { dt: 3, a: 'end' }), 150);
PLANCHES['4e|Divisibilité'] = [
  { titre: 'Multiples, diviseurs et critères', duree: '30 min',
    attendus: ['Reconnaître un multiple ou un diviseur', 'Utiliser les critères de divisibilité par 2, 3, 4, 5, 9 et 10', 'Lister les diviseurs d\'un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Sans poser la division, entoure la bonne réponse.',
        ...ch([['135 est divisible par 5 :', 'oui'], ['248 est divisible par 3 :', 'non'], ['1 008 est divisible par 9 :', 'oui'], ['570 est divisible par 4 :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Écris la liste complète.',
        ...rmp([['Diviseurs de 18 : @', '1 ; 2 ; 3 ; 6 ; 9 ; 18'], ['Diviseurs de 30 : @', '1 ; 2 ; 3 ; 5 ; 6 ; 10 ; 15 ; 30'], ['Diviseurs communs à 18 et 30 : @', '1 ; 2 ; 3 ; 6']], 8) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Les cinq premiers multiples non nuls de 7 : @', '7 ; 14 ; 21 ; 28 ; 35'], ['Le plus petit multiple commun non nul de 6 et de 8 : @', 24], ['Le plus grand diviseur commun de 24 et de 36 : @', 12]], 6) },
      { etoiles: 2, col: 1, consigne: 'Trouve le chiffre caché ■.',
        ...rmp([['4■2 est divisible par 9 : ■ = @', 3], ['75■ est divisible par 2 et par 5 : ■ = @', 0], ['1■8 est divisible par 4 et par 3 : ■ = @ ou @', 0, 6]]) },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un nombre divisible par 9 est divisible par 3.', 'vrai'], ['Un nombre divisible par 3 est divisible par 9.', 'faux'], ['Tout nombre pair est divisible par 4.', 'faux'], ['0 est un multiple de 7.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: 'Justifie que 2 345 est divisible par 5, mais pas par 3.',
        corr: cm1Redac('Par 5', '2 345 se termine par 5', '2 345 est divisible par 5.') + cm1Redac('Par 3', '2 + 3 + 4 + 5 = 14', '14 n\'est pas un multiple de 3 : 2 345 n\'est pas divisible par 3.') },
      { etoiles: 3, cahier: true, consigne: 'Une classe de 28 élèves doit former des groupes de même effectif, de plus de 2 élèves et de moins de 10 élèves. Quelles sont toutes les possibilités ?',
        corr: cm1Redac('Diviseurs de 28', '1 ; 2 ; 4 ; 7 ; 14 ; 28', 'Entre 3 et 9, il y a 4 et 7 : 7 groupes de 4 élèves, ou 4 groupes de 7 élèves.') },
    ] },
  { titre: 'Les nombres premiers', duree: '30 min',
    attendus: ['Savoir si un nombre est premier', 'Connaître les nombres premiers inférieurs à 50', 'Justifier qu\'un nombre n\'est pas premier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ce nombre est-il premier ? Entoure.',
        ...ch([['23 :', 'oui'], ['27 :', 'non'], ['41 :', 'oui'], ['51 :', 'non'], ['1 :', 'non'], ['2 :', 'oui']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Les nombres premiers compris entre 30 et 50 : @', '31 ; 37 ; 41 ; 43 ; 47'], ['Le seul nombre premier pair : @', 2]], 6) },
      { etoiles: 2, col: 1, consigne: 'Ces nombres ne sont pas premiers. Complète le produit qui le prouve.',
        ...rmp([['91 = 7 × @', 13], ['57 = 3 × @', 19], ['221 = 13 × @', 17], ['119 = 7 × @', 17]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La somme de deux nombres premiers est toujours paire.', 'faux'], ['Un nombre premier a exactement deux diviseurs.', 'vrai'], ['Tous les nombres impairs sont premiers.', 'faux'], ['1 est un nombre premier.', 'faux']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: '97 est-il un nombre premier ? Explique ta méthode.',
        corr: cm1Redac('Divisions à tester', { suite: ['97 n\'est divisible ni par 2, ni par 3, ni par 5, ni par 7.', 'Inutile d\'aller plus loin : 11 × 11 = 121 dépasse 97.'] }, '97 n\'a que deux diviseurs, 1 et 97 : c\'est un nombre premier.') },
      { etoiles: 3, cahier: true, consigne: 'Deux nombres premiers « jumeaux » ont un écart de 2 (comme 11 et 13). Trouve tous les couples de nombres premiers jumeaux inférieurs à 50.',
        corr: cm1Redac('Couples jumeaux', '3 et 5 ; 5 et 7 ; 11 et 13 ; 17 et 19 ; 29 et 31 ; 41 et 43', 'Il y a 6 couples de nombres premiers jumeaux inférieurs à 50.') },
    ] },
  { titre: 'Décomposer en facteurs premiers', duree: '35 min',
    attendus: ['Décomposer un nombre en produit de facteurs premiers', 'Retrouver un nombre à partir de sa décomposition', 'Utiliser la décomposition pour répondre à une question'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Décompose en produit de facteurs premiers.',
        ...rmp([['12 = @', '2 × 2 × 3'], ['30 = @', '2 × 3 × 5'], ['45 = @', '3 × 3 × 5'], ['84 = @', '2 × 2 × 3 × 7']], 5) },
      { etoiles: 2, col: 1, consigne: 'Décompose en produit de facteurs premiers.',
        ...rmp([['120 = @', '2 × 2 × 2 × 3 × 5'], ['210 = @', '2 × 3 × 5 × 7'], ['196 = @', '2 × 2 × 7 × 7']], 6) },
      { etoiles: 1, col: 1, consigne: 'Ce produit est-il une décomposition en facteurs premiers ? Entoure.',
        ...ch([['2 × 3 × 9', 'non'], ['5 × 7 × 11', 'oui'], ['2 × 2 × 15', 'non'], ['3 × 3 × 13', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Quel nombre a pour décomposition…',
        ...rmp([['2 × 3 × 3 × 5 ? @', 90], ['2 × 2 × 2 × 7 ? @', 56], ['3 × 5 × 11 ? @', 165]]) },
      { etoiles: 2, cahier: true, consigne: 'Décompose 360 en produit de facteurs premiers, puis donne tous ses diviseurs premiers.',
        corr: cm1Redac('Décomposition', { suite: ['360 = 2 × 180 = 2 × 2 × 90 = 2 × 2 × 2 × 45', '45 = 3 × 3 × 5', '360 = 2 × 2 × 2 × 3 × 3 × 5'] }, 'Les diviseurs premiers de 360 sont 2, 3 et 5.') },
      { etoiles: 3, cahier: true, consigne: 'Par quel plus petit nombre entier faut-il multiplier 12 pour obtenir le carré d\'un nombre entier ?',
        corr: cm1Redac('Décomposition', { suite: ['12 = 2 × 2 × 3', 'Pour un carré, chaque facteur premier doit apparaître un nombre pair de fois : il manque un 3.', '12 × 3 = 36 = 6 × 6'] }, 'Il faut multiplier 12 par 3 : on obtient 36, le carré de 6.') },
    ] },
  { titre: 'Fractions irréductibles et problèmes', duree: '40 min',
    attendus: ['Rendre une fraction irréductible', 'Résoudre un problème de partage ou de rendez-vous', 'Rédiger la solution'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Rends irréductible.',
        eleve: plListe([ligne(F(12, 18), '=', Fr), ligne(F(35, 49), '=', Fr), ligne(F(42, 56), '=', Fr), ligne(F(84, 120), '=', Fr)]),
        corr: plListe([ligne(F(12, 18), '=', R(F(2, 3))), ligne(F(35, 49), '=', R(F(5, 7))), ligne(F(42, 56), '=', R(F(3, 4))), ligne(F(84, 120), '=', R(F(7, 10)))]) },
      { etoiles: 2, col: 1, consigne: 'Cette fraction est-elle irréductible ? Entoure.',
        ...ch([[`${T(18, 24)}`, 'simplifiable'], [`${T(14, 25)}`, 'irréductible'], [`${T(21, 35)}`, 'simplifiable'], [`${T(17, 51)}`, 'simplifiable']], 'irréductible · simplifiable') },
      { etoiles: 2, consigne: 'Simplifie en utilisant les décompositions.',
        eleve: plListe([ligne(F('2 × 3 × 7', '3 × 5 × 7'), '=', Fr), ligne(F('2 × 2 × 3 × 5', '2 × 3 × 3 × 5'), '=', Fr)]),
        corr: plListe([ligne(F('2 × 3 × 7', '3 × 5 × 7'), '=', R(F(2, 5))), ligne(F('2 × 2 × 3 × 5', '2 × 3 × 3 × 5'), '=', R(F(2, 3)))]) },
      { etoiles: 2, cahier: true, consigne: 'Un pâtissier a 60 macarons et 84 chocolats. Il veut préparer le plus grand nombre possible de boîtes identiques, en utilisant tout. Combien de boîtes ? Que contient chacune ?',
        corr: cm1Redac('Diviseurs communs', { suite: ['60 = 2 × 2 × 3 × 5 et 84 = 2 × 2 × 3 × 7', 'Plus grand diviseur commun : 2 × 2 × 3 = 12', '60 : 12 = 5 et 84 : 12 = 7'] }, 'Il peut préparer 12 boîtes, contenant chacune 5 macarons et 7 chocolats.') },
      { etoiles: 3, cahier: true, consigne: 'Deux bus partent ensemble de la gare à 7 h. L\'un repasse toutes les 12 minutes, l\'autre toutes les 18 minutes. À quelle heure repartiront-ils de nouveau ensemble ?',
        corr: cm1Redac('Multiples communs', { suite: ['Multiples de 12 : 12 ; 24 ; 36 ; 48…', 'Multiples de 18 : 18 ; 36 ; 54…', 'Le plus petit multiple commun est 36.'] }, 'Ils repartiront ensemble 36 minutes plus tard, à 7 h 36.') },
      { etoiles: 3, cahier: true, consigne: illu(piece, 'Une pièce rectangulaire mesure 360 cm sur 270 cm. On veut la carreler avec des carreaux carrés tous identiques, les plus grands possible, sans en découper. Quel est le côté d\'un carreau ? Combien en faut-il ?'),
        corr: cm1Redac('Côté du carreau', { suite: ['360 = 2 × 2 × 2 × 3 × 3 × 5 et 270 = 2 × 3 × 3 × 3 × 5', 'Plus grand diviseur commun : 2 × 3 × 3 × 5 = 90'] }, 'Le côté d\'un carreau mesure 90 cm.') + cm1Redac('Nombre de carreaux', { suite: ['360 : 90 = 4 et 270 : 90 = 3', '4 × 3 = 12'] }, 'Il faut 12 carreaux.') },
    ] },
];
})();

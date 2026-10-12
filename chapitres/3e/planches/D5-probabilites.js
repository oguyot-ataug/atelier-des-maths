/* ============================================================
   3e · Planches : Probabilités (D5)
   Vocabulaire et équiprobabilité ; expériences à deux épreuves (arbres, tableaux) ; des fréquences aux
   probabilités ; problèmes ; Objectif Brevet.
   Probabilités écrites en fractions (cases de fraction à l'écran).
   ============================================================ */
(() => {
const { B, R, F, T, ligne, rmp, ch, chx, auto, qs } = P3, Fr = plFrac();
// Probabilités à compléter : [['texte', [num, den]] ou ['texte', valeur décimale]].
const pr = l => ({ eleve: plListe(l.map(([t, r]) => ligne(t, Array.isArray(r) ? Fr : B(3)))), corr: plListe(l.map(([t, r]) => ligne(t, R(Array.isArray(r) ? F(r[0], r[1]) : r)))) });
PLANCHES['3e|Probabilités'] = [
  { titre: 'Vocabulaire et équiprobabilité', duree: '35 min',
    attendus: ['Utiliser le vocabulaire : issue, événement, impossible, certain, contraire', 'Calculer une probabilité dans une situation d\'équiprobabilité', 'Utiliser P(non A) = 1 − P(A)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé équilibré à six faces. Donne la probabilité (fraction irréductible).',
        ...pr([['P(obtenir 6) =', [1, 6]], ['P(obtenir un nombre pair) =', [1, 2]], ['P(obtenir au moins 5) =', [1, 3]], ['P(obtenir 7) =', 0]]) },
      { etoiles: 1, col: 1, consigne: 'Entoure le bon mot.',
        ...ch([['Obtenir 7 avec un dé à six faces :', 'impossible'], ['Obtenir un nombre inférieur à 7 avec ce dé :', 'certain'], ['Obtenir « pile » avec une pièce :', 'possible']], 'impossible · possible · certain') },
      { etoiles: 2, col: 1, consigne: 'Une urne contient 3 boules rouges, 5 vertes et 2 bleues. On tire une boule au hasard.',
        ...pr([['P(rouge) =', [3, 10]], ['P(verte) =', [1, 2]], ['P(pas bleue) =', [4, 5]], ['P(jaune) =', 0]]) },
      { etoiles: 2, col: 1, consigne: 'Une roue de loterie a 8 secteurs identiques, numérotés de 1 à 8.',
        ...pr([['P(multiple de 3) =', [1, 4]], ['P(nombre premier) =', [1, 2]], ['P(diviseur de 8) =', [1, 2]]]) },
      { etoiles: 2, col: 1, consigne: 'Complète (A et « non A » sont des événements contraires).',
        ...rmp([['P(A) = 0,3 : P(non A) = @', '0,7'], ['P(B) = 0,85 : P(non B) = @', '0,15'], ['A et B sont contraires : peut-on avoir P(A) = 0,4 et P(B) = 0,7 ? @', 'non']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On tire une carte au hasard dans un jeu de 32 cartes. Calcule la probabilité d\'obtenir : un roi ; un cœur ; le roi de cœur ; une figure (valet, dame ou roi).',
        corr: cm1Redac('Probabilités', { suite: [`P(roi) = ${F(4, 32)} = ${F(1, 8)}`, `P(cœur) = ${F(8, 32)} = ${F(1, 4)}`, `P(roi de cœur) = ${F(1, 32)}`, `P(figure) = ${F(12, 32)} = ${F(3, 8)}`] }, '') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un sac contient des billes rouges et des billes bleues, dont 12 rouges. La probabilité de tirer une bille rouge est ${T(3, 5)}. Combien y a-t-il de billes bleues ?`,
        corr: cm1Redac('Raisonnement', { suite: [`${F(12, 20)} = ${F(3, 5)} : il y a 20 billes en tout.`, '20 − 12 = 8'] }, 'Il y a 8 billes bleues.') },
    ] },
  { titre: 'Expériences à deux épreuves', duree: '40 min',
    attendus: ['Dénombrer les issues avec un arbre ou un tableau', 'Calculer une probabilité dans une expérience à deux épreuves', 'Distinguer tirage avec remise et sans remise'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance deux pièces équilibrées.',
        ...pr([['Nombre d\'issues :', 4], ['P(deux « pile ») =', [1, 4]], ['P(un « pile » et un « face ») =', [1, 2]]]) },
      { etoiles: 2, col: 1, consigne: 'On lance deux dés équilibrés et on additionne les résultats (fais un tableau).',
        ...pr([['Nombre d\'issues :', 36], ['P(somme égale à 7) =', [1, 6]], ['P(somme égale à 12) =', [1, 36]], ['P(obtenir un double) =', [1, 6]]]) },
      { etoiles: 2, col: 1, consigne: 'Un menu propose 3 entrées, 2 plats et 4 desserts.',
        ...pr([['Nombre de menus différents :', 24], ['Probabilité de choisir au hasard le menu préféré de Léa :', [1, 24]]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Avec deux dés, une somme de 7 est plus probable qu\'une somme de 2.', 'vrai'], ['Après cinq « pile », « face » est plus probable.', 'faux'], ['Une probabilité peut valoir 1,2.', 'faux'], ['La somme des probabilités de toutes les issues vaut 1.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une urne contient 2 boules rouges et 1 bleue. On tire une boule, on la remet, puis on en tire une deuxième. Fais un arbre, puis calcule P(deux rouges) et P(deux couleurs différentes).',
        corr: cm1Redac('Arbre', { suite: [`Premier tirage : rouge (${F(2, 3)}) ou bleue (${F(1, 3)}) ; de même pour le second.`, `P(deux rouges) = ${F(2, 3)} × ${F(2, 3)} = ${F(4, 9)}`, `P(couleurs différentes) = ${F(2, 3)} × ${F(1, 3)} + ${F(1, 3)} × ${F(2, 3)} = ${F(4, 9)}`] }, '') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une boîte contient 3 chocolats noirs et 2 au lait. On en prend un au hasard, on le mange, puis on en prend un deuxième. Quelle est la probabilité d\'avoir mangé deux chocolats noirs ?',
        corr: cm1Redac('Sans remise', `${F(3, 5)} × ${F(2, 4)} = ${F(6, 20)} = ${F(3, 10)}`, `La probabilité est ${F(3, 10)}.`) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On lance deux dés et on multiplie les résultats. On gagne si le produit est pair. Ce jeu est-il favorable au joueur ?',
        corr: cm1Redac('Produit impair', `Il faut deux nombres impairs : 3 × 3 = 9 issues sur 36, soit ${F(1, 4)}.`, '') + cm1Redac('Produit pair', `1 − ${F(1, 4)} = ${F(3, 4)}`, 'Le jeu est favorable : on gagne trois fois sur quatre en moyenne.') },
    ] },
  { titre: 'Des fréquences aux probabilités', duree: '35 min',
    attendus: ['Calculer une fréquence observée', 'Comprendre que la fréquence se rapproche de la probabilité quand on répète l\'expérience', 'Estimer une probabilité par une simulation'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé 600 fois ; le 6 sort 95 fois.',
        ...rmp([['Fréquence d\'apparition du 6 (au centième) : @', '0,16'], ['Probabilité d\'obtenir 6 (au centième) : @', '0,17'], ['Nombre de 6 « attendu » sur 600 lancers : environ @', 100]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Plus on fait de lancers, plus la fréquence se rapproche de la probabilité.', 'vrai'], ['Sur 10 lancers d\'une pièce, on obtient forcément 5 « pile ».', 'faux'], ['Une fréquence peut être différente de la probabilité.', 'vrai'], ['Une fréquence est toujours comprise entre 0 et 1.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Une urne contient 50 billes. On fait 400 tirages avec remise : on obtient 160 fois une bille rouge.',
        ...rmp([['Estimation de la probabilité de tirer une bille rouge : @', '0,4'], ['Nombre probable de billes rouges dans l\'urne : @', 20]]) },
      { etoiles: 2, col: 1, consigne: 'Simulation dans un tableur : entoure la bonne formule.',
        ...chx([['Simuler un lancer de dé :', '=ALEA.ENTRE.BORNES(1;6)', '=ALEA() · =ALEA.ENTRE.BORNES(1;6) · =ALEA.ENTRE.BORNES(0;6)'], ['Fréquence du 6 (résultats en B2:B1001) :', '=NB.SI(B2:B1001;6)/1000', '=NB.SI(B2:B1001;6) · =NB.SI(B2:B1001;6)/1000 · =SOMME(B2:B1001)/6']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On lance une punaise 3 000 fois : elle tombe 1 342 fois sur la pointe. Estime la probabilité qu\'elle tombe sur la pointe.',
        corr: cm1Redac('Fréquence', '1 342 : 3 000 ≈ 0,447', 'On estime cette probabilité à environ 0,45.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un fabricant contrôle 500 ampoules : 12 sont défectueuses. Estime la probabilité qu\'une ampoule soit défectueuse. Sur 20 000 ampoules, combien de défectueuses peut-on prévoir ?',
        corr: cm1Redac('Estimation', '12 : 500 = 0,024', '') + cm1Redac('Prévision', '0,024 × 20 000 = 480', 'On peut prévoir environ 480 ampoules défectueuses.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Lucas lance une pièce 4 fois et obtient 4 fois « pile ». Il affirme que la pièce est truquée. Calcule la probabilité d\'obtenir 4 « pile » avec une pièce équilibrée. A-t-il raison ?',
        corr: cm1Redac('Probabilité', `${F(1, 2)} × ${F(1, 2)} × ${F(1, 2)} × ${F(1, 2)} = ${F(1, 16)} = 0,0625`, 'Cela arrive dans environ 6 % des cas : c\'est rare, mais pas assez pour conclure. Il faudrait beaucoup plus de lancers.') },
    ] },
  { titre: 'Problèmes de probabilités', duree: '40 min',
    attendus: ['Modéliser une situation aléatoire', 'Comparer des chances de gagner', 'Rédiger un calcul de probabilité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Un sachet contient 20 bonbons : 8 à la fraise, 7 au citron, le reste à la menthe. On en prend un au hasard.',
        ...pr([['Nombre de bonbons à la menthe :', 5], ['P(fraise) =', [2, 5]], ['P(pas citron) =', [13, 20]]]) },
      { etoiles: 2, col: 1, consigne: 'Quel jeu choisir ? Entoure.',
        ...chx([['Jeu A : tirer une boule rouge dans une urne de 3 rouges et 7 noires. Jeu B : obtenir un multiple de 3 avec un dé.', 'le jeu B', 'le jeu A · le jeu B · c\'est pareil'], ['Jeu C : obtenir 6 avec un dé. Jeu D : tirer un as dans un jeu de 32 cartes.', 'le jeu C', 'le jeu C · le jeu D · c\'est pareil']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'À la kermesse, 200 tickets sont mis en vente : 1 gagne 50 €, 5 gagnent 10 € et 20 gagnent 2 €. On achète un ticket. Probabilité de gagner quelque chose ? De gagner au moins 10 € ?',
        corr: cm1Redac('Gagner', `${F(26, 200)} = ${F(13, 100)} = 0,13`, '') + cm1Redac('Au moins 10 €', `${F(6, 200)} = ${F(3, 100)} = 0,03`, '') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un cadenas a un code de 3 chiffres (de 000 à 999). Quelle est la probabilité de trouver le code du premier coup ? Et avec un code de 4 chiffres ?',
        corr: cm1Redac('Trois chiffres', `1 000 codes : ${F(1, 1000)}`, '') + cm1Redac('Quatre chiffres', `10 000 codes : ${F(1, 10000)}`, 'La probabilité est divisée par 10.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'On lance un dé à 4 faces (1 à 4) et un dé à 6 faces. Quelle est la probabilité que la somme soit égale à 5 ?',
        corr: cm1Redac('Dénombrement', { suite: ['4 × 6 = 24 issues', 'Somme 5 : (1 ; 4), (2 ; 3), (3 ; 2), (4 ; 1)'] }, `P(somme 5) = ${F(4, 24)} = ${F(1, 6)}.`) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Dans une classe de 25 élèves, il y a 14 filles ; 6 filles et 4 garçons portent des lunettes. On choisit un élève au hasard. Calcule P(porter des lunettes) et P(fille sans lunettes).',
        corr: cm1Redac('Lunettes', `${F(10, 25)} = ${F(2, 5)}`, '') + cm1Redac('Fille sans lunettes', `14 − 6 = 8 : ${F(8, 25)}`, '') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Une urne contient n boules, dont 3 noires. On ajoute 2 boules noires : la probabilité de tirer une boule noire devient ${T(1, 2)}. Trouve n.`,
        corr: cm1Redac('Mise en équation', { suite: [`${F(5, 'n + 2')} = ${F(1, 2)}`, 'n + 2 = 10', 'n = 8'] }, 'Il y avait 8 boules au départ.') },
    ] },
  { titre: 'Probabilités', duree: '45 min', brevet: true,
    attendus: ['Automatismes : probabilités simples', 'Calculer des probabilités avec une roue, en une ou deux épreuves', 'Confronter simulation et probabilité'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Probabilité d\'obtenir 3 avec un dé :', T(1, 6), [T(1, 3), T(1, 6), '3']], ['P(A) = 0,25 ; P(non A) =', '0,75'], ['Urne de 4 boules rouges et 6 noires : P(rouge) =', '0,4', ['0,4', '0,6', '4']], ['Probabilité d\'un événement certain :', 1], ['Deux pièces : P(deux « face ») =', '0,25', ['0,5', '0,25', '0,75']], ['Une probabilité de 30 % s\'écrit :', '0,3', ['0,03', '0,3', '3']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'À la fête foraine, une roue est partagée en 8 secteurs identiques : 3 rouges, 4 jaunes et 1 vert. On fait tourner la roue et on note la couleur du secteur obtenu.'
          + qs(['Quelle est la probabilité d\'obtenir un secteur rouge ?', 'Quelle est la probabilité de ne pas obtenir un secteur jaune ?', 'On fait tourner la roue deux fois de suite. Quelle est la probabilité d\'obtenir deux fois le secteur vert ?', 'Le forain affirme : « En deux tours, vous avez plus d\'une chance sur deux d\'obtenir au moins une fois du jaune. » A-t-il raison ?']),
        corr: cm1Redac('Rouge', `P(rouge) = ${F(3, 8)}`, '') + cm1Redac('Pas jaune', `1 − ${F(4, 8)} = ${F(1, 2)}`, '') + cm1Redac('Deux fois vert', `${F(1, 8)} × ${F(1, 8)} = ${F(1, 64)}`, '')
          + cm1Redac('Au moins un jaune', { suite: [`P(aucun jaune) = ${F(1, 2)} × ${F(1, 2)} = ${F(1, 4)}`, `P(au moins un jaune) = 1 − ${F(1, 4)} = ${F(3, 4)}`] }, `Il a raison : ${F(3, 4)} &gt; ${F(1, 2)}.`) },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'On a simulé avec un tableur 1 000 lancers de deux dés et additionné les résultats : la somme 7 est apparue 171 fois.'
          + qs(['Calculer la fréquence d\'apparition de la somme 7.', 'Calculer la probabilité d\'obtenir une somme de 7 (on pourra faire un tableau).', 'La fréquence et la probabilité sont-elles égales ? Comment l\'expliquer ?', 'Que peut-on attendre si l\'on simule 100 000 lancers ?']),
        corr: cm1Redac('Fréquence', '171 : 1 000 = 0,171', '') + cm1Redac('Probabilité', `6 issues sur 36 : ${F(6, 36)} = ${F(1, 6)} ≈ 0,167`, '')
          + cm1Redac('Comparaison', '', 'Elles sont proches mais pas égales : une fréquence observée varie d\'une simulation à l\'autre.') + cm1Redac('100 000 lancers', '', 'La fréquence devrait être encore plus proche de 0,167 (environ 16 700 sommes égales à 7).') },
    ] },
];
})();

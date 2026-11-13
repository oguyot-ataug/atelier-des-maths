/* 4e · Planches : Algorithmique et programmation (D5) -- niveaux 1 et 2 des attendus de fin de 4e. */
(() => {
const R = P3.R;
PLANCHES['4e|Algorithmique et programmation'] = [
  { titre: 'Boucles et polygones', duree: '30 min',
    attendus: ['Utiliser la boucle « répéter … fois »', 'Programmer un polygone régulier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quel angle faut-il pour tracer… ?', ...P3.rmp([['un carré : @', '90°'], ['un triangle équilatéral : @', '120°'], ['un hexagone régulier : @', '60°'], ['un octogone régulier : @', '45°']], 3) },
      { etoiles: 1, col: 1, consigne: 'Que trace le programme ?', ...P3.rmp([['répéter 4 fois [avancer de 50 ; tourner de 90] : @', 'un carré de côté 50'], ['répéter 5 fois [avancer de 80 ; tourner de 72] : @', 'un pentagone régulier']], 8) },
      { etoiles: 2, cahier: true, consigne: 'Écris un programme qui trace un rectangle de 120 sur 60 avec une boucle.', corr: cm1Redac('Programme du rectangle', '', 'répéter 2 fois [avancer de 120 ; tourner de 90 ; avancer de 60 ; tourner de 90].') },
      { etoiles: 3, cahier: true, consigne: 'mettre total à 1 ; répéter 5 fois [mettre total à total × 2] ; dire total. Que dit le programme ?', corr: cm1Redac('Valeur de total', { suite: ['2, 4, 8, 16, 32'] }, 'Le programme dit 32.') },
    ] },
  { titre: 'Conditions, variables, événements', duree: '35 min',
    attendus: ['Utiliser « si … alors … sinon »', 'Intégrer une variable', 'Déclencher un script par un événement'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme : demander un nombre ; si réponse > 10 alors dire « grand » sinon dire « petit ». Que dit-il ?', ...P3.rmp([['pour 15 : @', 'grand'], ['pour 10 : @', 'petit'], ['pour 3 : @', 'petit']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Écris un programme qui demande la longueur du côté puis trace un carré de cette longueur.', corr: cm1Redac('Programme du carré', '', 'demander « Côté ? » ; mettre côté à réponse ; stylo en position d\'écriture ; répéter 4 fois [avancer de côté ; tourner de 90 degrés].') },
      { etoiles: 2, col: 1, consigne: 'Relie chaque bloc à sa famille : événement, contrôle, variable.', ...P3.rmp([['quand le drapeau vert est cliqué : @', 'événement'], ['répéter 10 fois : @', 'contrôle'], ['ajouter 1 à score : @', 'variable']], 5) },
      { etoiles: 3, cahier: true, consigne: 'Dans un jeu, le lutin « balle » rebondit. Écris le script du lutin « raquette » pour qu\'il dise « Touché ! » quand la balle le touche.', corr: cm1Redac('Script de la raquette', '', 'quand le drapeau vert est cliqué ; répéter indéfiniment [si touche la balle ? alors dire « Touché ! » pendant 1 seconde].') },
    ] },
  { titre: 'Suivre un programme pas à pas', duree: '30 min',
    attendus: ['Suivre l\'évolution d\'une variable', 'Prévoir ce que dit un programme', 'Modifier un programme'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'mettre a à 5 ; mettre b à 3 ; mettre a à a + b ; mettre b à a − b. Complète.', ...P3.rmp([['À la fin, a = @', 8], ['À la fin, b = @', 5]]) },
      { etoiles: 1, col: 1, consigne: 'mettre n à 2 ; répéter 3 fois [mettre n à n × 3]. Complète.', ...P3.rmp([['Après 1 tour : n = @', 6], ['Après 2 tours : n = @', 18], ['Après 3 tours : n = @', 54]]) },
      { etoiles: 2, consigne: 'mettre s à 0 ; mettre k à 1 ; répéter 5 fois [ajouter k à s ; ajouter 2 à k] ; dire s. Complète le tableau, tour par tour.',
        eleve: cm1Tableau(['Tour', '1', '2', '3', '4', '5'], [['k au début du tour', '', '', '', '', ''], ['s à la fin du tour', '', '', '', '', '']]),
        corr: cm1Tableau(['Tour', '1', '2', '3', '4', '5'], [['k au début du tour', ...['1', '3', '5', '7', '9'].map(P3.R)], ['s à la fin du tour', ...['1', '4', '9', '16', '25'].map(P3.R)]]) + '<p style="margin:4px 0 0;">Le programme dit 25 : la somme des 5 premiers nombres impairs est 5² = 25.</p>' },
      { etoiles: 2, cahier: true, consigne: 'Ce programme doit dire la somme des nombres de 1 à 10, mais il dit 45 : mettre s à 0 ; mettre k à 0 ; répéter 10 fois [ajouter k à s ; ajouter 1 à k] ; dire s. Corrige-le.',
        corr: cm1Redac('Erreur', { suite: ['k prend les valeurs 0, 1, …, 9 : le programme calcule 0 + 1 + … + 9 = 45.'] }, 'Correction : mettre k à 1 au départ (ou ajouter 1 à k avant de l\'ajouter à s). Le programme dit alors 55.') },
    ] },
  { titre: 'Conditions et programmes de calcul', duree: '35 min',
    attendus: ['Écrire une instruction conditionnelle', 'Programmer un calcul avec une variable', 'Tester un programme sur plusieurs valeurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'demander un nombre ; si réponse > 0 alors dire « positif » sinon dire « négatif ou nul ». Que dit-il ?', ...P3.rmp([['pour 7 : @', 'positif'], ['pour 0 : @', 'négatif ou nul'], ['pour −3 : @', 'négatif ou nul']]) },
      { etoiles: 1, col: 1, consigne: 'demander x ; mettre y à 3 × x − 2 ; dire y. Que dit le programme ?', ...P3.rmp([['pour x = 4 : @', 10], ['pour x = 0 : @', '−2'], ['pour x = −1 : @', '−5']]) },
      { etoiles: 2, consigne: 'demander a ; demander b ; si a > b alors dire a sinon dire b. Complète.', ...P3.rmp([['pour a = 3 et b = 8 : @', 8], ['pour a = 5 et b = −2 : @', 5], ['pour a = −4 et b = −1 : @', '−1'], ['Le programme dit le plus @ des deux nombres', 'grand']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Un magasin fait 10 % de réduction sur les achats de plus de 50 €. Écris un programme qui demande le prix et dit le prix à payer. Teste-le avec 40 € et 80 €.',
        corr: cm1Redac('Programme', { suite: ['demander « Prix ? » ; mettre p à réponse ;', 'si p > 50 alors mettre p à p × 0,9 ;', 'dire p.'] }, 'Pour 40 €, il dit 40 ; pour 80 €, il dit 72.') },
      { etoiles: 3, cahier: true, consigne: 'Écris un programme qui demande un nombre entier et dit s\'il est pair ou impair. Aide : le bloc « reste de n : 2 » donne le reste de la division de n par 2.',
        corr: cm1Redac('Programme', { suite: ['demander « Nombre ? » ; mettre n à réponse ;', 'si reste de n : 2 = 0 alors dire « pair »', 'sinon dire « impair ».'] }, 'Pour 14, il dit « pair » ; pour 9, il dit « impair ».') },
    ] },
];
})();

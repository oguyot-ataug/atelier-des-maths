/* 4e · Planches : Algorithmique et programmation (D5) -- niveaux 1 et 2 des attendus de fin de 4e. */
(() => {
const R = P3.R;
PLANCHES['4e|Algorithmique et programmation'] = [
  { titre: 'Boucles et polygones', duree: '30 min',
    attendus: ['Utiliser la boucle « répéter … fois »', 'Programmer un polygone régulier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Quel angle faut-il pour tracer… ?', ...P3.rmp([['un carré : @', '90°'], ['un triangle équilatéral : @', '120°'], ['un hexagone régulier : @', '60°'], ['un octogone régulier : @', '45°']], 3) },
      { etoiles: 1, col: 1, consigne: 'Que trace le programme ?', ...P3.rmp([['répéter 4 fois [avancer de 50 ; tourner de 90] : @', 'un carré de côté 50'], ['répéter 5 fois [avancer de 80 ; tourner de 72] : @', 'un pentagone régulier']], 8) },
      { etoiles: 2, cahier: true, consigne: 'Écris un programme qui trace un rectangle de 120 sur 60 avec une boucle.', corr: cm1Redac('Le rectangle', '', 'répéter 2 fois [avancer de 120 ; tourner de 90 ; avancer de 60 ; tourner de 90].') },
      { etoiles: 3, cahier: true, consigne: 'mettre total à 1 ; répéter 5 fois [mettre total à total × 2] ; dire total. Que dit le programme ?', corr: cm1Redac('Valeur de total', { suite: ['2, 4, 8, 16, 32'] }, 'Le programme dit 32.') },
    ] },
  { titre: 'Conditions, variables, événements', duree: '35 min',
    attendus: ['Utiliser « si … alors … sinon »', 'Intégrer une variable', 'Déclencher un script par un événement'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme : demander un nombre ; si réponse > 10 alors dire « grand » sinon dire « petit ». Que dit-il ?', ...P3.rmp([['pour 15 : @', 'grand'], ['pour 10 : @', 'petit'], ['pour 3 : @', 'petit']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Écris un programme qui demande la longueur du côté puis trace un carré de cette longueur.', corr: cm1Redac('Le programme', '', 'demander « Côté ? » ; mettre côté à réponse ; stylo en position d\'écriture ; répéter 4 fois [avancer de côté ; tourner de 90 degrés].') },
      { etoiles: 2, col: 1, consigne: 'Relie chaque bloc à sa famille : événement, contrôle, variable.', ...P3.rmp([['quand le drapeau vert est cliqué : @', 'événement'], ['répéter 10 fois : @', 'contrôle'], ['ajouter 1 à score : @', 'variable']], 5) },
      { etoiles: 3, cahier: true, consigne: 'Dans un jeu, le lutin « balle » rebondit. Écris le script du lutin « raquette » pour qu\'il dise « Touché ! » quand la balle le touche.', corr: cm1Redac('Script de la raquette', '', 'quand le drapeau vert est cliqué ; répéter indéfiniment [si touche la balle ? alors dire « Touché ! » pendant 1 seconde].') },
    ] },
];
})();

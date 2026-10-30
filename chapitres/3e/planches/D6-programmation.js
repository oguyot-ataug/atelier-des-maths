/* 3e · Planches : Algorithmique et programmation (D6) -- niveau 3 des attendus de fin de 3e, exercices type brevet. */
(() => {
const R = P3.R;
PLANCHES['3e|Algorithmique et programmation'] = [
  { titre: 'Blocs personnalisés et frises', duree: '35 min',
    attendus: ['Créer un bloc personnalisé avec un paramètre', 'Reproduire un motif avec une boucle'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Écris un bloc « triangle (côté) » qui trace un triangle équilatéral.', corr: cm1Redac('Le bloc', '', 'définir triangle (côté) ; répéter 3 fois [avancer de côté ; tourner de 120 degrés].') },
      { etoiles: 2, cahier: true, consigne: 'Avec le bloc carré (côté), écris un programme qui trace une frise de 6 carrés de côté 30, espacés de 10 pas.', corr: cm1Redac('La frise', '', 'répéter 6 fois [stylo en position d\'écriture ; carré (30) ; relever le stylo ; avancer de 40].') },
      { etoiles: 3, cahier: true, consigne: 'Écris un bloc « polygone (n, côté) » qui trace un polygone régulier à n côtés.', corr: cm1Redac('Le bloc', '', 'définir polygone (n, côté) ; répéter n fois [avancer de côté ; tourner de 360 / n degrés].') },
    ] },
  { titre: 'Répéter jusqu\'à, simulations', duree: '35 min',
    attendus: ['Utiliser la boucle « répéter jusqu\'à »', 'Simuler une expérience aléatoire'],
    exos: [
      { etoiles: 1, consigne: 'mettre n à 1 ; répéter jusqu\'à n > 50 [mettre n à n × 3] ; dire n. Complète.', ...P3.rmp([['Valeurs successives de n : 1, @, @, @, @', 3, 9, 27, 81], ['Le programme dit : @', 81]], 3) },
      { etoiles: 2, cahier: true, consigne: 'Écris un programme qui simule 500 lancers d\'un dé et compte le nombre de 6 obtenus.', corr: cm1Redac('La simulation', '', 'mettre six à 0 ; répéter 500 fois [si nombre aléatoire entre 1 et 6 = 6 alors ajouter 1 à six] ; dire six.') },
      { etoiles: 3, cahier: true, consigne: 'Le programme précédent dit 91. La fréquence obtenue est-elle cohérente avec la probabilité d\'obtenir 6 ?', corr: cm1Redac('Fréquence', { suite: ['91 : 500 = 0,182', '1 : 6 ≈ 0,167'] }, 'Oui : la fréquence 0,182 est proche de la probabilité 1/6 ≈ 0,167 ; sur 500 lancers, la fréquence fluctue autour de la probabilité.') },
    ] },
  { titre: 'Objectif Brevet : lire un programme de calcul', duree: '30 min', brevet: true,
    attendus: ['Exécuter un programme à la main, conjecturer, démontrer'],
    exos: [
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Programme : demander x ; mettre a à x + 2 ; mettre b à x − 2 ; dire a × b + 4. Que dit-il pour 3 ? Pour −5 ? Quelle conjecture peut-on faire ? Démontre-la.', corr: cm1Redac('Programme de calcul', { suite: ['x = 3 : 5 × 1 + 4 = 9', 'x = −5 : (−3) × (−7) + 4 = 25', '(x + 2)(x − 2) + 4 = x² − 4 + 4 = x²'] }, 'Le programme dit le carré du nombre choisi.') },
    ] },
];
})();

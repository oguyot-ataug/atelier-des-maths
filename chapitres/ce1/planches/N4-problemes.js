/* CE1 · Planches : Problèmes : ajouter, retirer, comparer (N4). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['ce1|Problèmes : ajouter, retirer, comparer'] = [
  { titre: 'Le tout et les parties', duree: '25 min',
    attendus: ['Modéliser un problème par un schéma en barres', 'Chercher le tout ou une partie'],
    exos: [
      { etoiles: 1, consigne: 'Complète le schéma, puis réponds.',
        eleve: lig(cpSchema([[35, '35', '#E35D3A'], [24, '24', '#2EA8C9']], '?', { u: 5 })) + lig('Il y a ' + B(2) + ' élèves en tout.'),
        corr: lig(cpSchema([[35, '35', '#E35D3A'], [24, '24', '#2EA8C9']], '59', { u: 5 })) + lig('35 + 24 = 59 : il y a ' + R(59) + ' élèves en tout.') },
      { etoiles: 2, cahier: true, consigne: 'Dans une bibliothèque, il y a 85 livres : 42 albums et des romans. Combien de romans ?', corr: cm1Redac('Nombre de romans', '85 − 42 = 43', 'Il y a 43 romans.', cpSchema([[42, '42', '#2EA8C9'], [43, '?', '#fff']], '85', { u: 3 })) },
    ] },
  { titre: 'Avant, après', duree: '25 min',
    attendus: ['Résoudre des problèmes de transformation (chercher la fin, le début, le changement)'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Zoé avait 36 perles. Elle en achète 25. Combien en a-t-elle maintenant ?', corr: cm1Redac('Perles de Zoé', '36 + 25 = 61', 'Zoé a 61 perles.') },
      { etoiles: 2, cahier: true, consigne: 'Tom a perdu 15 billes. Il lui en reste 28. Combien en avait-il avant ?', corr: cm1Redac('Billes avant', '28 + 15 = 43', 'Tom avait 43 billes.') },
      { etoiles: 2, cahier: true, consigne: 'Le matin, il y a 54 voitures au parking. Le soir, il y en a 70. Combien de voitures sont arrivées ?', corr: cm1Redac('Voitures arrivées', '54 + 16 = 70', '16 voitures sont arrivées.') },
    ] },
  { titre: 'Comparer', duree: '25 min',
    attendus: ['Résoudre des problèmes de comparaison (de plus, de moins, écart)'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Léo a 48 cartes. Inès en a 20 de plus. Combien Inès a-t-elle de cartes ?', corr: cm1Redac('Cartes d\'Inès', '48 + 20 = 68', 'Inès a 68 cartes.') },
      { etoiles: 2, cahier: true, consigne: 'Un arbre mesure 450 cm. Un autre mesure 100 cm de moins. Combien mesure-t-il ?', corr: cm1Redac('Le deuxième arbre', '450 − 100 = 350', 'Il mesure 350 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Sam a 57 €, sa sœur 92 €. Combien sa sœur a-t-elle de plus ?', corr: cm1Redac('Écart', { suite: ['57 + 3 = 60', '60 + 32 = 92', '3 + 32 = 35'] }, 'Sa sœur a 35 € de plus que Sam.') },
    ] },
];
})();

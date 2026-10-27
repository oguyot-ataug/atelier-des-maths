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
      { etoiles: 2, consigne: 'Complète le schéma, puis réponds : il y a 45 élèves, dont 18 filles. Combien de garçons ?',
        eleve: lig(cpSchema([[18, '18', '#E35D3A'], [27, '?', '#fff']], '45', { u: 6 })) + lig('Il y a ' + B(2) + ' garçons.'),
        corr: lig(cpSchema([[18, '18', '#E35D3A'], [27, '27', '#2EA8C9']], '45', { u: 6 })) + plListe(['45 − 18 = 27']) + lig('Il y a ' + R(27) + ' garçons.') },
      { etoiles: 2, consigne: 'Dessine le schéma, puis réponds : il y a 47 pommes rouges et 38 pommes vertes. Combien de pommes en tout ?',
        eleve: PCP.cadre(60) + lig('Il y a ' + B(2) + ' pommes.'),
        corr: lig(cpSchema([[47, '47', '#E35D3A'], [38, '38', '#2E9C6A']], '85', { u: 4 })) + plListe(['47 + 38 = 85']) + lig('Il y a ' + R(85) + ' pommes.') },
      { etoiles: 1, col: 1, consigne: 'Cherche-t-on le tout ou une partie ? Entoure.', ...P3.chx([['12 billes rouges et 9 bleues : combien en tout ?', 'le tout', 'le tout · une partie'], ['30 élèves, dont 14 filles : combien de garçons ?', 'une partie', 'le tout · une partie']]) },
    ] },
  { titre: 'Avant, après', duree: '25 min',
    attendus: ['Résoudre des problèmes de transformation (chercher la fin, le début, le changement)'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Zoé avait 36 perles. Elle en achète 25. Combien en a-t-elle maintenant ?', corr: cm1Redac('Perles de Zoé', '36 + 25 = 61', 'Zoé a 61 perles.') },
      { etoiles: 2, cahier: true, consigne: 'Tom a perdu 15 billes. Il lui en reste 28. Combien en avait-il avant ?', corr: cm1Redac('Billes avant', '28 + 15 = 43', 'Tom avait 43 billes.') },
      { etoiles: 2, cahier: true, consigne: 'Le matin, il y a 54 voitures au parking. Le soir, il y en a 70. Combien de voitures sont arrivées ?', corr: cm1Redac('Voitures arrivées', '54 + 16 = 70', '16 voitures sont arrivées.') },
      { etoiles: 2, consigne: 'Complète le tableau.',
        eleve: lig(cm1Tableau(['Avant', 'Changement', 'Après'], [['36', '+ 25', ''], ['', '− 15', '28'], ['54', '', '70']])),
        corr: lig(cm1Tableau(['Avant', 'Changement', 'Après'], [['36', '+ 25', R(61)], [R(43), '− 15', '28'], ['54', R('+ 16'), '70']])) },
      { etoiles: 1, col: 1, consigne: 'Gagner ou perdre ? Entoure.', ...P3.chx([['Il avait 20 billes, il en a 26.', 'gagné', 'gagné · perdu'], ['Il avait 40 €, il a 31 €.', 'perdu', 'gagné · perdu']]) },
      { etoiles: 2, col: 1, consigne: 'Sur la bande, Max avait 47 points. Il en gagne 6. Combien en a-t-il ?',
        eleve: lig(cpBande(45, 56, { c: 20 })) + lig('Il a ' + B(2) + ' points.'), corr: lig(cpSautsBande(47, 6, { de: 45, a: 56, px: 260 })) + lig('Il a ' + R(53) + ' points.') },
    ] },
  { titre: 'Comparer', duree: '25 min',
    attendus: ['Résoudre des problèmes de comparaison (de plus, de moins, écart)'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Léo a 48 cartes. Inès en a 20 de plus. Combien Inès a-t-elle de cartes ?', corr: cm1Redac('Cartes d\'Inès', '48 + 20 = 68', 'Inès a 68 cartes.') },
      { etoiles: 2, cahier: true, consigne: 'Un arbre mesure 450 cm. Un autre mesure 100 cm de moins. Combien mesure-t-il ?', corr: cm1Redac('Le deuxième arbre', '450 − 100 = 350', 'Il mesure 350 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Sam a 57 €, sa sœur 92 €. Combien sa sœur a-t-elle de plus ?', corr: cm1Redac('Écart', { suite: ['57 + 3 = 60', '60 + 32 = 92', '3 + 32 = 35'] }, 'Sa sœur a 35 € de plus que Sam.') },
      { etoiles: 1, consigne: 'Compte les cubes. Combien Lina a-t-elle de cubes de plus que Tom ?',
        eleve: plListe(['Tom : ' + cpBarres(23, { q: 6 }), 'Lina : ' + cpBarres(31, { q: 6 })]) + lig('Lina a ' + B(2) + ' cubes de plus.'),
        corr: plListe(['Tom : ' + cpBarres(23, { q: 6 }) + ' ' + R(23), 'Lina : ' + cpBarres(31, { q: 6 }) + ' ' + R(31)]) + lig('Lina a ' + R(8) + ' cubes de plus.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Léa a 35 ans. Son père a 30 ans de plus. Il a @ ans.', 65], ['Un jeu coûte 60 €. Un autre coûte 15 € de moins. Il coûte @ €.', 45]], 2) },
      { etoiles: 3, col: 1, consigne: 'De plus ou de moins ? Entoure.', ...P3.chx([['Max a 20 €, Zoé 28 €. Zoé en a 8…', 'de plus', 'de plus · de moins'], ['Tom mesure 120 cm, Léo 110 cm. Léo mesure 10 cm…', 'de moins', 'de plus · de moins']]) },
    ] },
];
})();

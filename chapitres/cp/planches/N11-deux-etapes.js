/* CP · Planches : Problèmes en deux étapes (N11). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Problèmes en deux étapes'] = [
  { titre: 'Deux étapes : ajouter, puis retirer', duree: '25 min',
    attendus: ['Résoudre un problème en deux étapes', 'Écrire un calcul pour chaque étape'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule en deux étapes.',
        ...P3.rmp([['10 + 5 = @', 15], ['15 − 3 = @', 12], ['8 + 4 = @', 12], ['12 − 2 = @', 10]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Dans le bus, il y a 12 enfants. 6 montent, puis 4 descendent. Combien d\'enfants y a-t-il dans le bus ?',
        corr: cm1Redac('Enfants dans le bus', { suite: ['12 + 6 = 18', '18 − 4 = 14'] }, 'Il y a 14 enfants dans le bus.') },
    ] },
  { titre: 'Trois quantités', duree: '20 min',
    attendus: ['Réunir trois quantités', 'Utiliser un schéma en barres'],
    exos: [
      { etoiles: 1, consigne: 'Complète le schéma : combien de fruits en tout ?',
        eleve: lig(cpSchema([[6, '6', '#E35D3A'], [4, '4', '#E9C46A'], [5, '5', '#9BC53D']], '? fruits', { u: 18 })) + lig('Il y a ' + B(2) + ' fruits.'),
        corr: lig(cpSchema([[6, '6', '#E35D3A'], [4, '4', '#E9C46A'], [5, '5', '#9BC53D']], '15 fruits', { u: 18 })) + plListe(['6 + 4 = 10', '10 + 5 = 15']) + lig('Il y a ' + R(15) + ' fruits.') },
      { etoiles: 2, cahier: true, consigne: 'Mia a 7 billes rouges, 3 billes bleues et 8 billes vertes. Combien a-t-elle de billes ?',
        corr: cm1Redac('Billes de Mia', { suite: ['7 + 3 = 10', '10 + 8 = 18'] }, 'Mia a 18 billes.') },
    ] },
  { titre: 'Des achats', duree: '20 min',
    attendus: ['Résoudre un problème de prix en deux étapes'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Sam a 20 €. Il achète un ballon à 8 € et un livre à 5 €. Combien lui reste-t-il ?',
        corr: cm1Redac('Argent de Sam', { suite: ['8 + 5 = 13', '20 − 13 = 7'] }, 'Il reste 7 € à Sam.') },
      { etoiles: 3, cahier: true, consigne: 'Léo avait des cartes. Il en a gagné 4, puis en a perdu 3. Maintenant il en a 11. Combien en avait-il au début ?',
        corr: cm1Redac('Cartes au début', { suite: ['11 + 3 = 14', '14 − 4 = 10'] }, 'On remonte l\'histoire : Léo avait 10 cartes au début.') },
    ] },
];
})();

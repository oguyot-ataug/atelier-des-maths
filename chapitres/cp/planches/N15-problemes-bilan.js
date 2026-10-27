/* CP · Planches : Problèmes : bilan de l'année (N15). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Problèmes : bilan de l\'année'] = [
  { titre: 'Ajouter, retirer', duree: '25 min',
    attendus: ['Résoudre des problèmes additifs et soustractifs', 'Répondre par une phrase'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Il y a 14 filles et 13 garçons dans la classe. Combien d\'élèves ?', corr: cm1Redac('Élèves', '14 + 13 = 27', 'Il y a 27 élèves dans la classe.') },
      { etoiles: 1, cahier: true, consigne: 'Maman a 30 œufs. Elle en utilise 12. Combien lui en reste-t-il ?', corr: cm1Redac('Œufs qui restent', { suite: ['30 − 10 = 20', '20 − 2 = 18'] }, 'Il reste 18 œufs.') },
      { etoiles: 2, cahier: true, consigne: 'Léo a 20 €. Il veut un jeu à 35 €. Combien lui manque-t-il ?', corr: cm1Redac('Argent qui manque', '20 + 15 = 35', 'Il manque 15 € à Léo.') },
      { etoiles: 1, consigne: 'Complète le schéma : combien d\'élèves dans la classe ?',
        eleve: lig(cpSchema([[14, '14 filles', '#E35D3A'], [13, '13 garçons', '#2EA8C9']], '? élèves', { u: 9 })) + lig('Il y a ' + B(2) + ' élèves.'),
        corr: lig(cpSchema([[14, '14 filles', '#E35D3A'], [13, '13 garçons', '#2EA8C9']], '27 élèves', { u: 9 })) + lig('Il y a ' + R(27) + ' élèves.') },
      { etoiles: 1, col: 1, consigne: 'Faut-il ajouter ou retirer ? Entoure.',
        ...P3.chx([['Maman utilise des œufs.', 'retirer', 'ajouter · retirer'], ['On me donne des billes.', 'ajouter', 'ajouter · retirer'], ['Je perds 3 cartes.', 'retirer', 'ajouter · retirer']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['14 + 13 = @', 27], ['30 − 12 = @', 18], ['20 + 15 = @', 35], ['45 − 20 = @', 25]], 2) },
    ] },
  { titre: 'Comparer', duree: '20 min',
    attendus: ['Résoudre des problèmes de comparaison (de plus, de moins)'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Tom a 12 billes. Nina en a 5 de plus. Combien Nina a-t-elle de billes ?', corr: cm1Redac('Billes de Nina', '12 + 5 = 17', 'Nina a 17 billes.') },
      { etoiles: 2, cahier: true, consigne: 'Hugo a 25 images. Lina en a 31. Combien Lina en a-t-elle de plus ?', corr: cm1Redac('Images de plus', '25 + 6 = 31', 'Lina a 6 images de plus que Hugo.') },
      { etoiles: 1, consigne: 'Tom a 6 billes. Nina en a 3 de plus. Dessine les billes de Nina, puis complète.',
        eleve: lig(cpJetons(6), ' Tom') + PCP.cadre(44, 'Nina :') + lig('Nina a ' + B(2) + ' billes.'),
        corr: lig(cpJetons(6), ' Tom') + lig(cpJetons(9, 0, cpBleus(6, 3)), ' Nina') + lig('6 + 3 = ' + R(9)) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['12, et 5 de plus : @', 17], ['20, et 4 de moins : @', 16], ['15, et 10 de plus : @', 25]], 2) },
      { etoiles: 3, col: 1, consigne: 'Combien de plus ?',
        ...P3.rmp([['8 et 11 : @ de plus', 3], ['20 et 26 : @ de plus', 6], ['15 et 25 : @ de plus', 10]], 2) },
      { etoiles: 2, consigne: 'Entoure qui a le plus. Écris combien il a de plus.',
        eleve: plListe([cpJetons(7) + ' Léo', cpJetons(10, 0, Array(10).fill(CPC.jeton2)) + ' Mia']) + lig(B(4) + ' a ' + B(2) + ' jetons de plus.'),
        corr: plListe([cpJetons(7) + ' Léo', plEntoure(cpJetons(10, 0, Array(10).fill(CPC.jeton2)) + ' Mia')]) + lig(R('Mia') + ' a ' + R(3) + ' jetons de plus.') },
    ] },
  { titre: 'Groupes et deux étapes', duree: '25 min',
    attendus: ['Résoudre des problèmes de groupes égaux et à deux étapes'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Il y a 4 tables de 5 élèves. Combien d\'élèves ?', corr: cm1Redac('Élèves aux tables', '5 + 5 + 5 + 5 = 20', 'Il y a 20 élèves.') },
      { etoiles: 3, cahier: true, consigne: 'Dans le bus, il y a 20 enfants. 7 descendent, puis 4 montent. Combien d\'enfants y a-t-il ?', corr: cm1Redac('Enfants dans le bus', { suite: ['20 − 7 = 13', '13 + 4 = 17'] }, 'Il y a 17 enfants dans le bus.') },
      { etoiles: 3, cahier: true, consigne: 'Sam achète 2 livres à 6 € et un stylo à 3 €. Combien paie-t-il ?', corr: cm1Redac('Prix à payer', { suite: ['6 + 6 = 12', '12 + 3 = 15'] }, 'Sam paie 15 €.') },
      { etoiles: 1, consigne: 'Dessine 3 paquets de 4 bonbons. Combien y a-t-il de bonbons ?',
        eleve: PCP.cadre(60) + lig('Il y a ' + B(2) + ' bonbons.'), corr: lig(cpJetons(4), cpJetons(4), cpJetons(4)) + plListe(['4 + 4 + 4 = 12']) + lig('Il y a ' + R(12) + ' bonbons.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['5 + 5 + 5 + 5 = @', 20], ['10 + 10 + 10 = @', 30], ['2 + 2 + 2 + 2 + 2 = @', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule en deux étapes.',
        ...P3.rmp([['20 − 7 = @', 13], ['13 + 4 = @', 17], ['6 + 6 = @', 12], ['12 + 3 = @', 15]], 2) },
    ] },
];
})();

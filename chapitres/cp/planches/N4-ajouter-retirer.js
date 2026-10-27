/* CP · Planches : Ajouter, retirer : premiers problèmes (N4) -- + et −, problèmes, calculer sur la bande. */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Ajouter, retirer : premiers problèmes'] = [
  { titre: 'Ajouter', duree: '20 min',
    attendus: ['Comprendre le sens de l\'addition (ajouter, réunir)', 'Écrire et calculer une addition'],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons en tout ? Écris l\'addition.',
        eleve: plListe([cpJetons(5, 0, cpBleus(3, 2)) + ' 3 + 2 = ' + B(1), cpJetons(7, 0, cpBleus(4, 3)) + ' 4 + 3 = ' + B(1), cpJetons(9, 0, cpBleus(6, 3)) + ' 6 + 3 = ' + B(1)]),
        corr: plListe([cpJetons(5, 0, cpBleus(3, 2)) + ' 3 + 2 = ' + R(5), cpJetons(7, 0, cpBleus(4, 3)) + ' 4 + 3 = ' + R(7), cpJetons(9, 0, cpBleus(6, 3)) + ' 6 + 3 = ' + R(9)]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['5 + 2 = @', 7], ['4 + 4 = @', 8], ['6 + 3 = @', 9], ['7 + 3 = @', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Avance sur la bande : calcule.',
        eleve: lig(cpBande(0, 10, { c: 24, px: 260 })) + plListe(['5 + 3 = ' + B(1), '7 + 2 = ' + B(1)]),
        corr: lig(cpSautsBande(5, 3, { a: 10, px: 260 })) + plListe(['5 + 3 = ' + R(8), '7 + 2 = ' + R(9)]) },
    ] },
  { titre: 'Retirer', duree: '20 min',
    attendus: ['Comprendre le sens de la soustraction (retirer, enlever)', 'Écrire et calculer une soustraction'],
    exos: [
      { etoiles: 1, consigne: 'Les jetons barrés sont retirés. Combien en reste-t-il ?',
        eleve: plListe([cpJetons(6, 2) + ' 6 − 2 = ' + B(1), cpJetons(8, 3) + ' 8 − 3 = ' + B(1), cpJetons(9, 5) + ' 9 − 5 = ' + B(1)]),
        corr: plListe([cpJetons(6, 2) + ' 6 − 2 = ' + R(4), cpJetons(8, 3) + ' 8 − 3 = ' + R(5), cpJetons(9, 5) + ' 9 − 5 = ' + R(4)]) },
      { etoiles: 2, consigne: 'Barre 4 jetons. Écris combien il en reste.',
        eleve: lig(cpJetons(10)) + lig('10 − 4 = ' + B(1)), corr: lig(cpJetons(10, 4)) + lig('10 − 4 = ' + R(6)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['7 − 2 = @', 5], ['9 − 4 = @', 5], ['10 − 3 = @', 7], ['6 − 6 = @', 0]], 2) },
    ] },
  { titre: 'Résoudre des problèmes', duree: '25 min',
    attendus: ['Résoudre un problème additif ou soustractif', 'Représenter le problème par un dessin', 'Répondre par une phrase'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Dans le bus, il y a 5 enfants. 4 enfants montent. Combien d\'enfants y a-t-il dans le bus ?',
        corr: cm1Redac('Enfants dans le bus', '5 + 4 = 9', 'Il y a 9 enfants dans le bus.', cpJetons(9, 0, cpBleus(5, 4))) },
      { etoiles: 2, cahier: true, consigne: 'Lina a 8 bonbons. Elle en mange 3. Combien lui en reste-t-il ?',
        corr: cm1Redac('Bonbons qui restent', '8 − 3 = 5', 'Il reste 5 bonbons à Lina.', cpJetons(8, 3)) },
      { etoiles: 3, cahier: true, consigne: 'Tom a 10 billes. Il en donne 2 à Zoé et 3 à Malo. Combien lui en reste-t-il ?',
        corr: cm1Redac('Billes de Tom', { suite: ['10 − 2 = 8', '8 − 3 = 5'] }, 'Il reste 5 billes à Tom.', cpJetons(10, 5)) },
    ] },
];
})();

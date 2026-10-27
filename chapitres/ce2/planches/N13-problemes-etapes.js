/* ============================================================
   CE2 · Planches : Problèmes en plusieurs étapes (N13)
   Démarche en quatre étapes (comprendre, représenter, calculer, répondre) ; problèmes mixtes en deux ou
   trois étapes ; soustraire des prix (soustraction posée de montants) ; vérifier son résultat.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
PLANCHES['ce2|Problèmes en plusieurs étapes'] = [
  { titre: 'Comprendre et organiser', duree: '30 min',
    attendus: ['Trouver les informations utiles', 'Chercher la question intermédiaire', 'Écrire un calcul par ligne'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Problème : « Au cinéma, une place coûte 7 €. Paul achète 4 places et un pop-corn à 5 €. Combien paie-t-il ? » Entoure.',
        ...chx([['La question intermédiaire :', 'le prix des places', 'le prix des places · le prix du pop-corn'], ['Le premier calcul :', '4 × 7', '4 × 7 · 7 + 5']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Résous le problème de l\'exercice 1.',
        corr: cm1Redac('Prix des places', '4 × 7 = 28', 'Les 4 places coûtent 28 €.') + cm1Redac('Prix total', '28 + 5 = 33', 'Paul paie 33 €.') },
      { etoiles: 2, cahier: true, consigne: 'Dans la classe, il y a 4 tables de 6 élèves et 7 tables de 4 élèves. Combien d\'élèves en tout ?',
        corr: cm1Redac('Élèves aux tables de 6', '4 × 6 = 24', '24 élèves.') + cm1Redac('Élèves aux tables de 4', '7 × 4 = 28', '28 élèves.') + cm1Redac('Total', '24 + 28 = 52', 'Il y a 52 élèves.') },
      { etoiles: 1, col: 1, consigne: 'Calcule les étapes du problème de l\'exercice 1.', ...P3.rmp([['7 × 4 = @', 28], ['28 + 5 = @', 33]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule les étapes du problème des tables.', ...P3.rmp([['4 × 6 = @', 24], ['7 × 4 = @', 28], ['24 + 28 = @', 52]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quelle question faut-il se poser d\'abord ? Entoure.', ...P3.chx([['Paul achète 4 places à 7 € et un pop-corn à 5 €.', 'le prix des 4 places', 'le prix des 4 places · le prix du pop-corn']]) },
      { etoiles: 2, col: 1, consigne: 'Combien paie-t-on ?', ...P3.rmp([['3 cahiers à 2 € et un stylo à 4 € : @ €', 10], ['2 livres à 6 € et un jeu à 9 € : @ €', 21]], 2) },
      { etoiles: 3, col: 1, consigne: 'Complète.', ...P3.rmp([['5 paquets de 10 crayons. On en donne 12. Il en reste @.', 38]], 2) },
    ] },
  { titre: 'Soustraire des prix', duree: '30 min',
    attendus: ['Poser une soustraction de prix (virgules alignées)', 'Rendre la monnaie par une soustraction'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pose dans ton cahier, puis écris le résultat.',
        ...rmp([['8,50 € − 3,20 € = @ €', '5,30'], ['15,75 € − 6,40 € = @ €', '9,35'], ['20 € − 12,35 € = @ €', '7,65']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Léo a 15 €. Il achète un livre à 8,75 €. Combien lui reste-t-il ?',
        corr: cm1Redac('Argent restant', { pose: cm1Posee([['', '15,00'], ['−', '8,75'], ['', '6,25']]) }, 'Il reste 6,25 € à Léo.') },
      { etoiles: 3, cahier: true, consigne: 'Maman achète un pain à 1,35 € et un gâteau à 12,50 €. Elle paie avec un billet de 20 €. Combien lui rend-on ?',
        corr: cm1Redac('Prix des achats', '1,35 + 12,50 = 13,85', 'Les achats coûtent 13,85 €.') + cm1Redac('Monnaie rendue', '20,00 − 13,85 = 6,15', 'On lui rend 6,15 €.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['10 € − 4,50 € = @', '5,50 €'], ['20 € − 12,50 € = @', '7,50 €'], ['5 € − 1,25 € = @', '3,75 €']], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['1,35 € + 12,50 € = @', '13,85 €'], ['2,40 € + 3,60 € = @', '6 €']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète pour faire 10 €.', ...P3.rmp([['8,75 € + @ = 10 €', '1,25 €'], ['6,30 € + @ = 10 €', '3,70 €']], 3) },
      { etoiles: 3, col: 1, consigne: 'J\'ai 20 €. Ai-je assez ? Entoure.', ...P3.chx([['un pain à 1,35 € et un gâteau à 12,50 €', 'oui', 'oui · non'], ['deux jeux à 9,90 € et une carte à 1 €', 'non', 'oui · non']]) },
    ] },
  { titre: 'Vérifier son résultat', duree: '30 min',
    attendus: ['Relire la question', 'Estimer pour repérer une réponse impossible'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Ces réponses sont-elles possibles ? Entoure.',
        ...chx([['L\'âge du papa de Léa : 350 ans', 'impossible', 'possible · impossible'], ['Le prix d\'un cahier : 2,50 €', 'possible', 'possible · impossible'], ['La masse d\'un chat : 4 t', 'impossible', 'possible · impossible']]) },
      { etoiles: 3, cahier: true, consigne: 'Une école commande 6 cartons de 120 cahiers. Elle en distribue 450. Combien en reste-t-il ? Vérifie que ta réponse est plus petite que le nombre de cahiers commandés.',
        corr: cm1Redac('Cahiers commandés', '6 × 120 = 720', 'L\'école a commandé 720 cahiers.') + cm1Redac('Cahiers restants', '720 − 450 = 270', 'Il reste 270 cahiers ; 270 est bien plus petit que 720.') },
      { etoiles: 3, cahier: true, consigne: 'Un fermier ramasse 48 œufs. Il les range par boîtes de 6, et vend chaque boîte 3 €. Combien gagne-t-il s\'il vend toutes les boîtes ?',
        corr: cm1Redac('Nombre de boîtes', '48 ÷ 6 = 8', 'Car 6 × 8 = 48 : il remplit 8 boîtes.') + cm1Redac('Gain', '8 × 3 = 24', 'Il gagne 24 €.') },
      { etoiles: 1, col: 1, consigne: 'Calcule les étapes du problème des cahiers.', ...P3.rmp([['6 × 120 = @', 720], ['720 − 450 = @', 270]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule les étapes du problème des œufs.', ...P3.rmp([['48 ÷ 6 = @', 8], ['8 × 3 = @', 24]], 2) },
    ] },
];
})();

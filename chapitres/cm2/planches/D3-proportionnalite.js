/* ============================================================
   CM2 · Planches : Proportionnalité (D3)
   Reconnaître une situation de proportionnalité ; raisonner avec « fois plus », « fois moins » ;
   ajouter ou soustraire ; passer par 1. Sans tableau de proportionnalité.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
PLANCHES['cm2|Proportionnalité'] = [
  { titre: 'Reconnaître la proportionnalité', duree: '30 min',
    attendus: ['Reconnaître une situation de proportionnalité', 'Raisonner avec « fois plus » et « fois moins »', 'Repérer une situation qui n\'est pas proportionnelle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces deux grandeurs sont-elles proportionnelles ? Entoure.',
        ...ch([['La masse de pommes achetées à 2 € le kilo et le prix payé :', 'oui'], ['L\'âge d\'un enfant et sa taille :', 'non'], ['Le nombre de tickets de bus à 1,50 € et le prix payé :', 'oui'], ['La pointure et l\'âge :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Complète en raisonnant avec « fois plus » ou « fois moins ».',
        ...rmp([['3 stylos coûtent 4 €. 9 stylos coûtent @ €.', 12], ['5 kg de pommes coûtent 12 €. 15 kg coûtent @ €.', 36], ['Avec 20 L d\'essence, une voiture parcourt 240 km. Avec 5 L, elle parcourt @ km.', 60]]) },
      { etoiles: 2, cahier: true, consigne: 'Au cinéma, un ticket coûte 7 €. Pour un groupe, 10 tickets coûtent 60 €. Le prix est-il proportionnel au nombre de tickets ?',
        corr: cm1Redac('Prix de 10 tickets au tarif normal', '7 × 10 = 70', 'Au tarif normal, 10 tickets coûteraient 70 €.') + cm1Redac('Conclusion', '60 € au lieu de 70 €', 'Le prix n\'est pas proportionnel au nombre de tickets : le groupe a une réduction.') },
      { etoiles: 3, cahier: true, consigne: 'À 10 ans, Hugo mesure 1,40 m. Peut-on dire qu\'à 20 ans il mesurera 2,80 m ? Explique.',
        corr: cm1Redac('Raisonnement', 'âge × 2 ne donne pas taille × 2', 'Non : la taille n\'est pas proportionnelle à l\'âge. On grandit de moins en moins, puis on s\'arrête de grandir.') },
      { etoiles: 1, col: 1, consigne: 'Proportionnel ? Entoure.', ...P3.chx([['le prix et le nombre de baguettes (1 € l\'une)', 'oui', 'oui · non'], ['l\'âge et la taille', 'non', 'oui · non'], ['le périmètre du carré et son côté', 'oui', 'oui · non']]) },
      { etoiles: 2, col: 1, consigne: '3 stylos coûtent 4,50 €. Complète.', ...P3.rmp([['6 stylos : @ €', 9], ['12 stylos : @ €', 18]], 2) },
      { etoiles: 2, col: 1, consigne: '4 kg de pommes coûtent 10 €. Complète.', ...P3.rmp([['2 kg : @ €', 5], ['1 kg : @ €', '2,50']], 2) },
    ] },
  { titre: 'Ajouter, soustraire, passer par 1', duree: '35 min',
    attendus: ['Ajouter ou soustraire des quantités connues', 'Calculer la valeur pour 1, puis pour une autre quantité', 'Choisir la procédure la plus simple'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète en ajoutant ou en soustrayant.',
        ...rmp([['4 croissants coûtent 3,20 € et 6 croissants 4,80 €. 10 croissants coûtent @ €.', 8], ['2 kg coûtent 5 € et 3 kg coûtent 7,50 €. 5 kg coûtent @ €.', '12,50'], ['10 cahiers coûtent 15 € et 3 cahiers 4,50 €. 7 cahiers coûtent @ €.', '10,50']]) },
      { etoiles: 2, col: 1, consigne: 'Passe par 1.',
        ...rmp([['5 cahiers coûtent 8 €. 1 cahier coûte @ €.', '1,60'], ['Alors 7 cahiers coûtent @ €.', '11,20'], ['4 m de tissu coûtent 18 €. 1 m coûte @ €.', '4,50'], ['Alors 3 m coûtent @ €.', '13,50']]) },
      { etoiles: 2, cahier: true, consigne: 'Pour 6 crêpes, il faut 100 g de farine. Quelle masse de farine faut-il pour 15 crêpes ?',
        corr: cm1Redac('Pour 3 crêpes', '100 : 2 = 50', 'Il faut 50 g de farine pour 3 crêpes.') + cm1Redac('Pour 15 crêpes', '50 × 5 = 250', 'Il faut 250 g de farine pour 15 crêpes.') },
      { etoiles: 3, cahier: true, consigne: 'Un robinet remplit 24 L en 3 minutes. Combien de temps faut-il pour remplir une baignoire de 160 L ?',
        corr: cm1Redac('En 1 minute', '24 : 3 = 8', 'Le robinet remplit 8 L par minute.') + cm1Redac('Durée pour 160 L', '160 : 8 = 20', 'Il faut 20 minutes pour remplir la baignoire.') },
      { etoiles: 1, col: 1, consigne: '5 cahiers coûtent 10 €. Complète.', ...P3.rmp([['1 cahier : @ €', 2], ['7 cahiers : @ €', 14]], 2) },
      { etoiles: 2, col: 1, consigne: '2 L de jus remplissent 8 verres. Complète.', ...P3.rmp([['1 L : @ verres', 4], ['5 L : @ verres', 20]], 2) },
      { etoiles: 3, col: 1, consigne: '3 places coûtent 12 € et 5 places coûtent 20 €. Complète.', ...P3.rmp([['8 places : @ €', 32]], 2) },
    ] },
  { titre: 'Résoudre des problèmes', duree: '35 min',
    attendus: ['Choisir une procédure adaptée', 'Comparer des prix', 'Rédiger la solution d\'un problème de proportionnalité'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Entoure la procédure la plus simple.',
        ...chx([['3 kg coûtent 6 €. Prix de 12 kg ?', 'fois plus', 'fois plus · passer par 1'], ['7 kg coûtent 21 €. Prix de 5 kg ?', 'passer par 1', 'fois plus · passer par 1']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une voiture consomme 6 L d\'essence pour 100 km. Combien consomme-t-elle pour 350 km ?',
        corr: cm1Redac('Pour 50 km', '6 : 2 = 3', 'Elle consomme 3 L pour 50 km.') + cm1Redac('Pour 300 km', '6 × 3 = 18', 'Elle consomme 18 L pour 300 km.') + cm1Redac('Pour 350 km', '18 + 3 = 21', 'Elle consomme 21 L pour 350 km.') },
      { etoiles: 3, cahier: true, consigne: 'Un paquet de 6 yaourts coûte 2,70 €. Un paquet de 4 yaourts coûte 2 €. Quel paquet est le plus avantageux ?',
        corr: cm1Redac('Un yaourt du paquet de 6', '2,70 : 6 = 0,45', 'Un yaourt coûte 0,45 €.') + cm1Redac('Un yaourt du paquet de 4', '2 : 4 = 0,50', 'Un yaourt coûte 0,50 €.') + cm1Redac('Comparaison', '0,45 &lt; 0,50', 'Le paquet de 6 yaourts est le plus avantageux.') },
      { etoiles: 3, cahier: true, consigne: 'Une imprimante imprime 45 pages en 3 minutes. Combien de pages imprime-t-elle en 8 minutes ?',
        corr: cm1Redac('En 1 minute', '45 : 3 = 15', 'Elle imprime 15 pages par minute.') + cm1Redac('En 8 minutes', '15 × 8 = 120', 'Elle imprime 120 pages en 8 minutes.') },
      { etoiles: 1, col: 1, consigne: 'Une voiture consomme 6 L pour 100 km. Complète.', ...P3.rmp([['50 km : @ L', 3], ['200 km : @ L', 12], ['350 km : @ L', 21]], 2) },
      { etoiles: 2, col: 1, consigne: 'L\'imprimante imprime 45 pages en 3 min. Complète.', ...P3.rmp([['1 min : @ pages', 15], ['8 min : @ pages', 120]], 2) },
      { etoiles: 2, col: 1, consigne: 'Prix d\'un yaourt :', ...P3.rmp([['paquet de 6 à 2,70 € : @ €', '0,45'], ['paquet de 4 à 2 € : @ €', '0,50']], 3) },
      { etoiles: 3, col: 1, consigne: 'Quel paquet est le plus avantageux ? Entoure.', ...P3.chx([['', 'le paquet de 6', 'le paquet de 6 · le paquet de 4']]) },
    ] },
];
})();

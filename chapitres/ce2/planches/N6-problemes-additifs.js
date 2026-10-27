/* ============================================================
   CE2 · Planches : Problèmes additifs (N6)
   Chercher le tout ou une partie ; une transformation (ce qui change) ; comparer « de plus, de
   moins » ; problèmes en deux étapes. Schémas en barres ; nombres jusqu'à 10 000 et prix.
   ============================================================ */
(() => {
const { chx } = P3;
const PQ = (parts, o) => cm1Paquets(parts, Object.assign({ L: 300 }, o)).replace(/style="width:100%;max-width:(\d+)px;/, (m, w) => `style="width:${w}px;max-width:100%;`);
PLANCHES['ce2|Problèmes additifs'] = [
  { titre: 'Le tout ou une partie', duree: '30 min',
    attendus: ['Représenter un problème par un schéma en barres', 'Chercher le tout (addition) ou une partie (soustraction)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Pour chaque problème, entoure l\'opération qui convient.',
        ...chx([['Dans une bibliothèque, il y a 1 250 romans et 840 BD. Combien de livres en tout ?', '1 250 + 840', '1 250 + 840 · 1 250 − 840'], ['Il y a 2 090 livres, dont 1 250 romans. Combien d\'autres livres ?', '2 090 − 1 250', '2 090 + 1 250 · 2 090 − 1 250']]) },
      { etoiles: 2, cahier: true, consigne: `Une ferme a 356 poules et des canards. En tout, il y a 520 volailles. Combien y a-t-il de canards ? Complète le schéma, puis calcule.${PQ([[356, '356 poules'], [164, '?']], { accolade: '520 volailles' })}`,
        corr: cm1Redac('Nombre de canards', '520 − 356 = 164', 'Il y a 164 canards.', PQ([[356, '356 poules'], [164, '164 canards']], { accolade: '520 volailles' })) },
      { etoiles: 2, cahier: true, consigne: 'Pour la kermesse, l\'école a vendu 1 475 tickets le samedi et 2 380 le dimanche. Combien de tickets en tout ?',
        corr: cm1Redac('Nombre de tickets', '1 475 + 2 380 = 3 855', 'L\'école a vendu 3 855 tickets.', PQ([[1475, '1 475'], [2380, '2 380']], { accolade: '? tickets' })) },
    ] },
  { titre: 'Transformer, comparer', duree: '30 min',
    attendus: ['Résoudre un problème où une quantité augmente ou diminue', 'Distinguer « de plus » et « de moins »'],
    exos: [
      { etoiles: 1, col: 1, cahier: true, consigne: 'Zoé avait 1 200 points. Elle en perd 350. Combien en a-t-elle maintenant ?',
        corr: cm1Redac('Points de Zoé', '1 200 − 350 = 850', 'Zoé a maintenant 850 points.') },
      { etoiles: 1, col: 1, cahier: true, consigne: 'Le matin, un car a 23 passagers. À l\'arrêt, il en monte 17. Combien de passagers maintenant ?',
        corr: cm1Redac('Passagers', '23 + 17 = 40', 'Il y a maintenant 40 passagers.') },
      { etoiles: 2, cahier: true, consigne: 'Un vélo coûte 245 €. Une trottinette coûte 88 € de moins. Combien coûte la trottinette ?',
        corr: cm1Redac('Prix de la trottinette', '245 − 88 = 157', 'La trottinette coûte 157 €.', PQ([[245, 'vélo : 245 €']], { titre: 'vélo', echelle: 245 }) + PQ([[157, '?'], [88, '88 de moins', '', '#fff']], { titre: 'trottinette', echelle: 245 })) },
      { etoiles: 3, cahier: true, consigne: 'Paris est à 3 250 km de Moscou et à 1 050 km de Madrid. De combien de kilomètres Moscou est-elle plus loin de Paris que Madrid ?',
        corr: cm1Redac('Différence', '3 250 − 1 050 = 2 200', 'Moscou est à 2 200 km de plus que Madrid.') },
    ] },
  { titre: 'Problèmes en deux étapes', duree: '35 min',
    attendus: ['Trouver la question intermédiaire', 'Enchaîner deux calculs, un par ligne'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Léo a 188 billes. Lucie en a 75 de plus que Léo. Combien de billes ont-ils ensemble ?',
        corr: cm1Redac('Billes de Lucie', '188 + 75 = 263', 'Lucie a 263 billes.') + cm1Redac('Billes en tout', '188 + 263 = 451', 'Ensemble, ils ont 451 billes.') },
      { etoiles: 2, cahier: true, consigne: 'Un cinéma a 450 places. 128 personnes sont dans la salle et 97 font la queue pour entrer. Combien de places resteront libres ?',
        corr: cm1Redac('Spectateurs', '128 + 97 = 225', 'Il y aura 225 spectateurs.') + cm1Redac('Places libres', '450 − 225 = 225', 'Il restera 225 places libres.') },
      { etoiles: 3, cahier: true, consigne: 'Inès a 50 €. Elle achète un livre à 12 € et un jeu à 27 €. Combien d\'argent lui reste-t-il ?',
        corr: cm1Redac('Dépenses', '12 + 27 = 39', 'Inès dépense 39 €.') + cm1Redac('Argent restant', '50 − 39 = 11', 'Il reste 11 € à Inès.') },
    ] },
];
})();

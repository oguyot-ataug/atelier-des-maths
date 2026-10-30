/* ============================================================
   CE2 · Planches : Tables d'addition et de multiplication (N2)
   Tables dans les deux sens (égalités à trou), doubles et moitiés usuels, multiples de 25,
   décompositions multiplicatives de 60. Fin de CE2 : 15 additions et 12 multiplications en une minute.
   Relecture CE2-N2-P3-E4 (30/10/2026) : « oui non » en tableau, détaché de la question (« Tabulation pour ne pas coller
   oui non à la question »).
   ============================================================ */
(() => {
const { rmp, chx, chxTab } = P3;
const { svg } = CM2G;
// Rangées de jetons (l rangées de c).
const jetons = (l, c) => { let g = ''; for(let i = 0; i < l; i++) for(let j = 0; j < c; j++) g += `<circle cx="${12 + j * 20}" cy="${12 + i * 20}" r="7.5" fill="${i % 2 ? '#E35D3A' : '#2EA8C9'}" stroke="#1F3A5C" stroke-width=".8"/>`; return svg(c * 20 + 4, l * 20 + 4, g, Math.min(200, c * 20 + 4)); };
PLANCHES['ce2|Tables d\'addition et de multiplication'] = [
  { titre: 'Les tables d\'addition', duree: '25 min',
    attendus: ['Connaître les tables d\'addition dans les deux sens', 'Compléter une égalité à trou', 'Utiliser les doubles et les compléments à 10'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule le plus vite possible.',
        ...rmp([['8 + 7 = @', 15], ['6 + 9 = @', 15], ['7 + 7 = @', 14], ['5 + 8 = @', 13], ['9 + 4 = @', 13], ['6 + 6 = @', 12]], 2) },
      { etoiles: 1, col: 1, consigne: 'Trouve le nombre manquant.',
        ...rmp([['7 + @ = 12', 5], ['@ + 8 = 17', 9], ['14 = 6 + @', 8], ['11 = @ + 4', 7], ['9 + @ = 18', 9], ['@ + 6 = 13', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule avec les presque doubles.',
        ...rmp([['6 + 7 = @', 13], ['8 + 9 = @', 17], ['7 + 8 = @', 15], ['5 + 6 = @', 11]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la soustraction avec la table d\'addition.',
        ...rmp([['15 − 7 = @', 8], ['13 − 9 = @', 4], ['16 − 8 = @', 8], ['12 − 5 = @', 7]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['8 + 7 = @', 15], ['9 + 6 = @', 15], ['7 + 5 = @', 12], ['6 + 8 = @', 14]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['13 − 6 = @', 7], ['15 − 8 = @', 7], ['12 − 9 = @', 3], ['17 − 8 = @', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant.', ...P3.rmp([['@ + 9 = 16', 7], ['8 + @ = 13', 5], ['@ + 7 = 14', 7]], 2) },
    ] },
  { titre: 'Les tables de multiplication', duree: '30 min',
    attendus: ['Connaître les tables de multiplication dans les deux sens', 'Savoir que l\'ordre des facteurs ne change pas le produit', 'Retrouver un résultat oublié'],
    exos: [
      { etoiles: 1, consigne: 'Écris la multiplication qui correspond aux jetons, puis calcule.',
        eleve: plGrille([jetons(3, 6) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3), jetons(4, 5) + '<br>' + P3.B(3) + ' × ' + P3.B(3) + ' = ' + P3.B(3)], 2),
        corr: plGrille([jetons(3, 6) + '<br>' + P3.R('3 × 6 = 18'), jetons(4, 5) + '<br>' + P3.R('4 × 5 = 20')], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['7 × 6 = @', 42], ['8 × 4 = @', 32], ['9 × 5 = @', 45], ['6 × 8 = @', 48], ['7 × 7 = @', 49], ['9 × 3 = @', 27]], 2) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant.',
        ...rmp([['8 × @ = 56', 7], ['@ × 6 = 54', 9], ['35 = 7 × @', 5], ['72 = @ × 9', 8], ['6 × @ = 36', 6], ['@ × 4 = 28', 7]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Lina a oublié 7 × 8. Explique deux façons de le retrouver à partir de résultats qu\'elle connaît.',
        corr: cm1Redac('Avec 7 × 4', { suite: ['7 × 4 = 28', '7 × 8 = 28 + 28', '7 × 8 = 56'] }, '8, c\'est le double de 4 : on double 28.') + cm1Redac('Avec 7 × 10', { suite: ['7 × 10 = 70', '7 × 2 = 14', '70 − 14 = 56'] }, '8 fois 7, c\'est 10 fois 7 moins 2 fois 7 : 7 × 8 = 56.') },
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['6 × 7 = @', 42], ['8 × 9 = @', 72], ['7 × 7 = @', 49], ['9 × 6 = @', 54]], 2) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant.', ...P3.rmp([['@ × 8 = 48', 6], ['7 × @ = 63', 9], ['@ × 6 = 36', 6]], 2) },
    ] },
  { titre: 'Doubles, moitiés et nombres à connaître', duree: '25 min',
    attendus: ['Connaître les doubles et les moitiés usuels', 'Connaître les multiples de 25 jusqu\'à 100', 'Trouver toutes les façons d\'écrire 60 comme un produit'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris le double.',
        ...rmp([['15 : @', 30], ['25 : @', 50], ['45 : @', 90], ['150 : @', 300], ['250 : @', 500]], 3) },
      { etoiles: 1, col: 1, consigne: 'Écris la moitié.',
        ...rmp([['30 : @', 15], ['50 : @', 25], ['90 : @', 45], ['300 : @', 150], ['1 000 : @', 500]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['25 × 2 = @', 50], ['25 × @ = 75', 3], ['25 × 4 = @', 100], ['@ × 25 = 50', 2]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure les produits qui font 60.',
        ...chxTab([['4 × 15', 'oui', 'oui · non'], ['5 × 11', 'non', 'oui · non'], ['3 × 20', 'oui', 'oui · non'], ['6 × 12', 'non', 'oui · non'], ['5 × 12', 'oui', 'oui · non']]) },
      { etoiles: 3, cahier: true, consigne: 'Un billet de cinéma coûte 25 €. Paul achète des billets pour lui et ses trois amis. Il paie avec deux billets de 50 €. Combien lui rend-on ?',
        corr: cm1Redac('Prix des billets', '25 × 4 = 100', 'Les 4 billets coûtent 100 €.') + cm1Redac('Somme donnée', '50 + 50 = 100', 'Paul donne 100 € : on ne lui rend rien.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['25 × 4 = @', 100], ['50 × 2 = @', 100], ['20 × 5 = @', 100], ['250 × 4 = @', '1 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['le double de 45 : @', 90], ['la moitié de 70 : @', 35], ['le double de 150 : @', 300], ['la moitié de 500 : @', 250]], 2) },
    ] },
];
})();

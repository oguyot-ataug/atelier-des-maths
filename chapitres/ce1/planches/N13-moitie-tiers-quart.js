/* CE1 · Planches : Moitié, tiers, quart d'une quantité (N13). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R, F = cm1Frac;
PLANCHES['ce1|Moitié, tiers, quart d\'une quantité'] = [
  { titre: 'La moitié', duree: '20 min',
    attendus: ['Trouver la moitié d\'une quantité'],
    exos: [
      { etoiles: 1, consigne: 'Colorie la moitié des jetons. Combien en as-tu colorié ?', eleve: lig(cpJetons(10, 0, Array(10).fill('#fff'))) + lig(B(2)), corr: lig(cpJetons(10, 0, cpBleus(5, 5))) + lig('La moitié de 10 : ' + R(5)) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['La moitié de 16 : @', 8], ['La moitié de 30 : @', 15], ['La moitié de 50 : @', 25]], 2) },
    ] },
  { titre: 'Le tiers et le quart', duree: '20 min',
    attendus: ['Trouver le tiers et le quart d\'une quantité avec les tables'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le tiers de 12 : @', 4], ['Le quart de 12 : @', 3], ['Le tiers de 21 : @', 7], ['Le quart de 20 : @', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([[`${F(3, 4)} de 8 : @`, 6], [`${F(2, 3)} de 9 : @`, 6]], 2) },
    ] },
  { titre: 'Problèmes', duree: '20 min',
    attendus: ['Résoudre des problèmes de moitié, tiers, quart'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une ficelle de 40 cm est coupée en deux morceaux égaux. Combien mesure chaque morceau ?', corr: cm1Redac('Les morceaux', '20 + 20 = 40', 'Chaque morceau mesure 20 cm.') },
      { etoiles: 2, cahier: true, consigne: 'Il y a 24 élèves. Le quart des élèves mange à la maison. Combien d\'élèves mangent à la maison ?', corr: cm1Redac('Élèves à la maison', '4 × 6 = 24', '6 élèves mangent à la maison.') },
      { etoiles: 3, cahier: true, consigne: 'Mamie a 18 €. Elle donne le tiers à Léo. Combien lui reste-t-il ?', corr: cm1Redac('Argent de mamie', { suite: ['3 × 6 = 18', '18 − 6 = 12'] }, 'Mamie donne 6 € à Léo : il lui reste 12 €.') },
    ] },
];
})();

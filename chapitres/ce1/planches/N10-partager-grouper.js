/* CE1 · Planches : Partager et faire des groupes (N10). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const sachets = (g, n) => { let s = ''; for(let i = 0; i < g; i++){ const x0 = 4 + i * 66; s += `<rect x="${x0}" y="4" width="60" height="50" rx="9" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="1.5"/>`;
  for(let j = 0; j < n; j++) s += `<circle cx="${x0 + 14 + (j % 3) * 16}" cy="${18 + Math.floor(j / 3) * 15}" r="6" fill="#E9C46A" stroke="${CPC.bord}"/>`; } return cpSvg(g * 66 + 6, 58, s, Math.min(280, g * 66 + 6)); };
PLANCHES['ce1|Partager et faire des groupes'] = [
  { titre: 'Partager équitablement', duree: '20 min',
    attendus: ['Résoudre un problème de partage (combien pour chacun ?)'],
    exos: [
      { etoiles: 1, consigne: 'Partage 15 bonbons dans 3 sachets : dessine-les. Combien par sachet ?', eleve: lig(sachets(3, 0)) + lig(B(2) + ' bonbons par sachet'), corr: lig(sachets(3, 5)) + lig(R(5) + ' bonbons par sachet (3 × 5 = 15)') },
      { etoiles: 2, col: 1, consigne: 'Combien pour chacun ?', ...P3.rmp([['20 billes pour 4 enfants : @', 5], ['18 images pour 2 enfants : @', 9], ['30 € pour 3 enfants : @', '10 €']], 3) },
      { etoiles: 1, consigne: 'Partage 12 bonbons dans 4 sachets, puis 14 bonbons dans 2 sachets : dessine-les.',
        eleve: plGrille([sachets(4, 0) + '<br>' + B(2) + ' par sachet', sachets(2, 0) + '<br>' + B(2) + ' par sachet'], 2),
        corr: plGrille([sachets(4, 3) + '<br>' + R(3) + ' par sachet', sachets(2, 7) + '<br>' + R(7) + ' par sachet'], 2) },
      { etoiles: 2, col: 1, consigne: 'Combien pour chacun ?', ...P3.rmp([['24 images pour 3 enfants : @', 8], ['50 € pour 5 enfants : @', '10 €'], ['12 gâteaux pour 6 enfants : @', 2]], 3) },
      { etoiles: 2, col: 1, consigne: 'Vérifie avec une multiplication.', ...P3.rmp([['4 × @ = 20', 5], ['3 × @ = 15', 5], ['2 × @ = 18', 9]], 2) },
    ] },
  { titre: 'Faire des groupes', duree: '20 min',
    attendus: ['Résoudre un problème de groupement (combien de groupes ?)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Combien de groupes ?', ...P3.rmp([['24 élèves, équipes de 4 : @ équipes', 6], ['40 œufs, boîtes de 10 : @ boîtes', 4], ['16 roues, vélos de 2 roues : @ vélos', 8]], 2) },
      { etoiles: 2, cahier: true, consigne: 'On range 35 crayons par paquets de 5. Combien de paquets ?', corr: cm1Redac('Paquets', '7 × 5 = 35', 'Il y a 7 paquets.') },
      { etoiles: 1, consigne: 'Fais des paquets de 4 jetons : entoure-les. Combien de paquets ?',
        eleve: lig(cpJetons(12)) + lig(B(2) + ' paquets'), corr: lig(cpJetons(12, 0, [...Array(4).fill(CPC.jeton), ...Array(4).fill(CPC.jeton2), ...Array(4).fill('#2E9C6A')])) + lig(R(3) + ' paquets') },
      { etoiles: 2, col: 1, consigne: 'Combien de groupes ?', ...P3.rmp([['30 élèves, équipes de 5 : @ équipes', 6], ['20 chaussettes, des paires : @ paires', 10], ['60 minutes, des demi-heures : @', 2]], 2) },
      { etoiles: 3, col: 1, consigne: 'Partage ou groupes ? Entoure.', ...P3.chx([['3 bonbons par sachet : combien de sachets ?', 'groupes', 'partage · groupes'], ['Autant pour 4 enfants : combien chacun ?', 'partage', 'partage · groupes']]) },
      { etoiles: 2, col: 1, consigne: 'Vérifie avec une multiplication.', ...P3.rmp([['6 × @ = 30', 5], ['4 × @ = 40', 10], ['2 × @ = 20', 10]], 2) },
    ] },
  { titre: 'Quand il en reste', duree: '20 min',
    attendus: ['Trouver ce qui reste après un partage ou un groupement'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['13 billes pour 2 enfants : @ chacun, il en reste @', 6, 1], ['17 cartes pour 5 joueurs : @ chacun, il en reste @', 3, 2]], 2) },
      { etoiles: 3, cahier: true, consigne: '26 enfants vont au zoo. Une voiture peut emmener 4 enfants. Combien faut-il de voitures ?', corr: cm1Redac('Les voitures', { suite: ['6 × 4 = 24', '26 − 24 = 2'] }, '6 voitures ne suffisent pas : il reste 2 enfants. Il faut 7 voitures.') },
      { etoiles: 1, consigne: 'Partage 14 jetons dans 4 sachets : dessine-les. Combien en reste-t-il ?', eleve: lig(sachets(4, 0)) + lig(B(2) + ' par sachet, il en reste ' + B(2)), corr: lig(sachets(4, 3)) + lig(R(3) + ' par sachet, il en reste ' + R(2)) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['11 bonbons pour 3 enfants : @ chacun, il en reste @', 3, 2], ['22 billes en sacs de 5 : @ sacs, il en reste @', 4, 2]], 2) },
      { etoiles: 3, col: 1, consigne: 'Combien de boîtes de 6 œufs faut-il ?', ...P3.rmp([['pour 18 œufs : @ boîtes', 3], ['pour 20 œufs : @ boîtes (la dernière n\'est pas pleine)', 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Combien en reste-t-il ?', ...P3.rmp([['9 bonbons pour 2 enfants : il en reste @', 1], ['23 cartes pour 4 joueurs : il en reste @', 3]], 2) },
    ] },
];
})();

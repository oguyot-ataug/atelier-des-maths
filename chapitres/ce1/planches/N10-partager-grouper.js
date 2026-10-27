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
    ] },
  { titre: 'Faire des groupes', duree: '20 min',
    attendus: ['Résoudre un problème de groupement (combien de groupes ?)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Combien de groupes ?', ...P3.rmp([['24 élèves, équipes de 4 : @ équipes', 6], ['40 œufs, boîtes de 10 : @ boîtes', 4], ['16 roues, vélos de 2 roues : @ vélos', 8]], 2) },
      { etoiles: 2, cahier: true, consigne: 'On range 35 crayons par paquets de 5. Combien de paquets ?', corr: cm1Redac('Paquets', '7 × 5 = 35', 'Il y a 7 paquets.') },
    ] },
  { titre: 'Quand il en reste', duree: '20 min',
    attendus: ['Trouver ce qui reste après un partage ou un groupement'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['13 billes pour 2 enfants : @ chacun, il en reste @', 6, 1], ['17 cartes pour 5 joueurs : @ chacun, il en reste @', 3, 2]], 2) },
      { etoiles: 3, cahier: true, consigne: '26 enfants vont au zoo. Une voiture peut emmener 4 enfants. Combien faut-il de voitures ?', corr: cm1Redac('Les voitures', { suite: ['6 × 4 = 24', '26 − 24 = 2'] }, '6 voitures ne suffisent pas : il reste 2 enfants. Il faut 7 voitures.') },
    ] },
];
})();

/* CP · Planches : Ajouter 9, aller à la dizaine (N14). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
const deuxBoites = (a, b) => { const c1 = Math.min(b, 10 - a), c2 = b - c1; return lig(cpBoiteDix(a + c1, { c: 18, couleurs: Array(a).fill(CPC.jeton).concat(Array(c1).fill(CE2C.vert)) }), cpBoiteDix(c2, { c: 18, couleurs: Array(10).fill(CPC.jeton2) })); };
PLANCHES['cp|Ajouter 9, aller à la dizaine'] = [
  { titre: 'Aller à la dizaine', duree: '20 min',
    attendus: ['Compléter à la dizaine supérieure'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...P3.rmp([['8 + @ = 10', 2], ['16 + @ = 20', 4], ['33 + @ = 40', 7], ['55 + @ = 60', 5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['@ + 1 = 30', 29], ['@ + 6 = 50', 44], ['72 + @ = 80', 8]], 2) },
    ] },
  { titre: 'Passer la dizaine', duree: '20 min',
    attendus: ['Ajouter en passant par la dizaine (8 + 5 = 8 + 2 + 3)'],
    exos: [
      { etoiles: 1, consigne: 'Complète la boîte de dix, puis calcule.',
        eleve: deuxBoites(8, 0) + plListe(['8 + 5 = ' + B(2)]), corr: deuxBoites(8, 5) + plListe(['8 + 2 = 10', '10 + 3 = 13']) + lig('8 + 5 = ' + R(13)) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['9 + 4 = @', 13], ['7 + 6 = @', 13], ['8 + 7 = @', 15], ['46 + 5 = @', 51]], 2) },
    ] },
  { titre: 'Ajouter 9', duree: '20 min',
    attendus: ['Ajouter 9 en ajoutant 10 puis en enlevant 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ajoute 10, puis enlève 1.',
        ...P3.rmp([['23 + 9 = @', 32], ['45 + 9 = @', 54], ['16 + 9 = @', 25], ['70 + 9 = @', 79]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Inès a 38 images. On lui en donne 9. Combien en a-t-elle ?',
        corr: cm1Redac('Images d\'Inès', { suite: ['38 + 10 = 48', '48 − 1 = 47'] }, 'Inès a 47 images.') },
    ] },
];
})();

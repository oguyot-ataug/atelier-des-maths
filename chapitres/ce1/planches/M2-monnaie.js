/* CE1 · Planches : La monnaie : euros et centimes (M2). */
(() => {
const { lig, compte } = PCP, B = P3.B, R = P3.R;
const cent = (v, x) => { const r = { 1: 12, 2: 13, 5: 15, 10: 14, 20: 16, 50: 18 }[v], c = v < 10 ? '#C9824B' : '#E2C36B'; return `<circle cx="${x + r}" cy="24" r="${r}" fill="${c}" stroke="#7A4A20"/>` + ce2T(x + r, 28, v + ' c', { t: 9, g: 700, c: '#3B2B05' }); };
function argent(L, px){ let x = 3, s = ''; L.forEach(([v, u]) => { if(u === 'c'){ const r = { 1: 12, 2: 13, 5: 15, 10: 14, 20: 16, 50: 18 }[v]; s += cent(v, x); x += 2 * r + 5; } else { s += cpArgentSvg(x, v <= 2 ? 4 : 1, v); x += cpArgentL(v) + 5; } }); return cpSvg(x, 52, s, px); }
PLANCHES['ce1|La monnaie : euros et centimes'] = [
  { titre: 'Compter une somme', duree: '25 min',
    attendus: ['Calculer une somme en euros et en centimes', 'Connaître 1 € = 100 c'],
    exos: [
      { etoiles: 1, consigne: 'Combien d\'argent ?', ...compte([[argent([[20, 'e'], [10, 'e'], [2, 'e']], 200), '32 €'], [argent([[5, 'e'], [1, 'e'], [50, 'c'], [20, 'c']], 210), '6 € 70 c']], 2, 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 € = @ c', 100], ['2 pièces de 50 c = @ €', 1], ['5 pièces de 20 c = @ €', 1]], 3) },
    ] },
  { titre: 'Payer', duree: '20 min',
    attendus: ['Constituer une somme de plusieurs façons'],
    exos: [
      { etoiles: 1, consigne: 'Entoure l\'argent qu\'il faut pour payer 17 €.', ...PCP.entoure([[cpArgent([10, 5, 2], { px: 190 }), true], [cpArgent([10, 5], { px: 150 }), false], [cpArgent([5, 5, 5, 1], { px: 220 }), false]], 3) },
      { etoiles: 2, consigne: 'Écris deux façons de payer 25 € avec des billets et des pièces.', eleve: PCP.cadre(60), corr: plListe(['20 + 5 = 25', '10 + 10 + 2 + 2 + 1 = 25']) },
    ] },
  { titre: 'Problèmes de prix', duree: '25 min',
    attendus: ['Calculer un prix total et ce qui reste', 'Rendre la monnaie'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un cahier coûte 3 € et un stylo 2 €. Combien coûtent-ils ensemble ?', corr: cm1Redac('Prix total', '3 + 2 = 5', 'Ils coûtent 5 €.') },
      { etoiles: 2, cahier: true, consigne: 'J\'achète un livre à 13 €. Je paie avec un billet de 20 €. Combien me rend-on ?', corr: cm1Redac('Monnaie rendue', '13 + 7 = 20', 'On me rend 7 €.') },
      { etoiles: 3, cahier: true, consigne: 'Mia a 3 billets de 5 € et 4 pièces de 2 €. Peut-elle acheter un jeu à 25 € ?', corr: cm1Redac('Argent de Mia', { suite: ['5 + 5 + 5 = 15', '2 + 2 + 2 + 2 = 8', '15 + 8 = 23'] }, 'Mia a 23 € : il lui manque 2 €, elle ne peut pas acheter le jeu.') },
    ] },
];
})();

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
      { etoiles: 1, consigne: 'Combien d\'argent ?', ...compte([[argent([[10, 'e'], [5, 'e'], [5, 'e']], 200), '20 €'], [argent([[2, 'e'], [50, 'c'], [50, 'c'], [10, 'c']], 190), '3 € 10 c']], 2, 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['3 € = @ c', 300], ['50 c + 50 c = @ €', 1], ['1 € et 20 c = @ c', 120]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la somme la plus grande.', ...P3.chx([['', '5 €', '5 € · 90 c'], ['', '2 € 10 c', '2 € 10 c · 1 € 90 c'], ['', '1 €', '1 € · 99 c']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['10 pièces de 10 c = @ €', 1], ['4 pièces de 50 c = @ €', 2], ['2 € 50 c = @ c', 250]], 3) },
    ] },
  { titre: 'Payer', duree: '20 min',
    attendus: ['Constituer une somme de plusieurs façons'],
    exos: [
      { etoiles: 1, consigne: 'Entoure l\'argent qu\'il faut pour payer 17 €.', ...PCP.entoure([[cpArgent([10, 5, 2], { px: 190 }), true], [cpArgent([10, 5], { px: 150 }), false], [cpArgent([5, 5, 5, 1], { px: 220 }), false]], 3) },
      { etoiles: 2, consigne: 'Écris deux façons de payer 25 € avec des billets et des pièces.', eleve: PCP.cadre(60), corr: plListe(['20 + 5 = 25', '10 + 10 + 2 + 2 + 1 = 25']) },
      { etoiles: 1, consigne: 'Entoure l\'argent qu\'il faut pour payer 12 €.', ...PCP.entoure([[cpArgent([5, 5], { px: 140 }), false], [cpArgent([10, 2], { px: 150 }), true], [cpArgent([10, 1], { px: 150 }), false]], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien de pièces de 2 € faut-il pour payer… ?', ...P3.rmp([['10 € : @ pièces', 5], ['16 € : @ pièces', 8], ['20 € : @ pièces', 10]], 2) },
      { etoiles: 3, col: 1, consigne: 'Dessine l\'argent pour payer 38 € avec le moins de billets et de pièces possible.', eleve: PCP.cadre(70), corr: lig(cpArgent([20, 10, 5, 2, 1], { px: 260 })) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([['20 € = 10 € + 5 € + @ €', 5], ['50 € = 20 € + 20 € + @ €', 10], ['15 € = 5 € + 5 € + @ €', 5], ['10 € = 5 € + 2 € + @ €', 3], ['30 € = 10 € + 10 € + @ €', 10], ['25 € = 20 € + 2 € + @ €', 3]], 2) },
    ] },
  { titre: 'Problèmes de prix', duree: '25 min',
    attendus: ['Calculer un prix total et ce qui reste', 'Rendre la monnaie'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un cahier coûte 3 € et un stylo 2 €. Combien coûtent-ils ensemble ?', corr: cm1Redac('Prix total', '3 + 2 = 5', 'Ils coûtent 5 €.') },
      { etoiles: 2, cahier: true, consigne: 'J\'achète un livre à 13 €. Je paie avec un billet de 20 €. Combien me rend-on ?', corr: cm1Redac('Monnaie rendue', '13 + 7 = 20', 'On me rend 7 €.') },
      { etoiles: 3, cahier: true, consigne: 'Mia a 3 billets de 5 € et 4 pièces de 2 €. Peut-elle acheter un jeu à 25 € ?', corr: cm1Redac('Argent de Mia', { suite: ['5 + 5 + 5 = 15', '2 + 2 + 2 + 2 = 8', '15 + 8 = 23'] }, 'Mia a 23 € : il lui manque 2 €, elle ne peut pas acheter le jeu.') },
      { etoiles: 1, col: 1, consigne: 'Combien coûtent-ils ensemble ?', ...P3.rmp([['un cahier à 3 € et une règle à 2 € : @', '5 €'], ['un livre à 12 € et un stylo à 4 € : @', '16 €']], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien me rend-on ?', ...P3.rmp([['Je paie 10 € pour 7 € : @', '3 €'], ['Je paie 20 € pour 15 € : @', '5 €'], ['Je paie 50 € pour 42 € : @', '8 €']], 3) },
      { etoiles: 2, consigne: 'J\'ai 10 €. Entoure ce que je peux acheter.', ...PCP.entoure([['<span class="cpn-prix">ballon : 12 €</span>', false], ['<span class="cpn-prix">livre : 9 €</span>', true], ['<span class="cpn-prix">puzzle : 15 €</span>', false], ['<span class="cpn-prix">bille : 1 €</span>', true]], 4) },
      { etoiles: 3, consigne: 'Combien me manque-t-il ?', ...P3.rmp([['J\'ai 12 €, le jeu coûte 20 € : @', '8 €'], ['J\'ai 35 €, le vélo coûte 50 € : @', '15 €'], ['J\'ai 7 €, le livre coûte 10 € : @', '3 €'], ['J\'ai 40 €, la trottinette coûte 60 € : @', '20 €']], 3) },
    ] },
  { titre: 'L\'écriture à virgule', duree: '20 min',
    attendus: ['Écrire une somme avec une virgule (période 3)', 'Distinguer 2,05 € et 2,50 €', 'Ranger des prix'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris avec une virgule.', ...P3.rmp([['2 € et 17 c : @', '2,17 €'], ['3 € et 45 c : @', '3,45 €'], ['85 c : @', '0,85 €'], ['17 € : @', '17,00 €']], 4) },
      { etoiles: 2, col: 1, consigne: 'Écris avec une virgule. Attention aux centimes !', ...P3.rmp([['2 € et 5 c : @', '2,05 €'], ['2 € et 50 c : @', '2,50 €'], ['6 € et 8 c : @', '6,08 €']], 4) },
      { etoiles: 1, col: 1, consigne: 'Écris en euros et centimes.', ...P3.rmp([['4,30 € = @ € et @ c', 4, 30], ['0,75 € = @ c', 75], ['345 c = @ € et @ c', 3, 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande somme.', ...P3.chx([['', '12 €', '12 € · 60 c'], ['', '2,50 €', '2,05 € · 2,50 €'], ['', '1,10 €', '99 c · 1,10 €']]) },
      { etoiles: 3, consigne: 'Range du moins cher au plus cher : 1,50 € ; 95 c ; 1,05 € ; 2 €.', eleve: P3.B(30), corr: P3.R('95 c &lt; 1,05 € &lt; 1,50 € &lt; 2 €') },
      { etoiles: 3, cahier: true, consigne: 'Monsieur Milack achète une baguette à 1,15 € et un pain aux raisins à 95 centimes. Il donne un billet de 5 €. Combien le vendeur lui rend-il ?', corr: cm1Redac('Monnaie rendue', { suite: ['115 c + 95 c = 210 c', '210 c = 2,10 €', '2,10 € + 2,90 € = 5 €'] }, 'Le vendeur lui rend 2,90 €.') },
    ] },
];
})();

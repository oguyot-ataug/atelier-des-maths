/* ============================================================
   6e · Planches : Multiplication et division (N4)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const ch = it => ({ eleve: plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)), corr: plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) });
const fr = x => String(+x.toFixed(6)).replace('.', ',');
// Multiplication posée de deux décimaux (b a au plus deux chiffres significatifs) : on calcule sans virgule,
// les produits partiels sont entiers, la virgule est placée dans le résultat. o : { trous, rep } (écran).
function mult(a, b, o){ const sa = fr(a), sb = fr(b), da = (sa.split(',')[1] || '').length, db = (sb.split(',')[1] || '').length, A = +sa.replace(',', ''), Bn = sb.replace(',', '').replace(/^0+/, ''), lignes = [[' ', sa], ['×', sb]];
  const dig = Bn.split('').reverse(); let pp = [];
  if(dig.length > 1){ dig.forEach((d, i) => pp.push([i ? '+' : ' ', String(A * +d) + '0'.repeat(i), !i])); }
  const P = String(A * +Bn).padStart(da + db + 1, '0'), n = da + db, rs = n ? P.slice(0, P.length - n) + ',' + P.slice(P.length - n) : P; lignes.push(...pp);
  // le résultat garde tous ses chiffres (12,5 × 8 = 100,0) : on simplifie ensuite, hors de l'opération posée
  lignes.push([' ', rs]); if(!o) lignes[lignes.length - 1][1] = rs.replace(/\S/g, ' ');
  pp.forEach((l, i) => { if(!o) l[1] = l[1].replace(/\S/g, ' '); });
  return cm1Posee(lignes, '', o || {}); }
const mults = (l, o) => duo(l.map(([a, b]) => mult(a, b, o)));
const exoMult = (consigne, l, x) => Object.assign({ consigne, eleve: mults(l), corr: mults(l, {}), ecran: { eleve: mults(l, { trous: true }), corr: mults(l, { rep: true }) } }, x);
PLANCHES['6e|Multiplication et division'] = [
  { titre: 'Multiplier et diviser par 10, 100, 1 000', duree: '30 min',
    attendus: ['Multiplier un décimal par 10, 100, 1 000 : la virgule se décale vers la droite', 'Diviser un décimal par 10, 100, 1 000 : la virgule se décale vers la gauche', 'Multiplier par 0,1 ; 0,01 ; 0,001'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['3,47 × 10 = ' + B(), '3,47 × 100 = ' + B(), '0,08 × 1 000 = ' + B(), '12,5 × 100 = ' + B(), '0,6 × 10 = ' + B()]),
        corr: plListe(['3,47 × 10 = ' + R('34,7'), '3,47 × 100 = ' + R(347), '0,08 × 1 000 = ' + R(80), '12,5 × 100 = ' + R('1 250'), '0,6 × 10 = ' + R(6)]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe(['45,2 ÷ 10 = ' + B(), '45,2 ÷ 100 = ' + B(), '7 ÷ 1 000 = ' + B(), '308 ÷ 100 = ' + B(), '0,5 ÷ 10 = ' + B()]),
        corr: plListe(['45,2 ÷ 10 = ' + R('4,52'), '45,2 ÷ 100 = ' + R('0,452'), '7 ÷ 1 000 = ' + R('0,007'), '308 ÷ 100 = ' + R('3,08'), '0,5 ÷ 10 = ' + R('0,05')]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec 10, 100 ou 1 000.',
        eleve: plListe(['2,35 × ' + B() + ' = 2 350', '84 ÷ ' + B() + ' = 0,84', '0,07 × ' + B() + ' = 0,7', '5 600 ÷ ' + B() + ' = 5,6']),
        corr: plListe(['2,35 × ' + R('1 000') + ' = 2 350', '84 ÷ ' + R(100) + ' = 0,84', '0,07 × ' + R(10) + ' = 0,7', '5 600 ÷ ' + R('1 000') + ' = 5,6']) },
      { etoiles: 2, col: 1, consigne: 'Multiplier par 0,1 revient à diviser par 10. Calcule.',
        eleve: plListe(['56 × 0,1 = ' + B(), '56 × 0,01 = ' + B(), '3,2 × 0,1 = ' + B(), '470 × 0,001 = ' + B()]),
        corr: plListe(['56 × 0,1 = ' + R('5,6'), '56 × 0,01 = ' + R('0,56'), '3,2 × 0,1 = ' + R('0,32'), '470 × 0,001 = ' + R('0,47')]) },
      { etoiles: 2, col: 1, consigne: 'Convertis en utilisant ×10, ×100, ÷1 000…',
        eleve: plListe(['4,5 m = ' + B() + ' cm', '350 g = ' + B() + ' kg', '2,8 km = ' + B() + ' m', '75 cL = ' + B() + ' L']),
        corr: plListe(['4,5 m = ' + R(450) + ' cm', '350 g = ' + R('0,35') + ' kg', '2,8 km = ' + R('2 800') + ' m', '75 cL = ' + R('0,75') + ' L']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une ramette de 500 feuilles a une épaisseur de 5 cm. Quelle est l\'épaisseur d\'une feuille en millimètres ? Et l\'épaisseur de 1 000 ramettes, en mètres ?',
        corr: cm1Redac('Une feuille', '50 mm ÷ 500 = 0,1 mm', 'Une feuille mesure 0,1 mm d\'épaisseur.') + cm1Redac('1 000 ramettes', '5 cm × 1 000 = 5 000 cm = 50 m', 'La pile mesure 50 m.') },
    ] },
  { titre: 'Multiplier des nombres décimaux', duree: '40 min',
    attendus: ['Poser une multiplication de nombres décimaux', 'Placer la virgule dans le produit', 'Contrôler avec un ordre de grandeur'],
    exos: [
      exoMult('Pose et calcule (on multiplie sans tenir compte des virgules, puis on place la virgule).', [[4.36, 7], [12.5, 8], [0.75, 6]], { etoiles: 1 }),
      exoMult('Pose et calcule.', [[3.4, 2.5], [6.08, 1.3], [24.5, 0.12]], { etoiles: 2 }),
      { etoiles: 1, col: 1, consigne: 'Sachant que 37 × 24 = 888, complète sans poser.',
        eleve: plListe(['3,7 × 24 = ' + B(), '37 × 2,4 = ' + B(), '3,7 × 2,4 = ' + B(), '0,37 × 0,24 = ' + B()]),
        corr: plListe(['3,7 × 24 = ' + R('88,8'), '37 × 2,4 = ' + R('88,8'), '3,7 × 2,4 = ' + R('8,88'), '0,37 × 0,24 = ' + R('0,0888')]) },
      { etoiles: 2, col: 1, consigne: 'Sans calculer, entoure le résultat juste (ordre de grandeur et nombre de décimales).',
        ...ch([['5,2 × 3,9 :', '20,28', '2,028 · 20,28 · 202,8'], ['0,6 × 0,5 :', '0,3', '3 · 0,3 · 0,03'], ['49,8 × 2,1 :', '104,58', '10,458 · 104,58 · 1 045,8']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un litre de carburant coûte 1,85 €. Combien coûtent 42,5 L ? Donne d\'abord un ordre de grandeur.',
        corr: cm1Redac('Ordre de grandeur', '2 × 40 = 80', 'Environ 80 €.') + cm1Redac('Calcul exact', '1,85 × 42,5 = 78,625', 'Le plein coûte 78,625 €, soit environ 78,63 €.') },
    ] },
  { titre: 'Diviser un décimal par un entier', duree: '40 min',
    attendus: ['Poser la division d\'un nombre décimal par un nombre entier', 'Continuer une division après la virgule (quotient décimal)', 'Donner une valeur approchée d\'un quotient'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        eleve: plListe(['8,4 ÷ 2 = ' + B(), '9,6 ÷ 3 = ' + B(), '1,5 ÷ 5 = ' + B(), '0,48 ÷ 4 = ' + B(), '7 ÷ 2 = ' + B()]),
        corr: plListe(['8,4 ÷ 2 = ' + R('4,2'), '9,6 ÷ 3 = ' + R('3,2'), '1,5 ÷ 5 = ' + R('0,3'), '0,48 ÷ 4 = ' + R('0,12'), '7 ÷ 2 = ' + R('3,5')]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Pose et calcule : 57,6 ÷ 4 ; 136,5 ÷ 7 ; 9,45 ÷ 5.',
        corr: (typeof divisionDecimaleHTML === 'function' ? `<div style="display:flex;justify-content:space-around;flex-wrap:wrap;">${[['57,6', 4], ['136,5', 7], ['9,45', 5]].map(([a, b]) => `<div class="pl-div">${divisionDecimaleHTML(computeDivisionDecimale(a, b, 2), 2)}</div>`).join('')}</div>` : '') + cm1Redac('Résultats', { suite: ['57,6 ÷ 4 = 14,4', '136,5 ÷ 7 = 19,5', '9,45 ÷ 5 = 1,89'] }, 'On place la virgule au quotient au moment où l\'on abaisse le chiffre des dixièmes.') },
      { etoiles: 2, col: 1, consigne: 'Ces divisions « tombent juste » si on continue après la virgule. Calcule.',
        eleve: plListe(['3 ÷ 4 = ' + B(), '17 ÷ 8 = ' + B(), '21 ÷ 5 = ' + B(), '1 ÷ 8 = ' + B()]),
        corr: plListe(['3 ÷ 4 = ' + R('0,75'), '17 ÷ 8 = ' + R('2,125'), '21 ÷ 5 = ' + R('4,2'), '1 ÷ 8 = ' + R('0,125')]) },
      { etoiles: 2, col: 1, consigne: 'Ces divisions ne tombent pas juste. Donne une valeur approchée au centième.',
        eleve: plListe(['10 ÷ 3 ≈ ' + B(), '2 ÷ 3 ≈ ' + B(), '25 ÷ 7 ≈ ' + B()]),
        corr: plListe(['10 ÷ 3 ≈ ' + R('3,33'), '2 ÷ 3 ≈ ' + R('0,67'), '25 ÷ 7 ≈ ' + R('3,57')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Quatre amis se partagent équitablement une addition de 75,40 €. Combien chacun paie-t-il ?',
        corr: cm1Redac('Part de chacun', '75,40 ÷ 4 = 18,85', 'Chacun paie 18,85 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un ruban de 12,6 m est coupé en 8 morceaux de même longueur. Quelle est la longueur d\'un morceau, en cm ?',
        corr: cm1Redac('Longueur d\'un morceau', '12,6 ÷ 8 = 1,575', 'Un morceau mesure 1,575 m, soit 157,5 cm.') },
    ] },
  { titre: 'Problèmes de multiplication et de division', duree: '40 min',
    attendus: ['Choisir entre multiplication et division', 'Résoudre un problème en plusieurs étapes', 'Vérifier la vraisemblance d\'un résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'opération qui convient.',
        ...ch([['Prix de 6 cahiers à 2,35 € ?', '2,35 × 6', '2,35 × 6 · 2,35 ÷ 6'], ['Prix d\'un yaourt si 4 yaourts coûtent 3,20 € ?', '3,20 ÷ 4', '3,20 × 4 · 3,20 ÷ 4'], ['Longueur de 12 dalles de 0,45 m mises bout à bout ?', '0,45 × 12', '0,45 × 12 · 12 ÷ 0,45']]) },
      { etoiles: 2, col: 1, consigne: 'Au marché, les pommes coûtent 2,40 € le kg. Complète.',
        eleve: plListe(['Prix de 3 kg : ' + B() + ' €', 'Prix de 0,5 kg : ' + B() + ' €', 'Prix de 2,5 kg : ' + B() + ' €', 'Avec 12 €, on achète ' + B() + ' kg']),
        corr: plListe(['Prix de 3 kg : ' + R('7,2') + ' €', 'Prix de 0,5 kg : ' + R('1,2') + ' €', 'Prix de 2,5 kg : ' + R(6) + ' €', 'Avec 12 €, on achète ' + R(5) + ' kg']) },
      { etoiles: 2, col: 1, consigne: 'Un rectangle mesure 4,5 cm sur 2,4 cm. Complète.',
        eleve: plListe(['Aire : ' + B() + ' cm²', 'Périmètre : ' + B() + ' cm', 'Longueur du côté d\'un carré de même périmètre : ' + B() + ' cm']),
        corr: plListe(['Aire : 4,5 × 2,4 = ' + R('10,8') + ' cm²', 'Périmètre : 2 × (4,5 + 2,4) = ' + R('13,8') + ' cm', 'Longueur du côté d\'un carré de même périmètre : 13,8 ÷ 4 = ' + R('3,45') + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une voiture consomme 5,8 L aux 100 km. Combien consomme-t-elle pour 350 km ? Le carburant coûte 1,90 € le litre : quel est le coût du trajet ?',
        corr: cm1Redac('Consommation', '5,8 × 3,5 = 20,3', 'Elle consomme 20,3 L.') + cm1Redac('Coût', '20,3 × 1,90 = 38,57', 'Le trajet coûte 38,57 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un paquet de 6 bouteilles d\'eau de 1,5 L coûte 2,70 €. Quel est le prix d\'un litre d\'eau ?',
        corr: cm1Redac('Volume du paquet', '6 × 1,5 = 9', 'Le paquet contient 9 L.') + cm1Redac('Prix d\'un litre', '2,70 ÷ 9 = 0,30', 'Un litre coûte 0,30 €.') },
    ] },
];
})();

/* ============================================================
   CE2 · Planches : La monnaie (M1)
   Euros et centimes (1 € = 100 c) ; écrire un prix avec une virgule (la virgule repère les euros ;
   2,05 € ≠ 2,50 €) ; constituer une somme ; additionner des prix ; rendre la monnaie par ajouts
   successifs. Sans les mots dixième et centième.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, T } = CM2G;
// Pièces et billets : valeurs en centimes.
const piece = (v, x) => { const e = v >= 100, r = v >= 100 ? 17 : v >= 10 ? 14 : 12, c = v >= 100 ? '#C9CED6' : v >= 10 ? '#E6C35C' : '#C9824A';
  return `<circle cx="${x}" cy="22" r="${r}" fill="${c}" stroke="#6B5A2E" stroke-width="1.4"/>` + (e ? `<circle cx="${x}" cy="22" r="${r - 6}" fill="#E6C35C" stroke="#6B5A2E" stroke-width=".8"/>` : '') + T([x, 26], e ? (v / 100) + ' €' : v + ' c', { fs: 9 }); };
const billet = (v, x) => `<rect x="${x - 26}" y="6" width="52" height="32" rx="3" fill="${v === 5 ? '#B8C4CE' : v === 10 ? '#E9A99B' : v === 20 ? '#9DB8E0' : '#E8B969'}" stroke="#1F3A5C" stroke-width="1.2"/>` + T([x, 27], v + ' €', { fs: 12 });
const somme = (liste) => { let x = 0, g = ''; liste.forEach(([t, v]) => { const w = t === 'b' ? 58 : v >= 100 ? 38 : 32; g += t === 'b' ? billet(v, x + w / 2) : piece(v, x + w / 2); x += w; }); return svg(x + 4, 44, g, Math.min(320, x + 4)); };
PLANCHES['ce2|La monnaie'] = [
  { titre: 'Euros et centimes', duree: '25 min',
    attendus: ['Savoir que 1 € = 100 c', 'Calculer la valeur d\'une somme d\'argent', 'Constituer une somme avec des pièces et des billets'],
    exos: [
      { etoiles: 1, consigne: 'Combien d\'argent y a-t-il ?',
        eleve: plListe([somme([['b', 10], ['p', 200], ['p', 100], ['p', 50], ['p', 20]]) + ' ' + P3.B(8), somme([['b', 5], ['p', 100], ['p', 10], ['p', 5], ['p', 2]]) + ' ' + P3.B(8)]),
        corr: plListe([somme([['b', 10], ['p', 200], ['p', 100], ['p', 50], ['p', 20]]) + ' ' + P3.R('13 € et 70 c'), somme([['b', 5], ['p', 100], ['p', 10], ['p', 5], ['p', 2]]) + ' ' + P3.R('6 € et 17 c')]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['1 € = @ c', 100], ['3 € = @ c', 300], ['250 c = @ € et @ c', 2, 50], ['405 c = @ € et @ c', 4, 5]], 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Dessine deux façons différentes de payer 8 € 50 avec des pièces et des billets.',
        corr: cm1Redac('Première façon', '5 € + 2 € + 1 € + 50 c = 8 € 50', 'Un billet de 5 €, une pièce de 2 €, une pièce de 1 € et une pièce de 50 c.') + cm1Redac('Deuxième façon', '2 € + 2 € + 2 € + 2 € + 50 c = 8 € 50', 'Quatre pièces de 2 € et une pièce de 50 c.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['1 € = @ c', 100], ['3 € = @ c', 300], ['250 c = @ € @ c', 2, 50], ['1 € 5 c = @ c', 105]], 2) },
      { etoiles: 2, col: 1, consigne: 'Combien d\'argent ?', ...P3.rmp([['2 billets de 10 € et 3 pièces de 50 c : @', '21 € 50 c'], ['1 billet de 5 €, 2 pièces de 1 € et 4 pièces de 20 c : @', '7 € 80 c']], 5) },
      { etoiles: 2, col: 1, consigne: 'Entoure la somme la plus grande.', ...P3.chx([['', '2 € 10 c', '2 € 10 c · 1 € 99 c'], ['', '5 €', '5 € · 450 c'], ['', '300 c', '300 c · 2 € 90 c']]) },
      { etoiles: 3, col: 1, consigne: 'Combien manque-t-il pour avoir 1 € ?', ...P3.rmp([['60 c : @', '40 c'], ['75 c : @', '25 c'], ['5 c : @', '95 c']], 3) },
    ] },
  { titre: 'Écrire un prix avec une virgule', duree: '25 min',
    attendus: ['Écrire un prix avec une virgule', 'Savoir que la virgule sépare les euros des centimes', 'Comparer des prix'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris avec une virgule.',
        ...rmp([['4 € et 35 c = @ €', '4,35'], ['12 € et 5 c = @ €', '12,05'], ['7 € et 50 c = @ €', '7,50'], ['60 c = @ €', '0,60']], 4) },
      { etoiles: 1, col: 1, consigne: 'Écris en euros et centimes.',
        ...rmp([['3,25 € = @ € et @ c', 3, 25], ['8,07 € = @ € et @ c', 8, 7], ['15,90 € = @ € et @ c', 15, 90]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure le prix le plus cher.',
        ...chx([['2,05 € ou 2,50 €', '2,50 €', '2,05 € · 2,50 €'], ['9,99 € ou 10,01 €', '10,01 €', '9,99 € · 10,01 €'], ['0,80 € ou 0,08 €', '0,80 €', '0,80 € · 0,08 €']]) },
      { etoiles: 2, uneLigne: true, consigne: 'Range ces prix du moins cher au plus cher.',
        ...rmp([['4,50 € · 4,05 € · 5,40 € · 4,55 € : @', '4,05 € < 4,50 € < 4,55 € < 5,40 €']], 14) },
      { etoiles: 1, col: 1, consigne: 'Écris avec une virgule.', ...P3.rmp([['4 € 50 c : @', '4,50 €'], ['12 € 5 c : @', '12,05 €'], ['80 c : @', '0,80 €']], 3) },
      { etoiles: 1, col: 1, consigne: 'Écris en euros et centimes.', ...P3.rmp([['3,25 € : @', '3 € 25 c'], ['10,60 € : @', '10 € 60 c'], ['0,99 € : @', '99 c']], 4) },
      { etoiles: 2, col: 1, consigne: 'Entoure le prix le moins cher.', ...P3.chx([['', '2,09 €', '2,90 € · 2,09 € · 2,19 €'], ['', '0,95 €', '1,05 € · 0,95 €']]) },
      { etoiles: 2, consigne: 'Complète avec <, > ou =.', ...P3.rmp([['3,50 € @ 3,05 €', '>'], ['1 € @ 0,99 €', '>'], ['2,40 € @ 240 c', '=']], 1) },
    ] },
  { titre: 'Additionner des prix, rendre la monnaie', duree: '35 min',
    attendus: ['Additionner des prix (de tête ou en posant, virgules alignées)', 'Rendre la monnaie en complétant jusqu\'à la somme donnée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule de tête.',
        ...rmp([['2,50 € + 1,50 € = @ €', 4], ['5 € + 0,75 € = @ €', '5,75'], ['3,20 € + 2,30 € = @ €', '5,50']], 4) },
      { etoiles: 2, col: 1, consigne: 'Pose et calcule dans ton cahier (virgules alignées).',
        ...rmp([['12,35 € + 6,40 € = @ €', '18,75'], ['8,90 € + 4,75 € = @ €', '13,65']], 4) },
      { etoiles: 2, cahier: true, consigne: 'Tom achète un livre à 6,50 €. Il paie avec un billet de 10 €. Combien la marchande lui rend-elle ? Complète de 6,50 € jusqu\'à 10 €.',
        corr: cm1Redac('Monnaie rendue', { suite: ['6,50 € + 0,50 € = 7 €', '7 € + 3 € = 10 €', '0,50 € + 3 € = 3,50 €'] }, 'La marchande rend 3,50 € à Tom.', cmSauts(6.5, 10, 6.5, [[0.5, '+ 0,50 €'], [3, '+ 3 €']], { pas: 0.5, px: 380, fmt: n => n.toFixed(2).replace('.', ',') + ' €' })) },
      { etoiles: 3, cahier: true, consigne: 'Au marché, Léa achète des pommes à 2,35 € et un melon à 1,90 €. Elle paie avec un billet de 5 €. Combien lui rend-on ?',
        corr: cm1Redac('Prix des achats', '2,35 € + 1,90 € = 4,25 €', 'Léa dépense 4,25 €.') + cm1Redac('Monnaie rendue', { suite: ['4,25 € + 0,75 € = 5 €'] }, 'On lui rend 0,75 €, c\'est-à-dire 75 centimes.') },
      { etoiles: 1, col: 1, consigne: 'Calcule de tête.', ...P3.rmp([['2,50 € + 2,50 € = @', '5 €'], ['1,20 € + 0,80 € = @', '2 €'], ['10 € − 3,50 € = @', '6,50 €']], 3) },
      { etoiles: 2, col: 1, consigne: 'Combien rend-on ?', ...P3.rmp([['Prix 7,40 €, billet de 10 € : @', '2,60 €'], ['Prix 13,50 €, billet de 20 € : @', '6,50 €']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète pour arriver à 5 €.', ...P3.rmp([['3,75 € + @ = 5 €', '1,25 €'], ['4,10 € + @ = 5 €', '0,90 €']], 3) },
      { etoiles: 3, col: 1, consigne: 'J\'ai 10 €. Ai-je assez pour acheter… ? Entoure.', ...P3.chx([['un livre à 6,90 € et un stylo à 2,50 €', 'oui', 'oui · non'], ['un jeu à 8,50 € et une balle à 2 €', 'non', 'oui · non']]) },
    ] },
];
})();

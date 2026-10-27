/* CE1 · Planches : Tableaux et diagrammes (D1). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
function barres(L, max, pas, vide){ const H = 140, BW = 40, G = 20, X0 = 28, Y = v => 10 + H - v / max * H, W = X0 + L.length * (BW + G) + 10; let s = '';
  for(let v = 0; v <= max; v += pas) s += `<line x1="${X0}" y1="${Y(v)}" x2="${W - 4}" y2="${Y(v)}" stroke="#D5DBE3"/>` + ce2T(X0 - 6, Y(v) + 4, v, { t: 10, a: 'end', c: CE2C.gris });
  L.forEach(([l, v, c], i) => { const x = X0 + G / 2 + i * (BW + G); if(!vide) s += `<rect x="${x}" y="${Y(v)}" width="${BW}" height="${Y(0) - Y(v)}" fill="${c}" fill-opacity=".85" stroke="${CE2C.encre}"/>`; s += ce2T(x + BW / 2, Y(0) + 15, l, { t: 11 }); });
  s += `<line x1="${X0}" y1="6" x2="${X0}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/><line x1="${X0}" y1="${Y(0)}" x2="${W - 4}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/>`;
  return cpSvg(W, H + 30, s, Math.min(300, W)); }
const SP = [['foot', 12, '#2E9C6A'], ['danse', 8, '#C2185B'], ['judo', 6, '#2EA8C9'], ['tennis', 10, '#E9C46A']];
PLANCHES['ce1|Tableaux et diagrammes'] = [
  { titre: 'Lire un tableau', duree: '20 min',
    attendus: ['Lire un tableau, y compris à double entrée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Lis le tableau et complète.', eleve: cm1Tableau(['', 'Filles', 'Garçons'], [['CE1 A', '13', '11'], ['CE1 B', '12', '14']]) + plListe(['Filles du CE1 B : ' + B(2), 'Élèves du CE1 A : ' + B(2)]), corr: cm1Tableau(['', 'Filles', 'Garçons'], [['CE1 A', '13', '11'], ['CE1 B', '12', '14']]) + plListe(['Filles du CE1 B : ' + R(12), 'Élèves du CE1 A : ' + R(24)]) },
      { etoiles: 2, col: 1, consigne: 'Avec le même tableau.', ...P3.rmp([['Garçons en tout : @', 25], ['Filles en tout : @', 25]], 2) },
    ] },
  { titre: 'Lire un diagramme', duree: '20 min',
    attendus: ['Lire un diagramme en barres gradué de 2 en 2'],
    exos: [
      { etoiles: 1, consigne: 'Combien d\'élèves pour chaque sport ?', eleve: lig(barres(SP, 14, 2)) + plListe(SP.map(([l]) => `${l} : ${B(2)}`)), corr: lig(barres(SP, 14, 2)) + plListe(SP.map(([l, v]) => `${l} : ${R(v)}`)) },
      { etoiles: 2, col: 1, consigne: 'Avec le diagramme.', ...P3.rmp([['Le sport le plus choisi : @', 'le foot'], ['Combien de plus pour le foot que pour le judo ? @', 6]], 5) },
    ] },
  { titre: 'Construire un diagramme', duree: '25 min',
    attendus: ['Construire un diagramme en barres à partir d\'un tableau'],
    exos: [
      { etoiles: 2, consigne: 'Construis les barres : pommes 8, poires 4, fraises 10, kiwis 2.', eleve: lig(barres([['pommes', 8, '#E35D3A'], ['poires', 4, '#9BC53D'], ['fraises', 10, '#C2185B'], ['kiwis', 2, '#8A6D1F']], 10, 2, true)), corr: lig(barres([['pommes', 8, '#E35D3A'], ['poires', 4, '#9BC53D'], ['fraises', 10, '#C2185B'], ['kiwis', 2, '#8A6D1F']], 10, 2)) },
    ] },
];
})();

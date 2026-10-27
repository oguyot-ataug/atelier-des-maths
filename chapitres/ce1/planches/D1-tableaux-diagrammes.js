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
      { etoiles: 1, col: 1, consigne: 'Voici les fruits mangés à la cantine. Complète.', eleve: cm1Tableau(['', 'lundi', 'mardi'], [['pommes', '5', '7'], ['bananes', '3', '4']]) + plListe(['Pommes mardi : ' + B(2), 'Bananes en tout : ' + B(2), 'Fruits lundi : ' + B(2)]), corr: cm1Tableau(['', 'lundi', 'mardi'], [['pommes', '5', '7'], ['bananes', '3', '4']]) + plListe(['Pommes mardi : ' + R(7), 'Bananes en tout : ' + R(7), 'Fruits lundi : ' + R(8)]) },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau : au CE1 C, 10 filles et 13 garçons ; au CE1 D, 15 filles et 9 garçons.',
        eleve: cm1Tableau(['', 'Filles', 'Garçons'], [['CE1 C', '', ''], ['CE1 D', '', '']]), corr: cm1Tableau(['', 'Filles', 'Garçons'], [['CE1 C', R(10), R(13)], ['CE1 D', R(15), R(9)]]) },
      { etoiles: 3, col: 1, consigne: 'Avec le tableau des CE1 A et CE1 B.', ...P3.rmp([['Élèves du CE1 B : @', 26], ['Élèves des deux classes : @', 50]], 2) },
    ] },
  { titre: 'Lire un diagramme', duree: '20 min',
    attendus: ['Lire un diagramme en barres gradué de 2 en 2'],
    exos: [
      { etoiles: 1, consigne: 'Combien d\'élèves pour chaque sport ?', eleve: lig(barres(SP, 14, 2)) + plListe(SP.map(([l]) => `${l} : ${B(2)}`)), corr: lig(barres(SP, 14, 2)) + plListe(SP.map(([l, v]) => `${l} : ${R(v)}`)) },
      { etoiles: 2, col: 1, consigne: 'Avec le diagramme.', ...P3.rmp([['Le sport le plus choisi : @', 'le foot'], ['Combien de plus pour le foot que pour le judo ? @', 6]], 5) },
      { etoiles: 2, consigne: 'Voici les couleurs préférées de la classe. Combien d\'élèves pour chaque couleur ?',
        eleve: lig(barres([['bleu', 6, '#2EA8C9'], ['rouge', 10, '#E35D3A'], ['vert', 4, '#2E9C6A'], ['jaune', 8, '#E9C46A']], 12, 2)) + plListe(['bleu : ' + B(2) + ', rouge : ' + B(2), 'vert : ' + B(2) + ', jaune : ' + B(2), 'Élèves en tout : ' + B(2)]),
        corr: lig(barres([['bleu', 6, '#2EA8C9'], ['rouge', 10, '#E35D3A'], ['vert', 4, '#2E9C6A'], ['jaune', 8, '#E9C46A']], 12, 2)) + plListe(['bleu : ' + R(6) + ', rouge : ' + R(10), 'vert : ' + R(4) + ', jaune : ' + R(8), 'Élèves en tout : ' + R(28)]) },
    ] },
  { titre: 'Construire un diagramme', duree: '25 min',
    attendus: ['Construire un diagramme en barres à partir d\'un tableau'],
    exos: [
      { etoiles: 2, consigne: 'Construis les barres : pommes 8, poires 4, fraises 10, kiwis 2.', eleve: lig(barres([['pommes', 8, '#E35D3A'], ['poires', 4, '#9BC53D'], ['fraises', 10, '#C2185B'], ['kiwis', 2, '#8A6D1F']], 10, 2, true)), corr: lig(barres([['pommes', 8, '#E35D3A'], ['poires', 4, '#9BC53D'], ['fraises', 10, '#C2185B'], ['kiwis', 2, '#8A6D1F']], 10, 2)) },
      { etoiles: 2, consigne: 'Lis le tableau, puis construis les barres.',
        eleve: lig(cm1Tableau(['chats', 'chiens', 'lapins'], [['6', '4', '2']])) + lig(barres([['chats', 6, '#E9C46A'], ['chiens', 4, '#B07A45'], ['lapins', 2, '#C7D2DE']], 8, 2, true)),
        corr: lig(cm1Tableau(['chats', 'chiens', 'lapins'], [['6', '4', '2']])) + lig(barres([['chats', 6, '#E9C46A'], ['chiens', 4, '#B07A45'], ['lapins', 2, '#C7D2DE']], 8, 2)) },
      { etoiles: 2, col: 1, consigne: 'Avec le diagramme des fruits (exercice 1).', ...P3.rmp([['Combien de fruits en tout ? @', 24], ['Combien de fraises de plus que de poires ? @', 6]], 2) },
      { etoiles: 1, col: 1, consigne: 'Entoure.', ...P3.chx([['La barre la plus haute est celle…', 'des fraises', 'des pommes · des fraises · des kiwis'], ['La barre la plus basse est celle…', 'des kiwis', 'des poires · des kiwis']]) },
    ] },
];
})();

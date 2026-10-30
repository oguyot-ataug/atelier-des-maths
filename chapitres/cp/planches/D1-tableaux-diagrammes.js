/* CP · Planches : Tableaux et diagrammes en barres (D1). */
(() => {
const { lig } = PCP, B = P3.B, R = P3.R;
function batons(n){ let s = '', x = 6; for(let g = 0; g < Math.ceil(n / 5); g++){ const k = Math.min(5, n - g * 5);
  for(let i = 0; i < Math.min(4, k); i++) s += `<line x1="${x + i * 8}" y1="6" x2="${x + i * 8}" y2="34" stroke="${CPC.bord}" stroke-width="3" stroke-linecap="round"/>`;
  if(k === 5) s += `<line x1="${x - 4}" y1="30" x2="${x + 28}" y2="10" stroke="${CE2C.rouge}" stroke-width="3" stroke-linecap="round"/>`; x += 44; } return cpSvg(x, 40, s); }
function barres(L, max, vide){ const H = 130, BW = 40, G = 20, X0 = 28, Y = v => 10 + H - v / max * H, W = X0 + L.length * (BW + G) + 10; let s = '';
  for(let v = 0; v <= max; v++) s += `<line x1="${X0}" y1="${Y(v)}" x2="${W - 4}" y2="${Y(v)}" stroke="#D5DBE3"/>` + (v % 2 === 0 ? ce2T(X0 - 6, Y(v) + 4, v, { t: 10, a: 'end', c: CE2C.gris }) : '');
  L.forEach(([l, v, c], i) => { const x = X0 + G / 2 + i * (BW + G); if(!vide) s += `<rect x="${x}" y="${Y(v)}" width="${BW}" height="${Y(0) - Y(v)}" fill="${c}" fill-opacity=".85" stroke="${CE2C.encre}"/>`; s += ce2T(x + BW / 2, Y(0) + 15, l, { t: 11 }); });
  s += `<line x1="${X0}" y1="6" x2="${X0}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/><line x1="${X0}" y1="${Y(0)}" x2="${W - 4}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/>`;
  return cpSvg(W, H + 30, s, Math.min(280, W)); }
const ANIM = [['chat', 6, '#E9C46A'], ['chien', 8, '#B07A45'], ['lapin', 3, '#C7D2DE'], ['poisson', 5, '#2EA8C9']];
PLANCHES['cp|Tableaux et diagrammes en barres'] = [
  { titre: 'Compter avec des bâtons', duree: '15 min',
    attendus: ['Recueillir des données avec des bâtons groupés par 5'],
    exos: [
      { etoiles: 1, consigne: 'Combien de bâtons ?', ...PCP.compte([[batons(7), 7], [batons(12), 12], [batons(15), 15]], 3) },
      { etoiles: 2, consigne: 'Dessine 9 bâtons, en faisant des paquets de 5.', eleve: PCP.cadre(50), corr: lig(batons(9)) },
      { etoiles: 1, consigne: 'Combien de bâtons ?', ...PCP.compte([[batons(4), 4], [batons(10), 10], [batons(18), 18]], 3) },
      { etoiles: 3, consigne: 'Dessine 13 bâtons, en faisant des paquets de 5.', eleve: PCP.cadre(50), corr: lig(batons(13)) },
      { etoiles: 2, consigne: 'Fais un bâton pour chaque pomme.',
        eleve: lig(PCP.pommes(7, 3, 170)) + PCP.cadre(44),
        corr: lig(PCP.pommes(7, 3, 170)) + lig(batons(7)) },
    ] },
  { titre: 'Lire un tableau', duree: '20 min',
    attendus: ['Lire et compléter un tableau'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Lis le tableau des animaux préférés et complète.',
        eleve: cm1Tableau(['Animal', 'Élèves'], ANIM.map(([l, v]) => [l, String(v)])) + plListe(['Le chien : ' + B(2) + ' élèves', 'Le lapin : ' + B(2) + ' élèves']),
        corr: cm1Tableau(['Animal', 'Élèves'], ANIM.map(([l, v]) => [l, String(v)])) + plListe(['Le chien : ' + R(8) + ' élèves', 'Le lapin : ' + R(3) + ' élèves']) },
      { etoiles: 2, col: 1, consigne: 'Avec le même tableau, complète.',
        ...P3.rmp([['L\'animal le plus choisi : @', 'le chien'], ['Le moins choisi : @', 'le lapin'], ['Chiens et chats : @ élèves', 14]], 6) },
      { etoiles: 1, col: 1, consigne: 'Lis le tableau des fruits préférés et complète.',
        eleve: cm1Tableau(['Fruit', 'Élèves'], [['pomme', '7'], ['banane', '4'], ['fraise', '9']]) + plListe(['La banane : ' + B(2) + ' élèves', 'La fraise : ' + B(2) + ' élèves']),
        corr: cm1Tableau(['Fruit', 'Élèves'], [['pomme', '7'], ['banane', '4'], ['fraise', '9']]) + plListe(['La banane : ' + R(4) + ' élèves', 'La fraise : ' + R(9) + ' élèves']) },
      { etoiles: 2, col: 1, consigne: 'Avec le tableau des fruits, complète.',
        ...P3.rmp([['Le fruit le plus choisi : @', 'la fraise'], ['Le moins choisi : @', 'la banane'], ['Pommes et bananes : @ élèves', 11]], 6) },
      { etoiles: 2, consigne: 'Complète le tableau : il y a 5 garçons et 7 filles dans le groupe.',
        eleve: lig(cm1Tableau(['Garçons', 'Filles'], [['', '']])), corr: lig(cm1Tableau(['Garçons', 'Filles'], [[R(5), R(7)]])) },
    ] },
  { titre: 'Le diagramme en barres', duree: '25 min',
    attendus: ['Lire et compléter un diagramme en barres'],
    exos: [
      { etoiles: 1, consigne: 'Lis le diagramme : combien d\'élèves pour chaque animal ?',
        eleve: lig(barres(ANIM, 8)) + plListe(ANIM.map(([l]) => `${l} : ${B(2)}`)), corr: lig(barres(ANIM, 8)) + plListe(ANIM.map(([l, v]) => `${l} : ${R(v)}`)) },
      { etoiles: 2, consigne: 'Colorie les barres : rouge 4, bleu 7, vert 2.',
        eleve: lig(barres([['rouge', 4, '#E35D3A'], ['bleu', 7, '#2EA8C9'], ['vert', 2, '#2E9C6A']], 8, true)), corr: lig(barres([['rouge', 4, '#E35D3A'], ['bleu', 7, '#2EA8C9'], ['vert', 2, '#2E9C6A']], 8)) },
      { etoiles: 2, consigne: 'Colorie les barres : chat 5, chien 3, lapin 6.',
        eleve: lig(barres([['chat', 5, '#E9C46A'], ['chien', 3, '#B07A45'], ['lapin', 6, '#C7D2DE']], 8, true)), corr: lig(barres([['chat', 5, '#E9C46A'], ['chien', 3, '#B07A45'], ['lapin', 6, '#C7D2DE']], 8)) },
    ] },
  { titre: 'Le tableau à double entrée', duree: '20 min',
    attendus: ['Compléter un tableau à double entrée', 'Trouver le contenu d\'une case au croisement d\'une ligne et d\'une colonne'],
    exos: [
      { etoiles: 1, consigne: 'Dessine dans chaque case la forme de la ligne, avec la couleur de la colonne.', eleve: cm1Tableau(['', 'rouge', 'bleu'], [['<b>carré</b>', '', ''], ['<b>disque</b>', '', ''], ['<b>triangle</b>', '', '']]), corr: cm1Tableau(['', 'rouge', 'bleu'], [['<b>carré</b>', cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#E35D3A"/>`, 30), cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#2EA8C9"/>`, 30)], ['<b>disque</b>', cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#E35D3A"/>`, 30), cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#2EA8C9"/>`, 30)], ['<b>triangle</b>', cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#E35D3A"/>`, 30), cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#2EA8C9"/>`, 30)]]) },
      { etoiles: 2, consigne: 'Regarde le tableau des goûters et complète.', eleve: cm1Tableau(['', 'filles', 'garçons'], [['<b>pomme</b>', '4', '3'], ['<b>gâteau</b>', '6', '7']]) + plListe(['Les garçons qui ont pris un gâteau : ' + B(2), 'Les filles qui ont pris une pomme : ' + B(2), 'Les filles qui ont pris un gâteau : ' + B(2), 'Les garçons qui ont pris une pomme : ' + B(2)]), corr: cm1Tableau(['', 'filles', 'garçons'], [['<b>pomme</b>', '4', '3'], ['<b>gâteau</b>', '6', '7']]) + plListe(['Les garçons qui ont pris un gâteau : ' + R(7), 'Les filles qui ont pris une pomme : ' + R(4), 'Les filles qui ont pris un gâteau : ' + R(6), 'Les garçons qui ont pris une pomme : ' + R(3)]) },
    ] },
];
})();

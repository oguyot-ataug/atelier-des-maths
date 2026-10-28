/* ============================================================
   CHAPITRE : Tableaux et diagrammes en barres (CP, D1, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, organisation et gestion de
   données : recueillir des données (compter avec des bâtons groupés par cinq), les ranger dans un
   tableau simple, lire et construire un diagramme en barres (ou en images), comparer les données
   (le plus, le moins, combien de plus).
   Pensé pour être projeté : le diagramme dont les barres montent une à une.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const FRUITS = [['pomme', 7, '#E35D3A'], ['banane', 4, '#E9C46A'], ['fraise', 9, '#C2185B'], ['kiwi', 3, '#9BC53D']];
// Des bâtons de comptage : groupés par 5 (le cinquième barre les quatre autres).
function batons(n){
  let s = '', x = 6;
  for(let g = 0; g < Math.ceil(n / 5); g++){ const k = Math.min(5, n - g * 5);
    for(let i = 0; i < Math.min(4, k); i++) s += `<line x1="${x + i * 8}" y1="6" x2="${x + i * 8}" y2="34" stroke="${CPC.bord}" stroke-width="3" stroke-linecap="round"/>`;
    if(k === 5) s += `<line x1="${x - 4}" y1="30" x2="${x + 28}" y2="10" stroke="${CE2C.rouge}" stroke-width="3" stroke-linecap="round"/>`;
    x += 44; }
  return cpSvg(x, 40, s);
}
const tableau = (L, t1, t2) => cm1Tableau([t1, t2], L.map(([l, v]) => [l, String(v)]));
// Un diagramme en images : une image par élève.
function images(L){
  let s = ''; L.forEach(([l, v, c], i) => { s += ce2T(60, 26 + i * 30, l, { t: 13, a: 'end' }); for(let j = 0; j < v; j++) s += `<circle cx="${80 + j * 24}" cy="${21 + i * 30}" r="10" fill="${c}" stroke="${CPC.bord}"/>`; });
  return cpSvg(80 + Math.max(...L.map(x => x[1])) * 24 + 10, L.length * 30 + 8, s);
}
// Un diagramme en barres fixe (graduations de 1 en 1).
function barres(L, max){
  const H = 150, BW = 44, G = 22, X0 = 30, Y = v => 10 + H - v / max * H, W = X0 + L.length * (BW + G) + 10;
  let s = '';
  for(let v = 0; v <= max; v++) s += `<line x1="${X0}" y1="${Y(v)}" x2="${W - 4}" y2="${Y(v)}" stroke="${CE2C.clair}"/>` + (v % 2 === 0 ? ce2T(X0 - 6, Y(v) + 4, v, { t: 11, a: 'end', c: CE2C.gris }) : '');
  L.forEach(([l, v, c], i) => { const x = X0 + G / 2 + i * (BW + G); s += `<rect x="${x}" y="${Y(v)}" width="${BW}" height="${Y(0) - Y(v)}" fill="${c}" fill-opacity=".85" stroke="${CE2C.encre}"/>` + ce2T(x + BW / 2, Y(0) + 16, l, { t: 12 }); });
  s += `<line x1="${X0}" y1="6" x2="${X0}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/><line x1="${X0}" y1="${Y(0)}" x2="${W - 4}" y2="${Y(0)}" stroke="${CE2C.encre}" stroke-width="2"/>`;
  return cpSvg(W, H + 32, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Tableaux et diagrammes en barres', slug: 'tableaux-diagrammes',
  cours: `
${cm1Lecon(1, 'Recueillir des données')}
${cm1Def(`On demande à chaque élève son fruit préféré. Pour chaque réponse, on trace un <b>bâton</b>. Le cinquième bâton barre les quatre autres : on voit les paquets de 5.${lig(batons(7))}${P('pomme : 5 et encore 2, c\'est <b>7</b>.')}`, 'Compter avec des bâtons')}

${cm1Lecon(2, 'Le tableau')}
${cm1Def(`${tableau(FRUITS, 'Fruit préféré', 'Nombre d\'élèves')}`, 'Ranger dans un tableau')}
${cm1Regle('Dans un tableau, chaque <b>ligne</b> donne une information : on lit le nom dans la première colonne, et le nombre en face.')}

${cm1Lecon(3, 'Le diagramme')}
${cm1Def(`${lig(images(FRUITS))}${P('Un <b>diagramme en images</b> : un rond pour chaque élève.')}`, 'En images')}
${ce2AnimDiagramme('cp-d1-diag', { donnees: FRUITS, max: 10, pas: 1, titre: 'Nombre d\'élèves', texteAxes: 'Sur le côté, on compte de 1 en 1.', fin: 'La barre la plus haute est celle de la <b>fraise</b> : c\'est le fruit préféré de la classe.' })}
${cm1Regle('Dans un <b>diagramme en barres</b>, plus la barre est haute, plus le nombre est grand. Pour lire le nombre, on suit le haut de la barre jusqu\'au côté.')}

${cm1Lecon(4, 'Lire et comparer')}
${cm1Exemple('Avec le diagramme des fruits :', ['le fruit préféré est la fraise (9 élèves) ;', 'le fruit le moins choisi est le kiwi (3 élèves) ;', 'la pomme a 3 élèves de plus que la banane : 4 + 3 = 7 ;', 'en tout, 7 + 4 + 9 + 3 = 23 élèves ont répondu.'])}

${cm1Lecon(5, 'Le tableau à double entrée')}
${cm1Def(`${cm1Tableau(['', 'rouge', 'bleu', 'jaune'], [['<b>carré</b>', cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#E9C46A"/>`, 34)], ['<b>disque</b>', cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#E9C46A"/>`, 34)], ['<b>triangle</b>', cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#E9C46A"/>`, 34)]])}${P('Chaque <b>ligne</b> est une forme, chaque <b>colonne</b> une couleur. Dans la case où la ligne « triangle » croise la colonne « bleu », on trouve le triangle bleu. Le tableau montre toutes les formes de toutes les couleurs.')}`, 'Lignes et colonnes')}
${cm1Astuce('Pour trouver une case : un doigt sur la ligne, un doigt sur la colonne, et on les fait glisser jusqu\'à ce qu\'ils se rencontrent.')}
`,
  methode: `
${cm1Demo('cp-d1-m-lire', 'Lire un diagramme en barres', 'Combien d\'élèves préfèrent la banane ?')}
${cm1Demo('cp-d1-m-construire', 'Construire un diagramme', 'Transforme le tableau en diagramme en barres.')}
`,
  demos: [
    ['cp-d1-m-lire', [
      { expr: 'Je trouve la barre « banane ».', note: 'En bas du diagramme, je lis les noms.', fig: barres(FRUITS, 10) },
      { expr: 'Je suis le haut de la barre jusqu\'au côté.', note: 'Avec le doigt ou une règle bien droite.' },
      { expr: '4 élèves préfèrent la banane.', note: 'Le haut de la barre est en face du 4.' },
    ]],
    ['cp-d1-m-construire', [
      { expr: 'Je lis le tableau : chats 6, chiens 8, lapins 2.', note: 'Trois barres à dessiner.', fig: tableau([['chat', 6], ['chien', 8], ['lapin', 2]], 'Animal', 'Nombre d\'élèves') },
      { expr: 'Pour chaque animal, je monte jusqu\'au bon nombre.', note: 'Je colorie toutes les cases jusqu\'à ce nombre.', fig: barres([['chat', 6, '#E9C46A'], ['chien', 8, '#B07A45'], ['lapin', 2, '#C7D2DE']], 8) },
      { expr: 'Je vérifie chaque barre.', note: 'La plus haute est celle du chien : 8.' },
    ]],
  ],
  exos: cm1Exos('cp-d1', [
    [`Combien y a-t-il de bâtons ?${lig(batons(13))}`,
      cm1Redac('Les bâtons', '5 + 5 + 3 = 13', 'Deux paquets de 5 et encore 3 : il y a 13 bâtons.')],
    [`Lis le tableau. Combien d'élèves viennent à pied ?${cm1Tableau(['Pour venir à l\'école', 'Nombre d\'élèves'], [['à pied', '8'], ['en voiture', '6'], ['à vélo', '3'], ['en bus', '5']])}`,
      cm1Redac('À pied', '', '8 élèves viennent à pied.')],
    ['Avec ce même tableau : comment viennent le moins d\'élèves ?',
      cm1Redac('Le moins d\'élèves', '', 'C\'est à vélo : 3 élèves seulement.')],
    [`Lis le diagramme. Quel est le jeu préféré ?${lig(barres([['ballon', 6, '#2EA8C9'], ['corde', 4, '#E35D3A'], ['billes', 8, '#7A4FC0']], 8))}`,
      cm1Redac('Le jeu préféré', '', 'La barre la plus haute est celle des billes (8 élèves) : c\'est le jeu préféré.')],
    ['Avec ce diagramme : combien d\'élèves de plus préfèrent le ballon à la corde ?',
      cm1Redac('Ballon et corde', '4 + 2 = 6', 'Il y a 2 élèves de plus pour le ballon.')],
    ['Avec ce diagramme : combien d\'élèves ont répondu en tout ?',
      cm1Redac('Nombre d\'élèves', { suite: ['6 + 4 = 10', '10 + 8 = 18'] }, '18 élèves ont répondu.')],
    ['Dessine le diagramme : rouge 5 élèves, bleu 7 élèves, vert 2 élèves.',
      cm1Redac('Le diagramme des couleurs', '', 'Trois barres : rouge jusqu\'à 5, bleu jusqu\'à 7, vert jusqu\'à 2.', barres([['rouge', 5, '#E35D3A'], ['bleu', 7, '#2EA8C9'], ['vert', 2, '#2E9C6A']], 8))],
    [`Dans ce tableau, que trouve-t-on dans la case de la ligne « disque » et de la colonne « jaune » ?${cm1Tableau(['', 'rouge', 'bleu', 'jaune'], [['<b>carré</b>', cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<rect x="6" y="6" width="28" height="28" fill="#E9C46A"/>`, 34)], ['<b>disque</b>', cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<circle cx="20" cy="20" r="14" fill="#E9C46A"/>`, 34)], ['<b>triangle</b>', cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#E35D3A"/>`, 34), cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#2EA8C9"/>`, 34), cpSvg(40, 40, `<polygon points="20,5 36,34 4,34" fill="#E9C46A"/>`, 34)]])}`,
      cm1Redac('La case', '', 'On trouve le disque jaune.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le premier diagramme en barres', [
    'Le diagramme en barres a été inventé il y a environ 240 ans, en 1786, par un Écossais, <b>William Playfair</b>. Il voulait montrer d\'un coup d\'œil ce que son pays achetait et vendait aux autres pays.',
    'Avant, on écrivait seulement de longs tableaux de nombres. Avec les barres, on voit tout de suite ce qui est le plus grand !',
  ]),
  quiz: [
    { q: 'Dans un diagramme en barres, la barre la plus haute montre…', opts: ['le plus grand nombre', 'le plus petit nombre', 'le premier nom'], correct: 0 },
    { q: `Combien de bâtons ?${lig(batons(8))}`, opts: ['7', '8', '9'], correct: 1 },
    { q: 'Pommes 7, bananes 4 : combien de pommes de plus ?', opts: ['3', '11', '4'], correct: 0 },
  ],
  flash: [
    { l: 5, q: 'Dans un tableau à double entrée, une case est au croisement…', r: ['d\'une ligne et d\'une colonne', 'de deux lignes', 'de deux colonnes', 'du titre'], ok: 0 },
    { l: 1, q: `Combien ?${lig(batons(5))}`, r: ['4', '5', '6', '1'], ok: 1 },
    { l: 1, q: `Combien ?${lig(batons(11))}`, r: ['10', '11', '12', '6'], ok: 1 },
    { l: 2, q: 'Dans un tableau, on lit le nombre…', r: ['en face du nom', 'au hasard', 'en haut à gauche', 'nulle part'], ok: 0 },
    { l: 3, q: 'La barre la plus courte montre…', r: ['le plus petit nombre', 'le plus grand nombre', 'rien', 'le total'], ok: 0 },
    { l: 4, q: 'Chats 6, chiens 8. Combien de chiens de plus ?', r: ['2', '14', '8', '6'], ok: 0 },
  ],
});
})();

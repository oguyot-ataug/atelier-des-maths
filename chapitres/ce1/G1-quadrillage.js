/* ============================================================
   CHAPITRE : Se repérer sur un quadrillage (CE1, G1, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, espace et géométrie : repérer une
   case d'un quadrillage par une lettre (sa colonne) et un nombre (sa ligne), placer un objet dans
   une case donnée, coder et décoder un déplacement avec des flèches, lire un plan simple (la classe).
   Pensé pour être projeté : la case trouvée au croisement de sa colonne et de sa ligne, le robot.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const LET = 'ABCDEFGH';
// Quadrillage repéré : lettres en haut, nombres à gauche ; objets [[type, colonne, ligne]] ; o.on : cases colorées.
function grille(nc, nr, objets, o){
  o = o || {}; const C = o.C || 38, X = 26, Y = 24; let s = '';
  for(let c = 0; c < nc; c++) s += ce2T(X + c * C + C / 2, 16, LET[c], { t: 14, g: 700, c: o.col === c ? CE2C.rouge : CPC.bord });
  for(let r = 0; r < nr; r++) s += ce2T(13, Y + r * C + C / 2 + 5, r + 1, { t: 14, g: 700, c: o.lig === r ? CE2C.rouge : CPC.bord });
  if(o.col != null) s += `<rect x="${X + o.col * C}" y="${Y}" width="${C}" height="${nr * C}" fill="#FDE3D2" opacity=".7"/>`;
  if(o.lig != null) s += `<rect x="${X}" y="${Y + o.lig * C}" width="${nc * C}" height="${C}" fill="#E3F3FA" opacity=".8"/>`;
  (o.on || []).forEach(([c, r, coul]) => { s += `<rect x="${X + c * C + 2}" y="${Y + r * C + 2}" width="${C - 4}" height="${C - 4}" fill="${coul || '#FFE08A'}"/>`; });
  s += `<rect x="${X}" y="${Y}" width="${nc * C}" height="${nr * C}" fill="none" stroke="${CPC.bord}" stroke-width="2"/>`;
  for(let c = 1; c < nc; c++) s += `<line x1="${X + c * C}" y1="${Y}" x2="${X + c * C}" y2="${Y + nr * C}" stroke="#9FB0C4"/>`;
  for(let r = 1; r < nr; r++) s += `<line x1="${X}" y1="${Y + r * C}" x2="${X + nc * C}" y2="${Y + r * C}" stroke="#9FB0C4"/>`;
  objets.forEach(([t, c, r]) => { s += CP_ICO[t](X + c * C + C / 2, Y + r * C + C / 2); });
  return cpSvg(X + nc * C + 4, Y + nr * C + 4, s, o.px);
}
const OBJ = [['etoile', 1, 0], ['coeur', 3, 2], ['rond', 0, 3], ['arbre', 4, 1], ['carre', 2, 3]];

/* ---- Trouver une case : on suit la colonne, puis la ligne ---- */
function animCase(id){
  const PR = [['B', 1, 3], ['D', 3, 2], ['E', 4, 1], ['A', 0, 4]].map(([l, c, n]) => ({ nom: l + n, c, r: n - 1 }));
  return cmAnim(id, {
    etat: { p: 0 }, duree: 6000, legende: 'La lettre donne la colonne (on descend), le nombre donne la ligne (on va vers la droite) : la case est au croisement.',
    controles: a => ce2Choix(id, PR, a),
    dessin: (t, a) => {
      const p = PR[a.etat.p], o = {};
      if(t > .15) o.col = p.c; if(t > .45) o.lig = p.r; if(t > .75) o.on = [[p.c, p.r, '#F7B267']];
      const texte = t < .15 ? `Où est la case <b>${p.nom}</b> ?` : t < .45 ? `La lettre <b>${p.nom[0]}</b> : je repère la colonne ${p.nom[0]}.` : t < .75 ? `Le nombre <b>${p.nom.slice(1)}</b> : je repère la ligne ${p.nom.slice(1)}.` : `La case <b>${p.nom}</b> est au croisement de la colonne ${p.nom[0]} et de la ligne ${p.nom.slice(1)}.`;
      return { scene: grille(5, 4, OBJ, Object.assign(o, { C: 46 })).replace('class="pl-libre"', 'class="pl-libre cma-svg"'), texte };
    } });
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Se repérer sur un quadrillage', slug: 'quadrillage',
  cours: `
${cm1Lecon(1, 'Repérer une case')}
${animCase('ce1-g1-case')}
${cm1Def(`${lig(grille(5, 4, OBJ))}${P('L\'étoile est dans la case <b>B1</b> : colonne B, ligne 1. Le cœur est en <b>D3</b>.')}`, 'Une lettre et un nombre')}
${cm1Regle('Pour nommer une case, on écrit d\'abord la <b>lettre de la colonne</b>, puis le <b>nombre de la ligne</b>.')}
${cm1Rem('C\'est comme au jeu de la bataille navale ! Au tableau : faire placer des objets dans un quadrillage dessiné au sol ou affiché.')}

${cm1Lecon(2, 'Coder un déplacement')}
${cpAnimRobot('ce1-g1-robot', { presets: [
  { nom: 'Vers l\'étoile', nc: 6, nr: 4, dep: [0, 3], but: [4, 0], code: 'ddhhhdd' },
  { nom: 'Contourner', nc: 6, nr: 4, dep: [0, 0], but: [5, 3], murs: [[2, 0], [2, 1], [2, 2]], code: 'bbbddddd' }] })}
${cm1Regle('Chaque flèche fait avancer d\'une case. On lit le code dans l\'ordre, une flèche après l\'autre.')}

${cm1Lecon(3, 'Lire un plan')}
${cm1Def(`${lig(cpSvg(320, 200, `<rect x="4" y="4" width="312" height="192" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="3"/><rect x="120" y="10" width="80" height="14" fill="#2E9C6A"/>${ce2T(160, 40, 'tableau', { t: 12 })}${[0, 1, 2].map(r => [0, 1].map(c => `<rect x="${50 + c * 140}" y="${70 + r * 42}" width="80" height="24" fill="#B07A45" stroke="#6B4423"/>`).join('')).join('')}<rect x="250" y="190" width="50" height="8" fill="#fff"/>${ce2T(275, 186, 'porte', { t: 11 })}<rect x="10" y="60" width="14" height="100" fill="#9FD3F0"/>${ce2T(17, 176, 'fenêtres', { t: 10 })}`, 280))}${P('Un <b>plan</b>, c\'est la classe vue <b>de dessus</b>, en tout petit. Les tables sont des rectangles.')}`, 'Le plan de la classe')}
${cm1Rem('Faire dessiner le plan de la classe, puis y placer sa propre table. Où est la porte par rapport au tableau ?')}

${cm1Lecon(4, 'Repérer un nœud')}
${cm1Regle('Sur un quadrillage, on peut aussi se placer sur les <b>nœuds</b> (les croisements des lignes). Pour tracer une figure, on relie des nœuds à la règle.')}
${lig(cpQuadFig(6, 4, [[[[1, 3], [5, 3], [3, 1]], '#E9C46A']], { points: [[1, 3, 'A'], [5, 3, 'B'], [3, 1, 'C']] }))}
`,
  methode: `
${cm1Demo('ce1-g1-m-placer', 'Placer un objet dans la case C2', 'Dessine un rond dans la case C2.')}
${cm1Demo('ce1-g1-m-nommer', 'Nommer la case du cœur', 'Dans quelle case est le cœur ?')}
`,
  demos: [
    ['ce1-g1-m-placer', [
      { expr: 'Colonne C', note: 'Je pose le doigt sur la lettre C et je descends.', fig: grille(4, 3, [], { col: 2 }) },
      { expr: 'Ligne 2', note: 'Je pose l\'autre doigt sur le 2 et je vais vers la droite.', fig: grille(4, 3, [], { col: 2, lig: 1 }) },
      { expr: 'Case C2', note: 'Les deux doigts se rencontrent : je dessine le rond.', fig: grille(4, 3, [['rond', 2, 1]]) },
    ]],
    ['ce1-g1-m-nommer', [
      { expr: 'Je monte jusqu\'à la lettre : D.', note: 'C\'est la colonne du cœur.', fig: grille(5, 4, OBJ, { col: 3 }) },
      { expr: 'Je vais à gauche jusqu\'au nombre : 3.', note: 'C\'est la ligne du cœur.' },
      { expr: 'Le cœur est en D3.', note: 'La lettre d\'abord, puis le nombre.' },
    ]],
  ],
  exos: cm1Exos('ce1-g1', [
    [`Dans quelle case est l'arbre ?${lig(grille(5, 4, OBJ))}`,
      cm1Redac('L\'arbre', '', 'L\'arbre est dans la case E2.')],
    ['Avec le même quadrillage : quel dessin est dans la case A4 ?',
      cm1Redac('La case A4', '', 'Dans la case A4, il y a le rond bleu.')],
    ['Avec le même quadrillage : dans quelle case est le carré vert ?',
      cm1Redac('Le carré', '', 'Le carré vert est dans la case C4.')],
    ['Colorie les cases B2, C3 et D1 d\'un quadrillage de 4 colonnes et 3 lignes.',
      cm1Redac('Les cases coloriées', '', 'B2 : colonne B, ligne 2 ; C3 : colonne C, ligne 3 ; D1 : colonne D, ligne 1.', grille(4, 3, [], { on: [[1, 1], [2, 2], [3, 0]], px: 160 }))],
    [`Le robot part de A1 et suit ${cpCode('ddbb')}. Dans quelle case arrive-t-il ?`,
      cm1Redac('Arrivée du robot', '', 'Deux cases à droite : C1 ; deux cases en bas : C3. Le robot arrive en C3.', grille(4, 3, [], { on: [[0, 0, '#C7E6F5'], [2, 2]], px: 160 }))],
    ['Écris le code pour aller de A3 à D1.',
      cm1Redac('Le code', cpCode('dddhh'), 'Trois cases à droite, puis deux vers le haut (les lignes 1 sont en haut).')],
    ['Sur le plan d\'une classe, une table mesure 2 carreaux. Dans la vraie classe, est-elle plus grande ou plus petite que sur le plan ?',
      cm1Redac('Le plan', '', 'Dans la vraie classe, la table est bien plus grande : sur un plan, tout est dessiné en tout petit.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la bataille navale', [
    'Le jeu de la <b>bataille navale</b> existe depuis plus de 100 ans : on le jouait sur du papier quadrillé. Chaque joueur cache ses bateaux dans un quadrillage repéré par des lettres et des nombres, et annonce des cases : « B5 ! » — « Touché ! »',
    'Les cartes routières et les plans de villes utilisent la même idée : dans l\'index, chaque rue est repérée par une case, par exemple « D3 ».',
  ]),
  quiz: [
    { q: 'Pour nommer une case, on écrit…', opts: ['la lettre puis le nombre', 'le nombre puis la lettre', 'deux lettres'], correct: 0 },
    { q: `Dans quelle case est l'étoile ?${lig(grille(4, 3, [['etoile', 2, 1]], { px: 150 }))}`, opts: ['C2', 'B3', '2C'], correct: 0 },
    { q: 'Un plan, c\'est un lieu vu…', opts: ['de dessus', 'de côté', 'de dessous'], correct: 0 },
  ],
  flash: [
    { l: 1, q: `Quelle case ?${lig(grille(3, 3, [['coeur', 0, 2]], { px: 120 }))}`, r: ['A3', 'C1', '3A', 'A1'], ok: 0 },
    { l: 1, q: `Quelle case ?${lig(grille(3, 3, [['rond', 2, 0]], { px: 120 }))}`, r: ['C1', 'A3', 'B1', '1C'], ok: 0 },
    { l: 2, q: `Que fait ${cpCode('h')} ?`, r: ['Une case vers le haut', 'Une case vers le bas', 'Une case à droite', 'Rien'], ok: 0 },
    { l: 3, q: 'Sur un plan, les objets sont…', r: ['plus petits qu\'en vrai', 'plus grands qu\'en vrai', 'de la même taille', 'invisibles'], ok: 0 },
  ],
});
})();

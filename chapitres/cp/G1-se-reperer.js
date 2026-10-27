/* ============================================================
   CHAPITRE : Se repérer dans l'espace (CP, G1, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : situer un objet par rapport à
   un autre ou à soi (sur, sous, devant, derrière, à gauche, à droite, entre, au-dessus,
   au-dessous, près, loin), se repérer sur un quadrillage, coder et décoder un déplacement avec
   des flèches.
   Pensé pour être projeté : le chat qui change de place et la souris qui suit les flèches sont animés.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const C = CP_Q, ICO = CP_ICO, quad = cpQuad, PAS = CP_PAS, fleche = cpFleche, code = cpCode, suivre = cpSuivre;

/* ---- La souris suit les flèches, une case par flèche ---- */
function animChemin(id, o){
  const nc = 6, nr = 4;
  const PARCOURS = [
    { nom: 'Chemin 1', dep: [0, 3], code: 'ddhhdd', cible: [4, 1] },
    { nom: 'Chemin 2', dep: [0, 0], code: 'dbbbddd', cible: [4, 3] },
    { nom: 'Chemin 3', dep: [5, 3], code: 'hhgggh', cible: [2, 0] },
  ];
  return cmAnim(id, {
    etat: { p: 0 }, duree: a => 2500 + PARCOURS[a.etat.p].code.length * 1100,
    legende: 'Avant de lancer : « Où va arriver la souris ? » La classe lit les flèches une par une, puis on vérifie.',
    controles: a => `<div class="cmp-modeles">${PARCOURS.map((p, i) => cmBtn(id, 'p', i, p.nom, a.etat.p === i)).join('')}</div>`,
    dessin: (t, a) => {
      const P = PARCOURS[a.etat.p], L = suivre(P.dep, P.code), n = P.code.length;
      const f = cmPhase(t, .15, .92) * n, i = Math.min(n - 1, Math.floor(f)), k = cmDoux(Math.min(1, (f - i) * 1.4));
      const A = L[i], B = L[i + 1], x = t < .15 ? A[0] : A[0] + (B[0] - A[0]) * k, y = t < .15 ? A[1] : A[1] + (B[1] - A[1]) * k;
      const fait = t < .15 ? [] : L.slice(0, i + 1).concat([[x, y]]);
      let s = `<rect x="3" y="3" width="${nc * C}" height="${nr * C}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
      for(let c = 1; c < nc; c++) s += `<line x1="${3 + c * C}" y1="3" x2="${3 + c * C}" y2="${3 + nr * C}" stroke="#9FB0C4"/>`;
      for(let r = 1; r < nr; r++) s += `<line x1="3" y1="${3 + r * C}" x2="${3 + nc * C}" y2="${3 + r * C}" stroke="#9FB0C4"/>`;
      if(fait.length > 1) s += `<polyline points="${fait.map(([c, r]) => `${3 + c * C + C / 2},${3 + r * C + C / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4"/>`;
      s += ICO.fromage(3 + P.cible[0] * C + C / 2, 3 + P.cible[1] * C + C / 2) + ICO.souris(3 + x * C + C / 2, 3 + y * C + C / 2);
      const fl = P.code.split('').map((d, q) => `<g transform="translate(${nc * C + 20 + (q % 4) * 36} ${10 + Math.floor(q / 4) * 38})">${fleche(d, t >= .15 && t < .92 && q === i).replace(/<svg[^>]*>|<\/svg>/g, '')}</g>`).join('');
      const fin = t >= .92, arrive = L[n][0] === P.cible[0] && L[n][1] === P.cible[1];
      const NOMS = { d: 'à droite', g: 'à gauche', h: 'en haut', b: 'en bas' };
      const texte = t < .15 ? 'La souris va suivre les flèches. Arrivera-t-elle au fromage ?'
        : !fin ? `Flèche ${i + 1} : une case <b>${NOMS[P.code[i]]}</b>.`
        : arrive ? 'La souris est arrivée au <b>fromage</b> !' : 'Oh ! La souris n\'est pas sur le fromage.';
      return { scene: `<svg viewBox="0 0 ${nc * C + 170} ${nr * C + 8}" class="cma-svg" style="max-width:560px;">${s}${fl}</svg>`, texte };
    } });
}
// Le chat et la table, fixés à une position (indices de CP_POS : 0 sur, 1 sous, 2 devant, 3 derrière, 4 à gauche, 5 à droite).
const scene = (i, px) => { const P = CP_POS[i];
  return cpSvg(440, 230, `<rect x="0" y="0" width="440" height="120" fill="#F7F3EC"/><rect x="0" y="120" width="440" height="110" fill="#EFE6D6"/>` + (P.derriere ? cpChat(P.x, P.y, P.s) + cpTable : cpTable + cpChat(P.x, P.y, P.s)), px || 260); };
// Une étagère à trois planches : [haut, milieu, bas].
function etagere(objets){
  const D = { ballon: (x, y) => `<circle cx="${x}" cy="${y}" r="18" fill="#E35D3A" stroke="#1F3A5C" stroke-width="1.5"/><path d="M${x - 18} ${y} q18 -10 36 0 M${x - 18} ${y} q18 10 36 0" fill="none" stroke="#fff" stroke-width="2.5"/>`,
    livre: (x, y) => `<rect x="${x - 22}" y="${y - 14}" width="44" height="32" rx="2" fill="#2EA8C9" stroke="#1F3A5C" stroke-width="1.5"/><line x1="${x}" y1="${y - 14}" x2="${x}" y2="${y + 18}" stroke="#1F3A5C"/>`,
    ours: (x, y) => `<circle cx="${x - 12}" cy="${y - 14}" r="6" fill="#B07A45"/><circle cx="${x + 12}" cy="${y - 14}" r="6" fill="#B07A45"/><circle cx="${x}" cy="${y - 4}" r="14" fill="#B07A45" stroke="#6B4423"/><circle cx="${x - 5}" cy="${y - 6}" r="1.8" fill="#1F3A5C"/><circle cx="${x + 5}" cy="${y - 6}" r="1.8" fill="#1F3A5C"/><ellipse cx="${x}" cy="${y + 1}" rx="5" ry="4" fill="#E8C9A0"/><ellipse cx="${x}" cy="${y + 16}" rx="12" ry="6" fill="#B07A45"/>`,
    voiture: (x, y) => `<rect x="${x - 24}" y="${y - 4}" width="48" height="16" rx="5" fill="#2E9C6A" stroke="#1F3A5C" stroke-width="1.5"/><rect x="${x - 12}" y="${y - 16}" width="24" height="13" rx="4" fill="#2E9C6A" stroke="#1F3A5C" stroke-width="1.5"/><circle cx="${x - 13}" cy="${y + 13}" r="6" fill="#1F3A5C"/><circle cx="${x + 13}" cy="${y + 13}" r="6" fill="#1F3A5C"/>` };
  let s = `<rect x="10" y="4" width="10" height="196" fill="#B07A45"/><rect x="160" y="4" width="10" height="196" fill="#B07A45"/>`;
  [64, 128, 192].forEach(y => { s += `<rect x="10" y="${y}" width="160" height="8" fill="#B07A45" stroke="#6B4423"/>`; });
  objets.forEach((o, i) => { if(o) s += D[o](90, 40 + i * 64); });
  return cpSvg(180, 202, s, 150);
}
// Une file d'enfants vus de face, avec leur prénom en dessous.
function file(noms, coul){
  let s = '';
  noms.forEach((n, i) => { const x = 40 + i * 76;
    s += `<circle cx="${x}" cy="24" r="14" fill="#F6C9A0" stroke="#9A5B34"/><rect x="${x - 15}" y="40" width="30" height="40" rx="9" fill="${coul[i]}"/>` + ce2T(x, 100, n, { t: 14, g: 700 }); });
  return cpSvg(noms.length * 76 + 4, 108, s, Math.min(420, noms.length * 76 + 4));
}

cm1Chapitre({
  niveau: 'cp', titre: 'Se repérer dans l\'espace', slug: 'se-reperer',
  cours: `
${cm1Lecon(1, 'Sur, sous, devant, derrière')}
${cpAnimPositions('cp-g1-chat')}
${cm1Def(`Pour dire <b>où</b> est un objet, on le situe par rapport à un autre objet (ici, la table).${lig(scene(0, 200), scene(1, 200))}<p style="text-align:center;margin:2px 0;">Le chat est <b>sur</b> la table. Le chat est <b>sous</b> la table.</p>${lig(scene(2, 200), scene(3, 200))}<p style="text-align:center;margin:2px 0;">Le chat est <b>devant</b> la table. Le chat est <b>derrière</b> la table.</p>`, 'Je dis où il est')}
${cm1Rem('Au tableau : faire vivre les mots avec la classe (« Mettez votre trousse <b>sur</b> la table, <b>sous</b> la chaise… »), puis seulement après avec les dessins. Ce qui est <b>derrière</b> est souvent un peu caché.')}

${cm1Lecon(2, 'À gauche, à droite, entre')}
${cm1Def(`J'ai une <b>main gauche</b> et une <b>main droite</b>.${lig(cpGaucheDroite())}<p style="text-align:center;margin:2px 0;">L'enfant est vu de dos : il lève sa main <b>gauche</b>.</p>`, 'Gauche et droite')}
${cm1Astuce('Avec la main <b>gauche</b>, le pouce et l\'index tendus (dos de la main vers soi) dessinent la lettre <b>L</b>, comme dans « Left », gauche en anglais. En France, on écrit de gauche à droite : on commence à gauche de la page.')}
${cm1Regle(`Dans une file, <b>entre</b> veut dire : au milieu de deux autres.${lig(file(['Lou', 'Sam', 'Noé'], ['#E35D3A', '#2E9C6A', '#2EA8C9']))}<p style="text-align:center;margin:2px 0;">Sam est <b>entre</b> Lou et Noé. Sur le dessin, Lou est <b>à gauche</b> de Sam, Noé est <b>à droite</b> de Sam.</p>`)}
${cm1Rem('Sur un dessin, la gauche et la droite sont celles de la personne qui regarde le dessin. Pour un enfant vu de face, c\'est l\'inverse : sa main droite est de notre côté gauche. Au CP, on travaille surtout avec des dessins et des enfants vus de dos.')}

${cm1Lecon(3, 'Au-dessus, au-dessous, près, loin')}
${cm1Def(`${lig(etagere(['ballon', 'livre', 'ours']))}<p style="text-align:center;margin:2px 0;">Le ballon est <b>au-dessus</b> du livre. L'ours est <b>au-dessous</b> du livre.<br>Le livre est <b>entre</b> le ballon et l'ours.</p>`, 'Plus haut, plus bas')}
${cm1Regle(`<b>Près</b>, c'est à côté, tout proche. <b>Loin</b>, c'est à une grande distance.${lig(scene(6, 200), scene(7, 200))}<p style="text-align:center;margin:2px 0;">Le chat est <b>près</b> de la table, puis <b>loin</b> de la table.</p>`)}

${cm1Lecon(4, 'Se déplacer sur un quadrillage')}
${cm1Def(`Un <b>quadrillage</b> est fait de cases. Une flèche dit d'avancer d'<b>une case</b> :${lig(fleche('d'), fleche('g'), fleche('h'), fleche('b'))}<p style="text-align:center;margin:2px 0;">à droite, à gauche, en haut, en bas.</p>`, 'Les flèches')}
${animChemin('cp-g1-chemin')}
${cm1Regle(`Pour suivre un code, je lis les flèches <b>une par une</b>, dans l'ordre, et j'avance d'une case à chaque flèche.${lig(quad(5, 3, [['souris', 0, 2], ['fromage', 3, 0]], { chemin: suivre([0, 2], 'dddhh') }))}<p style="text-align:center;margin:2px 0;">Code : ${code('dddhh')}</p>`)}
${cm1Astuce('On peut jouer en vrai : un élève est le « robot » sur le carrelage de la cour ou un grand quadrillage au sol, un autre lui montre les flèches. Le robot n\'avance que d\'une case par flèche !')}
`,
  methode: `
${cm1Demo('cp-g1-m-ou', 'Dire où se trouve un objet', 'Où est le cœur ? Dis-le avec une phrase.')}
${cm1Demo('cp-g1-m-code', 'Suivre un code de flèches', 'La souris part de sa case et suit le code. Où arrive-t-elle ?')}
`,
  demos: [
    ['cp-g1-m-ou', [
      { expr: 'Je regarde le quadrillage.', note: 'Il y a une étoile, un cœur et un rond.', fig: quad(3, 2, [['etoile', 1, 0], ['coeur', 1, 1], ['rond', 2, 1]]) },
      { expr: 'Je choisis un repère : l\'étoile.', note: 'Le cœur est juste en dessous d\'elle.', fig: quad(3, 2, [['etoile', 1, 0], ['coeur', 1, 1], ['rond', 2, 1]], { colorie: [[1, 0, '#FFF3C4']] }) },
      { expr: 'Le cœur est <b>au-dessous</b> de l\'étoile.', note: 'Avec un autre repère : le cœur est aussi <b>à gauche</b> du rond.' },
    ]],
    ['cp-g1-m-code', [
      { expr: `Le code : ${code('ddhd')}`, note: 'Je mets mon doigt sur la souris.', fig: quad(5, 3, [['souris', 0, 2]]) },
      { expr: 'Première et deuxième flèches : deux cases à droite.', note: 'Une case par flèche, pas plus.', fig: quad(5, 3, [['souris', 2, 2]], { chemin: suivre([0, 2], 'dd') }) },
      { expr: 'Troisième flèche : une case en haut.', note: 'Je monte d\'une seule case.', fig: quad(5, 3, [['souris', 2, 1]], { chemin: suivre([0, 2], 'ddh') }) },
      { expr: 'Quatrième flèche : une case à droite.', note: 'Plus de flèche : la souris est arrivée. Je colorie la case d\'arrivée.', fig: quad(5, 3, [['souris', 3, 1]], { chemin: suivre([0, 2], 'ddhd'), colorie: [[3, 1]] }) },
    ]],
  ],
  exos: cm1Exos('cp-g1', [
    [`Où est le chat ? Dis-le avec une phrase.${lig(scene(1, 220))}`,
      cm1Redac('Où est le chat', '', 'Le chat est sous la table.')],
    [`Où est le chat ?${lig(scene(3, 220))}`,
      cm1Redac('Où est le chat', '', 'Le chat est derrière la table : on ne voit que sa tête.')],
    [`Regarde la file.${lig(file(['Léa', 'Tom', 'Inès', 'Hugo'], ['#E35D3A', '#2E9C6A', '#2EA8C9', '#F5B700']))}${cm1Liste(['Qui est entre Tom et Hugo ?', 'Qui est tout à gauche ?'])}`,
      cm1Redac('La file', '', 'Inès est entre Tom et Hugo. Léa est tout à gauche de la file.')],
    [`Sur l'étagère, qu'y a-t-il au-dessus de la voiture ?${lig(etagere(['livre', 'voiture', 'ballon']))}`,
      cm1Redac('Au-dessus de la voiture', '', 'Le livre est au-dessus de la voiture (et le ballon est au-dessous).')],
    [`Quelle forme est juste à droite de l'étoile ? Et juste au-dessous du cœur ?${lig(quad(4, 3, [['etoile', 1, 1], ['coeur', 2, 0], ['carre', 2, 1], ['rond', 0, 1], ['arbre', 3, 2]]))}`,
      cm1Redac('Les formes', '', 'Le carré est juste à droite de l\'étoile. C\'est aussi le carré qui est juste au-dessous du cœur.', quad(4, 3, [['etoile', 1, 1], ['coeur', 2, 0], ['carre', 2, 1], ['rond', 0, 1], ['arbre', 3, 2]], { colorie: [[2, 1, '#D8F0E3']], px: 150 }))],
    [`La souris suit le code ${code('dddh')}. Arrive-t-elle au fromage ?${lig(quad(5, 3, [['souris', 0, 2], ['fromage', 3, 1]]))}`,
      cm1Redac('Le chemin de la souris', '', 'Trois cases à droite, puis une en haut : la souris arrive au fromage.', quad(5, 3, [['souris', 3, 1]], { chemin: suivre([0, 2], 'dddh'), px: 170 }))],
    [`Écris un code de flèches pour amener la souris au fromage.${lig(quad(5, 3, [['souris', 0, 0], ['fromage', 4, 2]]))}`,
      cm1Redac('Un code pour la souris', `${code('ddddbb')}`, 'Quatre cases à droite, puis deux en bas : la souris arrive au fromage. (D\'autres codes marchent aussi, par exemple deux en bas puis quatre à droite.)', quad(5, 3, [['souris', 0, 0], ['fromage', 4, 2]], { chemin: suivre([0, 0], 'ddddbb'), px: 170 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : une tortue qui suit des ordres', [
    'Il y a environ 2 500 ans, à <b>Babylone</b> (dans l\'actuel Irak), quelqu\'un a dessiné une carte du monde sur une petite tablette d\'argile. Les cartes servent à dire <b>où</b> sont les choses et comment y aller.',
    'Vers 1970, le savant <b>Seymour Papert</b> a inventé pour les enfants une « tortue » : un petit robot posé par terre, qui avance et tourne quand on lui donne des ordres, comme tes flèches. Aujourd\'hui, beaucoup d\'écoles ont de petits robots de ce genre.',
  ]),
  quiz: [
    { q: `Où est le chat ?${lig(scene(0, 200))}`, opts: ['Sous la table', 'Sur la table', 'Derrière la table'], correct: 1 },
    { q: `Sur l'étagère, qu'est-ce qui est au-dessous du livre ?${lig(etagere(['ballon', 'livre', 'ours']))}`, opts: ['Le ballon', 'L\'ours', 'Rien'], correct: 1 },
    { q: `La souris suit ${code('ddb')}. Où arrive-t-elle ?${lig(quad(3, 2, [['souris', 0, 0], ['etoile', 2, 1], ['coeur', 2, 0]]))}`, opts: ['Sur le cœur', 'Sur l\'étoile', 'Elle ne bouge pas'], correct: 1 },
  ],
  flash: [
    { l: 1, q: `Où est le chat ?${lig(scene(1, 170))}`, r: ['Sur la table', 'Sous la table', 'Devant la table', 'Loin'], ok: 1 },
    { l: 1, q: `Où est le chat ?${lig(scene(2, 170))}`, r: ['Derrière la table', 'Devant la table', 'Sur la table', 'Sous la table'], ok: 1 },
    { l: 2, q: `Qui est entre Lou et Noé ?${lig(file(['Lou', 'Sam', 'Noé'], ['#E35D3A', '#2E9C6A', '#2EA8C9']))}`, r: ['Lou', 'Sam', 'Noé', 'Personne'], ok: 1 },
    { l: 2, q: `L'enfant est vu de dos. Quelle main lève-t-il ?${lig(cpGaucheDroite({ px: 130 }))}`, r: ['La droite', 'La gauche', 'Les deux', 'Aucune'], ok: 1 },
    { l: 3, q: `Qu'est-ce qui est au-dessus du livre ?${lig(etagere(['ballon', 'livre', 'ours']))}`, r: ['L\'ours', 'Le ballon', 'La table', 'Rien'], ok: 1 },
    { l: 3, q: `Le chat est-il près ou loin de la table ?${lig(scene(7, 170))}`, r: ['Près', 'Loin', 'Sur', 'Sous'], ok: 1 },
    { l: 4, q: `Que veut dire cette flèche ?${lig(fleche('h'))}`, r: ['Une case en bas', 'Une case en haut', 'Une case à droite', 'Une case à gauche'], ok: 1 },
    { l: 4, q: `Que veut dire cette flèche ?${lig(fleche('g'))}`, r: ['Une case à droite', 'Une case à gauche', 'Une case en haut', 'Une case en bas'], ok: 1 },
    { l: 4, q: `La souris suit ${code('dh')}. Où arrive-t-elle ?${lig(quad(2, 2, [['souris', 0, 1], ['coeur', 1, 0], ['etoile', 1, 1]]))}`, r: ['Sur l\'étoile', 'Sur le cœur', 'Hors du quadrillage', 'Elle reste là'], ok: 1 },
  ],
});
})();

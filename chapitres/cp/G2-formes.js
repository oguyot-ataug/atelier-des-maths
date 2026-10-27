/* ============================================================
   CHAPITRE : Carré, rectangle, triangle, disque (CP, G2, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, espace et géométrie : reconnaître
   et nommer le carré, le rectangle, le triangle et le disque (son bord est un cercle) ; les
   décrire avec les mots côté et sommet ; les retrouver dans des assemblages et dans le monde ;
   les reproduire sur quadrillage.
   Pensé pour être projeté : le doigt qui fait le tour de chaque forme et compte les côtés.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Une forme seule (dessin SVG), posée dans un cadre de 90 × 90 ; o.r : rotation.
function forme(t, o){
  o = o || {}; const c = o.c || { carre: '#2EA8C9', rectangle: '#2E9C6A', rectangle2: '#2E9C6A', triangle: '#E9C46A', triangle2: '#E9C46A', disque: '#E35D3A' }[t];
  const g = { carre: '<rect x="20" y="20" width="50" height="50"/>', rectangle: '<rect x="8" y="28" width="74" height="36"/>', triangle: '<polygon points="45,12 80,76 10,76"/>', disque: '<circle cx="45" cy="45" r="32"/>',
    triangle2: '<polygon points="12,20 80,40 22,78"/>', rectangle2: '<rect x="28" y="6" width="34" height="78"/>' }[t];
  return cpSvg(90, 90, `<g fill="${c}" fill-opacity=".45" stroke="${CPC.bord}" stroke-width="2.5" transform="rotate(${o.r || 0} 45 45)">${g}</g>`, o.px || 72);
}
// Une maison faite de formes (rectangle, triangle, carrés, disque).
function maison(o){
  o = o || {}; const h = o.montre;
  const st = k => `fill-opacity="${h && h !== k ? .15 : .55}" stroke="${CPC.bord}" stroke-width="2"`;
  return cpSvg(220, 200, `<rect x="40" y="90" width="140" height="100" fill="#2E9C6A" ${st('rectangle')}/><polygon points="30,92 110,22 190,92" fill="#E35D3A" ${st('triangle')}/>`
    + `<rect x="60" y="112" width="34" height="34" fill="#2EA8C9" ${st('carre')}/><rect x="126" y="112" width="34" height="34" fill="#2EA8C9" ${st('carre')}/><rect x="96" y="140" width="28" height="50" fill="#B07A45" ${st('rectangle')}/><circle cx="110" cy="66" r="12" fill="#E9C46A" ${st('disque')}/>`, o.px || 200);
}
// Une figure à reproduire sur quadrillage (segments entre nœuds).
function quadFig(nc, nr, polys, o){
  o = o || {}; const c = o.c || 26; let s = '';
  for(let i = 0; i <= nc; i++) s += `<line x1="${4 + i * c}" y1="4" x2="${4 + i * c}" y2="${4 + nr * c}" stroke="#C7D2DE"/>`;
  for(let j = 0; j <= nr; j++) s += `<line x1="4" y1="${4 + j * c}" x2="${4 + nc * c}" y2="${4 + j * c}" stroke="#C7D2DE"/>`;
  polys.forEach(([pts, col]) => { s += `<polygon points="${pts.map(([x, y]) => `${4 + x * c},${4 + y * c}`).join(' ')}" fill="${col}" fill-opacity=".35" stroke="${CPC.bord}" stroke-width="2.5"/>`; });
  return cpSvg(nc * c + 8, nr * c + 8, s, o.px);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Carré, rectangle, triangle, disque', slug: 'formes',
  cours: `
${cm1Lecon(1, 'Quatre formes à connaître')}
${cm1Def(`${lig(forme('carre'), forme('rectangle'), forme('triangle'), forme('disque'))}${P('un <b>carré</b>, un <b>rectangle</b>, un <b>triangle</b>, un <b>disque</b>')}`, 'Les formes')}
${cpAnimFormes('cp-g2-formes')}
${cm1Regle('Les traits droits du bord s\'appellent les <b>côtés</b>. Les « pointes », là où deux côtés se rencontrent, s\'appellent les <b>sommets</b>.', 'Les mots')}

${cm1Lecon(2, 'Les reconnaître')}
${cm1Regle(`${cm1Liste(['Le <b>carré</b> a 4 côtés, tous de la même longueur, et 4 sommets.', 'Le <b>rectangle</b> a 4 côtés et 4 sommets : deux grands côtés et deux petits côtés.', 'Le <b>triangle</b> a 3 côtés et 3 sommets.', 'Le <b>disque</b> n\'a ni côté ni sommet : son bord est tout rond, c\'est un <b>cercle</b>.'])}`, 'À savoir')}
${cm1Astuce(`Une forme reste la même quand on la tourne !${lig(forme('carre', { r: 45 }), forme('triangle2'), forme('rectangle2'))}${P('Un carré posé sur la pointe, un triangle tourné, un rectangle debout.')}`)}
${cm1Rem('Au tableau : faire toucher de vraies formes (en carton, en bois) et faire deviner une forme cachée dans un sac en la décrivant : « Elle a 3 côtés… ».')}

${cm1Lecon(3, 'Les formes autour de nous')}
${cm1Def(`${lig(maison())}${P('La maison est faite d\'un <b>rectangle</b> (le mur, la porte), d\'un <b>triangle</b> (le toit), de <b>carrés</b> (les fenêtres) et d\'un <b>disque</b> (la lucarne).')}`, 'Assembler des formes')}
${cm1Rem('Dans la classe : la porte est un rectangle, une horloge est un disque, un carreau du sol est un carré, un panneau « Attention » est un triangle.')}

${cm1Lecon(4, 'Reproduire sur un quadrillage')}
${cm1Regle(`Pour reproduire une forme, je compte les carreaux pour chaque côté, puis je trace à la règle d'un point à un autre.${lig(quadFig(8, 5, [[[[1, 1], [4, 1], [4, 4], [1, 4]], '#2EA8C9'], [[[5, 4], [7, 1], [7, 4]], '#E9C46A']]))}${P('Un carré de 3 carreaux de côté, et un triangle.')}`)}
`,
  methode: `
${cm1Demo('cp-g2-m-reconnaitre', 'Reconnaître une forme', 'Quelle est cette forme ?')}
${cm1Demo('cp-g2-m-reproduire', 'Reproduire un rectangle', 'Reproduis ce rectangle sur ton quadrillage.')}
`,
  demos: [
    ['cp-g2-m-reconnaitre', [
      { expr: 'Je regarde le bord.', note: 'Il est fait de traits droits : ce n\'est pas un disque.', fig: forme('rectangle', { r: 90 }) },
      { expr: 'Je compte les côtés : 4.', note: 'C\'est un carré ou un rectangle.' },
      { expr: 'Les côtés n\'ont pas tous la même longueur.', note: 'Deux grands, deux petits : c\'est un <b>rectangle</b> (posé debout).' },
    ]],
    ['cp-g2-m-reproduire', [
      { expr: 'Je compte : 5 carreaux de long, 2 carreaux de large.', note: 'Je repère le point de départ.', fig: quadFig(7, 4, [[[[1, 1], [6, 1], [6, 3], [1, 3]], '#2E9C6A']]) },
      { expr: 'Je trace le grand côté : 5 carreaux.', note: 'À la règle, en suivant une ligne du quadrillage.', fig: quadFig(7, 4, [[[[1, 1], [6, 1]], '#2E9C6A']]) },
      { expr: 'Je trace les autres côtés : 2, puis 5, puis 2.', note: 'Je reviens au point de départ : le rectangle est fermé.', fig: quadFig(7, 4, [[[[1, 1], [6, 1], [6, 3], [1, 3]], '#2E9C6A']]) },
    ]],
  ],
  exos: cm1Exos('cp-g2', [
    [`Nomme ces formes.${lig(forme('triangle'), forme('disque'), forme('carre'))}`,
      cm1Redac('Les formes', '', 'Un triangle, un disque, un carré.')],
    ['Combien de côtés a un triangle ? Combien de sommets ?',
      cm1Redac('Le triangle', '', 'Un triangle a 3 côtés et 3 sommets.', forme('triangle', { px: 60 }))],
    [`Cette forme est-elle un carré ?${lig(forme('carre', { r: 45 }))}`,
      cm1Redac('Le carré tourné', '', 'Oui : elle a 4 côtés de la même longueur. C\'est un carré posé sur sa pointe.')],
    ['Quelle forme n\'a aucun sommet ?',
      cm1Redac('Sans sommet', '', 'Le disque n\'a aucun sommet : son bord est tout rond.', forme('disque', { px: 60 }))],
    [`Dans la maison, combien vois-tu de carrés ?${lig(maison({ px: 170 }))}`,
      cm1Redac('Les carrés de la maison', '', 'Il y a 2 carrés : les deux fenêtres.', maison({ montre: 'carre', px: 140 }))],
    ['Je suis une forme à 4 côtés. J\'ai deux grands côtés et deux petits côtés. Qui suis-je ?',
      cm1Redac('Devinette', '', 'Je suis un rectangle.', forme('rectangle', { px: 60 }))],
    [`Reproduis ce triangle sur un quadrillage.${lig(quadFig(6, 4, [[[[1, 3], [5, 3], [1, 1]], '#E9C46A']]))}`,
      cm1Redac('Le triangle', '', 'Je trace un côté de 4 carreaux, un côté de 2 carreaux, puis je relie les deux bouts.', quadFig(6, 4, [[[[1, 3], [5, 3], [1, 1]], '#E9C46A']], { px: 130 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le tangram', [
    'Le <b>tangram</b> est un jeu venu de <b>Chine</b>, connu en Europe depuis environ 200 ans. Avec 7 pièces (des triangles, un carré et une autre forme), on fabrique des centaines de dessins : un chat, une maison, un bateau…',
    'Le jeu a une seule règle : utiliser les 7 pièces, sans qu\'elles se chevauchent. Essaie de faire un carré avec deux triangles pareils !',
  ]),
  quiz: [
    { q: 'Combien de côtés a un rectangle ?', opts: ['3', '4', '5'], correct: 1 },
    { q: `Quelle est cette forme ?${lig(forme('triangle2'))}`, opts: ['Un carré', 'Un triangle', 'Un disque'], correct: 1 },
    { q: 'Le bord d\'un disque s\'appelle…', opts: ['un côté', 'un cercle', 'un sommet'], correct: 1 },
  ],
  flash: [
    { l: 1, q: `Quelle forme ?${lig(forme('disque', { px: 60 }))}`, r: ['Un carré', 'Un disque', 'Un triangle', 'Un rectangle'], ok: 1 },
    { l: 1, q: `Quelle forme ?${lig(forme('rectangle', { px: 60 }))}`, r: ['Un rectangle', 'Un carré', 'Un triangle', 'Un disque'], ok: 0 },
    { l: 2, q: 'Combien de sommets a un carré ?', r: ['3', '4', '0', '5'], ok: 1 },
    { l: 2, q: 'Quelle forme a 3 côtés ?', r: ['Le triangle', 'Le carré', 'Le disque', 'Le rectangle'], ok: 0 },
    { l: 2, q: `Quelle forme ?${lig(forme('carre', { r: 45, px: 60 }))}`, r: ['Un carré', 'Un triangle', 'Un disque', 'Un rectangle'], ok: 0 },
    { l: 3, q: 'Une roue de vélo a la forme…', r: ['d\'un carré', 'd\'un disque', 'd\'un triangle', 'd\'un rectangle'], ok: 1 },
    { l: 3, q: 'Une porte a la forme…', r: ['d\'un rectangle', 'd\'un disque', 'd\'un triangle', 'd\'un cercle'], ok: 0 },
  ],
});
})();

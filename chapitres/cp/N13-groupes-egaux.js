/* ============================================================
   CHAPITRE : Des groupes égaux (CP, N13, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : résoudre des problèmes de
   groupements (combien en tout dans plusieurs paquets pareils) et de partage équitable, par le
   dessin, par l'addition répétée (3 + 3 + 3 + 3) ou en comptant de 2 en 2, de 5 en 5, de 10 en 10 ;
   sans le signe ×, qui viendra au CE1.
   Pensé pour être projeté : les paquets qui apparaissent un à un, la distribution « un pour toi… ».
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Des paquets dessinés : g paquets de n jetons.
function paquets(g, n, c){
  let s = '';
  for(let i = 0; i < g; i++){ const x0 = 4 + i * 70; s += `<rect x="${x0}" y="4" width="62" height="56" rx="10" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="1.6"/>`;
    for(let j = 0; j < n; j++) s += `<circle cx="${x0 + 14 + (j % 3) * 17}" cy="${20 + Math.floor(j / 3) * 18}" r="7" fill="${c || CPC.jeton}" stroke="${CPC.bord}"/>`; }
  return cpSvg(g * 70 + 6, 64, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Des groupes égaux', slug: 'groupes-egaux',
  cours: `
${cm1Lecon(1, 'Des paquets pareils')}
${cpAnimGroupes('cp-n13-groupes', { g: 4, n: 3 })}
${cm1Def(`${lig(paquets(4, 3))}${P('4 paquets de 3 jetons : <b>3 + 3 + 3 + 3 = 12</b>. Il y a 12 jetons.')}`, 'Groupes égaux')}
${cm1Regle('Quand tous les paquets ont le <b>même nombre</b> d\'objets, on peut ajouter plusieurs fois le même nombre, ou compter de 3 en 3 : 3, 6, 9, 12.')}

${cm1Lecon(2, 'Compter de 2 en 2, de 5 en 5, de 10 en 10')}
${cm1Def(`${cm1Liste(['de 2 en 2 : 2, 4, 6, 8, 10, 12… (les paires de chaussettes) ;', 'de 5 en 5 : 5, 10, 15, 20, 25… (les doigts d\'une main) ;', 'de 10 en 10 : 10, 20, 30, 40… (les barres de dix).'])}`, 'Compter vite')}
${cm1Exemple('Combien de doigts sur 4 mains ?', ['5, 10, 15, 20 : il y a 20 doigts.'])}

${cm1Lecon(3, 'Partager équitablement')}
${ce2AnimPartage('cp-n13-partage', { legende: 'On distribue un par un, chacun son tour, comme des cartes : chacun aura autant.', presets: [{ nom: '12 bonbons, 3 enfants', total: 12, parts: 3 }, { nom: '10 images, 2 enfants', total: 10, parts: 2 }, { nom: '15 billes, 5 enfants', total: 15, parts: 5 }] })}
${cm1Def(`Partager <b>équitablement</b>, c'est donner <b>la même quantité</b> à chacun.${lig(paquets(3, 4, CPC.jeton2))}${P('12 bonbons pour 3 enfants : chacun en a 4, car 4 + 4 + 4 = 12.')}`, 'Partager')}

${cm1Lecon(4, 'Résoudre des problèmes')}
${cm1Exemple('Exemple', [`Une boîte contient 5 gâteaux. Combien de gâteaux dans 3 boîtes ?${cm1Redac('Gâteaux dans 3 boîtes', '5 + 5 + 5 = 15', 'Il y a 15 gâteaux dans 3 boîtes.', paquets(3, 5, '#B07A45'))}`])}
${cm1Regle('Jan a 3 paquets de 20 biscuits : il a <b>trois fois vingt</b> biscuits. On écrit 20 + 20 + 20 = 60.', 'Le mot « fois »')}
${cm1Rem('Au CP, on dit « fois » et on écrit l\'addition répétée ; le signe de la multiplication viendra au CE1.')}
`,
  methode: `
${cm1Demo('cp-n13-m-groupes', 'Combien en tout ?', 'Il y a 5 vases. Dans chaque vase, il y a 2 fleurs. Combien de fleurs en tout ?')}
${cm1Demo('cp-n13-m-partage', 'Partager équitablement', 'On partage 8 crêpes entre 2 enfants. Combien de crêpes pour chacun ?')}
`,
  demos: [
    ['cp-n13-m-groupes', [
      { expr: 'Je dessine 5 vases avec 2 fleurs.', note: '5 paquets pareils.', fig: paquets(5, 2, '#E35D3A') },
      { expr: '2, 4, 6, 8, 10', note: 'Je compte de 2 en 2.' },
      { expr: '2 + 2 + 2 + 2 + 2 = 10', note: 'Il y a <b>10 fleurs</b> en tout.' },
    ]],
    ['cp-n13-m-partage', [
      { expr: 'Je distribue une crêpe à chacun, chacun son tour.', note: 'Un pour toi, un pour moi…', fig: paquets(2, 1, '#E9C46A') },
      { expr: 'Je continue jusqu\'à ce qu\'il n\'y en ait plus.', note: 'Il y a 8 crêpes à donner.', fig: paquets(2, 4, '#E9C46A') },
      { expr: '4 + 4 = 8', note: 'Chaque enfant a <b>4 crêpes</b>.' },
    ]],
  ],
  exos: cm1Exos('cp-n13', [
    [`Combien de jetons en tout ?${lig(paquets(3, 4))}`,
      cm1Redac('Nombre de jetons', '4 + 4 + 4 = 12', 'Il y a 12 jetons en tout.')],
    ['Un tricycle a 3 roues. Combien de roues ont 4 tricycles ?',
      cm1Redac('Roues des tricycles', '3 + 3 + 3 + 3 = 12', '4 tricycles ont 12 roues.')],
    ['Combien de doigts y a-t-il sur 6 mains ?',
      cm1Redac('Doigts de 6 mains', { suite: ['5, 10, 15', '20, 25, 30'] }, 'Il y a 30 doigts sur 6 mains.')],
    ['On partage 10 billes entre 2 enfants, équitablement. Combien de billes pour chacun ?',
      cm1Redac('Billes pour chacun', '5 + 5 = 10', 'Chaque enfant a 5 billes.', paquets(2, 5, CPC.jeton2))],
    ['On range 20 œufs dans des boîtes de 10. Combien faut-il de boîtes ?',
      cm1Redac('Boîtes d\'œufs', '10 + 10 = 20', 'Il faut 2 boîtes.')],
    ['15 enfants font des équipes de 5. Combien y a-t-il d\'équipes ?',
      cm1Redac('Nombre d\'équipes', '5 + 5 + 5 = 15', 'Il y a 3 équipes.', paquets(3, 5, '#2E9C6A'))],
    ['Un paquet contient 10 gâteaux. Maman achète 4 paquets. Combien de gâteaux a-t-elle ?',
      cm1Redac('Gâteaux de maman', '10 + 10 + 10 + 10 = 40', 'Maman a 40 gâteaux.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter par paquets', [
    'Les bergers d\'autrefois comptaient leurs moutons en faisant des <b>encoches</b> sur un bâton, souvent groupées par 5 ou par 10 pour s\'y retrouver.',
    'On vend encore beaucoup de choses par paquets égaux : la <b>douzaine</b> d\'œufs (12), la <b>paire</b> de chaussettes (2)… Compter les paquets, c\'est plus rapide que compter les objets un par un !',
  ]),
  quiz: [
    { q: '3 paquets de 5, c\'est…', opts: ['8', '15', '35'], correct: 1 },
    { q: '2 + 2 + 2 + 2 = …', opts: ['8', '6', '10'], correct: 0 },
    { q: '12 bonbons pour 2 enfants : chacun en a…', opts: ['6', '10', '24'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '4 + 4 + 4 = …', r: ['12', '8', '16', '444'], ok: 0 },
    { l: 1, q: '5 + 5 + 5 + 5 = …', r: ['20', '15', '25', '10'], ok: 0 },
    { l: 2, q: '2, 4, 6, 8, …', r: ['9', '10', '12', '7'], ok: 1 },
    { l: 2, q: '5, 10, 15, …', r: ['16', '20', '25', '30'], ok: 1 },
    { l: 2, q: '10, 20, 30, …', r: ['31', '40', '50', '300'], ok: 1 },
    { l: 3, q: '8 bonbons pour 2 enfants : chacun en a…', r: ['4', '6', '10', '16'], ok: 0 },
    { l: 4, q: 'Trois fois dix, c\'est…', r: ['10 + 10 + 10', '3 + 10', '10 + 3', '3 + 3'], ok: 0 },
    { l: 4, q: 'Une paire de chaussettes, c\'est…', r: ['1 chaussette', '2 chaussettes', '10 chaussettes', '12 chaussettes'], ok: 1 },
  ],
});
})();

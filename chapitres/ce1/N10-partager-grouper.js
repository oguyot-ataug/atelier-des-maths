/* ============================================================
   CHAPITRE : Partager et faire des groupes (CE1, N10, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : résoudre des problèmes de partage
   équitable (combien pour chacun ?) et de groupement (combien de groupes ?), par la manipulation, le
   dessin, l'addition ou la soustraction répétée et les tables de multiplication ; repérer qu'il peut
   rester des objets ; pas de division posée ni de signe ÷.
   Pensé pour être projeté : la distribution « un pour toi, un pour moi », les paquets qui se forment.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Des assiettes avec des gâteaux : g assiettes de n, r gâteaux restants à côté.
function assiettes(g, n, r){
  let s = '';
  for(let i = 0; i < g; i++){ const x0 = 6 + i * 74; s += `<ellipse cx="${x0 + 32}" cy="36" rx="32" ry="26" fill="#fff" stroke="${CPC.bord}" stroke-width="1.6"/>`;
    for(let j = 0; j < n; j++) s += `<circle cx="${x0 + 16 + (j % 3) * 16}" cy="${28 + Math.floor(j / 3) * 16}" r="6.5" fill="#B07A45" stroke="#6B4423"/>`; }
  for(let j = 0; j < (r || 0); j++) s += `<circle cx="${g * 74 + 20 + j * 16}" cy="36" r="6.5" fill="#B07A45" stroke="#6B4423"/>`;
  return cpSvg(g * 74 + (r ? r * 16 + 30 : 10), 70, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Partager et faire des groupes', slug: 'partager-grouper',
  cours: `
${cm1Lecon(1, 'Partager équitablement')}
${ce2AnimPartage('ce1-n10-partage', { legende: 'On distribue un par un, chacun son tour : à la fin, chacun en a autant.', presets: [{ nom: '15 billes, 3 enfants', total: 15, parts: 3 }, { nom: '20 cartes, 4 enfants', total: 20, parts: 4 }, { nom: '14 bonbons, 4 enfants', total: 14, parts: 4 }] })}
${cm1Def(`${lig(assiettes(3, 5))}${P('15 gâteaux partagés équitablement sur 3 assiettes : <b>5 gâteaux</b> par assiette, car 3 × 5 = 15.')}`, 'Combien pour chacun ?')}
${cm1Regle('Pour trouver la part de chacun, je cherche dans les tables : 3 × … = 15. C\'est <b>5</b>.')}

${cm1Lecon(2, 'Faire des groupes')}
${cpAnimGroupes('ce1-n10-groupes', { g: 4, n: 5, legende: '20 élèves en équipes de 5 : on forme les équipes une par une, jusqu\'à ce qu\'il n\'y ait plus d\'élèves.' })}
${cm1Def('20 élèves font des équipes de 5. Combien d\'équipes ? On compte de 5 en 5 jusqu\'à 20 : 5, 10, 15, 20. Il y a <b>4 équipes</b>, car 4 × 5 = 20.', 'Combien de groupes ?')}

${cm1Lecon(3, 'Quand il en reste')}
${cm1Def(`${lig(assiettes(4, 3, 2))}${P('14 gâteaux sur 4 assiettes : 3 gâteaux par assiette (4 × 3 = 12), et il en <b>reste 2</b>, qu\'on ne peut pas partager équitablement.')}`, 'Le reste')}
${cm1Astuce('On vérifie toujours : (nombre de parts × part de chacun) + reste = total. Ici : 12 + 2 = 14.')}

${cm1Lecon(4, 'Partage ou groupes ?')}
${cm1Tableau(['Je connais…', 'Je cherche…', 'Exemple'], [
  ['le total et le nombre de parts', 'combien dans chaque part', '12 billes pour 3 enfants : 4 chacun'],
  ['le total et la taille d\'un groupe', 'combien de groupes', '12 billes par sacs de 3 : 4 sacs'],
])}
`,
  methode: `
${cm1Demo('ce1-n10-m-partage', 'Partager 18 images entre 3 enfants', 'Combien d\'images aura chaque enfant ?')}
${cm1Demo('ce1-n10-m-groupes', 'Ranger 30 œufs par boîtes de 10', 'Combien de boîtes faut-il ?')}
`,
  demos: [
    ['ce1-n10-m-partage', [
      { expr: 'Je cherche : 3 × … = 18', note: 'La part de chacun, répétée 3 fois, doit faire 18.' },
      { expr: '3 × 6 = 18', note: 'Je trouve 6 (6 + 6 + 6 = 18).' },
      { expr: 'Chaque enfant aura 6 images.', note: 'La phrase réponse.' },
    ]],
    ['ce1-n10-m-groupes', [
      { expr: '10, 20, 30', note: 'Je compte de 10 en 10 jusqu\'à 30.' },
      { expr: '3 × 10 = 30', note: '3 boîtes de 10.' },
      { expr: 'Il faut 3 boîtes.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('ce1-n10', [
    ['On partage 12 crêpes entre 4 enfants. Combien de crêpes pour chacun ?',
      cm1Redac('Crêpes pour chacun', '4 × 3 = 12', 'Chaque enfant a 3 crêpes.')],
    ['On range 25 crayons par paquets de 5. Combien de paquets ?',
      cm1Redac('Paquets de crayons', '5 × 5 = 25', 'Il y a 5 paquets.')],
    ['Partage 20 € entre 2 enfants.',
      cm1Redac('Partage des 20 €', '2 × 10 = 20', 'Chaque enfant a 10 €.')],
    ['Une maîtresse a 30 élèves. Elle fait des équipes de 10. Combien d\'équipes ?',
      cm1Redac('Équipes', '3 × 10 = 30', 'Il y a 3 équipes.')],
    ['On partage 11 billes entre 2 enfants. Combien chacun ? Combien en reste-t-il ?',
      cm1Redac('Partage des billes', { suite: ['2 × 5 = 10', '11 − 10 = 1'] }, 'Chaque enfant a 5 billes et il en reste 1.')],
    ['16 roues : combien de vélos (2 roues chacun) peut-on équiper ?',
      cm1Redac('Les vélos', '8 × 2 = 16', 'On peut équiper 8 vélos.')],
    ['Il y a 23 élèves. Il faut des tables de 5 places. Combien de tables faut-il pour que tout le monde soit assis ?',
      cm1Redac('Les tables', { suite: ['4 × 5 = 20', '23 − 20 = 3'] }, '4 tables ne suffisent pas : il reste 3 élèves. Il faut 5 tables.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le partage des Égyptiens', [
    'Dans le papyrus Rhind, un livre de problèmes égyptien de près de 4 000 ans, un problème demande de partager 9 pains entre 10 hommes ! Les scribes savaient le faire avec des fractions.',
    'Partager équitablement est une vieille question : partager les récoltes, l\'eau, les terres… Les mathématiques ont aidé à le faire de façon juste.',
  ]),
  quiz: [
    { q: '15 bonbons pour 5 enfants : chacun a…', opts: ['3', '10', '20'], correct: 0 },
    { q: '20 élèves en groupes de 4 : combien de groupes ?', opts: ['5', '4', '16'], correct: 0 },
    { q: '13 billes pour 2 enfants : il en reste…', opts: ['1', '0', '3'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '10 pour 2 : chacun a…', r: ['5', '8', '12', '20'], ok: 0 },
    { l: 1, q: '30 pour 3 : chacun a…', r: ['10', '27', '33', '3'], ok: 0 },
    { l: 2, q: '40 en paquets de 10 : … paquets', r: ['4', '30', '50', '10'], ok: 0 },
    { l: 3, q: '9 pour 2 : chacun 4, il en reste…', r: ['1', '0', '2', '5'], ok: 0 },
    { l: 4, q: '12 roues : combien de voitures (4 roues) ?', r: ['3', '4', '8', '16'], ok: 0 },
  ],
});
})();

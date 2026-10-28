/* ============================================================
   CHAPITRE : Les fractions : partager en parts égales (CE1, N9, périodes 2-3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : les fractions d'un tout, toutes
   inférieures ou égales à 1, de dénominateur 2, 3, 4, 5, 6, 8 ou 10. Les mots moitié, demi, quart ;
   interpréter, représenter, écrire et lire les fractions unitaires (un demi… un dixième), puis non
   unitaires (trois huitièmes, deux tiers, trois cinquièmes) ; 3/8 = 1/8 + 1/8 + 1/8 (« trois fois un
   huitième ») ; 5/5 = 1 ; une même fraction peut se dessiner de plusieurs façons ; les mots
   « numérateur » et « dénominateur ». La comparaison et les calculs viennent au chapitre N13.
   Pensé pour être projeté : l'unité qui se partage, puis les parts coloriées une à une.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const F = (a, b) => cm1Frac(a, b);
const bord = CPC.bord, rouge = '#E35D3A';
// Une fausse moitié : deux parts inégales.
const faux = cpSvg(252, 58, `<rect x="6" y="6" width="150" height="46" fill="${rouge}" fill-opacity=".8"/><rect x="156" y="6" width="90" height="46" fill="#fff"/><line x1="156" y1="6" x2="156" y2="52" stroke="${bord}" stroke-width="2"/><rect x="6" y="6" width="240" height="46" fill="none" stroke="${bord}" stroke-width="2.5"/>`, 200);
// La moitié d'une feuille carrée, pliée de trois façons : en long, en large, en diagonale.
const moitie = sens => cpSvg(140, 140, (sens === 'v' ? `<rect x="10" y="10" width="60" height="120" fill="${rouge}" fill-opacity=".8"/><line x1="70" y1="10" x2="70" y2="130" stroke="${bord}" stroke-width="2"/>`
  : sens === 'h' ? `<rect x="10" y="10" width="120" height="60" fill="${rouge}" fill-opacity=".8"/><line x1="10" y1="70" x2="130" y2="70" stroke="${bord}" stroke-width="2"/>`
  : `<path d="M10 10 L130 10 L10 130 Z" fill="${rouge}" fill-opacity=".8"/><line x1="130" y1="10" x2="10" y2="130" stroke="${bord}" stroke-width="2"/>`)
  + `<rect x="10" y="10" width="120" height="120" fill="none" stroke="${bord}" stroke-width="2.5"/>`, 80);
const UNIT = [2, 3, 4, 5, 6, 8, 10];

cm1Chapitre({
  niveau: 'ce1', titre: 'Les fractions : partager en parts égales', slug: 'fractions',
  cours: `
${cm1Lecon(1, 'Partager en parts égales')}
${ce1AnimFraction('ce1-n9-frac', { n: 2, k: 1, forme: 'bande' })}
${cm1Def(`${lig(ce1Frac('bande', 2, 1))}${P(`On partage l'unité en <b>2 parts égales</b>. Une part, c'est <b>la moitié</b>, ou <b>un demi</b> : ${F(1, 2)}.`)}`, 'Un demi')}
${cm1Regle(`Les parts doivent être <b>égales</b> !${lig(faux)}${P(`Ici, la partie coloriée n'est <b>pas</b> ${F(1, 2)} : les deux parts ne sont pas pareilles.`)}`, 'Attention')}
${cm1Def(`${lig(moitie('v'), moitie('h'), moitie('d'))}${P(`On peut plier une feuille en deux de plusieurs façons : chaque fois, la partie coloriée est ${F(1, 2)} de la feuille.`)}`, 'Une même fraction, plusieurs dessins')}

${cm1Lecon(2, 'Un tiers, un quart, un cinquième…')}
${cm1Def(`${lig(ce1Frac('disque', 3, 1, { px: 80 }), ce1Frac('disque', 4, 1, { px: 80 }), ce1Frac('disque', 8, 1, { px: 80 }))}${P(`En 3 parts égales, une part, c'est <b>un tiers</b> : ${F(1, 3)}. En 4 parts égales, c'est <b>un quart</b> : ${F(1, 4)}. En 8 parts égales, c'est <b>un huitième</b> : ${F(1, 8)}.`)}`, 'Une part de l\'unité')}
${cm1Tableau(['Parts égales', ...UNIT.map(String)], [['Une part', ...UNIT.map(n => F(1, n))], ['Se lit', ...UNIT.map(n => ce1FracMot(1, n))]])}
${cm1Astuce('Après le tiers et le quart, on dit le nombre de parts avec « -ième » : un cinquième, un sixième, un huitième, un dixième.')}
${cm1Rem('On verse une bouteille d\'eau dans 4 verres, avec la même quantité dans chaque verre : chaque verre contient un quart de la bouteille.')}

${cm1Lecon(3, 'Plusieurs parts : numérateur et dénominateur')}
${ce1AnimFraction('ce1-n9-frac-k', { n: 8, k: 3, forme: 'bande', legende: 'Les parts se colorient une à une : trois huitièmes, c\'est trois fois un huitième.' })}
${cm1Def(`${lig(ce1Frac('bande', 8, 3))}${P(`L'unité est partagée en 8 parts égales ; on en colorie 3. C'est <b>trois huitièmes</b> : ${F(3, 8)}.`)}`, 'Trois huitièmes')}
${cm1Regle(`Dans ${F(3, 8)} :${cm1Liste(['le nombre du bas, 8, est le <b>dénominateur</b> : il dit en combien de parts égales on partage l\'unité ;', 'le nombre du haut, 3, est le <b>numérateur</b> : il dit combien de parts on prend.'])}`, 'Numérateur et dénominateur')}
${cm1Regle(`Trois huitièmes, c'est trois fois un huitième :${cm1Liste([`${F(3, 8)} = ${ce1SommeUnit(3, 8)}`, `${F(2, 3)} = ${ce1SommeUnit(2, 3)}`, `${F(3, 5)} = ${ce1SommeUnit(3, 5)}`])}`, 'Ajouter des parts')}
${cm1Def(`${lig(ce1Frac('bande', 3, 2, { px: 150 }), ce1Frac('bande', 5, 3, { px: 150 }))}${P(`<b>deux tiers</b> : ${F(2, 3)} ; <b>trois cinquièmes</b> : ${F(3, 5)}.`)}`, 'D\'autres fractions')}

${cm1Lecon(4, 'L\'unité entière')}
${cm1Def(`${lig(ce1Frac('carre', 5, 5, { px: 80 }), ce1Frac('disque', 4, 4, { px: 80 }), ce1Frac('carre', 10, 10, { quadrants: true, px: 80 }))}${P('Quand on prend toutes les parts, on a l\'unité entière.')}`, 'Toutes les parts')}
${cm1Regle(`${cm1Liste([`${F(2, 2)} = 1`, `${F(5, 5)} = 1`, `${F(10, 10)} = 1`])}${P(`${F(5, 5)} = 1, car 5 parts sur 5, c'est toute l'unité.`)}`, 'Égal à 1')}
${cm1Regle('Au CE1, une fraction est une partie d\'un tout : son numérateur n\'est jamais plus grand que son dénominateur.', 'Jamais plus que le tout')}
`,
  methode: `
${cm1Demo('ce1-n9-m-nommer', 'Nommer une fraction', 'Quelle fraction du disque est coloriée ?')}
${cm1Demo('ce1-n9-m-colorier', 'Colorier les trois cinquièmes d\'une bande', 'Colorie ' + cm1Frac(3, 5) + ' de la bande.')}
`,
  demos: [
    ['ce1-n9-m-nommer', [
      { expr: 'Je vérifie que les parts sont égales.', note: 'Oui, elles sont toutes pareilles.', fig: ce1Frac('disque', 6, 5) },
      { expr: 'Je compte toutes les parts : 6.', note: 'Ce sont des sixièmes : le dénominateur est 6.' },
      { expr: 'Je compte les parts coloriées : 5.', note: `Le numérateur est 5 : cinq sixièmes, ${F(5, 6)}.` },
    ]],
    ['ce1-n9-m-colorier', [
      { expr: 'Le dénominateur est 5 : je partage la bande en 5 parts égales.', note: 'Je peux m\'aider des carreaux.', fig: ce1Frac('bande', 5, 0) },
      { expr: 'Le numérateur est 3 : je colorie 3 parts.', note: `${F(3, 5)} = ${ce1SommeUnit(3, 5)}.`, fig: ce1Frac('bande', 5, 3) },
      { expr: `${F(3, 5)} de la bande est colorié.`, note: `Il reste ${F(2, 5)} en blanc.` },
    ]],
  ],
  exos: cm1Exos('ce1-n9', [
    [`Quelle fraction de la bande est coloriée ?${lig(ce1Frac('bande', 4, 1))}`,
      cm1Redac('La bande', '', `4 parts égales, 1 coloriée : un quart, ${F(1, 4)}.`)],
    [`Quelle fraction du disque est coloriée ?${lig(ce1Frac('disque', 6, 1))}`,
      cm1Redac('Le disque', '', `6 parts égales, 1 coloriée : un sixième, ${F(1, 6)}.`)],
    [`Quelle fraction de la bande est coloriée ?${lig(ce1Frac('bande', 10, 3))}`,
      cm1Redac('La bande', '', `10 parts égales, 3 coloriées : trois dixièmes, ${F(3, 10)}.`)],
    [`La partie coloriée est-elle un demi de la bande ?${lig(faux)}`,
      cm1Redac('Un demi', '', 'Non : les deux parts ne sont pas égales. Ce n\'est pas un demi.')],
    [`Colorie ${F(3, 4)} d'un disque.`,
      cm1Redac('Trois quarts du disque', `${F(3, 4)} = ${ce1SommeUnit(3, 4)}`, 'Je partage le disque en 4 parts égales et j\'en colorie 3.', ce1Frac('disque', 4, 3, { px: 90 }))],
    [`Écris en chiffres : « deux cinquièmes ». Quel est le numérateur ? Quel est le dénominateur ?`,
      cm1Redac('Deux cinquièmes', `${F(2, 5)}`, 'Le numérateur est 2 et le dénominateur est 5 : l\'unité est partagée en 5 parts égales et on en prend 2.', ce1Frac('bande', 5, 2, { px: 150 }))],
    [`Complète : ${F(4, 8)} = ${F(1, 8)} + … + … + …`,
      cm1Redac('Quatre huitièmes', `${F(4, 8)} = ${ce1SommeUnit(4, 8)}`, 'Quatre huitièmes, c\'est quatre fois un huitième.')],
    ['Pourquoi peut-on écrire que cinq cinquièmes, c\'est égal à 1 ?',
      cm1Redac('Cinq cinquièmes', `${F(5, 5)} = 1`, 'L\'unité est partagée en 5 parts égales et on prend les 5 parts : c\'est l\'unité entière.', ce1Frac('bande', 5, 5, { px: 150 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : l\'œil d\'Horus', [
    'Il y a plus de 3 500 ans, les <b>Égyptiens</b> utilisaient des fractions pour partager le pain, la bière ou les terres. Ils écrivaient surtout des fractions avec un 1 en haut : un demi, un tiers, un quart…',
    'Une légende raconte que l\'<b>œil du dieu Horus</b> fut brisé en morceaux : chaque morceau servait à écrire une fraction (un demi, un quart, un huitième…) pour mesurer les grains de blé.',
    'Les mots <b>numérateur</b> et <b>dénominateur</b> viennent du latin : le dénominateur « donne le nom » des parts (des huitièmes), le numérateur les « compte » (trois).',
  ]),
  quiz: [
    { q: 'Une unité partagée en 4 parts égales : une part, c\'est…', opts: ['un quart', 'un tiers', 'un demi'], correct: 0 },
    { q: 'Une unité partagée en 8 parts égales : une part, c\'est…', opts: ['un huitième', 'un quart', 'huit'], correct: 0 },
    { q: '5/5 = …', opts: ['1', '5', '10'], correct: 0 },
    { q: 'Dans 3/8, le dénominateur est…', opts: ['8', '3', '11'], correct: 0 },
    { q: '1/6 + 1/6 + 1/6 = …', opts: ['3/6', '3/18', '1/18'], correct: 0 },
  ],
  flash: [
    { l: 1, q: `Quelle fraction ?${lig(ce1Frac('disque', 2, 1, { px: 70 }))}`, r: ['un demi', 'un tiers', 'un quart', 'deux'], ok: 0 },
    { l: 2, q: `Quelle fraction ?${lig(ce1Frac('disque', 4, 1, { px: 70 }))}`, r: ['un quart', 'un demi', 'un tiers', 'quatre'], ok: 0 },
    { l: 2, q: `Quelle fraction ?${lig(ce1Frac('bande', 5, 1, { px: 140 }))}`, r: ['un cinquième', 'un quart', 'cinq', 'un dixième'], ok: 0 },
    { l: 2, q: 'Un dixième s\'écrit…', r: ['1/10', '10/1', '1/2', '110'], ok: 0 },
    { l: 3, q: `Quelle fraction ?${lig(ce1Frac('bande', 8, 3, { px: 140 }))}`, r: ['trois huitièmes', 'trois cinquièmes', 'huit tiers', 'cinq huitièmes'], ok: 0 },
    { l: 3, q: 'Dans 2/5, le numérateur est…', r: ['2', '5', '7', '25'], ok: 0 },
    { l: 3, q: '1/3 + 1/3 = …', r: ['2/3', '2/6', '1/6', '1'], ok: 0 },
    { l: 4, q: '6/6 = …', r: ['1', '6', '12', '0'], ok: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Les fractions : un demi, un tiers, un quart (CE1, N9, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : partager une unité (bande,
   disque, carré) en parts égales ; nommer et écrire les fractions un demi, un tiers, un quart, puis
   deux tiers, trois quarts ; une part n'est un tiers que si les trois parts sont égales ; deux demis,
   trois tiers, quatre quarts font l'unité ; comparer un demi, un tiers, un quart.
   Pensé pour être projeté : l'unité qui se partage, puis la part coloriée.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const F = (a, b) => cm1Frac(a, b);
// Une fausse moitié : deux parts inégales.
const faux = cpSvg(252, 58, `<rect x="6" y="6" width="150" height="46" fill="#E35D3A" fill-opacity=".8"/><rect x="156" y="6" width="90" height="46" fill="#fff"/><line x1="156" y1="6" x2="156" y2="52" stroke="${CPC.bord}" stroke-width="2"/><rect x="6" y="6" width="240" height="46" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/>`, 200);

cm1Chapitre({
  niveau: 'ce1', titre: 'Les fractions : un demi, un tiers, un quart', slug: 'fractions',
  cours: `
${cm1Lecon(1, 'Partager en parts égales')}
${ce1AnimFraction('ce1-n9-frac', { n: 2, forme: 'bande' })}
${cm1Def(`${lig(ce1Frac('bande', 2, 1))}${P(`On partage l'unité en <b>2 parts égales</b>. Une part, c'est <b>un demi</b> : ${F(1, 2)}.`)}`, 'Un demi')}
${cm1Regle(`Les parts doivent être <b>égales</b> !${lig(faux)}${P(`Ici, la partie coloriée n'est <b>pas</b> ${F(1, 2)} : les deux parts ne sont pas pareilles.`)}`, 'Attention')}

${cm1Lecon(2, 'Un tiers, un quart')}
${cm1Def(`${lig(ce1Frac('disque', 3, 1), ce1Frac('disque', 4, 1))}${P(`3 parts égales : une part, c'est <b>un tiers</b>, ${F(1, 3)}. 4 parts égales : une part, c'est <b>un quart</b>, ${F(1, 4)}.`)}`, 'Tiers et quart')}
${cm1Regle(`Dans ${F(1, 4)} :${cm1Liste(['le nombre du <b>bas</b> dit en combien de parts égales on partage l\'unité ;', 'le nombre du <b>haut</b> dit combien de parts on prend.'])}`, 'Lire une fraction')}

${cm1Lecon(3, 'Plusieurs parts')}
${cm1Def(`${lig(ce1Frac('bande', 3, 2), ce1Frac('bande', 4, 3))}${P(`<b>deux tiers</b> : ${F(2, 3)} ; <b>trois quarts</b> : ${F(3, 4)}.`)}`, 'Deux tiers, trois quarts')}
${cm1Regle(`Quand on prend toutes les parts, on a l'unité entière :${cm1Liste([`${F(2, 2)} = 1`, `${F(3, 3)} = 1`, `${F(4, 4)} = 1`])}`, 'L\'unité')}

${cm1Lecon(4, 'Comparer')}
${cm1Def(`${lig(ce1Frac('bande', 2, 1, { px: 160 }))}${lig(ce1Frac('bande', 3, 1, { px: 160 }))}${lig(ce1Frac('bande', 4, 1, { px: 160 }))}${P(`Plus on partage en parts nombreuses, plus chaque part est <b>petite</b> : ${F(1, 4)} est plus petit que ${F(1, 3)}, qui est plus petit que ${F(1, 2)}.`)}`, 'Plus de parts, plus petites')}
${cm1Astuce('Un gâteau partagé entre 4 enfants donne des parts plus petites qu\'un gâteau partagé entre 2 !')}
`,
  methode: `
${cm1Demo('ce1-n9-m-nommer', 'Nommer une fraction', 'Quelle fraction du disque est coloriée ?')}
${cm1Demo('ce1-n9-m-colorier', 'Colorier les trois quarts d\'un carré', 'Colorie ' + cm1Frac(3, 4) + ' du carré.')}
`,
  demos: [
    ['ce1-n9-m-nommer', [
      { expr: 'Je vérifie que les parts sont égales.', note: 'Oui, elles sont toutes pareilles.', fig: ce1Frac('disque', 3, 2) },
      { expr: 'Je compte les parts : 3.', note: 'Ce sont des tiers.' },
      { expr: 'Je compte les parts coloriées : 2.', note: `Deux tiers : ${F(2, 3)}.` },
    ]],
    ['ce1-n9-m-colorier', [
      { expr: 'Je partage le carré en 4 parts égales.', note: 'Le nombre du bas : 4.', fig: ce1Frac('carre', 4, 0, { quadrants: true }) },
      { expr: 'Je colorie 3 parts.', note: 'Le nombre du haut : 3.', fig: ce1Frac('carre', 4, 3, { quadrants: true }) },
      { expr: `${F(3, 4)} du carré est colorié.`, note: 'Il reste un quart blanc.' },
    ]],
  ],
  exos: cm1Exos('ce1-n9', [
    [`Quelle fraction de la bande est coloriée ?${lig(ce1Frac('bande', 4, 1))}`,
      cm1Redac('La bande', '', `4 parts égales, 1 coloriée : un quart, ${F(1, 4)}.`)],
    [`Quelle fraction du disque est coloriée ?${lig(ce1Frac('disque', 2, 1))}`,
      cm1Redac('Le disque', '', `2 parts égales, 1 coloriée : un demi, ${F(1, 2)}.`)],
    [`Quelle fraction de la bande est coloriée ?${lig(ce1Frac('bande', 3, 2))}`,
      cm1Redac('La bande', '', `3 parts égales, 2 coloriées : deux tiers, ${F(2, 3)}.`)],
    [`La partie coloriée est-elle un demi de la bande ?${lig(faux)}`,
      cm1Redac('Un demi ?', '', 'Non : les deux parts ne sont pas égales. Ce n\'est pas un demi.')],
    [`Colorie ${F(3, 4)} d'un disque.`,
      cm1Redac('Trois quarts du disque', '', 'Je partage le disque en 4 parts égales et j\'en colorie 3.', ce1Frac('disque', 4, 3, { px: 90 }))],
    [`Quelle part est la plus grande : ${F(1, 2)} ou ${F(1, 4)} d'une même tarte ?`,
      cm1Redac('La plus grande part', '', `${F(1, 2)} est plus grand que ${F(1, 4)} : en partageant en 2, les parts sont plus grosses qu'en partageant en 4.`)],
    ['Combien de quarts faut-il pour faire une unité entière ?',
      cm1Redac('Les quarts', '', `Il faut 4 quarts : ${F(4, 4)} = 1.`, ce1Frac('carre', 4, 4, { quadrants: true, px: 80 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : l\'œil d\'Horus', [
    'Il y a plus de 3 500 ans, les <b>Égyptiens</b> utilisaient des fractions pour partager le pain, la bière ou les terres. Ils écrivaient surtout des fractions avec un 1 en haut : un demi, un tiers, un quart…',
    'Une légende raconte que l\'<b>œil du dieu Horus</b> fut brisé en morceaux : chaque morceau servait à écrire une fraction (un demi, un quart, un huitième…) pour mesurer les grains de blé.',
  ]),
  quiz: [
    { q: 'Une unité partagée en 4 parts égales : une part, c\'est…', opts: ['un quart', 'un tiers', 'un demi'], correct: 0 },
    { q: '3/3 = …', opts: ['1', '3', '6'], correct: 0 },
    { q: 'Le plus grand :', opts: ['1/2', '1/3', '1/4'], correct: 0 },
  ],
  flash: [
    { l: 1, q: `Quelle fraction ?${lig(ce1Frac('disque', 2, 1, { px: 70 }))}`, r: ['un demi', 'un tiers', 'un quart', 'deux'], ok: 0 },
    { l: 2, q: `Quelle fraction ?${lig(ce1Frac('disque', 4, 1, { px: 70 }))}`, r: ['un quart', 'un demi', 'un tiers', 'quatre'], ok: 0 },
    { l: 2, q: 'Un tiers s\'écrit…', r: ['1/3', '3/1', '1/2', '13'], ok: 0 },
    { l: 3, q: `Quelle fraction ?${lig(ce1Frac('bande', 4, 3, { px: 140 }))}`, r: ['trois quarts', 'un quart', 'trois tiers', 'deux quarts'], ok: 0 },
    { l: 3, q: '2/2 = …', r: ['1', '2', '4', '22'], ok: 0 },
    { l: 4, q: 'Le plus petit : 1/2 ou 1/4 ?', r: ['1/4', '1/2', 'Pareil', 'On ne sait pas'], ok: 0 },
  ],
});
})();

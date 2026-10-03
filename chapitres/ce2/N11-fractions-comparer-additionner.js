/* ============================================================
   CHAPITRE : Comparer et additionner des fractions (CE2, N11, période 5)
   Programme du cycle 2 (CE2) : comparer des fractions inférieures à 1 de même dénominateur
   (5/12 et 7/12), de même numérateur (5/12 et 5/8), ou dont un dénominateur est multiple de l'autre
   (7/12 et 5/6) ; additionner et soustraire des fractions de même dénominateur, ou quand un
   dénominateur est multiple de l'autre, avec des représentations ; problème du gâteau de Marc.
   ============================================================ */
(() => {
const F = cm1Frac;
const ligne = (n, k, c, lab) => `<div style="display:flex;align-items:center;gap:12px;justify-content:center;margin:4px 0;"><span style="min-width:44px;text-align:right;">${lab}</span>${cm1Bande(n, k, { coul: c, largeur: 288 })}</div>`;
cm1Chapitre({
  niveau: 'ce2', titre: 'Comparer et additionner des fractions', slug: 'fractions-comparer-additionner',
  cours: `
${cm1Lecon(1, 'Comparer des fractions')}
${cm1Sous('A', 'Même dénominateur')}
${cm1Regle(`Les parts ont la même taille : celle qui a <b>le plus de parts</b> est la plus grande. ${F(7, 12)} &gt; ${F(5, 12)} car 7 douzièmes, c'est plus que 5 douzièmes.`)}
<div class="figure-wrap">${ligne(12, 5, '#2EA8C9', F(5, 12))}${ligne(12, 7, '#E35D3A', F(7, 12))}</div>
${cm1Sous('B', 'Même numérateur')}
${cm1Regle(`On prend le même nombre de parts : la fraction qui a les <b>plus grandes parts</b> est la plus grande. ${F(5, 8)} &gt; ${F(5, 12)} car un huitième est plus grand qu'un douzième (on partage en moins de parts).`)}
<div class="figure-wrap">${ligne(8, 5, '#2E9C6A', F(5, 8))}${ligne(12, 5, '#2EA8C9', F(5, 12))}</div>
${cm1Sous('C', 'Un dénominateur multiple de l\'autre')}
${cm1Regle(`Pour comparer ${F(7, 12)} et ${F(5, 6)}, on écrit ${F(5, 6)} en douzièmes : des parts 2 fois plus petites, 2 fois plus de parts. ${F(5, 6)} = ${F(10, 12)}, et ${F(10, 12)} &gt; ${F(7, 12)}.`)}
<div class="figure-wrap">${ligne(6, 5, '#7A4FC0', F(5, 6))}${ligne(12, 10, '#7A4FC0', F(10, 12))}${ligne(12, 7, '#E35D3A', F(7, 12))}</div>
${ce2AnimFracEgales('ce2-fc-egales', { legende: 'Pour comparer avec des douzièmes, on recoupe chaque sixième en deux.', presets: [{ nom: 'Cinq sixièmes', n: 6, k: 5, f: 2 }, { nom: 'Deux tiers', n: 3, k: 2, f: 4 }] })}

${cm1Lecon(2, 'Additionner et soustraire des fractions')}
${cm1Regle(`Quand les fractions ont <b>le même dénominateur</b>, on additionne (ou on soustrait) <b>les numérateurs</b> ; le dénominateur ne change pas. « 2 cinquièmes plus 1 cinquième, ça fait 3 cinquièmes » : ${F(2, 5)} + ${F(1, 5)} = ${F(3, 5)}.`)}
${ce2AnimFracAdd('ce2-fc-add', { presets: [{ nom: 'Deux cinquièmes et un cinquième', n: 5, x: 2, y: 1 }, { nom: 'Trois huitièmes et quatre huitièmes', n: 8, x: 3, y: 4 }, { nom: 'Un dixième et trois dixièmes', n: 10, x: 1, y: 3 }] })}
${cm1Astuce(`On n'additionne <b>jamais</b> les dénominateurs : ${F(2, 5)} + ${F(1, 5)}, ce n'est pas ${F(3, 10)} ! Des cinquièmes plus des cinquièmes, ça fait des cinquièmes.`)}
${cm1Regle(`Si un dénominateur est multiple de l'autre, on change d'abord une fraction : ${F(1, 2)} + ${F(1, 4)} = ${F(2, 4)} + ${F(1, 4)} = ${F(3, 4)}.`)}
${cm1Exemple('Soustraire :', [`${F(7, 8)} − ${F(3, 8)} = ${F(4, 8)}`])}
${cm1Redac(`1 − ${F(3, 10)}`, [`${F(10, 10)} − ${F(3, 10)}`, F(7, 10)], '')}
`,
  methode: `
${cm1Demo('ce2-fc-gateau', 'Résoudre un problème avec des fractions', 'Marc a fait un gâteau. Il en a mangé un dixième, Ange en a mangé trois dixièmes et Saïd deux dixièmes. Quelle fraction du gâteau reste-t-il ?')}
`,
  demos: [
    ['ce2-fc-gateau', [
      { expr: `${F(1, 10)} + ${F(3, 10)} + ${F(2, 10)} = ${F(6, 10)}`, note: 'Ce qui a été mangé : 1 + 3 + 2 = 6 dixièmes.' },
      { expr: cm1Bande(10, 6, { largeur: 300 }), note: '6 parts sur 10 sont mangées.' },
      { expr: `${F(10, 10)} − ${F(6, 10)} = ${F(4, 10)}`, note: 'Le gâteau entier, c\'est 10 dixièmes.' },
      { expr: `Il reste ${F(4, 10)} du gâteau.`, note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-fc', [
    [`Compare ${F(3, 9)} et ${F(7, 9)}, puis ${F(4, 5)} et ${F(4, 10)}.`,
      cm1Redac(`Comparaison de ${F(3, 9)} et ${F(7, 9)}`, `${F(3, 9)} &lt; ${F(7, 9)}`, 'Ce sont des neuvièmes : 3 parts, c\'est moins que 7 parts.')
      + cm1Redac(`Comparaison de ${F(4, 5)} et ${F(4, 10)}`, `${F(4, 5)} &gt; ${F(4, 10)}`, 'On prend 4 parts dans les deux cas, mais un cinquième est plus grand qu\'un dixième.')],
    [`Compare ${F(1, 2)} et ${F(3, 8)}.`,
      cm1Redac('Un demi en huitièmes', `${F(1, 2)} = ${F(4, 8)}`, `${F(4, 8)} &gt; ${F(3, 8)}, donc ${F(1, 2)} est plus grand que ${F(3, 8)}.`)],
    [`Calcule.${cm1Liste([`${F(2, 7)} + ${F(4, 7)}`, `${F(5, 6)} − ${F(2, 6)}`])}`,
      cm1Redac('Addition', `${F(2, 7)} + ${F(4, 7)} = ${F(6, 7)}`, '2 septièmes plus 4 septièmes font 6 septièmes.')
      + cm1Redac('Soustraction', `${F(5, 6)} − ${F(2, 6)} = ${F(3, 6)}`, '5 sixièmes moins 2 sixièmes font 3 sixièmes.')],
    [`Calcule ${F(1, 3)} + ${F(2, 6)}.`,
      cm1Redac(`Somme de ${F(1, 3)} et de ${F(2, 6)}`, [`${F(2, 6)} + ${F(2, 6)}`, F(4, 6)], `${F(1, 3)} = ${F(2, 6)} : la somme est ${F(4, 6)}.`)],
    [`Léa a lu ${F(3, 8)} de son livre lundi et ${F(2, 8)} mardi. Quelle fraction du livre a-t-elle lue ? Quelle fraction lui reste-t-il à lire ?`,
      cm1Redac('Fraction lue', `${F(3, 8)} + ${F(2, 8)} = ${F(5, 8)}`, `Léa a lu ${F(5, 8)} de son livre.`)
      + cm1Redac('Fraction qui reste', `${F(8, 8)} − ${F(5, 8)} = ${F(3, 8)}`, `Il lui reste ${F(3, 8)} du livre à lire.`)],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la barre de fraction', [
    'La <b>barre</b> qui sépare le numérateur du dénominateur a été popularisée par le mathématicien italien <b>Fibonacci</b>, vers <b>1202</b>, dans un livre de calcul. Il l\'avait apprise des savants arabes, lors de ses voyages en Afrique du Nord.',
  ]),
  quiz: [
    { q: 'Quelle fraction est la plus grande ?', opts: [F(3, 8), F(5, 8), F(1, 8)], correct: 1 },
    { q: `${F(2, 6)} + ${F(3, 6)} = …`, opts: [F(5, 12), F(5, 6), F(6, 6)], correct: 1 },
    { q: `Entre ${F(5, 12)} et ${F(5, 8)}, la plus grande est…`, opts: [F(5, 12), F(5, 8), 'elles sont égales'], correct: 1 },
  ],
  flash: [
    { l: 2, q: '3/7 + 2/7 = …', r: ['5/14', '5/7', '6/7', '1/7'], ok: 1 },
    { l: 2, q: '9/10 − 4/10 = …', r: ['5/10', '5/0', '13/10', '4/10'], ok: 0 },
    { l: 1, q: 'Quelle fraction est la plus grande ?', r: ['2/9', '7/9', '5/9', '1/9'], ok: 1 },
    { l: 1, q: 'Quelle fraction est la plus grande ?', r: ['3/4', '3/8', '3/12', '3/10'], ok: 0 },
    { l: 2, q: '1/2 + 1/4 = …', r: ['2/6', '2/4', '3/4', '1/8'], ok: 2 },
    { l: 2, q: 'On a mangé 3/10 du gâteau. Que reste-t-il ?', r: ['3/10', '7/10', '10/10', '1/10'], ok: 1 },
    { l: 1, q: "Quelle fraction est la plus petite ?", r: ["1/3", "1/5", "1/2", "1/4"], ok: 1 },
    { l: 1, q: "5/8 … 3/8", r: ["<", ">", "="], ok: 1 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Fractions (comparaison et opérations) (CM1, N5, période 2)
   Suite du chapitre « Fractions ». Programme du cycle 3 (CM1) : fractions égales simples
   (1/2 = 2/4 = 5/10), comparer des fractions de même dénominateur, comparer une fraction à 1,
   additionner et soustraire des fractions de même dénominateur, lien entre dixièmes et centièmes
   (3/10 = 30/100). Dénominateurs ≤ 20, sauf fractions décimales (100).
   ============================================================ */
(() => {
const F = cm1Frac;
cm1Chapitre({
  titre: 'Fractions (comparaison et opérations)', slug: 'fractions-operations',
  cours: `
${cm1Lecon(1, 'Des fractions égales')}
${cm1Regle('Deux fractions sont <b>égales</b> si elles représentent la même part de l\'unité.')}
<div class="figure-wrap" style="text-align:left;">
<div style="display:flex;align-items:center;gap:12px;margin:4px 0;"><span style="min-width:44px;">${F(1, 2)}</span>${cm1Bande(2, 1)}</div>
<div style="display:flex;align-items:center;gap:12px;margin:4px 0;"><span style="min-width:44px;">${F(2, 4)}</span>${cm1Bande(4, 2)}</div>
<div style="display:flex;align-items:center;gap:12px;margin:4px 0;"><span style="min-width:44px;">${F(5, 10)}</span>${cm1Bande(10, 5)}</div></div>
${ce2AnimFracEgales('cm1-fo-egales', { presets: [{ nom: 'Un tiers', n: 3, k: 1, f: 2 }, { nom: 'Un demi', n: 2, k: 1, f: 5 }, { nom: 'Trois dixièmes', n: 10, k: 3, f: 10 }] })}
${cm1Exemple(`Les trois bandes sont coloriées pareil : ${F(1, 2)} = ${F(2, 4)} = ${F(5, 10)}.`, [`Quand on partage chaque part en 2, on a <b>2 fois plus de parts</b> et on en prend <b>2 fois plus</b> : ${F(1, 3)} = ${F(2, 6)}.`, `Avec les fractions décimales : ${F(3, 10)} = ${F(30, 100)}, car 1 dixième = 10 centièmes.`])}

${cm1Lecon(2, 'Comparer des fractions')}
${cm1Regle(`Quand deux fractions ont le <b>même dénominateur</b>, la plus grande est celle qui a le <b>plus grand numérateur</b> (on prend plus de parts de même taille).<br>${F(5, 8)} &gt; ${F(3, 8)} car 5 &gt; 3.`)}
${cm1Regle(`Pour comparer une fraction à <b>1</b>, on compare le numérateur et le dénominateur :<br>${cm1Liste([`${F(7, 9)} &lt; 1, car 7 &lt; 9 ;`, `${F(12, 9)} &gt; 1, car 12 &gt; 9.`])}On en déduit par exemple ${F(7, 9)} &lt; ${F(6, 5)}, car ${F(7, 9)} &lt; 1 &lt; ${F(6, 5)}.`, 'Règle')}
${cm1Astuce(`Avec le même <b>numérateur</b> : ${F(1, 3)} &gt; ${F(1, 5)}. Partager en 3 donne des parts plus grosses que partager en 5 ! Plus le dénominateur est grand, plus les parts sont petites.`)}

${cm1Lecon(3, 'Additionner et soustraire des fractions de même dénominateur')}
${cm1Regle(`Quand les fractions ont le <b>même dénominateur</b>, on additionne (ou on soustrait) les <b>numérateurs</b> et on <b>garde le dénominateur</b>.<br>
${F(2, 5)} + ${F(1, 5)} = ${F(3, 5)} &nbsp; (2 cinquièmes + 1 cinquième = 3 cinquièmes)<br>
${F(7, 6)} − ${F(4, 6)} = ${F(3, 6)}`)}
${ce2AnimFracAdd('cm1-fo-add', { presets: [{ nom: 'Deux cinquièmes et un cinquième', n: 5, x: 2, y: 1 }, { nom: 'Deux huitièmes et trois huitièmes', n: 8, x: 2, y: 3 }, { nom: 'Quatre septièmes et deux septièmes', n: 7, x: 4, y: 2 }] })}
${cm1Astuce(`On n'additionne <b>jamais</b> les dénominateurs : ${F(2, 5)} + ${F(1, 5)} ne fait pas ${F(3, 10)} ! Des cinquièmes plus des cinquièmes, cela donne des cinquièmes.`)}
${cm1Exemple('Avec l\'unité :', [`1 − ${F(1, 4)} = ${F(4, 4)} − ${F(1, 4)} = ${F(3, 4)}, car 1 = ${F(4, 4)}.`, `${F(5, 3)} + ${F(4, 3)} = ${F(9, 3)} = 3, car 9 tiers font 3 unités.`])}
`,
  methode: `
${cm1Demo('fo-comparer', 'Comparer deux fractions', `Compare ${F(5, 6)} et ${F(7, 6)}.`)}
${cm1Demo('fo-probleme', 'Résoudre un problème avec des fractions', `Lundi, Paul mange ${F(2, 8)} d'une tarte, mardi ${F(3, 8)}. Quelle fraction de la tarte a-t-il mangée ? Quelle fraction reste-t-il ?`)}
`,
  demos: [
    ['fo-comparer', [
      { expr: `${F(5, 6)}   et   ${F(7, 6)}`, note: 'Les deux fractions ont le même dénominateur : 6. Ce sont des sixièmes.' },
      { expr: '5 sixièmes   et   7 sixièmes', note: 'On compare les numérateurs : 5 &lt; 7.' },
      { expr: `${F(5, 6)} &lt; ${F(7, 6)}`, note: `On peut aussi le voir avec 1 : ${F(5, 6)} est inférieure à 1 et ${F(7, 6)} est supérieure à 1.` },
    ]],
    ['fo-probleme', [
      { expr: `${F(2, 8)} + ${F(3, 8)}`, note: 'On additionne ce qu\'il a mangé les deux jours. Les dénominateurs sont les mêmes (des huitièmes).' },
      { expr: `= ${F(5, 8)}`, note: `2 huitièmes + 3 huitièmes = 5 huitièmes. Il a mangé ${F(5, 8)} de la tarte.` },
      { expr: `${F(8, 8)} − ${F(5, 8)} = ${F(3, 8)}`, note: `La tarte entière, c'est ${F(8, 8)}. On enlève ce qui a été mangé.` },
      { expr: `Il reste ${F(3, 8)} de la tarte.`, note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('fo', [
    [`Complète ces égalités.${cm1Liste([`${F(1, 2)} = ${F('…', 6)}`, `${F(1, 4)} = ${F('…', 8)}`, `${F(4, 10)} = ${F('…', 100)}`])}`,
      cm1Redac('Fractions égales', { suite: [`${F(1, 2)} = ${F(3, 6)}`, `${F(1, 4)} = ${F(2, 8)}`, `${F(4, 10)} = ${F(40, 100)}`] }, 'Des parts plus petites, autant de fois plus de parts : la quantité ne change pas.')],
    [`Complète avec &lt;, &gt; ou =.${cm1Liste([`${F(3, 7)} … ${F(5, 7)}`, `${F(9, 4)} … ${F(6, 4)}`, `${F(8, 8)} … 1`])}`,
      cm1Redac('Comparaisons', { suite: [`${F(3, 7)} &lt; ${F(5, 7)}`, `${F(9, 4)} &gt; ${F(6, 4)}`, `${F(8, 8)} = 1`] }, 'Avec le même dénominateur, la plus grande fraction a le plus grand numérateur.')],
    [`Range dans l'ordre croissant : ${F(7, 10)} ; ${F(3, 10)} ; ${F(11, 10)} ; ${F(10, 10)}.`,
      cm1Redac('Ordre croissant', `${F(3, 10)} &lt; ${F(7, 10)} &lt; ${F(10, 10)} &lt; ${F(11, 10)}`, 'Ce sont des dixièmes : on range les numérateurs du plus petit au plus grand.')],
    [`Compare sans calcul, en utilisant 1 : ${F(4, 5)} et ${F(9, 7)}.`,
      cm1Redac('Comparaison avec 1', { suite: [`${F(4, 5)} &lt; 1`, `${F(9, 7)} &gt; 1`] }, `Donc ${F(4, 5)} &lt; ${F(9, 7)}.`)],
    [`Calcule.${cm1Liste([`${F(3, 9)} + ${F(4, 9)}`, `${F(11, 12)} − ${F(5, 12)}`, `${F(6, 10)} + ${F(7, 10)}`])}`,
      cm1Redac('Première somme', `${F(3, 9)} + ${F(4, 9)} = ${F(7, 9)}`, '3 neuvièmes plus 4 neuvièmes font 7 neuvièmes.')
      + cm1Redac('Différence', `${F(11, 12)} − ${F(5, 12)} = ${F(6, 12)}`, '11 douzièmes moins 5 douzièmes font 6 douzièmes.')
      + cm1Redac('Deuxième somme', [`${F(6, 10)} + ${F(7, 10)}`, F(13, 10)], `${F(13, 10)}, c'est 1 + ${F(3, 10)}.`)],
    [`Calcule.${cm1Liste([`1 − ${F(2, 5)}`, `2 − ${F(1, 3)}`])}`,
      cm1Redac(`1 − ${F(2, 5)}`, [`${F(5, 5)} − ${F(2, 5)}`, F(3, 5)], `1 − ${F(2, 5)} donne ${F(3, 5)}.`)
      + cm1Redac(`2 − ${F(1, 3)}`, { nom: 'B', lignes: [`${F(6, 3)} − ${F(1, 3)}`, F(5, 3)] }, `2 − ${F(1, 3)} donne ${F(5, 3)}.`)],
    [`Une bouteille est remplie aux ${F(3, 4)}. On verse ${F(1, 4)} de bouteille dans un verre. Quelle fraction de la bouteille reste-t-il ?`,
      cm1Redac('Fraction restante', [`${F(3, 4)} − ${F(1, 4)}`, F(2, 4)], `Il reste ${F(2, 4)} de la bouteille, c'est-à-dire la moitié.`)],
  ], { titre: 'Rédaction type : « Additionner des fractions de même dénominateur »', lignes: [[`${F(4, 7)} + ${F(2, 7)}`, 'Même dénominateur : ce sont des septièmes.'], [`= ${F(6, 7)}`, 'J\'additionne les numérateurs et je garde le dénominateur.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : partager le pain en Égypte', [
    'Le <b>papyrus Rhind</b>, écrit par le scribe <b>Ahmès</b> il y a environ 3 650 ans, contient des problèmes de partage : « Partager 9 pains entre 10 hommes »… Pour y répondre, les Égyptiens écrivaient les parts comme des sommes de fractions de numérateur 1 : un demi + un quart + …',
    'Pour additionner les fractions, ils utilisaient de grandes tables, déjà calculées, un peu comme nos tables de multiplication.',
    'Il a fallu attendre les savants indiens puis arabes pour écrire des fractions quelconques comme 3/4, avec un numérateur et un dénominateur, et calculer avec elles comme nous le faisons.',
  ]),
  quiz: [
    { q: '1/2 est égal à…', opts: ['2/1', '3/6', '1/4'], correct: 1 },
    { q: 'Quelle fraction est la plus grande ?', opts: ['4/9', '7/9', '5/9'], correct: 1 },
    { q: '2/7 + 3/7 = …', opts: ['5/14', '5/7', '6/7'], correct: 1 },
    { q: '1 − 1/3 = …', opts: ['2/3', '0', '1/2'], correct: 0 },
  ],
});
})();

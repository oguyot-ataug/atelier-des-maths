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
${cm1Exemple(`Les trois bandes sont coloriées pareil : ${F(1, 2)} = ${F(2, 4)} = ${F(5, 10)}.`, [`Quand on partage chaque part en 2, on a <b>2 fois plus de parts</b> et on en prend <b>2 fois plus</b> : ${F(1, 3)} = ${F(2, 6)}.`, `Avec les fractions décimales : ${F(3, 10)} = ${F(30, 100)}, car 1 dixième = 10 centièmes.`])}

${cm1Lecon(2, 'Comparer des fractions')}
${cm1Regle(`Quand deux fractions ont le <b>même dénominateur</b>, la plus grande est celle qui a le <b>plus grand numérateur</b> (on prend plus de parts de même taille).<br>${F(5, 8)} &gt; ${F(3, 8)} car 5 &gt; 3.`)}
${cm1Regle(`Pour comparer une fraction à <b>1</b>, on compare le numérateur et le dénominateur :<br>${F(7, 9)} &lt; 1 (7 &lt; 9) &nbsp;·&nbsp; ${F(12, 9)} &gt; 1 (12 &gt; 9).<br>On en déduit par exemple ${F(7, 9)} &lt; ${F(6, 5)}, car ${F(7, 9)} &lt; 1 &lt; ${F(6, 5)}.`, 'Règle')}
${cm1Astuce(`Avec le même <b>numérateur</b> : ${F(1, 3)} &gt; ${F(1, 5)}. Partager en 3 donne des parts plus grosses que partager en 5 ! Plus le dénominateur est grand, plus les parts sont petites.`)}

${cm1Lecon(3, 'Additionner et soustraire des fractions de même dénominateur')}
${cm1Regle(`Quand les fractions ont le <b>même dénominateur</b>, on additionne (ou on soustrait) les <b>numérateurs</b> et on <b>garde le dénominateur</b>.<br>
${F(2, 5)} + ${F(1, 5)} = ${F(3, 5)} &nbsp; (2 cinquièmes + 1 cinquième = 3 cinquièmes)<br>
${F(7, 6)} − ${F(4, 6)} = ${F(3, 6)}`)}
<div class="figure-wrap">${cm1Bande(5, 2, { coul: '#E35D3A' })} &nbsp;+&nbsp; ${cm1Bande(5, 1, { coul: '#2EA8C9' })} &nbsp;=&nbsp; ${cm1Bande(5, 3, { coul: '#7A4FC0' })}</div>
${cm1Astuce(`On n'additionne <b>jamais</b> les dénominateurs : ${F(2, 5)} + ${F(1, 5)} ne fait pas ${F(3, 10)} ! Des cinquièmes plus des cinquièmes, cela donne des cinquièmes.`)}
${cm1Exemple('Avec l\'unité :', [`1 = ${F(4, 4)}, donc 1 − ${F(1, 4)} = ${F(4, 4)} − ${F(1, 4)} = ${F(3, 4)}.`, `${F(5, 3)} + ${F(4, 3)} = ${F(9, 3)} = 3 (9 tiers = 3 unités).`])}
`,
  methode: `
${cm1Demo('fo-comparer', 'Comparer deux fractions', 'Compare 5/6 et 7/6.')}
${cm1Demo('fo-probleme', 'Résoudre un problème avec des fractions', 'Lundi, Paul mange 2/8 d\'une tarte, mardi 3/8. Quelle fraction de la tarte a-t-il mangée ? Quelle fraction reste-t-il ?')}
`,
  demos: [
    ['fo-comparer', [
      { expr: `${F(5, 6)}   et   ${F(7, 6)}`, note: 'Les deux fractions ont le même dénominateur : 6. Ce sont des sixièmes.' },
      { expr: '5 sixièmes   et   7 sixièmes', note: 'On compare les numérateurs : 5 &lt; 7.' },
      { expr: `${F(5, 6)} &lt; ${F(7, 6)}`, note: 'On peut aussi le voir avec 1 : 5/6 est inférieure à 1 et 7/6 est supérieure à 1.' },
    ]],
    ['fo-probleme', [
      { expr: `${F(2, 8)} + ${F(3, 8)}`, note: 'On additionne ce qu\'il a mangé les deux jours. Les dénominateurs sont les mêmes (des huitièmes).' },
      { expr: `= ${F(5, 8)}`, note: '2 huitièmes + 3 huitièmes = 5 huitièmes. Il a mangé 5/8 de la tarte.' },
      { expr: `${F(8, 8)} − ${F(5, 8)} = ${F(3, 8)}`, note: 'La tarte entière, c\'est 8/8. On enlève ce qui a été mangé.' },
      { expr: `Il reste ${F(3, 8)} de la tarte.`, note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('fo', [
    [`Complète : ${F(1, 2)} = ${F('…', 6)} &nbsp;·&nbsp; ${F(1, 4)} = ${F('…', 8)} &nbsp;·&nbsp; ${F(4, 10)} = ${F('…', 100)}`, `${F(3, 6)} · ${F(2, 8)} · ${F(40, 100)}`],
    [`Complète avec &lt;, &gt; ou = : ${F(3, 7)} … ${F(5, 7)} &nbsp;·&nbsp; ${F(9, 4)} … ${F(6, 4)} &nbsp;·&nbsp; ${F(8, 8)} … 1`, `${F(3, 7)} &lt; ${F(5, 7)} · ${F(9, 4)} &gt; ${F(6, 4)} · ${F(8, 8)} = 1`],
    [`Range dans l'ordre croissant : ${F(7, 10)} · ${F(3, 10)} · ${F(11, 10)} · ${F(10, 10)}`, `${F(3, 10)} &lt; ${F(7, 10)} &lt; ${F(10, 10)} &lt; ${F(11, 10)}`],
    [`Compare sans calcul, en utilisant 1 : ${F(4, 5)} et ${F(9, 7)}.`, `${F(4, 5)} &lt; 1 et ${F(9, 7)} &gt; 1, donc ${F(4, 5)} &lt; ${F(9, 7)}.`],
    [`Calcule : ${F(3, 9)} + ${F(4, 9)} &nbsp;·&nbsp; ${F(11, 12)} − ${F(5, 12)} &nbsp;·&nbsp; ${F(6, 10)} + ${F(7, 10)}`, `${F(7, 9)} · ${F(6, 12)} · ${F(13, 10)} (= 1 + ${F(3, 10)})`],
    [`Calcule : 1 − ${F(2, 5)} &nbsp;·&nbsp; 2 − ${F(1, 3)}`, `1 = ${F(5, 5)}, donc 1 − ${F(2, 5)} = ${F(3, 5)}. &nbsp; 2 = ${F(6, 3)}, donc 2 − ${F(1, 3)} = ${F(5, 3)}.`],
    [`Problème : une bouteille est remplie aux ${F(3, 4)}. On verse ${F(1, 4)} de bouteille dans un verre. Quelle fraction de la bouteille reste-t-il ?`, `${F(3, 4)} − ${F(1, 4)} = ${F(2, 4)}. Il reste ${F(2, 4)} de la bouteille, c'est-à-dire la moitié (${F(1, 2)}).`],
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

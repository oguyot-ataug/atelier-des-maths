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

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const R = v => plRep(String(v)), F = cm1Frac, C = plCase(), Fr = plFrac();
const lt = '&lt;', gt = '&gt;';
const bande = (n, k, c) => cm1Bande(n, k, { largeur: 150, coul: c });
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
PLANCHES['cm1|Fractions (comparaison et opérations)'] = [
  { titre: 'Fractions égales, comparer des fractions', duree: '35 min',
    attendus: ['Reconnaître et écrire des fractions égales', 'Comparer une fraction à 1', 'Comparer et ranger des fractions de même dénominateur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Les deux bandes ont la même partie coloriée. Complète l\'égalité.',
        eleve: plGrille([[2, 1, 4], [3, 1, 6], [5, 2, 10]].map(([n, k, m]) => ligne(`<span style="display:flex;flex-direction:column;gap:2px;">${bande(n, k)}${bande(m, k * m / n, '#2EA8C9')}</span>`, F(k, n), '=', Fr)), 1),
        corr: plGrille([[2, 1, 4], [3, 1, 6], [5, 2, 10]].map(([n, k, m]) => ligne(`<span style="display:flex;flex-direction:column;gap:2px;">${bande(n, k)}${bande(m, k * m / n, '#2EA8C9')}</span>`, F(k, n), '=', R(F(k * m / n, m)))), 1) },
      { etoiles: 1, col: 1, consigne: 'Complète les égalités.',
        eleve: plListe([`${F(1, 2)} = ${Fr} (dénominateur 10)`, `${F(3, 4)} = ${Fr} (dénominateur 8)`, `${F(2, 5)} = ${Fr} (dénominateur 10)`, `1 = ${Fr} (dénominateur 6)`]),
        corr: plListe([`${F(1, 2)} = ${R(F(5, 10))}`, `${F(3, 4)} = ${R(F(6, 8))}`, `${F(2, 5)} = ${R(F(4, 10))}`, `1 = ${R(F(6, 6))}`]) },
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`${F(3, 4)} ${C} 1`, `${F(7, 5)} ${C} 1`, `${F(6, 6)} ${C} 1`, `${F(9, 10)} ${C} 1`]),
        corr: plListe([`${F(3, 4)} ${R(lt)} 1`, `${F(7, 5)} ${R(gt)} 1`, `${F(6, 6)} ${R('=')} 1`, `${F(9, 10)} ${R(lt)} 1`]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`${F(3, 8)} ${C} ${F(5, 8)}`, `${F(7, 10)} ${C} ${F(4, 10)}`, `${F(1, 3)} ${C} ${F(1, 5)}`, `${F(5, 6)} ${C} ${F(7, 4)}`]),
        corr: plListe([`${F(3, 8)} ${R(lt)} ${F(5, 8)}`, `${F(7, 10)} ${R(gt)} ${F(4, 10)}`, `${F(1, 3)} ${R(gt)} ${F(1, 5)}`, `${F(5, 6)} ${R(lt)} ${F(7, 4)}`]) },
      { etoiles: 2, consigne: `Range ces fractions dans l\'ordre croissant : ${F(5, 4)} ; ${F(1, 4)} ; ${F(7, 4)} ; ${F(3, 4)} ; ${F(4, 4)}.`,
        eleve: `<p style="text-align:center;">${[Fr, Fr, Fr, Fr, Fr].join(' &lt; ')}</p>`,
        corr: `<p style="text-align:center;">${[[1, 4], [3, 4], [4, 4], [5, 4], [7, 4]].map(([a, b]) => R(F(a, b))).join(' &lt; ')}</p>` },
      { etoiles: 3, col: 1, cahier: true, consigne: `Tom a mangé ${F(3, 8)} d\'une pizza, Léa ${F(2, 4)} d\'une pizza de la même taille. Qui en a mangé le plus ?`,
        corr: cm1Redac('Comparaison', { suite: [`${F(2, 4)} = ${F(4, 8)}`, `${F(4, 8)} &gt; ${F(3, 8)}`] }, 'Léa a mangé le plus de pizza.', `<span class="cm-fig-d">${cm1Disque(8, 3, { taille: 60 })} ${cm1Disque(4, 2, { taille: 60, coul: '#E35D3A' })}</span>`) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Trouve trois fractions égales à ${F(1, 2)}. Dessine-les avec des bandes.`,
        corr: cm1Redac('Fractions égales à un demi', { suite: [`${F(1, 2)} = ${F(2, 4)}`, `${F(1, 2)} = ${F(3, 6)}`, `${F(1, 2)} = ${F(5, 10)}`] }, 'Le numérateur est la moitié du dénominateur : la bande est coloriée à moitié.', `<span class="cm-fig-d" style="display:inline-flex;flex-direction:column;gap:2px;">${cm1Bande(4, 2, { largeur: 110 })}${cm1Bande(6, 3, { largeur: 110 })}${cm1Bande(10, 5, { largeur: 110 })}</span>`) },
    ] },
  { titre: 'Additionner et soustraire des fractions', duree: '35 min',
    attendus: ['Additionner et soustraire des fractions de même dénominateur', 'Décomposer une fraction en un entier et une fraction plus petite que 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule. Aide-toi des bandes.',
        eleve: plGrille([[2, 1, 5], [3, 4, 8], [1, 2, 4]].map(([a, b, n]) => ligne(cm1Bande(n, a + b, { largeur: 110 }), `${F(a, n)} + ${F(b, n)} =`, Fr)), 1),
        corr: plGrille([[2, 1, 5], [3, 4, 8], [1, 2, 4]].map(([a, b, n]) => ligne(cm1Bande(n, a + b, { largeur: 110 }), `${F(a, n)} + ${F(b, n)} =`, R(F(a + b, n)))), 1) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe([`${F(5, 6)} − ${F(2, 6)} = ${Fr}`, `${F(7, 10)} − ${F(3, 10)} = ${Fr}`, `${F(4, 4)} − ${F(1, 4)} = ${Fr}`, `${F(9, 5)} − ${F(4, 5)} = ${Fr}`]),
        corr: plListe([`${F(5, 6)} − ${F(2, 6)} = ${R(F(3, 6))}`, `${F(7, 10)} − ${F(3, 10)} = ${R(F(4, 10))}`, `${F(4, 4)} − ${F(1, 4)} = ${R(F(3, 4))}`, `${F(9, 5)} − ${F(4, 5)} = ${R(F(5, 5))}`]) },
      { etoiles: 2, col: 1, consigne: 'Complète pour obtenir 1.',
        eleve: plListe([`${F(3, 8)} + ${Fr} = 1`, `${F(2, 5)} + ${Fr} = 1`, `${F(1, 3)} + ${Fr} = 1`, `${F(7, 10)} + ${Fr} = 1`]),
        corr: plListe([`${F(3, 8)} + ${R(F(5, 8))} = 1`, `${F(2, 5)} + ${R(F(3, 5))} = 1`, `${F(1, 3)} + ${R(F(2, 3))} = 1`, `${F(7, 10)} + ${R(F(3, 10))} = 1`]) },
      { etoiles: 2, col: 1, consigne: 'Écris chaque fraction comme un entier plus une fraction plus petite que 1.',
        eleve: plListe([`${F(7, 4)} = ${plPointilles(2)} + ${Fr}`, `${F(9, 5)} = ${plPointilles(2)} + ${Fr}`, `${F(11, 3)} = ${plPointilles(2)} + ${Fr}`, `${F(13, 10)} = ${plPointilles(2)} + ${Fr}`]),
        corr: plListe([`${F(7, 4)} = ${R(1)} + ${R(F(3, 4))}`, `${F(9, 5)} = ${R(1)} + ${R(F(4, 5))}`, `${F(11, 3)} = ${R(3)} + ${R(F(2, 3))}`, `${F(13, 10)} = ${R(1)} + ${R(F(3, 10))}`]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Une bouteille contient 1 L d\'eau. Le matin, on en boit ${F(2, 10)} ; le midi, ${F(5, 10)}. Quelle fraction de la bouteille a été bue ? Quelle fraction reste-t-il ?`,
        corr: cm1Redac('Eau bue', `${F(2, 10)} + ${F(5, 10)} = ${F(7, 10)}`, `On a bu ${F(7, 10)} de la bouteille.`, cm1Bande(10, 7, { largeur: 140 })) + cm1Redac('Eau restante', `${F(10, 10)} − ${F(7, 10)} = ${F(3, 10)}`, `Il reste ${F(3, 10)} de la bouteille.`) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un chemin mesure 1 km, c\'est-à-dire 1 000 m. Zoé a parcouru ${F(3, 4)} du chemin. Quelle fraction du chemin lui reste-t-il ? Combien de mètres ?`,
        corr: cm1Redac('Fraction restante', `${F(4, 4)} − ${F(3, 4)} = ${F(1, 4)}`, `Il reste ${F(1, 4)} du chemin.`) + cm1Redac('Distance restante', '1 000 m ÷ 4 = 250 m', 'Il reste 250 m à parcourir.', cm1Bande(4, 3, { largeur: 140 })) },
    ] },
];
})();

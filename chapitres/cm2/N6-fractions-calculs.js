/* ============================================================
   CHAPITRE : Fractions : comparer et calculer (CM2, N6, période 2)
   Programme du cycle 3 (CM2) : comparer des fractions ; additionner et soustraire des fractions
   (même dénominateur, ou un dénominateur multiple de l'autre -- les notions de multiple et de
   diviseur servent ici) ; produit d'un entier et d'une fraction ; fraction d'une quantité ou
   d'une grandeur ; relations entre fractions usuelles et leur écriture décimale.
   ============================================================ */
(() => {
const F = cm1Frac;
cm1Chapitre({
  niveau: 'cm2', titre: 'Fractions : comparer et calculer', slug: 'fractions-calculs',
  cours: `
${cm1Lecon(1, 'Fractions égales')}
${cm1Regle(`On obtient une fraction égale en <b>multipliant</b> (ou en divisant) le numérateur et le dénominateur <b>par le même nombre</b> :${cm1Liste([`${F(2, 3)} = ${F('2 × 4', '3 × 4')} = ${F(8, 12)}`, `${F(15, 20)} = ${F('15 ÷ 5', '20 ÷ 5')} = ${F(3, 4)}`])}`)}
${ce2AnimFracEgales('c2-fc-egales', { presets: [{ nom: 'Deux tiers', n: 3, k: 2, f: 4 }, { nom: 'Trois quarts', n: 4, k: 3, f: 3 }] })}
<div class="figure-wrap" style="text-align:left;"><div style="display:flex;align-items:center;gap:12px;margin:3px 0;"><span style="min-width:40px;">${F(2, 3)}</span>${cm1Bande(3, 2)}</div><div style="display:flex;align-items:center;gap:12px;margin:3px 0;"><span style="min-width:40px;">${F(8, 12)}</span>${cm1Bande(12, 8)}</div></div>

${cm1Lecon(2, 'Comparer des fractions')}
${cm1Regle(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li><b>Même dénominateur</b> : la plus grande a le plus grand numérateur. ${F(7, 12)} &gt; ${F(5, 12)}.</li>
<li><b>Même numérateur</b> : la plus grande a le plus petit dénominateur (parts plus grosses). ${F(3, 5)} &gt; ${F(3, 8)}.</li>
<li><b>Un dénominateur multiple de l'autre</b> : on écrit les deux fractions avec le même dénominateur. ${F(2, 3)} et ${F(5, 6)} : ${F(2, 3)} = ${F(4, 6)} &lt; ${F(5, 6)}.</li>
<li><b>Par rapport à 1</b> : ${F(9, 10)} &lt; 1 &lt; ${F(11, 10)}.</li></ul>`)}

${cm1Lecon(3, 'Additionner et soustraire des fractions')}
${cm1Regle(`Avec le <b>même dénominateur</b>, on additionne (ou on soustrait) les numérateurs et on garde le dénominateur : ${F(5, 9)} + ${F(7, 9)} = ${F(12, 9)}.<br>
Sinon, on commence par écrire les fractions avec le <b>même dénominateur</b> : ${F(1, 4)} + ${F(3, 8)} = ${F(2, 8)} + ${F(3, 8)} = ${F(5, 8)}.`)}
${ce2AnimFracAdd('c2-fc-add-anim', { presets: [{ nom: 'Deux huitièmes et trois huitièmes', n: 8, x: 2, y: 3 }, { nom: 'Cinq neuvièmes et deux neuvièmes', n: 9, x: 5, y: 2 }] })}
${cm1Exemple('Avec un entier :', [`2 − ${F(3, 5)} = ${F(10, 5)} − ${F(3, 5)} = ${F(7, 5)}`, `${F(5, 6)} − ${F(1, 3)} = ${F(5, 6)} − ${F(2, 6)} = ${F(3, 6)}`])}

${cm1Lecon(4, 'Multiplier une fraction par un entier')}
${cm1Regle(`Multiplier une fraction par un entier, c'est l'ajouter plusieurs fois : 4 × ${F(2, 7)} = ${F(2, 7)} + ${F(2, 7)} + ${F(2, 7)} + ${F(2, 7)} = ${F(8, 7)}.<br>On multiplie le <b>numérateur</b> par l'entier et on garde le dénominateur.`)}

${cm1Lecon(5, 'Fraction d\'une quantité')}
${cm1Regle(`Pour prendre les ${F(3, 4)} de 100 m, on cherche d'abord ${F(1, 4)} de 100 m.`)}
${cm1Redac(`${F(1, 4)} de 100 m`, '100 ÷ 4 = 25', `${F(1, 4)} de 100 m, c'est 25 m.`)}
${cm1Redac(`${F(3, 4)} de 100 m`, '3 × 25 = 75', `${F(3, 4)} de 100 m, c'est 75 m.`)}

${cm1Lecon(6, 'Fractions usuelles et nombres décimaux')}
${cm1Tableau(['Fraction', F(1, 2), F(1, 4), F(3, 4), F(1, 5), F(1, 10), F(3, 2)], [['Écriture décimale', '0,5', '0,25', '0,75', '0,2', '0,1', '1,5']])}
${cm1Rem(`À retenir aussi :${cm1Liste([`${F(1, 2)} = ${F(2, 4)} = ${F(5, 10)} = ${F(50, 100)}`, `${F(1, 4)} = ${F(25, 100)}`, 'un quart d\'heure = 15 min', 'une demi-heure = 30 min', 'trois quarts d\'heure = 45 min'])}`)}
`,
  methode: `
${cm1Demo('c2-fc-add', 'Additionner des fractions de dénominateurs différents', `Calcule ${F(2, 3)} + ${F(5, 12)}.`)}
${cm1Demo('c2-fc-comp', 'Comparer deux fractions', `Range dans l'ordre croissant : ${F(3, 4)} ; ${F(5, 8)} ; ${F(7, 8)}.`)}
`,
  demos: [
    ['c2-fc-add', [
      { expr: `${F(2, 3)} + ${F(5, 12)}`, note: 'Les dénominateurs sont différents. 12 est un multiple de 3 (3 × 4 = 12).' },
      { expr: `${F(2, 3)} = ${F('2 × 4', '3 × 4')} = ${F(8, 12)}`, note: 'On écrit 2/3 avec le dénominateur 12.' },
      { expr: `${F(8, 12)} + ${F(5, 12)} = ${F(13, 12)}`, note: 'Même dénominateur : on additionne les numérateurs.' },
      { expr: `${F(13, 12)} = 1 + ${F(1, 12)}`, note: 'Le résultat est un peu plus grand que 1.' },
    ]],
    ['c2-fc-comp', [
      { expr: `${F(3, 4)} = ${F(6, 8)}`, note: '8 est un multiple de 4 : on écrit 3/4 en huitièmes.' },
      { expr: `${F(5, 8)} · ${F(6, 8)} · ${F(7, 8)}`, note: 'Toutes les fractions sont en huitièmes : on compare les numérateurs.' },
      { expr: `${F(5, 8)} &lt; ${F(3, 4)} &lt; ${F(7, 8)}`, note: 'Ordre croissant.' },
    ]],
  ],
  exos: cm1Exos('c2fc', [
    [`Complète.${cm1Liste([`${F(3, 5)} = ${F('…', 20)}`, `${F(1, 6)} = ${F('…', 36)}`, `${F(12, 16)} = ${F(3, '…')}`])}`,
      cm1Redac('Fractions égales', { suite: [`${F(3, 5)} = ${F('3 × 4', '5 × 4')} = ${F(12, 20)}`, `${F(1, 6)} = ${F('1 × 6', '6 × 6')} = ${F(6, 36)}`, `${F(12, 16)} = ${F('12 ÷ 4', '16 ÷ 4')} = ${F(3, 4)}`] }, 'On multiplie (ou on divise) le numérateur et le dénominateur par le même nombre.')],
    [`Compare avec &lt;, &gt; ou =.${cm1Liste([`${F(5, 7)} … ${F(4, 7)}`, `${F(2, 9)} … ${F(2, 5)}`, `${F(3, 4)} … ${F(9, 12)}`, `${F(5, 6)} … ${F(7, 12)}`])}`,
      cm1Redac('Comparaisons', { suite: [`${F(5, 7)} &gt; ${F(4, 7)}`, `${F(2, 9)} &lt; ${F(2, 5)}`, `${F(3, 4)} = ${F(9, 12)}`, `${F(5, 6)} = ${F(10, 12)} &gt; ${F(7, 12)}`] }, 'Même dénominateur : on compare les numérateurs ; même numérateur : la plus grande a le plus petit dénominateur.')],
    [`Calcule.${cm1Liste([`${F(3, 10)} + ${F(9, 10)}`, `${F(11, 15)} − ${F(4, 15)}`, `${F(1, 2)} + ${F(3, 8)}`])}`,
      cm1Redac('Première somme', `${F(3, 10)} + ${F(9, 10)} = ${F(12, 10)}`, `Le résultat est ${F(12, 10)}.`)
      + cm1Redac('Différence', `${F(11, 15)} − ${F(4, 15)} = ${F(7, 15)}`, `Le résultat est ${F(7, 15)}.`)
      + cm1Redac('Deuxième somme', [`${F(4, 8)} + ${F(3, 8)}`, F(7, 8)], `Le résultat est ${F(7, 8)}.`)],
    [`Calcule.${cm1Liste([`1 − ${F(5, 12)}`, `3 − ${F(1, 4)}`, `${F(7, 10)} − ${F(1, 5)}`])}`,
      cm1Redac(`1 − ${F(5, 12)}`, [`${F(12, 12)} − ${F(5, 12)}`, F(7, 12)], `Le résultat est ${F(7, 12)}.`)
      + cm1Redac(`3 − ${F(1, 4)}`, { nom: 'B', lignes: [`${F(12, 4)} − ${F(1, 4)}`, F(11, 4)] }, `Le résultat est ${F(11, 4)}.`)
      + cm1Redac(`${F(7, 10)} − ${F(1, 5)}`, { nom: 'C', lignes: [`${F(7, 10)} − ${F(2, 10)}`, F(5, 10)] }, `Le résultat est ${F(5, 10)}, c'est-à-dire un demi.`)],
    [`Calcule.${cm1Liste([`3 × ${F(2, 9)}`, `5 × ${F(3, 4)}`, `6 × ${F(1, 6)}`])}`,
      cm1Redac('Produits', { suite: [`3 × ${F(2, 9)} = ${F(6, 9)}`, `5 × ${F(3, 4)} = ${F(15, 4)}`, `6 × ${F(1, 6)} = ${F(6, 6)} = 1`] }, 'On multiplie le numérateur par l\'entier et on garde le dénominateur.')],
    [`Calcule.${cm1Liste([`les ${F(2, 3)} de 12 €`, `les ${F(3, 5)} de 1 km, en mètres`, `les ${F(7, 10)} de 60 min`])}`,
      cm1Redac(`${F(2, 3)} de 12 €`, { suite: ['12 ÷ 3 = 4', '2 × 4 = 8'] }, `Les ${F(2, 3)} de 12 €, c'est 8 €.`)
      + cm1Redac(`${F(3, 5)} de 1 000 m`, { suite: ['1 000 ÷ 5 = 200', '3 × 200 = 600'] }, `Les ${F(3, 5)} de 1 km, c'est 600 m.`)
      + cm1Redac(`${F(7, 10)} de 60 min`, { suite: ['60 ÷ 10 = 6', '7 × 6 = 42'] }, `Les ${F(7, 10)} de 60 min, c'est 42 min.`)],
    [`Écris ces fractions avec une virgule.${cm1Liste([F(1, 4), F(3, 4), F(1, 2), F(1, 5), F(5, 2)])}`,
      cm1Redac('Écritures décimales', { suite: [`${F(1, 4)} = 0,25`, `${F(3, 4)} = 0,75`, `${F(1, 2)} = 0,5`, `${F(1, 5)} = 0,2`, `${F(5, 2)} = 2,5`] }, 'Ce sont des fractions usuelles à connaître par cœur.')],
    [`Tom a mangé ${F(1, 4)} d'une pizza et Zoé ${F(3, 8)}. Quelle fraction de la pizza reste-t-il ?`,
      cm1Redac('Fraction mangée', [`${F(2, 8)} + ${F(3, 8)}`, F(5, 8)], `Tom et Zoé ont mangé ${F(5, 8)} de la pizza.`)
      + cm1Redac('Fraction restante', { nom: 'B', lignes: [`${F(8, 8)} − ${F(5, 8)}`, F(3, 8)] }, `Il reste ${F(3, 8)} de la pizza.`)],
  ], { titre: 'Rédaction type : « Additionner des fractions »', lignes: [[`${F(1, 3)} + ${F(4, 9)}`, '9 est un multiple de 3.'], [`= ${F(3, 9)} + ${F(4, 9)}`, `J'écris ${F(1, 3)} en neuvièmes.`], [`= ${F(7, 9)}`, 'J\'additionne les numérateurs.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Fibonacci et les fractions', [
    'Dans son <i>Liber abaci</i> (1202), l\'Italien <b>Fibonacci</b> explique aux marchands européens comment calculer avec les chiffres indiens… et avec les fractions. C\'est lui qui popularise la <b>barre de fraction</b> en Europe.',
    'Il montre aussi comment additionner des fractions en cherchant un dénominateur commun, exactement comme dans ce chapitre.',
  ]),
  quiz: [
    { q: '1/3 + 1/6 = …', opts: ['2/9', '3/6', '2/6'], correct: 1 },
    { q: 'Quelle fraction est la plus grande ?', opts: ['3/5', '3/7', '3/10'], correct: 0 },
    { q: '3 × 2/5 = …', opts: ['6/15', '6/5', '5/5'], correct: 1 },
    { q: '3/4 s\'écrit…', opts: ['0,34', '0,75', '3,4'], correct: 1 },
  ],
});
})();

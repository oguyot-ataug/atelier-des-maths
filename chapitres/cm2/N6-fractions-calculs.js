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
${cm1Regle(`On obtient une fraction égale en <b>multipliant</b> (ou en divisant) le numérateur et le dénominateur <b>par le même nombre</b> :<br>${F(2, 3)} = ${F('2 × 4', '3 × 4')} = ${F(8, 12)} · ${F(15, 20)} = ${F('15 ÷ 5', '20 ÷ 5')} = ${F(3, 4)}`)}
<div class="figure-wrap" style="text-align:left;"><div style="display:flex;align-items:center;gap:12px;margin:3px 0;"><span style="min-width:40px;">${F(2, 3)}</span>${cm1Bande(3, 2)}</div><div style="display:flex;align-items:center;gap:12px;margin:3px 0;"><span style="min-width:40px;">${F(8, 12)}</span>${cm1Bande(12, 8)}</div></div>

${cm1Lecon(2, 'Comparer des fractions')}
${cm1Regle(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li><b>Même dénominateur</b> : la plus grande a le plus grand numérateur. ${F(7, 12)} &gt; ${F(5, 12)}.</li>
<li><b>Même numérateur</b> : la plus grande a le plus petit dénominateur (parts plus grosses). ${F(3, 5)} &gt; ${F(3, 8)}.</li>
<li><b>Un dénominateur multiple de l'autre</b> : on écrit les deux fractions avec le même dénominateur. ${F(2, 3)} et ${F(5, 6)} : ${F(2, 3)} = ${F(4, 6)} &lt; ${F(5, 6)}.</li>
<li><b>Par rapport à 1</b> : ${F(9, 10)} &lt; 1 &lt; ${F(11, 10)}.</li></ul>`)}

${cm1Lecon(3, 'Additionner et soustraire des fractions')}
${cm1Regle(`Avec le <b>même dénominateur</b>, on additionne (ou on soustrait) les numérateurs et on garde le dénominateur : ${F(5, 9)} + ${F(7, 9)} = ${F(12, 9)}.<br>
Sinon, on commence par écrire les fractions avec le <b>même dénominateur</b> : ${F(1, 4)} + ${F(3, 8)} = ${F(2, 8)} + ${F(3, 8)} = ${F(5, 8)}.`)}
${cm1Exemple('Avec un entier :', [`2 − ${F(3, 5)} = ${F(10, 5)} − ${F(3, 5)} = ${F(7, 5)}`, `${F(5, 6)} − ${F(1, 3)} = ${F(5, 6)} − ${F(2, 6)} = ${F(3, 6)}`])}

${cm1Lecon(4, 'Multiplier une fraction par un entier')}
${cm1Regle(`Multiplier une fraction par un entier, c'est l'ajouter plusieurs fois : 4 × ${F(2, 7)} = ${F(2, 7)} + ${F(2, 7)} + ${F(2, 7)} + ${F(2, 7)} = ${F(8, 7)}.<br>On multiplie le <b>numérateur</b> par l'entier et on garde le dénominateur.`)}

${cm1Lecon(5, 'Fraction d\'une quantité')}
${cm1Regle(`Pour prendre les ${F(3, 4)} de 100 m : ${F(1, 4)} de 100 m = 100 ÷ 4 = 25 m, donc ${F(3, 4)} de 100 m = 3 × 25 = <b>75 m</b>.`)}

${cm1Lecon(6, 'Fractions usuelles et nombres décimaux')}
${cm1Tableau(['Fraction', F(1, 2), F(1, 4), F(3, 4), F(1, 5), F(1, 10), F(3, 2)], [['Écriture décimale', '0,5', '0,25', '0,75', '0,2', '0,1', '1,5']])}
${cm1Rem(`À retenir aussi : ${F(1, 2)} = ${F(2, 4)} = ${F(5, 10)} = ${F(50, 100)} ; ${F(1, 4)} = ${F(25, 100)} ; un quart d'heure = 15 min, une demi-heure = 30 min, trois quarts d'heure = 45 min.`)}
`,
  methode: `
${cm1Demo('c2-fc-add', 'Additionner des fractions de dénominateurs différents', 'Calcule 2/3 + 5/12.')}
${cm1Demo('c2-fc-comp', 'Comparer deux fractions', 'Range dans l\'ordre croissant : 3/4, 5/8, 7/8.')}
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
    [`Complète : ${F(3, 5)} = ${F('…', 20)} · ${F(1, 6)} = ${F('…', 36)} · ${F(12, 16)} = ${F(3, '…')}`, `${F(12, 20)} · ${F(6, 36)} · ${F(3, 4)}`],
    [`Compare avec &lt;, &gt; ou = : ${F(5, 7)} … ${F(4, 7)} · ${F(2, 9)} … ${F(2, 5)} · ${F(3, 4)} … ${F(9, 12)} · ${F(5, 6)} … ${F(7, 12)}`, `&gt; · &lt; · = · &gt; (${F(5, 6)} = ${F(10, 12)})`],
    [`Calcule : ${F(3, 10)} + ${F(9, 10)} · ${F(11, 15)} − ${F(4, 15)} · ${F(1, 2)} + ${F(3, 8)}`, `${F(12, 10)} · ${F(7, 15)} · ${F(7, 8)}`],
    [`Calcule : 1 − ${F(5, 12)} · 3 − ${F(1, 4)} · ${F(7, 10)} − ${F(1, 5)}`, `${F(7, 12)} · ${F(11, 4)} · ${F(5, 10)}`],
    [`Calcule : 3 × ${F(2, 9)} · 5 × ${F(3, 4)} · 6 × ${F(1, 6)}`, `${F(6, 9)} · ${F(15, 4)} · ${F(6, 6)} = 1`],
    [`Calcule : les ${F(2, 3)} de 12 € · les ${F(3, 5)} de 1 km (en m) · les ${F(7, 10)} de 60 min`, '8 € · 600 m · 42 min'],
    [`Écris avec une virgule : ${F(1, 4)} · ${F(3, 4)} · ${F(1, 2)} · ${F(1, 5)} · ${F(5, 2)}`, '0,25 · 0,75 · 0,5 · 0,2 · 2,5'],
    [`Problème : Tom a mangé ${F(1, 4)} d'une pizza et Zoé ${F(3, 8)}. Quelle fraction de la pizza reste-t-il ?`, `${F(1, 4)} + ${F(3, 8)} = ${F(2, 8)} + ${F(3, 8)} = ${F(5, 8)} ; il reste ${F(8, 8)} − ${F(5, 8)} = ${F(3, 8)} de la pizza.`],
  ], { titre: 'Rédaction type : « Additionner des fractions »', lignes: [[`${F(1, 3)} + ${F(4, 9)}`, '9 est un multiple de 3.'], [`= ${F(3, 9)} + ${F(4, 9)}`, 'J\'écris 1/3 en neuvièmes.'], [`= ${F(7, 9)}`, 'J\'additionne les numérateurs.']] }),
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

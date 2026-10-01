/* ============================================================
   CHAPITRE : Fractions et mesure de longueurs (CE2, N7, période 3)
   Programme du cycle 2 (CE2) : à partir de la période 3, fraction d'une unité de longueur ;
   graduer une bande-unité (par pliage en quarts, sur quadrillage en dixièmes) ; mesurer :
   « trois quarts d'unité », « entre sept dixièmes et huit dixièmes », « deux unités et un quart » ;
   tracer avec des égalités de fractions (1/2 unité avec une règle en dixièmes) ; ranger des
   fractions sur la règle graduée. Dénominateurs ≤ 12, fractions ≤ 1 (plus des unités entières).
   ============================================================ */
(() => {
const F = cm1Frac;
// Étiquettes d'une graduation en n-ièmes : les entiers, et les fractions k/n entre 0 et 1.
const etq = n => i => i % n === 0 ? String(i / n) : (n <= 4 && i < n ? `${i}/${n}` : '');
// Bande (segment épais) de longueur v unités au-dessus d'une graduation.
function mesure(max, n, v, coul, U){
  U = U || 400 / max;
  const g = cm1Graduation(max, n, [], { etiquettes: etq(n), unite: U });
  const bande = `<svg viewBox="0 0 ${40 + max * U + 30} 26" style="width:100%;max-width:${40 + max * U + 30}px;display:block;margin:0 auto -8px;"><rect x="30" y="4" width="${v * U}" height="18" rx="3" fill="${coul || '#E35D3A'}" fill-opacity=".75" stroke="#1F3A5C"/></svg>`;
  return bande + g;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Fractions et mesure de longueurs', slug: 'fractions-longueurs',
  cours: `
${cm1Lecon(1, 'Partager une unité de longueur')}
${cm1Regle('On choisit une <b>unité</b> : une bande de papier, par exemple. En la pliant en deux, puis encore en deux, on la partage en <b>4 quarts</b>. On peut alors graduer une règle en <b>quarts d\'unité</b>.')}
<div class="figure-wrap">${cm1Graduation(2, 4, [], { etiquettes: etq(4), unite: 200 })}<p class="hint" style="margin:4px 0 0;">Une règle graduée en quarts d'unité : entre 0 et 1, il y a 4 intervalles égaux.</p></div>
${cm1Rem('Sur du papier quadrillé, si l\'unité mesure 10 carreaux, chaque carreau est un <b>dixième</b> d\'unité : on gradue facilement en dixièmes.')}

${cm1Lecon(2, 'Mesurer avec une règle graduée en fractions')}
${cm1Regle('On pose le début de la bande sur le 0 et on lit la graduation en face de l\'autre bout.')}
<div class="figure-wrap">${mesure(2, 4, 3 / 4, '#2EA8C9', 200)}<p class="hint" style="margin:4px 0 0;">La bande mesure <b>trois quarts d'unité</b> : ${F(3, 4)} u.</p></div>
<div class="figure-wrap">${mesure(3, 4, 2.25, '#2E9C6A', 140)}<p class="hint" style="margin:4px 0 0;">Cette bande mesure <b>deux unités et un quart d'unité</b> : 2 u + ${F(1, 4)} u.</p></div>
${cm1Rem(`Quand le bout tombe entre deux graduations, on dit par exemple : « la longueur est comprise entre ${F(7, 10)} et ${F(8, 10)} d'unité ».`)}

${cm1Lecon(3, 'Des fractions au même endroit')}
${cm1Regle(`Sur une règle graduée en dixièmes, la moitié de l'unité tombe sur la 5<sup>e</sup> graduation : ${F(1, 2)} = ${F(5, 10)}. Deux fractions égales sont <b>au même endroit</b> sur la règle.`)}
<div class="figure-wrap">${cm1Graduation(1, 10, [[0.5, '1/2 = 5/10', '#E35D3A'], [0.2, '1/5 = 2/10', '#7A4FC0']], { etiquettes: i => i === 0 || i === 10 ? String(i / 10) : `${i}/10`, unite: 440 })}</div>
${cm1Astuce(`Pour tracer 1 u + ${F(1, 5)} u avec une règle en dixièmes : ${F(1, 5)} = ${F(2, 10)}, donc on va jusqu'à la 2<sup>e</sup> graduation après le 1.`)}

${cm1Lecon(4, 'Ranger des fractions sur la règle')}
${cm1Regle(`Plus une fraction est <b>à droite</b> sur la règle, plus elle est <b>grande</b>. ${F(1, 4)} &lt; ${F(2, 4)} &lt; ${F(3, 4)} &lt; 1.`)}
`,
  methode: `
${cm1Demo('ce2-fl-tracer', 'Tracer un segment de longueur donnée', 'Avec une règle graduée en dixièmes d\'unité, trace un segment de 2 u + 3/5 u.')}
`,
  demos: [
    ['ce2-fl-tracer', [
      { expr: `${F(3, 5)} = ${F(6, 10)}`, note: 'Des cinquièmes deux fois plus grands que des dixièmes : on prend deux fois plus de dixièmes.' },
      { expr: 'Je pars du 0, je vais jusqu\'au 2, puis encore 6 graduations.', note: '' },
      { expr: cm1Graduation(3, 10, [[2.6, '2 u + 6/10 u', '#E35D3A']], { etiquettes: i => i % 10 === 0 ? String(i / 10) : '', unite: 140 }), note: 'Le segment s\'arrête à la 6<sup>e</sup> graduation après le 2.' },
    ]],
  ],
  exos: cm1Exos('ce2-fl', [
    ['Sur une règle graduée en quarts, où se trouve un demi ?', `Sur la 2<sup>e</sup> graduation : ${F(1, 2)} = ${F(2, 4)}.`],
    [`Une bande mesure ${F(4, 4)} d'unité. Que peux-tu dire ?`, 'Elle mesure exactement 1 unité.'],
    ['Avec une règle en dixièmes, comment tracer un segment d\'un demi d\'unité ?', `${F(1, 2)} = ${F(5, 10)} : on va jusqu'à la 5<sup>e</sup> graduation.`],
    [`Range : ${F(5, 8)}, ${F(1, 8)}, ${F(7, 8)}, ${F(3, 8)}.`, `${F(1, 8)} &lt; ${F(3, 8)} &lt; ${F(5, 8)} &lt; ${F(7, 8)}.`],
    ['Une bande va du 0 jusqu\'à la 3<sup>e</sup> graduation après le 1, sur une règle en quarts. Quelle est sa longueur ?', `1 u + ${F(3, 4)} u.`],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le pouce et ses fractions', [
    'Dans certains pays, comme les États-Unis, on mesure encore en <b>pouces</b> (environ 2 cm et demi). Les règles y sont graduées en <b>demis, quarts, huitièmes et seizièmes de pouce</b> : les fractions servent tous les jours aux menuisiers !',
  ]),
  quiz: [
    { q: 'Sur une règle graduée en quarts, la 3e graduation après le 0, c\'est…', opts: ['3/4 d\'unité', '1/3 d\'unité', '3 unités'], correct: 0 },
    { q: '1/2 unité = … dixièmes d\'unité', opts: ['2', '5', '10'], correct: 1 },
    { q: 'Quelle fraction est la plus grande ?', opts: ['2/6', '5/6', '3/6'], correct: 1 },
  ],
  flash: [
    { q: 'Une unité partagée en 4 parts égales : chaque part est…', r: ['un demi', 'un tiers', 'un quart', 'un dixième'], ok: 2 },
    { q: '1/2 unité = … dixièmes d\'unité', r: ['2', '5', '10', '1'], ok: 1 },
    { q: '4/4 d\'unité, c\'est…', r: ['4 unités', '1 unité', '1/4 d\'unité', '0'], ok: 1 },
    { q: 'Quelle longueur est la plus grande ?', r: ['3/10 u', '7/10 u', '5/10 u', '1/10 u'], ok: 1 },
    { q: '1/5 unité = … dixièmes d\'unité', r: ['1', '2', '5', '10'], ok: 1 },
    { q: 'Deux unités et un quart s\'écrit…', r: ['2 u + 1/4 u', '1/4 u', '2/4 u', '4 u + 1/2 u'], ok: 0 },
  ],
});
})();

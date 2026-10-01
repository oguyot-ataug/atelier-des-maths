/* ============================================================
   CHAPITRE : Fractions (CM2, N2, période 1)
   Programme du cycle 3 (CM2) : fractions pour partager (partie d'un tout), pour mesurer (quand
   les entiers ne suffisent pas), pour repérer sur une demi-droite graduée ; fraction supérieure
   à 1 écrite comme entier + fraction inférieure à 1, et réciproquement ; encadrer entre deux
   entiers consécutifs. Dénominateurs ≤ 60 (fractions décimales : 100 et 1 000).
   Comparer / calculer : chapitre « Fractions : comparer et calculer » (période 2).
   ============================================================ */
(() => {
const F = cm1Frac;
// Segment unité u et segment à mesurer (en nombre de parts de l'unité).
function mesure(n, k){
  const U = 180, x0 = 20; let s = `<svg viewBox="0 0 ${x0 + U * Math.ceil(k / n + .01) + 40} 92" style="width:100%;max-width:520px;display:block;margin:6px auto;">`;
  s += `<line x1="${x0}" y1="22" x2="${x0 + U}" y2="22" stroke="#2EA8C9" stroke-width="5"/><text x="${x0 + U / 2}" y="14" font-size="12" text-anchor="middle" fill="#2EA8C9" font-family="Space Grotesk" font-weight="700">unité u</text>`;
  s += `<line x1="${x0}" y1="62" x2="${x0 + U * k / n}" y2="62" stroke="#E35D3A" stroke-width="5"/>`;
  for(let i = 0; i <= k; i++){ const x = x0 + U * i / n; s += `<line x1="${x}" y1="${i % n === 0 ? 52 : 56}" x2="${x}" y2="${i % n === 0 ? 72 : 68}" stroke="#1F3A5C" stroke-width="${i % n === 0 ? 2 : 1}"/>`; }
  return s + `<text x="${x0 + U * k / n / 2}" y="88" font-size="12" text-anchor="middle" fill="#E35D3A" font-family="Space Grotesk" font-weight="700">segment [AB]</text></svg>`;
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Fractions', slug: 'fractions',
  cours: `
${cm1Lecon(1, 'Une fraction pour partager')}
${cm1Def(`Quand on partage une unité en <b>parts égales</b>, le <b>dénominateur</b> indique le nombre de parts et le <b>numérateur</b> le nombre de parts prises.<div style="margin:8px 0;">${cm1Bande(6, 5)}</div>On a colorié ${F(5, 6)} de la bande : « cinq sixièmes ».`)}
${cm1Rem(`Les fractions décimales ont pour dénominateur 10, 100 ou 1 000 : ${F(7, 10)} (sept dixièmes), ${F(7, 100)} (sept centièmes), ${F(7, 1000)} (sept millièmes).`)}

${cm1AnimFraction('cm2-frac', { n: 4, k: 7, forme: 'disque' })}

${cm1Lecon(2, 'Une fraction pour mesurer')}
${cm1Regle(`Quand une longueur ne contient pas un nombre entier de fois l'unité, on partage l'unité en parts égales et on compte les parts.`)}
<div class="figure-wrap">${mesure(4, 7)}</div>
${cm1Exemple('Mesure du segment [AB] avec l\'unité u :', [`L'unité u est partagée en 4 parts égales (des quarts).`, `Le segment [AB] mesure 7 quarts de u : [AB] = ${F(7, 4)} u, c'est-à-dire 1 u + ${F(3, 4)} u.`])}

${cm1Lecon(3, 'Fractions supérieures à 1')}
${cm1Regle(`<b>De la fraction à l'entier + fraction :</b> ${F(17, 5)} = ${F(15, 5)} + ${F(2, 5)} = <b>3 + ${F(2, 5)}</b> (dans 17 cinquièmes, il y a 3 fois 5 cinquièmes, et il en reste 2).<br>
<b>De l'entier + fraction à une seule fraction :</b> 2 + ${F(3, 8)} = ${F(16, 8)} + ${F(3, 8)} = <b>${F(19, 8)}</b> (2 unités = 16 huitièmes).`)}
${cm1Regle(`On peut alors <b>encadrer</b> la fraction entre deux entiers consécutifs : 3 &lt; ${F(17, 5)} &lt; 4.`, 'Encadrer')}

${cm1Lecon(4, 'Fractions sur une demi-droite graduée')}
<div class="figure-wrap">${cm1Graduation(3, 6, [[5 / 6, 'A', '#E35D3A'], [2 + 1 / 6, 'B', '#2EA8C9'], [1.5, 'C', '#2E9C6A']], { unite: 150 })}</div>
${cm1Exemple('Chaque unité est partagée en 6 : un petit écart vaut un sixième.', [`A correspond à ${F(5, 6)}.`, `B correspond à 2 + ${F(1, 6)}, soit ${F(13, 6)}.`, `C correspond à ${F(9, 6)} : c'est aussi 1 + ${F(3, 6)}, ou 1 + ${F(1, 2)}.`])}

${cm1Lecon(5, 'Fraction d\'une quantité')}
${cm1Regle(`Pour calculer les ${F(2, 3)} de 12 € : un tiers de 12 €, c'est 12 ÷ 3 = 4 € ; deux tiers, c'est 2 × 4 = <b>8 €</b>.`)}
`,
  methode: `
${cm1Demo('c2-fr-ecrire', 'Écrire une fraction supérieure à 1 autrement', 'Écris 29/6 sous la forme d\'un entier plus une fraction inférieure à 1, puis encadre-la.')}
${cm1Demo('c2-fr-une', 'Écrire un entier plus une fraction comme une seule fraction', 'Écris 4 + 5/7 sous la forme d\'une seule fraction.')}
`,
  demos: [
    ['c2-fr-ecrire', [
      { expr: `${F(29, 6)} = 29 sixièmes`, note: 'Une unité, c\'est 6 sixièmes. Combien d\'unités entières dans 29 sixièmes ?' },
      { expr: '4 × 6 = 24 ; 29 − 24 = 5', note: 'Dans la table de 6, 24 est le plus grand nombre inférieur à 29 : 4 unités, et il reste 5 sixièmes.' },
      { expr: `${F(29, 6)} = 4 + ${F(5, 6)}`, note: 'On écrit l\'entier plus la fraction inférieure à 1.' },
      { expr: `4 &lt; ${F(29, 6)} &lt; 5`, note: 'Encadrement entre deux entiers consécutifs.' },
    ]],
    ['c2-fr-une', [
      { expr: `4 = ${F(28, 7)}`, note: 'Une unité, c\'est 7 septièmes ; 4 unités, c\'est 4 × 7 = 28 septièmes.' },
      { expr: `${F(28, 7)} + ${F(5, 7)} = ${F(33, 7)}`, note: 'On ajoute les septièmes : 28 + 5 = 33.' },
      { expr: `4 + ${F(5, 7)} = ${F(33, 7)}`, note: 'Résultat.' },
    ]],
  ],
  exos: cm1Exos('c2fr', [
    [`Écris en lettres : ${F(4, 9)} · ${F(11, 12)} · ${F(3, 1000)} · ${F(25, 60)}`, 'quatre neuvièmes · onze douzièmes · trois millièmes · vingt-cinq soixantièmes.'],
    [`Quelle fraction de la bande est coloriée ?<div style="margin:6px 0;">${cm1Bande(8, 3)}</div>`, `${F(3, 8)}.`],
    [`Écris comme un entier plus une fraction inférieure à 1 : ${F(13, 4)} · ${F(23, 5)} · ${F(50, 12)}`, `3 + ${F(1, 4)} · 4 + ${F(3, 5)} · 4 + ${F(2, 12)}`],
    [`Écris sous la forme d'une seule fraction : 2 + ${F(1, 3)} · 5 + ${F(3, 4)} · 1 + ${F(7, 10)}`, `${F(7, 3)} · ${F(23, 4)} · ${F(17, 10)}`],
    [`Encadre entre deux entiers consécutifs : ${F(19, 6)} · ${F(40, 9)} · ${F(7, 8)}`, `3 &lt; ${F(19, 6)} &lt; 4 · 4 &lt; ${F(40, 9)} &lt; 5 · 0 &lt; ${F(7, 8)} &lt; 1`],
    [`Quelles fractions correspondent aux points D et E ?${cm1Graduation(2, 5, [[3 / 5, 'D', '#E35D3A'], [8 / 5, 'E', '#2EA8C9']], { unite: 200 })}`, `D : ${F(3, 5)} · E : ${F(8, 5)} = 1 + ${F(3, 5)}.`],
    [`Calcule : les ${F(3, 4)} de 100 m · les ${F(2, 5)} de 35 € · les ${F(5, 6)} de 42 élèves.`, '75 m (100 ÷ 4 = 25, 3 × 25) · 14 € (35 ÷ 5 = 7, 2 × 7) · 35 élèves (42 ÷ 6 = 7, 5 × 7).'],
    [`Avec l'unité u partagée en 3, un segment mesure 11 tiers de u. Écris sa mesure de deux façons.`, `${F(11, 3)} u = 3 u + ${F(2, 3)} u.`],
  ], { titre: 'Rédaction type : « Fraction d\'une quantité »', lignes: [[`${F(3, 5)} de 40 €`, 'Je cherche d\'abord un cinquième.'], ['40 ÷ 5 = 8 ; 3 × 8 = 24', 'Un cinquième vaut 8 €, trois cinquièmes valent 24 €.'], [`${F(3, 5)} de 40 € = 24 €`, 'Je conclus.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les fractions des Babyloniens', [
    'Il y a 4 000 ans, les <b>Babyloniens</b> comptaient en base 60. Ils écrivaient leurs fractions avec des dénominateurs 60, 3 600… comme nos minutes et nos secondes : une demi-heure, c\'est 30 soixantièmes d\'heure !',
    'C\'est pour cela que 60 est si pratique : il se partage en 2, 3, 4, 5, 6, 10, 12, 15, 20 et 30 parts égales. Au CM2, tu rencontreras des fractions jusqu\'à des soixantièmes.',
  ]),
  quiz: [
    { q: '13/4 = …', opts: ['3 + 1/4', '1 + 3/4', '4 + 1/3'], correct: 0 },
    { q: '2 + 1/5 = …', opts: ['3/5', '11/5', '21/5'], correct: 1 },
    { q: 'Les 2/3 de 18 €, c\'est…', opts: ['6 €', '12 €', '9 €'], correct: 1 },
  ],
});
})();

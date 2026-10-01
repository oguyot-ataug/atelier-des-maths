/* ============================================================
   CHAPITRE : Fractions égales (CE2, N4, période 2)
   Programme du cycle 2 (CE2) : réinvestir les fractions d'un tout du CE1 pour établir des
   égalités de fractions inférieures ou égales à 1 (5/10 = 1/2, 6/8 = 3/4), en s'appuyant sur des
   manipulations, des représentations et la verbalisation : « si je fais des parts deux fois plus
   petites et que j'en prends deux fois plus, j'en prends la même quantité ». Dénominateurs ≤ 12.
   ============================================================ */
(() => {
const F = cm1Frac;
const ligne = (n, k, c, lab) => `<div style="display:flex;align-items:center;gap:12px;justify-content:center;margin:4px 0;"><span style="min-width:44px;text-align:right;">${lab}</span>${cm1Bande(n, k, { coul: c, largeur: 240 })}</div>`;
cm1Chapitre({
  niveau: 'ce2', titre: 'Fractions égales', slug: 'fractions-egales',
  cours: `
${cm1Lecon(1, 'Rappel : une fraction d\'un tout')}
${cm1Def(`Quand on partage un tout en <b>parts égales</b>, ${F(3, 4)} veut dire : on a partagé en <b>4 parts égales</b> (le <b>dénominateur</b>, en bas) et on en prend <b>3</b> (le <b>numérateur</b>, en haut). On lit « trois quarts ».`)}
${cm1AnimFraction('ce2-frac-eg', { n: 4, k: 3 })}
${cm1Tableau(['Fraction', 'On lit'], [[F(1, 2), 'un demi'], [F(1, 3), 'un tiers'], [F(3, 4), 'trois quarts'], [F(2, 5), 'deux cinquièmes'], [F(7, 10), 'sept dixièmes']])}

${cm1Lecon(2, 'Des fractions égales')}
${cm1Regle(`Deux fractions sont <b>égales</b> quand elles représentent <b>la même part</b> du même tout.`)}
<div class="figure-wrap">${ligne(2, 1, '#E35D3A', F(1, 2))}${ligne(4, 2, '#2EA8C9', F(2, 4))}${ligne(10, 5, '#2E9C6A', F(5, 10))}
<p class="hint" style="margin:4px 0 0;">Les trois bandes ont la même longueur coloriée : ${F(1, 2)} = ${F(2, 4)} = ${F(5, 10)}.</p></div>
${cm1Regle(`Si je fais des parts <b>2 fois plus petites</b> et que j'en prends <b>2 fois plus</b>, j'ai <b>la même quantité</b>. ${F(3, 4)} = ${F(6, 8)} : 4 parts deviennent 8 parts, 3 parts deviennent 6 parts.`, 'Pourquoi ?')}
<div class="figure-wrap">${ligne(4, 3, '#7A4FC0', F(3, 4))}${ligne(8, 6, '#7A4FC0', F(6, 8))}</div>

${cm1Lecon(3, 'Reconnaître une fraction égale à un demi')}
${cm1Regle(`Une fraction est égale à ${F(1, 2)} quand le numérateur est <b>la moitié</b> du dénominateur : ${F(2, 4)}, ${F(3, 6)}, ${F(4, 8)}, ${F(5, 10)}, ${F(6, 12)}.`)}
${cm1Rem(`Une fraction égale à <b>1</b> : le numérateur et le dénominateur sont égaux. ${F(4, 4)} = ${F(10, 10)} = 1 : on a pris tout le tout.`)}
`,
  methode: `
${cm1Demo('ce2-fe-trou', 'Trouver le numérateur manquant', 'Complète : ?/8 = 1/2.')}
${cm1Demo('ce2-fe-trier', 'Trouver les fractions égales à un demi', 'Parmi 1/3, 2/4, 3/4, 2/6 et 3/6, quelles fractions sont égales à 1/2 ?')}
`,
  demos: [
    ['ce2-fe-trou', [
      { expr: `?/8 = ${F(1, 2)}`, note: 'On cherche combien de huitièmes font un demi.' },
      { expr: cm1Bande(2, 1, { largeur: 240 }) + '<br>' + cm1Bande(8, 4, { largeur: 240 }), note: 'Je partage chaque moitié en 4 : la moitié, c\'est 4 parts sur 8.' },
      { expr: `${F(4, 8)} = ${F(1, 2)}`, note: 'Le numérateur manquant est 4 : c\'est la moitié de 8.' },
    ]],
    ['ce2-fe-trier', [
      { expr: 'Une fraction égale à un demi : le numérateur est la moitié du dénominateur.', note: 'On regarde chaque fraction.' },
      { expr: `${F(1, 3)} : non (la moitié de 3 n'est pas 1) · ${F(2, 4)} : oui · ${F(3, 4)} : non`, note: '' },
      { expr: `${F(2, 6)} : non (la moitié de 6, c'est 3) · ${F(3, 6)} : oui`, note: '' },
      { expr: `Réponse : ${F(2, 4)} et ${F(3, 6)}.`, note: 'On peut vérifier avec des bandes.' },
    ]],
  ],
  exos: cm1Exos('ce2-fe', [
    [`Complète : ${F(1, 2)} = ?/6 · ${F(1, 2)} = ?/10 · ${F(1, 2)} = ?/12.`, '3 · 5 · 6.'],
    [`Complète : ${F(1, 4)} = ?/8 · ${F(3, 4)} = ?/8.`, '2 · 6 (on fait des parts 2 fois plus petites et on en prend 2 fois plus).'],
    [`Vrai ou faux : ${F(2, 3)} = ${F(4, 6)} ?`, 'Vrai : des sixièmes 2 fois plus petits que des tiers, et 2 fois plus de parts.'],
    [`Parmi ${F(4, 8)}, ${F(3, 5)}, ${F(5, 10)} et ${F(2, 5)}, lesquelles sont égales à un demi ?`, `${F(4, 8)} et ${F(5, 10)}.`],
    [`Écris une fraction égale à 1 avec le dénominateur 9.`, `${F(9, 9)}.`],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les fractions des Égyptiens', [
    'Les Égyptiens, il y a plus de 4 000 ans, n\'utilisaient presque que des fractions avec un <b>1 en haut</b> : un demi, un tiers, un quart… Pour écrire trois quarts, ils écrivaient « un demi et un quart » ! Ils savaient pourtant très bien partager le pain et la bière entre les ouvriers des pyramides.',
  ]),
  quiz: [
    { q: 'Quelle fraction est égale à 1/2 ?', opts: ['2/3', '4/8', '1/4'], correct: 1 },
    { q: '3/4 = ?/8', opts: ['3', '6', '4'], correct: 1 },
    { q: 'Une fraction égale à 1 :', opts: ['5/5', '1/5', '4/5'], correct: 0 },
  ],
  flash: [
    { q: 'Quelle fraction est égale à un demi ?', r: ['2/3', '3/6', '3/4', '1/3'], ok: 1 },
    { q: '1/2 = ?/10', r: ['2', '4', '5', '10'], ok: 2 },
    { q: '3/4 = ?/8', r: ['3', '4', '6', '7'], ok: 2 },
    { q: 'Dans 3/4, le dénominateur est…', r: ['3', '4', '7', '1'], ok: 1 },
    { q: 'Quelle fraction est égale à 1 ?', r: ['1/8', '8/8', '7/8', '4/8'], ok: 1 },
    { q: 'Vrai ou faux : 2/4 = 1/2', r: ['Vrai', 'Faux'], ok: 0 },
  ],
});
})();

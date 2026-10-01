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
${ce2AnimFracEgales('ce2-fe-anim', { presets: [{ nom: 'Trois quarts', n: 4, k: 3, f: 2 }, { nom: 'Un demi', n: 2, k: 1, f: 5 }, { nom: 'Deux tiers', n: 3, k: 2, f: 2 }, { nom: 'Un quart', n: 4, k: 1, f: 3 }] })}

${cm1Lecon(3, 'Reconnaître une fraction égale à un demi')}
${cm1Regle(`Une fraction est égale à ${F(1, 2)} quand le numérateur est <b>la moitié</b> du dénominateur : ${F(2, 4)}, ${F(3, 6)}, ${F(4, 8)}, ${F(5, 10)}, ${F(6, 12)}.`)}
${cm1Rem(`Une fraction égale à <b>1</b> : le numérateur et le dénominateur sont égaux. ${F(4, 4)} = ${F(10, 10)} = 1 : on a pris tout le tout.`)}
`,
  methode: `
${cm1Demo('ce2-fe-trou', 'Trouver le numérateur manquant', `Complète l'égalité : ${F('?', 8)} = ${F(1, 2)}.`)}
${cm1Demo('ce2-fe-trier', 'Trouver les fractions égales à un demi', `Parmi ${F(1, 3)}, ${F(2, 4)}, ${F(3, 4)}, ${F(2, 6)} et ${F(3, 6)}, quelles fractions sont égales à ${F(1, 2)} ?`)}
`,
  demos: [
    ['ce2-fe-trou', [
      { expr: `${F('?', 8)} = ${F(1, 2)}`, note: 'On cherche combien de huitièmes font un demi.' },
      { expr: cm1Bande(2, 1, { largeur: 240 }) + '<br>' + cm1Bande(8, 4, { largeur: 240 }), note: 'Je partage chaque moitié en 4 : la moitié, c\'est 4 parts sur 8.' },
      { expr: `${F(4, 8)} = ${F(1, 2)}`, note: 'Le numérateur manquant est 4 : c\'est la moitié de 8.' },
    ]],
    ['ce2-fe-trier', [
      { expr: 'Le numérateur doit être la moitié du dénominateur.', note: 'C\'est la règle pour être égal à un demi.' },
      { expr: `${F(1, 3)} : non`, note: '3 n\'a pas de moitié entière égale à 1.' },
      { expr: `${F(2, 4)} : oui`, note: '2 est la moitié de 4.' },
      { expr: `${F(3, 4)} : non`, note: 'La moitié de 4, c\'est 2.' },
      { expr: `${F(2, 6)} : non`, note: 'La moitié de 6, c\'est 3.' },
      { expr: `${F(3, 6)} : oui`, note: '3 est la moitié de 6.' },
      { expr: `Les fractions égales à ${F(1, 2)} sont ${F(2, 4)} et ${F(3, 6)}.`, note: 'On peut vérifier avec des bandes.' },
    ]],
  ],
  exos: cm1Exos('ce2-fe', [
    [`Complète ces égalités.${cm1Liste([`${F(1, 2)} = ${F('?', 6)}`, `${F(1, 2)} = ${F('?', 10)}`, `${F(1, 2)} = ${F('?', 12)}`])}`,
      cm1Redac('Première égalité', `${F(1, 2)} = ${F(3, 6)}`, 'Le numérateur manquant est 3, la moitié de 6.')
      + cm1Redac('Deuxième égalité', `${F(1, 2)} = ${F(5, 10)}`, 'Le numérateur manquant est 5, la moitié de 10.')
      + cm1Redac('Troisième égalité', `${F(1, 2)} = ${F(6, 12)}`, 'Le numérateur manquant est 6, la moitié de 12.')],
    [`Complète ces égalités.${cm1Liste([`${F(1, 4)} = ${F('?', 8)}`, `${F(3, 4)} = ${F('?', 8)}`])}`,
      cm1Redac('Première égalité', `${F(1, 4)} = ${F(2, 8)}`, 'Des parts 2 fois plus petites, 2 fois plus de parts : le numérateur manquant est 2.')
      + cm1Redac('Deuxième égalité', `${F(3, 4)} = ${F(6, 8)}`, 'Le numérateur manquant est 6.')],
    [`Léa mange ${F(2, 3)} d'une tarte. Hugo mange ${F(4, 6)} d'une tarte identique. Ont-ils mangé la même quantité ?`,
      cm1Redac('Comparaison des parts', `${F(2, 3)} = ${F(4, 6)}`, 'Des sixièmes sont 2 fois plus petits que des tiers, et Hugo en a pris 2 fois plus : Léa et Hugo ont mangé la même quantité.')],
    [`Parmi ${F(4, 8)}, ${F(3, 5)}, ${F(5, 10)} et ${F(2, 5)}, lesquelles sont égales à un demi ?`,
      cm1Redac('Fractions égales à un demi', { suite: [`${F(4, 8)} = ${F(1, 2)}`, `${F(5, 10)} = ${F(1, 2)}`] }, `Les fractions égales à un demi sont ${F(4, 8)} et ${F(5, 10)}.`)],
    ['Écris une fraction égale à 1 dont le dénominateur est 9.',
      cm1Redac('Fraction égale à 1', `${F(9, 9)} = 1`, `${F(9, 9)} est égale à 1 : on a pris les 9 parts sur 9.`)],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les fractions des Égyptiens', [
    'Les Égyptiens, il y a plus de 4 000 ans, n\'utilisaient presque que des fractions avec un <b>1 en haut</b> : un demi, un tiers, un quart… Pour écrire trois quarts, ils écrivaient « un demi et un quart » ! Ils savaient pourtant très bien partager le pain et la bière entre les ouvriers des pyramides.',
  ]),
  quiz: [
    { q: `Quelle fraction est égale à ${F(1, 2)} ?`, opts: [F(2, 3), F(4, 8), F(1, 4)], correct: 1 },
    { q: `${F(3, 4)} = ${F('?', 8)}`, opts: ['3', '6', '4'], correct: 1 },
    { q: 'Une fraction égale à 1 :', opts: [F(5, 5), F(1, 5), F(4, 5)], correct: 0 },
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

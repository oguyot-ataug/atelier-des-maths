/* ============================================================
   CHAPITRE : Les nombres jusqu'à 100 (CE1, N1, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : consolider les nombres jusqu'à
   100 vus au CP (dizaines et unités, écritures en chiffres et en lettres, en particulier de 60 à 99),
   le tableau des nombres, la droite graduée (nouveau : placer et repérer un nombre), comparer.
   Pensé pour être projeté : les cubes qui se rangent en barres de dix, le mot découpé.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Les nombres jusqu\'à 100', slug: 'nombres-100',
  cours: `
${cm1Lecon(1, 'Dizaines et unités')}
${cpAnimGrouper('ce1-n1-grouper', { n: 47, max: 99 })}
${cm1Def(`${lig(cpBarres(74, { q: 9 }))}${P('<b>74</b> : 7 dizaines et 4 unités. 74 = 70 + 4.')}`, 'Le rappel du CP')}
${cm1Regle('Dans un nombre à deux chiffres, le chiffre de gauche est le chiffre des <b>dizaines</b>, celui de droite le chiffre des <b>unités</b>. 74 et 47 ne sont pas le même nombre !')}

${cm1Lecon(2, 'Écrire les nombres en lettres')}
${cpAnimMot('ce1-n1-mot')}
${cm1Regle(`${cm1Liste(['de 70 à 79 : soixante-dix, soixante et onze, soixante-douze… (60 + 10, 60 + 11…) ;', 'de 80 à 89 : quatre-vingts, quatre-vingt-un… (4 fois 20, puis + 1…) ;', 'de 90 à 99 : quatre-vingt-dix, quatre-vingt-onze… (80 + 10, 80 + 11…).'])}`, 'Les nombres difficiles')}
${cm1Astuce('Quatre-vingts prend un <b>s</b>, mais quatre-vingt-un n\'en prend pas : le s disparaît quand un autre nombre suit.')}

${cm1Lecon(3, 'La droite graduée')}
${cm1Def(`Sur une <b>droite graduée</b>, les nombres sont placés dans l'ordre, à intervalles réguliers.${cm1Axe(0, 100, 10, 10, [[40, 'A'], [70, 'B']])}${P('A est en face de <b>40</b>, B en face de <b>70</b>.')}`, 'Graduée de 10 en 10')}
${cm1Axe(30, 50, 1, 5, [[37, 'C'], [44, 'D']], { L: 480 })}
${cm1Regle('Pour lire un nombre, je regarde les nombres écrits avant et après, puis je compte les petits traits : C est 2 traits après 35, donc en face de <b>37</b>. D est en face de <b>44</b>.')}

${cm1Lecon(4, 'Comparer et ranger')}
${cm1Regle(`On compare d'abord les dizaines, puis les unités.${cm1Liste(['68 &lt; 86 (6 dizaines &lt; 8 dizaines)', '53 &gt; 51 (même nombre de dizaines, 3 &gt; 1)'])}`, 'Comparer')}
${lig(cpTableau(0, 99, { c: 26, colonne: 0 }))}
`,
  methode: `
${cm1Demo('ce1-n1-m-lettres', 'Écrire 97 en lettres', 'Écris le nombre 97 en lettres.')}
${cm1Demo('ce1-n1-m-droite', 'Lire un nombre sur une droite graduée', 'Quel nombre est en face du point E ?')}
`,
  demos: [
    ['ce1-n1-m-lettres', [
      { expr: '97 = 80 + 17', note: 'Au-delà de 80, on dit « quatre-vingt » puis le reste.' },
      { expr: '80 : quatre-vingt', note: 'Pas de s, car un autre nombre suit.' },
      { expr: '17 : dix-sept', note: 'J\'assemble avec des traits d\'union.' },
      { expr: '97 : quatre-vingt-dix-sept', note: 'Je relis : 80 + 17 = 97.' },
    ]],
    ['ce1-n1-m-droite', [
      { expr: 'Les grands traits vont de 10 en 10.', note: 'Entre 60 et 70, il y a 10 petits intervalles : chacun vaut 1.', fig: cm1Axe(50, 80, 1, 10, [[63, 'E']]) },
      { expr: 'E est 3 petits traits après 60.', note: 'Je compte : 61, 62, 63.' },
      { expr: 'E est en face de 63.', note: 'Je vérifie : 63 est entre 60 et 70.' },
    ]],
  ],
  exos: cm1Exos('ce1-n1', [
    [`Combien y a-t-il de cubes ?${lig(cpBarres(58, { q: 9 }))}`,
      cm1Redac('Nombre de cubes', '50 + 8 = 58', '5 barres de dix et 8 cubes : il y a 58 cubes.')],
    ['Écris en chiffres : soixante-dix-neuf.',
      cm1Redac('Soixante-dix-neuf', '60 + 19 = 79', 'Soixante-dix-neuf s\'écrit 79.')],
    ['Écris en lettres : 84.',
      cm1Redac('84 en lettres', '84 = 80 + 4', '84 s\'écrit quatre-vingt-quatre.')],
    ['Décompose : 96 = … + …',
      cm1Redac('Décomposer 96', '96 = 90 + 6', '96, c\'est 9 dizaines et 6 unités.')],
    [`Quels nombres sont en face des points A et B ?${cm1Axe(20, 40, 1, 5, [[23, 'A'], [36, 'B']])}`,
      cm1Redac('Les points A et B', { suite: ['A : 23', 'B : 36'] }, 'A est en face de 23 et B en face de 36.')],
    ['Range du plus petit au plus grand : 67, 76, 59, 70.',
      cm1Redac('Ranger', '59 &lt; 67 &lt; 70 &lt; 76', 'Dans l\'ordre croissant : 59, 67, 70, 76.')],
    ['Écris le nombre qui vient juste avant et juste après 80.',
      cm1Redac('Avant et après 80', { suite: ['80 − 1 = 79', '80 + 1 = 81'] }, 'Juste avant 80, il y a 79 ; juste après, 81.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : septante, huitante, nonante', [
    'En France, on dit « soixante-dix » et « quatre-vingts ». Mais en Belgique et en Suisse, on dit souvent <b>septante</b> (70) et <b>nonante</b> (90), et dans certains cantons suisses <b>huitante</b> (80) : c\'est bien plus régulier !',
    'Autrefois, en France aussi, on disait septante et nonante. Les façons de compter par vingt (quatre-vingts) se sont imposées à Paris il y a quelques siècles.',
  ]),
  quiz: [
    { q: 'Quatre-vingt-douze s\'écrit…', opts: ['4 20 12', '92', '82'], correct: 1 },
    { q: 'Dans 63, le chiffre des dizaines est…', opts: ['3', '6', '63'], correct: 1 },
    { q: 'Quel est le plus grand ?', opts: ['79', '81', '78'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '7 dizaines et 2 unités, c\'est…', r: ['72', '27', '702', '9'], ok: 0 },
    { l: 1, q: '80 + 5 = …', r: ['85', '805', '58', '13'], ok: 0 },
    { l: 2, q: 'Soixante-quinze s\'écrit…', r: ['75', '615', '65', '57'], ok: 0 },
    { l: 2, q: '91 se dit…', r: ['quatre-vingt-onze', 'nonante-un', 'quatre-vingt-un', 'neuf-un'], ok: 0 },
    { l: 3, q: 'Sur une droite graduée de 10 en 10, après 40 vient…', r: ['41', '50', '60', '400'], ok: 1 },
    { l: 4, q: '58 … 85', r: ['&lt;', '&gt;', '=', '+'], ok: 0 },
    { l: 4, q: 'Juste après 99, il y a…', r: ['100', '910', '98', '1000'], ok: 0 },
  ],
});
})();

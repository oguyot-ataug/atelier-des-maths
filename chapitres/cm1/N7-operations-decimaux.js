/* ============================================================
   CHAPITRE : Opérations sur les nombres décimaux (CM1, N7, période 3)
   Programme du cycle 3 (CM1) : addition et soustraction de nombres décimaux (jusqu'aux
   centièmes), en ligne et posées ; multiplier et diviser un décimal par 10 (calcul mental,
   repère : le chiffre des unités) ; ordre de grandeur pour contrôler un résultat. La
   multiplication d'un décimal par un entier est au programme de CM2.
   ============================================================ */
(() => {
// Opération posée en colonnes alignées sur la virgule : lignes = [[signe, 'chiffres avec virgule']], la dernière est le résultat.
function posee(lignes, retenues){
  const larg = Math.max(...lignes.map(l => l[1].length));
  const cell = (c, st) => `<td style="width:22px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.15rem;font-weight:700;padding:2px 0;${st || ''}">${c === ' ' ? '' : c}</td>`;
  let h = '<table style="border-collapse:collapse;margin:8px auto;">';
  if(retenues) h += `<tr><td></td>${retenues.padStart(larg).split('').map(c => cell(c, 'font-size:.75rem;color:#E35D3A;')).join('')}</tr>`;
  lignes.forEach(([s, n], i) => { const res = i === lignes.length - 1;
    h += `<tr style="${res ? 'border-top:2px solid #1F3A5C;' : ''}">${cell(s, 'color:#E35D3A;')}${n.padStart(larg).split('').map(c => cell(c, res ? 'color:#2E9C6A;' : '')).join('')}</tr>`; });
  return h + '</table>';
}
const U = t => `<b style="color:#E35D3A;">${t}</b>`;
cm1Chapitre({
  titre: 'Opérations sur les nombres décimaux', slug: 'operations-decimaux',
  cours: `
${cm1Lecon(1, 'Additionner des nombres décimaux')}
${cm1Regle('On additionne les chiffres <b>de même rang</b> : les centièmes avec les centièmes, les dixièmes avec les dixièmes, les unités avec les unités…<br>Pour poser l\'opération, on <b>aligne les virgules</b> les unes sous les autres.')}
${cm1Exemple('Exemple : 14,65 + 3,8')}
<div class="figure-wrap">${posee([[' ', '14,65'], ['+', ' 3,80'], [' ', '18,45']], ' 1   ')}</div>
<ul class="example-list"><li>On complète 3,8 en 3,80 pour que les deux nombres aient autant de chiffres après la virgule.</li><li>6 dixièmes + 8 dixièmes = 14 dixièmes = 1 unité et 4 dixièmes : on écrit 4 et on retient 1 aux unités.</li><li>La virgule du résultat est placée sous les autres virgules.</li></ul>

${cm1Lecon(2, 'Soustraire des nombres décimaux')}
${cm1Regle('Comme pour l\'addition : on <b>aligne les virgules</b> et on complète par des zéros si besoin, puis on soustrait rang par rang, en commençant par la droite.')}
${cm1Exemple('Exemple : 9,3 − 4,75')}
<div class="figure-wrap">${posee([[' ', '9,30'], ['−', '4,75'], [' ', '4,55']])}</div>
<ul class="example-list"><li>9,3 = 9,30 : on écrit le 0 des centièmes pour pouvoir soustraire.</li><li>On vérifie avec une addition : 4,55 + 4,75 = 9,30. ✔</li></ul>

${cm1Lecon(3, 'Calculer en ligne')}
${cm1Exemple('On peut calculer sans poser en décomposant :', ['2,5 + 1,5 = 2 + 1 + 0,5 + 0,5 = 3 + 1 = <b>4</b>', '6,4 − 0,2 = <b>6,2</b> (4 dixièmes − 2 dixièmes = 2 dixièmes)', '3,7 + 0,3 = <b>4</b> (7 dixièmes + 3 dixièmes = 10 dixièmes = 1 unité)'])}

${cm1Lecon(4, 'Multiplier et diviser par 10')}
${cm1Regle(`Multiplier par 10, c'est rendre le nombre <b>10 fois plus grand</b> : chaque chiffre prend une valeur 10 fois plus grande, il <b>glisse d'un rang vers la gauche</b>.<br>
Diviser par 10, c'est rendre le nombre <b>10 fois plus petit</b> : chaque chiffre <b>glisse d'un rang vers la droite</b>.`)}
${cm1Tableau(['Dizaines', 'Unités', ',', 'Dixièmes', 'Centièmes'], [['', U('4'), ',', '2', '7'], ['4', U('2'), ',', '7', '']])}
${cm1Exemple('Lecture :', [`4,27 × 10 = <b>42,7</b> : le chiffre 4 était aux unités, il passe aux dizaines.`, `42,7 ÷ 10 = <b>4,27</b> : chaque chiffre revient d'un rang vers la droite.`, `3 ÷ 10 = <b>0,3</b> (3 unités = 30 dixièmes, et 30 dixièmes ÷ 10 = 3 dixièmes).`])}
${cm1Astuce('Repère le <b>chiffre des unités</b> (en rouge) : c\'est lui qu\'on suit quand le nombre glisse. Tu peux t\'entraîner avec l\'outil <b>Convertisseur → Glisse-nombre</b> du menu S\'entraîner.')}

${cm1Lecon(5, 'Vérifier avec un ordre de grandeur')}
${cm1Regle('Avant de calculer, on peut <b>estimer</b> le résultat avec des nombres entiers proches : 14,65 + 3,8, c\'est à peu près 15 + 4 = 19. Le résultat 18,45 est bien proche de 19 : il est plausible.')}
`,
  methode: `
${cm1Demo('od-add', 'Poser une addition de nombres décimaux', 'Calcule 27,4 + 5,68.')}
${cm1Demo('od-sous', 'Résoudre un problème de monnaie', 'Léo a 20 €. Il achète un livre à 12,45 €. Combien lui rend-on ?')}
${cm1Demo('od-dix', 'Multiplier un nombre décimal par 10', 'Calcule 0,56 × 10.')}
`,
  demos: [
    ['od-add', [
      { expr: '27,4 ≈ 27 et 5,68 ≈ 6 → environ 33', note: 'On estime d\'abord l\'ordre de grandeur du résultat.' },
      { expr: '27,40 + 5,68', note: 'On complète 27,4 en 27,40 : les deux nombres ont maintenant deux chiffres après la virgule.' },
      { expr: posee([[' ', '27,40'], ['+', ' 5,68'], [' ', '33,08']], '11   '), note: 'On aligne les virgules et on additionne rang par rang, en partant des centièmes : 0 + 8 = 8 ; 4 + 6 = 10, j\'écris 0 et je retiens 1 ; 7 + 5 + 1 = 13, j\'écris 3 et je retiens 1 ; 2 + 1 = 3.' },
      { expr: '27,4 + 5,68 = 33,08', note: 'Le résultat est proche de 33 : il est plausible.' },
    ]],
    ['od-sous', [
      { expr: '20 − 12,45', note: 'On cherche ce qui reste : c\'est une soustraction.' },
      { expr: '20,00 − 12,45', note: '20 € = 20,00 € : on écrit les centièmes.' },
      { expr: posee([[' ', '20,00'], ['−', '12,45'], [' ', ' 7,55']]), note: 'On pose en alignant les virgules et on soustrait rang par rang.' },
      { expr: 'On lui rend 7,55 €.', note: 'Vérification : 12,45 + 7,55 = 20. ✔' },
    ]],
    ['od-dix', [
      { expr: `0,${U('5')}6`, note: 'On suit le chiffre 5 (en rouge) : pour l\'instant, c\'est le chiffre des dixièmes (le chiffre des unités est 0).' },
      { expr: `${U('5')},6`, note: 'Multiplier par 10 : chaque chiffre glisse d\'un rang vers la gauche. Les 5 dixièmes deviennent 5 unités, les 6 centièmes deviennent 6 dixièmes.' },
      { expr: '0,56 × 10 = 5,6', note: 'Le résultat est 10 fois plus grand.' },
    ]],
  ],
  exos: cm1Exos('od', [
    ['Calcule en ligne : 3,5 + 2,5 &nbsp;·&nbsp; 7,8 − 0,5 &nbsp;·&nbsp; 1,25 + 0,75 &nbsp;·&nbsp; 10 − 0,1', '6 · 7,3 · 2 · 9,9'],
    ['Pose et calcule : 45,7 + 12,85 &nbsp;·&nbsp; 6,09 + 13,4', '58,55 · 19,49'],
    ['Pose et calcule : 36,5 − 14,28 &nbsp;·&nbsp; 50 − 7,35', '22,22 · 42,65'],
    ['Calcule : 3,4 × 10 &nbsp;·&nbsp; 0,7 × 10 &nbsp;·&nbsp; 58 ÷ 10 &nbsp;·&nbsp; 6,2 ÷ 10', '34 · 7 · 5,8 · 0,62'],
    ['Donne un ordre de grandeur, puis calcule : 19,8 + 30,15.', 'Environ 20 + 30 = 50. Résultat exact : 49,95.'],
    ['Problème : Maïa mesure 1,38 m. Son frère mesure 0,25 m de plus. Quelle est la taille de son frère ?', '1,38 + 0,25 = 1,63. Son frère mesure 1,63 m.'],
    ['Problème : au marché, j\'achète des pommes pour 3,60 € et du fromage pour 5,85 €. Je paie avec un billet de 10 €. Combien me rend-on ?', 'Dépense : 3,60 + 5,85 = 9,45 €. Rendu : 10 − 9,45 = 0,55 €.'],
  ], { titre: 'Rédaction type : « Poser une soustraction décimale »', lignes: [['12 − 3,6 ≈ 12 − 4 = 8', 'J\'estime le résultat.'], ['12,0 − 3,6 = 8,4', 'J\'aligne les virgules et je complète par un 0.'], ['Vérification : 8,4 + 3,6 = 12', 'Je vérifie avec une addition.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : l\'euro et ses centimes', [
    'Quand tu paies 12,45 €, tu utilises des nombres décimaux sans y penser : 45 centimes, ce sont 45 <b>centièmes</b> d\'euro.',
    'La France a été l\'un des premiers pays à utiliser une monnaie <b>décimale</b> : en 1795, le franc est partagé en 100 centimes. Avant, une livre valait 20 sous et un sou valait 12 deniers… les calculs de monnaie étaient bien plus difficiles !',
    'Depuis 2002, l\'<b>euro</b> est lui aussi partagé en 100 centimes, dans une vingtaine de pays d\'Europe.',
  ]),
  quiz: [
    { q: '2,4 + 1,6 = …', opts: ['3,10', '4', '3,1'], correct: 1 },
    { q: 'Pour poser une addition de décimaux, on aligne…', opts: ['les premiers chiffres', 'les derniers chiffres', 'les virgules'], correct: 2 },
    { q: '0,8 × 10 = …', opts: ['0,80', '8', '80'], correct: 1 },
    { q: '5 − 0,3 = …', opts: ['4,7', '5,3', '2'], correct: 0 },
  ],
});
})();

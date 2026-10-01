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
${cmAnimGlisseDec('cm1-od-glisse', { presets: [{ nom: '4,27 × 10', n: '4,27', f: 10, op: '×' }, { nom: '42,7 ÷ 10', n: '42,7', f: 10, op: '÷' }, { nom: '3 ÷ 10', n: '3', f: 10, op: '÷' }, { nom: '0,56 × 10', n: '0,56', f: 10, op: '×' }] })}
${cm1Tableau(['Dizaines', 'Unités', ',', 'Dixièmes', 'Centièmes'], [['', U('4'), ',', '2', '7'], ['4', U('2'), ',', '7', '']])}
${cm1Exemple('Lecture :', [`4,27 × 10 = <b>42,7</b> : le chiffre 4 était aux unités, il passe aux dizaines.`, `42,7 ÷ 10 = <b>4,27</b> : chaque chiffre revient d'un rang vers la droite.`, `3 ÷ 10 = <b>0,3</b> : 3 unités deviennent 3 dixièmes.`])}
${cm1Astuce('Repère le <b>chiffre des unités</b> (en rouge) : c\'est lui qu\'on suit quand le nombre glisse. Tu peux t\'entraîner avec l\'outil <b>Convertisseur → Glisse-nombre</b> du menu S\'entraîner.')}

${cm1Lecon(5, 'Vérifier avec un ordre de grandeur')}
${cm1Regle(`Avant de calculer, on peut <b>estimer</b> le résultat avec des nombres entiers proches. Pour 14,65 + 3,8 :${cm1Liste(['estimation : 15 + 4 = 19', 'calcul exact : 14,65 + 3,8 = 18,45'])}Le résultat 18,45 est bien proche de 19 : il est plausible.`)}
`,
  methode: `
${cm1Sous('M', 'À toi : une opération posée, pas à pas')}
${cm1AnimOperation('cm1-op-dec', { a: '27,4', op: '+', b: '5,68', ops: ['+', '−'] })}
${cm1Demo('od-add', 'Poser une addition de nombres décimaux', 'Calcule 27,4 + 5,68.')}
${cm1Demo('od-sous', 'Résoudre un problème de monnaie', 'Léo a 20 €. Il achète un livre à 12,45 €. Combien lui rend-on ?')}
${cm1Demo('od-dix', 'Multiplier un nombre décimal par 10', 'Calcule 0,56 × 10.')}
`,
  demos: [
    ['od-add', [
      { expr: '27 + 6 = 33', note: 'On estime d\'abord l\'ordre de grandeur : 27,4 est proche de 27 et 5,68 de 6.' },
      { expr: '27,40 + 5,68', note: 'On complète 27,4 en 27,40 : les deux nombres ont maintenant deux chiffres après la virgule.' },
      { expr: posee([[' ', '27,40'], ['+', ' 5,68'], [' ', '33,08']], '11   '), note: 'On aligne les virgules et on additionne rang par rang, en partant des centièmes, avec les retenues.' },
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
    [`Calcule en ligne.${cm1Liste(['3,5 + 2,5', '7,8 − 0,5', '1,25 + 0,75', '10 − 0,1'])}`,
      cm1Redac('Calculs en ligne', { suite: ['3,5 + 2,5 = 6', '7,8 − 0,5 = 7,3', '1,25 + 0,75 = 2', '10 − 0,1 = 9,9'] }, 'On calcule rang par rang : 5 dixièmes et 5 dixièmes font une unité.')],
    ['Un randonneur marche 45,7 km le premier jour et 12,85 km le deuxième jour. Quelle distance a-t-il parcourue ?',
      cm1Redac('Distance parcourue', { pose: posee([[' ', '45,70'], ['+', '12,85'], [' ', '58,55']], ' 1   ') }, 'Le randonneur a parcouru 58,55 km.')],
    ['Une corde mesure 36,5 m. On en coupe 14,28 m. Quelle longueur reste-t-il ?',
      cm1Redac('Longueur restante', { pose: posee([[' ', '36,50'], ['−', '14,28'], [' ', '22,22']]) }, 'Il reste 22,22 m de corde.')],
    [`Calcule.${cm1Liste(['3,4 × 10', '0,7 × 10', '58 ÷ 10', '6,2 ÷ 10'])}`,
      cm1Redac('Multiplier et diviser par 10', { suite: ['3,4 × 10 = 34', '0,7 × 10 = 7', '58 ÷ 10 = 5,8', '6,2 ÷ 10 = 0,62'] }, 'Par 10, chaque chiffre glisse d\'un rang : vers la gauche pour multiplier, vers la droite pour diviser.')],
    ['Donne un ordre de grandeur de 19,8 + 30,15, puis calcule.',
      cm1Redac('Ordre de grandeur', '20 + 30 = 50', 'Le résultat doit être proche de 50.') + cm1Redac('Calcul exact', '19,8 + 30,15 = 49,95', '19,8 + 30,15 donne 49,95, très proche de 50 : c\'est plausible.')],
    ['Maïa mesure 1,38 m. Son frère mesure 0,25 m de plus. Quelle est la taille de son frère ?',
      cm1Redac('Taille du frère', '1,38 + 0,25 = 1,63', 'Le frère de Maïa mesure 1,63 m.')],
    ['Au marché, j\'achète des pommes pour 3,60 € et du fromage pour 5,85 €. Je paie avec un billet de 10 €. Combien me rend-on ?',
      cm1Redac('Dépense', ['3,60 + 5,85', '9,45'], 'Je dépense 9,45 €.') + cm1Redac('Monnaie rendue', { nom: 'B', lignes: ['10 − 9,45', '0,55'] }, 'On me rend 0,55 €.')],
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

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

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), C = plCase();
// Opération posée alignée sur la virgule ; res vide = à calculer.
function pd(lignes, res){
  const all = lignes.map(l => l[1]).concat(res ? [res] : []), sp = s => s.split(',');
  const I = Math.max(...all.map(s => sp(s)[0].length)), D = Math.max(...all.map(s => (sp(s)[1] || '').length));
  const al = s => { const [i, d] = sp(s); return i.padStart(I, ' ') + (D ? (d != null ? ',' + d.padEnd(D, ' ') : ' '.repeat(D + 1)) : ''); };
  const W = I + (D ? D + 1 : 0);
  return cm1Posee(lignes.map(([o, n]) => [o, al(n)]).concat([[' ', res ? al(res) : ' '.repeat(W)]]));
}
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const grille = () => cm1Quad(9, 6, [], { k: 17, largeur: 153 });
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
PLANCHES['cm1|Opérations sur les nombres décimaux'] = [
  { titre: 'Additionner et soustraire des nombres décimaux', duree: '35 min',
    attendus: ['Calculer en ligne avec des nombres décimaux', 'Poser une addition et une soustraction en alignant les virgules'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule en ligne.',
        eleve: plListe(['2,5 + 1,3 = ' + B(), '4,7 + 0,3 = ' + B(), '6,8 − 2,5 = ' + B(), '10 − 0,4 = ' + B()]),
        corr: plListe(['2,5 + 1,3 = ' + R('3,8'), '4,7 + 0,3 = ' + R(5), '6,8 − 2,5 = ' + R('4,3'), '10 − 0,4 = ' + R('9,6')]) },
      { etoiles: 1, col: 1, consigne: 'Complète pour arriver au nombre entier.',
        eleve: plListe(['0,6 + ' + B() + ' = 1', '2,3 + ' + B() + ' = 3', '0,25 + ' + B() + ' = 1', '4,9 + ' + B() + ' = 5']),
        corr: plListe(['0,6 + ' + R('0,4') + ' = 1', '2,3 + ' + R('0,7') + ' = 3', '0,25 + ' + R('0,75') + ' = 1', '4,9 + ' + R('0,1') + ' = 5']) },
      { etoiles: 2, col: 1, consigne: 'Calcule ces additions.',
        eleve: duo([pd([[' ', '12,5'], ['+', '3,75']]), pd([[' ', '8,07'], ['+', '14,6']])]),
        corr: duo([pd([[' ', '12,5'], ['+', '3,75']], '16,25'), pd([[' ', '8,07'], ['+', '14,6']], '22,67')]) },
      { etoiles: 2, col: 1, consigne: 'Calcule ces soustractions. Complète avec des zéros si besoin.',
        eleve: duo([pd([[' ', '15,8'], ['−', '6,35']]), pd([[' ', '20'], ['−', '7,4']])]),
        corr: duo([pd([[' ', '15,80'], ['−', '6,35']], '9,45'), pd([[' ', '20,0'], ['−', '7,4']], '12,6')]) },
      { etoiles: 2, consigne: 'Pose et calcule dans le quadrillage. Aligne bien les virgules.',
        eleve: duo(['<span style="text-align:center;">37,4 + 5,86<br>' + grille() + '</span>', '<span style="text-align:center;">52,3 − 18,75<br>' + grille() + '</span>', '<span style="text-align:center;">4,5 + 12,05 + 0,8<br>' + grille() + '</span>']),
        corr: duo([pd([[' ', '37,40'], ['+', '5,86']], '43,26'), pd([[' ', '52,30'], ['−', '18,75']], '33,55'), pd([[' ', '4,50'], ['+', '12,05'], ['+', '0,80']], '17,35')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Lina achète un livre à 12,50 € et un stylo à 3,75 €. Elle paie avec un billet de 20 €. Combien lui rend-on ?',
        corr: cm1Redac('Prix des achats', '12,50 € + 3,75 € = 16,25 €', 'Les achats coûtent 16,25 €.') + cm1Redac('Monnaie rendue', '20 € − 16,25 € = 3,75 €', 'On rend 3,75 € à Lina.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Tom a calculé : 8,5 + 3,9 = 47,5. Montre avec un ordre de grandeur qu\'il s\'est trompé, puis corrige.',
        corr: cm1Redac('Ordre de grandeur', '8 + 4 = 12', 'Le résultat doit être proche de 12, pas de 47,5 : Tom s\'est trompé.') + cm1Redac('Calcul exact', '8,5 + 3,9 = 12,4', 'Le bon résultat est 12,4.') },
    ] },
  { titre: 'Multiplier et diviser par 10, ordre de grandeur', duree: '30 min',
    attendus: ['Multiplier et diviser un nombre décimal par 10', 'Vérifier un calcul avec un ordre de grandeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Multiplie par 10 : chaque chiffre glisse d\'un rang vers la gauche.',
        eleve: plListe(['4,27 × 10 = ' + B(), '0,56 × 10 = ' + B(), '12,5 × 10 = ' + B(), '0,8 × 10 = ' + B()]),
        corr: plListe(['4,27 × 10 = ' + R('42,7'), '0,56 × 10 = ' + R('5,6'), '12,5 × 10 = ' + R(125), '0,8 × 10 = ' + R(8)]) },
      { etoiles: 1, col: 1, consigne: 'Divise par 10 : chaque chiffre glisse d\'un rang vers la droite.',
        eleve: plListe(['42,7 ÷ 10 = ' + B(), '3 ÷ 10 = ' + B(), '56 ÷ 10 = ' + B(), '0,9 ÷ 10 = ' + B()]),
        corr: plListe(['42,7 ÷ 10 = ' + R('4,27'), '3 ÷ 10 = ' + R('0,3'), '56 ÷ 10 = ' + R('5,6'), '0,9 ÷ 10 = ' + R('0,09')]) },
      { etoiles: 2, consigne: 'Complète le tableau.',
        eleve: tab(['Nombre', '2,4', '0,7', '15', '30,6'], [['× 10', B(3), B(3), B(3), B(3)], ['÷ 10', B(3), B(3), B(3), B(3)]]),
        corr: tab(['Nombre', '2,4', '0,7', '15', '30,6'], [['× 10', R(24), R(7), R(150), R(306)], ['÷ 10', R('0,24'), R('0,07'), R('1,5'), R('3,06')]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe([B(3) + ' × 10 = 35', B(3) + ' ÷ 10 = 0,7', '6,4 × ' + B(3) + ' = 64', '81 ÷ ' + B(3) + ' = 8,1']),
        corr: plListe([R('3,5') + ' × 10 = 35', R(7) + ' ÷ 10 = 0,7', '6,4 × ' + R(10) + ' = 64', '81 ÷ ' + R(10) + ' = 8,1']) },
      { etoiles: 2, col: 1, consigne: 'Sans calculer exactement, entoure l\'ordre de grandeur du résultat.',
        eleve: plListe(['19,8 + 30,4 : <b>5 · 50 · 500</b>', '99,5 − 48,9 : <b>5 · 50 · 150</b>', '7,1 + 2,95 : <b>1 · 10 · 100</b>', '201,3 − 0,9 : <b>2 · 20 · 200</b>']),
        corr: plListe([['19,8 + 30,4 : ', '50'], ['99,5 − 48,9 : ', '50'], ['7,1 + 2,95 : ', '10'], ['201,3 − 0,9 : ', '200']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un paquet de 10 cahiers coûte 18,50 €. Combien coûte un cahier ?',
        corr: cm1Redac('Prix d\'un cahier', '18,50 € ÷ 10 = 1,85 €', 'Un cahier coûte 1,85 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une ficelle mesure 2,5 m. Combien mesurent 10 ficelles mises bout à bout ? Écris le résultat en mètres, puis en centimètres.',
        corr: cm1Redac('Longueur de 10 ficelles', '2,5 m × 10 = 25 m', '10 ficelles mesurent 25 m.') + cm1Redac('En centimètres', '1 m = 100 cm, donc 25 m = 2 500 cm', '10 ficelles mesurent 2 500 cm.') },
    ] },
];
})();

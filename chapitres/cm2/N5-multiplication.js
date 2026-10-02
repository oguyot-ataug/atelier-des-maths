/* ============================================================
   CHAPITRE : Multiplication (CM2, N5, période 2)
   Programme du cycle 3 (CM2) : multiplication posée d'entiers ; poser et effectuer la
   multiplication d'un nombre décimal par un nombre entier ; multiplier un décimal par 10, 100,
   1 000 ; estimer le résultat ; distributivité dans des cas simples (calcul mental) ;
   multiplier des dizaines / centaines / milliers entre eux (30 × 400). La multiplication de deux
   décimaux est en 6e.
   ============================================================ */
(() => {
const Po = cm1Posee;
const U = t => `<b style="color:#E35D3A;">${t}</b>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Multiplication', slug: 'multiplication',
  cours: `
${cm1Lecon(1, 'Multiplier par 10, 100, 1 000')}
${cm1Regle('Multiplier par 10, 100 ou 1 000, c\'est rendre le nombre 10, 100 ou 1 000 fois plus grand : chaque chiffre glisse de <b>1, 2 ou 3 rangs vers la gauche</b>.')}
${cm1Exemple('Exemples (le chiffre des unités de départ est en rouge) :', [`${U('2')},75 × 10 = 27,5`, `${U('3')},46 × 100 = 346`, `${U('0')},8 × 1 000 = 800`, '45 × 100 = 4 500'])}
${cmAnimGlisseDec('c2-mu-glisse', { presets: [{ nom: '2,75 × 10', n: '2,75', f: 10, op: '×' }, { nom: '3,46 × 100', n: '3,46', f: 100, op: '×' }, { nom: '0,8 × 1 000', n: '0,8', f: 1000, op: '×' }, { nom: '45 × 100', n: '45', f: 100, op: '×' }] })}
${cm1Regle('On peut multiplier des dizaines, centaines ou milliers entre eux : 30 × 400 = 3 × 4 × 10 × 100 = 12 × 1 000 = <b>12 000</b>.', 'Astuce')}

${cm1Lecon(2, 'Poser une multiplication de nombres entiers')}
${cm1Regle('On multiplie le premier nombre par les unités, puis par les dizaines (on décale d\'un rang : on écrit un 0), puis on additionne les produits partiels.')}
<div class="figure-wrap">${Po([[' ', '247'], ['×', '36'], [' ', '1482', true], ['+', '7410'], [' ', '8892']])}</div>
${cm1Liste(['247 × 6 = 1 482', '247 × 30 = 7 410', '1 482 + 7 410 = 8 892', 'Estimation : 250 × 36 = 9 000, c\'est proche ✔'])}

${cm1Lecon(3, 'Multiplier un nombre décimal par un nombre entier')}
${cm1Regle('On effectue la multiplication <b>sans tenir compte de la virgule</b>, puis on place la virgule dans le résultat : il y a <b>autant de chiffres après la virgule</b> que dans le nombre décimal.')}
<div class="figure-wrap">${Po([[' ', '3,45'], ['×', '6'], [' ', '20,70']], ' 2 3 ')}</div>
${cm1Exemple('3,45 × 6 :', ['sans la virgule : 345 × 6 = 2 070 ;', '3,45 a 2 chiffres après la virgule, donc 3,45 × 6 = 20,70 = <b>20,7</b> ;', 'estimation : 3,5 × 6 = 21 ✔'])}
${cm1Astuce(`On peut aussi le voir avec des centièmes :${cm1Liste(['3,45 = 345 centièmes', '345 centièmes × 6 = 2 070 centièmes', '2 070 centièmes = 20,70'])}`)}

${cm1Lecon(4, 'Décomposer pour calculer mentalement')}
${cm1Exemple('On utilise la distributivité (sans la nommer) :', ['23 × 12 = 23 × 10 + 23 × 2 = 230 + 46 = <b>276</b>', '45 × 99 = 45 × 100 − 45 = 4 500 − 45 = <b>4 455</b>', '2,5 × 4 = 10', '1,5 × 6 = 9', '0,25 × 8 = 2'])}
`,
  methode: `
${cm1Sous('M', 'À toi : une opération posée, pas à pas')}
${cm1AnimOperation('cm2-op-mul', { a: '12,8', op: '×', b: '24', ops: ['×'], legende: 'Tape un nombre (entier ou décimal) et un entier de 3 chiffres au plus, puis « Calculer ». Les résultats intermédiaires apparaissent un par un.' })}
${cm1Demo('c2-mu-dec', 'Poser la multiplication d\'un décimal par un entier', 'Calcule 12,8 × 24.')}
${cm1Demo('c2-mu-pb', 'Résoudre un problème', 'Un croissant coûte 1,35 €. Combien coûtent 12 croissants ?')}
`,
  demos: [
    ['c2-mu-dec', [
      { expr: '12,8 × 24 ≈ 13 × 24 = 312', note: 'On estime l\'ordre de grandeur.' },
      { expr: '128 × 24', note: 'On multiplie sans la virgule.' },
      { expr: Po([[' ', '128'], ['×', '24'], [' ', '512', true], ['+', '2560'], [' ', '3072']]), note: '128 × 4 = 512 ; 128 × 20 = 2 560 ; total 3 072.' },
      { expr: '12,8 × 24 = 307,2', note: '12,8 a un chiffre après la virgule, donc le résultat aussi. 307,2 est proche de 312. ✔' },
    ]],
    ['c2-mu-pb', [
      { expr: '1,35 € × 12', note: '12 fois le même prix : c\'est une multiplication.' },
      { expr: '1,35 × 10 = 13,5 et 1,35 × 2 = 2,7', note: 'On décompose 12 = 10 + 2.' },
      { expr: '13,5 + 2,7 = 16,2', note: 'On additionne.' },
      { expr: '12 croissants coûtent 16,20 €.', note: 'En euros, on écrit souvent deux chiffres après la virgule.' },
    ]],
  ],
  exos: cm1Exos('c2mu', [
    [`Calcule.${cm1Liste(['4,7 × 10', '0,36 × 100', '5,2 × 1 000', '0,008 × 1 000'])}`,
      cm1Redac('Multiplier par 10, 100, 1 000', { suite: ['4,7 × 10 = 47', '0,36 × 100 = 36', '5,2 × 1 000 = 5 200', '0,008 × 1 000 = 8'] }, 'Chaque chiffre glisse de 1, 2 ou 3 rangs vers la gauche.')],
    [`Calcule mentalement.${cm1Liste(['20 × 300', '40 × 50', '600 × 7 000'])}`,
      cm1Redac('20 × 300', '2 × 3 × 1 000 = 6 000', '20 × 300 donne 6 000.') + cm1Redac('40 × 50', '4 × 5 × 100 = 2 000', '40 × 50 donne 2 000.') + cm1Redac('600 × 7 000', '6 × 7 × 100 000 = 4 200 000', '600 × 7 000 donne 4 200 000.')],
    [`Pose et calcule.${cm1Liste(['356 × 47', '1 208 × 305'])}`,
      cm1Redac('356 × 47', { pose: Po([[' ', '356'], ['×', '47'], [' ', '2492', true], ['+', '14240'], [' ', '16732']]) }, '356 × 47 donne 16 732.')
      + cm1Redac('1 208 × 305', { pose: Po([[' ', '1208'], ['×', '305'], [' ', '6040', true], ['+', '362400'], [' ', '368440']]) }, '1 208 × 305 donne 368 440 (le 0 des dizaines de 305 ne donne pas de ligne).')],
    [`Pose et calcule.${cm1Liste(['7,25 × 8', '16,4 × 35', '0,125 × 12'])}`,
      cm1Redac('7,25 × 8', { suite: ['sans la virgule : 725 × 8 = 5 800', 'deux chiffres après la virgule : 58,00'] }, '7,25 × 8 donne 58.')
      + cm1Redac('16,4 × 35', { pose: Po([[' ', '164'], ['×', '35'], [' ', '820', true], ['+', '4920'], [' ', '5740']]) }, 'Un chiffre après la virgule dans 16,4 : 16,4 × 35 = 574,0, c\'est-à-dire 574.')
      + cm1Redac('0,125 × 12', { suite: ['sans la virgule : 125 × 12 = 1 500', 'trois chiffres après la virgule : 1,500'] }, '0,125 × 12 donne 1,5.')],
    ['Estime 19,8 × 21, puis choisis le bon résultat : 41,58 ; 415,8 ; 4 158.',
      cm1Redac('Estimation', '20 × 21 = 420', 'Le bon résultat est le plus proche de 420 : c\'est 415,8.')],
    [`Calcule en décomposant.${cm1Liste(['34 × 11', '26 × 9', '15 × 12'])}`,
      cm1Redac('34 × 11', ['34 × 10 + 34', '340 + 34', '374'], '34 × 11 donne 374.')
      + cm1Redac('26 × 9', { nom: 'B', lignes: ['26 × 10 − 26', '260 − 26', '234'] }, '26 × 9 donne 234.')
      + cm1Redac('15 × 12', { nom: 'C', lignes: ['15 × 10 + 15 × 2', '150 + 30', '180'] }, '15 × 12 donne 180.')],
    ['Un tissu coûte 8,75 € le mètre. Combien coûtent 6 m ?',
      cm1Redac('Prix de 6 m', { pose: Po([[' ', '8,75'], ['×', '6'], [' ', '52,50']], ' 4 3 ') }, '6 m de tissu coûtent 52,50 €.')],
    ['Un camion transporte 28 caisses de 12,5 kg. Quelle masse transporte-t-il ?',
      cm1Redac('Masse transportée', { suite: ['sans la virgule : 125 × 28 = 3 500', 'un chiffre après la virgule : 350,0'] }, 'Le camion transporte 350 kg.')],
  ], { titre: 'Rédaction type : « Décimal × entier »', lignes: [['Estimation : 4 × 7 = 28', 'J\'arrondis 3,9 à 4.'], ['39 × 7 = 273', 'Je calcule sans la virgule.'], ['3,9 × 7 = 27,3', 'Un chiffre après la virgule, comme dans 3,9.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la multiplication « per gelosia »', [
    'Au Moyen Âge, les marchands italiens posaient les multiplications dans une grille en diagonale appelée <i>per gelosia</i>, parce qu\'elle ressemblait aux jalousies (volets à lamelles) des fenêtres.',
    'Le signe × a été inventé en 1631 par l\'Anglais <b>William Oughtred</b>. Avant, on écrivait les mots en toutes lettres !',
  ]),
  quiz: [
    { q: '2,6 × 100 = …', opts: ['2,600', '26', '260'], correct: 2 },
    { q: '1,5 × 4 = …', opts: ['4,20', '6', '60'], correct: 1 },
    { q: '30 × 200 = …', opts: ['600', '6 000', '60 000'], correct: 1 },
  ],
});
})();

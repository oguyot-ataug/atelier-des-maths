/* ============================================================
   CHAPITRE : Tables d'addition et de multiplication (CE2, N2, période 1)
   Programme du cycle 2 (CE2), calcul mental, « mémoriser des faits numériques » : tables
   d'addition et de multiplication dans les deux sens (égalités à trou), doubles et moitiés usuels,
   multiples de 25 (25, 50, 75, 100), décompositions multiplicatives de 60. Fin de CE2 : 15
   égalités d'addition en une minute, 12 de multiplication en une minute.
   ============================================================ */
(() => {
// Table de Pythagore 10 × 10, avec une ligne et une colonne surlignées.
function pythagore(li, co){
  const th = 'padding:3px 0;width:30px;background:#558B2F;color:#fff;font-family:\'Space Grotesk\',sans-serif;border:1px solid rgba(28,43,57,.25);';
  let h = `<div style="overflow-x:auto;"><table style="border-collapse:collapse;margin:6px auto;text-align:center;font-size:.9rem;"><tr><th style="${th}">×</th>${[1,2,3,4,5,6,7,8,9,10].map(j => `<th style="${th}">${j}</th>`).join('')}</tr>`;
  for(let i = 1; i <= 10; i++){
    h += `<tr><th style="${th}">${i}</th>`;
    for(let j = 1; j <= 10; j++){
      const on = i === li && j === co, l = i === li || j === co;
      h += `<td style="padding:3px 0;border:1px solid rgba(28,43,57,.15);${on ? 'background:#E35D3A;color:#fff;font-weight:700;' : l ? 'background:rgba(85,139,47,.13);' : ''}">${i * j}</td>`;
    }
    h += '</tr>';
  }
  return h + '</table></div>';
}
cm1Chapitre({
  niveau: 'ce2', titre: 'Tables d\'addition et de multiplication', slug: 'tables',
  cours: `
${cm1Lecon(1, 'Les tables d\'addition')}
${cm1Regle(`Connaître ses tables d'addition, c'est trouver <b>tout de suite</b> le résultat, dans les deux sens :${cm1Liste(['7 + 5 = 12', '7 + … = 12, le nombre manquant est 5', '12 − 7 = 5'])}`)}
${cm1Exemple('Les « égalités à trou » :', ['4 + … = 12 : le nombre manquant est 8.', '5 + 3 = … : le résultat est 8.', '10 = 7 + … : le nombre manquant est 3.'])}
${cm1Astuce(`Pour retenir :${cm1Liste(['les <b>doubles</b> : 6 + 6 = 12 ;', 'les <b>presque doubles</b> : 6 + 7, c\'est le double de 6 et encore 1, donc 13 ;', 'les <b>compléments à 10</b> : 7 + 3, 6 + 4, 8 + 2…'])}`)}

${cm1Lecon(2, 'Les tables de multiplication')}
${cm1Def('3 × 4, c\'est 3 fois 4 : 4 + 4 + 4 = 12. On peut aussi l\'écrire 4 × 3 : <b>l\'ordre ne change pas le résultat</b>.', 'Multiplier')}
${ce2AnimJetons('ce2-ta-jetons', { l: 3, c: 4 })}
${cm1Regle('Une table de multiplication, c\'est <b>compter de 7 en 7</b> (pour la table de 7), de 9 en 9 (pour la table de 9)…')}
${ce2AnimSauts('ce2-ta-sauts', { presets: [
  { nom: 'Table de 7', depart: 0, sauts: [[7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7'], [7, '+ 7']], min: 0, max: 45, fin: '6 sauts de 7 : 6 × 7 = 42.' },
  { nom: 'Table de 9', depart: 0, sauts: [[9, '+ 9'], [9, '+ 9'], [9, '+ 9'], [9, '+ 9'], [9, '+ 9']], min: 0, max: 50, fin: '5 sauts de 9 : 5 × 9 = 45.' },
  { nom: 'Table de 25', depart: 0, sauts: [[25, '+ 25'], [25, '+ 25'], [25, '+ 25'], [25, '+ 25']], min: 0, max: 110, fin: '4 sauts de 25 : 4 × 25 = 100.' }] })}
<div class="figure-wrap">${pythagore(7, 6)}<p class="hint" style="margin:4px 0 0;">La table de Pythagore : à la ligne 7 et à la colonne 6, on lit <b>7 × 6 = 42</b>.</p></div>
${cm1Exemple('Égalités à trou :', ['7 × … = 42 : le nombre manquant est 6, car 7 × 6 = 42.', '9 × 6 = … : le résultat est 54.', '70 = 7 × … : le nombre manquant est 10.'])}
${cm1Astuce(`Quelques repères :${cm1Liste(['× 2, c\'est le double ;', '× 5 : le résultat finit par 0 ou par 5 ;', '× 10 : on écrit un 0 à droite ;', '× 9 : 9 × 6, c\'est 10 × 6 moins 6, donc 54.'])}`)}

${cm1Lecon(3, 'Doubles, moitiés et nombres à connaître')}
${cm1Tableau(['Nombre', '15', '25', '45', '150', '250'], [['Double', '30', '50', '90', '300', '500']])}
${cm1Tableau(['Nombre', '30', '50', '90', '300', '1 000'], [['Moitié', '15', '25', '45', '150', '500']])}
${cm1Regle(`Les multiples de 25 :${cm1Liste(['25 × 1 = 25', '25 × 2 = 50', '25 × 3 = 75', '25 × 4 = 100'])}`)}
${cm1Regle(`Les façons de faire <b>60</b> avec une multiplication :${cm1Liste(['1 × 60', '2 × 30', '3 × 20', '4 × 15', '5 × 12', '6 × 10'])}`)}
`,
  methode: `
${cm1Demo('ce2-ta-trou', 'Compléter une égalité à trou', 'Complète : 8 × … = 56.')}
${cm1Demo('ce2-ta-oubli', 'Retrouver un résultat oublié', 'Je ne me souviens plus de 7 × 8. Comment le retrouver ?')}
`,
  demos: [
    ['ce2-ta-trou', [
      { expr: '8 × … = 56', note: 'On cherche combien de fois 8 il faut pour faire 56.' },
      { expr: '8 × 5 = 40', note: 'On récite la table de 8…' },
      { expr: '8 × 6 = 48', note: '… jusqu\'à trouver 56.' },
      { expr: '8 × 7 = 56', note: 'Le nombre manquant est <b>7</b>.' },
    ]],
    ['ce2-ta-oubli', [
      { expr: '7 × 8 = 8 × 7', note: 'L\'ordre ne compte pas : je peux chercher dans la table de 7 ou de 8.' },
      { expr: '7 × 4 = 28', note: 'Je connais 7 × 4.' },
      { expr: '7 × 8 = 28 + 28', note: '8, c\'est le double de 4 : je double 28.' },
      { expr: '7 × 8 = 56', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-ta', [
    ['Léo a 9 billes. Combien lui en faut-il encore pour en avoir 15 ?',
      cm1Redac('Billes qui manquent', '9 + 6 = 15', 'Il manque 6 billes à Léo.')],
    [`Complète ces égalités à trou.${cm1Liste(['6 × … = 36', '… × 4 = 28', '63 = 9 × …'])}`,
      cm1Redac('Première égalité', '6 × 6 = 36', 'Le nombre manquant est 6.')
      + cm1Redac('Deuxième égalité', '7 × 4 = 28', 'Le nombre manquant est 7.')
      + cm1Redac('Troisième égalité', '63 = 9 × 7', 'Le nombre manquant est 7.')],
    ['Une boîte contient 6 œufs. Combien y a-t-il d\'œufs dans 7 boîtes ?',
      cm1Redac('Nombre d\'œufs', '7 × 6 = 42', 'Il y a 42 œufs dans 7 boîtes.')],
    ['Tom a 35 images. Sa sœur en a le double. Combien d\'images a sa sœur ?',
      cm1Redac('Images de la sœur', '35 + 35 = 70', 'La sœur de Tom a 70 images.')],
    ['On partage 600 g de cerises en deux parts égales. Combien pèse chaque part ?',
      cm1Redac('Masse d\'une part', '300 + 300 = 600', 'La moitié de 600 g est 300 g : chaque part pèse 300 g.')],
    ['Un billet de manège coûte 25 €. Combien coûtent 3 billets ? Et 4 billets ?',
      cm1Redac('Prix de 3 billets', '25 × 3 = 75', '3 billets coûtent 75 €.') + cm1Redac('Prix de 4 billets', '25 × 4 = 100', '4 billets coûtent 100 €.')],
    ['60 élèves se mettent en rangées toutes pareilles. Trouve trois façons de les ranger.',
      cm1Redac('Rangements possibles', { suite: ['2 × 30 = 60', '3 × 20 = 60', '6 × 10 = 60'] }, 'On peut faire 2 rangées de 30, 3 rangées de 20 ou 6 rangées de 10 (ou encore 4 rangées de 15, 5 rangées de 12).')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la table de Pythagore', [
    'La table de multiplication en carré porte le nom de <b>Pythagore</b>, un savant grec qui vivait il y a environ 2 500 ans. En réalité, on ne sait pas s\'il l\'a inventée : des tables de multiplication existaient déjà avant lui, gravées sur des tablettes d\'argile à Babylone !',
  ]),
  quiz: [
    { q: '7 × 6 = …', opts: ['42', '36', '48'], correct: 0 },
    { q: '9 + … = 17', opts: ['7', '8', '9'], correct: 1 },
    { q: 'La moitié de 50 est…', opts: ['20', '25', '100'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '8 + 7 = …', r: ['14', '15', '16', '13'], ok: 1 },
    { l: 1, q: '6 + … = 13', r: ['6', '7', '8', '9'], ok: 1 },
    { l: 2, q: '7 × 8 = …', r: ['54', '56', '63', '48'], ok: 1 },
    { l: 2, q: '6 × … = 54', r: ['8', '7', '9', '6'], ok: 2 },
    { l: 3, q: 'Le double de 35 est…', r: ['60', '65', '70', '75'], ok: 2 },
    { l: 3, q: 'La moitié de 300 est…', r: ['100', '150', '200', '600'], ok: 1 },
    { l: 3, q: '25 × 4 = …', r: ['75', '80', '100', '125'], ok: 2 },
    { l: 2, q: '60 = 4 × …', r: ['12', '15', '20', '16'], ok: 1 },
    { l: 1, q: "9 + 6 = …", r: ["14", "15", "16", "13"], ok: 1 },
  ],
});
})();

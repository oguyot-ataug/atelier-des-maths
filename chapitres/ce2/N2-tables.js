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
${cm1Regle('Connaître ses tables d\'addition, c\'est trouver <b>tout de suite</b> : 7 + 5 = 12, mais aussi 7 + … = 12 (réponse : 5) et 12 − 7 = 5.')}
${cm1Exemple('Les « égalités à trou » :', ['4 + … = 12 → 8', '5 + 3 = … → 8', '10 = 7 + … → 3'])}
${cm1Astuce('Pour retenir : les <b>doubles</b> (6 + 6 = 12), les <b>presque doubles</b> (6 + 7 = 12 + 1 = 13) et les <b>compléments à 10</b> (7 + 3, 6 + 4, 8 + 2…).')}

${cm1Lecon(2, 'Les tables de multiplication')}
${cm1Def('3 × 4, c\'est 3 fois 4 : 4 + 4 + 4 = 12. On peut aussi l\'écrire 4 × 3 : <b>l\'ordre ne change pas le résultat</b>.', 'Multiplier')}
<div class="figure-wrap">${pythagore(7, 6)}<p class="hint" style="margin:4px 0 0;">La table de Pythagore : à la ligne 7 et à la colonne 6, on lit <b>7 × 6 = 42</b>.</p></div>
${cm1Exemple('Égalités à trou :', ['7 × … = 42 → 6 (car 7 × 6 = 42)', '9 × 6 = … → 54', '70 = 7 × … → 10'])}
${cm1Astuce('Quelques repères : × 2, c\'est le double ; × 5, le résultat finit par 0 ou 5 ; × 10, on ajoute un 0 ; × 9 : 9 × 6 = 60 − 6 = 54.')}

${cm1Lecon(3, 'Doubles, moitiés et nombres à connaître')}
${cm1Tableau(['Doubles', 'Moitiés'], [
  ['double de 15 = 30 · double de 25 = 50 · double de 45 = 90', 'moitié de 30 = 15 · moitié de 50 = 25 · moitié de 90 = 45'],
  ['double de 150 = 300 · double de 250 = 500', 'moitié de 300 = 150 · moitié de 1 000 = 500'],
])}
${cm1Regle('<b>25 × 1 = 25 · 25 × 2 = 50 · 25 × 3 = 75 · 25 × 4 = 100</b><br>Les façons de faire <b>60</b> : 1 × 60 = 2 × 30 = 3 × 20 = 4 × 15 = 5 × 12 = 6 × 10.')}
`,
  methode: `
${cm1Demo('ce2-ta-trou', 'Compléter une égalité à trou', 'Complète : 8 × … = 56.')}
${cm1Demo('ce2-ta-oubli', 'Retrouver un résultat oublié', 'Je ne me souviens plus de 7 × 8. Comment le retrouver ?')}
`,
  demos: [
    ['ce2-ta-trou', [
      { expr: '8 × … = 56', note: 'On cherche combien de fois 8 il faut pour faire 56.' },
      { expr: '8 × 5 = 40 ; 8 × 6 = 48 ; 8 × 7 = 56', note: 'On récite la table de 8 jusqu\'à trouver 56.' },
      { expr: '8 × 7 = 56', note: 'Le nombre manquant est <b>7</b>.' },
    ]],
    ['ce2-ta-oubli', [
      { expr: '7 × 8 = 8 × 7', note: 'L\'ordre ne compte pas : je peux chercher dans la table de 7 ou de 8.' },
      { expr: '7 × 4 = 28', note: 'Je connais 7 × 4 (le double du double de 7).' },
      { expr: '7 × 8 = 2 × 28 = 56', note: '8, c\'est le double de 4 : je double 28.' },
    ]],
  ],
  exos: cm1Exos('ce2-ta', [
    ['Complète : 9 + … = 15 · … + 6 = 13 · 14 = 8 + …', '6 · 7 · 6.'],
    ['Complète : 6 × … = 36 · … × 4 = 28 · 63 = 9 × …', '6 · 7 · 7.'],
    ['Donne le double de : 18 · 35 · 200.', '36 · 70 · 400.'],
    ['Donne la moitié de : 24 · 70 · 600.', '12 · 35 · 300.'],
    ['Combien font 25 × 3 ? et 4 × 25 ?', '75 et 100.'],
    ['Trouve trois façons d\'écrire 60 comme une multiplication.', 'Par exemple 2 × 30, 3 × 20, 6 × 10 (ou 4 × 15, 5 × 12).'],
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
    { q: '8 + 7 = …', r: ['14', '15', '16', '13'], ok: 1 },
    { q: '6 + … = 13', r: ['6', '7', '8', '9'], ok: 1 },
    { q: '7 × 8 = …', r: ['54', '56', '63', '48'], ok: 1 },
    { q: '6 × … = 54', r: ['8', '7', '9', '6'], ok: 2 },
    { q: 'Le double de 35 est…', r: ['60', '65', '70', '75'], ok: 2 },
    { q: 'La moitié de 300 est…', r: ['100', '150', '200', '600'], ok: 1 },
    { q: '25 × 4 = …', r: ['75', '80', '100', '125'], ok: 2 },
    { q: '60 = 4 × …', r: ['12', '15', '20', '16'], ok: 1 },
  ],
});
})();

/* ============================================================
   CHAPITRE : La monnaie (CE2, M1, période 1)
   Programme du cycle 2 (CE2) : la monnaie, point d'appui pour l'écriture à virgule (sans les mots
   dixième / centième) ; la virgule repère le chiffre des unités (des euros) ; « deux euros et cinq
   centimes » 2,05 € ≠ « deux euros cinquante » 2,50 € ; constituer une somme, rendre la monnaie
   par ajouts successifs ; additions posées de montants (période 2) puis soustractions (période 4,
   voir le chapitre « Problèmes en plusieurs étapes »).
   ============================================================ */
(() => {
const piece = (v, c, r) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:${r}px;height:${r}px;border-radius:50%;background:${c};border:2px solid rgba(0,0,0,.25);font:700 ${r > 40 ? 13 : 11}px 'Space Grotesk',sans-serif;color:#3B2B05;margin:3px;">${v}</span>`;
const billet = (v, c) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:74px;height:40px;border-radius:5px;background:${c};border:2px solid rgba(0,0,0,.2);font:700 14px 'Space Grotesk',sans-serif;color:#fff;margin:3px;">${v} €</span>`;
const OR = '#E9C46A', CUIVRE = '#D08C60';
cm1Chapitre({
  niveau: 'ce2', titre: 'La monnaie', slug: 'monnaie',
  cours: `
${cm1Lecon(1, 'Euros et centimes')}
${cm1Regle('<b>1 euro = 100 centimes</b>. On écrit 1 € = 100 c.')}
<div class="figure-wrap" style="text-align:center;">${piece('1 c', CUIVRE, 30)}${piece('2 c', CUIVRE, 33)}${piece('5 c', CUIVRE, 36)}${piece('10 c', OR, 34)}${piece('20 c', OR, 38)}${piece('50 c', OR, 42)}${piece('1 €', '#C9CBCF', 42)}${piece('2 €', '#E2C36B', 46)}<br>${billet(5, '#8E9AA8')}${billet(10, '#C0645A')}${billet(20, '#4F7CC0')}${billet(50, '#E08A3C')}</div>
${cm1Rem(`Les échanges :${cm1Liste(['dix pièces de 1 € valent 10 € ;', 'dix billets de 10 € valent 100 € ;', 'dix pièces de 10 centimes valent 1 €.'])}`)}

${cm1Lecon(2, 'Écrire un prix avec une virgule')}
${cm1Regle('Dans un prix, <b>la virgule se place juste après le chiffre des euros</b>. Après la virgule, il y a toujours <b>deux chiffres</b> : ce sont les centimes.')}
${cm1Tableau(['On dit', 'On écrit'], [
  ['trois euros et quarante-cinq centimes', '<b>3,45 €</b>'],
  ['deux euros et <b>cinq</b> centimes', '<b>2,05 €</b>'],
  ['deux euros et <b>cinquante</b> centimes', '<b>2,50 €</b>'],
  ['douze euros', '<b>12 €</b> ou 12,00 €'],
])}
${cm1Astuce('Attention à ne pas confondre <b>2,05 €</b> (deux euros et cinq centimes) et <b>2,50 €</b> (deux euros et cinquante centimes) !')}

${cm1Lecon(3, 'Additionner des prix')}
${cm1Regle('Pour poser une addition de prix, on aligne <b>les virgules les unes sous les autres</b>. On calcule comme d\'habitude et on place la virgule du résultat sous les autres.')}
<div class="figure-wrap">${cm1Posee([[' ', '4,56'], ['+', '15,30'], [' ', '19,86']])}</div>
${cm1Rem('Pour ajouter un prix « rond » comme 68 €, on peut l\'écrire 68,00 € pour bien aligner les virgules.')}

${cm1Lecon(4, 'Rendre la monnaie')}
${cm1Regle('Pour rendre la monnaie, on <b>complète</b> le prix jusqu\'à la somme donnée, par petits ajouts.')}
${ce2AnimSauts('ce2-mo-rendre-anim', { legende: 'On avance du prix jusqu\'à la somme donnée : les sauts, c\'est la monnaie qu\'on rend.', presets: [
  { nom: '3,68 € payé avec 5 €', depart: 368, sauts: [[32, '+ 32 c', 'De 3,68 € à 4 € : 32 centimes, car 68 + 32 = 100.'], [100, '+ 1 €', 'De 4 € à 5 € : 1 €.']], min: 340, max: 520, fmt: ce2Euros, fin: 'On rend 1 € et 32 centimes : <b>1,32 €</b>.' },
  { nom: '7,40 € payé avec 10 €', depart: 740, sauts: [[60, '+ 60 c', 'De 7,40 € à 8 € : 60 centimes, car 40 + 60 = 100.'], [200, '+ 2 €', 'De 8 € à 10 € : 2 €.']], min: 700, max: 1040, fmt: ce2Euros, fin: 'On rend 2 € et 60 centimes : <b>2,60 €</b>.' }] })}
`,
  methode: `
${cm1Demo('ce2-mo-rendre', 'Rendre la monnaie', 'Léa achète un livre à 7,40 €. Elle paie avec un billet de 10 €. Combien lui rend-on ?')}
${cm1Demo('ce2-mo-payer', 'Payer une somme avec le moins de pièces possible', 'Comment payer 8,75 € avec le moins de pièces et de billets possible ?')}
`,
  demos: [
    ['ce2-mo-rendre', [
      { expr: '7,40 € → 8 € : + 60 centimes', note: '40 + 60 = 100 centimes, c\'est 1 €.' },
      { expr: '8 € → 10 € : + 2 €', note: 'On arrive à la somme donnée.' },
      { expr: 'On rend 2 € et 60 centimes : 2,60 €.', note: '' },
      { expr: '7,40 € + 2,60 € = 10 € ✔', note: 'On vérifie avec une addition.' },
    ]],
    ['ce2-mo-payer', [
      { expr: '8,75 € = 8 € + 75 centimes', note: 'On s\'occupe d\'abord des euros, puis des centimes.' },
      { expr: '8 € = 5 € + 2 € + 1 €', note: 'Un billet de 5 €, une pièce de 2 €, une pièce de 1 €.' },
      { expr: '75 c = 50 c + 20 c + 5 c', note: 'Trois pièces.' },
      { expr: 'On donne 6 billets et pièces en tout.', note: 'On ne peut pas en donner moins.' },
    ]],
  ],
  exos: cm1Exos('ce2-mo', [
    [`Écris ces prix en chiffres.${cm1Liste(['six euros et trente centimes', 'six euros et trois centimes'])}`,
      cm1Redac('Six euros et trente centimes', '6 euros et 30 centimes', 'Ce prix s\'écrit 6,30 €.')
      + cm1Redac('Six euros et trois centimes', '6 euros et 03 centimes', 'Ce prix s\'écrit 6,03 € : il faut deux chiffres après la virgule.')],
    ['Ines a 4 € dans sa tirelire. Combien cela fait-il de centimes ? Et pour 2,50 € ?',
      cm1Redac('4 € en centimes', '4 × 100 = 400', '4 € font 400 centimes.')
      + cm1Redac('2,50 € en centimes', '200 + 50 = 250', '2,50 € font 250 centimes.')],
    ['Un livre coûte 12,45 € et un cahier 8,30 €. Combien coûtent-ils ensemble ?',
      cm1Redac('Prix total', { pose: cm1Posee([[' ', '12,45'], ['+', '8,30'], [' ', '20,75']], '1    ') }, 'Le livre et le cahier coûtent 20,75 € ensemble.')],
    ['Maman achète une veste à 43,45 € et des chaussures à 68 €. Combien dépense-t-elle ?',
      cm1Redac('Dépense de maman', { pose: cm1Posee([[' ', '43,45'], ['+', '68,00'], [' ', '111,45']], '11    ') }, 'Maman dépense 111,45 €.')],
    ['Un cahier coûte 2,85 €. Tu paies avec un billet de 5 €. Combien la marchande te rend-elle ?',
      cm1Redac('Monnaie rendue', { suite: ['De 2,85 € à 3 € : 15 centimes', 'De 3 € à 5 € : 2 €'] }, 'La marchande me rend 2 € et 15 centimes, c\'est-à-dire 2,15 €.')],
    ['Avec quelles pièces peux-tu payer exactement 1,35 € ?',
      cm1Redac('Pièces pour 1,35 €', '1 € + 20 c + 10 c + 5 c = 1,35 €', 'Je peux payer avec une pièce de 1 €, une de 20 c, une de 10 c et une de 5 c.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : l\'euro', [
    'Les pièces et les billets en <b>euros</b> sont arrivés dans les porte-monnaie le <b>1<sup>er</sup> janvier 2002</b>. Avant, en France, on payait en <b>francs</b>. Aujourd\'hui, une vingtaine de pays d\'Europe utilisent l\'euro : chaque pays a dessiné le côté « face » de ses pièces.',
  ]),
  quiz: [
    { q: 'Deux euros et cinq centimes s\'écrit…', opts: ['2,5 €', '2,05 €', '2,50 €'], correct: 1 },
    { q: '1 € = …', opts: ['10 centimes', '100 centimes', '1 000 centimes'], correct: 1 },
    { q: 'Un objet coûte 3,60 €. On paie avec 5 €. On rend…', opts: ['1,40 €', '2,40 €', '1,60 €'], correct: 0 },
  ],
  flash: [
    { q: 'Quatre euros et sept centimes s\'écrit…', r: ['4,7 €', '4,70 €', '4,07 €', '47 €'], ok: 2 },
    { q: 'Combien de centimes dans 3 € ?', r: ['3', '30', '300', '3 000'], ok: 2 },
    { q: '2,50 € + 1,50 € = …', r: ['3 €', '3,50 €', '4 €', '4,50 €'], ok: 2 },
    { q: 'Un achat de 6,20 € payé avec 10 €. On rend…', r: ['3,80 €', '4,80 €', '3,20 €', '4,20 €'], ok: 0 },
    { q: 'Combien de pièces de 20 c pour faire 1 € ?', r: ['2', '4', '5', '10'], ok: 2 },
    { q: 'Quel prix est le plus grand ?', r: ['5,09 €', '5,90 €', '5,19 €', '5,15 €'], ok: 1 },
  ],
});
})();

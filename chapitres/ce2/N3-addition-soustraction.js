/* ============================================================
   CHAPITRE : Addition et soustraction posées (CE2, N3, période 1)
   Programme du cycle 2 (CE2) : mots « terme », « somme », « différence » ; additions et
   soustractions posées en colonnes avec des entiers jusqu'à 10 000 ; privilégier le calcul mental
   quand il est possible. Soustraction posée par compensation (« +10 » en haut, « 1+ » en bas),
   comme au CM1 du site.
   ============================================================ */
cm1Chapitre({
  niveau: 'ce2', titre: 'Addition et soustraction posées', slug: 'addition-soustraction',
  cours: `
${cm1Lecon(1, 'Les mots de l\'addition et de la soustraction')}
${cm1Def(`<ul style="margin:0;padding-left:20px;line-height:1.8;"><li>Dans <b>12 + 25 = 37</b> : 12 et 25 sont les <b>termes</b>, 37 est la <b>somme</b>. « La somme de 12 et de 25 est 37. »</li><li>Dans <b>60 − 37 = 23</b> : 60 et 37 sont les <b>termes</b>, 23 est la <b>différence</b>. « La différence entre 60 et 37 est 23. »</li></ul>`, 'Vocabulaire')}

${cm1Lecon(2, 'Poser une addition')}
${cm1Regle('On écrit les nombres <b>les uns sous les autres</b> : unités sous les unités, dizaines sous les dizaines… On calcule en commençant par <b>la colonne des unités</b>, à droite. Quand une colonne dépasse 9, on écrit le chiffre des unités et on <b>retient</b> la dizaine dans la colonne suivante.')}
<div class="figure-wrap">${cm1Posee([[' ', '2 476'], ['+', '1 358'], [' ', '3 834']], '  11 ')}
${cm1Liste(['Unités : 6 + 8 = 14. J\'écris 4, je retiens 1.', 'Dizaines : 1 + 7 + 5 = 13. J\'écris 3, je retiens 1.', 'Centaines : 1 + 4 + 3 = 8. J\'écris 8.', 'Milliers : 2 + 1 = 3. J\'écris 3.'])}</div>
${cm1AnimOperation('ce2-op-add', { a: '2476', op: '+', b: '1358', ops: ['+'], legende: 'Tape tes propres nombres (jusqu\'à 10 000), puis « Calculer » : l\'addition se déroule colonne par colonne.' })}

${cm1Lecon(3, 'Poser une soustraction')}
${cm1Regle('On écrit <b>le plus grand nombre en haut</b>. On calcule colonne par colonne, de droite à gauche. Quand le chiffre du haut est trop petit, on ajoute <b>10 en haut</b> et on ajoute <b>1 en bas, dans la colonne suivante</b> : la différence ne change pas.')}
${cm1AnimOperation('ce2-op-as', { a: '623', op: '−', b: '148', ops: ['−', '+'], legende: 'Tape tes propres nombres (jusqu\'à 10 000), puis « Calculer » : le calcul se déroule colonne par colonne.' })}
${cm1Astuce('Pour vérifier une soustraction, on fait une addition : 475 + 148 doit redonner 623.')}

${cm1Lecon(4, 'Calculer de tête quand c\'est facile')}
${cm1Regle(`On ne pose pas toujours l'opération ! Ces calculs se font de tête :${cm1Liste(['2 500 + 1 500 = 4 000', '3 000 − 1 = 2 999', '4 990 + 10 = 5 000'])}On pose quand les nombres sont « difficiles ».`)}
${ce2AnimSauts('ce2-as-tete', { presets: [
  { nom: '2 500 + 1 500', depart: 2500, sauts: [[500, '+ 500'], [1000, '+ 1 000']], min: 2000, max: 4500, fin: 'J\'ajoute 500 pour arriver au millier, puis encore 1 000 : 2 500 + 1 500 = 4 000.' },
  { nom: '3 000 − 1', depart: 3000, sauts: [[-1, '− 1']], min: 2990, max: 3005, fin: 'Un pas en arrière : 3 000 − 1 = 2 999.' }] })}
`,
  methode: `
${cm1Demo('ce2-as-pb', 'Résoudre un problème avec une soustraction', 'Une école a 1 250 livres. Elle en prête 387. Combien en reste-t-il à la bibliothèque ?')}
`,
  demos: [
    ['ce2-as-pb', [
      { expr: 'Il reste : 1 250 − 387', note: 'On enlève les livres prêtés : c\'est une soustraction.' },
      { expr: cm1Posee([[' ', '1 250'], ['−', '387'], [' ', '863']]), note: 'On pose : le plus grand nombre en haut, unités sous unités.' },
      { expr: '863 + 387 = 1 250 ✔', note: 'On vérifie : l\'addition redonne le nombre de départ.' },
      { expr: 'Il reste 863 livres.', note: 'On répond par une phrase.' },
    ]],
  ],
  exos: cm1Exos('ce2-as', [
    ['Au zoo, 3 547 visiteurs sont venus samedi et 2 685 dimanche. Combien de visiteurs sont venus pendant le week-end ?',
      cm1Redac('Nombre de visiteurs', { pose: cm1Posee([[' ', '3 547'], ['+', '2 685'], [' ', '6 232']], '1 11 ') }, '6 232 visiteurs sont venus pendant le week-end.')],
    ['Un fermier a 5 000 € dans sa caisse. Il achète un tracteur d\'occasion à 1 368 €. Combien d\'argent lui reste-t-il ?',
      cm1Redac('Argent restant', { pose: cm1Posee([[' ', '5 000'], ['−', '1 368'], [' ', '3 632']]) }, 'Il reste 3 632 € au fermier.')],
    ['Quelle est la somme de 1 205 et de 798 ?',
      cm1Redac('Somme de 1 205 et de 798', { pose: cm1Posee([[' ', '1 205'], ['+', '798'], [' ', '2 003']], '1 11 ') }, 'La somme de 1 205 et de 798 est 2 003.')],
    ['Quelle est la différence entre 4 200 et 1 750 ?',
      cm1Redac('Différence entre 4 200 et 1 750', { pose: cm1Posee([[' ', '4 200'], ['−', '1 750'], [' ', '2 450']]) }, 'La différence entre 4 200 et 1 750 est 2 450.')],
    [`Calcule de tête.${cm1Liste(['3 400 + 600', '7 000 − 2 000', '5 999 + 1'])}`,
      cm1Redac('Calculs de tête', { suite: ['3 400 + 600 = 4 000', '7 000 − 2 000 = 5 000', '5 999 + 1 = 6 000'] }, 'Ces trois calculs donnent des milliers « ronds » : on n\'a pas besoin de les poser.')],
    ['Léo a 2 350 points à un jeu. Il en gagne 875. Combien de points a-t-il maintenant ?',
      cm1Redac('Points de Léo', { pose: cm1Posee([[' ', '2 350'], ['+', '875'], [' ', '3 225']], '1 1  ') }, 'Léo a maintenant 3 225 points.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les signes + et −', [
    'Les signes <b>+</b> et <b>−</b> sont assez récents : ils apparaissent dans un livre de calcul allemand en <b>1489</b>. Avant, on écrivait les mots en entier, ou des abréviations comme « p » pour <i>plus</i> et « m » pour <i>minus</i> (moins).',
  ]),
  quiz: [
    { q: 'Dans 45 + 12 = 57, le nombre 57 est…', opts: ['un terme', 'la somme', 'la différence'], correct: 1 },
    { q: '1 000 − 1 = …', opts: ['900', '999', '990'], correct: 1 },
    { q: 'Pour vérifier 623 − 148 = 475, on calcule…', opts: ['475 + 148', '623 + 148', '475 − 148'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Dans 60 − 37 = 23, le nombre 23 est…', r: ['un terme', 'la somme', 'la différence', 'le produit'], ok: 2 },
    { l: 4, q: '2 500 + 1 500 = …', r: ['3 500', '4 000', '3 000', '4 500'], ok: 1 },
    { l: 4, q: '3 000 − 1 = …', r: ['2 000', '2 900', '2 999', '2 990'], ok: 2 },
    { l: 2, q: '476 + 358 = …', r: ['724', '834', '824', '734'], ok: 1 },
    { l: 3, q: 'Quel calcul vérifie 900 − 350 = 550 ?', r: ['550 + 350', '900 + 350', '550 − 350', '900 + 550'], ok: 0 },
    { l: 2, q: 'Dans une addition posée, on commence par…', r: ['les milliers', 'les centaines', 'les unités', 'n\'importe quelle colonne'], ok: 2 },
    { l: 1, q: "Le résultat d'une addition s'appelle…", r: ["la somme", "la différence", "le produit", "le terme"], ok: 0 },
    { l: 3, q: "702 − 245 = …", r: ["457", "543", "467", "547"], ok: 0 },
  ],
});

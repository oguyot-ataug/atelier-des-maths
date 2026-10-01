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
<div class="figure-wrap">${cm1Posee([[' ', '2 476'], ['+', '1 358'], [' ', '3 834']], '  11 ')}<p class="hint" style="margin:4px 0 0;">6 + 8 = 14 : j'écris 4, je retiens 1 · 1 + 7 + 5 = 13 : j'écris 3, je retiens 1 · 1 + 4 + 3 = 8 · 2 + 1 = 3.</p></div>

${cm1Lecon(3, 'Poser une soustraction')}
${cm1Regle('On écrit <b>le plus grand nombre en haut</b>. On calcule colonne par colonne, de droite à gauche. Quand le chiffre du haut est trop petit, on ajoute <b>10 en haut</b> et on ajoute <b>1 en bas, dans la colonne suivante</b> : la différence ne change pas.')}
${cm1AnimOperation('ce2-op-as', { a: '623', op: '−', b: '148', ops: ['+', '−'], legende: 'Tape tes propres nombres (jusqu\'à 10 000), choisis + ou −, puis « Calculer » : le calcul se déroule colonne par colonne.' })}
${cm1Astuce('Pour vérifier une soustraction, on fait une addition : 475 + 148 doit redonner 623.')}

${cm1Lecon(4, 'Calculer de tête quand c\'est facile')}
${cm1Rem('On ne pose pas toujours l\'opération ! 2 500 + 1 500 = 4 000 ou 3 000 − 1 = 2 999 se calculent de tête. On pose quand les nombres sont « difficiles ».')}
`,
  methode: `
${cm1Demo('ce2-as-pb', 'Résoudre un problème avec une soustraction', 'Une école a 1 250 livres. Elle en prête 387. Combien en reste-t-il à la bibliothèque ?')}
`,
  demos: [
    ['ce2-as-pb', [
      { expr: 'Il reste : 1 250 − 387', note: 'On enlève les livres prêtés : c\'est une soustraction.' },
      { expr: cm1Posee([[' ', '1 250'], ['−', '387'], [' ', '863']]), note: 'On pose : le plus grand nombre en haut, unités sous unités.' },
      { expr: 'Vérification : 863 + 387 = 1 250 ✔', note: 'L\'addition redonne le nombre de départ.' },
      { expr: 'Il reste 863 livres.', note: 'On répond par une phrase.' },
    ]],
  ],
  exos: cm1Exos('ce2-as', [
    ['Pose et calcule : 3 547 + 2 685.', '6 232.'],
    ['Pose et calcule : 5 000 − 1 368.', '3 632.'],
    ['Quelle est la somme de 1 205 et de 798 ?', '2 003.'],
    ['Quelle est la différence entre 4 200 et 1 750 ?', '2 450.'],
    ['Calcule de tête : 3 400 + 600 · 7 000 − 2 000 · 5 999 + 1.', '4 000 · 5 000 · 6 000.'],
    ['Léo a 2 350 points au jeu. Il en gagne 875. Combien en a-t-il maintenant ?', '2 350 + 875 = 3 225 points.'],
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
    { q: 'Dans 60 − 37 = 23, le nombre 23 est…', r: ['un terme', 'la somme', 'la différence', 'le produit'], ok: 2 },
    { q: '2 500 + 1 500 = …', r: ['3 500', '4 000', '3 000', '4 500'], ok: 1 },
    { q: '3 000 − 1 = …', r: ['2 000', '2 900', '2 999', '2 990'], ok: 2 },
    { q: '476 + 358 = …', r: ['724', '834', '824', '734'], ok: 1 },
    { q: 'Quel calcul vérifie 900 − 350 = 550 ?', r: ['550 + 350', '900 + 350', '550 − 350', '900 + 550'], ok: 0 },
    { q: 'Dans une addition posée, on commence par…', r: ['les milliers', 'les centaines', 'les unités', 'n\'importe quelle colonne'], ok: 2 },
  ],
});

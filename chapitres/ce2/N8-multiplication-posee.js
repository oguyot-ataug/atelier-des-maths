/* ============================================================
   CHAPITRE : La multiplication posée (CE2, N8, période 4)
   Programme du cycle 2 (CE2) : l'algorithme de la multiplication posée est introduit en période 4
   au plus tard ; multiplier un nombre de deux ou trois chiffres par un nombre d'un ou deux chiffres
   (16 × 548 ou 548 × 16, le nombre qui a le moins de chiffres sur la deuxième ligne).
   ============================================================ */
cm1Chapitre({
  niveau: 'ce2', titre: 'La multiplication posée', slug: 'multiplication-posee',
  cours: `
${cm1Lecon(1, 'Multiplier par un nombre à un chiffre')}
${cm1Regle('On écrit le nombre qui a <b>le plus de chiffres en haut</b>, l\'autre en dessous, unités sous unités. On multiplie <b>chaque chiffre du haut</b> par le chiffre du bas, en commençant par les <b>unités</b>. Quand un produit dépasse 9, on écrit les unités et on <b>retient</b> les dizaines, qu\'on ajoute au produit suivant.')}
<div class="figure-wrap">${cm1Posee([[' ', '237'], ['×', '4'], [' ', '948']], '12 ')}<p class="hint" style="margin:4px 0 0;">7 × 4 = 28 : j'écris 8, je retiens 2 · 3 × 4 = 12, plus 2 = 14 : j'écris 4, je retiens 1 · 2 × 4 = 8, plus 1 = 9.</p></div>

${cm1Lecon(2, 'Multiplier par un nombre à deux chiffres')}
${cm1Regle('Pour calculer 548 × 16, on fait <b>deux multiplications</b> puis une <b>addition</b> : 548 × 16 = 548 × 6 + 548 × 10.')}
<div class="figure-wrap">${cm1Posee([[' ', '548'], ['×', '16'], [' ', '3288', true], ['+', '5480'], [' ', '8768']])}
<p class="hint" style="margin:4px 0 0;">1<sup>re</sup> ligne : 548 × 6 = 3 288. 2<sup>e</sup> ligne : 548 × 1 dizaine = 548 dizaines, on écrit d'abord <b>un zéro</b> aux unités, puis 548 → 5 480. On additionne : 8 768.</p></div>
${cm1AnimOperation('ce2-op-mul', { a: '548', op: '×', b: '16', ops: ['×'], legende: 'Tape tes propres nombres (le plus petit en bas, deux chiffres au plus), puis « Calculer » : la multiplication se déroule étape par étape.' })}
${cm1Astuce('On n\'oublie pas le <b>zéro</b> de la deuxième ligne : on multiplie par des dizaines.')}

${cm1Lecon(3, 'Vérifier son résultat')}
${cm1Rem('Avant de poser, on peut chercher un résultat proche : 548 × 16, c\'est un peu plus que 500 × 16 = 8 000. Le résultat 8 768 est donc vraisemblable ; 87 680 ou 876 ne le seraient pas.')}
`,
  methode: `
${cm1Demo('ce2-mp-pb', 'Résoudre un problème avec une multiplication posée', 'Un cinéma a 23 rangées de 135 fauteuils. Combien de fauteuils y a-t-il ?')}
`,
  demos: [
    ['ce2-mp-pb', [
      { expr: '23 rangées de 135 : 135 × 23', note: 'On répète 23 fois le même nombre : c\'est une multiplication.' },
      { expr: cm1Posee([[' ', '135'], ['×', '23'], [' ', '405', true], ['+', '2700'], [' ', '3105']]), note: '135 × 3 = 405 ; 135 × 2 dizaines = 2 700 (on écrit d\'abord un zéro).' },
      { expr: 'Il y a 3 105 fauteuils.', note: 'Vérification : un peu plus que 100 × 23 = 2 300, un peu moins que 150 × 23 = 3 450 ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-mp', [
    ['Pose et calcule : 324 × 3.', '972.'],
    ['Pose et calcule : 156 × 7.', '1 092.'],
    ['Pose et calcule : 63 × 24.', '1 512.'],
    ['Pose et calcule : 208 × 15.', '3 120.'],
    ['Pose et calcule : 16 × 548 (attention à l\'ordre !).', 'On pose 548 en haut et 16 en bas : 8 768.'],
    ['Une caisse contient 12 boîtes de 145 clous. Combien de clous dans la caisse ?', '145 × 12 = 1 740 clous.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la multiplication « per gelosia »', [
    'Au Moyen Âge, en Italie, on multipliait dans une grille découpée en petites cases coupées en diagonale, comme les <b>jalousies</b> des fenêtres (« gelosia » en italien). Cette méthode venait des savants arabes. Notre méthode en colonnes s\'est imposée plus tard, car elle prend moins de place.',
  ]),
  quiz: [
    { q: '213 × 3 = …', opts: ['639', '619', '6 039'], correct: 0 },
    { q: 'Pour 548 × 16, la deuxième ligne commence par…', opts: ['un zéro', 'un 1', 'rien'], correct: 0 },
    { q: '25 × 12 = …', opts: ['250', '300', '3 000'], correct: 1 },
  ],
  flash: [
    { q: '123 × 3 = …', r: ['369', '126', '339', '396'], ok: 0 },
    { q: '45 × 2 = …', r: ['80', '90', '47', '100'], ok: 1 },
    { q: '112 × 4 = …', r: ['448', '444', '116', '484'], ok: 0 },
    { q: '30 × 12 = …', r: ['42', '36', '360', '3 600'], ok: 2 },
    { q: 'Dans 548 × 16, que vaut la 1re ligne (548 × 6) ?', r: ['3 288', '3 248', '5 480', '548'], ok: 0 },
    { q: '25 × 4 = …', r: ['29', '90', '100', '125'], ok: 2 },
  ],
});

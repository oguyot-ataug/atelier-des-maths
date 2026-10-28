/* ============================================================
   CHAPITRE : Comparer, ranger, encadrer (CE1, N5, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : comparer deux nombres jusqu'à
   1 000 (d'abord les centaines, puis les dizaines, puis les unités) avec les signes < et > ; ranger
   dans l'ordre croissant ou décroissant ; encadrer un nombre entre deux dizaines ou deux centaines
   consécutives ; situer un nombre sur une droite graduée ; les expressions « égal à », « supérieur
   à », « inférieur à », « compris entre … et … » ; ordonner jusqu'à cinq nombres (234, 243, 239, 300,
   229) ; intercaler les nombres manquants d'une bande numérique.
   Pensé pour être projeté : les plaques, barres et cubes côte à côte, le crocodile des signes.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const croco = d => cpSvg(80, 80, cpCrocoSvg(d > 0 ? 14 : 66, 44, d, 1), 56);
const cartes = L => `<span class="cpn-cartes">${L.map(n => `<span>${n}</span>`).join('')}</span>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Comparer, ranger, encadrer', slug: 'comparer-encadrer',
  cours: `
${cm1Lecon(1, 'Comparer deux nombres')}
${cm1Regle(`Pour comparer deux nombres de trois chiffres, on regarde <b>d'abord les centaines</b>, puis les dizaines, puis les unités.${lig(ce1Plaques(312, { q: 6 }), ce1Plaques(287, { q: 6 }))}${P('312 a 3 centaines, 287 en a 2 : <b>312 &gt; 287</b>, même si 287 a plus de dizaines !')}`, 'Comparer')}
${ce1AnimComparer('ce1-n5-comparer', { presets: [[312, 287], [456, 432], [578, 571], [609, 690]] })}
${cm1Exemple('Même nombre de centaines :', ['456 et 432 : 4 centaines chacun ;', 'on regarde les dizaines : 5 &gt; 3 ;', 'donc 456 &gt; 432.'])}
${cm1Def(`${lig(croco(1))}${P('<b>&lt;</b> : « est plus petit que »')}${lig(croco(-1))}${P('<b>&gt;</b> : « est plus grand que ». La pointe montre toujours le plus petit nombre.')}`, 'Les signes')}

${cm1Lecon(2, 'Ranger')}
${cm1Def(`Ordre <b>croissant</b> (du plus petit au plus grand) :${lig(cartes([109, 190, 309, 390, 901]))}${P('109 &lt; 190 &lt; 309 &lt; 390 &lt; 901')}`, 'Ranger')}
${cm1Astuce('Avec les mêmes chiffres, on peut écrire des nombres très différents : 109, 190, 901… La place des chiffres change tout !')}

${cm1Lecon(3, 'Encadrer')}
${cm1Axe(300, 400, 10, 50, [[347, 'A']])}
${cm1Regle(`${cm1Liste(['Entre deux dizaines : 340 &lt; 347 &lt; 350.', 'Entre deux centaines : 300 &lt; 347 &lt; 400.'])}`, 'Encadrer 347')}
${cm1Rem('Encadrer, c\'est dire « entre quels nombres » se trouve un nombre. Sur la droite graduée, A est entre 340 et 350, plus près de 350.')}

${cm1Lecon(4, 'Le nombre d\'avant, le nombre d\'après')}
${cm1Regle(`${cm1Liste(['Juste avant 400 : 399.', 'Juste après 499 : 500.', '10 de plus que 295 : 305.', '100 de moins que 620 : 520.'])}`, 'À savoir')}
${cm1Def(`${cm1Tableau(['On écrit', 'On lit'], [['325 &gt; 289', '325 est <b>supérieur à</b> 289'], ['289 &lt; 325', '289 est <b>inférieur à</b> 325'], ['400 = 400', '400 est <b>égal à</b> 400'], ['390 &lt; 394 &lt; 400', '394 est <b>compris entre</b> 390 et 400']])}`, 'Les mots pour comparer')}
${cm1Exemple('Les nombres manquants de la bande :', ['391, 392, 393, <b>394</b>, <b>395</b>, 396, 397, 398'])}
`,
  methode: `
${cm1Demo('ce1-n5-m-comparer', 'Comparer 528 et 582', 'Écris le bon signe : 528 … 582.')}
${cm1Demo('ce1-n5-m-encadrer', 'Encadrer 763', 'Encadre 763 entre deux dizaines, puis entre deux centaines.')}
`,
  demos: [
    ['ce1-n5-m-comparer', [
      { expr: 'Centaines : 5 et 5.', note: 'Pareil : je regarde les dizaines.' },
      { expr: 'Dizaines : 2 et 8.', note: '2 &lt; 8.' },
      { expr: '528 &lt; 582', note: 'La bouche du crocodile s\'ouvre vers 582.', fig: croco(1) },
    ]],
    ['ce1-n5-m-encadrer', [
      { expr: '763 : 76 dizaines et 3 unités.', note: 'La dizaine d\'avant : 760 ; celle d\'après : 770.' },
      { expr: '760 &lt; 763 &lt; 770', note: 'Entre deux dizaines.', fig: cm1Axe(750, 780, 1, 10, [[763, '763']]) },
      { expr: '700 &lt; 763 &lt; 800', note: 'Entre deux centaines.' },
    ]],
  ],
  exos: cm1Exos('ce1-n5', [
    ['Écris le bon signe : 671 … 617.',
      cm1Redac('Comparer 671 et 617', '671 &gt; 617', 'Même nombre de centaines ; 7 dizaines &gt; 1 dizaine : 671 est plus grand.')],
    ['Écris le bon signe : 299 … 301.',
      cm1Redac('Comparer 299 et 301', '299 &lt; 301', '2 centaines &lt; 3 centaines : 299 est plus petit.')],
    ['Range dans l\'ordre croissant : 418, 481, 148, 841.',
      cm1Redac('Ordre croissant', '148 &lt; 418 &lt; 481 &lt; 841', 'Du plus petit au plus grand : 148, 418, 481, 841.')],
    ['Range dans l\'ordre décroissant : 205, 250, 520, 502.',
      cm1Redac('Ordre décroissant', '520 &gt; 502 &gt; 250 &gt; 205', 'Du plus grand au plus petit : 520, 502, 250, 205.')],
    ['Encadre 586 entre deux dizaines.',
      cm1Redac('Encadrer 586', '580 &lt; 586 &lt; 590', '586 est entre 580 et 590.')],
    ['Encadre 349 entre deux centaines.',
      cm1Redac('Encadrer 349', '300 &lt; 349 &lt; 400', '349 est entre 300 et 400.')],
    ['Range dans l\'ordre croissant : 234, 243, 239, 300, 229.',
      cm1Redac('Ordre croissant', '229 &lt; 234 &lt; 239 &lt; 243 &lt; 300', 'Du plus petit au plus grand : 229, 234, 239, 243, 300.')],
    ['Écris trois nombres compris entre 590 et 600.',
      cm1Redac('Nombres compris entre 590 et 600', '591 ; 595 ; 598', 'Par exemple 591, 595 et 598 : ils sont supérieurs à 590 et inférieurs à 600.')],
    ['Le château A a 385 marches, le château B en a 358. Lequel en a le plus ?',
      cm1Redac('Les marches', '385 &gt; 358', 'C\'est le château A qui a le plus de marches.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la tour Eiffel et ses marches', [
    'Le sommet de la <b>tour Eiffel</b>, construite pour 1889, est à plus de 300 mètres de haut. Pour monter au deuxième étage à pied, il faut gravir <b>674 marches</b> !',
    'Les visiteurs comparent souvent : 674 marches à pied, ou l\'ascenseur ? Pour les nombres, on compare d\'abord les centaines… et pour les jambes, c\'est vite vu !',
  ]),
  quiz: [
    { q: 'Quel signe ? 406 … 460', opts: ['&lt;', '&gt;', '='], correct: 0 },
    { q: 'Le plus grand nombre est…', opts: ['799', '808', '780'], correct: 1 },
    { q: '563 est entre…', opts: ['500 et 600', '560 et 600', '600 et 700'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '253 … 235', r: ['&gt;', '&lt;', '=', '+'], ok: 0 },
    { l: 1, q: '700 … 699', r: ['&gt;', '&lt;', '=', '−'], ok: 0 },
    { l: 2, q: 'Le plus petit : 312, 213, 321, 231 ?', r: ['213', '231', '312', '321'], ok: 0 },
    { l: 3, q: '475 est entre…', r: ['470 et 480', '400 et 450', '480 et 490', '47 et 48'], ok: 0 },
    { l: 4, q: 'Juste après 599 :', r: ['600', '5910', '598', '601'], ok: 0 },
    { l: 4, q: '100 de plus que 350 :', r: ['450', '360', '351', '250'], ok: 0 },
    { l: 4, q: '« 512 est supérieur à 498 » s\'écrit…', r: ['512 &gt; 498', '512 &lt; 498', '512 = 498', '498 &gt; 512'], ok: 0 },
    { l: 4, q: 'Un nombre compris entre 340 et 350 :', r: ['347', '354', '304', '330'], ok: 0 },
  ],
});
})();

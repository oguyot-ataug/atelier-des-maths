/* ============================================================
   CHAPITRE : Comparer et ranger les nombres (CP, N6, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : comparer deux nombres jusqu'à 59
   (d'abord les dizaines, puis les unités), utiliser les signes < , > et =, ranger des nombres
   dans l'ordre croissant ou décroissant, placer et repérer des nombres sur la bande, situer un
   nombre entre deux dizaines.
   Pensé pour être projeté : le crocodile ouvre la bouche vers le plus grand nombre.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const signe = s => `<span style="font:700 1.6rem 'Space Grotesk',sans-serif;color:${CE2C.vert};margin:0 6px;">${s}</span>`;
const croco = d => cpSvg(80, 80, cpCrocoSvg(d > 0 ? 14 : 66, 44, d, 1), 64);
// Des étiquettes de nombres (cartes) posées dans l'ordre donné.
const cartes = L => `<span class="cpn-cartes">${L.map(n => `<span>${n}</span>`).join('')}</span>`;

cm1Chapitre({
  niveau: 'cp', titre: 'Comparer et ranger les nombres', slug: 'comparer-ranger',
  cours: `
${cm1Lecon(1, 'Qui est le plus grand ?')}
${cm1Regle(`Pour comparer deux nombres :${cm1Liste(['je regarde d\'abord les <b>dizaines</b> : celui qui a le plus de dizaines est le plus grand ;', 'si les dizaines sont pareilles, je regarde les <b>unités</b>.'])}${lig(cpBarres(32, { q: 10 }), cpBarres(27, { q: 10 }))}${P('32 a 3 dizaines, 27 en a 2 : <b>32 est plus grand que 27</b>.')}`, 'Comparer')}
${cpAnimCroco('cp-n6-croco', { presets: [[32, 27], [45, 48], [19, 41], [36, 36]] })}

${cm1Lecon(2, 'Les signes < et >')}
${cm1Def(`${lig(croco(1))}${P(`On écrit ${signe('&lt;')} pour « est plus petit que » : <b>27 &lt; 32</b>.`)}${lig(croco(-1))}${P(`On écrit ${signe('&gt;')} pour « est plus grand que » : <b>32 &gt; 27</b>.`)}${P(`Quand c'est pareil, on écrit ${signe('=')} : <b>36 = 36</b>.`)}`, 'Les signes')}
${cm1Astuce('Le signe est comme la bouche du crocodile : elle s\'ouvre toujours vers le plus grand nombre. La pointe montre le plus petit.')}

${cm1Lecon(3, 'Ranger des nombres')}
${cm1Def(`<b>Ranger du plus petit au plus grand</b> (ordre croissant) :${lig(cartes([12, 25, 31, 48, 53]))}${P('12 &lt; 25 &lt; 31 &lt; 48 &lt; 53')}<b>Du plus grand au plus petit</b> (ordre décroissant) :${lig(cartes([53, 48, 31, 25, 12]))}`, 'Ranger')}
${cm1Rem('Au tableau : faire ranger des élèves qui portent chacun une étiquette-nombre. Pour ranger, on cherche d\'abord le plus petit, puis le plus petit de ceux qui restent…')}

${cm1Lecon(4, 'Entre deux dizaines')}
${cm1Regle(`${lig(cpBande(30, 40, { on: [34], c: 34 }))}${P('34 est <b>entre 30 et 40</b> : il a 3 dizaines, comme 30, mais moins que 40.')}${P('30 &lt; 34 &lt; 40')}`, 'Encadrer')}
${cm1Astuce('Sur la bande des nombres, plus on va vers la droite, plus les nombres sont grands.')}
`,
  methode: `
${cm1Demo('cp-n6-m-comparer', 'Comparer 45 et 48', 'Écris le bon signe : 45 … 48.')}
${cm1Demo('cp-n6-m-ranger', 'Ranger du plus petit au plus grand', 'Range : 41, 14, 27, 9.')}
`,
  demos: [
    ['cp-n6-m-comparer', [
      { expr: 'Dizaines : 4 et 4.', note: 'C\'est pareil : je regarde les unités.', fig: lig(cpBarres(45, { q: 8 }), cpBarres(48, { q: 8 })) },
      { expr: 'Unités : 5 et 8.', note: '5 est plus petit que 8.' },
      { expr: '45 &lt; 48', note: 'La bouche du crocodile s\'ouvre vers 48.', fig: croco(1) },
    ]],
    ['cp-n6-m-ranger', [
      { expr: 'Le plus petit : 9.', note: '9 n\'a pas de dizaine.', fig: cartes([9]) },
      { expr: 'Puis 14.', note: '1 dizaine.', fig: cartes([9, 14]) },
      { expr: 'Puis 27.', note: '2 dizaines.', fig: cartes([9, 14, 27]) },
      { expr: '9 &lt; 14 &lt; 27 &lt; 41', note: 'Le plus grand, 41, a 4 dizaines.', fig: cartes([9, 14, 27, 41]) },
    ]],
  ],
  exos: cm1Exos('cp-n6', [
    ['Écris le bon signe (&lt;, &gt; ou =) : 38 … 52.',
      cm1Redac('Comparer 38 et 52', '38 &lt; 52', '38 a 3 dizaines, 52 en a 5 : 38 est plus petit que 52.')],
    ['Écris le bon signe : 46 … 43.',
      cm1Redac('Comparer 46 et 43', '46 &gt; 43', 'Même nombre de dizaines ; 6 unités, c\'est plus que 3 : 46 est plus grand que 43.')],
    ['Écris le bon signe : 25 … 25.',
      cm1Redac('Comparer 25 et 25', '25 = 25', 'Les deux nombres sont égaux.')],
    ['Range du plus petit au plus grand : 34, 17, 51, 29.',
      cm1Redac('Du plus petit au plus grand', '17 &lt; 29 &lt; 34 &lt; 51', 'Dans l\'ordre croissant : 17, 29, 34, 51.', cartes([17, 29, 34, 51]))],
    ['Range du plus grand au plus petit : 22, 40, 8, 35.',
      cm1Redac('Du plus grand au plus petit', '40 &gt; 35 &gt; 22 &gt; 8', 'Dans l\'ordre décroissant : 40, 35, 22, 8.', cartes([40, 35, 22, 8]))],
    ['Entre quelles dizaines se trouve 47 ?',
      cm1Redac('Encadrer 47', '40 &lt; 47 &lt; 50', '47 est entre 40 et 50.', cpBande(40, 50, { on: [47], c: 24 }))],
    ['Léa a 34 images. Malo en a 43. Qui en a le plus ?',
      cm1Redac('Qui a le plus d\'images', '43 &gt; 34', '43 a 4 dizaines, 34 en a 3 : c\'est Malo qui a le plus d\'images.', lig(cpBarres(34, { q: 8 }), cpBarres(43, { q: 8 })))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : d\'où viennent les signes &lt; et &gt; ?', [
    'Les signes <b>&lt;</b> et <b>&gt;</b> ont été inventés par un savant anglais, <b>Thomas Harriot</b>. Ils ont été imprimés pour la première fois dans un livre en 1631, après sa mort.',
    'Avant, on écrivait les comparaisons avec des mots. Le crocodile, lui, est beaucoup plus récent : c\'est une astuce d\'enseignants pour ne plus se tromper de sens !',
  ]),
  quiz: [
    { q: 'Quel est le plus grand nombre ?', opts: ['29', '41', '38'], correct: 1 },
    { q: 'Quel signe faut-il ? 54 … 45', opts: ['&lt;', '&gt;', '='], correct: 1 },
    { q: 'Entre quelles dizaines est 26 ?', opts: ['10 et 20', '20 et 30', '30 et 40'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'Le plus grand : 19 ou 31 ?', r: ['19', '31', 'Pareil', 'On ne sait pas'], ok: 1 },
    { l: 1, q: 'Le plus petit : 42 ou 47 ?', r: ['42', '47', 'Pareil', 'On ne sait pas'], ok: 0 },
    { l: 2, q: '23 … 32', r: ['&lt;', '&gt;', '=', '+'], ok: 0 },
    { l: 2, q: '50 … 49', r: ['&lt;', '&gt;', '=', '−'], ok: 1 },
    { l: 2, q: '« 18 &lt; 25 » se lit…', r: ['18 est plus grand que 25', '18 est plus petit que 25', '18 égale 25', '18 plus 25'], ok: 1 },
    { l: 3, q: 'Le plus petit de 35, 53, 30, 39 ?', r: ['35', '53', '30', '39'], ok: 2 },
    { l: 3, q: 'Le plus grand de 28, 41, 14, 40 ?', r: ['28', '41', '14', '40'], ok: 1 },
    { l: 4, q: '36 est entre…', r: ['20 et 30', '30 et 40', '40 et 50', '3 et 6'], ok: 1 },
    { l: 4, q: '52 est entre…', r: ['50 et 60', '40 et 50', '20 et 50', '5 et 2'], ok: 0 },
  ],
});
})();

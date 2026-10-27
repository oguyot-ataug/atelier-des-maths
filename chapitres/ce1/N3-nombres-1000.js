/* ============================================================
   CHAPITRE : Les nombres jusqu'à 1 000 (CE1, N3, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : la centaine (dix dizaines, cent
   unités), dénombrer en groupant par cent, par dix ; lire et écrire les nombres jusqu'à 1 000 en
   chiffres et en lettres ; valeur des chiffres selon leur place (centaines, dizaines, unités) ;
   décompositions (243 = 200 + 40 + 3) ; la droite graduée de 100 en 100 ; mille.
   Pensé pour être projeté : dix barres de dix qui se rassemblent en une plaque de cent.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Les nombres jusqu\'à 1 000', slug: 'nombres-1000',
  cours: `
${cm1Lecon(1, 'La centaine')}
${cm1Def(`${lig(ce1Plaques(100, { q: 9 }), '<b style="font-size:1.3rem;">=</b>', cpBarres(100, { q: 7 }))}${P('<b>1 centaine = 10 dizaines = 100 unités</b>')}`, 'Cent')}
${ce1AnimCentaines('ce1-n3-centaines', { n: 243 })}
${cm1Regle('Pour compter beaucoup d\'objets, on fait des paquets de dix, puis des paquets de dix paquets : des centaines.')}

${cm1Lecon(2, 'Centaines, dizaines, unités')}
${cm1Def(`${lig(ce1Plaques(243, { q: 7 }))}${ce1CDU(243)}${P('<b>243</b> : 2 centaines, 4 dizaines, 3 unités.')}${cm1Liste(['243 = 200 + 40 + 3'])}`, 'La place des chiffres')}
${cm1Regle('Dans un nombre à trois chiffres, le chiffre de gauche est le chiffre des <b>centaines</b>, celui du milieu le chiffre des <b>dizaines</b>, celui de droite le chiffre des <b>unités</b>.')}
${cm1Astuce('Attention au zéro ! Dans 305, il y a 3 centaines, <b>0 dizaine</b> et 5 unités : 305 = 300 + 5. Le zéro garde la place des dizaines.')}

${cm1Lecon(3, 'Lire et écrire les nombres')}
<div class="cpn-fiches">${[100, 200, 243, 305, 480, 999].map(n => `<div class="cpn-fiche"><div class="cpn-fiche-n">${n}</div><div class="cpn-fiche-mot">${ce1Mot(n)}</div></div>`).join('')}</div>
${cm1Regle(`${cm1Liste(['On dit d\'abord les centaines (cent, deux cents…), puis le reste comme les nombres jusqu\'à 99.', '<b>Cents</b> prend un s quand rien ne le suit : deux cents, mais deux cent trois.', 'Après 999 vient <b>1 000</b> (mille) : 10 centaines.'])}`, 'En lettres')}

${cm1Lecon(4, 'La droite graduée jusqu\'à 1 000')}
${cm1Axe(0, 1000, 100, 100, [[300, 'A'], [700, 'B']])}
${P('Graduée de 100 en 100 : A est en face de <b>300</b>, B en face de <b>700</b>.')}
${cm1Axe(200, 300, 10, 50, [[230, 'C'], [280, 'D']])}
${cm1Regle('Ici, entre 200 et 300, chaque petit trait vaut 10 : C est en face de <b>230</b>, D en face de <b>280</b>.')}
`,
  methode: `
${cm1Demo('ce1-n3-m-ecrire', 'Écrire « quatre cent sept » en chiffres', 'Écris ce nombre en chiffres.')}
${cm1Demo('ce1-n3-m-compter', 'Compter des plaques, barres et cubes', 'Combien de cubes en tout ?')}
`,
  demos: [
    ['ce1-n3-m-ecrire', [
      { expr: '« quatre cent » : 4 centaines', note: 'J\'écris 4 au rang des centaines.' },
      { expr: '« sept » : 7 unités', note: 'Il n\'y a pas de dizaines : j\'écris 0 aux dizaines.' },
      { expr: '407', note: '407 = 400 + 7.', fig: ce1CDU(407) },
    ]],
    ['ce1-n3-m-compter', [
      { expr: '3 plaques : 300', note: 'Je compte les centaines : cent, deux cents, trois cents.', fig: ce1Plaques(352, { q: 6 }) },
      { expr: '5 barres : 50', note: 'Puis les dizaines.' },
      { expr: '2 cubes : 2', note: 'Puis les unités.' },
      { expr: '300 + 50 + 2 = 352', note: 'Il y a <b>352</b> cubes.' },
    ]],
  ],
  exos: cm1Exos('ce1-n3', [
    [`Combien y a-t-il de cubes ?${lig(ce1Plaques(234, { q: 7 }))}`,
      cm1Redac('Nombre de cubes', '200 + 30 + 4 = 234', 'Il y a 234 cubes.')],
    ['Écris en chiffres : six cent cinquante-deux.',
      cm1Redac('Six cent cinquante-deux', '600 + 50 + 2 = 652', 'Six cent cinquante-deux s\'écrit 652.')],
    ['Écris en lettres : 508.',
      cm1Redac('508 en lettres', '508 = 500 + 8', '508 s\'écrit cinq cent huit.')],
    ['Dans 739, quel est le chiffre des centaines ? des dizaines ? des unités ?',
      cm1Redac('Les chiffres de 739', '739 = 700 + 30 + 9', 'Le chiffre des centaines est 7, celui des dizaines 3, celui des unités 9.', ce1CDU(739))],
    ['Décompose 860.',
      cm1Redac('Décomposer 860', '860 = 800 + 60', '860, c\'est 8 centaines, 6 dizaines et 0 unité.')],
    [`Quels nombres sont en face des points A et B ?${cm1Axe(400, 500, 10, 50, [[420, 'A'], [470, 'B']])}`,
      cm1Redac('Les points A et B', { suite: ['A : 420', 'B : 470'] }, 'Chaque petit trait vaut 10 : A est en face de 420, B en face de 470.')],
    ['Un fleuriste range ses roses par bouquets de 10. Il a 4 caisses de 100 roses et 6 bouquets de 10. Combien a-t-il de roses ?',
      cm1Redac('Roses du fleuriste', '400 + 60 = 460', 'Le fleuriste a 460 roses.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le mot « mille »', [
    'Les Romains écrivaient <b>C</b> pour cent (« centum ») et <b>M</b> pour mille (« mille »). Notre mot <b>centaine</b> vient de « centum », et <b>mille</b> vient du latin… mille !',
    'Les Romains appelaient aussi « mille » une distance de mille pas doubles (environ 1 480 mètres) : c\'est l\'ancêtre du « mile » des Anglais et des Américains.',
  ]),
  quiz: [
    { q: 'Deux cent quarante s\'écrit…', opts: ['20040', '240', '204'], correct: 1 },
    { q: '1 centaine, c\'est…', opts: ['10 dizaines', '100 dizaines', '10 unités'], correct: 0 },
    { q: 'Dans 506, le chiffre des dizaines est…', opts: ['5', '0', '6'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '10 dizaines, c\'est…', r: ['100', '10', '1 000', '110'], ok: 0 },
    { l: 2, q: '300 + 40 + 5 = …', r: ['345', '3405', '543', '354'], ok: 0 },
    { l: 2, q: 'Dans 618, le chiffre des centaines est…', r: ['6', '1', '8', '61'], ok: 0 },
    { l: 2, q: '700 + 9 = …', r: ['709', '790', '7009', '79'], ok: 0 },
    { l: 3, q: 'Trois cents s\'écrit…', r: ['300', '3100', '103', '30'], ok: 0 },
    { l: 3, q: 'Après 999, il y a…', r: ['1 000', '9910', '998', '100'], ok: 0 },
    { l: 4, q: 'De 100 en 100 : 300, 400, …', r: ['500', '401', '410', '600'], ok: 0 },
  ],
});
})();

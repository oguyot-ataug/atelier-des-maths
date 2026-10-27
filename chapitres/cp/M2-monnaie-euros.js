/* ============================================================
   CHAPITRE : La monnaie : les euros (CP, M2, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, grandeurs et mesures : connaître
   les pièces de 1 € et 2 € et les billets de 5 €, 10 €, 20 € et 50 €, réaliser des échanges
   (un billet de 5 € vaut 5 pièces de 1 €), constituer une somme de plusieurs façons, comparer
   des sommes, résoudre des problèmes de prix (euros entiers seulement, pas de centimes au CP).
   Pensé pour être projeté : on paie un objet en posant l'argent dans la coupelle.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const prix = (objet, p) => `<span class="cpn-prix"><b>${objet}</b> ${p} €</span>`;

cm1Chapitre({
  niveau: 'cp', titre: 'La monnaie : les euros', slug: 'monnaie-euros',
  cours: `
${cm1Lecon(1, 'Pièces et billets')}
${cm1Def(`En France, on paie en <b>euros</b>. On écrit <b>€</b>.${lig(cpArgent([1, 2]))}${P('Les <b>pièces</b> de 1 euro et de 2 euros.')}${lig(cpArgent([5, 10]), cpArgent([20, 50]))}${P('Les <b>billets</b> de 5, 10, 20 et 50 euros.')}`, 'La monnaie')}
${cm1Rem('Il existe aussi de petites pièces, les centimes : on les étudiera plus tard. Au tableau : utiliser de la fausse monnaie et faire jouer à la marchande.')}

${cm1Lecon(2, 'Faire des échanges')}
${cm1Regle(`${lig(cpArgent([2]))}${P('vaut autant que')}${lig(cpArgent([1, 1]))}${lig(cpArgent([5]))}${P('vaut autant que')}${lig(cpArgent([2, 2, 1]))}${lig(cpArgent([10]))}${P('vaut autant que')}${lig(cpArgent([5, 5]))}`, 'Échanger')}
${cm1Astuce('Un billet de 10 €, c\'est 10 pièces de 1 € : <b>une dizaine</b> d\'euros !')}

${cm1Lecon(3, 'Payer une somme')}
${cpAnimPayer('cp-m2-payer', { presets: [
  { nom: 'Un livre à 8 €', objet: 'Un livre', prix: 8, paye: [5, 2, 1] },
  { nom: 'Un ballon à 13 €', objet: 'Un ballon', prix: 13, paye: [10, 2, 1] },
  { nom: 'Un jeu à 27 €', objet: 'Un jeu', prix: 27, paye: [20, 5, 2] },
  { nom: 'Le même jeu autrement', objet: 'Un jeu', prix: 27, paye: [10, 10, 5, 1, 1], fin: 'On peut aussi payer 27 € avec 10 + 10 + 5 + 1 + 1 : il y a plusieurs façons de payer la même somme.' }] })}
${cm1Regle('Pour compter une somme, on commence par <b>le plus gros</b> billet ou la plus grosse pièce, puis on ajoute les autres.')}
${cm1Exemple('Compter une somme :', [`${cpArgent([10, 5, 2, 2], { px: 260 })} 10, 15, 17, 19 : il y a <b>19 €</b>.`])}

${cm1Lecon(4, 'Problèmes de prix')}
${cm1Def(`${lig(prix('Une gomme', 2), prix('Un cahier', 3), prix('Une trousse', 9))}${P('Une gomme et un cahier : 2 + 3 = 5. Il faut payer <b>5 €</b>.')}`, 'Acheter')}
${cm1Regle('J\'ai 10 €. J\'achète une trousse à 9 €. Il me reste 10 − 9 = 1, donc <b>1 €</b>.', 'Ce qui reste')}
`,
  methode: `
${cm1Demo('cp-m2-m-compter', 'Compter l\'argent du porte-monnaie', 'Combien d\'argent y a-t-il ?')}
${cm1Demo('cp-m2-m-payer', 'Payer 16 € de deux façons', 'Trouve deux façons de payer 16 €.')}
`,
  demos: [
    ['cp-m2-m-compter', [
      { expr: 'Je range l\'argent du plus gros au plus petit.', note: 'Les billets d\'abord, puis les pièces.', fig: cpArgent([20, 10, 2, 1], { px: 300 }) },
      { expr: '20, 30', note: 'Les deux billets : 20 + 10 = 30.' },
      { expr: '32, 33', note: 'Les pièces : 30 + 2 = 32, puis 32 + 1 = 33.' },
      { expr: 'Il y a 33 €.', note: 'Trente-trois euros.' },
    ]],
    ['cp-m2-m-payer', [
      { expr: '10 + 5 + 1 = 16', note: 'Un billet de 10, un billet de 5, une pièce de 1.', fig: cpArgent([10, 5, 1], { px: 240 }) },
      { expr: '5 + 5 + 2 + 2 + 2 = 16', note: 'Deux billets de 5 et trois pièces de 2.', fig: cpArgent([5, 5, 2, 2, 2], { px: 320 }) },
      { expr: 'Les deux façons font 16 €.', note: 'Il y en a encore d\'autres !' },
    ]],
  ],
  exos: cm1Exos('cp-m2', [
    [`Combien d'argent y a-t-il ?${lig(cpArgent([10, 2, 2, 1]))}`,
      cm1Redac('L\'argent', '10 + 2 + 2 + 1 = 15', 'Il y a 15 €.')],
    [`Combien d'argent y a-t-il ?${lig(cpArgent([20, 20, 5]))}`,
      cm1Redac('L\'argent', '20 + 20 + 5 = 45', 'Il y a 45 €.')],
    ['Combien de pièces de 1 € faut-il pour avoir autant qu\'un billet de 5 € ?',
      cm1Redac('Échange', '1 + 1 + 1 + 1 + 1 = 5', 'Il faut 5 pièces de 1 €.', cpArgent([1, 1, 1, 1, 1], { px: 240 }))],
    ['Dessine l\'argent pour payer 12 € avec un billet et une pièce.',
      cm1Redac('Payer 12 €', '10 + 2 = 12', 'Un billet de 10 € et une pièce de 2 €.', cpArgent([10, 2], { px: 150 }))],
    [`Léo achète une gomme et une trousse. Combien paie-t-il ?${lig(prix('Une gomme', 2), prix('Une trousse', 9))}`,
      cm1Redac('Prix à payer', '2 + 9 = 11', 'Léo paie 11 €.')],
    ['Mia a 10 €. Elle achète un livre à 7 €. Combien lui reste-t-il ?',
      cm1Redac('Argent qui reste', '10 − 7 = 3', 'Il reste 3 € à Mia.')],
    [`Qui a le plus d'argent ?${lig(`<span>Sam : ${cpArgent([5, 5], { px: 150 })}</span>`, `<span>Inès : ${cpArgent([2, 2, 2, 2, 1], { px: 220 })}</span>`)}`,
      cm1Redac('Qui a le plus', { suite: ['Sam : 5 + 5 = 10', 'Inès : 2 + 2 + 2 + 2 + 1 = 9'] }, 'Sam a 10 € et Inès a 9 € : c\'est Sam qui a le plus d\'argent, même s\'il a moins de billets et de pièces.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : avant l\'euro', [
    'Il y a très longtemps, on n\'avait pas d\'argent : on faisait du <b>troc</b>, on échangeait des choses (un sac de blé contre une poule…). Puis on a inventé les pièces de métal, il y a plus de 2 600 ans.',
    'En France, avant l\'euro, on payait en <b>francs</b>. Les pièces et les billets en euros sont arrivés le 1<sup>er</sup> janvier 2002. Aujourd\'hui, beaucoup de pays d\'Europe utilisent la même monnaie.',
  ]),
  quiz: [
    { q: 'Un billet de 10 € vaut autant que…', opts: ['deux billets de 5 €', 'deux pièces de 2 €', 'dix billets de 10 €'], correct: 0 },
    { q: `Combien y a-t-il ?${lig(cpArgent([5, 2, 1], { px: 200 }))}`, opts: ['3 €', '8 €', '7 €'], correct: 1 },
    { q: 'J\'ai 20 €. J\'achète un jeu à 15 €. Il me reste…', opts: ['5 €', '35 €', '15 €'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Les euros, on les écrit…', r: ['€', '$', 'E', 'cm'], ok: 0 },
    { l: 1, q: 'La plus petite pièce du CP vaut…', r: ['1 €', '5 €', '10 €', '2 €'], ok: 0 },
    { l: 2, q: 'Une pièce de 2 €, c\'est comme…', r: ['deux pièces de 1 €', 'un billet de 5 €', 'une pièce de 1 €', 'rien'], ok: 0 },
    { l: 2, q: 'Combien de billets de 5 € pour faire 10 € ?', r: ['1', '2', '5', '10'], ok: 1 },
    { l: 3, q: `Combien ?${lig(cpArgent([10, 10, 1], { px: 220 }))}`, r: ['3 €', '21 €', '12 €', '20 €'], ok: 1 },
    { l: 3, q: `Combien ?${lig(cpArgent([2, 2, 2], { px: 150 }))}`, r: ['3 €', '6 €', '4 €', '222 €'], ok: 1 },
    { l: 4, q: 'Un cahier à 3 € et un stylo à 2 €. Je paie…', r: ['5 €', '1 €', '6 €', '32 €'], ok: 0 },
    { l: 4, q: 'J\'ai 5 €, je dépense 4 €. Il me reste…', r: ['1 €', '9 €', '4 €', '0 €'], ok: 0 },
  ],
});
})();

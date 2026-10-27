/* ============================================================
   CHAPITRE : Problèmes : bilan de l'année (CE1, N15, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : résoudre des problèmes de toutes
   les catégories rencontrées (parties et tout, transformations, comparaisons, groupes égaux et
   multiplication, partage, deux étapes, mesures et monnaie), en choisissant une représentation
   (dessin, schéma en barres), en écrivant les calculs (un par ligne) et une phrase réponse ;
   vérifier la vraisemblance du résultat.
   Pensé pour être projeté : les schémas en barres qui se construisent.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Problèmes : bilan de l\'année', slug: 'problemes-bilan',
  cours: `
${cm1Lecon(1, 'Une méthode pour tous les problèmes')}
${cm1Regle(`${cm1Liste(['Je <b>lis</b> l\'énoncé et je le raconte avec mes mots.', 'Je repère la <b>question</b> et les <b>informations utiles</b>.', 'Je fais un <b>schéma</b> (ou un dessin).', 'J\'écris les <b>calculs</b>, un par ligne.', 'Je réponds par une <b>phrase</b> et je vérifie que le résultat est possible.'])}`, 'Les étapes')}

${cm1Lecon(2, 'Additionner, soustraire, comparer')}
${ce2AnimBarres('ce1-n15-barres', { unite: 3, legende: 'Le schéma montre le tout et les parties : on voit tout de suite ce qu\'on cherche.', lignes: [['Billets', [[120, '120 billets vendus samedi', '#2EA8C9', 'Samedi, on a vendu 120 billets…'], [85, '85 dimanche', '#E35D3A', '… et 85 dimanche.']]]], total: '? billets', totalTexte: '120 + 85 = <b>205</b> billets vendus en tout.' })}
${cm1Regle(`${cm1Liste(['On cherche le tout : on ajoute.', 'On cherche une partie ou ce qui reste : on soustrait (ou on cherche ce qui manque).', 'On compare (de plus, de moins) : on cherche l\'écart.'])}`, 'Choisir le calcul')}

${cm1Lecon(3, 'Multiplier, partager')}
${cm1Regle(`${cm1Liste(['Plusieurs groupes pareils : on multiplie. 6 boîtes de 4 gâteaux : 6 × 4 = 24.', 'Un partage équitable : on cherche dans les tables. 24 gâteaux pour 4 enfants : 4 × 6 = 24, donc 6 chacun.'])}`, 'Groupes égaux')}

${cm1Lecon(4, 'Problèmes à deux étapes')}
${cm1Exemple('Exemple', [`Paul achète 3 cahiers à 2 € et un livre à 9 €. Il paie avec un billet de 20 €. Combien lui rend-on ?${cm1Redac('Monnaie rendue', { suite: ['3 × 2 = 6', '6 + 9 = 15', '20 − 15 = 5'] }, 'On rend 5 € à Paul.')}`])}
${cm1Astuce('Pour un problème à plusieurs étapes, on se pose des petites questions : « Combien coûtent les cahiers ? », « Combien paie-t-il en tout ? », « Combien lui rend-on ? »')}
`,
  methode: `
${cm1Demo('ce1-n15-m-etapes', 'Un problème à étapes', 'Une ferme a 5 enclos de 8 moutons. On vend 12 moutons. Combien en reste-t-il ?')}
${cm1Demo('ce1-n15-m-verifier', 'Vérifier un résultat', 'Tom trouve qu\'un trajet de 45 km et un autre de 38 km font 803 km. Est-ce possible ?')}
`,
  demos: [
    ['ce1-n15-m-etapes', [
      { expr: 'Combien de moutons au départ ?', note: '5 enclos de 8 moutons.' },
      { expr: '5 × 8 = 40', note: 'Il y a 40 moutons.' },
      { expr: '40 − 12 = 28', note: 'On en vend 12.' },
      { expr: 'Il reste 28 moutons.', note: 'La phrase réponse.' },
    ]],
    ['ce1-n15-m-verifier', [
      { expr: '45 + 38, c\'est environ 50 + 40 = 90.', note: 'Un ordre de grandeur.' },
      { expr: '803 est beaucoup trop grand.', note: 'Tom a dû mal aligner les chiffres.' },
      { expr: '45 + 38 = 83', note: 'Les deux trajets font 83 km.' },
    ]],
  ],
  exos: cm1Exos('ce1-n15', [
    ['Une école a 186 élèves. 57 sont en CP. Combien ne sont pas en CP ?',
      cm1Redac('Élèves pas en CP', '186 − 57 = 129', '129 élèves ne sont pas en CP.')],
    ['Zoé a 45 €. Son frère a 18 € de moins. Combien a son frère ?',
      cm1Redac('Argent du frère', '45 − 18 = 27', 'Son frère a 27 €.')],
    ['Un fleuriste fait 7 bouquets de 5 roses. Combien de roses utilise-t-il ?',
      cm1Redac('Les roses', '7 × 5 = 35', 'Il utilise 35 roses.')],
    ['On partage 32 cartes entre 4 joueurs. Combien de cartes pour chacun ?',
      cm1Redac('Les cartes', '4 × 8 = 32', 'Chaque joueur a 8 cartes.')],
    ['Une corde mesure 1 m. On en coupe 35 cm. Combien mesure le morceau qui reste ?',
      cm1Redac('La corde', { suite: ['1 m = 100 cm', '100 − 35 = 65'] }, 'Il reste un morceau de 65 cm.')],
    ['Il est 10 h 30. Le repas est à 12 h. Combien de temps faut-il attendre ?',
      cm1Redac('L\'attente', { suite: ['De 10 h 30 à 11 h : 30 minutes', 'De 11 h à 12 h : 1 heure'] }, 'Il faut attendre 1 heure et demie.')],
    ['Au marché, Léa achète 4 kg de pommes à 3 € le kilo et un melon à 2 €. Elle paie avec 20 €. Combien lui rend-on ?',
      cm1Redac('Monnaie de Léa', { suite: ['4 × 3 = 12', '12 + 2 = 14', '20 − 14 = 6'] }, 'On rend 6 € à Léa.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les problèmes de Fibonacci', [
    'En 1202, le savant italien <b>Fibonacci</b> écrit un livre de calcul pour les marchands, plein de problèmes. Le plus célèbre parle de lapins : chaque couple de lapins donne naissance à un nouveau couple chaque mois… Combien de couples au bout d\'un an ?',
    'Les nombres trouvés (1, 1, 2, 3, 5, 8, 13…) s\'appellent aujourd\'hui la <b>suite de Fibonacci</b>. Chaque nombre est la somme des deux précédents : essaie de continuer la suite !',
  ]),
  quiz: [
    { q: '3 paquets de 10 crayons, c\'est…', opts: ['30 crayons', '13 crayons', '310 crayons'], correct: 0 },
    { q: 'J\'ai 50 €, je dépense 35 €. Il me reste…', opts: ['15 €', '25 €', '85 €'], correct: 0 },
    { q: '18 bonbons pour 3 enfants : chacun a…', opts: ['6', '15', '21'], correct: 0 },
  ],
  flash: [
    { l: 2, q: '120 + 80 = …', r: ['200', '190', '1 280', '210'], ok: 0 },
    { l: 2, q: '10 de moins que 63 :', r: ['53', '73', '62', '43'], ok: 0 },
    { l: 3, q: '6 × 5 = …', r: ['30', '11', '35', '65'], ok: 0 },
    { l: 3, q: '20 pour 4 : chacun a…', r: ['5', '4', '16', '80'], ok: 0 },
    { l: 4, q: '2 × 3 €, plus 4 € : …', r: ['10 €', '9 €', '24 €', '7 €'], ok: 0 },
  ],
});
})();

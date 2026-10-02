/* ============================================================
   CHAPITRE : Résolution de problèmes (CM2, N10, période 4)
   Programme du cycle 3 (CM2) : modèle en 4 phases (comprendre, modéliser, calculer, répondre)
   avec régulation (le résultat est-il plausible ?) ; problèmes additifs en une ou plusieurs
   étapes, multiplicatifs « parties-tout », mixtes à plusieurs étapes, de comparaison
   multiplicative, de dénombrement, d'optimisation, et préparant aux algorithmes. Schémas en
   barres ; énoncés où le mot « plus » n'induit pas l'addition.
   ============================================================ */
(() => {
function schema(lignes, tout){
  const k = 3.2, W = 100 * k + 20; let y = tout ? 36 : 6;
  let s = '';
  if(tout) s += `<path d="M10 30 Q10 18 22 18 L${W / 2 - 10} 18 Q${W / 2} 18 ${W / 2} 8 Q${W / 2} 18 ${W / 2 + 10} 18 L${W - 22} 18 Q${W - 10} 18 ${W - 10} 30" fill="none" stroke="#1F3A5C" stroke-width="1.5"/><text x="${W / 2}" y="2" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${tout}</text>`;
  lignes.forEach(l => { let x = 10;
    l.forEach(([t, w, c]) => { const inc = c === 'x';
      s += `<rect x="${x}" y="${y}" width="${w * k}" height="32" fill="${inc ? '#fff' : c}" fill-opacity="${inc ? 1 : .35}" stroke="${inc ? '#E35D3A' : '#1F3A5C'}" stroke-width="1.6" ${inc ? 'stroke-dasharray="6 4"' : ''}/><text x="${x + w * k / 2}" y="${y + 21}" font-size="13" text-anchor="middle" fill="${inc ? '#E35D3A' : '#1F3A5C'}" font-family="Space Grotesk" font-weight="700">${t}</text>`;
      x += w * k; });
    y += 44; });
  return `<svg viewBox="0 -14 ${W} ${y + 14}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${s}</svg>`;
}
const B = '#2EA8C9', V = '#2E9C6A';
cm1Chapitre({
  niveau: 'cm2', titre: 'Résolution de problèmes', slug: 'resolution-problemes',
  cours: `
${cm1Lecon(1, 'Quatre phases pour résoudre un problème')}
${cm1Regle(`<ol style="margin:0;padding-left:20px;line-height:1.9;"><li><b>Comprendre</b> : je raconte l'histoire du problème avec mes mots et je repère la question.</li>
<li><b>Modéliser</b> : je fais un schéma et je choisis la ou les opérations.</li>
<li><b>Calculer</b> : de tête ou en posant l'opération.</li>
<li><b>Répondre</b> : j'écris une phrase réponse et je me demande si le résultat est <b>plausible</b>.</li></ol>`, 'Méthode')}
${cm1Astuce('Ne choisis jamais l\'opération à cause d\'un mot ! « Léa a 45 € ; elle a 12 € de plus que Tom. Combien a Tom ? » Le mot « plus » est là, mais c\'est Tom qui a le moins : 45 − 12 = 33 €.')}

${cm1Lecon(2, 'Comparaison multiplicative : « fois plus », « fois moins »')}
${cm1Exemple('Un vélo coûte 240 €. Une trottinette coûte 4 fois moins cher. Quel est le prix de la trottinette ?')}
${ce2AnimBarres('c2-rp-fois', { unite: 1, lignes: [['Vélo', [[80, '60 €', '#2EA8C9', 'Le prix du vélo, 240 €, partagé en 4 parts égales…'], [80, '60 €', '#2EA8C9', ''], [80, '60 €', '#2EA8C9', ''], [80, '60 €', '#2EA8C9', '… chaque part vaut 240 ÷ 4 = 60 €.']]], ['Trottinette', [[80, '?', '#E9C46A', 'La trottinette coûte 4 fois moins : une seule part.']]]], solution: { ligne: 1, part: 0, texte: '60 €', phrase: 'La trottinette coûte <b>60 €</b>.' } })}
<ul class="example-list"><li>« 4 fois moins » : on partage 240 en 4. 240 ÷ 4 = <b>60 €</b>.</li><li>À l'inverse, « le vélo coûte 4 fois plus que la trottinette » : 60 × 4 = 240.</li></ul>

${cm1Lecon(3, 'Problèmes « parties-tout » multiplicatifs')}
${cm1Exemple('Une salle a 18 rangées de 24 fauteuils. Combien de fauteuils ?', ['Le tout est formé de 18 parties égales de 24 : 18 × 24 = <b>432 fauteuils</b>.', 'Question inverse : « 432 fauteuils en 18 rangées égales » → 432 ÷ 18 = 24 fauteuils par rangée.'])}

${cm1Lecon(4, 'Problèmes à plusieurs étapes')}
${cm1Exemple('Un club achète 12 ballons à 15,50 € et 3 filets à 42 €. Il paie avec 7 billets de 50 €. Combien lui rend-on ?')}
${schema([[['ballons : 12 × 15,50', 60, B], ['filets : 3 × 42', 40, V]]], 'dépense ?')}
${cm1Redac('Prix des ballons', '12 × 15,50 = 186', 'Les ballons coûtent 186 €.')}
${cm1Redac('Prix des filets', '3 × 42 = 126', 'Les filets coûtent 126 €.')}
${cm1Redac('Dépense', '186 + 126 = 312', 'Le club dépense 312 €.')}
${cm1Redac('Paiement', '7 × 50 = 350', 'Le club donne 350 €.')}
${cm1Redac('Monnaie rendue', '350 − 312 = 38', 'On rend 38 € au club : c\'est plausible, moins que ce qu\'il a donné.')}
${cm1Rem('Vérifier la vraisemblance fait partie de la résolution : un rendu négatif, un nombre de personnes à virgule, une voiture de 400 m… doivent alerter.')}

${cm1Lecon(5, 'Dénombrer')}
${cm1Exemple('Menu : 3 entrées, 4 plats. Combien de repas différents (une entrée + un plat) ?', ['Pour chaque entrée, on peut choisir 4 plats : 3 × 4 = <b>12 repas</b>. Un <b>arbre</b> ou un <b>tableau</b> permet de les lister tous sans en oublier.'])}
${ce2AnimArbre('c2-rp-arbre', { niveaux: [{ nom: 'Entrée', choix: [['salade', '#2E9C6A'], ['soupe', '#E9C46A'], ['melon', '#E35D3A']] }, { nom: 'Plat', choix: [['poisson', '#2EA8C9'], ['poulet', '#C9A24A'], ['pâtes', '#7A4FC0'], ['omelette', '#5B6472']] }], fin: '3 entrées, et 4 plats pour chacune : 3 × 4 = <b>12 repas</b>.' })}

${cm1Lecon(6, 'Optimiser')}
${cm1Exemple('Les stylos sont vendus à 1,20 € l\'unité ou 5 € le lot de 5. Quel est le prix le plus bas pour 12 stylos ?', ['2 lots (10 stylos) + 2 stylos : 10 + 2,40 = <b>12,40 €</b>.', '3 lots (15 stylos) : 15 €.', '12 stylos à l\'unité : 12 × 1,20 = 14,40 €.', 'Le moins cher est 12,40 €.'])}
`,
  methode: `
${cm1Demo('c2-rp-comp', 'Comparaison multiplicative', 'Julie a 36 billes, c\'est 3 fois plus que Hugo. Combien Hugo a-t-il de billes ?')}
${cm1Demo('c2-rp-algo', 'Chercher toutes les solutions', 'De combien de façons peut-on payer exactement 20 € avec des pièces de 2 € et des billets de 5 € ?')}
`,
  demos: [
    ['c2-rp-comp', [
      { expr: 'Julie : 36 = 3 fois Hugo', note: 'Comprendre : c\'est Julie qui en a le plus. « 3 fois plus que Hugo ».' },
      { expr: schema([[['Julie : 36', 100, B]], [['Hugo ?', 33.3, 'x']]]), note: 'Modéliser : la barre de Julie contient 3 barres de Hugo.' },
      { expr: '36 ÷ 3 = 12', note: 'Calculer : on partage en 3.' },
      { expr: 'Hugo a 12 billes.', note: 'Répondre et vérifier : 12 × 3 = 36 ✔ (et Hugo en a moins que Julie : plausible).' },
    ]],
    ['c2-rp-algo', [
      { expr: '0 billet de 5 € : 20 = 10 × 2 ✔', note: 'On procède avec ordre : on essaie 0, 1, 2… billets.' },
      { expr: '1 billet : reste 15 € → impossible avec des pièces de 2 €', note: '15 est impair.' },
      { expr: '2 billets : reste 10 € = 5 × 2 ✔ · 3 billets : reste 5 € ✘ · 4 billets : 20 € ✔', note: 'On continue jusqu\'à ce que les billets dépassent 20 €.' },
      { expr: '3 façons : 10 pièces · 2 billets + 5 pièces · 4 billets', note: 'Procéder dans l\'ordre permet de n\'en oublier aucune : c\'est un algorithme.' },
    ]],
  ],
  exos: cm1Exos('c2rp', [
    ['Un paquet de 6 yaourts coûte 3,30 €. Combien coûtent 5 paquets ? Combien y a-t-il de yaourts ?',
      cm1Redac('Prix de 5 paquets', '5 × 3,30 = 16,50', '5 paquets coûtent 16,50 €.') + cm1Redac('Nombre de yaourts', '5 × 6 = 30', 'Il y a 30 yaourts.')],
    ['La tour Eiffel mesure 330 m. Une maison mesure 10 m. Combien de fois la tour est-elle plus haute ?',
      cm1Redac('Comparaison', '330 ÷ 10 = 33', 'La tour Eiffel est 33 fois plus haute que la maison.')],
    ['Paul pèse 38 kg ; il pèse 7 kg de plus que sa sœur. Combien pèse sa sœur ?',
      cm1Redac('Masse de la sœur', '38 − 7 = 31', 'C\'est Paul le plus lourd : sa sœur pèse 31 kg.')],
    ['Une école de 336 élèves a 14 classes de même effectif. Combien y a-t-il d\'élèves par classe ?',
      cm1Redac('Élèves par classe', '336 ÷ 14 = 24', 'Il y a 24 élèves par classe.')],
    ['Avec 3 tee-shirts (rouge, bleu, vert) et 2 shorts (noir, blanc), combien de tenues différentes peut-on faire ?',
      cm1Redac('Nombre de tenues', '3 × 2 = 6', 'On peut faire 6 tenues différentes.')],
    ['Au cinéma, la place coûte 8 €, ou la carte de 10 places 65 €. Quel est le prix le plus bas pour 13 places ?',
      cm1Redac('1 carte et 3 places', ['65 + 3 × 8', '65 + 24', '89'], 'Avec une carte et 3 places, on paie 89 €.')
      + cm1Redac('Les autres possibilités', { suite: ['13 places à l\'unité : 13 × 8 = 104', '2 cartes : 2 × 65 = 130'] }, 'Le prix le plus bas est 89 €.')],
    ['Un fermier a des poules et des lapins : 10 têtes et 32 pattes. Combien a-t-il de lapins ?',
      cm1Redac('Si les 10 animaux étaient des poules', '10 × 2 = 20', 'Il y aurait 20 pattes.')
      + cm1Redac('Pattes qui manquent', '32 − 20 = 12', 'Il manque 12 pattes ; chaque lapin a 2 pattes de plus qu\'une poule.')
      + cm1Redac('Nombre de lapins', '12 ÷ 2 = 6', 'Il y a 6 lapins (et 4 poules). Vérification : 6 × 4 + 4 × 2 = 32.')],
    ['Pour une sortie, 5 accompagnateurs et 142 élèves prennent des cars de 50 places. Combien faut-il de cars ?',
      cm1Redac('Nombre de personnes', '142 + 5 = 147', 'Il y a 147 personnes.') + cm1Redac('Nombre de cars', '147 = (50 × 2) + 47', '2 cars ne suffisent pas, il reste 47 personnes : il faut 3 cars.')],
  ], { titre: 'Rédaction type', lignes: [['Je cherche le prix de la trottinette.', 'Comprendre.'], ['240 ÷ 4 = 60', 'Modéliser et calculer.'], ['La trottinette coûte 60 €.', 'Répondre ; 60 &lt; 240 : plausible.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les problèmes de récréation', [
    'Au VIII<sup>e</sup> siècle, le savant <b>Alcuin</b>, conseiller de Charlemagne, écrit des « problèmes pour aiguiser l\'esprit des jeunes ». Le plus célèbre : comment faire traverser une rivière à un loup, une chèvre et un chou, sans jamais laisser le loup seul avec la chèvre, ni la chèvre avec le chou ?',
    'Le problème des poules et des lapins (têtes et pattes) vient d\'un vieux livre chinois, écrit il y a environ 1 500 ans !',
  ]),
  quiz: [
    { q: 'Tom a 15 ans ; son père a 3 fois plus. Âge du père ?', opts: ['18 ans', '45 ans', '5 ans'], correct: 1 },
    { q: '2 entrées et 5 plats : combien de repas différents ?', opts: ['7', '10', '25'], correct: 1 },
    { q: 'Emma a 20 € ; elle a 5 € de plus que Léo. Combien a Léo ?', opts: ['25 €', '15 €', '4 €'], correct: 1 },
  ],
});
})();

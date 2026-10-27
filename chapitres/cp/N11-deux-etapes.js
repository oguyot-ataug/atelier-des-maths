/* ============================================================
   CHAPITRE : Problèmes en deux étapes (CP, N11, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : résoudre des problèmes additifs
   et soustractifs à deux étapes (ajouter puis retirer, réunir trois quantités, chercher un état
   intermédiaire), les représenter par un dessin ou un schéma en barres, écrire un calcul par étape,
   répondre par une phrase ; repérer les questions intermédiaires.
   Pensé pour être projeté : le schéma en barres qui se construit étape par étape.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Le bus : on suit le nombre de passagers d'un arrêt à l'autre.
function bus(etapes){
  let s = '', x = 6;
  etapes.forEach(([n, tx], i) => {
    s += `<rect x="${x}" y="20" width="88" height="44" rx="8" fill="#F5C842" stroke="${CPC.bord}" stroke-width="2"/><rect x="${x + 8}" y="28" width="20" height="14" fill="#DDF1FA"/><rect x="${x + 34}" y="28" width="20" height="14" fill="#DDF1FA"/><rect x="${x + 60}" y="28" width="20" height="14" fill="#DDF1FA"/><circle cx="${x + 20}" cy="66" r="7" fill="${CPC.bord}"/><circle cx="${x + 70}" cy="66" r="7" fill="${CPC.bord}"/>` + ce2T(x + 44, 58, n, { t: 15, g: 700 });
    if(i < etapes.length - 1) s += `<path d="M${x + 94} 42 H${x + 132}" stroke="${CE2C.violet}" stroke-width="2.5"/><polygon points="${x + 134},42 ${x + 126},37 ${x + 126},47" fill="${CE2C.violet}"/>` + ce2T(x + 113, 30, etapes[i + 1][1], { t: 13, g: 700, c: CE2C.violet });
    x += 140; });
  return cpSvg(x - 46, 80, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Problèmes en deux étapes', slug: 'deux-etapes',
  cours: `
${cm1Lecon(1, 'Une histoire qui se passe en deux fois')}
${cm1Def(`<b>Problème :</b> Dans le bus, il y a 12 passagers. Au premier arrêt, 5 passagers montent. Au deuxième arrêt, 3 passagers descendent. Combien y a-t-il de passagers maintenant ?${lig(bus([[12, ''], [17, '+ 5'], [14, '− 3']]))}`, 'Deux étapes')}
${cm1Regle(`On fait <b>un calcul pour chaque étape</b> :${cm1Liste(['premier arrêt : 12 + 5 = 17 ;', 'deuxième arrêt : 17 − 3 = 14.'])}${P('Il y a <b>14 passagers</b> dans le bus.')}`)}
${cm1Astuce('Avant de calculer, on raconte l\'histoire dans l\'ordre et on se demande : « Que se passe-t-il d\'abord ? Et ensuite ? »')}

${cm1Lecon(2, 'Réunir trois quantités')}
${ce2AnimBarres('cp-n11-barres', { unite: 16, legende: 'Les trois barres se mettent bout à bout ; l\'accolade montre le tout.', lignes: [['Fruits', [[8, '8 pommes', '#E35D3A', 'Dans le panier, il y a 8 pommes…'], [6, '6 poires', '#9BC53D', '… 6 poires…'], [5, '5 kiwis', '#8A6D1F', '… et 5 kiwis.']]]], total: '? fruits', totalTexte: 'Première étape : 8 + 6 = 14. Deuxième étape : 14 + 5 = <b>19</b>. Il y a 19 fruits.' })}
${cm1Regle(`${cm1Liste(['8 + 6 = 14', '14 + 5 = 19'])}${P('On peut aussi commencer par ce qui est facile :')}${cm1Liste(['6 + 5 = 11', '11 + 8 = 19'])}`, 'Calculer')}

${cm1Lecon(3, 'Chercher ce qu\'on ne connaît pas')}
${cm1Def(`<b>Problème :</b> Léa a 20 €. Elle achète un livre à 8 € et un stylo à 3 €. Combien lui reste-t-il ?${lig(cpSchema([[8, 'livre 8', '#2EA8C9'], [3, '3', '#E9C46A'], [9, '?', '#fff']], '20 €', { u: 16 }))}`, 'Un schéma')}
${cm1Regle(`${cm1Liste(['Ce qu\'elle dépense : 8 + 3 = 11.', 'Ce qui reste : 20 − 11 = 9.'])}${P('Il reste <b>9 €</b> à Léa.')}`, 'Les étapes')}

${cm1Lecon(4, 'Bien rédiger')}
${cm1Regle(`Pour chaque étape, j'écris :${cm1Liste(['ce que je cherche (une petite question) ;', 'le calcul ;', 'et à la fin, la phrase réponse.'])}`)}
${cm1Exemple('Exemple', [`Tom a 15 cartes. Il en gagne 6, puis il en donne 4 à sa sœur. Combien en a-t-il ?${cm1Redac('Cartes de Tom', { suite: ['Après avoir gagné : 15 + 6 = 21', 'Après avoir donné : 21 − 4 = 17'] }, 'Tom a 17 cartes.')}`])}
`,
  methode: `
${cm1Demo('cp-n11-m-bus', 'Suivre un problème étape par étape', 'Dans un train, il y a 30 voyageurs. À la gare, 10 descendent, puis 7 montent. Combien y a-t-il de voyageurs ?')}
${cm1Demo('cp-n11-m-achats', 'Problème d\'achats', 'Sam a 15 €. Il achète une balle à 4 € et un yo-yo à 5 €. Combien lui reste-t-il ?')}
`,
  demos: [
    ['cp-n11-m-bus', [
      { expr: 'D\'abord : 10 voyageurs descendent.', note: 'Il y en aura moins.', fig: bus([[30, ''], [20, '− 10']]) },
      { expr: '30 − 10 = 20', note: 'Après la descente, il reste 20 voyageurs.' },
      { expr: 'Ensuite : 7 voyageurs montent.', note: 'Il y en aura plus.', fig: bus([[30, ''], [20, '− 10'], [27, '+ 7']]) },
      { expr: '20 + 7 = 27', note: 'Il y a <b>27 voyageurs</b> dans le train.' },
    ]],
    ['cp-n11-m-achats', [
      { expr: '4 + 5 = 9', note: 'Ce que Sam dépense en tout.' },
      { expr: '15 − 9 = 6', note: 'Ce qui lui reste.', fig: cpSchema([[4, '4', '#E35D3A'], [5, '5', '#2EA8C9'], [6, '?', '#fff']], '15 €', { u: 18 }) },
      { expr: 'Il reste 6 € à Sam.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('cp-n11', [
    ['Dans la cour, 14 enfants jouent. 6 enfants arrivent, puis 5 enfants rentrent en classe. Combien d\'enfants jouent maintenant ?',
      cm1Redac('Enfants dans la cour', { suite: ['14 + 6 = 20', '20 − 5 = 15'] }, '15 enfants jouent dans la cour.')],
    ['Mia a 7 perles rouges, 5 perles bleues et 3 perles vertes. Combien a-t-elle de perles ?',
      cm1Redac('Perles de Mia', { suite: ['7 + 3 = 10', '10 + 5 = 15'] }, 'Mia a 15 perles.', cpSchema([[7, '7', '#E35D3A'], [5, '5', '#2EA8C9'], [3, '3', '#2E9C6A']], '15', { u: 16 }))],
    ['Noé a 20 €. Il achète un ballon à 9 € et des chaussettes à 5 €. Combien lui reste-t-il ?',
      cm1Redac('Argent de Noé', { suite: ['9 + 5 = 14', '20 − 14 = 6'] }, 'Il reste 6 € à Noé.')],
    ['Sur un arbre, il y a 25 oiseaux. 10 oiseaux s\'envolent, puis 4 reviennent. Combien d\'oiseaux sont sur l\'arbre ?',
      cm1Redac('Oiseaux sur l\'arbre', { suite: ['25 − 10 = 15', '15 + 4 = 19'] }, 'Il y a 19 oiseaux sur l\'arbre.')],
    ['Lina lit 8 pages lundi et 9 pages mardi. Son livre a 30 pages. Combien de pages lui reste-t-il à lire ?',
      cm1Redac('Pages à lire', { suite: ['8 + 9 = 17', '30 − 17 = 13'] }, 'Il reste 13 pages à lire.', cpSchema([[8, '8', '#2EA8C9'], [9, '9', '#7A4FC0'], [13, '?', '#fff']], '30 pages', { u: 9 }))],
    ['Dans une boîte, il y a 40 crayons. La maîtresse en donne 20 à une classe et 10 à une autre. Combien en reste-t-il ?',
      cm1Redac('Crayons qui restent', { suite: ['20 + 10 = 30', '40 − 30 = 10'] }, 'Il reste 10 crayons dans la boîte.')],
    ['Paul avait des billes. Il en a gagné 5, puis il en a perdu 2. Maintenant, il en a 13. Combien en avait-il au début ?',
      cm1Redac('Billes au début', { suite: ['13 + 2 = 15', '15 − 5 = 10'] }, 'On remonte l\'histoire à l\'envers : avant de perdre 2 billes, il en avait 15 ; avant d\'en gagner 5, il en avait 10. Paul avait 10 billes au début.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les problèmes les plus anciens', [
    'Les plus vieux problèmes de mathématiques que l\'on connaisse ont près de <b>4 000 ans</b>. Ils ont été écrits sur des tablettes d\'argile en Mésopotamie et sur des papyrus en Égypte : partager du pain, compter des moutons, calculer la paille pour les briques…',
    'Les élèves scribes devaient déjà les résoudre étape par étape, et les maîtres vérifiaient le résultat, comme aujourd\'hui !',
  ]),
  quiz: [
    { q: 'J\'ai 10 billes. J\'en gagne 5, puis j\'en perds 3. J\'en ai…', opts: ['12', '18', '8'], correct: 0 },
    { q: '6 pommes, 4 poires, 3 kiwis : combien de fruits ?', opts: ['13', '10', '12'], correct: 0 },
    { q: 'Dans un problème en deux étapes, on écrit…', opts: ['un seul calcul', 'un calcul pour chaque étape', 'aucun calcul'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '12 + 5 = …', r: ['17', '7', '15', '18'], ok: 0 },
    { l: 1, q: '17 − 3 = …', r: ['14', '20', '13', '15'], ok: 0 },
    { l: 2, q: '5 + 5 + 4 = …', r: ['14', '10', '15', '9'], ok: 0 },
    { l: 2, q: '3 + 7 + 6 = …', r: ['16', '10', '13', '15'], ok: 0 },
    { l: 3, q: 'J\'ai 10 €, je dépense 3 € puis 2 €. Il me reste…', r: ['5 €', '7 €', '15 €', '8 €'], ok: 0 },
    { l: 4, q: 'Tom a 8 cartes, il en gagne 2 puis en gagne 5. Il en a…', r: ['15', '10', '13', '6'], ok: 0 },
  ],
});
})();

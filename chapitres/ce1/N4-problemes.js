/* ============================================================
   CHAPITRE : Problèmes : ajouter, retirer, comparer (CE1, N4, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : résoudre des problèmes additifs
   et soustractifs à une ou deux étapes (réunion, transformation, recherche de l'état initial ou de
   la transformation, comparaison « de plus, de moins »), en les modélisant par un schéma en barres ;
   écrire le calcul et une phrase réponse.
   Pensé pour être projeté : les schémas en barres qui se construisent.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Problèmes : ajouter, retirer, comparer', slug: 'problemes',
  cours: `
${cm1Lecon(1, 'Le tout et les parties')}
${ce2AnimBarres('ce1-n4-tout', { unite: 6, legende: 'Les parties se mettent bout à bout : l\'accolade montre le tout.', lignes: [['Élèves', [[34, '34 filles', '#E35D3A', 'Dans l\'école, il y a 34 filles…'], [29, '29 garçons', '#2EA8C9', '… et 29 garçons.']]]], total: '? élèves', totalTexte: 'Le tout : 34 + 29 = <b>63</b>. Il y a 63 élèves.' })}
${cm1Regle(`${cm1Liste(['On cherche le <b>tout</b> : on ajoute les parties.', 'On cherche une <b>partie</b> : on enlève l\'autre partie au tout (ou on cherche ce qu\'il manque).'])}`, 'Avec un schéma')}
${cm1Exemple('Exemple', [`Il y a 63 élèves, dont 34 filles. Combien de garçons ?${lig(cpSchema([[34, '34', '#E35D3A'], [29, '?', '#fff']], '63', { u: 5 }))}${cm1Redac('Nombre de garçons', { suite: ['34 + 29 = 63', '63 − 34 = 29'] }, 'Il y a 29 garçons.')}`])}

${cm1Lecon(2, 'Avant, après')}
${cm1Def(`Une quantité change : on gagne, on perd, des gens montent, descendent…${cm1Liste(['on connaît le <b>début</b> et le <b>changement</b> : on calcule la <b>fin</b> ;', 'on connaît la fin et le changement : on remonte le temps pour trouver le début ;', 'on connaît le début et la fin : on cherche le changement.'])}`, 'Les transformations')}
${cm1Exemple('Chercher le début', [`Léo a gagné 12 billes. Maintenant il en a 45. Combien en avait-il avant ?${cm1Redac('Billes au début', '45 − 12 = 33', 'Léo avait 33 billes avant.')}`])}

${cm1Lecon(3, 'Comparer : de plus, de moins')}
${ce2AnimBarres('ce1-n4-compare', { unite: 6, legende: 'Les deux barres partent du même point : l\'écart, c\'est ce qui dépasse.', lignes: [['Sam', [[38, '38 cartes', '#2EA8C9', 'Sam a 38 cartes.']]], ['Nina', [[38, '38', '#E35D3A', 'Nina en a autant…'], [15, '15', '#E9C46A', '… et 15 de plus.']]]], total: '? cartes', totalTexte: 'Nina a 38 + 15 = <b>53</b> cartes.' })}
${cm1Regle('« 15 de plus que 38 » : on ajoute, 38 + 15. « 15 de moins que 38 » : on enlève, 38 − 15. Pour trouver l\'<b>écart</b> entre deux nombres, on cherche ce qu\'il faut ajouter au plus petit pour obtenir le plus grand.', 'Comparer')}

${cm1Lecon(4, 'Problèmes à deux étapes')}
${cm1Exemple('Exemple', [`Dans un bus, il y a 25 passagers. 12 montent, puis 8 descendent. Combien de passagers maintenant ?${cm1Redac('Passagers', { suite: ['25 + 12 = 37', '37 − 8 = 29'] }, 'Il y a 29 passagers dans le bus.')}`])}
${cm1Astuce('Avant de calculer, on se pose la question : « Qu\'est-ce que je cherche d\'abord ? »')}
`,
  methode: `
${cm1Demo('ce1-n4-m-partie', 'Chercher une partie', 'Un livre a 80 pages. Zoé en a lu 35. Combien de pages lui reste-t-il à lire ?')}
${cm1Demo('ce1-n4-m-ecart', 'Chercher un écart', 'Tom mesure 125 cm, sa sœur 98 cm. De combien Tom est-il plus grand ?')}
`,
  demos: [
    ['ce1-n4-m-partie', [
      { expr: 'Le tout : 80 pages. Une partie : 35 pages lues.', note: 'Je cherche l\'autre partie.', fig: cpSchema([[35, '35', '#2EA8C9'], [45, '?', '#fff']], '80 pages', { u: 4 }) },
      { expr: '35 + 45 = 80', note: 'J\'avance de 35 à 80 : + 5 jusqu\'à 40, puis + 40.' },
      { expr: '80 − 35 = 45', note: 'Je vérifie par une soustraction.' },
      { expr: 'Il reste 45 pages à lire.', note: 'La phrase réponse.' },
    ]],
    ['ce1-n4-m-ecart', [
      { expr: 'Je cherche l\'écart entre 98 et 125.', note: 'Ce qui dépasse.' },
      { expr: '98 + 2 = 100', note: 'D\'abord jusqu\'à 100.' },
      { expr: '100 + 25 = 125', note: 'Puis jusqu\'à 125.' },
      { expr: '2 + 25 = 27', note: 'Tom est plus grand de <b>27 cm</b>.' },
    ]],
  ],
  exos: cm1Exos('ce1-n4', [
    ['Au cinéma, il y a 46 adultes et 38 enfants. Combien de spectateurs y a-t-il ?',
      cm1Redac('Spectateurs', '46 + 38 = 84', 'Il y a 84 spectateurs.')],
    ['Une classe a 90 € pour une sortie. Le car coûte 65 €. Combien reste-t-il ?',
      cm1Redac('Argent qui reste', '90 − 65 = 25', 'Il reste 25 €.')],
    ['Lina avait 54 perles. Elle en a donné. Il lui en reste 30. Combien en a-t-elle donné ?',
      cm1Redac('Perles données', '54 − 30 = 24', 'Lina a donné 24 perles.')],
    ['Paul a 47 timbres. Son frère en a 18 de plus. Combien de timbres a son frère ?',
      cm1Redac('Timbres du frère', '47 + 18 = 65', 'Le frère de Paul a 65 timbres.')],
    ['Un arbre mesure 350 cm. Un autre mesure 200 cm de moins. Combien mesure le deuxième arbre ?',
      cm1Redac('Le deuxième arbre', '350 − 200 = 150', 'Le deuxième arbre mesure 150 cm.')],
    ['Hugo a 62 images, Inès en a 85. Combien Inès en a-t-elle de plus que Hugo ?',
      cm1Redac('Images de plus', { suite: ['62 + 8 = 70', '70 + 15 = 85', '8 + 15 = 23'] }, 'Inès a 23 images de plus que Hugo.')],
    ['Dans une bibliothèque, il y a 120 livres. On en prête 35, puis on en rend 20. Combien de livres y a-t-il maintenant ?',
      cm1Redac('Livres de la bibliothèque', { suite: ['120 − 35 = 85', '85 + 20 = 105'] }, 'Il y a 105 livres dans la bibliothèque.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le schéma en barres', [
    'Le <b>schéma en barres</b> est utilisé depuis longtemps à <b>Singapour</b>, un petit pays d\'Asie dont les élèves comptent parmi les meilleurs du monde en mathématiques.',
    'Les enseignants de Singapour l\'ont développé dans les années 1980 : avant de calculer, on dessine ! Aujourd\'hui, beaucoup d\'écoles françaises l\'utilisent aussi.',
  ]),
  quiz: [
    { q: '45 filles et 38 garçons. Combien d\'enfants ?', opts: ['83', '7', '73'], correct: 0 },
    { q: 'Tom a 20 € de moins que Léa, qui a 75 €. Tom a…', opts: ['55 €', '95 €', '20 €'], correct: 0 },
    { q: 'Pour trouver un écart, on cherche…', opts: ['ce qu\'il faut ajouter au plus petit', 'le double', 'le plus grand'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '30 + 25 = …', r: ['55', '5', '45', '65'], ok: 0 },
    { l: 1, q: 'Tout 50, une partie 20. L\'autre partie ?', r: ['30', '70', '20', '25'], ok: 0 },
    { l: 2, q: 'J\'avais 40 billes, j\'en perds 15. J\'en ai…', r: ['25', '55', '35', '15'], ok: 0 },
    { l: 3, q: '10 de plus que 64, c\'est…', r: ['74', '54', '65', '164'], ok: 0 },
    { l: 3, q: 'Écart entre 70 et 100 ?', r: ['30', '170', '40', '20'], ok: 0 },
    { l: 4, q: '50, + 20, − 10, ça fait…', r: ['60', '80', '40', '70'], ok: 0 },
  ],
});
})();

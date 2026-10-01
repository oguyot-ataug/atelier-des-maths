/* ============================================================
   CHAPITRE : Problèmes multiplicatifs (CE2, N12, période 5)
   Programme du cycle 2 (CE2) : problèmes multiplicatifs en une étape (valeur du tout ; partage
   équitable : valeur d'une part avec un schéma en barre, nombre de parts sur un champ réduit) ;
   comparaison multiplicative « fois plus / fois moins », distinguée de « de plus / de moins »
   (la trottinette 4 fois plus chère que le casque à 32 €) ; produits cartésiens : tableau
   (3 pantalons × 7 tee-shirts) ou arbre (le clown : 2 chapeaux, 3 tee-shirts, 2 pantalons).
   ============================================================ */
(() => {
cm1Chapitre({
  niveau: 'ce2', titre: 'Problèmes multiplicatifs', slug: 'problemes-multiplicatifs',
  cours: `
${cm1Lecon(1, 'Chercher le tout ou une part')}
${cm1Regle('Quand on connaît <b>le nombre de parts</b> et <b>la valeur d\'une part</b>, on trouve le tout par une <b>multiplication</b>. Quand on connaît le tout et le nombre de parts égales, on trouve une part par une <b>division</b> (en s\'aidant des tables).')}
${cm1Exemple('Exemples :', ['8 paquets de 125 feuilles : 8 × 125 = <b>1 000 feuilles</b>.', '6 dictionnaires coûtent 72 € : 72 ÷ 6 = <b>12 €</b> chacun.', 'On vérifie : 6 × 12 = 72.'])}
${ce2AnimPartage('ce2-pm-partage', { legende: 'Un jeton = 1 €. On distribue les 72 € un par un entre les 6 dictionnaires.', presets: [{ nom: '72 € pour 6 dictionnaires', total: 72, parts: 6, etiq: 'livre', objets: 'euros', fin: 'Chaque dictionnaire reçoit 12 jetons : il coûte <b>12 €</b>, car 72 ÷ 6 = 12.' }] })}

${cm1Lecon(2, '« Fois plus », « fois moins »')}
${cm1Regle('« <b>4 fois plus</b> cher » : on <b>multiplie</b> par 4. « <b>4 fois moins</b> cher » : on <b>divise</b> par 4. Ne pas confondre avec « 4 € <b>de plus</b> » (on ajoute 4) !')}
${cm1Exemple('Une trottinette coûte 4 fois plus cher qu\'un casque. Le casque coûte 32 €.')}
${ce2AnimBarres('ce2-pm-fois', { unite: 1, lignes: [['Casque', [[70, '32 €', '#E9C46A', 'Le casque coûte 32 €.']]], ['Trottinette', [[70, '32 €', '#2EA8C9', '4 fois plus cher : la barre de la trottinette, c\'est 4 barres du casque.'], [70, '32 €', '#2EA8C9', ''], [70, '32 €', '#2EA8C9', ''], [70, '32 €', '#2EA8C9', '']]]], total: '? €', totalTexte: 'La trottinette coûte 4 × 32 = <b>128 €</b>. (Avec 4 € de plus, elle coûterait 36 €.)' })}


${cm1Lecon(3, 'Compter toutes les possibilités')}
${cm1Regle('Pour compter toutes les façons d\'associer des objets, on fait un <b>tableau</b> (2 sortes d\'objets) ou un <b>arbre</b> (3 sortes ou plus). Le nombre de possibilités s\'obtient par une <b>multiplication</b>.')}
${cm1Exemple('Une poupée a 3 pantalons et 7 tee-shirts : un tableau de 3 lignes et 7 colonnes a 3 × 7 = <b>21 cases</b>, donc 21 tenues.')}
${cm1Exemple('Un clown a 2 chapeaux, 3 tee-shirts et 2 pantalons :')}
${ce2AnimArbre('ce2-pm-arbre', { niveaux: [{ nom: 'Chapeau', choix: [['chapeau rouge', '#D62828'], ['chapeau bleu', '#2E6FD6']] }, { nom: 'Tee-shirt', choix: [['violet', '#7A4FC0'], ['noir', '#222'], ['jaune', '#E9B21A']] }, { nom: 'Pantalon', choix: [['pantalon gris', '#888'], ['pantalon vert', '#2E9C6A']] }], fin: 'On compte les branches au bout de l\'arbre : 2 × 3 × 2 = <b>12 costumes</b>.' })}

`,
  methode: `
${cm1Demo('ce2-pm-moins', 'Résoudre un problème « fois moins »', 'Un vélo coûte 240 €. Un ballon coûte 8 fois moins cher. Combien coûte le ballon ?')}
${cm1Demo('ce2-pm-tableau', 'Compter des menus avec un tableau', 'À la cantine, on choisit une entrée parmi 3 et un dessert parmi 4. Combien de menus différents ?')}
`,
  demos: [
    ['ce2-pm-moins', [
      { expr: '« 8 fois moins cher » : on divise par 8.', note: 'Le vélo vaut 8 fois le prix du ballon.' },
      { expr: '8 × 30 = 240', note: 'Je cherche « 8 fois combien font 240 ? »' },
      { expr: '240 ÷ 8 = 30', note: '' },
      { expr: 'Le ballon coûte 30 €.', note: 'Vérification : 8 × 30 = 240 ✔' },
    ]],
    ['ce2-pm-tableau', [
      { expr: cm1Tableau(['', 'D1', 'D2', 'D3', 'D4'], [['E1', '✔', '✔', '✔', '✔'], ['E2', '✔', '✔', '✔', '✔'], ['E3', '✔', '✔', '✔', '✔']]), note: 'Une ligne par entrée, une colonne par dessert : chaque case est un menu.' },
      { expr: '3 × 4 = 12', note: '3 lignes de 4 cases.' },
      { expr: 'Il y a 12 menus différents.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-pm', [
    ['Un carnet coûte 3 €. Combien coûtent 25 carnets ?',
      cm1Redac('Prix de 25 carnets', '25 × 3 = 75', '25 carnets coûtent 75 €.')],
    ['Paul a 9 ans. Son grand-père a 7 fois plus. Quel âge a son grand-père ?',
      cm1Redac('Âge du grand-père', '9 × 7 = 63', 'Le grand-père de Paul a 63 ans.')],
    ['Un livre coûte 18 €. Un magazine coûte 3 fois moins cher. Combien coûte le magazine ?',
      cm1Redac('Prix du magazine', { suite: ['3 × 6 = 18', '18 ÷ 3 = 6'] }, 'Le magazine coûte 6 €.')],
    ['Léa a 12 billes. Tom en a 3 de plus. Hugo en a 3 fois plus que Léa. Combien de billes ont Tom et Hugo ?',
      cm1Redac('Billes de Tom', '12 + 3 = 15', 'Tom a 15 billes.') + cm1Redac('Billes de Hugo', '12 × 3 = 36', 'Hugo a 36 billes.')],
    ['On a 4 sortes de pain et 5 sortes de fromage. Combien de sandwichs différents peut-on faire avec un pain et un fromage ?',
      cm1Redac('Nombre de sandwichs', '4 × 5 = 20', 'On peut faire 20 sandwichs différents (un tableau de 4 lignes et 5 colonnes).')],
    ['Une glace se compose d\'un cornet (2 sortes), d\'un parfum (3 sortes) et d\'une sauce (2 sortes). Combien de glaces différentes peut-on faire ?',
      cm1Redac('Nombre de glaces', ['2 × 3 × 2', '6 × 2', '12'], 'On peut faire 12 glaces différentes (on peut le vérifier avec un arbre).')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les arbres de choix', [
    'Les <b>arbres</b> servent à compter les possibilités depuis longtemps. Au XVII<sup>e</sup> siècle, les mathématiciens français <b>Blaise Pascal</b> et <b>Pierre de Fermat</b> s\'écrivaient des lettres pour résoudre des problèmes de jeux de dés : ils devaient compter tous les cas possibles. C\'est le début du calcul des probabilités.',
  ]),
  quiz: [
    { q: 'Un casque coûte 20 €. Un vélo coûte 5 fois plus. Le vélo coûte…', opts: ['25 €', '100 €', '4 €'], correct: 1 },
    { q: '2 chapeaux et 4 écharpes : combien de tenues ?', opts: ['6', '8', '16'], correct: 1 },
    { q: 'Un jeu coûte 36 €, une balle 4 fois moins. La balle coûte…', opts: ['9 €', '32 €', '144 €'], correct: 0 },
  ],
  flash: [
    { q: 'Un stylo coûte 2 €. Combien coûtent 15 stylos ?', r: ['17 €', '30 €', '13 €', '25 €'], ok: 1 },
    { q: 'Léa a 6 ans. Sa mère a 6 fois plus. Âge de sa mère ?', r: ['12 ans', '36 ans', '30 ans', '42 ans'], ok: 1 },
    { q: 'Un vélo coûte 200 €, un casque 5 fois moins. Le casque coûte…', r: ['40 €', '195 €', '1 000 €', '50 €'], ok: 0 },
    { q: '3 pantalons et 4 pulls : combien de tenues ?', r: ['7', '12', '10', '34'], ok: 1 },
    { q: '« 3 de plus que 10 », c\'est…', r: ['13', '30', '7', '103'], ok: 0 },
    { q: '« 3 fois plus que 10 », c\'est…', r: ['13', '30', '7', '103'], ok: 1 },
    { q: '6 amis se partagent 42 bonbons. Chacun en a…', r: ['6', '7', '8', '36'], ok: 1 },
  ],
});
})();

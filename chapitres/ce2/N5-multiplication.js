/* ============================================================
   CHAPITRE : La multiplication (CE2, N5, période 2)
   Programme du cycle 2 (CE2) : sens de la multiplication (addition itérée, quadrillage) ;
   commutativité ; mots « facteur », « produit », « multiple » (pairs = multiples de 2) ;
   multiplier par 10 et par 100 (chaque chiffre prend une valeur 10 fois plus grande) ;
   multiplier par 4 (2 fois 2) ou par 8 ; par un nombre entier de dizaines (9 × 40) ;
   décomposer un facteur (23 × 7 = 20 × 7 + 3 × 7). La multiplication posée vient en période 4.
   ============================================================ */
(() => {
cm1Chapitre({
  niveau: 'ce2', titre: 'La multiplication', slug: 'multiplication',
  cours: `
${cm1Lecon(1, 'Le sens de la multiplication')}
${cm1Regle('Quand on ajoute <b>plusieurs fois le même nombre</b>, on peut écrire une <b>multiplication</b>. 5 + 5 + 5 + 5 = <b>4 × 5</b> = 20. On lit « 4 fois 5 ».')}
${ce2AnimJetons('ce2-mu-jetons', { l: 4, c: 5 })}
${cm1Regle('On peut changer l\'ordre des deux nombres : <b>4 × 5 = 5 × 4</b>. On choisit l\'ordre qui rend le calcul le plus facile.', 'Propriété')}

${cm1Lecon(2, 'Les mots de la multiplication')}
${cm1Def(`<ul style="margin:0;padding-left:20px;line-height:1.8;"><li>Dans <b>3 × 25 = 75</b> : 3 et 25 sont les <b>facteurs</b>, 75 est le <b>produit</b>. « Le produit de 3 et de 25 est 75. »</li><li>75 est un <b>multiple</b> de 25 (et de 3) : il est dans la « table » de 25.</li><li>Les nombres <b>pairs</b> (0, 2, 4, 6, 8…) sont les multiples de 2. Les nombres <b>impairs</b> ne sont pas des multiples de 2.</li></ul>`, 'Vocabulaire')}

${cm1Lecon(3, 'Multiplier par 10 et par 100')}
${cm1Regle('Quand on multiplie par <b>10</b>, chaque chiffre prend une valeur <b>10 fois plus grande</b> : les unités deviennent des dizaines, les dizaines des centaines, les centaines des milliers. On écrit donc un <b>0</b> à droite. Par <b>100</b>, chaque chiffre prend une valeur 100 fois plus grande : on écrit <b>00</b> à droite.')}
${ce2AnimGlisse('ce2-mu-glisse', { presets: [{ nom: '724 × 10', n: 724, f: 10 }, { nom: '36 × 10', n: 36, f: 10 }, { nom: '58 × 100', n: 58, f: 100 }, { nom: '9 × 100', n: 9, f: 100 }] })}
${cm1Exemple('Exemples :', ['36 × 10 = 360', '58 × 100 = 5 800', '9 × 40 = 9 × 4 × 10 = 36 × 10 = <b>360</b>'])}

${cm1Lecon(4, 'Des astuces de calcul')}
${cm1Regle('Multiplier par <b>4</b>, c\'est multiplier par 2, puis encore par 2. Multiplier par <b>8</b>, c\'est multiplier 3 fois de suite par 2.', 'Astuce')}
${cm1Exemple('4 × 37 :', ['2 × 37 = 74', '2 × 74 = 148', 'donc 4 × 37 = <b>148</b>'])}
${cm1Exemple('8 × 27 :', ['2 × 27 = 54', '2 × 54 = 108', '2 × 108 = 216', 'donc 8 × 27 = <b>216</b>'])}
${cm1Regle('Pour calculer 23 × 7, on <b>décompose</b> 23 en 20 + 3 : « 23 fois 7, c\'est 20 fois 7 plus 3 fois 7 ».', 'Astuce')}
${cm1Exemple('23 × 7 :', ['20 × 7 = 140', '3 × 7 = 21', '140 + 21 = 161', 'donc 23 × 7 = <b>161</b>'])}
${cm1Rem(`Les décompositions de 60 sont utiles :${cm1Liste(['1 × 60', '2 × 30', '3 × 20', '4 × 15', '5 × 12', '6 × 10'])}`)}
`,
  methode: `
${cm1Demo('ce2-mu-dec', 'Calculer un produit en décomposant', 'Calcule 34 × 6 de tête.')}
${cm1Demo('ce2-mu-pb', 'Reconnaître une multiplication dans un problème', 'Une boîte contient 8 crayons. Combien de crayons dans 7 boîtes ?')}
`,
  demos: [
    ['ce2-mu-dec', [
      { expr: '34 = 30 + 4', note: 'On décompose le plus grand facteur.' },
      { expr: '30 × 6 = 180', note: '3 × 6 = 18, puis × 10.' },
      { expr: '4 × 6 = 24', note: '' },
      { expr: '180 + 24 = 204', note: '« 34 fois 6, c\'est 30 fois 6 plus 4 fois 6. »' },
      { expr: '34 × 6 = 204', note: '' },
    ]],
    ['ce2-mu-pb', [
      { expr: '8 + 8 + 8 + 8 + 8 + 8 + 8', note: 'On ajoute 7 fois le même nombre : c\'est une multiplication.' },
      { expr: '7 × 8 = 56', note: 'On utilise la table de 8 (ou de 7).' },
      { expr: 'Il y a 56 crayons dans 7 boîtes.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-mu', [
    ['Lisa met 6 billes dans chacun de ses 5 sacs. Écris le calcul avec une addition, puis avec une multiplication. Combien a-t-elle de billes ?',
      cm1Redac('Nombre de billes', { suite: ['6 + 6 + 6 + 6 + 6 = 30', '5 × 6 = 30'] }, 'Lisa a 30 billes.')],
    ['Une boîte contient 45 trombones. Combien de trombones dans 10 boîtes ? Et dans 100 boîtes ?',
      cm1Redac('Trombones dans 10 boîtes', '45 × 10 = 450', 'Il y a 450 trombones dans 10 boîtes.')
      + cm1Redac('Trombones dans 100 boîtes', '45 × 100 = 4 500', 'Il y a 4 500 trombones dans 100 boîtes.')],
    ['Un car transporte 30 élèves. Combien d\'élèves transportent 7 cars ?',
      cm1Redac('Nombre d\'élèves', ['7 × 3 × 10', '21 × 10', '210'], '7 cars transportent 210 élèves.')],
    ['Un paquet contient 25 images. Combien d\'images dans 4 paquets ? Calcule en doublant.',
      cm1Redac('Nombre d\'images', { suite: ['2 × 25 = 50', '2 × 50 = 100'] }, 'Il y a 100 images dans 4 paquets.')],
    ['Au cinéma, une rangée a 13 fauteuils. Combien de fauteuils dans 5 rangées ? Calcule en décomposant 13.',
      cm1Redac('Nombre de fauteuils', ['10 × 5 + 3 × 5', '50 + 15', '65'], 'Il y a 65 fauteuils dans 5 rangées.')],
    [`Complète ces égalités.${cm1Liste(['2 × … = 70', '60 = 4 × …', '1 000 = 2 × …'])}`,
      cm1Redac('Première égalité', '2 × 35 = 70', 'Le nombre manquant est 35.')
      + cm1Redac('Deuxième égalité', '60 = 4 × 15', 'Le nombre manquant est 15.')
      + cm1Redac('Troisième égalité', '1 000 = 2 × 500', 'Le nombre manquant est 500.')],
    ['Parmi 14, 25, 30, 47 et 52, lesquels sont des multiples de 2 ?',
      cm1Redac('Multiples de 2', { suite: ['14 = 2 × 7', '30 = 2 × 15', '52 = 2 × 26'] }, '14, 30 et 52 sont des multiples de 2 : ce sont des nombres pairs. 25 et 47 sont impairs.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le signe ×', [
    'Le signe <b>×</b> a été utilisé pour la première fois par le mathématicien anglais <b>William Oughtred</b> en <b>1631</b>. Il est bien pratique… mais il ressemble à la lettre x ! C\'est pourquoi, plus tard, on utilisera aussi un petit point pour la multiplication.',
  ]),
  quiz: [
    { q: '5 + 5 + 5 = …', opts: ['3 × 5', '5 × 5', '3 + 5'], correct: 0 },
    { q: '64 × 10 = …', opts: ['604', '640', '6 400'], correct: 1 },
    { q: 'Dans 3 × 25 = 75, le nombre 75 est…', opts: ['un facteur', 'le produit', 'la somme'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '7 × 8 = …', r: ['54', '56', '48', '63'], ok: 1 },
    { l: 3, q: '38 × 10 = …', r: ['380', '3 800', '308', '48'], ok: 0 },
    { l: 3, q: '25 × 100 = …', r: ['250', '2 500', '25 000', '2 050'], ok: 1 },
    { l: 4, q: '6 × 40 = …', r: ['24', '240', '2 400', '46'], ok: 1 },
    { l: 2, q: 'Quel nombre est un multiple de 2 ?', r: ['27', '33', '48', '51'], ok: 2 },
    { l: 4, q: '4 × 25 = …', r: ['50', '75', '100', '125'], ok: 2 },
    { l: 4, q: '12 × 3 = …', r: ['15', '33', '36', '39'], ok: 2 },
    { l: 1, q: "3 + 3 + 3 + 3 = …", r: ["3 × 4", "3 + 4", "4 + 4", "33"], ok: 0 },
    { l: 2, q: "Le résultat d'une multiplication s'appelle…", r: ["le produit", "la somme", "la différence", "le quotient"], ok: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Ajouter, retirer : premiers problèmes (CP, N4, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : résoudre des problèmes
   additifs et soustractifs à une étape (ajouter, retirer, réunir, chercher ce qui reste), les
   modéliser avec des objets, des dessins et des schémas en barres, écrire l'opération avec + et −,
   calculer en avançant ou en reculant sur la bande des nombres, répondre par une phrase.
   Pensé pour être projeté : la boîte où l'on ajoute ou retire des jetons et le schéma en barres sont animés.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const barre = cpSchema, sauts = cpSautsBande, jetons = cpJetons, bleus = cpBleus;

cm1Chapitre({
  niveau: 'cp', titre: 'Ajouter, retirer : premiers problèmes', slug: 'ajouter-retirer',
  cours: `
${cm1Lecon(1, 'Ajouter : le signe +')}
${cpAnimAjouter('cp-n4-ajouter', { mode: 'ajouter', a: 5, b: 3 })}
${cm1Def(`<b>Ajouter</b>, c'est mettre en plus. Le nombre devient <b>plus grand</b>.${lig(jetons(7, 0, bleus(4, 3)))}<p style="text-align:center;margin:2px 0;">4 jetons, on en ajoute 3 : <b>4 + 3 = 7</b>.</p>`, 'Ajouter')}
${cm1Rem('Le signe <b>+</b> se lit « plus ». On l\'utilise aussi quand on <b>réunit</b> deux paquets : 4 billes rouges et 3 billes bleues, cela fait 4 + 3 = 7 billes.')}

${cm1Lecon(2, 'Retirer : le signe −')}
${cpAnimAjouter('cp-n4-retirer', { mode: 'retirer', a: 8, b: 3, legende: 'On retire des jetons de la boîte. Faites pause : « Combien en reste-t-il ? » Puis vérifiez en comptant ceux qui restent.' })}
${cm1Def(`<b>Retirer</b>, c'est enlever. Le nombre devient <b>plus petit</b>.${lig(jetons(8, 3))}<p style="text-align:center;margin:2px 0;">8 jetons, on en retire 3 (barrés) : <b>8 − 3 = 5</b>. Il en reste 5.</p>`, 'Retirer')}
${cm1Rem('Le signe <b>−</b> se lit « moins ». Retirer, enlever, perdre, manger, donner… : tous ces mots disent qu\'il y en a <b>moins</b> à la fin.')}

${cm1Lecon(3, 'Résoudre un problème')}
${cm1Regle(`Pour résoudre un problème :${cm1Liste(['j\'écoute ou je lis l\'histoire, et je la <b>raconte</b> avec mes mots ;', 'je la <b>montre</b> avec des jetons, un dessin ou un schéma ;', 'je <b>calcule</b> ;', 'je réponds par une <b>phrase</b>.'])}`, 'Les étapes')}
${ce2AnimBarres('cp-n4-barres', { unite: 34, legende: 'Le schéma en barres : la longueur de chaque barre montre le nombre de billes. L\'accolade montre le tout.', lignes: [['Billes', [[4, '4', '#E35D3A', 'Léo a 4 billes rouges…'], [3, '3', '#2EA8C9', '… et 3 billes bleues.']]]], total: '? billes', totalTexte: 'En tout : 4 + 3 = <b>7</b>. Léo a 7 billes.' })}
${cm1Exemple('Exemple', [`<b>Problème :</b> Mia a 9 bonbons. Elle en mange 4. Combien lui en reste-t-il ?${lig(jetons(9, 4))}${cm1Redac('Bonbons qui restent', '9 − 4 = 5', 'Il reste 5 bonbons à Mia.')}`])}

${cm1Lecon(4, 'Calculer en avançant ou en reculant')}
${cm1Regle(`Pour <b>ajouter</b> un petit nombre, j'avance sur la bande des nombres.${lig(sauts(6, 3, { a: 11 }))}<p style="text-align:center;margin:2px 0;">6 + 3 : je pars de 6 et je dis 7, 8, 9. <b>6 + 3 = 9</b>.</p>`, 'J\'avance')}
${cm1Regle(`Pour <b>retirer</b> un petit nombre, je recule.${lig(sauts(10, -2, { a: 11 }))}<p style="text-align:center;margin:2px 0;">10 − 2 : je pars de 10 et je dis 9, 8. <b>10 − 2 = 8</b>.</p>`, 'Je recule')}
${cm1Astuce('Pour ajouter, on part du <b>plus grand</b> nombre : 2 + 7, c\'est comme 7 + 2 ; je pars de 7 et je dis 8, 9. Plus rapide !')}
`,
  methode: `
${cm1Demo('cp-n4-m-ajout', 'Résoudre un problème où l\'on ajoute', 'Dans le bus, il y a 6 enfants. À l\'arrêt, 3 enfants montent. Combien d\'enfants y a-t-il dans le bus ?')}
${cm1Demo('cp-n4-m-retrait', 'Résoudre un problème où l\'on retire', 'Sur l\'arbre, il y a 7 oiseaux. 2 oiseaux s\'envolent. Combien d\'oiseaux restent sur l\'arbre ?')}
`,
  demos: [
    ['cp-n4-m-ajout', [
      { expr: 'Je raconte : il y a des enfants, d\'autres arrivent.', note: 'Des enfants <b>montent</b> : il y en aura <b>plus</b>. C\'est un problème où l\'on ajoute.' },
      { expr: 'Je montre avec des jetons.', note: '6 jetons rouges pour les enfants du bus, 3 bleus pour ceux qui montent.', fig: jetons(9, 0, bleus(6, 3)) },
      { expr: '6 + 3 = 9', note: 'Je pars de 6 et j\'avance de 3 : 7, 8, 9.', fig: sauts(6, 3, { a: 10 }) },
      { expr: 'Il y a 9 enfants dans le bus.', note: 'Je réponds par une phrase.' },
    ]],
    ['cp-n4-m-retrait', [
      { expr: 'Je raconte : il y a des oiseaux, certains s\'en vont.', note: 'Des oiseaux <b>s\'envolent</b> : il en restera <b>moins</b>. C\'est un problème où l\'on retire.' },
      { expr: 'Je dessine 7 oiseaux et je barre ceux qui partent.', note: 'J\'en barre 2.', fig: jetons(7, 2) },
      { expr: '7 − 2 = 5', note: 'Je compte ceux qui ne sont pas barrés : 5. Ou je recule de 2 : 6, 5.', fig: sauts(7, -2, { a: 10 }) },
      { expr: 'Il reste 5 oiseaux sur l\'arbre.', note: 'Je réponds par une phrase.' },
    ]],
  ],
  exos: cm1Exos('cp-n4', [
    ['Sam a 5 voitures. Pour son anniversaire, on lui en donne 2. Combien a-t-il de voitures maintenant ?',
      cm1Redac('Voitures de Sam', '5 + 2 = 7', 'Sam a 7 voitures maintenant.', jetons(7, 0, bleus(5, 2)))],
    ['Il y a 8 gâteaux sur le plat. Les enfants en mangent 3. Combien de gâteaux reste-t-il ?',
      cm1Redac('Gâteaux qui restent', '8 − 3 = 5', 'Il reste 5 gâteaux sur le plat.', jetons(8, 3))],
    ['Dans un bouquet, il y a 4 roses et 5 tulipes. Combien de fleurs y a-t-il dans le bouquet ?',
      cm1Redac('Fleurs du bouquet', '4 + 5 = 9', 'Il y a 9 fleurs dans le bouquet.', barre([[4, '4', '#E35D3A'], [5, '5', '#F5B700']], '9 fleurs', { u: 22 }))],
    ['Inès a 10 ballons. 4 ballons s\'envolent. Combien de ballons lui reste-t-il ?',
      cm1Redac('Ballons qui restent', '10 − 4 = 6', 'Il reste 6 ballons à Inès.', jetons(10, 4))],
    [`Calcule en avançant sur la bande : 7 + 3.${lig(sauts(7, 0, { a: 11 }))}`,
      cm1Redac('7 + 3', '7 + 3 = 10', 'Je pars de 7 et je dis 8, 9, 10 : 7 + 3 = 10.', sauts(7, 3, { a: 11, px: 260 }))],
    ['À la cantine, il y a 12 enfants. 3 autres enfants arrivent. Combien d\'enfants sont à la cantine ?',
      cm1Redac('Enfants à la cantine', '12 + 3 = 15', 'Il y a 15 enfants à la cantine.', sauts(12, 3, { de: 10, a: 16, px: 240 }))],
    ['Noé avait 9 cartes. Il en a perdu. Il lui reste 6 cartes. Combien de cartes a-t-il perdues ?',
      cm1Redac('Cartes perdues', { suite: ['6 + 3 = 9', '9 − 3 = 6'] }, 'Noé a perdu 3 cartes : de 6 à 9, il en manque 3.', barre([[6, '6', '#2EA8C9'], [3, '?', '#fff']], '9 cartes', { u: 24 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les signes + et −', [
    'Pendant très longtemps, on écrivait les calculs avec des <b>mots</b> : « 4 et 3 », « 8 moins 3 ». Les signes <b>+</b> et <b>−</b> sont apparus dans des livres il y a un peu plus de 500 ans, en Allemagne : un livre de calcul imprimé en 1489 les utilise.',
    'Le signe <b>+</b> viendrait du mot latin <b>et</b>, écrit très vite. Le signe <b>=</b> est plus jeune : il a été inventé en 1557 par l\'Anglais <b>Robert Recorde</b>, avec deux traits pareils, « parce que rien n\'est plus égal que deux traits pareils ».',
  ]),
  quiz: [
    { q: 'Tom a 6 billes. Il en gagne 2. Combien en a-t-il maintenant ?', opts: ['4', '8', '62'], correct: 1 },
    { q: `Combien de jetons restent ?${lig(jetons(7, 3))}`, opts: ['3', '4', '10'], correct: 1 },
    { q: 'Quand on retire, le nombre devient…', opts: ['plus grand', 'plus petit', 'pareil'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '5 + 2 = …', r: ['3', '7', '8', '52'], ok: 1 },
    { l: 1, q: '3 + 4 = …', r: ['6', '7', '8', '1'], ok: 1 },
    { l: 1, q: '8 + 1 = …', r: ['9', '7', '10', '81'], ok: 0 },
    { l: 2, q: '6 − 2 = …', r: ['4', '8', '3', '5'], ok: 0 },
    { l: 2, q: '9 − 1 = …', r: ['10', '8', '7', '1'], ok: 1 },
    { l: 2, q: `Combien en reste-t-il ?${lig(jetons(6, 2))}`, r: ['2', '4', '6', '8'], ok: 1 },
    { l: 3, q: 'Il y a 4 chats. 1 chat part. Combien en reste-t-il ?', r: ['5', '3', '4', '1'], ok: 1 },
    { l: 4, q: '10 − 3 = …', r: ['7', '13', '6', '8'], ok: 0 },
    { l: 4, q: '2 + 8 = …', r: ['10', '6', '9', '28'], ok: 0 },
  ],
});
})();

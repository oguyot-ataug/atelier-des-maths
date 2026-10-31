/* ============================================================
   4e · Planches : Opérations sur les nombres relatifs (N1)
   Additionner et soustraire ; multiplier (règle des signes, inverse) ; diviser et respecter les
   priorités ; problèmes avec des nombres relatifs. Outils communs : P3 (chapitres/3e/planches/_commun3.js)
   et les dessins de chapitres/planches-dessins.js.
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
// Avion au-dessus de la mer, sous-marin en dessous (distance entre deux altitudes).
const avionSousMarin = DS.fig(170, 132, `<rect x="0" y="62" width="170" height="70" fill="#E3F2FA"/>` + DS.vagues(2, 168, 62)
  + `<g transform="translate(108,18)"><path d="M-22,0 L10,-3 Q18,-2 20,1 Q18,4 10,4 L-22,3 Z" fill="#DCE6F0" stroke="#1F3A5C" stroke-width="1.2"/><path d="M-4,1 L-12,12 L-7,12 L4,2 Z M-18,0 L-24,-9 L-20,-9 L-13,0 Z" fill="#9CC8E8" stroke="#1F3A5C" stroke-width="1"/></g>`
  + `<g transform="translate(108,112)"><ellipse cx="0" cy="0" rx="24" ry="7" fill="#F6C343" stroke="#1F3A5C" stroke-width="1.2"/><rect x="-5" y="-13" width="11" height="7" rx="2" fill="#F6C343" stroke="#1F3A5C" stroke-width="1"/></g>`
  + DS.ln([60, 18], [60, 112], '#E35D3A', 1.2, true) + DS.tx([56, 22], '10 500 m', { a: 'end', fs: 10 }) + DS.tx([56, 66], '0 m', { a: 'end', fs: 10, c: '#2EA8C9' }) + DS.tx([56, 116], '−350 m', { a: 'end', fs: 10 }), 140);
PLANCHES['4e|Opérations sur les nombres relatifs'] = [
  { titre: 'Additionner et soustraire des relatifs', duree: '30 min',
    attendus: ['Additionner deux nombres relatifs', 'Soustraire, c\'est ajouter l\'opposé', 'Calculer une somme algébrique'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['(+7) + (−3) = @', 4], ['(−8) + (−5) = @', '−13'], ['(−6) + (+6) = @', 0], ['(−2,5) + (+4) = @', '1,5'], ['(+9) + (−12) = @', '−3']]) },
      { etoiles: 1, col: 1, consigne: 'Transforme en addition, puis calcule.',
        ...rmp([['(+5) − (+9) = (+5) + (−9) = @', '−4'], ['(−3) − (−8) = (−3) + (+8) = @', 5], ['(−4) − (+6) = @', '−10'], ['(+2) − (−7) = @', 9]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule ces sommes algébriques.',
        ...rmp([['A = −5 + 8 − 3 + 10 − 7 = @', 3], ['B = 12 − 15 − 4 + 9 = @', 2], ['C = −2,5 + 1,5 − 4 = @', '−5'], ['D = −1 − 1 − 1 + 10 = @', 7]]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec le nombre qui manque.',
        ...rmp([['−6 + @ = 2', 8], ['@ + 5 = −3', '−8'], ['4 − @ = 10', '−6'], ['@ − 7 = −2', 5]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La somme de deux nombres négatifs est négative.', 'vrai'], ['(−3) − (−3) = −6', 'faux'], ['Soustraire −5, c\'est ajouter 5.', 'vrai'], ['−8 + 3 = −11', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau des écarts de température (plus haute − plus basse).',
        ...rmp([['Entre 8 °C et −5 °C : @ degrés', 13], ['Entre −12 °C et −3 °C : @ degrés', 9], ['Entre −7 °C et 4 °C : @ degrés', 11]]) },
      { etoiles: 3, cahier: true, consigne: 'Un plongeur est à 18 m sous la surface. Il remonte de 7 m, puis redescend de 12 m. À quelle profondeur se trouve-t-il ? Écris le calcul avec des nombres relatifs.',
        corr: cm1Redac('Position du plongeur', { suite: ['−18 + 7 − 12', '= −11 − 12', '= −23'] }, 'Le plongeur se trouve à 23 m sous la surface (altitude −23 m).') },
    ] },
  { titre: 'Multiplier des relatifs', duree: '30 min',
    attendus: ['Appliquer la règle des signes', 'Trouver le signe d\'un produit de plusieurs facteurs', 'Connaître l\'inverse d\'un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['(−4) × (+6) = @', '−24'], ['(−7) × (−8) = @', 56], ['(+9) × (−3) = @', '−27'], ['(−0,5) × (−12) = @', 6], ['(−1) × (+15) = @', '−15']]) },
      { etoiles: 1, col: 1, consigne: 'Sans calculer, entoure le signe du produit.',
        ...ch([['(−2) × (−3) × (−4)', 'négatif'], ['(−1) × 5 × (−2) × (−3) × (−4)', 'positif'], ['(−5) × (−5) × (−5) × (−5)', 'positif'], ['3 × (−2) × 0 × (−7)', 'nul']], 'positif · négatif · nul') },
      { etoiles: 2, col: 1, consigne: 'Calcule (cherche d\'abord le signe).',
        ...rmp([['(−2) × (−5) × (−3) = @', '−30'], ['4 × (−0,5) × (−6) = @', 12], ['(−1) × (−1) × (−1) × (−1) × (−1) = @', '−1'], ['(−2,5) × 4 × (−10) = @', 100]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['(−6) × @ = 42', '−7'], ['@ × (−9) = −72', 8], ['(−11) × @ = 0', 0], ['(−4) × @ = −2', '0,5']]) },
      { etoiles: 2, col: 1, consigne: 'Donne l\'inverse de chaque nombre (en écriture décimale).',
        ...rmp([['Inverse de 4 : @', '0,25'], ['Inverse de −5 : @', '−0,2'], ['Inverse de −0,5 : @', '−2'], ['Inverse de 10 : @', '0,1']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un produit de 7 facteurs négatifs est négatif.', 'vrai'], ['(−2) × (−3) = −6', 'faux'], ['L\'inverse de −2 est 2.', 'faux'], ['Un nombre multiplié par son inverse donne 1.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'À un quiz, une bonne réponse rapporte 3 points et une erreur en fait perdre 2. Léa a 8 bonnes réponses et 7 erreurs. Quel est son score ? Écris un seul calcul.',
        corr: cm1Redac('Score de Léa', { suite: ['8 × 3 + 7 × (−2)', '= 24 + (−14)', '= 10'] }, 'Le score de Léa est de 10 points.') },
    ] },
  { titre: 'Diviser et respecter les priorités', duree: '35 min',
    attendus: ['Calculer un quotient de nombres relatifs', 'Enchaîner les opérations en respectant les priorités', 'Repérer et corriger une erreur de calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['(−36) : (+4) = @', '−9'], ['(−42) : (−6) = @', 7], ['(+56) : (−8) = @', '−7'], ['(−4,8) : (−0,6) = @', 8], ['0 : (−7) = @', 0]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule en respectant les priorités.',
        ...rmp([['A = −3 + 4 × (−5) = @', '−23'], ['B = (−3 + 4) × (−5) = @', '−5'], ['C = 18 : (−3) − 2 × (−4) = @', 2], ['D = −2 × (7 − 10) = @', 6]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['(−63) : @ = 9', '−7'], ['@ : (−4) = 5', '−20'], ['@ : 6 = −8', '−48']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon résultat.',
        ...chx([['(−8) × 3 : (−6) =', '4', '−4 · 4 · −0,25'], ['−12 : (−4) + (−5) =', '−2', '−2 · 8 · −8'], ['(−3) × (−3) × (−3) =', '−27', '9 · −27 · 27']]) },
      { etoiles: 2, uneLigne: true, consigne: 'Tom s\'est trompé. Écris le bon résultat.',
        ...rmp([['−2 + 3 × (−4) = −4 ; le bon résultat est @', '−14'], ['(−20) : (−4) × (−2) = −2,5 ; le bon résultat est @', '−10'], ['15 − (−3) × 2 = 36 ; le bon résultat est @', 21]]) },
      { etoiles: 3, cahier: true, consigne: 'Programme de calcul : choisir un nombre ; le multiplier par −3 ; ajouter 12 ; diviser le résultat par −3. Applique-le à 5, puis à −2. Que remarques-tu ?',
        corr: cm1Redac('Avec 5', { suite: ['5 × (−3) = −15', '−15 + 12 = −3', '−3 : (−3) = 1'] }, 'Avec 5, on obtient 1.') + cm1Redac('Avec −2', { suite: ['(−2) × (−3) = 6', '6 + 12 = 18', '18 : (−3) = −6'] }, 'Avec −2, on obtient −6. On remarque que le résultat est toujours le nombre choisi diminué de 4.') },
    ] },
  { titre: 'Problèmes avec des nombres relatifs', duree: '40 min',
    attendus: ['Modéliser une situation avec des nombres relatifs', 'Calculer un écart, une moyenne', 'Rédiger la solution d\'un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Un compte affiche 150 €. On fait dans l\'ordre : un retrait de 80 €, un dépôt de 45 €, un retrait de 135 €, un dépôt de 20 €.',
        ...rmp([['Après le premier retrait : @ €', 70], ['Après le dépôt de 45 € : @ €', 115], ['Après le retrait de 135 € : @ €', '−20'], ['Solde final : @ €', 0]]) },
      { etoiles: 2, col: 1, consigne: 'Températures relevées à midi pendant 4 jours : −3 °C ; 5 °C ; −8 °C ; 2 °C.',
        ...rmp([['Somme des températures : @', '−4'], ['Température moyenne : @ °C', '−1'], ['Écart entre la plus haute et la plus basse : @ degrés', 13]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le calcul qui correspond à la situation.',
        ...chx([['Il fait −4 °C, la température baisse de 6 degrés :', '−4 − 6', '−4 + 6 · −4 − 6 · 6 − 4'], ['Un sous-marin à −120 m remonte de 45 m :', '−120 + 45', '−120 − 45 · −120 + 45 · 120 − 45'], ['On perd 3 fois 5 points :', '3 × (−5)', '3 × (−5) · 3 × 5 · −3 − 5']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La moyenne de −6 et 6 est 0.', 'vrai'], ['L\'écart entre −10 °C et −2 °C est de 12 degrés.', 'faux'], ['Si on perd 4 points 3 fois, on a perdu 12 points.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, cahier: true, consigne: illu(avionSousMarin, 'Un avion vole à 10 500 m d\'altitude. Juste en dessous, un sous-marin est à 350 m sous le niveau de la mer. Quelle distance les sépare ?'),
        corr: cm1Redac('Distance', { suite: ['10 500 − (−350)', '= 10 500 + 350', '= 10 850'] }, 'L\'avion et le sous-marin sont à 10 850 m l\'un de l\'autre.') },
      { etoiles: 3, cahier: true, consigne: 'Max a 12 points. Il perd 5 points quatre fois, puis gagne 3 points six fois. Combien de points a-t-il ? Écris un seul calcul.',
        corr: cm1Redac('Points de Max', { suite: ['12 + 4 × (−5) + 6 × 3', '= 12 − 20 + 18', '= 10'] }, 'Max a 10 points.') },
      { etoiles: 3, cahier: true, consigne: 'Défi : trouve deux nombres relatifs dont la somme est −2 et le produit −15. Explique ta recherche.',
        corr: cm1Redac('Recherche', { suite: ['Le produit est négatif : les deux nombres sont de signes contraires.', 'Les produits égaux à 15 : 1 × 15 et 3 × 5.', '3 + (−5) = −2 et 3 × (−5) = −15'] }, 'Les deux nombres sont 3 et −5.') },
    ] },
];
})();

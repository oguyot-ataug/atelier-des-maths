/* ============================================================
   5e · Planches : Opérations sur les nombres décimaux (N1)
   Vocabulaire, priorités opératoires, division euclidienne, distributivité, calcul sur les décimaux.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
// Liste de calculs « expr = … » : [expr, résultat, étapes facultatives].
const calc = l => ({ eleve: plListe(l.map(([e]) => `${e} = ${B(3)}`)), corr: plListe(l.map(([e, r, et]) => `${e} = ${et ? et + ' = ' : ''}${R(r)}`)) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
PLANCHES['5e|Opérations sur les nombres décimaux'] = [
  { titre: 'Vocabulaire et priorités sans parenthèses', duree: '35 min',
    attendus: ['Nommer une somme, une différence, un produit, un quotient et leurs termes', 'Effectuer les multiplications et les divisions avant les additions et les soustractions', 'Calculer de gauche à droite à priorité égale'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la nature de chaque calcul (la dernière opération effectuée).',
        ...ch([['7 + 3 × 5 :', 'somme'], ['18 − 12 : 4 :', 'différence'], ['2,5 × 4 + 0 :', 'somme'], ['6 × 7 − 2 × 3 :', 'différence'], ['(9 − 4) × 8 :', 'produit']], 'somme · différence · produit · quotient') },
      { etoiles: 1, col: 1, consigne: 'Complète avec le bon mot.',
        ...rmp([['Dans 24 : 6 = 4, le nombre 6 est le @.', 'diviseur'], ['Dans 9 × 4 = 36, 9 et 4 sont les @ du produit.', 'facteurs'], ['Dans 15 − 8 = 7, le nombre 7 est la @.', 'différence'], ['Dans 3 + 5 = 8, 3 et 5 sont les @ de la somme.', 'termes']], 9) },
      { etoiles: 1, col: 1, consigne: 'Calcule en respectant les priorités.', ...calc([['5 + 4 × 3', 17], ['20 − 6 × 2', 8], ['3 × 7 + 2 × 5', 31], ['18 : 3 + 4', 10], ['40 − 24 : 4', 34]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (à priorité égale, de gauche à droite).', ...calc([['20 − 8 + 3', 15], ['36 : 4 × 3', 27], ['50 − 10 − 5', 35], ['48 : 6 : 2', 4], ['7 × 2,5 − 1,5', 16]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['2 + 3 × 4 = 20 :', 'faux'], ['10 − 4 : 2 = 8 :', 'vrai'], ['12 : 3 × 2 = 2 :', 'faux'], ['1,5 + 0,5 × 4 = 3,5 :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au cinéma, Lina paie 3 places à 8,50 € et 2 menus à 6 €. Écris le calcul en une seule expression, puis calcule le prix total.',
        corr: cm1Redac('Prix total', '3 × 8,50 + 2 × 6 = 25,50 + 12 = 37,50', 'Lina paie 37,50 €.') },
      { etoiles: 2, col: 1, consigne: 'Quel signe manque ? Entoure-le.',
        ...ch([['6 … 4 + 2 = 26 :', '×'], ['15 … 3 × 2 = 9 :', '−'], ['20 … 5 − 1 = 3 :', ':'], ['7 … 2 × 3 = 13 :', '+']], '+ · − · × · :') },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...calc([['0,5 + 2 × 1,5', '3,5'], ['10 − 0,2 × 5', 9], ['4 × 2,5 + 6 : 3', 12], ['9 : 3 × 3 − 9', 0]]) },
    ] },
  { titre: 'Priorités avec des parenthèses', duree: '40 min',
    attendus: ['Effectuer d\'abord les calculs entre parenthèses', 'Enchaîner les étapes d\'un calcul en ligne', 'Traduire une phrase par une expression avec parenthèses'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...calc([['(5 + 4) × 3', 27], ['5 + (4 × 3)', 17], ['(20 − 6) × 2', 28], ['30 : (2 + 4)', 5], ['(7 + 8) : (6 − 1)', 3]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule en écrivant les étapes.', ...calc([['3 × (12 − 4) + 1', 25, '3 × 8 + 1 = 24 + 1'], ['50 − (6 + 4) × 3', 20, '50 − 10 × 3 = 50 − 30'], ['(18 − 3 × 4) × 5', 30, '(18 − 12) × 5 = 6 × 5'], ['2 × [10 − (3 + 5)]', 4, '2 × [10 − 8] = 2 × 2']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure chaque calcul dont le résultat est 36.',
        ...(() => { const it = ['4 × 6 + 3', '4 × (6 + 3)', '2 + 10 × 3', '(2 + 10) × 3', '(9 − 3) × 6', '9 − 3 + 6', '72 : 2 × 1', '72 : (2 × 1)'], ok = [1, 3, 4, 6, 7];
          return { eleve: plGrille(it, 2), corr: plGrille(it.map((t, i) => ok.includes(i) ? plEntoure(t) : t), 2) }; })() },
      { etoiles: 2, col: 1, consigne: 'Place des parenthèses pour que l\'égalité soit vraie (écris le calcul complet).',
        eleve: plListe(['3 + 5 × 2 = 16 : ' + B(9), '20 − 8 − 2 = 14 : ' + B(9), '12 : 2 + 4 = 2 : ' + B(9), '2 × 3 + 4 × 5 = 70 : ' + B(10)]),
        corr: plListe(['3 + 5 × 2 = 16 : ' + R('(3+5)×2'), '20 − 8 − 2 = 14 : ' + R('20−(8−2)'), '12 : 2 + 4 = 2 : ' + R('12:(2+4)'), '2 × 3 + 4 × 5 = 70 : ' + R('2×(3+4)×5')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Traduis chaque phrase par une expression, puis calcule : a) le triple de la somme de 7 et 5 ; b) la somme du triple de 7 et de 5 ; c) le quotient de 60 par la différence de 15 et 3.',
        corr: cm1Redac('Expressions', { suite: ['a) 3 × (7 + 5) = 3 × 12 = 36', 'b) 3 × 7 + 5 = 21 + 5 = 26', 'c) 60 : (15 − 3) = 60 : 12 = 5'] }, 'Les parenthèses indiquent le calcul à faire en premier.') },
      { etoiles: 2, col: 1, consigne: 'Calcule (on commence par les parenthèses les plus intérieures).', ...calc([['3 × [2 + (5 − 1)]', 18, '3 × [2 + 4] = 3 × 6'], ['[20 − (4 + 6)] : 2', 5, '[20 − 10] : 2 = 10 : 2'], ['100 − 4 × (7 + 3 × 2)', 48, '100 − 4 × 13 = 100 − 52']]) },
      { etoiles: 2, col: 1, consigne: 'Quelle expression traduit la phrase ? Entoure.',
        ...ch([['Le double de la somme de 4 et 9 :', '2 × (4 + 9)'], ['La somme du double de 4 et de 9 :', '2 × 4 + 9'], ['La différence de 20 et du produit de 3 par 5 :', '20 − 3 × 5']], '2 × (4 + 9) · 2 × 4 + 9 · 20 − 3 × 5 · (20 − 3) × 5') },
    ] },
  { titre: 'Division euclidienne', duree: '35 min',
    attendus: ['Écrire l\'égalité a = b × q + r avec r < b', 'Trouver le quotient et le reste', 'Résoudre un problème de partage ou de groupement'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne le quotient et le reste de la division euclidienne.',
        eleve: plListe(['47 par 5 : q = ' + B(2) + ' ; r = ' + B(2), '100 par 7 : q = ' + B(2) + ' ; r = ' + B(2), '365 par 12 : q = ' + B(2) + ' ; r = ' + B(2), '1 000 par 24 : q = ' + B(2) + ' ; r = ' + B(2)]),
        corr: plListe(['47 par 5 : q = ' + R(9) + ' ; r = ' + R(2), '100 par 7 : q = ' + R(14) + ' ; r = ' + R(2), '365 par 12 : q = ' + R(30) + ' ; r = ' + R(5), '1 000 par 24 : q = ' + R(41) + ' ; r = ' + R(16)]) },
      { etoiles: 1, col: 1, consigne: 'Complète l\'égalité de la division euclidienne.',
        ...rmp([['58 = 7 × 8 + @', 2], ['91 = 6 × @ + 1', 15], ['250 = 9 × 27 + @', 7], ['@ = 11 × 13 + 4', 147]], 3) },
      { etoiles: 2, col: 1, consigne: 'Ces égalités traduisent-elles la division euclidienne de 50 par 6 ? Entoure.',
        ...ch([['50 = 6 × 8 + 2 :', 'oui'], ['50 = 6 × 7 + 8 :', 'non'], ['50 = 6 × 8,33 :', 'non'], ['50 = 8 × 6 + 2 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Problèmes.',
        ...rmp([['On range 230 œufs par boîtes de 12. Nombre de boîtes pleines : @', 19], ['Œufs qui restent : @', 2], ['Un car a 52 places. Cars nécessaires pour 315 élèves : @', 7], ['Nous sommes lundi. Jour de la semaine dans 100 jours : @', 'mercredi']], 4) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans une division euclidienne, le diviseur est 9, le quotient 14 et le reste 5. Quel est le dividende ? Le reste pourrait-il être 11 ? Explique.',
        corr: cm1Redac('Dividende', '9 × 14 + 5 = 126 + 5 = 131', 'Le dividende est 131. Le reste ne peut pas être 11, car il doit être plus petit que le diviseur 9.') },
      { etoiles: 2, col: 1, consigne: 'Complète (division euclidienne).',
        ...rmp([['Dividende 85, diviseur 4 : reste @', 1], ['Dividende 200, diviseur 15 : quotient @', 13], ['Diviseur 8, quotient 12, reste 3 : dividende @', 99], ['Dividende 72, diviseur 9 : reste @', 0]], 3) },
      { etoiles: 2, col: 1, consigne: 'Problèmes.',
        ...rmp([['Un livre de 250 pages, 18 pages lues par jour. Jours pour le finir : @', 14], ['1 000 secondes = 16 min et @ s', 40], ['150 élèves en équipes de 11. Équipes complètes : @', 13], ['Élèves sans équipe complète : @', 7]], 3) },
    ] },
  { titre: 'La distributivité', duree: '40 min',
    attendus: ['Développer : k × (a + b) = k × a + k × b', 'Factoriser : k × a + k × b = k × (a + b)', 'Calculer astucieusement grâce à la distributivité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour développer.',
        ...rmp([['7 × (10 + 3) = 7 × 10 + 7 × @', 3], ['5 × (20 − 1) = 5 × 20 − 5 × @', 1], ['(8 + 2) × 4 = 8 × 4 + @ × 4', 2], ['6 × (100 + 5) = @ + 30', 600]], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète pour factoriser.',
        ...rmp([['9 × 4 + 9 × 6 = 9 × (4 + @)', 6], ['13 × 7 − 13 × 2 = @ × (7 − 2)', 13], ['4,5 × 8 + 5,5 × 8 = (4,5 + 5,5) × @', 8], ['25 × 3 + 25 × 1 = 25 × @', 4]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule astucieusement.', ...calc([['12 × 101', 1212, '12 × 100 + 12 × 1'], ['25 × 99', 2475, '25 × 100 − 25 × 1'], ['17 × 6 + 17 × 4', 170, '17 × 10'], ['3,7 × 8 + 6,3 × 8', 80, '10 × 8']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['4 × (5 + 2) = 4 × 5 + 2 :', 'faux'], ['6 × 9 + 6 × 1 = 60 :', 'vrai'], ['(10 − 1) × 7 = 70 − 7 :', 'vrai'], ['2 × (3 × 5) = 2 × 3 × 2 × 5 :', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un cinéma vend 47 places à 9 € le samedi et 53 places à 9 € le dimanche. Calcule la recette du week-end de deux façons différentes. Laquelle est la plus rapide ?',
        corr: cm1Redac('Recette', { suite: ['47 × 9 + 53 × 9 = 423 + 477 = 900', '9 × (47 + 53) = 9 × 100 = 900'] }, 'La recette est de 900 € ; la factorisation donne le calcul le plus rapide.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sans calculatrice, calcule 38 × 102 et 15 × 98 en expliquant ta méthode.',
        corr: cm1Redac('Calculs astucieux', { suite: ['38 × 102 = 38 × 100 + 38 × 2 = 3 800 + 76 = 3 876', '15 × 98 = 15 × 100 − 15 × 2 = 1 500 − 30 = 1 470'] }, 'On décompose 102 en 100 + 2 et 98 en 100 − 2.') },
      { etoiles: 2, col: 1, consigne: 'Développe, puis calcule.', ...calc([['8 × (5 + 0,5)', 44, '40 + 4'], ['(30 − 2) × 6', 168, '180 − 12'], ['0,5 × (20 + 4)', 12, '10 + 2']]) },
      { etoiles: 2, col: 1, consigne: 'Quel est le facteur commun ? Factorise, puis calcule.',
        ...rmp([['14 × 3 + 14 × 7 = 14 × 10 = @', 140], ['5,8 × 2 + 4,2 × 2 = 10 × 2 = @', 20], ['36 × 11 − 36 × 1 = 36 × 10 = @', 360], ['99 × 7 + 7 = 7 × 100 = @', 700]], 3) },
    ] },
  { titre: 'Calculer avec des nombres décimaux', duree: '35 min',
    attendus: ['Multiplier par 10, 100, 0,1 ou 0,01', 'Estimer un résultat par un ordre de grandeur', 'Résoudre un problème à plusieurs étapes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.', ...calc([['3,7 × 10', 37], ['0,45 × 100', 45], ['52 × 0,1', '5,2'], ['806 × 0,01', '8,06'], ['7,2 : 10', '0,72']]) },
      { etoiles: 1, col: 1, consigne: 'Entoure l\'ordre de grandeur du résultat.',
        ...ch([['49,8 × 3,1 :', '150'], ['198,5 + 401,2 :', '600'], ['8,9 × 21 :', '180'], ['999 : 9,9 :', '100']], '15 · 100 · 150 · 180 · 600 · 1 500') },
      { etoiles: 2, col: 1, consigne: 'Calcule (pose l\'opération si besoin).', ...calc([['12,5 × 0,8', 10], ['4,05 + 17,9', '21,95'], ['30 − 7,46', '22,54'], ['6,4 × 2,5', 16], ['1,2 × 3 + 0,4', 4]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['2,5 × @ = 25', 10], ['@ × 100 = 3,8', '0,038'], ['0,6 × @ = 6', 10], ['4 × @ = 1', '0,25']], 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Tom achète 2,5 kg de pommes à 2,40 € le kg et 3 baguettes à 1,10 €. Il paie avec un billet de 20 €. Combien lui rend-on ? Écris un seul calcul.',
        corr: cm1Redac('Monnaie rendue', '20 − (2,5 × 2,40 + 3 × 1,10) = 20 − (6 + 3,30) = 20 − 9,30 = 10,70', 'On lui rend 10,70 €.') },
      { etoiles: 2, col: 1, consigne: 'Calcule (division décimale).', ...calc([['7,5 : 3', '2,5'], ['9 : 4', '2,25'], ['4,8 : 6', '0,8'], ['10 : 8', '1,25']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Multiplier par 0,1, c\'est diviser par 10 :', 'vrai'], ['3,5 × 0,1 = 35 :', 'faux'], ['Multiplier par 0,5, c\'est prendre la moitié :', 'vrai'], ['Un produit est toujours plus grand que ses facteurs :', 'faux']], 'vrai · faux') },
    ] },
];
})();

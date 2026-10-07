/* ============================================================
   5e · Planches : Opérations sur les nombres relatifs (N3)
   Addition (même signe, signes contraires), soustraction (ajouter l'opposé), sommes algébriques, problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rel = v => String(+(+v).toFixed(3)).replace('-', '−').replace('.', ',');
const P = v => v < 0 ? `(${rel(v)})` : `(+${rel(v)})`; // écriture entre parenthèses : (−3), (+5)
// Liste de calculs [expr, résultat, étapes].
const calc = l => ({ eleve: plListe(l.map(([e]) => `${e} = ${B(3)}`)), corr: plListe(l.map(([e, r, et]) => `${e} = ${et ? et + ' = ' : ''}${R(rel(r))}`)) });
const add = l => calc(l.map(([a, b]) => [`${P(a)} + ${P(b)}`, a + b]));
const sub = l => calc(l.map(([a, b]) => [`${P(a)} − ${P(b)}`, a - b, `${P(a)} + ${P(-b)}`]));
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(rel(r))))) });
PLANCHES['5e|Opérations sur les nombres relatifs'] = [
  { titre: 'Additionner deux nombres relatifs', duree: '35 min',
    attendus: ['Additionner deux nombres de même signe', 'Additionner deux nombres de signes contraires', 'Utiliser la somme de deux opposés'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Même signe : on ajoute les distances à zéro et on garde le signe.', ...add([[3, 5], [-4, -6], [-12, -8], [-2.5, -1.5], [7, 13]]) },
      { etoiles: 1, col: 1, consigne: 'Signes contraires : on soustrait les distances à zéro, signe de celui qui a la plus grande distance à zéro.', ...add([[-7, 3], [9, -4], [-5, 11], [6, -10], [-8, 8]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...add([[-15, 27], [-3.2, 1.2], [-0.5, -4], [25, -40], [-1.7, 3]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le signe de la somme, sans calculer.',
        ...ch([['(−37) + (+12) :', 'négatif'], ['(+58) + (−9) :', 'positif'], ['(−4,5) + (−2) :', 'négatif'], ['(+19) + (−23) :', 'négatif'], ['(−7) + (+7) :', 'nul']], 'positif · négatif · nul') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['(−4) + @ = 3', 7], ['@ + (+6) = −2', -8], ['(+9) + @ = 0', -9], ['(−5) + @ = −12', -7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La somme de deux nombres négatifs est négative :', 'vrai'], ['La somme d\'un positif et d\'un négatif est toujours négative :', 'faux'], ['(−3) + (+3) = 0 :', 'vrai'], ['(−6) + (−2) = −4 :', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le matin, il fait −6 °C. La température augmente de 9 °C dans la journée, puis baisse de 11 °C la nuit. Quelle est la température la nuit ? Écris les additions.',
        corr: cm1Redac('Température', '(−6) + (+9) + (−11) = (+3) + (−11) = −8', 'La nuit, il fait −8 °C.') },
    ] },
  { titre: 'Additionner : tableaux et carrés magiques', duree: '35 min',
    attendus: ['Enchaîner plusieurs additions de relatifs', 'Compléter un tableau d\'additions', 'Utiliser des additions de relatifs pour résoudre une énigme'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule de proche en proche.',
        ...calc([['(−3) + (+5) + (−4)', -2, '(+2) + (−4)'], ['(+8) + (−10) + (+7)', 5, '(−2) + (+7)'], ['(−1) + (−2) + (−3) + (+6)', 0, '(−6) + (+6)']]) },
      { etoiles: 2, col: 1, consigne: 'Regroupe les nombres positifs et les nombres négatifs, puis calcule.',
        ...calc([['(+4) + (−9) + (+6) + (−3)', -2, '(+10) + (−12)'], ['(−7) + (+2) + (−5) + (+11)', 1, '(+13) + (−12)'], ['(+2,5) + (−4) + (+1,5) + (−6)', -6, '(+4) + (−10)']]) },
      { etoiles: 2, col: 1, consigne: 'Table d\'addition : la case = nombre de la ligne + nombre de la colonne.',
        ...(() => { const L = [-3, 5], Cc = [-4, 2, -7], tab = f => `<table class="pl-tab"><tr><th>+</th>${Cc.map(c => `<th>${rel(c)}</th>`).join('')}</tr>${L.map(l => `<tr><th>${rel(l)}</th>${Cc.map(c => `<td>${f(l + c)}</td>`).join('')}</tr>`).join('')}</table>`;
          return { eleve: tab(() => B(2)), corr: tab(v => R(rel(v))) }; })() },
      { etoiles: 3, col: 1, consigne: 'Carré magique : la somme de chaque ligne, colonne et diagonale vaut 0. Complète.',
        ...(() => { const M = [[1, -4, 3], [2, 0, -2], [-3, 4, -1]], cache = [[0, 1], [1, 0], [1, 2], [2, 1], [2, 2]], tab = f => `<table class="pl-tab">${M.map((l, i) => `<tr>${l.map((v, j) => `<td>${cache.some(([a, b]) => a === i && b === j) ? f(v) : rel(v)}</td>`).join('')}</tr>`).join('')}</table>`;
          return { eleve: tab(() => B(2)), corr: tab(v => R(rel(v))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure le résultat juste.',
        ...ch([['(−12) + (+20) =', '8'], ['(−0,8) + (−0,2) =', '−1'], ['(+15) + (−25) =', '−10']], '−32 · −10 · −1 · −0,6 · 8 · 10') },
      { etoiles: 2, col: 1, consigne: 'Pyramide : chaque brique est la somme des deux briques sur lesquelles elle repose. Base : −3 ; 5 ; −6. Complète.',
        ...rmp([['Étage 2, à gauche : (−3) + (+5) = @', 2], ['Étage 2, à droite : (+5) + (−6) = @', -1], ['Sommet : @', 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...calc([['(−1,5) + (+4) + (−2,5)', 0], ['(+12) + (−30) + (+8)', -10], ['(−0,1) + (−0,9) + (+5)', 4]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur un compte, il y a 125 €. On fait trois opérations : un retrait de 80 €, un dépôt de 30 € et un retrait de 95 €. Écris la somme de relatifs, puis calcule le solde.',
        corr: cm1Redac('Solde', '(+125) + (−80) + (+30) + (−95) = (+155) + (−175) = −20', 'Le compte est à découvert : −20 €.') },
    ] },
  { titre: 'Soustraire un nombre relatif', duree: '40 min',
    attendus: ['Soustraire un nombre, c\'est ajouter son opposé', 'Transformer une soustraction en addition', 'Calculer une différence de relatifs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Transforme en addition, puis calcule.', ...sub([[5, 8], [-3, 4], [7, -2], [-6, -9]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...sub([[-10, 15], [0, -7], [-2.5, -2.5], [12, 20], [-1, 0.5]]) },
      { etoiles: 1, col: 1, consigne: 'Complète la phrase.',
        eleve: plListe(['Soustraire (+6), c\'est ajouter ' + B(3), 'Soustraire (−4), c\'est ajouter ' + B(3), 'Soustraire 0, c\'est ajouter ' + B(2)]),
        corr: plListe(['Soustraire (+6), c\'est ajouter ' + R('−6'), 'Soustraire (−4), c\'est ajouter ' + R('4'), 'Soustraire 0, c\'est ajouter ' + R('0')]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['(+3) − @ = 8', -5], ['(−7) − @ = −10', 3], ['@ − (+4) = −1', 3], ['(−2) − @ = 0', -2]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['(−5) − (−5) = 0 :', 'vrai'], ['(+2) − (+7) = 5 :', 'faux'], ['(−1) − (+1) = −2 :', 'vrai'], ['a − b et b − a sont opposés :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Table de soustraction : la case = nombre de la ligne − nombre de la colonne.',
        ...(() => { const L = [4, -2], Cc = [6, -3, -2], tab = f => `<table class="pl-tab"><tr><th>−</th>${Cc.map(c => `<th>${rel(c)}</th>`).join('')}</tr>${L.map(l => `<tr><th>${rel(l)}</th>${Cc.map(c => `<td>${f(l - c)}</td>`).join('')}</tr>`).join('')}</table>`;
          return { eleve: tab(() => B(2)), corr: tab(v => R(rel(v))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure le résultat juste.',
        ...ch([['(−8) − (−3) =', '−5'], ['(+2) − (+9) =', '−7'], ['(−6) − (+6) =', '−12'], ['(+1,5) − (−1,5) =', '3']], '−12 · −11 · −7 · −5 · 0 · 3 · 7') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'L\'écart entre deux altitudes est la différence « plus haute − plus basse ». Calcule l\'écart entre le sommet de l\'Everest (8 849 m) et le fond de la fosse des Mariannes (−10 994 m).',
        corr: cm1Redac('Écart', '8 849 − (−10 994) = 8 849 + 10 994 = 19 843', 'L\'écart est de 19 843 m.') },
    ] },
  { titre: 'Sommes algébriques', duree: '40 min',
    attendus: ['Simplifier l\'écriture d\'une somme algébrique (supprimer les parenthèses et les signes +)', 'Calculer une somme algébrique en regroupant les termes', 'Calculer astucieusement'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris plus simplement (sans parenthèses), puis calcule.',
        ...calc([['(+5) + (−3)', 2, '5 − 3'], ['(−4) − (+6)', -10, '−4 − 6'], ['(−2) − (−9)', 7, '−2 + 9'], ['(+1) + (−8) − (−3)', -4, '1 − 8 + 3']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...calc([['7 − 12', -5], ['−3 − 8', -11], ['−15 + 9', -6], ['−4 + 4 − 6', -6], ['2,5 − 7', -4.5]]) },
      { etoiles: 2, col: 1, consigne: 'Regroupe les termes positifs et les termes négatifs.',
        ...calc([['5 − 8 + 3 − 7', -7, '8 − 15'], ['−6 + 10 − 2 + 4', 6, '14 − 8'], ['12 − 3 − 4 − 5 + 1', 1, '13 − 12']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule astucieusement (cherche des opposés ou des sommes rondes).',
        ...calc([['17 − 9 − 17 + 9', 0], ['−25 + 13 + 25 − 3', 10], ['4,7 − 6 + 5,3 − 4', 0, '10 − 10']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'écriture simplifiée de (−3) − (+5) + (−2).',
        ...ch([['Écriture simplifiée :', '−3 − 5 − 2'], ['Résultat :', '−10']], '−3 − 5 − 2 · −3 + 5 − 2 · −10 · −6 · 4') },
      { etoiles: 1, col: 1, consigne: 'Supprime les parenthèses (écriture simplifiée).',
        eleve: plListe(['(+7) − (−2) + (−5) = ' + B(8), '(−1) + (−4) − (+3) = ' + B(8), '(+6) − (+6) − (−6) = ' + B(8)]),
        corr: plListe(['(+7) − (−2) + (−5) = ' + R('7+2−5'), '(−1) + (−4) − (+3) = ' + R('−1−4−3'), '(+6) − (+6) − (−6) = ' + R('6−6+6')]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['−5 − 3 = −8 :', 'vrai'], ['−5 − (−3) = −8 :', 'faux'], ['8 − 10 + 2 = 0 :', 'vrai'], ['−1 − 1 − 1 = −1 :', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Calcule A = 3 − 7 + 12 − 5 − 9 + 1 de deux façons : de gauche à droite, puis en regroupant les termes positifs et négatifs.',
        corr: cm1Redac('A', { suite: ['De gauche à droite : 3 − 7 = −4 ; −4 + 12 = 8 ; 8 − 5 = 3 ; 3 − 9 = −6 ; −6 + 1 = −5', 'En regroupant : (3 + 12 + 1) − (7 + 5 + 9) = 16 − 21 = −5'] }, 'Dans les deux cas, A = −5.') },
    ] },
  { titre: 'Problèmes avec des relatifs', duree: '40 min',
    attendus: ['Modéliser une situation par une somme ou une différence de relatifs', 'Calculer un écart', 'Vérifier la vraisemblance d\'un résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Un ascenseur au 3e étage descend de 5 étages : il est à l\'étage @', -2], ['Un plongeur à −18 m remonte de 7 m : il est à @ m', -11], ['Un compte à −40 € reçoit 65 € : solde @ €', 25], ['Il fait −2 °C, la température baisse de 6 degrés : @ °C', -8]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule l\'écart (en degrés) entre la température maximale et minimale.',
        ...rmp([['Max 7 °C, min −3 °C : @', 10], ['Max −1 °C, min −9 °C : @', 8], ['Max 0 °C, min −12,5 °C : @', 12.5], ['Max 15,5 °C, min −0,5 °C : @', 16]], 2) },
      { etoiles: 2, col: 1, consigne: 'Un jeu de cartes : les cartes rouges valent leur nombre en négatif, les noires en positif. Calcule le total de la main.',
        ...rmp([['Rouge 7, noire 4, rouge 2 : @', -5], ['Noire 9, rouge 9, rouge 3 : @', -3], ['Rouge 5, noire 10, noire 1, rouge 6 : @', 0]], 2) },
      { etoiles: 2, col: 1, consigne: 'Ce résultat est-il vraisemblable ? Entoure.',
        ...ch([['(−45) + (−32) = 77 :', 'non'], ['(−100) + (+1) = −99 :', 'oui'], ['(+8) − (+20) = 12 :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Variations de la température d\'heure en heure, à partir de −3 °C : +2 ; −4 ; +1 ; −5. Complète.',
        ...rmp([['Après la 1re heure : @ °C', -1], ['Après la 2e heure : @ °C', -5], ['Après la 3e heure : @ °C', -4], ['Après la 4e heure : @ °C', -9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quel calcul permet de répondre ? Entoure.',
        ...ch([['Écart entre −7 °C et 4 °C :', '4 − (−7)'], ['Température si −7 °C augmente de 4 °C :', '−7 + 4'], ['Solde si −7 € puis un retrait de 4 € :', '−7 − 4']], '4 − (−7) · −7 + 4 · −7 − 4') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pythagore est né vers −580 et mort vers −495. Archimède est né vers −287. Combien d\'années environ sépare la mort de Pythagore de la naissance d\'Archimède ? Combien de temps Pythagore a-t-il vécu ?',
        corr: cm1Redac('Durées', { suite: ['Pythagore a vécu : −495 − (−580) = −495 + 580 = 85 ans.', 'Entre sa mort et la naissance d\'Archimède : −287 − (−495) = 208 ans.'] }, 'Pythagore a vécu environ 85 ans ; 208 ans séparent sa mort de la naissance d\'Archimède.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un sous-marin est à −250 m. Il remonte de 120 m, redescend de 75 m puis remonte de 180 m. À quelle profondeur est-il ? Est-il remonté à la surface ?',
        corr: cm1Redac('Profondeur', '−250 + 120 − 75 + 180 = 300 − 325 = −25', 'Il est à −25 m : il n\'est pas encore à la surface.') },
    ] },
];
})();

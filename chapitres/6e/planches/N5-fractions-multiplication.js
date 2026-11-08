/* ============================================================
   6e · Planches : Fractions : multiplication (N5) -- pourcentages décomposés, sans mot dans les calculs (07/11/2026)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac();
const T = (a, b) => cm1Tex(`\\dfrac{${a}}{${b}}`);
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
// Comparer deux quantités : une case à compléter avec <, > ou = (bascule au clic à l'écran), demandé le 01/11/2026.
const signe = (it, f = h => `<span style="white-space:nowrap;display:inline-block;padding:4px 0;">${h}</span>`) => ({ eleve: plListe(it.map(([a, b]) => f(`${a} ${plCase()} ${b}`))), corr: plListe(it.map(([a, b, r, x]) => f(`${a} ${plRep(r === '<' ? '&lt;' : r === '>' ? '&gt;' : r)} ${b}`) + (x ? ` <small>${x}</small>` : ''))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
PLANCHES['6e|Fractions : multiplication'] = [
  { titre: 'Multiplier une fraction par un nombre entier', duree: '35 min',
    attendus: ['Multiplier une fraction par un entier : on multiplie le numérateur', 'Relier produit et addition répétée', 'Simplifier le résultat quand c\'est possible'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète (addition répétée).',
        eleve: plListe([ligne(F(2, 7), '+', F(2, 7), '+', F(2, 7), '= 3 ×', F(2, 7), '=', Fr), ligne(F(1, 5), '+', F(1, 5), '+', F(1, 5), '+', F(1, 5), '=', Fr)]),
        corr: plListe([ligne(F(2, 7), '+', F(2, 7), '+', F(2, 7), '= 3 ×', F(2, 7), '=', R(F(6, 7))), ligne(F(1, 5), '+', F(1, 5), '+', F(1, 5), '+', F(1, 5), '=', R(F(4, 5)))]) },
      { etoiles: 1, col: 1, consigne: 'Calcule (sans simplifier).',
        eleve: plListe([ligne('4 ×', F(2, 9), '=', Fr), ligne('5 ×', F(3, 8), '=', Fr), ligne(F(7, 10), '× 3 =', Fr), ligne('6 ×', F(1, 7), '=', Fr)]),
        corr: plListe([ligne('4 ×', F(2, 9), '=', R(F(8, 9))), ligne('5 ×', F(3, 8), '=', R(F(15, 8))), ligne(F(7, 10), '× 3 =', R(F(21, 10))), ligne('6 ×', F(1, 7), '=', R(F(6, 7)))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule, puis donne le résultat sous forme d\'un nombre entier.',
        eleve: plListe([ligne('4 ×', F(3, 4), '=', B(1)), ligne('6 ×', F(2, 3), '=', B(1)), ligne('10 ×', F(7, 5), '=', B(2)), ligne('9 ×', F(5, 9), '=', B(1))]),
        corr: plListe([ligne('4 ×', F(3, 4), '=', F(12, 4), '=', R(3)), ligne('6 ×', F(2, 3), '=', F(12, 3), '=', R(4)), ligne('10 ×', F(7, 5), '=', F(70, 5), '=', R(14)), ligne('9 ×', F(5, 9), '=', F(45, 9), '=', R(5))]) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat sous forme décimale.',
        eleve: plListe([ligne('3 ×', F(1, 4), '=', B()), ligne('7 ×', F(1, 10), '=', B()), ligne('5 ×', F(3, 2), '=', B())]),
        corr: plListe([ligne('3 ×', F(1, 4), '=', F(3, 4), '=', R('0,75')), ligne('7 ×', F(1, 10), '=', F(7, 10), '=', R('0,7')), ligne('5 ×', F(3, 2), '=', F(15, 2), '=', R('7,5'))]) },
      { etoiles: 3, cahier: true, consigne: `Chaque jour, Lina boit ${T(3, 4)} L de lait. Combien de litres boit-elle en une semaine ? Donne le résultat sous forme d'une fraction, puis d'un nombre décimal.`,
        corr: cm1Redac('Quantité bue en une semaine', `7 × ${F(3, 4)} = ${F(21, 4)}`, `Lina boit ${F(21, 4)} L de lait en une semaine.`) + cm1Redac('Quantité bue en une semaine, en nombre décimal', `${F(21, 4)} = 5,25`, 'Lina boit 5,25 L de lait en une semaine.') },
    ] },
  { titre: 'Prendre une fraction d\'une quantité', duree: '35 min',
    attendus: ['Calculer une fraction d\'une quantité : diviser puis multiplier, ou multiplier puis diviser', 'Choisir la méthode la plus simple', 'Utiliser les fractions dans des problèmes de mesure'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        eleve: plListe([ligne(F(1, 3), 'de 27 =', B()), ligne(F(2, 3), 'de 27 =', B()), ligne(F(3, 5), 'de 40 =', B()), ligne(F(7, 10), 'de 200 =', B())]),
        corr: plListe([ligne(F(1, 3), 'de 27 =', R(9)), ligne(F(2, 3), 'de 27 =', R(18)), ligne(F(3, 5), 'de 40 =', R(24)), ligne(F(7, 10), 'de 200 =', R(140))]) },
      { etoiles: 1, col: 1, consigne: 'Complète avec les deux méthodes.',
        eleve: plListe([ligne(F(3, 4), '× 12 = 3 ×', F(12, 4), '=', B()), ligne(F(3, 4), '× 12 =', F('3 \\times 12', 4), '=', B()), ligne(F(5, 2), '× 7 =', F('5 \\times 7', 2), '=', B())]),
        corr: plListe([ligne(F(3, 4), '× 12 = 3 ×', F(12, 4), '= 3 × 3 =', R(9)), ligne(F(3, 4), '× 12 =', F('3 \\times 12', 4), '=', F(36, 4), '=', R(9)), ligne(F(5, 2), '× 7 =', F('5 \\times 7', 2), '=', F(35, 2), '=', R('17,5'))]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec la bonne unité.',
        eleve: plListe([ligne(F(3, 4), 'd\'heure =', B(), 'min'), ligne(F(2, 5), 'de 1 km =', B(), 'm'), ligne(F(3, 8), 'de 1 kg =', B(), 'g'), ligne(F(5, 6), 'de 1 h =', B(), 'min')]),
        corr: plListe([ligne(F(3, 4), 'd\'heure =', R(45), 'min'), ligne(F(2, 5), 'de 1 km =', R(400), 'm'), ligne(F(3, 8), 'de 1 kg =', R(375), 'g'), ligne(F(5, 6), 'de 1 h =', R(50), 'min')]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        ...signe([[`${T(1, 4)} de 100`, `${T(1, 5)} de 100`, '>', '(25 et 20)'], [`${T(2, 3)} de 60`, `${T(3, 4)} de 60`, '<', '(40 et 45)'], [`${T(5, 10)} de 30`, `${T(1, 2)} de 30`, '=', '(15 et 15)']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Une classe de 28 élèves part en sortie. ${T(3, 7)} des élèves vont au musée, les autres au parc. Combien d'élèves vont au parc ?`,
        corr: cm1Redac('Nombre d\'élèves qui vont au musée', `${F(3, 7)} × 28 = 3 × ${F(28, 7)} = 3 × 4 = 12`, '12 élèves vont au musée.') + cm1Redac('Nombre d\'élèves qui vont au parc', '28 − 12 = 16', '16 élèves vont au parc.') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un réservoir de 60 L est rempli aux ${T(2, 3)}. On utilise ${T(1, 4)} de son contenu. Combien de litres reste-t-il ?`,
        corr: cm1Redac('Contenu du réservoir', `${F(2, 3)} × 60 = 40`, 'Le réservoir contient 40 L.') + cm1Redac('Quantité utilisée', `${F(1, 4)} × 40 = 10`, 'On utilise 10 L.') + cm1Redac('Quantité restante dans le réservoir', '40 − 10 = 30', 'Il reste 30 L.') },
    ] },
  { titre: 'Prendre un pourcentage d\'une quantité', duree: '35 min',
    attendus: ['Savoir que p % de a, c\'est p/100 × a', 'Calculer mentalement 10 %, 25 %, 50 %, 75 %', 'Calculer une réduction ou une augmentation'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        eleve: plListe(['50 % de 84 = ' + B(), '25 % de 84 = ' + B(), '10 % de 350 = ' + B(), '75 % de 40 = ' + B(), '1 % de 600 = ' + B()]),
        corr: plListe(['50 % de 84 = ' + R(42), '25 % de 84 = ' + R(21), '10 % de 350 = ' + R(35), '75 % de 40 = ' + R(30), '1 % de 600 = ' + R(6)]) },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe([ligne('20 % =', Fr, '(sur 100)'), ligne('20 % de 45 =', F(20, 100), '× 45 =', B()), ligne('30 % de 70 =', B()), ligne('15 % de 200 =', B())]),
        corr: plListe([ligne('20 % =', R(F(20, 100))), ligne('20 % de 45 =', F(20, 100), '× 45 =', R(9)), ligne('30 % de 70 =', R(21)), ligne('15 % de 200 =', R(30))]) },
      { etoiles: 2, col: 1, consigne: 'Un jean coûte 60 €. Complète.',
        eleve: plListe(['Réduction de 20 % : ' + B() + ' € de moins ; nouveau prix : ' + B() + ' €', 'Augmentation de 10 % : nouveau prix : ' + B() + ' €']),
        corr: plListe(['Réduction de 20 % : ' + R(12) + ' € de moins ; nouveau prix : ' + R(48) + ' €', 'Augmentation de 10 % : nouveau prix : ' + R(66) + ' €']) },
      { etoiles: 2, col: 1, consigne: 'Dans un collège de 400 élèves, 35 % sont externes. Complète.',
        eleve: plListe(['Nombre d\'externes : ' + B(), 'Pourcentage de non-externes : ' + B() + ' %', 'Nombre de non-externes : ' + B()]),
        corr: plListe(['Nombre d\'externes : ' + R(140), 'Pourcentage de non-externes : ' + R(65) + ' %', 'Nombre de non-externes : ' + R(260)]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un vélo coûte 250 €. Le magasin A propose 20 % de réduction ; le magasin B propose 45 € de réduction. Quel est le magasin le plus avantageux ?',
        corr: cm1Redac('Réduction chez A', `${F(20, 100)} × 250 = ${F(5000, 100)} = 50`, 'La réduction est de 50 €.') + cm1Redac('Prix chez A', '250 − 50 = 200', 'Le vélo coûte 200 € chez A.') + cm1Redac('Prix chez B', '250 − 45 = 205', 'Le vélo coûte 205 € chez B : le magasin A est le plus avantageux.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un yaourt de 125 g contient 4 % de matières grasses. Quelle masse de matières grasses contient-il ? Et 6 yaourts ?',
        corr: cm1Redac('Matières grasses d\'un yaourt', `${F(4, 100)} × 125 = ${F(500, 100)} = 5`, 'Un yaourt contient 5 g de matières grasses.') + cm1Redac('Six yaourts', '6 × 5 = 30', 'Six yaourts en contiennent 30 g.') },
    ] },
  { titre: 'Fractions et pourcentages : problèmes', duree: '40 min',
    attendus: ['Choisir entre fraction, pourcentage et nombre décimal', 'Enchaîner plusieurs calculs', 'Rédiger une réponse complète'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Relie chaque écriture à sa valeur : complète.',
        eleve: plListe([ligne(F(1, 4), '=', B(), '% =', B()), ligne(F(1, 2), '=', B(), '% =', B()), ligne(F(3, 10), '=', B(), '% =', B())]),
        corr: plListe([ligne(F(1, 4), '=', R(25), '% =', R('0,25')), ligne(F(1, 2), '=', R(50), '% =', R('0,5')), ligne(F(3, 10), '=', R(30), '% =', R('0,3'))]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Prendre 50 %, c\'est prendre la moitié.', 'vrai'], [`${T(1, 3)} de 90 vaut plus que 30 % de 90.`, 'vrai'], ['10 % de 10 % de 100 vaut 10.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: `Au marché, Paul achète ${T(3, 4)} kg de cerises à 8 € le kg et ${T(1, 2)} kg de fraises à 6 € le kg. Complète.`,
        eleve: plListe(['Prix des cerises : ' + B() + ' €', 'Prix des fraises : ' + B() + ' €', 'Total : ' + B() + ' €']),
        corr: plListe(['Prix des cerises : ' + R(6) + ' €', 'Prix des fraises : ' + R(3) + ' €', 'Total : ' + R(9) + ' €']) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Un roman a 360 pages. Le premier jour, Sacha lit ${T(1, 4)} du livre ; le deuxième jour, ${T(1, 3)} du livre. Combien de pages lui reste-t-il à lire ? Quelle fraction du livre cela représente-t-il ?`,
        corr: cm1Redac('Pages lues', { suite: [`${F(1, 4)} × 360 = 90`, `${F(1, 3)} × 360 = 120`, '90 + 120 = 210'] }, 'Sacha a lu 210 pages.') + cm1Redac('Pages restantes', '360 − 210 = 150', `Il lui reste 150 pages, soit ${F(150, 360)} = ${F(5, 12)} du livre.`) },
      { etoiles: 3, cahier: true, consigne: 'Le prix d\'un jeu augmente de 10 %, puis baisse de 10 %. Revient-il à son prix de départ (40 €) ? Calcule.',
        corr: cm1Redac('Augmentation du prix', `${F(10, 100)} × 40 = ${F(400, 100)} = 4`, 'Le prix augmente de 4 €.') + cm1Redac('Prix après l\'augmentation', '40 + 4 = 44', 'Après l\'augmentation, le jeu coûte 44 €.')
          + cm1Redac('Baisse du prix', `${F(10, 100)} × 44 = ${F(440, 100)} = 4,40`, 'Le prix baisse de 4,40 €.') + cm1Redac('Prix après la baisse', '44 − 4,40 = 39,60', 'Le jeu coûte 39,60 € : il ne revient pas à 40 €.') },
    ] },
];
})();

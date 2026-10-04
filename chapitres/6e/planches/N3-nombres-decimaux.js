/* ============================================================
   6e · Planches : Nombres décimaux (N3)
   Fractions décimales, nom des chiffres, demi-droite graduée, comparaison, encadrement, problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac(), C = plCase();
const lt = '&lt;', gt = '&gt;';
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const ch = it => ({ eleve: plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)), corr: plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) });
const suite = (n, l, sg) => '<div style="text-align:center;line-height:2.4;">' + (Array.isArray(n) ? n.map(R) : Array.from({ length: n }, () => B(l))).join(` ${sg} `) + '</div>';
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const dec = v => String(+v.toFixed(4)).replace('.', ',');
// Demi-droite graduée à lire (points nommés) ; place : version « place les points » à l'écran (outil points).
const axe = (min, max, pas, etiq, pts) => cm1Axe(min, max, pas, etiq, pts, { fmt: dec, alterne: true });
function place(min, max, pas, etiq, pts){ const L = 460, px = v => 30 + L * (v - min) / (max - min), n = Math.round((max - min) / pas);
  return { eleve: plX(cm1Axe(min, max, pas, etiq, [], { fmt: dec }), { t: 'pts', tol: Math.min(18, L / n * .45), noms: pts.map(p => p[1]), cands: Array.from({ length: n + 1 }, (_, i) => [px(min + i * pas), 44]), att: Object.fromEntries(pts.map(([v, nm]) => [nm, [px(v), 44]])) }),
    corr: axe(min, max, pas, etiq, pts) }; }
const lire = (min, max, pas, etiq, pts) => { const a = axe(min, max, pas, etiq, pts), l = f => `<div style="display:flex;gap:26px;justify-content:center;flex-wrap:wrap;">${pts.map(([v, n]) => `<span>${n} : ${f(v)}</span>`).join('')}</div>`;
  return { eleve: a + l(() => B(5)), corr: a + l(v => R(dec(v))) }; };
PLANCHES['6e|Nombres décimaux'] = [
  { titre: 'Dixièmes, centièmes, millièmes', duree: '35 min',
    attendus: ['Connaître les sous-multiples de l\'unité : dixième, centième, millième', 'Passer d\'une fraction décimale à l\'écriture décimale', 'Utiliser les relations entre unités, dixièmes, centièmes et millièmes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        eleve: plListe(['1 unité = ' + B(3) + ' dixièmes', '1 dixième = ' + B(3) + ' centièmes', '1 unité = ' + B(4) + ' centièmes', '1 unité = ' + B(4) + ' millièmes', '1 centième = ' + B(3) + ' millièmes']),
        corr: plListe(['1 unité = ' + R(10) + ' dixièmes', '1 dixième = ' + R(10) + ' centièmes', '1 unité = ' + R(100) + ' centièmes', '1 unité = ' + R('1 000') + ' millièmes', '1 centième = ' + R(10) + ' millièmes']) },
      { etoiles: 1, col: 1, consigne: 'Écris chaque nombre sous forme décimale.',
        eleve: plListe(['3 dixièmes = ' + B(), '45 centièmes = ' + B(), '7 millièmes = ' + B(), '12 dixièmes = ' + B(), '305 centièmes = ' + B()]),
        corr: plListe(['3 dixièmes = ' + R('0,3'), '45 centièmes = ' + R('0,45'), '7 millièmes = ' + R('0,007'), '12 dixièmes = ' + R('1,2'), '305 centièmes = ' + R('3,05')]) },
      { etoiles: 1, col: 1, consigne: 'Écris chaque fraction décimale sous forme décimale.',
        eleve: plListe([ligne(F(7, 10), '=', B()), ligne(F(58, 100), '=', B()), ligne(F(4, 100), '=', B()), ligne(F(1253, 1000), '=', B()), ligne(F(90, 1000), '=', B())]),
        corr: plListe([ligne(F(7, 10), '=', R('0,7')), ligne(F(58, 100), '=', R('0,58')), ligne(F(4, 100), '=', R('0,04')), ligne(F(1253, 1000), '=', R('1,253')), ligne(F(90, 1000), '=', R('0,09'))]) },
      { etoiles: 2, col: 1, consigne: 'Écris chaque nombre sous forme d\'une fraction décimale.',
        eleve: plListe([ligne('0,9 =', Fr), ligne('0,37 =', Fr), ligne('2,4 =', Fr), ligne('0,006 =', Fr), ligne('15,02 =', Fr)]),
        corr: plListe([ligne('0,9 =', R(F(9, 10))), ligne('0,37 =', R(F(37, 100))), ligne('2,4 =', R(F(24, 10))), ligne('0,006 =', R(F(6, 1000))), ligne('15,02 =', R(F(1502, 100)))]) },
      { etoiles: 2, col: 1, consigne: 'Quelle fraction de l\'unité est coloriée ? Écris-la sous forme décimale.',
        ...(() => { const f = [[cm1Bande(10, 7, { largeur: 150 }), '0,7'], [cm1Quad(10, 10, Array.from({ length: 34 }, (_, i) => [i % 10, Math.floor(i / 10)]), { k: 9, c: '#7A4FC0' }), '0,34']];
          return { eleve: plGrille(f.map(([s]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${s}<span>${B()}</span></span>`), 2), corr: plGrille(f.map(([s, r]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${s}<span>${R(r)}</span></span>`), 2) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien y a-t-il de centièmes dans 4 unités ? Dans 4,5 ? Dans 0,08 ? Explique.',
        corr: cm1Redac('Nombre de centièmes', { suite: ['4 unités = 4 × 100 centièmes = 400 centièmes.', '4,5 = 4 unités et 5 dixièmes = 400 + 50 = 450 centièmes.', '0,08 = 8 centièmes.'] }, 'Il y a 400, puis 450, puis 8 centièmes.') },
    ] },
  { titre: 'Décomposition et nom des chiffres', duree: '35 min',
    attendus: ['Connaître la valeur de chaque chiffre selon son rang', 'Décomposer un nombre décimal', 'Passer de l\'écriture en lettres à l\'écriture en chiffres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Dans le nombre 352,867 :',
        eleve: plListe(['le chiffre des dixièmes est ' + B(1), 'le chiffre des centièmes est ' + B(1), 'le chiffre des millièmes est ' + B(1), 'le chiffre des dizaines est ' + B(1), 'la partie entière est ' + B(3)]),
        corr: plListe(['le chiffre des dixièmes est ' + R(8), 'le chiffre des centièmes est ' + R(6), 'le chiffre des millièmes est ' + R(7), 'le chiffre des dizaines est ' + R(5), 'la partie entière est ' + R(352)]) },
      { etoiles: 1, col: 1, consigne: 'Écris le nombre décrit.',
        eleve: plListe(['4 unités, 2 dixièmes et 5 centièmes : ' + B(), '3 dizaines et 8 millièmes : ' + B(), '7 centièmes : ' + B(), '6 unités et 3 millièmes : ' + B()]),
        corr: plListe(['4 unités, 2 dixièmes et 5 centièmes : ' + R('4,25'), '3 dizaines et 8 millièmes : ' + R('30,008'), '7 centièmes : ' + R('0,07'), '6 unités et 3 millièmes : ' + R('6,003')]) },
      { etoiles: 2, consigne: 'Complète les décompositions.',
        eleve: plListe([ligne('3,47 = 3 +', F(4, 10), '+', Fr), ligne('12,305 = 12 +', Fr, '+', F(5, 1000)), ligne('8,06 = 8 +', Fr), ligne('5 +', F(2, 10), '+', F(9, 1000), '=', B())]),
        corr: plListe([ligne('3,47 = 3 +', F(4, 10), '+', R(F(7, 100))), ligne('12,305 = 12 +', R(F(3, 10)), '+', F(5, 1000)), ligne('8,06 = 8 +', R(F(6, 100))), ligne('5 +', F(2, 10), '+', F(9, 1000), '=', R('5,209'))]) },
      { etoiles: 2, col: 1, consigne: 'Écris en chiffres.',
        eleve: plListe(['trois unités et quarante-sept centièmes : ' + B(), 'douze et cinq dixièmes : ' + B(), 'deux cent huit millièmes : ' + B(), 'vingt unités et six centièmes : ' + B()]),
        corr: plListe(['trois unités et quarante-sept centièmes : ' + R('3,47'), 'douze et cinq dixièmes : ' + R('12,5'), 'deux cent huit millièmes : ' + R('0,208'), 'vingt unités et six centièmes : ' + R('20,06')]) },
      { etoiles: 2, col: 1, consigne: 'Ces écritures désignent-elles le nombre 4,07 ? Entoure.',
        ...ch([['4 + ' + F(7, 100) + ' :', 'oui', 'oui · non'], ['4 + ' + F(7, 10) + ' :', 'non', 'oui · non'], [F(407, 100) + ' :', 'oui', 'oui · non'], ['4,070 :', 'oui', 'oui · non'], ['4,7 :', 'non', 'oui · non']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris tous les nombres décimaux qui ont deux chiffres après la virgule, en utilisant une seule fois chacun des chiffres 3, 0 et 5, avec un seul chiffre avant la virgule. Range-les dans l\'ordre croissant.',
        corr: cm1Redac('Les six nombres', { suite: ['0,35 ; 0,53 ; 3,05 ; 3,50 ; 5,03 ; 5,30'] }, 'Dans l\'ordre croissant : 0,35 &lt; 0,53 &lt; 3,05 &lt; 3,50 &lt; 5,03 &lt; 5,30.') },
    ] },
  { titre: 'Repérage sur une demi-droite graduée', duree: '35 min',
    attendus: ['Lire l\'abscisse d\'un point sur une demi-droite graduée', 'Placer un nombre décimal sur une demi-droite graduée', 'Choisir la bonne graduation : dixièmes, centièmes'],
    exos: [
      { etoiles: 1, consigne: 'Lis l\'abscisse de chaque point (la graduation est en dixièmes).', ...lire(0, 2, .1, .5, [[.3, 'A'], [.8, 'B'], [1.4, 'C'], [1.9, 'D']]) },
      { etoiles: 2, consigne: 'Lis l\'abscisse de chaque point (la graduation est en centièmes).', ...lire(3.2, 3.4, .01, .05, [[3.23, 'E'], [3.31, 'F'], [3.38, 'G']]) },
      { etoiles: 2, consigne: 'Place les points H(2,6), I(3,1) et J(4,9).', ...place(2, 5, .1, .5, [[2.6, 'H'], [3.1, 'I'], [4.9, 'J']]) },
      { etoiles: 2, consigne: 'Place les points K(0,15), L(0,08) et M(0,2).', ...place(0, .2, .01, .05, [[.15, 'K'], [.08, 'L'], [.2, 'M']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trace une demi-droite graduée où 1 unité mesure 10 cm. Place les points d\'abscisses 0,4 ; 0,45 ; 0,5 et 0,62. Explique combien mesure un centième.',
        corr: cm1Redac('Graduation', { suite: ['1 unité = 10 cm, donc 1 dixième = 1 cm et 1 centième = 1 mm.', '0,4 : à 4 cm ; 0,45 : à 4,5 cm ; 0,5 : à 5 cm ; 0,62 : à 6,2 cm de l\'origine.'] }, 'Un centième de l\'unité mesure 1 mm.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une demi-droite graduée, le point A a pour abscisse 2,3 et le point B a pour abscisse 2,4. Cite trois nombres dont le point serait entre A et B.',
        corr: cm1Redac('Nombres entre 2,3 et 2,4', '2,3 = 2,30 et 2,4 = 2,40', 'Par exemple 2,31 ; 2,35 et 2,38 (il y en a une infinité : 2,301 ; 2,3005…).') },
    ] },
  { titre: 'Comparer et ranger des nombres décimaux', duree: '35 min',
    attendus: ['Comparer deux nombres décimaux', 'Ranger des nombres décimaux dans l\'ordre croissant ou décroissant', 'Intercaler un nombre décimal entre deux autres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`4,7 ${C} 4,12`, `0,5 ${C} 0,50`, `12,03 ${C} 12,3`, `7,099 ${C} 7,1`, `0,8 ${C} 0,09`]),
        corr: plListe([`4,7 ${R(gt)} 4,12`, `0,5 ${R('=')} 0,50`, `12,03 ${R(lt)} 12,3`, `7,099 ${R(lt)} 7,1`, `0,8 ${R(gt)} 0,09`]) },
      { etoiles: 1, col: 1, consigne: 'Barre les zéros inutiles en réécrivant chaque nombre.',
        eleve: plListe(['05,20 = ' + B(), '012,050 = ' + B(), '7,000 = ' + B(), '30,600 = ' + B()]),
        corr: plListe(['05,20 = ' + R('5,2'), '012,050 = ' + R('12,05'), '7,000 = ' + R(7), '30,600 = ' + R('30,6')]) },
      { etoiles: 2, consigne: 'Range dans l\'ordre croissant : 3,5 ; 3,05 ; 3,55 ; 3,505 ; 3,055.',
        eleve: suite(5, 5, lt), corr: suite(['3,05', '3,055', '3,5', '3,505', '3,55'], 0, lt) },
      { etoiles: 2, consigne: 'Range dans l\'ordre décroissant : 0,7 ; 0,07 ; 0,77 ; 0,707 ; 0,077.',
        eleve: suite(5, 5, gt), corr: suite(['0,77', '0,707', '0,7', '0,077', '0,07'], 0, gt) },
      { etoiles: 2, col: 1, consigne: 'Intercale un nombre entre les deux nombres (plusieurs réponses possibles ; écris celle du milieu).',
        eleve: plListe([`4 ${lt} ${B()} ${lt} 5`, `2,3 ${lt} ${B()} ${lt} 2,4`, `0,15 ${lt} ${B()} ${lt} 0,16`]),
        corr: plListe([`4 ${lt} ${R('4,5')} ${lt} 5`, `2,3 ${lt} ${R('2,35')} ${lt} 2,4`, `0,15 ${lt} ${R('0,155')} ${lt} 0,16`]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au saut en longueur, Inès a sauté 3,8 m, Hugo 3,75 m, Léa 3,805 m et Sami 3,08 m. Établis le classement, du premier au dernier. Explique ta méthode.',
        corr: cm1Redac('Comparaison', { suite: ['On écrit tous les nombres avec trois chiffres après la virgule : 3,800 ; 3,750 ; 3,805 ; 3,080.', 'On compare : 3,805 &gt; 3,800 &gt; 3,750 &gt; 3,080.'] }, 'Classement : 1re Léa, 2e Inès, 3e Hugo, 4e Sami.') },
    ] },
  { titre: 'Encadrer et arrondir', duree: '35 min',
    attendus: ['Encadrer un nombre décimal à l\'unité, au dixième, au centième', 'Arrondir un nombre décimal', 'Donner une valeur approchée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Encadre chaque nombre entre deux entiers consécutifs.',
        eleve: plListe([`${B(2)} ${lt} 7,4 ${lt} ${B(2)}`, `${B(2)} ${lt} 12,96 ${lt} ${B(2)}`, `${B(2)} ${lt} 0,3 ${lt} ${B(2)}`, `${B(2)} ${lt} 99,01 ${lt} ${B(3)}`]),
        corr: plListe([`${R(7)} ${lt} 7,4 ${lt} ${R(8)}`, `${R(12)} ${lt} 12,96 ${lt} ${R(13)}`, `${R(0)} ${lt} 0,3 ${lt} ${R(1)}`, `${R(99)} ${lt} 99,01 ${lt} ${R(100)}`]) },
      { etoiles: 1, col: 1, consigne: 'Encadre au dixième près.',
        eleve: plListe([`${B()} ${lt} 5,63 ${lt} ${B()}`, `${B()} ${lt} 0,418 ${lt} ${B()}`, `${B()} ${lt} 9,97 ${lt} ${B()}`]),
        corr: plListe([`${R('5,6')} ${lt} 5,63 ${lt} ${R('5,7')}`, `${R('0,4')} ${lt} 0,418 ${lt} ${R('0,5')}`, `${R('9,9')} ${lt} 9,97 ${lt} ${R(10)}`]) },
      { etoiles: 2, consigne: 'Complète le tableau des arrondis.',
        eleve: tab(['Nombre', 'à l\'unité', 'au dixième', 'au centième'], [['4,728', B(2), B(3), B(4)], ['15,0549', B(2), B(3), B(4)], ['0,996', B(2), B(3), B(4)]]),
        corr: tab(['Nombre', 'à l\'unité', 'au dixième', 'au centième'], [['4,728', R(5), R('4,7'), R('4,73')], ['15,0549', R(15), R('15,1'), R('15,05')], ['0,996', R(1), R(1), R(1)]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'arrondi au dixième.',
        ...ch([['3,46 :', '3,5', '3,4 · 3,5 · 3,46'], ['12,04 :', '12', '12 · 12,1 · 12,04'], ['0,95 :', '1', '0,9 · 1 · 0,95']]) },
      { etoiles: 2, col: 1, consigne: 'Un paquet de 3 stylos coûte 4,79 €. Complète.',
        eleve: plListe(['Arrondi du prix à l\'euro : ' + B(2) + ' €', 'Encadrement à l\'euro : ' + B(2) + ' € &lt; 4,79 € &lt; ' + B(2) + ' €', 'Avec 5 €, peut-on acheter le paquet ? <b>oui · non</b>']),
        corr: plListe(['Arrondi du prix à l\'euro : ' + R(5) + ' €', 'Encadrement à l\'euro : ' + R(4) + ' € &lt; 4,79 € &lt; ' + R(5) + ' €', 'Avec 5 €, peut-on acheter le paquet ? ' + plEntoure('oui')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le nombre π vaut environ 3,14159. Donne son arrondi à l\'unité, au dixième, au centième et au millième. Explique ta méthode pour le centième.',
        corr: cm1Redac('Arrondis de π', { suite: ['à l\'unité : 3 ; au dixième : 3,1', 'au centième : 3,14 ; au millième : 3,142'] }, 'Pour le centième, je regarde le chiffre des millièmes (1) : il est inférieur à 5, donc j\'arrondis à 3,14.') },
    ] },
  { titre: 'Problèmes avec des nombres décimaux', duree: '40 min',
    attendus: ['Utiliser les nombres décimaux dans les mesures (longueurs, masses, prix)', 'Comparer et ranger des mesures', 'Changer d\'unité à l\'aide des nombres décimaux'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris chaque longueur en mètres.',
        eleve: plListe(['3 m 45 cm = ' + B() + ' m', '7 dm = ' + B() + ' m', '25 cm = ' + B() + ' m', '4 m 8 cm = ' + B() + ' m', '6 mm = ' + B() + ' m']),
        corr: plListe(['3 m 45 cm = ' + R('3,45') + ' m', '7 dm = ' + R('0,7') + ' m', '25 cm = ' + R('0,25') + ' m', '4 m 8 cm = ' + R('4,08') + ' m', '6 mm = ' + R('0,006') + ' m']) },
      { etoiles: 1, col: 1, consigne: 'Écris chaque masse en kilogrammes.',
        eleve: plListe(['2 kg 500 g = ' + B() + ' kg', '750 g = ' + B() + ' kg', '1 kg 25 g = ' + B() + ' kg', '8 g = ' + B() + ' kg']),
        corr: plListe(['2 kg 500 g = ' + R('2,5') + ' kg', '750 g = ' + R('0,75') + ' kg', '1 kg 25 g = ' + R('1,025') + ' kg', '8 g = ' + R('0,008') + ' kg']) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande mesure.',
        ...ch([['1,5 m ou 145 cm :', '1,5 m', '1,5 m · 145 cm'], ['0,8 kg ou 790 g :', '0,8 kg', '0,8 kg · 790 g'], ['2,05 € ou 2 € 50 c :', '2 € 50 c', '2,05 € · 2 € 50 c']]) },
      { etoiles: 2, col: 1, consigne: 'Voici les temps de quatre nageurs au 50 m : Ali 31,48 s ; Bea 31,5 s ; Cyril 31,09 s ; Dina 31,4 s. Complète.',
        eleve: plListe(['Le plus rapide est ' + B(), 'Le plus lent est ' + B(), 'Temps de Dina arrondi à la seconde : ' + B(2) + ' s']),
        corr: plListe(['Le plus rapide est ' + R('Cyril'), 'Le plus lent est ' + R('Bea'), 'Temps de Dina arrondi à la seconde : ' + R(31) + ' s']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une planche mesure 2,4 m. Paul veut y découper des étagères de 0,75 m. Combien d\'étagères peut-il découper ? Quelle longueur reste-t-il ? Explique avec des centimètres.',
        corr: cm1Redac('En centimètres', { suite: ['2,4 m = 240 cm et 0,75 m = 75 cm.', '75 × 3 = 225 et 75 × 4 = 300 (trop long).', '240 − 225 = 15'] }, 'Paul peut découper 3 étagères ; il reste 15 cm, soit 0,15 m.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un nombre a 2 chiffres après la virgule. Son arrondi au dixième est 4,6 et son chiffre des centièmes est 8. Quel est ce nombre ?',
        corr: cm1Redac('Recherche', { suite: ['Le nombre s\'écrit 4,?8 et son arrondi au dixième est 4,6.', 'Avec 8 centièmes, on arrondit au dixième supérieur : 4,58 → 4,6.'] }, 'Le nombre est 4,58.') },
    ] },
];
})();

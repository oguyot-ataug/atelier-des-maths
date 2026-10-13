/* ============================================================
   CM2 · Planches : Grands nombres jusqu'à 999 999 999 (N7)
   La classe des millions ; chiffre des… et nombre de… ; comparer, encadrer, arrondir ;
   demi-droite graduée.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 6), R = v => plRep(String(v)), C = plCase();
const { rmp, ch, chx } = P3;
const lt = '&lt;', gt = '&gt;';
const sp = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
PLANCHES['cm2|Grands nombres jusqu\'à 999 999 999'] = [
  { titre: 'Lire et écrire les grands nombres', duree: '35 min',
    attendus: ['Connaître la classe des millions', 'Écrire un grand nombre en chiffres et en lettres', 'Distinguer « chiffre des… » et « nombre de… »'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...rmp([['trois millions deux cent mille : @', '3 200 000'], ['quarante-cinq millions six cent mille huit cents : @', '45 600 800'], ['deux cent un millions trente : @', '201 000 030']], 6) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...rmp([['7 050 000 : @', 'sept millions cinquante mille'], ['12 300 400 : @', 'douze millions trois cent mille quatre cents']], 16) },
      { etoiles: 2, col: 1, consigne: 'Dans le nombre 584 316 270 :',
        ...rmp([['le chiffre des millions est @', 4], ['le nombre de millions est @', 584], ['le chiffre des dizaines de mille est @', 1], ['le nombre de milliers est @', '584 316']]) },
      { etoiles: 3, cahier: true, consigne: 'La population de la France est d\'environ 68 400 000 habitants. Écris ce nombre en lettres. Combien de millions d\'habitants cela fait-il, environ ?',
        corr: cm1Redac('En lettres', '68 400 000', 'Soixante-huit millions quatre cent mille habitants.') + cm1Redac('En millions', '68 400 000 est proche de 68 millions.', 'La France compte environ 68 millions d\'habitants.') },
    ] },
  { titre: 'Comparer, ranger, encadrer, arrondir', duree: '30 min',
    attendus: ['Comparer et ranger des grands nombres', 'Encadrer un grand nombre', 'Arrondir au million'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`4 500 000 ${C} 450 000`, `12 008 000 ${C} 12 080 000`, `1 million ${C} 1 000 000`]),
        corr: plListe([`4 500 000 ${R(gt)} 450 000`, `12 008 000 ${R(lt)} 12 080 000`, `1 million ${R('=')} 1 000 000`]) },
      { etoiles: 2, col: 1, consigne: 'Arrondis au million le plus proche.',
        ...rmp([['3 845 000 → @', '4 000 000'], ['27 210 500 → @', '27 000 000'], ['999 600 → @', '1 000 000']]) },
      { etoiles: 2, col: 1, consigne: 'Encadre au million.',
        eleve: plListe([`${B()} ${lt} 6 708 000 ${lt} ${B()}`, `${B()} ${lt} 45 100 900 ${lt} ${B()}`]),
        corr: plListe([`${R('6 000 000')} ${lt} 6 708 000 ${lt} ${R('7 000 000')}`, `${R('45 000 000')} ${lt} 45 100 900 ${lt} ${R('46 000 000')}`]) },
      { etoiles: 3, cahier: true, consigne: 'Distances moyennes au Soleil : Mars 227 900 000 km ; Vénus 108 200 000 km ; Terre 149 600 000 km. Range ces planètes de la plus proche à la plus éloignée du Soleil.',
        corr: cm1Redac('Comparaison', '108 200 000 < 149 600 000 < 227 900 000', 'De la plus proche à la plus éloignée : Vénus, la Terre, puis Mars.') },
    ] },
  { titre: 'Demi-droite graduée et problèmes', duree: '30 min',
    attendus: ['Lire des grands nombres sur une demi-droite graduée', 'Ajouter ou retirer un million, cent mille…', 'Utiliser les grands nombres dans un problème'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre correspondant à chaque point.',
        eleve: cm1Axe(0, 5500000, 500000, 1000000, [[1500000, 'A'], [3000000, 'B'], [4500000, 'C']], { fmt: sp }) + `<div style="display:flex;gap:24px;justify-content:center;"><span>A : ${B()}</span><span>B : ${B()}</span><span>C : ${B()}</span></div>`,
        corr: cm1Axe(0, 5500000, 500000, 1000000, [[1500000, 'A'], [3000000, 'B'], [4500000, 'C']], { fmt: sp }) + `<div style="display:flex;gap:24px;justify-content:center;"><span>A : ${R('1 500 000')}</span><span>B : ${R('3 000 000')}</span><span>C : ${R('4 500 000')}</span></div>` },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['1 million de plus que 7 400 000 : @', '8 400 000'], ['100 000 de moins que 5 000 000 : @', '4 900 000'], ['Le nombre qui suit 9 999 999 : @', '10 000 000']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['1 milliard s\'écrit 1 000 000 000.', 'vrai'], ['Dans 45 000 000, il y a 45 millions.', 'vrai'], ['10 millions = 1 000 000.', 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Un stade a accueilli 1 250 000 spectateurs en 2025 et 1 410 000 en 2026. De combien le nombre de spectateurs a-t-il augmenté ?',
        corr: cm1Redac('Augmentation', '1 410 000 − 1 250 000 = 160 000', 'Le nombre de spectateurs a augmenté de 160 000.') },
    ] },
];
})();

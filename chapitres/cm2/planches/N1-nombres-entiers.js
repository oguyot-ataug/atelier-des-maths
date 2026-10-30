/* ============================================================
   CM2 · Planches : Nombres entiers (révisions jusqu'à 999 999) (N1)
   Lire, écrire, décomposer ; chiffre des… et nombre de… ; comparer, ranger, encadrer, arrondir ;
   demi-droite graduée et devinettes. Outils : chapitres/cm1/_commun.js, P3 (rmp, ch, chx).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 5), R = v => plRep(String(v)), C = plCase();
const { rmp, ch, chx } = P3;
const lt = '&lt;', gt = '&gt;';
const sp = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
PLANCHES['cm2|Nombres entiers (révisions jusqu\'à 999 999)'] = [
  { titre: 'Lire, écrire et décomposer', duree: '35 min',
    attendus: ['Écrire un nombre en chiffres et en lettres', 'Décomposer un nombre', 'Distinguer « chiffre des… » et « nombre de… »'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...rmp([['deux-cent-quarante-trois-mille-cinq-cent-six : @', '243 506'], ['neuf-cent-mille-quatre-vingts : @', '900 080'], ['soixante-dix-mille-sept : @', '70 007']], 5) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...rmp([['15 230 : @', 'quinze-mille-deux-cent-trente'], ['408 060 : @', 'quatre-cent-huit-mille-soixante']], 14) },
      { etoiles: 1, col: 1, consigne: 'Complète la décomposition.',
        ...rmp([['352 718 = 300 000 + @ + @ + 700 + 10 + 8', '50 000', '2 000'], ['60 405 = 60 000 + @ + 5', 400], ['7 centaines de mille + 3 dizaines = @', '700 030']]) },
      { etoiles: 2, col: 1, consigne: 'Dans le nombre 638 452 :',
        ...rmp([['le chiffre des milliers est @', 8], ['le nombre de milliers est @', 638], ['le chiffre des centaines est @', 4], ['le nombre de centaines est @', '6 384']]) },
      { etoiles: 3, cahier: true, consigne: 'Avec les chiffres 4, 0, 7, 2, 9 et 5 (une seule fois chacun), écris le plus grand et le plus petit nombre de six chiffres.',
        corr: cm1Redac('Le plus grand', 'On range les chiffres du plus grand au plus petit.', 'Le plus grand nombre est 975 420.') + cm1Redac('Le plus petit', 'Un nombre ne commence pas par 0 : on met 2 en premier, puis 0.', 'Le plus petit nombre est 204 579.') },
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.', ...P3.rmp([['deux-cent-mille-trois-cent-quatre : @', '200 304'], ['six-cent-quarante-mille : @', '640 000']], 4) },
      { etoiles: 2, col: 1, consigne: 'Dans le nombre 905 213 :', ...P3.rmp([['le chiffre des dizaines de mille : @', 0], ['le nombre de milliers : @', 905]], 3) },
    ] },
  { titre: 'Comparer, ranger, encadrer, arrondir', duree: '35 min',
    attendus: ['Comparer deux nombres', 'Ranger des nombres', 'Encadrer et arrondir un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`45 678 ${C} 45 687`, `120 300 ${C} 99 999`, `708 010 ${C} 708 001`, `30 000 ${C} 3 dizaines de mille`]),
        corr: plListe([`45 678 ${R(lt)} 45 687`, `120 300 ${R(gt)} 99 999`, `708 010 ${R(gt)} 708 001`, `30 000 ${R('=')} 3 dizaines de mille`]) },
      { etoiles: 2, col: 1, consigne: 'Range dans l\'ordre croissant : 54 320 ; 5 432 ; 543 200 ; 54 302.',
        eleve: `<p>${B(4)} ${lt} ${B(4)} ${lt} ${B(4)} ${lt} ${B(4)}</p>`,
        corr: `<p>${R('5 432')} ${lt} ${R('54 302')} ${lt} ${R('54 320')} ${lt} ${R('543 200')}</p>` },
      { etoiles: 2, col: 1, consigne: 'Encadre.',
        eleve: plListe([`à la dizaine de mille : ${B(4)} ${lt} 236 450 ${lt} ${B(4)}`, `à la centaine : ${B(4)} ${lt} 48 762 ${lt} ${B(4)}`]),
        corr: plListe([`à la dizaine de mille : ${R('230 000')} ${lt} 236 450 ${lt} ${R('240 000')}`, `à la centaine : ${R('48 700')} ${lt} 48 762 ${lt} ${R('48 800')}`]) },
      { etoiles: 2, col: 1, consigne: 'Arrondis au millier le plus proche.',
        ...rmp([['72 480 → @', '72 000'], ['159 650 → @', '160 000'], ['8 501 → @', '9 000']]) },
      { etoiles: 3, cahier: true, consigne: 'Voici le nombre d\'habitants de quatre villes : Annecy 131 272 ; Dijon 158 002 ; Nancy 104 403 ; Brest 139 342. Range-les de la moins peuplée à la plus peuplée, puis arrondis la population de Dijon à la dizaine de mille.',
        corr: cm1Redac('Rangement', 'Nancy, Annecy, Brest, Dijon', 'Du moins peuplé au plus peuplé : Nancy, Annecy, Brest, puis Dijon.') + cm1Redac('Arrondi', '158 002 est entre 150 000 et 160 000, plus près de 160 000.', 'Dijon compte environ 160 000 habitants.') },
      { etoiles: 1, col: 1, consigne: 'Complète avec <, > ou =.', ...P3.rmp([['409 999 @ 410 000', '<'], ['78 600 @ 78 060', '>'], ['300 000 @ 3 centaines de mille', '=']], 1) },
      { etoiles: 2, col: 1, consigne: 'Arrondis à la centaine la plus proche.', ...P3.rmp([['45 672 : @', '45 700'], ['129 349 : @', '129 300']], 4) },
      { etoiles: 2, consigne: 'Entoure le nombre le plus proche de 100 000.', ...P3.chx2([['', '99 800', '98 000 · 99 800 · 101 000'], ['', '100 090', '100 900 · 100 090 · 99 000']]) },
    ] },
  { titre: 'Demi-droite graduée et devinettes', duree: '30 min',
    attendus: ['Lire et placer des nombres sur une demi-droite graduée', 'Trouver le nombre qui suit ou qui précède', 'Résoudre une devinette sur les nombres'],
    exos: [
      { etoiles: 1, consigne: 'Écris le nombre correspondant à chaque point.',
        eleve: cm1Axe(300000, 400000, 10000, 50000, [[320000, 'A'], [370000, 'B'], [390000, 'C']], { fmt: sp }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${B()}</span><span>B : ${B()}</span><span>C : ${B()}</span></div>`,
        corr: cm1Axe(300000, 400000, 10000, 50000, [[320000, 'A'], [370000, 'B'], [390000, 'C']], { fmt: sp }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${R('320 000')}</span><span>B : ${R('370 000')}</span><span>C : ${R('390 000')}</span></div>` },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Le nombre qui suit 99 999 : @', '100 000'], ['Le nombre qui précède 400 000 : @', '399 999'], ['1 000 de plus que 245 800 : @', '246 800'], ['10 000 de moins que 503 200 : @', '493 200']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Dans 456 789, le chiffre 6 vaut 6 000.', 'vrai'], ['100 000 c\'est 100 milliers.', 'vrai'], ['Le plus grand nombre de 5 chiffres est 99 990.', 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: 'Devinette : je suis un nombre de six chiffres. Mon chiffre des centaines de mille est 3, mon chiffre des unités est le double de celui-ci, tous mes autres chiffres sont des 0, sauf mon chiffre des milliers qui vaut 5. Qui suis-je ?',
        corr: cm1Redac('Chiffre par chiffre', { suite: ['centaines de mille : 3', 'milliers : 5', 'unités : 3 × 2 = 6', 'les autres chiffres : 0'] }, 'Je suis 305 006.') },
      { etoiles: 1, col: 1, consigne: 'Complète la suite.', ...P3.rmp([['99 998 ; 99 999 ; @', '100 000'], ['250 000 ; 300 000 ; @ ; @', '350 000', '400 000']], 4) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['10 000 de plus que 995 000 : @', '1 005 000'], ['1 000 de moins que 100 000 : @', '99 000']], 4) },
    ] },
];
})();

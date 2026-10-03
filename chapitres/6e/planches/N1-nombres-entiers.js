/* ============================================================
   6e · Planches d'exercices imprimables : Nombres entiers (N1)
   Même fonctionnement qu'au primaire (planches.js) : énoncé, corrigé rédigé, version à l'écran.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 5), R = v => plRep(String(v)), C = plCase();
const lt = '&lt;', gt = '&gt;';
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const pose = (a, op, b, res, o) => cm1Posee([[' ', a], [op, b], [' ', res]], '', o);
const div = (a, b) => typeof divisionPoseeHTML === 'function' ? `<div class="pl-div">${divisionPoseeHTML(computeDivisionPosee(a, b))}</div>` : '';
const grille = (l, h) => cm1Quad(l || 10, h || 7, [], { k: 16, largeur: (l || 10) * 16 });
PLANCHES['6e|Nombres entiers'] = [
  { titre: 'Les grands nombres', duree: '35 min',
    attendus: ['Lire et écrire les grands nombres (jusqu\'aux milliards)', 'Connaître la valeur de chaque chiffre selon son rang', 'Comparer, ranger, encadrer de grands nombres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        eleve: plListe(['deux-millions-trois-cent-mille : ' + B(8), 'quarante-millions-cinquante : ' + B(8), 'trois-milliards-deux-millions : ' + B(9), 'six-cent-mille-six : ' + B(8)]),
        corr: plListe(['deux-millions-trois-cent-mille : ' + R('2 300 000'), 'quarante-millions-cinquante : ' + R('40 000 050'), 'trois-milliards-deux-millions : ' + R('3 002 000 000'), 'six-cent-mille-six : ' + R('600 006')]) },
      { etoiles: 1, col: 1, consigne: 'Dans le nombre 7 253 048 916, quel est…',
        eleve: plListe(['le chiffre des millions ? ' + B(2), 'le chiffre des centaines de mille ? ' + B(2), 'le nombre de millions ? ' + B(4), 'le nombre de milliers ? ' + B(6)]),
        corr: plListe(['le chiffre des millions ? ' + R(3), 'le chiffre des centaines de mille ? ' + R(0), 'le nombre de millions ? ' + R('7 253'), 'le nombre de milliers ? ' + R('7 253 048')]) },
      { etoiles: 2, consigne: 'Complète le tableau : écris chaque nombre en chiffres, puis décompose-le.',
        eleve: tab(['En lettres', 'En chiffres', 'Décomposition'], [['cinq-millions-quarante-mille-huit', B(7), B(14)], ['douze-millions-trois-cents', B(7), B(14)]]),
        corr: tab(['En lettres', 'En chiffres', 'Décomposition'], [['cinq-millions-quarante-mille-huit', R('5 040 008'), R('5 000 000 + 40 000 + 8')], ['douze-millions-trois-cents', R('12 000 300'), R('12 000 000 + 300')]]) },
      { etoiles: 2, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`3 400 500 ${C} 3 045 500`, `999 999 ${C} 1 000 000`, `12 milliards ${C} 12 000 000 000`, `80 080 800 ${C} 80 800 080`]),
        corr: plListe([`3 400 500 ${R(gt)} 3 045 500`, `999 999 ${R(lt)} 1 000 000`, `12 milliards ${R('=')} 12 000 000 000`, `80 080 800 ${R(lt)} 80 800 080`]) },
      { etoiles: 2, col: 1, consigne: 'Encadre au million près.',
        eleve: plListe([`${B(8)} &lt; 4 752 300 &lt; ${B(8)}`, `${B(8)} &lt; 19 080 000 &lt; ${B(8)}`, `${B(8)} &lt; 600 001 &lt; ${B(8)}`]),
        corr: plListe([`${R('4 000 000')} &lt; 4 752 300 &lt; ${R('5 000 000')}`, `${R('19 000 000')} &lt; 19 080 000 &lt; ${R('20 000 000')}`, `${R(0)} &lt; 600 001 &lt; ${R('1 000 000')}`]) },
      { etoiles: 2, consigne: 'Quel nombre correspond à chaque point ?',
        eleve: cm1Axe(2000000, 3000000, 100000, 500000, [[2300000, 'A'], [2800000, 'B'], [2650000, 'C']], { fmt: v => v.toLocaleString('fr-FR'), alterne: true }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${B(8)}</span><span>B : ${B(8)}</span><span>C : ${B(8)}</span></div>`,
        corr: cm1Axe(2000000, 3000000, 100000, 500000, [[2300000, 'A'], [2800000, 'B'], [2650000, 'C']], { fmt: v => v.toLocaleString('fr-FR'), alterne: true }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${R('2 300 000')}</span><span>B : ${R('2 800 000')}</span><span>C : ${R('2 650 000')}</span></div>` },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La population de la France est d\'environ 68 400 000 habitants, celle du Canada de 40 100 000. Écris ces nombres en lettres, puis calcule la différence.',
        corr: cm1Redac('En lettres', { suite: ['68 400 000 : soixante-huit-millions-quatre-cent-mille', '40 100 000 : quarante-millions-cent-mille'] }, 'On écrit les classes des millions, puis des mille.') + cm1Redac('Différence', '68 400 000 − 40 100 000 = 28 300 000', 'La France compte environ 28 300 000 habitants de plus que le Canada.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Combien y a-t-il de milliers dans un milliard ? Et de millions ? Explique.',
        corr: cm1Redac('Milliers dans un milliard', '1 000 000 000 = 1 000 000 × 1 000', 'Il y a un million de milliers dans un milliard.') + cm1Redac('Millions dans un milliard', '1 000 000 000 = 1 000 × 1 000 000', 'Il y a mille millions dans un milliard.') },
    ] },
  { titre: 'Opérations posées', duree: '35 min',
    attendus: ['Poser et calculer une addition, une soustraction, une multiplication', 'Vérifier un résultat avec un ordre de grandeur'],
    exos: [
      { etoiles: 1, consigne: 'Calcule.',
        eleve: duo([pose('35648', '+', '9875', '     '), pose('7004', '−', '2569', '    '), pose('12307', '−', '4589', '    ')]),
        corr: duo([pose('35648', '+', '9875', '45523'), pose('7004', '−', '2569', '4435'), pose('12307', '−', '4589', '7718')]),
        ecran: { eleve: duo([pose('35648', '+', '9875', '45523', { trous: true }), pose('7004', '−', '2569', '4435', { trous: true }), pose('12307', '−', '4589', '7718', { trous: true })]), corr: duo([pose('35648', '+', '9875', '45523', { rep: true }), pose('7004', '−', '2569', '4435', { rep: true }), pose('12307', '−', '4589', '7718', { rep: true })]) } },
      { etoiles: 2, consigne: 'Calcule. Pour multiplier par un nombre à deux chiffres, écris les produits intermédiaires.',
        eleve: duo([cm1Posee([[' ', '427'], ['×', '36'], [' ', '    ', true], ['+', '     '], [' ', '     ']]), cm1Posee([[' ', '508'], ['×', '47'], [' ', '    ', true], ['+', '     '], [' ', '     ']]), cm1Posee([[' ', '1245'], ['×', '8'], [' ', '    ']])]),
        corr: duo([cm1Posee([[' ', '427'], ['×', '36'], [' ', '2562', true], ['+', '12810'], [' ', '15372']]), cm1Posee([[' ', '508'], ['×', '47'], [' ', '3556', true], ['+', '20320'], [' ', '23876']]), cm1Posee([[' ', '1245'], ['×', '8'], [' ', '9960']])]),
        ecran: { eleve: duo([cm1Posee([[' ', '427'], ['×', '36'], [' ', '2562', true], ['+', '12810'], [' ', '15372']], '', { trous: true }), cm1Posee([[' ', '508'], ['×', '47'], [' ', '3556', true], ['+', '20320'], [' ', '23876']], '', { trous: true }), cm1Posee([[' ', '1245'], ['×', '8'], [' ', '9960']], '', { trous: true })]), corr: duo([cm1Posee([[' ', '427'], ['×', '36'], [' ', '2562', true], ['+', '12810'], [' ', '15372']], '', { rep: true }), cm1Posee([[' ', '508'], ['×', '47'], [' ', '3556', true], ['+', '20320'], [' ', '23876']], '', { rep: true }), cm1Posee([[' ', '1245'], ['×', '8'], [' ', '9960']], '', { rep: true })]) } },
      { etoiles: 2, col: 1, consigne: 'Calcule en ligne.',
        eleve: plListe(['458 + 99 = ' + B(), '1 200 − 350 = ' + B(), '25 × 12 = ' + B(), '204 × 5 = ' + B()]),
        corr: plListe(['458 + 99 = ' + R(557), '1 200 − 350 = ' + R(850), '25 × 12 = ' + R(300), '204 × 5 = ' + R('1 020')]) },
      { etoiles: 2, col: 1, consigne: 'Sans poser l\'opération, entoure l\'ordre de grandeur du résultat.',
        eleve: plListe(['398 × 21 : <b>800 · 8 000 · 80 000</b>', '5 012 − 1 989 : <b>3 000 · 30 000 · 300</b>', '49 × 52 : <b>250 · 2 500 · 25 000</b>']),
        corr: plListe([['398 × 21 : ', '8 000'], ['5 012 − 1 989 : ', '3 000'], ['49 × 52 : ', '2 500']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un cinéma a 24 rangées de 36 fauteuils. 785 spectateurs sont assis. Combien de fauteuils restent libres ?',
        corr: cm1Redac('Nombre de fauteuils', '24 × 36 = 864', 'Le cinéma a 864 fauteuils.') + cm1Redac('Fauteuils libres', '864 − 785 = 79', '79 fauteuils restent libres.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve le chiffre caché : 3■7 × 4 = 1 508.',
        corr: cm1Redac('Chiffre caché', '1 508 ÷ 4 = 377', 'Le nombre est 377 : le chiffre caché est 7.') },
    ] },
  { titre: 'Division euclidienne, multiples et diviseurs', duree: '40 min',
    attendus: ['Effectuer une division euclidienne et écrire l\'égalité a = b × q + r', 'Reconnaître multiples et diviseurs', 'Utiliser les critères de divisibilité par 2, 5 et 10'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec les tables (r est le reste).',
        eleve: plListe(['47 = 6 × ' + B(2) + ' + ' + B(2), '83 = 9 × ' + B(2) + ' + ' + B(2), '100 = 7 × ' + B(2) + ' + ' + B(2)]),
        corr: plListe(['47 = 6 × ' + R(7) + ' + ' + R(5), '83 = 9 × ' + R(9) + ' + ' + R(2), '100 = 7 × ' + R(14) + ' + ' + R(2)]) },
      { etoiles: 2, col: 1, consigne: 'Ces égalités traduisent-elles une division euclidienne par 8 ? Entoure.',
        eleve: plListe(['100 = 8 × 12 + 4 <b>oui · non</b>', '100 = 8 × 11 + 12 <b>oui · non</b>', '64 = 8 × 8 + 0 <b>oui · non</b>']),
        corr: plListe([['100 = 8 × 12 + 4 ', 'oui'], ['100 = 8 × 11 + 12 ', 'non'], ['64 = 8 × 8 + 0 ', 'oui']].map(([t, r]) => t + plEntoure(r)) ) + '<div class="pl-petit">Le reste doit être plus petit que le diviseur : 12 &gt; 8.</div>' },
      { etoiles: 2, consigne: 'Pose et calcule ces divisions euclidiennes. Écris l\'égalité qui les traduit.',
        eleve: duo([`<span style="text-align:center;">1 285 ÷ 7<br>${grille()}<br>1 285 = 7 × ${B(3)} + ${B(2)}</span>`, `<span style="text-align:center;">2 034 ÷ 15<br>${grille()}<br>2 034 = 15 × ${B(3)} + ${B(2)}</span>`]),
        corr: duo([`<span style="text-align:center;">${div(1285, 7)}1 285 = 7 × ${R(183)} + ${R(4)}</span>`, `<span style="text-align:center;">${div(2034, 15)}2 034 = 15 × ${R(135)} + ${R(9)}</span>`]),
        ecran: { eleve: duo([`<span style="text-align:center;"><b>avec les soustractions</b><br>${plDivision(1285, 7, { mode: 'trous' })}<br>1 285 = 7 × ${B(3)} + ${B(2)}</span>`, `<span style="text-align:center;"><b>sans les soustractions</b><br>${plDivision(2034, 15, { mode: 'trous', diff: false })}<br>2 034 = 15 × ${B(3)} + ${B(2)}</span>`]),
          corr: duo([`<span style="text-align:center;"><b>avec les soustractions</b><br>${plDivision(1285, 7, { mode: 'rep' })}<br>1 285 = 7 × ${R(183)} + ${R(4)}</span>`, `<span style="text-align:center;"><b>sans les soustractions</b><br>${plDivision(2034, 15, { mode: 'rep', diff: false })}<br>2 034 = 15 × ${R(135)} + ${R(9)}</span>`]) } },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 5.',
        eleve: plGrille(['345', '502', '1 000', '7 777', '2 020', '4 055'], 3),
        corr: plGrille(['345', '502', '1 000', '7 777', '2 020', '4 055'].map(n => /[05]$/.test(n) ? plEntoure(n) : n), 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure les nombres divisibles par 2.',
        eleve: plGrille(['346', '1 005', '780', '2 221', '98', '4 100'], 3),
        corr: plGrille(['346', '1 005', '780', '2 221', '98', '4 100'].map(n => /[02468]$/.test(n) ? plEntoure(n) : n), 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On range 1 000 œufs dans des boîtes de 12. Combien de boîtes pleines obtient-on ? Combien d\'œufs restent ?',
        corr: cm1Redac('Division euclidienne de 1 000 par 12', '1 000 = 12 × 83 + 4', 'On remplit 83 boîtes et il reste 4 œufs (4 &lt; 12).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve tous les diviseurs de 36.',
        corr: cm1Redac('Diviseurs de 36', plGrille(['36 = 1 × 36', '36 = 2 × 18', '36 = 3 × 12', '36 = 4 × 9', '36 = 6 × 6'], 2), 'Les diviseurs de 36 sont 1, 2, 3, 4, 6, 9, 12, 18 et 36.') },
    ] },
];
})();

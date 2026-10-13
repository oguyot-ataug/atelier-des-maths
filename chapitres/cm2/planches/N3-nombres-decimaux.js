/* ============================================================
   CM2 · Planches : Nombres décimaux jusqu'aux millièmes (N3)
   Dixièmes, centièmes, millièmes ; des fractions décimales à l'écriture à virgule ; partie entière
   et arrondi à l'unité ; demi-droite graduée ; comparer, encadrer, intercaler.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v)), F = cm1Frac, C = plCase(), Fr = plFrac();
const { rmp, ch } = P3;
const lt = '&lt;', gt = '&gt;';
PLANCHES['cm2|Nombres décimaux jusqu\'aux millièmes'] = [
  { titre: 'Dixièmes, centièmes, millièmes', duree: '35 min',
    attendus: ['Passer d\'une fraction décimale à l\'écriture à virgule', 'Connaître la valeur de chaque chiffre', 'Décomposer un nombre décimal'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris avec une virgule.',
        eleve: plListe([`${F(7, 10)} = ${B(3)}`, `${F(45, 100)} = ${B(3)}`, `${F(8, 1000)} = ${B(3)}`, `${F(3254, 1000)} = ${B(3)}`]),
        corr: plListe([`${F(7, 10)} = ${R('0,7')}`, `${F(45, 100)} = ${R('0,45')}`, `${F(8, 1000)} = ${R('0,008')}`, `${F(3254, 1000)} = ${R('3,254')}`]) },
      { etoiles: 1, col: 1, consigne: 'Écris avec une fraction décimale.',
        eleve: plListe([`0,9 = ${Fr}`, `0,123 = ${Fr}`, `2,06 = ${Fr}`, `0,045 = ${Fr}`]),
        corr: plListe([`0,9 = ${R(F(9, 10))}`, `0,123 = ${R(F(123, 1000))}`, `2,06 = ${R(F(206, 100))}`, `0,045 = ${R(F(45, 1000))}`]) },
      { etoiles: 2, col: 1, consigne: 'Dans le nombre 47,386 :',
        ...rmp([['le chiffre des dixièmes est @', 3], ['le chiffre des millièmes est @', 6], ['le chiffre des dizaines est @', 4], ['le chiffre 8 vaut 8 @', 'centièmes']]) },
      { etoiles: 2, col: 1, consigne: 'Décompose.',
        eleve: plListe([`5,274 = ${B(2)} + ${Fr} + ${Fr} + ${Fr}`, `12,05 = ${B(2)} + ${Fr}`]),
        corr: plListe([`5,274 = ${R(5)} + ${R(F(2, 10))} + ${R(F(7, 100))} + ${R(F(4, 1000))}`, `12,05 = ${R(12)} + ${R(F(5, 100))}`]) },
      { etoiles: 3, cahier: true, consigne: 'Combien y a-t-il de millièmes dans une unité ? Et dans 1,25 ? Explique.',
        corr: cm1Redac('Millièmes dans une unité', `1 = ${F(1000, 1000)}`, 'Il y a 1 000 millièmes dans une unité.') + cm1Redac('Millièmes dans 1,25', { suite: ['1 unité = 1 000 millièmes', '2 dixièmes = 200 millièmes', '5 centièmes = 50 millièmes', '1 000 + 200 + 50 = 1 250'] }, `Dans 1,25, il y a 1 250 millièmes : 1,25 = ${F(1250, 1000)}.`) },
    ] },
  { titre: 'Partie entière, arrondi et demi-droite graduée', duree: '30 min',
    attendus: ['Donner la partie entière d\'un nombre décimal', 'Arrondir à l\'unité', 'Lire un nombre décimal sur une demi-droite graduée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne la partie entière, puis l\'arrondi à l\'unité.',
        ...rmp([['7,8 : partie entière @ ; arrondi @', 7, 8], ['12,35 : partie entière @ ; arrondi @', 12, 12], ['0,61 : partie entière @ ; arrondi @', 0, 1]]) },
      { etoiles: 1, consigne: 'Chaque unité est partagée en 10. Écris le nombre de chaque point.',
        eleve: cm1Axe(4, 6, 0.1, 1, [[4.2, 'A'], [4.9, 'B'], [5.6, 'C']], { fmt: v => String(Math.round(v)) }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${B()}</span><span>B : ${B()}</span><span>C : ${B()}</span></div>`,
        corr: cm1Axe(4, 6, 0.1, 1, [[4.2, 'A'], [4.9, 'B'], [5.6, 'C']], { fmt: v => String(Math.round(v)) }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>A : ${R('4,2')}</span><span>B : ${R('4,9')}</span><span>C : ${R('5,6')}</span></div>` },
      { etoiles: 2, consigne: 'Entre 2,3 et 2,4, l\'intervalle est partagé en 10. Écris le nombre de chaque point.',
        eleve: cm1Axe(2.3, 2.4, 0.01, 0.1, [[2.32, 'D'], [2.37, 'E']], { fmt: v => v.toFixed(1).replace('.', ',') }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>D : ${B()}</span><span>E : ${B()}</span></div>`,
        corr: cm1Axe(2.3, 2.4, 0.01, 0.1, [[2.32, 'D'], [2.37, 'E']], { fmt: v => v.toFixed(1).replace('.', ',') }) + `<div style="display:flex;gap:30px;justify-content:center;"><span>D : ${R('2,32')}</span><span>E : ${R('2,37')}</span></div>` },
      { etoiles: 3, cahier: true, consigne: 'Au saut en longueur, Inès a sauté 3,47 m, Paul 3,5 m et Lou 3,405 m. Arrondis chaque saut au dixième, puis donne le classement.',
        corr: cm1Redac('Arrondis au dixième', { suite: ['3,47 → 3,5', '3,5 → 3,5', '3,405 → 3,4'] }, 'Inès et Paul ont sauté environ 3,5 m, Lou environ 3,4 m.') + cm1Redac('Classement', '3,5 > 3,47 > 3,405', 'Paul est premier, Inès deuxième et Lou troisième.') },
    ] },
  { titre: 'Comparer, encadrer, intercaler', duree: '35 min',
    attendus: ['Comparer deux nombres décimaux', 'Ranger des nombres décimaux', 'Encadrer et intercaler un nombre décimal'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec &lt;, &gt; ou =.',
        eleve: plListe([`3,5 ${C} 3,48`, `0,7 ${C} 0,700`, `12,09 ${C} 12,1`, `5,307 ${C} 5,37`]),
        corr: plListe([`3,5 ${R(gt)} 3,48`, `0,7 ${R('=')} 0,700`, `12,09 ${R(lt)} 12,1`, `5,307 ${R(lt)} 5,37`]) },
      { etoiles: 2, col: 1, consigne: 'Range dans l\'ordre croissant : 4,5 ; 4,05 ; 4,505 ; 4,15 ; 0,45.',
        eleve: `<p>${B(3)} ${lt} ${B(3)} ${lt} ${B(3)} ${lt} ${B(3)} ${lt} ${B(3)}</p>`,
        corr: `<p>${R('0,45')} ${lt} ${R('4,05')} ${lt} ${R('4,15')} ${lt} ${R('4,5')} ${lt} ${R('4,505')}</p>` },
      { etoiles: 2, col: 1, consigne: 'Encadre au dixième.',
        eleve: plListe([`${B(2)} ${lt} 6,47 ${lt} ${B(2)}`, `${B(2)} ${lt} 0,83 ${lt} ${B(2)}`, `${B(2)} ${lt} 15,06 ${lt} ${B(2)}`]),
        corr: plListe([`${R('6,4')} ${lt} 6,47 ${lt} ${R('6,5')}`, `${R('0,8')} ${lt} 0,83 ${lt} ${R('0,9')}`, `${R('15')} ${lt} 15,06 ${lt} ${R('15,1')}`]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le nombre compris entre les deux.',
        ...P3.chx([['Entre 2,4 et 2,5 :', '2,45', '2,54 · 2,45 · 2,05'], ['Entre 7,1 et 7,11 :', '7,105', '7,15 · 7,011 · 7,105']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['2,5 = 2,50', 'vrai'], ['3,12 est plus grand que 3,2.', 'faux'], ['Il n\'y a aucun nombre entre 1,3 et 1,4.', 'faux']], 'vrai · faux') },
    ] },
];
})();

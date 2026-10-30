/* CP · Planches : Décomposer les nombres jusqu'à 10 (N2) -- maisons des nombres, compléments à 10, doubles. */
(() => {
const { lig, compte, suite } = PCP, B = P3.B, R = P3.R;
const deux = (a, b) => cpJetons(a + b, 0, cpBleus(a, b));
// Un calcul sur sa propre ligne, sous un dessin (dans une case de grille, les morceaux restent alignés).
const ligne = t => `<span style="flex-basis:100%;text-align:center;white-space:nowrap;">${t}</span>`;
PLANCHES['cp|Décomposer les nombres jusqu\'à 10'] = [
  { titre: 'Les maisons des nombres', duree: '25 min',
    attendus: ['Décomposer un nombre jusqu\'à 10 en deux nombres', 'Écrire une décomposition avec + et ='],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons rouges ? Combien de bleus ? Complète.',
        eleve: plListe([deux(3, 2) + ' 5 = ' + B(1) + ' + ' + B(1), deux(4, 3) + ' 7 = ' + B(1) + ' + ' + B(1), deux(6, 2) + ' 8 = ' + B(1) + ' + ' + B(1)]),
        corr: plListe([deux(3, 2) + ' 5 = ' + R(3) + ' + ' + R(2), deux(4, 3) + ' 7 = ' + R(4) + ' + ' + R(3), deux(6, 2) + ' 8 = ' + R(6) + ' + ' + R(2)]) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 6.',
        ...P3.rmp([['6 = 5 + @', 1], ['6 = 4 + @', 2], ['6 = 3 + @', 3], ['6 = @ + 4', 2], ['6 = @ + 5', 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 9.',
        ...P3.rmp([['9 = 8 + @', 1], ['9 = 5 + @', 4], ['9 = @ + 3', 6], ['9 = @ + 7', 2]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 8.',
        ...P3.rmp([['8 = 7 + @', 1], ['8 = 4 + @', 4], ['8 = @ + 2', 6], ['8 = @ + 5', 3]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète la maison du 10.',
        ...P3.rmp([['10 = 9 + @', 1], ['10 = 6 + @', 4], ['10 = @ + 3', 7], ['10 = @ + 5', 5]], 2) },
      { etoiles: 3, consigne: 'Colorie les jetons en rouge et en bleu comme c\'est demandé, puis écris l\'addition.',
        eleve: plListe(['4 rouges, 3 bleus : ' + PCP.bicolore(4, 3) + ' 7 = ' + B(1) + ' + ' + B(1), '6 rouges, 1 bleu : ' + PCP.bicolore(6, 1) + ' 7 = ' + B(1) + ' + ' + B(1)]),
        corr: plListe(['4 rouges, 3 bleus : ' + deux(4, 3) + ' 7 = ' + R(4) + ' + ' + R(3), '6 rouges, 1 bleu : ' + deux(6, 1) + ' 7 = ' + R(6) + ' + ' + R(1)]) },
    ] },
  { titre: 'Faire 10', duree: '20 min',
    attendus: ['Connaître les compléments à 10', 'Trouver ce qui manque pour remplir la boîte de dix'],
    exos: [
      { etoiles: 1, consigne: 'Colorie en bleu les jetons qui manquent pour remplir la boîte. Complète l\'addition.',
        eleve: plGrille([PCP.boite(4, { deja: 6, coul: CPC.jeton2 }) + ligne('6 + ' + B(1) + ' = 10'), PCP.boite(8, { deja: 2, coul: CPC.jeton2 }) + ligne('2 + ' + B(1) + ' = 10')], 2),
        corr: plGrille([cpBoiteDix(10, { c: 22, couleurs: [...Array(6).fill(CPC.jeton), ...Array(4).fill(CPC.jeton2)] }) + ligne('6 + ' + R(4) + ' = 10'), cpBoiteDix(10, { c: 22, couleurs: [...Array(2).fill(CPC.jeton), ...Array(8).fill(CPC.jeton2)] }) + ligne('2 + ' + R(8) + ' = 10')], 2) },
      { etoiles: 1, consigne: 'Combien de jetons manque-t-il pour remplir la boîte ?',
        ...compte([[cpBoiteDix(7, { c: 20 }), 3], [cpBoiteDix(4, { c: 20 }), 6], [cpBoiteDix(9, { c: 20 }), 1]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète pour faire 10.',
        ...P3.rmp([['8 + @ = 10', 2], ['5 + @ = 10', 5], ['3 + @ = 10', 7], ['@ + 4 = 10', 6]], 2) },
      { etoiles: 3, consigne: 'J\'ai déjà 6 images. Il me faut 10 images pour remplir la page. Dans la boîte de dix, dessine en rouge les 6 images que j\'ai, puis en bleu celles qui manquent. Complète.',
        eleve: PCP.lig(PCP.boite(0, { deux: [6, 4] })) + PCP.lig('Il me manque ' + B(1) + ' images.'),
        corr: PCP.lig(cpBoiteDix(10, { c: 22, couleurs: [...Array(6).fill(CPC.jeton), ...Array(4).fill(CPC.jeton2)] })) + plListe(['6 + 4 = 10']) + PCP.lig('Il me manque ' + R(4) + ' images.') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['10 = 9 + @', 1], ['10 = 2 + @', 8], ['10 = @ + 3', 7], ['10 = @ + 6', 4]], 2) },
      { etoiles: 2, consigne: 'Combien de doigts manque-t-il pour faire 10 ?',
        ...compte([[cpDoigts(7, { px: 110 }), 3], [cpDoigts(5, { px: 110 }), 5], [cpDoigts(9, { px: 110 }), 1], [cpDoigts(6, { px: 110 }), 4]], 4) },
    ] },
  { titre: 'Les doubles', duree: '15 min',
    attendus: ['Connaître les doubles jusqu\'à 5 + 5', 'Reconnaître un double sur les dés et les doigts'],
    exos: [
      { etoiles: 1, consigne: 'Écris le double.',
        eleve: plGrille([lig(cpDe(2, { c: 30 }), cpDe(2, { c: 30 })) + '2 + 2 = ' + B(1), lig(cpDe(4, { c: 30 }), cpDe(4, { c: 30 })) + '4 + 4 = ' + B(1), lig(cpDe(5, { c: 30 }), cpDe(5, { c: 30 })) + '5 + 5 = ' + B(1)], 3),
        corr: plGrille([lig(cpDe(2, { c: 30 }), cpDe(2, { c: 30 })) + '2 + 2 = ' + R(4), lig(cpDe(4, { c: 30 }), cpDe(4, { c: 30 })) + '4 + 4 = ' + R(8), lig(cpDe(5, { c: 30 }), cpDe(5, { c: 30 })) + '5 + 5 = ' + R(10)], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['3 + 3 = @', 6], ['1 + 1 = @', 2], ['@ + @ = 8', 4, 4]], 2) },
      { etoiles: 3, consigne: 'Sam lève 3 doigts sur chaque main. Dessine les doigts levés (à l\'écran, touche un doigt pour le lever), puis complète.',
        eleve: PCP.lig(PCP.mains([3, 3])) + PCP.lig('Sam lève ' + B(1) + ' doigts.'),
        corr: PCP.lig(cpSvg(214, 96, cpMainSvg(30, 6, 3) + cpMainSvg(126, 6, 3, { droite: true }), 200)) + plListe(['3 + 3 = 6']) + PCP.lig('Sam lève ' + R(6) + ' doigts : c\'est le double de 3.') },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['2 + 2 = @', 4], ['5 + 5 = @', 10], ['4 + 4 = @', 8], ['@ + @ = 6', 3, 3]], 2) },
      { etoiles: 2, consigne: 'Est-ce un double ? Entoure.',
        ...P3.chx2([['3 + 3', 'oui', 'oui · non'], ['4 + 2', 'non', 'oui · non'], ['5 + 5', 'oui', 'oui · non'], ['1 + 2', 'non', 'oui · non'], ['2 + 2', 'oui', 'oui · non'], ['3 + 4', 'non', 'oui · non'], ['6 + 3', 'non', 'oui · non'], ['4 + 4', 'oui', 'oui · non']]) },
      { etoiles: 2, consigne: 'Dessine le double : autant de jetons dans la 2e boîte.',
        eleve: plGrille([lig(cpBoiteDix(3, { c: 18 }), PCP.boite(3, { c: 18, coul: CPC.jeton2 })) + '3 + 3 = ' + B(1), lig(cpBoiteDix(4, { c: 18 }), PCP.boite(4, { c: 18, coul: CPC.jeton2 })) + '4 + 4 = ' + B(1)], 2),
        corr: plGrille([lig(cpBoiteDix(3, { c: 18 }), cpBoiteDix(3, { c: 18, couleurs: Array(10).fill(CPC.jeton2) })) + '3 + 3 = ' + R(6), lig(cpBoiteDix(4, { c: 18 }), cpBoiteDix(4, { c: 18, couleurs: Array(10).fill(CPC.jeton2) })) + '4 + 4 = ' + R(8)], 2) },
    ] },
];
})();

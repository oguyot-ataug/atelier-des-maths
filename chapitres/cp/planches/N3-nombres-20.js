/* CP · Planches : Les nombres jusqu'à 20 (N3) -- la dizaine, écrire de 11 à 20, la file des nombres, comparer. */
(() => {
const { lig, compte, entoure, suite, cadre } = PCP, B = P3.B, R = P3.R;
const boites = n => lig(cpBoiteDix(Math.min(10, n), { c: 16 }), cpBoiteDix(Math.max(0, n - 10), { c: 16, couleurs: Array(10).fill(CPC.jeton2) }));
PLANCHES['cp|Les nombres jusqu\'à 20'] = [
  { titre: 'Une dizaine et des unités', duree: '25 min',
    attendus: ['Comprendre qu\'une dizaine, c\'est dix unités', 'Dénombrer une collection jusqu\'à 20 en faisant un paquet de dix'],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons ? Écris le nombre.',
        ...compte([[boites(13), 13], [boites(17), 17], [boites(20), 20]], 3) },
      { etoiles: 1, consigne: 'Combien de cubes ?',
        ...compte([[cpCubes(12, { q: 10 }), 12], [cpCubes(16, { q: 10 }), 16], [cpCubes(19, { q: 10 }), 19]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['14 = 10 + @', 4], ['18 = 10 + @', 8], ['10 + 5 = @', 15], ['10 + 10 = @', 20]], 2) },
    ] },
  { titre: 'Écrire les nombres de 11 à 20', duree: '20 min',
    attendus: ['Lire et écrire les nombres de 11 à 20 en chiffres', 'Connaître les mots onze à vingt'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en chiffres.',
        ...P3.rmp([['douze : @', 12], ['quinze : @', 15], ['dix-sept : @', 17], ['vingt : @', 20]], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en lettres.',
        ...P3.rmp([['11 : @', 'onze'], ['14 : @', 'quatorze'], ['16 : @', 'seize']], 8) },
      { etoiles: 2, consigne: 'Dessine 15 jetons dans les boîtes de dix.',
        eleve: lig(cpBoiteDix(0, { c: 22 }), cpBoiteDix(0, { c: 22 })), corr: lig(cpBoiteDix(10, { c: 22 }), cpBoiteDix(5, { c: 22, couleurs: Array(10).fill(CPC.jeton2) })) },
    ] },
  { titre: 'La file des nombres jusqu\'à 20', duree: '20 min',
    attendus: ['Connaître la suite des nombres jusqu\'à 20', 'Trouver le nombre d\'avant et d\'après', 'Comparer deux nombres jusqu\'à 20'],
    exos: [
      { etoiles: 1, consigne: 'Complète la bande des nombres.',
        ...suite([10, 11, '@12', 13, '@14', 15, '@16', 17, 18, '@19', 20]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['Juste après 15 : @', 16], ['Juste avant 13 : @', 12], ['Juste après 19 : @', 20], ['Juste avant 11 : @', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure le plus grand nombre.',
        ...P3.chx([['', '18', '18 · 12'], ['', '15', '9 · 15'], ['', '20', '20 · 17']]) },
      { etoiles: 3, consigne: 'Mia a une boîte de 10 crayons et encore 6 crayons. Hugo a 14 crayons. Qui a le plus de crayons ?',
        eleve: cadre(60), corr: cm1Redac('Crayons de Mia', '10 + 6 = 16', 'Mia a 16 crayons, Hugo en a 14 : c\'est Mia qui en a le plus.') },
    ] },
];
})();

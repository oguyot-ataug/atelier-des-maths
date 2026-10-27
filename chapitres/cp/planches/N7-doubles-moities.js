/* CP · Planches : Doubles, moitiés et compléments à 10 (N7). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
const deux = (n, c) => lig(cpJetons(n, 0, Array(n).fill(CPC.jeton)), cpJetons(n, 0, Array(n).fill(c || CPC.jeton2)));
PLANCHES['cp|Doubles, moitiés et compléments à 10'] = [
  { titre: 'Les doubles', duree: '20 min',
    attendus: ['Connaître les doubles des nombres jusqu\'à 10'],
    exos: [
      { etoiles: 1, consigne: 'Écris le double.',
        eleve: plGrille([deux(3) + '3 + 3 = ' + B(1), deux(6) + '6 + 6 = ' + B(1)], 2), corr: plGrille([deux(3) + '3 + 3 = ' + R(6), deux(6) + '6 + 6 = ' + R(12)], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['7 + 7 = @', 14], ['9 + 9 = @', 18], ['10 + 10 = @', 20], ['8 + 8 = @', 16]], 2) },
      { etoiles: 3, col: 1, consigne: 'Calcule avec un double.',
        ...P3.rmp([['5 + 6 = @', 11], ['7 + 8 = @', 15], ['4 + 5 = @', 9]], 2) },
    ] },
  { titre: 'Les moitiés', duree: '20 min',
    attendus: ['Trouver la moitié d\'un nombre pair jusqu\'à 20', 'Partager en deux parts égales'],
    exos: [
      { etoiles: 1, consigne: 'Partage les 8 jetons en deux parts égales : colorie la moitié en bleu.',
        eleve: lig(cpJetons(8, 0, Array(8).fill('#fff'))), corr: lig(cpJetons(8, 0, cpBleus(4, 4))) + lig('La moitié de 8, c\'est ' + R(4) + '.') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['La moitié de 10 : @', 5], ['La moitié de 6 : @', 3], ['La moitié de 14 : @', 7], ['La moitié de 20 : @', 10]], 2) },
      { etoiles: 3, cahier: true, consigne: 'On partage 16 cartes entre 2 enfants, autant chacun. Combien de cartes pour chacun ?',
        corr: cm1Redac('Cartes de chacun', '8 + 8 = 16', 'Chaque enfant a 8 cartes.') },
    ] },
  { titre: 'Les compléments à 10', duree: '15 min',
    attendus: ['Connaître les compléments à 10'],
    exos: [
      { etoiles: 1, consigne: 'Combien manque-t-il pour remplir la boîte ?',
        ...compte([[cpBoiteDix(3, { c: 20 }), 7], [cpBoiteDix(6, { c: 20 }), 4], [cpBoiteDix(8, { c: 20 }), 2]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...P3.rmp([['1 + @ = 10', 9], ['@ + 5 = 10', 5], ['7 + @ = 10', 3], ['@ + 4 = 10', 6]], 2) },
    ] },
];
})();

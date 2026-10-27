/* CP · Planches : Coder un déplacement (G5). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Coder un déplacement'] = [
  { titre: 'Suivre un code', duree: '20 min',
    attendus: ['Décoder une suite de flèches et tracer le chemin'],
    exos: [
      { etoiles: 1, consigne: `La souris suit le code ${cpCode('dddb')}. Trace le chemin et colorie la case d'arrivée.`,
        eleve: lig(cpQuad(5, 3, [['souris', 0, 0]], { px: 200 })), corr: lig(cpQuad(5, 3, [['souris', 3, 1]], { chemin: cpSuivre([0, 0], 'dddb'), colorie: [[3, 1]], px: 200 })) },
      { etoiles: 2, consigne: `La souris suit le code ${cpCode('hhddbd')}. Arrive-t-elle au fromage ? Entoure.`,
        eleve: lig(cpQuad(5, 3, [['souris', 0, 2], ['fromage', 3, 1]], { px: 200 })) + lig('<b>oui · non</b>'),
        corr: lig(cpQuad(5, 3, [['souris', 3, 1], ['fromage', 3, 1]], { chemin: cpSuivre([0, 2], 'hhddbd'), px: 200 })) + lig(plEntoure('oui')) },
    ] },
  { titre: 'Écrire un code', duree: '20 min',
    attendus: ['Écrire un programme de flèches pour atteindre une case'],
    exos: [
      { etoiles: 2, consigne: 'Écris un code pour amener la souris au fromage.',
        eleve: lig(cpQuad(5, 4, [['souris', 0, 3], ['fromage', 4, 0]], { px: 200 })) + cadre(40),
        corr: lig(cpQuad(5, 4, [['souris', 0, 3], ['fromage', 4, 0]], { chemin: cpSuivre([0, 3], 'ddddhhh'), px: 200 })) + lig(cpCode('ddddhhh')) },
      { etoiles: 3, consigne: 'Écris un code qui évite l\'arbre.',
        eleve: lig(cpQuad(5, 3, [['souris', 0, 1], ['arbre', 2, 1], ['fromage', 4, 1]], { px: 200 })) + cadre(40),
        corr: lig(cpQuad(5, 3, [['souris', 0, 1], ['arbre', 2, 1], ['fromage', 4, 1]], { chemin: cpSuivre([0, 1], 'dhddbd'), px: 200 })) + lig(cpCode('dhddbd')) + '<p style="text-align:center;">D\'autres codes sont justes.</p>' },
    ] },
  { titre: 'Trouver l\'erreur', duree: '15 min',
    attendus: ['Corriger un programme qui ne marche pas'],
    exos: [
      { etoiles: 2, consigne: `Ce code devait amener la souris au fromage : ${cpCode('ddh')}. Corrige-le.`,
        eleve: lig(cpQuad(4, 3, [['souris', 0, 2], ['fromage', 2, 0]], { px: 160 })) + cadre(40),
        corr: lig(cpQuad(4, 3, [['souris', 0, 2], ['fromage', 2, 0]], { chemin: cpSuivre([0, 2], 'ddhh'), px: 160 })) + lig(cpCode('ddhh')) + '<p style="text-align:center;">Il manquait une flèche vers le haut.</p>' },
    ] },
];
})();

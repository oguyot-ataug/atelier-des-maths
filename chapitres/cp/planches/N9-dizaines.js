/* CP · Planches : Ajouter et soustraire des dizaines (N9). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
PLANCHES['cp|Ajouter et soustraire des dizaines'] = [
  { titre: 'Ajouter 10, enlever 10', duree: '20 min',
    attendus: ['Ajouter ou enlever 10 à un nombre de deux chiffres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ajoute 10.',
        ...P3.rmp([['24 + 10 = @', 34], ['57 + 10 = @', 67], ['80 + 10 = @', 90], ['39 + 10 = @', 49]], 2) },
      { etoiles: 1, col: 1, consigne: 'Enlève 10.',
        ...P3.rmp([['45 − 10 = @', 35], ['71 − 10 = @', 61], ['30 − 10 = @', 20], ['92 − 10 = @', 82]], 2) },
      { etoiles: 2, consigne: 'Dans le tableau, colorie 23, puis la case juste en dessous (+ 10), puis encore en dessous.',
        eleve: lig(cpTableau(20, 49, { c: 24 })), corr: lig(cpTableau(20, 49, { on: [23, 33, 43], c: 24 })) },
    ] },
  { titre: 'Ajouter et enlever des dizaines', duree: '20 min',
    attendus: ['Ajouter ou soustraire des dizaines entières'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['30 + 40 = @', 70], ['50 + 20 = @', 70], ['60 − 30 = @', 30], ['90 − 50 = @', 40]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...P3.rmp([['34 + 20 = @', 54], ['46 + 30 = @', 76], ['78 − 40 = @', 38], ['65 − 20 = @', 45]], 2) },
    ] },
  { titre: 'Problèmes avec des dizaines', duree: '20 min',
    attendus: ['Résoudre des problèmes en ajoutant ou en enlevant des dizaines'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Léa a 25 images. On lui en offre 30. Combien en a-t-elle ?',
        corr: cm1Redac('Images de Léa', '25 + 30 = 55', 'Léa a 55 images.') },
      { etoiles: 2, cahier: true, consigne: 'Il y a 68 pommes dans la caisse. On en vend 40. Combien en reste-t-il ?',
        corr: cm1Redac('Pommes qui restent', '68 − 40 = 28', 'Il reste 28 pommes.') },
      { etoiles: 3, cahier: true, consigne: 'Un livre a 90 pages. Tom en lit 20 lundi et 30 mardi. Combien de pages lui reste-t-il à lire ?',
        corr: cm1Redac('Pages à lire', { suite: ['20 + 30 = 50', '90 − 50 = 40'] }, 'Il reste 40 pages à lire.') },
    ] },
];
})();

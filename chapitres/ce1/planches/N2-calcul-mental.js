/* CE1 · Planches : Calcul mental : ajouter et soustraire (N2). */
(() => {
const B = P3.B, R = P3.R;
PLANCHES['ce1|Calcul mental : ajouter et soustraire'] = [
  { titre: 'Les résultats à connaître', duree: '20 min',
    attendus: ['Connaître les compléments à 10 et les doubles', 'Utiliser les presque-doubles'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['7 + 3 = @', 10], ['8 + 8 = @', 16], ['6 + 4 = @', 10], ['9 + 9 = @', 18]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule avec un double.', ...P3.rmp([['7 + 8 = @', 15], ['6 + 7 = @', 13], ['9 + 8 = @', 17]], 2) },
    ] },
  { titre: 'Passer la dizaine', duree: '20 min',
    attendus: ['Ajouter ou soustraire en passant par la dizaine'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['36 + @ = 40', 4], ['58 + @ = 60', 2], ['71 + @ = 80', 9]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['47 + 6 = @', 53], ['38 + 5 = @', 43], ['52 − 4 = @', 48], ['63 − 7 = @', 56]], 2) },
    ] },
  { titre: 'Ajouter et soustraire des dizaines', duree: '25 min',
    attendus: ['Ajouter ou soustraire des dizaines', 'Décomposer pour calculer', 'Ajouter 9 et 11'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.', ...P3.rmp([['34 + 30 = @', 64], ['85 − 40 = @', 45], ['27 + 50 = @', 77]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule.', ...P3.rmp([['46 + 9 = @', 55], ['58 + 11 = @', 69], ['72 − 9 = @', 63]], 2) },
      { etoiles: 2, col: 1, consigne: 'Décompose pour calculer.', ...P3.rmp([['23 + 45 = @', 68], ['56 + 32 = @', 88], ['79 − 25 = @', 54]], 2) },
      { etoiles: 3, cahier: true, consigne: 'Lina a 46 €. Elle reçoit 29 € pour son anniversaire. Combien a-t-elle ?',
        corr: cm1Redac('Argent de Lina', { suite: ['46 + 30 = 76', '76 − 1 = 75'] }, 'Lina a 75 €.') },
    ] },
];
})();

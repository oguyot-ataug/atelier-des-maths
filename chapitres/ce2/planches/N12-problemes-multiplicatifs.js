/* ============================================================
   CE2 · Planches : Problèmes multiplicatifs (N12)
   Chercher le tout ou une part (schéma en barres) ; « fois plus », « fois moins », distingués de « de
   plus », « de moins » ; compter toutes les possibilités (tableau, arbre).
   ============================================================ */
(() => {
const { chx } = P3;
const PQ = (parts, o) => cm1Paquets(parts, Object.assign({ L: 300 }, o)).replace(/style="width:100%;max-width:(\d+)px;/, (m, w) => `style="width:${w}px;max-width:100%;`);
PLANCHES['ce2|Problèmes multiplicatifs'] = [
  { titre: 'Chercher le tout ou une part', duree: '30 min',
    attendus: ['Trouver le tout avec une multiplication', 'Trouver une part avec une division (tables)'],
    exos: [
      { etoiles: 1, col: 1, cahier: true, consigne: 'Un paquet contient 8 biscuits. Combien de biscuits dans 7 paquets ?',
        corr: cm1Redac('Nombre de biscuits', '7 × 8 = 56', 'Il y a 56 biscuits.') },
      { etoiles: 1, col: 1, cahier: true, consigne: 'On partage 42 images entre 6 enfants. Combien d\'images chacun ?',
        corr: cm1Redac('Images par enfant', '42 ÷ 6 = 7', 'Car 6 × 7 = 42 : chacun a 7 images.') },
      { etoiles: 2, cahier: true, consigne: 'Une salle a 9 rangées de 25 chaises. Combien de chaises en tout ?',
        corr: cm1Redac('Nombre de chaises', { suite: ['25 × 4 = 100', '25 × 8 = 200', '200 + 25 = 225'] }, 'Il y a 225 chaises.', PQ(Array.from({ length: 9 }, () => [25, '25']), { uni: true, accolade: '? chaises' })) },
    ] },
  { titre: '« Fois plus », « fois moins »', duree: '30 min',
    attendus: ['Comprendre « 3 fois plus » et « 3 fois moins »', 'Ne pas confondre avec « 3 de plus », « 3 de moins »'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Tom a 6 billes. Entoure le bon nombre.',
        ...chx([['Léa en a 3 fois plus : elle en a…', '18', '9 · 18 · 2'], ['Max en a 3 de plus : il en a…', '9', '9 · 18 · 3'], ['Zoé en a 3 fois moins : elle en a…', '2', '3 · 2 · 18']]) },
      { etoiles: 2, cahier: true, consigne: 'Un casque de vélo coûte 32 €. La trottinette coûte 4 fois plus cher. Combien coûte la trottinette ?',
        corr: cm1Redac('Prix de la trottinette', '32 × 4 = 128', 'La trottinette coûte 128 €.', PQ([[32, '32 €']], { titre: 'casque', echelle: 128 }) + PQ([[32, '32'], [32, '32'], [32, '32'], [32, '32']], { titre: 'trottinette', uni: true, echelle: 128 })) },
      { etoiles: 3, cahier: true, consigne: 'Un chat pèse 4 kg. Un chien pèse 5 fois plus que le chat. Un lapin pèse 2 kg de moins que le chat. Combien pèsent le chien et le lapin ?',
        corr: cm1Redac('Masse du chien', '4 × 5 = 20', 'Le chien pèse 20 kg.') + cm1Redac('Masse du lapin', '4 − 2 = 2', 'Le lapin pèse 2 kg.') },
    ] },
  { titre: 'Compter toutes les possibilités', duree: '30 min',
    attendus: ['Organiser les possibilités dans un tableau ou un arbre', 'Trouver le nombre de possibilités par une multiplication'],
    exos: [
      { etoiles: 2, consigne: 'Pour son déguisement, un clown choisit un chapeau (rouge ou vert) et un nœud (jaune, bleu ou violet). Complète le tableau, puis donne le nombre de déguisements.',
        eleve: cm1Tableau(['', 'jaune', 'bleu', 'violet'], [['rouge', P3.B(5), P3.B(5), P3.B(5)], ['vert', P3.B(5), P3.B(5), P3.B(5)]], { coul: '#558B2F' }) + plListe(['Nombre de déguisements : ' + P3.B(3)]),
        corr: cm1Tableau(['', 'jaune', 'bleu', 'violet'], [['rouge', P3.R('R-J'), P3.R('R-B'), P3.R('R-V')], ['vert', P3.R('V-J'), P3.R('V-B'), P3.R('V-V')]], { coul: '#558B2F' }) + plListe(['Nombre de déguisements : ' + P3.R('2 × 3 = 6')]) },
      { etoiles: 3, cahier: true, consigne: 'Inès a 3 pantalons et 7 tee-shirts. Combien de tenues différentes peut-elle composer ?',
        corr: cm1Redac('Nombre de tenues', '3 × 7 = 21', 'Chaque pantalon va avec les 7 tee-shirts : Inès peut composer 21 tenues.') },
    ] },
];
})();

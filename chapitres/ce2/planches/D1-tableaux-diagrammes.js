/* ============================================================
   CE2 · Planches : Tableaux et diagrammes en barres (D1)
   Ranger des données dans un tableau ; lire et construire un diagramme en barres (échelle adaptée) ;
   lire un tableau à double entrée (avec totaux) ; résoudre des problèmes avec ces données.
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, L, T } = CM2G;
// Diagramme en barres : donnees = [[nom, valeur]], echelle = valeur d'une graduation ; vides = barres à tracer par l'élève.
const diag = (donnees, max, pas, vides) => { const H = 150, b = 40, x0 = 40, Y = v => 15 + H - v * H / max; let g = '';
  for(let v = 0; v <= max; v += pas) g += L([x0, Y(v)], [x0 + donnees.length * (b + 16) + 10, Y(v)], '#D5E2EE', 1) + T([x0 - 6, Y(v) + 4], v, { fs: 10, a: 'end' });
  g += L([x0, Y(0)], [x0, 10], '#1F3A5C', 1.6) + L([x0, Y(0)], [x0 + donnees.length * (b + 16) + 10, Y(0)], '#1F3A5C', 1.6);
  donnees.forEach(([n, v], i) => { const x = x0 + 12 + i * (b + 16); if(!(vides || []).includes(i)) g += `<rect x="${x}" y="${Y(v)}" width="${b}" height="${H + 15 - Y(v)}" fill="#9CC8E8" stroke="#1F3A5C" stroke-width="1.2"/>`; g += T([x + b / 2, Y(0) + 14], n, { fs: 10 }); });
  return svg(x0 + donnees.length * (b + 16) + 20, H + 40, g, Math.min(330, x0 + donnees.length * (b + 16) + 20)); };
const tab = (lignes, opts) => cm1Tableau(lignes[0], lignes.slice(1), opts);
const transports = [['à pied', 9], ['vélo', 4], ['bus', 7], ['voiture', 5]];
PLANCHES['ce2|Tableaux et diagrammes en barres'] = [
  { titre: 'Ranger des données dans un tableau', duree: '25 min',
    attendus: ['Compter et ranger des données dans un tableau', 'Lire un tableau pour répondre à une question'],
    exos: [
      { etoiles: 1, consigne: 'Voici les fruits préférés des élèves : pomme, banane, pomme, fraise, banane, pomme, fraise, pomme, kiwi, fraise, pomme, banane. Complète le tableau.',
        eleve: tab([['Fruit', 'pomme', 'banane', 'fraise', 'kiwi'], ['Nombre d\'élèves', P3.B(2), P3.B(2), P3.B(2), P3.B(2)]], { coul: '#558B2F' }),
        corr: tab([['Fruit', 'pomme', 'banane', 'fraise', 'kiwi'], ['Nombre d\'élèves', P3.R(5), P3.R(3), P3.R(3), P3.R(1)]], { coul: '#558B2F' }) },
      { etoiles: 2, col: 1, consigne: 'Réponds avec le tableau de l\'exercice 1.',
        ...rmp([['Le fruit préféré : @', 'la pomme'], ['Nombre d\'élèves interrogés : @', 12], ['Combien d\'élèves de plus pour la pomme que pour la banane ? @', 2]], 6) },
      { etoiles: 2, col: 1, consigne: 'Ce tableau donne les points marqués. Entoure.',
        eleve: tab([['Équipe', 'Rouge', 'Bleue', 'Verte'], ['Points', '1 250', '980', '1 520']], { coul: '#558B2F' }) + plListe(['L\'équipe gagnante : Rouge · Bleue · Verte', 'L\'équipe dernière : Rouge · Bleue · Verte']),
        corr: tab([['Équipe', 'Rouge', 'Bleue', 'Verte'], ['Points', '1 250', '980', '1 520']], { coul: '#558B2F' }) + plListe(['L\'équipe gagnante : ' + plEntoure('Verte'), 'L\'équipe dernière : ' + plEntoure('Bleue')]) },
      { etoiles: 1, col: 1, consigne: 'Voici les livres prêtés par la bibliothèque. Complète.', eleve: cm1Tableau(['lundi', 'mardi', 'jeudi', 'vendredi'], [['12', '8', '15', '10']]) + plListe(['Le jour où on a prêté le plus de livres : ' + P3.B(4), 'Livres prêtés en tout : ' + P3.B(2)]), corr: cm1Tableau(['lundi', 'mardi', 'jeudi', 'vendredi'], [['12', '8', '15', '10']]) + plListe(['Le jour où on a prêté le plus de livres : ' + P3.R('jeudi'), 'Livres prêtés en tout : ' + P3.R(45)]) },
      { etoiles: 2, col: 1, consigne: 'Avec le tableau des livres, complète.', ...P3.rmp([['De lundi à mardi, il y a @ livres de moins.', 4], ['Jeudi et vendredi ensemble : @ livres', 25]], 2) },
    ] },
  { titre: 'Le diagramme en barres', duree: '30 min',
    attendus: ['Lire un diagramme en barres', 'Compléter un diagramme en barres avec la bonne échelle'],
    exos: [
      { etoiles: 1, consigne: `Comment les élèves viennent-ils à l'école ?<div style="text-align:center;">${diag(transports, 10, 1)}</div>`,
        ...rmp([['Combien viennent à pied ? @', 9], ['Combien viennent en bus ? @', 7], ['Combien d\'élèves en tout ? @', 25]], 3) },
      { etoiles: 2, consigne: 'Trace les barres qui manquent : Lou a lu 6 livres, Max 3 livres.',
        eleve: diag([['Lina', 4], ['Lou', 6], ['Max', 3], ['Sam', 5]], 8, 1, [1, 2]),
        corr: diag([['Lina', 4], ['Lou', 6], ['Max', 3], ['Sam', 5]], 8, 1) },
      { etoiles: 3, consigne: `Ce diagramme a une échelle de 10 en 10.<div style="text-align:center;">${diag([['lundi', 30], ['mardi', 45], ['jeudi', 20], ['vendredi', 55]], 60, 10)}</div>`,
        ...rmp([['Repas servis le mardi : @', 45], ['Le jour où l\'on a servi le plus de repas : @', 'vendredi'], ['De combien de repas de plus le vendredi que le jeudi ? @', 35]], 5) },
    ] },
  { titre: 'Le tableau à double entrée', duree: '30 min',
    attendus: ['Lire une case d\'un tableau à double entrée', 'Utiliser les totaux', 'Compléter un tableau avec des additions et des soustractions'],
    exos: [
      { etoiles: 1, consigne: `Les élèves de l'école et leur sport préféré.${tab([['', 'Football', 'Danse', 'Judo', 'Total'], ['Filles', 18, 25, 12, 55], ['Garçons', 27, 9, 14, 50], ['Total', 45, 34, 26, 105]], { coul: '#558B2F' })}`,
        ...rmp([['Combien de garçons préfèrent le judo ? @', 14], ['Combien de filles en tout ? @', 55], ['Combien d\'élèves préfèrent la danse ? @', 34], ['Combien d\'élèves dans l\'école ? @', 105]], 3) },
      { etoiles: 2, consigne: 'Complète les cases vides du tableau.',
        eleve: tab([['', 'Matin', 'Après-midi', 'Total'], ['Lundi', 120, P3.B(3), 200], ['Mardi', P3.B(3), 95, 160], ['Total', P3.B(3), P3.B(3), P3.B(3)]], { coul: '#558B2F' }),
        corr: tab([['', 'Matin', 'Après-midi', 'Total'], ['Lundi', 120, P3.R(80), 200], ['Mardi', P3.R(65), 95, 160], ['Total', P3.R(185), P3.R(175), P3.R(360)]], { coul: '#558B2F' }) },
      { etoiles: 2, consigne: 'Les animaux des élèves. Complète.', eleve: cm1Tableau(['', 'Chats', 'Chiens'], [['CE2 A', '5', '8'], ['CE2 B', '7', '4']]) + plListe(['Chats du CE2 B : ' + P3.B(2), 'Animaux du CE2 A : ' + P3.B(2), 'Chiens en tout : ' + P3.B(2), 'Chats en tout : ' + P3.B(2), 'Animaux du CE2 B : ' + P3.B(2), 'Animaux des deux classes : ' + P3.B(2)]), corr: cm1Tableau(['', 'Chats', 'Chiens'], [['CE2 A', '5', '8'], ['CE2 B', '7', '4']]) + plListe(['Chats du CE2 B : ' + P3.R(7), 'Animaux du CE2 A : ' + P3.R(13), 'Chiens en tout : ' + P3.R(12), 'Chats en tout : ' + P3.R(12), 'Animaux du CE2 B : ' + P3.R(11), 'Animaux des deux classes : ' + P3.R(24)]) },
    ] },
];
})();

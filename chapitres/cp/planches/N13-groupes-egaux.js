/* CP · Planches : Des groupes égaux (N13). */
(() => {
const { lig, compte, cadre } = PCP, B = P3.B, R = P3.R;
const paquets = (g, n, c) => { let s = ''; for(let i = 0; i < g; i++){ const x0 = 4 + i * 62; s += `<rect x="${x0}" y="4" width="56" height="50" rx="9" fill="#FFF7E8" stroke="${CPC.bord}" stroke-width="1.5"/>`;
  for(let j = 0; j < n; j++) s += `<circle cx="${x0 + 13 + (j % 3) * 15}" cy="${18 + Math.floor(j / 3) * 16}" r="6" fill="${c || CPC.jeton}" stroke="${CPC.bord}"/>`; } return cpSvg(g * 62 + 6, 58, s, Math.min(260, g * 62 + 6)); };
PLANCHES['cp|Des groupes égaux'] = [
  { titre: 'Combien en tout ?', duree: '20 min',
    attendus: ['Dénombrer des groupes égaux par addition répétée', 'Compter de 2 en 2, de 5 en 5, de 10 en 10'],
    exos: [
      { etoiles: 1, consigne: 'Combien de jetons ? Écris l\'addition.',
        eleve: plListe([paquets(3, 4) + ' ' + B(2) + ' + ' + B(2) + ' + ' + B(2) + ' = ' + B(2), paquets(4, 2) + ' ' + B(10)]),
        corr: plListe([paquets(3, 4) + ' 4 + 4 + 4 = ' + R(12), paquets(4, 2) + ' ' + R('2 + 2 + 2 + 2 = 8')]) },
      { etoiles: 2, consigne: 'Complète les suites.',
        eleve: plListe(['2, 4, 6, ' + B(2) + ', ' + B(2) + ', ' + B(2), '5, 10, 15, ' + B(2) + ', ' + B(2), '10, 20, 30, ' + B(2) + ', ' + B(2)]),
        corr: plListe(['2, 4, 6, ' + R(8) + ', ' + R(10) + ', ' + R(12), '5, 10, 15, ' + R(20) + ', ' + R(25), '10, 20, 30, ' + R(40) + ', ' + R(50)]) },
    ] },
  { titre: 'Partager', duree: '20 min',
    attendus: ['Partager une quantité en parts égales'],
    exos: [
      { etoiles: 1, consigne: 'Partage les 12 bonbons dans les 3 sachets : dessine-les.',
        eleve: lig(paquets(3, 0)), corr: lig(paquets(3, 4, '#E9C46A')) + lig('Chaque sachet a ' + R(4) + ' bonbons.') },
      { etoiles: 2, cahier: true, consigne: 'On partage 10 images entre 2 enfants, autant chacun. Combien d\'images pour chacun ?',
        corr: cm1Redac('Images de chacun', '5 + 5 = 10', 'Chaque enfant a 5 images.') },
    ] },
  { titre: 'Problèmes de groupes', duree: '20 min',
    attendus: ['Résoudre des problèmes de groupements et de partages'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une voiture a 4 roues. Combien de roues ont 3 voitures ?',
        corr: cm1Redac('Roues des voitures', '4 + 4 + 4 = 12', '3 voitures ont 12 roues.') },
      { etoiles: 2, cahier: true, consigne: 'Une boîte contient 10 crayons. Combien de crayons dans 5 boîtes ?',
        corr: cm1Redac('Crayons', '10 + 10 + 10 + 10 + 10 = 50', 'Il y a 50 crayons.') },
      { etoiles: 3, cahier: true, consigne: '15 enfants font des équipes de 5. Combien d\'équipes ?',
        corr: cm1Redac('Équipes', '5 + 5 + 5 = 15', 'Il y a 3 équipes.') },
    ] },
];
})();

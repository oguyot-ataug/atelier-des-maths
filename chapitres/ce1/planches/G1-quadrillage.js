/* CE1 · Planches : Se repérer sur un quadrillage (G1). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R;
const LET = 'ABCDEFGH';
function grille(nc, nr, objets, on, px){
  const C = 32, X = 22, Y = 20; let s = '';
  for(let c = 0; c < nc; c++) s += ce2T(X + c * C + C / 2, 14, LET[c], { t: 12, g: 700 });
  for(let r = 0; r < nr; r++) s += ce2T(10, Y + r * C + C / 2 + 4, r + 1, { t: 12, g: 700 });
  (on || []).forEach(([c, r]) => { s += `<rect x="${X + c * C + 2}" y="${Y + r * C + 2}" width="${C - 4}" height="${C - 4}" fill="#FFE08A"/>`; });
  s += `<rect x="${X}" y="${Y}" width="${nc * C}" height="${nr * C}" fill="none" stroke="${CPC.bord}" stroke-width="2"/>`;
  for(let c = 1; c < nc; c++) s += `<line x1="${X + c * C}" y1="${Y}" x2="${X + c * C}" y2="${Y + nr * C}" stroke="#9FB0C4"/>`;
  for(let r = 1; r < nr; r++) s += `<line x1="${X}" y1="${Y + r * C}" x2="${X + nc * C}" y2="${Y + r * C}" stroke="#9FB0C4"/>`;
  objets.forEach(([t, c, r]) => { s += `<g transform="translate(${X + c * C + C / 2} ${Y + r * C + C / 2}) scale(.75) translate(${-(X + c * C + C / 2)} ${-(Y + r * C + C / 2)})">${CP_ICO[t](X + c * C + C / 2, Y + r * C + C / 2)}</g>`; });
  return cpSvg(X + nc * C + 4, Y + nr * C + 4, s, px || 200);
}
const OBJ = [['etoile', 1, 0], ['coeur', 3, 2], ['rond', 0, 3], ['arbre', 4, 1], ['carre', 2, 3]];
PLANCHES['ce1|Se repérer sur un quadrillage'] = [
  { titre: 'Nommer des cases', duree: '20 min',
    attendus: ['Repérer une case par une lettre et un nombre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Dans quelle case est chaque dessin ?', eleve: lig(grille(5, 4, OBJ)) + plListe(['l\'étoile : ' + B(2), 'le cœur : ' + B(2), 'l\'arbre : ' + B(2)]), corr: lig(grille(5, 4, OBJ)) + plListe(['l\'étoile : ' + R('B1'), 'le cœur : ' + R('D3'), 'l\'arbre : ' + R('E2')]) },
      { etoiles: 2, col: 1, consigne: 'Colorie les cases A2, C4 et D1.', eleve: lig(grille(4, 4, [])), corr: lig(grille(4, 4, [], [[0, 1], [2, 3], [3, 0]])) },
      { etoiles: 2, col: 1, consigne: 'Regarde le quadrillage de l\'exercice 1. Quel dessin est… ?', ...P3.rmp([['en A4 : @', 'le rond'], ['en C4 : @', 'le carré'], ['dans la colonne E : @', 'l\'arbre']], 5) },
      { etoiles: 2, col: 1, consigne: 'Dessine un rond en B3 et une étoile en D2.', eleve: lig(grille(4, 4, [])), corr: lig(grille(4, 4, [['rond', 1, 2], ['etoile', 3, 1]])) },
      { etoiles: 3, consigne: 'Colorie les cases A1, B2, C3, D4 et E5. Que vois-tu ?', eleve: lig(grille(5, 5, [], [], 180)) + lig(B(10)), corr: lig(grille(5, 5, [], [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]], 180)) + lig(R('une ligne en biais (une diagonale)')) },
    ] },
  { titre: 'Coder un déplacement', duree: '25 min',
    attendus: ['Coder et décoder un déplacement sur quadrillage'],
    exos: [
      { etoiles: 1, consigne: `Le robot part de A1 et suit ${cpCode('dddbb')}. Dans quelle case arrive-t-il ?`, ...P3.rmp([['Il arrive en @.', 'D3']], 2) },
      { etoiles: 2, consigne: 'Écris le code pour aller de A4 à E1.', eleve: cadre(40), corr: lig(cpCode('ddddhhh')) },
      { etoiles: 3, consigne: 'Il y a un trou dans la case B2. Écris un code pour aller de A1 à C3 sans tomber dans le trou.', eleve: cadre(40), corr: lig(cpCode('ddbb')) + '<p style="text-align:center;">A1, B1, C1, C2, C3 : on évite B2. Le code ' + cpCode('bbdd') + ' marche aussi (A2, A3, B3, C3).</p>' },
      { etoiles: 2, col: 1, consigne: `Le robot part de B2. Dans quelle case arrive-t-il ?${lig(grille(5, 4, [['souris', 1, 1]], [], 170))}`, ...P3.rmp([['avec ' + cpCode('ddh') + ' : @', 'D1'], ['avec ' + cpCode('bbg') + ' : @', 'A4'], ['avec ' + cpCode('hd') + ' : @', 'C1']], 2) },
      { etoiles: 2, col: 1, consigne: 'Écris le code pour aller de C3 à A1.', eleve: lig(grille(5, 4, [['souris', 2, 2], ['fromage', 0, 0]], [], 170)) + cadre(40), corr: lig(grille(5, 4, [['souris', 2, 2], ['fromage', 0, 0]], [], 170)) + lig(cpCode('gghh')) + '<p style="text-align:center;">D\'autres codes sont justes.</p>' },
    ] },
  { titre: 'Un plan', duree: '20 min',
    attendus: ['Lire un plan simple'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Dessine le plan de ta chambre vue de dessus : le lit, la porte, la fenêtre, le bureau.', corr: '<p>Réponses personnelles : le plan montre les objets vus de dessus, en petit (le lit est un rectangle).</p>' },
      { etoiles: 1, consigne: 'Voici le plan du jardin. Complète.',
        eleve: lig(grille(6, 4, [['arbre', 0, 0], ['arbre', 5, 3], ['coeur', 2, 1], ['etoile', 4, 0], ['rond', 1, 3], ['carre', 3, 2]], [], 230)) + plListe(['Le cœur (le banc) est en ' + B(2), 'Le carré (le bac à sable) est en ' + B(2), 'Les arbres sont en ' + B(2) + ' et en ' + B(2)]),
        corr: lig(grille(6, 4, [['arbre', 0, 0], ['arbre', 5, 3], ['coeur', 2, 1], ['etoile', 4, 0], ['rond', 1, 3], ['carre', 3, 2]], [], 230)) + plListe(['Le cœur (le banc) est en ' + R('C2'), 'Le carré (le bac à sable) est en ' + R('D3'), 'Les arbres sont en ' + R('A1') + ' et en ' + R('F4')]) },
      { etoiles: 2, col: 1, consigne: 'Vu de dessus, à quoi ressemble… ? Entoure.', ...P3.chx([['une table ronde', 'un disque', 'un disque · un carré'], ['un lit', 'un rectangle', 'un rond · un rectangle'], ['un dé', 'un carré', 'un carré · un triangle']]) },
      { etoiles: 2, col: 1, consigne: 'Sur le plan du jardin, écris le code pour aller du banc (C2) à l\'étoile (E1).', eleve: cadre(40), corr: lig(cpCode('ddh')) + '<p style="text-align:center;">D\'autres codes sont justes.</p>' },
      { etoiles: 3, consigne: 'Sur le plan du jardin, quelle case est… ?', ...P3.rmp([['juste à droite du banc : @', 'D2'], ['juste au-dessus du rond : @', 'B3'], ['entre les deux arbres, sur la ligne 4 : @', 'B4, C4, D4 ou E4']], 3) },
    ] },
];
})();

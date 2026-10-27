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
    ] },
  { titre: 'Coder un déplacement', duree: '25 min',
    attendus: ['Coder et décoder un déplacement sur quadrillage'],
    exos: [
      { etoiles: 1, consigne: `Le robot part de A1 et suit ${cpCode('dddbb')}. Dans quelle case arrive-t-il ?`, ...P3.rmp([['Il arrive en @.', 'D3']], 2) },
      { etoiles: 2, consigne: 'Écris le code pour aller de A4 à E1.', eleve: cadre(40), corr: lig(cpCode('ddddhhh')) },
      { etoiles: 3, consigne: 'Il y a un trou dans la case B2. Écris un code pour aller de A1 à C3 sans tomber dans le trou.', eleve: cadre(40), corr: lig(cpCode('ddbb')) + '<p style="text-align:center;">A1, B1, C1, C2, C3 : on évite B2. Le code ' + cpCode('bbdd') + ' marche aussi (A2, A3, B3, C3).</p>' },
    ] },
  { titre: 'Un plan', duree: '20 min',
    attendus: ['Lire un plan simple'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Dessine le plan de ta chambre vue de dessus : le lit, la porte, la fenêtre, le bureau.', corr: '<p>Réponses personnelles : le plan montre les objets vus de dessus, en petit (le lit est un rectangle).</p>' },
    ] },
];
})();

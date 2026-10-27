/* CP · Planches : Comparer des longueurs (M1) -- comparer, ranger, mesurer avec une unité. */
(() => {
const { lig, entoure, cadre } = PCP, B = P3.B, R = P3.R;
// Crayons alignés à gauche (ou décalés) : [[longueur, couleur, décalage, nom]].
function crayons(L, o){
  o = o || {}; const W = Math.max(...L.map(([l, , d]) => l + (d || 0))) + 60;
  let s = o.repere ? `<line x1="10" y1="2" x2="10" y2="${L.length * 32 + 4}" stroke="${CE2C.vert}" stroke-width="2" stroke-dasharray="5 4"/>` : '';
  L.forEach(([l, c, d, nom], i) => { s += cpCrayon(10 + (d || 0), 20 + i * 32, l, c) + (nom ? ce2T(Math.max(...L.map(([l2, , d2]) => l2 + (d2 || 0))) + 26, 25 + i * 32, nom, { t: 14, g: 700, c }) : ''); });
  return cpSvg(W, L.length * 32 + 8, s, o.px || Math.min(320, W));
}
const ruban = (n, c) => cpSvg(n * 36 + 10, 64, `<rect x="4" y="4" width="${n * 36}" height="14" fill="${c || '#9BC53D'}" stroke="${CPC.bord}"/>` + Array.from({ length: n }, (_, i) => cpTrombone(4 + i * 36, 30)).join(''), Math.min(300, n * 36 + 10));
PLANCHES['cp|Comparer des longueurs'] = [
  { titre: 'Plus long, plus court', duree: '20 min',
    attendus: ['Comparer deux longueurs en alignant un bout', 'Utiliser plus long, plus court, aussi long'],
    exos: [
      { etoiles: 1, consigne: 'Entoure le crayon le plus long.',
        eleve: lig(crayons([[180, '#E35D3A', 0, 'A'], [230, '#2EA8C9', 0, 'B'], [150, '#2E9C6A', 0, 'C']], { repere: true })) + lig('<b>A · B · C</b>'),
        corr: lig(crayons([[180, '#E35D3A', 0, 'A'], [230, '#2EA8C9', 0, 'B'], [150, '#2E9C6A', 0, 'C']], { repere: true })) + lig(plEntoure('B')) },
      { etoiles: 2, consigne: 'Attention, ils ne partent pas du même endroit ! Entoure le plus long.',
        eleve: lig(crayons([[200, '#E35D3A', 0, 'A'], [170, '#2EA8C9', 60, 'B']])) + lig('<b>A · B</b>'),
        corr: lig(crayons([[200, '#E35D3A', 0, 'A'], [170, '#2EA8C9', 60, 'B']])) + lig(plEntoure('A') + ' (200 contre 170 : il faut aligner les bouts)') },
    ] },
  { titre: 'Ranger des longueurs', duree: '15 min',
    attendus: ['Ranger des objets selon leur longueur'],
    exos: [
      { etoiles: 2, consigne: 'Range les crayons du plus court au plus long : écris les lettres.',
        eleve: lig(crayons([[200, '#E35D3A', 0, 'A'], [110, '#2EA8C9', 0, 'B'], [250, '#2E9C6A', 0, 'C'], [160, '#7A4FC0', 0, 'D']], { repere: true })) + lig(B(10)),
        corr: lig(crayons([[200, '#E35D3A', 0, 'A'], [110, '#2EA8C9', 0, 'B'], [250, '#2E9C6A', 0, 'C'], [160, '#7A4FC0', 0, 'D']], { repere: true })) + lig(R('B, D, A, C')) },
      { etoiles: 3, consigne: 'Dessine un trait plus long que le crayon et un trait plus court.',
        eleve: lig(crayons([[160, '#E9C46A']])) + cadre(70), corr: lig(crayons([[160, '#E9C46A']])) + lig(cpSvg(260, 40, '<line x1="10" y1="10" x2="240" y2="10" stroke="#2E9C6A" stroke-width="4"/><line x1="10" y1="30" x2="90" y2="30" stroke="#E35D3A" stroke-width="4"/>', 220)) },
    ] },
  { titre: 'Mesurer avec des trombones', duree: '20 min',
    attendus: ['Mesurer une longueur en reportant une unité', 'Comparer deux mesures dans la même unité'],
    exos: [
      { etoiles: 1, consigne: 'Combien de trombones mesure chaque ruban ?',
        ...PCP.compte([[ruban(5), 5], [ruban(7, '#F2A93B'), 7]], 2) },
      { etoiles: 2, cahier: true, consigne: 'Le ruban rouge mesure 6 trombones. Le ruban bleu mesure 9 trombones. Lequel est le plus long ? De combien de trombones ?',
        corr: cm1Redac('Le ruban le plus long', '6 + 3 = 9', 'Le ruban bleu est le plus long, de 3 trombones.') },
    ] },
];
})();

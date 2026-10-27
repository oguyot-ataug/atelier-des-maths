/* CE1 · Planches : Les masses : le gramme et le kilogramme (M4). */
(() => {
const { lig, compte } = PCP, B = P3.B, R = P3.R;
function masses(L){ let s = '', x = 4; L.forEach(g => { const h = g >= 500 ? 40 : g >= 100 ? 33 : g >= 20 ? 26 : 20, w = h * .8;
  s += `<rect x="${x}" y="${48 - h}" width="${w}" height="${h}" rx="4" fill="#B9BEC6" stroke="${CPC.bord}" stroke-width="1.3"/>` + ce2T(x + w / 2, 48 - h / 2 + 4, g >= 1000 ? g / 1000 + ' kg' : g + ' g', { t: 9, g: 700 }); x += w + 7; }); return cpSvg(x, 52, s, Math.round(x * 1.5)); }
PLANCHES['ce1|Les masses : le gramme et le kilogramme'] = [
  { titre: 'Peser avec des masses marquées', duree: '20 min',
    attendus: ['Trouver la masse d\'un objet équilibré par des masses marquées'],
    exos: [
      { etoiles: 1, consigne: 'Quelle est la masse de l\'objet équilibré par ces masses ?', ...compte([[masses([200, 100, 50]), '350 g'], [masses([500, 200, 20, 5]), '725 g']], 2, 4) },
      { etoiles: 2, col: 1, consigne: 'Calcule la masse totale.', ...P3.rmp([['200 g + 100 g + 100 g = @ g', 400], ['500 g + 200 g + 50 g = @ g', 750], ['500 g + 500 g = @ g', '1 000']], 2) },
    ] },
  { titre: 'Gramme ou kilogramme', duree: '20 min',
    attendus: ['Choisir l\'unité qui convient', 'Connaître 1 kg = 1 000 g'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'g ou kg ?', ...P3.rmp([['Une pomme : 150 @', 'g'], ['Un chien : 20 @', 'kg'], ['Une gomme : 25 @', 'g'], ['Un sac de pommes de terre : 5 @', 'kg']], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 kg = @ g', '1 000'], ['500 g + 500 g = @ kg', 1], ['2 kg = @ g', '2 000']], 3) },
    ] },
  { titre: 'Problèmes de masses', duree: '20 min',
    attendus: ['Ajouter et comparer des masses'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un panier pèse 300 g. On y met 450 g de cerises. Combien pèse-t-il ?', corr: cm1Redac('Le panier', '300 g + 450 g = 750 g', 'Le panier pèse 750 g.') },
      { etoiles: 2, cahier: true, consigne: 'Quel est le plus lourd : un paquet de 1 kg ou un sac de 850 g ? De combien ?', corr: cm1Redac('Le plus lourd', { suite: ['1 kg = 1 000 g', '850 + 150 = 1 000'] }, 'Le paquet de 1 kg est plus lourd, de 150 g.') },
    ] },
];
})();

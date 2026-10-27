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
      { etoiles: 2, consigne: 'Quelle est la masse de l\'objet équilibré par ces masses ?', ...compte([[masses([500, 100, 100, 50]), '750 g'], [masses([200, 200, 50, 5]), '455 g']], 2, 4) },
      { etoiles: 3, col: 1, consigne: 'Complète pour équilibrer.', ...P3.rmp([['300 g = 200 g + @ g', 100], ['650 g = 500 g + 100 g + @ g', 50]], 2) },
      { etoiles: 1, col: 1, consigne: 'Combien de grammes ?', ...P3.rmp([['une masse de 100 g et une de 50 g : @ g', 150], ['deux masses de 200 g : @ g', 400]], 2) },
    ] },
  { titre: 'Gramme ou kilogramme', duree: '20 min',
    attendus: ['Choisir l\'unité qui convient', 'Connaître 1 kg = 1 000 g'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'g ou kg ?', ...P3.rmp([['Une pomme : 150 @', 'g'], ['Un chien : 20 @', 'kg'], ['Une gomme : 25 @', 'g'], ['Un sac de pommes de terre : 5 @', 'kg']], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 kg = @ g', '1 000'], ['500 g + 500 g = @ kg', 1], ['2 kg = @ g', '2 000']], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la masse qui convient.', ...P3.chx([['un vélo :', '12 kg', '12 g · 12 kg'], ['une fraise :', '15 g', '15 g · 15 kg'], ['un enfant de CE1 :', '25 kg', '25 g · 25 kg']]) },
      { etoiles: 3, col: 1, consigne: 'Écris <, > ou =.', ...P3.rmp([['1 kg @ 800 g', '>'], ['1 000 g @ 1 kg', '='], ['2 kg @ 3 000 g', '<']], 1) },
      { etoiles: 1, consigne: 'Entoure les objets qui pèsent plus de 1 kg.', ...PCP.entoure([['<b>un cartable plein</b>', true], ['<b>une gomme</b>', false], ['<b>un chat</b>', true], ['<b>une cuillère</b>', false], ['<b>un sac de farine de 2 kg</b>', true]], 5) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['3 kg = @ g', '3 000'], ['1 kg = 500 g + @ g', 500], ['1 kg = 250 g + 250 g + @ g', 500]], 3) },
      { etoiles: 2, col: 1, consigne: 'Range du plus léger au plus lourd : 1 kg, 300 g, 2 kg, 900 g.', ...P3.rmp([['@', '300 g, 900 g, 1 kg, 2 kg']], 10) },
    ] },
  { titre: 'Problèmes de masses', duree: '20 min',
    attendus: ['Ajouter et comparer des masses'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Un panier pèse 300 g. On y met 450 g de cerises. Combien pèse-t-il ?', corr: cm1Redac('Le panier', '300 g + 450 g = 750 g', 'Le panier pèse 750 g.') },
      { etoiles: 2, cahier: true, consigne: 'Quel est le plus lourd : un paquet de 1 kg ou un sac de 850 g ? De combien ?', corr: cm1Redac('Le plus lourd', { suite: ['1 kg = 1 000 g', '850 + 150 = 1 000'] }, 'Le paquet de 1 kg est plus lourd, de 150 g.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['3 paquets de 200 g : @ g', 600], ['Une pomme de 150 g et une poire de 200 g : @ g', 350]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['1 kg − 300 g = @ g', 700], ['2 kg + 500 g = @ g', '2 500']], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Un chiot pesait 2 kg. Il a pris 3 kg. Il pèse @ kg.', 5], ['Un sac de 1 kg de riz. On en utilise 400 g. Il reste @ g.', 600]], 2) },
      { etoiles: 3, consigne: 'Le panier vide pèse 200 g. Avec les fruits, il pèse 1 kg. Combien pèsent les fruits ? Complète.', eleve: plListe(['1 kg = ' + B(3) + ' g', 'Les fruits pèsent ' + B(3) + ' g.']), corr: plListe(['1 kg = ' + R('1 000') + ' g', '1 000 − 200 = 800', 'Les fruits pèsent ' + R(800) + ' g.']) },
    ] },
];
})();

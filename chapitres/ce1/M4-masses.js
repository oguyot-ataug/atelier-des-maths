/* ============================================================
   CHAPITRE : Les masses : le gramme et le kilogramme (CE1, M4, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, grandeurs et mesures : comparer
   des masses (balance à plateaux), mesurer avec des masses marquées, connaître le gramme (g) et le
   kilogramme (kg), 1 kg = 1 000 g, ordres de grandeur (un trombone pèse environ 1 g, un paquet de sucre
   environ 1 kg) ; ajouter des masses ; problèmes.
   Pensé pour être projeté : la balance qui penche, puis qui s'équilibre.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Des masses marquées (en grammes) dessinées.
function masses(L){
  let s = '', x = 4;
  L.forEach(g => { const h = g >= 500 ? 44 : g >= 100 ? 36 : g >= 20 ? 28 : 22, w = h * .8;
    s += `<rect x="${x}" y="${50 - h}" width="${w}" height="${h}" rx="4" fill="#B9BEC6" stroke="${CPC.bord}" stroke-width="1.4"/><rect x="${x + w / 2 - 4}" y="${50 - h - 6}" width="8" height="7" rx="2" fill="#B9BEC6" stroke="${CPC.bord}"/>` + ce2T(x + w / 2, 50 - h / 2 + 4, g >= 1000 ? g / 1000 + ' kg' : g + ' g', { t: g >= 100 ? 10 : 9, g: 700 });
    x += w + 8; });
  return cpSvg(x, 54, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Les masses : le gramme et le kilogramme', slug: 'masses',
  cours: `
${cm1Lecon(1, 'Comparer avec une balance')}
${ce2AnimBalance('ce1-m4-balance', { presets: [
  { nom: 'Le livre et la trousse', g: ['le livre', 400, '#2EA8C9', ''], d: ['la trousse', 250, '#7A4FC0', ''] },
  { nom: 'Mesurer la pomme', g: ['la pomme', 150, '#E35D3A', '?'], d: ['100 g + 50 g', 150, '#8E9AA8', '150 g'], montrer: true, fem: true, fin: 'La pomme pèse 150 g.' },
  { nom: '1 kg et 1 000 g', g: ['la farine', 1000, '#C9A24A', '1 kg'], d: ['le sucre', 1000, '#8E9AA8', '1 000 g'], montrer: true }] })}
${cm1Regle('Le plateau qui descend porte l\'objet le plus <b>lourd</b>. Quand la balance est en <b>équilibre</b>, les deux côtés ont la même masse.')}

${cm1Lecon(2, 'Le gramme et le kilogramme')}
${cm1Def(`${lig(masses([1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]))}${P('Les masses marquées. <b>1 kg = 1 000 g</b>.')}`, 'Les unités')}
${cm1Regle(`${cm1Liste(['Un trombone pèse environ <b>1 g</b>.', 'Une pomme pèse environ <b>150 g</b>.', 'Un paquet de sucre pèse <b>1 kg</b> ; un sachet de levure, environ <b>10 g</b>.', 'Un enfant de CE1 pèse environ <b>25 kg</b>.'])}`, 'Ordres de grandeur')}

${cm1Lecon(3, 'Mesurer avec des masses marquées')}
${cm1Def(`Pour peser un objet, on le pose sur un plateau et on ajoute des masses marquées de l'autre côté jusqu'à l'équilibre.${lig(masses([200, 100, 50, 20]))}${P('200 g + 100 g + 50 g + 20 g : l\'objet pèse <b>370 g</b>.')}`, 'Peser')}
${cm1Rem('Aujourd\'hui, on utilise souvent une balance électronique : le nombre s\'affiche directement. Au tableau, la balance à plateaux aide à comprendre ce qu\'est une masse.')}

${cm1Lecon(4, 'Problèmes de masses')}
${cm1Exemple('Exemple', [`Maman achète 500 g de cerises et 300 g de fraises. Combien pèsent les fruits ?${cm1Redac('Masse des fruits', '500 g + 300 g = 800 g', 'Les fruits pèsent 800 g.')}`])}
`,
  methode: `
${cm1Demo('ce1-m4-m-peser', 'Lire une pesée', 'Quelle est la masse du melon ?')}
${cm1Demo('ce1-m4-m-comparer', 'Comparer 1 kg et 800 g', 'Le paquet de 1 kg est-il plus lourd que le sac de 800 g ?')}
`,
  demos: [
    ['ce1-m4-m-peser', [
      { expr: 'La balance est en équilibre.', note: 'Le melon pèse autant que les masses marquées.', fig: masses([500, 200, 200, 50]) },
      { expr: '500 + 200 + 200 + 50 = 950', note: 'J\'ajoute les masses.' },
      { expr: 'Le melon pèse 950 g.', note: 'Presque 1 kg.' },
    ]],
    ['ce1-m4-m-comparer', [
      { expr: '1 kg = 1 000 g', note: 'Je mets tout dans la même unité.' },
      { expr: '1 000 g &gt; 800 g', note: 'Je compare.' },
      { expr: 'Le paquet de 1 kg est plus lourd.', note: 'De 200 g.' },
    ]],
  ],
  exos: cm1Exos('ce1-m4', [
    ['Quelle unité choisir pour peser une gomme : g ou kg ?',
      cm1Redac('La gomme', '', 'Une gomme est très légère : on la pèse en grammes (environ 20 g).')],
    ['Quelle unité choisir pour peser un chien : g ou kg ?',
      cm1Redac('Le chien', '', 'Un chien est lourd : on le pèse en kilogrammes.')],
    [`Quelle est la masse de l'objet ?${lig(masses([100, 100, 50, 5]))}`,
      cm1Redac('La masse', '100 + 100 + 50 + 5 = 255', 'L\'objet pèse 255 g.')],
    ['Range du plus léger au plus lourd : 1 kg, 300 g, 750 g.',
      cm1Redac('Ranger', { suite: ['1 kg = 1 000 g', '300 g &lt; 750 g &lt; 1 000 g'] }, 'Du plus léger au plus lourd : 300 g, 750 g, 1 kg.')],
    ['Combien de paquets de 500 g faut-il pour faire 1 kg ?',
      cm1Redac('Paquets de 500 g', '500 g + 500 g = 1 000 g', 'Il faut 2 paquets de 500 g.')],
    ['Un sac pèse 250 g. On y ajoute 400 g de pommes. Combien pèse-t-il ?',
      cm1Redac('Le sac', '250 g + 400 g = 650 g', 'Le sac pèse 650 g.')],
    ['Léo pèse 26 kg. Avec son cartable, il pèse 30 kg. Combien pèse le cartable ?',
      cm1Redac('Le cartable', '26 + 4 = 30', 'Le cartable pèse 4 kg.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le kilogramme de Paris', [
    'Pendant plus de 100 ans, le kilogramme a été défini par un petit cylindre de métal rangé dans un coffre-fort près de Paris, à Sèvres : le « grand K ». Tous les kilogrammes du monde devaient lui être égaux !',
    'Depuis 2019, les savants définissent le kilogramme autrement, avec une formule de physique qui ne change jamais. Le grand K est toujours dans son coffre, mais il est à la retraite.',
  ]),
  quiz: [
    { q: '1 kg = …', opts: ['1 000 g', '100 g', '10 g'], correct: 0 },
    { q: 'Une pomme pèse environ…', opts: ['150 g', '150 kg', '1 g'], correct: 0 },
    { q: '500 g + 500 g = …', opts: ['1 kg', '1 000 kg', '10 g'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Le plateau qui descend porte…', r: ['le plus lourd', 'le plus léger', 'le plus gros', 'rien'], ok: 0 },
    { l: 2, q: 'Un trombone pèse environ…', r: ['1 g', '1 kg', '100 g', '10 kg'], ok: 0 },
    { l: 2, q: 'Un paquet de sucre pèse…', r: ['1 kg', '1 g', '10 kg', '100 g'], ok: 0 },
    { l: 3, q: '200 g + 50 g + 5 g = …', r: ['255 g', '2505 g', '205 g', '250 g'], ok: 0 },
    { l: 4, q: 'Le plus lourd : 1 kg ou 900 g ?', r: ['1 kg', '900 g', 'Pareil', 'On ne sait pas'], ok: 0 },
  ],
});
})();

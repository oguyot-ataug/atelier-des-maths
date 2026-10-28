/* ============================================================
   CHAPITRE : Longueurs : centimètre, mètre, kilomètre (CE1, M1, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, grandeurs et mesures : mesurer
   et tracer des segments en centimètres avec une règle graduée, encadrer une longueur entre deux
   nombres entiers de centimètres, le mètre (1 m = 100 cm ; 1 m + 46 cm = 146 cm) et le kilomètre
   (1 km = 1 000 m) avec leurs symboles, choisir l'unité adaptée, estimer une longueur (un doigt, un
   pas, une porte, des distances autour de l'école), comparer et ajouter des longueurs ; problèmes.
   Pas d'écriture à virgule pour les longueurs au CE1.
   Pensé pour être projeté : la règle qui se pose sous le trait, et le piège du 0 oublié.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Une ligne brisée (chemin de la fourmi) : longueurs en cm, dessinée à l'échelle.
function chemin(L){
  const K = 26; let x = 10, y = 96, s = '', pts = [[x, y]];
  L.forEach((l, i) => { if(i % 2 === 0) x += l * K; else y += (i % 4 === 1 ? -1 : 1) * l * K; pts.push([x, y]); });
  s += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3"/>`;
  pts.slice(0, -1).forEach((p, i) => { const q = pts[i + 1]; s += ce2T((p[0] + q[0]) / 2 + (i % 2 ? 14 : 0), (p[1] + q[1]) / 2 - 8, L[i] + ' cm', { t: 12, g: 700 }); });
  return cpSvg(x + 30, 110, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Longueurs : centimètre, mètre, kilomètre', slug: 'longueurs',
  cours: `
${cm1Lecon(1, 'Mesurer en centimètres')}
${cpAnimMesurer('ce1-m1-mesurer', { presets: [{ nom: 'Trait de 9 cm', cm: 9 }, { nom: 'Trait de 6 cm', cm: 6 }, { nom: 'Le piège : partir du 2', cm: 7, de: 2 }] })}
${cm1Regle(`${cm1Liste(['je place le <b>0</b> de la règle au début du segment ;', 'je lis le nombre en face de l\'autre extrémité ;', 'j\'écris la mesure avec l\'unité : <b>7 cm</b>.'])}`, 'Mesurer')}
${cm1Astuce('Si la règle est cassée ou mal placée, on peut partir d\'un autre nombre : du 2 au 9, il y a 7 cm. Mais c\'est plus sûr de partir du 0.')}
${cm1Regle('Quand le bout du segment tombe entre deux graduations, on encadre : « La longueur du segment est <b>entre 8 et 9 centimètres</b>. »', 'Encadrer une longueur')}

${cm1Lecon(2, 'Tracer un segment')}
${cm1Regle(`Pour tracer un segment de 5 cm :${cm1Liste(['je marque un point en face du 0 ;', 'je marque un point en face du 5 ;', 'je relie les deux points le long de la règle.'])}${lig(cpRegle(7, { seg: 5, K: 34 }))}`, 'Tracer')}

${cm1Lecon(3, 'Le mètre')}
${cm1Def('Pour mesurer de grandes longueurs, on utilise le <b>mètre</b> (m). <b>1 m = 100 cm</b>. Le mètre ruban, le mètre pliant et la grande règle du tableau servent à mesurer en mètres.', 'Le mètre')}
${cm1Regle(`Quelques longueurs à connaître :${cm1Liste(['la largeur d\'un doigt : environ 1 cm ;', 'un crayon : environ 15 cm ;', 'un grand pas d\'adulte : environ 1 m ;', 'la hauteur d\'une porte : environ 2 m.'])}`, 'Estimer')}
${cm1Rem('Au tableau : faire estimer la longueur de la classe en mètres, puis la mesurer avec un mètre ruban ou en reportant la grande règle.')}
${cm1Regle('1 m + 46 cm = 100 cm + 46 cm = <b>146 cm</b>.', 'Mètres et centimètres')}

${cm1Lecon(4, 'Ajouter des longueurs')}
${cm1Def(`La fourmi marche le long du chemin. Quelle distance parcourt-elle ?${lig(chemin([4, 2, 3]))}${cm1Liste(['4 + 2 + 3 = 9'])}${P('Elle parcourt <b>9 cm</b>.')}`, 'Une ligne brisée')}

${cm1Lecon(5, 'Le kilomètre')}
${cm1Def('Pour les très grandes distances (aller d\'une ville à une autre, une course à pied), on utilise le <b>kilomètre</b> (km). <b>1 km = 1 000 m</b> : c\'est environ 1 000 grands pas, un quart d\'heure de marche.', 'Le kilomètre')}
${cm1Tableau(['Pour mesurer…', 'une trousse', 'la cour de l\'école', 'la route jusqu\'à la ville voisine'], [['on choisit…', 'le centimètre (cm)', 'le mètre (m)', 'le kilomètre (km)']])}
${cm1Astuce('Cherche des distances autour de l\'école (école-piscine, école-mairie) : elles serviront de repères pour estimer d\'autres distances.')}
`,
  methode: `
${cm1Demo('ce1-m1-m-mesurer', 'Mesurer un segment', 'Combien mesure ce segment ?')}
${cm1Demo('ce1-m1-m-convertir', 'Comparer 1 m et 85 cm', 'Quelle longueur est la plus grande : 1 m ou 85 cm ?')}
`,
  demos: [
    ['ce1-m1-m-mesurer', [
      { expr: 'Je place le 0 au début du segment.', note: 'Pile au bout.', fig: cpRegle(9, { seg: 8, K: 30 }) },
      { expr: 'Je lis en face de l\'autre bout : 8.', note: 'Le segment s\'arrête en face du 8.' },
      { expr: 'Le segment mesure 8 cm.', note: 'Je n\'oublie pas l\'unité.' },
    ]],
    ['ce1-m1-m-convertir', [
      { expr: '1 m = 100 cm', note: 'Je mets les deux longueurs dans la même unité.' },
      { expr: '100 cm &gt; 85 cm', note: 'Je compare.' },
      { expr: '1 m est plus long que 85 cm.', note: 'De 85 cm à 100 cm, il manque 15 cm.' },
    ]],
  ],
  exos: cm1Exos('ce1-m1', [
    [`Combien mesure ce segment ?${lig(cpRegle(10, { seg: 7, K: 30 }))}`,
      cm1Redac('Longueur du segment', '', 'Le segment mesure 7 cm.')],
    [`La règle est mal placée. Combien mesure le segment ?${lig(cpRegle(10, { seg: 6, de: 3, K: 30 }))}`,
      cm1Redac('Longueur du segment', '9 − 3 = 6', 'Le segment va du 3 au 9 : il mesure 6 cm.')],
    ['Trace un segment de 8 cm.',
      cm1Redac('Un segment de 8 cm', '', 'Un point en face du 0, un point en face du 8, et je relie le long de la règle.', cpRegle(9, { seg: 8, K: 26 }))],
    ['Choisis la bonne mesure : la longueur d\'une gomme, est-ce 4 cm, 4 m ou 40 m ?',
      cm1Redac('La gomme', '', 'Une gomme mesure environ 4 cm.')],
    ['Range du plus court au plus long : 1 m, 60 cm, 2 m, 150 cm.',
      cm1Redac('Ranger les longueurs', { suite: ['1 m = 100 cm', '2 m = 200 cm', '60 cm &lt; 100 cm &lt; 150 cm &lt; 200 cm'] }, 'Du plus court au plus long : 60 cm, 1 m, 150 cm, 2 m.')],
    [`Quelle longueur parcourt la fourmi ?${lig(chemin([5, 3, 2]))}`,
      cm1Redac('Le chemin de la fourmi', '5 + 3 + 2 = 10', 'La fourmi parcourt 10 cm.')],
    ['Le bout du segment tombe entre le 8 et le 9 de la règle. Que peut-on dire de sa longueur ?',
      cm1Redac('Longueur du segment', '', 'La longueur du segment est entre 8 et 9 centimètres.')],
    ['Quelle unité choisir : la longueur d\'une trousse ? La distance de Paris à Lyon ? La longueur de la classe ?',
      cm1Redac('Les unités', { suite: ['trousse : cm', 'Paris-Lyon : km', 'classe : m'] }, 'La trousse en centimètres, la classe en mètres, la distance Paris-Lyon en kilomètres.')],
    ['Une course mesure 2 km. Combien de mètres ?',
      cm1Redac('La course', '2 × 1 000 = 2 000', 'La course mesure 2 000 m.')],
    ['Léo mesure 1 m et 25 cm. Sa sœur mesure 98 cm. De combien Léo est-il plus grand ?',
      cm1Redac('Léo et sa sœur', { suite: ['1 m et 25 cm = 125 cm', '98 + 2 = 100', '100 + 25 = 125', '2 + 25 = 27'] }, 'Léo est plus grand de 27 cm.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : un mètre pour tout le monde', [
    'Avant 1795, chaque région de France avait ses propres mesures : le pied de Paris n\'était pas celui de Lyon ! Les marchands s\'y perdaient.',
    'Les savants de la Révolution ont créé le <b>mètre</b> et ses unités : le centimètre (cent fois plus petit) et le kilomètre (mille fois plus grand). En latin, <b>centum</b> veut dire cent : il faut cent centimètres pour faire un mètre. En grec, <b>kilo</b> veut dire mille : un kilomètre, c\'est mille mètres.',
  ]),
  quiz: [
    { q: '1 m = …', opts: ['10 cm', '100 cm', '1 000 cm'], correct: 1 },
    { q: 'La hauteur d\'une porte est environ…', opts: ['2 cm', '2 m', '20 m'], correct: 1 },
    { q: 'Pour mesurer, on place au début du segment…', opts: ['le 0', 'le 1', 'le bord de la règle'], correct: 0 },
    { q: '1 km = …', opts: ['1 000 m', '100 m', '10 m'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Du 0 au 6 sur la règle : …', r: ['6 cm', '7 cm', '5 cm', '60 cm'], ok: 0 },
    { l: 1, q: 'Du 2 au 10 sur la règle : …', r: ['8 cm', '10 cm', '12 cm', '2 cm'], ok: 0 },
    { l: 3, q: '2 m = …', r: ['200 cm', '20 cm', '2 cm', '2 000 cm'], ok: 0 },
    { l: 3, q: 'Un crayon mesure environ…', r: ['15 cm', '15 m', '1 cm', '150 cm'], ok: 0 },
    { l: 4, q: '3 cm + 4 cm + 5 cm = …', r: ['12 cm', '345 cm', '7 cm', '9 cm'], ok: 0 },
    { l: 3, q: '1 m + 46 cm = …', r: ['146 cm', '47 cm', '1 046 cm', '56 cm'], ok: 0 },
    { l: 5, q: '1 km = …', r: ['1 000 m', '100 m', '100 cm', '10 m'], ok: 0 },
    { l: 5, q: 'De l\'école à la ville voisine : 5…', r: ['km', 'cm', 'm', 'kg'], ok: 0 },
  ],
});
})();

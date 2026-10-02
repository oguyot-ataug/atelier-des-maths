/* ============================================================
   CHAPITRE : Organisation et gestion de données (CM2, D2, période 3)
   Programme du cycle 3 (CM2) : recueillir des données et produire un tableau, un diagramme en
   barres ou un ensemble de points dans un repère ; lire et interpréter tableau, diagramme en
   barres, diagramme CIRCULAIRE, courbe ; problèmes en une ou deux étapes ; données réelles
   (climat, pollution, biodiversité).
   ============================================================ */
(() => {
const COUL = ['#2EA8C9', '#E35D3A', '#2E9C6A', '#B8962E', '#7A4FC0'];
function camembert(parts, total){
  let s = '<svg viewBox="0 0 330 200" style="width:100%;max-width:360px;display:block;margin:0 auto;">', a = -Math.PI / 2;
  parts.forEach(([nom, v], i) => { const b = a + 2 * Math.PI * v / total, la = b - a > Math.PI ? 1 : 0;
    s += `<path d="M100 100 L${(100 + 85 * Math.cos(a)).toFixed(1)} ${(100 + 85 * Math.sin(a)).toFixed(1)} A85 85 0 ${la} 1 ${(100 + 85 * Math.cos(b)).toFixed(1)} ${(100 + 85 * Math.sin(b)).toFixed(1)} Z" fill="${COUL[i]}" stroke="#fff" stroke-width="2"/>`;
    s += `<rect x="205" y="${30 + i * 28}" width="14" height="14" rx="3" fill="${COUL[i]}"/><text x="226" y="${42 + i * 28}" font-size="12.5" fill="#1F3A5C" font-family="Space Grotesk">${nom} (${v})</text>`;
    a = b; });
  return s + '</svg>';
}
function repere(points, relie){
  const X = x => 40 + x * 40, Y = y => 180 - y * 8;
  let s = '<svg viewBox="0 0 330 210" style="width:100%;max-width:360px;display:block;margin:0 auto;">';
  for(let y = 0; y <= 20; y += 5) s += `<line x1="40" y1="${Y(y)}" x2="320" y2="${Y(y)}" stroke="#1F3A5C" stroke-opacity="${y ? .15 : 1}"/><text x="34" y="${Y(y) + 4}" font-size="11" text-anchor="end" fill="#1F3A5C" font-family="Space Grotesk">${y}</text>`;
  for(let x = 0; x <= 7; x++) s += `<line x1="${X(x)}" y1="20" x2="${X(x)}" y2="180" stroke="#1F3A5C" stroke-opacity="${x ? .12 : 1}"/><text x="${X(x)}" y="196" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${x}</text>`;
  if(relie) s += `<polyline points="${points.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="2.2"/>`;
  points.forEach(([x, y]) => { s += `<circle cx="${X(x)}" cy="${Y(y)}" r="4.5" fill="#E35D3A"/>`; });
  return s + '<text x="320" y="208" font-size="10.5" text-anchor="end" fill="#5B6472" font-family="Inter">semaines</text><text x="6" y="14" font-size="10.5" fill="#5B6472" font-family="Inter">hauteur (cm)</text></svg>';
}
const TRANSPORT = [['à pied', 12], ['à vélo', 6], ['en bus', 4], ['en voiture', 2]];
const PLANTE = [[0, 2], [1, 4], [2, 7], [3, 10], [4, 12], [5, 15], [6, 16], [7, 17]];
cm1Chapitre({
  niveau: 'cm2', titre: 'Organisation et gestion de données', slug: 'donnees',
  cours: `
${cm1Lecon(1, 'Recueillir et organiser des données')}
${cm1Def('Une enquête permet de <b>recueillir des données</b> sur un <b>caractère</b> : il peut être <b>qualitatif</b> (moyen de transport, couleur, sport) ou <b>quantitatif</b> (âge, taille, nombre de frères et sœurs). On les organise dans un <b>tableau</b>.')}
${cm1Exemple('Enquête : « Comment viens-tu à l\'école ? » (24 élèves)')}
${cm1Tableau(['Moyen de transport', ...TRANSPORT.map(t => t[0]), 'Total'], [['Nombre d\'élèves', ...TRANSPORT.map(t => t[1]), '<b>24</b>']])}
${ce2AnimDiagramme('c2-do-diag', { donnees: [['À pied', 12, '#2E9C6A'], ['Vélo', 6, '#E9C46A'], ['Bus', 4, '#2EA8C9'], ['Voiture', 2, '#E35D3A']], max: 12, pas: 2, titre: 'Comment viens-tu à l\'école ?', fin: 'La barre « à pied » est la plus haute : c\'est la moitié de la classe.' })}

${cm1Lecon(2, 'Le diagramme circulaire')}
<div class="figure-wrap">${camembert(TRANSPORT, 24)}</div>
${cm1Regle('Dans un <b>diagramme circulaire</b>, le disque représente le total ; chaque secteur représente une partie. Plus le secteur est grand, plus la quantité est grande.')}
${cm1Exemple('Lecture :', ['Le secteur « à pied » occupe la <b>moitié</b> du disque : 12 élèves sur 24, la moitié de la classe vient à pied.', 'Le secteur « à vélo » occupe un <b>quart</b> du disque : 6 élèves sur 24.', 'Le diagramme circulaire sert surtout à comparer chaque partie au <b>total</b>.'])}

${cm1Lecon(3, 'Points dans un repère et courbe')}
${cm1Exemple('On mesure chaque semaine la hauteur d\'une plante :')}
${cm1Tableau(['Semaine', ...PLANTE.map(p => p[0])], [['Hauteur (cm)', ...PLANTE.map(p => p[1])]])}
<div class="figure-wrap">${repere(PLANTE, true)}</div>
${cm1Regle('Chaque colonne du tableau donne un <b>point</b> : on se place sur l\'axe horizontal (la semaine), puis on monte jusqu\'à la hauteur lue sur l\'axe vertical. En reliant les points, on obtient une <b>courbe</b> qui montre l\'évolution.')}
${cm1Exemple('Lecture :', ['La plante grandit vite jusqu\'à la semaine 5 (2 à 3 cm par semaine), puis de plus en plus lentement (1 cm par semaine).'])}
${cm1Redac('Croissance entre les semaines 2 et 5', '15 − 7 = 8', 'Entre la semaine 2 et la semaine 5, la plante a grandi de 8 cm.')}
`,
  methode: `
${cm1Demo('c2-do-circ', 'Lire un diagramme circulaire', 'Dans une école de 200 élèves, le secteur « cantine » occupe les trois quarts du disque. Combien d\'élèves mangent à la cantine ?')}
${cm1Demo('c2-do-pts', 'Placer un point dans un repère', 'Place le point qui correspond à « semaine 3, hauteur 10 cm ».')}
`,
  demos: [
    ['c2-do-circ', [
      { expr: 'Le disque entier = 200 élèves', note: 'Le disque représente le total.' },
      { expr: 'un quart : 200 ÷ 4 = 50', note: 'On calcule d\'abord un quart du total.' },
      { expr: 'trois quarts : 3 × 50 = 150', note: 'Le secteur occupe trois quarts du disque.' },
      { expr: '150 élèves mangent à la cantine.', note: 'Phrase réponse.' },
    ]],
    ['c2-do-pts', [
      { expr: 'Axe horizontal : 3', note: 'On part de l\'origine et on avance jusqu\'à la graduation 3 de l\'axe horizontal.' },
      { expr: 'Axe vertical : 10', note: 'On monte verticalement jusqu\'à la hauteur 10.' },
      { expr: 'Je place le point.', note: 'Il est à l\'intersection des deux lignes.' },
    ]],
  ],
  exos: cm1Exos('c2do', [
    ['Dans le diagramme circulaire du cours, quelle fraction de la classe vient en bus ? en voiture ?',
      cm1Redac('En bus', `4 sur 24, c'est ${cm1Frac(4, 24)} = ${cm1Frac(1, 6)}`, 'Un sixième de la classe vient en bus.')
      + cm1Redac('En voiture', `2 sur 24, c'est ${cm1Frac(2, 24)} = ${cm1Frac(1, 12)}`, 'Un douzième de la classe vient en voiture.')],
    ['Enquête sur les animaux : chat 9, chien 8, poisson 3, aucun 4. Fais un tableau et calcule le total. Quelle fraction des élèves a un chat ?',
      cm1Redac('Nombre d\'élèves', ['9 + 8 + 3 + 4', '17 + 7', '24'], 'Il y a 24 élèves en tout.')
      + cm1Redac('Élèves qui ont un chat', `${cm1Frac(9, 24)} = ${cm1Frac(3, 8)}`, 'Les trois huitièmes des élèves ont un chat.')],
    ['Avec les mêmes données, trace un diagramme en barres (1 carreau pour 1 élève).',
      cm1Redac('Diagramme en barres', '', 'On trace quatre barres de 9, 8, 3 et 4 carreaux de haut, avec le nom des animaux sous les barres et un axe gradué.')],
    ['Dans le graphique de la plante, quelle était sa hauteur à la semaine 4 ? Pendant quelle semaine a-t-elle le plus grandi ?',
      cm1Redac('Hauteur à la semaine 4', '', 'À la semaine 4, la plante mesurait 12 cm.')
      + cm1Redac('Plus forte croissance', '', 'Elle a le plus grandi, de 3 cm, entre les semaines 1 et 2, 2 et 3, et 4 et 5.')],
    [`Place dans un repère ces points.${cm1Liste(['(1 ; 5)', '(2 ; 8)', '(3 ; 8)', '(4 ; 12)'])}`,
      cm1Redac('Méthode', '', 'Pour chaque point, on avance sur l\'axe horizontal jusqu\'au premier nombre, puis on monte jusqu\'au second.')],
    [`Température moyenne en France :${cm1Liste(['1950 : 11,8 °C', '1980 : 12,0 °C', '2000 : 12,6 °C', '2020 : 13,4 °C'])}Que remarques-tu ? De combien la température a-t-elle augmenté entre 1950 et 2020 ?`,
      cm1Redac('Évolution', '', 'La température augmente, et de plus en plus vite : c\'est le réchauffement climatique.')
      + cm1Redac('Augmentation de 1950 à 2020', '13,4 − 11,8 = 1,6', 'La température moyenne a augmenté de 1,6 °C.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le premier diagramme circulaire', [
    'Le premier diagramme circulaire connu a été dessiné en 1801 par l\'Écossais <b>William Playfair</b>, pour montrer la part de chaque pays dans l\'empire turc.',
    'On l\'appelle souvent « camembert » en France, à cause de sa forme… et en Italie « torta » (le gâteau) !',
  ]),
  quiz: [
    { q: 'Dans un diagramme circulaire, le disque entier représente…', opts: ['la plus grande valeur', 'le total', 'la moyenne'], correct: 1 },
    { q: 'Un secteur qui occupe la moitié du disque représente, sur 30 élèves…', opts: ['15 élèves', '30 élèves', '10 élèves'], correct: 0 },
    { q: 'Une courbe sert surtout à montrer…', opts: ['une évolution', 'un partage', 'une figure'], correct: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Organisation et gestion de données (CM1, D1, période 2)
   Programme du cycle 3 (CM1) : prélever des données numériques dans un texte, un tableau, un
   diagramme en barres, un graphique ; les organiser dans un tableau ; lire et compléter un
   tableau à double entrée ; lire et construire un diagramme en barres ; lire un graphique
   (courbe) et les coordonnées de ses points. Nombres entiers ≤ 9 999 (période 2).
   ============================================================ */
(() => {
// Diagramme en barres : donnees = [[etiquette, valeur]], pas de graduation, max.
function barres(donnees, pas, max, opts){
  opts = opts || {}; const W = 60 + donnees.length * 70, Hh = 200, y0 = 170, k = 140 / max;
  let s = `<svg viewBox="0 0 ${W} ${Hh + 10}" style="width:100%;max-width:${W + 40}px;display:block;margin:6px auto;">`;
  for(let v = 0; v <= max; v += pas){ const y = y0 - v * k; s += `<line x1="40" y1="${y}" x2="${W - 10}" y2="${y}" stroke="#1F3A5C" stroke-opacity="${v ? .15 : 1}"/><text x="34" y="${y + 4}" font-size="11" text-anchor="end" fill="#1F3A5C" font-family="Space Grotesk">${v}</text>`; }
  s += `<line x1="40" y1="${y0}" x2="40" y2="${y0 - max * k - 8}" stroke="#1F3A5C"/>`;
  donnees.forEach(([e, v], i) => { const x = 60 + i * 70, h = v * k;
    s += `<rect x="${x}" y="${y0 - h}" width="40" height="${h}" fill="${opts.coul || '#2EA8C9'}" fill-opacity=".8" stroke="#1F3A5C"/><text x="${x + 20}" y="${y0 + 16}" font-size="11.5" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${e}</text>`; });
  if(opts.titreAxe) s += `<text x="8" y="14" font-size="11" fill="#1F3A5C" font-family="Space Grotesk">${opts.titreAxe}</text>`;
  return s + '</svg>';
}
// Graphique (courbe) : points = [[x, y]], etiquettes des abscisses.
function courbe(points, labels, pas, max, titreAxe){
  const W = 70 + (points.length - 1) * 60 + 30, y0 = 170, k = 140 / max;
  let s = `<svg viewBox="0 0 ${W} 200" style="width:100%;max-width:${W + 40}px;display:block;margin:6px auto;">`;
  for(let v = 0; v <= max; v += pas){ const y = y0 - v * k; s += `<line x1="46" y1="${y}" x2="${W - 10}" y2="${y}" stroke="#1F3A5C" stroke-opacity="${v ? .15 : 1}"/><text x="40" y="${y + 4}" font-size="11" text-anchor="end" fill="#1F3A5C" font-family="Space Grotesk">${v}</text>`; }
  const X = i => 70 + i * 60;
  points.forEach((_, i) => { s += `<line x1="${X(i)}" y1="${y0}" x2="${X(i)}" y2="30" stroke="#1F3A5C" stroke-opacity=".12"/><text x="${X(i)}" y="${y0 + 16}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${labels[i]}</text>`; });
  s += `<polyline points="${points.map((v, i) => X(i) + ',' + (y0 - v * k)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="2.4"/>`;
  points.forEach((v, i) => { s += `<circle cx="${X(i)}" cy="${y0 - v * k}" r="4" fill="#E35D3A"/>`; });
  return s + `<text x="8" y="14" font-size="11" fill="#1F3A5C" font-family="Space Grotesk">${titreAxe}</text></svg>`;
}
const FRUITS = [['Pomme', 8], ['Banane', 5], ['Kiwi', 3], ['Fraise', 9], ['Orange', 4]];
cm1Chapitre({
  titre: 'Organisation et gestion de données', slug: 'donnees',
  cours: `
${cm1Lecon(1, 'Organiser des données dans un tableau')}
${cm1Def('Des <b>données</b> sont des informations (souvent des nombres) recueillies par exemple lors d\'une enquête. Pour les lire facilement, on les <b>range dans un tableau</b>.')}
${cm1Exemple('Enquête dans la classe : « Quel est ton fruit préféré ? »')}
${cm1Tableau(['Fruit', ...FRUITS.map(f => f[0]), 'Total'], [['Nombre d\'élèves', ...FRUITS.map(f => f[1]), '<b>29</b>']])}
${cm1Rem('Le <b>total</b> permet de vérifier : chaque élève a répondu une seule fois, et il y a 29 élèves dans la classe.')}

${cm1Lecon(2, 'Lire un tableau à double entrée')}
${cm1Regle('Dans un tableau à <b>double entrée</b>, on lit une information à l\'intersection d\'une <b>ligne</b> et d\'une <b>colonne</b>.')}
${cm1Tableau(['', 'Filles', 'Garçons', 'Total'], [['<b>Cantine</b>', '12', '9', '21'], ['<b>Maison</b>', '3', '5', '8'], ['<b>Total</b>', '15', '14', '<b>29</b>']], { coul: '#2EA8C9' })}
${cm1Exemple('Lecture :', ['Ligne « Cantine », colonne « Garçons » : <b>9</b> garçons mangent à la cantine.', 'Il y a 15 filles dans la classe (dernière ligne).', '21 élèves mangent à la cantine : 12 + 9 = 21.'])}

${cm1Lecon(3, 'Le diagramme en barres')}
${cm1Regle('Dans un <b>diagramme en barres</b>, la <b>hauteur</b> de chaque barre représente une quantité. On la lit sur l\'axe vertical gradué.')}
${ce2AnimDiagramme('cm1-do-diag', { donnees: FRUITS.map(([l, v], i) => [l, v, ['#E35D3A', '#E9C46A', '#2E9C6A', '#7A4FC0', '#2EA8C9'][i % 5]]), max: 10, pas: 2, titre: 'Nombre d\'élèves' })}
${cm1Exemple('Lecture :', ['La barre la plus haute est celle de la fraise : c\'est le fruit préféré (9 élèves).', 'La barre « Pomme » monte à 8 : 8 élèves préfèrent la pomme.', 'La barre « Kiwi » s\'arrête au milieu entre 2 et 4 : elle vaut 3.'])}
${cm1Astuce('Avant de lire un diagramme, on regarde <b>de combien en combien</b> est graduée l\'échelle (ici de 2 en 2).')}

${cm1Lecon(4, 'Le graphique (courbe)')}
${cm1Regle('Un <b>graphique</b> montre comment une quantité <b>évolue</b> (par exemple au fil du temps). Chaque point se lit avec deux informations : une sur l\'axe horizontal, une sur l\'axe vertical.')}
<div class="figure-wrap">${courbe([6, 9, 14, 17, 15, 11], ['8 h', '10 h', '12 h', '14 h', '16 h', '18 h'], 2, 20, 'Température (°C)')}</div>
${cm1Exemple('Lecture :', ['À 12 h, il faisait 14 °C.', 'La température la plus haute (17 °C) est atteinte à 14 h.', 'Entre 14 h et 18 h, la température baisse.'])}
`,
  methode: `
${cm1Demo('do-barre', 'Lire la valeur d\'une barre', 'Dans le diagramme des fruits, combien d\'élèves préfèrent la banane ?')}
${cm1Demo('do-tab', 'Compléter un tableau à double entrée', 'Dans une école, 48 élèves font du judo : 27 filles. Combien de garçons font du judo ?')}
`,
  demos: [
    ['do-barre', [
      { expr: 'Échelle : de 2 en 2', note: 'On regarde d\'abord comment est graduée l\'échelle verticale.' },
      { expr: 'Barre « Banane » : entre 4 et 6', note: 'On suit le haut de la barre jusqu\'à l\'axe vertical (on peut s\'aider d\'une règle).' },
      { expr: 'Au milieu entre 4 et 6 : 5', note: 'Le haut de la barre est à mi-chemin : la valeur est 5.' },
      { expr: '5 élèves préfèrent la banane.', note: 'Phrase réponse.' },
    ]],
    ['do-tab', [
      { expr: 'Total judo = 48 ; filles = 27', note: 'Dans la ligne « judo », on connaît le total et le nombre de filles.' },
      { expr: 'filles + garçons = total', note: 'Le total est la somme des filles et des garçons.' },
      { expr: '48 − 27 = 21', note: 'On cherche le nombre manquant par une soustraction.' },
      { expr: '21 garçons font du judo.', note: 'On vérifie : 27 + 21 = 48.' },
    ]],
  ],
  exos: cm1Exos('do', [
    [`Voici les points d'un jeu de fléchettes : 5 ; 3 ; 5 ; 1 ; 3 ; 5 ; 2 ; 5 ; 3. Range ces données dans un tableau (points et nombre de lancers).`,
      cm1Redac('Tableau des lancers', cm1Tableau(['Points', '1', '2', '3', '5', 'Total'], [['Nombre de lancers', '1', '1', '3', '4', '9']]), 'Il y a eu 9 lancers ; le score le plus fréquent est 5 points (4 lancers).')],
    ['Dans le tableau à double entrée du cours, combien de filles mangent à la maison ? Combien d\'élèves en tout mangent à la maison ?',
      cm1Redac('Filles qui mangent à la maison', 'Ligne « maison », colonne « filles » : 3', '3 filles mangent à la maison.') + cm1Redac('Élèves qui mangent à la maison', '3 + 5 = 8', '8 élèves mangent à la maison.')],
    [`Lis le diagramme :${barres([['Lun', 12], ['Mar', 18], ['Mer', 6], ['Jeu', 15], ['Ven', 20]], 5, 20, { titreAxe: 'Livres empruntés', coul: '#7A4FC0' })}Combien de livres ont été empruntés mardi ? Quel jour en a-t-on emprunté le moins ?`,
      cm1Redac('Livres empruntés mardi', 'La barre de mardi s\'arrête un peu avant 20 : à 18.', '18 livres ont été empruntés mardi.') + cm1Redac('Jour avec le moins d\'emprunts', 'La barre la plus courte est celle de mercredi : 6.', 'C\'est mercredi qu\'on a emprunté le moins de livres.')],
    ['Avec le même diagramme, combien de livres ont été empruntés dans la semaine ?',
      cm1Redac('Livres de la semaine', ['12 + 18 + 6 + 15 + 20', '71'], '71 livres ont été empruntés dans la semaine.')],
    ['Trace un diagramme en barres (1 carreau pour 1 élève) avec ces données : chat 7 ; chien 9 ; poisson 2 ; lapin 4.',
      cm1Redac('Construction', { suite: ['Je trace un axe vertical gradué de 1 en 1 jusqu\'à 10.', 'Je dessine 4 barres de même largeur, de hauteurs 7, 9, 2 et 4 carreaux.', 'J\'écris le nom de l\'animal sous chaque barre.'] }, 'La barre la plus haute est celle du chien : c\'est l\'animal préféré.')],
    ['Avec le graphique des températures, à quelle heure faisait-il 11 °C ? De combien de degrés la température a-t-elle monté entre 8 h et 14 h ?',
      cm1Redac('Heure à 11 °C', 'Je cherche 11 sur l\'axe vertical, puis le point de la courbe.', 'Il faisait 11 °C à 18 h.') + cm1Redac('Hausse de température', '17 − 6 = 11', 'La température a monté de 11 degrés entre 8 h et 14 h.')],
  ], { titre: 'Rédaction type : « Lire un graphique »', lignes: [['Je repère 12 h sur l\'axe horizontal.', 'Je monte jusqu\'au point de la courbe.'], ['Je lis 14 sur l\'axe vertical.', 'Je vais horizontalement jusqu\'à l\'axe.'], ['À 12 h, il faisait 14 °C.', 'Je réponds par une phrase.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Florence Nightingale et ses diagrammes', [
    'Les premiers diagrammes en barres ont été dessinés par l\'Écossais <b>William Playfair</b> en 1786, pour montrer le commerce de son pays. Avant lui, les données étaient seulement écrites dans de longs tableaux.',
    'En 1858, l\'infirmière anglaise <b>Florence Nightingale</b> dessine des diagrammes pour montrer que, dans les hôpitaux militaires, beaucoup plus de soldats mouraient de maladies que de blessures. Grâce à ses graphiques, faciles à comprendre, le gouvernement améliore l\'hygiène… et de nombreuses vies sont sauvées.',
  ]),
  quiz: [
    { q: 'Dans un diagramme en barres, que représente la hauteur d\'une barre ?', opts: ['la couleur', 'une quantité', 'un jour'], correct: 1 },
    { q: 'Dans le diagramme des fruits, combien d\'élèves préfèrent l\'orange ?', opts: ['3', '4', '5'], correct: 1 },
    { q: 'Un graphique (courbe) sert surtout à montrer…', opts: ['une évolution', 'une figure', 'une fraction'], correct: 0 },
  ],
});
})();

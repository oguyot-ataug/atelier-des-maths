/* ============================================================
   CHAPITRE : Tableaux et diagrammes en barres (CE2, D1, période 3)
   Programme du cycle 2 (CE2), organisation et gestion de données : caractères qualitatifs et
   quantitatifs discrets ; enquête, tableau, diagramme en barres avec une échelle adaptée sur
   l'axe vertical ; lire un tableau à double entrée (avec totaux) ou un diagramme ; résoudre des
   problèmes (« Combien d'élèves viennent à pied ? », barre manquante de Deltaville).
   ============================================================ */
(() => {
// Diagramme en barres : donnees = [[étiquette, valeur, couleur?]], max et pas de l'axe vertical.
function diagramme(donnees, max, pas, titre){
  const H = 180, X0 = 48, BW = 54, G = 30, W = X0 + donnees.length * (BW + G) + 10, Y = v => 20 + H - v / max * H;
  let s = '';
  for(let v = 0; v <= max; v += pas) s += `<line x1="${X0}" y1="${Y(v)}" x2="${W - 6}" y2="${Y(v)}" stroke="#D5DBE3" stroke-width="1"/><text x="${X0 - 6}" y="${Y(v) + 4}" font-size="12" text-anchor="end" fill="#5B6472">${v}</text>`;
  s += `<line x1="${X0}" y1="16" x2="${X0}" y2="${Y(0)}" stroke="#1F3A5C" stroke-width="2"/><line x1="${X0}" y1="${Y(0)}" x2="${W - 6}" y2="${Y(0)}" stroke="#1F3A5C" stroke-width="2"/>`;
  donnees.forEach(([lab, v, c], i) => {
    const x = X0 + G / 2 + i * (BW + G);
    if(v == null) s += `<rect x="${x}" y="${Y(max)}" width="${BW}" height="${H}" fill="none" stroke="#E35D3A" stroke-dasharray="5 4"/><text x="${x + BW / 2}" y="${Y(max / 2)}" font-size="20" text-anchor="middle" fill="#E35D3A" font-weight="700">?</text>`;
    else s += `<rect x="${x}" y="${Y(v)}" width="${BW}" height="${Y(0) - Y(v)}" fill="${c || '#2EA8C9'}" fill-opacity=".8" stroke="#1F3A5C"/><text x="${x + BW / 2}" y="${Y(v) - 5}" font-size="12" text-anchor="middle" fill="#1F3A5C" font-weight="700">${v}</text>`;
    s += `<text x="${x + BW / 2}" y="${Y(0) + 18}" font-size="12" text-anchor="middle" fill="#1F3A5C">${lab}</text>`;
  });
  if(titre) s += `<text x="${W / 2}" y="12" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${titre}</text>`;
  return `<svg viewBox="0 0 ${W} ${H + 50}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${s}</svg>`;
}
const TRANSPORT = [['À pied', 8, '#2E9C6A'], ['Vélo', 3, '#E9C46A'], ['Voiture', 10, '#E35D3A'], ['Bus', 5, '#2EA8C9']];
cm1Chapitre({
  niveau: 'ce2', titre: 'Tableaux et diagrammes en barres', slug: 'tableaux-diagrammes',
  cours: `
${cm1Lecon(1, 'Ranger des données dans un tableau')}
${cm1Regle('Après une <b>enquête</b> (par exemple : « Comment viens-tu à l\'école ? »), on compte les réponses et on les range dans un <b>tableau</b>. Chaque nombre est un <b>effectif</b> : le nombre de personnes qui ont donné cette réponse.')}
${cm1Tableau(['Moyen de transport', 'À pied', 'Vélo', 'Voiture', 'Bus'], [['Nombre d\'élèves', '8', '3', '10', '5']])}

${cm1Lecon(2, 'Le diagramme en barres')}
${cm1Regle('Dans un <b>diagramme en barres</b>, chaque réponse a sa barre. <b>Plus la barre est haute, plus l\'effectif est grand.</b> On lit la hauteur sur l\'<b>axe vertical</b>, qui est gradué avec une échelle régulière (ici de 2 en 2).')}
${ce2AnimDiagramme('ce2-dg-anim', { donnees: TRANSPORT, max: 12, pas: 2, titre: 'Comment viens-tu à l\'école ?', fin: 'La barre la plus haute est celle de la voiture : c\'est le moyen de transport le plus utilisé.' })}
${cm1Exemple('On lit :', ['Le moyen de transport le plus utilisé est la <b>voiture</b> : 10 élèves.', '3 élèves viennent à vélo.', 'En tout, il y a 8 + 3 + 10 + 5 = <b>26 élèves</b>.'])}
${cm1Astuce('Pour graduer l\'axe vertical, on choisit un <b>pas</b> adapté aux nombres : de 1 en 1 pour de petits effectifs, de 10 en 10 ou de 20 en 20 pour de grands effectifs.')}

${cm1Lecon(3, 'Le tableau à double entrée')}
${cm1Regle('Un <b>tableau à double entrée</b> range les données selon <b>deux critères</b> : un pour les lignes, un pour les colonnes. Les <b>totaux</b> s\'obtiennent en additionnant une ligne ou une colonne.')}
${cm1Tableau(['', 'Filles', 'Garçons', 'Total'], [['À pied', '65', '77', '<b>142</b>'], ['En vélo', '29', '18', '<b>47</b>'], ['En voiture', '0', '24', '<b>24</b>'], ['En bus', '28', '17', '<b>45</b>'], ['<b>Total</b>', '<b>122</b>', '<b>136</b>', '<b>258</b>']])}
${cm1Exemple('On lit :', ['77 garçons viennent à pied.', '142 élèves viennent à pied en tout.', 'Donc 142 − 77 = 65 filles viennent à pied.'])}
`,
  methode: `
${cm1Demo('ce2-dg-barre', 'Compléter un diagramme en barres', 'Les 175 élèves d\'une école habitent dans quatre villes. Alphaville : 78, Bêtaville : 13, Gammaville : 32. Trace la barre de Deltaville.')}
`,
  demos: [
    ['ce2-dg-barre', [
      { expr: diagramme([['Alpha', 78], ['Bêta', 13], ['Gamma', 32], ['Delta', null]], 100, 20, 'École Poséidon'), note: 'Il manque la barre de Deltaville.' },
      { expr: '78 + 13 + 32 = 123', note: 'Élèves des trois premières villes.' },
      { expr: '175 − 123 = 52', note: 'Le reste des élèves habite à Deltaville.' },
      { expr: diagramme([['Alpha', 78], ['Bêta', 13], ['Gamma', 32], ['Delta', 52, '#E35D3A']], 100, 20, 'École Poséidon'), note: 'On trace une barre un peu plus haute que 50.' },
    ]],
  ],
  exos: cm1Exos('ce2-dg', [
    ['D\'après le diagramme du cours, combien d\'élèves viennent en bus ?',
      cm1Redac('Élèves qui viennent en bus', 'La barre « Bus » monte jusqu\'à 5.', '5 élèves viennent en bus.')],
    ['D\'après le diagramme du cours, combien d\'élèves de plus viennent en voiture qu\'à pied ?',
      cm1Redac('Différence voiture et à pied', '10 − 8 = 2', '2 élèves de plus viennent en voiture.')],
    ['D\'après le tableau à double entrée du cours, combien de filles viennent en bus ?',
      cm1Redac('Filles qui viennent en bus', 'Ligne « En bus », colonne « Filles » : 28', '28 filles viennent en bus.')],
    ['Dans une classe, 6 élèves n\'ont pas de frère ni de sœur, 11 en ont 1, 7 en ont 2 et 3 en ont 3. Combien y a-t-il d\'élèves dans la classe ?',
      cm1Redac('Nombre d\'élèves', ['6 + 11 + 7 + 3', '27'], 'Il y a 27 élèves dans la classe.')],
    ['Pour faire le diagramme en barres de l\'exercice précédent (6, 11, 7 et 3), quel pas choisirais-tu pour graduer l\'axe vertical ?',
      cm1Redac('Choix du pas', 'Le plus grand effectif est 11.', 'Je gradue de 1 en 1 (ou de 2 en 2) jusqu\'à 12 : toutes les barres tiennent et on lit facilement leur hauteur.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le premier diagramme en barres', [
    'C\'est l\'Écossais <b>William Playfair</b> qui a dessiné l\'un des premiers diagrammes en barres, en <b>1786</b>, pour montrer le commerce de son pays avec les autres. Avant, les nombres étaient seulement écrits dans de longs tableaux.',
  ]),
  quiz: [
    { q: 'Dans un diagramme en barres, la barre la plus haute montre…', opts: ['le plus petit effectif', 'le plus grand effectif', 'le total'], correct: 1 },
    { q: 'Un tableau à double entrée range les données selon…', opts: ['un critère', 'deux critères', 'trois critères'], correct: 1 },
    { q: 'Total d\'une colonne : 12, 8 et 5. Le total est…', opts: ['20', '25', '30'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'À pied : 8 · Vélo : 3 · Voiture : 10 · Bus : 5. Quel transport est le plus utilisé ?', r: ['à pied', 'vélo', 'voiture', 'bus'], ok: 2 },
    { l: 2, q: 'Dans un diagramme en barres, la barre la plus courte montre…', r: ['le plus petit effectif', 'le plus grand effectif', 'le total', 'la moyenne'], ok: 0 },
    { l: 1, q: 'Le total des effectifs 8, 3, 10 et 5 est…', r: ['21', '26', '28', '31'], ok: 1 },
    { l: 2, q: 'Pour des effectifs entre 0 et 100, quel pas choisir sur l\'axe ?', r: ['1 en 1', '20 en 20', '100 en 100', '1 000 en 1 000'], ok: 1 },
    { l: 3, q: '142 élèves à pied, dont 77 garçons. Combien de filles ?', r: ['65', '75', '219', '55'], ok: 0 },
    { l: 1, q: 'Un effectif, c\'est…', r: ['une couleur', 'un nombre de personnes ou d\'objets', 'une barre', 'une ligne'], ok: 1 },
    { l: 3, q: "Un tableau à double entrée se lit avec…", r: ["une ligne et une colonne", "deux lignes", "un seul nombre", "une couleur"], ok: 0 },
    { l: 2, q: "Dans un diagramme en barres, deux barres de même hauteur montrent…", r: ["le même effectif", "des effectifs différents", "le total", "une erreur"], ok: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Tableaux et diagrammes (CE1, D1, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, organisation et gestion de
   données : recueillir et organiser des données, lire et compléter un tableau (y compris à double
   entrée simple), lire et construire un diagramme en barres gradué de 1 en 1 ou de 2 en 2, un
   diagramme en images (une image pour 2) ; répondre à des questions en comparant les données.
   Pensé pour être projeté : les barres qui montent une à une.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const SPORTS = [['foot', 8, '#2E9C6A'], ['danse', 6, '#C2185B'], ['judo', 4, '#2EA8C9'], ['natation', 10, '#7A4FC0']];
// Diagramme en images : une image (rond) pour 2 élèves ; un demi-rond pour 1.
function images(L){
  let s = ''; L.forEach(([l, v, c], i) => { s += ce2T(76, 26 + i * 30, l, { t: 13, a: 'end' });
    for(let j = 0; j < Math.floor(v / 2); j++) s += `<circle cx="${96 + j * 26}" cy="${21 + i * 30}" r="11" fill="${c}" stroke="${CPC.bord}"/>`;
    if(v % 2) { const x = 96 + Math.floor(v / 2) * 26; s += `<path d="M${x} ${10 + i * 30} A11 11 0 0 0 ${x} ${32 + i * 30} Z" fill="${c}" stroke="${CPC.bord}"/>`; } });
  return cpSvg(96 + 6 * 26, L.length * 30 + 8, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Tableaux et diagrammes', slug: 'tableaux-diagrammes',
  cours: `
${cm1Lecon(1, 'Lire un tableau')}
${cm1Tableau(['Sport préféré', 'Nombre d\'élèves'], SPORTS.map(([l, v]) => [l, String(v)]))}
${cm1Regle('Pour lire un tableau, on cherche la bonne ligne (le sport), puis on lit le nombre en face. Le judo a été choisi par <b>4</b> élèves.')}

${cm1Lecon(2, 'Le tableau à double entrée')}
${cm1Tableau(['', 'Filles', 'Garçons'], [['CE1 A', '12', '13'], ['CE1 B', '14', '11']])}
${cm1Regle('On lit à la croisée d\'une <b>ligne</b> et d\'une <b>colonne</b> : dans le CE1 B, il y a <b>14 filles</b>. Dans le CE1 A, il y a 12 + 13 = 25 élèves.', 'Ligne et colonne')}

${cm1Lecon(3, 'Le diagramme en barres')}
${ce2AnimDiagramme('ce1-d1-diag', { donnees: SPORTS, max: 10, pas: 2, titre: 'Nombre d\'élèves', fin: 'La barre la plus haute est celle de la <b>natation</b> (10 élèves).' })}
${cm1Regle('Ici, l\'axe est gradué de <b>2 en 2</b> : une barre qui s\'arrête entre 4 et 6 indique 5.')}

${cm1Lecon(4, 'Le diagramme en images')}
${cm1Def(`${lig(images(SPORTS))}${P('Une image entière vaut <b>2 élèves</b>, une demi-image vaut 1 élève. Le foot : 4 images, donc 8 élèves.')}`, 'Une image pour 2')}
${cm1Rem('Il faut toujours lire la légende : « 1 image = 2 élèves ». Sans elle, on se tromperait !')}
`,
  methode: `
${cm1Demo('ce1-d1-m-lire', 'Lire un diagramme gradué de 2 en 2', 'Combien d\'élèves ont choisi la danse ?')}
${cm1Demo('ce1-d1-m-comparer', 'Comparer deux données', 'Combien d\'élèves de plus ont choisi la natation que le judo ?')}
`,
  demos: [
    ['ce1-d1-m-lire', [
      { expr: 'Je trouve la barre de la danse.', note: 'Je lis les noms sous les barres.' },
      { expr: 'Je suis le haut de la barre jusqu\'à l\'axe.', note: 'Avec une règle bien horizontale.' },
      { expr: '6 élèves ont choisi la danse.', note: 'Le haut de la barre est en face du 6.' },
    ]],
    ['ce1-d1-m-comparer', [
      { expr: 'Natation : 10. Judo : 4.', note: 'Je lis les deux barres.' },
      { expr: '4 + 6 = 10', note: 'Je cherche l\'écart.' },
      { expr: '6 élèves de plus ont choisi la natation.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('ce1-d1', [
    ['D\'après le tableau des sports, combien d\'élèves ont choisi le foot ?',
      cm1Redac('Le foot', '', '8 élèves ont choisi le foot.')],
    ['D\'après le tableau à double entrée, combien de garçons y a-t-il dans le CE1 A ?',
      cm1Redac('Garçons du CE1 A', '', 'Il y a 13 garçons dans le CE1 A.')],
    ['Combien d\'élèves y a-t-il dans le CE1 B ?',
      cm1Redac('Élèves du CE1 B', '14 + 11 = 25', 'Il y a 25 élèves dans le CE1 B.')],
    ['Combien de filles y a-t-il dans les deux classes ?',
      cm1Redac('Les filles', '12 + 14 = 26', 'Il y a 26 filles en tout.')],
    ['Dans le diagramme en images (1 image = 2 élèves), le judo a 2 images. Combien d\'élèves ?',
      cm1Redac('Le judo', '2 × 2 = 4', '4 élèves ont choisi le judo.')],
    ['Combien d\'élèves ont choisi un sport en tout (tableau des sports) ?',
      cm1Redac('Total des élèves', { suite: ['8 + 6 = 14', '4 + 10 = 14', '14 + 14 = 28'] }, '28 élèves ont choisi un sport.')],
    ['Dessine un diagramme : pommes 4, poires 7, fraises 9 (graduation de 1 en 1).',
      cm1Redac('Le diagramme', '', 'Trois barres : pommes jusqu\'à 4, poires jusqu\'à 7, fraises jusqu\'à 9. La plus haute est celle des fraises.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Florence Nightingale', [
    'En 1858, une infirmière anglaise, <b>Florence Nightingale</b>, a dessiné des diagrammes pour montrer que beaucoup de soldats mouraient de maladies dans les hôpitaux, faute d\'hygiène.',
    'Grâce à ses diagrammes, les dirigeants ont compris tout de suite le problème, et les hôpitaux ont été améliorés : des milliers de vies ont été sauvées. Un bon diagramme peut convaincre mieux qu\'un long discours !',
  ]),
  quiz: [
    { q: 'Dans un diagramme gradué de 2 en 2, une barre qui s\'arrête au milieu, entre 6 et 8, indique…', opts: ['7', '6', '8'], correct: 0 },
    { q: '1 image = 2 élèves. 3 images = …', opts: ['6 élèves', '3 élèves', '5 élèves'], correct: 0 },
    { q: 'Dans un tableau à double entrée, on lit…', opts: ['à la croisée d\'une ligne et d\'une colonne', 'seulement la première ligne', 'au hasard'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Foot 8, danse 6 : le plus choisi ?', r: ['le foot', 'la danse', 'pareil', 'on ne sait pas'], ok: 0 },
    { l: 2, q: 'Filles 12, garçons 13 : la classe a…', r: ['25 élèves', '1 élève', '24 élèves', '1213 élèves'], ok: 0 },
    { l: 3, q: 'Une barre s\'arrête au 10 : …', r: ['10', '5', '20', '1'], ok: 0 },
    { l: 4, q: '1 image = 2. 5 images = …', r: ['10', '5', '7', '25'], ok: 0 },
  ],
});
})();

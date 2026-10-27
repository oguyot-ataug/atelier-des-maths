/* ============================================================
   CHAPITRE : Les nombres jusqu'à 10 (CP, N1, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : dénombrer une collection,
   reconnaître sans compter de petites quantités (constellations du dé, doigts), lire et écrire les
   nombres en chiffres, les dire et les reconnaître en lettres, la suite des nombres (le suivant, le
   précédent), comparer deux collections (plus, moins, autant).
   Pensé pour être projeté : l'enseignant montre, la classe regarde, compte et répond à l'oral.
   ============================================================ */
(() => {
// Deux rangées de billes reliées une à une : on voit qui en a le plus.
function rangees(a, b, noms, relier){
  const P = 34, W = 90 + Math.max(a, b) * P + 10;
  let s = cmT(70, 36, noms[0], { a: 'end', fs: 15 }) + cmT(70, 96, noms[1], { a: 'end', fs: 15 });
  for(let i = 0; i < a; i++) s += `<circle cx="${96 + i * P}" cy="31" r="12" fill="${CPC.jeton}" stroke="${CPC.bord}"/>`;
  for(let i = 0; i < b; i++) s += `<circle cx="${96 + i * P}" cy="91" r="12" fill="${CPC.jeton2}" stroke="${CPC.bord}"/>`;
  if(relier) for(let i = 0; i < Math.min(a, b); i++) s += `<line x1="${96 + i * P}" y1="44" x2="${96 + i * P}" y2="78" stroke="${CE2C.vert}" stroke-width="2.4"/>`;
  return cpSvg(W, 116, s);
}
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
cm1Chapitre({
  niveau: 'cp', titre: 'Les nombres jusqu\'à 10', slug: 'nombres-10',
  cours: `
${cm1Lecon(1, 'Voir d\'un coup d\'œil')}
${cm1Def(`Certaines quantités se voient <b>sans compter</b> : les points du dé, les doigts levés.${lig(cpDe(1, { c: 52 }), cpDe(2, { c: 52 }), cpDe(3, { c: 52 }), cpDe(4, { c: 52 }), cpDe(5, { c: 52 }), cpDe(6, { c: 52 }))}`, 'Je reconnais')}
${cpAnimFlash('cp-n1-flash', { n: 4, mode: 'de' })}
${cm1Regle(`Après 5, on voit <b>5 et encore…</b> : une main entière et encore des doigts.${lig(cpDoigts(7, { px: 150 }), cpDe(7, { cinq: true, c: 52 }))}<p style="text-align:center;margin:4px 0 0;">7, c'est <b>5 et encore 2</b>.</p>`)}
${cm1Rem('Au tableau : alterner les présentations (dé, doigts, boîte de dix, en vrac). En vrac, c\'est plus difficile : il faut compter.')}

${cm1Lecon(2, 'Compter une collection')}
${cpAnimCompter('cp-n1-compter', { n: 7 })}
${cm1Regle(`Pour compter sans se tromper :${cm1Liste(['je touche chaque objet <b>une seule fois</b> ;', 'je dis <b>un nombre</b> pour chaque objet : un, deux, trois… ;', 'le <b>dernier nombre</b> que je dis, c\'est le nombre d\'objets.'])}`)}
${cm1Astuce('Pour ne pas en oublier, on peut barrer chaque objet compté, ou le pousser de l\'autre côté.')}

${cm1Lecon(3, 'Écrire les nombres de 0 à 10')}
${cm1Def(`Chaque nombre s\'écrit avec des <b>chiffres</b> et se dit avec des <b>mots</b>.<div class="cpn-fiches">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(cpNombre).join('')}</div>`, 'Les nombres')}
${cm1Rem('<b>Zéro</b>, c\'est quand il n\'y a <b>rien</b>. <b>Dix</b> s\'écrit avec deux chiffres : un 1 et un 0. Quand la boîte de dix est pleine, on a <b>une dizaine</b>.')}
${cpAnimFlash('cp-n1-boite', { n: 8, mode: 'boite', legende: 'Dans la boîte de dix, on voit tout de suite « 5 et encore… ». Changez le nombre ou la présentation.' })}

${cm1Lecon(4, 'Le nombre d\'après, le nombre d\'avant')}
${cm1Def(`Les nombres se suivent toujours dans le même ordre. Le nombre <b>d'après</b>, c'est <b>un de plus</b> ; le nombre <b>d'avant</b>, c'est <b>un de moins</b>.`, 'La file des nombres')}
${ce2AnimSauts('cp-n1-suivant', { presets: [
  { nom: 'Un de plus', depart: 0, sauts: [[1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1'], [1, '+ 1']], min: 0, max: 10, fin: 'On avance de un en un : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.' },
  { nom: 'Après 6', depart: 6, sauts: [[1, '+ 1', 'Un de plus que 6 : on arrive à <b>7</b>. 7 vient juste après 6.']], min: 0, max: 10, fin: 'Le nombre d\'après 6, c\'est <b>7</b>.' },
  { nom: 'Avant 6', depart: 6, sauts: [[-1, '− 1', 'Un de moins que 6 : on arrive à <b>5</b>. 5 vient juste avant 6.']], min: 0, max: 10, fin: 'Le nombre d\'avant 6, c\'est <b>5</b>.' }] })}

${cm1Lecon(5, 'Plus, moins, autant')}
${cm1Regle(`Pour savoir qui en a le plus, on <b>relie</b> un objet de l'un à un objet de l'autre. Celui à qui il en reste en a <b>le plus</b>.${lig(rangees(4, 6, ['Léa', 'Tom'], true))}<p style="text-align:center;margin:4px 0 0;">Il reste 2 billes à Tom : Tom a <b>plus</b> de billes que Léa ; Léa en a <b>moins</b>.</p>`)}
${cm1Exemple('On peut aussi compter :', ['Léa a 4 billes, Tom en a 6.', '6 vient après 4 quand on compte : 6, c\'est plus que 4.', 'Si les deux en ont 5, ils en ont <b>autant</b>.'])}
`,
  methode: `
${cm1Demo('cp-n1-m-compter', 'Compter une collection sans se tromper', 'Combien y a-t-il de pommes ?')}
${cm1Demo('cp-n1-m-plus', 'Savoir qui en a le plus', 'Léa a ces billes, Tom a celles-ci. Qui en a le plus ?')}
`,
  demos: [
    ['cp-n1-m-compter', [
      { expr: 'Je regarde toutes les pommes.', note: 'Elles sont en vrac : on ne peut pas les voir d\'un coup d\'œil, il faut compter.', fig: cpPommes(6, { graine: 5, W: 260, H: 130 }) },
      { expr: 'Je commence par la pomme la plus à gauche.', note: 'On avance toujours dans le même sens, pour n\'en oublier aucune.' },
      { expr: 'Un, deux, trois, quatre, cinq, six.', note: 'Je touche chaque pomme <b>une seule fois</b> en disant un nombre.' },
      { expr: 'Le dernier nombre dit : 6.', note: 'Il y a <b>6 pommes</b>.' },
    ]],
    ['cp-n1-m-plus', [
      { expr: 'Je mets les billes de Léa et de Tom l\'une sous l\'autre.', note: 'Une rangée pour Léa, une rangée pour Tom.', fig: rangees(5, 3, ['Léa', 'Tom'], false) },
      { expr: 'Je relie une bille de Léa à une bille de Tom.', note: 'Chaque bille de Tom a une bille de Léa en face.', fig: rangees(5, 3, ['Léa', 'Tom'], true) },
      { expr: 'Il reste 2 billes à Léa.', note: 'Léa a <b>plus</b> de billes que Tom.' },
    ]],
  ],
  exos: cm1Exos('cp-n1', [
    [`Combien y a-t-il de pommes ?${lig(cpPommes(6, { graine: 21, W: 260, H: 130 }))}`,
      cm1Redac('Nombre de pommes', 'Je compte : un, deux, trois, quatre, cinq, six.', 'Il y a 6 pommes.')],
    [`Combien y a-t-il de points en tout ?${lig(cpDe(8, { cinq: true, c: 52 }))}`,
      cm1Redac('Nombre de points', '5 et encore 3, c\'est 8.', 'Il y a 8 points.')],
    [`Combien de doigts sont levés ?${lig(cpDoigts(7, { px: 150 }))}`,
      cm1Redac('Doigts levés', 'Une main, c\'est 5, et encore 2 : c\'est 7.', '7 doigts sont levés.')],
    ['Écris ces nombres en chiffres : quatre, neuf, six.',
      cm1Redac('En chiffres', { suite: ['quatre : 4', 'neuf : 9', 'six : 6'] }, 'Quatre s\'écrit 4, neuf s\'écrit 9, six s\'écrit 6.')],
    ['Quel nombre vient juste après 7 ? Et juste avant 7 ?',
      cm1Redac('Juste après 7', '7, puis 8', 'Le nombre qui vient juste après 7, c\'est 8.')
      + cm1Redac('Juste avant 7', '6, puis 7', 'Le nombre qui vient juste avant 7, c\'est 6.')],
    [`Combien y a-t-il de jetons dans la boîte ?${lig(cpBoiteDix(9, { c: 34 }))}`,
      cm1Redac('Nombre de jetons', 'Une rangée pleine, c\'est 5, et encore 4 : c\'est 9.', 'Il y a 9 jetons dans la boîte.', cpBoiteDix(9, { c: 22 }))],
    [`Léa a 4 billes, Tom a 6 billes. Qui a le plus de billes ?${lig(rangees(4, 6, ['Léa', 'Tom'], false))}`,
      cm1Redac('Qui en a le plus', 'Je relie une bille de Léa à une bille de Tom : il reste 2 billes à Tom.', 'Tom a le plus de billes.', rangees(4, 6, ['Léa', 'Tom'], true))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter avec des traits', [
    `<img src="img/histoire/le-baton-d-ishango.jpg" alt="Le bâton d'Ishango" style="max-width:240px;width:100%;display:block;margin:0 auto 6px;border-radius:8px;"><span class="hint" style="display:block;text-align:center;margin:0 0 10px;">Le bâton d'Ishango. Photo : Joeykentin, licence CC BY-SA 4.0 (Wikimedia Commons).</span>`,
    'Il y a très, très longtemps, bien avant l\'invention des chiffres, les hommes comptaient en faisant des <b>traits</b> sur un os ou sur un morceau de bois : un trait pour chaque animal, chaque jour…',
    'Ce vieil os, retrouvé en Afrique, au Congo, s\'appelle le <b>bâton d\'Ishango</b>. Il a plus de 20 000 ans et il est couvert de petits traits rangés en paquets. C\'est l\'un des plus anciens objets qui semblent servir à compter !',
  ]),
  quiz: [
    { q: `Combien de points ?${lig(cpDe(4, { c: 52 }))}`, opts: ['3', '4', '5'], correct: 1 },
    { q: `Combien de doigts sont levés ?${lig(cpDoigts(6, { px: 140 }))}`, opts: ['5', '6', '7'], correct: 1 },
    { q: 'Quel nombre vient juste après 8 ?', opts: ['7', '9', '10'], correct: 1 },
  ],
  flash: [
    { l: 1, q: `Combien de points ?${lig(cpDe(5, { c: 46 }))}`, r: ['4', '5', '6', '3'], ok: 1 },
    { l: 1, q: `Combien de points ?${lig(cpDe(9, { cinq: true, c: 46 }))}`, r: ['8', '9', '10', '7'], ok: 1 },
    { l: 1, q: `Combien de doigts ?${lig(cpDoigts(8, { px: 130 }))}`, r: ['7', '8', '9', '6'], ok: 1 },
    { l: 2, q: `Combien de pommes ?${lig(cpPommes(5, { graine: 9, W: 220, H: 110 }))}`, r: ['4', '5', '6', '7'], ok: 1 },
    { l: 3, q: 'Comment s\'écrit « sept » ?', r: ['6', '7', '8', '1'], ok: 1 },
    { l: 3, q: `Combien de jetons ?${lig(cpBoiteDix(10, { c: 26 }))}`, r: ['9', '10', '5', '8'], ok: 1 },
    { l: 4, q: 'Quel nombre vient juste avant 5 ?', r: ['3', '4', '6', '5'], ok: 1 },
    { l: 4, q: 'Quel nombre vient juste après 9 ?', r: ['8', '10', '11', '1'], ok: 1 },
    { l: 5, q: 'Léa a 3 bonbons, Tom en a 5. Qui en a le plus ?', r: ['Léa', 'Tom', 'Autant', 'Personne'], ok: 1 },
  ],
});
})();

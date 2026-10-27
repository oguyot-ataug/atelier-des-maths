/* ============================================================
   CHAPITRE : Problèmes : bilan de l'année (CP, N15, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : résoudre des problèmes de toutes
   les sortes rencontrées dans l'année (réunir, ajouter, retirer, chercher ce qui manque, comparer :
   « combien de plus, combien de moins », groupes égaux, partage, deux étapes) ; repérer la question
   et les informations utiles ; choisir et justifier le calcul ; répondre par une phrase.
   Pensé pour être projeté : les schémas en barres qui montrent « combien de plus ».
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Deux barres à comparer : la différence est en pointillés.
function compare(a, b, na, nb, u){
  u = u || 12; const W = Math.max(a, b) * u + 110;
  let s = ce2T(58, 30, na, { t: 13, a: 'end' }) + ce2T(58, 74, nb, { t: 13, a: 'end' });
  s += `<rect x="66" y="12" width="${a * u}" height="28" fill="#2EA8C9" fill-opacity=".5" stroke="${CPC.bord}"/>` + ce2T(66 + a * u / 2, 31, a, { t: 14, g: 700 });
  s += `<rect x="66" y="56" width="${b * u}" height="28" fill="#E35D3A" fill-opacity=".5" stroke="${CPC.bord}"/>` + ce2T(66 + b * u / 2, 75, b, { t: 14, g: 700 });
  const [p, g] = a < b ? [a, b] : [b, a], y = a < b ? 12 : 56;
  s += `<rect x="${66 + p * u}" y="${y}" width="${(g - p) * u}" height="28" fill="#fff" stroke="${CE2C.vert}" stroke-width="2" stroke-dasharray="5 4"/>` + ce2T(66 + (p + g) / 2 * u, y + 19, '?', { t: 15, g: 700, c: CE2C.vert });
  return cpSvg(W, 92, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Problèmes : bilan de l\'année', slug: 'problemes-bilan',
  cours: `
${cm1Lecon(1, 'Bien lire le problème')}
${cm1Regle(`${cm1Liste(['Je lis (ou j\'écoute) l\'histoire et je la <b>raconte</b> avec mes mots.', 'Je repère la <b>question</b> : qu\'est-ce que je cherche ?', 'Je cherche les <b>informations utiles</b> : toutes ne servent pas !', 'Je fais un <b>dessin</b> ou un <b>schéma</b>, je calcule, je réponds par une <b>phrase</b>.'])}`, 'Les étapes')}
${cm1Exemple('Une information inutile :', ['Léa a 7 ans. Elle a 12 billes et en gagne 5. Combien a-t-elle de billes ?', 'L\'âge de Léa ne sert à rien : 12 + 5 = 17. Léa a 17 billes.'])}

${cm1Lecon(2, 'Combien de plus ? Combien de moins ?')}
${ce2AnimBarres('cp-n15-compare', { unite: 12, legende: 'On met les deux barres l\'une sous l\'autre : la différence, c\'est le morceau qui dépasse.', lignes: [['Tom', [[14, '14 billes', '#2EA8C9', 'Tom a 14 billes…']]], ['Inès', [[14, '14', '#E35D3A', '… Inès en a autant que Tom…'], [6, '+ 6', '#E9C46A', '… et 6 de plus.']]]], total: '? billes', totalTexte: 'Inès a 14 + 6 = <b>20</b> billes.' })}
${cm1Def(`Tom a 9 images, Inès en a 15. Combien Inès en a-t-elle <b>de plus</b> que Tom ?${lig(compare(9, 15, 'Tom', 'Inès'))}${cm1Liste(['9 + 6 = 15', '15 − 9 = 6'])}${P('Inès a <b>6 images de plus</b> que Tom. Tom en a 6 de moins.')}`, 'Comparer')}
${cm1Astuce('« De plus » ne veut pas toujours dire « plus » ! Ici, on cherche l\'écart entre deux nombres : on peut avancer de 9 jusqu\'à 15.')}

${cm1Lecon(3, 'Ce qui manque')}
${cm1Def(`Malo a 12 €. Il veut acheter un jeu à 20 €. Combien lui manque-t-il ?${lig(cpSchema([[12, '12 €', '#2EA8C9'], [8, '?', '#fff']], '20 €', { u: 14 }))}${cm1Liste(['12 + 8 = 20'])}${P('Il manque <b>8 €</b> à Malo.')}`, 'Le complément')}

${cm1Lecon(4, 'Choisir le bon calcul')}
${cm1Tableau(['Dans l\'histoire…', 'Je calcule…'], [
  ['on met ensemble, on ajoute, on gagne', 'une addition : +'],
  ['on enlève, on perd, on mange, on donne', 'une soustraction : −'],
  ['il y a plusieurs paquets pareils', 'une addition répétée : 3 + 3 + 3'],
  ['on partage équitablement', 'je distribue, ou je cherche quel nombre répété fait le total'],
  ['on compare (de plus, de moins)', 'je cherche l\'écart : + ou −'],
])}
`,
  methode: `
${cm1Demo('cp-n15-m-plus', 'Problème « de plus que »', 'Paul a 23 cartes. Sami en a 8 de plus que Paul. Combien Sami a-t-il de cartes ?')}
${cm1Demo('cp-n15-m-ecart', 'Chercher un écart', 'La tour bleue a 18 cubes, la tour rouge en a 5. Combien la tour bleue a-t-elle de cubes de plus ?')}
`,
  demos: [
    ['cp-n15-m-plus', [
      { expr: 'Sami a autant que Paul, et encore 8.', note: 'Je dessine la barre de Paul, puis celle de Sami, plus longue.', fig: compare(23, 31, 'Paul', 'Sami', 6) },
      { expr: '23 + 8 = 31', note: 'J\'ajoute les 8 cartes de plus.' },
      { expr: 'Sami a 31 cartes.', note: 'La phrase réponse.' },
    ]],
    ['cp-n15-m-ecart', [
      { expr: 'Je cherche l\'écart entre 5 et 18.', note: 'Le morceau qui dépasse.', fig: compare(5, 18, 'rouge', 'bleue', 10) },
      { expr: '5 + 13 = 18', note: 'J\'avance de 5 à 18 : 5 jusqu\'à 10, puis 8 jusqu\'à 18.' },
      { expr: '18 − 5 = 13', note: 'Je vérifie par une soustraction.' },
      { expr: 'La tour bleue a 13 cubes de plus.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('cp-n15', [
    ['Dans la classe, il y a 13 filles et 12 garçons. Combien y a-t-il d\'élèves ?',
      cm1Redac('Élèves de la classe', '13 + 12 = 25', 'Il y a 25 élèves dans la classe.')],
    ['Maman achète 30 œufs. Elle en utilise 12 pour les crêpes. Combien lui en reste-t-il ?',
      cm1Redac('Œufs qui restent', { suite: ['30 − 10 = 20', '20 − 2 = 18'] }, 'Il reste 18 œufs à maman.')],
    ['Lou a 16 ans. Son frère a 5 ans de moins. Quel âge a son frère ?',
      cm1Redac('Âge du frère', '16 − 5 = 11', 'Le frère de Lou a 11 ans.')],
    ['Hugo a 25 billes. Nina en a 32. Combien Nina en a-t-elle de plus que Hugo ?',
      cm1Redac('Billes de plus', { suite: ['25 + 5 = 30', '30 + 2 = 32'] }, 'De 25 à 32, il y a 7 : Nina a 7 billes de plus que Hugo.', compare(25, 32, 'Hugo', 'Nina', 6))],
    ['Un album a 40 pages. Léo a déjà colorié 26 pages. Combien de pages lui reste-t-il à colorier ?',
      cm1Redac('Pages à colorier', { suite: ['26 + 4 = 30', '30 + 10 = 40'] }, 'De 26 à 40, il y a 14 : il reste 14 pages à colorier.')],
    ['Il y a 5 tables de 4 élèves dans la classe. Combien y a-t-il d\'élèves ?',
      cm1Redac('Élèves aux tables', '4 + 4 + 4 + 4 + 4 = 20', 'Il y a 20 élèves.')],
    ['Pour la fête, la maîtresse a 18 ballons. Elle en achète 10 de plus, puis 5 ballons éclatent. Combien de ballons reste-t-il ?',
      cm1Redac('Ballons qui restent', { suite: ['18 + 10 = 28', '28 − 5 = 23'] }, 'Il reste 23 ballons.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le problème du loup, de la chèvre et du chou', [
    'Il y a plus de 1 200 ans, un savant anglais, <b>Alcuin</b>, ami de l\'empereur Charlemagne, a écrit un livre de problèmes amusants pour les élèves.',
    'Le plus célèbre : un homme doit traverser une rivière avec un loup, une chèvre et un chou, mais sa barque ne peut porter qu\'un seul passager. Il ne doit jamais laisser seuls le loup avec la chèvre, ni la chèvre avec le chou. Comment fait-il ? Cherche avec des dessins !',
  ]),
  quiz: [
    { q: 'Tom a 10 billes, Léa en a 3 de plus. Léa en a…', opts: ['7', '13', '3'], correct: 1 },
    { q: 'J\'ai 15 €, je veux un livre à 20 €. Il me manque…', opts: ['5 €', '35 €', '15 €'], correct: 0 },
    { q: '3 paquets de 4 gâteaux, c\'est…', opts: ['7', '12', '34'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'Dans un problème, on commence par…', r: ['calculer au hasard', 'lire et comprendre la question', 'écrire la réponse', 'dessiner un chat'], ok: 1 },
    { l: 2, q: 'Ana a 8 ans, son frère 3 ans de plus. Il a…', r: ['11 ans', '5 ans', '83 ans', '8 ans'], ok: 0 },
    { l: 2, q: '9 et 14 : combien de plus pour 14 ?', r: ['5', '23', '4', '6'], ok: 0 },
    { l: 3, q: '17 + … = 20', r: ['3', '7', '37', '13'], ok: 0 },
    { l: 4, q: 'On perd des billes : on fait…', r: ['une addition', 'une soustraction', 'rien', 'un partage'], ok: 1 },
  ],
});
})();

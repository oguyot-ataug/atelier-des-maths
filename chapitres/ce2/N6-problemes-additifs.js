/* ============================================================
   CHAPITRE : Problèmes additifs (CE2, N6, période 3)
   Programme du cycle 2 (CE2) : problèmes additifs en une étape (parties-tout, transformation,
   comparaison « de plus / de moins ») avec des nombres plus grands que 1 000 ou des prix,
   et problèmes additifs en deux étapes (« Léo a 188 billes, Lucie en a 75 de plus… en tout ? »).
   Modélisation par schémas en barres ; déplacement sur un axe pour les transformations.
   ============================================================ */
(() => {
// Schéma en barres : lignes = [[étiquette, [[longueur, texte, couleur], …]]], accolade facultative sur le total.
function barres(lignes, total, unite){
  const U = unite || 1, X0 = 70, H = 30, G = 12;
  let s = '', y = 8, maxx = 0;
  lignes.forEach(([lab, parts]) => {
    let x = X0;
    s += `<text x="${X0 - 8}" y="${y + H / 2 + 5}" font-size="13" text-anchor="end" fill="#1F3A5C" font-weight="600">${lab}</text>`;
    parts.forEach(([l, t, c]) => { const w = l * U; s += `<rect x="${x}" y="${y}" width="${w}" height="${H}" fill="${c || '#2EA8C9'}" fill-opacity="${c === '#fff' ? 1 : .35}" stroke="#1F3A5C" stroke-width="1.5"/><text x="${x + w / 2}" y="${y + H / 2 + 5}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${t}</text>`; x += w; });
    maxx = Math.max(maxx, x); y += H + G;
  });
  if(total){ s += `<path d="M${X0} ${y} q0 10 10 10 H${(X0 + maxx) / 2 - 8} q8 0 8 8 q0 -8 8 -8 H${maxx - 10} q10 0 10 -10" fill="none" stroke="#E35D3A" stroke-width="1.8"/><text x="${(X0 + maxx) / 2}" y="${y + 36}" font-size="13" text-anchor="middle" fill="#E35D3A" font-weight="700">${total}</text>`; y += 42; }
  return `<svg viewBox="0 0 ${maxx + 12} ${y}" style="width:100%;max-width:${maxx + 12}px;display:block;margin:6px auto;">${s}</svg>`;
}
const J = '#E9C46A', V = '#2E9C6A', B = '#2EA8C9';
cm1Chapitre({
  niveau: 'ce2', titre: 'Problèmes additifs', slug: 'problemes-additifs',
  cours: `
${cm1Lecon(1, 'Chercher le tout ou une partie')}
${cm1Regle('Quand on connaît les <b>parties</b>, on trouve le <b>tout</b> par une <b>addition</b>. Quand on connaît le tout et une partie, on trouve l\'autre partie par une <b>soustraction</b>.')}
${cm1Exemple('Dans une école, il y a 1 245 élèves. 618 sont des filles. Combien y a-t-il de garçons ?')}
${ce2AnimBarres('ce2-pa-tout', { unite: 1, lignes: [['Élèves', [[180, '618 filles', J, 'Les filles : 618 élèves.'], [170, '? garçons', '#fff', 'Les garçons : c\'est ce qu\'on cherche.']]]], total: '1 245 élèves', totalTexte: 'Le tout : 1 245 élèves.', solution: { ligne: 0, part: 1, texte: '627 garçons', phrase: 'On cherche une partie : 1 245 − 618 = <b>627</b>. Il y a 627 garçons.' } })}

${cm1Lecon(2, 'Une transformation : ce qui change')}
${cm1Regle('Une quantité <b>augmente</b> ou <b>diminue</b>. On peut dessiner un <b>axe</b> : on part d\'un nombre, on avance (on gagne) ou on recule (on perd).')}
${cm1Exemple('Sarah avait 3 500 points. Elle en perd 750. Combien en a-t-elle maintenant ?')}
${ce2AnimSauts('ce2-pa-transfo', { presets: [
  { nom: 'Sarah perd 750 points', depart: 3500, sauts: [[-500, '− 500'], [-250, '− 250']], min: 2500, max: 3700, fin: 'Elle perd 750 points (500 puis 250) : 3 500 − 750 = <b>2 750</b>. Sarah a 2 750 points.' },
  { nom: 'Le car : − 15 puis + 9', depart: 48, sauts: [[-15, '− 15', '15 passagers descendent : il en reste 33.'], [9, '+ 9', '9 passagers montent : il y en a 42.']], min: 25, max: 55, fin: 'Il y a <b>42 passagers</b> dans le car.' }] })}

${cm1Lecon(3, 'Comparer : « de plus », « de moins »')}
${cm1Regle('« Lucie a 75 billes <b>de plus</b> que Léo » : Lucie a autant de billes que Léo, <b>et encore 75</b>. On dessine les deux barres l\'une sous l\'autre.')}
${ce2AnimBarres('ce2-pa-comp-anim', { lignes: [['Léo', [[190, '188 billes', B, 'Léo a 188 billes.']]], ['Lucie', [[190, '188', B, 'Lucie a autant de billes que Léo…'], [80, '75', J, '… et encore 75 : 75 billes de plus.']]]] })}
${cm1Astuce('« De plus » ne veut pas toujours dire « addition » ! Si « Léo a 75 billes de moins que Lucie, qui en a 263 », on calcule 263 − 75. Le schéma aide à choisir.')}

${cm1Lecon(4, 'Les problèmes en deux étapes')}
${cm1Regle('Certains problèmes demandent <b>deux calculs</b>. On cherche d\'abord ce qui manque, puis on répond à la question.')}
${ce2AnimBarres('ce2-pa-deux-anim', { lignes: [['Léo', [[190, '188', B, 'Léo a 188 billes.']]], ['Lucie', [[190, '188', B, 'Lucie en a 75 de plus.'], [80, '75', J, '1<sup>re</sup> étape : Lucie a 188 + 75 = 263 billes.']]]], total: '? billes en tout', totalTexte: '2<sup>e</sup> étape : en tout, 188 + 263 = <b>451 billes</b>.' })}
`,
  methode: `
${cm1Demo('ce2-pa-comp', 'Résoudre un problème de comparaison', 'Un vélo coûte 285 €. Une trottinette coûte 97 € de moins. Combien coûte la trottinette ?')}
${cm1Demo('ce2-pa-deux', 'Résoudre un problème en deux étapes', 'Un car part avec 48 passagers. Au premier arrêt, 15 descendent et 9 montent. Combien de passagers y a-t-il maintenant ?')}
`,
  demos: [
    ['ce2-pa-comp', [
      { expr: barres([['Vélo', [[200, '285 €', B]]], ['Trottinette', [[130, '?', J], [70, '97 €', '#fff']]]]), note: 'La trottinette coûte moins cher : sa barre est plus courte de 97 €.' },
      { expr: '285 − 97 = 188', note: 'Pour enlever 97, on peut enlever 100 puis ajouter 3.' },
      { expr: 'La trottinette coûte 188 €.', note: '' },
    ]],
    ['ce2-pa-deux', [
      { expr: '48 − 15 = 33', note: '1<sup>re</sup> étape : 15 passagers descendent.' },
      { expr: '33 + 9 = 42', note: '2<sup>e</sup> étape : 9 passagers montent.' },
      { expr: 'Il y a 42 passagers dans le car.', note: 'On vérifie que c\'est raisonnable : moins de passagers montent qu\'il n\'en descend.' },
    ]],
  ],
  exos: cm1Exos('ce2-pa', [
    ['Une bibliothèque a 2 350 livres pour enfants et 4 120 livres pour adultes. Combien de livres a-t-elle en tout ?',
      cm1Redac('Nombre de livres', ['2 350 + 4 120', '6 470'], 'La bibliothèque a 6 470 livres en tout.')],
    ['Un fermier a 1 200 poules. Il en vend 375. Combien lui en reste-t-il ?',
      cm1Redac('Poules restantes', { pose: cm1Posee([[' ', '1 200'], ['−', '375'], [' ', '825']]) }, 'Il reste 825 poules au fermier.')],
    ['Paul mesure 132 cm. Sa sœur mesure 18 cm de plus. Combien mesure sa sœur ?',
      cm1Redac('Taille de la sœur', '132 + 18 = 150', 'La sœur de Paul mesure 150 cm.')],
    ['Un jeu coûte 45,50 € et un livre 12,30 €. Combien coûtent-ils ensemble ?',
      cm1Redac('Prix total', { pose: cm1Posee([[' ', '45,50'], ['+', '12,30'], [' ', '57,80']]) }, 'Le jeu et le livre coûtent 57,80 € ensemble.')],
    ['Léa a 245 images. Tom en a 60 de moins. Combien d\'images ont-ils à eux deux ?',
      cm1Redac('Images de Tom', ['245 − 60', '185'], 'Tom a 185 images.')
      + cm1Redac('Images à eux deux', { nom: 'B', lignes: ['245 + 185', '430'] }, 'À eux deux, Léa et Tom ont 430 images.')],
    ['Au début de la journée, il y a 1 500 € dans la caisse. On paie 380 €, puis on reçoit 250 €. Combien y a-t-il maintenant dans la caisse ?',
      cm1Redac('Argent après le paiement', ['1 500 − 380', '1 120'], 'Après le paiement, il reste 1 120 €.')
      + cm1Redac('Argent à la fin', { nom: 'B', lignes: ['1 120 + 250', '1 370'] }, 'Il y a maintenant 1 370 € dans la caisse.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les schémas en barres', [
    'Les <b>schémas en barres</b> sont très utilisés à <b>Singapour</b>, un pays d\'Asie où les élèves sont très forts en problèmes. On les y appelle la « méthode du modèle ». Aujourd\'hui, on les utilise dans les classes du monde entier.',
  ]),
  quiz: [
    { q: 'Tom a 30 billes. Léa en a 12 de plus. Combien Léa a-t-elle de billes ?', opts: ['18', '42', '360'], correct: 1 },
    { q: 'Un livre coûte 15 €. Un jeu coûte 6 € de moins. Le jeu coûte…', opts: ['21 €', '9 €', '90 €'], correct: 1 },
    { q: 'Il y a 500 élèves, dont 260 filles. Combien de garçons ?', opts: ['240', '260', '760'], correct: 0 },
  ],
  flash: [
    { l: 2, q: 'Paul a 125 €. Il dépense 40 €. Combien lui reste-t-il ?', r: ['165 €', '85 €', '75 €', '95 €'], ok: 1 },
    { l: 3, q: 'Léa a 50 billes, Tom 20 de plus. Combien Tom a-t-il de billes ?', r: ['30', '60', '70', '100'], ok: 2 },
    { l: 1, q: 'Une classe de 28 élèves compte 15 filles. Combien de garçons ?', r: ['13', '15', '43', '17'], ok: 0 },
    { l: 3, q: 'Un pull coûte 30 €, un tee-shirt 12 € de moins. Le tee-shirt coûte…', r: ['42 €', '18 €', '12 €', '20 €'], ok: 1 },
    { l: 4, q: 'Le train part avec 300 voyageurs. 120 descendent, 50 montent. Combien sont dans le train ?', r: ['230', '130', '470', '180'], ok: 0 },
    { l: 4, q: 'Ana a 40 images, Bob 10 de plus. Combien en ont-ils ensemble ?', r: ['50', '80', '90', '100'], ok: 2 },
    { l: 1, q: "Dans un bus : 12 adultes et 25 enfants. Combien de passagers ?", r: ["37", "13", "27", "47"], ok: 0 },
    { l: 2, q: "Tom avait 15 billes ; il en gagne 8. Il en a maintenant…", r: ["23", "7", "15", "32"], ok: 0 },
  ],
});
})();

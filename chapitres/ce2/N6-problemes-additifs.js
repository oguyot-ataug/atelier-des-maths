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
${barres([['Élèves', [[180, '618 filles', J], [170, '? garçons', '#fff']]]], '1 245 élèves')}
<p class="hint" style="text-align:center;">On cherche une partie : 1 245 − 618 = <b>627 garçons</b>.</p>

${cm1Lecon(2, 'Une transformation : ce qui change')}
${cm1Regle('Une quantité <b>augmente</b> ou <b>diminue</b>. On peut dessiner un <b>axe</b> : on part d\'un nombre, on avance (on gagne) ou on recule (on perd).')}
${cm1Exemple('Sarah avait 3 500 points. Elle en perd 750. Combien en a-t-elle maintenant ?', ['Elle perd : on recule de 750 sur l\'axe.', '3 500 − 750 = <b>2 750 points</b>.'])}

${cm1Lecon(3, 'Comparer : « de plus », « de moins »')}
${cm1Regle('« Lucie a 75 billes <b>de plus</b> que Léo » : Lucie a autant de billes que Léo, <b>et encore 75</b>. On dessine les deux barres l\'une sous l\'autre.')}
${barres([['Léo', [[190, '188 billes', B]]], ['Lucie', [[190, '188', B], [80, '75', J]]]])}
${cm1Astuce('« De plus » ne veut pas toujours dire « addition » ! Si « Léo a 75 billes de moins que Lucie, qui en a 263 », on calcule 263 − 75. Le schéma aide à choisir.')}

${cm1Lecon(4, 'Les problèmes en deux étapes')}
${cm1Regle('Certains problèmes demandent <b>deux calculs</b>. On cherche d\'abord ce qui manque, puis on répond à la question.')}
${barres([['Léo', [[190, '188', B]]], ['Lucie', [[190, '188', B], [80, '75', J]]]], '? billes en tout', 1)}
<p class="hint" style="text-align:center;">1<sup>re</sup> étape : Lucie a 188 + 75 = 263 billes. 2<sup>e</sup> étape : en tout, 188 + 263 = <b>451 billes</b>.</p>
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
      { expr: '1<sup>re</sup> étape : 48 − 15 = 33', note: 'Après la descente de 15 passagers.' },
      { expr: '2<sup>e</sup> étape : 33 + 9 = 42', note: 'Puis 9 passagers montent.' },
      { expr: 'Il y a 42 passagers dans le car.', note: 'On vérifie que c\'est raisonnable : 48 − 6 = 42 ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-pa', [
    ['Une bibliothèque a 2 350 livres pour enfants et 4 120 livres pour adultes. Combien de livres en tout ?', '2 350 + 4 120 = 6 470 livres.'],
    ['Un fermier a 1 200 poules. Il en vend 375. Combien lui en reste-t-il ?', '1 200 − 375 = 825 poules.'],
    ['Paul mesure 132 cm. Sa sœur mesure 18 cm de plus. Combien mesure sa sœur ?', '132 + 18 = 150 cm.'],
    ['Un jeu coûte 45,50 €, un livre 12,30 €. Combien coûtent-ils ensemble ?', '57,80 €.'],
    ['Léa a 245 images. Tom en a 60 de moins. Combien d\'images ont-ils à eux deux ?', 'Tom : 245 − 60 = 185. En tout : 245 + 185 = 430 images.'],
    ['Au départ, il y a 1 500 € dans la caisse. On paie 380 € puis on reçoit 250 €. Combien y a-t-il maintenant ?', '1 500 − 380 = 1 120 ; 1 120 + 250 = 1 370 €.'],
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
    { q: 'Paul a 125 €. Il dépense 40 €. Combien lui reste-t-il ?', r: ['165 €', '85 €', '75 €', '95 €'], ok: 1 },
    { q: 'Léa a 50 billes, Tom 20 de plus. Combien Tom a-t-il de billes ?', r: ['30', '60', '70', '100'], ok: 2 },
    { q: 'Une classe de 28 élèves compte 15 filles. Combien de garçons ?', r: ['13', '15', '43', '17'], ok: 0 },
    { q: 'Un pull coûte 30 €, un tee-shirt 12 € de moins. Le tee-shirt coûte…', r: ['42 €', '18 €', '12 €', '20 €'], ok: 1 },
    { q: 'Le train part avec 300 voyageurs. 120 descendent, 50 montent. Combien sont dans le train ?', r: ['230', '130', '470', '180'], ok: 0 },
    { q: 'Ana a 40 images, Bob 10 de plus. Combien en ont-ils ensemble ?', r: ['50', '80', '90', '100'], ok: 2 },
  ],
});
})();

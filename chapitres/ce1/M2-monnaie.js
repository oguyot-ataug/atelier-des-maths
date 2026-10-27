/* ============================================================
   CHAPITRE : La monnaie : euros et centimes (CE1, M2, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, grandeurs et mesures : connaître
   les pièces et les billets (de 1 centime à 50 euros), 1 € = 100 c, écrire un prix en euros et
   centimes sans virgule (3 € 50 c), constituer une somme de plusieurs façons, comparer des sommes,
   calculer un prix total et ce qu'il reste ; rendre la monnaie sur de petites sommes.
   Pensé pour être projeté : l'argent posé dans la coupelle et compté à mesure.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Pièces de centimes : cuivre (1, 2, 5 c), or (10, 20, 50 c).
const cent = (v, x, y) => { const r = { 1: 13, 2: 15, 5: 17, 10: 16, 20: 18, 50: 20 }[v], c = v < 10 ? '#C9824B' : '#E2C36B';
  return `<circle cx="${x + r}" cy="${y + 22}" r="${r}" fill="${c}" stroke="#7A4A20" stroke-width="1.2"/>` + ce2T(x + r, y + 26, v + ' c', { t: 10, g: 700, c: '#3B2B05' }); };
// Une somme : liste de [valeur, 'e' | 'c'].
function argent(L, px){
  let x = 3, s = '';
  L.forEach(([v, u]) => { if(u === 'c'){ const r = { 1: 13, 2: 15, 5: 17, 10: 16, 20: 18, 50: 20 }[v]; s += cent(v, x, 2); x += 2 * r + 6; }
    else { s += cpArgentSvg(x, v <= 2 ? 6 : 3, v); x += cpArgentL(v) + 6; } });
  return cpSvg(x, 54, s, px);
}
const prix = (objet, p) => `<span class="cpn-prix"><b>${objet}</b> ${p}</span>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'La monnaie : euros et centimes', slug: 'monnaie',
  cours: `
${cm1Lecon(1, 'Pièces et billets')}
${cm1Def(`${lig(argent([[1, 'c'], [2, 'c'], [5, 'c'], [10, 'c'], [20, 'c'], [50, 'c']]))}${P('Les pièces en <b>centimes</b> (c).')}${lig(argent([[1, 'e'], [2, 'e'], [5, 'e'], [10, 'e']]), argent([[20, 'e'], [50, 'e']]))}${P('Les pièces et les billets en <b>euros</b> (€).')}`, 'La monnaie')}
${cm1Regle('<b>1 € = 100 c</b> : un euro, c\'est cent centimes. Deux pièces de 50 c valent 1 €.', 'À savoir')}

${cm1Lecon(2, 'Écrire une somme')}
${cm1Def(`${lig(argent([[2, 'e'], [1, 'e'], [50, 'c'], [20, 'c']]))}${P('2 € + 1 € = 3 € et 50 c + 20 c = 70 c : on écrit <b>3 € 70 c</b>.')}`, 'Euros et centimes')}
${cm1Rem('On compte d\'abord les euros, puis les centimes. Au CE2, on écrira aussi 3,70 € avec une virgule.')}

${cm1Lecon(3, 'Payer une somme')}
${cpAnimPayer('ce1-m2-payer', { presets: [
  { nom: 'Un livre à 17 €', objet: 'Un livre', prix: 17, paye: [10, 5, 2] },
  { nom: 'Un jeu à 36 €', objet: 'Un jeu', prix: 36, paye: [20, 10, 5, 1] },
  { nom: 'Le même jeu autrement', objet: 'Un jeu', prix: 36, paye: [10, 10, 10, 2, 2, 2], fin: 'On peut aussi payer 36 € avec 10 + 10 + 10 + 2 + 2 + 2.' }] })}
${cm1Regle('Pour payer, on commence par le plus gros billet qui ne dépasse pas le prix, puis on complète.')}

${cm1Lecon(4, 'Rendre la monnaie')}
${cm1Regle(`Un livre coûte 7 €. Je paie avec un billet de 10 €. Le marchand compte en avançant : « 7… 8, 9, 10 ».${cm1Liste(['7 + 3 = 10'])}${P('Il me rend <b>3 €</b>.')}`, 'Compter en avançant')}
`,
  methode: `
${cm1Demo('ce1-m2-m-compter', 'Compter une somme', 'Combien y a-t-il dans le porte-monnaie ?')}
${cm1Demo('ce1-m2-m-rendre', 'Rendre la monnaie', 'Une glace coûte 4 €. Je paie avec 5 €. Combien me rend-on ?')}
`,
  demos: [
    ['ce1-m2-m-compter', [
      { expr: 'Je sépare les euros et les centimes.', note: 'Les billets et les grosses pièces d\'un côté, les centimes de l\'autre.', fig: argent([[10, 'e'], [2, 'e'], [50, 'c'], [10, 'c'], [5, 'c']], 330) },
      { expr: '10 + 2 = 12', note: '12 €.' },
      { expr: '50 + 10 + 5 = 65', note: '65 c.' },
      { expr: '12 € 65 c', note: 'Il y a 12 euros et 65 centimes.' },
    ]],
    ['ce1-m2-m-rendre', [
      { expr: '4 + 1 = 5', note: 'J\'avance de 4 € jusqu\'à 5 €.' },
      { expr: 'On me rend 1 €.', note: 'Je vérifie : 5 − 4 = 1.' },
    ]],
  ],
  exos: cm1Exos('ce1-m2', [
    [`Combien d'argent ?${lig(argent([[20, 'e'], [5, 'e'], [2, 'e']]))}`,
      cm1Redac('L\'argent', '20 + 5 + 2 = 27', 'Il y a 27 €.')],
    [`Combien d'argent ?${lig(argent([[1, 'e'], [50, 'c'], [20, 'c'], [2, 'c']]))}`,
      cm1Redac('L\'argent', '50 + 20 + 2 = 72', 'Une pièce de 1 € et 72 centimes : il y a 1 € 72 c.')],
    ['Combien de pièces de 10 c faut-il pour faire 1 € ?',
      cm1Redac('Pièces de 10 c', '10 × 10 = 100', 'Il faut 10 pièces de 10 c : 100 c = 1 €.')],
    ['Trouve deux façons de payer 15 € avec des billets et des pièces.',
      cm1Redac('Payer 15 €', { suite: ['10 + 5 = 15', '5 + 5 + 2 + 2 + 1 = 15'] }, 'Par exemple : un billet de 10 € et un de 5 € ; ou deux billets de 5 €, deux pièces de 2 € et une pièce de 1 €.')],
    [`Combien coûtent le cahier et la règle ensemble ?${lig(prix('Un cahier', '3 €'), prix('Une règle', '2 €'))}`,
      cm1Redac('Prix total', '3 + 2 = 5', 'Ensemble, ils coûtent 5 €.')],
    ['Hugo a 20 €. Il achète un livre à 14 €. Combien lui reste-t-il ?',
      cm1Redac('Argent de Hugo', { suite: ['14 + 6 = 20', '20 − 14 = 6'] }, 'Il reste 6 € à Hugo.')],
    ['Qui a le plus d\'argent : Zoé a 3 billets de 5 €, Lucas a 1 billet de 10 € et 3 pièces de 2 € ?',
      cm1Redac('Qui a le plus', { suite: ['Zoé : 5 + 5 + 5 = 15', 'Lucas : 10 + 2 + 2 + 2 = 16'] }, 'Lucas a 16 € et Zoé 15 € : c\'est Lucas qui a le plus d\'argent.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les pièces de l\'euro', [
    'Les pièces en euros ont une face commune à tous les pays et une face différente selon le pays. Sur les pièces françaises de 1 € et 2 €, on voit un arbre ; sur les centimes, Marianne ou la Semeuse.',
    'Une pièce de 2 € française frappée en 2002 peut très bien se retrouver dans un porte-monnaie en Italie ou en Espagne : elle y vaut exactement la même chose !',
  ]),
  quiz: [
    { q: '1 € = …', opts: ['10 c', '100 c', '1 000 c'], correct: 1 },
    { q: `Combien ?${lig(argent([[10, 'e'], [5, 'e'], [1, 'e']], 220))}`, opts: ['16 €', '15 €', '1 051 €'], correct: 0 },
    { q: 'Je paie 8 € avec un billet de 10 €. On me rend…', opts: ['2 €', '18 €', '8 €'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Deux pièces de 50 c, c\'est…', r: ['1 €', '100 €', '50 c', '2 €'], ok: 0 },
    { l: 2, q: '2 € et 30 c s\'écrit…', r: ['2 € 30 c', '230 €', '32 €', '2 € 3 c'], ok: 0 },
    { l: 3, q: '20 + 10 + 5 = … €', r: ['35', '30', '25', '2105'], ok: 0 },
    { l: 3, q: 'Pour payer 12 € : billet de 10 € et…', r: ['une pièce de 2 €', 'un billet de 5 €', 'une pièce de 1 €', 'rien'], ok: 0 },
    { l: 4, q: 'Prix 6 €, je donne 10 €. On me rend…', r: ['4 €', '16 €', '6 €', '3 €'], ok: 0 },
  ],
});
})();

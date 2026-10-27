/* ============================================================
   CM2 · Planches : Résolution de problèmes (N10)
   Comparaison multiplicative (fois plus, fois moins) ; parties-tout ; problèmes à étapes ;
   dénombrer ; optimiser. Schémas en barres pour modéliser.
   ============================================================ */
(() => {
const R = v => plRep(String(v));
const { rmp, ch, chx } = P3;
const DS = PL_DESSINS, illu = plIllu;
// Schéma en barres : une ligne par personne, nb parts égales de largeur u.
const barres = (lignes, total) => { const u = 26, x0 = 46; let g = '', y = 8;
  lignes.forEach(([nom, nb, coul]) => { g += DS.tx([x0 - 6, y + 13], nom, { a: 'end' });
    for(let i = 0; i < nb; i++) g += `<rect x="${x0 + i * u}" y="${y}" width="${u}" height="18" fill="${coul}" stroke="#1F3A5C" stroke-width="1.2"/>`;
    y += 26; });
  const w = Math.max(...lignes.map(l => l[1])) * u;
  if(total) g += `<path d="M${x0 + w + 6},8 h5 v${y - 14} h-5" fill="none" stroke="#1F3A5C" stroke-width="1.2"/>` + DS.tx([x0 + w + 32, (y + 2) / 2 + 4], total);
  return DS.fig(x0 + w + 62, y, g, 190); };
const zoe = barres([['Max', 1, '#CDEAF6'], ['Zoé', 3, '#FDE3C8']], '48 €');
// Allumettes : n carrés alignés.
const allum = n => { let g = ''; const c = 22, x0 = 6, y0 = 6, b = (a, z) => DS.ln(a, z, '#A0622D', 2.6);
  for(let i = 0; i <= n; i++) g += b([x0 + i * c, y0], [x0 + i * c, y0 + c]);
  for(let i = 0; i < n; i++) g += b([x0 + i * c, y0], [x0 + (i + 1) * c, y0]) + b([x0 + i * c, y0 + c], [x0 + (i + 1) * c, y0 + c]);
  return g; };
const motifs = DS.fig(250, 40, allum(1) + `<g transform="translate(50,0)">${allum(2)}</g>` + `<g transform="translate(122,0)">${allum(3)}</g>`, 230);
PLANCHES['cm2|Résolution de problèmes'] = [
  { titre: 'Fois plus, fois moins, parties et tout', duree: '35 min',
    attendus: ['Résoudre un problème de comparaison multiplicative', 'Utiliser un schéma en barres', 'Trouver une partie connaissant le tout'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Tom a 12 billes ; Lisa en a 3 fois plus. Lisa a @ billes.', 36], ['Un vélo coûte 240 € ; une trottinette coûte 4 fois moins. Elle coûte @ €.', 60], ['Paul a 45 ans ; son fils a 5 fois moins. Le fils a @ ans.', 9]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon calcul.',
        ...chx([['Un pull coûte 3 fois plus qu\'un tee-shirt à 8 €. Prix du pull :', '8 × 3', '8 + 3 · 8 × 3 · 8 : 3'], ['Un chien pèse 6 fois moins que son maître (72 kg). Masse du chien :', '72 : 6', '72 − 6 · 72 × 6 · 72 : 6']]) },
      { etoiles: 2, cahier: true, consigne: illu(zoe, 'Zoé a 3 fois plus d\'argent que Max. Ensemble, ils ont 48 €. Combien chacun a-t-il ? Aide-toi du schéma.'),
        corr: cm1Redac('Nombre de parts', '1 + 3 = 4', 'Le total est partagé en 4 parts égales.') + cm1Redac('Une part', '48 : 4 = 12', 'Max a 12 €.') + cm1Redac('Argent de Zoé', '12 × 3 = 36', 'Zoé a 36 €.') },
      { etoiles: 3, cahier: true, consigne: 'Dans une classe de 28 élèves, il y a 3 fois plus de filles que de garçons. Combien y a-t-il de garçons ? de filles ?',
        corr: cm1Redac('Une part', { suite: ['1 + 3 = 4', '28 : 4 = 7'] }, 'Il y a 7 garçons.') + cm1Redac('Nombre de filles', '7 × 3 = 21', 'Il y a 21 filles.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['3 fois plus que 45 : @', 135], ['4 fois moins que 60 : @', 15], ['le triple de 2,5 : @', '7,5']], 2) },
      { etoiles: 3, col: 1, consigne: '28 élèves, 3 fois plus de filles que de garçons. Complète.', ...P3.rmp([['28 ÷ 4 = @ garçons', 7], ['3 × 7 = @ filles', 21]], 2) },
    ] },
  { titre: 'Problèmes à étapes', duree: '35 min',
    attendus: ['Organiser la résolution d\'un problème en plusieurs étapes', 'Trouver les questions intermédiaires', 'Rédiger une solution complète'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'Une bibliothèque reçoit 12 cartons de 25 livres. On en a déjà rangé 180. Combien reste-t-il de livres à ranger ?',
        corr: cm1Redac('Nombre de livres reçus', '12 × 25 = 300', 'La bibliothèque a reçu 300 livres.') + cm1Redac('Livres à ranger', '300 − 180 = 120', 'Il reste 120 livres à ranger.') },
      { etoiles: 2, cahier: true, consigne: 'Au cinéma, une place adulte coûte 9,50 € et une place enfant 6 €. Une famille achète 3 places adultes et 2 places enfants. Elle paie avec un billet de 50 €. Combien lui rend-on ?',
        corr: cm1Redac('Places adultes', '9,50 × 3 = 28,50', 'Les places adultes coûtent 28,50 €.') + cm1Redac('Places enfants', '6 × 2 = 12', 'Les places enfants coûtent 12 €.') + cm1Redac('Total', '28,50 + 12 = 40,50', 'La famille dépense 40,50 €.') + cm1Redac('Monnaie rendue', '50 − 40,50 = 9,50', 'On lui rend 9,50 €.') },
      { etoiles: 3, cahier: true, consigne: 'Un fermier vend ses œufs par boîtes de 6. Ses poules pondent 85 œufs par jour. Combien de boîtes remplit-il en une semaine ?',
        corr: cm1Redac('Œufs en une semaine', '85 × 7 = 595', 'Les poules pondent 595 œufs en une semaine.') + cm1Redac('Nombre de boîtes', '595 = 6 × 99 + 1', 'Il remplit 99 boîtes (il reste 1 œuf).') },
      { etoiles: 1, col: 1, consigne: 'Calcule les étapes du problème des livres.', ...P3.rmp([['12 × 25 = @', 300], ['300 − 180 = @', 120]], 2) },
      { etoiles: 2, col: 1, consigne: 'Calcule les étapes du problème du cinéma.', ...P3.rmp([['3 × 9,50 = @', '28,50'], ['2 × 6 = @', 12], ['28,50 + 12 = @', '40,50'], ['50 − 40,50 = @', '9,50']], 3) },
      { etoiles: 3, col: 1, consigne: 'Calcule les étapes du problème des œufs.', ...P3.rmp([['85 × 7 = @', 595], ['595 = 6 × @ + @', 99, 1]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quelle question se poser d\'abord pour les livres ? Entoure.', ...P3.chx([['', 'Combien de livres en tout ?', 'Combien de livres en tout ? · Combien de cartons ?']]) },
    ] },
  { titre: 'Dénombrer et optimiser', duree: '35 min',
    attendus: ['Dénombrer toutes les possibilités de façon organisée', 'Comparer plusieurs solutions pour choisir la meilleure', 'Repérer une régularité'],
    exos: [
      { etoiles: 1, cahier: true, consigne: 'À la cantine, on choisit une entrée parmi 3 et un plat parmi 4. Combien de menus différents peut-on composer ?',
        corr: cm1Redac('Nombre de menus', '3 × 4 = 12', 'Pour chaque entrée, il y a 4 plats possibles : on peut composer 12 menus.') },
      { etoiles: 2, cahier: true, consigne: 'Un cadenas a un code de 3 chiffres. On utilise une seule fois chacun des chiffres 1, 2 et 3. Écris tous les codes possibles.',
        corr: cm1Redac('Codes possibles', { suite: ['123 ; 132', '213 ; 231', '312 ; 321'] }, 'Il y a 6 codes possibles.') },
      { etoiles: 2, cahier: true, consigne: 'Une boîte de 6 œufs coûte 2 € et une boîte de 12 œufs coûte 3,50 €. On veut exactement 30 œufs. Quelle est la façon la moins chère ?',
        corr: cm1Redac('Comparaison des prix', { suite: ['Cinq boîtes de 6 : 2 × 5 = 10 €', 'Une boîte de 12 et trois de 6 : 3,50 + 6 = 9,50 €', 'Deux boîtes de 12 et une de 6 : 7 + 2 = 9 €'] }, 'La façon la moins chère : deux boîtes de 12 et une boîte de 6, pour 9 €.') },
      { etoiles: 3, cahier: true, consigne: illu(motifs, 'Avec des allumettes, on forme des carrés alignés. Combien faut-il d\'allumettes pour 10 carrés ?'),
        corr: cm1Redac('Régularité', { suite: ['1 carré : 4 allumettes', '2 carrés : 7 allumettes', '3 carrés : 10 allumettes'] }, 'Chaque nouveau carré demande 3 allumettes de plus.') + cm1Redac('Pour 10 carrés', '4 + 3 × 9 = 31', 'Il faut 31 allumettes.') },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['3 entrées et 4 plats : @ menus', 12], ['avec un dessert parmi 3 en plus : @ menus', 36]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['codes de 3 chiffres avec 1, 2 et 3 : @ codes', 6], ['30 œufs avec 2 boîtes de 12 et 1 boîte de 6 : @ €', 9]], 2) },
    ] },
];
})();

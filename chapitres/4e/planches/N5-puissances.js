/* ============================================================
   4e · Planches : Puissances (N5)
   Puissances d'un nombre relatif ; puissances de 10 et préfixes ; calculer avec des puissances de 10 ;
   écriture scientifique et problèmes (grandes et petites grandeurs).
   ============================================================ */
(() => {
const { R, rmp, ch, chx } = P3;
const p = (a, n) => `${a}<sup>${n}</sup>`;
const DS = PL_DESSINS, illu = plIllu;
// Terre et Soleil (distance en écriture scientifique).
const terreSoleil = DS.fig(180, 80, `<circle cx="30" cy="40" r="26" fill="#F6C343" stroke="#E9A21C" stroke-width="2"/><circle cx="160" cy="40" r="7" fill="#2EA8C9" stroke="#1F3A5C" stroke-width="1.2"/><path d="M156,38 q4,-4 8,0" stroke="#2E9C6A" stroke-width="2" fill="none"/>`
  + DS.cote([30, 40], [160, 40], '150 000 000 km', 14, { dt: 6, fs: 10 }) + DS.tx([30, 78], 'Soleil', { fs: 9 }) + DS.tx([160, 62], 'Terre', { fs: 9 }), 160);
PLANCHES['4e|Puissances'] = [
  { titre: 'Puissances d\'un nombre relatif', duree: '30 min',
    attendus: ['Écrire un produit de facteurs égaux sous forme de puissance', 'Calculer une puissance', 'Ne pas confondre (−3)² et −3²'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'une puissance.',
        ...rmp([['7 × 7 × 7 = @', p(7, 3)], ['(−4) × (−4) = @', p('(−4)', 2)], ['2,5 × 2,5 × 2,5 × 2,5 = @', p('2,5', 4)], ['a × a × a × a × a = @', p('a', 5)]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`${p(3, 4)} = @`, 81], [`${p(2, 5)} = @`, 32], [`${p('(−2)', 3)} = @`, '−8'], [`${p('0,1', 2)} = @`, '0,01'], [`${p(5, 1)} = @`, 5]]) },
      { etoiles: 2, col: 1, consigne: 'Attention au signe ! Calcule.',
        ...rmp([[`${p('(−3)', 2)} = @`, 9], [`−${p(3, 2)} = @`, '−9'], [`${p('(−1)', 7)} = @`, '−1'], [`${p('(−1)', 10)} = @`, 1]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule en respectant les priorités.',
        ...rmp([[`A = 2 × ${p(3, 2)} = @`, 18], [`B = ${p('(2 × 3)', 2)} = @`, 36], [`C = 5 + ${p(2, 3)} = @`, 13], [`D = ${p(10, 2)} − ${p(4, 2)} = @`, 84]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${p(2, 3)} = 6`, 'faux'], [`${p('(−5)', 2)} = 25`, 'vrai'], [`${p(3, 2)} + ${p(4, 2)} = ${p(7, 2)}`, 'faux'], ['Une puissance paire d\'un nombre négatif est positive.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: `Une bactérie se divise en deux toutes les heures. On part d'une seule bactérie. Combien y en a-t-il au bout de 10 heures ? Écris le résultat sous forme de puissance, puis calcule-le.`,
        corr: cm1Redac('Nombre de bactéries', { suite: ['Chaque heure, le nombre est multiplié par 2.', `Au bout de 10 heures : ${p(2, 10)}`, `${p(2, 10)} = 1 024`] }, 'Au bout de 10 heures, il y a 1 024 bactéries.') },
    ] },
  { titre: 'Puissances de 10 et préfixes', duree: '30 min',
    attendus: ['Écrire une puissance de 10 en écriture décimale', 'Utiliser les exposants négatifs', 'Connaître les préfixes des unités'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en écriture décimale.',
        ...rmp([[`${p(10, 4)} = @`, '10 000'], [`${p(10, 0)} = @`, 1], [`${p(10, '−2')} = @`, '0,01'], [`${p(10, '−5')} = @`, '0,000 01']]) },
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'une puissance de 10.',
        ...rmp([['1 000 000 = @', p(10, 6)], ['0,001 = @', p(10, '−3')], ['10 = @', p(10, 1)], ['0,000 000 1 = @', p(10, '−7')]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la puissance de 10 qui correspond au préfixe.',
        ...chx([['kilo (k) :', p(10, 3), `${p(10, 3)} · ${p(10, 6)} · ${p(10, '−3')}`], ['milli (m) :', p(10, '−3'), `${p(10, 3)} · ${p(10, '−3')} · ${p(10, '−6')}`], ['méga (M) :', p(10, 6), `${p(10, 3)} · ${p(10, 6)} · ${p(10, 9)}`], ['micro (µ) :', p(10, '−6'), `${p(10, '−3')} · ${p(10, '−6')} · ${p(10, '−9')}`], ['nano (n) :', p(10, '−9'), `${p(10, '−6')} · ${p(10, '−9')} · ${p(10, 9)}`]]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['5 km = 5 × @ m', p(10, 3)], ['3 mg = 3 × @ g', p(10, '−3')], ['2 Go = 2 × @ octets', p(10, 9)], ['7 µm = 7 × @ m', p(10, '−6')]]) },
      { etoiles: 2, cahier: true, consigne: 'Un disque dur contient 2 To (téraoctets, 1 To = 10<sup>12</sup> octets). Une photo occupe 4 Mo. Combien de photos peut-on y ranger ?',
        corr: cm1Redac('Nombre de photos', { suite: [`2 To = 2 × ${p(10, 12)} octets et 4 Mo = 4 × ${p(10, 6)} octets`, `(2 × ${p(10, 12)}) : (4 × ${p(10, 6)}) = 0,5 × ${p(10, 6)}`, '0,5 × 1 000 000 = 500 000'] }, 'On peut y ranger 500 000 photos.') },
    ] },
  { titre: 'Calculer avec des puissances de 10', duree: '35 min',
    attendus: ['Multiplier et diviser des puissances de 10', 'Multiplier un nombre par une puissance de 10', 'Calculer une expression avec des puissances de 10'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'une seule puissance de 10.',
        ...rmp([[`${p(10, 3)} × ${p(10, 5)} = @`, p(10, 8)], [`${p(10, 7)} : ${p(10, 4)} = @`, p(10, 3)], [`${p(10, '−2')} × ${p(10, 6)} = @`, p(10, 4)], [`${p(10, 5)} : ${p(10, '−3')} = @`, p(10, 8)]]) },
      { etoiles: 2, col: 1, consigne: 'Écris sous la forme d\'une seule puissance de 10.',
        ...rmp([[`${p(10, 4)} × ${p(10, '−4')} = @`, p(10, 0)], [`${p(10, '−3')} : ${p(10, 2)} = @`, p(10, '−5')], [`${p(`(${p(10, 2)})`, 3)} = @`, p(10, 6)], [`${p(10, 6)} × ${p(10, '−1')} : ${p(10, 2)} = @`, p(10, 3)]]) },
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([[`3,7 × ${p(10, 3)} = @`, '3 700'], [`52 × ${p(10, '−2')} = @`, '0,52'], [`0,04 × ${p(10, 5)} = @`, '4 000'], [`125 × ${p(10, '−4')} = @`, '0,012 5']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le bon résultat.',
        ...chx([[`(4 × ${p(10, 3)}) × (2 × ${p(10, 5)}) =`, `8 × ${p(10, 8)}`, `8 × ${p(10, 8)} · 8 × ${p(10, 15)} · 6 × ${p(10, 8)}`], [`(9 × ${p(10, 6)}) : (3 × ${p(10, 2)}) =`, `3 × ${p(10, 4)}`, `3 × ${p(10, 3)} · 3 × ${p(10, 4)} · 6 × ${p(10, 4)}`]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([[`${p(10, 2)} + ${p(10, 3)} = ${p(10, 5)}`, 'faux'], [`${p(10, 2)} × ${p(10, 3)} = ${p(10, 5)}`, 'vrai'], [`${p(10, '−2')} est un nombre négatif.`, 'faux']], 'vrai · faux') },
      { etoiles: 3, cahier: true, consigne: `Calcule A = ${p(10, 5)} × 3 × ${p(10, '−2')} : (6 × ${p(10, 2)}). Donne le résultat en écriture décimale.`,
        corr: cm1Redac('Calcul', { suite: [`A = (3 : 6) × ${p(10, 5)} × ${p(10, '−2')} : ${p(10, 2)}`, `A = 0,5 × ${p(10, 1)}`, 'A = 5'] }, 'A est égal à 5.') },
    ] },
  { titre: 'L\'écriture scientifique', duree: '40 min',
    attendus: ['Donner l\'écriture scientifique d\'un nombre', 'Comparer des nombres en écriture scientifique', 'Utiliser l\'écriture scientifique dans un problème'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne l\'écriture scientifique.',
        ...rmp([['45 000 = @', `4,5 × ${p(10, 4)}`], ['0,003 2 = @', `3,2 × ${p(10, '−3')}`], ['678,9 = @', `6,789 × ${p(10, 2)}`], ['0,5 = @', `5 × ${p(10, '−1')}`]], 5) },
      { etoiles: 2, col: 1, consigne: 'Ce nombre est-il écrit en écriture scientifique ? Entoure.',
        ...ch([[`3,5 × ${p(10, 7)}`, 'oui'], [`35 × ${p(10, 6)}`, 'non'], [`0,8 × ${p(10, '−2')}`, 'non'], [`1 × ${p(10, 9)}`, 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Écris en écriture décimale.',
        ...rmp([[`2,4 × ${p(10, 5)} = @`, '240 000'], [`7,1 × ${p(10, '−3')} = @`, '0,007 1'], [`9 × ${p(10, 2)} = @`, 900]]) },
      { etoiles: 2, col: 1, consigne: 'Range du plus petit au plus grand.',
        ...rmp([[`${'5 × ' + p(10, '−2')} ; ${'3 × ' + p(10, 1)} ; ${'8 × ' + p(10, '−3')} ; ${'1,2 × ' + p(10, 1)} : @`, `8 × ${p(10, '−3')} &lt; 5 × ${p(10, '−2')} &lt; 1,2 × ${p(10, 1)} &lt; 3 × ${p(10, 1)}`]], 14) },
      { etoiles: 2, cahier: true, consigne: illu(terreSoleil, 'La distance entre la Terre et le Soleil est d\'environ 150 000 000 km. La lumière parcourt 3 × 10<sup>5</sup> km par seconde. Écris la distance en écriture scientifique, puis calcule le temps mis par la lumière du Soleil pour nous parvenir.'),
        corr: cm1Redac('Écriture scientifique', '150 000 000 = 1,5 × 10<sup>8</sup>', 'La distance est de 1,5 × 10<sup>8</sup> km.') + cm1Redac('Durée du trajet', { suite: [`(1,5 × ${p(10, 8)}) : (3 × ${p(10, 5)}) = 0,5 × ${p(10, 3)}`, '0,5 × 1 000 = 500 s', '500 s = 8 min 20 s'] }, 'La lumière du Soleil met environ 8 minutes et 20 secondes pour nous parvenir.') },
      { etoiles: 3, cahier: true, consigne: 'Un virus mesure environ 0,000 000 1 m. Combien de virus faudrait-il aligner pour atteindre 1 cm ? Utilise l\'écriture scientifique.',
        corr: cm1Redac('Nombre de virus', { suite: [`0,000 000 1 m = ${p(10, '−7')} m et 1 cm = ${p(10, '−2')} m`, `${p(10, '−2')} : ${p(10, '−7')} = ${p(10, 5)}`] }, 'Il faudrait aligner 10<sup>5</sup>, soit 100 000 virus.') },
    ] },
];
})();

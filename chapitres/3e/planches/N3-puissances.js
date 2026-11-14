/* ============================================================
   3e · Planches : Puissances (N3)
   Puissances d'un nombre relatif ; puissances de 10 et préfixes ; écriture scientifique ; problèmes
   (astronomie, informatique, biologie) ; Objectif Brevet.
   Réponses à l'écran : les exposants se complètent dans une case en exposant (10<sup>…</sup>).
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs } = P3;
const cmp = '&lt; · = · &gt;';
PLANCHES['3e|Puissances'] = [
  { titre: 'Puissances d\'un nombre relatif', duree: '35 min',
    attendus: ['Calculer une puissance d\'exposant entier positif', 'Trouver le signe d\'une puissance', 'Respecter les priorités avec les puissances'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp(plDeux([['2⁵ = @', 32], ['(−3)² = @', 9], ['(−2)³ = @', '−8'], ['−4² = @', '−16'], ['10³ = @', '1 000'], ['7¹ = @', 7], ['3⁴ = @', 81], ['(−1)⁵ = @', '−1'], ['(−5)² = @', 25], ['−2⁴ = @', '−16'], ['10⁵ = @', '100 000'], ['0,1² = @', '0,01']])) },
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme d\'une puissance.',
        ...rmp([['7 × 7 × 7 × 7 = 7<sup>@</sup>', 4], ['(−5) × (−5) × (−5) = (−5)<sup>@</sup>', 3], ['a × a × a = a<sup>@</sup>', 3], ['8 = 2<sup>@</sup>', 3], ['81 = 3<sup>@</sup>', 4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Sans calculer, entoure le signe.',
        ...ch([['(−1)⁷ :', 'négatif'], ['(−2)⁴ :', 'positif'], ['−2⁴ :', 'négatif'], ['(−5)³ :', 'négatif']], 'positif · négatif') },
      { etoiles: 2, col: 1, consigne: 'Calcule.',
        ...rmp([['3² + 2³ = @', 17], ['(−1)¹⁰⁰ + (−1)⁹⁹ = @', 0], ['2 × 5² = @', 50], ['(2 × 5)² = @', 100], ['4³ − 4² = @', 48]]) },
      { etoiles: 2, col: 1, consigne: 'Compare : entoure &lt;, = ou &gt;.',
        ...ch([['2⁵ … 5²', '&gt;'], ['3⁴ … 9²', '='], ['(−2)³ … (−3)²', '&lt;'], ['10² … 2¹⁰', '&lt;']], cmp) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une feuille de papier a une épaisseur de 0,1 mm. On la plie en deux, 10 fois de suite. Quelle épaisseur obtient-on ?',
        corr: cm1Redac('Épaisseur après 10 pliages', { suite: ['0,1 × 2¹⁰', '2¹⁰ = 1 024', '0,1 × 1 024 = 102,4'] }, 'À chaque pliage, l\'épaisseur double : on obtient 102,4 mm, soit environ 10 cm.') },
      { etoiles: 3, cahier: true, consigne: 'Une bactérie se divise en deux toutes les 20 minutes. Combien de bactéries obtient-on au bout de 4 heures, en partant d\'une seule ?',
        corr: cm1Redac('Nombre de divisions', { suite: ['4 h = 240 min', '240 : 20 = 12'] }, 'Les bactéries se divisent 12 fois.') + cm1Redac('Nombre de bactéries', '2¹² = 4 096', 'On obtient 4 096 bactéries.') },
    ] },
  { titre: 'Les puissances de 10', duree: '35 min',
    attendus: ['Passer de 10ⁿ à l\'écriture décimale et inversement', 'Calculer avec les puissances de 10', 'Connaître les préfixes (kilo, méga, giga, milli, micro, nano)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris en écriture décimale.',
        ...rmp(plDeux([['10⁴ = @', '10 000'], ['10⁻² = @', '0,01'], ['10⁰ = @', 1], ['10⁻⁴ = @', '0,000 1'], ['10¹ = @', 10], ['10⁶ = @', '1 000 000'], ['10⁻¹ = @', '0,1'], ['10⁻³ = @', '0,001'], ['10² = @', 100], ['10⁻⁵ = @', '0,000 01']])) },
      { etoiles: 1, col: 1, consigne: 'Écris sous la forme 10ⁿ.',
        ...rmp(plDeux([['1 000 000 = 10<sup>@</sup>', 6], ['0,001 = 10<sup>@</sup>', '−3'], ['Un milliard = 10<sup>@</sup>', 9], ['0,1 = 10<sup>@</sup>', '−1'], ['10 000 = 10<sup>@</sup>', 4], ['0,000 01 = 10<sup>@</sup>', '−5'], ['100 = 10<sup>@</sup>', 2], ['1 = 10<sup>@</sup>', 0]]), 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp(plDeux([['10³ × 10⁵ = 10<sup>@</sup>', 8], ['10⁷ : 10² = 10<sup>@</sup>', 5], ['(10³)² = 10<sup>@</sup>', 6], ['10⁻² × 10⁵ = 10<sup>@</sup>', 3], ['10⁴ : 10⁻³ = 10<sup>@</sup>', 7], ['10² × 10⁴ = 10<sup>@</sup>', 6], ['10⁹ : 10³ = 10<sup>@</sup>', 6], ['(10²)⁵ = 10<sup>@</sup>', 10], ['10⁻⁴ × 10⁶ = 10<sup>@</sup>', 2], ['10³ : 10⁻² = 10<sup>@</sup>', 5]]), 2) },
      { etoiles: 2, col: 1, consigne: 'Écris en écriture décimale.',
        ...rmp([['3,7 × 10³ = @', '3 700'], ['45 × 10⁻² = @', '0,45'], ['0,08 × 10⁴ = @', 800], ['512 × 10⁻³ = @', '0,512']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne valeur.',
        ...chx([['1 kilooctet (ko) =', '10³ octets', '10² octets · 10³ octets · 10⁶ octets'], ['1 mégawatt (MW) =', '10⁶ W', '10³ W · 10⁶ W · 10⁹ W'], ['1 gigaoctet (Go) =', '10⁹ octets', '10⁶ octets · 10⁹ octets · 10¹² octets'], ['1 micromètre (µm) =', '10⁻⁶ m', '10⁻³ m · 10⁻⁶ m · 10⁻⁹ m'], ['1 nanomètre (nm) =', '10⁻⁹ m', '10⁻⁶ m · 10⁻⁹ m · 10⁻¹² m']]) },
      { etoiles: 2, col: 1, consigne: 'Complète par = ou ≠.',
        ...P3.egal(plDeux([['10⁵ + 10⁵', '10¹⁰', 0], ['10³ × 10³', '10⁶', 1], ['10⁻³', '0,001', 1], ['10 + 10²', '110', 1], ['10² × 10⁵', '10⁷', 1], ['10⁴ − 10³', '10¹', 0], ['10⁻²', '0,01', 1], ['10³ : 10³', '0', 0]])) },
      { etoiles: 3, cahier: true, consigne: 'Un disque dur a une capacité de 2 To (1 To = 10¹² octets). Une photo occupe 4 Mo (1 Mo = 10⁶ octets). Combien de photos peut-on y stocker ?',
        corr: cm1Redac('Nombre de photos', { nom: 'N', lignes: ['2 × 10¹² : (4 × 10⁶)', '0,5 × 10⁶', '500 000'] }, 'On peut stocker 500 000 photos.') },
    ] },
  { titre: 'L\'écriture scientifique', duree: '35 min',
    attendus: ['Reconnaître une écriture scientifique', 'Donner l\'écriture scientifique d\'un nombre ou d\'un calcul', 'Comparer des nombres en écriture scientifique'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Est-ce une écriture scientifique ? Entoure.',
        ...ch([['3,5 × 10⁴ :', 'oui'], ['35 × 10³ :', 'non'], ['0,7 × 10⁻² :', 'non'], ['9,99 × 10⁻⁵ :', 'oui'], ['1 × 10⁸ :', 'oui']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Donne l\'écriture scientifique.',
        ...rmp([['45 000 = @ × 10<sup>@</sup>', '4,5', 4], ['0,003 2 = @ × 10<sup>@</sup>', '3,2', '−3'], ['708 = @ × 10<sup>@</sup>', '7,08', 2], ['0,000 05 = @ × 10<sup>@</sup>', 5, '−5']], 3) },
      { etoiles: 2, col: 1, consigne: 'Donne l\'écriture scientifique.',
        ...rmp([['52 × 10³ = @ × 10<sup>@</sup>', '5,2', 4], ['0,48 × 10⁻² = @ × 10<sup>@</sup>', '4,8', '−3'], ['1 230 × 10⁻⁵ = @ × 10<sup>@</sup>', '1,23', '−2'], ['0,06 × 10⁷ = @ × 10<sup>@</sup>', 6, 5]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat en écriture scientifique.',
        ...rmp([['(2 × 10³) × (4 × 10⁵) = @ × 10<sup>@</sup>', 8, 8], ['(3 × 10⁴) × (5 × 10²) = @ × 10<sup>@</sup>', '1,5', 7], ['(6 × 10⁸) : (2 × 10³) = @ × 10<sup>@</sup>', 3, 5], ['(9 × 10⁻²) × (2 × 10⁶) = @ × 10<sup>@</sup>', '1,8', 5]], 3) },
      { etoiles: 2, col: 1, consigne: 'Voici quatre nombres : 3,2 × 10⁻² ; 5 × 10⁻³ ; 1,1 × 10⁻² ; 4 × 10⁻⁴. Entoure.',
        ...chx([['Le plus petit :', '4 × 10⁻⁴', '3,2 × 10⁻² · 5 × 10⁻³ · 1,1 × 10⁻² · 4 × 10⁻⁴'], ['Le plus grand :', '3,2 × 10⁻²', '3,2 × 10⁻² · 5 × 10⁻³ · 1,1 × 10⁻² · 4 × 10⁻⁴']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'ordre de grandeur correct.',
        ...chx([['Masse de la Terre :', '6 × 10²⁴ kg', '6 × 10⁶ kg · 6 × 10¹² kg · 6 × 10²⁴ kg'], ['Diamètre d\'un globule rouge :', '7 × 10⁻⁶ m', '7 × 10⁻² m · 7 × 10⁻⁶ m · 7 × 10⁻¹² m'], ['Population mondiale en 2025 :', '8 × 10⁹', '8 × 10⁶ · 8 × 10⁹ · 8 × 10¹²']]) },
      { etoiles: 3, cahier: true, consigne: 'La lumière parcourt 3 × 10⁵ km par seconde. Le Soleil est à 1,5 × 10⁸ km de la Terre. Combien de temps sa lumière met-elle pour nous parvenir ?',
        corr: cm1Redac('Durée du trajet de la lumière du Soleil', { suite: ['1,5 × 10⁸ : (3 × 10⁵) = 0,5 × 10³ = 500', '500 s = 8 × 60 s + 20 s'] }, 'La lumière du Soleil met 500 s, soit 8 min 20 s, pour nous parvenir.') },
    ] },
  { titre: 'Problèmes avec des puissances', duree: '40 min',
    attendus: ['Utiliser les puissances de 10 dans des situations concrètes', 'Convertir avec les préfixes', 'Donner un ordre de grandeur en écriture scientifique'],
    exos: [
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une année-lumière est la distance parcourue par la lumière (3 × 10⁵ km/s) en une année de 365 jours. Calcule-la en km, en écriture scientifique.',
        corr: cm1Redac('Nombre de secondes dans une année', '365 × 24 × 3 600 = 31 536 000', '') + cm1Redac('Distance d\'une année-lumière', '3 × 10⁵ × 31 536 000 = 9 460 800 000 000', 'Une année-lumière mesure environ 9,46 × 10¹² km.') },
      { etoiles: 2, col: 1, consigne: 'Complète les exposants.',
        ...rmp([['5 µm = 5 × 10<sup>@</sup> m', '−6'], ['3 Go = 3 × 10<sup>@</sup> octets', 9], ['2,5 km = 2,5 × 10<sup>@</sup> m', 3], ['40 ns = 4 × 10<sup>@</sup> s', '−8']], 2) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le cœur bat en moyenne 70 fois par minute. Combien de battements en 80 ans (années de 365 jours) ? Donne l\'ordre de grandeur en écriture scientifique.',
        corr: cm1Redac('Nombre de battements en 80 ans', '70 × 60 × 24 × 365 × 80 = 2 943 360 000', 'Le cœur bat environ 2,9 × 10⁹ fois en 80 ans (près de 3 milliards).') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un virus mesure 100 nm. Un cheveu a un diamètre de 0,08 mm. Combien de fois le cheveu est-il plus épais que le virus ?',
        corr: cm1Redac('Nombre de fois que le cheveu est plus épais', { suite: ['100 nm = 10² × 10⁻⁹ m = 10⁻⁷ m', '0,08 mm = 8 × 10⁻⁵ m', '8 × 10⁻⁵ : 10⁻⁷ = 8 × 10² = 800'] }, 'Le cheveu est 800 fois plus épais que le virus.') },
      { etoiles: 2, col: 1, consigne: 'Complète par = ou ≠.',
        ...P3.egal(plDeux([['2³ × 2⁴', '2⁷', 1], ['2³ + 2³', '2⁴', 1], ['3² × 3²', '9⁴', 0], ['(−1)²⁰²⁶', '1', 1], ['5² × 5³', '5⁵', 1], ['2⁵ − 2⁴', '2⁴', 1], ['4² + 4²', '4⁴', 0], ['(−2)⁴', '16', 1]])) },
      { etoiles: 2, col: 1, consigne: 'Un atome de carbone a un diamètre d\'environ 1,4 × 10⁻¹⁰ m. Combien d\'atomes faut-il aligner pour faire 1 mm ?',
        ...rmp([['1 mm = 10<sup>@</sup> m', '−3'], ['Environ @ × 10<sup>@</sup> atomes (arrondi au dixième)', '7,1', 6]], 3) },
      { etoiles: 3, cahier: true, consigne: 'Légende de l\'échiquier : 1 grain de riz sur la 1re case, 2 sur la 2e, 4 sur la 3e, et ainsi de suite en doublant. Combien de grains sur la 64e case ? Donne un ordre de grandeur, sachant que 2¹⁰ ≈ 10³.',
        corr: cm1Redac('Nombre de grains sur la 64e case', { suite: ['2⁶⁴⁻¹ = 2⁶³', '2⁶³ = 2³ × (2¹⁰)⁶ ≈ 8 × (10³)⁶ = 8 × 10¹⁸'] }, 'Sur la case n, il y a 2ⁿ⁻¹ grains : il y a environ 8 × 10¹⁸ grains sur la 64e case, des milliards de milliards !') },
    ] },
  { titre: 'Puissances', duree: '45 min', brevet: true,
    attendus: ['Automatismes : puissances, puissances de 10, écriture scientifique', 'Calculer avec de très grands ou très petits nombres', 'Convertir et comparer des grandeurs'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['(−2)² =', 4], ['10⁻³ =', '0,001', ['−1 000', '0,001', '−0,001']], ['Écriture scientifique de 52 000 :', '5,2 × 10⁴', ['52 × 10³', '5,2 × 10⁴', '0,52 × 10⁵']], ['2³ × 2² =', '2⁵', ['2⁵', '2⁶', '4⁵']], ['3⁴ =', 81], ['1 nm =', '10⁻⁹ m', ['10⁻³ m', '10⁻⁶ m', '10⁻⁹ m']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Le smartphone de Léa a une mémoire de 128 Go (1 Go = 10⁹ octets). Une photo occupe en moyenne 3,2 Mo et une minute de vidéo en 4K occupe 350 Mo (1 Mo = 10⁶ octets).'
          + qs(['Écrire la capacité de la mémoire en octets, en écriture scientifique.', 'Combien de photos pourrait-on stocker si la mémoire était vide ?', 'Le système occupe 22 Go et Léa a déjà 9 000 photos. Combien de minutes de vidéo 4K peut-elle encore filmer ?']),
        corr: cm1Redac('Capacité de la mémoire en octets', '128 × 10⁹ = 1,28 × 10¹¹', 'La mémoire contient 1,28 × 10¹¹ octets.')
          + cm1Redac('Nombre de photos', '1,28 × 10¹¹ : (3,2 × 10⁶) = 0,4 × 10⁵ = 40 000', 'On pourrait stocker 40 000 photos.')
          + cm1Redac('Nombre de vidéos possibles', { suite: ['128 Go − 22 Go = 106 Go', '106 Go = 106 000 Mo', '9 000 × 3,2 Mo = 28 800 Mo', '106 000 Mo − 28 800 Mo = 77 200 Mo', '77 200 : 350 ≈ 220,6'] }, 'Léa peut encore filmer 220 minutes, soit 3 h 40 min de vidéo 4K.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Mars est à environ 2,28 × 10⁸ km du Soleil et la Terre à 1,5 × 10⁸ km. La lumière, comme les ondes radio, parcourt 3 × 10⁵ km par seconde.'
          + qs(['Combien de temps la lumière du Soleil met-elle pour atteindre Mars ? Donner le résultat en minutes et secondes.', 'Quand la Terre et Mars sont alignées du même côté du Soleil, quelle distance les sépare ?', 'Combien de temps met alors un message radio envoyé de la Terre à un robot sur Mars ?']),
        corr: cm1Redac('Soleil → Mars', { suite: ['2,28 × 10⁸ : (3 × 10⁵) = 0,76 × 10³ = 760 s', '760 s = 12 × 60 s + 40 s'] }, 'La lumière met 12 min 40 s.')
          + cm1Redac('Distance Terre-Mars', '2,28 × 10⁸ − 1,5 × 10⁸ = 0,78 × 10⁸ = 7,8 × 10⁷', 'Elles sont à 7,8 × 10⁷ km l\'une de l\'autre.')
          + cm1Redac('Message radio', { suite: ['7,8 × 10⁷ : (3 × 10⁵) = 2,6 × 10² = 260 s', '260 s = 4 × 60 s + 20 s'] }, 'Le message met 4 min 20 s.') },
    ] },
];
})();

/* ============================================================
   3e · Planches : Arithmétique (N2)
   Multiples, diviseurs, critères ; nombres premiers et décomposition ; fractions irréductibles et
   diviseurs communs ; problèmes (bouquets, carrelage, engrenages) ; Objectif Brevet.
   ============================================================ */
(() => {
const { R, F, T, ligne, rmp, ch, chx, auto, qs } = P3, Fr = plFrac();
// Illustrations des problèmes concrets.
const DS = P3.D, illu = P3.illu;
const roues2436 = DS.fig(202, 128, DS.roue(44, 60, 36, 24, '#F6DFA4') + DS.roue(44 + 36 + 54 + 4, 60, 54, 36, '#DCE6F0').replace(/<path/, `<path transform="rotate(5 138 60)"`)
  + `<circle cx="80" cy="60" r="3.5" fill="#E35D3A"/>` + DS.tx([44, 112], '24 dents', { fs: 10 }) + DS.tx([138, 126], '36 dents', { fs: 10 }), 150);
const sq = '<b style="display:inline-block;border:1.5px solid #1F3A5C;width:.9em;height:1em;vertical-align:-2px;"></b>';
const simp = l => ({ eleve: plListe(l.map(([a, b]) => ligne(F(a, b), '=', Fr))), corr: plListe(l.map(([a, b, c, d]) => ligne(F(a, b), '=', R(F(c, d))))) });
PLANCHES['3e|Arithmétique'] = [
  { titre: 'Multiples, diviseurs et critères de divisibilité', duree: '35 min',
    attendus: ['Reconnaître un multiple, un diviseur', 'Utiliser les critères de divisibilité par 2, 3, 4, 5, 9 et 10', 'Effectuer une division euclidienne'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Oui ou non ? Entoure.',
        ...ch([['36 est divisible par 4.', 'oui'], ['125 est un multiple de 25.', 'oui'], ['7 est un diviseur de 84.', 'oui'], ['45 est divisible par 6.', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Utilise les critères de divisibilité : entoure.',
        ...ch([['2 451 est divisible par 3 :', 'oui'], ['1 234 est divisible par 3 :', 'non'], ['7 290 est divisible par 9 :', 'oui'], ['4 315 est divisible par 5 :', 'oui'], ['5 172 est divisible par 4 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Écris tous les diviseurs, dans l\'ordre croissant.',
        ...rmp([['de 12 : @', '1, 2, 3, 4, 6, 12'], ['de 30 : @', '1, 2, 3, 5, 6, 10, 15, 30'], ['de 49 : @', '1, 7, 49']], 12) },
      { etoiles: 2, col: 1, consigne: `Remplace ${sq} par un chiffre.`,
        ...rmp([[`4 5 ${sq} 2 est divisible par 9 si ${sq} = @`, 7], [`3 ${sq} 8 1 est divisible par 9 si ${sq} = @`, 6], [`2 7 ${sq} est divisible par 2 et par 5 si ${sq} = @`, 0], [`1 4 ${sq} est divisible par 3 et par 4 si ${sq} = @`, 4]]) },
      { etoiles: 2, col: 1, consigne: 'Complète l\'égalité de la division euclidienne.',
        ...rmp([['158 = 12 × @ + @', 13, 2], ['1 000 = 37 × @ + @', 27, 1], ['Le reste de la division de 2 026 par 7 est @', 3]]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Montre que 1 001 est divisible par 7, par 11 et par 13.',
        corr: cm1Redac('Preuve', { suite: ['7 × 11 = 77', '77 × 13 = 1 001'] }, '1 001 = 7 × 11 × 13 : il est divisible par 7, par 11 et par 13.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un nombre est un multiple de 6. Est-il forcément un multiple de 3 ? de 12 ? Justifie.',
        corr: cm1Redac('Multiple de 3', 'Si n = 6k, alors n = 3 × (2k).', 'Oui, un multiple de 6 est toujours un multiple de 3.') + cm1Redac('Multiple de 12', '18 = 6 × 3, mais 18 n\'est pas divisible par 12.', 'Non : 18 est un contre-exemple.') },
    ] },
  { titre: 'Nombres premiers et décomposition', duree: '40 min',
    attendus: ['Reconnaître un nombre premier', 'Décomposer un entier en produit de facteurs premiers', 'Utiliser une décomposition'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ce nombre est-il premier ? Entoure.',
        ...ch([['17 :', 'oui'], ['21 :', 'non'], ['29 :', 'oui'], ['51 :', 'non'], ['1 :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Les nombres premiers inférieurs à 30 : @', '2, 3, 5, 7, 11, 13, 17, 19, 23, 29'], ['Le plus petit nombre premier supérieur à 50 : @', 53]], 10) },
      { etoiles: 2, col: 1, consigne: 'Décompose en produit de facteurs premiers (écris tous les facteurs, du plus petit au plus grand).',
        ...rmp([['60 = @', '2 × 2 × 3 × 5'], ['84 = @', '2 × 2 × 3 × 7'], ['150 = @', '2 × 3 × 5 × 5'], ['210 = @', '2 × 3 × 5 × 7']], 9) },
      { etoiles: 2, col: 1, consigne: 'Complète les exposants.',
        ...rmp([['72 = 2<sup>@</sup> × 3<sup>@</sup>', 3, 2], ['200 = 2<sup>@</sup> × 5<sup>@</sup>', 3, 2], ['675 = 3<sup>@</sup> × 5<sup>@</sup>', 3, 2], ['1 024 = 2<sup>@</sup>', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['2² × 3 × 7 = @', 84], ['2 × 3 × 5² = @', 150], ['7 est-il un diviseur de 2³ × 3 × 7 ? @', 'oui'], ['5 est-il un diviseur de 2³ × 3 × 7 ? @', 'non']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Décompose 360 en produit de facteurs premiers, par divisions successives.',
        corr: cm1Redac('Décomposition de 360', { suite: ['360 : 2 = 180 ; 180 : 2 = 90 ; 90 : 2 = 45', '45 : 3 = 15 ; 15 : 3 = 5 ; 5 : 5 = 1'] }, '360 = 2³ × 3² × 5.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Par quel plus petit nombre entier faut-il multiplier 90 pour obtenir le carré d\'un entier ?',
        corr: cm1Redac('Raisonnement', { suite: ['90 = 2 × 3² × 5', 'Il faut des exposants pairs : on multiplie par 2 × 5 = 10.', '90 × 10 = 900 = 30²'] }, 'Le plus petit nombre est 10 (on obtient 900, le carré de 30).') },
    ] },
  { titre: 'Fractions irréductibles et diviseurs communs', duree: '35 min',
    attendus: ['Trouver les diviseurs communs à deux entiers', 'Rendre une fraction irréductible', 'Calculer avec des fractions et simplifier'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Simplifie le plus possible.', ...simp([[6, 9, 2, 3], [15, 25, 3, 5], [24, 36, 2, 3]]) },
      { etoiles: 1, col: 1, consigne: 'La fraction est-elle irréductible ? Entoure.',
        ...ch([[`${T(7, 12)} :`, 'oui'], [`${T(9, 15)} :`, 'non'], [`${T(13, 26)} :`, 'non'], [`${T(11, 30)} :`, 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Les diviseurs communs à 24 et 36 : @', '1, 2, 3, 4, 6, 12'], ['Le plus grand diviseur commun à 42 et 70 : @', 14], ['Le plus grand diviseur commun à 45 et 64 : @', 1]], 9) },
      { etoiles: 2, col: 1, consigne: 'Rends irréductible (aide-toi des décompositions).', ...simp([[84, 126, 2, 3], [120, 168, 5, 7], [150, 360, 5, 12]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule et donne le résultat sous forme irréductible.',
        eleve: plListe([ligne(F(5, 12), '+', F(7, 18), '=', Fr), ligne(F(7, 15), '×', F(25, 14), '=', Fr), ligne(F(11, 24), '−', F(5, 16), '=', Fr)]),
        corr: plListe([ligne(F(5, 12), '+', F(7, 18), '=', F(15, 36), '+', F(14, 36), '=', R(F(29, 36))), ligne(F(7, 15), '×', F(25, 14), '=', F(175, 210), '=', R(F(5, 6))), ligne(F(11, 24), '−', F(5, 16), '=', F(22, 48), '−', F(15, 48), '=', R(F(7, 48)))]) },
      { etoiles: 2, col: 1, cahier: true, consigne: `Rends ${T(1080, 1260)} irréductible en décomposant le numérateur et le dénominateur.`,
        corr: cm1Redac('Simplification', { suite: ['1 080 = 2³ × 3³ × 5', '1 260 = 2² × 3² × 5 × 7', 'Facteurs communs : 2² × 3² × 5 = 180', '1 080 : 180 = 6 et 1 260 : 180 = 7'] }, `${F(1080, 1260)} = ${F(6, 7)}`) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un nombre s\'écrit 2ⁿ × 3 et il a exactement 10 diviseurs. Quel est ce nombre ?',
        corr: cm1Redac('Raisonnement', { suite: ['Les diviseurs sont 2ᵏ ou 2ᵏ × 3, avec k de 0 à n : il y en a 2(n + 1).', '2(n + 1) = 10, donc n = 4.', '2⁴ × 3 = 48'] }, 'Le nombre est 48 (ses diviseurs : 1, 2, 3, 4, 6, 8, 12, 16, 24, 48).') },
    ] },
  { titre: 'Problèmes d\'arithmétique', duree: '40 min',
    attendus: ['Reconnaître un problème de partage en parts identiques', 'Utiliser les diviseurs ou les multiples communs', 'Rédiger la solution'],
    exos: [
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un fleuriste a 84 roses et 120 tulipes. Il veut faire le plus grand nombre possible de bouquets identiques, en utilisant toutes les fleurs. Combien de bouquets ? Que contient chacun ?',
        corr: cm1Redac('Nombre de bouquets', { suite: ['84 = 2² × 3 × 7', '120 = 2³ × 3 × 5', 'Plus grand diviseur commun : 2² × 3 = 12'] }, 'Il fera 12 bouquets.') + cm1Redac('Composition', { suite: ['84 : 12 = 7', '120 : 12 = 10'] }, 'Chaque bouquet contient 7 roses et 10 tulipes.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une pièce rectangulaire mesure 4,20 m sur 3 m. On la carrelle avec des carreaux carrés tous identiques, les plus grands possible, sans découpe. Quel est le côté d\'un carreau ? Combien en faut-il ?',
        corr: cm1Redac('Côté d\'un carreau', { suite: ['420 = 2² × 3 × 5 × 7', '300 = 2² × 3 × 5²', 'Plus grand diviseur commun : 2² × 3 × 5 = 60'] }, 'Le côté mesure 60 cm.') + cm1Redac('Nombre de carreaux', { suite: ['420 : 60 = 7', '300 : 60 = 5', '7 × 5 = 35'] }, 'Il faut 35 carreaux.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Deux phares s\'allument ensemble à 20 h. L\'un s\'allume toutes les 12 secondes, l\'autre toutes les 18 secondes. À quelle heure s\'allumeront-ils de nouveau ensemble ?',
        corr: cm1Redac('Multiples communs', { suite: ['Multiples de 12 : 12, 24, 36, 48…', 'Multiples de 18 : 18, 36, 54…'] }, 'Ils se rallument ensemble 36 secondes plus tard, à 20 h 00 min 36 s.') },
      { etoiles: 2, col: 1, consigne: illu(roues2436, 'Deux roues dentées s\'engrènent : l\'une a 24 dents, l\'autre 36. Elles partent d\'une position repérée. Quand reviennent-elles pour la première fois à cette position ?'),
        ...rmp([['Nombre de dents passées : @', 72], ['La petite roue a fait @ tours.', 3], ['La grande roue a fait @ tours.', 2]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Tout nombre premier est impair.', 'faux'], ['Le produit de deux nombres premiers est premier.', 'faux'], ['91 est un nombre premier.', 'faux'], ['Il y a une infinité de nombres premiers.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Le code d\'un cadenas est un nombre de trois chiffres. C\'est un nombre pair, multiple de 5 et de 9, et son chiffre des centaines est 7. Quel est ce code ?',
        corr: cm1Redac('Recherche', { suite: ['Pair et multiple de 5 : il se termine par 0.', '7 ? 0 multiple de 9 : 7 + ? + 0 = 9 ou 18, donc ? = 2.'] }, 'Le code est 720.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une espèce de cigales sort de terre tous les 13 ans, une autre tous les 17 ans. Elles sont sorties ensemble en 2024. En quelle année sortiront-elles de nouveau ensemble ?',
        corr: cm1Redac('Raisonnement', { suite: ['13 et 17 sont premiers : leur plus petit multiple commun est 13 × 17 = 221.', '2024 + 221 = 2245'] }, 'Elles sortiront de nouveau ensemble en 2245.') },
    ] },
  { titre: 'Arithmétique', duree: '45 min', brevet: true,
    attendus: ['Automatismes : divisibilité, nombres premiers, fractions', 'Résoudre un problème de partage avec les diviseurs communs', 'Utiliser les multiples communs dans une situation concrète'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['2 028 est-il divisible par 3 ?', 'oui', ['oui', 'non']], ['Décomposition de 30 en facteurs premiers :', '2 × 3 × 5', ['2 × 15', '2 × 3 × 5', '6 × 5']], ['Un diviseur de 35 :', '7', ['3', '7', '70']], ['Le plus petit nombre premier supérieur à 20 :', 23], [`Fraction irréductible égale à ${T(18, 24)} :`, T(3, 4), [T(9, 12), T(3, 4), T(6, 8)]], ['Reste de la division euclidienne de 50 par 7 :', 1]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: 'Un club de randonnée prépare des sachets de ravitaillement. Il dispose de 312 barres de céréales et de 234 compotes. Tous les sachets doivent avoir la même composition, et tout doit être utilisé.'
          + qs(['Décomposer 312 et 234 en produits de facteurs premiers.', 'Le club peut-il faire 13 sachets ? Justifier.', 'Quel est le nombre maximal de sachets ?', 'Quelle est alors la composition de chaque sachet ?']),
        corr: cm1Redac('Décompositions', { suite: ['312 = 2³ × 3 × 13', '234 = 2 × 3² × 13'] }, '') + cm1Redac('13 sachets ?', { suite: ['312 : 13 = 24', '234 : 13 = 18'] }, 'Oui : 13 divise 312 et 234 (24 barres et 18 compotes par sachet).')
          + cm1Redac('Nombre maximal', '2 × 3 × 13 = 78', 'Le club peut faire au maximum 78 sachets.') + cm1Redac('Composition', { suite: ['312 : 78 = 4', '234 : 78 = 3'] }, 'Chaque sachet contient 4 barres et 3 compotes.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Lucie va à la piscine tous les 6 jours, Karim tous les 8 jours. Ils y sont allés ensemble le lundi 1er septembre.'
          + qs(['Dans combien de jours y retourneront-ils ensemble pour la première fois ?', 'Quel jour de la semaine, et à quelle date ?', 'Combien de fois se retrouveront-ils à la piscine en septembre et en octobre, sans compter le 1er septembre ?']),
        corr: cm1Redac('Premier jour commun', { suite: ['Multiples de 6 : 6, 12, 18, 24…', 'Multiples de 8 : 8, 16, 24…'] }, 'Ils se retrouveront dans 24 jours.')
          + cm1Redac('Date', { suite: ['24 = 3 × 7 + 3 : trois semaines et trois jours après un lundi.', '1er septembre + 24 jours = 25 septembre'] }, 'Ce sera le jeudi 25 septembre.')
          + cm1Redac('Septembre et octobre', { suite: ['Rencontres tous les 24 jours : le 25 septembre, puis 24 jours plus tard.', '25 septembre + 24 jours = 19 octobre ; le suivant tombe le 12 novembre.'] }, 'Ils se retrouveront 2 fois : le 25 septembre et le 19 octobre.') },
    ] },
];
})();

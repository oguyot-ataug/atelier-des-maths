/* ============================================================
   3e · Planches : Espace (G5)
   Sphère et boule (aire, volume, section) ; se repérer sur une sphère et dans un pavé droit ; volumes
   (prisme, cylindre, pyramide, cône, boule) et sections ; problèmes ; Objectif Brevet.
   ============================================================ */
(() => {
const { rmp, ch, chx, auto, qs, svg, cote, K, Bl, Ro, Tx } = P3;
const fig = (g, l) => ({ eleve: `<div style="text-align:center;">${g}</div>` + rmp(l).eleve, corr: `<div style="text-align:center;">${g}</div>` + rmp(l).corr });
// Pavé droit ABCDEFGH en perspective cavalière (A origine, B sur (Ox), D sur (Oy), E sur (Oz)).
const pave = (() => { const ux = 30, uz = 30, dy = [16, -12], P = (x, y, z) => [30 + x * ux + y * dy[0], 120 - z * uz + y * dy[1]];
  const S = { A: P(0, 0, 0), B: P(4, 0, 0), C: P(4, 3, 0), D: P(0, 3, 0), E: P(0, 0, 2), F: P(4, 0, 2), G: P(4, 3, 2), H: P(0, 3, 2) };
  const l = (a, b, d) => P3.L(S[a], S[b], K, 1.8, d);
  let g = l('A', 'B') + l('B', 'C') + l('C', 'D', 1) + l('D', 'A', 1) + l('E', 'F') + l('F', 'G') + l('G', 'H') + l('H', 'E') + l('A', 'E') + l('B', 'F') + l('C', 'G') + l('D', 'H', 1);
  const off = { A: [-10, 12], B: [6, 12], C: [10, 4], D: [-12, -4], E: [-12, 2], F: [6, 12], G: [8, -4], H: [-8, -6] };
  Object.entries(S).forEach(([n, p]) => { g += Tx([p[0] + off[n][0], p[1] + off[n][1]], n, K, 12); });
  return svg(230, 150, g, 180); })();
// Sphère : contour, équateur en perspective, centre et rayon.
const sphere = (() => { let g = `<circle cx="70" cy="70" r="55" fill="#EAF4FB" stroke="${K}" stroke-width="2"/><path d="M15,70 A55,14 0 0 0 125,70" fill="none" stroke="${K}" stroke-width="1.6"/><path d="M15,70 A55,14 0 0 1 125,70" fill="none" stroke="${K}" stroke-width="1.2" stroke-dasharray="5 4"/>`;
  g += `<circle cx="70" cy="70" r="2.2" fill="${K}"/>` + P3.L([70, 70], [125, 70], Ro, 2) + Tx([66, 64], 'O', K, 12) + Tx([98, 64], 'r', Ro, 12);
  return svg(140, 140, g, 110); })();
// Cornet de glace : cône renversé surmonté d'une demi-boule.
const cornet = (() => { let g = `<path d="M30,60 L70,175 L110,60 Z" fill="#F3D9A8" stroke="${K}" stroke-width="2"/><path d="M30,60 A40,40 0 0 1 110,60 Z" fill="#F7C6D0" stroke="${K}" stroke-width="2"/><path d="M30,60 A40,9 0 0 0 110,60" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="4 3"/>`;
  g += P3.L([70, 60], [110, 60], Ro, 1.6) + Tx([90, 55], '3 cm', Ro, 10) + P3.L([70, 60], [70, 175], Bl, 1.4, 1) + Tx([92, 125], '12 cm', Bl, 10);
  return svg(140, 185, g, 100); })();
PLANCHES['3e|Espace'] = [
  { titre: 'Sphère et boule', duree: '35 min',
    attendus: ['Calculer l\'aire d\'une sphère et le volume d\'une boule', 'Connaître la section d\'une sphère par un plan', 'Calculer le rayon d\'une section'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Aire de la sphère : 4πr² ; volume de la boule : (4/3)πr³. Complète.',
        ...fig(sphere, [['r = 3 cm : aire @π cm²', 36], ['r = 3 cm : volume @π cm³', 36], ['r = 6 cm : aire @π cm²', 144], ['r = 6 cm : volume @π cm³', 288]]) },
      { etoiles: 2, col: 1, consigne: 'Arrondis à l\'unité.',
        ...rmp([['Aire d\'une sphère de rayon 10 cm : @ cm²', '1 257'], ['Volume d\'une boule de diamètre 10 cm : @ cm³', 524]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Le diamètre est le double du rayon.', 'vrai'], ['Si le rayon double, le volume de la boule double.', 'faux'], ['La section d\'une sphère par un plan est un cercle.', 'vrai'], ['Une boule est creuse.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'La Terre est assimilée à une boule de rayon 6 370 km.',
        ...rmp([['Longueur de l\'équateur ≈ @ km (à l\'unité)', '40 024'], ['Aire de la Terre ≈ @ × 10<sup>@</sup> km²', '5,1', 8]], 3) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une sphère de centre O et de rayon 5 cm est coupée par un plan situé à 3 cm de O. Quel est le rayon du cercle de section ?',
        corr: cm1Redac('Pythagore', { suite: ['Le triangle formé par O, le centre H de la section et un point M du cercle est rectangle en H.', 'HM² = 5² − 3² = 16'] }, 'Le rayon de la section est 4 cm.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Trois balles de tennis de 6,5 cm de diamètre sont rangées dans une boîte cylindrique juste à leur taille. Quel pourcentage du volume de la boîte reste vide ?',
        corr: cm1Redac('Volumes', { suite: ['Boîte : π × 3,25² × 19,5 ≈ 647,1 cm³', 'Balles : 3 × (4/3) × π × 3,25³ ≈ 431,4 cm³', 'Vide : 647,1 − 431,4 ≈ 215,7 cm³'] }, 'Le vide représente 215,7 : 647,1 ≈ 33 % : exactement un tiers de la boîte !') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une boule de glace de 3 cm de rayon fond dans un cornet conique de 3 cm de rayon et de 10 cm de hauteur. Le cornet déborde-t-il ?',
        corr: cm1Redac('Volumes', { suite: ['Boule : (4/3) × π × 27 = 36π ≈ 113,1 cm³', 'Cône : (1/3) × π × 9 × 10 = 30π ≈ 94,2 cm³'] }, 'La glace fondue occupe plus que le cornet : il déborde.') },
    ] },
  { titre: 'Se repérer sur une sphère et dans un pavé', duree: '35 min',
    attendus: ['Utiliser le vocabulaire : équateur, méridien, parallèle, latitude, longitude', 'Repérer un point de la Terre par ses coordonnées géographiques', 'Repérer un point dans un pavé droit'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['Grand cercle qui sépare les hémisphères Nord et Sud :', 'l\'équateur', 'l\'équateur · un méridien · un parallèle'], ['Demi-cercle qui relie les deux pôles :', 'un méridien', 'l\'équateur · un méridien · un parallèle'], ['Latitude du pôle Nord :', '90° N', '0° · 90° N · 180°']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Une ville à 30° S et 60° O est dans l\'hémisphère @', 'sud'], ['Deux villes sur le même méridien ont la même @', 'longitude'], ['Deux villes sur le même parallèle ont la même @', 'latitude']]) },
      { etoiles: 2, col: 1, consigne: 'Dans le pavé droit, A est l\'origine : B(4 ; 0 ; 0), D(0 ; 3 ; 0) et E(0 ; 0 ; 2).',
        ...fig(pave, [['C(@ ; @ ; @)', 4, 3, 0], ['G(@ ; @ ; @)', 4, 3, 2], ['F(@ ; @ ; @)', 4, 0, 2], ['H(@ ; @ ; @)', 0, 3, 2]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Les parallèles sont tous des grands cercles.', 'faux'], ['Tous les méridiens ont la même longueur.', 'vrai'], ['La longitude se mesure à partir du méridien de Greenwich.', 'vrai'], ['Un point de latitude 0° est sur l\'équateur.', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La Terre a un rayon de 6 370 km. Quelle distance parcourt-on de l\'équateur au pôle Nord, le long d\'un méridien ?',
        corr: cm1Redac('Quart de cercle', '2 × π × 6 370 : 4 ≈ 10 006', 'On parcourt environ 10 000 km.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Deux villes sont sur le même méridien, aux latitudes 49° N et 4° N. Quelle distance les sépare le long du méridien ?',
        corr: cm1Redac('Arc de méridien', { suite: ['49 − 4 = 45°', '45 : 360 × 2 × π × 6 370 ≈ 5 003'] }, 'Elles sont à environ 5 000 km l\'une de l\'autre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le parallèle de latitude 60° N est un cercle de rayon 6 370 × cos 60°. Quelle est sa longueur ? Compare-la à celle de l\'équateur.',
        corr: cm1Redac('Longueur', { suite: ['Rayon : 6 370 × 0,5 = 3 185 km', '2 × π × 3 185 ≈ 20 012'] }, 'Il mesure environ 20 000 km : la moitié de l\'équateur.') },
    ] },
  { titre: 'Volumes et sections', duree: '40 min',
    attendus: ['Calculer le volume d\'un prisme, d\'un cylindre, d\'une pyramide, d\'un cône', 'Convertir des volumes et des contenances', 'Connaître la nature d\'une section plane'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['Cube d\'arête 4 cm : @ cm³', 64], ['Pavé de 5 cm × 3 cm × 2 cm : @ cm³', 30], ['Cylindre, r = 2 cm, h = 5 cm : @π cm³', 20], ['Cône, r = 3 cm, h = 4 cm : @π cm³', 12], ['Pyramide de base 9 cm² et de hauteur 5 cm : @ cm³', 15]]) },
      { etoiles: 1, col: 1, consigne: 'Convertis.',
        ...rmp([['1 L = @ dm³', 1], ['2,5 m³ = @ L', '2 500'], ['750 cm³ = @ L', '0,75'], ['1 cm³ = @ mL', 1]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la section obtenue.',
        ...chx([['Cube coupé parallèlement à une face :', 'un carré', 'un carré · un triangle · un cercle'], ['Cylindre coupé parallèlement à sa base :', 'un disque', 'un disque · un rectangle · un triangle'], ['Cylindre coupé parallèlement à son axe :', 'un rectangle', 'un disque · un rectangle · un triangle'], ['Pyramide coupée parallèlement à sa base :', 'une réduction de la base', 'un carré quelconque · une réduction de la base · un triangle']]) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un verre conique a un rayon de 4 cm et une hauteur de 9 cm. Calcule son volume. On le remplit à mi-hauteur : quel volume de liquide contient-il ?',
        corr: cm1Redac('Volume du verre', '(1/3) × π × 4² × 9 = 48π ≈ 150,8 cm³', '') + cm1Redac('À mi-hauteur', '48π × (1/2)³ = 6π ≈ 18,8 cm³', 'Il ne contient que 18,8 cm³ : le huitième du verre.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Une piscine cylindrique a un diamètre de 3,6 m ; l\'eau y monte à 1,2 m. Combien de litres d\'eau contient-elle ?',
        corr: cm1Redac('Volume', 'π × 1,8² × 1,2 ≈ 12,214 m³', 'Elle contient environ 12 214 L d\'eau.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'La pyramide de Khéops a une base carrée de 230 m de côté et une hauteur de 146 m. Calcule son volume.',
        corr: cm1Redac('Volume', '230² × 146 : 3 ≈ 2 574 467', 'Son volume est d\'environ 2,57 × 10⁶ m³.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une pyramide de 12 cm de haut a un volume de 400 cm³. On la coupe parallèlement à sa base, à 4 cm du sommet. Quel est le volume de la petite pyramide ?',
        corr: cm1Redac('Réduction', { suite: ['Coefficient : 4 : 12 = 1/3', '400 × (1/3)³ = 400 : 27 ≈ 14,8'] }, 'La petite pyramide a un volume d\'environ 14,8 cm³.') },
    ] },
  { titre: 'Problèmes dans l\'espace', duree: '40 min',
    attendus: ['Décomposer un solide pour calculer son volume', 'Comparer des volumes et des contenances', 'Utiliser l\'effet d\'un agrandissement sur les volumes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Un aquarium mesure 60 cm × 30 cm × 40 cm.',
        ...rmp([['Volume total : @ L', 72], ['Rempli aux trois quarts : @ L d\'eau', 54]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Si on double toutes les dimensions d\'un pavé, son volume est multiplié par 8.', 'vrai'], ['Un cône a le tiers du volume du cylindre de même base et de même hauteur.', 'vrai'], ['Une boule de rayon 2 cm a un volume double de celui d\'une boule de rayon 1 cm.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un silo est formé d\'un cylindre (rayon 2 m, hauteur 6 m) surmonté d\'un cône de même rayon et de 1,5 m de haut. Calcule son volume.',
        corr: cm1Redac('Volume', { suite: ['Cylindre : π × 2² × 6 = 24π', 'Cône : (1/3) × π × 2² × 1,5 = 2π', '24π + 2π = 26π ≈ 81,7'] }, 'Le silo a un volume d\'environ 81,7 m³.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Peut-on verser une bouteille de 1,5 L dans une gourde cylindrique de 3,5 cm de rayon et de 20 cm de haut ?',
        corr: cm1Redac('Volume de la gourde', 'π × 3,5² × 20 ≈ 769,7 cm³', 'La gourde contient environ 0,77 L : on ne peut pas tout verser.') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un verre cylindrique de 3 cm de rayon contient de l\'eau sur 8 cm de haut. On y plonge 6 glaçons cubiques de 2 cm d\'arête, complètement immergés. De combien l\'eau monte-t-elle ?',
        corr: cm1Redac('Raisonnement', { suite: ['Volume des glaçons : 6 × 2³ = 48 cm³', 'Hausse : 48 : (π × 3²) ≈ 1,7 cm'] }, 'L\'eau monte d\'environ 1,7 cm (jusqu\'à 9,7 cm).') },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Un ballon de basket de 24 cm de diamètre est rangé dans un carton cubique de 24 cm d\'arête. Quel pourcentage du carton occupe-t-il ?',
        corr: cm1Redac('Volumes', { suite: ['Ballon : (4/3) × π × 12³ ≈ 7 238 cm³', 'Carton : 24³ = 13 824 cm³', '7 238 : 13 824 ≈ 0,52'] }, 'Le ballon occupe environ 52 % du carton.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une boule est enfermée dans un cylindre de même rayon r et de hauteur 2r. Montre que le volume de la boule est les deux tiers de celui du cylindre (découverte d\'Archimède).',
        corr: cm1Redac('Preuve', { suite: ['Boule : (4/3)πr³', 'Cylindre : πr² × 2r = 2πr³', '(4/3)πr³ : 2πr³ = 4/6 = 2/3'] }, 'Le volume de la boule est bien les 2/3 de celui du cylindre.') },
    ] },
  { titre: 'Espace', duree: '45 min', brevet: true,
    attendus: ['Automatismes : volumes, unités, sphère', 'Calculer le volume d\'un solide composé', 'Calculer aire et volume d\'une sphère dans un contexte'],
    exos: [
      { etoiles: 1, auto: true, pts: 3, consigne: 'Automatismes (sans calculatrice) : écris ou entoure la réponse. Aucune justification n\'est demandée.',
        ...auto([['Volume d\'un cube de 3 cm d\'arête (en cm³) :', 27], ['Volume d\'un cône de rayon 3 cm et de hauteur 5 cm :', '15π cm³', ['15π cm³', '45π cm³', '5π cm³']], ['1 L =', '1 dm³', ['1 cm³', '1 dm³', '1 m³']], ['Section d\'une sphère par un plan :', 'un cercle', ['un carré', 'un cercle', 'un triangle']], ['Latitude de l\'équateur (en degrés) :', 0], ['Longueurs multipliées par 2 : le volume est multiplié par', '8', ['2', '4', '8']]]) },
      { etoiles: 2, cahier: true, pts: 5, consigne: '<span>Un cornet de glace est formé d\'un cône de 3 cm de rayon et de 12 cm de hauteur, rempli de glace et surmonté d\'une demi-boule de glace de même rayon.</span>' + cote(cornet, qs(['Calculer le volume du cône, en cm³ (valeur exacte, puis arrondie au dixième).', 'Calculer le volume de la demi-boule.', 'En déduire le volume total de glace d\'un cornet.', 'Le glacier dispose d\'un bac de 5 L de glace. Combien de cornets peut-il servir ?'])),
        corr: cm1Redac('Cône', '(1/3) × π × 3² × 12 = 36π ≈ 113,1 cm³', '') + cm1Redac('Demi-boule', '(1/2) × (4/3) × π × 3³ = 18π ≈ 56,5 cm³', '')
          + cm1Redac('Total', '36π + 18π = 54π ≈ 169,6 cm³', '') + cm1Redac('Nombre de cornets', '5 000 : 169,6 ≈ 29,5', 'Il peut servir 29 cornets complets.') },
      { etoiles: 2, cahier: true, pts: 4, consigne: 'Un ballon publicitaire est une sphère de 10 m de diamètre, gonflée d\'air.'
          + qs(['Calculer le volume d\'air qu\'il contient, au m³ près.', 'Un mètre cube d\'air pèse 1,2 kg. Quelle est la masse de cet air ?', 'Le tissu du ballon coûte 12 € le m². Quel est le prix du tissu nécessaire ?']),
        corr: cm1Redac('Volume', '(4/3) × π × 5³ ≈ 523,6', 'Le ballon contient environ 524 m³ d\'air.') + cm1Redac('Masse', '523,6 × 1,2 ≈ 628', 'L\'air pèse environ 628 kg.')
          + cm1Redac('Prix du tissu', { suite: ['Aire : 4 × π × 5² = 100π ≈ 314,2 m²', '314,2 × 12 ≈ 3 770'] }, 'Le tissu coûte environ 3 770 €.') },
    ] },
];
})();

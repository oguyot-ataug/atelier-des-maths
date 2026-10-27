/* ============================================================
   CE2 · Planches : Angle droit, cercle et constructions (G3)
   Angle droit, aigu, obtus ; vérifier un angle droit avec l'équerre ; codage ; cercle, disque, centre,
   rayon, diamètre ; tracer au compas ; construire sur papier uni (rectangle, triangle rectangle, carré
   et cercle).
   ============================================================ */
(() => {
const { rmp, chx } = P3;
const { svg, L, T, X, droit } = CM2G;
// Angle de sommet O, ouvert de a degrés.
const angle = (a, nom) => { const O = [20, 70], r = 70, A = [O[0] + r, O[1]], B = [O[0] + r * Math.cos(a * Math.PI / 180), O[1] - r * Math.sin(a * Math.PI / 180)];
  return svg(110, 85, L(O, A, '#1F3A5C', 2.2) + L(O, B, '#1F3A5C', 2.2) + T([O[0] - 8, O[1] + 4], nom, { fs: 12 }), 95); };
const angles = [[90, 'A'], [40, 'B'], [130, 'C'], [90, 'D'], [65, 'E']];
const cercle = (o) => svg(150, 140, `<circle cx="70" cy="70" r="55" fill="#EAF4FB" stroke="#1F3A5C" stroke-width="2"/>` + X([70, 70], 'O', [-10, 4]) + L([70, 70], [125, 70], '#E35D3A', 2) + X([125, 70], 'A', [10, 4]) + L([30, 31], [110, 109], '#2E9C6A', 2) + X([30, 31], 'B', [-8, -6]) + X([110, 109], 'C', [8, 10]), 130);
PLANCHES['ce2|Angle droit, cercle et constructions'] = [
  { titre: 'Les angles', duree: '25 min',
    attendus: ['Reconnaître un angle droit avec l\'équerre', 'Dire si un angle est aigu, droit ou obtus', 'Coder un angle droit'],
    exos: [
      { etoiles: 1, consigne: 'Avec ton équerre, écris sous chaque angle : droit, aigu (plus petit) ou obtus (plus grand).',
        eleve: plGrille(angles.map(([a, n]) => angle(a, n) + '<br>' + P3.B(5)), 5),
        corr: plGrille(angles.map(([a, n]) => angle(a, n) + '<br>' + P3.R(a === 90 ? 'droit' : a < 90 ? 'aigu' : 'obtus')), 5) },
      { etoiles: 2, col: 1, consigne: 'Entoure vrai ou faux.',
        ...chx([['Un angle droit se code par un petit carré.', 'vrai', 'vrai · faux'], ['Un angle obtus est plus petit qu\'un angle droit.', 'faux', 'vrai · faux'], ['L\'équerre a un angle droit.', 'vrai', 'vrai · faux']]) },
      { etoiles: 2, col: 1, consigne: 'Code les angles droits de ce rectangle.',
        eleve: svg(170, 100, `<rect x="20" y="15" width="130" height="70" fill="none" stroke="#1F3A5C" stroke-width="2.2"/>`, 150),
        corr: svg(170, 100, `<rect x="20" y="15" width="130" height="70" fill="none" stroke="#1F3A5C" stroke-width="2.2"/>` + droit([150, 15], [20, 15], [20, 85]) + droit([20, 15], [150, 15], [150, 85]) + droit([20, 85], [150, 85], [150, 15]) + droit([150, 85], [20, 85], [20, 15]), 150) },
    ] },
  { titre: 'Le cercle', duree: '25 min',
    attendus: ['Utiliser les mots centre, rayon, diamètre', 'Savoir que le diamètre mesure deux rayons', 'Tracer un cercle au compas'],
    exos: [
      { etoiles: 1, consigne: `Observe le cercle de centre O.<div style="text-align:center;">${cercle()}</div>`,
        ...chx([['Le segment rouge qui va de O à A est…', 'un rayon', 'un rayon · un diamètre'], ['Le segment vert qui va de B à C passe par O : c\'est…', 'un diamètre', 'un rayon · un diamètre']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un cercle a un rayon de 3 cm. Son diamètre mesure @ cm.', 6], ['Un cercle a un diamètre de 10 cm. Son rayon mesure @ cm.', 5], ['Tous les points du cercle sont à la même distance du @.', 'centre']], 4) },
      { etoiles: 2, col: 1, cahier: true, consigne: 'Marque un point O. Trace le cercle de centre O et de rayon 4 cm, puis un diamètre.',
        corr: cm1Redac('Construction', 'écartement du compas : 4 cm', 'Pointe du compas sur O, on trace le cercle ; le diamètre passe par O et mesure 8 cm.') },
    ] },
  { titre: 'Construire sur papier uni', duree: '35 min',
    attendus: ['Construire un rectangle avec la règle et l\'équerre', 'Construire un triangle rectangle', 'Suivre un programme de construction'],
    exos: [
      { etoiles: 2, cahier: true, consigne: 'Construis un rectangle de 7 cm de longueur et 3 cm de largeur.',
        corr: cm1Redac('Étapes', { suite: ['un côté de 7 cm', 'un angle droit à chaque bout, côtés de 3 cm', 'on ferme le rectangle'] }, 'On vérifie à l\'équerre les quatre angles droits.', svg(190, 90, `<rect x="15" y="10" width="154" height="66" fill="none" stroke="#1F3A5C" stroke-width="2"/>` + T([92, 88], '7 cm', { fs: 11, c: '#2E9C6A' }) + T([178, 46], '3 cm', { fs: 11, c: '#2E9C6A', a: 'start' }), 170)) },
      { etoiles: 2, cahier: true, consigne: 'Construis un triangle rectangle dont les deux côtés de l\'angle droit mesurent 10 cm et 4 cm.',
        corr: cm1Redac('Étapes', { suite: ['un côté de 10 cm', 'à un bout, un angle droit et un côté de 4 cm', 'on relie les deux extrémités libres'] }, 'Le triangle a un angle droit, codé par un petit carré.') },
      { etoiles: 3, cahier: true, consigne: 'Construis un carré de 6 cm de côté. Trace ensuite le cercle de rayon 4 cm dont le centre est un sommet du carré.',
        corr: cm1Redac('Étapes', { suite: ['un carré : 4 côtés de 6 cm, 4 angles droits', 'pointe du compas sur un sommet, écartement 4 cm'] }, 'Le cercle coupe deux côtés du carré, à 4 cm du sommet choisi.') },
    ] },
];
})();

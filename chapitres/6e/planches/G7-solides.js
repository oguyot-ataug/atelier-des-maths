/* ============================================================
   6e · Planches : Solides et volumes (G7)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const K = '#1F3A5C';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const col = (h, t, w) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;max-width:${w || 120}px;line-height:1.35;">${t}</span></span>`;
const vigs = (V, it, m, w) => ({ eleve: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br><b>${m}</b>`, w))), corr: duo(V.map((v, i) => col(v, `<b>${it[i][0]}</b><br>${plEntoure(it[i][1])}`, w))) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const P = (pts, f, d) => `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${f}" stroke="${K}" stroke-width="1.6"${d ? ' stroke-dasharray="4 3"' : ''} stroke-linejoin="round"/>`;
const vig = inner => S(110, 96, `<rect x="1" y="1" width="108" height="94" rx="8" fill="#fff" stroke="#C9DCEB"/>` + inner, 96);
// Dessins de solides (perspective cavalière).
const SOL = {
  cube: P([[25, 40], [65, 40], [65, 80], [25, 80]], '#BFE3F0') + P([[25, 40], [45, 25], [85, 25], [65, 40]], '#DDF0F7') + P([[65, 40], [85, 25], [85, 65], [65, 80]], '#9FD3E6'),
  pave: P([[15, 45], [75, 45], [75, 80], [15, 80]], '#F8D9A8') + P([[15, 45], [32, 30], [92, 30], [75, 45]], '#FCE9CA') + P([[75, 45], [92, 30], [92, 65], [75, 80]], '#F2C27E'),
  cyl: `<ellipse cx="55" cy="78" rx="28" ry="9" fill="#CDE8C8" stroke="${K}" stroke-width="1.6"/><rect x="27" y="28" width="56" height="50" fill="#CDE8C8"/><line x1="27" y1="28" x2="27" y2="78" stroke="${K}" stroke-width="1.6"/><line x1="83" y1="28" x2="83" y2="78" stroke="${K}" stroke-width="1.6"/><ellipse cx="55" cy="28" rx="28" ry="9" fill="#E3F3E0" stroke="${K}" stroke-width="1.6"/>`,
  cone: `<path d="M27,74 L55,14 L83,74" fill="#E7D7F6" stroke="${K}" stroke-width="1.6"/><ellipse cx="55" cy="74" rx="28" ry="9" fill="#E7D7F6" stroke="${K}" stroke-width="1.6"/>`,
  pyr: P([[20, 75], [70, 75], [55, 14]], '#F6C9BD') + P([[70, 75], [90, 60], [55, 14]], '#EFAE9C') + `<line x1="20" y1="75" x2="40" y2="60" stroke="${K}" stroke-dasharray="4 3"/><line x1="40" y1="60" x2="90" y2="60" stroke="${K}" stroke-dasharray="4 3"/><line x1="40" y1="60" x2="55" y2="14" stroke="${K}" stroke-dasharray="4 3"/>`,
  boule: `<circle cx="55" cy="50" r="32" fill="#FBE3B3" stroke="${K}" stroke-width="1.6"/><ellipse cx="55" cy="50" rx="32" ry="9" fill="none" stroke="${K}" stroke-dasharray="4 3"/>`
};
// Empilement de cubes : l'outil « assemblage de cubes » du tableau interactif (cubeStackSvg) ;
// c = [[x, y, z]] avec x vers la droite, y en profondeur, z vers le haut (converti au repère de l'outil).
function pile(c, a){ return `<div style="max-width:${(a || 20) * 8}px;margin:0 auto;">${cubeStackSvg(c.map(([x, y, z]) => ({ x, y: z, z: y })))}</div>`; }
// Vue de face : quadrillage w × h, colonnes de hauteurs données (cases du bas vers le haut).
const vueFace = (c, w, h) => { const on = []; c.forEach(([x, , z]) => on.push([x, h - 1 - z])); return [...new Set(on.map(p => p.join(',')))].map(s => s.split(',').map(Number)); };
const vueDessus = (c, w, d) => { const on = []; c.forEach(([x, y]) => on.push([x, d - 1 - y])); return [...new Set(on.map(p => p.join(',')))].map(s => s.split(',').map(Number)); };
const PILE1 = [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [0, 1, 2]];
const PILE2 = [[0, 0, 0], [1, 0, 0], [1, 0, 1], [2, 0, 0], [2, 1, 0], [2, 1, 1]];
const grilleX = (att, w, h) => ({ eleve: plX(cm1Quad(w, h, [], { k: 22 }), { t: 'cases', k: 22, ox: 1, oy: 1, w, h, coul: '#FF8208', att }), corr: cm1Quad(w, h, att, { k: 22 }) });
// Patrons de cube (6 carrés) : quelques bons, quelques faux.
const patron = (l, k) => { k = k || 13; return S(6 * k + 4, 5 * k + 4, l.map(([x, y]) => `<rect x="${2 + x * k}" y="${2 + y * k}" width="${k}" height="${k}" fill="#F8D9A8" stroke="${K}" stroke-width="1.4"/>`).join(''), 6 * k + 4); };
PLANCHES['6e|Solides et volumes'] = [
  { titre: 'Reconnaître les solides', duree: '35 min',
    attendus: ['Reconnaître et nommer : cube, pavé droit, cylindre, cône, pyramide, boule', 'Compter faces, arêtes et sommets d\'un polyèdre', 'Distinguer polyèdres et solides « ronds »'],
    exos: [
      { etoiles: 1, consigne: 'Entoure le nom de chaque solide.',
        ...vigs([vig(SOL.cube), vig(SOL.pave), vig(SOL.cyl), vig(SOL.cone), vig(SOL.pyr), vig(SOL.boule)], [['a', 'cube'], ['b', 'pavé'], ['c', 'cylindre'], ['d', 'cône'], ['e', 'pyramide'], ['f', 'boule']], 'cube · pavé · cylindre · cône · pyramide · boule', 100) },
      { etoiles: 2, consigne: 'Complète le tableau.',
        eleve: tab(['Solide', 'Faces', 'Arêtes', 'Sommets'], [['Cube', B(1), B(2), B(1)], ['Pavé droit', B(1), B(2), B(1)], ['Pyramide à base carrée', B(1), B(1), B(1)], ['Pyramide à base triangulaire', B(1), B(1), B(1)]]),
        corr: tab(['Solide', 'Faces', 'Arêtes', 'Sommets'], [['Cube', R(6), R(12), R(8)], ['Pavé droit', R(6), R(12), R(8)], ['Pyramide à base carrée', R(5), R(8), R(5)], ['Pyramide à base triangulaire', R(4), R(6), R(4)]]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Toutes les faces d\'un cube sont des carrés.', 'vrai'], ['Un cylindre est un polyèdre.', 'faux'], ['Un pavé droit a 6 faces rectangulaires.', 'vrai'], ['Une boule a des arêtes.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Quel solide suis-je ? Entoure.',
        ...ch([['J\'ai 2 faces planes en forme de disque :', 'cylindre'], ['J\'ai une seule face plane et un sommet :', 'cône'], ['J\'ai 5 faces dont 4 triangles :', 'pyramide']], 'cylindre · cône · pyramide') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pour chaque polyèdre du tableau, calcule faces + sommets − arêtes. Que remarques-tu ?',
        corr: cm1Redac('Calculs', { suite: ['Cube : 6 + 8 − 12 = 2', 'Pyramide à base carrée : 5 + 5 − 8 = 2', 'Pyramide à base triangulaire : 4 + 4 − 6 = 2'] }, 'On trouve toujours 2 (c\'est la relation d\'Euler).') },
    ] },
  { titre: 'Voir un solide sous différents angles', duree: '40 min',
    attendus: ['Compter les cubes d\'un assemblage', 'Dessiner la vue de face et la vue de dessus d\'un assemblage de cubes', 'Associer un assemblage à ses vues'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Combien de cubes forment cet assemblage ? (Chaque cube est posé sur le sol ou sur un autre cube.)<div style="text-align:center;">${pile(PILE1)}</div>`,
        eleve: plListe(['Nombre de cubes : ' + B(1), 'Hauteur maximale : ' + B(1) + ' cubes']), corr: plListe(['Nombre de cubes : ' + R(7), 'Hauteur maximale : ' + R(3) + ' cubes']) },
      { etoiles: 2, col: 1, consigne: 'Colorie la vue de face de cet assemblage (on le regarde de devant).', ...grilleX(vueFace(PILE1, 3, 3), 3, 3) },
      { etoiles: 2, col: 1, consigne: `Voici un autre assemblage (chaque cube est posé sur le sol ou sur un autre cube).<div style="text-align:center;">${pile(PILE2)}</div>Colorie sa vue de dessus.`, ...grilleX(vueDessus(PILE2, 3, 2), 3, 2) },
      { etoiles: 2, col: 1, consigne: 'Colorie la vue de face de ce même assemblage.', ...grilleX(vueFace(PILE2, 3, 2), 3, 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Avec 6 cubes, construis un assemblage dont la vue de face est un carré de 2 × 2 et la vue de dessus un rectangle de 3 × 1. Est-ce possible ? Explique.',
        corr: cm1Redac('Réflexion', { suite: ['Vue de dessus 3 × 1 : une seule rangée de profondeur, 3 colonnes.', 'Vue de face 2 × 2 : seulement 2 colonnes visibles de face.'] }, 'C\'est impossible : la vue de face devrait avoir 3 colonnes, comme la vue de dessus.') },
    ] },
  { titre: 'Mesurer un volume en cubes', duree: '35 min',
    attendus: ['Calculer le volume d\'un pavé droit en comptant des cubes unités', 'Utiliser la formule longueur × largeur × hauteur', 'Connaître cm³, dm³, m³ et 1 L = 1 dm³'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Combien de cubes unités dans chaque pavé ?',
        eleve: plListe(['4 cubes de long, 3 de large, 2 de haut : ' + B(), '5 × 5 × 5 : ' + B(), '10 de long, 2 de large, 3 de haut : ' + B()]),
        corr: plListe(['4 cubes de long, 3 de large, 2 de haut : ' + R(24), '5 × 5 × 5 : ' + R(125), '10 de long, 2 de large, 3 de haut : ' + R(60)]) },
      { etoiles: 1, col: 1, consigne: `Combien de cubes forment ce pavé plein ?<div style="text-align:center;">${pile([0, 1, 2, 3].flatMap(x => [0, 1].flatMap(y => [0, 1].map(z => [x, y, z]))), 18)}</div>`,
        eleve: plListe(['Cubes par étage : ' + B(1), 'Nombre d\'étages : ' + B(1), 'Volume : ' + B(2) + ' cubes']), corr: plListe(['Cubes par étage : ' + R(8), 'Nombre d\'étages : ' + R(2), 'Volume : ' + R(16) + ' cubes']) },
      { etoiles: 2, col: 1, consigne: 'Calcule le volume.',
        eleve: plListe(['Pavé de 6 cm × 4 cm × 5 cm : ' + B() + ' cm³', 'Cube de 3 dm d\'arête : ' + B() + ' dm³', 'Aquarium de 50 cm × 30 cm × 40 cm : ' + B() + ' cm³, soit ' + B() + ' L']),
        corr: plListe(['Pavé de 6 cm × 4 cm × 5 cm : ' + R(120) + ' cm³', 'Cube de 3 dm d\'arête : ' + R(27) + ' dm³', 'Aquarium de 50 cm × 30 cm × 40 cm : ' + R('60 000') + ' cm³, soit ' + R(60) + ' L']) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe(['1 L = ' + B() + ' dm³', '1 dm³ = ' + B() + ' cm³', '1 m³ = ' + B() + ' dm³', '250 cm³ = ' + B() + ' L']),
        corr: plListe(['1 L = ' + R(1) + ' dm³', '1 dm³ = ' + R('1 000') + ' cm³', '1 m³ = ' + R('1 000') + ' dm³', '250 cm³ = ' + R('0,25') + ' L']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une boîte en forme de pavé mesure 20 cm × 10 cm × 10 cm. Combien de cubes de 5 cm d\'arête peut-on y ranger ?',
        corr: cm1Redac('Rangement', { suite: ['En longueur : 20 ÷ 5 = 4 ; en largeur : 10 ÷ 5 = 2 ; en hauteur : 10 ÷ 5 = 2.'] }, 'On peut ranger 4 × 2 × 2 = 16 cubes.') },
    ] },
  { titre: 'Patrons de solides', duree: '35 min',
    attendus: ['Reconnaître un patron de cube', 'Associer un patron à un pavé droit', 'Construire un patron'],
    exos: [
      { etoiles: 1, consigne: 'Ces figures sont-elles des patrons de cube ? Entoure.',
        ...(() => { const V = [patron([[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]]), patron([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1]]), patron([[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]]), patron([[0, 0], [1, 0], [1, 1], [2, 1], [1, 2], [2, 2]]), patron([[1, 0], [1, 1], [0, 2], [1, 2], [2, 2], [1, 3]])];
          return vigs(V, [['a', 'oui'], ['b', 'non'], ['c', 'oui'], ['d', 'non'], ['e', 'oui']], 'oui · non'); })() },
      { etoiles: 2, col: 1, consigne: 'Le patron d\'un pavé droit de 5 cm × 3 cm × 2 cm a 6 faces rectangulaires. Complète.',
        eleve: plListe(['Nombre de faces de 5 cm × 3 cm : ' + B(1), 'Nombre de faces de 5 cm × 2 cm : ' + B(1), 'Nombre de faces de 3 cm × 2 cm : ' + B(1), 'Aire totale du patron : ' + B() + ' cm²']),
        corr: plListe(['Nombre de faces de 5 cm × 3 cm : ' + R(2), 'Nombre de faces de 5 cm × 2 cm : ' + R(2), 'Nombre de faces de 3 cm × 2 cm : ' + R(2), 'Aire totale du patron : 2 × 15 + 2 × 10 + 2 × 6 = ' + R(62) + ' cm²']) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un cube a 11 patrons différents.', 'vrai'], ['Six carrés alignés forment un patron de cube.', 'faux'], ['Le patron d\'un cylindre contient deux disques.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine sur ton cahier un patron de cube de 3 cm d\'arête différent du patron en croix, découpe-le et vérifie qu\'il se replie.',
        corr: cm1Redac('Exemple', 'Une rangée de 4 carrés, avec un carré au-dessus du premier et un carré en dessous du dernier.', 'Lors du pliage, chaque face doit trouver sa place sans se superposer à une autre.') },
    ] },
];
})();

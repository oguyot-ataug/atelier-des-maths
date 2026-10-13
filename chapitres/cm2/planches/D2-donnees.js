/* ============================================================
   CM2 · Planches : Organisation et gestion de données (D2)
   Recueillir et organiser des données (tableau d'effectifs, diagramme en barres) ; caractère
   qualitatif ou quantitatif ; diagramme circulaire ; points dans un repère et courbe.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const { rmp, ch, chx, tab, repere } = P3;
const { K, svg, L, T } = CM2G;
const DATA = 'bus, pied, vélo, pied, voiture, bus, pied, pied, bus, vélo, pied, voiture, bus, pied, vélo, bus, pied, voiture, bus, pied'.split(', ');
const NB = m => DATA.filter(x => x === m).length;
const MODES = [['Bus', 'bus'], ['À pied', 'pied'], ['Vélo', 'vélo'], ['Voiture', 'voiture']];
const effectifs = c => tab([['Moyen de transport', ...MODES.map(m => m[0])], ['Nombre d\'élèves', '@', '@', '@', '@']], c, MODES.map(m => NB(m[1])));
// Diagramme en barres (corrigé) : 1 carreau pour 1 élève.
const barres = (() => { const k = 12, H = 10 * k + 10; let g = '';
  for(let y = 0; y <= 10; y++) g += L([30, H - y * k], [30 + 4 * 46, H - y * k], '#D5E2EE', 1) + (y % 2 === 0 ? T([25, H - y * k + 4], String(y), { a: 'end', fs: 10 }) : '');
  MODES.forEach(([n, m], i) => { const h = NB(m) * k; g += `<rect x="${40 + i * 46}" y="${H - h}" width="26" height="${h}" fill="#2EA8C9" stroke="${K}" stroke-width="1.2"/>` + T([53 + i * 46, H + 14], n, { fs: 10 }); });
  return svg(230, H + 20, g + L([30, H], [30 + 4 * 46, H], K, 1.6) + L([30, H], [30, 0], K, 1.6), 220); })();
// Diagramme circulaire : moitié foot, quart danse, quart judo.
const camembert = svg(170, 130, `<path d="M65,65 L65,10 A55,55 0 0 1 65,120 Z" fill="#2EA8C9" stroke="#fff" stroke-width="2"/><path d="M65,65 L65,120 A55,55 0 0 1 10,65 Z" fill="#E35D3A" stroke="#fff" stroke-width="2"/><path d="M65,65 L10,65 A55,55 0 0 1 65,10 Z" fill="#2E9C6A" stroke="#fff" stroke-width="2"/>`
  + T([92, 70], 'foot', { c: '#fff' }) + T([42, 92], 'danse', { c: '#fff', fs: 11 }) + T([42, 46], 'judo', { c: '#fff', fs: 11 }), 150);
const TEMP = [[0, 8], [4, 6], [8, 10], [12, 18], [16, 20], [20, 14], [24, 10]];
const courbe = repere({ x: [0, 24], y: [0, 22], u: 11, v: 7, sx: 2, sy: 2, gx: 4, gy: 4, nx: 'heure', ny: '°C', segs: TEMP.slice(1).map((p, i) => [TEMP[i], p, '#E35D3A']), pts: TEMP.map(([x, y]) => ({ x, y })), px: 320 });
const PL = [[0, 2], [1, 4], [2, 7], [3, 9], [4, 12], [5, 13]];
const plante = sol => repere({ x: [0, 6], y: [0, 14], u: 34, v: 12, gx: 1, gy: 2, sy: 1, nx: 'semaine', ny: 'cm', segs: sol ? PL.slice(1).map((p, i) => [PL[i], p, '#2E9C6A']) : [], pts: sol ? PL.map(([x, y]) => ({ x, y, c: '#2E9C6A' })) : [], px: 280 });
PLANCHES['cm2|Organisation et gestion de données'] = [
  { titre: 'Recueillir et organiser des données', duree: '35 min',
    attendus: ['Compter des données et remplir un tableau d\'effectifs', 'Distinguer un caractère qualitatif d\'un caractère quantitatif', 'Construire un diagramme en barres'],
    exos: [
      { etoiles: 1, consigne: `On a demandé à 20 élèves comment ils viennent à l'école :<div style="margin:4px 0;font-size:.95em;">${DATA.join(', ')}.</div>Complète le tableau.`,
        eleve: effectifs(false), corr: effectifs(true) },
      { etoiles: 2, col: 1, consigne: 'Réponds à l\'aide du tableau.',
        ...rmp([['Le moyen de transport le plus utilisé : @', 'à pied'], ['Nombre d\'élèves qui ne viennent pas à pied : @', 12], ['Nombre d\'élèves de plus à pied qu\'en bus : @', 2]]) },
      { etoiles: 2, col: 1, consigne: 'Ce caractère est-il qualitatif (un mot) ou quantitatif (un nombre) ? Entoure.',
        ...ch([['La couleur préférée :', 'qualitatif'], ['L\'âge :', 'quantitatif'], ['Le nombre de frères et sœurs :', 'quantitatif'], ['Le sport pratiqué :', 'qualitatif']], 'qualitatif · quantitatif') },
      { etoiles: 3, cahier: true, consigne: 'Sur ton cahier, construis le diagramme en barres de ce tableau (1 carreau pour 1 élève).',
        corr: cm1Redac('Diagramme en barres', { suite: ['Bus : 6 carreaux', 'À pied : 8 carreaux', 'Vélo : 3 carreaux', 'Voiture : 3 carreaux'] }, 'Chaque barre a pour hauteur le nombre d\'élèves.') + `<div style="text-align:center;">${barres}</div>` },
    ] },
  { titre: 'Le diagramme circulaire', duree: '30 min',
    attendus: ['Lire un diagramme circulaire', 'Relier les secteurs à la moitié, au quart', 'Choisir un diagramme adapté'],
    exos: [
      { etoiles: 1, consigne: `Ce diagramme montre le sport pratiqué par les 24 élèves d'une classe.<div style="text-align:center;">${camembert}</div>`,
        ...rmp([['Le sport pratiqué par la moitié des élèves : @', 'foot'], ['Nombre d\'élèves qui font du foot : @', 12], ['Nombre d\'élèves qui font de la danse : @', 6], ['Nombre d\'élèves qui font du judo : @', 6]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure le diagramme le mieux adapté.',
        ...chx([['Montrer comment se partage un total :', 'diagramme circulaire', 'diagramme circulaire · courbe'], ['Montrer l\'évolution de la température dans la journée :', 'courbe', 'diagramme circulaire · courbe']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans une classe de 28 élèves, la moitié vient en bus, le quart vient à pied, les autres viennent en voiture. Combien d\'élèves y a-t-il dans chaque groupe ?',
        corr: cm1Redac('En bus', '28 : 2 = 14', '14 élèves viennent en bus.') + cm1Redac('À pied', '28 : 4 = 7', '7 élèves viennent à pied.') + cm1Redac('En voiture', '28 − 14 − 7 = 7', '7 élèves viennent en voiture.') },
    ] },
  { titre: 'Points dans un repère et courbe', duree: '35 min',
    attendus: ['Lire une courbe', 'Placer des points dans un repère à partir d\'un tableau', 'Décrire une évolution'],
    exos: [
      { etoiles: 2, consigne: `Cette courbe montre la température relevée toutes les 4 heures pendant une journée.<div style="text-align:center;">${courbe}</div>`,
        ...rmp([['Température à 12 h : @ °C', 18], ['Heure la plus chaude : @', '16 h'], ['De 4 h à 16 h, la température a augmenté de @ °C.', 14]]) },
      { etoiles: 2, consigne: `Une plante a été mesurée chaque semaine. Place les points du tableau dans le repère, puis relie-les.${tab([['Semaine', 0, 1, 2, 3, 4, 5], ['Hauteur (cm)', 2, 4, 7, 9, 12, 13]])}`,
        eleve: `<div style="text-align:center;">${plante(false)}</div>`, corr: `<div style="text-align:center;">${plante(true)}</div>` },
    ] },
];
})();

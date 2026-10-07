/* ============================================================
   5e · Planches : Fonctions (P2)
   Une grandeur en fonction d'une autre : lire un graphique, tableau de valeurs, formule, construire un graphique.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }); // choix propres à chaque question
const d = v => String(+(+v).toFixed(3)).replace('-', '−').replace('.', ',');
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(typeof r === 'number' ? d(r) : r)))) });
// Repère quadrillé : x de 0 à xm (pas px par unité ux), y de y0 à ym (uy par carreau) ; pts reliés si ligne.
function repere(o){ const { xm, y0 = 0, ym, ux = 1, uy = 1, k = 24, lx = '', ly = '' } = o, nx = xm / ux, ny = (ym - y0) / uy, W = 44 + nx * k, H = 30 + ny * k, X = x => 34 + x / ux * k, Y = y => 10 + (ym - y) / uy * k;
  let s = ''; for(let i = 0; i <= nx; i++) s += `<line x1="${X(i * ux)}" y1="${Y(ym)}" x2="${X(i * ux)}" y2="${Y(y0)}" stroke="#C9DCEB"/>`; for(let j = 0; j <= ny; j++) s += `<line x1="${X(0)}" y1="${Y(y0 + j * uy)}" x2="${X(xm)}" y2="${Y(y0 + j * uy)}" stroke="#C9DCEB"/>`;
  s += `<line x1="${X(0)}" y1="${Y(Math.max(0, y0))}" x2="${X(xm) + 6}" y2="${Y(Math.max(0, y0))}" stroke="#1C2B39" stroke-width="1.5"/><line x1="${X(0)}" y1="${Y(y0)}" x2="${X(0)}" y2="${Y(ym) - 6}" stroke="#1C2B39" stroke-width="1.5"/>`;
  for(let i = 1; i <= nx; i++) if(i % (o.ex || 1) === 0) s += cmT(X(i * ux), Y(Math.max(0, y0)) + 14, d(i * ux), { fs: 10, fw: 500, c: '#4E5665' });
  for(let j = 0; j <= ny; j++) if(j % (o.ey || 1) === 0) s += cmT(X(0) - 13, Y(y0 + j * uy) + 4, d(y0 + j * uy), { fs: 10, fw: 500, c: '#4E5665' });
  if(lx) s += cmT(X(xm), Y(Math.max(0, y0)) + 26, lx, { fs: 10, a: 'end', c: '#1F3A5C' }); if(ly) s += cmT(X(0) + 4, 8, ly, { fs: 10, a: 'start', c: '#1F3A5C' });
  return { X, Y, W, H: H + 14, fond: s, grille: { k, ox: X(0), oy: Y(ym), w: nx, h: ny } }; }
const svg = (r, inner, w) => `<svg class="pl-libre" viewBox="0 0 ${r.W} ${r.H}" style="width:${w || r.W}px;max-width:100%;display:block;margin:0 auto;">${r.fond}${inner || ''}</svg>`;
const courbe = (r, pts, c) => `<polyline points="${pts.map(([x, y]) => r.X(x) + ',' + r.Y(y)).join(' ')}" fill="none" stroke="${c || '#E35D3A'}" stroke-width="2.4" stroke-linejoin="round"/>` + pts.map(([x, y]) => `<circle cx="${r.X(x)}" cy="${r.Y(y)}" r="3" fill="${c || '#E35D3A'}"/>`).join('');
const tabV = (t1, t2, l1, l2) => `<table class="pl-tab"><tr><th>${t1}</th>${l1.map(v => `<td>${v}</td>`).join('')}</tr><tr><th>${t2}</th>${l2.map(v => `<td>${v}</td>`).join('')}</tr></table>`;
// Températures d'une journée (heure, °C).
const TEMP = [[0, -2], [2, -3], [4, -4], [6, -3], [8, 0], [10, 4], [12, 7], [14, 9], [16, 8], [18, 5], [20, 2], [22, 0], [24, -1]];
PLANCHES['5e|Fonctions'] = [
  { titre: 'Lire un graphique', duree: '35 min',
    attendus: ['Lire l\'image d\'une valeur (valeur de la 2e grandeur pour une valeur de la 1re)', 'Lire les valeurs qui donnent un résultat donné', 'Décrire l\'évolution d\'une grandeur'],
    exos: [
      { etoiles: 1, consigne: 'Le graphique donne la température (en °C) au cours d\'une journée d\'hiver, en fonction de l\'heure. Lis les températures.',
        ...(() => { const r = repere({ xm: 24, y0: -4, ym: 10, ux: 2, uy: 2, k: 30, lx: 'heure', ly: '°C' }), g = svg(r, courbe(r, TEMP)), q = rmp([['À 12 h : @ °C', 7], ['À 4 h : @ °C', '−4'], ['À 20 h : @ °C', 2], ['À minuit (24 h) : @ °C', '−1']], 2);
          return { eleve: g + `<div class="pl-col2">${q.eleve}</div>`, corr: g + `<div class="pl-col2">${q.corr}</div>` }; })() },
      { etoiles: 2, col: 1, consigne: 'Lis sur le graphique.',
        ...rmp([['Température maximale : @ °C', 9], ['À quelle heure ? @ h', 14], ['Température minimale : @ °C', '−4'], ['Heures où il fait 0 °C : 8 h et @ h', 22]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne description.',
        ...ch([['De 4 h à 14 h, la température…', 'augmente'], ['De 14 h à 24 h, la température…', 'diminue'], ['De 0 h à 4 h, la température…', 'diminue']], 'augmente · diminue · reste stable') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pendant combien d\'heures la température a-t-elle été négative ce jour-là ? Explique ta lecture.',
        corr: cm1Redac('Lecture', { suite: ['La température est négative de 0 h à 8 h (8 heures)…', '… puis de 22 h à 24 h (2 heures).'] }, 'Elle a été négative pendant environ 10 heures.') },
    ] },
  { titre: 'Tableau de valeurs', duree: '35 min',
    attendus: ['Calculer des valeurs à l\'aide d\'un programme ou d\'une formule', 'Compléter un tableau de valeurs', 'Lire un tableau de valeurs'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le prix d\'une location de vélo est P = 3 + 2h (P en €, h en heures). Complète le tableau.',
        ...(() => { const h = [1, 2, 3, 5, 8]; return { eleve: tabV('h (heures)', 'P (€)', h, h.map(() => B(1))), corr: tabV('h (heures)', 'P (€)', h, h.map(x => R(3 + 2 * x))) }; })() },
      { etoiles: 1, col: 1, consigne: 'Programme : « choisir un nombre, le multiplier par 4, soustraire 1 ». Complète.',
        ...(() => { const x = [0, 1, 2, 5, 10]; return { eleve: tabV('Nombre choisi', 'Résultat', x, x.map(() => B(1))), corr: tabV('Nombre choisi', 'Résultat', x, x.map(v => R(d(4 * v - 1)))) }; })() },
      { etoiles: 2, col: 1, consigne: 'L\'aire d\'un carré de côté c (en cm) est A = c × c. Complète.',
        ...(() => { const c = [1, 2, 3, 4, 2.5]; return { eleve: tabV('c (cm)', 'A (cm²)', c.map(d), c.map(() => B(1))), corr: tabV('c (cm)', 'A (cm²)', c.map(d), c.map(v => R(d(v * v)))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Lis le tableau du vélo (location).',
        ...rmp([['Pour 4 h, on paie @ €', 11], ['Avec 15 €, on peut louer @ h', 6], ['Le prix est-il proportionnel à la durée ? @', 'non']], 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure (programme « × 4 − 1 »).',
        ...ch([['L\'image de 3 est 11 :', 'vrai'], ['Le nombre qui donne 19 est 5 :', 'vrai'], ['L\'image de 0 est 4 :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Temps de cuisson d\'un rôti : 20 min par livre (500 g), plus 15 min. Complète.',
        ...(() => { const m = [500, 1000, 1500, 2000]; return { eleve: tabV('Masse (g)', 'Durée (min)', m, m.map(() => B(1))), corr: tabV('Masse (g)', 'Durée (min)', m, m.map(v => R(v / 500 * 20 + 15))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Un réservoir contient 60 L. Il se vide de 4 L par minute. Complète.',
        ...(() => { const t = [0, 1, 5, 10, 15]; return { eleve: tabV('Temps (min)', 'Volume (L)', t, t.map(() => B(1))), corr: tabV('Temps (min)', 'Volume (L)', t, t.map(v => R(60 - 4 * v))) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une bougie de 20 cm diminue de 1,5 cm par heure. Fais un tableau donnant sa hauteur toutes les 2 heures, de 0 h à 10 h. Au bout de combien d\'heures sera-t-elle entièrement consumée ?',
        corr: cm1Redac('Tableau', { suite: ['0 h : 20 cm ; 2 h : 17 cm ; 4 h : 14 cm', '6 h : 11 cm ; 8 h : 8 cm ; 10 h : 5 cm'] }, '') + cm1Redac('Consumée', '20 : 1,5 ≈ 13,3', 'Elle sera entièrement consumée au bout d\'environ 13 h 20 min.') },
    ] },
  { titre: 'Produire une formule', duree: '40 min',
    attendus: ['Exprimer une grandeur en fonction d\'une autre par une formule', 'Utiliser la formule pour calculer', 'Reconnaître la formule qui correspond à une situation'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris la formule (n est le nombre d\'objets).',
        ...rmp([['Prix P de n cahiers à 2 € : P = @', '2n'], ['Prix P de n places à 7 € et 3 € de frais : P = @', '7n+3'], ['Nombre de roues R de n vélos : R = @', '2n'], ['Nombre de pattes T de n chats et 2 oiseaux : T = @', '4n+4']], 5) },
      { etoiles: 2, col: 1, consigne: 'Entoure la formule qui convient.',
        ...chx([['Périmètre P d\'un carré de côté c :', 'P = 4c', 'P = 4c · P = c + 4'], ['Aire A d\'un rectangle de longueur 5 et de largeur ℓ :', 'A = 5ℓ', 'A = 5ℓ · A = 5 + ℓ'], ['Âge A de Tom dans x ans, s\'il a 12 ans :', 'A = 12 + x', 'A = 12 + x · A = 12x']]) },
      { etoiles: 2, col: 1, consigne: 'Un abonnement de cinéma coûte 10 € plus 4 € par séance. Complète.',
        ...rmp([['Formule du prix P pour s séances : P = @', '10+4s'], ['Prix pour 6 séances : @ €', 34], ['Nombre de séances pour 50 € : @', 10]], 5) },
      { etoiles: 2, col: 1, consigne: 'Allumettes : pour faire une rangée de n carrés accolés, il faut 3n + 1 allumettes. Complète.',
        ...rmp([['1 carré : @ allumettes', 4], ['5 carrés : @ allumettes', 16], ['20 carrés : @ allumettes', 61], ['Avec 31 allumettes, on fait @ carrés', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Un rectangle a une largeur de 3 cm et une longueur de x cm.',
        ...rmp([['Son périmètre : P = @', '2x+6'], ['Son aire : A = @', '3x'], ['Pour x = 7 : P = @ cm', 20], ['Pour x = 7 : A = @ cm²', 21]], 5) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une agence loue des voitures 45 € par jour plus 0,20 € par kilomètre. Écris la formule du prix P pour 1 jour et k kilomètres. Calcule le prix pour 1 jour et 250 km.',
        corr: cm1Redac('Formule', 'P = 45 + 0,20 × k', '') + cm1Redac('Pour 250 km', '45 + 0,20 × 250 = 45 + 50 = 95', 'Le prix est de 95 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux forfaits de téléphone : A coûte 15 € par mois ; B coûte 5 € par mois plus 0,50 € par heure d\'appel. Écris la formule du prix de B en fonction du nombre d\'heures h. Pour combien d\'heures les deux forfaits coûtent-ils le même prix ?',
        corr: cm1Redac('Formule de B', 'P = 5 + 0,5h', '') + cm1Redac('Même prix', '5 + 0,5h = 15 donc 0,5h = 10 et h = 20', 'Les deux forfaits coûtent le même prix pour 20 heures d\'appel.') },
    ] },
  { titre: 'Construire un graphique', duree: '40 min',
    attendus: ['Placer dans un repère les points d\'un tableau de valeurs', 'Choisir et lire les unités des axes', 'Relier les points quand cela a un sens'],
    exos: [
      { etoiles: 2, col: 1, consigne: 'Place les points du tableau (location de vélo : 1 h → 5 € ; 2 h → 7 € ; 4 h → 11 € ; 6 h → 15 €).',
        ...(() => { const r = repere({ xm: 6, ym: 16, ux: 1, uy: 2, k: 22, lx: 'h', ly: '€', ey: 1 }), P = [[1, 5, 'A'], [2, 7, 'B'], [4, 11, 'C'], [6, 15, 'D']];
          // Prix impairs : entre deux carreaux en ordonnée (1 carreau = 2 €) ; on vise le milieu.
          const att = Object.fromEntries(P.map(([x, y, n]) => [n, [r.X(x), r.Y(y)]])), cands = []; for(let i = 0; i <= 6; i++) for(let j = 0; j <= 16; j++) cands.push([r.X(i), r.Y(j)]);
          return { eleve: plX(svg(r), { t: 'pts', noms: P.map(p => p[2]), att, cands, tol: 9 }), corr: svg(r, courbe(r, P.map(([x, y]) => [x, y]), '#1F7A4D')) }; })() },
      { etoiles: 2, col: 1, consigne: 'Place les points du programme « × 2 + 1 » pour les nombres 0, 1, 2, 3 et 4 (en ordonnée : le résultat).',
        ...(() => { const r = repere({ xm: 4, ym: 9, ux: 1, uy: 1, k: 22, lx: 'nombre', ly: 'résultat' }), P = [0, 1, 2, 3, 4].map((x, i) => [x, 2 * x + 1, 'EFGHK'[i]]);
          return { eleve: plX(svg(r), { t: 'pts', grille: r.grille, noms: P.map(p => p[2]), att: Object.fromEntries(P.map(([x, y, n]) => [n, [r.X(x), r.Y(y)]])) }), corr: svg(r, courbe(r, P.map(([x, y]) => [x, y]), '#1F7A4D')) }; })() },
      { etoiles: 2, col: 1, consigne: 'Pour chaque graphique précédent, entoure la bonne réponse.',
        ...chx([['Les points du vélo sont…', 'alignés', 'alignés · non alignés'], ['La droite du vélo passe par l\'origine :', 'non', 'oui · non'], ['Les points du programme sont…', 'alignés', 'alignés · non alignés']]) },
      { etoiles: 2, col: 1, consigne: 'Choix des unités : entoure la graduation la mieux adaptée.',
        ...chx([['Des températures de −10 °C à 30 °C sur 8 carreaux, 1 carreau =', '5 °C', '1 °C · 5 °C · 10 °C'], ['Des prix de 0 € à 1 000 € sur 10 carreaux, 1 carreau =', '100 €', '10 € · 100 € · 1 000 €'], ['Des durées de 0 à 3 h sur 6 carreaux, 1 carreau =', '30 min', '15 min · 30 min · 1 h']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier, trace un repère et représente la hauteur de la bougie (20 cm, −1,5 cm par heure) de 0 h à 10 h. Les points sont-ils alignés ? Est-ce une situation de proportionnalité ?',
        corr: cm1Redac('Graphique', { suite: ['Points : (0 ; 20), (2 ; 17), (4 ; 14), (6 ; 11), (8 ; 8), (10 ; 5).', 'Ils sont alignés, sur une droite qui descend.'] }, 'Ce n\'est pas une situation de proportionnalité : la droite ne passe pas par l\'origine.') },
    ] },
];
})();

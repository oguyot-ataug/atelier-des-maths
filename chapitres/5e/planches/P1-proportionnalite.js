/* ============================================================
   5e · Planches : Proportionnalité (P1)
   Reconnaître, compléter un tableau (coefficient, linéarité, unité), graphique, échelles et problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }); // choix propres à chaque question
const d = v => String(+(+v).toFixed(3)).replace('.', ',');
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(typeof r === 'number' ? d(r) : r)))) });
// Tableau à deux lignes ; null = case à compléter (réponse dans sol).
const tab = (t1, t2, l1, l2, f) => `<table class="pl-tab"><tr><th>${t1}</th>${l1.map(v => `<td>${v == null ? f(0) : d(v)}</td>`).join('')}</tr><tr><th>${t2}</th>${l2.map(v => `<td>${v == null ? f(1) : d(v)}</td>`).join('')}</tr></table>`;
function tabExo(t1, t2, l1, l2, k){ // k : coefficient de la 1re ligne vers la 2de ; les null sont complétés
  const sol = [], e = tab(t1, t2, l1, l2, () => B(2));
  let i = 0; const c = `<table class="pl-tab"><tr><th>${t1}</th>${l1.map((v, j) => `<td>${v == null ? R(d(l2[j] / k)) : d(v)}</td>`).join('')}</tr><tr><th>${t2}</th>${l2.map((v, j) => `<td>${v == null ? R(d(l1[j] * k)) : d(v)}</td>`).join('')}</tr></table>`;
  return { eleve: e, corr: c }; }
// Petit graphique : points (x, y) dans un repère 0..xm × 0..ym.
function graphe(pts, xm, ym, w, opts){ opts = opts || {}; const W = w || 150, H = Math.round(W * .8), X = x => 18 + x * (W - 28) / xm, Y = y => H - 14 - y * (H - 24) / ym;
  let s = `<line x1="18" y1="${H - 14}" x2="${W - 4}" y2="${H - 14}" stroke="#1C2B39" stroke-width="1.4"/><line x1="18" y1="${H - 14}" x2="18" y2="4" stroke="#1C2B39" stroke-width="1.4"/>`;
  if(opts.droite) s += `<line x1="${X(pts[0][0])}" y1="${Y(pts[0][1])}" x2="${X(pts[pts.length - 1][0])}" y2="${Y(pts[pts.length - 1][1])}" stroke="#2EA8C9" stroke-width="1.6"/>`;
  s += pts.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="3.6" fill="#E35D3A"/>`).join('');
  return `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:block;">${s}</svg>`; }
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
PLANCHES['5e|Proportionnalité'] = [
  { titre: 'Reconnaître une situation de proportionnalité', duree: '35 min',
    attendus: ['Reconnaître un tableau de proportionnalité (même coefficient)', 'Calculer le coefficient de proportionnalité', 'Distinguer une situation proportionnelle d\'une situation qui ne l\'est pas'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces tableaux sont-ils de proportionnalité ? Entoure.',
        ...(() => { const T = [[[2, 5, 8], [6, 15, 24], 'oui'], [[1, 3, 4], [5, 15, 21], 'non'], [[10, 4, 7], [5, 2, 3.5], 'oui']];
          return { eleve: T.map(([a, b], i) => tab('x', 'y', a, b) + `<p class="pl-item" style="margin:2px 0 8px;">Tableau ${i + 1} : <b>oui · non</b></p>`).join(''),
            corr: T.map(([a, b, r], i) => tab('x', 'y', a, b) + `<p class="pl-item" style="margin:2px 0 8px;">Tableau ${i + 1} : ${plEntoure(r)}</p>`).join('') }; })() },
      { etoiles: 1, col: 1, consigne: 'Ces tableaux sont de proportionnalité. Donne le coefficient (on multiplie la 1re ligne par…).',
        ...rmp([['3 → 12 ; 5 → 20 ; 9 → 36 : coefficient @', 4], ['2 → 3 ; 6 → 9 ; 10 → 15 : coefficient @', 1.5], ['10 → 4 ; 20 → 8 ; 5 → 2 : coefficient @', 0.4]], 2) },
      { etoiles: 2, col: 1, consigne: 'Situation de proportionnalité ? Entoure.',
        ...ch([['Le prix payé et le nombre de baguettes achetées :', 'oui'], ['La taille d\'un enfant et son âge :', 'non'], ['Le périmètre d\'un carré et la longueur de son côté :', 'oui'], ['L\'aire d\'un carré et la longueur de son côté :', 'non'], ['La distance parcourue à vitesse constante et la durée :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Dans un tableau de proportionnalité, on passe d\'une ligne à l\'autre en ajoutant toujours le même nombre :', 'faux'], ['Si 4 kg coûtent 10 €, alors 8 kg coûtent 20 € (prix proportionnel) :', 'vrai'], ['Le coefficient peut être un nombre décimal :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Un taxi demande 3 € de prise en charge et 2 € par kilomètre. Complète, puis réponds.',
        ...rmp([['Prix pour 1 km : @ €', 5], ['Prix pour 2 km : @ €', 7], ['Prix pour 10 km : @ €', 23], ['Le prix est-il proportionnel à la distance ? @', 'non']], 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Justifie que ce tableau n\'est pas un tableau de proportionnalité : 2 → 7 ; 4 → 14 ; 6 → 20.',
        corr: cm1Redac('Justification', { suite: ['7 : 2 = 3,5 ; 14 : 4 = 3,5', '20 : 6 ≈ 3,33 ≠ 3,5'] }, 'Les quotients ne sont pas tous égaux : ce n\'est pas un tableau de proportionnalité.') },
    ] },
  { titre: 'Compléter un tableau de proportionnalité', duree: '40 min',
    attendus: ['Utiliser le coefficient de proportionnalité', 'Utiliser la linéarité (additionner, multiplier une colonne)', 'Passer par l\'unité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète avec le coefficient (prix en € de cahiers à 2,5 € pièce).', ...tabExo('Cahiers', 'Prix (€)', [1, 4, 6, null], [2.5, null, null, 25], 2.5) },
      { etoiles: 2, col: 1, consigne: 'Complète en utilisant les colonnes (additionner, multiplier).', ...tabExo('Farine (g)', 'Crêpes', [200, 100, 300, null], [12, null, null, 36], 0.06) },
      { etoiles: 2, col: 1, consigne: 'Passe par l\'unité.',
        ...rmp([['5 stylos coûtent 6 € : 1 stylo coûte @ €', 1.2], ['Donc 8 stylos coûtent @ €', 9.6], ['3 kg de pommes coûtent 7,50 € : 1 kg coûte @ €', 2.5], ['Donc 5 kg coûtent @ €', 12.5]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète (vitesse constante).', ...tabExo('Durée (h)', 'Distance (km)', [1, 2, 0.5, null], [80, null, null, 280], 80) },
      { etoiles: 2, col: 1, consigne: 'Linéarité : complète sans calculer le coefficient.',
        ...rmp([['Si 6 objets pèsent 15 kg, 12 objets pèsent @ kg', 30], ['Si 6 objets pèsent 15 kg, 2 objets pèsent @ kg', 5], ['Donc 8 objets (6 + 2) pèsent @ kg', 20], ['Et 3 objets pèsent @ kg', 7.5]], 2) },
      { etoiles: 2, col: 1, consigne: 'Complète (prix de tissu au mètre).', ...tabExo('Longueur (m)', 'Prix (€)', [2, 3, 5, null], [9, null, null, 36], 4.5) },
      { etoiles: 2, col: 1, consigne: 'Entoure la méthode la plus rapide pour trouver le prix de 15 objets si 5 objets coûtent 8 €.',
        ...ch([['Méthode :', 'multiplier par 3'], ['Prix de 15 objets :', '24 €']], 'multiplier par 3 · ajouter 10 · 24 € · 18 € · 40 €') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une recette pour 4 personnes demande 300 g de farine, 3 œufs et 50 cL de lait. Calcule les quantités pour 10 personnes.',
        corr: cm1Redac('Coefficient', '10 : 4 = 2,5', '') + cm1Redac('Quantités pour 10', { suite: ['Farine : 300 × 2,5 = 750 g', 'Œufs : 3 × 2,5 = 7,5, donc 7 ou 8 œufs', 'Lait : 50 × 2,5 = 125 cL'] }, 'Pour 10 personnes : 750 g de farine, 7 ou 8 œufs et 125 cL de lait.') },
    ] },
  { titre: 'Proportionnalité et graphique', duree: '35 min',
    attendus: ['Savoir qu\'une situation de proportionnalité se représente par des points alignés avec l\'origine', 'Lire des valeurs sur un graphique', 'Placer des points à partir d\'un tableau'],
    exos: [
      { etoiles: 1, consigne: 'Le graphique représente-t-il une situation de proportionnalité ? Entoure.',
        ...(() => { const G = [graphe([[0, 0], [1, 2], [2, 4], [3, 6], [4, 8]], 5, 10, 140, { droite: true }), graphe([[0, 2], [1, 3], [2, 4], [3, 5], [4, 6]], 5, 10, 140, { droite: true }), graphe([[1, 1], [2, 4], [3, 9]], 5, 10, 140), graphe([[0, 0], [2, 3], [4, 6]], 5, 10, 140, { droite: true })], r = ['oui', 'non', 'non', 'oui'];
          return { eleve: duo(G.map((g, i) => col(g, `<b>${'abcd'[i]}</b> <b>oui · non</b>`))), corr: duo(G.map((g, i) => col(g, `<b>${'abcd'[i]}</b> ${plEntoure(r[i])}`))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Place les points du tableau dans le repère (1 carreau = 1 kg en abscisse, 2 € en ordonnée). Masse (kg) : 1 ; 2 ; 4 ; 5. Prix (€) : 2 ; 4 ; 8 ; 10.',
        ...(() => { const k = 26, w = 6, h = 6, grid = (inner) => { let s = ''; for(let i = 0; i <= w; i++) s += `<line x1="${30 + i * k}" y1="10" x2="${30 + i * k}" y2="${10 + h * k}" stroke="#C9DCEB"/>`; for(let j = 0; j <= h; j++) s += `<line x1="30" y1="${10 + j * k}" x2="${30 + w * k}" y2="${10 + j * k}" stroke="#C9DCEB"/>`;
            s += `<line x1="30" y1="${10 + h * k}" x2="${36 + w * k}" y2="${10 + h * k}" stroke="#1C2B39" stroke-width="1.5"/><line x1="30" y1="${10 + h * k}" x2="30" y2="4" stroke="#1C2B39" stroke-width="1.5"/>`;
            for(let i = 1; i <= w; i++) s += cmT(30 + i * k, 24 + h * k, i, { fs: 10, fw: 500, c: '#4E5665' }); for(let j = 1; j <= h; j++) s += cmT(20, 14 + (h - j) * k, 2 * j, { fs: 10, fw: 500, c: '#4E5665' });
            return `<svg class="pl-libre" viewBox="0 0 ${50 + w * k} ${30 + h * k}" style="width:${50 + w * k}px;max-width:100%;display:block;margin:0 auto;">${s}${inner || ''}</svg>`; };
          const P = [[1, 2, 'A'], [2, 4, 'B'], [4, 8, 'C'], [5, 10, 'D']], px = ([x, y]) => [30 + x * k, 10 + (h - y / 2) * k];
          return { eleve: plX(grid(), { t: 'pts', grille: { k, ox: 30, oy: 10, w, h }, noms: P.map(p => p[2]), att: Object.fromEntries(P.map(p => [p[2], px(p)])) }),
            corr: grid(P.map(p => { const [x, y] = px(p); return `<circle cx="${x}" cy="${y}" r="4" fill="#1F7A4D"/>` + cmT(x + 8, y - 6, p[2], { fs: 12, c: '#1F7A4D' }); }).join('') + `<line x1="30" y1="${10 + h * k}" x2="${px([6, 12])[0]}" y2="${px([6, 12])[1]}" stroke="#1F7A4D" stroke-dasharray="5 4"/>`) }; })() },
      { etoiles: 2, col: 1, consigne: 'Le graphique précédent : lis les valeurs.',
        ...rmp([['Prix de 3 kg : @ €', 6], ['Masse achetée avec 12 € : @ kg', 6], ['Les points sont-ils alignés avec l\'origine ? @', 'oui']], 3) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Des points alignés représentent toujours une situation de proportionnalité :', 'faux'], ['Si la situation est proportionnelle, la droite passe par l\'origine du repère :', 'vrai'], ['Un graphique qui « monte » est toujours de proportionnalité :', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un robinet remplit une cuve : 15 L en 2 min, 45 L en 6 min, 60 L en 8 min. Ces valeurs sont-elles proportionnelles ? Combien de litres en 10 min ?',
        corr: cm1Redac('Débit', '15 : 2 = 7,5 ; 45 : 6 = 7,5 ; 60 : 8 = 7,5', 'Oui, le coefficient est 7,5 L par minute.') + cm1Redac('En 10 min', '10 × 7,5 = 75', 'En 10 minutes, la cuve reçoit 75 L.') },
    ] },
  { titre: 'Échelles et vitesses', duree: '40 min',
    attendus: ['Utiliser une échelle de carte ou de plan', 'Calculer une distance ou une durée à vitesse constante', 'Convertir pour utiliser la proportionnalité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Plan à l\'échelle 1/100 (1 cm sur le plan représente 100 cm en réalité).',
        ...rmp([['4 cm sur le plan → @ m en réalité', 4], ['7,5 cm sur le plan → @ m', 7.5], ['3 m en réalité → @ cm sur le plan', 3], ['12 m en réalité → @ cm sur le plan', 12]], 2) },
      { etoiles: 2, col: 1, consigne: 'Carte à l\'échelle 1/50 000 (1 cm représente 50 000 cm, soit 500 m).',
        ...rmp([['2 cm sur la carte → @ m', 1000], ['6 cm sur la carte → @ km', 3], ['5 km en réalité → @ cm sur la carte', 10]], 3) },
      { etoiles: 2, col: 1, consigne: 'Un cycliste roule à vitesse constante : 18 km par heure.',
        ...rmp([['En 2 h, il parcourt @ km', 36], ['En 30 min, il parcourt @ km', 9], ['En 15 min, il parcourt @ km', 4.5], ['Pour 54 km, il met @ h', 3]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'échelle correspondant à la situation.',
        ...chx([['1 cm représente 1 km :', '1/100 000', '1/1 000 · 1/100 000'], ['1 cm représente 10 m :', '1/1 000', '1/10 · 1/1 000'], ['1 cm représente 1 m :', '1/100', '1/100 · 1/1 000']]) },
      { etoiles: 2, col: 1, consigne: 'Une maquette d\'avion est à l\'échelle 1/50.',
        ...rmp([['L\'avion mesure 30 m : la maquette mesure @ cm', 60], ['La maquette a 40 cm d\'envergure : l\'avion a @ m d\'envergure', 20]], 3) },
      { etoiles: 2, col: 1, consigne: 'Convertis la durée, puis calcule la distance (vitesse : 60 km par heure).',
        ...rmp([['45 min = @ h', 0.75], ['Distance en 45 min : @ km', 45], ['1 h 20 min : distance @ km', 80]], 3) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur une carte à l\'échelle 1/25 000, deux villages sont à 8 cm l\'un de l\'autre. Quelle est la distance réelle en km ?',
        corr: cm1Redac('Distance réelle', '8 × 25 000 = 200 000 cm = 2 000 m = 2 km', 'Les deux villages sont à 2 km l\'un de l\'autre.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un train roule à vitesse constante et parcourt 240 km en 2 h. Combien de temps lui faut-il pour parcourir 420 km ?',
        corr: cm1Redac('Vitesse', '240 : 2 = 120', 'Le train parcourt 120 km par heure.') + cm1Redac('Durée', '420 : 120 = 3,5', 'Il lui faut 3,5 h, soit 3 h 30 min.') },
    ] },
  { titre: 'Problèmes de proportionnalité', duree: '45 min',
    attendus: ['Choisir une méthode (coefficient, linéarité, unité)', 'Organiser les données dans un tableau', 'Rédiger une solution complète'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule.',
        ...rmp([['3 places de cinéma coûtent 27 €. 7 places coûtent @ €', 63], ['5 L d\'essence coûtent 9 €. 20 L coûtent @ €', 36], ['Un robot fait 12 pièces en 4 min. En 1 h, il en fait @', 180]], 3) },
      { etoiles: 2, col: 1, consigne: 'Recette de cookies pour 12 biscuits : 150 g de beurre, 200 g de sucre, 2 œufs.',
        ...rmp([['Beurre pour 30 biscuits : @ g', 375], ['Sucre pour 6 biscuits : @ g', 100], ['Œufs pour 36 biscuits : @', 6]], 3) },
      { etoiles: 2, col: 1, consigne: 'Proportionnel ou non ? Si oui, réponds ; sinon écris « non ».',
        ...rmp([['À 10 ans, Tom mesure 1,40 m. À 20 ans, il mesurera @ m', 'non'], ['Un paquet de 6 yaourts coûte 3 €. 18 yaourts coûtent @ €', 9], ['Une ampoule allumée 2 h consomme 0,2 kWh. En 5 h : @ kWh', 0.5]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne réponse.',
        ...chx([['8 croissants coûtent 9,60 €. 1 croissant coûte :', '1,20 €', '1,20 € · 1,60 €'], ['12 m de tissu coûtent 54 €. 4 m coûtent :', '18 €', '18 € · 27 €'], ['En 3 h, une voiture fait 210 km. En 1 h 30 :', '105 km', '105 km · 140 km']]) },
      { etoiles: 2, col: 1, consigne: 'Complète (consommation d\'une voiture : 6 L pour 100 km).', ...tabExo('Distance (km)', 'Essence (L)', [100, 50, 250, null], [6, null, null, 21], 0.06) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure (situations de proportionnalité).',
        ...ch([['Si 2 kg coûtent 5 €, alors 6 kg coûtent 15 € :', 'vrai'], ['Si 4 pains coûtent 6 €, alors 5 pains coûtent 7 € :', 'faux'], ['Si 10 L pèsent 10 kg, alors 3 L pèsent 3 kg :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Pour repeindre 15 m² de mur, il faut 2 pots de peinture. Combien de pots faut-il pour 52,5 m² ? Un pot coûte 23 € : quel est le prix total ?',
        corr: cm1Redac('Pots', '52,5 : 15 = 3,5 et 3,5 × 2 = 7', 'Il faut 7 pots de peinture.') + cm1Redac('Prix', '7 × 23 = 161', 'Le prix total est 161 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une imprimante imprime 45 pages en 3 minutes. Combien de pages en 20 minutes ? Combien de temps pour imprimer 420 pages ?',
        corr: cm1Redac('Pages par minute', '45 : 3 = 15', '') + cm1Redac('Réponses', { suite: ['En 20 min : 20 × 15 = 300 pages.', 'Pour 420 pages : 420 : 15 = 28 minutes.'] }, 'Elle imprime 300 pages en 20 minutes et 420 pages en 28 minutes.') },
    ] },
];
})();

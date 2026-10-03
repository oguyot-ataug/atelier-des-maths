/* ============================================================
   CHAPITRE : Périmètres (CM1, M2, période 3)
   Programme du cycle 3 (CM1) : notion de longueur du contour d'une figure ; comparer des
   périmètres (avec ou sans mesure, report au compas) ; calculer le périmètre d'un polygone en
   ajoutant les longueurs de ses côtés ; périmètre du carré et du rectangle (formules en mots).
   Les longueurs doivent être exprimées dans la même unité. Le périmètre du cercle est en 6e.
   ============================================================ */
(() => {
function polygone(){
  const P = [[40, 150], [60, 40], [200, 20], [270, 120], [170, 170]], L = ['4 cm', '5 cm', '4 cm', '3 cm', '4 cm'];
  let s = `<svg viewBox="0 0 310 200" style="width:100%;max-width:340px;display:block;margin:0 auto;"><polygon points="${P.map(p => p.join(',')).join(' ')}" fill="#2EA8C9" fill-opacity=".12" stroke="#E35D3A" stroke-width="3"/>`;
  P.forEach((p, i) => { const q = P[(i + 1) % P.length], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, cx = 150, cy = 100, d = Math.hypot(mx - cx, my - cy);
    s += `<text x="${mx + (mx - cx) / d * 18}" y="${my + (my - cy) / d * 18 + 4}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="600">${L[i]}</text>`; });
  'ABCDE'.split('').forEach((n, i) => { const [x, y] = P[i]; s += `<circle cx="${x}" cy="${y}" r="3.5" fill="#1F3A5C"/>`; });
  return s + '</svg>';
}
function rect(l, L, u, c){
  const k = 36, W = L * k, H = l * k;
  return `<svg viewBox="0 0 ${W + 70} ${H + 50}" style="width:${W + 70}px;max-width:100%;display:inline-block;vertical-align:middle;"><rect x="35" y="15" width="${W}" height="${H}" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="3"/>
  <text x="${35 + W / 2}" y="${H + 38}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk">${L} ${u}</text><text x="${W + 42}" y="${15 + H / 2 + 4}" font-size="13" fill="#1F3A5C" font-family="Space Grotesk">${l} ${u}</text></svg>`;
}
// Polygone (points en pixels) avec la longueur de chaque côté écrite à l'extérieur ('' : rien).
function polyFig(P, L, opts){
  opts = opts || {}; const xs = P.map(p => p[0]), ys = P.map(p => p[1]), x0 = Math.min(...xs) - 40, y0 = Math.min(...ys) - 24, W = Math.max(...xs) - x0 + 40, H = Math.max(...ys) - y0 + 26;
  const cx = xs.reduce((a, b) => a + b) / P.length, cy = ys.reduce((a, b) => a + b) / P.length;
  let s = `<svg viewBox="${x0} ${y0} ${W} ${H}" style="width:${opts.largeur || Math.min(W, 220)}px;max-width:100%;display:inline-block;vertical-align:middle;"><polygon points="${P.map(p => p.join(',')).join(' ')}" fill="${opts.c || '#2EA8C9'}" fill-opacity=".12" stroke="${opts.trait || '#E35D3A'}" stroke-width="2.5" stroke-linejoin="round"/>`;
  P.forEach((p, i) => { const q = P[(i + 1) % P.length], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, d = Math.hypot(mx - cx, my - cy) || 1;
    if(L[i]) s += `<text x="${(mx + (mx - cx) / d * 22).toFixed(1)}" y="${(my + (my - cy) / d * 16 + 4).toFixed(1)}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${L[i]}</text>`; });
  return s + '</svg>';
}
const regPts = (n, r) => Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + Math.PI / n + 2 * Math.PI * i / n; return [+(r + r * Math.cos(a)).toFixed(1), +(r + r * Math.sin(a)).toFixed(1)]; });
const regFig = (n, lab) => polyFig(regPts(n, 46), Array.from({ length: n }, (_, i) => i === Math.floor(n / 2) - (n % 2 ? 0 : 1) ? lab : ''), { largeur: 120, c: '#7A4FC0' });
const rectFig = (w, h, lw, lh, o) => polyFig([[0, 0], [w, 0], [w, h], [0, h]], ['', lh, lw, ''], o);
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
// Figures sur quadrillage (planches) : le contour en trait épais.
const quadP = (w, h, cases, o) => cm1Quad(w, h, cases, Object.assign({ k: 16, contour: '#E35D3A', c: '#2EA8C9' }, o || {}));
const FP = { A: cm1Rect(1, 1, 3, 2), B: [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3]], C: [[1, 1], [2, 1], [3, 1], [2, 2], [2, 3]] };
const quadEx = (rep) => plGrille(Object.entries(FP).map(([n, c]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${quadP(5, 5, c)}<span><b>${n}</b> : ${rep ? R(cm1QuadPerim(c)) : B(2)}</span></span>`), 3);
// Jardin carré avec un portail (correction illustrée).
function jardin(){
  return `<svg viewBox="0 0 200 150" style="width:170px;max-width:100%;display:block;"><rect x="40" y="20" width="110" height="110" fill="#8DB84A" fill-opacity=".25"/><path d="M110 130 L40 130 L40 20 L150 20 L150 130 L128 130" fill="none" stroke="#E35D3A" stroke-width="3"/><line x1="110" y1="130" x2="128" y2="130" stroke="#4E5665" stroke-width="2" stroke-dasharray="3 2"/>`
    + `<text x="119" y="146" font-size="11" text-anchor="middle" fill="#4E5665" font-family="Space Grotesk" font-weight="700">portail 1 m</text><text x="95" y="14" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">9 m</text><text x="160" y="80" font-size="13" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">9 m</text></svg>`;
}
cm1Chapitre({
  titre: 'Périmètres', slug: 'perimetres',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce que le périmètre ?')}
${cm1Def('Le <b>périmètre</b> d\'une figure est la <b>longueur de son contour</b> : c\'est la distance parcourue quand on fait le tour complet de la figure.')}
${cm1Rem('Imagine une fourmi qui part d\'un coin d\'une figure et en fait le tour en suivant les bords : la distance qu\'elle parcourt est le périmètre.')}

${cm1AnimPerimetre('cm1-perim')}

${cm1Lecon(2, 'Périmètre d\'un polygone')}
${cm1Regle('Pour calculer le périmètre d\'un polygone, on <b>additionne les longueurs de tous ses côtés</b>, exprimées dans la <b>même unité</b>.')}
<div class="figure-wrap">${polygone()}</div>
${cm1Exemple('Périmètre de ce pentagone (polygone à 5 côtés) :', ['4 cm + 5 cm + 4 cm + 3 cm + 4 cm = <b>20 cm</b>.'])}
${cm1Astuce('Si les longueurs ne sont pas dans la même unité, on convertit d\'abord : 2 m et 50 cm → 200 cm et 50 cm.')}

${cm1Lecon(3, 'Périmètre du carré et du rectangle')}
<div class="figure-wrap" style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center;align-items:center;">${rect(3, 3, 'cm', '#7A4FC0')}${rect(2, 5, 'cm', '#2E9C6A')}</div>
${cm1Regle('<b>Carré</b> : ses 4 côtés ont la même longueur.<br>Périmètre du carré = <b>4 × côté</b>. &nbsp; Ici : 4 × 3 cm = <b>12 cm</b>.', 'Carré')}
${cm1Regle('<b>Rectangle</b> : il a 2 longueurs et 2 largeurs.<br>Périmètre du rectangle = <b>2 × longueur + 2 × largeur</b> = <b>2 × (longueur + largeur)</b>.<br>Ici : 2 × 5 cm + 2 × 2 cm = 10 cm + 4 cm = <b>14 cm</b>.', 'Rectangle')}

${cm1Lecon(4, 'Comparer des périmètres')}
${cm1Regle('Pour comparer deux périmètres sans les calculer, on peut <b>reporter les côtés</b> bout à bout sur une droite, avec un <b>compas</b> ou une bande de papier : le contour le plus long est celui qui a le plus grand périmètre.')}
${ce2AnimReport('cm1-pe-report')}
${cm1Astuce('Deux figures peuvent avoir le même périmètre sans avoir la même forme : un carré de 4 cm de côté et un rectangle de 6 cm sur 2 cm ont tous les deux un périmètre de 16 cm.')}
`,
  methode: `
${cm1Demo('pe-rect', 'Calculer le périmètre d\'un rectangle', 'Un jardin rectangulaire mesure 12 m de long et 7 m de large. Quel est son périmètre ?')}
${cm1Demo('pe-unite', 'Calculer un périmètre avec des unités différentes', 'Un triangle a des côtés de 1 m, 45 cm et 80 cm. Quel est son périmètre ?')}
`,
  demos: [
    ['pe-rect', [
      { expr: 'Longueur : 12 m ; largeur : 7 m', note: 'On repère les dimensions. Elles sont dans la même unité (le mètre).' },
      { expr: '2 × 12 m = 24 m', note: 'Il y a deux longueurs.' },
      { expr: '2 × 7 m = 14 m', note: 'Il y a deux largeurs.' },
      { expr: '24 m + 14 m = 38 m', note: 'On additionne : le périmètre du jardin est 38 m.' },
    ]],
    ['pe-unite', [
      { expr: '1 m = 100 cm', note: 'Les longueurs ne sont pas dans la même unité : on convertit 1 m en centimètres.' },
      { expr: '100 cm + 45 cm + 80 cm', note: 'On additionne les trois côtés.' },
      { expr: '= 225 cm', note: 'Le périmètre du triangle est 225 cm, c\'est-à-dire 2 m 25 cm.' },
    ]],
  ],
  exos: cm1Exos('pe', [
    ['Calcule le périmètre d\'un triangle dont les côtés mesurent 6 cm, 8 cm et 10 cm.',
      cm1Redac('Périmètre du triangle', { nom: 'P', lignes: ['6 cm + 8 cm + 10 cm', '24 cm'] }, 'Le périmètre du triangle est 24 cm.', polyFig([[0, 120], [90, 0], [160, 120]], ['8 cm', '6 cm', '10 cm'], { largeur: 180 }) + cm1Paquets([[6, '6 cm'], [8, '8 cm'], [10, '10 cm']], { uni: true, L: 300, accolade: 'P = 24 cm' }))],
    ['Calcule le périmètre d\'un carré de 9 cm de côté.',
      cm1Redac('Périmètre du carré', '4 × 9 cm = 36 cm', 'Le périmètre du carré est 36 cm.', cm1Paquets([[9, '9 cm'], [9, '9 cm'], [9, '9 cm'], [9, '9 cm']], { uni: true, L: 300, accolade: '4 côtés de 9 cm' }))],
    ['Calcule le périmètre d\'un rectangle de 15 cm de long et 6 cm de large.',
      cm1Redac('Périmètre du rectangle', { nom: 'P', lignes: ['2 × 15 cm + 2 × 6 cm', '30 cm + 12 cm', '42 cm'] }, 'Le périmètre du rectangle est 42 cm.', rectFig(150, 60, '15 cm', '6 cm', { largeur: 200 }) + cm1Paquets([[15, '15 cm'], [6, '6 cm', '', '#FBE0D6'], [15, '15 cm'], [6, '6 cm', '', '#FBE0D6']], { L: 320, accolade: 'P = 42 cm' }))],
    ['Un hexagone a ses 6 côtés de 5 cm. Quel est son périmètre ?',
      cm1Redac('Périmètre de l\'hexagone', '6 × 5 cm = 30 cm', 'Le périmètre de l\'hexagone est 30 cm.')],
    ['Un carré a un périmètre de 28 cm. Combien mesure son côté ?',
      cm1Redac('Côté du carré', { suite: ['4 × 7 = 28', '28 ÷ 4 = 7'] }, 'Le côté du carré mesure 7 cm.', cm1Paquets([[7, '?'], [7, '?'], [7, '?'], [7, '?']], { uni: true, L: 300, accolade: 'P = 28 cm' }))],
    ['Calcule le périmètre d\'un rectangle de 2 m de long et 60 cm de large.',
      cm1Redac('Longueur en cm', '2 m = 200 cm', 'On met les deux longueurs dans la même unité.')
      + cm1Redac('Périmètre du rectangle', { nom: 'P', lignes: ['2 × 200 cm + 2 × 60 cm', '400 cm + 120 cm', '520 cm'] }, 'Le périmètre est 520 cm, c\'est-à-dire 5 m 20 cm.', rectFig(200, 60, '2 m = 200 cm', '60 cm', { largeur: 230 }))],
    ['On veut entourer un enclos rectangulaire de 25 m sur 18 m avec du grillage. Quelle longueur de grillage faut-il ?',
      cm1Redac('Longueur de grillage', { nom: 'P', lignes: ['2 × 25 m + 2 × 18 m', '50 m + 36 m', '86 m'] }, 'Il faut 86 m de grillage.', rectFig(150, 108, '25 m', '18 m', { largeur: 190, c: '#8DB84A' }))],
    ['Trace deux figures différentes ayant chacune un périmètre de 20 carreaux sur ton cahier.',
      cm1Redac('Un carré', '5 + 5 + 5 + 5 = 20', 'Un carré de 5 carreaux de côté a un périmètre de 20 carreaux.', cm1Quad(17, 7, cm1Rect(1, 1, 5, 5).concat(cm1Rect(8, 2, 7, 3)), { k: 16, contour: '#E35D3A' }))
      + cm1Redac('Un rectangle', '7 + 3 + 7 + 3 = 20', 'Un rectangle de 7 carreaux sur 3 carreaux a aussi un périmètre de 20 carreaux.')],
  ], { titre: 'Rédaction type : « Périmètre d\'un rectangle »', lignes: [['P = 2 × 8 cm + 2 × 3 cm', 'J\'écris le calcul : 2 longueurs et 2 largeurs.'], ['P = 16 cm + 6 cm = 22 cm', 'Je calcule.'], ['Le périmètre est 22 cm.', 'Je conclus avec l\'unité.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les arpenteurs', [
    'Le mot <b>périmètre</b> vient du grec : <i>peri</i> veut dire « autour » et <i>metron</i> veut dire « mesure ». C\'est donc « la mesure autour ».',
    'Dans l\'Égypte ancienne, chaque année, les crues du Nil effaçaient les limites des champs. Des <b>arpenteurs</b>, appelés « tendeurs de cordes », les retraçaient avec des cordes à nœuds régulièrement espacés, pour mesurer le tour des champs.',
  ]),
  // Planches d'exercices imprimables (planches.js), aussi faisables à l'écran (planches-num.js).
  planches: [
    { titre: 'Le périmètre d\'une figure', duree: '30 min',
      attendus: ['Comprendre le périmètre comme la longueur du contour', 'Calculer le périmètre d\'un polygone en ajoutant les longueurs de ses côtés'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Quel est le périmètre de chaque figure, en côtés de carreau ?', eleve: quadEx(), corr: quadEx(1) },
        { etoiles: 1, col: 1, consigne: 'Calcule le périmètre de chaque polygone.',
          eleve: plGrille([polyFig([[0, 90], [70, 0], [130, 90]], ['5 cm', '4 cm', '6 cm'], { largeur: 140 }) + `<span>P = ${B()} cm</span>`, polyFig([[20, 0], [110, 0], [140, 80], [0, 80]], ['4 cm', '3 cm', '6 cm', '3 cm'], { largeur: 150 }) + `<span>P = ${B()} cm</span>`], 1),
          corr: plGrille([polyFig([[0, 90], [70, 0], [130, 90]], ['5 cm', '4 cm', '6 cm'], { largeur: 140 }) + `<span>P = ${R(15)} cm</span>`, polyFig([[20, 0], [110, 0], [140, 80], [0, 80]], ['4 cm', '3 cm', '6 cm', '3 cm'], { largeur: 150 }) + `<span>P = ${R(16)} cm</span>`], 1) },
        { etoiles: 2, col: 1, consigne: 'Calcule le périmètre.',
          eleve: plListe(['un carré de 6 cm de côté : %1 cm', 'un carré de 15 m de côté : %1 m', 'un rectangle de 8 cm sur 3 cm : %1 cm', 'un rectangle de 20 m sur 12 m : %1 m'].map(t => t.replace('%1', B()))),
          corr: plListe([['un carré de 6 cm de côté : ', 24, ' cm'], ['un carré de 15 m de côté : ', 60, ' m'], ['un rectangle de 8 cm sur 3 cm : ', 22, ' cm'], ['un rectangle de 20 m sur 12 m : ', 64, ' m']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 2, col: 1, consigne: `Observe ces deux figures.<div style="display:flex;gap:16px;align-items:flex-end;margin:3px 0;"><span style="text-align:center;">${quadP(6, 3, cm1Rect(1, 1, 4, 1))}<br><b>A</b></span><span style="text-align:center;">${quadP(4, 4, cm1Rect(1, 1, 2, 2))}<br><b>B</b></span></div>`,
          eleve: plListe(['Le plus grand périmètre : <b>A · B</b>', 'Ont-elles la même aire ? <b>oui · non</b>']),
          corr: plListe([`Le plus grand périmètre : ${plEntoure('A')} (10 contre 8)`, `Ont-elles la même aire ? ${plEntoure('oui')} (4 carreaux)`]) },
        { etoiles: 2, consigne: 'Tous les côtés de chaque polygone ont la même longueur. Calcule son périmètre.',
          eleve: plGrille([[6, '4 cm'], [5, '5 cm'], [8, '3 cm']].map(([n, l]) => `<span style="display:flex;flex-direction:column;align-items:center;">${regFig(n, l)}<span>P = ${B(3)} cm</span></span>`), 3),
          corr: plGrille([[6, '4 cm', 24], [5, '5 cm', 25], [8, '3 cm', 24]].map(([n, l, p]) => `<span style="display:flex;flex-direction:column;align-items:center;">${regFig(n, l)}<span>P = ${R(p)} cm</span></span>`), 3) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un jardin carré a 9 m de côté. On l\'entoure d\'une clôture, en laissant un portail de 1 m. Quelle longueur de clôture faut-il ?',
          corr: cm1Redac('Périmètre du jardin', '4 × 9 m = 36 m', '') + cm1Redac('Longueur de clôture', '36 m − 1 m = 35 m', 'Il faut 35 m de clôture.', jardin()) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier, dessine deux figures différentes qui ont chacune un périmètre de 12 carreaux.',
          corr: cm1Redac('Deux figures de périmètre 12', { suite: ['rectangle de 4 sur 2 : 4 + 2 + 4 + 2 = 12', 'carré de 3 sur 3 : 3 + 3 + 3 + 3 = 12'] }, 'Les deux figures ont un périmètre de 12 carreaux.', cm1Quad(11, 5, cm1Rect(1, 1, 4, 2).concat(cm1Rect(7, 1, 3, 3)), { k: 14, contour: '#E35D3A' })) },
      ] },
    { titre: 'Périmètre du carré et du rectangle', duree: '35 min',
      attendus: ['Calculer le périmètre d\'un carré et d\'un rectangle', 'Exprimer les longueurs dans la même unité avant de calculer'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Calcule le périmètre en centimètres (attention aux unités).',
          eleve: plListe(['un triangle de côtés 1 m, 60 cm et 80 cm : %1 cm', 'un carré de 50 cm de côté : %1 cm', 'un rectangle de 1 m sur 40 cm : %1 cm'].map(t => t.replace('%1', B()))),
          corr: plListe([['un triangle de côtés 1 m, 60 cm et 80 cm : ', 240], ['un carré de 50 cm de côté : ', 200], ['un rectangle de 1 m sur 40 cm : ', 280]].map(([a, b]) => a + R(b) + ' cm')) },
        { etoiles: 2, col: 1, consigne: 'Retrouve la longueur qui manque.',
          eleve: plListe(['carré, P = 20 cm : côté %1 cm', 'carré, P = 36 m : côté %1 m', 'rectangle, P = 30 cm, longueur 10 cm : largeur %1 cm', 'rectangle, P = 24 cm, largeur 4 cm : longueur %1 cm'].map(t => t.replace('%1', B(3)))),
          corr: plListe([['carré, P = 20 cm : côté ', 5, ' cm'], ['carré, P = 36 m : côté ', 9, ' m'], ['rectangle, P = 30 cm, longueur 10 cm : largeur ', 5, ' cm'], ['rectangle, P = 24 cm, largeur 4 cm : longueur ', 8, ' cm']].map(([a, b, c]) => a + R(b) + c)) },
        { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.',
          eleve: plListe(['Le périmètre se mesure en cm². <b>vrai · faux</b>', 'Le périmètre d\'un carré de 5 cm de côté est 20 cm. <b>vrai · faux</b>', 'Périmètre du rectangle = longueur + largeur. <b>vrai · faux</b>', 'Deux figures différentes peuvent avoir le même périmètre. <b>vrai · faux</b>']),
          corr: plListe([['Le périmètre se mesure en cm². ', 'faux'], ['Le périmètre d\'un carré de 5 cm de côté est 20 cm. ', 'vrai'], ['Périmètre du rectangle = longueur + largeur. ', 'faux'], ['Deux figures différentes peuvent avoir le même périmètre. ', 'vrai']].map(([t, r]) => t + plEntoure(r))) },
        { etoiles: 2, col: 1, consigne: `Voici le plan d'une table rectangulaire.<div style="margin:2px 0;">${rectFig(150, 90, '1 m 20 cm', '80 cm', { largeur: 180, c: '#C9A24A' })}</div>`,
          eleve: plListe([`Périmètre : ${B()} cm`, `soit ${B(2)} m`]),
          corr: plListe([`Périmètre : ${R(400)} cm`, `soit ${R(4)} m`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Une fourmi fait 3 fois le tour d\'un carré de 12 cm de côté. Quelle distance parcourt-elle ?',
          corr: cm1Redac('Distance parcourue', { suite: ['4 × 12 cm = 48 cm', '3 × 48 cm = 144 cm'] }, 'La fourmi parcourt 144 cm, soit 1 m 44 cm.', cm1Paquets([[48, '1 tour'], [48, '1 tour'], [48, '1 tour']], { uni: true, L: 280, accolade: '3 × 48 cm = 144 cm' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un cadre photo rectangulaire mesure 30 cm sur 20 cm. Une baguette de bois de 1 m suffit-elle pour en faire le tour ?',
          corr: cm1Redac('Périmètre du cadre', '2 × 30 cm + 2 × 20 cm = 100 cm', 'Le périmètre est 100 cm = 1 m : la baguette suffit, tout juste.', cm1Paquets([[30, '30 cm'], [20, '20', '', '#FBE0D6'], [30, '30 cm'], [20, '20', '', '#FBE0D6']], { L: 280, accolade: '100 cm = 1 m' })) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un rectangle a un périmètre de 40 cm. Sa longueur mesure 12 cm. Combien mesure sa largeur ?',
          corr: cm1Redac('Largeur du rectangle', { suite: ['2 × 12 cm = 24 cm', '40 cm − 24 cm = 16 cm', '16 cm ÷ 2 = 8 cm'] }, 'La largeur du rectangle mesure 8 cm.', cm1Paquets([[12, '12 cm'], [8, '?', '', '#FBE0D6'], [12, '12 cm'], [8, '?', '', '#FBE0D6']], { L: 280, accolade: 'P = 40 cm' })) },
      ] },
  ],
  quiz: [
    { q: 'Le périmètre d\'une figure, c\'est…', opts: ['la surface à l\'intérieur', 'la longueur de son contour', 'le nombre de côtés'], correct: 1 },
    { q: 'Périmètre d\'un carré de 5 cm de côté ?', opts: ['10 cm', '20 cm', '25 cm'], correct: 1 },
    { q: 'Périmètre d\'un rectangle de 6 cm sur 4 cm ?', opts: ['10 cm', '20 cm', '24 cm'], correct: 1 },
  ],
});
})();

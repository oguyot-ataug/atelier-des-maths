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
cm1Chapitre({
  titre: 'Périmètres', slug: 'perimetres',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce que le périmètre ?')}
${cm1Def('Le <b>périmètre</b> d\'une figure est la <b>longueur de son contour</b> : c\'est la distance parcourue quand on fait le tour complet de la figure.')}
${cm1Rem('Imagine une fourmi qui part d\'un coin d\'une figure et en fait le tour en suivant les bords : la distance qu\'elle parcourt est le périmètre.')}

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
    ['Calcule le périmètre d\'un triangle dont les côtés mesurent 6 cm, 8 cm et 10 cm.', '6 + 8 + 10 = 24. Le périmètre est 24 cm.'],
    ['Calcule le périmètre d\'un carré de 9 cm de côté.', '4 × 9 = 36. Le périmètre est 36 cm.'],
    ['Calcule le périmètre d\'un rectangle de 15 cm de long et 6 cm de large.', '2 × 15 + 2 × 6 = 30 + 12 = 42. Le périmètre est 42 cm.'],
    ['Un hexagone (6 côtés) a tous ses côtés de 5 cm. Quel est son périmètre ?', '6 × 5 = 30. Le périmètre est 30 cm.'],
    ['Un carré a un périmètre de 28 cm. Combien mesure son côté ?', '28 ÷ 4 = 7 (car 4 × 7 = 28). Le côté mesure 7 cm.'],
    ['Calcule le périmètre d\'un rectangle de 2 m de long et 60 cm de large.', '2 m = 200 cm. 2 × 200 + 2 × 60 = 400 + 120 = 520 cm (soit 5 m 20 cm).'],
    ['Problème : on veut entourer un enclos rectangulaire de 25 m sur 18 m avec du grillage. Quelle longueur de grillage faut-il ?', '2 × 25 + 2 × 18 = 50 + 36 = 86. Il faut 86 m de grillage.'],
    ['Trace deux figures différentes ayant chacune un périmètre de 20 carreaux sur ton cahier.', 'Par exemple un carré de 5 carreaux de côté, et un rectangle de 7 carreaux sur 3 carreaux (7 + 3 + 7 + 3 = 20).'],
  ], { titre: 'Rédaction type : « Périmètre d\'un rectangle »', lignes: [['P = 2 × 8 cm + 2 × 3 cm', 'J\'écris le calcul : 2 longueurs et 2 largeurs.'], ['P = 16 cm + 6 cm = 22 cm', 'Je calcule.'], ['Le périmètre est 22 cm.', 'Je conclus avec l\'unité.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les arpenteurs', [
    'Le mot <b>périmètre</b> vient du grec : <i>peri</i> veut dire « autour » et <i>metron</i> veut dire « mesure ». C\'est donc « la mesure autour ».',
    'Dans l\'Égypte ancienne, chaque année, les crues du Nil effaçaient les limites des champs. Des <b>arpenteurs</b>, appelés « tendeurs de cordes », les retraçaient avec des cordes à nœuds régulièrement espacés, pour mesurer le tour des champs.',
  ]),
  quiz: [
    { q: 'Le périmètre d\'une figure, c\'est…', opts: ['la surface à l\'intérieur', 'la longueur de son contour', 'le nombre de côtés'], correct: 1 },
    { q: 'Périmètre d\'un carré de 5 cm de côté ?', opts: ['10 cm', '20 cm', '25 cm'], correct: 1 },
    { q: 'Périmètre d\'un rectangle de 6 cm sur 4 cm ?', opts: ['10 cm', '20 cm', '24 cm'], correct: 1 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Angle droit, cercle et constructions (CE2, G3, période 3)
   Programme du cycle 2 (CE2), géométrie plane : angle droit, angle aigu, angle obtus ; vérifier
   un angle droit avec l'équerre ; codage ; cercle, disque, centre, rayon, diamètre ; tracer au
   compas ; construire sur papier uni un rectangle 7 cm × 3 cm, un triangle rectangle (10 cm et
   4 cm), un carré de 6 cm avec un cercle de rayon 4 cm centré en un sommet.
   ============================================================ */
(() => {
const svg = (w, h, c) => `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;max-width:100%;display:inline-block;vertical-align:middle;margin:6px;">${c}</svg>`;
const T = 'stroke="#1F3A5C" stroke-width="2.4" stroke-linecap="round"';
// Angle de sommet (75, 100), premier côté horizontal, second côté à « deg » degrés.
function angle(deg, coul, carre){
  const S = [75, 100], L = 100, a = deg * Math.PI / 180, B = [S[0] + L * Math.cos(a), S[1] - L * Math.sin(a)];
  let s = `<line x1="${S[0]}" y1="${S[1]}" x2="${S[0] + L}" y2="${S[1]}" ${T}/><line x1="${S[0]}" y1="${S[1]}" x2="${B[0]}" y2="${B[1]}" ${T}/>`;
  if(carre) s += `<path d="M${S[0] + 14} ${S[1]} V${S[1] - 14} H${S[0]}" fill="none" stroke="#E35D3A" stroke-width="2"/>`;
  else s += `<path d="M${S[0] + 22} ${S[1]} A22 22 0 0 0 ${S[0] + 22 * Math.cos(a)} ${S[1] - 22 * Math.sin(a)}" fill="${coul}" fill-opacity=".3" stroke="${coul}" stroke-width="2"/>`;
  return svg(190, 112, s);
}
const fig = (titre, contenu) => `<div style="display:inline-block;text-align:center;margin:4px 10px;">${contenu}<div class="hint" style="margin:0;">${titre}</div></div>`;
const CERCLE = svg(240, 200, `<circle cx="110" cy="100" r="80" fill="#2EA8C9" fill-opacity=".12" stroke="#1F3A5C" stroke-width="2.4"/>`
  + `<line x1="110" y1="100" x2="${110 + 80 * Math.cos(-0.7)}" y2="${100 + 80 * Math.sin(-0.7)}" stroke="#E35D3A" stroke-width="2.2"/><text x="112" y="62" font-size="13" fill="#E35D3A" font-weight="700">rayon</text>`
  + `<line x1="30" y1="100" x2="190" y2="100" stroke="#2E9C6A" stroke-width="2.2"/><text x="70" y="120" font-size="13" fill="#2E9C6A" font-weight="700">diamètre</text>`
  + `<path d="M106 96 L114 104 M106 104 L114 96" stroke="#1F3A5C" stroke-width="2"/><text x="100" y="92" font-size="13" fill="#1F3A5C" font-weight="700">O</text>`);
// Rectangle de 7 cm × 3 cm (échelle 30 px/cm) avec ses codages.
const RECT = svg(290, 130, `<rect x="20" y="20" width="210" height="90" fill="#2E9C6A" fill-opacity=".12" stroke="#1F3A5C" stroke-width="2.4"/>`
  + [[20, 20, 1, 1], [230, 20, -1, 1], [230, 110, -1, -1], [20, 110, 1, -1]].map(([x, y, dx, dy]) => `<path d="M${x + 12 * dx} ${y} V${y + 12 * dy} H${x}" fill="none" stroke="#E35D3A" stroke-width="1.8"/>`).join('')
  + `<text x="125" y="14" font-size="13" text-anchor="middle" fill="#1F3A5C">7 cm</text><text x="240" y="70" font-size="13" fill="#1F3A5C">3 cm</text>`);
cm1Chapitre({
  niveau: 'ce2', titre: 'Angle droit, cercle et constructions', slug: 'angle-droit-cercle',
  cours: `
${cm1Lecon(1, 'Les angles')}
${cm1Def('Deux côtés qui partent d\'un même sommet forment un <b>angle</b>. L\'<b>équerre</b> a un <b>angle droit</b> : c\'est le « coin » de l\'équerre.')}
<div class="figure-wrap" style="text-align:center;">${fig('un angle <b>droit</b>', angle(90, '#E35D3A', true))}${fig('un angle <b>aigu</b> : plus petit qu\'un angle droit', angle(45, '#2EA8C9'))}${fig('un angle <b>obtus</b> : plus grand qu\'un angle droit', angle(130, '#7A4FC0'))}</div>
${ce2AnimAngle('ce2-ac-angle')}
${cm1Regle('Pour <b>vérifier</b> un angle droit, on place le coin de l\'équerre sur le sommet et un côté de l\'équerre le long d\'un côté de l\'angle. Si l\'autre côté de l\'angle est contre l\'autre côté de l\'équerre, l\'angle est droit. On le <b>code</b> par un petit carré.')}

${cm1Lecon(2, 'Le cercle')}
${cm1Def(`<ul style="margin:0;padding-left:20px;line-height:1.8;"><li>Le <b>cercle</b> est la ligne que trace le compas. Tous ses points sont à la même distance d'un point, son <b>centre</b>.</li><li>Un <b>rayon</b> est un segment qui va du centre à un point du cercle.</li><li>Un <b>diamètre</b> est un segment qui passe par le centre et relie deux points du cercle : il mesure <b>2 rayons</b>.</li><li>Le <b>disque</b> est la surface à l'intérieur du cercle.</li></ul>`, 'Vocabulaire')}
<div class="figure-wrap" style="text-align:center;">${CERCLE}</div>
${cm1Regle('Pour tracer un cercle de <b>rayon 4 cm</b> : on écarte le compas de 4 cm sur la règle (pointe sur le 0, mine sur le 4), on pique la pointe sur le centre et on tourne sans changer l\'écartement.')}
${ce2AnimCompas('ce2-ac-compas', { presets: [{ nom: 'Rayon 3 cm', r: 3 }, { nom: 'Rayon 4 cm', r: 4 }, { nom: 'Rayon 5 cm', r: 5 }] })}

${cm1Lecon(3, 'Construire sur papier uni')}
${cm1Regle('Pour construire un <b>rectangle</b> de 7 cm sur 3 cm, on utilise la <b>règle</b> pour les longueurs et l\'<b>équerre</b> pour les angles droits.')}
<div class="figure-wrap" style="text-align:center;">${RECT}</div>
${cm1Astuce('On trace d\'abord <b>un côté</b>, puis les angles droits à ses extrémités avec l\'équerre, puis on reporte les longueurs, et on ferme la figure.')}
`,
  methode: `
${cm1Demo('ce2-ac-rect', 'Construire un rectangle de 7 cm sur 3 cm', 'Construis le rectangle ABCD de longueur 7 cm et de largeur 3 cm.')}
${cm1Demo('ce2-ac-tri', 'Construire un triangle rectangle', 'Construis un triangle rectangle dont les côtés de l\'angle droit mesurent 10 cm et 4 cm.')}
`,
  demos: [
    ['ce2-ac-rect', [
      { expr: 'Je trace le segment [AB] de 7 cm.', note: 'Le 0 de la règle sur A, B en face du 7.' },
      { expr: 'En A et en B, je trace un angle droit avec l\'équerre.', note: 'Le coin de l\'équerre sur le point, un côté le long du segment [AB].' },
      { expr: 'Sur ces deux traits, je place D et C à 3 cm de A et de B.', note: 'La largeur est 3 cm.' },
      { expr: 'Je trace le segment [DC], puis je vérifie : il mesure 7 cm ✔', note: 'Je code les 4 angles droits.' },
    ]],
    ['ce2-ac-tri', [
      { expr: 'Je trace un segment [AB] de 10 cm.', note: '' },
      { expr: 'En A, je trace un angle droit avec l\'équerre.', note: '' },
      { expr: 'Sur ce trait, je place C à 4 cm de A.', note: '' },
      { expr: 'Je trace le segment [BC] : le triangle ABC est rectangle en A.', note: 'Je code l\'angle droit en A.' },
    ]],
  ],
  exos: cm1Exos('ce2-ac', [
    ['Un angle est plus petit qu\'un angle droit. Comment s\'appelle-t-il ? Et s\'il est plus grand qu\'un angle droit ?',
      cm1Redac('Angle plus petit qu\'un angle droit', '', 'C\'est un angle aigu.') + cm1Redac('Angle plus grand qu\'un angle droit', '', 'C\'est un angle obtus.')],
    ['Un cercle a un rayon de 5 cm. Combien mesure son diamètre ?',
      cm1Redac('Diamètre du cercle', '5 cm + 5 cm = 10 cm', 'Le diamètre du cercle mesure 10 cm : c\'est 2 rayons.')],
    ['Un cercle a un diamètre de 8 cm. Quel écartement faut-il donner au compas pour le tracer ?',
      cm1Redac('Écartement du compas', '8 cm = 4 cm + 4 cm', 'L\'écartement est le rayon, la moitié du diamètre : il faut écarter le compas de 4 cm.')],
    ['Construis un carré de 6 cm de côté, puis un cercle de rayon 4 cm dont le centre est un sommet du carré.',
      cm1Redac('Construction', { suite: ['Je trace un côté de 6 cm.', 'Je trace les angles droits avec l\'équerre, puis les autres côtés de 6 cm.', 'J\'écarte le compas de 4 cm, je pique sur un sommet et je trace le cercle.'] }, 'J\'obtiens un carré de 6 cm de côté et un cercle de rayon 4 cm centré sur un de ses sommets.')],
    ['Cherche dans la classe trois angles droits.',
      cm1Redac('Angles droits de la classe', '', 'Par exemple : le coin d\'une feuille, le coin d\'une table, le coin d\'une fenêtre. Je vérifie chacun avec l\'équerre.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la corde à 13 nœuds', [
    'Pour faire des angles droits sans équerre, les bâtisseurs du Moyen Âge utilisaient une <b>corde à 13 nœuds</b>, régulièrement espacés. En la tendant pour former un triangle de 3, 4 et 5 intervalles, ils obtenaient un <b>angle droit</b> parfait pour construire les cathédrales.',
  ]),
  quiz: [
    { q: 'Un angle plus grand qu\'un angle droit est…', opts: ['aigu', 'obtus', 'droit'], correct: 1 },
    { q: 'Le diamètre d\'un cercle de rayon 3 cm mesure…', opts: ['3 cm', '6 cm', '9 cm'], correct: 1 },
    { q: 'Pour vérifier un angle droit, on utilise…', opts: ['le compas', 'l\'équerre', 'la gomme'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'Un angle plus petit qu\'un angle droit est…', r: ['droit', 'aigu', 'obtus', 'plat'], ok: 1 },
    { l: 2, q: 'Le diamètre d\'un cercle de rayon 4 cm mesure…', r: ['2 cm', '4 cm', '8 cm', '16 cm'], ok: 2 },
    { l: 2, q: 'Quel instrument trace un cercle ?', r: ['la règle', 'l\'équerre', 'le compas', 'la gomme'], ok: 2 },
    { l: 2, q: 'Le segment qui va du centre à un point du cercle est…', r: ['un diamètre', 'un rayon', 'un côté', 'une diagonale'], ok: 1 },
    { l: 1, q: 'Combien d\'angles droits a un rectangle ?', r: ['1', '2', '3', '4'], ok: 3 },
    { l: 1, q: 'Le coin d\'une feuille de papier forme un angle…', r: ['aigu', 'obtus', 'droit', 'plat'], ok: 2 },
    { l: 3, q: "Pour tracer un angle droit sur papier blanc, on utilise…", r: ["l'équerre", "le compas", "la gomme", "un verre"], ok: 0 },
    { l: 3, q: "Pour tracer un carré sur papier uni, il faut…", r: ["la règle et l'équerre", "le compas seul", "une gomme", "rien"], ok: 0 },
  ],
});
})();

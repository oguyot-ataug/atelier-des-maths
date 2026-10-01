/* ============================================================
   CHAPITRE : La symétrie (CE2, G4, période 4)
   Programme du cycle 2 (CE2) : reconnaître si une figure possède un ou plusieurs axes de symétrie
   (pliage, papier calque) ; repérer et tracer les axes sur des objets usuels (cœur, rectangle,
   panneaux routiers, lettres majuscules…) ; compléter une figure sur quadrillage ou papier pointé
   pour la rendre symétrique, l'axe étant vertical ou horizontal.
   ============================================================ */
(() => {
const svg = (w, h, c) => `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;max-width:100%;display:inline-block;vertical-align:middle;margin:6px;">${c}</svg>`;
const AXE = 'stroke="#E35D3A" stroke-width="2" stroke-dasharray="7 5"';
const fig = (titre, contenu) => `<div style="display:inline-block;text-align:center;margin:4px 10px;">${contenu}<div class="hint" style="margin:0;">${titre}</div></div>`;
const COEUR = svg(110, 110, `<path d="M55 95 C10 65 10 25 35 20 C47 18 55 28 55 36 C55 28 63 18 75 20 C100 25 100 65 55 95 Z" fill="#E35D3A" fill-opacity=".3" stroke="#1F3A5C" stroke-width="2"/><line x1="55" y1="5" x2="55" y2="105" ${AXE}/>`);
const RECT = svg(150, 110, `<rect x="20" y="25" width="110" height="60" fill="#2EA8C9" fill-opacity=".2" stroke="#1F3A5C" stroke-width="2"/><line x1="75" y1="8" x2="75" y2="102" ${AXE}/><line x1="5" y1="55" x2="145" y2="55" ${AXE}/>`);
const SENS = svg(110, 110, `<circle cx="55" cy="55" r="42" fill="#D62828" stroke="#1F3A5C" stroke-width="2"/><rect x="27" y="47" width="56" height="16" fill="#fff"/><line x1="55" y1="3" x2="55" y2="107" ${AXE}/><line x1="3" y1="55" x2="107" y2="55" ${AXE}/>`);
const lettre = (L, axes) => svg(80, 100, `<text x="40" y="80" font-size="80" font-weight="700" text-anchor="middle" fill="#1F3A5C" font-family="Arial, sans-serif">${L}</text>${axes.includes('v') ? `<line x1="40" y1="4" x2="40" y2="96" ${AXE}/>` : ''}${axes.includes('h') ? `<line x1="4" y1="51" x2="76" y2="51" ${AXE}/>` : ''}`);
// Quadrillage : cases de k px, n × m ; forme = liste de points [col, lig] ; axe vertical en colonne ax.
function quad(n, m, formes, ax, ay){
  const k = 24; let s = '';
  for(let i = 0; i <= n; i++) s += `<line x1="${i * k}" y1="0" x2="${i * k}" y2="${m * k}" stroke="#D5DBE3"/>`;
  for(let j = 0; j <= m; j++) s += `<line x1="0" y1="${j * k}" x2="${n * k}" y2="${j * k}" stroke="#D5DBE3"/>`;
  formes.forEach(([pts, c, tir]) => { s += `<polygon points="${pts.map(([x, y]) => x * k + ',' + y * k).join(' ')}" fill="${c}" fill-opacity=".3" stroke="${c}" stroke-width="2.4" ${tir ? 'stroke-dasharray="6 4"' : ''}/>`; });
  if(ax != null) s += `<line x1="${ax * k}" y1="-6" x2="${ax * k}" y2="${m * k + 6}" ${AXE}/>`;
  if(ay != null) s += `<line x1="-6" y1="${ay * k}" x2="${n * k + 6}" y2="${ay * k}" ${AXE}/>`;
  return `<svg viewBox="-8 -8 ${n * k + 16} ${m * k + 16}" style="width:${n * k + 16}px;max-width:100%;display:inline-block;vertical-align:middle;margin:6px;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'La symétrie', slug: 'symetrie',
  cours: `
${cm1Lecon(1, 'Un axe de symétrie')}
${cm1Def('Une figure a un <b>axe de symétrie</b> quand, en la <b>pliant</b> le long de cette droite, les deux parties se superposent exactement.')}
<div class="figure-wrap" style="text-align:center;">${fig('un cœur : 1 axe', COEUR)}${fig('un rectangle : 2 axes', RECT)}${fig('sens interdit : 2 axes', SENS)}</div>
${cm1Astuce('Les <b>diagonales</b> d\'un rectangle ne sont <b>pas</b> des axes de symétrie : si on plie le long d\'une diagonale, les deux moitiés ne se superposent pas. Essaie avec une feuille !')}
${cm1Sous('A', 'Des lettres symétriques')}
<div class="figure-wrap" style="text-align:center;">${fig('A : axe vertical', lettre('A', 'v'))}${fig('B : axe horizontal', lettre('B', 'h'))}${fig('H : 2 axes', lettre('H', 'vh'))}${fig('F : aucun axe', lettre('F', ''))}</div>

${cm1Lecon(2, 'Le pliage')}
${cm1AnimSymetrie('ce2-sym', { axes: ['vertical', 'horizontal'] })}

${cm1Lecon(3, 'Compléter une figure sur quadrillage')}
${cm1Regle('Pour compléter une figure par symétrie, chaque sommet a son <b>image de l\'autre côté de l\'axe</b>, <b>à la même distance</b> de l\'axe (on compte les carreaux), sur la même ligne du quadrillage.')}
${ce2AnimSymQuad('ce2-sy-quad-anim', { presets: [
  { nom: 'Sapin (axe vertical)', n: 10, m: 8, pts: [[5, 1], [5, 7], [2, 7], [4, 5], [2, 5]], axe: { v: 5 } },
  { nom: 'Drapeau (axe horizontal)', n: 8, m: 8, pts: [[2, 4], [2, 1], [6, 2], [3, 3], [3, 4]], axe: { h: 4 } },
  { nom: 'Flèche (axe vertical)', n: 10, m: 7, pts: [[1, 3], [3, 1], [3, 2], [4, 2], [4, 5], [3, 5], [3, 6]], axe: { v: 5 } }] })}
`,
  methode: `
${cm1Demo('ce2-sy-quad', 'Compléter une figure par symétrie (axe horizontal)', 'Complète le drapeau pour qu\'il soit symétrique par rapport à l\'axe horizontal.')}
`,
  demos: [
    ['ce2-sy-quad', [
      { expr: quad(8, 8, [[[[2, 4], [2, 1], [6, 2], [3, 3], [3, 4]], '#2EA8C9']], null, 4), note: 'La moitié du drapeau est au-dessus de l\'axe.' },
      { expr: 'Le sommet à 3 carreaux au-dessus de l\'axe → son image à 3 carreaux au-dessous.', note: 'On compte les carreaux, sur la même colonne.' },
      { expr: quad(8, 8, [[[[2, 4], [2, 1], [6, 2], [3, 3], [3, 4]], '#2EA8C9'], [[[2, 4], [2, 7], [6, 6], [3, 5], [3, 4]], '#2EA8C9', true]], null, 4), note: 'On relie les images dans le même ordre : la figure est symétrique.' },
    ]],
  ],
  exos: cm1Exos('ce2-sy', [
    ['Combien d\'axes de symétrie a un carré ?',
      cm1Redac('Axes du carré', { suite: ['2 axes qui passent par les milieux des côtés', '2 axes qui sont les diagonales'] }, 'Un carré a 4 axes de symétrie.')],
    ['Parmi les lettres M, N, T, S et V, lesquelles ont un axe de symétrie vertical ?',
      cm1Redac('Lettres avec un axe vertical', 'M, T et V se superposent quand on les plie de haut en bas.', 'Les lettres M, T et V ont un axe de symétrie vertical.')],
    ['Parmi les lettres C, D, E, K et Z, lesquelles ont un axe de symétrie horizontal ?',
      cm1Redac('Lettres avec un axe horizontal', 'C, D, E et K se superposent quand on les plie de gauche à droite.', 'Les lettres C, D, E et K ont un axe de symétrie horizontal.')],
    ['Les diagonales d\'un rectangle qui n\'est pas un carré sont-elles des axes de symétrie ?',
      cm1Redac('Diagonales du rectangle', 'Si on plie le long d\'une diagonale, les deux moitiés ne se superposent pas.', 'Non : un rectangle a seulement 2 axes de symétrie, qui passent par les milieux des côtés.')],
    ['Sur ton cahier, dessine la moitié d\'un papillon le long d\'un axe vertical, puis complète-le par symétrie.',
      cm1Redac('Méthode', { suite: ['Je compte les carreaux entre chaque sommet et l\'axe.', 'Je place l\'image de l\'autre côté, à la même distance, sur la même ligne.', 'Je relie les images dans le même ordre.'] }, 'Mon papillon est symétrique : si je plie le long de l\'axe, les deux ailes se superposent.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la symétrie dans la nature et l\'art', [
    'La <b>symétrie</b> est partout dans la nature : les ailes des papillons, les feuilles, le visage. Les architectes l\'utilisent depuis l\'Antiquité : la façade du château de <b>Versailles</b>, les temples grecs ou le <b>Taj Mahal</b> en Inde sont construits de part et d\'autre d\'un axe.',
  ]),
  quiz: [
    { q: 'Combien d\'axes de symétrie a un rectangle (pas carré) ?', opts: ['1', '2', '4'], correct: 1 },
    { q: 'Quelle lettre a un axe de symétrie vertical ?', opts: ['A', 'F', 'R'], correct: 0 },
    { q: 'Un point à 4 carreaux de l\'axe a son image à…', opts: ['4 carreaux de l\'axe', '8 carreaux de l\'axe', '2 carreaux de l\'axe'], correct: 0 },
  ],
  flash: [
    { q: 'Combien d\'axes de symétrie a un carré ?', r: ['1', '2', '4', '0'], ok: 2 },
    { q: 'Quelle lettre n\'a aucun axe de symétrie ?', r: ['A', 'H', 'F', 'O'], ok: 2 },
    { q: 'Quelle lettre a un axe horizontal ?', r: ['E', 'A', 'V', 'T'], ok: 0 },
    { q: 'Pour vérifier un axe de symétrie, on peut…', r: ['plier', 'mesurer un angle', 'colorier', 'compter les sommets'], ok: 0 },
    { q: 'Les diagonales d\'un rectangle (pas carré) sont-elles des axes de symétrie ?', r: ['Oui', 'Non'], ok: 1 },
    { q: 'Un point à 3 carreaux à gauche de l\'axe a son image…', r: ['3 carreaux à droite', '3 carreaux à gauche', '6 carreaux à droite', 'sur l\'axe'], ok: 0 },
  ],
});
})();

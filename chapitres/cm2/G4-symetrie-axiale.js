/* ============================================================
   CHAPITRE : Symétrie axiale (CM2, G4, période 4)
   Programme du cycle 3 (CM2) : construire, sur papier quadrillé, la figure symétrique d'une
   figure donnée par rapport à une droite verticale, horizontale OU une diagonale du quadrillage ;
   axes de symétrie des figures usuelles. Atelier : quadrillage 10 × 10 à compléter avec les trois
   types d'axes.
   ============================================================ */
(() => {
const N = 10, C = 28;
const AXES = {
  v: { nom: 'Axe vertical', sym: ([x, y]) => [N - 1 - x, y], cote: ([x]) => x < N / 2, modele: [[1, 2], [2, 2], [3, 2], [4, 2], [3, 3], [2, 4], [3, 4], [4, 5], [1, 6], [2, 7], [3, 7], [4, 7]] },
  h: { nom: 'Axe horizontal', sym: ([x, y]) => [x, N - 1 - y], cote: ([, y]) => y >= N / 2, modele: [[2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [3, 6], [5, 6], [3, 7], [4, 7], [5, 7], [7, 6], [7, 8], [1, 8]] },
  d: { nom: 'Axe diagonal', sym: ([x, y]) => [y, x], cote: ([x, y]) => y > x, modele: [[0, 3], [0, 4], [1, 4], [2, 4], [1, 5], [1, 6], [2, 7], [3, 7], [4, 8], [3, 9], [5, 9], [6, 8]] },
};
let sy = { a: 'v', col: new Set() };
const cle = p => p.join(',');
function dessiner(verif){
  const el = document.getElementById('c2sy-grille'); if(!el) return;
  const ax = AXES[sy.a], mod = new Set(ax.modele.map(cle)), att = new Set(ax.modele.map(p => cle(ax.sym(p))));
  let s = `<svg viewBox="0 0 ${N * C + 2} ${N * C + 2}" style="width:100%;max-width:${N * C + 2}px;display:block;margin:0 auto;">`;
  for(let y = 0; y < N; y++) for(let x = 0; x < N; x++){
    const k = cle([x, y]), cote = ax.cote([x, y]), surAxe = sy.a === 'd' && x === y; let f = '#fff';
    if(mod.has(k)) f = '#2EA8C9';
    else if(sy.col.has(k)) f = verif ? (att.has(k) ? '#2E9C6A' : '#E35D3A') : '#7A4FC0';
    else if(verif && att.has(k)) f = 'rgba(227,93,58,.25)';
    const clic = !cote && !surAxe;
    s += `<rect x="${1 + x * C}" y="${1 + y * C}" width="${C}" height="${C}" fill="${f}" stroke="#9BB0C4" stroke-width=".8" ${clic ? `style="cursor:pointer" onclick="c2SyCase(${x},${y})"` : ''}/>`;
  }
  const L = N * C + 1;
  s += sy.a === 'v' ? `<line x1="${1 + N / 2 * C}" y1="0" x2="${1 + N / 2 * C}" y2="${L + 1}" stroke="#E35D3A" stroke-width="3" stroke-dasharray="8 5"/>`
    : sy.a === 'h' ? `<line x1="0" y1="${1 + N / 2 * C}" x2="${L + 1}" y2="${1 + N / 2 * C}" stroke="#E35D3A" stroke-width="3" stroke-dasharray="8 5"/>`
    : `<line x1="1" y1="1" x2="${L}" y2="${L}" stroke="#E35D3A" stroke-width="3" stroke-dasharray="8 5"/>`;
  el.innerHTML = s + '</svg>';
  const m = document.getElementById('c2sy-msg');
  if(m && verif){
    const faux = [...sy.col].filter(k => !att.has(k)).length, manque = [...att].filter(k => !sy.col.has(k)).length;
    m.innerHTML = !faux && !manque ? '<b style="color:#2E9C6A;">Bravo, la figure est parfaitement symétrique !</b>' : `<span style="color:#8A2E1C;">${faux ? faux + ' case(s) en trop (en rouge). ' : ''}${manque ? manque + ' case(s) oubliée(s) (en rose).' : ''}</span>`;
  } else if(m) m.innerHTML = sy.a === 'd' ? 'Axe diagonal : une case et sa symétrique s\'échangent « ligne ↔ colonne ». Compte les carreaux perpendiculairement à la diagonale.' : 'Colorie les cases de l\'autre côté de l\'axe rouge.';
  document.querySelectorAll('.c2sy-ax').forEach(b => b.classList.toggle('secondary', b.dataset.a !== sy.a));
}
window.c2SyCase = (x, y) => { const k = cle([x, y]); sy.col.has(k) ? sy.col.delete(k) : sy.col.add(k); dessiner(false); };
window.c2SyAxe = a => { sy = { a, col: new Set() }; dessiner(false); };
window.c2SyVerifier = () => dessiner(true);
window.c2SyEffacer = () => c2SyAxe(sy.a);
function diag(){
  const k = 26; let s = `<svg viewBox="0 0 ${6 * k + 2} ${6 * k + 2}" style="width:${6 * k + 2}px;display:inline-block;">`;
  for(let y = 0; y < 6; y++) for(let x = 0; x < 6; x++) s += `<rect x="${1 + x * k}" y="${1 + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6" stroke-width=".8"/>`;
  s += `<line x1="1" y1="1" x2="${6 * k + 1}" y2="${6 * k + 1}" stroke="#E35D3A" stroke-width="2.5" stroke-dasharray="7 4"/>`;
  const A = [1 + 1 * k, 1 + 4 * k], A2 = [1 + 4 * k, 1 + 1 * k];
  s += `<line x1="${A[0]}" y1="${A[1]}" x2="${A2[0]}" y2="${A2[1]}" stroke="#7A4FC0" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  s += `<circle cx="${A[0]}" cy="${A[1]}" r="4" fill="#2EA8C9"/><circle cx="${A2[0]}" cy="${A2[1]}" r="4" fill="#E35D3A"/><text x="${A[0] - 14}" y="${A[1] + 14}" font-size="13" font-weight="700" fill="#2EA8C9" font-family="Space Grotesk">A</text><text x="${A2[0] + 5}" y="${A2[1] - 5}" font-size="13" font-weight="700" fill="#E35D3A" font-family="Space Grotesk">A'</text>`;
  return s + '</svg>';
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Symétrie axiale', slug: 'symetrie-axiale',
  cours: `
${cm1Lecon(1, 'Rappels')}
${cm1Def('Deux figures sont <b>symétriques par rapport à une droite</b> (l\'<b>axe de symétrie</b>) si elles se superposent quand on plie le long de cette droite. Le symétrique d\'une figure a la même forme et les mêmes mesures (longueurs, angles, aire).')}
${cm1Regle('Un point et son symétrique sont à la <b>même distance de l\'axe</b>, de part et d\'autre, sur une droite <b>perpendiculaire</b> à l\'axe. Un point de l\'axe est son propre symétrique.')}

${cm1Lecon(2, 'Sur quadrillage : axe vertical ou horizontal')}
${cm1Regle('On compte les carreaux entre le point et l\'axe, <b>sur la ligne perpendiculaire à l\'axe</b> (horizontale si l\'axe est vertical, verticale si l\'axe est horizontal), puis on compte autant de carreaux de l\'autre côté.')}
${ce2AnimSymQuad('c2-sy-quad', { presets: [{ nom: 'Axe vertical', n: 10, m: 7, pts: [[1, 1], [3, 1], [3, 4], [1, 5]], axe: { v: 5 } }, { nom: 'Axe horizontal', n: 8, m: 8, pts: [[1, 1], [5, 1], [3, 3]], axe: { h: 4 } }] })}

${cm1Lecon(3, 'Sur quadrillage : axe diagonal')}
<div class="figure-wrap">${diag()}</div>
${cm1Regle('Quand l\'axe suit une <b>diagonale des carreaux</b>, on se déplace perpendiculairement à l\'axe, c\'est-à-dire <b>en diagonale</b>, de carreau en carreau. Le point A est à 1,5 diagonale de carreau de l\'axe : A\' est à 1,5 diagonale de l\'autre côté.', 'Méthode')}
${cm1Astuce(`On peut aussi compter les carreaux :${cm1Liste(['A est à 1 carreau du bord gauche et à 4 carreaux du haut ;', 'A\' est à 4 carreaux du bord gauche et à 1 carreau du haut ;', 'on a échangé les deux nombres.'])}`)}

${cm1AnimSymetrie('cm2-sym', { axes: ['vertical', 'horizontal', 'diagonal'] })}

${cm1Lecon(4, 'Axes de symétrie des figures usuelles')}
${cm1Tableau(['Figure', 'Nombre d\'axes', 'Lesquels'], [['Triangle isocèle', '1', 'la droite qui passe par le sommet principal et le milieu de la base'], ['Triangle équilatéral', '3', 'une par sommet'], ['Rectangle', '2', 'les droites qui passent par les milieux des côtés opposés'], ['Losange', '2', 'ses diagonales'], ['Carré', '4', 'ses 2 diagonales et les 2 droites qui passent par les milieux des côtés opposés'], ['Cercle', 'une infinité', 'toutes les droites qui passent par le centre']], { coul: '#2EA8C9' })}
`,
  methode: `
${cm1Sous('A', 'Atelier : complète la figure par symétrie')}
<div class="figure-wrap" style="text-align:center;"><div class="figure-toolbar" style="margin-bottom:8px;">${Object.entries(AXES).map(([k, a]) => `<button class="btn c2sy-ax" data-a="${k}" onclick="c2SyAxe('${k}')">${a.nom}</button>`).join('')}</div>
<div id="c2sy-grille"></div><p id="c2sy-msg" class="hint" style="margin:8px 0;"></p>
<div class="figure-toolbar"><button class="btn" onclick="c2SyVerifier()">Vérifier</button><button class="btn secondary" onclick="c2SyEffacer()">Effacer</button></div></div>
${cm1Demo('c2-sy-pt', 'Construire le symétrique d\'un point sans quadrillage', 'Construis le symétrique du point M par rapport à la droite (d), avec l\'équerre et la règle graduée.')}
`,
  demos: [
    ['c2-sy-pt', [
      { expr: 'Je trace la perpendiculaire à (d) passant par M.', note: 'Avec l\'équerre : un côté de l\'angle droit sur (d), l\'autre passant par M.' },
      { expr: 'Je mesure la distance de M à la droite (d) : 2,5 cm.', note: 'On mesure sur la perpendiculaire.' },
      { expr: 'Je place M\' sur la perpendiculaire, de l\'autre côté, à 2,5 cm de (d).', note: 'Même distance, de part et d\'autre.' },
      { expr: 'M\' est le symétrique de M.', note: 'Vérification par pliage ou avec un calque.' },
    ]],
  ],
  exos: cm1Exos('c2sy', [
    ['Dans l\'atelier, complète les trois figures (axe vertical, horizontal, diagonal) et vérifie.',
      cm1Redac('Vérification', '', 'Le bouton « Vérifier » montre en vert les cases justes, en rouge les cases en trop et en rose les cases oubliées.')],
    ['Combien d\'axes de symétrie a un triangle équilatéral ? un losange ? un carré ?',
      cm1Redac('Axes de symétrie', '', 'Le triangle équilatéral a 3 axes de symétrie, le losange en a 2 (ses diagonales) et le carré en a 4.')],
    ['Sur papier quadrillé, trace un axe qui suit une diagonale des carreaux, du coin en haut à gauche vers le bas à droite. Place un point B à 3 carreaux à droite d\'un point O de l\'axe. Où est son symétrique B\' ?',
      cm1Redac('Position de B\'', '', 'B\' est à 3 carreaux en dessous du point O : avec cet axe diagonal, « à droite » et « en dessous » s\'échangent.')],
    ['Le segment [AB] mesure 4 cm. Combien mesure son symétrique [A\'B\'] ?',
      cm1Redac('Longueur de [A\'B\']', '', 'Le segment [A\'B\'] mesure aussi 4 cm : la symétrie conserve les longueurs.')],
    ['Un triangle a une aire de 12 cm². Quelle est l\'aire de son symétrique ?',
      cm1Redac('Aire du symétrique', '', 'Son symétrique a aussi une aire de 12 cm² : la symétrie conserve les aires.')],
    ['Trace un segment [CD] et une droite (d) qui ne le coupe pas. Construis le symétrique du segment [CD] par rapport à (d).',
      cm1Redac('Construction', { suite: ['symétrique de C : C\'', 'symétrique de D : D\''] }, 'Je construis C\' et D\' avec l\'équerre et la règle, puis je trace le segment [C\'D\'] : c\'est le symétrique du segment [CD].')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la symétrie dans les jardins à la française', [
    'Au XVII<sup>e</sup> siècle, le jardinier <b>André Le Nôtre</b> dessine les jardins de Versailles et de Vaux-le-Vicomte. Tout y est symétrique par rapport à une grande allée centrale : parterres, bassins, statues.',
    'Pour tracer ces jardins sur le terrain, les jardiniers utilisaient des cordeaux et des piquets… exactement comme on construit un symétrique avec une règle et une équerre !',
  ]),
  quiz: [
    { q: 'Combien d\'axes de symétrie a un rectangle (non carré) ?', opts: ['1', '2', '4'], correct: 1 },
    { q: 'La symétrie axiale conserve…', opts: ['les longueurs', 'la position', 'rien'], correct: 0 },
    { q: 'Un point sur l\'axe a pour symétrique…', opts: ['lui-même', 'un autre point', 'aucun point'], correct: 0 },
  ],
  init: () => dessiner(false),
});
})();

/* ============================================================
   CHAPITRE : Symétrie axiale (CM1, G3, période 3)
   Programme du cycle 3 (CM1) : reconnaître qu'une figure admet un (ou plusieurs) axe(s) de
   symétrie (pliage, papier calque) ; compléter une figure par symétrie axiale sur quadrillage ;
   construire le symétrique d'une figure simple sur quadrillage (axe horizontal ou vertical).
   Atelier : un quadrillage où l'élève colorie les cases pour compléter le dessin, avec
   vérification.
   ============================================================ */
(() => {
const N = 12, C = 26; // quadrillage 12 × 10, axe vertical au milieu (entre les colonnes 5 et 6)
const R = 10;
const MODELES = [
  { nom: 'Le sapin', cases: [[5, 1], [4, 2], [5, 2], [3, 3], [4, 3], [5, 3], [4, 4], [5, 4], [2, 5], [3, 5], [4, 5], [5, 5], [3, 6], [4, 6], [5, 6], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [5, 8]] },
  { nom: 'Le papillon', cases: [[1, 1], [2, 1], [1, 2], [2, 2], [3, 2], [2, 3], [3, 3], [4, 3], [5, 3], [3, 4], [4, 4], [5, 4], [2, 5], [3, 5], [5, 5], [1, 6], [2, 6], [5, 6], [1, 7], [5, 7]] },
  { nom: 'La maison', cases: [[5, 1], [4, 2], [5, 2], [3, 3], [4, 3], [5, 3], [2, 4], [3, 4], [2, 5], [2, 6], [4, 6], [2, 7], [4, 7], [2, 8], [3, 8], [4, 8], [5, 8]] },
];
let sy = { m: 0, colorie: new Set() };
const cle = (x, y) => x + ',' + y;
function syDessiner(verif){
  const el = document.getElementById('sy-grille'); if(!el) return;
  const mod = new Set(MODELES[sy.m].cases.map(([x, y]) => cle(x, y)));
  const attendu = new Set(MODELES[sy.m].cases.map(([x, y]) => cle(N - 1 - x, y)));
  let s = `<svg viewBox="0 0 ${N * C + 2} ${R * C + 2}" style="width:100%;max-width:${N * C + 2}px;display:block;margin:0 auto;touch-action:manipulation;">`;
  for(let y = 0; y < R; y++) for(let x = 0; x < N; x++){
    const k = cle(x, y), gauche = x < N / 2; let f = '#fff';
    if(gauche && mod.has(k)) f = '#2EA8C9';
    if(!gauche && sy.colorie.has(k)) f = verif ? (attendu.has(k) ? '#2E9C6A' : '#E35D3A') : '#7A4FC0';
    if(!gauche && verif && attendu.has(k) && !sy.colorie.has(k)) f = 'rgba(227,93,58,.25)';
    s += `<rect x="${1 + x * C}" y="${1 + y * C}" width="${C}" height="${C}" fill="${f}" stroke="#9BB0C4" stroke-width=".8" ${gauche ? '' : `style="cursor:pointer" onclick="cm1SyCase(${x},${y})"`}/>`;
  }
  s += `<line x1="${1 + N / 2 * C}" y1="0" x2="${1 + N / 2 * C}" y2="${R * C + 2}" stroke="#E35D3A" stroke-width="3" stroke-dasharray="8 5"/></svg>`;
  el.innerHTML = s;
  const msg = document.getElementById('sy-msg');
  if(msg && verif){
    const ok = [...attendu].every(k => sy.colorie.has(k)) && [...sy.colorie].every(k => attendu.has(k));
    const manque = [...attendu].filter(k => !sy.colorie.has(k)).length, faux = [...sy.colorie].filter(k => !attendu.has(k)).length;
    msg.innerHTML = ok ? '<b style="color:#2E9C6A;">Bravo ! Le dessin est parfaitement symétrique.</b>' : `<span style="color:#8A2E1C;">Pas encore : ${faux ? faux + ' case(s) en trop (en rouge)' : ''}${faux && manque ? ' et ' : ''}${manque ? manque + ' case(s) oubliée(s) (en rose)' : ''}. Compte les carreaux jusqu\'à l\'axe !</span>`;
  } else if(msg) msg.textContent = 'Clique sur les cases à droite de l\'axe rouge pour les colorier (clique à nouveau pour effacer).';
}
window.cm1SyCase = (x, y) => { const k = cle(x, y); sy.colorie.has(k) ? sy.colorie.delete(k) : sy.colorie.add(k); syDessiner(false); };
window.cm1SyVerifier = () => syDessiner(true);
window.cm1SyModele = m => { sy = { m, colorie: new Set() }; document.querySelectorAll('.sy-mod').forEach((b, i) => b.classList.toggle('secondary', i !== m)); syDessiner(false); };
window.cm1SyEffacer = () => cm1SyModele(sy.m);

// Petites figures : papillon/lettre avec axe(s).
function figAxes(){
  const f = (contenu, legende) => `<div style="text-align:center;"><svg viewBox="0 0 100 100" style="width:92px;">${contenu}</svg><div class="hint" style="margin:0;">${legende}</div></div>`;
  const ax = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E35D3A" stroke-width="2" stroke-dasharray="6 4"/>`;
  return `<div style="display:flex;gap:18px;flex-wrap:wrap;justify-content:center;">
  ${f(`<rect x="20" y="20" width="60" height="60" fill="#2EA8C9" fill-opacity=".35" stroke="#1F3A5C" stroke-width="2"/>${ax(50, 8, 50, 92)}${ax(8, 50, 92, 50)}${ax(12, 12, 88, 88)}${ax(88, 12, 12, 88)}`, 'carré : 4 axes')}
  ${f(`<rect x="12" y="30" width="76" height="40" fill="#2E9C6A" fill-opacity=".35" stroke="#1F3A5C" stroke-width="2"/>${ax(50, 18, 50, 82)}${ax(4, 50, 96, 50)}`, 'rectangle : 2 axes')}
  ${f(`<polygon points="50,12 88,82 12,82" fill="#7A4FC0" fill-opacity=".3" stroke="#1F3A5C" stroke-width="2"/>${ax(50, 4, 50, 92)}`, 'triangle isocèle : 1 axe')}
  ${f(`<circle cx="50" cy="50" r="36" fill="#E35D3A" fill-opacity=".25" stroke="#1F3A5C" stroke-width="2"/>${ax(50, 6, 50, 94)}${ax(6, 50, 94, 50)}${ax(19, 19, 81, 81)}`, 'cercle : une infinité')}
  ${f(`<text x="50" y="78" font-size="80" text-anchor="middle" font-family="Space Grotesk" font-weight="700" fill="#1F3A5C">F</text>`, 'lettre F : aucun axe')}</div>`;
}
cm1Chapitre({
  titre: 'Symétrie axiale', slug: 'symetrie-axiale',
  cours: `
${cm1Lecon(1, 'Figures symétriques par pliage')}
${cm1Def('Deux figures sont <b>symétriques par rapport à une droite</b> si, en pliant le long de cette droite, elles se <b>superposent exactement</b>. Cette droite s\'appelle l\'<b>axe de symétrie</b>.')}
${cm1Rem('On peut vérifier avec un <b>papier calque</b> : on décalque une figure, on retourne le calque en le pliant le long de l\'axe, et on regarde si elle recouvre l\'autre.')}

${cm1AnimSymetrie('cm1-sym', { axes: ['vertical', 'horizontal'] })}

${cm1Lecon(2, 'Axe(s) de symétrie d\'une figure')}
${cm1Def('Une droite est un <b>axe de symétrie d\'une figure</b> si, en pliant la figure le long de cette droite, les deux moitiés se superposent.')}
<div class="figure-wrap">${figAxes()}</div>
${cm1Astuce('Une figure peut avoir <b>aucun</b>, <b>un</b> ou <b>plusieurs</b> axes de symétrie.')}

${cm1Lecon(3, 'Compléter une figure sur quadrillage')}
${cm1Regle('Sur un quadrillage, chaque point et son symétrique sont <b>à la même distance de l\'axe</b>, de part et d\'autre, sur la même ligne perpendiculaire à l\'axe. On <b>compte les carreaux</b> jusqu\'à l\'axe, puis on compte autant de carreaux de l\'autre côté.')}
${ce2AnimSymQuad('cm1-sy-quad', { presets: [
  { nom: 'Drapeau (axe horizontal)', n: 8, m: 8, pts: [[2, 4], [2, 1], [6, 2], [3, 3], [3, 4]], axe: { h: 4 } },
  { nom: 'Flèche (axe vertical)', n: 10, m: 7, pts: [[1, 3], [3, 1], [3, 2], [4, 2], [4, 5], [3, 5], [3, 6]], axe: { v: 5 } }] })}
${cm1Exemple('Exemple :', ['Un sommet est à 3 carreaux à gauche de l\'axe vertical : son symétrique est à 3 carreaux à droite, sur la même ligne.', 'Un point situé sur l\'axe est son propre symétrique.'])}
${cm1Rem('La figure symétrique a la même forme et les mêmes dimensions que la figure de départ, mais elle est « retournée », comme dans un miroir.')}
`,
  methode: `
${cm1Demo('sy-point', 'Construire le symétrique d\'un point sur quadrillage', 'Le point A est à 4 carreaux à gauche d\'un axe vertical et 2 carreaux sous le haut de la feuille. Où est son symétrique A\' ?')}
${cm1Sous('A', 'Atelier : complète le dessin par symétrie')}
<div class="figure-wrap"><div class="figure-toolbar" style="margin-bottom:8px;">${MODELES.map((m, i) => `<button class="btn sy-mod ${i ? 'secondary' : ''}" onclick="cm1SyModele(${i})">${m.nom}</button>`).join('')}</div>
<div id="sy-grille"></div><p id="sy-msg" class="hint" style="text-align:center;margin:8px 0;"></p>
<div class="figure-toolbar"><button class="btn" onclick="cm1SyVerifier()">Vérifier</button><button class="btn secondary" onclick="cm1SyEffacer()">Effacer</button></div></div>
`,
  demos: [
    ['sy-point', [
      { expr: 'A : 4 carreaux à gauche de l\'axe', note: 'On compte les carreaux entre le point A et l\'axe, sur la ligne horizontale qui passe par A.' },
      { expr: 'A\' : sur la même ligne', note: 'L\'axe est vertical : le symétrique est sur la même ligne horizontale.' },
      { expr: 'A\' : 4 carreaux à droite de l\'axe', note: 'On compte le même nombre de carreaux de l\'autre côté de l\'axe.' },
      { expr: 'A et A\' sont symétriques.', note: 'Vérification : en pliant le long de l\'axe, A tombe sur A\'.' },
    ]],
  ],
  exos: cm1Exos('sy', [
    [`Combien d'axes de symétrie a chacune de ces lettres ?${cm1Liste(['A', 'B', 'H', 'N', 'O'])}`,
      cm1Redac('Axes de symétrie des lettres', { suite: ['A : 1 axe vertical', 'B : 1 axe horizontal', 'H : 2 axes', 'N : aucun axe', 'O : 2 axes'] }, 'A et B ont un axe, H et O en ont deux, N n\'en a pas (un cercle parfait en aurait une infinité).')],
    ['Un losange a-t-il des axes de symétrie ? Lesquels ?',
      cm1Redac('Axes du losange', 'En pliant le long d\'une diagonale, les deux moitiés se superposent.', 'Oui : un losange a 2 axes de symétrie, ses deux diagonales.')],
    ['Sur ton cahier, trace un axe vertical. Place un point B à 5 carreaux à gauche de l\'axe. Construis son symétrique B\'. À combien de carreaux de B est B\' ?',
      cm1Redac('Distance entre B et B\'', '5 + 5 = 10', 'B\' est à 5 carreaux à droite de l\'axe, sur la même ligne : B et B\' sont à 10 carreaux l\'un de l\'autre.')],
    ['Un point C est sur l\'axe de symétrie. Où est son symétrique ?',
      cm1Redac('Symétrique de C', 'C est à 0 carreau de l\'axe.', 'Le symétrique de C est C lui-même : un point de l\'axe est son propre symétrique.')],
    ['Dans l\'atelier de l\'onglet Méthode, complète les trois dessins (sapin, papillon, maison) et vérifie.',
      cm1Redac('Vérification', { suite: ['Je compte les carreaux entre chaque case et l\'axe.', 'Je colorie la case à la même distance, de l\'autre côté.'] }, 'Le bouton « Vérifier » affiche en vert les cases justes, en rouge les cases en trop et en rose les cases oubliées.')],
    ['Vrai ou faux ? « La figure symétrique d\'un triangle est un triangle de même taille. »',
      cm1Redac('Réponse', 'La symétrie conserve la forme et les longueurs.', 'Vrai : le symétrique d\'un triangle est un triangle de même taille.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la symétrie dans l\'art', [
    'Les hommes utilisent la symétrie depuis la Préhistoire : on la trouve sur des poteries, des tissus, des mosaïques. Les <b>Grecs</b> la considéraient comme un signe de beauté et d\'harmonie.',
    'Au château de <b>Versailles</b>, construit pour Louis XIV, les jardins et les façades sont presque parfaitement symétriques par rapport à un grand axe central.',
    'Dans la nature aussi : ailes de papillon, feuilles, visages… Beaucoup d\'êtres vivants ont un axe de symétrie (presque parfait !).',
  ]),
  quiz: [
    { q: 'Combien d\'axes de symétrie a un rectangle (qui n\'est pas un carré) ?', opts: ['1', '2', '4'], correct: 1 },
    { q: 'Un point est à 3 carreaux de l\'axe. Son symétrique est à…', opts: ['3 carreaux de l\'axe, de l\'autre côté', '6 carreaux de l\'axe', 'sur l\'axe'], correct: 0 },
    { q: 'Combien d\'axes de symétrie a un carré ?', opts: ['2', '4', 'aucun'], correct: 1 },
  ],
  init: () => cm1SyModele(sy.m),
});
})();

/* ---- Planches d'exercices imprimables (planches.js) ---- */
(() => {
const B = n => plPointilles(n || 2), R = v => plRep(String(v));
const K = '#1F3A5C', ROUGE = '#E35D3A', BLEU = '#2EA8C9', VERT = '#2E9C6A';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 2}"${d ? ' stroke-dasharray="6 4"' : ''} stroke-linecap="round"/>`;
const Pg = (pts, c, f) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${f || '#DCEFF6'}" stroke="${c || K}" stroke-width="2" stroke-linejoin="round"/>`;
const Pt = (p, n, c) => `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="${c || K}"/>` + (n ? cmT(p[0] + 8, p[1] - 6, n, { fs: 12, c: c || K }) : '');
const AX = (a, b) => L(a, b, ROUGE, 2.2, true);
// Quadrillage w × h carreaux de k px ; f(g) dessine en coordonnées de carreaux.
function Q(w, h, k, f){ const g = (x, y) => [1 + x * k, 1 + y * k]; let s = '';
  for(let x = 0; x <= w; x++) s += L(g(x, 0), g(x, h), '#C6D2DE', .8); for(let y = 0; y <= h; y++) s += L(g(0, y), g(w, y), '#C6D2DE', .8);
  return S(w * k + 2, h * k + 2, s + (f ? f(g) : ''), w * k + 2); }
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}${t ? `<span>${t}</span>` : ''}</span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-end;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;

// Figures et leurs axes (en pointillés rouges dans le corrigé).
const FIGS = [
  { f: Pg([[50, 8], [86, 82], [14, 82]]), ax: [[[50, 2], [50, 88]]], n: 1 },
  { f: Pg([[10, 22], [90, 22], [90, 68], [10, 68]]), ax: [[[50, 12], [50, 78]], [[4, 45], [96, 45]]], n: 2 },
  { f: Pg([[18, 13], [82, 13], [82, 77], [18, 77]]), ax: [[[50, 5], [50, 85]], [[10, 45], [90, 45]], [[12, 7], [88, 83]], [[88, 7], [12, 83]]], n: 4 },
  { f: Pg([[25, 20], [92, 20], [75, 70], [8, 70]]), ax: [], n: 0 },
  { f: Pg([[50, 4], [86, 45], [50, 86], [14, 45]]), ax: [[[50, 0], [50, 90]], [[8, 45], [92, 45]]], n: 2 },
  { f: Pg([[10, 35], [55, 35], [55, 18], [90, 45], [55, 72], [55, 55], [10, 55]]), ax: [[[4, 45], [96, 45]]], n: 1 },
];
const fig = (x, sol) => S(100, 90, x.f + (sol ? x.ax.map(([a, b]) => AX(a, b)).join('') : ''), 92);

// Moitiés de figures à compléter (axe vertical au milieu d'un quadrillage 10 × 7).
const DEMI1 = [[5, 1], [3, 2], [2, 4], [3, 6], [5, 6]], DEMI2 = [[5, 0], [4, 2], [2, 2], [3, 4], [2, 6], [5, 6]];
const sym = (pts, ax) => pts.map(([x, y]) => [2 * ax - x, y]);
const ligne = (g, pts, c) => `<polyline points="${pts.map(p => g(...p).join(',')).join(' ')}" fill="none" stroke="${c || BLEU}" stroke-width="2.4" stroke-linejoin="round"/>`;
const demi = (pts, sol) => Q(10, 7, 16, g => AX(g(5, -0.2), g(5, 7.2)) + ligne(g, pts) + (sol ? ligne(g, sym(pts, 5), VERT) : ''));
// Clé pour l'écran : les segments à tracer (ligne brisée pts).
const segsDe = pts => pts.slice(1).map((p, i) => [pts[i][0], pts[i][1], p[0], p[1]]);
const demiX = pts => plX(demi(pts, false), { t: 'seg', k: 16, ox: 1, oy: 1, w: 10, h: 7, att: segsDe(sym(pts, 5)) });
// Cases à colorier par symétrie (axe vertical entre les colonnes 3 et 4 d'un quadrillage 8 × 5).
const CASES = [[[1, 1], [2, 1], [2, 2], [3, 2], [3, 3], [1, 3]], [[3, 0], [3, 1], [2, 1], [1, 2], [3, 3], [3, 4], [2, 4]]];
const quad = (c, sol) => { const s = sol ? c.concat(c.map(([x, y]) => [7 - x, y])) : c; return cm1Quad(8, 5, s, { k: 18, c: '#7A4FC0' }).replace('</svg>', AX([73, -2], [73, 93]) + '</svg>'); };
// Points et leurs symétriques (axe vertical x = 5).
const PTS = [[2, 1, 'A'], [3, 4, 'B'], [1, 5, 'C']];

PLANCHES['cm1|Symétrie axiale'] = [
  { titre: 'Axes de symétrie d\'une figure', duree: '30 min',
    attendus: ['Reconnaître qu\'une figure a un ou plusieurs axes de symétrie', 'Tracer les axes de symétrie d\'une figure'],
    exos: [
      { etoiles: 1, consigne: 'Trace en rouge le ou les axes de symétrie de chaque figure (il peut n\'y en avoir aucun). Écris combien elle en a.',
        eleve: plGrille(FIGS.map((x, i) => col(fig(x, false), `<b>${'ABCDEF'[i]}</b> : ${B(2)} axe(s)`)), 3),
        corr: plGrille(FIGS.map((x, i) => col(fig(x, true), `<b>${'ABCDEF'[i]}</b> : ${R(x.n)} axe(s)`)), 3) },
      { etoiles: 1, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        eleve: plListe(['Un carré a 4 axes de symétrie. <b>vrai · faux</b>', 'Un rectangle a 4 axes de symétrie. <b>vrai · faux</b>', 'Une figure peut n\'avoir aucun axe de symétrie. <b>vrai · faux</b>', 'Un triangle équilatéral a 3 axes de symétrie. <b>vrai · faux</b>']),
        corr: plListe([['Un carré a 4 axes de symétrie. ', 'vrai'], ['Un rectangle a 4 axes de symétrie. ', 'faux'], ['Une figure peut n\'avoir aucun axe de symétrie. ', 'vrai'], ['Un triangle équilatéral a 3 axes de symétrie. ', 'vrai']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 2, col: 1, consigne: `On plie la feuille le long de la droite rouge. Les deux parties se superposent-elles ? Entoure.${duo([col(S(110, 80, Pg([[10, 40], [55, 8], [100, 40], [55, 72]]) + AX([55, 2], [55, 78]), 90), '<b>1</b>'), col(S(110, 80, Pg([[10, 70], [40, 10], [100, 10], [70, 70]]) + AX([55, 2], [55, 78]), 90), '<b>2</b>')])}`,
        eleve: plListe(['Figure 1 : <b>oui · non</b>', 'Figure 2 : <b>oui · non</b>']),
        corr: plListe([['Figure 1 : ', 'oui'], ['Figure 2 : ', 'non']].map(([t, r]) => t + plEntoure(r))) },
      { etoiles: 2, consigne: 'La droite rouge est un axe de symétrie. Termine chaque dessin.',
        eleve: duo([demiX(DEMI1), demiX(DEMI2)]),
        corr: duo([demi(DEMI1, true), demi(DEMI2, true)]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve trois lettres majuscules qui ont un axe de symétrie vertical, et deux lettres qui ont un axe horizontal.',
        corr: cm1Redac('Des lettres possibles', { suite: ['axe vertical : A, M, T (ou H, O, U, V…)', 'axe horizontal : B, E (ou C, D, K…)'] }, 'Si on plie la lettre le long de son axe, les deux moitiés se superposent.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dessine une figure qui a exactement 2 axes de symétrie. Trace ses axes en rouge.',
        corr: cm1Redac('Une figure à deux axes', 'un rectangle (pas un carré) ou un losange', 'Le rectangle a deux axes : ils passent par les milieux de ses côtés opposés.', `<span class="cm-fig-d">${fig(FIGS[1], true)}</span>`) },
    ] },
  { titre: 'Compléter une figure sur quadrillage', duree: '35 min',
    attendus: ['Compléter une figure par symétrie sur quadrillage (axe vertical ou horizontal)', 'Placer le symétrique d\'un point'],
    exos: [
      { etoiles: 1, consigne: 'Colorie les carreaux symétriques par rapport à la droite rouge.',
        eleve: duo(CASES.map(c => plX(quad(c, false), { t: 'cases', k: 18, ox: 1, oy: 1, w: 8, h: 5, coul: '#7A4FC0', att: c.map(([x, y]) => [7 - x, y]) }))),
        corr: duo(CASES.map(c => quad(c, true))) },
      { etoiles: 2, consigne: 'Place le symétrique de chaque point par rapport à la droite rouge. Le symétrique du point A se nomme A\' (on lit « A prime »).',
        eleve: duo([plX(Q(10, 7, 18, g => AX(g(5, -0.2), g(5, 7.2)) + PTS.map(([x, y, n]) => Pt(g(x, y), n)).join('')), { t: 'pts', grille: { k: 18, ox: 1, oy: 1, w: 10, h: 7 }, noms: PTS.map(p => p[2] + '\''), att: Object.fromEntries(PTS.map(([x, y, n]) => [n + '\'', [1 + (10 - x) * 18, 1 + y * 18]])) })]),
        corr: duo([Q(10, 7, 18, g => AX(g(5, -0.2), g(5, 7.2)) + PTS.map(([x, y, n]) => Pt(g(x, y), n) + Pt(g(10 - x, y), n + '\'', VERT)).join(''))]) },
      { etoiles: 2, consigne: 'Cette fois, l\'axe de symétrie est horizontal. Termine chaque dessin.',
        eleve: duo([[[1, 4], [2, 1], [4, 2], [6, 1], [7, 4]], [[2, 4], [2, 2], [4, 0], [6, 2], [6, 4]]].map(l => plX(Q(8, 8, 16, g => AX(g(-0.2, 4), g(8.2, 4)) + ligne(g, l)), { t: 'seg', k: 16, ox: 1, oy: 1, w: 8, h: 8, att: segsDe(l.map(([x, y]) => [x, 8 - y])) }))),
        corr: duo([Q(8, 8, 16, g => AX(g(-0.2, 4), g(8.2, 4)) + ligne(g, [[1, 4], [2, 1], [4, 2], [6, 1], [7, 4]]) + ligne(g, [[1, 4], [2, 7], [4, 6], [6, 7], [7, 4]], VERT)), Q(8, 8, 16, g => AX(g(-0.2, 4), g(8.2, 4)) + ligne(g, [[2, 4], [2, 2], [4, 0], [6, 2], [6, 4]]) + ligne(g, [[2, 4], [2, 6], [4, 8], [6, 6], [6, 4]], VERT))]) },
      { etoiles: 3, col: 1, consigne: 'Léa a complété ce dessin par symétrie, mais elle a fait une erreur. Entoure-la.',
        eleve: plX(quad([[1, 1], [2, 1], [1, 2], [2, 3]], false), { t: 'cases', mode: 'entoure', k: 18, ox: 1, oy: 1, w: 8, h: 5, att: [[4, 3]] }).replace('</svg>', ['6,1', '5,1', '6,2', '4,3'].map(c => { const [x, y] = c.split(',').map(Number); return `<rect x="${1 + x * 18}" y="${1 + y * 18}" width="18" height="18" fill="#7A4FC0" fill-opacity=".6" stroke="#B9C7D6" stroke-width=".8"/>`; }).join('') + '</svg>'),
        corr: quad([[1, 1], [2, 1], [1, 2], [2, 3]], false).replace('</svg>', ['6,1', '5,1', '6,2', '4,3'].map(c => { const [x, y] = c.split(',').map(Number); return `<rect x="${1 + x * 18}" y="${1 + y * 18}" width="18" height="18" fill="#7A4FC0" fill-opacity=".6" stroke="#B9C7D6" stroke-width=".8"/>`; }).join('') + `<circle cx="${1 + 4.5 * 18}" cy="${1 + 3.5 * 18}" r="15" fill="none" stroke="${VERT}" stroke-width="2.4"/></svg>`) + '<div class="pl-petit">Le carreau symétrique de celui de la ligne du bas doit être dans la 6<sup>e</sup> colonne, pas la 5<sup>e</sup>.</div>' },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur ton cahier, dessine une figure sur le quadrillage, trace un axe vertical, puis échange avec ton voisin : il complète ta figure par symétrie.',
        corr: cm1Redac('Pour vérifier', { suite: ['Chaque point et son symétrique sont à la même distance de l\'axe.', 'Ils sont sur la même ligne du quadrillage.'] }, 'Si on plie le long de l\'axe, les deux moitiés se superposent exactement.') },
    ] },
];
})();

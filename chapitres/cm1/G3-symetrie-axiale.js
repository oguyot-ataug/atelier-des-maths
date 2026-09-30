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

${cm1Lecon(2, 'Axe(s) de symétrie d\'une figure')}
${cm1Def('Une droite est un <b>axe de symétrie d\'une figure</b> si, en pliant la figure le long de cette droite, les deux moitiés se superposent.')}
<div class="figure-wrap">${figAxes()}</div>
${cm1Astuce('Une figure peut avoir <b>aucun</b>, <b>un</b> ou <b>plusieurs</b> axes de symétrie.')}

${cm1Lecon(3, 'Compléter une figure sur quadrillage')}
${cm1Regle('Sur un quadrillage, chaque point et son symétrique sont <b>à la même distance de l\'axe</b>, de part et d\'autre, sur la même ligne perpendiculaire à l\'axe. On <b>compte les carreaux</b> jusqu\'à l\'axe, puis on compte autant de carreaux de l\'autre côté.')}
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
    ['Combien d\'axes de symétrie ont ces lettres : A · B · H · N · O ?', 'A : 1 (vertical) · B : 1 (horizontal) · H : 2 · N : aucun · O : 2 (dans la police habituelle ; un cercle parfait en aurait une infinité).'],
    ['Un losange a-t-il des axes de symétrie ? Lesquels ?', 'Oui, 2 : ce sont ses deux diagonales.'],
    ['Sur ton cahier, trace un axe vertical. Place un point B à 5 carreaux à gauche de l\'axe. Construis son symétrique B\'. À combien de carreaux de B est B\' ?', 'B\' est à 5 carreaux à droite de l\'axe, sur la même ligne ; donc B et B\' sont à 10 carreaux l\'un de l\'autre.'],
    ['Un point C est sur l\'axe de symétrie. Où est son symétrique ?', 'Il est confondu avec C : un point de l\'axe est son propre symétrique.'],
    ['Dans l\'atelier de l\'onglet Méthode, complète les trois dessins (sapin, papillon, maison) et vérifie.', 'Le bouton « Vérifier » affiche en vert les cases justes, en rouge les cases en trop et en rose les cases oubliées.'],
    ['Vrai ou faux ? « La figure symétrique d\'un triangle est un triangle de même taille. »', 'Vrai : la symétrie conserve la forme et les longueurs.'],
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

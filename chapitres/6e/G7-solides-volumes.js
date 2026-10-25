/* ============================================================
   CHAPITRE : Solides et volumes (6e, G7)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Solides et volumes (Espace) en 6e" (capture du manuel : caractérisation des solides,
   vision dans l'espace -- vues de face, de dessus, de gauche, de droite --, volume d'un assemblage
   de cubes en cm³). Titres reformulés, exemples nouveaux.
   Réutilise le moteur 3D e5* de chapitres/5e/G7-espace.js (chargé avant ce fichier).
   ============================================================ */

const SV_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const SV_BLEU = '#0C5BA0', SV_CLAIR = '#A9CCE8', SV_PALE = '#DCEAF6', SV_ENCRE = '#1C1B2E';

/* ---- Solides supplémentaires : pyramide, cône, boule ---- */
function svPyramide(poly, h){
  const n = poly.length, pts = poly.map(p => [p[0], p[1], 0]).concat([[0, 0, h]]);
  const faces = [{ idx: [...Array(n).keys()], base: true }];
  for(let i = 0; i < n; i++) faces.push({ idx: [i, (i + 1) % n, n] });
  return e5Solide(pts, faces, false);
}
function svCone(r, h){ const S = svPyramide(e5Regulier(48, r), h); S.lisse = true; return S; }
function svBoule(r, pitch, echelle, cx, cy){
  const R = r * echelle, ry = R * Math.abs(Math.sin(pitch));
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${SV_BLEU}" fill-opacity=".10" stroke="${SV_ENCRE}" stroke-width="1.8"/>`
    + `<path d="M${cx - R},${cy} A${R},${ry} 0 0 0 ${cx + R},${cy}" fill="none" stroke="${SV_ENCRE}" stroke-width="1.1" stroke-dasharray="5 4"/>`
    + `<path d="M${cx - R},${cy} A${R},${ry} 0 0 1 ${cx + R},${cy}" fill="none" stroke="${SV_ENCRE}" stroke-width="1.5"/>`
    + `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${SV_ENCRE}"/>`;
}
// Les 7 solides du chapitre : constructeur, caractéristiques (faces planes, surfaces courbes, arêtes, sommets).
const SV_SOLIDES = [
  { nom: 'Cube', s: () => e5Centrer(e5Prisme([[-1.4, -1.4], [1.4, -1.4], [1.4, 1.4], [-1.4, 1.4]], 2.8)), c: '6 faces carrées · 12 arêtes · 8 sommets' },
  { nom: 'Pavé droit', s: () => e5Centrer(e5Prisme([[-2, -1.1], [2, -1.1], [2, 1.1], [-2, 1.1]], 2)), c: '6 faces rectangulaires · 12 arêtes · 8 sommets' },
  { nom: 'Prisme droit', yaw: -1.05, s: () => e5Centrer(e5Prisme(e5Regulier(3, 1.7, Math.PI / 2), 2.9)), c: '2 bases polygonales et des faces rectangulaires (ici 5 faces · 9 arêtes · 6 sommets)' },
  { nom: 'Cylindre', s: () => e5Centrer(e5Cylindre(1.5, 2.9)), c: '2 bases (disques) et une surface courbe · pas de sommet' },
  { nom: 'Pyramide', s: () => e5Centrer(svPyramide([[-1.6, -1.6], [1.6, -1.6], [1.6, 1.6], [-1.6, 1.6]], 3)), c: '1 base polygonale et des faces triangulaires qui se rejoignent en un sommet (ici 5 faces · 8 arêtes · 5 sommets)' },
  { nom: 'Cône', s: () => e5Centrer(svCone(1.6, 3)), c: '1 base (disque) et une surface courbe · 1 sommet' },
  { nom: 'Boule', boule: true, c: 'une seule surface courbe (la sphère) · pas d\'arête, pas de sommet' },
];
function svDessinSolide(k, yaw, pitch, echelle, cx, cy){
  const d = SV_SOLIDES[k];
  return d.boule ? svBoule(1.6, pitch, echelle, cx, cy) : e5DessinSolide(d.s(), yaw, pitch, echelle, cx, cy);
}

/* ---- Assemblages de cubes : rendu 3D (faces extérieures, tri par profondeur) et vues ---- */
const SV_DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
function svFaceCube(x, y, z, d){ // 4 coins de la face du cube [x,x+1]×[y,y+1]×[z,z+1] dans la direction d
  const k = d.findIndex(v => v !== 0), s = d[k] > 0 ? 1 : 0, a = (k + 1) % 3, b = (k + 2) % 3, o = [x, y, z];
  return [[0, 0], [1, 0], [1, 1], [0, 1]].map(([u, v]) => { const P = o.slice(); P[k] += s; P[a] += u; P[b] += v; return P; });
}
// cells : liste de [x, y, z] (entiers, ou décimaux pendant une animation). x vers la droite, y vers le fond, z vers le haut.
function svVoxels(cells, yaw, pitch, echelle, cx, cy, centre){
  const V = e5Vue(yaw, pitch), entiers = cells.every(c => c.every(Number.isInteger)), set = new Set(cells.map(c => c.join(',')));
  const G = centre || [0, 0, 0], faces = [];
  cells.forEach(([x, y, z]) => SV_DIRS.forEach(d => {
    if(entiers && set.has([x + d[0], y + d[1], z + d[2]].join(','))) return; // face collée à un autre cube
    if(V(d)[1] >= -1e-9) return; // face tournée vers l'arrière
    const Q = svFaceCube(x, y, z, d).map(P => V(e5Sub(P, G)));
    faces.push({ Q, prof: Q.reduce((s, q) => s + q[1], 0) / 4, c: d[2] === 1 ? SV_BLEU : d[1] === -1 ? '#FFFFFF' : SV_CLAIR });
  }));
  return faces.sort((a, b) => b.prof - a.prof).map(f => `<polygon points="${f.Q.map(q => (cx + q[0] * echelle).toFixed(1) + ',' + (cy - q[2] * echelle).toFixed(1)).join(' ')}" fill="${f.c}" stroke="${SV_ENCRE}" stroke-width="1.2" stroke-linejoin="round"/>`).join('');
}
function svCentre(cells){
  const mx = k => (Math.min(...cells.map(c => c[k])) + Math.max(...cells.map(c => c[k])) + 1) / 2;
  return cells.length ? [mx(0), mx(1), mx(2)] : [0, 0, 0];
}
// Vue plane : 'face' (x, z), 'dessus' (x, y), 'gauche' (y, z), 'droite' (y, z) ; chaque carré = une colonne de cubes.
function svVue(cells, type, taille){
  const u = taille || 22, cases = new Set();
  const mxX = Math.max(...cells.map(c => c[0]), 0), mxY = Math.max(...cells.map(c => c[1]), 0), mxZ = Math.max(...cells.map(c => c[2]), 0);
  cells.forEach(([x, y, z]) => {
    if(type === 'face') cases.add(x + ',' + (mxZ - z));
    if(type === 'dessus') cases.add(x + ',' + (mxY - y));
    if(type === 'gauche') cases.add((mxY - y) + ',' + (mxZ - z)); // vu de gauche : l'avant est à droite
    if(type === 'droite') cases.add(y + ',' + (mxZ - z));         // vu de droite : l'avant est à gauche
  });
  const W = (type === 'gauche' || type === 'droite' ? mxY : mxX) + 1, H = (type === 'dessus' ? mxY : mxZ) + 1;
  const coul = { face: '#FFFFFF', dessus: SV_BLEU, gauche: SV_PALE, droite: SV_CLAIR }[type];
  let h = '';
  cases.forEach(k => { const [i, j] = k.split(',').map(Number); h += `<rect x="${4 + i * u}" y="${4 + j * u}" width="${u}" height="${u}" fill="${coul}" stroke="${SV_ENCRE}" stroke-width="1.2"/>`; });
  return `<svg viewBox="0 0 ${W * u + 8} ${H * u + 8}" style="width:${Math.min(150, W * u + 8)}px;max-width:100%;display:block;margin:0 auto;">${h}</svg>`;
}
const SV_NOMS_VUES = { face: 'Vue de face', dessus: 'Vue de dessus', gauche: 'Vue de gauche', droite: 'Vue de droite' };
function svQuatreVues(cells){
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;">${['face', 'dessus', 'gauche', 'droite'].map(t =>
    `<div style="border:1px solid #D9DEE6;border-radius:10px;background:#fff;padding:8px 6px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;">${svVue(cells, t)}<div style="text-align:center;font-size:.85rem;color:#4E5665;">${SV_NOMS_VUES[t]}</div></div>`).join('')}</div>`;
}
// Assemblage à partir d'une grille de hauteurs : hauteurs[y][x] (y = 0 : rangée de devant).
function svDepuisHauteurs(hauteurs){ const c = []; hauteurs.forEach((ligne, y) => ligne.forEach((h, x) => { for(let z = 0; z < h; z++) c.push([x, y, z]); })); return c; }
const SV_EXEMPLE = svDepuisHauteurs([[2, 1, 0, 1], [3, 0, 2, 1], [1, 0, 0, 0]]);
const SV_VUE3D = (cells, max, yaw, pitch) => `<svg viewBox="0 0 300 240" style="width:100%;max-width:${max || 300}px;display:block;margin:6px auto;">${svVoxels(cells, yaw == null ? -0.55 : yaw, pitch == null ? 0.5 : pitch, 30, 150, 125, svCentre(cells))}</svg>`;
// Deux solides de 12 cubes, de formes différentes.
const SV_BLOC = svDepuisHauteurs([[2, 2, 2], [2, 2, 2]]);
const SV_ESCALIER = svDepuisHauteurs([[1, 1, 1, 1], [2, 2, 2, 2]]);

document.getElementById('cours-demo-solides-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Reconnaître les solides</h3></div>
<p style="margin:4px 0 8px;">Un solide est limité par des <b>faces</b> planes (des polygones ou des disques) ou par des <b>surfaces courbes</b>. Deux faces se rejoignent le long d'une <b>arête</b> ; les arêtes se rejoignent en des <b>sommets</b>. Les arêtes cachées sont dessinées en <b>pointillés</b>.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin:8px 0 16px;">${SV_SOLIDES.map((d, k) =>
  `<div style="border:1px solid #D9DEE6;border-radius:12px;background:#fff;overflow:hidden;display:flex;flex-direction:column;">
    <div style="background:#EAF2FB;font-weight:700;text-align:center;padding:5px;font-family:'Space Grotesk',sans-serif;">${d.nom}</div>
    <svg viewBox="0 0 300 230" style="width:100%;max-width:150px;display:block;margin:4px auto;">${svDessinSolide(k, d.yaw || -0.5, 0.42, 36, 150, 115)}</svg>
    <div style="font-size:.8rem;color:#4E5665;padding:4px 8px 8px;line-height:1.35;text-align:center;">${d.c}</div>
  </div>`).join('')}</div>
<div class="redaction-note" ${SV_REM}>Remarques : le cube est un pavé droit particulier (toutes ses faces sont des carrés), et le pavé droit est un prisme droit particulier. Le cylindre, le cône et la boule ont des surfaces courbes : ils « roulent ».</div>

<div class="lesson-header"><span class="num">2</span><h3>Voir un solide sous différents angles</h3></div>
<p class="example-title">Exemple : voici un assemblage de cubes, et ce qu'on en voit de face, de dessus, de gauche et de droite.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;align-items:center;">
  <div>${SV_VUE3D(SV_EXEMPLE)}<p class="hint" style="text-align:center;margin:0;">La vue de face est prise depuis l'avant (faces blanches), la vue de dessus depuis le haut (faces bleues).</p></div>
  ${svQuatreVues(SV_EXEMPLE)}
</div>
<ul class="example-list">
  <li>Dans chaque vue, un carré représente une « colonne » de cubes, quelle que soit sa profondeur : on ne voit pas les cubes cachés derrière.</li>
  <li>Les vues de gauche et de droite sont symétriques l'une de l'autre.</li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>Mesurer un volume en cubes</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Le <b>volume</b> d'un solide est la mesure de la place qu'il occupe dans l'espace. Le <b>centimètre cube</b>, noté <b>cm³</b>, est une unité de volume : <b>1 cm³</b> est le volume d'un cube d'arête 1 cm.</div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour déterminer le volume d'un assemblage de cubes d'arête 1 cm, il suffit de <b>compter les cubes</b> (sans oublier ceux qui sont cachés). Le volume s'exprime alors en cm³.</div>
<p class="example-title">Exemple : ces deux solides ont le même volume, 12 cm³, alors qu'ils n'ont pas la même forme.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;align-items:end;">
  <div>${SV_VUE3D([[0, 0, 0]], 90)}<p style="text-align:center;margin:0;">1 cm³</p></div>
  <div>${SV_VUE3D(SV_BLOC, 230)}<p style="text-align:center;margin:0;">3 × 2 × 2 = <b>12 cubes</b></p></div>
  <div>${SV_VUE3D(SV_ESCALIER, 250)}<p style="text-align:center;margin:0;">4 + 8 = <b>12 cubes</b></p></div>
</div>
<ul class="example-list">
  <li>Le premier solide est un pavé de 3 cubes sur 2 cubes sur 2 cubes : 3 × 2 × 2 = 12 cubes, soit <b>12 cm³</b>.</li>
  <li>Le second est formé de 4 cubes devant et de 8 cubes derrière (deux étages de 4) : 4 + 8 = 12 cubes, soit <b>12 cm³</b>.</li>
</ul>
<div class="redaction-note" ${SV_REM}>Remarque : pour compter sans oublier de cube caché, on peut compter <b>étage par étage</b>, ou <b>colonne par colonne</b> à partir de la vue de dessus.</div>
`;

document.getElementById('histoire-demo-solides-6e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Dans l'Antiquité, le philosophe grec <b>Platon</b> s'émerveillait de cinq solides très réguliers, dont toutes les faces sont des polygones identiques : le tétraèdre, le cube, l'octaèdre, le dodécaèdre et l'icosaèdre. On les appelle encore les « solides de Platon », et on les retrouve dans les dés de jeux de rôle ! Au 18e siècle, le mathématicien suisse <b>Leonhard Euler</b> remarque une propriété étonnante : pour ces solides (sans trou), le nombre de faces moins le nombre d'arêtes plus le nombre de sommets vaut toujours 2. Vérifie avec le cube : 6 − 12 + 8 = 2 !
</div>
`;

document.getElementById('methode-demo-solides-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : observer un solide sous tous les angles</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un solide et faites-le tourner en le faisant glisser (souris ou doigt).</p>
  <div style="text-align:center;margin:6px 0;"><select id="sv-choix" onchange="svVueDessin()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;font:inherit;">${SV_SOLIDES.map((d, k) => `<option value="${k}">${d.nom}</option>`).join('')}</select></div>
  <svg id="sv-vueSvg" viewBox="0 0 300 250" style="width:100%;max-width:360px;display:block;margin:6px auto;touch-action:none;cursor:grab;background:#fff;border-radius:10px;border:1px solid #E4E7EC;"></svg>
  <div id="sv-vueInfo" style="text-align:center;line-height:1.7;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire un assemblage de cubes, ses vues et son volume</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur une case de la grille (vue de dessus) pour empiler des cubes : 0, 1, 2 ou 3 cubes. La rangée du bas de la grille est l'avant de l'assemblage.</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;align-items:center;">
    <div><div id="sv-grille" style="display:grid;grid-template-columns:repeat(4,46px);gap:4px;justify-content:center;"></div>
      <div id="sv-volume" style="text-align:center;margin-top:8px;font-size:1.05rem;"></div>
      <div class="figure-toolbar"><button class="btn secondary" onclick="svGrilleReset()">Recommencer</button></div></div>
    <div id="sv-3d"></div>
  </div>
  <div id="sv-vues" style="margin-top:8px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : même volume, forme différente</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Les 12 cubes du pavé se déplacent pour former un autre solide : le nombre de cubes, donc le volume, ne change pas.</p>
  <div id="sv-morph"></div>
  <div id="sv-morphNote" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div class="figure-toolbar"><button class="btn" onclick="svMorphJouer()">Déplacer les cubes</button><button class="btn secondary" onclick="svMorphReset()">Recommencer</button></div>
</div>
`;

function svExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="sv-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="sv-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-solides-6e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer le volume d'un assemblage de cubes »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Étage du bas : 3 × 4 = 12 cubes.</span><span class="we-comment">1. On compte étage par étage.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Étage du haut : 5 cubes.</span><span class="we-comment">2. Sans oublier les cubes cachés.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">12 + 5 = 17 cubes, donc le volume est 17 cm³.</span><span class="we-comment">3. Chaque cube d'arête 1 cm mesure 1 cm³.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${svExo(1, 'Quel est le nom de chaque solide ? a) Il a deux bases qui sont des disques. b) Il a une base polygonale et des faces triangulaires qui se rejoignent en un sommet. c) Il a 6 faces carrées.', [
    'a) un cylindre', 'b) une pyramide', 'c) un cube'])}
  ${svExo(2, 'Combien un pavé droit a-t-il de faces, d\'arêtes et de sommets ?', [
    '6 faces, 12 arêtes et 8 sommets.'])}
  ${svExo(3, 'Combien une pyramide à base carrée a-t-elle de faces, d\'arêtes et de sommets ?', [
    '5 faces (1 carré et 4 triangles), 8 arêtes et 5 sommets.'])}
  ${svExo(4, 'Un pavé est formé de 4 cubes sur 3 cubes sur 2 cubes, chacun d\'arête 1 cm. Quel est son volume ?', [
    '4 × 3 × 2 = 24 cubes, donc 24 cm³.'])}
  ${svExo(5, 'Un grand cube est formé de 3 cubes sur 3 cubes sur 3 cubes d\'arête 1 cm. Quel est son volume ?', [
    '3 × 3 × 3 = 27 cubes, donc 27 cm³.'])}
  ${svExo(6, 'Vu de dessus, un assemblage montre 5 carrés, et chaque colonne contient exactement 2 cubes. Quel est son volume ?', [
    '5 colonnes de 2 cubes : 5 × 2 = 10 cubes, donc 10 cm³.'])}
  ${svExo(7, 'Combien de cubes de 1 cm³ faut-il pour remplir une boîte en forme de pavé de 5 cm sur 4 cm sur 3 cm ?', [
    '5 × 4 × 3 = 60 cubes.'])}
  ${svExo(8, 'Vrai ou faux : « deux solides qui ont le même volume ont forcément la même forme ».', [
    'Faux : on peut assembler 12 cubes de plusieurs façons différentes, le volume reste 12 cm³ (voir le cours et la méthode 3).'])}
</div>
`;

/* ---- Méthode 1 : solide orientable ---- */
let svYaw = -0.5, svPitch = 0.42;
function svVueDessin(){
  const k = Number(document.getElementById('sv-choix').value), s = document.getElementById('sv-vueSvg'); if(!s) return;
  s.innerHTML = svDessinSolide(k, svYaw, svPitch, 38, 150, 125);
  document.getElementById('sv-vueInfo').innerHTML = `<b>${SV_SOLIDES[k].nom}</b> : ${SV_SOLIDES[k].c}.`;
}
(function svGlisser(){
  let dep = null;
  document.addEventListener('pointerdown', e => { const s = e.target.closest && e.target.closest('#sv-vueSvg'); if(!s) return; dep = [e.clientX, e.clientY, svYaw, svPitch]; s.setPointerCapture && s.setPointerCapture(e.pointerId); s.style.cursor = 'grabbing'; });
  document.addEventListener('pointermove', e => { if(!dep) return; svYaw = dep[2] + (e.clientX - dep[0]) / 90; svPitch = Math.max(-1.2, Math.min(1.2, dep[3] + (e.clientY - dep[1]) / 90)); svVueDessin(); });
  document.addEventListener('pointerup', () => { if(!dep) return; dep = null; const s = document.getElementById('sv-vueSvg'); if(s) s.style.cursor = 'grab'; });
})();

/* ---- Méthode 2 : grille de hauteurs ---- */
const SV_GRILLE_DEPART = [[2, 1, 0, 1], [3, 0, 2, 1], [1, 0, 0, 0], [0, 0, 0, 0]]; // [y][x], y = 0 : devant
let svH = SV_GRILLE_DEPART.map(l => l.slice());
function svGrilleDessin(){
  const g = document.getElementById('sv-grille'); if(!g) return;
  // Affichage : rangée du fond en haut, rangée de devant en bas (comme une vue de dessus).
  let h = '';
  for(let y = 3; y >= 0; y--) for(let x = 0; x < 4; x++){
    const v = svH[y][x];
    h += `<button type="button" onclick="svCase(${x},${y})" style="width:46px;height:46px;border-radius:8px;border:1px solid #C9D6E6;font:700 1.05rem 'Space Grotesk',sans-serif;cursor:pointer;background:${v ? ['', '#CFE3F5', '#8DBBE3', SV_BLEU][v] : '#fff'};color:${v >= 3 ? '#fff' : SV_ENCRE};">${v || ''}</button>`;
  }
  g.innerHTML = h;
  const cells = svDepuisHauteurs(svH), n = cells.length;
  document.getElementById('sv-3d').innerHTML = n ? SV_VUE3D(cells, 320) : '<p class="hint" style="text-align:center;">Aucun cube pour l\'instant.</p>';
  document.getElementById('sv-vues').innerHTML = n ? svQuatreVues(cells) : '';
  document.getElementById('sv-volume').innerHTML = `Volume : <b>${n}</b> cube${n > 1 ? 's' : ''}, soit <b>${n} cm³</b>`;
}
function svCase(x, y){ svH[y][x] = (svH[y][x] + 1) % 4; svGrilleDessin(); }
function svGrilleReset(){ svH = SV_GRILLE_DEPART.map(l => l.slice()); svGrilleDessin(); }

/* ---- Méthode 3 : 12 cubes qui changent de place ---- */
let svMorphRaf = null;
function svTri(c){ return c.slice().sort((a, b) => a[2] - b[2] || a[1] - b[1] || a[0] - b[0]); }
function svMorphDessin(t){
  const A = svTri(SV_BLOC), B = svTri(SV_ESCALIER).map(c => [c[0], c[1], c[2]]);
  const cells = A.map((a, i) => a.map((v, k) => v + (B[i][k] - v) * t)), G = [2, 1, 1];
  document.getElementById('sv-morph').innerHTML = `<svg viewBox="0 0 300 220" style="width:100%;max-width:340px;display:block;margin:6px auto;">${svVoxels(cells, -0.55, 0.5, 30, 150, 115, G)}</svg>`;
}
function svMorphReset(){ cancelAnimationFrame(svMorphRaf); if(!document.getElementById('sv-morph')) return; svMorphDessin(0); document.getElementById('sv-morphNote').textContent = 'Un pavé de 3 × 2 × 2 = 12 cubes : 12 cm³.'; }
function svMorphJouer(){
  cancelAnimationFrame(svMorphRaf);
  const t0 = performance.now(), n = document.getElementById('sv-morphNote');
  n.textContent = 'Les cubes se déplacent…';
  const f = now => { const k = Math.max(0, Math.min(1, (now - t0) / 2200)), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; svMorphDessin(e); if(k < 1) svMorphRaf = requestAnimationFrame(f); else n.textContent = 'Toujours 12 cubes : 4 devant et 8 derrière. Le volume est toujours 12 cm³, mais la forme a changé.'; };
  svMorphRaf = requestAnimationFrame(f);
}

DEMO_REGISTRY['6e|Solides et volumes'] = {
  cours: 'cours-demo-solides-6e', methode: 'methode-demo-solides-6e', exos: 'exos-demo-solides-6e', histoire: 'histoire-demo-solides-6e',
  init: () => {
    svVueDessin(); svGrilleReset(); svMorphReset();
    injectCourseAddButtons(document.getElementById('cours-demo-solides-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-solides-6e'));
  }
};

DEMO_QUIZZES['6e|Solides et volumes'] = [
  { q: 'Combien de faces a un cube ?', opts: ['4', '6', '8'], correct: 1 },
  { q: 'Quel solide a deux bases qui sont des disques ?', opts: ['le cône', 'le cylindre', 'la boule'], correct: 1 },
  { q: 'Quel solide n\'a ni arête ni sommet ?', opts: ['la boule', 'la pyramide', 'le pavé droit'], correct: 0 },
  { q: 'Combien de sommets a une pyramide à base carrée ?', opts: ['4', '5', '8'], correct: 1 },
  { q: '1 cm³, c\'est le volume...', opts: ['d\'un carré de côté 1 cm', 'd\'un cube d\'arête 1 cm', 'd\'un cube d\'arête 10 cm'], correct: 1 },
  { q: 'Un pavé de 2 cubes sur 3 cubes sur 4 cubes (arête 1 cm) a un volume de...', opts: ['9 cm³', '24 cm³', '12 cm³'], correct: 1 },
  { q: 'Deux solides de même volume ont-ils forcément la même forme ?', opts: ['Oui', 'Non'], correct: 1 },
];

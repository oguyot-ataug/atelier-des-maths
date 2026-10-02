/* =====================================================================
   questionnaires-trace.js -- Question « Tracé sur quadrillage »

   Demandé : "Le professeur donne une consigne, il place ce que voit l'élève et ce qui est attendu.
   L'élève doit lui réaliser l'attendu", puis "Il ne faut pas utiliser les outils géométriques,
   seulement placer des points dans le quadrillage ; une fois deux points, un outil droite permet de
   tracer la droite, le segment, la demi-droite. Si c'est un exercice type symétrie, il faudra juste
   placer le point ou les points."

   - Professeur : un quadrillage avec deux calques, « Ce que voit l'élève » (q.figure) et « Ce qui est
     attendu » (q.solution), dessinés avec les mêmes outils que l'élève (point, droite, segment,
     demi-droite, gomme). Ou bien un MODÈLE qui fabrique la figure et l'attendu : droite parallèle,
     droite perpendiculaire, symétrique de points ; option « une figure différente pour chaque élève »
     (figure tirée d'une graine propre à l'élève, gardée dans sa réponse : rep.s).
   - Élève : il place des points sur les nœuds du quadrillage ; avec l'outil droite / segment /
     demi-droite, il touche deux points (un nœud vide reçoit un point). Quand l'attendu ne contient que
     des points (symétrie), il n'a que l'outil point et des étiquettes à placer (A', B'…).
   - Correction automatique sur les PROPRIÉTÉS, pas au pixel : une droite est juste si ses deux points
     sont sur la droite attendue (n'importe lesquels) ; un segment par ses extrémités ; une demi-droite
     par son origine et son sens ; un point par sa position (et son nom s'il en a un). Les objets en
     trop comptent comme des erreurs ; les points de construction ne comptent pas quand on attend des
     droites.

   Sécurité : l'attendu vit dans q.solution, retiré du sujet envoyé à l'élève (qz_sujet_public) ;
   l'élève ne reçoit que q.outils et q.aPlacer, calculés à l'enregistrement (preparer).
   Dépend de questionnaires.js (QZ_EXT, QZ_TYPES, qzP, qzEdQ, qzEdRender, qzSaisieValeur, qzEsc…).
   ===================================================================== */

const QZT = { K: 30, M: 18 };
const QZT_COUL = { depart: '#1C1B2E', eleve: '#6B3FA0', juste: '#1E7B34', faux: '#C0392B', attendu: '#1E7B34', sel: '#E8833A' };
const QZT_LIGNES = ['droite', 'segment', 'demi'];
const QZT_OUTILS = { point: ['scatter_plot', 'Point'], droite: ['horizontal_rule', 'Droite'], segment: ['remove', 'Segment'], demi: ['trending_flat', 'Demi-droite'], gomme: ['ink_eraser', 'Gomme'] };
const qztUI = {};   // état d'interface de l'élève par question : { outil, sel, cible, hist }
const qztEdUI = {}; // état de l'éditeur par question : { couche, outil, sel }

function qztConf(q){
  const g = q.grille || {}, n = (v, d, a, b) => Math.max(a, Math.min(b, parseInt(v, 10) || d));
  return { l: n(g.l, 14, 4, 24), h: n(g.h, 10, 3, 16) };
}
function qztEgal(p, r){ return !!p && !!r && p[0] === r[0] && p[1] === r[1]; }
function qztCroix(a, b, p){ return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]); }
function qztSurDroite(o, p){ return qztCroix(o.a, o.b, p) === 0; }
function qztId(){ return typeof qzId === 'function' ? qzId() : Math.random().toString(36).slice(2, 9); }

/* ---------------- Figure et attendu d'une réponse (modèle « différent pour chaque élève ») ---------------- */
function qztHash(s){ let h = 2166136261; for(const c of String(s)){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function qztAlea(seed){ let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function qztVarie(q){ return !!(q.gen && q.gen.modele && q.gen.varie); }
function qztPour(q, rep){
  if(qztVarie(q) && rep && rep.s != null){ const g = qztGenerer(q.gen, qztConf(q), rep.s); if(g) return g; }
  return { figure: q.figure || [], solution: q.solution };
}
// Graine de l'élève : stable pour un élève et une question (même figure à chaque affichage).
function qztGraine(q){ return qztHash((typeof currentUser !== 'undefined' && currentUser ? currentUser.id : 'x') + '|' + q.id) % 1000000; }

/* ---------------- Modèles (générateurs) ---------------- */
const QZT_MODELES = {
  parallele: 'Droite parallèle passant par un point',
  perpendiculaire: 'Droite perpendiculaire passant par un point',
  symetrie: 'Symétrique de points par rapport à une droite',
};
function qztGenerer(gen, c, seed){
  const r = qztAlea(seed), ent = (a, b) => a + Math.floor(r() * (b - a + 1)), dans = p => p[0] >= 0 && p[0] <= c.l && p[1] >= 0 && p[1] <= c.h;
  const pick = t => t[Math.floor(r() * t.length)];
  if(gen.modele === 'parallele' || gen.modele === 'perpendiculaire'){
    const dirs = gen.obliques === false ? [[1, 0], [0, 1]] : [[1, 0], [0, 1], [1, 1], [1, -1], [2, 1], [1, 2], [2, -1], [1, -2]];
    const n = gen.n == 2 ? 2 : 1, noms = ['A', 'B'], sous = ['₁', '₂'];
    for(let essai = 0; essai < 300; essai++){
      const d = pick(dirs), P0 = [ent(Math.floor(c.l / 4), Math.ceil(3 * c.l / 4)), ent(Math.floor(c.h / 4), Math.ceil(3 * c.h / 4))];
      const ligne = { a: P0, b: [P0[0] + d[0], P0[1] + d[1]] };
      const e = gen.modele === 'parallele' ? d : [-d[1], d[0]];
      const pts = [];
      for(let k = 0; k < n; k++){
        let ok = null;
        for(let t = 0; t < 200 && !ok; t++){
          const A = [ent(1, c.l - 1), ent(1, c.h - 1)], dist = Math.abs(qztCroix(ligne.a, ligne.b, A));
          if(dist < 2 * Math.max(1, Math.hypot(d[0], d[1])) - 1e-9) continue;               // ni sur (d), ni trop près
          if(!dans([A[0] + e[0], A[1] + e[1]]) && !dans([A[0] - e[0], A[1] - e[1]])) continue; // un 2e nœud de la réponse dans le quadrillage
          if(pts.some(B => Math.hypot(B[0] - A[0], B[1] - A[1]) < 3 || qztCroix(B, [B[0] + e[0], B[1] + e[1]], A) === 0)) continue;
          ok = A;
        }
        if(!ok) break;
        pts.push(ok);
      }
      if(pts.length < n) continue;
      const figure = [{ id: 'd', k: 'droite', nom: '(d)', a: ligne.a, b: ligne.b }].concat(pts.map((A, i) => ({ id: 'p' + i, k: 'point', nom: noms[i], p: A })));
      const solution = pts.map((A, i) => ({ id: 's' + i, k: 'droite', nom: '(d' + sous[i] + ')', a: A, b: [A[0] + e[0], A[1] + e[1]] }));
      const mot = gen.modele === 'parallele' ? 'parallèle' : 'perpendiculaire';
      const enonce = n === 1 ? `Trace la droite (d₁) ${mot} à la droite (d) et passant par le point A.`
        : `Trace la droite (d₁) ${mot} à la droite (d) et passant par le point A, puis la droite (d₂) ${mot} à la droite (d) et passant par le point B.`;
      return { figure, solution, enonce };
    }
    return null;
  }
  if(gen.modele === 'symetrie'){
    const n = Math.max(1, Math.min(4, parseInt(gen.n, 10) || 1)), noms = ['A', 'B', 'C', 'D'];
    for(let essai = 0; essai < 300; essai++){
      const sorte = gen.axe && gen.axe !== 'hasard' ? (gen.axe === 'oblique' ? pick(['diag', 'anti']) : gen.axe) : pick(['vertical', 'horizontal', 'diag', 'anti']);
      let axe, image, cote;
      if(sorte === 'vertical'){ const x0 = ent(Math.floor(c.l / 2) - 1, Math.ceil(c.l / 2) + 1); axe = { a: [x0, 0], b: [x0, 1] }; image = p => [2 * x0 - p[0], p[1]]; cote = p => p[0] - x0; }
      else if(sorte === 'horizontal'){ const y0 = ent(Math.floor(c.h / 2) - 1, Math.ceil(c.h / 2) + 1); axe = { a: [0, y0], b: [1, y0] }; image = p => [p[0], 2 * y0 - p[1]]; cote = p => p[1] - y0; }
      else if(sorte === 'diag'){ const k = ent(-2, c.l - c.h + 2); axe = { a: [k, 0], b: [k + 1, 1] }; image = p => [p[1] + k, p[0] - k]; cote = p => p[1] - p[0] + k; }   // axe y = x − k
      else { const s = ent(Math.floor((c.l + c.h) / 2) - 2, Math.ceil((c.l + c.h) / 2) + 2); axe = { a: [s, 0], b: [s - 1, 1] }; image = p => [s - p[1], s - p[0]]; cote = p => p[0] + p[1] - s; } // axe x + y = s
      const signe = r() < .5 ? 1 : -1, pts = [];
      for(let t = 0; t < 400 && pts.length < n; t++){
        const A = [ent(0, c.l), ent(0, c.h)], im = image(A), dist = cote(A) * signe;
        if(dist <= 0 || !dans(im) || Math.abs(cote(A)) > 6) continue;   // tous du même côté de l'axe
        if(pts.some(B => qztEgal(B, A) || Math.hypot(B[0] - A[0], B[1] - A[1]) < 2)) continue;
        pts.push(A);
      }
      if(pts.length < n) continue;
      const figure = [{ id: 'd', k: 'droite', nom: '(d)', a: axe.a, b: axe.b }].concat(pts.map((A, i) => ({ id: 'p' + i, k: 'point', nom: noms[i], p: A })));
      if(gen.relier && n >= 2) pts.forEach((A, i) => { if(n === 2 && i === 1) return; figure.push({ id: 'g' + i, k: 'segment', nom: '', a: A, b: pts[(i + 1) % n] }); });
      const solution = pts.map((A, i) => ({ id: 's' + i, k: 'point', nom: noms[i] + '\'', p: image(A) }));
      const liste = a => a.length === 1 ? a[0] : a.slice(0, -1).join(', ') + ' et ' + a[a.length - 1];
      const enonce = n === 1 ? 'Place le point A\', symétrique du point A par rapport à la droite (d).'
        : `Place les points ${liste(noms.slice(0, n).map(x => x + '\''))}, symétriques des points ${liste(noms.slice(0, n))} par rapport à la droite (d).`;
      return { figure, solution, enonce };
    }
    return null;
  }
  return null;
}

/* ---------------- Dessin ---------------- */
function qztX(v){ return QZT.M + v * QZT.K; }
// Morceau visible (dans le quadrillage) d'une droite ou d'une demi-droite.
function qztClip(o, c){
  if(o.k === 'segment') return [o.a, o.b];
  const d = [o.b[0] - o.a[0], o.b[1] - o.a[1]], L = [c.l, c.h];
  let t0 = o.k === 'demi' ? 0 : -Infinity, t1 = Infinity;
  for(let i = 0; i < 2; i++){
    if(d[i] === 0) continue;
    const u = (0 - o.a[i]) / d[i], v = (L[i] - o.a[i]) / d[i];
    t0 = Math.max(t0, Math.min(u, v)); t1 = Math.min(t1, Math.max(u, v));
  }
  if(!(t1 >= t0) || !isFinite(t0) || !isFinite(t1)) return null;
  return [[o.a[0] + t0 * d[0], o.a[1] + t0 * d[1]], [o.a[0] + t1 * d[0], o.a[1] + t1 * d[1]]];
}
function qztObjSvg(o, c, coul, opt){
  opt = opt || {};
  const tir = opt.tirets ? ' stroke-dasharray="7 5"' : '', ep = opt.ep || 2.4;
  if(o.k === 'point'){
    const x = qztX(o.p[0]), y = qztX(o.p[1]);
    return `<g data-oid="${qzEsc(o.id)}"><path d="M${x - 5},${y - 5} L${x + 5},${y + 5} M${x - 5},${y + 5} L${x + 5},${y - 5}" stroke="${coul}" stroke-width="2.6" stroke-linecap="round"${opt.tirets ? ' opacity=".75"' : ''}/>`
      + (opt.tirets ? `<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${coul}" stroke-width="1.6" stroke-dasharray="3 3"/>` : '')
      + (o.nom ? `<text x="${x + 7}" y="${y - 8}" font-size="15" font-weight="700" fill="${coul}" font-family="Inter,sans-serif">${qzEsc(o.nom)}</text>` : '') + '</g>';
  }
  const s = qztClip(o, c); if(!s) return '';
  const [p, r] = s;
  let g = `<line x1="${qztX(p[0])}" y1="${qztX(p[1])}" x2="${qztX(r[0])}" y2="${qztX(r[1])}" stroke="${coul}" stroke-width="${ep}" stroke-linecap="round"${tir}/>`;
  if(o.k === 'segment' && !opt.sansBouts) [o.a, o.b].forEach(q => { g += `<circle cx="${qztX(q[0])}" cy="${qztX(q[1])}" r="2.6" fill="${coul}"/>`; });
  if(o.k === 'demi') g += `<circle cx="${qztX(o.a[0])}" cy="${qztX(o.a[1])}" r="3" fill="${coul}"/>`;
  if(o.nom){
    // nom près du bout de la droite, un peu à l'intérieur et décalé sur le côté
    const dx = r[0] - p[0], dy = r[1] - p[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    const bx = qztX(r[0]) - ux * 22 - uy * 12, by = qztX(r[1]) - uy * 22 + ux * 12;
    g += `<text x="${bx}" y="${by + 5}" text-anchor="middle" font-size="14" font-weight="700" fill="${coul}" font-family="Inter,sans-serif">${qzEsc(o.nom)}</text>`;
  }
  return `<g data-oid="${qzEsc(o.id)}">${g}</g>`;
}
// couches : [{ objs, coul, tirets }] ; sel : nœud sélectionné ; clic : attribut onpointerdown
function qztSvg(c, couches, opt){
  opt = opt || {};
  const W = c.l * QZT.K + 2 * QZT.M, H = c.h * QZT.K + 2 * QZT.M;
  let g = '';
  for(let i = 0; i <= c.l; i++) g += `<line x1="${qztX(i)}" y1="${qztX(0)}" x2="${qztX(i)}" y2="${qztX(c.h)}" stroke="#A9CBE6" stroke-width="1"/>`;
  for(let j = 0; j <= c.h; j++) g += `<line x1="${qztX(0)}" y1="${qztX(j)}" x2="${qztX(c.l)}" y2="${qztX(j)}" stroke="#A9CBE6" stroke-width="1"/>`;
  // lignes d'abord, points ensuite (les croix restent visibles)
  couches.forEach(k => (k.objs || []).filter(o => o.k !== 'point').forEach(o => { g += qztObjSvg(o, c, k.coulDe ? k.coulDe(o) : k.coul, k); }));
  couches.forEach(k => (k.objs || []).filter(o => o.k === 'point').forEach(o => { g += qztObjSvg(o, c, k.coulDe ? k.coulDe(o) : k.coul, k); }));
  if(opt.sel) g += `<circle cx="${qztX(opt.sel[0])}" cy="${qztX(opt.sel[1])}" r="9" fill="${QZT_COUL.sel}" fill-opacity=".25" stroke="${QZT_COUL.sel}" stroke-width="2"/>`;
  return `<svg class="qzt-svg${opt.mini ? ' mini' : ''}" viewBox="0 0 ${W} ${H}" style="max-width:${opt.mini ? 190 : W + 40}px;"${opt.clic ? ` onpointerdown="${opt.clic}"` : ''} xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
}
// Nœud touché (et position en pixels du dessin) ; null hors du quadrillage.
function qztNoeud(ev, c){
  const svg = ev.currentTarget, m = svg && svg.getScreenCTM(); if(!m) return null;
  const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
  const p = pt.matrixTransform(m.inverse());
  const x = Math.round((p.x - QZT.M) / QZT.K), y = Math.round((p.y - QZT.M) / QZT.K);
  const n = x >= 0 && x <= c.l && y >= 0 && y <= c.h && Math.hypot(qztX(x) - p.x, qztX(y) - p.y) < QZT.K * .45 ? [x, y] : null;
  return { n, px: [p.x, p.y] };
}
// Objet le plus proche du toucher (gomme).
function qztPlusProche(objs, c, t){
  let best = null, dmin = 12;
  (objs || []).forEach(o => {
    let d;
    if(o.k === 'point') d = Math.hypot(qztX(o.p[0]) - t.px[0], qztX(o.p[1]) - t.px[1]) - 4;
    else {
      const s = qztClip(o, c); if(!s) return;
      const A = [qztX(s[0][0]), qztX(s[0][1])], B = [qztX(s[1][0]), qztX(s[1][1])], ab = [B[0] - A[0], B[1] - A[1]], L2 = ab[0] ** 2 + ab[1] ** 2 || 1;
      const u = Math.max(0, Math.min(1, ((t.px[0] - A[0]) * ab[0] + (t.px[1] - A[1]) * ab[1]) / L2));
      d = Math.hypot(A[0] + u * ab[0] - t.px[0], A[1] + u * ab[1] - t.px[1]);
    }
    if(d < dmin){ dmin = d; best = o; }
  });
  return best;
}

/* ---------------- Correction ---------------- */
function qztMeme(att, o){
  if(att.k !== o.k) return false;
  if(o.k === 'point') return qztEgal(att.p, o.p) && (!att.nom || !o.nom || att.nom === o.nom);
  if(o.k === 'segment') return (qztEgal(att.a, o.a) && qztEgal(att.b, o.b)) || (qztEgal(att.a, o.b) && qztEgal(att.b, o.a));
  if(o.k === 'droite') return qztSurDroite(att, o.a) && qztSurDroite(att, o.b);
  if(o.k === 'demi'){ // même origine, même support, même sens
    const u = [att.b[0] - att.a[0], att.b[1] - att.a[1]], v = [o.b[0] - o.a[0], o.b[1] - o.a[1]];
    return qztEgal(att.a, o.a) && qztSurDroite(att, o.b) && u[0] * v[0] + u[1] * v[1] > 0;
  }
  return false;
}
// { ok: Set(id élève), faux: Set, manquants: [attendus], trouves, erreurs }
function qztCorriger(sol, el){
  const attendus = sol || [], eleve = el || [], pris = new Set(), ok = new Set();
  const notePoints = attendus.some(a => a.k === 'point');
  // les points nommés d'abord (un nom désigne une seule place)
  const ordre = attendus.slice().sort((a, b) => (b.nom ? 1 : 0) - (a.nom ? 1 : 0));
  const manquants = [];
  ordre.forEach(a => {
    const o = eleve.find(x => !pris.has(x.id) && qztMeme(a, x));
    if(o){ pris.add(o.id); ok.add(o.id); } else manquants.push(a);
  });
  const faux = new Set(eleve.filter(o => !ok.has(o.id) && (o.k !== 'point' || notePoints)).map(o => o.id));
  return { ok, faux, manquants, trouves: ok.size, erreurs: faux.size, total: attendus.length };
}

/* ---------------- Saisie de l'élève ---------------- */
function qztRep(rep){ return rep && typeof rep === 'object' && Array.isArray(rep.el) ? rep : { el: [] }; }
function qztOutilsDe(q){
  const o = Array.isArray(q.outils) && q.outils.length ? q.outils.slice() : ['point', 'droite', 'segment', 'demi'];
  return o.includes('point') ? o : ['point'].concat(o);
}
function qztUi(q){
  const u = qztUI[q.id] = qztUI[q.id] || { outil: null, sel: null, cible: null, hist: [] };
  const outils = qztOutilsDe(q);
  if(!u.outil || (u.outil !== 'gomme' && !outils.includes(u.outil))) u.outil = outils.find(x => x !== 'point') || 'point';
  return u;
}
function qztBarre(q, u, rep){
  const outils = qztOutilsDe(q).concat('gomme'), aPlacer = q.aPlacer || [];
  const places = new Set(rep.el.filter(o => o.k === 'point' && o.nom).map(o => o.nom));
  const btn = o => `<button type="button" class="qzt-outil${u.outil === o ? ' on' : ''}" onclick="qztChoisir('${q.id}','${o}')"><span class="gicon">${QZT_OUTILS[o][0]}</span> ${QZT_OUTILS[o][1]}</button>`;
  const aide = u.outil === 'point' ? (aPlacer.length ? 'Choisis le nom du point, puis touche sa place sur le quadrillage.' : 'Touche un nœud du quadrillage pour y placer un point.')
    : u.outil === 'gomme' ? 'Touche un objet que tu as tracé pour l\'effacer.'
    : u.sel ? `Touche le deuxième point de ${u.outil === 'demi' ? 'la demi-droite' : u.outil === 'segment' ? 'ton segment' : 'ta droite'}.`
    : u.outil === 'demi' ? 'Touche l\'origine de la demi-droite, puis un deuxième point.' : `Touche deux points : ${u.outil === 'segment' ? 'les extrémités du segment' : 'la droite passe par ces deux points'}.`;
  return `<div class="qzt-barre">${outils.map(btn).join('')}
      <button type="button" class="qzt-outil" onclick="qztAnnuler('${q.id}')" ${u.hist.length ? '' : 'disabled'} title="Annuler la dernière action"><span class="gicon">undo</span></button>
      <button type="button" class="qzt-outil" onclick="qztToutEffacer('${q.id}')" ${rep.el.length ? '' : 'disabled'} title="Tout effacer"><span class="gicon">delete_sweep</span></button></div>
    ${u.outil === 'point' && aPlacer.length ? `<div class="qz-cibles">${aPlacer.map(n => `<button type="button" class="qz-cible${u.cible === n ? ' on' : ''}${places.has(n) ? ' place' : ''}" onclick="qztCible('${q.id}',this.dataset.n)" data-n="${qzEsc(n)}">${qzEsc(n)}${places.has(n) ? ' <span class="gicon">check</span>' : ''}</button>`).join('')}</div>` : ''}
    <p class="hint qzt-aide">${aide}</p>`;
}
QZ_EXT.trace = {
  nouvelle(q){
    q.grille = { l: 14, h: 10 }; q.gen = { modele: 'parallele', n: 1, obliques: true, varie: true };
    const g = qztGenerer(q.gen, qztConf(q), Math.floor(Math.random() * 1e6)) || { figure: [], solution: [], enonce: '' };
    q.figure = g.figure; q.solution = g.solution; q.enonce = g.enonce; q.points = 1;
  },
  corps(q){ return qztEditeurHtml(q); },
  verifier(q){
    if(q.gen && q.gen.modele && !qztGenerer(q.gen, qztConf(q), 1)) return 'le quadrillage est trop petit pour ce modèle : agrandissez-le.';
    if(!(q.solution || []).length) return 'dessinez ce qui est attendu (calque « Ce qui est attendu »).';
    return null;
  },
  preparer(q){
    const sol = q.solution || [];
    // Tracé attendu : les trois outils sont proposés (choisir le bon fait partie de l'exercice).
    // Points seulement (symétrie) : l'outil point et les noms à placer.
    const lignes = sol.some(o => QZT_LIGNES.includes(o.k));
    q.outils = lignes ? ['point', 'droite', 'segment', 'demi'] : ['point'];
    q.aPlacer = lignes ? [] : [...new Set(sol.filter(o => o.k === 'point' && o.nom).map(o => o.nom))];
    return q;
  },
  saisie(q, rep, mode, ctx){
    const c = qztConf(q), r = qztRep(rep);
    if(mode === 'passer'){
      // figure tirée pour cet élève (modèle « différent pour chaque élève »)
      const s = r.s != null ? r.s : qztVarie(q) ? qztGraine(q) : null;
      const { figure } = qztPour(q, { s });
      const u = qztUi(q);
      return `<div class="qzt" data-qid="${q.id}">${qztBarre(q, u, r)}
        ${qztSvg(c, [{ objs: figure, coul: QZT_COUL.depart }, { objs: r.el, coul: QZT_COUL.eleve }], { sel: u.sel, clic: `qztClic(event,'${q.id}')` })}</div>`;
    }
    const { figure, solution } = qztPour(q, r);
    if(mode === 'corrige' && solution){
      const k = qztCorriger(solution, r.el);
      return `<div class="qzt">${qztSvg(c, [{ objs: figure, coul: QZT_COUL.depart }, { objs: k.manquants, coul: QZT_COUL.attendu, tirets: true },
          { objs: r.el, coulDe: o => k.ok.has(o.id) ? QZT_COUL.juste : k.faux.has(o.id) ? QZT_COUL.faux : QZT_COUL.eleve }])}
        <p class="hint qzt-leg"><span style="color:${QZT_COUL.juste};">■ juste</span> <span style="color:${QZT_COUL.faux};">■ faux ou en trop</span>${k.manquants.length ? ` <span style="color:${QZT_COUL.attendu};">┄ attendu</span>` : ''}</p></div>`;
    }
    return `<div class="qzt">${qztSvg(c, [{ objs: figure, coul: QZT_COUL.depart }, { objs: r.el, coul: QZT_COUL.eleve }])}</div>`;
  },
  repondue(q, rep){
    const r = qztRep(rep), aP = q.aPlacer || [];
    if(aP.length) return aP.every(n => r.el.some(o => o.k === 'point' && o.nom === n));
    const lignes = (q.outils || []).some(k => QZT_LIGNES.includes(k));
    return r.el.some(o => lignes ? QZT_LIGNES.includes(o.k) : true);
  },
  auto(q, rep, max){
    const { solution } = qztPour(q, qztRep(rep));
    if(!solution || !solution.length) return null; // attendu inconnu ici : à regarder
    const k = qztCorriger(solution, qztRep(rep).el);
    // un objet faux compte une fois : à la place d'un attendu manquant, ou en trop au-delà du nombre attendu
    return Math.round(max * k.trouves / Math.max(k.total, k.trouves + k.erreurs) * 100) / 100;
  },
  // Séance en direct : la mosaïque des tracés (sans les noms).
  directDetail(q, reps, corr){
    const c = qztConf(q);
    return `<div class="qzd-det"><p class="qzd-det-t">Les tracés des élèves</p><div class="qzt-mosaique">${reps.slice(0, 40).map(rep => {
      const r = qztRep(rep), { figure, solution } = qztPour(q, r), k = corr && solution ? qztCorriger(solution, r.el) : null;
      return qztSvg(c, [{ objs: figure, coul: QZT_COUL.depart }, { objs: r.el, coulDe: o => !k ? QZT_COUL.eleve : k.ok.has(o.id) ? QZT_COUL.juste : k.faux.has(o.id) ? QZT_COUL.faux : QZT_COUL.eleve }], { mini: true });
    }).join('')}</div></div>`;
  },
};

function qztMaj(qid, r){
  const u = qztUI[qid]; if(u){ const avant = qzP && qzP.reponses[qid]; u.hist.push(JSON.stringify(qztRep(avant).el)); if(u.hist.length > 40) u.hist.shift(); }
  qzSaisieValeur(qid, r.el.length || r.s != null ? r : undefined);
}
function qztRepCourante(q){
  const r = JSON.parse(JSON.stringify(qztRep(qzP && qzP.reponses[q.id])));
  if(r.s == null && qztVarie(q)) r.s = qztGraine(q);
  return r;
}
function qztChoisir(qid, outil){ const q = qziQ(qid); if(!q) return; const u = qztUi(q); u.outil = outil; u.sel = null; qzRafraichirQuestion(qid); }
function qztCible(qid, n){ const q = qziQ(qid); if(!q) return; const u = qztUi(q); u.outil = 'point'; u.cible = n; u.sel = null; qzRafraichirQuestion(qid); }
function qztAnnuler(qid){
  const q = qziQ(qid), u = q && qztUI[qid]; if(!u || !u.hist.length) return;
  const r = qztRepCourante(q); r.el = JSON.parse(u.hist.pop()); u.sel = null;
  qzSaisieValeur(qid, r.el.length || r.s != null ? r : undefined);
}
async function qztToutEffacer(qid){
  const q = qziQ(qid); if(!q) return;
  if(!(await niceConfirm('Effacer tout ce que tu as tracé ?'))) return;
  const r = qztRepCourante(q); r.el = []; if(qztUI[qid]) qztUI[qid].sel = null;
  qztMaj(qid, r);
}
function qztClic(ev, qid){
  const q = qziQ(qid); if(!q) return;
  ev.preventDefault();
  const c = qztConf(q), t = qztNoeud(ev, c); if(!t) return;
  const u = qztUi(q), r = qztRepCourante(q), { figure } = qztPour(q, r);
  const pointEn = n => r.el.find(o => o.k === 'point' && qztEgal(o.p, n)) || figure.find(o => o.k === 'point' && qztEgal(o.p, n));
  if(u.outil === 'gomme'){
    const o = qztPlusProche(r.el, c, t); if(!o) return;
    // effacer un point efface aussi les tracés qui s'appuient dessus
    r.el = r.el.filter(x => x !== o && !(o.k === 'point' && x.k !== 'point' && (qztEgal(x.a, o.p) || qztEgal(x.b, o.p))));
    return qztMaj(qid, r);
  }
  if(!t.n) return;
  if(u.outil === 'point'){
    const aP = q.aPlacer || [];
    if(aP.length){
      const nom = u.cible && aP.includes(u.cible) ? u.cible : aP.find(n => !r.el.some(o => o.nom === n)) || aP[0];
      r.el = r.el.filter(o => !(o.k === 'point' && (o.nom === nom || qztEgal(o.p, t.n))));
      r.el.push({ id: qztId(), k: 'point', nom, p: t.n });
      u.cible = aP.find(n => !r.el.some(o => o.nom === n)) || nom;
      return qztMaj(qid, r);
    }
    if(pointEn(t.n)) return;
    r.el.push({ id: qztId(), k: 'point', nom: '', p: t.n });
    return qztMaj(qid, r);
  }
  // droite, segment, demi-droite : deux points (un nœud vide reçoit un point)
  const nouveau = !pointEn(t.n);
  if(nouveau) r.el.push({ id: qztId(), k: 'point', nom: '', p: t.n });
  if(!u.sel){ u.sel = t.n; return nouveau ? qztMaj(qid, r) : qzRafraichirQuestion(qid); }
  if(qztEgal(u.sel, t.n)){ u.sel = null; return nouveau ? qztMaj(qid, r) : qzRafraichirQuestion(qid); }
  r.el.push({ id: qztId(), k: u.outil, nom: '', a: u.sel, b: t.n });
  u.sel = null;
  qztMaj(qid, r);
}

/* ---------------- Éditeur du professeur ---------------- */
function qztEdUi(id){ return qztEdUI[id] = qztEdUI[id] || { couche: 'depart', outil: 'point', sel: null }; }
function qztEditeurHtml(q){
  const id = q.id, c = qztConf(q), g = q.gen || {}, modele = g.modele || '';
  const opts = modele === 'symetrie'
    ? `<label>points <select onchange="qztEdGen('${id}','n',parseInt(this.value,10))">${[1, 2, 3, 4].map(n => `<option${(g.n || 1) == n ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
       <label>axe <select onchange="qztEdGen('${id}','axe',this.value)">${[['hasard', 'au hasard'], ['vertical', 'vertical'], ['horizontal', 'horizontal'], ['oblique', 'oblique (diagonale des carreaux)']].map(([v, t]) => `<option value="${v}"${(g.axe || 'hasard') === v ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
       <label class="qz-check"><input type="checkbox" ${g.relier ? 'checked' : ''} onchange="qztEdGen('${id}','relier',this.checked)"> relier les points (figure)</label>`
    : modele ? `<label>droites à tracer <select onchange="qztEdGen('${id}','n',parseInt(this.value,10))"><option value="1"${g.n != 2 ? ' selected' : ''}>une : (d₁) par A</option><option value="2"${g.n == 2 ? ' selected' : ''}>deux : (d₁) par A, (d₂) par B</option></select></label>
       <label class="qz-check"><input type="checkbox" ${g.obliques !== false ? 'checked' : ''} onchange="qztEdGen('${id}','obliques',this.checked)"> droite (d) parfois oblique</label>` : '';
  return `<span class="qz-lab">Tracé sur quadrillage <span class="hint" style="margin:0;">(l'élève place des points sur les nœuds, puis trace droites, segments ou demi-droites entre deux points ; corrigé automatiquement)</span></span>
    <div class="qz-reg-grid">
      <label>Modèle <select onchange="qztEdModele('${id}',this.value)"><option value=""${!modele ? ' selected' : ''}>Libre : je dessine la figure et l'attendu</option>
        ${Object.entries(QZT_MODELES).map(([k, t]) => `<option value="${k}"${modele === k ? ' selected' : ''}>${t}</option>`).join('')}</select></label>
      <label>quadrillage <input type="number" min="4" max="24" value="${c.l}" style="width:56px;" onchange="qztEdGrille('${id}','l',this.value)"> × <input type="number" min="3" max="16" value="${c.h}" style="width:56px;" onchange="qztEdGrille('${id}','h',this.value)"> carreaux</label>
      ${opts}
    </div>
    ${modele ? `<div class="qzt-gen">
        <label class="qz-check"><input type="checkbox" ${g.varie ? 'checked' : ''} onchange="qztEdGen('${id}','varie',this.checked)"> <b>Une figure différente pour chaque élève</b> <span class="hint" style="margin:0;">(même consigne ; la correction suit la figure de chacun)</span></label>
        <button type="button" class="btn secondary qz-mini" onclick="qztEdTirer('${id}')"><span class="gicon">casino</span> Autre exemple</button>
        <button type="button" class="btn secondary qz-mini" onclick="qztEdModele('${id}','')" title="Garder cette figure et la modifier à la main"><span class="gicon">edit</span> Modifier à la main</button></div>` : ''}
    <div id="qztEd_${id}">${qztEdCanvas(q)}</div>`;
}
function qztEdCanvas(q){
  const id = q.id, c = qztConf(q), u = qztEdUi(id), modele = q.gen && q.gen.modele;
  const fig = qztSvg(c, [{ objs: q.figure || [], coul: QZT_COUL.depart, tirets: false }, { objs: q.solution || [], coul: QZT_COUL.attendu, tirets: true }],
    modele ? {} : { sel: u.sel, clic: `qztEdClic(event,'${id}')` });
  if(modele) return `${fig}<p class="hint" style="margin:4px 0 0;">En noir : ce que voit l'élève. En vert pointillé : ce qui est attendu${q.gen.varie ? ' (un exemple : chaque élève aura sa propre figure)' : ''}.</p>`;
  const btn = o => `<button type="button" class="qzt-outil${u.outil === o ? ' on' : ''}" onclick="qztEdOutil('${id}','${o}')"><span class="gicon">${QZT_OUTILS[o][0]}</span> ${QZT_OUTILS[o][1]}</button>`;
  return `<div class="qzt-couches"><button type="button" class="qzt-couche${u.couche === 'depart' ? ' on' : ''}" onclick="qztEdCouche('${id}','depart')"><span class="gicon">visibility</span> Ce que voit l'élève</button>
      <button type="button" class="qzt-couche att${u.couche === 'solution' ? ' on' : ''}" onclick="qztEdCouche('${id}','solution')"><span class="gicon">task_alt</span> Ce qui est attendu</button></div>
    <div class="qzt-barre">${['point', 'droite', 'segment', 'demi', 'gomme'].map(btn).join('')}</div>
    ${fig}
    <p class="hint" style="margin:4px 0 0;">Touchez un nœud pour un point (on vous demande son nom : A, B'…) ; pour une droite, touchez deux nœuds (nom facultatif : (d), (d₁)…). Attendu « points seulement » (symétrie) : l'élève n'aura que l'outil point et les noms à placer.</p>`;
}
function qztEdMaj(id){ const q = qzEdQ(id), el = document.getElementById('qztEd_' + id); if(q && el) el.innerHTML = qztEdCanvas(q); if(typeof qzEdMajTotal === 'function') qzEdMajTotal(); }
function qztEdCouche(id, k){ const u = qztEdUi(id); u.couche = k; u.sel = null; qztEdMaj(id); }
function qztEdOutil(id, o){ const u = qztEdUi(id); u.outil = o; u.sel = null; qztEdMaj(id); }
function qztEdGrille(id, k, v){ const q = qzEdQ(id); if(!q) return; q.grille = Object.assign({}, q.grille, { [k]: parseInt(v, 10) }); if(q.gen && q.gen.modele) return qztEdTirer(id); qzEdRender(); }
function qztEdModele(id, m){
  const q = qzEdQ(id); if(!q) return;
  if(!m){ q.gen = null; return qzEdRender(); } // on garde la figure actuelle, modifiable à la main
  q.gen = Object.assign({ n: 1, obliques: true, varie: true, axe: 'hasard', relier: false }, q.gen && q.gen.modele === m ? q.gen : {}, { modele: m });
  qztEdTirer(id);
}
function qztEdGen(id, k, v){ const q = qzEdQ(id); if(!q || !q.gen) return; q.gen[k] = v; if(k === 'varie') return qzEdRender(); qztEdTirer(id); }
function qztEdTirer(id){
  const q = qzEdQ(id); if(!q || !q.gen) return;
  const g = qztGenerer(q.gen, qztConf(q), Math.floor(Math.random() * 1e6));
  if(!g){ niceAlert('Le quadrillage est trop petit pour ce modèle : agrandissez-le.'); return; }
  q.figure = g.figure; q.solution = g.solution; q.enonce = g.enonce;
  qzEdRender();
}
async function qztEdClic(ev, id){
  const q = qzEdQ(id); if(!q) return;
  ev.preventDefault();
  const c = qztConf(q), t = qztNoeud(ev, c), u = qztEdUi(id); if(!t) return;
  const champ = u.couche === 'solution' ? 'solution' : 'figure';
  q[champ] = q[champ] || [];
  if(u.outil === 'gomme'){ const o = qztPlusProche(q[champ], c, t); if(o){ q[champ] = q[champ].filter(x => x !== o); qztEdMaj(id); } return; }
  if(!t.n) return;
  if(u.outil === 'point'){
    const tous = (q.figure || []).concat(q.solution || []).filter(o => o.k === 'point' && o.nom).map(o => o.nom);
    const lettre = 'ABCDEFGHIJKLMNOPRSTUV'.split('').map(l => champ === 'solution' ? l + '\'' : l).find(l => !tous.includes(l)) || '';
    const nom = await nicePrompt('Nom du point (laisser vide pour un point sans nom) :', lettre);
    if(nom === null) return;
    q[champ] = q[champ].filter(o => !(o.k === 'point' && qztEgal(o.p, t.n)));
    q[champ].push({ id: qztId(), k: 'point', nom: String(nom || '').trim(), p: t.n });
    return qztEdMaj(id);
  }
  if(!u.sel || qztEgal(u.sel, t.n)){ u.sel = u.sel ? null : t.n; return qztEdMaj(id); }
  const a = u.sel; u.sel = null;
  const nom = await nicePrompt(`Nom de ${u.outil === 'droite' ? 'la droite' : u.outil === 'demi' ? 'la demi-droite' : 'ce segment'} (facultatif, ex. (d₁)) :`, '');
  if(nom === null) return qztEdMaj(id);
  q[champ].push({ id: qztId(), k: u.outil, nom: String(nom || '').trim(), a, b: t.n });
  qztEdMaj(id);
}

// Proposé dans l'éditeur, après « Point dans un repère » ; jamais demandé à l'IA (format propre).
(function(){
  const t = { id: 'trace', label: 'Tracé sur quadrillage', icon: 'grid_on', aide: 'Placer des points, tracer droites, segments, demi-droites sur un quadrillage (parallèles, perpendiculaires, symétrie) : corrigé automatiquement.', sansIA: true };
  const i = QZ_TYPES.findIndex(x => x.id === 'repere');
  QZ_TYPES.splice(i < 0 ? QZ_TYPES.length : i + 1, 0, t);
})();

(function qztStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qzt-svg{display:block;width:100%;height:auto;margin:6px auto 0;background:#fff;border:1px solid rgba(28,43,57,.12);border-radius:10px;touch-action:none;user-select:none;-webkit-user-select:none;}
    .qzt-svg[onpointerdown]{cursor:crosshair;}
    .qzt-svg.mini{margin:0;border-radius:6px;}
    .qzt-barre{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 6px;}
    .qzt-outil{display:inline-flex;align-items:center;gap:4px;border:1.5px solid #6B3FA0;background:#fff;color:#6B3FA0;border-radius:10px;padding:5px 11px;font:700 .88rem 'Space Grotesk',sans-serif;cursor:pointer;}
    .qzt-outil.on{background:#6B3FA0;color:#fff;box-shadow:0 0 0 3px rgba(107,63,160,.22);}
    .qzt-outil:disabled{opacity:.35;cursor:default;}
    .qzt-outil .gicon{font-size:18px;}
    .qzt-aide{margin:0 0 2px !important;}
    .qzt-leg span{margin-right:10px;font-weight:700;}
    .qzt-couches{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0 4px;}
    .qzt-couche{display:inline-flex;align-items:center;gap:4px;border:1.5px solid #1C1B2E;background:#fff;color:#1C1B2E;border-radius:999px;padding:5px 12px;font-weight:700;cursor:pointer;}
    .qzt-couche.on{background:#1C1B2E;color:#fff;}
    .qzt-couche.att{border-color:#1E7B34;color:#1E7B34;} .qzt-couche.att.on{background:#1E7B34;color:#fff;}
    .qzt-gen{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:8px 0 4px;padding:8px 10px;background:#F4EFFA;border-radius:10px;}
    .qzt-mosaique{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;}
  `;
  document.head.appendChild(st);
})();

/* ============================================================
   CHAPITRE : Pensée informatique (CM2, D4, période 5)
   Programme du cycle 3 (CM2) : codages de déplacements dans des environnements plus larges
   (quartier, ville) avec davantage d'instructions ; programmes de calcul jusqu'à trois
   instructions, éventuellement codés en blocs (type Scratch) ou dans un tableur ; suites
   évolutives ; programmes de construction. Progression par rapport au CM1 : le robot ne se
   déplace plus avec des flèches « absolues » (↑ → ↓ ←) mais en s'ORIENTANT : avancer, tourner à
   gauche, tourner à droite (repères relatifs, comme Scratch et la tortue Logo).
   Atelier : un livreur à programmer dans un quartier, 4 défis.
   ============================================================ */
(() => {
const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // haut, droite, bas, gauche
const ROT = ['0', '90', '180', '270'];
const DEFIS = [
  { nom: 'Défi 1', W: 6, H: 5, dep: [0, 4, 0], but: [3, 1], obs: [[1, 3], [1, 2], [2, 3]] },
  { nom: 'Défi 2', W: 7, H: 5, dep: [0, 0, 1], but: [6, 4], obs: [[2, 0], [2, 1], [2, 2], [4, 2], [4, 3], [4, 4]] },
  { nom: 'Défi 3', W: 7, H: 7, dep: [0, 6, 0], but: [6, 0], obs: [[2, 5], [3, 4], [4, 3], [5, 2], [6, 1], [3, 0], [0, 2]], max: 5, indice: 'Monte l\'escalier avec une boucle.' },
  { nom: 'Défi 4', W: 7, H: 7, dep: [1, 5, 1], but: [1, 5], carre: true, max: 3, indice: 'Fais le tour d\'un pâté de maisons carré de 4 cases de côté et reviens au départ.' },
];
let rb = { d: 0, prog: [], pos: null, trace: [], anim: null };
const lib = c => c.t === 'av' ? `avancer de ${c.n}` : c.t === 'g' ? 'tourner à gauche' : c.t === 'd' ? 'tourner à droite' : `répéter ${c.n} fois`;
function blocHTML(c, i, j){
  const col = c.t === 'av' ? '#2EA8C9' : c.t === 'rep' ? '#B8962E' : '#7A4FC0';
  const path = j === undefined ? String(i) : i + '.' + j;
  if(c.t === 'rep') return `<div style="border-left:6px solid ${col};background:rgba(184,150,46,.08);border-radius:8px;padding:4px 6px;margin:4px 0;"><span onclick="c2RbSuppr('${path}')" title="Retirer" style="cursor:pointer;display:inline-block;background:${col};color:#fff;border-radius:6px;padding:3px 10px;font-weight:700;">répéter ${c.n} fois</span> <button class="btn secondary" style="padding:2px 8px;" onclick="c2RbOuvrir(${i})">${rb.ouverte === c ? '✓ j\'ajoute dedans' : 'ajouter dedans'}</button>
    <div style="margin-left:14px;">${c.corps.map((b, k) => blocHTML(b, i, k)).join('') || '<span class="hint">vide</span>'}</div></div>`;
  return `<div><span onclick="c2RbSuppr('${path}')" title="Retirer" style="cursor:pointer;display:inline-block;background:${col};color:#fff;border-radius:6px;padding:3px 10px;margin:2px 0;font-weight:700;">${lib(c)}</span></div>`;
}
function aplatir(p){ const r = []; p.forEach(c => { if(c.t === 'rep') for(let i = 0; i < c.n; i++) r.push(...aplatir(c.corps)); else if(c.t === 'av') for(let i = 0; i < c.n; i++) r.push('a'); else r.push(c.t); }); return r; }
const nb = p => p.reduce((s, c) => s + 1 + (c.t === 'rep' ? nb(c.corps) : 0), 0);
function grille(){
  const df = DEFIS[rb.d], k = 44, m = 6, X = x => m + x * k + k / 2, Y = y => m + y * k + k / 2;
  let s = `<svg viewBox="0 0 ${df.W * k + 2 * m} ${df.H * k + 2 * m}" style="width:100%;max-width:${df.W * k + 2 * m}px;display:block;margin:0 auto;">`;
  for(let y = 0; y < df.H; y++) for(let x = 0; x < df.W; x++) s += `<rect x="${m + x * k}" y="${m + y * k}" width="${k}" height="${k}" fill="#F4F7FA" stroke="#C9D5E1"/>`;
  (df.obs || []).forEach(([x, y]) => { s += `<text x="${X(x)}" y="${Y(y) + 9}" font-size="24" text-anchor="middle">🏠</text>`; });
  if(df.carre) for(let y = 2; y <= 4; y++) for(let x = 2; x <= 4; x++) s += `<text x="${X(x)}" y="${Y(y) + 9}" font-size="22" text-anchor="middle">🏢</text>`;
  s += `<text x="${X(df.but[0])}" y="${Y(df.but[1]) + 10}" font-size="26" text-anchor="middle">📦</text>`;
  if(rb.trace.length > 1) s += `<polyline points="${rb.trace.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="3" stroke-dasharray="6 4"/>`;
  const [px, py, o] = rb.pos || df.dep;
  s += `<g transform="translate(${X(px)},${Y(py)}) rotate(${ROT[o]})"><circle r="15" fill="#2E9C6A"/><polygon points="0,-13 7,2 -7,2" fill="#fff"/></g>`;
  return s + '</svg>';
}
function rendre(msg){
  const df = DEFIS[rb.d];
  const g = document.getElementById('c2rb-grille'); if(g) g.innerHTML = grille();
  const p = document.getElementById('c2rb-prog'); if(p) p.innerHTML = rb.prog.length ? rb.prog.map((c, i) => blocHTML(c, i)).join('') : '<span class="hint">Programme vide : ajoute des blocs.</span>';
  const n = document.getElementById('c2rb-info'); if(n) n.innerHTML = (df.indice ? df.indice + ' ' : 'Amène le livreur jusqu\'au colis sans passer sur les maisons. ') + (df.max ? `<b>Au plus ${df.max} blocs</b> (tu en as ${nb(rb.prog)}).` : '');
  const v = document.getElementById('c2rb-msg'); if(v) v.innerHTML = msg || '';
  document.querySelectorAll('.c2rb-d').forEach((b, i) => b.classList.toggle('secondary', i !== rb.d));
}
function reset(){ if(rb.anim) clearInterval(rb.anim); rb.anim = null; rb.pos = DEFIS[rb.d].dep.slice(); rb.trace = [rb.pos.slice(0, 2)]; }
const ref = path => { const [i, j] = path.split('.').map(Number); return isNaN(j) ? [rb.prog, i] : [rb.prog[i].corps, j]; };
window.c2RbDefi = i => { rb.d = i; rb.prog = []; rb.ouverte = null; reset(); rendre(); };
window.c2RbAjout = t => { const n = +(document.getElementById('c2rb-n') || {}).value || 1; const b = t === 'rep' ? { t, n, corps: [] } : t === 'av' ? { t, n } : { t };
  (rb.ouverte && t !== 'rep' ? rb.ouverte.corps : rb.prog).push(b); if(t === 'rep') rb.ouverte = b; reset(); rendre(); };
window.c2RbOuvrir = i => { rb.ouverte = rb.ouverte === rb.prog[i] ? null : rb.prog[i]; rendre(); };
window.c2RbSuppr = path => { const [l, k] = ref(path); if(l[k] === rb.ouverte) rb.ouverte = null; l.splice(k, 1); reset(); rendre(); };
window.c2RbEffacer = () => { rb.prog = []; rb.ouverte = null; reset(); rendre(); };
window.c2RbLancer = rapide => {
  reset(); const df = DEFIS[rb.d], pas = aplatir(rb.prog); let k = 0, fini = false; const vus = new Set();
  const fin = msg => { fini = true; if(rb.anim) clearInterval(rb.anim); rb.anim = null; rendre(msg); };
  const bloque = (x, y) => (df.obs || []).some(([a, b]) => a === x && b === y) || (df.carre && x >= 2 && x <= 4 && y >= 2 && y <= 4);
  const un = () => {
    if(k >= pas.length){
      const ok = rb.pos[0] === df.but[0] && rb.pos[1] === df.but[1] && (!df.carre || vus.size >= 16);
      if(ok && df.max && nb(rb.prog) > df.max) return fin(`<b style="color:#B8962E;">Le colis est livré, mais avec ${nb(rb.prog)} blocs : essaie avec ${df.max} blocs au plus, grâce à « répéter ».</b>`);
      return fin(ok ? '<b style="color:#2E9C6A;">Bravo, colis livré ! 📦</b>' : df.carre ? '<b style="color:#E35D3A;">Le livreur doit faire tout le tour du pâté de maisons et revenir à son point de départ.</b>' : '<b style="color:#E35D3A;">Le livreur n\'est pas sur le colis : cherche le bug.</b>');
    }
    const c = pas[k++];
    if(c === 'g') rb.pos[2] = (rb.pos[2] + 3) % 4; else if(c === 'd') rb.pos[2] = (rb.pos[2] + 1) % 4;
    else { const [dx, dy] = DIRS[rb.pos[2]], nx = rb.pos[0] + dx, ny = rb.pos[1] + dy;
      if(nx < 0 || ny < 0 || nx >= df.W || ny >= df.H) return fin(`<b style="color:#E35D3A;">Bug à l'instruction ${k} : le livreur sort du quartier !</b>`);
      if(bloque(nx, ny)) return fin(`<b style="color:#E35D3A;">Bug à l'instruction ${k} : le livreur rentre dans une maison !</b>`);
      rb.pos[0] = nx; rb.pos[1] = ny; rb.trace.push([nx, ny]); vus.add(nx + ',' + ny); }
    rendre();
  };
  if(rapide){ while(!fini) un(); return; }
  rb.anim = setInterval(un, 330);
};
const B = (t, c) => `<span style="display:inline-block;background:${c};color:#fff;font-weight:700;border-radius:6px;padding:2px 9px;margin:2px 0;">${t}</span>`;
const Bav = n => B(`avancer de ${n}`, '#2EA8C9'), Bg = B('tourner à gauche', '#7A4FC0'), Bd = B('tourner à droite', '#7A4FC0');
cm1Chapitre({
  niveau: 'cm2', titre: 'Pensée informatique', slug: 'pensee-informatique',
  cours: `
${cm1Lecon(1, 'Se déplacer en s\'orientant')}
${cm1Regle(`Au CM1, le robot se déplaçait avec des flèches (↑ → ↓ ←). Au CM2, il se déplace <b>comme toi</b> : il regarde dans une direction et obéit à trois instructions :<br>${Bav(2)} avance de 2 cases <b>devant lui</b> · ${Bg} tourne d'un quart de tour vers sa gauche <b>sur place</b> · ${Bd} tourne d'un quart de tour vers sa droite.`)}
${cm1Astuce('« À gauche » dépend de l\'orientation du robot ! Si le robot regarde vers le bas de l\'écran, sa gauche est à droite de l\'écran. Mets-toi à sa place : tourne ta feuille ou ton corps.')}

${cm1Lecon(2, 'Répéter : la boucle')}
${cm1Exemple('Tracer un carré de côté 3 :', [`sans boucle : ${Bav(3)} ${Bd} ${Bav(3)} ${Bd} ${Bav(3)} ${Bd} ${Bav(3)} ${Bd} (8 blocs) ;`, `avec une boucle : ${B('répéter 4 fois', '#B8962E')} ( ${Bav(3)} ${Bd} ) (3 blocs).`])}

${cm1Lecon(3, 'Programmes de calcul en blocs')}
${cm1Def('Un programme de calcul peut s\'écrire avec des <b>blocs</b>, comme dans Scratch :')}
<div class="figure-wrap" style="text-align:left;display:inline-block;">${B('choisir un nombre entier', '#E35D3A')}<br>${B('ajouter 2', '#2E9C6A')}<br>${B('multiplier le résultat par 4', '#2E9C6A')}<br>${B('retirer 3', '#2E9C6A')}<br>${B('écrire le nombre obtenu', '#E35D3A')}</div>
${cm1Exemple('Exécution :', ['Avec 5 : 5 + 2 = 7 → 7 × 4 = 28 → 28 − 3 = <b>25</b>.', 'Avec 0 : 0 + 2 = 2 → 8 → <b>5</b>.'])}

${cm1Lecon(4, 'Suites avec un tableur')}
${cm1Regle('Dans un <b>tableur</b>, on peut calculer les termes d\'une suite très loin : si la cellule A1 contient 7 et que la cellule A2 contient la formule « = A1 × 2 + 1 », en recopiant la formule vers le bas on obtient 7 ; 15 ; 31 ; 63 ; 127… sans rien calculer à la main.')}
`,
  methode: `
${cm1Demo('c2-pi-lire', 'Exécuter un programme orienté', 'Le robot regarde vers le haut. Programme : avancer de 2 · tourner à droite · avancer de 3 · tourner à droite · avancer de 1. Où est-il et vers où regarde-t-il ?')}
${cm1Sous('A', 'Atelier : programme le livreur')}
<div class="figure-wrap"><div class="figure-toolbar" style="margin-bottom:8px;">${DEFIS.map((d, i) => `<button class="btn c2rb-d ${i ? 'secondary' : ''}" onclick="c2RbDefi(${i})">${d.nom}</button>`).join('')}</div>
<p id="c2rb-info" class="hint" style="text-align:center;margin:0 0 6px;"></p><div id="c2rb-grille"></div>
<div class="figure-toolbar" style="margin-top:10px;flex-wrap:wrap;align-items:center;">nombre : <select id="c2rb-n" style="font-size:1rem;padding:3px;">${[1, 2, 3, 4, 5, 6].map(n => `<option>${n}</option>`).join('')}</select>
<button class="btn" style="background:#2EA8C9;" onclick="c2RbAjout('av')">avancer</button><button class="btn" style="background:#7A4FC0;" onclick="c2RbAjout('g')">tourner à gauche</button><button class="btn" style="background:#7A4FC0;" onclick="c2RbAjout('d')">tourner à droite</button><button class="btn" style="background:#B8962E;" onclick="c2RbAjout('rep')">répéter</button></div>
<div id="c2rb-prog" style="min-height:48px;margin:8px 0;padding:8px;border:2px dashed #B9C7D6;border-radius:10px;"></div>
<div class="figure-toolbar"><button class="btn" onclick="c2RbLancer(false)">▶ Lancer</button><button class="btn secondary" onclick="c2RbEffacer()">Effacer</button></div><p id="c2rb-msg" style="text-align:center;min-height:22px;"></p>
<p class="hint" style="text-align:center;">Clique sur un bloc pour le retirer. Après « répéter », les blocs suivants vont dans la boucle tant que « ✓ j'ajoute dedans » est affiché.</p></div>
`,
  demos: [
    ['c2-pi-lire', [
      { expr: 'avancer de 2 → 2 cases vers le haut', note: 'Le robot regarde vers le haut : il monte de 2 cases.' },
      { expr: 'tourner à droite → il regarde vers la droite', note: 'Il tourne sur place, sans avancer.' },
      { expr: 'avancer de 3 → 3 cases vers la droite', note: 'Il avance dans la direction où il regarde.' },
      { expr: 'tourner à droite → il regarde vers le bas ; avancer de 1', note: 'Un quart de tour de plus à droite : il regarde vers le bas et descend d\'une case.' },
      { expr: 'Arrivée : 3 cases à droite, 1 case au-dessus du départ ; il regarde vers le bas.', note: 'On peut vérifier en suivant le chemin avec le doigt.' },
    ]],
  ],
  exos: cm1Exos('c2pi', [
    ['Le robot regarde vers la droite. Il exécute : tourner à gauche · tourner à gauche. Vers où regarde-t-il ?', 'Vers la gauche (il a fait un demi-tour).'],
    ['Écris un programme avec une boucle pour tracer un rectangle de 4 cases sur 2.', 'répéter 2 fois (avancer de 4 · tourner à droite · avancer de 2 · tourner à droite).'],
    ['Que trace : répéter 3 fois (avancer de 2 · tourner à gauche · avancer de 2 · tourner à droite) ?', 'Un escalier de 3 marches (qui monte vers la gauche du robot).'],
    ['Programme de calcul : choisir un nombre · le multiplier par 3 · ajouter 4 · multiplier par 2. Exécute-le avec 1, 5 et 10.', '1 → 3 → 7 → 14 · 5 → 15 → 19 → 38 · 10 → 30 → 34 → 68.'],
    ['Avec ce même programme, quel nombre a été choisi si on obtient 50 ?', 'On remonte : 50 ÷ 2 = 25 ; 25 − 4 = 21 ; 21 ÷ 3 = 7.'],
    ['Suite dans un tableur : A1 = 2 et « = A1 × 3 » recopiée vers le bas. Écris les 5 premiers termes.', '2 · 6 · 18 · 54 · 162.'],
    ['Dans l\'atelier, réussis les 4 défis. Pour le défi 4, écris un programme de 3 blocs.', 'Défi 3 : répéter 6 fois (avancer de 1 · tourner à droite · avancer de 1 · tourner à gauche). Défi 4 : répéter 4 fois (avancer de 4 · tourner à gauche) : le livreur regarde vers la droite et le pâté de maisons est au-dessus de lui.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la tortue Logo', [
    'En 1967, le chercheur <b>Seymour Papert</b> invente le langage <b>Logo</b> pour les enfants. Ils programment une petite tortue, parfois un vrai robot posé sur le sol, avec des ordres comme « AVANCE 50 », « TOURNE DROITE 90 ».',
    'L\'idée de Papert : en se mettant à la place de la tortue (« si j\'étais la tortue, que ferais-je ? »), l\'enfant apprend la géométrie en jouant. <b>Scratch</b>, créé en 2007 par une équipe du MIT, en est un descendant.',
  ]),
  quiz: [
    { q: 'Le robot regarde vers le haut et tourne à droite. Il regarde…', opts: ['vers le bas', 'vers la droite', 'vers la gauche'], correct: 1 },
    { q: '« répéter 4 fois (avancer de 3, tourner à droite) » trace…', opts: ['un carré', 'un triangle', 'une ligne'], correct: 0 },
    { q: 'Programme : ajouter 2 puis multiplier par 4. Avec 3 ?', opts: ['14', '20', '11'], correct: 1 },
  ],
  init: () => { reset(); rendre(); },
});
})();

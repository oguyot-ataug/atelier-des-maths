/* ============================================================
   CHAPITRE : Initiation à la pensée informatique (CM1, D4, période 5)
   Programme du cycle 3 (CM1) : coder et décoder des déplacements sur quadrillage (flèches
   absolues ↑ ↓ ← →, puis « avancer / tourner » en CM2-6e) ; lire un programme et prévoir le
   résultat ; écrire un programme pour atteindre une cible en évitant des obstacles ; repérer et
   corriger une erreur (« bug ») ; découvrir la boucle « répéter n fois » ; suivre un programme
   de calcul et un programme de construction. Activités débranchées possibles (quadrillage au
   sol). Atelier : robot à programmer avec des flèches, 4 défis.
   ============================================================ */
(() => {
const DIR = { h: [0, -1, '↑'], b: [0, 1, '↓'], g: [-1, 0, '←'], d: [1, 0, '→'] };
const DEFIS = [
  { nom: 'Défi 1', W: 6, H: 5, dep: [0, 4], but: [4, 1], obs: [] },
  { nom: 'Défi 2', W: 6, H: 5, dep: [0, 4], but: [5, 0], obs: [[1, 3], [2, 3], [3, 1], [4, 1], [4, 2]] },
  { nom: 'Défi 3', W: 7, H: 6, dep: [0, 5], but: [6, 0], obs: [[1, 4], [3, 2], [5, 0]], max: 4 },
  { nom: 'Défi 4', W: 7, H: 6, dep: [1, 1], but: [5, 4], obs: [[2, 1], [3, 1], [4, 1], [2, 2], [2, 3], [4, 4]] },
];
let rb = { d: 0, prog: [], pos: null, trace: [], anim: null };
const cmd = c => `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 6px;border-radius:8px;background:${c.rep ? '#B8962E' : '#2EA8C9'};color:#fff;font-weight:700;font-size:1.1rem;margin:2px;">${c.rep ? `répéter ${c.n} × ${DIR[c.f][2]}` : DIR[c.f][2]}</span>`;
function aplatir(p){ const r = []; p.forEach(c => { for(let i = 0; i < (c.rep ? c.n : 1); i++) r.push(c.f); }); return r; }
function grille(){
  const df = DEFIS[rb.d], k = 46, m = 6, W = df.W * k + 2 * m, H = df.H * k + 2 * m, X = x => m + x * k + k / 2, Y = y => m + y * k + k / 2;
  let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:0 auto;">`;
  for(let y = 0; y < df.H; y++) for(let x = 0; x < df.W; x++) s += `<rect x="${m + x * k}" y="${m + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6"/>`;
  df.obs.forEach(([x, y]) => { s += `<rect x="${m + x * k + 3}" y="${m + y * k + 3}" width="${k - 6}" height="${k - 6}" rx="6" fill="#8A6A2E"/><text x="${X(x)}" y="${Y(y) + 6}" font-size="18" text-anchor="middle">🪨</text>`; });
  s += `<text x="${X(df.but[0])}" y="${Y(df.but[1]) + 9}" font-size="26" text-anchor="middle">⭐</text>`;
  if(rb.trace.length > 1) s += `<polyline points="${rb.trace.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="3" stroke-dasharray="6 4"/>`;
  const [px, py] = rb.pos || df.dep; s += `<text x="${X(px)}" y="${Y(py) + 10}" font-size="28" text-anchor="middle">🤖</text>`;
  return s + '</svg>';
}
function rendre(msg){
  const df = DEFIS[rb.d];
  const g = document.getElementById('rb-grille'); if(g) g.innerHTML = grille();
  const p = document.getElementById('rb-prog'); if(p) p.innerHTML = rb.prog.length ? rb.prog.map((c, i) => `<span style="cursor:pointer;" title="Cliquer pour retirer" onclick="cm1RbSuppr(${i})">${cmd(c)}</span>`).join('') : '<span class="hint">Ton programme est vide : clique sur les flèches.</span>';
  const n = document.getElementById('rb-info'); if(n) n.innerHTML = df.max ? `Contrainte : au plus <b>${df.max} blocs</b> (utilise « répéter »). Tu en as ${rb.prog.length}.` : 'Amène le robot jusqu\'à l\'étoile sans toucher les rochers.';
  const v = document.getElementById('rb-msg'); if(v) v.innerHTML = msg || '';
  document.querySelectorAll('.rb-defi').forEach((b, i) => b.classList.toggle('secondary', i !== rb.d));
}
function reset(){ if(rb.anim) clearInterval(rb.anim); rb.anim = null; rb.pos = DEFIS[rb.d].dep.slice(); rb.trace = [rb.pos.slice()]; }
window.cm1RbDefi = i => { rb.d = i; rb.prog = []; reset(); rendre(); };
window.cm1RbAjout = f => { const r = document.getElementById('rb-rep'), n = r ? +r.value : 1; rb.prog.push(n > 1 ? { rep: true, n, f } : { f }); if(r) r.value = '1'; reset(); rendre(); };
window.cm1RbSuppr = i => { rb.prog.splice(i, 1); reset(); rendre(); };
window.cm1RbEffacer = () => { rb.prog = []; reset(); rendre(); };
window.cm1RbLancer = rapide => {
  reset(); const df = DEFIS[rb.d], pas = aplatir(rb.prog); let k = 0;
  let fini = false;
  const fin = msg => { fini = true; if(rb.anim) clearInterval(rb.anim); rb.anim = null; rendre(msg); };
  const un = () => {
    if(k >= pas.length){
      const ok = rb.pos[0] === df.but[0] && rb.pos[1] === df.but[1];
      if(ok && df.max && rb.prog.length > df.max) return fin(`<b style="color:#B8962E;">Le robot arrive à l'étoile, mais avec ${rb.prog.length} blocs : essaie avec ${df.max} blocs au plus, grâce à « répéter ».</b>`);
      return fin(ok ? '<b style="color:#2E9C6A;">Bravo ! Le robot a atteint l\'étoile. ⭐</b>' : '<b style="color:#E35D3A;">Le robot n\'est pas sur l\'étoile : cherche le bug et corrige ton programme.</b>');
    }
    const [dx, dy] = DIR[pas[k]], nx = rb.pos[0] + dx, ny = rb.pos[1] + dy; k++;
    if(nx < 0 || ny < 0 || nx >= df.W || ny >= df.H) return fin(`<b style="color:#E35D3A;">Bug à l'instruction ${k} : le robot sortirait du quadrillage !</b>`);
    if(df.obs.some(([x, y]) => x === nx && y === ny)) return fin(`<b style="color:#E35D3A;">Bug à l'instruction ${k} : le robot heurte un rocher !</b>`);
    rb.pos = [nx, ny]; rb.trace.push(rb.pos.slice()); rendre();
  };
  if(rapide){ while(!fini) un(); return; }
  rb.anim = setInterval(un, 380);
};
const P = t => `<span style="display:inline-block;background:#2EA8C9;color:#fff;font-weight:700;border-radius:6px;padding:1px 8px;margin:0 1px;">${t}</span>`;
function grilleStatique(){
  const k = 34, pts = [[0, 3], [1, 3], [2, 3], [2, 2], [2, 1], [3, 1]]; let s = `<svg viewBox="0 0 ${5 * k + 4} ${4 * k + 4}" style="width:${5 * k + 4}px;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < 4; y++) for(let x = 0; x < 5; x++) s += `<rect x="${2 + x * k}" y="${2 + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6"/>`;
  s += `<polyline points="${pts.map(([x, y]) => (2 + x * k + k / 2) + ',' + (2 + y * k + k / 2)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="3"/>`;
  s += `<text x="${2 + k / 2}" y="${2 + 3 * k + k / 2 + 8}" font-size="22" text-anchor="middle">🤖</text><text x="${2 + 3 * k + k / 2}" y="${2 + k + k / 2 + 8}" font-size="22" text-anchor="middle">⭐</text>`;
  return s + '</svg>';
}
cm1Chapitre({
  titre: 'Initiation à la pensée informatique', slug: 'pensee-informatique',
  cours: `
${cm1Lecon(1, 'Coder un déplacement')}
${cm1Def('Un <b>programme</b> est une suite d\'<b>instructions</b> précises, écrites dans l\'ordre, qu\'un robot (ou un ordinateur) exécute les unes après les autres, sans jamais réfléchir à notre place.')}
${cm1Regle(`Sur un quadrillage, on code un déplacement d'une case avec une flèche : ${P('↑')} vers le haut, ${P('↓')} vers le bas, ${P('←')} vers la gauche, ${P('→')} vers la droite.`, 'Le code')}
<div class="figure-wrap" style="display:flex;gap:20px;align-items:center;justify-content:center;flex-wrap:wrap;">${grilleStatique()}<div style="font-size:1.1rem;">Programme : ${P('→')}${P('→')}${P('↑')}${P('↑')}${P('→')}</div></div>
${cm1Exemple('Lecture :', ['le robot avance de 2 cases vers la droite, monte de 2 cases, puis va d\'une case à droite : il arrive sur l\'étoile.'])}
${cm1Astuce(`L'<b>ordre</b> des instructions est très important : ${P('↑')}${P('→')} et ${P('→')}${P('↑')} n'arrivent au même endroit que s'il n'y a pas d'obstacle sur le chemin !`)}

${cm1Lecon(2, 'Répéter : la boucle')}
${cm1Regle(`Quand une instruction se répète, on peut l'écrire plus court avec une <b>boucle</b> : « répéter 4 fois ${P('→')} » remplace ${P('→')}${P('→')}${P('→')}${P('→')}.`)}
${cm1Exemple('On peut aussi répéter un groupe d\'instructions :', [`« répéter 3 fois : ${P('→')}${P('↑')} » donne ${P('→')}${P('↑')}${P('→')}${P('↑')}${P('→')}${P('↑')} : le robot monte un escalier.`])}

${cm1Lecon(3, 'Trouver et corriger un bug')}
${cm1Def('Un <b>bug</b> est une erreur dans un programme : le robot ne fait pas ce qu\'on voulait. <b>Déboguer</b>, c\'est trouver l\'instruction fausse et la corriger.')}
${cm1Regle('Pour trouver un bug, on exécute le programme <b>pas à pas</b>, avec le doigt sur le quadrillage, en vérifiant la position après chaque instruction.', 'Méthode')}

${cm1Lecon(4, 'D\'autres programmes')}
${cm1Exemple('Un programme de calcul est aussi une suite d\'instructions :', ['« Choisis un nombre → ajoute 5 → multiplie par 2 ». Avec 3 : 3 + 5 = 8, puis 8 × 2 = 16.'])}
${cm1Exemple('Un programme de construction aussi :', ['« Trace un segment [AB] de 5 cm. Trace la droite perpendiculaire à [AB] passant par A… » : chaque étape doit être claire et dans le bon ordre.'])}
`,
  methode: `
${cm1Demo('pi-lire', 'Lire un programme et prévoir l\'arrivée', 'Le robot part de la case en bas à gauche. Programme : répéter 3 fois → puis ↑ ↑ puis ←. Où arrive-t-il ?')}
${cm1Sous('A', 'Atelier : programme le robot')}
<div class="figure-wrap"><div class="figure-toolbar" style="margin-bottom:8px;">${DEFIS.map((d, i) => `<button class="btn rb-defi ${i ? 'secondary' : ''}" onclick="cm1RbDefi(${i})">${d.nom}</button>`).join('')}</div>
<p id="rb-info" class="hint" style="text-align:center;margin:0 0 6px;"></p><div id="rb-grille"></div>
<div class="figure-toolbar" style="margin-top:10px;flex-wrap:wrap;align-items:center;">répéter <select id="rb-rep" style="font-size:1rem;padding:3px;">${[1, 2, 3, 4, 5, 6].map(n => `<option value="${n}">${n}</option>`).join('')}</select> fois :
${Object.entries(DIR).map(([k, v]) => `<button class="btn" style="font-size:1.2rem;min-width:44px;" onclick="cm1RbAjout('${k}')">${v[2]}</button>`).join('')}</div>
<div id="rb-prog" style="min-height:44px;margin:8px 0;padding:6px;border:2px dashed #B9C7D6;border-radius:10px;text-align:center;"></div>
<div class="figure-toolbar"><button class="btn" onclick="cm1RbLancer(false)">▶ Lancer</button><button class="btn secondary" onclick="cm1RbEffacer()">Effacer</button></div><p id="rb-msg" style="text-align:center;min-height:22px;"></p></div>
`,
  demos: [
    ['pi-lire', [
      { expr: 'Départ : case en bas à gauche', note: 'On pose le doigt sur la case de départ.' },
      { expr: 'répéter 3 fois → : 3 cases à droite', note: 'La boucle fait avancer le robot de 3 cases vers la droite.' },
      { expr: '↑ ↑ : 2 cases vers le haut', note: 'On continue dans l\'ordre du programme.' },
      { expr: '← : 1 case à gauche', note: 'Dernière instruction.' },
      { expr: 'Arrivée : 2 cases à droite et 2 cases au-dessus du départ', note: 'En tout : 3 − 1 = 2 cases à droite, 2 cases vers le haut.' },
    ]],
  ],
  exos: cm1Exos('pi', [
    [`Le robot part d'une case. Programme : ${P('→')}${P('→')}${P('↓')}${P('←')}${P('↓')}. De combien de cases s'est-il déplacé vers la droite, vers le bas ?`, '2 − 1 = 1 case vers la droite ; 2 cases vers le bas.'],
    [`Écris plus court avec des boucles : ${P('↑')}${P('↑')}${P('↑')}${P('↑')}${P('↑')}${P('→')}${P('→')}`, `répéter 5 fois ${P('↑')} puis répéter 2 fois ${P('→')}.`],
    [`Que dessine le programme « répéter 4 fois : ${P('→')}${P('→')}${P('↓')}${P('↓')} » si le crayon trace le chemin ?`, 'Un escalier de 4 marches qui descend vers la droite (chaque marche : 2 cases à droite, 2 cases vers le bas).'],
    [`Sam veut tracer un carré de 3 cases de côté : ${P('→')}${P('→')}${P('→')}${P('↓')}${P('↓')}${P('↓')}${P('←')}${P('←')}${P('↑')}${P('↑')}${P('↑')}. Le robot ne revient pas à son départ. Trouve le bug.`, `Il manque un ${P('←')} : il faut 3 flèches ← (le côté du bas a 3 cases).`],
    ['Dans l\'atelier de l\'onglet Méthode, réussis les 4 défis. Pour le défi 3, utilise au plus 4 blocs.', `Défi 3 : répéter 6 fois ${P('→')} puis répéter 5 fois ${P('↑')} (2 blocs seulement ! En montant d'abord, le robot tomberait sur le rocher en haut).`],
    ['Écris un programme de calcul qui transforme 4 en 20, puis teste-le avec 10.', 'Par exemple « multiplier par 5 » : 4 × 5 = 20, 10 × 5 = 50. Ou « ajouter 16 » : 10 + 16 = 26.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Ada Lovelace, la première programmeuse', [
    'En 1843, l\'Anglaise <b>Ada Lovelace</b> écrit ce qu\'on considère comme le <b>premier programme informatique</b>, pour une machine à calculer imaginée par son ami Charles Babbage. Elle avait compris qu\'une machine pourrait un jour faire bien plus que des calculs : de la musique, des dessins…',
    'Dans les années 1960, le chercheur <b>Seymour Papert</b> invente le langage <b>Logo</b> pour les enfants : ils programment une petite « tortue » qui se déplace et dessine. Scratch, que tu utiliseras peut-être au collège, en est un lointain héritier.',
  ]),
  quiz: [
    { q: 'Un programme est…', opts: ['une suite d\'instructions dans l\'ordre', 'un dessin', 'un calcul au hasard'], correct: 0 },
    { q: '« répéter 3 fois → » fait avancer le robot de…', opts: ['1 case', '3 cases', '4 cases'], correct: 1 },
    { q: 'Une erreur dans un programme s\'appelle…', opts: ['un bug', 'une boucle', 'un robot'], correct: 0 },
  ],
  init: () => { reset(); rendre(); },
});
})();

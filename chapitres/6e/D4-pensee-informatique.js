/* ============================================================
   CHAPITRE : Initiation à la pensée informatique (6e, D4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Demandé : « Crée le chapitre pensée informatique pour la 6e », après le contrôle du programme
   du cycle 3 (BO) : « l'initiation progressive à la compréhension de notions plus spécifiques de
   l'informatique : instructions, séquences d'instructions, entrées, sorties, répétitions. [...]
   avec ou sans machine (robot ou logiciel de programmation graphique par blocs comme Scratch) ».
   Objectifs : identifier une instruction ou une séquence d'instructions ; produire et exécuter une
   séquence d'instructions ; répéter à la main une séquence d'instructions pour accomplir une tâche
   imposée ; programmer la construction d'un chemin simple.

   §1 Instruction et séquence (l'ordre compte). §2 Entrées et sorties : programme de calcul
   exécutable (on choisit l'entrée, le tableau de suivi se remplit). §3 Répétition : « répéter
   4 fois » trace un carré. Méthode : exécuter un programme à la main (tableau de suivi) ; le robot
   programmable par blocs façon Scratch (avancer de n cases, tourner, répéter n fois), avec 4 défis
   (atteindre l'étoile, contourner des murs, dessiner un escalier et un carré avec peu de blocs).
   Blocs aux couleurs de Scratch : mouvement bleu, contrôle orange, opérateurs vert.
   ============================================================ */

/* ---------- Blocs façon Scratch (HTML statique) ---------- */
function piBloc(txt, genre){ return `<span class="pi-bloc ${genre || 'mv'}">${txt}</span>`; }
function piPile(lignes){ return `<div class="pi-pile">${lignes.join('')}</div>`; }
function piBoucle(n, corps){ return `<div class="pi-boucle"><span class="pi-bloc ct">répéter <b class="pi-n">${n}</b> fois</span><div class="pi-corps">${corps.join('')}</div><span class="pi-bloc ct pi-fin"></span></div>`; }

document.getElementById('cours-demo-pensee-info-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Instruction et séquence d'instructions</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  Une <b>instruction</b> est un ordre simple et précis, qu'on peut exécuter sans avoir à réfléchir : « avancer d'une case », « ajouter 2 », « tourner à droite ».<br>
  Une <b>séquence d'instructions</b> est une suite d'instructions exécutées <b>les unes après les autres, dans l'ordre</b>. Un <b>programme</b> est une séquence d'instructions écrite pour accomplir une tâche.
</div>
<p class="example-title">Exemple : le robot part de la case D (flèche vers la droite). Où arrive-t-il ?</p>
<div style="display:flex;gap:18px;flex-wrap:wrap;align-items:center;">
  ${piPile([piBloc('quand le drapeau est cliqué', 'ev'), piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à gauche ↺'), piBloc('avancer de <b class="pi-n">2</b>')])}
  <div class="figure-wrap" style="max-width:260px;margin:0;">${piGrilleStatique(6, 4, [0, 3, 0], [[0,3],[3,3],[3,1]], [3, 1])}</div>
</div>
<ul class="example-list">
  <li>Il avance de 3 cases vers la droite, se tourne vers le haut, puis avance de 2 cases : il arrive sur l'étoile.</li>
  <li><b>L'ordre compte</b> : « tourner à gauche » puis « avancer de 3 », puis « avancer de 2 » ne mène pas au même endroit !</li>
</ul>

<div class="lesson-header"><span class="num">2</span><h3>Entrées et sorties</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  Les <b>entrées</b> d'un programme sont les données qu'on lui fournit au départ (un nombre choisi, une longueur…). Les <b>sorties</b> sont les résultats qu'il donne à la fin (un nombre affiché, une figure tracée…). Avec les mêmes entrées, un programme donne toujours les mêmes sorties.
</div>
<p class="example-title">Exemple : un programme de calcul. Choisis le nombre d'entrée et exécute-le.</p>
<div class="figure-wrap">
  <div style="display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start;">
    ${piPile([piBloc('demander un nombre (entrée)', 'ev'), piBloc('ajouter <b class="pi-n">2</b>', 'op'), piBloc('multiplier par <b class="pi-n">4</b>', 'op'), piBloc('retirer <b class="pi-n">3</b>', 'op'), piBloc('afficher le résultat (sortie)', 'ev')])}
    <div style="flex:1;min-width:220px;">
      <label style="display:flex;gap:8px;align-items:center;font-weight:600;">Entrée : <input type="number" id="piCalcEntree" value="5" style="width:90px;padding:6px 8px;border-radius:8px;border:1.5px solid rgba(28,43,57,.2);font:600 1rem 'Space Grotesk',sans-serif;"></label>
      <div class="figure-toolbar" style="justify-content:flex-start;margin-top:8px;"><button class="btn" onclick="piCalcPas()">Instruction suivante →</button><button class="btn secondary" onclick="piCalcReset()">Recommencer</button></div>
      <table class="pi-suivi" id="piCalcTable"></table>
      <p class="hint" id="piCalcSortie" style="margin:8px 0 0;"></p>
    </div>
  </div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Répéter une séquence d'instructions</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Quand une même séquence d'instructions revient plusieurs fois, on l'écrit <b>une seule fois</b> dans une <b>boucle</b> « répéter … fois ». Le programme est plus court, et on fait moins d'erreurs en l'écrivant.</div>
<p class="example-title">Exemple : ces deux programmes tracent le même carré de 3 cases de côté.</p>
<div style="display:flex;gap:20px;flex-wrap:wrap;align-items:center;">
  ${piPile([piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à droite ↻'), piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à droite ↻'), piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à droite ↻'), piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à droite ↻')])}
  <span style="font:700 1.4rem 'Space Grotesk',sans-serif;color:#5B6472;">=</span>
  ${piPile([piBoucle(4, [piBloc('avancer de <b class="pi-n">3</b>'), piBloc('tourner à droite ↻')])])}
  <div class="figure-wrap" style="max-width:200px;margin:0;">${piGrilleStatique(5, 5, [1, 1, 0], [[1,1],[4,1],[4,4],[1,4],[1,1]], null)}</div>
</div>
<ul class="example-list">
  <li>Le premier programme a 8 instructions ; le second n'en a que 3 : la boucle, et les deux instructions répétées 4 fois.</li>
  <li>Pour exécuter une boucle <b>à la main</b>, on compte les tours : tour 1, tour 2, tour 3, tour 4, puis on passe à la suite du programme.</li>
</ul>
`;

document.getElementById('methode-demo-pensee-info-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Exécuter un programme à la main</h4></div>
<p style="margin:6px 0;">On exécute les instructions une par une, dans l'ordre, en notant à chaque étape ce qui a changé dans un <b>tableau de suivi</b>. Pour une boucle, on note le numéro du tour.</p>
<div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;">
  ${piPile([piBloc('mettre <b>nombre</b> à <b class="pi-n">1</b>', 'va'), piBoucle(4, [piBloc('multiplier <b>nombre</b> par <b class="pi-n">3</b>', 'op')]), piBloc('afficher <b>nombre</b>', 'ev')])}
  <table class="pi-suivi" style="min-width:240px;"><tr><th>Étape</th><th>nombre</th></tr>
    <tr><td>Départ</td><td>1</td></tr><tr><td>Tour 1</td><td>3</td></tr><tr><td>Tour 2</td><td>9</td></tr><tr><td>Tour 3</td><td>27</td></tr><tr><td>Tour 4</td><td>81</td></tr><tr><td><b>Sortie</b></td><td><b>81</b></td></tr></table>
</div>

<div class="sub-header" style="margin-top:22px;"><span class="letter">M</span><h4>Programmer le chemin d'un robot</h4></div>
<p style="margin:6px 0;">Clique sur les blocs pour écrire le programme, puis sur <b>▶ Exécuter</b>. Le robot laisse une trace : c'est le chemin construit par le programme.</p>
<div class="figure-wrap pi-robot">
  <div class="pi-defis" id="piDefis"></div>
  <p class="pi-consigne" id="piConsigne"></p>
  <div class="pi-zone">
    <div class="pi-palette">
      <b>Blocs</b>
      <button type="button" class="pi-bloc mv" onclick="piAjouter('av')">avancer de <b class="pi-n">1</b></button>
      <button type="button" class="pi-bloc mv" onclick="piAjouter('g')">tourner à gauche ↺</button>
      <button type="button" class="pi-bloc mv" onclick="piAjouter('d')">tourner à droite ↻</button>
      <button type="button" class="pi-bloc ct" onclick="piAjouter('rep')">répéter <b class="pi-n">2</b> fois</button>
      <p class="hint" style="margin:6px 0 0;">Dans le programme : ▲ ▼ changent les nombres, ✕ enlève un bloc. Un nouveau bloc se place dans la boucle ouverte (bordure orange) ; clique sur « fin de la boucle » pour en sortir.</p>
    </div>
    <div class="pi-prog"><b>Programme</b> <span class="hint" id="piNbBlocs" style="margin:0;"></span><div id="piProg"></div></div>
    <div class="pi-scene"><div id="piGrille"></div>
      <div class="figure-toolbar" style="justify-content:center;flex-wrap:wrap;">
        <button class="btn" onclick="piExecuter(false)">▶ Exécuter</button>
        <button class="btn secondary" onclick="piExecuter(true)">Pas à pas</button>
        <button class="btn secondary" onclick="piReplacer()">Replacer le robot</button>
        <button class="btn secondary" onclick="piEffacer()">Effacer le programme</button>
      </div>
      <p class="pi-verdict" id="piVerdict"></p>
    </div>
  </div>
</div>
`;

document.getElementById('exos-demo-pensee-info-6e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Exécuter un programme de calcul »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Entrée : on choisit <span class="fill">...</span>.</span><span class="we-comment">On écrit le nombre de départ.</span></div>
    <div class="we-row"><span class="we-expr">On exécute chaque instruction dans l'ordre : <span class="fill">... + 2 = ...</span> ; <span class="fill">... × 4 = ...</span> ; …</span><span class="we-comment">Une ligne par instruction (ou un tableau de suivi).</span></div>
    <div class="we-row"><span class="we-expr">Sortie : le programme affiche <span class="fill">...</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card"><div class="num">Exercice 1</div>
    Voici des phrases. Lesquelles sont des instructions qu'un robot peut exécuter sans réfléchir ?<br>
    a) Avance de 2 cases. &nbsp; b) Va quelque part de joli. &nbsp; c) Tourne à droite. &nbsp; d) Trouve le chemin le plus court. &nbsp; e) Multiplie le nombre par 5.
  </div>
  <div class="exo-card"><div class="num">Exercice 2</div>
    Exécute ce programme de calcul avec 7, puis avec 0 : « Choisir un nombre ; lui ajouter 2 ; multiplier le résultat par 4 ; retirer 3 ; afficher le résultat ». Présente tes calculs dans un tableau de suivi.
  </div>
  <div class="exo-card"><div class="num">Exercice 3</div>
    ${piPile([piBloc('mettre <b>nombre</b> à <b class="pi-n">2</b>', 'va'), piBoucle(3, [piBloc('ajouter <b class="pi-n">5</b> à <b>nombre</b>', 'op')]), piBloc('afficher <b>nombre</b>', 'ev')])}
    Quel nombre ce programme affiche-t-il ? Combien afficherait-il si on remplaçait « répéter 3 fois » par « répéter 10 fois » ?
  </div>
  <div class="exo-card"><div class="num">Exercice 4</div>
    Sur un quadrillage, un robot part d'une case, tourné vers la droite. Écris un programme qui lui fait tracer un rectangle de 4 cases de long et 2 cases de large, en revenant à son point de départ. Réécris-le ensuite avec une boucle « répéter ».
  </div>
  <div class="exo-card"><div class="num">Exercice 5</div>
    Ce programme doit tracer un escalier de 3 marches, mais il contient une erreur :
    ${piPile([piBoucle(3, [piBloc('avancer de <b class="pi-n">1</b>'), piBloc('tourner à gauche ↺'), piBloc('avancer de <b class="pi-n">1</b>'), piBloc('tourner à gauche ↺')])])}
    Exécute-le à la main sur un quadrillage : que trace-t-il ? Corrige-le.
  </div>
  <div class="exo-card"><div class="num">Exercice 6</div>
    Avec l'outil « Programmation par blocs » du site (menu S'entraîner), programme le lutin pour qu'il trace un triangle équilatéral : « répéter 3 fois : avancer de 100, tourner de 120° ». Pourquoi tourne-t-on de 120° et pas de 60° ?
  </div>
</div>
`;

document.getElementById('histoire-demo-pensee-info-6e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  <p style="margin:0 0 12px;">En <b>1801</b>, le tisserand lyonnais <b>Joseph-Marie Jacquard</b> invente un métier à tisser commandé par des <b>cartes perforées</b> : chaque carte est une instruction (quels fils lever), et la suite des cartes forme le programme du motif. On peut changer de motif en changeant de cartes, sans toucher à la machine.</p>
  <p style="margin:0 0 12px;">Vers <b>1843</b>, l'Anglaise <b>Ada Lovelace</b> écrit, pour la « machine analytique » imaginée par Charles Babbage, une suite d'instructions qui calcule des nombres (les nombres de Bernoulli), avec des étapes répétées. On la considère souvent comme la première personne à avoir écrit un programme informatique. Un langage de programmation porte aujourd'hui son nom : Ada.</p>
  <p style="margin:0 0 12px;">En <b>1967</b>, Seymour Papert et ses collègues créent le langage <b>Logo</b> pour les enfants : on y commande une « tortue » avec « AVANCE 50 », « TOURNE DROITE 90 », « RÉPÈTE 4 [ … ] » — exactement comme le robot de ce chapitre. En <b>2007</b>, au MIT, l'équipe de Mitchel Resnick lance <b>Scratch</b>, où l'on programme en emboîtant des blocs de couleur, sans rien taper au clavier.</p>
  <p style="margin:0;">Le mot <b>algorithme</b> vient du nom du savant <b>al-Khwârizmî</b>, qui vivait à Bagdad au IX<sup>e</sup> siècle et décrivait des méthodes de calcul pas à pas.</p>
</div>
`;

/* ---------------------------------------------------------------------------
   Grille statique (cours) : robot [x, y, dir], trace (liste de points), étoile.
--------------------------------------------------------------------------- */
function piGrilleStatique(W, H, robot, trace, etoile){
  const c = 30, m = 6, w = W * c + 2 * m, h = H * c + 2 * m, X = x => m + x * c + c / 2, Y = y => m + y * c + c / 2;
  let s = `<svg viewBox="0 0 ${w} ${h}" style="width:100%;display:block;">`;
  for(let i = 0; i <= W; i++) s += `<line x1="${m + i * c}" y1="${m}" x2="${m + i * c}" y2="${h - m}" stroke="#DDE3EA"/>`;
  for(let j = 0; j <= H; j++) s += `<line x1="${m}" y1="${m + j * c}" x2="${w - m}" y2="${m + j * c}" stroke="#DDE3EA"/>`;
  if(trace && trace.length > 1) s += `<polyline points="${trace.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#4C97FF" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(etoile) s += piEtoile(X(etoile[0]), Y(etoile[1]), 11);
  if(robot) s += piRobotSvg(X(robot[0]), Y(robot[1]), robot[2], 12) + `<text x="${X(robot[0])}" y="${Y(robot[1]) + 24}" font-size="10" text-anchor="middle" fill="#5B6472" font-family="Space Grotesk">D</text>`;
  return s + '</svg>';
}
function piEtoile(cx, cy, r){
  const p = []; for(let i = 0; i < 10; i++){ const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p.push((cx + rr * Math.cos(a)).toFixed(1) + ',' + (cy + rr * Math.sin(a)).toFixed(1)); }
  return `<polygon points="${p.join(' ')}" fill="#FFB400" stroke="#C68A00" stroke-width="1"/>`;
}
const PI_DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // 0 droite, 1 bas, 2 gauche, 3 haut
function piRobotSvg(cx, cy, dir, r){
  const a = [0, 90, 180, 270][dir];
  return `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${a})"><circle r="${r}" fill="#FF8208" stroke="#fff" stroke-width="2"/><polygon points="${r * .7},0 ${-r * .35},${-r * .5} ${-r * .35},${r * .5}" fill="#fff"/></g>`;
}

/* ---------------------------------------------------------------------------
   Programme de calcul (§2) : entrée → instructions → sortie, pas à pas.
--------------------------------------------------------------------------- */
const PI_CALC = [['ajouter 2', v => v + 2], ['multiplier par 4', v => v * 4], ['retirer 3', v => v - 3]];
let piCalc = { etape: 0, vals: [] };
function piCalcReset(){
  piCalc = { etape: 0, vals: [] };
  const t = document.getElementById('piCalcTable'); if(t) t.innerHTML = '<tr><th>Instruction</th><th>Valeur</th></tr>';
  const s = document.getElementById('piCalcSortie'); if(s) s.textContent = 'Clique sur « Instruction suivante » pour exécuter le programme.';
}
function piCalcPas(){
  const t = document.getElementById('piCalcTable'), s = document.getElementById('piCalcSortie'); if(!t) return;
  const e = Number(String(document.getElementById('piCalcEntree').value).replace(',', '.'));
  if(!isFinite(e)){ s.textContent = 'Écris un nombre dans l\'entrée.'; return; }
  if(piCalc.etape === 0){ piCalcReset(); piCalc.vals = [e]; t.insertAdjacentHTML('beforeend', `<tr><td>Entrée</td><td>${piFmt(e)}</td></tr>`); piCalc.etape = 1; s.textContent = ''; return; }
  if(piCalc.etape <= PI_CALC.length){
    const [nom, f] = PI_CALC[piCalc.etape - 1], v = f(piCalc.vals[piCalc.vals.length - 1]);
    piCalc.vals.push(v); t.insertAdjacentHTML('beforeend', `<tr><td>${nom}</td><td>${piFmt(v)}</td></tr>`); piCalc.etape++;
    if(piCalc.etape > PI_CALC.length) s.innerHTML = `<b>Sortie : ${piFmt(v)}</b>. Avec l'entrée ${piFmt(e)}, le programme affiche ${piFmt(v)}.`;
    return;
  }
  s.innerHTML = 'Le programme est terminé. Change l\'entrée et clique sur « Recommencer ».';
}
function piFmt(v){ return String(Math.round(v * 1000) / 1000).replace('.', ','); }

/* ---------------------------------------------------------------------------
   Robot programmable par blocs (méthode) : 4 défis.
   Programme = liste de blocs { t:'av', n } | { t:'g' } | { t:'d' } | { t:'rep', n, corps:[...] }
   (une seule profondeur de boucle, comme au cycle 3).
--------------------------------------------------------------------------- */
const PI_DEFIS = [
  { nom: 'Défi 1', txt: 'Amène le robot sur l\'étoile.', W: 8, H: 6, depart: [0, 4, 0], etoile: [4, 1], murs: [] },
  { nom: 'Défi 2', txt: 'Amène le robot sur l\'étoile sans toucher les murs.', W: 8, H: 6, depart: [0, 5, 0], etoile: [7, 0],
    murs: [[3, 2], [3, 3], [3, 4], [3, 5], [5, 0], [5, 1], [5, 2], [5, 3]] },
  { nom: 'Défi 3', txt: 'Trace l\'escalier en pointillés avec 5 blocs au plus (pense à la boucle « répéter »).', W: 8, H: 6, depart: [0, 5, 0], max: 5,
    modele: [[0, 5], [2, 5], [2, 4], [4, 4], [4, 3], [6, 3], [6, 2]] },
  { nom: 'Défi 4', txt: 'Trace le carré en pointillés et reviens au départ, avec 3 blocs au plus.', W: 8, H: 6, depart: [2, 1, 0], max: 3,
    modele: [[2, 1], [5, 1], [5, 4], [2, 4], [2, 1]], retour: true },
];
let pi = { d: 0, prog: [], ouverte: null, robot: null, trace: [], anim: null, pas: null, idx: -1 };
function piNbBlocs(l){ return (l || pi.prog).reduce((s, b) => s + 1 + (b.t === 'rep' ? piNbBlocs(b.corps) : 0), 0); }
function piDefiRendre(){
  const df = PI_DEFIS[pi.d];
  const d = document.getElementById('piDefis'); if(!d) return;
  d.innerHTML = PI_DEFIS.map((x, i) => `<button type="button" class="${i === pi.d ? 'on' : ''}" onclick="piChoisirDefi(${i})">${x.nom}</button>`).join('');
  document.getElementById('piConsigne').textContent = df.txt;
  piReplacer(); piProgRendre();
}
function piChoisirDefi(i){ pi.d = i; pi.prog = []; pi.ouverte = null; piDefiRendre(); }
function piAjouter(t){
  const b = t === 'av' ? { t, n: 1 } : t === 'rep' ? { t, n: 2, corps: [] } : { t };
  if(t === 'rep'){ pi.prog.push(b); pi.ouverte = b; }
  else (pi.ouverte ? pi.ouverte.corps : pi.prog).push(b);
  piProgRendre();
}
function piBlocRef(path){ const [i, j] = path.split('.').map(Number); return j === undefined || isNaN(j) ? [pi.prog, i] : [pi.prog[i].corps, j]; }
function piNombre(path, d){ const [l, k] = piBlocRef(path), b = l[k]; b.n = Math.max(1, Math.min(b.t === 'rep' ? 12 : 9, b.n + d)); piProgRendre(); }
function piSuppr(path){ const [l, k] = piBlocRef(path); if(l[k] === pi.ouverte) pi.ouverte = null; l.splice(k, 1); piProgRendre(); }
function piFermer(){ pi.ouverte = null; piProgRendre(); }
function piOuvrir(i){ pi.ouverte = pi.prog[i]; piProgRendre(); }
function piProgRendre(){
  const box = document.getElementById('piProg'); if(!box) return;
  const ctl = (path, b) => `<span class="pi-ctl">${b.n !== undefined ? `<button type="button" onclick="piNombre('${path}',1)" title="plus">▲</button><button type="button" onclick="piNombre('${path}',-1)" title="moins">▼</button>` : ''}<button type="button" onclick="piSuppr('${path}')" title="Enlever ce bloc">✕</button></span>`;
  const txt = b => b.t === 'av' ? `avancer de <b class="pi-n">${b.n}</b>` : b.t === 'g' ? 'tourner à gauche ↺' : 'tourner à droite ↻';
  const ligne = (b, path) => `<div class="pi-bloc mv${pi.idx === path ? ' actif' : ''}" data-p="${path}">${txt(b)}${ctl(path, b)}</div>`;
  box.innerHTML = `<div class="pi-bloc ev">quand le drapeau est cliqué</div>` + pi.prog.map((b, i) => b.t !== 'rep' ? ligne(b, String(i))
    : `<div class="pi-boucle${pi.ouverte === b ? ' ouverte' : ''}"><div class="pi-bloc ct${pi.idx === String(i) ? ' actif' : ''}" data-p="${i}">répéter <b class="pi-n">${b.n}</b> fois${ctl(String(i), b)}</div>
        <div class="pi-corps">${b.corps.map((c, j) => ligne(c, i + '.' + j)).join('') || '<span class="hint" style="margin:0;font-size:.8rem;">(vide : ajoute des blocs)</span>'}</div>
        <button type="button" class="pi-bloc ct pi-fin" onclick="${pi.ouverte === b ? 'piFermer()' : `piOuvrir(${i})`}">${pi.ouverte === b ? 'fin de la boucle ✓' : 'ajouter dans cette boucle'}</button></div>`).join('');
  const df = PI_DEFIS[pi.d], n = piNbBlocs();
  document.getElementById('piNbBlocs').textContent = `(${n} bloc${n > 1 ? 's' : ''}${df.max ? ' ; ' + df.max + ' au plus' : ''})`;
}
function piReplacer(){
  clearInterval(pi.anim); pi.anim = null; pi.pas = null; pi.idx = -1;
  const df = PI_DEFIS[pi.d]; pi.robot = df.depart.slice(); pi.trace = [[df.depart[0], df.depart[1]]];
  const v = document.getElementById('piVerdict'); if(v){ v.textContent = ''; v.className = 'pi-verdict'; }
  piGrilleRendre(); piProgRendre();
}
function piEffacer(){ pi.prog = []; pi.ouverte = null; piReplacer(); }
function piGrilleRendre(){
  const g = document.getElementById('piGrille'); if(!g) return;
  const df = PI_DEFIS[pi.d], c = 44, m = 8, w = df.W * c + 2 * m, h = df.H * c + 2 * m, X = x => m + x * c + c / 2, Y = y => m + y * c + c / 2;
  let s = `<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${w}px;display:block;margin:0 auto;">`;
  for(let i = 0; i <= df.W; i++) s += `<line x1="${m + i * c}" y1="${m}" x2="${m + i * c}" y2="${h - m}" stroke="#DDE3EA"/>`;
  for(let j = 0; j <= df.H; j++) s += `<line x1="${m}" y1="${m + j * c}" x2="${w - m}" y2="${m + j * c}" stroke="#DDE3EA"/>`;
  df.murs && df.murs.forEach(([x, y]) => { s += `<rect x="${m + x * c + 2}" y="${m + y * c + 2}" width="${c - 4}" height="${c - 4}" rx="4" fill="#8A6B52"/><path d="M${m + x * c + 2} ${m + y * c + c / 2}h${c - 4}M${m + x * c + c / 2} ${m + y * c + 2}v${c / 2 - 2}" stroke="#6B4F3A" stroke-width="2"/>`; });
  if(df.modele) s += `<polyline points="${df.modele.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#9FB3C8" stroke-width="5" stroke-dasharray="6 6" stroke-linejoin="round"/>`;
  if(pi.trace.length > 1) s += `<polyline points="${pi.trace.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#4C97FF" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`;
  if(df.etoile) s += piEtoile(X(df.etoile[0]), Y(df.etoile[1]), 16);
  s += `<circle cx="${X(df.depart[0])}" cy="${Y(df.depart[1])}" r="5" fill="none" stroke="#FF8208" stroke-width="2"/>`;
  s += piRobotSvg(X(pi.robot[0]), Y(pi.robot[1]), pi.robot[2], 16);
  g.innerHTML = s + '</svg>';
}
// Liste des pas élémentaires : [chemin du bloc, action] ; « avancer de 3 » = 3 pas d'une case.
function piAplatir(){
  const out = [], bloc = (b, path) => { if(b.t === 'av') for(let k = 0; k < b.n; k++) out.push([path, 'av']); else out.push([path, b.t]); };
  pi.prog.forEach((b, i) => { if(b.t === 'rep') for(let r = 0; r < b.n; r++) b.corps.forEach((c, j) => bloc(c, i + '.' + j)); else bloc(b, String(i)); });
  return out;
}
function piExecuter(pasApas){
  const v = document.getElementById('piVerdict');
  if(!pi.prog.length){ v.textContent = 'Le programme est vide : clique sur des blocs pour l\'écrire.'; v.className = 'pi-verdict ko'; return; }
  if(pasApas && pi.pas){ piUnPas(); return; }
  piReplacer();
  pi.pas = { liste: piAplatir(), k: 0 };
  if(pasApas){ piUnPas(); return; }
  pi.anim = setInterval(() => { if(!piUnPas()) { clearInterval(pi.anim); pi.anim = null; } }, 320);
}
// Exécute un pas ; renvoie false quand le programme est fini ou bloqué.
function piUnPas(){
  const df = PI_DEFIS[pi.d], p = pi.pas, v = document.getElementById('piVerdict'); if(!p) return false;
  if(p.k >= p.liste.length){ piFin(); return false; }
  const [path, a] = p.liste[p.k++]; pi.idx = path;
  if(a === 'g') pi.robot[2] = (pi.robot[2] + 3) % 4;
  else if(a === 'd') pi.robot[2] = (pi.robot[2] + 1) % 4;
  else {
    const [dx, dy] = PI_DIRS[pi.robot[2]], nx = pi.robot[0] + dx, ny = pi.robot[1] + dy;
    if(nx < 0 || ny < 0 || nx >= df.W || ny >= df.H || (df.murs || []).some(([x, y]) => x === nx && y === ny)){
      piGrilleRendre(); piProgRendre(); v.textContent = '💥 Bloqué : le robot sort du quadrillage ou touche un mur. Corrige le programme.'; v.className = 'pi-verdict ko'; pi.pas = null; return false;
    }
    pi.robot[0] = nx; pi.robot[1] = ny; pi.trace.push([nx, ny]);
  }
  piGrilleRendre(); piProgRendre();
  if(p.k >= p.liste.length){ piFin(); return false; }
  return true;
}
function piSegs(pts){ const s = new Set(); for(let i = 1; i < pts.length; i++){ const [a, b] = pts[i - 1], [c, d] = pts[i]; if(a === c && b === d) continue;
  // découpe en segments unité
  const dx = Math.sign(c - a), dy = Math.sign(d - b); let x = a, y = b; while(x !== c || y !== d){ const k = [x, y, x + dx, y + dy].join(','), k2 = [x + dx, y + dy, x, y].join(','); s.add(k < k2 ? k : k2); x += dx; y += dy; } } return s; }
function piFin(){
  const df = PI_DEFIS[pi.d], v = document.getElementById('piVerdict'); pi.pas = null; pi.idx = -1; piProgRendre();
  let ok, msg;
  if(df.etoile){ ok = pi.robot[0] === df.etoile[0] && pi.robot[1] === df.etoile[1]; msg = ok ? '⭐ Bravo, le robot est sur l\'étoile !' : 'Le robot n\'est pas sur l\'étoile : modifie le programme et réessaie.'; }
  else {
    const a = piSegs(pi.trace), b = piSegs(df.modele), meme = a.size === b.size && [...b].every(k => a.has(k));
    const retour = !df.retour || (pi.robot[0] === df.depart[0] && pi.robot[1] === df.depart[1]);
    ok = meme && retour && (!df.max || piNbBlocs() <= df.max);
    msg = !meme ? 'Le tracé ne correspond pas au modèle en pointillés.' : !retour ? 'Le tracé est juste, mais le robot doit revenir à son point de départ.'
      : df.max && piNbBlocs() > df.max ? `Tracé juste ! Mais ton programme a ${piNbBlocs()} blocs : fais-le avec ${df.max} blocs au plus (utilise « répéter »).` : '🎉 Bravo, c\'est exactement le chemin demandé !';
  }
  if(ok && df.max && piNbBlocs() > df.max) ok = false;
  v.textContent = msg; v.className = 'pi-verdict ' + (ok ? 'ok' : 'ko');
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .pi-pile{display:inline-flex;flex-direction:column;align-items:flex-start;gap:2px;}
    .pi-bloc{display:inline-flex;align-items:center;gap:6px;border:0;border-radius:8px;padding:6px 12px;color:#fff;font:600 .92rem 'Space Grotesk',Arial,sans-serif;box-shadow:inset 0 -3px 0 rgba(0,0,0,.15);white-space:nowrap;cursor:default;}
    button.pi-bloc{cursor:pointer;} button.pi-bloc:hover{filter:brightness(1.08);}
    .pi-bloc.mv{background:#4C97FF;} .pi-bloc.ct{background:#FFAB19;} .pi-bloc.op{background:#59C059;} .pi-bloc.ev{background:#FFBF00;color:#3A2A00;border-radius:14px 14px 8px 8px;} .pi-bloc.va{background:#FF8C1A;}
    .pi-n{display:inline-block;background:#fff;color:#20242E;border-radius:10px;padding:0 8px;min-width:14px;text-align:center;font-weight:700;}
    .pi-boucle{display:flex;flex-direction:column;align-items:flex-start;border-left:14px solid #FFAB19;border-radius:8px;padding:0;margin:2px 0;}
    .pi-boucle > .pi-bloc.ct:first-child{margin-left:-14px;border-radius:8px 8px 8px 0;}
    .pi-corps{display:flex;flex-direction:column;gap:2px;padding:3px 0 3px 6px;min-height:20px;}
    .pi-fin{margin-left:-14px;min-width:90px;min-height:12px;border-radius:0 8px 8px 8px;font-size:.78rem;padding:3px 10px;}
    .pi-boucle.ouverte{outline:3px solid #FF8208;outline-offset:2px;}
    .pi-bloc.actif{outline:3px solid #1C2B39;outline-offset:1px;}
    .pi-ctl{display:inline-flex;gap:2px;margin-left:4px;} .pi-ctl button{border:0;border-radius:5px;background:rgba(255,255,255,.3);color:#fff;font-size:.72rem;padding:1px 5px;cursor:pointer;}
    .pi-suivi{border-collapse:collapse;margin-top:8px;font-size:.95rem;} .pi-suivi th,.pi-suivi td{border:1px solid rgba(28,43,57,.15);padding:5px 12px;text-align:center;} .pi-suivi th{background:rgba(28,43,57,.05);}
    .pi-defis{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;} .pi-defis button{border:1.5px solid rgba(28,43,57,.18);background:#fff;border-radius:999px;padding:5px 14px;font:600 .9rem 'Space Grotesk',sans-serif;cursor:pointer;} .pi-defis button.on{background:#1C2B39;color:#fff;border-color:#1C2B39;}
    .pi-consigne{text-align:center;font-weight:600;margin:10px 0;}
    .pi-zone{display:grid;grid-template-columns:200px minmax(200px,260px) minmax(0,1fr);gap:14px;align-items:start;}
    @media (max-width:900px){ .pi-zone{grid-template-columns:1fr;} }
    .pi-palette,.pi-prog{display:flex;flex-direction:column;align-items:flex-start;gap:5px;background:#F7F9FC;border-radius:12px;padding:10px;}
    #piProg{display:flex;flex-direction:column;align-items:flex-start;gap:2px;margin-top:4px;}
    .pi-verdict{text-align:center;font-weight:700;min-height:1.4em;margin:8px 0 0;} .pi-verdict.ok{color:#1E7B34;} .pi-verdict.ko{color:#C62828;}
  `;
  document.head.appendChild(st);
})();

DEMO_REGISTRY['6e|Initiation à la pensée informatique'] = {
  cours:'cours-demo-pensee-info-6e', methode:'methode-demo-pensee-info-6e', exos:'exos-demo-pensee-info-6e', histoire:'histoire-demo-pensee-info-6e',
  init:()=>{
    ['cours','methode','exos','histoire'].forEach(k => renderStaticMath(document.getElementById(k + '-demo-pensee-info-6e')));
    injectCourseAddButtons(document.getElementById('cours-demo-pensee-info-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-pensee-info-6e'));
    piCalcReset();
    piDefiRendre();
  }
};

DEMO_QUIZZES['6e|Initiation à la pensée informatique'] = [
  {q:"Une séquence d'instructions, c'est…", opts:["des instructions exécutées dans n'importe quel ordre","des instructions exécutées les unes après les autres, dans l'ordre","une seule instruction répétée"], correct:1},
  {q:"Programme : choisir un nombre, ajouter 3, multiplier par 2. Avec l'entrée 4, la sortie est…", opts:["11","14","10"], correct:1},
  {q:"« répéter 4 fois : avancer de 2, tourner à droite » trace…", opts:["un carré de 2 cases de côté","une ligne de 8 cases","un rectangle de 4 sur 2"], correct:0},
  {q:"Combien de fois l'instruction « ajouter 5 » est-elle exécutée dans « répéter 3 fois : ajouter 5 » ?", opts:["1 fois","3 fois","5 fois"], correct:1},
  {q:"Pour un programme de calcul, le nombre choisi au départ est…", opts:["une sortie","une entrée","une boucle"], correct:1}
];

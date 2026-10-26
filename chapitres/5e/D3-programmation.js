/* ============================================================
   CHAPITRE : Pensée informatique et programmation (5e, D3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.

   Nouveau programme du cycle 4 (5e, « La pensée informatique ») : « Les notions aperçues au cycle 3
   sont définies et manipulées avec précision. La notion de variable est vue uniquement à ce stade
   sous l'angle de la manipulation en lecture d'une donnée saisie. » Objectifs : manipuler des
   instructions simples et les séquencer ; identifier les entrées et sorties d'un programme ;
   représenter des formules sous la forme d'une expression informatique dans un langage de
   programmation par blocs ; calculer la valeur de formules à l'aide d'une suite d'instructions ;
   prévoir la valeur d'une expression informatique avant son exécution ; analyser un programme
   simple donné et modifier ses paramètres ; effectuer une boucle inconditionnelle simple.

   §1 Instructions, entrées, sorties, variable (« demander » : la réponse est lue dans une variable).
   §2 Formules en blocs (blocs opérateurs emboîtés = parenthèses). §3 Boucle « répéter n fois ».
   Méthode : l'atelier -- 4 programmes dont on modifie les paramètres (champs blancs), on donne
   les entrées, on PRÉVOIT la sortie puis on exécute (tableau de suivi pas à pas).
   Blocs aux couleurs de Scratch (styles .pi-bloc du chapitre de 6e, chargés sur toutes les pages).
   ============================================================ */

// Programmes dessinés par Blockly, comme dans l'éditeur de blocs du site (images de tools/blocs/gen.mjs) -- demandé :
// « corrige les cours avec des images Blockly également ». Le texte de remplacement décrit le programme.
function p5Img(nom, alt){ return `<img src="/img/blocs/${nom}.svg?v=1" alt="${alt}" loading="lazy" style="display:block;max-width:100%;height:auto;margin:6px 0;">`; }
function p5B(txt, g){ return `<span class="pi-bloc ${g || 'mv'}">${txt}</span>`; }
function p5Pile(l){ return `<div class="pi-pile">${l.join('')}</div>`; }
function p5Boucle(n, corps){ return `<div class="pi-boucle"><span class="pi-bloc ct">répéter <b class="pi-n">${n}</b> fois</span><div class="pi-corps">${corps.join('')}</div><span class="pi-bloc ct pi-fin"></span></div>`; }
function p5Op(txt){ return `<span class="p5-op">${txt}</span>`; }
function p5V(nom){ return `<span class="p5-var">${nom}</span>`; }

document.getElementById('cours-demo-programmation-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Instructions, entrées, sorties et variables</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">
  Un <b>programme</b> est une <b>séquence d'instructions</b> exécutées dans l'ordre.<br>
  Les <b>entrées</b> sont les données fournies au programme (par exemple la réponse tapée par l'utilisateur) ; les <b>sorties</b> sont les résultats qu'il produit (un nombre affiché, un dessin…).<br>
  Une <b>variable</b> est une « boîte » qui porte un nom et contient une valeur. Avec le bloc « demander … », la réponse saisie est rangée dans la variable <b>réponse</b>, que le programme peut ensuite <b>lire</b>.
</div>
<p class="example-title">Exemple : repère les entrées et la sortie de ce programme.</p>
<div style="display:flex;gap:22px;flex-wrap:wrap;align-items:center;">
  ${p5Img('5e-age', 'Programme : quand le drapeau est cliqué ; demander « Quel est ton âge ? » et attendre ; dire réponse + 10.')}
  <ul class="example-list" style="flex:1;min-width:240px;">
    <li><b>Entrée</b> : l'âge tapé par l'utilisateur (rangé dans la variable réponse).</li>
    <li><b>Sortie</b> : le nombre dit par le lutin, l'âge dans 10 ans. Si on tape 12, il dit 22.</li>
  </ul>
</div>

<div class="lesson-header"><span class="num">2</span><h3>Écrire une formule avec des blocs</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Une formule s'écrit en <b>emboîtant des blocs opérateurs</b> (verts). Un bloc placé à l'intérieur d'un autre est calculé <b>en premier</b> : il joue le rôle des <b>parenthèses</b>.</div>
<p class="example-title">Exemple : le périmètre P d'un rectangle de longueur L et de largeur l est P = 2 × (L + l).</p>
<div style="display:flex;gap:22px;flex-wrap:wrap;align-items:center;">
  ${p5Img('5e-perimetre', 'Programme : demander « Longueur ? » ; mettre L à réponse ; demander « Largeur ? » ; mettre l à réponse ; mettre P à 2 × (L + l) ; dire P.')}
  <ul class="example-list" style="flex:1;min-width:240px;">
    <li>Le bloc « L + l » est à l'intérieur du bloc « 2 × … » : il est calculé d'abord.</li>
    <li><b>Prévoir</b> avant d'exécuter : avec L = 7 et l = 3, le programme dira 2 × (7 + 3) = <b>20</b>.</li>
  </ul>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Répéter une séquence d'instructions</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">La boucle « <b>répéter n fois</b> » exécute la séquence d'instructions qu'elle contient exactement <b>n fois</b>, puis le programme continue après la boucle.</div>
<p class="example-title">Exemple : que dit ce programme ?</p>
<div style="display:flex;gap:22px;flex-wrap:wrap;align-items:flex-start;">
  ${p5Img('5e-total', 'Programme : mettre total à 0 ; répéter 4 fois ajouter 5 à total ; dire total.')}
  <table class="pi-suivi"><tr><th>Étape</th><th>total</th></tr><tr><td>Départ</td><td>0</td></tr><tr><td>Tour 1</td><td>5</td></tr><tr><td>Tour 2</td><td>10</td></tr><tr><td>Tour 3</td><td>15</td></tr><tr><td>Tour 4</td><td>20</td></tr></table>
</div>
<p style="margin:8px 0 12px;">Le programme dit <b>20</b> : ajouter 5 quatre fois revient à calculer 4 × 5. Si on change le paramètre 4 en 10, il dit 50.</p>
`;

document.getElementById('methode-demo-programmation-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Prévoir, exécuter, modifier un programme</h4></div>
<p style="margin:6px 0;">Choisis un programme. Les nombres dans les <b>cases blanches</b> sont ses paramètres : tu peux les modifier. Donne les entrées, écris ce que tu <b>prévois</b>, puis exécute le programme instruction par instruction.</p>
<div class="figure-wrap">
  <div class="pi-defis" id="p5Choix"></div>
  <div class="p5-atelier">
    <div id="p5Prog"></div>
    <div>
      <div id="p5Entrees"></div>
      <label class="p5-prevoir">Je prévois que le programme dira : <input type="text" id="p5Prev" inputmode="decimal" style="width:110px;"></label>
      <div class="figure-toolbar" style="justify-content:flex-start;margin-top:8px;"><button class="btn" onclick="p5Pas()">Instruction suivante →</button><button class="btn secondary" onclick="p5Tout()">Tout exécuter</button><button class="btn secondary" onclick="p5Reset()">Recommencer</button></div>
      <table class="pi-suivi" id="p5Suivi"></table>
      <p class="pi-verdict" id="p5Verdict" style="text-align:left;"></p>
    </div>
  </div>
</div>
`;

document.getElementById('exos-demo-programmation-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Prévoir la sortie d'un programme »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Entrées : <span class="fill">...</span></span><span class="we-comment">On repère ce que l'utilisateur donne.</span></div>
    <div class="we-row"><span class="we-expr">Tableau de suivi : une ligne par instruction exécutée (et par tour de boucle), avec la valeur de chaque variable.</span><span class="we-comment">On exécute « à la main », dans l'ordre.</span></div>
    <div class="we-row"><span class="we-expr">Sortie : le programme dit <span class="fill">...</span>.</span><span class="we-comment">Conclusion.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  <div class="exo-card"><div class="num">Exercice 1</div>
    ${p5Img('5e-ex1', 'Programme : demander « Choisis un nombre » ; mettre x à réponse ; mettre y à x × 3 − 4 ; dire y.')}
    a) Quelles sont l'entrée et la sortie de ce programme ? b) Que dit-il si on tape 5 ? si on tape 0 ? c) Écris la formule qui donne y en fonction de x.
    <button type="button" class="exo-correction-toggle" data-target="c5-d3-c1" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c5-d3-c1"><div><p style="margin:0 0 6px;">a) <b>Entrée</b> : le nombre tapé, rangé dans la variable x. <b>Sortie</b> : le nombre y que dit le programme.</p><p style="margin:0 0 6px;">b) Avec 5 : le bloc « x × 3 », à l'intérieur, est calculé en premier.</p><ul style="margin:0 0 6px;"><li>5 × 3 = 15</li><li>15 − 4 = 11</li></ul><p style="margin:0 0 6px;"><b>Le programme dit 11.</b> Avec 0 :</p><ul style="margin:0 0 6px;"><li>0 × 3 = 0</li><li>0 − 4 = −4</li></ul><p style="margin:0 0 6px;"><b>Le programme dit −4.</b></p><p style="margin:0 0 6px;">c) y = x × 3 − 4, que l'on écrit aussi <b>y = 3x − 4</b>.</p></div></div>
  </div>
  <div class="exo-card"><div class="num">Exercice 2</div>
    L'aire d'un triangle est A = (b × h) ÷ 2. Écris un programme par blocs qui demande b et h, puis dit l'aire. Quels blocs faut-il emboîter ? Que dit-il pour b = 6 et h = 5 ?
    <button type="button" class="exo-correction-toggle" data-target="c5-d3-c2" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c5-d3-c2"><div><p style="margin:0 0 6px;">Un programme possible :</p>${p5Img('5e-ex2-corrige', 'Programme corrigé : quand le drapeau est cliqué ; demander « Base ? » ; mettre b à réponse ; demander « Hauteur ? » ; mettre h à réponse ; dire (b × h) ÷ 2.')}<p style="margin:0 0 6px;">Le bloc « b × h » est placé <b>à l'intérieur</b> du bloc « … ÷ 2 » : il est calculé en premier, comme s'il était entre parenthèses.</p><p style="margin:0 0 6px;">Pour b = 6 et h = 5 :</p><ul style="margin:0 0 6px;"><li>6 × 5 = 30</li><li>30 ÷ 2 = 15</li></ul><p style="margin:0 0 6px;"><b>Le programme dit 15.</b></p></div></div>
  </div>
  <div class="exo-card"><div class="num">Exercice 3</div>
    ${p5Img('5e-ex3', 'Programme : mettre n à 3 ; répéter 4 fois mettre n à n × 2 ; dire n.')}
    Présente l'exécution dans un tableau de suivi. Que dit le programme ? Modifie un seul paramètre pour qu'il dise 96.
    <button type="button" class="exo-correction-toggle" data-target="c5-d3-c3" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c5-d3-c3"><div><table style="border-collapse:collapse;margin:4px 0 8px;"><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;font-weight:700;background:#EEF4FB;">Étape</td><td style="border:1px solid #9AA6B2;padding:3px 10px;font-weight:700;background:#EEF4FB;">n</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;">Départ</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">3</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;">Tour 1</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">6</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;">Tour 2</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">12</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;">Tour 3</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">24</td></tr><tr><td style="border:1px solid #9AA6B2;padding:3px 10px;">Tour 4</td><td style="border:1px solid #9AA6B2;padding:3px 10px;text-align:center;">48</td></tr></table><p style="margin:0 0 6px;"><b>Le programme dit 48.</b></p><p style="margin:0 0 6px;">Pour qu'il dise 96, le double de 48, il suffit d'un tour de plus : <b>répéter 5 fois</b>. (Autre solution : mettre n à 6 au départ.)</p></div></div>
  </div>
  <div class="exo-card"><div class="num">Exercice 4</div>
    Léa veut afficher le carré d'un nombre saisi. Elle écrit « dire réponse × 2 ». Explique son erreur et corrige le bloc.
    <button type="button" class="exo-correction-toggle" data-target="c5-d3-c4" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c5-d3-c4"><div>${p5Img('5e-ex4-erreur', 'Bloc de Léa : dire réponse × 2.')}<p style="margin:0 0 6px;">« réponse × 2 » calcule le <b>double</b> du nombre, pas son carré. Avec 5, il dit 10 au lieu de 25.</p><p style="margin:0 0 6px;">Le carré d'un nombre, c'est ce nombre multiplié par lui-même : on met <b>réponse</b> des deux côtés du bloc « × ».</p>${p5Img('5e-ex4-corrige', 'Bloc corrigé : dire réponse × réponse.')}<p style="margin:0 0 6px;">Avec 5 : 5 × 5 = 25. <b>Le programme dit 25.</b></p></div></div>
  </div>
  <div class="exo-card"><div class="num">Exercice 5</div>
    Avec l'outil « Programmation par blocs » du site (menu L'Atelier), programme le lutin pour qu'il trace un carré de côté 100 avec une boucle « répéter ». Modifie ensuite les paramètres pour tracer un hexagone régulier de côté 100.
    <button type="button" class="exo-correction-toggle" data-target="c5-d3-c5" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="c5-d3-c5"><div><div style="display:flex;gap:18px;flex-wrap:wrap;align-items:flex-start;"><div><p style="margin:0 0 6px;">Le carré : 4 côtés, et à chaque sommet le lutin tourne de 90°.</p>${p5Img('5e-ex5-carre', 'Carré : quand le drapeau est cliqué ; stylo en position d’écriture ; répéter 4 fois avancer de 100 pas, tourner de 90 degrés.')}</div><div><p style="margin:0 0 6px;">L'hexagone : 6 côtés. Pour faire un tour complet (360°) en 6 fois, le lutin tourne de 360 ÷ 6 = 60° à chaque sommet.</p>${p5Img('5e-ex5-hexagone', 'Hexagone : quand le drapeau est cliqué ; stylo en position d’écriture ; répéter 6 fois avancer de 100 pas, tourner de 60 degrés.')}</div></div><p style="margin:0 0 6px;">On a changé deux paramètres : le nombre de répétitions (4 → 6) et l'angle (90° → 60°).</p></div></div>
  </div>
</div>
`;

document.getElementById('histoire-demo-programmation-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  <p style="margin:0 0 12px;">Les premiers ordinateurs, dans les années 1940, se programmaient en branchant des câbles ou en perforant des cartes. En <b>1957</b>, l'équipe de John Backus chez IBM crée <b>Fortran</b>, l'un des premiers langages où l'on peut écrire une formule presque comme en mathématiques : <code>P = 2*(L+W)</code>. C'est l'ancêtre des blocs « mettre P à … » de ce chapitre.</p>
  <p style="margin:0 0 12px;">Dans les années 1950, <b>Grace Hopper</b>, mathématicienne et officière de la marine américaine, invente le premier <b>compilateur</b> : un programme qui traduit des instructions écrites avec des mots en langage machine. Elle popularise aussi le mot <i>bug</i>, après la découverte d'un papillon de nuit coincé dans un relais d'ordinateur en 1947.</p>
  <p style="margin:0;">La boucle « répéter » existe depuis les tout premiers langages : c'est ce qui permet à un ordinateur de faire des millions de fois la même opération sans qu'on ait à l'écrire des millions de fois.</p>
</div>
`;

/* ---------------------------------------------------------------------------
   Atelier : programmes à paramètres. Chaque programme : entrées (noms), paramètres (valeurs par
   défaut), blocs (HTML, avec des champs pour les paramètres), et étapes à exécuter.
--------------------------------------------------------------------------- */
const P5_PROGS = [
  { nom: 'Périmètre d\'un rectangle', entrees: [['L', 'Longueur', 7], ['l', 'Largeur', 3]], params: {},
    blocs: p => [p5B('demander « Longueur ? » → L', 'se'), p5B('demander « Largeur ? » → l', 'se'), p5B(`mettre ${p5V('P')} à ${p5Op(`<b class="pi-n">2</b> × ${p5Op(`${p5V('L')} + ${p5V('l')}`)}`)}`, 'va'), p5B(`dire ${p5V('P')}`, 'lo')],
    etapes: (e, p) => [['L + l', v => (v.t = e.L + e.l, v)], ['P = 2 × (L + l)', v => (v.P = 2 * v.t, delete v.t, v)]], sortie: 'P' },
  { nom: 'Programme de calcul', entrees: [['x', 'Nombre choisi', 5]], params: { a: 4, b: 3, c: 5 },
    blocs: p => [p5B('demander « Choisis un nombre » → x', 'se'), p5B(`mettre ${p5V('y')} à ${p5Op(`${p5V('x')} + ${p5In('a', p.a)}`)}`, 'va'), p5B(`mettre ${p5V('y')} à ${p5Op(`${p5V('y')} × ${p5In('b', p.b)}`)}`, 'va'), p5B(`mettre ${p5V('y')} à ${p5Op(`${p5V('y')} − ${p5In('c', p.c)}`)}`, 'va'), p5B(`dire ${p5V('y')}`, 'lo')],
    etapes: (e, p) => [[`y = x + ${p.a}`, v => (v.y = e.x + p.a, v)], [`y = y × ${p.b}`, v => (v.y = v.y * p.b, v)], [`y = y − ${p.c}`, v => (v.y = v.y - p.c, v)]], sortie: 'y' },
  { nom: 'Boucle : ajouter plusieurs fois', entrees: [], params: { d: 0, n: 5, k: 3 },
    blocs: p => [p5B(`mettre ${p5V('total')} à ${p5In('d', p.d)}`, 'va'), `<div class="pi-boucle"><span class="pi-bloc ct">répéter ${p5In('n', p.n)} fois</span><div class="pi-corps">${p5B(`ajouter ${p5In('k', p.k)} à ${p5V('total')}`, 'va')}</div><span class="pi-bloc ct pi-fin"></span></div>`, p5B(`dire ${p5V('total')}`, 'lo')],
    etapes: (e, p) => [[`total = ${p.d}`, v => (v.total = p.d, v)]].concat(Array.from({ length: Math.max(0, Math.min(30, p.n)) }, (_, i) => [`tour ${i + 1} : total = total + ${p.k}`, v => (v.total = v.total + p.k, v)])), sortie: 'total' },
  { nom: 'Boucle : doubler', entrees: [], params: { d: 1, n: 6 },
    blocs: p => [p5B(`mettre ${p5V('n')} à ${p5In('d', p.d)}`, 'va'), `<div class="pi-boucle"><span class="pi-bloc ct">répéter ${p5In('n', p.n)} fois</span><div class="pi-corps">${p5B(`mettre ${p5V('n')} à ${p5Op(`${p5V('n')} × <b class="pi-n">2</b>`)}`, 'va')}</div><span class="pi-bloc ct pi-fin"></span></div>`, p5B(`dire ${p5V('n')}`, 'lo')],
    etapes: (e, p) => [[`n = ${p.d}`, v => (v.n = p.d, v)]].concat(Array.from({ length: Math.max(0, Math.min(20, p.n)) }, (_, i) => [`tour ${i + 1} : n = n × 2`, v => (v.n = v.n * 2, v)])), sortie: 'n' },
];
let p5 = { i: 0, params: null, liste: null, k: 0, vars: null };
function p5In(k, v){ return `<input class="p5-in" type="number" value="${v}" onchange="p5Param('${k}', this.value)" aria-label="paramètre">`; }
function p5Fmt(x){ return String(Math.round(x * 1000) / 1000).replace('.', ','); }
function p5Choisir(i){ p5.i = i; p5.params = Object.assign({}, P5_PROGS[i].params); p5Rendre(); }
function p5Param(k, v){ const n = Number(String(v).replace(',', '.')); if(isFinite(n)){ p5.params[k] = n; } p5Rendre(); }
function p5Rendre(){
  const box = document.getElementById('p5Prog'); if(!box) return;
  const P = P5_PROGS[p5.i];
  document.getElementById('p5Choix').innerHTML = P5_PROGS.map((x, i) => `<button type="button" class="${i === p5.i ? 'on' : ''}" onclick="p5Choisir(${i})">${x.nom}</button>`).join('');
  box.innerHTML = p5Pile([p5B('quand le drapeau est cliqué', 'ev')].concat(P.blocs(p5.params)));
  document.getElementById('p5Entrees').innerHTML = P.entrees.length ? P.entrees.map(([k, lab, d]) => `<label class="p5-prevoir">Entrée ${lab} (${k}) : <input type="text" inputmode="decimal" id="p5E_${k}" value="${d}" style="width:80px;"></label>`).join('')
    : '<p class="hint" style="margin:0 0 6px;">Ce programme n\'a pas d\'entrée : il fait toujours la même chose, sauf si on change ses paramètres.</p>';
  p5Reset();
}
function p5Reset(){
  p5.liste = null; p5.k = 0;
  const t = document.getElementById('p5Suivi'); if(t) t.innerHTML = '';
  const v = document.getElementById('p5Verdict'); if(v){ v.textContent = ''; v.className = 'pi-verdict'; }
}
function p5Demarrer(){
  const P = P5_PROGS[p5.i], e = {};
  for(const [k] of P.entrees){ const n = Number(String(document.getElementById('p5E_' + k).value).replace(',', '.')); if(!isFinite(n)){ document.getElementById('p5Verdict').textContent = 'Donne une valeur numérique pour chaque entrée.'; return false; } e[k] = n; }
  p5.liste = P.etapes(e, p5.params); p5.k = 0; p5.vars = {};
  const t = document.getElementById('p5Suivi');
  t.innerHTML = `<tr><th>Instruction exécutée</th><th>Valeur</th></tr>` + (P.entrees.length ? `<tr><td>Entrées</td><td>${P.entrees.map(([k]) => `${k} = ${p5Fmt(e[k])}`).join(' ; ')}</td></tr>` : '');
  return true;
}
function p5Pas(){
  if(!p5.liste && !p5Demarrer()) return;
  const P = P5_PROGS[p5.i], t = document.getElementById('p5Suivi');
  if(p5.k < p5.liste.length){
    const [lab, f] = p5.liste[p5.k++]; f(p5.vars);
    const cle = Object.keys(p5.vars).filter(k => k !== 't').pop(), val = p5.vars.t !== undefined ? p5.vars.t : p5.vars[cle];
    t.insertAdjacentHTML('beforeend', `<tr><td>${lab}</td><td>${p5Fmt(val)}</td></tr>`);
    if(p5.k < p5.liste.length) return true;
  }
  const out = p5.vars[P.sortie], prev = String(document.getElementById('p5Prev').value || '').trim(), v = document.getElementById('p5Verdict');
  t.insertAdjacentHTML('beforeend', `<tr><td><b>Sortie : dire ${P.sortie}</b></td><td><b>${p5Fmt(out)}</b></td></tr>`);
  const pn = Number(prev.replace(',', '.'));
  v.innerHTML = !prev ? `Le programme dit <b>${p5Fmt(out)}</b>. La prochaine fois, écris ta prévision avant d'exécuter !`
    : Math.abs(pn - out) < 1e-9 ? `✔ Bien prévu : le programme dit ${p5Fmt(out)}.` : `✘ Tu avais prévu ${prev}, le programme dit ${p5Fmt(out)}. Relis le tableau de suivi pour trouver l'écart.`;
  v.className = 'pi-verdict ' + (!prev || Math.abs(pn - out) < 1e-9 ? 'ok' : 'ko');
  p5.liste = null;
  return false;
}
function p5Tout(){ p5Reset(); if(!p5Demarrer()) return; while(p5Pas()); }

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .pi-bloc.se{background:#5CB1D6;} .pi-bloc.lo{background:#9966FF;}
    .p5-op{display:inline-flex;align-items:center;gap:4px;background:#59C059;border-radius:14px;padding:2px 8px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);}
    .p5-var{display:inline-block;background:#FF8C1A;color:#fff;border-radius:10px;padding:0 8px;font-weight:700;}
    .pi-bloc.va .p5-var{background:#fff;color:#C65F00;}
    .p5-in{width:48px;border:0;border-radius:10px;padding:1px 6px;font:700 .9rem 'Space Grotesk',sans-serif;text-align:center;color:#20242E;}
    .p5-atelier{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start;margin-top:12px;}
    @media (max-width:820px){ .p5-atelier{grid-template-columns:1fr;} }
    .p5-prevoir{display:flex;align-items:center;gap:8px;margin:4px 0;font-weight:600;flex-wrap:wrap;}
    .p5-prevoir input{padding:5px 8px;border-radius:8px;border:1.5px solid rgba(28,43,57,.2);font:600 1rem 'Space Grotesk',sans-serif;}
  `;
  document.head.appendChild(st);
})();

DEMO_REGISTRY['5e|Pensée informatique et programmation'] = {
  cours:'cours-demo-programmation-5e', methode:'methode-demo-programmation-5e', exos:'exos-demo-programmation-5e', histoire:'histoire-demo-programmation-5e',
  init:()=>{
    ['cours','methode','exos','histoire'].forEach(k => renderStaticMath(document.getElementById(k + '-demo-programmation-5e')));
    injectCourseAddButtons(document.getElementById('cours-demo-programmation-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-programmation-5e'));
    p5Choisir(0);
  }
};

DEMO_QUIZZES['5e|Pensée informatique et programmation'] = [
  {q:"Dans « demander « Ton âge ? » », la réponse tapée est…", opts:["une sortie","une entrée","une boucle"], correct:1},
  {q:"Le bloc « 2 × (L + l) » calcule d'abord…", opts:["2 × L","L + l","2 × l"], correct:1},
  {q:"« mettre total à 0 », puis « répéter 3 fois : ajouter 4 à total ». total vaut…", opts:["7","12","4"], correct:1},
  {q:"« mettre n à 1 », puis « répéter 5 fois : mettre n à n × 2 ». n vaut…", opts:["10","32","25"], correct:1},
  {q:"Pour afficher le carré de la réponse, on écrit…", opts:["réponse × 2","réponse × réponse","réponse + réponse"], correct:1}
];

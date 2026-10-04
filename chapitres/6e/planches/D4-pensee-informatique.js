/* ============================================================
   6e · Planches : Initiation à la pensée informatique (D4)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:10px;flex-wrap:wrap;">${l.join('')}</div>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const FL = { h: '↑', b: '↓', g: '←', d: '→' };
const prog = p => `<span style="font-family:'JetBrains Mono',monospace;font-weight:700;letter-spacing:2px;">${p.split('').map(c => FL[c]).join(' ')}</span>`;
// Quadrillage du robot : départ (rond bleu), but (étoile), obstacles, chemin éventuel.
function G(w, h, o){ const k = 30, m = 3, X = x => m + x * k + k / 2, Y = y => m + y * k + k / 2; let s = `<svg class="pl-libre" viewBox="0 0 ${w * k + 2 * m} ${h * k + 2 * m}" style="width:${w * k + 2 * m}px;max-width:100%;display:inline-block;vertical-align:middle;">`;
  for(let y = 0; y < h; y++) for(let x = 0; x < w; x++) s += `<rect x="${m + x * k}" y="${m + y * k}" width="${k}" height="${k}" fill="#fff" stroke="#B9C7D6"/>`;
  (o.obs || []).forEach(([x, y]) => { s += `<rect x="${m + x * k + 3}" y="${m + y * k + 3}" width="${k - 6}" height="${k - 6}" rx="5" fill="#8A6A2E"/>`; });
  if(o.chemin) s += `<polyline points="${o.chemin.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="#E35D3A" stroke-width="3" stroke-dasharray="6 4"/>`;
  if(o.but) s += `<text x="${X(o.but[0])}" y="${Y(o.but[1]) + 7}" font-size="20" text-anchor="middle">⭐</text>`;
  if(o.fin) s += `<circle cx="${X(o.fin[0])}" cy="${Y(o.fin[1])}" r="9" fill="none" stroke="#2E9C6A" stroke-width="3"/>`;
  s += `<circle cx="${X(o.dep[0])}" cy="${Y(o.dep[1])}" r="9" fill="#2EA8C9"/>`;
  return s + '</svg>'; }
const chemin = (dep, p) => { const c = [dep.slice()]; let [x, y] = dep; p.split('').forEach(f => { x += { g: -1, d: 1 }[f] || 0; y += { h: -1, b: 1 }[f] || 0; c.push([x, y]); }); return c; };
// Écrire un programme (outil robot à l'écran) pour atteindre l'étoile.
const robot = (w, h, dep, but, obs, sol) => ({ eleve: plX(G(w, h, { dep, but, obs }), { t: 'robot', w, h, k: 30, m: 3, dep, but, obs }), corr: G(w, h, { dep, but, obs, chemin: chemin(dep, sol) }) + `<div style="text-align:center;">Par exemple : ${prog(sol)}</div>` });
// Lire un programme : entourer la case d'arrivée (outil cases, mode entoure).
const lire = (w, h, dep, p, obs) => { const c = chemin(dep, p), f = c[c.length - 1];
  return { eleve: `<div style="text-align:center;">${prog(p)}</div>` + plX(G(w, h, { dep, obs }), { t: 'cases', mode: 'entoure', k: 30, ox: 3, oy: 3, w, h, att: [f] }), corr: `<div style="text-align:center;">${prog(p)}</div>` + G(w, h, { dep, obs, chemin: c, fin: f }) }; };
PLANCHES['6e|Initiation à la pensée informatique'] = [
  { titre: 'Instructions et séquences', duree: '35 min',
    attendus: ['Lire une séquence d\'instructions et l\'exécuter', 'Écrire une séquence d\'instructions pour atteindre un but', 'Repérer une erreur dans un programme'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le robot (rond bleu) suit le programme. Entoure sa case d\'arrivée.', ...lire(6, 4, [0, 3], 'ddhhdh') },
      { etoiles: 1, col: 1, consigne: 'Même consigne : le robot passe entre les obstacles.', ...lire(6, 4, [0, 0], 'bbddhhd', [[1, 0], [1, 1], [3, 2], [3, 3]]) },
      { etoiles: 2, col: 1, consigne: 'Écris un programme pour amener le robot sur l\'étoile sans toucher les obstacles.', ...robot(6, 4, [0, 3], [5, 0], [[1, 2], [2, 2], [4, 1]], 'dddddhhh') },
      { etoiles: 2, col: 1, consigne: 'Écris le programme le plus court possible pour atteindre l\'étoile.', ...robot(5, 5, [0, 4], [4, 0], [[1, 3], [2, 1], [3, 3]], 'hhhhdddd') },
      { etoiles: 3, col: 1, cahier: true, consigne: `Sami veut amener le robot sur l'étoile avec le programme ${prog('ddhdd')}, mais le robot heurte l'obstacle. Propose une correction en changeant une seule flèche de place.<div style="text-align:center;">${G(5, 3, { dep: [0, 2], but: [4, 1], obs: [[2, 2]] })}</div>`,
        corr: cm1Redac('Correction', 'L\'ordre des instructions compte : un programme est une séquence.', `Par exemple ${prog('dhddd')} : on monte plus tôt pour passer au-dessus de l'obstacle.`) },
    ] },
  { titre: 'Entrées et sorties', duree: '35 min',
    attendus: ['Repérer l\'entrée (donnée) et la sortie (résultat) d\'un programme', 'Exécuter un programme de calcul', 'Retrouver une entrée à partir d\'une sortie'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme : « demander un nombre ; mettre résultat à nombre × 2 + 3 ; dire résultat ». Complète.',
        eleve: plListe(['Entrée 5 → sortie ' + B(), 'Entrée 0 → sortie ' + B(), 'Entrée 10 → sortie ' + B(), 'Entrée 2,5 → sortie ' + B()]),
        corr: plListe(['Entrée 5 → sortie ' + R(13), 'Entrée 0 → sortie ' + R(3), 'Entrée 10 → sortie ' + R(23), 'Entrée 2,5 → sortie ' + R(8)]) },
      { etoiles: 2, col: 1, consigne: 'Avec le même programme, quelle entrée donne cette sortie ?',
        eleve: plListe(['sortie 11 → entrée ' + B(), 'sortie 21 → entrée ' + B(), 'sortie 3 → entrée ' + B()]),
        corr: plListe(['sortie 11 → entrée ' + R(4), 'sortie 21 → entrée ' + R(9), 'sortie 3 → entrée ' + R(0)]) },
      { etoiles: 2, col: 1, consigne: 'Programme : « demander l\'âge ; si âge &lt; 12 alors dire « tarif enfant : 5 € » sinon dire « tarif adulte : 9 € » ». Entoure la sortie.',
        ...ch([['âge 8 :', '5 €'], ['âge 12 :', '9 €'], ['âge 35 :', '9 €']], '5 € · 9 €') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris un programme (en langage naturel ou avec des blocs) qui demande la longueur du côté d\'un carré et affiche son périmètre et son aire. Teste-le avec 7.',
        corr: cm1Redac('Programme', { suite: ['demander côté', 'mettre périmètre à 4 × côté ; mettre aire à côté × côté', 'dire périmètre ; dire aire'] }, 'Avec 7 : périmètre 28, aire 49.') },
    ] },
  { titre: 'Répéter une séquence d\'instructions', duree: '35 min',
    attendus: ['Utiliser une boucle « répéter n fois »', 'Prévoir l\'effet d\'une boucle', 'Écrire un programme plus court grâce à une boucle'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le lutin exécute « répéter 4 fois : avancer de 50 pas, tourner de 90° ». Entoure.',
        eleve: '<div class="pl-col1">' + plListe(['Il dessine <b>un carré · un triangle · un cercle</b>', 'Le côté mesure <b>50 pas · 90 pas · 200 pas</b>']) + '</div>', corr: '<div class="pl-col1">' + plListe(['Il dessine ' + plEntoure('un carré'), 'Le côté mesure ' + plEntoure('50 pas')]) + '</div>' },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe(['Pour un triangle équilatéral : répéter ' + B(1) + ' fois, tourner de ' + B() + ' °', 'Pour un hexagone régulier : répéter ' + B(1) + ' fois, tourner de ' + B() + ' °', 'Distance parcourue en traçant l\'hexagone avec des côtés de 30 pas : ' + B() + ' pas']),
        corr: plListe(['Pour un triangle équilatéral : répéter ' + R(3) + ' fois, tourner de ' + R(120) + ' °', 'Pour un hexagone régulier : répéter ' + R(6) + ' fois, tourner de ' + R(60) + ' °', 'Distance parcourue en traçant l\'hexagone avec des côtés de 30 pas : ' + R(180) + ' pas']) },
      { etoiles: 2, col: 1, consigne: 'On part de x = 0. Programme : « répéter 5 fois : ajouter 3 à x ». Puis « répéter 2 fois : multiplier x par 2 ». Complète.',
        eleve: plListe(['Après la 1re boucle, x = ' + B(), 'À la fin, x = ' + B()]), corr: plListe(['Après la 1re boucle, x = ' + R(15), 'À la fin, x = ' + R(60)]) },
      { etoiles: 2, col: 1, consigne: 'Pour aller tout droit de 6 cases vers la droite, quel programme est le plus court ? Entoure.',
        ...ch([['Programme le plus court :', 'répéter 6 fois →']], '→ → → → → → · répéter 6 fois →') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Écris un programme avec une boucle pour dessiner un « escalier » de 4 marches : chaque marche monte de 1 case puis avance de 1 case vers la droite.',
        corr: cm1Redac('Programme', 'répéter 4 fois : ↑ puis →', 'Le robot fait 4 fois la même séquence de deux instructions.') },
    ] },
];
})();

/* ============================================================
   CM2 · Planches : Pensée informatique (D4)
   Se déplacer en s'orientant (avancer, tourner à gauche, tourner à droite) ; la boucle
   « répéter » ; programmes de calcul en blocs ; suites avec un tableur.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const { rmp, ch, chx, tab } = P3;
const { K, RO, VE, svg, L, P, X, Q } = CM2G;
const Bk = (t, c) => `<span style="display:inline-block;background:${c};color:#fff;font-weight:700;border-radius:6px;padding:1px 8px;margin:2px 0;">${t}</span>`;
const Bav = n => Bk(`avancer de ${n}`, '#2EA8C9'), Bg = Bk('tourner à gauche', '#7A4FC0'), Bd = Bk('tourner à droite', '#7A4FC0'), Brep = n => Bk(`répéter ${n} fois`, '#B8962E');
const Bc = t => Bk(t, '#E9A21C');
// Robot : triangle dans une case, orienté (0 haut, 1 droite, 2 bas, 3 gauche).
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const robot = (g, [x, y], o) => { const c = g(x + .5, y + .5), d = DIR[o], n = [-d[1], d[0]];
  return P([[c[0] + d[0] * 8, c[1] + d[1] * 8], [c[0] - d[0] * 6 + n[0] * 6, c[1] - d[1] * 6 + n[1] * 6], [c[0] - d[0] * 6 - n[0] * 6, c[1] - d[1] * 6 - n[1] * 6]], K, 1.2, RO); };
// Exécute un programme : liste de ['a', n] | ['g'] | ['d'] ; renvoie les cases visitées.
const exec = (dep, o, prog) => { const pts = [dep]; let [x, y] = dep;
  prog.forEach(([i, n]) => { if(i === 'g') o = (o + 3) % 4; else if(i === 'd') o = (o + 1) % 4; else { x += DIR[o][0] * n; y += DIR[o][1] * n; pts.push([x, y]); } });
  return pts; };
const grille = (w, h, dep, o, prog, sol, arrivee) => Q(w, h, 22, g => { const pts = exec(dep, o, prog);
  return (sol ? P(pts.map(([x, y]) => g(x + .5, y + .5)), VE, 2.6, 'none', false) : '') + (arrivee || sol ? X(g(pts.at(-1)[0] + .5, pts.at(-1)[1] + .5), arrivee ? 'A' : '', [12, 4], VE) : '') + robot(g, dep, o); }, 230);
const PROG1 = [['a', 2], ['d'], ['a', 3], ['d'], ['a', 1]];
const PROG2 = [['a', 3], ['d'], ['a', 3], ['g'], ['a', 2]];
const ESC = [].concat(...Array(3).fill([['a', 2], ['g'], ['a', 1], ['d']]));
const txt = prog => prog.map(([i, n]) => i === 'a' ? Bav(n) : i === 'g' ? Bg : Bd).join(' ');
PLANCHES['cm2|Pensée informatique'] = [
  { titre: 'Se déplacer en s\'orientant', duree: '30 min',
    attendus: ['Exécuter un programme de déplacement', 'Se mettre à la place du robot pour tourner à gauche ou à droite', 'Écrire un programme de déplacement'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Le robot (triangle rouge) regarde vers le haut. Trace son chemin et marque l'arrivée.<div style="margin:3px 0;">${txt(PROG1)}</div>`,
        eleve: grille(8, 7, [1, 5], 0, PROG1, false), corr: grille(8, 7, [1, 5], 0, PROG1, true) },
      { etoiles: 2, col: 1, consigne: 'Le robot regarde vers la droite. Écris le programme qui lui fait suivre le chemin vert jusqu\'à A.',
        eleve: grille(8, 6, [0, 1], 1, PROG2, true, true) + `<div>${B(14)}</div>`, corr: grille(8, 6, [0, 1], 1, PROG2, true, true) + `<div>${R(txt(PROG2))}</div>` },
      { etoiles: 2, consigne: 'Mets-toi à la place du robot. Entoure la bonne réponse.',
        ...chx([['Le robot regarde vers le bas de la feuille. Il tourne à gauche. Il regarde vers…', 'la droite', 'la gauche · la droite · le haut'], ['Le robot regarde vers la gauche de la feuille. Il tourne à droite. Il regarde vers…', 'le haut', 'le haut · le bas · la droite'], ['Le robot regarde vers le haut. Il tourne deux fois à droite. Il regarde vers…', 'le bas', 'le haut · le bas · la gauche']]) },
    ] },
  { titre: 'Répéter : la boucle', duree: '35 min',
    attendus: ['Comprendre la boucle « répéter »', 'Prévoir la figure tracée par un programme avec boucle', 'Raccourcir un programme avec une boucle'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Quelle figure trace ce programme ?<div style="margin:3px 0;">${Brep(4)} ( ${Bav(3)} ${Bd} )</div>`,
        ...chx([['Le robot trace…', 'un carré', 'un carré · un rectangle · un triangle']]) },
      { etoiles: 2, col: 1, consigne: `Observe ce programme.<div style="margin:3px 0;">${Brep(2)} ( ${Bav(4)} ${Bd} ${Bav(2)} ${Bd} )</div>`,
        ...rmp([['Le robot trace un @.', 'rectangle'], ['Il avance en tout de @ cases.', 12]], 4) },
      { etoiles: 2, consigne: `Le robot regarde vers la droite. Trace le chemin de ce programme.<div style="margin:3px 0;">${Brep(3)} ( ${Bav(2)} ${Bg} ${Bav(1)} ${Bd} )</div>`,
        eleve: `<div style="text-align:center;">${grille(9, 5, [1, 4], 1, ESC, false)}</div>`, corr: `<div style="text-align:center;">${grille(9, 5, [1, 4], 1, ESC, true)}</div>` },
      { etoiles: 3, cahier: true, consigne: `Réécris ce programme avec une boucle :<div style="margin:3px 0;">${Bav(1)} ${Bg} ${Bav(1)} ${Bg} ${Bav(1)} ${Bg} ${Bav(1)} ${Bg}</div>`,
        corr: cm1Redac('Avec une boucle', `${Brep(4)} ( ${Bav(1)} ${Bg} )`, 'Le programme passe de 8 blocs à 3 blocs ; le robot trace un petit carré.') },
    ] },
  { titre: 'Programmes de calcul et tableur', duree: '35 min',
    attendus: ['Exécuter un programme de calcul en blocs', 'Remonter un programme de calcul', 'Calculer les termes d\'une suite avec un tableur'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Programme : ${Bc('choisir un nombre')} ${Bc('ajouter 3')} ${Bc('multiplier par 2')} ${Bc('afficher le résultat')}`,
        ...rmp([['Avec 5, on affiche @', 16], ['Avec 0, on affiche @', 6], ['Avec 10, on affiche @', 26]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Avec le même programme, le robot affiche 20. Quel nombre a-t-on choisi ?',
        corr: cm1Redac('On remonte le programme', { suite: ['20 : 2 = 10', '10 − 3 = 7'] }, 'On a choisi le nombre 7.') },
      { etoiles: 2, consigne: `Dans un tableur, on écrit 3 dans la cellule A1, puis la formule <b>=A1+4</b> dans la cellule A2, et on recopie la formule vers le bas.`,
        eleve: tab([['', 'A'], ['1', 3], ['2', '@'], ['3', '@'], ['4', '@'], ['5', '@'], ['6', '@']], false) + rmp([['Dans la cellule A3, la formule est @', '=A2+4']], 4).eleve,
        corr: tab([['', 'A'], ['1', 3], ['2', '@'], ['3', '@'], ['4', '@'], ['5', '@'], ['6', '@']], true, [7, 11, 15, 19, 23]) + rmp([['Dans la cellule A3, la formule est @', '=A2+4']], 4).corr },
      { etoiles: 2, consigne: 'Programme : ajouter 3, puis multiplier par 2. Complète.', ...P3.rmp([['on choisit 5 : @', 16], ['on choisit 0 : @', 6], ['on choisit 10 : @', 26], ['on choisit 1 : @', 8]], 2) },
    ] },
];
})();

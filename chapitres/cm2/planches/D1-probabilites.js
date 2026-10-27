/* ============================================================
   CM2 · Planches : Probabilités (D1)
   Issues et évènements ; certain, possible, impossible ; « a chances sur b » ; le hasard n'a pas
   de mémoire ; expériences en deux étapes (tableau, arbre).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 2), R = v => plRep(String(v));
const { rmp, ch, chx, tab } = P3;
const { K, svg, L, T } = CM2G;
// Roue de loterie : secteurs [couleur, nombre].
const roue = secteurs => { const n = secteurs.reduce((s, x) => s + x[1], 0); let g = '', k = 0;
  secteurs.forEach(([c, m]) => { for(let i = 0; i < m; i++, k++){ const a0 = -Math.PI / 2 + 2 * Math.PI * k / n, a1 = a0 + 2 * Math.PI / n;
    g += `<path d="M60,60 L${(60 + 50 * Math.cos(a0)).toFixed(1)},${(60 + 50 * Math.sin(a0)).toFixed(1)} A50,50 0 0 1 ${(60 + 50 * Math.cos(a1)).toFixed(1)},${(60 + 50 * Math.sin(a1)).toFixed(1)} Z" fill="${c}" stroke="#fff" stroke-width="2"/>`; } });
  return svg(120, 125, g + `<circle cx="60" cy="60" r="50" fill="none" stroke="${K}" stroke-width="2"/><path d="M60,60 L60,24" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M54,30 L60,18 L66,30 Z" fill="${K}"/><circle cx="60" cy="60" r="4" fill="${K}"/>`, 120); };
const RO = '#E35D3A', BL = '#2EA8C9', VE = '#2E9C6A';
// Sac de billes.
const sac = billes => { let g = `<path d="M20,40 Q10,120 70,124 Q130,120 120,40 Z" fill="#F4E7D3" stroke="${K}" stroke-width="2"/><path d="M40,40 Q70,22 100,40" fill="none" stroke="${K}" stroke-width="2"/>`, i = 0;
  billes.forEach(([c, m]) => { for(let j = 0; j < m; j++, i++) g += `<circle cx="${38 + (i % 4) * 21}" cy="${58 + Math.floor(i / 4) * 21}" r="9" fill="${c}" stroke="${K}" stroke-width="1"/>`; });
  return svg(140, 130, g, 120); };
const pieces = c => tab([['', 'Pile', 'Face'], ['Pile', '@', '@'], ['Face', '@', '@']], c, ['PP', 'PF', 'FP', 'FF']);
// Arbre des menus.
const arbre = (() => { let g = ''; const E = [['salade', 40], ['soupe', 130]], D = ['fruit', 'yaourt', 'gâteau'];
  E.forEach(([e, y]) => { g += L([10, 85], [80, y], K, 1.4) + T([105, y + 4], e); D.forEach((d, i) => { const yy = y - 30 + i * 30; g += L([130, y], [200, yy], K, 1.2) + T([235, yy + 4], d); }); });
  return svg(270, 170, g, 230); })();
PLANCHES['cm2|Probabilités'] = [
  { titre: 'Issues et évènements', duree: '30 min',
    attendus: ['Lister les issues d\'une expérience aléatoire', 'Dire si un évènement est certain, possible ou impossible', 'Comparer les chances de plusieurs évènements'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Complète.',
        ...rmp([['Les issues possibles sont : @', '1, 2, 3, 4, 5, 6'], ['« Obtenir un nombre pair » est réalisé par : @', '2, 4, 6'], ['« Obtenir plus que 4 » est réalisé par : @', '5, 6']], 5) },
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Entoure.',
        ...ch([['Obtenir 7 :', 'impossible'], ['Obtenir un nombre plus petit que 7 :', 'certain'], ['Obtenir 3 :', 'possible']], 'certain · possible · impossible') },
      { etoiles: 2, consigne: `On fait tourner la roue : elle a 8 parts égales.<div style="text-align:center;">${roue([[RO, 3], [BL, 4], [VE, 1]])}</div>`,
        ...rmp([['Obtenir rouge : @ chances sur @', 3, 8], ['Obtenir bleu : @ chances sur @', 4, 8], ['Obtenir vert : @ chance sur @', 1, 8], ['La couleur qui a le plus de chances de sortir : @', 'bleu']], 3) },
      { etoiles: 3, cahier: true, consigne: 'Un sac contient 3 billes rouges et 1 bille bleue. Max dit : « Il y a deux couleurs, donc j\'ai une chance sur deux de tirer la bleue. » A-t-il raison ?',
        corr: cm1Redac('Nombre d\'issues', '3 + 1 = 4', 'Il y a 4 billes, donc 4 issues ; une seule est bleue.') + cm1Redac('Conclusion', 'bleue : 1 chance sur 4', 'Max a tort : il a 1 chance sur 4 de tirer la bleue, et 3 chances sur 4 de tirer une rouge.') },
    ] },
  { titre: 'a chances sur b', duree: '30 min',
    attendus: ['Exprimer une probabilité par « a chances sur b »', 'Comparer deux situations de hasard', 'Savoir que le hasard n\'a pas de mémoire'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Complète.',
        ...rmp([['Obtenir 5 : @ chance sur @', 1, 6], ['Obtenir un nombre pair : @ chances sur @', 3, 6], ['Obtenir un multiple de 3 : @ chances sur @', 2, 6]]) },
      { etoiles: 2, col: 1, consigne: `On tire une bille au hasard dans ce sac.<div style="text-align:center;">${sac([[RO, 5], [BL, 3], [VE, 2]])}</div>`,
        ...rmp([['Rouge : @ chances sur @', 5, 10], ['Bleue : @ chances sur @', 3, 10], ['Pas verte : @ chances sur @', 8, 10]]) },
      { etoiles: 2, col: 1, consigne: 'Pour gagner, il faut tirer une bille rouge. Entoure le meilleur choix.',
        ...chx([['Sac A : 2 rouges et 2 bleues. Sac B : 3 rouges et 1 bleue.', 'sac B', 'sac A · sac B · c\'est pareil'], ['Sac C : 1 rouge et 1 bleue. Sac D : 3 rouges et 3 bleues.', 'c\'est pareil', 'sac C · sac D · c\'est pareil']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Léo a lancé une pièce et obtenu trois fois « pile ». Il pense avoir plus de chances d\'obtenir « face » au prochain lancer. A-t-il raison ?',
        corr: cm1Redac('Prochain lancer', 'pile ou face : 2 issues', 'Léo a tort : la pièce ne se souvient pas des lancers précédents. Il a toujours 1 chance sur 2 d\'obtenir face.') },
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Complète.', ...P3.rmp([['obtenir 6 : @ chance sur @', 1, 6], ['obtenir un nombre pair : @ chances sur @', 3, 6], ['obtenir 7 : @ chance sur 6', 0]], 1) },
      { etoiles: 2, col: 1, consigne: 'Un sac contient 4 billes rouges et 6 bleues. Complète.', ...P3.rmp([['tirer une rouge : @ chances sur @', 4, 10], ['tirer une bleue : @ chances sur @', 6, 10]], 1) },
      { etoiles: 2, col: 1, consigne: 'On lance une pièce. Entoure.', ...P3.chx([['obtenir pile :', '1 chance sur 2', '1 chance sur 2 · 1 chance sur 6']]) },
    ] },
  { titre: 'Expériences en deux étapes', duree: '35 min',
    attendus: ['Lister les issues avec un tableau ou un arbre', 'Compter les issues', 'Exprimer des chances dans une expérience en deux étapes'],
    exos: [
      { etoiles: 2, consigne: 'On lance deux pièces : la première donne la ligne, la seconde la colonne. Complète le tableau (P pour pile, F pour face), puis réponds.',
        eleve: pieces(false) + rmp([['Nombre d\'issues : @', 4], ['Obtenir deux « pile » : @ chance sur @', 1, 4], ['Obtenir un « pile » et un « face » : @ chances sur @', 2, 4]]).eleve,
        corr: pieces(true) + rmp([['Nombre d\'issues : @', 4], ['Obtenir deux « pile » : @ chance sur @', 1, 4], ['Obtenir un « pile » et un « face » : @ chances sur @', 2, 4]]).corr },
      { etoiles: 2, cahier: true, consigne: 'À la cantine, on choisit une entrée (salade ou soupe), puis un dessert (fruit, yaourt ou gâteau). Dessine l\'arbre des choix. Combien y a-t-il de menus ? Si le menu est tiré au hasard, combien de chances a-t-on d\'avoir soupe et gâteau ?',
        corr: cm1Redac('Nombre de menus', '2 × 3 = 6', 'Il y a 6 menus possibles.') + `<div style="text-align:center;">${arbre}</div>` + cm1Redac('Soupe et gâteau', 'un seul menu sur 6', 'On a 1 chance sur 6 d\'avoir soupe et gâteau.') },
      { etoiles: 3, cahier: true, consigne: 'On lance deux dés à 6 faces et on additionne les deux nombres. Fais un tableau des sommes. Combien y a-t-il d\'issues ? Combien de chances a-t-on d\'obtenir 12 ? et 7 ?',
        corr: cm1Redac('Nombre d\'issues', '6 × 6 = 36', 'Le tableau a 36 cases : il y a 36 issues.') + cm1Redac('Somme 12', 'dés (6 ; 6)', 'Une seule case : 1 chance sur 36.') + cm1Redac('Somme 7', 'dés (1 ; 6), (2 ; 5), (3 ; 4), (4 ; 3), (5 ; 2), (6 ; 1)', 'Six cases : 6 chances sur 36. C\'est la somme qui a le plus de chances de sortir.') },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Deux pièces : @ issues (PP, PF, FP, FF)', 4], ['2 entrées et 3 desserts : @ menus', 6]], 1) },
      { etoiles: 3, col: 1, consigne: 'Deux dés : obtenir une somme de 2, c\'est… Entoure.', ...P3.chx([['', '1 seule façon', '1 seule façon · 2 façons · 6 façons']]) },
    ] },
];
})();

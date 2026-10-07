/* ============================================================
   5e · Planches : Équations (N6)
   Tester une solution, résoudre x + b = c, ax = b et ax + b = c, mettre un problème en équation.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }); // choix propres à chaque question
const rel = v => String(+(+v).toFixed(3)).replace('-', '−').replace('.', ',');
// Résolutions : [équation, solution, étape].
const res = l => ({ eleve: plListe(l.map(([e]) => `${e} → x = ${B(3)}`)), corr: plListe(l.map(([e, s, et]) => `${e} → ${et ? et + ' → ' : ''}x = ${R(rel(s))}`)) });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(rel(r))))) });
// Balance : objets x à gauche + masses, masses à droite (dessin simple).
const balance = (g, d) => `<svg class="pl-libre" viewBox="0 0 280 100" style="width:240px;max-width:100%;display:block;margin:0 auto;"><polygon points="128,96 152,96 140,40" fill="#8E9AA8"/><line x1="30" y1="40" x2="250" y2="40" stroke="#4E5665" stroke-width="4" stroke-linecap="round"/><path d="M4 70 L92 70 L84 80 L12 80 Z" fill="#C8D1DC" stroke="#4E5665"/><path d="M188 70 L276 70 L268 80 L196 80 Z" fill="#C8D1DC" stroke="#4E5665"/><line x1="30" y1="40" x2="10" y2="70" stroke="#4E5665"/><line x1="30" y1="40" x2="86" y2="70" stroke="#4E5665"/><line x1="250" y1="40" x2="194" y2="70" stroke="#4E5665"/><line x1="250" y1="40" x2="270" y2="70" stroke="#4E5665"/>${g.map((t, i) => `<rect x="${12 + i * 26}" y="48" width="22" height="22" rx="4" fill="${t === 'x' ? '#7A4FC0' : '#B8962E'}"/>` + cmT(23 + i * 26, 63, t, { fs: 11, c: '#fff' })).join('')}${d.map((t, i) => `<rect x="${196 + i * 26}" y="48" width="22" height="22" rx="4" fill="#B8962E"/>` + cmT(207 + i * 26, 63, t, { fs: 11, c: '#fff' })).join('')}</svg>`;
PLANCHES['5e|Équations'] = [
  { titre: 'Qu\'est-ce qu\'une équation ?', duree: '35 min',
    attendus: ['Reconnaître une équation et son inconnue', 'Tester si un nombre est solution d\'une équation', 'Lire une équation sur une balance en équilibre'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Le nombre est-il solution de l\'équation ? Entoure.',
        ...ch([['x + 8 = 15, pour x = 7 :', 'oui'], ['3x = 18, pour x = 5 :', 'non'], ['2x − 1 = 9, pour x = 5 :', 'oui'], ['10 − x = 4, pour x = 14 :', 'non'], ['x + 3 = 1, pour x = −2 :', 'oui']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'Écris l\'équation traduite par chaque balance en équilibre (chaque masse est en grammes, x est la masse d\'un objet violet).',
        eleve: balance(['x', '5'], ['12']) + `<p style="text-align:center;margin:2px 0 8px;">Équation : ${B(6)} ; x = ${B(2)}</p>` + balance(['x', 'x', 'x'], ['9', '6']) + `<p style="text-align:center;margin:2px 0;">Équation : ${B(6)} ; x = ${B(2)}</p>`,
        corr: balance(['x', '5'], ['12']) + `<p style="text-align:center;margin:2px 0 8px;">Équation : ${R('x+5=12')} ; x = ${R(7)}</p>` + balance(['x', 'x', 'x'], ['9', '6']) + `<p style="text-align:center;margin:2px 0;">Équation : ${R('3x=15')} ; x = ${R(5)}</p>` },
      { etoiles: 2, col: 1, consigne: 'Parmi les nombres proposés, entoure la solution.',
        ...ch([['4x + 1 = 21 :', '5'], ['x − 6 = −2 :', '4'], ['2x + 3 = x + 7 :', '4'], ['5x = 2 :', '0,4']], '0,4 · 2 · 4 · 5 · 8') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Dans 3x + 2 = 8, l\'inconnue est x :', 'vrai'], ['L\'équation x + 1 = x + 2 a une solution :', 'faux'], ['2 est solution de x × x = 4 :', 'vrai'], ['3 est solution de 2x = 6 :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Quelle équation traduit la phrase ? Entoure.',
        ...chx([['Un nombre augmenté de 9 donne 20 :', 'x + 9 = 20', 'x + 9 = 20 · 9x = 20'], ['Le triple d\'un nombre vaut 27 :', '3x = 27', '3x = 27 · x + 3 = 27'], ['Le double d\'un nombre, diminué de 4, vaut 10 :', '2x − 4 = 10', '2x − 4 = 10 · 2(x − 4) = 10']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Teste les nombres 1, 2, 3 et 4 dans l\'équation 3x + 4 = 5x − 2. Lequel est solution ?',
        corr: cm1Redac('Tests', { suite: ['x = 1 : 7 et 3 ; x = 2 : 10 et 8', 'x = 3 : 13 et 13 ; x = 4 : 16 et 18'] }, 'La solution est 3 : pour x = 3, les deux membres valent 13.') },
    ] },
  { titre: 'Résoudre x + b = c', duree: '35 min',
    attendus: ['Isoler x en soustrayant (ou en ajoutant) le même nombre aux deux membres', 'Vérifier la solution', 'Résoudre avec des nombres relatifs ou décimaux'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous.', ...res([['x + 7 = 19', 12, 'x = 19 − 7'], ['x + 15 = 40', 25, 'x = 40 − 15'], ['x − 4 = 11', 15, 'x = 11 + 4'], ['x − 9 = 0', 9, 'x = 0 + 9']]) },
      { etoiles: 2, col: 1, consigne: 'Résous.', ...res([['x + 2,5 = 7', 4.5, 'x = 7 − 2,5'], ['x − 1,2 = 3,8', 5, 'x = 3,8 + 1,2'], ['x + 8 = 3', -5, 'x = 3 − 8'], ['x − 6 = −10', -4, 'x = −10 + 6']]) },
      { etoiles: 2, col: 1, consigne: 'Résous (attention à la place de x).', ...res([['12 + x = 30', 18], ['25 = x + 9', 16], ['7 = x − 3', 10], ['−4 + x = 6', 10]]) },
      { etoiles: 2, col: 1, consigne: 'Complète la méthode pour résoudre x + 13 = 21.',
        ...rmp([['On soustrait @ aux deux membres.', 13], ['x + 13 − 13 = 21 − 13, donc x = @', 8], ['Vérification : 8 + 13 = @', 21]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la bonne première étape.',
        ...chx([['x + 5 = 17 :', 'soustraire 5', 'ajouter 5 · soustraire 5'], ['x − 8 = 2 :', 'ajouter 8', 'ajouter 8 · soustraire 8'], ['x + 1,5 = 4 :', 'soustraire 1,5', 'ajouter 1,5 · soustraire 1,5']]) },
      { etoiles: 1, col: 1, consigne: 'Vérifie : la solution trouvée est-elle juste ? Entoure.',
        ...ch([['x + 6 = 14 → x = 8 :', 'juste'], ['x − 3 = 9 → x = 6 :', 'fausse'], ['x + 2,5 = 3 → x = 0,5 :', 'juste']], 'juste · fausse') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un sac et un livre pèsent ensemble 2,4 kg. Le livre pèse 0,65 kg. Écris une équation dont l\'inconnue est la masse du sac, puis résous-la.',
        corr: cm1Redac('Équation', 'x + 0,65 = 2,4 donc x = 2,4 − 0,65 = 1,75', 'Le sac pèse 1,75 kg.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La température a baissé de 7 degrés depuis ce matin ; il fait maintenant −3 °C. Écris une équation, puis trouve la température du matin.',
        corr: cm1Redac('Équation', 'x − 7 = −3 donc x = −3 + 7 = 4', 'Ce matin, il faisait 4 °C.') },
    ] },
  { titre: 'Résoudre ax = b et ax + b = c', duree: '40 min',
    attendus: ['Isoler x en divisant les deux membres par le même nombre non nul', 'Résoudre en deux étapes : d\'abord le terme constant, puis le coefficient', 'Vérifier la solution'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous.', ...res([['3x = 24', 8, 'x = 24 : 3'], ['5x = 35', 7, 'x = 35 : 5'], ['4x = 10', 2.5, 'x = 10 : 4'], ['10x = 3', 0.3, 'x = 3 : 10']]) },
      { etoiles: 2, col: 1, consigne: 'Résous en deux étapes.', ...res([['2x + 3 = 11', 4, '2x = 8'], ['3x − 5 = 16', 7, '3x = 21'], ['5x + 4 = 29', 5, '5x = 25'], ['4x − 7 = 5', 3, '4x = 12']]) },
      { etoiles: 2, col: 1, consigne: 'Résous.', ...res([['6x + 1 = 4', 0.5, '6x = 3'], ['2x + 9 = 1', -4, '2x = −8'], ['8 + 3x = 20', 4, '3x = 12'], ['7x − 2 = 12', 2, '7x = 14']]) },
      { etoiles: 2, col: 1, consigne: 'Complète la méthode pour résoudre 4x + 6 = 26.',
        ...rmp([['On soustrait 6 : 4x = @', 20], ['On divise par 4 : x = @', 5], ['Vérification : 4 × 5 + 6 = @', 26]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Pour résoudre 7x = 21, on soustrait 7 :', 'faux'], ['La solution de 2x = 1 est 0,5 :', 'vrai'], ['La solution de 3x + 3 = 3 est 1 :', 'faux'], ['La solution de x : 4 = 2 est 8 :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Résous (x : 3 signifie x divisé par 3).', ...res([['x : 3 = 7', 21, 'x = 7 × 3'], ['x : 5 = 1,2', 6, 'x = 1,2 × 5'], ['x : 2 + 4 = 10', 12, 'x : 2 = 6']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure la solution.',
        ...ch([['9x = 54 :', '6'], ['3x + 7 = 1 :', '−2'], ['2x − 0,5 = 4,5 :', '2,5']], '−2 · 2 · 2,5 · 6 · 9') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Quatre cahiers identiques et un stylo à 2,50 € coûtent 10,90 €. Écris une équation, puis trouve le prix d\'un cahier.',
        corr: cm1Redac('Équation', { suite: ['4x + 2,5 = 10,9', '4x = 8,4 donc x = 8,4 : 4 = 2,1'] }, 'Un cahier coûte 2,10 €.') },
    ] },
  { titre: 'Mettre un problème en équation', duree: '45 min',
    attendus: ['Choisir l\'inconnue', 'Écrire une équation qui traduit l\'énoncé', 'Résoudre, puis répondre par une phrase'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Écris l\'équation, puis résous-la (x désigne le nombre cherché).',
        ...(() => { const l = [['Un nombre augmenté de 14 donne 50.', 'x+14=50', 36], ['Le quadruple d\'un nombre est 52.', '4x=52', 13], ['Un nombre diminué de 6 donne −1.', 'x−6=−1', 5]];
          return { eleve: plListe(l.map(([t]) => `${t} Équation : ${B(5)} ; x = ${B(2)}`)), corr: plListe(l.map(([t, e, s]) => `${t} Équation : ${R(e)} ; x = ${R(s)}`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Périmètres : trouve x.',
        ...rmp([['Un carré de côté x a un périmètre de 34 cm : x = @ cm', 8.5], ['Un rectangle de longueur x et de largeur 4 a un périmètre de 30 : x = @', 11], ['Un triangle équilatéral de côté x a un périmètre de 27 : x = @', 9]], 3) },
      { etoiles: 2, col: 1, consigne: 'Âges.',
        ...rmp([['Dans 8 ans, Léo aura 21 ans. Il a aujourd\'hui @ ans.', 13], ['Mon père a le triple de mon âge et il a 42 ans. J\'ai @ ans.', 14], ['La somme de mon âge et de celui de ma sœur, qui a 3 ans de plus, est 25. J\'ai @ ans.', 11]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'équation qui traduit le problème.',
        ...chx([['Trois stylos à x € et une gomme à 1 € coûtent 7 € :', '3x + 1 = 7', '3x + 1 = 7 · 3(x + 1) = 7'], ['Un nombre et son double font 45 :', 'x + 2x = 45', 'x + 2x = 45 · 2x = 45'], ['La moitié d\'un nombre vaut 9 :', 'x : 2 = 9', 'x : 2 = 9 · 2x = 9']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une salle de cinéma de 312 places est formée de rangées de 24 places. Combien y a-t-il de rangées ? (Choisis l\'inconnue, écris l\'équation, résous, conclus.)',
        corr: cm1Redac('Rangées', { suite: ['Soit x le nombre de rangées : 24x = 312', 'x = 312 : 24 = 13'] }, 'Il y a 13 rangées.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un abonnement de streaming coûte 9 € par mois plus 15 € de frais d\'inscription. Après combien de mois aura-t-on payé 96 € en tout ?',
        corr: cm1Redac('Durée', { suite: ['Soit x le nombre de mois : 9x + 15 = 96', '9x = 81 donc x = 9'] }, 'On aura payé 96 € au bout de 9 mois.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trois nombres entiers consécutifs ont pour somme 72. Quels sont-ils ? (Appelle n le plus petit.)',
        corr: cm1Redac('Nombres', { suite: ['n + (n + 1) + (n + 2) = 72', '3n + 3 = 72 donc 3n = 69 et n = 23'] }, 'Les nombres sont 23, 24 et 25.') },
    ] },
];
})();

/* ============================================================
   6e · Planches : Initiation à l'algèbre (N6)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
// Balance en équilibre : à gauche k boîtes « ? » et a unités, à droite b unités (dessin).
const bal = (k, a, b) => { let s = `<polygon points="150,112 162,112 156,60" fill="#8E9AA8"/><line x1="40" y1="60" x2="272" y2="60" stroke="#4E5665" stroke-width="4"/><path d="M8 92 L120 92 L110 102 L18 102 Z" fill="#C8D1DC" stroke="#4E5665"/><path d="M192 92 L304 92 L294 102 L202 102 Z" fill="#C8D1DC" stroke="#4E5665"/><line x1="64" y1="60" x2="64" y2="92" stroke="#4E5665"/><line x1="248" y1="60" x2="248" y2="92" stroke="#4E5665"/>`;
  let x = 14; for(let i = 0; i < k; i++, x += 26) s += `<rect x="${x}" y="68" width="22" height="22" rx="3" fill="#7A4FC0"/><text x="${x + 11}" y="84" font-size="13" fill="#fff" text-anchor="middle" font-weight="700" font-family="Space Grotesk">?</text>`;
  for(let i = 0; i < a; i++, x += 16) s += `<circle cx="${x + 7}" cy="83" r="7" fill="#F2A93B" stroke="#4E5665"/>`;
  x = 198; for(let i = 0; i < b; i++, x += 16) s += `<circle cx="${x + 7 - (i >= 6 ? 96 : 0)}" cy="${i >= 6 ? 68 : 83}" r="7" fill="#F2A93B" stroke="#4E5665"/>`;
  return S(312, 116, s, 280); };
PLANCHES['6e|Initiation à l\'algèbre'] = [
  { titre: 'Qu\'est-ce qu\'un problème algébrique ?', duree: '35 min',
    attendus: ['Comprendre qu\'une lettre peut désigner un nombre inconnu', 'Traduire une phrase par une égalité', 'Tester si un nombre est solution'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Traduis chaque phrase par une égalité (n désigne le nombre cherché). Entoure.',
        ...ch([['Le triple d\'un nombre est 21 :', '3 × n = 21'], ['Un nombre augmenté de 7 donne 15 :', 'n + 7 = 15'], ['La moitié d\'un nombre vaut 9 :', 'n ÷ 2 = 9']], 'n + 7 = 15 · 3 × n = 21 · n ÷ 2 = 9') },
      { etoiles: 1, col: 1, consigne: 'Le nombre proposé est-il solution ? Entoure.',
        ...ch([['n + 8 = 20, avec n = 12 :', 'oui'], ['4 × n = 30, avec n = 8 :', 'non'], ['2 × n + 1 = 11, avec n = 5 :', 'oui'], ['n − 3 = 10, avec n = 7 :', 'non']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre mystère.',
        eleve: plListe(['n + 12 = 30 : n = ' + B(), '5 × n = 45 : n = ' + B(), 'n − 6 = 14 : n = ' + B(), 'n ÷ 4 = 8 : n = ' + B()]),
        corr: plListe(['n + 12 = 30 : n = ' + R(18), '5 × n = 45 : n = ' + R(9), 'n − 6 = 14 : n = ' + R(20), 'n ÷ 4 = 8 : n = ' + R(32)]) },
      { etoiles: 2, col: 1, consigne: 'Les boîtes « ? » ont toutes la même masse ; une boule pèse 1 unité. Combien pèse une boîte ?',
        eleve: `<div style="text-align:center;">${bal(2, 1, 9)}</div>` + plListe(['Égalité : 2 × n + 1 = 9', 'Une boîte pèse ' + B(1) + ' unités']), corr: `<div style="text-align:center;">${bal(2, 1, 9)}</div>` + plListe(['Égalité : 2 × n + 1 = 9', 'On enlève 1 boule de chaque côté : 2 × n = 8.', 'Une boîte pèse ' + R(4) + ' unités']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le périmètre d\'un carré est 52 cm. On appelle c la longueur de son côté. Écris une égalité, puis trouve c.',
        corr: cm1Redac('Mise en équation', '4 × c = 52', 'c = 52 ÷ 4 = 13 : le côté mesure 13 cm.') },
    ] },
  { titre: 'Résoudre un problème algébrique', duree: '40 min',
    attendus: ['Choisir l\'inconnue et écrire une égalité', 'Résoudre par essais ou en « défaisant » les opérations', 'Vérifier la solution et rédiger la réponse'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Résous en défaisant les opérations.',
        eleve: plListe(['3 × n + 4 = 25 : n = ' + B(), '2 × n − 5 = 13 : n = ' + B(), '10 × n + 3 = 53 : n = ' + B()]),
        corr: plListe(['3 × n + 4 = 25 : 3 × n = 21, n = ' + R(7), '2 × n − 5 = 13 : 2 × n = 18, n = ' + R(9), '10 × n + 3 = 53 : 10 × n = 50, n = ' + R(5)]) },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau d\'essais pour trouver n tel que n × n + n = 30.',
        eleve: `<table class="pl-tab"><tr><th>n</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>n × n + n</td><td>${B()}</td><td>${B()}</td><td>${B()}</td><td>${B()}</td></tr></table>` + plListe(['La solution est n = ' + B(1)]),
        corr: `<table class="pl-tab"><tr><th>n</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>n × n + n</td><td>${R(12)}</td><td>${R(20)}</td><td>${R(30)}</td><td>${R(42)}</td></tr></table>` + plListe(['La solution est n = ' + R(5)]) },
      { etoiles: 2, col: 1, consigne: 'Pour chaque balance, combien pèse une boîte « ? » ?',
        eleve: `<div style="text-align:center;">${bal(3, 2, 11)}</div>` + plListe(['Égalité : ' + B(1) + ' × n + ' + B(1) + ' = ' + B(2), 'Une boîte pèse ' + B(1) + ' unités']), corr: `<div style="text-align:center;">${bal(3, 2, 11)}</div>` + plListe(['Égalité : ' + R(3) + ' × n + ' + R(2) + ' = ' + R(11), 'Une boîte pèse ' + R(3) + ' unités']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Tom a 5 ans de plus que sa sœur. À eux deux, ils ont 27 ans. Quel âge a sa sœur ? (Appelle s l\'âge de la sœur.)',
        corr: cm1Redac('Mise en équation', { suite: ['s + (s + 5) = 27, donc 2 × s + 5 = 27.', '2 × s = 22, donc s = 11.'] }, 'La sœur a 11 ans et Tom 16 ans (11 + 16 = 27).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au cinéma, 4 places et un menu à 6 € coûtent 42 € en tout. Quel est le prix d\'une place ?',
        corr: cm1Redac('Mise en équation', { suite: ['4 × p + 6 = 42', '4 × p = 36, donc p = 9.'] }, 'Une place coûte 9 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Je pense à un nombre. Je le multiplie par 4, puis je retire 7 : je trouve 33. Quel est mon nombre ?',
        corr: cm1Redac('Mise en équation', { suite: ['4 × n − 7 = 33', '4 × n = 40, donc n = 10.'] }, 'Le nombre est 10 (vérification : 4 × 10 − 7 = 33).') },
    ] },
  { titre: 'Programmes de calcul et expressions', duree: '35 min',
    attendus: ['Appliquer un programme de calcul à un nombre', 'Écrire un programme de calcul avec une lettre', 'Remonter un programme de calcul pour retrouver le nombre de départ'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Programme : « choisis un nombre ; multiplie-le par 3 ; ajoute 5 ». Complète.',
        eleve: plListe(['Avec 2 : ' + B(), 'Avec 10 : ' + B(), 'Avec 0 : ' + B(), 'Avec 1,5 : ' + B()]),
        corr: plListe(['Avec 2 : 3 × 2 + 5 = ' + R(11), 'Avec 10 : ' + R(35), 'Avec 0 : ' + R(5), 'Avec 1,5 : ' + R('9,5')]) },
      { etoiles: 2, col: 1, consigne: 'Quel nombre faut-il choisir au départ pour obtenir… ?',
        eleve: plListe(['20 : ' + B(), '50 : ' + B(), '5 : ' + B()]),
        corr: plListe(['20 : (20 − 5) ÷ 3 = ' + R(5), '50 : (50 − 5) ÷ 3 = ' + R(15), '5 : ' + R(0)]) },
      { etoiles: 2, col: 1, consigne: 'On appelle x le nombre choisi. Entoure l\'expression qui traduit le programme.',
        ...ch([['multiplier par 3, puis ajouter 5 :', '3 × x + 5'], ['ajouter 5, puis multiplier par 3 :', '(x + 5) × 3'], ['multiplier par 2, puis retirer 1 :', '2 × x − 1']], '3 × x + 5 · (x + 5) × 3 · 2 × x − 1') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Programme : « choisis un nombre ; ajoute 3 ; multiplie par 2 ; retire le double du nombre de départ ». Teste avec 4, 10 et 0. Que remarques-tu ? Explique.',
        corr: cm1Redac('Tests', { suite: ['4 : (4 + 3) × 2 − 8 = 6', '10 : (10 + 3) × 2 − 20 = 6', '0 : (0 + 3) × 2 − 0 = 6'] }, 'On trouve toujours 6 : (n + 3) × 2 = 2 × n + 6, et on retire 2 × n.') },
    ] },
];
})();

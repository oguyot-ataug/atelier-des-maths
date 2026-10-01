/* ============================================================
   CHAPITRE : Algèbre (CM1, N10, période 5)
   Programme du cycle 3 (CM1), thème « pensée algébrique » : observer et prolonger des suites
   (motifs, suites de figures, suites de nombres) et expliquer la règle ; comprendre le signe =
   comme une égalité (« vaut autant que ») et trouver le nombre manquant dans une égalité à trou ;
   la balance en équilibre ; programmes de calcul simples (entrée → sortie) et remonter le
   programme. Pas de lettre ni d'équation formelle en CM1 : l'inconnue est notée par un symbole
   (?, ■).
   ============================================================ */
(() => {
// Suite de figures « allumettes » : n carrés accolés.
function allumettes(n){
  const k = 26, W = n * k + 12; let s = `<svg viewBox="0 0 ${W} ${k + 12}" style="width:${W}px;display:inline-block;vertical-align:bottom;margin:0 8px;">`;
  const seg = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#B8962E" stroke-width="4" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="2.6" fill="#E35D3A"/>`;
  for(let i = 0; i < n; i++){ const x = 6 + i * k; s += seg(x, 6, x + k, 6) + seg(x, 6 + k, x + k, 6 + k); }
  for(let i = 0; i <= n; i++){ const x = 6 + i * k; s += seg(x, 6 + k, x, 6); }
  return s + '</svg>';
}
function balance(g, d){
  return `<svg viewBox="0 0 260 120" style="width:260px;display:block;margin:6px auto;"><polygon points="130,40 118,110 142,110" fill="#8A6A2E"/><line x1="30" y1="40" x2="230" y2="40" stroke="#5B4A12" stroke-width="5"/>
  <path d="M30 40 L10 75 L50 75 Z M210 75 L250 75 L230 40 Z" fill="none" stroke="#5B4A12" stroke-width="1.5"/><rect x="0" y="75" width="60" height="8" rx="3" fill="#5B4A12"/><rect x="200" y="75" width="60" height="8" rx="3" fill="#5B4A12"/>
  <text x="30" y="68" font-size="14" text-anchor="middle" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">${g}</text><text x="230" y="68" font-size="14" text-anchor="middle" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">${d}</text></svg>`;
}
const Q = '<b style="color:#E35D3A;">■</b>';
cm1Chapitre({
  titre: 'Algèbre', slug: 'algebre',
  cours: `
${cm1Lecon(1, 'Observer et prolonger une suite')}
${cm1Def('Une <b>suite</b> est une liste d\'éléments (dessins, nombres…) qui suivent une <b>règle</b>. Pour la prolonger, on cherche ce qui change d\'un élément au suivant.')}
${cm1Exemple('Une suite de motifs : ● ▲ ▲ ● ▲ ▲ ● ▲ ▲ …', ['Le motif « ● ▲ ▲ » se répète. Le 10<sup>e</sup> élément est un ● (car 10 = 3 × 3 + 1 : c\'est le premier élément du 4<sup>e</sup> motif).'])}
${cm1Exemple('Une suite de nombres : 5 ; 9 ; 13 ; 17 ; …', ['On ajoute <b>4</b> à chaque fois. Les nombres suivants sont 21, 25, 29.'])}
${ce2AnimSauts('cm1-al-suite', { legende: 'Une suite qui augmente toujours de la même quantité : des sauts tous égaux.', presets: [{ nom: '+ 4 à chaque fois', depart: 5, sauts: [[4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4']], min: 0, max: 32, fin: '5, 9, 13, 17, 21, 25, 29 : on ajoute 4 à chaque fois.' }, { nom: '+ 5 à chaque fois', depart: 3, sauts: [[5, '+ 5'], [5, '+ 5'], [5, '+ 5'], [5, '+ 5']], min: 0, max: 26, fin: '3, 8, 13, 18, 23 : on ajoute 5 à chaque fois.' }] })}

${cm1Lecon(2, 'Une suite de figures')}
<div class="figure-wrap" style="text-align:center;">${allumettes(1)}${allumettes(2)}${allumettes(3)}${allumettes(4)}
<div class="hint" style="margin-top:6px;">Étape 1 : 4 allumettes ; étape 2 : 7 ; étape 3 : 10 ; étape 4 : 13.</div></div>
${cm1Regle('À chaque étape, on ajoute un carré qui utilise <b>3 allumettes de plus</b>. Pour l\'étape 5 : 13 + 3 = <b>16</b> allumettes.<br>On peut aussi trouver directement l\'étape 10 : on part de 1 allumette (le côté de gauche), puis 3 allumettes par carré : 1 + 10 × 3 = <b>31</b> allumettes.', 'Trouver la règle')}

${cm1Lecon(3, 'Le signe = et les égalités à trou')}
${cm1Def('Le signe <b>=</b> veut dire « <b>vaut autant que</b> » : ce qui est à gauche a la même valeur que ce qui est à droite. Il ne veut pas seulement dire « le résultat est ».')}
${cm1Exemple('Exemples :', ['7 + 5 = 12 et aussi 12 = 7 + 5.', '7 + 5 = 10 + 2 : les deux côtés valent 12.', `Dans 8 + ${Q} = 15, le nombre caché ${Q} est <b>7</b> (car 8 + 7 = 15).`, `Dans ${Q} × 6 = 42, le nombre caché est <b>7</b> (table de 6).`])}
${cm1Rem('Pour trouver un nombre caché, on peut utiliser l\'<b>opération inverse</b> : 8 + ■ = 15 → ■ = 15 − 8 = 7.')}

${cm1Lecon(4, 'La balance en équilibre')}
${balance('3 cubes + 4 g', '10 g')}
${cm1Regle('Une égalité ressemble à une <b>balance en équilibre</b> : les deux plateaux ont la même masse. Si on enlève la même chose des deux côtés, la balance reste en équilibre.<br>Ici, on enlève 4 g de chaque côté :' + cm1Liste(['3 cubes + 4 g = 10 g', '3 cubes = 6 g', 'donc <b>1 cube = 2 g</b>']))}

${cm1Lecon(5, 'Les programmes de calcul')}
${cm1Def('Un <b>programme de calcul</b> est une suite d\'instructions à appliquer à un nombre de départ.')}
${cm1Exemple('Programme : « Choisis un nombre → multiplie-le par 2 → ajoute 3 ».', ['Avec 5 : 5 × 2 = 10,', 'puis 10 + 3 = <b>13</b>.', 'On a obtenu 17 : quel était le nombre de départ ? On <b>remonte</b> le programme :', '17 − 3 = 14,', 'puis 14 ÷ 2 = <b>7</b>.'])}
`,
  methode: `
${cm1Demo('al-suite', 'Trouver le 10e terme d\'une suite', 'Suite : 3 ; 8 ; 13 ; 18 ; … Quel est le 10<sup>e</sup> nombre ?')}
${cm1Demo('al-remonter', 'Remonter un programme de calcul', 'Programme : « Choisis un nombre → ajoute 4 → multiplie par 3 ». On obtient 30. Quel était le nombre de départ ?')}
`,
  demos: [
    ['al-suite', [
      { expr: '3 → 8 → 13 → 18', note: 'On regarde ce qui change d\'un nombre au suivant : on ajoute 5 à chaque fois.' },
      { expr: '1er : 3 ; puis 9 fois « + 5 »', note: 'Du 1er au 10e nombre, on ajoute 5 neuf fois (pas dix !).' },
      { expr: '9 × 5 = 45', note: 'On calcule ce qu\'on ajoute en tout.' },
      { expr: '3 + 45 = 48', note: 'Le 10e nombre est 48. On peut vérifier en écrivant toute la suite.' },
    ]],
    ['al-remonter', [
      { expr: 'départ → + 4 → × 3 → 30', note: 'On écrit le programme sous forme de chaîne.' },
      { expr: '30 ÷ 3 = 10', note: 'On remonte en partant de la fin : l\'inverse de « × 3 » est « ÷ 3 ».' },
      { expr: '10 − 4 = 6', note: 'L\'inverse de « + 4 » est « − 4 ».' },
      { expr: 'Le nombre de départ était 6.', note: 'Vérification : 6 + 4 = 10, 10 × 3 = 30. ✔' },
    ]],
  ],
  exos: cm1Exos('al', [
    [`Prolonge chaque suite de 3 nombres et explique la règle.${cm1Liste(['2 ; 5 ; 8 ; 11 ; …', '100 ; 90 ; 80 ; …', '1 ; 2 ; 4 ; 8 ; …'])}`,
      cm1Redac('Première suite', '2 ; 5 ; 8 ; 11 ; 14 ; 17 ; 20', 'On ajoute 3 à chaque fois.')
      + cm1Redac('Deuxième suite', '100 ; 90 ; 80 ; 70 ; 60 ; 50', 'On enlève 10 à chaque fois.')
      + cm1Redac('Troisième suite', '1 ; 2 ; 4 ; 8 ; 16 ; 32 ; 64', 'On multiplie par 2 à chaque fois.')],
    ['Suite de motifs : ★ ■ ■ ★ ■ ■ … Quel est le 12<sup>e</sup> élément ? le 13<sup>e</sup> ?',
      cm1Redac('Position dans le motif', '12 = 3 × 4', 'Le motif « ★ ■ ■ » a 3 éléments : le 12<sup>e</sup> élément termine le 4<sup>e</sup> motif, c\'est un ■. Le 13<sup>e</sup> commence un nouveau motif : c\'est un ★.')],
    ['Avec la suite des allumettes du cours, combien faut-il d\'allumettes pour l\'étape 6 ? pour l\'étape 20 ?',
      cm1Redac('Étape 6', ['1 + 6 × 3', '1 + 18', '19'], 'Il faut 19 allumettes pour l\'étape 6.')
      + cm1Redac('Étape 20', { nom: 'B', lignes: ['1 + 20 × 3', '1 + 60', '61'] }, 'Il faut 61 allumettes pour l\'étape 20.')],
    [`Trouve le nombre caché.${cm1Liste([`25 + ${Q} = 40`, `${Q} − 12 = 30`, `7 × ${Q} = 56`, `${Q} ÷ 4 = 9`])}`,
      cm1Redac('Nombres cachés', { suite: ['25 + 15 = 40', '42 − 12 = 30', '7 × 8 = 56', '36 ÷ 4 = 9'] }, 'Les nombres cachés sont 15, 42, 8 et 36.')],
    [`Vrai ou faux ?${cm1Liste(['6 + 4 = 5 + 5', '3 × 4 = 4 + 3', '20 = 4 × 5'])}`,
      cm1Redac('Première égalité', { suite: ['6 + 4 = 10', '5 + 5 = 10'] }, 'Les deux côtés valent 10 : c\'est vrai.')
      + cm1Redac('Deuxième égalité', { suite: ['3 × 4 = 12', '4 + 3 = 7'] }, '12 et 7 ne sont pas égaux : c\'est faux.')
      + cm1Redac('Troisième égalité', '4 × 5 = 20', 'C\'est vrai.')],
    ['Programme : « Choisis un nombre → multiplie par 5 → enlève 2 ». Que donne-t-il avec 4 ? avec 10 ?',
      cm1Redac('Avec 4', ['4 × 5 − 2', '20 − 2', '18'], 'Avec 4, le programme donne 18.')
      + cm1Redac('Avec 10', { nom: 'B', lignes: ['10 × 5 − 2', '50 − 2', '48'] }, 'Avec 10, le programme donne 48.')],
    ['Avec le même programme, on a obtenu 33. Quel était le nombre de départ ?',
      cm1Redac('On remonte le programme', { suite: ['33 + 2 = 35', '35 ÷ 5 = 7'] }, 'Le nombre de départ était 7. Vérification : 7 × 5 − 2 = 33.')],
    ['Sur une balance en équilibre, il y a 2 boîtes identiques et 5 kg d\'un côté, et 17 kg de l\'autre. Combien pèse une boîte ?',
      cm1Redac('Masse des 2 boîtes', '17 − 5 = 12', 'On enlève 5 kg de chaque côté : 2 boîtes pèsent 12 kg.') + cm1Redac('Masse d\'une boîte', '12 ÷ 2 = 6', 'Une boîte pèse 6 kg.')],
  ], { titre: 'Rédaction type : « Nombre caché »', lignes: [['■ + 18 = 50', 'Je cherche le nombre qui, ajouté à 18, donne 50.'], ['■ = 50 − 18 = 32', 'J\'utilise l\'opération inverse.'], ['Vérification : 32 + 18 = 50', 'Je vérifie.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : al-Khwârizmî et le mot « algèbre »', [
    'Au IX<sup>e</sup> siècle, à Bagdad, le savant <b>al-Khwârizmî</b> écrit un livre pour résoudre des problèmes de partage d\'héritage et de commerce. Il y explique comment trouver un nombre inconnu en « équilibrant » les deux côtés, comme une balance.',
    'Le titre de son livre contient le mot <i>al-jabr</i>, qui veut dire « remettre en place » : c\'est l\'origine du mot <b>algèbre</b>. Et son nom a donné le mot <b>algorithme</b> !',
    'Le signe « = » a été inventé bien plus tard, en 1557, par le Gallois <b>Robert Recorde</b> : il a choisi deux traits parallèles « parce que rien ne peut être plus égal ».',
  ]),
  quiz: [
    { q: 'Suite : 4 · 7 · 10 · 13 · … Le nombre suivant est…', opts: ['15', '16', '17'], correct: 1 },
    { q: '9 + ■ = 20. ■ vaut…', opts: ['11', '29', '9'], correct: 0 },
    { q: 'Le signe = veut dire…', opts: ['« le résultat est » seulement', '« vaut autant que »', '« est plus grand que »'], correct: 1 },
  ],
});
})();

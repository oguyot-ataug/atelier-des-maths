/* ============================================================
   CHAPITRE : Puissances (5e, N7)
   Nouveau programme du cycle 4 (BO n° 10 du 5 mars 2026, annexe 2), 5e, « Puissances » : découvrir la
   notion de puissance et sa notation dans le cas du carré et du cube ; connaître les carrés des entiers
   de 0 à 12 et le cube de 10 ; écrire un nombre sous la forme d'une puissance 2 ou 3 ; calculer des
   expressions contenant des puissances simples, additions, soustractions et produits ; calculer la
   valeur d'une expression littérale contenant une puissance simple. Automatismes : tables de
   multiplication, unités d'aire et de volume (le carré et le cube, aire du carré et volume du cube).
   Pour aller plus loin (4e) : les puissances d'exposant plus grand que 3, les puissances de dix.
   Écrit avec les outils du primaire (cm1Chapitre, cmAnim) : le carré qui se remplit, le cube qui
   s'empile couche par couche.
   ============================================================ */
(() => {
const T = cm1Tex, P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const plusLoin = t => `<div class="sub-header" data-oliv-plus="En route vers la 4e !"><span class="letter">+</span><h4>Pour aller plus loin : ${t}</h4></div>`;
// Un carré de n × n petits carreaux (k déjà coloriés).
function carre(n, k, px){
  const c = Math.min(30, 180 / n); let s = '';
  for(let i = 0; i < n * n; i++){ const x = 4 + (i % n) * c, y = 4 + Math.floor(i / n) * c; s += `<rect x="${x}" y="${y}" width="${c}" height="${c}" fill="${i < (k == null ? n * n : k) ? '#2EA8C9' : '#fff'}" fill-opacity="${i < (k == null ? n * n : k) ? .55 : 1}" stroke="#1F3A5C" stroke-width="1.2"/>`; }
  return cpSvg(n * c + 8, n * c + 8, s, px);
}
// Un cube de n × n × n petits cubes : les couches déjà posées (h) et la couche en cours (k cubes).
function cube(n, h, k, px){
  const L = []; for(let y = 0; y < n; y++) for(let z = n - 1; z >= 0; z--) for(let x = 0; x < n; x++){ if(y < h || (y === h && L.filter(c => c[1] === h).length < k)) L.push([x, y, z]); }
  return L.length ? ce1Cubes(L, px) : cpSvg(10, 10, '', 10);
}
/* ---- Le carré se remplit rangée par rangée ; le cube s'empile couche par couche ---- */
function animPuissance(id){
  return cmAnim(id, {
    etat: { n: 3, mode: 'carre' }, duree: 8000,
    legende: 'Le carré de n : n rangées de n carreaux. Le cube de n : n couches de n × n petits cubes.',
    controles: a => `<div class="cmp-modeles">${cmBtn(id, 'mode', 'carre', 'Le carré', a.etat.mode === 'carre')}${cmBtn(id, 'mode', 'cube', 'Le cube', a.etat.mode === 'cube')}${cmPlusMoins(id, 'n', a.etat.n, 2, a.etat.mode === 'cube' ? 4 : 6, 'n')}</div>`,
    corriger: a => { if(a.etat.mode === 'cube') a.etat.n = Math.min(a.etat.n, 4); },
    dessin: (t, a) => {
      const { n, mode } = a.etat, ph = cmPhase(t, .08, .9);
      if(mode === 'carre'){
        const k = Math.round(ph * n * n), r = Math.floor(k / n);
        return { scene: carre(n, k, 230).replace('class="pl-libre"', 'class="pl-libre cma-svg"'), texte: t >= .9 ? `${n} rangées de ${n} carreaux : ${T(`${n}^2 = ${n} \\times ${n} = ${n * n}`)}. On lit « ${n} au carré ».` : `${r} rangée${r > 1 ? 's' : ''} de ${n}…` };
      }
      const tot = n * n * n, k = Math.round(ph * tot), h = Math.floor(k / (n * n));
      return { scene: cube(n, h, k - h * n * n, 230).replace('class="pl-libre"', 'class="pl-libre cma-svg"'), texte: t >= .9 ? `${n} couches de ${n} × ${n} = ${n * n} petits cubes : ${T(`${n}^3 = ${n} \\times ${n} \\times ${n} = ${tot}`)}. On lit « ${n} au cube ».` : `${h} couche${h > 1 ? 's' : ''} complète${h > 1 ? 's' : ''} de ${n * n} petits cubes…` };
    } });
}

cm1Chapitre({
  niveau: '5e', titre: 'Puissances', slug: 'puissances',
  cours: `
${cm1Lecon(1, 'Le carré et le cube d\'un nombre')}
${animPuissance('p5-puissances')}
${cm1Def(`${cm1Liste([`Le <b>carré</b> d'un nombre ${T('a')} est ${T('a \\times a')}. On le note ${T('a^2')} et on lit « ${T('a')} au carré ».`, `Le <b>cube</b> d'un nombre ${T('a')} est ${T('a \\times a \\times a')}. On le note ${T('a^3')} et on lit « ${T('a')} au cube ».`])}${P(`Le petit nombre en haut (2 ou 3) s'appelle l'<b>exposant</b> : il compte les facteurs ${T('a')}.`)}`, 'Définitions')}
${cm1Exemple('Exemples :', [T('7^2 = 7 \\times 7 = 49'), T('2^3 = 2 \\times 2 \\times 2 = 8'), T('1{,}5^2 = 1{,}5 \\times 1{,}5 = 2{,}25')])}
${cm1Regle(`Attention : ${T('5^2')} n'est pas ${T('5 \\times 2')} ! ${T('5^2 = 5 \\times 5 = 25')} alors que ${T('5 \\times 2 = 10')}.`, 'Piège')}
${cm1Astuce(`Le carré et le cube viennent de la géométrie : l'<b>aire</b> d'un carré de côté 5 cm est ${T('5^2 = 25')} cm² ; le <b>volume</b> d'un cube d'arête 10 cm est ${T('10^3 = 1\\,000')} cm³, c'est-à-dire 1 L.`)}

${cm1Lecon(2, 'Les carrés à connaître')}
${cm1Tableau(['a', ...Array.from({ length: 13 }, (_, i) => String(i))], [[T('a^2'), ...Array.from({ length: 13 }, (_, i) => String(i * i))]])}
${cm1Regle(`${T('10^3 = 10 \\times 10 \\times 10 = 1\\,000')} : le cube de 10 est mille.`, 'Le cube de 10')}
${cm1Astuce('Les carrés de 0 à 12 s\'appellent aussi les <b>carrés parfaits</b> : 0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. On les retrouve avec les tables de multiplication.')}

${cm1Lecon(3, 'Écrire un nombre comme une puissance')}
${cm1Exemple('On cherche un nombre qui, multiplié par lui-même (2 ou 3 fois), donne le nombre :', [T('49 = 7 \\times 7 = 7^2'), T('125 = 5 \\times 5 \\times 5 = 5^3'), T('64 = 8^2 = 4^3'), T('1\\,000 = 10^3')])}
${cm1Rem('Tous les nombres ne s\'écrivent pas comme un carré d\'entier : 50 est entre 49 = 7² et 64 = 8².')}

${cm1Lecon(4, 'Calculer avec des puissances')}
${cm1Regle(`Dans un calcul sans parenthèses, on calcule d'abord les <b>puissances</b>, puis les multiplications, puis les additions et soustractions.${cm1Liste([T('3 + 2^2 = 3 + 4 = 7'), T('2 \\times 5^2 = 2 \\times 25 = 50'), T('(2 \\times 5)^2 = 10^2 = 100'), T('6^2 - 2^3 = 36 - 8 = 28')])}`, 'Priorités')}
${cm1Exemple(`Calculer ${T('A = 2x^2 + 3')} pour ${T('x = 4')} :`, [T('A = 2 \\times 4^2 + 3'), T('A = 2 \\times 16 + 3'), T('A = 32 + 3'), T('A = 35')])}
${cm1Rem(`${T('2x^2')} veut dire ${T('2 \\times x \\times x')} : la puissance ne porte que sur ${T('x')}, pas sur le 2.`)}

${plusLoin('des exposants plus grands')}
${cm1Def(`On peut multiplier un nombre par lui-même plus de trois fois : ${T('2^4 = 2 \\times 2 \\times 2 \\times 2 = 16')} ; ${T('10^6 = 1\\,000\\,000')} (un million). Ces puissances seront étudiées en 4e.`, 'Puissances d\'exposant 4, 5, 6…')}
`,
  methode: `
${cm1Demo('p5-m-calcul', 'Calculer une expression avec des puissances', 'Calcule B = 4 + 3 × 2³.')}
${cm1Demo('p5-m-ecrire', 'Écrire un nombre sous la forme d\'un carré ou d\'un cube', 'Écris 81 et 27 sous la forme d\'une puissance.')}
`,
  demos: [
    ['p5-m-calcul', [
      { expr: T('B = 4 + 3 \\times 2^3'), note: 'Je repère la puissance : elle se calcule en premier.' },
      { expr: T('B = 4 + 3 \\times 8'), note: T('2^3 = 2 \\times 2 \\times 2 = 8') },
      { expr: T('B = 4 + 24'), note: 'Puis la multiplication.' },
      { expr: T('B = 28'), note: 'Enfin l\'addition.' },
    ]],
    ['p5-m-ecrire', [
      { expr: T('81 = 9 \\times 9'), note: 'Je cherche dans les tables un nombre multiplié par lui-même.' },
      { expr: T('81 = 9^2'), note: '81 est le carré de 9.' },
      { expr: T('27 = 3 \\times 3 \\times 3 = 3^3'), note: '27 est le cube de 3.' },
    ]],
  ],
  exos: cm1Exos('p5-pu', [
    [`Calcule : ${T('6^2')} ; ${T('3^3')} ; ${T('11^2')} ; ${T('10^3')}.`,
      cm1Redac('Les puissances', { suite: [T('6^2 = 36'), T('3^3 = 27'), T('11^2 = 121'), T('10^3 = 1\\,000')] }, 'On multiplie le nombre par lui-même 2 fois (carré) ou 3 fois (cube).')],
    [`Écris sous la forme d'un carré : 64 ; 144 ; 0,25.`,
      cm1Redac('Des carrés', { suite: [T('64 = 8^2'), T('144 = 12^2'), T('0{,}25 = 0{,}5^2')] }, 'Chaque nombre est le produit d\'un nombre par lui-même.')],
    [`Écris sous la forme d'un cube : 8 ; 125 ; 1 000.`,
      cm1Redac('Des cubes', { suite: [T('8 = 2^3'), T('125 = 5^3'), T('1\\,000 = 10^3')] }, 'Chaque nombre est le produit de trois facteurs égaux.')],
    [`Calcule ${T('C = 5 + 4^2')} et ${T('D = (5 + 4)^2')}.`,
      cm1Redac('C et D', [{ nom: 'C', lignes: [T('5 + 16'), T('21')] }, { nom: 'D', lignes: [T('9^2'), T('81')] }], 'Les parenthèses changent le résultat : C = 21 et D = 81.')],
    [`Calcule ${T('E = 3 \\times 2^2 - 2^3')}.`,
      cm1Redac('E', { nom: 'E', lignes: [T('3 \\times 4 - 8'), T('12 - 8'), T('4')] }, 'E = 4.')],
    [`Calcule ${T('x^2 + 2x')} pour ${T('x = 5')}.`,
      cm1Redac('Pour x = 5', { nom: 'A', lignes: [T('5^2 + 2 \\times 5'), T('25 + 10'), T('35')] }, 'Pour x = 5, l\'expression vaut 35.')],
    ['Un carré a une aire de 49 cm². Quelle est la longueur de son côté ?',
      cm1Redac('Côté du carré', T('7^2 = 49'), 'Le côté mesure 7 cm.', carre(7, null, 110))],
    ['Un cube a une arête de 3 cm. Quel est son volume ?',
      cm1Redac('Volume du cube', T('3^3 = 3 \\times 3 \\times 3 = 27'), 'Le volume du cube est 27 cm³.', cube(3, 3, 0, 110))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi « au carré » ?', [
    'Les mathématiciens grecs, comme <b>Euclide</b> (vers 300 av. J.-C.), pensaient les nombres avec des figures : multiplier un nombre par lui-même, c\'était construire un <b>carré</b> de ce côté ; le multiplier encore, c\'était construire un <b>cube</b>. Les noms sont restés !',
    'La notation avec un petit exposant en haut, comme 5², a été popularisée par <b>René Descartes</b> en 1637. Avant lui, on écrivait « 5 × 5 » ou on utilisait des mots.',
  ]),
  quiz: [
    { q: '4² = …', opts: ['16', '8', '42'], correct: 0 },
    { q: '2³ = …', opts: ['8', '6', '9'], correct: 0 },
    { q: '3 + 2² = …', opts: ['7', '25', '10'], correct: 0 },
    { q: '144 = …', opts: ['12²', '14²', '72²'], correct: 0 },
    { q: '10³ = …', opts: ['1 000', '30', '100'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '5² = …', r: ['25', '10', '52', '7'], ok: 0 },
    { l: 1, q: '3³ = …', r: ['27', '9', '6', '33'], ok: 0 },
    { l: 2, q: '9² = …', r: ['81', '18', '99', '72'], ok: 0 },
    { l: 2, q: '12² = …', r: ['144', '24', '122', '124'], ok: 0 },
    { l: 3, q: '121 = …', r: ['11²', '12²', '10²', '60²'], ok: 0 },
    { l: 3, q: '125 = …', r: ['5³', '25²', '3⁵', '12³'], ok: 0 },
    { l: 4, q: '2 × 3² = …', r: ['18', '36', '12', '9'], ok: 0 },
    { l: 4, q: 'x² pour x = 6 : …', r: ['36', '12', '62', '8'], ok: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Décomposer les nombres jusqu'à 10 (CP, N2, période 1)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : décompositions additives des
   nombres jusqu'à 10 (« 7, c'est 5 et 2 »), écriture avec les signes + et =, compléments à 10,
   premiers doubles (calcul mental de la période 1 : tables d'addition, doubles et moitiés).
   Pensé pour être projeté : la maison du nombre et la boîte de dix sont animées.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
// Deux paquets de jetons, rouges et bleus, côte à côte.
function paquets(a, b){
  const P = 30, W = (a + b) * P + 26;
  let s = '';
  for(let i = 0; i < a; i++) s += `<circle cx="${18 + i * P}" cy="22" r="11" fill="${CPC.jeton}" stroke="${CPC.bord}"/>`;
  for(let i = 0; i < b; i++) s += `<circle cx="${28 + (a + i) * P}" cy="22" r="11" fill="${CPC.jeton2}" stroke="${CPC.bord}"/>`;
  return cpSvg(W, 44, s);
}
// Maison d'un nombre : toit avec le nombre, puis les partages (a, n − a).
function maison(n){
  const L = Array.from({ length: n + 1 }, (_, q) => [n - q, q]);
  const toit = cpSvg(128, 48, `<polygon points="2,46 64,3 126,46" fill="#FDE3D2" stroke="${CPC.bord}" stroke-width="2" stroke-linejoin="round"/>` + ce2T(64, 39, n, { t: 21, g: 700 }));
  return `<div class="cpn-maison">${toit}<table>${L.map(([a, b]) => `<tr><td style="color:${CPC.jeton};">${a}</td><td style="color:${CPC.jeton2};">${b}</td></tr>`).join('')}</table></div>`;
}
cm1Chapitre({
  niveau: 'cp', titre: 'Décomposer les nombres jusqu\'à 10', slug: 'decomposer-10',
  cours: `
${cm1Lecon(1, 'Un nombre, plusieurs façons de le faire')}
${cm1Def(`6 jetons, on peut les partager en deux paquets de plusieurs façons :${lig(paquets(4, 2))}<p style="text-align:center;margin:2px 0;">6, c'est <b>4 et 2</b>. On écrit : <b>6 = 4 + 2</b>.</p>${lig(paquets(5, 1))}<p style="text-align:center;margin:2px 0;">6, c'est aussi <b>5 et 1</b> : <b>6 = 5 + 1</b>.</p>`, 'Décomposer')}
${cm1Rem('Le signe <b>+</b> se lit « plus » : on met ensemble. Le signe <b>=</b> se lit « égale » : des deux côtés, il y a autant.')}
${cpAnimMaison('cp-n2-maison', { n: 6 })}
${cm1Regle(`La <b>maison du nombre</b> range toutes les façons de faire ce nombre avec deux paquets.${lig(maison(5), maison(7))}`)}

${cm1Lecon(2, 'Avec les doigts et avec le dé')}
${cm1Regle(`Nos deux mains montrent bien <b>5 et encore…</b>${lig(cpDoigts(7, { px: 150 }), cpDe(7, { cinq: true, c: 50 }))}<p style="text-align:center;margin:4px 0 0;">7 = 5 + 2</p>${lig(cpDoigts(9, { px: 150 }), cpDe(9, { cinq: true, c: 50 }))}<p style="text-align:center;margin:4px 0 0;">9 = 5 + 4</p>`)}
${cpAnimFlash('cp-n2-flash', { n: 8, mode: 'doigts', modes: ['doigts', 'de', 'boite'], legende: 'Montrez un nombre, puis demandez : « Combien sur la première main ? Et sur l\'autre ? »' })}

${cm1Lecon(3, 'Faire 10')}
${cpAnimBoiteDix('cp-n2-dix', { n: 7 })}
${cm1Regle(`Les façons de faire <b>10</b> sont à connaître par cœur :${cm1Liste(['1 + 9 = 10', '2 + 8 = 10', '3 + 7 = 10', '4 + 6 = 10', '5 + 5 = 10'])}`, 'À savoir')}
${cm1Astuce('On peut aussi les dire dans l\'autre sens : 9 + 1, 8 + 2, 7 + 3, 6 + 4. Avec les doigts : on lève 7 doigts, les doigts baissés montrent ce qu\'il manque pour faire 10.')}

${cm1Lecon(4, 'Les doubles')}
${cm1Def(`Le <b>double</b>, c'est deux fois le même nombre : deux paquets pareils.${lig(cpDe(3, { c: 44 }), cpDe(3, { c: 44 }))}<p style="text-align:center;margin:2px 0;">Le double de 3 : <b>3 + 3 = 6</b>.</p>`, 'Doubles')}
${cm1Regle(`Les doubles à connaître :${cm1Liste(['1 + 1 = 2', '2 + 2 = 4', '3 + 3 = 6', '4 + 4 = 8', '5 + 5 = 10'])}`, 'À savoir')}
`,
  methode: `
${cm1Demo('cp-n2-m-dix', 'Trouver ce qu\'il manque pour faire 10', 'J\'ai 6 jetons. Combien m\'en faut-il encore pour en avoir 10 ?')}
${cm1Demo('cp-n2-m-maison', 'Remplir la maison du 4', 'Trouve toutes les façons de faire 4 avec deux paquets.')}
`,
  demos: [
    ['cp-n2-m-dix', [
      { expr: 'Je mets les 6 jetons dans la boîte de dix.', note: 'Une rangée pleine (5), et encore 1.', fig: cpBoiteDix(6, { c: 32 }) },
      { expr: 'Je compte les cases vides : 1, 2, 3, 4.', note: 'Chaque case vide, c\'est un jeton qui manque.', fig: cpBoiteDix(6, { c: 32, vides: [6, 7, 8, 9] }) },
      { expr: '6 + 4 = 10', note: 'Il manque <b>4 jetons</b> pour faire 10.' },
    ]],
    ['cp-n2-m-maison', [
      { expr: '4 = 4 + 0', note: 'Tous les jetons dans le premier paquet, aucun dans l\'autre.', fig: paquets(4, 0) },
      { expr: '4 = 3 + 1', note: 'On en fait passer un dans l\'autre paquet.', fig: paquets(3, 1) },
      { expr: '4 = 2 + 2', note: 'Encore un : deux paquets pareils, c\'est le double de 2.', fig: paquets(2, 2) },
      { expr: '4 = 1 + 3', note: 'Encore un.', fig: paquets(1, 3) },
      { expr: '4 = 0 + 4', note: 'Tous dans le deuxième paquet : la maison du 4 est remplie, il y a <b>5 façons</b>.', fig: maison(4) },
    ]],
  ],
  exos: cm1Exos('cp-n2', [
    [`Combien manque-t-il de jetons pour remplir la boîte ?${lig(cpBoiteDix(6, { c: 34 }))}`,
      cm1Redac('Jetons qui manquent', '6 + 4 = 10', 'Il manque 4 jetons pour faire 10.', cpBoiteDix(6, { c: 22, vides: [6, 7, 8, 9] }))],
    ['Complète la maison du 5 : écris toutes les façons de faire 5.',
      cm1Redac('La maison du 5', { suite: ['5 = 5 + 0', '5 = 4 + 1', '5 = 3 + 2', '5 = 2 + 3', '5 = 1 + 4', '5 = 0 + 5'] }, 'Il y a 6 façons de faire 5 avec deux paquets.', maison(5))],
    ['Tom lève 3 doigts sur une main et 4 doigts sur l\'autre. Combien de doigts lève-t-il ?',
      cm1Redac('Doigts levés', '3 + 4 = 7', 'Tom lève 7 doigts.')],
    ['Dans un sac, il y a 8 billes : 5 sont rouges, les autres sont bleues. Combien y a-t-il de billes bleues ?',
      cm1Redac('Billes bleues', '5 + 3 = 8', 'Il y a 3 billes bleues.', paquets(5, 3))],
    ['Quel est le double de 4 ?',
      cm1Redac('Double de 4', '4 + 4 = 8', 'Le double de 4, c\'est 8.', lig(cpDe(4, { c: 36 }), cpDe(4, { c: 36 })))],
    ['Avec deux dés, trouve trois façons de faire 7.',
      cm1Redac('Faire 7 avec deux dés', { suite: ['6 + 1 = 7', '5 + 2 = 7', '4 + 3 = 7'] }, 'On peut faire 7 avec 6 et 1, avec 5 et 2, ou avec 4 et 3.', lig(cpDe(5, { c: 32 }), cpDe(2, { c: 32 })))],
    ['Léo a 10 images à coller. Il en a déjà collé 7. Combien lui en reste-t-il à coller ?',
      cm1Redac('Images à coller', '7 + 3 = 10', 'Il reste 3 images à coller.', cpBoiteDix(7, { c: 22, vides: [7, 8, 9] }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : compter avec des cailloux', [
    'Il y a plus de 2 000 ans, les <b>Romains</b> comptaient avec de petits cailloux qu\'ils posaient et déplaçaient sur une table à compter : on ajoute un caillou, on en enlève un, on fait des paquets…',
    'En latin, la langue des Romains, un petit caillou se disait <b>calculus</b>. C\'est de ce mot que vient notre mot <b>calcul</b> !',
  ]),
  quiz: [
    { q: `Combien manque-t-il de jetons pour faire 10 ?${lig(cpBoiteDix(8, { c: 30 }))}`, opts: ['1', '2', '3'], correct: 1 },
    { q: '5 + 3 = …', opts: ['7', '8', '9'], correct: 1 },
    { q: 'Le double de 2, c\'est…', opts: ['3', '4', '22'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '6, c\'est 4 et…', r: ['1', '2', '3', '6'], ok: 1 },
    { l: 1, q: '4 + 1 = …', r: ['4', '5', '6', '3'], ok: 1 },
    { l: 2, q: `Combien de doigts ?${lig(cpDoigts(7, { px: 130 }))}`, r: ['6', '7', '8', '5'], ok: 1 },
    { l: 2, q: '5 + 4 = …', r: ['8', '9', '10', '1'], ok: 1 },
    { l: 3, q: '7 + … = 10', r: ['2', '3', '4', '7'], ok: 1 },
    { l: 3, q: `Combien manque-t-il pour faire 10 ?${lig(cpBoiteDix(4, { c: 26 }))}`, r: ['5', '6', '4', '7'], ok: 1 },
    { l: 3, q: '9 + … = 10', r: ['0', '1', '2', '9'], ok: 1 },
    { l: 4, q: '3 + 3 = …', r: ['5', '6', '7', '33'], ok: 1 },
    { l: 4, q: 'Le double de 5, c\'est…', r: ['10', '55', '6', '15'], ok: 0 },
  ],
});
})();

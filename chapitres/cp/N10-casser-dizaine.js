/* ============================================================
   CHAPITRE : Soustraire en cassant une dizaine (CP, N10, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : soustraire un nombre à un
   chiffre à un nombre à deux chiffres ; quand il n'y a pas assez d'unités, échanger une dizaine
   contre dix unités (« casser une dizaine ») ; calculer aussi en passant par la dizaine
   (42 − 7 : 42 − 2, puis 40 − 5) ; problèmes de retrait.
   Pensé pour être projeté : la barre de dix qui se casse en dix cubes.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Barres de dix et cubes, une barre « cassée » montrée en cubes clairs ; les b derniers cubes barrés.
function casse(d, u, b){
  const q = 11; let s = '';
  for(let i = 0; i < d; i++) for(let j = 0; j < 10; j++) s += `<rect x="${3 + i * (q + 6)}" y="${3 + j * q}" width="${q}" height="${q}" fill="${CE2C.vert}" stroke="#14583A" stroke-width="1"/>`;
  const x0 = 3 + d * (q + 6) + 10;
  for(let j = 0; j < u; j++){ const x = x0 + Math.floor(j / 5) * (q + 4), y = 3 + 10 * q - (j % 5 + 1) * (q + 2), barre = j >= u - b;
    s += `<rect x="${x}" y="${y}" width="${q}" height="${q}" fill="${CPC.jeton2}" stroke="${CPC.bord}" stroke-width="1" opacity="${barre ? .4 : 1}"/>` + (barre ? `<path d="M${x} ${y + q} L${x + q} ${y}" stroke="${CE2C.rouge}" stroke-width="1.8"/>` : ''); }
  return cpSvg(x0 + Math.ceil(u / 5) * (q + 4) + 4, 10 * q + 6, s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Soustraire en cassant une dizaine', slug: 'casser-dizaine',
  cours: `
${cm1Lecon(1, 'Quand il y a assez d\'unités')}
${cm1Def(`${lig(casse(4, 8, 5))}${P('48 − 5 : on enlève 5 cubes seuls. Il reste 4 barres et 3 cubes. <b>48 − 5 = 43</b>.')}`, 'Enlever des unités')}

${cm1Lecon(2, 'Quand il n\'y a pas assez d\'unités')}
${cpAnimCasser('cp-n10-casser', { presets: [[42, 7], [53, 8], [31, 4], [60, 3], [45, 17]] })}
${cm1Regle(`Pour 42 − 7, il n'y a que 2 cubes seuls : on <b>casse une dizaine</b>, c'est-à-dire qu'on échange une barre contre 10 cubes.${lig(casse(4, 2, 0), '<b style="font-size:1.5rem;">→</b>', casse(3, 12, 0))}${P('4 dizaines et 2 unités = 3 dizaines et 12 unités. C\'est toujours 42 !')}${lig(casse(3, 12, 7))}${P('On enlève 7 cubes : il reste 3 dizaines et 5 unités. <b>42 − 7 = 35</b>.')}`, 'Casser une dizaine')}
${cm1Rem('Au tableau : avec des bûchettes, on enlève l\'élastique d\'un paquet de dix. Avec la monnaie, on fait de la monnaie : on échange un billet de 10 € contre dix pièces de 1 €.')}

${cm1Lecon(3, 'Passer par la dizaine')}
${cm1Regle(`On peut aussi reculer en deux fois : d'abord jusqu'à la dizaine, puis le reste.${lig(cpSautsBande(42, -7, { de: 33, a: 43 }))}${cm1Liste(['42 − 2 = 40', '40 − 5 = 35'])}${P('7, c\'est 2 et 5. Donc <b>42 − 7 = 35</b>.')}`, 'Autre façon')}
${cm1Astuce('Pour reculer jusqu\'à la dizaine, on enlève le chiffre des unités : 42 − 2 = 40.')}

${cm1Lecon(4, 'Problèmes')}
${cm1Exemple('Exemple', [`<b>Problème :</b> Zoé a 31 perles. Elle en perd 6. Combien lui en reste-t-il ?${cm1Redac('Perles qui restent', { suite: ['31 − 1 = 30', '30 − 5 = 25'] }, 'Il reste 25 perles à Zoé.')}`])}
`,
  methode: `
${cm1Demo('cp-n10-m-casser', 'Calculer 53 − 8 en cassant une dizaine', 'Il n\'y a que 3 unités : comment enlever 8 ?')}
${cm1Demo('cp-n10-m-dizaine', 'Calculer 64 − 9 en passant par 60', 'Recule de 9 à partir de 64.')}
`,
  demos: [
    ['cp-n10-m-casser', [
      { expr: '53 = 5 dizaines et 3 unités', note: 'Je ne peux pas enlever 8 unités : il n\'y en a que 3.', fig: casse(5, 3, 0) },
      { expr: '53 = 4 dizaines et 13 unités', note: 'Je casse une dizaine : 10 unités de plus.', fig: casse(4, 13, 0) },
      { expr: '13 − 8 = 5', note: 'J\'enlève 8 unités.', fig: casse(4, 13, 8) },
      { expr: '53 − 8 = 45', note: 'Il reste 4 dizaines et 5 unités.' },
    ]],
    ['cp-n10-m-dizaine', [
      { expr: '9 = 4 + 5', note: '4 pour arriver à 60, 5 pour continuer.' },
      { expr: '64 − 4 = 60', note: 'Je recule jusqu\'à la dizaine.' },
      { expr: '60 − 5 = 55', note: 'Je recule encore de 5.', fig: cpSautsBande(64, -9, { de: 54, a: 65, px: 330 }) },
      { expr: '64 − 9 = 55', note: 'Le résultat.' },
    ]],
  ],
  exos: cm1Exos('cp-n10', [
    ['Calcule : 37 − 4.',
      cm1Redac('37 − 4', '37 − 4 = 33', 'Il y a assez d\'unités : 7 − 4 = 3, donc 37 − 4 = 33.')],
    ['Calcule : 32 − 5.',
      cm1Redac('32 − 5', { suite: ['32 − 2 = 30', '30 − 3 = 27'] }, '32 − 5 = 27.', cpSautsBande(32, -5, { de: 26, a: 33, px: 240 }))],
    ['Calcule : 41 − 6 en cassant une dizaine.',
      cm1Redac('41 − 6', { suite: ['41 = 3 dizaines et 11 unités', '11 − 6 = 5'] }, 'Il reste 3 dizaines et 5 unités : 41 − 6 = 35.', casse(3, 11, 6))],
    ['Calcule : 70 − 4.',
      cm1Redac('70 − 4', '70 − 4 = 66', 'Il n\'y a aucune unité : on casse une dizaine (6 dizaines et 10 unités), on enlève 4 : 66.', casse(6, 10, 4))],
    ['Calcule : 56 − 9.',
      cm1Redac('56 − 9', { suite: ['56 − 6 = 50', '50 − 3 = 47'] }, '56 − 9 = 47.')],
    ['Dans un sac, il y a 43 billes. Lucas en prend 8. Combien en reste-t-il dans le sac ?',
      cm1Redac('Billes qui restent', { suite: ['43 − 3 = 40', '40 − 5 = 35'] }, 'Il reste 35 billes dans le sac.')],
    ['Mamie a 25 €. Elle achète un livre à 7 €. Combien lui reste-t-il ?',
      cm1Redac('Argent de mamie', { suite: ['25 − 5 = 20', '20 − 2 = 18'] }, 'Il reste 18 € à mamie.', cpArgent([10, 5, 1, 1, 1], { px: 260 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : faire de la monnaie', [
    'Casser une dizaine, c\'est ce que font les commerçants depuis toujours quand ils « <b>font de la monnaie</b> » : on échange un billet contre plusieurs pièces qui valent autant.',
    'Au Moyen Âge, les <b>changeurs</b> s\'installaient sur des ponts, à Paris, pour échanger les pièces des voyageurs. Le <b>pont au Change</b> porte encore leur nom.',
  ]),
  quiz: [
    { q: '46 − 3 = …', opts: ['43', '49', '16'], correct: 0 },
    { q: '52 − 6 = …', opts: ['46', '56', '44'], correct: 0 },
    { q: 'Casser une dizaine, c\'est échanger une barre de dix contre…', opts: ['10 cubes', '1 cube', '100 cubes'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '29 − 5 = …', r: ['24', '34', '25', '14'], ok: 0 },
    { l: 1, q: '68 − 6 = …', r: ['62', '60', '74', '8'], ok: 1 },
    { l: 2, q: '31 = 2 dizaines et … unités', r: ['1', '11', '21', '3'], ok: 1 },
    { l: 2, q: '24 − 7 = …', r: ['17', '13', '31', '27'], ok: 0 },
    { l: 3, q: '40 − 3 = …', r: ['37', '43', '30', '33'], ok: 0 },
    { l: 3, q: '35 − 8 = …', r: ['27', '33', '43', '23'], ok: 0 },
    { l: 3, q: '72 − 5 = …', r: ['67', '77', '63', '65'], ok: 0 },
    { l: 4, q: 'J\'ai 20 bonbons, j\'en mange 4. Il en reste…', r: ['16', '24', '14', '6'], ok: 0 },
  ],
});
})();

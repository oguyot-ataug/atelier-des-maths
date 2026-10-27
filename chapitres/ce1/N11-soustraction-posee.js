/* ============================================================
   CHAPITRE : La soustraction posée (CE1, N11, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : poser et calculer des
   soustractions de nombres de deux ou trois chiffres ; quand le chiffre du haut est trop petit,
   casser une dizaine (ou une centaine) : 1 dizaine = 10 unités, dans la continuité du CP ; vérifier
   par une addition ; résoudre des problèmes. (Le site présente au CE2 la technique par compensation :
   chaque école choisit sa technique et la garde.)
   Pensé pour être projeté : la soustraction qui se déroule colonne par colonne, avec le cassage.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const add = (a, b, r) => cm1Posee([[' ', String(a)], ['+', String(b)], [' ', String(a + b)]], r);

cm1Chapitre({
  niveau: 'ce1', titre: 'La soustraction posée', slug: 'soustraction-posee',
  cours: `
${cm1Lecon(1, 'Sans cassage')}
${cm1Regle(`On pose le plus grand nombre en haut, les unités sous les unités, et on commence par la droite.${lig(ce1Sous(587, 243))}${cm1Liste(['unités : 7 − 3 = 4 ;', 'dizaines : 8 − 4 = 4 ;', 'centaines : 5 − 2 = 3.'])}`, 'Poser')}

${cm1Lecon(2, 'En cassant une dizaine')}
${ce1AnimSoustraction('ce1-n11-sous', { presets: [[52, 17], [345, 128], [432, 178], [614, 352]] })}
${cm1Regle(`52 − 17 : dans les unités, 2 − 7, impossible ! On casse une dizaine :${cm1Liste(['5 dizaines deviennent 4 dizaines ;', 'les 2 unités deviennent 12 unités ;', 'unités : 12 − 7 = 5 ;', 'dizaines : 4 − 1 = 3.'])}${lig(ce1Sous(52, 17))}${P('<b>52 − 17 = 35</b>')}`, 'Casser une dizaine')}
${cm1Def(`${lig(cpBarres(52, { q: 8 }), '<b style="font-size:1.3rem;">→</b>', cpBarres(42, { q: 8 }), '<b>+ 10 cubes</b>')}${P('C\'est toujours 52 : 4 dizaines et 12 unités.')}`, 'Avec les cubes')}

${cm1Lecon(3, 'Casser une centaine')}
${cm1Regle(`614 − 352 : dans les dizaines, 1 − 5, impossible ! On casse une centaine : 6 centaines deviennent 5, et 1 dizaine devient 11 dizaines.${lig(ce1Sous(614, 352))}${cm1Liste(['unités : 4 − 2 = 2 ;', 'dizaines : 11 − 5 = 6 ;', 'centaines : 5 − 3 = 2.'])}`, '1 centaine = 10 dizaines')}

${cm1Lecon(4, 'Vérifier par une addition')}
${cm1Regle(`Si 52 − 17 = 35, alors 35 + 17 doit redonner 52.<div class="figure-wrap" style="text-align:center;">${add(35, 17, '1 ')}</div>`, 'La preuve')}
${cm1Rem('Au tableau : faire manipuler les barres et les cubes en même temps que l\'on pose, pour que « casser une dizaine » ait un sens.')}
`,
  methode: `
${cm1Demo('ce1-n11-m-poser', 'Poser et calculer 73 − 28', 'Pose la soustraction et calcule.')}
${cm1Demo('ce1-n11-m-pb', 'Un problème de soustraction', 'Un livre a 254 pages. Lina en a lu 127. Combien de pages lui reste-t-il ?')}
`,
  demos: [
    ['ce1-n11-m-poser', [
      { expr: 'Unités : 3 − 8, impossible.', note: 'Je casse une dizaine : 7 dizaines deviennent 6, 3 unités deviennent 13.' },
      { expr: '13 − 8 = 5', note: 'J\'écris 5 aux unités.' },
      { expr: '6 − 2 = 4', note: 'J\'écris 4 aux dizaines.', fig: ce1Sous(73, 28, 150) },
      { expr: '73 − 28 = 45', note: 'Je vérifie : 45 + 28 = 73.' },
    ]],
    ['ce1-n11-m-pb', [
      { expr: 'Ce qui reste : 254 − 127', note: 'On enlève les pages lues.' },
      { expr: 'Unités : 4 − 7, je casse une dizaine.', note: '14 − 7 = 7 ; il reste 4 dizaines.', fig: ce1Sous(254, 127, 160) },
      { expr: '254 − 127 = 127', note: 'Dizaines : 4 − 2 = 2. Centaines : 2 − 1 = 1.' },
      { expr: 'Il reste 127 pages à lire.', note: 'Vérification : 127 + 127 = 254.' },
    ]],
  ],
  exos: cm1Exos('ce1-n11', [
    ['Pose et calcule : 896 − 452.',
      cm1Redac('896 − 452', { pose: ce1Sous(896, 452, 150) }, '896 − 452 = 444.')],
    ['Pose et calcule : 64 − 38.',
      cm1Redac('64 − 38', { pose: ce1Sous(64, 38, 130) }, 'Je casse une dizaine : 64 − 38 = 26.')],
    ['Pose et calcule : 541 − 225.',
      cm1Redac('541 − 225', { pose: ce1Sous(541, 225, 150) }, '541 − 225 = 316.')],
    ['Pose et calcule : 725 − 263.',
      cm1Redac('725 − 263', { pose: ce1Sous(725, 263, 150) }, 'Je casse une centaine : 725 − 263 = 462.')],
    ['Vérifie par une addition : 81 − 46 = 35.',
      cm1Redac('La preuve', { pose: add(35, 46, '1 ') }, '35 + 46 = 81 : le calcul était juste.')],
    ['Dans un car de 52 places, 37 places sont occupées. Combien de places sont libres ?',
      cm1Redac('Places libres', { pose: ce1Sous(52, 37, 130) }, 'Il reste 15 places libres.')],
    ['Une école avait 465 livres. Elle en a donné 128. Combien lui en reste-t-il ?',
      cm1Redac('Livres de l\'école', { pose: ce1Sous(465, 128, 150) }, 'Il reste 337 livres à l\'école.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : emprunter, casser, compenser', [
    'Il existe plusieurs façons de poser une soustraction ! En France, on « casse une dizaine » ou on « compense » (on ajoute 10 en haut et 1 en bas). Dans d\'autres pays, on fait autrement encore.',
    'Toutes ces techniques donnent le même résultat : ce qui compte, c\'est de comprendre pourquoi elles marchent. Les élèves d\'autrefois faisaient même leurs soustractions sur des ardoises, avec une craie !',
  ]),
  quiz: [
    { q: '75 − 32 = …', opts: ['43', '47', '107'], correct: 0 },
    { q: 'Dans 43 − 18, aux unités : 3 − 8 est impossible. On…', opts: ['casse une dizaine', 'écrit 0', 'fait 8 − 3'], correct: 0 },
    { q: '62 − 27 = …', opts: ['35', '45', '89'], correct: 0 },
  ],
  flash: [
    { l: 1, q: '86 − 24 = …', r: ['62', '110', '64', '52'], ok: 0 },
    { l: 1, q: '375 − 150 = …', r: ['225', '525', '235', '215'], ok: 0 },
    { l: 2, q: '1 dizaine = … unités', r: ['10', '1', '100', '11'], ok: 0 },
    { l: 2, q: '41 − 6 = …', r: ['35', '45', '47', '25'], ok: 0 },
    { l: 3, q: '1 centaine = … dizaines', r: ['10', '100', '1', '1 000'], ok: 0 },
    { l: 4, q: 'Pour vérifier 50 − 18 = 32, je calcule…', r: ['32 + 18', '50 + 18', '32 − 18', '50 + 32'], ok: 0 },
  ],
});
})();

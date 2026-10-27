/* ============================================================
   CHAPITRE : Doubles, moitiés et compléments à 10 (CP, N7, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, calcul mental : connaître les
   doubles des nombres jusqu'à 10 et les moitiés des nombres pairs jusqu'à 20, les compléments à
   10, et s'en servir pour calculer (presque-doubles : 6 + 7 = 6 + 6 + 1).
   Pensé pour être projeté : le miroir du double, le partage en deux, la boîte de dix.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Deux mains (ou deux dés) pareilles : un double.
const doubleDes = n => lig(cpDe(n, { c: 40, cinq: true }), cpDe(n, { c: 40, cinq: true }));

cm1Chapitre({
  niveau: 'cp', titre: 'Doubles, moitiés et compléments à 10', slug: 'doubles-moities',
  cours: `
${cm1Lecon(1, 'Les doubles')}
${cpAnimDouble('cp-n7-double', { mode: 'double', n: 4 })}
${cm1Def(`Le <b>double</b> d'un nombre, c'est ce nombre <b>deux fois</b>.${doubleDes(3)}${P('Le double de 3, c\'est <b>3 + 3 = 6</b>.')}`, 'Le double')}
${cm1Regle(`Les doubles à savoir par cœur :${cm1Liste(['1 + 1 = 2', '2 + 2 = 4', '3 + 3 = 6', '4 + 4 = 8', '5 + 5 = 10', '6 + 6 = 12', '7 + 7 = 14', '8 + 8 = 16', '9 + 9 = 18', '10 + 10 = 20'])}`, 'À savoir')}
${cm1Astuce('Avec les doigts : 5 + 5, ce sont les deux mains. 6 + 6 = 10 + 2 : deux mains et encore 1 + 1.')}

${cm1Lecon(2, 'Les moitiés')}
${cpAnimDouble('cp-n7-moitie', { mode: 'moitie', n: 6, legende: 'On partage un par un, comme quand on distribue des cartes : les deux parts doivent être pareilles.' })}
${cm1Def(`La <b>moitié</b> d'un nombre, c'est quand on le partage en <b>deux parts égales</b>.${lig(cpJetons(5, 0, Array(5).fill(CPC.jeton)), cpJetons(5, 0, Array(5).fill(CPC.jeton2)))}${P('La moitié de 10, c\'est <b>5</b>, car 5 + 5 = 10.')}`, 'La moitié')}
${cm1Regle('Doubles et moitiés vont ensemble : le double de 7 est 14, donc la moitié de 14 est 7.')}
${cm1Rem('On ne peut pas partager 7 jetons en deux parts égales sans couper un jeton : il en reste toujours un. Au CP, on cherche les moitiés de 2, 4, 6, 8, 10, 12, 14, 16, 18 et 20.')}

${cm1Lecon(3, 'Les compléments à 10')}
${cpAnimBoiteDix('cp-n7-dix', { n: 6 })}
${cm1Regle(`Pour aller à 10 :${cm1Liste(['1 + 9 = 10', '2 + 8 = 10', '3 + 7 = 10', '4 + 6 = 10', '5 + 5 = 10'])}`, 'À savoir')}
${cm1Exemple('Ce qu\'il manque pour aller à 10 :', ['7 + … = 10 : il manque 3.', '2 + … = 10 : il manque 8.'])}

${cm1Lecon(4, 'Calculer avec les doubles')}
${cm1Regle(`Un <b>presque-double</b> : 6 + 7, c'est le double de 6 et encore 1.${lig(cpJetons(13, 0, Array(6).fill(CPC.jeton).concat(Array(6).fill(CPC.jeton2), [CE2C.vert])))}${cm1Liste(['6 + 6 = 12', '12 + 1 = 13'])}${P('Donc <b>6 + 7 = 13</b>.')}`, 'Astuce de calcul')}
${cm1Exemple('D\'autres presque-doubles :', ['4 + 5 : je pense à 4 + 4 = 8, et encore 1 : 9.', '8 + 9 : je pense à 8 + 8 = 16, et encore 1 : 17.'])}
`,
  methode: `
${cm1Demo('cp-n7-m-moitie', 'Trouver la moitié de 16', 'Partage 16 bonbons en deux parts égales.')}
${cm1Demo('cp-n7-m-presque', 'Calculer 7 + 8', 'Utilise un double que tu connais.')}
`,
  demos: [
    ['cp-n7-m-moitie', [
      { expr: 'Je cherche un double qui fait 16.', note: 'Quel nombre ajouté à lui-même donne 16 ?' },
      { expr: '8 + 8 = 16', note: 'Je connais ce double par cœur.', fig: lig(cpJetons(8, 0, Array(8).fill(CPC.jeton)), cpJetons(8, 0, Array(8).fill(CPC.jeton2))) },
      { expr: 'La moitié de 16, c\'est 8.', note: 'Chaque part a 8 bonbons.' },
    ]],
    ['cp-n7-m-presque', [
      { expr: '7 + 8, c\'est presque 7 + 7.', note: '8, c\'est 7 et encore 1.' },
      { expr: '7 + 7 = 14', note: 'Le double de 7.' },
      { expr: '14 + 1 = 15', note: 'J\'ajoute le 1 qui restait : <b>7 + 8 = 15</b>.', fig: cpJetons(15, 0, Array(7).fill(CPC.jeton).concat(Array(7).fill(CPC.jeton2), [CE2C.vert])) },
    ]],
  ],
  exos: cm1Exos('cp-n7', [
    ['Quel est le double de 9 ?',
      cm1Redac('Double de 9', '9 + 9 = 18', 'Le double de 9, c\'est 18.')],
    ['Quelle est la moitié de 12 ?',
      cm1Redac('Moitié de 12', '6 + 6 = 12', 'La moitié de 12, c\'est 6.', lig(cpJetons(6, 0, Array(6).fill(CPC.jeton)), cpJetons(6, 0, Array(6).fill(CPC.jeton2))))],
    ['Complète : 4 + … = 10.',
      cm1Redac('Complément à 10', '4 + 6 = 10', 'Il manque 6 pour aller à 10.', cpBoiteDix(4, { c: 22, vides: [4, 5, 6, 7, 8, 9] }))],
    ['Tom a 7 billes. Sa sœur en a deux fois plus : le double. Combien de billes a sa sœur ?',
      cm1Redac('Billes de la sœur', '7 + 7 = 14', 'La sœur de Tom a 14 billes.')],
    ['Partage 20 images entre deux enfants, pour qu\'ils en aient autant chacun.',
      cm1Redac('Partage des images', '10 + 10 = 20', 'Chaque enfant a 10 images : c\'est la moitié de 20.')],
    ['Calcule 5 + 6 avec un double.',
      cm1Redac('5 + 6', { suite: ['5 + 5 = 10', '10 + 1 = 11'] }, '5 + 6 = 11 : c\'est le double de 5, et encore 1.')],
    ['Dans une boîte de 10 crayons, il en reste 3. Combien de crayons ont été pris ?',
      cm1Redac('Crayons pris', '3 + 7 = 10', '7 crayons ont été pris.', cpBoiteDix(3, { c: 22, vides: [3, 4, 5, 6, 7, 8, 9] }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : multiplier en doublant', [
    'Il y a près de 4 000 ans, les <b>scribes égyptiens</b> calculaient beaucoup avec les <b>doubles</b>. Pour trouver 12 paquets de 5 pains, ils doublaient et redoublaient : 5, 10, 20, 40… puis ils ajoutaient les bons morceaux.',
    'On connaît leurs calculs grâce à un très long rouleau de papyrus, le <b>papyrus Rhind</b>, gardé aujourd\'hui dans un musée à Londres.',
  ]),
  quiz: [
    { q: 'Le double de 6, c\'est…', opts: ['8', '12', '66'], correct: 1 },
    { q: 'La moitié de 8, c\'est…', opts: ['4', '16', '3'], correct: 0 },
    { q: '3 + … = 10', opts: ['6', '7', '13'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '4 + 4 = …', r: ['8', '6', '9', '44'], ok: 0 },
    { l: 1, q: 'Le double de 10, c\'est…', r: ['20', '100', '11', '12'], ok: 0 },
    { l: 1, q: '8 + 8 = …', r: ['14', '16', '18', '88'], ok: 1 },
    { l: 2, q: 'La moitié de 6, c\'est…', r: ['2', '3', '12', '4'], ok: 1 },
    { l: 2, q: 'La moitié de 18, c\'est…', r: ['8', '9', '36', '10'], ok: 1 },
    { l: 3, q: '6 + … = 10', r: ['3', '4', '5', '16'], ok: 1 },
    { l: 3, q: '1 + … = 10', r: ['8', '9', '11', '10'], ok: 1 },
    { l: 4, q: '5 + 6 = …', r: ['10', '11', '12', '56'], ok: 1 },
    { l: 4, q: '8 + 9 = …', r: ['16', '17', '18', '89'], ok: 1 },
  ],
});
})();

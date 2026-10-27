/* ============================================================
   CHAPITRE : Mesurer avec la règle (CP, M4, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, grandeurs et mesures : le
   centimètre, unité de longueur commune à tous ; mesurer un segment ou un objet avec une règle
   graduée (placer le 0 au début) ; tracer un trait d'une longueur donnée ; comparer des longueurs
   mesurées ; le mètre pour les grandes longueurs (1 m = 100 cm).
   Pensé pour être projeté : la règle qui se pose sous le trait, et le piège du 0 oublié.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Un trait seul, de n centimètres (à l'échelle de la règle), avec son nom.
const trait = (n, nom, c) => cpSvg(n * 30 + 70, 30, `<line x1="10" y1="15" x2="${10 + n * 30}" y2="15" stroke="${c || CE2C.encre}" stroke-width="4" stroke-linecap="round"/>` + (nom ? ce2T(n * 30 + 22, 20, nom, { t: 14, g: 700, a: 'start', c: c || CE2C.encre }) : ''));

cm1Chapitre({
  niveau: 'cp', titre: 'Mesurer avec la règle', slug: 'mesurer-regle',
  cours: `
${cm1Lecon(1, 'Le centimètre')}
${cm1Def(`Pour que tout le monde trouve la même mesure, on utilise une unité commune : le <b>centimètre</b>. On écrit <b>cm</b>.${lig(cpRegle(10, { K: 36 }))}${P('Entre deux traits qui se suivent sur la règle, il y a <b>1 cm</b>.')}`, 'L\'unité')}
${cm1Rem('Au tableau : faire mesurer un même objet avec des trombones, puis avec des mains, puis avec la règle. Seule la règle donne la même mesure à tous.')}

${cm1Lecon(2, 'Mesurer avec une règle')}
${cpAnimMesurer('cp-m4-mesurer', { presets: [{ nom: 'Trait de 7 cm', cm: 7 }, { nom: 'Trait de 5 cm', cm: 5 }, { nom: 'Le piège : partir du 1', cm: 6, de: 1 }] })}
${cm1Regle(`Pour mesurer :${cm1Liste(['je place le <b>0</b> de la règle au début du trait ;', 'je lis le nombre en face de l\'<b>autre bout</b>.'])}${lig(cpRegle(8, { seg: 6, K: 36 }))}${P('Le trait mesure <b>6 cm</b>.')}`, 'Mesurer')}
${cm1Astuce('Le 0 n\'est pas toujours tout au bord de la règle : il faut bien le chercher !')}

${cm1Lecon(3, 'Tracer un trait')}
${cm1Regle(`Pour tracer un trait de 4 cm :${cm1Liste(['je fais un point en face du 0 ;', 'je fais un point en face du 4 ;', 'je relie les deux points en suivant la règle, sans qu\'elle bouge.'])}${lig(cpRegle(6, { seg: 4, K: 36 }))}`, 'Tracer')}

${cm1Lecon(4, 'Le mètre')}
${cm1Def('Pour les grandes longueurs (la classe, un couloir), on utilise le <b>mètre</b> : <b>1 m = 100 cm</b>. Une grande règle de tableau mesure souvent 1 m.', 'Le mètre')}
${cm1Rem('Un enfant de CP mesure environ 1 m et 20 cm. Une porte mesure environ 2 m de haut.')}
`,
  methode: `
${cm1Demo('cp-m4-m-mesurer', 'Mesurer un crayon', 'Combien mesure ce crayon ?')}
${cm1Demo('cp-m4-m-comparer', 'Comparer deux traits mesurés', 'Le trait bleu mesure 8 cm, le trait rouge 5 cm. Combien de plus mesure le bleu ?')}
`,
  demos: [
    ['cp-m4-m-mesurer', [
      { expr: 'Je place le 0 au bout du crayon.', note: 'Bien en face, sans décaler.', fig: cpSvg(400, 80, cpRegleSvg(20, 36, 10, 36) + cpCrayon(20, 18, 9 * 36, '#E9C46A'), 320) },
      { expr: 'Je lis en face de la pointe : 9.', note: 'La pointe est en face du 9.' },
      { expr: 'Le crayon mesure 9 cm.', note: 'Neuf centimètres.' },
    ]],
    ['cp-m4-m-comparer', [
      { expr: '8 &gt; 5', note: 'Le bleu est plus long.', fig: lig(trait(8, 'bleu', '#2EA8C9'), trait(5, 'rouge', '#E35D3A')) },
      { expr: '5 + 3 = 8', note: 'Du 5 au 8, il manque 3.' },
      { expr: 'Le trait bleu mesure 3 cm de plus.', note: 'La phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('cp-m4', [
    [`Combien mesure ce trait ?${lig(cpRegle(9, { seg: 8, K: 32 }))}`,
      cm1Redac('Longueur du trait', '', 'Le 0 est au début du trait et l\'autre bout est en face du 8 : le trait mesure 8 cm.')],
    [`Combien mesure ce trait ?${lig(cpRegle(9, { seg: 3, K: 32 }))}`,
      cm1Redac('Longueur du trait', '', 'Le trait mesure 3 cm.')],
    [`Malo a mal placé sa règle. Combien mesure le trait ?${lig(cpRegle(9, { seg: 5, de: 2, K: 32 }))}`,
      cm1Redac('Longueur du trait', '7 − 2 = 5', 'Le trait va du 2 au 7 : il mesure 5 cm. Il fallait mettre le 0 au début !')],
    ['Trace un trait de 6 cm.',
      cm1Redac('Un trait de 6 cm', '', 'Un point en face du 0, un point en face du 6, puis je relie les deux points le long de la règle.', cpRegle(7, { seg: 6, K: 28 }))],
    ['Le trait vert mesure 9 cm. Le trait jaune mesure 6 cm. Lequel est le plus long ? De combien ?',
      cm1Redac('Comparer', { suite: ['9 &gt; 6', '6 + 3 = 9'] }, 'Le trait vert est le plus long, de 3 cm.')],
    ['Un crayon mesure 12 cm. On le taille, il perd 2 cm. Combien mesure-t-il maintenant ?',
      cm1Redac('Le crayon taillé', '12 − 2 = 10', 'Le crayon mesure 10 cm.')],
    ['Une table mesure 1 m de long. Combien de centimètres cela fait-il ?',
      cm1Redac('La table', '1 m = 100 cm', 'La table mesure 100 cm.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le mètre en métal', [
    'Quand le mètre a été inventé, à la fin du XVIII<sup>e</sup> siècle, des savants ont mesuré pendant des années la distance entre Dunkerque et Barcelone pour le calculer très précisément !',
    'En 1799, on a fabriqué une barre de métal de 1 mètre exactement, rangée à Paris : le « mètre étalon ». Tout le monde pouvait venir comparer ses règles avec elle.',
  ]),
  quiz: [
    { q: 'Pour mesurer, on place au début du trait…', opts: ['le 1', 'le 0', 'le bout de la règle'], correct: 1 },
    { q: 'Le centimètre s\'écrit…', opts: ['cm', 'm', 'kg'], correct: 0 },
    { q: '1 m, c\'est…', opts: ['10 cm', '100 cm', '1 cm'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'L\'unité de la règle de l\'école, c\'est…', r: ['le centimètre', 'le litre', 'l\'euro', 'l\'heure'], ok: 0 },
    { l: 2, q: `Combien mesure le trait ?${lig(cpRegle(7, { seg: 4, K: 28 }))}`, r: ['3 cm', '4 cm', '5 cm', '7 cm'], ok: 1 },
    { l: 2, q: 'Un trait va du 0 au 9. Il mesure…', r: ['8 cm', '9 cm', '10 cm', '0 cm'], ok: 1 },
    { l: 3, q: 'Pour tracer 5 cm, je relie le 0 et…', r: ['le 4', 'le 5', 'le 6', 'le 10'], ok: 1 },
    { l: 4, q: 'Pour mesurer la cour, on utilise…', r: ['le mètre', 'le centimètre', 'l\'euro', 'la minute'], ok: 0 },
  ],
});
})();

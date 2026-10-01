/* ============================================================
   CHAPITRE : Points, droites, segments (CE2, G1, période 1)
   Programme du cycle 2 (CE2), géométrie plane : vocabulaire point, droite, segment, milieu d'un
   segment ; tracer à la règle ; points alignés ; reproduire une figure sur papier quadrillé.
   Les notations sont toujours expliquées par des mots (« le segment qui va de A à B »).
   ============================================================ */
(() => {
const T = 'stroke="#1F3A5C" stroke-width="2"';
const croix = (x, y, nom, dx, dy) => `<path d="M${x - 4} ${y - 4} L${x + 4} ${y + 4} M${x - 4} ${y + 4} L${x + 4} ${y - 4}" stroke="#E35D3A" stroke-width="2"/><text x="${x + (dx ?? 6)}" y="${y + (dy ?? -6)}" font-size="15" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">${nom}</text>`;
const svg = (w, h, c) => `<svg viewBox="0 0 ${w} ${h}" style="width:100%;max-width:${w}px;display:block;margin:6px auto;">${c}</svg>`;
const TROIS = svg(560, 110,
  // point
  croix(60, 55, 'A') + `<text x="60" y="100" font-size="13" text-anchor="middle" fill="#5B6472">un point A</text>`
  // segment
  + `<line x1="150" y1="60" x2="290" y2="40" ${T}/>` + croix(150, 60, 'B', -16, -6) + croix(290, 40, 'C') + `<text x="220" y="100" font-size="13" text-anchor="middle" fill="#5B6472">le segment [BC]</text>`
  // droite
  + `<line x1="340" y1="75" x2="550" y2="30" ${T}/>` + croix(390, 64, 'D', -4, 18) + croix(490, 43, 'E', -4, 18) + `<text x="450" y="100" font-size="13" text-anchor="middle" fill="#5B6472">la droite (DE)</text>`);
const MILIEU = svg(400, 90, `<line x1="40" y1="45" x2="360" y2="45" ${T}/>` + croix(40, 45, 'A', -6, -10) + croix(360, 45, 'B', -6, -10) + croix(200, 45, 'I', -6, -10)
  + `<path d="M115 39 L125 51 M275 39 L285 51" stroke="#2E9C6A" stroke-width="2"/><text x="120" y="75" font-size="13" text-anchor="middle" fill="#2E9C6A">5 cm</text><text x="280" y="75" font-size="13" text-anchor="middle" fill="#2E9C6A">5 cm</text>`);
const ALIGNES = svg(420, 120, `<line x1="20" y1="100" x2="400" y2="20" stroke="#2EA8C9" stroke-width="1.5" stroke-dasharray="6 4"/>` + croix(70, 90, 'M') + croix(200, 62, 'N') + croix(330, 35, 'P') + croix(250, 100, 'R'));
cm1Chapitre({
  niveau: 'ce2', titre: 'Points, droites, segments', slug: 'points-droites-segments',
  cours: `
${cm1Lecon(1, 'Point, segment, droite')}
${cm1Def(`<ul style="margin:0;padding-left:20px;line-height:1.8;">
<li>Un <b>point</b> se marque par une petite croix et se nomme par une lettre majuscule : le point A.</li>
<li>Un <b>segment</b> est le morceau de droite qui va d'un point à un autre. Il a <b>deux extrémités</b> et une <b>longueur</b> qu'on peut mesurer. Le segment qui va de B à C se note <b>[BC]</b>.</li>
<li>Une <b>droite</b> est un trait droit qui ne s'arrête jamais, des deux côtés. On n'en dessine qu'un morceau. La droite qui passe par D et E se note <b>(DE)</b>.</li></ul>`, 'Vocabulaire')}
<div class="figure-wrap">${TROIS}</div>
${cm1Rem('Les crochets [ ] montrent que le segment <b>s\'arrête</b> à ses extrémités ; les parenthèses ( ) montrent que la droite <b>continue</b>.')}

${cm1Lecon(2, 'Points alignés')}
${cm1Def('Des points sont <b>alignés</b> quand on peut tracer une même droite qui passe par tous ces points.')}
<div class="figure-wrap">${ALIGNES}<p class="hint" style="margin:4px 0 0;">M, N et P sont alignés. R n'est pas sur la droite : M, N et R ne sont pas alignés.</p></div>
${cm1Astuce('Pour vérifier : on pose le bord de la règle sur deux des points et on regarde si le troisième est contre la règle.')}

${cm1Lecon(3, 'Le milieu d\'un segment')}
${cm1Def('Le <b>milieu</b> d\'un segment est le point du segment qui est <b>à la même distance</b> des deux extrémités. Il partage le segment en deux segments de même longueur.')}
<div class="figure-wrap">${MILIEU}<p class="hint" style="margin:4px 0 0;">Le segment [AB] mesure 10 cm : son milieu I est à 5 cm de A et à 5 cm de B. Les petits traits verts indiquent que les deux longueurs sont égales.</p></div>
`,
  methode: `
${cm1Demo('ce2-pd-tracer', 'Tracer un segment de longueur donnée', 'Trace un segment [AB] de 7 cm.')}
${cm1Demo('ce2-pd-milieu', 'Placer le milieu d\'un segment', 'Le segment [AB] mesure 8 cm. Place son milieu I.')}
`,
  demos: [
    ['ce2-pd-tracer', [
      { expr: 'Je marque le point A.', note: 'Une petite croix, puis la lettre A.' },
      { expr: 'Je pose la règle : le 0 sur le point A.', note: 'Attention : le 0 n\'est pas toujours au bord de la règle.' },
      { expr: 'Je marque le point B en face du 7.', note: 'Je tiens bien la règle, sans qu\'elle glisse.' },
      { expr: 'Je trace le trait de A à B, puis je vérifie : 7 cm ✔', note: 'Le segment [AB] mesure 7 cm.' },
    ]],
    ['ce2-pd-milieu', [
      { expr: '8 ÷ 2 = 4 : le milieu est à 4 cm de A', note: 'Le milieu est à la moitié de la longueur.' },
      { expr: 'Je pose le 0 de la règle sur A, le long du segment.', note: 'La règle suit exactement le segment.' },
      { expr: 'Je marque I en face du 4.', note: 'Je vérifie : de I à B, il y a aussi 4 cm ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-pd', [
    ['Trace un segment [EF] de 6 cm, puis place son milieu M.', 'M est à 3 cm de E et à 3 cm de F.'],
    ['Quelle est la différence entre un segment et une droite ?', 'Un segment s\'arrête à ses deux extrémités (on peut le mesurer) ; une droite continue sans fin des deux côtés.'],
    ['Place trois points alignés A, B, C, puis un point D qui n\'est pas aligné avec A et B.', 'A, B, C sur une même droite tracée à la règle ; D en dehors de cette droite.'],
    ['Un segment mesure 12 cm. À quelle distance de chaque extrémité est son milieu ?', 'À 6 cm (la moitié de 12).'],
    ['Combien de segments peux-tu tracer qui relient deux des trois points A, B, C (non alignés) ?', 'Trois segments : [AB], [BC] et [AC] (cela forme un triangle).'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les points d\'Euclide', [
    'Il y a plus de 2 000 ans, le savant grec <b>Euclide</b> a écrit un grand livre de géométrie, les <i>Éléments</i>. Il y explique qu\'un point « n\'a pas de taille » et qu\'une ligne « a une longueur mais pas d\'épaisseur ». Son livre a servi à apprendre la géométrie pendant plus de 2 000 ans !',
  ]),
  quiz: [
    { q: 'Une droite…', opts: ['s\'arrête à ses deux extrémités', 'ne s\'arrête jamais', 'est toujours horizontale'], correct: 1 },
    { q: 'Le milieu d\'un segment de 10 cm est à … de chaque extrémité.', opts: ['2 cm', '5 cm', '10 cm'], correct: 1 },
    { q: 'Des points sont alignés quand…', opts: ['ils sont sur une même droite', 'ils sont proches', 'ils ont le même nom'], correct: 0 },
  ],
  flash: [
    { q: 'Quel objet s\'arrête à ses deux extrémités ?', r: ['une droite', 'un segment', 'un point', 'aucun'], ok: 1 },
    { q: 'Le milieu d\'un segment de 8 cm est à … de chaque extrémité.', r: ['2 cm', '4 cm', '8 cm', '16 cm'], ok: 1 },
    { q: 'Comment marque-t-on un point ?', r: ['avec un rond plein', 'avec une petite croix', 'avec un trait', 'avec une flèche'], ok: 1 },
    { q: '(DE) désigne…', r: ['un segment', 'une droite', 'un point', 'une longueur'], ok: 1 },
    { q: 'Pour tracer un segment de 5 cm, je pose sur le premier point…', r: ['le bord de la règle', 'le 0 de la règle', 'le 5 de la règle', 'le 1 de la règle'], ok: 1 },
    { q: 'Vrai ou faux : on peut mesurer la longueur d\'une droite.', r: ['Vrai', 'Faux'], ok: 1 },
  ],
});
})();

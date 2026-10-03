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
// Points pour l'animation « points alignés » (M, N, P sur une même droite, R en dehors).
const ALIGNES_PTS = croix(70, 90, 'M') + croix(200, 62, 'N') + croix(330, 35, 'P') + croix(250, 100, 'R');
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
${ce2Film('ce2-pd-align', { duree: 7000, legende: 'On pose le bord de la règle sur deux points, puis on regarde le troisième.', film: { w: 420, h: 130, scenes: [
  { de: 0, a: .1, dessin: k => `<g opacity="${k}">${ALIGNES_PTS}</g>`, texte: 'Les points M, N, P et R sont-ils alignés ?' },
  { de: .12, a: .4, dessin: k => `<g transform="rotate(-12.1 200 62)"><rect x="${ce2Mix(-400, 20, k)}" y="62" width="380" height="26" fill="#FFF3D6" fill-opacity=".85" stroke="#C9A24A"/></g>`, texte: 'Je pose le bord de la règle contre M et N.' },
  { de: .45, a: .6, dessin: k => `<circle cx="330" cy="35" r="${12 * k}" fill="none" stroke="#2E9C6A" stroke-width="3"/>`, texte: 'P touche aussi le bord de la règle : <b>M, N et P sont alignés</b>.' },
  { de: .7, a: .85, dessin: k => `<circle cx="250" cy="100" r="${12 * k}" fill="none" stroke="#E35D3A" stroke-width="3"/>`, texte: 'R n\'est pas contre la règle : <b>M, N et R ne sont pas alignés</b>.' }] } })}
${cm1Astuce('Pour vérifier : on pose le bord de la règle sur deux des points et on regarde si le troisième est contre la règle.')}

${cm1Lecon(3, 'Le milieu d\'un segment')}
${cm1Def('Le <b>milieu</b> d\'un segment est le point du segment qui est <b>à la même distance</b> des deux extrémités. Il partage le segment en deux segments de même longueur.')}
<div class="figure-wrap">${MILIEU}<p class="hint" style="margin:4px 0 0;">Le segment [AB] mesure 10 cm : son milieu I est à 5 cm de A et à 5 cm de B. Les petits traits verts indiquent que les deux longueurs sont égales.</p></div>
${ce2AnimRegle('ce2-pd-regle', { legende: 'Tracer un segment à la règle, puis placer son milieu.', presets: [{ nom: 'Segment de 7 cm', cm: 7, mm: 0 }, { nom: 'Milieu d\'un segment de 8 cm', cm: 8, mm: 0, milieu: true }] })}
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
      { expr: 'Je trace le trait de A à B.', note: 'Le long de la règle, sans la faire glisser.' },
      { expr: 'Je vérifie : le segment [AB] mesure 7 cm ✔', note: '' },
    ]],
    ['ce2-pd-milieu', [
      { expr: 'La moitié de 8 cm, c\'est 4 cm.', note: 'Le milieu est à la moitié de la longueur.' },
      { expr: 'Je pose le 0 de la règle sur A, le long du segment.', note: 'La règle suit exactement le segment.' },
      { expr: 'Je marque I en face du 4.', note: 'Je vérifie : de I à B, il y a aussi 4 cm ✔' },
      { expr: 'Je code : un petit trait sur le segment [AI] et un sur le segment [IB].', note: 'Les deux longueurs sont égales.' },
    ]],
  ],
  exos: cm1Exos('ce2-pd', [
    ['Trace un segment [EF] de 6 cm, puis place son milieu M. À quelle distance de E se trouve M ?',
      cm1Redac('Distance de E à M', '6 cm = 3 cm + 3 cm', 'Le milieu M est à 3 cm de E (et à 3 cm de F).')],
    ['Quelle est la différence entre un segment et une droite ?',
      cm1Redac('Segment et droite', '', 'Un segment s\'arrête à ses deux extrémités : on peut mesurer sa longueur. Une droite ne s\'arrête jamais, des deux côtés : on ne peut pas la mesurer.')],
    ['Place trois points alignés A, B et C, puis un point D qui n\'est pas aligné avec A et B. Comment vérifies-tu ?',
      cm1Redac('Vérification', '', 'Je pose le bord de la règle sur A et B : C touche la règle, donc A, B et C sont alignés. D ne touche pas la règle, donc A, B et D ne sont pas alignés.')],
    ['Un segment mesure 12 cm. À quelle distance de chaque extrémité est son milieu ?',
      cm1Redac('Distance du milieu aux extrémités', '12 cm = 6 cm + 6 cm', 'Le milieu est à 6 cm de chaque extrémité.')],
    ['Trois points A, B et C ne sont pas alignés. Combien de segments peux-tu tracer qui relient deux de ces points ?',
      cm1Redac('Nombre de segments', '[AB], [BC] et [AC]', 'On peut tracer 3 segments : ils forment un triangle.')],
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
    { l: 1, q: 'Quel objet s\'arrête à ses deux extrémités ?', r: ['une droite', 'un segment', 'un point', 'aucun'], ok: 1 },
    { l: 3, q: 'Le milieu d\'un segment de 8 cm est à … de chaque extrémité.', r: ['2 cm', '4 cm', '8 cm', '16 cm'], ok: 1 },
    { l: 1, q: 'Comment marque-t-on un point ?', r: ['avec un rond plein', 'avec une petite croix', 'avec un trait', 'avec une flèche'], ok: 1 },
    { l: 1, q: '(DE) désigne…', r: ['un segment', 'une droite', 'un point', 'une longueur'], ok: 1 },
    { l: 1, q: 'Pour tracer un segment de 5 cm, je pose sur le premier point…', r: ['le bord de la règle', 'le 0 de la règle', 'le 5 de la règle', 'le 1 de la règle'], ok: 1 },
    { l: 1, q: 'Vrai ou faux : on peut mesurer la longueur d\'une droite.', r: ['Vrai', 'Faux'], ok: 1 },
    { l: 2, q: "Trois points sont alignés quand…", r: ["ils sont sur une même droite", "ils forment un triangle", "ils sont rouges", "ils sont loin"], ok: 0 },
    { l: 2, q: "Pour vérifier que des points sont alignés, on utilise…", r: ["la règle", "le compas", "la gomme", "un verre"], ok: 0 },
    { l: 3, q: "Le milieu d'un segment de 10 cm est à … de chaque extrémité.", r: ["5 cm", "10 cm", "20 cm", "2 cm"], ok: 0 },
  ],
});
})();

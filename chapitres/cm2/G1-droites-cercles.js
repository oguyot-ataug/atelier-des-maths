/* ============================================================
   CHAPITRE : Droites, segments et cercles (CM2, G1, période 1)
   Programme du cycle 3 (CM2) : vocabulaire et notations (droite (AB), segment [AB], demi-droite
   [AB), longueur AB) -- les consignes explicitent TOUJOURS le symbole (« trace le segment [AB] ») ;
   perpendicularité et parallélisme (règle, équerre) ; cercle et disque comme ensembles de points
   caractérisés par leur distance au centre ; rayon, diamètre.
   ============================================================ */
(() => {
const T = (x, y, t, c) => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="${c || '#1F3A5C'}" font-family="Space Grotesk">${t}</text>`;
const P = (x, y) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#1F3A5C"/>`;
function notations(){
  const b = (y, contenu, nom, desc) => `<g>${contenu}${T(290, y + 5, nom, '#E35D3A')}<text x="360" y="${y + 5}" font-size="12.5" fill="#1F3A5C" font-family="Inter">${desc}</text></g>`;
  return `<svg viewBox="0 0 640 210" style="width:100%;max-width:640px;display:block;margin:0 auto;">
  ${b(30, `<line x1="10" y1="30" x2="260" y2="30" stroke="#1F3A5C" stroke-width="2"/>${P(80, 30)}${P(190, 30)}${T(74, 20, 'A')}${T(184, 20, 'B')}`, '(AB)', 'la droite (AB) : illimitée des deux côtés')}
  ${b(85, `<line x1="80" y1="85" x2="190" y2="85" stroke="#1F3A5C" stroke-width="2.4"/>${P(80, 85)}${P(190, 85)}${T(74, 75, 'A')}${T(184, 75, 'B')}`, '[AB]', 'le segment [AB] : limité par A et B')}
  ${b(140, `<line x1="80" y1="140" x2="260" y2="140" stroke="#1F3A5C" stroke-width="2"/>${P(80, 140)}${P(190, 140)}${T(74, 130, 'A')}${T(184, 130, 'B')}`, '[AB)', 'la demi-droite [AB) : d\'origine A, passe par B')}
  ${b(190, `<line x1="80" y1="190" x2="190" y2="190" stroke="#1F3A5C" stroke-width="1.4"/><line x1="80" y1="182" x2="80" y2="198" stroke="#1F3A5C"/><line x1="190" y1="182" x2="190" y2="198" stroke="#1F3A5C"/>${T(118, 182, '5 cm', '#2EA8C9')}`, 'AB', 'AB = 5 cm : la longueur du segment [AB]')}</svg>`;
}
function perpPara(){
  return `<svg viewBox="0 0 520 170" style="width:100%;max-width:520px;display:block;margin:0 auto;">
  <line x1="20" y1="120" x2="220" y2="120" stroke="#1F3A5C" stroke-width="2"/><line x1="110" y1="20" x2="110" y2="160" stroke="#1F3A5C" stroke-width="2"/><polyline points="110,108 122,108 122,120" fill="none" stroke="#E35D3A" stroke-width="2"/>${T(200, 112, '(d)')}${T(116, 30, '(d\')')}
  <line x1="280" y1="50" x2="500" y2="20" stroke="#2E9C6A" stroke-width="2"/><line x1="280" y1="120" x2="500" y2="90" stroke="#2E9C6A" stroke-width="2"/>${T(470, 18, '(e)', '#2E9C6A')}${T(470, 88, '(f)', '#2E9C6A')}</svg>`;
}
function cercle(){
  return `<svg viewBox="0 0 300 220" style="width:300px;max-width:100%;display:block;margin:0 auto;">
  <circle cx="150" cy="110" r="80" fill="#2EA8C9" fill-opacity=".12" stroke="#2EA8C9" stroke-width="2.4"/>
  <line x1="150" y1="110" x2="${150 + 80 * Math.cos(-0.6)}" y2="${110 + 80 * Math.sin(-0.6)}" stroke="#E35D3A" stroke-width="2.2"/>
  <line x1="70" y1="110" x2="230" y2="110" stroke="#7A4FC0" stroke-width="2.2"/>
  ${P(150, 110)}${P(70, 110)}${P(230, 110)}${P(150 + 80 * Math.cos(-0.6), 110 + 80 * Math.sin(-0.6))}
  ${T(142, 130, 'O')}${T(52, 115, 'A')}${T(236, 115, 'B')}${T(150 + 84 * Math.cos(-0.6), 104 + 84 * Math.sin(-0.6), 'M')}
  <text x="206" y="80" font-size="12" fill="#E35D3A" font-family="Inter">rayon</text><text x="96" y="104" font-size="12" fill="#7A4FC0" font-family="Inter">diamètre</text></svg>`;
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Droites, segments et cercles', slug: 'droites-cercles',
  cours: `
${cm1Lecon(1, 'Droite, segment, demi-droite : les notations')}
<div class="figure-wrap">${notations()}</div>
${cm1Rem('Attention aux signes : des parenthèses pour la droite, des crochets pour le segment, un crochet et une parenthèse pour la demi-droite, rien du tout pour une longueur.')}
${cm1Astuce('Trois points sont <b>alignés</b> s\'ils sont sur une même droite. On le vérifie avec la règle.')}

${cm1Lecon(2, 'Droites perpendiculaires, droites parallèles')}
<div class="figure-wrap">${perpPara()}</div>
${cm1Def('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Deux droites sont <b>perpendiculaires</b> si elles se coupent en formant un <b>angle droit</b> : la droite (d) est perpendiculaire à la droite (d\'). On le vérifie avec l\'<b>équerre</b> et on le code par un petit carré.</li><li>Deux droites sont <b>parallèles</b> si elles ne se coupent jamais, même prolongées : l\'écart entre elles reste le même. La droite (e) est parallèle à la droite (f).</li></ul>')}
${cm1Regle('Deux droites perpendiculaires à une même troisième droite sont parallèles entre elles.', 'Propriété')}

${cm1Lecon(3, 'Le cercle et le disque')}
<div class="figure-wrap">${cercle()}</div>
${cm1Def('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Le <b>cercle de centre O et de rayon 3 cm</b> est formé de <b>tous les points situés à 3 cm du point O</b>.</li><li>Le <b>disque</b> de centre O et de rayon 3 cm est formé de tous les points situés à <b>3 cm ou moins</b> du point O : c\'est la surface à l\'intérieur du cercle, bord compris.</li><li>Un <b>rayon</b> est un segment qui joint le centre à un point du cercle, comme le segment [OM].</li><li>Un <b>diamètre</b> est un segment qui joint deux points du cercle en passant par le centre, comme le segment [AB]. Sa longueur est le double du rayon.</li></ul>')}
${cm1Regle('Pour tracer un cercle de centre O et de rayon 3 cm : on écarte le compas de 3 cm sur la règle, on pique la pointe sur O et on tourne.', 'Avec le compas')}
${ce2AnimCompas('c2-g1-compas', { presets: [{ nom: 'Rayon 3 cm', r: 3 }, { nom: 'Rayon 2 cm', r: 2 }, { nom: 'Rayon 4 cm', r: 4 }] })}
`,
  methode: `
${cm1Demo('c2-g1-perp', 'Tracer la perpendiculaire à une droite passant par un point', 'Trace la droite perpendiculaire à la droite (d) passant par le point A.')}
${cm1Demo('c2-g1-para', 'Tracer la parallèle à une droite passant par un point', 'Trace la droite parallèle à la droite (d) passant par le point B.')}
`,
  demos: [
    ['c2-g1-perp', [
      { expr: 'Je place un côté de l\'angle droit de l\'équerre le long de la droite (d).', note: 'Le bord de l\'équerre doit être bien collé à la droite.' },
      { expr: 'Je fais glisser l\'équerre le long de (d) jusqu\'au point A.', note: 'L\'autre côté de l\'angle droit doit passer par A.' },
      { expr: 'Je trace le long de l\'autre côté de l\'angle droit.', note: 'Puis je prolonge le trait avec la règle.' },
      { expr: 'Je code l\'angle droit.', note: 'Petit carré à l\'intersection des deux droites.' },
    ]],
    ['c2-g1-para', [
      { expr: 'Je trace la perpendiculaire (d\') à (d) passant par B.', note: 'Avec l\'équerre, comme dans la méthode précédente.' },
      { expr: 'Je trace la perpendiculaire (d\'\') à (d\') passant par B.', note: 'On replace l\'équerre, cette fois le long de (d\').' },
      { expr: 'La droite (d\'\') est parallèle à (d).', note: 'Deux droites perpendiculaires à une même droite (d\') sont parallèles.' },
    ]],
  ],
  exos: cm1Exos('c2g1', [
    [`Écris avec les bons symboles.${cm1Liste(['la droite qui passe par E et F', 'le segment d\'extrémités E et F', 'la demi-droite d\'origine E qui passe par F', 'la longueur du segment d\'extrémités E et F'])}`,
      cm1Redac('Notations', { suite: ['droite : (EF)', 'segment : [EF]', 'demi-droite : [EF)', 'longueur : EF'] }, 'Parenthèses pour la droite, crochets pour le segment, un crochet et une parenthèse pour la demi-droite, rien pour la longueur.')],
    ['Place trois points R, S, T alignés, puis un point U qui n\'est pas sur la droite (RS).',
      cm1Redac('Points alignés', '', 'Je trace une droite à la règle et j\'y place R, S et T : ils sont alignés. Je place U en dehors de cette droite.')],
    ['Trace une droite (d), un point A hors de (d), puis la droite perpendiculaire à (d) passant par A.',
      cm1Redac('Tracé de la perpendiculaire', '', 'Je pose un côté de l\'angle droit de l\'équerre sur (d), je la fais glisser jusqu\'à ce que l\'autre côté passe par A, puis je trace et je code l\'angle droit.')],
    ['Trace un cercle de centre O et de rayon 4 cm. Quelle est la longueur d\'un diamètre ?',
      cm1Redac('Longueur d\'un diamètre', '4 × 2 = 8', 'Un diamètre mesure 8 cm : c\'est le double du rayon.')],
    ['Un point M est à 2 cm du centre d\'un cercle de rayon 3 cm. Est-il sur le cercle, dans le disque, en dehors ?',
      cm1Redac('Position du point M', '2 cm &lt; 3 cm', 'M est plus près du centre que le cercle : il est dans le disque, à l\'intérieur du cercle.')],
    ['Place deux points A et B à 5 cm l\'un de l\'autre. Trouve les points situés à la fois à 3 cm de A et à 4 cm de B.',
      cm1Redac('Points cherchés', '', 'Je trace le cercle de centre A et de rayon 3 cm, puis le cercle de centre B et de rayon 4 cm. Les deux points où ils se coupent conviennent.')],
    ['Vrai ou faux ? « Deux droites qui ne se coupent pas sur ma feuille sont parallèles. »',
      cm1Redac('Vrai ou faux', '', 'C\'est faux : elles peuvent se couper plus loin, en dehors de la feuille. Il faut vérifier que l\'écart reste le même, ou utiliser l\'équerre.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Euclide et ses Éléments', [
    'Vers 300 avant notre ère, à Alexandrie, le savant grec <b>Euclide</b> écrit les <i>Éléments</i>, un livre qui rassemble toute la géométrie connue. Il commence par définir le point, la droite, le cercle…',
    'Ce livre a été utilisé pour enseigner la géométrie pendant plus de 2 000 ans : c\'est l\'un des livres les plus lus de l\'histoire, après la Bible.',
  ]),
  quiz: [
    { q: 'Comment note-t-on le segment d\'extrémités A et B ?', opts: ['(AB)', '[AB]', 'AB'], correct: 1 },
    { q: 'Le diamètre d\'un cercle de rayon 5 cm mesure…', opts: ['2,5 cm', '5 cm', '10 cm'], correct: 2 },
    { q: 'Deux droites perpendiculaires se coupent en formant…', opts: ['un angle droit', 'un angle aigu', 'rien, elles ne se coupent pas'], correct: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Polygones et quadrilatères (CE2, G2, période 2)
   Programme du cycle 2 (CE2), géométrie plane : polygone, triangle, quadrilatère, pentagone,
   hexagone ; côté, sommet, angle ; carré, rectangle, losange, triangle rectangle ; diagonale,
   longueur et largeur du rectangle ; justifier la nature d'une figure par ses côtés et ses angles
   droits (« ce n'est pas un carré car… ») ; codages de l'angle droit et des longueurs égales.
   ============================================================ */
(() => {
const svg = (w, h, c) => `<svg viewBox="0 0 ${w} ${h}" style="width:${w}px;max-width:100%;display:inline-block;vertical-align:middle;margin:6px;">${c}</svg>`;
const poly = (pts, c) => `<polygon points="${pts.map(p => p.join(',')).join(' ')}" fill="${c || '#2EA8C9'}" fill-opacity=".18" stroke="#1F3A5C" stroke-width="2" stroke-linejoin="round"/>`;
// Petit carré d'angle droit au sommet S, entre les directions de S vers A et de S vers B.
function droit(S, A, B, t){
  t = t || 11; const u = d => { const dx = d[0] - S[0], dy = d[1] - S[1], n = Math.hypot(dx, dy); return [dx / n * t, dy / n * t]; };
  const a = u(A), b = u(B);
  return `<path d="M${S[0] + a[0]} ${S[1] + a[1]} L${S[0] + a[0] + b[0]} ${S[1] + a[1] + b[1]} L${S[0] + b[0]} ${S[1] + b[1]}" fill="none" stroke="#E35D3A" stroke-width="1.6"/>`;
}
// Codage de longueur : n petits traits au milieu du segment AB.
function code(A, B, n){
  const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  let s = '';
  for(let i = 0; i < n; i++){ const o = (i - (n - 1) / 2) * 5, cx = mx + ux * o, cy = my + uy * o; s += `<line x1="${cx - nx * 6 + ux * 2}" y1="${cy - ny * 6 + uy * 2}" x2="${cx + nx * 6 - ux * 2}" y2="${cy + ny * 6 - uy * 2}" stroke="#2E9C6A" stroke-width="1.8"/>`; }
  return s;
}
const fig = (titre, contenu) => `<div style="display:inline-block;text-align:center;margin:4px 10px;">${contenu}<div class="hint" style="margin:0;">${titre}</div></div>`;
// Les quatre figures de référence, codées.
const CA = [[20, 20], [120, 20], [120, 120], [20, 120]];
const RE = [[20, 30], [180, 30], [180, 110], [20, 110]];
const LO = [[90, 10], [150, 70], [90, 130], [30, 70]];
const TR = [[20, 20], [20, 120], [150, 120]];
const CARRE = svg(140, 140, poly(CA) + CA.map((S, i) => droit(S, CA[(i + 1) % 4], CA[(i + 3) % 4])).join('') + CA.map((S, i) => code(S, CA[(i + 1) % 4], 1)).join(''));
const RECT = svg(200, 140, poly(RE, '#2E9C6A') + RE.map((S, i) => droit(S, RE[(i + 1) % 4], RE[(i + 3) % 4])).join('') + code(RE[0], RE[1], 2) + code(RE[2], RE[3], 2) + code(RE[1], RE[2], 1) + code(RE[3], RE[0], 1));
const LOS = svg(180, 140, poly(LO, '#7A4FC0') + LO.map((S, i) => code(S, LO[(i + 1) % 4], 1)).join(''));
const TRI = svg(170, 140, poly(TR, '#E9C46A') + droit(TR[1], TR[0], TR[2]));
const FAMILLE = svg(560, 120,
  poly([[20, 100], [70, 20], [120, 100]], '#E9C46A') + `<text x="70" y="116" font-size="12" text-anchor="middle" fill="#5B6472">triangle : 3 côtés</text>`
  + poly([[160, 30], [250, 20], [270, 100], [170, 95]], '#2EA8C9') + `<text x="215" y="116" font-size="12" text-anchor="middle" fill="#5B6472">quadrilatère : 4 côtés</text>`
  + poly([[340, 15], [390, 50], [372, 100], [308, 100], [290, 50]], '#2E9C6A') + `<text x="340" y="116" font-size="12" text-anchor="middle" fill="#5B6472">pentagone : 5 côtés</text>`
  + poly([[450, 18], [500, 18], [525, 58], [500, 98], [450, 98], [425, 58]], '#7A4FC0') + `<text x="475" y="116" font-size="12" text-anchor="middle" fill="#5B6472">hexagone : 6 côtés</text>`);
const VOCAB = svg(290, 150, poly([[40, 120], [220, 120], [220, 30], [40, 30]], '#2EA8C9') + `<line x1="40" y1="120" x2="220" y2="30" stroke="#E35D3A" stroke-width="1.8" stroke-dasharray="6 4"/>`
  + `<text x="28" y="140" font-size="13" font-weight="700" fill="#1F3A5C">A</text><text x="224" y="140" font-size="13" font-weight="700" fill="#1F3A5C">B</text><text x="224" y="26" font-size="13" font-weight="700" fill="#1F3A5C">C</text><text x="28" y="26" font-size="13" font-weight="700" fill="#1F3A5C">D</text>`
  + `<text x="130" y="142" font-size="12" text-anchor="middle" fill="#5B6472">longueur</text><text x="236" y="80" font-size="12" fill="#5B6472">largeur</text><text x="122" y="68" font-size="12" fill="#E35D3A">diagonale</text>`);
cm1Chapitre({
  niveau: 'ce2', titre: 'Polygones et quadrilatères', slug: 'polygones-quadrilateres',
  cours: `
${cm1Lecon(1, 'Les polygones')}
${cm1Def('Un <b>polygone</b> est une figure fermée dont le tour est fait de <b>segments</b>. Ces segments sont les <b>côtés</b> ; les points où deux côtés se rejoignent sont les <b>sommets</b>. Un polygone a autant de sommets que de côtés.')}
<div class="figure-wrap">${FAMILLE}</div>
${cm1Rem('Un disque n\'est pas un polygone : son tour n\'est pas fait de segments.')}

${cm1Lecon(2, 'Les quadrilatères particuliers')}
${cm1Def('Un <b>quadrilatère</b> est un polygone qui a <b>4 côtés</b> et <b>4 sommets</b>.')}
<div class="figure-wrap" style="text-align:center;">
${fig('<b>Carré</b> : 4 angles droits, 4 côtés de même longueur', CARRE)}
${fig('<b>Rectangle</b> : 4 angles droits, côtés opposés de même longueur', RECT)}
${fig('<b>Losange</b> : 4 côtés de même longueur', LOS)}
</div>
${cm1Regle('Sur une figure, on <b>code</b> les angles droits par un petit carré <span style="color:#E35D3A;">◻</span> et les côtés de même longueur par <b>le même nombre de petits traits</b> <span style="color:#2E9C6A;">/</span>.', 'Codages')}
${cm1Rem('Un carré est un rectangle particulier (il a 4 angles droits) et aussi un losange particulier (il a 4 côtés égaux).')}

${cm1Lecon(3, 'Le vocabulaire du rectangle')}
<div class="figure-wrap">${VOCAB}<p class="hint" style="margin:4px 0 0;">Le grand côté est la <b>longueur</b>, le petit côté la <b>largeur</b>. Le segment qui relie deux sommets opposés, comme A et C, est une <b>diagonale</b>.</p></div>

${cm1Lecon(4, 'Le triangle rectangle')}
${cm1Def('Un <b>triangle rectangle</b> est un triangle qui a <b>un angle droit</b>.')}
<div class="figure-wrap" style="text-align:center;">${TRI}</div>
${cm1Astuce('Pour dire qu\'une figure n\'est <b>pas</b> d\'une certaine sorte, une seule propriété qui manque suffit : « Ce n\'est pas un carré, car l\'un de ses angles n\'est pas un angle droit. »')}
`,
  methode: `
${cm1Demo('ce2-po-nature', 'Justifier la nature d\'un quadrilatère', 'Un quadrilatère a 4 angles droits. Ses côtés mesurent 6 cm, 4 cm, 6 cm et 4 cm. Est-ce un carré ? un rectangle ?')}
`,
  demos: [
    ['ce2-po-nature', [
      { expr: 'Il a 4 angles droits.', note: 'On vérifie avec l\'équerre.' },
      { expr: 'Ses côtés ne sont pas tous de même longueur (6 cm et 4 cm).', note: '' },
      { expr: 'Ce n\'est pas un carré : un carré a 4 côtés de même longueur.', note: 'Une propriété qui manque suffit.' },
      { expr: 'C\'est un rectangle : 4 angles droits, côtés opposés de même longueur.', note: 'Sa longueur est 6 cm, sa largeur 4 cm.' },
    ]],
  ],
  exos: cm1Exos('ce2-po', [
    ['Comment appelle-t-on un polygone à 5 côtés ? à 6 côtés ?', 'Un pentagone ; un hexagone.'],
    ['Combien de sommets a un hexagone ?', '6 sommets (autant que de côtés).'],
    ['Un quadrilatère a 4 côtés de 5 cm, mais pas d\'angle droit. Comment s\'appelle-t-il ?', 'Un losange.'],
    ['Pourquoi un losange qui n\'a pas d\'angle droit n\'est-il pas un carré ?', 'Parce qu\'un carré a 4 angles droits.'],
    ['Dessine un rectangle sur papier quadrillé, trace ses deux diagonales et code-le.', 'Un petit carré à chaque coin, les côtés opposés codés par les mêmes traits.'],
    ['Un rectangle a une longueur de 9 cm et une largeur de 5 cm. Quelles sont les longueurs de ses 4 côtés ?', '9 cm, 5 cm, 9 cm et 5 cm.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : des noms grecs', [
    'Les noms des polygones viennent du <b>grec ancien</b> : <i>poly</i> veut dire « plusieurs » et <i>gonia</i> « angle ». <i>Penta</i> veut dire cinq, <i>hexa</i> six. Le mot <b>quadrilatère</b>, lui, vient du latin : « quatre côtés ».',
  ]),
  quiz: [
    { q: 'Un quadrilatère a…', opts: ['3 côtés', '4 côtés', '5 côtés'], correct: 1 },
    { q: 'Un losange a toujours…', opts: ['4 angles droits', '4 côtés de même longueur', '3 sommets'], correct: 1 },
    { q: 'Un triangle rectangle a…', opts: ['un angle droit', 'trois angles droits', 'quatre côtés'], correct: 0 },
  ],
  flash: [
    { q: 'Un hexagone a combien de côtés ?', r: ['4', '5', '6', '8'], ok: 2 },
    { q: 'Quelle figure a 4 angles droits et 4 côtés de même longueur ?', r: ['le rectangle', 'le losange', 'le carré', 'le triangle'], ok: 2 },
    { q: 'Le segment qui relie deux sommets opposés d\'un rectangle est…', r: ['un côté', 'une diagonale', 'un rayon', 'une largeur'], ok: 1 },
    { q: 'Un pentagone a combien de sommets ?', r: ['4', '5', '6', '10'], ok: 1 },
    { q: 'Que veut dire un petit carré dans un coin de figure ?', r: ['un angle droit', 'un milieu', 'un côté égal', 'un sommet'], ok: 0 },
    { q: 'Vrai ou faux : un carré est aussi un rectangle.', r: ['Vrai', 'Faux'], ok: 0 },
  ],
});
})();

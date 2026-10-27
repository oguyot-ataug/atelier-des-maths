/* ============================================================
   CHAPITRE : Comparer des masses (CP, M5, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, grandeurs et mesures : comparer
   des masses en soupesant, puis avec une balance à deux plateaux (le plateau qui descend porte
   l'objet le plus lourd, l'équilibre signifie « aussi lourd ») ; ranger trois objets ; mesurer une
   masse avec des objets tous pareils (cubes) ; le gros n'est pas toujours le plus lourd.
   Pensé pour être projeté : la balance qui penche.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Une petite balance figée : g et d (noms), sens = 1 (gauche plus lourde), −1, 0.
function balance(g, d, sens, o){
  o = o || {}; const p = 10 * sens;
  const plateau = (x, y, nom, c) => `<line x1="${x - 26}" y1="${y + 40}" x2="${x}" y2="${y}" stroke="${CPC.bord}"/><line x1="${x + 26}" y1="${y + 40}" x2="${x}" y2="${y}" stroke="${CPC.bord}"/><rect x="${x - 22}" y="${y + 18}" width="44" height="22" rx="5" fill="${c}" stroke="${CPC.bord}"/>${ce2T(x, y + 33, nom, { t: 10, c: '#fff', g: 700 })}<path d="M${x - 40} ${y + 40} H${x + 40} L${x + 32} ${y + 48} H${x - 32} Z" fill="#C9CBCF" stroke="${CPC.bord}"/>`;
  return cpSvg(260, 150, `<path d="M110 145 H150 L140 130 H120 Z" fill="#8A6D1F"/><line x1="130" y1="130" x2="130" y2="30" stroke="#8A6D1F" stroke-width="5"/>`
    + plateau(60, 30 + p, g, o.cg || '#7A4FC0') + plateau(200, 30 - p, d, o.cd || '#2E9C6A') + `<line x1="60" y1="${30 + p}" x2="200" y2="${30 - p}" stroke="#8A6D1F" stroke-width="5" stroke-linecap="round"/><circle cx="130" cy="30" r="5" fill="${CPC.bord}"/>`, o.px || 220);
}
// Des cubes empilés (pour mesurer une masse avec des objets pareils).
const cubes = n => cpSvg(n * 18 + 6, 24, Array.from({ length: n }, (_, i) => `<rect x="${3 + i * 18}" y="3" width="16" height="16" fill="#E9C46A" stroke="${CPC.bord}"/>`).join(''));

cm1Chapitre({
  niveau: 'cp', titre: 'Comparer des masses', slug: 'comparer-masses',
  cours: `
${cm1Lecon(1, 'Soupeser')}
${cm1Def('On prend un objet dans chaque main : on sent lequel est le <b>plus lourd</b> (il tire plus vers le bas) et lequel est le <b>plus léger</b>.', 'Soupeser')}
${cm1Rem('Au tableau : faire soupeser une trousse et un livre, puis deux objets presque pareils. Quand c\'est difficile à sentir, il faut un instrument : la balance.')}

${cm1Lecon(2, 'La balance à deux plateaux')}
${ce2AnimBalance('cp-m5-balance', { legende: 'On pose un objet sur chaque plateau : le plateau qui descend porte l\'objet le plus lourd.', presets: [
  { nom: 'Pomme et cerise', g: ['la pomme', 150, '#E35D3A', ''], d: ['la cerise', 10, '#C2185B', ''], fem: true },
  { nom: 'Plume et caillou', g: ['la plume', 1, '#C7D2DE', ''], d: ['le caillou', 300, '#8A8F98', ''] },
  { nom: 'Deux paquets pareils', g: ['le paquet bleu', 500, '#2EA8C9', ''], d: ['le paquet vert', 500, '#2E9C6A', ''] }] })}
${cm1Regle(`${lig(balance('livre', 'gomme', 1))}${P('Le plateau du livre descend : le livre est <b>plus lourd</b> que la gomme.')}${lig(balance('A', 'B', 0))}${P('La balance est en <b>équilibre</b> : A est <b>aussi lourd</b> que B.')}`, 'Lire la balance')}

${cm1Lecon(3, 'Gros, mais léger !')}
${cm1Def(`${lig(balance('ballon', 'bille', -1, { cg: '#E9C46A', cd: '#5B6472' }))}${P('Le ballon est plus gros, mais la bille en métal est plus lourde !')}`, 'Attention')}
${cm1Astuce('Le plus gros n\'est pas toujours le plus lourd : une boule de coton est plus grosse qu\'une pièce de monnaie, mais bien plus légère.')}

${cm1Lecon(4, 'Ranger et mesurer')}
${cm1Regle('Pour ranger trois objets du plus léger au plus lourd, on les compare <b>deux par deux</b> avec la balance.', 'Ranger')}
${cm1Def(`On peut équilibrer la balance avec des cubes tous pareils.${lig(balance('trousse', '8 cubes', 0, { cd: '#E9C46A' }))}${P('La trousse pèse autant que <b>8 cubes</b>.')}`, 'Mesurer avec des cubes')}
${cm1Rem('Plus tard, on utilisera de vraies unités de masse : le kilogramme et le gramme, comme sur les paquets de farine.')}
`,
  methode: `
${cm1Demo('cp-m5-m-lire', 'Lire une balance', 'Quel objet est le plus lourd ?')}
${cm1Demo('cp-m5-m-ranger', 'Ranger trois objets', 'Range la pomme, le melon et la fraise du plus léger au plus lourd.')}
`,
  demos: [
    ['cp-m5-m-lire', [
      { expr: 'Je regarde quel plateau est en bas.', note: 'C\'est le plateau de droite.', fig: balance('crayon', 'cahier', -1) },
      { expr: 'Le plateau de droite porte le cahier.', note: 'Le plateau qui descend porte l\'objet le plus lourd.' },
      { expr: 'Le cahier est plus lourd que le crayon.', note: 'Le crayon est plus léger que le cahier.' },
    ]],
    ['cp-m5-m-ranger', [
      { expr: 'Pomme et fraise : la pomme descend.', note: 'La fraise est plus légère que la pomme.', fig: balance('pomme', 'fraise', 1, { cg: '#E35D3A', cd: '#C2185B' }) },
      { expr: 'Pomme et melon : le melon descend.', note: 'Le melon est plus lourd que la pomme.', fig: balance('pomme', 'melon', -1, { cg: '#E35D3A', cd: '#9BC53D' }) },
      { expr: 'fraise, pomme, melon', note: 'Du plus léger au plus lourd.' },
    ]],
  ],
  exos: cm1Exos('cp-m5', [
    [`Quel objet est le plus lourd ?${lig(balance('clé', 'livre', -1))}`,
      cm1Redac('Le plus lourd', '', 'Le plateau du livre descend : le livre est plus lourd que la clé.')],
    [`Que peux-tu dire ?${lig(balance('A', 'B', 0))}`,
      cm1Redac('Équilibre', '', 'La balance est en équilibre : A est aussi lourd que B.')],
    [`Quel objet est le plus léger ?${lig(balance('orange', 'citron', 1, { cg: '#F2A93B', cd: '#E9C46A' }))}`,
      cm1Redac('Le plus léger', '', 'Le plateau du citron est en haut : le citron est le plus léger.')],
    ['Le ballon de plage est plus gros que la balle de tennis. Est-il forcément plus lourd ?',
      cm1Redac('Gros et lourd', '', 'Non : le ballon de plage est rempli d\'air, il est très léger. Il faut vérifier avec une balance.')],
    ['Le chat est plus lourd que le lapin. Le chien est plus lourd que le chat. Range-les du plus léger au plus lourd.',
      cm1Redac('Les animaux', '', 'Le lapin, le chat, le chien.')],
    [`Combien de cubes pèse la tasse ?${lig(balance('tasse', 'cubes', 0, { cd: '#E9C46A' }))}${lig(cubes(6))}`,
      cm1Redac('La tasse', '', 'La balance est en équilibre avec 6 cubes : la tasse pèse autant que 6 cubes.')],
    ['La trousse pèse autant que 8 cubes, le cahier autant que 5 cubes. Lequel est le plus lourd ?',
      cm1Redac('Trousse ou cahier', '8 &gt; 5', 'La trousse est plus lourde que le cahier, de 3 cubes.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la balance du marchand', [
    'La balance à deux plateaux est très ancienne : on en voit sur des peintures égyptiennes de plus de 4 000 ans. Les marchands posaient la marchandise d\'un côté, des poids de pierre ou de métal de l\'autre.',
    'En 1670, le savant français <b>Gilles Personne de Roberval</b> a inventé une balance très pratique, dont les plateaux restent bien à plat. On l\'a utilisée dans les marchés et les épiceries pendant plus de 300 ans !',
  ]),
  quiz: [
    { q: 'Sur une balance, le plateau qui descend porte…', opts: ['l\'objet le plus lourd', 'l\'objet le plus léger', 'le plus gros'], correct: 0 },
    { q: 'Quand la balance est en équilibre, les objets sont…', opts: ['aussi lourds l\'un que l\'autre', 'très légers', 'cassés'], correct: 0 },
    { q: 'Le plus gros objet est toujours le plus lourd.', opts: ['Vrai', 'Faux'], correct: 1 },
  ],
  flash: [
    { l: 1, q: 'Le contraire de « lourd », c\'est…', r: ['léger', 'petit', 'court', 'gros'], ok: 0 },
    { l: 2, q: `Le plus lourd ?${lig(balance('A', 'B', 1, { px: 160 }))}`, r: ['A', 'B', 'Pareil', 'On ne sait pas'], ok: 0 },
    { l: 2, q: `Le plus lourd ?${lig(balance('A', 'B', -1, { px: 160 }))}`, r: ['A', 'B', 'Pareil', 'On ne sait pas'], ok: 1 },
    { l: 3, q: 'Une plume et une bille : la plus lourde est…', r: ['la bille', 'la plume', 'pareil', 'aucune'], ok: 0 },
    { l: 4, q: 'A pèse 4 cubes, B pèse 7 cubes. Le plus lourd ?', r: ['A', 'B', 'Pareil', 'On ne sait pas'], ok: 1 },
  ],
});
})();

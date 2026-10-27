/* ============================================================
   CHAPITRE : Moitié, tiers, quart d'une quantité (CE1, N13, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : réinvestir un demi, un tiers, un
   quart pour des quantités et des longueurs : la moitié de 12 billes, le quart de 20 €, le tiers
   d'une bande de papier ; lien avec le partage équitable et les tables (la moitié de 12, c'est 6
   car 2 × 6 = 12) ; problèmes.
   Pensé pour être projeté : la distribution en 2, 3 ou 4 parts égales.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const F = (a, b) => cm1Frac(a, b);
// Une quantité partagée en n groupes égaux (jetons), avec un groupe coloré.
function groupes(total, n, k){
  const g = total / n; let s = '';
  for(let i = 0; i < n; i++){ const x0 = 4 + i * (Math.min(g, 4) * 20 + 22);
    s += `<rect x="${x0}" y="4" width="${Math.min(g, 4) * 20 + 12}" height="${Math.ceil(g / 4) * 20 + 12}" rx="8" fill="${i < (k || 1) ? '#FDE3D2' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.5"/>`;
    for(let j = 0; j < g; j++) s += `<circle cx="${x0 + 16 + (j % 4) * 20}" cy="${20 + Math.floor(j / 4) * 20}" r="7.5" fill="${i < (k || 1) ? CPC.jeton : CPC.jeton2}" stroke="${CPC.bord}"/>`; }
  return cpSvg(n * (Math.min(g, 4) * 20 + 22) + 6, Math.ceil(g / 4) * 20 + 20, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Moitié, tiers, quart d\'une quantité', slug: 'moitie-tiers-quart',
  cours: `
${cm1Lecon(1, 'La moitié d\'une quantité')}
${ce2AnimPartage('ce1-n13-partage', { legende: 'On partage en parts égales : une part, c\'est la moitié (2 parts), le tiers (3 parts) ou le quart (4 parts).', presets: [{ nom: 'La moitié de 12', total: 12, parts: 2 }, { nom: 'Le tiers de 12', total: 12, parts: 3 }, { nom: 'Le quart de 12', total: 12, parts: 4 }] })}
${cm1Def(`${lig(groupes(12, 2))}${P(`La <b>moitié</b> de 12 billes (${F(1, 2)} de 12), c'est <b>6 billes</b>, car 2 × 6 = 12.`)}`, 'La moitié')}

${cm1Lecon(2, 'Le tiers et le quart')}
${cm1Def(`${lig(groupes(12, 3))}${P(`Le <b>tiers</b> de 12 (${F(1, 3)} de 12), c'est <b>4</b>, car 3 × 4 = 12.`)}${lig(groupes(12, 4))}${P(`Le <b>quart</b> de 12 (${F(1, 4)} de 12), c'est <b>3</b>, car 4 × 3 = 12.`)}`, 'Tiers et quart')}
${cm1Regle('Pour trouver le tiers d\'un nombre, je cherche dans la table de 3 ; pour le quart, dans la table de 4.', 'Avec les tables')}

${cm1Lecon(3, 'Des longueurs')}
${cm1Def(`${lig(ce1Frac('bande', 2, 1, { L: 240 }))}${P(`Une bande de 12 cm pliée en deux : chaque morceau mesure ${F(1, 2)} de la bande, soit <b>6 cm</b>.`)}${lig(ce1Frac('bande', 4, 1, { L: 240 }))}${P(`Pliée en quatre : chaque morceau mesure ${F(1, 4)} de la bande, soit <b>3 cm</b>.`)}`, 'Plier une bande')}

${cm1Lecon(4, 'Plusieurs parts')}
${cm1Regle(`Les ${F(3, 4)} de 12 : un quart, c'est 3 ; trois quarts, c'est trois fois plus.${cm1Liste(['12 : 4 parts de 3', '3 × 3 = 9'])}${P(`Les ${F(3, 4)} de 12, c'est <b>9</b>.`)}${lig(groupes(12, 4, 3))}`, 'Trois quarts')}
`,
  methode: `
${cm1Demo('ce1-n13-m-moitie', 'Trouver la moitié de 18', 'Quelle est la moitié de 18 ?')}
${cm1Demo('ce1-n13-m-quart', 'Trouver le quart de 20 €', 'Quatre amis se partagent 20 €. Combien chacun ?')}
`,
  demos: [
    ['ce1-n13-m-moitie', [
      { expr: '… + … = 18', note: 'Je cherche le nombre qui, ajouté à lui-même, fait 18.' },
      { expr: '9 + 9 = 18', note: 'Je connais ce double.' },
      { expr: 'La moitié de 18, c\'est 9.', note: `${F(1, 2)} de 18 = 9.` },
    ]],
    ['ce1-n13-m-quart', [
      { expr: '4 × … = 20', note: 'Je cherche dans la table de 4 (ou de 5).' },
      { expr: '4 × 5 = 20', note: 'Je trouve 5.' },
      { expr: 'Chacun a 5 € : le quart de 20 €.', note: `${F(1, 4)} de 20 = 5.` },
    ]],
  ],
  exos: cm1Exos('ce1-n13', [
    ['Quelle est la moitié de 14 ?',
      cm1Redac('Moitié de 14', '7 + 7 = 14', 'La moitié de 14, c\'est 7.')],
    ['Quel est le tiers de 15 ?',
      cm1Redac('Tiers de 15', '3 × 5 = 15', 'Le tiers de 15, c\'est 5.', groupes(15, 3))],
    ['Quel est le quart de 16 ?',
      cm1Redac('Quart de 16', '4 × 4 = 16', 'Le quart de 16, c\'est 4.')],
    ['Une ficelle de 20 cm est coupée en deux morceaux égaux. Combien mesure chaque morceau ?',
      cm1Redac('Les morceaux', '2 × 10 = 20', 'Chaque morceau mesure 10 cm.')],
    ['Une tablette de chocolat a 24 carrés. Léa en mange le quart. Combien de carrés mange-t-elle ?',
      cm1Redac('Carrés de chocolat', '4 × 6 = 24', 'Léa mange 6 carrés.')],
    ['Il y a 30 élèves. Le tiers sont à la chorale. Combien d\'élèves chantent ?',
      cm1Redac('Élèves de la chorale', '3 × 10 = 30', '10 élèves sont à la chorale.')],
    ['Combien font les trois quarts de 8 ?',
      cm1Redac('Trois quarts de 8', { suite: ['4 × 2 = 8', '3 × 2 = 6'] }, 'Un quart de 8, c\'est 2 ; les trois quarts de 8, c\'est 6.', groupes(8, 4, 3))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : partager l\'héritage', [
    'De nombreux vieux problèmes parlent de partages : un père laisse 17 chameaux à ses trois fils, à partager en moitié, tiers et neuvième… Impossible de couper un chameau en morceaux !',
    'Un sage prête alors son chameau : avec 18 chameaux, le premier fils en reçoit 9 (la moitié), le deuxième 6 (le tiers), le troisième 2 (le neuvième). Total : 17. Le sage reprend son chameau ! Cette histoire est racontée depuis des siècles.',
  ]),
  quiz: [
    { q: 'La moitié de 10, c\'est…', opts: ['5', '20', '2'], correct: 0 },
    { q: 'Le quart de 12, c\'est…', opts: ['3', '4', '48'], correct: 0 },
    { q: 'Le tiers de 9, c\'est…', opts: ['3', '27', '6'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'La moitié de 20 :', r: ['10', '40', '5', '2'], ok: 0 },
    { l: 1, q: 'La moitié de 16 :', r: ['8', '32', '6', '4'], ok: 0 },
    { l: 2, q: 'Le tiers de 6 :', r: ['2', '3', '18', '9'], ok: 0 },
    { l: 2, q: 'Le quart de 8 :', r: ['2', '4', '32', '6'], ok: 0 },
    { l: 3, q: 'Une bande de 10 cm pliée en deux : …', r: ['5 cm', '20 cm', '2 cm', '10 cm'], ok: 0 },
    { l: 4, q: 'Les trois quarts de 4 :', r: ['3', '1', '12', '7'], ok: 0 },
  ],
});
})();

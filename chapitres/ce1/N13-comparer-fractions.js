/* ============================================================
   CHAPITRE : Comparer, ajouter, retirer des fractions (CE1, N13, période 4)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1 : toujours des fractions d'un tout
   (dénominateur 2, 3, 4, 5, 6, 8 ou 10, inférieures ou égales à 1). Comparer des fractions de même
   dénominateur (2/5 < 3/5) et des fractions de numérateur 1 (1/5 < 1/3 : plus de parts, plus
   petites) ; premières relations (trois fois un sixième font un demi) ; additionner et soustraire des
   fractions de même dénominateur (1/5 + 2/5, 2/3 − 1/3), en verbalisant ; 2/5 + 3/5 = 1 ; trouver le
   complément d'une fraction par rapport au tout (3/10 en bleu, le reste en rouge).
   Pour aller plus loin (CM1) : le tiers, le quart d'une quantité (le tiers de 12 billes).
   Pensé pour être projeté : les bandes pareilles posées l'une sous l'autre.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const F = (a, b) => cm1Frac(a, b);
const ROUGE = '#E35D3A', BLEU = '#2EA8C9';
// Une bande partagée en n parts égales, chaque part avec sa couleur (cols : liste de couleurs, '' = blanc).
function bande(n, cols, px, L){
  L = L || 240; let s = '';
  for(let i = 0; i < n; i++){ const c = cols[i] || ''; s += `<rect x="${6 + i * L / n}" y="6" width="${L / n}" height="46" fill="${c || '#fff'}" fill-opacity="${c ? .8 : 1}" stroke="${CPC.bord}" stroke-width="2"/>`; }
  s += `<rect x="6" y="6" width="${L}" height="46" fill="none" stroke="${CPC.bord}" stroke-width="2.5"/>`;
  return cpSvg(L + 12, 58, s, px || 220);
}
const R = k => Array(k).fill(ROUGE), Bl = k => Array(k).fill(BLEU);
// Une quantité partagée en n groupes égaux (jetons), avec k groupes colorés.
function groupes(total, n, k){
  const g = total / n; let s = '';
  for(let i = 0; i < n; i++){ const x0 = 4 + i * (Math.min(g, 4) * 20 + 22);
    s += `<rect x="${x0}" y="4" width="${Math.min(g, 4) * 20 + 12}" height="${Math.ceil(g / 4) * 20 + 12}" rx="8" fill="${i < (k || 1) ? '#FDE3D2' : '#fff'}" stroke="${CPC.bord}" stroke-width="1.5"/>`;
    for(let j = 0; j < g; j++) s += `<circle cx="${x0 + 16 + (j % 4) * 20}" cy="${20 + Math.floor(j / 4) * 20}" r="7.5" fill="${i < (k || 1) ? CPC.jeton : CPC.jeton2}" stroke="${CPC.bord}"/>`; }
  return cpSvg(n * (Math.min(g, 4) * 20 + 22) + 6, Math.ceil(g / 4) * 20 + 20, s);
}

cm1Chapitre({
  niveau: 'ce1', titre: 'Comparer, ajouter, retirer des fractions', slug: 'comparer-fractions',
  cours: `
${cm1Lecon(1, 'Même dénominateur : on compare les numérateurs')}
${cm1Def(`${lig(bande(5, R(2)))}${P(F(2, 5))}${lig(bande(5, R(3)))}${P(F(3, 5))}${P(`Les deux bandes sont pareilles et partagées en 5 parts égales. Deux parts, c'est moins que trois parts : <b>${F(2, 5)} est plus petit que ${F(3, 5)}</b>.`)}`, 'Des parts de même taille')}
${cm1Regle(`Quand le dénominateur est le même, les parts ont la même taille : la plus grande fraction est celle qui a le plus de parts, donc le plus grand numérateur.${cm1Liste([`${F(2, 5)} &lt; ${F(3, 5)}`, `${F(7, 8)} &gt; ${F(5, 8)}`])}`, 'Comparer')}

${cm1Lecon(2, 'Numérateur 1 : plus de parts, plus petites')}
${ce1AnimFraction('ce1-n13-frac', { n: 3, k: 1, forme: 'bande', legende: 'Partage la même bande en 3, puis en 6 : chaque part devient plus petite.' })}
${cm1Def(`${lig(bande(3, R(1)))}${P(F(1, 3))}${lig(bande(6, Bl(1)))}${P(F(1, 6))}${P(`La même bande est partagée en 3, puis en 6 parts égales. Une part sur 6 est plus petite qu'une part sur 3 : <b>${F(1, 3)} est plus grand que ${F(1, 6)}</b>, même si 6 est plus grand que 3 !`)}`, 'Un tiers ou un sixième ?')}
${cm1Regle(`Plus on partage l'unité en parts nombreuses, plus chaque part est petite :${cm1Liste([`${F(1, 2)} &gt; ${F(1, 3)} &gt; ${F(1, 4)} &gt; ${F(1, 5)}`, `${F(1, 8)} &lt; ${F(1, 6)}`])}`, 'Comparer des parts')}
${cm1Def(`${lig(bande(2, R(1)))}${lig(bande(6, Bl(3)))}${P(`Trois fois un sixième, c'est un demi : ${ce1SommeUnit(3, 6)} = ${F(1, 2)}. Deux fois un sixième, c'est un tiers.`)}`, 'Des parts qui se retrouvent')}
${cm1Astuce('Un gâteau partagé entre 6 enfants donne des parts plus petites que le même gâteau partagé entre 3 !')}

${cm1Lecon(3, 'Ajouter et retirer des parts')}
${ce2AnimFracAdd('ce1-n13-add', { legende: 'Les parts rouges viennent se placer à la suite des parts bleues.', presets: [{ nom: `1/5 + 2/5`, n: 5, x: 1, y: 2 }, { nom: `3/8 + 4/8`, n: 8, x: 3, y: 4 }, { nom: `2/6 + 3/6`, n: 6, x: 2, y: 3 }] })}
${cm1Def(`${lig(bande(5, [...R(1), ...Bl(2)]))}${P(`Un cinquième plus deux cinquièmes, cela fait trois cinquièmes : <b>${F(1, 5)} + ${F(2, 5)} = ${F(3, 5)}</b>.`)}`, 'Ajouter')}
${cm1Def(`${lig(bande(3, R(2)))}${lig(bande(3, R(1)))}${P(`Deux tiers moins un tiers, cela fait un tiers : <b>${F(2, 3)} − ${F(1, 3)} = ${F(1, 3)}</b>.`)}`, 'Retirer')}
${cm1Regle('Quand les dénominateurs sont les mêmes, les parts ont la même taille : on ajoute (ou on retire) les parts, et le dénominateur ne change pas.', 'Même dénominateur')}

${cm1Lecon(4, 'Compléter jusqu\'à l\'unité')}
${cm1Def(`${lig(bande(5, [...R(2), ...Bl(3)]))}${P(`Deux cinquièmes plus trois cinquièmes, cela fait cinq cinquièmes, c'est-à-dire le tout : <b>${F(2, 5)} + ${F(3, 5)} = 1</b>.`)}`, 'Le tout')}
${cm1Regle(`Lucie colorie ${F(3, 10)} d'une figure en bleu et le reste en rouge. Il y a 10 parts : 3 en bleu, il en reste 7. Le rouge, c'est ${F(7, 10)}.${lig(bande(10, [...Bl(3), ...R(7)], 240))}`, 'Le complément')}

${ce1PlusLoin('le tiers, le quart d\'une quantité', 'CM1')}
${cm1Rem('Au CE1, on sait trouver la moitié d\'un nombre pair (la moitié de 12, c\'est 6). Prendre le tiers ou le quart d\'une quantité avec une fraction sera étudié au CM1.')}
${ce2AnimPartage('ce1-n13-partage', { legende: 'On partage en parts égales : une part, c\'est la moitié (2 parts), le tiers (3 parts) ou le quart (4 parts).', presets: [{ nom: 'La moitié de 12', total: 12, parts: 2 }, { nom: 'Le tiers de 12', total: 12, parts: 3 }, { nom: 'Le quart de 12', total: 12, parts: 4 }] })}
${cm1Def(`${lig(groupes(12, 3))}${P(`Le <b>tiers</b> de 12 (${F(1, 3)} de 12), c'est <b>4</b>, car 3 × 4 = 12.`)}${lig(groupes(12, 4))}${P(`Le <b>quart</b> de 12 (${F(1, 4)} de 12), c'est <b>3</b>, car 4 × 3 = 12.`)}`, 'Tiers et quart de 12')}
`,
  methode: `
${cm1Demo('ce1-n13-m-comparer', 'Comparer deux fractions', 'Qui est le plus grand : ' + cm1Frac(1, 4) + ' ou ' + cm1Frac(1, 8) + ' ?')}
${cm1Demo('ce1-n13-m-complement', 'Trouver ce qui reste', 'Zoé a mangé ' + cm1Frac(3, 8) + ' d\'une tarte. Quelle fraction reste-t-il ?')}
`,
  demos: [
    ['ce1-n13-m-comparer', [
      { expr: 'Les numérateurs sont les mêmes : 1.', note: 'On compare la taille des parts.' },
      { expr: 'Je partage la même bande en 4, puis en 8.', note: 'Les parts en 8 sont plus petites.', fig: bande(4, R(1), 200) + '<br>' + bande(8, Bl(1), 200) },
      { expr: `${F(1, 4)} &gt; ${F(1, 8)}`, note: 'Un quart est plus grand qu\'un huitième.' },
    ]],
    ['ce1-n13-m-complement', [
      { expr: 'La tarte entière, c\'est 8 huitièmes.', note: `${F(8, 8)} = 1`, fig: bande(8, R(3), 200) },
      { expr: '8 parts − 3 parts = 5 parts', note: 'Je compte les parts qui restent.' },
      { expr: `${F(8, 8)} − ${F(3, 8)} = ${F(5, 8)}`, note: `Il reste ${F(5, 8)} de la tarte.` },
    ]],
  ],
  exos: cm1Exos('ce1-n13', [
    [`Compare avec &lt; ou &gt; : ${F(4, 6)} … ${F(2, 6)}`,
      cm1Redac('Comparaison', `${F(4, 6)} &gt; ${F(2, 6)}`, 'Les parts sont des sixièmes, de même taille : 4 parts, c\'est plus que 2 parts.')],
    [`Compare avec &lt; ou &gt; : ${F(1, 5)} … ${F(1, 3)}`,
      cm1Redac('Comparaison', `${F(1, 5)} &lt; ${F(1, 3)}`, 'En partageant en 5, les parts sont plus petites qu\'en partageant en 3.', bande(5, R(1), 180) + '<br>' + bande(3, Bl(1), 180))],
    [`Range dans l'ordre croissant : ${F(1, 2)} ; ${F(1, 10)} ; ${F(1, 4)}`,
      cm1Redac('Ordre croissant', `${F(1, 10)} &lt; ${F(1, 4)} &lt; ${F(1, 2)}`, 'Plus il y a de parts, plus chaque part est petite.')],
    [`Calcule : ${F(1, 5)} + ${F(2, 5)}`,
      cm1Redac('Somme', `${F(1, 5)} + ${F(2, 5)} = ${F(3, 5)}`, 'Un cinquième plus deux cinquièmes, cela fait trois cinquièmes.', bande(5, [...R(1), ...Bl(2)], 180))],
    [`Calcule : ${F(5, 8)} − ${F(2, 8)}`,
      cm1Redac('Différence', `${F(5, 8)} − ${F(2, 8)} = ${F(3, 8)}`, 'Cinq huitièmes moins deux huitièmes, cela fait trois huitièmes.')],
    [`Calcule : ${F(2, 5)} + ${F(3, 5)}`,
      cm1Redac('Somme', `${F(2, 5)} + ${F(3, 5)} = ${F(5, 5)} = 1`, 'Cinq cinquièmes, c\'est le tout.', bande(5, [...R(2), ...Bl(3)], 180))],
    [`Lucie a colorié ${F(3, 10)} d'une figure en bleu et le reste en rouge. Quelle fraction de la figure est coloriée en rouge ?`,
      cm1Redac('Partie rouge', `${F(10, 10)} − ${F(3, 10)} = ${F(7, 10)}`, `La partie rouge, c'est ${F(7, 10)} de la figure.`, bande(10, [...Bl(3), ...R(7)], 220))],
    [`Pour aller plus loin : quel est le tiers de 15 ?`,
      cm1Redac('Tiers de 15', '3 × 5 = 15', 'Le tiers de 15, c\'est 5.', groupes(15, 3))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : partager l\'héritage', [
    'De nombreux vieux problèmes parlent de partages : un père laisse 17 chameaux à ses trois fils, à partager en moitié, tiers et neuvième… Impossible de couper un chameau en morceaux !',
    'Un sage prête alors son chameau : avec 18 chameaux, le premier fils en reçoit 9 (la moitié), le deuxième 6 (le tiers), le troisième 2 (le neuvième). Total : 17. Le sage reprend son chameau ! Cette histoire est racontée depuis des siècles.',
  ]),
  quiz: [
    { q: 'Le plus grand :', opts: ['3/5', '2/5', '1/5'], correct: 0 },
    { q: 'Le plus grand :', opts: ['1/3', '1/6', '1/8'], correct: 0 },
    { q: '1/4 + 2/4 = …', opts: ['3/4', '3/8', '2/4'], correct: 0 },
    { q: '3/10 en bleu, le reste en rouge. Le rouge, c\'est…', opts: ['7/10', '3/10', '10/3'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Le plus grand : 2/6 ou 5/6 ?', r: ['5/6', '2/6', 'Pareil', 'On ne sait pas'], ok: 0 },
    { l: 1, q: '3/8 … 7/8', r: ['&lt;', '&gt;', '=', '+'], ok: 0 },
    { l: 2, q: 'Le plus grand : 1/3 ou 1/6 ?', r: ['1/3', '1/6', 'Pareil', 'On ne sait pas'], ok: 0 },
    { l: 2, q: 'Le plus petit : 1/2 ou 1/10 ?', r: ['1/10', '1/2', 'Pareil', 'On ne sait pas'], ok: 0 },
    { l: 3, q: '1/5 + 2/5 = …', r: ['3/5', '3/10', '2/5', '1'], ok: 0 },
    { l: 3, q: '2/3 − 1/3 = …', r: ['1/3', '1', '3/3', '0'], ok: 0 },
    { l: 4, q: '2/5 + 3/5 = …', r: ['1', '5/10', '6/5', '1/5'], ok: 0 },
    { l: 4, q: 'J\'ai mangé 1/4 de la pizza. Il reste…', r: ['3/4', '1/4', '4/4', '2/4'], ok: 0 },
  ],
});
})();

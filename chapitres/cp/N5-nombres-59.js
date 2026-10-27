/* ============================================================
   CHAPITRE : Les nombres jusqu'à 59 (CP, N5, période 2)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : dénombrer en groupant par dix,
   dizaines et unités (« 34, c'est 3 dizaines et 4 unités, c'est 30 + 4 »), compter de dix en dix,
   lire et écrire les nombres jusqu'à 59 en chiffres et en lettres, la suite des nombres (le
   suivant, le précédent, passer à la dizaine suivante), le tableau des nombres.
   Pensé pour être projeté : les cubes en vrac se rangent en barres de dix.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Les chiffres des Égyptiens : un bâton pour 1, une anse pour 10.
function egypte(n){
  const d = Math.floor(n / 10), u = n % 10; let s = '', x = 6;
  for(let i = 0; i < d; i++){ s += `<path d="M${x} 46 V22 a10 12 0 0 1 20 0 V46" fill="none" stroke="#8A5A10" stroke-width="4" stroke-linecap="round"/>`; x += 28; }
  for(let i = 0; i < u; i++){ s += `<line x1="${x + 3}" y1="16" x2="${x + 3}" y2="46" stroke="#8A5A10" stroke-width="4" stroke-linecap="round"/>`; x += 12; }
  return cpSvg(x + 6, 52, `<rect x="0" y="0" width="${x + 6}" height="52" rx="6" fill="#F6E7C1"/>` + s);
}

cm1Chapitre({
  niveau: 'cp', titre: 'Les nombres jusqu\'à 59', slug: 'nombres-59',
  cours: `
${cm1Lecon(1, 'Compter de dix en dix')}
${cm1Def(`Chaque barre de dix cubes, c'est <b>une dizaine</b>.${lig(cpBarres(10), cpBarres(20), cpBarres(30), cpBarres(40), cpBarres(50))}${P('<b>dix, vingt, trente, quarante, cinquante</b>')}`, 'Les dizaines')}
${cm1Liste(['1 dizaine, c\'est 10 (dix) ;', '2 dizaines, c\'est 20 (vingt) ;', '3 dizaines, c\'est 30 (trente) ;', '4 dizaines, c\'est 40 (quarante) ;', '5 dizaines, c\'est 50 (cinquante).'])}
${cm1Astuce('On compte les barres en disant « dix, vingt, trente… » : c\'est bien plus rapide que de compter tous les cubes un par un.')}

${cm1Lecon(2, 'Dizaines et unités')}
${cpAnimGrouper('cp-n5-grouper', { n: 34, max: 59 })}
${cm1Def(`${lig(cpBarres(34, { q: 14 }))}${P('<b>34</b>, c\'est <b>3 dizaines</b> et <b>4 unités</b>.')}${P('34 = 30 + 4')}`, 'Dizaines et unités')}
${cm1Regle(`Dans un nombre à deux chiffres :${cm1Liste(['le chiffre de <b>gauche</b> dit combien il y a de <b>dizaines</b> ;', 'le chiffre de <b>droite</b> dit combien il y a d\'<b>unités</b>.'])}${P('<span style="font-size:1.8rem;font-weight:700;"><span style="color:#2E9C6A;">3</span><span style="color:#2EA8C9;">4</span></span>')}`)}
${cm1Rem('Au tableau : on peut aussi utiliser des bûchettes et des élastiques, ou des boîtes de dix. 43 et 34, ce n\'est pas pareil : dans 43, il y a 4 dizaines !')}

${cm1Lecon(3, 'Lire et écrire les nombres')}
${cm1Def(`${cm1Liste(['<b>21</b> : vingt-et-un', '<b>22</b> : vingt-deux', '<b>35</b> : trente-cinq', '<b>41</b> : quarante-et-un', '<b>58</b> : cinquante-huit'])}`, 'En lettres')}
${cm1Regle('On dit d\'abord le nombre de dizaines (vingt, trente, quarante, cinquante), puis les unités. Pour 21, 31, 41 et 51, on dit « et un », et on l\'écrit avec des traits d\'union : <b>vingt-et-un</b>.')}
<div class="cpn-fiches">${[23, 31, 46, 57].map(n => `<div class="cpn-fiche"><div class="cpn-fiche-n">${n}</div><div class="cpn-fiche-mot">${cpMot(n)}</div>${cpBarres(n, { q: 9 })}<div style="font-size:.9rem;">${n - n % 10} + ${n % 10}</div></div>`).join('')}</div>

${cm1Lecon(4, 'La suite des nombres jusqu\'à 59')}
${cm1Def(`Dans le <b>tableau des nombres</b>, chaque ligne commence par une dizaine.${lig(cpTableau(0, 59, { c: 32, colonne: 0 }))}`, 'Le tableau des nombres')}
${cm1Regle(`Après 29, il y a 30 : 29 et encore 1, cela fait une nouvelle dizaine.${lig(cpBande(27, 33, { on: [30], c: 38 }))}${P('Après 39, il y a 40. Après 49, il y a 50.')}`)}
${cm1Astuce('Dans le tableau : en avançant d\'une case vers la droite, on ajoute 1 ; en descendant d\'une ligne, on ajoute 10.')}
`,
  methode: `
${cm1Demo('cp-n5-m-compter', 'Compter une grande collection', 'Combien y a-t-il de cubes ?')}
${cm1Demo('cp-n5-m-ecrire', 'Écrire un nombre dicté', 'La maîtresse dit : « quarante-sept ». Écris ce nombre en chiffres.')}
`,
  demos: [
    ['cp-n5-m-compter', [
      { expr: 'Je fais des barres de dix.', note: 'Je range les cubes par dix.', fig: cpBarres(42, { q: 11 }) },
      { expr: 'Je compte les barres : dix, vingt, trente, quarante.', note: '4 barres : 4 dizaines.' },
      { expr: 'Je compte les cubes seuls : 41, 42.', note: '2 unités.' },
      { expr: '40 + 2 = 42', note: 'Il y a <b>42</b> cubes (quarante-deux).' },
    ]],
    ['cp-n5-m-ecrire', [
      { expr: '« Quarante… »', note: 'Quarante, c\'est 4 dizaines : j\'écris <b>4</b> à gauche.' },
      { expr: '« … sept »', note: 'Sept, ce sont les unités : j\'écris <b>7</b> à droite.' },
      { expr: '47', note: '4 dizaines et 7 unités : 47 = 40 + 7.', fig: cpBarres(47, { q: 10 }) },
    ]],
  ],
  exos: cm1Exos('cp-n5', [
    [`Combien y a-t-il de cubes ?${lig(cpBarres(36))}`,
      cm1Redac('Nombre de cubes', '30 + 6 = 36', '3 barres de dix et 6 cubes : il y a 36 cubes.')],
    ['Écris en chiffres : quarante-deux.',
      cm1Redac('Quarante-deux', '40 + 2 = 42', 'Quarante-deux s\'écrit 42 : 4 dizaines et 2 unités.', cpBarres(42, { q: 9 }))],
    ['Dans 53, combien y a-t-il de dizaines ? Combien d\'unités ?',
      cm1Redac('Dizaines et unités de 53', '53 = 50 + 3', '53, c\'est 5 dizaines et 3 unités.', cpBarres(53, { q: 9 }))],
    ['Quel nombre vient juste après 39 ? Et juste avant 50 ?',
      cm1Redac('Après 39, avant 50', { suite: ['39 + 1 = 40', '50 − 1 = 49'] }, 'Juste après 39, il y a 40. Juste avant 50, il y a 49.', cpBande(38, 41, { on: [40], c: 30 }))],
    [`Complète ce morceau du tableau des nombres.${lig(cpTableau(20, 39, { trous: [24, 27, 31, 35, 38], c: 30 }))}`,
      cm1Redac('Les nombres qui manquent', { suite: ['24, 27', '31, 35, 38'] }, 'Les nombres qui manquent sont 24, 27, 31, 35 et 38.', cpTableau(20, 39, { on: [24, 27, 31, 35, 38], c: 22 }))],
    ['Écris en lettres : 31.',
      cm1Redac('31 en lettres', '31 = 30 + 1', '31 s\'écrit trente-et-un.')],
    ['Le fermier range ses œufs par boîtes de 10. Il a rempli 4 boîtes et il lui reste 5 œufs. Combien a-t-il d\'œufs ?',
      cm1Redac('Œufs du fermier', '40 + 5 = 45', 'Le fermier a 45 œufs.', cpBarres(45, { q: 9 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les nombres des Égyptiens', [
    `Il y a environ 5 000 ans, les <b>Égyptiens</b> écrivaient déjà les nombres en faisant des dizaines. Un bâton valait 1, une <b>anse</b> valait 10. Pour écrire 34, ils dessinaient 3 anses et 4 bâtons :${lig(egypte(34))}`,
    'C\'est exactement comme nos barres de dix et nos cubes ! Aujourd\'hui, on n\'a plus besoin de dessiner : le chiffre de gauche dit le nombre de dizaines, le chiffre de droite le nombre d\'unités.',
  ]),
  quiz: [
    { q: `Combien y a-t-il de cubes ?${lig(cpBarres(25, { q: 10 }))}`, opts: ['52', '25', '7'], correct: 1 },
    { q: 'Trente-huit s\'écrit…', opts: ['308', '38', '83'], correct: 1 },
    { q: 'Juste après 49, il y a…', opts: ['40', '50', '410'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '3 dizaines, c\'est…', r: ['3', '30', '13', '300'], ok: 1 },
    { l: 1, q: 'Quarante, c\'est combien de dizaines ?', r: ['4', '40', '10', '14'], ok: 0 },
    { l: 2, q: `Combien de cubes ?${lig(cpBarres(23, { q: 8 }))}`, r: ['32', '23', '5', '203'], ok: 1 },
    { l: 2, q: '50 + 4 = …', r: ['504', '54', '45', '9'], ok: 1 },
    { l: 2, q: 'Dans 47, le chiffre des dizaines est…', r: ['7', '4', '47', '11'], ok: 1 },
    { l: 3, q: 'Vingt-et-un s\'écrit…', r: ['201', '21', '12', '31'], ok: 1 },
    { l: 3, q: 'Cinquante-six s\'écrit…', r: ['56', '65', '506', '11'], ok: 0 },
    { l: 4, q: 'Juste après 29, il y a…', r: ['20', '30', '210', '28'], ok: 1 },
    { l: 4, q: 'Juste avant 40, il y a…', r: ['41', '39', '30', '49'], ok: 1 },
  ],
});
})();

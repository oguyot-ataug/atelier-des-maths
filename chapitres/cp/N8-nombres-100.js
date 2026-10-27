/* ============================================================
   CHAPITRE : Les nombres jusqu'à 100 (CP, N8, période 3)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP : dénombrer, lire, écrire et
   décomposer les nombres jusqu'à 100 (dizaines et unités) ; les mots irréguliers de 60 à 99
   (soixante-dix, quatre-vingts, quatre-vingt-dix) ; le tableau des nombres ; cent, c'est dix dizaines.
   Pensé pour être projeté : le mot découpé (soixante-quatorze = 60 + 14) et les barres qui se rangent.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'cp', titre: 'Les nombres jusqu\'à 100', slug: 'nombres-100',
  cours: `
${cm1Lecon(1, 'Les dizaines jusqu\'à 100')}
${cm1Def(`${cm1Liste(['6 dizaines : <b>60</b>, soixante ;', '7 dizaines : <b>70</b>, soixante-dix ;', '8 dizaines : <b>80</b>, quatre-vingts ;', '9 dizaines : <b>90</b>, quatre-vingt-dix ;', '10 dizaines : <b>100</b>, cent.'])}${lig(cpBarres(100, { q: 9 }))}${P('<b>100</b>, c\'est <b>10 dizaines</b> : une <b>centaine</b>.')}`, 'Compter de dix en dix')}
${cpAnimGrouper('cp-n8-grouper', { n: 67, max: 99, legende: 'Choisissez un nombre jusqu\'à 99 : les cubes se rangent en barres de dix, puis on compte les barres.' })}

${cm1Lecon(2, 'Des mots qui jouent des tours')}
${cpAnimMot('cp-n8-mot')}
${cm1Regle(`En français, certains mots ne disent pas directement les dizaines :${cm1Liste(['<b>soixante-dix</b>, c\'est 60 + 10 = 70 ;', '<b>soixante-quatorze</b>, c\'est 60 + 14 = 74 ;', '<b>quatre-vingts</b>, c\'est 4 fois 20 = 80 ;', '<b>quatre-vingt-dix-sept</b>, c\'est 80 + 17 = 97.'])}`, 'Attention')}
${cm1Rem('En Belgique et en Suisse, on dit « septante » pour 70 et « nonante » pour 90 : c\'est plus simple ! En Suisse, on dit aussi « huitante » pour 80.')}

${cm1Lecon(3, 'Dizaines et unités')}
${cm1Def(`${lig(cpBarres(86, { q: 9 }))}${P('<b>86</b> : 8 dizaines et 6 unités. 86 = 80 + 6.')}`, 'Décomposer')}
<div class="cpn-fiches">${[62, 75, 81, 93].map(n => `<div class="cpn-fiche"><div class="cpn-fiche-n">${n}</div><div class="cpn-fiche-mot">${cpMot(n)}</div><div style="font-size:.9rem;">${Math.floor(n / 10)} dizaines et ${n % 10} unité${n % 10 > 1 ? 's' : ''}</div></div>`).join('')}</div>

${cm1Lecon(4, 'Le tableau des nombres jusqu\'à 99')}
${cm1Def(`${lig(cpTableau(0, 99, { c: 30, colonne: 0 }))}`, 'Le tableau')}
${cm1Regle('Dans une même <b>ligne</b>, tous les nombres ont le même chiffre des dizaines. Dans une même <b>colonne</b>, ils ont le même chiffre des unités. Après 99 vient <b>100</b>.')}
`,
  methode: `
${cm1Demo('cp-n8-m-ecrire', 'Écrire un nombre dicté : soixante-dix-huit', 'Écris en chiffres le nombre « soixante-dix-huit ».')}
${cm1Demo('cp-n8-m-lire', 'Lire un nombre : 94', 'Comment dit-on 94 ?')}
`,
  demos: [
    ['cp-n8-m-ecrire', [
      { expr: '« soixante » + « dix-huit »', note: 'J\'entends deux morceaux.' },
      { expr: '60 + 18 = 78', note: 'Je les ajoute.' },
      { expr: '78', note: '7 dizaines et 8 unités.', fig: cpBarres(78, { q: 8 }) },
    ]],
    ['cp-n8-m-lire', [
      { expr: '94 = 90 + 4', note: '9 dizaines et 4 unités.' },
      { expr: '90 = 80 + 10', note: '90, c\'est « quatre-vingt-dix ».' },
      { expr: '94 = 80 + 14', note: 'On dit : quatre-vingt-<b>quatorze</b>.' },
    ]],
  ],
  exos: cm1Exos('cp-n8', [
    [`Combien y a-t-il de cubes ?${lig(cpBarres(64, { q: 9 }))}`,
      cm1Redac('Nombre de cubes', '60 + 4 = 64', '6 barres de dix et 4 cubes : il y a 64 cubes.')],
    ['Écris en chiffres : soixante-douze.',
      cm1Redac('Soixante-douze', '60 + 12 = 72', 'Soixante-douze s\'écrit 72.')],
    ['Écris en chiffres : quatre-vingt-cinq.',
      cm1Redac('Quatre-vingt-cinq', '80 + 5 = 85', 'Quatre-vingt-cinq s\'écrit 85.')],
    ['Écris en lettres : 91.',
      cm1Redac('91 en lettres', '91 = 80 + 11', '91 s\'écrit quatre-vingt-onze.')],
    ['Combien de dizaines y a-t-il dans 100 ?',
      cm1Redac('Dizaines dans 100', { suite: ['10, 20, 30, 40, 50', '60, 70, 80, 90, 100'] }, 'En comptant de dix en dix, on dit 10 nombres pour arriver à 100 : il y a 10 dizaines dans 100.', cpBarres(100, { q: 6 }))],
    [`Complète ce morceau du tableau.${lig(cpTableau(70, 89, { trous: [73, 79, 80, 86], c: 30 }))}`,
      cm1Redac('Les nombres qui manquent', { suite: ['73, 79', '80, 86'] }, 'Les nombres qui manquent sont 73, 79, 80 et 86.', cpTableau(70, 89, { on: [73, 79, 80, 86], c: 22 }))],
    ['La maîtresse range 58 crayons dans des pots de 10. Combien de pots pleins remplit-elle ? Combien de crayons restent ?',
      cm1Redac('Les pots de crayons', '58 = 50 + 8', 'Elle remplit 5 pots pleins et il reste 8 crayons.', cpBarres(58, { q: 8 }))],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi « quatre-vingts » ?', [
    'Il y a très longtemps, les <b>Gaulois</b> et d\'autres peuples comptaient peut-être par <b>vingt</b> (avec les doigts des mains et des pieds !). « Quatre-vingts », c\'est « quatre fois vingt ».',
    'Autrefois, on disait même « six-vingts » pour 120 ! À Paris, l\'hôpital des Quinze-Vingts a été fondé il y a près de 800 ans pour 300 personnes : quinze fois vingt.',
  ]),
  quiz: [
    { q: 'Soixante-dix-neuf s\'écrit…', opts: ['6019', '79', '69'], correct: 1 },
    { q: '100, c\'est…', opts: ['10 dizaines', '100 dizaines', '1 dizaine'], correct: 0 },
    { q: 'Quatre-vingt-trois s\'écrit…', opts: ['423', '83', '73'], correct: 1 },
  ],
  flash: [
    { l: 1, q: '8 dizaines, c\'est…', r: ['80', '8', '18', '800'], ok: 0 },
    { l: 1, q: 'Après 99, il y a…', r: ['910', '100', '98', '1000'], ok: 1 },
    { l: 2, q: 'Soixante-dix s\'écrit…', r: ['610', '70', '60', '17'], ok: 1 },
    { l: 2, q: 'Quatre-vingt-dix s\'écrit…', r: ['4 20 10', '90', '80', '810'], ok: 1 },
    { l: 2, q: '76 se dit…', r: ['soixante-seize', 'septante-six', 'soixante-six', 'sept-six'], ok: 0 },
    { l: 3, q: 'Dans 58, combien de dizaines ?', r: ['8', '5', '58', '13'], ok: 1 },
    { l: 3, q: '90 + 7 = …', r: ['97', '907', '79', '16'], ok: 0 },
    { l: 4, q: 'Juste après 69, il y a…', r: ['60', '70', '610', '68'], ok: 1 },
    { l: 4, q: 'Juste avant 80, il y a…', r: ['79', '81', '70', '89'], ok: 0 },
  ],
});
})();

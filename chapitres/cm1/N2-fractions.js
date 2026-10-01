/* ============================================================
   CHAPITRE : Fractions (CM1, N2, période 1)
   Programme du cycle 3 (CM1) : fractions pour exprimer un partage (fractions simples, puis
   dénominateurs ≤ 20 ; fractions décimales jusqu'à 100) ; vocabulaire numérateur/dénominateur ;
   lire, écrire, représenter ; repérer sur une demi-droite graduée ; comparer à 1 ; encadrer entre
   deux entiers consécutifs ; écrire comme somme d'un entier et d'une fraction inférieure à 1.
   La comparaison et les opérations sont dans « Fractions (comparaison et opérations) » (période 2).
   ============================================================ */
(() => {
const F = cm1Frac;
cm1Chapitre({
  titre: 'Fractions', slug: 'fractions',
  cours: `
${cm1Lecon(1, 'Partager une unité en parts égales')}
${cm1Def(`Quand on partage une unité en <b>parts égales</b>, chaque part est une <b>fraction</b> de l'unité.<br>
On partage cette bande en 4 parts égales et on en colorie 3 : on a colorié ${F(3, 4)} de la bande.<div style="margin:8px 0;">${cm1Bande(4, 3)}</div>`)}
${cm1Def(`<div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;"><div style="font-size:1.6rem;">${F('<span style="color:#E35D3A;">3</span>', '<span style="color:#2EA8C9;">4</span>')}</div>
<ul style="margin:0;padding-left:18px;line-height:1.8;"><li>Le <b style="color:#2EA8C9;">dénominateur</b> (en bas) dit en combien de parts égales on a partagé l'unité : 4.</li><li>Le <b style="color:#E35D3A;">numérateur</b> (en haut) dit combien de parts on prend : 3.</li></ul></div>`, 'Vocabulaire')}
${cm1Astuce('Les parts doivent être <b>égales</b> ! Une pizza coupée en 4 morceaux de tailles différentes n\'est pas partagée en quarts.')}

${cm1AnimFraction('cm1-frac', { n: 5, k: 3 })}

${cm1Lecon(2, 'Lire et écrire une fraction')}
${cm1Tableau(['Fraction', 'Se lit', 'Représentation'], [
  [F(1, 2), 'un demi', cm1Disque(2, 1, { taille: 54 })],
  [F(1, 3), 'un tiers', cm1Disque(3, 1, { taille: 54 })],
  [F(3, 4), 'trois quarts', cm1Disque(4, 3, { taille: 54 })],
  [F(2, 5), 'deux cinquièmes', cm1Disque(5, 2, { taille: 54 })],
  [F(7, 10), 'sept dixièmes', cm1Disque(10, 7, { taille: 54 })],
  [F(9, 100), 'neuf centièmes', '—'],
])}
${cm1Regle('À partir de 5, on lit le dénominateur en ajoutant <b>« ième »</b> : cinquièmes, sixièmes, huitièmes, dixièmes, douzièmes, centièmes…<br>Exceptions : 2 → <b>demis</b>, 3 → <b>tiers</b>, 4 → <b>quarts</b>.')}
${cm1Rem(`Les fractions de dénominateur 10 ou 100 s'appellent des <b>fractions décimales</b> : ${F(3, 10)} (trois dixièmes), ${F(45, 100)} (quarante-cinq centièmes). Elles serviront à écrire les nombres à virgule.`)}

${cm1Lecon(3, 'Fractions et unité')}
${cm1Regle(`<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Si le numérateur est <b>plus petit</b> que le dénominateur, la fraction est <b>inférieure à 1</b> : ${F(3, 4)} &lt; 1.</li>
<li>Si le numérateur est <b>égal</b> au dénominateur, la fraction est <b>égale à 1</b> : ${F(4, 4)} = 1 (on a pris toute l'unité).</li>
<li>Si le numérateur est <b>plus grand</b> que le dénominateur, la fraction est <b>supérieure à 1</b> : ${F(7, 4)} &gt; 1 (il faut plus d'une unité).</li></ul>`)}
${cm1Exemple(`${F(7, 4)} : on a besoin de 2 bandes partagées en quarts.`)}
<div class="figure-wrap">${cm1Bande(4, 7, { largeur: 200 })}</div>
${cm1Regle(`${F(7, 4)} = ${F(4, 4)} + ${F(3, 4)} = <b>1 + ${F(3, 4)}</b>. On a écrit la fraction comme la somme d'un <b>entier</b> et d'une fraction <b>inférieure à 1</b>.<br>On peut donc l'<b>encadrer</b> entre deux entiers qui se suivent : 1 &lt; ${F(7, 4)} &lt; 2.`, 'Décomposer')}

${cm1Lecon(4, 'Placer des fractions sur une demi-droite graduée')}
${cm1Regle('Pour placer des quarts, on partage chaque unité (de 0 à 1, de 1 à 2…) en <b>4 parts égales</b>. Chaque petit écart vaut alors un quart.')}
<div class="figure-wrap">${cm1Graduation(3, 4, [[3 / 4, 'A', '#E35D3A'], [7 / 4, 'B', '#2EA8C9'], [2, 'C', '#2E9C6A']])}</div>
${ce2AnimBandeUnite('cm1-fr-bande', { presets: [{ nom: 'Trois quarts', q: 3 }, { nom: 'Sept quarts', q: 7 }, { nom: 'Deux quarts', q: 2 }] })}
${cm1Exemple('Lecture :', [`A est 3 petits écarts après 0 : A correspond à ${F(3, 4)}.`, `B est 7 petits écarts après 0 : B correspond à ${F(7, 4)}, soit 1 + ${F(3, 4)}.`, `C correspond à ${F(8, 4)}, c'est-à-dire 2.`])}

${cm1Lecon(5, 'Prendre une fraction d\'une quantité')}
${cm1Regle(`Pour calculer ${F(1, 4)} de 12 billes, on partage 12 en 4 parts égales. Pour ${F(3, 4)} de 12 billes, on prend 3 de ces parts.`)}
${ce2AnimPartage('cm1-fr-partage', { presets: [{ nom: '12 billes en 4', total: 12, parts: 4, objets: 'billes', fin: `Chaque part a 3 billes : ${F(1, 4)} de 12 billes, c'est <b>3 billes</b>. En prenant 3 parts : ${F(3, 4)} de 12 billes, c'est <b>9 billes</b>.` }] })}
${cm1Redac(`${F(1, 4)} de 12 billes`, '12 ÷ 4 = 3', `${F(1, 4)} de 12 billes, c'est 3 billes.`)}
${cm1Redac(`${F(3, 4)} de 12 billes`, '3 × 3 = 9', `${F(3, 4)} de 12 billes, c'est 9 billes.`)}
`,
  methode: `
${cm1Demo('fr-lire', 'Écrire la fraction coloriée', 'Une tablette de chocolat de 8 carreaux ; on en a mangé 5. Quelle fraction de la tablette a-t-on mangée ?')}
${cm1Demo('fr-decomp', 'Décomposer et encadrer une fraction', `Écris ${F(11, 3)} comme un entier plus une fraction inférieure à 1, puis encadre-la.`)}
${cm1Demo('fr-quantite', 'Calculer une fraction d\'une quantité', `Dans une classe de 24 élèves, les ${F(2, 3)} sont demi-pensionnaires. Combien d'élèves cela représente-t-il ?`)}
`,
  demos: [
    ['fr-lire', [
      { expr: 'Nombre de carreaux en tout : 8', note: 'On compte les parts égales de l\'unité (la tablette entière) : c\'est le dénominateur.' },
      { expr: 'Nombre de carreaux mangés : 5', note: 'On compte les parts prises : c\'est le numérateur.' },
      { expr: `On a mangé ${F(5, 8)} de la tablette.`, note: 'On lit : « cinq huitièmes ». Il reste 3 huitièmes de la tablette.' },
    ]],
    ['fr-decomp', [
      { expr: `${F(11, 3)} : 11 tiers`, note: 'Dans une unité, il y a 3 tiers. On cherche combien d\'unités entières on peut faire avec 11 tiers.' },
      { expr: '3 × 3 = 9', note: 'Avec 9 tiers, on fait 3 unités.' },
      { expr: '9 + 2 = 11', note: 'Il reste 2 tiers.' },
      { expr: `${F(11, 3)} = 3 + ${F(2, 3)}`, note: 'On écrit l\'entier plus la fraction inférieure à 1.' },
      { expr: `3 &lt; ${F(11, 3)} &lt; 4`, note: 'La fraction est comprise entre les deux entiers consécutifs 3 et 4.' },
    ]],
    ['fr-quantite', [
      { expr: '24 ÷ 3 = 8', note: 'Le dénominateur est 3 : on partage les 24 élèves en 3 parts égales. Un tiers, c\'est 8 élèves.' },
      { expr: '2 × 8 = 16', note: 'Le numérateur est 2 : on prend 2 parts.' },
      { expr: `${F(2, 3)} de 24, c'est 16.`, note: 'Réponse : 16 élèves sont demi-pensionnaires.' },
    ]],
  ],
  exos: cm1Exos('fr', [
    [`Écris ces fractions en lettres.${cm1Liste([F(5, 6), F(1, 4), F(3, 10), F(12, 100)])}`,
      cm1Redac('Les fractions en lettres', { suite: [`${F(5, 6)} : cinq sixièmes`, `${F(1, 4)} : un quart`, `${F(3, 10)} : trois dixièmes`, `${F(12, 100)} : douze centièmes`] }, 'À partir de 5, on lit le dénominateur avec « ième » ; 4 se lit « quart ».')],
    [`Écris ces fractions en chiffres.${cm1Liste(['sept huitièmes', 'deux tiers', 'neuf demis'])}`,
      cm1Redac('Les fractions en chiffres', { suite: [`sept huitièmes : ${F(7, 8)}`, `deux tiers : ${F(2, 3)}`, `neuf demis : ${F(9, 2)}`] }, 'Le dénominateur dit en combien de parts on partage, le numérateur combien on en prend.')],
    [`Quelle fraction de la bande est coloriée ?<div style="margin:6px 0;">${cm1Bande(5, 2)}</div>`,
      cm1Redac('Fraction coloriée', '2 parts coloriées sur 5 parts égales', `On a colorié ${F(2, 5)} de la bande (deux cinquièmes).`)],
    [`Classe ces fractions : inférieures à 1, égales à 1 ou supérieures à 1.${cm1Liste([F(6, 5), F(3, 8), F(9, 9), F(13, 10), F(1, 2)])}`,
      cm1Redac('Classement', { suite: [`inférieures à 1 : ${F(3, 8)} et ${F(1, 2)}`, `égale à 1 : ${F(9, 9)}`, `supérieures à 1 : ${F(6, 5)} et ${F(13, 10)}`] }, 'On compare le numérateur et le dénominateur de chaque fraction.')],
    [`Décompose chaque fraction en un entier plus une fraction inférieure à 1, puis encadre-la entre deux entiers consécutifs.${cm1Liste([F(9, 4), F(17, 5)])}`,
      cm1Redac(`Décomposition de ${F(9, 4)}`, [`${F(8, 4)} + ${F(1, 4)}`, `2 + ${F(1, 4)}`], `Donc 2 &lt; ${F(9, 4)} &lt; 3.`)
      + cm1Redac(`Décomposition de ${F(17, 5)}`, { nom: 'B', lignes: [`${F(15, 5)} + ${F(2, 5)}`, `3 + ${F(2, 5)}`] }, `Donc 3 &lt; ${F(17, 5)} &lt; 4.`)],
    [`Quelles fractions correspondent aux points D et E ?${cm1Graduation(2, 3, [[2 / 3, 'D', '#E35D3A'], [5 / 3, 'E', '#2EA8C9']])}`,
      cm1Redac('Valeur d\'un petit écart', 'Chaque unité est partagée en 3.', `Un petit écart vaut ${F(1, 3)}.`)
      + cm1Redac('Points D et E', { suite: [`D : 2 petits écarts, ${F(2, 3)}`, `E : 5 petits écarts, ${F(5, 3)}`] }, `D correspond à ${F(2, 3)} et E à ${F(5, 3)}, c'est-à-dire 1 + ${F(2, 3)}.`)],
    [`Calcule ${F(1, 5)} de 30 €, puis ${F(3, 5)} de 30 €.`,
      cm1Redac(`${F(1, 5)} de 30 €`, '30 ÷ 5 = 6', `${F(1, 5)} de 30 €, c'est 6 €.`)
      + cm1Redac(`${F(3, 5)} de 30 €`, '3 × 6 = 18', `${F(3, 5)} de 30 €, c'est 18 €.`)],
    [`Léa a lu ${F(3, 4)} d'un livre de 80 pages. Combien de pages a-t-elle lues ? Combien lui en reste-t-il ?`,
      cm1Redac('Un quart du livre', '80 ÷ 4 = 20', 'Un quart du livre, c\'est 20 pages.')
      + cm1Redac('Pages lues', '3 × 20 = 60', 'Léa a lu 60 pages.')
      + cm1Redac('Pages restantes', '80 − 60 = 20', 'Il lui reste 20 pages à lire.')],
  ], { titre: 'Rédaction type : « Calculer une fraction d\'une quantité »', lignes: [[`${F(3, 4)} de 20`, 'Je partage 20 en 4 parts égales : 20 ÷ 4 = 5.'], ['3 × 5 = 15', 'Je prends 3 parts.'], [`${F(3, 4)} de 20 = 15`, 'Je conclus par une phrase.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les fractions de l\'Œil d\'Horus', [
    'Il y a plus de 3 500 ans, les <b>Égyptiens</b> utilisaient déjà des fractions pour partager le grain, la bière ou les terres. Ils écrivaient presque uniquement des fractions de numérateur 1 : un demi, un tiers, un quart…',
    'Pour mesurer les céréales, les scribes utilisaient les morceaux d\'un dessin célèbre, l\'<b>Œil d\'Horus</b> : chaque partie de l\'œil valait une fraction (un demi, un quart, un huitième, un seizième, un trente-deuxième et un soixante-quatrième).',
    'La barre horizontale qui sépare le numérateur du dénominateur est bien plus récente : elle a été popularisée par des savants arabes, puis par <b>Fibonacci</b> au XIII<sup>e</sup> siècle.',
  ]),
  quiz: [
    { q: 'Dans la fraction 5/8, le dénominateur est…', opts: ['5', '8', '13'], correct: 1 },
    { q: 'Comment se lit 3/4 ?', opts: ['trois quatre', 'trois quarts', 'trois quatrièmes'], correct: 1 },
    { q: 'Quelle fraction est supérieure à 1 ?', opts: ['4/7', '7/7', '9/7'], correct: 2 },
    { q: '1/4 de 20 billes, c\'est…', opts: ['4 billes', '5 billes', '16 billes'], correct: 1 },
  ],
});
})();

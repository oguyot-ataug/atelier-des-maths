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
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`); // fraction en ligne (consignes des planches)
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
  // Planches d'exercices imprimables (planches.js) : une par grande notion du chapitre ; { col: 1 } =
  // demi-largeur (deux exercices côte à côte), { cahier: true } = rédaction dans le cahier.
  planches: [
    { titre: 'Partager et colorier', duree: '30 min',
      attendus: ['Utiliser une fraction pour dire un partage en parts égales', 'Lire et écrire une fraction'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Écris la fraction de chaque figure qui est coloriée.',
          eleve: plGrille([`${cm1Bande(4, 3, { largeur: 100 })} ${plFrac()}`, `${cm1Disque(3, 1, { taille: 54 })} ${plFrac()}`, `${cm1Bande(5, 2, { largeur: 100 })} ${plFrac()}`, `${cm1Disque(6, 5, { taille: 54 })} ${plFrac()}`]),
          corr: plGrille([`${cm1Bande(4, 3, { largeur: 100 })} ${plRep(F(3, 4))}`, `${cm1Disque(3, 1, { taille: 54 })} ${plRep(F(1, 3))}`, `${cm1Bande(5, 2, { largeur: 100 })} ${plRep(F(2, 5))}`, `${cm1Disque(6, 5, { taille: 54 })} ${plRep(F(5, 6))}`]) },
        { etoiles: 1, col: 1, consigne: 'Colorie la fraction demandée de chaque bande.',
          eleve: plGrille([`${F(1, 4)} ${cm1Bande(4, 0, { largeur: 110 })}`, `${F(3, 8)} ${cm1Bande(8, 0, { largeur: 110 })}`, `${F(2, 3)} ${cm1Bande(3, 0, { largeur: 110 })}`, `${F(7, 10)} ${cm1Bande(10, 0, { largeur: 110 })}`], 2),
          corr: plGrille([`${F(1, 4)} ${cm1Bande(4, 1, { largeur: 110 })}`, `${F(3, 8)} ${cm1Bande(8, 3, { largeur: 110 })}`, `${F(2, 3)} ${cm1Bande(3, 2, { largeur: 110 })}`, `${F(7, 10)} ${cm1Bande(10, 7, { largeur: 110 })}`], 2) },
        { etoiles: 2, col: 1, consigne: 'Écris chaque fraction en lettres.',
          eleve: plGrille([`${F(1, 2)} : ${plPointilles(14)}`, `${F(3, 4)} : ${plPointilles(14)}`, `${F(2, 3)} : ${plPointilles(14)}`, `${F(5, 8)} : ${plPointilles(14)}`], 1),
          corr: plGrille([`${F(1, 2)} : ${plRep('un demi')}`, `${F(3, 4)} : ${plRep('trois quarts')}`, `${F(2, 3)} : ${plRep('deux tiers')}`, `${F(5, 8)} : ${plRep('cinq huitièmes')}`], 1) },
        { etoiles: 2, col: 1, consigne: 'Écris chaque fraction en chiffres.',
          eleve: plGrille([`sept dixièmes : ${plFrac()}`, `un tiers : ${plFrac()}`, `quatre cinquièmes : ${plFrac()}`, `neuf douzièmes : ${plFrac()}`], 1),
          corr: plGrille([`sept dixièmes : ${plRep(F(7, 10))}`, `un tiers : ${plRep(F(1, 3))}`, `quatre cinquièmes : ${plRep(F(4, 5))}`, `neuf douzièmes : ${plRep(F(9, 12))}`], 1) },
        { etoiles: 2, col: 1, consigne: 'Complète.',
          eleve: plListe([`Dans ${F(3, 4)}, le numérateur est ${plPointilles(3)}`, `Dans ${F(3, 4)}, le dénominateur est ${plPointilles(3)}`, `Dans ${F(5, 8)}, l'unité est partagée en ${plPointilles(3)} parts égales.`, `Dans ${F(5, 8)}, on a pris ${plPointilles(3)} parts.`]),
          corr: plListe([`Dans ${F(3, 4)}, le numérateur est ${plRep('3')}`, `Dans ${F(3, 4)}, le dénominateur est ${plRep('4')}`, `Dans ${F(5, 8)}, l'unité est partagée en ${plRep('8')} parts égales.`, `Dans ${F(5, 8)}, on a pris ${plRep('5')} parts.`]) },
        { etoiles: 2, col: 1, consigne: 'Écris la fraction qui convient.',
          eleve: plListe([`Une pizza est coupée en 8 parts égales ; on en mange 3. On a mangé ${plFrac()} de la pizza.`, `Une tarte est coupée en 6 parts égales ; il en reste 1. Il reste ${plFrac()} de la tarte.`]),
          corr: plListe([`Une pizza est coupée en 8 parts égales ; on en mange 3. On a mangé ${plRep(F(3, 8))} de la pizza.`, `Une tarte est coupée en 6 parts égales ; il en reste 1. Il reste ${plRep(F(1, 6))} de la tarte.`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Léo partage une tablette de chocolat de 12 carreaux en parts égales avec ses deux sœurs. Quelle fraction de la tablette reçoit chaque enfant ? Combien de carreaux cela fait-il ?',
          corr: cm1Redac('Fraction reçue par chaque enfant', 'Ils sont 3 enfants : la tablette est partagée en 3 parts égales.', `Chaque enfant reçoit ${F(1, 3)} de la tablette.`) + cm1Redac('Nombre de carreaux par enfant', '12 : 3 = 4', 'Chaque enfant reçoit 4 carreaux.') },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un ruban est partagé en 10 morceaux égaux. Julie en prend 7. Quelle fraction du ruban a-t-elle prise ? Quelle fraction du ruban reste-t-il ?',
          corr: cm1Redac('Ruban pris par Julie', '7 morceaux sur 10', `Julie a pris ${F(7, 10)} du ruban.`) + cm1Redac('Ruban restant', '10 − 7 = 3', `Il reste ${F(3, 10)} du ruban.`) },
      ] },
    { titre: 'Fractions et unité', duree: '30 min',
      attendus: ['Comparer une fraction à 1', 'Encadrer une fraction entre deux nombres entiers qui se suivent', 'Écrire une fraction comme un entier plus une fraction plus petite que 1'],
      exos: [
        { etoiles: 1, consigne: 'Complète avec <, = ou >.',
          eleve: plGrille([`${F(3, 4)} ${plCase()} 1`, `${F(5, 5)} ${plCase()} 1`, `${F(7, 4)} ${plCase()} 1`, `${F(9, 10)} ${plCase()} 1`, `${F(12, 8)} ${plCase()} 1`, `${F(6, 6)} ${plCase()} 1`], 3),
          corr: plGrille([`${F(3, 4)} ${plRep('&lt;')} 1`, `${F(5, 5)} ${plRep('=')} 1`, `${F(7, 4)} ${plRep('&gt;')} 1`, `${F(9, 10)} ${plRep('&lt;')} 1`, `${F(12, 8)} ${plRep('&gt;')} 1`, `${F(6, 6)} ${plRep('=')} 1`], 3) },
        { etoiles: 1, col: 1, consigne: 'Entoure les fractions plus grandes que 1.',
          eleve: plGrille([F(2, 3), F(5, 4), F(8, 8), F(11, 10), F(3, 7), F(9, 5)], 3),
          corr: plGrille([F(2, 3), plEntoure(F(5, 4)), F(8, 8), plEntoure(F(11, 10)), F(3, 7), plEntoure(F(9, 5))], 3) },
        { etoiles: 1, col: 1, consigne: 'Barre les fractions égales à 1.',
          eleve: plGrille([F(3, 3), F(4, 5), F(7, 7), F(9, 8), F(10, 10), F(5, 6)], 3),
          corr: plGrille([plBarre(F(3, 3)), F(4, 5), plBarre(F(7, 7)), F(9, 8), plBarre(F(10, 10)), F(5, 6)], 3) },
        { etoiles: 2, col: 1, consigne: 'Encadre chaque fraction entre deux nombres entiers qui se suivent.',
          eleve: plGrille([`${plPointilles(4)} &lt; ${F(7, 4)} &lt; ${plPointilles(4)}`, `${plPointilles(4)} &lt; ${F(10, 3)} &lt; ${plPointilles(4)}`, `${plPointilles(4)} &lt; ${F(13, 5)} &lt; ${plPointilles(4)}`, `${plPointilles(4)} &lt; ${F(9, 2)} &lt; ${plPointilles(4)}`], 1),
          corr: plGrille([`${plRep('1')} &lt; ${F(7, 4)} &lt; ${plRep('2')}`, `${plRep('3')} &lt; ${F(10, 3)} &lt; ${plRep('4')}`, `${plRep('2')} &lt; ${F(13, 5)} &lt; ${plRep('3')}`, `${plRep('4')} &lt; ${F(9, 2)} &lt; ${plRep('5')}`], 1) },
        { etoiles: 2, col: 1, consigne: 'Complète.',
          eleve: plListe([`1 unité, c'est ${plPointilles(3)} quarts.`, `2 unités, c'est ${plPointilles(3)} quarts.`, `1 unité, c'est ${plPointilles(3)} tiers.`, `3 unités, c'est ${plPointilles(3)} cinquièmes.`]),
          corr: plListe([`1 unité, c'est ${plRep('4')} quarts.`, `2 unités, c'est ${plRep('8')} quarts.`, `1 unité, c'est ${plRep('3')} tiers.`, `3 unités, c'est ${plRep('15')} cinquièmes.`]) },
        { etoiles: 3, consigne: 'Écris chaque fraction comme un nombre entier plus une fraction plus petite que 1.',
          eleve: plListe([`${F(7, 4)} = ${plPointilles(4)} + ${plFrac()}`, `${F(11, 5)} = ${plPointilles(4)} + ${plFrac()}`, `${F(17, 6)} = ${plPointilles(4)} + ${plFrac()}`, `${F(10, 3)} = ${plPointilles(4)} + ${plFrac()}`]),
          corr: plListe([`${F(7, 4)} = ${plRep('1')} + ${plRep(F(3, 4))}`, `${F(11, 5)} = ${plRep('2')} + ${plRep(F(1, 5))}`, `${F(17, 6)} = ${plRep('2')} + ${plRep(F(5, 6))}`, `${F(10, 3)} = ${plRep('3')} + ${plRep(F(1, 3))}`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Pour un gâteau, Maman a utilisé ${T(7, 4)} de sachet de sucre. A-t-elle utilisé plus ou moins d'un sachet ? Combien de sachets a-t-elle ouverts ?`,
          corr: cm1Redac('Sucre utilisé', cm1Tex('\\dfrac{7}{4} = 1 + \\dfrac{3}{4}'), `Elle a utilisé plus d'un sachet : un sachet entier et ${F(3, 4)} d'un autre. Elle a donc ouvert 2 sachets.`) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'À la kermesse, chaque gâteau est coupé en 6 parts égales. On a vendu 14 parts. Combien de gâteaux entiers a-t-on vendus ? Quelle fraction d\'un autre gâteau ?',
          corr: cm1Redac('Gâteaux vendus', { suite: ['6 + 6 = 12', '14 − 12 = 2'] }, `On a vendu 2 gâteaux entiers et ${F(2, 6)} d'un autre gâteau.`) },
      ] },
    { titre: 'Fractions sur une demi-droite graduée', duree: '30 min',
      attendus: ['Repérer une fraction sur une demi-droite graduée', 'Placer une fraction sur une demi-droite graduée'],
      exos: [
        { etoiles: 1, consigne: "L'unité est partagée en 4 parts égales. Quelle fraction correspond à chaque point ?",
          eleve: cm1Graduation(2, 4, [[0.75, 'A'], [1.25, 'B'], [1.5, 'C']], { unite: 200 }) + plGrille([`A : ${plFrac()}`, `B : ${plFrac()}`, `C : ${plFrac()}`], 3),
          corr: cm1Graduation(2, 4, [[0.75, 'A'], [1.25, 'B'], [1.5, 'C']], { unite: 200 }) + plGrille([`A : ${plRep(F(3, 4))}`, `B : ${plRep(F(5, 4))}`, `C : ${plRep(F(6, 4))}`], 3) },
        { etoiles: 2, consigne: `L'unité est partagée en 3 parts égales. Place le point D à ${T(2, 3)}, le point E à ${T(4, 3)} et le point F à ${T(7, 3)}.`,
          eleve: plX(cm1Graduation(3, 3, [], { unite: 140 }), { t: 'pts', tol: 20, noms: ['D', 'E', 'F'], cands: Array.from({ length: 10 }, (_, i) => [30 + i * 140 / 3, 45]), att: { D: [30 + 2 * 140 / 3, 45], E: [30 + 4 * 140 / 3, 45], F: [30 + 7 * 140 / 3, 45] } }),
          corr: cm1Graduation(3, 3, [[2 / 3, 'D', '#1F7A4D'], [4 / 3, 'E', '#1F7A4D'], [7 / 3, 'F', '#1F7A4D']], { unite: 140 }) },
        { etoiles: 3, consigne: `L'unité est partagée en 10 parts égales. Place le point L à ${T(3, 10)}, le point M à ${T(12, 10)} et le point N à ${T(17, 10)}.`,
          eleve: plX(cm1Graduation(2, 10, [], { unite: 210 }), { t: 'pts', tol: 10, noms: ['L', 'M', 'N'], cands: Array.from({ length: 21 }, (_, i) => [30 + i * 21, 45]), att: { L: [30 + 3 * 21, 45], M: [30 + 12 * 21, 45], N: [30 + 17 * 21, 45] } }),
          corr: cm1Graduation(2, 10, [[0.3, 'L', '#1F7A4D'], [1.2, 'M', '#1F7A4D'], [1.7, 'N', '#1F7A4D']], { unite: 210 }) },
        { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure la bonne réponse.',
          eleve: plListe([`${F(4, 4)} est sur la graduation 1. <b>vrai · faux</b>`, `${F(6, 3)} est entre 1 et 2. <b>vrai · faux</b>`, `${F(5, 4)} est plus loin de 0 que 1. <b>vrai · faux</b>`]),
          corr: plListe([`${F(4, 4)} est sur la graduation 1. ${plEntoure('vrai')}`, `${F(6, 3)} est entre 1 et 2. ${plEntoure('faux')} (c'est 2)`, `${F(5, 4)} est plus loin de 0 que 1. ${plEntoure('vrai')}`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: "Sur une demi-droite graduée, l'unité est partagée en 6 parts égales. Le point R est sur la 9e graduation après 0. Quelle fraction correspond à R ? Le point R est-il avant ou après 1 ?",
          corr: cm1Redac('Fraction du point R', '9 parts de sixièmes', `Le point R correspond à ${F(9, 6)}.`) + cm1Redac('Position de R', cm1Tex('\\dfrac{9}{6} = 1 + \\dfrac{3}{6}'), 'Le point R est après 1.') },
        { etoiles: 3, cahier: true, consigne: `Une course fait 1 km. Théo a parcouru ${T(3, 4)} de la course et Inès ${T(5, 8)}. Place T pour Théo et I pour Inès sur la demi-droite, puis explique qui est le plus avancé.`,
          eleve: cm1Graduation(1, 8, [], { unite: 400 }),
          corr: cm1Graduation(1, 8, [[0.75, 'T', '#1F7A4D'], [0.625, 'I', '#1F7A4D']], { unite: 400 }) + cm1Redac('Le plus avancé', cm1Tex('\\dfrac{3}{4} = \\dfrac{6}{8}'), `Théo a parcouru ${F(6, 8)} de la course et Inès ${F(5, 8)} : Théo est le plus avancé.`) },
      ] },
    { titre: 'Fractions de figures variées', duree: '30 min',
      attendus: ['Représenter une fraction par une partie d\'une figure partagée en parts égales', 'Reconnaître un partage en parts égales'],
      exos: [
        { etoiles: 1, consigne: 'Colorie la fraction du carré qui est indiquée.',
          eleve: plGrille([`${F(1, 2)} ${plCarre('triangles', 2, 0)}`, `${F(1, 3)} ${plCarre('bandes', 3, 0)}`, `${F(3, 4)} ${plCarre('grille', 4, 0, { l: 2 })}`, `${F(3, 4)} ${plCarre('triangles', 4, 0)}`, `${F(5, 8)} ${plCarre('triangles', 8, 0)}`, `${F(4, 9)} ${plCarre('grille', 9, 0, { l: 3 })}`], 6),
          corr: plGrille([`${F(1, 2)} ${plCarre('triangles', 2, 1)}`, `${F(1, 3)} ${plCarre('bandes', 3, 1)}`, `${F(3, 4)} ${plCarre('grille', 4, 3, { l: 2 })}`, `${F(3, 4)} ${plCarre('triangles', 4, 3)}`, `${F(5, 8)} ${plCarre('triangles', 8, 5)}`, `${F(4, 9)} ${plCarre('grille', 9, 4, { l: 3 })}`], 6) },
        { etoiles: 1, consigne: 'Colorie la fraction du disque qui est indiquée.',
          eleve: plGrille([[2, 6], [4, 6], [7, 8], [3, 10], [8, 12], [5, 12]].map(([a, b]) => `${F(a, b)} ${cm1Disque(b, 0, { taille: 58 })}`), 6),
          corr: plGrille([[2, 6], [4, 6], [7, 8], [3, 10], [8, 12], [5, 12]].map(([a, b]) => `${F(a, b)} ${cm1Disque(b, a, { taille: 58 })}`), 6) },
        { etoiles: 2, col: 1, consigne: 'Quelle fraction de chaque figure est coloriée ?',
          eleve: plGrille([`${plCarre('grille', 6, 4, { l: 2 })} ${plFrac()}`, `${plCarre('triangles', 8, 3)} ${plFrac()}`, `${plCarre('colonnes', 5, 2)} ${plFrac()}`, `${cm1Disque(10, 7, { taille: 62 })} ${plFrac()}`]),
          corr: plGrille([`${plCarre('grille', 6, 4, { l: 2 })} ${plRep(F(4, 6))}`, `${plCarre('triangles', 8, 3)} ${plRep(F(3, 8))}`, `${plCarre('colonnes', 5, 2)} ${plRep(F(2, 5))}`, `${cm1Disque(10, 7, { taille: 62 })} ${plRep(F(7, 10))}`]) },
        { etoiles: 2, col: 1, consigne: 'Chaque bande a 12 carreaux. Colorie la fraction demandée.',
          eleve: plGrille([[3, 4], [2, 3], [5, 6], [1, 2]].map(([a, b]) => `${F(a, b)} ${cm1Bande(12, 0, { largeur: 168 })}`), 1),
          corr: plGrille([[3, 4, 9], [2, 3, 8], [5, 6, 10], [1, 2, 6]].map(([a, b, k]) => `${F(a, b)} ${cm1Bande(12, k, { largeur: 168 })}`), 1) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Hugo a colorié une part de ce disque. Il dit : « J'ai colorié ${T(1, 4)} du disque, car c'est 1 part sur 4. » A-t-il raison ? Explique.`,
          eleve: plDisqueInegal([40, 100, 110, 110], 0),
          corr: plDisqueInegal([40, 100, 110, 110], 0) + cm1Redac('Réponse', '', `Hugo a tort : les 4 parts ne sont pas égales, ce n'est pas un partage en quarts. La part coloriée est plus petite que ${F(1, 4)} du disque.`) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Dessine un rectangle de 4 carreaux sur 3 carreaux, puis colorie ${T(5, 12)} de ce rectangle. Explique comment tu as fait.`,
          corr: cm1Redac('Nombre de carreaux du rectangle', '4 × 3 = 12', `Le rectangle a 12 carreaux : on en colorie 5, c'est ${F(5, 12)} du rectangle.`) },
      ] },
    { titre: 'Fractions plus grandes que 1 en images', duree: '30 min',
      attendus: ['Représenter une fraction plus grande que 1', 'Écrire une fraction comme un entier plus une fraction plus petite que 1'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Écris la fraction coloriée, puis décompose-la.',
          eleve: plGrille([plUnites({ carre: 'triangles' }, 2, 7), plUnites('disque', 5, 13, 0, { taille: 52 }), plUnites({ carre: 'grille', l: 2 }, 4, 6)].map(f => `${f} <span>${plFrac()} = ${plPointilles(3)} + ${plFrac()}</span>`), 1),
          corr: plGrille([[plUnites({ carre: 'triangles' }, 2, 7), 7, 2, 3, 1], [plUnites('disque', 5, 13, 0, { taille: 52 }), 13, 5, 2, 3], [plUnites({ carre: 'grille', l: 2 }, 4, 6), 6, 4, 1, 2]].map(([f, a, b, e, r]) => `${f} <span>${plRep(F(a, b))} = ${plRep(String(e))} + ${plRep(F(r, b))}</span>`), 1) },
        { etoiles: 2, col: 1, consigne: 'Colorie la fraction indiquée, puis complète.',
          eleve: plGrille([[{ carre: 'bandes' }, 3, 7], [{ carre: 'grille', l: 2 }, 4, 9], ['disque', 8, 11]].map(([fig, b, a]) => `${F(a, b)} ${plUnites(fig, b, 0, Math.ceil(a / b))} <span>= ${plPointilles(3)} + ${plFrac()}</span>`), 1),
          corr: plGrille([[{ carre: 'bandes' }, 3, 7], [{ carre: 'grille', l: 2 }, 4, 9], ['disque', 8, 11]].map(([fig, b, a]) => `${F(a, b)} ${plUnites(fig, b, a, Math.ceil(a / b))} <span>= ${plRep(String(Math.floor(a / b)))} + ${plRep(F(a % b, b))}</span>`), 1) },
        { etoiles: 2, col: 1, consigne: 'Complète avec le bon nombre entier.',
          eleve: plListe([[25, 4, 1], [23, 4, 3], [41, 7, 6], [79, 8, 7]].map(([a, b, r]) => `${F(a, b)} = ${plPointilles(3)} + ${F(r, b)}`)),
          corr: plListe([[25, 4, 1], [23, 4, 3], [41, 7, 6], [79, 8, 7]].map(([a, b, r]) => `${F(a, b)} = ${plRep(String((a - r) / b))} + ${F(r, b)}`)) },
        { etoiles: 2, col: 1, consigne: 'Écris avec une seule fraction.',
          eleve: plListe([[2, 1, 3], [1, 3, 4], [3, 2, 5], [4, 1, 2]].map(([e, a, b]) => `${e} + ${F(a, b)} = ${plFrac()}`)),
          corr: plListe([[2, 1, 3], [1, 3, 4], [3, 2, 5], [4, 1, 2]].map(([e, a, b]) => `${e} + ${F(a, b)} = ${plRep(F(e * b + a, b))}`)) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un pâtissier coupe chaque tarte en 8 parts égales. Il a vendu 29 parts. Combien de tartes entières a-t-il vendues ? Écris le nombre de tartes vendues comme un entier plus une fraction.',
          corr: cm1Redac('Tartes vendues', { suite: ['8 × 3 = 24', '29 − 24 = 5'] }, `Il a vendu 3 tartes entières et ${F(5, 8)} d'une autre : ${F(29, 8)} = 3 + ${F(5, 8)}.`) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Léa dit : « ${T(13, 4)}, c'est entre 3 et 4. » A-t-elle raison ? Explique.`,
          corr: cm1Redac('Décomposition', cm1Tex('\\dfrac{13}{4} = 3 + \\dfrac{1}{4}'), `Léa a raison : ${F(13, 4)} est plus grand que 3 et plus petit que 4.`) },
      ] },
    { titre: 'Fractions d\'une longueur sur quadrillage', duree: '30 min',
      attendus: ['Construire une longueur égale à une fraction d\'une longueur unité', 'Exprimer une longueur par une fraction d\'une longueur unité'],
      exos: [
        { etoiles: 1, col: 1, consigne: "L'unité u mesure 12 carreaux. Trace la bande de la longueur indiquée.",
          eleve: plBandesU(12, [[1, 2, 6], [1, 4, 3], [3, 4, 9], [1, 3, 4], [2, 3, 8], [5, 6, 10]].map(([a, b, len]) => ({ lab: [a, b], len, cache: true })), false),
          corr: plBandesU(12, [[1, 2, 6], [1, 4, 3], [3, 4, 9], [1, 3, 4], [2, 3, 8], [5, 6, 10]].map(([a, b, len]) => ({ lab: [a, b], len, cache: true })), true) },
        { etoiles: 2, col: 1, consigne: "L'unité u mesure 10 carreaux. Quelle fraction de u représente chaque bande ?",
          eleve: plBandesU(10, [['A', 5], ['B', 2], ['C', 7], ['D', 13]].map(([lab, len]) => ({ lab, len })), false) + plGrille(['A', 'B', 'C', 'D'].map(x => `${x} : ${plFrac()} u`), 2),
          corr: plBandesU(10, [['A', 5], ['B', 2], ['C', 7], ['D', 13]].map(([lab, len]) => ({ lab, len })), true) + plGrille([['A', 5], ['B', 2], ['C', 7], ['D', 13]].map(([x, n]) => `${x} : ${plRep(F(n, 10))} u`), 2) },
        { etoiles: 2, col: 1, consigne: "La bande u mesure 8 carreaux. Combien de carreaux mesure chaque bande ?",
          eleve: plListe([[1, 2], [1, 4], [3, 4], [3, 8], [5, 4]].map(([a, b]) => `${F(a, b)} u : ${plPointilles(3)} carreaux`)),
          corr: plListe([[1, 2], [1, 4], [3, 4], [3, 8], [5, 4]].map(([a, b]) => `${F(a, b)} u : ${plRep(String(8 * a / b))} carreaux`)) },
        { etoiles: 2, col: 1, consigne: "L'unité u mesure 12 carreaux. Vrai ou faux ? Entoure la bonne réponse.",
          eleve: plListe([`${F(1, 3)} u mesure 4 carreaux. <b>vrai · faux</b>`, `${F(3, 4)} u mesure 8 carreaux. <b>vrai · faux</b>`, `${F(6, 12)} u, c'est la moitié de u. <b>vrai · faux</b>`]),
          corr: plListe([`${F(1, 3)} u mesure 4 carreaux. ${plEntoure('vrai')}`, `${F(3, 4)} u mesure 8 carreaux. ${plEntoure('faux')} (9 carreaux)`, `${F(6, 12)} u, c'est la moitié de u. ${plEntoure('vrai')}`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Une bande mesure 6 carreaux. Elle représente ${T(2, 3)} de l'unité u. Combien de carreaux mesure l'unité u ?`,
          corr: cm1Redac('Longueur de l\'unité u', { suite: ['6 : 2 = 3', '3 × 3 = 9'] }, `${F(1, 3)} de u mesure 3 carreaux, donc l'unité u mesure 9 carreaux.`) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Trace une unité u de 10 carreaux, puis une bande de ${T(7, 10)} u et une bande de ${T(12, 10)} u. Laquelle est plus longue que u ?`,
          corr: cm1Redac('Longueurs des bandes', { suite: [`${F(7, 10)} u : 7 carreaux`, `${F(12, 10)} u : 12 carreaux`] }, `La bande de ${F(12, 10)} u est plus longue que u (12 carreaux au lieu de 10).`) },
      ] },
  ],
});
})();

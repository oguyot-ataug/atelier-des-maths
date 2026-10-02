/* ============================================================
   CHAPITRE : Division (CM2, N9, période 3)
   Programme du cycle 3 (CM2) : division euclidienne posée ; divisions décimales avec un dividende
   entier ou décimal et un diviseur à un chiffre ; diviser un décimal par 10, 100, 1 000 ; diviser
   un entier par 4 ou 8 mentalement (moitié de la moitié…) ; deux sens de la division (partage :
   valeur d'une part ; groupement : nombre de parts) ; interpréter quotient et reste.
   Les divisions posées réutilisent l'outil du site (computeDivisionPosee, divisionPoseeHTML,
   computeDivisionDecimale, divisionDecimaleHTML -- outils-figures.js).
   ============================================================ */
(() => {
const eucl = (a, b) => divisionPoseeHTML(computeDivisionPosee(a, b));
const deci = (a, b, n) => divisionDecimaleHTML(computeDivisionDecimale(String(a), b, n), n);
const U = t => `<b style="color:#E35D3A;">${t}</b>`;
cm1Chapitre({
  niveau: 'cm2', titre: 'Division', slug: 'division',
  cours: `
${cm1Lecon(1, 'Les deux sens de la division')}
${cm1Exemple('La division répond à deux types de questions :', ['<b>Partage</b> : « On partage 84 bonbons entre 4 enfants. Combien chacun en reçoit-il ? » → 84 ÷ 4 = 21 bonbons par enfant (la valeur d\'une part).', '<b>Groupement</b> : « On range 84 œufs dans des boîtes de 6. Combien de boîtes ? » → 84 ÷ 6 = 14 boîtes (le nombre de parts).'])}

${cm1Lecon(2, 'La division euclidienne')}
${cm1Def('Effectuer la <b>division euclidienne</b> de 587 par 9, c\'est trouver le <b>quotient</b> q et le <b>reste</b> r tels que : 587 = (9 × q) + r, avec r plus petit que 9.')}
<div class="figure-wrap">${eucl(587, 9)}</div>
${cm1Exemple('Résultat :', ['587 = (9 × 65) + 2 : le quotient est <b>65</b>, le reste est <b>2</b>.', 'Vérification : 9 × 65 = 585,', 'puis 585 + 2 = 587 ✔', 'Estimation : 9 × 60 = 540,', 'et 9 × 70 = 630 : le quotient est entre 60 et 70.'])}
${cm1Astuce('Le reste doit toujours être <b>plus petit que le diviseur</b>. Sinon, c\'est qu\'on pouvait encore en mettre une fois de plus au quotient.')}

${cm1Lecon(3, 'La division décimale')}
${cm1Regle('Quand le reste n\'est pas nul, on peut <b>continuer la division</b> : on place une <b>virgule au quotient</b> quand on abaisse le premier chiffre après la virgule du dividende (on écrit des zéros : 17 = 17,00).')}
<div class="figure-wrap" style="display:flex;gap:30px;flex-wrap:wrap;justify-content:center;">${deci(17, 4, 2)}${deci('25,8', 6, 2)}</div>
${cm1Exemple('Résultats :', ['17 ÷ 4 = <b>4,25</b>', 'vérification : 4 × 4,25 = 17', '25,8 ÷ 6 = <b>4,3</b>', 'vérification : 6 × 4,3 = 25,8'])}

${cm1Lecon(4, 'Diviser par 10, 100, 1 000')}
${cm1Regle('Diviser par 10, 100 ou 1 000, c\'est rendre le nombre 10, 100 ou 1 000 fois plus petit : chaque chiffre glisse de <b>1, 2 ou 3 rangs vers la droite</b>.')}
${cm1Exemple('Exemples (chiffre des unités de départ en rouge) :', [`4${U('5')} ÷ 10 = 4,5`, `${U('7')},2 ÷ 100 = 0,072`, `38${U('0')} ÷ 1 000 = 0,38`])}
${cmAnimGlisseDec('c2-dv-glisse', { presets: [{ nom: '45 ÷ 10', n: '45', f: 10, op: '÷' }, { nom: '7,2 ÷ 100', n: '7,2', f: 100, op: '÷' }, { nom: '380 ÷ 1 000', n: '380', f: 1000, op: '÷' }] })}

${cm1Lecon(5, 'Diviser par 4 ou par 8 de tête')}
${cm1Regle('Diviser par 4, c\'est prendre la <b>moitié de la moitié</b> : 96 ÷ 4 → 48 → <b>24</b>.<br>Diviser par 8, c\'est prendre trois fois la moitié : 120 ÷ 8 → 60 → 30 → <b>15</b>.')}
${ce2AnimPartage('c2-dv-partage', { legende: 'Un partage équitable : 24 cartes entre 4 joueurs, une carte à chacun, chacun son tour.', presets: [{ nom: '24 cartes, 4 joueurs', total: 24, parts: 4, etiq: 'joueur', objets: 'cartes', fin: 'Chaque joueur a <b>6 cartes</b> : 24 ÷ 4 = 6.' }, { nom: '26 cartes, 4 joueurs', total: 26, parts: 4, etiq: 'joueur', objets: 'cartes', fin: 'Chaque joueur a 6 cartes et il en reste 2 : 26 = (4 × 6) + 2.' }] })}
`,
  methode: `
${cm1Demo('c2-dv-reste', 'Interpréter le reste', '150 élèves partent en sortie en cars de 45 places. Combien faut-il de cars ?')}
${cm1Demo('c2-dv-dec', 'Partager une somme d\'argent', 'Quatre amis se partagent équitablement une addition de 58 €. Combien chacun paie-t-il ?')}
`,
  demos: [
    ['c2-dv-reste', [
      { expr: '150 ÷ 45', note: 'On cherche combien de groupes de 45 : c\'est une division (groupement).' },
      { expr: '150 = (45 × 3) + 15', note: '3 cars transportent 135 élèves ; il en reste 15.' },
      { expr: '3 + 1 = 4', note: 'Les 15 élèves restants ont besoin d\'un car de plus.' },
      { expr: 'Il faut 4 cars.', note: 'Le reste n\'est pas nul : on arrondit au-dessus, car on ne peut laisser personne !' },
    ]],
    ['c2-dv-dec', [
      { expr: '58 ÷ 4', note: 'On partage 58 € en 4 parts égales : division décimale.' },
      { expr: deci(58, 4, 2), note: '58 = 4 × 14 + 2 ; on continue : 2 unités = 20 dixièmes, 20 ÷ 4 = 5 dixièmes.' },
      { expr: '58 ÷ 4 = 14,5', note: 'Vérification : 4 × 14,5 = 58. ✔' },
      { expr: 'Chacun paie 14,50 €.', note: 'Phrase réponse.' },
    ]],
  ],
  exos: cm1Exos('c2dv', [
    [`Pose et effectue la division euclidienne.${cm1Liste(['745 ÷ 6', '1 208 ÷ 7'])}`,
      cm1Redac('745 ÷ 6', { pose: eucl(745, 6) }, 'Le quotient est 124 et le reste est 1 : 745 = (6 × 124) + 1.')
      + cm1Redac('1 208 ÷ 7', { pose: eucl(1208, 7) }, 'Le quotient est 172 et le reste est 4 : 1 208 = (7 × 172) + 4.')],
    [`Pose et effectue la division décimale.${cm1Liste(['23 ÷ 4, jusqu\'aux centièmes', '9 ÷ 8, jusqu\'aux millièmes', '37,2 ÷ 3'])}`,
      cm1Redac('23 ÷ 4', { pose: deci(23, 4, 2) }, '23 divisé par 4 donne 5,75.') + cm1Redac('9 ÷ 8', { pose: deci(9, 8, 3) }, '9 divisé par 8 donne 1,125.') + cm1Redac('37,2 ÷ 3', { pose: deci('37,2', 3, 1) }, '37,2 divisé par 3 donne 12,4.')],
    [`Calcule.${cm1Liste(['56 ÷ 10', '3,4 ÷ 10', '250 ÷ 100', '8 ÷ 1 000'])}`,
      cm1Redac('Diviser par 10, 100, 1 000', { suite: ['56 ÷ 10 = 5,6', '3,4 ÷ 10 = 0,34', '250 ÷ 100 = 2,5', '8 ÷ 1 000 = 0,008'] }, 'Chaque chiffre glisse de 1, 2 ou 3 rangs vers la droite.')],
    [`Calcule de tête.${cm1Liste(['64 ÷ 4', '200 ÷ 8', '36 ÷ 4', '88 ÷ 8'])}`,
      cm1Redac('64 ÷ 4', '64 → 32 → 16', '64 divisé par 4 donne 16 : c\'est la moitié de la moitié.') + cm1Redac('200 ÷ 8', '200 → 100 → 50 → 25', '200 divisé par 8 donne 25.') + cm1Redac('36 ÷ 4', '36 → 18 → 9', '36 divisé par 4 donne 9.') + cm1Redac('88 ÷ 8', '88 → 44 → 22 → 11', '88 divisé par 8 donne 11.')],
    [`Partage ou groupement ?${cm1Liste(['96 cartes pour 8 joueurs : combien chacun en reçoit-il ?', '96 cartes par paquets de 8 : combien de paquets ?'])}`,
      cm1Redac('96 cartes pour 8 joueurs', '96 ÷ 8 = 12', 'C\'est un partage : chaque joueur reçoit 12 cartes.') + cm1Redac('Paquets de 8', '96 ÷ 8 = 12', 'C\'est un groupement : on fait 12 paquets.')],
    ['Un ruban de 7 m est coupé en 4 morceaux égaux. Quelle est la longueur d\'un morceau ?',
      cm1Redac('Longueur d\'un morceau', '7 ÷ 4 = 1,75', 'Chaque morceau mesure 1,75 m.')],
    ['On range 200 livres sur des étagères de 30 livres. Combien d\'étagères faut-il ? Combien de livres y aura-t-il sur la dernière ?',
      cm1Redac('Division de 200 par 30', '200 = (30 × 6) + 20', '6 étagères sont pleines et il reste 20 livres.') + cm1Redac('Nombre d\'étagères', '6 + 1 = 7', 'Il faut 7 étagères ; la dernière contient 20 livres.')],
    ['Trouve le nombre : si je le multiplie par 6, j\'obtiens 45.',
      cm1Redac('Le nombre cherché', '45 ÷ 6 = 7,5', 'Le nombre est 7,5. Vérification : 6 × 7,5 = 45.')],
  ], { titre: 'Rédaction type : « Division euclidienne »', lignes: [['587 = (9 × 65) + 2', 'J\'écris l\'égalité : dividende = (diviseur × quotient) + reste.'], ['2 &lt; 9', 'Je vérifie que le reste est plus petit que le diviseur.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la division « à la française »', [
    'La façon de poser la division a beaucoup varié selon les pays et les époques. En France, on place le diviseur à droite du dividende, avec une « potence » ; aux États-Unis, on écrit le diviseur à gauche, sous une sorte de toit !',
    'Au Moyen Âge, la division était considérée comme l\'opération la plus difficile : on raconte qu\'il fallait aller dans une université italienne pour apprendre à la faire.',
  ]),
  quiz: [
    { q: 'Dans 47 = (6 × 7) + 5, le reste est…', opts: ['6', '7', '5'], correct: 2 },
    { q: '9 ÷ 2 = …', opts: ['4,5', '4,2', '4 reste 1,5'], correct: 0 },
    { q: '6,5 ÷ 10 = …', opts: ['65', '0,65', '0,065'], correct: 1 },
  ],
});
})();

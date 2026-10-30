/* ============================================================
   CE2 · Planches : Fractions égales (N4)
   Fraction d'un tout (rappel du CE1) ; fractions égales inférieures ou égales à 1, dénominateurs au plus
   12, avec des bandes et des disques : « si je fais des parts deux fois plus petites et que j'en prends
   deux fois plus, j'en prends la même quantité » ; reconnaître les fractions égales à un demi.
   Fractions toujours écrites en LaTeX (cm1Frac).
   Relecture CE2-N4 (28/10/2026) : plus d'exemples là où il restait de la place, deux problèmes côte à côte,
   « identique » au lieu de « pareille » ; à l'écran, fraction à écrire dans des cases et choix en LaTeX rendus
   (planches-num.js).
   Relecture CE2-N4-P1-E1 (30/10/2026, « On peut en mettre plus en réduisant un peu la taille des figures ») : 8 figures
   plus petites sur 4 colonnes, la fraction toujours sous sa figure.
   ============================================================ */
(() => {
const { rmp, chx } = P3, F = cm1Frac;
// Fraction dont un terme est à écrire (null = case vide), sur le modèle de plFrac.
const fracT = (a, b) => `<span class="pl-frac">${a == null ? '<span class="pl-case"></span>' : `<span style="font-weight:700;">${a}</span>`}<span class="pl-barre"></span>${b == null ? '<span class="pl-case"></span>' : `<span style="font-weight:700;">${b}</span>`}</span>`;
// Égalités à compléter : [[a, b, inconnue en haut ? , réponse, autre terme]] → énoncé et corrigé.
const egal = l => ({ eleve: plListe(l.map(([a, b, haut, r, t]) => `${F(a, b)} = ${haut ? fracT(null, t) : fracT(t, null)}`)),
  corr: plListe(l.map(([a, b, haut, r, t]) => `${F(a, b)} = ${P3.R(haut ? F(r, t) : F(t, r))}`)) });
const bande = (n, k) => cm1Bande(n, k, { largeur: 200 }).replace(/style="width:[^;]*;max-width:[^;]*;/, 'style="width:210px;max-width:100%;');
// Petite figure (bande ou disque) avec, dessous, sa fraction : [figure, contenu sous la figure].
const petite = f => f[0] === 'b' ? cm1Bande(f[1], f[2], { largeur: 200 }).replace(/style="width:[^;]*;max-width:[^;]*;/, 'style="width:140px;max-width:100%;') : cm1Disque(f[1], f[2], { taille: 62 });
const sousFig = (fig, bas) => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;width:100%;height:100%;">${fig}<div>${bas}</div></div>`;
// Deux listes côte à côte (la place à droite est utilisée).
const deux = (x, y) => `<div style="display:flex;justify-content:space-around;flex-wrap:wrap;gap:4px 24px;">${x}${y}</div>`;
const LIRE = [['b', 4, 3], ['b', 6, 1], ['d', 8, 5], ['d', 3, 2], ['b', 10, 7], ['d', 6, 5], ['b', 5, 2], ['d', 4, 1]];
PLANCHES['ce2|Fractions égales'] = [
  { titre: 'Une fraction d\'un tout', duree: '25 min',
    attendus: ['Lire et écrire une fraction d\'une bande ou d\'un disque', 'Savoir ce que représentent le numérateur et le dénominateur'],
    exos: [
      { etoiles: 1, consigne: 'Écris la fraction coloriée.',
        eleve: plGrille(LIRE.map(f => sousFig(petite(f), plFrac())), 4),
        corr: plGrille(LIRE.map(f => sousFig(petite(f), P3.R(F(f[2], f[1])))), 4) },
      { etoiles: 1, consigne: 'Colorie la fraction demandée.',
        eleve: plGrille([bande(5, 0) + '<br>' + F(2, 5), bande(3, 0) + '<br>' + F(3, 3), bande(10, 0) + '<br>' + F(7, 10)], 3),
        corr: plGrille([bande(5, 2) + '<br>' + F(2, 5), bande(3, 3) + '<br>' + F(3, 3), bande(10, 7) + '<br>' + F(7, 10)], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([[`Dans ${F(3, 8)}, l'unité est partagée en @ parts égales.`, 8], [`Dans ${F(3, 8)}, on prend @ parts.`, 3], [`${F(4, 4)} est égal à @ unité.`, 1]], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.', ...P3.rmp([['Une pizza en 8 parts égales : une part, c\'est @ de la pizza.', cm1Frac(1, 8)], ['Les 8 parts font @ pizza.', 1]], 3) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande part.',
        ...(() => { const g = P3.chx([['', F(1, 3), `${F(1, 3)} · ${F(1, 6)}`], ['', F(1, 2), `${F(1, 2)} · ${F(1, 8)}`]]), d = P3.chx([['', F(1, 4), `${F(1, 10)} · ${F(1, 4)}`], ['', F(1, 5), `${F(1, 5)} · ${F(1, 9)}`]]);
          return { eleve: deux(g.eleve, d.eleve), corr: deux(g.corr, d.corr) }; })() },
    ] },
  { titre: 'Des fractions égales', duree: '30 min',
    attendus: ['Trouver des fractions égales avec des bandes', 'Expliquer : des parts deux fois plus petites, deux fois plus de parts'],
    exos: [
      { etoiles: 1, consigne: 'Les deux bandes ont la même partie coloriée. Complète l\'égalité.',
        ...(() => { const P = [[1, 4, 2, 8], [2, 3, 4, 6], [1, 2, 3, 6], [3, 5, 6, 10]];
          return { eleve: plListe(P.map(([a, b, c, d]) => bande(b, a) + ' ' + F(a, b) + '<br>' + bande(d, c) + ' ' + plFrac())),
            corr: plListe(P.map(([a, b, c, d]) => bande(b, a) + ' ' + F(a, b) + '<br>' + bande(d, c) + ' ' + P3.R(F(c, d)))) }; })() },
      { etoiles: 2, consigne: 'Complète les égalités.',
        ...egal([[3, 4, true, 6, 8], [1, 3, true, 2, 6], [2, 5, true, 4, 10], [5, 6, true, 10, 12], [1, 4, false, 12, 3], [2, 3, false, 9, 6], [1, 5, true, 2, 10], [3, 4, false, 12, 9]]) },
      { etoiles: 2, consigne: 'Entoure si l\'égalité est vraie ou fausse.',
        ...(() => { const V = 'vraie · fausse', g = P3.chxTab([[`${F(2, 4)} = ${F(1, 2)}`, 'vraie', V], [`${F(2, 3)} = ${F(3, 4)}`, 'fausse', V], [`${F(6, 8)} = ${F(3, 4)}`, 'vraie', V]]),
            d = P3.chxTab([[`${F(1, 3)} = ${F(2, 6)}`, 'vraie', V], [`${F(2, 5)} = ${F(4, 5)}`, 'fausse', V], [`${F(4, 12)} = ${F(1, 3)}`, 'vraie', V]]);
          return { eleve: deux(g.eleve, d.eleve), corr: deux(g.corr, d.corr) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: `Léo a mangé ${F(2, 6)} d'une tarte, Inès ${F(1, 3)} d'une tarte identique. Qui a mangé le plus ? Explique avec un dessin.`,
        corr: cm1Redac('Comparer', `${F(1, 3)} = ${F(2, 6)}`, 'Si on coupe chaque tiers en deux, on obtient 2 sixièmes : Léo et Inès ont mangé autant de tarte.', bande(3, 1) + '<br>' + bande(6, 2)) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Deux rubans identiques. Sami colorie ${F(3, 4)} du sien, Jade colorie ${F(6, 8)} du sien. Qui a colorié le plus ? Explique avec un dessin.`,
        corr: cm1Redac('Comparer', `${F(3, 4)} = ${F(6, 8)}`, 'Si on coupe chaque quart en deux, 3 quarts deviennent 6 huitièmes : Sami et Jade ont colorié autant de ruban.', bande(4, 3) + '<br>' + bande(8, 6)) },
      { etoiles: 2, consigne: 'Complète.', ...P3.rmp([['Un demi = @ quarts', 2], ['Un tiers = @ sixièmes', 2], ['Deux quarts = @ huitièmes', 4], ['Un demi = @ dixièmes', 5], ['Deux tiers = @ sixièmes', 4], ['Un quart = @ huitièmes', 2], ['Un cinquième = @ dixièmes', 2], ['Trois quarts = @ douzièmes', 9]], 2) },
    ] },
  { titre: 'Les fractions égales à un demi', duree: '25 min',
    attendus: ['Reconnaître une fraction égale à un demi', 'Trouver la moitié d\'une unité partagée en un nombre pair de parts'],
    exos: [
      { etoiles: 1, consigne: 'Colorie la moitié de chaque bande, puis écris la fraction.',
        eleve: plGrille([bande(4, 0) + '<br>' + plFrac(), bande(6, 0) + '<br>' + plFrac(), bande(10, 0) + '<br>' + plFrac()], 3),
        corr: plGrille([bande(4, 2) + '<br>' + P3.R(F(2, 4)), bande(6, 3) + '<br>' + P3.R(F(3, 6)), bande(10, 5) + '<br>' + P3.R(F(5, 10))], 3) },
      { etoiles: 2, col: 1, consigne: `Entoure les fractions égales à ${F(1, 2)}.`,
        eleve: plListe([`${F(4, 8)} · ${F(3, 5)} · ${F(6, 12)} · ${F(2, 3)} · ${F(5, 10)}`]),
        corr: plListe([`${plEntoure(F(4, 8))} · ${F(3, 5)} · ${plEntoure(F(6, 12))} · ${F(2, 3)} · ${plEntoure(F(5, 10))}`]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...egal([[1, 2, false, 8, 4], [1, 2, true, 6, 12], [1, 2, false, 6, 3]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Une fraction égale à ${F(1, 2)} peut-elle avoir 7 comme dénominateur ? Explique.`,
        corr: cm1Redac('Moitié de 7 parts', '7 parts : on ne peut pas faire deux paquets égaux', `Non : 7 est impair, on ne peut pas prendre la moitié des 7 parts. Une fraction égale à ${F(1, 2)} a un dénominateur pair.`) },
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Sur 10 parts, la moitié, c\'est @ parts.', 5], ['Sur 12 parts, la moitié, c\'est @ parts.', 6]], 2) },
      { etoiles: 2, col: 1, consigne: `Est-ce égal à ${cm1Frac(1, 2)} ? Entoure.`, ...P3.chx([[cm1Frac(3, 6), 'oui', 'oui · non'], [cm1Frac(2, 5), 'non', 'oui · non'], [cm1Frac(5, 10), 'oui', 'oui · non']]) },
    ] },
];
})();

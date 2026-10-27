/* ============================================================
   CE2 · Planches : Fractions égales (N4)
   Fraction d'un tout (rappel du CE1) ; fractions égales inférieures ou égales à 1, dénominateurs au plus
   12, avec des bandes et des disques : « si je fais des parts deux fois plus petites et que j'en prends
   deux fois plus, j'en prends la même quantité » ; reconnaître les fractions égales à un demi.
   Fractions toujours écrites en LaTeX (cm1Frac).
   ============================================================ */
(() => {
const { rmp, chx } = P3, F = cm1Frac;
// Fraction dont un terme est à écrire (null = case vide), sur le modèle de plFrac.
const fracT = (a, b) => `<span class="pl-frac">${a == null ? '<span class="pl-case"></span>' : `<span style="font-weight:700;">${a}</span>`}<span class="pl-barre"></span>${b == null ? '<span class="pl-case"></span>' : `<span style="font-weight:700;">${b}</span>`}</span>`;
// Égalités à compléter : [[a, b, inconnue en haut ? , réponse, autre terme]] → énoncé et corrigé.
const egal = l => ({ eleve: plListe(l.map(([a, b, haut, r, t]) => `${F(a, b)} = ${haut ? fracT(null, t) : fracT(t, null)}`)),
  corr: plListe(l.map(([a, b, haut, r, t]) => `${F(a, b)} = ${P3.R(haut ? F(r, t) : F(t, r))}`)) });
const bande = (n, k) => cm1Bande(n, k, { largeur: 200 }).replace(/style="width:[^;]*;max-width:[^;]*;/, 'style="width:210px;max-width:100%;');
PLANCHES['ce2|Fractions égales'] = [
  { titre: 'Une fraction d\'un tout', duree: '25 min',
    attendus: ['Lire et écrire une fraction d\'une bande ou d\'un disque', 'Savoir ce que représentent le numérateur et le dénominateur'],
    exos: [
      { etoiles: 1, consigne: 'Écris la fraction coloriée.',
        eleve: plGrille([bande(4, 3) + '<br>' + plFrac(), bande(6, 1) + '<br>' + plFrac(), cm1Disque(8, 5) + '<br>' + plFrac()], 3),
        corr: plGrille([bande(4, 3) + '<br>' + P3.R(F(3, 4)), bande(6, 1) + '<br>' + P3.R(F(1, 6)), cm1Disque(8, 5) + '<br>' + P3.R(F(5, 8))], 3) },
      { etoiles: 1, consigne: 'Colorie la fraction demandée.',
        eleve: plGrille([bande(5, 0) + '<br>' + F(2, 5), bande(3, 0) + '<br>' + F(3, 3), bande(10, 0) + '<br>' + F(7, 10)], 3),
        corr: plGrille([bande(5, 2) + '<br>' + F(2, 5), bande(3, 3) + '<br>' + F(3, 3), bande(10, 7) + '<br>' + F(7, 10)], 3) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([[`Dans ${F(3, 8)}, l'unité est partagée en @ parts égales.`, 8], [`Dans ${F(3, 8)}, on prend @ parts.`, 3], [`${F(4, 4)} est égal à @ unité.`, 1]], 3) },
    ] },
  { titre: 'Des fractions égales', duree: '30 min',
    attendus: ['Trouver des fractions égales avec des bandes', 'Expliquer : des parts deux fois plus petites, deux fois plus de parts'],
    exos: [
      { etoiles: 1, consigne: 'Les deux bandes ont la même partie coloriée. Complète l\'égalité.',
        eleve: plListe([bande(4, 1) + ' ' + F(1, 4) + '<br>' + bande(8, 2) + ' ' + plFrac(), bande(3, 2) + ' ' + F(2, 3) + '<br>' + bande(6, 4) + ' ' + plFrac()]),
        corr: plListe([bande(4, 1) + ' ' + F(1, 4) + '<br>' + bande(8, 2) + ' ' + P3.R(F(2, 8)), bande(3, 2) + ' ' + F(2, 3) + '<br>' + bande(6, 4) + ' ' + P3.R(F(4, 6))]) },
      { etoiles: 2, col: 1, consigne: 'Complète les égalités.',
        ...egal([[3, 4, true, 6, 8], [1, 3, true, 2, 6], [2, 5, true, 4, 10], [5, 6, true, 10, 12]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure si l\'égalité est vraie ou fausse.',
        ...chx([[`${F(2, 4)} = ${F(1, 2)}`, 'vraie', 'vraie · fausse'], [`${F(2, 3)} = ${F(3, 4)}`, 'fausse', 'vraie · fausse'], [`${F(6, 8)} = ${F(3, 4)}`, 'vraie', 'vraie · fausse']]) },
      { etoiles: 3, cahier: true, consigne: `Léo a mangé ${F(2, 6)} d'une tarte, Inès ${F(1, 3)} d'une tarte pareille. Qui a mangé le plus ? Explique avec un dessin.`,
        corr: cm1Redac('Comparer', `${F(1, 3)} = ${F(2, 6)}`, 'Si on coupe chaque tiers en deux, on obtient 2 sixièmes : Léo et Inès ont mangé autant de tarte.', bande(3, 1) + '<br>' + bande(6, 2)) },
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
    ] },
];
})();

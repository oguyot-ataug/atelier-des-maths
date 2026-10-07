/* ============================================================
   5e · Planches : Pourcentages (P1)
   Appliquer un pourcentage, exprimer une proportion en pourcentage, remises et hausses, problèmes.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' }); // choix propres à chaque question
const d = v => String(+(+v).toFixed(3)).replace('.', ',');
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(typeof r === 'number' ? d(r) : r)))) });
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`), F = cm1Frac;
// Barre de 100 carreaux (10 × 10) dont n sont colorés : pour visualiser un pourcentage.
const cent = (n, w) => { let s = ''; for(let i = 0; i < 100; i++){ const x = (i % 10) * 11, y = Math.floor(i / 10) * 11; s += `<rect x="${x + 1}" y="${y + 1}" width="10" height="10" fill="${i < n ? '#7FC29B' : '#fff'}" stroke="#9AB"/>`; } return `<svg class="pl-libre" viewBox="0 0 112 112" style="width:${w || 92}px;display:block;">${s}</svg>`; };
const col = (h, t) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${h}<span class="pl-item" style="text-align:center;display:block;">${t}</span></span>`;
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
PLANCHES['5e|Pourcentages'] = [
  { titre: 'Comprendre et appliquer un pourcentage', duree: '35 min',
    attendus: ['Savoir que p % signifie p pour 100 (p sur 100)', 'Calculer p % d\'une quantité', 'Utiliser les pourcentages simples : 10 %, 25 %, 50 %, 75 %'],
    exos: [
      { etoiles: 1, consigne: 'Quel pourcentage du carré est colorié ? Complète.',
        ...(() => { const n = [30, 45, 7, 100]; return { eleve: duo(n.map(v => col(cent(v), B(1) + ' %'))), corr: duo(n.map(v => col(cent(v), R(v) + ' %'))) }; })() },
      { etoiles: 1, col: 1, consigne: 'Écris le pourcentage sous forme de fraction, puis de nombre décimal.',
        eleve: plListe(['25 % = ' + F(25, 100) + ' = ' + B(2), '8 % = ' + F(8, 100) + ' = ' + B(2), '150 % = ' + F(150, 100) + ' = ' + B(2), '60 % = ' + F(60, 100) + ' = ' + B(2)]),
        corr: plListe(['25 % = ' + F(25, 100) + ' = ' + R('0,25'), '8 % = ' + F(8, 100) + ' = ' + R('0,08'), '150 % = ' + F(150, 100) + ' = ' + R('1,5'), '60 % = ' + F(60, 100) + ' = ' + R('0,6')]) },
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        ...rmp([['50 % de 80 = @', 40], ['10 % de 350 = @', 35], ['25 % de 60 = @', 15], ['75 % de 40 = @', 30], ['100 % de 17 = @', 17]], 3) },
      { etoiles: 2, col: 1, consigne: 'Calcule (p % de N = N × p : 100).',
        ...rmp([['20 % de 45 = @', 9], ['15 % de 200 = @', 30], ['12 % de 50 = @', 6], ['5 % de 70 = @', 3.5], ['30 % de 12,5 = @', 3.75]], 3) },
      { etoiles: 2, col: 1, consigne: 'Associe : entoure l\'écriture égale.',
        ...ch([['50 % :', 'la moitié'], ['25 % :', 'le quart'], ['10 % :', 'le dixième'], ['75 % :', 'les trois quarts']], 'la moitié · le quart · le dixième · les trois quarts') },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['20 % de 50 = 50 % de 20 :', 'vrai'], ['10 % de 90 = 90 :', 'faux'], ['200 % d\'une quantité, c\'est son double :', 'vrai'], ['1 % de 300 = 3 :', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un collège compte 640 élèves ; 35 % sont demi-pensionnaires. Combien d\'élèves sont demi-pensionnaires ? Combien ne le sont pas ?',
        corr: cm1Redac('Demi-pensionnaires', '640 × 35 : 100 = 224', '224 élèves sont demi-pensionnaires.') + cm1Redac('Les autres', '640 − 224 = 416', '416 élèves ne sont pas demi-pensionnaires.') },
    ] },
  { titre: 'Exprimer une proportion en pourcentage', duree: '35 min',
    attendus: ['Écrire une proportion sous forme de fraction', 'Transformer une fraction en pourcentage (dénominateur 100)', 'Comparer des proportions grâce aux pourcentages'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Exprime en pourcentage.',
        ...rmp([[`${T(1, 2)} = @ %`, 50], [`${T(3, 4)} = @ %`, 75], [`${T(1, 5)} = @ %`, 20], [`${T(7, 10)} = @ %`, 70], [`${T(9, 20)} = @ %`, 45]], 2) },
      { etoiles: 2, col: 1, consigne: 'Quel pourcentage cela représente-t-il ?',
        ...rmp([['12 élèves sur 25 : @ %', 48], ['18 réussites sur 20 : @ %', 90], ['3 filles sur 12 élèves : @ %', 25], ['45 € sur 300 € : @ %', 15]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la plus grande proportion.',
        ...ch([['8 sur 10 ou 15 sur 20 :', '8 sur 10'], ['3 sur 5 ou 13 sur 25 :', '3 sur 5'], ['9 sur 50 ou 4 sur 20 :', '4 sur 20']], '8 sur 10 · 15 sur 20 · 3 sur 5 · 13 sur 25 · 9 sur 50 · 4 sur 20') },
      { etoiles: 2, col: 1, consigne: 'Complète le tableau des résultats d\'une classe de 25 élèves.',
        ...(() => { const L = [['Très bien', 5, 20], ['Bien', 10, 40], ['Assez bien', 7, 28], ['Insuffisant', 3, 12]], t = f => `<table class="pl-tab"><tr><th>Appréciation</th><th>Effectif</th><th>Pourcentage</th></tr>${L.map(([a, n, p]) => `<tr><td>${a}</td><td>${n}</td><td>${f(p)} %</td></tr>`).join('')}</table>`;
          return { eleve: t(() => B(2)), corr: t(p => R(p)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Un pourcentage est toujours inférieur à 100 :', 'faux'], ['Tous les pourcentages d\'un tableau complet ont pour somme 100 % :', 'vrai'], [`${T(1, 3)} vaut exactement 33 % :`, 'faux']], 'vrai · faux') },
      { etoiles: 1, col: 1, consigne: 'Complète.',
        ...rmp([['32 sur 100 = @ %', 32], ['7 sur 50 = @ %', 14], ['1 sur 4 = @ %', 25], ['6 sur 6 = @ %', 100]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans la classe A, 18 élèves sur 24 pratiquent un sport ; dans la classe B, 21 élèves sur 30. Quelle classe est la plus sportive en proportion ? Justifie avec des pourcentages.',
        corr: cm1Redac('Pourcentages', { suite: [`Classe A : ${F(18, 24)} = ${F(75, 100)} = 75 %`, `Classe B : ${F(21, 30)} = ${F(70, 100)} = 70 %`] }, 'La classe A est la plus sportive en proportion.') },
    ] },
  { titre: 'Remises et augmentations', duree: '40 min',
    attendus: ['Calculer le montant d\'une remise ou d\'une hausse', 'Calculer le nouveau prix', 'Comparer deux offres'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Soldes : calcule la remise, puis le prix soldé.',
        ...(() => { const l = [[80, 20], [45, 10], [120, 25], [36, 50]];
          return { eleve: plListe(l.map(([p, t]) => `${p} € avec ${t} % de remise : remise ${B(2)} € ; prix soldé ${B(2)} €`)), corr: plListe(l.map(([p, t]) => `${p} € avec ${t} % de remise : remise ${R(d(p * t / 100))} € ; prix soldé ${R(d(p - p * t / 100))} €`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Hausse : calcule l\'augmentation, puis le nouveau prix.',
        ...(() => { const l = [[50, 10], [200, 5], [64, 25]];
          return { eleve: plListe(l.map(([p, t]) => `${p} € augmenté de ${t} % : hausse ${B(2)} € ; nouveau prix ${B(2)} €`)), corr: plListe(l.map(([p, t]) => `${p} € augmenté de ${t} % : hausse ${R(d(p * t / 100))} € ; nouveau prix ${R(d(p + p * t / 100))} €`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'offre la plus avantageuse pour un article à 60 €.',
        ...chx([['', '30 % de remise', '30 % de remise · 15 € de remise'], ['', '10 % de remise', '10 % de remise · 5 € de remise'], ['Pour deux articles :', '50 % sur le 2e', '50 % sur le 2e · 20 % sur les deux']]) },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        ...rmp([['Un prix baisse de 20 € sur 100 € : remise de @ %', 20], ['Un prix passe de 40 € à 30 € : remise de @ %', 25], ['Un prix passe de 80 € à 88 € : hausse de @ %', 10]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un vélo coûte 250 €. Le magasin annonce 15 % de remise. Combien coûte le vélo soldé ? Tom paie avec 5 billets de 50 € : combien lui rend-on ?',
        corr: cm1Redac('Prix soldé', '250 × 15 : 100 = 37,50 et 250 − 37,50 = 212,50', 'Le vélo soldé coûte 212,50 €.') + cm1Redac('Monnaie', '5 × 50 − 212,50 = 250 − 212,50 = 37,50', 'On lui rend 37,50 €.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le loyer de Mme Martin est de 640 € par mois. Il augmente de 5 %. Quel est le nouveau loyer ? Combien paiera-t-elle de plus sur un an ?',
        corr: cm1Redac('Nouveau loyer', '640 × 5 : 100 = 32 et 640 + 32 = 672', 'Le nouveau loyer est de 672 €.') + cm1Redac('Sur un an', '32 × 12 = 384', 'Elle paiera 384 € de plus sur un an.') },
    ] },
  { titre: 'Problèmes avec des pourcentages', duree: '40 min',
    attendus: ['Lire et utiliser des pourcentages dans un document', 'Calculer un effectif à partir d\'un pourcentage', 'Choisir le bon calcul'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Un jus de fruits de 1 L contient 12 % de sucre, 85 % d\'eau et 3 % d\'autres éléments. Complète (1 L de jus pèse environ 1 000 g).',
        ...rmp([['Masse de sucre : @ g', 120], ['Masse d\'eau : @ g', 850], ['Somme des pourcentages : @ %', 100]], 3) },
      { etoiles: 2, col: 1, consigne: 'Élection de délégués (150 votants).',
        ...rmp([['Anna obtient 42 % des voix : @ voix', 63], ['Bilal obtient 38 % des voix : @ voix', 57], ['Les autres voix (votes blancs) : @ %', 20], ['Soit @ voix', 30]], 3) },
      { etoiles: 2, col: 1, consigne: 'Quel calcul permet de répondre ? Entoure.',
        ...chx([['15 % de 80 :', '80 × 15 : 100', '80 × 15 : 100 · 15 : 80 × 100'], ['Pourcentage que représentent 15 sur 80 :', '15 : 80 × 100', '80 × 15 : 100 · 15 : 80 × 100'], ['Prix de 80 € après 15 % de remise :', '80 − 80 × 15 : 100', '80 − 15 · 80 − 80 × 15 : 100']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Baisser un prix de 50 % puis encore de 50 %, c\'est le rendre gratuit :', 'faux'], ['30 % de 200 = 60 :', 'vrai'], ['Si 40 % des élèves sont des garçons, 60 % sont des filles :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Une gourde de 75 cL est remplie à 60 %.',
        ...rmp([['Elle contient @ cL', 45], ['Il manque @ cL pour la remplir', 30], ['Ce manque représente @ % de la gourde', 40]], 2) },
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement 10 %, puis déduis.',
        ...rmp([['10 % de 240 = @', 24], ['Donc 20 % de 240 = @', 48], ['Et 5 % de 240 = @', 12], ['Et 15 % de 240 = @', 36]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un sondage auprès de 400 collégiens, 55 % lisent des mangas et, parmi eux, 20 % en lisent tous les jours. Combien de collégiens lisent des mangas tous les jours ?',
        corr: cm1Redac('Lecteurs de mangas', '400 × 55 : 100 = 220', '220 collégiens lisent des mangas.') + cm1Redac('Tous les jours', '220 × 20 : 100 = 44', '44 collégiens lisent des mangas tous les jours.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une classe de 28 élèves part en voyage ; 25 % des élèves ne peuvent pas venir. Le car a 25 places pour les élèves. Y a-t-il assez de places ?',
        corr: cm1Redac('Absents', '28 × 25 : 100 = 7', '7 élèves ne viennent pas.') + cm1Redac('Présents', '28 − 7 = 21', '21 élèves partent : les 25 places suffisent.') },
    ] },
];
})();

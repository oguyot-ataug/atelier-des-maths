/* ============================================================
   6e · Planches : Opérations et ordre de grandeur (N4, addition et soustraction de décimaux)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 4), R = v => plRep(String(v));
const duo = l => `<div style="display:flex;justify-content:space-around;align-items:flex-start;gap:8px;flex-wrap:wrap;">${l.join('')}</div>`;
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const ch = it => ({ eleve: plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)), corr: plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) });
const fr = x => String(+x.toFixed(4)).replace('.', ',');
// Opération posée alignée sur la virgule : a op b = résultat (calculé) ; o : { trous, rep } (écran).
function pose(a, op, b, o){ const r = op === '+' ? a + b : a - b, l = [fr(a), fr(b), fr(r)], d = Math.max(...l.map(x => (x.split(',')[1] || '').length));
  const al = x => { const n = (x.split(',')[1] || '').length; return x + (n ? '' : d ? ' ' : '') + ' '.repeat(d - n); };
  const lignes = [[' ', al(l[0])], [op === '-' ? '−' : '+', al(l[1])], [' ', al(l[2])]];
  if(!o) lignes[2][1] = lignes[2][1].replace(/\S/g, ' ');
  return cm1Posee(lignes, '', o || {}); }
const poses = (l, rep) => duo(l.map(([a, op, b]) => pose(a, op, b, rep)));
const exoPose = (consigne, l, x) => Object.assign({ consigne, eleve: poses(l), corr: poses(l, {}), ecran: { eleve: poses(l, { trous: true }), corr: poses(l, { rep: true }) } }, x);
PLANCHES['6e|Opérations et ordre de grandeur'] = [
  { titre: 'Additionner des nombres décimaux', duree: '35 min',
    attendus: ['Poser une addition de nombres décimaux en alignant les virgules', 'Calculer mentalement une somme simple', 'Utiliser les propriétés de l\'addition pour calculer astucieusement'],
    exos: [
      exoPose('Pose et calcule (aligne les virgules !).', [[35.48, '+', 9.7], [126.5, '+', 8.95], [0.875, '+', 12.6]], { etoiles: 1 }),
      exoPose('Pose et calcule.', [[407.06, '+', 93.9], [18.025, '+', 7.98], [3.6, '+', 0.47]], { etoiles: 2 }),
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        eleve: plListe(['2,5 + 1,5 = ' + B(), '0,7 + 0,3 = ' + B(), '4,25 + 0,75 = ' + B(), '12,8 + 0,2 = ' + B(), '3,06 + 0,04 = ' + B()]),
        corr: plListe(['2,5 + 1,5 = ' + R(4), '0,7 + 0,3 = ' + R(1), '4,25 + 0,75 = ' + R(5), '12,8 + 0,2 = ' + R(13), '3,06 + 0,04 = ' + R('3,1')]) },
      { etoiles: 2, col: 1, consigne: 'Calcule astucieusement en regroupant les termes.',
        eleve: plListe(['4,7 + 3,8 + 5,3 = ' + B(), '1,25 + 6,4 + 0,75 = ' + B(), '0,6 + 9,9 + 0,4 + 0,1 = ' + B()]),
        corr: plListe(['4,7 + 3,8 + 5,3 = (4,7 + 5,3) + 3,8 = ' + R('13,8'), '1,25 + 6,4 + 0,75 = (1,25 + 0,75) + 6,4 = ' + R('8,4'), '0,6 + 9,9 + 0,4 + 0,1 = 1 + 10 = ' + R(11)]) },
      { etoiles: 2, col: 1, consigne: 'Complète pour obtenir l\'unité supérieure.',
        eleve: plListe(['0,3 + ' + B() + ' = 1', '0,45 + ' + B() + ' = 1', '2,8 + ' + B() + ' = 3', '6,95 + ' + B() + ' = 7']),
        corr: plListe(['0,3 + ' + R('0,7') + ' = 1', '0,45 + ' + R('0,55') + ' = 1', '2,8 + ' + R('0,2') + ' = 3', '6,95 + ' + R('0,05') + ' = 7']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Léo a acheté un livre à 12,90 €, un cahier à 3,45 € et un stylo à 1,65 €. Combien a-t-il dépensé ?',
        corr: cm1Redac('Dépense totale', { suite: ['12,90 + 3,45 + 1,65', '= 12,90 + (3,45 + 1,65) = 12,90 + 5,10'] }, 'Léo a dépensé 18 €.') },
    ] },
  { titre: 'Soustraire des nombres décimaux', duree: '35 min',
    attendus: ['Poser une soustraction de nombres décimaux en complétant par des zéros', 'Calculer mentalement une différence simple', 'Contrôler par une addition'],
    exos: [
      exoPose('Pose et calcule (complète par des zéros si besoin).', [[47.5, '-', 18.27], [100, '-', 36.4], [9.05, '-', 4.8]], { etoiles: 1 }),
      exoPose('Pose et calcule.', [[250.3, '-', 87.65], [12, '-', 0.125], [63.04, '-', 59.7]], { etoiles: 2 }),
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.',
        eleve: plListe(['5 − 0,5 = ' + B(), '3,7 − 1,2 = ' + B(), '10 − 2,5 = ' + B(), '8,45 − 0,45 = ' + B(), '1 − 0,01 = ' + B()]),
        corr: plListe(['5 − 0,5 = ' + R('4,5'), '3,7 − 1,2 = ' + R('2,5'), '10 − 2,5 = ' + R('7,5'), '8,45 − 0,45 = ' + R(8), '1 − 0,01 = ' + R('0,99')]) },
      { etoiles: 2, col: 1, consigne: 'Trouve le nombre manquant.',
        eleve: plListe([B() + ' + 4,6 = 10', '7,25 − ' + B() + ' = 5', B() + ' − 3,8 = 1,2', '15 − ' + B() + ' = 9,75']),
        corr: plListe([R('5,4') + ' + 4,6 = 10', '7,25 − ' + R('2,25') + ' = 5', R(5) + ' − 3,8 = 1,2', '15 − ' + R('5,25') + ' = 9,75']) },
      { etoiles: 2, col: 1, consigne: 'Sam a calculé 14,2 − 6,85 = 8,43. Vérifie avec une addition, puis entoure.',
        eleve: plListe(['8,43 + 6,85 = ' + B(), 'Le calcul de Sam est <b>juste · faux</b>', 'Le bon résultat est ' + B()]),
        corr: plListe(['8,43 + 6,85 = ' + R('15,28'), 'Le calcul de Sam est ' + plEntoure('faux'), 'Le bon résultat est ' + R('7,35')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une bouteille contient 1,5 L de jus. On remplit trois verres de 0,25 L, 0,3 L et 0,35 L. Quelle quantité de jus reste-t-il ?',
        corr: cm1Redac('Jus versé', '0,25 + 0,3 + 0,35 = 0,9', 'On a versé 0,9 L.') + cm1Redac('Jus restant', '1,5 − 0,9 = 0,6', 'Il reste 0,6 L de jus.') },
    ] },
  { titre: 'Ordre de grandeur', duree: '30 min',
    attendus: ['Arrondir les termes pour estimer un résultat', 'Choisir un ordre de grandeur adapté', 'Contrôler la vraisemblance d\'un résultat'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'ordre de grandeur de chaque somme (arrondis chaque terme à l\'unité).',
        ...ch([['19,8 + 30,15 :', '50', '40 · 50 · 60'], ['7,9 + 12,1 :', '20', '19 · 20 · 21'], ['98,7 + 1,4 :', '100', '90 · 100 · 110']]) },
      { etoiles: 1, col: 1, consigne: 'Donne un ordre de grandeur (en arrondissant à la dizaine).',
        eleve: plListe(['48,3 + 31,9 ≈ ' + B(), '102,5 − 39,8 ≈ ' + B(), '251 + 69,7 ≈ ' + B()]),
        corr: plListe(['48,3 + 31,9 ≈ 50 + 30 = ' + R(80), '102,5 − 39,8 ≈ 100 − 40 = ' + R(60), '251 + 69,7 ≈ 250 + 70 = ' + R(320)]) },
      { etoiles: 2, col: 1, consigne: 'Sans poser l\'opération, entoure le seul résultat possible.',
        ...ch([['45,6 + 38,9 :', '84,5', '74,5 · 84,5 · 845'], ['120,4 − 59,7 :', '60,7', '60,7 · 70,7 · 607'], ['9,98 + 0,7 :', '10,68', '9,105 · 10,68 · 16,98']]) },
      { etoiles: 2, col: 1, consigne: 'Ces résultats sont-ils vraisemblables ? Entoure.',
        ...ch([['Un panier de courses : 4,95 € + 12,30 € + 6,80 € = 240,05 €', 'non', 'oui · non'], ['Une course : 1,2 km + 0,85 km = 2,05 km', 'oui', 'oui · non'], ['Une taille : 1,52 m − 0,3 m = 1,49 m', 'non', 'oui · non']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Avec 50 €, Nina veut acheter un pull à 23,90 €, un tee-shirt à 9,95 € et une casquette à 14,85 €. A-t-elle assez d\'argent ? Réponds d\'abord avec un ordre de grandeur, puis vérifie par un calcul exact.',
        corr: cm1Redac('Ordre de grandeur', '24 + 10 + 15 = 49', 'C\'est proche de 50 € : il faut calculer exactement.') + cm1Redac('Calcul exact', '23,90 + 9,95 + 14,85 = 48,70', 'Nina a assez d\'argent : il lui reste 50 − 48,70 = 1,30 €.') },
    ] },
  { titre: 'Problèmes d\'addition et de soustraction', duree: '40 min',
    attendus: ['Choisir l\'opération qui convient', 'Résoudre un problème en plusieurs étapes', 'Rédiger la solution : calcul et phrase réponse'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'opération qui permet de répondre.',
        ...ch([['Un livre coûte 8,50 € et un autre 6,75 €. Prix des deux livres ?', '8,50 + 6,75', '8,50 + 6,75 · 8,50 − 6,75'], ['Il avait 20 € et dépense 13,40 €. Ce qui lui reste ?', '20 − 13,40', '20 + 13,40 · 20 − 13,40'], ['Paul mesure 1,48 m, Léa 1,53 m. Écart de taille ?', '1,53 − 1,48', '1,53 + 1,48 · 1,53 − 1,48']]) },
      { etoiles: 2, consigne: 'Voici les temps (en secondes) de quatre relais au 4 × 100 m. Complète le tableau.',
        eleve: tab(['Coureur', 'Ali', 'Bea', 'Chloé', 'Dan', 'Total'], [['Temps (s)', '13,45', '12,8', '14,05', B(), '53,5']]) + plListe(['Écart entre Chloé et Bea : ' + B() + ' s']),
        corr: tab(['Coureur', 'Ali', 'Bea', 'Chloé', 'Dan', 'Total'], [['Temps (s)', '13,45', '12,8', '14,05', R('13,2'), '53,5']]) + plListe(['Écart entre Chloé et Bea : 14,05 − 12,8 = ' + R('1,25') + ' s']) },
      { etoiles: 2, col: 1, consigne: 'Un rectangle a pour longueur 7,4 cm et pour largeur 3,85 cm. Complète.',
        eleve: plListe(['Longueur + largeur = ' + B() + ' cm', 'Périmètre = ' + B() + ' cm', 'Différence entre longueur et largeur : ' + B() + ' cm']),
        corr: plListe(['Longueur + largeur = ' + R('11,25') + ' cm', 'Périmètre = 11,25 + 11,25 = ' + R('22,5') + ' cm', 'Différence entre longueur et largeur : ' + R('3,55') + ' cm']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un randonneur parcourt 12,6 km le matin et 3,85 km de moins l\'après-midi. Quelle distance a-t-il parcourue dans la journée ?',
        corr: cm1Redac('Après-midi', '12,6 − 3,85 = 8,75', 'L\'après-midi, il parcourt 8,75 km.') + cm1Redac('Journée', '12,6 + 8,75 = 21,35', 'Il a parcouru 21,35 km dans la journée.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Mila a 3 billets de 5 € et 2,60 € en pièces. Elle achète un jeu à 11,95 €. Combien lui reste-t-il ? Peut-elle encore acheter une boisson à 5,80 € ?',
        corr: cm1Redac('Argent de Mila', '15 + 2,60 = 17,60', 'Mila a 17,60 €.') + cm1Redac('Après l\'achat', '17,60 − 11,95 = 5,65', 'Il lui reste 5,65 € : elle ne peut pas acheter la boisson (5,65 &lt; 5,80).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Trouve deux nombres décimaux dont la somme est 10 et la différence 2,6.',
        corr: cm1Redac('Recherche', { suite: ['Le plus grand vaut la moitié de 10 + 2,6 : 12,6 ÷ 2 = 6,3.', 'Le plus petit : 10 − 6,3 = 3,7.'] }, 'Les nombres sont 6,3 et 3,7 (6,3 + 3,7 = 10 et 6,3 − 3,7 = 2,6).') },
    ] },
];
})();

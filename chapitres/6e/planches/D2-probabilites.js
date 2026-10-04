/* ============================================================
   6e · Planches : Probabilités (D2)
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac();
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`);
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
// Urne : l'outil « urne » du tableau interactif (urnSvg) ; boules [[nombre, couleur]].
const urne = l => `<div style="max-width:130px;margin:0 auto;">${urnSvg(l.map(([count, color]) => ({ count, color })), 'urne').replace(/<svg width="[\d.]+" height="[\d.]+"/, '<svg')}</div>`;
// Roue de loterie : secteurs égaux de couleurs données.
const roue = cs => { const n = cs.length; let s = ''; cs.forEach((c, i) => { const a = i / n * 2 * Math.PI - Math.PI / 2, b = (i + 1) / n * 2 * Math.PI - Math.PI / 2; s += `<path d="M60,60 L${60 + 50 * Math.cos(a)},${60 + 50 * Math.sin(a)} A50,50 0 0 1 ${60 + 50 * Math.cos(b)},${60 + 50 * Math.sin(b)} Z" fill="${c}" stroke="#fff" stroke-width="2"/>`; }); return S(120, 125, s + '<polygon points="60,4 54,-6 66,-6" fill="#1F3A5C" transform="translate(0,8)"/>', 110); };
const ROU = '#D93025', BLE = '#0D5BA3', VER = '#1F7A4D', JAU = '#F2C94C';
PLANCHES['6e|Probabilités'] = [
  { titre: 'Expériences aléatoires', duree: '30 min',
    attendus: ['Reconnaître une expérience aléatoire', 'Lister les issues d\'une expérience', 'Utiliser le vocabulaire : certain, impossible, probable, peu probable'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Ces expériences sont-elles aléatoires (on ne peut pas prévoir le résultat) ? Entoure.',
        ...ch([['Lancer un dé :', 'oui'], ['Lâcher une balle et regarder si elle tombe :', 'non'], ['Tirer une carte dans un jeu mélangé :', 'oui'], ['Calculer 3 × 4 :', 'non']], 'oui · non') },
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Entoure.',
        ...ch([['Obtenir un nombre plus petit que 7 :', 'certain'], ['Obtenir 8 :', 'impossible'], ['Obtenir un 6 :', 'peu probable'], ['Obtenir un nombre plus grand que 1 :', 'très probable']], 'impossible · peu probable · très probable · certain') },
      { etoiles: 2, col: 1, consigne: 'Combien d\'issues possibles ?',
        eleve: plListe(['Lancer une pièce : ' + B(1), 'Lancer un dé à 6 faces : ' + B(1), 'Tirer une boule dans une urne de 3 couleurs : ' + B(1), 'Tourner une roue de 8 secteurs numérotés : ' + B(1)]),
        corr: plListe(['Lancer une pièce : ' + R(2), 'Lancer un dé à 6 faces : ' + R(6), 'Tirer une boule dans une urne de 3 couleurs : ' + R(3), 'Tourner une roue de 8 secteurs numérotés : ' + R(8)]) },
      { etoiles: 2, col: 1, consigne: `Dans cette urne, on tire une boule au hasard.<div style="text-align:center;">${urne([[5, ROU], [2, BLE], [1, VER]])}</div>`,
        ...ch([['Tirer une boule rouge est', 'le plus probable'], ['Tirer une boule verte est', 'le moins probable'], ['Tirer une boule jaune est', 'impossible']], 'impossible · le moins probable · le plus probable') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Invente une expérience aléatoire avec un événement certain, un événement impossible et un événement peu probable.',
        corr: cm1Redac('Exemple', { suite: ['On tire une carte dans un jeu de 32 cartes.', 'Certain : tirer une carte rouge ou noire. Impossible : tirer un joker. Peu probable : tirer l\'as de cœur.'] }, 'Chaque événement est décrit par une phrase.') },
    ] },
  { titre: 'Calculer des probabilités', duree: '40 min',
    attendus: ['Calculer une probabilité dans une situation d\'équiprobabilité : issues favorables / issues possibles', 'Exprimer une probabilité par une fraction', 'Comparer des probabilités'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé équilibré à 6 faces. Donne la probabilité (sans simplifier).',
        eleve: plListe([ligne('obtenir 4 :', Fr), ligne('obtenir un nombre pair :', Fr), ligne('obtenir un multiple de 3 :', Fr), ligne('obtenir 7 :', B(1))]),
        corr: plListe([ligne('obtenir 4 :', R(F(1, 6))), ligne('obtenir un nombre pair :', R(F(3, 6))), ligne('obtenir un multiple de 3 :', R(F(2, 6))), ligne('obtenir 7 :', R(0))]) },
      { etoiles: 2, col: 1, consigne: `Une urne contient 5 boules rouges, 3 bleues et 2 vertes. On tire une boule au hasard (fractions sans simplifier).<div style="text-align:center;">${urne([[5, ROU], [3, BLE], [2, VER]])}</div>`,
        eleve: plListe([ligne('P(rouge) =', Fr), ligne('P(bleue) =', Fr), ligne('P(verte) =', Fr), ligne('P(pas rouge) =', Fr)]),
        corr: plListe([ligne('P(rouge) =', R(F(5, 10))), ligne('P(bleue) =', R(F(3, 10))), ligne('P(verte) =', R(F(2, 10))), ligne('P(pas rouge) =', R(F(5, 10)))]) },
      { etoiles: 2, col: 1, consigne: `On fait tourner cette roue (8 secteurs égaux ; fractions sans simplifier).<div style="text-align:center;">${roue([ROU, BLE, ROU, JAU, ROU, BLE, VER, ROU])}</div>`,
        eleve: plListe([ligne('P(rouge) =', Fr), ligne('P(bleu) =', Fr), 'La couleur la moins probable : <b>bleu · jaune et vert · rouge</b>']),
        corr: plListe([ligne('P(rouge) =', R(F(4, 8))), ligne('P(bleu) =', R(F(2, 8))), 'La couleur la moins probable : ' + plEntoure('jaune et vert')]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sac A : 3 billes gagnantes sur 10. Sac B : 2 billes gagnantes sur 5. Dans quel sac vaut-il mieux tirer ?',
        corr: cm1Redac('Comparaison', `P(A) = ${F(3, 10)} ; P(B) = ${F(2, 5)} = ${F(4, 10)}`, `${F(4, 10)} &gt; ${F(3, 10)} : il vaut mieux tirer dans le sac B.`) },
    ] },
  { titre: 'Fréquences et probabilités', duree: '35 min',
    attendus: ['Calculer la fréquence d\'un résultat : effectif / nombre de lancers', 'Comparer fréquence observée et probabilité', 'Comprendre que la fréquence se rapproche de la probabilité quand on répète l\'expérience'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Léo a lancé une pièce 50 fois et a obtenu 22 fois « pile ». Complète.',
        eleve: plListe([ligne('Fréquence de « pile » :', Fr), 'en pourcentage : ' + B() + ' %', ligne('Probabilité d\'obtenir « pile » :', Fr)]),
        corr: plListe([ligne('Fréquence de « pile » :', R(F(22, 50))), 'en pourcentage : ' + R(44) + ' %', ligne('Probabilité d\'obtenir « pile » :', R(F(1, 2)))]) },
      { etoiles: 2, consigne: 'Une classe a lancé un dé 600 fois. Complète le tableau des fréquences (en %).',
        eleve: `<table class="pl-tab"><tr><th>Face</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Effectif</td><td>96</td><td>105</td><td>99</td><td>102</td><td>93</td><td>105</td></tr><tr><td>Fréquence (%)</td><td>${B()}</td><td>${B()}</td><td>${B()}</td><td>${B()}</td><td>${B()}</td><td>${B()}</td></tr></table>`,
        corr: `<table class="pl-tab"><tr><th>Face</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr><tr><td>Effectif</td><td>96</td><td>105</td><td>99</td><td>102</td><td>93</td><td>105</td></tr><tr><td>Fréquence (%)</td><td>${R(16)}</td><td>${R('17,5')}</td><td>${R('16,5')}</td><td>${R(17)}</td><td>${R('15,5')}</td><td>${R('17,5')}</td></tr></table>` },
      { etoiles: 2, col: 1, consigne: 'D\'après le tableau du dé, vrai ou faux ?',
        ...ch([['Les fréquences sont proches de 16,7 % (un sixième).', 'vrai'], ['Le dé est sûrement truqué, car les fréquences ne sont pas égales.', 'faux'], ['Avec 6 000 lancers, les fréquences seraient encore plus proches d\'un sixième.', 'vrai']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Lance une pièce 20 fois et note les résultats. Calcule la fréquence de « face ». Mets en commun avec la classe : que remarques-tu ?',
        corr: cm1Redac('Observation', 'Sur 20 lancers, la fréquence peut être loin de 50 %.', 'En regroupant tous les lancers de la classe, la fréquence se rapproche de 50 % (la probabilité).') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On tire une carte au hasard dans un jeu de 32 cartes (8 cartes par couleur : cœur, carreau, trèfle, pique ; 4 as). Calcule la probabilité de tirer un as, un cœur, une carte rouge.',
        corr: cm1Redac('Probabilités', { suite: [`P(as) = ${F(4, 32)}`, `P(cœur) = ${F(8, 32)}`, `P(rouge) = ${F(16, 32)}`] }, `On peut simplifier : ${F(1, 8)}, ${F(1, 4)} et ${F(1, 2)}.`) },
    ] },
];
})();

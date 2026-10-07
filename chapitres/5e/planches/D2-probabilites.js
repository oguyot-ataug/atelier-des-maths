/* ============================================================
   5e · Planches : Probabilités (D2)
   Vocabulaire et échelle de probabilité, calculs en situation d'équiprobabilité, événement contraire,
   fréquences et choix d'un jeu. Urne : l'outil « urne » du tableau interactif (urnSvg).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac();
const T = (a, b) => cm1Tex(`\\tfrac{${a}}{${b}}`);
const d = v => String(+(+v).toFixed(3)).replace('.', ',');
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const urne = l => `<div style="max-width:120px;margin:0 auto;">${urnSvg(l.map(([count, color]) => ({ count, color })), 'urne').replace(/<svg width="[\d.]+" height="[\d.]+"/, '<svg')}</div>`;
const roue = cs => { const n = cs.length; let s = ''; cs.forEach((c, i) => { const a = i / n * 2 * Math.PI - Math.PI / 2, b = (i + 1) / n * 2 * Math.PI - Math.PI / 2; s += `<path d="M60,60 L${60 + 50 * Math.cos(a)},${60 + 50 * Math.sin(a)} A50,50 0 0 1 ${60 + 50 * Math.cos(b)},${60 + 50 * Math.sin(b)} Z" fill="${c}" stroke="#fff" stroke-width="2"/>`; }); return S(120, 125, s + '<polygon points="60,4 54,-6 66,-6" fill="#1C2B39" transform="translate(0,8)"/>', 110); };
// Liste de probabilités à écrire sous forme de fraction (sans simplifier) : [texte, num, den].
const probas = l => ({ eleve: plListe(l.map(([t]) => ligne(t, Fr))), corr: plListe(l.map(([t, a, b]) => ligne(t, R(F(a, b))))) });
const ROU = '#D93025', BLE = '#0D5BA3', VER = '#1F7A4D', JAU = '#F2C94C';
PLANCHES['5e|Probabilités'] = [
  { titre: 'Vocabulaire et échelle des probabilités', duree: '35 min',
    attendus: ['Distinguer issue et événement', 'Savoir qu\'une probabilité est comprise entre 0 (impossible) et 1 (certain)', 'Placer un événement sur une échelle de probabilité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé à 6 faces. Entoure.',
        ...chx([['« Obtenir 3 » est…', 'une issue', 'une issue · un événement à plusieurs issues'], ['« Obtenir un nombre pair » est…', 'un événement à plusieurs issues', 'une issue · un événement à plusieurs issues'], ['« Obtenir 0 » est…', 'impossible', 'impossible · certain'], ['« Obtenir moins de 10 » est…', 'certain', 'impossible · certain']]) },
      { etoiles: 1, col: 1, consigne: 'Entoure la probabilité de chaque événement.',
        ...chx([['Un événement impossible :', '0', '0 · 0,5 · 1'], ['Un événement certain :', '1', '0 · 0,5 · 1'], ['Obtenir « pile » avec une pièce :', '0,5', '0 · 0,5 · 1'], ['Une probabilité peut-elle valoir 1,2 ?', 'non', 'oui · non']]) },
      { etoiles: 2, consigne: 'On tire une carte dans un jeu de 32 cartes (16 rouges, 16 noires, 4 as). Place sur l\'échelle : A « carte rouge » ; B « un joker » ; C « une carte rouge ou noire » ; D « pas un as » (environ 0,9).',
        ...(() => { const L = 460, px = v => 30 + L * v, pts = [[0.5, 'A'], [0, 'B'], [1, 'C'], [0.9, 'D']], ax = p => cm1Axe(0, 1, 0.1, 0.5, p, { fmt: d, alterne: true });
          return { eleve: plX(ax([]), { t: 'pts', tol: 18, noms: pts.map(p => p[1]), cands: Array.from({ length: 11 }, (_, i) => [px(i / 10), 44]), att: Object.fromEntries(pts.map(([v, n]) => [n, [px(v), 44]])) }), corr: ax(pts) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Une issue est un résultat possible d\'une expérience :', 'vrai'], ['Un événement peut être formé de plusieurs issues :', 'vrai'], ['Si on a obtenu 6 trois fois de suite, le prochain lancer a moins de chances de donner 6 :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'On fait tourner la roue (8 secteurs égaux). Entoure.',
        ...(() => { const r = `<div style="text-align:center;">${roue([ROU, BLE, ROU, JAU, ROU, BLE, ROU, BLE])}</div>`, q = chx([['« Rouge » est…', 'aussi probable que « pas rouge »', 'plus probable que « pas rouge » · aussi probable que « pas rouge »'], ['« Vert » est…', 'impossible', 'impossible · peu probable']]);
          return { eleve: r + q.eleve, corr: r + q.corr }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'On lance un dé à 6 faces. Donne un événement impossible, un événement certain, et un événement de probabilité 0,5.',
        corr: cm1Redac('Exemples', { suite: ['Impossible : « obtenir 7 ».', 'Certain : « obtenir un nombre entre 1 et 6 ».', 'Probabilité 0,5 : « obtenir un nombre pair » (3 issues sur 6).'] }, 'Il existe d\'autres réponses justes.') },
    ] },
  { titre: 'Calculer une probabilité', duree: '40 min',
    attendus: ['Repérer une situation d\'équiprobabilité', 'Calculer : nombre d\'issues favorables : nombre d\'issues possibles', 'Écrire une probabilité sous forme de fraction, de décimal, de pourcentage'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On lance un dé équilibré à 12 faces numérotées de 1 à 12. Donne la probabilité (sans simplifier).',
        ...probas([['obtenir 7 :', 1, 12], ['obtenir un nombre pair :', 6, 12], ['obtenir un multiple de 5 :', 2, 12], ['obtenir un nombre supérieur à 9 :', 3, 12]]) },
      { etoiles: 1, col: 1, consigne: `On tire une boule au hasard (sans simplifier).<div style="text-align:center;">${urne([[6, ROU], [3, BLE], [3, VER]])}</div>`,
        ...probas([['P(rouge) =', 6, 12], ['P(bleue) =', 3, 12], ['P(verte ou bleue) =', 6, 12]]) },
      { etoiles: 2, col: 1, consigne: 'On choisit au hasard une lettre du mot MATHÉMATIQUES (13 lettres, sans compter les accents).',
        ...probas([['P(« M ») =', 2, 13], ['P(« A ») =', 2, 13], ['P(une voyelle) =', 6, 13]]) },
      { etoiles: 2, col: 1, consigne: 'Jeu de 32 cartes (8 par couleur : cœur, carreau, trèfle, pique ; 4 rois). Probabilité (sans simplifier).',
        ...probas([['tirer un roi :', 4, 32], ['tirer un trèfle :', 8, 32], ['tirer le roi de trèfle :', 1, 32]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: `Dans un sac, il y a 4 jetons verts, 6 rouges et des jetons bleus. La probabilité de tirer un bleu est ${T(1, 3)}. Combien y a-t-il de jetons bleus ?`,
        corr: cm1Redac('Raisonnement', { suite: [`Les verts et les rouges (10 jetons) représentent 1 − ${F(1, 3)} = ${F(2, 3)} des jetons.`, `Il y a donc 15 jetons en tout (${F(10, 15)} = ${F(2, 3)}).`] }, 'Il y a 15 − 10 = 5 jetons bleus.') },
    ] },
  { titre: 'Événement contraire', duree: '35 min',
    attendus: ['Décrire l\'événement contraire d\'un événement', 'Utiliser P(non A) = 1 − P(A)', 'Vérifier que la somme des probabilités de toutes les issues vaut 1'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Entoure l\'événement contraire.',
        ...chx([['« Obtenir un nombre pair » (dé) :', 'obtenir un nombre impair', 'obtenir un nombre impair · obtenir 1'], ['« Tirer une boule rouge » (rouges et bleues) :', 'tirer une boule bleue', 'tirer une boule bleue · tirer deux boules'], ['« Gagner » (sans match nul) :', 'perdre', 'perdre · rejouer']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule la probabilité de l\'événement contraire.',
        eleve: plListe([ligne('P(A) =', F(1, 4), '; P(non A) =', Fr), ligne('P(B) =', F(5, 8), '; P(non B) =', Fr), 'P(C) = 0,3 ; P(non C) = ' + B(2), 'P(D) = 85 % ; P(non D) = ' + B(1) + ' %']),
        corr: plListe([ligne('P(A) =', F(1, 4), '; P(non A) =', R(F(3, 4))), ligne('P(B) =', F(5, 8), '; P(non B) =', R(F(3, 8))), 'P(C) = 0,3 ; P(non C) = ' + R('0,7'), 'P(D) = 85 % ; P(non D) = ' + R(15) + ' %']) },
      { etoiles: 2, col: 1, consigne: 'Une roue a trois couleurs : P(rouge) = 0,5 ; P(bleu) = 0,3. Complète.',
        ...(() => { const l = [['P(vert) = @', '0,2'], ['P(non rouge) = @', '0,5'], ['P(rouge ou bleu) = @', '0,8']]; return { eleve: plListe(l.map(([t]) => t.replace('@', B(2)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['P(A) + P(non A) = 1 :', 'vrai'], ['Si P(A) = 0,2, alors A est plus probable que non A :', 'faux'], ['Un événement et son contraire peuvent se réaliser en même temps :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Sur une loterie, 3 billets sur 200 sont gagnants. Complète (sans simplifier).',
        eleve: plListe([ligne('P(gagner) =', Fr), ligne('P(perdre) =', Fr)]), corr: plListe([ligne('P(gagner) =', R(F(3, 200))), ligne('P(perdre) =', R(F(197, 200)))]) },
      { etoiles: 2, col: 1, consigne: 'Écris chaque probabilité en nombre décimal, puis en pourcentage.',
        ...(() => { const l = [[1, 4, '0,25', 25], [3, 5, '0,6', 60], [7, 20, '0,35', 35]]; return { eleve: plListe(l.map(([a, b]) => `${F(a, b)} = ${B(2)} = ${B(1)} %`)), corr: plListe(l.map(([a, b, x, p]) => `${F(a, b)} = ${R(x)} = ${R(p)} %`)) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'La météo annonce 70 % de risque de pluie demain. Quelle est la probabilité qu\'il ne pleuve pas ? Faut-il prendre un parapluie ? Explique.',
        corr: cm1Redac('Pas de pluie', '100 % − 70 % = 30 %', 'Il y a 30 % de chances qu\'il ne pleuve pas : la pluie est plus probable, mieux vaut prendre un parapluie.') },
    ] },
  { titre: 'Fréquences, simulations et choix', duree: '40 min',
    attendus: ['Calculer la fréquence d\'un résultat dans une série d\'essais', 'Comparer fréquence observée et probabilité', 'Choisir le jeu le plus favorable en comparant des probabilités'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On a lancé un dé 300 fois ; le 6 est sorti 54 fois. Complète.',
        ...(() => { const l = [['Fréquence du 6 en % : @', 18], ['Probabilité du 6 (en % arrondi à l\'unité) : @', 17]]; return { eleve: plListe(l.map(([t]) => t.replace('@', B(1)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Dans quel jeu a-t-on le plus de chances de gagner ? Entoure.',
        ...chx([[`Sac A : 2 gagnants sur 8 ; sac B : 3 gagnants sur 10 →`, 'sac B', 'sac A · sac B'], [`Roue A : ${T(1, 3)} ; roue B : 30 % →`, 'roue A', 'roue A · roue B'], ['Dé : obtenir 6 ; pièce : obtenir pile →', 'pièce', 'dé · pièce']]) },
      { etoiles: 2, col: 1, consigne: 'Une classe a tiré 400 fois une boule dans une urne (boules rouges et bleues) : 300 rouges. Entoure la composition la plus vraisemblable.',
        ...chx([['L\'urne contient…', '3 rouges et 1 bleue', '1 rouge et 1 bleue · 3 rouges et 1 bleue · 1 rouge et 3 bleues']]) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['Avec 10 lancers, la fréquence est forcément égale à la probabilité :', 'faux'], ['Plus on fait d\'essais, plus la fréquence se rapproche de la probabilité :', 'vrai'], ['Une fréquence est un nombre entre 0 et 1 :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Résultats de 50 lancers d\'une pièce : 28 « pile ». Complète.',
        ...(() => { const l = [['Nombre de « face » : @', 22], ['Fréquence de « pile » : @ %', 56], ['Fréquence de « face » : @ %', 44]]; return { eleve: plListe(l.map(([t]) => t.replace('@', B(1)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Jeu A : on gagne si on obtient 5 ou 6 avec un dé. Jeu B : on gagne si on tire une boule rouge dans une urne de 4 rouges et 6 bleues. Quel jeu choisir ?',
        corr: cm1Redac('Probabilités', { suite: [`Jeu A : ${F(2, 6)} = ${F(1, 3)} ≈ 0,33`, `Jeu B : ${F(4, 10)} = 0,4`] }, 'Il vaut mieux choisir le jeu B.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Simule 20 lancers d\'une pièce (ou utilise une calculatrice). Calcule la fréquence de « face ». Compare avec la probabilité, puis avec les résultats de la classe.',
        corr: cm1Redac('Observation', 'Sur 20 lancers, la fréquence de « face » peut s\'éloigner de 0,5.', 'Avec tous les lancers de la classe, elle se rapproche de 0,5 : c\'est la probabilité.') },
    ] },
];
})();

/* ============================================================
   5e · Planches : Opérations sur les nombres décimaux (N1)
   Vocabulaire, priorités opératoires, division euclidienne, distributivité, calcul sur les décimaux.
   Relecture du 11/11/2026 (25 remarques) : calculs détaillés en colonne, une lettre par calcul (« A = … », une étape par
   ligne : « Calculer c'est pouvoir détailler les calculs ») ; cases à cliquer à l'écran (mots, signes, = ou ≠) ; relier une
   phrase à son expression et placer des parenthèses sans réécrire le calcul (outils « relier » et « parenth », planches-num.js) ;
   « avec r < b » dans la division euclidienne ; ordre de grandeur à écrire ; plus d'exemples.
   Relecture du 12/11/2026 : factoriser « 25 × (3 + 1) » ; places des parenthèses resserrées sur le papier.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v));
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
// Liste de calculs « expr = … » : [expr, résultat, étapes facultatives].
const calc = l => ({ eleve: plListe(l.map(([e]) => `${e} = ${B(3)}`)), corr: plListe(l.map(([e, r, et]) => `${e} = ${et ? et + ' = ' : ''}${R(r)}`)) });
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
// Calcul détaillé en colonne : [lettre, expression, étape…, résultat] ; l'élève écrit une étape par ligne, le corrigé les donne toutes.
const enHaut = h => h.replace('class="pl-grille" style="', 'class="pl-grille" style="align-items:start;');
const ET = (n, e, et, rep) => `<div style="line-height:2;white-space:nowrap;">${n} = ${e}${et.map(x => `<br>${n} = ${rep(x)}`).join('')}</div>`;
const etp = (l, cols) => ({ eleve: enHaut(plGrille(l.map(([n, e, ...et]) => ET(n, e, et, x => B(Math.max(5, Math.ceil(String(x).length * .85))))), cols || 2)),
  corr: enHaut(plGrille(l.map(([n, e, ...et]) => ET(n, e, et, R)), cols || 2)) });
// Case à cliquer (à l'écran, chaque clic passe au choix suivant) : [texte avec @, réponse].
const bsc = (l, choix, cols) => { const el = l.map(([t]) => t.replace('@', plCase(choix))), co = l.map(([t, r]) => t.replace('@', R(r)));
  return cols ? { eleve: plGrille(el, cols), corr: plGrille(co, cols) } : { eleve: plListe(el), corr: plListe(co) }; };
const VERT = '#1F7A4D';
// Relier une phrase à son expression : phrases à gauche, expressions à droite, un point au bout de chaque ligne.
const relier = (G, D, att) => {
  const W = 640, h = 30, H = Math.max(G.length, D.length) * h + 8, xg = 392, xd = 452, yy = i => 4 + h * i + h / 2;
  const coupe = (t, n) => { const m = []; let l = ''; t.split(' ').forEach(w => { if((l + ' ' + w).trim().length > n){ m.push(l); l = w; } else l = (l + ' ' + w).trim(); }); if(l) m.push(l); return m; };
  const tg = G.map((t, i) => { const ls = coupe(t, 46); return ls.map((l, k) => `<text x="6" y="${(yy(i) + 5 + (k - (ls.length - 1) / 2) * 15).toFixed(1)}" font-size="14" fill="#1C2B39">${l}</text>`).join(''); }).join('');
  const td = D.map((t, j) => `<text x="${xd + 16}" y="${yy(j) + 6}" font-size="16" fill="#1C2B39">${t}</text>`).join('');
  const pts = G.map((_, i) => `<circle cx="${xg}" cy="${yy(i)}" r="4.5" fill="#1F3A5C"/>`).join('') + D.map((_, j) => `<circle cx="${xd}" cy="${yy(j)}" r="4.5" fill="#1F3A5C"/>`).join('');
  const svg = sol => `<svg class="pl-libre" viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:block;" font-family="Inter, Arial, sans-serif">${tg}${td}${sol}${pts}</svg>`;
  return { eleve: plX(svg(''), { t: 'relier', g: G.map((_, i) => [xg, yy(i)]), d: D.map((_, j) => [xd, yy(j)]), xm: (xg + xd) / 2, h, att }),
    corr: svg(att.map((j, i) => `<line x1="${xg}" y1="${yy(i)}" x2="${xd}" y2="${yy(j)}" stroke="${VERT}" stroke-width="2.4"/>`).join('')) };
};
// Parenthèses à placer : [[jetons…], indice du nombre précédé de « ( », indice du nombre suivi de « ) »]. Une place avant
// et une après chaque nombre du membre de gauche ; on écrit sur la planche, sans recopier le calcul.
const parenth = lignes => {
  const fs = 17, h = 33, p = [], att = {}; let txt = '', W = 0;
  lignes.forEach(([jetons, ouv, ferm], r) => { let x = 8, eg = false; const y = 26 + r * h;
    jetons.forEach((t, k) => { if(t === '=') eg = true; const nb = /^\d/.test(t) && !eg;
      // Place d'une parenthèse : 4 unités de part et d'autre (relecture 5e-N1a-P2-E4 du 12/11/2026 : « L'espace sur le papier pour les
      // parenthèses est trop exagéré », 7 auparavant).
      if(nb){ x += 4; p.push([x, y, '(']); if(k === ouv) att[p.length - 1] = 1; x += 5; }
      const w = t.length * fs * .6 + (nb ? 0 : 8);
      txt += `<text x="${(x + w / 2).toFixed(1)}" y="${y}" text-anchor="middle" font-size="${fs}" fill="#1C2B39">${t}</text>`; x += w;
      if(nb){ x += 5; p.push([x, y, ')']); if(k === ferm) att[p.length - 1] = 1; x += 4; }
      x += 5; }); W = Math.max(W, x + 8); });
  const H = 8 + lignes.length * h, svg = sol => `<svg class="pl-libre" viewBox="0 0 ${Math.ceil(W)} ${H}" style="width:${Math.ceil(W)}px;max-width:100%;display:block;" font-family="Inter, Arial, sans-serif">${txt}${sol}</svg>`;
  return { eleve: plX(svg(''), { t: 'parenth', p, att, fs }),
    corr: svg(p.filter((_, i) => att[i]).map(([x, y, c]) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${VERT}">${c}</text>`).join('')) };
};
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(r)))) });
PLANCHES['5e|Opérations sur les nombres décimaux'] = [
  { titre: 'Vocabulaire et priorités sans parenthèses', duree: '35 min',
    attendus: ['Nommer une somme, une différence, un produit, un quotient et leurs termes', 'Effectuer les multiplications et les divisions avant les additions et les soustractions', 'Calculer de gauche à droite à priorité égale'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète par somme, différence, produit ou quotient (la dernière opération effectuée).',
        ...bsc([['7 + 3 × 5 : @', 'somme'], ['18 − 12 : 4 : @', 'différence'], ['(9 − 4) × 8 : @', 'produit'], ['6 × 7 − 2 × 3 : @', 'différence'], ['(12 + 6) : 3 : @', 'quotient']], 'somme|différence|produit|quotient') },
      { etoiles: 1, col: 1, consigne: 'Complète avec le bon mot.',
        ...rmp([['Dans 24 : 6 = 4, le nombre 6 est le @.', 'diviseur'], ['Dans 9 × 4 = 36, 9 et 4 sont les @ du produit.', 'facteurs'], ['Dans 15 − 8 = 7, le nombre 7 est la @.', 'différence'], ['Dans 3 + 5 = 8, 3 et 5 sont les @ de la somme.', 'termes']], 9) },
      { etoiles: 1, col: 1, consigne: 'Calcule en respectant les priorités. Écris une étape par ligne.',
        ...etp([['A', '5 + 4 × 3', '5 + 12', '17'], ['B', '20 − 6 × 2', '20 − 12', '8'], ['C', '3 × 7 + 2 × 5', '21 + 10', '31'], ['D', '40 − 24 : 4', '40 − 6', '34']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule (à priorité égale, de gauche à droite). Écris une étape par ligne.',
        ...etp([['A', '20 − 8 + 3', '12 + 3', '15'], ['B', '36 : 4 × 3', '9 × 3', '27'], ['C', '50 − 10 − 5', '40 − 5', '35'], ['D', '48 : 6 : 2', '8 : 2', '4']]) },
      { etoiles: 2, col: 1, consigne: 'Complète par = ou ≠.',
        ...bsc([['2 + 3 × 4 @ 20', '≠'], ['10 − 4 : 2 @ 8', '='], ['12 : 3 × 2 @ 2', '≠'], ['1,5 + 0,5 × 4 @ 3,5', '=']], '=|≠') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Au cinéma, Lina paie 3 places à 8,50 € et 2 menus à 6 €. Écris le calcul en une seule expression, puis calcule le prix total.',
        corr: cm1Redac('Prix total', { nom: 'P', lignes: ['3 × 8,50 + 2 × 6', '25,50 + 12', '37,50'] }, 'Lina paie 37,50 €.') },
      { etoiles: 2, col: 1, consigne: 'Complète par le signe opératoire manquant : +, −, × ou :.',
        ...bsc([['6 @ 4 + 2 = 26', '×'], ['15 @ 3 × 2 = 9', '−'], ['20 @ 5 − 1 = 3', ':'], ['7 @ 2 × 3 = 13', '+']], '+|−|×|:') },
      { etoiles: 2, col: 1, consigne: 'Calcule. Écris une étape par ligne.',
        ...etp([['A', '0,5 + 2 × 1,5', '0,5 + 3', '3,5'], ['B', '10 − 0,2 × 5', '10 − 1', '9'], ['C', '4 × 2,5 + 6 : 3', '10 + 2', '12'], ['D', '9 : 3 × 3 − 9', '3 × 3 − 9', '9 − 9', '0']]) },
    ] },
  { titre: 'Priorités avec des parenthèses', duree: '40 min',
    attendus: ['Effectuer d\'abord les calculs entre parenthèses', 'Enchaîner les étapes d\'un calcul en ligne', 'Traduire une phrase par une expression avec parenthèses'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule. Écris une étape par ligne.',
        ...etp([['A', '(5 + 4) × 3', '9 × 3', '27'], ['B', '(20 − 6) × 2', '14 × 2', '28'], ['C', '30 : (2 + 4)', '30 : 6', '5'], ['D', '(7 + 8) : (6 − 1)', '15 : 5', '3']]) },
      { etoiles: 2, col: 1, consigne: 'Calcule en écrivant une étape par ligne.',
        ...etp([['A', '3 × (12 − 4) + 1', '3 × 8 + 1', '24 + 1', '25'], ['B', '(18 − 3 × 4) × 5', '(18 − 12) × 5', '6 × 5', '30']]) },
      { etoiles: 2, col: 1, consigne: 'Entoure chaque calcul dont le résultat est 36.',
        ...(() => { const it = ['4 × 6 + 3', '4 × (6 + 3)', '2 + 10 × 3', '(2 + 10) × 3', '(9 − 3) × 6', '9 − 3 + 6', '72 : 2 × 1', '72 : (2 × 1)'], ok = [1, 3, 4, 6, 7];
          return { eleve: plGrille(it, 2), corr: plGrille(it.map((t, i) => ok.includes(i) ? plEntoure(t) : t), 2) }; })() },
      { etoiles: 2, col: 1, consigne: 'Place des parenthèses pour que chaque égalité soit vraie (sans recopier le calcul).',
        ...parenth([[['3', '+', '5', '×', '2', '=', '16'], 0, 2], [['20', '−', '8', '−', '2', '=', '14'], 2, 4], [['12', ':', '2', '+', '4', '=', '2'], 2, 4], [['2', '×', '3', '+', '4', '×', '5', '=', '70'], 2, 4]]) },
      { etoiles: 3, consigne: 'Traduis chaque phrase par une expression, puis calcule-la.',
        ...(() => { const it = [['Le triple de la somme de 7 et 5 :', 'A', '3 × (7 + 5)', '36'], ['La somme du triple de 7 et de 5 :', 'B', '3 × 7 + 5', '26'], ['Le quotient de 60 par la différence de 15 et 3 :', 'C', '60 : (15 − 3)', '5']];
          const bl = (t, n, et, rep) => `<div>${t}</div><div style="line-height:2;white-space:nowrap;padding-left:12px;">${et.map(x => `${n} = ${rep(x)}`).join('<br>')}</div>`;
          return { eleve: plGrille(it.map(([t, n, ...et]) => bl(t, n, et, x => B(Math.max(5, Math.ceil(x.length * .85))))), 3), corr: plGrille(it.map(([t, n, ...et]) => bl(t, n, et, R)), 3) }; })() },
      { etoiles: 2, consigne: 'Calcule (on commence par les parenthèses les plus intérieures). Écris une étape par ligne.',
        ...etp([['A', '3 × [2 + (5 − 1)]', '3 × [2 + 4]', '3 × 6', '18'], ['B', '[20 − (4 + 6)] : 2', '[20 − 10] : 2', '10 : 2', '5'], ['C', '100 − 4 × (7 + 3 × 2)', '100 − 4 × 13', '100 − 52', '48']], 3) },
      { etoiles: 2, consigne: 'Relie chaque phrase à l\'expression qui la traduit.',
        ...relier(['Le double de la somme de 4 et 9', 'La somme du double de 4 et de 9', 'La différence de 20 et du produit de 3 par 5', 'Le produit de la différence de 20 et 3 par 5'],
          ['20 − 3 × 5', '2 × (4 + 9)', '(20 − 3) × 5', '2 × 4 + 9'], [1, 3, 0, 2]) },
    ] },
  { titre: 'Division euclidienne', duree: '35 min',
    attendus: ['Écrire l\'égalité a = b × q + r avec r < b', 'Trouver le quotient et le reste', 'Résoudre un problème de partage ou de groupement'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Donne le quotient et le reste de la division euclidienne.',
        eleve: plListe(['47 par 5 : q = ' + B(2) + ' ; r = ' + B(2), '100 par 7 : q = ' + B(2) + ' ; r = ' + B(2), '365 par 12 : q = ' + B(2) + ' ; r = ' + B(2), '1 000 par 24 : q = ' + B(2) + ' ; r = ' + B(2)]),
        corr: plListe(['47 par 5 : q = ' + R(9) + ' ; r = ' + R(2), '100 par 7 : q = ' + R(14) + ' ; r = ' + R(2), '365 par 12 : q = ' + R(30) + ' ; r = ' + R(5), '1 000 par 24 : q = ' + R(41) + ' ; r = ' + R(16)]) },
      { etoiles: 1, col: 1, consigne: 'Complète l\'égalité de la division euclidienne (le reste est plus petit que le diviseur).',
        ...(() => { const it = [['58 = 7 × 8 + @1 avec @1 < 7', 2], ['91 = 6 × @1 + 1 avec 1 < 6', 15], ['250 = 9 × 27 + @1 avec @1 < 9', 7], ['@1 = 11 × 13 + 4 avec 4 < 11', 147]];
          const f = rep => it.map(([t, r]) => `<span style="white-space:nowrap;">${t.replace(/@1/g, () => rep(r))}</span>`);
          return { eleve: plListe(f(() => B(3))), corr: plListe(f(r => R(r))) }; })() },
      { etoiles: 2, col: 1, consigne: 'Ces égalités traduisent-elles la division euclidienne de 50 par 6 ? Entoure.',
        ...ch([['50 = 6 × 8 + 2 :', 'oui'], ['50 = 6 × 7 + 8 :', 'non'], ['50 = 6 × 8,33 :', 'non'], ['50 = 8 × 6 + 2 :', 'oui']], 'oui · non') },
      { etoiles: 2, col: 1, consigne: 'Problèmes.',
        ...rmp([['On range 230 œufs par boîtes de 12. Nombre de boîtes pleines : @', 19], ['Œufs qui restent : @', 2], ['Un car a 52 places. Cars nécessaires pour 315 élèves : @', 7], ['Nous sommes lundi. Jour de la semaine dans 100 jours : @', 'mercredi']], 4) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans une division euclidienne, le diviseur est 9, le quotient 14 et le reste 5. Quel est le dividende ? Le reste pourrait-il être 11 ? Explique.',
        corr: cm1Redac('Dividende', '9 × 14 + 5 = 126 + 5 = 131', 'Le dividende est 131. Le reste ne peut pas être 11, car il doit être plus petit que le diviseur 9.') },
      { etoiles: 2, col: 1, consigne: 'Complète (division euclidienne).',
        ...rmp([['Dividende 85, diviseur 4 : reste @', 1], ['Dividende 200, diviseur 15 : quotient @', 13], ['Diviseur 8, quotient 12, reste 3 : dividende @', 99], ['Dividende 72, diviseur 9 : reste @', 0]], 3) },
      { etoiles: 2, consigne: 'Problèmes.',
        ...rmp([['Un livre de 250 pages, 18 pages lues par jour. Jours pour le finir : @', 14], ['1 000 secondes = 16 min et @ s', 40], ['150 élèves en équipes de 11. Équipes complètes : @', 13], ['Élèves sans équipe complète : @', 7]], 3) },
    ] },
  { titre: 'La distributivité', duree: '40 min',
    attendus: ['Développer : k × (a + b) = k × a + k × b', 'Factoriser : k × a + k × b = k × (a + b)', 'Calculer astucieusement grâce à la distributivité'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète pour développer.',
        ...rmp([['7 × (10 + 3) = 7 × 10 + 7 × @', 3], ['5 × (20 − 1) = 5 × 20 − 5 × @', 1], ['(8 + 2) × 4 = 8 × 4 + @ × 4', 2], ['6 × (100 + 5) = @ + 30', 600]], 3) },
      { etoiles: 1, col: 1, consigne: 'Complète pour factoriser.',
        ...rmp([['9 × 4 + 9 × 6 = 9 × (4 + @)', 6], ['13 × 7 − 13 × 2 = @ × (7 − 2)', 13], ['4,5 × 8 + 5,5 × 8 = (4,5 + 5,5) × @', 8], ['25 × 3 + 25 × 1 = 25 × (@)', '3 + 1']], 4) }, // relecture 5e-N1a-P4-E2 du 12/11/2026 : factoriser, donc (3 + 1), pas 4
      { etoiles: 2, consigne: 'Calcule astucieusement, en détaillant toutes les étapes (une par ligne).',
        ...etp([['A', '12 × 101', '12 × (100 + 1)', '12 × 100 + 12 × 1', '1 200 + 12', '1 212'], ['B', '25 × 99', '25 × (100 − 1)', '25 × 100 − 25 × 1', '2 500 − 25', '2 475'],
          ['C', '3,7 × 8 + 6,3 × 8', '(3,7 + 6,3) × 8', '10 × 8', '80']], 3) },
      { etoiles: 2, consigne: 'Complète par = ou ≠.',
        ...bsc([['4 × (5 + 2) @ 4 × 5 + 2', '≠'], ['6 × 9 + 6 × 1 @ 60', '='], ['(10 − 1) × 7 @ 70 − 7', '='], ['2 × (3 × 5) @ 2 × 3 × 2 × 5', '≠']], '=|≠', 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Un cinéma vend 47 places à 9 € le samedi et 53 places à 9 € le dimanche. Calcule la recette du week-end de deux façons différentes. Laquelle est la plus rapide ?',
        corr: cm1Redac('Recette du week-end', [{ nom: 'R', lignes: ['47 × 9 + 53 × 9', '423 + 477', '900'] }, { nom: 'R', lignes: ['9 × (47 + 53)', '9 × 100', '900'] }], 'La recette est de 900 € ; la factorisation donne le calcul le plus rapide.') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sans calculatrice, calcule 38 × 102 et 15 × 98 en expliquant ta méthode.',
        corr: cm1Redac('Calculs astucieux', [{ nom: 'A', lignes: ['38 × 102', '38 × (100 + 2)', '38 × 100 + 38 × 2', '3 800 + 76', '3 876'] }, { nom: 'B', lignes: ['15 × 98', '15 × (100 − 2)', '15 × 100 − 15 × 2', '1 500 − 30', '1 470'] }], 'On décompose 102 en 100 + 2 et 98 en 100 − 2.') },
      { etoiles: 2, consigne: 'Développe, puis calcule. Écris une étape par ligne.',
        ...etp([['A', '8 × (5 + 0,5)', '8 × 5 + 8 × 0,5', '40 + 4', '44'], ['B', '(30 − 2) × 6', '30 × 6 − 2 × 6', '180 − 12', '168'], ['C', '0,5 × (20 + 4)', '0,5 × 20 + 0,5 × 4', '10 + 2', '12']], 3) },
      { etoiles: 2, consigne: 'Factorise, puis calcule. Écris une étape par ligne.',
        ...etp([['A', '14 × 3 + 14 × 7', '14 × (3 + 7)', '14 × 10', '140'], ['B', '5,8 × 2 + 4,2 × 2', '(5,8 + 4,2) × 2', '10 × 2', '20'], ['C', '36 × 11 − 36 × 1', '36 × (11 − 1)', '36 × 10', '360']], 3) },
    ] },
  { titre: 'Calculer avec des nombres décimaux', duree: '35 min',
    attendus: ['Multiplier par 10, 100, 0,1 ou 0,01', 'Estimer un résultat par un ordre de grandeur', 'Résoudre un problème à plusieurs étapes'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.', ...calc([['3,7 × 10', 37], ['0,45 × 100', 45], ['52 × 0,1', '5,2'], ['806 × 0,01', '8,06'], ['7,2 : 10', '0,72']]) },
      { etoiles: 1, col: 1, consigne: 'Donne un ordre de grandeur du résultat (arrondis d\'abord chaque nombre).',
        ...rmp([['49,8 × 3,1 ≈ @', '150'], ['198,5 + 401,2 ≈ @', '600'], ['8,9 × 21 ≈ @', '180'], ['999 : 9,9 ≈ @', '100']], 4) },
      { etoiles: 2, col: 1, consigne: 'Calcule (pose l\'opération dans ton cahier si besoin).', ...calc([['12,5 × 0,8', 10], ['4,05 + 17,9', '21,95'], ['30 − 7,46', '22,54'], ['6,4 × 2,5', 16], ['1,2 × 3 + 0,4', 4]]) },
      { etoiles: 2, consigne: 'Complète.',
        ...(() => { const it = [['2,5 × @ = 25', 10], ['@ × 100 = 3,8', '0,038'], ['0,6 × @ = 6', 10], ['4 × @ = 1', '0,25'], ['0,3 × @ = 3', 10], ['@ × 10 = 0,7', '0,07'], ['1,25 × @ = 125', 100], ['8 × @ = 4', '0,5']];
          return { eleve: plGrille(it.map(([t]) => t.replace('@', B(4))), 2), corr: plGrille(it.map(([t, r]) => t.replace('@', R(r))), 2) }; })() },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Tom achète 2,5 kg de pommes à 2,40 € le kg et 3 baguettes à 1,10 €. Il paie avec un billet de 20 €. Combien lui rend-on ? Écris un seul calcul.',
        corr: cm1Redac('Monnaie rendue', { nom: 'R', lignes: ['20 − (2,5 × 2,40 + 3 × 1,10)', '20 − (6 + 3,30)', '20 − 9,30', '10,70'] }, 'On lui rend 10,70 €.') },
      { etoiles: 2, consigne: 'Calcule (division décimale).',
        ...(() => { const it = [['7,5 : 3', '2,5'], ['9 : 4', '2,25'], ['4,8 : 6', '0,8'], ['10 : 8', '1,25'], ['6,3 : 7', '0,9'], ['15 : 4', '3,75'], ['2,4 : 8', '0,3'], ['13 : 5', '2,6']];
          return { eleve: plGrille(it.map(([e]) => `${e} = ${B(3)}`), 2), corr: plGrille(it.map(([e, r]) => `${e} = ${R(r)}`), 2) }; })() },
      { etoiles: 2, consigne: 'Vrai ou faux ? Entoure.',
        ...P3.chx2([['Multiplier par 0,1, c\'est diviser par 10 :', 'vrai', 'vrai · faux'], ['3,5 × 0,1 = 35 :', 'faux', 'vrai · faux'], ['Multiplier par 0,5, c\'est prendre la moitié :', 'vrai', 'vrai · faux'], ['Un produit est toujours plus grand que ses facteurs :', 'faux', 'vrai · faux']]) },
    ] },
  { titre: 'Automatismes', duree: '20 min',
    attendus: ['Calculer mentalement avec des décimaux', 'Appliquer les priorités', 'Estimer un ordre de grandeur'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.', ...P3.rmp([['3,7 + 2,5 = @', '6,2'], ['10 − 4,3 = @', '5,7'], ['0,8 + 0,25 = @', '1,05'], ['7,5 − 2,75 = @', '4,75']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule mentalement.', ...P3.rmp([['3,45 × 10 = @', '34,5'], ['0,07 × 100 = @', 7], ['52 × 0,1 = @', '5,2'], ['4,6 × 0,01 = @', '0,046']]) },
      { etoiles: 1, col: 1, consigne: 'Calcule en respectant les priorités.', ...P3.rmp([['2 + 3 × 4 = @', 14], ['20 − 6 : 2 = @', 17], ['(5 + 3) × 2 = @', 16], ['18 : 3 × 2 = @', 12]]) },
      { etoiles: 2, col: 1, consigne: 'Calcule astucieusement.', ...P3.rmp([['7 × 99 = @', 693], ['12 × 101 = @', '1 212'], ['25 × 13 × 4 = @', '1 300'], ['8 × 1,25 = @', 10]]) },
      { etoiles: 2, col: 1, consigne: 'Entoure l\'ordre de grandeur.', ...P3.chx([['19,8 × 5,1 ≈', '100', '10 · 100 · 1 000'], ['49,7 + 20,4 ≈', '70', '7 · 70 · 700'], ['301 × 9,9 ≈', '3 000', '300 · 3 000 · 30 000']]) },
      { etoiles: 2, col: 1, consigne: 'Complète la division euclidienne.', ...P3.rmp([['47 = 6 × @ + @', 7, 5], ['100 = 7 × @ + @', 14, 2], ['85 = 9 × @ + @', 9, 4]]) },
    ] },
];
})();

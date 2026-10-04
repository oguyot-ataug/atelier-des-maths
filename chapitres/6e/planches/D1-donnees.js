/* ============================================================
   6e · Planches : Gestion de données (D1)
   Tableaux, diagrammes en barres (à compléter à l'écran), diagrammes circulaires, graphiques, enquête.
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac, Fr = plFrac();
const K = '#1F3A5C', Ro = '#E35D3A', Bl = '#2EA8C9', Ve = '#2E9C6A', Vi = '#7A4FC0', Or = '#F2A93B';
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w, d) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 1.5}"${d ? ' stroke-dasharray="4 3"' : ''}/>`;
const T = (x, y, t, o) => cmT(x, y, t, Object.assign({ fs: 11 }, o || {}));
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const ligne = (...h) => `<span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">${h.join(' ')}</span>`;
const ctr = h => `<div style="text-align:center;">${h}</div>`;
// Diagramme en barres : data [[nom, valeur]], axe de 0 à max, graduation pas ; vides : indices des barres à tracer (null = toutes tracées).
function barres(data, max, pas, o){ o = o || {}; const n = data.length, W = 60 + n * 70, y0 = 170, u = 140 / max; let s = '';
  for(let v = 0; v <= max; v += pas){ const y = y0 - v * u; s += L([40, y], [W - 10, y], '#D5E2EE', 1) + T(34, y + 4, v, { a: 'end', fs: 10 }); }
  s += L([40, 20], [40, y0], K, 1.6) + L([40, y0], [W - 10, y0], K, 1.6) + (o.axe ? T(44, 14, o.axe, { a: 'start', fs: 10 }) : '');
  data.forEach(([nom, v], i) => { const x = 60 + i * 70; if(!(o.vides || []).includes(i) || o.sol) s += `<rect x="${x}" y="${y0 - v * u}" width="40" height="${v * u}" fill="${(o.vides || []).includes(i) ? Ro : o.coul || Bl}" fill-opacity=".8" stroke="${K}"/>`; s += T(x + 20, y0 + 15, nom, { fs: 10 }); });
  return S(W, 190, s, Math.min(W, o.px || 420)); }
const barresX = (data, max, pas, vides, o) => plX(barres(data, max, pas, Object.assign({ vides }, o)), { t: 'barres', xs: data.map((_, i) => 60 + i * 70), larg: 40, y0: 170, u: 140 / max * pas, max: max / pas, coul: Ro, att: data.map(([, v], i) => vides.includes(i) ? v / pas : null) });
// Diagramme circulaire : parts [[nom, fraction, couleur]].
function camembert(parts, r){ r = r || 60; const O = [r + 10, r + 10]; let a = -Math.PI / 2, s = '';
  parts.forEach(([nom, f, c]) => { const b = a + f * 2 * Math.PI, p = [O[0] + r * Math.cos(a), O[1] + r * Math.sin(a)], q = [O[0] + r * Math.cos(b), O[1] + r * Math.sin(b)], m = (a + b) / 2;
    s += `<path d="M${O[0]},${O[1]} L${p[0].toFixed(1)},${p[1].toFixed(1)} A${r},${r} 0 ${f > .5 ? 1 : 0} 1 ${q[0].toFixed(1)},${q[1].toFixed(1)} Z" fill="${c}" fill-opacity=".85" stroke="#fff" stroke-width="2"/>` + T(O[0] + r * .6 * Math.cos(m), O[1] + r * .6 * Math.sin(m) + 4, nom, { c: '#fff', fs: 11 }); a = b; });
  return S(2 * r + 20, 2 * r + 20, s, 2 * r + 20); }
// Graphique cartésien : points [[x, y]], axes gradués.
function courbe(pts, xs, ys, o){ const X = x => 50 + (x - xs[0]) / (xs[1] - xs[0]) * 380, Y = y => 170 - (y - ys[0]) / (ys[1] - ys[0]) * 150; let s = '';
  for(let x = xs[0]; x <= xs[1]; x += xs[2]){ s += L([X(x), 20], [X(x), 170], '#E1EAF2', 1) + T(X(x), 184, x, { fs: 10 }); }
  for(let y = ys[0]; y <= ys[1]; y += ys[2]){ s += L([50, Y(y)], [430, Y(y)], '#E1EAF2', 1) + T(44, Y(y) + 4, y, { a: 'end', fs: 10 }); }
  s += L([50, 170], [436, 170], K, 1.6) + L([50, 170], [50, 14], K, 1.6) + T(436, 160, o.ax, { a: 'end', fs: 10 }) + T(56, 14, o.ay, { a: 'start', fs: 10 });
  s += `<polyline points="${pts.map(([x, y]) => X(x) + ',' + Y(y)).join(' ')}" fill="none" stroke="${Ro}" stroke-width="2.4"/>` + pts.map(([x, y]) => `<circle cx="${X(x)}" cy="${Y(y)}" r="3.2" fill="${Ro}"/>`).join('');
  return S(450, 192, s, 440); }
const SPORTS = [['Foot', 9], ['Danse', 6], ['Judo', 4], ['Basket', 5], ['Natation', 3]];
const TEMP = [[0, 4], [2, 3], [4, 2], [6, 3], [8, 7], [10, 11], [12, 14], [14, 16], [16, 15], [18, 12], [20, 9], [22, 6], [24, 5]];
PLANCHES['6e|Gestion de données'] = [
  { titre: 'Lire et compléter des tableaux', duree: '35 min',
    attendus: ['Lire une donnée dans un tableau simple ou à double entrée', 'Compléter un tableau par des calculs (totaux)', 'Organiser des données dans un tableau'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Voici les ventes de glaces d'un marchand pendant une semaine.${ctr(tab(['Jour', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.'], [['Glaces', '34', '28', '52', '19', '47']]))}`,
        eleve: plListe(['Glaces vendues mercredi : ' + B(), 'Jour où il a vendu le moins : ' + B(5), 'Total de la semaine : ' + B(), 'Écart entre mercredi et jeudi : ' + B()]),
        corr: plListe(['Glaces vendues mercredi : ' + R(52), 'Jour où il a vendu le moins : ' + R('jeudi'), 'Total de la semaine : ' + R(180), 'Écart entre mercredi et jeudi : ' + R(33)]) },
      { etoiles: 2, consigne: 'Complète ce tableau à double entrée (élèves de 6e et moyen de transport).',
        eleve: tab(['', 'À pied', 'Bus', 'Vélo', 'Total'], [['6e A', '8', '12', '5', B()], ['6e B', '11', B(), '4', '27'], ['Total', B(), '24', B(), B()]]),
        corr: tab(['', 'À pied', 'Bus', 'Vélo', 'Total'], [['6e A', '8', '12', '5', R(25)], ['6e B', '11', R(12), '4', '27'], ['Total', R(19), '24', R(9), R(52)]]) },
      { etoiles: 2, col: 1, consigne: 'Dans le tableau précédent, complète.',
        eleve: plListe(['Nombre d\'élèves de 6e B qui viennent en bus : ' + B(), 'Moyen de transport le plus utilisé : ' + B(4), 'Nombre total d\'élèves interrogés : ' + B()]),
        corr: plListe(['Nombre d\'élèves de 6e B qui viennent en bus : ' + R(12), 'Moyen de transport le plus utilisé : ' + R('bus'), 'Nombre total d\'élèves interrogés : ' + R(52)]) },
      { etoiles: 2, col: 1, consigne: 'Voici les notes d\'un contrôle : 12 ; 15 ; 9 ; 12 ; 18 ; 15 ; 12 ; 9 ; 15 ; 12. Complète le tableau des effectifs.',
        eleve: tab(['Note', '9', '12', '15', '18'], [['Effectif', B(1), B(1), B(1), B(1)]]), corr: tab(['Note', '9', '12', '15', '18'], [['Effectif', R(2), R(4), R(3), R(1)]]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Le tableau des ventes de glaces (exercice 1) : le marchand gagne 1,50 € par glace. Combien a-t-il gagné dans la semaine ? Ajoute une ligne « Gain (€) » au tableau.',
        corr: cm1Redac('Gain de la semaine', '180 × 1,50 = 270', 'Il a gagné 270 €. Ligne des gains : 51 ; 42 ; 78 ; 28,50 ; 70,50.') },
    ] },
  { titre: 'Diagrammes en barres', duree: '35 min',
    attendus: ['Lire un diagramme en barres', 'Compléter un diagramme en barres à partir d\'un tableau', 'Comparer des données'],
    exos: [
      { etoiles: 1, consigne: 'Ce diagramme donne le sport préféré des élèves d\'une classe. Complète.',
        eleve: ctr(barres(SPORTS, 10, 1, { axe: 'élèves', px: 350 })) + plListe(['Nombre d\'élèves qui préfèrent le judo : ' + B(1), 'Sport le plus choisi : ' + B(4), 'Nombre d\'élèves de la classe : ' + B(2), 'Différence entre foot et natation : ' + B(1)]),
        corr: ctr(barres(SPORTS, 10, 1, { axe: 'élèves', px: 350 })) + plListe(['Nombre d\'élèves qui préfèrent le judo : ' + R(4), 'Sport le plus choisi : ' + R('foot'), 'Nombre d\'élèves de la classe : ' + R(27), 'Différence entre foot et natation : ' + R(6)]) },
      { etoiles: 2, consigne: `Le tableau donne le nombre de livres empruntés au CDI. Complète le diagramme (trace les barres manquantes).${ctr(tab(['Mois', 'Sept.', 'Oct.', 'Nov.', 'Déc.', 'Janv.'], [['Livres', '25', '40', '35', '15', '30']]))}`,
        ...(() => { const D = [['Sept.', 25], ['Oct.', 40], ['Nov.', 35], ['Déc.', 15], ['Janv.', 30]];
          return { eleve: ctr(barresX(D, 40, 5, [1, 3, 4], { axe: 'livres' })), corr: ctr(barres(D, 40, 5, { axe: 'livres', vides: [1, 3, 4], sol: true })) }; })() },
      { etoiles: 2, col: 1, consigne: 'D\'après le diagramme des livres, vrai ou faux ?',
        ...ch([['En octobre, on a emprunté plus de livres qu\'en novembre.', 'vrai'], ['Décembre est le mois où l\'on a le moins emprunté.', 'vrai'], ['En janvier, on a emprunté deux fois plus qu\'en décembre.', 'vrai'], ['Au total, on a emprunté plus de 150 livres.', 'faux']], 'vrai · faux') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans le diagramme des sports, combien faudrait-il d\'élèves en plus au basket pour qu\'il soit le sport le plus choisi ? Explique.',
        corr: cm1Redac('Comparaison', 'Foot : 9 élèves ; basket : 5 élèves. Il faut dépasser 9 : 10 − 5 = 5.', 'Il faudrait 5 élèves de plus au basket.') },
    ] },
  { titre: 'Diagrammes circulaires', duree: '35 min',
    attendus: ['Lire un diagramme circulaire : la part de chaque catégorie', 'Associer un secteur à une fraction ou un pourcentage', 'Calculer un effectif à partir d\'une proportion'],
    exos: [
      { etoiles: 1, col: 1, consigne: `Ce diagramme montre comment 40 élèves viennent au collège.${ctr(camembert([['Bus', 1 / 2, Bl], ['Pied', 1 / 4, Ve], ['Vélo', 1 / 8, Or], ['Auto', 1 / 8, Vi]]))}`,
        eleve: plListe([ligne('Proportion d\'élèves en bus :', Fr), ligne('Proportion d\'élèves à pied :', Fr), 'Nombre d\'élèves en bus : ' + B(2), 'Nombre d\'élèves à vélo : ' + B(2)]),
        corr: plListe([ligne('Proportion d\'élèves en bus :', R(F(1, 2))), ligne('Proportion d\'élèves à pied :', R(F(1, 4))), 'Nombre d\'élèves en bus : ' + R(20), 'Nombre d\'élèves à vélo : 40 ÷ 8 = ' + R(5)]) },
      { etoiles: 2, col: 1, consigne: `Ce diagramme montre la composition d'un repas (en %).${ctr(camembert([['50 %', .5, Or], ['25 %', .25, Ve], ['15 %', .15, Bl], ['10 %', .1, Ro]]))}<div class="pl-petit" style="text-align:center;">orange : féculents ; vert : légumes ; bleu : laitages ; rouge : viande</div>`,
        eleve: plListe(['Part des légumes : ' + B(2) + ' %', 'Part de la viande : ' + B(2) + ' %', 'Pour un repas de 600 g, masse de féculents : ' + B() + ' g']),
        corr: plListe(['Part des légumes : ' + R(25) + ' %', 'Part de la viande : ' + R(10) + ' %', 'Pour un repas de 600 g, masse de féculents : ' + R(300) + ' g']) },
      { etoiles: 2, col: 1, consigne: 'Un secteur représente un quart du disque. Complète.',
        eleve: plListe(['Son angle mesure ' + B() + ' °', 'Il représente ' + B() + ' %', 'Un secteur d\'angle 180° représente ' + B() + ' %']),
        corr: plListe(['Son angle mesure ' + R(90) + ' °', 'Il représente ' + R(25) + ' %', 'Un secteur d\'angle 180° représente ' + R(50) + ' %']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur 24 élèves, 12 ont un chat, 6 un chien et 6 aucun animal. Construis un diagramme circulaire. Quel angle donnes-tu à chaque secteur ?',
        corr: cm1Redac('Angles', { suite: ['Chat : la moitié, 180°.', 'Chien : un quart, 90°.', 'Aucun animal : un quart, 90°.'] }, 'On trace les secteurs au rapporteur (180° + 90° + 90° = 360°).') },
    ] },
  { titre: 'Graphiques et courbes', duree: '35 min',
    attendus: ['Lire un graphique : abscisse, ordonnée', 'Repérer un maximum, un minimum, une évolution', 'Interpréter un graphique en phrases'],
    exos: [
      { etoiles: 1, consigne: 'Ce graphique montre la température relevée dans une ville au cours d\'une journée. Complète.',
        eleve: ctr(courbe(TEMP, [0, 24, 2], [0, 18, 2], { ax: 'heure (h)', ay: 'température (°C)' })) + plListe(['Température à 10 h : ' + B(2) + ' °C', 'Température la plus haute : ' + B(2) + ' °C, à ' + B(2) + ' h', 'Température la plus basse : ' + B(1) + ' °C, à ' + B(1) + ' h', 'Heure où il fait 12 °C l\'après-midi : ' + B(2) + ' h']),
        corr: ctr(courbe(TEMP, [0, 24, 2], [0, 18, 2], { ax: 'heure (h)', ay: 'température (°C)' })) + plListe(['Température à 10 h : ' + R(11) + ' °C', 'Température la plus haute : ' + R(16) + ' °C, à ' + R(14) + ' h', 'Température la plus basse : ' + R(2) + ' °C, à ' + R(4) + ' h', 'Heure où il fait 12 °C l\'après-midi : ' + R(18) + ' h']) },
      { etoiles: 2, col: 1, consigne: 'D\'après le graphique des températures, vrai ou faux ?',
        ...ch([['La température augmente de 4 h à 14 h.', 'vrai'], ['Entre 14 h et 24 h, il a fait plus chaud qu\'à minuit.', 'vrai'], ['L\'écart entre le maximum et le minimum est de 16 °C.', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Complète.',
        eleve: plListe(['Augmentation de température entre 8 h et 12 h : ' + B(1) + ' °C', 'Baisse entre 16 h et 22 h : ' + B(1) + ' °C']),
        corr: plListe(['Augmentation de température entre 8 h et 12 h : 14 − 7 = ' + R(7) + ' °C', 'Baisse entre 16 h et 22 h : 15 − 6 = ' + R(9) + ' °C']) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Raconte en trois phrases l\'évolution de la température au cours de cette journée.',
        corr: cm1Redac('Évolution', { suite: ['La nuit, la température baisse jusqu\'à 2 °C à 4 h.', 'Elle monte ensuite jusqu\'à 16 °C à 14 h.', 'Puis elle redescend jusqu\'à 5 °C à minuit.'] }, 'La journée est plus chaude l\'après-midi, comme souvent.') },
    ] },
  { titre: 'Mener une enquête', duree: '40 min',
    attendus: ['Recueillir et organiser des données (tableau d\'effectifs)', 'Calculer l\'effectif total et une proportion', 'Choisir une représentation adaptée'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'On a demandé à 20 élèves leur couleur préférée : bleu, rouge, vert, bleu, bleu, jaune, rouge, vert, bleu, rouge, bleu, vert, jaune, bleu, rouge, bleu, vert, bleu, rouge, bleu. Complète.',
        eleve: tab(['Couleur', 'bleu', 'rouge', 'vert', 'jaune', 'Total'], [['Effectif', B(1), B(1), B(1), B(1), B(1)]]), corr: tab(['Couleur', 'bleu', 'rouge', 'vert', 'jaune', 'Total'], [['Effectif', R(9), R(5), R(4), R(2), R(20)]]) },
      { etoiles: 2, col: 1, consigne: 'D\'après l\'enquête sur les couleurs, complète.',
        eleve: plListe([ligne('Proportion d\'élèves qui préfèrent le rouge :', Fr), 'en pourcentage : ' + B(2) + ' %', 'Pourcentage d\'élèves qui préfèrent le jaune : ' + B(2) + ' %']),
        corr: plListe([ligne('Proportion d\'élèves qui préfèrent le rouge :', R(F(5, 20))), 'en pourcentage : ' + R(25) + ' %', 'Pourcentage d\'élèves qui préfèrent le jaune : ' + R(10) + ' %']) },
      { etoiles: 2, col: 1, consigne: 'Quelle représentation choisir ? Entoure.',
        ...ch([['Pour montrer l\'évolution du poids d\'un bébé mois par mois :', 'une courbe'], ['Pour comparer le nombre d\'élèves de chaque club :', 'des barres'], ['Pour montrer la part de chaque dépense dans un budget :', 'un disque']], 'une courbe · des barres · un disque') },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Prépare une petite enquête dans ta classe : choisis une question, recueille les réponses, puis présente-les dans un tableau et un diagramme en barres.',
        corr: cm1Redac('Étapes', { suite: ['Choisir une question à réponses courtes (sport, animal, fruit préféré…).', 'Compter les réponses (effectifs) et vérifier le total.', 'Tracer le diagramme : un axe gradué régulièrement, une barre par réponse.'] }, 'On termine par une ou deux phrases qui interprètent les résultats.') },
    ] },
];
})();

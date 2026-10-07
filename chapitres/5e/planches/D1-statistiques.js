/* ============================================================
   5e · Planches : Statistiques (D1)
   Effectifs et fréquences, diagrammes (barres à compléter à l'écran, circulaires), moyenne, problèmes.
   Mêmes diagrammes que les outils du tableau interactif (GRAPH_COLORS, pieChartSvg).
   ============================================================ */
(() => {
const B = n => plPointilles(n || 3), R = v => plRep(String(v)), F = cm1Frac;
const K = '#1F3A5C';
const GC = typeof GRAPH_COLORS !== 'undefined' ? GRAPH_COLORS : ['#0D5BA3', '#D93025', '#1F7A4D', '#B26A00', '#7B3FA0', '#1C8C9C'];
const S = (w, h, inner, px) => `<svg class="pl-libre" viewBox="0 0 ${w} ${h}" style="width:${px || w}px;max-width:100%;display:inline-block;vertical-align:middle;">${inner}</svg>`;
const L = (a, b, c, w) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c || K}" stroke-width="${w || 1.5}"/>`;
const T = (x, y, t, o) => cmT(x, y, t, Object.assign({ fs: 11 }, o || {}));
const d = v => String(+(+v).toFixed(3)).replace('.', ',');
const tab = (ent, lignes) => `<table class="pl-tab"><tr>${ent.map(e => `<th>${e}</th>`).join('')}</tr>${lignes.map(l => `<tr>${l.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const ch = (it, m) => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const chx = it => ({ eleve: '<div class="pl-col1">' + plListe(it.map(([t, , m]) => `${t} <b>${m}</b>`)) + '</div>', corr: '<div class="pl-col1">' + plListe(it.map(([t, r]) => `${t} ${plEntoure(r)}`)) + '</div>' });
const rmp = (l, n) => ({ eleve: plListe(l.map(([t]) => t.replace('@', B(n || 3)))), corr: plListe(l.map(([t, r]) => t.replace('@', R(typeof r === 'number' ? d(r) : r)))) });
function barres(data, max, pas, o){ o = o || {}; const n = data.length, W = 60 + n * 64, y0 = 170, u = 140 / max; let s = '';
  for(let v = 0; v <= max; v += pas){ const y = y0 - v * u; s += L([40, y], [W - 10, y], 'rgba(28,43,57,.1)', 1) + `<text x="34" y="${y + 4}" font-size="10" text-anchor="end" font-family="JetBrains Mono, monospace" fill="#1C1B2E">${v}</text>`; }
  s += L([40, 20], [40, y0], '#1C1B2E', 1.6) + L([40, y0], [W - 10, y0], '#1C1B2E', 1.6) + (o.axe ? T(44, 14, o.axe, { a: 'start', fs: 10 }) : '');
  data.forEach(([nom, v], i) => { const x = 58 + i * 64; if(!(o.vides || []).includes(i) || o.sol) s += `<rect x="${x}" y="${y0 - v * u}" width="38" height="${v * u}" fill="${GC[i % GC.length]}"/>`; s += `<text x="${x + 19}" y="${y0 + 15}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace" fill="#1C1B2E">${nom}</text>`; });
  return S(W, 190, s, Math.min(W, o.px || 400)); }
const barresX = (data, max, pas, vides, o) => plX(barres(data, max, pas, Object.assign({ vides }, o)), { t: 'barres', xs: data.map((_, i) => 58 + i * 64), larg: 38, y0: 170, u: 140 / max * pas, max: max / pas, coul: GC[0], att: data.map(([, v], i) => vides.includes(i) ? v / pas : null) });
function camembert(parts, sansPct){ let h = pieChartSvg(parts.map(([label, f, color]) => ({ label, value: f, color }))).split('<div style="display:flex;flex-wrap:wrap')[0].replace(/ width="300" height="300"/, '');
  if(sansPct) h = h.replace(/<text[^>]*>\d+%<\/text>/g, '');
  const leg = parts.map(([label, , color]) => `<span style="display:inline-flex;align-items:center;gap:5px;margin:1px 8px;"><span style="width:11px;height:11px;border-radius:3px;background:${color};display:inline-block;"></span>${label}</span>`).join('');
  return `<div style="max-width:160px;margin:0 auto;">${h}</div><div style="display:flex;flex-wrap:wrap;justify-content:center;font-size:.9em;">${leg}</div>`; }
PLANCHES['5e|Statistiques'] = [
  { titre: 'Effectifs et fréquences', duree: '35 min',
    attendus: ['Lire et compléter un tableau d\'effectifs', 'Calculer une fréquence (fraction, nombre décimal, pourcentage)', 'Savoir que la somme des fréquences vaut 1 (100 %)'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Moyens de transport des 25 élèves d\'une classe. Complète.',
        ...(() => { const D = [['À pied', 6], ['Vélo', 4], ['Bus', 10], ['Voiture', 5]];
          return { eleve: tab(['Transport', 'Effectif', 'Fréquence (%)'], D.map(([n, e]) => [n, e, B(1)]).concat([['Total', B(1), '100']])), corr: tab(['Transport', 'Effectif', 'Fréquence (%)'], D.map(([n, e]) => [n, e, R(e * 4)]).concat([['Total', R(25), '100']])) }; })() },
      { etoiles: 1, col: 1, consigne: 'Écris chaque fréquence sous trois formes.',
        ...(() => { const l = [[3, 10, '0,3', 30], [1, 4, '0,25', 25], [7, 20, '0,35', 35]];
          return { eleve: plListe(l.map(([a, b]) => `${a} sur ${b} = ${F(a, b)} = ${B(2)} = ${B(1)} %`)), corr: plListe(l.map(([a, b, dd, p]) => `${a} sur ${b} = ${F(a, b)} = ${R(dd)} = ${R(p)} %`)) }; })() },
      { etoiles: 2, col: 1, consigne: 'Sur 200 personnes interrogées, voici les effectifs. Calcule les fréquences en %.',
        ...rmp([['Thé : 50 personnes → @ %', 25], ['Café : 90 personnes → @ %', 45], ['Chocolat : 40 personnes → @ %', 20], ['Rien : 20 personnes → @ %', 10]], 2) },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La somme des effectifs est l\'effectif total :', 'vrai'], ['Une fréquence peut valoir 1,5 :', 'faux'], ['La somme des fréquences en % vaut 100 :', 'vrai'], ['Fréquence = effectif total : effectif :', 'faux']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Notes d\'un contrôle : 12 ; 15 ; 9 ; 12 ; 18 ; 15 ; 12 ; 7 ; 15 ; 12. Complète.',
        ...rmp([['Effectif total : @', 10], ['Effectif de la note 12 : @', 4], ['Fréquence de la note 15 : @ %', 30], ['Fréquence des notes inférieures à 10 : @ %', 20]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Dans un collège de 480 élèves, 30 % sont en 6e et 25 % en 5e. Combien d\'élèves sont en 6e ? en 5e ? Quelle fréquence représentent les élèves de 4e et de 3e réunis ?',
        corr: cm1Redac('Effectifs', { suite: ['6e : 480 × 30 : 100 = 144 élèves', '5e : 480 × 25 : 100 = 120 élèves'] }, '') + cm1Redac('4e et 3e', '100 % − 30 % − 25 % = 45 %', 'Les élèves de 4e et de 3e représentent 45 % des élèves.') },
    ] },
  { titre: 'Diagrammes en barres et circulaires', duree: '40 min',
    attendus: ['Lire un diagramme en barres ou circulaire', 'Compléter un diagramme en barres', 'Choisir le diagramme adapté'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Livres empruntés au CDI. Trace les barres manquantes (mardi : 25 ; jeudi : 35 ; vendredi : 15).',
        ...(() => { const D = [['lun', 20], ['mar', 25], ['mer', 10], ['jeu', 35], ['ven', 15]];
          return { eleve: `<div style="text-align:center;">${barresX(D, 40, 5, [1, 3, 4], { axe: 'livres', px: 320 })}</div>`, corr: `<div style="text-align:center;">${barres(D, 40, 5, { axe: 'livres', px: 320 })}</div>` }; })() },
      { etoiles: 1, col: 1, consigne: 'Lis le diagramme (livres empruntés).',
        ...rmp([['Lundi : @ livres', 20], ['Mercredi : @ livres', 10], ['Total de la semaine : @ livres', 105]], 3) },
      { etoiles: 2, col: 1, consigne: 'Sport préféré des élèves d\'une classe (diagramme circulaire). Entoure.',
        ...(() => { const P = [['Foot', .5, GC[0]], ['Danse', .25, GC[1]], ['Judo', .125, GC[2]], ['Tennis', .125, GC[3]]], c = camembert(P, true);
          const q = chx([['Le sport le plus choisi :', 'Foot', 'Foot · Danse · Judo'], ['Proportion de la danse :', '25 %', '20 % · 25 % · 50 %'], ['Judo et tennis ensemble :', '25 %', '12,5 % · 25 % · 30 %']]);
          return { eleve: c + q.eleve, corr: c + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Quel diagramme est le mieux adapté ? Entoure.',
        ...chx([['Répartition d\'un budget en parts :', 'circulaire', 'circulaire · en barres'], ['Comparer les ventes de 6 magasins :', 'en barres', 'circulaire · en barres'], ['Évolution d\'une température sur une journée :', 'courbe', 'courbe · circulaire']]) },
      { etoiles: 2, col: 1, consigne: 'Dans un diagramme circulaire, un disque entier = 360°. Calcule l\'angle de chaque secteur.',
        ...rmp([['50 % → @ °', 180], ['25 % → @ °', 90], ['10 % → @ °', 36], ['1 élève sur 30 → @ °', 12]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Sur 40 élèves, 18 ont un chat, 12 un chien et 10 aucun animal. Calcule l\'angle de chaque secteur d\'un diagramme circulaire, puis trace-le.',
        corr: cm1Redac('Angles', { suite: ['Chat : 18 × 360 : 40 = 162°', 'Chien : 12 × 360 : 40 = 108°', 'Aucun : 10 × 360 : 40 = 90°'] }, 'Vérification : 162 + 108 + 90 = 360°.') },
    ] },
  { titre: 'La moyenne', duree: '40 min',
    attendus: ['Calculer la moyenne d\'une série de valeurs', 'Calculer une moyenne à partir d\'un tableau d\'effectifs', 'Interpréter une moyenne'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Calcule la moyenne de chaque série.',
        ...rmp([['12 ; 15 ; 9 : @', 12], ['8 ; 10 ; 14 ; 16 : @', 12], ['5 ; 7 ; 9 ; 11 ; 13 : @', 9], ['2,5 ; 3,5 ; 6 : @', 4]], 3) },
      { etoiles: 2, col: 1, consigne: 'Notes de Lina : 14 ; 11 ; 17 ; 8 ; 15. Complète.',
        ...rmp([['Somme des notes : @', 65], ['Moyenne : @', 13], ['Note à avoir au 6e contrôle pour une moyenne de 14 : @', 19]], 3) },
      { etoiles: 2, col: 1, consigne: 'Nombre de frères et sœurs des 20 élèves d\'une classe.',
        ...(() => { const D = [[0, 4], [1, 9], [2, 5], [3, 2]], t = tab(['Frères et sœurs', ...D.map(x => x[0])], [['Effectif', ...D.map(x => x[1])]]), q = rmp([['Nombre total de frères et sœurs : @', 25], ['Moyenne par élève : @', 1.25]], 3);
          return { eleve: t + q.eleve, corr: t + q.corr }; })() },
      { etoiles: 2, col: 1, consigne: 'Vrai ou faux ? Entoure.',
        ...ch([['La moyenne est toujours une des valeurs de la série :', 'faux'], ['La moyenne est comprise entre la plus petite et la plus grande valeur :', 'vrai'], ['Si on ajoute 2 à toutes les valeurs, la moyenne augmente de 2 :', 'vrai']], 'vrai · faux') },
      { etoiles: 2, col: 1, consigne: 'Températures maximales d\'une semaine : 18 ; 21 ; 19 ; 24 ; 22 ; 17 ; 19 (°C).',
        ...rmp([['Moyenne : @ °C', 20], ['Température la plus haute : @ °C', 24], ['Étendue (plus haute − plus basse) : @ °C', 7]], 2) },
      { etoiles: 2, col: 1, consigne: 'Entoure la moyenne de la série.',
        ...chx([['10 ; 20 ; 30 :', '20', '20 · 30 · 60'], ['4 ; 4 ; 4 ; 8 :', '5', '4 · 5 · 6'], ['1 ; 2 ; 3 ; 4 ; 5 ; 6 :', '3,5', '3 · 3,5 · 4']]) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Une équipe de basket marque en moyenne 72 points par match sur 4 matchs. Elle marque 82 points au 5e match. Quelle est sa nouvelle moyenne ?',
        corr: cm1Redac('Points sur 4 matchs', '72 × 4 = 288', '') + cm1Redac('Nouvelle moyenne', '(288 + 82) : 5 = 370 : 5 = 74', 'La nouvelle moyenne est de 74 points par match.') },
    ] },
  { titre: 'Interpréter des données', duree: '40 min',
    attendus: ['Lire des données dans un tableau ou un graphique', 'Calculer effectifs, fréquences et moyennes pour répondre à une question', 'Porter un regard critique sur une conclusion'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Taille (en cm) de 8 joueurs : 182 ; 175 ; 190 ; 178 ; 185 ; 175 ; 188 ; 191.',
        ...rmp([['Taille du plus petit : @ cm', 175], ['Étendue : @ cm', 16], ['Taille moyenne : @ cm', 183]], 3) },
      { etoiles: 2, col: 1, consigne: 'Ventes de glaces d\'un marchand (en kg) : juin 60 ; juillet 84 ; août 96.',
        ...rmp([['Total sur l\'été : @ kg', 240], ['Moyenne par mois : @ kg', 80], ['Part du mois d\'août : @ %', 40]], 3) },
      { etoiles: 2, col: 1, consigne: 'Ces conclusions sont-elles justes ? Entoure.',
        ...chx([['Classe A : moyenne 12 ; classe B : moyenne 11. Tous les élèves de A ont plus que ceux de B :', 'non', 'oui · non'], ['Sur 1 000 sondés, 600 aiment le foot : 60 % des sondés aiment le foot :', 'oui', 'oui · non'], ['3 élèves sur 4 aiment les maths : 75 % des élèves de France les aiment :', 'non', 'oui · non']]) },
      { etoiles: 2, col: 1, consigne: 'Complète le diagramme : nombre de buts marqués par match (match 1 : 3 ; match 2 : 1 ; match 3 : 4 ; match 4 : 2).',
        ...(() => { const D = [['M1', 3], ['M2', 1], ['M3', 4], ['M4', 2]]; return { eleve: barresX(D, 5, 1, [0, 1, 2, 3], { axe: 'buts', px: 300 }), corr: barres(D, 5, 1, { axe: 'buts', px: 300 }) }; })() },
      { etoiles: 1, col: 1, consigne: 'Durée de sommeil (en heures) de 6 élèves : 9 ; 8 ; 10 ; 7 ; 9 ; 11.',
        ...rmp([['Durée moyenne : @ h', 9], ['Nombre d\'élèves qui dorment plus que la moyenne : @', 2], ['Étendue : @ h', 4]], 2) },
      { etoiles: 3, col: 1, cahier: true, consigne: 'Deux élèves ont eu ces notes. Hugo : 10 ; 10 ; 10 ; 10. Inès : 4 ; 16 ; 6 ; 14. Calcule leurs moyennes. Que remarques-tu ? Qui est le plus régulier ?',
        corr: cm1Redac('Moyennes', { suite: ['Hugo : 40 : 4 = 10', 'Inès : 40 : 4 = 10'] }, 'Ils ont la même moyenne, mais Hugo est plus régulier (étendue 0 contre 12 pour Inès).') },
    ] },
];
})();

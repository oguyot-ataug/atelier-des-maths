/* ============================================================
   CHAPITRE : Formules et graphiques (4e, D4)
   Programme du cycle 4 en vigueur en 4e jusqu'en août 2027 (BO n° 31 du 30 juillet 2020) et attendus
   de fin de 4e (Éduscol 2019), « Comprendre et utiliser la notion de fonction » : produire une formule
   littérale représentant la dépendance de deux grandeurs ; représenter cette dépendance par un
   graphique ; lire et interpréter un graphique (valeurs sur l'axe des abscisses ou des ordonnées).
   Exemples des attendus : l'aire restante quand on enlève quatre carrés aux coins d'un rectangle de
   20 cm sur 13 cm ; la température d'un four en fonction du temps. Le vocabulaire « fonction, image,
   antécédent » est réservé à la 3e (chapitre Généralités sur les fonctions).
   Pensé pour être projeté : les carrés des coins qui grandissent, le point qui avance sur la courbe.
   ============================================================ */
(() => {
const T = cm1Tex, P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const aire = x => 260 - 4 * x * x;
// Le rectangle 20 × 13 avec ses quatre carrés de côté x enlevés aux coins.
function plaque(x, px){
  const K = 12, W = 20 * K, H = 13 * K, c = x * K, o = 8;
  let s = `<rect x="${o}" y="${o}" width="${W}" height="${H}" fill="#fff" stroke="#1C1B2E" stroke-width="2"/>`;
  [[0, 0], [W - c, 0], [0, H - c], [W - c, H - c]].forEach(([a, b]) => { s += `<rect x="${o + a}" y="${o + b}" width="${c}" height="${c}" fill="#9AA3AE" fill-opacity=".55" stroke="#1C1B2E" stroke-width="1.5" stroke-dasharray="4 3"/>`; });
  s += `<text x="${o + W / 2}" y="${o + H + 18}" text-anchor="middle" font-size="13">20 cm</text><text x="${o + W + 6}" y="${o + H / 2}" font-size="13">13 cm</text>`;
  if(x > 0) s += `<text x="${o + c / 2}" y="${o + c + 14}" text-anchor="middle" font-size="12" fill="#C2185B" font-weight="700">x</text>`;
  return `<svg viewBox="0 0 ${W + 60} ${H + 30}" style="max-width:${px || 300}px;width:100%;font-family:'Space Grotesk',sans-serif;">${s}</svg>`;
}
// Repère : x de 0 à 6, A de 0 à 280 ; points du tableau ; k : point courant.
function graphe(k, tous, px){
  const X = x => 40 + x * 50, Y = a => 210 - a * .7;
  let s = `<line x1="40" y1="210" x2="350" y2="210" stroke="#1C1B2E" stroke-width="1.5"/><line x1="40" y1="215" x2="40" y2="8" stroke="#1C1B2E" stroke-width="1.5"/>`;
  for(let x = 0; x <= 6; x++) s += `<line x1="${X(x)}" y1="210" x2="${X(x)}" y2="8" stroke="#E3E8EF"/><text x="${X(x)}" y="226" text-anchor="middle" font-size="12">${x}</text>`;
  for(let a = 0; a <= 280; a += 40) s += `<line x1="40" y1="${Y(a)}" x2="350" y2="${Y(a)}" stroke="#E3E8EF"/><text x="34" y="${Y(a) + 4}" text-anchor="end" font-size="11">${a}</text>`;
  s += `<text x="352" y="204" font-size="12" text-anchor="end" font-style="italic">x (cm)</text><text x="46" y="16" font-size="12" font-style="italic">aire (cm²)</text>`;
  if(tous) s += `<path d="${Array.from({ length: 61 }, (_, i) => (i ? 'L' : 'M') + X(i / 10).toFixed(1) + ' ' + Y(aire(i / 10)).toFixed(1)).join(' ')}" fill="none" stroke="#0C5BA0" stroke-width="2.5"/>`;
  for(let x = 0; x <= Math.floor(k); x++) s += `<circle cx="${X(x)}" cy="${Y(aire(x))}" r="5" fill="#E07B00"/>`;
  if(k != null && k % 1) s += `<circle cx="${X(k)}" cy="${Y(aire(k))}" r="5" fill="#C2185B"/>`;
  return `<svg viewBox="0 0 360 236" style="max-width:${px || 380}px;width:100%;font-family:'Space Grotesk',sans-serif;">${s}</svg>`;
}
/* ---- Les carrés des coins grandissent ; le point correspondant se place sur le graphique ---- */
function animAire(id){
  return cmAnim(id, { duree: 10000, legende: 'Quand le côté x des carrés augmente, l\'aire restante diminue : chaque valeur de x donne un point du graphique.',
    dessin: t => {
      const x = Math.round(cmPhase(t, .05, .85) * 60) / 10, fin = t >= .9;
      return { scene: `<div style="display:flex;gap:18px;flex-wrap:wrap;justify-content:center;align-items:center;">${plaque(x, 280)}${graphe(x, fin, 360)}</div>`,
        texte: fin ? `En reliant les points, on obtient la <b>représentation graphique</b> de l'aire en fonction de x : ce n'est pas une droite.` : `x = ${String(x).replace('.', ',')} cm : aire = ${T(`260 - 4 \\times ${String(x).replace('.', '{,}')}^2 = ${String(Math.round(aire(x) * 100) / 100).replace('.', '{,}')}`)} cm².` };
    } });
}
// Température d'un four (attendus de fin de 4e) : courbe lue sur le graphique.
const FOUR = [[0, 20], [1, 35], [2, 52], [3, 66], [4, 78], [5, 89], [6, 97], [7, 104], [8, 110], [9, 114], [10, 117]];
function four(px){
  const X = t => 40 + t * 30, Y = d => 200 - d * 1.5;
  let s = `<line x1="40" y1="200" x2="350" y2="200" stroke="#1C1B2E" stroke-width="1.5"/><line x1="40" y1="205" x2="40" y2="10" stroke="#1C1B2E" stroke-width="1.5"/>`;
  for(let t = 0; t <= 10; t++) s += `<line x1="${X(t)}" y1="200" x2="${X(t)}" y2="10" stroke="#E3E8EF"/><text x="${X(t)}" y="216" text-anchor="middle" font-size="11">${t}</text>`;
  for(let d = 0; d <= 120; d += 20) s += `<line x1="40" y1="${Y(d)}" x2="350" y2="${Y(d)}" stroke="#E3E8EF"/><text x="34" y="${Y(d) + 4}" text-anchor="end" font-size="11">${d}</text>`;
  s += `<path d="${FOUR.map(([t, d], i) => (i ? 'L' : 'M') + X(t) + ' ' + Y(d)).join(' ')}" fill="none" stroke="#C2185B" stroke-width="2.5"/>`;
  s += `<path d="M${X(7)} 200 V${Y(104)} H40" fill="none" stroke="#E07B00" stroke-width="1.6" stroke-dasharray="5 4"/><path d="M40 ${Y(110)} H${X(8)} V200" fill="none" stroke="#1E7B34" stroke-width="1.6" stroke-dasharray="5 4"/>`;
  s += `<text x="350" y="194" font-size="12" text-anchor="end" font-style="italic">temps (min)</text><text x="46" y="20" font-size="12" font-style="italic">température (°C)</text>`;
  return `<svg viewBox="0 0 360 226" style="max-width:${px || 380}px;width:100%;font-family:'Space Grotesk',sans-serif;">${s}</svg>`;
}

cm1Chapitre({
  niveau: '4e', titre: 'Formules et graphiques', slug: 'formules-graphiques',
  cours: `
${cm1Lecon(1, 'Une formule pour une grandeur qui dépend d\'une autre')}
${P('On enlève quatre carrés de même côté <i>x</i> (en cm) aux quatre coins d\'un rectangle de 20 cm sur 13 cm. L\'aire de la figure restante (en blanc) <b>dépend</b> de <i>x</i>.')}
${animAire('fg4-aire')}
${cm1Def(`L'aire du rectangle est ${T('20 \\times 13 = 260')} cm² ; chaque carré a une aire de ${T('x^2')} cm². L'aire restante, en cm², est donc :${P(T('\\mathcal{A} = 260 - 4x^2'))}`, 'Produire une formule')}
${cm1Rem(`Ici, ${T('x')} ne peut pas dépasser 6,5 cm : sinon les carrés se chevaucheraient (13 : 2 = 6,5).`)}

${cm1Lecon(2, 'Un tableau de valeurs')}
${cm1Tableau(['x (cm)', '0', '1', '2', '3', '4', '5', '6'], [['Aire (cm²)', ...[0, 1, 2, 3, 4, 5, 6].map(x => String(aire(x)))]])}
${cm1Regle(`Pour chaque valeur de ${T('x')}, on <b>remplace</b> ${T('x')} dans la formule : pour ${T('x = 3')}, ${T('\\mathcal{A} = 260 - 4 \\times 3^2 = 260 - 36 = 224')}.`, 'Calculer avec la formule')}

${cm1Lecon(3, 'Un graphique')}
${cm1Def(`${P(graphe(6, true, 380))}On place les points de coordonnées (${T('x')} ; aire) du tableau, puis on les relie par une courbe régulière. En abscisse (axe horizontal) : la grandeur dont l'autre dépend ; en ordonnée (axe vertical) : la grandeur calculée.`, 'Représenter par un graphique')}

${cm1Lecon(4, 'Lire un graphique')}
${cm1Def(`${P(four(380))}Le graphique représente la température d'un four en fonction du temps.${cm1Liste(['Au bout de 7 min, on part de 7 sur l\'axe des abscisses, on monte jusqu\'à la courbe, puis on lit sur l\'axe des ordonnées : environ <b>104 °C</b> (en orange).', 'Le four atteint 110 °C : on part de 110 sur l\'axe des ordonnées, on va jusqu\'à la courbe, puis on descend : au bout de <b>8 min</b> environ (en vert).'])}`, 'Lire dans les deux sens')}
${cm1Rem('Une lecture graphique donne une valeur <b>approchée</b>. Si on a la formule, on peut calculer la valeur exacte.')}
`,
  methode: `
${cm1Demo('fg4-m-formule', 'Écrire une formule', 'Un forfait de cinéma coûte 20 € par an, puis 4 € par séance. Exprime le prix P en fonction du nombre n de séances.')}
${cm1Demo('fg4-m-lire', 'Lire une valeur sur un graphique', 'Quelle est la température du four au bout de 4 min ?')}
`,
  demos: [
    ['fg4-m-formule', [
      { expr: 'Pour 1 séance : 20 + 4 × 1 = 24 €', note: 'Je fais un essai avec un nombre.' },
      { expr: 'Pour 5 séances : 20 + 4 × 5 = 40 €', note: 'Un deuxième essai : je repère ce qui change (le nombre de séances).' },
      { expr: T('P = 20 + 4n'), note: 'Je remplace le nombre de séances par la lettre n.' },
    ]],
    ['fg4-m-lire', [
      { expr: 'Je place 4 sur l\'axe des abscisses (temps).', note: 'C\'est la valeur connue.', fig: four(300) },
      { expr: 'Je monte verticalement jusqu\'à la courbe.', note: 'Je trace en pointillés.' },
      { expr: 'Je lis sur l\'axe des ordonnées : environ 78 °C.', note: 'Au bout de 4 min, le four est à 78 °C environ.' },
    ]],
  ],
  exos: cm1Exos('fg4', [
    ['Un taxi facture 3 € de prise en charge, puis 2 € par km. Exprime le prix P en fonction de la distance d (en km).',
      cm1Redac('Prix du taxi', T('P = 3 + 2d'), 'Le prix, en euros, est P = 3 + 2d.')],
    ['Calcule l\'aire restante A = 260 − 4x² pour x = 2,5 cm.',
      cm1Redac('Aire pour x = 2,5', { nom: 'A', lignes: [T('260 - 4 \\times 2{,}5^2'), T('260 - 4 \\times 6{,}25'), T('260 - 25'), T('235')] }, 'Pour x = 2,5 cm, l\'aire restante est 235 cm².')],
    ['Complète le tableau pour P = 3 + 2d : d = 0, 1, 5, 10.',
      cm1Redac('Tableau de valeurs', { suite: ['d = 0 : P = 3', 'd = 1 : P = 5', 'd = 5 : P = 13', 'd = 10 : P = 23'] }, 'On remplace d par chaque valeur dans la formule.')],
    ['Sur le graphique du four, au bout de combien de temps la température atteint-elle 90 °C ?',
      cm1Redac('Lecture graphique', '', 'On part de 90 sur l\'axe des ordonnées, on rejoint la courbe, on descend : environ 5 min.', four(260))],
    ['Le périmètre p d\'un carré de côté c est p = 4c. Le graphique est-il une droite passant par l\'origine ?',
      cm1Redac('Le graphique', '', 'Oui : le périmètre est proportionnel au côté (on multiplie toujours par 4), les points sont alignés avec l\'origine.')],
    ['L\'aire d\'un disque de rayon r est A = πr². Calcule A pour r = 3 cm (arrondi au cm²).',
      cm1Redac('Aire du disque', T('A = \\pi \\times 3^2 = 9\\pi \\approx 28'), 'L\'aire est environ 28 cm².')],
    ['Une bougie de 20 cm diminue de 2 cm par heure. Exprime sa hauteur h en fonction du temps t (en heures).',
      cm1Redac('Hauteur de la bougie', T('h = 20 - 2t'), 'Au bout de t heures, la bougie mesure 20 − 2t cm (pour t entre 0 et 10).')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les premiers graphiques', [
    'Au XIV<sup>e</sup> siècle, l\'évêque <b>Nicole Oresme</b> dessinait déjà la vitesse d\'un objet en fonction du temps par des segments verticaux : un ancêtre de nos graphiques !',
    'Au XVII<sup>e</sup> siècle, <b>René Descartes</b> et <b>Pierre de Fermat</b> ont l\'idée de repérer les points par deux nombres (les coordonnées) : on peut alors traduire une formule en courbe, et une courbe en formule.',
  ]),
  quiz: [
    { q: 'P = 20 + 4n. Pour n = 3, P = …', opts: ['32', '72', '27'], correct: 0 },
    { q: 'Sur un graphique, la grandeur dont l\'autre dépend se lit sur…', opts: ['l\'axe des abscisses', 'l\'axe des ordonnées', 'la courbe'], correct: 0 },
    { q: 'A = 260 − 4x². Pour x = 5, A = …', opts: ['160', '240', '1 000'], correct: 0 },
    { q: 'Une lecture graphique donne une valeur…', opts: ['approchée', 'toujours exacte', 'fausse'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Un abonnement : 10 € + 3 € par mois. Formule ?', r: ['P = 10 + 3m', 'P = 13m', 'P = 3 + 10m', 'P = 10m + 3m'], ok: 0 },
    { l: 2, q: 'A = 260 − 4x² pour x = 1 :', r: ['256', '1 024', '264', '252'], ok: 0 },
    { l: 3, q: 'Le point (3 ; 224) a pour abscisse…', r: ['3', '224', '227', '0'], ok: 0 },
    { l: 4, q: 'Pour lire la température au bout de 7 min, on part de…', r: ['l\'axe des abscisses', 'l\'axe des ordonnées', 'l\'origine', 'la légende'], ok: 0 },
  ],
});
})();

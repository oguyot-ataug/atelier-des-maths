/* ============================================================
   CHAPITRE : Statistiques (3e, D4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 125-126) : plan du manuel (histogramme ; indicateurs de position :
   moyenne pondérée -- avec les effectifs et avec les fréquences -- et médiane ; indicateur de
   dispersion : l'étendue, y compris lue sur un graphique), titres reformulés, exemples nouveaux
   (différents du manuel ET du D2 de 4e, chapitres/4e/D2-statistiques.js, qui traite déjà moyenne et
   médiane). Méthode animée : un histogramme qu'on règle soi-même, la moyenne vue comme le point
   d'équilibre d'une balance (avec la médiane), la médiane par les effectifs cumulés, deux séries de
   même moyenne mais d'étendues différentes.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const SA3_BLEU = '#0C5BA0', SA3_ORANGE = '#E07B00', SA3_VERT = '#1E7B34', SA3_ROUGE = '#C0392B', SA3_ENCRE = '#1C1B2E';
const sa3Tex = s => `<span class="tex">${s}</span>`;
const sa3N = (v, d) => { const p = Math.pow(10, d == null ? 2 : d), r = Math.round(v * p) / p; return String(r).replace('.', ','); };
const sa3Exact = (v, d) => Math.abs(v * Math.pow(10, d) - Math.round(v * Math.pow(10, d))) < 1e-9;
function sa3Tab(lignes){
  return `<div style="overflow-x:auto;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.92rem;">${lignes.map(l => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:5px 10px;text-align:center;white-space:nowrap;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Histogramme (classes de même amplitude) : bornes [b0, b1, …], effectifs [n0, …].
function sa3Histo(bornes, eff, o){
  o = o || {};
  const W = 460, H = 250, g = 50, b = 40, hmax = Math.max(...eff, 1), pasY = hmax > 12 ? 4 : 2, top = Math.ceil(hmax / pasY) * pasY;
  const x = v => g + (v - bornes[0]) / (bornes[bornes.length - 1] - bornes[0]) * (W - g - 20), y = v => H - b - v / top * (H - b - 20);
  let h = '';
  for(let k = 0; k <= top; k += pasY) h += `<line x1="${g}" y1="${y(k)}" x2="${W - 20}" y2="${y(k)}" stroke="#E1E5EB"/><text x="${g - 6}" y="${y(k) + 4}" text-anchor="end" font-size="11" fill="#4E5665">${k}</text>`;
  eff.forEach((n, i) => { h += `<rect x="${x(bornes[i])}" y="${y(n)}" width="${x(bornes[i + 1]) - x(bornes[i])}" height="${y(0) - y(n)}" fill="${o.couleur || 'rgba(224,123,0,.22)'}" stroke="${SA3_ORANGE}" stroke-width="1.6"/>`;
    if(o.valeurs !== false && n) h += `<text x="${(x(bornes[i]) + x(bornes[i + 1])) / 2}" y="${y(n) - 5}" text-anchor="middle" font-size="12" font-weight="700" fill="${SA3_ORANGE}">${n}</text>`; });
  h += `<line x1="${g}" y1="${y(0)}" x2="${W - 20}" y2="${y(0)}" stroke="${SA3_ENCRE}" stroke-width="1.4"/><line x1="${g}" y1="${y(0)}" x2="${g}" y2="16" stroke="${SA3_ENCRE}" stroke-width="1.4"/>`
    + bornes.map(v => `<text x="${x(v)}" y="${y(0) + 16}" text-anchor="middle" font-size="11" fill="#4E5665">${String(v).replace('.', ',')}</text>`).join('')
    + `<text x="${(g + W - 20) / 2}" y="${H - 4}" text-anchor="middle" font-size="12" font-style="italic" fill="#4E5665">${o.axeX || ''}</text>`
    + `<text x="14" y="${(H - b) / 2}" text-anchor="middle" font-size="12" font-style="italic" fill="#4E5665" transform="rotate(-90 14 ${(H - b) / 2})">${o.axeY || 'Effectif'}</text>`;
  return `<svg${o.id ? ` id="${o.id}"` : ''} viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${o.maxW || 460}px;display:block;margin:8px auto 12px;">${h}</svg>`;
}
// Graphique en ligne (étendue) : valeurs par mois, avec max et min en évidence.
function sa3Courbe(vals, y0, y1, o){
  o = o || {};
  const W = 480, H = 230, g = 46, b = 36, x = i => g + i * (W - g - 16) / (vals.length - 1), y = v => H - b - (v - y0) / (y1 - y0) * (H - b - 16);
  const iMax = vals.indexOf(Math.max(...vals)), iMin = vals.indexOf(Math.min(...vals));
  let h = '';
  for(let v = y0; v <= y1; v += o.pas || 10) h += `<line x1="${g}" y1="${y(v)}" x2="${W - 16}" y2="${y(v)}" stroke="#E1E5EB"/><text x="${g - 6}" y="${y(v) + 4}" text-anchor="end" font-size="10.5" fill="#4E5665">${v}</text>`;
  h += `<polyline points="${vals.map((v, i) => `${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="${SA3_BLEU}" stroke-width="2.2"/>`
    + vals.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="${i === iMax || i === iMin ? 5 : 3}" fill="${i === iMax ? SA3_VERT : i === iMin ? SA3_ROUGE : SA3_BLEU}"/>`).join('')
    + (o.mois || []).map((m, i) => `<text x="${x(i)}" y="${H - b + 15}" text-anchor="middle" font-size="10.5" fill="#4E5665">${m}</text>`).join('')
    + `<line x1="${g}" y1="${H - b}" x2="${W - 16}" y2="${H - b}" stroke="${SA3_ENCRE}"/><line x1="${g}" y1="${H - b}" x2="${g}" y2="10" stroke="${SA3_ENCRE}"/>`
    + `<text x="${x(iMax)}" y="${y(vals[iMax]) - 10}" text-anchor="middle" font-size="12" font-weight="700" fill="${SA3_VERT}">max ${vals[iMax]}</text>`
    + `<text x="${x(iMin)}" y="${y(vals[iMin]) + 20}" text-anchor="middle" font-size="12" font-weight="700" fill="${SA3_ROUGE}">min ${vals[iMin]}</text>`
    + `<text x="${g + 4}" y="12" font-size="11" font-style="italic" fill="#4E5665">${o.axeY || ''}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${o.maxW || 480}px;display:block;margin:8px auto 12px;">${h}</svg>`;
}

// Données du cours.
const SA3_TRAJET_B = [0, 10, 20, 30, 40, 50], SA3_TRAJET_N = [6, 14, 11, 7, 2];      // temps de trajet (min), 40 élèves
const SA3_BASKET = [[42, 2], [48, 5], [51, 6], [55, 4], [60, 3]];                        // points marqués par match, 20 matchs
const SA3_TEMP = [18, 21, 17, 23, 19, 22, 20];                                          // températures d'une semaine
const SA3_EAU = [38, 41, 45, 44, 36, 30, 12, 9, 33, 42, 46, 40];                        // eau consommée par un collège (m³)
const SA3_MOIS = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

document.getElementById('cours-demo-statistiques-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>L'histogramme</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Lorsque le caractère étudié est <b>quantitatif continu</b> (une durée, une masse, une taille…), les valeurs sont regroupées en <b>classes</b>, et la série peut être représentée par un <b>histogramme</b> : l'aire de chaque rectangle est proportionnelle à l'effectif (ou à la fréquence) de la classe.</div>
<div class="redaction-note" ${R4_REM}>Remarque : en 3e, toutes les classes ont la même <b>amplitude</b> (la même largeur). Dans ce cas, la <b>hauteur</b> de chaque rectangle est proportionnelle à l'effectif ou à la fréquence.</div>
<p class="example-title">Exemple : on a demandé aux 40 élèves de 3e d'un collège leur temps de trajet entre la maison et le collège.</p>
<div style="display:flex;flex-wrap:wrap;gap:6px 24px;align-items:center;justify-content:center;">
  ${sa3Tab([['Temps (en min)', 'Nombre d\'élèves'], ...SA3_TRAJET_N.map((n, i) => [`[${SA3_TRAJET_B[i]} ; ${SA3_TRAJET_B[i + 1]}[`, n])])}
  <div style="flex:1 1 300px;max-width:440px;">${sa3Histo(SA3_TRAJET_B, SA3_TRAJET_N, { axeX: 'Temps de trajet (en min)', axeY: 'Nombre d\'élèves', maxW: 440 })}</div>
</div>
<ul class="example-list"><li>La classe [10 ; 20[ contient les temps de 10 min (compris) à 20 min (non compris). Toutes les classes ont une amplitude de 10 min.</li>
  <li>La classe la plus fréquente est [10 ; 20[ : 14 élèves sur 40, soit une fréquence de ${sa3Tex('\\dfrac{14}{40} = 0{,}35')}, c'est-à-dire 35 %.</li></ul>

<div class="lesson-header"><span class="num">2</span><h3>Les indicateurs de position</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>La moyenne pondérée</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">On considère la série statistique suivante :
  ${sa3Tab([['Valeur du caractère', sa3Tex('x_1'), sa3Tex('x_2'), sa3Tex('x_3'), '…', sa3Tex('x_p')], ['Effectif', sa3Tex('n_1'), sa3Tex('n_2'), sa3Tex('n_3'), '…', sa3Tex('n_p')], ['Fréquence ' + sa3Tex('f'), sa3Tex('\\dfrac{n_1}{N}'), sa3Tex('\\dfrac{n_2}{N}'), sa3Tex('\\dfrac{n_3}{N}'), '…', sa3Tex('\\dfrac{n_p}{N}')]])}
  <ul style="margin:0;padding-left:20px;line-height:2.4;">
    <li>L'<b>effectif total</b> est ${sa3Tex('N = n_1 + n_2 + n_3 + \\ldots + n_p')}.</li>
    <li>La <b>moyenne</b> de la série est ${sa3Tex('M = \\dfrac{n_1 x_1 + n_2 x_2 + \\ldots + n_p x_p}{N}')}.</li>
    <li>Avec les <b>fréquences</b> : ${sa3Tex('M = f_1 x_1 + f_2 x_2 + f_3 x_3 + \\ldots + f_p x_p')}.</li>
  </ul></div>
<p class="example-title">Exemple : l'équipe de basket du collège a joué 20 matchs. Voici le nombre de points marqués par match.</p>
${sa3Tab([['Points marqués', ...SA3_BASKET.map(v => v[0])], ['Effectif (matchs)', ...SA3_BASKET.map(v => v[1])], ['Fréquence', ...SA3_BASKET.map(v => sa3N(v[1] / 20))]])}
<ul class="example-list"><li>La <b>population</b> étudiée est l'ensemble des 20 matchs ; le <b>caractère</b> étudié, le nombre de points marqués, est <b>quantitatif</b>. L'<b>effectif total</b> est N = 20.</li></ul>
${r4Ex('', [
  [sa3Tex('M = \\dfrac{2 \\times 42 + 5 \\times 48 + 6 \\times 51 + 4 \\times 55 + 3 \\times 60}{20} = \\dfrac{1\\,030}{20} = 51{,}5'), 'Avec les effectifs : chaque valeur est multipliée par son effectif.'],
  [sa3Tex('M = 0{,}1 \\times 42 + 0{,}25 \\times 48 + 0{,}3 \\times 51 + 0{,}2 \\times 55 + 0{,}15 \\times 60 = 51{,}5'), 'Avec les fréquences : même résultat.'],
  ['L\'équipe marque en moyenne 51,5 points par match.', ''],
])}

<div class="sub-header"><span class="letter">B</span><h4>La médiane</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>médiane</b> d'une série statistique dont les valeurs sont <b>rangées dans l'ordre croissant</b> est un nombre qui partage cette série en <b>deux groupes de même effectif</b>.</div>
<p class="example-title">Remarques :</p>
<ul class="example-list"><li>Si l'effectif total est <b>impair</b>, la médiane est la <b>valeur centrale</b>.</li><li>Si l'effectif total est <b>pair</b>, la médiane est la <b>moyenne des deux valeurs centrales</b>.</li></ul>
<p class="example-title">Exemple 1 (effectif impair) : les températures maximales, en °C, relevées une semaine de mai : ${SA3_TEMP.join(' ; ')}.</p>
<ul class="example-list"><li>Rangées : ${[...SA3_TEMP].sort((a, b) => a - b).map((v, i) => i === 3 ? `<b style="color:${SA3_ORANGE};">${v}</b>` : v).join(' ; ')}. Il y a 7 valeurs : la médiane est la 4e, soit <b>20 °C</b> (3 valeurs en dessous, 3 au-dessus).</li></ul>
<p class="example-title">Exemple 2 (effectif pair) : on reprend les 20 matchs de basket.</p>
<ul class="example-list"><li>L'effectif est pair (20) : la médiane est la moyenne des 10e et 11e valeurs rangées. D'après le tableau, les 2 premières valeurs valent 42, les 5 suivantes 48 (jusqu'à la 7e), les 6 suivantes 51 (de la 8e à la 13e). Les 10e et 11e valent donc 51 : la médiane est <b>51 points</b>.</li>
  <li>Au moins la moitié des matchs se sont terminés avec 51 points ou moins, et au moins la moitié avec 51 points ou plus.</li></ul>

<div class="lesson-header"><span class="num">3</span><h3>Un indicateur de dispersion : l'étendue</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">L'<b>étendue</b> d'une série statistique est la différence entre la <b>plus grande</b> et la <b>plus petite</b> valeur du caractère.</div>
<p class="example-title">Exemple 1 : pour les matchs de basket, l'étendue est 60 − 42 = <b>18 points</b>. Pour les températures, elle est 23 − 17 = <b>6 °C</b>.</p>
<p class="example-title">Exemple 2 : le graphique ci-dessous indique la quantité d'eau consommée chaque mois par un collège, en m³.</p>
${sa3Courbe(SA3_EAU, 0, 50, { mois: SA3_MOIS, axeY: 'Eau consommée (m³)', pas: 10 })}
<ul class="example-list"><li>La plus grande valeur est 46 m³ (novembre), la plus petite 9 m³ (août, pendant les vacances). L'étendue est 46 − 9 = <b>37 m³</b>.</li></ul>
<div class="redaction-note" ${R4_REM}>L'étendue mesure la <b>dispersion</b> des valeurs : plus elle est grande, plus les valeurs sont éloignées les unes des autres. Deux séries peuvent avoir la même moyenne et des étendues très différentes (Méthode 4).</div>
`;

document.getElementById('histoire-demo-statistiques-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Pendant la guerre de Crimée (1853-1856), l'infirmière britannique <b>Florence Nightingale</b> constate que bien plus de soldats meurent des maladies attrapées à l'hôpital que de leurs blessures. Pour convaincre les responsables politiques, elle ne se contente pas de tableaux de nombres : elle invente un diagramme coloré, en forme de rosace, qui montre mois par mois les causes de décès. Son travail conduit à de grandes réformes de l'hygiène dans les hôpitaux, et elle devient en 1859 la première femme membre de la Société royale de statistique de Londres. Quelques décennies plus tard, le statisticien <b>Karl Pearson</b> popularise le mot « <b>histogramme</b> » pour les graphiques en rectangles accolés que l'on utilise dans ce chapitre.
</div>
`;

document.getElementById('methode-demo-statistiques-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : construire un histogramme</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Masse (en kg) des cartables des élèves d'une classe de 3e. Réglez l'effectif de chaque classe : l'histogramme, l'effectif total et les fréquences se mettent à jour.</p>
  <div id="sa3-histoFig"></div>
  <div id="sa3-histoCurseurs" style="display:grid;grid-template-columns:auto 1fr auto;gap:4px 10px;align-items:center;max-width:460px;margin:0 auto;"></div>
  <div id="sa3-histoInfo" style="text-align:center;margin:10px 0 4px;line-height:1.9;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : la moyenne, point d'équilibre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Chaque note est un jeton posé sur une règle. La moyenne est le point où la règle tient en équilibre ; la médiane partage les jetons en deux groupes de même effectif. Ajoutez ou retirez des jetons.</p>
  <svg id="sa3-balSvg" viewBox="0 0 520 230" style="width:100%;max-width:540px;display:block;margin:8px auto;"></svg>
  <div id="sa3-balBoutons" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;"></div>
  <div id="sa3-balInfo" style="text-align:center;margin:10px 0 4px;line-height:1.9;"></div>
  <div class="figure-toolbar"><button class="btn secondary" onclick="sa3BalReset()">Recommencer</button><button class="btn secondary" onclick="sa3BalExtreme()">Ajouter une note extrême (0)</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : trouver la médiane avec les effectifs cumulés</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Pointures de 31 élèves. Cliquez sur « Étape suivante ».</p>
  ${sa3Tab([['Pointure', 36, 37, 38, 39, 40, 41, 42], ['Effectif', 2, 4, 6, 7, 5, 4, 3], ['Effectif cumulé', 2, 6, 12, 19, 24, 28, 31]])}
  <div class="step-display" id="sa3-medDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="sa3MedDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="sa3MedDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : même moyenne, dispersion différente</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Notes sur 20 de deux élèves au premier trimestre. Cliquez sur « Étape suivante ».</p>
  ${sa3Tab([['Inès', 11, 12, 13, 12, 12], ['Hugo', 4, 19, 8, 17, 12]])}
  <div class="step-display" id="sa3-dispDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="sa3DispDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="sa3DispDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function sa3Exo(n, enonce, lignes, fig){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}${fig || ''}
    <button type="button" class="exo-correction-toggle" data-target="sa3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="sa3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-statistiques-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une moyenne pondérée à partir d'un tableau »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">N = 2 + 5 + 6 + 4 + 3 = 20</span><span class="we-comment">1. On calcule l'effectif total.</span></div>
    <div class="we-row"><span class="we-expr">${sa3Tex('M = \\dfrac{2 \\times 42 + 5 \\times 48 + 6 \\times 51 + 4 \\times 55 + 3 \\times 60}{20}')}</span><span class="we-comment">2. Chaque valeur multipliée par son effectif, divisé par N.</span></div>
    <div class="we-row"><span class="we-expr">${sa3Tex('M = \\dfrac{1\\,030}{20} = 51{,}5')}</span><span class="we-comment">3. On calcule.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">L'équipe marque en moyenne 51,5 points par match.</span><span class="we-comment">4. On répond avec l'unité.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${sa3Exo(1, 'On reprend l\'histogramme des temps de trajet des 40 élèves (cours). a) Combien d\'élèves mettent au moins 30 minutes ? b) Quelle est la fréquence de ces élèves, en pourcentage ?', [
    'a) Les classes [30 ; 40[ et [40 ; 50[ : 7 + 2 = 9 élèves.', 'b) ' + sa3Tex('\\dfrac{9}{40} = 0{,}225') + ', soit 22,5 % des élèves.'],
    sa3Histo(SA3_TRAJET_B, SA3_TRAJET_N, { axeX: 'Temps de trajet (en min)', axeY: 'Nombre d\'élèves', maxW: 380 }))}
  ${sa3Exo(2, 'Voici les notes (sur 5) obtenues à un QCM par une classe. Calcule la note moyenne.' + sa3Tab([['Note', 0, 1, 2, 3, 4, 5], ['Effectif', 1, 2, 4, 7, 4, 2]]), [
    'N = 1 + 2 + 4 + 7 + 4 + 2 = 20', sa3Tex('M = \\dfrac{0 \\times 1 + 1 \\times 2 + 2 \\times 4 + 3 \\times 7 + 4 \\times 4 + 5 \\times 2}{20} = \\dfrac{57}{20} = 2{,}85')])}
  ${sa3Exo(3, 'Dans une série, la valeur 10 a une fréquence de 0,2, la valeur 12 une fréquence de 0,5 et la valeur 15 une fréquence de 0,3. Calcule la moyenne.', [
    sa3Tex('M = 0{,}2 \\times 10 + 0{,}5 \\times 12 + 0{,}3 \\times 15 = 2 + 6 + 4{,}5 = 12{,}5')])}
  ${sa3Exo(4, 'Temps (en min) mis par 11 coureurs pour faire un tour de parcours : 14 ; 9 ; 17 ; 12 ; 20 ; 11 ; 15 ; 13 ; 16 ; 10 ; 18. Détermine la médiane et l\'étendue.', [
    'Rangés : 9 ; 10 ; 11 ; 12 ; 13 ; <b>14</b> ; 15 ; 16 ; 17 ; 18 ; 20.', '11 valeurs (impair) : la médiane est la 6e valeur, soit 14 min.', 'Étendue : 20 − 9 = 11 min.'])}
  ${sa3Exo(5, 'On reprend les notes au QCM de l\'exercice 2. Détermine la note médiane.', [
    'Effectifs cumulés : note 0 → 1 ; note 1 → 3 ; note 2 → 7 ; note 3 → 14 ; …', 'N = 20 (pair) : la médiane est la moyenne des 10e et 11e valeurs.',
    'Les valeurs de rang 8 à 14 valent 3 : les 10e et 11e valent 3. La médiane est 3.'])}
  ${sa3Exo(6, 'Deux classes ont obtenu la même moyenne de 12 à un contrôle. Dans la 3e A, l\'étendue des notes est de 4 ; dans la 3e B, elle est de 15. Que peut-on en déduire ?', [
    'Les notes de la 3e A sont regroupées (toutes à moins de 4 points d\'écart) : la classe est homogène.', 'En 3e B, les notes sont très dispersées : il y a de grands écarts entre les élèves.'])}
  ${sa3Exo(7, 'Léa a obtenu 11, 14 et 9 à ses trois premiers contrôles. Quelle note doit-elle obtenir au quatrième pour avoir exactement 12 de moyenne ?', [
    'Pour 12 de moyenne sur 4 notes, la somme doit être 4 × 12 = 48.', 'Elle a déjà 11 + 14 + 9 = 34 points : il lui faut 48 − 34 = 14.'])}
  ${sa3Exo(8, 'Avec des classes, on estime la moyenne en remplaçant chaque classe par son <b>centre</b> (par exemple 15 pour [10 ; 20[). Estime le temps de trajet moyen des 40 élèves du cours.', [
    'Centres des classes : 5 ; 15 ; 25 ; 35 ; 45.', sa3Tex('M \\approx \\dfrac{6 \\times 5 + 14 \\times 15 + 11 \\times 25 + 7 \\times 35 + 2 \\times 45}{40} = \\dfrac{850}{40} = 21{,}25'),
    'Le temps de trajet moyen est d\'environ 21 min.'])}
  ${sa3Exo(9, 'Vrai ou faux ? Justifie. a) La moyenne est toujours une des valeurs de la série. b) La moitié au moins des valeurs est inférieure ou égale à la médiane. c) Si on ajoute 2 à toutes les valeurs, l\'étendue augmente de 2.', [
    'a) Faux : pour la série 1 ; 2, la moyenne est 1,5, qui n\'est pas une valeur de la série.',
    'b) Vrai : c\'est la définition de la médiane.', 'c) Faux : la plus grande et la plus petite valeur augmentent toutes les deux de 2, leur différence ne change pas.'])}
</div>
`;

/* ---- Méthode 1 : histogramme réglable ---- */
const SA3_CART_B = [2, 4, 6, 8, 10, 12], SA3_CART_N0 = [3, 8, 10, 5, 2];
let sa3CartN = SA3_CART_N0.slice();
function sa3HistoMaj(){
  document.getElementById('sa3-histoFig').innerHTML = sa3Histo(SA3_CART_B, sa3CartN, { axeX: 'Masse du cartable (en kg)', axeY: 'Nombre d\'élèves', maxW: 460 });
  const N = sa3CartN.reduce((t, n) => t + n, 0);
  document.getElementById('sa3-histoInfo').innerHTML = `Effectif total : <b>N = ${N}</b><br>` + (N ? 'Fréquences : ' + sa3CartN.map((n, i) => `[${SA3_CART_B[i]} ; ${SA3_CART_B[i + 1]}[ : ${sa3N(n / N * 100, 1)} %`).join(' · ') : '');
}
function sa3HistoInit(){
  sa3CartN = SA3_CART_N0.slice();
  document.getElementById('sa3-histoCurseurs').innerHTML = sa3CartN.map((n, i) => `<label for="sa3-hc${i}" style="font-family:'JetBrains Mono',monospace;font-size:.9rem;">[${SA3_CART_B[i]} ; ${SA3_CART_B[i + 1]}[</label><input id="sa3-hc${i}" type="range" min="0" max="15" value="${n}" oninput="sa3CartN[${i}] = Number(this.value); document.getElementById('sa3-hv${i}').textContent = this.value; sa3HistoMaj()"><span id="sa3-hv${i}" style="font-family:'JetBrains Mono',monospace;min-width:24px;">${n}</span>`).join('');
  sa3HistoMaj();
}

/* ---- Méthode 2 : la balance ---- */
const SA3_BAL0 = [8, 10, 10, 11, 12, 12, 12, 14, 15, 16];
let sa3Bal = SA3_BAL0.slice();
function sa3BalDessin(){
  const svg = document.getElementById('sa3-balSvg'); if(!svg) return;
  const x = v => 30 + v * 23, yR = 170, pile = {};
  const moy = sa3Bal.reduce((t, v) => t + v, 0) / sa3Bal.length, tri = [...sa3Bal].sort((a, b) => a - b), n = tri.length;
  const med = n % 2 ? tri[(n - 1) / 2] : (tri[n / 2 - 1] + tri[n / 2]) / 2;
  let h = `<line x1="${x(0)}" y1="${yR}" x2="${x(20)}" y2="${yR}" stroke="${SA3_ENCRE}" stroke-width="4" stroke-linecap="round"/>`;
  for(let v = 0; v <= 20; v++) h += `<line x1="${x(v)}" y1="${yR}" x2="${x(v)}" y2="${yR + (v % 5 ? 5 : 9)}" stroke="${SA3_ENCRE}"/>` + (v % 5 === 0 ? `<text x="${x(v)}" y="${yR + 22}" text-anchor="middle" font-size="11">${v}</text>` : '');
  sa3Bal.forEach(v => { pile[v] = (pile[v] || 0) + 1; h += `<circle cx="${x(v)}" cy="${yR - 10 - (pile[v] - 1) * 17}" r="7.5" fill="${SA3_BLEU}" stroke="#fff" stroke-width="1.5"/>`; });
  h += `<path d="M${x(moy).toFixed(1)},${yR + 2} L${(x(moy) - 13).toFixed(1)},${yR + 26} L${(x(moy) + 13).toFixed(1)},${yR + 26} Z" fill="${SA3_ORANGE}"/>`
    + `<text x="${x(moy).toFixed(1)}" y="${yR + 44}" text-anchor="middle" font-size="12" font-weight="700" fill="${SA3_ORANGE}">moyenne ${sa3N(moy)}</text>`
    + `<line x1="${x(med).toFixed(1)}" y1="20" x2="${x(med).toFixed(1)}" y2="${yR - 2}" stroke="${SA3_VERT}" stroke-width="2" stroke-dasharray="5 4"/>`
    + `<text x="${x(med).toFixed(1)}" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="${SA3_VERT}">médiane ${sa3N(med)}</text>`;
  svg.innerHTML = h;
  const et = tri[n - 1] - tri[0];
  document.getElementById('sa3-balInfo').innerHTML = `${n} notes · somme ${sa3Bal.reduce((t, v) => t + v, 0)} · moyenne ${sa3Exact(moy, 2) ? '=' : '≈'} <b style="color:${SA3_ORANGE};">${sa3N(moy)}</b> · médiane <b style="color:${SA3_VERT};">${sa3N(med)}</b> · étendue ${tri[n - 1]} − ${tri[0]} = <b>${et}</b>`;
}
function sa3BalBoutons(){
  document.getElementById('sa3-balBoutons').innerHTML = [4, 8, 10, 12, 14, 16, 18, 20].map(v => `<span style="display:inline-flex;border:1px solid #C9D6E6;border-radius:8px;overflow:hidden;"><button class="btn secondary qz-mini" style="border-radius:0;" onclick="sa3BalRetirer(${v})">−</button><span style="padding:4px 8px;font-family:'JetBrains Mono',monospace;">${v}</span><button class="btn secondary qz-mini" style="border-radius:0;" onclick="sa3BalAjouter(${v})">+</button></span>`).join('');
}
function sa3BalAjouter(v){ if(sa3Bal.filter(x => x === v).length < 8) sa3Bal.push(v); sa3BalDessin(); }
function sa3BalRetirer(v){ const i = sa3Bal.indexOf(v); if(i >= 0 && sa3Bal.length > 1) sa3Bal.splice(i, 1); sa3BalDessin(); }
function sa3BalExtreme(){ sa3BalAjouter(0); }
function sa3BalReset(){ sa3Bal = SA3_BAL0.slice(); sa3BalDessin(); }

/* ---- Méthode 3 : médiane et effectifs cumulés ---- */
const SA3_MED_STEPS = [
  { expr: 'N = 31', note: 'L\'effectif total est la dernière valeur de la ligne des effectifs cumulés.' },
  { expr: '31 est impair : la médiane est la 16e valeur.', note: '(31 + 1) ÷ 2 = 16 : il y a 15 valeurs avant, 15 après.' },
  { expr: 'Effectifs cumulés : 12 élèves jusqu\'à la pointure 38, 19 jusqu\'à la pointure 39.', note: 'On cherche la première colonne dont l\'effectif cumulé atteint 16.' },
  { expr: 'Les valeurs de rang 13 à 19 sont 39 : la 16e aussi.', note: '' },
  { expr: 'La pointure médiane est 39.', note: 'Au moins la moitié des élèves chausse du 39 ou moins, et au moins la moitié du 39 ou plus.' },
];
const sa3MedDemo = makeStepDemo(SA3_MED_STEPS, 'sa3-medDisplay');

/* ---- Méthode 4 : dispersion ---- */
const SA3_DISP_STEPS = [
  { expr: 'Inès : ' + sa3Tex('M = \\dfrac{11 + 12 + 13 + 12 + 12}{5} = \\dfrac{60}{5} = 12'), note: 'Moyenne d\'Inès.' },
  { expr: 'Hugo : ' + sa3Tex('M = \\dfrac{4 + 19 + 8 + 17 + 12}{5} = \\dfrac{60}{5} = 12'), note: 'Même moyenne !' },
  { expr: 'Étendue d\'Inès : 13 − 11 = 2 ; étendue de Hugo : 19 − 4 = 15.', note: 'L\'étendue mesure l\'écart entre la meilleure et la moins bonne note.' },
  { expr: 'Inès est très régulière ; les résultats de Hugo sont très dispersés.', note: 'La moyenne seule ne suffit pas pour décrire une série : on complète par un indicateur de dispersion.' },
];
const sa3DispDemo = makeStepDemo(SA3_DISP_STEPS, 'sa3-dispDisplay');

DEMO_REGISTRY['3e|Statistiques'] = {
  cours: 'cours-demo-statistiques-3e', methode: 'methode-demo-statistiques-3e', exos: 'exos-demo-statistiques-3e', histoire: 'histoire-demo-statistiques-3e',
  init: () => {
    sa3HistoInit(); sa3BalBoutons(); sa3BalReset(); sa3MedDemo.reset(); sa3DispDemo.reset();
    ['cours-demo-statistiques-3e', 'methode-demo-statistiques-3e', 'exos-demo-statistiques-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-statistiques-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-statistiques-3e'));
  }
};

DEMO_QUIZZES['3e|Statistiques'] = [
  { q: 'Un histogramme sert à représenter un caractère...', opts: ['qualitatif', 'quantitatif continu, regroupé en classes', 'uniquement des pourcentages'], correct: 1 },
  { q: 'Dans un histogramme dont les classes ont la même amplitude, la hauteur des rectangles est proportionnelle...', opts: ['à l\'effectif', 'à l\'amplitude', 'au centre de la classe'], correct: 0 },
  { q: 'Les valeurs 10, 12 et 15 ont pour effectifs 1, 2 et 1. La moyenne est...', opts: ['12,25', '12,33', '37'], correct: 0 },
  { q: 'Série rangée : 3 ; 5 ; 8 ; 9 ; 14. La médiane est...', opts: ['8', '7,8', '9'], correct: 0 },
  { q: 'Série rangée : 2 ; 4 ; 6 ; 10. La médiane est...', opts: ['5', '4', '5,5'], correct: 0 },
  { q: 'L\'étendue de la série 7 ; 15 ; 9 ; 21 ; 12 est...', opts: ['14', '21', '12,8'], correct: 0 },
  { q: 'Deux séries ont la même moyenne. On peut affirmer qu\'elles ont...', opts: ['la même étendue', 'la même médiane', 'rien de plus en commun'], correct: 2 },
];

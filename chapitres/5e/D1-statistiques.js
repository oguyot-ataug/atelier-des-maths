/* ============================================================
   CHAPITRE : Statistiques (5e, D1)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Ensuite, on a des chapitres à construire en classe de 5e : Statistiques pour commencer"
   (captures du manuel p. 124-125). Même plan que le manuel (vocabulaire, effectifs, fréquences,
   moyenne), titres reformulés, exemples nouveaux ; diagrammes (bâtons, circulaire) et une
   « enquête » où l'on saisit ses propres données dans l'onglet Méthode.
   ============================================================ */

const S5_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const S5_COUL = ['#0C5BA0', '#E07B00', '#1E7B34', '#8E44AD', '#C0392B', '#16A085', '#D4AC0D', '#7F8C8D'];
const s5Num = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
// Valeur arrondie à d décimales, précédée de « ≈ » si l'arrondi change la valeur (fréquences de l'enquête).
const s5Arr = (v, d) => { const r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); return (Math.abs(r - v) > 1e-9 ? '≈ ' : '') + String(r).replace('.', ','); };
// Tableau statistique : première colonne = en-têtes de ligne.
function s5Tab(lignes, opts){
  opts = opts || {};
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 16px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.93rem;">${lignes.map((l, i) => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:6px 11px;text-align:center;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}${opts.total && j === l.length - 1 ? 'font-weight:700;background:#FBF7EE;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Exemple rédigé « calcul → ce qu'on fait » (même présentation que les autres chapitres).
function s5Ex(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}

/* ---- Diagrammes : bâtons et circulaire (prog de 0 à n : construction progressive) ---- */
function s5Batons(data, titreY, prog){
  prog = prog == null ? data.length : prog;
  const W = 460, H = 262, g = 46, b = 22, top = 34, max = Math.max(...data.map(d => d[1])), pas = max > 20 ? 5 : max > 10 ? 2 : 1, ymax = Math.ceil(max / pas) * pas;
  const y = v => H - b - (v / ymax) * (H - b - top), colW = (W - g - 10) / data.length;
  let h = `<text x="${g}" y="13" text-anchor="middle" font-family="Inter" font-size="11" fill="#4E5665">${titreY}</text>`;
  for(let v = 0; v <= ymax; v += pas) h += `<line x1="${g}" y1="${y(v)}" x2="${W - 6}" y2="${y(v)}" stroke="#E4E7EC"/><text x="${g - 6}" y="${y(v) + 4}" text-anchor="end" font-family="JetBrains Mono" font-size="11" fill="#4E5665">${v}</text>`;
  h += `<line x1="${g}" y1="${top}" x2="${g}" y2="${H - b}" stroke="${'#1C1B2E'}" stroke-width="1.4"/><line x1="${g}" y1="${H - b}" x2="${W - 6}" y2="${H - b}" stroke="#1C1B2E" stroke-width="1.4"/>`;
  data.forEach(([lab, v], i) => {
    const f = Math.max(0, Math.min(1, prog - i)), cx = g + colW * (i + 0.5);
    h += `<text x="${cx}" y="${H - b + 15}" text-anchor="middle" font-family="Inter" font-size="11.5" fill="#1C1B2E">${lab}</text>`;
    if(f > 0) h += `<rect x="${cx - colW * 0.22}" y="${y(v * f)}" width="${colW * 0.44}" height="${(H - b) - y(v * f)}" fill="${S5_COUL[i % S5_COUL.length]}" rx="2"/>`
      + (f >= 1 ? `<text x="${cx}" y="${y(v) - 5}" text-anchor="middle" font-family="JetBrains Mono" font-size="11.5" font-weight="700" fill="#1C1B2E">${v}</text>` : '');
  });
  return `<svg viewBox="0 0 ${W} ${H + 6}" style="width:100%;max-width:480px;display:block;margin:8px auto 12px;">${h}</svg>`;
}
function s5Secteurs(data, prog){
  prog = prog == null ? data.length : prog;
  const tot = data.reduce((t, d) => t + d[1], 0), cx = 130, cy = 130, r = 110;
  let a0 = -Math.PI / 2, h = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#F4F5F8" stroke="#D9DEE6"/>`, leg = '';
  data.forEach(([lab, v], i) => {
    const f = Math.max(0, Math.min(1, prog - i)), ang = v / tot * 2 * Math.PI, a1 = a0 + ang * f, c = S5_COUL[i % S5_COUL.length];
    if(f > 0){
      const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      h += `<path d="M${cx},${cy} L${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${ang * f > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z" fill="${c}" stroke="#fff" stroke-width="2"/>`;
      if(f >= 1){ const am = a0 + ang / 2; h += `<text x="${(cx + r * 0.62 * Math.cos(am)).toFixed(1)}" y="${(cy + r * 0.62 * Math.sin(am) + 4).toFixed(1)}" text-anchor="middle" font-family="JetBrains Mono" font-size="12" font-weight="700" fill="#fff">${Math.round(v / tot * 360)}°</text>`; }
    }
    leg += `<g transform="translate(270,${40 + i * 26})"><rect width="14" height="14" rx="3" fill="${c}"/><text x="22" y="12" font-family="Inter" font-size="13" fill="#1C1B2E">${lab}</text></g>`;
    a0 += ang;
  });
  return `<svg viewBox="0 0 400 262" style="width:100%;max-width:440px;display:block;margin:8px auto 12px;">${h}${leg}</svg>`;
}

// Données des exemples du cours.
const S5_FRATRIE = [1, 2, 0, 1, 3, 1, 2, 4, 1, 0, 2, 1, 3, 1, 2, 0, 1, 2, 4, 1, 3, 2, 0, 1]; // 24 élèves
const S5_SPORTS = [['Football', 12], ['Basket', 8], ['Handball', 6], ['Natation', 10], ['Tennis', 4]]; // 40 élèves

document.getElementById('cours-demo-statistiques-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Décrire une série statistique</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Les mots des statistiques</h4></div>
<p style="margin:4px 0 10px;line-height:1.7;">Pour mener une étude statistique, on recueille des <b>données</b>, puis on les organise. On étudie un <b>caractère</b> (une question posée, une mesure faite…) sur un ensemble d'<b>individus</b> (personnes, objets, animaux…) appelé la <b>population</b>. Le caractère est <b>quantitatif</b> quand ses <b>valeurs</b> sont des nombres (âge, taille, durée…), et <b>qualitatif</b> sinon (couleur préférée, sport pratiqué…).</p>
<span class="def-badge">Définitions</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>L'<b>effectif d'une valeur</b> est le nombre d'individus qui ont cette valeur.</li>
  <li>L'<b>effectif total</b> est le nombre total d'individus de la population : c'est la somme des effectifs de toutes les valeurs.</li>
</ul></div>

<p class="example-title">Exemple 1 : la fratrie dans la classe de Samir</p>
<p style="margin:4px 0;">Samir a demandé à chacun des 24 élèves de sa classe combien il a de frères et sœurs. Voici les réponses, dans l'ordre où il les a notées : c'est une <b>série statistique</b>.</p>
<p style="text-align:center;font-family:'JetBrains Mono',monospace;color:#0C5BA0;margin:8px 0;">${S5_FRATRIE.join(' – ')}</p>
<ul class="example-list">
  <li>La <b>population</b> étudiée est l'ensemble des élèves de la classe ; les <b>individus</b> sont les élèves.</li>
  <li>Le <b>caractère</b> étudié est le nombre de frères et sœurs. Il est <b>quantitatif</b> : ses <b>valeurs</b> sont les nombres 0, 1, 2, 3 et 4.</li>
</ul>
<p style="margin:4px 0;">On regroupe les réponses dans un <b>tableau des effectifs</b> :</p>
${s5Tab([['Valeur (nombre de frères et sœurs)', '0', '1', '2', '3', '4', 'Total'], ['Effectif (nombre d\'élèves)', '4', '<b>9</b>', '6', '3', '2', '24']], { total: true })}
<ul class="example-list"><li>L'effectif de la valeur « 1 » est 9 : neuf élèves ont un seul frère ou une seule sœur.</li></ul>
<div class="redaction-note" ${S5_REM}>Remarque : en additionnant tous les effectifs, on retrouve l'effectif total : 4 + 9 + 6 + 3 + 2 = 24. C'est une bonne façon de vérifier qu'on n'a oublié personne.</div>

<p class="example-title">Exemple 2 : le sport préféré au collège</p>
<p style="margin:4px 0;">On a demandé à 40 élèves de 5e leur sport préféré. Les résultats sont représentés par un <b>diagramme en bâtons</b> :</p>
${s5Batons(S5_SPORTS, 'Effectif')}
<ul class="example-list">
  <li>La population est l'ensemble des 40 élèves interrogés ; les individus sont les élèves.</li>
  <li>Le caractère étudié est le sport préféré. Il est <b>qualitatif</b> : ses valeurs (« Football », « Basket »…) ne sont pas des nombres.</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Les fréquences</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>fréquence</b> d'une valeur est le quotient de l'effectif de cette valeur par l'effectif total :
  <div style="text-align:center;margin:8px 0 2px;"><span class="tex">\\text{fréquence} = \\dfrac{\\text{effectif de la valeur}}{\\text{effectif total}}</span></div>
</div>
<div class="redaction-note" ${S5_REM}>Remarques : une fréquence peut s'écrire sous forme d'une <b>fraction</b>, d'un <b>nombre décimal</b> ou d'un <b>pourcentage</b>. C'est toujours un nombre compris <b>entre 0 et 1</b> (entre 0 % et 100 %).</div>
${s5Ex('Exemple 1 : dans la classe de Samir', [
  ['9 élèves sur 24 ont un seul frère ou une seule sœur.', 'On lit l\'effectif de la valeur et l\'effectif total.'],
  ['<span class="tex">f = \\dfrac{9}{24} = \\dfrac{3}{8}</span>', 'On écrit la fraction, puis on la simplifie.'],
  ['<span class="tex">f = 0{,}375 = 37{,}5\\ \\%</span>', 'On l\'écrit en nombre décimal, puis en pourcentage.'],
])}
<p class="example-title">Exemple 2 : le sport préféré</p>
${s5Tab([
  ['Sport', ...S5_SPORTS.map(d => d[0]), 'Total'],
  ['Effectif', ...S5_SPORTS.map(d => d[1]), '40'],
  ['Fréquence (fraction)', ...S5_SPORTS.map(d => `<span class="tex">\\dfrac{${d[1]}}{40}</span>`), '<span class="tex">\\dfrac{40}{40} = 1</span>'],
  ['Fréquence (nombre décimal)', ...S5_SPORTS.map(d => s5Num(d[1] / 40)), '1'],
  ['Fréquence (pourcentage)', ...S5_SPORTS.map(d => s5Num(d[1] / 40 * 100) + ' %'), '100 %'],
], { total: true })}
<div class="redaction-note" ${S5_REM}>Remarque : la <b>somme de toutes les fréquences</b> est toujours égale à <b>1</b> (soit 100 %).</div>

<div class="lesson-header"><span class="num">2</span><h3>La moyenne d'une série</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">La <b>moyenne</b> d'une série statistique dont le caractère est quantitatif est la <b>somme de toutes les valeurs</b> de la série, divisée par l'<b>effectif total</b>.</div>
<span class="prop-badge">Formule</span>
<div class="def-box">Si <span class="tex">x_1, x_2, \\ldots, x_p</span> sont les <i>p</i> valeurs d'une série, sa moyenne est :
  <div style="text-align:center;margin:8px 0 2px;"><span class="tex">M = \\dfrac{x_1 + x_2 + \\ldots + x_p}{p}</span></div>
</div>
${s5Ex('Exemple 1 : les notes de Jade', [
  ['Jade a obtenu 12 ; 15 ; 9 ; 14 et 10.', 'La série compte 5 valeurs.'],
  ['12 + 15 + 9 + 14 + 10 = 60', 'On additionne toutes les valeurs.'],
  ['<span class="tex">M = \\dfrac{60}{5} = 12</span>', 'On divise par l\'effectif total : Jade a 12 de moyenne.'],
])}
${s5Ex('Exemple 2 : la fratrie dans la classe de Samir', [
  ['La somme des 24 réponses est 38.', 'On additionne les 24 valeurs de la série.'],
  ['<span class="tex">M = \\dfrac{38}{24} \\approx 1{,}6</span>', 'On divise par 24 et on arrondit au dixième.'],
  ['En moyenne, un élève de la classe a environ 1,6 frère ou sœur.', 'On conclut par une phrase.'],
])}
<div class="redaction-note" ${S5_REM}>Remarques : même si toutes les valeurs de la série sont des nombres entiers, la moyenne peut ne pas être un nombre entier (personne n'a « 1,6 » frère !). La moyenne est toujours comprise entre la plus petite et la plus grande valeur de la série.</div>
`;

document.getElementById('histoire-demo-statistiques-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Compter la population n'a rien de nouveau : les Égyptiens, les Chinois et les Romains organisaient déjà des <b>recensements</b> pour lever les impôts ou recruter des soldats. Le mot « statistique » est plus récent : il vient du latin <i>status</i> (l'État) et apparaît au 18e siècle en Allemagne, pour désigner l'étude chiffrée d'un pays. Au 19e siècle, l'infirmière britannique <b>Florence Nightingale</b>, pendant la guerre de Crimée, montre grâce à des diagrammes circulaires de son invention que la plupart des soldats meurent de maladies dues au manque d'hygiène plutôt que de leurs blessures : ses graphiques convainquent le gouvernement d'améliorer les hôpitaux. Un bon diagramme peut sauver des vies !
</div>
`;

document.getElementById('methode-demo-statistiques-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer une fréquence</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Sur 40 élèves interrogés, 12 préfèrent le football. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="s5-frequenceDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="s5FrequenceDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="s5FrequenceDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : construire un diagramme en bâtons</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Pour chaque valeur, on trace un bâton dont la hauteur est proportionnelle à l'effectif. Cliquez sur « Construire ».</p>
  <div id="s5-batons"></div>
  <div id="s5-batonsNote" class="step-note" style="text-align:center;min-height:1.6em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="s5BatonsJouer()">Construire</button>
    <button class="btn secondary" onclick="s5BatonsReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : construire un diagramme circulaire</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">L'angle de chaque secteur est proportionnel à l'effectif : angle = fréquence × 360°. Cliquez sur « Construire ».</p>
  ${s5Tab([['Sport', ...S5_SPORTS.map(d => d[0]), 'Total'], ['Effectif', ...S5_SPORTS.map(d => d[1]), '40'], ['Fréquence', ...S5_SPORTS.map(d => s5Num(d[1] / 40)), '1'], ['Angle', ...S5_SPORTS.map(d => `${s5Num(d[1] / 40)} × 360 = <b>${s5Num(d[1] / 40 * 360)}°</b>`), '360°']], { total: true })}
  <div id="s5-secteurs"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="s5SecteursJouer()">Construire</button>
    <button class="btn secondary" onclick="s5SecteursReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calculer une moyenne</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Températures relevées à midi pendant une semaine (en °C). Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="s5-moyenneDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="s5MoyenneDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="s5MoyenneDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : mener sa propre enquête</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Saisissez les réponses de votre enquête, séparées par des espaces, des points-virgules ou des tirets (des nombres comme « 12 15 9,5 », ou des mots comme « bleu rouge bleu vert »). Le tableau, les fréquences, le diagramme et la moyenne se calculent tout seuls.</p>
  <textarea id="s5-enqueteSaisie" rows="3" style="width:100%;box-sizing:border-box;font-family:'JetBrains Mono',monospace;font-size:1rem;padding:8px 10px;border-radius:8px;border:1px solid #C9D6E6;" oninput="s5Enquete()">2 3 1 2 2 4 3 2 1 0 2 3 1 2 5 2 3 1 2 4</textarea>
  <div id="s5-enqueteResultat" style="margin-top:8px;"></div>
</div>
`;

// Exercice avec correction repliable.
function s5Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="s5-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="s5-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-statistiques-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une fréquence et une moyenne »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Effectif total : 3 + 7 + 6 + 4 = 20 élèves.</span><span class="we-comment">1. On calcule l'effectif total.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Fréquence de la note 15 : <span class="tex">\\dfrac{6}{20} = 0{,}3 = 30\\ \\%</span>.</span><span class="we-comment">2. Effectif de la valeur ÷ effectif total.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Somme des notes : 3 × 8 + 7 × 12 + 6 × 15 + 4 × 18 = 270.</span><span class="we-comment">3. Chaque valeur compte autant de fois que son effectif.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Moyenne : <span class="tex">\\dfrac{270}{20} = 13{,}5</span>. La moyenne de la classe est 13,5.</span><span class="we-comment">4. On divise par l'effectif total et on conclut.</span></div>
  </div>
  ${s5Tab([['Note', '8', '12', '15', '18'], ['Effectif', '3', '7', '6', '4']])}
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${s5Exo(1, 'On a demandé à 30 élèves du collège leur moyen de transport pour venir le matin. Quelle est la population étudiée ? Quels sont les individus ? Quel est le caractère étudié ? Est-il quantitatif ou qualitatif ?', [
    'La population est l\'ensemble des 30 élèves interrogés ; les individus sont les élèves.', 'Le caractère est le moyen de transport. Il est qualitatif : ses valeurs (bus, vélo, à pied…) ne sont pas des nombres.'])}
  ${s5Exo(2, 'Voici les pointures de 20 élèves : 36 – 38 – 37 – 38 – 39 – 36 – 38 – 40 – 37 – 38 – 39 – 38 – 37 – 36 – 38 – 39 – 40 – 38 – 37 – 38. Construis le tableau des effectifs.', [
    'Pointure : 36 | 37 | 38 | 39 | 40', 'Effectif : 3 | 4 | 8 | 3 | 2', 'Vérification : 3 + 4 + 8 + 3 + 2 = 20.'])}
  ${s5Exo(3, 'Dans une classe de 25 élèves, 10 préfèrent le bleu, 5 le rouge, 6 le vert et 4 le noir. Calcule la fréquence de chaque couleur, en nombre décimal puis en pourcentage.', [
    'Bleu : 10 ÷ 25 = 0,4 = 40 %', 'Rouge : 5 ÷ 25 = 0,2 = 20 %', 'Vert : 6 ÷ 25 = 0,24 = 24 %', 'Noir : 4 ÷ 25 = 0,16 = 16 % (total : 100 %)'])}
  ${s5Exo(4, 'Calcule la moyenne des notes suivantes : 11 ; 14 ; 8 ; 17 ; 15.', [
    '11 + 14 + 8 + 17 + 15 = 65', 'M = 65 ÷ 5 = 13'])}
  ${s5Exo(5, 'Voici les températures relevées à midi pendant une semaine : 12 °C ; 15 °C ; 14 °C ; 9 °C ; 11 °C ; 13 °C ; 17 °C. Quelle est la température moyenne ?', [
    '12 + 15 + 14 + 9 + 11 + 13 + 17 = 91', 'M = 91 ÷ 7 = 13 : la température moyenne est 13 °C.'])}
  ${s5Exo(6, 'Dans un club de 45 adhérents, 18 sont des filles. Donne la fréquence des filles sous forme de fraction simplifiée, de nombre décimal et de pourcentage.', [
    '<span class="tex">f = \\dfrac{18}{45} = \\dfrac{2}{5}</span>', 'f = 0,4 = 40 %'])}
  ${s5Exo(7, 'Lina a obtenu 12, 9 et 15 à ses trois premiers contrôles. Quelle note doit-elle avoir au quatrième pour obtenir exactement 13 de moyenne ?', [
    'Pour 13 de moyenne sur 4 notes, la somme doit être 13 × 4 = 52.', 'Elle a déjà 12 + 9 + 15 = 36 points.', 'Il lui faut 52 − 36 = 16 au quatrième contrôle.'])}
  ${s5Exo(8, 'Dans un tableau de fréquences, trois valeurs ont pour fréquences 0,35 ; 0,2 et 0,15. Il reste une seule autre valeur : quelle est sa fréquence ?', [
    'La somme des fréquences vaut 1.', '0,35 + 0,2 + 0,15 = 0,7, donc la fréquence cherchée est 1 − 0,7 = 0,3 (soit 30 %).'])}
</div>
`;

/* ---- Méthodes pas à pas ---- */
const S5_FREQUENCE_STEPS = [
  { expr: 'Effectif de la valeur « Football » : 12. Effectif total : 40.', note: 'On repère les deux effectifs dans le tableau.' },
  { expr: '<span class="tex">f = \\dfrac{12}{40}</span>', note: 'Fréquence = effectif de la valeur ÷ effectif total.' },
  { expr: '<span class="tex">f = \\dfrac{3}{10}</span>', note: 'On peut simplifier la fraction (par 4).' },
  { expr: 'f = 0,3', note: 'Écriture décimale : 3 ÷ 10 = 0,3.' },
  { expr: 'f = 30 %', note: 'En pourcentage : 0,3 × 100 = 30. 30 % des élèves préfèrent le football.' },
];
const s5FrequenceDemo = makeStepDemo(S5_FREQUENCE_STEPS, 's5-frequenceDisplay');
const S5_MOYENNE_STEPS = [
  { expr: '12 ; 15 ; 14 ; 9 ; 11 ; 13 ; 17', note: 'La série compte 7 valeurs : l\'effectif total est 7.' },
  { expr: '12 + 15 + 14 + 9 + 11 + 13 + 17 = 91', note: 'On additionne toutes les valeurs.' },
  { expr: '<span class="tex">M = \\dfrac{91}{7}</span>', note: 'On divise la somme par l\'effectif total.' },
  { expr: 'M = 13', note: 'La température moyenne de la semaine est 13 °C.' },
  { expr: '9 ≤ 13 ≤ 17', note: 'Vérification : la moyenne est bien comprise entre la plus petite et la plus grande valeur.' },
];
const s5MoyenneDemo = makeStepDemo(S5_MOYENNE_STEPS, 's5-moyenneDisplay');

/* ---- Diagrammes animés ---- */
let s5Raf = {};
function s5Animer(cle, dessiner, n, fin){
  cancelAnimationFrame(s5Raf[cle]);
  // Math.max(0, …) : l'horodatage de requestAnimationFrame peut précéder t0 (progression négative).
  const t0 = performance.now(), f = now => { const p = Math.max(0, Math.min(n, (now - t0) / 700)); dessiner(p); if(p < n) s5Raf[cle] = requestAnimationFrame(f); else if(fin) fin(); };
  s5Raf[cle] = requestAnimationFrame(f);
}
function s5BatonsReset(){ cancelAnimationFrame(s5Raf.b); const el = document.getElementById('s5-batons'); if(el) el.innerHTML = s5Batons(S5_SPORTS, 'Effectif', 0); const n = document.getElementById('s5-batonsNote'); if(n) n.textContent = 'On trace les deux axes : les valeurs en bas, les effectifs à gauche (graduation régulière).'; }
function s5BatonsJouer(){
  const el = document.getElementById('s5-batons'), note = document.getElementById('s5-batonsNote');
  s5Animer('b', p => { el.innerHTML = s5Batons(S5_SPORTS, 'Effectif', p); const i = Math.min(S5_SPORTS.length - 1, Math.floor(p)); note.textContent = `${S5_SPORTS[i][0]} : un bâton de hauteur ${S5_SPORTS[i][1]}.`; }, S5_SPORTS.length,
    () => { note.textContent = 'Tous les bâtons ont la même largeur : seule la hauteur représente l\'effectif.'; });
}
function s5SecteursReset(){ cancelAnimationFrame(s5Raf.s); const el = document.getElementById('s5-secteurs'); if(el) el.innerHTML = s5Secteurs(S5_SPORTS, 0); }
function s5SecteursJouer(){ const el = document.getElementById('s5-secteurs'); s5Animer('s', p => { el.innerHTML = s5Secteurs(S5_SPORTS, p); }, S5_SPORTS.length); }

/* ---- Méthode 5 : enquête libre ---- */
function s5Enquete(){
  const out = document.getElementById('s5-enqueteResultat'), brut = document.getElementById('s5-enqueteSaisie').value;
  // Séparateurs : espaces, points-virgules, tirets ; la virgule seulement suivie d'un espace (« 1,5 » reste un nombre décimal).
  const vals = brut.split(/\s*;\s*|,\s+|\s*[–—]\s*|\s+-\s+|(?<=\d)-(?=\d)|\s+/).map(v => v.trim()).filter(Boolean);
  if(!vals.length){ out.innerHTML = '<p class="hint">Saisissez au moins une réponse.</p>'; return; }
  const num = vals.every(v => /^-?\d+([.,]\d+)?$/.test(v)), cle = v => num ? String(Number(v.replace(',', '.'))) : v.toLowerCase();
  const eff = new Map();
  vals.forEach(v => { const k = cle(v); eff.set(k, (eff.get(k) || 0) + 1); });
  let donnees = Array.from(eff.entries());
  if(num) donnees.sort((a, b) => Number(a[0]) - Number(b[0]));
  const N = vals.length, lib = k => num ? k.replace('.', ',') : k.charAt(0).toUpperCase() + k.slice(1);
  let h = `<p style="margin:4px 0;">Effectif total : <b>${N}</b> réponse${N > 1 ? 's' : ''} · caractère <b>${num ? 'quantitatif' : 'qualitatif'}</b>.</p>`;
  h += s5Tab([['Valeur', ...donnees.map(d => lib(d[0])), 'Total'], ['Effectif', ...donnees.map(d => d[1]), N], ['Fréquence', ...donnees.map(d => s5Arr(d[1] / N, 2)), '1'], ['Pourcentage', ...donnees.map(d => s5Arr(d[1] / N * 100, 1) + ' %'), '100 %']], { total: true });
  if(donnees.length <= 12) h += s5Batons(donnees.map(d => [lib(d[0]), d[1]]), 'Effectif');
  if(num){
    const somme = vals.reduce((t, v) => t + Number(v.replace(',', '.')), 0), M = somme / N;
    h += `<div class="def-box" style="text-align:center;">Moyenne : <span class="tex">M = \\dfrac{${s5Num(somme).replace(',', '{,}')}}{${N}} ${Number.isInteger(M * 100) ? '=' : '\\approx'} ${s5Num(Math.round(M * 100) / 100).replace(',', '{,}')}</span></div>`;
  } else h += '<p class="hint" style="text-align:center;">Le caractère est qualitatif : on ne peut pas calculer de moyenne.</p>';
  out.innerHTML = h;
  renderStaticMath(out);
}

DEMO_REGISTRY['5e|Statistiques'] = {
  cours: 'cours-demo-statistiques-5e', methode: 'methode-demo-statistiques-5e', exos: 'exos-demo-statistiques-5e', histoire: 'histoire-demo-statistiques-5e',
  init: () => {
    s5FrequenceDemo.reset(); s5MoyenneDemo.reset(); s5BatonsReset(); s5SecteursReset(); s5Enquete();
    ['cours-demo-statistiques-5e', 'methode-demo-statistiques-5e', 'exos-demo-statistiques-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-statistiques-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-statistiques-5e'));
  }
};

DEMO_QUIZZES['5e|Statistiques'] = [
  { q: 'On étudie la couleur des yeux des élèves d\'une classe. Le caractère est...', opts: ['quantitatif', 'qualitatif'], correct: 1 },
  { q: 'Dans une série, la valeur 3 apparaît 7 fois. On dit que...', opts: ['la fréquence de 3 est 7', 'l\'effectif de 3 est 7', 'la moyenne est 7'], correct: 1 },
  { q: '6 élèves sur 30 viennent à vélo. La fréquence est...', opts: ['0,2', '0,6', '5'], correct: 0 },
  { q: 'Une fréquence de 0,45 correspond à...', opts: ['4,5 %', '45 %', '0,45 %'], correct: 1 },
  { q: 'La somme de toutes les fréquences d\'une série est égale à...', opts: ['l\'effectif total', '1', '100'], correct: 1 },
  { q: 'La moyenne de 8 ; 12 ; 13 est...', opts: ['11', '33', '12'], correct: 0 },
  { q: 'Dans un diagramme circulaire, une fréquence de 0,25 correspond à un angle de...', opts: ['25°', '90°', '180°'], correct: 1 },
];

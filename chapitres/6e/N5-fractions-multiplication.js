/* ============================================================
   CHAPITRE : Fractions : multiplication (6e, N5 -- chapitre n° 14 de la progression)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Fractions en 6e : Multiplications" (captures du manuel, paragraphe 3 du chapitre N5 :
   multiplier une fraction par un nombre entier -- trois méthodes --, calculer une fraction d'une
   quantité, appliquer un pourcentage). Titres reformulés, exemples nouveaux ; modèle en barre
   interactif et échelle de pourcentage dans l'onglet Méthode.
   ============================================================ */

const FM_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const FM_VERT = '#1E7B34', FM_VIOLET = '#9E1F5E', FM_ORANGE = '#E07B00', FM_ENCRE = '#1C1B2E';
const fmNum = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
const fmTex = v => fmNum(v).replace(',', '{,}');
function fmEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
// Modèle en barre : la quantité est partagée en d parts égales, n parts sont coloriées.
function fmBarre(n, d, total, unite, couleur){
  const W = 480, x0 = 10, w = (W - 20) / d, part = total / d;
  let h = `<text x="${W / 2}" y="14" text-anchor="middle" font-family="Inter" font-size="12" fill="#4E5665">${fmNum(total)} ${unite}</text>`
    + `<line x1="${x0}" y1="20" x2="${W - 10}" y2="20" stroke="#4E5665" stroke-width="1"/><line x1="${x0}" y1="16" x2="${x0}" y2="24" stroke="#4E5665"/><line x1="${W - 10}" y1="16" x2="${W - 10}" y2="24" stroke="#4E5665"/>`;
  for(let k = 0; k < d; k++){
    const on = k < n;
    h += `<rect x="${(x0 + k * w).toFixed(1)}" y="30" width="${w.toFixed(1)}" height="40" fill="${on ? (couleur || FM_VERT) : '#fff'}" fill-opacity="${on ? 0.8 : 1}" stroke="${FM_ENCRE}" stroke-width="1.3"/>`;
    if(d <= 12) h += `<text x="${(x0 + (k + 0.5) * w).toFixed(1)}" y="55" text-anchor="middle" font-family="JetBrains Mono" font-size="${d > 8 ? 10.5 : 12}" fill="${on ? '#fff' : FM_ENCRE}">${fmNum(part)}</text>`;
  }
  const xn = x0 + n * w;
  if(n > 0 && n <= d) h += `<line x1="${x0}" y1="80" x2="${xn.toFixed(1)}" y2="80" stroke="${couleur || FM_VERT}" stroke-width="1.4"/><line x1="${x0}" y1="76" x2="${x0}" y2="84" stroke="${couleur || FM_VERT}"/><line x1="${xn.toFixed(1)}" y1="76" x2="${xn.toFixed(1)}" y2="84" stroke="${couleur || FM_VERT}"/>`
    + `<text x="${x0}" y="98" text-anchor="start" font-family="Inter" font-size="12.5" font-weight="700" fill="${couleur || FM_VERT}">${n} × ${fmNum(part)} = ${fmNum(n * part)} ${unite}</text>`;
  return `<svg viewBox="0 0 ${W} 106" style="width:100%;max-width:520px;display:block;margin:6px auto 12px;">${h}</svg>`;
}

document.getElementById('cours-demo-fractions-mult-6e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Multiplier une fraction par un nombre entier</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour multiplier une fraction <span class="tex">\\dfrac{a}{b}</span> (avec <i>b</i> non nul) par un nombre entier <i>c</i>, on peut, au choix :
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin-top:8px;">
    <div style="background:#fff;border-radius:8px;padding:8px 10px;"><b>Méthode 1</b><br>calculer le quotient de <i>a</i> par <i>b</i>, puis multiplier le résultat par <i>c</i>.</div>
    <div style="background:#fff;border-radius:8px;padding:8px 10px;"><b>Méthode 2</b><br>calculer le produit de <i>a</i> par <i>c</i>, puis diviser le résultat par <i>b</i>.</div>
    <div style="background:#fff;border-radius:8px;padding:8px 10px;"><b>Méthode 3</b><br>calculer le quotient de <i>c</i> par <i>b</i>, puis multiplier le résultat par <i>a</i>.</div>
  </div>
</div>
<div class="redaction-note" ${FM_REM}>Remarque : quelle que soit la méthode, on divise toujours par le <b>dénominateur</b> de la fraction, et on multiplie par son <b>numérateur</b>.</div>
${fmEx('Exemple : calcule <span class="tex">\\dfrac{3}{4} \\times 36</span>.', [
  ['<span class="tex">\\dfrac{3}{4} \\times 36 = (3 \\div 4) \\times 36 = 0{,}75 \\times 36 = 27</span>', '<b>Méthode 1</b> : intéressante quand la fraction est un nombre décimal simple.'],
  ['<span class="tex">\\dfrac{3}{4} \\times 36 = \\dfrac{3 \\times 36}{4} = \\dfrac{108}{4} = 108 \\div 4 = 27</span>', '<b>Méthode 2</b> : elle marche toujours, mais les nombres deviennent grands.'],
  ['<span class="tex">\\dfrac{3}{4} \\times 36 = 3 \\times (36 \\div 4) = 3 \\times 9 = 27</span>', '<b>Méthode 3</b> : la plus rapide ici, car 36 ÷ 4 tombe juste.'],
])}
<div class="redaction-note" ${FM_REM}>Attention : le résultat n'est pas toujours un nombre décimal. Par exemple, <span class="tex">\\dfrac{2}{3} \\times 5 = \\dfrac{2 \\times 5}{3} = \\dfrac{10}{3}</span> : on garde alors l'écriture fractionnaire.</div>

<div class="lesson-header"><span class="num">2</span><h3>Prendre une fraction d'une quantité</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour calculer une fraction d'une quantité, on <b>multiplie la fraction par cette quantité</b>. « Les trois huitièmes de 240 », c'est <span class="tex">\\dfrac{3}{8} \\times 240</span>.</div>
<p class="example-title">Exemple : Léo a lu les trois huitièmes d'un livre de 240 pages. Combien de pages a-t-il lues ?</p>
${fmBarre(3, 8, 240, 'pages')}
${fmEx('', [
  ['<span class="tex">\\dfrac{3}{8} \\times 240 = 3 \\times (240 \\div 8) = 3 \\times 30 = 90</span>', 'On partage 240 en 8 parts de 30 pages, et on en prend 3 (méthode 3).'],
  ['Léo a lu 90 pages.', 'On conclut par une phrase.'],
])}

<div class="lesson-header"><span class="num">3</span><h3>Prendre un pourcentage d'une quantité</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour calculer <b><i>t</i> %</b> d'une quantité, on la multiplie par <span class="tex">\\dfrac{t}{100}</span> : « 30 % de 90 », c'est <span class="tex">\\dfrac{30}{100} \\times 90</span>.</div>
${fmEx('Exemple : calcule 30 % de 90 €.', [
  ['<span class="tex">\\dfrac{30}{100} \\times 90 = \\dfrac{30 \\times 90}{100} = \\dfrac{2\\,700}{100} = 27</span>', 'Méthode 2 : le plus simple ici, car diviser par 100 est facile.'],
  ['30 % de 90 € valent 27 €.', ''],
])}
<div class="redaction-note" ${FM_REM}>Remarque : <span class="tex">\\dfrac{30}{100} = 0{,}3</span>, donc on peut aussi calculer 0,3 × 90 = 27.</div>
<p style="margin:8px 0 4px;">On peut aussi utiliser une <b>échelle de pourcentage</b> : 90 € partagés en 10 parts de 10 % chacune, soit 9 € par part.</p>
${fmBarre(3, 10, 90, '€', FM_VIOLET).replace(/>(\d+) × 9 = 27 €</, '>3 parts de 10 % : 3 × 9 = 27 €<')}
<ul class="example-list"><li>10 % de 90 € correspondent à <span class="tex">\\dfrac{1}{10}</span> de 90 €, soit 9 € ; 30 %, c'est 3 fois plus : 27 €.</li></ul>
`;

document.getElementById('histoire-demo-fractions-mult-6e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Le mot « fraction » vient du latin <i>frangere</i>, qui signifie « briser » : une fraction, c'est un morceau d'un tout. Les Égyptiens de l'Antiquité utilisaient surtout des fractions de numérateur 1 (comme un tiers ou un cinquième) : pour écrire deux cinquièmes, ils l'exprimaient comme une somme de fractions de ce type, un tiers plus un quinzième. Le <b>papyrus Rhind</b> (vers 1650 avant J.-C.) contient même une table qui donne ces décompositions pour de nombreuses fractions, un peu comme une table de multiplication. Notre écriture avec une barre horizontale entre deux nombres s'est répandue en Europe au Moyen Âge, venue des mathématiciens arabes.
</div>
`;

document.getElementById('methode-demo-fractions-mult-6e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : voir une fraction d'une quantité avec une barre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez la fraction et la quantité : la barre se partage en parts égales et on colorie les parts prises.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">
    <label>Numérateur <input id="fm-n" type="number" min="0" max="12" value="2" oninput="fmBarreMaj()" style="width:60px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
    <label>Dénominateur <input id="fm-d" type="number" min="1" max="12" value="5" oninput="fmBarreMaj()" style="width:60px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
    <label>Quantité <input id="fm-q" type="number" min="0" step="any" value="35" oninput="fmBarreMaj()" style="width:80px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
  </div>
  <div id="fm-barre"></div>
  <div id="fm-calc" style="text-align:center;line-height:2.1;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : choisir la méthode la plus rapide</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On veut calculer <span class="tex">\\dfrac{5}{6} \\times 42</span> de tête. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="fm-methodeDisplay"></div>
  <div class="figure-toolbar"><button class="btn" onclick="fmMethodeDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="fmMethodeDemo.reset()">Recommencer</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : l'échelle de pourcentage</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">La quantité est partagée en 10 parts de 10 %. Choisissez le pourcentage avec le curseur.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">
    <label>Quantité <input id="fm-pq" type="number" min="0" step="any" value="60" oninput="fmPourcent()" style="width:80px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
    <label style="display:flex;align-items:center;gap:6px;">Pourcentage <input id="fm-pt" type="range" min="0" max="100" step="10" value="20" oninput="fmPourcent()"><b id="fm-ptVal" style="min-width:44px;"></b></label>
  </div>
  <div id="fm-pBarre"></div>
  <div id="fm-pCalc" style="text-align:center;line-height:2.1;"></div>
</div>
`;

function fmExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="fm-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="fm-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-fractions-mult-6e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une fraction d'une quantité »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Les trois quarts des 28 élèves de la classe sont demi-pensionnaires.</span><span class="we-comment">1. On repère la fraction et la quantité.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\dfrac{3}{4} \\times 28 = 3 \\times (28 \\div 4) = 3 \\times 7 = 21</span></span><span class="we-comment">2. On multiplie la fraction par la quantité (méthode 3 : 28 ÷ 4 tombe juste).</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">21 élèves sont demi-pensionnaires.</span><span class="we-comment">3. On conclut par une phrase.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${fmExo(1, 'Calcule <span class="tex">\\dfrac{2}{5} \\times 35</span> de trois façons différentes.', [
    'Méthode 1 : 0,4 × 35 = 14', 'Méthode 2 : (2 × 35) ÷ 5 = 70 ÷ 5 = 14', 'Méthode 3 : 2 × (35 ÷ 5) = 2 × 7 = 14'])}
  ${fmExo(2, 'Calcule, avec la méthode la plus rapide : <span class="tex">\\dfrac{5}{6} \\times 42</span> et <span class="tex">\\dfrac{7}{10} \\times 23</span>.', [
    '5 × (42 ÷ 6) = 5 × 7 = 35', '0,7 × 23 = 16,1 (méthode 1 : 7/10 = 0,7)'])}
  ${fmExo(3, 'Calcule <span class="tex">\\dfrac{4}{3} \\times 5</span>. Le résultat est-il un nombre décimal ?', [
    '<span class="tex">\\dfrac{4 \\times 5}{3} = \\dfrac{20}{3}</span>', 'Non : 20 ÷ 3 ne tombe pas juste, on garde l\'écriture 20/3.'])}
  ${fmExo(4, 'Un réservoir de 60 L est rempli aux deux tiers. Combien de litres contient-il ?', [
    '<span class="tex">\\dfrac{2}{3} \\times 60 = 2 \\times (60 \\div 3) = 2 \\times 20 = 40</span>', 'Le réservoir contient 40 L.'])}
  ${fmExo(5, 'Dans un collège de 540 élèves, les cinq neuvièmes sont des filles. Combien y a-t-il de filles ?', [
    '5 × (540 ÷ 9) = 5 × 60 = 300', 'Il y a 300 filles.'])}
  ${fmExo(6, 'Calcule 25 % de 48 et 10 % de 350.', [
    '25 % de 48 : (25 × 48) ÷ 100 = 1 200 ÷ 100 = 12 (c\'est aussi le quart de 48)', '10 % de 350 : 350 ÷ 10 = 35'])}
  ${fmExo(7, 'Un pull coûte 40 €. Pendant les soldes, son prix baisse de 30 %. De combien baisse-t-il ? Quel est son nouveau prix ?', [
    '30 % de 40 € : 0,3 × 40 = 12 €', 'Nouveau prix : 40 − 12 = 28 €'])}
  ${fmExo(8, 'Emma dit : « Les trois quarts de 20, c\'est plus que les deux tiers de 18. » A-t-elle raison ?', [
    'Trois quarts de 20 : 3 × (20 ÷ 4) = 15', 'Deux tiers de 18 : 2 × (18 ÷ 3) = 12', 'Oui, 15 > 12 : elle a raison.'])}
</div>
`;

/* ---- Méthode 1 : barre interactive ---- */
function fmBarreMaj(){
  const d = Math.max(1, Math.min(12, Math.round(Number(document.getElementById('fm-d').value) || 1)));
  const n = Math.max(0, Math.min(d, Math.round(Number(document.getElementById('fm-n').value) || 0)));
  const q = Math.max(0, Number(String(document.getElementById('fm-q').value).replace(',', '.')) || 0);
  document.getElementById('fm-barre').innerHTML = fmBarre(n, d, q, '');
  const part = q / d, res = n * q / d, dec = Math.abs(Math.round(part * 1000) / 1000 - part) < 1e-9;
  const calc = document.getElementById('fm-calc');
  calc.innerHTML = `<span class="tex">\\dfrac{${n}}{${d}} \\times ${fmTex(q)} = ${n} \\times (${fmTex(q)} \\div ${d}) ${dec ? '=' : '\\approx'} ${n} \\times ${fmTex(part)} ${dec ? '=' : '\\approx'} ${fmTex(res)}</span>`
    + (dec ? '' : `<br><span class="hint">${fmNum(q)} ÷ ${d} ne tombe pas juste : on peut écrire le résultat exact <span class="tex">\\dfrac{${fmTex(n * q)}}{${d}}</span>.</span>`)
    + (n > d ? '' : `<br><span class="hint">On partage ${fmNum(q)} en ${d} parts égales de ${fmNum(part)}${dec ? '' : ' environ'}, et on en prend ${n}.</span>`);
  renderStaticMath(calc);
}
/* ---- Méthode 2 : choisir la méthode ---- */
const FM_METHODE_STEPS = [
  { expr: '<span class="tex">\\dfrac{5}{6} \\times 42</span>', note: 'Quelle méthode choisir ? On regarde si 5 ÷ 6 ou 42 ÷ 6 tombe juste.' },
  { expr: 'Méthode 1 ? 5 ÷ 6 = 0,8333… : non', note: 'La fraction n\'est pas un nombre décimal : la méthode 1 ne convient pas.' },
  { expr: 'Méthode 2 ? 5 × 42 = 210, puis 210 ÷ 6 = 35', note: 'Elle marche, mais il faut diviser 210 par 6 : pas facile de tête.' },
  { expr: 'Méthode 3 ? 42 ÷ 6 = 7 : oui !', note: '42 est dans la table de 6 : la division tombe juste.' },
  { expr: '<span class="tex">\\dfrac{5}{6} \\times 42 = 5 \\times 7 = 35</span>', note: 'Avec la méthode 3, le calcul se fait de tête.' },
];
const fmMethodeDemo = makeStepDemo(FM_METHODE_STEPS, 'fm-methodeDisplay');
/* ---- Méthode 3 : échelle de pourcentage ---- */
function fmPourcent(){
  const t = Number(document.getElementById('fm-pt').value), q = Math.max(0, Number(String(document.getElementById('fm-pq').value).replace(',', '.')) || 0);
  document.getElementById('fm-ptVal').textContent = t + ' %';
  document.getElementById('fm-pBarre').innerHTML = fmBarre(t / 10, 10, q, '', FM_VIOLET);
  const c = document.getElementById('fm-pCalc');
  c.innerHTML = `10 % de ${fmNum(q)}, c'est <span class="tex">\\dfrac{1}{10}</span> de ${fmNum(q)} : ${fmNum(q / 10)}. &nbsp; Donc ${t} % de ${fmNum(q)} = ${t / 10} × ${fmNum(q / 10)} = <b>${fmNum(q * t / 100)}</b>`;
  renderStaticMath(c);
}

DEMO_REGISTRY['6e|Fractions : multiplication'] = {
  cours: 'cours-demo-fractions-mult-6e', methode: 'methode-demo-fractions-mult-6e', exos: 'exos-demo-fractions-mult-6e', histoire: 'histoire-demo-fractions-mult-6e',
  init: () => {
    fmBarreMaj(); fmMethodeDemo.reset(); fmPourcent();
    ['cours-demo-fractions-mult-6e', 'methode-demo-fractions-mult-6e', 'exos-demo-fractions-mult-6e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fractions-mult-6e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fractions-mult-6e'));
  }
};

DEMO_QUIZZES['6e|Fractions : multiplication'] = [
  { q: 'Que vaut 3/5 × 20 ?', opts: ['12', '15', '60'], correct: 0 },
  { q: 'Pour calculer 2/7 × 21 de tête, le plus rapide est de calculer d\'abord...', opts: ['2 ÷ 7', '21 ÷ 7', '2 × 21'], correct: 1 },
  { q: 'Les trois quarts de 40, c\'est...', opts: ['30', '10', '120'], correct: 0 },
  { q: '2/3 × 4 est égal à...', opts: ['8/3', '8/12', '6/3'], correct: 0 },
  { q: '20 % de 50, c\'est...', opts: ['10', '20', '2,5'], correct: 0 },
  { q: 'Pour calculer t % d\'une quantité, on la multiplie par...', opts: ['t', 't/100', '100/t'], correct: 1 },
  { q: 'Dans une fraction multipliée par un nombre, on divise toujours par...', opts: ['le numérateur', 'le dénominateur', '100'], correct: 1 },
];

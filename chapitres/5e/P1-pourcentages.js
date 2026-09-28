/* ============================================================
   CHAPITRE : Pourcentages (5e, P1 -- chapitre n° 13 de la progression)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Chapitre très court : pourcentages en 5e" (capture du manuel, paragraphe
   « Pourcentage » : appliquer un pourcentage, déterminer un pourcentage). Titres reformulés,
   exemples nouveaux ; grille de 100 cases interactive dans l'onglet Méthode.
   ============================================================ */

const PC_REM = 'style="background:rgba(31,58,92,.07);border-color:rgba(31,58,92,.25);color:#12253A;"';
const pcNum = v => String(Math.round(v * 1000) / 1000).replace('.', ',');
function pcEx(titre, lignes){
  return `${titre ? `<p class="example-title">${titre}</p>` : ''}<div class="redaction-template" style="margin:0 0 16px;">${lignes.map(([e, c]) =>
    `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${e}</span>${c ? `<span class="we-comment">${c}</span>` : ''}</div>`).join('')}</div>`;
}
function pcTab(lignes){
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 16px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.95rem;">${lignes.map(l => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:6px 12px;text-align:center;${j === 0 ? 'background:#F4F5F8;font-weight:700;text-align:left;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
// Grille de 100 cases : p cases colorées (p peut être décimal : la dernière case est colorée en partie).
function pcGrille(p, couleur){
  let h = '';
  for(let k = 0; k < 100; k++){
    const x = 4 + (k % 10) * 22, y = 4 + Math.floor(k / 10) * 22, f = Math.max(0, Math.min(1, p - k));
    h += `<rect x="${x}" y="${y}" width="20" height="20" rx="3" fill="#F4F5F8" stroke="#D9DEE6"/>`;
    if(f > 0) h += `<rect x="${x}" y="${y}" width="${(20 * f).toFixed(1)}" height="20" rx="3" fill="${couleur || '#0C5BA0'}"/>`;
  }
  return `<svg viewBox="0 0 226 226" style="width:100%;max-width:230px;display:block;margin:8px auto;">${h}</svg>`;
}

document.getElementById('cours-demo-pourcentages-5e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Prendre un pourcentage d'une quantité</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Prendre <b><i>t</i> %</b> d'un nombre, c'est le multiplier par <span class="tex">\\dfrac{t}{100}</span>.</div>
<div style="display:flex;flex-wrap:wrap;gap:18px;align-items:center;justify-content:center;margin:6px 0 10px;">
  <div style="flex:none;width:190px;">${pcGrille(30)}</div>
  <p style="margin:0;max-width:340px;line-height:1.6;">« 30 % » signifie « 30 <b>pour cent</b> » : 30 parts sur 100. Sur la grille de 100 cases, 30 cases sont coloriées.</p>
</div>
${pcEx('Exemple 1 : calculer 30 % de 260.', [
  ['<span class="tex">260 \\times \\dfrac{30}{100}</span>', 'On multiplie 260 par 30/100.'],
  ['= 260 × 0,3', '30/100 = 0,3.'],
  ['= 78', '30 % de 260, c\'est 78.'],
])}
${pcEx('Exemple 2 : pendant les soldes, un pull à 45 € est réduit de 20 %. Quel est son nouveau prix ?', [
  ['<span class="tex">45 \\times \\dfrac{20}{100} = 45 \\times 0{,}2 = 9</span>', 'On calcule le montant de la réduction : 20 % de 45 €.'],
  ['45 − 9 = 36', 'On retire la réduction au prix de départ.'],
  ['Le pull coûte 36 € pendant les soldes.', 'On conclut par une phrase.'],
])}
<span class="prop-badge">À connaître</span>
<div class="def-box">Certains pourcentages se calculent de tête :</div>
${pcTab([
  ['Pourcentage', '50 %', '25 %', '75 %', '10 %', '1 %'],
  ['Fraction', '<span class="tex">\\dfrac{1}{2}</span>', '<span class="tex">\\dfrac{1}{4}</span>', '<span class="tex">\\dfrac{3}{4}</span>', '<span class="tex">\\dfrac{1}{10}</span>', '<span class="tex">\\dfrac{1}{100}</span>'],
  ['On prend…', 'la moitié', 'le quart', 'les trois quarts', 'le dixième', 'le centième'],
])}
<p class="example-title">Exemple :</p>
<ul class="example-list"><li>25 % de 64, c'est le quart de 64 : 64 ÷ 4 = 16.</li></ul>

<div class="lesson-header"><span class="num">2</span><h3>Exprimer une proportion en pourcentage</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Déterminer un pourcentage, c'est écrire une proportion sous la forme d'une <b>fraction de dénominateur 100</b> :
  <div style="text-align:center;margin:8px 0 2px;"><span class="tex">\\text{pourcentage} = \\dfrac{\\text{partie}}{\\text{total}} \\times 100</span></div>
</div>
${pcEx('Exemple 1 : dans un club de 250 adhérents, 90 sont mineurs. Quel pourcentage des adhérents est mineur ?', [
  ['<span class="tex">\\dfrac{90}{250} = 0{,}36</span>', 'On écrit la proportion (partie sur total), puis on divise.'],
  ['<span class="tex">0{,}36 = \\dfrac{36}{100} = 36\\ \\%</span>', 'On l\'écrit avec le dénominateur 100.'],
  ['36 % des adhérents sont mineurs.', 'On conclut par une phrase.'],
])}
<p class="example-title">Exemple 2 : avec un tableau de proportionnalité.</p>
<p style="margin:4px 0;">Le pourcentage est l'effectif qu'on aurait si le total était 100 :</p>
${pcTab([['Adhérents mineurs', '90', '<b>?</b>'], ['Total des adhérents', '250', '100']])}
<ul class="example-list"><li>Le coefficient pour passer de 250 à 100 est 100 ÷ 250 = 0,4, donc ? = 90 × 0,4 = <b>36</b> : on retrouve 36 %.</li></ul>
${pcEx('Exemple 3 : Nina a réussi 12 exercices sur 20.', [
  ['<span class="tex">\\dfrac{12}{20} = \\dfrac{12 \\times 5}{20 \\times 5} = \\dfrac{60}{100}</span>', 'Ici, on obtient directement le dénominateur 100 en multipliant par 5.'],
  ['Nina a réussi 60 % des exercices.', ''],
])}
<div class="redaction-note" ${PC_REM}>Remarque : un pourcentage d'une partie est toujours compris entre 0 % (personne) et 100 % (tout le monde).</div>
`;

document.getElementById('histoire-demo-pourcentages-5e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Calculer « sur cent » est une vieille habitude : l'empereur romain <b>Auguste</b> avait créé une taxe, la <i>centesima rerum venalium</i>, qui prélevait un centième du prix des marchandises vendues aux enchères, soit 1 %. Au Moyen Âge, les marchands et banquiers italiens calculaient leurs intérêts « per cento », c'est-à-dire « pour cent ». À force d'être abrégé à la main (« p cento », « p c° »…), ce mot se serait peu à peu transformé en un petit signe : notre symbole <b>%</b>, qui garde la trace du « 0 » et du « c » de <i>cento</i>.
</div>
`;

document.getElementById('methode-demo-pourcentages-5e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : calculer un pourcentage d'un nombre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un pourcentage et un nombre : la grille de 100 cases se colorie et le calcul s'écrit.</p>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:8px 10px;align-items:center;max-width:460px;margin:0 auto;">
    <label for="pc-t" style="font-weight:700;">Pourcentage</label><input id="pc-t" type="range" min="0" max="100" value="15" oninput="pcCalculer()"><span id="pc-tVal" style="font-family:'JetBrains Mono',monospace;min-width:48px;text-align:right;"></span>
    <label for="pc-n" style="font-weight:700;">Nombre</label><input id="pc-n" type="number" value="80" min="0" step="any" oninput="pcCalculer()" style="padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"><span></span>
  </div>
  <div id="pc-grille"></div>
  <div id="pc-calcul" style="text-align:center;font-size:1.05rem;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : déterminer un pourcentage</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Donnez la partie et le total : le pourcentage se calcule, avec la grille correspondante.</p>
  <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;">
    <label>Partie <input id="pc-partie" type="number" value="21" min="0" step="any" oninput="pcDeterminer()" style="width:90px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
    <label>sur un total de <input id="pc-total" type="number" value="28" min="0" step="any" oninput="pcDeterminer()" style="width:90px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;"></label>
  </div>
  <div id="pc-grille2"></div>
  <div id="pc-det" style="text-align:center;font-size:1.05rem;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer de tête à partir de 10 %</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On veut 15 % de 340, sans calculatrice. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="pc-teteDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pcTeteDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pcTeteDemo.reset()">Recommencer</button>
  </div>
</div>
`;

function pcExo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pc-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pc-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-pourcentages-5e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Déterminer un pourcentage »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Dans une classe de 25 élèves, 9 portent des lunettes.</span><span class="we-comment">1. On repère la partie et le total.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;"><span class="tex">\\dfrac{9}{25} = \\dfrac{9 \\times 4}{25 \\times 4} = \\dfrac{36}{100}</span></span><span class="we-comment">2. On écrit la proportion avec le dénominateur 100.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">36 % des élèves portent des lunettes.</span><span class="we-comment">3. On conclut par une phrase.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pcExo(1, 'Calcule : a) 20 % de 150 ; b) 75 % de 48 ; c) 12 % de 250.', [
    'a) 150 × 0,2 = 30', 'b) 75 % = les trois quarts : 48 ÷ 4 × 3 = 36', 'c) 250 × 0,12 = 30'])}
  ${pcExo(2, 'Calcule de tête : 50 % de 86 ; 25 % de 120 ; 10 % de 4 500 ; 1 % de 700.', [
    'La moitié de 86 : 43', 'Le quart de 120 : 30', 'Le dixième de 4 500 : 450', 'Le centième de 700 : 7'])}
  ${pcExo(3, 'Un vélo coûte 240 €. Pendant les soldes, son prix baisse de 15 %. Calcule le montant de la réduction, puis le nouveau prix.', [
    'Réduction : 240 × 0,15 = 36 €', 'Nouveau prix : 240 − 36 = 204 €'])}
  ${pcExo(4, 'Dans un sachet de 400 g de céréales, il y a 60 g de sucre. Quel est le pourcentage de sucre ?', [
    '60 ÷ 400 = 0,15 = 15/100', 'Ces céréales contiennent 15 % de sucre.'])}
  ${pcExo(5, 'Un collège compte 640 élèves, dont 45 % sont demi-pensionnaires. Combien d\'élèves sont demi-pensionnaires ? Combien ne le sont pas ?', [
    '640 × 0,45 = 288 élèves sont demi-pensionnaires.', '640 − 288 = 352 élèves ne le sont pas (soit 55 %).'])}
  ${pcExo(6, 'Lors d\'un match, une basketteuse a réussi 14 tirs sur 20. Quel est son pourcentage de réussite ?', [
    '<span class="tex">\\dfrac{14}{20} = \\dfrac{70}{100}</span>', 'Elle a réussi 70 % de ses tirs.'])}
  ${pcExo(7, 'Complète le tableau de proportionnalité pour trouver quel pourcentage représentent 27 filles sur 60 élèves.', [
    'Filles : 27 → ? ; Total : 60 → 100', 'Coefficient : 100 ÷ 60 ; ? = 27 × 100 ÷ 60 = 45', 'Les filles représentent 45 % des élèves.'])}
  ${pcExo(8, 'Tom affirme : « 10 % de 80, c\'est la même chose que 80 % de 10 ». A-t-il raison ?', [
    '10 % de 80 = 80 × 0,1 = 8 et 80 % de 10 = 10 × 0,8 = 8.', 'Oui, il a raison : dans les deux cas, on calcule 80 × 10 ÷ 100.'])}
</div>
`;

/* ---- Méthodes interactives ---- */
function pcCalculer(){
  const t = Number(document.getElementById('pc-t').value), n = Number(String(document.getElementById('pc-n').value).replace(',', '.')) || 0;
  document.getElementById('pc-tVal').textContent = t + ' %';
  document.getElementById('pc-grille').innerHTML = pcGrille(t);
  const out = document.getElementById('pc-calcul'), r = n * t / 100;
  out.innerHTML = `<span class="tex">${t}\\ \\%\\ \\text{de}\\ ${pcNum(n).replace(',', '{,}')} = ${pcNum(n).replace(',', '{,}')} \\times \\dfrac{${t}}{100} = ${pcNum(r).replace(',', '{,}')}</span>`;
  renderStaticMath(out);
}
function pcDeterminer(){
  const a = Number(String(document.getElementById('pc-partie').value).replace(',', '.')), b = Number(String(document.getElementById('pc-total').value).replace(',', '.'));
  const out = document.getElementById('pc-det'), g = document.getElementById('pc-grille2');
  if(!(b > 0) || !(a >= 0) || a > b){ g.innerHTML = pcGrille(0); out.innerHTML = '<span class="hint">La partie doit être comprise entre 0 et le total (non nul).</span>'; return; }
  const p = a / b * 100, arr = Math.round(p * 10) / 10, exact = Math.abs(arr - p) < 1e-9;
  g.innerHTML = pcGrille(p, '#1E7B34');
  out.innerHTML = `<span class="tex">\\dfrac{${pcNum(a).replace(',', '{,}')}}{${pcNum(b).replace(',', '{,}')}} \\times 100 ${exact ? '=' : '\\approx'} ${pcNum(arr).replace(',', '{,}')}\\ \\%</span>`;
  renderStaticMath(out);
}
const PC_TETE_STEPS = [
  { expr: '10 % de 340 = 34', note: '10 %, c\'est le dixième : on divise par 10.' },
  { expr: '5 % de 340 = 34 ÷ 2 = 17', note: '5 %, c\'est la moitié de 10 %.' },
  { expr: '15 % = 10 % + 5 %', note: 'On décompose 15 % à l\'aide des pourcentages faciles.' },
  { expr: '15 % de 340 = 34 + 17 = 51', note: 'On additionne : 15 % de 340, c\'est 51. (Vérification : 340 × 0,15 = 51.)' },
];
const pcTeteDemo = makeStepDemo(PC_TETE_STEPS, 'pc-teteDisplay');

DEMO_REGISTRY['5e|Pourcentages'] = {
  cours: 'cours-demo-pourcentages-5e', methode: 'methode-demo-pourcentages-5e', exos: 'exos-demo-pourcentages-5e', histoire: 'histoire-demo-pourcentages-5e',
  init: () => {
    pcCalculer(); pcDeterminer(); pcTeteDemo.reset();
    ['cours-demo-pourcentages-5e', 'exos-demo-pourcentages-5e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-pourcentages-5e'));
    injectCourseAddButtons(document.getElementById('methode-demo-pourcentages-5e'));
  }
};

DEMO_QUIZZES['5e|Pourcentages'] = [
  { q: '30 % de 200, c\'est...', opts: ['60', '30', '6'], correct: 0 },
  { q: 'Prendre 25 % d\'un nombre, c\'est prendre...', opts: ['la moitié', 'le quart', 'le dixième'], correct: 1 },
  { q: '10 % de 350, c\'est...', opts: ['3,5', '35', '350'], correct: 1 },
  { q: '18 élèves sur 30 sont des filles. Cela représente...', opts: ['18 %', '60 %', '30 %'], correct: 1 },
  { q: 'Un jeu à 50 € est réduit de 10 %. Il coûte alors...', opts: ['40 €', '45 €', '49 €'], correct: 1 },
  { q: '3/4 correspond à...', opts: ['34 %', '75 %', '43 %'], correct: 1 },
  { q: 'Pour calculer 7 % d\'un nombre, on le multiplie par...', opts: ['7', '0,7', '0,07'], correct: 2 },
];

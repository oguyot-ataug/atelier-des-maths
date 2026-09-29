/* ============================================================
   CHAPITRE : Équations (4e, N7)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 63-64 : notion d'équation, solution, technique de résolution
   (propriétés 1, 2, 3), vérification, résolution de problème). Plan du manuel, titres reformulés,
   exemples nouveaux ; le chapitre de 5e utilise déjà la balance : ici, un solveur rédigé, un curseur
   pour tester des valeurs, une mise en équation et un jeu. Utilise r4Ex / R4_REM / R4_BLEU de
   chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const EQ4_BLEU = '#0C5BA0', EQ4_ORANGE = '#E07B00', EQ4_VERT = '#1E7B34', EQ4_ENCRE = '#1C1B2E', EQ4_ROUGE = '#C0392B';
const eq4Tex = s => `<span class="tex"${s.length < 34 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const eq4Long = s => `<span style="display:block;max-width:100%;overflow-x:auto;overflow-y:hidden;position:relative;padding:4px 0;white-space:nowrap;">${eq4Tex(s)}</span>`;
// Opération appliquée aux deux membres, en couleur.
const eq4Op = s => `\\textcolor{${EQ4_VERT}}{${s}}`;

/* ---- Fractions exactes (les solutions ne sont pas toujours décimales) ---- */
const eq4Pg = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a || 1; };
function eq4F(n, d){ d = d == null ? 1 : d; if(d < 0){ n = -n; d = -d; } const g = eq4Pg(n, d); return { n: n / g, d: d / g }; }
const eq4Add = (a, b) => eq4F(a.n * b.d + b.n * a.d, a.d * b.d), eq4Sub = (a, b) => eq4F(a.n * b.d - b.n * a.d, a.d * b.d);
const eq4Mul = (a, b) => eq4F(a.n * b.n, a.d * b.d), eq4Div = (a, b) => eq4F(a.n * b.d, a.d * b.n);
const eq4Nul = a => a.n === 0;
// Décimal exact si le dénominateur ne contient que des 2 et des 5.
function eq4Dec(f){ let d = f.d; while(d % 2 === 0) d /= 2; while(d % 5 === 0) d /= 5; return d === 1 ? String(f.n / f.d).replace('.', ',') : null; }
function eq4TexF(f){ if(f.d === 1) return String(f.n); const dec = eq4Dec(f); if(dec && dec.length <= 6) return dec.replace(',', '{,}'); return (f.n < 0 ? '-' : '') + `\\dfrac{${Math.abs(f.n)}}{${f.d}}`; }
// Nombre décimal saisi → fraction exacte.
function eq4Lire(txt){ const t = String(txt).replace(',', '.'); if(!/^[+-]?\d+(\.\d+)?$/.test(t)) return null; const k = (t.split('.')[1] || '').length, p = Math.pow(10, k); return eq4F(Math.round(Number(t) * p), p); }
// Un membre « 3x − 5 + x/2 » → { a (coefficient de x), b (constante) } ; null si non compris.
function eq4Membre(txt, lettre){
  const s = String(txt).replace(/\s/g, '').replace(/−/g, '-').replace(/×/g, '').replace(/,/g, '.');
  if(!s || /[+-]{2}/.test(s) || /[+-]$/.test(s)) return null;
  let a = eq4F(0), b = eq4F(0);
  for(const m of s.match(/[+-]?[^+-]+/g) || []){
    const r = m.match(/^([+-]?)(\d+(?:\.\d+)?)?([a-z])?(?:\/(\d+(?:\.\d+)?))?$/);
    if(!r || (!r[2] && !r[3])) return null;
    if(r[3]){ if(lettre.v && lettre.v !== r[3]) return null; lettre.v = r[3]; }
    let c = r[2] ? eq4Lire(r[2]) : eq4F(1); if(!c) return null;
    if(r[1] === '-') c = eq4F(-c.n, c.d);
    if(r[4]){ const q = eq4Lire(r[4]); if(!q || eq4Nul(q)) return null; c = eq4Div(c, q); }
    if(r[3]) a = eq4Add(a, c); else b = eq4Add(b, c);
  }
  return { a, b };
}
// Écriture « ax + b » en LaTeX.
function eq4Ecr(a, b, x){
  let s = '';
  if(!eq4Nul(a)){ s = a.n === a.d ? x : (a.n === -a.d ? '-' + x : eq4TexF(a) + x); }
  if(!eq4Nul(b) || !s){ const t = eq4TexF(b); s += s ? (t.startsWith('-') ? ' - ' + t.slice(1) : ' + ' + t) : t; }
  return s;
}

document.getElementById('cours-demo-equations-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Qu'est-ce qu'une équation ?</h3></div>
<span class="def-badge">Définition 1</span>
<div class="def-box">Une <b>équation à une inconnue</b> est une <b>égalité</b> entre deux expressions littérales (ses deux <b>membres</b>) qui contiennent une ou plusieurs fois la même lettre, l'<b>inconnue</b>.</div>
<p class="example-title">Exemple 1 : l'égalité ${eq4Tex('5x + 3 = 28')} est une équation.</p>
<ul class="example-list">
  <li>Son <b>membre de gauche</b> est ${eq4Tex('\\textcolor{' + EQ4_BLEU + '}{5x + 3}')}, son <b>membre de droite</b> est ${eq4Tex('\\textcolor{' + EQ4_ORANGE + '}{28}')} ; ils sont séparés par le signe « = ».</li>
  <li>L'inconnue est notée <i>x</i> ; elle n'apparaît ici que dans le membre de gauche.</li>
</ul>
<span class="def-badge">Définition 2</span>
<div class="def-box"><b>Résoudre</b> une équation, c'est trouver <b>toutes</b> les valeurs de l'inconnue pour lesquelles l'égalité est vraie. Ces valeurs sont les <b>solutions</b> de l'équation.</div>
${r4Ex('Exemple 2 : on considère l\'équation ' + eq4Tex('2x - 7 = -13') + '.', [
  ['Pour <i>x</i> = 3 : ' + eq4Tex('2 \\times 3 - 7 = -1') + ', et −1 ≠ −13 : l\'égalité est fausse.', '3 n\'est pas solution.'],
  ['Pour <i>x</i> = −3 : ' + eq4Tex('2 \\times (-3) - 7 = -6 - 7 = -13') + ' : l\'égalité est vraie.', '−3 est solution.'],
  ['On admet que cette équation n\'a qu\'une seule solution : −3.', 'Tester des valeurs au hasard n\'est pas une méthode : il faut une technique de résolution.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Résoudre une équation</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Les règles pour isoler l'inconnue</h4></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Une égalité reste vraie quand on <b>ajoute</b> ou <b>soustrait</b> un même nombre aux deux membres.</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 18px;">
<div>${r4Ex('Exemple :', [
  [eq4Tex('x + 12 = 5'), ''],
  [eq4Tex('x + 12 ' + eq4Op('- 12') + ' = 5 ' + eq4Op('- 12')), 'On soustrait 12 aux deux membres.'],
  [eq4Tex('x = -7'), 'La solution est −7.'],
])}</div>
<div>${r4Ex('Exemple :', [
  [eq4Tex('x - 4{,}5 = 2'), ''],
  [eq4Tex('x - 4{,}5 ' + eq4Op('+ 4{,}5') + ' = 2 ' + eq4Op('+ 4{,}5')), 'On ajoute 4,5 aux deux membres.'],
  [eq4Tex('x = 6{,}5'), 'La solution est 6,5.'],
])}</div>
</div>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">Une égalité reste vraie quand on <b>multiplie</b> ou <b>divise</b> les deux membres par un même nombre <b>non nul</b>.</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0 18px;">
<div>${r4Ex('Exemple :', [
  [eq4Tex('6x = 21'), ''],
  [eq4Tex('\\dfrac{6x}{' + eq4Op('6') + '} = \\dfrac{21}{' + eq4Op('6') + '}'), 'On divise les deux membres par 6.'],
  [eq4Tex('x = 3{,}5'), 'La solution est 3,5.'],
])}</div>
<div>${r4Ex('Exemple :', [
  [eq4Tex('\\dfrac{x}{4} = -3'), ''],
  [eq4Tex('\\dfrac{x}{4} ' + eq4Op('\\times 4') + ' = -3 ' + eq4Op('\\times 4')), 'On multiplie les deux membres par 4.'],
  [eq4Tex('x = -12'), 'La solution est −12.'],
])}</div>
</div>
<span class="prop-badge">Propriété 3 (méthode)</span>
<div class="def-box">Pour résoudre une équation, on <b>isole l'inconnue</b> dans un membre en utilisant les deux propriétés précédentes : d'abord on ajoute ou on soustrait, <b>puis</b> on multiplie ou on divise.</div>
${r4Ex('Exemple 3 : résoudre ' + eq4Tex('-4x + 9 = 23') + '.', [
  [eq4Tex('-4x + 9 ' + eq4Op('- 9') + ' = 23 ' + eq4Op('- 9')), 'On soustrait 9 aux deux membres (propriété 1).'],
  [eq4Tex('-4x = 14'), 'On réduit.'],
  [eq4Tex('\\dfrac{-4x}{' + eq4Op('-4') + '} = \\dfrac{14}{' + eq4Op('-4') + '}'), 'On divise par −4 (propriété 2) : attention au signe !'],
  [eq4Tex('x = -3{,}5'), '14 ÷ (−4) = −3,5 : la solution est −3,5.'],
])}
<div class="redaction-note" ${R4_REM}>Vérification (toujours prudente !) : on remplace <i>x</i> par −3,5 dans le membre de gauche : ${eq4Tex('-4 \\times (-3{,}5) + 9 = 14 + 9 = 23')}. On obtient bien le membre de droite : −3,5 est la solution.</div>
${r4Ex('Exemple 4 : quand l\'inconnue est dans les deux membres, ' + eq4Tex('5x - 3 = 2x + 9') + '.', [
  [eq4Tex('5x - 3 ' + eq4Op('- 2x') + ' = 2x + 9 ' + eq4Op('- 2x')), 'On soustrait 2x aux deux membres : l\'inconnue ne reste qu\'à gauche.'],
  [eq4Tex('3x - 3 = 9'), 'On réduit.'],
  [eq4Tex('3x = 12') + ', donc ' + eq4Tex('x = 4'), 'On ajoute 3, puis on divise par 3. Vérification : 5 × 4 − 3 = 17 et 2 × 4 + 9 = 17.'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Résoudre un problème avec une équation</h4></div>
${r4Ex('Exemple : un rectangle a une largeur de <i>x</i> cm et une longueur de 5 cm de plus que sa largeur. Son périmètre est de 38 cm. Quelles sont ses dimensions ?', [
  ['On note <i>x</i> la largeur, en cm. La longueur est alors <i>x</i> + 5.', '1. On choisit l\'inconnue.'],
  [eq4Tex('2 \\times (x + 5) + 2 \\times x = 38') + ', soit ' + eq4Tex('4x + 10 = 38'), '2. On met le problème en équation, puis on développe et réduit.'],
  [eq4Tex('4x = 28') + ', donc ' + eq4Tex('x = 7'), '3. On résout l\'équation.'],
  ['Vérification : largeur 7 cm, longueur 12 cm, périmètre 2 × 12 + 2 × 7 = 38 cm.', '4. On vérifie avec l\'énoncé.'],
  ['Le rectangle mesure 12 cm sur 7 cm.', '5. On conclut par une phrase qui répond à la question.'],
])}
`;

document.getElementById('histoire-demo-equations-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Les équations sont parmi les plus vieux problèmes de mathématiques. Le <b>papyrus Rhind</b> (Égypte, vers 1650 avant J.-C.) pose déjà des « problèmes du tas » ; par exemple : « un tas et son septième font 19 ; quel est le tas ? » Avec nos notations, c'est ${eq4Tex('x + \\dfrac{x}{7} = 19')}, dont la solution est ${eq4Tex('\\dfrac{133}{8}')}, soit 16,625 : les scribes la trouvaient par une méthode de « fausse position ». Au 3e siècle, le Grec <b>Diophante</b> écrit les <i>Arithmétiques</i>, un recueil de problèmes à équations. Une célèbre énigme, gravée sur sa tombe selon la légende, permet de retrouver son âge : « Son enfance dura un sixième de sa vie, sa jeunesse un douzième ; il se maria après un septième de sa vie, et eut un fils cinq ans plus tard. Le fils vécut la moitié de l'âge de son père, qui mourut quatre ans après lui. » Mettez-la en équation : vous trouverez que Diophante a vécu <b>84 ans</b>. Enfin, vers 820, <b>Al-Khwârizmî</b> décrit à Bagdad les deux gestes que tu utilises : <i>al-jabr</i>, « faire passer » un terme d'un membre à l'autre, et <i>al-muqabala</i>, « équilibrer » en réduisant les termes semblables.
</div>
`;

document.getElementById('methode-demo-equations-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : tester des valeurs de l'inconnue</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez une équation, puis faites glisser le curseur : on calcule les deux membres pour la valeur de <i>x</i> choisie. Quand ils sont égaux, vous avez trouvé la solution !</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:8px 0;">
    <select id="eq4-tEq" onchange="eq4Test(true)" style="padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;font-size:1rem;"></select>
  </div>
  <svg id="eq4-tSvg" viewBox="0 0 520 150" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div style="display:flex;justify-content:center;align-items:center;gap:10px;"><label>x = <input id="eq4-tX" type="range" min="-10" max="10" step="0.5" value="0" style="width:240px;" oninput="eq4Test()"></label> <b id="eq4-tXa" style="font-family:'JetBrains Mono',monospace;min-width:48px;"></b></div>
  <div id="eq4-tRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : résoudre une équation, rédaction complète</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez une équation du premier degré, avec l'inconnue dans un ou deux membres (par exemple <b>−3x + 5 = 12</b>, <b>7x − 4 = 3x + 10</b>, <b>x/3 = 2,5</b>) : chaque opération est expliquée, puis la solution est vérifiée.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0;">
    <input id="eq4-sE" type="text" value="-3x + 5 = 12" style="width:260px;max-width:100%;padding:8px 10px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.05rem;" oninput="eq4Resoudre()">
  </div>
  <div id="eq4-sRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : mettre un problème en équation, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">« Léa, Tom et Sam ont 45 € à eux trois. Tom a 5 € de plus que Léa, et Sam a le double de Léa. Combien chacun a-t-il ? » Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="eq4-pbDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eq4PbDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eq4PbDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : le jeu « Je pense à un nombre »</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Retrouvez le nombre de départ : écrivez l'équation dans votre tête (ou sur votre cahier), résolvez-la, et proposez votre réponse.</p>
  <div id="eq4-jEnonce" style="text-align:center;font-size:1.1rem;margin:8px 0;"></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;">
    <input id="eq4-jRep" type="text" inputmode="decimal" placeholder="?" style="width:90px;padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-size:1.1rem;" onkeydown="if(event.key==='Enter') eq4JeuVerifier()">
    <button class="btn" onclick="eq4JeuVerifier()">Vérifier</button>
    <button class="btn secondary" onclick="eq4JeuSolution()">Voir la solution</button>
    <button class="btn secondary" onclick="eq4JeuNouveau()">Nouveau nombre</button>
  </div>
  <div id="eq4-jRes" style="margin-top:8px;min-height:2em;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function eq4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="eq4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="eq4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-equations-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Résoudre une équation et vérifier la solution »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${eq4Tex('7x - 4 = 3x + 10')}</span><span class="we-comment">L'inconnue est dans les deux membres.</span></div>
    <div class="we-row"><span class="we-expr">${eq4Tex('7x - 4 ' + eq4Op('- 3x') + ' = 3x + 10 ' + eq4Op('- 3x'))}</span><span class="we-comment">On soustrait 3x aux deux membres.</span></div>
    <div class="we-row"><span class="we-expr">${eq4Tex('4x - 4 = 10')}</span><span class="we-comment">On réduit.</span></div>
    <div class="we-row"><span class="we-expr">${eq4Tex('4x - 4 ' + eq4Op('+ 4') + ' = 10 ' + eq4Op('+ 4'))}</span><span class="we-comment">On ajoute 4 aux deux membres.</span></div>
    <div class="we-row"><span class="we-expr">${eq4Tex('4x = 14')}</span><span class="we-comment">On réduit.</span></div>
    <div class="we-row"><span class="we-expr">${eq4Tex('x = \\dfrac{14}{4} = 3{,}5')}</span><span class="we-comment">On divise les deux membres par 4.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Vérification : 7 × 3,5 − 4 = 20,5 et 3 × 3,5 + 10 = 20,5.</span><span class="we-comment">Les deux membres sont égaux.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">La solution de l'équation est 3,5.</span><span class="we-comment">On conclut.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${eq4Exo(1, 'Le nombre 4 est-il solution de l\'équation ' + eq4Tex('3x - 5 = 2x - 1') + ' ? Et le nombre −2 ?', [
    'Pour <i>x</i> = 4 : 3 × 4 − 5 = 7 et 2 × 4 − 1 = 7 : oui, 4 est solution.',
    'Pour <i>x</i> = −2 : 3 × (−2) − 5 = −11 et 2 × (−2) − 1 = −5 : non, −2 n\'est pas solution.'])}
  ${eq4Exo(2, 'Résous : ' + eq4Tex('x + 9 = 4') + ' ; ' + eq4Tex('x - 3{,}2 = 1{,}8') + ' ; ' + eq4Tex('7x = -42') + ' ; ' + eq4Tex('\\dfrac{x}{5} = 1{,}2') + '.', [
    eq4Tex('x = 4 - 9 = -5') + ' ; ' + eq4Tex('x = 1{,}8 + 3{,}2 = 5') + ' ; ' + eq4Tex('x = -42 \\div 7 = -6') + ' ; ' + eq4Tex('x = 1{,}2 \\times 5 = 6') + '.'])}
  ${eq4Exo(3, 'Résous : ' + eq4Tex('2x + 7 = 19') + ' ; ' + eq4Tex('-5x + 3 = 23') + ' ; ' + eq4Tex('4 - 3x = 13') + '.', [
    eq4Tex('2x = 12') + ', ' + eq4Tex('x = 6') + ' ; ' + eq4Tex('-5x = 20') + ', ' + eq4Tex('x = -4') + ' ; ' + eq4Tex('-3x = 9') + ', ' + eq4Tex('x = -3') + '.'])}
  ${eq4Exo(4, 'Résous et donne la solution sous forme de fraction : ' + eq4Tex('6x - 1 = 3') + ' ; ' + eq4Tex('-9x + 2 = 7') + '.', [
    eq4Tex('6x = 4') + ', donc ' + eq4Tex('x = \\dfrac{4}{6} = \\dfrac{2}{3}') + ' ; ' + eq4Tex('-9x = 5') + ', donc ' + eq4Tex('x = -\\dfrac{5}{9}') + '.'])}
  ${eq4Exo(5, 'Résous : ' + eq4Tex('8x - 5 = 3x + 20') + ' ; ' + eq4Tex('2x + 11 = 7x - 4') + '.', [
    eq4Tex('5x - 5 = 20') + ', ' + eq4Tex('5x = 25') + ', ' + eq4Tex('x = 5') + ' ; ' + eq4Tex('11 = 5x - 4') + ', ' + eq4Tex('15 = 5x') + ', ' + eq4Tex('x = 3') + '.'])}
  ${eq4Exo(6, 'Résous ' + eq4Tex('3(x + 4) = 2x - 1') + ' (commence par développer).', [
    eq4Tex('3x + 12 = 2x - 1') + ', donc ' + eq4Tex('x + 12 = -1') + ' et ' + eq4Tex('x = -13') + '.',
    'Vérification : 3 × (−13 + 4) = −27 et 2 × (−13) − 1 = −27.'])}
  ${eq4Exo(7, 'Un triangle équilatéral a des côtés de longueur <i>x</i> + 1 (en cm), et un carré des côtés de longueur <i>x</i>. Ils ont le même périmètre. Trouve <i>x</i>.', [
    'Périmètre du triangle : ' + eq4Tex('3(x + 1) = 3x + 3') + ' ; périmètre du carré : ' + eq4Tex('4x') + '.',
    eq4Tex('3x + 3 = 4x') + ', donc ' + eq4Tex('x = 3') + ' : le triangle a des côtés de 4 cm, le carré de 3 cm, et leurs périmètres valent 12 cm.'])}
  ${eq4Exo(8, 'Dans un parc, un billet adulte coûte 12 € et un billet enfant 7 €. Une famille avec 2 adultes a payé 59 €. Combien d\'enfants y a-t-il ?', [
    'On note <i>x</i> le nombre d\'enfants : ' + eq4Tex('2 \\times 12 + 7x = 59') + ', soit ' + eq4Tex('24 + 7x = 59') + '.',
    eq4Tex('7x = 35') + ', donc ' + eq4Tex('x = 5') + ' : il y a <b>5 enfants</b>.'])}
</div>
`;

/* ---- Méthode 1 : tester des valeurs ---- */
const EQ4_TESTS = [
  ['3x + 4 = −11', 3, 4, 0, -11], ['2x − 7 = −13', 2, -7, 0, -13], ['−4x + 9 = 23', -4, 9, 0, 23],
  ['5x − 3 = 2x + 9', 5, -3, 2, 9], ['7x − 4 = 3x + 10', 7, -4, 3, 10],
];
function eq4Test(nouveau){
  const sel = document.getElementById('eq4-tEq');
  if(!sel.options.length) sel.innerHTML = EQ4_TESTS.map((e, i) => `<option value="${i}">${e[0]}</option>`).join('');
  if(nouveau) document.getElementById('eq4-tX').value = 0;
  const [nom, a, b, c, d] = EQ4_TESTS[Number(sel.value)], x = Number(document.getElementById('eq4-tX').value);
  const G = a * x + b, D = c * x + d, n = v => String(v).replace('.', ',').replace('-', '−');
  document.getElementById('eq4-tXa').textContent = n(x);
  // Droite graduée commune aux deux membres.
  const vals = [-10, 10].flatMap(t => [a * t + b, c * t + d]), mn = Math.min(...vals), mx = Math.max(...vals), X = v => 30 + (v - mn) / (mx - mn) * 460;
  let s = `<line x1="20" y1="80" x2="500" y2="80" stroke="${EQ4_ENCRE}" stroke-width="1.5"/>`;
  const pas = Math.pow(10, Math.floor(Math.log10((mx - mn) / 6))) * ([1, 2, 5].find(k => (mx - mn) / (k * Math.pow(10, Math.floor(Math.log10((mx - mn) / 6)))) <= 8) || 10);
  for(let v = Math.ceil(mn / pas) * pas; v <= mx; v += pas) s += `<line x1="${X(v)}" y1="75" x2="${X(v)}" y2="85" stroke="${EQ4_ENCRE}"/><text x="${X(v)}" y="100" text-anchor="middle" font-size="11" fill="#4E5665">${n(Math.round(v * 100) / 100)}</text>`;
  const egal = Math.abs(G - D) < 1e-9;
  s += `<circle cx="${X(G)}" cy="80" r="8" fill="${EQ4_BLEU}" opacity=".85"/><text x="${X(G)}" y="${egal ? 40 : 58}" text-anchor="middle" font-size="13" font-weight="700" fill="${EQ4_BLEU}">gauche : ${n(G)}</text>`;
  s += `<circle cx="${X(D)}" cy="80" r="8" fill="${EQ4_ORANGE}" opacity=".85"/><text x="${X(D)}" y="${egal ? 128 : 124}" text-anchor="middle" font-size="13" font-weight="700" fill="${EQ4_ORANGE}">droite : ${n(D)}</text>`;
  if(egal) s += `<circle cx="${X(G)}" cy="80" r="11" fill="${EQ4_VERT}"/><text x="${X(G)}" y="85" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">=</text>`;
  document.getElementById('eq4-tSvg').innerHTML = s;
  const [gTxt, dTxt] = nom.split('=').map(t => t.trim());
  document.getElementById('eq4-tRes').innerHTML = egal ? `<b style="color:${EQ4_VERT};">Les deux membres sont égaux (${n(G)}) : x = ${n(x)} est la solution de ${nom} !</b>` : `Pour x = ${n(x)} : ${gTxt} vaut <b style="color:${EQ4_BLEU};">${n(G)}</b> et ${dTxt} vaut <b style="color:${EQ4_ORANGE};">${n(D)}</b>. ${G < D ? 'Le membre de gauche est plus petit.' : 'Le membre de gauche est plus grand.'}`;
}

/* ---- Méthode 2 : solveur rédigé ---- */
function eq4Resoudre(){
  const out = document.getElementById('eq4-sRes'), brut = String(document.getElementById('eq4-sE').value);
  const err = t => { out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">${t}</p>`; };
  const cotes = brut.split('=');
  if(cotes.length !== 2) return err('Écrivez une équation avec un seul signe « = ».');
  const lettre = {}, G = eq4Membre(cotes[0], lettre), D = eq4Membre(cotes[1], lettre);
  if(!G || !D) return err('Écriture non comprise : utilisez des termes comme 3x, −x, 2,5, x/4 (sans parenthèses, sans x²).');
  if(!lettre.v) return err('Il manque l\'inconnue (une lettre, par exemple x).');
  const x = lettre.v, T = eq4TexF, lignes = [[eq4Tex(`${eq4Ecr(G.a, G.b, x)} = ${eq4Ecr(D.a, D.b, x)}`), 'L\'équation réduite.']];
  let a = G.a, b = G.b, c = D.a, d = D.b;
  // 1. L'inconnue d'un seul côté (à gauche).
  if(!eq4Nul(c)){
    const cx = c.n === c.d ? x : (c.n === -c.d ? '-' + x : T(c) + x), op = cx.startsWith('-') ? '+ ' + cx.slice(1) : '- ' + cx;
    lignes.push([eq4Long(`${eq4Ecr(a, b, x)} ${eq4Op(op)} = ${eq4Ecr(c, d, x)} ${eq4Op(op)}`), `On ${cx.startsWith('-') ? 'ajoute ' + cx.slice(1) : 'soustrait ' + cx} aux deux membres : l'inconnue ne reste que dans le membre de gauche.`]);
    a = eq4Sub(a, c); c = eq4F(0);
    lignes.push([eq4Tex(`${eq4Ecr(a, b, x)} = ${T(d)}`), 'On réduit.']);
  }
  if(eq4Nul(a)){
    const ok = b.n * d.d === d.n * b.d;
    lignes.push([ok ? 'L\'égalité est vraie pour toutes les valeurs de ' + x + '.' : `On obtient ${T(b)} = ${T(d)}, ce qui est faux.`, ok ? 'Tous les nombres sont solutions.' : 'L\'équation n\'a <b>aucune solution</b>.']);
    out.innerHTML = r4Ex('', lignes); renderStaticMath(out); return;
  }
  // 2. On isole le terme en x.
  if(!eq4Nul(b)){
    const op = b.n < 0 ? '+ ' + T(eq4F(-b.n, b.d)) : '- ' + T(b);
    lignes.push([eq4Tex(`${eq4Ecr(a, b, x)} ${eq4Op(op)} = ${T(d)} ${eq4Op(op)}`), `On ${b.n < 0 ? 'ajoute' : 'soustrait'} ${T(eq4F(Math.abs(b.n), b.d)).replace('{,}', ',')} aux deux membres.`]);
    d = eq4Sub(d, b); b = eq4F(0);
    lignes.push([eq4Tex(`${eq4Ecr(a, b, x)} = ${T(d)}`), 'On réduit.']);
  }
  // 3. On divise par le coefficient.
  const sol = eq4Div(d, a);
  if(a.n !== a.d){
    lignes.push([eq4Tex(`${x} = \\dfrac{${T(d)}}{${eq4Op(T(a))}}`), `On divise les deux membres par ${T(a).replace('{,}', ',')}${a.n < 0 ? ' (attention au signe)' : ''}.`]);
  }
  const dec = eq4Dec(sol);
  lignes.push([eq4Tex(`${x} = ${sol.d === 1 ? sol.n : (sol.n < 0 ? '-' : '') + `\\dfrac{${Math.abs(sol.n)}}{${sol.d}}`}${sol.d !== 1 && dec ? ' = ' + dec.replace(',', '{,}') : ''}`), sol.d !== 1 && !dec ? 'La solution n\'est pas un nombre décimal : on la laisse sous forme de fraction irréductible.' : 'C\'est la solution.']);
  // Vérification exacte.
  const vG = eq4Add(eq4Mul(G.a, sol), G.b), vD = eq4Add(eq4Mul(D.a, sol), D.b);
  lignes.push([`Vérification : le membre de gauche vaut ${eq4Tex(T(vG))} et le membre de droite ${eq4Tex(T(vD))}.`, vG.n === vD.n && vG.d === vD.d ? 'Les deux membres sont égaux : la solution est juste.' : 'Erreur !']);
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 3 : mise en équation ---- */
const EQ4_PB_STEPS = [
  { expr: 'On note x la somme de Léa, en euros.', note: '1. On choisit l\'inconnue : ici, ce qu\'a Léa, puisque les autres sommes s\'expriment à partir de la sienne.' },
  { expr: 'Tom : x + 5 ; Sam : 2x.', note: '2. On exprime les autres quantités en fonction de x.' },
  { expr: eq4Tex('x + (x + 5) + 2x = 45'), note: '3. On traduit la phrase « ils ont 45 € à eux trois » par une équation.' },
  { expr: eq4Tex('4x + 5 = 45'), note: 'On réduit le membre de gauche : x + x + 2x = 4x.' },
  { expr: eq4Tex('4x = 40') + ' donc ' + eq4Tex('x = 10'), note: '4. On résout : on soustrait 5, puis on divise par 4.' },
  { expr: 'Léa : 10 € ; Tom : 15 € ; Sam : 20 €. Vérification : 10 + 15 + 20 = 45.', note: '5. On revient à l\'énoncé, on vérifie, et on conclut par une phrase.' },
];
const eq4PbDemo = makeStepDemo(EQ4_PB_STEPS, 'eq4-pbDisplay');

/* ---- Méthode 4 : jeu ---- */
let eq4Jeu = null, eq4Score = { ok: 0, n: 0 };
function eq4JeuNouveau(){
  const a = 2 + Math.floor(Math.random() * 8); let b; do { b = Math.floor(Math.random() * 19) - 9; } while(b === 0);
  const x = Math.floor(Math.random() * 21) - 10, r = a * x + b;
  eq4Jeu = { a, b, x, r, fini: false };
  document.getElementById('eq4-jEnonce').innerHTML = `« Je pense à un nombre. Je le multiplie par <b>${a}</b>, puis ${b > 0 ? `j'ajoute <b>${b}</b>` : `je retranche <b>${-b}</b>`}. Je trouve <b>${String(r).replace('-', '−')}</b>. » Quel est mon nombre ?`;
  document.getElementById('eq4-jRep').value = ''; document.getElementById('eq4-jRes').innerHTML = eq4Score.n ? `Score : ${eq4Score.ok} / ${eq4Score.n}` : '';
}
function eq4JeuVerifier(){
  if(!eq4Jeu) eq4JeuNouveau();
  const v = Number(String(document.getElementById('eq4-jRep').value).replace(',', '.').replace('−', '-')), out = document.getElementById('eq4-jRes');
  if(!Number.isFinite(v) || document.getElementById('eq4-jRep').value.trim() === '') { out.innerHTML = 'Écrivez un nombre.'; return; }
  const ok = v === eq4Jeu.x;
  if(!eq4Jeu.fini){ eq4Score.n++; if(ok) eq4Score.ok++; eq4Jeu.fini = ok; }
  const calc = eq4Jeu.a * v + eq4Jeu.b;
  out.innerHTML = ok ? `<b style="color:${EQ4_VERT};">Bravo !</b> ${eq4Jeu.a} × ${v < 0 ? '(' + String(v).replace('-', '−') + ')' : v} ${eq4Jeu.b > 0 ? '+ ' + eq4Jeu.b : '− ' + (-eq4Jeu.b)} = ${String(eq4Jeu.r).replace('-', '−')}. Score : ${eq4Score.ok} / ${eq4Score.n}`
    : `<b style="color:${EQ4_ROUGE};">Pas tout à fait :</b> avec ${String(v).replace('.', ',').replace('-', '−')}, on trouve ${String(Math.round(calc * 100) / 100).replace('.', ',').replace('-', '−')} et non ${String(eq4Jeu.r).replace('-', '−')}. Réessayez ! Score : ${eq4Score.ok} / ${eq4Score.n}`;
}
function eq4JeuSolution(){
  if(!eq4Jeu) eq4JeuNouveau();
  const { a, b, x, r } = eq4Jeu, out = document.getElementById('eq4-jRes'), bT = b > 0 ? '+ ' + b : '- ' + (-b), op = b > 0 ? '- ' + b : '+ ' + (-b);
  out.innerHTML = r4Ex('', [
    [eq4Tex(`${a}x ${bT} = ${r}`), 'On note x le nombre de départ et on traduit l\'énoncé.'],
    [eq4Tex(`${a}x = ${r} ${op} = ${r - b}`), `On ${b > 0 ? 'soustrait ' + b : 'ajoute ' + (-b)} aux deux membres.`],
    [eq4Tex(`x = \\dfrac{${r - b}}{${a}} = ${x}`), `On divise par ${a}.`],
  ]);
  renderStaticMath(out);
  eq4Jeu.fini = true;
}

DEMO_REGISTRY['4e|Équations'] = {
  cours: 'cours-demo-equations-4e', methode: 'methode-demo-equations-4e', exos: 'exos-demo-equations-4e', histoire: 'histoire-demo-equations-4e',
  init: () => {
    eq4Test(true); eq4Resoudre(); eq4PbDemo.reset(); eq4JeuNouveau();
    ['cours-demo-equations-4e', 'exos-demo-equations-4e', 'histoire-demo-equations-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-equations-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-equations-4e'));
  }
};

DEMO_QUIZZES['4e|Équations'] = [
  { q: 'La solution de x + 7 = 3 est...', opts: ['10', '−4', '4'], correct: 1 },
  { q: 'La solution de 5x = −35 est...', opts: ['−7', '7', '−30'], correct: 0 },
  { q: 'La solution de 2x − 3 = 9 est...', opts: ['3', '6', '12'], correct: 1 },
  { q: 'Le nombre 2 est-il solution de 4x − 1 = 3x + 1 ?', opts: ['Oui', 'Non'], correct: 0 },
  { q: 'Pour résoudre −4x = 10, on...', opts: ['ajoute 4 aux deux membres', 'divise les deux membres par −4', 'multiplie les deux membres par 4'], correct: 1 },
  { q: 'La solution de x/3 = 5 est...', opts: ['15', '5/3', '8'], correct: 0 },
  { q: 'L\'équation 3x + 1 = 3x + 4...', opts: ['a pour solution 0', 'n\'a aucune solution', 'a pour solution 3'], correct: 1 },
];

/* ============================================================
   CHAPITRE : Calcul littéral (3e, N4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 20-21) : plan du manuel (réduire, supprimer des parenthèses,
   simple distributivité, double distributivité avec sa preuve et le modèle du rectangle,
   différence de deux carrés : développer et factoriser), titres reformulés, exemples nouveaux
   (différents du manuel ET du N6 de 4e, chapitres/4e/N6-calcul-litteral.js). Méthode animée : le
   rectangle découpé en quatre (double distributivité avec des nombres), un « développeur » de
   (ax + b)(cx + d) pour des coefficients au choix, le carré découpé et recollé qui prouve
   a² − b² = (a + b)(a − b), et le calcul mental avec la différence de deux carrés.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const CL3_BLEU = '#0C5BA0', CL3_ORANGE = '#E07B00', CL3_VERT = '#1E7B34', CL3_ROUGE = '#C0392B', CL3_VIOLET = '#7A3E9D', CL3_ENCRE = '#1C1B2E';
const cl3Tex = s => `<span class="tex"${s.length < 32 && !s.includes('frac') && !s.includes('brace') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const cl3C = (c, s) => `\\textcolor{${c}}{${s}}`;
// Monôme c·x^d en KaTeX, avec son signe (tete : premier terme, pas de « + » devant).
function cl3Mono(c, d, tete){
  if(c === 0) return '';
  const s = c < 0 ? '-' : (tete ? '' : '+'), a = Math.abs(c), lit = d === 0 ? '' : d === 1 ? 'x' : 'x^' + d;
  const nb = (a === 1 && d > 0) ? '' : String(a).replace('.', '{,}');
  return `${tete ? s : ' ' + s + ' '}${nb}${lit}`;
}
// Polynôme [c2, c1, c0] → texte KaTeX réduit, ordonné.
function cl3Poly(cs){ let t = '', tete = true; [[cs[0], 2], [cs[1], 1], [cs[2], 0]].forEach(([c, d]) => { if(c !== 0){ t += cl3Mono(c, d, tete); tete = false; } }); return t || '0'; }
// Facteur ax + b entre parenthèses (texte KaTeX).
const cl3Bin = (a, b) => `(${cl3Mono(a, 1, true)}${cl3Mono(b, 0, a === 0)})`;
// Produit c × (monôme) : écrit « 3x \times 5 », avec parenthèses autour des négatifs après le premier facteur.
const cl3Fact = (c, d) => { const m = cl3Mono(c, d, true); return c < 0 ? `(${m})` : m; };

document.getElementById('cours-demo-calcul-litteral-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Simplifier une expression</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Réduire une expression littérale</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Réduire</b> une expression littérale, c'est l'écrire sous la forme d'une somme comportant <b>le moins de termes possible</b>.</div>
${r4Ex('Exemples :', [
  [cl3Tex('A = 5x + 3 - 8x + 6'), ''],
  [cl3Tex('A = ' + cl3C(CL3_BLEU, '5x - 8x') + ' + ' + cl3C(CL3_ORANGE, '3 + 6')), 'On regroupe les termes de même nature.'],
  [cl3Tex('A = ' + cl3C(CL3_BLEU, '-3x') + ' + ' + cl3C(CL3_ORANGE, '9')), 'On calcule : (5 − 8)x = −3x.'],
])}
${r4Ex('', [
  [cl3Tex('B = 4x^2 - 3x + 1 - x^2 + 7x - 5'), ''],
  [cl3Tex('B = ' + cl3C(CL3_VIOLET, '4x^2 - x^2') + cl3C(CL3_BLEU, ' - 3x + 7x') + cl3C(CL3_ORANGE, ' + 1 - 5')), 'On regroupe les termes en x², en x, et les nombres.'],
  [cl3Tex('B = ' + cl3C(CL3_VIOLET, '(4 - 1)x^2') + cl3C(CL3_BLEU, ' + (-3 + 7)x') + cl3C(CL3_ORANGE, ' - 4')), 'On factorise les termes en x² et en x.'],
  [cl3Tex('B = ' + cl3C(CL3_VIOLET, '3x^2') + cl3C(CL3_BLEU, ' + 4x') + cl3C(CL3_ORANGE, ' - 4')), 'On simplifie.'],
])}
<div class="redaction-note" ${R4_REM}>Attention : ${cl3Tex('x^2')} et ${cl3Tex('x')} ne sont pas de même nature (${cl3Tex('3x^2 + 4x')} ne se réduit pas).</div>

<div class="sub-header"><span class="letter">B</span><h4>Supprimer des parenthèses</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">L'<b>opposé d'une somme algébrique</b> est égal à la somme des opposés de chacun de ses termes : pour supprimer des parenthèses précédées d'un signe « − », on change le signe de chaque terme à l'intérieur.</div>
${r4Ex('Exemple : supprimer les parenthèses dans ' + cl3Tex('C = 7x - (3x^2 - 2x + 5)') + '.', [
  [cl3Tex('C = 7x + (-3x^2) + (+2x) + (-5)'), 'On additionne les opposés.'],
  [cl3Tex('C = 7x - 3x^2 + 2x - 5'), 'On simplifie l\'écriture.'],
  [cl3Tex('C = -3x^2 + 9x - 5'), 'On réduit.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>La simple distributivité</h3></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres relatifs <i>k</i>, <i>a</i> et <i>b</i> :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.4;">${cl3Tex(cl3C(CL3_VERT, 'k') + ' \\times (a + b) = ' + cl3C(CL3_VERT, 'k') + ' \\times a + ' + cl3C(CL3_VERT, 'k') + ' \\times b')} &nbsp;&nbsp; et &nbsp;&nbsp; ${cl3Tex(cl3C(CL3_VERT, 'k') + ' \\times (a - b) = ' + cl3C(CL3_VERT, 'k') + ' \\times a - ' + cl3C(CL3_VERT, 'k') + ' \\times b')}</div></div>
<p class="example-title">Exemples : ${cl3Tex('5 \\times (20 + 3)')} se calcule de deux façons.</p>
<ul class="example-list">
  <li>${cl3Tex('5 \\times (20 + 3) = 5 \\times 23 = 115')} &nbsp; ou &nbsp; ${cl3Tex('5 \\times (20 + 3) = 5 \\times 20 + 5 \\times 3 = 100 + 15 = 115')}.</li>
  <li>Avec des lettres : ${cl3Tex('-4 \\times (x - 6) = -4 \\times x - (-4) \\times 6 = -4x + 24')} &nbsp; et &nbsp; ${cl3Tex('3x(2x + 5) = 6x^2 + 15x')}.</li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>La double distributivité</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour tous nombres relatifs <i>a</i>, <i>b</i>, <i>c</i> et <i>d</i> :
  <div style="text-align:center;margin:8px 0 2px;">${cl3Tex('(' + cl3C(CL3_BLEU, 'a') + ' + ' + cl3C(CL3_ORANGE, 'b') + ')(c + d) = ' + cl3C(CL3_BLEU, 'a') + 'c + ' + cl3C(CL3_BLEU, 'a') + 'd + ' + cl3C(CL3_ORANGE, 'b') + 'c + ' + cl3C(CL3_ORANGE, 'b') + 'd')}</div>
  <div style="display:flex;justify-content:center;">${cl3RectLettres()}</div></div>
<p class="example-title">Preuve :</p>
<ul class="example-list"><li>On pose ${cl3Tex('k = a + b')} et on applique deux fois la simple distributivité :
  <div style="margin:6px 0;">${cl3Tex('(a + b)(c + d) = k \\times (c + d) = k \\times c + k \\times d = (a + b) \\times c + (a + b) \\times d = ac + bc + ad + bd')}</div></li>
  <li>Avec les aires : l'aire du grand rectangle, ${cl3Tex('(a + b)(c + d)')}, est la somme des aires des quatre petits rectangles.</li></ul>
${r4Ex('Exemple 1 : développer et réduire ' + cl3Tex('D = (2x + 3)(x + 5)') + '.', [
  [cl3Tex('D = 2x \\times x + 2x \\times 5 + 3 \\times x + 3 \\times 5'), 'On applique la double distributivité (4 produits).'],
  [cl3Tex('D = 2x^2 + 10x + 3x + 15'), 'On calcule les produits.'],
  [cl3Tex('D = 2x^2 + 13x + 15'), 'On réduit.'],
])}
${r4Ex('Exemple 2 : développer et réduire ' + cl3Tex('E = (4 - x)(3x - 2)') + '.', [
  [cl3Tex('E = 4 \\times 3x + 4 \\times (-2) + (-x) \\times 3x + (-x) \\times (-2)'), 'Attention aux signes : on multiplie des nombres relatifs.'],
  [cl3Tex('E = 12x - 8 - 3x^2 + 2x'), 'On calcule les produits.'],
  [cl3Tex('E = -3x^2 + 14x - 8'), 'On réduit et on ordonne.'],
])}

<div class="lesson-header"><span class="num">4</span><h3>La différence de deux carrés</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour tous nombres relatifs <i>a</i> et <i>b</i> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:2.4;">
    <li>pour <b>développer</b> : ${cl3Tex('(a + b)(a - b) = a^2 - b^2')} ;</li>
    <li>pour <b>factoriser</b> : ${cl3Tex('a^2 - b^2 = (a + b)(a - b)')}.</li>
  </ul></div>
<p class="example-title">Preuve : avec la double distributivité, ${cl3Tex('(a + b)(a - b) = a^2 - ab + ba - b^2 = a^2 - b^2')} (les termes ${cl3Tex('-ab')} et ${cl3Tex('+ba')} s'annulent).</p>
${r4Ex('Exemple 1 : développer ' + cl3Tex('F = (5x + 3)(5x - 3)') + '.', [
  [cl3Tex('F = (' + cl3C(CL3_BLEU, '5x') + ' + ' + cl3C(CL3_ORANGE, '3') + ')(' + cl3C(CL3_BLEU, '5x') + ' - ' + cl3C(CL3_ORANGE, '3') + ')'), 'On reconnaît (a + b)(a − b) avec a = 5x et b = 3.'],
  [cl3Tex('F = (' + cl3C(CL3_BLEU, '5x') + ')^2 - ' + cl3C(CL3_ORANGE, '3') + '^2'), 'On remplace dans a² − b².'],
  [cl3Tex('F = 25x^2 - 9'), 'Attention : (5x)² = 5x × 5x = 25x².'],
])}
${r4Ex('Exemple 2 : factoriser ' + cl3Tex('G = 16x^2 - 81') + '.', [
  [cl3Tex('G = (' + cl3C(CL3_BLEU, '4x') + ')^2 - ' + cl3C(CL3_ORANGE, '9') + '^2'), 'On reconnaît une différence de deux carrés, avec a = 4x et b = 9.'],
  [cl3Tex('G = (' + cl3C(CL3_BLEU, '4x') + ' + ' + cl3C(CL3_ORANGE, '9') + ')(' + cl3C(CL3_BLEU, '4x') + ' - ' + cl3C(CL3_ORANGE, '9') + ')'), 'On remplace dans (a + b)(a − b).'],
])}
<div class="redaction-note" ${R4_REM}>Application au calcul mental : ${cl3Tex('102 \\times 98 = (100 + 2)(100 - 2) = 100^2 - 2^2 = 10\\,000 - 4 = 9\\,996')}.</div>
`;

// Rectangle (a + b) × (c + d) découpé en quatre, avec des lettres (cours).
function cl3RectLettres(){
  const X = 40, Y = 30, A = 110, B = 70, C = 70, D = 45;
  const r = (x, y, w, h, f, t) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="#fff" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 6}" text-anchor="middle" font-size="16" font-style="italic" font-weight="700" fill="${CL3_ENCRE}">${t}</text>`;
  return `<svg viewBox="0 0 ${X + A + B + 20} ${Y + C + D + 16}" style="width:100%;max-width:260px;margin:10px 0 4px;">`
    + r(X, Y, A, C, 'rgba(12,91,160,.25)', 'ac') + r(X + A, Y, B, C, 'rgba(224,123,0,.25)', 'bc') + r(X, Y + C, A, D, 'rgba(12,91,160,.14)', 'ad') + r(X + A, Y + C, B, D, 'rgba(224,123,0,.14)', 'bd')
    + `<text x="${X + A / 2}" y="${Y - 10}" text-anchor="middle" font-size="16" font-style="italic" font-weight="700" fill="${CL3_BLEU}">a</text><text x="${X + A + B / 2}" y="${Y - 10}" text-anchor="middle" font-size="16" font-style="italic" font-weight="700" fill="${CL3_ORANGE}">b</text>`
    + `<text x="${X - 14}" y="${Y + C / 2 + 6}" text-anchor="middle" font-size="16" font-style="italic" font-weight="700">c</text><text x="${X - 14}" y="${Y + C + D / 2 + 6}" text-anchor="middle" font-size="16" font-style="italic" font-weight="700">d</text></svg>`;
}

document.getElementById('histoire-demo-calcul-litteral-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Bien avant l'invention des lettres en mathématiques, les Grecs connaissaient déjà nos identités… sous forme de <b>figures</b> ! Dans le livre II de ses <i>Éléments</i> (vers 300 av. J.-C.), <b>Euclide</b> démontre avec des rectangles et des carrés découpés ce que nous écrivons aujourd'hui ${cl3Tex('(a + b)(c + d) = ac + ad + bc + bd')} ou ${cl3Tex('a^2 - b^2 = (a + b)(a - b)')}. Au 9e siècle, à Bagdad, <b>al-Khwârizmî</b> résout ses équations en faisant encore des dessins de carrés et de rectangles ; son livre, <i>Al-jabr</i>, a donné son nom à l'<b>algèbre</b>. Il faut attendre le Français <b>François Viète</b>, en 1591, pour que des lettres désignent systématiquement les nombres inconnus et les nombres donnés : c'est la naissance du calcul littéral tel que nous le pratiquons.
</div>
`;

document.getElementById('methode-demo-calcul-litteral-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : le rectangle de la double distributivité</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Réglez les longueurs : l'aire du grand rectangle, (a + b)(c + d), est toujours égale à la somme des quatre aires ac + ad + bc + bd.</p>
  <svg id="cl3-rectSvg" viewBox="0 0 420 300" style="width:100%;max-width:420px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto auto 1fr auto;gap:6px 10px;align-items:center;max-width:520px;margin:0 auto;">
    ${['a', 'b', 'c', 'd'].map((l, i) => `<label for="cl3-r${l}" style="font-weight:700;font-style:italic;">${l}</label><input id="cl3-r${l}" type="range" min="1" max="9" value="${[6, 3, 4, 2][i]}" oninput="cl3RectMaj()"><span id="cl3-r${l}V" style="font-family:'JetBrains Mono',monospace;"></span>`).join('')}
  </div>
  <div id="cl3-rectInfo" style="text-align:center;margin:10px 0 4px;line-height:2.2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : développer (ax + b)(cx + d), étape par étape</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez les nombres (entiers relatifs) puis cliquez sur « Étape suivante » : les quatre produits, puis la réduction.</p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;font-size:1.15rem;">
    (<input id="cl3-da" type="number" value="3" style="width:58px;text-align:center;font-size:1rem;padding:4px;border-radius:6px;border:1px solid #C9D6E6;" oninput="cl3DevDepart()"><i>x</i> +
    <input id="cl3-db" type="number" value="-2" style="width:58px;text-align:center;font-size:1rem;padding:4px;border-radius:6px;border:1px solid #C9D6E6;" oninput="cl3DevDepart()">)(<input id="cl3-dc" type="number" value="2" style="width:58px;text-align:center;font-size:1rem;padding:4px;border-radius:6px;border:1px solid #C9D6E6;" oninput="cl3DevDepart()"><i>x</i> +
    <input id="cl3-dd" type="number" value="5" style="width:58px;text-align:center;font-size:1rem;padding:4px;border-radius:6px;border:1px solid #C9D6E6;" oninput="cl3DevDepart()">)
  </div>
  <div class="step-display" id="cl3-devDisplay" style="min-height:4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cl3DevSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="cl3DevDepart()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : voir que a² − b² = (a + b)(a − b)</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">On retire un carré de côté b d'un carré de côté a, puis on découpe et on recolle ce qui reste : on obtient un rectangle de côtés a + b et a − b.</p>
  <svg id="cl3-carSvg" viewBox="0 0 460 290" style="width:100%;max-width:460px;display:block;margin:8px auto;"></svg>
  <div id="cl3-carNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cl3CarSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="cl3CarReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : calcul mental avec la différence de deux carrés</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Calculer ${cl3Tex('53 \\times 47')} de tête. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="cl3-mentalDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cl3MentalDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cl3MentalDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function cl3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="cl3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cl3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-calcul-litteral-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Développer et réduire avec la double distributivité »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${cl3Tex('H = (x - 4)(2x + 3)')}</span><span class="we-comment">L'expression à développer.</span></div>
    <div class="we-row"><span class="we-expr">${cl3Tex('H = x \\times 2x + x \\times 3 + (-4) \\times 2x + (-4) \\times 3')}</span><span class="we-comment">1. Chaque terme du 1er facteur multiplie chaque terme du 2d (4 produits).</span></div>
    <div class="we-row"><span class="we-expr">${cl3Tex('H = 2x^2 + 3x - 8x - 12')}</span><span class="we-comment">2. On calcule les produits (règle des signes).</span></div>
    <div class="we-row"><span class="we-expr">${cl3Tex('H = 2x^2 - 5x - 12')}</span><span class="we-comment">3. On réduit : termes en x², en x, nombres.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${cl3Exo(1, 'Réduis : ' + cl3Tex('A = 2x + 7 - 5x - 1') + ' ; ' + cl3Tex('B = x^2 + 3x - 4x^2 + x') + ' ; ' + cl3Tex('C = 6 - 2x + x^2 - 9 + 5x') + '.', [
    cl3Tex('A = -3x + 6'), cl3Tex('B = -3x^2 + 4x'), cl3Tex('C = x^2 + 3x - 3')])}
  ${cl3Exo(2, 'Supprime les parenthèses puis réduis : ' + cl3Tex('D = 4 - (x - 3)') + ' ; ' + cl3Tex('E = 2x + (5 - 3x)') + ' ; ' + cl3Tex('F = -(x^2 - x) + 2x^2') + '.', [
    cl3Tex('D = 4 - x + 3 = -x + 7'), cl3Tex('E = 2x + 5 - 3x = -x + 5'), cl3Tex('F = -x^2 + x + 2x^2 = x^2 + x')])}
  ${cl3Exo(3, 'Développe : ' + cl3Tex('G = 3(2x - 5)') + ' ; ' + cl3Tex('H = -2x(x + 4)') + ' ; ' + cl3Tex('K = 5x(3 - x)') + '.', [
    cl3Tex('G = 6x - 15'), cl3Tex('H = -2x^2 - 8x'), cl3Tex('K = 15x - 5x^2')])}
  ${cl3Exo(4, 'Développe et réduis : ' + cl3Tex('L = (x + 2)(x + 6)') + ' ; ' + cl3Tex('M = (3x - 1)(2x + 4)') + ' ; ' + cl3Tex('N = (5 - 2x)(x - 3)') + '.', [
    cl3Tex('L = x^2 + 6x + 2x + 12 = x^2 + 8x + 12'), cl3Tex('M = 6x^2 + 12x - 2x - 4 = 6x^2 + 10x - 4'), cl3Tex('N = 5x - 15 - 2x^2 + 6x = -2x^2 + 11x - 15')])}
  ${cl3Exo(5, 'Développe à l\'aide de la différence de deux carrés : ' + cl3Tex('P = (x + 7)(x - 7)') + ' ; ' + cl3Tex('Q = (2x - 5)(2x + 5)') + '.', [
    cl3Tex('P = x^2 - 7^2 = x^2 - 49'), cl3Tex('Q = (2x)^2 - 5^2 = 4x^2 - 25')])}
  ${cl3Exo(6, 'Factorise : ' + cl3Tex('R = x^2 - 36') + ' ; ' + cl3Tex('S = 9x^2 - 1') + ' ; ' + cl3Tex('T = 49 - 4x^2') + '.', [
    cl3Tex('R = x^2 - 6^2 = (x + 6)(x - 6)'), cl3Tex('S = (3x)^2 - 1^2 = (3x + 1)(3x - 1)'), cl3Tex('T = 7^2 - (2x)^2 = (7 + 2x)(7 - 2x)')])}
  ${cl3Exo(7, 'Calcule mentalement, en utilisant la différence de deux carrés : ' + cl3Tex('51 \\times 49') + ' ; ' + cl3Tex('1\\,002 \\times 998') + '.', [
    cl3Tex('51 \\times 49 = (50 + 1)(50 - 1) = 2\\,500 - 1 = 2\\,499'), cl3Tex('1\\,002 \\times 998 = 1\\,000^2 - 2^2 = 1\\,000\\,000 - 4 = 999\\,996')])}
  ${cl3Exo(8, 'Programme de calcul : « Choisir un nombre. Lui ajouter 3. Multiplier le résultat par le nombre de départ diminué de 3. » Montre que le résultat est toujours égal au carré du nombre de départ diminué de 9.', [
    'On note x le nombre de départ : le résultat est ' + cl3Tex('(x + 3)(x - 3)') + '.', 'D\'après la différence de deux carrés, ' + cl3Tex('(x + 3)(x - 3) = x^2 - 9') + ' : c\'est bien le carré du nombre de départ diminué de 9.'])}
  ${cl3Exo(9, 'Montre que, pour tout nombre n, ' + cl3Tex('(n + 1)^2 - n^2 = 2n + 1') + '. Utilise-le pour calculer ' + cl3Tex('101^2 - 100^2') + '.', [
    cl3Tex('(n + 1)^2 = (n + 1)(n + 1) = n^2 + n + n + 1 = n^2 + 2n + 1') + ' (double distributivité).', 'Donc ' + cl3Tex('(n + 1)^2 - n^2 = n^2 + 2n + 1 - n^2 = 2n + 1') + '.',
    'Avec n = 100 : ' + cl3Tex('101^2 - 100^2 = 2 \\times 100 + 1 = 201') + '.'])}
</div>
`;

/* ---- Méthode 1 : rectangle numérique ---- */
function cl3RectMaj(){
  const v = l => Number(document.getElementById('cl3-r' + l).value), a = v('a'), b = v('b'), c = v('c'), d = v('d');
  ['a', 'b', 'c', 'd'].forEach(l => { document.getElementById('cl3-r' + l + 'V').textContent = v(l); });
  const u = Math.min(340 / (a + b), 240 / (c + d)), X = 50, Y = 30;
  const r = (x, y, w, h, f, t) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}" stroke="#fff" stroke-width="2"/>` + (w > 26 && h > 18 ? `<text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="${CL3_ENCRE}">${t}</text>` : '');
  document.getElementById('cl3-rectSvg').innerHTML = r(X, Y, a * u, c * u, 'rgba(12,91,160,.28)', `${a}×${c} = ${a * c}`) + r(X + a * u, Y, b * u, c * u, 'rgba(224,123,0,.28)', `${b}×${c} = ${b * c}`)
    + r(X, Y + c * u, a * u, d * u, 'rgba(12,91,160,.15)', `${a}×${d} = ${a * d}`) + r(X + a * u, Y + c * u, b * u, d * u, 'rgba(224,123,0,.15)', `${b}×${d} = ${b * d}`)
    + `<text x="${X + a * u / 2}" y="${Y - 10}" text-anchor="middle" font-weight="700" fill="${CL3_BLEU}">a = ${a}</text><text x="${X + a * u + b * u / 2}" y="${Y - 10}" text-anchor="middle" font-weight="700" fill="${CL3_ORANGE}">b = ${b}</text>`
    + `<text x="${X - 8}" y="${Y + c * u / 2 + 5}" text-anchor="end" font-weight="700">c = ${c}</text><text x="${X - 8}" y="${Y + c * u + d * u / 2 + 5}" text-anchor="end" font-weight="700">d = ${d}</text>`;
  const info = document.getElementById('cl3-rectInfo');
  info.innerHTML = cl3Tex(`(${a} + ${b})(${c} + ${d}) = ${a + b} \\times ${c + d} = ${(a + b) * (c + d)}`) + '<br>'
    + cl3Tex(`${a} \\times ${c} + ${a} \\times ${d} + ${b} \\times ${c} + ${b} \\times ${d} = ${a * c} + ${a * d} + ${b * c} + ${b * d} = ${a * c + a * d + b * c + b * d}`);
  renderStaticMath(info);
}

/* ---- Méthode 2 : développeur ---- */
let cl3Dev = { k: 0 };
function cl3DevLire(){ const v = id => { const n = parseInt(document.getElementById(id).value, 10); return isNaN(n) ? 0 : Math.max(-20, Math.min(20, n)); }; return { a: v('cl3-da'), b: v('cl3-db'), c: v('cl3-dc'), d: v('cl3-dd') }; }
function cl3DevDepart(){ cl3Dev = Object.assign(cl3DevLire(), { k: 0 }); cl3DevAfficher(); }
function cl3DevSuivant(){ if(cl3Dev.k < 4) cl3Dev.k++; cl3DevAfficher(); }
function cl3DevAfficher(){
  const { a, b, c, d, k } = cl3Dev, box = document.getElementById('cl3-devDisplay');
  if((a === 0 && b === 0) || (c === 0 && d === 0)){ box.innerHTML = '<p class="hint" style="margin:0;">Un des facteurs est nul : le produit vaut 0.</p>'; return; }
  const P = cl3Bin(a, b) + cl3Bin(c, d);
  const lignes = [[cl3Tex('E = ' + P), 'L\'expression à développer.']];
  const prods = [[a, 1, c, 1], [a, 1, d, 0], [b, 0, c, 1], [b, 0, d, 0]].filter(([p, , q]) => p !== 0 && q !== 0);
  if(k >= 1) lignes.push([cl3Tex('E = ' + prods.map(([p, e, q, f], i) => `${i ? ' + ' : ''}${cl3C(i < 2 ? CL3_BLEU : CL3_ORANGE, cl3Fact(p, e))} \\times ${cl3Fact(q, f)}`).join('')), 'Double distributivité : chaque terme du 1er facteur multiplie chaque terme du 2d.']);
  if(k >= 2) lignes.push([cl3Tex('E = ' + prods.map(([p, e, q, f], i) => cl3Mono(p * q, e + f, i === 0)).join('')), 'On calcule les produits (règle des signes).']);
  if(k >= 3) lignes.push([cl3Tex('E = ' + cl3Poly([a * c, a * d + b * c, b * d])), `On réduit : ${a * d} + ${b * c} = ${a * d + b * c} pour les termes en x.`.replace(/\+ -/g, '− ')]);
  if(k >= 4){ const x = 2, v1 = (a * x + b) * (c * x + d), v2 = a * c * x * x + (a * d + b * c) * x + b * d;
    lignes.push([`Vérification avec x = 2 : ${v1} = ${v2}`, 'On remplace x par un nombre dans l\'expression de départ et dans le résultat : on trouve la même valeur.']); }
  box.innerHTML = r4Ex('', lignes); renderStaticMath(box);
}

/* ---- Méthode 3 : carré découpé ---- */
const CL3_CAR_NOTES = [
  'Un carré de côté a : son aire est a².',
  'On retire un carré de côté b dans un coin : l\'aire restante (en forme de L) est a² − b².',
  'On découpe le L en deux rectangles : l\'un mesure a × (a − b), l\'autre b × (a − b).',
  'On fait tourner le petit rectangle et on le recolle au bout du grand…',
  '… on obtient un rectangle de côtés a + b et a − b. Son aire est (a + b)(a − b) : donc a² − b² = (a + b)(a − b).',
];
let cl3CarK = 0, cl3CarRaf = null;
function cl3CarDessin(k, t){
  const svg = document.getElementById('cl3-carSvg'); if(!svg) return;
  const u = 26, A = 8, B = 3, X = 80, Y = 40; // a = 8 unités, b = 3 unités
  const tx = v => `<text x="${v[0]}" y="${v[1]}" text-anchor="middle" font-size="15" font-style="italic" font-weight="700" fill="${v[3] || CL3_ENCRE}">${v[2]}</text>`;
  let h = '';
  if(k === 0){ h += `<rect x="${X}" y="${Y}" width="${A * u}" height="${A * u}" fill="rgba(12,91,160,.25)" stroke="${CL3_BLEU}" stroke-width="2"/>` + tx([X + A * u / 2, Y - 8, 'a']) + tx([X - 12, Y + A * u / 2, 'a']); }
  else {
    // grand rectangle a × (a − b) en haut ; petit rectangle b × (a − b) à droite en bas (avant déplacement)
    const h1 = (A - B) * u;
    h += `<rect x="${X}" y="${Y}" width="${A * u}" height="${h1}" fill="rgba(12,91,160,.25)" stroke="${CL3_BLEU}" stroke-width="2"/>`;
    const p0 = { x: X, y: Y + h1, w: (A - B) * u, h: B * u }; // bas-gauche : (a − b) × b
    const p1 = { x: X + A * u, y: Y, w: B * u, h: h1 };     // position finale : collé à droite, tourné
    let r = p0, rot = 0;
    if(k >= 3){ const e = k >= 4 ? 1 : t; r = { x: p0.x + (p1.x - p0.x) * e, y: p0.y + (p1.y - p0.y) * e, w: p0.w, h: p0.h }; rot = 90 * e; }
    const cx = r.x + (k >= 3 ? 0 : 0), cy = r.y;
    h += k >= 3 ? `<g transform="translate(${(r.x + (k >= 4 ? B * u : B * u * Math.min(1, t))).toFixed(1)},${r.y.toFixed(1)}) rotate(${rot.toFixed(1)})"><rect x="0" y="${(-p0.h * 0).toFixed(1)}" width="${p0.w}" height="${p0.h}" fill="rgba(224,123,0,.3)" stroke="${CL3_ORANGE}" stroke-width="2"/></g>`
      : `<rect x="${p0.x}" y="${p0.y}" width="${p0.w}" height="${p0.h}" fill="rgba(224,123,0,.3)" stroke="${CL3_ORANGE}" stroke-width="2"/>`;
    if(k <= 2) h += `<rect x="${X + (A - B) * u}" y="${Y + h1}" width="${B * u}" height="${B * u}" fill="none" stroke="#C9CED6" stroke-dasharray="5 4"/>` + tx([X + (A - B) * u + B * u / 2, Y + h1 + B * u / 2 + 5, 'b²', '#9AA3AF']);
    if(k >= 2 && k <= 3) h += `<line x1="${X}" y1="${Y + h1}" x2="${X + A * u}" y2="${Y + h1}" stroke="${CL3_ROUGE}" stroke-width="2" stroke-dasharray="6 4"/>`;
    if(k <= 2) h += tx([X + A * u / 2, Y - 8, 'a']) + tx([X - 22, Y + h1 / 2 + 5, 'a − b']) + tx([X - 12, Y + h1 + B * u / 2 + 5, 'b']);
    if(k >= 4) h += tx([X + A * u / 2, Y - 8, 'a', CL3_BLEU]) + tx([X + A * u + B * u / 2, Y - 8, 'b', CL3_ORANGE]) + tx([X + (A + B) * u / 2, Y + h1 + 24, 'a + b']) + tx([X - 22, Y + h1 / 2 + 5, 'a − b']);
  }
  svg.innerHTML = h;
  document.getElementById('cl3-carNote').textContent = CL3_CAR_NOTES[k];
}
function cl3CarSuivant(){
  cancelAnimationFrame(cl3CarRaf);
  if(cl3CarK >= CL3_CAR_NOTES.length - 1) return;
  cl3CarK++;
  if(cl3CarK === 3){ const t0 = performance.now(), f = now => { const t = Math.min(1, (now - t0) / 1400); cl3CarDessin(3, t); if(t < 1) cl3CarRaf = requestAnimationFrame(f); }; cl3CarRaf = requestAnimationFrame(f); }
  else cl3CarDessin(cl3CarK, 1);
}
function cl3CarReset(){ cancelAnimationFrame(cl3CarRaf); cl3CarK = 0; cl3CarDessin(0, 0); }

/* ---- Méthode 4 : calcul mental ---- */
const CL3_MENTAL_STEPS = [
  { expr: cl3Tex('53 \\times 47 = (50 + 3)(50 - 3)'), note: '53 et 47 sont à égale distance de 50 : on reconnaît (a + b)(a − b) avec a = 50 et b = 3.' },
  { expr: cl3Tex('(50 + 3)(50 - 3) = 50^2 - 3^2'), note: 'Différence de deux carrés.' },
  { expr: cl3Tex('50^2 - 3^2 = 2\\,500 - 9'), note: '50² = 2 500 se calcule de tête.' },
  { expr: cl3Tex('53 \\times 47 = 2\\,491'), note: 'Et voilà, sans poser la multiplication !' },
];
const cl3MentalDemo = makeStepDemo(CL3_MENTAL_STEPS, 'cl3-mentalDisplay');

DEMO_REGISTRY['3e|Calcul littéral'] = {
  cours: 'cours-demo-calcul-litteral-3e', methode: 'methode-demo-calcul-litteral-3e', exos: 'exos-demo-calcul-litteral-3e', histoire: 'histoire-demo-calcul-litteral-3e',
  init: () => {
    cl3RectMaj(); cl3DevDepart(); cl3CarReset(); cl3MentalDemo.reset();
    ['cours-demo-calcul-litteral-3e', 'methode-demo-calcul-litteral-3e', 'exos-demo-calcul-litteral-3e', 'histoire-demo-calcul-litteral-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-calcul-litteral-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-calcul-litteral-3e'));
  }
};

DEMO_QUIZZES['3e|Calcul littéral'] = [
  { q: 'La forme réduite de 5x + 3 − 8x + 6 est...', opts: ['−3x + 9', '13x + 9', '6x'], correct: 0 },
  { q: '7x − (3x − 5) =', opts: ['4x − 5', '4x + 5', '10x + 5'], correct: 1 },
  { q: '(x + 2)(x + 3) =', opts: ['x² + 5x + 6', 'x² + 6', 'x² + 6x + 5'], correct: 0 },
  { q: '(x + 4)(x − 4) =', opts: ['x² − 16', 'x² − 8x − 16', 'x² + 16'], correct: 0 },
  { q: 'La factorisation de 25x² − 9 est...', opts: ['(5x − 3)²', '(5x + 3)(5x − 3)', '(25x + 9)(x − 1)'], correct: 1 },
  { q: '(3x)² =', opts: ['3x²', '9x²', '6x'], correct: 1 },
  { q: '99 × 101 =', opts: ['9 999', '10 001', '9 899'], correct: 0 },
];

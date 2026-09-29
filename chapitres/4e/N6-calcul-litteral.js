/* ============================================================
   CHAPITRE : Calcul littéral (4e, N6)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 50-51 : expression littérale, distributivité simple
   (développement, factorisation), réduire, supprimer des parenthèses). Plan du manuel, titres
   reformulés, exemples nouveaux. Utilise r4Ex / R4_REM / R4_BLEU de
   chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const CL4_BLEU = '#0C5BA0', CL4_ORANGE = '#E07B00', CL4_VERT = '#1E7B34', CL4_ENCRE = '#1C1B2E', CL4_VIOLET = '#8E44AD';
const cl4Tex = s => `<span class="tex"${s.length < 30 && !s.includes('frac') && !s.includes('brace') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const cl4Long = s => `<span style="display:block;max-width:100%;overflow-x:auto;overflow-y:hidden;position:relative;padding:2px 0;white-space:nowrap;">${cl4Tex(s)}</span>`;
// En couleur (facteur distribué, facteur commun).
const cl4K = s => `\\textcolor{${CL4_VERT}}{${s}}`;

/* ---- Petit moteur de calcul : un terme = { c: coefficient, d: degré } d'une seule lettre ---- */
function cl4Terme(txt, lettre){
  const m = String(txt).match(/^([+-]?)(\d+(?:[.,]\d+)?)?([a-z])?(?:\^?([23²³]))?$/);
  if(!m || (!m[2] && !m[3])) return null;
  if(m[4] && !m[3]) return null;
  if(m[3] && lettre && lettre.v && lettre.v !== m[3]) return null;
  if(m[3] && lettre) lettre.v = m[3];
  const c = (m[1] === '-' ? -1 : 1) * (m[2] ? Number(m[2].replace(',', '.')) : 1);
  const d = m[3] ? ({ '2': 2, '²': 2, '3': 3, '³': 3 }[m[4]] || 1) : 0;
  return { c, d };
}
// Découpe « 4x² − 3x + 7 » en termes ; renvoie null si l'écriture n'est pas comprise.
function cl4Somme(txt, lettre){
  const s = String(txt).replace(/\s/g, '').replace(/−/g, '-').replace(/×/g, '');
  if(!s || /[+-]{2}/.test(s) || /[+-]$/.test(s)) return null;
  const morceaux = s.match(/[+-]?[^+-]+/g) || [];
  const t = morceaux.map(m => cl4Terme(m, lettre));
  return t.some(x => !x) ? null : t;
}
const cl4Nb = v => { const r = Math.round(v * 1e6) / 1e6; return String(r).replace('.', '{,}'); };
const cl4Txt = v => String(Math.round(v * 1e6) / 1e6).replace('.', ',').replace('-', '−');
// Monôme en LaTeX (sans signe « + » devant).
function cl4Mono(t, x){
  const lit = t.d === 0 ? '' : x + (t.d > 1 ? `^${t.d}` : '');
  if(t.d === 0) return cl4Nb(t.c);
  if(t.c === 1) return lit; if(t.c === -1) return '-' + lit;
  return cl4Nb(t.c) + lit;
}
// Somme de termes en LaTeX, avec les bons signes.
function cl4Ecr(termes, x){
  if(!termes.length) return '0';
  return termes.map((t, i) => { const m = cl4Mono(t, x); return i === 0 ? m : (m.startsWith('-') ? ' - ' + m.slice(1) : ' + ' + m); }).join('');
}
// Réduit : regroupe par degré décroissant et supprime les termes nuls.
// Avec garderOrdre, les natures restent dans leur ordre d'apparition (pour ne pas « réduire » un simple ordre).
function cl4Reduire(termes, garderOrdre){
  const par = {}, ordre = []; termes.forEach(t => { if(!(t.d in par)) ordre.push(t.d); par[t.d] = Math.round(((par[t.d] || 0) + t.c) * 1e9) / 1e9; });
  return (garderOrdre ? ordre : ordre.slice().sort((a, b) => b - a)).filter(d => par[d] !== 0).map(d => ({ c: par[d], d }));
}
const cl4Val = (termes, v) => termes.reduce((s, t) => s + t.c * Math.pow(v, t.d), 0);

document.getElementById('cours-demo-calcul-litteral-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les expressions littérales</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une <b>expression littérale</b> est une expression qui contient une ou plusieurs <b>lettres</b>. Ces lettres désignent des nombres.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Le périmètre d'un rectangle de longueur <i>L</i> et de largeur <i>ℓ</i> s'exprime par ${cl4Tex('\\mathcal{P} = 2 \\times (L + \\ell)')} : on dit qu'il s'exprime <b>en fonction de</b> <i>L</i> et <i>ℓ</i>.</li>
  <li>Le double du nombre entier qui précède l'entier <i>n</i> s'écrit ${cl4Tex('2 \\times (n - 1)')}.</li>
</ul>
<span class="def-badge">Carré et cube</span>
<div class="def-box"><i>a</i> désigne un nombre : ${cl4Tex('a \\times a = a^2')} se lit « <i>a</i> au <b>carré</b> », et ${cl4Tex('a \\times a \\times a = a^3')} se lit « <i>a</i> au <b>cube</b> ».</div>
<ul class="example-list">
  <li>L'aire d'un carré de côté <i>t</i> est ${cl4Tex('\\mathcal{A} = t \\times t = t^2')} ; le volume d'un cube d'arête <i>k</i> est ${cl4Tex('\\mathcal{V} = k \\times k \\times k = k^3')}.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Conventions d'écriture : on peut supprimer le signe × devant une lettre ou une parenthèse : ${cl4Tex('3 \\times x = 3x')}, ${cl4Tex('a \\times b = ab')}, ${cl4Tex('5 \\times (x + 2) = 5(x + 2)')}. Pour <b>calculer la valeur</b> d'une expression, on remplace la lettre par un nombre : on note ${cl4Tex('A = 3x^2 - 5')} ; pour <i>x</i> = 4, ${cl4Tex('A = 3 \\times 4^2 - 5 = 43')}.</div>

<div class="lesson-header"><span class="num">2</span><h3>La distributivité simple</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Développer</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Développer</b> une expression, c'est l'écrire sous la forme d'une <b>somme</b> (algébrique).</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres relatifs <i>k</i>, <i>a</i> et <i>b</i> :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.4;">${cl4Tex(cl4K('k') + ' \\times (a + b) = ' + cl4K('k') + ' \\times a + ' + cl4K('k') + ' \\times b')}<br>${cl4Tex(cl4K('k') + ' \\times (a - b) = ' + cl4K('k') + ' \\times a - ' + cl4K('k') + ' \\times b')}</div></div>
${r4Ex('Exemple 1 : deux façons de calculer ' + cl4Tex('4 \\times (10 + 3)') + ' et ' + cl4Tex('-5 \\times (6 - 9)') + '.', [
  [cl4Tex('A = 4 \\times (10 + 3) = 4 \\times 13 = 52'), 'On calcule d\'abord la parenthèse…'],
  [cl4Tex('A = 4 \\times 10 + 4 \\times 3 = 40 + 12 = 52'), '… ou on « distribue » le 4 : même résultat.'],
  [cl4Tex('B = -5 \\times (6 - 9) = -5 \\times (-3) = 15'), ''],
  [cl4Tex('B = -5 \\times 6 - (-5) \\times 9 = -30 + 45 = 15'), ''],
  [cl4Tex('C = 7 \\times 102 = 7 \\times 100 + 7 \\times 2 = 714'), 'Calcul mental : la distributivité est très utile.'],
])}
${r4Ex('Exemple 2 : développer ' + cl4Tex('A = 5(x + 4)') + ', ' + cl4Tex('B = -2{,}5(y - 6)') + ' et ' + cl4Tex('C = 4t(3 - t)') + '.', [
  [cl4Tex('A = ' + cl4K('5') + ' \\times x + ' + cl4K('5') + ' \\times 4 = 5x + 20'), 'On distribue 5 à chaque terme de la parenthèse.'],
  [cl4Tex('B = ' + cl4K('(-2{,}5)') + ' \\times y - ' + cl4K('(-2{,}5)') + ' \\times 6 = -2{,}5y + 15'), 'Attention au signe : − (−2,5) × 6 = + 15.'],
  [cl4Tex('C = ' + cl4K('4t') + ' \\times 3 - ' + cl4K('4t') + ' \\times t = 12t - 4t^2'), 't × t = t².'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Factoriser</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Factoriser</b> une expression, c'est l'écrire sous la forme d'un <b>produit</b>.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres relatifs <i>k</i>, <i>a</i> et <i>b</i> :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.4;">${cl4Tex(cl4K('k') + ' \\times a + ' + cl4K('k') + ' \\times b = ' + cl4K('k') + ' \\times (a + b)')}<br>${cl4Tex(cl4K('k') + ' \\times a - ' + cl4K('k') + ' \\times b = ' + cl4K('k') + ' \\times (a - b)')}</div></div>
${r4Ex('Exemples : factoriser ' + cl4Tex('D = 18x + 12') + ' et ' + cl4Tex('E = 10a^2 - 15a') + '.', [
  [cl4Tex('D = ' + cl4K('6') + ' \\times 3x + ' + cl4K('6') + ' \\times 2'), 'On fait apparaître un facteur commun : 6 divise 18 et 12.'],
  [cl4Tex('D = ' + cl4K('6') + '(3x + 2)'), 'On le met en facteur.'],
  [cl4Tex('E = ' + cl4K('5a') + ' \\times 2a - ' + cl4K('5a') + ' \\times 3'), 'Le facteur commun est 5a : 10a² = 5a × 2a et 15a = 5a × 3.'],
  [cl4Tex('E = ' + cl4K('5a') + '(2a - 3)'), ''],
  [cl4Tex('F = 37 \\times 13 + 37 \\times 87 = 37 \\times (13 + 87) = 3\\,700'), 'Calcul mental : on factorise par 37.'],
])}
<div style="display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0 16px;text-align:center;">
  <div><b>${cl4Tex('6(3x + 2)')}</b><br><span style="font-size:.85rem;color:#4E5665;">forme factorisée (un produit)</span></div>
  <div style="font-size:.9rem;"><div style="color:${CL4_BLEU};font-weight:700;">développer →</div><div style="color:${CL4_ORANGE};font-weight:700;">← factoriser</div></div>
  <div><b>${cl4Tex('18x + 12')}</b><br><span style="font-size:.85rem;color:#4E5665;">forme développée (une somme)</span></div>
</div>

<div class="lesson-header"><span class="num">3</span><h3>Simplifier une expression</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Réduire</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Réduire</b> une expression littérale, c'est l'écrire sous la forme d'une somme comportant <b>le moins de termes possible</b>.</div>
${r4Ex('Exemples : réduire ' + cl4Tex('F = 6x + 9 - 4x + 1') + ' et ' + cl4Tex('G = 4x^2 - 3x + 7 + x^2 + 5x - 9') + '.', [
  [cl4Tex('F = 6x - 4x + 9 + 1'), 'On regroupe les termes de même nature.'],
  [cl4Tex('F = (6 - 4)x + 10 = 2x + 10'), 'On factorise par x, puis on calcule.'],
  [cl4Long('G = 4x^2 + x^2 - 3x + 5x + 7 - 9'), 'On regroupe les termes en x², en x, puis les nombres.'],
  [cl4Long('G = (4 + 1)x^2 + (-3 + 5)x - 2 = 5x^2 + 2x - 2'), 'On réduit chaque groupe.'],
])}
<div class="redaction-note" ${R4_REM}>Attention : on ne peut pas réduire ${cl4Tex('2x^2 + 3x')} ni ${cl4Tex('5x + 4')} : ce sont des termes de natures différentes (comme on n'additionne pas des cm² et des cm). Mais ${cl4Tex('3x \\times 2x = 6x^2')} : dans un <b>produit</b>, on multiplie les nombres entre eux et les lettres entre elles.</div>

<div class="sub-header"><span class="letter">B</span><h4>Supprimer des parenthèses</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">L'<b>opposé d'une somme</b> algébrique est égal à la somme des <b>opposés</b> de chacun de ses termes : on peut supprimer des parenthèses précédées d'un signe « − » en <b>changeant le signe de chaque terme</b> qu'elles contiennent. Précédées d'un signe « + », on les supprime sans rien changer.</div>
${r4Ex('Exemple : supprimer les parenthèses et réduire ' + cl4Tex('H = 5x - (3x^2 - 4x + 1)') + '.', [
  [cl4Tex('H = 5x + (-3x^2) + (+4x) + (-1)'), 'On additionne les opposés des termes de la parenthèse.'],
  [cl4Tex('H = 5x - 3x^2 + 4x - 1'), 'On simplifie l\'écriture.'],
  [cl4Tex('H = -3x^2 + 9x - 1'), 'On réduit.'],
])}
`;

document.getElementById('histoire-demo-calcul-litteral-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Pendant des siècles, les calculs « avec des inconnues » s'écrivaient entièrement <b>en phrases</b> ! Au 3e siècle, <b>Diophante</b> d'Alexandrie commence à utiliser des abréviations. Les signes + et − apparaissent pour la première fois dans un livre imprimé en 1489, écrit par l'Allemand <b>Johannes Widmann</b> ; le signe = est inventé en 1557 par le Gallois <b>Robert Recorde</b> « pour éviter de répéter sans cesse les mots <i>est égal à</i> ». La grande révolution vient du Français <b>François Viète</b> qui, en 1591, désigne les nombres par des <b>lettres</b> : des voyelles pour les inconnues, des consonnes pour les nombres connus. <b>René Descartes</b> simplifie en 1637 : les dernières lettres de l'alphabet (<i>x</i>, <i>y</i>, <i>z</i>) pour les inconnues, les premières (<i>a</i>, <i>b</i>, <i>c</i>) pour les nombres connus, comme on le fait toujours. Quant au mot « distributivité », il n'a été inventé qu'en 1814, par le mathématicien français <b>François-Joseph Servois</b>… bien après que tout le monde l'utilise !
</div>
`;

document.getElementById('methode-demo-calcul-litteral-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : développer avec les flèches</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez le facteur <i>k</i> et la parenthèse (par exemple <b>−3</b> et <b>2x − 7</b>, ou <b>4t</b> et <b>3 − t</b>) : les flèches montrent à qui <i>k</i> est distribué, le développement est rédigé puis vérifié sur un exemple.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;font-size:1.1rem;">
    <input id="cl4-dK" type="text" value="-2,5" style="width:70px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;" oninput="cl4Developper()">
    <span>×</span><span style="font-size:1.4rem;">(</span>
    <input id="cl4-dP" type="text" value="y - 6" style="width:150px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;" oninput="cl4Developper()">
    <span style="font-size:1.4rem;">)</span>
  </div>
  <div id="cl4-dFleches" style="position:relative;display:flex;justify-content:center;margin:40px auto 6px;min-height:40px;"></div>
  <div id="cl4-dRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : factoriser en trouvant le facteur commun</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez une somme de deux termes à coefficients entiers (par exemple <b>18x + 12</b>, <b>10a² − 15a</b>, <b>−6y + 15y²</b>) : le plus grand facteur commun est cherché et mis en facteur.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0;">
    <input id="cl4-fE" type="text" value="-6y + 15y²" style="width:200px;padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.05rem;" oninput="cl4Factoriser()">
  </div>
  <div id="cl4-fRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : réduire en regroupant les termes</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Chaque terme est une tuile : en vert les termes en x², en bleu les termes en x, en orange les nombres. Cliquez sur « Regrouper », puis sur « Réduire ». Vous pouvez écrire votre propre expression.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:10px 0;">
    <input id="cl4-rE" type="text" value="4x² - 3x + 7 + x² + 5x - 9" style="width:280px;max-width:100%;padding:7px 10px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.05rem;" oninput="cl4Tuiles(0)">
  </div>
  <div id="cl4-rTuiles" style="position:relative;margin:10px auto;overflow-x:auto;overflow-y:hidden;"></div>
  <div id="cl4-rRes" style="min-height:2.4em;"></div>
  <div class="figure-toolbar">
    <button class="btn" id="cl4-rB1" onclick="cl4Tuiles(1)">Regrouper</button>
    <button class="btn" id="cl4-rB2" onclick="cl4Tuiles(2)">Réduire</button>
    <button class="btn secondary" onclick="cl4Tuiles(0)">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : développer et réduire, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="cl4-calcDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="cl4CalcDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="cl4CalcDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function cl4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="cl4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="cl4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-calcul-litteral-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Développer et réduire une expression »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${cl4Tex('A = 3(2x - 5) - 4(x - 1)')}</span><span class="we-comment">On veut développer et réduire A.</span></div>
    <div class="we-row"><span class="we-expr">${cl4Long('A = 3 \\times 2x - 3 \\times 5 - (4 \\times x - 4 \\times 1)')}</span><span class="we-comment">On développe chaque produit (le « − » reste devant).</span></div>
    <div class="we-row"><span class="we-expr">${cl4Tex('A = 6x - 15 - (4x - 4)')}</span><span class="we-comment">On calcule les produits.</span></div>
    <div class="we-row"><span class="we-expr">${cl4Tex('A = 6x - 15 - 4x + 4')}</span><span class="we-comment">On supprime la parenthèse précédée de « − » : on change les signes.</span></div>
    <div class="we-row"><span class="we-expr">${cl4Tex('A = 2x - 11')}</span><span class="we-comment">On réduit : 6x − 4x = 2x et −15 + 4 = −11.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${cl4Exo(1, 'Écris le plus simplement possible : ' + cl4Tex('5 \\times a') + ' ; ' + cl4Tex('x \\times x') + ' ; ' + cl4Tex('3 \\times y \\times y \\times y') + ' ; ' + cl4Tex('2 \\times (x + 1)') + ' ; ' + cl4Tex('a \\times 4 \\times b') + '.', [
    cl4Tex('5a') + ' ; ' + cl4Tex('x^2') + ' ; ' + cl4Tex('3y^3') + ' ; ' + cl4Tex('2(x + 1)') + ' ; ' + cl4Tex('4ab') + ' (on écrit le nombre en premier).'])}
  ${cl4Exo(2, 'Calcule pour <i>x</i> = −2 : ' + cl4Tex('A = 3x^2 - 5x + 1') + ' et ' + cl4Tex('B = 4 - 2x^3') + '.', [
    cl4Tex('A = 3 \\times (-2)^2 - 5 \\times (-2) + 1 = 12 + 10 + 1 = 23'),
    cl4Tex('B = 4 - 2 \\times (-2)^3 = 4 - 2 \\times (-8) = 4 + 16 = 20')])}
  ${cl4Exo(3, 'Développe : ' + cl4Tex('6(x + 4)') + ' ; ' + cl4Tex('-3(2y - 7)') + ' ; ' + cl4Tex('5a(a - 2)') + ' ; ' + cl4Tex('-x(4 - x)') + '.', [
    cl4Tex('6x + 24') + ' ; ' + cl4Tex('-6y + 21') + ' ; ' + cl4Tex('5a^2 - 10a') + ' ; ' + cl4Tex('-4x + x^2') + '.'])}
  ${cl4Exo(4, 'Factorise : ' + cl4Tex('9x + 27') + ' ; ' + cl4Tex('14a - 21') + ' ; ' + cl4Tex('x^2 + 5x') + ' ; ' + cl4Tex('12y^2 - 8y') + '.', [
    cl4Tex('9(x + 3)') + ' ; ' + cl4Tex('7(2a - 3)') + ' ; ' + cl4Tex('x(x + 5)') + ' ; ' + cl4Tex('4y(3y - 2)') + '.'])}
  ${cl4Exo(5, 'Réduis : ' + cl4Tex('7x - 3 + 2x + 10') + ' ; ' + cl4Tex('3a^2 + 5a - a^2 - 8a') + ' ; ' + cl4Tex('4 - y + 6y - 9') + '.', [
    cl4Tex('9x + 7') + ' ; ' + cl4Tex('2a^2 - 3a') + ' ; ' + cl4Tex('5y - 5') + '.'])}
  ${cl4Exo(6, 'Supprime les parenthèses et réduis : ' + cl4Tex('8 - (x - 3)') + ' ; ' + cl4Tex('2x + (5 - 3x)') + ' ; ' + cl4Tex('y^2 - (4y^2 - y + 2)') + '.', [
    cl4Tex('8 - x + 3 = 11 - x') + ' ; ' + cl4Tex('2x + 5 - 3x = -x + 5') + ' ; ' + cl4Tex('y^2 - 4y^2 + y - 2 = -3y^2 + y - 2') + '.'])}
  ${cl4Exo(7, 'Développe et réduis : ' + cl4Tex('E = 4(x + 3) - 2(3x - 1)') + ' et ' + cl4Tex('F = x(x + 2) - 3(x^2 - x)') + '.', [
    cl4Tex('E = 4x + 12 - 6x + 2 = -2x + 14'),
    cl4Tex('F = x^2 + 2x - 3x^2 + 3x = -2x^2 + 5x')])}
  ${cl4Exo(8, 'Programme de calcul : « Choisir un nombre. Lui ajouter 3. Multiplier le résultat par 4. Soustraire 12. » Léna affirme qu\'on obtient toujours le quadruple du nombre de départ. A-t-elle raison ?', [
    'On appelle <i>x</i> le nombre choisi. Le programme donne ' + cl4Tex('4(x + 3) - 12') + '.',
    cl4Tex('R = 4(x + 3) - 12 = 4x + 12 - 12 = 4x'), 'On obtient bien le quadruple de <i>x</i>, <b>quel que soit</b> le nombre choisi. Léna a raison (et un exemple n\'aurait pas suffi à le prouver).'])}
</div>
`;

/* ---- Méthode 1 : développer, avec flèches animées ---- */
function cl4Developper(){
  const out = document.getElementById('cl4-dRes'), zone = document.getElementById('cl4-dFleches');
  const lettre = {}, k = cl4Somme(document.getElementById('cl4-dK').value, lettre), P = cl4Somme(document.getElementById('cl4-dP').value, lettre);
  if(!k || k.length !== 1 || !P || P.length < 2 || P.length > 3){ zone.innerHTML = ''; out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez un seul terme pour k (par exemple −3, 2x, 0,5) et deux ou trois termes dans la parenthèse (par exemple 2x − 7), avec une seule lettre.</p>'; return; }
  const x = lettre.v || 'x', kt = k[0], kT = cl4Mono(kt, x), kP = kT.startsWith('-') ? `(${kT})` : kT;
  // Ligne avec flèches : chaque morceau est rendu séparément pour pouvoir mesurer sa position.
  const morceaux = [[kP, 'k'], ['\\times (', ''], ...P.map((t, i) => [i === 0 ? cl4Mono(t, x) : (cl4Mono(t, x).startsWith('-') ? '- ' + cl4Mono(t, x).slice(1) : '+ ' + cl4Mono(t, x)), 't' + i]), [')', '']];
  zone.innerHTML = morceaux.map(([m, r]) => `<span class="tex" data-r="${r}" style="font-size:1.35rem;margin:0 2px;white-space:nowrap;">${r === 'k' ? cl4K(m) : m}</span>`).join('');
  renderStaticMath(zone);
  // Flèches : de k vers chaque terme, en arc au-dessus, tracées progressivement. Elles se placent
  // d'après la position des termes à l'écran : si l'onglet est encore masqué, on attend qu'il s'affiche.
  const tracer = () => {
    const zr = zone.getBoundingClientRect(), kEl = zone.querySelector('[data-r="k"]'); if(!kEl) return;
    const kr = kEl.getBoundingClientRect(), x0 = kr.left + kr.width / 2 - zr.left;
    const fl = P.map((t, i) => { const e = zone.querySelector(`[data-r="t${i}"]`).getBoundingClientRect(); const x1 = e.right - Math.min(e.width, 18) / 2 - zr.left - 2; const h = 20 + 11 * i; return `<path d="M${x0},4 C${x0},${-h} ${x1},${-h} ${x1},2" fill="none" stroke="${CL4_VERT}" stroke-width="2" pathLength="100" style="stroke-dasharray:100;stroke-dashoffset:100;animation:cl4Trace .7s ${.15 + i * .55}s ease-out forwards;"/><polygon points="${x1 - 4},-4 ${x1 + 4},-4 ${x1},3" fill="${CL4_VERT}" style="opacity:0;animation:cl4Appar .2s ${.8 + i * .55}s forwards;"/>`; }).join('');
    zone.insertAdjacentHTML('beforeend', `<svg style="position:absolute;left:0;top:0;width:100%;height:10px;overflow:visible;pointer-events:none;">${fl}</svg>`);
  };
  if(zone.getBoundingClientRect().width > 0) requestAnimationFrame(tracer);
  else if(window.ResizeObserver){
    const ro = new ResizeObserver(() => { if(zone.getBoundingClientRect().width > 0){ ro.disconnect(); tracer(); } });
    ro.observe(zone);
  }
  const produits = P.map(t => ({ c: kt.c * t.c, d: kt.d + t.d }));
  const detail = P.map((t, i) => { const m = cl4Mono(t, x), ts = t.c < 0 ? `(${m})` : m; return (i === 0 ? '' : ' + ') + cl4K(kP) + ' \\times ' + ts; }).join('');
  const brut = cl4Ecr(produits, x), red = cl4Reduire(produits, true), final = cl4Ecr(red, x);
  const lignes = [
    // L'expression est nommée A et le calcul écrit en colonne : jamais de « = » en début de ligne.
    [cl4Long(`A = ${kP}(${cl4Ecr(P, x)})`), 'On nomme l\'expression à développer.'],
    [cl4Long(`A = ${detail}`), 'On multiplie k par chaque terme de la parenthèse (règle des signes !).'],
    [cl4Long(`A = ${brut}`), 'On calcule chaque produit.'],
  ];
  if(final !== brut) lignes.push([cl4Long(`A = ${final}`), 'On réduit.']);
  // Vérification sur un exemple : les deux écritures donnent la même valeur.
  const v = 2, g = cl4Val([kt], v) * cl4Val(P, v), dr = cl4Val(red, v);
  const vP = cl4Val(P, v);
  lignes.push([`Vérification pour ${x} = ${v} : ${cl4Txt(cl4Val([kt], v))} × ${vP < 0 ? '(' + cl4Txt(vP) + ')' : cl4Txt(vP)} = ${cl4Txt(g)} et ${cl4Txt(dr)} : ${Math.abs(g - dr) < 1e-9 ? 'c\'est bien égal.' : 'erreur !'}`, 'Tester avec un nombre permet de repérer une erreur (mais ne prouve rien).']);
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 2 : factoriser ---- */
function cl4Factoriser(){
  const out = document.getElementById('cl4-fRes'), lettre = {}, T = cl4Somme(document.getElementById('cl4-fE').value, lettre);
  const err = t => { out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">${t}</p>`; };
  if(!T || T.length !== 2) return err('Écrivez une somme de deux termes, par exemple 18x + 12 ou 10a² − 15a.');
  if(T.some(t => !Number.isInteger(t.c) || t.c === 0)) return err('Utilisez des coefficients entiers non nuls.');
  const x = lettre.v || 'x', pg = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a; };
  const g = pg(T[0].c, T[1].c), m = Math.min(T[0].d, T[1].d);
  if(g === 1 && m === 0) return err('Ces deux termes n\'ont pas de facteur commun (autre que 1) : on ne peut pas factoriser simplement.');
  const K = { c: g, d: m }, KT = cl4Mono(K, x), q = T.map(t => ({ c: t.c / g, d: t.d - m }));
  const expl = T.map((t, i) => `${cl4Mono({ c: Math.abs(t.c), d: t.d }, x)} = ${cl4K(KT)} \\times ${cl4Mono({ c: Math.abs(q[i].c), d: q[i].d }, x)}`).join(' \\quad ');
  const signe = T[1].c < 0 ? ' - ' : ' + ', q1 = cl4Mono(q[0], x), q2 = cl4Mono({ c: Math.abs(q[1].c), d: q[1].d }, x);
  const lignes = [
    [cl4Long(expl), `Le plus grand facteur commun est ${m ? `${g === 1 ? '' : g + ' × '}${x}${m > 1 ? '^' + m : ''}` : g} : ${g} divise ${Math.abs(T[0].c)} et ${Math.abs(T[1].c)}${m ? `, et ${x}${m > 1 ? '²' : ''} apparaît dans les deux termes` : ''}.`],
    [cl4Long(`A = ${cl4Ecr(T, x)}`), 'On nomme l\'expression à factoriser.'],
    [cl4Long(`A = ${cl4K(KT)} \\times ${q1.startsWith('-') ? '(' + q1 + ')' : q1}${signe}${cl4K(KT)} \\times ${q2}`), 'On fait apparaître le facteur commun dans chaque terme.'],
    [cl4Tex(`A = ${cl4K(KT)}(${q1}${signe}${q2})`), 'On le met en facteur.'],
    [`Vérification : en développant ${cl4Tex(`${KT}(${q1}${signe}${q2})`)}, on retrouve ${cl4Tex(cl4Ecr(q.map(t => ({ c: t.c * K.c, d: t.d + K.d })), x))}.`, ''],
  ];
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 3 : les tuiles qui se regroupent ---- */
const CL4_COUL = { 3: CL4_VIOLET, 2: CL4_VERT, 1: CL4_BLEU, 0: CL4_ORANGE };
let cl4R = { etape: 0 };
function cl4Tuiles(etape){
  const zone = document.getElementById('cl4-rTuiles'), res = document.getElementById('cl4-rRes'), lettre = {};
  const T = cl4Somme(document.getElementById('cl4-rE').value, lettre);
  if(!T || T.length > 12){ zone.innerHTML = ''; res.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez une somme d\'au plus 12 termes avec une seule lettre, par exemple 4x² − 3x + 7 + x² + 5x − 9.</p>'; return; }
  const x = lettre.v || 'x', W = 74, n = T.length;
  const ordre = T.map((t, i) => i).sort((a, b) => T[b].d - T[a].d || a - b);
  const red = cl4Reduire(T);
  const lib = t => { const m = cl4Mono({ c: Math.abs(t.c), d: t.d }, x).replace(/\^(\d)/, (_, e) => '⁰¹²³'[e]).replace(/\{,\}/, ','); return (t.c < 0 ? '− ' : '+ ') + m; };
  if(etape === 0 || !zone.firstChild){
    zone.innerHTML = `<div id="cl4-rLigne" style="position:relative;height:110px;width:${Math.max(n, 1) * W}px;margin:0 auto;"></div>`;
    const L = zone.firstChild;
    T.forEach((t, i) => L.insertAdjacentHTML('beforeend', `<div data-t="${i}" style="position:absolute;top:6px;left:${i * W}px;width:${W - 8}px;height:40px;line-height:40px;text-align:center;border-radius:8px;background:${CL4_COUL[t.d]}1f;border:2px solid ${CL4_COUL[t.d]};color:${CL4_COUL[t.d]};font-weight:700;font-family:'JetBrains Mono',monospace;transition:left .7s cubic-bezier(.4,1.3,.5,1),top .7s,opacity .5s;">${lib(t)}</div>`));
  }
  const L = zone.firstChild;
  if(etape >= 1){
    // Regroupement : chaque tuile va à sa place dans l'ordre x², x, nombres, avec un petit espace entre les groupes.
    let pos = 0, prec = null;
    ordre.forEach((i, r) => { if(prec !== null && T[i].d !== prec) pos += .35; prec = T[i].d; const el = L.querySelector(`[data-t="${i}"]`); el.style.left = (pos * W) + 'px'; pos++; });
    L.style.width = (pos * W) + 'px';
  }
  L.querySelectorAll('.cl4-res').forEach(e => e.remove());
  if(etape >= 2){
    // Résultat : une tuile par nature, sous les groupes.
    const debut = {}; let pos = 0, prec = null;
    ordre.forEach(i => { if(prec !== null && T[i].d !== prec) pos += .35; if(debut[T[i].d] === undefined) debut[T[i].d] = pos; prec = T[i].d; pos++; });
    red.forEach(t => L.insertAdjacentHTML('beforeend', `<div class="cl4-res" style="position:absolute;top:62px;left:${debut[t.d] * W}px;width:${W - 8}px;height:40px;line-height:40px;text-align:center;border-radius:8px;background:${CL4_COUL[t.d]};color:#fff;font-weight:700;font-family:'JetBrains Mono',monospace;opacity:0;transition:opacity .6s;">${lib(t).replace(/^\+ /, '')}</div>`));
    requestAnimationFrame(() => L.querySelectorAll('.cl4-res').forEach(e => { e.style.opacity = 1; }));
  }
  const groupes = [...new Set(ordre.map(i => T[i].d))];
  const reg = groupes.map(d => T.filter(t => t.d === d)), regTex = cl4Ecr(ordre.map(i => T[i]), x);
  const facto = reg.map(g => { const d = g[0].d, s = g.map((t, j) => (j && t.c >= 0 ? ' + ' : j ? ' - ' : (t.c < 0 ? '-' : '')) + cl4Nb(Math.abs(t.c))).join(''); return d === 0 ? (g.length > 1 ? `(${s})` : s) : (g.length > 1 ? `(${s})${x}${d > 1 ? '^' + d : ''}` : cl4Mono(g[0], x)); }).join(' + ').replace(/\+ -/g, '- ');
  const lignes = [[cl4Long('A = ' + cl4Ecr(T, x)), 'L\'expression de départ, nommée A.']];
  if(etape >= 1) lignes.push([cl4Long('A = ' + regTex), 'On regroupe les termes de même nature (même couleur).']);
  if(etape >= 2){ lignes.push([cl4Long('A = ' + facto), 'Dans chaque groupe, on additionne les coefficients.']); lignes.push([cl4Long('A = ' + cl4Ecr(red, x)), red.length < T.length ? `Il reste ${red.length} terme${red.length > 1 ? 's' : ''} au lieu de ${T.length} : l'expression est réduite.` : 'Aucun terme ne pouvait être regroupé.']); }
  res.innerHTML = r4Ex('', lignes);
  renderStaticMath(res);
  document.getElementById('cl4-rB1').disabled = etape >= 1; document.getElementById('cl4-rB2').disabled = etape >= 2;
  cl4R.etape = etape;
}

/* ---- Méthode 4 : développer et réduire, pas à pas ---- */
const CL4_CALC_STEPS = [
  { expr: cl4Tex('E = 4(x + 3) - 2(3x - 1)'), note: 'On veut développer et réduire E. Il y a deux produits à développer.' },
  { expr: cl4Long('E = ' + cl4K('4') + ' \\times x + ' + cl4K('4') + ' \\times 3 - [\\,' + cl4K('2') + ' \\times 3x - ' + cl4K('2') + ' \\times 1\\,]'), note: 'On distribue 4, puis 2. Le signe « − » devant le deuxième produit porte sur tout son développement : on garde des crochets.' },
  { expr: cl4Tex('E = 4x + 12 - (6x - 2)'), note: 'On calcule les produits.' },
  { expr: cl4Tex('E = 4x + 12 - 6x + 2'), note: 'Parenthèse précédée de « − » : on change le signe de chaque terme (−6x et +2).' },
  { expr: cl4Tex('E = 4x - 6x + 12 + 2'), note: 'On regroupe les termes en x et les nombres.' },
  { expr: cl4Tex('E = -2x + 14'), note: '4x − 6x = −2x et 12 + 2 = 14 : l\'expression est développée et réduite.' },
];
const cl4CalcDemo = makeStepDemo(CL4_CALC_STEPS, 'cl4-calcDisplay');

// Animations des flèches (méthode 1).
if(!document.getElementById('cl4-style')) document.head.insertAdjacentHTML('beforeend', '<style id="cl4-style">@keyframes cl4Trace{to{stroke-dashoffset:0}}@keyframes cl4Appar{to{opacity:1}}</style>');

DEMO_REGISTRY['4e|Calcul littéral'] = {
  cours: 'cours-demo-calcul-litteral-4e', methode: 'methode-demo-calcul-litteral-4e', exos: 'exos-demo-calcul-litteral-4e', histoire: 'histoire-demo-calcul-litteral-4e',
  init: () => {
    cl4CalcDemo.reset(); cl4Factoriser(); cl4Tuiles(0);
    ['cours-demo-calcul-litteral-4e', 'exos-demo-calcul-litteral-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-calcul-litteral-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-calcul-litteral-4e'));
    cl4Developper();
  }
};

DEMO_QUIZZES['4e|Calcul littéral'] = [
  { q: '3 × x × x s\'écrit plus simplement...', opts: ['3x²', '9x', '6x'], correct: 0 },
  { q: '5(x − 2) = ...', opts: ['5x − 2', '5x − 10', '5x + 10'], correct: 1 },
  { q: 'L\'expression réduite de 4x + 3x² − x est...', opts: ['6x³', '3x² + 3x', '7x²'], correct: 1 },
  { q: 'Une factorisation de 6x + 15 est...', opts: ['3(2x + 5)', '6(x + 15)', '3(2x + 15)'], correct: 0 },
  { q: '−(2x − 7) = ...', opts: ['−2x − 7', '−2x + 7', '2x + 7'], correct: 1 },
  { q: 'Pour x = 3, 2x² vaut...', opts: ['36', '18', '12'], correct: 1 },
  { q: 'En utilisant 7 × 99 = 7 × 100 − 7 × 1, on trouve...', opts: ['693', '700', '707'], correct: 0 },
];

/* ============================================================
   CHAPITRE : Équations (3e, N5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 31-32) : plan du manuel (équation du premier degré et règles de
   la balance, équation produit, équation x² = a, résolution de problèmes en 5 étapes), titres
   reformulés, exemples nouveaux (différents du manuel ET du N7 de 4e, chapitres/4e/N7-equations.js).
   Méthode animée : une balance qui résout l'équation (sacs « x » et cubes « 1 »), un solveur
   d'équation produit pour des coefficients au choix, la parabole y = x² coupée par la droite y = a
   (0, 1 ou 2 solutions), un problème mis en équation pas à pas.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const EQ3_BLEU = '#0C5BA0', EQ3_VERT = '#1E7B34', EQ3_ROUGE = '#C0392B', EQ3_ORANGE = '#E07B00', EQ3_VIOLET = '#7A3E9D', EQ3_ENCRE = '#1C1B2E';
const eq3Tex = s => `<span class="tex"${s.length < 32 && !s.includes('frac') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
const eq3C = (c, s) => `\\textcolor{${c}}{${s}}`;
const eq3Nb = v => { const r = Math.round(v * 1e6) / 1e6; return String(r).replace('.', '{,}'); };
// Monôme / binôme ax + b en KaTeX.
function eq3Bin(a, b){
  const ax = a === 0 ? '' : a === 1 ? 'x' : a === -1 ? '-x' : eq3Nb(a) + 'x';
  if(b === 0) return ax || '0';
  return ax ? `${ax} ${b < 0 ? '-' : '+'} ${eq3Nb(Math.abs(b))}` : eq3Nb(b);
}
const eq3Pgcd = (a, b) => b ? eq3Pgcd(b, a % b) : Math.abs(a);
// Solution de ax + b = 0 : -b/a, en fraction simplifiée si ce n'est pas un décimal simple.
function eq3Sol(a, b){
  const n = -b, d = a, v = n / d;
  if(Number.isInteger(v)) return String(v);
  const dec = Math.abs(v * 100 - Math.round(v * 100)) < 1e-9;
  const g = eq3Pgcd(Math.round(n), Math.round(d)), N = Math.round(n) / g * Math.sign(d), D = Math.abs(Math.round(d) / g);
  return `${N < 0 ? '-' : ''}\\dfrac{${Math.abs(N)}}{${D}}${dec ? ' = ' + eq3Nb(v) : ''}`;
}

document.getElementById('cours-demo-equations-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>L'équation du premier degré</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box"><b>Résoudre une équation</b> à une inconnue, c'est déterminer <b>toutes</b> les valeurs de l'inconnue qui vérifient l'égalité. Ces valeurs sont les <b>solutions</b> de l'équation.</div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Une égalité reste vraie si on <b>ajoute</b> ou si on <b>soustrait</b> un même nombre à ses deux membres.</li>
  <li>Une égalité reste vraie si on <b>multiplie</b> ou si on <b>divise</b> ses deux membres par un même nombre <b>non nul</b>.</li></ul>
  Autrement dit, pour tous nombres <i>a</i>, <i>b</i> et <i>k</i> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:2.4;">
    <li><b>si</b> ${eq3Tex('a = b')} <b>alors</b> ${eq3Tex('a + ' + eq3C(EQ3_VIOLET, 'k') + ' = b + ' + eq3C(EQ3_VIOLET, 'k'))} et ${eq3Tex('a - ' + eq3C(EQ3_VIOLET, 'k') + ' = b - ' + eq3C(EQ3_VIOLET, 'k'))} ;</li>
    <li><b>si</b> ${eq3Tex('a = b')} <b>alors</b> ${eq3Tex('a \\times ' + eq3C(EQ3_VIOLET, 'k') + ' = b \\times ' + eq3C(EQ3_VIOLET, 'k'))} et ${eq3Tex('\\dfrac{a}{' + eq3C(EQ3_VIOLET, 'k') + '} = \\dfrac{b}{' + eq3C(EQ3_VIOLET, 'k') + '}')} (avec <i>k</i> ≠ 0).</li></ul></div>
${r4Ex('Exemple : résoudre l\'équation ' + eq3Tex('5x + 2 = 2x + 14') + '.', [
  [eq3Tex('5x + 2 ' + eq3C(EQ3_VERT, '- 2x') + ' = 2x + 14 ' + eq3C(EQ3_VERT, '- 2x')), '<b style="color:#1E7B34;">On élimine les termes en x du membre de droite</b> en soustrayant 2x aux deux membres.'],
  [eq3Tex('3x + 2 = 14'), ''],
  [eq3Tex('3x + 2 ' + eq3C(EQ3_ROUGE, '- 2') + ' = 14 ' + eq3C(EQ3_ROUGE, '- 2')), '<b style="color:#C0392B;">On isole le terme en x dans le membre de gauche</b> en soustrayant 2 aux deux membres.'],
  [eq3Tex('3x = 12'), ''],
  [eq3Tex('\\dfrac{3x}{' + eq3C(EQ3_BLEU, '3') + '} = \\dfrac{12}{' + eq3C(EQ3_BLEU, '3') + '}'), '<b style="color:#0C5BA0;">On détermine x</b> en divisant les deux membres par 3.'],
  [eq3Tex('x = 4'), ''],
])}
<ul class="example-list"><li>La solution de l'équation est <b>4</b>. <b>Vérification</b> : pour <i>x</i> = 4, ${eq3Tex('5 \\times 4 + 2 = 22')} et ${eq3Tex('2 \\times 4 + 14 = 22')} : l'égalité est bien vraie.</li></ul>
<div class="redaction-note" ${R4_REM}>Remarque : résoudre une équation, c'est comme manipuler une <b>balance</b> en équilibre : on fait les mêmes opérations sur les deux plateaux pour qu'elle reste en équilibre (animation dans l'onglet Méthode).</div>

<div class="lesson-header"><span class="num">2</span><h3>L'équation produit</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box"><b>Si</b> un produit de facteurs est nul, <b>alors</b> au moins un de ses facteurs est nul. Autrement dit : <b>si</b> ${eq3Tex('A \\times B = 0')} <b>alors</b> ${eq3Tex('A = 0')} ou ${eq3Tex('B = 0')}.</div>
${r4Ex('Exemple : résoudre l\'équation ' + eq3Tex('(x - 4)(2x + 5) = 0') + '.', [
  ['Si un produit de facteurs est nul, alors au moins un de ses facteurs est nul.', 'On cite la propriété.'],
  [eq3Tex('x - 4 = 0') + ' &nbsp; ou &nbsp; ' + eq3Tex('2x + 5 = 0'), 'On résout deux équations du premier degré.'],
  [eq3Tex('x = 4') + ' &nbsp; ou &nbsp; ' + eq3Tex('2x = -5') + ', soit ' + eq3Tex('x = -2{,}5'), ''],
])}
<ul class="example-list"><li>Les solutions sont <b>4</b> et <b>−2,5</b>. Vérification : pour <i>x</i> = 4, ${eq3Tex('(4 - 4)(2 \\times 4 + 5) = 0 \\times 13 = 0')} ; pour <i>x</i> = −2,5, ${eq3Tex('(-2{,}5 - 4)(2 \\times (-2{,}5) + 5) = (-6{,}5) \\times 0 = 0')}.</li></ul>

<div class="lesson-header"><span class="num">3</span><h3>L'équation x² = a</h3></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tout nombre <i>a</i> :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.9;">
    <li><b>si</b> <i>a</i> &lt; 0 <b>alors</b> l'équation ${eq3Tex('x^2 = a')} <b>n'a pas de solution</b> ;</li>
    <li><b>si</b> <i>a</i> = 0 <b>alors</b> l'équation ${eq3Tex('x^2 = 0')} a <b>une seule solution</b> : 0 ;</li>
    <li><b>si</b> <i>a</i> &gt; 0 <b>alors</b> l'équation ${eq3Tex('x^2 = a')} a <b>deux solutions</b> : ${eq3Tex('\\sqrt{a}')} et ${eq3Tex('-\\sqrt{a}')}.</li></ul></div>
<p class="example-title">Preuve :</p>
<ul class="example-list">
  <li>Un carré est toujours positif (ou nul) : si <i>a</i> &lt; 0, aucun nombre n'a pour carré <i>a</i>.</li>
  <li>Si <i>a</i> &gt; 0 : ${eq3Tex('x^2 = a')} revient à ${eq3Tex('x^2 - a = 0')}, soit ${eq3Tex('x^2 - (\\sqrt{a})^2 = 0')}, c'est-à-dire ${eq3Tex('(x + \\sqrt{a})(x - \\sqrt{a}) = 0')} (différence de deux carrés). C'est une équation produit : ${eq3Tex('x = -\\sqrt{a}')} ou ${eq3Tex('x = \\sqrt{a}')}.</li>
</ul>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${eq3Tex('x^2 = -3')} n'a pas de solution, car −3 &lt; 0.</li>
  <li>${eq3Tex('x^2 = 7')} a deux solutions : ${eq3Tex('\\sqrt{7}')} et ${eq3Tex('-\\sqrt{7}')} (environ 2,65 et −2,65).</li>
  <li>${eq3Tex('x^2 = 49')} a deux solutions : ${eq3Tex('\\sqrt{49}')} et ${eq3Tex('-\\sqrt{49}')}, soit <b>7 et −7</b>.</li>
</ul>

<div class="lesson-header"><span class="num">4</span><h3>Résoudre un problème</h3></div>
<span class="prop-badge">Règle</span>
<div class="def-box">Pour résoudre un problème à l'aide d'une équation, on suit les étapes suivantes :
  <ol type="a" style="margin:6px 0 0;padding-left:24px;line-height:1.8;"><li><b>choix de l'inconnue</b> ;</li><li><b>mise en équation</b> ;</li><li><b>résolution</b> de l'équation ;</li><li><b>vérification</b> ;</li><li><b>conclusion</b> (une phrase qui répond à la question).</li></ol></div>
${r4Ex('Exemple : un père a 41 ans et son fils 9 ans. Dans combien d\'années le père aura-t-il le triple de l\'âge de son fils ?', [
  ['a. Soit <i>x</i> le nombre d\'années cherché.', 'Choix de l\'inconnue.'],
  ['b. ' + eq3Tex('41 + x = 3 \\times (9 + x)'), 'Dans x années, le père aura 41 + x ans et le fils 9 + x ans.'],
  ['c. ' + eq3Tex('41 + x = 27 + 3x') + ', donc ' + eq3Tex('14 = 2x') + ', soit ' + eq3Tex('x = 7'), 'Résolution.'],
  ['d. Dans 7 ans, le père aura 48 ans et le fils 16 ans ; et 3 × 16 = 48.', 'Vérification.'],
  ['e. Dans 7 ans, le père aura le triple de l\'âge de son fils.', 'Conclusion.'],
])}
`;

document.getElementById('histoire-demo-equations-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Selon une célèbre énigme grecque de l'<i>Anthologie palatine</i>, voici l'épitaphe du mathématicien <b>Diophante d'Alexandrie</b> (3e siècle), considéré comme l'un des pères de l'algèbre : « Passant, ici repose Diophante. Son enfance dura le sixième de sa vie ; au bout d'un douzième de plus, sa barbe poussa ; après un septième encore, il se maria. Cinq ans plus tard naquit son fils, qui vécut moitié moins que son père. Diophante mourut quatre ans après son fils. » Si <i>x</i> est l'âge de Diophante à sa mort, on obtient l'équation ${eq3Tex('\\dfrac{x}{6} + \\dfrac{x}{12} + \\dfrac{x}{7} + 5 + \\dfrac{x}{2} + 4 = x')}, dont la solution est <b>84</b>. À vous de vérifier ! Dans son ouvrage, les <i>Arithmétiques</i>, Diophante utilise déjà une abréviation pour désigner l'inconnue : c'est l'une des premières traces de notation algébrique.
</div>
`;

document.getElementById('methode-demo-equations-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : résoudre avec une balance</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Chaque sac contient <i>x</i> cubes (on ne sait pas combien) ; chaque cube pèse 1. Choisissez une équation, puis cliquez sur « Étape suivante » : on enlève la même chose sur les deux plateaux pour garder l'équilibre.</p>
  <div class="figure-toolbar" style="margin-bottom:4px;">${[[5, 2, 2, 14], [3, 5, 1, 11], [4, 1, 1, 13], [6, 3, 2, 15]].map(p => `<button class="btn secondary" onclick="eq3BalDepart(${p.join(',')})">${eq3BalTxt(p)}</button>`).join('')}</div>
  <svg id="eq3-balSvg" viewBox="0 0 520 250" style="width:100%;max-width:530px;display:block;margin:8px auto;"></svg>
  <div id="eq3-balEq" style="text-align:center;font-size:1.15rem;margin:4px 0;"></div>
  <div id="eq3-balNote" class="step-note" style="text-align:center;min-height:2.4em;margin:6px 0;"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eq3BalSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="eq3BalDepart()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : résoudre une équation produit</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez les nombres (entiers relatifs) : la résolution et la vérification s'affichent.</p>
  <div style="display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;font-size:1.15rem;">
    ${['a', 'b', 'c', 'd'].map((l, i) => `${i === 0 || i === 2 ? '(' : ''}<input id="eq3-p${l}" type="number" value="${[3, -12, 1, 5][i]}" style="width:58px;text-align:center;font-size:1rem;padding:4px;border-radius:6px;border:1px solid #C9D6E6;" oninput="eq3ProduitMaj()">${i === 0 || i === 2 ? '<i>x</i> +' : ')'}`).join(' ')} = 0
  </div>
  <div id="eq3-produit" style="line-height:1.9;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : combien de solutions pour x² = a ?</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">La courbe est celle des carrés (y = x²). Déplacez la droite horizontale y = <i>a</i> : les solutions de x² = <i>a</i> sont les abscisses des points d'intersection.</p>
  <svg id="eq3-parSvg" viewBox="0 0 460 300" style="width:100%;max-width:460px;display:block;margin:8px auto;"></svg>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:460px;margin:0 auto;">
    <label for="eq3-a" style="font-weight:700;"><i>a</i></label><input id="eq3-a" type="range" min="-4" max="14" step="0.5" value="7" oninput="eq3ParMaj()"><span id="eq3-aVal" style="font-family:'JetBrains Mono',monospace;min-width:44px;"></span>
  </div>
  <div id="eq3-parInfo" style="text-align:center;margin:10px 0 4px;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : mettre un problème en équation</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">La somme de trois nombres entiers consécutifs est égale à 144. Quels sont ces nombres ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="eq3-pbDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="eq3PbDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="eq3PbDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function eq3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="eq3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="eq3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-equations-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Résoudre une équation produit »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${eq3Tex('(x + 6)(3x - 12) = 0')}</span><span class="we-comment">L'équation à résoudre.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Si un produit de facteurs est nul, alors au moins un de ses facteurs est nul.</span><span class="we-comment">1. On cite la propriété.</span></div>
    <div class="we-row"><span class="we-expr">${eq3Tex('x + 6 = 0')} &nbsp; ou &nbsp; ${eq3Tex('3x - 12 = 0')}</span><span class="we-comment">2. Chaque facteur peut être nul.</span></div>
    <div class="we-row"><span class="we-expr">${eq3Tex('x = -6')} &nbsp; ou &nbsp; ${eq3Tex('x = 4')}</span><span class="we-comment">3. On résout les deux équations.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Les solutions sont −6 et 4.</span><span class="we-comment">4. On conclut.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${eq3Exo(1, 'Résous : ' + eq3Tex('3x - 7 = 11') + ' ; ' + eq3Tex('8x + 3 = 5x - 9') + ' ; ' + eq3Tex('2(x + 5) = 3x - 1') + '.', [
    eq3Tex('3x = 18') + ', donc ' + eq3Tex('x = 6') + '.', eq3Tex('3x = -12') + ', donc ' + eq3Tex('x = -4') + '.', eq3Tex('2x + 10 = 3x - 1') + ', donc ' + eq3Tex('11 = x') + ' : ' + eq3Tex('x = 11') + '.'])}
  ${eq3Exo(2, 'Résous : ' + eq3Tex('\\dfrac{x}{4} + 3 = 5') + ' et ' + eq3Tex('7 - 2x = 3x + 22') + '.', [
    eq3Tex('\\dfrac{x}{4} = 2') + ', donc ' + eq3Tex('x = 8') + '.', eq3Tex('7 - 22 = 3x + 2x') + ', soit ' + eq3Tex('-15 = 5x') + ', donc ' + eq3Tex('x = -3') + '.'])}
  ${eq3Exo(3, 'Résous les équations produits : ' + eq3Tex('(x + 6)(x - 1) = 0') + ' ; ' + eq3Tex('(3x - 12)(5 + x) = 0') + ' ; ' + eq3Tex('x(2x - 7) = 0') + '.', [
    'Solutions : −6 et 1.', eq3Tex('3x - 12 = 0') + ' ou ' + eq3Tex('5 + x = 0') + ' : solutions 4 et −5.', eq3Tex('x = 0') + ' ou ' + eq3Tex('2x - 7 = 0') + ' : solutions 0 et 3,5.'])}
  ${eq3Exo(4, 'Résous : ' + eq3Tex('x^2 = 81') + ' ; ' + eq3Tex('x^2 = 11') + ' ; ' + eq3Tex('x^2 + 4 = 0') + ' ; ' + eq3Tex('2x^2 = 50') + '.', [
    'Solutions 9 et −9.', 'Solutions ' + eq3Tex('\\sqrt{11}') + ' et ' + eq3Tex('-\\sqrt{11}') + '.', eq3Tex('x^2 = -4') + ' : pas de solution (un carré n\'est jamais négatif).', eq3Tex('x^2 = 25') + ' : solutions 5 et −5.'])}
  ${eq3Exo(5, 'Factorise ' + eq3Tex('x^2 - 25') + ', puis résous l\'équation ' + eq3Tex('x^2 - 25 = 0') + '.', [
    eq3Tex('x^2 - 25 = (x + 5)(x - 5)') + ' (différence de deux carrés).', 'Équation produit : ' + eq3Tex('x + 5 = 0') + ' ou ' + eq3Tex('x - 5 = 0') + ' : solutions −5 et 5.'])}
  ${eq3Exo(6, 'Un carré a une aire de 50 cm². Quelle est la longueur de son côté (valeur exacte, puis arrondie au millimètre) ?', [
    'Si c est le côté, ' + eq3Tex('c^2 = 50') + ' : ' + eq3Tex('c = \\sqrt{50}') + ' ou ' + eq3Tex('c = -\\sqrt{50}') + '.', 'Une longueur est positive : ' + eq3Tex('c = \\sqrt{50} \\approx 7{,}1') + ' cm.'])}
  ${eq3Exo(7, 'Au cinéma, 3 places adulte et 2 places enfant coûtent 47 €. Une place enfant coûte 4 € de moins qu\'une place adulte. Quel est le prix de chaque place ?', [
    'Soit x le prix d\'une place adulte : une place enfant coûte x − 4.', eq3Tex('3x + 2(x - 4) = 47') + ', soit ' + eq3Tex('5x - 8 = 47') + ', donc ' + eq3Tex('5x = 55') + ' et ' + eq3Tex('x = 11') + '.',
    'Vérification : 3 × 11 + 2 × 7 = 33 + 14 = 47.', 'Une place adulte coûte 11 € et une place enfant 7 €.'])}
  ${eq3Exo(8, 'Programme A : « choisir un nombre, le multiplier par 3, ajouter 5 ». Programme B : « choisir un nombre, ajouter 7, multiplier par 2 ». Quel nombre faut-il choisir pour obtenir le même résultat avec les deux programmes ?', [
    eq3Tex('3x + 5 = 2(x + 7)') + ', soit ' + eq3Tex('3x + 5 = 2x + 14') + ', donc ' + eq3Tex('x = 9') + '.', 'Vérification : 3 × 9 + 5 = 32 et 2 × (9 + 7) = 32. Il faut choisir 9.'])}
  ${eq3Exo(9, 'Résous l\'équation de l\'épitaphe de Diophante (rubrique « Un peu d\'histoire ») : ' + eq3Tex('\\dfrac{x}{6} + \\dfrac{x}{12} + \\dfrac{x}{7} + 5 + \\dfrac{x}{2} + 4 = x') + '.', [
    'On multiplie les deux membres par 84 (multiple commun de 6, 12, 7 et 2) : ' + eq3Tex('14x + 7x + 12x + 420 + 42x + 336 = 84x') + '.',
    eq3Tex('75x + 756 = 84x') + ', donc ' + eq3Tex('756 = 9x') + ' et ' + eq3Tex('x = 84') + '.', 'Diophante est mort à 84 ans.'])}
</div>
`;

/* ---- Méthode 1 : la balance ---- */
function eq3BalTxt(p){ const m = c => (c === 1 ? '' : c) + 'x'; return `${m(p[0])} + ${p[1]} = ${m(p[2])} + ${p[3]}`; }
let eq3Bal = { p: [5, 2, 2, 14], k: 0 };
function eq3BalEtats(p){
  const [a, b, c, d] = p, x = (d - b) / (a - c);
  return [
    { g: [a, b], dr: [c, d], ret: null, eq: `${eq3Bin(a, b)} = ${eq3Bin(c, d)}`, note: `La balance est en équilibre : ${a} sacs et ${b} cubes à gauche, ${c} sacs et ${d} cubes à droite.` },
    { g: [a, b], dr: [c, d], ret: [c, 0, c, 0], eq: `${eq3Bin(a, b)} ${eq3C(EQ3_VERT, '- ' + (c === 1 ? '' : c) + 'x')} = ${eq3Bin(c, d)} ${eq3C(EQ3_VERT, '- ' + (c === 1 ? '' : c) + 'x')}`, note: `On enlève ${c} sac${c > 1 ? 's' : ''} de chaque côté : la balance reste en équilibre.` },
    { g: [a - c, b], dr: [0, d], ret: [0, b, 0, b], eq: `${eq3Bin(a - c, b)} ${eq3C(EQ3_ROUGE, '- ' + b)} = ${d} ${eq3C(EQ3_ROUGE, '- ' + b)}`, note: `On enlève ${b} cube${b > 1 ? 's' : ''} de chaque côté.` },
    { g: [a - c, 0], dr: [0, d - b], ret: null, eq: `${eq3Bin(a - c, 0)} = ${d - b}`, note: `Il reste ${a - c} sacs d'un côté et ${d - b} cubes de l'autre.` },
    { g: [1, 0], dr: [0, x], ret: null, eq: `x = ${x}`, note: `On partage en ${a - c} parts égales (on divise par ${a - c}) : un sac pèse ${x}. La solution est x = ${x}.` },
  ];
}
function eq3BalDessin(){
  const svg = document.getElementById('eq3-balSvg'); if(!svg) return;
  const e = eq3BalEtats(eq3Bal.p)[eq3Bal.k], ret = e.ret;
  let h = `<path d="M240,235 L280,235 L265,110 L255,110 Z" fill="#8A919C"/><rect x="60" y="100" width="400" height="8" rx="4" fill="#4B5563"/><circle cx="260" cy="104" r="7" fill="#374151"/>`
    + `<path d="M50,110 L190,110 L175,140 L65,140 Z" fill="#D1D5DB" stroke="#6B7280"/><path d="M330,110 L470,110 L455,140 L345,140 Z" fill="#D1D5DB" stroke="#6B7280"/>`;
  const plateau = (x0, [sx, cu], r) => {
    let s = '', i = 0; const tot = sx + cu, par = 5;
    for(let k = 0; k < sx; k++, i++){ const x = x0 + (i % par) * 26, y = 86 - Math.floor(i / par) * 28, rouge = r && k < r[0];
      s += `<g opacity="${rouge ? .35 : 1}"><path d="M${x},${y + 18} Q${x - 2},${y + 2} ${x + 11},${y} Q${x + 24},${y + 2} ${x + 22},${y + 18} Z" fill="${rouge ? EQ3_ROUGE : '#C8A36B'}" stroke="#8B6B3A"/><text x="${x + 11}" y="${y + 14}" text-anchor="middle" font-size="11" font-style="italic" font-weight="700">x</text></g>`; }
    for(let k = 0; k < cu; k++, i++){ const x = x0 + (i % par) * 26 + 2, y = 88 - Math.floor(i / par) * 28, rouge = r && k < r[1];
      s += `<rect x="${x}" y="${y}" width="18" height="18" rx="2" fill="${rouge ? EQ3_ROUGE : '#5DADE2'}" opacity="${rouge ? .35 : 1}" stroke="#2E86C1"/><text x="${x + 9}" y="${y + 13}" text-anchor="middle" font-size="10" fill="#fff" font-weight="700">1</text>`; }
    return s;
  };
  h += plateau(58, e.g, ret ? [ret[0], ret[1]] : null) + plateau(338, e.dr, ret ? [ret[2], ret[3]] : null);
  svg.innerHTML = h;
  const eqEl = document.getElementById('eq3-balEq'); eqEl.innerHTML = eq3Tex(e.eq); renderStaticMath(eqEl);
  document.getElementById('eq3-balNote').textContent = e.note;
}
function eq3BalDepart(a, b, c, d){ if(a !== undefined) eq3Bal.p = [a, b, c, d]; eq3Bal.k = 0; eq3BalDessin(); }
function eq3BalSuivant(){ if(eq3Bal.k < 4) eq3Bal.k++; eq3BalDessin(); }

/* ---- Méthode 2 : équation produit ---- */
function eq3ProduitMaj(){
  const v = id => { const n = parseInt(document.getElementById(id).value, 10); return isNaN(n) ? 0 : Math.max(-50, Math.min(50, n)); };
  const a = v('eq3-pa'), b = v('eq3-pb'), c = v('eq3-pc'), d = v('eq3-pd'), out = document.getElementById('eq3-produit');
  if(a === 0 || c === 0){ out.innerHTML = '<p class="hint" style="text-align:center;margin:0;">Choisissez des coefficients de x non nuls (sinon un facteur ne contient pas x).</p>'; return; }
  const s1 = eq3Sol(a, b), s2 = eq3Sol(c, d), v1 = -b / a, v2 = -d / c, meme = Math.abs(v1 - v2) < 1e-12;
  const lignes = [
    [eq3Tex(`(${eq3Bin(a, b)})(${eq3Bin(c, d)}) = 0`), 'L\'équation produit.'],
    ['Si un produit de facteurs est nul, alors au moins un de ses facteurs est nul.', 'On cite la propriété.'],
    [eq3Tex(`${eq3Bin(a, b)} = 0`) + ' &nbsp; ou &nbsp; ' + eq3Tex(`${eq3Bin(c, d)} = 0`), 'Deux équations du premier degré.'],
    [eq3Tex(`x = ${s1}`) + ' &nbsp; ou &nbsp; ' + eq3Tex(`x = ${s2}`), 'On résout chacune.'],
    [meme ? `Les deux facteurs s'annulent pour la même valeur : l'équation a une seule solution, ${eq3Tex(s1.split(' = ')[0])}.` : `Les solutions sont ${eq3Tex(s1.split(' = ')[0])} et ${eq3Tex(s2.split(' = ')[0])}.`, 'Conclusion.'],
  ];
  out.innerHTML = r4Ex('', lignes); renderStaticMath(out);
}

/* ---- Méthode 3 : parabole ---- */
function eq3ParMaj(){
  const a = Number(document.getElementById('eq3-a').value), svg = document.getElementById('eq3-parSvg');
  document.getElementById('eq3-aVal').textContent = String(a).replace('.', ',').replace('-', '−');
  const X = x => 230 + x * 50, Y = y => 250 - y * 15;
  let h = '';
  for(let x = -4; x <= 4; x++) h += `<line x1="${X(x)}" y1="${Y(-4)}" x2="${X(x)}" y2="${Y(16)}" stroke="#EEF0F3"/>` + (x ? `<text x="${X(x)}" y="${Y(0) + 14}" text-anchor="middle" font-size="10" fill="#6B7280">${String(x).replace('-', '−')}</text>` : '');
  for(let y = -4; y <= 16; y += 2) h += `<line x1="${X(-4.4)}" y1="${Y(y)}" x2="${X(4.4)}" y2="${Y(y)}" stroke="#EEF0F3"/>` + (y ? `<text x="${X(0) - 6}" y="${Y(y) + 4}" text-anchor="end" font-size="10" fill="#6B7280">${String(y).replace('-', '−')}</text>` : '');
  h += `<line x1="${X(-4.4)}" y1="${Y(0)}" x2="${X(4.4)}" y2="${Y(0)}" stroke="${EQ3_ENCRE}"/><line x1="${X(0)}" y1="${Y(-4)}" x2="${X(0)}" y2="${Y(16)}" stroke="${EQ3_ENCRE}"/>`;
  let d = ''; for(let x = -4; x <= 4.001; x += 0.1) d += `${d ? 'L' : 'M'}${X(x).toFixed(1)},${Y(x * x).toFixed(1)}`;
  h += `<path d="${d}" fill="none" stroke="${EQ3_BLEU}" stroke-width="2.4"/><text x="${X(3.2)}" y="${Y(12.5)}" font-size="13" font-weight="700" fill="${EQ3_BLEU}">y = x²</text>`;
  h += `<line x1="${X(-4.4)}" y1="${Y(a)}" x2="${X(4.4)}" y2="${Y(a)}" stroke="${EQ3_ORANGE}" stroke-width="2.2"/><text x="${X(-4.3)}" y="${Y(a) - 6}" font-size="13" font-weight="700" fill="${EQ3_ORANGE}">y = ${String(a).replace('.', ',').replace('-', '−')}</text>`;
  const r = Math.sqrt(Math.max(a, 0)), carre = Number.isInteger(r);
  const rT = a > 0 ? (carre ? String(r) : `\\sqrt{${String(a).replace('.', '{,}')}}`) : '0';
  if(a >= 0) [r, -r].filter((v, i) => a > 0 || i === 0).forEach(v => { h += `<line x1="${X(v)}" y1="${Y(a)}" x2="${X(v)}" y2="${Y(0)}" stroke="${EQ3_ROUGE}" stroke-dasharray="4 3"/><circle cx="${X(v)}" cy="${Y(a)}" r="5" fill="${EQ3_ROUGE}"/><circle cx="${X(v)}" cy="${Y(0)}" r="4" fill="${EQ3_ROUGE}"/>`; });
  svg.innerHTML = h;
  const info = document.getElementById('eq3-parInfo');
  info.innerHTML = a < 0 ? `<b style="color:${EQ3_ROUGE};">Aucun point d'intersection</b> : ${eq3Tex('x^2 = ' + eq3Nb(a))} n'a pas de solution (un carré n'est jamais négatif).`
    : a === 0 ? `<b>Un seul point</b> : ${eq3Tex('x^2 = 0')} a une seule solution, 0.`
    : `<b>Deux points</b> : ${eq3Tex('x^2 = ' + eq3Nb(a))} a deux solutions, ${eq3Tex(rT)} et ${eq3Tex('-' + rT)}${carre ? '' : ` (environ ${String(Math.round(r * 100) / 100).replace('.', ',')} et −${String(Math.round(r * 100) / 100).replace('.', ',')})`}.`;
  renderStaticMath(info);
}

/* ---- Méthode 4 : problème ---- */
const EQ3_PB_STEPS = [
  { expr: 'a. Soit x le plus petit des trois nombres.', note: 'Choix de l\'inconnue : les deux autres sont alors x + 1 et x + 2.' },
  { expr: 'b. ' + eq3Tex('x + (x + 1) + (x + 2) = 144'), note: 'Mise en équation : la somme vaut 144.' },
  { expr: 'c. ' + eq3Tex('3x + 3 = 144') + ', donc ' + eq3Tex('3x = 141') + ' et ' + eq3Tex('x = 47'), note: 'Résolution.' },
  { expr: 'd. 47 + 48 + 49 = 144', note: 'Vérification.' },
  { expr: 'e. Les trois nombres sont 47, 48 et 49.', note: 'Conclusion : une phrase qui répond à la question.' },
];
const eq3PbDemo = makeStepDemo(EQ3_PB_STEPS, 'eq3-pbDisplay');

DEMO_REGISTRY['3e|Équations'] = {
  cours: 'cours-demo-equations-3e', methode: 'methode-demo-equations-3e', exos: 'exos-demo-equations-3e', histoire: 'histoire-demo-equations-3e',
  init: () => {
    eq3BalDepart(); eq3ProduitMaj(); eq3ParMaj(); eq3PbDemo.reset();
    ['cours-demo-equations-3e', 'methode-demo-equations-3e', 'exos-demo-equations-3e', 'histoire-demo-equations-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-equations-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-equations-3e'));
  }
};

DEMO_QUIZZES['3e|Équations'] = [
  { q: 'La solution de 5x + 2 = 2x + 14 est...', opts: ['4', '16/3', '12'], correct: 0 },
  { q: 'Pour résoudre 3x = 12, on...', opts: ['divise les deux membres par 3', 'soustrait 3 aux deux membres', 'multiplie par 12'], correct: 0 },
  { q: 'Les solutions de (x − 4)(x + 2) = 0 sont...', opts: ['4 et −2', '−4 et 2', '8'], correct: 0 },
  { q: 'L\'équation x² = −9 a...', opts: ['deux solutions : 3 et −3', 'aucune solution', 'une solution : −3'], correct: 1 },
  { q: 'Les solutions de x² = 36 sont...', opts: ['6 et −6', '18 et −18', '6 seulement'], correct: 0 },
  { q: 'Si A × B = 0, alors...', opts: ['A = 0 et B = 0', 'A = 0 ou B = 0', 'A = B'], correct: 1 },
  { q: 'Dans la résolution d\'un problème, la dernière étape est...', opts: ['la mise en équation', 'la vérification', 'la conclusion'], correct: 2 },
];

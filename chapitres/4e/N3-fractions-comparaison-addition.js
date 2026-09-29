/* ============================================================
   CHAPITRE : Fractions : comparaison et addition (4e, N3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "On avance en 4e." (captures du manuel p. 19-20 : égalité de quotients, réduction au
   même dénominateur, comparaison, addition et soustraction). Plan du manuel, titres reformulés,
   exemples nouveaux. Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js
   (chargé avant).
   ============================================================ */

const F4_BLEU = '#0C5BA0', F4_ORANGE = '#E07B00', F4_VERT = '#1E7B34', F4_ENCRE = '#1C1B2E';
const f4Pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a; };
const f4Ppcm = (a, b) => Math.abs(a * b) / f4Pgcd(a, b);
const f4Moins = n => String(n).replace('-', '−');
// Fraction en LaTeX (numérateur négatif écrit avec le signe devant la barre : plus lisible).
const f4T = (n, d) => d === 1 ? String(n) : (n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`);
const f4Tex = s => `<span class="tex">${s}</span>`;

document.getElementById('cours-demo-fractions-comp-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Un même quotient, plusieurs écritures</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Multiplier ou diviser le haut et le bas par un même nombre</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.9;">
  <li>Un quotient de deux nombres relatifs <b>ne change pas</b> quand on <b>multiplie</b> son numérateur et son dénominateur par un <b>même nombre relatif non nul</b>.</li>
  <li>Un quotient de deux nombres relatifs <b>ne change pas</b> quand on <b>divise</b> son numérateur et son dénominateur par un <b>même nombre relatif non nul</b>.</li>
  <li>Autrement dit, pour tous nombres <i>a</i>, <i>b</i> et <i>k</i> avec <i>b</i> ≠ 0 et <i>k</i> ≠ 0 : ${f4Tex('\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}')} et ${f4Tex('\\dfrac{a}{b} = \\dfrac{a \\div k}{b \\div k}')}.</li>
</ul></div>
${r4Ex('Exemples :', [
  [f4Tex('\\dfrac{-18}{24} = \\dfrac{-3 \\times \\mathbf{6}}{4 \\times \\mathbf{6}} = \\dfrac{-3}{4}'), 'On a reconnu le facteur commun 6 : on simplifie par 6.'],
  [f4Tex('\\dfrac{-56}{-42} = \\dfrac{4 \\times (\\mathbf{-14})}{3 \\times (\\mathbf{-14})} = \\dfrac{4}{3}'), 'On simplifie par −14 : le résultat est positif.'],
  [f4Tex('\\dfrac{20}{-12} = \\dfrac{20 \\div (\\mathbf{-4})}{-12 \\div (\\mathbf{-4})} = \\dfrac{-5}{3} = -\\dfrac{5}{3}'), 'On divise par −4 pour avoir un dénominateur positif.'],
])}
<div class="redaction-note" ${R4_REM}>Remarque : grâce à cette propriété, on peut toujours écrire un quotient avec un <b>dénominateur positif</b> : ${f4Tex('\\dfrac{a}{-b} = \\dfrac{-a}{b} = -\\dfrac{a}{b}')} et ${f4Tex('\\dfrac{-a}{-b} = \\dfrac{a}{b}')}.</div>

<div class="sub-header"><span class="letter">B</span><h4>Mettre deux fractions au même dénominateur</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box"><b>Réduire</b> deux quotients <b>au même dénominateur</b>, c'est trouver deux quotients qui leur sont respectivement <b>égaux</b> et qui ont le <b>même dénominateur</b>. On choisit en général le <b>plus petit multiple commun</b> des deux dénominateurs.</div>
${r4Ex('Cas 1 : ' + f4Tex('\\dfrac{7}{4}') + ' et ' + f4Tex('\\dfrac{5}{12}') + ' -- un dénominateur est un multiple de l\'autre.', [
  ['12 est un multiple de 4 (12 = 4 × 3) : le dénominateur commun est ' + R4_BLEU('12') + '.', ''],
  [f4Tex('\\dfrac{7}{4} = \\dfrac{7 \\times \\mathbf{3}}{4 \\times \\mathbf{3}} = \\dfrac{21}{12}') + ' et ' + f4Tex('\\dfrac{5}{12}'), 'Seule la première fraction change.'],
])}
${r4Ex('Cas 2 : ' + f4Tex('\\dfrac{3}{5}') + ' et ' + f4Tex('\\dfrac{4}{7}') + ' -- les dénominateurs n\'ont aucun diviseur commun (autre que 1).', [
  ['5 et 7 sont premiers : leur plus petit multiple commun est leur produit 5 × 7 = ' + R4_BLEU('35') + '.', ''],
  [f4Tex('\\dfrac{3}{5} = \\dfrac{3 \\times \\mathbf{7}}{5 \\times \\mathbf{7}} = \\dfrac{21}{35}') + ' et ' + f4Tex('\\dfrac{4}{7} = \\dfrac{4 \\times \\mathbf{5}}{7 \\times \\mathbf{5}} = \\dfrac{20}{35}'), 'Chaque fraction est multipliée par le dénominateur de l\'autre.'],
])}
${r4Ex('Cas 3 : ' + f4Tex('\\dfrac{5}{6}') + ' et ' + f4Tex('\\dfrac{7}{8}') + ' -- le cas général.', [
  ['Multiples de 6 : 6 ; 12 ; 18 ; ' + R4_BLEU('24') + ' ; 30…', 'On écrit les multiples de chaque dénominateur…'],
  ['Multiples de 8 : 8 ; 16 ; ' + R4_BLEU('24') + ' ; 32…', '… jusqu\'au premier multiple commun : 24.'],
  [f4Tex('\\dfrac{5}{6} = \\dfrac{5 \\times \\mathbf{4}}{6 \\times \\mathbf{4}} = \\dfrac{20}{24}') + ' et ' + f4Tex('\\dfrac{7}{8} = \\dfrac{7 \\times \\mathbf{3}}{8 \\times \\mathbf{3}} = \\dfrac{21}{24}'), '24 = 6 × 4 = 8 × 3.'],
])}
<div class="redaction-note" ${R4_REM}>Remarque : on peut aussi utiliser la décomposition en facteurs premiers (chapitre Divisibilité) : 6 = 2 × 3 et 8 = 2 × 2 × 2. Le plus petit multiple commun contient chaque facteur autant de fois qu'il apparaît au maximum : 2 × 2 × 2 × 3 = 24.</div>

<div class="lesson-header"><span class="num">2</span><h3>Comparer deux fractions</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Quand les dénominateurs sont égaux</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Deux fractions qui ont le <b>même dénominateur positif</b> sont rangées dans le <b>même ordre que leurs numérateurs</b>.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>13 > 4, donc ${f4Tex('\\dfrac{13}{9} > \\dfrac{4}{9}')}.</li>
  <li>−11 < −3, donc ${f4Tex('\\dfrac{-11}{8} < \\dfrac{-3}{8}')}.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Attention : si un dénominateur est négatif, on commence par l'écrire avec un dénominateur positif (voir 1 A).</div>

<div class="sub-header"><span class="letter">B</span><h4>Quand les dénominateurs sont différents</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour comparer deux fractions de <b>dénominateurs différents</b>, on les <b>réduit au même dénominateur</b> (positif), puis on compare leurs <b>numérateurs</b>.</div>
${r4Ex('Exemple 1 : comparer ' + f4Tex('\\dfrac{13}{6}') + ' et ' + f4Tex('\\dfrac{25}{12}') + '.', [
  ['12 est un multiple de 6 : on prend 12 comme dénominateur commun.', ''],
  [f4Tex('\\dfrac{13}{6} = \\dfrac{13 \\times \\mathbf{2}}{6 \\times \\mathbf{2}} = \\dfrac{26}{12}'), 'On réduit au même dénominateur.'],
  ['Or 26 > 25, donc ' + f4Tex('\\dfrac{26}{12} > \\dfrac{25}{12}') + ', c\'est-à-dire ' + f4Tex('\\dfrac{13}{6} > \\dfrac{25}{12}') + '.', 'On compare les numérateurs et on conclut avec les fractions de départ.'],
])}
${r4Ex('Exemple 2 : comparer ' + f4Tex('\\dfrac{-4}{9}') + ' et ' + f4Tex('\\dfrac{-5}{12}') + '.', [
  ['Multiples de 9 : 9 ; 18 ; 27 ; ' + R4_BLEU('36') + '… et de 12 : 12 ; 24 ; ' + R4_BLEU('36') + '…', 'Le plus petit multiple commun de 9 et 12 est 36.'],
  [f4Tex('\\dfrac{-4}{9} = \\dfrac{-4 \\times \\mathbf{4}}{9 \\times \\mathbf{4}} = \\dfrac{-16}{36}') + ' et ' + f4Tex('\\dfrac{-5}{12} = \\dfrac{-5 \\times \\mathbf{3}}{12 \\times \\mathbf{3}} = \\dfrac{-15}{36}'), ''],
  ['Or −16 < −15, donc ' + f4Tex('\\dfrac{-16}{36} < \\dfrac{-15}{36}') + ', c\'est-à-dire ' + f4Tex('\\dfrac{-4}{9} < \\dfrac{-5}{12}') + '.', 'Attention au sens avec les nombres négatifs !'],
])}

<div class="lesson-header"><span class="num">3</span><h3>Additionner et soustraire des fractions</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Quand les dénominateurs sont égaux</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour <b>additionner</b> (ou <b>soustraire</b>) deux fractions de <b>même dénominateur</b>, on additionne (ou on soustrait) les <b>numérateurs</b> et on <b>garde</b> le dénominateur commun.<br>
Pour tous nombres <i>a</i>, <i>b</i> et <i>c</i> avec <i>c</i> ≠ 0 : ${f4Tex('\\dfrac{a}{c} + \\dfrac{b}{c} = \\dfrac{a + b}{c}')} et ${f4Tex('\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a - b}{c}')}.</div>
${r4Ex('Exemples :', [
  [f4Tex('A = \\dfrac{4}{9} + \\dfrac{11}{9} = \\dfrac{4 + 11}{9} = \\dfrac{15}{9} = \\dfrac{5}{3}'), 'On additionne les numérateurs, puis on simplifie par 3.'],
  [f4Tex('B = \\dfrac{3}{10} - \\dfrac{17}{10} = \\dfrac{3 - 17}{10} = \\dfrac{-14}{10} = -\\dfrac{7}{5}'), 'On soustrait les numérateurs, puis on simplifie par 2.'],
])}
<div class="redaction-note" ${R4_REM}>Attention : on n'additionne <b>jamais</b> les dénominateurs ! ${f4Tex('\\dfrac{4}{9} + \\dfrac{11}{9}')} est égal à ${f4Tex('\\dfrac{15}{9}')} et non à ${f4Tex('\\dfrac{15}{18}')} : on ajoute des neuvièmes à des neuvièmes, le résultat est toujours en neuvièmes.</div>

<div class="sub-header"><span class="letter">B</span><h4>Quand les dénominateurs sont différents</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour additionner (ou soustraire) deux fractions de <b>dénominateurs différents</b>, on commence par les <b>réduire au même dénominateur</b>, puis on applique la propriété précédente.</div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:0 18px;">
<div>${r4Ex('Exemple 1 :', [
  [f4Tex('C = \\dfrac{5}{6} + \\dfrac{3}{4}'), ''],
  [f4Tex('C = \\dfrac{5 \\times \\mathbf{2}}{6 \\times \\mathbf{2}} + \\dfrac{3 \\times \\mathbf{3}}{4 \\times \\mathbf{3}}'), ''],
  [f4Tex('C = \\dfrac{10}{12} + \\dfrac{9}{12}'), ''],
  [f4Tex('C = \\dfrac{19}{12}'), ''],
])}</div>
<div>${r4Ex('Exemple 2 :', [
  [f4Tex('D = \\dfrac{2}{3} - \\dfrac{7}{5}'), ''],
  [f4Tex('D = \\dfrac{2 \\times \\mathbf{5}}{3 \\times \\mathbf{5}} - \\dfrac{7 \\times \\mathbf{3}}{5 \\times \\mathbf{3}}'), ''],
  [f4Tex('D = \\dfrac{10}{15} - \\dfrac{21}{15}'), ''],
  [f4Tex('D = -\\dfrac{11}{15}'), ''],
])}</div>
<div>${r4Ex('Exemple 3 :', [
  [f4Tex('E = -3 + \\dfrac{7}{10} - \\dfrac{4}{15}'), ''],
  [f4Tex('E = \\dfrac{-3 \\times \\mathbf{30}}{1 \\times \\mathbf{30}} + \\dfrac{7 \\times \\mathbf{3}}{10 \\times \\mathbf{3}} - \\dfrac{4 \\times \\mathbf{2}}{15 \\times \\mathbf{2}}'), ''],
  [f4Tex('E = \\dfrac{-90}{30} + \\dfrac{21}{30} - \\dfrac{8}{30}'), ''],
  [f4Tex('E = -\\dfrac{77}{30}'), ''],
])}</div>
</div>
<div class="redaction-note" ${R4_REM}>Remarques : un nombre entier est une fraction de dénominateur 1 (−3 = ${f4Tex('\\dfrac{-3}{1}')}). À la fin d'un calcul, on donne le résultat sous forme de <b>fraction irréductible</b> (on simplifie si c'est possible).</div>
`;

document.getElementById('histoire-demo-fractions-comp-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Il y a près de 4 000 ans, les scribes égyptiens calculaient déjà avec des fractions, mais presque uniquement avec des fractions de numérateur 1 (les « fractions unitaires »). Le <b>papyrus Rhind</b>, copié vers 1650 avant J.-C. par le scribe <b>Ahmès</b>, contient une table qui écrit par exemple ${f4Tex('\\dfrac{2}{5}')} sous la forme ${f4Tex('\\dfrac{1}{3} + \\dfrac{1}{15}')} : additionner des fractions était donc pour eux un exercice quotidien ! La <b>barre de fraction</b> horizontale apparaît plus tard chez les mathématiciens arabes (on la trouve au 12e siècle chez <b>al-Hassar</b>), puis se répand en Europe grâce au <i>Liber abaci</i> de <b>Fibonacci</b> (1202). Les mots eux-mêmes racontent l'idée de la fraction : le <b>dénominateur</b> (du latin <i>denominare</i>, « nommer ») donne le nom des parts -- des tiers, des quarts, des douzièmes… -- et le <b>numérateur</b> (de <i>numerus</i>, « nombre ») compte combien on en prend. C'est pour cela qu'on ne peut additionner que des parts de même nom : des douzièmes avec des douzièmes !
</div>
`;

document.getElementById('methode-demo-fractions-comp-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : trouver le plus petit dénominateur commun</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez deux dénominateurs, puis cliquez sur « Chercher » : les multiples de chacun s'écrivent jusqu'au premier multiple commun.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <label>Dénominateurs : <input id="f4-mD1" type="number" min="2" max="30" value="6" style="width:64px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;"></label>
    <label>et <input id="f4-mD2" type="number" min="2" max="30" value="8" style="width:64px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" onkeydown="if(event.key==='Enter') f4MultChercher()"></label>
    <button class="btn" onclick="f4MultChercher()">Chercher</button>
  </div>
  <div id="f4-mListes" style="max-width:640px;margin:0 auto;"></div>
  <div id="f4-mRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : voir pourquoi il faut le même dénominateur, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="f4-barresSvg" viewBox="0 0 520 200" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="f4-barresSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="f4-barresNext" onclick="f4BarresDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="f4BarresDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : comparer, additionner ou soustraire deux fractions</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez deux fractions (numérateurs et dénominateurs entiers relatifs), choisissez l'opération : la rédaction complète s'affiche.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    ${f4SaisieFraction('f4-cA', -4, 'f4-cB', 9)}
    <select id="f4-cOp" style="padding:7px 8px;border-radius:8px;border:1px solid #C9D6E6;font-size:1rem;">
      <option value="cmp">comparer à</option><option value="+">+</option><option value="-">−</option>
    </select>
    ${f4SaisieFraction('f4-cC', -5, 'f4-cD', 12)}
    <button class="btn" onclick="f4Calculer()">Rédiger</button>
  </div>
  <div id="f4-cRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : un calcul avec un entier et trois termes</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="f4-calcDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="f4CalcDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="f4CalcDemo.reset()">Recommencer</button>
  </div>
</div>
`;
function f4SaisieFraction(idN, n, idD, d){
  const st = 'width:62px;padding:5px 6px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:\'JetBrains Mono\',monospace;font-size:1rem;';
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px;"><input id="${idN}" type="number" value="${n}" style="${st}" onkeydown="if(event.key==='Enter') f4Calculer()"><span style="display:block;width:70px;border-top:2px solid ${F4_ENCRE};"></span><input id="${idD}" type="number" value="${d}" style="${st}" onkeydown="if(event.key==='Enter') f4Calculer()"></span>`;
}

// Exercice avec correction repliable (même présentation que N1 et N2).
function f4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="f4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="f4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-fractions-comp-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer une différence de deux fractions »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${f4Tex('F = \\dfrac{7}{12} - \\dfrac{5}{18}')}</span><span class="we-comment">Les dénominateurs sont différents.</span></div>
    <div class="we-row"><span class="we-expr" style="font-family:inherit;">Multiples de 12 : 12 ; 24 ; 36. Multiples de 18 : 18 ; 36.</span><span class="we-comment">On cherche le plus petit multiple commun : 36.</span></div>
    <div class="we-row"><span class="we-expr">${f4Tex('F = \\dfrac{7 \\times 3}{12 \\times 3} - \\dfrac{5 \\times 2}{18 \\times 2}')}</span><span class="we-comment">On réduit au même dénominateur.</span></div>
    <div class="we-row"><span class="we-expr">${f4Tex('F = \\dfrac{21}{36} - \\dfrac{10}{36}')}</span><span class="we-comment">On effectue les produits.</span></div>
    <div class="we-row"><span class="we-expr">${f4Tex('F = \\dfrac{11}{36}')}</span><span class="we-comment">On soustrait les numérateurs ; 11 et 36 n'ont pas de diviseur commun : c'est terminé.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${f4Exo(1, 'Complète les égalités : ' + f4Tex('\\dfrac{-21}{35} = \\dfrac{\\ldots}{5}') + ' ; ' + f4Tex('\\dfrac{16}{-24} = \\dfrac{-2}{\\ldots}') + ' ; ' + f4Tex('\\dfrac{4}{-9} = \\dfrac{\\ldots}{27}') + '.', [
    f4Tex('\\dfrac{-21}{35} = \\dfrac{-21 \\div 7}{35 \\div 7} = \\dfrac{-3}{5}'),
    f4Tex('\\dfrac{16}{-24} = \\dfrac{16 \\div (-8)}{-24 \\div (-8)} = \\dfrac{-2}{3}'),
    f4Tex('\\dfrac{4}{-9} = \\dfrac{4 \\times (-3)}{-9 \\times (-3)} = \\dfrac{-12}{27}')])}
  ${f4Exo(2, 'Réduis au même dénominateur : a) ' + f4Tex('\\dfrac{3}{8}') + ' et ' + f4Tex('\\dfrac{5}{24}') + ' ; b) ' + f4Tex('\\dfrac{2}{9}') + ' et ' + f4Tex('\\dfrac{5}{6}') + ' ; c) ' + f4Tex('\\dfrac{-7}{10}') + ' et ' + f4Tex('\\dfrac{4}{15}') + '.', [
    'a) 24 = 8 × 3 : ' + f4Tex('\\dfrac{3}{8} = \\dfrac{9}{24}') + ' et ' + f4Tex('\\dfrac{5}{24}') + '.',
    'b) Plus petit multiple commun de 9 et 6 : 18. ' + f4Tex('\\dfrac{2}{9} = \\dfrac{4}{18}') + ' et ' + f4Tex('\\dfrac{5}{6} = \\dfrac{15}{18}') + '.',
    'c) Plus petit multiple commun de 10 et 15 : 30. ' + f4Tex('\\dfrac{-7}{10} = \\dfrac{-21}{30}') + ' et ' + f4Tex('\\dfrac{4}{15} = \\dfrac{8}{30}') + '.'])}
  ${f4Exo(3, 'Range dans l\'ordre croissant : ' + f4Tex('\\dfrac{5}{12}') + ' ; ' + f4Tex('\\dfrac{3}{4}') + ' ; ' + f4Tex('\\dfrac{2}{3}') + ' ; ' + f4Tex('\\dfrac{7}{12}') + ' ; ' + f4Tex('\\dfrac{1}{2}') + '.', [
    'On écrit tout en douzièmes : ' + f4Tex('\\dfrac{5}{12}') + ' ; ' + f4Tex('\\dfrac{9}{12}') + ' ; ' + f4Tex('\\dfrac{8}{12}') + ' ; ' + f4Tex('\\dfrac{7}{12}') + ' ; ' + f4Tex('\\dfrac{6}{12}') + '.',
    'On range les numérateurs : 5 < 6 < 7 < 8 < 9.',
    'Donc ' + f4Tex('\\dfrac{5}{12} < \\dfrac{1}{2} < \\dfrac{7}{12} < \\dfrac{2}{3} < \\dfrac{3}{4}') + '.'])}
  ${f4Exo(4, 'Compare : a) ' + f4Tex('\\dfrac{-5}{6}') + ' et ' + f4Tex('\\dfrac{-7}{9}') + ' ; b) ' + f4Tex('\\dfrac{11}{8}') + ' et ' + f4Tex('\\dfrac{17}{12}') + '.', [
    'a) Dénominateur commun 18 : ' + f4Tex('\\dfrac{-5}{6} = \\dfrac{-15}{18}') + ' et ' + f4Tex('\\dfrac{-7}{9} = \\dfrac{-14}{18}') + '. Or −15 < −14, donc ' + f4Tex('\\dfrac{-5}{6} < \\dfrac{-7}{9}') + '.',
    'b) Dénominateur commun 24 : ' + f4Tex('\\dfrac{11}{8} = \\dfrac{33}{24}') + ' et ' + f4Tex('\\dfrac{17}{12} = \\dfrac{34}{24}') + '. Or 33 < 34, donc ' + f4Tex('\\dfrac{11}{8} < \\dfrac{17}{12}') + '.'])}
  ${f4Exo(5, 'Calcule et donne le résultat sous forme irréductible : ' + f4Tex('A = \\dfrac{13}{15} + \\dfrac{7}{15}') + ' ; ' + f4Tex('B = \\dfrac{5}{12} - \\dfrac{11}{12}') + ' ; ' + f4Tex('C = \\dfrac{-4}{7} - \\dfrac{9}{7}') + '.', [
    f4Tex('A = \\dfrac{13 + 7}{15} = \\dfrac{20}{15} = \\dfrac{4}{3}'),
    f4Tex('B = \\dfrac{5 - 11}{12} = \\dfrac{-6}{12} = -\\dfrac{1}{2}'),
    f4Tex('C = \\dfrac{-4 - 9}{7} = -\\dfrac{13}{7}')])}
  ${f4Exo(6, 'Calcule et donne le résultat sous forme irréductible : ' + f4Tex('D = \\dfrac{3}{4} + \\dfrac{5}{6}') + ' ; ' + f4Tex('E = \\dfrac{7}{10} - \\dfrac{8}{15}') + ' ; ' + f4Tex('F = -2 + \\dfrac{5}{6}') + '.', [
    f4Tex('D = \\dfrac{9}{12} + \\dfrac{10}{12} = \\dfrac{19}{12}'),
    f4Tex('E = \\dfrac{21}{30} - \\dfrac{16}{30} = \\dfrac{5}{30} = \\dfrac{1}{6}'),
    f4Tex('F = \\dfrac{-12}{6} + \\dfrac{5}{6} = -\\dfrac{7}{6}')])}
  ${f4Exo(7, 'Dans un collège, ' + f4Tex('\\dfrac{3}{8}') + ' des élèves viennent en bus, ' + f4Tex('\\dfrac{1}{3}') + ' à pied et les autres en voiture. a) Quelle fraction des élèves vient en voiture ? b) Le collège compte 480 élèves : combien viennent en voiture ?', [
    'a) ' + f4Tex('1 - \\dfrac{3}{8} - \\dfrac{1}{3} = \\dfrac{24}{24} - \\dfrac{9}{24} - \\dfrac{8}{24} = \\dfrac{7}{24}') + ' : les ' + f4Tex('\\dfrac{7}{24}') + ' des élèves viennent en voiture.',
    'b) 480 ÷ 24 = 20 et 20 × 7 = 140 : <b>140 élèves</b> viennent en voiture.'])}
  ${f4Exo(8, 'Tom a écrit : ' + f4Tex('\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{3}{7}') + '. Explique son erreur et corrige-la.', [
    'Tom a additionné les numérateurs <b>et</b> les dénominateurs : c\'est faux. D\'ailleurs ' + f4Tex('\\dfrac{3}{7}') + ' est plus petit que ' + f4Tex('\\dfrac{2}{3}') + ', alors qu\'on a ajouté un nombre positif !',
    'Correction : ' + f4Tex('\\dfrac{2}{3} + \\dfrac{1}{4} = \\dfrac{8}{12} + \\dfrac{3}{12} = \\dfrac{11}{12}') + '.'])}
</div>
`;

/* ---- Méthode 1 : listes de multiples animées ---- */
let f4MultTimer = null;
function f4Puce(v, id){ return `<span id="${id}" style="display:inline-block;min-width:34px;text-align:center;padding:4px 6px;margin:3px;border-radius:7px;background:#fff;border:1px solid #D9DEE6;font-family:'JetBrains Mono',monospace;opacity:0;transform:scale(.6);transition:opacity .25s,transform .25s,background .3s,color .3s;">${v}</span>`; }
function f4MultChercher(){
  clearInterval(f4MultTimer);
  const lire = id => Math.round(Number(document.getElementById(id).value));
  const d1 = lire('f4-mD1'), d2 = lire('f4-mD2'), out = document.getElementById('f4-mListes'), res = document.getElementById('f4-mRes');
  if(!(d1 >= 2 && d1 <= 30 && d2 >= 2 && d2 <= 30)){ out.innerHTML = ''; res.innerHTML = 'Choisissez deux nombres entiers entre 2 et 30.'; return; }
  const m = f4Ppcm(d1, d2), k1 = m / d1, k2 = m / d2;
  const ligne = (d, k, cle) => `<div style="margin:6px 0;"><b>Multiples de ${d} :</b> ${Array.from({ length: k }, (_, i) => f4Puce(d * (i + 1), `f4-m${cle}-${i}`)).join('')}</div>`;
  out.innerHTML = ligne(d1, k1, 'a') + ligne(d2, k2, 'b');
  res.innerHTML = '';
  // Les deux listes avancent ensemble, un multiple à la fois.
  let i = 0; const n = Math.max(k1, k2);
  const montrer = el => { if(el){ el.style.opacity = 1; el.style.transform = 'scale(1)'; } };
  f4MultTimer = setInterval(() => {
    if(i < n){ montrer(document.getElementById(`f4-ma-${i}`)); montrer(document.getElementById(`f4-mb-${i}`)); i++; return; }
    clearInterval(f4MultTimer);
    [`f4-ma-${k1 - 1}`, `f4-mb-${k2 - 1}`].forEach(id => { const el = document.getElementById(id); el.style.background = F4_VERT; el.style.color = '#fff'; el.style.borderColor = F4_VERT; el.style.fontWeight = '700'; });
    res.innerHTML = `Le plus petit multiple commun est <b style="color:${F4_VERT};">${m}</b> = ${d1} × ${k1} = ${d2} × ${k2}.<br>On multiplie le numérateur et le dénominateur de la fraction de dénominateur ${d1} par <b>${k1}</b>, ceux de l'autre par <b>${k2}</b>.`
      + (m === d1 * d2 ? ` <span style="color:#4E5665;">(Ici, c'est le produit ${d1} × ${d2} : ${d1} et ${d2} n'ont pas de diviseur commun autre que 1.)</span>` : '');
  }, n > 12 ? 140 : 320);
}

/* ---- Méthode 2 : barres de fractions (cahier : une image par étape, via registerGeoStepDemo) ---- */
// Fraction écrite dans le SVG (numérateur, barre, dénominateur).
function f4FracSvg(x, y, n, d, coul){
  return `<text x="${x}" y="${y - 5}" text-anchor="middle" font-size="16" font-weight="700" fill="${coul}">${n}</text><line x1="${x - 13}" y1="${y}" x2="${x + 13}" y2="${y}" stroke="${coul}" stroke-width="2"/><text x="${x}" y="${y + 17}" text-anchor="middle" font-size="16" font-weight="700" fill="${coul}">${d}</text>`;
}
// Barre unité de largeur 360 découpée en « parts » ; couleurs[i] = remplissage de la part i (ou null).
// fines : nombre de sous-parts par part (traits fins, pour montrer le redécoupage).
function f4Barre(y, parts, couleurs, fines){
  const x0 = 110, L = 360, h = 34, w = L / parts;
  let s = '';
  for(let i = 0; i < parts; i++) s += `<rect x="${x0 + i * w}" y="${y}" width="${w}" height="${h}" fill="${couleurs[i] || '#fff'}" fill-opacity="${couleurs[i] ? .85 : 1}"/>`;
  if(fines > 1) for(let i = 0; i < parts * fines; i++) if(i % fines) s += `<line x1="${x0 + i * w / fines}" y1="${y}" x2="${x0 + i * w / fines}" y2="${y + h}" stroke="${F4_ENCRE}" stroke-width="1" stroke-dasharray="3 3"/>`;
  for(let i = 1; i < parts; i++) s += `<line x1="${x0 + i * w}" y1="${y}" x2="${x0 + i * w}" y2="${y + h}" stroke="${F4_ENCRE}" stroke-width="1.6"/>`;
  return s + `<rect x="${x0}" y="${y}" width="${L}" height="${h}" fill="none" stroke="${F4_ENCRE}" stroke-width="2"/>`;
}
const f4Rep = (n, c, total) => Array.from({ length: total }, (_, i) => i < n ? c : null);
function f4BarresDessin(k){
  const B = F4_BLEU, O = F4_ORANGE;
  let s = '';
  if(k <= 2){
    s += f4FracSvg(40, 52, k >= 1 ? 10 : 5, k >= 1 ? 12 : 6, B) + (k >= 1 ? `<text x="80" y="58" text-anchor="middle" font-size="12" fill="#4E5665">= 5/6</text>` : '');
    // Étape 1 : les nouveaux traits (pointillés) coupent chaque sixième en 2 ; ensuite, douzièmes pleins.
    s += k === 0 ? f4Barre(36, 6, f4Rep(5, B, 6), 1) : k === 1 ? f4Barre(36, 6, f4Rep(5, B, 6), 2) : f4Barre(36, 12, f4Rep(10, B, 12), 1);
    s += f4FracSvg(40, 132, k >= 2 ? 9 : 3, k >= 2 ? 12 : 4, O) + (k >= 2 ? `<text x="80" y="138" text-anchor="middle" font-size="12" fill="#4E5665">= 3/4</text>` : '');
    s += k === 2 ? f4Barre(116, 4, f4Rep(3, O, 4), 3) : f4Barre(116, 4, f4Rep(3, O, 4), 1);
    if(k === 0) s += `<text x="290" y="100" text-anchor="middle" font-size="14" fill="#4E5665">Des sixièmes et des quarts : des parts de tailles différentes.</text>`;
    if(k === 1) s += `<text x="290" y="100" text-anchor="middle" font-size="14" fill="${B}">Chaque sixième est coupé en 2 : 5 sixièmes = 10 douzièmes.</text>`;
    if(k === 2) s += `<text x="290" y="100" text-anchor="middle" font-size="14" fill="${O}">Chaque quart est coupé en 3 : 3 quarts = 9 douzièmes.</text>`;
    return s;
  }
  // k = 3 : les 10 + 9 douzièmes mis bout à bout remplissent une unité et 7 douzièmes d'une autre.
  s += f4FracSvg(40, 88, 19, 12, F4_VERT);
  s += f4Barre(36, 12, f4Rep(10, B, 12).map((c, i) => c || O), 1);
  s += f4Barre(116, 12, f4Rep(7, O, 12), 1);
  s += `<text x="290" y="100" text-anchor="middle" font-size="14" fill="${F4_VERT}">10 + 9 = 19 douzièmes = 1 unité + 7 douzièmes</text>`;
  s += `<text x="290" y="182" text-anchor="middle" font-size="16" font-weight="700" fill="${F4_ENCRE}">5/6 + 3/4 = 10/12 + 9/12 = 19/12</text>`;
  return s;
}
const F4_BARRES_NOTES = [
  'On veut calculer 5/6 + 3/4. Les parts n\'ont pas la même taille : on ne peut pas simplement les compter ensemble.',
  'On découpe chaque sixième en 2 : on obtient des douzièmes, et 5/6 = 10/12 (on a multiplié le haut et le bas par 2).',
  'On découpe chaque quart en 3 : on obtient aussi des douzièmes, et 3/4 = 9/12 (on a multiplié le haut et le bas par 3).',
  'Les parts ont maintenant la même taille : on les compte. 10 + 9 = 19 douzièmes, soit 5/6 + 3/4 = 19/12 (une unité entière et 7 douzièmes).',
];
function f4Etapes(svgId, listeId, btnId, n, dessiner, notes){
  let k = 0;
  const maj = () => {
    const s = document.getElementById(svgId); if(s) s.innerHTML = dessiner(k);
    document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
    const b = document.getElementById(btnId); if(b){ b.disabled = k >= n - 1; b.textContent = k >= n - 1 ? 'Terminé ✓' : 'Étape suivante →'; }
  };
  const demo = {
    init(){ const l = document.getElementById(listeId); if(l) l.innerHTML = notes.map((t, i) => `<div class="step-item" data-step="${i + 1}"><div class="step-num">${i + 1}</div><div>${t}</div></div>`).join(''); k = 0; maj(); },
    next(){ if(k < n - 1){ k++; maj(); } },
    reset(){ k = 0; maj(); },
    goto(i){ k = Math.max(0, Math.min(n - 1, i)); maj(); },
    steps: () => notes.map(t => ({ note: t })),
    getIdx: () => k,
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto });
  return demo;
}
const f4BarresDemo = f4Etapes('f4-barresSvg', 'f4-barresSteps', 'f4-barresNext', 4, f4BarresDessin, F4_BARRES_NOTES);

/* ---- Méthode 3 : rédaction automatique (comparer / additionner / soustraire) ---- */
function f4Calculer(){
  const lire = id => Number(String(document.getElementById(id).value).replace(',', '.'));
  let a = lire('f4-cA'), b = lire('f4-cB'), c = lire('f4-cC'), d = lire('f4-cD');
  const op = document.getElementById('f4-cOp').value, out = document.getElementById('f4-cRes');
  const entier = v => Number.isInteger(v) && Math.abs(v) <= 9999;
  if(![a, b, c, d].every(entier) || b === 0 || d === 0){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez des nombres entiers (dénominateurs non nuls, au plus 4 chiffres).</p>'; return; }
  const lignes = [], symb = { cmp: '\\text{ et }', '+': '+', '-': '-' }[op];
  const fr = (n, dd) => `\\dfrac{${n}}{${dd}}`;
  lignes.push([f4Tex(`${fr(a, b)} ${symb} ${fr(c, d)}`), op === 'cmp' ? 'On veut comparer ces deux fractions.' : op === '+' ? 'On veut calculer cette somme.' : 'On veut calculer cette différence.']);
  // 1. Dénominateurs positifs.
  if(b < 0 || d < 0){
    if(b < 0){ a = -a; b = -b; } if(d < 0){ c = -c; d = -d; }
    lignes.push([f4Tex(`${fr(a, b)} ${symb} ${fr(c, d)}`), 'On multiplie le haut et le bas par −1 pour avoir des dénominateurs positifs.']);
  }
  // 2. Même dénominateur.
  const m = f4Ppcm(b, d), k1 = m / b, k2 = m / d, A = a * k1, C = c * k2;
  if(b === d) lignes.push(['Les dénominateurs sont déjà égaux.', '']);
  else {
    lignes.push([`Plus petit multiple commun de ${b} et ${d} : <b>${m}</b> = ${b} × ${k1} = ${d} × ${k2}.`, 'On cherche le dénominateur commun.']);
    const conv = (n, dd, k) => k === 1 ? fr(n, dd) : `\\dfrac{${n < 0 ? '(' + n + ')' : n} \\times ${k}}{${dd} \\times ${k}}`;
    lignes.push([f4Tex(`${conv(a, b, k1)} ${symb} ${conv(c, d, k2)}`), 'On réduit au même dénominateur.']);
    lignes.push([f4Tex(`${fr(A, m)} ${symb} ${fr(C, m)}`), 'On effectue les produits.']);
  }
  let conclusion = '';
  if(op === 'cmp'){
    const s = A < C ? '<' : A > C ? '>' : '=';
    lignes.push([`Or ${f4Moins(A)} ${s} ${f4Moins(C)}, donc ${f4Tex(`${fr(lire('f4-cA'), lire('f4-cB'))} ${s} ${fr(lire('f4-cC'), lire('f4-cD'))}`)}.`, 'On compare les numérateurs, puis on conclut avec les fractions de départ.']);
    conclusion = f4DroiteSvg(a / b, c / d, `${f4Moins(lire('f4-cA'))}/${f4Moins(lire('f4-cB'))}`, `${f4Moins(lire('f4-cC'))}/${f4Moins(lire('f4-cD'))}`);
  } else {
    const R = op === '+' ? A + C : A - C;
    lignes.push([f4Tex(`\\dfrac{${A} ${op} ${C < 0 ? '(' + C + ')' : C}}{${m}} = ${fr(R, m)}`), op === '+' ? 'On additionne les numérateurs et on garde le dénominateur.' : 'On soustrait les numérateurs et on garde le dénominateur.']);
    const g = f4Pgcd(R, m) || 1;
    if(R === 0) lignes.push([f4Tex('= 0'), 'Le résultat est nul.']);
    else if(g > 1) lignes.push([f4Tex(`= \\dfrac{${R} \\div ${g}}{${m} \\div ${g}} = ${f4T(R / g, m / g)}`), `On simplifie par ${g} : le résultat est irréductible.`]);
    else lignes.push([f4Tex(`= ${f4T(R, m)}`), `${f4Moins(R)} et ${m} n'ont pas de diviseur commun : la fraction est irréductible.`]);
  }
  out.innerHTML = r4Ex('', lignes) + conclusion;
  renderStaticMath(out);
}
// Petite droite graduée (unités) montrant la position des deux fractions comparées.
function f4DroiteSvg(x1, x2, l1, l2){
  const mn = Math.floor(Math.min(x1, x2, 0)), mx = Math.ceil(Math.max(x1, x2, 0)), span = Math.max(1, mx - mn);
  if(span > 20) return '';
  const X = v => 30 + (v - mn) / span * 460;
  let s = `<svg viewBox="0 0 520 90" style="width:100%;max-width:520px;display:block;margin:4px auto 0;"><line x1="20" y1="50" x2="500" y2="50" stroke="${F4_ENCRE}" stroke-width="1.6"/><polygon points="500,45 510,50 500,55" fill="${F4_ENCRE}"/>`;
  for(let v = mn; v <= mx; v++) s += `<line x1="${X(v)}" y1="44" x2="${X(v)}" y2="56" stroke="${F4_ENCRE}" stroke-width="1.4"/><text x="${X(v)}" y="74" text-anchor="middle" font-size="13" fill="${F4_ENCRE}">${f4Moins(v)}</text>`;
  const proches = Math.abs(X(x1) - X(x2)) < 60;
  [[x1, l1, F4_BLEU, proches && x1 <= x2 ? 'end' : proches ? 'start' : 'middle'], [x2, l2, F4_ORANGE, proches && x2 < x1 ? 'end' : proches ? 'start' : 'middle']].forEach(([v, l, col, anc]) => {
    s += `<circle cx="${X(v)}" cy="50" r="5" fill="${col}"/><text x="${X(v) + (anc === 'end' ? 4 : anc === 'start' ? -4 : 0)}" y="30" text-anchor="${anc}" font-size="13" font-weight="700" fill="${col}">${l}</text>`;
  });
  return s + '</svg>';
}

/* ---- Méthode 4 : calcul en plusieurs étapes ---- */
const F4_CALC_STEPS = [
  { expr: f4Tex('G = 2 - \\dfrac{5}{8} + \\dfrac{1}{12}'), note: 'On veut calculer G et donner le résultat sous forme irréductible.' },
  { expr: f4Tex('G = \\dfrac{2}{1} - \\dfrac{5}{8} + \\dfrac{1}{12}'), note: 'Le nombre entier 2 s\'écrit comme une fraction de dénominateur 1.' },
  { expr: 'Multiples de 12 : 12 ; <b>24</b>. Multiples de 8 : 8 ; 16 ; <b>24</b>.', note: 'Le plus petit multiple commun de 1, 8 et 12 est 24 (24 est aussi un multiple de 1).' },
  { expr: f4Tex('G = \\dfrac{2 \\times 24}{1 \\times 24} - \\dfrac{5 \\times 3}{8 \\times 3} + \\dfrac{1 \\times 2}{12 \\times 2}'), note: 'On réduit les trois fractions au dénominateur 24.' },
  { expr: f4Tex('G = \\dfrac{48}{24} - \\dfrac{15}{24} + \\dfrac{2}{24}'), note: 'On effectue les produits.' },
  { expr: f4Tex('G = \\dfrac{48 - 15 + 2}{24}'), note: 'Même dénominateur : on calcule avec les numérateurs, de gauche à droite.' },
  { expr: f4Tex('G = \\dfrac{35}{24}'), note: '35 = 5 × 7 et 24 = 2³ × 3 n\'ont aucun facteur commun : la fraction est irréductible.' },
];
const f4CalcDemo = makeStepDemo(F4_CALC_STEPS, 'f4-calcDisplay');

DEMO_REGISTRY['4e|Fractions : comparaison et addition'] = {
  cours: 'cours-demo-fractions-comp-4e', methode: 'methode-demo-fractions-comp-4e', exos: 'exos-demo-fractions-comp-4e', histoire: 'histoire-demo-fractions-comp-4e',
  init: () => {
    f4MultChercher(); f4BarresDemo.init(); f4Calculer(); f4CalcDemo.reset();
    ['cours-demo-fractions-comp-4e', 'exos-demo-fractions-comp-4e', 'histoire-demo-fractions-comp-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fractions-comp-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fractions-comp-4e'));
  }
};

DEMO_QUIZZES['4e|Fractions : comparaison et addition'] = [
  { q: 'Le quotient −12/−20 est égal à...', opts: ['−3/5', '3/5', '−12/20'], correct: 1 },
  { q: 'Le plus petit dénominateur commun à 3/10 et 7/15 est...', opts: ['30', '150', '15'], correct: 0 },
  { q: '5/7 + 2/7 = ...', opts: ['7/14', '1', '10/49'], correct: 1 },
  { q: '3/4 − 5/6 = ...', opts: ['−2/2', '−1/12', '1/12'], correct: 1 },
  { q: 'Quelle est la plus grande de ces fractions ?', opts: ['5/8', '2/3', '7/12'], correct: 1 },
  { q: 'Que peut-on dire de −3/4 et −5/8 ?', opts: ['−3/4 < −5/8', '−3/4 > −5/8', 'Elles sont égales'], correct: 0 },
  { q: '2 + 1/3 = ...', opts: ['3/3', '7/3', '3/4'], correct: 1 },
];

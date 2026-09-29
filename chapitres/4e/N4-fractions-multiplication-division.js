/* ============================================================
   CHAPITRE : Fractions : multiplication et division (4e, N4)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "Chapitre suivant" (captures du manuel p. 30-31 : produit de deux fractions, produit en
   croix, inverse, division). Plan du manuel, titres reformulés, exemples nouveaux. Utilise r4Ex /
   R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const MU4_BLEU = '#0C5BA0', MU4_ORANGE = '#E07B00', MU4_VERT = '#1E7B34', MU4_ENCRE = '#1C1B2E';
const mu4Pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while(b){ [a, b] = [b, a % b]; } return a; };
const mu4Tex = s => `<span class="tex">${s}</span>`;
// Longue formule : défile horizontalement sur téléphone au lieu de dépasser de la page.
const mu4Long = s => `<span style="display:block;max-width:100%;overflow-x:auto;overflow-y:hidden;position:relative;padding:2px 0;white-space:nowrap;">${mu4Tex(s)}</span>`;
const mu4Moins = n => String(n).replace('-', '−');
// Fraction en LaTeX, signe devant la barre ; entier si le dénominateur vaut 1.
const mu4F = (n, d) => d === 1 ? String(n) : (n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`);
const MU4_VB_AIRE = '0 0 520 250', MU4_VB_DIV = '0 0 520 190';

document.getElementById('cours-demo-fractions-mult-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Multiplier des fractions</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Le produit de deux fractions</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour <b>multiplier deux fractions</b>, on multiplie les <b>numérateurs entre eux</b> et les <b>dénominateurs entre eux</b>.<br>
Pour tous nombres <i>a</i>, <i>b</i>, <i>c</i> et <i>d</i>, avec <i>b</i> et <i>d</i> non nuls : <div style="text-align:center;margin:6px 0 0;">${mu4Tex('\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{b \\times d}')}</div></div>
<div class="redaction-note" ${R4_REM}>Remarque : avec <i>b</i> = 1, la formule devient ${mu4Tex('a \\times \\dfrac{c}{d} = \\dfrac{a \\times c}{d}')}. Elle permet de calculer une <b>fraction d'une quantité</b> (voir l'exemple 2) : « prendre les ${mu4Tex('\\dfrac{c}{d}')} de <i>a</i> », c'est calculer ${mu4Tex('\\dfrac{c}{d} \\times a')}.</div>
${r4Ex('Exemple 1 : calculer ' + mu4Tex('A = -\\dfrac{26}{45} \\times \\dfrac{27}{65}') + ' et donner le résultat sous forme irréductible.', [
  [mu4Tex('A = -\\dfrac{26 \\times 27}{45 \\times 65}'), 'Un seul facteur négatif : le résultat est négatif. On n\'effectue pas encore les produits !'],
  [mu4Tex('A = -\\dfrac{2 \\times \\mathbf{13} \\times 3 \\times \\mathbf{9}}{5 \\times \\mathbf{9} \\times 5 \\times \\mathbf{13}}'), 'On décompose pour faire apparaître les facteurs communs : 13 et 9.'],
  [mu4Tex('A = -\\dfrac{2 \\times 3}{5 \\times 5}'), 'On simplifie.'],
  [mu4Tex('A = -\\dfrac{6}{25}'), 'On calcule : la fraction obtenue est irréductible.'],
])}
${r4Ex('Exemple 2 : un collège compte 630 élèves, dont les ' + mu4Tex('\\dfrac{4}{9}') + ' sont demi-pensionnaires. Combien y a-t-il de demi-pensionnaires ?', [
  [mu4Tex('N = \\dfrac{4}{9} \\times 630 = \\dfrac{4 \\times 630}{9} = \\dfrac{4 \\times 9 \\times 70}{9} = 280'), 'On prend les 4/9 de 630 : 630 = 9 × 70.'],
  ['Il y a 280 demi-pensionnaires.', 'On conclut par une phrase.'],
])}
${r4Ex('Exemple 3 : une fraction d\'une fraction. Léa mange les ' + mu4Tex('\\dfrac{2}{3}') + ' des ' + mu4Tex('\\dfrac{3}{4}') + ' restants d\'un gâteau.', [
  [mu4Tex('G = \\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{2 \\times 3}{3 \\times 2 \\times 2} = \\dfrac{1}{2}'), 'Elle a mangé la moitié du gâteau entier.'],
])}

<div class="sub-header"><span class="letter">B</span><h4>Les produits en croix</h4></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Pour tous nombres <i>a</i>, <i>b</i>, <i>c</i> et <i>d</i>, avec <i>b</i> et <i>d</i> non nuls : si ${mu4Tex('\\dfrac{a}{b} = \\dfrac{c}{d}')}, alors ${mu4Tex('a \\times d = b \\times c')}.<br>On dit que les <b>produits en croix</b> sont égaux.</div>
${r4Ex('Exemple 1 : trouver le nombre <i>x</i> tel que ' + mu4Tex('\\dfrac{x}{28} = \\dfrac{63}{36}') + '.', [
  ['Les fractions sont égales, donc les produits en croix sont égaux :', ''],
  [mu4Tex('x \\times 36 = 28 \\times 63'), 'On « croise » : numérateur de l\'une × dénominateur de l\'autre.'],
  [mu4Tex('x = \\dfrac{28 \\times 63}{36} = \\dfrac{1\\,764}{36} = 49'), 'On divise par 36.'],
  ['Vérification : ' + mu4Tex('\\dfrac{49}{28} = \\dfrac{7}{4}') + ' et ' + mu4Tex('\\dfrac{63}{36} = \\dfrac{7}{4}') + '.', ''],
])}
<span class="prop-badge">Propriété 2 (réciproque)</span>
<div class="def-box">Pour tous nombres <i>a</i>, <i>b</i>, <i>c</i> et <i>d</i>, avec <i>b</i> et <i>d</i> non nuls : si ${mu4Tex('a \\times d = b \\times c')}, alors ${mu4Tex('\\dfrac{a}{b} = \\dfrac{c}{d}')}.</div>
${r4Ex('Exemple 2 : les fractions ' + mu4Tex('\\dfrac{51}{85}') + ' et ' + mu4Tex('\\dfrac{75}{125}') + ' sont-elles égales ?', [
  ['51 × 125 = 6 375 et 85 × 75 = 6 375.', 'On calcule les produits en croix.'],
  ['Les produits en croix sont égaux, donc ' + mu4Tex('\\dfrac{51}{85} = \\dfrac{75}{125}') + '.', 'On applique la propriété 2.'],
])}
${r4Ex('Exemple 3 : et ' + mu4Tex('\\dfrac{14}{33}') + ' et ' + mu4Tex('\\dfrac{17}{40}') + ' ?', [
  ['14 × 40 = 560 et 33 × 17 = 561.', 'Les produits en croix sont différents (de 1 seulement !).'],
  ['Donc ' + mu4Tex('\\dfrac{14}{33} \\neq \\dfrac{17}{40}') + '.', 'Si les fractions étaient égales, les produits en croix le seraient (propriété 1).'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Diviser par une fraction</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>L'inverse d'un nombre</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:2;">
  <li>Tout nombre <i>x</i> <b>non nul</b> admet un <b>inverse</b> <span style="white-space:nowrap;">(noté ${mu4Tex('x^{-1}')})</span>, qui est le nombre ${mu4Tex('\\dfrac{1}{x}')}.</li>
  <li>Toute fraction ${mu4Tex('\\dfrac{a}{b}')}, avec <i>a</i> et <i>b</i> non nuls, admet pour inverse la fraction ${mu4Tex('\\dfrac{b}{a}')} : on « retourne » la fraction.</li>
</ul></div>
${r4Ex('Pourquoi ? Soit une fraction ' + mu4Tex('\\dfrac{a}{b}') + ', avec <i>a</i> et <i>b</i> non nuls.', [
  [mu4Tex('\\dfrac{a}{b} \\times \\dfrac{b}{a} = \\dfrac{a \\times b}{b \\times a} = 1'), 'Deux nombres sont inverses l\'un de l\'autre quand leur produit vaut 1.'],
])}
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>L'inverse de ${mu4Tex('\\dfrac{-7}{12}')} est ${mu4Tex('\\dfrac{12}{-7} = -\\dfrac{12}{7}')} : un nombre et son inverse ont le <b>même signe</b>.</li>
  <li>L'inverse de 5 est ${mu4Tex('\\dfrac{1}{5}')} ; l'inverse de 0,25 = ${mu4Tex('\\dfrac{1}{4}')} est 4.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Attention : ne pas confondre <b>inverse</b> et <b>opposé</b> ! L'opposé de ${mu4Tex('\\dfrac{3}{4}')} est ${mu4Tex('-\\dfrac{3}{4}')} (leur somme vaut 0), son inverse est ${mu4Tex('\\dfrac{4}{3}')} (leur produit vaut 1). Le nombre 0 n'a pas d'inverse.</div>

<div class="sub-header"><span class="letter">B</span><h4>Le quotient de deux fractions</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box"><b>Diviser</b> par une fraction non nulle revient à <b>multiplier par son inverse</b>.<br>
Pour tous nombres <i>a</i>, <i>b</i>, <i>c</i> et <i>d</i>, avec <i>b</i>, <i>c</i> et <i>d</i> non nuls :
<div style="text-align:center;margin:8px 0 4px;">${mu4Tex('\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c}')}</div>
<div style="text-align:center;">ou encore, avec une fraction « à étages » :</div>
<div style="text-align:center;margin:10px 0 2px;">${mu4Tex('\\dfrac{\\;\\dfrac{a}{b}\\;}{\\dfrac{c}{d}} = \\dfrac{a}{b} \\times \\dfrac{d}{c}')}</div></div>
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:0 18px;">
<div>${r4Ex('Exemple 1 :', [
  [mu4Tex('B = \\dfrac{9}{10} \\div \\dfrac{3}{4}'), ''],
  [mu4Tex('B = \\dfrac{9}{10} \\times \\dfrac{4}{3}'), 'On multiplie par l\'inverse.'],
  [mu4Tex('B = \\dfrac{3 \\times \\mathbf{3} \\times \\mathbf{2} \\times 2}{\\mathbf{2} \\times 5 \\times \\mathbf{3}}'), 'On décompose et on simplifie.'],
  [mu4Tex('B = \\dfrac{6}{5}'), ''],
])}</div>
<div>${r4Ex('Exemple 2 :', [
  [mu4Tex('C = \\dfrac{\\;-\\dfrac{14}{15}\\;}{\\dfrac{21}{10}}'), ''],
  [mu4Tex('C = -\\dfrac{14}{15} \\times \\dfrac{10}{21}'), 'On multiplie par l\'inverse de 21/10.'],
  [mu4Tex('C = -\\dfrac{2 \\times \\mathbf{7} \\times 2 \\times \\mathbf{5}}{3 \\times \\mathbf{5} \\times 3 \\times \\mathbf{7}}'), 'On simplifie par 7 et par 5.'],
  [mu4Tex('C = -\\dfrac{4}{9}'), ''],
])}</div>
<div>${r4Ex('Exemple 3 :', [
  [mu4Tex('D = 12 \\div \\dfrac{3}{5}'), ''],
  [mu4Tex('D = 12 \\times \\dfrac{5}{3}'), 'On multiplie par l\'inverse.'],
  [mu4Tex('D = \\dfrac{\\mathbf{3} \\times 4 \\times 5}{\\mathbf{3}}'), '12 = 3 × 4.'],
  [mu4Tex('D = 20'), ''],
])}</div>
</div>
`;

document.getElementById('histoire-demo-fractions-mult-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Les calculs sur les fractions sont très anciens : le grand livre chinois des <i>Neuf chapitres sur l'art du calcul</i> (rédigé il y a environ 2 000 ans) explique déjà comment les multiplier et les diviser, ainsi que la « règle de trois », ancêtre de nos produits en croix. En Inde, au 9e siècle, le mathématicien <b>Mahāvīra</b> énonce clairement la règle que tu utilises aujourd'hui : pour diviser par une fraction, on la <b>retourne</b> et on <b>multiplie</b>. Quant à la notation ${mu4Tex('x^{-1}')} de l'inverse, elle vient des exposants négatifs, introduits au 17e siècle par l'Anglais <b>John Wallis</b> et popularisés par <b>Isaac Newton</b> : ${mu4Tex('x^{-1} = \\dfrac{1}{x}')}, ${mu4Tex('x^{-2} = \\dfrac{1}{x^2}')}… Tu les retrouveras dans le chapitre sur les puissances !
</div>
`;

document.getElementById('methode-demo-fractions-mult-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : voir un produit de fractions, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="mu4-aireSvg" viewBox="${MU4_VB_AIRE}" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="mu4-aireSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="mu4-aireNext" onclick="mu4AireDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="mu4AireDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : simplifier avant de multiplier</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="mu4-simplDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="mu4SimplDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="mu4SimplDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : comprendre pourquoi diviser, c'est multiplier par l'inverse</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <svg id="mu4-divSvg" viewBox="${MU4_VB_DIV}" style="width:100%;max-width:560px;display:block;margin:8px auto;"></svg>
  <div class="step-list" id="mu4-divSteps"></div>
  <div class="figure-toolbar"><button class="btn" id="mu4-divNext" onclick="mu4DivDemo.next()">Étape suivante →</button><button class="btn secondary" onclick="mu4DivDemo.reset()">Revoir depuis le début</button></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : multiplier ou diviser deux fractions, rédaction complète</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez deux fractions (entiers relatifs d'au plus 3 chiffres), choisissez × ou ÷ : le calcul est rédigé, avec la simplification par les facteurs premiers.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    ${mu4Saisie('mu4-cA', -26, 'mu4-cB', 45, 'mu4Calculer()')}
    <select id="mu4-cOp" onchange="mu4Calculer()" style="padding:7px 8px;border-radius:8px;border:1px solid #C9D6E6;font-size:1.1rem;"><option value="x">×</option><option value="d">÷</option></select>
    ${mu4Saisie('mu4-cC', 27, 'mu4-cD', 65, 'mu4Calculer()')}
    <button class="btn" onclick="mu4Calculer()">Rédiger</button>
  </div>
  <div id="mu4-cRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : utiliser les produits en croix</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez une égalité de deux fractions. Mettez la lettre <b>x</b> à la place du nombre cherché, ou quatre nombres pour vérifier si les fractions sont égales.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    ${mu4Saisie('mu4-pA', 'x', 'mu4-pB', 28, 'mu4Croix()', 'text')}
    <span style="font-size:1.4rem;font-weight:700;">=</span>
    ${mu4Saisie('mu4-pC', 63, 'mu4-pD', 36, 'mu4Croix()', 'text')}
    <button class="btn" onclick="mu4Croix()">Rédiger</button>
  </div>
  <div id="mu4-pRes"></div>
</div>
`;
function mu4Saisie(idN, n, idD, d, action, type){
  const st = 'width:62px;padding:5px 6px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:\'JetBrains Mono\',monospace;font-size:1rem;';
  const t = type || 'number';
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:3px;"><input id="${idN}" type="${t}" value="${n}" style="${st}" onkeydown="if(event.key==='Enter') ${action}"><span style="display:block;width:70px;border-top:2px solid ${MU4_ENCRE};"></span><input id="${idD}" type="${t}" value="${d}" style="${st}" onkeydown="if(event.key==='Enter') ${action}"></span>`;
}

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function mu4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="mu4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="mu4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-fractions-mult-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer un quotient de fractions »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${mu4Tex('F = -\\dfrac{8}{15} \\div \\dfrac{4}{-9}')}</span><span class="we-comment">On veut le résultat sous forme irréductible.</span></div>
    <div class="we-row"><span class="we-expr">${mu4Tex('F = -\\dfrac{8}{15} \\times \\dfrac{-9}{4}')}</span><span class="we-comment">On multiplie par l'inverse de la deuxième fraction.</span></div>
    <div class="we-row"><span class="we-expr">${mu4Tex('F = \\dfrac{8 \\times 9}{15 \\times 4}')}</span><span class="we-comment">Deux facteurs négatifs : le résultat est positif.</span></div>
    <div class="we-row"><span class="we-expr">${mu4Tex('F = \\dfrac{2 \\times \\cancel{4} \\times \\cancel{3} \\times 3}{\\cancel{3} \\times 5 \\times \\cancel{4}}')}</span><span class="we-comment">On décompose et on simplifie par 4 et par 3.</span></div>
    <div class="we-row"><span class="we-expr">${mu4Tex('F = \\dfrac{6}{5}')}</span><span class="we-comment">On calcule : la fraction est irréductible.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${mu4Exo(1, 'Calcule et donne le résultat sous forme irréductible : ' + mu4Tex('A = \\dfrac{3}{7} \\times \\dfrac{14}{9}') + ' ; ' + mu4Tex('B = -\\dfrac{5}{6} \\times \\dfrac{9}{10}') + ' ; ' + mu4Tex('C = \\dfrac{-4}{15} \\times \\dfrac{-25}{8}') + '.', [
    mu4Tex('A = \\dfrac{3 \\times 2 \\times 7}{7 \\times 3 \\times 3} = \\dfrac{2}{3}'),
    mu4Tex('B = -\\dfrac{5 \\times 3 \\times 3}{2 \\times 3 \\times 2 \\times 5} = -\\dfrac{3}{4}'),
    mu4Tex('C = \\dfrac{4 \\times 5 \\times 5}{3 \\times 5 \\times 4 \\times 2} = \\dfrac{5}{6}') + ' (deux facteurs négatifs : résultat positif).'])}
  ${mu4Exo(2, 'Un réservoir de 60 L est rempli aux ' + mu4Tex('\\dfrac{3}{4}') + '. On utilise les ' + mu4Tex('\\dfrac{2}{5}') + ' de son contenu. Combien de litres a-t-on utilisés ?', [
    'Contenu : ' + mu4Tex('\\dfrac{3}{4} \\times 60 = 45') + ' L. Litres utilisés : ' + mu4Tex('\\dfrac{2}{5} \\times 45 = 18') + ' L.',
    'Autre méthode : on calcule la fraction du réservoir utilisée,', mu4Tex('F = \\dfrac{2}{5} \\times \\dfrac{3}{4} = \\dfrac{6}{20} = \\dfrac{3}{10}'), 'soit ' + mu4Tex('\\dfrac{3}{10} \\times 60 = 18') + ' L.'])}
  ${mu4Exo(3, 'Donne l\'inverse de chacun de ces nombres : 7 ; ' + mu4Tex('-\\dfrac{3}{8}') + ' ; 0,25 ; −1. Lequel est égal à son inverse ?', [
    'Inverse de 7 : ' + mu4Tex('\\dfrac{1}{7}') + ' ; inverse de ' + mu4Tex('-\\dfrac{3}{8}') + ' : ' + mu4Tex('-\\dfrac{8}{3}') + '.',
    '0,25 = ' + mu4Tex('\\dfrac{1}{4}') + ', son inverse est 4. L\'inverse de −1 est −1 : −1 est égal à son inverse (comme 1).'])}
  ${mu4Exo(4, 'Calcule et donne le résultat sous forme irréductible : ' + mu4Tex('D = \\dfrac{5}{6} \\div \\dfrac{10}{9}') + ' ; ' + mu4Tex('E = -12 \\div \\dfrac{4}{7}') + ' ; ' + mu4Tex('F = \\dfrac{7}{-8} \\div \\dfrac{-21}{16}') + '.', [
    mu4Tex('D = \\dfrac{5}{6} \\times \\dfrac{9}{10} = \\dfrac{5 \\times 3 \\times 3}{2 \\times 3 \\times 2 \\times 5} = \\dfrac{3}{4}'),
    mu4Tex('E = -12 \\times \\dfrac{7}{4} = -\\dfrac{4 \\times 3 \\times 7}{4} = -21'),
    mu4Tex('F = \\dfrac{7}{-8} \\times \\dfrac{16}{-21} = \\dfrac{7 \\times 2 \\times 8}{8 \\times 3 \\times 7} = \\dfrac{2}{3}')])}
  ${mu4Exo(5, 'Calcule ' + mu4Tex('G = \\dfrac{\\;\\dfrac{9}{14}\\;}{\\dfrac{15}{28}}') + ' et donne le résultat sous forme irréductible.', [
    mu4Tex('G = \\dfrac{9}{14} \\times \\dfrac{28}{15} = \\dfrac{3 \\times 3 \\times 2 \\times 14}{14 \\times 3 \\times 5} = \\dfrac{6}{5}')])}
  ${mu4Exo(6, 'Détermine le nombre <i>x</i> dans chaque cas : a) ' + mu4Tex('\\dfrac{x}{12} = \\dfrac{15}{20}') + ' ; b) ' + mu4Tex('\\dfrac{35}{x} = \\dfrac{14}{6}') + '.', [
    'a) Produits en croix : ' + mu4Tex('20 \\times x = 12 \\times 15') + ', soit ' + mu4Tex('20x = 180') + ', donc ' + mu4Tex('x = \\dfrac{180}{20} = 9') + '.',
    'b) Produits en croix : ' + mu4Tex('35 \\times 6 = x \\times 14') + ', soit ' + mu4Tex('14x = 210') + ', donc ' + mu4Tex('x = \\dfrac{210}{14} = 15') + '.'])}
  ${mu4Exo(7, 'Ces fractions sont-elles égales ? a) ' + mu4Tex('\\dfrac{57}{76}') + ' et ' + mu4Tex('\\dfrac{45}{60}') + ' ; b) ' + mu4Tex('\\dfrac{23}{37}') + ' et ' + mu4Tex('\\dfrac{69}{112}') + '.', [
    'a) 57 × 60 = 3 420 et 76 × 45 = 3 420 : les produits en croix sont égaux, donc les fractions sont égales.',
    'b) 23 × 112 = 2 576 et 37 × 69 = 2 553 : les produits en croix sont différents, donc les fractions ne sont pas égales.'])}
  ${mu4Exo(8, 'Tom dépense le quart de son argent de poche en livres, puis les deux tiers de ce qui lui reste au cinéma. a) Quelle fraction de son argent de poche lui reste-t-il ? b) Il avait 48 € : combien lui reste-t-il ?', [
    'a) Après les livres, il lui reste ' + mu4Tex('1 - \\dfrac{1}{4} = \\dfrac{3}{4}') + '. Le cinéma coûte ' + mu4Tex('\\dfrac{2}{3} \\times \\dfrac{3}{4} = \\dfrac{1}{2}') + ' de son argent de poche.',
    'Il lui reste ' + mu4Tex('\\dfrac{3}{4} - \\dfrac{1}{2} = \\dfrac{1}{4}') + ' de son argent de poche.',
    'b) ' + mu4Tex('\\dfrac{1}{4} \\times 48 = 12') + ' : il lui reste 12 €.'])}
</div>
`;

/* ---- Moteur d'étapes animé (cahier : rejouable, via registerGeoStepDemo + anim) ---- */
function mu4Etapes(svgId, listeId, btnId, notes, dessiner, nAnim, viewBox){
  let k = 0, raf = null;
  const svg = () => document.getElementById(svgId);
  const bouton = () => { const b = document.getElementById(btnId); if(b){ b.disabled = k >= notes.length - 1; b.textContent = k >= notes.length - 1 ? 'Terminé ✓' : 'Étape suivante →'; } };
  const liste = () => document.querySelectorAll(`#${listeId} .step-item`).forEach(el => el.classList.toggle('done', Number(el.dataset.step) <= k + 1));
  const fixe = () => { cancelAnimationFrame(raf); const s = svg(); if(s) s.innerHTML = dessiner(k); liste(); bouton(); };
  const jouer = () => {
    cancelAnimationFrame(raf); liste(); bouton();
    const n = nAnim(k), t0 = performance.now(), duree = n * (n > 6 ? 250 : 650);
    const f = now => { const p = Math.max(0, Math.min(n, (now - t0) / duree * n)); const s = svg(); if(s) s.innerHTML = dessiner(k, p); if(p < n) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
  };
  const demo = {
    init(){ const l = document.getElementById(listeId); if(l) l.innerHTML = notes.map((t, i) => `<div class="step-item" data-step="${i + 1}"><div class="step-num">${i + 1}</div><div>${t}</div></div>`).join(''); k = 0; fixe(); },
    next(){ if(k < notes.length - 1){ k++; jouer(); } },
    reset(){ k = 0; fixe(); },
    goto(i){ k = Math.max(0, Math.min(notes.length - 1, i)); fixe(); },
    steps: () => notes.map(t => ({ note: t })),
    getIdx: () => k,
    anim: { viewBox, n: nAnim, rendu: (i, p) => dessiner(i, p) },
  };
  registerGeoStepDemo(svgId, { steps: demo.steps, getIdx: demo.getIdx, goto: demo.goto, anim: demo.anim });
  return demo;
}
// Fraction écrite dans le SVG.
function mu4FracSvg(x, y, n, d, coul, taille){
  const t = taille || 18;
  return `<text x="${x}" y="${y - 6}" text-anchor="middle" font-size="${t}" font-weight="700" fill="${coul}">${n}</text><line x1="${x - 12}" y1="${y}" x2="${x + 12}" y2="${y}" stroke="${coul}" stroke-width="2"/><text x="${x}" y="${y + t}" text-anchor="middle" font-size="${t}" font-weight="700" fill="${coul}">${d}</text>`;
}

/* ---- Méthode 1 : modèle d'aire pour 2/3 × 4/5 ---- */
const MU4_AIRE_NOTES = [
  'On veut calculer les 2/3 de 4/5. Le rectangle représente l\'unité.',
  'On partage le rectangle en 5 bandes verticales égales et on en colorie 4 : c\'est 4/5 de l\'unité.',
  'On partage en 3 bandes horizontales égales et on prend 2 bandes sur 3 de la partie colorée : ce sont les 2/3 des 4/5.',
  'L\'unité est découpée en 3 × 5 = 15 petits rectangles ; la partie prise en compte 2 × 4 = 8. Donc 2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15.',
];
const mu4AireN = i => i === 1 ? 4 : i === 2 ? 2 : i === 3 ? 8 : 1;
function mu4AireDessin(i, prog){
  const n = mu4AireN(i); prog = prog == null ? n : prog;
  const X = 40, Y = 30, W = 300, H = 180, cw = W / 5, rh = H / 3;
  let s = '';
  const cols = i === 0 ? 0 : i === 1 ? Math.min(4, prog) : 4;
  const rows = i < 2 ? 0 : i === 2 ? Math.min(2, prog) : 2;
  // Bandes verticales colorées (4/5), la dernière en cours d'apparition.
  for(let c = 0; c < 4; c++){ const a = Math.max(0, Math.min(1, cols - c)); if(a > 0) s += `<rect x="${X + c * cw}" y="${Y}" width="${cw}" height="${H}" fill="${MU4_BLEU}" fill-opacity="${(.28 * a).toFixed(3)}"/>`; }
  // Bandes horizontales (2/3) hachurées en orange sur la partie colorée.
  for(let r = 0; r < 2; r++){ const a = Math.max(0, Math.min(1, rows - r)); if(a > 0) s += `<rect x="${X}" y="${Y + (2 - r) * rh}" width="${4 * cw * a}" height="${rh}" fill="${MU4_ORANGE}" fill-opacity=".45"/>`; }
  if(i >= 1) for(let c = 1; c < 5; c++) s += `<line x1="${X + c * cw}" y1="${Y}" x2="${X + c * cw}" y2="${Y + H}" stroke="${MU4_ENCRE}" stroke-width="1.4"/>`;
  if(i >= 2) for(let r = 1; r < 3; r++) s += `<line x1="${X}" y1="${Y + r * rh}" x2="${X + W}" y2="${Y + r * rh}" stroke="${MU4_ENCRE}" stroke-width="1.4" stroke-dasharray="${i === 2 ? '6 4' : '0'}"/>`;
  if(i === 3){
    // On numérote les 8 petits rectangles pris (2 lignes du bas × 4 colonnes).
    let k = 0;
    for(let r = 2; r >= 1; r--) for(let c = 0; c < 4; c++){ k++; if(k <= prog + 1e-9) s += `<rect x="${X + c * cw + 3}" y="${Y + r * rh + 3}" width="${cw - 6}" height="${rh - 6}" rx="4" fill="${MU4_VERT}" fill-opacity=".85"/><text x="${X + c * cw + cw / 2}" y="${Y + r * rh + rh / 2 + 7}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">${k}</text>`; }
  }
  s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="none" stroke="${MU4_ENCRE}" stroke-width="2.4"/>`;
  // Légendes à droite.
  if(i >= 1) s += mu4FracSvg(388, 60, 4, 5, MU4_BLEU, 20) + `<text x="412" y="67" font-size="17" fill="${MU4_BLEU}">en bleu</text>`;
  if(i >= 2) s += `<text x="356" y="129" font-size="17" fill="${MU4_ORANGE}">les</text>` + mu4FracSvg(398, 122, 2, 3, MU4_ORANGE, 20) + `<text x="418" y="129" font-size="17" fill="${MU4_ORANGE}">de ces 4/5</text>`;
  if(i === 3) s += `<text x="356" y="200" font-size="21" font-weight="700" fill="${MU4_VERT}">= 8/15</text><text x="356" y="224" font-size="15" fill="#4E5665">8 cases sur 15</text>`;
  return s;
}
const mu4AireDemo = mu4Etapes('mu4-aireSvg', 'mu4-aireSteps', 'mu4-aireNext', MU4_AIRE_NOTES, mu4AireDessin, mu4AireN, MU4_VB_AIRE);

/* ---- Méthode 2 : simplifier avant de multiplier ---- */
const MU4_SIMPL_STEPS = [
  { expr: mu4Tex('E = \\dfrac{15}{28} \\times \\left(-\\dfrac{14}{25}\\right)'), note: 'On veut calculer E et donner le résultat sous forme irréductible.' },
  { expr: mu4Tex('E = -\\dfrac{15 \\times 14}{28 \\times 25}'), note: 'Un seul facteur négatif : le résultat est négatif. On écrit le produit sans l\'effectuer (210/700 serait plus long à simplifier).' },
  { expr: mu4Tex('E = -\\dfrac{3 \\times 5 \\times 2 \\times 7}{2 \\times 2 \\times 7 \\times 5 \\times 5}'), note: 'On décompose chaque nombre en produit de facteurs premiers : 15 = 3 × 5, 14 = 2 × 7, 28 = 2 × 2 × 7, 25 = 5 × 5.' },
  { expr: mu4Tex('E = -\\dfrac{3 \\times \\cancel{5} \\times \\cancel{2} \\times \\cancel{7}}{\\cancel{2} \\times 2 \\times \\cancel{7} \\times \\cancel{5} \\times 5}'), note: 'On barre les facteurs communs au numérateur et au dénominateur : 5, 2 et 7.' },
  { expr: mu4Tex('E = -\\dfrac{3}{2 \\times 5} = -\\dfrac{3}{10}'), note: 'Il ne reste plus de facteur commun : la fraction est irréductible.' },
];
const mu4SimplDemo = makeStepDemo(MU4_SIMPL_STEPS, 'mu4-simplDisplay');

/* ---- Méthode 3 : 3 ÷ 1/4 et 3 ÷ 3/4 sur une barre ---- */
const MU4_DIV_NOTES = [
  'Diviser 3 par un nombre, c\'est chercher « combien de fois » ce nombre est contenu dans 3. Voici 3 unités.',
  'On coupe chaque unité en quarts : il y a 3 × 4 = 12 quarts dans 3. Donc 3 ÷ 1/4 = 12, c\'est-à-dire 3 × 4 : diviser par 1/4, c\'est multiplier par 4.',
  'On regroupe les quarts par paquets de 3 : chaque paquet vaut 3/4. On obtient 4 paquets.',
  'Donc 3 ÷ 3/4 = 4. Et 3 × 4/3 = 12/3 = 4 : diviser par 3/4, c\'est bien multiplier par son inverse 4/3.',
];
const mu4DivN = i => i === 1 ? 12 : i === 2 ? 4 : 1;
function mu4DivDessin(i, prog){
  const n = mu4DivN(i); prog = prog == null ? n : prog;
  const X = 40, Y = 44, W = 440, H = 44, u = W / 3, q = u / 4;
  const coulPaquet = ['#0C5BA0', '#E07B00', '#1E7B34', '#8E44AD'];
  let s = '';
  // Paquets de 3 quarts (à partir de l'étape 2).
  const paquets = i < 2 ? 0 : i === 2 ? prog : 4;
  for(let p = 0; p < 4; p++){
    const a = Math.max(0, Math.min(1, paquets - p)); if(a <= 0) continue;
    const x0 = X + p * 3 * q;
    s += `<rect x="${x0}" y="${Y}" width="${3 * q * a}" height="${H}" fill="${coulPaquet[p]}" fill-opacity=".3"/>`;
    if(a >= 1) s += `<path d="M${x0 + 3},${Y + H + 8} q0,8 8,8 H${x0 + 1.5 * q - 6} q6,0 6,8 q0,-8 6,-8 H${x0 + 3 * q - 11} q8,0 8,-8" fill="none" stroke="${coulPaquet[p]}" stroke-width="1.8"/><text x="${x0 + 1.5 * q}" y="${Y + H + 42}" text-anchor="middle" font-size="17" font-weight="700" fill="${coulPaquet[p]}">3/4</text>`;
  }
  // Quarts : traits et numéros qui apparaissent un à un.
  const quarts = i === 0 ? 0 : i === 1 ? prog : 12;
  for(let k = 1; k < 12; k++) if(k % 4 && k <= quarts) s += `<line x1="${X + k * q}" y1="${Y}" x2="${X + k * q}" y2="${Y + H}" stroke="${MU4_ENCRE}" stroke-width="1" stroke-dasharray="4 3"/>`;
  if(i === 1) for(let k = 0; k < 12; k++) if(k < quarts) s += `<text x="${X + k * q + q / 2}" y="${Y + H / 2 + 6}" text-anchor="middle" font-size="15" font-weight="700" fill="${MU4_BLEU}">${k + 1}</text>`;
  for(let k = 1; k < 3; k++) s += `<line x1="${X + k * u}" y1="${Y - 6}" x2="${X + k * u}" y2="${Y + H + 6}" stroke="${MU4_ENCRE}" stroke-width="2.4"/>`;
  s += `<rect x="${X}" y="${Y}" width="${W}" height="${H}" fill="none" stroke="${MU4_ENCRE}" stroke-width="2.4"/>`;
  for(let k = 0; k <= 3; k++) s += `<text x="${X + k * u}" y="${Y - 12}" text-anchor="middle" font-size="16" fill="#4E5665">${k}</text>`;
  if(i === 1 && quarts >= 12) s += `<text x="260" y="${Y + H + 36}" text-anchor="middle" font-size="18" font-weight="700" fill="${MU4_BLEU}">12 quarts : 3 ÷ 1/4 = 12 = 3 × 4</text>`;
  if(i === 3) s += `<text x="260" y="178" text-anchor="middle" font-size="19" font-weight="700" fill="${MU4_VERT}">3 ÷ 3/4 = 4 paquets = 3 × 4/3</text>`;
  return s;
}
const mu4DivDemo = mu4Etapes('mu4-divSvg', 'mu4-divSteps', 'mu4-divNext', MU4_DIV_NOTES, mu4DivDessin, mu4DivN, MU4_VB_DIV);

/* ---- Méthode 4 : rédaction d'un produit ou d'un quotient ---- */
function mu4Premiers(n){ const r = []; let p = 2; n = Math.abs(n); while(n > 1){ while(n % p === 0){ r.push(p); n /= p; } p++; } return r; }
function mu4Calculer(){
  const lire = id => Number(String(document.getElementById(id).value).replace(',', '.'));
  const a = lire('mu4-cA'), b = lire('mu4-cB'), c0 = lire('mu4-cC'), d0 = lire('mu4-cD');
  const op = document.getElementById('mu4-cOp').value, out = document.getElementById('mu4-cRes');
  const ok = v => Number.isInteger(v) && Math.abs(v) <= 999;
  if(![a, b, c0, d0].every(ok) || b === 0 || d0 === 0){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez des nombres entiers d\'au plus 3 chiffres, avec des dénominateurs non nuls.</p>'; return; }
  if(op === 'd' && c0 === 0){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">On ne peut pas diviser par 0 : la fraction 0/' + d0 + ' n\'a pas d\'inverse.</p>'; return; }
  const fr = (n, d) => `\\dfrac{${n}}{${d}}`, par = (n, d) => (n < 0 || d < 0) ? `\\left(${fr(n, d)}\\right)` : fr(n, d);
  // Le calcul est nommé A et écrit en colonne : jamais de « = » en début de ligne.
  const lignes = [[mu4Tex(`A = ${fr(a, b)} ${op === 'x' ? '\\times' : '\\div'} ${par(c0, d0)}`), op === 'x' ? 'On veut calculer ce produit.' : 'On veut calculer ce quotient.']];
  let c = c0, d = d0;
  if(op === 'd'){ c = d0; d = c0; lignes.push([mu4Tex(`A = ${fr(a, b)} \\times ${par(c, d)}`), `On multiplie par l'inverse de ${mu4Moins(c0)}/${mu4Moins(d0)}, qui est ${mu4Moins(c)}/${mu4Moins(d)}.`]); }
  if(a === 0 || c === 0){ lignes.push([mu4Tex('A = 0'), 'Un des facteurs est nul : le produit est nul.']); out.innerHTML = r4Ex('', lignes); renderStaticMath(out); return; }
  const negs = [a, b, c, d].filter(v => v < 0).length, signe = negs % 2 ? '-' : '';
  lignes.push([mu4Tex(`A = ${signe}\\dfrac{${Math.abs(a)} \\times ${Math.abs(c)}}{${Math.abs(b)} \\times ${Math.abs(d)}}`), negs ? `${negs} nombre${negs > 1 ? 's' : ''} négatif${negs > 1 ? 's' : ''} : le résultat est ${negs % 2 ? 'négatif' : 'positif'}. On n'effectue pas encore les produits.` : 'On multiplie les numérateurs entre eux et les dénominateurs entre eux.']);
  // Décomposition en facteurs premiers et simplification.
  const num = mu4Premiers(a).concat(mu4Premiers(c)), den = mu4Premiers(b).concat(mu4Premiers(d));
  const restD = [...den], barN = num.map(p => { const j = restD.indexOf(p); if(j >= 0){ restD.splice(j, 1); return true; } return false; });
  const restN = [...num], barD = den.map(p => { const j = restN.indexOf(p); if(j >= 0){ restN.splice(j, 1); return true; } return false; });
  const communs = barN.filter(Boolean).length;
  const ecrire = (liste, barres) => liste.length ? liste.map((p, j) => barres[j] ? `\\cancel{${p}}` : p).join(' \\times ') : '1';
  const N = num.filter((p, j) => !barN[j]).reduce((x, y) => x * y, 1), D = den.filter((p, j) => !barD[j]).reduce((x, y) => x * y, 1);
  if(communs){
    lignes.push([mu4Long(`A = ${signe}\\dfrac{${ecrire(num, barN)}}{${ecrire(den, barD)}}`), `On décompose en facteurs premiers et on simplifie par les facteurs communs (${num.filter((p, j) => barN[j]).join(', ')}).`]);
    lignes.push([mu4Tex(`A = ${signe ? '-' : ''}${D === 1 ? N : fr(N, D)}`), D === 1 ? 'Le résultat est un nombre entier.' : 'On calcule : la fraction est irréductible.']);
  } else {
    lignes.push([mu4Tex(`A = ${signe ? '-' : ''}${D === 1 ? N : fr(N, D)}`), 'Aucun facteur commun : on calcule, la fraction est déjà irréductible.']);
  }
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 5 : produits en croix ---- */
function mu4Croix(){
  const ids = ['mu4-pA', 'mu4-pB', 'mu4-pC', 'mu4-pD'], out = document.getElementById('mu4-pRes');
  const brut = ids.map(id => String(document.getElementById(id).value).trim().toLowerCase().replace(',', '.'));
  const ix = brut.map((v, i) => v === 'x' ? i : -1).filter(i => i >= 0);
  const v = brut.map(t => t === 'x' ? null : Number(t));
  const erreur = t => { out.innerHTML = `<p class="hint" style="text-align:center;color:#a83c1f;">${t}</p>`; };
  if(ix.length > 1) return erreur('Mettez la lettre x dans une seule case.');
  if(v.some((t, i) => t !== null && (!Number.isFinite(t) || brut[i] === ''))) return erreur('Écrivez des nombres (ou la lettre x dans une case).');
  if(v[1] === 0 || v[3] === 0) return erreur('Un dénominateur ne peut pas être nul.');
  // Nombre à la française : virgule décimale, espace des milliers, vrai signe moins.
  const n = t => mu4Moins(String(t).replace('.', ',').replace(/^(-?\d+)/, m => m.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')));
  const aff = i => i === ix[0] ? 'x' : n(v[i]);
  const affTex = i => i === ix[0] ? 'x' : String(v[i]).replace('.', '{,}');
  const lignes = [[mu4Tex(`\\dfrac{${affTex(0)}}{${affTex(1)}} = \\dfrac{${affTex(2)}}{${affTex(3)}}`), ix.length ? 'On cherche le nombre x.' : 'Ces deux fractions sont-elles égales ?']];
  if(!ix.length){
    const p1 = v[0] * v[3], p2 = v[1] * v[2], r = t => n(Math.round(t * 1e6) / 1e6);
    lignes.push([`${n(v[0])} × ${n(v[3])} = ${r(p1)} et ${n(v[1])} × ${n(v[2])} = ${r(p2)}.`, 'On calcule les deux produits en croix.']);
    lignes.push([Math.abs(p1 - p2) < 1e-9 ? 'Les produits en croix sont égaux, donc les fractions sont égales.' : 'Les produits en croix sont différents, donc les fractions ne sont pas égales.', Math.abs(p1 - p2) < 1e-9 ? 'Propriété 2 (réciproque).' : 'Si elles étaient égales, les produits en croix le seraient (propriété 1).']);
  } else {
    const i = ix[0];
    // a × d = b × c : x est facteur d'un des deux produits ; l'autre facteur de ce produit est son « voisin en croix ».
    const voisin = { 0: 3, 3: 0, 1: 2, 2: 1 }[i], autres = i === 0 || i === 3 ? [1, 2] : [0, 3];
    const produit = v[autres[0]] * v[autres[1]], coef = v[voisin];
    lignes.push([`${i === 0 || i === 3 ? `${aff(0)} × ${aff(3)} = ${aff(1)} × ${aff(2)}` : `${aff(0)} × ${aff(3)} = ${aff(1)} × ${aff(2)}`}`, 'Les fractions sont égales, donc les produits en croix sont égaux.']);
    if(coef === 0){ lignes.push([produit === 0 ? 'Tout nombre x convient (0 = 0)… sauf s\'il annule un dénominateur.' : 'Aucun nombre x ne convient.', `On obtient 0 × x = ${n(produit)}.`]); }
    else {
      const x = produit / coef;
      lignes.push([`${n(coef)} × x = ${n(Math.round(produit * 1e6) / 1e6)}`, 'On calcule le produit connu.']);
      // Résultat exact : fraction simplifiée si le quotient n'est pas décimal simple.
      const dec = Math.round(x * 1e6) / 1e6, exact = Math.abs(dec - x) < 1e-12 && String(dec).split('.')[1]?.length <= 4 || Number.isInteger(x);
      let res = n(dec);
      if(!exact && Number.isInteger(produit) && Number.isInteger(coef)){ const g = mu4Pgcd(produit, coef), s = (produit < 0) !== (coef < 0) ? '−' : ''; res = `${s}${Math.abs(produit) / g}/${Math.abs(coef) / g} (≈ ${n(Math.round(x * 100) / 100)})`; }
      lignes.push([`x = ${n(Math.round(produit * 1e6) / 1e6)} ÷ ${n(coef)} = <b>${res}</b>`, 'On divise par le nombre qui multiplie x.']);
      if(i === 1 || i === 3){ if(Math.abs(x) < 1e-12) lignes.push(['Mais x est un dénominateur : il ne peut pas être nul. Pas de solution.', '']); }
    }
  }
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

DEMO_REGISTRY['4e|Fractions : multiplication et division'] = {
  cours: 'cours-demo-fractions-mult-4e', methode: 'methode-demo-fractions-mult-4e', exos: 'exos-demo-fractions-mult-4e', histoire: 'histoire-demo-fractions-mult-4e',
  init: () => {
    mu4AireDemo.init(); mu4SimplDemo.reset(); mu4DivDemo.init(); mu4Calculer(); mu4Croix();
    ['cours-demo-fractions-mult-4e', 'exos-demo-fractions-mult-4e', 'histoire-demo-fractions-mult-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-fractions-mult-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-fractions-mult-4e'));
  }
};

DEMO_QUIZZES['4e|Fractions : multiplication et division'] = [
  { q: '2/3 × 9/4 = ...', opts: ['18/7', '3/2', '11/7'], correct: 1 },
  { q: 'L\'inverse de −5/2 est...', opts: ['5/2', '−2/5', '2/5'], correct: 1 },
  { q: '3/4 ÷ 3/8 = ...', opts: ['9/32', '2', '1/2'], correct: 1 },
  { q: 'Les 2/5 de 35 valent...', opts: ['14', '7', '87,5'], correct: 0 },
  { q: 'Si x/6 = 10/15, alors x = ...', opts: ['4', '9', '25'], correct: 0 },
  { q: 'L\'inverse de 0...', opts: ['est 0', 'n\'existe pas', 'est 1'], correct: 1 },
  { q: '(−3/7) × (−7/3) = ...', opts: ['−1', '1', '0'], correct: 1 },
];

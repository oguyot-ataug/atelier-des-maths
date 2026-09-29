/* ============================================================
   CHAPITRE : Arithmétique (3e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 7-8) : plan du manuel (multiples et diviseurs, critères de
   divisibilité, nombres premiers, décomposition en produit de facteurs premiers, fractions
   irréductibles), titres reformulés, exemples nouveaux (différents de ceux du manuel ET de ceux du
   N2 de 4e, chapitres/4e/N2-divisibilite.js, qui suit le même plan). Nouveau en 3e : l'écriture
   avec puissances et l'unicité de la décomposition, la décomposition « en échelle », et trois
   outils qui travaillent sur n'importe quel nombre saisi (premier ou pas, décomposition,
   fraction irréductible) ; un problème de partage (type brevet) en méthode et en exercice.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const AR3_BLEU = '#0C5BA0', AR3_VERT = '#1E7B34', AR3_ROUGE = '#C0392B', AR3_ORANGE = '#E07B00';
const ar3Tex = s => `<span class="tex">${s}</span>`;
const ar3N = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');           // 36150 → « 36 150 »
const ar3T = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');         // pour KaTeX
const AR3_LISTE = 'style="margin:6px 0 0;padding-left:20px;line-height:1.8;"';
const AR3_PREMIERS_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

// Plus petit diviseur premier de n (n ≥ 2), et décomposition [[p, q], …] : n = p × q, puis q = …
function ar3PlusPetitDiviseur(n){ if(n % 2 === 0) return 2; for(let d = 3; d * d <= n; d += 2) if(n % d === 0) return d; return n; }
function ar3Echelle(n){ const e = []; while(n > 1){ const p = ar3PlusPetitDiviseur(n); e.push([n, p]); n = n / p; } return e; }
function ar3Facteurs(n){ return ar3Echelle(n).map(([, p]) => p); }
// Écriture avec puissances (facteurs dans l'ordre croissant), texte KaTeX.
function ar3Puissances(fs){
  const m = new Map(); fs.forEach(p => m.set(p, (m.get(p) || 0) + 1));
  return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([p, k]) => k > 1 ? `${ar3T(p)}^{${k}}` : ar3T(p)).join(' \\times ');
}
// Pourquoi p divise n : critère de divisibilité quand il existe, sinon la division.
function ar3Pourquoi(n, p){
  const s = String(n), somme = s.split('').reduce((t, c) => t + Number(c), 0);
  if(p === 2) return `${ar3N(n)} est pair (chiffre des unités ${s.slice(-1)}).`;
  if(p === 3) return `${s.split('').join(' + ')} = ${somme}, multiple de 3.`;
  if(p === 5) return `Le chiffre des unités de ${ar3N(n)} est ${s.slice(-1)}.`;
  if(p === n) return `${ar3N(n)} est premier : on s'arrête.`;
  return `${ar3N(n)} = ${p} × ${ar3N(n / p)} (on a essayé 2, 3, 5… dans l'ordre).`;
}
// Échelle affichée : nombres à gauche, diviseurs premiers à droite, séparés par un trait.
function ar3EchelleHtml(n, nb){
  const e = ar3Echelle(n), k = nb == null ? e.length : nb;
  const cell = 'padding:4px 14px;font-family:\'JetBrains Mono\',monospace;font-size:1.05rem;';
  return `<table style="border-collapse:collapse;margin:8px auto;">${e.slice(0, k).map(([m, p]) =>
    `<tr><td style="${cell}text-align:right;border-right:2px solid #1C1B2E;">${ar3N(m)}</td><td style="${cell}color:${AR3_BLEU};font-weight:700;">${p}</td></tr>`).join('')}
    ${k >= e.length ? `<tr><td style="${cell}text-align:right;border-right:2px solid #1C1B2E;">1</td><td></td></tr>` : ''}</table>`;
}

document.getElementById('cours-demo-arithmetique-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Multiples et diviseurs</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Soient <i>a</i> et <i>b</i> deux nombres entiers positifs. <b>S'il existe</b> un nombre entier <i>q</i> tel que <b><i>a</i> = <i>b</i> × <i>q</i></b>, <b>alors</b> :
  <ul ${AR3_LISTE}><li><i>a</i> est <b>divisible</b> par <i>b</i> ;</li><li><i>b</i> est un <b>diviseur</b> de <i>a</i> ;</li><li><i>a</i> est un <b>multiple</b> de <i>b</i>.</li></ul></div>
<p class="example-title">Exemple : on sait que 2 491 = 47 × 53.</p>
<ul class="example-list">
  <li>2 491 est divisible par 53 ; 53 est un diviseur de 2 491 ; 2 491 est un multiple de 53.</li>
  <li>Et aussi : 2 491 est divisible par 47 ; 47 est un diviseur de 2 491 ; 2 491 est un multiple de 47.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : « <i>a</i> est divisible par <i>b</i> » veut dire que le <b>reste</b> de la division euclidienne de <i>a</i> par <i>b</i> est nul.</div>

<div class="lesson-header"><span class="num">2</span><h3>Les critères de divisibilité</h3></div>
<span class="prop-badge">Règles</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un nombre entier est <b>divisible par 2</b> si son chiffre des unités est 0, 2, 4, 6 ou 8.</li>
  <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.</li>
  <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.</li>
  <li>Un nombre entier est <b>divisible par 4</b> si le nombre formé par son chiffre des dizaines et son chiffre des unités (dans cet ordre) est un multiple de 4.</li>
  <li>Un nombre entier est <b>divisible par 3</b> si la <b>somme de ses chiffres</b> est un multiple de 3.</li>
  <li>Un nombre entier est <b>divisible par 9</b> si la <b>somme de ses chiffres</b> est un multiple de 9.</li>
</ul></div>
<p class="example-title">Exemple : le nombre 36 150 est-il divisible par 2, 5, 10, 4, 3 ou 9 ?</p>
<ul class="example-list">
  <li>Son chiffre des unités est 0 : 36 150 est <b>divisible par 2, par 5 et par 10</b>.</li>
  <li>Le nombre formé par ses deux derniers chiffres est 50, qui n'est pas un multiple de 4 : 36 150 <b>n'est pas divisible par 4</b>.</li>
  <li>La somme de ses chiffres est 3 + 6 + 1 + 5 + 0 = 15 : c'est un multiple de 3, mais pas de 9. Donc 36 150 est <b>divisible par 3</b> mais <b>pas par 9</b>.</li>
</ul>

<div class="lesson-header"><span class="num">3</span><h3>Les nombres premiers</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Définition</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un nombre entier est <b>premier</b> s'il possède <b>exactement deux diviseurs</b> : 1 et lui-même.</div>
<p class="example-title">Remarques :</p>
<ul class="example-list">
  <li>1 n'a qu'un seul diviseur : il <b>n'est pas premier</b>.</li>
  <li>2 est le <b>seul</b> nombre premier pair.</li>
  <li>41 est premier : ses seuls diviseurs sont 1 et 41.</li>
  <li>57 <b>n'est pas premier</b> (même s'il en a l'air) : 5 + 7 = 12, il est divisible par 3, et 57 = 3 × 19.</li>
</ul>
<div class="sub-header"><span class="letter">B</span><h4>Les nombres premiers inférieurs à 100</h4></div>
<div class="def-box" style="text-align:center;">Il y en a <b>25</b> :<br><span style="font-family:'JetBrains Mono',monospace;line-height:1.9;">${AR3_PREMIERS_100.slice(0, 15).join(' – ')}<br>${AR3_PREMIERS_100.slice(15).join(' – ')}</span></div>
<div class="redaction-note" ${R4_REM}>Pour savoir si un nombre est premier, on essaie de le diviser par les nombres premiers 2, 3, 5, 7, 11… dans l'ordre. On peut s'arrêter dès que le carré du nombre premier essayé dépasse le nombre (outil dans l'onglet Méthode).</div>

<div class="lesson-header"><span class="num">4</span><h3>La décomposition en produit de facteurs premiers</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Tout nombre entier <i>n</i> supérieur ou égal à 2 peut s'écrire comme un <b>produit de nombres premiers</b>. Écrite sous la forme ${ar3Tex('n = p_1^{\\,\\alpha_1} \\times p_2^{\\,\\alpha_2} \\times \\dots \\times p_k^{\\,\\alpha_k}')}, cette écriture est <b>unique</b> (à l'ordre des facteurs près) : c'est la <b>décomposition en produit de facteurs premiers</b> de <i>n</i>.</div>
<p class="example-title">Exemple : 700 = 7 × 100 = 7 × 4 × 25 = 7 × 2 × 2 × 5 × 5 = ${ar3Tex('2^2 \\times 5^2 \\times 7')}. Les facteurs premiers de 700 sont 2, 5 et 7.</p>
<div class="redaction-note" ${R4_REM}>Remarque : en général, on écrit les facteurs premiers dans l'<b>ordre croissant</b>.</div>
<span class="prop-badge">Méthode</span>
<div class="def-box">Pour décomposer un nombre, on le divise <b>progressivement</b> par des nombres premiers (2, 3, 5, 7, 11…), en recommençant avec chaque quotient, jusqu'à obtenir 1.</div>
<div style="display:flex;flex-wrap:wrap;gap:10px 30px;align-items:center;justify-content:center;">
  <div>${r4Ex('Exemple 1 : décomposer 4 862.', [
    ['4 862 = 2 × 2 431', '4 862 est pair.'],
    ['4 862 = 2 × 11 × 221', "2 431 n'est divisible ni par 3, ni par 5, ni par 7, mais 2 431 = 11 × 221."],
    ['4 862 = 2 × 11 × 13 × 17', '221 = 13 × 17, et 13 et 17 sont premiers : on s\'arrête.'],
  ])}</div>
  <div style="text-align:center;"><p class="example-title" style="margin-bottom:0;">Exemple 2 : 1 260 « en échelle »</p>${ar3EchelleHtml(1260)}<p style="margin:0;">1 260 = ${ar3Tex(ar3Puissances(ar3Facteurs(1260)))}</p></div>
</div>

<div class="lesson-header"><span class="num">5</span><h3>Rendre une fraction irréductible</h3></div>
<span class="def-badge">Définition</span>
<div class="def-box">Une fraction est <b>irréductible</b> quand on ne peut plus la simplifier.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list"><li>${ar3Tex('\\dfrac{14}{21}')} n'est pas irréductible : ${ar3Tex('\\dfrac{14}{21} = \\dfrac{2 \\times 7}{3 \\times 7} = \\dfrac{2}{3}')}. En revanche, ${ar3Tex('\\dfrac{8}{15}')} est irréductible (8 = 2³ et 15 = 3 × 5 n'ont aucun facteur commun).</li></ul>
<span class="prop-badge">Méthode</span>
<div class="def-box">On <b>décompose</b> le numérateur et le dénominateur en produits de facteurs premiers, puis on <b>simplifie</b> par tous les facteurs communs. Quand il n'en reste plus, la fraction est irréductible.</div>
${r4Ex('Exemple : rendre irréductible ' + ar3Tex('\\dfrac{210}{1\\,386}') + '.', [
  ['210 = 2 × 3 × 5 × 7 et 1 386 = 2 × 3 × 3 × 7 × 11', 'On décompose le numérateur et le dénominateur.'],
  [ar3Tex('\\dfrac{210}{1\\,386} = \\dfrac{\\cancel{2} \\times \\cancel{3} \\times 5 \\times \\cancel{7}}{\\cancel{2} \\times \\cancel{3} \\times 3 \\times \\cancel{7} \\times 11}'), 'On simplifie par les facteurs communs 2, 3 et 7.'],
  [ar3Tex('\\dfrac{210}{1\\,386} = \\dfrac{5}{3 \\times 11} = \\dfrac{5}{33}'), 'Plus de facteur commun : la fraction est irréductible.'],
])}
`;

document.getElementById('histoire-demo-arithmetique-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  En 1742, le mathématicien <b>Christian Goldbach</b> écrit à Leonhard Euler : il lui semble que <b>tout nombre pair supérieur à 2 est la somme de deux nombres premiers</b> (4 = 2 + 2, 10 = 3 + 7 = 5 + 5, 100 = 3 + 97…). Les ordinateurs l'ont vérifié pour des milliards de milliards de nombres, mais personne n'a jamais réussi à le démontrer : c'est l'une des plus célèbres énigmes non résolues des mathématiques ! Autre chasse aux trésors : au 17e siècle, le moine <b>Marin Mersenne</b> étudie les nombres de la forme 2<sup>n</sup> − 1 (3, 7, 31, 127…), dont beaucoup sont premiers. C'est parmi eux qu'on trouve les records : en octobre 2024, le plus grand nombre premier connu, 2<sup>136 279 841</sup> − 1, comptait plus de 41 millions de chiffres.
</div>
`;

document.getElementById('methode-demo-arithmetique-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : un nombre est-il premier ?</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre entier : on essaie de le diviser par 2, 3, 5, 7, 11… et on s'arrête dès que le carré du diviseur essayé dépasse le nombre.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="ar3-prNombre" type="text" inputmode="numeric" value="221" maxlength="9" style="font-family:'JetBrains Mono',monospace;font-size:1.15rem;padding:8px 12px;border-radius:8px;border:1px solid #C9D6E6;width:150px;text-align:center;" onkeydown="if(event.key==='Enter') ar3PremierTester()">
    <button class="btn" onclick="ar3PremierTester()">Tester</button>
  </div>
  <div id="ar3-prResultat"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : décomposer un nombre, étape par étape</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre entier (2 à 10 000 000), puis cliquez sur « Étape suivante » : on divise chaque fois par le plus petit nombre premier possible.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="ar3-dcNombre" type="text" inputmode="numeric" value="3 780" maxlength="10" style="font-family:'JetBrains Mono',monospace;font-size:1.15rem;padding:8px 12px;border-radius:8px;border:1px solid #C9D6E6;width:150px;text-align:center;" onkeydown="if(event.key==='Enter') ar3DecompDepart()">
    <button class="btn secondary" onclick="ar3DecompDepart()">Nouveau nombre</button>
  </div>
  <div style="display:flex;flex-wrap:wrap;gap:10px 30px;justify-content:center;align-items:flex-start;">
    <div id="ar3-dcEchelle"></div>
    <div id="ar3-dcTexte" style="max-width:420px;line-height:1.8;"></div>
  </div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ar3DecompSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="ar3DecompTout()">Tout afficher</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : rendre une fraction irréductible</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez le numérateur et le dénominateur : ils sont décomposés, les facteurs communs sont barrés.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="ar3-frNum" type="text" inputmode="numeric" value="462" maxlength="9" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:120px;text-align:center;" onkeydown="if(event.key==='Enter') ar3FractionCalculer()">
    <span style="font-size:1.4rem;">/</span>
    <input id="ar3-frDen" type="text" inputmode="numeric" value="1155" maxlength="9" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:120px;text-align:center;" onkeydown="if(event.key==='Enter') ar3FractionCalculer()">
    <button class="btn" onclick="ar3FractionCalculer()">Simplifier</button>
  </div>
  <div id="ar3-frResultat" style="text-align:center;line-height:2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : un problème de partage</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Un fleuriste a 126 roses et 90 tulipes. Il veut faire le plus grand nombre possible de bouquets identiques, en utilisant toutes les fleurs. Combien de bouquets ? Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="ar3-partageDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="ar3PartageDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="ar3PartageDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function ar3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="ar3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="ar3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-arithmetique-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Décomposer un nombre en produit de facteurs premiers »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">2 772 = 2 × 1 386</span><span class="we-comment">1. On divise par le plus petit nombre premier possible (ici 2 : le nombre est pair).</span></div>
    <div class="we-row"><span class="we-expr">2 772 = 2 × 2 × 693</span><span class="we-comment">2. On recommence avec le quotient.</span></div>
    <div class="we-row"><span class="we-expr">2 772 = 2 × 2 × 3 × 3 × 77</span><span class="we-comment">3. 6 + 9 + 3 = 18 : divisible par 3, deux fois (693 = 3 × 231 = 3 × 3 × 77).</span></div>
    <div class="we-row"><span class="we-expr">2 772 = 2 × 2 × 3 × 3 × 7 × 11</span><span class="we-comment">4. 77 = 7 × 11 : tous les facteurs sont premiers.</span></div>
    <div class="we-row"><span class="we-expr">2 772 = ${ar3Tex('2^2 \\times 3^2 \\times 7 \\times 11')}</span><span class="we-comment">5. On regroupe avec des puissances, facteurs dans l'ordre croissant.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${ar3Exo(1, 'On sait que 3 233 = 53 × 61. Complète : 3 233 est … par 61 ; 53 est un … de 3 233 ; 3 233 est un … de 53. Le nombre 3 233 est-il premier ?', [
    '3 233 est divisible par 61 ; 53 est un diviseur de 3 233 ; 3 233 est un multiple de 53.', '3 233 n\'est pas premier : il a au moins quatre diviseurs (1, 53, 61 et 3 233).'])}
  ${ar3Exo(2, 'On considère le nombre 42▢6, où ▢ est un chiffre inconnu. Quelles valeurs peut prendre ▢ pour que ce nombre soit divisible par 9 ? par 4 ?', [
    'Par 9 : la somme des chiffres 4 + 2 + ▢ + 6 = 12 + ▢ doit être un multiple de 9, donc 12 + ▢ = 18 : ▢ = 6.',
    'Par 4 : le nombre formé par les deux derniers chiffres, ▢6, doit être un multiple de 4 : 16, 36, 56, 76 ou 96, donc ▢ = 1, 3, 5, 7 ou 9.'])}
  ${ar3Exo(3, 'Donne la liste de tous les diviseurs de 90.', [
    '90 = 1 × 90 = 2 × 45 = 3 × 30 = 5 × 18 = 6 × 15 = 9 × 10', 'Les diviseurs de 90 sont : 1 ; 2 ; 3 ; 5 ; 6 ; 9 ; 10 ; 15 ; 18 ; 30 ; 45 ; 90.'])}
  ${ar3Exo(4, 'Les nombres 187 ; 191 ; 221 et 391 sont-ils premiers ? Justifie.', [
    '187 = 11 × 17 : il n\'est pas premier.',
    '191 n\'est divisible ni par 2, 3, 5, 7, 11, ni par 13 (et 17 × 17 = 289 > 191) : il est premier.',
    '221 = 13 × 17 : il n\'est pas premier.', '391 = 17 × 23 : il n\'est pas premier.'])}
  ${ar3Exo(5, 'Décompose en produit de facteurs premiers : 540 ; 2 940 ; 1 547.', [
    '540 = 2 × 2 × 3 × 3 × 3 × 5 = ' + ar3Tex('2^2 \\times 3^3 \\times 5'),
    '2 940 = 2 × 2 × 3 × 5 × 7 × 7 = ' + ar3Tex('2^2 \\times 3 \\times 5 \\times 7^2'),
    '1 547 = 7 × 13 × 17'])}
  ${ar3Exo(6, 'Rends irréductible la fraction ' + ar3Tex('\\dfrac{462}{1\\,155}') + '.', [
    '462 = 2 × 3 × 7 × 11 et 1 155 = 3 × 5 × 7 × 11', 'Facteurs communs : 3, 7 et 11.',
    ar3Tex('\\dfrac{462}{1\\,155} = \\dfrac{2 \\times \\cancel{3} \\times \\cancel{7} \\times \\cancel{11}}{\\cancel{3} \\times 5 \\times \\cancel{7} \\times \\cancel{11}} = \\dfrac{2}{5}')])}
  ${ar3Exo(7, 'Un collège organise une sortie avec 168 élèves de 4e et 120 élèves de 3e. On veut former des groupes, tous avec le même nombre d\'élèves de 4e et le même nombre d\'élèves de 3e, en répartissant tous les élèves. Quel est le plus grand nombre de groupes possible ? Combien d\'élèves de chaque niveau par groupe ?', [
    '168 = ' + ar3Tex('2^3 \\times 3 \\times 7') + ' et 120 = ' + ar3Tex('2^3 \\times 3 \\times 5') + '.',
    'Le nombre de groupes doit diviser 168 et 120. Le plus grand diviseur commun est formé des facteurs communs : ' + ar3Tex('2^3 \\times 3 = 24') + '.',
    'On peut faire 24 groupes, avec 168 ÷ 24 = 7 élèves de 4e et 120 ÷ 24 = 5 élèves de 3e par groupe.'])}
  ${ar3Exo(8, 'Vrai ou faux ? Justifie. a) Le produit de deux nombres premiers est un nombre premier. b) Un nombre divisible par 2 et par 3 est divisible par 6. c) Un nombre divisible par 4 et par 6 est divisible par 24.', [
    'a) Faux : 3 et 5 sont premiers, mais 3 × 5 = 15 est divisible par 3 et par 5.',
    'b) Vrai : 2 et 3 apparaissent tous les deux dans sa décomposition, donc 2 × 3 = 6 est un de ses diviseurs.',
    'c) Faux : 12 est divisible par 4 et par 6, mais pas par 24.'])}
</div>
`;

/* ---- Méthode 1 : premier ou pas ---- */
function ar3Lire(id){ const s = String(document.getElementById(id).value || '').replace(/[\s.]/g, ''); return /^\d{1,9}$/.test(s) ? Number(s) : NaN; }
function ar3PremierTester(){
  const n = ar3Lire('ar3-prNombre'), out = document.getElementById('ar3-prResultat');
  if(!(n >= 2 && n <= 10000000)){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez un nombre entier entre 2 et 10 000 000.</p>'; return; }
  const essais = []; let div = null;
  for(let d = 2; d * d <= n; d = d === 2 ? 3 : d + 2){
    if(ar3PlusPetitDiviseur(d) !== d) continue; // seulement les nombres premiers
    const r = n % d; essais.push([d, r]);
    if(r === 0){ div = d; break; }
    if(essais.length > 60) break;
  }
  const lignes = essais.map(([d, r]) => `<div style="display:flex;gap:10px;justify-content:center;font-family:'JetBrains Mono',monospace;"><span>${ar3N(n)} ÷ ${d}</span><span style="color:${r ? '#8A919C' : AR3_ROUGE};">${r ? 'reste ' + r : '= ' + ar3N(n / d) + ' tombe juste'}</span></div>`).join('');
  const dern = essais.length ? essais[essais.length - 1][0] : 1;
  let conclu;
  if(div) conclu = `<b style="color:${AR3_ROUGE};">${ar3N(n)} n'est pas premier</b> : ${ar3N(n)} = ${div} × ${ar3N(n / div)}.`;
  else { let s = dern + 1; while(ar3PlusPetitDiviseur(s) !== s) s++;
    conclu = `<b style="color:${AR3_VERT};">${ar3N(n)} est premier</b> : aucune division ne tombe juste${essais.length ? `, et le nombre premier suivant, ${s}, vérifie ${s} × ${s} = ${ar3N(s * s)} > ${ar3N(n)} : inutile d'aller plus loin` : ''}.`; }
  out.innerHTML = `<div style="line-height:1.9;margin:6px 0;">${lignes}</div><p style="text-align:center;margin:8px 0 0;">${conclu}</p>`;
}

/* ---- Méthode 2 : décomposition pas à pas ---- */
let ar3Dc = { n: 3780, k: 0 };
function ar3DecompDepart(){
  const n = ar3Lire('ar3-dcNombre');
  if(!(n >= 2 && n <= 10000000)){ document.getElementById('ar3-dcTexte').innerHTML = '<p class="hint" style="color:#a83c1f;">Écrivez un nombre entier entre 2 et 10 000 000.</p>'; document.getElementById('ar3-dcEchelle').innerHTML = ''; return; }
  ar3Dc = { n, k: 0 }; ar3DecompAfficher();
}
function ar3DecompAfficher(){
  const e = ar3Echelle(ar3Dc.n), k = ar3Dc.k, fs = e.slice(0, k).map(([, p]) => p);
  document.getElementById('ar3-dcEchelle').innerHTML = ar3EchelleHtml(ar3Dc.n, Math.max(1, k)).replace(k === 0 ? /<td style="([^"]*)color:#0C5BA0;font-weight:700;">\d+<\/td>/ : /$^/, '<td style="$1"></td>');
  let h = k === 0 ? `<p style="margin:0;">On cherche le plus petit nombre premier qui divise ${ar3N(ar3Dc.n)}.</p>` : '';
  if(k > 0){
    const [m, p] = e[k - 1], reste = m / p;
    h += `<p style="margin:0 0 6px;">${ar3Pourquoi(m, p)}</p>`;
    h += `<p style="margin:0;font-family:'JetBrains Mono',monospace;">${ar3N(ar3Dc.n)} = ${fs.join(' × ')}${reste > 1 ? ' × ' + ar3N(reste) : ''}</p>`;
    if(k === e.length) h += `<p style="margin:8px 0 0;"><b style="color:${AR3_VERT};">Terminé :</b> ${ar3Tex(ar3T(ar3Dc.n) + ' = ' + ar3Puissances(fs))}</p>`;
  }
  const t = document.getElementById('ar3-dcTexte'); t.innerHTML = h; renderStaticMath(t);
}
function ar3DecompSuivant(){ const e = ar3Echelle(ar3Dc.n); if(ar3Dc.k < e.length){ ar3Dc.k++; ar3DecompAfficher(); } }
function ar3DecompTout(){ ar3Dc.k = ar3Echelle(ar3Dc.n).length; ar3DecompAfficher(); }

/* ---- Méthode 3 : fraction irréductible ---- */
function ar3FractionCalculer(){
  const a = ar3Lire('ar3-frNum'), b = ar3Lire('ar3-frDen'), out = document.getElementById('ar3-frResultat');
  if(!(a >= 1 && b >= 1 && a <= 10000000 && b <= 10000000)){ out.innerHTML = '<p class="hint" style="color:#a83c1f;">Écrivez deux nombres entiers entre 1 et 10 000 000.</p>'; return; }
  const fa = a > 1 ? ar3Facteurs(a) : [], fb = b > 1 ? ar3Facteurs(b) : [];
  const reste = fb.slice(), communs = [];
  const haut = fa.map(p => { const i = reste.indexOf(p); if(i >= 0){ reste.splice(i, 1); communs.push(p); return `\\cancel{${p}}`; } return String(p); });
  const dispo = communs.slice();
  const bas = fb.map(p => { const i = dispo.indexOf(p); if(i >= 0){ dispo.splice(i, 1); return `\\cancel{${p}}`; } return String(p); });
  const g = communs.reduce((t, p) => t * p, 1), A = a / g, B = b / g;
  const prod = l => l.length ? l.join(' \\times ') : '1';
  out.innerHTML = `<div>${ar3N(a)} = ${fa.length ? fa.join(' × ') : '1'} &nbsp;&nbsp; et &nbsp;&nbsp; ${ar3N(b)} = ${fb.length ? fb.join(' × ') : '1'}</div>`
    + `<div>${communs.length ? `Facteurs communs : ${communs.join(', ')}.` : 'Aucun facteur commun : la fraction est déjà irréductible.'}</div>`
    + `<div style="font-size:1.1rem;">${ar3Tex(`\\dfrac{${ar3T(a)}}{${ar3T(b)}} = \\dfrac{${prod(haut)}}{${prod(bas)}} = \\dfrac{${ar3T(A)}}{${ar3T(B)}}`)}${B === 1 ? ' = ' + ar3N(A) : ''}</div>`;
  renderStaticMath(out);
}

/* ---- Méthode 4 : problème de partage ---- */
const AR3_PARTAGE_STEPS = [
  { expr: 'Le nombre de bouquets doit diviser 126 et 90.', note: 'Toutes les fleurs sont utilisées et les bouquets sont identiques : chaque bouquet a autant de roses, et autant de tulipes.' },
  { expr: '126 = 2 × 3 × 3 × 7 = ' + ar3Tex('2 \\times 3^2 \\times 7'), note: 'On décompose 126.' },
  { expr: '90 = 2 × 3 × 3 × 5 = ' + ar3Tex('2 \\times 3^2 \\times 5'), note: 'On décompose 90.' },
  { expr: 'Facteurs communs : 2 × 3 × 3 = 18', note: 'Le plus grand diviseur commun est le produit des facteurs premiers communs.' },
  { expr: '18 bouquets, avec 126 ÷ 18 = 7 roses et 90 ÷ 18 = 5 tulipes chacun.', note: 'On conclut en répondant à la question.' },
];
const ar3PartageDemo = makeStepDemo(AR3_PARTAGE_STEPS, 'ar3-partageDisplay');

DEMO_REGISTRY['3e|Arithmétique'] = {
  cours: 'cours-demo-arithmetique-3e', methode: 'methode-demo-arithmetique-3e', exos: 'exos-demo-arithmetique-3e', histoire: 'histoire-demo-arithmetique-3e',
  init: () => {
    ar3PremierTester(); ar3DecompDepart(); ar3FractionCalculer(); ar3PartageDemo.reset();
    ['cours-demo-arithmetique-3e', 'methode-demo-arithmetique-3e', 'exos-demo-arithmetique-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-arithmetique-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-arithmetique-3e'));
  }
};

DEMO_QUIZZES['3e|Arithmétique'] = [
  { q: 'On sait que 2 491 = 47 × 53. Alors...', opts: ['47 est un diviseur de 2 491', '2 491 est un diviseur de 53', '53 est un multiple de 2 491'], correct: 0 },
  { q: 'Le nombre 36 150 est divisible par...', opts: ['4', '9', '3'], correct: 2 },
  { q: 'Lequel de ces nombres est premier ?', opts: ['51', '57', '59'], correct: 2 },
  { q: 'Le nombre 1 est-il premier ?', opts: ['Oui', 'Non'], correct: 1 },
  { q: 'La décomposition en produit de facteurs premiers de 360 est...', opts: ['2³ × 3² × 5', '4 × 9 × 10', '2² × 3³ × 5'], correct: 0 },
  { q: 'La fraction 14/21 est égale à la fraction irréductible...', opts: ['7/10', '2/3', '1/7'], correct: 1 },
  { q: 'Avec 126 roses et 90 tulipes, on peut faire au plus ... bouquets identiques (toutes les fleurs utilisées).', opts: ['9', '18', '36'], correct: 1 },
];

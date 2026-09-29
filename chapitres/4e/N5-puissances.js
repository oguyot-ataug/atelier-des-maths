/* ============================================================
   CHAPITRE : Puissances (4e, N5)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel p. 42-43 : puissances d'un nombre relatif, priorité, puissances de 10,
   préfixes, calculs, écriture scientifique). Plan du manuel, titres reformulés, exemples nouveaux.
   Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   ============================================================ */

const PW4_BLEU = '#0C5BA0', PW4_ORANGE = '#E07B00', PW4_VERT = '#1E7B34', PW4_ENCRE = '#1C1B2E';
// Une formule courte n'est jamais coupée en fin de ligne ; une longue peut l'être.
const pw4Tex = s => `<span class="tex"${s.length < 28 && !s.includes('frac') && !s.includes('brace') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
// Nombre décimal écrit à la française à partir de sa chaîne de chiffres (espaces par groupes de 3).
function pw4Fr(txt){
  let [e, d] = String(txt).split('.'); const neg = e.startsWith('-'); if(neg) e = e.slice(1);
  e = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if(d) d = d.replace(/(\d{3})(?=\d)/g, '$1 ');
  return (neg ? '−' : '') + e + (d ? ',' + d : '');
}
// Nombre (valeur JS) sans bruit d'arrondi, écrit à la française.
const pw4N = v => { let t = Number(v.toPrecision(12)); let s = Math.abs(t) < 1e-6 && t !== 0 ? t.toFixed(12).replace(/0+$/, '') : String(t); if(/e/.test(s)) s = t.toFixed(0); return pw4Fr(s); };
function pw4Tab(lignes){
  return `<div style="overflow-x:auto;position:relative;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.9rem;">${lignes.map(l => `<tr>${l.map((c, j) =>
    `<td style="border:1px solid #C9D6E6;padding:5px 8px;text-align:center;white-space:nowrap;${j === 0 ? 'background:#F4F5F8;font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
const PW4_PREFIXES = [
  ['téra', 'T', 12, '1 To (téraoctet) = 10¹² octets : la capacité d\'un disque dur.'],
  ['giga', 'G', 9, '1 GHz (gigahertz) = 10⁹ Hz : un processeur d\'ordinateur fait quelques milliards d\'opérations par seconde.'],
  ['méga', 'M', 6, '1 MW (mégawatt) = 10⁶ W : une grande éolienne produit 2 à 3 MW.'],
  ['kilo', 'k', 3, '1 km = 10³ m : environ 12 minutes de marche.'],
  ['hecto', 'h', 2, '1 hPa (hectopascal) = 10² Pa : la pression de l\'air est d\'environ 1 013 hPa.'],
  ['déca', 'da', 1, '1 dag (décagramme) = 10 g : à peu près deux morceaux de sucre.'],
  ['déci', 'd', -1, '1 dL (décilitre) = 10⁻¹ L : un petit verre d\'eau.'],
  ['centi', 'c', -2, '1 cm = 10⁻² m : à peu près la largeur d\'un ongle.'],
  ['milli', 'm', -3, '1 mm = 10⁻³ m : à peu près l\'épaisseur d\'une carte bancaire.'],
  ['micro', 'µ', -6, '1 µm (micromètre) = 10⁻⁶ m : une bactérie mesure 1 à 2 µm, un cheveu environ 70 µm d\'épaisseur.'],
  ['nano', 'n', -9, '1 nm (nanomètre) = 10⁻⁹ m : un brin d\'ADN mesure environ 2 nm de large.'],
  ['pico', 'p', -12, '1 pm (picomètre) = 10⁻¹² m : le rayon d\'un atome d\'hydrogène est d\'environ 50 pm.'],
];

document.getElementById('cours-demo-puissances-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les puissances d'un nombre relatif</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Un produit de facteurs égaux</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout nombre entier <i>n</i> positif non nul et tout nombre relatif <i>a</i> :
  <div style="text-align:center;margin:8px 0;">${pw4Tex('a^n = \\underbrace{a \\times a \\times \\ldots \\times a}_{n \\text{ facteurs}}')} &nbsp; et, par convention, ${pw4Tex('a^0 = 1')} (si <i>a</i> ≠ 0).</div>
  ${pw4Tex('a^n')} se lit « <i>a</i> puissance <i>n</i> » : c'est la <b>puissance <i>n</i>-ième</b> de <i>a</i>, et <i>n</i> est l'<b>exposant</b>.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${pw4Tex('3^4 = 3 \\times 3 \\times 3 \\times 3 = 81')} ; ${pw4Tex('0{,}5^3 = 0{,}5 \\times 0{,}5 \\times 0{,}5 = 0{,}125')}.</li>
  <li>${pw4Tex('(-2)^5 = (-2) \\times (-2) \\times (-2) \\times (-2) \\times (-2) = -32')} : 5 facteurs négatifs, le résultat est négatif.</li>
  <li>${pw4Tex('(-2)^4 = 16')} : 4 facteurs négatifs, le résultat est positif.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarques : ${pw4Tex('a^1 = a')}. Une puissance d'un nombre négatif est <b>positive si l'exposant est pair</b>, <b>négative s'il est impair</b>. Attention aux parenthèses : ${pw4Tex('(-2)^4 = 16')} mais ${pw4Tex('-2^4 = -(2 \\times 2 \\times 2 \\times 2) = -16')} (l'exposant ne porte que sur 2).</div>

<div class="sub-header"><span class="letter">B</span><h4>Les puissances dans un calcul</h4></div>
<span class="prop-badge">Règle de priorité</span>
<div class="def-box">En l'absence de parenthèses, on calcule les <b>puissances en premier</b>, avant les multiplications, les divisions, les additions et les soustractions.</div>
${r4Ex('Exemples :', [
  [pw4Tex('5 + 3 \\times 2^4 = 5 + 3 \\times 16 = 5 + 48 = 53'), 'La puissance d\'abord, puis la multiplication, puis l\'addition.'],
  [pw4Tex('20 - 2 \\times 3^2 = 20 - 2 \\times 9 = 20 - 18 = 2'), ''],
  [pw4Tex('(5 + 3)^2 = 8^2 = 64'), 'Avec des parenthèses, on calcule d\'abord ce qu\'elles contiennent.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Les puissances de 10</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Exposant positif, exposant négatif</h4></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Pour tout nombre entier <i>n</i> positif non nul :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:2.4;">
    <li>${pw4Tex('10^n = \\underbrace{10 \\times 10 \\times \\ldots \\times 10}_{n \\text{ facteurs}} = 1\\underbrace{0\\ldots0}_{n \\text{ zéros}}')} et, par convention, ${pw4Tex('10^0 = 1')} ;</li>
    <li>${pw4Tex('10^{-n} = \\dfrac{1}{10^n} = 0{,}\\underbrace{0\\ldots0}_{n-1 \\text{ zéros}}1')} : le chiffre 1 est au <i>n</i>-ième rang après la virgule.</li>
  </ul></div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${pw4Tex('10^6 = 1\\,000\\,000')} (un million : 6 zéros) ; ${pw4Tex('10^9')} est un milliard.</li>
  <li>${pw4Tex('10^{-4} = \\dfrac{1}{10^4} = 0{,}000\\,1')} (un dix-millième : le 1 est au 4e rang après la virgule).</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Les préfixes des unités</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Ces <b>préfixes</b>, placés devant une unité, désignent des puissances de 10 :
  ${pw4Tab([['Préfixe', ...PW4_PREFIXES.map(p => p[0])], ['Symbole', ...PW4_PREFIXES.map(p => p[1])], ['Valeur', ...PW4_PREFIXES.map(p => pw4Tex('10^{' + p[2] + '}'))]])}</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>1 <b>méga</b>watt = ${pw4Tex('10^6')} watts ; 1 <b>téra</b>octet = ${pw4Tex('10^{12}')} octets.</li>
  <li>1 <b>micro</b>mètre = ${pw4Tex('10^{-6}')} mètre ; 1 <b>nano</b>seconde = ${pw4Tex('10^{-9}')} seconde.</li>
</ul>

<div class="sub-header"><span class="letter">C</span><h4>Multiplier et diviser des puissances de 10</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres entiers relatifs <i>m</i> et <i>p</i> :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.6;">${pw4Tex('10^m \\times 10^p = 10^{m+p}')} &nbsp;&nbsp; et &nbsp;&nbsp; ${pw4Tex('\\dfrac{10^m}{10^p} = 10^{m-p}')}</div></div>
${r4Ex('Exemples :', [
  [pw4Tex('10^5 \\times 10^{-8} = 10^{5 + (-8)} = 10^{-3}'), 'On additionne les exposants.'],
  [pw4Tex('\\dfrac{10^4}{10^{-2}} = 10^{4 - (-2)} = 10^6'), 'On soustrait les exposants : attention au signe moins !'],
])}
<div class="redaction-note" ${R4_REM}>Pourquoi ? ${pw4Tex('10^3 \\times 10^2 = (10 \\times 10 \\times 10) \\times (10 \\times 10)')} : il y a 3 + 2 = 5 facteurs 10, donc ${pw4Tex('10^5')}.</div>

<div class="lesson-header"><span class="num">3</span><h3>L'écriture scientifique</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Multiplier par une puissance de 10</h4></div>
<span class="prop-badge">Propriété 1</span>
<div class="def-box">Multiplier un nombre par ${pw4Tex('10^n')} (<i>n</i> entier positif) revient à <b>décaler la virgule de <i>n</i> rangs vers la droite</b> (en complétant par des zéros si nécessaire).</div>
<ul class="example-list"><li>${pw4Tex('3{,}742 \\times 10^4 = 37\\,420')} : la virgule avance de 4 rangs vers la droite.</li></ul>
<span class="prop-badge">Propriété 2</span>
<div class="def-box">Multiplier un nombre par ${pw4Tex('10^{-n}')} revient à <b>décaler la virgule de <i>n</i> rangs vers la gauche</b> (en complétant par des zéros si nécessaire).</div>
<ul class="example-list"><li>${pw4Tex('58{,}6 \\times 10^{-3} = 0{,}058\\,6')} : la virgule recule de 3 rangs vers la gauche.</li></ul>

<div class="sub-header"><span class="letter">B</span><h4>L'écriture scientifique d'un nombre</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Tout nombre décimal non nul peut s'écrire sous la forme ${pw4Tex('a \\times 10^n')}, où :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><i>a</i> est un nombre décimal qui n'a qu'<b>un seul chiffre non nul avant la virgule</b> (pour un nombre positif : ${pw4Tex('1 \\leqslant a < 10')}) ;</li>
    <li><i>n</i> est un nombre entier relatif.</li>
  </ul>
  C'est son <b>écriture scientifique</b> (ou notation scientifique). Elle permet d'écrire et de comparer facilement de très grands et de très petits nombres.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Masse de la Terre : 5 972 000 000 000 000 000 000 000 kg = ${pw4Tex('5{,}972 \\times 10^{24}')} kg.</li>
  <li>Vitesse de la lumière : environ 300 000 km/s = ${pw4Tex('3 \\times 10^5')} km/s.</li>
  <li>Épaisseur d'un cheveu : environ 0,000 07 m = ${pw4Tex('7 \\times 10^{-5}')} m.</li>
  <li>Taille d'un virus : environ 0,000 000 1 m = ${pw4Tex('1 \\times 10^{-7}')} m.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Attention : ${pw4Tex('72{,}5 \\times 10^3')} n'est pas une écriture scientifique (deux chiffres avant la virgule). On l'écrit ${pw4Tex('7{,}25 \\times 10^1 \\times 10^3 = 7{,}25 \\times 10^4')}.</div>
`;

document.getElementById('histoire-demo-puissances-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Au 3e siècle avant J.-C., <b>Archimède</b> se lance un défi dans un texte appelé <i>L'Arénaire</i> : compter les grains de sable qu'il faudrait pour remplir l'Univers ! Pour écrire un nombre aussi énorme (environ ${pw4Tex('10^{63}')} dans notre écriture), il invente un système de « myriades de myriades », une idée très proche de nos puissances. En 1484, le Français <b>Nicolas Chuquet</b> utilise des exposants, y compris 0 et des exposants négatifs, et propose les mots « byllion » et « tryllion ». La notation ${pw4Tex('a^n')} avec l'exposant en haut à droite se répand grâce à <b>René Descartes</b> (1637). Les préfixes kilo, hecto, déca, déci, centi et milli naissent avec le système métrique, à la Révolution française (1795) ; méga, giga, téra, micro, nano et pico s'y ajoutent au 20e siècle, et en 2022 les scientifiques ont même créé <b>ronna</b> (${pw4Tex('10^{27}')}) et <b>quetta</b> (${pw4Tex('10^{30}')}) pour mesurer… la masse de la Terre ou du Soleil ! Enfin, en 1938, un garçon de 9 ans, Milton Sirotta, neveu du mathématicien Edward Kasner, baptise « <b>googol</b> » le nombre ${pw4Tex('10^{100}')} : c'est de ce mot que vient le nom du moteur de recherche Google.
</div>
`;

document.getElementById('methode-demo-puissances-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : déplier une puissance</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez un nombre (relatif, éventuellement décimal) et un exposant de 0 à 10 : la puissance est dépliée en produit, le signe est expliqué et le résultat calculé.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <label>Nombre <input id="pw4-dBase" type="text" inputmode="decimal" value="-2" style="width:70px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" oninput="pw4Deplier()"></label>
    <label>Exposant <input id="pw4-dExp" type="number" min="0" max="10" value="5" style="width:60px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" oninput="pw4Deplier()"></label>
    <label style="display:flex;align-items:center;gap:6px;"><input id="pw4-dSans" type="checkbox" onchange="pw4Deplier()"> sans parenthèses (ex. −2⁴)</label>
  </div>
  <div id="pw4-dRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : la virgule qui glisse</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre, puis faites glisser le curseur pour le multiplier par une puissance de 10 : la virgule se déplace, les zéros nécessaires apparaissent.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <label>Nombre <input id="pw4-vNb" type="text" inputmode="decimal" value="208,641" style="width:110px;padding:6px 8px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;" oninput="pw4Virgule(true)"></label>
    <label>× 10 puissance <input id="pw4-vExp" type="range" min="-6" max="6" step="1" value="2" style="width:170px;" oninput="pw4Virgule()"> <b id="pw4-vExpAff" style="font-family:'JetBrains Mono',monospace;">2</b></label>
  </div>
  <div id="pw4-vGrille" style="position:relative;margin:14px auto 4px;overflow-x:auto;overflow-y:hidden;"></div>
  <div id="pw4-vRes" class="step-note" style="text-align:center;min-height:2.4em;margin-top:6px;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : calculer avec des puissances de 10</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="pw4-calcDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pw4CalcDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pw4CalcDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : trouver l'écriture scientifique d'un nombre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre décimal (espaces acceptés, virgule pour les décimaux) : son écriture scientifique est rédigée.</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="pw4-sNb" type="text" inputmode="decimal" value="0,000 083" style="width:200px;padding:8px 10px;border-radius:8px;border:1px solid #C9D6E6;text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.05rem;" oninput="pw4Scientifique()">
  </div>
  <div id="pw4-sRes"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : du pico au téra, les préfixes</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites glisser le curseur d'un préfixe à l'autre : sa puissance de 10, son écriture décimale et un exemple de la vie courante s'affichent.</p>
  <input id="pw4-pVal" type="range" min="0" max="11" step="1" value="3" style="width:100%;max-width:520px;display:block;margin:8px auto;" oninput="pw4Prefixe()">
  <div id="pw4-pRes"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres de 4e).
function pw4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pw4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pw4-correction-${n}">
      <div class="redaction-template">${lignes.map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-puissances-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Calculer et donner le résultat en écriture scientifique »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${pw4Tex('C = 6 \\times 10^4 \\times 5 \\times 10^{-7}')}</span><span class="we-comment">On veut l'écriture scientifique de C.</span></div>
    <div class="we-row"><span class="we-expr">${pw4Tex('C = 6 \\times 5 \\times 10^4 \\times 10^{-7}')}</span><span class="we-comment">On regroupe les nombres d'un côté, les puissances de 10 de l'autre.</span></div>
    <div class="we-row"><span class="we-expr">${pw4Tex('C = 30 \\times 10^{-3}')}</span><span class="we-comment">6 × 5 = 30 et 4 + (−7) = −3.</span></div>
    <div class="we-row"><span class="we-expr">${pw4Tex('C = 3 \\times 10^1 \\times 10^{-3}')}</span><span class="we-comment">30 n'a pas un seul chiffre avant la virgule : 30 = 3 × 10¹.</span></div>
    <div class="we-row"><span class="we-expr">${pw4Tex('C = 3 \\times 10^{-2}')}</span><span class="we-comment">1 + (−3) = −2 : c'est l'écriture scientifique (C = 0,03).</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pw4Exo(1, 'Calcule : ' + pw4Tex('2^5') + ' ; ' + pw4Tex('(-3)^4') + ' ; ' + pw4Tex('-3^4') + ' ; ' + pw4Tex('(-1)^7') + ' ; ' + pw4Tex('0{,}2^3') + ' ; ' + pw4Tex('7^0') + '.', [
    pw4Tex('2^5 = 32') + ' ; ' + pw4Tex('(-3)^4 = 81') + ' (exposant pair) ; ' + pw4Tex('-3^4 = -81') + ' (l\'exposant ne porte que sur 3).',
    pw4Tex('(-1)^7 = -1') + ' (exposant impair) ; ' + pw4Tex('0{,}2^3 = 0{,}008') + ' ; ' + pw4Tex('7^0 = 1') + '.'])}
  ${pw4Exo(2, 'Calcule en respectant les priorités : ' + pw4Tex('A = 3 + 2 \\times 5^2') + ' ; ' + pw4Tex('B = (3 + 2)^2 \\times 2') + ' ; ' + pw4Tex('C = 4^3 - 2 \\times 3^3') + '.', [
    pw4Tex('A = 3 + 2 \\times 25 = 3 + 50 = 53'), pw4Tex('B = 5^2 \\times 2 = 25 \\times 2 = 50'), pw4Tex('C = 64 - 2 \\times 27 = 64 - 54 = 10')])}
  ${pw4Exo(3, 'Écris sous la forme d\'une puissance de 10 : 10 000 000 ; 0,000 01 ; un milliard ; un dix-millième.', [
    '10 000 000 = ' + pw4Tex('10^7') + ' (7 zéros) ; 0,000 01 = ' + pw4Tex('10^{-5}') + ' (le 1 est au 5e rang après la virgule).',
    'Un milliard = ' + pw4Tex('10^9') + ' ; un dix-millième = ' + pw4Tex('10^{-4}') + '.'])}
  ${pw4Exo(4, 'Écris sous la forme ' + pw4Tex('10^n') + ' : ' + pw4Tex('10^6 \\times 10^{-9}') + ' ; ' + pw4Tex('10^{-2} \\times 10^{-5}') + ' ; ' + pw4Tex('\\dfrac{10^8}{10^3}') + ' ; ' + pw4Tex('\\dfrac{10^3}{10^{-4}}') + '.', [
    pw4Tex('10^6 \\times 10^{-9} = 10^{-3}') + ' ; ' + pw4Tex('10^{-2} \\times 10^{-5} = 10^{-7}') + '.',
    pw4Tex('\\dfrac{10^8}{10^3} = 10^{8-3} = 10^5') + ' ; ' + pw4Tex('\\dfrac{10^3}{10^{-4}} = 10^{3-(-4)} = 10^7') + '.'])}
  ${pw4Exo(5, 'Donne l\'écriture décimale : ' + pw4Tex('4{,}56 \\times 10^3') + ' ; ' + pw4Tex('0{,}72 \\times 10^5') + ' ; ' + pw4Tex('351 \\times 10^{-4}') + ' ; ' + pw4Tex('6{,}2 \\times 10^{-2}') + '.', [
    '4 560 ; 72 000 (virgule décalée vers la droite, on complète par des zéros).',
    '0,035 1 ; 0,062 (virgule décalée vers la gauche).'])}
  ${pw4Exo(6, 'Donne l\'écriture scientifique : 45 000 ; 0,000 6 ; 236,1 ; 0,030 5 ; ' + pw4Tex('52 \\times 10^3') + ' ; ' + pw4Tex('0{,}8 \\times 10^{-5}') + '.', [
    '45 000 = ' + pw4Tex('4{,}5 \\times 10^4') + ' ; 0,000 6 = ' + pw4Tex('6 \\times 10^{-4}') + ' ; 236,1 = ' + pw4Tex('2{,}361 \\times 10^2') + ' ; 0,030 5 = ' + pw4Tex('3{,}05 \\times 10^{-2}') + '.',
    pw4Tex('52 \\times 10^3 = 5{,}2 \\times 10^1 \\times 10^3 = 5{,}2 \\times 10^4') + ' ; ' + pw4Tex('0{,}8 \\times 10^{-5} = 8 \\times 10^{-1} \\times 10^{-5} = 8 \\times 10^{-6}') + '.'])}
  ${pw4Exo(7, 'Convertis : 3,5 Go en octets ; 25 µm en mètres (écriture scientifique) ; 4 800 kW en MW.', [
    '3,5 Go = ' + pw4Tex('3{,}5 \\times 10^9') + ' octets = 3 500 000 000 octets.',
    '25 µm = ' + pw4Tex('25 \\times 10^{-6}') + ' m = ' + pw4Tex('2{,}5 \\times 10^{-5}') + ' m.',
    '4 800 kW = 4 800 × 10³ W = ' + pw4Tex('4{,}8 \\times 10^6') + ' W = 4,8 MW.'])}
  ${pw4Exo(8, 'La lumière parcourt environ ' + pw4Tex('3 \\times 10^5') + ' km par seconde, et la distance de la Terre au Soleil est d\'environ ' + pw4Tex('1{,}5 \\times 10^8') + ' km. Combien de temps la lumière du Soleil met-elle pour nous parvenir ?', [
    'Durée = distance ÷ vitesse : ' + pw4Tex('\\dfrac{1{,}5 \\times 10^8}{3 \\times 10^5} = \\dfrac{1{,}5}{3} \\times 10^{8-5} = 0{,}5 \\times 10^3 = 500') + ' secondes.',
    '500 s = 8 min 20 s : la lumière que nous voyons a quitté le Soleil il y a plus de 8 minutes !'])}
</div>
`;

/* ---- Méthode 1 : déplier une puissance ---- */
function pw4Deplier(){
  const out = document.getElementById('pw4-dRes');
  const brut = String(document.getElementById('pw4-dBase').value).trim().replace(',', '.').replace('−', '-'), n = Number(document.getElementById('pw4-dExp').value), sans = document.getElementById('pw4-dSans').checked;
  const a = Number(brut);
  if(brut === '' || !Number.isFinite(a) || Math.abs(a) > 20 || !Number.isInteger(n) || n < 0 || n > 10){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez un nombre entre −20 et 20 et un exposant entier de 0 à 10.</p>'; return; }
  if(a === 0 && n === 0){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">0⁰ n\'est pas défini au collège : choisissez un autre exposant.</p>'; return; }
  const t = x => String(x).replace('.', '{,}');
  const neg = a < 0, abs = Math.abs(a), sp = sans && neg;
  const baseTex = sp ? `-${t(abs)}^{${n}}` : (neg ? `(${t(a)})^{${n}}` : `${t(a)}^{${n}}`);
  const valeur = sp ? -Math.pow(abs, n) : Math.pow(a, n);
  const lignes = [];
  if(n === 0) lignes.push([pw4Tex(`${baseTex} = ${sp ? '-1' : '1'}`), sp ? 'L\'exposant ne porte que sur ' + pw4N(abs) + ' : ' + pw4N(abs) + '⁰ = 1, puis on prend l\'opposé.' : 'Par convention, un nombre non nul à la puissance 0 vaut 1.']);
  else {
    const facteur = sp ? t(abs) : (neg ? `(${t(a)})` : t(a));
    const produit = Array.from({ length: n }, () => facteur).join(' \\times ');
    lignes.push([`<span style="display:block;max-width:100%;overflow-x:auto;position:relative;white-space:nowrap;padding:2px 0;">${pw4Tex(`${baseTex} = ${sp ? '-(' + produit + ')' : produit}`)}</span>`, `On écrit ${n} facteur${n > 1 ? 's' : ''} égaux à ${sp ? pw4N(abs) : pw4N(a)}.`]);
    if(sp) lignes.push([`Sans parenthèses, l'exposant ne porte que sur ${pw4N(abs)} : on calcule ${pw4Tex(`${t(abs)}^{${n}}`)}, puis on prend l'opposé.`, `C'est différent de ${pw4Tex(`(${t(a)})^{${n}}`)} !`]);
    else if(neg) lignes.push([`${n} facteur${n > 1 ? 's' : ''} négatif${n > 1 ? 's' : ''} : l'exposant est ${n % 2 ? 'impair' : 'pair'}, le résultat est ${n % 2 ? 'négatif' : 'positif'}.`, 'Règle des signes d\'un produit.']);
    const arrondi = Number(valeur.toPrecision(12)) !== valeur;
    lignes.push([pw4Tex(`${baseTex} ${arrondi ? '\\approx' : '='} ${pw4N(valeur).replace('−', '-').replace(',', '{,}').replace(/\s/g, '\\,')}`), arrondi ? 'On effectue le produit (valeur arrondie : le résultat exact a trop de décimales).' : 'On effectue le produit.']);
  }
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 2 : la virgule qui glisse ---- */
let pw4VDonnees = null;
function pw4Virgule(nouveau){
  const grille = document.getElementById('pw4-vGrille'), res = document.getElementById('pw4-vRes');
  const brut = String(document.getElementById('pw4-vNb').value).replace(/\s/g, '').replace('.', ',');
  const n = Number(document.getElementById('pw4-vExp').value);
  document.getElementById('pw4-vExpAff').textContent = n > 0 ? n : String(n).replace('-', '−');
  if(!/^\d+(,\d+)?$/.test(brut) || brut.replace(',', '').length > 10){ grille.innerHTML = ''; res.innerHTML = '<span style="color:#a83c1f;">Écrivez un nombre positif (10 chiffres au plus), avec une virgule pour les décimaux.</span>'; pw4VDonnees = null; return; }
  const [e, d = ''] = brut.split(','), D = (e + d).split(''), c = e.length, W = 30;
  // Fenêtre fixe (pour que les chiffres ne bougent pas quand le curseur change) : de c − 7 à c + 6.
  const L = Math.min(0, c - 7), R = Math.max(D.length, c + 6);
  const cp = c + n;
  // Chiffres à afficher : ceux du nombre, plus les zéros nécessaires (avant pour « 0, », après pour les entiers).
  const debut = Math.min(0, cp - 1), fin = Math.max(D.length, cp);
  // On retire les zéros inutiles en tête (hors « 0, ») et en fin de partie décimale.
  let premier = debut, dernier = fin - 1;
  const chiffre = i => i >= 0 && i < D.length ? D[i] : '0';
  while(premier < cp - 1 && chiffre(premier) === '0') premier++;
  while(dernier >= cp && chiffre(dernier) === '0') dernier--;
  if(nouveau || !pw4VDonnees || pw4VDonnees.brut !== brut){
    let h = `<div id="pw4-vLigne" style="position:relative;height:56px;width:${(R - L) * W}px;margin:0 auto;font-family:'JetBrains Mono',monospace;font-size:1.5rem;">`;
    for(let i = L; i < R; i++) h += `<span data-i="${i}" style="position:absolute;left:${(i - L) * W}px;top:8px;width:${W - 4}px;height:40px;line-height:40px;text-align:center;border-radius:6px;transition:opacity .35s,background .35s,color .35s;"></span>`;
    h += `<span id="pw4-vVirgule" style="position:absolute;top:10px;font-size:2rem;font-weight:700;color:${PW4_ORANGE};transition:left .5s cubic-bezier(.4,1.4,.5,1);">,</span></div>`;
    grille.innerHTML = h;
    pw4VDonnees = { brut };
  }
  grille.querySelectorAll('[data-i]').forEach(el => {
    const i = Number(el.dataset.i), dansNombre = i >= 0 && i < D.length, visible = i >= premier && i <= dernier;
    el.textContent = visible ? chiffre(i) : '';
    el.style.opacity = visible ? 1 : 0;
    el.style.background = visible ? (dansNombre ? '#E8F1FA' : '#FDF0E1') : 'transparent';
    el.style.color = dansNombre ? PW4_ENCRE : PW4_ORANGE;
  });
  const v = document.getElementById('pw4-vVirgule');
  v.style.left = `${(cp - L) * W - 9}px`; v.style.opacity = cp > dernier ? 0 : 1;
  // Centre la zone utile si la grille défile (téléphone).
  grille.scrollLeft = Math.max(0, ((premier + dernier) / 2 - L) * W - grille.clientWidth / 2);
  const ecr = (() => { let s = ''; for(let i = premier; i <= dernier; i++){ if(i === cp) s += '.'; s += chiffre(i); } return s || '0'; })();
  const puiss = n === 0 ? '10⁰' : '10' + (n < 0 ? '⁻' : '') + '⁰¹²³⁴⁵⁶'[Math.abs(n)];
  res.innerHTML = `${pw4Fr(brut.replace(',', '.'))} × ${puiss} = <b>${pw4Fr(ecr)}</b><br>` + (n === 0 ? 'Multiplier par 10⁰ = 1 ne change rien.' : `La virgule se décale de <b>${Math.abs(n)} rang${Math.abs(n) > 1 ? 's' : ''} vers la ${n > 0 ? 'droite' : 'gauche'}</b>` + (fin - debut > D.length ? ' ; les zéros en orange complètent le nombre.' : '.'));
}

/* ---- Méthode 3 : calcul avec des puissances de 10 ---- */
const PW4_CALC_STEPS = [
  { expr: pw4Tex('A = \\dfrac{10^5 \\times 10^{-2}}{10^{-4}}'), note: 'On veut écrire A sous la forme d\'une puissance de 10, puis en écriture décimale.' },
  { expr: pw4Tex('A = \\dfrac{10^{5 + (-2)}}{10^{-4}} = \\dfrac{10^3}{10^{-4}}'), note: 'Au numérateur, un produit : on additionne les exposants (5 + (−2) = 3).' },
  { expr: pw4Tex('A = 10^{3 - (-4)}'), note: 'Un quotient : on soustrait l\'exposant du dénominateur. Attention, soustraire −4, c\'est ajouter 4.' },
  { expr: pw4Tex('A = 10^7'), note: '3 − (−4) = 3 + 4 = 7.' },
  { expr: pw4Tex('A = 10\\,000\\,000'), note: 'Écriture décimale : un 1 suivi de 7 zéros (dix millions).' },
];
const pw4CalcDemo = makeStepDemo(PW4_CALC_STEPS, 'pw4-calcDisplay');

/* ---- Méthode 4 : écriture scientifique ---- */
function pw4Scientifique(){
  const out = document.getElementById('pw4-sRes');
  let brut = String(document.getElementById('pw4-sNb').value).replace(/\s/g, '').replace('.', ',').replace('−', '-');
  const neg = brut.startsWith('-'); if(neg) brut = brut.slice(1);
  if(!/^\d+(,\d+)?$/.test(brut) || brut.replace(',', '').length > 30){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez un nombre décimal (30 chiffres au plus).</p>'; return; }
  const [e, d = ''] = brut.split(','), D = e + d, c = e.length, f = D.search(/[1-9]/);
  if(f < 0){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">0 n\'a pas d\'écriture scientifique : choisissez un nombre non nul.</p>'; return; }
  const n = c - f - 1, reste = D.slice(f + 1).replace(/0+$/, ''), mant = D[f] + (reste ? ',' + reste : '');
  const s = neg ? '−' : '', sT = neg ? '-' : '';
  const nombre = pw4Fr((neg ? '-' : '') + (e.replace(/^0+(?=\d)/, '') || '0') + (d ? '.' + d : ''));
  const lignes = [
    [`Nombre : ${nombre}`, 'On cherche a × 10ⁿ avec un seul chiffre non nul avant la virgule.'],
    [`Premier chiffre non nul : <b>${D[f]}</b>. On place la virgule juste après : a = ${s}${mant}.`, reste ? 'On supprime les zéros inutiles.' : ''],
  ];
  if(n === 0) lignes.push(['La virgule n\'a pas bougé : n = 0.', '']);
  else lignes.push([`Pour revenir au nombre de départ, il faut décaler la virgule de ${Math.abs(n)} rang${Math.abs(n) > 1 ? 's' : ''} vers la ${n > 0 ? 'droite' : 'gauche'} : n = ${String(n).replace('-', '−')}.`, n > 0 ? 'Grand nombre : exposant positif.' : 'Nombre plus petit que 1 : exposant négatif.']);
  lignes.push([`${nombre} = ${pw4Tex(`${sT}${mant.replace(',', '{,}')} \\times 10^{${n}}`)}`, 'C\'est l\'écriture scientifique.']);
  out.innerHTML = r4Ex('', lignes);
  renderStaticMath(out);
}

/* ---- Méthode 5 : préfixes ---- */
function pw4Prefixe(){
  const i = Number(document.getElementById('pw4-pVal').value), [nom, sym, e, ex] = PW4_PREFIXES[i], out = document.getElementById('pw4-pRes');
  const decFr = e > 0 ? pw4Fr('1' + '0'.repeat(e)) : pw4Fr('0.' + '0'.repeat(-e - 1) + '1');
  // Échelle : un repère par préfixe, le préfixe choisi en couleur.
  const echelle = `<div style="display:flex;justify-content:space-between;max-width:520px;margin:0 auto 10px;font-size:.78rem;color:#4E5665;">${PW4_PREFIXES.map((p, k) => `<span style="text-align:center;flex:1;${k === i ? `color:#fff;background:${PW4_BLEU};border-radius:6px;font-weight:700;` : ''}">${p[1]}</span>`).join('')}</div>`;
  out.innerHTML = echelle + `<div style="text-align:center;"><div style="font-size:1.6rem;font-weight:700;color:${PW4_BLEU};">${nom} (${sym})</div>
    <div style="font-size:1.25rem;margin:4px 0;">${pw4Tex(`10^{${e}}`)} = <span style="font-family:'JetBrains Mono',monospace;">${decFr}</span></div>
    <div style="color:#4E5665;">${e > 0 ? `soit ${e} zéros après le 1` : `le 1 est au ${-e}${-e === 1 ? 'er' : 'e'} rang après la virgule`}</div>
    <div style="margin-top:8px;padding:8px 12px;background:#F4F8FC;border-radius:8px;display:inline-block;max-width:520px;">${ex}</div></div>`;
  renderStaticMath(out);
}

DEMO_REGISTRY['4e|Puissances'] = {
  cours: 'cours-demo-puissances-4e', methode: 'methode-demo-puissances-4e', exos: 'exos-demo-puissances-4e', histoire: 'histoire-demo-puissances-4e',
  init: () => {
    pw4Deplier(); pw4Virgule(true); pw4CalcDemo.reset(); pw4Scientifique(); pw4Prefixe();
    ['cours-demo-puissances-4e', 'exos-demo-puissances-4e', 'histoire-demo-puissances-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-puissances-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-puissances-4e'));
  }
};

DEMO_QUIZZES['4e|Puissances'] = [
  { q: '(−2)⁴ = ...', opts: ['−16', '16', '−8'], correct: 1 },
  { q: '−3² = ...', opts: ['9', '−9', '−6'], correct: 1 },
  { q: '10⁻³ = ...', opts: ['−1 000', '0,001', '0,000 1'], correct: 1 },
  { q: '10⁵ × 10⁻² = ...', opts: ['10³', '10⁻¹⁰', '10⁷'], correct: 0 },
  { q: 'L\'écriture scientifique de 0,004 2 est...', opts: ['42 × 10⁻⁴', '4,2 × 10⁻³', '0,42 × 10⁻²'], correct: 1 },
  { q: '1 nanomètre = ...', opts: ['10⁻⁹ m', '10⁹ m', '10⁻⁶ m'], correct: 0 },
  { q: '2 + 3 × 2² = ...', opts: ['22', '14', '20'], correct: 1 },
];

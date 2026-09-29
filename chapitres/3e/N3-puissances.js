/* ============================================================
   CHAPITRE : Puissances (3e, N3)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé (captures du manuel, p. 15-16) : plan du manuel (puissances d'un nombre relatif :
   exposant positif, exposant NÉGATIF pour tout nombre non nul -- nouveau par rapport à la 4e --,
   priorité ; puissances de 10 : définitions, préfixes, calculs ; écriture scientifique), titres
   reformulés, exemples nouveaux (différents du manuel ET du N5 de 4e, chapitres/4e/N5-puissances.js).
   Méthode animée : une « machine à puissances » (a et n au choix, n négatif compris), un calcul
   type brevet avec des puissances de 10, un convertisseur en écriture scientifique (la virgule
   glisse) et un zoom de l'atome à l'Univers.
   Utilise r4Ex / r4Colonne / R4_REM de chapitres/4e/N1-operations-relatifs.js (chargé avant).
   Niveau visible des seuls administrateurs (NIVEAUX_ADMIN dans app.js).
   ============================================================ */

const PU3_BLEU = '#0C5BA0', PU3_VERT = '#1E7B34', PU3_ROUGE = '#C0392B', PU3_ORANGE = '#E07B00';
const pu3Tex = s => `<span class="tex"${s.length < 30 && !s.includes('frac') && !s.includes('brace') ? ' style="white-space:nowrap;"' : ''}>${s}</span>`;
// Nombre écrit à la française à partir de sa chaîne décimale exacte (espaces par groupes de 3).
function pu3Fr(txt){
  let [e, d] = String(txt).split('.'); const neg = e.startsWith('-'); if(neg) e = e.slice(1);
  e = e.replace(/\B(?=(\d{3})+(?!\d))/g, ' '); if(d) d = d.replace(/(\d{3})(?=\d)/g, '$1 ');
  return (neg ? '−' : '') + e + (d ? ',' + d : '');
}
const pu3TexFr = s => pu3Fr(s).replace('−', '-').replace(',', '{,}').replace(/ /g, '\\,');
const PU3_PREFIXES = [['Téra', 'T', 12], ['Giga', 'G', 9], ['Méga', 'M', 6], ['Kilo', 'k', 3], ['Hecto', 'h', 2], ['Déca', 'da', 1], ['Déci', 'd', -1], ['Centi', 'c', -2], ['Milli', 'm', -3], ['Micro', 'µ', -6], ['Nano', 'n', -9], ['Pico', 'p', -12]];
function pu3Tab(lignes){
  return `<div style="overflow-x:auto;margin:8px 0 14px;"><table style="border-collapse:collapse;margin:0 auto;background:#fff;font-size:.88rem;">${lignes.map((l, i) => `<tr>${l.map(c =>
    `<td style="border:1px solid #C9D6E6;padding:5px 7px;text-align:center;white-space:nowrap;${i === 0 ? 'background:#F4F5F8;font-weight:700;' : ''}">${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
}

document.getElementById('cours-demo-puissances-3e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Les puissances d'un nombre relatif</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Avec un exposant positif</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout nombre entier positif non nul <i>n</i> et tout nombre relatif <i>a</i> :
  <div style="text-align:center;margin:8px 0;">${pu3Tex('a^n = \\underbrace{a \\times a \\times \\ldots \\times a}_{n \\text{ facteurs}}')} &nbsp; et, par convention, ${pu3Tex('a^0 = 1')} (pour <i>a</i> ≠ 0).</div>
  ${pu3Tex('a^n')} (lu « <i>a</i> puissance <i>n</i> ») est la <b>puissance <i>n</i>-ième</b> de <i>a</i> ; <i>n</i> est l'<b>exposant</b>.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${pu3Tex('2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32')} ; ${pu3Tex('7^1 = 7')} ; ${pu3Tex('7^0 = 1')}.</li>
  <li>${pu3Tex('(-4)^3 = (-4) \\times (-4) \\times (-4) = -64')} (3 facteurs négatifs : résultat négatif) et ${pu3Tex('(-1)^{10} = 1')} (10 facteurs négatifs : résultat positif).</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : ${pu3Tex('a^1 = a')}. Attention aux parenthèses : ${pu3Tex('(-3)^2 = 9')} mais ${pu3Tex('-3^2 = -(3 \\times 3) = -9')}.</div>

<div class="sub-header"><span class="letter">B</span><h4>Avec un exposant négatif</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Pour tout nombre entier positif non nul <i>n</i> et tout nombre relatif <b>non nul</b> <i>a</i> :
  <div style="text-align:center;margin:8px 0 2px;">${pu3Tex('a^{-n} = \\dfrac{1}{\\underbrace{a \\times a \\times \\ldots \\times a}_{n \\text{ facteurs}}} = \\dfrac{1}{a^n}')}</div></div>
<div class="redaction-note" ${R4_REM}>Remarque : ${pu3Tex('a^{-1} = \\dfrac{1}{a}')} est l'<b>inverse</b> de <i>a</i>. Par exemple, ${pu3Tex('4^{-1} = \\dfrac{1}{4} = 0{,}25')}.</div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>${pu3Tex('2^{-3} = \\dfrac{1}{2^3} = \\dfrac{1}{8} = 0{,}125')}</li>
  <li>${pu3Tex('(-5)^{-2} = \\dfrac{1}{(-5)^2} = \\dfrac{1}{25} = 0{,}04')}</li>
</ul>

<div class="sub-header"><span class="letter">C</span><h4>Les puissances dans un calcul</h4></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">En l'absence de parenthèses, le calcul de la <b>puissance est prioritaire</b> sur les autres opérations.</div>
${r4Ex('Exemples :', [
  [pu3Tex('A = 2 + 5 \\times 2^3 = 2 + 5 \\times 8 = 2 + 40 = 42'), 'La puissance, puis la multiplication, puis l\'addition.'],
  [pu3Tex('B = (2 + 5)^2 = 7^2 = 49'), 'Avec des parenthèses, on calcule d\'abord leur contenu.'],
])}

<div class="lesson-header"><span class="num">2</span><h3>Les puissances de 10</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Définitions</h4></div>
<span class="def-badge">Définition 1</span>
<div class="def-box">Pour tout nombre entier positif non nul <i>n</i> : ${pu3Tex('10^n = \\underbrace{10 \\times 10 \\times \\ldots \\times 10}_{n \\text{ facteurs}} = 1\\underbrace{0\\ldots0}_{n \\text{ zéros}}')} et, par convention, ${pu3Tex('10^0 = 1')}.</div>
<span class="def-badge">Définition 2</span>
<div class="def-box">Pour tout nombre entier positif non nul <i>n</i> : ${pu3Tex('10^{-n} = \\dfrac{1}{10^n} = 0{,}\\underbrace{0\\ldots0}_{n \\text{ zéros}}\\!1')} (le 1 est au <i>n</i>-ième rang après la virgule).</div>
<p class="example-title">Exemples : ${pu3Tex('10^7 = 10\\,000\\,000')} (7 zéros) et ${pu3Tex('10^{-5} = 0{,}000\\,01')} (le 1 au 5e rang après la virgule).</p>

<div class="sub-header"><span class="letter">B</span><h4>Les préfixes</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Ces <b>préfixes</b>, placés devant une unité, désignent des multiples de puissances de 10 :
  ${pu3Tab([PU3_PREFIXES.map(p => p[0]), PU3_PREFIXES.map(p => pu3Tex('\\times 10^{' + p[2] + '}'))])}</div>
<p class="example-title">Exemples : 1 <b>méga</b>octet = ${pu3Tex('10^6')} octets ; 1 <b>micro</b>seconde = ${pu3Tex('10^{-6}')} seconde ; 1 <b>centi</b>litre = ${pu3Tex('10^{-2}')} litre.</p>

<div class="sub-header"><span class="letter">C</span><h4>Calculer avec des puissances de 10</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box">Pour tous nombres entiers relatifs <i>m</i> et <i>p</i> :
  <div style="text-align:center;margin:8px 0 2px;line-height:2.6;">${pu3Tex('10^m \\times 10^p = 10^{m+p}')} &nbsp;&nbsp; et &nbsp;&nbsp; ${pu3Tex('\\dfrac{10^m}{10^p} = 10^{m-p}')}</div></div>
${r4Ex('Exemples :', [
  [pu3Tex('C = 10^6 \\times 10^{-2} = 10^{6 + (-2)} = 10^4 = 10\\,000'), 'On additionne les exposants.'],
  [pu3Tex('D = \\dfrac{10^{-3}}{10^5} = 10^{-3 - 5} = 10^{-8}'), 'On soustrait les exposants.'],
])}

<div class="lesson-header"><span class="num">3</span><h3>L'écriture scientifique</h3></div>

<div class="sub-header"><span class="letter">A</span><h4>Multiplier par une puissance de 10</h4></div>
<span class="prop-badge">Propriétés</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Multiplier un nombre par ${pu3Tex('10^n')} revient à <b>décaler la virgule de <i>n</i> rangs vers la droite</b> (on complète par des zéros si nécessaire).</li>
  <li>Multiplier un nombre par ${pu3Tex('10^{-n}')} revient à <b>décaler la virgule de <i>n</i> rangs vers la gauche</b> (on complète par des zéros si nécessaire).</li>
</ul></div>
<p class="example-title">Exemples : ${pu3Tex('45{,}17 \\times 10^3 = 45\\,170')} et ${pu3Tex('6{,}2 \\times 10^{-4} = 0{,}000\\,62')}.</p>

<div class="sub-header"><span class="letter">B</span><h4>L'écriture scientifique d'un nombre</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Tout nombre décimal non nul peut être écrit en <b>notation scientifique</b>, c'est-à-dire sous la forme ${pu3Tex('a \\times 10^n')} où :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><i>a</i>, appelé <b>mantisse</b>, est un nombre décimal ayant <b>un seul chiffre non nul avant la virgule</b> ;</li>
    <li><i>n</i> est un nombre entier relatif.</li>
  </ul></div>
<p class="example-title">Exemples :</p>
<ul class="example-list">
  <li>Population mondiale (2024) : environ 8 100 000 000 habitants = ${pu3Tex('8{,}1 \\times 10^9')} habitants.</li>
  <li>Distance Terre – Lune : 384 400 km = ${pu3Tex('3{,}844 \\times 10^5')} km.</li>
  <li>Diamètre d'un globule rouge : 0,000 007 m = ${pu3Tex('7 \\times 10^{-6}')} m.</li>
  <li>Masse d'un grain de sable : environ 0,000 000 67 kg = ${pu3Tex('6{,}7 \\times 10^{-7}')} kg.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Attention : ${pu3Tex('34{,}5 \\times 10^{-2}')} n'est pas une écriture scientifique (deux chiffres avant la virgule). Comme ${pu3Tex('34{,}5 = 3{,}45 \\times 10^1')}, on écrit ${pu3Tex('34{,}5 \\times 10^{-2} = 3{,}45 \\times 10^{-1}')}.</div>
`;

document.getElementById('histoire-demo-puissances-3e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  En 1977, les designers américains <b>Charles et Ray Eames</b> réalisent un court film resté célèbre, <i>Powers of Ten</i> (« Puissances de dix ») : la caméra part d'un couple pique-niquant dans un parc, vu d'un mètre de haut, puis s'éloigne en multipliant la distance par 10 toutes les 10 secondes… jusqu'aux confins de l'Univers visible (${pu3Tex('10^{24}')} m). Puis elle revient et plonge dans la main d'un des personnages, jusqu'à l'intérieur d'un atome (${pu3Tex('10^{-16}')} m). En quelques minutes, on traverse 40 puissances de 10 ! Les scientifiques manipulent tous les jours de tels nombres : le nombre d'atomes dans 12 g de carbone, le « nombre d'Avogadro », vaut environ ${pu3Tex('6{,}022 \\times 10^{23}')}. Sans l'écriture scientifique, il faudrait l'écrire avec 24 chiffres ! (Le zoom de l'onglet Méthode s'inspire de ce film.)
</div>
`;

document.getElementById('methode-demo-puissances-3e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : la machine à puissances</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Choisissez le nombre <i>a</i> et l'exposant <i>n</i> (positif, nul ou négatif) : la puissance est dépliée puis calculée.</p>
  <div style="display:grid;grid-template-columns:auto 1fr auto;gap:6px 10px;align-items:center;max-width:460px;margin:8px auto;">
    <label for="pu3-a" style="font-weight:700;"><i>a</i></label>
    <select id="pu3-a" onchange="pu3MachineMaj()" style="font-size:1rem;padding:4px 8px;border-radius:8px;border:1px solid #C9D6E6;">${['2', '3', '5', '10', '-2', '-3', '0.5', '-1'].map(v => `<option value="${v}"${v === '-2' ? ' selected' : ''}>${v.replace('-', '−').replace('.', ',')}</option>`).join('')}</select><span></span>
    <label for="pu3-n" style="font-weight:700;"><i>n</i></label><input id="pu3-n" type="range" min="-5" max="7" step="1" value="3" oninput="pu3MachineMaj()"><span id="pu3-nVal" style="font-family:'JetBrains Mono',monospace;min-width:30px;"></span>
  </div>
  <div id="pu3-machine" style="text-align:center;line-height:2.4;font-size:1.05rem;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : un calcul type brevet avec des puissances de 10</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Donner l'écriture scientifique de ${pu3Tex('E = \\dfrac{6 \\times 10^5 \\times 4 \\times 10^{-8}}{3 \\times 10^{-2}}')}. Cliquez sur « Étape suivante ».</p>
  <div class="step-display" id="pu3-calculDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="pu3CalculDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="pu3CalculDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : trouver l'écriture scientifique d'un nombre</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre décimal positif (par exemple 0,000 48 ou 725 000) : la virgule glisse jusqu'après le premier chiffre non nul, et on compte les rangs.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="pu3-scNombre" type="text" inputmode="decimal" value="0,000 48" maxlength="24" style="font-family:'JetBrains Mono',monospace;font-size:1.1rem;padding:6px 10px;border-radius:8px;border:1px solid #C9D6E6;width:220px;text-align:center;" onkeydown="if(event.key==='Enter') pu3ScAnimer()">
    <button class="btn" onclick="pu3ScAnimer()">Faire glisser la virgule</button>
  </div>
  <div id="pu3-scChiffres" style="display:flex;justify-content:center;gap:2px;font-family:'JetBrains Mono',monospace;font-size:1.6rem;margin:10px 0;min-height:2.2em;flex-wrap:wrap;"></div>
  <div id="pu3-scResultat" style="text-align:center;line-height:2.2;"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : de l'atome à l'Univers</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Faites glisser le curseur : chaque cran multiplie (ou divise) les tailles par une puissance de 10.</p>
  <input id="pu3-zoom" type="range" min="0" max="${22 - 1}" step="1" value="8" oninput="pu3ZoomMaj()" style="width:100%;max-width:520px;display:block;margin:10px auto;">
  <div id="pu3-zoomAff" style="text-align:center;min-height:6em;line-height:1.9;"></div>
</div>
`;

// Exercice avec correction repliable (même présentation que les autres chapitres).
function pu3Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="pu3-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="pu3-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-puissances-3e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Donner l'écriture scientifique d'un calcul »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">${pu3Tex('F = \\dfrac{3 \\times 10^5 \\times 8 \\times 10^{-2}}{6 \\times 10^4}')}</span><span class="we-comment">Le calcul à effectuer.</span></div>
    <div class="we-row"><span class="we-expr">${pu3Tex('F = \\dfrac{3 \\times 8}{6} \\times \\dfrac{10^5 \\times 10^{-2}}{10^4}')}</span><span class="we-comment">1. On regroupe les nombres d'un côté, les puissances de 10 de l'autre.</span></div>
    <div class="we-row"><span class="we-expr">${pu3Tex('F = 4 \\times 10^{5 + (-2) - 4} = 4 \\times 10^{-1}')}</span><span class="we-comment">2. On calcule chaque partie avec les règles sur les exposants.</span></div>
    <div class="we-row"><span class="we-expr">${pu3Tex('F = 4 \\times 10^{-1} = 0{,}4')}</span><span class="we-comment">3. On vérifie que la mantisse n'a qu'un chiffre non nul avant la virgule.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${pu3Exo(1, 'Calcule : ' + pu3Tex('3^3') + ' ; ' + pu3Tex('(-2)^6') + ' ; ' + pu3Tex('(-2)^7') + ' ; ' + pu3Tex('-2^6') + ' ; ' + pu3Tex('9^0') + ' ; ' + pu3Tex('0{,}1^3') + '.', [
    pu3Tex('3^3 = 27') + ' ; ' + pu3Tex('(-2)^6 = 64') + ' (exposant pair) ; ' + pu3Tex('(-2)^7 = -128') + ' (exposant impair).',
    pu3Tex('-2^6 = -64') + ' (l\'exposant ne porte que sur 2) ; ' + pu3Tex('9^0 = 1') + ' ; ' + pu3Tex('0{,}1^3 = 0{,}001') + '.'])}
  ${pu3Exo(2, 'Écris sous forme d\'une fraction, puis d\'un nombre décimal : ' + pu3Tex('2^{-4}') + ' ; ' + pu3Tex('5^{-1}') + ' ; ' + pu3Tex('(-2)^{-3}') + ' ; ' + pu3Tex('10^{-3}') + '.', [
    pu3Tex('2^{-4} = \\dfrac{1}{16} = 0{,}0625') + ' ; ' + pu3Tex('5^{-1} = \\dfrac{1}{5} = 0{,}2'),
    pu3Tex('(-2)^{-3} = \\dfrac{1}{(-2)^3} = \\dfrac{1}{-8} = -0{,}125') + ' ; ' + pu3Tex('10^{-3} = \\dfrac{1}{1\\,000} = 0{,}001')])}
  ${pu3Exo(3, 'Calcule en respectant les priorités : ' + pu3Tex('A = 4 - 3 \\times 2^2') + ' ; ' + pu3Tex('B = (4 - 3) \\times 2^2') + ' ; ' + pu3Tex('C = 1 + 2 \\times 10^3') + '.', [
    pu3Tex('A = 4 - 3 \\times 4 = 4 - 12 = -8'), pu3Tex('B = 1 \\times 4 = 4'), pu3Tex('C = 1 + 2 \\times 1\\,000 = 2\\,001')])}
  ${pu3Exo(4, 'Écris sous la forme d\'une seule puissance de 10 : ' + pu3Tex('10^4 \\times 10^7') + ' ; ' + pu3Tex('10^{-3} \\times 10^5') + ' ; ' + pu3Tex('\\dfrac{10^8}{10^3}') + ' ; ' + pu3Tex('\\dfrac{10^2}{10^{-6}}') + '.', [
    pu3Tex('10^{11}') + ' ; ' + pu3Tex('10^{2}') + ' ; ' + pu3Tex('10^{5}') + ' ; ' + pu3Tex('10^{2-(-6)} = 10^{8}')])}
  ${pu3Exo(5, 'Convertis à l\'aide des préfixes : a) 3 Go (gigaoctets) en octets ; b) 250 nm (nanomètres) en mètres, en écriture scientifique ; c) 5 ms (millisecondes) en secondes.', [
    'a) 3 Go = ' + pu3Tex('3 \\times 10^9') + ' octets = 3 000 000 000 octets.',
    'b) 250 nm = ' + pu3Tex('250 \\times 10^{-9}') + ' m = ' + pu3Tex('2{,}5 \\times 10^2 \\times 10^{-9} = 2{,}5 \\times 10^{-7}') + ' m.',
    'c) 5 ms = ' + pu3Tex('5 \\times 10^{-3}') + ' s = 0,005 s.'])}
  ${pu3Exo(6, 'Donne l\'écriture scientifique de : 725 000 ; 0,000 48 ; ' + pu3Tex('58{,}3 \\times 10^4') + ' ; ' + pu3Tex('0{,}07 \\times 10^{-3}') + '.', [
    '725 000 = ' + pu3Tex('7{,}25 \\times 10^5') + ' ; 0,000 48 = ' + pu3Tex('4{,}8 \\times 10^{-4}'),
    pu3Tex('58{,}3 \\times 10^4 = 5{,}83 \\times 10^1 \\times 10^4 = 5{,}83 \\times 10^5'),
    pu3Tex('0{,}07 \\times 10^{-3} = 7 \\times 10^{-2} \\times 10^{-3} = 7 \\times 10^{-5}')])}
  ${pu3Exo(7, 'Donne l\'écriture scientifique de ' + pu3Tex('G = \\dfrac{2 \\times 10^{-3} \\times 9 \\times 10^{7}}{1{,}2 \\times 10^{2}}') + '.', [
    pu3Tex('G = \\dfrac{2 \\times 9}{1{,}2} \\times \\dfrac{10^{-3} \\times 10^7}{10^2} = 15 \\times 10^{-3 + 7 - 2} = 15 \\times 10^{2}'),
    pu3Tex('G = 1{,}5 \\times 10^1 \\times 10^2 = 1{,}5 \\times 10^3') + ' (15 n\'a pas un seul chiffre avant la virgule : on corrige la mantisse).'])}
  ${pu3Exo(8, 'La lumière se déplace à environ ' + pu3Tex('3 \\times 10^5') + ' km/s. La distance entre la Terre et le Soleil est d\'environ ' + pu3Tex('1{,}5 \\times 10^8') + ' km. Combien de temps met la lumière du Soleil pour nous parvenir ?', [
    pu3Tex('t = \\dfrac{d}{v} = \\dfrac{1{,}5 \\times 10^8}{3 \\times 10^5} = 0{,}5 \\times 10^3 = 500') + ' s.', '500 s = 8 × 60 s + 20 s : la lumière met environ 8 min 20 s.'])}
  ${pu3Exo(9, 'Range dans l\'ordre croissant : ' + pu3Tex('2{,}3 \\times 10^8') + ' ; ' + pu3Tex('9{,}8 \\times 10^7') + ' ; ' + pu3Tex('1{,}05 \\times 10^8') + ' ; ' + pu3Tex('4 \\times 10^{-2}') + '.', [
    'On compare d\'abord les exposants (le plus petit exposant donne le plus petit nombre), puis les mantisses à exposant égal.',
    pu3Tex('4 \\times 10^{-2} < 9{,}8 \\times 10^7 < 1{,}05 \\times 10^8 < 2{,}3 \\times 10^8')])}
</div>
`;

/* ---- Méthode 1 : la machine à puissances ---- */
function pu3Val(a, n){ return Math.pow(a, n); }
function pu3Dec(v){ // valeur décimale exacte (dans la limite de ce qu'on affiche) ou null si non décimale
  for(let d = 0; d <= 10; d++){ const k = v * Math.pow(10, d); if(Math.abs(k - Math.round(k)) < 1e-6) return (Math.round(k) / Math.pow(10, d)).toFixed(d); }
  return null;
}
function pu3MachineMaj(){
  const aS = document.getElementById('pu3-a').value, a = Number(aS), n = Number(document.getElementById('pu3-n').value);
  document.getElementById('pu3-nVal').textContent = String(n).replace('-', '−');
  const aT = aS.replace('.', '{,}'), base = a < 0 ? `(${aT})` : aT, m = Math.abs(n);
  const facteurs = Array(m).fill(base).join(' \\times ');
  const v = pu3Val(a, n), dec = pu3Dec(v);
  let h;
  if(n === 0) h = pu3Tex(`${base}^0 = 1`) + '<br><span class="hint" style="margin:0;">Par convention, un nombre non nul puissance 0 vaut 1.</span>';
  else if(n > 0) h = pu3Tex(`${base}^{${n}} = ${facteurs} = ${pu3TexFr(dec)}`)
    + (a < 0 ? `<br><span class="hint" style="margin:0;">${m} facteur${m > 1 ? 's' : ''} négatif${m > 1 ? 's' : ''} : ${m % 2 ? 'nombre impair, le résultat est négatif' : 'nombre pair, le résultat est positif'}.</span>` : '');
  else {
    const p = pu3Val(a, m), pDec = pu3Dec(p);
    h = pu3Tex(`${base}^{${n}} = \\dfrac{1}{${base}^{${m}}} = \\dfrac{1}{${m > 1 ? facteurs : base}} = \\dfrac{1}{${pu3TexFr(pDec)}}${dec ? ' = ' + pu3TexFr(dec) : ''}`)
      + `<br><span class="hint" style="margin:0;">Exposant négatif : c'est l'inverse de ${base.replace('{,}', ',').replace('-', '−')}<sup>${m}</sup>${dec ? '' : ' (pas d\'écriture décimale exacte)'}.</span>`;
  }
  const out = document.getElementById('pu3-machine'); out.innerHTML = h; renderStaticMath(out);
}

/* ---- Méthode 2 : calcul type brevet ---- */
const PU3_CALCUL_STEPS = [
  { expr: pu3Tex('E = \\dfrac{6 \\times 4}{3} \\times \\dfrac{10^5 \\times 10^{-8}}{10^{-2}}'), note: 'On regroupe les nombres d\'un côté, les puissances de 10 de l\'autre.' },
  { expr: pu3Tex('\\dfrac{6 \\times 4}{3} = \\dfrac{24}{3} = 8'), note: 'On calcule la partie « nombres ».' },
  { expr: pu3Tex('\\dfrac{10^5 \\times 10^{-8}}{10^{-2}} = \\dfrac{10^{-3}}{10^{-2}} = 10^{-3 - (-2)} = 10^{-1}'), note: 'On additionne puis on soustrait les exposants (attention aux signes).' },
  { expr: pu3Tex('E = 8 \\times 10^{-1}'), note: 'La mantisse 8 n\'a qu\'un chiffre non nul avant la virgule : c\'est l\'écriture scientifique.' },
  { expr: pu3Tex('E = 0{,}8'), note: 'Et son écriture décimale.' },
];
const pu3CalculDemo = makeStepDemo(PU3_CALCUL_STEPS, 'pu3-calculDisplay');

/* ---- Méthode 3 : la virgule qui glisse ---- */
let pu3ScTimer = null;
function pu3ScParse(){
  const s = String(document.getElementById('pu3-scNombre').value || '').replace(/\s/g, '').replace('.', ',');
  if(!/^\d+(,\d+)?$/.test(s)) return null;
  const [e, d = ''] = s.split(','), chiffres = (e + d).replace(/^0+/, '');
  if(!/[1-9]/.test(e + d)) return null;
  const digits = (e + d), virg0 = e.length, prem = digits.search(/[1-9]/); // la virgule doit arriver juste après le premier chiffre non nul
  return { digits, virg0, cible: prem + 1, e, d, chiffres };
}
function pu3ScAfficher(o, virg, fini){
  const box = document.getElementById('pu3-scChiffres');
  let h = '';
  // affichage : chiffres significatifs (en supprimant les zéros de tête avant la virgule et les zéros de queue après)
  const deb = Math.max(0, Math.min(o.digits.search(/[1-9]/), virg - 1)), fin = virg === o.digits.length ? virg : Math.max(o.digits.replace(/0+$/, '').length, virg + 1);
  for(let i = Math.max(0, deb); i < fin; i++){
    if(i === virg && i !== fin) h += `<span style="color:${PU3_ROUGE};font-weight:700;">,</span>`;
    h += `<span style="padding:0 2px;${i < virg && i >= o.digits.search(/[1-9]/) && fini ? `color:${PU3_BLEU};font-weight:700;` : ''}">${o.digits[i] || '0'}</span>`;
  }
  box.innerHTML = h;
}
function pu3ScAnimer(){
  clearInterval(pu3ScTimer);
  const o = pu3ScParse(), out = document.getElementById('pu3-scResultat');
  if(!o){ out.innerHTML = '<p class="hint" style="color:#a83c1f;">Écrivez un nombre décimal positif non nul (par exemple 0,000 48).</p>'; document.getElementById('pu3-scChiffres').innerHTML = ''; return; }
  // zéros de complément si la virgule doit aller plus loin que les chiffres écrits
  while(o.digits.length < o.cible) o.digits += '0';
  let virg = o.virg0; const pas = o.cible > o.virg0 ? 1 : -1, n = o.virg0 - o.cible;
  pu3ScAfficher(o, virg, false); out.innerHTML = '';
  pu3ScTimer = setInterval(() => {
    if(virg === o.cible){ clearInterval(pu3ScTimer);
      const mant = o.digits.slice(o.digits.search(/[1-9]/), o.cible) + (o.digits.slice(o.cible).replace(/0+$/, '') ? ',' + o.digits.slice(o.cible).replace(/0+$/, '') : '');
      pu3ScAfficher(o, virg, true);
      const nb = pu3Fr((o.e.replace(/^0+(?=\d)/, '') || '0') + (o.d ? '.' + o.d : ''));
      out.innerHTML = (n === 0 ? 'La virgule est déjà à la bonne place : exposant 0.' : `La virgule a glissé de <b>${Math.abs(n)} rang${Math.abs(n) > 1 ? 's' : ''} vers la ${n > 0 ? 'gauche' : 'droite'}</b> : pour compenser, on multiplie par ${pu3Tex('10^{' + n + '}')}.`)
        + `<br>${pu3Tex(pu3TexFr(nb.replace(/ /g, '').replace('−', '-').replace(',', '.')) + ' = ' + mant.replace(',', '{,}') + ' \\times 10^{' + n + '}')}`;
      renderStaticMath(out); return; }
    virg += pas; pu3ScAfficher(o, virg, false);
  }, 420);
}

/* ---- Méthode 4 : de l'atome à l'Univers ---- */
const PU3_ZOOM = [
  [-10, '1', 'Un atome', '≈ 1 × 10⁻¹⁰ m (0,1 nanomètre)'], [-9, '2', 'La largeur d\'un brin d\'ADN', '≈ 2 × 10⁻⁹ m (2 nanomètres)'],
  [-7, '1', 'Un virus', '≈ 1 × 10⁻⁷ m (100 nanomètres)'], [-6, '2', 'Une bactérie', '≈ 2 × 10⁻⁶ m (2 micromètres)'],
  [-6, '7', 'Un globule rouge', '≈ 7 × 10⁻⁶ m (7 micromètres)'], [-5, '7', 'L\'épaisseur d\'un cheveu', '≈ 7 × 10⁻⁵ m (70 micromètres)'],
  [-3, '1', 'Un grain de sable', '≈ 1 × 10⁻³ m (1 millimètre)'], [-2, '1,5', 'Une abeille', '≈ 1,5 × 10⁻² m (1,5 centimètre)'],
  [0, '1,6', 'Un élève de 3e', '≈ 1,6 m'], [1, '1,2', 'Un bus', '≈ 1,2 × 10¹ m (12 mètres)'],
  [2, '1', 'Un terrain de football', '≈ 1 × 10² m (100 mètres)'], [2, '3,3', 'La tour Eiffel', '≈ 3,3 × 10² m (330 mètres)'],
  [3, '8,8', 'Le mont Everest (altitude)', '≈ 8,8 × 10³ m (8,8 kilomètres)'], [6, '1', 'La France (largeur)', '≈ 1 × 10⁶ m (1 000 kilomètres)'],
  [7, '1,27', 'Le diamètre de la Terre', '≈ 1,27 × 10⁷ m'], [8, '3,8', 'La distance Terre – Lune', '≈ 3,8 × 10⁸ m'],
  [9, '1,4', 'Le diamètre du Soleil', '≈ 1,4 × 10⁹ m'], [11, '1,5', 'La distance Terre – Soleil', '≈ 1,5 × 10¹¹ m'],
  [12, '4,5', 'La distance Soleil – Neptune', '≈ 4,5 × 10¹² m'], [15, '9,46', 'Une année-lumière', '≈ 9,46 × 10¹⁵ m'],
  [21, '1', 'La Voie lactée (diamètre)', '≈ 1 × 10²¹ m'], [26, '8,8', 'L\'Univers observable (diamètre)', '≈ 8,8 × 10²⁶ m'],
];
function pu3ZoomMaj(){
  const i = Number(document.getElementById('pu3-zoom').value), [e, , nom, val] = PU3_ZOOM[i];
  const pos = (e + 10) / 36 * 100;
  const aff = document.getElementById('pu3-zoomAff');
  aff.innerHTML = `<div style="font-size:1.25rem;font-weight:700;color:${PU3_BLEU};">${nom}</div><div style="font-family:'JetBrains Mono',monospace;font-size:1.05rem;">${val}</div>`
    + `<div style="position:relative;height:26px;max-width:520px;margin:10px auto 0;background:linear-gradient(90deg,#E8F0F9,#F7E9DD);border-radius:13px;"><div style="position:absolute;left:calc(${pos.toFixed(1)}% - 9px);top:4px;width:18px;height:18px;border-radius:50%;background:${PU3_ORANGE};"></div></div>`
    + `<div style="display:flex;justify-content:space-between;max-width:520px;margin:2px auto 0;font-size:.8rem;color:#6B7280;"><span>10⁻¹⁰ m</span><span>1 m</span><span>10²⁶ m</span></div>`
    + `<div class="hint" style="margin:6px 0 0;">Exposant de 10 : <b>${e}</b>${i > 0 ? (e === PU3_ZOOM[i - 1][0] ? ' — même puissance de 10 que l\'objet précédent (seule la mantisse change)' : ` — par rapport à l'objet précédent, l'exposant a augmenté de ${e - PU3_ZOOM[i - 1][0]}`) : ''}.</div>`;
}

DEMO_REGISTRY['3e|Puissances'] = {
  cours: 'cours-demo-puissances-3e', methode: 'methode-demo-puissances-3e', exos: 'exos-demo-puissances-3e', histoire: 'histoire-demo-puissances-3e',
  init: () => {
    pu3MachineMaj(); pu3CalculDemo.reset(); pu3ScAnimer(); pu3ZoomMaj();
    ['cours-demo-puissances-3e', 'methode-demo-puissances-3e', 'exos-demo-puissances-3e', 'histoire-demo-puissances-3e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-puissances-3e'));
    injectCourseAddButtons(document.getElementById('methode-demo-puissances-3e'));
  }
};

DEMO_QUIZZES['3e|Puissances'] = [
  { q: '(−2)⁵ est égal à...', opts: ['−32', '32', '−10'], correct: 0 },
  { q: '2⁻³ est égal à...', opts: ['−8', '1/8', '−6'], correct: 1 },
  { q: '5⁻¹ est...', opts: ['l\'opposé de 5', 'l\'inverse de 5', 'égal à −5'], correct: 1 },
  { q: '10⁶ × 10⁻² =', opts: ['10⁴', '10⁻¹²', '10⁸'], correct: 0 },
  { q: '1 nanomètre =', opts: ['10⁻⁹ m', '10⁹ m', '10⁻⁶ m'], correct: 0 },
  { q: 'L\'écriture scientifique de 0,000 48 est...', opts: ['48 × 10⁻⁵', '4,8 × 10⁻⁴', '4,8 × 10⁴'], correct: 1 },
  { q: 'Dans 2 + 5 × 2³, on calcule d\'abord...', opts: ['2 + 5', '5 × 2', '2³'], correct: 2 },
];

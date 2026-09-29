/* ============================================================
   CHAPITRE : Divisibilité (4e, N2)
   Fichier autonome -- voir la note dans chapitres/5e/G1-symetrie-centrale.js.
   Demandé : "On continue avec la divisibilité" (même principe que N1 : plan du manuel, titres
   reformulés, exemples nouveaux). Utilise r4Ex / R4_REM / R4_BLEU de chapitres/4e/N1-operations-relatifs.js
   (chargé avant) pour les exemples rédigés « calcul → ce qu'on fait ».
   ============================================================ */

const D4_PREMIERS_100 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
// Grille 1 à 100 (10 × 10) : nombres premiers en évidence (cours) ou cases vierges (crible animé).
function d4GrilleHtml(id, surligner){
  let h = `<div id="${id}" class="d4-grille" style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:460px;margin:10px auto 14px;font-family:'JetBrains Mono',monospace;font-size:.9rem;">`;
  for(let n = 1; n <= 100; n++){
    const p = surligner && D4_PREMIERS_100.includes(n);
    h += `<div data-n="${n}" style="text-align:center;padding:5px 0;border-radius:5px;transition:background .2s,color .2s;${p ? 'background:#0C5BA0;color:#fff;font-weight:700;' : surligner ? 'background:#E4E7EC;color:#8A93A3;' : 'background:#fff;border:1px solid #D9DEE6;'}">${n}</div>`;
  }
  return h + '</div>';
}
const D4_OK = '<span style="color:#1E7B34;font-weight:700;">oui</span>', D4_NON = '<span style="color:#C0392B;font-weight:700;">non</span>';

document.getElementById('cours-demo-divisibilite-4e').innerHTML = `
<div class="lesson-header"><span class="num">1</span><h3>Multiples et diviseurs d'un nombre entier</h3></div>
<span class="def-badge">Définitions</span>
<div class="def-box">Soient <i>a</i> et <i>b</i> deux nombres entiers positifs (<i>b</i> non nul). S'il existe un nombre entier <i>q</i> tel que <b><i>a</i> = <i>b</i> × <i>q</i></b>, alors :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><i>a</i> est <b>divisible</b> par <i>b</i> ;</li>
    <li><i>b</i> est un <b>diviseur</b> de <i>a</i> ;</li>
    <li><i>a</i> est un <b>multiple</b> de <i>b</i>.</li>
  </ul>
</div>
<p class="example-title">Exemple : on sait que 1 924 = 37 × 52.</p>
<ul class="example-list">
  <li>1 924 est divisible par 52 ; 52 est un diviseur de 1 924 ; 1 924 est un multiple de 52.</li>
  <li>De même : 1 924 est divisible par 37 ; 37 est un diviseur de 1 924 ; 1 924 est un multiple de 37.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarques : dire que <i>a</i> est divisible par <i>b</i>, c'est dire que le <b>reste</b> de la division euclidienne de <i>a</i> par <i>b</i> est <b>nul</b>. Le nombre 1 est un diviseur de tous les nombres entiers, et tout nombre entier non nul est un diviseur de lui-même.</div>

<div class="lesson-header"><span class="num">2</span><h3>Reconnaître un nombre divisible sans poser la division</h3></div>
<span class="prop-badge">Critères de divisibilité</span>
<div class="def-box"><ul style="margin:0;padding-left:20px;line-height:1.8;">
  <li>Un nombre entier est <b>divisible par 2</b> si son chiffre des unités est 0, 2, 4, 6 ou 8 (c'est un nombre <b>pair</b>).</li>
  <li>Un nombre entier est <b>divisible par 5</b> si son chiffre des unités est 0 ou 5.</li>
  <li>Un nombre entier est <b>divisible par 10</b> si son chiffre des unités est 0.</li>
  <li>Un nombre entier est <b>divisible par 4</b> si le nombre formé par ses <b>deux derniers chiffres</b> (dizaines et unités) est divisible par 4.</li>
  <li>Un nombre entier est <b>divisible par 3</b> si la <b>somme de ses chiffres</b> est un multiple de 3.</li>
  <li>Un nombre entier est <b>divisible par 9</b> si la <b>somme de ses chiffres</b> est un multiple de 9.</li>
</ul></div>
<p class="example-title">Exemple : le nombre 31 716 est-il divisible par 2, 3, 4, 5, 9 ou 10 ?</p>
<ul class="example-list">
  <li>Son chiffre des unités est 6 : 31 716 est <b>divisible par 2</b>, mais <b>pas par 5</b> ni <b>par 10</b>.</li>
  <li>Ses deux derniers chiffres forment 16, qui est divisible par 4 : 31 716 est <b>divisible par 4</b>.</li>
  <li>La somme de ses chiffres est 3 + 1 + 7 + 1 + 6 = 18. Or 18 est un multiple de 3 et de 9 : 31 716 est <b>divisible par 3</b> et <b>par 9</b>.</li>
</ul>
<div class="redaction-note" ${R4_REM}>Remarque : un nombre divisible par 9 est toujours divisible par 3, mais la réciproque est fausse. Par exemple, 2 085 est divisible par 3 (2 + 0 + 8 + 5 = 15) mais pas par 9.</div>

<div class="lesson-header"><span class="num">3</span><h3>Les nombres premiers</h3></div>
<div class="sub-header"><span class="letter">A</span><h4>Qu'est-ce qu'un nombre premier ?</h4></div>
<span class="def-badge">Définition</span>
<div class="def-box">Un nombre entier est <b>premier</b> s'il possède <b>exactement deux diviseurs</b> : 1 et lui-même.</div>
<p class="example-title">Exemples et remarques :</p>
<ul class="example-list">
  <li>29 est premier : ses seuls diviseurs sont 1 et 29.</li>
  <li>1 n'est <b>pas</b> premier : il n'a qu'un seul diviseur.</li>
  <li>2 est le <b>seul</b> nombre premier pair (tous les autres nombres pairs sont divisibles par 2).</li>
  <li>51 n'est pas premier : 5 + 1 = 6, donc il est divisible par 3 (51 = 3 × 17).</li>
  <li>Attention aux apparences : 91 n'est pas premier, car 91 = 7 × 13.</li>
</ul>

<div class="sub-header"><span class="letter">B</span><h4>Les nombres premiers jusqu'à 100 : le crible d'Ératosthène</h4></div>
<p style="margin:4px 0;">Pour trouver les nombres premiers jusqu'à 100, on écrit les nombres de 1 à 100, on barre 1, puis on garde 2 et on barre tous ses multiples, on garde 3 et on barre ses multiples, puis de même avec 5 et 7. Les nombres qui restent sont premiers (le crible est animé dans l'onglet Méthode).</p>
${d4GrilleHtml('d4-grilleCours', true)}
<div class="def-box" style="text-align:center;">Les <b>25 nombres premiers</b> inférieurs à 100 :<br><span style="font-family:'JetBrains Mono',monospace;">${D4_PREMIERS_100.join(' – ')}</span></div>

<div class="lesson-header"><span class="num">4</span><h3>Décomposer un nombre en facteurs premiers</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Tout nombre entier supérieur ou égal à 2 peut s'écrire comme un <b>produit de facteurs premiers</b>, et cette écriture est <b>unique</b> (à l'ordre des facteurs près).</div>
${r4Ex('Exemple 1 : décomposer 360.', [
  ['360 = 2 × 180', 'On divise par le plus petit nombre premier possible : 360 est pair.'],
  ['360 = 2 × 2 × 90', '180 est pair.'],
  ['360 = 2 × 2 × 2 × 45', '90 est pair.'],
  ['360 = 2 × 2 × 2 × 3 × 15', '45 n\'est pas pair, mais 4 + 5 = 9 : il est divisible par 3.'],
  ['360 = 2 × 2 × 2 × 3 × 3 × 5', '15 = 3 × 5, et 5 est premier : on s\'arrête.'],
  ['360 = 2³ × 3² × 5', 'On écrit le résultat avec des puissances.'],
])}
<p class="example-title">Exemple 2 :</p>
<ul class="example-list"><li>1 386 = 2 × 3 × 3 × 7 × 11 = 2 × 3² × 7 × 11. Les facteurs premiers de 1 386 sont 2, 3, 7 et 11.</li></ul>
<div class="redaction-note" ${R4_REM}>Remarque : on écrit en général les facteurs premiers dans l'<b>ordre croissant</b>.</div>

<div class="lesson-header"><span class="num">5</span><h3>Rendre une fraction irréductible</h3></div>
<span class="prop-badge">Propriété</span>
<div class="def-box">Pour simplifier une fraction, on peut :
  <ul style="margin:6px 0 0;padding-left:20px;line-height:1.8;">
    <li><b>décomposer</b> le numérateur et le dénominateur en <b>produits de facteurs premiers</b> ;</li>
    <li><b>simplifier</b> par tous les facteurs communs au numérateur et au dénominateur.</li>
  </ul>
  La fraction obtenue est <b>irréductible</b> : on ne peut plus la simplifier.
</div>
${r4Ex('Exemple : rendre irréductible la fraction <span class="tex">\\dfrac{252}{360}</span>.', [
  ['252 = 2 × 2 × 3 × 3 × 7', 'On décompose le numérateur.'],
  ['360 = 2 × 2 × 2 × 3 × 3 × 5', 'On décompose le dénominateur.'],
  ['<span class="tex">\\dfrac{252}{360} = \\dfrac{\\cancel{2} \\times \\cancel{2} \\times \\cancel{3} \\times \\cancel{3} \\times 7}{\\cancel{2} \\times \\cancel{2} \\times 2 \\times \\cancel{3} \\times \\cancel{3} \\times 5}</span>', 'On simplifie par les facteurs communs : 2, 2, 3 et 3.'],
  ['<span class="tex">\\dfrac{252}{360} = \\dfrac{7}{2 \\times 5} = \\dfrac{7}{10}</span>', '7 et 10 n\'ont plus de facteur commun : la fraction est irréductible.'],
])}
`;

document.getElementById('histoire-demo-divisibilite-4e').innerHTML = `
<div class="history-box">
  <div class="history-title"><span class=gicon>history_edu</span> Un peu d'histoire</div>
  Vers 300 avant J.-C., le mathématicien grec <b>Euclide</b> démontre dans ses <i>Éléments</i> qu'il existe une <b>infinité</b> de nombres premiers : quelle que soit la liste qu'on en dresse, on peut toujours en trouver un nouveau. Un peu plus tard, <b>Ératosthène</b>, directeur de la grande bibliothèque d'Alexandrie, invente le <b>crible</b> qui porte son nom pour les repérer (il est aussi célèbre pour avoir estimé la circonférence de la Terre avec une étonnante précision, en mesurant des ombres). Aujourd'hui, les nombres premiers protègent nos paiements par carte et nos messages sur Internet : les méthodes de chiffrement utilisent le fait qu'il est très facile de multiplier deux grands nombres premiers, mais extrêmement long de retrouver ces deux facteurs à partir de leur produit. Les chasseurs de records, eux, cherchent toujours plus grand : en 2024, le plus grand nombre premier connu comptait plus de 41 millions de chiffres !
</div>
`;

document.getElementById('methode-demo-divisibilite-4e').innerHTML = `
<div class="sub-header"><span class="letter">M</span><h4>Méthode 1 : tester les critères de divisibilité</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Écrivez un nombre entier, puis cliquez sur « Tester » : chaque critère est appliqué et expliqué.</p>
  <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;align-items:center;margin:10px 0;">
    <input id="d4-critNombre" type="text" inputmode="numeric" value="31716" maxlength="15" style="font-family:'JetBrains Mono',monospace;font-size:1.15rem;padding:8px 12px;border-radius:8px;border:1px solid #C9D6E6;width:190px;text-align:center;" onkeydown="if(event.key==='Enter') d4CritTester()">
    <button class="btn" onclick="d4CritTester()">Tester</button>
  </div>
  <div id="d4-critResultat"></div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 2 : le crible d'Ératosthène, pas à pas</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » : les multiples de chaque nombre premier se barrent un à un.</p>
  ${d4GrilleHtml('d4-crible', false)}
  <div id="d4-cribleNote" class="step-note" style="text-align:center;min-height:2.6em;margin:6px 0 4px;"></div>
  <div class="figure-toolbar">
    <button class="btn" id="d4-cribleNext" onclick="d4CribleSuivant()">Étape suivante →</button>
    <button class="btn secondary" onclick="d4CribleReset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 3 : savoir si un nombre est premier</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="d4-premierDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="d4PremierDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="d4PremierDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 4 : décomposer un nombre en facteurs premiers</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="d4-decompDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="d4DecompDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="d4DecompDemo.reset()">Recommencer</button>
  </div>
</div>

<div class="sub-header"><span class="letter">M</span><h4>Méthode 5 : rendre une fraction irréductible</h4></div>
<div class="figure-wrap" style="margin-top:20px;">
  <p class="interaction-hint" style="margin:6px 0;">Cliquez sur « Étape suivante » pour dérouler la méthode.</p>
  <div class="step-display" id="d4-fractionDisplay"></div>
  <div class="figure-toolbar">
    <button class="btn" onclick="d4FractionDemo.next()">Étape suivante →</button>
    <button class="btn secondary" onclick="d4FractionDemo.reset()">Recommencer</button>
  </div>
</div>
`;

// Exercice avec correction repliable (même présentation que N1).
function d4Exo(n, enonce, lignes){
  return `<div class="exo-card">
    <div class="num">Exercice ${n}</div>
    ${enonce}
    <button type="button" class="exo-correction-toggle" data-target="d4-correction-${n}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button>
    <div class="exo-correction" id="d4-correction-${n}">
      <div class="redaction-template">${lignes.flatMap(l => r4Colonne(l) || [l]).map(l => `<div class="we-row"><span class="we-expr" style="font-family:inherit;">${l}</span></div>`).join('')}</div>
    </div>
  </div>`;
}
document.getElementById('exos-demo-divisibilite-4e').innerHTML = `
<div class="redaction-block">
  <h3>Rédaction type : « Justifier qu'un nombre n'est pas premier »</h3>
  <div class="redaction-template">
    <div class="we-row"><span class="we-expr">Le nombre 117 est-il premier ?</span><span class="we-comment">On cherche un diviseur autre que 1 et 117.</span></div>
    <div class="we-row"><span class="we-expr">1 + 1 + 7 = 9, qui est un multiple de 3.</span><span class="we-comment">On applique un critère de divisibilité.</span></div>
    <div class="we-row"><span class="we-expr">Donc 117 est divisible par 3 : 117 = 3 × 39.</span><span class="we-comment">On donne le diviseur trouvé.</span></div>
    <div class="we-row"><span class="we-expr">117 a au moins trois diviseurs (1, 3 et 117) : il n'est pas premier.</span><span class="we-comment">On conclut avec la définition.</span></div>
  </div>
</div>
<div class="redaction-block">
  <h3>Exercices</h3>
  ${d4Exo(1, 'On sait que 2 184 = 24 × 91. Écris quatre phrases utilisant les mots « divisible », « diviseur » ou « multiple ».', [
    '2 184 est divisible par 24 et par 91.', '24 et 91 sont des diviseurs de 2 184.', '2 184 est un multiple de 24.', '2 184 est un multiple de 91.'])}
  ${d4Exo(2, 'Parmi les nombres 1 035 ; 2 718 ; 4 560 et 7 245, lesquels sont divisibles par 2 ? par 3 ? par 4 ? par 5 ? par 9 ? par 10 ?', [
    '1 035 : divisible par 3, 5 et 9 (unités 5 ; somme des chiffres 9).',
    '2 718 : divisible par 2, 3 et 9 (pair ; 18 n\'est pas divisible par 4 ; somme 18).',
    '4 560 : divisible par 2, 3, 4, 5 et 10 (unités 0 ; 60 est divisible par 4 ; somme 15).',
    '7 245 : divisible par 3, 5 et 9 (unités 5 ; somme 18).'])}
  ${d4Exo(3, 'Donne la liste de tous les diviseurs de 48.', [
    '48 = 1 × 48 = 2 × 24 = 3 × 16 = 4 × 12 = 6 × 8', 'Les diviseurs de 48 sont : 1 ; 2 ; 3 ; 4 ; 6 ; 8 ; 12 ; 16 ; 24 ; 48.'])}
  ${d4Exo(4, 'On considère le nombre 7 1 ▢ 2, où ▢ est un chiffre inconnu. Quelles valeurs peut prendre ▢ pour que ce nombre soit divisible par 3 ? par 9 ?', [
    'La somme des chiffres vaut 7 + 1 + ▢ + 2 = 10 + ▢.', 'Divisible par 3 : 10 + ▢ doit valoir 12, 15 ou 18, donc ▢ = 2, 5 ou 8.', 'Divisible par 9 : 10 + ▢ doit valoir 18, donc ▢ = 8.'])}
  ${d4Exo(5, 'Les nombres 143 ; 149 ; 161 et 197 sont-ils premiers ? Justifie.', [
    '143 = 11 × 13 : il n\'est pas premier.', '149 n\'est divisible ni par 2, ni par 3, ni par 5, ni par 7, ni par 11 (et 13 × 13 = 169 > 149) : il est premier.',
    '161 = 7 × 23 : il n\'est pas premier.', '197 n\'est divisible ni par 2, 3, 5, 7, 11, ni par 13 (et 17 × 17 = 289 > 197) : il est premier.'])}
  ${d4Exo(6, 'Décompose en produit de facteurs premiers : 84 ; 150 ; 1 001.', [
    '84 = 2 × 2 × 3 × 7 = 2² × 3 × 7', '150 = 2 × 3 × 5 × 5 = 2 × 3 × 5²', '1 001 = 7 × 11 × 13'])}
  ${d4Exo(7, 'Rends irréductible la fraction <span class="tex">\\dfrac{126}{210}</span> en décomposant son numérateur et son dénominateur.', [
    '126 = 2 × 3 × 3 × 7 et 210 = 2 × 3 × 5 × 7', 'Facteurs communs : 2, 3 et 7.', '<span class="tex">\\dfrac{126}{210} = \\dfrac{\\cancel{2} \\times \\cancel{3} \\times 3 \\times \\cancel{7}}{\\cancel{2} \\times \\cancel{3} \\times 5 \\times \\cancel{7}} = \\dfrac{3}{5}</span>'])}
  ${d4Exo(8, 'Léa affirme : « La somme de deux nombres premiers est toujours un nombre pair. » A-t-elle raison ?', [
    'Non : 2 et 3 sont premiers, et 2 + 3 = 5 est impair.', 'Son affirmation est vraie seulement pour deux nombres premiers impairs (différents de 2).'])}
</div>
`;

/* ---- Méthode 1 : critères de divisibilité ---- */
function d4CritTester(){
  const saisie = document.getElementById('d4-critNombre'), out = document.getElementById('d4-critResultat');
  const s = String(saisie.value || '').replace(/[\s.]/g, '').replace(/^0+(?=\d)/, '');
  if(!/^\d{1,15}$/.test(s)){ out.innerHTML = '<p class="hint" style="text-align:center;color:#a83c1f;">Écrivez un nombre entier positif (15 chiffres au plus).</p>'; return; }
  const esp = s.replace(/\B(?=(\d{3})+(?!\d))/g, ' '), u = Number(s.slice(-1)), d2 = Number(s.slice(-2)), somme = s.split('').reduce((t, c) => t + Number(c), 0);
  const detail = s.split('').join(' + ') + ' = ' + somme;
  const lignes = [
    [2, [0, 2, 4, 6, 8].includes(u), `Chiffre des unités : ${u}.`],
    [5, u === 0 || u === 5, `Chiffre des unités : ${u}.`],
    [10, u === 0, `Chiffre des unités : ${u}.`],
    [4, d2 % 4 === 0, s.length > 1 ? `Deux derniers chiffres : ${String(d2).padStart(2, '0')}, ${d2 % 4 === 0 ? 'divisible' : 'non divisible'} par 4.` : `${d2} ${d2 % 4 === 0 ? 'est' : 'n\'est pas'} divisible par 4.`],
    [3, somme % 3 === 0, `Somme des chiffres : ${detail}, ${somme % 3 === 0 ? '' : 'pas '}multiple de 3.`],
    [9, somme % 9 === 0, `Somme des chiffres : ${detail}, ${somme % 9 === 0 ? '' : 'pas '}multiple de 9.`],
  ];
  out.innerHTML = `<p style="text-align:center;font-family:'JetBrains Mono',monospace;font-size:1.1rem;margin:6px 0 8px;">${esp}</p>
  <table style="border-collapse:collapse;width:100%;max-width:560px;margin:0 auto;font-size:.92rem;background:#fff;">
    ${lignes.map(([k, ok, why]) => `<tr><td style="border:1px solid #D9DEE6;padding:6px 10px;white-space:nowrap;font-weight:700;">par ${k}</td><td style="border:1px solid #D9DEE6;padding:6px 10px;">${ok ? D4_OK : D4_NON}</td><td style="border:1px solid #D9DEE6;padding:6px 10px;color:#4E5665;">${why}</td></tr>`).join('')}
  </table>`;
}

/* ---- Méthode 2 : crible d'Ératosthène animé ---- */
const D4_CRIBLE_ETAPES = [
  { note: 'On écrit les nombres entiers de 1 à 100.' },
  { note: '1 n\'est pas premier (il n\'a qu\'un diviseur) : on le barre.', barre: [1] },
  { note: '2 est premier : on le garde (en bleu), puis on barre tous ses multiples (4, 6, 8…).', premier: 2 },
  { note: '3 est le premier nombre non barré : il est premier. On barre ses multiples (6, 9, 12…).', premier: 3 },
  { note: '4 est déjà barré. 5 est premier : on barre ses multiples (10, 15, 20…).', premier: 5 },
  { note: '6 est barré. 7 est premier : on barre ses multiples (14, 21, 28…).', premier: 7 },
  { note: 'Le nombre premier suivant est 11, et 11 × 11 = 121 dépasse 100 : tous ses multiples jusqu\'à 100 sont déjà barrés. Les nombres restants sont tous premiers : il y en a 25.', fin: true },
];
let d4CribleK = 0, d4CribleTimer = null;
function d4Case(n){ return document.querySelector(`#d4-crible [data-n="${n}"]`); }
function d4Barrer(n){ const c = d4Case(n); if(c && !c.dataset.etat){ c.dataset.etat = 'barre'; c.style.background = '#E4E7EC'; c.style.color = '#A0A8B6'; c.style.textDecoration = 'line-through'; } }
function d4Entourer(n){ const c = d4Case(n); if(c){ c.dataset.etat = 'premier'; c.style.background = '#0C5BA0'; c.style.color = '#fff'; c.style.fontWeight = '700'; c.style.textDecoration = 'none'; } }
function d4CribleReset(){
  clearInterval(d4CribleTimer); d4CribleK = 0;
  const g = document.getElementById('d4-crible'); if(!g) return;
  g.querySelectorAll('[data-n]').forEach(c => { delete c.dataset.etat; c.style.background = '#fff'; c.style.color = ''; c.style.fontWeight = ''; c.style.textDecoration = 'none'; });
  document.getElementById('d4-cribleNote').textContent = D4_CRIBLE_ETAPES[0].note;
  document.getElementById('d4-cribleNext').disabled = false;
}
function d4CribleSuivant(){
  if(d4CribleK >= D4_CRIBLE_ETAPES.length - 1) return;
  clearInterval(d4CribleTimer);
  // Termine instantanément une étape encore en cours d'animation.
  const precedente = D4_CRIBLE_ETAPES[d4CribleK];
  if(precedente.premier) for(let m = 2 * precedente.premier; m <= 100; m += precedente.premier) d4Barrer(m);
  d4CribleK++;
  const e = D4_CRIBLE_ETAPES[d4CribleK];
  document.getElementById('d4-cribleNote').textContent = e.note;
  if(e.barre) e.barre.forEach(d4Barrer);
  if(e.premier){
    d4Entourer(e.premier);
    let m = 2 * e.premier;
    d4CribleTimer = setInterval(() => { if(m > 100){ clearInterval(d4CribleTimer); return; } d4Barrer(m); m += e.premier; }, 45);
  }
  if(e.fin) for(let n = 2; n <= 100; n++){ const c = d4Case(n); if(c && !c.dataset.etat) d4Entourer(n); }
  document.getElementById('d4-cribleNext').disabled = d4CribleK >= D4_CRIBLE_ETAPES.length - 1;
}

/* ---- Méthode 3 : nombre premier ? ---- */
const D4_PREMIER_STEPS = [
  { expr: 'Le nombre 127 est-il premier ?', note: 'On teste les divisions par les nombres premiers 2, 3, 5, 7, 11… dans l\'ordre.' },
  { expr: '127 est impair : pas divisible par 2.', note: 'Critère de divisibilité par 2.' },
  { expr: '1 + 2 + 7 = 10 : pas divisible par 3.', note: '10 n\'est pas un multiple de 3.' },
  { expr: 'Il ne se termine ni par 0 ni par 5 : pas divisible par 5.', note: 'Critère de divisibilité par 5.' },
  { expr: '127 = 7 × 18 + 1 : pas divisible par 7.', note: 'Pas de critère simple pour 7 : on pose la division, le reste n\'est pas nul.' },
  { expr: '127 = 11 × 11 + 6 : pas divisible par 11.', note: 'Le reste n\'est pas nul.' },
  { expr: '13 × 13 = 169 > 127 : on peut s\'arrêter.', note: 'Si 127 avait un diviseur plus grand que 11, il aurait aussi un diviseur plus petit, déjà testé.' },
  { expr: 'Donc 127 est un nombre premier.', note: 'Ses seuls diviseurs sont 1 et 127.' },
];
const d4PremierDemo = makeStepDemo(D4_PREMIER_STEPS, 'd4-premierDisplay');

/* ---- Méthode 4 : décomposition ---- */
const D4_DECOMP_STEPS = [
  { expr: '1 540', note: 'On veut décomposer 1 540 en produit de facteurs premiers.' },
  { expr: '1 540 = 2 × 770', note: '1 540 est pair : on divise par 2, le plus petit nombre premier.' },
  { expr: '1 540 = 2 × 2 × 385', note: '770 est pair : on divise encore par 2.' },
  { expr: '1 540 = 2 × 2 × 5 × 77', note: '385 est impair ; 3 + 8 + 5 = 16, pas divisible par 3 ; il se termine par 5 : on divise par 5.' },
  { expr: '1 540 = 2 × 2 × 5 × 7 × 11', note: '77 = 7 × 11, et 7 et 11 sont premiers : la décomposition est terminée.' },
  { expr: '1 540 = 2² × 5 × 7 × 11', note: 'On regroupe les facteurs égaux avec une puissance, dans l\'ordre croissant.' },
];
const d4DecompDemo = makeStepDemo(D4_DECOMP_STEPS, 'd4-decompDisplay');

/* ---- Méthode 5 : fraction irréductible ---- */
const D4_FRACTION_STEPS = [
  { expr: '<span class="tex">\\dfrac{165}{198}</span>', note: 'On veut rendre cette fraction irréductible.' },
  { expr: '165 = 3 × 5 × 11', note: 'On décompose le numérateur : 1 + 6 + 5 = 12, donc 165 = 3 × 55 = 3 × 5 × 11.' },
  { expr: '198 = 2 × 3 × 3 × 11', note: 'On décompose le dénominateur : 198 = 2 × 99 = 2 × 9 × 11.' },
  { expr: '<span class="tex">\\dfrac{165}{198} = \\dfrac{\\cancel{3} \\times 5 \\times \\cancel{11}}{2 \\times \\cancel{3} \\times 3 \\times \\cancel{11}}</span>', note: 'On repère et on barre les facteurs communs : 3 et 11.' },
  { expr: '<span class="tex">\\dfrac{165}{198} = \\dfrac{5}{2 \\times 3} = \\dfrac{5}{6}</span>', note: '5 et 6 n\'ont aucun facteur premier commun : la fraction est irréductible.' },
];
const d4FractionDemo = makeStepDemo(D4_FRACTION_STEPS, 'd4-fractionDisplay');

DEMO_REGISTRY['4e|Divisibilité'] = {
  cours: 'cours-demo-divisibilite-4e', methode: 'methode-demo-divisibilite-4e', exos: 'exos-demo-divisibilite-4e', histoire: 'histoire-demo-divisibilite-4e',
  init: () => {
    d4CritTester(); d4CribleReset();
    d4PremierDemo.reset(); d4DecompDemo.reset(); d4FractionDemo.reset();
    ['cours-demo-divisibilite-4e', 'exos-demo-divisibilite-4e'].forEach(id => renderStaticMath(document.getElementById(id)));
    injectCourseAddButtons(document.getElementById('cours-demo-divisibilite-4e'));
    injectCourseAddButtons(document.getElementById('methode-demo-divisibilite-4e'));
  }
};

DEMO_QUIZZES['4e|Divisibilité'] = [
  { q: 'Sachant que 391 = 17 × 23, que peut-on dire ?', opts: ['391 est un diviseur de 17', '23 est un diviseur de 391', '391 est premier'], correct: 1 },
  { q: 'Le nombre 5 832 est divisible par...', opts: ['5', '9', '10'], correct: 1 },
  { q: 'Un nombre est divisible par 4 si...', opts: ['son chiffre des unités est 4', 'le nombre formé par ses deux derniers chiffres est divisible par 4', 'la somme de ses chiffres est divisible par 4'], correct: 1 },
  { q: 'Lequel de ces nombres est premier ?', opts: ['51', '57', '59'], correct: 2 },
  { q: 'Le nombre 1 est-il premier ?', opts: ['Oui', 'Non, il n\'a qu\'un seul diviseur'], correct: 1 },
  { q: 'La décomposition en facteurs premiers de 60 est...', opts: ['2 × 30', '2² × 3 × 5', '4 × 15'], correct: 1 },
  { q: 'La fraction irréductible égale à 18/24 est...', opts: ['9/12', '3/4', '6/8'], correct: 1 },
];

/* ============================================================
   CHAPITRE : Probabilités (CM2, D1, période 2 -- « au plus tard en période 2 »)
   Programme du cycle 3 (CM2) : identifier toutes les issues d'une expérience aléatoire simple et
   celles qui réalisent un évènement ; en situation d'équiprobabilité, exprimer une probabilité
   sous la forme « a chances sur b » ; comparer des probabilités ; notion d'indépendance (le dé
   « ne se souvient pas ») ; expérience en deux étapes : tableau à double entrée ou arbre.
   La probabilité écrite comme un nombre (fraction, décimal, %) est en 6e.
   Atelier : lancer deux dés et regarder la somme.
   ============================================================ */
(() => {
function tableSommes(surligne){
  let h = '<table style="border-collapse:collapse;margin:6px auto;font-family:\'Space Grotesk\',sans-serif;text-align:center;"><tr><th style="padding:5px 8px;background:#1F3A5C;color:#fff;">dé 1 \\ dé 2</th>';
  for(let j = 1; j <= 6; j++) h += `<th style="padding:5px 10px;background:#2EA8C9;color:#fff;">${j}</th>`;
  h += '</tr>';
  for(let i = 1; i <= 6; i++){ h += `<tr><th style="padding:5px 10px;background:#2EA8C9;color:#fff;">${i}</th>`;
    for(let j = 1; j <= 6; j++){ const s = i + j, on = surligne && surligne(s); h += `<td style="padding:5px 10px;border:1px solid rgba(28,43,57,.2);${on ? 'background:rgba(227,93,58,.25);font-weight:700;' : ''}">${s}</td>`; }
    h += '</tr>'; }
  return h + '</table>';
}
function arbre(){
  const T = (x, y, t, c) => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="${c || '#1F3A5C'}" font-family="Space Grotesk" text-anchor="middle">${t}</text>`;
  const L = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1F3A5C" stroke-width="1.6"/>`;
  return `<svg viewBox="0 0 420 180" style="width:100%;max-width:420px;display:block;margin:0 auto;">
  ${L(20, 90, 120, 45)}${L(20, 90, 120, 135)}${T(135, 50, 'P', '#2EA8C9')}${T(135, 140, 'F', '#E35D3A')}
  ${L(150, 45, 250, 22)}${L(150, 45, 250, 68)}${L(150, 135, 250, 112)}${L(150, 135, 250, 158)}
  ${T(265, 27, 'P', '#2EA8C9')}${T(265, 73, 'F', '#E35D3A')}${T(265, 117, 'P', '#2EA8C9')}${T(265, 163, 'F', '#E35D3A')}
  ${T(350, 27, 'PP')}${T(350, 73, 'PF')}${T(350, 117, 'FP')}${T(350, 163, 'FF')}
  <text x="70" y="175" font-size="11" fill="#5B6472" font-family="Inter" text-anchor="middle">1er lancer</text><text x="200" y="175" font-size="11" fill="#5B6472" font-family="Inter" text-anchor="middle">2e lancer</text></svg>`;
}
let dd = { n: 0, cpt: {} };
function ddAfficher(){
  const el = document.getElementById('c2dd-zone'); if(!el) return;
  const max = Math.max(1, ...Object.values(dd.cpt));
  let s = `<div style="display:flex;align-items:flex-end;gap:6px;height:170px;justify-content:center;">`;
  for(let k = 2; k <= 12; k++){ const v = dd.cpt[k] || 0; s += `<div style="text-align:center;font-size:.8rem;"><div style="font-weight:700;">${v}</div><div style="width:26px;height:${Math.round(130 * v / max)}px;background:${k === 7 ? '#E35D3A' : '#2EA8C9'};border-radius:4px 4px 0 0;"></div><div>${k}</div></div>`; }
  el.innerHTML = s + `</div><p class="hint" style="text-align:center;margin:6px 0 0;">${dd.n} lancer(s) de deux dés — nombre de fois où chaque somme est sortie.</p>`;
}
window.c2DdLancer = k => { for(let i = 0; i < k; i++){ const s = 2 + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6); dd.cpt[s] = (dd.cpt[s] || 0) + 1; dd.n++; } ddAfficher(); };
window.c2DdReset = () => { dd = { n: 0, cpt: {} }; ddAfficher(); };
cm1Chapitre({
  niveau: 'cm2', titre: 'Probabilités', slug: 'probabilites',
  cours: `
${cm1Lecon(1, 'Issues et évènements')}
${cm1Def('Lors d\'une expérience aléatoire, les <b>issues</b> sont tous les résultats possibles. Un <b>évènement</b> est réalisé par une ou plusieurs issues.')}
${cm1Exemple('On lance un dé à 6 faces :', ['les issues sont 1, 2, 3, 4, 5, 6 ;', 'l\'évènement « obtenir un nombre pair » est réalisé par les issues 2, 4 et 6.'])}

${cm1Lecon(2, 'a chances sur b')}
${cm1Regle(`Quand toutes les issues ont la même chance de sortir (on dit qu'elles sont <b>équiprobables</b>), la probabilité d'un évènement s'exprime par « <b>a chances sur b</b> » :${cm1Liste(['a est le nombre d\'issues qui réalisent l\'évènement ;', 'b est le nombre total d\'issues.'])}`)}
${cm1Exemple('Avec un dé à 6 faces bien équilibré :', ['« obtenir 5 » : <b>1 chance sur 6</b> ;', '« obtenir un nombre pair » : <b>3 chances sur 6</b> (autant que 1 chance sur 2) ;', '« obtenir un nombre plus grand que 4 » (5 ou 6) : <b>2 chances sur 6</b>.'])}
${cm1Astuce('Ce n\'est pas parce qu\'il y a deux issues que chacune a une chance sur deux ! Dans un sac de 3 billes rouges et 1 bleue, il y a deux couleurs possibles, mais on a <b>3 chances sur 4</b> de tirer une rouge et seulement 1 chance sur 4 de tirer la bleue.')}
${cmAnimTirages('c2-pr-tirages', { presets: [{ nom: '3 rouges, 1 bleue', billes: [['rouge', 3, '#E35D3A'], ['bleue', 1, '#2EA8C9']], n: 40, fin: 'Les rouges sortent environ 3 fois sur 4 : deux couleurs possibles, mais pas une chance sur deux !' }, { nom: '1 rouge, 1 bleue', billes: [['rouge', 1, '#E35D3A'], ['bleue', 1, '#2EA8C9']], n: 40 }] })}

${cm1Lecon(3, 'Le hasard n\'a pas de mémoire')}
${cm1Regle('Si on relance un dé, il « ne se souvient pas » des lancers précédents : après trois 6 de suite, on a toujours 1 chance sur 6 d\'obtenir 6 au lancer suivant. On dit que les lancers sont <b>indépendants</b>.')}

${cm1Lecon(4, 'Expériences en deux étapes : arbre et tableau')}
${cm1Exemple('On lance deux fois une pièce (P = pile, F = face). L\'arbre montre toutes les issues :')}
<div class="figure-wrap">${arbre()}</div>
<ul class="example-list"><li>Il y a 4 issues : PP, PF, FP, FF.</li><li>« Obtenir une fois pile et une fois face » : PF ou FP, soit <b>2 chances sur 4</b>.</li></ul>
${cm1Exemple('On lance deux dés et on additionne. Le tableau à double entrée montre les 36 issues :')}
<div class="figure-wrap">${tableSommes(s => s === 7)}</div>
<ul class="example-list"><li>La somme 7 apparaît 6 fois : <b>6 chances sur 36</b>.</li><li>La somme 2 n\'apparaît qu\'une fois : 1 chance sur 36.</li><li>Le 7 est la somme la plus probable !</li></ul>
`,
  methode: `
${cm1Demo('c2-pr-urne', 'Calculer « a chances sur b »', 'Un sac contient 5 billes rouges, 3 vertes et 2 jaunes. On tire une bille au hasard. Quelle est la probabilité de tirer une verte ?')}
${cm1Sous('A', 'Atelier : lancer deux dés')}
<div class="figure-wrap"><div id="c2dd-zone"></div><div class="figure-toolbar" style="margin-top:8px;"><button class="btn" onclick="c2DdLancer(1)">1 lancer</button><button class="btn" onclick="c2DdLancer(36)">36 lancers</button><button class="btn" onclick="c2DdLancer(1000)">1 000 lancers</button><button class="btn secondary" onclick="c2DdReset()">Recommencer</button></div>
<p class="hint" style="text-align:center;">Avec beaucoup de lancers, la somme 7 sort le plus souvent : c'est ce que prévoit le tableau (6 chances sur 36).</p></div>
`,
  demos: [
    ['c2-pr-urne', [
      { expr: '5 + 3 + 2 = 10 billes', note: 'Chaque bille a la même chance d\'être tirée : il y a 10 issues équiprobables.' },
      { expr: '3 billes vertes', note: 'Les issues qui réalisent l\'évènement « tirer une verte ».' },
      { expr: '3 chances sur 10', note: 'a = 3, b = 10.' },
      { expr: 'Rouge : 5 chances sur 10 ; jaune : 2 chances sur 10', note: 'On peut comparer : tirer une rouge est le plus probable.' },
    ]],
  ],
  exos: cm1Exos('c2pr', [
    [`On lance un dé à 6 faces. Donne la probabilité de chaque évènement.${cm1Liste(['obtenir 3', 'obtenir un nombre impair', 'obtenir un multiple de 3', 'obtenir 7'])}`,
      cm1Redac('Obtenir 3', '', 'Une seule issue convient : on a 1 chance sur 6.')
      + cm1Redac('Obtenir un nombre impair', '', 'Les issues 1, 3 et 5 conviennent : on a 3 chances sur 6.')
      + cm1Redac('Obtenir un multiple de 3', '', 'Les issues 3 et 6 conviennent : on a 2 chances sur 6.')
      + cm1Redac('Obtenir 7', '', 'Aucune issue ne convient : on a 0 chance sur 6, c\'est impossible.')],
    ['Une roue a 8 secteurs égaux : 4 bleus, 3 rouges, 1 vert. Quelle couleur est la plus probable ? Donne la probabilité de chaque couleur.',
      cm1Redac('Probabilités', { suite: ['bleu : 4 chances sur 8', 'rouge : 3 chances sur 8', 'vert : 1 chance sur 8'] }, 'Le bleu est la couleur la plus probable.')],
    ['Lina dit : « Demain, soit il pleut, soit il ne pleut pas : il y a une chance sur deux qu\'il pleuve. » A-t-elle raison ?',
      cm1Redac('Avis sur Lina', '', 'Non : il y a deux issues, mais elles n\'ont pas forcément la même chance de se produire.')],
    ['Après 5 « face » de suite, a-t-on plus de chances d\'obtenir « pile » au 6<sup>e</sup> lancer ?',
      cm1Redac('6<sup>e</sup> lancer', '', 'Non : on a toujours 1 chance sur 2, car la pièce ne se souvient pas des lancers précédents.')],
    ['On lance deux pièces. Avec un arbre, donne toutes les issues et la probabilité d\'obtenir deux « face ».',
      cm1Redac('Issues', { suite: ['PP', 'PF', 'FP', 'FF'] }, 'Il y a 4 issues et une seule donne deux « face » : on a 1 chance sur 4.')],
    ['Avec le tableau des sommes de deux dés : probabilité d\'obtenir une somme de 10 ? une somme de 12 ?',
      cm1Redac('Somme 10', { suite: ['4 + 6', '5 + 5', '6 + 4'] }, 'La somme 10 apparaît 3 fois : on a 3 chances sur 36.')
      + cm1Redac('Somme 12', '6 + 6', 'La somme 12 n\'apparaît qu\'une fois : on a 1 chance sur 36.')],
    ['Au restaurant scolaire : entrée (salade ou soupe) et dessert (fruit, yaourt ou gâteau). Combien de menus différents ? Si on choisit au hasard, quelle chance d\'avoir « soupe + gâteau » ?',
      cm1Redac('Nombre de menus', '2 × 3 = 6', 'Il y a 6 menus différents.')
      + cm1Redac('Soupe et gâteau', '', 'Un seul menu sur les 6 convient : on a 1 chance sur 6.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le problème du duc de Toscane', [
    'Vers 1620, le duc de Toscane remarque en jouant qu\'avec trois dés, la somme 10 sort plus souvent que la somme 9, alors qu\'il y a autant de façons de les écrire comme somme de trois nombres. Il demande l\'explication au célèbre savant <b>Galilée</b>.',
    'Galilée compte toutes les issues en tenant compte de l\'ordre des dés (comme dans notre tableau) : 27 issues donnent 10 et seulement 25 donnent 9 sur 216. Le duc avait l\'œil !',
  ]),
  quiz: [
    { q: 'Probabilité d\'obtenir 2 avec un dé à 6 faces ?', opts: ['1 chance sur 2', '1 chance sur 6', '2 chances sur 6'], correct: 1 },
    { q: 'Sac de 3 rouges et 1 bleue : chance de tirer une rouge ?', opts: ['1 chance sur 2', '3 chances sur 4', '1 chance sur 3'], correct: 1 },
    { q: 'Combien d\'issues quand on lance deux pièces ?', opts: ['2', '3', '4'], correct: 2 },
  ],
  init: () => ddAfficher(),
});
})();

/* ============================================================
   CHAPITRE : Multiples et diviseurs (CM2, N8, période 3)
   Programme du cycle 3 (CM2) : savoir si un entier ≤ 10 est diviseur d'un nombre (ou si un nombre
   est multiple d'un entier ≤ 10) ; déterminer des diviseurs d'un nombre ≤ 100, TOUS les diviseurs
   d'un nombre ≤ 30, les diviseurs communs à deux nombres ≤ 30, des multiples communs à deux
   nombres < 15. Seuls les critères de divisibilité par 2, 5 et 10 sont au programme ; sinon on
   s'appuie sur les tables, ou on effectue la division. Atelier : tableau des nombres de 1 à 100.
   ============================================================ */
(() => {
let mdSel = [];
function mdGrille(){
  const el = document.getElementById('c2md-grille'); if(!el) return;
  const cols = ['#2EA8C9', '#E35D3A'];
  let h = '<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:3px;max-width:430px;margin:0 auto;">';
  for(let n = 1; n <= 100; n++){
    const m = mdSel.map(k => n % k === 0);
    const bg = m[0] && m[1] ? '#7A4FC0' : m[0] ? cols[0] : m[1] ? cols[1] : '#fff';
    h += `<div style="text-align:center;padding:5px 0;border-radius:6px;font-family:'Space Grotesk',sans-serif;font-weight:600;border:1px solid rgba(28,43,57,.15);background:${bg};color:${bg === '#fff' ? '#1F3A5C' : '#fff'};">${n}</div>`;
  }
  el.innerHTML = h + '</div>';
  const t = document.getElementById('c2md-txt');
  if(t) t.innerHTML = mdSel.length === 0 ? 'Choisis un ou deux nombres.' : mdSel.length === 1 ? `En bleu : les multiples de <b>${mdSel[0]}</b>.` : `En bleu : multiples de <b>${mdSel[0]}</b> · en rouge : multiples de <b>${mdSel[1]}</b> · en <b style="color:#7A4FC0;">violet</b> : les multiples communs.`;
  document.querySelectorAll('.c2md-b').forEach(b => b.classList.toggle('secondary', !mdSel.includes(+b.dataset.k)));
}
window.c2MdChoisir = k => { const i = mdSel.indexOf(k); if(i >= 0) mdSel.splice(i, 1); else { mdSel.push(k); if(mdSel.length > 2) mdSel.shift(); } mdGrille(); };
cm1Chapitre({
  niveau: 'cm2', titre: 'Multiples et diviseurs', slug: 'multiples-diviseurs',
  cours: `
${cm1Lecon(1, 'Multiple et diviseur')}
${cm1Def('Si 24 = 6 × 4, on dit que :<ul style="margin:4px 0 0;padding-left:18px;line-height:1.8;"><li>24 est un <b>multiple</b> de 6 (et de 4) ;</li><li>6 est un <b>diviseur</b> de 24 (et 4 aussi) : la division de 24 par 6 tombe juste, le reste est 0.</li></ul>')}
${cm1Exemple('Exemples :', ['35 est un multiple de 7, car 35 = 7 × 5.', '7 n\'est pas un diviseur de 30, car 30 = 7 × 4 + 2 : il reste 2.', 'Les multiples de 6 sont 0, 6, 12, 18, 24, 30… (la table de 6, qui continue sans fin).'])}

${cm1Lecon(2, 'Critères de divisibilité par 2, 5 et 10')}
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Un nombre est divisible par <b>2</b> si son chiffre des unités est 0, 2, 4, 6 ou 8 (il est <b>pair</b>).</li><li>Un nombre est divisible par <b>5</b> si son chiffre des unités est 0 ou 5.</li><li>Un nombre est divisible par <b>10</b> si son chiffre des unités est 0.</li></ul>')}
${cm1Rem('Pour les autres diviseurs (3, 4, 6, 7, 8, 9), on utilise ses <b>tables</b> ou on fait la <b>division</b> pour voir s\'il reste quelque chose.')}

${cm1Lecon(3, 'Trouver tous les diviseurs d\'un nombre')}
${cm1Regle('On cherche les <b>produits</b> égaux à ce nombre, en essayant 1, 2, 3… dans l\'ordre, jusqu\'à ce que les facteurs se répètent.')}
${cm1Exemple('Les diviseurs de 24 :', ['24 = 1 × 24', '24 = 2 × 12', '24 = 3 × 8', '24 = 4 × 6', 'ensuite 5 ne marche pas, et 6 × 4 est déjà trouvé ;', 'les diviseurs de 24 sont : <b>1, 2, 3, 4, 6, 8, 12, 24</b>.'])}

${cm1Lecon(4, 'Diviseurs communs, multiples communs')}
${cm1Exemple('Diviseurs communs à 18 et 24 :', ['diviseurs de 18 : 1, 2, 3, 6, 9, 18 ;', 'diviseurs de 24 : 1, 2, 3, 4, 6, 8, 12, 24 ;', 'diviseurs communs : <b>1, 2, 3, 6</b>.'])}
${cm1Exemple('Multiples communs à 4 et 6 :', ['multiples de 4 : 4, 8, <b>12</b>, 16, 20, <b>24</b>, 28… ;', 'multiples de 6 : 6, <b>12</b>, 18, <b>24</b>, 30… ;', 'multiples communs : <b>12, 24, 36…</b> Le plus petit est 12.'])}
${cm1Astuce(`Ces outils servent pour les fractions : pour additionner ${cm1Frac(1, 4)} + ${cm1Frac(1, 6)}, on écrit les deux fractions en douzièmes, car 12 est un multiple commun de 4 et 6.`)}
${ce2AnimSauts('c2-md-communs', { legende: 'Les multiples de 4 (sauts de 4), puis ceux de 6 (sauts de 6) : où se retrouvent-ils ?', presets: [{ nom: 'Multiples de 4', depart: 0, sauts: [[4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4'], [4, '+ 4']], min: 0, max: 26, fin: '0, 4, 8, <b>12</b>, 16, 20, <b>24</b>.' }, { nom: 'Multiples de 6', depart: 0, sauts: [[6, '+ 6'], [6, '+ 6'], [6, '+ 6'], [6, '+ 6']], min: 0, max: 26, fin: '0, 6, <b>12</b>, 18, <b>24</b> : 12 et 24 sont des multiples communs de 4 et de 6 ; le plus petit est 12.' }] })}
`,
  methode: `
${cm1Demo('c2-md-div', 'Trouver tous les diviseurs de 30', 'Cherche tous les diviseurs de 30.')}
${cm1Sous('A', 'Atelier : les multiples dans le tableau de 1 à 100')}
<div class="figure-wrap" style="text-align:center;"><div class="figure-toolbar" style="flex-wrap:wrap;margin-bottom:8px;">${[2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map(k => `<button class="btn secondary c2md-b" data-k="${k}" onclick="c2MdChoisir(${k})">${k}</button>`).join('')}</div>
<p id="c2md-txt" class="hint" style="margin:0 0 8px;"></p><div id="c2md-grille"></div></div>
`,
  demos: [
    ['c2-md-div', [
      { expr: '30 = 1 × 30', note: 'On commence toujours par 1.' },
      { expr: '30 = 2 × 15 · 30 = 3 × 10', note: '30 est pair : divisible par 2. Table de 3 : 3 × 10 = 30.' },
      { expr: '4 ? non · 30 = 5 × 6', note: '30 n\'est pas dans la table de 4. Il finit par 0 : divisible par 5.' },
      { expr: '6 × 5 : déjà trouvé → on s\'arrête', note: 'Les facteurs se répètent : on a tout trouvé.' },
      { expr: 'Diviseurs de 30 : 1, 2, 3, 5, 6, 10, 15, 30', note: 'On les range dans l\'ordre.' },
    ]],
  ],
  exos: cm1Exos('c2md', [
    [`Parmi ces nombres, lesquels sont divisibles par 2 ? par 5 ? par 10 ?${cm1Liste(['45', '62', '80', '115', '238', '1 000'])}`,
      cm1Redac('Divisibles par 2', 'Chiffre des unités pair', '62, 80, 238 et 1 000 sont divisibles par 2.')
      + cm1Redac('Divisibles par 5', 'Chiffre des unités 0 ou 5', '45, 80, 115 et 1 000 sont divisibles par 5.')
      + cm1Redac('Divisibles par 10', 'Chiffre des unités 0', '80 et 1 000 sont divisibles par 10.')],
    [`Vrai ou faux ?${cm1Liste(['7 est un diviseur de 56.', '48 est un multiple de 9.', '3 est un diviseur de 81.'])}`,
      cm1Redac('7 et 56', '56 = 7 × 8', 'Vrai : 7 est un diviseur de 56.')
      + cm1Redac('48 et 9', { suite: ['9 × 5 = 45', '9 × 6 = 54'] }, 'Faux : 48 n\'est pas dans la table de 9.')
      + cm1Redac('3 et 81', '81 = 3 × 27', 'Vrai : 3 est un diviseur de 81.')],
    [`Donne tous les diviseurs de ces nombres.${cm1Liste(['12', '20', '29'])}`,
      cm1Redac('Diviseurs de 12', { suite: ['12 = 1 × 12', '12 = 2 × 6', '12 = 3 × 4'] }, 'Les diviseurs de 12 sont 1, 2, 3, 4, 6 et 12.')
      + cm1Redac('Diviseurs de 20', { suite: ['20 = 1 × 20', '20 = 2 × 10', '20 = 4 × 5'] }, 'Les diviseurs de 20 sont 1, 2, 4, 5, 10 et 20.')
      + cm1Redac('Diviseurs de 29', '29 = 1 × 29', 'Les seuls diviseurs de 29 sont 1 et 29.')],
    ['Donne quatre diviseurs de 100.',
      cm1Redac('Diviseurs de 100', { suite: ['100 = 1 × 100', '100 = 2 × 50', '100 = 4 × 25', '100 = 10 × 10'] }, 'Par exemple 1, 2, 4 et 25 sont des diviseurs de 100 (et aussi 5, 10, 20, 50, 100).')],
    ['Quels sont les diviseurs communs à 16 et 24 ?',
      cm1Redac('Diviseurs de chaque nombre', { suite: ['16 : 1, 2, 4, 8, 16', '24 : 1, 2, 3, 4, 6, 8, 12, 24'] }, 'Les diviseurs communs à 16 et 24 sont 1, 2, 4 et 8.')],
    ['Donne trois multiples communs à 3 et 5, puis le plus petit multiple commun à 6 et 8.',
      cm1Redac('Multiples communs à 3 et 5', { suite: ['3 × 5 = 15', '3 × 10 = 30', '3 × 15 = 45'] }, '15, 30 et 45 sont des multiples communs à 3 et 5.')
      + cm1Redac('Plus petit multiple commun à 6 et 8', { suite: ['multiples de 6 : 6, 12, 18, 24…', 'multiples de 8 : 8, 16, 24…'] }, 'Le plus petit multiple commun à 6 et 8 est 24.')],
    ['On veut ranger 24 billes dans des sachets contenant tous le même nombre de billes, sans en laisser. Quelles sont toutes les possibilités ?',
      cm1Redac('Diviseurs de 24', { suite: ['24 = 1 × 24', '24 = 2 × 12', '24 = 3 × 8', '24 = 4 × 6'] }, 'On peut faire 1 sachet de 24, 2 de 12, 3 de 8, 4 de 6, 6 de 4, 8 de 3, 12 de 2 ou 24 sachets d\'une bille.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le crible d\'Ératosthène', [
    'Il y a plus de 2 200 ans, le savant grec <b>Ératosthène</b> a inventé une méthode pour trouver les nombres qui n\'ont que deux diviseurs (1 et eux-mêmes), appelés <b>nombres premiers</b> : 2, 3, 5, 7, 11, 13…',
    'Dans le tableau de 1 à 100, il barre les multiples de 2 (sauf 2), puis ceux de 3, de 5, de 7 : les nombres qui restent sont premiers. Essaie avec l\'atelier !',
  ]),
  quiz: [
    { q: 'Quel nombre est divisible par 5 ?', opts: ['52', '125', '203'], correct: 1 },
    { q: 'Combien 18 a-t-il de diviseurs ?', opts: ['4', '6', '8'], correct: 1 },
    { q: 'Plus petit multiple commun à 4 et 10 ?', opts: ['40', '20', '14'], correct: 1 },
  ],
  init: () => mdGrille(),
});
})();

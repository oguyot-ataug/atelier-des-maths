/* ============================================================
   CHAPITRE : Procédures de calcul mental (CM1, N8, période 3)
   Programme du cycle 3 (CM1) : faits numériques mémorisés (tables, doubles, moitiés,
   compléments) ; procédures élaborées : ajouter ou soustraire 9, 11, 19, 21 (± 10 puis ± 1),
   décomposer, multiplier par 10, 100, 1 000 un nombre entier, multiplier et diviser un décimal
   par 10, multiplier par 5 (× 10 puis moitié), par 4 (double du double), par 11, par 9. Le
   calcul en ligne s'appuie sur les propriétés des opérations sans les nommer.
   Atelier : série de 10 calculs tirés au hasard, par type de procédure.
   ============================================================ */
(() => {
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const fmt = x => String(Math.round(x * 100) / 100).replace('.', ',');
const TYPES = {
  tables: ['Tables', () => { const a = ri(2, 9), b = ri(2, 9); return [`${a} × ${b}`, a * b]; }],
  doubles: ['Doubles et moitiés', () => { const a = ri(6, 49) * 2; return Math.random() < .5 ? [`double de ${a / 2}`, a] : [`moitié de ${a}`, a / 2]; }],
  complements: ['Compléments', () => { const c = [10, 100, 1000][ri(0, 2)], a = c === 10 ? ri(1, 9) : c === 100 ? ri(1, 19) * 5 : ri(1, 19) * 50; return [`${a} + … = ${c === 1000 ? '1 000' : c}`, c - a]; }],
  plus9: ['± 9, 11, 19, 21', () => { const a = ri(25, 480), k = [9, 11, 19, 21][ri(0, 3)]; return Math.random() < .5 ? [`${a} + ${k}`, a + k] : [`${a + 30} − ${k}`, a + 30 - k]; }],
  dix: ['× 10, 100, 1 000', () => { const a = ri(3, 95), k = [10, 100, 1000][ri(0, 2)]; return [`${a} × ${k === 1000 ? '1 000' : k}`, a * k]; }],
  deci: ['Décimaux × 10 et ÷ 10', () => { const x = ri(11, 999) / 100; return Math.random() < .5 ? [`${fmt(x)} × 10`, x * 10] : [`${fmt(x * 10)} ÷ 10`, x]; }],
  fois5: ['× 4, × 5, × 11', () => { const a = ri(12, 48), k = [4, 5, 11][ri(0, 2)]; return [`${a} × ${k}`, a * k]; }],
};
let cmS = null;
function cmNouvelle(type){
  cmS = { type, k: 0, bons: 0, q: TYPES[type][1]() };
  document.querySelectorAll('.cm-type').forEach(b => b.classList.toggle('secondary', b.dataset.t !== type));
  cmAfficher('');
}
function cmAfficher(retour){
  const el = document.getElementById('cm-zone'); if(!el || !cmS) return;
  if(cmS.k >= 10){ el.innerHTML = `<div style="font-size:1.3rem;font-weight:700;color:#1F3A5C;">Score : ${cmS.bons} / 10</div><p class="hint">${cmS.bons >= 8 ? 'Excellent !' : cmS.bons >= 5 ? 'Bien, continue à t\'entraîner.' : 'Relis la méthode dans le cours, puis recommence.'}</p><button class="btn" onclick="cm1CmType('${cmS.type}')">Nouvelle série</button>`; return; }
  el.innerHTML = `<div class="hint" style="margin-bottom:6px;">Calcul ${cmS.k + 1} / 10 · ${cmS.bons} juste(s)</div>
    <div style="font-family:'Space Grotesk',sans-serif;font-size:1.7rem;font-weight:700;color:#1F3A5C;margin:6px 0;">${cmS.q[0]} = <input id="cm-rep" inputmode="decimal" autocomplete="off" style="width:120px;font-size:1.4rem;padding:4px 8px;border:2px solid #2EA8C9;border-radius:8px;text-align:center;" onkeydown="if(event.key==='Enter')cm1CmValider()"></div>
    <button class="btn" onclick="cm1CmValider()">Valider</button><div style="min-height:24px;margin-top:8px;">${retour}</div>`;
  const i = document.getElementById('cm-rep'); if(i && document.activeElement && document.activeElement.closest && document.activeElement.closest('#cm-zone, .cm-type')) i.focus();
}
window.cm1CmType = t => cmNouvelle(t);
window.cm1CmValider = () => {
  const i = document.getElementById('cm-rep'); if(!i || !cmS) return;
  const v = parseFloat(i.value.replace(/\s/g, '').replace(',', '.')); const bon = Math.abs(v - cmS.q[1]) < 1e-9;
  if(bon) cmS.bons++;
  const r = bon ? '<b style="color:#2E9C6A;">Juste !</b>' : `<b style="color:#E35D3A;">La réponse était ${fmt(cmS.q[1]).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}.</b>`;
  cmS.k++; cmS.q = TYPES[cmS.type][1](); cmAfficher(r);
  const n = document.getElementById('cm-rep'); if(n) n.focus();
};
cm1Chapitre({
  titre: 'Procédures de calcul mental', slug: 'calcul-mental',
  cours: `
${cm1Lecon(1, 'Ce qu\'il faut savoir par cœur')}
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>les <b>tables d\'addition</b> et de <b>multiplication</b> ;</li><li>les <b>doubles</b> et <b>moitiés</b> usuels (le double de 15 est 30, la moitié de 50 est 25…) ;</li><li>les <b>compléments</b> à 10, à 100, à 1 000 :' + cm1Liste(['7 + 3 = 10', '65 + 35 = 100', '750 + 250 = 1 000']) + '</li></ul>', 'Faits numériques')}

${cm1Lecon(2, 'Ajouter ou soustraire 9, 11, 19, 21')}
${cm1Regle('Pour ajouter 9, on ajoute 10 puis on enlève 1. Pour ajouter 11, on ajoute 10 puis on ajoute 1.')}
${ce2AnimSauts('cm1-cm-sauts', { presets: [{ nom: '47 + 9', depart: 47, sauts: [[10, '+ 10'], [-1, '− 1']], min: 40, max: 62, fin: '47 + 9 = <b>56</b> : on ajoute 10, puis on enlève 1.' }, { nom: '85 − 19', depart: 85, sauts: [[-20, '− 20'], [1, '+ 1']], min: 60, max: 90, fin: '85 − 19 = <b>66</b> : on enlève 20, puis on rajoute 1.' }, { nom: '368 − 99', depart: 368, sauts: [[-100, '− 100'], [1, '+ 1']], min: 250, max: 380, fin: '368 − 99 = <b>269</b>.' }] })}
${cm1Exemple('Exemples :', ['47 + 9 = 47 + 10 − 1 = 57 − 1 = <b>56</b>', '136 + 11 = 136 + 10 + 1 = <b>147</b>', '85 − 19 = 85 − 20 + 1 = 65 + 1 = <b>66</b>', '240 + 21 = 240 + 20 + 1 = <b>261</b>'])}

${cm1Lecon(3, 'Décomposer pour calculer')}
${cm1Exemple('On décompose un nombre pour faire des calculs plus simples :', ['35 + 48 = 35 + 40 + 8 = 75 + 8 = <b>83</b>', '14 × 6 = 10 × 6 + 4 × 6 = 60 + 24 = <b>84</b>', '23 × 11 = 23 × 10 + 23 = 230 + 23 = <b>253</b>', '15 × 9 = 15 × 10 − 15 = 150 − 15 = <b>135</b>'])}

${cm1Lecon(4, 'Multiplier par 10, 100, 1 000 (nombres entiers)')}
${cm1Regle('Multiplier un nombre entier par 10, c\'est rendre chaque chiffre 10 fois plus grand : les unités deviennent des dizaines… On écrit donc <b>un 0</b> à droite. Par 100 : <b>deux 0</b>. Par 1 000 : <b>trois 0</b>.')}
${cm1Exemple('Exemples :', ['36 × 10 = <b>360</b> (36 unités deviennent 36 dizaines)', '36 × 100 = <b>3 600</b>', '36 × 1 000 = <b>36 000</b>'])}
${cmAnimGlisseDec('cm1-cm-glisse', { presets: [{ nom: '36 × 100', n: '36', f: 100, op: '×' }, { nom: '2,5 × 10', n: '2,5', f: 10, op: '×' }, { nom: '5,4 ÷ 10', n: '5,4', f: 10, op: '÷' }, { nom: '27 ÷ 10', n: '27', f: 10, op: '÷' }] })}
${cm1Astuce('Cette astuce « j\'ajoute des zéros » ne marche <b>que pour les nombres entiers</b> ! Pour 2,5 × 10, on n\'écrit pas 2,50 : chaque chiffre glisse d\'un rang, et 2,5 × 10 = <b>25</b>.')}

${cm1Lecon(5, 'Décimaux : × 10 et ÷ 10')}
${cm1Regle('× 10 : chaque chiffre glisse d\'<b>un rang vers la gauche</b>. ÷ 10 : chaque chiffre glisse d\'<b>un rang vers la droite</b>.')}
${cm1Exemple('Exemples :', ['4,6 × 10 = <b>46</b>', '0,35 × 10 = <b>3,5</b>', '27 ÷ 10 = <b>2,7</b>', '5,4 ÷ 10 = <b>0,54</b>'])}

${cm1Lecon(6, 'Multiplier par 4, par 5, par 20')}
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li><b>× 4</b> : c\'est le double du double. 23 × 4 → 46 → <b>92</b>.</li><li><b>× 5</b> : c\'est × 10 puis la moitié. 36 × 5 → 360 → <b>180</b>.</li><li><b>× 20</b> : c\'est × 2 puis × 10. 13 × 20 → 26 → <b>260</b>.</li></ul>')}
`,
  methode: `
${cm1Demo('cm-9', 'Calculer 368 − 99', 'Soustraire 99, c\'est presque soustraire 100.')}
${cm1Demo('cm-5', 'Calculer 48 × 5', 'Multiplier par 5, c\'est multiplier par 10 puis prendre la moitié.')}
${cm1Sous('A', 'Atelier : 10 calculs pour t\'entraîner')}
<div class="figure-wrap" style="text-align:center;"><div class="figure-toolbar" style="flex-wrap:wrap;margin-bottom:10px;">${Object.entries(TYPES).map(([k, [n]]) => `<button class="btn secondary cm-type" data-t="${k}" onclick="cm1CmType('${k}')">${n}</button>`).join('')}</div><div id="cm-zone"></div></div>
`,
  demos: [
    ['cm-9', [
      { expr: '99 = 100 − 1', note: '99 est très proche de 100.' },
      { expr: '368 − 100 = 268', note: 'On enlève 100 : c\'est facile.' },
      { expr: '268 + 1 = 269', note: 'On a enlevé 1 de trop : on le rajoute.' },
      { expr: '368 − 99 = 269', note: 'Résultat.' },
    ]],
    ['cm-5', [
      { expr: '48 × 10 = 480', note: 'On multiplie d\'abord par 10.' },
      { expr: 'moitié de 480 = 240', note: '5, c\'est la moitié de 10 : on prend la moitié.' },
      { expr: '48 × 5 = 240', note: 'Résultat.' },
    ]],
  ],
  exos: cm1Exos('cm', [
    [`Calcule de tête en passant par la dizaine.${cm1Liste(['56 + 9', '124 + 11', '73 − 19', '250 − 21'])}`,
      cm1Redac('56 + 9', ['56 + 10 − 1', '66 − 1', '65'], '56 + 9 donne 65.')
      + cm1Redac('124 + 11', { nom: 'B', lignes: ['124 + 10 + 1', '134 + 1', '135'] }, '124 + 11 donne 135.')
      + cm1Redac('73 − 19', { nom: 'C', lignes: ['73 − 20 + 1', '53 + 1', '54'] }, '73 − 19 donne 54.')
      + cm1Redac('250 − 21', { nom: 'D', lignes: ['250 − 20 − 1', '230 − 1', '229'] }, '250 − 21 donne 229.')],
    [`Complète.${cm1Liste(['38 + … = 100', '450 + … = 1 000', '6 + … = 10'])}`,
      cm1Redac('Compléments', { suite: ['38 + 62 = 100', '450 + 550 = 1 000', '6 + 4 = 10'] }, 'Les nombres manquants sont 62, 550 et 4.')],
    [`Calcule.${cm1Liste(['le double de 45', 'la moitié de 90', 'la moitié de 70', 'le double de 125'])}`,
      cm1Redac('Doubles et moitiés', { suite: ['45 + 45 = 90', '45 + 45 = 90', '35 + 35 = 70', '125 + 125 = 250'] }, 'Le double de 45 est 90, la moitié de 90 est 45, la moitié de 70 est 35 et le double de 125 est 250.')],
    ['Une boîte contient 52 crayons. Combien y a-t-il de crayons dans 10 boîtes ? dans 100 boîtes ?',
      cm1Redac('Crayons dans 10 boîtes', '52 × 10 = 520', 'Il y a 520 crayons dans 10 boîtes.') + cm1Redac('Crayons dans 100 boîtes', '52 × 100 = 5 200', 'Il y a 5 200 crayons dans 100 boîtes.')],
    [`Calcule.${cm1Liste(['3,8 × 10', '0,6 × 10', '45 ÷ 10', '1,2 ÷ 10'])}`,
      cm1Redac('Multiplier et diviser par 10', { suite: ['3,8 × 10 = 38', '0,6 × 10 = 6', '45 ÷ 10 = 4,5', '1,2 ÷ 10 = 0,12'] }, 'Chaque chiffre glisse d\'un rang : vers la gauche pour × 10, vers la droite pour ÷ 10.')],
    [`Calcule en expliquant ta méthode.${cm1Liste(['25 × 4', '64 × 5', '18 × 11'])}`,
      cm1Redac('25 × 4 : le double du double', { suite: ['2 × 25 = 50', '2 × 50 = 100'] }, '25 × 4 donne 100.')
      + cm1Redac('64 × 5 : × 10 puis la moitié', { suite: ['64 × 10 = 640', 'la moitié de 640 est 320'] }, '64 × 5 donne 320.')
      + cm1Redac('18 × 11 : × 10 puis on ajoute 18', ['180 + 18', '198'], '18 × 11 donne 198.')],
    ['Un car a 12 rangées de 7 places. Combien de places y a-t-il ? Calcule en décomposant 12.',
      cm1Redac('Nombre de places', ['10 × 7 + 2 × 7', '70 + 14', '84'], 'Il y a 84 places dans le car.')],
  ], { titre: 'Rédaction type : « Expliquer un calcul mental »', lignes: [['47 + 19', 'J\'ajoute 20 (c\'est plus facile)…'], ['= 47 + 20 − 1 = 67 − 1 = 66', '… puis j\'enlève 1, car 19 = 20 − 1.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : les calculateurs prodiges', [
    'Avant les calculatrices, savoir calculer de tête était très utile aux marchands. Certaines personnes étaient capables de calculs extraordinaires : au XIX<sup>e</sup> siècle, <b>Jacques Inaudi</b>, un jeune berger, faisait de tête des multiplications de nombres à 10 chiffres et donnait des spectacles dans toute l\'Europe.',
    'Le secret des bons calculateurs n\'est pas magique : ils connaissent parfaitement leurs tables et utilisent des <b>astuces</b> (décomposer, arrondir, doubler…), exactement celles de ce chapitre !',
  ]),
  quiz: [
    { q: '57 + 9 = …', opts: ['66', '67', '65'], correct: 0 },
    { q: '24 × 5 = …', opts: ['100', '120', '140'], correct: 1 },
    { q: '3,4 × 10 = …', opts: ['3,40', '34', '340'], correct: 1 },
    { q: 'Complément de 350 à 1 000 ?', opts: ['650', '750', '550'], correct: 0 },
  ],
  init: () => cmNouvelle(cmS ? cmS.type : 'tables'),
});
})();

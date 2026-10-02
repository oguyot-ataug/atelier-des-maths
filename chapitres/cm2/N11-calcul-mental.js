/* ============================================================
   CHAPITRE : Procédures de calcul mental (CM2, N11, période 5 -- les procédures sont
   travaillées toute l'année ; ce chapitre les rassemble et les explicite)
   Programme du cycle 3 (CM2) : faits numériques (moitié des impairs jusqu'à 15, relations entre
   fractions usuelles, écriture décimale des fractions usuelles) ; ajouter/soustraire un entier à
   un décimal ; × et ÷ 10, 100, 1 000 un décimal ; ajouter deux décimaux < 10 (un chiffre après
   la virgule) ; ± 8, 9, 18, 19…, 98, 99 ; (dizaines/centaines/milliers) × (dizaines/…) ;
   distributivité ; double et moitié d'un décimal ; ÷ 4, ÷ 8 ; × 5 et × 50 d'un décimal.
   Atelier : séries de 10 calculs par procédure.
   ============================================================ */
(() => {
const ri = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const fmt = x => { const r = Math.round(x * 1000) / 1000; return String(r).replace('.', ','); };
const sep = s => s.replace(/^(\d+)(\d{3})(?=$|,)/, '$1 $2');
const TYPES = {
  moities: ['Moitiés et doubles', () => { const r = Math.random(); if(r < .35){ const a = ri(2, 8) * 2 - 1; return [`moitié de ${a}`, a / 2]; } if(r < .7){ const a = ri(12, 98) / 10; return [`double de ${fmt(a)}`, a * 2]; } const a = ri(6, 49) * 2 / 10; return [`moitié de ${fmt(a)}`, a / 2]; }],
  fractions: ['Fractions usuelles', () => { const f = [['1/2', .5], ['1/4', .25], ['3/4', .75], ['1/5', .2], ['1/10', .1], ['3/2', 1.5], ['2/5', .4], ['1/100', .01]][ri(0, 7)]; return [`${f[0]} en écriture décimale`, f[1]]; }],
  dixcent: ['× et ÷ 10, 100, 1 000', () => { const x = ri(12, 9999) / 100, k = [10, 100, 1000][ri(0, 2)]; return Math.random() < .5 ? [`${fmt(x)} × ${k === 1000 ? '1 000' : k}`, x * k] : [`${fmt(x)} ÷ ${k === 1000 ? '1 000' : k}`, x / k]; }],
  plus99: ['± 9, 19, 99…', () => { const a = ri(120, 950), k = [8, 9, 18, 19, 28, 29, 98, 99][ri(0, 7)]; return Math.random() < .5 ? [`${a} + ${k}`, a + k] : [`${a} − ${k}`, a - k]; }],
  deci: ['Décimaux + entiers', () => { const a = ri(11, 99) / 10, b = ri(11, 89) / 10; return Math.random() < .5 ? [`${fmt(a)} + ${fmt(b)}`, a + b] : [`${fmt(a + 10)} + ${ri(2, 9)}`, null]; }],
  grands: ['30 × 400…', () => { const a = ri(2, 9) * [10, 100, 1000][ri(0, 1)], b = ri(2, 9) * [10, 100][ri(0, 1)]; return [`${sep(String(a))} × ${sep(String(b))}`, a * b]; }],
  fois5: ['× 5, × 50, ÷ 4, ÷ 8', () => { const r = ri(0, 3); if(r === 0){ const x = ri(12, 96) / 10; return [`${fmt(x)} × 5`, x * 5]; } if(r === 1){ const x = ri(12, 48) / 10; return [`${fmt(x)} × 50`, x * 50]; } if(r === 2){ const a = ri(6, 50) * 4; return [`${a} ÷ 4`, a / 4]; } const a = ri(3, 25) * 8; return [`${a} ÷ 8`, a / 8]; }],
};
// Calcul « décimal + entier » : résultat calculé à la volée depuis le texte.
function tirer(t){ const q = TYPES[t][1](); if(q[1] === null){ const [a, b] = q[0].split(' + ').map(v => parseFloat(v.replace(',', '.'))); q[1] = a + b; } return q; }
let cm = null;
function afficher(retour){
  const el = document.getElementById('c2cm-zone'); if(!el || !cm) return;
  if(cm.k >= 10){ el.innerHTML = `<div style="font-size:1.3rem;font-weight:700;color:#1F3A5C;">Score : ${cm.bons} / 10</div><p class="hint">${cm.bons >= 8 ? 'Excellent !' : cm.bons >= 5 ? 'Bien, continue.' : 'Relis la procédure dans le cours, puis recommence.'}</p><button class="btn" onclick="c2CmType('${cm.t}')">Nouvelle série</button>`; return; }
  el.innerHTML = `<div class="hint" style="margin-bottom:6px;">Calcul ${cm.k + 1} / 10 · ${cm.bons} juste(s)</div>
  <div style="font-family:'Space Grotesk',sans-serif;font-size:1.6rem;font-weight:700;color:#1F3A5C;margin:6px 0;">${cm.q[0]} = <input id="c2cm-rep" inputmode="decimal" autocomplete="off" style="width:130px;font-size:1.35rem;padding:4px 8px;border:2px solid #2EA8C9;border-radius:8px;text-align:center;" onkeydown="if(event.key==='Enter')c2CmValider()"></div>
  <button class="btn" onclick="c2CmValider()">Valider</button><div style="min-height:24px;margin-top:8px;">${retour || ''}</div>`;
}
window.c2CmType = t => { cm = { t, k: 0, bons: 0, q: tirer(t) }; document.querySelectorAll('.c2cm-t').forEach(b => b.classList.toggle('secondary', b.dataset.t !== t)); afficher(); };
window.c2CmValider = () => {
  const i = document.getElementById('c2cm-rep'); if(!i || !cm) return;
  const v = parseFloat(i.value.replace(/\s/g, '').replace(',', '.')), ok = Math.abs(v - cm.q[1]) < 1e-9;
  if(ok) cm.bons++;
  const r = ok ? '<b style="color:#2E9C6A;">Juste !</b>' : `<b style="color:#E35D3A;">La réponse était ${sep(fmt(cm.q[1]))}.</b>`;
  cm.k++; cm.q = tirer(cm.t); afficher(r); const n = document.getElementById('c2cm-rep'); if(n) n.focus();
};
cm1Chapitre({
  niveau: 'cm2', titre: 'Procédures de calcul mental', slug: 'calcul-mental',
  cours: `
${cm1Lecon(1, 'Faits numériques à connaître')}
${cm1Regle(`Moitiés des nombres impairs :${cm1Liste(['la moitié de 7 est 3,5', 'la moitié de 9 est 4,5', 'la moitié de 15 est 7,5'])}Fractions usuelles :${cm1Liste([`${cm1Frac(1, 2)} = 0,5`, `${cm1Frac(1, 4)} = 0,25`, `${cm1Frac(3, 4)} = 0,75`, `${cm1Frac(1, 5)} = 0,2`, `${cm1Frac(1, 10)} = 0,1`, `${cm1Frac(1, 100)} = 0,01`])}Relations :${cm1Liste([`${cm1Frac(1, 2)} = ${cm1Frac(2, 4)} = ${cm1Frac(5, 10)}`, `${cm1Frac(1, 4)} = ${cm1Frac(25, 100)}`, 'deux quarts font un demi'])}`, 'À savoir par cœur')}

${cm1Lecon(2, 'Décimaux et numération')}
${cm1Exemple('Exemples :', ['4,6 + 3 = 7,6 : on ne change que les unités ;', '12,35 − 2 = 10,35 ;', '8,7 + 5 = 13,7 ;', '2,4 + 3,8 = 5 + 1,2 = 6,2 : les unités ensemble, les dixièmes ensemble ;', '3,25 × 100 = 325 : chaque chiffre glisse ;', '48 ÷ 1 000 = 0,048.'])}
${cmAnimGlisseDec('c2-cm-glisse', { presets: [{ nom: '3,25 × 100', n: '3,25', f: 100, op: '×' }, { nom: '48 ÷ 1 000', n: '48', f: 1000, op: '÷' }] })}

${cm1Lecon(3, 'Ajouter ou soustraire 9, 19, 99…')}
${cm1Regle(`On ajoute ou on soustrait la dizaine ou la centaine proche, puis on corrige :${cm1Liste(['+ 99, c\'est + 100 puis − 1', '− 19, c\'est − 20 puis + 1', '+ 28, c\'est + 30 puis − 2'])}`)}
${ce2AnimSauts('c2-cm-sauts', { presets: [{ nom: '456 + 99', depart: 456, sauts: [[100, '+ 100'], [-1, '− 1']], min: 440, max: 570, fin: '456 + 99 = <b>555</b>.' }, { nom: '732 − 19', depart: 732, sauts: [[-20, '− 20'], [1, '+ 1']], min: 705, max: 740, fin: '732 − 19 = <b>713</b>.' }] })}
${cm1Exemple('Exemples :', ['456 + 99 = 556 − 1 = <b>555</b>', '732 − 19 = 712 + 1 = <b>713</b>', '345 + 28 = 375 − 2 = <b>373</b>'])}

${cm1Lecon(4, 'Multiplier de grands « ronds »')}
${cm1Regle(`Pour 30 × 400, on multiplie les chiffres, puis on écrit tous les zéros :${cm1Liste(['3 × 4 = 12', '1 zéro et 2 zéros : 3 zéros', '30 × 400 = <b>12 000</b>'])}Attention : 50 × 400 = 20 000, car 5 × 4 = 20 a déjà un zéro.`)}

${cm1Lecon(5, 'Décomposer : la distributivité')}
${cm1Exemple('Exemples :', ['7 × 26 = 7 × 20 + 7 × 6 = 140 + 42 = <b>182</b>', '15 × 99 = 15 × 100 − 15 = <b>1 485</b>', '2,5 × 12 = 2,5 × 10 + 2,5 × 2 = 25 + 5 = <b>30</b>'])}

${cm1Lecon(6, 'Doubles, moitiés, × 5, × 50, ÷ 4, ÷ 8')}
${cm1Regle(cm1Liste(['le double de 3,6 est 7,2 ;', 'la moitié de 5,4 est 2,7 (la moitié de 5 est 2,5, la moitié de 0,4 est 0,2) ;', '<b>× 5</b> = × 10 puis la moitié : 4,6 × 5 → 46 → <b>23</b> ;', '<b>× 50</b> = × 100 puis la moitié : 1,8 × 50 → 180 → <b>90</b> ;', '<b>÷ 4</b> = la moitié de la moitié : 148 ÷ 4 → 74 → <b>37</b> ;', '<b>÷ 8</b> = trois fois la moitié : 200 ÷ 8 → 100 → 50 → <b>25</b>.']))}
`,
  methode: `
${cm1Demo('c2-cm-50', 'Multiplier un décimal par 50', 'Calcule 3,4 × 50.')}
${cm1Sous('A', 'Atelier : 10 calculs pour t\'entraîner')}
<div class="figure-wrap" style="text-align:center;"><div class="figure-toolbar" style="flex-wrap:wrap;margin-bottom:10px;">${Object.entries(TYPES).map(([k, [n]]) => `<button class="btn secondary c2cm-t" data-t="${k}" onclick="c2CmType('${k}')">${n}</button>`).join('')}</div><div id="c2cm-zone"></div></div>
`,
  demos: [
    ['c2-cm-50', [
      { expr: '50 = 100 ÷ 2', note: 'Multiplier par 50, c\'est multiplier par 100 puis prendre la moitié.' },
      { expr: '3,4 × 100 = 340', note: 'Chaque chiffre glisse de deux rangs vers la gauche.' },
      { expr: 'moitié de 340 = 170', note: 'Moitié de 300 = 150, moitié de 40 = 20.' },
      { expr: '3,4 × 50 = 170', note: 'Résultat.' },
    ]],
  ],
  exos: cm1Exos('c2cm', [
    [`Donne la moitié de chaque nombre.${cm1Liste(['13', '11', '7,4', '9,6'])}`,
      cm1Redac('Moitiés', { suite: ['6,5 + 6,5 = 13', '5,5 + 5,5 = 11', '3,7 + 3,7 = 7,4', '4,8 + 4,8 = 9,6'] }, 'Les moitiés sont 6,5 ; 5,5 ; 3,7 et 4,8.')],
    [`Écris ces fractions en écriture décimale.${cm1Liste([cm1Frac(3, 4), cm1Frac(1, 5), cm1Frac(3, 10), cm1Frac(7, 100), cm1Frac(5, 2)])}`,
      cm1Redac('Écritures décimales', { suite: [`${cm1Frac(3, 4)} = 0,75`, `${cm1Frac(1, 5)} = 0,2`, `${cm1Frac(3, 10)} = 0,3`, `${cm1Frac(7, 100)} = 0,07`, `${cm1Frac(5, 2)} = 2,5`] }, 'Ce sont des égalités à connaître par cœur.')],
    [`Calcule de tête.${cm1Liste(['578 + 99', '634 − 98', '257 + 19', '1 000 − 29'])}`,
      cm1Redac('578 + 99', ['578 + 100 − 1', '678 − 1', '677'], '578 + 99 donne 677.')
      + cm1Redac('634 − 98', { nom: 'B', lignes: ['634 − 100 + 2', '534 + 2', '536'] }, '634 − 98 donne 536.')
      + cm1Redac('257 + 19', { nom: 'C', lignes: ['257 + 20 − 1', '277 − 1', '276'] }, '257 + 19 donne 276.')
      + cm1Redac('1 000 − 29', { nom: 'D', lignes: ['1 000 − 30 + 1', '970 + 1', '971'] }, '1 000 − 29 donne 971.')],
    [`Calcule.${cm1Liste(['60 × 300', '400 × 500', '8 × 7 000', '90 × 90'])}`,
      cm1Redac('Produits de nombres « ronds »', { suite: ['6 × 3 = 18, et 3 zéros : 60 × 300 = 18 000', '4 × 5 = 20, et 4 zéros : 400 × 500 = 200 000', '8 × 7 = 56, et 3 zéros : 8 × 7 000 = 56 000', '9 × 9 = 81, et 2 zéros : 90 × 90 = 8 100'] }, 'On multiplie les chiffres, puis on écrit tous les zéros.')],
    [`Calcule.${cm1Liste(['6,2 × 5', '2,4 × 50', '96 ÷ 4', '320 ÷ 8'])}`,
      cm1Redac('6,2 × 5', '6,2 × 10 = 62, puis la moitié', '6,2 × 5 donne 31.') + cm1Redac('2,4 × 50', '2,4 × 100 = 240, puis la moitié', '2,4 × 50 donne 120.') + cm1Redac('96 ÷ 4', '96 → 48 → 24', '96 ÷ 4 donne 24.') + cm1Redac('320 ÷ 8', '320 → 160 → 80 → 40', '320 ÷ 8 donne 40.')],
    [`Calcule en décomposant.${cm1Liste(['8 × 45', '12 × 25', '3,5 × 4'])}`,
      cm1Redac('8 × 45', ['8 × 40 + 8 × 5', '320 + 40', '360'], '8 × 45 donne 360.')
      + cm1Redac('12 × 25', { nom: 'B', lignes: ['10 × 25 + 2 × 25', '250 + 50', '300'] }, '12 × 25 donne 300.')
      + cm1Redac('3,5 × 4', { nom: 'C', lignes: ['3 × 4 + 0,5 × 4', '12 + 2', '14'] }, '3,5 × 4 donne 14.')],
    [`Calcule.${cm1Liste(['3,7 + 4,5', '12,6 + 7', '5,8 − 3', '0,25 × 1 000'])}`,
      cm1Redac('Calculs avec des décimaux', { suite: ['3,7 + 4,5 = 7 + 1,2 = 8,2', '12,6 + 7 = 19,6', '5,8 − 3 = 2,8', '0,25 × 1 000 = 250'] }, 'Les résultats sont 8,2 ; 19,6 ; 2,8 et 250.')],
  ], { titre: 'Rédaction type : « Expliquer sa procédure »', lignes: [['672 − 99', 'J\'enlève 100…'], ['= 572 + 1 = 573', '… puis je rajoute 1, car j\'ai enlevé 1 de trop.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : Shakuntala Devi, l\'ordinateur humain', [
    'En 1980, à Londres, l\'Indienne <b>Shakuntala Devi</b> multiplie de tête deux nombres de 13 chiffres en 28 secondes ! Elle entre dans le Livre Guinness des records.',
    'Elle expliquait que tout le monde peut devenir bon en calcul mental en apprenant des astuces et en s\'entraînant chaque jour… comme avec l\'atelier de ce chapitre.',
  ]),
  quiz: [
    { q: 'Moitié de 15 ?', opts: ['7', '7,5', '8'], correct: 1 },
    { q: '40 × 300 = …', opts: ['1 200', '12 000', '120 000'], correct: 1 },
    { q: '2,6 × 50 = …', opts: ['13', '130', '1 300'], correct: 1 },
  ],
  init: () => { if(!cm) c2CmType('moities'); else afficher(); },
});
})();

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
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Moitiés des nombres impairs : moitié de 7 = 3,5 ; de 9 = 4,5 ; de 15 = 7,5.</li><li>Fractions usuelles : 1/2 = 0,5 · 1/4 = 0,25 · 3/4 = 0,75 · 1/5 = 0,2 · 1/10 = 0,1 · 1/100 = 0,01.</li><li>Relations : 1/2 = 2/4 = 5/10 ; 1/4 = 25/100 ; deux quarts font un demi.</li></ul>', 'À savoir par cœur')}

${cm1Lecon(2, 'Décimaux et numération')}
${cm1Exemple('Exemples :', ['4,6 + 3 = 7,6 · 12,35 − 2 = 10,35 (on ne change que les unités) ; 8,7 + 5 = 13,7.', '2,4 + 3,8 = 5 + 1,2 = 6,2 (les unités ensemble, les dixièmes ensemble).', '3,25 × 100 = 325 ; 48 ÷ 1 000 = 0,048 (chaque chiffre glisse).'])}

${cm1Lecon(3, 'Ajouter ou soustraire 9, 19, 99…')}
${cm1Regle('On ajoute ou on soustrait la dizaine ou la centaine proche, puis on corrige : + 99 = + 100 − 1 · − 19 = − 20 + 1 · + 28 = + 30 − 2.')}
${cm1Exemple('Exemples :', ['456 + 99 = 556 − 1 = <b>555</b>', '732 − 19 = 712 + 1 = <b>713</b>', '345 + 28 = 375 − 2 = <b>373</b>'])}

${cm1Lecon(4, 'Multiplier de grands « ronds »')}
${cm1Regle('30 × 400 : on multiplie les chiffres (3 × 4 = 12), puis on écrit tous les zéros (1 + 2 = 3 zéros) : <b>12 000</b>. Attention : 50 × 400 = 20 000 (5 × 4 = 20, déjà un zéro, plus 3 zéros).')}

${cm1Lecon(5, 'Décomposer : la distributivité')}
${cm1Exemple('Exemples :', ['7 × 26 = 7 × 20 + 7 × 6 = 140 + 42 = <b>182</b>', '15 × 99 = 15 × 100 − 15 = <b>1 485</b>', '2,5 × 12 = 2,5 × 10 + 2,5 × 2 = 25 + 5 = <b>30</b>'])}

${cm1Lecon(6, 'Doubles, moitiés, × 5, × 50, ÷ 4, ÷ 8')}
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Double de 3,6 = 7,2 ; moitié de 5,4 = 2,7 (moitié de 5 = 2,5 et moitié de 0,4 = 0,2).</li><li><b>× 5</b> = × 10 puis moitié : 4,6 × 5 → 46 → <b>23</b>.</li><li><b>× 50</b> = × 100 puis moitié : 1,8 × 50 → 180 → <b>90</b>.</li><li><b>÷ 4</b> = moitié de la moitié : 148 ÷ 4 → 74 → <b>37</b>. <b>÷ 8</b> = trois fois la moitié : 200 ÷ 8 → 100 → 50 → <b>25</b>.</li></ul>')}
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
    ['Moitié de : 13 · 11 · 7,4 · 9,6', '6,5 · 5,5 · 3,7 · 4,8'],
    ['Écris en écriture décimale : 3/4 · 1/5 · 3/10 · 7/100 · 5/2', '0,75 · 0,2 · 0,3 · 0,07 · 2,5'],
    ['Calcule : 578 + 99 · 634 − 98 · 257 + 19 · 1 000 − 29', '677 · 536 · 276 · 971'],
    ['Calcule : 60 × 300 · 400 × 500 · 8 × 7 000 · 90 × 90', '18 000 · 200 000 · 56 000 · 8 100'],
    ['Calcule : 6,2 × 5 · 2,4 × 50 · 96 ÷ 4 · 320 ÷ 8', '31 · 120 · 24 · 40'],
    ['Calcule en décomposant : 8 × 45 · 12 × 25 · 3,5 × 4', '360 · 300 · 14'],
    ['Calcule : 3,7 + 4,5 · 12,6 + 7 · 5,8 − 3 · 0,25 × 1 000', '8,2 · 19,6 · 2,8 · 250'],
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

/* ============================================================
   CHAPITRE : La division (CE2, N9, période 4)
   Programme du cycle 2 (CE2) : comprendre le sens de la division et utiliser le symbole « ÷ » ;
   la division est l'opération inverse de la multiplication (7 × 13 = 91, donc 91 ÷ 7 = 13 et
   91 ÷ 13 = 7) ; partage équitable : valeur d'une part (schéma en barre, tables) ou nombre de parts
   (champ numérique réduit). Pas de division posée au CE2.
   ============================================================ */
(() => {
// Barre partagée en n parts égales, avec le total au-dessus et « ? » dans une part.
function partage(n, total, part){
  const L = 420, w = L / n;
  let s = `<path d="M10 22 q0 -10 10 -10 H${L / 2 - 2} q8 0 8 -8 q0 8 8 8 H${L} q10 0 10 10" fill="none" stroke="#E35D3A" stroke-width="1.8"/><text x="${L / 2 + 10}" y="0" font-size="13" text-anchor="middle" fill="#E35D3A" font-weight="700">${total}</text>`;
  for(let i = 0; i < n; i++) s += `<rect x="${10 + i * w}" y="28" width="${w}" height="32" fill="#2EA8C9" fill-opacity="${i ? .2 : .5}" stroke="#1F3A5C" stroke-width="1.5"/>${i === 0 ? `<text x="${10 + w / 2}" y="49" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${part}</text>` : ''}`;
  return `<svg viewBox="0 -14 ${L + 20} 80" style="width:100%;max-width:${L + 20}px;display:block;margin:6px auto;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'La division', slug: 'division',
  cours: `
${cm1Lecon(1, 'Partager en parts égales')}
${cm1Regle('<b>Diviser</b>, c\'est <b>partager en parts égales</b>. « 12 ÷ 3 » se lit « 12 divisé par 3 » : c\'est la valeur d\'une part quand on partage 12 en 3 parts égales.')}
${cm1Exemple('La maîtresse a payé 72 € pour 6 dictionnaires identiques. Quel est le prix d\'un dictionnaire ?')}
${partage(6, '72 €', '?')}
<p class="hint" style="text-align:center;">On cherche le nombre qui, multiplié par 6, donne 72 : 6 × 12 = 72, donc 72 ÷ 6 = <b>12 €</b>.</p>

${cm1Lecon(2, 'Faire des groupes')}
${cm1Regle('On divise aussi pour savoir <b>combien de groupes</b> on peut faire. « Avec 20 œufs, combien de boîtes de 6 ? » : on cherche combien de fois 6 dans 20.')}
${cm1Exemple('20 œufs, des boîtes de 6 :', ['6, 12, 18 : on remplit <b>3 boîtes</b> (3 × 6 = 18) ;', 'il <b>reste</b> 2 œufs (20 − 18 = 2), pas assez pour une autre boîte.'])}

${cm1Lecon(3, 'Division et multiplication')}
${cm1Regle('La division est l\'opération <b>inverse</b> de la multiplication. Pour diviser, on utilise les <b>tables de multiplication</b>.')}
${cm1Exemple('Une multiplication donne deux divisions :', ['7 × 13 = 91, donc <b>91 ÷ 7 = 13</b> et <b>91 ÷ 13 = 7</b>.', '6 × 8 = 48, donc 48 ÷ 6 = 8 et 48 ÷ 8 = 6.'])}
${cm1Astuce('Pour calculer 35 ÷ 5, je cherche « 5 fois combien font 35 ? » : 5 × 7 = 35, donc 35 ÷ 5 = 7.')}
`,
  methode: `
${cm1Demo('ce2-dv-part', 'Trouver la valeur d\'une part', '4 amis se partagent 36 cartes à parts égales. Combien de cartes chacun reçoit-il ?')}
${cm1Demo('ce2-dv-groupes', 'Trouver le nombre de parts', 'On range 40 élèves par équipes de 5. Combien d\'équipes ?')}
`,
  demos: [
    ['ce2-dv-part', [
      { expr: partage(4, '36 cartes', '?'), note: '36 partagé en 4 parts égales.' },
      { expr: '4 × ? = 36 → 4 × 9 = 36', note: 'Je cherche dans la table de 4.' },
      { expr: '36 ÷ 4 = 9 : chacun reçoit 9 cartes.', note: 'Vérification : 9 + 9 + 9 + 9 = 36 ✔' },
    ]],
    ['ce2-dv-groupes', [
      { expr: 'Combien de fois 5 dans 40 ?', note: '' },
      { expr: '5 × 8 = 40', note: 'Table de 5.' },
      { expr: '40 ÷ 5 = 8 : il y a 8 équipes.', note: '' },
    ]],
  ],
  exos: cm1Exos('ce2-dv', [
    ['Calcule : 24 ÷ 6 · 45 ÷ 9 · 56 ÷ 7 · 30 ÷ 3.', '4 · 5 · 8 · 10.'],
    ['On sait que 8 × 12 = 96. Complète : 96 ÷ 8 = … et 96 ÷ 12 = … .', '12 · 8.'],
    ['5 enfants se partagent 50 € à parts égales. Combien chacun reçoit-il ?', '50 ÷ 5 = 10 €.'],
    ['Avec 27 fleurs, combien de bouquets de 3 fleurs peut-on faire ?', '27 ÷ 3 = 9 bouquets.'],
    ['On range 17 crayons par paquets de 5. Combien de paquets complets ? Combien en reste-t-il ?', '3 paquets (15 crayons), il en reste 2.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : le signe ÷', [
    'Le signe <b>÷</b>, un trait entre deux points, a été utilisé par le Suisse <b>Johann Rahn</b> en <b>1659</b>. Il fait penser à une fraction : un nombre en haut, un nombre en bas. Plus tard, au collège, on écrira souvent les divisions avec une barre de fraction.',
  ]),
  quiz: [
    { q: '20 ÷ 4 = …', opts: ['5', '16', '80'], correct: 0 },
    { q: '6 × 7 = 42, donc 42 ÷ 7 = …', opts: ['6', '7', '35'], correct: 0 },
    { q: '3 enfants se partagent 18 bonbons. Chacun en a…', opts: ['15', '6', '21'], correct: 1 },
  ],
  flash: [
    { q: '35 ÷ 5 = …', r: ['5', '6', '7', '8'], ok: 2 },
    { q: '48 ÷ 6 = …', r: ['6', '7', '8', '9'], ok: 2 },
    { q: '7 × 13 = 91, donc 91 ÷ 13 = …', r: ['7', '13', '78', '104'], ok: 0 },
    { q: '4 amis se partagent 20 €. Chacun reçoit…', r: ['4 €', '5 €', '16 €', '24 €'], ok: 1 },
    { q: 'Avec 30 œufs, combien de boîtes de 6 ?', r: ['4', '5', '6', '24'], ok: 1 },
    { q: '100 ÷ 10 = …', r: ['1', '10', '90', '1 000'], ok: 1 },
  ],
});
})();

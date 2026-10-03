/* ============================================================
   CHAPITRE : L'heure et les durées (CE2, M3, période 3)
   Programme du cycle 2 (CE2) : lire l'heure sur un cadran à aiguilles ou un affichage digital
   (huit heures et demie, sept heures moins le quart, quatre heures moins vingt, 15 h 42…) ;
   placer les aiguilles ; 1 h = 60 min ; durée entre deux instants d'une même journée ;
   problèmes à une ou deux étapes, avec un axe du temps. Seulement heures et minutes.
   ============================================================ */
(() => {
// Horloge à aiguilles : h (0-23) et m.
function horloge(h, m, taille){
  const R = 60, C = 70; let s = `<circle cx="${C}" cy="${C}" r="${R}" fill="#fff" stroke="#1F3A5C" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, g = i % 5 === 0, r1 = g ? R - 9 : R - 4; s += `<line x1="${C + r1 * Math.sin(a)}" y1="${C - r1 * Math.cos(a)}" x2="${C + R * Math.sin(a)}" y2="${C - R * Math.cos(a)}" stroke="#1F3A5C" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += `<text x="${C + (R - 20) * Math.sin(a)}" y="${C - (R - 20) * Math.cos(a) + 5}" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700" font-family="Space Grotesk">${i}</text>`; }
  const ah = ((h % 12) + m / 60) * Math.PI / 6, am = m * Math.PI / 30;
  s += `<line x1="${C}" y1="${C}" x2="${C + 32 * Math.sin(ah)}" y2="${C - 32 * Math.cos(ah)}" stroke="#E35D3A" stroke-width="5" stroke-linecap="round"/>`;
  s += `<line x1="${C}" y1="${C}" x2="${C + 50 * Math.sin(am)}" y2="${C - 50 * Math.cos(am)}" stroke="#1F3A5C" stroke-width="3" stroke-linecap="round"/><circle cx="${C}" cy="${C}" r="4" fill="#1F3A5C"/>`;
  return `<svg viewBox="0 0 140 140" style="width:${taille || 120}px;display:inline-block;vertical-align:middle;">${s}</svg>`;
}
const cadre = (h, m, t) => `<div style="display:inline-block;text-align:center;margin:4px 10px;">${horloge(h, m)}<div class="hint" style="margin:0;">${t}</div></div>`;
cm1Chapitre({
  niveau: 'ce2', titre: 'L\'heure et les durées', slug: 'heure-durees',
  cours: `
${cm1Lecon(1, 'Lire l\'heure')}
${cm1Regle('La <b>petite aiguille</b> (rouge) montre les <b>heures</b>. La <b>grande aiguille</b> montre les <b>minutes</b> : quand elle fait un tour complet, il s\'écoule <b>1 heure = 60 minutes</b>. Entre deux nombres du cadran, il y a 5 minutes.')}
<div class="figure-wrap" style="text-align:center;">${cadre(8, 30, 'huit heures et demie<br><b>8 h 30</b>')}${cadre(6, 45, 'sept heures moins le quart<br><b>6 h 45</b>')}${cadre(3, 40, 'quatre heures moins vingt<br><b>3 h 40</b>')}${cadre(10, 35, 'dix heures trente-cinq<br><b>10 h 35</b>')}</div>
${cm1Rem('Une journée dure <b>24 heures</b>. L\'après-midi, on peut dire « 3 heures » ou « 15 heures » : 15 h, c\'est 12 h + 3 h. Midi, c\'est 12 h ; minuit, c\'est 0 h.')}

${cm1Lecon(2, 'Les heures et les minutes')}
${cm1Regle(cm1Liste(['<b>1 h = 60 min</b>', 'une demi-heure = <b>30 min</b>', 'un quart d\'heure = <b>15 min</b>', 'trois quarts d\'heure = <b>45 min</b>']))}
${ce2AnimHorloge('ce2-hd-quart', { legende: 'La grande aiguille fait un quart de tour, un demi-tour, un tour…', presets: [
  { nom: 'Un quart d\'heure', de: [9, 0], a: [9, 15], fin: 'Un quart de tour de la grande aiguille : <b>un quart d\'heure = 15 minutes</b>.' },
  { nom: 'Une demi-heure', de: [9, 0], a: [9, 30], fin: 'Un demi-tour de la grande aiguille : <b>une demi-heure = 30 minutes</b>.' },
  { nom: 'Une heure', de: [9, 0], a: [10, 0], fin: 'Un tour complet de la grande aiguille : <b>1 heure = 60 minutes</b>. La petite aiguille passe de 9 à 10.' }] })}
${cm1Exemple('Combien de minutes dans 2 h 20 min ?')}
${cm1Redac('Minutes dans 2 h 20 min', ['60 min + 60 min + 20 min', '140 min'], 'Il y a 140 minutes dans 2 h 20 min.')}

${cm1Lecon(3, 'Calculer une durée')}
${cm1Regle('Pour trouver la durée entre deux heures, on <b>avance</b> de l\'heure de départ à l\'heure d\'arrivée, par <b>bonds</b>, en passant par l\'heure « juste » (sans minutes).')}
${ce2AnimHorloge('ce2-hd-duree', { presets: [
  { nom: 'De 15 h 40 à 16 h 05', de: [15, 40], a: [16, 5] },
  { nom: 'De 8 h 30 à 8 h 50', de: [8, 30], a: [8, 50] },
  { nom: 'De 8 h 30 à 12 h 30', de: [8, 30], a: [12, 30] }] })}
${ce2AnimSauts('ce2-hd-sauts', { legende: 'Sur l\'axe du temps : un bond jusqu\'à l\'heure juste, puis le reste.', presets: [
  { nom: 'De 15 h 40 à 16 h 05', depart: 15 * 60 + 40, sauts: [[20, '+ 20 min'], [5, '+ 5 min']], min: 15 * 60 + 35, max: 16 * 60 + 10, fmt: ce2Heure, fin: '20 min + 5 min = <b>25 min</b>.' },
  { nom: 'Le train de 7 h 10', depart: 7 * 60 + 10, sauts: [[60, '+ 1 h'], [30, '+ 30 min', 'Il arrive à la première gare à 8 h 40.'], [20, '+ 20 min'], [20, '+ 20 min']], min: 7 * 60, max: 9 * 60 + 30, fmt: ce2Heure, fin: 'Il arrive à la deuxième gare à <b>9 h 20</b>.' }] })}
`,
  methode: `
${cm1Demo('ce2-hd-arrivee', 'Trouver une heure d\'arrivée', 'Un train part à 7 h 10. Il roule 1 h 30 min jusqu\'à la première gare, puis 40 min jusqu\'à la deuxième gare. À quelle heure arrive-t-il à la deuxième gare ?')}
${cm1Demo('ce2-hd-depart', 'Trouver une heure de départ', 'Lucie est sortie pendant 4 heures. Elle est rentrée à 12 h 30. À quelle heure est-elle partie ?')}
`,
  demos: [
    ['ce2-hd-arrivee', [
      { expr: '7 h 10 + 1 h = 8 h 10', note: 'D\'abord l\'heure entière.' },
      { expr: '8 h 10 + 30 min = 8 h 40', note: 'Il arrive à la première gare à 8 h 40.' },
      { expr: '8 h 40 + 20 min = 9 h', note: '40 min, c\'est 20 min pour arriver à 9 h…' },
      { expr: '9 h + 20 min = 9 h 20', note: '… puis encore 20 min.' },
      { expr: 'Le train arrive à la deuxième gare à 9 h 20.', note: '' },
    ]],
    ['ce2-hd-depart', [
      { expr: 'On recule de 4 heures à partir de 12 h 30.', note: 'On connaît l\'arrivée et la durée : on revient en arrière.' },
      { expr: '12 h 30 − 4 h = 8 h 30', note: 'Les minutes ne changent pas.' },
      { expr: 'Lucie est partie à 8 h 30.', note: 'On vérifie : de 8 h 30 à 12 h 30, il y a bien 4 h ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-hd', [
    [`Écris ces heures en chiffres.${cm1Liste(['neuf heures et quart', 'deux heures moins le quart', 'midi et demi'])}`,
      cm1Redac('Neuf heures et quart', '9 h + 15 min', 'On écrit 9 h 15.')
      + cm1Redac('Deux heures moins le quart', '2 h − 15 min', 'On écrit 1 h 45.')
      + cm1Redac('Midi et demi', '12 h + 30 min', 'On écrit 12 h 30.')],
    ['La séance de piscine a lieu à 4 h de l\'après-midi. Quelle heure est-ce sur 24 heures ? Et 9 h du soir ?',
      cm1Redac('4 h de l\'après-midi', '12 h + 4 h = 16 h', 'La séance a lieu à 16 h.') + cm1Redac('9 h du soir', '12 h + 9 h = 21 h', '9 h du soir, c\'est 21 h.')],
    ['Un film dure 1 h 15 min. Combien de minutes cela fait-il ?',
      cm1Redac('Durée du film en minutes', ['60 min + 15 min', '75 min'], 'Le film dure 75 minutes.')],
    ['Le cours de judo dure de 8 h 30 à 8 h 50. La récréation dure de 15 h 40 à 16 h 05. Lequel dure le plus longtemps ?',
      cm1Redac('Durée du judo', '8 h 30 → 8 h 50 : 20 min', 'Le judo dure 20 minutes.')
      + cm1Redac('Durée de la récréation', { suite: ['15 h 40 → 16 h : 20 min', '16 h → 16 h 05 : 5 min'] }, 'La récréation dure 25 minutes : c\'est elle qui dure le plus longtemps.')],
    ['Le film commence à 14 h 45 et dure 1 h 30. À quelle heure finit-il ?',
      cm1Redac('Heure de fin du film', { suite: ['14 h 45 + 1 h = 15 h 45', '15 h 45 + 15 min = 16 h', '16 h + 15 min = 16 h 15'] }, 'Le film finit à 16 h 15.')],
    ['La récréation commence à 10 h 15 et finit à 10 h 30. Combien de temps dure-t-elle ?',
      cm1Redac('Durée de la récréation', '10 h 15 → 10 h 30 : 15 min', 'La récréation dure 15 minutes, un quart d\'heure.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi 60 minutes ?', [
    'Nos heures de <b>60 minutes</b> viennent des <b>Babyloniens</b>, qui comptaient par 60 il y a plus de 4 000 ans. Avant les horloges, on lisait l\'heure avec l\'ombre d\'un bâton sur un <b>cadran solaire</b>, ou avec une <b>clepsydre</b>, une horloge à eau.',
  ]),
  quiz: [
    { q: '1 heure = …', opts: ['100 minutes', '60 minutes', '30 minutes'], correct: 1 },
    { q: 'Un quart d\'heure, c\'est…', opts: ['15 minutes', '25 minutes', '45 minutes'], correct: 0 },
    { q: 'De 9 h 40 à 10 h 10, il s\'écoule…', opts: ['30 minutes', '70 minutes', '1 heure'], correct: 0 },
  ],
  flash: [
    { l: 2, q: 'Une demi-heure, c\'est…', r: ['15 min', '30 min', '50 min', '60 min'], ok: 1 },
    { l: 1, q: '3 heures de l\'après-midi, c\'est…', r: ['13 h', '15 h', '16 h', '3 h'], ok: 1 },
    { l: 2, q: 'Combien de minutes dans 2 h ?', r: ['100', '120', '200', '60'], ok: 1 },
    { l: 3, q: 'De 8 h 30 à 8 h 50, il s\'écoule…', r: ['20 min', '30 min', '50 min', '80 min'], ok: 0 },
    { l: 1, q: 'Sept heures moins le quart, c\'est…', r: ['7 h 15', '6 h 45', '7 h 45', '6 h 15'], ok: 1 },
    { l: 3, q: 'Le film commence à 14 h et dure 1 h 30. Il finit à…', r: ['15 h', '15 h 30', '15 h 50', '16 h 30'], ok: 1 },
    { l: 1, q: "La grande aiguille est sur le 6 : il est … minutes.", r: ["6", "30", "15", "60"], ok: 1 },
    { l: 3, q: "De 10 h à 11 h 15, il s'écoule…", r: ["15 min", "1 h 15 min", "75 h", "1 h 50 min"], ok: 1 },
  ],
});
})();

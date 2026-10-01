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
// Axe du temps : sauts = [[début en minutes, fin en minutes, texte]].
function axe(debut, fin, reperes, sauts){
  const W = 520, X = v => 30 + (v - debut) / (fin - debut) * (W - 60);
  let s = `<line x1="20" y1="70" x2="${W - 10}" y2="70" stroke="#1F3A5C" stroke-width="2"/><polygon points="${W - 10},70 ${W - 18},65 ${W - 18},75" fill="#1F3A5C"/>`;
  reperes.forEach(v => { s += `<line x1="${X(v)}" y1="62" x2="${X(v)}" y2="78" stroke="#1F3A5C" stroke-width="2"/><text x="${X(v)}" y="96" font-size="13" text-anchor="middle" fill="#1F3A5C" font-weight="700">${Math.floor(v / 60)} h ${String(v % 60).padStart(2, '0')}</text>`; });
  sauts.forEach(([a, b, t]) => { const xa = X(a), xb = X(b); s += `<path d="M${xa} 60 Q${(xa + xb) / 2} ${20} ${xb} 60" fill="none" stroke="#E35D3A" stroke-width="2"/><polygon points="${xb},60 ${xb - 7},52 ${xb + 2},50" fill="#E35D3A"/><text x="${(xa + xb) / 2}" y="30" font-size="13" text-anchor="middle" fill="#E35D3A" font-weight="700">${t}</text>`; });
  return `<svg viewBox="0 0 ${W} 104" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${s}</svg>`;
}
cm1Chapitre({
  niveau: 'ce2', titre: 'L\'heure et les durées', slug: 'heure-durees',
  cours: `
${cm1Lecon(1, 'Lire l\'heure')}
${cm1Regle('La <b>petite aiguille</b> (rouge) montre les <b>heures</b>. La <b>grande aiguille</b> montre les <b>minutes</b> : quand elle fait un tour complet, il s\'écoule <b>1 heure = 60 minutes</b>. Entre deux nombres du cadran, il y a 5 minutes.')}
<div class="figure-wrap" style="text-align:center;">${cadre(8, 30, 'huit heures et demie<br><b>8 h 30</b>')}${cadre(6, 45, 'sept heures moins le quart<br><b>6 h 45</b>')}${cadre(3, 40, 'quatre heures moins vingt<br><b>3 h 40</b>')}${cadre(10, 35, 'dix heures trente-cinq<br><b>10 h 35</b>')}</div>
${cm1Rem('Une journée dure <b>24 heures</b>. L\'après-midi, on peut dire « 3 heures » ou « 15 heures » : 15 h, c\'est 12 h + 3 h. Midi, c\'est 12 h ; minuit, c\'est 0 h.')}

${cm1Lecon(2, 'Les heures et les minutes')}
${cm1Regle('<b>1 h = 60 min</b> · une demi-heure = <b>30 min</b> · un quart d\'heure = <b>15 min</b> · trois quarts d\'heure = <b>45 min</b>.')}
${cm1Exemple('Combien de minutes dans 2 h 20 min ?', ['2 h = 60 min + 60 min = 120 min', '2 h 20 min = 120 min + 20 min = <b>140 min</b>'])}

${cm1Lecon(3, 'Calculer une durée')}
${cm1Regle('Pour trouver la durée entre deux heures, on <b>avance</b> de l\'heure de départ à l\'heure d\'arrivée, par <b>bonds</b>, en passant par l\'heure « juste » (sans minutes).')}
${cm1Exemple('De 15 h 40 à 16 h 05 :')}
${axe(15 * 60 + 35, 16 * 60 + 10, [15 * 60 + 40, 16 * 60, 16 * 60 + 5], [[15 * 60 + 40, 16 * 60, '+ 20 min'], [16 * 60, 16 * 60 + 5, '+ 5 min']])}
<p class="hint" style="text-align:center;">20 min + 5 min = <b>25 minutes</b>.</p>
`,
  methode: `
${cm1Demo('ce2-hd-arrivee', 'Trouver une heure d\'arrivée', 'Un train part à 7 h 10. Il roule 1 h 30 min jusqu\'à la première gare, puis 40 min jusqu\'à la deuxième gare. À quelle heure arrive-t-il à la deuxième gare ?')}
${cm1Demo('ce2-hd-depart', 'Trouver une heure de départ', 'Lucie est sortie pendant 4 heures. Elle est rentrée à 12 h 30. À quelle heure est-elle partie ?')}
`,
  demos: [
    ['ce2-hd-arrivee', [
      { expr: '7 h 10 + 1 h = 8 h 10, puis + 30 min = 8 h 40', note: 'Il arrive à la première gare à 8 h 40.' },
      { expr: axe(8 * 60 + 30, 9 * 60 + 30, [8 * 60 + 40, 9 * 60, 9 * 60 + 20], [[8 * 60 + 40, 9 * 60, '+ 20 min'], [9 * 60, 9 * 60 + 20, '+ 20 min']]), note: '40 min = 20 min pour arriver à 9 h, puis encore 20 min.' },
      { expr: 'Il arrive à la deuxième gare à 9 h 20.', note: '' },
    ]],
    ['ce2-hd-depart', [
      { expr: 'On recule de 4 heures à partir de 12 h 30.', note: 'On connaît l\'arrivée et la durée : on revient en arrière.' },
      { expr: '12 h 30 − 4 h = 8 h 30', note: 'Les minutes ne changent pas.' },
      { expr: 'Lucie est partie à 8 h 30.', note: 'On vérifie : de 8 h 30 à 12 h 30, il y a bien 4 h ✔' },
    ]],
  ],
  exos: cm1Exos('ce2-hd', [
    ['Écris en chiffres : neuf heures et quart · deux heures moins le quart · midi et demi.', '9 h 15 · 1 h 45 · 12 h 30.'],
    ['L\'après-midi, 4 h, c\'est quelle heure sur 24 heures ? et 9 h du soir ?', '16 h · 21 h.'],
    ['Combien de minutes dans 1 h 15 min ? dans 3 h ?', '75 min · 180 min.'],
    ['Quelle durée entre 8 h 30 et 8 h 50 ? entre 15 h 40 et 16 h 05 ? Laquelle est la plus longue ?', '20 min · 25 min : la deuxième est la plus longue.'],
    ['Le film commence à 14 h 45 et dure 1 h 30. À quelle heure finit-il ?', '14 h 45 + 1 h = 15 h 45 ; + 30 min = 16 h 15.'],
    ['La récréation commence à 10 h 15 et finit à 10 h 30. Combien de temps dure-t-elle ?', '15 minutes, un quart d\'heure.'],
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
    { q: 'Une demi-heure, c\'est…', r: ['15 min', '30 min', '50 min', '60 min'], ok: 1 },
    { q: '3 heures de l\'après-midi, c\'est…', r: ['13 h', '15 h', '16 h', '3 h'], ok: 1 },
    { q: 'Combien de minutes dans 2 h ?', r: ['100', '120', '200', '60'], ok: 1 },
    { q: 'De 8 h 30 à 8 h 50, il s\'écoule…', r: ['20 min', '30 min', '50 min', '80 min'], ok: 0 },
    { q: 'Sept heures moins le quart, c\'est…', r: ['7 h 15', '6 h 45', '7 h 45', '6 h 15'], ok: 1 },
    { q: 'Le film commence à 14 h et dure 1 h 30. Il finit à…', r: ['15 h', '15 h 30', '15 h 50', '16 h 30'], ok: 1 },
  ],
});
})();

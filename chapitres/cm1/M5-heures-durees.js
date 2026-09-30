/* ============================================================
   CHAPITRE : Heures et durées (CM1, M5, période 5)
   Programme du cycle 3 (CM1) : lire l'heure sur une horloge à aiguilles et sur un affichage
   numérique ; distinguer instant (heure) et durée ; unités (s, min, h, jour, semaine, mois,
   année, siècle) et relations (1 h = 60 min, 1 min = 60 s, 1 jour = 24 h…) ; calculer une durée,
   une heure de fin ou de début, en s'aidant d'une frise (bond jusqu'à l'heure pile). Pas de
   tableau de conversion. Atelier : lire l'heure sur une horloge tirée au hasard.
   ============================================================ */
(() => {
function horloge(h, m, taille){
  const t = taille || 150, cx = 60, cy = 60; let s = `<svg viewBox="0 0 120 120" style="width:${t}px;display:inline-block;vertical-align:middle;"><circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="#1F3A5C" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, g = i % 5 === 0, r1 = g ? 47 : 51; s += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + 54 * Math.sin(a)).toFixed(1)}" y2="${(cy - 54 * Math.cos(a)).toFixed(1)}" stroke="#1F3A5C" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += `<text x="${(cx + 38 * Math.sin(a)).toFixed(1)}" y="${(cy - 38 * Math.cos(a) + 4).toFixed(1)}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
  const am = m * Math.PI / 30, ah = ((h % 12) + m / 60) * Math.PI / 6;
  s += `<line x1="60" y1="60" x2="${(cx + 26 * Math.sin(ah)).toFixed(1)}" y2="${(cy - 26 * Math.cos(ah)).toFixed(1)}" stroke="#E35D3A" stroke-width="5" stroke-linecap="round"/>`;
  s += `<line x1="60" y1="60" x2="${(cx + 44 * Math.sin(am)).toFixed(1)}" y2="${(cy - 44 * Math.cos(am)).toFixed(1)}" stroke="#2EA8C9" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="3.5" fill="#1F3A5C"/>`;
  return s + '</svg>';
}
// Frise de durée : de (h1,m1) à (h2,m2) avec bonds.
function frise(bonds){
  const W = 120 + bonds.length * 150; let s = `<svg viewBox="0 0 ${W} 92" style="width:100%;max-width:${W}px;display:block;margin:6px auto;"><line x1="20" y1="60" x2="${W - 20}" y2="60" stroke="#1F3A5C" stroke-width="2"/>`;
  let x = 60;
  bonds.forEach(([de, a, lab], i) => {
    const x2 = x + 150; if(i === 0) s += `<line x1="${x}" y1="52" x2="${x}" y2="68" stroke="#1F3A5C" stroke-width="2"/><text x="${x}" y="84" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${de}</text>`;
    s += `<line x1="${x2}" y1="52" x2="${x2}" y2="68" stroke="#1F3A5C" stroke-width="2"/><text x="${x2}" y="84" font-size="13" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${a}</text>`;
    s += `<path d="M${x + 4} 52 Q${(x + x2) / 2} 10 ${x2 - 4} 52" fill="none" stroke="#E35D3A" stroke-width="2"/><polygon points="${x2 - 4},52 ${x2 - 12},44 ${x2 - 2},42" fill="#E35D3A"/><text x="${(x + x2) / 2}" y="26" font-size="13" text-anchor="middle" fill="#E35D3A" font-family="Space Grotesk" font-weight="700">${lab}</text>`;
    x = x2; });
  return s + '</svg>';
}
const hh = (h, m) => `${h} h ${String(m).padStart(2, '0')}`;
let hr = null;
function hrNouvelle(){ hr = { h: 1 + Math.floor(Math.random() * 12), m: 5 * Math.floor(Math.random() * 12) }; const el = document.getElementById('hr-fig'); if(el) el.innerHTML = horloge(hr.h, hr.m, 170); const r = document.getElementById('hr-rep'); if(r) r.innerHTML = ''; ['hr-h', 'hr-m'].forEach(i => { const x = document.getElementById(i); if(x) x.value = ''; }); }
window.cm1HrNouvelle = hrNouvelle;
window.cm1HrValider = () => {
  const h = parseInt(document.getElementById('hr-h').value, 10), m = parseInt(document.getElementById('hr-m').value, 10), r = document.getElementById('hr-rep');
  const ok = (h === hr.h || h === hr.h + 12 || (hr.h === 12 && h === 0)) && m === hr.m;
  r.innerHTML = ok ? `<b style="color:#2E9C6A;">Bravo ! Il est ${hh(hr.h, hr.m)} (ou ${hh(hr.h === 12 ? 0 : hr.h + 12, hr.m)} l'après-midi).</b>` : `<b style="color:#E35D3A;">Non : la petite aiguille (rouge) montre les heures, la grande (bleue) les minutes. Il est ${hh(hr.h, hr.m)}.</b>`;
};
cm1Chapitre({
  titre: 'Heures et durées', slug: 'heures-durees',
  cours: `
${cm1Lecon(1, 'Lire l\'heure')}
<div class="figure-wrap" style="display:flex;gap:26px;align-items:center;justify-content:center;flex-wrap:wrap;">${horloge(3, 40)}<div style="font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:700;background:#1F3A5C;color:#7FE3B0;padding:8px 16px;border-radius:10px;">15:40</div></div>
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>La <b style="color:#E35D3A;">petite aiguille</b> indique les <b>heures</b> : ici elle a dépassé le 3.</li><li>La <b style="color:#2EA8C9;">grande aiguille</b> indique les <b>minutes</b> : chaque chiffre vaut 5 minutes. Sur le 8 : 8 × 5 = 40 minutes.</li><li>Il est <b>3 h 40</b> le matin, ou <b>15 h 40</b> l\'après-midi.</li></ul>')}
${cm1Rem('Une journée dure 24 heures, mais la petite aiguille ne fait que 12 heures : elle fait <b>deux tours</b> par jour. L\'après-midi, on ajoute 12 : 3 h de l\'après-midi = 15 h. On dit aussi « 4 h moins 20 » pour 3 h 40.')}

${cm1Lecon(2, 'Unités de durée')}
${cm1Regle('1 minute (min) = 60 secondes (s) &nbsp;·&nbsp; 1 heure (h) = 60 min &nbsp;·&nbsp; 1 jour = 24 h<br>1 semaine = 7 jours &nbsp;·&nbsp; 1 année = 12 mois = 365 jours (366 les années bissextiles) &nbsp;·&nbsp; 1 siècle = 100 ans', 'À retenir')}
${cm1Exemple('Convertir en raisonnant :', ['2 h = 2 × 60 min = <b>120 min</b>.', '1 h 15 min = 60 min + 15 min = <b>75 min</b>.', '90 min = 60 min + 30 min = <b>1 h 30 min</b>.', '3 min = 3 × 60 s = <b>180 s</b>.'])}
${cm1Astuce('Attention : 1 h 30 min n\'est pas 1,30 h ! Une heure a 60 minutes, pas 100.')}

${cm1Lecon(3, 'Instant et durée')}
${cm1Def('Un <b>instant</b> (ou horaire) dit <b>quand</b> quelque chose se passe : « le film commence à 14 h 30 ».<br>Une <b>durée</b> dit <b>combien de temps</b> cela dure : « le film dure 1 h 45 min ».')}

${cm1Lecon(4, 'Calculer une durée avec une frise')}
${cm1Regle('Pour calculer une durée, on fait des <b>bonds</b> sur une frise : d\'abord jusqu\'à l\'<b>heure pile</b>, puis les heures entières, puis les minutes restantes.')}
${cm1Exemple('Un film commence à 14 h 35 et finit à 16 h 20. Combien de temps dure-t-il ?')}
${frise([['14 h 35', '15 h', '25 min'], ['15 h', '16 h', '1 h'], ['16 h', '16 h 20', '20 min']])}
<ul class="example-list"><li>25 min + 1 h + 20 min = 1 h 45 min. Le film dure <b>1 h 45 min</b>.</li></ul>
`,
  methode: `
${cm1Demo('hd-fin', 'Calculer une heure de fin', 'Le train part à 9 h 50. Le trajet dure 2 h 25 min. À quelle heure arrive-t-il ?')}
${cm1Demo('hd-debut', 'Calculer une heure de début', 'La récréation finit à 10 h 15. Elle a duré 20 min. À quelle heure a-t-elle commencé ?')}
${cm1Sous('A', 'Atelier : lis l\'heure')}
<div class="figure-wrap" style="text-align:center;"><div id="hr-fig"></div>
<div style="margin:8px 0;font-size:1.1rem;">Il est <input id="hr-h" inputmode="numeric" style="width:54px;font-size:1.1rem;text-align:center;padding:3px;border:2px solid #E35D3A;border-radius:6px;"> h <input id="hr-m" inputmode="numeric" style="width:54px;font-size:1.1rem;text-align:center;padding:3px;border:2px solid #2EA8C9;border-radius:6px;" onkeydown="if(event.key==='Enter')cm1HrValider()"> min</div>
<div class="figure-toolbar"><button class="btn" onclick="cm1HrValider()">Valider</button><button class="btn secondary" onclick="cm1HrNouvelle()">Autre horloge</button></div><p id="hr-rep" style="min-height:22px;"></p></div>
`,
  demos: [
    ['hd-fin', [
      { expr: '9 h 50 + 2 h = 11 h 50', note: 'On ajoute d\'abord les heures entières.' },
      { expr: '11 h 50 + 10 min = 12 h', note: 'On fait un bond jusqu\'à l\'heure pile : il faut 10 min. Il reste 25 − 10 = 15 min à ajouter.' },
      { expr: '12 h + 15 min = 12 h 15', note: 'On ajoute les minutes restantes.' },
      { expr: 'Le train arrive à 12 h 15.', note: 'Vérification avec une frise : 10 min + 2 h + 15 min = 2 h 25 min. ✔' },
    ]],
    ['hd-debut', [
      { expr: '10 h 15 − 15 min = 10 h', note: 'On recule jusqu\'à l\'heure pile : 15 min. Il reste 20 − 15 = 5 min à reculer.' },
      { expr: '10 h − 5 min = 9 h 55', note: 'On recule encore de 5 min.' },
      { expr: 'La récréation a commencé à 9 h 55.', note: 'Vérification : de 9 h 55 à 10 h 15, il y a 5 min + 15 min = 20 min. ✔' },
    ]],
  ],
  exos: cm1Exos('hd', [
    [`Quelle heure est-il (le matin) ?<div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0;">${[[7, 15], [10, 45], [2, 5], [11, 30]].map(([h, m], i) => `<div style="text-align:center;">${horloge(h, m, 100)}<div>${'abcd'[i]})</div></div>`).join('')}</div>`, 'a) 7 h 15 · b) 10 h 45 (11 h moins le quart) · c) 2 h 05 · d) 11 h 30.'],
    ['Écris l\'heure de l\'après-midi : 3 h 20 · 6 h 45 · 11 h 10.', '15 h 20 · 18 h 45 · 23 h 10.'],
    ['Complète : 3 h = … min &nbsp;·&nbsp; 2 min = … s &nbsp;·&nbsp; 2 jours = … h &nbsp;·&nbsp; 3 semaines = … jours', '180 min · 120 s · 48 h · 21 jours.'],
    ['Convertis en heures et minutes : 80 min · 150 min · 65 min.', '1 h 20 min · 2 h 30 min · 1 h 05 min.'],
    ['Instant ou durée ? « La cantine ouvre à 11 h 45 » · « Le match dure 90 minutes » · « Je dors 10 heures ».', 'instant · durée · durée.'],
    ['Un dessin animé commence à 17 h 40 et finit à 19 h 05. Quelle est sa durée ?', '17 h 40 → 18 h : 20 min ; 18 h → 19 h : 1 h ; 19 h → 19 h 05 : 5 min. Durée : 1 h 25 min.'],
    ['Un gâteau doit cuire 45 minutes. Il est enfourné à 15 h 30. À quelle heure faut-il le sortir ?', '15 h 30 + 30 min = 16 h ; + 15 min = 16 h 15.'],
    ['En quel siècle sommes-nous ? En quel siècle a eu lieu la Révolution française (1789) ?', 'Au XXI<sup>e</sup> siècle (années 2001 à 2100). 1789 est au XVIII<sup>e</sup> siècle.'],
  ], { titre: 'Rédaction type : « Calculer une durée »', lignes: [['8 h 40 → 9 h : 20 min', 'Je fais un bond jusqu\'à l\'heure pile.'], ['9 h → 10 h 15 : 1 h 15 min', 'Je continue jusqu\'à l\'heure de fin.'], ['Durée : 20 min + 1 h 15 min = 1 h 35 min', 'J\'additionne les bonds.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi 60 minutes ?', [
    'Pourquoi une heure a-t-elle 60 minutes, et pas 100 ? C\'est un héritage des <b>Babyloniens</b>, il y a 4 000 ans : ils comptaient en base 60, car 60 se partage facilement en 2, 3, 4, 5, 6, 10, 12, 15, 20 et 30.',
    'Les <b>Égyptiens</b> ont partagé le jour et la nuit en 12 heures chacun. Pour mesurer le temps, on a utilisé des cadrans solaires, des sabliers, des clepsydres (horloges à eau), puis des horloges mécaniques à partir du XIII<sup>e</sup> siècle.',
    'Pendant la Révolution française, on a essayé une <b>heure décimale</b> : 10 heures par jour, 100 minutes par heure ! Mais personne ne s\'y est habitué et elle a été abandonnée au bout de deux ans.',
  ]),
  quiz: [
    { q: '1 h = …', opts: ['100 min', '60 min', '24 min'], correct: 1 },
    { q: '1 h 30 min = …', opts: ['130 min', '90 min', '1,30 h'], correct: 1 },
    { q: 'De 10 h 50 à 11 h 20, il s\'écoule…', opts: ['30 min', '70 min', '20 min'], correct: 0 },
  ],
  init: () => { if(!hr) hrNouvelle(); else { const el = document.getElementById('hr-fig'); if(el) el.innerHTML = horloge(hr.h, hr.m, 170); } },
});
})();

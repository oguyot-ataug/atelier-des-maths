/* ============================================================
   CHAPITRE : Heures et durées (CM1, M5, période 5)
   Programme du cycle 3 (CM1) : lire l'heure sur une horloge à aiguilles et sur un affichage
   numérique ; distinguer instant (heure) et durée ; unités (s, min, h, jour, semaine, mois,
   année, siècle) et relations (1 h = 60 min, 1 min = 60 s, 1 jour = 24 h…) ; calculer une durée,
   une heure de fin ou de début, en s'aidant d'une frise (bond jusqu'à l'heure pile). Pas de
   tableau de conversion. Atelier : lire l'heure sur une horloge tirée au hasard.
   ============================================================ */
(() => {
/* Moment de la journée (demandé : « quand on lit une horloge, il faut demander matin ou après-midi,
   ou avoir un petit dessin qui montre le lever et le coucher du soleil ») : le soleil monte à
   l'horizon le matin, est haut vers midi, se couche le soir ; la nuit, la lune et les étoiles.
   h24 : l'heure sur 24 heures (avec les minutes en décimales). */
function momentTexte(h24){ return h24 < 6 || h24 >= 21 ? 'la nuit' : h24 < 12 ? 'le matin' : h24 < 18 ? 'l\'après-midi' : 'le soir'; }
function moment(h24, taille){
  const w = taille || 64, nuit = h24 < 6 || h24 >= 21, soir = h24 >= 18 && h24 < 21, aube = h24 < 8 && !nuit;
  let s = `<svg viewBox="0 0 80 50" style="width:${w}px;display:block;margin:0 auto;"><rect x="1" y="1" width="78" height="48" rx="9" fill="${nuit ? '#1F2A4A' : soir || aube ? '#FDE3C8' : '#DDF0FB'}"/>`;
  if(nuit){
    s += `<circle cx="46" cy="21" r="10" fill="#F4E9A8"/><circle cx="51" cy="17" r="9" fill="#1F2A4A"/>`;
    [[14, 12], [24, 26], [64, 12], [68, 30], [32, 9]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="1.4" fill="#fff"/>`; });
  } else {
    const a = Math.PI * (1 - Math.min(1, Math.max(0, (h24 - 6) / 15))), sx = 40 + 30 * Math.cos(a), sy = 40 - 28 * Math.sin(a);
    s += `<path d="M10 40 A30 28 0 0 1 70 40" fill="none" stroke="#9AA3AF" stroke-width="1" stroke-dasharray="2 2"/>`;
    s += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="7" fill="${soir || aube ? '#F08A3C' : '#F5C518'}" stroke="#E07B00" stroke-width="1"/>`;
  }
  s += `<rect x="1" y="40" width="78" height="9" rx="4" fill="${nuit ? '#2E3B5E' : '#8DB84A'}"/></svg>`;
  return `<span style="display:inline-block;text-align:center;"><span>${s}</span><span style="display:block;font-size:.72rem;font-weight:700;color:#4E5665;">${momentTexte(h24)}</span></span>`;
}
// Horloge à aiguilles ; opts.h24 : ajoute le moment de la journée ; opts.vide : sans aiguilles (à dessiner).
function horloge(h, m, taille, opts){
  opts = opts || {};
  if(opts.h24 != null) return `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;vertical-align:middle;">${horloge(h, m, taille, { vide: opts.vide })}${moment(opts.h24, Math.max(46, (taille || 150) * .5))}</span>`;
  const t = taille || 150, cx = 60, cy = 60; let s = `<svg viewBox="0 0 120 120" style="width:${t}px;display:inline-block;vertical-align:middle;"><circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="#1F3A5C" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, g = i % 5 === 0, r1 = g ? 47 : 51; s += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + 54 * Math.sin(a)).toFixed(1)}" y2="${(cy - 54 * Math.cos(a)).toFixed(1)}" stroke="#1F3A5C" stroke-width="${g ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; s += `<text x="${(cx + 38 * Math.sin(a)).toFixed(1)}" y="${(cy - 38 * Math.cos(a) + 4).toFixed(1)}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
  if(opts.vide) return s + '<circle cx="60" cy="60" r="3.5" fill="#1F3A5C"/></svg>';
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
// Planches : une heure ou une durée à compléter (deux cases), et la réponse du corrigé.
const HB = () => `${plPointilles(3)} h ${plPointilles(3)}`;
const HR = (h, m) => `${plRep(String(h))} h ${plRep(String(m).padStart(2, '0'))}`;
const DB = () => `${plPointilles(3)} h ${plPointilles(3)} min`;
const DR = (h, m) => `${plRep(String(h))} h ${plRep(String(m))} min`;
let hr = null;
// Atelier : une heure sur 24 h tirée au hasard ; le dessin du moment dit s'il faut ajouter 12.
function hrNouvelle(){ const h24 = 6 + Math.floor(Math.random() * 17); hr = { h24, h: h24 % 12 || 12, m: 5 * Math.floor(Math.random() * 12) }; const el = document.getElementById('hr-fig'); if(el) el.innerHTML = horloge(hr.h, hr.m, 170, { h24: hr.h24 + hr.m / 60 }); const r = document.getElementById('hr-rep'); if(r) r.innerHTML = ''; ['hr-h', 'hr-m'].forEach(i => { const x = document.getElementById(i); if(x) x.value = ''; }); }
window.cm1HrNouvelle = hrNouvelle;
window.cm1HrValider = () => {
  const h = parseInt(document.getElementById('hr-h').value, 10), m = parseInt(document.getElementById('hr-m').value, 10), r = document.getElementById('hr-rep');
  const ok = h === hr.h24 && m === hr.m, apm = hr.h24 >= 12;
  r.innerHTML = ok ? `<b style="color:#2E9C6A;">Bravo ! Il est ${hh(hr.h24, hr.m)}, ${momentTexte(hr.h24 + hr.m / 60)}.</b>`
    : h === hr.h && m === hr.m && apm ? `<b style="color:#C77D1E;">Presque : regarde le petit dessin, c'est ${momentTexte(hr.h24 + hr.m / 60)}. Après midi, on ajoute 12 : ${hr.h} + 12 = ${hr.h24}. Il est ${hh(hr.h24, hr.m)}.</b>`
    : `<b style="color:#E35D3A;">Non : la petite aiguille (rouge) montre les heures, la grande (bleue) les minutes, et le dessin dit si c'est le matin ou l'après-midi. Il est ${hh(hr.h24, hr.m)}.</b>`;
};
cm1Chapitre({
  titre: 'Heures et durées', slug: 'heures-durees',
  cours: `
${cm1Lecon(1, 'Lire l\'heure')}
<div class="figure-wrap" style="display:flex;gap:26px;align-items:center;justify-content:center;flex-wrap:wrap;">${horloge(3, 40, 150, { h24: 15.67 })}<div style="font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:700;background:#1F3A5C;color:#7FE3B0;padding:8px 16px;border-radius:10px;">15:40</div></div>
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>La <b style="color:#E35D3A;">petite aiguille</b> indique les <b>heures</b> : ici elle a dépassé le 3.</li><li>La <b style="color:#2EA8C9;">grande aiguille</b> indique les <b>minutes</b> : chaque chiffre vaut 5 minutes. Sur le 8 : 8 × 5 = 40 minutes.</li><li>Le petit dessin montre le soleil de l\'<b>après-midi</b> : il n\'est pas 3 h 40 du matin, mais <b>15 h 40</b>.</li></ul>')}
<div class="figure-wrap" style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;">${[[3, 'la nuit'], [8, 'le matin'], [12.5, 'vers midi'], [16, 'l\'après-midi'], [19.5, 'le soir'], [23, 'la nuit']].map(([h]) => moment(h, 70)).join('')}</div>
${cm1Astuce('Une horloge à aiguilles ne dit pas si c\'est le matin ou l\'après-midi : il faut le savoir (le soleil, ce qu\'on est en train de faire), ou le demander.')}
${cm1Rem('Une journée dure 24 heures, mais la petite aiguille ne fait que 12 heures : elle fait <b>deux tours</b> par jour. L\'après-midi, on ajoute 12 : 3 h de l\'après-midi = 15 h. On dit aussi « 4 h moins 20 » pour 3 h 40.')}

${cm1Lecon(2, 'Unités de durée')}
${cm1Regle(cm1Liste(['1 minute (min) = 60 secondes (s)', '1 heure (h) = 60 min', '1 jour = 24 h', '1 semaine = 7 jours', '1 année = 12 mois = 365 jours (366 les années bissextiles)', '1 siècle = 100 ans']), 'À retenir')}
${ce2AnimHorloge('cm1-hd-horloge', { presets: [{ nom: 'Un quart d\'heure', de: [9, 0], a: [9, 15] }, { nom: 'Une heure', de: [9, 0], a: [10, 0], fin: 'Un tour complet de la grande aiguille : <b>1 h = 60 min</b>.' }] })}
${cm1Exemple('Convertir en raisonnant :', ['2 h = 2 × 60 min = <b>120 min</b>.', '1 h 15 min = 60 min + 15 min = <b>75 min</b>.', '90 min = 60 min + 30 min = <b>1 h 30 min</b>.', '3 min = 3 × 60 s = <b>180 s</b>.'])}
${cm1Astuce('Attention : 1 h 30 min n\'est pas 1,30 h ! Une heure a 60 minutes, pas 100.')}

${cm1Lecon(3, 'Instant et durée')}
${cm1Def('Un <b>instant</b> (ou horaire) dit <b>quand</b> quelque chose se passe : « le film commence à 14 h 30 ».<br>Une <b>durée</b> dit <b>combien de temps</b> cela dure : « le film dure 1 h 45 min ».')}

${cm1Lecon(4, 'Calculer une durée avec une frise')}
${ce2AnimSauts('cm1-hd-frise', { legende: 'Sur la frise : un bond jusqu\'à l\'heure pile, des bonds d\'une heure, puis le reste.', presets: [{ nom: 'De 17 h 40 à 19 h 05', depart: 17 * 60 + 40, sauts: [[20, '+ 20 min'], [60, '+ 1 h'], [5, '+ 5 min']], min: 17 * 60 + 30, max: 19 * 60 + 15, fmt: ce2Heure, fin: '20 min + 1 h + 5 min = <b>1 h 25 min</b>.' }, { nom: 'De 15 h 30, cuire 45 min', depart: 15 * 60 + 30, sauts: [[30, '+ 30 min'], [15, '+ 15 min']], min: 15 * 60 + 20, max: 16 * 60 + 25, fmt: ce2Heure, fin: 'Le gâteau sort à <b>16 h 15</b>.' }] })}
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
<p class="hint" style="margin:4px 0;">Regarde aussi le petit dessin : le matin, la petite aiguille donne l'heure ; l'après-midi et le soir, on ajoute 12.</p>
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
    [`Quelle heure est-il ? Regarde le petit dessin : matin ou après-midi ?<div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0;">${[[7, 15, 7.25], [10, 45, 10.75], [2, 5, 14.1], [6, 30, 18.5]].map(([h, m, h24], i) => `<div style="text-align:center;">${horloge(h, m, 100, { h24 })}<div><b>${'ABCD'[i]}</b></div></div>`).join('')}</div>`,
      cm1Redac('Lecture des horloges', { suite: ['A : 7 h 15 (le matin)', 'B : 10 h 45, onze heures moins le quart (le matin)', 'C : 2 h 05 l\'après-midi, donc 14 h 05', 'D : 6 h 30 le soir, donc 18 h 30'] }, 'La petite aiguille donne l\'heure, la grande les minutes ; l\'après-midi et le soir, on ajoute 12.')],
    [`Écris ces heures de l'après-midi sur 24 heures.${cm1Liste(['3 h 20', '6 h 45', '11 h 10'])}`,
      cm1Redac('Heures de l\'après-midi', { suite: ['12 h + 3 h 20 = 15 h 20', '12 h + 6 h 45 = 18 h 45', '12 h + 11 h 10 = 23 h 10'] }, 'L\'après-midi, on ajoute 12 h : 15 h 20, 18 h 45 et 23 h 10.')],
    [`Convertis.${cm1Liste(['3 h en min', '2 min en s', '2 jours en h', '3 semaines en jours'])}`,
      cm1Redac('Conversions', { suite: ['3 h = 3 × 60 min = 180 min', '2 min = 2 × 60 s = 120 s', '2 jours = 2 × 24 h = 48 h', '3 semaines = 3 × 7 jours = 21 jours'] }, 'On part chaque fois d\'une relation connue, puis on multiplie.')],
    [`Convertis en heures et minutes.${cm1Liste(['80 min', '150 min', '65 min'])}`,
      cm1Redac('Conversions', { suite: ['80 min = 60 min + 20 min = 1 h 20 min', '150 min = 120 min + 30 min = 2 h 30 min', '65 min = 60 min + 5 min = 1 h 05 min'] }, 'On enlève des paquets de 60 minutes : chacun fait une heure.')],
    [`Instant ou durée ?${cm1Liste(['« La cantine ouvre à 11 h 45. »', '« Le match dure 90 minutes. »', '« Je dors 10 heures. »'])}`,
      cm1Redac('Instant ou durée', { suite: ['11 h 45 : un instant', '90 minutes : une durée', '10 heures de sommeil : une durée'] }, 'Un instant dit « quand » ; une durée dit « combien de temps ».')],
    ['Un dessin animé commence à 17 h 40 et finit à 19 h 05. Quelle est sa durée ?',
      cm1Redac('Les bonds', { suite: ['17 h 40 → 18 h : 20 min', '18 h → 19 h : 1 h', '19 h → 19 h 05 : 5 min'] }, '')
      + cm1Redac('Durée du dessin animé', '20 min + 1 h + 5 min = 1 h 25 min', 'Le dessin animé dure 1 h 25 min.')],
    ['Un gâteau doit cuire 45 minutes. Il est enfourné à 15 h 30. À quelle heure faut-il le sortir ?',
      cm1Redac('Heure de sortie', { suite: ['15 h 30 + 30 min = 16 h', '16 h + 15 min = 16 h 15'] }, 'Il faut sortir le gâteau à 16 h 15.')],
    ['En quel siècle sommes-nous ? En quel siècle a eu lieu la Révolution française (1789) ?',
      cm1Redac('Notre siècle', 'années 2001 à 2100', 'Nous sommes au XXI<sup>e</sup> siècle.') + cm1Redac('La Révolution française', 'années 1701 à 1800', '1789 est au XVIII<sup>e</sup> siècle.')],
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
  init: () => { if(!hr) hrNouvelle(); else { const el = document.getElementById('hr-fig'); if(el) el.innerHTML = horloge(hr.h, hr.m, 170, { h24: hr.h24 + hr.m / 60 }); } },
  // Planches d'exercices imprimables (planches.js), aussi faisables à l'écran (planches-num.js).
  planches: [
    { titre: 'Lire l\'heure, le matin et l\'après-midi', duree: '30 min',
      attendus: ['Lire l\'heure sur une horloge à aiguilles', 'Distinguer le matin et l\'après-midi, écrire l\'heure sur 24 heures'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Écris l\'heure indiquée par chaque horloge (c\'est le matin).',
          eleve: plGrille([[8, 15], [9, 40], [11, 5]].map(([h, m]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${horloge(h, m, 78, { h24: h + m / 60 })}<span>${HB()}</span></span>`), 3),
          corr: plGrille([[8, 15], [9, 40], [11, 5]].map(([h, m]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${horloge(h, m, 78, { h24: h + m / 60 })}<span>${HR(h, m)}</span></span>`), 3) },
        { etoiles: 1, col: 1, consigne: 'Regarde le petit dessin, puis écris l\'heure sur 24 heures.',
          eleve: plGrille([[3, 20, 15], [5, 45, 17], [7, 30, 7]].map(([h, m, h24]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${horloge(h, m, 78, { h24: h24 + m / 60 })}<span>${HB()}</span></span>`), 3),
          corr: plGrille([[3, 20, 15], [5, 45, 17], [7, 30, 7]].map(([h, m, h24]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:4px;">${horloge(h, m, 78, { h24: h24 + m / 60 })}<span>${HR(h24, m)}</span></span>`), 3) },
        { etoiles: 2, consigne: 'Dessine les aiguilles : la petite pour les heures, la grande pour les minutes.',
          eleve: plGrille([[7, 30], [10, 15], [2, 45], [6, 50]].map(([h, m]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${horloge(h, m, 80, { vide: true })}<b>${hh(h, m)}</b></span>`), 4),
          corr: plGrille([[7, 30], [10, 15], [2, 45], [6, 50]].map(([h, m]) => `<span style="display:flex;flex-direction:column;align-items:center;gap:2px;">${horloge(h, m, 80)}<b>${hh(h, m)}</b></span>`), 4) },
        { etoiles: 2, col: 1, consigne: 'Écris ces heures en chiffres.',
          eleve: plListe(['huit heures moins le quart', 'midi et demi', 'neuf heures et quart', 'cinq heures moins vingt'].map(t => `${t} : ${HB()}`)),
          corr: plListe([['huit heures moins le quart', 7, 45], ['midi et demi', 12, 30], ['neuf heures et quart', 9, 15], ['cinq heures moins vingt', 4, 40]].map(([t, h, m]) => `${t} : ${HR(h, m)}`)) },
        { etoiles: 2, col: 1, consigne: 'Le matin, l\'après-midi, le soir ou la nuit ? Entoure.',
          eleve: plListe([`Il est 7 h : <b>le matin · le soir</b>`, `Il est 14 h 30 : <b>le matin · l'après-midi</b>`, `Il est 23 h : <b>l'après-midi · la nuit</b>`, `Il est 19 h 15 : <b>le matin · le soir</b>`]),
          corr: plListe([`Il est 7 h : ${plEntoure('le matin')}`, `Il est 14 h 30 : ${plEntoure('l\'après-midi')}`, `Il est 23 h : ${plEntoure('la nuit')}`, `Il est 19 h 15 : ${plEntoure('le soir')}`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Le réveil de Lina sonne à l'heure ci-dessous. Elle part pour l'école 50 minutes plus tard. À quelle heure part-elle ?<div style="margin-top:4px;">${horloge(6, 55, 70, { h24: 6.92 })}</div>`,
          corr: cm1Redac('Heure du réveil', '', 'Le réveil sonne à 6 h 55, le matin.') + cm1Redac('Heure de départ', { suite: ['6 h 55 + 5 min = 7 h', '7 h + 45 min = 7 h 45'] }, 'Lina part pour l\'école à 7 h 45.') },
      ] },
    { titre: 'Unités de durée et conversions', duree: '30 min',
      attendus: ['Connaître les relations entre les unités de durée', 'Convertir des durées sans tableau, en raisonnant'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Complète.',
          eleve: plListe(['1 h = %1 min', '1 min = %1 s', '1 jour = %1 h', '1 semaine = %1 jours', '1 année = %1 mois', '1 siècle = %1 ans'].map(t => t.replace('%1', plPointilles(3)))),
          corr: plListe([['1 h = ', '60', ' min'], ['1 min = ', '60', ' s'], ['1 jour = ', '24', ' h'], ['1 semaine = ', '7', ' jours'], ['1 année = ', '12', ' mois'], ['1 siècle = ', '100', ' ans']].map(([a, b, c]) => a + plRep(b) + c)) },
        { etoiles: 1, col: 1, consigne: 'Convertis en minutes.',
          eleve: plListe(['2 h', '3 h', '1 h 20 min', '1 h 45 min'].map(t => `${t} = ${plPointilles(4)} min`)),
          corr: plListe([['2 h', 120], ['3 h', 180], ['1 h 20 min', 80], ['1 h 45 min', 105]].map(([t, v]) => `${t} = ${plRep(String(v))} min`)) },
        { etoiles: 2, col: 1, consigne: 'Convertis en heures et minutes.',
          eleve: plListe(['75 min', '90 min', '130 min', '200 min'].map(t => `${t} = ${DB()}`)),
          corr: plListe([['75 min', 1, 15], ['90 min', 1, 30], ['130 min', 2, 10], ['200 min', 3, 20]].map(([t, h, m]) => `${t} = ${DR(h, m)}`)) },
        { etoiles: 2, col: 1, consigne: 'Complète avec <, = ou >.',
          eleve: plGrille(['1 h 30 min %1 90 min', '100 min %1 1 h 30 min', '2 h %1 150 min', '3 min %1 200 s', '1 jour %1 20 h', '1 semaine %1 7 jours'].map(t => t.replace('%1', plCase())), 2),
          corr: plGrille([['1 h 30 min', '=', '90 min'], ['100 min', '&gt;', '1 h 30 min'], ['2 h', '&lt;', '150 min'], ['3 min', '&lt;', '200 s'], ['1 jour', '&gt;', '20 h'], ['1 semaine', '=', '7 jours']].map(([a, o, b]) => `${a} ${plRep(o)} ${b}`), 2) },
        { etoiles: 2, col: 1, consigne: 'Choisis l\'unité qui convient. Entoure.',
          eleve: plListe(['Une récréation dure 15 <b>min · h</b>', 'Un film dure 2 <b>h · jours</b>', 'Les vacances d\'été durent 8 <b>jours · semaines</b>', 'Un clignement d\'yeux dure 1 <b>s · min</b>']),
          corr: plListe([['Une récréation dure 15 ', 'min'], ['Un film dure 2 ', 'h'], ['Les vacances d\'été durent 8 ', 'semaines'], ['Un clignement d\'yeux dure 1 ', 's']].map(([t, u]) => t + plEntoure(u))) },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Tom dit : « 1 h 30 min, c\'est 130 minutes. » A-t-il raison ? Explique.',
          corr: cm1Redac('Conversion de 1 h 30 min', { suite: ['1 h = 60 min', '60 min + 30 min = 90 min'] }, 'Tom a tort : 1 h 30 min, c\'est 90 minutes, car une heure a 60 minutes, pas 100.') },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Un bébé dort 16 heures par jour. Combien de minutes dort-il chaque jour ? Combien d\'heures dort-il en une semaine ?',
          corr: cm1Redac('Sommeil d\'une journée', '16 × 60 min = 960 min', 'Le bébé dort 960 minutes par jour.') + cm1Redac('Sommeil d\'une semaine', '16 h × 7 = 112 h', 'Le bébé dort 112 heures en une semaine.') },
      ] },
    { titre: 'Calculer une durée, une heure de fin ou de début', duree: '35 min',
      attendus: ['Calculer une durée avec une frise (bond jusqu\'à l\'heure pile)', 'Calculer une heure de fin ou de début'],
      exos: [
        { etoiles: 1, col: 1, consigne: 'Combien de minutes jusqu\'à l\'heure pile ?',
          eleve: plListe(['De 8 h 40 à 9 h', 'De 14 h 25 à 15 h', 'De 17 h 05 à 18 h'].map(t => `${t} : ${plPointilles(3)} min`)),
          corr: plListe([['De 8 h 40 à 9 h', 20], ['De 14 h 25 à 15 h', 35], ['De 17 h 05 à 18 h', 55]].map(([t, v]) => `${t} : ${plRep(String(v))} min`)) },
        { etoiles: 2, col: 1, consigne: 'Le cours de judo va de 9 h 35 à 11 h 20. Complète les bonds, puis la durée.',
          eleve: frise([['9 h 35', '10 h', '?'], ['10 h', '11 h', '?'], ['11 h', '11 h 20', '?']]) + plListe([`Bonds : ${plPointilles(3)} min, ${plPointilles(3)} h et ${plPointilles(3)} min`, `Durée : ${DB()}`]),
          corr: frise([['9 h 35', '10 h', '?'], ['10 h', '11 h', '?'], ['11 h', '11 h 20', '?']]) + plListe([`Bonds : ${plRep('25')} min, ${plRep('1')} h et ${plRep('20')} min`, `Durée : ${DR(1, 45)}`]) },
        { etoiles: 2, col: 1, consigne: 'Calcule l\'heure de fin.',
          eleve: plListe(['14 h 50 + 20 min', '9 h 40 + 35 min', '16 h 30 + 1 h 45 min'].map(t => `${t} = ${HB()}`)),
          corr: plListe([['14 h 50 + 20 min', 15, 10], ['9 h 40 + 35 min', 10, 15], ['16 h 30 + 1 h 45 min', 18, 15]].map(([t, h, m]) => `${t} = ${HR(h, m)}`)) },
        { etoiles: 2, col: 1, consigne: 'Calcule l\'heure de début.',
          eleve: plListe(['Fin à 10 h 15, durée 30 min', 'Fin à 16 h 05, durée 20 min', 'Fin à 12 h, durée 1 h 25 min'].map(t => `${t} : début à ${HB()}`)),
          corr: plListe([['Fin à 10 h 15, durée 30 min', 9, 45], ['Fin à 16 h 05, durée 20 min', 15, 45], ['Fin à 12 h, durée 1 h 25 min', 10, 35]].map(([t, h, m]) => `${t} : début à ${HR(h, m)}`)) },
        { etoiles: 2, col: 1, consigne: `Voici les horaires du bus. Calcule la durée de chaque trajet.<table style="border-collapse:collapse;margin:4px 0;font-size:.95em;"><tr>${['Gare', 'École', 'Piscine', 'Stade'].map(x => `<th style="border:1px solid #8A93A3;padding:2px 8px;">${x}</th>`).join('')}</tr><tr>${['7 h 45', '8 h 05', '8 h 20', '8 h 50'].map(x => `<td style="border:1px solid #8A93A3;padding:2px 8px;text-align:center;">${x}</td>`).join('')}</tr></table>`,
          eleve: plListe([`De la gare à l'école : ${plPointilles(3)} min`, `De l'école au stade : ${plPointilles(3)} min`, `De la gare au stade : ${DB()}`]),
          corr: plListe([`De la gare à l'école : ${plRep('20')} min`, `De l'école au stade : ${plRep('45')} min`, `De la gare au stade : ${DR(1, 5)}`]) },
        { etoiles: 3, col: 1, cahier: true, consigne: `Le film commence à l'heure ci-dessous. Il dure 1 h 50 min. À quelle heure finit-il ?<div style="margin-top:4px;">${horloge(8, 25, 70, { h24: 20.42 })}</div>`,
          corr: cm1Redac('Heure du début', '', 'C\'est le soir : le film commence à 20 h 25.') + cm1Redac('Heure de fin', { suite: ['20 h 25 + 1 h = 21 h 25', '21 h 25 + 35 min = 22 h', '22 h + 15 min = 22 h 15'] }, 'Le film finit à 22 h 15.') },
        { etoiles: 3, col: 1, cahier: true, consigne: 'Emma part de chez elle à 13 h 40 et arrive chez sa mamie à 16 h 15. Combien de temps a duré son trajet ?',
          corr: cm1Redac('Les bonds', { suite: ['13 h 40 → 14 h : 20 min', '14 h → 16 h : 2 h', '16 h → 16 h 15 : 15 min'] }, '') + cm1Redac('Durée du trajet', '20 min + 2 h + 15 min = 2 h 35 min', 'Le trajet d\'Emma a duré 2 h 35 min.') },
      ] },
  ],
});
})();

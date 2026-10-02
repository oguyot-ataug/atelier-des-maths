/* ============================================================
   CHAPITRE : Heures et durées (CM2, M4, période 5)
   Programme du cycle 3 (CM2) : lire l'heure sur une horloge à aiguilles ; POSITIONNER les
   aiguilles pour une heure donnée en heure, minute et SECONDE ; comparer et mesurer des durées
   entre deux instants (h, min, s) ; problèmes à une ou plusieurs étapes. Système sexagésimal :
   1 h = 60 min, 1 min = 60 s. Pas de tableau de conversion. Atelier : régler les aiguilles.
   ============================================================ */
(() => {
function horloge(h, m, s, taille){
  const cx = 60, cy = 60; let g = `<svg viewBox="0 0 120 120" style="width:${taille || 160}px;display:inline-block;vertical-align:middle;"><circle cx="60" cy="60" r="56" fill="#FFFDF7" stroke="#1F3A5C" stroke-width="3"/>`;
  for(let i = 0; i < 60; i++){ const a = i * Math.PI / 30, gr = i % 5 === 0, r1 = gr ? 47 : 51; g += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + 54 * Math.sin(a)).toFixed(1)}" y2="${(cy - 54 * Math.cos(a)).toFixed(1)}" stroke="#1F3A5C" stroke-width="${gr ? 2 : .8}"/>`; }
  for(let i = 1; i <= 12; i++){ const a = i * Math.PI / 6; g += `<text x="${(cx + 38 * Math.sin(a)).toFixed(1)}" y="${(cy - 38 * Math.cos(a) + 4).toFixed(1)}" font-size="11" text-anchor="middle" fill="#1F3A5C" font-family="Space Grotesk" font-weight="700">${i}</text>`; }
  const ah = ((h % 12) + m / 60) * Math.PI / 6, am = (m + s / 60) * Math.PI / 30, as = s * Math.PI / 30;
  g += `<line x1="60" y1="60" x2="${(cx + 26 * Math.sin(ah)).toFixed(1)}" y2="${(cy - 26 * Math.cos(ah)).toFixed(1)}" stroke="#E35D3A" stroke-width="5" stroke-linecap="round"/>`;
  g += `<line x1="60" y1="60" x2="${(cx + 42 * Math.sin(am)).toFixed(1)}" y2="${(cy - 42 * Math.cos(am)).toFixed(1)}" stroke="#2EA8C9" stroke-width="3" stroke-linecap="round"/>`;
  g += `<line x1="60" y1="60" x2="${(cx + 50 * Math.sin(as)).toFixed(1)}" y2="${(cy - 50 * Math.cos(as)).toFixed(1)}" stroke="#2E9C6A" stroke-width="1.3"/><circle cx="60" cy="60" r="3" fill="#1F3A5C"/>`;
  return g + '</svg>';
}
const pad = n => String(n).padStart(2, '0');
let hz = null;
function hzNouveau(){ hz = { cible: [1 + Math.floor(Math.random() * 12), 5 * Math.floor(Math.random() * 12), 5 * Math.floor(Math.random() * 12)], v: [12, 0, 0] }; hzRendre(''); }
function hzRendre(msg){
  const f = document.getElementById('c2hz-fig'), t = document.getElementById('c2hz-cible'), r = document.getElementById('c2hz-msg'); if(!f || !hz) return;
  f.innerHTML = horloge(hz.v[0], hz.v[1], hz.v[2], 190);
  t.innerHTML = `Place les aiguilles sur <b>${hz.cible[0]} h ${pad(hz.cible[1])} min ${pad(hz.cible[2])} s</b>`;
  r.innerHTML = msg;
}
window.c2HzBouge = (i, d) => { if(!hz) return; const max = [12, 60, 60][i]; hz.v[i] = ((hz.v[i] + d) % max + max) % max; if(i === 0 && hz.v[0] === 0) hz.v[0] = 12; hzRendre(''); };
window.c2HzVerifier = () => { const ok = hz.v.every((v, i) => v === hz.cible[i] || (i === 0 && v % 12 === hz.cible[0] % 12)); hzRendre(ok ? '<b style="color:#2E9C6A;">Bravo, l\'horloge est bien réglée !</b>' : '<b style="color:#E35D3A;">Pas encore : petite aiguille rouge = heures, grande aiguille bleue = minutes, trotteuse verte = secondes.</b>'); };
window.c2HzNouveau = hzNouveau;
cm1Chapitre({
  niveau: 'cm2', titre: 'Heures et durées', slug: 'heures-durees',
  cours: `
${cm1Lecon(1, 'Lire l\'heure à la seconde près')}
<div class="figure-wrap" style="display:flex;gap:26px;align-items:center;justify-content:center;flex-wrap:wrap;">${horloge(10, 35, 20)}<div style="font-family:'JetBrains Mono',monospace;font-size:1.8rem;font-weight:700;background:#1F3A5C;color:#7FE3B0;padding:8px 16px;border-radius:10px;">10:35:20</div></div>
${cm1Regle(cm1Liste(['La <b style="color:#E35D3A;">petite aiguille</b> indique les heures (ici un peu après 10).', 'La <b style="color:#2EA8C9;">grande aiguille</b> indique les minutes (sur le 7 : 35 min).', 'La <b style="color:#2E9C6A;">trotteuse</b>, la plus fine, indique les secondes (sur le 4 : 20 s).', 'Il est <b>10 h 35 min 20 s</b> (ou 22 h 35 min 20 s le soir).']))}

${cm1Lecon(2, 'Unités de durée et conversions')}
${cm1Regle(cm1Liste(['1 min = 60 s', '1 h = 60 min', '1 h = 3 600 s', '1 jour = 24 h', '1 semaine = 7 jours', '1 an = 12 mois', '1 siècle = 100 ans']), 'À retenir')}
${cm1Redac('2 min 15 s en secondes', ['120 s + 15 s', '135 s'], '2 min 15 s, c\'est 135 s, car 1 min vaut 60 s.')}
${cm1Redac('200 s en minutes et secondes', { suite: ['3 × 60 = 180', '200 − 180 = 20'] }, '200 s, c\'est 3 min 20 s.')}
${cm1Exemple('Autres exemples :', ['1 h 45 min, c\'est 60 min et 45 min, donc <b>105 min</b> ;', '150 min, c\'est 120 min et 30 min, donc <b>2 h 30 min</b>.'])}
${cm1Astuce(`On compte par 60 !${cm1Liste(['1 h 30 min n\'est pas 1,30 h ;', '1 min 50 s + 20 s = 2 min 10 s, et non « 1 min 70 s ».'])}`)}

${cm1Lecon(3, 'Calculer une durée, un horaire')}
${cm1Regle('On utilise une frise avec des <b>bonds</b> : jusqu\'à la minute (ou l\'heure) pile, puis les heures entières, puis le reste. On peut aussi additionner séparément heures, minutes et secondes, puis <b>convertir</b> quand on dépasse 60.')}
${ce2AnimHorloge('c2-hd-horloge', { presets: [{ nom: 'Film : 20 h 45 + 1 h 50', de: [20, 45], a: [22, 35], fin: 'Le film se termine à <b>22 h 35</b>.' }, { nom: 'Train : 14 h 52 → 17 h 18', de: [14, 52], a: [17, 18], fin: 'Le trajet dure <b>2 h 26 min</b>.' }] })}
${cm1Exemple('Un film commence à 20 h 45 et dure 1 h 50 min. À quelle heure finit-il ?')}
${cm1Redac('Heure de fin du film', { suite: ['20 h 45 + 1 h → 21 h 45', '21 h 45 + 15 min → 22 h', '22 h + 35 min → 22 h 35'] }, 'Le film se termine à 22 h 35.')}
${cm1Exemple('Course : départ à 9 h 58 min 40 s, arrivée à 10 h 03 min 15 s.')}
${cm1Redac('Temps de course', { suite: ['9 h 58 min 40 s → 9 h 59 : 20 s', '9 h 59 → 10 h : 1 min', '10 h → 10 h 03 min 15 s : 3 min 15 s', '20 s + 1 min + 3 min 15 s = 4 min 35 s'] }, 'La course a duré 4 min 35 s.')}
${cm1Redac('2 min 45 s + 1 min 30 s', ['3 min 75 s', '3 min + 1 min 15 s', '4 min 15 s'], 'On convertit les 75 s : le total est 4 min 15 s.')}
`,
  methode: `
${cm1Demo('c2-hd-course', 'Calculer une durée en h, min, s', 'Un marathonien part à 8 h 30 min 00 s et arrive à 11 h 12 min 45 s. Combien de temps a-t-il couru ?')}
${cm1Sous('A', 'Atelier : règle les aiguilles')}
<div class="figure-wrap" style="text-align:center;"><p id="c2hz-cible" style="font-size:1.05rem;"></p><div id="c2hz-fig"></div>
<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:10px 0;">
${[['Heures', 0, '#E35D3A', 1], ['Minutes', 1, '#2EA8C9', 5], ['Secondes', 2, '#2E9C6A', 5]].map(([n, i, c, pas]) => `<div style="border:2px solid ${c};border-radius:10px;padding:6px 10px;"><div style="font-weight:700;color:${c};">${n}</div><button class="btn secondary" onclick="c2HzBouge(${i},-${pas})">−</button> <button class="btn secondary" onclick="c2HzBouge(${i},${pas})">+</button>${i ? ` <button class="btn secondary" onclick="c2HzBouge(${i},1)">+1</button>` : ''}</div>`).join('')}</div>
<div class="figure-toolbar"><button class="btn" onclick="c2HzVerifier()">Vérifier</button><button class="btn secondary" onclick="c2HzNouveau()">Autre heure</button></div><p id="c2hz-msg" style="min-height:22px;"></p></div>
`,
  demos: [
    ['c2-hd-course', [
      { expr: '8 h 30 min → 9 h : 30 min', note: 'Premier bond : jusqu\'à l\'heure pile.' },
      { expr: '9 h → 11 h : 2 h', note: 'Bond des heures entières.' },
      { expr: '11 h → 11 h 12 min 45 s : 12 min 45 s', note: 'Dernier bond : le reste.' },
      { expr: '30 min + 2 h + 12 min 45 s = 2 h 42 min 45 s', note: 'J\'additionne les bonds. Il a couru 2 h 42 min 45 s.' },
    ]],
  ],
  exos: cm1Exos('c2hd', [
    [`Quelle heure est-il (le matin) ?<div style="display:flex;gap:10px;flex-wrap:wrap;margin:6px 0;">${[[4, 20, 45], [9, 50, 10], [7, 5, 30]].map(([h, m, s], i) => `<div style="text-align:center;">${horloge(h, m, s, 110)}<div>${'abc'[i]})</div></div>`).join('')}</div>`, cm1Redac('Heures lues', '', 'Sur l\'horloge a), il est 4 h 20 min 45 s ; sur la b), 9 h 50 min 10 s ; sur la c), 7 h 05 min 30 s.')],
    [`Convertis en secondes.${cm1Liste(['4 min', '3 min 25 s', '1 h'])}`,
      cm1Redac('4 min', '4 × 60 = 240', '4 min, c\'est 240 s.')
      + cm1Redac('3 min 25 s', ['3 × 60 + 25', '180 + 25', '205'], '3 min 25 s, c\'est 205 s.')
      + cm1Redac('1 h', '60 × 60 = 3 600', '1 h, c\'est 3 600 s.')],
    [`Convertis en minutes et secondes.${cm1Liste(['90 s', '150 s', '400 s'])}`,
      cm1Redac('90 s', '90 = 60 + 30', '90 s, c\'est 1 min 30 s.')
      + cm1Redac('150 s', '150 = 120 + 30', '150 s, c\'est 2 min 30 s.')
      + cm1Redac('400 s', '400 = 360 + 40', '400 s, c\'est 6 min 40 s, car 6 × 60 = 360.')],
    [`Calcule.${cm1Liste(['1 min 40 s + 50 s', '2 h 35 min + 1 h 40 min', '3 min − 45 s'])}`,
      cm1Redac('1 min 40 s + 50 s', ['1 min 90 s', '1 min + 1 min 30 s', '2 min 30 s'], 'Le résultat est 2 min 30 s.')
      + cm1Redac('2 h 35 min + 1 h 40 min', { nom: 'B', lignes: ['3 h 75 min', '3 h + 1 h 15 min', '4 h 15 min'] }, 'Le résultat est 4 h 15 min.')
      + cm1Redac('3 min − 45 s', { nom: 'C', lignes: ['2 min 60 s − 45 s', '2 min 15 s'] }, 'Le résultat est 2 min 15 s.')],
    ['Léa nage 50 m en 48 s. Hugo met 12 s de plus. Quel est le temps de Hugo ?',
      cm1Redac('Temps de Hugo', '48 + 12 = 60', 'Hugo met 60 s, c\'est-à-dire 1 min.')],
    ['Un train part à 14 h 52 et arrive à 17 h 18. Durée du trajet ?',
      cm1Redac('Durée du trajet', { suite: ['14 h 52 → 15 h : 8 min', '15 h → 17 h : 2 h', '17 h → 17 h 18 : 18 min', '8 min + 2 h + 18 min = 2 h 26 min'] }, 'Le trajet dure 2 h 26 min.')],
    ['Une recette : 25 min de préparation, 1 h 10 min de cuisson, 15 min de repos. On veut manger à 19 h 30. À quelle heure commencer ?',
      cm1Redac('Durée totale', ['25 min + 1 h 10 min + 15 min', '1 h 50 min'], 'La recette demande 1 h 50 min.')
      + cm1Redac('Heure de début', { suite: ['19 h 30 − 2 h → 17 h 30', '17 h 30 + 10 min → 17 h 40'] }, 'Il faut commencer à 17 h 40.')],
  ], { titre: 'Rédaction type : « Calculer une durée »', lignes: [['14 h 52 → 15 h : 8 min', 'Bond jusqu\'à l\'heure pile.'], ['15 h → 17 h : 2 h', 'Heures entières.'], ['17 h → 17 h 18 : 18 min', 'Puis le reste.'], ['8 min + 2 h + 18 min = 2 h 26 min', 'J\'additionne et je convertis si besoin.']] }),
  histoire: cm1Histoire('Un peu d\'histoire : la seconde et les horloges atomiques', [
    'Pendant longtemps, la <b>seconde</b> a été définie comme une petite partie du jour : 1 jour = 24 × 60 × 60 = 86 400 secondes.',
    'Mais la Terre ne tourne pas parfaitement régulièrement ! Depuis 1967, la seconde est définie grâce aux vibrations des atomes de césium : les <b>horloges atomiques</b> ne se trompent que d\'une seconde en plusieurs millions d\'années.',
  ]),
  quiz: [
    { q: '1 min 30 s = …', opts: ['130 s', '90 s', '1,30 min'], correct: 1 },
    { q: 'Quelle aiguille indique les secondes ?', opts: ['la petite', 'la grande', 'la trotteuse'], correct: 2 },
    { q: '45 s + 30 s = …', opts: ['75 s = 1 min 15 s', '1 min 75 s', '0,75 min'], correct: 0 },
  ],
  init: () => { if(!hz) hzNouveau(); else hzRendre(''); },
});
})();

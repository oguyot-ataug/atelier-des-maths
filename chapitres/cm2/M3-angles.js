/* ============================================================
   CHAPITRE : Angles (CM2, M3, période 4)
   Programme du cycle 3 (CM2) : lexique (sommet, côtés, angle aigu, droit, obtus) et notations
   des angles ; comparer des angles ; construire un angle égal à la somme de deux angles donnés
   ou un multiple d'un angle donné ; construire par pliage la moitié d'un angle ; savoir qu'un
   angle droit mesure 90° (le degré est introduit à partir de l'angle droit). PAS de rapporteur
   au CM2 (collège). Angles saillants uniquement. Atelier : assembler des gabarits d'angles.
   ============================================================ */
(() => {
const COUL = { 90: '#2E9C6A', 45: '#2EA8C9', 30: '#E35D3A' };
function eventail(parts){
  const ox = 170, oy = 170, R = 140; let a = 0, s = `<svg viewBox="0 0 340 190" style="width:100%;max-width:360px;display:block;margin:0 auto;">`;
  s += `<line x1="${ox}" y1="${oy}" x2="${ox + R}" y2="${oy}" stroke="#1F3A5C" stroke-width="2.4"/>`;
  parts.forEach(d => { const b = a + d, r0 = a * Math.PI / 180, r1 = b * Math.PI / 180;
    s += `<path d="M${ox} ${oy} L${(ox + 100 * Math.cos(r0)).toFixed(1)} ${(oy - 100 * Math.sin(r0)).toFixed(1)} A100 100 0 0 0 ${(ox + 100 * Math.cos(r1)).toFixed(1)} ${(oy - 100 * Math.sin(r1)).toFixed(1)} Z" fill="${COUL[d]}" fill-opacity=".35" stroke="${COUL[d]}" stroke-width="1.4"/>`;
    const m = (a + d / 2) * Math.PI / 180; s += `<text x="${(ox + 70 * Math.cos(m)).toFixed(1)}" y="${(oy - 70 * Math.sin(m) + 4).toFixed(1)}" font-size="12" text-anchor="middle" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">${d}°</text>`;
    a = b; });
  if(a <= 180){ const r = a * Math.PI / 180; s += `<line x1="${ox}" y1="${oy}" x2="${(ox + R * Math.cos(r)).toFixed(1)}" y2="${(oy - R * Math.sin(r)).toFixed(1)}" stroke="#1F3A5C" stroke-width="2.4"/>`; }
  return s + `<circle cx="${ox}" cy="${oy}" r="3.5" fill="#1F3A5C"/></svg>`;
}
let ev = [];
function evRendre(){
  const el = document.getElementById('c2an-fig'), t = document.getElementById('c2an-txt'); if(!el) return;
  const tot = ev.reduce((a, b) => a + b, 0);
  el.innerHTML = eventail(ev);
  t.innerHTML = !ev.length ? 'Ajoute des gabarits pour construire un angle.' : tot > 180 ? `<b style="color:#E35D3A;">${tot}° : trop grand ! Au CM2 on travaille avec des angles plus petits qu'un angle plat (180°).</b>` : `${ev.join('° + ')}° = <b>${tot}°</b> : angle <b>${tot < 90 ? 'aigu' : tot === 90 ? 'droit' : tot < 180 ? 'obtus' : 'plat (ses côtés sont alignés)'}</b>.`;
}
window.c2AnAjout = d => { ev.push(d); evRendre(); };
window.c2AnReset = () => { ev = []; evRendre(); };
function angleNom(){
  const T = (x, y, t, c) => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="${c || '#1F3A5C'}" font-family="Space Grotesk">${t}</text>`;
  return `<svg viewBox="0 0 260 150" style="width:260px;display:block;margin:0 auto;"><line x1="40" y1="120" x2="230" y2="120" stroke="#1F3A5C" stroke-width="2.2"/><line x1="40" y1="120" x2="190" y2="30" stroke="#1F3A5C" stroke-width="2.2"/>
  <path d="M80 120 A40 40 0 0 0 74.3 99.4" fill="#E35D3A" fill-opacity=".2" stroke="#E35D3A" stroke-width="2"/>
  ${[[40, 120], [210, 120], [165, 45]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#1F3A5C"/>`).join('')}${T(24, 135, 'B')}${T(206, 140, 'C')}${T(160, 36, 'A')}${T(92, 110, '?', '#E35D3A')}</svg>`;
}
cm1Chapitre({
  niveau: 'cm2', titre: 'Angles', slug: 'angles',
  cours: `
${cm1Lecon(1, 'Vocabulaire et notation')}
<div class="figure-wrap">${angleNom()}</div>
${cm1Def('Cet angle a pour <b>sommet</b> le point B et pour <b>côtés</b> les demi-droites [BA) et [BC). On le nomme <b>l\'angle ABC</b> (ou l\'angle CBA) : la lettre du sommet est toujours <b>au milieu</b>. On l\'écrit aussi <span class="tex">\\widehat{ABC}</span>.')}
${cm1Rem('Rappel : un angle <b>aigu</b> est plus petit qu\'un angle droit ; un angle <b>obtus</b> est plus grand qu\'un angle droit mais ses côtés ne sont pas alignés.')}

${cm1Lecon(2, 'Le degré')}
${cm1Regle('On mesure les angles en <b>degrés</b> (°). Un <b>angle droit mesure 90°</b>.<br>La moitié d\'un angle droit mesure 45° ; le tiers d\'un angle droit mesure 30° ; deux angles droits côte à côte forment un angle plat de 180°.')}
${cm1Exemple('Exemples :', ['un angle de 60° est aigu (60 &lt; 90) ; un angle de 120° est obtus (90 &lt; 120 &lt; 180) ;', 'chaque angle d\'un triangle équilatéral mesure 60° ; les angles d\'un carré mesurent 90°.'])}
${cm1Astuce('Au CM2, on ne mesure pas encore avec un rapporteur : on compare avec des gabarits (angle droit, moitié, tiers).')}

${cm1Lecon(3, 'Comparer, additionner, partager des angles')}
${cm1Regle('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li><b>Comparer</b> : on superpose les angles (calque, gabarit) en faisant coïncider le sommet et un côté.</li><li><b>Additionner</b> : on place deux angles côte à côte, avec le même sommet et un côté commun : 45° + 30° = 75°.</li><li><b>Multiplier</b> : on reporte plusieurs fois le même angle : 3 fois 30° = 90°.</li><li><b>Partager en deux</b> : on découpe l\'angle et on le <b>plie</b> en faisant coïncider ses deux côtés ; le pli partage l\'angle en deux angles égaux.</li></ul>')}
`,
  methode: `
${cm1Demo('c2-an-pli', 'Construire la moitié d\'un angle par pliage', 'Comment obtenir un angle de 45° à partir d\'une feuille de papier ?')}
${cm1Sous('A', 'Atelier : assemble des gabarits d\'angles')}
<div class="figure-wrap" style="text-align:center;"><div id="c2an-fig"></div><p id="c2an-txt" style="margin:6px 0 10px;min-height:22px;"></p>
<div class="figure-toolbar"><button class="btn" style="background:#2E9C6A;" onclick="c2AnAjout(90)">+ 90°</button><button class="btn" style="background:#2EA8C9;" onclick="c2AnAjout(45)">+ 45°</button><button class="btn" style="background:#E35D3A;" onclick="c2AnAjout(30)">+ 30°</button><button class="btn secondary" onclick="c2AnReset()">Effacer</button></div>
<p class="hint">Défis : construis un angle de 75°, de 120°, de 135°, de 150°.</p></div>
`,
  demos: [
    ['c2-an-pli', [
      { expr: 'Le coin d\'une feuille : un angle droit (90°).', note: 'On part d\'un angle qu\'on connaît.' },
      { expr: 'Je plie en faisant coïncider les deux bords du coin.', note: 'Les deux côtés de l\'angle se superposent.' },
      { expr: 'Le pli partage l\'angle droit en deux angles égaux.', note: 'Chacun est la moitié de 90°.' },
      { expr: '90° ÷ 2 = 45°', note: 'On a construit un angle de 45°. En repliant encore : 22,5° !' },
    ]],
  ],
  exos: cm1Exos('c2an', [
    ['Nomme de deux façons l\'angle de sommet E dont les côtés passent par D et F.', 'L\'angle DEF ou l\'angle FED.'],
    ['Aigu, droit ou obtus ? 35° · 90° · 100° · 89° · 170°', 'aigu · droit · obtus · aigu · obtus.'],
    ['Calcule : la moitié d\'un angle droit · le tiers d\'un angle droit · un angle droit et demi.', '45° · 30° · 135°.'],
    ['Avec des gabarits de 30° et de 45°, comment obtenir 75° ? 60° ? 105° ?', '45° + 30° · 30° + 30° · 45° + 30° + 30°.'],
    ['Quelle est la mesure de chaque angle d\'un triangle équilatéral ? d\'un rectangle ?', '60° · 90°.'],
    ['Quel angle forment les aiguilles d\'une horloge à 3 h ? à 1 h ? à 5 h ?', '90° · 30° (le tiers d\'un angle droit) · 150°.'],
    ['Plie une feuille pour obtenir un angle de 45°, puis un angle de 22,5°.', 'Plier le coin (90°) en deux : 45° ; replier encore en deux : 22,5°.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : pourquoi 360 degrés ?', [
    'Les <b>Babyloniens</b> partageaient le tour complet en <b>360 degrés</b>. Pourquoi 360 ? Peut-être parce que l\'année compte environ 360 jours : le Soleil semble avancer d\'un degré par jour dans le ciel. Et 360 se partage en beaucoup de parts égales : 2, 3, 4, 5, 6, 8, 9, 10, 12…',
    'Un quart de tour, c\'est donc 360 ÷ 4 = 90° : l\'angle droit.',
  ]),
  quiz: [
    { q: 'Un angle droit mesure…', opts: ['45°', '90°', '180°'], correct: 1 },
    { q: 'Dans « l\'angle ABC », le sommet est…', opts: ['A', 'B', 'C'], correct: 1 },
    { q: 'Un angle de 120° est…', opts: ['aigu', 'droit', 'obtus'], correct: 2 },
  ],
  init: () => evRendre(),
});
})();

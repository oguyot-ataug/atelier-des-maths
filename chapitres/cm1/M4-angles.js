/* ============================================================
   CHAPITRE : Angles (CM1, M4, période 5)
   Programme du cycle 3 (CM1) : notion d'angle (sommet, côtés) ; comparer des angles par
   superposition, avec un calque ou un gabarit ; reconnaître un angle droit avec l'équerre ;
   angle aigu (plus petit qu'un angle droit), angle obtus (plus grand qu'un angle droit, plus
   petit qu'un angle plat). Seuls les angles saillants sont étudiés. La mesure en degrés avec un
   rapporteur arrive en 6e. Atelier : ouvrir un angle et le classer.
   ============================================================ */
(() => {
function angleSVG(deg, opts){
  opts = opts || {}; const W = opts.w || 220, H = opts.h || 150, ox = opts.ox || 70, oy = opts.oy || 120, L = opts.L || 120, r = Math.PI * deg / 180;
  const x2 = ox + L * Math.cos(r), y2 = oy - L * Math.sin(r), c = opts.coul || '#E35D3A';
  const ra = 28, ax = ox + ra * Math.cos(r), ay = oy - ra * Math.sin(r);
  let arc = deg === 90 ? `<polyline points="${ox + 16},${oy} ${ox + 16},${oy - 16} ${ox},${oy - 16}" fill="none" stroke="${c}" stroke-width="2"/>` : `<path d="M${ox + ra} ${oy} A${ra} ${ra} 0 0 0 ${ax.toFixed(1)} ${ay.toFixed(1)}" fill="${c}" fill-opacity=".18" stroke="${c}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" style="width:${W}px;max-width:100%;display:inline-block;vertical-align:middle;">${arc}<line x1="${ox}" y1="${oy}" x2="${ox + L}" y2="${oy}" stroke="#1F3A5C" stroke-width="2.4"/><line x1="${ox}" y1="${oy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#1F3A5C" stroke-width="2.4"/><circle cx="${ox}" cy="${oy}" r="3.5" fill="#1F3A5C"/>${opts.noms ? `<text x="${ox - 14}" y="${oy + 6}" font-size="14" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">A</text>` : ''}</svg>`;
}
const nature = d => d < 90 ? ['aigu', '#2EA8C9', 'plus petit qu\'un angle droit'] : d === 90 ? ['droit', '#2E9C6A', 'exactement comme le coin de l\'équerre'] : d < 180 ? ['obtus', '#7A4FC0', 'plus grand qu\'un angle droit'] : ['plat', '#B8962E', 'les deux côtés sont alignés'];
window.cm1AnMaj = v => {
  const d = +v, n = nature(d), f = document.getElementById('an-fig'), t = document.getElementById('an-txt'); if(!f || !t) return;
  f.innerHTML = angleSVG(d, { w: 260, h: 150, ox: 120, oy: 128, L: 110, coul: n[1] });
  t.innerHTML = `Cet angle est <b style="color:${n[1]};">${n[0]}</b> : ${n[2]}.`;
};
cm1Chapitre({
  titre: 'Angles', slug: 'angles',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce qu\'un angle ?')}
${cm1Def('Un <b>angle</b> est formé par deux <b>côtés</b> (deux demi-droites) qui partent d\'un même point, appelé le <b>sommet</b> de l\'angle.')}
<div class="figure-wrap">${angleSVG(50, { noms: true })}<p class="hint" style="margin:4px 0 0;">Le sommet est le point A ; les deux côtés partent de A.</p></div>
${cm1Astuce('La taille d\'un angle ne dépend <b>pas</b> de la longueur des côtés qu\'on a tracés : elle dépend seulement de l\'<b>écartement</b> entre les deux côtés.')}

${cm1Lecon(2, 'L\'angle droit')}
${cm1Regle('Pour savoir si un angle est <b>droit</b>, on utilise l\'<b>équerre</b> : on place le coin de l\'équerre sur le sommet et un bord de l\'équerre le long d\'un côté. Si l\'autre côté est le long de l\'autre bord, l\'angle est droit.')}
<div class="figure-wrap">${angleSVG(90, { coul: '#2E9C6A' })}<p class="hint" style="margin:4px 0 0;">On code un angle droit par un petit carré.</p></div>

${cm1Lecon(3, 'Angles aigus et angles obtus')}
<div class="figure-wrap" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
<div style="text-align:center;">${angleSVG(40, { w: 190, coul: '#2EA8C9' })}<div><b style="color:#2EA8C9;">angle aigu</b></div></div>
<div style="text-align:center;">${angleSVG(90, { w: 190, coul: '#2E9C6A' })}<div><b style="color:#2E9C6A;">angle droit</b></div></div>
<div style="text-align:center;">${angleSVG(130, { w: 220, ox: 110, coul: '#7A4FC0' })}<div><b style="color:#7A4FC0;">angle obtus</b></div></div></div>
${cm1Def('<ul style="margin:0;padding-left:18px;line-height:1.9;"><li>Un angle <b>aigu</b> est plus petit qu\'un angle droit.</li><li>Un angle <b>obtus</b> est plus grand qu\'un angle droit (mais ses côtés ne sont pas alignés).</li></ul>', 'Vocabulaire')}

${ce2AnimAngle('cm1-an-angle')}

${cm1Lecon(4, 'Comparer des angles')}
${cm1Regle('Pour comparer deux angles, on peut <b>reproduire</b> l\'un sur un papier calque (ou fabriquer un <b>gabarit</b> en papier) et le <b>superposer</b> à l\'autre, en faisant coïncider les sommets et un côté. L\'angle le plus grand est celui dont l\'écartement est le plus grand.')}
${cm1Exemple('Angles dans les figures :', ['un carré et un rectangle ont 4 angles droits ;', 'un triangle rectangle a un angle droit ;', 'dans un triangle, il y a au plus un angle obtus.'])}
`,
  methode: `
${cm1Demo('an-classer', 'Classer un angle avec l\'équerre', 'Comment savoir si un angle est aigu, droit ou obtus ?')}
${cm1Sous('A', 'Atelier : ouvre l\'angle')}
<div class="figure-wrap" style="text-align:center;"><div id="an-fig"></div><input type="range" min="10" max="170" step="5" value="60" oninput="cm1AnMaj(this.value)" style="width:260px;max-width:90%;"><p id="an-txt" style="margin:6px 0 0;"></p>
<p class="hint">Fais glisser le curseur : trouve la position exacte de l'angle droit.</p></div>
`,
  demos: [
    ['an-classer', [
      { expr: 'Je place le coin de l\'équerre sur le sommet.', note: 'Le coin de l\'équerre est un angle droit : il sert de référence.' },
      { expr: 'Un bord de l\'équerre le long d\'un côté.', note: 'On aligne soigneusement un bord de l\'équerre avec un côté de l\'angle.' },
      { expr: 'L\'autre côté est-il le long de l\'autre bord ?', note: 'On regarde où se trouve le deuxième côté de l\'angle.' },
      { expr: 'dedans → aigu · le long → droit · dehors → obtus', note: 'Si le côté est à l\'intérieur de l\'équerre, l\'angle est aigu ; s\'il est le long du bord, il est droit ; s\'il est à l\'extérieur, il est obtus.' },
    ]],
  ],
  exos: cm1Exos('an', [
    [`Ces angles sont-ils aigus, droits ou obtus ?<div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0;">${[110, 25, 90, 70, 150].map((d, i) => `<div style="text-align:center;">${angleSVG(d, { w: 170, h: 130, ox: d > 90 ? 95 : 35, oy: 115, L: 75, coul: '#1F3A5C' })}<div><b>${'ABCDE'[i]}</b></div></div>`).join('')}</div>`,
      cm1Redac('Nature des angles', { suite: ['A : plus grand qu\'un angle droit, obtus', 'B : plus petit qu\'un angle droit, aigu', 'C : exactement sur le coin de l\'équerre, droit', 'D : plus petit qu\'un angle droit, aigu', 'E : plus grand qu\'un angle droit, obtus'] }, 'Les angles B et D sont aigus, l\'angle C est droit, les angles A et E sont obtus.')],
    ['Combien d\'angles droits a un rectangle ? et un carré ?',
      cm1Redac('Angles droits', { suite: ['rectangle : 4 angles droits', 'carré : 4 angles droits'] }, 'Un rectangle et un carré ont chacun 4 angles droits.')],
    ['Trace un angle aigu, un angle droit et un angle obtus. Vérifie chacun avec ton équerre.',
      cm1Redac('Vérification avec l\'équerre', { suite: ['l\'angle aigu tient à l\'intérieur du coin de l\'équerre ;', 'l\'angle droit est exactement sur le coin ;', 'l\'angle obtus dépasse le coin.'] }, 'Chaque angle est bien classé.')],
    ['Cherche dans la classe un angle droit, un angle aigu et un angle obtus.',
      cm1Redac('Angles de la classe', '', 'Par exemple : le coin d\'une feuille forme un angle droit ; les aiguilles d\'une horloge à 1 h, un angle aigu ; un livre bien ouvert, un angle obtus.')],
    [`Les aiguilles d'une horloge forment-elles un angle aigu, droit ou obtus ?${cm1Liste(['à 3 h', 'à 5 h', 'à 2 h'])}`,
      cm1Redac('Angles des aiguilles', { suite: ['3 h : un quart de tour, angle droit', '5 h : plus qu\'un quart de tour, angle obtus', '2 h : moins qu\'un quart de tour, angle aigu'] }, 'À 3 h l\'angle est droit, à 5 h il est obtus, à 2 h il est aigu.')],
    ['Vrai ou faux ? « Si je prolonge les côtés d\'un angle, l\'angle devient plus grand. »',
      cm1Redac('Réponse', 'La taille d\'un angle dépend seulement de l\'écartement de ses côtés.', 'Faux : prolonger les côtés ne change pas l\'angle.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : l\'équerre des bâtisseurs', [
    'Dès l\'Antiquité, les bâtisseurs avaient besoin d\'angles droits pour que les murs tiennent debout. Les Égyptiens utilisaient une corde à <b>13 nœuds</b> régulièrement espacés : en formant un triangle de côtés 3, 4 et 5 intervalles, ils obtenaient un angle droit parfait !',
    'Le mot « angle » vient du latin <i>angulus</i>, qui veut dire « coin ». Et « aigu » veut dire « pointu », comme une aiguille ; « obtus » veut dire « émoussé », qui ne pique pas.',
  ]),
  quiz: [
    { q: 'Un angle plus petit qu\'un angle droit est…', opts: ['aigu', 'obtus', 'plat'], correct: 0 },
    { q: 'Quel instrument permet de vérifier un angle droit ?', opts: ['le compas', 'l\'équerre', 'la règle'], correct: 1 },
    { q: 'Le point de départ des deux côtés d\'un angle s\'appelle…', opts: ['le centre', 'le sommet', 'le milieu'], correct: 1 },
  ],
  init: () => { const r = document.querySelector('#methode-demo-cm1-angles input[type=range]'); cm1AnMaj(r ? r.value : 60); },
});
})();

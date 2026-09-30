/* ============================================================
   CHAPITRE : Programmes de construction (CM2, G3, période 4)
   Programme du cycle 3 (CM2) : construire une figure composée de segments, droites, polygones
   usuels et cercles ; suivre et ÉLABORER un programme de construction (dans des cas simples) --
   ce travail contribue à la pensée informatique ; utiliser règle, équerre, compas ; notations
   toujours explicitées (« trace le segment [AB] »).
   ============================================================ */
(() => {
const k = 36; // 1 cm = 36 px
const T = (x, y, t) => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#1F3A5C" font-family="Space Grotesk">${t}</text>`;
function figure(etape){
  const A = [40, 150], B = [40 + 5 * k, 150], C = [40 + 5 * k, 150 - 3 * k], D = [40, 150 - 3 * k], I = [40 + 2.5 * k, 150];
  let s = `<svg viewBox="-60 20 400 230" style="width:100%;max-width:400px;display:block;margin:0 auto;">`;
  if(etape >= 1) s += `<line x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}" stroke="#1F3A5C" stroke-width="2.2"/>${T(A[0] - 16, A[1] + 16, 'A')}${T(B[0] + 4, B[1] + 16, 'B')}`;
  if(etape >= 2) s += `<line x1="${B[0]}" y1="${B[1]}" x2="${C[0]}" y2="${C[1]}" stroke="#1F3A5C" stroke-width="2.2"/><polyline points="${B[0] - 11},${B[1]} ${B[0] - 11},${B[1] - 11} ${B[0]},${B[1] - 11}" fill="none" stroke="#E35D3A" stroke-width="1.6"/>${T(C[0] + 4, C[1] - 2, 'C')}`;
  if(etape >= 3) s += `<polyline points="${C[0]},${C[1]} ${D[0]},${D[1]} ${A[0]},${A[1]}" fill="none" stroke="#1F3A5C" stroke-width="2.2"/>${T(D[0] - 16, D[1] - 2, 'D')}`;
  if(etape >= 4) s += `<circle cx="${I[0]}" cy="${I[1]}" r="3.5" fill="#E35D3A"/>${T(I[0] - 4, I[1] + 18, 'I')}`;
  if(etape >= 5) s += `<circle cx="${A[0]}" cy="${A[1]}" r="${2.5 * k}" fill="none" stroke="#2EA8C9" stroke-width="2"/>`;
  return s + '</svg>';
}
const PROG = ['Trace le segment [AB] de 5 cm.', 'Trace la droite perpendiculaire au segment [AB] passant par B, et place le point C sur cette droite à 3 cm de B.', 'Termine le rectangle ABCD.', 'Place le point I, milieu du segment [AB].', 'Trace le cercle de centre A qui passe par I.'];
cm1Chapitre({
  niveau: 'cm2', titre: 'Programmes de construction', slug: 'programmes-construction',
  cours: `
${cm1Lecon(1, 'Qu\'est-ce qu\'un programme de construction ?')}
${cm1Def('Un <b>programme de construction</b> est une suite d\'<b>instructions</b> numérotées, dans l\'ordre, qui permettent à quelqu\'un de construire une figure <b>sans la voir</b>. Chaque instruction utilise le vocabulaire de la géométrie et précise les mesures.')}
${cm1Exemple('Exemple :', PROG.map((p, i) => `<b>${i + 1}.</b> ${p}`))}
<div class="figure-wrap">${figure(5)}</div>

${cm1Lecon(2, 'Le vocabulaire des instructions')}
${cm1Tableau(['Verbe', 'Exemple', 'Instrument'], [
  ['Trace', 'Trace le segment [EF] de 4 cm. · Trace la droite (EF).', 'règle (graduée)'],
  ['Place', 'Place le point M sur le segment [EF] à 1 cm de E. · Place le milieu I du segment [EF].', 'règle graduée'],
  ['Trace la perpendiculaire / la parallèle', 'Trace la droite perpendiculaire à la droite (d) passant par A.', 'équerre (et règle)'],
  ['Trace le cercle', 'Trace le cercle de centre O et de rayon 2 cm. · … qui passe par le point P.', 'compas'],
  ['Code', 'Code les angles droits et les longueurs égales.', '—'],
], { coul: '#2EA8C9' })}
${cm1Astuce('Un bon programme est <b>précis</b> (toutes les mesures sont données), <b>ordonné</b> (on ne peut pas utiliser un point avant de l\'avoir placé) et <b>complet</b> (rien ne manque pour refaire exactement la figure).')}

${cm1Lecon(3, 'Écrire un programme')}
${cm1Regle('Pour écrire le programme d\'une figure : on observe la figure, on repère par quoi commencer (souvent le plus grand segment), on décrit chaque étape avec un verbe d\'action, puis on <b>teste</b> son programme en le donnant à quelqu\'un d\'autre.')}
`,
  methode: `
${cm1Sous('M', 'Suivre le programme pas à pas')}
<div class="figure-wrap"><div id="c2pc-fig"></div><p id="c2pc-txt" style="text-align:center;min-height:44px;margin:8px 0;"></p>
<div class="figure-toolbar"><button class="btn" onclick="c2PcPas(1)">Étape suivante →</button><button class="btn secondary" onclick="c2PcPas(-99)">Recommencer</button></div></div>
${cm1Demo('c2-pc-ecrire', 'Écrire le programme d\'un triangle isocèle', 'Écris un programme pour construire un triangle EFG isocèle en E, avec FG = 4 cm et EF = EG = 5 cm.')}
`,
  demos: [
    ['c2-pc-ecrire', [
      { expr: '1. Trace le segment [FG] de 4 cm.', note: 'On commence par la base, dont on connaît la longueur.' },
      { expr: '2. Trace un arc de cercle de centre F et de rayon 5 cm.', note: 'E est à 5 cm de F.' },
      { expr: '3. Trace un arc de cercle de centre G et de rayon 5 cm. E est l\'intersection des deux arcs.', note: 'E est aussi à 5 cm de G.' },
      { expr: '4. Trace les segments [EF] et [EG], puis code les longueurs égales.', note: 'On relit le programme : il est précis, ordonné et complet.' },
    ]],
  ],
  exos: cm1Exos('c2pc', [
    ['Suis ce programme : 1. Trace un segment [RS] de 6 cm. 2. Place le milieu M du segment [RS]. 3. Trace le cercle de centre M qui passe par R. Que remarques-tu pour le point S ?', 'Le cercle passe aussi par S : [RS] est un diamètre du cercle (rayon 3 cm).'],
    ['Suis ce programme : 1. Trace un carré ABCD de 4 cm de côté. 2. Trace ses diagonales ; elles se coupent en O. 3. Trace le cercle de centre O qui passe par A.', 'Le cercle passe par les 4 sommets du carré.'],
    ['Ce programme est-il complet ? « 1. Trace un segment [AB]. 2. Trace un cercle de centre A. »', 'Non : il manque la longueur du segment et le rayon du cercle.'],
    ['Remets dans l\'ordre : a) Trace le segment [AC]. b) Trace le segment [AB] de 5 cm. c) Place le point C à 3 cm de B sur la perpendiculaire au segment [AB] passant par B.', 'b, c, a (triangle rectangle en B).'],
    ['Écris un programme pour construire un rectangle de 6 cm sur 2 cm avec ses diagonales.', 'Par exemple : 1. Trace le segment [AB] de 6 cm. 2. Trace les perpendiculaires au segment [AB] en A et en B. 3. Place D et C à 2 cm de A et de B, du même côté. 4. Trace le segment [DC]. 5. Trace les diagonales [AC] et [BD].'],
    ['Écris un programme pour construire deux cercles de même centre O, de rayons 2 cm et 4 cm.', '1. Place un point O. 2. Trace le cercle de centre O et de rayon 2 cm. 3. Trace le cercle de centre O et de rayon 4 cm.'],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : construire à la règle et au compas', [
    'Les géomètres grecs n\'utilisaient que deux outils : la <b>règle</b> (sans graduations !) et le <b>compas</b>. Dans les <i>Éléments</i>, Euclide décrit chaque construction comme un programme : « Sur une droite donnée, construire un triangle équilatéral… ».',
    'Ils se sont posé des défis restés célèbres, comme couper un angle en trois parts égales à la règle et au compas. On a prouvé en 1837 que c\'est impossible !',
  ]),
  quiz: [
    { q: 'Pour tracer un cercle, on utilise…', opts: ['l\'équerre', 'le compas', 'le rapporteur'], correct: 1 },
    { q: 'Un programme de construction doit être…', opts: ['court', 'précis et ordonné', 'dessiné'], correct: 1 },
    { q: '« Trace la droite perpendiculaire à… » : quel instrument ?', opts: ['l\'équerre', 'le compas', 'aucun'], correct: 0 },
  ],
  init: () => c2PcPas(-99),
});
let pc = 0;
window.c2PcPas = d => { pc = Math.max(0, Math.min(5, pc + d)); const f = document.getElementById('c2pc-fig'), t = document.getElementById('c2pc-txt'); if(f) f.innerHTML = figure(pc); if(t) t.innerHTML = pc ? `<b>Instruction ${pc}.</b> ${PROG[pc - 1]}` : 'Clique sur « Étape suivante » pour exécuter la première instruction.'; };
})();

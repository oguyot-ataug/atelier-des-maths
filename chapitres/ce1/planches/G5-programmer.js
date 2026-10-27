/* CE1 · Planches : Programmer des déplacements (G5) -- flèches (rappel) puis robot-tortue (avance, tourne). */
(() => {
const { lig, cadre } = PCP, B = P3.B, R = P3.R, C = 40;
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const tortue = (x, y, d, pale) => `<g transform="translate(${3 + x * C + C / 2} ${3 + y * C + C / 2}) rotate(${d * 90})"${pale ? ' opacity=".35"' : ''}><circle r="13" fill="#3E9B4F" stroke="#1F5C2E" stroke-width="2"/><polygon points="0,-19 -7,-10 7,-10" fill="#1F5C2E"/><circle cx="-5" cy="-6" r="2.3" fill="#fff"/><circle cx="5" cy="-6" r="2.3" fill="#fff"/></g>`;
// Exécute un programme de tortue (A, G, D) : liste des positions [x, y, d].
const executer = (x, y, d, prog) => { const L = [[x, y, d]]; prog.split('').forEach(c => { let [a, b, e] = L[L.length - 1]; if(c === 'A'){ a += DIR[e][0]; b += DIR[e][1]; } else e = (e + (c === 'D' ? 1 : 3)) % 4; L.push([a, b, e]); }); return L; };
// Quadrillage : o.but (étoile), o.dep [x, y, d] (tortue) ou o.point [x, y] (départ des flèches), o.chemin (liste de cases).
function grille(o){
  const nc = o.nc || 5, nr = o.nr || 4; let s = `<rect x="3" y="3" width="${nc * C}" height="${nr * C}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
  for(let c = 1; c < nc; c++) s += `<line x1="${3 + c * C}" y1="3" x2="${3 + c * C}" y2="${3 + nr * C}" stroke="#9FB0C4"/>`;
  for(let r = 1; r < nr; r++) s += `<line x1="3" y1="${3 + r * C}" x2="${3 + nc * C}" y2="${3 + r * C}" stroke="#9FB0C4"/>`;
  if(o.but) s += CP_ICO.etoile(3 + o.but[0] * C + C / 2, 3 + o.but[1] * C + C / 2);
  if(o.chemin) s += `<polyline points="${o.chemin.map(([c, r]) => `${3 + c * C + C / 2},${3 + r * C + C / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4"/>`;
  if(o.point) s += `<circle cx="${3 + o.point[0] * C + C / 2}" cy="${3 + o.point[1] * C + C / 2}" r="9" fill="${CPC.jeton}"/>`;
  if(o.dep) s += tortue(...o.dep, !!o.fin);
  if(o.fin) s += tortue(...o.fin);
  return cpSvg(nc * C + 6, nr * C + 6, s, o.px || 190);
}
const tortueEx = (nc, nr, dep, prog, but) => { const L = executer(...dep, prog);
  return { eleve: lig(grille({ nc, nr, dep, but })) + lig(ce1Instr(prog)), corr: lig(grille({ nc, nr, dep, but, chemin: L.map(([x, y]) => [x, y]), fin: L[L.length - 1] })) + lig(ce1Instr(prog)) }; };
PLANCHES['ce1|Programmer des déplacements'] = [
  { titre: 'Rappel : les flèches', duree: '20 min',
    attendus: ['Coder et décoder un déplacement avec des flèches'],
    exos: [
      { etoiles: 1, consigne: 'Écris avec des flèches le chemin du point rouge jusqu\'à l\'étoile.', eleve: lig(grille({ point: [0, 3], but: [3, 1] })) + lig(cadre(50)), corr: lig(grille({ point: [0, 3], but: [3, 1], chemin: cpSuivre([0, 3], 'dddhh') })) + lig(cpCode('dddhh')) },
      { etoiles: 2, consigne: 'Suis le code depuis le point rouge et dessine une étoile à l\'arrivée.', eleve: lig(grille({ point: [1, 0] })) + lig(cpCode('bbddhg')), corr: lig(grille({ point: [1, 0], chemin: cpSuivre([1, 0], 'bbddhg'), but: [2, 1] })) + lig(cpCode('bbddhg')) },
    ] },
  { titre: 'Avancer et tourner', duree: '25 min',
    attendus: ['Exécuter un programme avec « avance », « tourne à gauche », « tourne à droite »'],
    exos: [
      { etoiles: 1, col: 1, consigne: 'Complète.', ...P3.rmp([['Le robot regarde vers le haut. Il tourne à droite : il regarde vers @.', 'la droite'], ['Le robot regarde vers la droite. Il tourne à gauche : il regarde vers @.', 'le haut'], ['Le robot regarde vers le bas. Il tourne à droite : il regarde vers @.', 'la gauche']], 4) },
      { etoiles: 2, consigne: 'La tortue suit le programme. Dessine une croix sur sa case d\'arrivée.', ...tortueEx(5, 4, [0, 3, 1], 'AAGAA') },
      { etoiles: 3, consigne: 'La tortue suit le programme. Dessine une croix sur sa case d\'arrivée.', ...tortueEx(5, 4, [1, 0, 2], 'AADAGA') },
    ] },
  { titre: 'Écrire et corriger un programme', duree: '25 min',
    attendus: ['Écrire un programme pour atteindre une case', 'Trouver et corriger une erreur (déboguer)'],
    exos: [
      { etoiles: 2, consigne: 'Écris un programme pour amener la tortue sur l\'étoile (avance, tourne à gauche, tourne à droite).', eleve: lig(grille({ dep: [0, 3, 0], but: [2, 1] })) + lig(cadre(50)),
        corr: lig(grille({ dep: [0, 3, 0], but: [2, 1], chemin: executer(0, 3, 0, 'AADAA').map(([x, y]) => [x, y]), fin: [2, 1, 1] })) + lig(ce1Instr('AADAA')) + lig('<i>D\'autres programmes sont possibles.</i>') },
      { etoiles: 3, consigne: 'Ce programme devait amener la tortue sur l\'étoile. Entoure l\'instruction fausse.', eleve: lig(grille({ dep: [0, 3, 1], but: [3, 1] })) + lig(ce1Instr('AAADAA')),
        corr: lig(grille({ dep: [0, 3, 1], but: [3, 1], chemin: executer(0, 3, 1, 'AAAGAA').map(([x, y]) => [x, y]), fin: [3, 1, 0] })) + lig(ce1Instr('AAADAA', 3)) + lig('Il faut <b>tourner à gauche</b> pour monter vers l\'étoile.') },
    ] },
];
})();

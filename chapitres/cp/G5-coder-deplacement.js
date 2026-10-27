/* ============================================================
   CHAPITRE : Coder un déplacement (CP, G5, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CP, espace et géométrie et initiation à
   la pensée informatique : coder et décoder un déplacement sur quadrillage avec des flèches,
   écrire un programme pour aller d'une case à une autre en évitant des obstacles, comparer des
   programmes (plusieurs sont possibles, le plus court), trouver et corriger une erreur (« déboguer »).
   Pensé pour être projeté : le robot qui exécute le programme, et qui se cogne s'il est faux.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
// Quadrillage avec robot, étoile et murs (dessin fixe).
function plateau(nc, nr, dep, but, murs, o){
  o = o || {}; const C = 36; let s = `<rect x="3" y="3" width="${nc * C}" height="${nr * C}" fill="#fff" stroke="${CPC.bord}" stroke-width="2"/>`;
  for(let c = 1; c < nc; c++) s += `<line x1="${3 + c * C}" y1="3" x2="${3 + c * C}" y2="${3 + nr * C}" stroke="#9FB0C4"/>`;
  for(let r = 1; r < nr; r++) s += `<line x1="3" y1="${3 + r * C}" x2="${3 + nc * C}" y2="${3 + r * C}" stroke="#9FB0C4"/>`;
  (murs || []).forEach(([c, r]) => { s += `<rect x="${5 + c * C}" y="${5 + r * C}" width="${C - 4}" height="${C - 4}" fill="#8A8F98"/>`; });
  if(o.chemin) s += `<polyline points="${o.chemin.map(([c, r]) => `${3 + c * C + C / 2},${3 + r * C + C / 2}`).join(' ')}" fill="none" stroke="${CE2C.violet}" stroke-width="3" stroke-dasharray="6 4"/>`;
  if(but) s += CP_ICO.etoile(3 + but[0] * C + C / 2, 3 + but[1] * C + C / 2);
  const [rx, ry] = [3 + dep[0] * C + C / 2, 3 + dep[1] * C + C / 2];
  s += `<rect x="${rx - 12}" y="${ry - 11}" width="24" height="20" rx="5" fill="#2EA8C9" stroke="${CPC.bord}" stroke-width="1.5"/><circle cx="${rx - 5}" cy="${ry - 3}" r="2.6" fill="#fff"/><circle cx="${rx + 5}" cy="${ry - 3}" r="2.6" fill="#fff"/>`;
  return cpSvg(nc * C + 6, nr * C + 6, s, o.px);
}
const MURS1 = [[2, 1], [2, 2], [2, 3], [4, 0], [4, 1]];

cm1Chapitre({
  niveau: 'cp', titre: 'Coder un déplacement', slug: 'coder-deplacement',
  cours: `
${cm1Lecon(1, 'Un programme de flèches')}
${cm1Def(`Un <b>programme</b>, c'est une suite d'instructions qu'on suit <b>dans l'ordre</b>, une par une. Chaque flèche fait avancer le robot d'<b>une case</b>.${lig(cpFleche('d'), cpFleche('g'), cpFleche('h'), cpFleche('b'))}`, 'Programmer')}
${cpAnimRobot('cp-g5-robot', { presets: [
  { nom: 'Programme 1', nc: 6, nr: 4, dep: [0, 3], but: [5, 0], code: 'dddddhhh' },
  { nom: 'Programme 2', nc: 6, nr: 4, dep: [0, 3], but: [5, 0], code: 'hhhddddd' },
  { nom: 'Avec des murs', nc: 7, nr: 5, dep: [0, 4], but: [6, 0], murs: MURS1, code: 'dddddhhhhd' }] })}
${cm1Regle('Pour aller au même endroit, il y a souvent <b>plusieurs programmes</b> possibles. Les programmes 1 et 2 arrivent tous les deux sur l\'étoile.')}

${cm1Lecon(2, 'Éviter les obstacles')}
${cm1Def(`${lig(plateau(7, 5, [0, 4], [6, 0], MURS1))}${P('Le robot ne peut pas passer sur les murs gris : il faut les contourner.')}`, 'Les murs')}
${cm1Astuce('Avant d\'écrire le programme, on trace le chemin avec le doigt, puis on écrit une flèche pour chaque case.')}

${cm1Lecon(3, 'Trouver l\'erreur')}
${cpAnimRobot('cp-g5-bug', { legende: 'Ce programme a une erreur : où le robot se cogne-t-il ? Quelle flèche faut-il changer ?', presets: [
  { nom: 'Le programme faux', nc: 6, nr: 4, dep: [0, 1], but: [5, 1], murs: [[3, 1], [3, 2]], code: 'ddddd' },
  { nom: 'Le programme corrigé', nc: 6, nr: 4, dep: [0, 1], but: [5, 1], murs: [[3, 1], [3, 2]], code: 'ddhdddb' }] })}
${cm1Regle('Quand un programme ne marche pas, on cherche la flèche qui pose problème et on la corrige : c\'est <b>déboguer</b>. Les informaticiens font cela tous les jours !')}

${cm1Lecon(4, 'Le programme le plus court')}
${cm1Regle(`Pour aller du robot à l'étoile, le programme le plus court n'a que les flèches nécessaires.${lig(plateau(5, 3, [0, 2], [3, 0], [], { chemin: cpSuivre([0, 2], 'dddhh') }))}${P(`${cpCode('dddhh')} : 5 flèches. Impossible de faire plus court !`)}`)}
${cm1Rem('Au tableau ou dans la cour : un élève « robot », un élève « programmeur » qui montre les cartes-flèches. On peut aussi utiliser un petit robot de sol programmable.')}
`,
  methode: `
${cm1Demo('cp-g5-m-ecrire', 'Écrire un programme', 'Écris le programme pour que le robot aille sur l\'étoile.')}
${cm1Demo('cp-g5-m-debug', 'Corriger un programme', 'Le programme ci-dessous ne va pas sur l\'étoile. Corrige-le.')}
`,
  demos: [
    ['cp-g5-m-ecrire', [
      { expr: 'Je trace le chemin avec le doigt.', note: 'J\'évite le mur.', fig: plateau(5, 3, [0, 2], [4, 0], [[2, 2]]) },
      { expr: `${cpCode('h')} puis ${cpCode('dddd')}`, note: 'Je monte d\'une case pour passer au-dessus du mur, puis 4 cases à droite.', fig: plateau(5, 3, [0, 2], [4, 0], [[2, 2]], { chemin: cpSuivre([0, 2], 'hdddd') }) },
      { expr: `${cpCode('hddddh')}`, note: 'Encore une case vers le haut : le robot arrive sur l\'étoile.', fig: plateau(5, 3, [0, 2], [4, 0], [[2, 2]], { chemin: cpSuivre([0, 2], 'hddddh') }) },
    ]],
    ['cp-g5-m-debug', [
      { expr: `${cpCode('dddh')}`, note: 'Je suis le programme avec le doigt.', fig: plateau(5, 3, [0, 2], [3, 0], [], { chemin: cpSuivre([0, 2], 'dddh') }) },
      { expr: 'Le robot s\'arrête juste sous l\'étoile.', note: 'Il manque une flèche vers le haut.' },
      { expr: `${cpCode('dddhh')}`, note: 'J\'ajoute la flèche qui manque : le robot arrive sur l\'étoile.', fig: plateau(5, 3, [0, 2], [3, 0], [], { chemin: cpSuivre([0, 2], 'dddhh') }) },
    ]],
  ],
  exos: cm1Exos('cp-g5', [
    [`Où arrive le robot avec ce programme ? ${cpCode('ddbb')}${lig(plateau(5, 4, [0, 0], null, []))}`,
      cm1Redac('Arrivée du robot', '', 'Deux cases à droite, puis deux cases en bas : le robot arrive dans la 3<sup>e</sup> colonne, 3<sup>e</sup> ligne.', plateau(5, 4, [2, 2], null, [], { chemin: cpSuivre([0, 0], 'ddbb'), px: 140 }))],
    [`Écris un programme pour aller sur l'étoile.${lig(plateau(5, 3, [0, 0], [3, 2], []))}`,
      cm1Redac('Un programme', cpCode('dddbb'), 'Trois cases à droite, puis deux en bas (on peut aussi descendre d\'abord).', plateau(5, 3, [0, 0], [3, 2], [], { chemin: cpSuivre([0, 0], 'dddbb'), px: 150 }))],
    [`Écris un programme pour aller sur l'étoile sans toucher les murs.${lig(plateau(5, 4, [0, 3], [4, 3], [[2, 2], [2, 3]]))}`,
      cm1Redac('Contourner le mur', cpCode('hhddddbb'), 'Je monte de 2 cases, je passe au-dessus du mur (4 cases à droite), puis je redescends de 2 cases.', plateau(5, 4, [0, 3], [4, 3], [[2, 2], [2, 3]], { chemin: cpSuivre([0, 3], 'hhddddbb'), px: 150 }))],
    [`Ce programme est faux : ${cpCode('dddd')}. Pourquoi ?${lig(plateau(5, 2, [0, 0], [4, 0], [[2, 0]]))}`,
      cm1Redac('L\'erreur', '', 'À la deuxième flèche, le robot arriverait sur le mur. Il faut contourner, par exemple : descendre, avancer de 4, remonter.', plateau(5, 2, [0, 0], [4, 0], [[2, 0]], { chemin: cpSuivre([0, 0], 'bddddh'), px: 150 }))],
    ['Le robot doit aller 3 cases à droite puis 2 cases en haut. Écris le programme.',
      cm1Redac('Le programme', cpCode('dddhh'), 'Trois flèches vers la droite, deux flèches vers le haut.')],
    [`Combien de flèches a le programme le plus court pour aller sur l'étoile ?${lig(plateau(6, 3, [0, 2], [4, 0], []))}`,
      cm1Redac('Le plus court', '4 + 2 = 6', '4 cases à droite et 2 en haut : 6 flèches.')],
    [`Lina écrit ${cpCode('ddhdh')} et Tom écrit ${cpCode('hhddd')}. Arrivent-ils au même endroit ?`,
      cm1Redac('Lina et Tom', { suite: ['Lina : 3 à droite, 2 en haut', 'Tom : 3 à droite, 2 en haut'] }, 'Oui : les deux programmes font 3 cases à droite et 2 cases en haut. Ils arrivent au même endroit par des chemins différents.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : les premiers programmes', [
    'En 1801, le Français <b>Joseph-Marie Jacquard</b> a inventé un métier à tisser qui suivait un <b>programme</b> écrit sur des cartes percées de trous : le métier tissait tout seul de très beaux dessins.',
    'Plus tard, <b>Ada Lovelace</b>, une mathématicienne anglaise, a écrit vers 1843 ce que l\'on considère comme le premier programme pour une machine à calculer. Aujourd\'hui, les ordinateurs, les téléphones et les robots suivent tous des programmes !',
  ]),
  quiz: [
    { q: 'Un programme se lit…', opts: ['dans l\'ordre, une instruction après l\'autre', 'en commençant par la fin', 'au hasard'], correct: 0 },
    { q: `${cpCode('dd')} fait avancer le robot de…`, opts: ['1 case', '2 cases', '4 cases'], correct: 1 },
    { q: 'Corriger un programme qui ne marche pas, c\'est…', opts: ['déboguer', 'dessiner', 'compter'], correct: 0 },
  ],
  flash: [
    { l: 1, q: `Que fait ${cpCode('b')} ?`, r: ['Une case en bas', 'Une case en haut', 'Deux cases', 'Rien'], ok: 0 },
    { l: 1, q: `Combien de cases avance le robot ? ${cpCode('ddd')}`, r: ['1', '3', '6', '0'], ok: 1 },
    { l: 2, q: 'Le robot peut-il passer sur un mur ?', r: ['Oui', 'Non', 'Parfois', 'Seulement en haut'], ok: 1 },
    { l: 4, q: `Le plus court : 2 à droite, 3 en haut. Combien de flèches ?`, r: ['5', '6', '23', '3'], ok: 0 },
  ],
});
})();

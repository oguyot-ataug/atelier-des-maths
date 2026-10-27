/* ============================================================
   CHAPITRE : Programmer des déplacements (CE1, G5, période 5)
   Programme du cycle 2 (BO n° 41 du 31 octobre 2024), partie CE1, espace et géométrie et initiation à
   la pensée informatique : coder un déplacement avec des flèches (rappel du CP), puis programmer un
   robot qui avance et tourne sur place (quart de tour à gauche, à droite : déplacements relatifs) ;
   lire, écrire, exécuter et corriger un programme ; repérer une suite d'instructions qui se répète.
   Pensé pour être projeté : la tortue qui avance et tourne, instruction après instruction.
   ============================================================ */
(() => {
const lig = (...l) => `<div class="cpn-rang">${l.join('')}</div>`;
const P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;

cm1Chapitre({
  niveau: 'ce1', titre: 'Programmer des déplacements', slug: 'programmer',
  cours: `
${cm1Lecon(1, 'Rappel : les flèches')}
${cpAnimRobot('ce1-g5-fleches', { presets: [
  { nom: 'Avec des flèches', nc: 6, nr: 4, dep: [0, 3], but: [5, 0], murs: [[2, 2], [2, 3], [4, 0], [4, 1]], code: 'hhdddbddhh' }] })}
${cm1Regle('Avec des flèches, on dit toujours dans quelle direction aller, comme sur une carte : en haut, en bas, à droite, à gauche.')}

${cm1Lecon(2, 'Avancer et tourner')}
${cm1Def(`Un robot comprend trois instructions :${lig(ce1Instr('AGD'))}${cm1Liste(['<b>avance</b> : il fait un pas devant lui (une case) ;', '<b>tourne à gauche</b> : il fait un quart de tour sur place, vers sa gauche ;', '<b>tourne à droite</b> : il fait un quart de tour sur place, vers sa droite.'])}`, 'Les instructions')}
${ce1AnimTortue('ce1-g5-tortue', { presets: [
  { nom: 'Programme 1', nc: 6, nr: 5, dep: [0, 4], dir: 1, but: [3, 1], prog: 'AAAGAAA' },
  { nom: 'Programme 2', nc: 6, nr: 5, dep: [0, 4], dir: 0, but: [3, 1], prog: 'AAADAAA' },
  { nom: 'Un carré', nc: 6, nr: 5, dep: [1, 3], dir: 0, prog: 'AADAADAADAAD', fin: 'La tortue est revenue à son point de départ : elle a tracé un carré !' }] })}
${cm1Astuce('Pour savoir de quel côté tourner, on se met à la place du robot (on peut tourner la feuille, ou se lever et faire le robot !).')}

${cm1Lecon(3, 'Des instructions qui se répètent')}
${cm1Regle(`Pour tracer un carré, la tortue répète 4 fois : ${ce1Instr('AAD')}${P('On peut l\'écrire plus court : <b>répéter 4 fois</b> [avance, avance, tourne à droite].')}`, 'Répéter')}
${cm1Rem('Sur ordinateur ou tablette (logiciels de programmation par blocs), on assemble ces instructions comme des pièces de puzzle. Les petits robots de sol fonctionnent de la même façon.')}

${cm1Lecon(4, 'Trouver et corriger l\'erreur')}
${cm1Regle('Quand le robot n\'arrive pas au bon endroit, on exécute le programme pas à pas, avec le doigt, pour trouver l\'instruction fautive : c\'est <b>déboguer</b>.')}
`,
  methode: `
${cm1Demo('ce1-g5-m-executer', 'Exécuter un programme', 'La tortue regarde vers la droite. Où arrive-t-elle avec : avance, avance, tourne à gauche, avance ?')}
${cm1Demo('ce1-g5-m-ecrire', 'Écrire un programme', 'La tortue regarde vers le haut. Fais-la aller 2 cases à droite.')}
`,
  demos: [
    ['ce1-g5-m-executer', [
      { expr: 'avance, avance', note: 'Elle regarde à droite : 2 cases vers la droite.' },
      { expr: 'tourne à gauche', note: 'Elle reste sur sa case, mais regarde maintenant vers le haut.' },
      { expr: 'avance', note: 'Une case vers le haut. Elle est arrivée.' },
    ]],
    ['ce1-g5-m-ecrire', [
      { expr: 'Elle regarde vers le haut : il faut d\'abord la tourner.', note: 'Pour regarder à droite : un quart de tour à droite.' },
      { expr: `${ce1Instr('D')}`, note: 'tourne à droite' },
      { expr: `${ce1Instr('DAA')}`, note: 'puis avance, avance : le programme est écrit.' },
    ]],
  ],
  exos: cm1Exos('ce1-g5', [
    ['La tortue regarde vers la droite. Elle exécute : avance, avance, avance. Où est-elle ?',
      cm1Redac('La tortue', '', 'Elle a avancé de 3 cases vers la droite et regarde toujours vers la droite.')],
    ['La tortue regarde vers le haut. Elle tourne à droite. Vers où regarde-t-elle ?',
      cm1Redac('Le quart de tour', '', 'Elle regarde vers la droite.')],
    ['La tortue regarde vers le haut. Elle tourne à gauche deux fois. Vers où regarde-t-elle ?',
      cm1Redac('Deux quarts de tour', '', 'Après deux quarts de tour, elle a fait un demi-tour : elle regarde vers le bas.')],
    ['Écris un programme pour que la tortue, qui regarde vers la droite, avance de 2 cases puis monte d\'une case.',
      cm1Redac('Le programme', ce1Instr('AAGA'), 'Avance, avance, tourne à gauche, avance.')],
    ['Combien de fois faut-il répéter [avance, tourne à droite] pour revenir au départ ?',
      cm1Redac('Répéter', '', 'Il faut le répéter 4 fois : la tortue fait le tour d\'un carré d\'une case de côté.')],
    ['Ce programme devait tracer un carré : avance, tourne à droite, avance, tourne à droite, avance, tourne à gauche, avance. Trouve l\'erreur.',
      cm1Redac('L\'erreur', '', 'La troisième rotation doit être « tourne à droite », pas « tourne à gauche » : pour un carré, on tourne toujours du même côté.')],
    ['Avec les flèches, écris le chemin : 3 cases à droite, puis 2 cases en bas.',
      cm1Redac('Avec les flèches', cpCode('dddbb'), 'Trois flèches vers la droite, deux flèches vers le bas.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : la tortue Logo', [
    'Vers 1967, des chercheurs américains, dont <b>Seymour Papert</b>, ont inventé le langage <b>Logo</b> pour que les enfants apprennent à programmer. On y commande une « tortue » avec « AVANCE », « TOURNE À GAUCHE »…',
    'D\'abord, la tortue était un vrai petit robot posé par terre, qui dessinait avec un crayon. Puis elle est devenue un dessin sur l\'écran. Les robots et logiciels des écoles d\'aujourd\'hui sont ses descendants !',
  ]),
  quiz: [
    { q: '« Tourne à droite » : le robot…', opts: ['fait un quart de tour sur place', 'avance d\'une case à droite', 'recule'], correct: 0 },
    { q: 'Pour tracer un carré, on répète…', opts: ['4 fois', '2 fois', '3 fois'], correct: 0 },
    { q: 'Corriger un programme, c\'est…', opts: ['déboguer', 'dessiner', 'compter'], correct: 0 },
  ],
  flash: [
    { l: 2, q: 'Le robot regarde à droite, il tourne à gauche : il regarde…', r: ['en haut', 'en bas', 'à gauche', 'à droite'], ok: 0 },
    { l: 2, q: 'Le robot regarde en bas, il tourne à droite : il regarde…', r: ['à gauche', 'à droite', 'en haut', 'en bas'], ok: 0 },
    { l: 3, q: '4 quarts de tour du même côté, c\'est…', r: ['un tour complet', 'un demi-tour', 'rien', 'deux tours'], ok: 0 },
    { l: 1, q: `Combien de cases ? ${cpCode('dd')}`, r: ['2', '1', '4', '0'], ok: 0 },
  ],
});
})();

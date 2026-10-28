/* ============================================================
   CHAPITRE : Algorithmique et programmation (3e, D6)
   Programme du cycle 4 en vigueur en 3e jusqu'en août 2028 (BO n° 31 du 30 juillet 2020) et attendus
   de fin de 3e (Éduscol 2019) : « les niveaux 1, 2 et 3 sont attendus en fin de 3e ». Niveau 3 :
   décomposer un problème en sous-problèmes et créer un « bloc personnalisé » ; construire une figure
   en reproduisant un motif avec une boucle (frise) ; utiliser ensemble « répéter … fois »,
   « répéter jusqu'à … » et les instructions conditionnelles (figures, programmes de calcul,
   simulations d'expériences aléatoires) ; écrire plusieurs scripts en parallèle pour créer un jeu.
   Rappels des niveaux 1 et 2 (chapitre de 4e) en début de chapitre. Le brevet propose chaque année
   un exercice de programmation par blocs.
   Utilise les helpers prB, prN, prPile, prBoucle, prSi, prTortue de chapitres/4e/D5-programmation.js.
   ============================================================ */
(() => {
const T = cm1Tex, P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const carre = L => { const l = []; for(let i = 0; i < 4; i++) l.push(['a', L], ['g', 90]); return l; };
const frise = (() => { let l = []; for(let i = 0; i < 4; i++) l = l.concat(carre(40), [['m', 60]]); return l; })();
const blocCarre = prPile([prB('définir carré (<span class="pr-cond">côté</span>)', 'pe'), prBoucle(`répéter ${prN(4)} fois`, [prB('avancer de <span class="pr-cond">côté</span> pas'), prB(`tourner ↺ de ${prN(90)} degrés`)])]);
const progFrise = prPile([prB('quand le drapeau vert est cliqué', 'ev'), prBoucle(`répéter ${prN(4)} fois`, [prB('stylo en position d\'écriture', 'pe'), prB(`carré (${prN(40)})`, 'pe'), prB('relever le stylo', 'pe'), prB(`avancer de ${prN(60)} pas`)])]);
const jusqua = prPile([prB('quand le drapeau vert est cliqué', 'ev'), prB(`mettre ${prN('n')} à ${prN(0)}`, 'va'), prB(`mettre ${prN('somme')} à ${prN(0)}`, 'va'), prBoucle('répéter jusqu\'à <span class="pr-cond">somme > 100</span>', [prB(`ajouter ${prN(1)} à <span class="pr-cond">n</span>`, 'va'), prB('ajouter <span class="pr-cond">n</span> à <span class="pr-cond">somme</span>', 'va')]), prB('dire <span class="pr-cond">n</span>', 'lo')]);
const simu = prPile([prB('quand le drapeau vert est cliqué', 'ev'), prB(`mettre ${prN('piles')} à ${prN(0)}`, 'va'), prBoucle(`répéter ${prN(100)} fois`, [prSi('nombre aléatoire entre 0 et 1 = 1', [prB(`ajouter ${prN(1)} à <span class="pr-cond">piles</span>`, 'va')])]), prB('dire <span class="pr-cond">piles</span>', 'lo')]);

/* ---- Simulation : 100 lancers d'une pièce, la fréquence de « pile » se stabilise ---- */
function animSimu(id){
  let tirages = null;
  const tirer = () => { tirages = Array.from({ length: 400 }, () => Math.random() < .5 ? 1 : 0); };
  return cmAnim(id, { etat: { tour: 0 }, duree: 9000, legende: 'Chaque point est la fréquence de « pile » après n lancers. « Relancer » refait une nouvelle série de lancers.',
    controles: a => `<div class="cmp-modeles">${cmBtn(id, 'tour', a.etat.tour + 1, 'Relancer', false)}</div>`,
    dessin: (t, a) => {
      if(!tirages || a.etat.vu !== a.etat.tour){ tirer(); a.etat.vu = a.etat.tour; }
      const n = Math.max(1, Math.round(cmPhase(t, .03, .95) * 400)); let p = 0, s = '';
      const X = i => 40 + i * .85, Y = f => 200 - f * 180;
      s += `<line x1="40" y1="200" x2="385" y2="200" stroke="#1C1B2E"/><line x1="40" y1="200" x2="40" y2="15" stroke="#1C1B2E"/><line x1="40" y1="${Y(.5)}" x2="385" y2="${Y(.5)}" stroke="#E07B00" stroke-dasharray="6 4"/>`;
      [0, .5, 1].forEach(f => { s += `<text x="34" y="${Y(f) + 4}" text-anchor="end" font-size="11">${String(f).replace('.', ',')}</text>`; });
      [100, 200, 300, 400].forEach(i => { s += `<text x="${X(i)}" y="214" text-anchor="middle" font-size="11">${i}</text>`; });
      let d = '';
      for(let i = 0; i < n; i++){ p += tirages[i]; d += (i ? 'L' : 'M') + X(i + 1).toFixed(1) + ' ' + Y(p / (i + 1)).toFixed(1); }
      s += `<path d="${d}" fill="none" stroke="#0C5BA0" stroke-width="2"/>`;
      return { scene: `<svg viewBox="0 0 400 222" class="cma-svg" style="max-width:440px;font-family:'Space Grotesk',sans-serif;">${s}</svg>`,
        texte: `Après <b>${n}</b> lancers : ${p} « pile », fréquence ${T(String(Math.round(p / n * 100) / 100).replace('.', '{,}'))}. Plus on lance, plus la fréquence se rapproche de la probabilité ${T('0{,}5')}.` };
    } });
}

cm1Chapitre({
  niveau: '3e', titre: 'Algorithmique et programmation', slug: 'programmation',
  cours: `
${cm1Lecon(1, 'Rappels : boucle, condition, variable')}
${cm1Rem('Niveaux 1 et 2 (vus en 4e) : la boucle « répéter … fois », l\'instruction « si … alors … sinon », les variables, les événements et plusieurs lutins. Au brevet, un exercice porte chaque année sur un programme par blocs : il faut savoir le lire, l\'exécuter à la main et le modifier.')}

${cm1Lecon(2, 'Créer un bloc personnalisé')}
${cm1Def(`${blocCarre}${P('On <b>décompose</b> le problème : on crée un bloc « carré » qui a un <b>paramètre</b>, la longueur du côté. Ce bloc s\'utilise ensuite comme une instruction ordinaire.')}`, 'Un bloc à soi')}
${prTortue('pr3-frise', { presets: [{ nom: 'La frise', pas: frise, x: -170, y: 20, echelle: 1, fin: 'Le motif « carré, relever le stylo, avancer » est répété 4 fois : c\'est une frise.' }], legende: 'Le programme principal appelle 4 fois le bloc « carré (40) », en se décalant de 60 pas entre deux motifs.' })}
${cm1Def(progFrise, 'Le programme principal')}

${cm1Lecon(3, 'Répéter jusqu\'à une condition')}
${cm1Def(`${jusqua}${P('La boucle « <b>répéter jusqu\'à</b> » recommence tant que la condition est fausse ; elle s\'arrête dès qu\'elle devient vraie. On ne sait pas à l\'avance combien de tours elle fera.')}`, 'Une boucle conditionnelle')}
${cm1Exemple('Exécution à la main :', ['n = 1, somme = 1 ; n = 2, somme = 3 ; n = 3, somme = 6…', 'n = 13, somme = 91 (pas encore plus de 100) ;', 'n = 14, somme = 105 &gt; 100 : la boucle s\'arrête, le lutin dit 14.'])}

${cm1Lecon(4, 'Simuler une expérience aléatoire')}
${cm1Def(`${simu}${P('Le bloc « nombre aléatoire entre 0 et 1 » donne 0 ou 1 au hasard, comme une pièce. Le programme compte les « 1 » (pile) sur 100 lancers.')}`, 'Programmer le hasard')}
${animSimu('pr3-simu')}

${cm1Lecon(5, 'Un jeu avec des scripts en parallèle')}
${cm1Regle(`Un jeu utilise plusieurs lutins, chacun avec ses scripts qui s'exécutent <b>en même temps</b> :${cm1Liste(['le chat se déplace avec les flèches du clavier (événements « quand la touche … est pressée ») ;', 'la souris se déplace au hasard (« répéter indéfiniment : glisser vers une position aléatoire ») ;', 'le jeu s\'arrête quand le chat touche la souris (« répéter jusqu\'à touche le chat ? »), et une variable compte le temps.'])}`, 'Plusieurs scripts')}
`,
  methode: `
${cm1Demo('pr3-m-brevet', 'Exercice type brevet : lire un programme', 'Le programme demande un nombre x ; mettre y à x × 3 ; si y > 20 alors dire y − 20, sinon dire y + 5. Que dit-il pour x = 4, puis pour x = 10 ?')}
${cm1Demo('pr3-m-bloc', 'Créer un bloc pour un polygone', 'Crée un bloc « polygone (n, côté) » qui trace un polygone régulier.')}
`,
  demos: [
    ['pr3-m-brevet', [
      { expr: 'x = 4 : y = 12', note: '4 × 3 = 12.' },
      { expr: '12 > 20 est faux : le lutin dit 12 + 5 = 17.', note: 'On exécute le bloc « sinon ».' },
      { expr: 'x = 10 : y = 30 ; 30 > 20 est vrai : il dit 30 − 20 = 10.', note: 'On exécute le bloc « alors ».' },
    ]],
    ['pr3-m-bloc', [
      { expr: 'définir polygone (n, côté)', note: 'Deux paramètres : le nombre de côtés et la longueur.' },
      { expr: 'répéter n fois [avancer de côté ; tourner de 360 / n degrés]', note: 'Le même schéma que le carré, avec 360 : n.' },
      { expr: 'polygone (6, 50) trace un hexagone ; polygone (3, 80), un triangle équilatéral.', note: 'Un seul bloc pour tous les polygones réguliers.' },
    ]],
  ],
  exos: cm1Exos('pr3', [
    ['mettre n à 1 ; répéter jusqu\'à n > 50 : mettre n à n × 2 ; dire n. Que dit le programme ?',
      cm1Redac('Valeur de n', { suite: ['1, 2, 4, 8, 16, 32', '64 > 50 : la boucle s\'arrête'] }, 'Le programme dit 64.')],
    ['Écris un bloc « triangle (côté) » qui trace un triangle équilatéral.',
      cm1Redac('Le bloc', '', 'définir triangle (côté) ; répéter 3 fois [avancer de côté ; tourner de 120 degrés].')],
    ['On veut simuler 1 000 lancers d\'un dé à six faces et compter les 6. Quelles instructions utiliser ?',
      cm1Redac('La simulation', '', 'mettre six à 0 ; répéter 1 000 fois [si nombre aléatoire entre 1 et 6 = 6 alors ajouter 1 à six] ; dire six. On obtient environ 1 000 : 6 ≈ 167 six.')],
    ['Un programme dit 52 « pile » sur 100 lancers. La pièce est-elle truquée ?',
      cm1Redac('Pièce truquée', '', 'Non, pas forcément : la fréquence 0,52 est proche de 0,5. Sur un petit nombre de lancers, la fréquence fluctue.')],
    ['Avec le bloc carré (côté), écris un programme qui trace 5 carrés emboîtés de même coin, de côtés 20, 40, 60, 80, 100.',
      cm1Redac('Les carrés emboîtés', '', 'mettre c à 20 ; répéter 5 fois [carré (c) ; ajouter 20 à c].')],
    ['Quelle différence entre « répéter 10 fois » et « répéter jusqu\'à … » ?',
      cm1Redac('Deux boucles', '', 'Avec « répéter 10 fois », on connaît le nombre de tours. Avec « répéter jusqu\'à », la boucle s\'arrête quand une condition devient vraie : le nombre de tours n\'est pas connu à l\'avance.')],
    ['Programme de calcul : choisir x ; mettre r à (x + 3) × (x − 3) ; dire r + 9. Que dit-il pour 5 ? Pour 7 ? Conjecture ?',
      cm1Redac('Conjecture', { suite: ['x = 5 : 8 × 2 + 9 = 25', 'x = 7 : 10 × 4 + 9 = 49'] }, 'Il semble dire x². En effet (x + 3)(x − 3) + 9 = x² − 9 + 9 = x².')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Scratch et les blocs', [
    'Le logiciel <b>Scratch</b> a été créé en 2007 au MIT (États-Unis) par l\'équipe de <b>Mitchel Resnick</b>, élève de Seymour Papert (l\'inventeur de la tortue Logo).',
    'L\'idée : programmer en emboîtant des blocs comme des pièces de puzzle, sans faute de frappe possible. Des millions de projets y sont partagés, et c\'est le langage utilisé au brevet en France.',
  ]),
  quiz: [
    { q: 'Un bloc personnalisé sert à…', opts: ['décomposer un problème en sous-problèmes', 'dessiner un lutin', 'compter les lancers'], correct: 0 },
    { q: '« Répéter jusqu\'à somme > 100 » s\'arrête quand…', opts: ['somme dépasse 100', 'somme vaut 0', 'on a fait 100 tours'], correct: 0 },
    { q: 'Pour simuler une pièce, on utilise…', opts: ['nombre aléatoire entre 0 et 1', 'répéter 4 fois', 'tourner de 90 degrés'], correct: 0 },
  ],
  flash: [
    { l: 2, q: 'polygone (5, 60) tourne à chaque sommet de…', r: ['72 degrés', '60 degrés', '90 degrés', '108 degrés'], ok: 0 },
    { l: 3, q: 'n = 1 ; répéter jusqu\'à n > 10 : n = n + 4. Valeur finale de n :', r: ['13', '10', '9', '11'], ok: 0 },
    { l: 4, q: 'Sur 1 000 lancers de pièce, on obtient environ… « pile ».', r: ['500', '100', '1 000', '50'], ok: 0 },
  ],
});
})();

/* ============================================================
   CHAPITRE : Algorithmique et programmation (4e, D5)
   Programme du cycle 4 en vigueur en 4e jusqu'en août 2027 (BO n° 31 du 30 juillet 2020) et attendus
   de fin de 4e (Éduscol 2019) : « les niveaux 1 et 2 sont attendus en fin de 4e ».
   Niveau 1 : algorithmique débranchée ; ordonner ou compléter des blocs ; script de déplacement ou de
   construction avec la boucle « répéter … fois » et des instructions conditionnelles ; programme d'un
   triangle équilatéral, d'un carré, d'un rectangle. Niveau 2 : déclencher un script par un événement ;
   « si … alors (sinon) » et « répéter … fois » ; une variable dans un programme de déplacement, de
   construction ou de calcul (côté saisi par l'utilisateur) ; interaction entre deux lutins.
   Pour aller plus loin (niveau 3, fin de 3e) : les blocs personnalisés.
   Blocs aux couleurs de Scratch (styles .pi-bloc du chapitre de 6e) ; la tortue qui trace pas à pas.
   Les helpers pr* servent aussi au chapitre de 3e.
   ============================================================ */
(function(){
  const st = document.createElement('style');
  st.textContent = `.pi-bloc.lo{background:#9966FF;} .pi-bloc.se{background:#5CB1D6;} .pi-bloc.pe{background:#FF6680;}
    .pr-si{display:flex;flex-direction:column;align-items:flex-start;border-left:14px solid #FFAB19;border-radius:8px;margin:2px 0;}
    .pr-si > .pi-bloc.ct{margin-left:-14px;} .pr-cond{display:inline-block;background:#59C059;border-radius:14px;padding:1px 10px;margin:0 2px;color:#fff;box-shadow:inset 0 0 0 2px rgba(0,0,0,.12);}
    .pr-def{display:flex;flex-direction:column;align-items:flex-start;}`;
  document.head.appendChild(st);
})();
// Un bloc ; une pile ; une boucle « répéter » (ou « répéter jusqu'à », « pour toujours ») ; un « si … alors … sinon ».
function prB(txt, g){ return `<span class="pi-bloc ${g || 'mv'}">${txt}</span>`; }
function prN(v){ return `<b class="pi-n">${v}</b>`; }
function prPile(l){ return `<div class="pi-pile">${l.join('')}</div>`; }
function prBoucle(tete, corps){ return `<div class="pi-boucle"><span class="pi-bloc ct">${tete}</span><div class="pi-corps">${corps.join('')}</div><span class="pi-bloc ct pi-fin"></span></div>`; }
function prSi(cond, alors, sinon){ return `<div class="pr-si"><span class="pi-bloc ct">si <span class="pr-cond">${cond}</span> alors</span><div class="pi-corps">${alors.join('')}</div>${sinon ? `<span class="pi-bloc ct">sinon</span><div class="pi-corps">${sinon.join('')}</div>` : ''}<span class="pi-bloc ct pi-fin"></span></div>`; }
const prDrapeau = () => prB('quand le drapeau vert est cliqué', 'ev');
/* ---- La tortue (le lutin stylo) trace pas à pas : presets [{ nom, pas: [['a', longueur] | ['m', longueur sans tracer] | ['d', angle] | ['g', angle]], fin }] ---- */
function prTortue(id, o){
  const P = o.presets;
  return cmAnim(id, { etat: { p: 0 }, duree: a => 1500 + P[a.etat.p].pas.length * 450, legende: o.legende || 'Le lutin exécute les instructions une à une : il avance en traçant, ou il tourne sur place.',
    controles: a => P.length > 1 ? `<div class="cmp-modeles">${P.map((p, i) => cmBtn(id, 'p', i, p.nom, a.etat.p === i)).join('')}</div>` : '',
    dessin: (t, a) => {
      const p = P[a.etat.p], n = p.pas.length, k = cmPhase(t, .05, .92) * n, K = p.echelle || 1;
      let x = p.x || 0, y = p.y || 0, dir = p.dir == null ? 0 : p.dir, segs = [[[x, y]]], cur = '';
      for(let i = 0; i < n; i++){
        const f = Math.max(0, Math.min(1, k - i)); if(f <= 0) break; const [c, v] = p.pas[i];
        if(c === 'a' || c === 'm'){ const r = dir * Math.PI / 180; x += v * f * Math.cos(r); y -= v * f * Math.sin(r); if(c === 'a') segs[segs.length - 1].push([x, y]); else segs.push([[x, y]]); }
        else dir += (c === 'g' ? 1 : -1) * v * f;
        if(f < 1 || i === Math.floor(k)) cur = c === 'a' ? `avancer de ${p.pas[i][1]}` : c === 'm' ? `relever le stylo et avancer de ${p.pas[i][1]}` : `tourner ${c === 'g' ? '↺' : '↻'} de ${p.pas[i][1]} degrés`;
      }
      const X = v => 200 + v * K, Y = v => 160 + v * K, r = dir * Math.PI / 180;
      const tri = [[14, 0], [-8, 7], [-8, -7]].map(([u, w]) => [X(x) + u * Math.cos(r) + w * Math.sin(r), Y(y) - u * Math.sin(r) + w * Math.cos(r)]);
      const s = segs.map(pts => `<polyline points="${pts.map(([u, w]) => X(u).toFixed(1) + ',' + Y(w).toFixed(1)).join(' ')}" fill="none" stroke="#4C97FF" stroke-width="3" stroke-linejoin="round"/>`).join('')
        + `<polygon points="${tri.map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#FFAB19" stroke="#1C1B2E" stroke-width="1.5"/>`;
      return { scene: `<svg viewBox="0 0 400 320" class="cma-svg" style="max-width:420px;">${s}</svg>`, texte: t >= .93 ? (p.fin || 'Le programme est terminé.') : cur ? `Instruction en cours : <b>${cur}</b>.` : 'Le lutin est prêt, stylo en position d\'écriture.' };
    } });
}
const prPoly = (n, L) => { const l = []; for(let i = 0; i < n; i++) l.push(['a', L], ['g', 360 / n]); return l; };

(() => {
const T = cm1Tex, P = t => `<p style="text-align:center;margin:2px 0;">${t}</p>`;
const carre = prPile([prDrapeau(), prB('stylo en position d\'écriture', 'pe'), prBoucle(`répéter ${prN(4)} fois`, [prB(`avancer de ${prN(100)} pas`), prB(`tourner ↺ de ${prN(90)} degrés`)])]);
const triangle = prPile([prDrapeau(), prB('stylo en position d\'écriture', 'pe'), prBoucle(`répéter ${prN(3)} fois`, [prB(`avancer de ${prN(120)} pas`), prB(`tourner ↺ de ${prN(120)} degrés`)])]);
const carreVar = prPile([prDrapeau(), prB('demander « Longueur du côté ? » et attendre', 'se'), prB(`mettre ${prN('côté')} à <span class="pr-cond">réponse</span>`, 'va'), prB('stylo en position d\'écriture', 'pe'), prBoucle(`répéter ${prN(4)} fois`, [prB('avancer de <span class="pr-cond">côté</span> pas'), prB(`tourner ↺ de ${prN(90)} degrés`)])]);
const siNote = prPile([prDrapeau(), prB('demander « Ta note ? » et attendre', 'se'), prSi('réponse > 10', [prB('dire « Bravo ! »', 'lo')], [prB('dire « Courage ! »', 'lo')])]);
const deuxLutins = `<div style="display:flex;gap:26px;flex-wrap:wrap;">${prPile([prB('Lutin 1 : quand le drapeau vert est cliqué', 'ev'), prBoucle('répéter indéfiniment', [prB(`avancer de ${prN(5)} pas`), prB('rebondir si le bord est atteint')])])}${prPile([prB('Lutin 2 : quand le drapeau vert est cliqué', 'ev'), prBoucle('répéter indéfiniment', [prSi('touche le Lutin 1 ?', [prB('dire « Aïe ! » pendant 1 secondes', 'lo')])])])}</div>`;

cm1Chapitre({
  niveau: '4e', titre: 'Algorithmique et programmation', slug: 'programmation',
  cours: `
${cm1Lecon(1, 'Répéter une séquence : la boucle')}
${prTortue('pr4-carre', { presets: [{ nom: 'Carré', pas: prPoly(4, 100), x: -50, y: 50, fin: 'Le lutin a tourné 4 fois de 90° : 4 × 90 = 360°, il est revenu à son point de départ.' }, { nom: 'Triangle équilatéral', pas: prPoly(3, 120), x: -60, y: 50, fin: 'Il tourne 3 fois de 120° (et non 60° !) : 3 × 120 = 360°.' }, { nom: 'Hexagone', pas: prPoly(6, 60), x: -30, y: 55, fin: '6 côtés : il tourne de 360 : 6 = 60° à chaque sommet.' }] })}
${cm1Def(`${carre}${P('La boucle « <b>répéter 4 fois</b> » exécute 4 fois les deux instructions qu\'elle contient : le lutin trace un carré de côté 100.')}`, 'La boucle « répéter … fois »')}
${cm1Regle(`Pour tracer un polygone régulier à ${T('n')} côtés, on répète ${T('n')} fois « avancer, tourner de ${T('360 \\div n')} degrés ». Pour le triangle équilatéral : 360 : 3 = 120°.${P(triangle)}`, 'Polygones réguliers')}
${cm1Astuce('Avant de programmer, on peut « jouer » l\'algorithme sans ordinateur : un élève fait le lutin dans la cour, un autre lit les instructions. C\'est l\'algorithmique débranchée.')}

${cm1Lecon(2, 'Choisir : « si … alors … sinon »')}
${cm1Def(`${siNote}${P('Le programme teste la condition <b>réponse &gt; 10</b> : si elle est vraie, il exécute le premier bloc ; sinon, le second.')}`, 'L\'instruction conditionnelle')}
${cm1Exemple('Ce que dit le programme :', ['pour une note de 14 : « Bravo ! » ;', 'pour une note de 8 : « Courage ! » ;', 'pour une note de 10 : « Courage ! », car 10 &gt; 10 est faux.'])}

${cm1Lecon(3, 'Utiliser une variable')}
${cm1Def(`${carreVar}${P('La <b>variable</b> « côté » contient la longueur tapée par l\'utilisateur : le même programme trace un carré de n\'importe quelle taille.')}`, 'Une variable dans un programme')}
${cm1Rem('Une variable est une « boîte » qui porte un nom et contient une valeur ; on peut la lire, la changer (« mettre … à … ») ou l\'augmenter (« ajouter … à … »).')}

${cm1Lecon(4, 'Événements et lutins')}
${cm1Def(`${deuxLutins}${P('Chaque lutin a ses propres scripts, déclenchés par un <b>événement</b> (le drapeau vert, une touche du clavier, un clic…). Ils s\'exécutent <b>en même temps</b> : quand le lutin 1 touche le lutin 2, le lutin 2 dit « Aïe ! ».')}`, 'Déclencher un script')}

<div class="sub-header" data-oliv-plus="En route vers la 3e !"><span class="letter">+</span><h4>Pour aller plus loin : créer son propre bloc</h4></div>
${cm1Rem('En 3e (niveau 3), on crée des <b>blocs personnalisés</b> : par exemple un bloc « carré (côté) » qu\'on réutilise pour dessiner une frise.')}
`,
  methode: `
${cm1Demo('pr4-m-executer', 'Exécuter un programme à la main', 'Que dit ce programme ? mettre total à 0 ; répéter 3 fois : ajouter 4 à total ; dire total.')}
${cm1Demo('pr4-m-ecrire', 'Écrire le programme d\'un rectangle', 'Écris un programme qui trace un rectangle de 150 sur 80.')}
`,
  demos: [
    ['pr4-m-executer', [
      { expr: 'total = 0', note: 'Avant la boucle.' },
      { expr: 'Tour 1 : total = 4 ; tour 2 : total = 8', note: 'J\'ajoute 4 à chaque tour.' },
      { expr: 'Tour 3 : total = 12', note: 'La boucle est finie après 3 tours.' },
      { expr: 'Le programme dit 12.', note: 'C\'est 3 × 4.' },
    ]],
    ['pr4-m-ecrire', [
      { expr: 'Un rectangle : deux longueurs et deux largeurs.', note: 'Le motif « longueur, tourner, largeur, tourner » se répète 2 fois.' },
      { expr: prPile([prBoucle(`répéter ${prN(2)} fois`, [prB(`avancer de ${prN(150)} pas`), prB(`tourner ↺ de ${prN(90)} degrés`), prB(`avancer de ${prN(80)} pas`), prB(`tourner ↺ de ${prN(90)} degrés`)])]), note: 'Je vérifie : 4 virages de 90°, soit 360°.' },
    ]],
  ],
  exos: cm1Exos('pr4', [
    ['Quel polygone trace le programme : répéter 5 fois [avancer de 80 ; tourner de 72 degrés] ?',
      cm1Redac('Le polygone', T('5 \\times 72 = 360'), 'Il trace un pentagone régulier de côté 80 : 5 côtés, et 5 virages de 72° font un tour complet.')],
    ['Quel angle faut-il pour tracer un octogone régulier (8 côtés) ?',
      cm1Redac('L\'angle', T('360 \\div 8 = 45'), 'Il faut tourner de 45 degrés à chaque sommet.')],
    ['Un programme demande un nombre, puis : si le nombre est pair, il dit « pair », sinon il dit « impair ». Que dit-il pour 17 ?',
      cm1Redac('Réponse du programme', '', '17 n\'est pas pair : la condition est fausse, le programme dit « impair ».')],
    ['mettre x à 2 ; répéter 4 fois : mettre x à x × 3 ; dire x. Que dit le programme ?',
      cm1Redac('Valeur de x', { suite: ['tour 1 : 6', 'tour 2 : 18', 'tour 3 : 54', 'tour 4 : 162'] }, 'Le programme dit 162.')],
    ['Écris un programme qui demande la longueur du côté et trace un triangle équilatéral.',
      cm1Redac('Le programme', '', 'demander « Côté ? » ; mettre côté à réponse ; stylo en position d\'écriture ; répéter 3 fois [avancer de côté ; tourner de 120 degrés].')],
    ['Dans un jeu, le chat doit dire « Gagné ! » quand il touche la balle. Quelle instruction utiliser ?',
      cm1Redac('L\'instruction', '', 'Dans une boucle « répéter indéfiniment » : si « touche la balle ? » alors dire « Gagné ! ».')],
    ['Écris sans ordinateur un algorithme pour aller de ta place au tableau.',
      cm1Redac('L\'algorithme', '', 'Par exemple : se lever ; avancer de 3 pas ; tourner à gauche ; avancer de 5 pas ; s\'arrêter devant le tableau.')],
  ]),
  histoire: cm1Histoire('Un peu d\'histoire : Ada Lovelace', [
    'En 1843, l\'Anglaise <b>Ada Lovelace</b> écrit le premier programme destiné à une machine : une suite d\'instructions pour calculer des nombres avec la « machine analytique » de Charles Babbage, qui ne sera jamais construite.',
    'Elle avait déjà compris l\'idée de la <b>boucle</b> : répéter une série d\'opérations. Un langage de programmation porte son nom : Ada.',
  ]),
  quiz: [
    { q: 'Pour tracer un carré, on répète 4 fois : avancer, tourner de…', opts: ['90 degrés', '45 degrés', '360 degrés'], correct: 0 },
    { q: 'Pour un triangle équilatéral, le lutin tourne de…', opts: ['120 degrés', '60 degrés', '180 degrés'], correct: 0 },
    { q: 'Une variable, c\'est…', opts: ['une boîte qui contient une valeur', 'une boucle', 'un lutin'], correct: 0 },
    { q: 'Si la condition est fausse, le programme exécute…', opts: ['le bloc « sinon »', 'le bloc « alors »', 'rien du tout, il s\'arrête'], correct: 0 },
  ],
  flash: [
    { l: 1, q: 'Répéter 6 fois [avancer ; tourner de 60°] trace…', r: ['un hexagone', 'un carré', 'un triangle', 'un cercle'], ok: 0 },
    { l: 2, q: 'si 7 > 5 alors dire A sinon dire B. Le lutin dit…', r: ['A', 'B', 'A puis B', 'rien'], ok: 0 },
    { l: 3, q: 'mettre n à 5 ; ajouter 3 à n. n vaut…', r: ['8', '5', '3', '15'], ok: 0 },
    { l: 4, q: 'Le drapeau vert est…', r: ['un événement', 'une variable', 'une boucle', 'un opérateur'], ok: 0 },
  ],
});
})();

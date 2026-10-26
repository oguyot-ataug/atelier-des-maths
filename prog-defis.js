/* =====================================================================
   prog-defis.js -- Défis de programmation (CM1, 6e, 5e), vérifiés automatiquement, et devoirs.

   Chaque défi : un énoncé, une aide, éventuellement une liste de blocs autorisés, et une
   vérification :
   - « trace » : les segments dessinés par le lutin sont comparés à la figure de référence
     (tracée par une tortue), à une isométrie près (la figure peut être tracée ailleurs, tournée
     ou retournée) ; les traits bout à bout alignés comptent pour un seul côté ;
   - « dire » : le programme est lancé avec plusieurs réponses aux questions « demander », et la
     dernière phrase dite doit être le résultat attendu.
   « exige » : blocs indispensables (ex. « répéter » pour le carré).
   - « surPlace » (CM1) : le lutin part d'un point imposé (« depart ») ; la scène montre un décor
     (« decor » : la droite (d) en trait plein, les droites à tracer en pointillés) ; chaque segment de
     « cibles » doit être repassé au bon endroit, et rien d'autre ne doit être tracé.

   Progression : table prog_progress (programme, réussi, tentatives) ; devoirs de type
   « programmation » (devoirs.prog_defis) : liste réduite aux défis du devoir, devoir rendu quand
   tous sont réussis, temps actif suivi comme les autres devoirs (suivi-devoirs.js, kind
   'programmation').
   ===================================================================== */

const PROG_BLOCS_TRACE = ['sc_drapeau', 'sc_avancer', 'sc_tourner_d', 'sc_tourner_g', 'sc_aller', 'sc_orienter', 'sc_stylo_bas', 'sc_stylo_haut', 'sc_stylo_couleur', 'sc_stylo_taille', 'sc_effacer', 'sc_repeter', 'sc_attendre'];
const PROG_BLOCS_CALCUL = ['sc_drapeau', 'sc_demander', 'sc_reponse', 'sc_dire', 'sc_plus', 'sc_moins', 'sc_fois', 'sc_div', 'sc_regrouper', 'variables'];
const PROG_POLY = (n, c) => t => { t.bas(); for(let i = 0; i < n; i++){ t.av(c); t.td(360 / n); } };
// CM1, Droites parallèles et perpendiculaires (demandé : « comment tracer une perpendiculaire déjà présente
// et une parallèle, dessinées en pointillés ; au départ le curseur placé sur la droite (d) »).
const PROG_CM1_D = { x1: -235, y1: -80, x2: 235, y2: -80, nom: '(d)', lx: 205, ly: -100 };
const PROG_CM1_OBL = (() => { const a = 20 * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return { c, s, d: { x1: -235 * c - (-100), y1: -235 * s - 100, x2: 235 * c - (-100), y2: 235 * s - 100 } }; })();
const PROG_DEFIS_CM1 = [
  { id: 'cm1-perp', niveau: 'CM1', titre: 'La perpendiculaire', blocs: PROG_BLOCS_TRACE, depart: { x: -60, y: -80, dir: 90 },
    decor: [PROG_CM1_D, { x1: -60, y1: -80, x2: -60, y2: 100, nom: "(d')", pointille: true, lx: -52, ly: 92 }, { point: true, x: -60, y: -80, nom: 'A' }],
    cibles: [{ x1: -60, y1: -80, x2: -60, y2: 100 }],
    enonce: 'Le lutin est sur la droite (d), au point A. Fais-lui tracer la <b>droite (d\') perpendiculaire à (d)</b>, sur les pointillés : elle mesure <b>180 pas</b>.',
    aide: 'Le lutin regarde le long de la droite (d). Pour partir à angle droit, il tourne de 90° (à gauche, vers le haut). Stylo en position d\'écriture, puis avancer de 180.' },
  { id: 'cm1-perp-a', niveau: 'CM1', titre: 'La perpendiculaire passant par A', blocs: PROG_BLOCS_TRACE, depart: { x: -180, y: -80, dir: 90 },
    decor: [PROG_CM1_D, { x1: 60, y1: -80, x2: 60, y2: 100, nom: "(d')", pointille: true, lx: 68, ly: 92 }, { point: true, x: 60, y: -80, nom: 'A' }],
    cibles: [{ x1: 60, y1: -80, x2: 60, y2: 100 }],
    enonce: 'Le point A est sur la droite (d), mais le lutin n\'est pas en A : il est sur (d), <b>240 pas avant A</b>. Va jusqu\'à A <b>sans tracer</b>, puis trace la <b>droite (d\') perpendiculaire à (d) passant par A</b> (180 pas).',
    aide: 'Stylo relevé : avance de 240 le long de (d), tu arrives en A. Tourne de 90° à gauche, mets le stylo en position d\'écriture, avance de 180.' },
  { id: 'cm1-perp-grad', niveau: 'CM1', titre: 'La perpendiculaire : compte les graduations', blocs: PROG_BLOCS_TRACE, depart: { x: -170, y: -80, dir: 90 },
    decor: [PROG_CM1_D, { grad: true, x1: -220, y1: -80, x2: 230, y2: -80, pas: 10 }, { x1: 40, y1: -80, x2: 40, y2: 70, nom: "(d')", pointille: true, lx: 48, ly: 62 }, { point: true, x: 40, y: -80, nom: 'A' }],
    cibles: [{ x1: 40, y1: -80, x2: 40, y2: 70 }],
    enonce: 'La droite (d) est graduée : <b>un petit trait tous les 10 pas</b> (un grand trait tous les 50 pas). Le lutin est sur (d), mais pas en A. <b>Compte les graduations</b> pour savoir de combien avancer jusqu\'à A, sans tracer, puis trace la <b>perpendiculaire (d\') à (d) passant par A</b> (150 pas).',
    aide: 'Compte les petits traits entre le lutin et A : chacun vaut 10 pas (les grands traits aident à compter de 50 en 50). Ici : 210 pas. Stylo relevé, avance de 210, tourne de 90° à gauche, stylo en position d\'écriture, avance de 150.' },
  { id: 'cm1-para', niveau: 'CM1', titre: 'La parallèle', blocs: PROG_BLOCS_TRACE, depart: { x: -160, y: -80, dir: 90 },
    decor: [PROG_CM1_D, { x1: -160, y1: 60, x2: 160, y2: 60, nom: "(d'')", pointille: true, lx: 168, ly: 54 }, { point: true, x: -160, y: -80, nom: 'B' }],
    cibles: [{ x1: -160, y1: 60, x2: 160, y2: 60 }],
    enonce: 'Le lutin est sur la droite (d), au point B. Fais-lui tracer la <b>droite (d\'\') parallèle à (d)</b>, sur les pointillés (<b>140 pas</b> plus haut, <b>320 pas</b> de long), <b>sans tracer le chemin pour y aller</b>.',
    aide: 'Stylo relevé : tourne de 90° vers le haut et avance de 140 (une perpendiculaire). Tourne encore de 90° pour regarder de nouveau dans le sens de (d) : tu es parallèle à (d) ! Stylo en position d\'écriture, avance de 320.' },
  { id: 'cm1-equerre', niveau: 'CM1', titre: 'L\'équerre penchée', blocs: PROG_BLOCS_TRACE, depart: { x: -100 * PROG_CM1_OBL.c + 100, y: -100 * PROG_CM1_OBL.s - 100, dir: 70 },
    decor: (() => { const { c, s, d } = PROG_CM1_OBL, A = [-100 * c + 100, -100 * s - 100], n = [-s, c], P = [A[0] + n[0] * 120, A[1] + n[1] * 120], Q = [P[0] + c * 200, P[1] + s * 200];
      return [Object.assign({ nom: '(d)', lx: 175, ly: -100 }, d), { x1: A[0], y1: A[1], x2: P[0], y2: P[1], pointille: true, nom: "(d')", lx: P[0] - 34, ly: P[1] - 4 }, { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1], pointille: true, nom: "(d'')", lx: Q[0] + 6, ly: Q[1] + 4 }, { point: true, x: A[0], y: A[1], nom: 'C' }]; })(),
    cibles: (() => { const { c, s } = PROG_CM1_OBL, A = [-100 * c + 100, -100 * s - 100], n = [-s, c], P = [A[0] + n[0] * 120, A[1] + n[1] * 120], Q = [P[0] + c * 200, P[1] + s * 200];
      return [{ x1: A[0], y1: A[1], x2: P[0], y2: P[1] }, { x1: P[0], y1: P[1], x2: Q[0], y2: Q[1] }]; })(),
    enonce: 'Cette fois, la droite (d) est penchée. Le lutin est au point C et regarde le long de (d). Trace la <b>perpendiculaire (d\')</b> (120 pas), puis la <b>parallèle (d\'\')</b> à (d) (200 pas), sur les pointillés.',
    aide: 'On ne s\'occupe pas de la pente : le lutin tourne toujours de 90° par rapport à là où il regarde. Tourner à gauche de 90°, avancer de 120, tourner à droite de 90°, avancer de 200.' },
  { id: 'cm1-rectangle', niveau: 'CM1', titre: 'Le rectangle posé sur (d)', blocs: PROG_BLOCS_TRACE, depart: { x: -120, y: -80, dir: 90 },
    decor: [PROG_CM1_D, { x1: -120, y1: -80, x2: 120, y2: -80, pointille: true }, { x1: 120, y1: -80, x2: 120, y2: 40, pointille: true }, { x1: 120, y1: 40, x2: -120, y2: 40, pointille: true }, { x1: -120, y1: 40, x2: -120, y2: -80, pointille: true }, { point: true, x: -120, y: -80, nom: 'D' }],
    cibles: [{ x1: -120, y1: -80, x2: 120, y2: -80 }, { x1: 120, y1: -80, x2: 120, y2: 40 }, { x1: 120, y1: 40, x2: -120, y2: 40 }, { x1: -120, y1: 40, x2: -120, y2: -80 }],
    enonce: 'Trace le <b>rectangle</b> en pointillés, posé sur la droite (d) : <b>240 pas</b> de long, <b>120 pas</b> de large. Ses côtés sont perpendiculaires ou parallèles à (d).',
    aide: 'Avancer de 240, tourner de 90° à gauche, avancer de 120, tourner de 90° à gauche… « répéter 2 fois » peut t\'aider.' },
];
const PROG_DEFIS = PROG_DEFIS_CM1.concat([
  { id: 'segment', niveau: '6e', titre: 'Premier trait', blocs: PROG_BLOCS_TRACE,
    enonce: 'Fais tracer au lutin un <b>segment de 150 pas</b>.',
    aide: 'Pose « stylo en position d\'écriture » sous le drapeau, puis « avancer de 150 pas ». Clique sur 🏁 pour essayer.',
    trace: t => { t.bas().av(150); } },
  { id: 'carre', niveau: '6e', titre: 'Le carré', blocs: PROG_BLOCS_TRACE, exige: ['sc_repeter'],
    enonce: 'Trace un <b>carré de côté 100</b>, en utilisant le bloc <b>répéter</b>.',
    aide: 'Un carré, c\'est 4 fois : avancer de 100, tourner de 90°. Mets ces deux blocs dans « répéter 4 fois ».',
    trace: PROG_POLY(4, 100) },
  { id: 'rectangle', niveau: '6e', titre: 'Le rectangle', blocs: PROG_BLOCS_TRACE,
    enonce: 'Trace un <b>rectangle de 160 sur 80</b>.',
    aide: 'Longueur, angle droit, largeur, angle droit… et on recommence : « répéter 2 fois » peut t\'aider.',
    trace: t => { t.bas(); for(let i = 0; i < 2; i++){ t.av(160).td(90).av(80).td(90); } } },
  { id: 'triangle', niveau: '6e', titre: 'Le triangle équilatéral', blocs: PROG_BLOCS_TRACE, exige: ['sc_repeter'],
    enonce: 'Trace un <b>triangle équilatéral de côté 120</b>, avec le bloc <b>répéter</b>.',
    aide: 'Les angles du triangle mesurent 60°, mais le lutin doit tourner de l\'angle « extérieur » : 180 − 60 = 120°.',
    trace: PROG_POLY(3, 120) },
  { id: 'escalier', niveau: '6e', titre: 'L\'escalier', blocs: PROG_BLOCS_TRACE,
    enonce: 'Trace un <b>escalier de 4 marches</b> : chaque marche fait <b>40 de haut et 40 de large</b>.',
    aide: 'Une marche : monter de 40 (tourner à gauche), avancer de 40 (tourner à droite). À répéter 4 fois.',
    trace: t => { t.bas(); for(let i = 0; i < 4; i++){ t.tg(90).av(40).td(90).av(40); } } },
  { id: 'deux-carres', niveau: '6e', titre: 'Deux carrés séparés', blocs: PROG_BLOCS_TRACE,
    enonce: 'Trace <b>deux carrés de côté 60</b>, côte à côte, séparés de <b>40 pas</b> (sans trait entre les deux).',
    aide: 'Entre les deux carrés, relève le stylo pour déplacer le lutin sans dessiner, puis remets-le en position d\'écriture.',
    trace: t => { PROG_POLY(4, 60)(t); t.haut().av(100); PROG_POLY(4, 60)(t); } },
  { id: 'calcul', niveau: '6e', titre: 'Programme de calcul', blocs: PROG_BLOCS_CALCUL,
    enonce: 'Le lutin <b>demande un nombre</b>, le <b>multiplie par 3</b>, <b>ajoute 5</b>, puis <b>dit le résultat</b>.',
    aide: 'Dans « dire », glisse un bloc « + » : à gauche un bloc « × » avec « réponse » et 3, à droite 5.',
    tests: [[2], [7], [-4], [0.5]], attendu: ([x]) => 3 * x + 5 },
  { id: 'perimetre', niveau: '6e', titre: 'Le périmètre du rectangle', blocs: PROG_BLOCS_CALCUL,
    enonce: 'Le lutin demande la <b>longueur</b>, puis la <b>largeur</b> d\'un rectangle, et <b>dit son périmètre</b>.',
    aide: 'La réponse change à chaque question : range la longueur dans une variable avant de demander la largeur. Périmètre = 2 × (L + l).',
    tests: [[6, 4], [10, 2.5], [3, 3]], attendu: ([L, l]) => 2 * (L + l) },
  { id: 'hexagone', niveau: '5e', titre: 'L\'hexagone régulier', blocs: PROG_BLOCS_TRACE, exige: ['sc_repeter'],
    enonce: 'Trace un <b>hexagone régulier de côté 60</b> (6 côtés égaux), avec le bloc <b>répéter</b>.',
    aide: 'Le lutin fait un tour complet (360°) en 6 fois : à chaque sommet, il tourne de 360 ÷ 6.',
    trace: PROG_POLY(6, 60) },
  { id: 'etoile', niveau: '5e', titre: 'L\'étoile', blocs: PROG_BLOCS_TRACE, exige: ['sc_repeter'],
    enonce: 'Trace une <b>étoile à 5 branches</b> : 5 segments de <b>150 pas</b>, en tournant de <b>144°</b> à chaque pointe.',
    aide: 'Répéter 5 fois : avancer de 150, tourner de 144°.',
    trace: t => { t.bas(); for(let i = 0; i < 5; i++){ t.av(150).td(144); } } },
  { id: 'frise', niveau: '5e', titre: 'La frise de carrés', blocs: PROG_BLOCS_TRACE, exige: ['sc_repeter'],
    enonce: 'Trace une <b>frise de 5 carrés de côté 30</b>, alignés, espacés de <b>15 pas</b>.',
    aide: 'Deux boucles l\'une dans l\'autre : la grande répète 5 fois « un carré, puis un déplacement stylo levé de 45 ».',
    trace: t => { for(let k = 0; k < 5; k++){ PROG_POLY(4, 30)(t); t.haut().av(45); } } },
  { id: 'polygone', niveau: '5e', titre: 'Le polygone à la demande', blocs: PROG_BLOCS_TRACE.concat(['sc_demander', 'sc_reponse', 'sc_div', 'variables']),
    enonce: 'Le lutin <b>demande un nombre de côtés</b>, puis trace le <b>polygone régulier</b> qui a ce nombre de côtés, de <b>côté 50</b>.',
    aide: 'Répéter « réponse » fois : avancer de 50, tourner de 360 ÷ réponse.',
    tests: [[5], [8]], trace: (t, [n]) => PROG_POLY(n, 50)(t) },
  { id: 'majeur', niveau: '5e', titre: 'Majeur ou mineur ?', blocs: PROG_BLOCS_CALCUL.concat(['sc_si', 'sc_si_sinon', 'sc_inf', 'sc_sup', 'sc_egal', 'sc_ou', 'sc_et', 'sc_non']),
    enonce: 'Le lutin <b>demande l\'âge</b>. S\'il est de <b>18 ans ou plus</b>, il dit <b>majeur</b>, sinon il dit <b>mineur</b>.',
    aide: 'Utilise « si … alors … sinon ». Attention : 18 ans, c\'est majeur (« > 17 », ou « > 18 ou = 18 »).',
    tests: [[20], [18], [12], [17]], attendu: ([a]) => a >= 18 ? 'majeur' : 'mineur' },
  { id: 'pair', niveau: '5e', titre: 'Pair ou impair ?', blocs: PROG_BLOCS_CALCUL.concat(['sc_si', 'sc_si_sinon', 'sc_egal', 'sc_modulo']),
    enonce: 'Le lutin demande un <b>nombre entier</b> et dit <b>pair</b> ou <b>impair</b>.',
    aide: 'Un nombre est pair quand le reste de sa division par 2 vaut 0 (bloc « reste de … ÷ … »).',
    tests: [[4], [7], [0], [13]], attendu: ([n]) => n % 2 === 0 ? 'pair' : 'impair' },
  { id: 'somme', niveau: '5e', titre: 'La somme de 1 à 100', blocs: PROG_BLOCS_CALCUL.concat(['sc_repeter', 'sc_jusqua', 'sc_sup', 'sc_inf', 'sc_egal']), exige: ['sc_var_change', ['sc_repeter', 'sc_jusqua']],
    enonce: 'Avec une <b>variable</b> et une <b>boucle</b>, calcule 1 + 2 + 3 + … + 100, puis fais <b>dire le résultat</b>.',
    aide: 'Deux variables : « nombre » (de 1 à 100) et « somme ». À chaque tour : ajouter « nombre » à « somme », puis ajouter 1 à « nombre ».',
    tests: [[]], attendu: () => 5050 },
]);
function progDefiParId(id){ return PROG_DEFIS.find(d => d.id === id) || null; }
function progModeleSegments(d, entrees){ if(!d || !d.trace) return null; const t = new ProgTortue(); d.trace(t, entrees || (d.tests && d.tests[0]) || []); return t.segments; }

/* ---------------------------------------------------------------------
   Vérification des tracés : à une isométrie près
   --------------------------------------------------------------------- */
function progFusionner(segs){
  const TOL = 1.5, L = s => Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
  let s = segs.filter(x => L(x) > 0.8).map(x => ({ x1: x.x1, y1: x.y1, x2: x.x2, y2: x.y2 }));
  let fusion = true;
  while(fusion){
    fusion = false;
    for(let i = 0; i < s.length && !fusion; i++) for(let j = i + 1; j < s.length && !fusion; j++){
      const a = s[i], b = s[j], la = L(a), ux = (a.x2 - a.x1) / la, uy = (a.y2 - a.y1) / la;
      const d1 = Math.abs((b.x1 - a.x1) * uy - (b.y1 - a.y1) * ux), d2 = Math.abs((b.x2 - a.x1) * uy - (b.y2 - a.y1) * ux);
      if(d1 > TOL || d2 > TOL) continue; // pas sur la même droite
      const p = [0, la, (b.x1 - a.x1) * ux + (b.y1 - a.y1) * uy, (b.x2 - a.x1) * ux + (b.y2 - a.y1) * uy];
      const lo = Math.min(p[2], p[3]), hi = Math.max(p[2], p[3]);
      if(lo > la + TOL || hi < -TOL) continue; // disjoints
      const m = Math.min(0, lo), M = Math.max(la, hi);
      s[i] = { x1: a.x1 + ux * m, y1: a.y1 + uy * m, x2: a.x1 + ux * M, y2: a.y1 + uy * M }; s.splice(j, 1); fusion = true;
    }
  }
  return s;
}
function progMemeFigure(eleve, ref){
  const A = progFusionner(eleve), B = progFusionner(ref), TOL = 3;
  if(!A.length || A.length !== B.length) return false;
  const L = s => Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
  const r0 = B.reduce((m, s) => L(s) > L(m) ? s : m, B[0]), a0 = Math.atan2(r0.y2 - r0.y1, r0.x2 - r0.x1);
  const proche = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2) <= TOL;
  for(const miroir of [1, -1]){
    const S = A.map(s => ({ x1: s.x1 * miroir, y1: s.y1, x2: s.x2 * miroir, y2: s.y2 }));
    for(const c of S){
      if(Math.abs(L(c) - L(r0)) > TOL) continue;
      for(const [px, py, qx, qy] of [[c.x1, c.y1, c.x2, c.y2], [c.x2, c.y2, c.x1, c.y1]]){
        const ang = a0 - Math.atan2(qy - py, qx - px), co = Math.cos(ang), si = Math.sin(ang);
        const tr = (x, y) => [r0.x1 + (x - px) * co - (y - py) * si, r0.y1 + (x - px) * si + (y - py) * co];
        const libres = B.slice(); let ok = true;
        for(const s of S){
          const [x1, y1] = tr(s.x1, s.y1), [x2, y2] = tr(s.x2, s.y2);
          const k = libres.findIndex(r => (proche(x1, y1, r.x1, r.y1) && proche(x2, y2, r.x2, r.y2)) || (proche(x1, y1, r.x2, r.y2) && proche(x2, y2, r.x1, r.y1)));
          if(k < 0){ ok = false; break; } libres.splice(k, 1);
        }
        if(ok) return true;
      }
    }
  }
  return false;
}
// Défis « sur place » (CM1) : chaque cible repassée au bon endroit, et aucun trait ailleurs.
function progSurPlace(eleve, cibles){
  const A = progFusionner(eleve), TOL = 4, L = s => Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
  if(!A.length) return 'Le lutin n\'a rien tracé : as-tu mis le stylo en position d\'écriture ?';
  const surLigne = (s, c) => { const l = L(c), ux = (c.x2 - c.x1) / l, uy = (c.y2 - c.y1) / l, d = (x, y) => Math.abs((x - c.x1) * uy - (y - c.y1) * ux);
    if(d(s.x1, s.y1) > TOL || d(s.x2, s.y2) > TOL) return null; const p = [(s.x1 - c.x1) * ux + (s.y1 - c.y1) * uy, (s.x2 - c.x1) * ux + (s.y2 - c.y1) * uy]; return [Math.min(...p), Math.max(...p), l]; };
  for(const s of A){ const k = cibles.map(c => surLigne(s, c)).find(r => r && r[0] > -TOL && r[1] < r[2] + TOL); if(!k) return 'Un de tes traits n\'est pas sur les pointillés (ou il dépasse). Relève le stylo pour te déplacer sans tracer.'; }
  for(const c of cibles){ if(!A.some(s => { const r = surLigne(s, c); return r && r[0] < TOL && r[1] > r[2] - TOL; })) return 'Il manque un trait : tous les pointillés doivent être repassés, en entier.'; }
  return null;
}
// Indice quand la figure ne correspond pas.
function progIndiceTrace(eleve, ref){
  const A = progFusionner(eleve), B = progFusionner(ref), L = s => Math.hypot(s.x2 - s.x1, s.y2 - s.y1);
  if(!A.length) return 'Le lutin n\'a rien dessiné : as-tu mis le stylo en position d\'écriture ?';
  if(A.length !== B.length) return `Ta figure a ${A.length} trait${A.length > 1 ? 's' : ''} (bout à bout alignés comptés pour un), il en faut ${B.length}.`;
  const la = A.map(L).sort((x, y) => x - y), lb = B.map(L).sort((x, y) => x - y);
  if(la.some((v, i) => Math.abs(v - lb[i]) > 3)) return 'Il y a le bon nombre de traits, mais pas les bonnes longueurs.';
  return 'Les longueurs sont bonnes, mais pas les angles : vérifie de combien tourne le lutin.';
}
function progCompter(ws){
  const n = {}; ws.getAllBlocks(false).forEach(b => { if(!b.isShadow()) n[b.type] = (n[b.type] || 0) + 1; }); return n;
}
// Signalé (session) : « le résultat est 11 » refusé alors qu'on attendait 11 -- réponse jugée « farfelue ».
// Une phrase est acceptée : pour un nombre, le dernier nombre qu'elle contient ; pour un mot (pair, majeur…),
// le mot entier présent dans la phrase (« impair » ne contient pas le mot « pair »).
function progEgal(dit, att){
  const t = String(dit ?? '').trim();
  if(typeof att === 'number'){
    const v = parseFloat(t.replace(',', '.'));
    if(/^[-−]?\d+([.,]\d+)?$/.test(t)) return !isNaN(v) && Math.abs(v - att) < 1e-6;
    const n = t.replace(/−/g, '-').match(/-?\d+(?:[.,]\d+)?/g);
    return !!n && Math.abs(parseFloat(n[n.length - 1].replace(',', '.')) - att) < 1e-6;
  }
  const a = String(att).trim().toLowerCase(), d = t.toLowerCase();
  if(d === a) return true;
  const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-zàâçéèêëîïôûùüÿœ])' + esc + '($|[^a-zàâçéèêëîïôûùüÿœ])', 'i').test(d);
}
function progFmt(v){ return typeof v === 'number' ? String(Math.round(v * 1e6) / 1e6).replace('.', ',') : String(v); }
// Lance le programme sans l'afficher (autant de fois qu'il y a de tests) ; { ok, message }.
async function progVerifierDefi(d, ws){
  const nb = progCompter(ws);
  if(!nb.sc_drapeau) return { ok: false, message: 'Ajoute le bloc « quand 🏁 est cliqué » au début de ton programme.' };
  const exige = (d.exige || []).filter(e => Array.isArray(e) ? !e.some(x => nb[x]) : !nb[e]);
  const tests = d.tests || [[]];
  for(const entrees of tests){
    const m = new ProgMachine({ scene: null, reponses: entrees.slice(), max: 200000, depart: d.depart || null });
    try{ await m.lancer(ws); }
    catch(e){ return { ok: false, message: e instanceof ProgErreur ? e.message : 'Ton programme s\'arrête sur une erreur : ' + e.message }; }
    const avec = entrees.length ? ` (avec ${entrees.map(progFmt).join(' puis ')})` : '';
    if(d.cibles){
      const err = progSurPlace(m.t.segments, d.cibles); if(err) return { ok: false, message: err };
    } else if(d.trace){
      const ref = progModeleSegments(d, entrees);
      if(!progMemeFigure(m.t.segments, ref)) return { ok: false, message: progIndiceTrace(m.t.segments, ref) + (tests.length > 1 ? avec : '') };
    } else {
      const att = d.attendu(entrees), dit = m.dits[m.dits.length - 1];
      if(dit === undefined) return { ok: false, message: 'Ton programme doit dire le résultat (bloc « dire », catégorie Apparence).' };
      if(!progEgal(dit, att)) return { ok: false, message: `Presque : ${entrees.length ? 'avec ' + entrees.map(progFmt).join(' puis ') + ', ' : ''}ton programme dit « ${dit} », mais on attendait « ${progFmt(att)} ».` };
    }
  }
  if(exige.length){
    const noms = { sc_repeter: 'répéter', sc_jusqua: 'répéter jusqu\'à', sc_var_change: 'ajouter … à (variable)' };
    return { ok: false, message: 'Ton programme donne le bon résultat, mais pour ce défi il faut utiliser : ' + exige.map(e => Array.isArray(e) ? e.map(x => '« ' + (noms[x] || x) + ' »').join(' ou ') : '« ' + (noms[e] || e) + ' »').join(', ') + '.' };
  }
  return { ok: true, message: tests.length > 1 && !d.trace ? `Bravo ! Ton programme donne le bon résultat pour ${tests.map(e => e.map(progFmt).join(' puis ')).join(', ')}.` : 'Bravo, défi réussi !' };
}

/* ---------------------------------------------------------------------
   Progression (prog_progress, ou l'appareil pour un visiteur)
   --------------------------------------------------------------------- */
let progSuivi = {}; // defi_id -> { programme, reussi, tentatives }
function progCle(id){ return 'progDefi:' + ((currentUser && currentUser.id) || 'anon') + ':' + id; }
async function progChargerSuivi(){
  progSuivi = {};
  PROG_DEFIS.forEach(d => { try{ const v = JSON.parse(localStorage.getItem(progCle(d.id)) || 'null'); if(v) progSuivi[d.id] = v; }catch(e){} });
  if(!currentUser) return;
  const { data } = await sb.from('prog_progress').select('defi_id,programme,reussi,tentatives').eq('user_id', currentUser.id);
  (data || []).forEach(r => { progSuivi[r.defi_id] = Object.assign(progSuivi[r.defi_id] || {}, { programme: r.programme || (progSuivi[r.defi_id] || {}).programme, reussi: r.reussi, tentatives: r.tentatives }); });
}
function progSuiviLocal(id){ try{ localStorage.setItem(progCle(id), JSON.stringify(progSuivi[id] || {})); }catch(e){} }
async function progSuiviBase(id, champs){
  if(!currentUser) return;
  const s = progSuivi[id] || {};
  const row = Object.assign({ user_id: currentUser.id, defi_id: id, programme: s.programme || null, reussi: !!s.reussi, tentatives: s.tentatives || 0, updated_at: new Date().toISOString() }, champs || {});
  const { error } = await sb.from('prog_progress').upsert(row, { onConflict: 'user_id,defi_id' });
  if(error) console.warn('prog_progress', error.message);
}
function progDefiSauver(d, json){
  progSuivi[d.id] = Object.assign(progSuivi[d.id] || {}, { programme: json });
  progSuiviLocal(d.id);
  if(progEnSession()) return; // session : le travail est déjà enregistré par la session (moins de requêtes)
  clearTimeout(progDefiSauver.t); progDefiSauver.t = setTimeout(() => progSuiviBase(d.id), 800);
}

/* ---------------------------------------------------------------------
   Affichage : liste des défis, consigne, vérification
   --------------------------------------------------------------------- */
async function progDefisInit(opts){
  // Défis créés par les professeurs (prog-perso.js) : les siens, et ceux d'un devoir ou d'une lecture.
  if(typeof progPersoCharger === 'function'){ await progPersoCharger(); await progPersoAssurer([].concat(prog.devoir ? prog.devoir.prog_defis || [] : [], prog.lecture ? [prog.lecture.defi] : [])); }
  await progChargerSuivi();
  if(prog.lecture) return progLecture();
  if(prog.devoir){ progDefisAfficher(); return progDevoirRendre(); }
  if(opts && opts.libre) return progMode('libre');
  return progDefisAfficher(opts && opts.defi);
}
function progEnSession(){ return typeof cx !== 'undefined' && !!(cx && cx.prog && cx.prog.defi); }
function progDefisVisibles(){ return prog.devoir ? (prog.devoir.prog_defis || []).map(progDefiParId).filter(Boolean) : PROG_DEFIS; }
function progDefisAfficher(id){
  progSauverCourant();
  prog.mode = 'defis';
  document.querySelectorAll('#progTabs button').forEach(b => b.classList.toggle('on', b.dataset.m === 'defis'));
  // Session COURS : ni onglets ni liste des défis, même un instant (un élève pouvait changer de défi -- signalé :
  // « En mode Présentation, les élèves pouvaient passer à l'exercice suivant (codage) »).
  document.getElementById('progTabs').hidden = !!prog.devoir || progEnSession();
  document.getElementById('progListe').hidden = progEnSession(); document.getElementById('progModeleLbl').hidden = false;
  const liste = progDefisVisibles();
  const d = progDefiParId(progEnSession() ? cx.prog.defi : id) || liste.find(x => !(progSuivi[x.id] || {}).reussi) || liste[0];
  progDefi(d.id);
}
function progListeRender(){
  const el = document.getElementById('progListe'); if(!el) return;
  const liste = progDefisVisibles(); let niv = '';
  el.innerHTML = liste.map((d, i) => {
    const s = progSuivi[d.id] || {}, titreNiv = !prog.devoir && (d.groupe || d.niveau) !== niv ? `<p class="prog-niv">${progEsc(niv = d.groupe || d.niveau)}</p>` : '';
    return `${titreNiv}<button type="button" class="prog-item${prog.defi && prog.defi.id === d.id ? ' on' : ''}${s.reussi ? ' ok' : ''}" onclick="progDefi('${d.id}')">
      <span class="n">${s.reussi ? '<span class="gicon">check</span>' : i + 1}</span><span class="t">${progEsc(d.titre)}<small>${d.trace || d.cibles ? 'Tracé' : 'Calcul'}${s.tentatives ? ' · ' + s.tentatives + ' essai' + (s.tentatives > 1 ? 's' : '') : ''}</small></span></button>`;
  }).join('') + (typeof progPersoListeBouton === 'function' ? progPersoListeBouton() : '');
  const b = document.getElementById('progDevoirBandeau');
  if(prog.devoir){ const n = liste.filter(x => (progSuivi[x.id] || {}).reussi).length;
    b.hidden = false; b.innerHTML = `<span class="gicon">assignment</span> Devoir : ${progEsc(prog.devoir.titre)} · <b>${n} / ${liste.length}</b> réussi${n > 1 ? 's' : ''}`; }
  else b.hidden = true;
}
function progDefi(id){
  const d = progDefiParId(id); if(!d) return;
  // Session COURS (cours-exos.js) : l'éditeur reste sur le défi de l'exercice en cours -- signalé : « les
  // instructions se mélangent d'un exercice au suivant, certains exercices ne doivent pas être présents ».
  // Le bouton « Défi suivant » (liste générale) et le choix automatique du premier défi non réussi
  // ouvraient un autre défi (triangle, programme de calcul…) dont le travail partait sous l'exercice de la session.
  if(progEnSession() && id !== cx.prog.defi) return;
  if(prog.defi && prog.defi.id !== id) progSauverCourant();
  if(typeof dsEnd === 'function' && prog.ds){ dsEnd(prog.ds, (progSuivi[prog.defi && prog.defi.id] || {}).reussi ? 'terminee' : 'abandonnee'); prog.ds = null; }
  prog.defi = d; prog.mode = 'defis'; prog.creation = null;
  prog.ws.updateToolbox(progToolbox(d.blocs || null));
  const s = progSuivi[d.id] || {};
  progCharger(s.programme || progDepartDefaut());
  const c = document.getElementById('progConsigne'); c.hidden = false;
  c.innerHTML = `<div class="prog-c-head"><span class="prog-c-niv">${d.niveau}</span><b>${progEsc(d.titre)}</b>${s.reussi ? '<span class="prog-c-ok"><span class="gicon">check_circle</span> Réussi</span>' : ''}
      <span style="flex:1"></span>${typeof progPersoBouton === 'function' ? progPersoBouton(d) : ''}<button type="button" class="btn secondary qz-mini" onclick="progAide()"><span class="gicon">lightbulb</span> Aide</button>
      <button type="button" class="btn secondary qz-mini" onclick="progRecommencer()" title="Effacer ton programme et repartir de zéro"><span class="gicon">restart_alt</span></button></div>
    <p class="prog-c-txt">${d.enonce}</p>
    ${d.tests && d.tests.length > 1 && d.trace ? '<p class="hint" style="margin:0;">Pour vérifier, le programme sera lancé avec plusieurs réponses.</p>' : ''}
    <p class="prog-c-aide" id="progAideTxt" hidden><span class="gicon">lightbulb</span> ${d.aide}</p>`;
  const v = document.getElementById('progVerif'); v.hidden = false;
  v.innerHTML = `<button type="button" class="btn prog-verif-btn" onclick="progVerifier()"><span class="gicon">task_alt</span> Vérifier mon programme</button><div id="progVerifMsg"></div>`;
  document.getElementById('progModeleLbl').hidden = !d.trace;
  prog.scene.modele = d.trace && prog.modele ? progModeleSegments(d) : null;
  prog.scene.decor = d.decor || null; prog.scene.depart = d.depart || null;
  prog.scene.equipe = d.niveau === 'CM1' && typeof PL_EQUIPES !== 'undefined' ? PL_EQUIPES[0] : null; // au CM1, le lutin est Oliv'IA
  prog.scene.reset(); prog.scene.fond(); progMajPos();
  document.getElementById('progSortie').hidden = true;
  progListeRender();
  if(prog.devoir && typeof dsStart === 'function') prog.ds = dsStart('programmation', prog.devoir.id, d.id, () => { const v = document.getElementById('view-programmation'); return !!(v && v.classList.contains('active')); });
}
function progAide(){ const a = document.getElementById('progAideTxt'); if(a) a.hidden = !a.hidden; }
async function progRecommencer(){
  if(!prog.defi || !(await niceConfirm('Effacer ton programme pour ce défi et repartir de zéro ?'))) return;
  progCharger(progDepartDefaut()); progSauverCourant(); prog.scene.reset(); progMajPos();
}
async function progVerifier(){
  const d = prog.defi; if(!d) return;
  progSauverCourant();
  const msg = document.getElementById('progVerifMsg'); msg.innerHTML = '<p class="hint" style="margin:6px 0 0;">Vérification…</p>';
  const r = await progVerifierDefi(d, prog.ws);
  if(prog.tableau){ // en groupe, au tableau (planches-prog.js) : rien n'est enregistré
    msg.innerHTML = `<div class="prog-res ${r.ok ? 'ok' : 'ko'}"><span class="gicon">${r.ok ? 'celebration' : 'info'}</span> ${progEsc(r.message)}</div>`;
    if(r.ok) progLancer(); return;
  }
  const s = progSuivi[d.id] = Object.assign(progSuivi[d.id] || {}, { programme: progProgramme() });
  s.tentatives = (s.tentatives || 0) + 1;
  const premiere = r.ok && !s.reussi;
  if(r.ok) s.reussi = true;
  progSuiviLocal(d.id);
  progSuiviBase(d.id, premiere ? { reussi: true, reussi_at: new Date().toISOString() } : {});
  if(prog.ds && typeof dsAction === 'function') dsAction(prog.ds);
  msg.innerHTML = `<div class="prog-res ${r.ok ? 'ok' : 'ko'}"><span class="gicon">${r.ok ? 'celebration' : 'info'}</span> ${progEsc(r.message)}</div>
    ${r.ok && progEnSession() ? (typeof cxEleveSuivantHtml === 'function' ? cxEleveSuivantHtml() : '') : r.ok ? (() => { const l = progDefisVisibles(), i = l.findIndex(x => x.id === d.id), n = l.slice(i + 1).find(x => !(progSuivi[x.id] || {}).reussi) || l.find(x => !(progSuivi[x.id] || {}).reussi);
      return n ? `<button type="button" class="btn qz-mini" style="margin-top:8px;" onclick="progDefi('${n.id}')">Défi suivant : ${progEsc(n.titre)} <span class="gicon">arrow_forward</span></button>` : '<p class="hint" style="margin:8px 0 0;">Tous les défis sont réussis. Bravo !</p>'; })() : ''}`;
  if(r.ok && (d.trace || d.cibles)) progLancer(); // un tracé se redessine ; un calcul redemanderait un nombre
  if(premiere && prog.devoir) await progDevoirRendre();
  progListeRender();
  const c = document.querySelector('.prog-c-head b'); if(r.ok && c && !document.querySelector('.prog-c-ok')) c.insertAdjacentHTML('afterend', '<span class="prog-c-ok"><span class="gicon">check_circle</span> Réussi</span>');
}
// Devoir : rendu quand tous ses défis sont réussis (y compris des défis déjà réussis hors devoir,
// constaté dès l'ouverture). Une seule fois : pas de nouveau message s'il est déjà rendu.
async function progDevoirRendre(){
  const dv = prog.devoir; if(!dv || !currentUser || currentUserRole !== 'eleve') return;
  const l = progDefisVisibles(); if(!l.length || !l.every(x => (progSuivi[x.id] || {}).reussi)) return;
  const { data: deja } = await sb.from('devoirs_rendus').select('est_rendu').eq('devoir_id', dv.id).eq('student_id', currentUser.id).maybeSingle();
  if(deja && deja.est_rendu) return;
  const { error } = await sb.from('devoirs_rendus').upsert({ devoir_id: dv.id, student_id: currentUser.id, type: 'programmation', est_rendu: true, a_reprendre: false, submitted_at: new Date().toISOString() }, { onConflict: 'devoir_id,student_id' });
  if(!error && typeof niceAlert === 'function') niceAlert('Tous les défis du devoir sont réussis : ton devoir est rendu. Bravo !');
}
// Depuis « Mes devoirs ».
async function progOuvrirDevoir(devoirId){
  const { data: d } = await sb.from('devoirs').select('id,titre,prog_defis').eq('id', devoirId).single();
  if(!d){ niceAlert('Devoir introuvable.'); return; }
  await progOuvrir({ devoir: d });
}
/* Professeur : programme d'un élève, en lecture (depuis les résultats d'un devoir). Rien n'est
   enregistré (progSauverCourant ignore ce mode) ; le lutin peut être lancé pour voir le résultat. */
function progVoirEleve(i){ const v = (window._progVoirCache || [])[i]; if(v) progOuvrir({ lecture: v }); }
function progLecture(){
  const v = prog.lecture, d = progDefiParId(v.defi); if(!d) return;
  prog.devoir = null; prog.defi = null; prog.mode = 'defis';
  document.getElementById('progTabs').hidden = true; document.getElementById('progListe').hidden = true;
  prog.ws.updateToolbox(progToolbox(d.blocs || null));
  progCharger(v.programme);
  const c = document.getElementById('progConsigne'); c.hidden = false;
  c.innerHTML = `<div class="prog-c-head"><span class="prog-c-niv">${d.niveau}</span><b>${progEsc(d.titre)}</b><span style="flex:1"></span>
      <button type="button" class="btn secondary qz-mini" onclick="progLectureRetour()"><span class="gicon">arrow_back</span> Retour aux résultats</button></div>
    <p class="prog-c-txt">${d.enonce}</p>`;
  const b = document.getElementById('progDevoirBandeau'); b.hidden = false;
  b.innerHTML = `<span class="gicon">visibility</span> Programme de ${progEsc(v.nom)} · lecture seule`;
  document.getElementById('progVerif').hidden = true; document.getElementById('progModeleLbl').hidden = !d.trace;
  prog.scene.modele = d.trace && prog.modele ? progModeleSegments(d) : null;
  prog.scene.decor = d.decor || null; prog.scene.depart = d.depart || null;
  prog.scene.reset(); prog.scene.fond(); progMajPos();
  document.getElementById('progSortie').hidden = true;
}
function progLectureRetour(){
  const v = prog && prog.lecture; if(prog) prog.lecture = null;
  showView('view-devoirs-prof'); if(typeof setActiveTopnav === 'function') setActiveTopnav('devoirsprof');
  if(v && typeof openDevoirSubmissions === 'function') openDevoirSubmissions(v.devoirId);
}
function progQuitterDevoir(){ if(prog){ if(prog.ds && typeof dsEnd === 'function'){ dsEnd(prog.ds, 'abandonnee'); prog.ds = null; } prog.devoir = null; } }

(function progDefisStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .prog-niv{margin:6px 0 2px;font:700 .78rem 'Space Grotesk',sans-serif;color:#5B6472;text-transform:uppercase;letter-spacing:.5px;}
    .prog-item{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1.5px solid rgba(28,43,57,.1);background:#fff;border-radius:12px;padding:8px 10px;cursor:pointer;font:inherit;flex:none;}
    .prog-item:hover{border-color:rgba(76,151,255,.5);} .prog-item.on{border-color:#4C97FF;box-shadow:0 0 0 3px rgba(76,151,255,.18);}
    .prog-item .n{width:26px;height:26px;border-radius:50%;background:rgba(28,43,57,.07);display:inline-flex;align-items:center;justify-content:center;font:700 .82rem 'Space Grotesk',sans-serif;color:#5B6472;flex:none;}
    .prog-item.ok .n{background:#1E7B34;color:#fff;} .prog-item.ok .n .gicon{font-size:1rem;}
    .prog-item .t{display:flex;flex-direction:column;font-weight:600;font-size:.9rem;line-height:1.25;} .prog-item small{font-weight:500;color:#8A919C;font-size:.74rem;}
    @media (max-width:1000px){ .prog-item{width:auto;min-width:170px;} .prog-niv{display:none;} }
    .prog-c-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .prog-c-head b{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;}
    .prog-c-niv{background:#4C97FF;color:#fff;border-radius:999px;padding:1px 9px;font:700 .72rem Inter,sans-serif;}
    .prog-c-ok{display:inline-flex;align-items:center;gap:4px;color:#1E7B34;font-weight:700;font-size:.85rem;} .prog-c-ok .gicon{font-size:1.1rem;}
    .prog-c-txt{margin:8px 0 4px;font-size:1rem;}
    .prog-c-aide{margin:8px 0 0;background:rgba(255,191,0,.14);border-radius:10px;padding:8px 12px;display:flex;gap:8px;align-items:flex-start;font-size:.92rem;}
    .prog-c-aide[hidden]{display:none;} .prog-c-aide .gicon{color:#CC9900;}
    .prog-verif-btn{width:100%;justify-content:center;background:#4CBF56;border-color:#4CBF56;}
    .prog-res{display:flex;gap:8px;align-items:flex-start;border-radius:10px;padding:9px 12px;margin-top:8px;font-weight:600;font-size:.92rem;}
    .prog-res.ok{background:rgba(30,123,52,.1);color:#1E7B34;} .prog-res.ko{background:rgba(255,130,8,.12);color:#9A4A12;}
  `;
  document.head.appendChild(st);
})();

/* ---------------------------------------------------------------------
   Corrections en blocs -- demandé : « il serait bien d'avoir la correction des blocs » (cahier : sessions et
   devoirs de programmation). Un programme possible par défi, écrit dans une petite notation :
   instructions ['av', n] ['td', n] ['tg', n] ['bas'] ['haut'] ['rep', n, [...]] ['demander', 'texte']
   ['dire', e] ['set', 'variable', e] ['ajouter', e, 'variable'] ['si', condition, [...], [...]] ;
   valeurs : nombre, texte, ['réponse'], ['var', 'nom'], [opérateur, a, b] avec + − × ÷ > < = reste.
   progSolutionHtml : les blocs dessinés (progBlocsHtml, styles en ligne : ils s'impriment dans le cahier) ;
   progSolutionJson : le même programme pour Blockly (vérifié automatiquement : chaque correction réussit son défi).
   --------------------------------------------------------------------- */
const PROG_SOLUTIONS = {
  'cm1-perp': [['tg', 90], ['bas'], ['av', 180]],
  'cm1-perp-a': [['haut'], ['av', 240], ['tg', 90], ['bas'], ['av', 180]],
  'cm1-perp-grad': [['haut'], ['av', 210], ['tg', 90], ['bas'], ['av', 150]],
  'cm1-para': [['haut'], ['tg', 90], ['av', 140], ['td', 90], ['bas'], ['av', 320]],
  'cm1-equerre': [['bas'], ['tg', 90], ['av', 120], ['td', 90], ['av', 200]],
  'cm1-rectangle': [['bas'], ['rep', 2, [['av', 240], ['tg', 90], ['av', 120], ['tg', 90]]]],
  segment: [['bas'], ['av', 150]],
  carre: [['bas'], ['rep', 4, [['av', 100], ['td', 90]]]],
  rectangle: [['bas'], ['rep', 2, [['av', 160], ['td', 90], ['av', 80], ['td', 90]]]],
  triangle: [['bas'], ['rep', 3, [['av', 120], ['td', 120]]]],
  escalier: [['bas'], ['rep', 4, [['tg', 90], ['av', 40], ['td', 90], ['av', 40]]]],
  'deux-carres': [['bas'], ['rep', 4, [['av', 60], ['td', 90]]], ['haut'], ['av', 100], ['bas'], ['rep', 4, [['av', 60], ['td', 90]]]],
  calcul: [['demander', 'Choisis un nombre'], ['dire', ['+', ['×', ['réponse'], 3], 5]]],
  perimetre: [['demander', 'Longueur ?'], ['set', 'longueur', ['réponse']], ['demander', 'Largeur ?'], ['set', 'largeur', ['réponse']], ['dire', ['×', 2, ['+', ['var', 'longueur'], ['var', 'largeur']]]]],
  hexagone: [['bas'], ['rep', 6, [['av', 60], ['td', ['÷', 360, 6]]]]],
  etoile: [['bas'], ['rep', 5, [['av', 150], ['td', 144]]]],
  frise: [['rep', 5, [['bas'], ['rep', 4, [['av', 30], ['td', 90]]], ['haut'], ['av', 45]]]],
  polygone: [['demander', 'Combien de côtés ?'], ['bas'], ['rep', ['réponse'], [['av', 50], ['td', ['÷', 360, ['réponse']]]]]],
  majeur: [['demander', 'Quel est ton âge ?'], ['si', ['>', ['réponse'], 17], [['dire', 'majeur']], [['dire', 'mineur']]]],
  pair: [['demander', 'Donne un nombre entier'], ['si', ['=', ['reste', ['réponse'], 2], 0], [['dire', 'pair']], [['dire', 'impair']]]],
  somme: [['set', 'nombre', 1], ['set', 'somme', 0], ['rep', 100, [['ajouter', ['var', 'nombre'], 'somme'], ['ajouter', 1, 'nombre']]], ['dire', ['var', 'somme']]],
};
function progSolution(id){ return PROG_SOLUTIONS[id] || null; }
// Blocs dessinés à partir d'un programme Blockly (sérialisation JSON) : corrections du site (progSolutionJson) et
// programmes des défis créés par les professeurs (prog_defis_solution). Styles en ligne : ils s'impriment dans le cahier.
const PROG_BLOCS_LIB = {
  sc_drapeau: ['evenements', 'quand 🏁 est cliqué'], sc_avancer: ['mouvement', 'avancer de {N} pas'], sc_tourner_d: ['mouvement', 'tourner ↻ de {N} degrés'],
  sc_tourner_g: ['mouvement', 'tourner ↺ de {N} degrés'], sc_aller: ['mouvement', 'aller à x : {X} y : {Y}'], sc_orienter: ['mouvement', 's\'orienter à {N} degrés'],
  sc_x: ['mouvement', 'abscisse x'], sc_y: ['mouvement', 'ordonnée y'], sc_direction: ['mouvement', 'direction'],
  sc_stylo_bas: ['stylo', 'stylo en position d\'écriture'], sc_stylo_haut: ['stylo', 'relever le stylo'], sc_stylo_couleur: ['stylo', 'mettre la couleur du stylo à {COULEUR}'],
  sc_stylo_taille: ['stylo', 'mettre la taille du stylo à {N}'], sc_effacer: ['stylo', 'effacer tout'], sc_dire: ['apparence', 'dire {T}'], sc_dire_sec: ['apparence', 'dire {T} pendant {N} secondes'],
  sc_attendre: ['controle', 'attendre {N} secondes'], sc_repeter: ['controle', 'répéter {N} fois'], sc_toujours: ['controle', 'répéter indéfiniment'], sc_si: ['controle', 'si {C} alors'],
  sc_si_sinon: ['controle', 'si {C} alors'], sc_jusqua: ['controle', 'répéter jusqu\'à ce que {C}'], sc_demander: ['capteurs', 'demander {T} et attendre'], sc_reponse: ['capteurs', 'réponse'],
  sc_plus: ['operateurs', '{A} + {B}'], sc_moins: ['operateurs', '{A} − {B}'], sc_fois: ['operateurs', '{A} × {B}'], sc_div: ['operateurs', '{A} ÷ {B}'],
  sc_hasard: ['operateurs', 'nombre aléatoire entre {A} et {B}'], sc_inf: ['operateurs', '{A} < {B}'], sc_egal: ['operateurs', '{A} = {B}'], sc_sup: ['operateurs', '{A} > {B}'],
  sc_et: ['operateurs', '{A} et {B}'], sc_ou: ['operateurs', '{A} ou {B}'], sc_non: ['operateurs', 'non {A}'], sc_modulo: ['operateurs', 'reste de {A} ÷ {B}'],
  sc_arrondi: ['operateurs', 'arrondi de {A}'], sc_regrouper: ['operateurs', 'regrouper {A} et {B}'], sc_var_set: ['variables', 'mettre {VAR} à {V}'], sc_var_change: ['variables', 'ajouter {V} à {VAR}'] };
function progBlocsHtml(json){
  if(!json || !json.blocks) return '';
  const C = k => PROG_COULEURS[k][0], B = k => PROG_COULEURS[k][2], vars = {};
  (json.variables || []).forEach(v => { vars[v.id] = v.name; });
  const police = 'font:600 12.5px Inter,Arial,sans-serif;line-height:1.5;color:#fff;';
  const pill = 'display:inline-block;background:#fff;color:#575E75;border-radius:10px;padding:0 7px;margin:0 2px;font-weight:700;';
  const ovale = (k, h, angle) => `<span style="display:inline-block;background:${C(k)};border:1px solid ${B(k)};border-radius:${angle ? '4px' : '10px'};padding:0 6px;margin:0 2px;">${h}</span>`;
  const varNom = f => f ? (f.name || vars[f.id] || f.id || '') : '';
  const remplir = (b, modele) => modele.replace(/\{(\w+)\}/g, (m, n) => {
    if(n === 'VAR') return ovale('variables', progEsc(varNom(b.fields && b.fields.VAR)));
    if(n === 'COULEUR'){ const v = b.fields && b.fields.COULEUR, c = (PROG_STYLO.find(x => x[1] === v) || [v])[0]; return `<span style="${pill}">${progEsc(c)}</span>`; }
    const inp = b.inputs && b.inputs[n]; return inp ? valeur(inp.block || inp.shadow) : `<span style="${pill}">&nbsp;</span>`;
  });
  function valeur(b){
    if(!b) return `<span style="${pill}">&nbsp;</span>`;
    if(b.type === 'math_number') return `<span style="${pill}">${progEsc(String(b.fields ? b.fields.NUM : '').replace('.', ','))}</span>`;
    if(b.type === 'text') return `<span style="${pill}">${progEsc(b.fields ? b.fields.TEXT : '')}</span>`;
    if(b.type === 'variables_get') return ovale('variables', progEsc(varNom(b.fields && b.fields.VAR)));
    const L = PROG_BLOCS_LIB[b.type]; if(!L) return ovale('operateurs', progEsc(b.type));
    return ovale(L[0], remplir(b, L[1]), /^sc_(inf|egal|sup|et|ou|non)$/.test(b.type));
  }
  const chaine = b => { let h = ''; while(b){ h += instr(b); b = b.next && b.next.block; } return h; };
  function instr(b){
    const L = PROG_BLOCS_LIB[b.type] || ['controle', progEsc(b.type)], k = L[0];
    const dedans = nom => { const x = b.inputs && b.inputs[nom] && b.inputs[nom].block; return `<div style="margin:0 0 0 16px;background:#fff;border-radius:4px 0 0 4px;padding:3px 0 3px 5px;min-height:16px;">${x ? chaine(x) : ''}</div>`; };
    if(/^sc_(repeter|toujours|si|jusqua)$/.test(b.type) || b.type === 'sc_si_sinon'){
      // Bloc en C : la couleur entoure les blocs du dedans (en haut, à gauche et en bas).
      return `<div style="margin:3px 0;"><div style="display:inline-block;background:${C(k)};border:1px solid ${B(k)};border-radius:6px;padding:0 0 10px;${police}">`
        + `<div style="padding:4px 10px;">${remplir(b, L[1])}</div>${dedans('DO')}`
        + (b.type === 'sc_si_sinon' ? `<div style="padding:4px 10px;">sinon</div>${dedans('ELSE')}` : '') + '</div></div>';
    }
    const chapeau = b.type === 'sc_drapeau' ? 'border-radius:14px 14px 5px 5px;' : 'border-radius:5px;';
    return `<div style="margin:3px 0;"><span style="display:inline-block;background:${C(k)};border:1px solid ${B(k)};${chapeau}padding:4px 10px;${police}">${remplir(b, L[1])}</span></div>`;
  }
  const tops = (json.blocks.blocks || []), hats = tops.filter(b => b.type === 'sc_drapeau');
  return `<div style="margin:6px 0;">${(hats.length ? hats : tops).map(chaine).join('<div style="height:8px;"></div>')}</div>`;
}
function progSolutionHtml(sol){ return progBlocsHtml(progSolutionJson(sol)); }
// Le même programme au format Blockly (sérialisation JSON), pour le lancer et le vérifier.
function progSolutionJson(sol){
  const vars = {}, vid = n => (vars[n] = vars[n] || 'v_' + n);
  const num = v => ({ shadow: { type: 'math_number', fields: { NUM: v } } }), txt = v => ({ shadow: { type: 'text', fields: { TEXT: v } } });
  const OPS = { '+': 'sc_plus', '−': 'sc_moins', '×': 'sc_fois', '÷': 'sc_div', '>': 'sc_sup', '<': 'sc_inf', '=': 'sc_egal', reste: 'sc_modulo' };
  const ex = e => {
    if(typeof e === 'number') return num(e);
    if(typeof e === 'string') return txt(e);
    if(e[0] === 'réponse') return { block: { type: 'sc_reponse' } };
    if(e[0] === 'var') return { block: { type: 'variables_get', fields: { VAR: { id: vid(e[1]) } } } };
    return { block: { type: OPS[e[0]], inputs: { A: ex(e[1]), B: ex(e[2]) } } };
  };
  const chaine = l => {
    let tete = null, cour = null;
    l.forEach(([t, a, b, c]) => {
      const T = { av: 'sc_avancer', td: 'sc_tourner_d', tg: 'sc_tourner_g' };
      let k;
      if(T[t]) k = { type: T[t], inputs: { N: ex(a) } };
      else if(t === 'bas') k = { type: 'sc_stylo_bas' };
      else if(t === 'haut') k = { type: 'sc_stylo_haut' };
      else if(t === 'demander') k = { type: 'sc_demander', inputs: { T: ex(a) } };
      else if(t === 'dire') k = { type: 'sc_dire', inputs: { T: ex(a) } };
      else if(t === 'set') k = { type: 'sc_var_set', fields: { VAR: { id: vid(a) } }, inputs: { V: ex(b) } };
      else if(t === 'ajouter') k = { type: 'sc_var_change', fields: { VAR: { id: vid(b) } }, inputs: { V: ex(a) } };
      else if(t === 'rep'){ k = { type: 'sc_repeter', inputs: { N: ex(a) } }; const o = chaine(b); if(o) k.inputs.DO = { block: o }; }
      else if(t === 'si'){ k = { type: 'sc_si_sinon', inputs: { C: ex(a) } }; const o = chaine(b), n = chaine(c || []); if(o) k.inputs.DO = { block: o }; if(n) k.inputs.ELSE = { block: n }; }
      if(!k) return;
      if(!tete) tete = cour = k; else { cour.next = { block: k }; cour = k; }
    });
    return tete;
  };
  const corps = chaine(sol), hat = { type: 'sc_drapeau', x: 30, y: 30 };
  if(corps) hat.next = { block: corps };
  const json = { blocks: { languageVersion: 0, blocks: [hat] } };
  const v = Object.keys(vars); if(v.length) json.variables = v.map(n => ({ name: n, id: vars[n] }));
  return json;
}
// Correction dessinée par Blockly lui-même (rendu « zelos » de l'éditeur), figée en image SVG -- signalé : « la correction
// ne ressemble pas à codablock ». Les styles calculés sont recopiés sur chaque élément : l'image s'affiche et
// s'imprime seule dans le cahier, sans Blockly. Repli sur progBlocsHtml si Blockly ne se charge pas.
async function progBlocsSvg(json, echelle){
  if(!json || !json.blocks) return '';
  try{ await progChargerBlockly(); }catch(e){ return ''; }
  const div = document.createElement('div'); div.style.cssText = 'position:fixed;left:-12000px;top:0;width:1400px;height:1000px;';
  document.body.appendChild(div);
  let ws = null;
  try{
    ws = Blockly.inject(div, { renderer: 'zelos', theme: window.__progTheme, readOnly: true, sounds: false, media: PROG_BLOCKLY + 'media/' });
    Blockly.serialization.workspaces.load(json, ws);
    const canvas = ws.getCanvas(), bb = canvas.getBBox();
    if(!bb.width) return '';
    const clone = canvas.cloneNode(true), src = [canvas, ...canvas.querySelectorAll('*')], dst = [clone, ...clone.querySelectorAll('*')];
    const props = ['fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'font-family', 'font-size', 'font-weight', 'dominant-baseline', 'text-anchor'];
    src.forEach((el, i) => {
      const cs = getComputedStyle(el), d = dst[i];
      if(cs.display === 'none' || cs.visibility === 'hidden'){ d.setAttribute('display', 'none'); return; }
      d.setAttribute('style', props.map(p => { const v = cs.getPropertyValue(p); return v ? `${p}:${v}` : ''; }).filter(Boolean).join(';'));
      d.removeAttribute('class');
    });
    clone.removeAttribute('transform');
    const m = 3, k = echelle || 0.8, w = bb.width + 2 * m, h = bb.height + 2 * m;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${(bb.x - m).toFixed(1)} ${(bb.y - m).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}" style="width:${(w * k).toFixed(0)}px;max-width:100%;height:auto;display:block;margin:6px 0;">${clone.outerHTML}</svg>`;
  }catch(e){ console.warn('progBlocsSvg', e); return ''; }
  finally{ if(ws) ws.dispose(); div.remove(); }
}

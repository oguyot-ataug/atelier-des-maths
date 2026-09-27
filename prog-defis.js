/* =====================================================================
   prog-defis.js -- Défis de programmation (6e / 5e), vérifiés automatiquement, et devoirs.

   Chaque défi : un énoncé, une aide, éventuellement une liste de blocs autorisés, et une
   vérification :
   - « trace » : les segments dessinés par le lutin sont comparés à la figure de référence
     (tracée par une tortue), à une isométrie près (la figure peut être tracée ailleurs, tournée
     ou retournée) ; les traits bout à bout alignés comptent pour un seul côté ;
   - « dire » : le programme est lancé avec plusieurs réponses aux questions « demander », et la
     dernière phrase dite doit être le résultat attendu.
   « exige » : blocs indispensables (ex. « répéter » pour le carré).

   Progression : table prog_progress (programme, réussi, tentatives) ; devoirs de type
   « programmation » (devoirs.prog_defis) : liste réduite aux défis du devoir, devoir rendu quand
   tous sont réussis, temps actif suivi comme les autres devoirs (suivi-devoirs.js, kind
   'programmation').
   ===================================================================== */

const PROG_BLOCS_TRACE = ['sc_drapeau', 'sc_avancer', 'sc_tourner_d', 'sc_tourner_g', 'sc_aller', 'sc_orienter', 'sc_stylo_bas', 'sc_stylo_haut', 'sc_stylo_couleur', 'sc_stylo_taille', 'sc_effacer', 'sc_repeter', 'sc_attendre'];
const PROG_BLOCS_CALCUL = ['sc_drapeau', 'sc_demander', 'sc_reponse', 'sc_dire', 'sc_plus', 'sc_moins', 'sc_fois', 'sc_div', 'sc_regrouper', 'variables'];
const PROG_POLY = (n, c) => t => { t.bas(); for(let i = 0; i < n; i++){ t.av(c); t.td(360 / n); } };
const PROG_DEFIS = [
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
];
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
function progEgal(dit, att){
  if(typeof att === 'number'){ const v = parseFloat(String(dit).replace(',', '.').trim()); return !isNaN(v) && Math.abs(v - att) < 1e-6; }
  return String(dit).trim().toLowerCase() === String(att).trim().toLowerCase();
}
function progFmt(v){ return typeof v === 'number' ? String(Math.round(v * 1e6) / 1e6).replace('.', ',') : String(v); }
// Lance le programme sans l'afficher (autant de fois qu'il y a de tests) ; { ok, message }.
async function progVerifierDefi(d, ws){
  const nb = progCompter(ws);
  if(!nb.sc_drapeau) return { ok: false, message: 'Ajoute le bloc « quand 🏁 est cliqué » au début de ton programme.' };
  const exige = (d.exige || []).filter(e => Array.isArray(e) ? !e.some(x => nb[x]) : !nb[e]);
  const tests = d.tests || [[]];
  for(const entrees of tests){
    const m = new ProgMachine({ scene: null, reponses: entrees.slice(), max: 200000 });
    try{ await m.lancer(ws); }
    catch(e){ return { ok: false, message: e instanceof ProgErreur ? e.message : 'Ton programme s\'arrête sur une erreur : ' + e.message }; }
    const avec = entrees.length ? ` (avec ${entrees.map(progFmt).join(' puis ')})` : '';
    if(d.trace){
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
  clearTimeout(progDefiSauver.t); progDefiSauver.t = setTimeout(() => progSuiviBase(d.id), 800);
}

/* ---------------------------------------------------------------------
   Affichage : liste des défis, consigne, vérification
   --------------------------------------------------------------------- */
async function progDefisInit(opts){
  await progChargerSuivi();
  if(prog.lecture) return progLecture();
  if(prog.devoir){ progDefisAfficher(); return progDevoirRendre(); }
  if(opts && opts.libre) return progMode('libre');
  return progDefisAfficher(opts && opts.defi);
}
function progDefisVisibles(){ return prog.devoir ? (prog.devoir.prog_defis || []).map(progDefiParId).filter(Boolean) : PROG_DEFIS; }
function progDefisAfficher(id){
  progSauverCourant();
  prog.mode = 'defis';
  document.querySelectorAll('#progTabs button').forEach(b => b.classList.toggle('on', b.dataset.m === 'defis'));
  document.getElementById('progTabs').hidden = !!prog.devoir;
  document.getElementById('progListe').hidden = false; document.getElementById('progModeleLbl').hidden = false;
  const liste = progDefisVisibles();
  const d = progDefiParId(id) || liste.find(x => !(progSuivi[x.id] || {}).reussi) || liste[0];
  progDefi(d.id);
}
function progListeRender(){
  const el = document.getElementById('progListe'); if(!el) return;
  const liste = progDefisVisibles(); let niv = '';
  el.innerHTML = liste.map((d, i) => {
    const s = progSuivi[d.id] || {}, titreNiv = !prog.devoir && d.niveau !== niv ? `<p class="prog-niv">${(niv = d.niveau)}</p>` : '';
    return `${titreNiv}<button type="button" class="prog-item${prog.defi && prog.defi.id === d.id ? ' on' : ''}${s.reussi ? ' ok' : ''}" onclick="progDefi('${d.id}')">
      <span class="n">${s.reussi ? '<span class="gicon">check</span>' : i + 1}</span><span class="t">${progEsc(d.titre)}<small>${d.trace ? 'Tracé' : 'Calcul'}${s.tentatives ? ' · ' + s.tentatives + ' essai' + (s.tentatives > 1 ? 's' : '') : ''}</small></span></button>`;
  }).join('');
  const b = document.getElementById('progDevoirBandeau');
  if(prog.devoir){ const n = liste.filter(x => (progSuivi[x.id] || {}).reussi).length;
    b.hidden = false; b.innerHTML = `<span class="gicon">assignment</span> Devoir : ${progEsc(prog.devoir.titre)} · <b>${n} / ${liste.length}</b> réussi${n > 1 ? 's' : ''}`; }
  else b.hidden = true;
}
function progDefi(id){
  const d = progDefiParId(id); if(!d) return;
  if(prog.defi && prog.defi.id !== id) progSauverCourant();
  if(typeof dsEnd === 'function' && prog.ds){ dsEnd(prog.ds, (progSuivi[prog.defi && prog.defi.id] || {}).reussi ? 'terminee' : 'abandonnee'); prog.ds = null; }
  prog.defi = d; prog.mode = 'defis';
  prog.ws.updateToolbox(progToolbox(d.blocs || null));
  const s = progSuivi[d.id] || {};
  progCharger(s.programme || progDepartDefaut());
  const c = document.getElementById('progConsigne'); c.hidden = false;
  c.innerHTML = `<div class="prog-c-head"><span class="prog-c-niv">${d.niveau}</span><b>${progEsc(d.titre)}</b>${s.reussi ? '<span class="prog-c-ok"><span class="gicon">check_circle</span> Réussi</span>' : ''}
      <span style="flex:1"></span><button type="button" class="btn secondary qz-mini" onclick="progAide()"><span class="gicon">lightbulb</span> Aide</button>
      <button type="button" class="btn secondary qz-mini" onclick="progRecommencer()" title="Effacer ton programme et repartir de zéro"><span class="gicon">restart_alt</span></button></div>
    <p class="prog-c-txt">${d.enonce}</p>
    ${d.tests && d.tests.length > 1 && d.trace ? '<p class="hint" style="margin:0;">Pour vérifier, le programme sera lancé avec plusieurs réponses.</p>' : ''}
    <p class="prog-c-aide" id="progAideTxt" hidden><span class="gicon">lightbulb</span> ${d.aide}</p>`;
  const v = document.getElementById('progVerif'); v.hidden = false;
  v.innerHTML = `<button type="button" class="btn prog-verif-btn" onclick="progVerifier()"><span class="gicon">task_alt</span> Vérifier mon programme</button><div id="progVerifMsg"></div>`;
  document.getElementById('progModeleLbl').hidden = !d.trace;
  prog.scene.modele = d.trace && prog.modele ? progModeleSegments(d) : null;
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
  const s = progSuivi[d.id] = Object.assign(progSuivi[d.id] || {}, { programme: progProgramme() });
  s.tentatives = (s.tentatives || 0) + 1;
  const premiere = r.ok && !s.reussi;
  if(r.ok) s.reussi = true;
  progSuiviLocal(d.id);
  progSuiviBase(d.id, premiere ? { reussi: true, reussi_at: new Date().toISOString() } : {});
  if(prog.ds && typeof dsAction === 'function') dsAction(prog.ds);
  msg.innerHTML = `<div class="prog-res ${r.ok ? 'ok' : 'ko'}"><span class="gicon">${r.ok ? 'celebration' : 'info'}</span> ${progEsc(r.message)}</div>
    ${r.ok ? (() => { const l = progDefisVisibles(), i = l.findIndex(x => x.id === d.id), n = l.slice(i + 1).find(x => !(progSuivi[x.id] || {}).reussi) || l.find(x => !(progSuivi[x.id] || {}).reussi);
      return n ? `<button type="button" class="btn qz-mini" style="margin-top:8px;" onclick="progDefi('${n.id}')">Défi suivant : ${progEsc(n.titre)} <span class="gicon">arrow_forward</span></button>` : '<p class="hint" style="margin:8px 0 0;">Tous les défis sont réussis. Bravo !</p>'; })() : ''}`;
  if(r.ok) progLancer();
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

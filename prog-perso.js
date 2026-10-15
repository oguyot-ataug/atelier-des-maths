/* =====================================================================
   prog-perso.js -- Défis de programmation créés par les professeurs

   Demandé : « Un prof peut-il créer de nouveaux exercices pour les exercices par blocs ! »

   Le professeur ne décrit pas la vérification : il PROGRAMME LA SOLUTION avec les blocs, et le site
   en déduit ce qu'il faut vérifier, comme pour les défis du site (prog-defis.js) :
   - « figure » : la figure tracée par la solution ; l'élève doit tracer la même, n'importe où et dans
     n'importe quel sens (progMemeFigure, à une isométrie près) ;
   - « place » : le lutin part d'une position imposée ; les traits de la solution sont dessinés en
     pointillés et doivent être repassés, sans rien tracer d'autre (progSurPlace, comme au CM1) ;
   - « calcul » : des jeux de valeurs donnés aux questions « demander » ; la solution calcule ce qu'il
     faut dire pour chacun, le programme de l'élève doit dire la même chose.
   Option : le bloc « répéter » obligatoire.

   Tables : prog_defis_perso (énoncé et ce qu'il faut vérifier, lisible par les utilisateurs connectés,
   pour que les élèves les reçoivent) et prog_defis_solution (programme du professeur, lui seul le lit).
   Identifiant d'un défi : « p-<uuid> » ; il se range dans PROG_DEFIS (groupe « Mes défis ») et se donne
   en devoir ou en session comme les autres.
   Dépend de programmation.js (prog, ProgMachine, ProgErreur, progCharger, progToolbox…) et de
   prog-defis.js (PROG_DEFIS, PROG_BLOCS_TRACE, PROG_BLOCS_CALCUL, progDefi, progListeRender…).
   ===================================================================== */

const PROG_PERSO_BLOCS_CALCUL = () => PROG_BLOCS_CALCUL.concat(['sc_si', 'sc_si_sinon', 'sc_inf', 'sc_sup', 'sc_egal', 'sc_ou', 'sc_et', 'sc_non', 'sc_modulo', 'sc_repeter', 'sc_jusqua']);
const PROG_PERSO_TYPES = { figure: 'Figure à tracer (n\'importe où)', place: 'Tracé sur place (départ imposé, pointillés à repasser)', calcul: 'Calcul (le lutin demande, puis dit le résultat)' };
const PROG_PERSO_NIVEAUX = ['CM1', 'CM2', '6e', '5e', '4e', '3e'];
const progPerso = { charge: false };

// Texte du professeur -> HTML sûr : **gras** et retours à la ligne.
function progPersoTexte(s){ return progEsc(String(s || '').trim()).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>'); }
// Ligne « 6 ; 4 » -> [6, 4] (virgule décimale acceptée ; un mot reste un mot).
function progPersoValeur(v){ const t = String(v).trim(), n = Number(t.replace(',', '.')); return t !== '' && !isNaN(n) ? n : t; }
function progPersoTests(txt){ return String(txt || '').split('\n').map(l => l.trim()).filter(Boolean).map(l => l.split(';').map(progPersoValeur).filter(v => v !== '')); }

// Ligne de la table -> défi utilisable partout (liste, devoirs, sessions, vérification).
function progPersoDefi(r){
  const D = r.defi || {}, segs = (D.segs || []).map(s => ({ x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2 }));
  const d = { id: 'p-' + r.id, perso: true, rowId: r.id, auteur: r.teacher_id, niveau: r.niveau || 'Perso', groupe: 'Mes défis', titre: r.titre || 'Défi sans titre',
    type: D.type === 'calcul' ? 'calcul' : 'trace', ptype: D.type, src: D,
    blocs: D.blocs === 'tout' ? null : D.blocs === 'calcul' ? PROG_PERSO_BLOCS_CALCUL() : PROG_BLOCS_TRACE,
    enonce: progPersoTexte(D.enonce), aide: progPersoTexte(D.aide) || 'Pas d\'aide pour ce défi : demande à ton professeur.' };
  if(D.repeter) d.exige = ['sc_repeter'];
  if(D.type === 'calcul'){
    const tests = D.tests || [[]], att = D.attendus || [];
    d.tests = tests;
    d.attendu = e => { const i = tests.findIndex(t => JSON.stringify(t) === JSON.stringify(e)); return i >= 0 ? att[i] : undefined; };
  } else if(D.type === 'place'){
    d.depart = D.depart || { x: 0, y: 0, dir: 90 };
    d.cibles = segs;
    d.decor = segs.map(s => Object.assign({ pointille: true }, s));
  } else d.trace = t => { segs.forEach(s => t.segments.push(Object.assign({ c: '#1C2230', t: 2 }, s))); };
  return d;
}
function progPersoAjouter(r){
  const d = progPersoDefi(r), i = PROG_DEFIS.findIndex(x => x.id === d.id);
  if(i >= 0) PROG_DEFIS[i] = d; else PROG_DEFIS.push(d);
  return d;
}
// Professeur : ses défis (au chargement du compte, puis à la demande).
async function progPersoCharger(force){
  if(progPerso.charge && !force) return;
  if(force) for(let i = PROG_DEFIS.length - 1; i >= 0; i--) if(PROG_DEFIS[i].perso) PROG_DEFIS.splice(i, 1);
  const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null;
  if(typeof sb === 'undefined' || !sb || typeof currentUser === 'undefined' || !currentUser || (role !== 'prof' && role !== 'admin')){ progPerso.charge = true; return; }
  const { data, error } = await sb.from('prog_defis_perso').select('*').eq('teacher_id', currentUser.id).order('created_at', { ascending: true });
  progPerso.charge = true;
  if(error){ console.warn('prog_defis_perso', error.message); return; }
  (data || []).forEach(progPersoAjouter);
}
// Élève (devoir, session) : les défis d'un professeur dont il a besoin.
async function progPersoAssurer(ids){
  const manque = (ids || []).filter(id => /^p-/.test(String(id)) && !progDefiParId(id)).map(id => String(id).slice(2));
  if(!manque.length || typeof sb === 'undefined' || !sb) return;
  const { data, error } = await sb.from('prog_defis_perso').select('*').in('id', manque);
  if(error){ console.warn('prog_defis_perso', error.message); return; }
  (data || []).forEach(progPersoAjouter);
}

/* ---------------------------------------------------------------------
   Éditeur (page Programmation, professeur)
   --------------------------------------------------------------------- */
function progPersoProf(){ const r = typeof currentUserRole !== 'undefined' ? currentUserRole : null; return !!(typeof currentUser !== 'undefined' && currentUser && (r === 'prof' || r === 'admin')); }
// Bouton « Modifier » dans la consigne d'un défi du professeur ; « Créer un défi » sous la liste.
function progPersoBouton(d){
  return d && d.perso && progPersoProf() && d.auteur === currentUser.id && !prog.devoir && !prog.lecture && !prog.tableau
    ? `<button type="button" class="btn secondary qz-mini" onclick="progPersoEditer('${d.rowId}')" title="Modifier l'énoncé ou la solution de ce défi"><span class="gicon">edit</span> Modifier</button>` : '';
}
function progPersoListeBouton(){
  return progPersoProf() && prog && !prog.devoir && !prog.lecture && !prog.tableau
    ? `<button type="button" class="prog-item prog-perso-nouv" onclick="progPersoEditer(null)"><span class="n"><span class="gicon">add</span></span><span class="t">Créer un défi<small>vous programmez la solution</small></span></button>` : '';
}
async function progPersoEditer(rowId){
  if(!prog || !progPersoProf()) return;
  progSauverCourant(); progArreter();
  const d = rowId ? progDefiParId('p-' + rowId) : null, D = d ? JSON.parse(JSON.stringify(d.src)) : { type: 'figure', blocs: 'trace', depart: { x: 0, y: 0, dir: 90 } };
  prog.mode = 'creation'; prog.defi = null;
  prog.creation = { rowId: rowId || null, titre: d ? d.titre : '', niveau: d ? d.niveau : (typeof currentChapterLevel !== 'undefined' && PROG_PERSO_NIVEAUX.includes(currentChapterLevel) ? currentChapterLevel : '6e'),
    type: D.type || 'figure', enonce: D.enonce || '', aide: D.aide || '', blocs: D.blocs || (D.type === 'calcul' ? 'calcul' : 'trace'), repeter: !!D.repeter,
    depart: Object.assign({ x: 0, y: 0, dir: 90 }, D.depart || {}), tests: (D.tests || [[2], [5]]).map(t => t.map(v => typeof v === 'number' ? String(v).replace('.', ',') : v).join(' ; ')).join('\n') };
  document.querySelectorAll('#progTabs button').forEach(b => b.classList.toggle('on', b.dataset.m === 'defis'));
  document.getElementById('progDevoirBandeau').hidden = true; document.getElementById('progSortie').hidden = true; document.getElementById('progModeleLbl').hidden = true;
  let sol = null;
  if(rowId){ const { data } = await sb.from('prog_defis_solution').select('programme').eq('defi_id', rowId).maybeSingle(); sol = data && data.programme; }
  progPersoForm();
  progCharger(sol || progDepartDefaut());
  progPersoScene();
  progListeRender();
}
function progPersoForm(){
  const C = prog.creation, c = document.getElementById('progConsigne'); c.hidden = false;
  const opt = (v, t, cur) => `<option value="${v}"${v === cur ? ' selected' : ''}>${t}</option>`;
  c.innerHTML = `<div class="prog-c-head"><span class="prog-c-niv" style="background:#E35D3A;">${C.rowId ? 'Modifier mon défi' : 'Nouveau défi'}</span><b>${C.rowId ? progEsc(C.titre) : 'Créer un défi'}</b><span style="flex:1"></span>
      <button type="button" class="btn secondary qz-mini" onclick="progPersoFermer()"><span class="gicon">close</span> Fermer</button></div>
    <div class="prog-pf">
      <label class="prog-pf-l prog-pf-titre">Titre<input type="text" maxlength="80" value="${progEsc(C.titre)}" oninput="prog.creation.titre=this.value" placeholder="ex. Le losange"></label>
      <label class="prog-pf-l">Niveau<select onchange="prog.creation.niveau=this.value">${PROG_PERSO_NIVEAUX.map(n => opt(n, n, C.niveau)).join('')}</select></label>
      <label class="prog-pf-l prog-pf-large">Sorte de défi<select onchange="progPersoType(this.value)">${Object.entries(PROG_PERSO_TYPES).map(([v, t]) => opt(v, t, C.type)).join('')}</select></label>
      <label class="prog-pf-l prog-pf-large">Énoncé (ce que voit l'élève) <small>**mot** pour mettre en gras</small><textarea rows="2" oninput="prog.creation.enonce=this.value" placeholder="ex. Trace un **losange** de côté 100 dont un angle mesure 60°.">${progEsc(C.enonce)}</textarea></label>
      <label class="prog-pf-l prog-pf-large">Aide (facultative, affichée au clic sur « Aide »)<textarea rows="2" oninput="prog.creation.aide=this.value">${progEsc(C.aide)}</textarea></label>
      ${C.type === 'place' ? `<div class="prog-pf-l prog-pf-large">Départ du lutin <small>(cochez « Repère » pour voir les coordonnées)</small>
        <span class="prog-pf-dep">x <input type="number" value="${C.depart.x}" onchange="prog.creation.depart.x=+this.value||0;progPersoScene()"> y <input type="number" value="${C.depart.y}" onchange="prog.creation.depart.y=+this.value||0;progPersoScene()">
        direction <input type="number" value="${C.depart.dir}" onchange="prog.creation.depart.dir=+this.value||0;progPersoScene()"> <small>(90 : vers la droite, 0 : vers le haut)</small></span></div>` : ''}
      ${C.type === 'calcul' ? `<label class="prog-pf-l prog-pf-large">Valeurs à essayer <small>une ligne par essai ; plusieurs réponses aux « demander » séparées par « ; »</small><textarea rows="3" oninput="prog.creation.tests=this.value" placeholder="2\n7\n-4">${progEsc(C.tests)}</textarea></label>` : ''}
      <label class="prog-pf-l">Blocs proposés<select onchange="prog.creation.blocs=this.value;prog.ws.updateToolbox(progToolbox(progPersoBlocs()))">${opt('trace', 'Mouvement et stylo', C.blocs)}${opt('calcul', 'Calcul, conditions, boucles', C.blocs)}${opt('tout', 'Tous les blocs', C.blocs)}</select></label>
      <label class="prog-pf-chk"><input type="checkbox" ${C.repeter ? 'checked' : ''} onchange="prog.creation.repeter=this.checked"> Le bloc « répéter » est obligatoire</label>
    </div>
    <p class="hint" style="margin:6px 0 0;"><span class="gicon" style="font-size:16px;vertical-align:-3px;">info</span> ${C.type === 'calcul' ? 'Programmez la solution ci-dessous : elle sera lancée avec chaque ligne de valeurs, et ce qu\'elle dit (dernier bloc « dire ») devient la réponse attendue.' : C.type === 'place' ? 'Programmez la solution ci-dessous : ses traits seront dessinés en pointillés, et l\'élève, parti du même endroit, devra les repasser exactement.' : 'Programmez la solution ci-dessous : la figure qu\'elle trace devient le modèle. L\'élève devra tracer la même figure, n\'importe où et dans n\'importe quel sens.'}</p>`;
  const v = document.getElementById('progVerif'); v.hidden = false;
  v.innerHTML = `<button type="button" class="btn prog-verif-btn" onclick="progPersoEnregistrer()"><span class="gicon">save</span> Enregistrer le défi</button>
    ${C.rowId ? `<button type="button" class="btn secondary qz-mini" style="margin-top:6px;color:#B3261E;" onclick="progPersoSupprimer()"><span class="gicon">delete</span> Supprimer ce défi</button>` : ''}<div id="progVerifMsg"></div>`;
  prog.ws.updateToolbox(progToolbox(progPersoBlocs()));
}
function progPersoBlocs(){ const b = prog.creation && prog.creation.blocs; return b === 'tout' ? null : b === 'calcul' ? PROG_PERSO_BLOCS_CALCUL() : PROG_BLOCS_TRACE; }
function progPersoType(t){ const C = prog.creation; C.type = t; if(t === 'calcul' && C.blocs === 'trace') C.blocs = 'calcul'; if(t !== 'calcul' && C.blocs === 'calcul') C.blocs = 'trace'; progPersoForm(); progPersoScene(); }
function progPersoScene(){
  const C = prog.creation; if(!C) return;
  prog.scene.modele = null; prog.scene.decor = null; prog.scene.equipe = null;
  prog.scene.depart = C.type === 'place' ? Object.assign({}, C.depart) : null;
  prog.scene.reset(); prog.scene.fond(); progMajPos();
}
function progPersoFermer(){ if(!prog) return; prog.creation = null; progDefisAfficher(); }

// La solution, lancée sans l'afficher : figure, traits sur place ou réponses attendues.
async function progPersoCalculer(C){
  const lancer = async (reponses, depart) => {
    const m = new ProgMachine({ scene: null, reponses: reponses.slice(), max: 200000, depart: depart || null });
    try{ await m.lancer(prog.ws); }
    catch(e){ throw new Error(e instanceof ProgErreur ? e.message : 'Votre solution s\'arrête sur une erreur : ' + e.message); }
    return m;
  };
  const arr = v => Math.round(v * 100) / 100;
  if(!progCompter(prog.ws).sc_drapeau) throw new Error('Ajoutez le bloc « quand 🏁 est cliqué » au début de votre solution.');
  if(C.type === 'calcul'){
    const tests = progPersoTests(C.tests);
    if(!tests.length) throw new Error('Indiquez au moins une ligne de valeurs à essayer (ou une ligne vide si le programme ne demande rien : écrivez alors « - »).');
    const T = tests.map(t => t.filter(v => v !== '-')), attendus = [];
    for(const t of T){
      const m = await lancer(t), dit = m.dits[m.dits.length - 1];
      if(dit === undefined) throw new Error(`Avec ${t.length ? t.join(' puis ') : 'ces valeurs'}, votre solution ne dit rien : terminez-la par un bloc « dire ».`);
      attendus.push(progPersoValeur(dit));
    }
    return { tests: T, attendus };
  }
  const m = await lancer([], C.type === 'place' ? C.depart : null);
  const segs = progFusionner(m.t.segments).map(s => ({ x1: arr(s.x1), y1: arr(s.y1), x2: arr(s.x2), y2: arr(s.y2) }));
  if(!segs.length) throw new Error('Votre solution ne trace rien : avez-vous mis le stylo en position d\'écriture ?');
  return C.type === 'place' ? { segs, depart: Object.assign({}, C.depart) } : { segs };
}
async function progPersoEnregistrer(){
  const C = prog && prog.creation; if(!C) return;
  // Le formulaire est réécrit après l'enregistrement : on retrouve la zone du message à chaque fois.
  const dire = (t, ok) => { const msg = document.getElementById('progVerifMsg'); if(msg) msg.innerHTML = `<div class="prog-res ${ok ? 'ok' : 'ko'}"><span class="gicon">${ok ? 'check_circle' : 'info'}</span> ${t}</div>`; };
  if(!String(C.titre).trim()){ dire('Donnez un titre au défi.'); return; }
  if(!String(C.enonce).trim()){ dire('Écrivez l\'énoncé que verront les élèves.'); return; }
  document.getElementById('progVerifMsg').innerHTML = '<p class="hint" style="margin:6px 0 0;">Vérification de votre solution…</p>';
  let calc;
  try{ calc = await progPersoCalculer(C); }catch(e){ dire(progEsc(e.message)); return; }
  if(C.repeter && !progCompter(prog.ws).sc_repeter){ dire('Vous avez rendu le bloc « répéter » obligatoire : votre solution doit l\'utiliser.'); return; }
  const defi = Object.assign({ type: C.type, enonce: C.enonce, aide: C.aide, blocs: C.blocs, repeter: C.repeter }, calc);
  const row = { titre: String(C.titre).trim(), niveau: C.niveau, defi, updated_at: new Date().toISOString() };
  let r;
  if(C.rowId){ ({ data: r } = await sb.from('prog_defis_perso').update(row).eq('id', C.rowId).select('*').single().then(x => { if(x.error) dire('Enregistrement impossible : ' + progEsc(x.error.message)); return x; })); }
  else { ({ data: r } = await sb.from('prog_defis_perso').insert(Object.assign({ teacher_id: currentUser.id }, row)).select('*').single().then(x => { if(x.error) dire('Enregistrement impossible : ' + progEsc(x.error.message)); return x; })); }
  if(!r) return;
  const { error: e2 } = await sb.from('prog_defis_solution').upsert({ defi_id: r.id, teacher_id: currentUser.id, programme: progProgramme(), updated_at: new Date().toISOString() }, { onConflict: 'defi_id' });
  if(e2) console.warn('prog_defis_solution', e2.message);
  const d = progPersoAjouter(r);
  C.rowId = r.id; C.titre = r.titre;
  progPersoForm();
  const resume = C.type === 'calcul' ? `réponses attendues : ${calc.tests.map((t, i) => (t.length ? t.map(progFmt).join(' ; ') : '—') + ' → ' + progFmt(calc.attendus[i])).join(', ')}` : `${calc.segs.length} trait${calc.segs.length > 1 ? 's' : ''} à ${C.type === 'place' ? 'repasser' : 'tracer'} (bout à bout alignés comptés pour un)`;
  dire(`Défi enregistré (${resume}). Il est dans « Mes défis » : vous pouvez le donner en devoir ou l'ajouter à une session. <button type="button" class="btn secondary qz-mini" style="margin-left:4px;" onclick="prog.creation=null;progDefi('${d.id}')">L'essayer comme un élève</button>`, true);
  progListeRender();
}
async function progPersoSupprimer(){
  const C = prog && prog.creation; if(!C || !C.rowId) return;
  if(!(await niceConfirm(`Supprimer le défi « ${C.titre} » ? Les élèves qui l'ont en devoir ou dans une session ne pourront plus l'ouvrir.`))) return;
  const { error } = await sb.from('prog_defis_perso').delete().eq('id', C.rowId);
  if(error){ await niceAlert('Suppression impossible : ' + error.message); return; }
  const i = PROG_DEFIS.findIndex(x => x.id === 'p-' + C.rowId); if(i >= 0) PROG_DEFIS.splice(i, 1);
  prog.creation = null; progDefisAfficher();
}

(function progPersoStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .prog-pf{display:grid;grid-template-columns:1fr 110px;gap:8px 12px;margin-top:8px;}
    .prog-pf-l{display:flex;flex-direction:column;gap:3px;font-weight:600;font-size:.85rem;} .prog-pf-l small{font-weight:500;color:#8A919C;}
    .prog-pf-large{grid-column:1 / -1;} .prog-pf-l input, .prog-pf-l select, .prog-pf-l textarea{font:inherit;font-weight:400;padding:6px 8px;border:1px solid rgba(28,43,57,.2);border-radius:8px;}
    .prog-pf-dep{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-weight:500;} .prog-pf-dep input{width:74px;}
    .prog-pf-chk{grid-column:1 / -1;display:flex;align-items:center;gap:6px;font-size:.88rem;}
    .prog-perso-nouv{border-style:dashed !important;} .prog-perso-nouv .n{background:#E35D3A !important;color:#fff !important;}
    @media (max-width:700px){ .prog-pf{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

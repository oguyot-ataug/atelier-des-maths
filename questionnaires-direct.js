/* =====================================================================
   questionnaires-direct.js -- Séance en direct : les questions d'un questionnaire posées une à une
   à toute la classe, au rythme du professeur, sans note.

   Demandé : "le prof prépare des questions comme il fait avec les interrogations en ligne mais là
   on ne note pas. Chacun répond et on corrige dans la foulée. On voit le pourcentage de réponses
   correctes ou fausses en direct live."

   - Professeur (#view-qz-direct) : lance une séance depuis un questionnaire (bouton « En direct »),
     choisit la classe, puis fait avancer les questions. Pendant une question, les réponses arrivent
     en direct : nombre d'élèves qui ont répondu, pourcentage de justes / faux, répartition des
     réponses (QCM, vrai/faux, valeurs numériques…). « Afficher la correction » montre la bonne
     réponse à tous ; « Question suivante » enchaîne ; « Terminer » donne le bilan (non noté).
   - Élève : un bandeau « Séance en direct » apparaît sur son écran ; il répond à la question en
     cours (sa réponse part toute seule et reste modifiable jusqu'à la correction), puis voit la
     correction et, à la fin, son bilan.

   Base (migration qz_direct_seances) : qz_direct (séance : copie des questions avec le corrigé,
   lue par le seul professeur ; état = phase + question en cours) et qz_direct_rep (réponses).
   L'élève passe par qz_direct_actives / qz_direct_etat / qz_direct_repondre, qui ne lui donnent
   le corrigé qu'une fois la correction affichée. Temps réel : canal « qzd-<id> » (le professeur
   annonce chaque changement, l'élève chaque réponse), doublé d'une relecture régulière.

   Dépend de questionnaires.js (qzRenderSaisie, qzEnonceHtml, qzNoteAuto, qzPages…), de
   questionnaires-banque.js (qzBanqueSur) et d'app.js (sb, currentUser, currentUserRole, showView).
   ===================================================================== */

let qzD = null;  // professeur : { id, row, etat, pages:[{docs, q}], eleves, reps:Map(qid → Map(eleve → réponse)), vus:Map, cacher, noms, ch, poll }
let qzDE = null; // élève : { id, etat, cle, ch, poll, ici, envT }

function qzDCanal(id){ return 'qzd-' + id; }
function qzDVueActive(){ const v = document.getElementById('view-qz-direct'); return !!(v && v.classList.contains('active')); }

function qzDVerdict(q, rep){ return qzVerdict(q, rep); } // questionnaires.js
const QZD_VERDICTS = [['juste', 'Juste'], ['partiel', 'En partie'], ['faux', 'Faux'], ['avoir', 'À regarder'], ['sondage', 'Sondage']];

/* =====================================================================
   PROFESSEUR
   ===================================================================== */
/* Demandé : "on distribue à une classe entière ? C'est direct ou il y a un code ? Je préfère afficher
   un code au tableau ou choisir mes élèves dans la classe (on est parfois en groupe)". Chaque séance a
   donc un code à 4 chiffres (créé par la base) ; au lancement, le professeur choisit la classe, toute
   la classe ou les élèves du groupe, et comment ils rejoignent : avec le code affiché au tableau
   (par défaut), ou automatiquement par le bandeau. `choix` (facultatif, depuis le mode « Séance en
   direct » du formulaire) : { classId, studentIds, acces } -- la fenêtre de choix est alors sautée. */
async function qzDirectLancer(questionnaireId, choix){
  const q = await qzBanqueSur(questionnaireId);
  if(!q){ await niceAlert('Questionnaire introuvable.'); return; }
  const defaut = Number((q.reglages || {}).duree_direct) || 0; // minuteur par défaut du questionnaire
  const questions = qzPreparer(JSON.parse(JSON.stringify(q.questions || []))).map(x => x.type === 'texte' || x.duree_direct != null ? x : Object.assign(x, { duree_direct: defaut }));
  const nb = questions.filter(x => x.type !== 'texte').length;
  if(!nb){ await niceAlert('Ce questionnaire n\'a pas encore de question.'); return; }
  choix = choix || await qzDirectChoix(q.titre || 'Questionnaire', nb, (q.reglages || {}).acces);
  if(!choix) return;
  const studentIds = choix.studentIds && choix.studentIds.length ? choix.studentIds : null;
  // Une seule séance ouverte par classe (ou par groupe) : la précédente (oubliée ?) est close.
  let prec = sb.from('qz_direct').update({ ended_at: new Date().toISOString() }).eq('teacher_id', currentUser.id).eq('class_id', choix.classId).is('ended_at', null);
  if(studentIds) prec = prec.overlaps('student_ids', studentIds); else prec = prec.is('student_ids', null);
  await prec;
  const { data, error } = await sb.from('qz_direct').insert({ teacher_id: currentUser.id, class_id: choix.classId, questionnaire_id: q.id || null,
    titre: q.titre || 'Séance en direct', questions, student_ids: studentIds, acces: choix.acces === 'auto' ? 'auto' : 'code', notee: !!choix.notee,
    etat: { phase: 'attente', total: nb, lancees: [] } }).select().single();
  if(error || !data){ await niceAlert('La séance n\'a pas pu être créée : ' + ((error && error.message) || '?')); return; }
  try{ localStorage.setItem('qzdAcces', data.acces); }catch(e){}
  qzDirectOuvrir(data.id);
}
function qzDirectChoix(titre, nb, accesDefaut){
  const classes = accountClassesList || [];
  if(!classes.length){ niceAlert('Aucune classe sur votre compte.'); return Promise.resolve(null); }
  let acces = accesDefaut || 'code'; try{ acces = accesDefaut || localStorage.getItem('qzdAcces') || 'code'; }catch(e){}
  // Notée ou non -- demandé : « une séance en direct devrait pouvoir être notée ou non ». Dernier choix mémorisé.
  let notee = false; try{ notee = localStorage.getItem('qzdNotee') === '1'; }catch(e){}
  const st = { classId: classes.length === 1 ? classes[0].id : null, cible: 'classe', eleves: new Set(), acces, notee, liste: [] };
  return new Promise(res => {
    const o = document.createElement('div'); o.className = 'qzd-ov';
    const rendre = () => {
      o.innerHTML = `<div class="qzd-modal" role="dialog" aria-label="Séance en direct">
        <h3><span class="gicon">cast_for_education</span> Séance en direct</h3>
        <p style="margin:4px 0 8px;"><b>${qzEsc(titre)}</b> · ${nb} question${nb > 1 ? 's' : ''}</p>
        <p class="hint" style="margin:0;">Les questions s'affichent une à une, à votre rythme. Chaque élève répond depuis son compte (ordinateur ou tablette) ; vous voyez les réponses arriver en direct et vous affichez la correction quand vous voulez. Notée ou non : vous choisissez ci-dessous.</p>
        <p class="qzd-m-lab">1. Avec quelle classe ?</p>
        <div class="qz-k-chips">${classes.map(c => `<button type="button" class="qz-k-chip${st.classId === c.id ? ' on' : ''}" data-classe="${c.id}"><span class="gicon">groups</span> ${qzEsc(c.label)}</button>`).join('')}</div>
        ${st.classId ? `<p class="qzd-m-lab">2. Qui participe ?</p>
        <div class="qz-k-chips"><button type="button" class="qz-k-chip${st.cible === 'classe' ? ' on' : ''}" data-cible="classe"><span class="gicon">groups</span> Toute la classe</button>
          <button type="button" class="qz-k-chip${st.cible === 'eleves' ? ' on' : ''}" data-cible="eleves"><span class="gicon">person</span> Un groupe : élèves choisis</button></div>
        ${st.cible === 'eleves' ? `<div class="qz-bp-list qzd-m-eleves">${st.liste.length ? st.liste.map(e => `<label class="qz-check"><input type="checkbox" data-eleve="${e.id}" ${st.eleves.has(e.id) ? 'checked' : ''}> ${qzEsc(e.label)}</label>`).join('') : '<span class="hint" style="margin:0;">Chargement…</span>'}</div>
          <p class="hint" style="margin:4px 0 0;"><span id="qzdMNb">${st.eleves.size}</span> élève(s) choisi(s) · <a href="#" data-tous>tous</a> · <a href="#" data-aucun>aucun</a></p>` : ''}
        <p class="qzd-m-lab">3. Comment les élèves rejoignent-ils ?</p>
        <div class="qzd-m-acces">
          <button type="button" class="qzd-m-opt${st.acces === 'code' ? ' on' : ''}" data-acces="code"><span class="gicon">pin</span><span><b>Avec un code affiché au tableau</b><small>En haut de la page « Mon travail », ou dans le bandeau rouge : l'élève tape le code. Seuls les élèves présents entrent.</small></span></button>
          <button type="button" class="qzd-m-opt${st.acces === 'auto' ? ' on' : ''}" data-acces="auto"><span class="gicon">bolt</span><span><b>Automatiquement</b><small>Un bandeau « Rejoindre » apparaît sur l'écran des élèves concernés, sans code.</small></span></button>
        </div>
        <p class="qzd-m-lab">4. La séance est-elle notée ?</p>
        <div class="qzd-m-acces">
          <button type="button" class="qzd-m-opt${!st.notee ? ' on' : ''}" data-notee="0"><span class="gicon">school</span><span><b>Non notée</b><small>Pour s'entraîner et corriger ensemble. Le bilan reste consultable ; vous pourrez encore décider de la noter après.</small></span></button>
          <button type="button" class="qzd-m-opt${st.notee ? ' on' : ''}" data-notee="1"><span class="gicon">grading</span><span><b>Notée</b><small>À la fin, une interrogation est créée avec une copie par élève (ses réponses du direct, corrigées automatiquement). Vous vérifiez, puis vous publiez les notes, qui vont dans le carnet.</small></span></button>
        </div>` : ''}
        <p class="hint qzd-m-err" id="qzdMErr" style="margin:10px 0 0;color:#a83c1f;"></p>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;"><button type="button" class="btn secondary" data-x>Annuler</button>
          ${st.classId ? '<button type="button" class="btn" data-go><span class="gicon">play_arrow</span> Ouvrir la séance</button>' : ''}</div></div>`;
    };
    const charger = async () => { st.liste = []; rendre(); st.liste = await qzElevesDevoir({ class_id: st.classId }); if(o.isConnected) rendre(); };
    rendre(); document.body.appendChild(o);
    if(st.classId) qzElevesDevoir({ class_id: st.classId }).then(l => { st.liste = l; });
    o.addEventListener('change', e => { const c = e.target.closest('[data-eleve]'); if(!c) return;
      if(c.checked) st.eleves.add(c.dataset.eleve); else st.eleves.delete(c.dataset.eleve);
      const n = o.querySelector('#qzdMNb'); if(n) n.textContent = st.eleves.size;
      const er = o.querySelector('#qzdMErr'); if(er) er.textContent = ''; });
    o.addEventListener('click', e => {
      const t = e.target;
      if(t === o || t.closest('[data-x]')){ o.remove(); res(null); return; }
      const cl = t.closest('[data-classe]'); if(cl){ if(st.classId !== cl.dataset.classe){ st.classId = cl.dataset.classe; st.eleves = new Set(); charger(); } return; }
      const ci = t.closest('[data-cible]'); if(ci){ st.cible = ci.dataset.cible; if(st.cible === 'eleves' && !st.liste.length) charger(); else rendre(); return; }
      const ac = t.closest('[data-acces]'); if(ac){ st.acces = ac.dataset.acces; rendre(); return; }
      const nt = t.closest('[data-notee]'); if(nt){ st.notee = nt.dataset.notee === '1'; try{ localStorage.setItem('qzdNotee', st.notee ? '1' : '0'); }catch(x){} rendre(); return; }
      if(t.closest('[data-tous]')){ e.preventDefault(); st.liste.forEach(x => st.eleves.add(x.id)); rendre(); return; }
      if(t.closest('[data-aucun]')){ e.preventDefault(); st.eleves = new Set(); rendre(); return; }
      if(t.closest('[data-go]')){
        if(st.cible === 'eleves' && !st.eleves.size){ o.querySelector('#qzdMErr').textContent = 'Choisissez au moins un élève.'; return; }
        o.remove(); res({ classId: st.classId, studentIds: st.cible === 'eleves' ? Array.from(st.eleves) : null, acces: st.acces, notee: st.notee });
      }
    });
  });
}
async function qzDirectOuvrir(id){
  qzDirectFermerProf();
  showView('view-qz-direct'); setActiveTopnav('questionnaires');
  const root = document.getElementById('qzDirectRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  const { data: row, error } = await sb.from('qz_direct').select('*,classes(nom)').eq('id', id).single();
  if(error || !row){ root.innerHTML = `<p class="hint">Séance introuvable.</p><button class="btn secondary" onclick="qzDirectQuitter()">← Interrogations</button>`; return; }
  const eleves = await qzElevesDevoir({ class_id: row.class_id, student_ids: row.student_ids });
  if(row.ended_at) row.questions = await qzDirectQuestionsAJour(row); // bilan : corrigé à jour
  const pages = qzPages(row.questions || []).map(p => ({ docs: p.filter(x => x.type === 'texte'), q: p.find(x => x.type !== 'texte') })).filter(p => p.q);
  let pref = {}; try{ pref = JSON.parse(localStorage.getItem('qzdAffichage') || '{}') || {}; }catch(e){}
  qzD = { id, row, etat: row.etat || {}, pages, eleves, reps: new Map(), valides: new Map(), vus: new Map(), cacher: !!pref.cacher, noms: false, sig: '', durees: {}, decal: 0 };
  if(qzD.etat.fin_at && !row.ended_at){ // minuteur en cours (reprise) : recaler l'horloge sur celle du serveur
    const t0 = Date.now(), { data: u } = await sb.from('qz_direct').update({ updated_at: new Date().toISOString() }).eq('id', id).select('updated_at').single();
    if(u && u.updated_at && qzD && qzD.id === id) qzD.decal = Date.parse(u.updated_at) - (t0 + Date.now()) / 2;
  }
  qzD.ch = sb.channel(qzDCanal(id), { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'rep' }, () => qzDirectRepsBientot())
    .on('broadcast', { event: 'ici' }, ({ payload }) => { if(qzD && payload && payload.e){ qzD.vus.set(payload.e, Date.now()); qzDirectMajPresence(); } })
    .subscribe();
  qzD.poll = setInterval(() => { if(qzD && !document.hidden && qzDVueActive()){ qzDirectChargerReps(); qzDirectMajPresence(); } }, 4000);
  await qzDirectChargerReps(true);
  qzDirectRender();
}
function qzDirectFermerProf(){
  if(!qzD) return;
  clearInterval(qzD.poll); clearTimeout(qzD.repT);
  try{ if(qzD.ch) sb.removeChannel(qzD.ch); }catch(e){}
  qzD = null;
}
// Retour aux interrogations : la séance reste ouverte (reprise possible depuis la liste).
function qzDirectQuitter(){
  qzDirectFermerProf();
  if(document.fullscreenElement) document.exitFullscreen().catch(() => {});
  if(typeof qzB !== 'undefined' && qzB) qzB.onglet = 'donnees';
  qzBanqueOuvrir();
}
async function qzDirectChargerReps(sansRendu){
  if(!qzD) return;
  const id = qzD.id;
  const { data, error } = await sb.from('qz_direct_rep').select('qid,student_id,reponse,valide,updated_at').eq('direct_id', id);
  if(error || !qzD || qzD.id !== id) return;
  const m = new Map(), v = new Map();
  (data || []).forEach(r => {
    if(!m.has(r.qid)){ m.set(r.qid, new Map()); v.set(r.qid, new Set()); }
    m.get(r.qid).set(r.student_id, r.reponse);
    if(r.valide) v.get(r.qid).add(r.student_id);
    const t = Date.parse(r.updated_at) || 0; if(t > (qzD.vus.get(r.student_id) || 0)) qzD.vus.set(r.student_id, t);
  });
  const sig = JSON.stringify((data || []).map(r => [r.qid, r.student_id, r.updated_at, r.valide]));
  qzD.reps = m; qzD.valides = v;
  if(!sansRendu && sig !== qzD.sig) qzDirectMajStats();
  qzD.sig = sig;
}
function qzDirectRepsBientot(){ if(!qzD) return; clearTimeout(qzD.repT); qzD.repT = setTimeout(qzDirectChargerReps, 250); }

// Changement d'état (question en cours, correction…) : enregistré, puis annoncé aux élèves.
async function qzDirectEtat(nouvel){
  if(!qzD) return false;
  const t0 = Date.now();
  const { data, error } = await sb.from('qz_direct').update({ etat: nouvel, updated_at: new Date().toISOString() }).eq('id', qzD.id).select('etat,updated_at').single();
  if(error){ await niceAlert('Erreur : ' + error.message); return false; }
  qzD.etat = (data && data.etat) || nouvel;
  if(data && data.updated_at) qzD.decal = Date.parse(data.updated_at) - (t0 + Date.now()) / 2; // horloge du serveur (minuteur)
  try{ qzD.ch.send({ type: 'broadcast', event: 'etat', payload: { phase: nouvel.phase, qid: nouvel.qid || null } }); }catch(e){}
  qzDirectRender();
  return true;
}
function qzDirectIndex(){ return qzD ? qzD.pages.findIndex(p => p.q.id === qzD.etat.qid) : -1; }
function qzDirectAller(i){
  const p = qzD && qzD.pages[i]; if(!p) return;
  const lancees = Array.from(new Set((qzD.etat.lancees || []).concat(p.q.id)));
  const duree = qzDirectDuree(p.q);
  return qzDirectEtat(Object.assign({ phase: 'question', qid: p.q.id, docs: p.docs.map(d => d.id), n: i + 1, total: qzD.pages.length, lancees, duree },
    duree ? { chrono: duree } : { fin_at: null }));
}
function qzDirectCorriger(){ return qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'correction' })); }
function qzDirectRouvrir(){ const d = qzD.etat.duree || 0; return qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'question' }, d ? { chrono: d } : { fin_at: null })); }

/* Minuteur -- demandé : "prévoir un bouton de validation pour chaque question et/ou un timer (adapté à
   chaque question)". Durée propre à chaque question (éditeur, mode Séance en direct), modifiable ici
   pendant la séance ; l'heure de fin est calculée par le serveur (déclencheur qz_direct_chrono) et, une
   fois passée, la question est close pour les élèves (qz_direct_repondre). */
const QZD_DUREES = [0, 15, 30, 45, 60, 90, 120, 180, 300];
function qzDDureeTxt(s){ s = Number(s) || 0; return !s ? 'Sans minuteur' : s < 60 ? s + ' s' : Math.floor(s / 60) + ' min' + (s % 60 ? ' ' + (s % 60) : ''); }
function qzDirectDuree(q){ return qzD && qzD.durees && qzD.durees[q.id] != null ? qzD.durees[q.id] : Number(q.duree_direct) || 0; }
function qzDNow(){ return Date.now() + ((qzD && qzD.decal) || 0); }
function qzDReste(){ const f = qzD && qzD.etat.fin_at ? Date.parse(qzD.etat.fin_at) : NaN; return isNaN(f) ? null : Math.max(0, f - qzDNow()); }
// Question close : autre question, correction affichée, ou minuteur écoulé.
function qzDFerme(qid){ return !qzD || qid !== qzD.etat.qid || qzD.etat.phase !== 'question' || !!qzD.row.ended_at || qzDReste() === 0; }
async function qzDirectChrono(sec){
  if(!qzD || qzD.etat.phase !== 'question') return;
  sec = Math.max(0, Number(sec) || 0);
  qzD.durees = qzD.durees || {}; qzD.durees[qzD.etat.qid] = sec;
  await qzDirectEtat(Object.assign({}, qzD.etat, { duree: sec }, sec ? { chrono: sec } : { fin_at: null }));
}
async function qzDirectPlus(sec){ const r = qzDReste(); if(r === null) return; await qzDirectEtat(Object.assign({}, qzD.etat, { chrono: Math.ceil(r / 1000) + sec })); }
async function qzDirectStopChrono(){ if(!(await niceConfirm('Arrêter les réponses maintenant ? Les élèves ne pourront plus répondre à cette question.'))) return; await qzDirectEtat(Object.assign({}, qzD.etat, { chrono: 0 })); }
function qzDMinuteurHtml(q){
  const r = qzDReste(), sel = `<select class="qzd-chrono-sel" onchange="qzDirectChrono(this.value)" title="Minuteur de cette question">${QZD_DUREES.concat(QZD_DUREES.includes(qzD.etat.duree || 0) ? [] : [qzD.etat.duree]).map(d => `<option value="${d}"${d === (qzD.etat.duree || 0) ? ' selected' : ''}>${d ? '⏱ ' + qzDDureeTxt(d) : 'Sans minuteur'}</option>`).join('')}</select>`;
  if(r === null) return `<div class="qzd-chrono off">${sel}</div>`;
  const s = Math.ceil(r / 1000);
  return `<div class="qzd-chrono${s === 0 ? ' fini' : s <= 10 ? ' urgent' : ''}"><span class="qzd-chrono-t" id="qzdChrono"><span class="gicon">timer</span> ${s === 0 ? 'Temps écoulé' : Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')}</span>
    ${s ? `<button type="button" class="qzd-tg" onclick="qzDirectPlus(30)" title="30 secondes de plus">+30 s</button><button type="button" class="qzd-tg" onclick="qzDirectStopChrono()" title="Clore les réponses maintenant"><span class="gicon">stop</span></button>` : `<button type="button" class="qzd-tg" onclick="qzDirectPlus(30)" title="Rouvrir 30 secondes">+30 s</button>`}${sel}</div>`;
}
// Tic du minuteur (professeur) : décompte, puis résultats recalculés quand le temps est écoulé.
function qzDirectTic(){
  if(!qzD || !qzDVueActive()) return;
  const r = qzDReste(); if(r === null || qzD.etat.phase !== 'question') return;
  const el = document.getElementById('qzdChrono'), fini = r === 0;
  if(fini !== !!qzD.chronoFini){ qzD.chronoFini = fini; qzDirectRender(); return; }
  if(el && !fini){ const s = Math.ceil(r / 1000); el.innerHTML = `<span class="gicon">timer</span> ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; el.parentElement.classList.toggle('urgent', s <= 10); }
}
setInterval(qzDirectTic, 500);
function qzDirectSuivante(){ const i = qzDirectIndex(); return i + 1 < qzD.pages.length ? qzDirectAller(i + 1) : qzDirectTerminer(); }
async function qzDirectRelancer(){
  const qid = qzD && qzD.etat.qid; if(!qid) return;
  const n = (qzD.reps.get(qid) || new Map()).size;
  if(n && !(await niceConfirm(`Effacer les ${n} réponse${n > 1 ? 's' : ''} à cette question et la reposer ?`))) return;
  await sb.from('qz_direct_rep').delete().eq('direct_id', qzD.id).eq('qid', qid);
  qzD.reps.delete(qid); if(qzD.valides) qzD.valides.delete(qid);
  const d = qzD.etat.duree || 0;
  await qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'question' }, d ? { chrono: d } : { fin_at: null }));
}
async function qzDirectTerminer(){
  if(!qzD) return;
  if(!(await niceConfirm(qzD.row.notee
    ? 'Terminer la séance ? Les élèves voient leur bilan. Une interrogation notée est créée avec leurs réponses : vous la vérifiez, puis vous publiez les notes.'
    : 'Terminer la séance ? Les élèves voient leur bilan (non noté) ; vous aussi.'))) return;
  const etat = Object.assign({}, qzD.etat, { phase: 'fin' }), fin = new Date().toISOString();
  const { error } = await sb.from('qz_direct').update({ etat, ended_at: fin, updated_at: fin }).eq('id', qzD.id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  qzD.etat = etat; qzD.row.ended_at = fin;
  try{ qzD.ch.send({ type: 'broadcast', event: 'etat', payload: { phase: 'fin' } }); }catch(e){}
  await qzDirectChargerReps(true);
  if(qzD.row.notee && !qzD.row.devoir_id) await qzDirectNoter(qzD.id, true);
  qzDirectRender();
}
/* Séance notée -- demandé : « une séance en direct devrait pouvoir être notée ou non ». On réutilise le
   circuit des interrogations : un questionnaire avec les SEULES questions posées pendant la séance
   (copie de celles de la séance, avec leur corrigé), une interrogation (devoir) donnée à la classe ou
   au groupe, et une copie rendue par élève ayant répondu, corrigée automatiquement. Le professeur
   vérifie dans « Corriger » puis publie : les notes arrivent dans le carnet comme d'habitude.
   Possible à la fin d'une séance notée (automatique) ou plus tard, depuis le bilan (« Noter cette séance »). */
async function qzDirectNoter(id, auto){
  let row = qzD && qzD.id === id ? qzD.row : null;
  if(!row){ const { data } = await sb.from('qz_direct').select('*,classes(nom)').eq('id', id).single(); row = data; }
  if(!row){ await niceAlert('Séance introuvable.'); return null; }
  if(row.devoir_id){ if(!auto) qzOuvrirCorrection(row.devoir_id); return row.devoir_id; }
  if(!auto && !(await niceConfirm('Noter cette séance ? Une interrogation est créée avec les réponses des élèves (questions posées pendant la séance seulement), corrigée automatiquement. Vous vérifierez les copies avant de publier les notes.'))) return null;
  const lancees = (row.etat && row.etat.lancees) || [];
  const questions = (await qzDirectQuestionsAJour(row)).filter(q => q.type !== 'texte' && lancees.includes(q.id));
  if(!questions.length){ await niceAlert('Aucune question n\'a été posée pendant cette séance : rien à noter.'); return null; }
  let reglages = { mode: 'direct' };
  if(row.questionnaire_id){ const { data: src } = await sb.from('questionnaires').select('reglages').eq('id', row.questionnaire_id).maybeSingle(); if(src && src.reglages) reglages = Object.assign({}, src.reglages, { mode: 'direct', brouillon: undefined, ferme: false }); }
  reglages.copie_de = (reglages.copie_de) || row.questionnaire_id || 'seance'; // copie pour la classe : pas dans la banque
  const jour = new Date(row.created_at).toLocaleDateString('fr-FR');
  const { data: qz, error: e1 } = await sb.from('questionnaires').insert({ teacher_id: currentUser.id, titre: (row.titre || 'Séance en direct') + ' (en direct du ' + jour + ')',
    questions: JSON.parse(JSON.stringify(questions)), reglages }).select('id').single();
  if(e1 || !qz){ await niceAlert('La séance n\'a pas pu être notée : ' + ((e1 && e1.message) || '?')); return null; }
  const fin = row.ended_at || new Date().toISOString();
  const { data: reps } = await sb.from('qz_direct_rep').select('qid,student_id,reponse').eq('direct_id', id);
  const parEleve = new Map();
  (reps || []).forEach(r => { if(!parEleve.has(r.student_id)) parEleve.set(r.student_id, {}); parEleve.get(r.student_id)[r.qid] = r.reponse; });
  if(!parEleve.size){ await sb.from('questionnaires').delete().eq('id', qz.id); await niceAlert('Aucun élève n\'a répondu pendant cette séance : rien à noter.'); return null; }
  // Donnée aux seuls élèves qui ont participé : un absent ne doit pas pouvoir la passer après coup.
  const { data: dv, error: e2 } = await sb.from('devoirs').insert({ teacher_id: currentUser.id, class_id: row.class_id, titre: (row.titre || 'Séance en direct') + ' (séance en direct du ' + jour + ')', type: 'questionnaire',
    questionnaire_id: qz.id, consigne: 'Séance en direct du ' + jour + '.', date_depot: row.created_at, date_limite: fin, student_ids: [...parEleve.keys()], qz_mode: qzModeCle('direct') }).select('id').single();
  if(e2 || !dv){ await sb.from('questionnaires').delete().eq('id', qz.id); await niceAlert('La séance n\'a pas pu être notée : ' + ((e2 && e2.message) || '?')); return null; }
  const copies = [...parEleve.entries()].map(([student_id, reponses]) => {
    const s = qzScoreCopie(questions, { reponses, correction: {} }, reglages);
    return { devoir_id: dv.id, student_id, started_at: row.created_at, submitted_at: fin, reponses, statut: 'rendue',
      total: s.aCorriger ? null : s.total, note: s.aCorriger ? null : s.note, updated_at: fin };
  });
  if(copies.length){
    const { error: e3 } = await sb.from('qz_copies').insert(copies);
    if(e3){ await sb.from('devoirs').delete().eq('id', dv.id); await sb.from('questionnaires').delete().eq('id', qz.id); await niceAlert('Les copies n\'ont pas pu être créées : ' + e3.message); return null; }
    // Ligne « rendu » (Mon travail de l'élève : « Revoir ma copie », puis « Voir mes résultats » une fois publiée).
    const { error: e4 } = await sb.from('devoirs_rendus').insert(copies.map(c => ({ devoir_id: dv.id, student_id: c.student_id, type: 'questionnaire', est_rendu: true, submitted_at: fin })));
    if(e4) console.warn('Séance en direct notée : lignes « rendu » non créées', e4);
  }
  await sb.from('qz_direct').update({ notee: true, devoir_id: dv.id }).eq('id', id);
  row.notee = true; row.devoir_id = dv.id;
  if(qzB && qzB.directsPasses){ const p = qzB.directsPasses.find(x => x.id === id); if(p){ p.notee = true; p.devoir_id = dv.id; } }
  if(!auto){
    await niceAlert(`Séance notée : ${copies.length} copie${copies.length > 1 ? 's' : ''} créée${copies.length > 1 ? 's' : ''}. Vérifiez-les, puis publiez les résultats pour envoyer les notes dans le carnet.`);
    qzOuvrirCorrection(dv.id);
  }
  return dv.id;
}
/* Corrigé à jour -- signalé : « j'ai inversé diviseur et reste. Les élèves avaient bien répondu mais
   ça a compté faux pour eux ! » La séance garde une copie des questions telles qu'au lancement ; une
   séance terminée (bilan, notation) prend maintenant la version ACTUELLE du questionnaire d'origine
   pour chaque question (même identifiant, même type) : corriger le questionnaire corrige la séance. */
async function qzDirectQuestionsAJour(row){
  const base = row.questions || [];
  if(!row.questionnaire_id) return base;
  const { data: src } = await sb.from('questionnaires').select('questions').eq('id', row.questionnaire_id).maybeSingle();
  const parId = new Map(((src && src.questions) || []).map(q => [q.id, q]));
  return base.map(q => { const n = parId.get(q.id); return n && n.type === q.type ? Object.assign({}, n, { duree_direct: q.duree_direct }) : q; });
}
// Annuler la notation d'une séance -- demandé : « Je dois pouvoir annuler une correction et la reprendre
// à zéro ». L'interrogation créée par « Noter » (copies, notes, questionnaire généré) est supprimée ; la
// séance, son bilan et les réponses des élèves restent : on peut corriger le questionnaire puis re-noter.
async function qzDirectAnnulerNotation(id){
  const { data: row } = await sb.from('qz_direct').select('id,titre,devoir_id').eq('id', id).single();
  if(!row || !row.devoir_id){ await niceAlert('Cette séance n\'est pas notée.'); return false; }
  const { data: dv } = await sb.from('devoirs').select('id,questionnaire_id,qz_publie_at').eq('id', row.devoir_id).maybeSingle();
  if(!(await niceConfirm(`Annuler la notation de la séance « ${row.titre} » ?\n\nL'interrogation créée pour la noter est supprimée, avec les copies et les notes${dv && dv.qz_publie_at ? ' (déjà publiées : elles disparaissent du carnet et de l\'espace des élèves)' : ''}. La séance, son bilan et les réponses des élèves sont gardés : vous pourrez corriger le questionnaire puis cliquer à nouveau sur « Noter ».`))) return false;
  if(dv){
    const { error: e1 } = await sb.from('devoirs_rendus').delete().eq('devoir_id', dv.id);
    const { error: e2 } = e1 ? { error: e1 } : await sb.from('devoirs').delete().eq('id', dv.id); // copies : supprimées avec
    if(e2){ await niceAlert('Erreur : ' + e2.message); return false; }
    if(dv.questionnaire_id){
      const { count } = await sb.from('devoirs').select('id', { count: 'exact', head: true }).eq('questionnaire_id', dv.questionnaire_id);
      const { count: nd } = await sb.from('qz_direct').select('id', { count: 'exact', head: true }).eq('questionnaire_id', dv.questionnaire_id);
      if(!count && !nd) await sb.from('questionnaires').delete().eq('id', dv.questionnaire_id);
    }
  }
  const { error } = await sb.from('qz_direct').update({ notee: false, devoir_id: null }).eq('id', id);
  if(error){ await niceAlert('Erreur : ' + error.message); return false; }
  if(qzD && qzD.id === id){ qzD.row.notee = false; qzD.row.devoir_id = null; }
  return true;
}
async function qzDirectAnnulerNotationUI(id){
  if(!(await qzDirectAnnulerNotation(id))) return;
  if(qzD && qzD.id === id && document.getElementById('qzdBilan')) return qzDirectOuvrir(id);
  if(qzB) qzB.onglet = 'donnees';
  await qzBanqueOuvrir();
}
function qzDirectBasculer(k){
  if(!qzD) return;
  qzD[k] = !qzD[k];
  if(k === 'cacher'){ try{ localStorage.setItem('qzdAffichage', JSON.stringify({ cacher: qzD.cacher })); }catch(e){} }
  qzDirectRender();
}
function qzDirectPleinEcran(){
  const el = document.getElementById('qzDirectRoot'); if(!el) return;
  if(document.fullscreenElement) document.exitFullscreen().catch(() => {}); else if(el.requestFullscreen) el.requestFullscreen().catch(() => {});
}

/* Demandé : "pour les vrais/faux, attendre que l'élève ait répondu à toutes les questions avant de dire
   qu'ils ont terminé dans le suivi". Une réponse compte quand l'élève l'a validée (bouton « Valider »,
   possible seulement une fois la question complète) ; quand la question est close (correction, minuteur
   écoulé, question suivante), les réponses complètes non validées comptent aussi. Les autres sont des
   brouillons : « en train de répondre ». */
function qzDStats(q){
  const toutes = qzD.reps.get(q.id) || new Map(), val = (qzD.valides && qzD.valides.get(q.id)) || new Set(), ferme = qzDFerme(q.id);
  const c = { juste: 0, partiel: 0, faux: 0, avoir: 0, sondage: 0 }, m = new Map();
  let n = 0, brouillons = 0;
  qzD.eleves.forEach(e => {
    if(!toutes.has(e.id)) return;
    const r = toutes.get(e.id);
    if(!(val.has(e.id) || (ferme && qzRepondue(q, r)))){ brouillons++; return; }
    const v = qzDVerdict(q, r); if(v === 'vide') return;
    m.set(e.id, r); c[v]++; n++;
  });
  return { c, n, total: qzD.eleves.length, m, brouillons, ferme };
}
function qzDPct(x, n){ return n ? Math.round(100 * x / n) : 0; }
function qzDBarre(c, n, grand){
  const seg = QZD_VERDICTS.filter(([k]) => c[k]);
  return `<div class="qzd-bar${grand ? ' grand' : ''}">${seg.map(([k, l]) => `<span class="${k}" style="flex:${c[k]}" title="${l} : ${c[k]}">${qzDPct(c[k], n) >= (grand ? 8 : 15) ? qzDPct(c[k], n) + ' %' : ''}</span>`).join('')}</div>`;
}
function qzDirectPresence(){
  const t = Date.now() - 30000;
  return qzD.eleves.filter(e => (qzD.vus.get(e.id) || 0) > t).length;
}
function qzDirectMajPresence(){
  if(!qzD) return;
  const n = qzDirectPresence(), el = document.getElementById('qzdPresence'), el2 = document.getElementById('qzdPresence2');
  if(el) el.innerHTML = `<span class="gicon">group</span> ${n} / ${qzD.eleves.length} connecté${n > 1 ? 's' : ''}`;
  if(el2) el2.innerHTML = `<span class="gicon">group</span> <b>${n}</b> / ${qzD.eleves.length} élève${qzD.eleves.length > 1 ? 's' : ''} connecté${n > 1 ? 's' : ''}`;
}
// Détail des réponses selon le type de question.
function qzDirectDetailHtml(q, s, corr){
  const reps = qzD.eleves.filter(e => s.m.has(e.id)).map(e => s.m.get(e.id)).filter(r => qzDVerdict(q, r) !== 'vide');
  if(!reps.length) return '';
  if(qzX(q).sondage && typeof qzSonDirectDetail === 'function') return qzSonDirectDetail(q, reps);
  if(q.type === 'qcm'){
    const cnt = {}; reps.forEach(r => (Array.isArray(r) ? r : [r]).forEach(id => { cnt[id] = (cnt[id] || 0) + 1; }));
    return `<div class="qzd-det">${qzOrdreChoix(q, {}, null).map(ch => { const k = cnt[ch.id] || 0;
      return `<div class="qzd-ch${corr && ch.correct ? ' ok' : ''}"><span class="l">${qzMath(ch.texte)}</span><span class="b"><i style="width:${qzDPct(k, reps.length)}%"></i></span><b>${k}</b></div>`; }).join('')}</div>`;
  }
  if(q.type === 'vf'){
    return `<div class="qzd-det">${(q.items || []).map(it => {
      const rep = reps.filter(r => r && r[it.id] !== undefined), ok = rep.filter(r => r[it.id] === !!it.vrai).length;
      return `<div class="qzd-ch"><span class="l">${qzMath(it.texte)}</span><span class="b"><i class="v" style="width:${qzDPct(ok, rep.length)}%"></i></span><b>${qzDPct(ok, rep.length)} %</b></div>`; }).join('')}
      <p class="hint" style="margin:4px 0 0;">Part des élèves qui ont bien jugé chaque affirmation.</p></div>`;
  }
  if(q.type === 'numerique' || q.type === 'courte'){
    const g = new Map();
    reps.forEach(r => {
      const v = q.type === 'numerique' ? qzValeurNum(r) : NaN;
      const cle = !isNaN(v) ? 'n' + Math.round(v * 1e6) / 1e6 : 't' + qzNormTexte(r, q.casse);
      if(!g.has(cle)) g.set(cle, { txt: String(r).trim(), n: 0, v: qzDVerdict(q, r) });
      g.get(cle).n++;
    });
    const l = Array.from(g.values()).sort((a, b) => b.n - a.n).slice(0, 10);
    return `<div class="qzd-det"><p class="qzd-det-t">Réponses données</p>${l.map(x => `<div class="qzd-ch${corr ? ' ' + x.v : ''}"><span class="l">${qzMath(x.txt)}${q.unite ? ' ' + qzEsc(q.unite) : ''}</span><span class="b"><i style="width:${qzDPct(x.n, reps.length)}%"></i></span><b>${x.n}</b></div>`).join('')}${g.size > 10 ? `<p class="hint" style="margin:4px 0 0;">… et ${g.size - 10} autre${g.size - 10 > 1 ? 's' : ''}.</p>` : ''}</div>`;
  }
  if(q.type === 'associer' && typeof qziAsAttendus === 'function'){ // pour chaque étiquette : ce que les élèves ont mis en face
    const att = qziAsAttendus(q), dt = new Map((q.droite || []).map(d => [d.id, qziAsTxt(d.texte)]));
    return `<div class="qzd-det"><p class="qzd-det-t">Ce que les élèves ont associé</p>${(q.gauche || []).map(g => {
      const cnt = new Map(); reps.forEach(r => { const t = r && r[g.id] ? dt.get(r[g.id]) || '?' : '(rien)'; cnt.set(t, (cnt.get(t) || 0) + 1); });
      return `<div class="qzd-as-l"><span class="l">${qzMath(g.texte)} <span class="gicon" style="font-size:1rem;vertical-align:middle;">east</span></span><span class="qzd-as-c">${[...cnt.entries()].sort((a, b) => b[1] - a[1])
        .map(([t, n]) => `<span class="${corr ? (t === att.get(g.id) ? 'juste' : 'faux') : ''}">${qzMath(t)} <b>${n}</b></span>`).join('')}</span></div>`; }).join('')}</div>`;
  }
  if(q.type === 'ouverte'){
    return `<div class="qzd-det"><p class="qzd-det-t">Réponses (sans les noms)</p><div class="qzd-txts">${reps.slice(0, 40).map(r => {
      const t = r && typeof r === 'object' ? (r.texte || '') : String(r || ''), ph = r && r.photos ? r.photos.length : 0;
      return `<div>${t ? qzMath(t) : ''}${ph ? ` <span class="hint">(${ph} photo${ph > 1 ? 's' : ''})</span>` : ''}</div>`; }).join('')}</div></div>`;
  }
  return '';
}
function qzDirectStatsHtml(q){
  const s = qzDStats(q), corr = qzD.etat.phase === 'correction', montrer = corr || !qzD.cacher;
  let h = `<div class="qzd-compte"><div><b id="qzdNbRep">${s.n}</b> / ${s.total}</div><span>${s.ferme ? (s.n > 1 ? 'élèves ont répondu' : 'élève a répondu') : s.n > 1 ? 'élèves ont validé leur réponse' : 'élève a validé sa réponse'}</span>
    <div class="qzd-prog"><i style="width:${qzDPct(s.n, s.total)}%"></i></div>
    ${!s.ferme && s.brouillons ? `<small class="qzd-brouillons"><span class="gicon">edit</span> ${s.brouillons} en train de répondre</small>` : ''}
    ${!s.ferme && s.total && s.n === s.total ? '<small class="qzd-tous"><span class="gicon">check_circle</span> Tout le monde a répondu</small>' : ''}</div>`;
  if(!montrer) h += `<p class="qzd-cache"><span class="gicon">visibility_off</span> Résultats masqués jusqu'à la correction.</p>`;
  else if(s.n && qzX(q).sondage) h += qzDirectDetailHtml(q, s, corr); // sondage : les choix, sans juste/faux
  else if(s.n){
    h += qzDBarre(s.c, s.n, true)
      + `<div class="qzd-leg">${QZD_VERDICTS.filter(([k]) => s.c[k]).map(([k, l]) => `<span class="${k}"><i></i>${l} <b>${qzDPct(s.c[k], s.n)} %</b> <small>(${s.c[k]})</small></span>`).join('')}</div>`
      + qzDirectDetailHtml(q, s, corr);
  } else h += '<p class="hint" style="margin:10px 0 0;">Les réponses s\'affichent ici dès qu\'elles arrivent.</p>';
  if(qzD.noms) h += `<div class="qzd-noms">${qzD.eleves.map(e => {
    const r = s.m.get(e.id), v = qzDVerdict(q, r), cls = v === 'vide' ? 'vide' : montrer ? v : 'rep';
    return `<span class="qzd-nom ${cls}" title="${qzEsc(e.label)}">${qzEsc(e.prenom || e.label)}</span>`; }).join('')}</div>`;
  return h;
}
// Réponse modèle affichée au tableau quand la correction est montrée (QCM : les bonnes propositions
// cochées ; vrai/faux : chaque affirmation jugée) ; les autres types montrent déjà la réponse attendue.
function qzDirectBonneReponse(q){
  if(q.type === 'vf') return Object.fromEntries((q.items || []).map(it => [it.id, !!it.vrai]));
  if(q.type === 'qcm'){ const b = (q.choix || []).filter(c => c.correct).map(c => c.id); return q.multiple ? b : b[0] || null; }
  return null;
}
function qzDirectMajStats(){
  if(!qzD) return;
  const i = qzDirectIndex(), box = document.getElementById('qzdRes');
  if(qzD.etat.phase === 'fin' || qzD.row.ended_at){ if(document.getElementById('qzdBilan')) qzDirectRender(); return; }
  if(box && i >= 0) box.innerHTML = qzDirectStatsHtml(qzD.pages[i].q);
  qzDirectMajNav(); qzDirectMajPresence();
}
function qzDirectNavHtml(){
  const cur = qzDirectIndex(), lancees = qzD.etat.lancees || [];
  return qzD.pages.map((p, i) => {
    const n = qzDStats(p.q).n;
    return `<button type="button" class="qzd-puce${i === cur ? ' on' : ''}${lancees.includes(p.q.id) ? ' faite' : ''}" onclick="qzDirectAller(${i})" title="Question ${i + 1}${n ? ' · ' + n + ' réponse' + (n > 1 ? 's' : '') : ''}">${i + 1}</button>`;
  }).join('');
}
function qzDirectMajNav(){ const el = document.getElementById('qzdNav'); if(el) el.innerHTML = qzDirectNavHtml(); }
function qzDirectRender(){
  const root = document.getElementById('qzDirectRoot'); if(!root || !qzD) return;
  const e = qzD.etat, fin = e.phase === 'fin' || !!qzD.row.ended_at, i = qzDirectIndex(), p = qzD.pages[i];
  const classe = qzD.row.classes ? qzD.row.classes.nom : '';
  let corps;
  if(fin) corps = qzDirectBilanHtml();
  else if(!p || e.phase === 'attente') corps = `<div class="qzd-attente">
      <span class="gicon">cast_for_education</span>
      <h2>Les élèves rejoignent la séance</h2>
      ${qzD.row.acces === 'code' ? `<p>Sur leur compte : <b>Mon travail</b> (ou le bandeau rouge), puis ce code :</p>
      <div class="qzd-code" aria-label="Code de la séance">${qzEsc(qzD.row.code || '')}</div>`
      : '<p>Sur leur compte, un bandeau <b>« Séance en direct »</b> apparaît : ils cliquent sur <b>Rejoindre</b>.</p>'}
      ${qzD.row.student_ids && qzD.row.student_ids.length ? `<p class="hint" style="margin:0 auto;text-align:center;">Groupe de ${qzD.row.student_ids.length} élève${qzD.row.student_ids.length > 1 ? 's' : ''} : ${qzEsc(qzD.eleves.map(e => e.prenom || e.label).join(', '))}</p>` : ''}
      <p class="qzd-grand" id="qzdPresence2"></p>
      <button class="btn qz-go" onclick="qzDirectAller(0)"><span class="gicon">play_arrow</span> Lancer la question 1</button></div>`;
  else {
    const corr = e.phase === 'correction', der = i === qzD.pages.length - 1;
    corps = `<div class="qzd-main">
      <div class="qzd-q">
        <div class="qzd-qhead"><span class="qzd-num">Question ${i + 1} / ${qzD.pages.length}</span>
          <span class="qz-type-pill"><span class="gicon">${qzType(p.q.type).icon}</span> ${qzType(p.q.type).label}</span>
          ${corr ? '<span class="qzd-phase corr"><span class="gicon">fact_check</span> Correction affichée</span>' : qzDReste() === 0 ? '<span class="qzd-phase clos"><span class="gicon">lock_clock</span> Réponses closes</span>' : '<span class="qzd-phase"><span class="dot"></span> Les élèves répondent</span>'}
          ${corr ? '' : qzDMinuteurHtml(p.q)}</div>
        ${p.docs.map(d => `<div class="qz-doc">${qzEnonceHtml(d)}</div>`).join('')}
        <div class="qz-q" id="qzdQ_${p.q.id}">${qzEnonceHtml(p.q)}<div class="qz-q-rep">${qzRenderSaisie(p.q, corr ? qzDirectBonneReponse(p.q) : null, corr ? 'corrige' : 'lecture', { reglages: {}, seed: null, pfx: 'd' })}</div></div>
      </div>
      <div class="qzd-res" id="qzdRes">${qzDirectStatsHtml(p.q)}</div>
    </div>
    <div class="qzd-act">
      ${i > 0 ? `<button class="btn secondary" onclick="qzDirectAller(${i - 1})"><span class="gicon">arrow_back</span> Précédente</button>` : ''}
      <button class="btn secondary" onclick="qzDirectRelancer()" title="Effacer les réponses à cette question et la reposer"><span class="gicon">restart_alt</span> Reposer</button>
      <span style="flex:1"></span>
      ${corr ? `<button class="btn secondary" onclick="qzDirectRouvrir()" title="Les élèves peuvent de nouveau répondre"><span class="gicon">edit</span> Rouvrir les réponses</button>
        ${der ? `<button class="btn qz-go" onclick="qzDirectTerminer()"><span class="gicon">flag</span> Terminer et voir le bilan</button>`
              : `<button class="btn qz-go" onclick="qzDirectSuivante()">Question suivante <span class="gicon">arrow_forward</span></button>`}`
      : `<button class="btn qz-go" onclick="qzDirectCorriger()"><span class="gicon">fact_check</span> Afficher la correction</button>`}
    </div>`;
  }
  root.innerHTML = `<div class="qzd">
    <div class="qzd-top">
      <button class="back-btn qz-back" onclick="qzDirectQuitter()">← Interrogations</button>
      ${fin ? '<span class="qzd-live fin">SÉANCE TERMINÉE</span>' : '<span class="qzd-live"><span class="dot"></span> EN DIRECT</span>'}
      <b class="qzd-titre">${qzEsc(qzD.row.titre)}</b><span class="hint" style="margin:0;">${qzEsc(classe)}</span>
      ${fin ? '' : '<span class="qzd-pill" id="qzdPresence"></span>'}
      ${fin || qzD.row.acces !== 'code' ? '' : `<span class="qzd-pill code" title="Code à donner aux élèves">Code <b>${qzEsc(qzD.row.code || '')}</b></span>`}
      <span class="qzd-outils">
        ${fin ? '' : `<button type="button" class="qzd-tg${qzD.cacher ? ' on' : ''}" onclick="qzDirectBasculer('cacher')" title="Masquer les résultats tant que la correction n'est pas affichée (pour ne pas influencer la classe)"><span class="gicon">${qzD.cacher ? 'visibility_off' : 'visibility'}</span> ${qzD.cacher ? 'Résultats masqués' : 'Résultats visibles'}</button>
        <button type="button" class="qzd-tg${qzD.noms ? ' on' : ''}" onclick="qzDirectBasculer('noms')" title="Afficher qui a répondu (à éviter au vidéoprojecteur)"><span class="gicon">badge</span> Noms</button>`}
        <button type="button" class="qzd-tg" onclick="qzDirectPleinEcran()" title="Plein écran (vidéoprojecteur)"><span class="gicon">fullscreen</span></button>
        ${fin ? '' : `<button type="button" class="qzd-tg stop" onclick="qzDirectTerminer()"><span class="gicon">stop_circle</span> Terminer</button>`}
      </span>
    </div>
    ${fin ? '' : `<div class="qzd-nav" id="qzdNav">${qzDirectNavHtml()}</div>`}
    ${corps}</div>`;
  qzDirectMajPresence();
  qzChargerPhotos(root);
  if(typeof qzMonterInter === 'function') qzMonterInter(root);
}
// Bilan de fin de séance (non noté) : réussite par question, puis par élève.
function qzDirectBilanHtml(){
  const lancees = qzD.etat.lancees || [], pages = qzD.pages.filter(p => lancees.includes(p.q.id));
  if(!pages.length) return '<p class="hint">Aucune question n\'a été posée pendant cette séance.</p><button class="btn secondary" onclick="qzDirectQuitter()">← Interrogations</button>';
  const icone = { juste: 'check_circle', partiel: 'contrast', faux: 'cancel', avoir: 'help', vide: 'remove', sondage: 'how_to_vote' };
  const notees = pages.filter(p => !qzX(p.q).sondage), sondage = notees.length < pages.length;
  const lignes = pages.map((p, k) => {
    const s = qzDStats(p.q), txt = String(p.q.enonce || '').replace(/\$/g, '').replace(/\s+/g, ' ').slice(0, 90);
    if(qzX(p.q).sondage) return `<div class="qzd-bl son"><span class="qzd-bl-n">${qzD.pages.indexOf(p) + 1}</span><span class="qzd-bl-t">${qzEsc(txt) || qzType(p.q.type).label}</span>
      <span class="qzd-bl-b">${s.n ? qzDirectDetailHtml(p.q, s, true) : '<span class="hint" style="margin:0;">aucune réponse</span>'}</span>
      <span class="qzd-bl-p">sondage<small>${s.n}/${s.total}</small></span></div>`;
    const ouv = qzD.bilanQ === p.q.id;
    return `<div class="qzd-bl clic${ouv ? ' ouv' : ''}" onclick="qzDirectBilanQ('${p.q.id}')" title="Voir le détail des réponses"><span class="qzd-bl-n">${qzD.pages.indexOf(p) + 1}</span><span class="qzd-bl-t">${qzEsc(txt) || qzType(p.q.type).label}</span>
      <span class="qzd-bl-b">${s.n ? qzDBarre(s.c, s.n) : '<span class="hint" style="margin:0;">aucune réponse</span>'}</span>
      <span class="qzd-bl-p">${s.n ? `<b>${qzDPct(s.c.juste, s.n)} %</b> juste` : ''}<small>${s.n}/${s.total} <span class="gicon qzd-chev">${ouv ? 'expand_less' : 'expand_more'}</span></small></span></div>
      ${ouv ? qzDirectBilanQHtml(p.q, s, qzD.pages.indexOf(p) + 1) : ''}`;
  }).join('');
  const eleves = qzD.eleves.map(e => {
    const v = pages.map(p => qzDVerdict(p.q, (qzD.reps.get(p.q.id) || new Map()).get(e.id)));
    const j = v.filter(x => x === 'juste').length, rep = v.filter(x => x !== 'vide').length, ouv = qzD.bilanE === e.id;
    return `<tr class="clic${ouv ? ' ouv' : ''}" onclick="qzDirectBilanE('${e.id}')" title="Voir ses réponses"><td><span class="gicon qzd-chev">${ouv ? 'expand_less' : 'expand_more'}</span> ${qzEsc(e.label)}</td><td class="c">${notees.length ? `<b>${j}</b> / ${notees.length}` : '—'}</td><td class="c">${rep}</td>
      <td>${v.map((x, k) => `<span class="gicon qzd-ic ${x}" title="Question ${qzD.pages.indexOf(pages[k]) + 1}">${icone[x]}</span>`).join('')}</td></tr>
      ${ouv ? `<tr class="qzd-copie"><td colspan="4">${qzDirectBilanEHtml(e, pages)}</td></tr>` : ''}`;
  }).join('');
  return `<div id="qzdBilan">
    <h2 class="qzd-h2"><span class="gicon">insights</span> Bilan de la séance <span class="hint" style="font-weight:400;">(${qzD.row.devoir_id ? 'notée' : 'non notée'})</span></h2>
    ${qzD.row.devoir_id ? `<p class="qzd-intro" style="margin:0 0 14px;"><span class="gicon">grading</span><span>Séance notée : une interrogation a été créée avec les réponses des élèves. <b>Vérifiez les copies, puis publiez les résultats</b> pour envoyer les notes dans le carnet.</span></p>` : ''}
    ${qzD.row.questionnaire_id ? `<p class="qzd-intro" style="margin:0 0 14px;"><span class="gicon">edit_note</span><span><b>Une erreur dans le corrigé ?</b> Modifiez le questionnaire d'origine : ${qzD.row.devoir_id ? 'ce bilan en tient compte. La séance est déjà notée : annulez la notation, puis notez-la à nouveau pour recorriger les copies' : 'ce bilan et la notation en tiennent compte'}.
      <button class="btn secondary qz-mini" style="margin-left:6px;" onclick="qzBanqueReprendre('${qzD.row.questionnaire_id}')"><span class="gicon">edit</span> Modifier le questionnaire</button></span></p>` : ''}
    <div class="qzd-blist">${lignes}</div>
    <div class="qzd-leg" style="margin:8px 0 18px;">${QZD_VERDICTS.filter(([k]) => k !== 'sondage' || sondage).map(([k, l]) => `<span class="${k}"><i></i>${l}</span>`).join('')}</div>
    <p class="hint" style="margin:-10px 0 16px;"><span class="gicon" style="font-size:1rem;vertical-align:middle;">touch_app</span> Cliquez sur une question pour voir les réponses données (erreurs les plus fréquentes, réponse de chaque élève), ou sur un élève pour voir toutes ses réponses.</p>
    <h3 class="qzd-h3">Par élève</h3>
    <div class="qzd-tab-wrap"><table class="qzd-tab"><thead><tr><th>Élève</th><th>Justes</th><th>Répondues</th><th>Question par question</th></tr></thead><tbody>${eleves}</tbody></table></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
      <button class="btn secondary" onclick="qzDirectQuitter()">← Interrogations</button>
      ${qzD.row.devoir_id ? `<button class="btn" onclick="qzOuvrirCorrection('${qzD.row.devoir_id}')"><span class="gicon">fact_check</span> Vérifier et publier les notes</button>
        <button class="btn secondary" style="color:#a83c1f;" onclick="qzDirectAnnulerNotationUI('${qzD.id}')" title="Supprime l'interrogation créée pour noter la séance (copies et notes) ; la séance et les réponses restent"><span class="gicon">undo</span> Annuler la notation</button>`
        : `<button class="btn" onclick="qzDirectNoterDepuisBilan()" title="Crée une interrogation notée avec les réponses des élèves"><span class="gicon">grading</span> Noter cette séance</button>`}
      <button class="btn secondary" onclick="qzDirectCahierOuvrir('${qzD.id}')" title="Ajouter les questions posées (et leur correction) au cahier de l'élève"><span class="gicon">menu_book</span> Ajouter au cahier</button>
      ${qzD.row.questionnaire_id ? `<button class="btn secondary" onclick="qzDirectLancer('${qzD.row.questionnaire_id}')"><span class="gicon">replay</span> Nouvelle séance avec ce questionnaire</button>` : ''}
    </div></div>`;
}
/* Réponses détaillées dans le bilan -- demandé : « même si la séance n'est pas notée, il serait
   intéressant de voir les réponses détaillées des élèves pour voir ce qui est mal réussi et pourquoi ».
   Une question : énoncé, répartition des réponses (erreurs les plus fréquentes), explication, puis la
   réponse de chaque élève (fausses d'abord). Un élève : toutes ses réponses, question par question. */
const QZD_ORDRE_V = { faux: 0, partiel: 1, avoir: 2, juste: 3, sondage: 4, vide: 5 };
function qzDirectBilanQ(qid){ qzD.bilanQ = qzD.bilanQ === qid ? null : qid; qzDirectBilanMaj(); }
function qzDirectBilanE(id){ qzD.bilanE = qzD.bilanE === id ? null : id; qzDirectBilanMaj(); }
function qzDirectBilanMaj(){ qzDirectRender(); const r = document.getElementById('qzDirectRoot'); if(r && typeof qzChargerPhotos === 'function') qzChargerPhotos(r); }
function qzDirectRepHtml(q, rep, pfx){
  let h = ''; try{ h = qzRenderSaisie(q, rep, 'corrige', { reglages: {}, seed: null, pfx }); }catch(e){}
  return `<div class="qzd-rep">${h || '<span class="hint" style="margin:0;">—</span>'}</div>`;
}
function qzDirectBilanQHtml(q, s, num){
  const toutes = qzD.reps.get(q.id) || new Map(), sond = !!qzX(q).sondage;
  // Réponses identiques regroupées (une seule fois, avec les noms) : 30 copies se lisent d'un coup d'œil.
  const cle = r => { const n = x => Array.isArray(x) ? x.map(n).sort() : x && typeof x === 'object' ? Object.keys(x).sort().map(k => [k, n(x[k])]) : typeof x === 'string' ? x.trim() : x; return JSON.stringify(n(r)); };
  const groupes = new Map();
  qzD.eleves.forEach(e => { const r = toutes.get(e.id), v = qzDVerdict(q, r), k = v === 'vide' ? 'vide' : cle(r);
    if(!groupes.has(k)) groupes.set(k, { r, v, noms: [] }); groupes.get(k).noms.push(e.label); });
  const eleves = [...groupes.values()].sort((a, b) => (QZD_ORDRE_V[a.v] ?? 9) - (QZD_ORDRE_V[b.v] ?? 9) || b.noms.length - a.noms.length)
    .map(g => ({ e: { label: g.noms.length > 1 ? g.noms.length + ' élèves' : g.noms[0] }, noms: g.noms, r: g.r, v: g.v }));
  const libV = Object.fromEntries(QZD_VERDICTS.concat([['vide', 'Pas de réponse']]));
  const repartition = qzDirectDetailHtml(q, s, !sond);
  return `<div class="qzd-bl-det">
    <div class="qzd-bl-enonce"><span class="qzd-det-t">Question ${num}</span>${qzEnonceHtml(q)}</div>
    ${repartition ? `<div class="qzd-bl-rep">${repartition}</div>` : ''}
    ${q.explication ? `<div class="qz-sol" style="margin:8px 0;"><span class="gicon">lightbulb</span> <div><b>Explication :</b> ${qzMath(q.explication).replace(/\n/g, '<br>')}</div></div>` : ''}
    <p class="qzd-det-t" style="margin-top:12px;">Réponses des élèves <small style="text-transform:none;font-weight:400;">(réponses identiques regroupées, erreurs d'abord)</small></p>
    <div class="qzd-reps">${eleves.map(({ e, noms, r, v }, i) => `<div class="qzd-rep-el ${v}">
        <div class="qzd-rep-nom"><span class="gicon qzd-ic ${v}">${{ juste: 'check_circle', partiel: 'contrast', faux: 'cancel', avoir: 'help', vide: 'remove', sondage: 'how_to_vote' }[v]}</span> <b>${qzEsc(e.label)}</b> <small>${libV[v] || ''}</small>
          ${noms.length > 1 ? `<div class="qzd-noms-g">${noms.map(qzEsc).join(', ')}</div>` : ''}</div>
        ${v === 'vide' ? '' : qzDirectRepHtml(q, r, 'dq' + i + '_')}</div>`).join('')}</div>
  </div>`;
}
function qzDirectBilanEHtml(e, pages){
  return `<div class="qzd-bl-det" style="margin:0;">${pages.map((p, k) => {
    const r = (qzD.reps.get(p.q.id) || new Map()).get(e.id), v = qzDVerdict(p.q, r);
    return `<div class="qzd-rep-el ${v}"><div class="qzd-rep-nom"><b>Question ${qzD.pages.indexOf(p) + 1}</b> <small>${qzEsc(String(p.q.enonce || '').replace(/\$/g, '').replace(/\s+/g, ' ').slice(0, 90))}</small></div>
      ${v === 'vide' ? '<span class="hint" style="margin:0;">Pas de réponse.</span>' : qzDirectRepHtml(p.q, r, 'de' + k + '_')}</div>`; }).join('')}</div>`;
}
// Liste des séances encore ouvertes (page Interrogations en ligne) : reprise après un rechargement.
function qzDirectsHtml(){
  const l = (typeof qzB !== 'undefined' && qzB && qzB.directs) || [];
  if(!l.length) return '';
  return `<p class="qz-i-sec"><span class="gicon" style="color:#D93025;">cast_for_education</span> En direct maintenant</p>
    <div class="qz-i-liste" style="margin-bottom:18px;">${l.map(d => { const e = d.etat || {};
      return `<div class="qz-i-row">
        <div class="qz-i-main"><b>${qzEsc(d.titre)}</b><div class="hint" style="margin:2px 0 0;">${qzEsc(d.classes ? d.classes.nom : '')}${d.student_ids && d.student_ids.length ? ' (groupe de ' + d.student_ids.length + ')' : ''}${d.acces === 'code' ? ' · code <b>' + qzEsc(d.code || '') + '</b>' : ''} · ${e.phase === 'attente' || !e.n ? 'pas encore commencée' : 'question ' + e.n + ' / ' + (e.total || '?')} · ouverte à ${new Date(d.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div></div>
        <span class="qz-i-act">
          <button class="btn qz-mini" onclick="qzDirectOuvrir('${d.id}')"><span class="gicon">play_arrow</span> Reprendre</button>
          <button class="btn secondary qz-mini" onclick="qzDirectClore('${d.id}')" title="Terminer cette séance"><span class="gicon">stop_circle</span> Terminer</button>
        </span></div>`; }).join('')}</div>`;
}
async function qzDirectsCharger(){
  const [{ data }, { data: passes }] = await Promise.all([
    sb.from('qz_direct').select('id,titre,class_id,created_at,etat,code,acces,student_ids,notee,devoir_id,classes(nom)').eq('teacher_id', currentUser.id).is('ended_at', null).order('created_at', { ascending: false }),
    sb.from('qz_direct').select('id,titre,class_id,questionnaire_id,created_at,ended_at,etat,student_ids,notee,devoir_id,classes(nom)').eq('teacher_id', currentUser.id).not('ended_at', 'is', null).order('created_at', { ascending: false }).limit(200),
  ]);
  if(typeof qzB !== 'undefined' && qzB){
    qzB.directs = data || [];
    qzB.directsPasses = passes || [];
    // Questionnaires déjà utilisés en direct : ils ne sont plus « pas encore donnés ».
    qzB.directParQ = new Map();
    [...(data || []), ...(passes || [])].forEach(d => { if(d.questionnaire_id && !qzB.directParQ.has(d.questionnaire_id)) qzB.directParQ.set(d.questionnaire_id, d); });
  }
}
function qzDirectNoterDepuisBilan(){ if(qzD) qzDirectNoter(qzD.id, false); }
function qzDirectResumeTxt(d){
  const n = ((d.etat || {}).lancees || []).length;
  return `${qzEsc(d.classes ? d.classes.nom : '')}${d.student_ids && d.student_ids.length ? ' (groupe de ' + d.student_ids.length + ')' : ''} · ${new Date(d.created_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })} · ${n} question${n > 1 ? 's' : ''} posée${n > 1 ? 's' : ''}`;
}
/* Séances en direct terminées -- signalé : « j'ai 6V-Test en classe mais je ne comprends pas
   l'affichage » : une séance terminée ne laissait aucune trace dans la liste (et son questionnaire
   restait « pas encore donné »). On retrouve ici chaque séance, son bilan, et on peut la noter. */
function qzDirectsPassesHtml(f){
  const l = ((typeof qzB !== 'undefined' && qzB && qzB.directsPasses) || [])
    .filter(d => !f || qzNormTexte((d.titre || '') + ' ' + (d.classes ? d.classes.nom : '')).includes(f));
  if(!l.length) return '';
  return `<p class="qz-i-sec"><span class="gicon" style="color:#D93025;">cast_for_education</span> Séances en direct terminées (${l.length})</p>
    <div class="qz-i-liste" style="margin-bottom:18px;">${l.map(d => `<div class="qz-i-row qz-mlisere" style="--m:${qzMode('direct').c}">
        <div class="qz-i-main">${qzModeBadge('direct', '')} <b>${qzEsc(d.titre)}</b>
          <div class="hint" style="margin:2px 0 0;">${qzDirectResumeTxt(d)}</div></div>
        <span class="qz-i-etat ${d.devoir_id ? 'ok' : 'brouillon'}"><span class="gicon">${d.devoir_id ? 'grading' : 'school'}</span> ${d.devoir_id ? 'Notée' : 'Non notée'}</span>
        <span class="qz-i-act">
          <button class="btn qz-mini" onclick="qzDirectOuvrir('${d.id}')"><span class="gicon">insights</span> Bilan</button>
          <button class="btn secondary qz-mini" onclick="qzDirectCahierOuvrir('${d.id}')" title="Ajouter les questions de la séance (et leur correction) au cahier de l'élève"><span class="gicon">menu_book</span> Cahier</button>
          ${d.devoir_id ? `<button class="btn secondary qz-mini" onclick="qzOuvrirCorrection('${d.devoir_id}')" title="Vérifier les copies et publier les notes"><span class="gicon">fact_check</span> Corriger</button>
            <button class="btn secondary qz-mini" onclick="qzDirectAnnulerNotationUI('${d.id}')" title="Annuler la notation : l'interrogation créée (copies, notes) est supprimée ; la séance et les réponses restent"><span class="gicon">undo</span></button>`
            : `<button class="btn secondary qz-mini" onclick="qzDirectNoter('${d.id}')" title="Créer une interrogation notée avec les réponses des élèves"><span class="gicon">grading</span> Noter</button>`}
          ${d.questionnaire_id ? `<button class="btn secondary qz-mini" onclick="qzBanqueReprendre('${d.questionnaire_id}')" title="Modifier le questionnaire (corriger une erreur de corrigé : le bilan et la notation en tiennent compte)"><span class="gicon">edit</span></button>
          <button class="btn secondary qz-mini qzd-btn" onclick="qzDirectLancer('${d.questionnaire_id}')" title="Nouvelle séance en direct avec ce questionnaire"><span class="gicon">replay</span></button>` : ''}
          <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="qzDirectSupprimer('${d.id}')" title="Supprimer cette séance et ses réponses"><span class="gicon">delete</span></button>
        </span></div>`).join('')}</div>`;
}
async function qzDirectSupprimer(id){
  const d = ((qzB && qzB.directsPasses) || []).find(x => x.id === id); if(!d) return;
  if(!(await niceConfirm(`Supprimer la séance « ${d.titre} » du ${new Date(d.created_at).toLocaleDateString('fr-FR')} et les réponses des élèves ?${d.devoir_id ? ' L\'interrogation notée qui en est issue reste dans « Données à une classe ».' : ''}`))) return;
  await sb.from('qz_direct_rep').delete().eq('direct_id', id);
  const { error } = await sb.from('qz_direct').delete().eq('id', id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  await qzDirectsCharger(); qzBanqueRender();
}
async function qzDirectClore(id){
  const fin = new Date().toISOString();
  await sb.from('qz_direct').update({ ended_at: fin, updated_at: fin, etat: Object.assign({}, ((qzB.directs || []).find(d => d.id === id) || {}).etat, { phase: 'fin' }) }).eq('id', id);
  try{ const ch = sb.channel(qzDCanal(id)); ch.subscribe(s => { if(s === 'SUBSCRIBED'){ ch.send({ type: 'broadcast', event: 'etat', payload: { phase: 'fin' } }); setTimeout(() => sb.removeChannel(ch), 1000); } }); }catch(e){}
  const d = ((qzB && qzB.directs) || []).find(x => x.id === id);
  if(d && d.notee && !d.devoir_id) await qzDirectNoter(id, true); // séance notée : l'interrogation est créée
  await qzDirectsCharger(); if(qzB && d && d.notee) await qzInterrosCharger(); qzBanqueRender();
}

/* =====================================================================
   ÉLÈVE
   ===================================================================== */
// Bandeau « Séance en direct » : vérifié toutes les 15 s tant que la page est visible.
async function qzDirectVeille(){
  if(!currentUser || currentUserRole !== 'eleve' || document.hidden){ qzDirectBandeau([]); return; }
  if(qzDE && qzDVueActive()){ qzDirectBandeau([]); return; }
  const { data, error } = await sb.rpc('qz_direct_actives');
  qzDirectBandeau(!error && Array.isArray(data) ? data : []);
}
function qzDirectBandeau(liste){
  let b = document.getElementById('qzdBandeau');
  if(!liste.length || (qzDE && qzDVueActive())){ if(b) b.remove(); return; }
  const s = liste[0], code = s.acces === 'code' && !s.entre;
  const sig = [s.id, code, qzDE && qzDE.id].join('|');
  if(b && b.dataset.sig === sig) return; // ne pas effacer un code en cours de saisie
  if(!b){ b = document.createElement('div'); b.id = 'qzdBandeau'; b.className = 'qzd-bandeau'; document.body.appendChild(b); }
  b.dataset.sig = sig;
  b.innerHTML = `<span class="dot"></span><span class="t"><b>Séance en direct</b><span>${qzEsc(s.titre)}${s.classe ? ' · ' + qzEsc(s.classe) : ''}</span></span>
    ${code ? `<form class="qzd-b-code" onsubmit="event.preventDefault();qzDirectCode(this.code.value)"><input name="code" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="Code" aria-label="Code affiché au tableau"><button class="btn"><span class="gicon">login</span> Rejoindre</button></form>`
      : `<button class="btn" onclick="qzDirectRejoindre('${s.id}')"><span class="gicon">login</span> ${qzDE && qzDE.id === s.id ? 'Revenir' : 'Rejoindre'}</button>`}`;
}
// Code affiché au tableau (bandeau ou page « Séance en direct »).
async function qzDirectCode(code){
  code = String(code || '').replace(/\D/g, '');
  if(code.length < 4){ await niceAlert('Tape le code à 4 chiffres affiché au tableau.'); return; }
  const { data, error } = await sb.rpc('qz_direct_rejoindre', { p_code: code });
  if(error || !data){ await niceAlert((error && error.message) || 'Code inconnu.'); return; }
  qzDirectRejoindre(data);
}
// Page du code du tableau (ancien menu S'entraîner › Séance en direct ; le code se tape désormais en haut de « Mon travail »).
function qzDirectCodePage(){
  if(qzDE) qzDirectEleveFermer();
  qzDirectBandeau([]);
  showView('view-qz-direct'); setActiveTopnav(null);
  document.getElementById('qzDirectRoot').innerHTML = `<div class="qzd-attente qzd-code-page">
    <span class="gicon">cast_for_education</span>
    <h2>Rejoindre une séance en direct</h2>
    <p>Tape le code affiché au tableau par ton professeur.</p>
    <form onsubmit="event.preventDefault();qzDirectCode(this.code.value)">
      <input name="code" class="qzd-code-in" inputmode="numeric" autocomplete="off" maxlength="6" placeholder="0000" aria-label="Code de la séance">
      <button class="btn qz-go"><span class="gicon">login</span> Rejoindre</button>
    </form></div>`;
  setTimeout(() => { const i = document.querySelector('.qzd-code-in'); if(i) i.focus(); }, 50);
}
setInterval(qzDirectVeille, 15000);
document.addEventListener('visibilitychange', () => { if(!document.hidden) qzDirectVeille(); });

async function qzDirectRejoindre(id){
  qzDirectEleveFermer();
  qzDirectBandeau([]);
  showView('view-qz-direct'); setActiveTopnav(null);
  document.getElementById('qzDirectRoot').innerHTML = '<p class="hint">Connexion à la séance…</p>';
  qzDE = { id, etat: null, cle: '' };
  qzDE.ch = sb.channel(qzDCanal(id), { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'etat' }, () => qzDirectEleveCharger())
    .subscribe(s => { if(s === 'SUBSCRIBED') qzDirectIci(); });
  qzDE.poll = setInterval(() => { if(qzDE && !document.hidden && qzDVueActive()) qzDirectEleveCharger(); }, 5000);
  qzDE.ici = setInterval(() => { if(qzDVueActive()) qzDirectIci(); }, 10000);
  await qzDirectEleveCharger();
  qzDirectIci();
}
function qzDirectIci(){ try{ if(qzDE && qzDE.ch) qzDE.ch.send({ type: 'broadcast', event: 'ici', payload: { e: currentUser.id } }); }catch(e){} }
function qzDirectEleveFermer(){
  if(!qzDE) return;
  clearInterval(qzDE.poll); clearInterval(qzDE.ici); clearTimeout(qzDE.envT);
  try{ if(qzDE.ch) sb.removeChannel(qzDE.ch); }catch(e){}
  qzDE = null;
  if(qzP && qzP.direct) qzP = null;
}
function qzDirectEleveQuitter(){
  qzDirectEleveFermer();
  showView('view-home'); setActiveTopnav(null);
  setTimeout(qzDirectVeille, 300);
}
async function qzDirectEleveCharger(){
  if(!qzDE) return;
  const id = qzDE.id;
  const { data, error } = await sb.rpc('qz_direct_etat', { p_id: id });
  if(!qzDE || qzDE.id !== id) return;
  if(error || !data){
    document.getElementById('qzDirectRoot').innerHTML = `<p class="hint">${qzEsc((error && error.message) || 'Séance introuvable.')}</p><button class="btn secondary" onclick="qzDirectEleveQuitter()">← Accueil</button>`;
    return;
  }
  const cle = [data.phase, data.qid || '', data.maj || '', data.valide ? 1 : 0].join('|');
  if(data.now) qzDE.decal = Date.parse(data.now) - Date.now();
  if(cle === qzDE.cle) return; // rien de neuf : la saisie en cours n'est pas touchée
  // Même question (minuteur changé...) : la réponse en cours de saisie est gardée.
  if(qzP && qzP.direct && qzDE.etat && qzDE.etat.qid === data.qid && data.question && qzP.reponses[data.qid] !== undefined && !data.valide) data.reponse = qzP.reponses[data.qid];
  qzDE.cle = cle; qzDE.etat = data;
  qzDirectEleveRender();
}
function qzDirectEleveEntete(d){
  return `<div class="qzd-top eleve">
    ${d.phase === 'fin' ? '<span class="qzd-live fin">TERMINÉ</span>' : '<span class="qzd-live"><span class="dot"></span> EN DIRECT</span>'}
    <b class="qzd-titre">${qzEsc(d.titre)}</b>
    ${d.n && d.phase !== 'fin' ? `<span class="qzd-pill">Question ${d.n} / ${d.total}</span>` : ''}
    <span class="qzd-outils"><button class="qzd-tg" onclick="qzDirectEleveQuitter()"><span class="gicon">logout</span> Quitter</button></span></div>`;
}
function qzDVerdictHtml(v){
  const t = { juste: ['check_circle', 'Juste !'], partiel: ['contrast', 'En partie juste'], faux: ['cancel', 'Ce n\'est pas ça'],
    avoir: ['help', 'Compare ta réponse avec la correction'], vide: ['remove_circle', 'Tu n\'as pas répondu'], sondage: ['how_to_vote', 'Merci pour ta réponse !'] }[v];
  return `<div class="qzd-verdict ${v}"><span class="gicon">${t[0]}</span> ${t[1]}</div>`;
}
function qzDirectEleveRender(){
  const d = qzDE.etat, root = document.getElementById('qzDirectRoot');
  const head = qzDirectEleveEntete(d);
  if(d.phase === 'fin') return qzDirectEleveBilan(d, head);
  if(d.phase === 'attente' || !d.question){
    root.innerHTML = `<div class="qzd">${head}<div class="qzd-attente"><span class="gicon">hourglass_top</span><h2>C'est parti !</h2>
      <p>Ton professeur va lancer la première question. Reste sur cette page.</p></div></div>`;
    return;
  }
  const q = d.question, corr = d.phase === 'correction', reste = qzDEReste(), fini = reste === 0, bloque = corr || fini || !!d.valide;
  qzP = { direct: true, apercu: false, data: { devoir: { id: 'direct', titre: d.titre } }, devoirId: 'direct-' + qzDE.id, qid: q.id,
    questions: (d.docs || []).concat(q), reglages: {}, copie: null, reponses: {}, sorties: 0, log: [] };
  if(d.reponse != null) qzP.reponses[q.id] = d.reponse;
  const rep = qzP.reponses[q.id], ctx = { reglages: {}, seed: null, pfx: 'p' };
  root.innerHTML = `<div class="qzd">${head}
    ${corr ? qzDVerdictHtml(qzDVerdict(q, rep)) : ''}
    ${!corr && reste !== null ? `<div class="qzd-e-chrono${fini ? ' fini' : ''}" id="qzdEChrono">${qzDEChronoTxt(reste)}</div>` : ''}
    ${(d.docs || []).map(x => `<div class="qz-doc">${qzEnonceHtml(x)}</div>`).join('')}
    <div class="qz-q qzd-eq" id="qzQ_${q.id}" data-qid="${q.id}">${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, rep, corr ? 'corrige' : bloque ? 'lecture' : 'passer', ctx)}</div></div>
    ${corr ? '<p class="qzd-envoi"><span class="gicon">hourglass_top</span> Attends la question suivante…</p>'
      : d.valide ? '<p class="qzd-envoi"><span class="gicon">task_alt</span> Réponse validée. Attends la correction.</p>'
      : fini ? `<p class="qzd-envoi err"><span class="gicon">lock_clock</span> Temps écoulé${qzRepondue(q, rep) ? ' : ta réponse a été prise en compte.' : '.'}</p>`
      : `<div class="qzd-valider"><button class="btn qz-go" id="qzdValider" onclick="qzDirectValider()" ${qzRepondue(q, rep) ? '' : 'disabled'}><span class="gicon">send</span> Valider ma réponse</button>
        <p class="qzd-envoi" id="qzdEnvoi">${qzRepondue(q, rep) ? 'Quand tu es sûr(e) de toi, valide : tu ne pourras plus la modifier.' : qzDEConsigne(q)}</p></div>`}
  </div>`;
  qzChargerPhotos(root);
  if(typeof qzMonterInter === 'function') qzMonterInter(root);
}
// Appelé par qzModifie (questionnaires.js) à chaque changement de réponse de l'élève.
function qzDirectEnvoyer(){
  if(!qzDE || !qzP) return;
  clearTimeout(qzDE.envT);
  const el = document.getElementById('qzdEnvoi'); if(el){ el.textContent = 'Envoi…'; el.classList.remove('err'); }
  qzDE.envT = setTimeout(async () => {
    const q = qzDE && qzDE.etat && qzDE.etat.question; if(!q || !qzP) return;
    const rep = qzP.reponses[q.id];
    const { error } = await sb.rpc('qz_direct_repondre', { p_id: qzDE.id, p_qid: q.id, p_reponse: rep === undefined ? null : rep });
    const e = document.getElementById('qzdEnvoi');
    if(error){
      if(e){ e.textContent = /close/i.test(error.message) ? 'Trop tard : la question est close.' : 'Réponse non envoyée : ' + error.message; e.classList.add('err'); }
      qzDirectEleveCharger(); return;
    }
    if(e) e.innerHTML = qzRepondue(q, rep) ? 'Quand tu es sûr(e) de toi, valide : tu ne pourras plus la modifier.' : qzDEConsigne(q);
    try{ qzDE.ch.send({ type: 'broadcast', event: 'rep', payload: { e: currentUser.id } }); }catch(x){}
  }, 600);
  const b = document.getElementById('qzdValider'), q = qzDE.etat && qzDE.etat.question;
  if(b && q) b.disabled = !qzRepondue(q, qzP.reponses[q.id]);
}
// Ce qu'il manque pour pouvoir valider (vrai/faux : toutes les affirmations).
function qzDEConsigne(q){ return q.type === 'vf' ? 'Réponds à toutes les affirmations, puis valide.' : q.type === 'qcm' && q.multiple ? 'Coche ta ou tes réponses, puis valide.' : 'Réponds, puis valide ta réponse.'; }
async function qzDirectValider(){
  const q = qzDE && qzDE.etat && qzDE.etat.question; if(!q || !qzP) return;
  const rep = qzP.reponses[q.id];
  if(!qzRepondue(q, rep)){ await niceAlert(qzDEConsigne(q)); return; }
  clearTimeout(qzDE.envT);
  const b = document.getElementById('qzdValider'); if(b) b.disabled = true;
  const { error } = await sb.rpc('qz_direct_repondre', { p_id: qzDE.id, p_qid: q.id, p_reponse: rep, p_valider: true });
  if(error){ await niceAlert(/close|écoulé/i.test(error.message) ? 'Trop tard : la question est close.' : error.message); qzDE.cle = ''; qzDirectEleveCharger(); return; }
  try{ qzDE.ch.send({ type: 'broadcast', event: 'rep', payload: { e: currentUser.id } }); }catch(x){}
  qzDE.etat = Object.assign({}, qzDE.etat, { valide: true, reponse: rep }); qzDE.cle = '';
  qzDirectEleveRender();
}
// Minuteur côté élève (heure de fin donnée par le serveur, horloge recalée).
function qzDEReste(){ const f = qzDE && qzDE.etat && qzDE.etat.fin_at ? Date.parse(qzDE.etat.fin_at) : NaN; return isNaN(f) ? null : Math.max(0, f - (Date.now() + (qzDE.decal || 0))); }
function qzDEChronoTxt(r){ const s = Math.ceil(r / 1000); return `<span class="gicon">timer</span> ${s ? Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0') : 'Temps écoulé'}`; }
setInterval(() => {
  if(!qzDE || !qzDE.etat || qzDE.etat.phase !== 'question' || !qzDVueActive()) return;
  const r = qzDEReste(); if(r === null) return;
  const el = document.getElementById('qzdEChrono');
  if(r === 0 && el && !el.classList.contains('fini')){ if(qzP && qzP.reponses) qzDE.etat.reponse = qzP.reponses[qzDE.etat.qid]; qzDirectEleveRender(); return; }
  if(el){ el.innerHTML = qzDEChronoTxt(r); el.classList.toggle('urgent', r <= 10000); }
}, 500);
function qzDirectEleveBilan(d, head){
  const b = d.bilan || { questions: [], reponses: {} }, qs = (b.questions || []).filter(q => q.type !== 'texte');
  qzP = { direct: true, apercu: false, data: { devoir: { id: 'direct', titre: d.titre } }, devoirId: 'direct-' + qzDE.id, questions: qs, reglages: {}, copie: null, reponses: b.reponses || {}, sorties: 0, log: [] };
  const v = qs.map(q => qzDVerdict(q, (b.reponses || {})[q.id])), j = v.filter(x => x === 'juste').length, nn = qs.filter(q => !qzX(q).sondage).length;
  const ctx = { reglages: {}, seed: null, pfx: 'p' };
  document.getElementById('qzDirectRoot').innerHTML = `<div class="qzd">${head}
    <div class="qzd-attente" style="padding:22px 16px;"><span class="gicon">emoji_events</span><h2>${nn ? `${j} bonne${j > 1 ? 's' : ''} réponse${j > 1 ? 's' : ''} sur ${nn}` : 'Merci d\'avoir participé !'}</h2>
      <p>${nn ? 'C\'était un entraînement : rien n\'est noté. Relis la correction ci-dessous.' : 'C\'était un sondage : il n\'y a ni bonne ni mauvaise réponse.'}</p></div>
    ${qs.map((q, k) => `<div class="qz-q qzd-eq">
      <div class="qz-q-head"><span class="qz-q-num">${k + 1}</span>${qzDVerdictHtml(v[k]).replace('qzd-verdict', 'qzd-verdict mini')}</div>
      ${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, (b.reponses || {})[q.id], 'corrige', ctx)}</div></div>`).join('')}
    <button class="btn secondary" style="margin-top:14px;" onclick="qzDirectEleveQuitter()">← Accueil</button></div>`;
  qzChargerPhotos(document.getElementById('qzDirectRoot'));
  if(typeof qzMonterInter === 'function') qzMonterInter(document.getElementById('qzDirectRoot'));
  qzDirectEleveFermer(); // plus rien à attendre
  qzDE = null;
}

(function qzDirectStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qzd-ov{position:fixed;inset:0;z-index:400;background:rgba(20,26,36,.45);display:flex;align-items:center;justify-content:center;padding:16px;}
    .qzd-modal{background:#fff;border-radius:16px;padding:20px 22px;max-width:560px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25);}
    .qzd-modal h3{margin:0;display:flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;} .qzd-modal h3 .gicon{color:#D93025;}
    .qzd{max-width:1280px;margin:0 auto;}
    #qzDirectRoot:fullscreen{background:#FDF9F6;overflow:auto;padding:18px 24px;}
    #qzDirectRoot:fullscreen .qzd-q{font-size:1.25rem;}
    .qzd-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 10px;}
    .qzd-top .qz-back{margin:0;}
    .qzd-titre{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;}
    .qzd-live{display:inline-flex;align-items:center;gap:6px;background:#D93025;color:#fff;border-radius:999px;padding:3px 11px;font:700 .72rem Inter,sans-serif;letter-spacing:.6px;}
    .qzd-live.fin{background:#5B6472;}
    .qzd-live .dot,.qzd-phase .dot,.qzd-bandeau .dot{width:8px;height:8px;border-radius:50%;background:#fff;animation:qzdPulse 1.2s ease-in-out infinite;}
    .qzd-phase .dot{background:#D93025;}
    @keyframes qzdPulse{0%,100%{opacity:1}50%{opacity:.25}}
    .qzd-pill{display:inline-flex;align-items:center;gap:5px;background:rgba(12,91,160,.08);color:#0C5BA0;border-radius:999px;padding:3px 11px;font-size:.84rem;font-weight:600;}
    .qzd-pill .gicon{font-size:1.05rem;}
    .qzd-outils{margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;}
    .qzd-tg{display:inline-flex;align-items:center;gap:5px;border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:10px;padding:5px 10px;font:600 .82rem Inter,sans-serif;color:#4E5665;cursor:pointer;}
    .qzd-tg .gicon{font-size:1.1rem;} .qzd-tg.on{border-color:#0C5BA0;color:#0C5BA0;background:rgba(12,91,160,.06);}
    .qzd-tg.stop{color:#a83c1f;border-color:rgba(168,60,31,.35);}
    .qzd-nav{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px;}
    .qzd-puce{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(28,43,57,.18);background:#fff;font:700 .9rem 'Space Grotesk',sans-serif;color:#5B6472;cursor:pointer;}
    .qzd-puce.faite{background:rgba(12,91,160,.08);color:#0C5BA0;border-color:rgba(12,91,160,.3);}
    .qzd-puce.on{background:#0C5BA0;color:#fff;border-color:#0C5BA0;box-shadow:0 2px 8px rgba(12,91,160,.35);}
    .qzd-main{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(280px,1fr);gap:16px;align-items:start;}
    @media (max-width:860px){ .qzd-main{grid-template-columns:1fr;} }
    .qzd-q .qz-q{font-size:1.08rem;}
    .qzd-qhead{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 8px;}
    .qzd-num{font:700 1.05rem 'Space Grotesk',sans-serif;color:#0C5BA0;}
    .qzd-phase{display:inline-flex;align-items:center;gap:6px;font-size:.82rem;font-weight:600;color:#D93025;}
    .qzd-phase.corr{color:#1E7B34;} .qzd-phase .gicon{font-size:1.1rem;}
    .qzd-res{background:#fff;border-radius:14px;border:1px solid rgba(28,43,57,.1);padding:14px 16px;box-shadow:0 2px 8px rgba(28,43,57,.04);position:sticky;top:70px;}
    .qzd-compte{text-align:center;}
    .qzd-compte div:first-child{font:700 2.1rem 'Space Grotesk',sans-serif;color:#20242E;line-height:1.1;}
    .qzd-compte div:first-child b{color:#0C5BA0;font-size:2.6rem;}
    .qzd-compte span{color:#5B6472;font-size:.9rem;}
    .qzd-prog{height:8px;border-radius:99px;background:rgba(28,43,57,.08);margin:8px 0 4px;overflow:hidden;}
    .qzd-prog i{display:block;height:100%;background:#0C5BA0;border-radius:99px;transition:width .4s;}
    .qzd-bar{display:flex;height:22px;border-radius:8px;overflow:hidden;margin:12px 0 6px;background:rgba(28,43,57,.06);}
    .qzd-bar.grand{height:40px;border-radius:10px;}
    .qzd-bar span{display:flex;align-items:center;justify-content:center;color:#fff;font:700 .78rem Inter,sans-serif;min-width:0;transition:flex .4s;}
    .qzd-bar.grand span{font-size:1rem;}
    .qzd-bar .juste,.qzd-leg .juste i{background:#1E7B34;} .qzd-bar .partiel,.qzd-leg .partiel i{background:#E0A100;}
    .qzd-bar .faux,.qzd-leg .faux i{background:#C62828;} .qzd-bar .avoir,.qzd-leg .avoir i{background:#8A919C;} .qzd-bar .sondage,.qzd-leg .sondage i{background:#26AAB1;}
    .qzd-bl.son{align-items:flex-start;} .qzd-bl.son .qzd-bl-b .qzd-det{margin:0;} .qzd-ic.sondage{color:#26AAB1;} .qzd-verdict.sondage{background:#16767B;}
    .qzd-leg{display:flex;flex-wrap:wrap;gap:4px 14px;font-size:.84rem;color:#4E5665;}
    .qzd-leg span{display:inline-flex;align-items:center;gap:5px;} .qzd-leg i{width:11px;height:11px;border-radius:3px;display:inline-block;}
    .qzd-leg small{color:#8A919C;}
    .qzd-cache{display:flex;align-items:center;gap:6px;justify-content:center;color:#5B6472;background:rgba(28,43,57,.05);border-radius:10px;padding:10px;margin:12px 0 0;font-size:.9rem;}
    .qzd-det{margin-top:12px;border-top:1px solid rgba(28,43,57,.08);padding-top:10px;display:flex;flex-direction:column;gap:6px;}
    .qzd-det-t{margin:0 0 2px;font-size:.8rem;font-weight:700;color:#5B6472;text-transform:uppercase;letter-spacing:.4px;}
    .qzd-ch{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(60px,1fr) 38px;gap:8px;align-items:center;font-size:.9rem;padding:3px 6px;border-radius:8px;}
    .qzd-ch .l{overflow:hidden;text-overflow:ellipsis;} .qzd-ch b{text-align:right;}
    .qzd-ch .b{height:12px;border-radius:99px;background:rgba(28,43,57,.07);overflow:hidden;}
    .qzd-ch .b i{display:block;height:100%;background:#6B8BB5;border-radius:99px;transition:width .4s;} .qzd-ch .b i.v{background:#1E7B34;}
    .qzd-ch.ok,.qzd-ch.juste{background:rgba(30,123,52,.1);} .qzd-ch.ok .b i,.qzd-ch.juste .b i{background:#1E7B34;}
    .qzd-ch.faux{background:rgba(198,40,40,.07);} .qzd-ch.faux .b i{background:#C62828;}
    .qzd-ch.partiel .b i{background:#E0A100;} .qzd-ch.avoir .b i{background:#8A919C;}
    .qzd-txts{display:flex;flex-direction:column;gap:5px;max-height:320px;overflow:auto;} .qzd-txts div{background:rgba(28,43,57,.04);border-radius:8px;padding:6px 9px;font-size:.9rem;}
    .qzd-noms{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px;border-top:1px solid rgba(28,43,57,.08);padding-top:10px;}
    .qzd-nom{font-size:.78rem;font-weight:600;border-radius:999px;padding:3px 9px;background:rgba(28,43,57,.07);color:#8A919C;}
    .qzd-nom.rep{background:rgba(12,91,160,.12);color:#0C5BA0;} .qzd-nom.juste{background:#1E7B34;color:#fff;} .qzd-nom.faux{background:#C62828;color:#fff;}
    .qzd-nom.partiel{background:#E0A100;color:#fff;} .qzd-nom.avoir{background:#8A919C;color:#fff;}
    .qzd-act{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:14px 0 0;padding-top:12px;border-top:1px solid rgba(28,43,57,.08);}
    .qzd-attente{text-align:center;background:#fff;border-radius:16px;border:1px solid rgba(28,43,57,.1);padding:36px 20px;margin:10px 0;}
    .qzd-attente > .gicon{font-size:3rem;color:#D93025;} .qzd-attente h2{font-family:'Space Grotesk',sans-serif;margin:6px 0;}
    .qzd-attente p{color:#4E5665;margin:6px auto;max-width:60ch;}
    .qzd-grand{font-size:1.3rem;display:flex;align-items:center;justify-content:center;gap:6px;color:#0C5BA0 !important;}
    .qzd-h2{font-family:'Space Grotesk',sans-serif;display:flex;align-items:center;gap:8px;margin:6px 0 12px;} .qzd-h3{margin:0 0 8px;}
    .qzd-blist{display:flex;flex-direction:column;gap:6px;}
    .qzd-bl{display:grid;grid-template-columns:32px minmax(0,1.3fr) minmax(120px,1fr) 110px;gap:10px;align-items:center;background:#fff;border:1px solid rgba(28,43,57,.08);border-radius:10px;padding:6px 10px;}
    @media (max-width:700px){ .qzd-bl{grid-template-columns:28px 1fr;} .qzd-bl-b,.qzd-bl-p{grid-column:2;} }
    .qzd-bl-n{font:700 1rem 'Space Grotesk',sans-serif;color:#0C5BA0;text-align:center;} .qzd-bl-t{font-size:.9rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .qzd-bl .qzd-bar{margin:0;} .qzd-bl-p{font-size:.88rem;display:flex;flex-direction:column;align-items:flex-end;} .qzd-bl-p small{color:#8A919C;}
    .qzd-tab-wrap{overflow-x:auto;} .qzd-tab{border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;font-size:.9rem;}
    .qzd-tab th,.qzd-tab td{padding:6px 12px;border-bottom:1px solid rgba(28,43,57,.07);text-align:left;white-space:nowrap;} .qzd-tab th{background:rgba(28,43,57,.04);font-size:.8rem;}
    .qzd-tab td.c{text-align:center;}
    .qzd-bl.clic,.qzd-tab tr.clic{cursor:pointer;} .qzd-bl.clic:hover,.qzd-bl.ouv{border-color:#0C5BA0;} .qzd-tab tr.clic:hover td,.qzd-tab tr.ouv td{background:rgba(12,91,160,.05);}
    .qzd-chev{font-size:1rem;vertical-align:middle;color:#8A919C;}
    .qzd-bl-det{background:#fff;border:1px solid rgba(12,91,160,.25);border-radius:10px;padding:12px 14px;margin:-2px 0 6px;white-space:normal;}
    .qzd-bl-det .qzd-det{margin-top:8px;} .qzd-bl-enonce .qz-enonce{margin:4px 0;}
    .qzd-reps{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;}
    .qzd-rep-el{border:1px solid rgba(28,43,57,.08);border-left:4px solid #C9CED6;border-radius:8px;padding:6px 10px;min-width:0;}
    .qzd-rep-el.juste{border-left-color:#1E7B34;} .qzd-rep-el.faux{border-left-color:#C62828;} .qzd-rep-el.partiel{border-left-color:#E0A100;} .qzd-rep-el.avoir{border-left-color:#8A919C;} .qzd-rep-el.sondage{border-left-color:#26AAB1;}
    .qzd-rep-nom{font-size:.88rem;margin-bottom:4px;} .qzd-rep-nom small{color:#8A919C;} .qzd-noms-g{font-size:.8rem;color:#5B6472;margin-top:2px;}
    .qzd-rep{font-size:.88rem;} .qzd-rep .qz-input{max-width:100%;} .qzd-rep textarea{width:100%;}
    .qzd-tab tr.qzd-copie td{white-space:normal;background:rgba(12,91,160,.03);} .qzd-tab tr.qzd-copie .qzd-bl-det{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;}
    .qzd-as-l{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-size:.9rem;} .qzd-as-l .l{min-width:70px;font-weight:600;}
    .qzd-as-c{display:flex;gap:6px;flex-wrap:wrap;} .qzd-as-c span{background:rgba(28,43,57,.05);border-radius:999px;padding:2px 10px;} .qzd-as-c span.juste{background:#E3F2E6;color:#1E7B34;} .qzd-as-c span.faux{background:#FBE4E2;color:#A32020;}
    .qzd-ic{font-size:1.15rem;vertical-align:middle;} .qzd-ic.juste{color:#1E7B34;} .qzd-ic.faux{color:#C62828;} .qzd-ic.partiel{color:#E0A100;} .qzd-ic.avoir{color:#8A919C;} .qzd-ic.vide{color:#C9CED6;}
    .qzd-bandeau{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:380;display:flex;align-items:center;gap:12px;background:#D93025;color:#fff;border-radius:16px;padding:10px 12px 10px 16px;box-shadow:0 10px 30px rgba(217,48,37,.35);max-width:calc(100vw - 24px);animation:qzdEntree .4s ease-out;}
    @keyframes qzdEntree{from{transform:translate(-50%,30px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
    .qzd-bandeau .t{display:flex;flex-direction:column;line-height:1.25;min-width:0;} .qzd-bandeau .t span{font-size:.85rem;opacity:.92;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .qzd-bandeau .btn{background:#fff;color:#D93025;white-space:nowrap;}
    .qzd-top.eleve{background:#fff;border-radius:14px;padding:8px 12px;border:1px solid rgba(28,43,57,.08);}
    .qzd-eq{font-size:1.05rem;margin-top:10px;}
    .qzd-envoi{display:flex;align-items:center;gap:6px;justify-content:center;color:#1E7B34;font-weight:600;margin:12px 0;}
    .qzd-envoi.err{color:#a83c1f;}
    .qzd-valider{display:flex;flex-direction:column;align-items:center;gap:4px;margin:14px 0 4px;}
    .qzd-valider .qzd-envoi{margin:0;color:var(--ink-soft);font-weight:500;}
    .qzd-e-chrono{display:flex;align-items:center;justify-content:center;gap:6px;margin:8px auto;font:700 1.6rem 'JetBrains Mono',monospace;color:#0C5BA0;}
    .qzd-e-chrono.urgent{color:#D93025;} .qzd-e-chrono.fini{color:#a83c1f;font-size:1.1rem;}
    .qzd-chrono{display:inline-flex;align-items:center;gap:6px;margin-left:auto;flex-wrap:wrap;}
    .qzd-chrono-t{display:inline-flex;align-items:center;gap:4px;font:700 1.35rem 'JetBrains Mono',monospace;color:#0C5BA0;min-width:84px;}
    .qzd-chrono.urgent .qzd-chrono-t{color:#D93025;} .qzd-chrono.fini .qzd-chrono-t{color:#a83c1f;font-size:1rem;}
    .qzd-chrono-sel{font-size:.82rem;padding:3px 6px;border-radius:8px;border:1px solid var(--line,#D5DAE1);background:#fff;}
    .qzd-phase.clos{color:#a83c1f;}
    .qzd-brouillons,.qzd-tous{display:flex;align-items:center;gap:4px;justify-content:center;margin-top:6px;color:var(--ink-soft);font-size:.85rem;}
    .qzd-tous{color:#1E7B34;font-weight:700;} .qzd-brouillons .gicon,.qzd-tous .gicon{font-size:1rem;}
    .qzd-verdict{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;padding:12px;font:700 1.25rem 'Space Grotesk',sans-serif;color:#fff;margin:6px 0 4px;}
    .qzd-verdict .gicon{font-size:1.6rem;}
    .qzd-verdict.juste{background:#1E7B34;} .qzd-verdict.faux{background:#C62828;} .qzd-verdict.partiel{background:#E0A100;} .qzd-verdict.avoir,.qzd-verdict.vide{background:#5B6472;}
    .qzd-intro{display:flex;gap:10px;align-items:flex-start;background:rgba(217,48,37,.06);border:1px solid rgba(217,48,37,.2);border-radius:12px;padding:10px 14px;max-width:75ch;color:#20242E;font-size:.92rem;}
    .qzd-intro > .gicon{color:#D93025;}
    .qzd-btn .gicon{color:#D93025;}
    .qzd-code{font:700 clamp(3.2rem,11vw,7rem)/1 'Space Grotesk',sans-serif;letter-spacing:.18em;color:#20242E;background:#FFF4F2;border:3px dashed #D93025;border-radius:22px;display:inline-block;padding:14px 18px 14px 34px;margin:8px 0 12px;}
    .qzd-pill.code{background:rgba(217,48,37,.1);color:#B3261E;} .qzd-pill.code b{letter-spacing:.12em;}
    .qzd-m-lab{margin:14px 0 6px;font-weight:600;}
    .qz-k-chip.on{border-color:#D93025;background:#FFF1EF;color:#B3261E;}
    .qzd-m-eleves{max-height:180px;overflow-y:auto;border:1px solid rgba(28,43,57,.15);border-radius:10px;padding:8px;margin-top:8px;}
    .qzd-m-acces{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
    .qzd-m-opt{display:flex;gap:8px;align-items:flex-start;text-align:left;border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:12px;padding:9px 10px;cursor:pointer;font:inherit;color:var(--ink);}
    .qzd-m-opt .gicon{color:#D93025;font-size:22px;} .qzd-m-opt b{display:block;font-size:.9rem;} .qzd-m-opt small{display:block;color:var(--ink-soft);font-size:.76rem;line-height:1.3;margin-top:2px;}
    .qzd-m-opt.on{border-color:#D93025;background:#FFF1EF;box-shadow:0 0 0 3px rgba(217,48,37,.12);}
    .qzd-modal{max-height:calc(100vh - 32px);overflow-y:auto;}
    .qzd-b-code{display:flex;gap:6px;align-items:center;margin:0;} .qzd-b-code input{width:84px;border:0;border-radius:10px;padding:8px 10px;font:700 1.05rem 'Space Grotesk',sans-serif;letter-spacing:.15em;text-align:center;}
    .qzd-code-page form{display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:12px;}
    .qzd-code-in{width:200px;font:700 2.4rem 'Space Grotesk',sans-serif;letter-spacing:.25em;text-align:center;border:2px solid rgba(28,43,57,.2);border-radius:14px;padding:8px 10px;}
    .qzd-code-in:focus{outline:none;border-color:#D93025;box-shadow:0 0 0 4px rgba(217,48,37,.15);}
    @media (max-width:560px){ .qzd-m-acces{grid-template-columns:1fr;} }
    .qzd-verdict.mini{display:inline-flex;font:600 .82rem Inter,sans-serif;padding:3px 10px;border-radius:999px;margin:0;} .qzd-verdict.mini .gicon{font-size:1rem;}
  `;
  document.head.appendChild(st);
})();

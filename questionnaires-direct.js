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
const QZD_VERDICTS = [['juste', 'Juste'], ['partiel', 'En partie'], ['faux', 'Faux'], ['avoir', 'À regarder']];

/* =====================================================================
   PROFESSEUR
   ===================================================================== */
async function qzDirectLancer(questionnaireId){
  const q = await qzBanqueSur(questionnaireId);
  if(!q){ await niceAlert('Questionnaire introuvable.'); return; }
  const questions = qzPreparer(JSON.parse(JSON.stringify(q.questions || [])));
  const nb = questions.filter(x => x.type !== 'texte').length;
  if(!nb){ await niceAlert('Ce questionnaire n\'a pas encore de question.'); return; }
  const classId = await qzDirectChoixClasse(q.titre || 'Questionnaire', nb);
  if(!classId) return;
  // Une seule séance ouverte par classe : la précédente (oubliée ?) est close.
  await sb.from('qz_direct').update({ ended_at: new Date().toISOString() }).eq('teacher_id', currentUser.id).eq('class_id', classId).is('ended_at', null);
  const { data, error } = await sb.from('qz_direct').insert({ teacher_id: currentUser.id, class_id: classId, questionnaire_id: q.id || null,
    titre: q.titre || 'Séance en direct', questions, etat: { phase: 'attente', total: nb, lancees: [] } }).select().single();
  if(error || !data){ await niceAlert('La séance n\'a pas pu être créée : ' + ((error && error.message) || '?')); return; }
  qzDirectOuvrir(data.id);
}
function qzDirectChoixClasse(titre, nb){
  const classes = accountClassesList || [];
  if(!classes.length){ niceAlert('Aucune classe sur votre compte.'); return Promise.resolve(null); }
  return new Promise(res => {
    const o = document.createElement('div'); o.className = 'qzd-ov';
    o.innerHTML = `<div class="qzd-modal" role="dialog" aria-label="Séance en direct">
      <h3><span class="gicon">cast_for_education</span> Séance en direct</h3>
      <p style="margin:4px 0 8px;"><b>${qzEsc(titre)}</b> · ${nb} question${nb > 1 ? 's' : ''}</p>
      <p class="hint" style="margin:0;">Les questions s'affichent une à une, à votre rythme. Chaque élève répond depuis son compte (ordinateur, tablette ou téléphone) ; vous voyez les réponses arriver en direct et vous affichez la correction quand vous voulez. <b>Rien n'est noté.</b></p>
      <p style="margin:14px 0 6px;font-weight:600;">Avec quelle classe ?</p>
      <div class="qz-k-chips">${classes.map(c => `<button type="button" class="qz-k-chip" data-id="${c.id}"><span class="gicon">groups</span> ${qzEsc(c.label)}</button>`).join('')}</div>
      <div style="text-align:right;margin-top:10px;"><button type="button" class="btn secondary" data-x>Annuler</button></div></div>`;
    document.body.appendChild(o);
    o.addEventListener('click', e => {
      const b = e.target.closest('[data-id]');
      if(b){ o.remove(); res(b.dataset.id); } else if(e.target === o || e.target.closest('[data-x]')){ o.remove(); res(null); }
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
  const eleves = await qzElevesDevoir({ class_id: row.class_id });
  const pages = qzPages(row.questions || []).map(p => ({ docs: p.filter(x => x.type === 'texte'), q: p.find(x => x.type !== 'texte') })).filter(p => p.q);
  let pref = {}; try{ pref = JSON.parse(localStorage.getItem('qzdAffichage') || '{}') || {}; }catch(e){}
  qzD = { id, row, etat: row.etat || {}, pages, eleves, reps: new Map(), vus: new Map(), cacher: !!pref.cacher, noms: false, sig: '' };
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
  const { data, error } = await sb.from('qz_direct_rep').select('qid,student_id,reponse,updated_at').eq('direct_id', id);
  if(error || !qzD || qzD.id !== id) return;
  const m = new Map();
  (data || []).forEach(r => {
    if(!m.has(r.qid)) m.set(r.qid, new Map());
    m.get(r.qid).set(r.student_id, r.reponse);
    const t = Date.parse(r.updated_at) || 0; if(t > (qzD.vus.get(r.student_id) || 0)) qzD.vus.set(r.student_id, t);
  });
  const sig = JSON.stringify((data || []).map(r => [r.qid, r.student_id, r.updated_at]));
  qzD.reps = m;
  if(!sansRendu && sig !== qzD.sig) qzDirectMajStats();
  qzD.sig = sig;
}
function qzDirectRepsBientot(){ if(!qzD) return; clearTimeout(qzD.repT); qzD.repT = setTimeout(qzDirectChargerReps, 250); }

// Changement d'état (question en cours, correction…) : enregistré, puis annoncé aux élèves.
async function qzDirectEtat(nouvel){
  if(!qzD) return false;
  const { error } = await sb.from('qz_direct').update({ etat: nouvel, updated_at: new Date().toISOString() }).eq('id', qzD.id);
  if(error){ await niceAlert('Erreur : ' + error.message); return false; }
  qzD.etat = nouvel;
  try{ qzD.ch.send({ type: 'broadcast', event: 'etat', payload: { phase: nouvel.phase, qid: nouvel.qid || null } }); }catch(e){}
  qzDirectRender();
  return true;
}
function qzDirectIndex(){ return qzD ? qzD.pages.findIndex(p => p.q.id === qzD.etat.qid) : -1; }
function qzDirectAller(i){
  const p = qzD && qzD.pages[i]; if(!p) return;
  const lancees = Array.from(new Set((qzD.etat.lancees || []).concat(p.q.id)));
  return qzDirectEtat({ phase: 'question', qid: p.q.id, docs: p.docs.map(d => d.id), n: i + 1, total: qzD.pages.length, lancees });
}
function qzDirectCorriger(){ return qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'correction' })); }
function qzDirectRouvrir(){ return qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'question' })); }
function qzDirectSuivante(){ const i = qzDirectIndex(); return i + 1 < qzD.pages.length ? qzDirectAller(i + 1) : qzDirectTerminer(); }
async function qzDirectRelancer(){
  const qid = qzD && qzD.etat.qid; if(!qid) return;
  const n = (qzD.reps.get(qid) || new Map()).size;
  if(n && !(await niceConfirm(`Effacer les ${n} réponse${n > 1 ? 's' : ''} à cette question et la reposer ?`))) return;
  await sb.from('qz_direct_rep').delete().eq('direct_id', qzD.id).eq('qid', qid);
  qzD.reps.delete(qid);
  await qzDirectEtat(Object.assign({}, qzD.etat, { phase: 'question' }));
}
async function qzDirectTerminer(){
  if(!qzD) return;
  if(!(await niceConfirm('Terminer la séance ? Les élèves voient leur bilan (non noté) ; vous aussi.'))) return;
  const etat = Object.assign({}, qzD.etat, { phase: 'fin' }), fin = new Date().toISOString();
  const { error } = await sb.from('qz_direct').update({ etat, ended_at: fin, updated_at: fin }).eq('id', qzD.id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  qzD.etat = etat; qzD.row.ended_at = fin;
  try{ qzD.ch.send({ type: 'broadcast', event: 'etat', payload: { phase: 'fin' } }); }catch(e){}
  await qzDirectChargerReps(true);
  qzDirectRender();
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

function qzDStats(q){
  const m = qzD.reps.get(q.id) || new Map(), c = { juste: 0, partiel: 0, faux: 0, avoir: 0 };
  let n = 0;
  qzD.eleves.forEach(e => { if(!m.has(e.id)) return; const v = qzDVerdict(q, m.get(e.id)); if(v === 'vide') return; c[v]++; n++; });
  return { c, n, total: qzD.eleves.length, m };
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
  if(q.type === 'ouverte'){
    return `<div class="qzd-det"><p class="qzd-det-t">Réponses (sans les noms)</p><div class="qzd-txts">${reps.slice(0, 40).map(r => {
      const t = r && typeof r === 'object' ? (r.texte || '') : String(r || ''), ph = r && r.photos ? r.photos.length : 0;
      return `<div>${t ? qzMath(t) : ''}${ph ? ` <span class="hint">(${ph} photo${ph > 1 ? 's' : ''})</span>` : ''}</div>`; }).join('')}</div></div>`;
  }
  return '';
}
function qzDirectStatsHtml(q){
  const s = qzDStats(q), corr = qzD.etat.phase === 'correction', montrer = corr || !qzD.cacher;
  let h = `<div class="qzd-compte"><div><b id="qzdNbRep">${s.n}</b> / ${s.total}</div><span>élève${s.n > 1 ? 's ont' : ' a'} répondu</span>
    <div class="qzd-prog"><i style="width:${qzDPct(s.n, s.total)}%"></i></div></div>`;
  if(!montrer) h += `<p class="qzd-cache"><span class="gicon">visibility_off</span> Résultats masqués jusqu'à la correction.</p>`;
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
    const n = (qzD.reps.get(p.q.id) || new Map()).size;
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
      <p>Sur leur compte, un bandeau <b>« Séance en direct »</b> apparaît : ils cliquent sur <b>Rejoindre</b>.</p>
      <p class="qzd-grand" id="qzdPresence2"></p>
      <button class="btn qz-go" onclick="qzDirectAller(0)"><span class="gicon">play_arrow</span> Lancer la question 1</button></div>`;
  else {
    const corr = e.phase === 'correction', der = i === qzD.pages.length - 1;
    corps = `<div class="qzd-main">
      <div class="qzd-q">
        <div class="qzd-qhead"><span class="qzd-num">Question ${i + 1} / ${qzD.pages.length}</span>
          <span class="qz-type-pill"><span class="gicon">${qzType(p.q.type).icon}</span> ${qzType(p.q.type).label}</span>
          ${corr ? '<span class="qzd-phase corr"><span class="gicon">fact_check</span> Correction affichée</span>' : '<span class="qzd-phase"><span class="dot"></span> Les élèves répondent</span>'}</div>
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
  const icone = { juste: 'check_circle', partiel: 'contrast', faux: 'cancel', avoir: 'help', vide: 'remove' };
  const lignes = pages.map((p, k) => {
    const s = qzDStats(p.q), txt = String(p.q.enonce || '').replace(/\$/g, '').replace(/\s+/g, ' ').slice(0, 90);
    return `<div class="qzd-bl"><span class="qzd-bl-n">${qzD.pages.indexOf(p) + 1}</span><span class="qzd-bl-t">${qzEsc(txt) || qzType(p.q.type).label}</span>
      <span class="qzd-bl-b">${s.n ? qzDBarre(s.c, s.n) : '<span class="hint" style="margin:0;">aucune réponse</span>'}</span>
      <span class="qzd-bl-p">${s.n ? `<b>${qzDPct(s.c.juste, s.n)} %</b> juste` : ''}<small>${s.n}/${s.total}</small></span></div>`;
  }).join('');
  const eleves = qzD.eleves.map(e => {
    const v = pages.map(p => qzDVerdict(p.q, (qzD.reps.get(p.q.id) || new Map()).get(e.id)));
    const j = v.filter(x => x === 'juste').length, rep = v.filter(x => x !== 'vide').length;
    return `<tr><td>${qzEsc(e.label)}</td><td class="c"><b>${j}</b> / ${pages.length}</td><td class="c">${rep}</td>
      <td>${v.map((x, k) => `<span class="gicon qzd-ic ${x}" title="Question ${qzD.pages.indexOf(pages[k]) + 1}">${icone[x]}</span>`).join('')}</td></tr>`;
  }).join('');
  return `<div id="qzdBilan">
    <h2 class="qzd-h2"><span class="gicon">insights</span> Bilan de la séance <span class="hint" style="font-weight:400;">(non noté)</span></h2>
    <div class="qzd-blist">${lignes}</div>
    <div class="qzd-leg" style="margin:8px 0 18px;">${QZD_VERDICTS.map(([k, l]) => `<span class="${k}"><i></i>${l}</span>`).join('')}</div>
    <h3 class="qzd-h3">Par élève</h3>
    <div class="qzd-tab-wrap"><table class="qzd-tab"><thead><tr><th>Élève</th><th>Justes</th><th>Répondues</th><th>Question par question</th></tr></thead><tbody>${eleves}</tbody></table></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
      <button class="btn secondary" onclick="qzDirectQuitter()">← Interrogations</button>
      ${qzD.row.questionnaire_id ? `<button class="btn secondary" onclick="qzDirectLancer('${qzD.row.questionnaire_id}')"><span class="gicon">replay</span> Nouvelle séance avec ce questionnaire</button>` : ''}
    </div></div>`;
}
// Liste des séances encore ouvertes (page Interrogations en ligne) : reprise après un rechargement.
function qzDirectsHtml(){
  const l = (typeof qzB !== 'undefined' && qzB && qzB.directs) || [];
  if(!l.length) return '';
  return `<p class="qz-i-sec"><span class="gicon" style="color:#D93025;">cast_for_education</span> En direct maintenant</p>
    <div class="qz-i-liste" style="margin-bottom:18px;">${l.map(d => { const e = d.etat || {};
      return `<div class="qz-i-row">
        <div class="qz-i-main"><b>${qzEsc(d.titre)}</b><div class="hint" style="margin:2px 0 0;">${qzEsc(d.classes ? d.classes.nom : '')} · ${e.phase === 'attente' || !e.n ? 'pas encore commencée' : 'question ' + e.n + ' / ' + (e.total || '?')} · ouverte à ${new Date(d.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div></div>
        <span class="qz-i-act">
          <button class="btn qz-mini" onclick="qzDirectOuvrir('${d.id}')"><span class="gicon">play_arrow</span> Reprendre</button>
          <button class="btn secondary qz-mini" onclick="qzDirectClore('${d.id}')" title="Terminer cette séance"><span class="gicon">stop_circle</span> Terminer</button>
        </span></div>`; }).join('')}</div>`;
}
async function qzDirectsCharger(){
  const { data } = await sb.from('qz_direct').select('id,titre,class_id,created_at,etat,classes(nom)').eq('teacher_id', currentUser.id).is('ended_at', null).order('created_at', { ascending: false });
  if(typeof qzB !== 'undefined' && qzB) qzB.directs = data || [];
}
async function qzDirectClore(id){
  const fin = new Date().toISOString();
  await sb.from('qz_direct').update({ ended_at: fin, updated_at: fin, etat: Object.assign({}, ((qzB.directs || []).find(d => d.id === id) || {}).etat, { phase: 'fin' }) }).eq('id', id);
  try{ const ch = sb.channel(qzDCanal(id)); ch.subscribe(s => { if(s === 'SUBSCRIBED'){ ch.send({ type: 'broadcast', event: 'etat', payload: { phase: 'fin' } }); setTimeout(() => sb.removeChannel(ch), 1000); } }); }catch(e){}
  await qzDirectsCharger(); qzBanqueRender();
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
  if(!b){ b = document.createElement('div'); b.id = 'qzdBandeau'; b.className = 'qzd-bandeau'; document.body.appendChild(b); }
  const s = liste[0];
  b.innerHTML = `<span class="dot"></span><span class="t"><b>Séance en direct</b><span>${qzEsc(s.titre)}${s.classe ? ' · ' + qzEsc(s.classe) : ''}</span></span>
    <button class="btn" onclick="qzDirectRejoindre('${s.id}')"><span class="gicon">login</span> ${qzDE && qzDE.id === s.id ? 'Revenir' : 'Rejoindre'}</button>`;
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
  const cle = [data.phase, data.qid || '', data.maj || ''].join('|');
  if(cle === qzDE.cle) return; // rien de neuf : la saisie en cours n'est pas touchée
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
    avoir: ['help', 'Compare ta réponse avec la correction'], vide: ['remove_circle', 'Tu n\'as pas répondu'] }[v];
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
  const q = d.question, corr = d.phase === 'correction';
  qzP = { direct: true, apercu: false, data: { devoir: { id: 'direct', titre: d.titre } }, devoirId: 'direct-' + qzDE.id,
    questions: (d.docs || []).concat(q), reglages: {}, copie: null, reponses: {}, sorties: 0, log: [] };
  if(d.reponse != null) qzP.reponses[q.id] = d.reponse;
  const rep = qzP.reponses[q.id], ctx = { reglages: {}, seed: null, pfx: 'p' };
  root.innerHTML = `<div class="qzd">${head}
    ${corr ? qzDVerdictHtml(qzDVerdict(q, rep)) : ''}
    ${(d.docs || []).map(x => `<div class="qz-doc">${qzEnonceHtml(x)}</div>`).join('')}
    <div class="qz-q qzd-eq" id="qzQ_${q.id}" data-qid="${q.id}">${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, rep, corr ? 'corrige' : 'passer', ctx)}</div></div>
    ${corr ? '<p class="qzd-envoi"><span class="gicon">hourglass_top</span> Attends la question suivante…</p>'
      : `<p class="qzd-envoi" id="qzdEnvoi">${rep != null ? '<span class="gicon">check_circle</span> Réponse envoyée : tu peux encore la modifier jusqu\'à la correction.' : 'Réponds : ta réponse part toute seule.'}</p>`}
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
    if(e) e.innerHTML = '<span class="gicon">check_circle</span> Réponse envoyée : tu peux encore la modifier jusqu\'à la correction.';
    try{ qzDE.ch.send({ type: 'broadcast', event: 'rep', payload: { e: currentUser.id } }); }catch(x){}
  }, 600);
}
function qzDirectEleveBilan(d, head){
  const b = d.bilan || { questions: [], reponses: {} }, qs = (b.questions || []).filter(q => q.type !== 'texte');
  qzP = { direct: true, apercu: false, data: { devoir: { id: 'direct', titre: d.titre } }, devoirId: 'direct-' + qzDE.id, questions: qs, reglages: {}, copie: null, reponses: b.reponses || {}, sorties: 0, log: [] };
  const v = qs.map(q => qzDVerdict(q, (b.reponses || {})[q.id])), j = v.filter(x => x === 'juste').length;
  const ctx = { reglages: {}, seed: null, pfx: 'p' };
  document.getElementById('qzDirectRoot').innerHTML = `<div class="qzd">${head}
    <div class="qzd-attente" style="padding:22px 16px;"><span class="gicon">emoji_events</span><h2>${j} bonne${j > 1 ? 's' : ''} réponse${j > 1 ? 's' : ''} sur ${qs.length}</h2>
      <p>C'était un entraînement : rien n'est noté. Relis la correction ci-dessous.</p></div>
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
    .qzd-bar .faux,.qzd-leg .faux i{background:#C62828;} .qzd-bar .avoir,.qzd-leg .avoir i{background:#8A919C;}
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
    .qzd-ic{font-size:1.15rem;vertical-align:middle;} .qzd-ic.juste{color:#1E7B34;} .qzd-ic.faux{color:#C62828;} .qzd-ic.partiel{color:#E0A100;} .qzd-ic.avoir{color:#8A919C;} .qzd-ic.vide{color:#C9CED6;}
    .qzd-bandeau{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:380;display:flex;align-items:center;gap:12px;background:#D93025;color:#fff;border-radius:16px;padding:10px 12px 10px 16px;box-shadow:0 10px 30px rgba(217,48,37,.35);max-width:calc(100vw - 24px);animation:qzdEntree .4s ease-out;}
    @keyframes qzdEntree{from{transform:translate(-50%,30px);opacity:0}to{transform:translate(-50%,0);opacity:1}}
    .qzd-bandeau .t{display:flex;flex-direction:column;line-height:1.25;min-width:0;} .qzd-bandeau .t span{font-size:.85rem;opacity:.92;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .qzd-bandeau .btn{background:#fff;color:#D93025;white-space:nowrap;}
    .qzd-top.eleve{background:#fff;border-radius:14px;padding:8px 12px;border:1px solid rgba(28,43,57,.08);}
    .qzd-eq{font-size:1.05rem;margin-top:10px;}
    .qzd-envoi{display:flex;align-items:center;gap:6px;justify-content:center;color:#1E7B34;font-weight:600;margin:12px 0;}
    .qzd-envoi.err{color:#a83c1f;}
    .qzd-verdict{display:flex;align-items:center;justify-content:center;gap:8px;border-radius:14px;padding:12px;font:700 1.25rem 'Space Grotesk',sans-serif;color:#fff;margin:6px 0 4px;}
    .qzd-verdict .gicon{font-size:1.6rem;}
    .qzd-verdict.juste{background:#1E7B34;} .qzd-verdict.faux{background:#C62828;} .qzd-verdict.partiel{background:#E0A100;} .qzd-verdict.avoir,.qzd-verdict.vide{background:#5B6472;}
    .qzd-intro{display:flex;gap:10px;align-items:flex-start;background:rgba(217,48,37,.06);border:1px solid rgba(217,48,37,.2);border-radius:12px;padding:10px 14px;max-width:75ch;color:#20242E;font-size:.92rem;}
    .qzd-intro > .gicon{color:#D93025;}
    .qzd-btn .gicon{color:#D93025;}
    .qzd-verdict.mini{display:inline-flex;font:600 .82rem Inter,sans-serif;padding:3px 10px;border-radius:999px;margin:0;} .qzd-verdict.mini .gicon{font-size:1rem;}
  `;
  document.head.appendChild(st);
})();

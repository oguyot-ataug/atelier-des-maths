/* =====================================================================
   cours-sessions.js -- Page « Sessions COURS » (L'Atelier du prof)

   Demandé : « il faut faire un menu dans Atelier du prof et supprimer le bouton dans cahier élève.
   L'idée est d'avoir une page spéciale pour les sessions :
   - voir les sessions ouvertes / fermées
   - avoir des options (mode présentation c'est le prof qui gère le passage d'un exercice au suivant,
     ou mode libre, les élèves avancent.) à tout moment le prof reprend la main.
   - si je mets une interrogation dans une session, l'enregistrer comme une interrogation. Sinon mettre
     une option, extraire les exercices... »

   - Ouvertes : code, mode (Présentation / Libre, modifiable d'ici : les élèves suivent aussitôt),
     ouverture prolongée (« jusqu'à ce soir minuit »…), télécommande, terminer.
   - Terminées : bilan, interrogations enregistrées (lien vers « Corriger »), « Noter des exercices »
     (crée une interrogation avec les réponses des élèves aux exercices cochés), rouvrir, supprimer.
   - Interrogation (questionnaire « à la maison » ou « en classe ») mise dans une session : à la fin de
     la session, elle devient une interrogation de la classe (devoir + une copie rendue par élève ayant
     répondu, corrigée automatiquement), comme une séance de questions flash notée
     (qzDirectNoter, questionnaires-direct.js). Le professeur vérifie puis publie les notes.

   Données : fonction cours_direct_liste (résumé des sessions), cours_direct (complet pour noter),
   cours_direct_travaux (réponses des élèves). Dépend de cours-direct.js (cdPreparer, cdProfOuvrir,
   cdLocal, cdMinuit, cdCanal), cours-bilan.js (cdBilan), questionnaires*.js (qzScoreCopie,
   qzModeCle, qzOuvrirCorrection).
   ===================================================================== */

const cs = { liste: null, classe: '' };

function csOuvrir(){
  showView('view-sessions'); if(typeof setActiveTopnav === 'function') setActiveTopnav('sessions');
  csRafraichir();
}
async function csRafraichir(){
  const root = document.getElementById('csRoot'); if(!root || !currentUser) return;
  if(!cs.liste) root.innerHTML = '<p class="hint">Chargement des sessions…</p>';
  const { data, error } = await sb.rpc('cours_direct_liste', { p_limite: 120 });
  if(error){ root.innerHTML = `<p class="hint">Sessions indisponibles : ${cdEsc(error.message)}</p>`; return; }
  cs.liste = Array.isArray(data) ? data : [];
  // Sessions arrivées au bout de leur ouverture (heure « jusqu'à » passée, ou 6 h sans le professeur)
  // sans avoir été terminées : on les termine, et leurs interrogations sont enregistrées.
  const echues = cs.liste.filter(x => !x.ouverte && !x.programmee && !x.ended_at);
  if(echues.length && !cs.cloture){
    cs.cloture = true;
    let n = 0;
    for(const x of echues){
      const fin = (x.etat || {}).jusqua && Date.parse(x.etat.jusqua) < Date.now() ? x.etat.jusqua : x.updated_at;
      await sb.from('cours_direct').update({ ended_at: fin }).eq('id', x.id).is('ended_at', null);
      n += await csNoterInterros(x.id);
    }
    cs.cloture = false;
    if(n && typeof cdToast === 'function') cdToast(`<span class="gicon">grading</span> ${n} interrogation${n > 1 ? 's' : ''} de sessions arrivées à leur fin ${n > 1 ? 'ont été enregistrées' : 'a été enregistrée'} : à vérifier dans « Corriger ».`);
    return csRafraichir();
  }
  csRendre();
}
const csDate = d => new Date(d).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
const csHeure = d => new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
function csRendre(){
  const root = document.getElementById('csRoot'); if(!root || !cs.liste) return;
  const classes = typeof accountClassesList !== 'undefined' ? accountClassesList : [];
  const l = cs.liste.filter(s => !cs.classe || s.class_id === cs.classe);
  const ouvertes = l.filter(s => s.ouverte), fermees = l.filter(s => !s.ouverte && !s.programmee);
  const prog = l.filter(s => s.programmee).sort((a, b) => String(a.etat.debut).localeCompare(String(b.etat.debut)));
  const cl = classes.find(c => c.id === currentClassId);
  root.innerHTML = `<div class="cs-barre">
      <label class="cs-lab">Nouvelle session pour <select id="csClasseNew">${classes.map(c => `<option value="${c.id}"${c.id === currentClassId ? ' selected' : ''}>${cdEsc(c.label)}</option>`).join('')}</select></label>
      <button class="btn" style="background:#1F7A4D;" id="csNouvelle"${classes.length ? '' : ' disabled'}><span class="gicon">add</span> Nouvelle session</button>
      <span style="flex:1"></span>
      <label class="cs-lab">Afficher <select id="csFiltre"><option value="">toutes les classes</option>${classes.map(c => `<option value="${c.id}"${c.id === cs.classe ? ' selected' : ''}>${cdEsc(c.label)}</option>`).join('')}</select></label>
      <button class="btn secondary" id="csMaj" title="Actualiser"><span class="gicon">refresh</span></button></div>
    <h2 class="cs-h"><span class="gicon" style="color:#E35D3A;">sensors</span> Ouvertes <small>${ouvertes.length}</small></h2>
    <div class="cs-grille">${ouvertes.map(csCarte).join('') || '<p class="hint">Aucune session ouverte.' + (cl ? '' : '') + '</p>'}</div>
    ${prog.length ? `<h2 class="cs-h"><span class="gicon" style="color:#C77D1E;">event</span> Programmées <small>${prog.length}</small></h2>
    <div class="cs-grille">${prog.map(csCarteProg).join('')}</div>` : ''}
    <h2 class="cs-h"><span class="gicon" style="color:#5B6472;">history</span> Terminées <small>${fermees.length}</small></h2>
    <div class="cs-liste">${fermees.map(csLigne).join('') || '<p class="hint">Aucune session terminée.</p>'}</div>`;
  root.querySelector('#csMaj').onclick = csRafraichir;
  root.querySelector('#csFiltre').onchange = e => { cs.classe = e.target.value; csRendre(); };
  root.querySelector('#csNouvelle').onclick = async () => {
    const id = root.querySelector('#csClasseNew').value;
    if(id && id !== currentClassId && typeof selectClassFromModal === 'function') await selectClassFromModal(id);
    cdPreparer();
  };
}
function csModeTxt(s){ return (s.etat || {}).mode === 'libre' ? '<span class="cs-tag libre"><span class="gicon">directions_walk</span> Libre</span>' : '<span class="cs-tag"><span class="gicon">co_present</span> Présentation</span>'; }
function csInterrosTxt(s){
  const its = s.items || [], ex = its.filter(x => x.type), it = its.filter(x => x.interro), notees = its.map((x, k) => ({ x, k })).filter(o => o.x.devoir_id);
  const ids = [...new Set(notees.map(o => o.x.devoir_id))];
  return `${its.length} élément${its.length > 1 ? 's' : ''}${ex.length ? ` · ${ex.length} exercice${ex.length > 1 ? 's' : ''}` : ''}${it.length ? ` · <b style="color:#6B3FA0;">${it.length} interrogation${it.length > 1 ? 's' : ''}</b>` : ''}`
    + (ids.length ? ` · ${ids.map((d, j) => `<a href="#" class="cs-corr" data-corr="${d}"><span class="gicon">grading</span> Corriger${ids.length > 1 ? ' (' + (j + 1) + ')' : ''}</a>`).join(' ')}` : '');
}
function csCarte(s){
  const j = (s.etat || {}).jusqua;
  return `<div class="cs-carte" data-s="${s.id}">
    <div class="cs-c-tete"><div><b>${cdEsc(s.titre || 'Session')}</b><small>${cdEsc(s.classe || '')} · depuis ${csDate(s.created_at)} ${csHeure(s.created_at)}</small></div>
      <div class="cs-code" title="Les élèves le tapent en haut de « Mon travail » (ou cliquent « Rejoindre »)">${cdEsc(s.code)}</div></div>
    <div class="cs-c-info">${csInterrosTxt(s)} · ${s.membres} élève${s.membres > 1 ? 's' : ''} entré${s.membres > 1 ? 's' : ''}</div>
    <div class="cs-c-opts">
      <div class="cd-p-mode"><button class="${(s.etat || {}).mode === 'libre' ? '' : 'on'}" data-mode="presentation" title="Vous faites avancer la classe ; tout le monde revient sur votre élément"><span class="gicon">co_present</span> Présentation</button>
        <button class="${(s.etat || {}).mode === 'libre' ? 'on' : ''}" data-mode="libre" title="Chaque élève avance à son rythme"><span class="gicon">directions_walk</span> Libre</button></div>
      <button class="btn secondary td-mini" data-act="jusqua"><span class="gicon">schedule</span> ${j ? 'Ouverte jusqu\'à ' + csDate(j) + ' ' + csHeure(j) : 'Ouverture : sans limite'}</button></div>
    <div class="cs-c-act"><button class="btn" data-act="tele"><span class="gicon">settings_remote</span> Télécommande</button>
      <button class="btn secondary" data-act="bilan"><span class="gicon">summarize</span> Bilan</button>
      <button class="btn" style="background:#C0392B;" data-act="terminer"><span class="gicon">stop</span> Terminer</button></div></div>`;
}
function csCarteProg(s){
  const d = s.etat.debut, j = s.etat.jusqua;
  return `<div class="cs-carte prog" data-s="${s.id}">
    <div class="cs-c-tete"><div><b>${cdEsc(s.titre || 'Session')}</b><small>${cdEsc(s.classe || '')}</small></div>
      <div class="cs-code" title="Code réservé : les élèves pourront l'utiliser à partir du début">${cdEsc(s.code)}</div></div>
    <div class="cs-quand"><span class="gicon">event</span> ${new Date(d).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}${j ? ` → ${csDate(j)} ${csHeure(j)}` : ''}</div>
    <div class="cs-c-info">${csInterrosTxt(s)} · ${csModeTxt(s)}</div>
    <div class="cs-c-act"><button class="btn secondary" data-act="debut"><span class="gicon">edit_calendar</span> Changer l'heure</button>
      <button class="btn" data-act="maintenant"><span class="gicon">play_arrow</span> Ouvrir maintenant</button>
      <button class="btn secondary" data-act="tele" title="Préparer : ajouter des éléments, régler le mode"><span class="gicon">settings_remote</span></button>
      <button class="btn secondary" data-act="suppr" title="Supprimer"><span class="gicon">delete</span></button></div></div>`;
}
function csLigne(s){
  return `<div class="cs-ligne" data-s="${s.id}">
    <div class="cs-l-t"><b>${cdEsc(s.titre || 'Session')}</b><small>${cdEsc(s.classe || '')} · ${csDate(s.created_at)} ${csHeure(s.created_at)} · ${csModeTxt(s)} · ${s.travaux} élève${s.travaux > 1 ? 's' : ''} ${s.travaux > 1 ? 'ont' : 'a'} travaillé</small>
      <small>${csInterrosTxt(s)}</small></div>
    <div class="cs-l-act"><button class="btn secondary td-mini" data-act="bilan"><span class="gicon">summarize</span> Bilan</button>
      ${(s.items || []).some(x => x.type === 'qz') ? '<button class="btn secondary td-mini" data-act="noter" title="Créer une interrogation avec les réponses des élèves aux exercices choisis"><span class="gicon">grading</span> Noter des exercices</button>' : ''}
      <button class="btn secondary td-mini" data-act="rouvrir"><span class="gicon">replay</span> Rouvrir</button>
      <button class="btn secondary td-mini" data-act="suppr" title="Supprimer la session et les réponses des élèves"><span class="gicon">delete</span></button></div></div>`;
}
document.addEventListener('click', async e => {
  const root = document.getElementById('csRoot'); if(!root || !root.contains(e.target)) return;
  const corr = e.target.closest('[data-corr]');
  if(corr){ e.preventDefault(); if(typeof qzOuvrirCorrection === 'function') qzOuvrirCorrection(corr.dataset.corr); return; }
  const b = e.target.closest('[data-act],[data-mode]'), box = b && b.closest('[data-s]'); if(!b || !box) return;
  const id = box.dataset.s, s = (cs.liste || []).find(x => x.id === id); if(!s) return;
  if(b.dataset.mode) return csMode(s, b.dataset.mode);
  const a = b.dataset.act;
  if(a === 'tele'){ const { data } = await sb.from('cours_direct').select('*').eq('id', id).maybeSingle(); if(data) cdProfOuvrir(data); }
  else if(a === 'bilan') cdBilan(id);
  else if(a === 'terminer') csTerminer(s);
  else if(a === 'jusqua') csJusqua(s);
  else if(a === 'debut') csDebut(s);
  else if(a === 'maintenant'){ if(await niceConfirm(`Ouvrir « ${s.titre} » maintenant ? Les élèves peuvent entrer tout de suite.`) && await csEtat(s, { debut: '' })) csRafraichir(); }
  else if(a === 'noter') csNoter(id);
  else if(a === 'rouvrir') csRouvrir(s);
  else if(a === 'suppr') csSupprimer(s);
});

/* ---------- Actions sur une session, hors télécommande ---------- */
// Prévient les élèves connectés (ils relisent l'état de la session).
async function csDiffuser(id, payload){
  if(cdP && cdP.id === id && cdP.ch){ try{ cdP.ch.send({ type: 'broadcast', event: 'etat', payload: payload || {} }); }catch(e){} return; }
  await new Promise(res => {
    const ch = sb.channel(cdCanal(id), { config: { broadcast: { self: false } } });
    const fin = () => { try{ sb.removeChannel(ch); }catch(e){} res(); };
    const t = setTimeout(fin, 4000);
    ch.subscribe(st => { if(st === 'SUBSCRIBED'){ try{ ch.send({ type: 'broadcast', event: 'etat', payload: payload || {} }); }catch(e){} clearTimeout(t); setTimeout(fin, 300); } });
  });
}
async function csEtat(s, maj){
  const { data } = await sb.from('cours_direct').select('etat').eq('id', s.id).maybeSingle();
  const etat = Object.assign({}, (data && data.etat) || {}, maj);
  const { error } = await sb.from('cours_direct').update({ etat }).eq('id', s.id);
  if(error){ await niceAlert('Changement non enregistré : ' + error.message); return false; }
  if(cdP && cdP.id === s.id){ cdP.etat = Object.assign({}, cdP.etat, maj); if(typeof cdProfRendre === 'function') cdProfRendre(); }
  await csDiffuser(s.id);
  return true;
}
async function csMode(s, m){
  if(((s.etat || {}).mode || 'presentation') === m) return;
  if(await csEtat(s, { mode: m })){ if(typeof cdToast === 'function') cdToast(m === 'libre' ? '<span class="gicon">directions_walk</span> Mode libre : chaque élève avance à son rythme.' : '<span class="gicon">co_present</span> Présentation : les élèves reviennent sur votre élément.'); csRafraichir(); }
}
function csJusqua(s){
  let o = document.getElementById('cdJq');
  if(!o){ o = document.createElement('div'); o.id = 'cdJq'; o.className = 'modal-overlay'; o.style.zIndex = '9460'; document.body.appendChild(o); }
  const j = (s.etat || {}).jusqua, v0 = j ? cdLocal(new Date(j)) : '';
  o.innerHTML = `<div class="modal-card" style="max-width:440px;"><b class="cd-h"><span class="gicon">schedule</span> Ouverture de « ${cdEsc(s.titre)} »</b>
    <p class="hint" style="margin:6px 0 10px;">Les élèves peuvent entrer et travailler jusqu'à cette heure, même sans vous. Sans limite : la session s'éteint 6 h après votre dernière action, ou quand vous la terminez.</p>
    <input type="datetime-local" id="csJqVal" value="${cdEsc(v0)}" style="width:100%;box-sizing:border-box;">
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin-top:12px;">
      <button class="btn secondary" data-jq="annuler">Annuler</button><button class="btn secondary" data-jq="vide">Sans limite</button>
      <button class="btn secondary" data-jq="minuit">Ce soir minuit</button><button class="btn" data-jq="ok">Enregistrer</button></div></div>`;
  o.style.display = 'flex';
  return new Promise(res => o.querySelectorAll('[data-jq]').forEach(b => b.onclick = async () => {
    const c = b.dataset.jq, x = o.querySelector('#csJqVal').value; o.style.display = 'none';
    if(c === 'annuler') return res(false);
    const v = c === 'minuit' ? cdMinuit().toISOString() : c === 'ok' && x ? new Date(x).toISOString() : '';
    if(v && Date.parse(v) < Date.now()){ await niceAlert('Cette heure est déjà passée.'); return res(false); }
    const ok = await csEtat(s, { jusqua: v }); csRafraichir(); res(ok);
  }));
}
// Heure de début d'une session programmée.
function csDebut(s){
  let o = document.getElementById('cdJq');
  if(!o){ o = document.createElement('div'); o.id = 'cdJq'; o.className = 'modal-overlay'; o.style.zIndex = '9460'; document.body.appendChild(o); }
  o.innerHTML = `<div class="modal-card" style="max-width:440px;"><b class="cd-h"><span class="gicon">edit_calendar</span> Début de « ${cdEsc(s.titre)} »</b>
    <p class="hint" style="margin:6px 0 10px;">Les élèves peuvent entrer à partir de cette heure (bandeau « Rejoindre » dans « Mon travail », ou le code ${cdEsc(s.code)}).</p>
    <input type="datetime-local" id="csDbVal" value="${cdLocal(new Date(s.etat.debut))}" style="width:100%;box-sizing:border-box;">
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn secondary" data-db="x">Annuler</button><button class="btn" data-db="ok">Enregistrer</button></div></div>`;
  o.style.display = 'flex';
  o.querySelectorAll('[data-db]').forEach(b => b.onclick = async () => {
    const x = o.querySelector('#csDbVal').value; o.style.display = 'none';
    if(b.dataset.db !== 'ok' || !x) return;
    const d = new Date(x);
    if(d < new Date()){ await niceAlert('Cette heure est déjà passée : utilisez « Ouvrir maintenant ».'); return; }
    if(s.etat.jusqua && Date.parse(s.etat.jusqua) <= d.getTime()){ await niceAlert('La session doit commencer avant son heure de fin (' + csDate(s.etat.jusqua) + ' ' + csHeure(s.etat.jusqua) + ').'); return; }
    if(await csEtat(s, { debut: d.toISOString() })) csRafraichir();
  });
}
async function csTerminer(s){
  if(!(await niceConfirm(`Terminer « ${s.titre} » ? Les élèves sortent de la session.`))) return;
  const { error } = await sb.from('cours_direct').update({ ended_at: new Date().toISOString() }).eq('id', s.id);
  if(error){ await niceAlert('Session non terminée : ' + error.message); return; }
  await csDiffuser(s.id, { fin: true });
  if(cdP && cdP.id === s.id && typeof cdProfFermer === 'function') cdProfFermer();
  const n = await csNoterInterros(s.id);
  await csRafraichir();
  if(n) await niceAlert(`Session terminée. ${n} interrogation${n > 1 ? 's ont été enregistrées' : ' a été enregistrée'} avec les copies des élèves : vérifiez-les dans « Corriger », puis publiez les notes.`);
}
async function csRouvrir(s){
  let o = document.getElementById('cdJq');
  if(!o){ o = document.createElement('div'); o.id = 'cdJq'; o.className = 'modal-overlay'; o.style.zIndex = '9460'; document.body.appendChild(o); }
  o.innerHTML = `<div class="modal-card" style="max-width:440px;"><b class="cd-h"><span class="gicon">replay</span> Rouvrir « ${cdEsc(s.titre)} »</b>
    <p class="hint" style="margin:6px 0 10px;">Les élèves retrouvent la session et leurs réponses. Le code peut avoir changé s'il a été repris par une autre session.</p>
    <label class="cd-lab" style="font-weight:600;">Ouverte jusqu'à <input type="datetime-local" id="csRoVal" value="${cdLocal(cdMinuit())}"></label>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end;margin-top:12px;">
      <button class="btn secondary" data-ro="annuler">Annuler</button><button class="btn secondary" data-ro="vide">Sans limite</button><button class="btn" data-ro="ok">Rouvrir</button></div></div>`;
  o.style.display = 'flex';
  const c = await new Promise(res => o.querySelectorAll('[data-ro]').forEach(b => b.onclick = () => res([b.dataset.ro, o.querySelector('#csRoVal').value])));
  o.style.display = 'none';
  if(c[0] === 'annuler') return;
  const jusqua = c[0] === 'ok' && c[1] ? new Date(c[1]).toISOString() : '';
  if(jusqua && Date.parse(jusqua) < Date.now()){ await niceAlert('Cette heure est déjà passée.'); return; }
  const { data } = await sb.from('cours_direct').select('etat,code').eq('id', s.id).maybeSingle();
  // Code repris par une session ouverte entre-temps : on en tire un nouveau (déclencheur sur code vide).
  const { data: pris } = await sb.from('cours_direct').select('id').eq('code', s.code).is('ended_at', null).neq('id', s.id).limit(1);
  const maj = { ended_at: null, etat: Object.assign({}, (data && data.etat) || {}, { jusqua }) };
  if(pris && pris.length) maj.code = csNouveauCode();
  const { error } = await sb.from('cours_direct').update(maj).eq('id', s.id);
  if(error){ await niceAlert('Session non rouverte : ' + error.message); return; }
  await csRafraichir();
}
function csNouveauCode(){ return String(Math.floor(1000 + Math.random() * 9000)); }
async function csSupprimer(s){
  if(!(await niceConfirm(`Supprimer « ${s.titre} » (${csDate(s.created_at)}) ? Les réponses des élèves à cette session sont effacées. Les interrogations déjà enregistrées sont gardées.`))) return;
  const { error } = await sb.from('cours_direct').delete().eq('id', s.id);
  if(error){ await niceAlert('Suppression impossible : ' + error.message); return; }
  csRafraichir();
}

/* ---------- Noter : réponses d'une session → interrogation ---------- */
// Interrogations mises dans la session et pas encore enregistrées : une interrogation chacune.
async function csNoterInterros(id){
  const { data: row } = await sb.from('cours_direct').select('*').eq('id', id).maybeSingle(); if(!row) return 0;
  let n = 0;
  for(const [k, it] of (row.items || []).entries()){
    if(!it || !it.exo || it.exo.type !== 'qz' || !it.exo.interro || it.devoir_id) continue;
    const r = await csCreerInterro(row, [k], it.exo.qz_titre || it.titre.replace(/^Interrogation : /, ''), true);
    if(r && r.devoir){ n++; row.items = r.items; }
  }
  return n;
}
// Crée une interrogation (questionnaire copié, devoir, copies rendues) avec les éléments ks de la session.
async function csCreerInterro(row, ks, titre, silencieux){
  const items = row.items || [], vus = new Set(), carte = new Map(); // carte : 'k|qid' → qid dans l'interrogation
  const questions = [];
  ks.forEach(k => (((items[k] || {}).exo || {}).questions || []).forEach(q => {
    const nq = JSON.parse(JSON.stringify(q)); let id = String(q.id);
    if(vus.has(id)) id = 'e' + (k + 1) + '_' + id; // même identifiant dans deux exercices : renommé
    vus.add(id); nq.id = id; carte.set(k + '|' + q.id, id); questions.push(nq);
  }));
  if(!questions.some(q => q.type !== 'texte')){ if(!silencieux) await niceAlert('Ces éléments n\'ont pas de question à noter.'); return null; }
  const { data: trav } = await sb.from('cours_direct_travaux').select('item,student_id,reponses,updated_at').eq('direct_id', row.id).in('item', ks);
  const parEleve = new Map(), fait = new Map();
  (trav || []).forEach(t => {
    const r = t.reponses || {}; let un = false;
    Object.keys(r).forEach(c => { if(c[0] === '_') return; const id = carte.get(t.item + '|' + c); if(!id) return;
      if(!parEleve.has(t.student_id)) parEleve.set(t.student_id, {}); parEleve.get(t.student_id)[id] = r[c]; un = true; });
    if(un && (!fait.has(t.student_id) || t.updated_at > fait.get(t.student_id))) fait.set(t.student_id, t.updated_at);
  });
  if(!parEleve.size){ if(!silencieux) await niceAlert('Aucun élève n\'a répondu à ces exercices : rien à noter.'); return null; }
  // Réglages : ceux de l'interrogation d'origine (barème sur 20, arrondi…) quand il n'y en a qu'une.
  const src = ks.length === 1 ? ((items[ks[0]] || {}).exo || {}) : {};
  let reglages = Object.assign({}, typeof QZ_REGLAGES_DEFAUT !== 'undefined' ? QZ_REGLAGES_DEFAUT : {});
  if(src.qz_id){ const { data: q } = await sb.from('questionnaires').select('reglages').eq('id', src.qz_id).maybeSingle(); if(q && q.reglages) reglages = Object.assign(reglages, q.reglages); }
  const mode = ['maison', 'classe'].includes(src.qz_mode) ? src.qz_mode : 'classe';
  reglages = Object.assign(reglages, { mode, ferme: false, copie_de: src.qz_id || 'seance' }); delete reglages.brouillon;
  const jour = new Date(row.created_at).toLocaleDateString('fr-FR'), fin = row.ended_at || new Date().toISOString();
  const { data: qz, error: e1 } = await sb.from('questionnaires').insert({ teacher_id: currentUser.id, titre, questions, reglages }).select('id').single();
  if(e1 || !qz){ await niceAlert('Interrogation non créée : ' + ((e1 && e1.message) || '?')); return null; }
  // Donnée aux seuls élèves qui ont répondu : un absent ne doit pas pouvoir la passer après coup.
  const { data: dv, error: e2 } = await sb.from('devoirs').insert({ teacher_id: currentUser.id, class_id: row.class_id, titre, type: 'questionnaire', questionnaire_id: qz.id,
    consigne: `Faite pendant la session COURS « ${row.titre} » du ${jour}.`, date_depot: row.created_at, date_limite: fin, student_ids: [...parEleve.keys()], qz_mode: mode }).select('id').single();
  if(e2 || !dv){ await sb.from('questionnaires').delete().eq('id', qz.id); await niceAlert('Interrogation non créée : ' + ((e2 && e2.message) || '?')); return null; }
  const copies = [...parEleve.entries()].map(([student_id, reponses]) => {
    const sc = qzScoreCopie(questions, { reponses, correction: {} }, reglages), t = fait.get(student_id) || fin;
    return { devoir_id: dv.id, student_id, started_at: row.created_at, submitted_at: t, reponses, statut: 'rendue',
      total: sc.aCorriger ? null : sc.total, note: sc.aCorriger ? null : sc.note, updated_at: t };
  });
  const { error: e3 } = await sb.from('qz_copies').insert(copies);
  if(e3){ await sb.from('devoirs').delete().eq('id', dv.id); await sb.from('questionnaires').delete().eq('id', qz.id); await niceAlert('Copies non créées : ' + e3.message); return null; }
  const { error: e4 } = await sb.from('devoirs_rendus').insert(copies.map(c => ({ devoir_id: dv.id, student_id: c.student_id, type: 'questionnaire', est_rendu: true, submitted_at: c.submitted_at })));
  if(e4) console.warn('Session notée : lignes « rendu » non créées', e4);
  // Repère dans la session : l'élément est noté (lien « Corriger », pas de double enregistrement).
  const { data: frais } = await sb.from('cours_direct').select('items').eq('id', row.id).maybeSingle();
  const its = (frais && frais.items) || items;
  ks.forEach(k => { if(its[k]) its[k].devoir_id = dv.id; });
  await sb.from('cours_direct').update({ items: its }).eq('id', row.id);
  if(cdP && cdP.id === row.id) cdP.items = its;
  return { devoir: dv.id, copies: copies.length, items: its };
}
// « Noter des exercices » : choix des exercices de la session à réunir dans une interrogation.
async function csNoter(id){
  const { data: row } = await sb.from('cours_direct').select('*').eq('id', id).maybeSingle(); if(!row) return;
  const items = row.items || [];
  let o = document.getElementById('csNoter');
  if(!o){ o = document.createElement('div'); o.id = 'csNoter'; o.className = 'modal-overlay'; o.style.zIndex = '9455'; document.body.appendChild(o); }
  const lignes = items.map((it, k) => ({ it, k })).filter(x => x.it && x.it.exo);
  o.innerHTML = `<div class="modal-card" style="max-width:600px;width:94vw;max-height:88vh;display:flex;flex-direction:column;">
    <div style="display:flex;justify-content:space-between;align-items:center;"><b class="cd-h"><span class="gicon">grading</span> Noter des exercices</b><button class="modal-close" data-n="x"><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:6px 0 10px;">Les exercices cochés forment une interrogation de la classe, avec une copie rendue pour chaque élève qui a répondu, corrigée automatiquement. Vous vérifiez dans « Corriger », puis vous publiez les notes.</p>
    <label class="cd-lab">Titre <input type="text" id="csNTitre" value="${cdEsc(row.titre)}"></label>
    <div class="cs-n-liste">${lignes.map(({ it, k }) => {
      const ok = it.exo.type === 'qz', fait = !!it.devoir_id;
      return `<label class="cs-n-it${ok && !fait ? '' : ' off'}"><input type="checkbox" data-k="${k}" ${ok && !fait ? '' : 'disabled'}${ok && !fait && it.exo.interro ? ' checked' : ''}>
        <span><b>${k + 1}. ${cdEsc(it.titre)}</b><small>${fait ? 'déjà enregistrée comme interrogation' : ok ? `${(it.exo.questions || []).filter(q => q.type !== 'texte').length} question(s)` : it.exo.type === 'td' ? 'exercice du manuel : pas de note (voir le bilan)' : 'programmation : pas de note (voir le bilan)'}</small></span></label>`; }).join('') || '<p class="hint">Aucun exercice dans cette session.</p>'}</div>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn secondary" data-n="x">Annuler</button><button class="btn" data-n="ok"><span class="gicon">grading</span> Créer l'interrogation</button></div></div>`;
  o.style.display = 'flex';
  o.querySelectorAll('[data-n]').forEach(b => b.onclick = async () => {
    if(b.dataset.n === 'x'){ o.style.display = 'none'; return; }
    const ks = [...o.querySelectorAll('input[data-k]:checked')].map(c => +c.dataset.k);
    if(!ks.length){ await niceAlert('Cochez au moins un exercice.'); return; }
    const titre = o.querySelector('#csNTitre').value.trim() || row.titre;
    b.disabled = true; b.innerHTML = 'Création…';
    const r = await csCreerInterro(row, ks, titre);
    o.style.display = 'none';
    await csRafraichir();
    if(r && await niceConfirm(`Interrogation « ${titre} » créée : ${r.copies} copie${r.copies > 1 ? 's' : ''}. Ouvrir la correction ?`)) qzOuvrirCorrection(r.devoir);
  });
}

(function csStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .cs-barre{display:flex;gap:8px 12px;align-items:center;flex-wrap:wrap;margin:10px 0 6px;}
    .cs-lab{display:inline-flex;gap:6px;align-items:center;font-weight:600;font-size:.9rem;}
    .cs-h{font:800 1.15rem 'Space Grotesk',sans-serif;margin:18px 0 8px;display:flex;align-items:center;gap:6px;} .cs-h small{background:#E8ECF2;border-radius:999px;padding:0 9px;font-size:.8rem;}
    .cs-grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px;}
    .cs-carte{background:#fff;border:1.5px solid rgba(227,93,58,.35);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 14px rgba(28,43,57,.06);}
    .cs-c-tete{display:flex;gap:10px;align-items:flex-start;} .cs-c-tete > div:first-child{flex:1;min-width:0;}
    .cs-c-tete b{font:800 1.02rem 'Space Grotesk',sans-serif;display:block;} .cs-c-tete small,.cs-l-t small{color:var(--ink-soft);font-size:.8rem;display:block;}
    .cs-code{background:#1F3A5C;color:#fff;border-radius:10px;padding:4px 12px;font:800 1.5rem 'Space Grotesk',sans-serif;letter-spacing:.12em;}
    .cs-carte.prog{border-color:rgba(199,125,30,.45);} .cs-quand{font:700 .95rem 'Space Grotesk',sans-serif;color:#8A5A00;text-transform:none;} .cs-quand .gicon{vertical-align:-4px;font-size:19px;}
    .cs-c-info{font-size:.85rem;} .cs-c-opts,.cs-c-act{display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
    .cs-liste{display:flex;flex-direction:column;gap:6px;}
    .cs-ligne{display:flex;gap:10px;align-items:center;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px 12px;flex-wrap:wrap;}
    .cs-l-t{flex:1;min-width:240px;} .cs-l-t b{font-family:'Space Grotesk',sans-serif;} .cs-l-act{display:flex;gap:6px;flex-wrap:wrap;}
    .cs-tag{display:inline-flex;align-items:center;gap:2px;font-weight:700;color:#1F3A5C;} .cs-tag.libre{color:#1F7A4D;} .cs-tag .gicon{font-size:15px;}
    .cs-corr{color:#6B3FA0;font-weight:700;text-decoration:none;white-space:nowrap;} .cs-corr .gicon{font-size:15px;vertical-align:-3px;}
    .cs-n-liste{overflow:auto;flex:1;display:flex;flex-direction:column;gap:6px;margin-top:10px;}
    .cs-n-it{display:flex;gap:8px;align-items:flex-start;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:7px 10px;cursor:pointer;}
    .cs-n-it small{display:block;color:var(--ink-soft);font-size:.78rem;} .cs-n-it.off{opacity:.6;cursor:default;}
    @media (max-width:560px){ .cs-grille{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

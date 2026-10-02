/* =====================================================================
   devoirs-suivi.js -- Suivi en direct d'un devoir en ligne

   Demandé : après le suivi en direct des interrogations, « Ok pour les deux premières étapes » :
   étendre le suivi en direct aux devoirs en ligne (automatismes, Objectif Nombre, programmation,
   figures).

   Professeur (Devoirs › « Suivi en direct ») : une vignette par élève -- pas commencé, en train de
   travailler (sur quelle séquence / quel compte / quel défi), en pause, sorti de la page -- avec
   le temps de travail réel, le nombre de tentatives et une pastille par élément du devoir (meilleur
   score d'automatismes, compte trouvé ou non, défi réussi…). Un clic : le détail de l'élève.
   Données : devoir_sessions (suivi-devoirs.js : une ligne par séance, enregistrée toutes les 20 s),
   cm_results et ceb_results, relues toutes les 5 s et dès qu'un élève signale un enregistrement ou une
   sortie sur le canal « dvs-<devoir> » (suivi-devoirs.js).
   Dépend de questionnaires-suivi.js (styles qzs-*), d'app.js (sb, escapeHtml) et de devoirs.js
   (devoirPctColor), calcul-mental.js (CM_SEQUENCES), prog-defis.js (progDefiParId), cours-direct.js (cdToast).
   ===================================================================== */

let dvS = null; // { devoir, eleves, items, sessions, cm, ceb, dehors:Map, sel, ch, timer }

function dvSItems(d){
  if(d.type === 'automatismes') return (d.automatismes_sequences || []).map(id => { const s = typeof CM_SEQUENCES !== 'undefined' ? CM_SEQUENCES.find(x => x.id === id) : null; return { id: String(id), label: s ? s.label : id }; });
  if(d.type === 'compte_est_bon') return (d.ceb_rounds || []).map((r, i) => ({ id: String(i), label: `Compte n° ${i + 1}${r && r.target ? ' (' + r.target + ')' : ''}` }));
  if(d.type === 'programmation') return (d.prog_defis || []).map(id => { const p = typeof progDefiParId === 'function' ? progDefiParId(id) : null; return { id: String(id), label: p ? p.titre : id }; });
  return [{ id: 'null', label: d.type === 'figure' || d.type === 'figure_completer' ? 'Figure' : 'Travail' }];
}
async function dvSuiviOuvrir(devoirId){
  dvSuiviFermer();
  let v = document.getElementById('dvSuivi');
  if(!v){ v = document.createElement('div'); v.id = 'dvSuivi'; document.body.appendChild(v); }
  v.style.display = 'flex'; v.innerHTML = '<p class="hint" style="margin:30px auto;">Chargement…</p>';
  const { data: devoir } = await sb.from('devoirs').select('*, classes(nom,niveau)').eq('id', devoirId).single();
  if(!devoir){ v.style.display = 'none'; niceAlert('Devoir introuvable.'); return; }
  if(devoir.type === 'questionnaire' && typeof qzSuiviOuvrir === 'function'){ v.style.display = 'none'; return qzSuiviOuvrir(devoirId); }
  const eleves = typeof qzElevesDevoir === 'function' ? await qzElevesDevoir(devoir) : [];
  dvS = { devoir, eleves, items: dvSItems(devoir), sessions: [], cm: [], ceb: [], dehors: new Map(), sel: null };
  dvS.ch = sb.channel('dvs-' + devoirId, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'maj' }, () => dvSuiviBientot())
    .on('broadcast', { event: 'sortie' }, ({ payload }) => dvSuiviSortie(payload))
    .subscribe();
  dvS.timer = setInterval(dvSuiviCharger, 5000);
  await dvSuiviCharger();
}
function dvSuiviFermer(){
  if(!dvS) return;
  clearInterval(dvS.timer); clearTimeout(dvS.bientot);
  try{ sb.removeChannel(dvS.ch); }catch(e){}
  const v = document.getElementById('dvSuivi'); if(v) v.style.display = 'none';
  dvS = null;
}
function dvSuiviBientot(){ if(!dvS) return; clearTimeout(dvS.bientot); dvS.bientot = setTimeout(dvSuiviCharger, 700); }
async function dvSuiviCharger(){
  if(!dvS) return;
  const s = dvS, id = s.devoir.id;
  const [ses, cm, ceb] = await Promise.all([
    sb.from('devoir_sessions').select('student_id,kind,item,active_ms,actions,statut,started_at,updated_at').eq('devoir_id', id),
    s.devoir.type === 'automatismes' ? sb.from('cm_results').select('student_id,sequence_id,score,total,created_at,duration_ms').eq('devoir_id', id) : { data: [] },
    s.devoir.type === 'compte_est_bon' ? sb.from('ceb_results').select('student_id,devoir_round,success,gap,expression,created_at').eq('devoir_id', id) : { data: [] },
  ]);
  if(dvS !== s) return;
  s.sessions = ses.data || []; s.cm = cm.data || []; s.ceb = ceb.data || [];
  dvSuiviRendre();
}
function dvSuiviSortie(p){
  if(!dvS || !p || !p.e) return;
  const avant = dvS.dehors.get(p.e);
  dvS.dehors.set(p.e, !!p.dehors);
  if(p.dehors && !avant && typeof cdToast === 'function'){
    const e = dvS.eleves.find(x => x.id === p.e);
    cdToast(`<span class="gicon">warning</span> <b>${escapeHtml(e ? (e.prenom || e.label) : 'Un élève')}</b> a quitté la page du devoir.`);
  }
  dvSuiviRendre();
  if(!p.dehors) dvSuiviBientot();
}
// État d'un élément pour un élève : couleur de la pastille et texte.
function dvSItemEtat(eid, it){
  const d = dvS.devoir;
  if(d.type === 'automatismes'){
    const rs = dvS.cm.filter(r => r.student_id === eid && String(r.sequence_id) === it.id);
    if(!rs.length) return { c: '#D5DBE3', t: 'pas fait', n: 0 };
    const best = rs.reduce((m, r) => r.score / r.total > m.score / m.total ? r : m);
    const pct = Math.round(100 * best.score / best.total);
    return { c: typeof devoirPctColor === 'function' ? devoirPctColor(pct) : '#2E9C6A', t: `meilleur score ${best.score}/${best.total}`, n: rs.length };
  }
  if(d.type === 'compte_est_bon'){
    const rs = dvS.ceb.filter(r => r.student_id === eid && String(r.devoir_round) === it.id);
    if(!rs.length) return { c: '#D5DBE3', t: 'pas fait', n: 0 };
    const ok = rs.some(r => r.success);
    const best = rs.reduce((m, r) => (r.gap ?? 99) < (m.gap ?? 99) ? r : m);
    return { c: ok ? '#2E9C6A' : '#C0392B', t: ok ? 'trouvé' : `pas trouvé (écart ${best.gap ?? '?'})`, n: rs.length };
  }
  const ss = dvS.sessions.filter(r => r.student_id === eid && String(r.item) === it.id);
  if(!ss.length) return { c: '#D5DBE3', t: 'pas commencé', n: 0 };
  return ss.some(r => r.statut === 'terminee') ? { c: '#2E9C6A', t: 'terminé', n: ss.length } : { c: '#E9C46A', t: 'commencé', n: ss.length };
}
function dvSDuree(ms){ const m = Math.floor(ms / 60000), s = Math.floor(ms / 1000) % 60; return m ? `${m} min${s ? ' ' + String(s).padStart(2, '0') + ' s' : ''}` : `${s} s`; }
function dvSEleve(e){
  const now = Date.now(), ss = dvS.sessions.filter(r => r.student_id === e.id);
  const enCours = ss.filter(r => r.statut === 'en_cours').sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))[0];
  const derniere = ss.reduce((m, r) => Math.max(m, Date.parse(r.updated_at || r.started_at)), 0);
  const recent = enCours && now - Date.parse(enCours.updated_at) < 45000;
  const fait = dvS.items.length && dvS.items.every(it => dvSItemEtat(e.id, it).n > 0);
  const etat = dvS.dehors.get(e.id) && enCours ? 'dehors' : recent ? 'encours' : enCours && now - Date.parse(enCours.updated_at) < 600000 ? 'inactif' : !ss.length && !dvS.cm.some(r => r.student_id === e.id) && !dvS.ceb.some(r => r.student_id === e.id) ? 'absent' : fait ? 'rendue' : 'pause';
  const it = enCours ? dvS.items.find(x => x.id === String(enCours.item)) : null;
  return { etat, ss, enCours, it, derniere, actif: ss.reduce((m, r) => m + (r.active_ms || 0), 0), tentatives: ss.length };
}
function dvSTuile(e){
  const x = dvSEleve(e);
  const info = x.etat === 'absent' ? 'pas commencé' : x.etat === 'dehors' ? 'SORTI de la page'
    : x.etat === 'encours' ? `travaille${x.it ? ' : ' + x.it.label : ''}` : x.etat === 'inactif' ? `en pause${x.it ? ' (' + x.it.label + ')' : ''}`
    : x.etat === 'rendue' ? 'tout fait' : `dernière activité il y a ${dvSDuree(Date.now() - x.derniere)}`;
  const faits = dvS.items.filter(it => dvSItemEtat(e.id, it).n > 0).length, N = dvS.items.length;
  const pas = dvS.items.map(it => { const s = dvSItemEtat(e.id, it); return `<i style="background:${s.c}" title="${escapeHtml(it.label)} : ${s.t}${s.n > 1 ? ' (' + s.n + ' essais)' : ''}"${x.enCours && x.it === it && x.etat === 'encours' ? ' class="cur"' : ''}></i>`; }).join('');
  return `<button type="button" class="qzs-t ${x.etat === 'pause' ? 'rendue' : x.etat}${dvS.sel === e.id ? ' sel' : ''}" onclick="dvSuiviVoir('${e.id}')">
    <span class="qzs-nom">${escapeHtml(e.label)}</span><span class="qzs-info">${escapeHtml(info)}</span>
    <span class="qzs-prog"><span style="width:${N ? Math.round(faits / N * 100) : 0}%"></span></span>
    <span class="qzs-l"><span>${faits} / ${N}</span>${x.actif ? `<span>${dvSDuree(x.actif)} de travail</span>` : ''}${x.tentatives ? `<span>${x.tentatives} séance${x.tentatives > 1 ? 's' : ''}</span>` : ''}</span>
    <span class="qzs-pas">${pas}</span></button>`;
}
function dvSDetail(e){
  const x = dvSEleve(e);
  return `<div class="qzs-copie-h"><b>${escapeHtml(e.label)}</b><button class="btn secondary qz-mini" onclick="dvSuiviVoir('${e.id}')"><span class="gicon">close</span></button></div>
    ${dvS.items.map(it => { const s = dvSItemEtat(e.id, it), ss = x.ss.filter(r => String(r.item) === it.id), ms = ss.reduce((m, r) => m + (r.active_ms || 0), 0);
      const cours = x.enCours && x.it === it && x.etat !== 'absent';
      return `<div class="dvs-item${cours ? ' cur' : ''}"><i style="background:${s.c}"></i><div><b>${escapeHtml(it.label)}</b>
        <div class="hint" style="margin:0;">${s.t}${s.n ? ` · ${s.n} essai${s.n > 1 ? 's' : ''}` : ''}${ms ? ` · ${dvSDuree(ms)} de travail` : ''}${cours ? ' · <b style="color:#2E9C6A;">en cours</b>' : ''}</div></div></div>`; }).join('')}
    ${dvS.devoir.type === 'compte_est_bon' ? (() => { const der = dvS.ceb.filter(r => r.student_id === e.id && r.expression).slice(-3); return der.length ? `<p class="hint" style="margin:8px 0 0;">Derniers calculs : ${der.map(r => `<code>${escapeHtml(r.expression)}</code>`).join(' · ')}</p>` : ''; })() : ''}`;
}
function dvSuiviVoir(id){ if(!dvS) return; dvS.sel = dvS.sel === id ? null : id; dvSuiviRendre(); }
function dvSuiviRendre(){
  const v = document.getElementById('dvSuivi'); if(!v || !dvS) return;
  const xs = dvS.eleves.map(dvSEleve), n = k => xs.filter(x => x.etat === k).length;
  const sel = dvS.sel && dvS.eleves.find(e => e.id === dvS.sel);
  const t = (typeof DEVOIR_TYPES !== 'undefined' ? DEVOIR_TYPES.find(t => t.id === dvS.devoir.type) : null);
  v.innerHTML = `<div class="qzs-tete">
      <div><div class="qzs-titre">${escapeHtml(dvS.devoir.titre)}</div>
        <div class="hint" style="margin:0;">${escapeHtml(dvS.devoir.classes ? dvS.devoir.classes.nom : '')}${t ? ' · ' + escapeHtml(t.label) : ''} · <span class="qzs-live"><span class="dot"></span> Suivi en direct</span></div></div>
      <div class="qzs-compte"><span><b>${n('encours')}</b> au travail</span><span><b>${n('inactif') + n('pause')}</b> en pause</span><span><b>${n('rendue')}</b> tout fait</span><span><b>${n('absent')}</b> pas commencé${n('absent') > 1 ? 's' : ''}</span>${n('dehors') ? `<span class="rouge"><b>${n('dehors')}</b> sorti${n('dehors') > 1 ? 's' : ''}</span>` : ''}</div>
      <button class="btn secondary" onclick="dvSuiviFermer()"><span class="gicon">close</span> Fermer</button></div>
    <div class="qzs-corps${sel ? ' avec-copie' : ''}"><div class="qzs-grille">${dvS.eleves.map(dvSTuile).join('') || '<p class="hint">Aucun élève.</p>'}</div>
      ${sel ? `<div class="qzs-copie">${dvSDetail(sel)}</div>` : ''}</div>
    <p class="qzs-leg"><span><i style="background:#2E9C6A"></i>réussi</span><span><i style="background:#C77D1E"></i>moyen</span><span><i style="background:#C0392B"></i>à reprendre</span><span><i style="background:#D5DBE3"></i>pas fait</span>
      <span class="hint" style="margin:0;">Une pastille par élément du devoir ; temps de travail réel (pauses et changements d'onglet exclus).</span></p>`;
}
(function dvsStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #dvSuivi{position:fixed;inset:0;z-index:9000;background:var(--paper,#FBF8F2);display:none;flex-direction:column;}
    .dvs-item{display:flex;gap:10px;align-items:flex-start;padding:8px 6px;border-bottom:1px solid rgba(28,43,57,.08);} .dvs-item > i{width:14px;height:14px;border-radius:4px;margin-top:3px;flex:none;}
    .dvs-item.cur{background:#EAF6EC;border-radius:8px;}
  `;
  document.head.appendChild(st);
})();

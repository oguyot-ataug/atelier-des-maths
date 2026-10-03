/* =====================================================================
   devoirs-bilan.js -- Devoirs en ligne : rangement par classe, archivage, bilan en tableau et
   appréciations de fin de période par l'IA.

   Demandé : « Ranger les devoirs en ligne comme les interrogations, archivage, bilan complet en
   tableau (comme un carnet de notes...). Dans ce tableau, prévoir un bilan IA avec appréciations :
   genre fin de trimestre, visible uniquement par l'enseignant. »

   - Liste (refreshDevoirsProfListing, devoirs.js) : une pastille par classe (la classe active par
     défaut), une section par classe, « Archiver » sur chaque devoir (devoirs.archive_at : rien ne
     change pour les élèves), « Archiver les terminés » (date limite passée), archives repliées.
   - Bilan d'une classe (bouton « Bilan de la classe ») : une ligne par élève, une colonne par devoir
     publié sur la période (trimestre, année ou dates choisies), interrogations comprises :
       automatismes : moyenne des meilleurs scores des séquences ; Objectif Nombre : comptes trouvés
       exactement ; programmation : défis réussis ; fichier / figure : rendu (et note si le
       professeur en a mis une) ; interrogation : la note.
     Puis travaux faits, retards, réussite moyenne, moyenne des interrogations, et l'appréciation.
   - Appréciations : générées par l'IA à partir de ces seules données (élèves anonymisés : E1, E2…),
     puis modifiables ; table bilan_appreciations (RLS : le professeur seulement, jamais les élèves
     ni les parents). Imprimable, exportable en CSV.
   ===================================================================== */

/* ---------------- Liste rangée par classe ---------------- */
const dvl = { classe: undefined };
function dvlArchiveBtn(d){
  return d.archive_at
    ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="dvlArchiver('${d.id}',false)" title="Sortir des archives"><span class=gicon>unarchive</span></button>`
    : `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="dvlArchiver('${d.id}',true)" title="Archiver : rangé dans « Archives » en bas de la classe (rien ne change pour les élèves)"><span class=gicon>inventory_2</span></button>`;
}
function dvlFini(d){ return !!(d.date_limite && new Date(d.date_limite) < new Date(new Date().toDateString())); }
function dvlAfficher(el, devoirs, rows){
  dvl.devoirs = devoirs;
  const classes = new Map();
  devoirs.forEach(d => { if(!classes.has(d.class_id)) classes.set(d.class_id, { id: d.class_id, nom: d.classes ? d.classes.nom : 'Classe', n: 0 }); if(!d.archive_at) classes.get(d.class_id).n++; });
  const liste = [...classes.values()].sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
  let choix = dvl.classe;
  if(choix === undefined){ try{ choix = localStorage.getItem('dvlClasse'); }catch(e){ choix = null; } }
  if(!choix || (choix !== 'tout' && !classes.has(choix))) choix = classes.has(typeof currentClassId !== 'undefined' ? currentClassId : null) ? currentClassId : 'tout';
  const chips = `<div class="qz-cl-chips"><button class="${choix === 'tout' ? 'on' : ''}" onclick="dvlChoisir('tout')">Toutes les classes</button>${liste.map(c => `<button class="${choix === c.id ? 'on' : ''}" onclick="dvlChoisir('${c.id}')">${escapeHtml(c.nom)} <small>${c.n}</small></button>`).join('')}</div>`;
  el.innerHTML = chips + liste.filter(c => choix === 'tout' || c.id === choix).map(c => {
    const idx = devoirs.map((d, i) => i).filter(i => devoirs[i].class_id === c.id);
    const actifs = idx.filter(i => !devoirs[i].archive_at), arch = idx.filter(i => devoirs[i].archive_at);
    const finis = actifs.filter(i => dvlFini(devoirs[i])).length;
    return `<section class="qz-cl-sec"><div class="qz-cl-tete"><h3><span class="gicon">groups</span> ${escapeHtml(c.nom)}</h3>
        <span class="hint" style="margin:0;">${actifs.length} devoir${actifs.length > 1 ? 's' : ''} suivi${actifs.length > 1 ? 's' : ''}${arch.length ? ` · ${arch.length} archivé${arch.length > 1 ? 's' : ''}` : ''}</span>
        <span style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn" style="font-size:.78rem;padding:5px 10px;background:#1F3A5C;" onclick="dvbOuvrir('${c.id}')" title="Tous les devoirs et interrogations de la classe en tableau, avec les appréciations"><span class="gicon">table_view</span> Bilan de la classe</button>
          ${finis ? `<button class="btn secondary" style="font-size:.78rem;padding:5px 10px;" onclick="dvlArchiverFinis('${c.id}')" title="Devoirs dont la date limite est passée"><span class="gicon">inventory_2</span> Archiver les terminés (${finis})</button>` : ''}</span></div>
      ${actifs.length ? actifs.map(i => rows[i]).join('') : '<p class="hint">Aucun devoir en cours pour cette classe.</p>'}
      ${arch.length ? `<details class="qz-repli qz-archives"><summary><span class="gicon">inventory_2</span> Archives (${arch.length})</summary>${arch.map(i => rows[i]).join('')}</details>` : ''}</section>`;
  }).join('');
}
function dvlChoisir(c){ dvl.classe = c; try{ localStorage.setItem('dvlClasse', c); }catch(e){} refreshDevoirsProfListing(); }
async function dvlArchiver(id, on, silencieux){
  const { error } = await sb.from('devoirs').update({ archive_at: on ? new Date().toISOString() : null }).eq('id', id);
  if(error){ if(!silencieux) await niceAlert('Archivage impossible : ' + error.message); return false; }
  if(!silencieux) refreshDevoirsProfListing();
  return true;
}
async function dvlArchiverFinis(classe){
  const l = (dvl.devoirs || []).filter(d => d.class_id === classe && !d.archive_at && dvlFini(d));
  if(!l.length) return;
  if(!(await niceConfirm(`Archiver ${l.length} devoir${l.length > 1 ? 's' : ''} dont la date limite est passée ? Rien ne change pour les élèves ; vous les retrouvez dans « Archives », et ils restent dans le bilan de la classe.`))) return;
  for(const d of l) await dvlArchiver(d.id, true, true);
  refreshDevoirsProfListing();
}

/* ---------------- Bilan en tableau ---------------- */
let dvb = null; // { classe, nom, eleves, colonnes, cellules, periode, du, au, appr: Map }
// Périodes de l'année scolaire en cours (septembre → juillet).
function dvbPeriodes(){
  const n = new Date(), a = n.getMonth() >= 7 ? n.getFullYear() : n.getFullYear() - 1, an = `${a}-${a + 1}`;
  return [
    { k: `T1-${an}`, t: '1er trimestre', du: `${a}-08-20`, au: `${a}-11-30` },
    { k: `T2-${an}`, t: '2e trimestre', du: `${a}-12-01`, au: `${a + 1}-02-28` },
    { k: `T3-${an}`, t: '3e trimestre', du: `${a + 1}-03-01`, au: `${a + 1}-07-31` },
    { k: `A-${an}`, t: `Année ${an}`, du: `${a}-08-20`, au: `${a + 1}-07-31` },
  ];
}
function dvbPeriodeCourante(){ const j = new Date().toISOString().slice(0, 10), p = dvbPeriodes(); return (p.slice(0, 3).find(x => j >= x.du && j <= x.au) || p[0]).k; }
async function dvbOuvrir(classe, periode){
  let o = document.getElementById('dvbOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'dvbOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '420'; document.body.appendChild(o); }
  o.innerHTML = '<div class="modal-card dvb"><p class="hint">Préparation du bilan…</p></div>'; o.style.display = 'flex';
  o.onclick = e => { if(e.target === o) o.style.display = 'none'; };
  const per = dvbPeriodes().find(p => p.k === (periode || (dvb && dvb.classe === classe ? dvb.periode : null) || dvbPeriodeCourante())) || dvbPeriodes()[0];
  try{ dvb = await dvbCharger(classe, per); }catch(e){ o.innerHTML = `<div class="modal-card dvb"><p class="hint">Erreur : ${escapeHtml(e.message || String(e))}</p></div>`; return; }
  dvbRendre();
}
async function dvbCharger(classe, per){
  const fin = per.au + 'T23:59:59';
  const [eleves, { data: dv }, { data: cl }] = await Promise.all([
    qzElevesDevoir({ class_id: classe }),
    sb.from('devoirs').select('*').eq('teacher_id', currentUser.id).eq('class_id', classe).not('date_depot', 'is', null).order('date_depot', { ascending: true }),
    sb.from('classes').select('nom,niveau').eq('id', classe).maybeSingle(),
  ]);
  const devoirs = (dv || []).filter(d => { const t = (d.date_depot || d.created_at).slice(0, 10); return t >= per.du && t <= per.au && new Date(d.date_depot) <= new Date(); });
  const ids = devoirs.map(d => d.id), sid = eleves.map(e => e.id);
  const de = t => devoirs.filter(d => d.type === t).map(d => d.id);
  const prIds = [...new Set(devoirs.filter(d => d.type === 'programmation').flatMap(d => d.prog_defis || []))];
  const qIds = [...new Set(devoirs.filter(d => d.type === 'questionnaire').map(d => d.questionnaire_id).filter(Boolean))];
  const vide = Promise.resolve({ data: [] });
  const [{ data: rendus }, { data: cm }, { data: ceb }, { data: pp }, { data: cps }, { data: qzs }, { data: appr }] = await Promise.all([
    ids.length ? sb.from('devoirs_rendus').select('devoir_id,student_id,est_rendu,a_reprendre,note,submitted_at').in('devoir_id', ids) : vide,
    de('automatismes').length ? sb.from('cm_results').select('devoir_id,student_id,sequence_id,score,total').in('devoir_id', de('automatismes')) : vide,
    de('compte_est_bon').length ? sb.from('ceb_results').select('devoir_id,student_id,devoir_round,gap').in('devoir_id', de('compte_est_bon')) : vide,
    prIds.length && sid.length ? sb.from('prog_progress').select('user_id,defi_id,reussi,reussi_at').in('user_id', sid).in('defi_id', prIds) : vide,
    de('questionnaire').length ? sb.from('qz_copies').select('devoir_id,student_id,statut,deadline_at,note,total').in('devoir_id', de('questionnaire')) : vide,
    qIds.length ? sb.from('questionnaires').select('id,reglages').in('id', qIds) : vide,
    sb.from('bilan_appreciations').select('student_id,texte,ia,updated_at').eq('teacher_id', currentUser.id).eq('class_id', classe).eq('periode', per.k),
  ]);
  const R = new Map((rendus || []).map(r => [r.devoir_id + '|' + r.student_id, r]));
  const reg = new Map((qzs || []).map(q => [q.id, Object.assign({}, typeof QZ_REGLAGES_DEFAUT !== 'undefined' ? QZ_REGLAGES_DEFAUT : {}, q.reglages || {})]));
  const colonnes = devoirs.map(d => ({ d, reg: d.type === 'questionnaire' ? reg.get(d.questionnaire_id) || {} : null }))
    .filter(c => !(c.reg && (c.reg.mode === 'sondage'))); // un sondage n'a pas de résultat
  const cellules = new Map();
  colonnes.forEach(({ d, reg }) => eleves.forEach(e => {
    const r = R.get(d.id + '|' + e.id), cible = !d.student_ids || !d.student_ids.length || d.student_ids.includes(e.id);
    let c;
    if(!cible) c = { txt: '', cl: 'nc', nc: true };
    else if(d.type === 'automatismes'){
      const seqs = d.automatismes_sequences || [], best = new Map();
      (cm || []).filter(x => x.devoir_id === d.id && x.student_id === e.id).forEach(x => { const v = x.total ? x.score / x.total : 0; if(!best.has(x.sequence_id) || v > best.get(x.sequence_id)) best.set(x.sequence_id, v); });
      c = best.size ? dvbPct(seqs.length ? seqs.reduce((s, q) => s + (best.get(q) || 0), 0) / seqs.length : 0, `${best.size}/${seqs.length} séquence${seqs.length > 1 ? 's' : ''}`) : null;
    } else if(d.type === 'compte_est_bon'){
      const n = (d.ceb_rounds || []).length || 1, ok = new Set(), vu = new Set();
      (ceb || []).filter(x => x.devoir_id === d.id && x.student_id === e.id).forEach(x => { vu.add(x.devoir_round ?? 0); if(x.gap === 0) ok.add(x.devoir_round ?? 0); });
      c = vu.size ? dvbPct(ok.size / n, `${ok.size}/${n} compte${n > 1 ? 's' : ''} exact${ok.size > 1 ? 's' : ''}`) : null;
    } else if(d.type === 'programmation'){
      const defis = d.prog_defis || [], l = (pp || []).filter(x => x.user_id === e.id && defis.includes(x.defi_id));
      c = l.length ? dvbPct(l.filter(x => x.reussi).length / (defis.length || 1), `${l.filter(x => x.reussi).length}/${defis.length} défi${defis.length > 1 ? 's' : ''} réussi${defis.length > 1 ? 's' : ''}`) : null;
    } else if(d.type === 'questionnaire'){
      const cp = (cps || []).find(x => x.devoir_id === d.id && x.student_id === e.id), sur = (reg && reg.note_sur) || 20;
      const rendue = cp && (cp.statut === 'rendue' || (cp.deadline_at && Date.now() > Date.parse(cp.deadline_at) + 120000));
      if(rendue && reg && reg.mode === 'entrainement') c = { txt: 'fait', cl: 'ok', fait: true };
      else if(rendue && cp.note != null) c = { txt: `${dvbNum(cp.note)}/${sur}`, cl: dvbCl(cp.note / sur), note20: 20 * cp.note / sur, fait: true };
      else if(rendue) c = { txt: 'à corriger', cl: 'moyen', fait: true };
      else c = cp ? { txt: 'en cours', cl: 'vide' } : null;
    } else {
      if(r && r.est_rendu) c = r.note != null ? { txt: `${dvbNum(r.note)}/20`, cl: dvbCl(r.note / 20), note20: +r.note, fait: true } : { txt: '✓ rendu', cl: 'ok', fait: true };
      else c = r && r.a_reprendre ? { txt: 'à reprendre', cl: 'moyen' } : null;
    }
    if(!c) c = { txt: '—', cl: 'vide', manque: true };
    if(!c.nc && d.date_limite){
      const rendu = d.type === 'questionnaire' ? null : r;
      if(rendu && rendu.est_rendu && rendu.submitted_at && rendu.submitted_at > d.date_limite.slice(0, 10) + 'T23:59:59') c.retard = true;
      if(c.manque && dvlFini(d)) c.retard = true;
    }
    cellules.set(d.id + '|' + e.id, c);
  }));
  return { classe, nom: cl ? cl.nom : '', niveau: cl ? cl.niveau : '', eleves, colonnes, cellules, periode: per.k, per,
    appr: new Map((appr || []).map(a => [a.student_id, a])) };
}
function dvbNum(n){ return (Math.round(n * 10) / 10).toString().replace('.', ','); }
function dvbCl(v){ return v >= .7 ? 'ok' : v >= .4 ? 'moyen' : 'ko'; }
function dvbPct(v, detail){ return { txt: Math.round(100 * v) + ' %', cl: dvbCl(v), pct: v, detail, fait: true }; }
// Synthèse d'un élève (ligne du tableau, et données de l'appréciation).
function dvbSynthese(e){
  const cs = dvb.colonnes.map(({ d }) => ({ d, c: dvb.cellules.get(d.id + '|' + e.id) })).filter(x => !x.c.nc);
  const pcts = cs.filter(x => x.c.pct != null).map(x => x.c.pct), notes = cs.filter(x => x.c.note20 != null).map(x => x.c.note20);
  return { n: cs.length, faits: cs.filter(x => x.c.fait).length, retards: cs.filter(x => x.c.retard).length,
    reussite: pcts.length ? pcts.reduce((a, b) => a + b, 0) / pcts.length : null, moyenne: notes.length ? notes.reduce((a, b) => a + b, 0) / notes.length : null, cs };
}
function dvbTypeIcone(d){ const t = (typeof DEVOIR_TYPES !== 'undefined' ? DEVOIR_TYPES : []).find(x => x.id === d.type); return d.type === 'questionnaire' ? 'quiz' : t ? t.icon : 'assignment'; }
function dvbRendre(){
  const o = document.getElementById('dvbOverlay'); if(!o || !dvb) return;
  const pers = dvbPeriodes(), cols = dvb.colonnes;
  const corps = dvb.eleves.map(e => {
    const s = dvbSynthese(e), a = dvb.appr.get(e.id);
    return `<tr><th>${escapeHtml(e.label)}</th>${cols.map(({ d }) => { const c = dvb.cellules.get(d.id + '|' + e.id);
        return `<td class="dvb-c ${c.cl}${c.retard ? ' retard' : ''}" title="${escapeHtml((c.detail || '') + (c.retard ? (c.detail ? ' · ' : '') + 'en retard' : ''))}">${c.txt}</td>`; }).join('')}
      <td class="dvb-s">${s.faits}/${s.n}</td><td class="dvb-s ${s.retards ? 'dvb-rouge' : ''}">${s.retards || ''}</td>
      <td class="dvb-s dvb-c ${s.reussite != null ? dvbCl(s.reussite) : 'vide'}">${s.reussite != null ? Math.round(100 * s.reussite) + ' %' : '—'}</td>
      <td class="dvb-s dvb-c ${s.moyenne != null ? dvbCl(s.moyenne / 20) : 'vide'}">${s.moyenne != null ? dvbNum(s.moyenne) : '—'}</td>
      <td class="dvb-appr"><textarea data-appr="${e.id}" rows="3" placeholder="Appréciation (à écrire, ou « Appréciations IA »)">${escapeHtml(a ? a.texte : '')}</textarea>${a && a.ia ? '<span class="dvb-ia" title="Proposée par l\'IA, à relire">IA</span>' : ''}</td></tr>`;
  }).join('');
  const moyCol = cols.map(({ d }) => { const l = dvb.eleves.map(e => dvb.cellules.get(d.id + '|' + e.id)).filter(c => !c.nc);
    const p = l.filter(c => c.pct != null).map(c => c.pct), n = l.filter(c => c.note20 != null).map(c => c.note20), f = l.filter(c => c.fait).length;
    return `<td class="dvb-c">${p.length ? Math.round(100 * p.reduce((a, b) => a + b, 0) / p.length) + ' %' : n.length ? dvbNum(n.reduce((a, b) => a + b, 0) / n.length) + '/20' : ''}<small>${f}/${l.length} faits</small></td>`; }).join('');
  o.innerHTML = `<div class="modal-card dvb">
    <div class="dvb-tete"><b class="cd-h"><span class="gicon">table_view</span> Bilan · ${escapeHtml(dvb.nom)}</b>
      <select id="dvbPer">${pers.map(p => `<option value="${p.k}"${p.k === dvb.periode ? ' selected' : ''}>${p.t}</option>`).join('')}</select>
      <span style="flex:1"></span>
      <button class="btn" style="background:#6B3FA0;" id="dvbIa"><span class="gicon">auto_awesome</span> Appréciations IA</button>
      <button class="btn secondary" id="dvbCsv"><span class="gicon">download</span> CSV</button>
      <button class="btn secondary" id="dvbImp"><span class="gicon">print</span> Imprimer</button>
      <button class="modal-close" onclick="document.getElementById('dvbOverlay').style.display='none'"><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 8px;">Devoirs et interrogations publiés du ${new Date(dvb.per.du).toLocaleDateString('fr-FR')} au ${new Date(dvb.per.au).toLocaleDateString('fr-FR')}, archivés compris. <span class="dvb-prive"><span class="gicon">lock</span> Les appréciations ne sont visibles que par vous.</span> <span id="dvbEtat"></span></p>
    ${cols.length ? `<div class="dvb-table"><table><thead><tr><th>Élève</th>${cols.map(({ d }) => `<th title="${escapeHtml(d.titre)}"><span class="gicon">${dvbTypeIcone(d)}</span><small>${new Date(d.date_depot).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</small><span class="dvb-tit">${escapeHtml(d.titre)}</span></th>`).join('')}
        <th>Faits</th><th>Retards</th><th>Réussite</th><th>Moy. /20</th><th class="dvb-appr-h">Appréciation <small>(vous seul)</small></th></tr></thead>
      <tbody>${corps || '<tr><td>Aucun élève.</td></tr>'}</tbody>
      <tfoot><tr><th>Classe</th>${moyCol}<td colspan="5"></td></tr></tfoot></table></div>
      <p class="hint dvb-leg"><span class="dvb-c ok">≥ 70 %</span> <span class="dvb-c moyen">40 à 70 %</span> <span class="dvb-c ko">&lt; 40 %</span> <span class="dvb-c vide">—</span> pas fait · <span class="dvb-c retard">encadré</span> en retard · Réussite : moyenne des automatismes, comptes et défis ; Moy. /20 : notes des interrogations et des devoirs notés.</p>`
      : '<p class="hint">Aucun devoir ni interrogation publié pour cette classe sur cette période.</p>'}</div>`;
  o.querySelector('#dvbPer').onchange = e => dvbOuvrir(dvb.classe, e.target.value);
  o.querySelectorAll('[data-appr]').forEach(t => t.onchange = () => dvbSauverAppr(t.dataset.appr, t.value, false));
  o.querySelector('#dvbIa').onclick = dvbAppreciationsIa;
  o.querySelector('#dvbCsv').onclick = dvbCsv;
  o.querySelector('#dvbImp').onclick = dvbImprimer;
}
async function dvbSauverAppr(eleve, texte, ia){
  const row = { teacher_id: currentUser.id, class_id: dvb.classe, student_id: eleve, periode: dvb.periode, texte, ia, updated_at: new Date().toISOString() };
  const { error } = await sb.from('bilan_appreciations').upsert(row, { onConflict: 'teacher_id,class_id,student_id,periode' });
  const et = document.getElementById('dvbEtat');
  if(error){ if(et) et.textContent = 'Appréciation non enregistrée : ' + error.message; return false; }
  dvb.appr.set(eleve, row);
  const t = document.querySelector(`[data-appr="${eleve}"]`); if(t && !ia){ const b = t.parentElement.querySelector('.dvb-ia'); if(b) b.remove(); }
  if(et) et.innerHTML = '<span style="color:#1F7A4D;">Enregistré.</span>';
  return true;
}
// Données d'un élève pour l'IA : anonymisées, seulement ce qui est dans le tableau.
function dvbDonneesIa(e, code){
  const s = dvbSynthese(e);
  const det = s.cs.map(({ d, c }) => `${d.type === 'questionnaire' ? 'Interrogation' : (typeof devoirTypeLabel === 'function' ? devoirTypeLabel(d.type) : d.type)} « ${d.titre} » : ${c.manque ? 'non fait' : c.txt.replace('✓ ', '')}${c.detail ? ' (' + c.detail + ')' : ''}${c.retard ? ', en retard' : ''}`).join(' ; ');
  return `${code} : ${s.faits}/${s.n} travaux faits${s.retards ? `, ${s.retards} en retard` : ''}${s.reussite != null ? `, réussite moyenne ${Math.round(100 * s.reussite)} %` : ''}${s.moyenne != null ? `, moyenne des notes ${dvbNum(s.moyenne)}/20` : ''}. Détail : ${det || 'aucun travail'}.`;
}
async function dvbAppreciationsIa(){
  if(!dvb || !dvb.colonnes.length) return;
  const deja = dvb.eleves.filter(e => (dvb.appr.get(e.id) || {}).texte);
  let cibles = dvb.eleves;
  if(deja.length){
    const ch = await niceModal({ message: `${deja.length} élève${deja.length > 1 ? 's ont' : ' a'} déjà une appréciation. Que faire ?`,
      buttons: [{ label: 'Annuler', value: null, secondary: true }, { label: 'Compléter les manquantes', value: 'manque', secondary: true }, { label: 'Tout régénérer', value: 'tout' }] });
    if(!ch) return; if(ch === 'manque') cibles = dvb.eleves.filter(e => !(dvb.appr.get(e.id) || {}).texte);
  }
  if(!cibles.length) return;
  const et = document.getElementById('dvbEtat'), btn = document.getElementById('dvbIa'); if(btn) btn.disabled = true;
  const moyClasse = (() => { const r = dvb.eleves.map(e => dvbSynthese(e).reussite).filter(v => v != null); return r.length ? Math.round(100 * r.reduce((a, b) => a + b, 0) / r.length) : null; })();
  let faits = 0, erreur = null;
  for(let i = 0; i < cibles.length; i += 8){
    const lot = cibles.slice(i, i + 8), codes = lot.map((e, j) => 'E' + (i + j + 1));
    if(et) et.textContent = `Rédaction des appréciations… ${i}/${cibles.length}`;
    const prompt = `Tu es professeur de mathématiques (classe ${dvb.niveau || ''}, ${dvb.per.t}). Rédige pour chaque élève une appréciation de fin de période pour le bulletin, à partir UNIQUEMENT des résultats ci-dessous (devoirs en ligne et interrogations).
Règles : 2 ou 3 phrases, 45 mots au plus ; à la 3e personne, sans prénom (« Élève… », « Travail… », « Il faut… ») ; ton bienveillant, précis et professionnel ; d'abord ce qui va bien, puis ce qui est à travailler (régularité, retards, notions en difficulté d'après les titres), puis un conseil concret. N'invente rien qui ne soit pas dans les données. Si presque rien n'est fait, dis-le avec tact.
${moyClasse != null ? `Réussite moyenne de la classe : ${moyClasse} %.` : ''}
${lot.map((e, j) => dvbDonneesIa(e, codes[j])).join('\n')}
Réponds uniquement par un objet JSON {"E1": "appréciation", …} avec les codes ci-dessus.`;
    try{
      const txt = await callClaude(prompt, 1800, { feature: 'appreciations', niveau: dvb.niveau || null });
      const m = txt.match(/\{[\s\S]*\}/); const js = m ? JSON.parse(m[0]) : {};
      for(let j = 0; j < lot.length; j++){ const a = js[codes[j]]; if(typeof a === 'string' && a.trim()){ await dvbSauverAppr(lot[j].id, a.trim(), true); faits++; } }
    }catch(e){ erreur = e.message || String(e); break; }
  }
  if(btn) btn.disabled = false;
  dvbRendre();
  const et2 = document.getElementById('dvbEtat');
  if(et2) et2.innerHTML = erreur ? `<span class="dvb-rouge">IA : ${escapeHtml(erreur === 'no-session' ? 'reconnectez-vous' : erreur)}</span>${faits ? ` (${faits} appréciation${faits > 1 ? 's' : ''} rédigée${faits > 1 ? 's' : ''})` : ''}`
    : `<span style="color:#1F7A4D;">${faits} appréciation${faits > 1 ? 's' : ''} rédigée${faits > 1 ? 's' : ''} par l'IA : relisez-les et modifiez-les si besoin.</span>`;
}
function dvbLignesExport(){
  const cols = dvb.colonnes;
  const tete = ['Élève', ...cols.map(({ d }) => d.titre), 'Faits', 'Retards', 'Réussite', 'Moyenne /20', 'Appréciation'];
  const lignes = dvb.eleves.map(e => { const s = dvbSynthese(e);
    return [e.label, ...cols.map(({ d }) => { const c = dvb.cellules.get(d.id + '|' + e.id); return c.nc ? '' : c.txt.replace('✓ ', '') + (c.retard ? ' (retard)' : ''); }),
      `${s.faits}/${s.n}`, s.retards || '', s.reussite != null ? Math.round(100 * s.reussite) + ' %' : '', s.moyenne != null ? dvbNum(s.moyenne) : '', (dvb.appr.get(e.id) || {}).texte || '']; });
  return [tete, ...lignes];
}
function dvbCsv(){
  const csv = '﻿' + dvbLignesExport().map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `bilan-${(dvb.nom || 'classe').replace(/[^a-z0-9]+/gi, '-')}-${dvb.periode}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function dvbImprimer(){
  const w = window.open('', '_blank'); if(!w){ niceAlert('Autorisez les fenêtres pour imprimer.'); return; }
  const [tete, ...lignes] = dvbLignesExport();
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Bilan ${escapeHtml(dvb.nom)}</title><style>
    @page{size:A4 landscape;margin:10mm;} body{font-family:Inter,Arial,sans-serif;font-size:9pt;color:#1C2B39;} h1{font-size:14pt;margin:0 0 4px;}
    table{border-collapse:collapse;width:100%;} th,td{border:1px solid #CBD2DC;padding:3px 5px;text-align:center;vertical-align:top;} td:first-child,th:first-child{text-align:left;font-weight:700;}
    td:last-child{text-align:left;min-width:220px;} thead th{background:#F3F5F8;font-size:8pt;}</style></head><body>
    <h1>Bilan · ${escapeHtml(dvb.nom)} · ${escapeHtml(dvb.per.t)}</h1><p style="margin:0 0 8px;color:#5B6472;">Document réservé à l'enseignant.</p>
    <table><thead><tr>${tete.map(h => `<th>${escapeHtml(String(h))}</th>`).join('')}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(v => `<td>${escapeHtml(String(v))}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <script>setTimeout(()=>print(),300)<\/script></body></html>`);
  w.document.close();
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .devoir-zone-create.replie > :not(.devoir-zone-title){display:none !important;}
    .devoir-zone-create.replie .devoir-zone-title{margin-bottom:0 !important;}
    .devoir-zone-create .devoir-zone-title::after{content:'▾';margin-left:8px;color:var(--ink-soft);} .devoir-zone-create.replie .devoir-zone-title::after{content:'▸';}
    .dvb{max-width:1400px;width:97vw;max-height:92vh;overflow:auto;}
    .dvb-tete{display:flex;gap:10px;align-items:center;flex-wrap:wrap;position:sticky;top:-16px;background:#fff;z-index:3;padding:4px 0;}
    .dvb-prive{color:#6B3FA0;font-weight:600;} .dvb-prive .gicon{font-size:15px;vertical-align:middle;}
    .dvb-table{overflow:auto;} .dvb-table table{border-collapse:collapse;font-size:.82rem;}
    .dvb-table th, .dvb-table td{border:1px solid #DCE2EA;padding:4px 6px;text-align:center;}
    .dvb-table tbody th{text-align:left;white-space:nowrap;position:sticky;left:0;background:#fff;z-index:1;}
    .dvb-table thead th{background:#F3F5F8;vertical-align:bottom;font-weight:600;min-width:62px;max-width:110px;}
    .dvb-table thead th .gicon{display:block;font-size:17px;color:#5B6472;} .dvb-table thead th small{display:block;color:#5B6472;font-weight:500;}
    .dvb-tit{display:block;font-size:.72rem;line-height:1.15;max-height:2.4em;overflow:hidden;}
    .dvb-table tfoot th, .dvb-table tfoot td{background:#F3F5F8;font-weight:700;} .dvb-table tfoot small{display:block;font-weight:500;color:#5B6472;}
    .dvb-c.ok{background:#E3F4EA;color:#1F7A4D;font-weight:700;} .dvb-c.moyen{background:#FDF1DF;color:#A0620F;font-weight:700;} .dvb-c.ko{background:#FBE7EE;color:#9E1F5E;font-weight:700;}
    .dvb-c.vide{color:#9AA3AF;} .dvb-c.nc{background:repeating-linear-gradient(45deg,#fff,#fff 4px,#F3F5F8 4px,#F3F5F8 8px);}
    .dvb-c.retard{box-shadow:inset 0 0 0 2px #C0392B;}
    .dvb-s{font-weight:700;white-space:nowrap;} .dvb-rouge{color:#C0392B;font-weight:700;}
    .dvb-appr{min-width:300px;position:relative;text-align:left !important;} .dvb-appr textarea{width:100%;min-height:58px;border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:5px 8px;font:inherit;font-size:.8rem;resize:vertical;box-sizing:border-box;}
    .dvb-appr-h{min-width:300px;} .dvb-ia{position:absolute;top:6px;right:10px;background:#6B3FA0;color:#fff;border-radius:6px;font-size:.62rem;font-weight:800;padding:0 5px;}
    .dvb-leg .dvb-c{display:inline-block;padding:0 6px;border-radius:5px;}
  `;
  document.head.appendChild(st);
})();

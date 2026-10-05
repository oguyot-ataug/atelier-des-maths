/* =====================================================================
   bilan.js -- Bilan d'une classe sur une période, en tableau, avec appréciations par l'IA.

   Demandé : « Bilan : contient l'ensemble des résultats d'une période (date à date), autonomie +
   devoirs en ligne + import d'interro papier, et colonne appréciations IA. Attention, les noms et
   prénoms ne doivent jamais être donnés à l'IA. Préciser bilan en 250 caractères maximum tenant
   compte de l'évolution des résultats. » et « dans l'outil devoirs, n'afficher que les bilans sans
   appréciations IA ».

   Deux modes :
   - « complet » (Mes classes › Bilan) : travail en autonomie (automatismes et Objectif Nombre faits
     hors devoir), devoirs en ligne, interrogations en ligne, interrogations sur papier (notes_papier),
     puis faits / retards / réussite / moyenne /20 / évolution, et l'appréciation.
   - « devoirs » (page Devoirs en ligne › Bilan de la classe) : les devoirs seulement, sans IA.

   Période : 1er, 2e, 3e trimestre ou année, dates modifiables (mémorisées sur l'appareil, par
   période), ou dates libres. Évolution : résultats de la période dans l'ordre des dates (première
   moitié comparée à la seconde : en progrès, stable, en baisse).
   Appréciations : table bilan_appreciations (le professeur seulement). L'IA ne reçoit que des codes
   (E1, E2…) et des résultats ; tout nom ou prénom d'élève présent dans un titre est effacé avant
   l'envoi. 250 caractères au plus.
   ===================================================================== */

let blx = null;
const BL_MAX = 250;

/* ---------- Périodes ---------- */
function blDates(){ try{ return JSON.parse(localStorage.getItem('blDates') || '{}'); }catch(e){ return {}; } }
function blPeriodes(){
  const n = new Date(), a = n.getMonth() >= 7 ? n.getFullYear() : n.getFullYear() - 1, an = `${a}-${a + 1}`, o = blDates();
  return [
    { k: `T1-${an}`, t: '1er trimestre', du: `${a}-09-01`, au: `${a}-11-30` },
    { k: `T2-${an}`, t: '2e trimestre', du: `${a}-12-01`, au: `${a + 1}-02-28` },
    { k: `T3-${an}`, t: '3e trimestre', du: `${a + 1}-03-01`, au: `${a + 1}-07-10` },
    { k: `A-${an}`, t: `Année ${an}`, du: `${a}-09-01`, au: `${a + 1}-07-10` },
  ].map(p => Object.assign(p, o[p.k] || {}));
}
function blPeriodeCourante(){ const j = new Date().toISOString().slice(0, 10), p = blPeriodes(); return p.slice(0, 3).find(x => j >= x.du && j <= x.au) || p[0]; }

/* ---------- Ouverture ---------- */
// o : { classe, mode: 'complet' | 'devoirs', cible: élément (sinon fenêtre), periode: { k, t, du, au } }
async function blOuvrir(o){
  let cible = o.cible;
  if(!cible){
    let ov = document.getElementById('blOverlay');
    if(!ov){ ov = document.createElement('div'); ov.id = 'blOverlay'; ov.className = 'modal-overlay'; ov.style.zIndex = '420'; document.body.appendChild(ov); }
    ov.onclick = e => { if(e.target === ov) ov.style.display = 'none'; };
    ov.innerHTML = '<div class="modal-card bl-fen"><div id="blFen"></div></div>'; ov.style.display = 'flex';
    cible = document.getElementById('blFen');
  }
  if(!o.classe){ cible.innerHTML = '<p class="hint">Choisissez d\'abord une classe active.</p>'; return; }
  const per = o.periode || (blx && blx.classe === o.classe && blx.mode === o.mode ? blx.per : null) || blPeriodeCourante();
  cible.innerHTML = '<p class="hint">Préparation du bilan…</p>';
  try{ blx = await blCharger(o.classe, per, o.mode || 'complet'); }catch(e){ cible.innerHTML = `<p class="hint">Erreur : ${escapeHtml(e.message || String(e))}</p>`; return; }
  blx.cible = cible; blx.fenetre = !o.cible;
  blRendre();
}

/* ---------- Données ---------- */
const blNum = n => (Math.round(n * 10) / 10).toString().replace('.', ',');
const blCl = v => v >= .7 ? 'ok' : v >= .4 ? 'moyen' : 'ko';
const blPct = (v, detail) => ({ txt: Math.round(100 * v) + ' %', cl: blCl(v), v, detail, fait: true });
const blNote = (n, sur, detail) => ({ txt: `${blNum(n)}/${blNum(sur)}`, cl: blCl(n / sur), v: n / sur, note20: 20 * n / sur, detail, fait: true });
function blTypeIcone(d){ const t = (typeof DEVOIR_TYPES !== 'undefined' ? DEVOIR_TYPES : []).find(x => x.id === d.type); return d.type === 'questionnaire' ? 'quiz' : t ? t.icon : 'assignment'; }

async function blCharger(classe, per, mode){
  const fin = per.au + 'T23:59:59', complet = mode === 'complet', vide = Promise.resolve({ data: [] });
  const [eleves, { data: dv }, { data: cl }] = await Promise.all([
    qzElevesDevoir({ class_id: classe }).then(elevesReels), // sans les élèves tests du simulateur
    sb.from('devoirs').select('*').eq('teacher_id', currentUser.id).eq('class_id', classe).not('date_depot', 'is', null).order('date_depot', { ascending: true }),
    sb.from('classes').select('nom,niveau').eq('id', classe).maybeSingle(),
  ]);
  const devoirs = (dv || []).filter(d => { const t = String(d.date_depot).slice(0, 10); return t >= per.du && t <= per.au && new Date(d.date_depot) <= new Date() && (complet || d.type !== 'questionnaire'); });
  const ids = devoirs.map(d => d.id), sid = eleves.map(e => e.id);
  const de = t => devoirs.filter(d => d.type === t).map(d => d.id);
  const prIds = [...new Set(devoirs.filter(d => d.type === 'programmation').flatMap(d => d.prog_defis || []))];
  const qIds = [...new Set(devoirs.filter(d => d.type === 'questionnaire').map(d => d.questionnaire_id).filter(Boolean))];
  const [{ data: rendus }, { data: cm }, { data: ceb }, { data: pp }, { data: cps }, { data: qzs }, { data: cmA }, { data: cebA }, { data: pap }, { data: appr }] = await Promise.all([
    ids.length ? sb.from('devoirs_rendus').select('devoir_id,student_id,est_rendu,a_reprendre,note,submitted_at').in('devoir_id', ids) : vide,
    de('automatismes').length ? sb.from('cm_results').select('devoir_id,student_id,sequence_id,score,total,created_at').in('devoir_id', de('automatismes')) : vide,
    de('compte_est_bon').length ? sb.from('ceb_results').select('devoir_id,student_id,devoir_round,gap,created_at').in('devoir_id', de('compte_est_bon')) : vide,
    prIds.length && sid.length ? sb.from('prog_progress').select('user_id,defi_id,reussi,reussi_at').in('user_id', sid).in('defi_id', prIds) : vide,
    de('questionnaire').length ? sb.from('qz_copies').select('devoir_id,student_id,statut,deadline_at,note,total,submitted_at' + (complet ? ',reponses,correction' : '')).in('devoir_id', de('questionnaire')) : vide,
    qIds.length ? sb.from('questionnaires').select(complet ? 'id,reglages,questions' : 'id,reglages').in('id', qIds) : vide,
    complet ? sb.from('cm_results').select('student_id,sequence_id,sequence_label,score,total,created_at').eq('class_id', classe).is('devoir_id', null).gte('created_at', per.du).lte('created_at', fin) : vide,
    complet ? sb.from('ceb_results').select('student_id,success,gap,created_at').eq('class_id', classe).is('devoir_id', null).gte('created_at', per.du).lte('created_at', fin) : vide,
    complet ? sb.from('notes_papier').select('*').eq('teacher_id', currentUser.id).eq('class_id', classe).gte('date_eval', per.du).lte('date_eval', per.au).order('date_eval', { ascending: true }) : vide,
    complet ? sb.from('bilan_appreciations').select('student_id,texte,ia,updated_at').eq('teacher_id', currentUser.id).eq('class_id', classe).eq('periode', per.k) : vide,
  ]);
  const R = new Map((rendus || []).map(r => [r.devoir_id + '|' + r.student_id, r]));
  const qst = new Map((qzs || []).map(q => [q.id, q.questions || []]));
  const reg = new Map((qzs || []).map(q => [q.id, Object.assign({}, typeof QZ_REGLAGES_DEFAUT !== 'undefined' ? QZ_REGLAGES_DEFAUT : {}, q.reglages || {})]));
  const colonnes = [], cellules = new Map(), points = new Map(eleves.map(e => [e.id, []])); // points : évolution
  const pt = (e, date, v, quoi) => { if(v != null && points.has(e)) points.get(e).push({ date: String(date || '').slice(0, 10), v, quoi }); };

  // Travail en autonomie (complet) : deux colonnes en tête.
  if(complet){
    colonnes.push({ id: 'auto-cm', titre: 'Automatismes en autonomie', court: 'Automatismes', icon: 'bolt', groupe: 'auto' });
    colonnes.push({ id: 'auto-ceb', titre: 'Objectif Nombre en autonomie', court: 'Objectif Nombre', icon: 'casino', groupe: 'auto' });
    eleves.forEach(e => {
      const l = (cmA || []).filter(r => r.student_id === e.id && r.total);
      l.forEach(r => pt(e.id, r.created_at, r.score / r.total, 'automatismes'));
      cellules.set('auto-cm|' + e.id, l.length ? Object.assign(blPct(l.reduce((s, r) => s + r.score / r.total, 0) / l.length, `${l.length} séance${l.length > 1 ? 's' : ''}, ${new Set(l.map(r => r.sequence_id)).size} séquence${new Set(l.map(r => r.sequence_id)).size > 1 ? 's' : ''} différente${new Set(l.map(r => r.sequence_id)).size > 1 ? 's' : ''}`), { txt: `${Math.round(100 * l.reduce((s, r) => s + r.score / r.total, 0) / l.length)} %<small>${l.length} séance${l.length > 1 ? 's' : ''}</small>`, n: l.length, auto: true })
        : { txt: '—', cl: 'vide', auto: true, n: 0 });
      const c = (cebA || []).filter(r => r.student_id === e.id), ok = c.filter(r => r.success || r.gap === 0).length;
      cellules.set('auto-ceb|' + e.id, c.length ? Object.assign(blPct(ok / c.length, `${c.length} partie${c.length > 1 ? 's' : ''}, ${ok} réussie${ok > 1 ? 's' : ''}`), { txt: `${Math.round(100 * ok / c.length)} %<small>${c.length} partie${c.length > 1 ? 's' : ''}</small>`, n: c.length, auto: true })
        : { txt: '—', cl: 'vide', auto: true, n: 0 });
    });
  }
  // Devoirs et interrogations en ligne.
  devoirs.forEach(d => {
    const rg = d.type === 'questionnaire' ? reg.get(d.questionnaire_id) || {} : null;
    if(rg && rg.mode === 'sondage') return;
    const col = { id: d.id, d, titre: d.titre, icon: blTypeIcone(d), date: d.date_depot, groupe: d.type === 'questionnaire' ? 'interro' : 'devoir', coef: +d.coef || 1, table: 'devoirs', rid: d.id };
    colonnes.push(col);
    eleves.forEach(e => {
      const r = R.get(d.id + '|' + e.id), cible = !d.student_ids || !d.student_ids.length || d.student_ids.includes(e.id);
      let c = null;
      if(!cible) c = { txt: '', cl: 'nc', nc: true };
      else if(d.type === 'automatismes'){
        const seqs = d.automatismes_sequences || [], best = new Map();
        (cm || []).filter(x => x.devoir_id === d.id && x.student_id === e.id).forEach(x => { const v = x.total ? x.score / x.total : 0; if(!best.has(x.sequence_id) || v > best.get(x.sequence_id)) best.set(x.sequence_id, v); });
        if(best.size) c = blPct(seqs.length ? seqs.reduce((s, q) => s + (best.get(q) || 0), 0) / seqs.length : 0, `${best.size}/${seqs.length} séquence${seqs.length > 1 ? 's' : ''}`);
      } else if(d.type === 'compte_est_bon'){
        const n = (d.ceb_rounds || []).length || 1, ok = new Set(), vu = new Set();
        (ceb || []).filter(x => x.devoir_id === d.id && x.student_id === e.id).forEach(x => { vu.add(x.devoir_round ?? 0); if(x.gap === 0) ok.add(x.devoir_round ?? 0); });
        if(vu.size) c = blPct(ok.size / n, `${ok.size}/${n} compte${n > 1 ? 's' : ''} exact${ok.size > 1 ? 's' : ''}`);
      } else if(d.type === 'programmation'){
        const defis = d.prog_defis || [], l = (pp || []).filter(x => x.user_id === e.id && defis.includes(x.defi_id));
        if(l.length) c = blPct(l.filter(x => x.reussi).length / (defis.length || 1), `${l.filter(x => x.reussi).length}/${defis.length} défi${defis.length > 1 ? 's' : ''} réussi${defis.length > 1 ? 's' : ''}`);
      } else if(d.type === 'questionnaire'){
        const cp = (cps || []).find(x => x.devoir_id === d.id && x.student_id === e.id), sur = rg.note_sur || 20;
        const rendue = cp && (cp.statut === 'rendue' || (cp.deadline_at && Date.now() > Date.parse(cp.deadline_at) + 120000));
        if(rendue && rg.mode === 'entrainement') c = { txt: 'fait', cl: 'ok', fait: true };
        else if(rendue && cp.note != null) c = blNote(+cp.note, sur);
        else if(rendue) c = { txt: 'à corriger', cl: 'moyen', fait: true };
        else if(cp) c = { txt: 'en cours', cl: 'vide' };
        if(complet && rendue && rg.mode !== 'entrainement' && c) c.notions = blNotions(qst.get(d.questionnaire_id), cp, rg);
      } else {
        if(r && r.est_rendu) c = r.note != null ? blNote(+r.note, 20) : { txt: '✓ rendu', cl: 'ok', fait: true };
        else if(r && r.a_reprendre) c = { txt: 'à reprendre', cl: 'moyen' };
      }
      if(!c) c = { txt: '—', cl: 'vide', manque: true };
      if(!c.nc && d.date_limite && d.type !== 'questionnaire'){
        const lim = d.date_limite.slice(0, 10) + 'T23:59:59';
        if(r && r.est_rendu && r.submitted_at && r.submitted_at > lim) c.retard = true;
        if(c.manque && new Date(lim) < new Date()) c.retard = true;
      }
      if(c.v != null) pt(e.id, d.date_depot, c.v, d.titre);
      cellules.set(d.id + '|' + e.id, c);
    });
  });
  // Interrogations sur papier.
  (pap || []).forEach(np => {
    // Notes saisies : sur papier, en ligne avec un autre outil (Google Forms…) ou autre (oral, soin…).
    const sup = np.support || 'papier';
    colonnes.push({ id: 'pap-' + np.id, np, titre: np.titre, icon: sup === 'en_ligne' ? 'language' : sup === 'autre' ? 'star' : 'edit_document', date: np.date_eval, groupe: sup === 'en_ligne' ? 'interro' : sup === 'autre' ? 'autre' : 'papier', themes: np.themes, coef: +np.coef || 1, table: 'notes_papier', rid: np.id });
    eleves.forEach(e => {
      const v = (np.notes || {})[e.id];
      const c = v === 'abs' ? { txt: 'abs', cl: 'vide', abs: true } : v == null || v === '' ? { txt: '—', cl: 'vide', manque: true } : blNote(+v, +np.sur || 20, np.themes ? 'Thèmes : ' + np.themes : '');
      if(c.v != null) pt(e.id, np.date_eval, c.v, np.titre);
      cellules.set('pap-' + np.id + '|' + e.id, c);
    });
  });
  // Colonnes regroupées (en-têtes de groupe d'un seul tenant), puis dans l'ordre des dates.
  const ordre = ['auto', 'devoir', 'interro', 'papier', 'autre'];
  colonnes.sort((a, b) => ordre.indexOf(a.groupe) - ordre.indexOf(b.groupe) || String(a.date || '').localeCompare(String(b.date || '')));
  return { classe, mode, per, nom: cl ? cl.nom : '', niveau: cl ? cl.niveau : '', eleves, colonnes, cellules, points, papier: pap || [],
    appr: new Map((appr || []).map(a => [a.student_id, a])) };
}
// Contenu d'une interrogation en ligne réussi / raté par l'élève (compétence de la question, sinon début de l'énoncé).
function blNotions(questions, cp, rg){
  if(!questions || !questions.length || typeof qzPoints !== 'function') return null;
  const brut = t => String(t || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  const ok = new Map(), ko = new Map();
  questions.forEach(q => {
    const max = typeof qzMax === 'function' ? qzMax(q) : 0; if(!max) return;
    const p = qzPoints(q, cp, rg); if(p === null) return;
    let l = brut(q.competence) || brut(q.enonce); if(!l) return;
    if(l.length > 70) l = l.slice(0, 68).replace(/\s+\S*$/, '') + '…';
    const m = p >= .7 * max ? ok : p < .5 * max ? ko : null; if(m) m.set(l, 1);
  });
  return ok.size || ko.size ? { ok: [...ok.keys()].slice(0, 6), ko: [...ko.keys()].slice(0, 6) } : null;
}
// Synthèse d'un élève : faits, retards, réussite (pourcentages), moyenne des notes, évolution.
function blSynthese(e){
  const cs = blx.colonnes.map(col => ({ col, c: blx.cellules.get(col.id + '|' + e.id) })).filter(x => x.c && !x.c.nc);
  const travaux = cs.filter(x => !x.c.auto && !x.c.abs);
  // Moyenne /20 pondérée par les coefficients des évaluations.
  const pcts = cs.filter(x => x.c.v != null && x.c.note20 == null).map(x => x.c.v), notes = cs.filter(x => x.c.note20 != null);
  const sCoef = notes.reduce((a, x) => a + (x.col.coef || 1), 0);
  const p = (blx.points.get(e.id) || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  let evo = null;
  if(p.length >= 4){ const m = Math.floor(p.length / 2), moy = l => l.reduce((s, x) => s + x.v, 0) / l.length, d = moy(p.slice(p.length - m)) - moy(p.slice(0, m));
    evo = { d, t: d >= .08 ? 'en progrès' : d <= -.08 ? 'en baisse' : 'stable', debut: moy(p.slice(0, m)), fin: moy(p.slice(p.length - m)) }; }
  return { n: travaux.length, faits: travaux.filter(x => x.c.fait).length, retards: cs.filter(x => x.c.retard).length,
    reussite: pcts.length ? pcts.reduce((a, b) => a + b, 0) / pcts.length : null, moyenne: sCoef ? notes.reduce((a, x) => a + x.c.note20 * (x.col.coef || 1), 0) / sCoef : null, evo, cs, p };
}

/* ---------- Affichage ---------- */
function blRendre(){
  const B = blx; if(!B || !B.cible) return;
  const complet = B.mode === 'complet', cols = B.colonnes, pers = blPeriodes();
  const perso = !pers.some(p => p.k === B.per.k);
  const evoTxt = s => !s.evo ? '' : s.evo.t === 'en progrès' ? '<span class="bl-evo up" title="En progrès sur la période">↗</span>' : s.evo.t === 'en baisse' ? '<span class="bl-evo down" title="En baisse sur la période">↘</span>' : '<span class="bl-evo" title="Stable sur la période">→</span>';
  const corps = B.eleves.map(e => {
    const s = blSynthese(e), a = B.appr.get(e.id);
    return `<tr><th>${escapeHtml(e.label)}</th>${cols.map(col => { const c = B.cellules.get(col.id + '|' + e.id);
        return `<td class="bl-c ${c.cl}${c.retard ? ' retard' : ''}${col.groupe === 'auto' ? ' bl-auto' : ''}" title="${escapeHtml((c.detail || '') + (c.retard ? (c.detail ? ' · ' : '') + 'en retard' : ''))}">${c.txt}</td>`; }).join('')}
      <td class="bl-s">${s.faits}/${s.n}</td><td class="bl-s ${s.retards ? 'bl-rouge' : ''}">${s.retards || ''}</td>
      <td class="bl-s bl-c ${s.reussite != null ? blCl(s.reussite) : 'vide'}">${s.reussite != null ? Math.round(100 * s.reussite) + ' %' : '—'}</td>
      <td class="bl-s bl-c ${s.moyenne != null ? blCl(s.moyenne / 20) : 'vide'}">${s.moyenne != null ? blNum(s.moyenne) : '—'}</td>
      ${complet ? `<td class="bl-s">${evoTxt(s)}</td>
      <td class="bl-appr"><textarea data-appr="${e.id}" rows="3" maxlength="${BL_MAX}" placeholder="Appréciation (${BL_MAX} caractères au plus)">${escapeHtml(a ? a.texte : '')}</textarea><span class="bl-cpt">${(a ? a.texte : '').length}/${BL_MAX}</span>${a && a.ia ? '<span class="bl-ia" title="Proposée par l\'IA, à relire">IA</span>' : ''}</td>` : ''}</tr>`;
  }).join('');
  const moyCol = cols.map(col => { const l = B.eleves.map(e => B.cellules.get(col.id + '|' + e.id)).filter(c => c && !c.nc);
    const v = l.filter(c => c.v != null).map(c => c.v), f = l.filter(c => c.fait).length;
    return `<td class="bl-c">${v.length ? (l.some(c => c.note20 != null) ? blNum(20 * v.reduce((a, b) => a + b, 0) / v.length) + '/20' : Math.round(100 * v.reduce((a, b) => a + b, 0) / v.length) + ' %') : ''}<small>${col.groupe === 'auto' ? (n => n + ' élève' + (n > 1 ? 's' : ''))(l.filter(c => c.n).length) : f + '/' + l.length + ' faits'}</small></td>`; }).join('');
  const groupes = complet ? [['auto', 'En autonomie'], ['devoir', 'Devoirs en ligne'], ['interro', 'Interrogations en ligne'], ['papier', 'Interrogations sur papier'], ['autre', 'Autres notes']].map(([g, t]) => [g, t, cols.filter(c => c.groupe === g).length]).filter(x => x[2]) : [];
  B.cible.innerHTML = `<div class="bl">
    <div class="bl-tete"><b class="cd-h"><span class="gicon">table_view</span> Bilan${complet ? '' : ' des devoirs'} · ${escapeHtml(B.nom)}</b>
      <select id="blPer">${pers.map(p => `<option value="${p.k}"${p.k === B.per.k ? ' selected' : ''}>${p.t}</option>`).join('')}<option value="perso"${perso ? ' selected' : ''}>Dates choisies</option></select>
      <label class="hint" style="margin:0;">du <input type="date" id="blDu" value="${B.per.du}"></label><label class="hint" style="margin:0;">au <input type="date" id="blAu" value="${B.per.au}"></label>
      <span style="flex:1"></span>
      ${complet ? '<button class="btn" style="background:#6B3FA0;" id="blIa"><span class="gicon">auto_awesome</span> Appréciations IA</button>' : ''}
      <button class="btn secondary" id="blCsv"><span class="gicon">download</span> CSV</button>
      <button class="btn secondary" id="blImp"><span class="gicon">print</span> Imprimer</button>
      ${B.fenetre ? '<button class="modal-close" onclick="document.getElementById(\'blOverlay\').style.display=\'none\'"><span class="gicon">close</span></button>' : ''}</div>
    <p class="hint" style="margin:4px 0 8px;">${complet ? 'Travail en autonomie, devoirs, interrogations (en ligne et sur papier) et autres notes' : 'Devoirs publiés'} du ${new Date(B.per.du).toLocaleDateString('fr-FR')} au ${new Date(B.per.au).toLocaleDateString('fr-FR')}, archivés compris.${perso ? '' : ' Les dates de chaque période sont modifiables et mémorisées sur cet appareil.'}
      ${complet ? '<span class="bl-prive"><span class="gicon">lock</span> Les appréciations ne sont visibles que par vous ; l\'IA ne reçoit jamais les noms ni les prénoms.</span>' : 'Le bilan complet, avec les interrogations et les appréciations, est dans Mes classes › Bilan.'} <span id="blEtat"></span></p>
    ${cols.length ? `<div class="bl-table"><table><thead>${groupes.length > 1 ? `<tr class="bl-grp"><th></th>${groupes.map(([g, t, n]) => `<th colspan="${n}" class="g-${g}">${t}</th>`).join('')}<th colspan="${complet ? 6 : 4}"></th></tr>` : ''}
        <tr><th>Élève</th>${cols.map(col => `<th title="${escapeHtml(col.titre + (col.themes ? ' · ' + col.themes : ''))}"><span class="gicon">${col.icon}</span>${col.date ? `<small>${new Date(col.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</small>` : ''}<span class="bl-tit">${escapeHtml(col.court || col.titre)}</span>${blNotee(col) ? `<button type="button" class="bl-coef" data-coef="${col.id}" title="Coefficient de cette évaluation dans la moyenne">coef ${blNum(col.coef)}</button>` : ''}</th>`).join('')}
        <th>Faits</th><th>Retards</th><th>Réussite</th><th>Moy. /20</th>${complet ? '<th>Évol.</th><th class="bl-appr-h">Appréciation <small>(vous seul, ' + BL_MAX + ' car.)</small></th>' : ''}</tr></thead>
      <tbody>${corps || '<tr><td>Aucun élève.</td></tr>'}</tbody>
      <tfoot><tr><th>Classe</th>${moyCol}<td colspan="${complet ? 6 : 4}"></td></tr></tfoot></table></div>
      <p class="hint bl-leg"><span class="bl-c ok">≥ 70 %</span> <span class="bl-c moyen">40 à 70 %</span> <span class="bl-c ko">&lt; 40 %</span> <span class="bl-c vide">—</span> pas fait · <span class="bl-c retard">encadré</span> en retard · Réussite : moyenne des pourcentages ; Moy. /20 : notes des interrogations et des devoirs notés, pondérées par leur coefficient (cliquez sur « coef » pour le changer)${complet ? ' ; Évol. : résultats de la fin de la période comparés au début' : ''}.</p>`
      : `<p class="hint">Rien sur cette période pour cette classe.</p>`}</div>`;
  const q = sel => B.cible.querySelector(sel);
  const per = () => { const k = q('#blPer').value, du = q('#blDu').value, au = q('#blAu').value; if(!du || !au || du > au) return null;
    if(k === 'perso') return { k: `P-${du}_${au}`, t: 'Dates choisies', du, au };
    const p = blPeriodes().find(x => x.k === k); return Object.assign({}, p, { du, au }); };
  q('#blPer').onchange = () => { const k = q('#blPer').value, p = blPeriodes().find(x => x.k === k);
    if(p){ blOuvrir({ classe: B.classe, mode: B.mode, cible: B.fenetre ? null : B.cible, periode: p }); } };
  const majDates = () => { const p = per(); if(!p) return;
    if(!p.k.startsWith('P-')){ const o = blDates(); o[p.k] = { du: p.du, au: p.au }; try{ localStorage.setItem('blDates', JSON.stringify(o)); }catch(e){} }
    blOuvrir({ classe: B.classe, mode: B.mode, cible: B.fenetre ? null : B.cible, periode: p }); };
  q('#blDu').onchange = majDates; q('#blAu').onchange = majDates;
  // Chaque tableau garde son état (un bilan ouvert depuis la page Devoirs ne change pas celui de Mes classes).
  B.cible.querySelectorAll('[data-appr]').forEach(t => {
    t.oninput = () => { const c = t.parentElement.querySelector('.bl-cpt'); if(c) c.textContent = t.value.length + '/' + BL_MAX; };
    t.onchange = () => { blx = B; blSauverAppr(t.dataset.appr, t.value, false); }; });
  B.cible.querySelectorAll('[data-coef]').forEach(b => b.onclick = () => { blx = B; blCoef(b.dataset.coef); });
  if(q('#blIa')) q('#blIa').onclick = () => { blx = B; blAppreciationsIa(); };
  q('#blCsv').onclick = () => { blx = B; blCsv(); }; q('#blImp').onclick = () => { blx = B; blImprimer(); };
}
// Colonne notée : une interrogation, une interrogation papier ou un devoir où au moins une note a été mise.
function blNotee(col){ return !!col.table && (col.groupe !== 'devoir' || blx.eleves.some(e => (blx.cellules.get(col.id + '|' + e.id) || {}).note20 != null)); }
async function blCoef(colId){
  const col = blx.colonnes.find(c => c.id === colId); if(!col) return;
  const v = await nicePrompt(`Coefficient de « ${col.titre} » dans la moyenne (entre 0,25 et 20) :`, String(col.coef).replace('.', ','));
  if(v === null) return;
  const c = parseFloat(String(v).replace(',', '.'));
  if(!(c >= .25 && c <= 20)){ await niceAlert('Indiquez un nombre entre 0,25 et 20.'); return; }
  const { error } = await sb.from(col.table).update({ coef: c }).eq('id', col.rid);
  if(error){ await niceAlert('Coefficient non enregistré : ' + error.message); return; }
  col.coef = c; if(col.d) col.d.coef = c; if(col.np) col.np.coef = c;
  blRendre();
}
async function blSauverAppr(eleve, texte, ia){
  const row = { teacher_id: currentUser.id, class_id: blx.classe, student_id: eleve, periode: blx.per.k, texte, ia, updated_at: new Date().toISOString() };
  const { error } = await sb.from('bilan_appreciations').upsert(row, { onConflict: 'teacher_id,class_id,student_id,periode' });
  const et = blx.cible.querySelector('#blEtat');
  if(error){ if(et) et.textContent = 'Appréciation non enregistrée : ' + error.message; return false; }
  blx.appr.set(eleve, row);
  const t = blx.cible.querySelector(`[data-appr="${eleve}"]`); if(t && !ia){ const b = t.parentElement.querySelector('.bl-ia'); if(b) b.remove(); }
  if(et) et.innerHTML = '<span style="color:#1F7A4D;">Enregistré.</span>';
  return true;
}

/* ---------- Appréciations par l'IA (sans aucun nom) ---------- */
// Efface des textes envoyés tout nom ou prénom d'élève de la classe (un titre comme « Exposé de Léa »).
function blAnonyme(txt){
  let t = String(txt || '');
  (blx.noms || []).forEach(re => { t = t.replace(re, '…'); });
  return t;
}
function blPrepNoms(){
  const mots = new Set();
  blx.eleves.forEach(e => [e.nom, e.prenom].forEach(x => String(x || '').split(/[\s-]+/).forEach(m => { if(m.length >= 3) mots.add(m); })));
  const esc = m => m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  blx.noms = [...mots].map(m => new RegExp(`(^|[^\\p{L}])${esc(m)}(?=$|[^\\p{L}])`, 'giu'));
}
// Niveau en mots (l'IA ne reçoit aucun pourcentage, pour n'en citer aucun).
const blQual = v => v >= .85 ? 'très bien réussi' : v >= .7 ? 'bien réussi' : v >= .5 ? 'moyennement réussi' : v >= .3 ? 'fragile' : 'très fragile';
// Séances d'automatismes en autonomie : repère de la classe (médiane des élèves).
function blMedAuto(){
  const l = blx.eleves.map(e => (blx.cellules.get('auto-cm|' + e.id) || {}).n || 0).sort((a, b) => a - b);
  return l.length ? l[Math.floor(l.length / 2)] : 0;
}
function blDonneesIa(e, code, medAuto){
  const s = blSynthese(e);
  const evals = s.cs.filter(x => x.col.groupe !== 'auto').sort((a, b) => String(a.col.date || '').localeCompare(String(b.col.date || ''))).map(({ col, c }) => {
    const quoi = col.np ? `${col.groupe === 'interro' ? 'Interrogation en ligne' : col.groupe === 'autre' ? 'Note' : 'Interrogation sur papier'} « ${blAnonyme(col.titre)} »${col.themes ? ' (' + (col.groupe === 'autre' ? 'description' : 'contenu évalué') + ' : ' + blAnonyme(col.themes) + ')' : ''}`
      : col.groupe === 'interro' ? `Interrogation en ligne « ${blAnonyme(col.titre)} »` : `Devoir ${typeof devoirTypeLabel === 'function' ? devoirTypeLabel(col.d.type).toLowerCase() : ''} « ${blAnonyme(col.titre)} »`;
    const res = c.abs ? 'absent' : c.manque ? 'non fait' : c.v != null ? blQual(c.v) : String(c.txt).replace(/<small>.*<\/small>/, '').replace('✓ ', '');
    const nt = c.notions ? `${c.notions.ok.length ? ' ; réussi : ' + c.notions.ok.map(blAnonyme).join(' / ') : ''}${c.notions.ko.length ? ' ; à retravailler : ' + c.notions.ko.map(blAnonyme).join(' / ') : ''}` : '';
    return `${quoi}${c.note20 != null && (col.coef || 1) !== 1 ? ' (évaluation importante)' : ''} : ${res}${c.retard ? ', rendu en retard' : ''}${nt}`;
  });
  // Automatismes et Objectif Nombre en autonomie : quantité de travail et réussite, à part.
  const ac = blx.cellules.get('auto-cm|' + e.id), ab = blx.cellules.get('auto-ceb|' + e.id);
  let auto = '';
  if(ac){
    const n = ac.n || 0, qte = !n ? 'aucune séance' : n < Math.max(2, medAuto / 2) ? 'très peu de séances (bien moins que la classe)' : n < medAuto ? 'un peu moins de séances que la classe' : n > medAuto * 1.5 ? 'beaucoup de séances (plus que la classe)' : 'autant de séances que la classe';
    auto = `Automatismes en autonomie : ${qte}${n ? ', ' + blQual(ac.v) : ''}`;
    if(ab && ab.n) auto += ` ; Objectif Nombre : ${ab.n} partie${ab.n > 1 ? 's' : ''}, ${blQual(ab.v)}`;
    auto += '. ';
  }
  const evo = s.evo ? `Évolution sur la période : ${s.evo.t}.` : 'Évolution : trop peu de résultats pour juger.';
  const niv = s.moyenne != null ? blQual(s.moyenne / 20) : s.reussite != null ? blQual(s.reussite) : null;
  return `${code} : ${s.faits}/${s.n} travaux faits${s.retards ? `, ${s.retards} rendus en retard` : ''}${niv ? `, niveau global : ${niv}` : ''}. ${evo} ${auto}Évaluations et devoirs (ordre des dates) : ${evals.join(' ; ') || 'aucun'}.`;
}
// Retire les phrases qui citeraient un pourcentage ou une note malgré la consigne.
function blSansChiffres(t){
  const re = /\d\s*%|pour ?cent|\d+([,.]\d+)?\s*\/\s*\d+/i;
  if(!re.test(t)) return t;
  const ph = String(t).split(/(?<=[.!?])\s+/).filter(p => !re.test(p));
  return ph.length ? ph.join(' ') : String(t).replace(/\s*(d'environ |de |à |avec )?\d+([,.]\d+)?\s*(%|pour ?cent|\/\s*\d+)/gi, '');
}
function blCouper(t){
  t = String(t || '').replace(/\s+/g, ' ').trim();
  if(t.length <= BL_MAX) return t;
  const c = t.slice(0, BL_MAX), i = Math.max(c.lastIndexOf('. '), c.lastIndexOf('! '));
  return i > 120 ? c.slice(0, i + 1) : c.slice(0, BL_MAX - 1).replace(/\s+\S*$/, '') + '…';
}
async function blAppreciationsIa(){
  if(!blx || !blx.colonnes.length) return;
  const deja = blx.eleves.filter(e => (blx.appr.get(e.id) || {}).texte);
  let cibles = blx.eleves;
  if(deja.length){
    const ch = await niceModal({ message: `${deja.length} élève${deja.length > 1 ? 's ont' : ' a'} déjà une appréciation. Que faire ?`,
      buttons: [{ label: 'Annuler', value: null, secondary: true }, { label: 'Compléter les manquantes', value: 'manque', secondary: true }, { label: 'Tout régénérer', value: 'tout' }] });
    if(!ch) return; if(ch === 'manque') cibles = blx.eleves.filter(e => !(blx.appr.get(e.id) || {}).texte);
  }
  if(!cibles.length) return;
  blPrepNoms();
  const et = blx.cible.querySelector('#blEtat'), btn = blx.cible.querySelector('#blIa'); if(btn) btn.disabled = true;
  const medAuto = blMedAuto();
  let faits = 0, erreur = null;
  for(let i = 0; i < cibles.length; i += 6){
    const lot = cibles.slice(i, i + 6), codes = lot.map((e, j) => 'E' + (i + j + 1));
    if(et) et.textContent = `Rédaction des appréciations… ${i}/${cibles.length}`;
    const prompt = `Tu es professeur de mathématiques (classe de ${blx.niveau || '?'}, ${blx.per.t.toLowerCase()} : du ${blx.per.du} au ${blx.per.au}). Pour chaque élève, rédige l'appréciation du bulletin à partir UNIQUEMENT des résultats ci-dessous (travail en autonomie sur le site, devoirs, interrogations en ligne et sur papier).
Règles impératives :
- ${BL_MAX} caractères au plus, espaces compris (2 phrases courtes) ; à la 3e personne, sans prénom ni nom (« Élève… », « Bon travail… », « Il faut… »).
- AUCUN chiffre de réussite : ni pourcentage, ni note, ni moyenne, ni nombre de séances. Exprime tout avec des mots.
- Appuie-toi sur le CONTENU des évaluations : nomme précisément les notions réussies et celles à retravailler, d'après les titres et contenus évalués des interrogations et devoirs (par exemple « les fractions », « la proportionnalité »), plutôt que de parler des « évaluations » en général.
- Le travail d'automatismes en autonomie sert surtout à éclairer les difficultés d'un élève faible ailleurs : s'il a fait peu ou pas de séances, signale qu'il ne travaille pas assez et conseille un entraînement régulier sur le site ; s'il en a fait beaucoup sans bien réussir, signale de réelles difficultés malgré ses efforts et valorise ces efforts. Pour un élève qui réussit bien les évaluations, n'en parle que pour le féliciter s'il s'entraîne beaucoup.
- Tiens compte de l'évolution au fil de la période (progrès, baisse, régularité) et des travaux non faits ou en retard.
- Ce qui va bien, puis ce qui est à travailler, avec un conseil concret ; ton bienveillant et professionnel ; n'invente rien. Si presque rien n'est fait, dis-le avec tact.
${lot.map((e, j) => blDonneesIa(e, codes[j], medAuto)).join('\n')}
Réponds uniquement par un objet JSON {"E1": "appréciation", …} avec les codes ci-dessus.`;
    try{
      const txt = await callClaude(prompt, 1500, { feature: 'appreciations', niveau: blx.niveau || null });
      const m = txt.match(/\{[\s\S]*\}/), js = m ? JSON.parse(m[0]) : {};
      for(let j = 0; j < lot.length; j++){ const a = js[codes[j]]; if(typeof a === 'string' && a.trim()){ await blSauverAppr(lot[j].id, blCouper(blSansChiffres(a)), true); faits++; } }
    }catch(e){ erreur = e.message || String(e); break; }
  }
  if(btn) btn.disabled = false;
  blRendre();
  const et2 = blx.cible.querySelector('#blEtat');
  if(et2) et2.innerHTML = erreur ? `<span class="bl-rouge">IA : ${escapeHtml(erreur === 'no-session' ? 'reconnectez-vous' : erreur)}</span>${faits ? ` (${faits} rédigée${faits > 1 ? 's' : ''})` : ''}`
    : `<span style="color:#1F7A4D;">${faits} appréciation${faits > 1 ? 's' : ''} rédigée${faits > 1 ? 's' : ''} par l'IA : relisez-les et modifiez-les si besoin.</span>`;
}

/* ---------- Export ---------- */
function blLignes(){
  const complet = blx.mode === 'complet';
  const tete = ['Élève', ...blx.colonnes.map(c => c.titre + (c.table && (c.coef || 1) !== 1 ? ` (coef ${blNum(c.coef)})` : '')), 'Faits', 'Retards', 'Réussite', 'Moyenne /20', ...(complet ? ['Évolution', 'Appréciation'] : [])];
  const lignes = blx.eleves.map(e => { const s = blSynthese(e);
    return [e.label, ...blx.colonnes.map(col => { const c = blx.cellules.get(col.id + '|' + e.id); return c.nc ? '' : String(c.txt).replace(/<small>(.*)<\/small>/, ' ($1)').replace('✓ ', '') + (c.retard ? ' (retard)' : ''); }),
      `${s.faits}/${s.n}`, s.retards || '', s.reussite != null ? Math.round(100 * s.reussite) + ' %' : '', s.moyenne != null ? blNum(s.moyenne) : '',
      ...(complet ? [s.evo ? s.evo.t : '', (blx.appr.get(e.id) || {}).texte || ''] : [])]; });
  return [tete, ...lignes];
}
function blCsv(){
  const csv = '﻿' + blLignes().map(l => l.map(v => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `bilan-${(blx.nom || 'classe').replace(/[^a-z0-9]+/gi, '-')}-${blx.per.du}-${blx.per.au}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function blImprimer(){
  const w = window.open('', '_blank'); if(!w){ niceAlert('Autorisez les fenêtres pour imprimer.'); return; }
  const [tete, ...lignes] = blLignes();
  w.document.write(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Bilan ${escapeHtml(blx.nom)}</title><style>
    @page{size:A4 landscape;margin:10mm;} body{font-family:Inter,Arial,sans-serif;font-size:8.5pt;color:#1C2B39;} h1{font-size:14pt;margin:0 0 4px;}
    table{border-collapse:collapse;width:100%;} th,td{border:1px solid #CBD2DC;padding:3px 5px;text-align:center;vertical-align:top;} td:first-child,th:first-child{text-align:left;font-weight:700;}
    ${blx.mode === 'complet' ? 'td:last-child{text-align:left;min-width:200px;}' : ''} thead th{background:#F3F5F8;font-size:7.5pt;}</style></head><body>
    <h1>Bilan · ${escapeHtml(blx.nom)} · ${escapeHtml(blx.per.t)} (${new Date(blx.per.du).toLocaleDateString('fr-FR')} – ${new Date(blx.per.au).toLocaleDateString('fr-FR')})</h1><p style="margin:0 0 8px;color:#5B6472;">Document réservé à l'enseignant.</p>
    <table><thead><tr>${tete.map(h => `<th>${escapeHtml(String(h))}</th>`).join('')}</tr></thead><tbody>${lignes.map(l => `<tr>${l.map(v => `<td>${escapeHtml(String(v))}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <script>setTimeout(()=>print(),300)<\/script></body></html>`);
  w.document.close();
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    .bl-fen{max-width:1400px;width:97vw;max-height:92vh;overflow:auto;}
    .bl-tete{display:flex;gap:8px 10px;align-items:center;flex-wrap:wrap;}
    .bl-tete input[type=date]{padding:4px 6px;border-radius:8px;border:1px solid rgba(28,43,57,.2);}
    .bl-prive{color:#6B3FA0;font-weight:600;} .bl-prive .gicon{font-size:15px;vertical-align:middle;}
    .bl-table{overflow:auto;max-height:72vh;} .bl-table table{border-collapse:collapse;font-size:.82rem;}
    .bl-table th, .bl-table td{border:1px solid #DCE2EA;padding:4px 6px;text-align:center;}
    .bl-table tbody th{text-align:left;white-space:nowrap;position:sticky;left:0;background:#fff;z-index:1;}
    .bl-table thead th{background:#F3F5F8;vertical-align:bottom;font-weight:600;min-width:62px;max-width:110px;position:sticky;top:0;z-index:2;}
    .bl-table thead tr.bl-grp th{font-size:.72rem;text-transform:uppercase;letter-spacing:.4px;color:#5B6472;top:0;}
    .bl-table thead tr.bl-grp + tr th{top:24px;}
    .bl-grp .g-auto{background:#FFF4E6;} .bl-grp .g-devoir{background:#EEF4FB;} .bl-grp .g-interro{background:#F4EFFA;} .bl-grp .g-papier{background:#EAF7EF;} .bl-grp .g-autre{background:#F3F5F8;}
    .bl-table thead th .gicon{display:block;font-size:17px;color:#5B6472;} .bl-table thead th small{display:block;color:#5B6472;font-weight:500;}
    .bl-coef{display:inline-block;margin-top:3px;border:1px solid rgba(107,63,160,.35);background:#F4EFFA;color:#6B3FA0;border-radius:6px;font:700 .66rem Inter,sans-serif;padding:1px 6px;cursor:pointer;}
    .bl-tit{display:block;font-size:.72rem;line-height:1.15;max-height:2.4em;overflow:hidden;}
    .bl-table tfoot th, .bl-table tfoot td{background:#F3F5F8;font-weight:700;} .bl-table tfoot small, .bl-c small{display:block;font-weight:500;color:#5B6472;font-size:.68rem;}
    .bl-c.ok{background:#E3F4EA;color:#1F7A4D;font-weight:700;} .bl-c.moyen{background:#FDF1DF;color:#A0620F;font-weight:700;} .bl-c.ko{background:#FBE7EE;color:#9E1F5E;font-weight:700;}
    .bl-c.vide{color:#9AA3AF;} .bl-c.nc{background:repeating-linear-gradient(45deg,#fff,#fff 4px,#F3F5F8 4px,#F3F5F8 8px);}
    .bl-c.retard{box-shadow:inset 0 0 0 2px #C0392B;}
    .bl-s{font-weight:700;white-space:nowrap;} .bl-rouge{color:#C0392B;font-weight:700;}
    .bl-evo{font-size:1.2rem;color:#5B6472;} .bl-evo.up{color:#1F7A4D;} .bl-evo.down{color:#C0392B;}
    .bl-appr{min-width:300px;position:relative;text-align:left !important;} .bl-appr textarea{width:100%;min-height:84px;border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:5px 8px;font:inherit;font-size:.8rem;resize:vertical;box-sizing:border-box;}
    .bl-appr-h{min-width:300px;} .bl-ia{position:absolute;top:6px;right:10px;background:#6B3FA0;color:#fff;border-radius:6px;font-size:.62rem;font-weight:800;padding:0 5px;}
    .bl-cpt{position:absolute;bottom:8px;right:12px;font-size:.62rem;color:#9AA3AF;}
    .bl-leg .bl-c{display:inline-block;padding:0 6px;border-radius:5px;}
  `;
  document.head.appendChild(st);
})();

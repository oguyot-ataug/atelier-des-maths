/* =====================================================================
   notes-papier.js -- Mes classes › Interrogations et › Bilan.

   Demandé : réorganiser Mes classes (Comptes, Groupes, En autonomie, Devoirs, Interrogations, Bilan) ;
   « pour l'import des notes des interrogations, il faudrait préciser les thèmes abordés ou relier à
   une évaluation enregistrée ».

   - Onglet Interrogations (classe active) : les interrogations en ligne de la classe (corriger, voir
     les résultats), puis les interrogations sur papier : titre, date, note sur…, thèmes abordés, ou
     une évaluation enregistrée (« Créer une évaluation ») dont le titre, la date et les titres des
     exercices deviennent les thèmes. Notes saisies élève par élève (« abs » pour un absent) ou
     collées depuis un tableur (une note par ligne dans l'ordre de la liste, ou « Nom Prénom ; note »).
     Table notes_papier (RLS : le professeur seulement).
   - Onglet Bilan : bilan.js en mode complet, dans le panneau.
   ===================================================================== */

const npx = { liste: [], evals: null };
async function npOngletInterros(){
  const box = document.getElementById('npRoot'); if(!box) return;
  if(!currentClassId){ box.innerHTML = '<p class="hint">Choisissez une classe active pour voir ses interrogations.</p>'; return; }
  box.innerHTML = '<p class="hint">Chargement…</p>';
  const classe = currentClassId;
  const [{ data: dv }, { data: pap }, { data: cs }] = await Promise.all([
    sb.from('devoirs').select('id,titre,date_depot,qz_publie_at,qz_mode,archive_at,coef').eq('teacher_id', currentUser.id).eq('class_id', classe).eq('type', 'questionnaire').order('created_at', { ascending: false }),
    sb.from('notes_papier').select('*').eq('teacher_id', currentUser.id).eq('class_id', classe).order('date_eval', { ascending: false }),
    sb.from('class_students').select('student_id').eq('class_id', classe),
  ]);
  if(classe !== currentClassId) return;
  npx.liste = pap || [];
  const nEl = (cs || []).length, moy = np => { const v = Object.values(np.notes || {}).filter(x => x !== 'abs' && x !== '' && x != null).map(Number); return v.length ? (v.reduce((a, b) => a + b, 0) / v.length) : null; };
  const num = n => (Math.round(n * 10) / 10).toString().replace('.', ',');
  box.innerHTML = `
    <div class="np-sec"><h2><span class="gicon">quiz</span> Interrogations en ligne</h2>
      ${(dv || []).length ? `<div class="np-liste">${dv.map(d => `<div class="np-ligne${d.archive_at ? ' arch' : ''}"><div><b>${escapeHtml(d.titre)}</b><div class="hint" style="margin:0;">${d.date_depot ? 'donnée le ' + new Date(d.date_depot).toLocaleDateString('fr-FR') : 'brouillon'}${d.qz_publie_at ? ' · résultats publiés' : ''}${d.archive_at ? ' · archivée' : ''}</div></div>
          ${d.qz_mode === 'entrainement' || d.qz_mode === 'sondage' ? '' : `<button class="btn secondary qz-mini" onclick="npCoefInterro('${d.id}', ${+d.coef || 1})" title="Coefficient dans les moyennes (Bilan, Carnet de notes)">coef ${num(+d.coef || 1)}</button>`}
          <button class="btn secondary qz-mini" onclick="qzOuvrirCorrection('${d.id}')"><span class="gicon">${d.qz_mode === 'entrainement' || d.qz_mode === 'sondage' ? 'insights' : 'fact_check'}</span> ${d.qz_mode === 'entrainement' || d.qz_mode === 'sondage' ? 'Résultats' : 'Corriger'}</button></div>`).join('')}</div>`
        : '<p class="hint">Aucune interrogation en ligne pour cette classe.</p>'}
      <p class="hint" style="margin:6px 0 0;">Pour créer ou donner une interrogation en ligne : <a href="#" onclick="event.preventDefault();qzBanqueOuvrir()">L'Atelier du prof › Évaluations › Interrogations en ligne</a>.</p></div>
    <div class="np-sec"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><h2 style="margin:0;"><span class="gicon">edit_document</span> Interrogations sur papier</h2>
        <button class="btn" style="margin-left:auto;" onclick="npEditer()"><span class="gicon">add</span> Saisir les notes d'une interrogation</button></div>
      <p class="hint" style="margin:4px 0 8px;">Les notes saisies ici entrent dans le Bilan de la classe ; les thèmes abordés aident l'IA à rédiger les appréciations.</p>
      ${npx.liste.length ? `<div class="np-liste">${npx.liste.map(np => { const m = moy(np), n = Object.values(np.notes || {}).filter(x => x !== '' && x != null).length;
          return `<div class="np-ligne"><div><b>${escapeHtml(np.titre)}</b> <span class="hint" style="margin:0;">${new Date(np.date_eval).toLocaleDateString('fr-FR')} · sur ${num(+np.sur)}${+np.coef && +np.coef !== 1 ? ' · coef ' + num(+np.coef) : ''} · ${n}/${nEl} note${n > 1 ? 's' : ''}${m != null ? ' · moyenne ' + num(m) : ''}</span>
            ${np.themes ? `<div class="hint" style="margin:2px 0 0;"><span class="gicon" style="font-size:14px;vertical-align:middle;">label</span> ${escapeHtml(np.themes)}</div>` : ''}${np.evaluation_id ? '<div class="hint" style="margin:0;"><span class="gicon" style="font-size:14px;vertical-align:middle;">link</span> reliée à une évaluation enregistrée</div>' : ''}</div>
            <span style="display:flex;gap:6px;"><button class="btn secondary qz-mini" onclick="npEditer('${np.id}')"><span class="gicon">edit</span> Notes</button>
            <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="npSupprimer('${np.id}')"><span class="gicon">delete</span></button></span></div>`; }).join('')}</div>`
        : '<p class="hint">Aucune note d\'interrogation papier pour cette classe.</p>'}</div>`;
}
async function npEvaluations(){
  if(npx.evals) return npx.evals;
  const { data } = await sb.from('evaluations').select('id,title,niveau,classes,eval_date,data,updated_at').order('updated_at', { ascending: false }).limit(200);
  npx.evals = data || []; return npx.evals;
}
function npThemesDe(ev){
  const ex = (ev && ev.data && ev.data.evaluationExercises) || [];
  const t = ex.map(x => String(x.title || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).filter(Boolean);
  return [...new Set(t)].join(' ; ').slice(0, 600);
}
async function npEditer(id){
  if(!currentClassId){ await niceAlert('Choisissez d\'abord la classe active.'); return; }
  const np = id ? npx.liste.find(x => x.id === id) : { titre: '', date_eval: new Date().toISOString().slice(0, 10), sur: 20, coef: 1, themes: '', evaluation_id: null, notes: {} };
  if(!np) return;
  const [eleves, evals] = await Promise.all([qzElevesDevoir({ class_id: currentClassId }), npEvaluations()]);
  let o = document.getElementById('npOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'npOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '430'; document.body.appendChild(o); }
  const val = v => v == null ? '' : v === 'abs' ? 'abs' : String(v).replace('.', ',');
  o.innerHTML = `<div class="modal-card np-ed">
    <div style="display:flex;justify-content:space-between;align-items:center;"><b class="cd-h"><span class="gicon">edit_document</span> ${id ? 'Notes de l\'interrogation' : 'Interrogation sur papier'}</b>
      <button class="modal-close" onclick="document.getElementById('npOverlay').style.display='none'"><span class="gicon">close</span></button></div>
    <label class="np-lab">Relier à une évaluation enregistrée <small>(facultatif : son titre, sa date et ses exercices sont repris)</small>
      <select id="npEval"><option value="">— aucune —</option>${evals.map(ev => `<option value="${ev.id}"${ev.id === np.evaluation_id ? ' selected' : ''}>${escapeHtml(ev.title || 'Sans titre')}${ev.eval_date ? ' · ' + new Date(ev.eval_date).toLocaleDateString('fr-FR') : ''}${ev.niveau ? ' · ' + escapeHtml(ev.niveau) : ''}</option>`).join('')}</select></label>
    <div class="np-grille"><label class="np-lab">Titre<input type="text" id="npTitre" value="${escapeHtml(np.titre)}" placeholder="ex. Interrogation fractions"></label>
      <label class="np-lab">Date<input type="date" id="npDate" value="${np.date_eval}"></label>
      <label class="np-lab">Noté sur<input type="number" id="npSur" value="${+np.sur}" min="1" step="0.5"></label>
      <label class="np-lab">Coefficient<input type="number" id="npCoef" value="${+(np.coef || 1)}" min="0.25" max="20" step="0.25"></label></div>
    <label class="np-lab">Thèmes abordés<textarea id="npThemes" rows="2" placeholder="ex. comparer des fractions ; fractions d'une quantité ; problèmes">${escapeHtml(np.themes || '')}</textarea></label>
    <details class="np-coller"><summary><span class="gicon">content_paste</span> Coller les notes depuis un tableur</summary>
      <p class="hint" style="margin:4px 0;">Une note par ligne, dans l'ordre de la liste ci-dessous ; ou « Nom Prénom » puis la note (séparés par une tabulation ou un point-virgule). « abs » pour un absent.</p>
      <textarea id="npColle" rows="4" style="width:100%;"></textarea><button class="btn secondary qz-mini" id="npRepartir"><span class="gicon">format_list_numbered</span> Répartir les notes</button> <span class="hint" id="npColleEtat" style="margin:0;"></span></details>
    <div class="np-notes">${eleves.map(e => `<label><span>${escapeHtml(e.label)}</span><input type="text" inputmode="decimal" data-np="${e.id}" value="${val((np.notes || {})[e.id])}" placeholder="—"></label>`).join('') || '<p class="hint">Aucun élève dans cette classe.</p>'}</div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;align-items:center;"><span class="hint" id="npEtat" style="margin:0 auto 0 0;"></span>
      <button class="btn secondary" onclick="document.getElementById('npOverlay').style.display='none'">Annuler</button><button class="btn" id="npOk"><span class="gicon">save</span> Enregistrer</button></div></div>`;
  o.style.display = 'flex';
  const $ = s => o.querySelector(s);
  $('#npEval').onchange = () => { const ev = evals.find(x => x.id === $('#npEval').value); if(!ev) return;
    if(!$('#npTitre').value.trim()) $('#npTitre').value = ev.title || '';
    if(ev.eval_date) $('#npDate').value = ev.eval_date;
    const th = npThemesDe(ev); if(th && !$('#npThemes').value.trim()) $('#npThemes').value = th; };
  $('#npRepartir').onclick = () => {
    const lignes = $('#npColle').value.split(/\r?\n/).map(l => l.trim()).filter(Boolean), champs = [...o.querySelectorAll('[data-np]')];
    const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]+/g, ' ').trim();
    let n = 0, inconnus = 0;
    if(lignes.some(l => /[\t;]/.test(l))){
      lignes.forEach(l => { const p = l.split(/[\t;]/).map(x => x.trim()).filter(Boolean); if(p.length < 2) return; const note = p.pop(), nom = norm(p.join(' '));
        const e = eleves.find(x => { const a = norm(x.label), b = norm((x.prenom || '') + ' ' + (x.nom || '')); return a === nom || b === nom; });
        const c = e && champs.find(x => x.dataset.np === e.id); if(c){ c.value = note; n++; } else inconnus++; });
    } else lignes.forEach((l, i) => { if(champs[i]){ champs[i].value = l; n++; } });
    $('#npColleEtat').textContent = `${n} note${n > 1 ? 's' : ''} placée${n > 1 ? 's' : ''}${inconnus ? `, ${inconnus} nom${inconnus > 1 ? 's' : ''} non reconnu${inconnus > 1 ? 's' : ''}` : ''}.`;
  };
  $('#npOk').onclick = async () => {
    const titre = $('#npTitre').value.trim(), sur = parseFloat(String($('#npSur').value).replace(',', '.'));
    if(!titre){ $('#npEtat').textContent = 'Donnez un titre.'; return; }
    if(!(sur > 0)){ $('#npEtat').textContent = 'Indiquez sur combien est notée l\'interrogation.'; return; }
    const coef = parseFloat(String($('#npCoef').value).replace(',', '.'));
    if(!(coef >= .25 && coef <= 20)){ $('#npEtat').textContent = 'Le coefficient doit être entre 0,25 et 20.'; return; }
    const notes = {}; let err = null;
    o.querySelectorAll('[data-np]').forEach(c => { const v = c.value.trim().replace(',', '.'); if(!v) return;
      if(/^abs/i.test(v)) notes[c.dataset.np] = 'abs';
      else if(!isNaN(+v) && +v >= 0 && +v <= sur) notes[c.dataset.np] = +v; else err = c.closest('label').querySelector('span').textContent; });
    if(err){ $('#npEtat').textContent = `Note incorrecte pour ${err} (un nombre entre 0 et ${sur}, ou « abs »).`; return; }
    const row = { teacher_id: currentUser.id, class_id: currentClassId, titre, date_eval: $('#npDate').value || new Date().toISOString().slice(0, 10), sur, coef, themes: $('#npThemes').value.trim(),
      evaluation_id: $('#npEval').value || null, notes, updated_at: new Date().toISOString() };
    const { error } = id ? await sb.from('notes_papier').update(row).eq('id', id) : await sb.from('notes_papier').insert(row);
    if(error){ $('#npEtat').textContent = 'Erreur : ' + error.message; return; }
    o.style.display = 'none'; npOngletInterros();
  };
}
async function npCoefInterro(id, actuel){
  const v = await nicePrompt('Coefficient de cette interrogation dans les moyennes (entre 0,25 et 20) :', String(actuel).replace('.', ','));
  if(v === null) return;
  const c = parseFloat(String(v).replace(',', '.'));
  if(!(c >= .25 && c <= 20)){ await niceAlert('Indiquez un nombre entre 0,25 et 20.'); return; }
  const { error } = await sb.from('devoirs').update({ coef: c }).eq('id', id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  npOngletInterros();
}
async function npSupprimer(id){
  const np = npx.liste.find(x => x.id === id); if(!np) return;
  if(!(await niceConfirm(`Supprimer les notes de « ${np.titre} » ? Elles disparaissent aussi du bilan.`))) return;
  const { error } = await sb.from('notes_papier').delete().eq('id', id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  npOngletInterros();
}
function npOngletBilan(){
  const box = document.getElementById('blRoot'); if(!box) return;
  blOuvrir({ classe: currentClassId, mode: 'complet', cible: box });
}

(function(){
  const st = document.createElement('style');
  st.textContent = `
    #suppanel-bilan{margin-left:calc(50% - 50vw + 16px);margin-right:calc(50% - 50vw + 16px);}
    #view-supervision .sup-tab-btn{white-space:nowrap;} #view-supervision .sup-tab-btn small{font-weight:500;opacity:.75;}
    #view-supervision .tabs{flex-wrap:wrap;}
    .np-sec{margin:0 0 22px;} .np-sec h2{font-size:1.2rem;margin:0 0 8px;display:flex;align-items:center;gap:6px;}
    .np-liste{display:flex;flex-direction:column;gap:6px;} .np-ligne{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px 12px;}
    .np-ligne.arch{opacity:.7;}
    .np-ed{max-width:640px;width:94vw;max-height:90vh;overflow:auto;}
    .np-lab{display:flex;flex-direction:column;gap:3px;font-size:.85rem;font-weight:600;margin:8px 0 0;} .np-lab small{font-weight:400;color:var(--ink-soft);}
    .np-lab input, .np-lab select, .np-lab textarea{font:inherit;font-weight:400;padding:6px 8px;border-radius:8px;border:1px solid rgba(28,43,57,.2);}
    .np-grille{display:grid;grid-template-columns:2fr 1.2fr .8fr .8fr;gap:8px;}
    .np-coller{margin:10px 0;border:1px dashed rgba(28,43,57,.2);border-radius:10px;padding:6px 10px;} .np-coller summary{cursor:pointer;font-weight:600;font-size:.88rem;}
    .np-notes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:4px 14px;margin-top:8px;}
    .np-notes label{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:.88rem;border-bottom:1px solid rgba(28,43,57,.06);padding:2px 0;}
    .np-notes input{width:70px;text-align:center;padding:4px;border-radius:6px;border:1px solid rgba(28,43,57,.2);font:inherit;}
    @media (max-width:600px){ .np-grille{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

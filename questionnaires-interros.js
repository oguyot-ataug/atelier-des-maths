/* =====================================================================
   questionnaires-interros.js -- Interrogations en ligne : page à part, séparée des devoirs

   Demandé : "Je pense qu'il y a confusion entre devoirs et questionnaire. Je préfère que
   questionnaire (interro en ligne) soit séparé de l'attribution de devoirs type automatismes et
   objectif nombre."
   - Formulaire propre (#view-qz-form) : titre, classe, toute la classe ou élèves choisis, date
     d'ouverture, date limite, consigne, puis l'éditeur de questionnaire.
   - Onglet « Interrogations données » de la page Interrogations en ligne : état (brouillon,
     programmée, ouverte, fermée, résultats publiés), copies rendues, à corriger ; Corriger,
     Modifier, Réutiliser, Supprimer.
   Techniquement, une interrogation reste une ligne de la table devoirs (type « questionnaire ») :
   les élèves la reçoivent comme avant, dans une section à part de « Mes devoirs ».
   ===================================================================== */

let qzF = null; // { devoirId, cible:'classe'|'eleves', eleves:Set }

function qzFormHtml(){
  const classes = accountClassesList || [];
  return `<span class="back-btn" onclick="qzBanqueOuvrir()">← Interrogations en ligne</span>
    <h1 style="margin:6px 0 4px;" id="qzfTitreH"><span class="gicon">quiz</span> Nouvelle interrogation</h1>
    <div class="tool-shell qz-f">
      <div class="qz-f-grid">
        <label class="qz-f-full">Titre <input type="text" id="qzfTitre" placeholder="ex. Interro n°3 : les fractions"></label>
        <label>Classe <select id="qzfClasse" onchange="qzF.eleves=new Set();qzFormCible()">${classes.map(c => `<option value="${c.id}">${qzEsc(c.label)}</option>`).join('') || '<option value="">Aucune classe</option>'}</select></label>
        <label>Ouverture <input type="date" id="qzfOuverture" title="Tant qu'aucune date n'est choisie, l'interrogation reste un brouillon invisible aux élèves"></label>
        <label><span>Date limite <span style="font-weight:400;color:var(--ink-soft);">(facultative)</span></span><input type="date" id="qzfLimite"></label>
      </div>
      <p class="hint" style="margin:4px 0 10px;">Sans date d'ouverture, l'interrogation reste un brouillon invisible aux élèves. Choisissez aujourd'hui pour l'ouvrir tout de suite (en classe, vous pouvez aussi la fermer à tout moment depuis la correction).</p>
      <div class="tool-row" id="qzfCibleMode" style="margin:0 0 6px;"></div>
      <div id="qzfEleves" style="display:none;"></div>
      <p class="hint" style="margin:8px 0 0;font-weight:700;">Consigne</p>
      <textarea id="qzfConsigne" rows="2" placeholder="Consigne (facultatif), ex. Calculatrice interdite. Justifiez vos réponses." style="width:100%;box-sizing:border-box;margin-top:6px;padding:8px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font:inherit;"></textarea>
    </div>
    <div class="tool-shell"><p class="example-title" style="margin:0 0 6px;"><span class="gicon" style="color:#6B3FA0;">edit_note</span> Les questions</p><div id="qzfEditeur"></div></div>
    <div class="tool-row" style="margin:0 0 30px;">
      <button class="btn" id="qzfDonner" onclick="qzFormEnregistrer()"><span class="gicon">send</span> Donner à la classe</button>
      <button class="btn secondary" onclick="qzBanqueOuvrir()">Annuler</button>
      <span class="hint" id="qzfStatus" style="margin:0;"></span>
    </div>`;
}
function qzFormCible(){
  const box = document.getElementById('qzfCibleMode'); if(!box || !qzF) return;
  box.innerHTML = `<button type="button" class="btn secondary${qzF.cible === 'classe' ? ' active' : ''}" onclick="qzF.cible='classe';qzFormCible()"><span class="gicon">groups</span> Toute la classe</button>
    <button type="button" class="btn secondary${qzF.cible === 'eleves' ? ' active' : ''}" onclick="qzF.cible='eleves';qzFormCible()"><span class="gicon">person</span> Élèves choisis</button>`;
  const el = document.getElementById('qzfEleves');
  el.style.display = qzF.cible === 'eleves' ? 'block' : 'none';
  if(qzF.cible !== 'eleves') return;
  const classId = document.getElementById('qzfClasse').value;
  el.innerHTML = '<p class="hint">Chargement…</p>';
  qzElevesDevoir({ class_id: classId }).then(eleves => {
    el.innerHTML = `<div class="qz-bp-list">${eleves.map(e => `<label class="qz-check"><input type="checkbox" ${qzF.eleves.has(e.id) ? 'checked' : ''} onchange="this.checked?qzF.eleves.add('${e.id}'):qzF.eleves.delete('${e.id}')"> ${qzEsc(e.label)}</label>`).join('') || '<span class="hint" style="margin:0;">Aucun élève dans cette classe.</span>'}</div>`;
  });
}
// Ouvre le formulaire : vide, avec une copie d'un questionnaire (copieDe), ou une interrogation existante (devoirId).
async function qzFormOuvrir(opts){
  opts = opts || {};
  showView('view-qz-form'); setActiveTopnav('questionnaires');
  const root = document.getElementById('qzFormRoot');
  root.innerHTML = qzFormHtml();
  qzF = { devoirId: null, cible: 'classe', eleves: new Set() };
  qzEdReset();
  const box = document.getElementById('qzfEditeur'); delete box.dataset.monte;
  if(opts.devoirId){
    const { data: d, error } = await sb.from('devoirs').select('*').eq('id', opts.devoirId).single();
    if(error || !d){ await niceAlert('Interrogation introuvable.'); return qzBanqueOuvrir(); }
    qzF.devoirId = d.id;
    await qzEdCharger(d.questionnaire_id);
    document.getElementById('qzfTitreH').innerHTML = '<span class="gicon">edit</span> Modifier l\'interrogation';
    document.getElementById('qzfDonner').innerHTML = '<span class="gicon">check</span> Enregistrer les modifications';
    document.getElementById('qzfTitre').value = d.titre || '';
    document.getElementById('qzfClasse').value = d.class_id;
    document.getElementById('qzfOuverture').value = d.date_depot ? d.date_depot.slice(0, 10) : '';
    document.getElementById('qzfLimite').value = d.date_limite ? d.date_limite.slice(0, 10) : '';
    document.getElementById('qzfConsigne').value = d.consigne === 'Répondez aux questions.' ? '' : (d.consigne || '');
    if(d.student_ids && d.student_ids.length){ qzF.cible = 'eleves'; qzF.eleves = new Set(d.student_ids); }
    const { count } = await sb.from('qz_copies').select('id', { count: 'exact', head: true }).eq('devoir_id', d.id);
    if(count) document.getElementById('qzfStatus').innerHTML = `<b style="color:#B8511F;">${count} élève${count > 1 ? 's ont' : ' a'} déjà commencé :</b> modifier les réponses attendues ou le barème change leur note.`;
  } else if(opts.copieDe){
    const q = opts.copieDe;
    qzEd = { id: null, questions: JSON.parse(JSON.stringify(q.questions || [])), reglages: Object.assign({}, QZ_REGLAGES_DEFAUT, q.reglages || {}, { ferme: false }) };
    document.getElementById('qzfTitre').value = q.titre || '';
    document.getElementById('qzfStatus').textContent = `Questionnaire « ${q.titre || 'Sans titre'} » chargé (copie) : choisissez la classe et la date d'ouverture, adaptez-le si besoin.`;
  }
  qzFormCible();
  qzEdMonter();
  window.scrollTo(0, 0);
}
function qzFormModifier(devoirId){ return qzFormOuvrir({ devoirId }); }
async function qzFormEnregistrer(){
  const st = document.getElementById('qzfStatus');
  const titre = document.getElementById('qzfTitre').value.trim();
  const classId = document.getElementById('qzfClasse').value;
  const ouv = document.getElementById('qzfOuverture').value, lim = document.getElementById('qzfLimite').value;
  if(!titre || !classId){ st.textContent = 'Le titre et la classe sont nécessaires.'; return; }
  if(qzF.cible === 'eleves' && !qzF.eleves.size){ st.textContent = 'Choisissez au moins un élève.'; return; }
  st.textContent = 'Enregistrement…';
  let questionnaireId;
  try{ questionnaireId = await qzEdEnregistrer(titre); }catch(e){ st.textContent = e.message || String(e); return; }
  const payload = { teacher_id: currentUser.id, class_id: classId, titre, type: 'questionnaire', questionnaire_id: questionnaireId,
    consigne: document.getElementById('qzfConsigne').value.trim() || 'Répondez aux questions.',
    date_depot: ouv ? new Date(ouv).toISOString() : null, date_limite: lim ? new Date(lim).toISOString() : null,
    student_ids: qzF.cible === 'eleves' ? Array.from(qzF.eleves) : null };
  const { error } = qzF.devoirId ? await sb.from('devoirs').update(payload).eq('id', qzF.devoirId) : await sb.from('devoirs').insert(payload);
  if(error){ st.textContent = 'Erreur : ' + error.message; return; }
  const nouveau = !qzF.devoirId;
  if(qzB) qzB.onglet = 'donnees';
  await qzBanqueOuvrir();
  await niceAlert(nouveau ? (ouv ? `« ${titre} » est donnée à la classe.` : `« ${titre} » est enregistrée en brouillon : choisissez une date d'ouverture pour la donner.`) : 'Interrogation modifiée.');
}
// Enregistre le questionnaire dans « Mes questionnaires » sans créer d'interrogation.
async function qzEnregistrerSeul(){
  const titre = (document.getElementById('qzfTitre') || {}).value ? document.getElementById('qzfTitre').value.trim() : '';
  const st = document.getElementById('qzfStatus');
  if(!titre){ st.textContent = 'Donnez un titre au questionnaire avant de l\'enregistrer.'; return; }
  try{ await qzEdEnregistrer(titre); st.textContent = '✓ Enregistré dans « Mes questionnaires » (pas encore donné à une classe).'; }
  catch(e){ st.textContent = e.message || String(e); }
}

/* ---------------------------------------------------------------------
   Onglet « Interrogations données »
   --------------------------------------------------------------------- */
async function qzInterrosCharger(){
  const { data: dv } = await sb.from('devoirs').select('id,titre,class_id,date_depot,date_limite,created_at,student_ids,qz_publie_at,questionnaire_id,classes(nom,niveau)')
    .eq('teacher_id', currentUser.id).eq('type', 'questionnaire').order('created_at', { ascending: false });
  const interros = dv || [], ids = interros.map(d => d.id), classIds = Array.from(new Set(interros.map(d => d.class_id)));
  const [{ data: copies }, { data: cs }] = await Promise.all([
    ids.length ? sb.from('qz_copies').select('devoir_id,statut,deadline_at,reponses,correction').in('devoir_id', ids) : { data: [] },
    classIds.length ? sb.from('class_students').select('class_id').in('class_id', classIds) : { data: [] },
  ]);
  const taille = {}; (cs || []).forEach(r => { taille[r.class_id] = (taille[r.class_id] || 0) + 1; });
  const qzMap = new Map((qzB.mes || []).map(q => [q.id, q]));
  interros.forEach(d => {
    const q = qzMap.get(d.questionnaire_id), cp = (copies || []).filter(c => c.devoir_id === d.id);
    const reg = Object.assign({}, QZ_REGLAGES_DEFAUT, (q && q.reglages) || {});
    d._q = q; d._reg = reg;
    d._total = d.student_ids && d.student_ids.length ? d.student_ids.length : (taille[d.class_id] || 0);
    d._rendues = cp.filter(qzEstRendue).length;
    d._enCours = cp.length - d._rendues;
    d._aCorriger = q ? cp.filter(c => qzEstRendue(c) && qzScoreCopie(q.questions, c, reg).aCorriger).length : 0;
  });
  qzB.interros = interros;
}
function qzInterroEtat(d){
  const now = new Date();
  if(d.qz_publie_at) return { t: 'Résultats publiés', c: 'ok', i: 'visibility' };
  if(d._reg && d._reg.ferme) return { t: 'Fermée', c: 'ferme', i: 'lock' };
  if(!d.date_depot) return { t: 'Brouillon', c: 'brouillon', i: 'edit_note' };
  if(new Date(d.date_depot) > now) return { t: 'Ouverture le ' + new Date(d.date_depot).toLocaleDateString('fr-FR'), c: 'prog', i: 'schedule' };
  return { t: 'Ouverte', c: 'ouverte', i: 'play_circle' };
}
function qzInterrosHtml(liste){
  if(!liste.length) return `<p class="hint">Aucune interrogation pour l'instant : « Nouvelle interrogation » pour en créer une (ou « Donner à une classe » depuis Mes questionnaires).</p>`;
  return `<div class="qz-i-liste">${liste.map(d => { const e = qzInterroEtat(d), r = d._reg || QZ_REGLAGES_DEFAUT;
    return `<div class="qz-i-row">
      <div class="qz-i-main"><b>${qzEsc(d.titre)}</b>
        <div class="hint" style="margin:2px 0 0;">${qzEsc(d.classes ? d.classes.nom : '')}${d.student_ids && d.student_ids.length ? ` · ${d.student_ids.length} élève${d.student_ids.length > 1 ? 's' : ''} choisi${d.student_ids.length > 1 ? 's' : ''}` : ''} · ${r.mode === 'classe' ? 'en classe, ' + r.duree + ' min' : 'à la maison'}${d.date_limite ? ' · limite le ' + new Date(d.date_limite).toLocaleDateString('fr-FR') : ''}</div></div>
      <span class="qz-i-etat ${e.c}"><span class="gicon">${e.i}</span> ${e.t}</span>
      <span class="qz-i-stat" title="Copies rendues"><b>${d._rendues}</b>/${d._total} rendue${d._rendues > 1 ? 's' : ''}${d._enCours ? ` · ${d._enCours} en cours` : ''}</span>
      <span class="qz-i-stat${d._aCorriger ? ' warn' : ''}">${d._aCorriger ? `<b>${d._aCorriger}</b> à corriger` : d._rendues ? '✓ corrigé' : ''}</span>
      <span class="qz-i-act">
        <button class="btn qz-mini" onclick="qzOuvrirCorrection('${d.id}')"><span class="gicon">fact_check</span> Corriger</button>
        <button class="btn secondary qz-mini" onclick="qzFormModifier('${d.id}')" title="Modifier"><span class="gicon">edit</span></button>
        ${d.questionnaire_id ? `<button class="btn secondary qz-mini" onclick="qzBanqueDonner('${d.questionnaire_id}')" title="Donner une copie à une autre classe"><span class="gicon">content_copy</span></button>` : ''}
        <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="qzInterroSupprimer('${d.id}')" title="Supprimer"><span class="gicon">delete</span></button>
      </span></div>`; }).join('')}</div>`;
}
async function qzInterroSupprimer(id){
  const d = (qzB.interros || []).find(x => x.id === id); if(!d) return;
  if(!(await niceConfirm(`Supprimer l'interrogation « ${d.titre} » et toutes les copies des élèves ? Le questionnaire reste dans « Mes questionnaires ».`))) return;
  const { error: e1 } = await sb.from('devoirs_rendus').delete().eq('devoir_id', id);
  const { error: e2 } = e1 ? { error: e1 } : await sb.from('devoirs').delete().eq('id', id);
  if(e2){ await niceAlert('Erreur : ' + e2.message); return; }
  await qzBanqueOuvrir();
}

(function qziStyles2(){
  const st = document.createElement('style');
  st.textContent = `
    #qzFormRoot{max-width:1000px;}
    .qz-f-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px 14px;}
    .qz-f-grid label{display:flex;flex-direction:column;gap:4px;font-size:.84rem;font-weight:600;}
    .qz-f-grid .qz-f-full{grid-column:1/-1;}
    .qz-f-grid input,.qz-f-grid select{padding:7px 9px;border:1px solid rgba(28,43,57,.2);border-radius:8px;font:inherit;font-weight:400;}
    .qz-i-liste{display:flex;flex-direction:column;gap:8px;}
    .qz-i-row{display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;background:#fff;border:1px solid rgba(28,43,57,.1);border-left:4px solid #6B3FA0;border-radius:12px;padding:10px 14px;}
    .qz-i-main{flex:1;min-width:200px;}
    .qz-i-etat{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:3px 10px;font-size:.76rem;font-weight:700;background:#eee;color:#555;white-space:nowrap;}
    .qz-i-etat .gicon{font-size:16px;}
    .qz-i-etat.ok{background:#EAF6EC;color:#1E7B34;} .qz-i-etat.ouverte{background:#EEF4FB;color:#0C5BA0;}
    .qz-i-etat.prog{background:#FFF4E6;color:#B8511F;} .qz-i-etat.ferme{background:#F4EFFA;color:#6B3FA0;}
    .qz-i-stat{font-size:.82rem;white-space:nowrap;} .qz-i-stat.warn{color:#B8511F;}
    .qz-i-act{display:inline-flex;gap:5px;flex-wrap:wrap;}
    @media (max-width:700px){ .qz-f-grid{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

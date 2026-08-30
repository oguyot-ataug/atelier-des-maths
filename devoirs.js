/* =====================================================================
   DEVOIRS.JS — Système de devoirs (L'Atelier des Maths)
   Même principe que admin.js : injection du HTML via innerHTML dans un
   conteneur vide de index.html, chargé en <script defer> après app.js
   (dont ce fichier dépend : sb, currentUser, currentUserRole, escapeHtml,
   accountClassesList, niceAlert, niceConfirm) et après outils-figures.js
   (dont il dépend aussi : openFigureTool, figState, SCALE_PX_PER_CM).
   ===================================================================== */

document.getElementById('view-devoirs-prof').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;"><span class=gicon>assignment</span> Devoirs</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Proposez un travail à faire à une classe (consigne libre) -- chaque élève pourra rendre un fichier ou une figure construite avec l'outil géométrie.</p>

  <div class="tool-shell">
    <p class="example-title" style="margin-bottom:6px;">Nouveau devoir</p>
    <div class="tool-row">
      <input type="text" id="devoirNewTitre" placeholder="Titre (ex. Exercice 4 p.32)" style="min-width:220px;">
      <select id="devoirNewClasse"></select>
      <input type="date" id="devoirNewDate" title="Date limite (facultative)">
    </div>
    <textarea id="devoirNewConsigne" rows="4" style="width:100%;margin-top:8px;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;" placeholder="Consigne (texte libre)..."></textarea>
    <div class="tool-row" style="margin-top:8px;">
      <button class="btn" onclick="createDevoir()">Assigner ce devoir</button>
    </div>
    <span class="hint" id="devoirCreateStatus" style="margin:0;"></span>
  </div>

  <div class="tool-shell" style="margin-top:16px;">
    <p class="example-title" style="margin-bottom:6px;">Devoirs assignés</p>
    <div id="devoirsProfListing"><p class="hint">Chargement…</p></div>
  </div>
`;

document.getElementById('view-devoirs-eleve').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;"><span class=gicon>assignment</span> Mes devoirs</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Le travail proposé par vos professeurs. Rendez un fichier, ou construisez une figure avec l'outil géométrie.</p>
  <div id="devoirsEleveListing"><p class="hint">Chargement…</p></div>
`;

/* ================= CÔTÉ PROF ================= */
async function renderDevoirsProf(){
  const select = document.getElementById('devoirNewClasse');
  select.innerHTML = (accountClassesList||[]).map(c=>`<option value="${c.id}">${escapeHtml(c.label)}</option>`).join('') || '<option value="">Aucune classe</option>';
  await refreshDevoirsProfListing();
}
async function createDevoir(){
  const status = document.getElementById('devoirCreateStatus');
  const titre = document.getElementById('devoirNewTitre').value.trim();
  const consigne = document.getElementById('devoirNewConsigne').value.trim();
  const classId = document.getElementById('devoirNewClasse').value;
  const dateStr = document.getElementById('devoirNewDate').value;
  if(!titre || !consigne || !classId){ status.textContent = 'Titre, consigne et classe sont nécessaires.'; return; }
  status.textContent = 'Enregistrement…';
  const { error } = await sb.from('devoirs').insert({
    teacher_id: currentUser.id, class_id: classId, titre, consigne,
    date_limite: dateStr ? new Date(dateStr).toISOString() : null,
  });
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  status.textContent = '✓ Devoir assigné.';
  document.getElementById('devoirNewTitre').value = '';
  document.getElementById('devoirNewConsigne').value = '';
  document.getElementById('devoirNewDate').value = '';
  await refreshDevoirsProfListing();
}
async function refreshDevoirsProfListing(){
  const el = document.getElementById('devoirsProfListing');
  const { data: devoirsList, error } = await sb.from('devoirs')
    .select('id,titre,consigne,date_limite,created_at,class_id,classes(nom,niveau)')
    .eq('teacher_id', currentUser.id).order('created_at',{ascending:false});
  if(error){ el.textContent = 'Erreur : '+error.message; return; }
  if(!devoirsList || !devoirsList.length){ el.innerHTML = '<p class="hint">Aucun devoir assigné pour l\'instant.</p>'; return; }
  // Nombre de rendus / nombre d'élèves de la classe, pour chaque devoir.
  const rows = await Promise.all(devoirsList.map(async d=>{
    const { count: totalEleves } = await sb.from('class_students').select('*',{count:'exact',head:true}).eq('class_id', d.class_id);
    const { count: nbRendus } = await sb.from('devoirs_rendus').select('*',{count:'exact',head:true}).eq('devoir_id', d.id);
    const dateStr = d.date_limite ? new Date(d.date_limite).toLocaleDateString('fr-FR') : '';
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <span><b>${escapeHtml(d.titre)}</b> · ${escapeHtml(d.classes ? d.classes.nom+' ('+d.classes.niveau+')' : '')}${dateStr?' · limite : '+dateStr:''} · ${nbRendus||0}/${totalEleves||0} rendu(s)</span>
      <span style="display:flex;gap:6px;flex:none;">
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="openDevoirSubmissions('${d.id}')"><span class=gicon>visibility</span> Voir les rendus</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="deleteDevoirPrompt('${d.id}')"><span class=gicon>delete</span> Supprimer</button>
      </span>
    </div>`;
  }));
  el.innerHTML = rows.join('');
}
async function deleteDevoirPrompt(devoirId){
  if(!(await niceConfirm('Supprimer ce devoir et tous ses rendus ?'))) return;
  await sb.from('devoirs_rendus').delete().eq('devoir_id', devoirId);
  await sb.from('devoirs').delete().eq('id', devoirId);
  await refreshDevoirsProfListing();
}
/* Ouvre la liste des élèves de la classe concernée par ce devoir, avec leur rendu (fichier
   téléchargeable, ou figure affichée directement), et un champ note/commentaire éditable. */
async function openDevoirSubmissions(devoirId){
  const { data: devoir } = await sb.from('devoirs').select('*, classes(nom,niveau)').eq('id', devoirId).single();
  if(!devoir) return;
  const { data: eleves } = await sb.from('class_students').select('profiles(id,nom)').eq('class_id', devoir.class_id);
  const { data: rendus } = await sb.from('devoirs_rendus').select('*').eq('devoir_id', devoirId);
  const rendusByStudent = new Map((rendus||[]).map(r=>[r.student_id, r]));
  // Cache en mémoire (par id élève) : embarquer le JSON directement dans l'attribut HTML
  // onclick cassait l'attribut (les guillemets du JSON entraient en conflit avec ceux de
  // l'attribut, signalé : "je n'arrive pas à ouvrir la figure de l'élève").
  window._devoirFiguresCache = window._devoirFiguresCache || {};
  (rendus||[]).forEach(r=>{ if(r.type==='figure') window._devoirFiguresCache[r.student_id] = r.figure_data; });
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '300';
  const rows = (eleves||[]).map(row=>{
    const eleve = row.profiles; if(!eleve) return '';
    const rendu = rendusByStudent.get(eleve.id);
    let content;
    if(!rendu) content = '<span class="hint">Pas encore rendu.</span>';
    else if(rendu.type==='figure') content = `<button class="btn secondary" style="font-size:.72rem;padding:3px 8px;" onclick="previewDevoirFigure('${eleve.id}')"><span class=gicon>visibility</span> Voir la figure</button>`;
    else content = `<button class="btn secondary" style="font-size:.72rem;padding:3px 8px;" onclick="downloadDevoirFile('${rendu.fichier_path}')"><span class=gicon>download</span> Télécharger le fichier</button>`;
    return `<div style="padding:8px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span><b>${escapeHtml(eleve.nom||'(sans nom)')}</b></span>
        <span>${content}</span>
      </div>
      ${rendu ? `<div class="tool-row" style="margin-top:6px;">
        <input type="number" step="0.5" min="0" max="20" placeholder="Note /20" value="${rendu.note??''}" style="width:80px;" id="devoirNote_${eleve.id}">
        <input type="text" placeholder="Commentaire" value="${escapeHtml(rendu.commentaire_prof||'')}" style="flex:1;min-width:160px;" id="devoirComment_${eleve.id}">
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="saveDevoirFeedback('${rendu.id}','${eleve.id}')">Enregistrer</button>
      </div>` : ''}
    </div>`;
  }).join('');
  overlay.innerHTML = `
    <div class="modal-card" style="max-width:560px;max-height:80vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">${escapeHtml(devoir.titre)}</strong>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><span class=gicon>close</span></button>
      </div>
      <p class="hint" style="margin:0 0 12px;">${escapeHtml(devoir.consigne)}</p>
      ${rows || '<p class="hint">Aucun élève dans cette classe.</p>'}
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
}
async function saveDevoirFeedback(renduId, studentId){
  const note = document.getElementById('devoirNote_'+studentId).value;
  const commentaire = document.getElementById('devoirComment_'+studentId).value.trim();
  await sb.from('devoirs_rendus').update({ note: note?+note:null, commentaire_prof: commentaire||null }).eq('id', renduId);
}
async function downloadDevoirFile(path){
  const { data, error } = await sb.storage.from('devoirs-rendus').createSignedUrl(path, 60);
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  window.open(data.signedUrl, '_blank');
}
/* Affiche la figure rendue par l'élève en lecture seule, dans l'outil figure lui-même. */
function previewDevoirFigure(studentId){
  const data = (window._devoirFiguresCache||{})[studentId];
  if(!data) return;
  openFigureTool();
  figState.points = JSON.parse(JSON.stringify(data.points||[]));
  figState.shapes = JSON.parse(JSON.stringify(data.shapes||[]));
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
}

/* ================= CÔTÉ ÉLÈVE ================= */
let currentDevoirSubmission = null; // {devoirId} -- suivi pendant la construction d'une figure à rendre
async function renderDevoirsEleve(){
  const el = document.getElementById('devoirsEleveListing');
  el.innerHTML = '<p class="hint">Chargement…</p>';
  const classIds = (accountClassesList||[]).map(c=>c.id);
  if(!classIds.length){ el.innerHTML = '<p class="hint">Aucune classe associée à ce compte.</p>'; return; }
  const { data: devoirsList, error } = await sb.from('devoirs')
    .select('id,titre,consigne,date_limite,teacher_id,profiles(nom)')
    .in('class_id', classIds).order('date_limite',{ascending:true, nullsFirst:false});
  if(error){ el.innerHTML = 'Erreur : '+error.message; return; }
  if(!devoirsList || !devoirsList.length){ el.innerHTML = '<p class="hint">Aucun devoir pour l\'instant.</p>'; return; }
  const { data: mesRendus } = await sb.from('devoirs_rendus').select('*').eq('student_id', currentUser.id);
  const renduByDevoir = new Map((mesRendus||[]).map(r=>[r.devoir_id, r]));
  el.innerHTML = devoirsList.map(d=>{
    const rendu = renduByDevoir.get(d.id);
    const dateStr = d.date_limite ? new Date(d.date_limite).toLocaleDateString('fr-FR') : '';
    const statusBadge = rendu
      ? `<span style="color:#1F7A4D;font-weight:700;">[Rendu${rendu.note!=null ? ' -- note : '+rendu.note+'/20' : ''}]</span>`
      : `<span style="color:#B8860B;font-weight:700;">[À rendre]</span>`;
    return `<div class="tool-shell" style="margin-top:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span><b>${escapeHtml(d.titre)}</b>${dateStr?' · limite : '+dateStr:''} ${statusBadge}</span>
      </div>
      <p class="hint" style="margin:6px 0;">${escapeHtml(d.consigne)}</p>
      ${rendu && rendu.commentaire_prof ? `<p class="hint" style="margin:0 0 8px;"><b>Commentaire du prof :</b> ${escapeHtml(rendu.commentaire_prof)}</p>` : ''}
      <div class="tool-row">
        <input type="file" id="devoirFile_${d.id}" style="max-width:220px;">
        <button class="btn secondary" onclick="submitDevoirFile('${d.id}')"><span class=gicon>upload_file</span> Rendre ce fichier</button>
        <button class="btn secondary" onclick="startDevoirFigure('${d.id}')"><span class=gicon>draw</span> Construire une figure</button>
      </div>
      <span class="hint" id="devoirSubmitStatus_${d.id}" style="margin:0;"></span>
    </div>`;
  }).join('');
}
async function submitDevoirFile(devoirId){
  const status = document.getElementById('devoirSubmitStatus_'+devoirId);
  const input = document.getElementById('devoirFile_'+devoirId);
  const file = input.files[0];
  if(!file){ status.textContent = 'Choisissez un fichier.'; return; }
  status.textContent = 'Envoi…';
  const path = `${currentUser.id}/${devoirId}-${Date.now()}-${file.name}`;
  const { error: uploadError } = await sb.storage.from('devoirs-rendus').upload(path, file);
  if(uploadError){ status.textContent = 'Erreur : '+uploadError.message; return; }
  const { error } = await sb.from('devoirs_rendus').upsert({
    devoir_id: devoirId, student_id: currentUser.id, type:'fichier', fichier_path: path, submitted_at: new Date().toISOString(),
  }, { onConflict: 'devoir_id,student_id' });
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  status.textContent = '✓ Fichier rendu.';
  await renderDevoirsEleve();
}
/* Ouvre l'outil figure en mode "rendu de devoir" : un bouton "Rendre ce devoir" apparaît dans
   le panneau tant que ce contexte est actif (voir outils-figures.js). */
function startDevoirFigure(devoirId){
  currentDevoirSubmission = { devoirId };
  openFigureTool();
  // "Valider et insérer la figure" n'a pas de sens dans ce contexte (rien à insérer dans un
  // cahier) -- remplacé par "Rendre le devoir" + "Charger mon dernier rendu" (pour reprendre
  // un travail déjà commencé).
  const validateBtn = document.getElementById('figValidateBtn');
  const submitBtn = document.getElementById('figSubmitDevoirBtn');
  const loadBtn = document.getElementById('figLoadDevoirBtn');
  if(validateBtn) validateBtn.style.display = 'none';
  if(submitBtn) submitBtn.style.display = 'inline-flex';
  if(loadBtn) loadBtn.style.display = 'inline-flex';
  // Construction automatique/IA masquée : l'élève doit construire la figure lui-même.
  const enonceRow = document.getElementById('figEnonceIaRow');
  const enonceHint = document.getElementById('figEnonceIaHint');
  if(enonceRow) enonceRow.style.display = 'none';
  if(enonceHint) enonceHint.style.display = 'none';
}
/* Recharge le dernier rendu (figure) de l'élève pour CE devoir, pour reprendre un travail
   déjà commencé plutôt que de repartir de zéro. */
async function loadMyDevoirFigure(){
  if(!currentDevoirSubmission) return;
  const { data: rendu, error } = await sb.from('devoirs_rendus').select('type,figure_data')
    .eq('devoir_id', currentDevoirSubmission.devoirId).eq('student_id', currentUser.id).maybeSingle();
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  if(!rendu || rendu.type!=='figure' || !rendu.figure_data){ await niceAlert('Aucun rendu (figure) précédent trouvé pour ce devoir.'); return; }
  figState.points = JSON.parse(JSON.stringify(rendu.figure_data.points||[]));
  figState.shapes = JSON.parse(JSON.stringify(rendu.figure_data.shapes||[]));
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
}
async function submitCurrentFigureAsDevoir(){
  if(!currentDevoirSubmission) return;
  const { devoirId } = currentDevoirSubmission;
  const snapshot = JSON.parse(JSON.stringify({points:figState.points, shapes:figState.shapes}));
  const { error } = await sb.from('devoirs_rendus').upsert({
    devoir_id: devoirId, student_id: currentUser.id, type:'figure', figure_data: snapshot, submitted_at: new Date().toISOString(),
  }, { onConflict: 'devoir_id,student_id' });
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  currentDevoirSubmission = null;
  closeFigureTool();
  await niceAlert('Figure rendue avec succès.');
  await renderDevoirsEleve();
}

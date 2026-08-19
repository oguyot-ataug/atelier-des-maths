/* =====================================================================
   EVALUATION.JS -- Créer une évaluation (L'Atelier des Maths)

   Extrait de index.html (markup de #view-evaluation et des modales
   evalShare/evalList/evalPreview) et app.js (logique) -- même pattern
   que admin.js et outils-figures.js. #niceModalOverlay N'EST PAS
   déplacée ici : c'est une modale générique (niceAlert/niceConfirm/
   nicePrompt) partagée par tout le site, elle reste dans index.html.

   Chargé en <script defer> APRÈS app.js ET outils-figures.js (dont ce
   fichier dépend pour toolButtonsHTML, blocksRowsHTML, blocksStores,
   addPendingBlock, escapeHtml, katexSpan, renderMathText, niceAlert,
   niceConfirm, nicePrompt, callClaude, currentUser, sb, CH6, CH5,
   currentChapterTitle).

   evaluationExercises (déclarée ici avec let) est référencée depuis
   app.js par getExerciseByCtx() -- ça fonctionne car tous les
   <script> classiques d'une même page partagent le même scope lexical
   global, quel que soit l'ordre de chargement, du moment que le
   fichier est chargé avant le premier clic utilisateur qui déclenche
   cette lecture.
   ===================================================================== */

document.getElementById('view-evaluation').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;">Créer une évaluation</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Décrivez le cadre de l'évaluation, laissez l'IA proposer des exercices variés (ou rédigez-les vous-même), puis générez la feuille à distribuer aux élèves.</p>

  <div class="tool-shell">
    <div class="tool-row" style="margin-bottom:10px;">
      <label class="hint" style="margin:0;">Niveau :
        <select id="evalNiveau" onchange="renderEvalChapPicker()" style="margin-left:4px;">
          <option value="6e">6e</option>
          <option value="5e">5e</option>
        </select>
      </label>
      <label class="hint" style="margin:0;">Classe(s) : <input type="text" id="evalClasses" placeholder="ex. 6e A, 6e B" style="width:140px;margin-left:4px;"></label>
      <label class="hint" style="margin:0;">Date prévue : <input type="date" id="evalDate" style="margin-left:4px;"></label>
      <label class="hint" style="margin:0;">Durée (min) : <input type="number" id="evalDuree" value="55" min="5" style="width:70px;margin-left:4px;"></label>
      <label class="hint" style="margin:0;">Type :
        <select id="evalType" style="margin-left:4px;" onchange="document.getElementById('evalTypeCustom').style.display = this.value==='__custom' ? 'inline-block' : 'none';">
          <option value="Évaluation">Évaluation</option>
          <option value="Interrogation">Interrogation</option>
          <option value="Devoir Maison">Devoir Maison</option>
          <option value="Devoir Surveillé">Devoir Surveillé</option>
          <option value="Bac Blanc">Bac Blanc</option>
          <option value="__custom">Autre (à préciser)…</option>
        </select>
        <input type="text" id="evalTypeCustom" placeholder="Titre libre" style="display:none;width:140px;margin-left:4px;">
      </label>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <label class="hint" style="margin:0;"><input type="checkbox" id="evalUseAI" onchange="toggleEvalAIOptions()"> 🤖 Laisser l'IA proposer des exercices</label>
      <button class="btn secondary" onclick="addManualExercise()">+ Ajouter un exercice vierge</button>
      <button class="btn secondary" onclick="openEvalPreview()">👁️ Aperçu de l'évaluation</button>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <button class="btn" onclick="saveEvaluation()">💾 Sauvegarder</button>
      <button class="btn secondary" onclick="openEvalListModal()">📂 Mes évaluations</button>
      <button class="btn secondary" onclick="shareEvaluation()">🔗 Partager avec un collègue</button>
      <span class="hint" id="evalSaveStatus" style="margin:0;"></span>
    </div>
    <div id="evalAIOptions" style="display:none;">
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Nombre d'exercices : <input type="number" id="evalNbExo" value="4" min="1" max="10" style="width:55px;margin-left:4px;"></label>
        <label class="hint" style="margin:0;"><input type="checkbox" id="evalQuestionCours"> Inclure une question de cours (restituer une définition/propriété, sans calcul)</label>
      </div>
      <p class="hint" style="margin:0 0 6px;">Chapitres concernés :</p>
      <div id="evalChapPicker" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;"></div>
      <div class="figure-toolbar">
        <button class="btn orange" onclick="generateEvaluationAI()" id="btnEvalAI">🤖 Générer les exercices avec l'IA</button>
      </div>
      <p class="hint" id="evalAIStatus" style="margin:8px 0 0;"></p>
    </div>
  </div>

  <p class="hint" id="evalBaremeTotal" style="margin:14px 0 0;font-weight:700;"></p>
  <div id="evalExercicesList"></div>

  <div class="tool-row" style="margin-top:10px;">
    <button class="btn orange" onclick="exportEvaluationPDF()">🖨️ Imprimer / Enregistrer en PDF</button>
    <button class="btn secondary" onclick="clearEvaluation()">Tout effacer</button>
  </div>`;

document.body.insertAdjacentHTML('beforeend', `
<div id="evalShareModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalShareModal();">
  <div class="modal-card" style="max-width:480px;max-height:80vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Partager avec un collègue</strong>
      <button class="modal-close" onclick="closeEvalShareModal()">✕</button>
    </div>
    <div id="evalShareContent"></div>
  </div>
</div>
<div id="evalListModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalListModal();">
  <div class="modal-card" style="max-width:560px;max-height:80vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Mes évaluations</strong>
      <button class="modal-close" onclick="closeEvalListModal()">✕</button>
    </div>
    <div id="evalListContent"></div>
  </div>
</div>
<div id="evalPreviewModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalPreview();">
  <div class="modal-card" style="max-width:760px;max-height:88vh;overflow:auto;background:#EDEFF2;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Évaluation</strong>
      <button class="modal-close" onclick="closeEvalPreview()">✕</button>
    </div>
    <div style="position:relative;width:700px;max-width:100%;margin:0 auto;">
      <div id="evalPreviewContent" style="font-family:Inter,sans-serif;color:#20242E;line-height:1.7;font-size:12.5pt;width:700px;padding:10px;box-sizing:border-box;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12);position:relative;"></div>
      <div id="evalPreviewPageMarks" style="position:absolute;top:0;left:0;width:700px;pointer-events:none;"></div>
    </div>
  </div>
</div>`);

/* ============================================================
   CRÉER UNE ÉVALUATION
   -----------------------------------------------------------
   Première version : cadrage (niveau, chapitres, durée, nombre
   d'exercices, question de cours), génération des ÉNONCÉS par IA
   (réutilise callClaude, déjà utilisé pour l'interprétation de
   figures), et export PDF de la feuille à distribuer aux élèves.
   Les énoncés profitent de la même mise en forme automatique que
   l'outil de correction (renderMathText : fractions, exposants,
   variables...). Les ajouts (figure/tableau/division/repère...) et
   la mise en page multi-colonnes par exercice ne sont pas encore
   câblés ici : à construire dans une prochaine session.
   ============================================================ */
let evaluationExercises = [];
let currentEvaluationId = null;

/* Sauvegarde/chargement/partage : réutilise le compte prof déjà connecté (currentUser, sb).
   Une évaluation sauvegardée peut être rouverte par son propriétaire, ou par un collègue à qui
   elle a été explicitement partagée (table evaluations, RLS + collaborators côté serveur). */
let lastEvaluationTitle = null;
async function saveEvaluation(){
  if(!currentUser){ await niceAlert("Connectez-vous (en tant que professeur) pour sauvegarder cette évaluation."); return; }
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de sauvegarder."); return; }
  const defaultTitle = lastEvaluationTitle || document.getElementById('evalClasses').value.trim() || ('Évaluation '+document.getElementById('evalNiveau').value);
  const title = await nicePrompt("Titre de cette évaluation (pour la retrouver dans « Mes évaluations ») :", defaultTitle);
  if(title===null) return;
  lastEvaluationTitle = title || defaultTitle;
  const relevantBlocks = {};
  evaluationExercises.forEach(ex=>{ const k='ex-'+ex.id; if(blocksStores[k]) relevantBlocks[k]=blocksStores[k]; });
  const payload = {
    title: title || defaultTitle,
    niveau: document.getElementById('evalNiveau').value,
    classes: document.getElementById('evalClasses').value,
    eval_date: document.getElementById('evalDate').value || null,
    duree: parseInt(document.getElementById('evalDuree').value) || null,
    data: { evaluationExercises, blocksStores: relevantBlocks, evalType: document.getElementById('evalType').value, evalTypeCustom: document.getElementById('evalTypeCustom').value },
  };
  const statusEl = document.getElementById('evalSaveStatus');
  statusEl.textContent = "Sauvegarde en cours…";
  try{
    if(currentEvaluationId){
      const { error } = await sb.from('evaluations').update({...payload, updated_at: new Date().toISOString()}).eq('id', currentEvaluationId);
      if(error) throw error;
    } else {
      const { data, error } = await sb.from('evaluations').insert({...payload, owner_id: currentUser.id}).select().single();
      if(error) throw error;
      currentEvaluationId = data.id;
    }
    statusEl.textContent = "✓ Sauvegardé";
  }catch(e){
    statusEl.textContent = '';
    await niceAlert("Échec de la sauvegarde : "+(e.message||'erreur inconnue'));
  }
}
async function openEvalListModal(){
  if(!currentUser){ await niceAlert("Connectez-vous pour voir vos évaluations sauvegardées."); return; }
  document.getElementById('evalListModalOverlay').style.display='flex';
  const box = document.getElementById('evalListContent');
  box.innerHTML = 'Chargement…';
  const { data, error } = await sb.from('evaluations').select('id,title,niveau,classes,eval_date,owner_id,collaborators,viewers,updated_at').order('updated_at', {ascending:false});
  if(error){ box.innerHTML = "Erreur : "+error.message; return; }
  if(!data || !data.length){ box.innerHTML = "Aucune évaluation sauvegardée pour le moment."; return; }
  box.innerHTML = data.map(e=>{
    const isMine = e.owner_id===currentUser.id;
    const shareTag = isMine ? '' : (e.collaborators||[]).includes(currentUser.id) ? '<span class="hint">(partagée — ✏️ éditeur)</span>' : '<span class="hint">(partagée — 👁️ lecteur)</span>';
    const dateFmt = e.eval_date ? new Date(e.eval_date+'T00:00:00').toLocaleDateString('fr-FR') : '';
    return `<div class="tool-shell" style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <div>
        <strong>${escapeHtml(e.title||'Sans titre')}</strong> ${shareTag}<br>
        <span class="hint">${escapeHtml(e.niveau||'')}${e.classes?' — '+escapeHtml(e.classes):''}${dateFmt?' · '+dateFmt:''}</span>
      </div>
      <button class="btn secondary" onclick="loadEvaluation('${e.id}')">Ouvrir</button>
    </div>`;
  }).join('');
}
function closeEvalListModal(){ document.getElementById('evalListModalOverlay').style.display='none'; }
async function loadEvaluation(id){
  const { data, error } = await sb.from('evaluations').select('*').eq('id', id).single();
  if(error){ await niceAlert("Échec du chargement : "+error.message); return; }
  currentEvaluationId = data.id;
  lastEvaluationTitle = data.title || null;
  document.getElementById('evalNiveau').value = data.niveau || '6e';
  document.getElementById('evalClasses').value = data.classes || '';
  document.getElementById('evalDate').value = data.eval_date || '';
  document.getElementById('evalDuree').value = data.duree || 55;
  const savedType = (data.data && data.data.evalType) || 'Évaluation';
  const typeSelect = document.getElementById('evalType');
  typeSelect.value = Array.from(typeSelect.options).some(o=>o.value===savedType) ? savedType : '__custom';
  document.getElementById('evalTypeCustom').value = (data.data && data.data.evalTypeCustom) || (typeSelect.value==='__custom' ? savedType : '');
  document.getElementById('evalTypeCustom').style.display = typeSelect.value==='__custom' ? 'inline-block' : 'none';
  evaluationExercises = (data.data && data.data.evaluationExercises) || [];
  Object.assign(blocksStores, (data.data && data.data.blocksStores) || {});
  evalNextExoId = Math.max(1, ...evaluationExercises.map(e=>e.id+1), evalNextExoId);
  pendingBlockNextId = Math.max(pendingBlockNextId, ...Object.values(blocksStores).flat().map(b=>b.id+1));
  // Migration : les évaluations sauvegardées avant la fusion du texte principal avec le
  // système de blocs stockaient l'énoncé à part (ex.text). On le convertit en bloc texte
  // (une seule fois) pour ne rien perdre, puis on vide le champ devenu obsolète.
  evaluationExercises.forEach(ex=>{
    if(ex.text && ex.text.trim()){
      pushTextBlockForExercise(ex.id, ex.text);
      ex.text = '';
    }
  });
  renderEvalChapPicker();
  renderEvalExercicesList();
  closeEvalListModal();
  document.getElementById('evalSaveStatus').textContent = "✓ Évaluation chargée";
}
async function shareEvaluation(){
  if(!currentEvaluationId){ await niceAlert("Sauvegardez d'abord cette évaluation (bouton 💾) avant de la partager."); return; }
  document.getElementById('evalShareModalOverlay').style.display='flex';
  const box = document.getElementById('evalShareContent');
  box.innerHTML = 'Chargement…';
  const { data, error } = await sb.rpc('list_colleagues_same_uai', {p_eval_id: currentEvaluationId});
  if(error){ box.innerHTML = "Erreur : "+error.message; return; }
  const roleLabel = r => r==='editor' ? '✏️ Éditeur' : r==='reader' ? '👁️ Lecteur' : '';
  let html = '';
  if(!data || !data.length){
    html += `<p class="hint" style="margin:0 0 14px;">Aucun collègue trouvé dans votre établissement (UAI non renseigné, ou personne d'autre enregistré avec le même UAI). Vous pouvez tout de même partager par e-mail ci-dessous.</p>`;
  } else {
    html += `<p class="hint" style="margin:0 0 10px;">Collègues de votre établissement :</p>`;
    html += data.map(c=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(28,43,57,.08);gap:8px;flex-wrap:wrap;">
        <span>${escapeHtml(c.nom||c.email||'')}</span>
        ${c.share_role ? `
          <span style="display:flex;align-items:center;gap:6px;">
            <span class="hint" style="margin:0;">${roleLabel(c.share_role)}</span>
            <button class="btn secondary" style="font-size:.75rem;padding:3px 8px;" onclick="unshareEvaluationWith('${c.id}')">Retirer</button>
          </span>
        ` : `
          <span style="display:flex;gap:6px;">
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','reader')">👁️ Lecteur</button>
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','editor')">✏️ Éditeur</button>
          </span>
        `}
      </div>
    `).join('');
  }
  html += `
    <p class="hint" style="margin:16px 0 6px;">Ou par e-mail :</p>
    <div class="tool-row" style="margin-bottom:0;">
      <input type="text" id="evalShareEmail" placeholder="e-mail d'un collègue" style="flex:1;min-width:180px;">
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'reader')">👁️ Lecteur</button>
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'editor')">✏️ Éditeur</button>
    </div>
    <p class="hint" style="margin:8px 0 0;">👁️ Lecteur : peut consulter et imprimer. ✏️ Éditeur : peut aussi modifier. Vous restez seul·e propriétaire (personne d'autre ne peut supprimer l'évaluation).</p>
    <p class="hint" id="evalShareStatus" style="margin:8px 0 0;"></p>
  `;
  box.innerHTML = html;
}
function closeEvalShareModal(){ document.getElementById('evalShareModalOverlay').style.display='none'; }
async function shareEvaluationWith(email, role){
  if(!email) return;
  const statusEl = document.getElementById('evalShareStatus');
  const { data, error } = await sb.rpc('evaluations_add_collaborator', {p_eval_id: currentEvaluationId, p_email: email, p_role: role||'editor'});
  if(error){ if(statusEl) statusEl.textContent = "Erreur : "+error.message; return; }
  if(data==='ok') shareEvaluation(); // rafraîchit la liste (le collègue apparaît maintenant avec son rôle)
  else if(statusEl) statusEl.textContent = data;
}
async function unshareEvaluationWith(userId){
  const { data, error } = await sb.rpc('evaluations_remove_collaborator', {p_eval_id: currentEvaluationId, p_user_id: userId});
  const statusEl = document.getElementById('evalShareStatus');
  if(error){ if(statusEl) statusEl.textContent = "Erreur : "+error.message; return; }
  if(data==='ok') shareEvaluation();
  else if(statusEl) statusEl.textContent = data;
}
let evalNextExoId = 1;

function initEvaluationView(){
  renderEvalChapPicker();
  renderEvalExercicesList();
}
function renderEvalChapPicker(){
  const niveau = document.getElementById('evalNiveau').value;
  const list = niveau==='6e' ? CH6 : CH5;
  const box = document.getElementById('evalChapPicker');
  const seen = new Set();
  box.innerHTML = list.filter(c=>{ if(seen.has(c.t)) return false; seen.add(c.t); return true; }).map(c=>`
    <label style="display:inline-flex;align-items:center;gap:5px;background:rgba(28,43,57,.04);padding:5px 10px;border-radius:20px;font-size:.85rem;cursor:pointer;">
      <input type="checkbox" class="evalChapCheck" value="${escapeHtml(c.t)}"> ${escapeHtml(c.code)} — ${escapeHtml(c.t)}
    </label>
  `).join('');
}
function getSelectedEvalChapitres(){
  return Array.from(document.querySelectorAll('.evalChapCheck:checked')).map(el=>el.value);
}
function evaluationPrompt(niveau, chapitres, nbExo, duree, questionCours){
  return `Tu es un professeur de mathématiques qui prépare une évaluation pour une classe de ${niveau}.
Chapitres concernés : ${chapitres.join(', ')}.
Durée prévue : ${duree} minutes. Rédige exactement ${nbExo} énoncés d'exercices${questionCours ? ', le PREMIER étant une question de cours (restituer une définition, une propriété ou une méthode vue en classe, sans aucun calcul)' : ''}, variés et progressifs (du plus simple au plus complexe), correspondant aux chapitres indiqués, adaptés au niveau ${niveau}.

Conventions d'écriture à respecter strictement :
- Jamais de tiret cadratin "—".
- Les fractions s'écrivent avec une simple barre oblique (ex. 3/4), jamais en LaTeX ni avec \\dfrac.
- Les divisions s'écrivent avec ":" et non "÷".
- N'inclus pas la correction, seulement l'énoncé destiné aux élèves.

Réponds UNIQUEMENT par un tableau JSON de chaînes de caractères, un élément par exercice, sans aucun texte ni balise autour. Exemple strict de format : ["Énoncé du premier exercice...", "Énoncé du second exercice..."]`;
}
/* Convertit un texte en bloc "texte" (ligne 0, colonne 0) pour un exercice donné : réutilisé
   par la génération IA (qui produit directement un énoncé) et par la migration des anciennes
   évaluations sauvegardées (qui stockaient l'énoncé à part, avant la fusion avec les blocs). */
function pushTextBlockForExercise(exId, text){
  if(!text || !text.trim()) return;
  const ctx = 'ex-'+exId;
  const html = `<div style="padding:4px 0;">${renderMathText(text)}</div>`;
  (blocksStores[ctx] || (blocksStores[ctx]=[])).push({id: pendingBlockNextId++, type:'texte', html, data:{text}, editFn:'reopenTextBlock', ctx, col:0, row:0});
}
async function generateEvaluationAI(){
  const statusEl = document.getElementById('evalAIStatus');
  const niveau = document.getElementById('evalNiveau').value;
  const chapitres = getSelectedEvalChapitres();
  const nbExo = parseInt(document.getElementById('evalNbExo').value)||4;
  const duree = parseInt(document.getElementById('evalDuree').value)||55;
  const questionCours = document.getElementById('evalQuestionCours').checked;
  if(!chapitres.length){ statusEl.textContent = "Sélectionnez au moins un chapitre."; return; }
  if(!currentUser){ statusEl.textContent = "Connectez-vous pour utiliser la génération par IA."; return; }
  statusEl.textContent = "Génération en cours…";
  document.getElementById('btnEvalAI').disabled = true;
  try{
    const raw = await callClaude(evaluationPrompt(niveau, chapitres, nbExo, duree, questionCours), 2200, {feature:'evaluation', niveau});
    const match = raw.match(/\[[\s\S]*\]/);
    if(!match) throw new Error('no-json');
    const list = JSON.parse(match[0]);
    list.forEach(text => {
      const id = evalNextExoId++;
      evaluationExercises.push({id, text:'', title:'', bareme:null, rows:[1]});
      pushTextBlockForExercise(id, String(text));
    });
    renderEvalExercicesList();
    statusEl.textContent = `${list.length} exercice(s) généré(s) par l'IA — à relire et ajuster avant impression.`;
  }catch(err){
    statusEl.textContent = err.message==='no-session' ? "Connectez-vous pour utiliser la génération par IA." : "Échec de la génération (réseau, ou réponse inattendue). Réessayez, ou ajoutez un exercice manuellement.";
  }
  document.getElementById('btnEvalAI').disabled = false;
}
function toggleEvalAIOptions(){
  const on = document.getElementById('evalUseAI').checked;
  document.getElementById('evalAIOptions').style.display = on ? 'block' : 'none';
}
function evalBaremeTotal(){
  return evaluationExercises.reduce((sum,ex)=>sum + (parseFloat(ex.bareme)||0), 0);
}
function updateEvalBaremeTotalDisplay(){
  const el = document.getElementById('evalBaremeTotal');
  if(!el) return;
  const total = evalBaremeTotal();
  el.textContent = evaluationExercises.length ? `Barème total : ${total} point${total>1?'s':''}` : '';
}
function renderEvalExercicesList(){
  const box = document.getElementById('evalExercicesList');
  if(!box) return;
  updateEvalBaremeTotalDisplay();
  if(!evaluationExercises.length){ box.innerHTML = ''; return; }
  box.innerHTML = evaluationExercises.map((ex,i)=>{
    const ctx = 'ex-'+ex.id;
    ensureExRows(ex);
    const hasDisks = (blocksStores[ctx]||[]).some(b=>b.type==='disque');
    const hasRects = (blocksStores[ctx]||[]).some(b=>b.type==='rectFrac');
    if(ex.validated){
      // Vue compacte : uniquement le résultat final tel qu'il sera imprimé, sans aucun des
      // outils/menus d'édition -- pour une lecture d'ensemble agréable une fois l'exercice
      // terminé. On peut réorganiser l'ordre directement ici ; modifier ou supprimer se fait
      // en repassant par l'édition (bouton ✏️), pour éviter une suppression accidentelle.
      return `
      <div class="tool-shell" style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <strong style="font-family:'Space Grotesk',sans-serif;">Exercice ${i+1}${ex.title?' — '+escapeHtml(ex.title):''}</strong>
          <span style="display:flex;gap:6px;align-items:center;">
            ${ex.bareme ? `<span class="hint" style="margin:0;">${ex.bareme} pt(s)</span>` : ''}
            <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
            <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
            <button type="button" onclick="editEvalExercice(${ex.id})" title="Modifier ou supprimer" style="border:none;background:rgba(31,58,92,.08);border-radius:6px;padding:4px 10px;cursor:pointer;">✏️ Éditer</button>
          </span>
        </div>
        <div>${blocksRowsHTML(ctx, ex.rows, false, ex.cellBorders)}</div>
      </div>
    `;
    }
    return `
    <div class="tool-shell" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exercice ${i+1}</strong>
        <span style="display:flex;gap:6px;align-items:center;">
          <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
          <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
          <button type="button" onclick="validateEvalExercice(${ex.id})" title="Aperçu final, sans les outils" style="border:none;background:rgba(35,140,90,.12);color:#1F7A4D;border-radius:6px;padding:3px 9px;cursor:pointer;">✓ Valider</button>
          <button type="button" onclick="removeEvalExercice(${ex.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕ Supprimer l'exercice</button>
        </span>
      </div>
      <div class="tool-row" style="margin-bottom:8px;">
        <input type="text" placeholder="Titre de l'exercice (facultatif)" value="${escapeHtml(ex.title||'')}" oninput="updateEvalExerciceField(${ex.id},'title',this.value)" style="flex:1;min-width:200px;padding:7px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);">
        <label class="hint" style="margin:0;">Barème : <input type="number" min="0" step="0.5" value="${ex.bareme!=null?ex.bareme:''}" oninput="updateEvalExerciceField(${ex.id},'bareme',this.value)" style="width:60px;margin-left:4px;"> pt(s)</label>
      </div>
      <div class="eval-blocks-preview" style="margin-top:4px;">${blocksRowsHTML(ctx, ensureExRows(ex), true, ex.cellBorders)}</div>
      <div class="tool-row" style="margin-top:10px;align-items:center;flex-wrap:wrap;">
        <span class="hint" style="margin:0;">Mise en page :</span>
        ${ex.rows.map((nc,rowIdx)=>`
          <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(28,43,57,.04);padding:3px 8px 3px 10px;border-radius:14px;">
            <span class="hint" style="margin:0;">L${rowIdx+1} :</span>
            <input type="number" min="1" max="6" value="${nc}" onchange="setEvalRowCols(${ex.id},${rowIdx},parseInt(this.value)||1)" style="width:38px;">
            ${ex.rows.length>1 ? `<button type="button" onclick="removeEvalRow(${ex.id},${rowIdx})" title="Retirer cette ligne" style="border:none;background:none;cursor:pointer;color:#D93025;font-size:.9rem;">✕</button>` : ''}
          </span>
        `).join('')}
        <button type="button" class="btn secondary" onclick="addEvalRow(${ex.id})" style="font-size:.78rem;padding:4px 10px;">+ Nouvelle ligne</button>
        ${hasDisks ? `<label class="hint" style="margin:0;">🥧 Taille des disques : <input type="number" min="30" max="300" step="10" value="${ex.diskSize||150}" onchange="updateEvalExerciceField(${ex.id},'diskSize',parseInt(this.value)||150); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
        ${hasRects ? `<label class="hint" style="margin:0;">▭ Taille des rectangles : <input type="number" min="30" max="350" step="10" value="${ex.rectSize||180}" onchange="updateEvalExerciceField(${ex.id},'rectSize',parseInt(this.value)||180); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
      </div>
      <p class="hint" style="margin:4px 0 0;">Fais glisser un bloc pour changer sa ligne/colonne (utilise les outils ci-dessous pour en ajouter, y compris du texte).</p>
      <div class="tool-row" style="margin-top:6px;">${toolButtonsHTML(ctx)}</div>
    </div>
  `;}).join('');
  attachResizeObservers();
}
/* Migre l'ancien réglage (ex.nCols, une seule ligne) vers le nouveau système multi-lignes
   (ex.rows, un nombre de colonnes par ligne) si besoin, et renvoie toujours ex.rows. */
function ensureExRows(ex){
  if(!ex.rows || !ex.rows.length) ex.rows = [ex.nCols||1];
  return ex.rows;
}
function setEvalRowCols(id, rowIdx, n){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex){ ensureExRows(ex); ex.rows[rowIdx] = Math.max(1, Math.min(6, n)); }
  renderEvalExercicesList();
}
function addEvalRow(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex){ ensureExRows(ex); ex.rows.push(1); }
  renderEvalExercicesList();
}
function removeEvalRow(id, rowIdx){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(!ex) return;
  ensureExRows(ex);
  if(ex.rows.length<=1) return;
  // Les blocs de la ligne retirée rejoignent la ligne précédente, pour ne pas les perdre.
  const ctx = 'ex-'+id;
  (blocksStores[ctx]||[]).forEach(b=>{
    const r = b.row||0;
    if(r===rowIdx) b.row = Math.max(0, rowIdx-1);
    else if(r>rowIdx) b.row = r-1;
  });
  ex.rows.splice(rowIdx,1);
  renderEvalExercicesList();
}
function updateEvalExerciceField(id, field, value){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex[field] = value;
  if(field==='bareme') updateEvalBaremeTotalDisplay();
}
function updateEvalExerciceText(id, text){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.text = text;
  const idx = evaluationExercises.findIndex(e=>e.id===id);
  const preview = document.querySelectorAll('#evalExercicesList .correction-preview')[idx];
  if(preview) preview.innerHTML = text.trim() ? renderMathText(text) : '';
}
async function removeEvalExercice(id){
  if(!(await niceConfirm('Supprimer définitivement cet exercice ?'))) return;
  evaluationExercises = evaluationExercises.filter(e=>e.id!==id);
  delete blocksStores['ex-'+id];
  renderEvalExercicesList();
}
function moveEvalExercice(id, dir){
  const idx = evaluationExercises.findIndex(e=>e.id===id);
  const newIdx = idx+dir;
  if(idx<0 || newIdx<0 || newIdx>=evaluationExercises.length) return;
  const [ex] = evaluationExercises.splice(idx,1);
  evaluationExercises.splice(newIdx,0,ex);
  renderEvalExercicesList();
}
function validateEvalExercice(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.validated = true;
  renderEvalExercicesList();
}
function editEvalExercice(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.validated = false;
  renderEvalExercicesList();
}
function addManualExercise(){
  evaluationExercises.push({id: evalNextExoId++, text: '', title:'', bareme:null, rows:[1]});
  renderEvalExercicesList();
}
async function clearEvaluation(){
  if(evaluationExercises.length && !(await niceConfirm('Effacer tous les exercices de cette évaluation ?'))) return;
  evaluationExercises.forEach(ex=>delete blocksStores['ex-'+ex.id]);
  evaluationExercises = [];
  currentEvaluationId = null;
  document.getElementById('evalSaveStatus').textContent = '';
  renderEvalExercicesList();
}
function buildEvaluationContentHTML(){
  const niveau = document.getElementById('evalNiveau').value;
  const classes = document.getElementById('evalClasses').value.trim();
  const date = document.getElementById('evalDate').value;
  const duree = document.getElementById('evalDuree').value;
  const dateFmt = date ? new Date(date+'T00:00:00').toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '';
  const total = evalBaremeTotal();
  const typeSel = document.getElementById('evalType').value;
  const title = (typeSel==='__custom' ? document.getElementById('evalTypeCustom').value.trim() : typeSel) || 'Évaluation';
  return `
    <div style="display:flex;justify-content:space-between;font-size:.95rem;">
      <div>${escapeHtml(classes || niveau)}</div>
      <div>${dateFmt}</div>
    </div>
    <div style="height:2.4em;"></div>
    <p style="text-align:center;font-weight:700;font-size:1.3rem;margin:0;">${escapeHtml(title)} de Mathématiques</p>
    <p style="text-align:center;font-size:.85rem;color:#5B6472;margin:4px 0 0;">${duree ? 'Durée : '+duree+' min' : ''}${total>0 ? ' · Barème : '+total+' pt(s)' : ''}</p>
    <div style="height:2.4em;"></div>
    <p style="margin:0;">NOM : .................................................... Prénom : ....................................................</p>
    <div style="height:3cm;border-top:1px solid #1C1B2E;border-bottom:1px solid #1C1B2E;margin:16px 0 24px;"></div>
    ${evaluationExercises.map((ex,i)=>`
      <div style="margin-bottom:26px;">
        <p style="font-weight:700;margin:0 0 8px;display:flex;justify-content:space-between;">
          <span>Exercice ${i+1}${ex.title ? ' — '+escapeHtml(ex.title) : ''}</span>
          ${ex.bareme ? `<span>${ex.bareme} pt(s)</span>` : ''}
        </p>
        ${blocksRowsHTML('ex-'+ex.id, ensureExRows(ex), false, ex.cellBorders)}
      </div>
    `).join('')}
  `;
}
/* Convertit un <svg> en image PNG (data URL) : html2canvas a un support natif des SVG très
   limité (page blanche ou figures manquantes selon les cas) ; une image bitmap classique se
   capture toujours correctement. */
function svgToPngDataUrl(svgEl, scale){
  return new Promise((resolve)=>{
    try{
      const rect = svgEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width || svgEl.viewBox.baseVal.width || 200));
      const h = Math.max(1, Math.round(rect.height || svgEl.viewBox.baseVal.height || 200));
      const xml = new XMLSerializer().serializeToString(svgEl);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const img = new Image();
      img.onload = ()=>{
        const canvas = document.createElement('canvas');
        canvas.width = w*scale; canvas.height = h*scale;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({dataUrl: canvas.toDataURL('image/png'), w, h});
      };
      img.onerror = ()=>resolve(null);
      img.src = 'data:image/svg+xml;base64,' + svg64;
    }catch(e){ resolve(null); }
  });
}
/* Remplace tous les <svg> d'un conteneur par l'image bitmap équivalente. */
async function replaceSvgsWithImages(container){
  const svgs = Array.from(container.querySelectorAll('svg'));
  for(const svg of svgs){
    const res = await svgToPngDataUrl(svg, 2);
    if(!res) continue;
    const img = document.createElement('img');
    img.src = res.dataUrl;
    img.style.cssText = svg.getAttribute('style') || '';
    img.width = res.w; img.height = res.h;
    svg.replaceWith(img);
  }
}
async function exportEvaluationPDF(){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de générer le PDF."); return; }
  const missing = [];
  if(!document.getElementById('evalClasses').value.trim()) missing.push('la classe');
  if(!document.getElementById('evalDate').value) missing.push('la date');
  if(missing.length && !(await niceConfirm(`Tu n'as pas renseigné ${missing.join(' ni ')}. Générer quand même la feuille d'évaluation ?`))) return;
  // La capture d'écran (html2canvas) reproduit une page blanche de façon récurrente avec ce
  // contenu, malgré plusieurs correctifs essayés. L'impression native du navigateur, elle,
  // donne un rendu fidèle et fiable : l'utilisateur choisit "Enregistrer au format PDF" comme
  // destination dans la boîte d'impression (celle-ci bloque l'onglet tant qu'elle est ouverte
  // -- comportement normal du navigateur, pas un bug).
  const w = window.open('', '_blank', 'width=900,height:700');
  if(!w){ await niceAlert("La fenêtre n'a pas pu s'ouvrir : autorisez les pop-up pour ce site, ou utilisez Ctrl/Cmd+P."); return; }
  w.document.open();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Évaluation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
    <link rel="stylesheet" href="${document.querySelector('link[href*="styles.css"]').href}">
    <style>
      @page{ size:A4; margin:15mm; }
      body{ font-family:Inter,Arial,sans-serif; color:#20242E; font-size:12.5pt; line-height:1.7; margin:0; }
      /* Important : contraint le contenu à la largeur EXACTE de la zone imprimable A4
         (210mm - 2×15mm de marge = 180mm ≈ 680px), quelle que soit la largeur réelle de
         cette fenêtre à l'écran. Sans ça, la mise en page à l'écran (calculée sur la largeur
         de la fenêtre, ex. 900px) diffère de celle utilisée au moment d'imprimer (recalculée
         sur la largeur de la page A4) -- ce qui décale la synchronisation des disques, mesurée
         avant l'impression sur une largeur qui n'est plus la bonne une fois sur le papier. */
      * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
      .print-page{ max-width:680px; margin:0 auto; }
      .nb-figure-row{ margin:6px 0; }
      svg{ max-width:100%; }
      .katex{ font-size:1.18em; }
    </style>
  </head><body><div class="print-page">${buildEvaluationContentHTML()}</div></body></html>`);
  w.document.close();
  w.onload = () => {
    // Petit délai de sécurité : laisse le temps à la mise en page de se stabiliser
    // complètement (polices, styles) avant de mesurer les disques et d'imprimer.
    setTimeout(()=>{
      syncDiskSizes(w.document);
      // Certains navigateurs figent le rendu dès l'appel à print(), avant que les styles
      // qu'on vient de modifier (taille des disques) n'aient été réellement repeints à
      // l'écran -- un double requestAnimationFrame garantit qu'un cycle de rendu complet a
      // eu lieu entre-temps.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        w.focus();
        w.print();
      }));
    }, 200);
  };
}

async function openEvalPreview(){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant l'aperçu."); return; }
  const content = document.getElementById('evalPreviewContent');
  content.innerHTML = buildEvaluationContentHTML();
  document.getElementById('evalPreviewModalOverlay').style.display='flex';
  // Repères de saut de page : la largeur de ce conteneur (700px) correspond à la largeur
  // utile du PDF (A4, marges de 10mm de chaque côté) -- on peut donc déduire la hauteur d'une
  // page dans les mêmes proportions et matérialiser où les pages se coupent réellement.
  requestAnimationFrame(()=>{
    // Important : la modale vient tout juste de devenir visible (display:flex) -- il faut
    // attendre que sa mise en page (largeur réelle du conteneur à 700px) soit stabilisée avant
    // de mesurer quoi que ce soit, sinon les disques se synchronisent sur des valeurs erronées.
    syncDiskSizes(content);
    const pxPerMm = 700/190; // largeur utile A4 (210mm - 2x10mm de marge) mise à l'échelle sur 700px
    const pageHeightPx = 277*pxPerMm; // hauteur utile A4 (297mm - 2x10mm de marge)
    const totalHeight = content.scrollHeight;
    const marks = document.getElementById('evalPreviewPageMarks');
    let html = '';
    const nPages = Math.max(1, Math.ceil(totalHeight/pageHeightPx));
    for(let p=1; p<nPages; p++){
      const y = p*pageHeightPx;
      html += `<div style="position:absolute;top:${y}px;left:0;width:100%;border-top:2px dashed #E35D3A;"></div>
        <div style="position:absolute;top:${y+4}px;left:0;background:#E35D3A;color:#fff;font-size:.7rem;padding:1px 6px;border-radius:0 4px 4px 0;font-family:'Space Grotesk',sans-serif;">Page ${p+1} →</div>`;
    }
    marks.innerHTML = html;
    marks.style.height = totalHeight+'px';
  });
}
function closeEvalPreview(){ document.getElementById('evalPreviewModalOverlay').style.display='none'; }
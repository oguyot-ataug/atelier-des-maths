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

// Contenu par défaut de la grille de notation par critères (voir grilleNotationHTML) --
// reprend telle quelle la grille utilisée par l'utilisateur, pour ne pas repartir de zéro à
// chaque évaluation. Un critère par paragraphe : "Titre : points" suivi de lignes "- item".
const DEFAULT_GRILLE_NOTATION_TEXT = `Structure et Clarté : 5
- Écrire « Mathématiques » en entier en haut de la copie.
- Indiquer clairement les exercices et numéroter les questions conformément à l'énoncé.
- Sauter une ligne après chaque exercice ou partie d'exercice.

Propreté et Soin : 6
- Pas de blanc (correcteur fluide/ruban) ni de « souris ».
- Utiliser un brouillon pour éviter les ratures. Si une rature est inévitable, la faire proprement à la règle.
- Respecter les marges : ne rien écrire dans la marge.

Mise en Valeur des Résultats : 4
- Encadrer ou souligner les résultats finaux en couleur (sauf rouge) et à la règle.
- Ne pas rédiger le texte ou les calculs en rouge (couleur réservée à la correction).

Rigueur de Rédaction & Orthographe : 5
- Ne pas utiliser le pronom « je » (privilégier une formulation impersonnelle ou « on »).
- Accorder une attention particulière à l'orthographe, à la grammaire et à la syntaxe.
- Reprendre systématiquement les termes de la question posée dans la réponse rédigée.
- Maîtriser les homophones grammaticaux fondamentaux (et/est, a/à).
- Connaître l'orthographe du vocabulaire spécifique au chapitre.`;

document.getElementById('view-evaluation').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;">Créer une évaluation</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Décrivez le cadre de l'évaluation, laissez l'IA proposer des exercices variés (ou rédigez-les vous-même), puis générez la feuille à distribuer aux élèves.</p>

  <div class="tool-shell">
    <div class="tool-row" style="margin-bottom:10px;">
      <label class="hint" style="margin:0;">Niveau :
        <select id="evalNiveau" onchange="renderEvalChapPicker(); scheduleEvalAutoSave();" style="margin-left:4px;">
          <option value="cp">CP</option><option value="ce1">CE1</option>
          <option value="ce2">CE2</option><option value="cm1">CM1</option>
          <option value="cm2">CM2</option>
          <option value="6e">6e</option>
          <option value="5e">5e</option>
          <option value="4e">4e</option>
          <option value="3e">3e</option>
        </select>
      </label>
      <label class="hint" style="margin:0;">Classe(s) : <input type="text" id="evalClasses" placeholder="ex. 6e A, 6e B" style="width:140px;margin-left:4px;" oninput="scheduleEvalAutoSave()"></label>
      <label class="hint" style="margin:0;">Date prévue : <input type="date" id="evalDate" style="margin-left:4px;" onchange="scheduleEvalAutoSave()"></label>
      <label class="hint" style="margin:0;">Durée (min) : <input type="number" id="evalDuree" value="55" min="5" style="width:70px;margin-left:4px;" oninput="scheduleEvalAutoSave()"></label>
      <label class="hint" style="margin:0;">Interligne :
        <select id="evalLineHeight" style="margin-left:4px;" onchange="scheduleEvalAutoSave()">
          <option value="1.35">Compact</option>
          <option value="1.5" selected>Normal</option>
          <option value="1.7">Aéré</option>
        </select>
      </label>
      <label class="hint" style="margin:0;">Type :
        <select id="evalType" style="margin-left:4px;" onchange="document.getElementById('evalTypeCustom').style.display = this.value==='__custom' ? 'inline-block' : 'none'; scheduleEvalAutoSave();">
          <option value="Évaluation">Évaluation</option>
          <option value="Interrogation">Interrogation</option>
          <option value="Devoir Maison">Devoir Maison</option>
          <option value="Devoir Surveillé">Devoir Surveillé</option>
          <option value="Bac Blanc">Bac Blanc</option>
          <option value="__custom">Autre (à préciser)…</option>
        </select>
        <input type="text" id="evalTypeCustom" placeholder="Titre libre" style="display:none;width:140px;margin-left:4px;" oninput="scheduleEvalAutoSave()">
      </label>
      <label class="hint" style="margin:0;" title="Ajouté au titre de la copie : « Interrogation de Mathématiques – IE 01 »">Complément du titre :
        <input type="text" id="evalTitreAjout" placeholder="ex. IE 01" maxlength="60" style="width:120px;margin-left:4px;" oninput="scheduleEvalAutoSave()">
      </label>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <textarea id="evalConsignes" placeholder="Consignes générales (facultatif) -- affichées en haut de la copie, avant le premier exercice" style="flex:1;min-width:280px;min-height:44px;padding:7px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font-family:inherit;" oninput="scheduleEvalAutoSave()"></textarea>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <label class="hint" style="margin:0;"><input type="checkbox" id="evalShowConsignes" checked onchange="scheduleEvalAutoSave()"> Afficher les consignes sur la copie</label>
      <label class="hint" style="margin:0;">Appréciation du professeur :
        <select id="evalAppreciationLines" style="margin-left:4px;" onchange="scheduleEvalAutoSave()">
          <option value="2" selected>2 traits espacés (encadré)</option>
          <option value="1">1 trait</option>
          <option value="0">Aucun</option>
        </select>
      </label>
    </div>
    <div class="tool-row" style="margin-bottom:10px;align-items:flex-start;">
      <label class="hint" style="margin:0;"><input type="checkbox" id="evalIncludeGrilleNotation" checked onchange="scheduleEvalAutoSave()"> Inclure une grille de notation par critères (page à part, à la fin)</label>
      <textarea id="evalGrilleNotation" style="flex:1;min-width:280px;min-height:44px;padding:7px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font-family:inherit;font-size:.85rem;" oninput="scheduleEvalAutoSave()" placeholder="Un critère par paragraphe : &quot;Titre : points&quot; suivi de lignes &quot;- item&quot;">${escapeHtml(DEFAULT_GRILLE_NOTATION_TEXT)}</textarea>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <label class="hint needs-ai-eval" style="margin:0;"><input type="checkbox" id="evalUseAI" onchange="toggleEvalAIOptions()"> <span class=gicon>smart_toy</span> Laisser l'IA proposer des exercices</label>
      <button class="btn secondary" onclick="addManualExercise()">+ Ajouter un exercice vierge</button>
      <button class="btn secondary" onclick="evalAjouterManuel()" title="Choisir des exercices dans le manuel du site (planches), affichés en entier"><span class=gicon>auto_stories</span> Exercices du manuel</button>
      <button class="btn secondary" onclick="openEvalPreview()"><span class=gicon>visibility</span> Aperçu de l'évaluation</button>
    </div>
    <div class="tool-row eval-cor-barre" style="margin-bottom:10px;">
      <span class="hint" style="margin:0;font-weight:700;"><span class=gicon>fact_check</span> Corrigé :</span>
      <button class="btn secondary needs-ai-eval" id="btnEvalCorIA" onclick="evalCorIATout()" title="L'IA rédige la correction des exercices qui n'en ont pas encore ; chaque corrigé est à relire et se modifie comme un exercice"><span class=gicon>smart_toy</span> Rédiger le corrigé avec l'IA</button>
      <button class="btn secondary" onclick="evalCorOuvrirTout()" title="Ouvre la zone « Correction » sous chaque exercice, pour l'écrire vous-même avec les outils de correction"><span class=gicon>edit_note</span> Écrire le corrigé</button>
      <button class="btn secondary" onclick="openEvalPreview(true)"><span class=gicon>visibility</span> Aperçu du corrigé</button>
      <button class="btn secondary" onclick="exportEvaluationPDF(true)"><span class=gicon>print</span> Imprimer le corrigé</button>
      <label class="hint" style="margin:0;" title="Le corrigé imprimé reprend l'énoncé de chaque exercice (en gris) au-dessus de sa correction"><input type="checkbox" id="evalCorAvecEnonce" checked> avec les énoncés</label>
      <span class="hint" id="evalCorStatus" style="margin:0;"></span>
    </div>
    <div class="tool-row" style="margin-bottom:10px;">
      <button class="btn" onclick="saveEvaluation()"><span class=gicon>save</span> Sauvegarder / renommer</button>
      <button class="btn secondary" onclick="openEvalListModal()">📂 Mes évaluations</button>
      <button class="btn secondary" onclick="duplicateEvaluation()" title="Crée une copie de l'évaluation ouverte, que vous pouvez modifier sans toucher à l'originale"><span class=gicon>content_copy</span> Faire une copie</button>
      <button class="btn secondary" onclick="shareEvaluation()"><span class=gicon>link</span> Partager avec un collègue</button>
      <button class="btn secondary" onclick="addEvaluationToCahier()"><span class=gicon>menu_book</span> Ajouter au cahier</button>
      <button class="btn secondary" id="btnEvalUndo" onclick="undoEvaluation()" style="display:none;"><span class=gicon>undo</span> Annuler la dernière modification</button>
      <span class="hint" id="evalSaveStatus" style="margin:0;"></span>
    </div>
    <div id="evalCollabBanner"></div>
    <div id="evalAIOptions" class="needs-ai-eval" style="display:none;">
      <div class="tool-row" style="margin-bottom:10px;">
        <label class="hint" style="margin:0;">Nombre d'exercices : <input type="number" id="evalNbExo" value="4" min="1" max="10" style="width:55px;margin-left:4px;"></label>
        <label class="hint" style="margin:0;"><input type="checkbox" id="evalQuestionCours"> Inclure une question de cours (restituer une définition/propriété, sans calcul)</label>
      </div>
      <p class="hint" style="margin:0 0 6px;">Chapitres concernés :</p>
      <div id="evalChapPicker" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;"></div>
      <div class="figure-toolbar">
        <button class="btn orange" onclick="generateEvaluationAI()" id="btnEvalAI"><span class=gicon>smart_toy</span> Générer les exercices avec l'IA</button>
      </div>
      <p class="hint" id="evalAIStatus" style="margin:8px 0 0;"></p>
    </div>
  </div>

  <p class="hint" id="evalBaremeTotal" style="margin:14px 0 0;font-weight:700;"></p>
  <div id="evalExercicesList"></div>

  <div class="tool-row" style="margin-top:10px;">
    <button class="btn orange" onclick="exportEvaluationPDF()"><span class=gicon>print</span> Imprimer / Enregistrer en PDF</button>
    <button class="btn secondary" onclick="clearEvaluation()">Tout effacer</button>
  </div>`;

document.body.insertAdjacentHTML('beforeend', `
<div id="evalShareModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalShareModal();">
  <div class="modal-card" style="max-width:480px;max-height:80vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Partager avec un collègue</strong>
      <button class="modal-close" onclick="closeEvalShareModal()"><span class=gicon>close</span></button>
    </div>
    <div id="evalShareContent"></div>
  </div>
</div>
<div id="evalListModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalListModal();">
  <div class="modal-card evf-carte" style="max-width:960px;width:100%;max-height:86vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;"><span class=gicon style="vertical-align:-3px;">folder_open</span> Mes évaluations</strong>
      <button class="modal-close" onclick="closeEvalListModal()"><span class=gicon>close</span></button>
    </div>
    <div id="evalListContent"></div>
  </div>
</div>
<div id="evalPreviewModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEvalPreview();">
  <div class="modal-card" style="max-width:760px;max-height:88vh;overflow:auto;background:#EDEFF2;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Évaluation</strong>
      <button class="modal-close" onclick="closeEvalPreview()"><span class=gicon>close</span></button>
    </div>
    <div style="position:relative;width:700px;max-width:100%;margin:0 auto;">
      <div id="evalPreviewContent" style="font-family:Inter,sans-serif;color:#20242E;font-size:11.5pt;width:700px;padding:10px;box-sizing:border-box;background:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12);position:relative;"></div>
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
let evalPageBreaksAfter = new Set(); // ids d'exercices après lesquels insérer un saut de page
let currentEvaluationId = null;

/* Sauvegarde/chargement/partage : réutilise le compte prof déjà connecté (currentUser, sb).
   Une évaluation sauvegardée peut être rouverte par son propriétaire, ou par un collègue à qui
   elle a été explicitement partagée (table evaluations, RLS + collaborators côté serveur). */
let lastEvaluationTitle = null;
// Sauvegarde automatique (débouncée) à chaque modification -- demandé : "à chaque
// modification, ça enregistre directement". Le bouton "Sauvegarder / renommer" reste
// disponible séparément pour (re)choisir explicitement un titre ; l'auto-save réutilise le
// titre déjà en place sans jamais interrompre par un prompt.
let evalAutoSaveTimer = null;
let evalSuppressAutoSave = false; // vrai pendant un chargement programmatique (loadEvaluation),
                                   // pour ne jamais déclencher une sauvegarde juste après avoir
                                   // chargé -- ce n'est pas une vraie modification de l'utilisateur
function scheduleEvalAutoSave(){
  if(!currentUser || evalSuppressAutoSave) return; // pas connecté, ou chargement en cours : rien à sauvegarder automatiquement
  clearTimeout(evalAutoSaveTimer);
  evalAutoSaveTimer = setTimeout(autoSaveEvaluation, 1500);
}
function formatPts(n){ n = Number(n); return n + (n===1 ? ' pt' : ' pts'); }
function buildEvalPayload(exercisesOverride, blocksOverride){
  const exos = exercisesOverride || evaluationExercises;
  let relevantBlocks;
  if(blocksOverride){
    relevantBlocks = blocksOverride;
  } else {
    relevantBlocks = {};
    exos.forEach(ex=>{ ['ex-', 'cor-'].forEach(p=>{ const k=p+ex.id; if(blocksStores[k]) relevantBlocks[k]=blocksStores[k]; }); });
  }
  return {
    title: lastEvaluationTitle || document.getElementById('evalClasses').value.trim() || ('Évaluation '+document.getElementById('evalNiveau').value),
    niveau: document.getElementById('evalNiveau').value,
    classes: document.getElementById('evalClasses').value,
    eval_date: document.getElementById('evalDate').value || null,
    duree: parseInt(document.getElementById('evalDuree').value) || null,
    data: { evaluationExercises: exos, blocksStores: relevantBlocks, evalType: document.getElementById('evalType').value, evalTypeCustom: document.getElementById('evalTypeCustom').value, evalTitreAjout: document.getElementById('evalTitreAjout').value, evalLineHeight: document.getElementById('evalLineHeight').value, evalConsignes: document.getElementById('evalConsignes').value, evalShowConsignes: document.getElementById('evalShowConsignes').checked, evalAppreciationLines: document.getElementById('evalAppreciationLines').value, evalIncludeGrilleNotation: document.getElementById('evalIncludeGrilleNotation').checked, evalGrilleNotation: document.getElementById('evalGrilleNotation').value, pageBreaksAfter: Array.from(evalPageBreaksAfter) },
  };
}
// Suivi du dernier état connu du serveur, exercice par exercice -- permet de savoir, à la
// prochaine sauvegarde, LESQUELS on a réellement modifié soi-même (comparaison de snapshot),
// pour ne remplacer QUE ceux-là et respecter la version serveur pour les autres.
let evalLastSyncedExercises = {}; // id -> snapshot JSON de l'exercice tel que connu du serveur
function snapshotExercise(ex){
  return JSON.stringify({ ...ex, __blocks: blocksStores['ex-'+ex.id] || null, __cor: blocksStores['cor-'+ex.id] || null });
}
function updateSyncedSnapshot(){
  evalLastSyncedExercises = {};
  evaluationExercises.forEach(ex=>{ evalLastSyncedExercises[ex.id] = snapshotExercise(ex); });
}
// Fusionne l'état LOCAL avec ce qui vient d'être lu côté serveur (juste avant d'écraser) :
// ne remplace que les exercices réellement modifiés localement depuis la dernière synchro
// connue (evalLastSyncedExercises), respecte la version serveur pour les autres -- partagée
// entre la sauvegarde automatique et "Sauvegarder / renommer", pour que les deux se comportent
// de la même façon vis-à-vis d'un collègue qui aurait modifié un AUTRE exercice entre-temps.
function computeMergedExercises(serverData){
  const serverExercises = (serverData && serverData.evaluationExercises) || [];
  const serverBlocks = (serverData && serverData.blocksStores) || {};
  const localIds = new Set(evaluationExercises.map(e=>e.id));
  const mergedExercises = [];
  const mergedBlocks = {};
  evaluationExercises.forEach(localEx=>{
    const serverEx = serverExercises.find(e=>e.id===localEx.id);
    const unchangedSinceSync = evalLastSyncedExercises[localEx.id] === snapshotExercise(localEx);
    if(unchangedSinceSync && serverEx){
      // Pas touché par nous depuis la dernière synchro : on respecte la version serveur
      // (peut avoir été modifiée par un collègue entre-temps, sur CET exercice précis).
      mergedExercises.push(serverEx);
      ['ex-', 'cor-'].forEach(p=>{ if(serverBlocks[p+localEx.id]) mergedBlocks[p+localEx.id] = serverBlocks[p+localEx.id]; });
    } else {
      // Modifié par nous (ou nouvel exercice pas encore connu du serveur) : notre version l'emporte.
      mergedExercises.push(localEx);
      ['ex-', 'cor-'].forEach(p=>{ if(blocksStores[p+localEx.id]) mergedBlocks[p+localEx.id] = blocksStores[p+localEx.id]; });
    }
  });
  // Un exercice ajouté par un collègue entre-temps (absent localement, présent côté serveur,
  // et qu'on n'a jamais connu jusqu'ici -- donc pas nous-même supprimé) est repris.
  serverExercises.forEach(serverEx=>{
    if(!localIds.has(serverEx.id) && !(serverEx.id in evalLastSyncedExercises)){
      mergedExercises.push(serverEx);
      ['ex-', 'cor-'].forEach(p=>{ if(serverBlocks[p+serverEx.id]) mergedBlocks[p+serverEx.id] = serverBlocks[p+serverEx.id]; });
    }
  });
  return { mergedExercises, mergedBlocks };
}
async function autoSaveEvaluation(){
  if(!currentUser || !evaluationExercises.length) return;
  const statusEl = document.getElementById('evalSaveStatus');
  statusEl.textContent = 'Sauvegarde…';
  try{
    if(currentEvaluationId){
      // Récupère la donnée ACTUELLE avant de l'écraser, pour alimenter "Annuler" -- stockée en
      // base (previous_data), pas juste en mémoire, pour rester disponible après un
      // rechargement de page ou pour un collègue qui rouvrirait l'évaluation ailleurs.
      const { data: current } = await sb.from('evaluations').select('data').eq('id', currentEvaluationId).single();
      const { mergedExercises, mergedBlocks } = computeMergedExercises(current && current.data);
      const payload = buildEvalPayload(mergedExercises, mergedBlocks);
      const { error } = await sb.from('evaluations').update({...payload, previous_data: current?current.data:null, updated_by: currentUser.id, updated_at: new Date().toISOString()}).eq('id', currentEvaluationId);
      if(error) throw error;
      // Reprend localement le résultat fusionné (au cas où la version d'un collègue a été
      // conservée pour un exercice qu'on n'avait pas touché), pour que l'affichage reflète
      // fidèlement ce qui vient d'être enregistré.
      evaluationExercises = mergedExercises;
      Object.assign(blocksStores, mergedBlocks);
    } else {
      const payload = buildEvalPayload();
      const { data, error } = await sb.from('evaluations').insert({...payload, owner_id: currentUser.id, updated_by: currentUser.id}).select().single();
      if(error) throw error;
      currentEvaluationId = data.id;
      subscribeEvalRealtime(data.id);
      lastEvaluationTitle = payload.title;
    }
    updateSyncedSnapshot();
    statusEl.textContent = '✓ Enregistré automatiquement';
    document.getElementById('btnEvalUndo').style.display = 'inline-flex';
  }catch(e){
    statusEl.textContent = "Échec de l'enregistrement automatique : "+(e.message||'erreur inconnue');
  }
}
// Revient à la version précédente (stockée en base lors du dernier enregistrement
// automatique) -- demandé : "un bouton annuler qui revient à la version précédente". Échange
// data et previous_data plutôt que d'écraser simplement : un second clic sur "Annuler" annule
// donc l'annulation elle-même, sans perte.
async function undoEvaluation(){
  if(!currentEvaluationId) return;
  const statusEl = document.getElementById('evalSaveStatus');
  const { data: row, error: fetchErr } = await sb.from('evaluations').select('data,previous_data').eq('id', currentEvaluationId).single();
  if(fetchErr || !row || !row.previous_data){ await niceAlert("Aucune version précédente disponible."); return; }
  const { error } = await sb.from('evaluations').update({ data: row.previous_data, previous_data: row.data, updated_at: new Date().toISOString() }).eq('id', currentEvaluationId);
  if(error){ await niceAlert("Échec de l'annulation : "+error.message); return; }
  statusEl.textContent = '✓ Version précédente restaurée';
  await loadEvaluation(currentEvaluationId);
}
async function saveEvaluation(){
  if(!currentUser){ await niceAlert("Connectez-vous (en tant que professeur) pour sauvegarder cette évaluation."); return; }
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de sauvegarder."); return; }
  const defaultTitle = lastEvaluationTitle || document.getElementById('evalClasses').value.trim() || ('Évaluation '+document.getElementById('evalNiveau').value);
  const title = await nicePrompt("Titre de cette évaluation (pour la retrouver dans « Mes évaluations ») :", defaultTitle);
  if(title===null) return;
  lastEvaluationTitle = title || defaultTitle;
  const statusEl = document.getElementById('evalSaveStatus');
  statusEl.textContent = "Sauvegarde en cours…";
  try{
    if(currentEvaluationId){
      const { data: current } = await sb.from('evaluations').select('data').eq('id', currentEvaluationId).single();
      const { mergedExercises, mergedBlocks } = computeMergedExercises(current && current.data);
      const payload = buildEvalPayload(mergedExercises, mergedBlocks);
      const { error } = await sb.from('evaluations').update({...payload, updated_by: currentUser.id, updated_at: new Date().toISOString()}).eq('id', currentEvaluationId);
      if(error) throw error;
      evaluationExercises = mergedExercises;
      Object.assign(blocksStores, mergedBlocks);
    } else {
      const payload = buildEvalPayload();
      const { data, error } = await sb.from('evaluations').insert({...payload, owner_id: currentUser.id, updated_by: currentUser.id}).select().single();
      if(error) throw error;
      currentEvaluationId = data.id;
      subscribeEvalRealtime(data.id);
    }
    updateSyncedSnapshot();
    statusEl.textContent = "✓ Sauvegardé";
  }catch(e){
    statusEl.textContent = '';
    await niceAlert("Échec de la sauvegarde : "+(e.message||'erreur inconnue'));
  }
}
/* =====================================================================
   « Mes évaluations » : un gestionnaire de fichiers -- demandé le 10/11/2026 : « je trouve le menu un peu grossier. Le faire
   ressembler à un vrai éditeur de fichier, permettre de faire des dossiers, de déplacer les fichiers, ne pas faire de répétition
   des fichiers quand ils sont partagés, montrer le propriétaire ».
   Dossiers PERSONNELS (tables eval_dossiers, eval_rangement : chacun range à sa façon, y compris ce qu'on lui partage) ; chaque
   évaluation n'apparaît qu'une fois (l'ancienne vue « par classe » la répétait dans chaque classe) ; colonnes Nom, Propriétaire
   (« Moi » ou le collègue, avec son rôle), Classe(s), Date, Modifiée ; fil d'Ariane, « Nouveau dossier », recherche (dans tous les
   dossiers, avec le chemin), filtre Toutes / Les miennes / Partagées avec moi, tri par colonne ; glisser-déposer d'une évaluation
   ou d'un dossier sur un dossier ou sur le fil d'Ariane ; menu ⋮ : Ouvrir, Renommer, Déplacer vers…, Faire une copie, Supprimer.
   ===================================================================== */
let evalListeDonnees = [];
const evf = { dossiers: [], rang: new Map(), courant: null, filtre: 'tous', type: 'tout', recherche: '', tri: 'modif', sens: -1, proprios: new Map(), figures: [], autres: [] };
/* Figures enregistrées de la Géométrie interactive dans les mêmes dossiers (demandé le 11/11/2026 : « lorsqu'on enregistre nos figures,
   on a accès au même répertoire de dossier ? », choix : un seul arbre pour tout). figures_sauvegardees.dossier_id (personnel, contrôlé
   par la base : supabase/sql/2026-11-11-figures-dossiers.sql) ; type = 'tout' | 'eval' | 'fig' ; un élève ne voit que ses figures. */
/* Programmes par blocs, défis créés par le professeur et PDF des cours exportés dans les mêmes dossiers (demandé le 11/11/2026 : « Quand je
   crée un pdf, je pourrais aussi l'enregistrer dans ces dossiers, quid des blocs de codage ? ») : evf.autres = { s, id, nom, updated_at,
   dossier_id, ... }, s = lettre de la sorte ci-dessous (tables : supabase/sql/2026-11-11-programmes-pdf-dossiers.sql). */
const EVF_SORTES = {
  p: { table: 'prog_programmes', proprio: 'user_id', champ: 'nom', type: 'prog', nom: 'Programme', un: 'programme', pl: 'programmes', ic: 'extension', ouvrir: 'Ouvrir dans la Création libre' },
  g: { table: 'prog_defis_perso', proprio: 'teacher_id', champ: 'titre', type: 'prog', nom: 'Défi', un: 'défi', pl: 'défis', ic: 'emoji_events', ouvrir: 'Ouvrir le défi' },
  k: { table: 'docs_pdf', proprio: 'user_id', champ: 'nom', type: 'pdf', nom: 'PDF', un: 'PDF', pl: 'PDF', ic: 'picture_as_pdf', ouvrir: 'Ouvrir le PDF' },
};
const evfEleve = () => typeof currentUserRole !== 'undefined' && currentUserRole === 'eleve';
const evalClassesDe = e => [...new Set(String(e.classes || '').split(/\s*(?:,|;|&|\+|\/|-|\bet\b)\s*/i).map(c => c.trim().toUpperCase()).filter(Boolean))];
function evfPref(){ try{ const p = JSON.parse(localStorage.getItem('evfPrefs') || '{}'); if(p.tri) evf.tri = p.tri; if(p.sens) evf.sens = p.sens; if(p.filtre) evf.filtre = p.filtre; if(p.type) evf.type = p.type; }catch(_){} }
function evfSauverPref(){ try{ localStorage.setItem('evfPrefs', JSON.stringify({ tri: evf.tri, sens: evf.sens, filtre: evf.filtre, type: evf.type })); }catch(_){} }
// opts.type : 'fig' depuis la Géométrie interactive (« Mes figures enregistrées »), 'eval' ou 'tout' ; sans opts, le dernier choix.
async function openEvalListModal(opts){
  if(!currentUser){ await niceAlert("Connectez-vous pour voir vos évaluations et vos figures enregistrées."); return; }
  const ov = document.getElementById('evalListModalOverlay');
  // Au-dessus de la Géométrie interactive, même en plein écran (comme niceModal).
  (document.fullscreenElement || document.body).appendChild(ov); ov.style.zIndex = '450';
  ov.style.display='flex';
  const box = document.getElementById('evalListContent');
  if(!evf.charge){ box.innerHTML = '<p class="hint">Chargement…</p>'; evfPref(); }
  if(opts && opts.type) evf.type = opts.type;
  if(evfEleve() && evf.type === 'eval') evf.type = 'tout';
  if(!evfVoitEvals()) evf.filtre = 'tous';
  const titre = ov.querySelector('strong');
  if(titre) titre.innerHTML = `<span class=gicon style="vertical-align:-3px;">folder_open</span> Mes dossiers`;
  const uid = currentUser.id, vide = Promise.resolve({ data: [] });
  const [ev, ds, rg, pr, fg, pg, df, pdf] = await Promise.all([
    evfEleve() ? Promise.resolve({ data: [] }) : sb.from('evaluations').select('id,title,niveau,classes,eval_date,owner_id,collaborators,viewers,updated_at').order('updated_at', {ascending:false}),
    sb.from('eval_dossiers').select('id,nom,parent_id,created_at').order('nom'),
    evfEleve() ? Promise.resolve({ data: [] }) : sb.from('eval_rangement').select('evaluation_id,dossier_id'),
    evfEleve() ? Promise.resolve({ data: [] }) : sb.rpc('evaluations_proprietaires'),
    sb.from('figures_sauvegardees').select('id,nom,updated_at,dossier_id,figure_data').eq('user_id', currentUser.id).order('updated_at', {ascending:false}),
    sb.from('prog_programmes').select('id,nom,updated_at,dossier_id').eq('user_id', uid),
    evfEleve() ? vide : sb.from('prog_defis_perso').select('id,titre,niveau,updated_at,dossier_id').eq('teacher_id', uid),
    sb.from('docs_pdf').select('id,nom,chemin,taille,created_at,dossier_id').eq('user_id', uid),
  ]);
  if(ev.error){ box.innerHTML = "Erreur : "+escapeHtml(ev.error.message); return; }
  evf.charge = true;
  evf.figures = fg.error ? [] : (fg.data || []);
  evf.autres = [].concat(
    (pg.error ? [] : pg.data || []).map(r => Object.assign({ s: 'p' }, r)),
    (df.error ? [] : df.data || []).map(r => Object.assign({ s: 'g', nom: r.titre }, r)),
    (pdf.error ? [] : pdf.data || []).map(r => Object.assign({ s: 'k', updated_at: r.created_at }, r)));
  evalListeDonnees = ev.data || [];
  evf.dossiers = ds.data || [];
  evf.rang = new Map((rg.data || []).map(r => [r.evaluation_id, r.dossier_id]));
  evf.proprios = new Map((pr.data || []).map(p => [p.id, [p.prenom, p.nom].filter(Boolean).join(' ') || 'Collègue']));
  if(evf.courant && !evf.dossiers.some(d => d.id === evf.courant)) evf.courant = null;
  evalListeRendre();
}
const evfDossier = id => evf.dossiers.find(d => d.id === id) || null;
function evfChemin(id){ const l = []; let d = evfDossier(id), garde = 0; while(d && garde++ < 50){ l.unshift(d); d = evfDossier(d.parent_id); } return l; }
function evfDescendants(id){ const r = new Set([id]); let encore = true; while(encore){ encore = false; evf.dossiers.forEach(d => { if(d.parent_id && r.has(d.parent_id) && !r.has(d.id)){ r.add(d.id); encore = true; } }); } return r; }
function evfDansDossier(e){ return evf.rang.get(e.id) || null; }
function evfRole(e){ return e.owner_id === currentUser.id ? 'proprietaire' : (e.collaborators || []).includes(currentUser.id) ? 'editeur' : 'lecteur'; }
function evfVisible(e){ const r = evfRole(e); return evf.filtre === 'miens' ? r === 'proprietaire' : evf.filtre === 'partages' ? r !== 'proprietaire' : true; }
function evfVoitEvals(){ return (evf.type === 'tout' || evf.type === 'eval') && !evfEleve(); }
function evfVoitFigs(){ return (evf.type === 'tout' || evf.type === 'fig') && evf.filtre !== 'partages'; }
function evfVoitSorte(s){ return (evf.type === 'tout' || evf.type === EVF_SORTES[s].type) && evf.filtre !== 'partages'; }
function evfAutresVus(){ return evf.autres.filter(o => evfVoitSorte(o.s)); }
const evfAutre = quoi => evf.autres.find(o => o.s === quoi[0] && o.id === quoi.slice(2)) || null;
function evfNbDans(id){ const ids = evfDescendants(id); return evfVoitEvals() ? evalListeDonnees.filter(e => evfVisible(e) && ids.has(evfDansDossier(e))).length : 0; }
function evfNbFigDans(id){ const ids = evfDescendants(id); return evfVoitFigs() ? evf.figures.filter(f => ids.has(f.dossier_id || null)).length : 0; }
function evfContenu(id){
  const ne = evfNbDans(id), nf = evfNbFigDans(id), l = [];
  if(ne) l.push(`${ne} évaluation${ne > 1 ? 's' : ''}`);
  if(nf) l.push(`${nf} figure${nf > 1 ? 's' : ''}`);
  const ids = evfDescendants(id), autres = evfAutresVus().filter(o => ids.has(o.dossier_id || null));
  Object.keys(EVF_SORTES).forEach(k => { const n = autres.filter(o => o.s === k).length, S = EVF_SORTES[k]; if(n) l.push(`${n} ${n > 1 ? S.pl : S.un}`); });
  return l.join(' · ') || 'vide';
}
const evfDate = s => s ? new Date(String(s).length === 10 ? s + 'T00:00:00' : s).toLocaleDateString('fr-FR') : '';
function evfTrier(l){
  const k = { nom: e => (e.title || e.nom || '').toLowerCase(), date: e => e.eval_date || '', modif: e => e.updated_at || '', proprio: e => e.owner_id === currentUser.id ? '' : (evf.proprios.get(e.owner_id) || '').toLowerCase(), classes: e => (e.classes || '').toLowerCase() }[evf.tri] || (e => e.updated_at || '');
  return l.slice().sort((a, b) => { const x = k(a), y = k(b); return (x < y ? -1 : x > y ? 1 : 0) * evf.sens; });
}
function evalListeChoisir(){ evalListeRendre(); } // compatibilité (ancienne bascule « Par classe / Par date »)
function evalListeRendre(){
  const box = document.getElementById('evalListContent'); if(!box) return;
  const q = evf.recherche.trim().toLowerCase();
  const chemin = evfChemin(evf.courant);
  const racine = 'Mes dossiers';
  const fil = `<nav class="evf-chemin" aria-label="Dossier">${[{ id: '', nom: racine }, ...chemin].map((d, i, t) =>
    `<button type="button" class="evf-miette${i === t.length - 1 ? ' ici' : ''}" data-evf-aller="${d.id}" data-evf-cible="${d.id}"><span class="gicon">${i ? 'folder' : 'home'}</span> ${escapeHtml(d.nom)}</button>`).join('<span class="evf-sep">›</span>')}</nav>`;
  const barre = `<div class="evf-barre">${fil}
    <div class="evf-outils">
      <label class="evf-cherche"><span class="gicon">search</span><input type="search" id="evfRecherche" placeholder="${evfEleve() ? 'Rechercher (figure, programme, PDF)' : 'Rechercher (titre, classe, niveau, figure, programme)'}" value="${escapeHtml(evf.recherche)}"></label>
      <button type="button" class="btn secondary evf-btn" data-evf="nouveau"><span class="gicon">create_new_folder</span> Nouveau dossier</button>
    </div></div>
    ${`<div class="evf-filtres">${[['tout', 'Tout', 'folder_copy'], ...(evfEleve() ? [] : [['eval', 'Évaluations', 'description']]), ['fig', 'Figures', 'architecture'], ['prog', 'Programmes', 'extension'], ['pdf', 'PDF', 'picture_as_pdf']].map(([k, t, ic]) => `<button type="button" class="evf-puce${evf.type === k ? ' on' : ''}" data-evf-type="${k}"><span class="gicon">${ic}</span> ${t}</button>`).join('')}
      ${evfVoitEvals() ? `<span class="evf-filtres-sep" aria-hidden="true"></span>${[['tous', 'Toutes'], ['miens', 'Les miennes'], ['partages', 'Partagées avec moi']].map(([k, t]) => `<button type="button" class="evf-puce${evf.filtre === k ? ' on' : ''}" data-evf-filtre="${k}">${t}</button>`).join('')}` : ''}</div>`}`;
  const tri = (k, t) => `<button type="button" class="evf-tri${evf.tri === k ? ' on' : ''}" data-evf-tri="${k}">${t}${evf.tri === k ? `<span class="gicon">${evf.sens > 0 ? 'arrow_upward' : 'arrow_downward'}</span>` : ''}</button>`;
  const entete = `<div class="evf-ligne evf-tete" role="row"><span class="evf-c-nom">${tri('nom', 'Nom')}</span><span class="evf-c-prop">${tri('proprio', 'Propriétaire')}</span><span class="evf-c-cl">${tri('classes', 'Classe(s)')}</span><span class="evf-c-date">${tri('date', 'Date')}</span><span class="evf-c-modif">${tri('modif', 'Modifiée')}</span><span class="evf-c-act"></span></div>`;
  let dossiers = [], evals, figs, autres;
  const autresVus = evfAutresVus();
  const evalsVues = evfVoitEvals() ? evalListeDonnees.filter(evfVisible) : [], figsVues = evfVoitFigs() ? evf.figures : [];
  if(q){
    evals = evfTrier(evalsVues.filter(e => [e.title, e.classes, e.niveau, evf.proprios.get(e.owner_id)].join(' ').toLowerCase().includes(q)));
    figs = evfTrier(figsVues.filter(f => (f.nom || '').toLowerCase().includes(q)));
    autres = evfTrier(autresVus.filter(o => [o.nom, EVF_SORTES[o.s].nom, o.niveau].join(' ').toLowerCase().includes(q)));
  } else {
    dossiers = evf.dossiers.filter(d => (d.parent_id || null) === evf.courant).sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
    evals = evfTrier(evalsVues.filter(e => evfDansDossier(e) === evf.courant));
    figs = evfTrier(figsVues.filter(f => (f.dossier_id || null) === evf.courant));
    autres = evfTrier(autresVus.filter(o => (o.dossier_id || null) === evf.courant));
  }
  const ligneDossier = d => `<div class="evf-ligne evf-dossier" role="row" draggable="true" data-evf-glisse="d:${d.id}" data-evf-cible="${d.id}">
      <span class="evf-c-nom"><button type="button" class="evf-nom" data-evf-aller="${d.id}"><span class="gicon evf-ic-dos">folder</span> ${escapeHtml(d.nom)}</button></span>
      <span class="evf-c-prop hint">Moi</span><span class="evf-c-cl hint">${evfContenu(d.id)}</span><span class="evf-c-date"></span><span class="evf-c-modif"></span>
      <span class="evf-c-act"><button type="button" class="evf-menu-btn" data-evf-menu="d:${d.id}" aria-label="Actions du dossier"><span class="gicon">more_vert</span></button></span></div>`;
  const ligneEval = e => {
    const r = evfRole(e), prop = r === 'proprietaire' ? 'Moi' : escapeHtml(evf.proprios.get(e.owner_id) || 'Collègue');
    const badge = r === 'editeur' ? '<span class="evf-role" title="Vous pouvez la modifier"><span class="gicon">edit</span> éditeur</span>' : r === 'lecteur' ? '<span class="evf-role" title="Lecture seule"><span class="gicon">visibility</span> lecteur</span>' : '';
    const ou = q && evfDansDossier(e) ? `<span class="evf-ou"><span class="gicon">folder</span> ${evfChemin(evfDansDossier(e)).map(d => escapeHtml(d.nom)).join(' › ')}</span>` : '';
    return `<div class="evf-ligne evf-fichier" role="row" draggable="true" data-evf-glisse="e:${e.id}">
      <span class="evf-c-nom"><button type="button" class="evf-nom" data-evf-ouvrir="${e.id}" title="Ouvrir"><span class="gicon evf-ic-fic">${r === 'proprietaire' ? 'description' : 'folder_shared'}</span> <span>${escapeHtml(e.title || 'Sans titre')}${ou}
        <span class="evf-meta">${prop}${e.classes ? ' · ' + escapeHtml(e.classes) : ''}${e.eval_date ? ' · ' + evfDate(e.eval_date) : ''}</span></span></button></span>
      <span class="evf-c-prop">${prop} ${badge}</span><span class="evf-c-cl">${escapeHtml(e.niveau || '')}${e.classes ? ' · ' + escapeHtml(e.classes) : ''}</span>
      <span class="evf-c-date">${evfDate(e.eval_date)}</span><span class="evf-c-modif">${evfDate(e.updated_at)}</span>
      <span class="evf-c-act"><button type="button" class="evf-menu-btn" data-evf-menu="e:${e.id}" aria-label="Actions de l'évaluation"><span class="gicon">more_vert</span></button></span></div>`;
  };
  const ouverte = typeof figFichier !== 'undefined' && figFichier ? figFichier.id : null;
  const ligneFig = f => {
    const ou = q && f.dossier_id ? `<span class="evf-ou"><span class="gicon">folder</span> ${evfChemin(f.dossier_id).map(d => escapeHtml(d.nom)).join(' › ')}</span>` : '';
    const ap = typeof figApercu === 'function' ? figApercu(f.figure_data) : '';
    return `<div class="evf-ligne evf-fichier evf-figure${f.id === ouverte ? ' evf-ouverte' : ''}" role="row" draggable="true" data-evf-glisse="f:${f.id}">
      <span class="evf-c-nom"><button type="button" class="evf-nom" data-evf-ouvrir-fig="${f.id}" title="Ouvrir dans la Géométrie interactive">${ap ? `<span class="evf-vign" aria-hidden="true">${ap}</span>` : '<span class="gicon evf-ic-fig">architecture</span>'} <span>${escapeHtml(f.nom || 'Sans nom')}${f.id === ouverte ? ' <span class="evf-role">ouverte</span>' : ''}${ou}
        <span class="evf-meta">Figure · ${evfDate(f.updated_at)}</span></span></button></span>
      <span class="evf-c-prop">Moi</span><span class="evf-c-cl hint">Figure</span>
      <span class="evf-c-date"></span><span class="evf-c-modif">${evfDate(f.updated_at)}</span>
      <span class="evf-c-act"><button type="button" class="evf-menu-btn" data-evf-menu="f:${f.id}" aria-label="Actions de la figure"><span class="gicon">more_vert</span></button></span></div>`;
  };
  const ouvProg = typeof prog !== 'undefined' && prog && prog.fichier ? prog.fichier.id : null;
  const ligneAutre = o => {
    const S = EVF_SORTES[o.s], ou = q && o.dossier_id ? `<span class="evf-ou"><span class="gicon">folder</span> ${evfChemin(o.dossier_id).map(d => escapeHtml(d.nom)).join(' › ')}</span>` : '';
    const ici = o.s === 'p' && o.id === ouvProg, taille = o.taille ? ` · ${o.taille > 1048576 ? (o.taille / 1048576).toFixed(1).replace('.', ',') + ' Mo' : Math.max(1, Math.round(o.taille / 1024)) + ' ko'}` : '';
    return `<div class="evf-ligne evf-fichier evf-${S.type}${ici ? ' evf-ouverte' : ''}" role="row" draggable="true" data-evf-glisse="${o.s}:${o.id}">
      <span class="evf-c-nom"><button type="button" class="evf-nom" data-evf-ouvrir-o="${o.s}:${o.id}" title="${S.ouvrir}"><span class="gicon evf-ic-${S.type}">${S.ic}</span> <span>${escapeHtml(o.nom || 'Sans nom')}${ici ? ' <span class="evf-role">ouvert</span>' : ''}${ou}
        <span class="evf-meta">${S.nom}${o.niveau ? ' · ' + escapeHtml(o.niveau) : ''} · ${evfDate(o.updated_at)}${taille}</span></span></button></span>
      <span class="evf-c-prop">Moi</span><span class="evf-c-cl hint">${S.nom}${o.niveau ? ' · ' + escapeHtml(o.niveau) : ''}${taille}</span>
      <span class="evf-c-date"></span><span class="evf-c-modif">${evfDate(o.updated_at)}</span>
      <span class="evf-c-act"><button type="button" class="evf-menu-btn" data-evf-menu="${o.s}:${o.id}" aria-label="Actions : ${escapeHtml(S.un)}"><span class="gicon">more_vert</span></button></span></div>`;
  };
  const vide = !dossiers.length && !evals.length && !figs.length && !autres.length
    ? `<p class="evf-vide">${q ? 'Rien ne correspond à la recherche.' : evf.courant ? 'Ce dossier est vide : glissez-y des évaluations, des figures, des programmes ou des PDF, ou utilisez « Déplacer vers… » dans le menu ⋮.' : 'Rien pour le moment.'}</p>` : '';
  box.innerHTML = barre + `<div class="evf-liste" role="grid">${entete}${dossiers.map(ligneDossier).join('')}${evals.map(ligneEval).join('')}${figs.map(ligneFig).join('')}${autres.map(ligneAutre).join('')}${vide}</div>
    <p class="hint evf-aide"><span class="gicon">info</span> Glissez un élément sur un dossier (ou sur le chemin, en haut) pour le ranger. Les mêmes dossiers servent ${evfEleve() ? '' : 'aux évaluations, '}aux figures de la Géométrie interactive, aux programmes par blocs (Création libre › « Enregistrer sous un nom »)${evfEleve() ? '' : ', à vos défis'} et aux PDF des cours (« Garder aussi une copie dans mes dossiers » à l'export) ; ils ne sont visibles que par vous.${evfEleve() ? '' : ' Une évaluation partagée apparaît une seule fois, avec son propriétaire.'}</p>`;
  const champ = document.getElementById('evfRecherche');
  if(champ){ champ.oninput = () => { evf.recherche = champ.value; const pos = champ.selectionStart; evalListeRendre(); const c2 = document.getElementById('evfRecherche'); if(c2){ c2.focus(); try{ c2.setSelectionRange(pos, pos); }catch(_){} } }; }
  if(!box.dataset.evf){ box.dataset.evf = '1'; evfBrancher(box); }
}
function evfBrancher(box){
  box.addEventListener('click', async ev => {
    const t = ev.target;
    const aller = t.closest('[data-evf-aller]'); if(aller){ evf.courant = aller.dataset.evfAller || null; evf.recherche = ''; evfMenuFermer(); evalListeRendre(); return; }
    const ouvrir = t.closest('[data-evf-ouvrir]'); if(ouvrir){ evfOuvrirEval(ouvrir.dataset.evfOuvrir); return; }
    const ouvrirF = t.closest('[data-evf-ouvrir-fig]'); if(ouvrirF){ evfOuvrirFigure(ouvrirF.dataset.evfOuvrirFig); return; }
    const ouvrirO = t.closest('[data-evf-ouvrir-o]'); if(ouvrirO){ evfOuvrirAutre(ouvrirO.dataset.evfOuvrirO); return; }
    const ty = t.closest('[data-evf-type]'); if(ty){ evf.type = ty.dataset.evfType; if(!evfVoitEvals()) evf.filtre = 'tous'; evfSauverPref(); evalListeRendre(); return; }
    const f = t.closest('[data-evf-filtre]'); if(f){ evf.filtre = f.dataset.evfFiltre; evfSauverPref(); evalListeRendre(); return; }
    const tr = t.closest('[data-evf-tri]'); if(tr){ const k = tr.dataset.evfTri; if(evf.tri === k) evf.sens = -evf.sens; else { evf.tri = k; evf.sens = (k === 'nom' || k === 'proprio' || k === 'classes') ? 1 : -1; } evfSauverPref(); evalListeRendre(); return; }
    const m = t.closest('[data-evf-menu]'); if(m){ ev.stopPropagation(); evfMenu(m, m.dataset.evfMenu); return; }
    if(t.closest('[data-evf="nouveau"]')){ await evfNouveauDossier(); return; }
  });
  // Glisser-déposer : une évaluation ou un dossier sur un dossier (ligne ou fil d'Ariane ; la racine = « Mes évaluations »).
  box.addEventListener('dragstart', ev => { const g = ev.target.closest && ev.target.closest('[data-evf-glisse]'); if(!g) return; ev.dataTransfer.setData('text/plain', g.dataset.evfGlisse); ev.dataTransfer.effectAllowed = 'move'; g.classList.add('evf-glisse'); });
  box.addEventListener('dragend', ev => { box.querySelectorAll('.evf-glisse,.evf-survol').forEach(x => x.classList.remove('evf-glisse', 'evf-survol')); });
  box.addEventListener('dragover', ev => { const c = ev.target.closest && ev.target.closest('[data-evf-cible]'); if(!c) return; ev.preventDefault(); ev.dataTransfer.dropEffect = 'move'; box.querySelectorAll('.evf-survol').forEach(x => x !== c && x.classList.remove('evf-survol')); c.classList.add('evf-survol'); });
  box.addEventListener('dragleave', ev => { const c = ev.target.closest && ev.target.closest('[data-evf-cible]'); if(c && !c.contains(ev.relatedTarget)) c.classList.remove('evf-survol'); });
  box.addEventListener('drop', async ev => {
    const c = ev.target.closest && ev.target.closest('[data-evf-cible]'); if(!c) return; ev.preventDefault();
    const quoi = ev.dataTransfer.getData('text/plain'); if(!quoi) return;
    await evfDeplacer(quoi, c.dataset.evfCible || null);
  });
}
async function evfNouveauDossier(){
  const nom = await nicePrompt('Nom du nouveau dossier :', ''); if(nom === null || !nom.trim()) return;
  const { error } = await sb.from('eval_dossiers').insert({ nom: nom.trim().slice(0, 80), parent_id: evf.courant });
  if(error){ await niceAlert('Dossier non créé : ' + error.message); return; }
  await openEvalListModal();
}
// quoi = « e:<id> » (évaluation) ou « d:<id> » (dossier) ; vers = dossier, ou null pour la racine.
async function evfDeplacer(quoi, vers){
  const [type, id] = [quoi.slice(0, 1), quoi.slice(2)];
  let error = null;
  if(type === 'e'){
    if((evf.rang.get(id) || null) === vers) return;
    ({ error } = vers ? await sb.from('eval_rangement').upsert({ user_id: currentUser.id, evaluation_id: id, dossier_id: vers }, { onConflict: 'user_id,evaluation_id' })
                      : await sb.from('eval_rangement').delete().eq('user_id', currentUser.id).eq('evaluation_id', id));
  } else if(type === 'f'){
    const fig = evf.figures.find(x => x.id === id);
    if(!fig || (fig.dossier_id || null) === vers) return;
    ({ error } = await sb.from('figures_sauvegardees').update({ dossier_id: vers }).eq('id', id).eq('user_id', currentUser.id));
  } else if(EVF_SORTES[type]){
    const o = evfAutre(quoi), S = EVF_SORTES[type];
    if(!o || (o.dossier_id || null) === vers) return;
    ({ error } = await sb.from(S.table).update({ dossier_id: vers }).eq('id', id).eq(S.proprio, currentUser.id));
  } else if(type === 'd'){
    if(vers && evfDescendants(id).has(vers)){ await niceAlert('Un dossier ne peut pas aller dans lui-même ni dans l\'un de ses sous-dossiers.'); return; }
    if((evfDossier(id) || {}).parent_id === vers) return;
    ({ error } = await sb.from('eval_dossiers').update({ parent_id: vers }).eq('id', id));
  }
  if(error){ await niceAlert('Déplacement impossible : ' + error.message); return; }
  await openEvalListModal();
}
// Ouvrir une évaluation depuis n'importe où (page « Créer une évaluation » ou Géométrie interactive).
async function evfOuvrirEval(id){
  closeEvalListModal();
  if(!document.getElementById('view-evaluation').classList.contains('active')){
    const outils = document.getElementById('toolsModalOverlay');
    if(outils && outils.style.display !== 'none' && typeof closeAllToolPanels === 'function') closeAllToolPanels();
    const nav = document.querySelector('[data-nav="evaluation"]'); if(nav) nav.click();
  }
  await loadEvaluation(id);
}
// Ouvrir une figure dans la Géométrie interactive (ouverte d'abord si besoin).
async function evfOuvrirFigure(id){
  closeEvalListModal();
  const sous = document.getElementById('figSaveSandboxBtn'), outils = document.getElementById('toolsModalOverlay'), panneau = document.getElementById('figurePanel');
  const ouverte = outils && outils.style.display !== 'none' && panneau && panneau.style.display !== 'none' && sous && sous.style.display !== 'none';
  if(!ouverte){ const nav = document.querySelector('[data-nav="figure-sandbox"]'); if(nav) nav.click(); }
  if(typeof loadSandboxFigure === 'function') await loadSandboxFigure(id);
}
// Programme (Création libre), défi (liste des défis) ou PDF (nouvel onglet, lien valable 10 min).
async function evfOuvrirAutre(quoi){
  const o = evfAutre(quoi); if(!o) return;
  if(o.s === 'k'){
    const w = window.open('', '_blank'); // ouvert tout de suite : sinon bloqué comme fenêtre surgissante
    const { data, error } = await sb.storage.from('documents').createSignedUrl(o.chemin, 600);
    if(error || !data){ if(w) w.close(); await niceAlert('PDF introuvable' + (error ? ' : ' + error.message : '.')); return; }
    if(w) w.location.href = data.signedUrl; else location.href = data.signedUrl;
    return;
  }
  closeEvalListModal();
  const outils = document.getElementById('toolsModalOverlay');
  if(outils && outils.style.display !== 'none' && typeof closeAllToolPanels === 'function') closeAllToolPanels();
  if(o.s === 'p'){ if(typeof progFichierOuvrir === 'function') await progFichierOuvrir(o.id); return; }
  if(typeof progQuitterDevoir === 'function') progQuitterDevoir();
  if(typeof progOuvrir === 'function') await progOuvrir({ defi: 'p-' + o.id });
}
async function evfTelechargerPdf(o){
  const { data, error } = await sb.storage.from('documents').createSignedUrl(o.chemin, 600, { download: (o.nom || 'document').replace(/[\\/:*?"<>|]+/g, '-') + '.pdf' });
  if(error || !data){ await niceAlert('Téléchargement impossible' + (error ? ' : ' + error.message : '.')); return; }
  const a = document.createElement('a'); a.href = data.signedUrl; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
}
async function evfRenommerAutre(o){
  const S = EVF_SORTES[o.s]; let msg = `Nouveau nom (${S.un}) :`;
  for(;;){
    const nom = await nicePrompt(msg, o.nom || ''); if(nom == null) return;
    const n = String(nom).trim().slice(0, o.s === 'k' ? 120 : 80); if(!n || n === o.nom) return;
    if(o.s === 'p' && evf.autres.some(x => x.s === 'p' && x.id !== o.id && x.nom === n)){ msg = `Le nom « ${n} » est déjà pris par un autre programme. Nouveau nom :`; continue; }
    const champs = { [S.champ]: n }; if(o.s !== 'k') champs.updated_at = new Date().toISOString();
    const { error } = await sb.from(S.table).update(champs).eq('id', o.id).eq(S.proprio, currentUser.id);
    if(error){ await niceAlert('Impossible de renommer : ' + error.message); return; }
    if(o.s === 'p' && typeof prog !== 'undefined' && prog && prog.fichier && prog.fichier.id === o.id){ prog.fichier.nom = n; if(typeof progFichierRetenir === 'function') progFichierRetenir(); if(typeof progFichierMaj === 'function') progFichierMaj(); }
    if(o.s === 'g' && typeof progDefiParId === 'function'){ const d = progDefiParId('p-' + o.id); if(d){ d.titre = n; if(typeof progListeRender === 'function' && typeof prog !== 'undefined' && prog) progListeRender(); } }
    await openEvalListModal(); return;
  }
}
async function evfSupprimerAutre(o){
  const S = EVF_SORTES[o.s];
  const q = o.s === 'g' ? `Supprimer le défi « ${o.nom} » ? Les élèves qui l'ont en devoir ou dans une session ne pourront plus l'ouvrir.`
          : o.s === 'k' ? `Effacer définitivement le PDF « ${o.nom} » de vos dossiers ? (Les copies déjà téléchargées restent sur les appareils.)`
          : `Effacer définitivement le programme « ${o.nom} » ?`;
  if(!(await niceConfirm(q))) return;
  if(o.s === 'k'){ const { error: es } = await sb.storage.from('documents').remove([o.chemin]); if(es) console.warn('documents', es.message); }
  const { error } = await sb.from(S.table).delete().eq('id', o.id).eq(S.proprio, currentUser.id);
  if(error){ await niceAlert('Effacement impossible : ' + error.message); return; }
  if(o.s === 'p' && typeof prog !== 'undefined' && prog && prog.fichier && prog.fichier.id === o.id){ prog.fichier = null; prog.fichierModifie = false; if(typeof progFichierRetenir === 'function') progFichierRetenir(); if(typeof progFichierMaj === 'function') progFichierMaj(); }
  if(o.s === 'g' && typeof PROG_DEFIS !== 'undefined'){ const i = PROG_DEFIS.findIndex(x => x.id === 'p-' + o.id); if(i >= 0) PROG_DEFIS.splice(i, 1); }
  await openEvalListModal();
}
async function evfRenommerFigure(fg){
  let msg = 'Nouveau nom de la figure :';
  for(;;){
    const nom = await nicePrompt(msg, fg.nom || ''); if(nom == null) return;
    const n = String(nom).trim(); if(!n || n === fg.nom) return;
    if(evf.figures.some(x => x.id !== fg.id && x.nom === n)){ msg = `Le nom « ${n} » est déjà pris par une autre figure. Nouveau nom :`; continue; }
    const { error } = await sb.from('figures_sauvegardees').update({ nom: n }).eq('id', fg.id).eq('user_id', currentUser.id);
    if(error){ await niceAlert('Impossible de renommer : ' + error.message); return; }
    if(typeof figFichier !== 'undefined' && figFichier && figFichier.id === fg.id && typeof figFichierChanger === 'function') figFichierChanger({ id: fg.id, nom: n });
    await openEvalListModal(); return;
  }
}
function evfMenuFermer(){ const m = document.getElementById('evfMenu'); if(m) m.remove(); }
function evfMenu(btn, quoi){
  evfMenuFermer();
  const [type, id] = [quoi.slice(0, 1), quoi.slice(2)];
  const e = type === 'e' ? evalListeDonnees.find(x => x.id === id) : null, d = type === 'd' ? evfDossier(id) : null;
  const fg = type === 'f' ? evf.figures.find(x => x.id === id) : null, o = EVF_SORTES[type] ? evfAutre(quoi) : null;
  if(!e && !d && !fg && !o) return;
  const it = (a, ic, t, cl) => `<button type="button" data-a="${a}"${cl ? ` class="${cl}"` : ''}><span class="gicon">${ic}</span> ${t}</button>`;
  const r = e ? evfRole(e) : 'proprietaire';
  let h = o ? it('ouvrir-o', o.s === 'k' ? 'open_in_new' : 'edit_note', 'Ouvrir') + (o.s === 'k' ? it('telecharger', 'download', 'Télécharger') : '') + it('renommer', 'edit', 'Renommer') + it('deplacer', 'drive_file_move', 'Déplacer vers…')
              + (o.dossier_id ? it('racine', 'folder_off', 'Retirer du dossier') : '') + it('suppr', 'delete', o.s === 'g' ? 'Supprimer le défi' : 'Effacer', 'evf-danger')
        : fg ? it('ouvrir-fig', 'open_in_new', 'Ouvrir') + it('renommer', 'edit', 'Renommer') + it('deplacer', 'drive_file_move', 'Déplacer vers…')
              + (fg.dossier_id ? it('racine', 'folder_off', 'Retirer du dossier') : '') + it('suppr', 'delete', 'Effacer', 'evf-danger')
        : e ? it('ouvrir', 'open_in_new', 'Ouvrir') + (r !== 'lecteur' ? it('renommer', 'edit', 'Renommer') : '') + it('deplacer', 'drive_file_move', 'Déplacer vers…') + it('copie', 'content_copy', 'Faire une copie')
              + (r === 'proprietaire' ? it('suppr', 'delete', 'Supprimer', 'evf-danger') : (evfDansDossier(e) ? it('racine', 'folder_off', 'Retirer du dossier') : ''))
            : it('aller', 'folder_open', 'Ouvrir') + it('renommer', 'edit', 'Renommer') + it('deplacer', 'drive_file_move', 'Déplacer vers…') + it('suppr', 'folder_delete', 'Supprimer le dossier', 'evf-danger');
  const m = document.createElement('div'); m.id = 'evfMenu'; m.className = 'evf-menu'; m.innerHTML = h;
  (document.fullscreenElement || document.body).appendChild(m);
  const rb = btn.getBoundingClientRect();
  m.style.top = Math.min(rb.bottom + 4, innerHeight - m.offsetHeight - 8) + 'px';
  m.style.left = Math.max(8, Math.min(rb.right - m.offsetWidth, innerWidth - m.offsetWidth - 8)) + 'px';
  m.onclick = async ev => {
    const b = ev.target.closest('[data-a]'); if(!b) return;
    const a = b.dataset.a;
    if(a === 'deplacer'){ evfChoixDossier(m, quoi); return; }
    evfMenuFermer();
    if(a === 'ouvrir'){ evfOuvrirEval(id); }
    else if(a === 'ouvrir-fig'){ evfOuvrirFigure(id); }
    else if(a === 'ouvrir-o'){ evfOuvrirAutre(quoi); }
    else if(a === 'telecharger' && o){ evfTelechargerPdf(o); }
    else if(a === 'renommer' && o){ await evfRenommerAutre(o); }
    else if(a === 'suppr' && o){ await evfSupprimerAutre(o); }
    else if(a === 'aller'){ evf.courant = id; evalListeRendre(); }
    else if(a === 'copie') duplicateEvaluation(id);
    else if(a === 'racine') await evfDeplacer(quoi, null);
    else if(a === 'renommer' && fg){ await evfRenommerFigure(fg); }
    else if(a === 'suppr' && fg){
      if(!(await niceConfirm(`Effacer définitivement la figure « ${fg.nom} » ? (Celles déjà insérées dans un cahier y restent.)`))) return;
      const { error } = await sb.from('figures_sauvegardees').delete().eq('id', id).eq('user_id', currentUser.id);
      if(error){ await niceAlert('Effacement impossible : ' + error.message); return; }
      if(typeof figFichier !== 'undefined' && figFichier && figFichier.id === id && typeof figFichierChanger === 'function') figFichierChanger(null);
      await openEvalListModal();
    }
    else if(a === 'renommer'){
      const nom = await nicePrompt(e ? 'Nouveau titre de l\'évaluation :' : 'Nouveau nom du dossier :', e ? (e.title || '') : d.nom);
      if(nom === null || !nom.trim()) return;
      const { error } = e ? await sb.from('evaluations').update({ title: nom.trim(), updated_by: currentUser.id }).eq('id', id) : await sb.from('eval_dossiers').update({ nom: nom.trim().slice(0, 80) }).eq('id', id);
      if(error){ await niceAlert('Impossible de renommer : ' + error.message); return; }
      if(e && currentEvaluationId === id) lastEvaluationTitle = nom.trim();
      await openEvalListModal();
    }
    else if(a === 'suppr'){
      if(e) return deleteEvaluationPrompt(id, e.title || 'Sans titre');
      const ids = evfDescendants(id), n = evalListeDonnees.filter(x => ids.has(evfDansDossier(x))).length + evf.figures.filter(x => ids.has(x.dossier_id || null)).length + evf.autres.filter(x => ids.has(x.dossier_id || null)).length;
      if(!(await niceConfirm(`Supprimer le dossier « ${d.nom} » ?` + (n ? ` Son contenu (${n} élément${n > 1 ? 's' : ''}) n'est pas supprimé : il retourne dans le dossier parent.` : '')))) return;
      // Le contenu remonte d'un cran : sous-dossiers et évaluations rangées directement dans ce dossier.
      const parent = d.parent_id || null;
      await sb.from('eval_dossiers').update({ parent_id: parent }).eq('parent_id', id);
      if(parent) await sb.from('eval_rangement').update({ dossier_id: parent }).eq('dossier_id', id);
      await sb.from('figures_sauvegardees').update({ dossier_id: parent }).eq('dossier_id', id).eq('user_id', currentUser.id); // sans parent : à la racine
      for(const S of Object.values(EVF_SORTES)) if(evf.autres.some(x => EVF_SORTES[x.s] === S && x.dossier_id === id)) await sb.from(S.table).update({ dossier_id: parent }).eq('dossier_id', id).eq(S.proprio, currentUser.id);
      const { error } = await sb.from('eval_dossiers').delete().eq('id', id);
      if(error){ await niceAlert('Suppression impossible : ' + error.message); return; }
      if(evf.courant === id) evf.courant = parent;
      await openEvalListModal();
    }
  };
  setTimeout(() => document.addEventListener('pointerdown', function f(ev){ if(!m.contains(ev.target)){ evfMenuFermer(); document.removeEventListener('pointerdown', f, true); } }, true), 0);
}
// « Déplacer vers… » : l'arborescence des dossiers dans le menu (utile au doigt, où l'on ne glisse pas).
function evfChoixDossier(m, quoi){
  const interdits = quoi[0] === 'd' ? evfDescendants(quoi.slice(2)) : new Set();
  const arbre = (parent, niv) => evf.dossiers.filter(d => (d.parent_id || null) === parent && !interdits.has(d.id)).sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }))
    .map(d => `<button type="button" data-vers="${d.id}" style="padding-left:${10 + niv * 16}px;"><span class="gicon">folder</span> ${escapeHtml(d.nom)}</button>` + arbre(d.id, niv + 1)).join('');
  m.innerHTML = `<div class="evf-menu-t">Déplacer vers</div><button type="button" data-vers=""><span class="gicon">home</span> Mes dossiers (racine)</button>${arbre(null, 1)}`
    + `<button type="button" data-vers="__nouveau"><span class="gicon">create_new_folder</span> Nouveau dossier…</button>`;
  m.onclick = async ev => {
    const b = ev.target.closest('[data-vers]'); if(!b) return;
    evfMenuFermer();
    let vers = b.dataset.vers || null;
    if(vers === '__nouveau'){
      const nom = await nicePrompt('Nom du nouveau dossier :', ''); if(nom === null || !nom.trim()) return;
      const { data, error } = await sb.from('eval_dossiers').insert({ nom: nom.trim().slice(0, 80), parent_id: evf.courant }).select('id').single();
      if(error){ await niceAlert('Dossier non créé : ' + error.message); return; }
      vers = data.id; evf.dossiers.push({ id: vers, nom: nom.trim(), parent_id: evf.courant });
    }
    await evfDeplacer(quoi, vers);
  };
}
/* Copie d'une évaluation -- demandé : « Peut-on faire une copie d'une évaluation ? ». La copie
   appartient à celui qui la fait (même si l'originale lui a été partagée), sans les collègues
   de l'originale ni son historique (« Annuler ») ; elle s'ouvre aussitôt, l'originale reste intacte.
   Sans id : copie de l'évaluation ouverte (enregistrée d'abord si besoin). */
async function duplicateEvaluation(id){
  if(!currentUser){ await niceAlert("Connectez-vous pour faire une copie d'une évaluation."); return; }
  if(!id){
    if(!evaluationExercises.length){ await niceAlert("Ouvrez ou créez d'abord une évaluation."); return; }
    clearTimeout(evalAutoSaveTimer);
    await autoSaveEvaluation(); // la copie part de l'état affiché
    id = currentEvaluationId;
    if(!id){ await niceAlert("L'évaluation n'a pas pu être enregistrée : copie impossible pour l'instant."); return; }
  }
  const { data: src, error } = await sb.from('evaluations').select('title,niveau,classes,eval_date,duree,data').eq('id', id).single();
  if(error || !src){ await niceAlert("Copie impossible : " + ((error && error.message) || 'évaluation introuvable')); return; }
  const titre = await nicePrompt("Titre de la copie :", 'Copie de ' + (src.title || 'Évaluation'));
  if(titre === null) return;
  const { data: copie, error: e2 } = await sb.from('evaluations').insert({
    title: titre.trim() || ('Copie de ' + (src.title || 'Évaluation')), niveau: src.niveau, classes: src.classes, eval_date: src.eval_date, duree: src.duree,
    data: src.data, owner_id: currentUser.id, updated_by: currentUser.id }).select('id').single();
  if(e2){ await niceAlert("Copie impossible : " + e2.message); return; }
  await loadEvaluation(copie.id);
  document.getElementById('evalSaveStatus').textContent = '✓ Copie créée et ouverte : vous travaillez maintenant sur la copie.';
}
/* Suppression réservée au propriétaire (signalé : "permettre au propriétaire de supprimer
   une évaluation") -- vérifié aussi côté serveur (RLS) par owner_id=auth.uid(), ce contrôle
   côté client n'est qu'un confort d'affichage (le bouton n'apparaît que pour lui). */
async function deleteEvaluationPrompt(id, title){
  if(!(await niceConfirm(`Supprimer définitivement l'évaluation "${title}" ?`))) return;
  const { error } = await sb.from('evaluations').delete().eq('id', id);
  if(error){ await niceAlert("Erreur : "+error.message); return; }
  await openEvalListModal();
}
function closeEvalListModal(){ if(typeof evfMenuFermer === 'function') evfMenuFermer(); document.getElementById('evalListModalOverlay').style.display='none'; }
// Synchronisation quasi temps réel entre collègues éditant la même évaluation -- demandé :
// "on ne peut pas travailler ensemble sur l'interrogation en même temps ?". Pas d'édition
// simultanée caractère par caractère (nécessiterait une fusion des frappes en direct, un
// chantier bien plus lourd) : dès qu'un collègue sauvegarde (automatiquement ou manuellement),
// une notification apparaît pour recharger et voir ses modifications -- évite qu'une
// sauvegarde écrase silencieusement le travail de l'autre.
let evalRealtimeChannel = null;
function unsubscribeEvalRealtime(){
  if(evalRealtimeChannel){ sb.removeChannel(evalRealtimeChannel); evalRealtimeChannel = null; }
}
function subscribeEvalRealtime(evalId){
  unsubscribeEvalRealtime();
  evalRealtimeChannel = sb.channel('eval-'+evalId)
    .on('postgres_changes', { event:'UPDATE', schema:'public', table:'evaluations', filter:'id=eq.'+evalId }, async (payload)=>{
      if(!payload.new || payload.new.updated_by===currentUser.id) return; // notre propre sauvegarde
      let nom = 'Un collègue';
      if(payload.new.updated_by){
        const { data: p } = await sb.from('profiles').select('nom').eq('id', payload.new.updated_by).single();
        if(p && p.nom) nom = p.nom;
      }
      const banner = document.getElementById('evalCollabBanner');
      if(banner) banner.innerHTML = `<div class="redaction-note" style="background:rgba(255,130,8,.1);border-color:rgba(255,130,8,.35);color:#8A5A00;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <span class=gicon>bolt</span>
        <span><b>${escapeHtml(nom)}</b> vient de modifier cette évaluation.</span>
        <button type="button" class="btn secondary" style="padding:4px 10px;font-size:.78rem;" onclick="loadEvaluation('${evalId}')">Recharger pour voir ses modifications</button>
      </div>`;
    })
    .subscribe();
}
async function loadEvaluation(id){
  const { data, error } = await sb.from('evaluations').select('*').eq('id', id).single();
  if(error){ await niceAlert("Échec du chargement : "+error.message); return; }
  evalSuppressAutoSave = true;
  currentEvaluationId = data.id;
  subscribeEvalRealtime(data.id);
  const collabBanner = document.getElementById('evalCollabBanner');
  if(collabBanner) collabBanner.innerHTML = '';
  lastEvaluationTitle = data.title || null;
  document.getElementById('evalNiveau').value = data.niveau || '6e';
  document.getElementById('evalClasses').value = data.classes || '';
  document.getElementById('evalDate').value = data.eval_date || '';
  document.getElementById('evalDuree').value = data.duree || 55;
  document.getElementById('evalLineHeight').value = (data.data && data.data.evalLineHeight) || '1.5';
  document.getElementById('evalConsignes').value = (data.data && data.data.evalConsignes) || '';
  document.getElementById('evalShowConsignes').checked = (data.data && data.data.evalShowConsignes!==undefined) ? data.data.evalShowConsignes : true;
  document.getElementById('evalAppreciationLines').value = (data.data && data.data.evalAppreciationLines) || '2';
  document.getElementById('evalIncludeGrilleNotation').checked = (data.data && data.data.evalIncludeGrilleNotation!==undefined) ? data.data.evalIncludeGrilleNotation : true;
  document.getElementById('evalGrilleNotation').value = (data.data && data.data.evalGrilleNotation!==undefined) ? data.data.evalGrilleNotation : DEFAULT_GRILLE_NOTATION_TEXT;
  evalPageBreaksAfter = new Set((data.data && data.data.pageBreaksAfter) || []);
  const savedType = (data.data && data.data.evalType) || 'Évaluation';
  const typeSelect = document.getElementById('evalType');
  typeSelect.value = Array.from(typeSelect.options).some(o=>o.value===savedType) ? savedType : '__custom';
  document.getElementById('evalTypeCustom').value = (data.data && data.data.evalTypeCustom) || (typeSelect.value==='__custom' ? savedType : '');
  document.getElementById('evalTypeCustom').style.display = typeSelect.value==='__custom' ? 'inline-block' : 'none';
  document.getElementById('evalTitreAjout').value = (data.data && data.data.evalTitreAjout) || '';
  evaluationExercises = (data.data && data.data.evaluationExercises) || [];
  // Blocs de l'évaluation ouverte auparavant (énoncés et corrections) retirés d'abord : une correction de l'ancienne
  // évaluation ne doit jamais apparaître sous l'exercice de même numéro de la nouvelle.
  Object.keys(blocksStores).forEach(k=>{ if(/^(ex|cor)-\d+$/.test(k)) delete blocksStores[k]; });
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
  updateSyncedSnapshot();
  document.getElementById('btnEvalUndo').style.display = data.previous_data ? 'inline-flex' : 'none';
  renderEvalChapPicker();
  renderEvalExercicesList();
  evalSuppressAutoSave = false;
  closeEvalListModal();
  document.getElementById('evalSaveStatus').textContent = "✓ Évaluation chargée";
}
async function shareEvaluation(){
  if(!currentEvaluationId){ await niceAlert("Sauvegardez d'abord cette évaluation (bouton <span class=gicon>save</span>) avant de la partager."); return; }
  document.getElementById('evalShareModalOverlay').style.display='flex';
  const box = document.getElementById('evalShareContent');
  box.innerHTML = 'Chargement…';
  const { data, error } = await sb.rpc('list_colleagues_same_uai', {p_eval_id: currentEvaluationId});
  if(error){ box.innerHTML = "Erreur : "+error.message; return; }
  const roleLabel = r => r==='editor' ? '<span class=gicon>edit</span> Éditeur' : r==='reader' ? '<span class=gicon>visibility</span> Lecteur' : '';
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
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','reader')"><span class=gicon>visibility</span> Lecteur</button>
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','editor')"><span class=gicon>edit</span> Éditeur</button>
          </span>
        `}
      </div>
    `).join('');
  }
  html += `
    <p class="hint" style="margin:16px 0 6px;">Ou par e-mail :</p>
    <div class="tool-row" style="margin-bottom:0;">
      <input type="text" id="evalShareEmail" placeholder="e-mail d'un collègue" style="flex:1;min-width:180px;">
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'reader')"><span class=gicon>visibility</span> Lecteur</button>
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'editor')"><span class=gicon>edit</span> Éditeur</button>
    </div>
    <p class="hint" style="margin:8px 0 0;"><span class=gicon>visibility</span> Lecteur : peut consulter et imprimer. <span class=gicon>edit</span> Éditeur : peut aussi modifier. Vous restez seul·e propriétaire (personne d'autre ne peut supprimer l'évaluation).</p>
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
  const list = CHAPITRES_BY_LEVEL[niveau] || CH6;
  const box = document.getElementById('evalChapPicker');
  const seen = new Set();
  box.innerHTML = list.filter(c=>{ if(seen.has(c.t)) return false; seen.add(c.t); return true; }).map(c=>`
    <label style="display:inline-flex;align-items:center;gap:5px;background:rgba(28,43,57,.04);padding:5px 10px;border-radius:20px;font-size:.85rem;cursor:pointer;">
      <input type="checkbox" class="evalChapCheck" value="${escapeHtml(c.t)}"> ${escapeHtml(c.code)} · ${escapeHtml(c.t)}
    </label>
  `).join('');
}
function getSelectedEvalChapitres(){
  return Array.from(document.querySelectorAll('.evalChapCheck:checked')).map(el=>el.value);
}
function evaluationPrompt(niveau, chapitres, nbExo, duree, questionCours){
  return `Tu es un ${typeof iaEnseignant==='function' ? iaEnseignant(niveau) : 'professeur de mathématiques'} qui prépare une évaluation pour une classe de ${typeof niveauLabel==='function' ? niveauLabel(niveau) : niveau}. ${typeof iaContexteNiveau==='function' ? iaContexteNiveau(niveau) : ''}
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
  const html = `<div style="padding:0;">${renderMathText(text)}</div>`;
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
    statusEl.textContent = `${list.length} exercice(s) généré(s) par l'IA, à relire et ajuster avant impression.`;
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
      // en repassant par l'édition (bouton <span class=gicon>edit</span>), pour éviter une suppression accidentelle.
      return `
      <div class="tool-shell" style="margin-bottom:8px;">
        <div style="display:grid;grid-template-columns:1fr 90px auto;align-items:center;margin-bottom:6px;gap:8px;">
          <strong style="font-family:'Space Grotesk',sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Exercice ${i+1}${ex.title?' · '+escapeHtml(ex.title):''}</strong>
          <span class="hint" style="margin:0;text-align:right;">${ex.bareme ? formatPts(ex.bareme) : ''}</span>
          <span style="display:flex;gap:6px;align-items:center;">
            <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
            <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
            <button type="button" onclick="editEvalExercice(${ex.id})" title="Modifier ou supprimer" style="border:none;background:rgba(31,58,92,.08);border-radius:6px;padding:4px 10px;cursor:pointer;"><span class=gicon>edit</span> Éditer</button>
            <button type="button" onclick="toggleEvalPageBreak(${ex.id})" title="Insérer un saut de page après cet exercice" style="border:none;background:${evalPageBreaksAfter.has(ex.id)?'rgba(31,58,92,.15)':'rgba(28,43,57,.06)'};color:${evalPageBreaksAfter.has(ex.id)?'#1F3A5C':'inherit'};border-radius:6px;padding:4px 10px;cursor:pointer;">✂</button>
          </span>
        </div>
        <div>${blocksRowsHTML(ctx, ex.rows, false, ex.cellBorders)}</div>
        ${evalCorHTML(ex)}
      </div>
      ${evalPageBreaksAfter.has(ex.id) ? '<div style="border-top:2px dashed #1F3A5C;margin:0 0 8px;padding-top:4px;text-align:center;"><span class="hint" style="color:#1F3A5C;">✂ Saut de page ici à l\'impression</span></div>' : ''}
    `;
    }
    return `
    <div class="tool-shell" style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exercice ${i+1}</strong>
        <span style="display:flex;gap:6px;align-items:center;">
          <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
          <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
          <button type="button" onclick="validateEvalExercice(${ex.id})" title="Aperçu final, sans les outils" style="border:none;background:rgba(35,140,90,.12);color:#1F7A4D;border-radius:6px;padding:3px 9px;cursor:pointer;">✓ Valider</button>
          <button type="button" onclick="toggleEvalPageBreak(${ex.id})" title="Insérer un saut de page après cet exercice" style="border:none;background:${evalPageBreaksAfter.has(ex.id)?'rgba(31,58,92,.15)':'rgba(28,43,57,.06)'};color:${evalPageBreaksAfter.has(ex.id)?'#1F3A5C':'inherit'};border-radius:6px;padding:3px 9px;cursor:pointer;">✂ ${evalPageBreaksAfter.has(ex.id)?'Saut de page ✓':'Saut de page'}</button>
          <button type="button" onclick="removeEvalExercice(${ex.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;"><span class=gicon>close</span> Supprimer l'exercice</button>
        </span>
      </div>
      <div class="tool-row" style="margin-bottom:5px;">
        <input type="text" placeholder="Titre de l'exercice (facultatif)" value="${escapeHtml(ex.title||'')}" oninput="updateEvalExerciceField(${ex.id},'title',this.value)" style="flex:1;min-width:200px;padding:7px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);">
        <label class="hint" style="margin:0;">Barème : <input type="number" min="0" step="0.5" value="${ex.bareme!=null?ex.bareme:''}" oninput="updateEvalExerciceField(${ex.id},'bareme',this.value)" style="width:60px;margin-left:4px;"> <span id="baremeSuffixe-${ex.id}">${Number(ex.bareme)===1?'pt':'pts'}</span></label>
      </div>
      <div class="eval-blocks-preview" style="margin-top:2px;">${blocksRowsHTML(ctx, ensureExRows(ex), true, ex.cellBorders)}</div>
      <div class="tool-row" style="margin-top:10px;align-items:center;flex-wrap:wrap;">
        <span class="hint" style="margin:0;">Mise en page :</span>
        ${ex.rows.map((nc,rowIdx)=>`
          <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(28,43,57,.04);padding:3px 8px 3px 10px;border-radius:14px;">
            <span class="hint" style="margin:0;">L${rowIdx+1} :</span>
            <input type="number" min="1" max="6" value="${nc}" onchange="setEvalRowCols(${ex.id},${rowIdx},parseInt(this.value)||1)" style="width:38px;">
            ${ex.rows.length>1 ? `<button type="button" onclick="removeEvalRow(${ex.id},${rowIdx})" title="Retirer cette ligne" style="border:none;background:none;cursor:pointer;color:#D93025;font-size:.9rem;"><span class=gicon>close</span></button>` : ''}
          </span>
        `).join('')}
        <button type="button" class="btn secondary" onclick="addEvalRow(${ex.id})" style="font-size:.78rem;padding:4px 10px;">+ Nouvelle ligne</button>
        ${hasDisks ? `<label class="hint" style="margin:0;"><span class=gicon>pie_chart</span> Taille des disques : <input type="number" min="30" max="300" step="10" value="${ex.diskSize||150}" onchange="updateEvalExerciceField(${ex.id},'diskSize',parseInt(this.value)||150); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
        ${hasRects ? `<label class="hint" style="margin:0;">▭ Taille des rectangles : <input type="number" min="30" max="350" step="10" value="${ex.rectSize||180}" onchange="updateEvalExerciceField(${ex.id},'rectSize',parseInt(this.value)||180); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
      </div>
      <p class="hint" style="margin:4px 0 0;">Fais glisser un bloc pour changer sa ligne/colonne (utilise les outils ci-dessous pour en ajouter, y compris du texte). Pour élargir une colonne, tire la barre grise entre deux colonnes (double-clic : colonnes identiques).</p>
      <div class="tool-row" style="margin-top:6px;">${toolButtonsHTML(ctx)}</div>
      ${evalCorHTML(ex)}
    </div>
    ${evalPageBreaksAfter.has(ex.id) ? '<div style="border-top:2px dashed #1F3A5C;margin:0 0 8px;padding-top:4px;text-align:center;"><span class="hint" style="color:#1F3A5C;">✂ Saut de page ici à l\'impression</span></div>' : ''}
  `;}).join('');
  attachResizeObservers();
  scheduleEvalAutoSave();
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
  colDecalerLargeurs(ex.cellBorders, rowIdx, ex.rows.length);
  ex.rows.splice(rowIdx,1);
  renderEvalExercicesList();
}
function updateEvalExerciceField(id, field, value){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex[field] = value;
  if(field==='bareme'){
    updateEvalBaremeTotalDisplay();
    const suffixe = document.getElementById('baremeSuffixe-'+id);
    if(suffixe) suffixe.textContent = (parseFloat(value)===1) ? 'pt' : 'pts';
  }
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
  delete blocksStores['ex-'+id]; delete blocksStores['cor-'+id];
  renderEvalExercicesList();
}
function toggleEvalPageBreak(id){
  if(evalPageBreaksAfter.has(id)) evalPageBreaksAfter.delete(id);
  else evalPageBreaksAfter.add(id);
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
/* ===== Corrigé de l'évaluation -- demandé le 10/11/2026 : « Quand on a une évaluation, peut-on en faire une correction rapide
   avec l'IA ? ou nous-même dans l'outil correction, en reprenant les exercices de l'interrogation écrite ? » (réponse : « les deux »).
   Sous chaque exercice, une zone « Correction » : blocs du contexte 'cor-<id>' (mêmes outils que l'outil de correction : texte,
   opérations posées, figures…), mise en page dans ex.cor (rows, cellBorders, comme un exercice ; voir getExerciseByCtx, app.js).
   ex.cor.ia = proposition de l'IA pas encore relue. Exercice tiré du manuel : son corrigé du site, sans IA. Le corrigé est
   enregistré avec l'évaluation (partagé avec les collègues qui y ont accès) ; les élèves ne le voient que s'il est ajouté au
   cahier (« Ajouter au cahier » › « Énoncés et corrigé »). ===== */
const evalCorOuverts = new Set();   // zones « Correction » dépliées (affichage seulement)
const evalCorIAEnCours = new Set(); // exercices dont l'IA rédige le corrigé
function evalCorBlocs(ex){ return blocksStores['cor-' + ex.id] || []; }
function evalCorA(ex){ return evalCorBlocs(ex).length > 0; }
// Exercices du manuel contenus dans l'énoncé (blocs « manuel ») : leur corrigé existe déjà sur le site.
function evalCorManuels(ex){
  return (blocksStores['ex-' + ex.id] || []).filter(b => b.type === 'manuel' && b.data).map(b => {
    const p = typeof plDe === 'function' ? plDe(b.data.lvl, b.data.t)[b.data.i] : null, x = p && p.exos && p.exos[b.data.k];
    return x ? { b, x } : null;
  }).filter(Boolean);
}
function evalCorHTML(ex){
  const id = ex.id, ctx = 'cor-' + id, cor = getExerciseByCtx(ctx);
  const ouvert = evalCorOuverts.has(id), a = evalCorA(ex), enCours = evalCorIAEnCours.has(id), manuel = evalCorManuels(ex).length > 0;
  const etat = enCours ? '<span class="eval-cor-etat attente"><span class=gicon>hourglass_top</span> L\'IA rédige le corrigé…</span>'
    : !a ? '<span class="eval-cor-etat vide">à rédiger</span>'
    : cor.ia ? '<span class="eval-cor-etat ia"><span class=gicon>smart_toy</span> proposé par l\'IA, à relire</span>'
    : '<span class="eval-cor-etat ok"><span class=gicon>check</span> rédigé</span>';
  let corps = '';
  if(ouvert){
    corps = `<div class="eval-cor-corps">
      ${a ? '' : `<p class="hint" style="margin:0 0 6px;">Écrivez la correction avec les outils ci-dessous (Texte pour les calculs et les phrases, opérations posées, figures…)${manuel ? ', reprenez le corrigé du manuel' : ''}, ou laissez l'IA la proposer.</p>`}
      <div class="eval-blocks-preview">${blocksRowsHTML(ctx, cor.rows, true, cor.cellBorders)}</div>
      <div class="tool-row" style="margin-top:8px;align-items:center;flex-wrap:wrap;">
        <span class="hint" style="margin:0;">Mise en page :</span>
        ${cor.rows.map((nc, r) => `<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(28,43,57,.04);padding:3px 8px 3px 10px;border-radius:14px;">
          <span class="hint" style="margin:0;">L${r + 1} :</span>
          <input type="number" min="1" max="6" value="${nc}" onchange="evalCorColonnes(${id},${r},parseInt(this.value)||1)" style="width:38px;">
          ${cor.rows.length > 1 ? `<button type="button" onclick="evalCorRetirerLigne(${id},${r})" title="Retirer cette ligne" style="border:none;background:none;cursor:pointer;color:#D93025;font-size:.9rem;"><span class=gicon>close</span></button>` : ''}
        </span>`).join('')}
        <button type="button" class="btn secondary" onclick="evalCorAjouterLigne(${id})" style="font-size:.78rem;padding:4px 10px;">+ Nouvelle ligne</button>
      </div>
      <div class="tool-row" style="margin-top:6px;">${toolButtonsHTML(ctx)}</div>
    </div>`;
  }
  return `<div class="eval-cor${ouvert ? ' ouvert' : ''}${a && cor.ia ? ' a-relire' : ''}">
    <div class="eval-cor-tete">
      <button type="button" class="eval-cor-bascule" onclick="evalCorBasculer(${id})" aria-expanded="${ouvert}" title="${ouvert ? 'Replier la correction' : 'Déplier la correction pour l\'écrire ou la modifier'}"><span class=gicon>${ouvert ? 'expand_more' : 'chevron_right'}</span> Correction</button>
      ${etat}
      <span style="flex:1;"></span>
      ${manuel ? `<button type="button" class="eval-cor-btn" onclick="evalCorManuel(${id})" title="Reprendre le corrigé de cet exercice tel qu'il est dans le manuel du site"><span class=gicon>auto_stories</span> Corrigé du manuel</button>` : ''}
      <button type="button" class="eval-cor-btn needs-ai-eval" onclick="evalCorIA(${id})" ${enCours ? 'disabled' : ''} title="L'IA lit l'énoncé (figures comprises) et rédige la correction, question par question, selon les règles de rédaction du site. À relire avant de la distribuer."><span class=gicon>smart_toy</span> ${a ? 'Refaire avec l\'IA' : 'Rédiger avec l\'IA'}</button>
      ${a && cor.ia ? `<button type="button" class="eval-cor-btn ok" onclick="evalCorRelu(${id})" title="Vous avez relu (et corrigé si besoin) cette proposition de l'IA"><span class=gicon>check</span> Corrigé relu</button>` : ''}
    </div>
    ${!ouvert && a ? `<div class="eval-cor-apercu">${blocksRowsHTML(ctx, cor.rows, false, cor.cellBorders)}</div>` : ''}
    ${corps}
  </div>`;
}
function evalCorBasculer(id){ evalCorOuverts.has(id) ? evalCorOuverts.delete(id) : evalCorOuverts.add(id); renderEvalExercicesList(); }
async function evalCorOuvrirTout(){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez d'abord les exercices de l'évaluation."); return; }
  evaluationExercises.forEach(ex => evalCorOuverts.add(ex.id));
  renderEvalExercicesList();
  const z = document.querySelector('#evalExercicesList .eval-cor'); if(z) z.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function evalCorColonnes(id, r, n){ const c = getExerciseByCtx('cor-' + id); if(c) c.rows[r] = Math.max(1, Math.min(6, n)); renderEvalExercicesList(); }
function evalCorAjouterLigne(id){ const c = getExerciseByCtx('cor-' + id); if(c) c.rows.push(1); renderEvalExercicesList(); }
function evalCorRetirerLigne(id, r){
  const c = getExerciseByCtx('cor-' + id); if(!c || c.rows.length <= 1) return;
  (blocksStores['cor-' + id] || []).forEach(b => { const q = b.row || 0; if(q === r) b.row = Math.max(0, r - 1); else if(q > r) b.row = q - 1; });
  colDecalerLargeurs(c.cellBorders, r, c.rows.length);
  c.rows.splice(r, 1);
  renderEvalExercicesList();
}
function evalCorRelu(id){ const c = getExerciseByCtx('cor-' + id); if(c) c.ia = false; renderEvalExercicesList(); }
// Remplace la correction d'un exercice par un seul bloc (texte de l'IA, ou corrigé du manuel).
function evalCorPoser(id, blocs, ia){
  const ctx = 'cor-' + id, c = getExerciseByCtx(ctx); if(!c) return;
  blocksStores[ctx] = blocs.map((b, n) => ({ id: pendingBlockNextId++, ctx, col: 0, row: n, ...b }));
  c.rows = blocs.map(() => 1); c.cellBorders = {}; c.ia = !!ia;
  evalCorOuverts.add(id);
}
async function evalCorManuel(id, silencieux){
  const ex = evaluationExercises.find(e => e.id === id); if(!ex) return false;
  const l = evalCorManuels(ex); if(!l.length) return false;
  if(!silencieux && evalCorA(ex) && !(await niceConfirm('Remplacer la correction actuelle de cet exercice par le corrigé du manuel ?'))) return false;
  evalCorPoser(id, l.map(({ b, x }) => ({ type: 'manuel', html: plExoCopieHtml(x, true), data: { ...b.data, corrige: true }, editFn: null })), false);
  renderEvalExercicesList();
  return true;
}
// Énoncé lu par l'IA : le texte des blocs, dans l'ordre de la page, et jusqu'à 3 figures en image.
const EVAL_COR_TYPES = { figure: 'figure', figdyn: 'figure', image: 'image', tableau: 'tableau', axe: 'axe gradué', repere: 'repère', graph: 'graphique', stats: 'diagramme', disque: 'fraction (disque)', rectFrac: 'fraction (rectangle)', cubes: 'cubes empilés', manuel: 'exercice', divisionPosee: 'division posée' };
async function evalCorEnonce(ex){
  const blocs = (blocksStores['ex-' + ex.id] || []).slice().sort((a, b) => (a.row || 0) - (b.row || 0) || (a.col || 0) - (b.col || 0));
  const morceaux = blocs.map(b => {
    if(b.type === 'texte' && b.data && typeof b.data.text === 'string') return b.data.text.trim();
    const d = document.createElement('div'); d.innerHTML = b.html || '';
    d.querySelectorAll('script,style,.gicon').forEach(x => x.remove());
    const t = (d.textContent || '').replace(/\s+/g, ' ').trim();
    return `[${EVAL_COR_TYPES[b.type] || 'élément'}${t ? ' : ' + t.slice(0, 2500) : ''}]`;
  }).filter(Boolean);
  const images = [];
  if(blocs.some(b => b.type !== 'texte' && /<svg|<img|<canvas/i.test(b.html || ''))){
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;left:-10000px;top:0;width:680px;background:#fff;';
    box.innerHTML = blocksRowsHTML('ex-' + ex.id, ensureExRows(ex), false, ex.cellBorders);
    document.body.appendChild(box);
    try{
      for(const svg of Array.from(box.querySelectorAll('svg'))){
        if(images.length >= 3) break;
        const r = svg.getBoundingClientRect(); if(r.width < 60 || r.height < 40) continue; // icônes, petits signes
        const res = await svgToPngDataUrl(svg, 1.5);
        if(res) images.push({ media_type: 'image/png', data: res.dataUrl.split(',')[1] });
      }
    }finally{ box.remove(); }
  }
  return { texte: morceaux.join('\n\n'), images };
}
function evalCorPrompt(ex, rang, enonce, niveau){
  const primaire = /^(cp|ce1|ce2|cm1|cm2)$/i.test(niveau);
  const regles = [
    'Question à COMPLÉTER (« Complète », « Remplis », « Écris le nombre qui manque », pointillés « … », cases ou trous à remplir) : corrige UNIQUEMENT en complétant. Recopie la ligne de l\'énoncé avec les trous remplis, chaque réponse ajoutée en **gras**, une ligne par item : ni titre, ni calcul intermédiaire, ni explication du pourquoi, ni phrase de conclusion. Même chose pour une question où l\'élève entoure, coche, relie, range ou répond par vrai / faux : seulement la réponse attendue.',
    'Pour les autres questions : sa référence telle qu\'elle figure dans l\'énoncé (a), b), Question 1…) s\'il y en a une, puis un titre qui dit ce que demande la question (la grandeur ou l\'objet cherché, par exemple « Prix total des cahiers », « Aire du triangle ABC » ; jamais un mot seul comme « Calcul », « Total » ou « Réponse », jamais un simple complément comme « En une semaine »), écrit entre doubles tirets bas puis suivi de deux-points : __Prix total des cahiers__ :',
    'Puis le raisonnement : un seul calcul par ligne ; jamais de mots dans une ligne de calcul (ni « donc », ni « soit », ni « de », ni « et » entre deux calculs) : les mots vont dans le titre et dans la phrase. Un calcul long se développe sur plusieurs lignes qui commencent par « = ».',
    'Puis une phrase de conclusion qui répond à la question, avec l\'unité.',
    'Une ligne vide entre deux questions.',
    'Multiplication : ×. Division : « : » (jamais ÷).' + (primaire ? '' : ' Au collège, une division qui sert à calculer une fraction d\'une quantité, un pourcentage, une quatrième proportionnelle, une aire de triangle, un volume de pyramide ou une moyenne s\'écrit en fraction : (2 × 35)/5 = 70/5 = 14.'),
    'Fractions écrites a/b ou (expression)/(expression) ; puissances avec ^ (3^2) ; racine carrée sqrt(…) ; jamais de LaTeX, jamais de signe $.',
    'Nombres décimaux avec une virgule ; nombres en lettres, s\'il y en a, en orthographe rectifiée (traits d\'union entre tous les mots : « deux-mille-quatre-cent-six », « vingt-et-un »).',
    'Pas de numérotation « 1. », « 2. » en début de ligne, pas de tiret cadratin, pas de markdown autre que __titre__ et **gras**, pas d\'émoji.',
    'Question de construction ou de tracé : le programme de construction, une étape par ligne, suivi de « (figure à tracer) ».',
  ];
  if(ex.bareme) regles.push(`Après la phrase de conclusion de chaque question, les points qu'elle rapporte entre crochets ([1 pt], [0,5 pt]), la somme faisant ${formatPts(ex.bareme)}.`);
  regles.push('Réponds uniquement par le corrigé : ne recopie pas l\'énoncé, n\'ajoute ni introduction ni commentaire.');
  return `Tu es ${typeof iaEnseignant === 'function' ? iaEnseignant(niveau) : 'professeur de mathématiques'}. Tu rédiges le CORRIGÉ d'un exercice d'une évaluation de ${typeof niveauLabel === 'function' ? niveauLabel(niveau) : niveau}, tel que le professeur le distribuera ou le projettera à ses élèves. ${typeof iaContexteNiveau === 'function' ? iaContexteNiveau(niveau) : ''}

Exercice ${rang + 1}${ex.title ? ' (« ' + ex.title + ' »)' : ''}${ex.bareme ? ', noté sur ' + formatPts(ex.bareme) : ''}.${enonce.images.length ? ' Les figures de l\'énoncé sont jointes en image.' : ''}
Énoncé (les éléments entre crochets sont des tableaux, figures ou exercices insérés, donnés par leur texte) :
<<<
${enonce.texte}
>>>

Rédige la correction, question par question, en respectant strictement ces règles :
${regles.map(r => '- ' + r).join('\n')}`;
}
// Réponse de l'IA : sans balises de code ni signes interdits par les règles du site.
function evalCorNettoyer(raw){
  return String(raw || '').replace(/^\s*```[a-z]*\s*/i, '').replace(/```\s*$/, '')
    .replace(/÷/g, ':').replace(/\\div\b/g, ':').replace(/\s—\s/g, ', ').replace(/—/g, '-')
    .replace(/^\s*(\d+)\.\s+/gm, '').replace(/\n{3,}/g, '\n\n').trim();
}
async function evalCorIA(id, silencieux){
  const ex = evaluationExercises.find(e => e.id === id); if(!ex) return false;
  if(!currentUser){ if(!silencieux) await niceAlert("Connectez-vous pour faire rédiger le corrigé par l'IA."); return false; }
  if(!silencieux && evalCorA(ex) && !(await niceConfirm("Remplacer la correction actuelle de cet exercice par une nouvelle proposition de l'IA ?"))) return false;
  const enonce = await evalCorEnonce(ex);
  if(!enonce.texte.trim() && !enonce.images.length){ if(!silencieux) await niceAlert("Cet exercice n'a pas encore d'énoncé."); return false; }
  evalCorIAEnCours.add(id); renderEvalExercicesList();
  try{
    const niveau = document.getElementById('evalNiveau').value;
    const rang = evaluationExercises.findIndex(e => e.id === id);
    const raw = await callClaude(evalCorPrompt(ex, rang, enonce, niveau), 3000, { feature: 'evaluation', niveau, images: enonce.images.length ? enonce.images : undefined });
    const texte = evalCorNettoyer(raw);
    if(!texte) throw new Error('réponse vide');
    evalCorPoser(id, [{ type: 'texte', html: `<div style="padding:4px 0;">${renderMathText(texte)}</div>`, data: { text: texte }, editFn: 'reopenTextBlock' }], true);
    return true;
  }catch(err){
    if(!silencieux) await niceAlert("L'IA n'a pas pu rédiger ce corrigé : " + (err.message === 'no-session' ? 'reconnectez-vous.' : err.message));
    return false;
  }finally{
    evalCorIAEnCours.delete(id); renderEvalExercicesList();
  }
}
// Tous les exercices sans correction : corrigé du manuel s'il existe, sinon l'IA (un exercice après l'autre).
async function evalCorIATout(){
  const statut = document.getElementById('evalCorStatus'), btn = document.getElementById('btnEvalCorIA');
  if(!evaluationExercises.length){ await niceAlert("Ajoutez d'abord les exercices de l'évaluation."); return; }
  const aFaire = evaluationExercises.filter(ex => !evalCorA(ex));
  if(!aFaire.length){ await niceAlert("Chaque exercice a déjà sa correction. Pour en refaire une, utilisez « Refaire avec l'IA » sous l'exercice."); return; }
  if(btn) btn.disabled = true;
  let ok = 0, echecs = 0;
  for(const [n, ex] of aFaire.entries()){
    if(statut) statut.textContent = `Corrigé en cours : exercice ${evaluationExercises.indexOf(ex) + 1} (${n + 1} sur ${aFaire.length})…`;
    const fait = evalCorManuels(ex).length && evalCorManuels(ex).length === (blocksStores['ex-' + ex.id] || []).length ? await evalCorManuel(ex.id, true) : await evalCorIA(ex.id, true);
    fait ? ok++ : echecs++;
  }
  if(btn) btn.disabled = false;
  if(statut) statut.textContent = `${ok} corrigé${ok > 1 ? 's' : ''} rédigé${ok > 1 ? 's' : ''}${echecs ? `, ${echecs} échec${echecs > 1 ? 's' : ''} (réessayez avec « Rédiger avec l'IA » sous l'exercice)` : ''}. Relisez chaque proposition de l'IA, puis cliquez « Corrigé relu ».`;
}
/* Exercices du manuel (planches, planches-choix.js) -- demandé : « profiter de cette base d'exercices
   pour les insérer dans une interrogation en ligne ou papier ». Chaque exercice choisi devient un
   exercice de l'évaluation, avec un bloc « manuel » (énoncé tel qu'il s'imprime, figures comprises) :
   on peut ensuite ajouter un titre, un barème, d'autres blocs, ou le retirer comme les autres. */
async function evalAjouterManuel(){
  if(typeof plChoisirExos !== 'function') return;
  const l = await plChoisirExos({ titre: 'Exercices du manuel pour l\'évaluation', lvl: document.getElementById('evalNiveau').value,
    aide: 'Cochez les exercices dans l\'ordre où ils doivent apparaître, dans un ou plusieurs chapitres. Ils s\'ajoutent à la fin de l\'évaluation, tels qu\'ils s\'impriment.',
    bouton: n => n > 1 ? `Ajouter ces ${n} exercices à l'évaluation` : 'Ajouter cet exercice à l\'évaluation' });
  if(!l || !l.length) return;
  l.forEach(e => {
    const id = evalNextExoId++, ctx = 'ex-' + id;
    evaluationExercises.push({ id, text: '', title: '', bareme: null, rows: [1], validated: true });
    blocksStores[ctx] = [{ id: pendingBlockNextId++, type: 'manuel', html: plExoCopieHtml(e.x), data: { lvl: e.lvl, t: e.c.t, i: e.i, k: e.k, ref: plRef(e.lvl, plCode(e.lvl, e.c), e.i) + ' · exercice ' + (e.k + 1) }, editFn: null, ctx, col: 0, row: 0 }];
  });
  renderEvalExercicesList();
  const box = document.getElementById('evalExercicesList'), der = box && box.lastElementChild;
  if(der) der.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function addManualExercise(){
  evaluationExercises.push({id: evalNextExoId++, text: '', title:'', bareme:null, rows:[1]});
  renderEvalExercicesList();
}
async function clearEvaluation(){
  if(evaluationExercises.length && !(await niceConfirm('Effacer tous les exercices de cette évaluation ?'))) return;
  evaluationExercises.forEach(ex=>{ delete blocksStores['ex-'+ex.id]; delete blocksStores['cor-'+ex.id]; });
  evaluationExercises = [];
  evalPageBreaksAfter = new Set();
  document.getElementById('evalConsignes').value = '';
  document.getElementById('evalTitreAjout').value = '';
  evalLastSyncedExercises = {};
  currentEvaluationId = null;
  unsubscribeEvalRealtime();
  document.getElementById('evalSaveStatus').textContent = '';
  document.getElementById('btnEvalUndo').style.display = 'none';
  const collabBanner = document.getElementById('evalCollabBanner');
  if(collabBanner) collabBanner.innerHTML = '';
  renderEvalExercicesList();
}
/* Ajoute chaque exercice de l'évaluation au cahier de la classe active, sous forme d'entrées
   normales (mêmes champs qu'une correction) -- un exercice = une entrée, avec son numéro et son
   titre. Seul l'énoncé est repris (aucune correction n'existe encore à ce stade), donc aucun
   risque de révéler les réponses. Réutilise directement blocksStores['ex-'+id] : pas de
   duplication de données, le même mécanisme de sync que addToCahier() (app.js). */
async function addEvaluationToCahier(){
  if(!currentClassId){ await niceAlert("Sélectionnez d'abord une classe active (boutons en haut de page) avant d'ajouter au cahier."); return; }
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de l'ajouter au cahier."); return; }
  // Avec ou sans le corrigé (10/11/2026) : les élèves voient le cahier, le corrigé n'y va que si on le demande.
  let avecCorrige = false;
  if(evaluationExercises.some(evalCorA)){
    const choix = await niceModal({ message: "Ajouter au cahier de la classe active :\n\n• les énoncés seuls,\n• ou les énoncés suivis de leur correction.\n\nLes élèves voient le cahier : n'y mettez le corrigé qu'une fois l'évaluation passée.",
      buttons: [{ label: 'Annuler', value: null, secondary: true }, { label: 'Énoncés seuls', value: 'enonces', secondary: true }, { label: 'Énoncés et corrigé', value: 'corrige' }] });
    if(!choix) return;
    avecCorrige = choix === 'corrige';
    if(avecCorrige){
      const nonRelus = evaluationExercises.filter(ex => evalCorA(ex) && getExerciseByCtx('cor-'+ex.id).ia).length;
      if(nonRelus && !(await niceConfirm(`${nonRelus} correction${nonRelus > 1 ? 's proposées' : ' proposée'} par l'IA ${nonRelus > 1 ? 'n\'ont' : 'n\'a'} pas encore été relue${nonRelus > 1 ? 's' : ''}. Les ajouter au cahier quand même ?`))) return;
    }
  }
  const niveau = document.getElementById('evalNiveau').value;
  const classes = document.getElementById('evalClasses').value.trim();
  const date = document.getElementById('evalDate').value || todayISO();
  const duree = document.getElementById('evalDuree').value;
  const consignes = document.getElementById('evalConsignes').value.trim();
  const typeSel = document.getElementById('evalType').value;
  const typeTitle = (typeSel==='__custom' ? document.getElementById('evalTypeCustom').value.trim() : typeSel) || 'Évaluation';
  const chapitres = getSelectedEvalChapitres().join(', ') || typeTitle;
  const total = evalBaremeTotal();
  const dateFmt = new Date(date+'T00:00:00').toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  // En-tête (titre, classe(s), durée, barème total, consignes) -- absente jusqu'ici du cahier :
  // seuls les exercices y étaient repris, sans le cadre général de l'évaluation.
  const headerEntry = {
    niveau,
    chapitre: chapitres,
    exo: '',
    titre: '',
    date,
    raw: '',
    figure: `<div style="margin:2px 0 8px;">
      <p style="font-weight:700;font-size:1.05rem;margin:0 0 4px;">${escapeHtml(typeTitle)} de Mathématiques${evalTitreAjoutTexte()}${classes ? ' -- '+escapeHtml(classes) : ''}</p>
      <p class="hint" style="margin:0;">${escapeHtml(dateFmt)}${duree ? ' · Durée : '+escapeHtml(duree)+' min' : ''}${total>0 ? ' · Barème total : '+formatPts(total) : ''}</p>
      ${consignes ? `<div style="margin-top:8px;padding:8px 12px;border:1px solid rgba(28,43,57,.2);border-radius:6px;">${renderMathText(consignes)}</div>` : ''}
    </div>`,
    blocksData: [],
    rows: [1],
    cellBorders: {},
  };
  const newEntries = [headerEntry, ...evaluationExercises.map((ex,i)=>{
    const ctx = 'ex-'+ex.id;
    ensureExRows(ex);
    const entree = {
      niveau,
      chapitre: chapitres,
      exo: String(i+1),
      titre: (ex.title||'') + (ex.bareme ? (ex.title?' · ':'') + formatPts(Number(ex.bareme)) : ''),
      date,
      raw: '',
      figure: blocksRowsHTML(ctx, ex.rows, false, ex.cellBorders),
      blocksData: JSON.parse(JSON.stringify(blocksStores[ctx]||[])),
      rows: JSON.parse(JSON.stringify(ex.rows||[1])),
      cellBorders: JSON.parse(JSON.stringify(ex.cellBorders||{})),
    };
    if(avecCorrige && evalCorA(ex)) evalCorDansEntree(entree, ex);
    return entree;
  })];
  cahier.push(...newEntries);
  sortCahierInPlace();
  saveCahier();
  renderCahier();
  if(isSyncEnabled()){
    for(const entry of newEntries){
      const res = await syncAddEntry(entry);
      if(res.ok) entry.id = res.id;
      else if(!res.offline){ await niceAlert("<span class=gicon>warning</span> Ajouté localement, mais échec de synchronisation avec le serveur pour au moins un exercice : "+(res.error||'erreur inconnue')+"."); break; }
    }
    saveCahier();
    renderCahier();
  }
  await niceAlert(`${evaluationExercises.length} exercice(s) (+ l'en-tête)${avecCorrige ? ', avec leur correction,' : ''} ajouté(s) au cahier de la classe active, daté(s) du ${new Date(date+'T00:00:00').toLocaleDateString('fr-FR')}.`);
}
/* Entrée du cahier d'un exercice, suivie de sa correction : une ligne « Correction » puis les lignes de la correction, décalées
   sous celles de l'énoncé (blocs, largeurs de colonnes et bordures), pour que l'entrée reste modifiable dans l'éditeur du cahier. */
function evalCorDansEntree(entree, ex){
  const c = getExerciseByCtx('cor-'+ex.id), dec = entree.rows.length + 1;
  const titre = { id: pendingBlockNextId++, type: 'texte', html: `<div style="padding:4px 0;">${renderMathText('{{vert|**Correction**}}')}</div>`, data: { text: '{{vert|**Correction**}}' }, editFn: 'reopenTextBlock', col: 0, row: entree.rows.length };
  const blocs = JSON.parse(JSON.stringify(blocksStores['cor-'+ex.id] || [])).map(b => ({ ...b, id: pendingBlockNextId++, row: (b.row || 0) + dec }));
  entree.blocksData = entree.blocksData.concat([titre], blocs);
  Object.entries(c.cellBorders || {}).forEach(([k, v]) => {
    const w = /^w(\d+)$/.exec(k), z = /^(\d+)-(\d+)$/.exec(k);
    if(w) entree.cellBorders['w' + (+w[1] + dec)] = JSON.parse(JSON.stringify(v));
    else if(z) entree.cellBorders[(+z[1] + dec) + '-' + z[2]] = JSON.parse(JSON.stringify(v));
  });
  entree.rows = entree.rows.concat([1], c.rows);
  entree.figure += `<div style="margin-top:10px;"><p style="font-weight:700;color:#15803D;margin:0 0 4px;">Correction</p>${blocksRowsHTML('cor-'+ex.id, c.rows, false, c.cellBorders)}</div>`;
}
// Zone réservée à l'appréciation du professeur, sous la ligne NOM/Prénom -- 3 réglages
// possibles (case "evalAppreciationLines") : encadré à 2 traits espacés (comportement
// d'origine), un seul trait, ou rien du tout.
function appreciationZoneHTML(){
  const mode = document.getElementById('evalAppreciationLines').value;
  if(mode==='0') return '';
  if(mode==='1') return '<div style="border-bottom:1px solid #1C1B2E;margin:16px 0 24px;height:1.2cm;"></div>';
  return '<div style="height:3cm;border-top:1px solid #1C1B2E;border-bottom:1px solid #1C1B2E;margin:16px 0 24px;"></div>';
}
// Découpe le texte de #evalGrilleNotation en critères -- un paragraphe (séparé par une ligne
// vide) par critère, sa 1re ligne "Titre : points" et les lignes suivantes "- item" pour la
// liste à puces. Un paragraphe mal formé (pas de ": points" sur la 1re ligne) est ignoré.
function parseGrilleNotation(text){
  return text.split(/\n\s*\n/).map(block=>{
    const lines = block.split('\n').map(l=>l.trim()).filter(Boolean);
    if(!lines.length) return null;
    const m = lines[0].match(/^(.+?)\s*:\s*(\d+(?:[.,]\d+)?)\s*$/);
    if(!m) return null;
    return {
      titre: m[1].trim(),
      points: Number(m[2].replace(',','.')),
      items: lines.slice(1).map(l=>l.replace(/^-\s*/, '')).filter(Boolean),
    };
  }).filter(Boolean);
}
// Grille de notation par critères, sous les traits de l'appréciation et avant le premier
// exercice (jamais en page à part) : un vrai tableau avec bordures et une case à cocher par
// item, en petit format pour ne pas empiéter sur la place réservée aux exercices.
function grilleNotationHTML(){
  if(!document.getElementById('evalIncludeGrilleNotation').checked) return '';
  const criteres = parseGrilleNotation(document.getElementById('evalGrilleNotation').value);
  if(!criteres.length) return '';
  const total = criteres.reduce((s,c)=>s+c.points, 0);
  const rows = criteres.map(c=>`
    <tr>
      <td style="border:1px solid #1C1B2E;padding:2px 5px;font-weight:700;vertical-align:top;">${escapeHtml(c.titre)}</td>
      <td style="border:1px solid #1C1B2E;padding:2px 5px;vertical-align:top;">${c.items.map(it=>`<div>${escapeHtml(it)}</div>`).join('')}</td>
      <td style="border:1px solid #1C1B2E;padding:2px 5px;text-align:center;vertical-align:top;">${c.items.map(()=>`<div>☐</div>`).join('')}</td>
      <td style="border:1px solid #1C1B2E;padding:2px 5px;font-weight:700;text-align:center;vertical-align:top;white-space:nowrap;">…. / ${formatPts(c.points).replace(' pts','').replace(' pt','')}</td>
    </tr>`).join('');
  return `
    <div style="margin:0 0 14px;">
      <p style="font-weight:700;font-size:7pt;margin:0 0 3px;">Grille de notation par critères</p>
      <table style="width:100%;border-collapse:collapse;font-size:6pt;">
        <thead><tr>
          <th style="border:1px solid #1C1B2E;padding:2px 5px;text-align:left;background:#EAF1F8;">Critère d'évaluation</th>
          <th style="border:1px solid #1C1B2E;padding:2px 5px;text-align:left;background:#EAF1F8;">Consignes associées</th>
          <th style="border:1px solid #1C1B2E;padding:2px 5px;background:#EAF1F8;"></th>
          <th style="border:1px solid #1C1B2E;padding:2px 5px;text-align:center;background:#EAF1F8;white-space:nowrap;">… / ${total}</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}
/* Complément libre du titre de la copie (demandé le 10/11/2026 : « Il est juste écrit Interrogation de Mathématiques. On devrait
   pouvoir rajouter ce qu'on veut genre "IE 01" ») : « Interrogation de Mathématiques – IE 01 ». */
function evalTitreAjoutTexte(){
  const el = document.getElementById('evalTitreAjout'), v = el ? el.value.trim() : '';
  return v ? ' – ' + escapeHtml(v) : '';
}
function buildEvaluationContentHTML(corrige){
  if(corrige) return evalCorrigeContenuHTML();
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
    <p style="text-align:center;font-weight:700;font-size:1.3rem;margin:0;">${escapeHtml(title)} de Mathématiques${evalTitreAjoutTexte()}</p>
    <p style="text-align:center;font-size:.85rem;color:#5B6472;margin:4px 0 0;">${duree ? 'Durée : '+duree+' min' : ''}${total>0 ? ' · Barème : '+formatPts(total) : ''}</p>
    <div style="height:2.4em;"></div>
    <p style="margin:0;">NOM : .................................................... Prénom : ....................................................</p>
    ${appreciationZoneHTML()}
    ${grilleNotationHTML()}
    ${(document.getElementById('evalShowConsignes').checked && document.getElementById('evalConsignes').value.trim()) ? `<div style="margin:0 0 16px;padding:10px 14px;border:1px solid #1C1B2E;border-radius:6px;">${renderMathText(document.getElementById('evalConsignes').value)}</div>` : ''}
    ${evaluationExercises.map((ex,i)=>`
      <div data-ex-id="${ex.id}" style="margin-bottom:1em;${evalPageBreaksAfter.has(ex.id)?'page-break-after:always;break-after:page;':''}">
        <p style="font-weight:700;margin:0 0 5px;display:grid;grid-template-columns:1fr 70px;gap:8px;">
          <span>Exercice ${i+1}${ex.title ? ' · '+escapeHtml(ex.title) : ''}</span>
          <span style="text-align:right;">${ex.bareme ? formatPts(ex.bareme) : ''}</span>
        </p>
        ${blocksRowsHTML('ex-'+ex.id, ensureExRows(ex), false, ex.cellBorders)}
      </div>
    `).join('')}
  `;
}
/* Corrigé imprimé (« Imprimer le corrigé », « Aperçu du corrigé ») : même en-tête que la copie, sans NOM ni appréciation ni
   grille ; chaque exercice avec son énoncé en gris (case « avec les énoncés ») puis sa correction, filet vert à gauche. */
function evalCorrigeContenuHTML(){
  const niveau = document.getElementById('evalNiveau').value;
  const classes = document.getElementById('evalClasses').value.trim();
  const date = document.getElementById('evalDate').value;
  const dateFmt = date ? new Date(date+'T00:00:00').toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '';
  const total = evalBaremeTotal();
  const typeSel = document.getElementById('evalType').value;
  const title = (typeSel==='__custom' ? document.getElementById('evalTypeCustom').value.trim() : typeSel) || 'Évaluation';
  const avecEnonce = !document.getElementById('evalCorAvecEnonce') || document.getElementById('evalCorAvecEnonce').checked;
  return `
    <div style="display:flex;justify-content:space-between;font-size:.95rem;">
      <div>${escapeHtml(classes || niveauLabel(niveau))}</div>
      <div>${dateFmt}</div>
    </div>
    <div style="height:1.6em;"></div>
    <p style="text-align:center;font-weight:700;font-size:1.3rem;margin:0;">Corrigé · ${escapeHtml(title)} de Mathématiques${evalTitreAjoutTexte()}</p>
    <p style="text-align:center;font-size:.85rem;color:#5B6472;margin:4px 0 0;">${total>0 ? 'Barème : '+formatPts(total) : ''}</p>
    <div style="height:1.6em;"></div>
    ${evaluationExercises.map((ex,i)=>`
      <div data-ex-id="${ex.id}" style="margin-bottom:1.2em;">
        <p style="font-weight:700;margin:0 0 5px;display:grid;grid-template-columns:1fr 70px;gap:8px;">
          <span>Exercice ${i+1}${ex.title ? ' · '+escapeHtml(ex.title) : ''}</span>
          <span style="text-align:right;">${ex.bareme ? formatPts(ex.bareme) : ''}</span>
        </p>
        ${avecEnonce ? `<div style="color:#4A5260;border-left:3px solid #C9CED6;padding:2px 0 2px 10px;margin:0 0 8px;font-size:.94em;">${blocksRowsHTML('ex-'+ex.id, ensureExRows(ex), false, ex.cellBorders)}</div>` : ''}
        <div style="border-left:3px solid #15803D;padding:2px 0 2px 10px;">
          ${evalCorA(ex) ? blocksRowsHTML('cor-'+ex.id, getExerciseByCtx('cor-'+ex.id).rows, false, getExerciseByCtx('cor-'+ex.id).cellBorders) : '<p style="margin:0;color:#8A919C;font-style:italic;">Correction à rédiger.</p>'}
        </div>
      </div>
    `).join('')}
  `;
}
// Avant d'imprimer le corrigé : au moins une correction, et les propositions de l'IA relues (ou imprimées en connaissance de cause).
async function evalCorPretAImprimer(){
  const avec = evaluationExercises.filter(evalCorA);
  if(!avec.length){ await niceAlert("Aucun exercice n'a encore de correction : « Rédiger le corrigé avec l'IA » ou « Écrire le corrigé »."); return false; }
  const nonRelus = avec.filter(ex => getExerciseByCtx('cor-'+ex.id).ia).length, manquants = evaluationExercises.length - avec.length;
  const alertes = [];
  if(nonRelus) alertes.push(`${nonRelus} correction${nonRelus > 1 ? 's proposées' : ' proposée'} par l'IA ${nonRelus > 1 ? 'n\'ont' : 'n\'a'} pas encore été relue${nonRelus > 1 ? 's' : ''}.`);
  if(manquants) alertes.push(`${manquants} exercice${manquants > 1 ? 's n\'ont' : ' n\'a'} pas encore de correction.`);
  return !alertes.length || await niceConfirm(alertes.join(' ') + ' Imprimer le corrigé quand même ?');
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
/* Page HTML complète de l'évaluation, telle qu'elle est imprimée (PDF). Servie aussi à l'aperçu
   (« Aperçu de l'évaluation »), dans un cadre : l'aperçu est ainsi rigoureusement identique au PDF --
   demandé : « l'éditeur était bon et le PDF respectait l'éditeur. C'est le bouton aperçu qui était faux ». */
function evalDocumentHTML(corrige){
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>${corrige ? 'Corrigé' : 'Évaluation'}</title>
    <link rel="stylesheet" href="${location.origin}/assets/katex/katex.min.css">
    <link rel="stylesheet" href="${document.querySelector('link[href*="styles.css"]').href}">
    ${typeof PL_CSS !== 'undefined' && evaluationExercises.some(ex => (blocksStores['ex-' + ex.id] || []).concat(corrige ? blocksStores['cor-' + ex.id] || [] : []).some(b => b.type === 'manuel')) ? `<style>${PL_CSS.replace(/@page\s*\{[^}]*\}/, '')}</style>` : ''}
    <style>
      @page{ size:A4; margin:15mm; }
      body{ font-family:Inter,Arial,sans-serif; color:#20242E; font-size:11.5pt; line-height:${document.getElementById('evalLineHeight').value}; margin:0; }
      /* Important : contraint le contenu à la largeur EXACTE de la zone imprimable A4
         (210mm - 2×15mm de marge = 180mm ≈ 680px), quelle que soit la largeur réelle de
         cette fenêtre à l'écran. Sans ça, la mise en page à l'écran (calculée sur la largeur
         de la fenêtre, ex. 900px) diffère de celle utilisée au moment d'imprimer (recalculée
         sur la largeur de la page A4) -- ce qui décale la synchronisation des disques, mesurée
         avant l'impression sur une largeur qui n'est plus la bonne une fois sur le papier. */
      * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
      .print-page{ max-width:680px; margin:0 auto; }
      .nb-figure-row{ margin:0; }
      svg{ max-width:100%; }
      .katex{ font-size:1.18em; }
    </style>
  </head><body><div class="print-page">${buildEvaluationContentHTML(corrige)}</div></body></html>`;
}
async function exportEvaluationPDF(corrige){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de générer le PDF."); return; }
  if(corrige === true){ if(!(await evalCorPretAImprimer())) return; }
  else corrige = false;
  const missing = [];
  if(!document.getElementById('evalClasses').value.trim()) missing.push('la classe');
  if(!document.getElementById('evalDate').value) missing.push('la date');
  if(!corrige && missing.length && !(await niceConfirm(`Tu n'as pas renseigné ${missing.join(' ni ')}. Générer quand même la feuille d'évaluation ?`))) return;
  // La capture d'écran (html2canvas) reproduit une page blanche de façon récurrente avec ce
  // contenu, malgré plusieurs correctifs essayés. L'impression native du navigateur, elle,
  // donne un rendu fidèle et fiable : l'utilisateur choisit "Enregistrer au format PDF" comme
  // destination dans la boîte d'impression (celle-ci bloque l'onglet tant qu'elle est ouverte
  // -- comportement normal du navigateur, pas un bug).
  const w = window.open('', '_blank', 'width=900,height:700');
  if(!w){ await niceAlert("La fenêtre n'a pas pu s'ouvrir : autorisez les pop-up pour ce site, ou utilisez Ctrl/Cmd+P."); return; }
  w.document.open();
  w.document.write(evalDocumentHTML(corrige));
  w.document.close();
  w.onload = () => {
    // Petit délai de sécurité : laisse le temps à la mise en page de se stabiliser
    // complètement (polices, styles) avant de mesurer les disques et d'imprimer.
    setTimeout(()=>{
      if(typeof geoPoints === 'function') geoPoints(w.document); // marques des points des figures
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

async function openEvalPreview(corrige){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant l'aperçu."); return; }
  corrige = corrige === true;
  if(corrige && !evaluationExercises.some(evalCorA)){ await niceAlert("Aucun exercice n'a encore de correction : « Rédiger le corrigé avec l'IA » ou « Écrire le corrigé »."); return; }
  const titreAp = document.querySelector('#evalPreviewModalOverlay strong'); if(titreAp) titreAp.textContent = corrige ? 'Corrigé' : 'Évaluation';
  const content = document.getElementById('evalPreviewContent');
  document.getElementById('evalPreviewPageMarks').innerHTML = '';
  // Même page que le PDF (evalDocumentHTML), dans un cadre de la largeur utile de la feuille (680 px) :
  // mêmes styles, mêmes largeurs de colonnes, mêmes retours à la ligne qu'à l'impression.
  content.innerHTML = '<iframe id="evalPreviewFrame" title="Aperçu de l\'évaluation" style="display:block;width:680px;height:400px;border:0;"></iframe>';
  document.getElementById('evalPreviewModalOverlay').style.display='flex';
  const frame = document.getElementById('evalPreviewFrame');
  frame.onload = () => setTimeout(() => {
    const doc = frame.contentDocument; if(!doc) return;
    syncDiskSizes(doc);
    requestAnimationFrame(() => {
      const totalHeight = doc.documentElement.scrollHeight;
      frame.style.height = totalHeight + 'px';
      evalPreviewMarques(doc, totalHeight, 10, corrige); // 10 px : marge intérieure du conteneur de l'aperçu
    });
  }, 200);
  frame.srcdoc = evalDocumentHTML(corrige);
}
// Repères de saut de page de l'aperçu : la largeur utile du PDF (A4, marges de 15 mm) fait 680 px ;
// on en déduit la hauteur d'une page dans les mêmes proportions. Deux sources : les sauts EXPLICITES
// (evalPageBreaksAfter, garantis à cette position) et une estimation par hauteur pour le reste.
function evalPreviewMarques(doc, totalHeight, decalage, corrige){
  const pxPerMm = 680/180;
  const pageHeightPx = 267*pxPerMm; // hauteur utile A4 (297 mm - 2 x 15 mm de marge)
  const sautsExplicites = evaluationExercises
    .filter(ex=>!corrige && evalPageBreaksAfter.has(ex.id))
    .map(ex=>doc.querySelector('[data-ex-id="'+ex.id+'"]'))
    .filter(Boolean)
    .map(el=>el.getBoundingClientRect().bottom + doc.documentElement.scrollTop)
    .sort((a,b)=>a-b);
  const marks = document.getElementById('evalPreviewPageMarks');
  let html = '', pageNum = 1, segmentStart = 0;
  const repere = (y, explicite) => `<div style="position:absolute;top:${y+decalage}px;left:0;width:100%;border-top:2px dashed ${explicite ? '#1F3A5C' : '#E35D3A'};"></div>
      <div style="position:absolute;top:${y+decalage+4}px;left:0;background:${explicite ? '#1F3A5C' : '#E35D3A'};color:#fff;font-size:.7rem;padding:1px 6px;border-radius:0 4px 4px 0;font-family:'Space Grotesk',sans-serif;">${explicite ? '✂ ' : ''}Page ${pageNum} →</div>`;
  const auto = fin => { let y = segmentStart + pageHeightPx; while(y < fin){ pageNum++; html += repere(y, false); y += pageHeightPx; } };
  sautsExplicites.forEach(y=>{ auto(y); pageNum++; html += repere(y, true); segmentStart = y; });
  auto(totalHeight);
  marks.innerHTML = html;
  marks.style.height = (totalHeight + 2*decalage)+'px';
}
function closeEvalPreview(){ document.getElementById('evalPreviewModalOverlay').style.display='none'; }
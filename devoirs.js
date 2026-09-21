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
  <p style="color:var(--ink-soft);max-width:70ch;">Proposez un travail à faire à une classe -- un fichier ou une figure à rendre, une figure à compléter, une ou plusieurs séquences d'automatismes, ou un défi Compte est bon.</p>

  <div class="tool-shell devoir-zone-create">
    <p class="example-title devoir-zone-title" style="margin-bottom:6px;" id="devoirCreateTitle"><span class=gicon style="color:var(--accent);">add_circle</span> Nouveau devoir</p>
    <div class="tool-row">
      <input type="text" id="devoirNewTitre" placeholder="Titre (ex. Exercice 4 p.32)" style="min-width:220px;">
      <select id="devoirNewClasse" onchange="onDevoirNewClasseChange()"></select>
    </div>
    <div class="tool-row">
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><span class=gicon style="font-size:1rem;">upload</span> Date de dépôt : <input type="date" id="devoirNewDateDepot" title="Date de dépôt / publication (facultative -- visible immédiatement si vide)"></label>
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><span class=gicon style="font-size:1rem;">event</span> Date limite : <input type="date" id="devoirNewDate" title="Date limite (facultative)"></label>
    </div>
    <p class="hint" style="margin:0 0 8px;">Si une date de dépôt future est choisie, le devoir reste invisible aux élèves jusqu'à cette date.</p>
    <textarea id="devoirNewConsigne" rows="4" style="width:100%;margin-top:8px;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;" placeholder="Consigne (texte libre)..."></textarea>

    <p class="hint" style="margin:12px 0 4px;font-weight:700;">Destinataires :</p>
    <div class="tool-row" id="devoirTargetModePicker" style="margin-bottom:4px;"></div>
    <div id="devoirTargetElevesBox" style="display:none;margin-top:6px;">
      <p class="hint" style="margin:0 0 6px;">Élèves concernés (<span id="devoirTargetElevesCount">0</span> sélectionné(s)) :</p>
      <div id="devoirTargetElevesPicker" style="max-height:180px;overflow-y:auto;border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:8px;"></div>
    </div>

    <p class="hint" style="margin:12px 0 4px;font-weight:700;">Type d'activité :</p>
    <div class="tool-row" id="devoirTypePicker" style="margin-bottom:4px;"></div>

    <div id="devoirTypeFigureCompleterBox" style="display:none;margin-top:6px;">
      <p class="hint" style="margin:0 0 6px;">Construisez la figure de départ que l'élève devra compléter.</p>
      <button type="button" class="btn secondary" onclick="openDevoirFigureDepartEditor()"><span class=gicon>draw</span> Construire la figure de départ</button>
      <button type="button" class="btn secondary" onclick="testDevoirFigureCompleter()"><span class=gicon>visibility</span> Tester (voir comme un élève)</button>
      <span class="hint" id="devoirFigureDepartStatus" style="margin-left:8px;"></span>
    </div>

    <div id="devoirTypeAutomatismesBox" style="display:none;margin-top:6px;">
      <p class="hint" style="margin:0 0 6px;">Choisissez une ou plusieurs séquences à assigner (<span id="devoirAutomatismesCount">0</span> sélectionnée(s)) -- bouton "Tester" pour jouer une séquence comme un élève :</p>
      <div id="devoirAutomatismesPicker" style="max-height:220px;overflow-y:auto;border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:8px;"></div>
    </div>

    <div id="devoirTypeCebBox" style="display:none;margin-top:6px;">
      <p class="hint" style="margin:0 0 4px;">Nombre de "grands nombres" (25, 50, 75, 100) :</p>
      <div class="tool-row" id="devoirCebNLargePicker" style="margin-bottom:8px;"></div>
      <p class="hint" style="margin:0 0 4px;">Chronomètre :</p>
      <div class="tool-row" id="devoirCebTimerPicker" style="margin-bottom:8px;"></div>
      <p class="hint" style="margin:0 0 4px;">Nombre de comptes à jouer :</p>
      <div class="tool-row" id="devoirCebRoundsPicker" style="margin-bottom:8px;"></div>
      <p class="hint" style="margin:6px 0 8px;">Le même tirage (mêmes 6 nombres, même compte à atteindre) est servi à tous les élèves concernés, pour chaque compte. Testez chaque compte et régénérez ceux qui sont trop difficiles.</p>
      <div id="devoirCebRoundsList" style="border:1px solid rgba(28,43,57,.15);border-radius:8px;padding:8px;"></div>
    </div>

    <div class="tool-row" style="margin-top:10px;">
      <button class="btn" id="devoirCreateBtn" onclick="createDevoir()">Assigner ce devoir</button>
      <button class="btn secondary" id="devoirCancelEditBtn" style="display:none;" onclick="cancelDevoirEdit()">Annuler la modification</button>
    </div>
    <span class="hint" id="devoirCreateStatus" style="margin:0;"></span>
  </div>

  <div class="tool-shell devoir-zone-list" style="margin-top:16px;">
    <p class="example-title devoir-zone-title" style="margin-bottom:6px;"><span class=gicon style="color:#1F7A4D;">checklist</span> Devoirs assignés</p>
    <div id="devoirsProfListing"><p class="hint">Chargement…</p></div>
  </div>
`;

document.getElementById('view-devoirs-eleve').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;"><span class=gicon>assignment</span> Mes devoirs</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Le travail proposé par vos professeurs.</p>
  <div id="devoirsEleveListing"><p class="hint">Chargement…</p></div>
`;

/* ================= CÔTÉ PROF ================= */
/* Type d'activité assignée -- un seul type par devoir (plus simple à créer et à suivre qu'un
   cumul d'activités ; pour combiner plusieurs activités, il suffit de créer plusieurs devoirs).
   "figure_completer", "automatismes" et "compte_est_bon" réutilisent des outils déjà existants
   (outils-figures.js, calcul-mental.js, compte-est-bon.js) plutôt que d'en recréer une version
   dédiée aux devoirs. */
/* Couleurs reprises des groupes d'Automatismes (CM_GROUPS, calcul-mental.js) pour rester
   cohérent avec le reste du site plutôt que d'inventer une nouvelle palette. */
const DEVOIR_TYPES = [
  {id:'fichier', label:'Fichier à rendre', icon:'upload_file', color:'#5B6472'},
  {id:'figure', label:'Figure à construire (libre)', icon:'draw', color:'#0C5BA0'},
  {id:'figure_completer', label:'Figure à compléter', icon:'auto_fix_high', color:'#26AAB1'},
  {id:'automatismes', label:'Automatismes', icon:'bolt', color:'#FF8208'},
  {id:'compte_est_bon', label:'Compte est bon', icon:'casino', color:'#9E1F5E'},
];
let devoirNewType = 'fichier';
let devoirNewFigureDepart = null; // serializeFigState(...) de la figure de départ (type=figure_completer)
let devoirNewAutomatismesSeqs = new Set(); // sequence_id choisis (type=automatismes)
let devoirNewCebNLarge = 2, devoirNewCebTimerOn = true, devoirNewCebTimerDuration = 60, devoirNewCebRounds = 1; // type=compte_est_bon
/* Tirages Compte est bon réellement en brouillon -- {numbers,target,solutionExpr,solutionValue,
   tested} par compte. Générés dès qu'affichés (ou chargés depuis un devoir existant en édition),
   modifiés en place par régénération individuelle -- c'est ce tableau, tel quel, qui est
   enregistré à la sauvegarde (voir createDevoir). Signalé : "il faudrait que je puisse les
   valider ou les regénérer un par un car certains sont trop difficiles". */
let devoirNewCebRoundsData = [];
let devoirNewTargetMode = 'class'; // 'class' (toute la classe) | 'eleves' (sélection)
let devoirNewTargetIds = new Set(); // student_id choisis quand devoirNewTargetMode==='eleves'
/* Édition d'un devoir existant -- le même formulaire sert à la création ET à la modification. */
let devoirEditingId = null;

/* Destinataires du devoir : toute la classe (comportement d'origine) ou une sélection d'élèves
   de la classe -- signalé : "permettre d'assigner à la classe ou quelques élèves de la classe". */
function renderDevoirTargetModePicker(){
  const box = document.getElementById('devoirTargetModePicker');
  if(!box) return;
  box.innerHTML = `
    <button type="button" class="btn secondary${devoirNewTargetMode==='class'?' active':''}" onclick="setDevoirNewTargetMode('class')"><span class=gicon>groups</span> Toute la classe</button>
    <button type="button" class="btn secondary${devoirNewTargetMode==='eleves'?' active':''}" onclick="setDevoirNewTargetMode('eleves')"><span class=gicon>person</span> Élèves sélectionnés</button>
  `;
  const box2 = document.getElementById('devoirTargetElevesBox');
  if(box2) box2.style.display = devoirNewTargetMode==='eleves' ? 'block' : 'none';
  if(devoirNewTargetMode==='eleves') renderDevoirTargetElevesPicker();
}
function setDevoirNewTargetMode(mode){ devoirNewTargetMode = mode; renderDevoirTargetModePicker(); }
function onDevoirNewClasseChange(){
  devoirNewTargetIds = new Set(); // la sélection d'élèves ne survit pas à un changement de classe
  if(devoirNewTargetMode==='eleves') renderDevoirTargetElevesPicker();
}
async function renderDevoirTargetElevesPicker(){
  const box = document.getElementById('devoirTargetElevesPicker');
  const classId = document.getElementById('devoirNewClasse').value;
  if(!box || !classId) return;
  const { data: eleves } = await sb.from('class_students').select('profiles(id,nom)').eq('class_id', classId);
  const list = (eleves||[]).map(r=>r.profiles).filter(Boolean).sort((a,b)=>(a.nom||'').localeCompare(b.nom||''));
  box.innerHTML = list.map(e=>`<label style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:.85rem;">
    <input type="checkbox" value="${e.id}" ${devoirNewTargetIds.has(e.id)?'checked':''} onchange="toggleDevoirTargetEleve('${e.id}',this.checked)">
    ${escapeHtml(e.nom||'(sans nom)')}
  </label>`).join('') || '<p class="hint" style="margin:0;">Aucun élève dans cette classe.</p>';
  document.getElementById('devoirTargetElevesCount').textContent = devoirNewTargetIds.size;
}
function toggleDevoirTargetEleve(id, checked){
  if(checked) devoirNewTargetIds.add(id); else devoirNewTargetIds.delete(id);
  document.getElementById('devoirTargetElevesCount').textContent = devoirNewTargetIds.size;
}

function renderDevoirTypePicker(){
  const box = document.getElementById('devoirTypePicker');
  if(!box) return;
  box.innerHTML = DEVOIR_TYPES.map(t=>`<button type="button" class="devoir-type-btn${devoirNewType===t.id?' active':''}" style="--dt-color:${t.color};--dt-bg:${t.color}14;" onclick="setDevoirNewType('${t.id}')"><span class=gicon>${t.icon}</span> ${t.label}</button>`).join('');
  const boxes = {figure_completer:'devoirTypeFigureCompleterBox', automatismes:'devoirTypeAutomatismesBox', compte_est_bon:'devoirTypeCebBox'};
  Object.keys(boxes).forEach(type=>{
    const el = document.getElementById(boxes[type]);
    if(el) el.style.display = devoirNewType===type ? 'block' : 'none';
  });
  if(devoirNewType==='automatismes') renderDevoirAutomatismesPicker();
  if(devoirNewType==='compte_est_bon') renderDevoirCebPicker();
}
function setDevoirNewType(t){ devoirNewType = t; renderDevoirTypePicker(); }
/* Réutilise directement CM_SEQUENCES (calcul-mental.js) -- pas de duplication de la liste des
   88 séquences câblées. Chargé APRÈS devoirs.js (voir index.html) : sans risque, cette fonction
   n'est jamais appelée avant que l'utilisateur n'interagisse avec le formulaire, bien après que
   tous les scripts différés ont fini de s'exécuter. */
function renderDevoirAutomatismesPicker(){
  const box = document.getElementById('devoirAutomatismesPicker');
  if(!box || typeof CM_SEQUENCES==='undefined') return;
  const sorted = CM_SEQUENCES.slice().sort((a,b)=>a.seq-b.seq);
  box.innerHTML = sorted.map(s=>`<label style="display:flex;align-items:center;gap:6px;padding:3px 0;font-size:.85rem;">
    <input type="checkbox" value="${s.id}" ${devoirNewAutomatismesSeqs.has(s.id)?'checked':''} onchange="toggleDevoirAutomatismesSeq('${s.id}',this.checked)">
    <span style="flex:1;">${escapeHtml(s.label)}</span>
    <button type="button" class="btn secondary" style="font-size:.68rem;padding:2px 7px;flex:none;" onclick="event.preventDefault();testDevoirAutomatismesSeq('${s.id}')">Tester</button>
  </label>`).join('');
  document.getElementById('devoirAutomatismesCount').textContent = devoirNewAutomatismesSeqs.size;
}
function toggleDevoirAutomatismesSeq(id, checked){
  if(checked) devoirNewAutomatismesSeqs.add(id); else devoirNewAutomatismesSeqs.delete(id);
  document.getElementById('devoirAutomatismesCount').textContent = devoirNewAutomatismesSeqs.size;
}
/* Mini-picker autonome pour les réglages Compte est bon -- plutôt qu'une réutilisation directe
   de cebRenderSetup() (compte-est-bon.js), fortement couplée à sa propre mise en page/état de
   jeu (#cebRoot, cebSettings...), plus risquée à réemployer ici pour juste 2 réglages. */
function renderDevoirCebPicker(){
  const nlBox = document.getElementById('devoirCebNLargePicker');
  if(nlBox){
    nlBox.innerHTML = '';
    for(let n=0;n<=4;n++){
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn secondary'+(devoirNewCebNLarge===n?' active':''); b.textContent = n===0 ? 'Aucun' : String(n);
      b.onclick = ()=>{ devoirNewCebNLarge=n; regenerateAllDevoirCebRounds(); renderDevoirCebPicker(); };
      nlBox.appendChild(b);
    }
  }
  const tBox = document.getElementById('devoirCebTimerPicker');
  if(tBox){
    tBox.innerHTML = '';
    const opts = [{on:false,label:'Illimité'},{on:true,dur:45,label:'45 s'},{on:true,dur:60,label:'1 min'},{on:true,dur:90,label:'1 min 30'}];
    opts.forEach(o=>{
      const b = document.createElement('button');
      const active = o.on===devoirNewCebTimerOn && (!o.on || o.dur===devoirNewCebTimerDuration);
      b.type = 'button'; b.className = 'btn secondary'+(active?' active':''); b.textContent = o.label;
      b.onclick = ()=>{ devoirNewCebTimerOn=o.on; if(o.on) devoirNewCebTimerDuration=o.dur; renderDevoirCebPicker(); };
      tBox.appendChild(b);
    });
  }
  const rBox = document.getElementById('devoirCebRoundsPicker');
  if(rBox){
    rBox.innerHTML = '';
    for(let n=1;n<=5;n++){
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'btn secondary'+(devoirNewCebRounds===n?' active':''); b.textContent = n===1 ? '1 compte' : n+' comptes';
      b.onclick = ()=>{ devoirNewCebRounds=n; adjustDevoirCebRoundsCount(); renderDevoirCebPicker(); };
      rBox.appendChild(b);
    }
  }
  if(!devoirNewCebRoundsData.length) regenerateAllDevoirCebRounds();
  const listBox = document.getElementById('devoirCebRoundsList');
  if(listBox){
    listBox.innerHTML = devoirNewCebRoundsData.map((r,i)=>`
      <div style="display:flex;align-items:center;gap:8px;padding:4px 0;${i>0?'border-top:1px solid rgba(28,43,57,.06);':''}">
        <span style="flex:1;font-size:.85rem;">${r.tested?'<span class="gicon" style="font-size:.9rem;color:#1F7A4D;">check</span>':'<span class="gicon" style="font-size:.9rem;color:var(--ink-soft);">radio_button_unchecked</span>'} Compte ${i+1} <span class="hint" style="margin:0;">(cible ${r.target})</span></span>
        <button type="button" class="btn secondary" style="font-size:.7rem;padding:3px 8px;" onclick="testDevoirCeb(${i})"><span class=gicon>visibility</span> Tester</button>
        <button type="button" class="btn secondary" style="font-size:.7rem;padding:3px 8px;" onclick="regenerateDevoirCebRound(${i})"><span class=gicon>refresh</span> Régénérer</button>
      </div>`).join('');
  }
}
/* Un compte = un tirage {numbers,target,solutionExpr,solutionValue,tested}. */
function generateDevoirCebRound(){
  const draw = cebGenerateSolvableDraw(devoirNewCebNLarge);
  return { numbers: draw.numbers, target: draw.target, solutionExpr: draw.solution?draw.solution.expr:null, solutionValue: draw.solution?draw.solution.value:null, tested:false };
}
/* La difficulté (nombre de grands nombres) change : les tirages existants ne correspondent plus,
   on régénère tout le lot. */
function regenerateAllDevoirCebRounds(){
  if(typeof cebGenerateSolvableDraw!=='function') return;
  devoirNewCebRoundsData = Array.from({length: devoirNewCebRounds}, ()=>generateDevoirCebRound());
}
/* Le nombre de comptes change : on ajoute/retire des tirages sans toucher à ceux déjà là (déjà
   testés/validés par le prof). */
function adjustDevoirCebRoundsCount(){
  if(typeof cebGenerateSolvableDraw!=='function') return;
  while(devoirNewCebRoundsData.length < devoirNewCebRounds) devoirNewCebRoundsData.push(generateDevoirCebRound());
  if(devoirNewCebRoundsData.length > devoirNewCebRounds) devoirNewCebRoundsData.length = devoirNewCebRounds;
}
/* Bouton "Régénérer" -- signalé : "il faudrait que je puisse les valider ou les regénérer un par
   un car certains sont trop difficiles". Retire juste ce compte-là, sans toucher aux autres. */
function regenerateDevoirCebRound(index){
  if(typeof cebGenerateSolvableDraw!=='function') return;
  devoirNewCebRoundsData[index] = generateDevoirCebRound();
  renderDevoirCebPicker();
}
/* Ouvre l'outil figure pour construire la figure DE DÉPART d'un devoir "figure à compléter" --
   même outil que pour un devoir "libre", mais le bouton "Valider" enregistre l'état courant dans
   devoirNewFigureDepart (variable locale, envoyée à la création du devoir) au lieu de l'insérer
   dans un cahier. */
function openDevoirFigureDepartEditor(){
  openFigureTool();
  if(devoirNewFigureDepart){
    const cloned = deserializeFigState(devoirNewFigureDepart);
    figState.points = cloned.points; figState.shapes = cloned.shapes; figState.nextLabel = figState.points.length;
    renderFigureSvg();
  }
  const validateBtn = document.getElementById('figValidateBtn');
  if(validateBtn){
    validateBtn.style.display = 'inline-flex';
    validateBtn.textContent = 'Utiliser cette figure de départ';
    validateBtn.onclick = ()=>{
      devoirNewFigureDepart = serializeFigState(figState);
      document.getElementById('devoirFigureDepartStatus').textContent = '✓ Figure de départ enregistrée.';
      closeFigureTool();
    };
  }
}
/* Bouton "Tester" -- signalé : "il me manque un bouton tester pour voir le rendu", puis "pouvoir
   tester et revenir au menu quand on valide ou annule" pour les autres types. Rejoue l'activité
   exactement comme un élève la vivrait, sans rien enregistrer : figure_completer et automatismes
   réutilisent des outils qui n'écrivent en base QUE pour un compte élève connecté
   (currentUserRole==='eleve'), donc rien à faire de spécial pour eux -- le prof qui teste ne
   déclenche aucune écriture. devoirTestModeActive (lu par calcul-mental.js et compte-est-bon.js)
   fait apparaître un bouton "Retour à la création du devoir" pendant le test, qu'on valide ou
   qu'on veuille juste quitter. */
function testDevoirAutomatismesSeq(seqId){
  if(typeof runCM!=='function') return;
  devoirTestModeActive = true;
  runCM(seqId);
}
async function testDevoirFigureCompleter(){
  if(!devoirNewFigureDepart){ await niceAlert('Construisez d\'abord la figure de départ.'); return; }
  openFigureTool();
  const cloned = deserializeFigState(devoirNewFigureDepart);
  figState.points = cloned.points; figState.shapes = cloned.shapes; figState.nextLabel = figState.points.length;
  renderFigureSvg();
  const validateBtn = document.getElementById('figValidateBtn');
  const submitBtn = document.getElementById('figSubmitDevoirBtn');
  const loadBtn = document.getElementById('figLoadDevoirBtn');
  if(validateBtn) validateBtn.style.display = 'none';
  if(submitBtn) submitBtn.style.display = 'none';
  if(loadBtn) loadBtn.style.display = 'none';
  const enonceRow = document.getElementById('figEnonceIaRow');
  const enonceHint = document.getElementById('figEnonceIaHint');
  if(enonceRow) enonceRow.style.display = 'none';
  if(enonceHint) enonceHint.style.display = 'none';
  // "Fermer" (et pas un autre libellé) : confirmAndCloseFigureTool (outils-figures.js) reconnaît
  // exactement ce texte pour fermer sans demander confirmation (aperçu en lecture, rien à perdre --
  // même convention que previewDevoirFigure).
  const closeBtn = document.getElementById('figCloseBtn');
  if(closeBtn) closeBtn.textContent = 'Fermer';
}
let devoirTestModeActive = false; // vrai pendant un test "Compte est bon" lancé depuis le formulaire
/* compte-est-bon.js (chargé après devoirs.js) lit devoirTestModeActive pour proposer "Retour à la
   création du devoir" plutôt que "Compte suivant" en fin de partie. Teste le tirage EXACT de ce
   compte (et pas un tirage aléatoire à part) : c'est bien celui-là qui sera assigné aux élèves si
   le prof ne le régénère pas. */
function testDevoirCeb(index){
  if(typeof cebStartGame!=='function'){ return; }
  const round = devoirNewCebRoundsData[index];
  if(!round) return;
  round.tested = true;
  devoirTestModeActive = true;
  cebSettings = { nLarge: devoirNewCebNLarge, timerOn: devoirNewCebTimerOn, timerDuration: devoirNewCebTimerDuration, timerCustom:false };
  showView('view-compte'); setActiveTopnav('compte');
  document.getElementById('cebRoot').dataset.built = '1';
  cebStartGame({
    numbers: round.numbers, target: round.target,
    solution: round.solutionExpr ? {expr: round.solutionExpr, value: round.solutionValue} : null,
    exact: round.solutionValue===round.target,
  });
}
function returnToDevoirCreationFromTest(){
  devoirTestModeActive = false;
  showView('view-devoirs-prof'); setActiveTopnav('devoirsprof');
  if(typeof renderDevoirsProf==='function') renderDevoirsProf();
}
async function renderDevoirsProf(){
  const select = document.getElementById('devoirNewClasse');
  const previousValue = select.value; // préserve la classe déjà choisie (ex. retour d'un test Compte est bon)
  select.innerHTML = (accountClassesList||[]).map(c=>`<option value="${c.id}">${escapeHtml(c.label)}</option>`).join('') || '<option value="">Aucune classe</option>';
  if(previousValue && Array.from(select.options).some(o=>o.value===previousValue)) select.value = previousValue;
  renderDevoirTargetModePicker();
  renderDevoirTypePicker();
  await refreshDevoirsProfListing();
}
async function createDevoir(){
  const status = document.getElementById('devoirCreateStatus');
  const titre = document.getElementById('devoirNewTitre').value.trim();
  const consigne = document.getElementById('devoirNewConsigne').value.trim();
  const classId = document.getElementById('devoirNewClasse').value;
  const dateDepotStr = document.getElementById('devoirNewDateDepot').value;
  const dateStr = document.getElementById('devoirNewDate').value;
  if(!titre || !consigne || !classId){ status.textContent = 'Titre, consigne et classe sont nécessaires.'; return; }
  if(devoirNewType==='figure_completer' && !devoirNewFigureDepart){ status.textContent = 'Construisez la figure de départ avant d\'assigner ce devoir.'; return; }
  if(devoirNewType==='automatismes' && !devoirNewAutomatismesSeqs.size){ status.textContent = 'Choisissez au moins une séquence.'; return; }
  if(devoirNewTargetMode==='eleves' && !devoirNewTargetIds.size){ status.textContent = 'Sélectionnez au moins un élève.'; return; }
  status.textContent = 'Enregistrement…';
  const payload = {
    teacher_id: currentUser.id, class_id: classId, titre, consigne, type: devoirNewType,
    date_depot: dateDepotStr ? new Date(dateDepotStr).toISOString() : null,
    date_limite: dateStr ? new Date(dateStr).toISOString() : null,
    student_ids: devoirNewTargetMode==='eleves' ? Array.from(devoirNewTargetIds) : null,
  };
  if(devoirNewType==='figure_completer') payload.figure_depart = devoirNewFigureDepart;
  if(devoirNewType==='automatismes') payload.automatismes_sequences = Array.from(devoirNewAutomatismesSeqs);
  if(devoirNewType==='compte_est_bon'){
    payload.ceb_n_large = devoirNewCebNLarge;
    payload.ceb_timer_on = devoirNewCebTimerOn;
    payload.ceb_timer_duration = devoirNewCebTimerOn ? devoirNewCebTimerDuration : null;
    // devoirNewCebRoundsData EST le brouillon en cours : chaque tirage y reste identique tant que
    // le prof ne le régénère pas explicitement (bouton "Régénérer", ou changement de difficulté/
    // nombre de comptes) -- c'est donc lui, tel quel, qu'on enregistre, plutôt que de reproduire
    // séparément la même logique de génération ici.
    if(!devoirNewCebRoundsData.length){ status.textContent = "Erreur : les tirages Compte est bon n'ont pas pu être générés."; return; }
    payload.ceb_rounds = devoirNewCebRoundsData.map(r=>({numbers:r.numbers, target:r.target, solutionExpr:r.solutionExpr, solutionValue:r.solutionValue}));
  }
  const { error } = devoirEditingId
    ? await sb.from('devoirs').update(payload).eq('id', devoirEditingId)
    : await sb.from('devoirs').insert(payload);
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  status.textContent = devoirEditingId ? '✓ Devoir modifié.' : '✓ Devoir assigné.';
  cancelDevoirEdit();
  await refreshDevoirsProfListing();
}
/* Charge un devoir existant dans le formulaire (identique à celui de création) pour le
   modifier -- signalé : "permettre l'édition d'un devoir déjà créé". */
async function editDevoirPrompt(devoirId){
  const { data: d, error } = await sb.from('devoirs').select('*').eq('id', devoirId).single();
  if(error || !d){ await niceAlert('Erreur : '+(error?error.message:'devoir introuvable')); return; }
  devoirEditingId = devoirId;
  document.getElementById('devoirNewTitre').value = d.titre || '';
  document.getElementById('devoirNewConsigne').value = d.consigne || '';
  document.getElementById('devoirNewClasse').value = d.class_id;
  document.getElementById('devoirNewDateDepot').value = d.date_depot ? d.date_depot.slice(0,10) : '';
  document.getElementById('devoirNewDate').value = d.date_limite ? d.date_limite.slice(0,10) : '';
  devoirNewType = d.type;
  devoirNewFigureDepart = d.figure_depart || null;
  devoirNewAutomatismesSeqs = new Set(d.automatismes_sequences || []);
  devoirNewCebNLarge = d.ceb_n_large ?? 2;
  devoirNewCebTimerOn = d.ceb_timer_on ?? true;
  devoirNewCebTimerDuration = d.ceb_timer_duration || 60;
  devoirNewCebRounds = (d.ceb_rounds||[]).length || 1;
  // Reprend les tirages déjà enregistrés tels quels (au lieu d'en générer de nouveaux) : le prof
  // ne perd rien de ce qui a déjà été testé/validé, et peut régénérer individuellement ceux qui
  // posent problème.
  devoirNewCebRoundsData = (d.ceb_rounds||[]).map(r=>({numbers:r.numbers, target:r.target, solutionExpr:r.solutionExpr, solutionValue:r.solutionValue, tested:false}));
  devoirNewTargetMode = (d.student_ids && d.student_ids.length) ? 'eleves' : 'class';
  devoirNewTargetIds = new Set(d.student_ids || []);
  document.getElementById('devoirFigureDepartStatus').textContent = d.figure_depart ? '✓ Figure de départ déjà enregistrée (modifiable).' : '';
  document.getElementById('devoirCreateTitle').innerHTML = '<span class=gicon style="color:var(--accent);">edit</span> Modifier le devoir';
  document.getElementById('devoirCreateBtn').textContent = 'Enregistrer les modifications';
  document.getElementById('devoirCancelEditBtn').style.display = 'inline-flex';
  document.getElementById('devoirCreateStatus').textContent = '';
  renderDevoirTargetModePicker();
  renderDevoirTypePicker();
  document.querySelector('.devoir-zone-create').scrollIntoView({behavior:'smooth', block:'start'});
}
/* Remise à zéro pure du formulaire (aucune navigation) -- utilisée par cancelDevoirEdit ET par
   renderDevoirsProf (pour effacer un éventuel état d'édition laissé par une édition abandonnée
   sans passer par "Annuler", par ex. en quittant via le menu principal). */
function resetDevoirFormState(){
  devoirEditingId = null;
  document.getElementById('devoirNewTitre').value = '';
  document.getElementById('devoirNewConsigne').value = '';
  document.getElementById('devoirNewDateDepot').value = '';
  document.getElementById('devoirNewDate').value = '';
  devoirNewType = 'fichier'; devoirNewFigureDepart = null; devoirNewAutomatismesSeqs = new Set();
  devoirNewCebNLarge = 2; devoirNewCebTimerOn = true; devoirNewCebTimerDuration = 60; devoirNewCebRounds = 1;
  devoirNewCebRoundsData = [];
  devoirNewTargetMode = 'class'; devoirNewTargetIds = new Set();
  document.getElementById('devoirFigureDepartStatus').textContent = '';
  document.getElementById('devoirCreateTitle').innerHTML = '<span class=gicon style="color:var(--accent);">add_circle</span> Nouveau devoir';
  document.getElementById('devoirCreateBtn').textContent = 'Assigner ce devoir';
  document.getElementById('devoirCancelEditBtn').style.display = 'none';
}
/* Édition ouverte depuis Supervision (supEditDevoirAndOpen, app.js) : où revenir après
   "Annuler la modification" ou un enregistrement réussi. */
let devoirReturnTarget = null;
function cancelDevoirEdit(){
  const wasEditing = !!devoirEditingId;
  const returnTarget = devoirReturnTarget;
  devoirReturnTarget = null;
  resetDevoirFormState();
  renderDevoirTargetModePicker();
  renderDevoirTypePicker();
  if(!wasEditing) return;
  // Signalé : "je ne reviens pas au menu de départ, j'ai la création d'un devoir qui est
  // ouvert" -- annuler (ou enregistrer) une édition doit ramener là où on était, pas laisser un
  // formulaire de création vide affiché comme si on en démarrait un nouveau.
  if(returnTarget==='supervision'){
    showView('view-supervision'); setActiveTopnav('supervision'); loadMyClasses();
    document.querySelector('.sup-tab-btn[data-suptab="classes"]')?.click();
  } else {
    document.querySelector('.devoir-zone-list')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
}
function devoirTypeLabel(type){ const t = DEVOIR_TYPES.find(t=>t.id===type); return t ? t.label : type; }
async function refreshDevoirsProfListing(){
  const el = document.getElementById('devoirsProfListing');
  const { data: devoirsList, error } = await sb.from('devoirs')
    .select('id,titre,consigne,date_depot,date_limite,created_at,class_id,type,automatismes_sequences,ceb_n_large,ceb_timer_on,ceb_rounds,student_ids,classes(nom,niveau)')
    .eq('teacher_id', currentUser.id).order('created_at',{ascending:false});
  if(error){ el.textContent = 'Erreur : '+error.message; return; }
  if(!devoirsList || !devoirsList.length){ el.innerHTML = '<p class="hint">Aucun devoir assigné pour l\'instant.</p>'; return; }
  // Nombre de rendus / nombre d'élèves concernés (toute la classe, ou la sélection d'élèves
  // ciblée par ce devoir -- signalé : "permettre d'assigner à la classe ou quelques élèves").
  const rows = await Promise.all(devoirsList.map(async d=>{
    const cible = d.student_ids && d.student_ids.length;
    let totalEleves;
    if(cible){ totalEleves = d.student_ids.length; }
    else { const { count } = await sb.from('class_students').select('*',{count:'exact',head:true}).eq('class_id', d.class_id); totalEleves = count; }
    const { count: nbRendus } = await sb.from('devoirs_rendus').select('*',{count:'exact',head:true}).eq('devoir_id', d.id).eq('est_rendu', true);
    const dateStr = d.date_limite ? new Date(d.date_limite).toLocaleDateString('fr-FR') : '';
    const typeDetail = d.type==='automatismes' ? ` · ${(d.automatismes_sequences||[]).length} séquence(s)`
      : d.type==='compte_est_bon' ? ` · ${(d.ceb_rounds||[]).length||1} compte(s), ${d.ceb_n_large??2} grand(s) nombre(s), ${d.ceb_timer_on?'chronométré':'illimité'}`
      : '';
    const cibleDetail = cible ? `<span class="devoir-target-pill">${d.student_ids.length} élève(s) ciblé(s)</span> · ` : '';
    const enAttente = d.date_depot && new Date(d.date_depot) > new Date();
    const depotDetail = enAttente ? `<span class="devoir-target-pill" style="background:rgba(255,130,8,.12);color:var(--accent-orange);">⏳ publication le ${new Date(d.date_depot).toLocaleDateString('fr-FR')}</span> · ` : '';
    const t = DEVOIR_TYPES.find(t=>t.id===d.type);
    return `<div class="devoir-row" style="--dt-color:${t?t.color:'var(--ink-soft)'};display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
      <span><b>${escapeHtml(d.titre)}</b> · ${escapeHtml(d.classes ? d.classes.nom+' ('+d.classes.niveau+')' : '')} · ${depotDetail}${cibleDetail}<span class="devoir-row-type"><span class=gicon style="font-size:1rem;vertical-align:middle;">${t?t.icon:'assignment'}</span> ${devoirTypeLabel(d.type)}</span><span class="hint" style="margin:0;">${typeDetail}</span>${dateStr?' · limite : '+dateStr:''} · ${nbRendus||0}/${totalEleves||0} rendu(s)</span>
      <span style="display:flex;gap:6px;flex:none;">
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="editDevoirPrompt('${d.id}')"><span class=gicon>edit</span> Éditer</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="openDevoirSubmissions('${d.id}')"><span class=gicon>visibility</span> Voir les rendus</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="deleteDevoirPrompt('${d.id}')"><span class=gicon>delete</span> Supprimer</button>
      </span>
    </div>`;
  }));
  el.innerHTML = rows.join('');
}
async function deleteDevoirPrompt(devoirId){
  if(!(await niceConfirm('Supprimer ce devoir et tous ses rendus ?'))) return;
  const { error: err1 } = await sb.from('devoirs_rendus').delete().eq('devoir_id', devoirId);
  if(err1){ await niceAlert('Erreur : '+err1.message); return; }
  const { error: err2 } = await sb.from('devoirs').delete().eq('id', devoirId);
  if(err2){ await niceAlert('Erreur : '+err2.message); return; }
  await refreshDevoirsProfListing();
}
/* Ouvre la liste des élèves de la classe concernée par ce devoir. Pour fichier/figure/
   figure_completer : rendu téléchargeable ou affichable, avec note/commentaire (comportement
   d'origine, inchangé). Pour automatismes/compte_est_bon : pas de "rendu" au sens fichier --
   le détail vient directement des tentatives enregistrées (cm_results/ceb_results, liées par
   devoir_id), puisque ces activités se jouent en direct plutôt que de se "rendre". */
async function openDevoirSubmissions(devoirId){
  const { data: devoir } = await sb.from('devoirs').select('*, classes(nom,niveau)').eq('id', devoirId).single();
  if(!devoir) return;
  // Restreint aux élèves ciblés par ce devoir quand une sélection a été faite (au lieu de toute
  // la classe) -- signalé : "permettre d'assigner à la classe ou quelques élèves de la classe".
  const cibleQuery = sb.from('class_students').select('profiles(id,nom)');
  const { data: eleves } = (devoir.student_ids && devoir.student_ids.length)
    ? await cibleQuery.eq('class_id', devoir.class_id).in('student_id', devoir.student_ids)
    : await cibleQuery.eq('class_id', devoir.class_id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.style.zIndex = '300';
  let rows;
  if(devoir.type==='automatismes'){
    rows = await devoirSubmissionRowsAutomatismes(devoir, eleves||[]);
  } else if(devoir.type==='compte_est_bon'){
    rows = await devoirSubmissionRowsCeb(devoir, eleves||[]);
  } else {
    rows = await devoirSubmissionRowsFichierFigure(devoir, eleves||[]);
  }
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
async function devoirSubmissionRowsFichierFigure(devoir, eleves){
  const { data: rendus } = await sb.from('devoirs_rendus').select('*').eq('devoir_id', devoir.id);
  const rendusByStudent = new Map((rendus||[]).map(r=>[r.student_id, r]));
  // Cache en mémoire (par id élève) : embarquer le JSON directement dans l'attribut HTML
  // onclick cassait l'attribut (les guillemets du JSON entraient en conflit avec ceux de
  // l'attribut, signalé : "je n'arrive pas à ouvrir la figure de l'élève").
  window._devoirFiguresCache = window._devoirFiguresCache || {};
  (rendus||[]).forEach(r=>{ if(r.type==='figure' || r.type==='figure_completer') window._devoirFiguresCache[r.student_id] = r.figure_data; });
  return eleves.map(row=>{
    const eleve = row.profiles; if(!eleve) return '';
    const rendu = rendusByStudent.get(eleve.id);
    let content, brouillonTag = '';
    if(!rendu) content = '<span class="hint">Pas encore rendu.</span>';
    else {
      if(!rendu.est_rendu) brouillonTag = ' <span style="color:#8A6D1F;font-weight:700;">(brouillon, pas encore rendu)</span>';
      if(rendu.type==='figure' || rendu.type==='figure_completer') content = `<button class="btn secondary" style="font-size:.72rem;padding:3px 8px;" onclick="previewDevoirFigure('${eleve.id}')"><span class=gicon>visibility</span> Voir la figure</button>${brouillonTag}`;
      else content = `<button class="btn secondary" style="font-size:.72rem;padding:3px 8px;" onclick="downloadDevoirFile('${rendu.fichier_path}')"><span class=gicon>download</span> Télécharger le fichier</button>${brouillonTag}`;
    }
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
}
async function devoirSubmissionRowsAutomatismes(devoir, eleves){
  const seqs = devoir.automatismes_sequences || [];
  const { data: attempts } = await sb.from('cm_results').select('student_id,sequence_id,score,total').eq('devoir_id', devoir.id);
  const byStudent = new Map();
  (attempts||[]).forEach(a=>{
    if(!byStudent.has(a.student_id)) byStudent.set(a.student_id, new Map());
    const m = byStudent.get(a.student_id);
    // Meilleur score conservé si la séquence a été retentée plusieurs fois.
    const prev = m.get(a.sequence_id);
    if(!prev || a.score>prev.score) m.set(a.sequence_id, a);
  });
  return eleves.map(row=>{
    const eleve = row.profiles; if(!eleve) return '';
    const m = byStudent.get(eleve.id) || new Map();
    const nbFaites = seqs.filter(id=>m.has(id)).length;
    const detail = seqs.map(id=>{
      const seqDef = (typeof CM_SEQUENCES!=='undefined') ? CM_SEQUENCES.find(s=>s.id===id) : null;
      const label = seqDef ? seqDef.label : id;
      const r = m.get(id);
      return `<div class="hint" style="margin:2px 0;">${r?'<span class="gicon" style="font-size:.9rem;color:#1F7A4D;">check</span>':'<span class="gicon" style="font-size:.9rem;">radio_button_unchecked</span>'} ${escapeHtml(label)}${r?` : ${r.score}/${r.total}`:''}</div>`;
    }).join('');
    return `<div style="padding:8px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span><b>${escapeHtml(eleve.nom||'(sans nom)')}</b></span>
        <span class="hint" style="margin:0;">${nbFaites}/${seqs.length} séquence(s) faite(s)</span>
      </div>
      ${detail}
    </div>`;
  }).join('');
}
async function devoirSubmissionRowsCeb(devoir, eleves){
  const rounds = devoir.ceb_rounds || [];
  const nRounds = rounds.length || 1;
  const { data: attempts } = await sb.from('ceb_results').select('student_id,devoir_round,gap,result_value,created_at').eq('devoir_id', devoir.id).order('created_at',{ascending:false});
  const byStudent = new Map();
  (attempts||[]).forEach(a=>{
    if(!byStudent.has(a.student_id)) byStudent.set(a.student_id, new Map());
    const m = byStudent.get(a.student_id);
    const idx = a.devoir_round ?? 0;
    // Meilleur écart conservé si le compte a été retenté plusieurs fois.
    const prev = m.get(idx);
    if(!prev || a.gap<prev.gap) m.set(idx, a);
  });
  return eleves.map(row=>{
    const eleve = row.profiles; if(!eleve) return '';
    const m = byStudent.get(eleve.id) || new Map();
    const nbFaits = Array.from({length:nRounds}, (_,i)=>i).filter(i=>m.has(i)).length;
    const detail = Array.from({length:nRounds}, (_,i)=>{
      const r = m.get(i);
      return `<div class="hint" style="margin:2px 0;">${r?'<span class="gicon" style="font-size:.9rem;color:#1F7A4D;">check</span>':'<span class="gicon" style="font-size:.9rem;">radio_button_unchecked</span>'} Compte ${i+1}${r?` : écart ${r.gap} (réponse ${r.result_value})`:''}</div>`;
    }).join('');
    return `<div style="padding:8px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span><b>${escapeHtml(eleve.nom||'(sans nom)')}</b></span>
        <span class="hint" style="margin:0;">${nbFaits}/${nRounds} compte(s) fait(s)</span>
      </div>
      ${detail}
    </div>`;
  }).join('');
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
  // deserializeFigState résout les identifiants de référence (voir serializeFigState,
  // outils-figures.js) -- cloneFigState seule ne suffit pas ici : elle suppose des
  // références DÉJÀ partagées en mémoire, alors que les données venant de la base ont
  // toujours transité par un JSON.stringify/parse qui les a converties en identifiants.
  const cloned = deserializeFigState(data);
  figState.points = cloned.points;
  figState.shapes = cloned.shapes;
  figState.nextLabel = figState.points.length;
  // "Valider et insérer la figure" n'a pas de sens ici : c'est un APERÇU en lecture du
  // travail de l'élève, rien à insérer nulle part.
  const validateBtn = document.getElementById('figValidateBtn');
  if(validateBtn) validateBtn.style.display = 'none';
  const closeBtn = document.getElementById('figCloseBtn');
  if(closeBtn) closeBtn.textContent = 'Fermer';
  renderFigureSvg();
}

/* ================= CÔTÉ ÉLÈVE ================= */
let currentDevoirSubmission = null; // {devoirId, type:'figure'|'figure_completer'} -- suivi pendant la construction d'une figure
async function renderDevoirsEleve(){
  const el = document.getElementById('devoirsEleveListing');
  el.innerHTML = '<p class="hint">Chargement…</p>';
  const classIds = (accountClassesList||[]).map(c=>c.id);
  if(!classIds.length){ el.innerHTML = '<p class="hint">Aucune classe associée à ce compte.</p>'; return; }
  const { data: devoirsListRaw, error } = await sb.from('devoirs')
    .select('id,titre,consigne,date_depot,date_limite,teacher_id,type,figure_depart,automatismes_sequences,ceb_n_large,ceb_timer_on,ceb_timer_duration,ceb_rounds,student_ids,profiles(nom)')
    .in('class_id', classIds).order('date_limite',{ascending:true, nullsFirst:false});
  if(error){ el.innerHTML = 'Erreur : '+error.message; return; }
  const now = new Date();
  // Un devoir ciblant une sélection d'élèves n'est visible que par les élèves concernés
  // (student_ids null/vide = toute la classe) -- signalé : "permettre d'assigner à la classe
  // ou quelques élèves de la classe". Un devoir avec une date de dépôt future reste invisible
  // jusqu'à cette date -- signalé : "donner une date de dépôt du prof" (publication programmée).
  const devoirsList = (devoirsListRaw||[]).filter(d =>
    (!d.student_ids || !d.student_ids.length || d.student_ids.includes(currentUser.id))
    && (!d.date_depot || new Date(d.date_depot) <= now)
  );
  if(!devoirsList || !devoirsList.length){ el.innerHTML = '<p class="hint">Aucun devoir pour l\'instant.</p>'; return; }
  const { data: mesRendus } = await sb.from('devoirs_rendus').select('*').eq('student_id', currentUser.id);
  const renduByDevoir = new Map((mesRendus||[]).map(r=>[r.devoir_id, r]));
  // Type "automatismes"/"compte_est_bon" : pas de simple statut oui/non -- le détail de
  // progression vient des tentatives elles-mêmes (cm_results/ceb_results), d'où une requête
  // par devoir concerné plutôt qu'une seule requête groupée.
  const rows = await Promise.all(devoirsList.map(async d=>{
    const rendu = renduByDevoir.get(d.id);
    const dateStr = d.date_limite ? new Date(d.date_limite).toLocaleDateString('fr-FR') : '';
    const statusBadge = rendu && rendu.est_rendu
      ? `<span style="color:#1F7A4D;font-weight:700;">[Rendu${rendu.note!=null ? ' -- note : '+rendu.note+'/20' : ''}]</span>`
      : rendu
        ? `<span style="color:#8A6D1F;font-weight:700;">[Brouillon enregistré -- pas encore rendu]</span>`
        : `<span style="color:#B8860B;font-weight:700;">[À rendre]</span>`;
    let actionHtml;
    if(d.type==='automatismes'){
      const seqs = d.automatismes_sequences || [];
      const { data: attempts } = await sb.from('cm_results').select('sequence_id').eq('devoir_id', d.id).eq('student_id', currentUser.id);
      const doneIds = new Set((attempts||[]).map(a=>a.sequence_id));
      const detail = seqs.map(id=>{
        const seqDef = (typeof CM_SEQUENCES!=='undefined') ? CM_SEQUENCES.find(s=>s.id===id) : null;
        const label = seqDef ? seqDef.label : id;
        const done = doneIds.has(id);
        return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:2px 0;">
          <span class="hint" style="margin:0;">${done?'<span class="gicon" style="font-size:.9rem;color:#1F7A4D;">check</span>':'<span class="gicon" style="font-size:.9rem;">radio_button_unchecked</span>'} ${escapeHtml(label)}</span>
          <button class="btn secondary" style="font-size:.7rem;padding:3px 7px;" onclick="startDevoirCMSequence('${d.id}','${id}')">${done?'Refaire':'Faire cette séquence'}</button>
        </div>`;
      }).join('');
      actionHtml = `<div style="margin-top:4px;">${detail}</div>`;
    } else if(d.type==='compte_est_bon'){
      const rounds = d.ceb_rounds || [];
      const { data: attempts } = await sb.from('ceb_results').select('devoir_round,gap,result_value').eq('devoir_id', d.id).eq('student_id', currentUser.id);
      const bestByRound = new Map();
      (attempts||[]).forEach(a=>{
        const idx = a.devoir_round ?? 0;
        const prev = bestByRound.get(idx);
        if(!prev || a.gap<prev.gap) bestByRound.set(idx, a);
      });
      // Cache en mémoire (par id devoir) pour startDevoirCEB (compte-est-bon.js) : les tirages
      // (numbers/target) sont trop volumineux et mal adaptés à un attribut onclick.
      window._devoirCebRoundsCache = window._devoirCebRoundsCache || {};
      window._devoirCebRoundsCache[d.id] = { rounds, timerOn: d.ceb_timer_on, timerDuration: d.ceb_timer_duration };
      const settingsLabel = `${d.ceb_n_large??2} grand(s) nombre(s), ${d.ceb_timer_on?'chronométré ('+(d.ceb_timer_duration||60)+' s)':'illimité'}`;
      const roundsHtml = rounds.map((r,i)=>{
        const done = bestByRound.get(i);
        return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:2px 0;">
          <span class="hint" style="margin:0;">${done?'<span class="gicon" style="font-size:.9rem;color:#1F7A4D;">check</span>':'<span class="gicon" style="font-size:.9rem;">radio_button_unchecked</span>'} Compte ${i+1}${done?` : écart ${done.gap}`:''}</span>
          <button class="btn secondary" style="font-size:.7rem;padding:3px 7px;" onclick="startDevoirCEB('${d.id}',${i})">${done?'Retenter':'Jouer'}</button>
        </div>`;
      }).join('');
      actionHtml = `<div style="margin-top:4px;">
        <p class="hint" style="margin:0 0 4px;">${settingsLabel}</p>
        ${roundsHtml}
      </div>`;
    } else if(d.type==='figure_completer'){
      actionHtml = `<div class="tool-row" style="margin-top:4px;">
        <button class="btn secondary" onclick="startDevoirFigureCompleter('${d.id}')"><span class=gicon>auto_fix_high</span> ${rendu&&rendu.figure_data?'Reprendre la figure':'Compléter la figure'}</button>
      </div>`;
    } else if(d.type==='figure'){
      actionHtml = `<div class="tool-row" style="margin-top:4px;">
        <button class="btn secondary" onclick="startDevoirFigure('${d.id}')"><span class=gicon>draw</span> Construire une figure</button>
      </div>`;
    } else {
      actionHtml = `<div class="tool-row" style="margin-top:4px;">
        <input type="file" id="devoirFile_${d.id}" style="max-width:220px;">
        <button class="btn secondary" onclick="submitDevoirFile('${d.id}')"><span class=gicon>upload_file</span> Rendre ce fichier</button>
      </div>`;
    }
    return `<div class="tool-shell" style="margin-top:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span><b>${escapeHtml(d.titre)}</b>${dateStr?' · limite : '+dateStr:''} ${statusBadge}</span>
      </div>
      <p class="hint" style="margin:6px 0;">${escapeHtml(d.consigne)}</p>
      ${rendu && rendu.commentaire_prof ? `<p class="hint" style="margin:0 0 8px;"><b>Commentaire du prof :</b> ${escapeHtml(rendu.commentaire_prof)}</p>` : ''}
      ${actionHtml}
      <span class="hint" id="devoirSubmitStatus_${d.id}" style="margin:0;"></span>
    </div>`;
  }));
  el.innerHTML = rows.join('');
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
  status.textContent = '✓ Fichier enregistré.';
  const veutRendre = await niceConfirm('Voulez-vous rendre votre devoir ?');
  if(!veutRendre) return; // reste en brouillon (fichier enregistré, mais pas encore rendu)
  const { error: err2 } = await sb.from('devoirs_rendus').update({ est_rendu: true }).eq('devoir_id', devoirId).eq('student_id', currentUser.id);
  if(err2){ status.textContent = 'Erreur : '+err2.message; return; }
  status.textContent = '✓ Devoir rendu.';
  await renderDevoirsEleve();
}
/* Ouvre l'outil figure en mode "rendu de devoir" : un bouton "Rendre ce devoir" apparaît dans
   le panneau tant que ce contexte est actif (voir outils-figures.js). */
function startDevoirFigure(devoirId){
  currentDevoirSubmission = { devoirId, type: 'figure' };
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
/* Ouvre l'outil figure pour un devoir "figure à compléter" : précharge le rendu de l'élève déjà
   en cours s'il existe, sinon la figure de départ construite par le prof. */
async function startDevoirFigureCompleter(devoirId){
  currentDevoirSubmission = { devoirId, type: 'figure_completer' };
  openFigureTool();
  const { data: rendu } = await sb.from('devoirs_rendus').select('figure_data')
    .eq('devoir_id', devoirId).eq('student_id', currentUser.id).maybeSingle();
  let toLoad = rendu && rendu.figure_data;
  if(!toLoad){
    const { data: devoir } = await sb.from('devoirs').select('figure_depart').eq('id', devoirId).single();
    toLoad = devoir && devoir.figure_depart;
  }
  if(toLoad){
    const restored = deserializeFigState(toLoad);
    figState.points = restored.points;
    figState.shapes = restored.shapes;
    figState.nextLabel = figState.points.length;
    renderFigureSvg();
  }
  const validateBtn = document.getElementById('figValidateBtn');
  const submitBtn = document.getElementById('figSubmitDevoirBtn');
  const loadBtn = document.getElementById('figLoadDevoirBtn');
  if(validateBtn) validateBtn.style.display = 'none';
  if(submitBtn) submitBtn.style.display = 'inline-flex';
  if(loadBtn) loadBtn.style.display = 'none'; // déjà préchargé automatiquement ci-dessus
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
  if(!rendu || rendu.type!==currentDevoirSubmission.type || !rendu.figure_data){ await niceAlert('Aucun rendu (figure) précédent trouvé pour ce devoir.'); return; }
  const restored = deserializeFigState(rendu.figure_data);
  figState.points = restored.points;
  figState.shapes = restored.shapes;
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
}
async function submitCurrentFigureAsDevoir(){
  if(!currentDevoirSubmission) return;
  const { devoirId, type } = currentDevoirSubmission;
  const snapshot = serializeFigState(figState);
  const { error } = await sb.from('devoirs_rendus').upsert({
    devoir_id: devoirId, student_id: currentUser.id, type, figure_data: snapshot, submitted_at: new Date().toISOString(),
  }, { onConflict: 'devoir_id,student_id' });
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  await niceAlert('Figure enregistrée.');
  // Enregistrer d'abord (brouillon, encore modifiable), PUIS demande explicitement si
  // l'élève veut rendre définitivement -- ne ferme/ne quitte l'outil que dans ce cas.
  const veutRendre = await niceConfirm('Voulez-vous rendre votre devoir ?');
  if(!veutRendre) return; // reste en brouillon, l'outil reste ouvert pour continuer à travailler
  const { error: err2 } = await sb.from('devoirs_rendus').update({ est_rendu: true }).eq('devoir_id', devoirId).eq('student_id', currentUser.id);
  if(err2){ await niceAlert('Erreur : '+err2.message); return; }
  currentDevoirSubmission = null;
  closeFigureTool();
  await niceAlert('Devoir rendu avec succès.');
  await renderDevoirsEleve();
}
/* Devoir "automatismes" : pas de fichier/figure à rendre -- le devoir est considéré fait une
   fois que l'élève a tenté TOUTES les séquences assignées (au moins une fois chacune, quel que
   soit le score). Appelée par calcul-mental.js après chaque tentative jouée dans le contexte
   d'un devoir (voir startDevoirCMSequence ci-dessous). */
async function refreshDevoirAutomatismesProgress(devoirId){
  const { data: devoir } = await sb.from('devoirs').select('automatismes_sequences').eq('id', devoirId).single();
  if(!devoir) return;
  const seqs = devoir.automatismes_sequences || [];
  if(!seqs.length) return;
  const { data: attempts } = await sb.from('cm_results').select('sequence_id').eq('devoir_id', devoirId).eq('student_id', currentUser.id);
  const doneIds = new Set((attempts||[]).map(a=>a.sequence_id));
  if(!seqs.every(id=>doneIds.has(id))) return;
  await sb.from('devoirs_rendus').upsert({
    devoir_id: devoirId, student_id: currentUser.id, type: 'automatismes', est_rendu: true, submitted_at: new Date().toISOString(),
  }, { onConflict: 'devoir_id,student_id' });
}
/* Devoir "compte est bon" : considéré fait une fois TOUS les comptes assignés joués au moins une
   fois chacun (le nombre de comptes est choisi par le prof -- "il faut pouvoir en assigner
   plusieurs"). Appelée par compte-est-bon.js après chaque tentative enregistrée dans le contexte
   d'un devoir. */
async function refreshDevoirCEBProgress(devoirId){
  const { data: devoir } = await sb.from('devoirs').select('ceb_rounds').eq('id', devoirId).single();
  if(!devoir) return;
  const nRounds = (devoir.ceb_rounds || []).length || 1;
  const { data: attempts } = await sb.from('ceb_results').select('devoir_round').eq('devoir_id', devoirId).eq('student_id', currentUser.id);
  const doneRounds = new Set((attempts||[]).map(a=>a.devoir_round ?? 0));
  if(doneRounds.size < nRounds) return;
  await sb.from('devoirs_rendus').upsert({
    devoir_id: devoirId, student_id: currentUser.id, type: 'compte_est_bon', est_rendu: true, submitted_at: new Date().toISOString(),
  }, { onConflict: 'devoir_id,student_id' });
}
/* startDevoirCMSequence(devoirId, sequenceId) et startDevoirCEB(devoirId, roundIndex) sont
   définies dans calcul-mental.js / compte-est-bon.js (chargés après devoirs.js) -- elles y ont
   besoin de runCM/cebStartGame et des variables d'état de ces modules, inutile de les dupliquer
   ici. startDevoirCEB lit window._devoirCebRoundsCache (rempli par renderDevoirsEleve ci-dessus)
   pour récupérer le tirage fixé (numbers/target) de la manche demandée. */

/* ================= BAC À SABLE : sauvegarde nommée ================= */
/* Enregistre la figure courante sous un nom choisi -- permet de la reprendre ultérieurement
   (signalé : "permettre de donner un nom à l'enregistrement pour le reprendre
   ultérieurement"). Si le nom existe déjà pour cet utilisateur, propose de l'écraser plutôt
   que de créer un doublon. */
async function saveSandboxFigurePrompt(){
  const nom = await nicePrompt('Nom de cette figure :', '');
  if(!nom || !nom.trim()) return;
  const nomTrim = nom.trim();
  const { data: existing } = await sb.from('figures_sauvegardees').select('id').eq('user_id', currentUser.id).eq('nom', nomTrim).maybeSingle();
  if(existing){
    if(!(await niceConfirm(`Une figure nommée "${nomTrim}" existe déjà. La remplacer ?`))) return;
  }
  const snapshot = serializeFigState(figState);
  const payload = { user_id: currentUser.id, nom: nomTrim, figure_data: snapshot, updated_at: new Date().toISOString() };
  const { error } = existing
    ? await sb.from('figures_sauvegardees').update(payload).eq('id', existing.id)
    : await sb.from('figures_sauvegardees').insert(payload);
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  await niceAlert(`Figure "${nomTrim}" enregistrée.`);
}
/* Fenêtre listant les figures déjà enregistrées par l'utilisateur, avec ouverture ou
   suppression. */
async function openSandboxFiguresModal(){
  const { data, error } = await sb.from('figures_sauvegardees').select('id,nom,updated_at').eq('user_id', currentUser.id).order('updated_at', {ascending:false});
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  document.querySelectorAll('.modal-overlay[data-kind="sandbox-figures"]').forEach(o=>o.remove());
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.dataset.kind = 'sandbox-figures';
  overlay.style.zIndex = '300';
  const rows = (data||[]).map(f=>{
    const dateStr = new Date(f.updated_at).toLocaleDateString('fr-FR');
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <span>${escapeHtml(f.nom)} <span class="hint">(${dateStr})</span></span>
      <span style="display:flex;gap:6px;flex:none;">
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="loadSandboxFigure('${f.id}')">Ouvrir</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="deleteSandboxFigure('${f.id}')"><span class=gicon>delete</span></button>
      </span>
    </div>`;
  }).join('');
  overlay.innerHTML = `
    <div class="modal-card" style="max-width:420px;max-height:80vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Mes figures enregistrées</strong>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()"><span class=gicon>close</span></button>
      </div>
      ${rows || '<p class="hint">Aucune figure enregistrée pour l\'instant.</p>'}
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.remove(); });
}
async function loadSandboxFigure(id){
  const { data, error } = await sb.from('figures_sauvegardees').select('figure_data').eq('id', id).single();
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  const restored = deserializeFigState(data.figure_data);
  figState.points = restored.points;
  figState.shapes = restored.shapes;
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
  document.querySelectorAll('.modal-overlay[data-kind="sandbox-figures"]').forEach(o=>o.remove());
}
async function deleteSandboxFigure(id){
  if(!(await niceConfirm('Supprimer définitivement cette figure enregistrée ?'))) return;
  await sb.from('figures_sauvegardees').delete().eq('id', id);
  await openSandboxFiguresModal();
}

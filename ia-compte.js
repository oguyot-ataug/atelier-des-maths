/* =====================================================================
   ia-compte.js -- « Intelligence artificielle » (Mon compte, professeurs)

   Demandé : "le professeur choisit s'il veut utiliser l'IA pour lui et/ou pour ses élèves.
   Ensuite, il ajoute des crédits sur Anthropic directement. Et il a une vue claire sur
   l'utilisation qui en est faite par lui-même et/ou ses élèves [...] il doit avoir un rapport
   bien détaillé."

   - Clé Anthropic du professeur : envoyée au relais ai-proxy qui la vérifie auprès d'Anthropic
     puis la range chiffrée (Vault) ; le site n'en garde que les 4 derniers caractères.
   - Réglages (teacher_ai_settings) : IA pour moi, IA pour mes élèves (fonctionnalités, quota).
   - Rapport (RPC ai_usage_report) : tout ce qui a été payé par la clé du professeur.
   - Accès (RPC my_ai_access) : pose sur <body> les classes ai-quiz, ai-figure, ai-tableau,
     ai-eval, ai-geoanim, qui affichent/masquent les outils IA (voir styles.css). Le relais
     revérifie tout côté serveur : masquer un bouton n'est qu'un confort d'affichage.
   ===================================================================== */

const IA_FEATURE_LABELS = {
  'quiz': 'Quiz IA (chapitres)',
  'evaluation': 'Évaluation (exercices proposés)',
  'figure': 'Figure (interprétation d\'énoncé)',
  'tableau-ia': 'Construction géométrique (tableau / animation)',
  'olivia': 'Oliv\'IA (aide sur les cours)',
};
const IA_STUDENT_FEATURES = [
  {key:'quiz', label:'Quiz IA sur les chapitres'},
  {key:'tableau', label:'Construction IA au tableau interactif'},
  {key:'figure', label:'Interprétation IA des figures'},
];
// Tarif du modèle utilisé par le relais (claude-sonnet-4-6), en dollars par million de tokens.
const IA_PRICE_IN = 3, IA_PRICE_OUT = 15;

let aiAccess = null;
const AI_BODY_CLASSES = ['ai-quiz','ai-figure','ai-tableau','ai-eval','ai-geoanim'];
function applyAiAccessClasses(){
  const on = new Set();
  const a = aiAccess;
  if(a && (a.role==='prof' || a.role==='admin') && a.self) AI_BODY_CLASSES.forEach(c=>on.add(c));
  // Parent (offre Famille) : tous les outils IA sauf ceux réservés aux professeurs (évaluation).
  if(a && a.role==='parent' && a.self) AI_BODY_CLASSES.filter(c=>c!=='ai-eval').forEach(c=>on.add(c));
  if(a && a.role==='eleve' && a.features){
    if(a.features.quiz) on.add('ai-quiz');
    if(a.features.figure) on.add('ai-figure');
    if(a.features.tableau) on.add('ai-tableau');
  }
  AI_BODY_CLASSES.forEach(c=>document.body.classList.toggle(c, on.has(c)));
  if(typeof oliviaMaj==='function') oliviaMaj(); // Oliv'IA (olivia.js) : accès recalculé
}
async function loadAiAccess(){
  aiAccess = null;
  if(typeof currentUser!=='undefined' && currentUser){
    try{
      const { data, error } = await sb.rpc('my_ai_access');
      if(!error) aiAccess = data;
    }catch(e){ /* hors ligne : outils IA masqués */ }
  }
  applyAiAccessClasses();
}
function clearAiAccess(){ aiAccess = null; applyAiAccessClasses(); }

/* ---- Utilitaires ---- */
function iaCost(r){
  if(r.input_tokens==null && r.output_tokens==null) return null;
  return ((r.input_tokens||0)*IA_PRICE_IN + (r.output_tokens||0)*IA_PRICE_OUT)/1e6;
}
function iaFmtUsd(v){
  if(v==null) return '–';
  const d = v<0.1 ? 3 : 2;
  return v.toFixed(d).replace('.',',')+' $';
}
function iaEsc(s){ return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function iaPersonName(r){
  const n = [r.nom, r.prenom].filter(Boolean).join(' ').trim();
  return n || 'Compte supprimé';
}
async function iaProxyAction(body){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session) throw new Error('Connectez-vous d\'abord.');
  const res = await fetch(SUPABASE_URL+'/functions/v1/ai-proxy', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+session.access_token },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(()=>({error:'Réponse illisible du serveur.'}));
  if(data.error) throw new Error(data.error);
  return data;
}

/* ---- Page ---- */
let iaSettings = null, iaMyClasses = [], iaReportRows = [], iaPeriod = 'mois', iaAllSite = false;
let iaStudents = [], iaStudentAccess = new Map(), iaStudentUse30 = new Map();

function openIaPage(){
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  showView('view-ia');
  renderIaPage();
}
async function renderIaPage(){
  const root = document.getElementById('iaRoot');
  if(!root) return;
  if(!currentUser || !(currentUserRole==='prof' || currentUserRole==='admin')){
    root.innerHTML = '<p class="hint">Réservé aux professeurs connectés.</p>'; return;
  }
  root.innerHTML = '<p class="hint">Chargement…</p>';
  const [{ data: s }, { data: cls }, { data: acc }, { data: use30 }] = await Promise.all([
    sb.from('teacher_ai_settings').select('*').eq('teacher_id', currentUser.id).maybeSingle(),
    sb.from('class_teachers').select('classes(id,nom,niveau,groupe)').eq('teacher_id', currentUser.id),
    sb.from('student_ai_access').select('student_id,enabled,quota,olivia').eq('teacher_id', currentUser.id),
    sb.rpc('ai_usage_report', {p_from: new Date(Date.now()-30*24*3600e3).toISOString(), p_to: new Date(Date.now()+24*3600e3).toISOString(), p_scope:'me'}),
  ]);
  await loadAiAccess(); // mode de clé et présence de la clé d'établissement
  iaSettings = s || {ai_self:false, ai_students:false, student_mode:'all', key_mode:'perso', student_features:{quiz:true,tableau:true,figure:true}, student_weekly_quota:20, key_last4:null, key_set_at:null};
  iaMyClasses = (cls||[]).map(r=>r.classes).filter(Boolean).sort((a,b)=>a.nom.localeCompare(b.nom));
  iaStudentAccess = new Map((acc||[]).map(a=>[a.student_id, a]));
  iaStudentUse30 = new Map();
  (use30||[]).forEach(r=>{ if(r.role==='eleve') iaStudentUse30.set(r.user_id, (iaStudentUse30.get(r.user_id)||0)+1); });
  iaStudents = [];
  if(iaMyClasses.length){
    const { data: st } = await sb.from('class_students').select('class_id, profiles(id,nom,prenom)').in('class_id', iaMyClasses.map(c=>c.id));
    const clsName = new Map(iaMyClasses.map(c=>[c.id, c.nom]));
    iaStudents = (st||[]).filter(r=>r.profiles).map(r=>({id:r.profiles.id, nom:r.profiles.nom||'', prenom:r.profiles.prenom||'', class_id:r.class_id, classe:clsName.get(r.class_id)||''}))
      .sort((a,b)=>a.classe.localeCompare(b.classe) || a.nom.localeCompare(b.nom) || a.prenom.localeCompare(b.prenom));
  }
  const isAdmin = currentUserRole==='admin';
  // Mode de clé décidé par l'administrateur ou le référent : site / établissement / personnelle.
  const keyMode = isAdmin ? 'site' : (iaSettings.key_mode || 'perso');
  const etabKey = !!(aiAccess && aiAccess.etab_key);
  // La clé personnelle sert aussi de clé de secours en mode site / établissement.
  const persoKey = !!iaSettings.key_last4;
  const hasKey = keyMode==='site' || (keyMode==='etab' && etabKey) || persoKey;
  const mainKeyLabel = keyMode==='site' ? 'la clé du site' : 'la clé de l\'établissement';
  const payerLabel = keyMode==='site' ? 'la clé du site' + (persoKey ? ' (puis votre clé de secours si besoin)' : '') : (keyMode==='etab' && etabKey) ? 'la clé de votre établissement' + (persoKey ? ' (puis votre clé de secours si besoin)' : '') : 'votre clé';
  const selectedMode = iaSettings.student_mode==='selected';
  const feats = iaSettings.student_features || {};
  const quota = iaSettings.student_weekly_quota;

  const keyCard = isAdmin ? `
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">key</span> 1. Clé Anthropic</strong>
      <p class="hint" style="margin:6px 0 0;">Administrateur : l'IA de votre compte et de vos classes utilise la clé du site. Pas besoin de clé personnelle.</p>
    </div>` : `
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">key</span> 1. Votre clé Anthropic</strong>
      ${keyMode==='site'
        ? `<p style="margin:6px 0 8px;padding:8px 12px;background:rgba(31,122,77,.08);border-left:3px solid #1F7A4D;border-radius:6px;"><span class="gicon">verified</span> <b>Votre IA passe par la clé du site</b> : vous n'avez pas besoin de clé personnelle, votre IA et celle de vos élèves sont prises en charge (dans la limite du budget mensuel éventuellement accordé à votre établissement).</p>`
        : keyMode==='etab'
        ? (etabKey
          ? `<p style="margin:6px 0 8px;padding:8px 12px;background:rgba(31,122,77,.08);border-left:3px solid #1F7A4D;border-radius:6px;"><span class="gicon">domain</span> <b>Votre établissement prend en charge votre IA</b> (clé de l'établissement, gérée par votre référent) : vous n'avez pas besoin de clé personnelle.</p>`
          : persoKey
          ? `<p style="margin:6px 0 8px;padding:8px 12px;background:rgba(31,122,77,.08);border-left:3px solid #1F7A4D;border-radius:6px;"><span class="gicon">domain</span> Votre IA doit passer par <b>la clé de votre établissement</b>, que votre référent n'a pas encore enregistrée : <b>votre clé personnelle est utilisée en attendant</b>.</p>`
          : `<p style="margin:6px 0 8px;padding:8px 12px;background:rgba(179,38,30,.07);border-left:3px solid #B3261E;border-radius:6px;"><span class="gicon">domain</span> Votre IA doit passer par <b>la clé de votre établissement</b>, mais votre référent ne l'a pas encore enregistrée : l'IA reste inactive en attendant (sauf si vous enregistrez votre clé personnelle ci-dessous).</p>`)
        : `<p class="hint" style="margin:6px 0 8px;">L'IA du site est payée par <b>votre propre compte Anthropic</b> (l'entreprise qui fournit l'IA Claude) : vous y ajoutez vous-même des crédits et fixez un plafond de dépense. Le site n'encaisse rien.</p>`}
      <div id="iaKeyStatus" style="margin-bottom:8px;">${iaSettings.key_last4
        ? `<span style="color:#1F7A4D;font-weight:700;"><span class="gicon">check_circle</span> ${keyMode==='perso'?'Clé enregistrée':'Clé de secours enregistrée'}</span> <span class="hint-mono">sk-ant-…${iaEsc(iaSettings.key_last4)}</span> <span class="hint">(${iaSettings.key_set_at ? new Date(iaSettings.key_set_at).toLocaleDateString('fr-FR') : ''})</span>`
          + (keyMode!=='perso' ? `<span class="hint" style="display:block;margin-top:4px;">Elle prend le relais automatiquement, à vos frais, si ${mainKeyLabel} n'est plus utilisable (${keyMode==='site'?'budget mensuel de l\'établissement atteint':'clé absente ou sans crédit'}). Vos outils fonctionnent ainsi sans interruption.</span>` : '')
        : keyMode!=='perso' ? `<span class="hint">Aucune clé personnelle : ${mainKeyLabel} est utilisée. <b>Facultatif</b> : si vous enregistrez votre propre clé, elle servira de <b>clé de secours</b> et prendra le relais automatiquement si ${mainKeyLabel} n'est plus utilisable (${keyMode==='site'?'budget mensuel de l\'établissement atteint':'clé absente ou sans crédit'}).</span>`
        : `<span style="color:#B3261E;font-weight:700;"><span class="gicon">block</span> Aucune clé : l'IA est désactivée pour vous et vos élèves.</span>`}</div>
      <div class="tool-row" style="margin:0;">
        <input type="password" id="iaKeyInput" placeholder="sk-ant-api03-…" autocomplete="off" style="flex:1;min-width:220px;">
        <button class="btn" onclick="iaSaveKey()" id="iaKeySaveBtn">${iaSettings.key_last4 ? 'Remplacer la clé' : 'Vérifier et enregistrer'}</button>
        ${iaSettings.key_last4 ? '<button class="btn secondary" onclick="iaRemoveKey()">Supprimer la clé</button>' : ''}
      </div>
      <span class="hint" id="iaKeyMsg" style="display:block;margin-top:6px;min-height:1.2em;"></span>
      <details style="margin-top:6px;">
        <summary style="cursor:pointer;font-weight:600;">Comment obtenir une clé et ajouter des crédits (5 minutes)</summary>
        <ol style="margin:8px 0 0;padding-left:20px;line-height:1.6;font-size:.9rem;">
          <li>Créez un compte sur <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a> (adresse e-mail + téléphone).</li>
          <li><b>Billing</b> (facturation) : ajoutez une carte bancaire et achetez des crédits, par exemple 5 $ (le minimum). À titre indicatif, une génération coûte environ 1 centime.</li>
          <li><b>Limits</b> : fixez un plafond de dépense mensuel (par exemple 5 $). Au-delà, l'IA s'arrête simplement, sans surprise.</li>
          <li><b>API keys</b> : « Create key », nommez-la « Atelier des Maths », copiez-la (elle commence par <span class="hint-mono">sk-ant-</span>) et collez-la ci-dessus.</li>
          <li>Rechargez des crédits sur la même page quand il n'y en a plus : le site vous préviendra.</li>
        </ol>
        <p class="hint" style="margin:6px 0 0;">Votre clé est vérifiée auprès d'Anthropic, puis conservée chiffrée : ni vos élèves ni les autres professeurs ne peuvent la voir. Seuls ses 4 derniers caractères s'affichent ici.</p>
      </details>
    </div>`;

  root.innerHTML = `
    ${keyCard}
    <div class="tool-shell ia-card" style="${hasKey?'':'opacity:.55;'}">
      <strong class="ia-h"><span class="gicon">person</span> 2. L'IA pour moi</strong>
      <label style="display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-weight:600;"><input type="checkbox" id="iaSelf" ${iaSettings.ai_self||isAdmin?'checked':''} ${hasKey&&!isAdmin?'':'disabled'} onchange="iaSaveSettings('iaSelfMsg')"> Utiliser l'IA dans mes outils</label>
      <span class="hint" id="iaSelfMsg" style="display:block;margin:0 0 4px;min-height:1.2em;"></span>
      <p class="hint" style="margin:0;">Débloque : ${Object.values(IA_FEATURE_LABELS).join(' · ')} (outil « Animation géométrique » compris). Décoché : ces outils disparaissent de votre compte.${isAdmin?' Toujours actif pour l\'administrateur.':''}</p>
    </div>
    <div class="tool-shell ia-card" style="${hasKey?'':'opacity:.55;'}">
      <strong class="ia-h"><span class="gicon">groups</span> 3. L'IA pour mes élèves</strong>
      <label style="display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-weight:600;"><input type="checkbox" id="iaStudents" ${iaSettings.ai_students?'checked':''} ${hasKey?'':'disabled'} onchange="document.getElementById('iaStudentOpts').style.opacity=this.checked?1:.5; iaSaveSettings()"> Autoriser l'IA pour les élèves de mes classes</label>
      <p class="hint" style="margin:0 0 8px;">Leurs utilisations sont payées par ${payerLabel} et figurent dans le rapport ci-dessous. Décoché : aucun outil IA pour vos élèves. Classes concernées : ${iaMyClasses.length ? iaMyClasses.map(c=>iaEsc(c.nom)).join(', ') : '<i>aucune classe rattachée</i>'}.</p>
      <div id="iaStudentOpts" style="opacity:${iaSettings.ai_students?1:.5};">
        <div style="display:flex;flex-wrap:wrap;gap:6px 18px;">
          ${IA_STUDENT_FEATURES.map(f=>`<label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" class="iaStuFeat" value="${f.key}" ${feats[f.key]?'checked':''} ${hasKey?'':'disabled'} onchange="iaSaveSettings()"> ${f.label}</label>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;">
          <span>Au plus</span>
          <input type="number" id="iaQuota" min="0" max="1000" value="${quota==null?'':quota}" placeholder="∞" style="width:80px;" ${hasKey?'':'disabled'} onchange="iaSaveSettings()">
          <span>utilisations par élève sur 7 jours glissants</span>
          <span class="hint" style="margin:0;">(laisser vide = sans limite)</span>
        </div>
        <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px 18px;">
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="iaMode" value="all" ${selectedMode?'':'checked'} ${hasKey?'':'disabled'} onchange="iaToggleModeUI(); iaSaveSettings()"> <b>Tous</b> les élèves de mes classes</label>
          <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="iaMode" value="selected" ${selectedMode?'checked':''} ${hasKey?'':'disabled'} onchange="iaToggleModeUI(); iaSaveSettings()"> <b>Seulement les élèves que je choisis</b> (ex. ceux qui ont le plus besoin d'aide)</label>
        </div>
        <div id="iaStudentPicker" style="display:${selectedMode?'block':'none'};margin-top:10px;">${iaStudentPickerHtml(hasKey)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:12px;">
        <button class="btn" onclick="iaSaveSettings()" ${hasKey?'':'disabled'}>Enregistrer la sélection d'élèves</button>
        <span class="hint" id="iaSettingsMsg" style="margin:0;"></span>
      </div>
    </div>
    ${oliviaCarteHtml(hasKey, payerLabel)}
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">query_stats</span> 5. Rapport d'utilisation</strong>
      <div class="tool-row" style="margin:8px 0;">
        <select id="iaPeriod" onchange="iaPeriod=this.value; iaLoadReport()">
          <option value="7j">7 derniers jours</option>
          <option value="mois">Ce mois-ci</option>
          <option value="moisprec">Mois précédent</option>
          <option value="30j">30 derniers jours</option>
          <option value="annee">Année scolaire</option>
          <option value="tout">Depuis le début</option>
        </select>
        ${isAdmin ? `<label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><input type="checkbox" id="iaAllSite" ${iaAllSite?'checked':''} onchange="iaAllSite=this.checked; iaLoadReport()"> Tout le site (tous les professeurs)</label>` : ''}
        <button class="btn secondary" onclick="iaExportCsv()"><span class="gicon">download</span> Exporter (tableur)</button>
      </div>
      <div id="iaReport"><p class="hint">Chargement…</p></div>
    </div>
    ${isAdmin ? `<p class="hint" style="margin:0 0 16px;"><span class="gicon">admin_panel_settings</span> Le choix « clé du site / clé personnelle » de chaque professeur se règle dans <a href="#/admin" onclick="event.preventDefault(); showView('view-admin'); setActiveTopnav('admin'); document.querySelector('#adminTabs [data-admin-tab=ia]')?.click();">Administration &gt; IA</a>.</p>` : ''}`;
  document.getElementById('iaPeriod').value = iaPeriod;
  iaCountPicked();
  oliviaCompter();
  iaLoadReport();

}

async function iaSaveKey(){
  const input = document.getElementById('iaKeyInput'), msg = document.getElementById('iaKeyMsg'), btn = document.getElementById('iaKeySaveBtn');
  const key = input.value.trim();
  if(!key){ msg.textContent = 'Collez d\'abord votre clé.'; return; }
  btn.disabled = true; msg.textContent = 'Vérification auprès d\'Anthropic…';
  try{
    await iaProxyAction({action:'set_key', key});
    input.value = '';
    await loadAiAccess();
    await renderIaPage();
    const m = document.getElementById('iaKeyMsg');
    if(m) m.innerHTML = '<span style="color:#1F7A4D;">Clé vérifiée et enregistrée. Activez maintenant l\'IA pour vous et/ou vos élèves.</span>';
  }catch(e){
    msg.innerHTML = '<span style="color:#B3261E;">'+iaEsc(e.message)+'</span>';
  }finally{ btn.disabled = false; }
}
async function iaRemoveKey(){
  const ok = await niceConfirm('Supprimer votre clé ? L\'IA sera aussitôt désactivée pour vous et pour vos élèves.');
  if(!ok) return;
  try{
    await iaProxyAction({action:'remove_key'});
    await loadAiAccess();
    await renderIaPage();
  }catch(e){ await niceAlert('Échec : '+e.message); }
}
/* Enregistrement IMMÉDIAT à chaque changement (signalé : "lorsqu'elle coche Utiliser l'IA dans
   mes outils, ça se décoche tout seul" -- la case n'était enregistrée qu'avec un bouton situé
   plus bas, dans la carte des élèves). Le message s'affiche à côté du réglage modifié. */
let iaSaveSeq = 0;
async function iaSaveSettings(msgId){
  const msg = document.getElementById(msgId||'iaSettingsMsg');
  const seq = ++iaSaveSeq;
  const feats = {};
  document.querySelectorAll('.iaStuFeat').forEach(c=>{ feats[c.value] = c.checked; });
  const qv = document.getElementById('iaQuota').value.trim();
  const quota = qv==='' ? null : Math.max(0, Math.min(1000, parseInt(qv,10)||0));
  const row = {
    ai_self: currentUserRole==='admin' ? true : document.getElementById('iaSelf').checked,
    ai_students: document.getElementById('iaStudents').checked,
    student_features: feats, student_weekly_quota: quota, updated_at: new Date().toISOString(),
    student_mode: (document.querySelector('input[name=iaMode]:checked')||{}).value==='selected' ? 'selected' : 'all',
  };
  msg.textContent = 'Enregistrement…';
  // Pas d'upsert : le client n'a le droit de modifier que ces colonnes (jamais teacher_id ni la clé).
  const { data: existing } = await sb.from('teacher_ai_settings').select('teacher_id').eq('teacher_id', currentUser.id).maybeSingle();
  const { error } = existing
    ? await sb.from('teacher_ai_settings').update(row).eq('teacher_id', currentUser.id)
    : await sb.from('teacher_ai_settings').insert({teacher_id: currentUser.id, ...row});
  if(error){ msg.innerHTML = '<span style="color:#B3261E;">Erreur : '+iaEsc(error.message)+'</span>'; return; }
  // Sélection d'élèves (enregistrée dans tous les cas : on la retrouve si on repasse en mode « choisis »).
  const sel = [];
  document.querySelectorAll('.iaStuPick').forEach(c=>{
    const q = document.querySelector('.iaStuQuota[data-id="'+c.dataset.id+'"]');
    const qv = q ? q.value.trim() : '';
    sel.push({teacher_id: currentUser.id, student_id: c.dataset.id, enabled: c.checked,
              quota: qv==='' ? null : Math.max(0, Math.min(1000, parseInt(qv,10)||0)), updated_at: new Date().toISOString()});
  });
  if(sel.length){
    const { error: e2 } = await sb.from('student_ai_access').upsert(sel, {onConflict:'teacher_id,student_id'});
    if(e2){ msg.innerHTML = '<span style="color:#B3261E;">Réglages enregistrés, mais échec pour la sélection d\'élèves : '+iaEsc(e2.message)+'</span>'; return; }
    sel.forEach(r=>iaStudentAccess.set(r.student_id, r));
  }
  await loadAiAccess();
  if(seq!==iaSaveSeq) return; // un enregistrement plus récent est en cours
  const nSel = sel.filter(r=>r.enabled).length;
  if(msgId==='iaSelfMsg'){ msg.innerHTML = '<span style="color:#1F7A4D;"><span class="gicon">check</span> Enregistré : '+(row.ai_self ? 'les outils IA sont activés pour vous.' : 'les outils IA sont désactivés pour vous.')+'</span>'; return; }
  msg.innerHTML = '<span style="color:#1F7A4D;"><span class="gicon">check</span> Réglages enregistrés'+(row.student_mode==='selected' && row.ai_students ? ' ('+nSel+' élève'+(nSel>1?'s':'')+' autorisé'+(nSel>1?'s':'')+')' : '')+'.</span>';
}

/* ---- Sélection d'élèves (IA au cas par cas) ---- */
function iaStudentPickerHtml(enabled){
  if(!iaStudents.length) return '<p class="hint">Aucun élève dans vos classes.</p>';
  const byClass = new Map();
  iaStudents.forEach(st=>{ if(!byClass.has(st.class_id)) byClass.set(st.class_id, []); byClass.get(st.class_id).push(st); });
  const dis = enabled ? '' : 'disabled';
  return `<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">
      <input type="search" id="iaStuSearch" placeholder="Rechercher un élève…" oninput="iaFilterStudents()" style="min-width:220px;">
      <span class="hint" style="margin:0;" id="iaStuCount"></span>
    </div>
    ${[...byClass.entries()].map(([cid, list])=>`
      <div class="ia-stu-class" style="border:1px solid rgba(28,43,57,.12);border-radius:10px;margin-bottom:10px;overflow:hidden;">
        <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(28,43,57,.04);flex-wrap:wrap;">
          <b>${iaEsc(list[0].classe)}</b>
          <button type="button" class="btn secondary" style="padding:3px 10px;font-size:.78rem;" onclick="iaPickClass('${cid}',true)" ${dis}>Tout cocher</button>
          <button type="button" class="btn secondary" style="padding:3px 10px;font-size:.78rem;" onclick="iaPickClass('${cid}',false)" ${dis}>Tout décocher</button>
        </div>
        <table class="sup-table ia-table" style="margin:0;"><thead><tr><th style="width:40px;">IA</th><th>Élève</th><th>Quota propre (7 j)</th><th>Utilisations (30 j)</th></tr></thead><tbody>
          ${list.map(st=>{ const a = iaStudentAccess.get(st.id); return `<tr class="ia-stu-row" data-name="${iaEsc((st.nom+' '+st.prenom).toLowerCase())}">
            <td><input type="checkbox" class="iaStuPick" data-id="${st.id}" data-class="${cid}" ${a&&a.enabled?'checked':''} ${dis} onchange="iaCountPicked()"></td>
            <td>${iaEsc(st.nom)} ${iaEsc(st.prenom)}</td>
            <td><input type="number" class="iaStuQuota" data-id="${st.id}" min="0" max="1000" value="${a&&a.quota!=null?a.quota:''}" placeholder="général" style="width:80px;" ${dis}></td>
            <td>${iaStudentUse30.get(st.id)||0}</td></tr>`; }).join('')}
        </tbody></table>
      </div>`).join('')}`;
}
function iaToggleModeUI(){
  const sel = (document.querySelector('input[name=iaMode]:checked')||{}).value==='selected';
  const p = document.getElementById('iaStudentPicker'); if(p) p.style.display = sel ? 'block' : 'none';
  iaCountPicked();
}
function iaPickClass(cid, on){ document.querySelectorAll('.iaStuPick[data-class="'+cid+'"]').forEach(c=>{ if(c.closest('tr').style.display!=='none') c.checked = on; }); iaCountPicked(); }
function iaFilterStudents(){
  const q = (document.getElementById('iaStuSearch').value||'').trim().toLowerCase();
  document.querySelectorAll('.ia-stu-row').forEach(tr=>{ tr.style.display = !q || tr.dataset.name.includes(q) ? '' : 'none'; });
}
function iaCountPicked(){
  const el = document.getElementById('iaStuCount'); if(!el) return;
  const n = document.querySelectorAll('.iaStuPick:checked').length, t = document.querySelectorAll('.iaStuPick').length;
  el.textContent = n+' élève'+(n>1?'s':'')+' sur '+t+' autorisé'+(n>1?'s':'');
}

/* ---- Clé de chaque professeur : administrateur (clé du site / de l'établissement / personnelle)
   ou référent (établissement / personnelle, pour les professeurs de son établissement). ---- */
const IA_KEY_MODE_LABELS = {site:'Clé du site', etab:'Clé de l\'établissement', perso:'Clé personnelle'};
async function iaLoadAdminTeachers(boxId){
  const box = document.getElementById(boxId||'adminAiTeachers'); if(!box) return;
  const isAdminUser = currentUserRole==='admin';
  const { data, error } = await sb.rpc('ai_teachers_overview');
  if(error){ box.innerHTML = '<p class="hint">Erreur : '+iaEsc(error.message)+'</p>'; return; }
  const rows = (data||[]).map(t=>{
    const cost = ((t.in_30d||0)*IA_PRICE_IN + (t.out_30d||0)*IA_PRICE_OUT)/1e6;
    const isAdm = t.role==='admin', me = currentUser && t.teacher_id===currentUser.id;
    const siteAllowed = isAdminUser || !!(currentReferentEtab && currentReferentEtab.site_key_allowed);
    const modes = siteAllowed ? ['site','etab','perso'] : ['etab','perso'];
    const modeCell = isAdm ? '<span class="hint">clé du site</span>'
      : (!siteAllowed && t.key_mode==='site') ? '<span class="hint">Clé du site<br>(décidé par l\'administrateur)</span>'
      : `<select onchange="iaSetTeacherKeyMode('${t.teacher_id}', this)" data-prev="${t.key_mode}" style="padding:4px 6px;">${modes.map(m=>`<option value="${m}" ${t.key_mode===m?'selected':''}>${IA_KEY_MODE_LABELS[m]}</option>`).join('')}</select>`;
    const okCell = t.key_ok ? '<span style="color:#1F7A4D;">✓ disponible</span>'
      : t.key_mode==='etab' ? '<span style="color:#B3261E;">clé de l\'établissement non enregistrée</span>'
      : '<span style="color:#B3261E;">aucune clé personnelle</span>';
    return `<tr>
      <td>${iaEsc([t.nom,t.prenom].filter(Boolean).join(' '))}${me?' <span class="hint">(vous)</span>':''}${isAdminUser&&t.uai?'<div class="hint" style="margin:0;">'+iaEsc(t.uai)+'</div>':''}</td>
      <td>${modeCell}</td>
      <td class="ia-keyok">${isAdm ? '<span class="hint">—</span>' : okCell}${t.has_key?' <span class="hint-mono" title="clé personnelle enregistrée : utilisée en mode « clé personnelle », sinon clé de secours si la clé prévue ne suffit plus">(perso …'+iaEsc(t.key_last4||'')+')</span>':''}</td>
      <td>${t.ai_self ? 'oui' : 'non'}</td>
      <td>${t.ai_students ? (t.student_mode==='selected' ? 'élèves choisis' : 'tous') : 'non'}</td>
      <td>${t.calls_30d}</td><td>${t.calls_30d ? iaFmtUsd(cost) : '–'}</td>
    </tr>`;
  });
  box.innerHTML = iaTable(['Professeur','Clé utilisée','État','IA pour lui','IA élèves','Utilisations (30 j)','Coût (30 j)'], rows)
    + '<span class="hint" id="iaAdminMsg" style="display:block;margin-top:6px;min-height:1.2em;"></span>';
}
async function iaSetTeacherKeyMode(teacherId, sel){
  const msg = document.getElementById('iaAdminMsg');
  const mode = sel.value, prev = sel.dataset.prev;
  sel.disabled = true;
  const { error } = await sb.rpc('set_teacher_key_mode', {p_teacher: teacherId, p_mode: mode});
  sel.disabled = false;
  if(error){ sel.value = prev; if(msg) msg.innerHTML = '<span style="color:#B3261E;">Erreur : '+iaEsc(error.message)+'</span>'; return; }
  sel.dataset.prev = mode;
  if(msg) msg.innerHTML = '<span style="color:#1F7A4D;">Enregistré : ce professeur utilise désormais '+({site:'la clé du site',etab:'la clé de l\'établissement',perso:'sa clé personnelle'}[mode])+' (il active lui-même l\'IA dans sa page).</span>';
  iaLoadAdminTeachers('adminAiTeachers');
}

/* ---- Référent : clé IA de l'établissement + rapport de l'établissement (onglet IA de
   « Mon établissement »). ---- */
let iaEtabPeriod = 'mois';
async function iaRenderEtabAiBox(){
  const box = document.getElementById('adminEtabKeyBox'), repBox = document.getElementById('adminEtabReportBox');
  if(!box || !repBox || !currentReferentEtab) return;
  const { data: etab } = await sb.from('etablissements').select('uai,nom,ai_key_last4,ai_key_set_at').eq('uai', currentReferentEtab.uai).maybeSingle();
  const k = etab && etab.ai_key_last4;
  box.innerHTML = `
    <div class="tool-shell" style="margin-bottom:16px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class=gicon>key</span> Clé IA de l'établissement</strong>
      <p class="hint" style="margin:6px 0 8px;max-width:80ch;">La clé Anthropic de votre collège (compte créé et crédité par l'établissement). Les collègues réglés sur « Clé de l'établissement » ci-dessous, et leurs élèves, l'utilisent.</p>
      <div style="margin-bottom:8px;">${k
        ? `<span style="color:#1F7A4D;font-weight:700;"><span class="gicon">check_circle</span> Clé enregistrée</span> <span class="hint-mono">sk-ant-…${iaEsc(k)}</span> <span class="hint">(${etab.ai_key_set_at ? new Date(etab.ai_key_set_at).toLocaleDateString('fr-FR') : ''})</span>`
        : `<span style="color:#B3261E;font-weight:700;"><span class="gicon">block</span> Aucune clé d'établissement enregistrée.</span>`}</div>
      <div class="tool-row" style="margin:0;">
        <input type="password" id="iaEtabKeyInput" placeholder="sk-ant-api03-…" autocomplete="off" style="flex:1;min-width:220px;">
        <button class="btn" id="iaEtabKeyBtn" onclick="iaSaveEtabKey()">${k ? 'Remplacer la clé' : 'Vérifier et enregistrer'}</button>
        ${k ? '<button class="btn secondary" onclick="iaRemoveEtabKey()">Supprimer la clé</button>' : ''}
      </div>
      <span class="hint" id="iaEtabKeyMsg" style="display:block;margin-top:6px;min-height:1.2em;"></span>
      <p class="hint" style="margin:4px 0 0;">Même démarche qu'une clé personnelle (console.anthropic.com : crédits, plafond mensuel, « Create key ») -- la notice détaillée est dans Mon compte &gt; Intelligence artificielle. La clé est vérifiée auprès d'Anthropic puis conservée chiffrée ; personne ne peut la relire.</p>
    </div>`;
  repBox.innerHTML = `
    <div class="tool-shell">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class=gicon>query_stats</span> Rapport IA de l'établissement</strong>
      <div class="tool-row" style="margin:8px 0;">
        <select id="iaEtabPeriod" onchange="iaEtabPeriod=this.value; iaLoadEtabReport()">
          <option value="7j">7 derniers jours</option><option value="mois">Ce mois-ci</option><option value="moisprec">Mois précédent</option>
          <option value="30j">30 derniers jours</option><option value="annee">Année scolaire</option><option value="tout">Depuis le début</option>
        </select>
        <button class="btn secondary" onclick="iaExportCsv()"><span class="gicon">download</span> Exporter (tableur)</button>
      </div>
      <div id="iaEtabReport"><p class="hint">Chargement…</p></div>
    </div>`;
  document.getElementById('iaEtabPeriod').value = iaEtabPeriod;
  iaLoadEtabReport();
}
async function iaLoadEtabReport(){
  const box = document.getElementById('iaEtabReport'); if(!box) return;
  const {from, to} = iaPeriodRange(iaEtabPeriod);
  const { data, error } = await sb.rpc('ai_usage_report', {p_from: from.toISOString(), p_to: to.toISOString(), p_scope: 'etab'});
  if(error){ box.innerHTML = '<p class="hint">Erreur : '+iaEsc(error.message)+'</p>'; return; }
  iaReportRows = data || []; iaPeriod = iaEtabPeriod; // pour l'export tableur
  box.innerHTML = iaReportHtml(iaReportRows, true);
}
async function iaSaveEtabKey(){
  const input = document.getElementById('iaEtabKeyInput'), msg = document.getElementById('iaEtabKeyMsg'), btn = document.getElementById('iaEtabKeyBtn');
  const key = input.value.trim();
  if(!key){ msg.textContent = 'Collez d\'abord la clé de l\'établissement.'; return; }
  btn.disabled = true; msg.textContent = 'Vérification auprès d\'Anthropic…';
  try{
    await iaProxyAction({action:'set_etab_key', key});
    input.value = '';
    await iaRenderEtabAiBox();
    const m = document.getElementById('iaEtabKeyMsg');
    if(m) m.innerHTML = '<span style="color:#1F7A4D;">Clé vérifiée et enregistrée. Choisissez maintenant, ci-dessous, les collègues qui l\'utilisent.</span>';
    iaLoadAdminTeachers('adminAiTeachers');
  }catch(e){ msg.innerHTML = '<span style="color:#B3261E;">'+iaEsc(e.message)+'</span>'; }
  finally{ btn.disabled = false; }
}
async function iaRemoveEtabKey(){
  if(!(await niceConfirm('Supprimer la clé de l\'établissement ? L\'IA s\'arrêtera aussitôt pour les collègues réglés sur « Clé de l\'établissement » et pour leurs élèves.'))) return;
  try{ await iaProxyAction({action:'remove_etab_key'}); await iaRenderEtabAiBox(); iaLoadAdminTeachers('adminAiTeachers'); }
  catch(e){ await niceAlert('Échec : '+e.message); }
}

/* ---- Rapport ---- */
function iaPeriodRange(p){
  const now = new Date(), to = new Date(now.getTime()+24*3600e3);
  let from;
  if(p==='7j') from = new Date(now.getTime()-7*24*3600e3);
  else if(p==='30j') from = new Date(now.getTime()-30*24*3600e3);
  else if(p==='mois') from = new Date(now.getFullYear(), now.getMonth(), 1);
  else if(p==='moisprec'){ from = new Date(now.getFullYear(), now.getMonth()-1, 1); return {from, to:new Date(now.getFullYear(), now.getMonth(), 1)}; }
  else if(p==='annee') from = new Date(now.getMonth()>=7 ? now.getFullYear() : now.getFullYear()-1, 7, 20);
  else from = new Date(2020,0,1);
  return {from, to};
}
async function iaLoadReport(){
  const box = document.getElementById('iaReport');
  if(!box) return;
  box.innerHTML = '<p class="hint">Chargement…</p>';
  const {from, to} = iaPeriodRange(iaPeriod);
  const { data, error } = await sb.rpc('ai_usage_report', {p_from: from.toISOString(), p_to: to.toISOString(), p_scope: iaAllSite ? 'all' : 'me'});
  if(error){ box.innerHTML = '<p class="hint">Erreur : '+iaEsc(error.message)+'</p>'; return; }
  iaReportRows = data || [];
  box.innerHTML = iaReportHtml(iaReportRows);
}
function iaAgg(rows, keyFn){
  const m = new Map();
  rows.forEach(r=>{
    const k = keyFn(r);
    if(!m.has(k)) m.set(k, {key:k, calls:0, cost:0, unknown:0, last:null, rows:[]});
    const a = m.get(k), c = iaCost(r);
    a.calls++; if(c==null) a.unknown++; else a.cost += c;
    if(!a.last || r.created_at>a.last) a.last = r.created_at;
    a.rows.push(r);
  });
  return [...m.values()].sort((x,y)=>y.cost-x.cost || y.calls-x.calls);
}
// Coût d'un agrégat : inconnu ("–") si aucun de ses appels n'a de détail de tokens.
const iaAggCost = a=>a.unknown===a.calls ? null : a.cost;
function iaTable(head, lines){
  if(!lines.length) return '<p class="hint" style="margin:4px 0 0;">Rien sur cette période.</p>';
  return `<div style="overflow-x:auto;"><table class="sup-table ia-table"><thead><tr>${head.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${lines.join('')}</tbody></table></div>`;
}
function iaFmtDate(d, withTime){
  const x = new Date(d);
  return withTime ? x.toLocaleDateString('fr-FR')+' '+x.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) : x.toLocaleDateString('fr-FR');
}
function iaReportHtml(rows, groupMode){
  if(groupMode===undefined) groupMode = iaAllSite;
  const me = currentUser.id;
  const total = iaAgg(rows, ()=>'t')[0] || {calls:0, cost:0, unknown:0};
  const mine = rows.filter(r=>r.user_id===me), stu = rows.filter(r=>r.role==='eleve');
  const cost = arr=>arr.reduce((s,r)=>s+(iaCost(r)||0),0);
  const tile = (label, value, sub)=>`<div class="ia-tile"><div class="ia-tile-v">${value}</div><div class="ia-tile-l">${label}</div>${sub?`<div class="hint" style="margin:2px 0 0;">${sub}</div>`:''}</div>`;
  const tiles = `<div class="ia-tiles">
    ${tile('Utilisations', total.calls)}
    ${tile('Coût estimé', iaFmtUsd(total.cost), total.unknown ? total.unknown+' sans détail de coût' : '')}
    ${tile(groupMode?'Professeurs':'Moi', groupMode ? rows.filter(r=>r.role!=='eleve').length : mine.length, iaFmtUsd(cost(groupMode?rows.filter(r=>r.role!=='eleve'):mine)))}
    ${tile('Élèves', stu.length, iaFmtUsd(cost(stu))+' · '+new Set(stu.map(r=>r.user_id)).size+' élève(s)')}
  </div>`;
  const byFeat = iaAgg(rows, r=>r.feature||'(non précisé)').map(a=>`<tr><td>${iaEsc(IA_FEATURE_LABELS[a.key]||a.key)}</td><td>${a.calls}</td><td>${a.rows.filter(r=>r.role==='eleve').length}</td><td>${iaFmtUsd(iaAggCost(a))}</td><td>${a.calls>a.unknown?iaFmtUsd(a.cost/(a.calls-a.unknown)):'–'}</td></tr>`);
  const byClass = iaAgg(stu, r=>r.classe||'(classe inconnue)').map(a=>`<tr><td>${iaEsc(a.key)}</td><td>${new Set(a.rows.map(r=>r.user_id)).size}</td><td>${a.calls}</td><td>${iaFmtUsd(iaAggCost(a))}</td><td>${iaFmtDate(a.last)}</td></tr>`);
  const byPerson = iaAgg(rows, r=>r.user_id).map(a=>{
    const r = a.rows[0];
    const feats = iaAgg(a.rows, x=>x.feature||'?').map(f=>`${iaEsc(IA_FEATURE_LABELS[f.key]||f.key)} ×${f.calls}`).join(', ');
    return `<tr><td>${iaEsc(iaPersonName(r))}${r.user_id===me?' <span class="hint">(moi)</span>':''}</td><td>${r.role==='eleve'?'Élève':r.role==='admin'?'Admin':'Professeur'}</td><td>${iaEsc(r.classe||'')}</td><td>${a.calls}</td><td>${iaFmtUsd(iaAggCost(a))}</td><td style="font-size:.8rem;">${feats}</td><td>${iaFmtDate(a.last)}</td></tr>`;
  });
  const byDay = iaAgg(rows, r=>r.created_at.slice(0,10)).sort((x,y)=>y.key.localeCompare(x.key)).map(a=>`<tr><td>${iaFmtDate(a.key)}</td><td>${a.calls}</td><td>${a.rows.filter(r=>r.role==='eleve').length}</td><td>${iaFmtUsd(iaAggCost(a))}</td></tr>`);
  const detail = rows.slice(0,300).map(r=>`<tr><td>${iaFmtDate(r.created_at,true)}</td><td>${iaEsc(iaPersonName(r))}</td><td>${iaEsc(r.classe||'')}</td><td>${iaEsc(IA_FEATURE_LABELS[r.feature]||r.feature||'')}</td><td style="font-size:.8rem;">${iaEsc(r.chapitre||r.niveau||'')}</td><td>${r.input_tokens==null?'–':(r.input_tokens+r.output_tokens)}</td><td>${iaFmtUsd(iaCost(r))}</td><td>${r.key_source==='site'?'<span class="hint">site</span>':r.key_source==='etab'?'établissement':'clé perso'}</td></tr>`);
  return `${tiles}
    <p class="hint" style="margin:6px 0 12px;">Coûts estimés d'après le nombre de tokens (${IA_PRICE_IN} $ / ${IA_PRICE_OUT} $ par million de tokens en entrée / sortie), en dollars comme la facturation Anthropic. Le montant exact et le solde restant sont sur <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>.</p>
    <h3 class="ia-sub">Par fonctionnalité</h3>${iaTable(['Fonctionnalité','Utilisations','dont élèves','Coût','Coût moyen'], byFeat)}
    <h3 class="ia-sub">Par classe (élèves)</h3>${iaTable(['Classe','Élèves actifs','Utilisations','Coût','Dernière utilisation'], byClass)}
    <h3 class="ia-sub">Par personne</h3>${iaTable(['Nom','Statut','Classe','Utilisations','Coût','Détail','Dernière utilisation'], byPerson)}
    <h3 class="ia-sub">Par jour</h3>${iaTable(['Jour','Utilisations','dont élèves','Coût'], byDay)}
    <details style="margin-top:10px;"><summary style="cursor:pointer;font-weight:600;">Journal détaillé (${rows.length>300?'300 plus récentes sur '+rows.length:rows.length+' utilisation(s)'})</summary>
      ${iaTable(['Date','Qui','Classe','Fonctionnalité','Chapitre / niveau','Tokens','Coût','Payé par'], detail)}
    </details>`;
}
function iaExportCsv(){
  const rows = iaReportRows||[];
  const head = ['date','nom','prenom','statut','classe','fonctionnalite','chapitre','niveau','tokens_entree','tokens_sortie','cout_usd','paye_par'];
  const q = v=>{ const s = v==null?'':String(v); return /[;"\n]/.test(s) ? '"'+s.replace(/"/g,'""')+'"' : s; };
  const lines = [head.join(';')].concat(rows.map(r=>[
    new Date(r.created_at).toLocaleString('fr-FR'), r.nom, r.prenom, r.role, r.classe, IA_FEATURE_LABELS[r.feature]||r.feature,
    r.chapitre, r.niveau, r.input_tokens, r.output_tokens, iaCost(r)==null?'':iaCost(r).toFixed(5).replace('.',','), r.key_source==='site'?'site':r.key_source==='etab'?'clé de l\'établissement':'clé du professeur',
  ].map(q).join(';')));
  const blob = new Blob(['﻿'+lines.join('\n')], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'rapport-ia-'+iaPeriod+'.csv';
  a.click();
}

/* ---- Oliv'IA (olivia.js) : réglages du professeur et compte rendu des conversations ----
   Demandé : « paramétrable par le prof au niveau de la disponibilité des élèves (on pourrait le
   limiter aux élèves les plus en difficulté) », « élève par élève et/ou remédiation », « le prof
   doit pouvoir avoir un compte-rendu des conversations ». Réglages indépendants des autres outils
   IA : olivia_mode (off / all / selected), olivia_daily_quota, student_ai_access.olivia. */
function oliviaCarteHtml(hasKey, payerLabel){
  const mode = iaSettings.olivia_mode || 'off', q = iaSettings.olivia_daily_quota, dis = hasKey ? '' : 'disabled';
  const byClass = new Map();
  iaStudents.forEach(st=>{ if(!byClass.has(st.class_id)) byClass.set(st.class_id, []); byClass.get(st.class_id).push(st); });
  const cls = new Map(iaMyClasses.map(c=>[c.id, c]));
  // Groupes de remédiation d'abord : c'est le cas d'usage visé (élèves en difficulté).
  const blocs = [...byClass.entries()].sort((a,b)=>(cls.get(b[0])||{}).groupe - (cls.get(a[0])||{}).groupe);
  const picker = !iaStudents.length ? '<p class="hint">Aucun élève dans vos classes.</p>' : blocs.map(([cid, list])=>{ const c = cls.get(cid) || {};
    return `<div class="oliv-bloc">
      <div class="oliv-bloc-tete"><b>${iaEsc(list[0].classe)}</b>${c.groupe ? ' <span class="oliv-tag">groupe de remédiation</span>' : ''}
        <button type="button" class="btn secondary" style="padding:3px 10px;font-size:.78rem;" onclick="oliviaCocherClasse('${cid}',true)" ${dis}>Tout le groupe</button>
        <button type="button" class="btn secondary" style="padding:3px 10px;font-size:.78rem;" onclick="oliviaCocherClasse('${cid}',false)" ${dis}>Personne</button></div>
      <div class="oliv-bloc-eleves">${list.map(st=>{ const a = iaStudentAccess.get(st.id);
        return `<label><input type="checkbox" class="olivPick" data-id="${st.id}" data-class="${cid}" ${a&&a.olivia?'checked':''} ${dis} onchange="oliviaSynchro(this)"> ${iaEsc(st.nom)} ${iaEsc(st.prenom)}</label>`; }).join('')}</div></div>`; }).join('');
  return `<div class="tool-shell ia-card" style="${hasKey?'':'opacity:.55;'}">
    <strong class="ia-h" style="display:flex;align-items:center;gap:8px;"><span class="oliv-carte-avatar">${typeof OLIV_AVATAR!=='undefined'?OLIV_AVATAR:''}</span> 4. Oliv'IA, la petite robote qui aide à apprendre</strong>
    <p class="hint" style="margin:6px 0 8px;">Sur les pages de cours (Cours, Méthodes, Exercices), les élèves autorisés peuvent demander à Oliv'IA une autre explication, un autre exemple ou un coup de pouce pour démarrer un exercice. Elle ne donne pas la réponse des exercices et refuse les questions hors sujet. Ses réponses sont payées par ${payerLabel}.</p>
    <div style="display:flex;flex-wrap:wrap;gap:6px 18px;">
      <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="olivMode" value="off" ${mode==='off'?'checked':''} ${dis} onchange="oliviaModeUI()"> Désactivée</label>
      <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="olivMode" value="all" ${mode==='all'?'checked':''} ${dis} onchange="oliviaModeUI()"> <b>Tous</b> les élèves de mes classes</label>
      <label style="display:flex;align-items:center;gap:6px;"><input type="radio" name="olivMode" value="selected" ${mode==='selected'?'checked':''} ${dis} onchange="oliviaModeUI()"> <b>Seulement les élèves que je choisis</b> (élève par élève ou par groupe de remédiation)</label>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;">
      <span>Au plus</span><input type="number" id="olivQuota" min="0" max="200" value="${q==null?'':q}" placeholder="∞" style="width:80px;" ${dis}><span>questions par élève et par jour</span><span class="hint" style="margin:0;">(vide = sans limite)</span>
    </div>
    <div id="olivPicker" style="display:${mode==='selected'?'block':'none'};margin-top:10px;">
      <p class="hint" style="margin:0 0 6px;" id="olivCompte"></p>${picker}
    </div>
    <div style="display:flex;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap;">
      <button class="btn" onclick="oliviaEnregistrer()" ${dis}>Enregistrer les réglages d'Oliv'IA</button>
      <span class="hint" id="olivMsg" style="margin:0;"></span>
    </div>
    <p class="hint" style="margin:8px 0 0;"><span class="gicon" style="font-size:1rem;vertical-align:middle;">science</span> Pour l'essayer vous-même : ouvrez un chapitre, elle apparaît en bas à droite (si « L'IA pour moi » est activée).</p>
    <details style="margin-top:12px;" ontoggle="if(this.open) oliviaChargerConversations()">
      <summary style="cursor:pointer;font-weight:700;"><span class="gicon" style="vertical-align:middle;">forum</span> Compte rendu des conversations de mes élèves</summary>
      <div class="tool-row" style="margin:8px 0;">
        <select id="olivConvPeriode" onchange="oliviaChargerConversations()"><option value="7">7 derniers jours</option><option value="30">30 derniers jours</option><option value="365">Depuis un an</option></select>
        <input type="search" id="olivConvCherche" placeholder="Élève ou chapitre…" oninput="oliviaAfficherConversations()" style="min-width:200px;">
      </div>
      <div id="olivConv"><p class="hint">Chargement…</p></div>
    </details>
  </div>`;
}
function oliviaModeUI(){
  const m = (document.querySelector('input[name=olivMode]:checked')||{}).value;
  const p = document.getElementById('olivPicker'); if(p) p.style.display = m==='selected' ? 'block' : 'none';
}
// Un même élève peut figurer dans sa classe et dans un groupe : ses cases restent identiques.
function oliviaSynchro(c){ document.querySelectorAll('.olivPick[data-id="'+c.dataset.id+'"]').forEach(x=>{ x.checked = c.checked; }); oliviaCompter(); }
function oliviaCocherClasse(cid, on){ document.querySelectorAll('.olivPick[data-class="'+cid+'"]').forEach(c=>{ c.checked = on; oliviaSynchro(c); }); }
function oliviaCompter(){
  const el = document.getElementById('olivCompte'); if(!el) return;
  const ids = new Set([...document.querySelectorAll('.olivPick:checked')].map(c=>c.dataset.id)), tous = new Set([...document.querySelectorAll('.olivPick')].map(c=>c.dataset.id));
  el.textContent = ids.size+' élève'+(ids.size>1?'s':'')+' sur '+tous.size+' '+(ids.size>1?'ont':'a')+' accès à Oliv\'IA.';
}
async function oliviaEnregistrer(){
  const msg = document.getElementById('olivMsg');
  const mode = (document.querySelector('input[name=olivMode]:checked')||{}).value || 'off';
  const qv = document.getElementById('olivQuota').value.trim();
  const row = { olivia_mode: mode, olivia_daily_quota: qv==='' ? null : Math.max(0, Math.min(200, parseInt(qv,10)||0)), updated_at: new Date().toISOString() };
  msg.textContent = 'Enregistrement…';
  const { data: existing } = await sb.from('teacher_ai_settings').select('teacher_id').eq('teacher_id', currentUser.id).maybeSingle();
  const { error } = existing
    ? await sb.from('teacher_ai_settings').update(row).eq('teacher_id', currentUser.id)
    : await sb.from('teacher_ai_settings').insert({teacher_id: currentUser.id, ...row});
  if(error){ msg.innerHTML = '<span style="color:#B3261E;">Erreur : '+iaEsc(error.message)+'</span>'; return; }
  const parEleve = new Map();
  document.querySelectorAll('.olivPick').forEach(c=>{ parEleve.set(c.dataset.id, (parEleve.get(c.dataset.id)||false) || c.checked); });
  const sel = [...parEleve.entries()].map(([id, on])=>({teacher_id: currentUser.id, student_id: id, olivia: on, updated_at: new Date().toISOString()}));
  if(sel.length){
    const { error: e2 } = await sb.from('student_ai_access').upsert(sel, {onConflict:'teacher_id,student_id'});
    if(e2){ msg.innerHTML = '<span style="color:#B3261E;">Réglages enregistrés, mais échec pour les élèves choisis : '+iaEsc(e2.message)+'</span>'; return; }
    sel.forEach(r=>iaStudentAccess.set(r.student_id, Object.assign({}, iaStudentAccess.get(r.student_id)||{}, r)));
  }
  Object.assign(iaSettings, row);
  const n = sel.filter(r=>r.olivia).length;
  msg.innerHTML = '<span style="color:#1F7A4D;"><span class="gicon">check</span> '+(mode==='off' ? 'Oliv\'IA est désactivée pour vos élèves.' : mode==='all' ? 'Oliv\'IA est ouverte à tous vos élèves.' : 'Oliv\'IA est ouverte à '+n+' élève'+(n>1?'s':'')+'.')+'</span>';
}
let oliviaConvLignes = [];
async function oliviaChargerConversations(){
  const box = document.getElementById('olivConv'); if(!box) return;
  box.innerHTML = '<p class="hint">Chargement…</p>';
  const jours = parseInt((document.getElementById('olivConvPeriode')||{}).value||'7', 10);
  const { data, error } = await sb.from('olivia_messages').select('conversation_id,student_id,class_id,niveau,chapitre,onglet,question,reponse,created_at')
    .eq('teacher_id', currentUser.id).gte('created_at', new Date(Date.now()-jours*24*3600e3).toISOString()).order('created_at', {ascending:true}).limit(1000);
  if(error){ box.innerHTML = '<p class="hint">Erreur : '+iaEsc(error.message)+'</p>'; return; }
  oliviaConvLignes = data || [];
  oliviaAfficherConversations();
}
function oliviaAfficherConversations(){
  const box = document.getElementById('olivConv'); if(!box) return;
  const noms = new Map(iaStudents.map(s=>[s.id, s]));
  const nom = id => { const s = noms.get(id); return s ? s.nom+' '+s.prenom : (id===currentUser.id ? 'Vous (essai)' : 'Élève'); };
  const f = ((document.getElementById('olivConvCherche')||{}).value||'').trim().toLowerCase();
  // Regroupement : élève → conversations (une par chapitre ouvert), dans l'ordre des échanges.
  const parEleve = new Map();
  oliviaConvLignes.forEach(l=>{
    const n = nom(l.student_id);
    if(f && !(n+' '+(l.chapitre||'')).toLowerCase().includes(f)) return;
    if(!parEleve.has(l.student_id)) parEleve.set(l.student_id, new Map());
    const convs = parEleve.get(l.student_id);
    if(!convs.has(l.conversation_id)) convs.set(l.conversation_id, []);
    convs.get(l.conversation_id).push(l);
  });
  if(!parEleve.size){ box.innerHTML = '<p class="hint">Aucune conversation sur cette période.</p>'; return; }
  const fmt = t => typeof oliviaFormat==='function' ? oliviaFormat(t) : iaEsc(t);
  box.innerHTML = [...parEleve.entries()].sort((a,b)=>nom(a[0]).localeCompare(nom(b[0]))).map(([sid, convs])=>{
    const nbQ = [...convs.values()].reduce((s,c)=>s+c.length, 0);
    return `<details class="oliv-conv-eleve"><summary><b>${iaEsc(nom(sid))}</b> <span class="hint" style="margin:0;">${noms.get(sid) ? iaEsc(noms.get(sid).classe) + ' · ' : ''}${nbQ} question${nbQ>1?'s':''} · ${convs.size} conversation${convs.size>1?'s':''}</span></summary>
      ${[...convs.values()].reverse().map(c=>`<div class="oliv-conv">
        <div class="oliv-conv-tete">${iaEsc(c[0].niveau||'')} · <b>${iaEsc(c[0].chapitre||'?')}</b> · ${new Date(c[0].created_at).toLocaleString('fr-FR',{dateStyle:'short',timeStyle:'short'})} · ${c.length} question${c.length>1?'s':''}</div>
        ${c.map(l=>`<div class="oliv-msg eleve"><div class="oliv-txt">${iaEsc(l.question).replace(/\n/g,'<br>')}</div></div><div class="oliv-msg oliv"><div class="oliv-txt">${fmt(l.reponse)}</div></div>`).join('')}
      </div>`).join('')}</details>`; }).join('');
}

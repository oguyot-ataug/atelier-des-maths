/* =====================================================================
   ADMIN.JS — Panneau Administration (L'Atelier des Maths)
   Extrait de index.html (markup) et app.js (logique) pour alléger ces
   deux fichiers. Suit le même pattern que les fichiers de chapitres :
   injection du HTML via innerHTML dans un conteneur vide de index.html,
   chargé en <script defer> APRÈS app.js (dont ce fichier dépend : sb,
   currentUser, escapeHtml, toAuthEmail, SUPABASE_URL, loadMyClasses,
   populateAccountClassList, applyClassSelection, currentClassId,
   accountClassesList).
   ===================================================================== */

document.getElementById('view-admin').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;"><span class=gicon>build</span> Administration</h1>
  <p style="color:var(--ink-soft);max-width:70ch;">Gestion des comptes, des classes, et des signalements.</p>

  <div class="tabs" id="adminTabs">
    <button class="tab-btn active" data-admin-tab="comptes">Comptes &amp; classes</button>
    <button class="tab-btn" data-admin-tab="inscriptions"><span class=gicon>edit_note</span> Inscriptions</button>
    <button class="tab-btn" data-admin-tab="listing"><span class=gicon>assignment</span> Déjà enregistré</button>
    <button class="tab-btn" data-admin-tab="signalements"><span class=gicon>bug_report</span> Signalements</button>
  </div>

  <div class="tab-panel active" id="admin-panel-comptes">
    <div class="tool-shell">
      <p style="color:var(--ink-soft);max-width:70ch;margin:0 0 14px;">Créez les comptes profs/élèves, les classes, et associez-les entre eux.</p>
      <p class="example-title" style="margin-bottom:6px;">Créer un compte</p>
      <div class="tool-row">
        <input type="text" id="adminNewEmail" placeholder="identifiant (ou e-mail)" style="min-width:200px;">
        <input type="password" id="adminNewPassword" placeholder="Mot de passe" style="width:150px;">
        <input type="text" id="adminNewNom" placeholder="Nom (affichage)" style="width:160px;">
        <input type="text" id="adminNewUai" placeholder="UAI établissement (ex. 0751234A)" style="width:170px;">
        <select id="adminNewRole"><option value="prof">Professeur</option><option value="eleve">Élève</option><option value="admin">Administrateur</option></select>
        <button class="btn" onclick="adminCreateAccount()">Créer le compte</button>
      </div>
      <span class="hint" id="adminAccountStatus" style="margin:0;"></span>

      <p class="example-title" style="margin:16px 0 6px;">Import en masse d'élèves</p>
      <p class="hint" style="margin:0 0 8px;">Collez une liste (une ligne par élève, 5 colonnes séparées par une tabulation : Nom Prénom, identifiant, mot de passe, UAI, classe -- un copier-coller direct depuis un tableur fonctionne). La classe est créée automatiquement si elle n'existe pas encore (niveau déduit du préfixe "6e"/"5e" du nom).</p>
      <textarea id="adminBulkStudents" rows="6" style="width:100%;font-family:'JetBrains Mono',monospace;font-size:.85rem;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);" placeholder="DUPONT Jean	jdupont	Motdepasse1	0123456A	6eA
MARTIN Marie	mmartin	Motdepasse2	0123456A	6eA"></textarea>
      <div class="tool-row" style="margin-top:8px;">
        <button class="btn" onclick="adminBulkCreateStudents()">Créer tous les comptes élèves</button>
      </div>
      <div class="hint" id="adminBulkStatus" style="margin:0;"></div>

      <p class="example-title" style="margin:16px 0 6px;">Créer une classe</p>
      <div class="tool-row">
        <input type="text" id="adminNewClassNom" placeholder="Nom (ex. 5e-A)">
        <select id="adminNewClassNiveau"><option value="6e">6e</option><option value="5e" selected>5e</option></select>
        <input type="text" id="adminNewClassUai" placeholder="UAI de l'établissement">
        <button class="btn" onclick="adminCreateClass()">Créer la classe</button>
      </div>
      <p class="hint" style="margin:2px 0 0;">Une classe doit être rattachée à un établissement (UAI) -- créé automatiquement s'il n'existe pas encore.</p>
      <span class="hint" id="adminClassStatus" style="margin:0;"></span>

      <p class="example-title" style="margin:16px 0 6px;">Associer un professeur à une classe</p>
      <div class="tool-row">
        <select id="adminAssignTeacherSelect"></select>
        <select id="adminAssignTeacherClassSelect"></select>
        <button class="btn secondary" onclick="adminAssignTeacher()">Associer</button>
      </div>
      <span class="hint" id="adminAssignTeacherStatus" style="margin:0;"></span>

      <p class="example-title" style="margin:16px 0 6px;">Associer un élève à une classe</p>
      <div class="tool-row">
        <select id="adminAssignStudentSelect"></select>
        <select id="adminAssignStudentClassSelect"></select>
        <button class="btn secondary" onclick="adminAssignStudent()">Associer</button>
      </div>
      <span class="hint" id="adminAssignStudentStatus" style="margin:0;"></span>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-inscriptions">
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshSignupRequests()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="hint" style="margin:6px 0 14px;clear:right;">Demandes d'inscription des professeurs (adresse académique + UAI vérifiés côté formulaire, à valider ici avant activation).</p>
      <div id="adminSignupRequestsListing" class="hint">Chargement…</div>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-listing">
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshListings()"><span class=gicon>refresh</span> Actualiser</button>
      <button class="btn secondary" style="float:right;margin-right:8px;" onclick="adminSyncEmails()">🔧 Réparer les identifiants manquants</button>
      <p class="hint" id="adminSyncEmailsStatus" style="clear:right;margin:0 0 6px;"></p>
      <p class="example-title" style="margin:16px 0 6px;">Comptes</p>
      <div class="tool-row" style="margin-bottom:8px;flex-wrap:wrap;">
        <input type="text" id="adminAccFilterSearch" placeholder="Rechercher (nom, identifiant)" style="width:200px;" oninput="adminRenderAccountsListing()">
        <select id="adminAccFilterRole" onchange="adminRenderAccountsListing()">
          <option value="">Tous les rôles</option>
          <option value="prof">Profs</option>
          <option value="admin">Admins</option>
          <option value="eleve">Élèves</option>
        </select>
        <select id="adminAccFilterClasse" onchange="adminRenderAccountsListing()"><option value="">Toutes les classes</option></select>
        <select id="adminAccFilterUai" onchange="adminRenderAccountsListing()"><option value="">Tous les établissements</option></select>
        <button class="btn secondary" onclick="adminResetAccountsFilters()">Réinitialiser les filtres</button>
      </div>
      <div class="tool-row" style="margin-bottom:8px;align-items:center;">
        <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><input type="checkbox" id="adminAccSelectAll" onchange="adminToggleSelectAllAccounts(this.checked)"> Tout sélectionner (visibles)</label>
        <button class="btn secondary" style="color:#a83c1f;" onclick="adminDeleteSelectedAccounts()"><span class=gicon>delete</span> Supprimer la sélection</button>
        <span class="hint" id="adminAccBulkStatus" style="margin:0;"></span>
      </div>
      <div id="adminAccountsListing" class="hint"></div>
      <p class="example-title" style="margin:16px 0 6px;">Classes</p>
      <div id="adminClassesListing" class="hint"></div>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-signalements">
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshBugReports()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="hint" style="margin:6px 0 14px;">Signalements envoyés par les profs depuis le menu de leur compte.</p>
      <div id="adminBugReportsListing" class="hint">Chargement…</div>
    </div>
  </div>`;

/* Onglets de l'Administration : composant local et indépendant, avec ses
   propres data-attributes (data-admin-tab) et son propre gestionnaire de
   clic. Volontairement pas branché sur le mécanisme d'onglets des chapitres
   (.tab-btn / data-tab géré par un unique addEventListener global dans
   app.js, qui ne cible que les boutons présents au chargement initial et
   suppose des ids "panel-<tab>") : réutiliser le même système ferait
   dépendre l'admin d'un mécanisme couplé aux chapitres, pour un gain nul
   puisque de toute façon les boutons injectés ici après coup n'auraient
   pas hérité de ce gestionnaire. Seules les classes .tabs/.tab-btn/.tab-panel
   sont réutilisées, pour le style visuel uniquement. */
document.querySelectorAll('#adminTabs .tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('admin-panel-'+btn.dataset.adminTab).classList.add('active');
  });
});

document.body.insertAdjacentHTML('beforeend', `
<div id="editProfModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeEditProfModal();">
  <div class="modal-card" style="max-width:520px;max-height:86vh;overflow:auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.15rem;"><span class=gicon>build</span> Modifier le compte</strong>
      <button class="modal-close" onclick="closeEditProfModal()"><span class=gicon>close</span></button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
      <label class="hint" style="margin:0;">Nom
        <input type="text" id="editProfNom" style="width:100%;margin-top:4px;padding:8px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;">
      </label>
      <label class="hint" style="margin:0;">Prénom
        <input type="text" id="editProfPrenom" style="width:100%;margin-top:4px;padding:8px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;">
      </label>
    </div>
    <div style="background:rgba(28,43,57,.03);border-radius:10px;padding:12px 14px;margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <span>Identifiant : <b id="editProfIdentifiantDisplay" style="font-family:'JetBrains Mono',monospace;"></b></span>
        <button class="btn secondary" style="font-size:.78rem;padding:4px 10px;" onclick="adminChangeIdentifiantPrompt(editProfTargetId, editProfTargetName)"><span class=gicon>edit</span> Modifier</button>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
        <span>Mot de passe : <b style="letter-spacing:2px;">••••••••</b></span>
        <button class="btn secondary" style="font-size:.78rem;padding:4px 10px;" onclick="adminResetPasswordPrompt(editProfTargetId, editProfTargetName)"><span class=gicon>key</span> Réinitialiser</button>
      </div>
    </div>
    <label class="hint" style="margin:0;display:block;margin-bottom:14px;">UAI de l'établissement
      <input type="text" id="editProfUai" placeholder="ex. 0751234A" style="width:100%;margin-top:4px;padding:8px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;">
    </label>
    <p class="hint" style="margin:0 0 6px;">Classes rattachées (établissement) :</p>
    <div id="editProfClassesList" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;max-height:160px;overflow:auto;"></div>
    <div style="display:flex;justify-content:flex-end;gap:8px;">
      <span class="hint" id="editProfStatus" style="margin:auto 8px auto 0;"></span>
      <button class="btn secondary" onclick="closeEditProfModal()">Annuler</button>
      <button class="btn" onclick="saveEditProfModal()">Enregistrer</button>
    </div>
  </div>
</div>
<div id="resetPasswordModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeResetPasswordModal();">
  <div class="modal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Réinitialiser le mot de passe</strong>
      <button class="modal-close" onclick="closeResetPasswordModal()"><span class=gicon>close</span></button>
    </div>
    <p class="hint" id="resetPasswordModalName" style="margin:0 0 10px;"></p>
    <input type="password" id="resetPasswordModalInput" placeholder="Nouveau mot de passe" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);margin-bottom:10px;box-sizing:border-box;">
    <button class="btn" style="width:100%;" onclick="adminConfirmResetPassword()">Réinitialiser</button>
    <span class="hint" id="resetPasswordModalStatus" style="display:block;margin-top:8px;"></span>
  </div>
</div>

<div id="changeIdentifiantModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeChangeIdentifiantModal();">
  <div class="modal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Modifier l'identifiant</strong>
      <button class="modal-close" onclick="closeChangeIdentifiantModal()"><span class=gicon>close</span></button>
    </div>
    <p class="hint" id="changeIdentifiantModalName" style="margin:0 0 10px;"></p>
    <input type="text" id="changeIdentifiantModalInput" placeholder="Nouvel identifiant (ou e-mail)" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);margin-bottom:10px;box-sizing:border-box;">
    <button class="btn" style="width:100%;" onclick="adminConfirmChangeIdentifiant()">Modifier</button>
    <span class="hint" id="changeIdentifiantModalStatus" style="display:block;margin-top:8px;"></span>
  </div>
</div>

<div id="changeCategoryModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeChangeCategoryModal();">
  <div class="modal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Modifier la catégorie</strong>
      <button class="modal-close" onclick="closeChangeCategoryModal()"><span class=gicon>close</span></button>
    </div>
    <p class="hint" id="changeCategoryModalName" style="margin:0 0 10px;"></p>
    <select id="changeCategoryModalSelect" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);margin-bottom:10px;">
      <option value="trial">Essai (15 jours)</option>
      <option value="active">Actif -- inscrit sur l'année (sans frais)</option>
      <option value="expired">Expiré</option>
    </select>
    <p class="hint" style="margin:0 0 4px;">Date d'échéance (facultative -- 1 an à partir d'aujourd'hui si laissée vide pour "Actif") :</p>
    <input type="date" id="changeCategoryModalDate" style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);margin-bottom:10px;box-sizing:border-box;">
    <button class="btn" style="width:100%;" onclick="adminConfirmChangeCategory()">Enregistrer</button>
    <span class="hint" id="changeCategoryModalMsg" style="display:block;margin-top:8px;"></span>
  </div>
</div>`);

/* ================= PANNEAU ADMINISTRATEUR ================= */
async function adminCreateAccount(){
  const identifiant = document.getElementById('adminNewEmail').value.trim();
  const password = document.getElementById('adminNewPassword').value;
  const nom = document.getElementById('adminNewNom').value.trim();
  const uai = document.getElementById('adminNewUai').value.trim();
  const role = document.getElementById('adminNewRole').value;
  const status = document.getElementById('adminAccountStatus');
  if(!identifiant || !password){ status.textContent = 'Identifiant et mot de passe requis.'; return; }
  const email = toAuthEmail(identifiant);
  status.textContent = 'Création en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ email, password, role, nom: nom || identifiant }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    if(uai){
      // L'UAI n'est pas géré par la fonction de création de compte : on le renseigne à part,
      // juste après, en retrouvant le profil fraîchement créé par son e-mail.
      const { data: prof } = await sb.from('profiles').select('id').eq('email', email).single();
      if(prof) await sb.from('profiles').update({uai}).eq('id', prof.id);
    }
    status.textContent = '✓ Compte créé ('+role+').';
    document.getElementById('adminNewEmail').value=''; document.getElementById('adminNewPassword').value=''; document.getElementById('adminNewNom').value=''; document.getElementById('adminNewUai').value='';
    await adminRefreshDropdowns();
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
let resetPasswordTargetUserId = null;
let editProfTargetId = null, editProfTargetName = '';
async function openEditProfModal(id){
  editProfTargetId = id;
  document.getElementById('editProfModalOverlay').style.display='flex';
  document.getElementById('editProfStatus').textContent = '';
  document.getElementById('editProfClassesList').innerHTML = 'Chargement…';
  const { data: prof, error } = await sb.from('profiles').select('*').eq('id', id).single();
  if(error){ document.getElementById('editProfStatus').textContent = 'Erreur : '+error.message; return; }
  editProfTargetName = (prof.nom||prof.email||'').replace(/'/g,"\\'");
  document.getElementById('editProfNom').value = prof.nom||'';
  document.getElementById('editProfPrenom').value = prof.prenom||'';
  document.getElementById('editProfUai').value = prof.uai||'';
  const loginIdentifiant = prof.email ? (prof.email.endsWith('@mathcollege.local') ? prof.email.slice(0, -('@mathcollege.local'.length)) : prof.email) : '(inconnu)';
  document.getElementById('editProfIdentifiantDisplay').textContent = loginIdentifiant;
  await renderEditProfClasses(prof);
}
/* Classes "de l'établissement" : celles enseignées par au moins un collègue partageant le même
   UAI que ce prof (à défaut d'UAI renseigné, on affiche toutes les classes). Coche celles déjà
   liées à CE prof précisément. */
async function renderEditProfClasses(prof){
  const box = document.getElementById('editProfClassesList');
  const { data: allClasses } = await sb.from('classes').select('id,nom,niveau').order('nom');
  const { data: myLinks } = await sb.from('class_teachers').select('class_id').eq('teacher_id', prof.id);
  const myClassIds = new Set((myLinks||[]).map(l=>l.class_id));
  let relevantClassIds = null; // null = pas de filtre (toutes les classes)
  if(prof.uai){
    const { data: colleagues } = await sb.from('profiles').select('id').eq('uai', prof.uai).in('role',['prof','admin']);
    const colleagueIds = (colleagues||[]).map(c=>c.id);
    if(colleagueIds.length){
      const { data: links } = await sb.from('class_teachers').select('class_id').in('teacher_id', colleagueIds);
      relevantClassIds = new Set((links||[]).map(l=>l.class_id));
      myClassIds.forEach(id=>relevantClassIds.add(id)); // garder aussi ses classes actuelles, même si isolées
    }
  }
  const classes = relevantClassIds ? (allClasses||[]).filter(c=>relevantClassIds.has(c.id)) : (allClasses||[]);
  if(!classes.length){ box.innerHTML = '<span class="hint">Aucune classe trouvée.</span>'; return; }
  box.innerHTML = classes.map(c=>`
    <label style="display:inline-flex;align-items:center;gap:5px;background:rgba(28,43,57,.04);padding:5px 10px;border-radius:20px;font-size:.85rem;cursor:pointer;">
      <input type="checkbox" class="editProfClassCheck" value="${c.id}" ${myClassIds.has(c.id)?'checked':''}> ${escapeHtml(c.nom)} (${escapeHtml(c.niveau)})
    </label>
  `).join('');
}
function closeEditProfModal(){ document.getElementById('editProfModalOverlay').style.display='none'; }
async function saveEditProfModal(){
  const status = document.getElementById('editProfStatus');
  status.textContent = 'Enregistrement…';
  const nom = document.getElementById('editProfNom').value.trim();
  const prenom = document.getElementById('editProfPrenom').value.trim();
  const uai = document.getElementById('editProfUai').value.trim();
  const { error } = await sb.from('profiles').update({nom, prenom, uai: uai||null}).eq('id', editProfTargetId);
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  // Classes cochées/décochées : on aligne class_teachers sur l'état actuel des cases.
  const checked = new Set(Array.from(document.querySelectorAll('.editProfClassCheck:checked')).map(el=>el.value));
  const all = Array.from(document.querySelectorAll('.editProfClassCheck')).map(el=>el.value);
  const { data: myLinks } = await sb.from('class_teachers').select('class_id').eq('teacher_id', editProfTargetId);
  const current = new Set((myLinks||[]).map(l=>l.class_id));
  const toAdd = all.filter(id=>checked.has(id) && !current.has(id));
  const toRemove = all.filter(id=>!checked.has(id) && current.has(id));
  if(toAdd.length) await sb.from('class_teachers').insert(toAdd.map(class_id=>({class_id, teacher_id: editProfTargetId})));
  if(toRemove.length) await sb.from('class_teachers').delete().eq('teacher_id', editProfTargetId).in('class_id', toRemove);
  status.textContent = '✓ Enregistré';
  await adminRefreshListings();
  setTimeout(closeEditProfModal, 600);
}
function adminResetPasswordPrompt(userId, name){
  resetPasswordTargetUserId = userId;
  document.getElementById('resetPasswordModalName').textContent = 'Compte : '+name;
  document.getElementById('resetPasswordModalInput').value = '';
  document.getElementById('resetPasswordModalStatus').textContent = '';
  document.getElementById('resetPasswordModalOverlay').style.display='flex';
}
function closeResetPasswordModal(){
  document.getElementById('resetPasswordModalOverlay').style.display='none';
}
async function adminConfirmResetPassword(){
  const newPassword = document.getElementById('resetPasswordModalInput').value;
  const status = document.getElementById('resetPasswordModalStatus');
  if(!newPassword || newPassword.length<6){ status.textContent = 'Mot de passe trop court (6 caractères minimum).'; return; }
  status.textContent = 'En cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'reset-password', userId: resetPasswordTargetUserId, newPassword }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = '✓ Mot de passe réinitialisé.';
    setTimeout(closeResetPasswordModal, 1200);
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
let changeIdentifiantTargetUserId = null;
function adminChangeIdentifiantPrompt(userId, name){
  changeIdentifiantTargetUserId = userId;
  document.getElementById('changeIdentifiantModalName').textContent = 'Compte : '+name;
  document.getElementById('changeIdentifiantModalInput').value = '';
  document.getElementById('changeIdentifiantModalStatus').textContent = '';
  document.getElementById('changeIdentifiantModalOverlay').style.display='flex';
}
function closeChangeIdentifiantModal(){
  document.getElementById('changeIdentifiantModalOverlay').style.display='none';
}
let changeCategoryTargetUserId = null;
/* Permet à l'administrateur de changer la catégorie d'abonnement d'un prof (essai / actif /
   expiré) directement, sans passer par Stripe -- donc sans frais (signalé : "permettre à
   l'administrateur de le changer de catégorie sans frais"). */
async function adminChangeCategoryPrompt(userId, name){
  changeCategoryTargetUserId = userId;
  document.getElementById('changeCategoryModalName').textContent = 'Compte : '+name;
  document.getElementById('changeCategoryModalMsg').textContent = '';
  const { data: prof } = await sb.from('profiles').select('subscription_status,subscription_expires_at').eq('id', userId).single();
  document.getElementById('changeCategoryModalSelect').value = (prof && prof.subscription_status) || 'trial';
  document.getElementById('changeCategoryModalDate').value = (prof && prof.subscription_expires_at) ? prof.subscription_expires_at.slice(0,10) : '';
  document.getElementById('changeCategoryModalOverlay').style.display='flex';
}
function closeChangeCategoryModal(){
  document.getElementById('changeCategoryModalOverlay').style.display='none';
}
async function adminConfirmChangeCategory(){
  const status = document.getElementById('changeCategoryModalMsg');
  const newStatus = document.getElementById('changeCategoryModalSelect').value;
  let dateStr = document.getElementById('changeCategoryModalDate').value;
  if(!dateStr && newStatus==='active'){
    const oneYear = new Date(); oneYear.setFullYear(oneYear.getFullYear()+1);
    dateStr = oneYear.toISOString().slice(0,10);
  }
  status.textContent = 'Enregistrement…';
  const { error } = await sb.from('profiles').update({
    subscription_status: newStatus,
    subscription_expires_at: dateStr ? new Date(dateStr).toISOString() : null,
  }).eq('id', changeCategoryTargetUserId);
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  status.textContent = '✓ Catégorie mise à jour.';
  await adminRefreshListings();
  setTimeout(closeChangeCategoryModal, 900);
}
async function adminConfirmChangeIdentifiant(){
  const raw = document.getElementById('changeIdentifiantModalInput').value.trim();
  const status = document.getElementById('changeIdentifiantModalStatus');
  if(!raw){ status.textContent = 'Entrez un identifiant.'; return; }
  const newEmail = toAuthEmail(raw);
  status.textContent = 'En cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'update-email', userId: changeIdentifiantTargetUserId, newEmail }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = '✓ Identifiant modifié.';
    await adminRefreshListings();
    setTimeout(closeChangeIdentifiantModal, 1200);
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
async function adminDeleteUser(userId, btn){
  if(btn.dataset.armed!=='1'){
    btn.dataset.armed='1';
    btn.dataset.origText = btn.textContent;
    btn.textContent = 'Confirmer ?';
    setTimeout(()=>{ if(btn.isConnected){ btn.dataset.armed=''; btn.textContent=btn.dataset.origText; } }, 2500);
    return;
  }
  btn.disabled = true;
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'delete', userId }),
    });
    const data = await res.json();
    if(data.error){ await niceAlert("Erreur : "+data.error); btn.disabled=false; return; }
    await adminRefreshDropdowns();
  }catch(err){ await niceAlert('Erreur réseau : '+err.message); btn.disabled=false; }
}
async function adminSyncEmails(){
  const status = document.getElementById('adminSyncEmailsStatus');
  status.textContent = 'Réparation en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'sync-emails' }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = `✓ ${data.updated} identifiant(s) mis à jour.`;
    await adminRefreshListings();
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
async function adminCreateClass(){
  const nom = document.getElementById('adminNewClassNom').value.trim();
  const niveau = document.getElementById('adminNewClassNiveau').value;
  const uai = document.getElementById('adminNewClassUai').value.trim();
  const status = document.getElementById('adminClassStatus');
  if(!nom){ status.textContent = 'Le nom est requis.'; return; }
  if(!uai){ status.textContent = "L'UAI de l'établissement est requis (une classe doit être rattachée à un établissement)."; return; }
  // L'établissement doit exister AVANT la classe (classes.uai référence etablissements.uai).
  const { data: existingEtab } = await sb.from('etablissements').select('uai').eq('uai', uai).maybeSingle();
  if(!existingEtab){
    const { error: etabErr } = await sb.from('etablissements').insert({ uai, nom: 'Établissement '+uai });
    if(etabErr){ status.textContent = "Erreur (établissement) : "+etabErr.message; return; }
  }
  const { error } = await sb.from('classes').insert({ nom, niveau, uai });
  status.textContent = error ? "Erreur : "+error.message : '✓ Classe créée.';
  if(!error){ document.getElementById('adminNewClassNom').value=''; document.getElementById('adminNewClassUai').value=''; await adminRefreshDropdowns(); await loadMyClasses(); }
}
async function adminUpdateClassNiveauUai(classId){
  const niveau = document.getElementById('classNiveau_'+classId).value;
  const uai = document.getElementById('classUai_'+classId).value.trim();
  const status = document.getElementById('classSaveStatus_'+classId);
  if(uai){
    // L'établissement doit exister AVANT la classe (classes.uai référence etablissements.uai).
    const { data: existingEtab } = await sb.from('etablissements').select('uai').eq('uai', uai).maybeSingle();
    if(!existingEtab){
      const { error: etabErr } = await sb.from('etablissements').insert({ uai, nom: 'Établissement '+uai });
      if(etabErr){ status.textContent = "Erreur (établissement) : "+etabErr.message; return; }
    }
  }
  const { error } = await sb.from('classes').update({ niveau, uai: uai||null }).eq('id', classId);
  status.textContent = error ? "Erreur : "+error.message : '✓ Enregistré';
  if(!error) setTimeout(()=>{ status.textContent=''; }, 2500);
}
async function adminRemoveTeacherFromClass(teacherId, classId){
  if(!(await niceConfirm('Retirer ce professeur de cette classe ?'))) return;
  const { error } = await sb.from('class_teachers').delete().eq('teacher_id', teacherId).eq('class_id', classId);
  if(error){ alert("Erreur : "+error.message); return; }
  await adminRefreshListings();
}
function adminResetAccountsFilters(){
  document.getElementById('adminAccFilterSearch').value = '';
  document.getElementById('adminAccFilterRole').value = '';
  document.getElementById('adminAccFilterClasse').value = '';
  document.getElementById('adminAccFilterUai').value = '';
  adminRenderAccountsListing();
}
function adminRenderAccountsListing(){
  const accEl = document.getElementById('adminAccountsListing');
  if(!accEl) return;
  const { profs, eleves, lastLoginMap, classesList, classTeachers, classStudents } = adminAccountsCache;
  // Construit, pour chaque profil, la liste de ses classes (via class_teachers pour un
  // prof, class_students pour un élève) et des UAI correspondants -- nécessaire pour filtrer
  // par classe/établissement, qui ne sont pas des colonnes directes de profiles.
  const classById = new Map(classesList.map(c=>[c.id, c]));
  const teacherClassIds = new Map(); // teacher_id -> [class_id...]
  classTeachers.forEach(r=>{ if(!teacherClassIds.has(r.teacher_id)) teacherClassIds.set(r.teacher_id, []); teacherClassIds.get(r.teacher_id).push(r.class_id); });
  const studentClassIds = new Map(); // student_id -> [class_id...]
  classStudents.forEach(r=>{ if(!studentClassIds.has(r.student_id)) studentClassIds.set(r.student_id, []); studentClassIds.get(r.student_id).push(r.class_id); });
  const classIdsOf = p => p.role==='eleve' ? (studentClassIds.get(p.id)||[]) : (teacherClassIds.get(p.id)||[]);
  const uaisOf = p => Array.from(new Set(classIdsOf(p).map(cid=>classById.get(cid)).filter(Boolean).map(c=>c.uai).filter(Boolean)));

  const search = (document.getElementById('adminAccFilterSearch').value||'').toLowerCase().trim();
  const roleFilter = document.getElementById('adminAccFilterRole').value;
  const classeFilter = document.getElementById('adminAccFilterClasse').value;
  const uaiFilter = document.getElementById('adminAccFilterUai').value;
  const loginIdentifiant = email => email ? (email.endsWith('@mathcollege.local') ? email.slice(0, -('@mathcollege.local'.length)) : email) : '(inconnu)';
  const matches = p => {
    if(roleFilter && p.role!==roleFilter) return false;
    if(classeFilter && !classIdsOf(p).includes(classeFilter)) return false;
    if(uaiFilter && !uaisOf(p).includes(uaiFilter)) return false;
    if(search){
      const hay = ((p.nom||'')+' '+loginIdentifiant(p.email)).toLowerCase();
      if(!hay.includes(search)) return false;
    }
    return true;
  };
  const filteredProfs = profs.filter(matches);
  const filteredEleves = eleves.filter(matches);

  // Badge de catégorie d'abonnement (essai / actif / expiré), avec la date d'échéance --
  // "Comment je vois en tant qu'administrateur si un enseignant est en période d'essai ou
  // s'il est inscrit sur l'année ?"
  const subscriptionBadge = p => {
    if(p.role==='admin' || !p.subscription_status) return '';
    const dateStr = p.subscription_expires_at ? new Date(p.subscription_expires_at).toLocaleDateString('fr-FR') : '';
    const labels = {trial:'Essai', active:'Actif (année)', expired:'Expiré'};
    const colors = {trial:'#B8860B', active:'#1F7A4D', expired:'#a83c1f'};
    const label = labels[p.subscription_status] || p.subscription_status;
    const color = colors[p.subscription_status] || 'var(--ink-soft)';
    return ` <span style="color:${color};font-weight:700;">[${label}${dateStr?' jusqu\'au '+dateStr:''}]</span>`;
  };
  // "Actif" ne dit rien sur la connexion (c'est un statut de facturation, pas d'activité) --
  // affichée séparément, pour profs ET élèves.
  const lastLoginBadge = p => {
    const t = lastLoginMap.get(p.id);
    if(!t) return ' <span class="hint">(jamais connecté)</span>';
    const d = new Date(t);
    return ` <span class="hint">(connecté le ${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})})</span>`;
  };
  const rowHTML = p => {
    const label = escapeHtml(p.nom||'(sans nom)') + ' · <b>identifiant :</b> ' + escapeHtml(loginIdentifiant(p.email)) + (p.role==='admin'?' [admin]':'') + subscriptionBadge(p) + lastLoginBadge(p);
    const safeName = escapeHtml(p.nom||p.email||'').replace(/'/g,"\\'");
    const editBtn = (p.role==='prof'||p.role==='admin') ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="openEditProfModal('${p.id}')"><span class=gicon>build</span> Modifier</button>` : '';
    const categoryBtn = p.role==='prof' ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminChangeCategoryPrompt('${p.id}','${safeName}')"><span class=gicon>workspace_premium</span> Catégorie</button>` : '';
    return `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid rgba(28,43,57,.06);">
      <span style="display:flex;align-items:center;gap:8px;"><input type="checkbox" class="adminAccCheckbox" value="${p.id}">${label}</span>
      <span style="display:flex;gap:6px;flex:none;">
        ${editBtn}
        ${categoryBtn}
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminChangeIdentifiantPrompt('${p.id}','${safeName}')"><span class=gicon>edit</span> Identifiant</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminResetPasswordPrompt('${p.id}','${safeName}')"><span class=gicon>key</span> Réinitialiser</button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="adminDeleteUser('${p.id}', this)"><span class=gicon>delete</span> Supprimer</button>
      </span>
    </div>`;
  };
  accEl.innerHTML =
    `<b>Profs/admins (${filteredProfs.length}${filteredProfs.length!==profs.length?'/'+profs.length:''})</b>` + (filteredProfs.length ? filteredProfs.map(rowHTML).join('') : '<div class="hint">aucun</div>') +
    `<div style="margin-top:12px;"><b>Élèves (${filteredEleves.length}${filteredEleves.length!==eleves.length?'/'+eleves.length:''})</b></div>` + (filteredEleves.length ? filteredEleves.map(rowHTML).join('') : '<div class="hint">aucun</div>');
  document.getElementById('adminAccSelectAll').checked = false;
}
function adminToggleSelectAllAccounts(checked){
  document.querySelectorAll('.adminAccCheckbox').forEach(cb=>{ cb.checked = checked; });
}
async function adminDeleteSelectedAccounts(){
  const ids = [...document.querySelectorAll('.adminAccCheckbox:checked')].map(cb=>cb.value);
  const status = document.getElementById('adminAccBulkStatus');
  if(!ids.length){ status.textContent = 'Sélectionnez au moins un compte.'; return; }
  if(!(await niceConfirm(`Supprimer définitivement ${ids.length} compte(s) sélectionné(s) ? Cette action est irréversible.`))) return;
  const { data:{ session } } = await sb.auth.getSession();
  let ok=0, fail=0;
  for(let i=0;i<ids.length;i++){
    status.textContent = `Suppression en cours… (${i+1}/${ids.length})`;
    try{
      const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
        body: JSON.stringify({ action:'delete', userId: ids[i] }),
      });
      const data = await res.json();
      if(data.error) fail++; else ok++;
    }catch(err){ fail++; }
  }
  status.textContent = `✓ ${ok} compte(s) supprimé(s)` + (fail?`, ${fail} échec(s).`:'.');
  await adminRefreshListings();
}
async function adminRefreshDropdowns(){
  const { data: profs } = await sb.from('profiles').select('id,nom,role').in('role',['prof','admin']);
  const { data: eleves } = await sb.from('profiles').select('id,nom').eq('role','eleve');
  const { data: classesList } = await sb.from('classes').select('id,nom,niveau').order('nom');
  const fillSelect = (id, items, label)=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = `<option value="">${label}...</option>` + items.map(it=>`<option value="${it.id}">${it.label}</option>`).join('');
  };
  fillSelect('adminAssignTeacherSelect', (profs||[]).map(p=>({id:p.id, label:escapeHtml(p.nom||p.id)+(p.role==='admin'?' (admin)':'')})), 'Choisir un prof');
  fillSelect('adminAssignStudentSelect', (eleves||[]).map(p=>({id:p.id, label:escapeHtml(p.nom||p.id)})), 'Choisir un élève');
  fillSelect('adminAssignTeacherClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  fillSelect('adminAssignStudentClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  await adminRefreshListings();
}
let adminAccountsCache = { profs:[], eleves:[], lastLoginMap:new Map(), classesList:[], classTeachers:[], classStudents:[], etablissements:[] };
async function adminRefreshListings(){
  await adminRefreshBugReports();
  await adminRefreshSignupRequests();
  const { data: profs } = await sb.from('profiles').select('id,nom,email,role,subscription_status,subscription_expires_at').in('role',['prof','admin']).order('nom');
  const { data: eleves } = await sb.from('profiles').select('id,nom,email,role').eq('role','eleve').order('nom');
  // Date de dernière connexion (auth.users, normalement inaccessible via RLS classique) --
  // exposée uniquement à un admin via une fonction SECURITY DEFINER dédiée.
  const { data: lastSignIns } = await sb.rpc('get_last_sign_in_times');
  const { data: classesList } = await sb.from('classes').select('id,nom,niveau,uai').order('nom');
  const { data: classTeachers } = await sb.from('class_teachers').select('class_id, teacher_id, profiles(nom,email)');
  const { data: classStudents } = await sb.from('class_students').select('class_id, student_id, profiles(nom,email)');
  const { data: etablissements } = await sb.from('etablissements').select('uai,nom').order('nom');
  adminAccountsCache = {
    profs: profs||[], eleves: eleves||[],
    lastLoginMap: new Map((lastSignIns||[]).map(r=>[r.id, r.last_sign_in_at])),
    classesList: classesList||[], classTeachers: classTeachers||[], classStudents: classStudents||[],
    etablissements: etablissements||[],
  };
  // Menus déroulants de filtre (classe / établissement) -- signalé : "on doit faire des
  // sélections par profs, élèves, classe, établissement".
  const classeSelect = document.getElementById('adminAccFilterClasse');
  if(classeSelect){
    const prev = classeSelect.value;
    classeSelect.innerHTML = '<option value="">Toutes les classes</option>' + adminAccountsCache.classesList.map(c=>`<option value="${c.id}">${escapeHtml(c.nom)} (${escapeHtml(c.niveau)})</option>`).join('');
    if(adminAccountsCache.classesList.some(c=>c.id===prev)) classeSelect.value = prev;
  }
  const uaiSelect = document.getElementById('adminAccFilterUai');
  if(uaiSelect){
    const prev = uaiSelect.value;
    uaiSelect.innerHTML = '<option value="">Tous les établissements</option>' + adminAccountsCache.etablissements.map(e=>`<option value="${escapeHtml(e.uai)}">${escapeHtml(e.nom)} (${escapeHtml(e.uai)})</option>`).join('');
    if(adminAccountsCache.etablissements.some(e=>e.uai===prev)) uaiSelect.value = prev;
  }
  adminRenderAccountsListing();
  const { data: permisSessionsList } = await sb.from('permis_rapporteur_sessions').select('id,code,classe_id,cloturee,created_at').order('created_at',{ascending:false});
  const classesEl = document.getElementById('adminClassesListing');
  if(classesEl){
    if(!classesList || !classesList.length){ classesEl.textContent = 'Aucune classe créée pour l\'instant.'; return; }
    classesEl.innerHTML = classesList.map(c=>{
      const profsHere = (classTeachers||[]).filter(r=>r.class_id===c.id);
      const elevesHere = (classStudents||[]).filter(r=>r.class_id===c.id).map(r=>r.profiles && (r.profiles.nom||r.profiles.email)).filter(Boolean);
      const profsHtml = profsHere.length ? profsHere.map(r=>{
        const label = escapeHtml((r.profiles && (r.profiles.nom||r.profiles.email))||'?');
        return `<span style="display:inline-flex;align-items:center;gap:3px;background:rgba(31,58,92,.06);border-radius:12px;padding:2px 4px 2px 10px;margin:2px 4px 2px 0;">${label}
          <button type="button" onclick="adminRemoveTeacherFromClass('${r.teacher_id}','${c.id}')" title="Retirer ce prof de la classe" style="border:none;background:none;cursor:pointer;color:#a83c1f;font-size:.9rem;line-height:1;padding:2px;">✕</button>
        </span>`;
      }).join('') : '<span class="hint" style="margin:0;">aucun</span>';
      const sessionsHere = (permisSessionsList||[]).filter(s=>s.classe_id===c.id);
      const sessionsHtml = sessionsHere.length ? sessionsHere.map(s=>`
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
          <span style="font-family:'JetBrains Mono',monospace;font-weight:700;${s.cloturee?'text-decoration:line-through;color:var(--ink-soft);':'color:var(--accent);'}">${escapeHtml(s.code)}</span>
          <span class="hint" style="margin:0;">${s.cloturee?'clôturée':'active'}</span>
          ${s.cloturee?'':`<button class="btn secondary" style="padding:3px 10px;font-size:.75rem;" onclick="adminCloturerPermisSession('${s.id}')">Clôturer</button>`}
        </div>`).join('') : '<p class="hint" style="margin:4px 0 0;">Aucune session pour l\'instant.</p>';
      return `<div style="margin-bottom:14px;padding:10px;border:1px solid rgba(28,43,57,.12);border-radius:8px;"><b>${escapeHtml(c.nom)}</b><br>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0;">
          <label class="hint" style="margin:0;">Niveau : <select id="classNiveau_${c.id}"><option value="6e" ${c.niveau==='6e'?'selected':''}>6e</option><option value="5e" ${c.niveau==='5e'?'selected':''}>5e</option></select></label>
          <label class="hint" style="margin:0;">UAI : <input type="text" id="classUai_${c.id}" value="${escapeHtml(c.uai||'')}" style="width:110px;"></label>
          <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;" onclick="adminUpdateClassNiveauUai('${c.id}')">Enregistrer</button>
          <span class="hint" id="classSaveStatus_${c.id}" style="margin:0;"></span>
        </div>
        Profs : ${profsHtml}<br>
        Élèves (${elevesHere.length}) : ${elevesHere.map(escapeHtml).join(', ')||'aucun'}
        <div style="margin-top:6px;padding:8px;background:rgba(31,58,92,.05);border-radius:6px;">
          <b style="font-size:.85rem;"><span class=gicon>school</span> Permis Rapporteur</b>
          <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;float:right;" onclick="adminDemarrerPermisSession('${c.id}')">+ Nouvelle session</button>
          ${sessionsHtml}
        </div></div>`;
    }).join('');
  }
}
function arGenererCodeSession(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans lettres/chiffres ambigus (0/O, 1/I...)
  let code = '';
  for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}
async function adminDemarrerPermisSession(classId){
  const code = arGenererCodeSession();
  const { error } = await sb.from('permis_rapporteur_sessions').insert({
    code, classe_id: classId, prof_id: currentUser ? currentUser.id : null,
  });
  if(error){ await niceAlert("Échec : "+error.message); return; }
  await adminRefreshDropdowns();
}
async function adminCloturerPermisSession(sessionId){
  await sb.from('permis_rapporteur_sessions').update({cloturee:true}).eq('id', sessionId);
  await adminRefreshDropdowns();
}
async function adminRefreshBugReports(){
  const el = document.getElementById('adminBugReportsListing');
  if(!el) return;
  el.textContent = 'Chargement…';
  const { data, error } = await sb.from('bug_reports')
    .select('id,created_at,section,chapitre,message,build_version,status,report_type,profiles(nom,email)')
    .order('created_at', {ascending:false})
    .limit(300);
  if(error){ el.textContent = "Erreur : "+error.message; return; }
  if(!data || !data.length){ el.textContent = "Aucun signalement pour l'instant."; return; }
  const STATUS_OPTIONS = ['nouveau','en cours','résolu'];
  el.innerHTML = data.map(r=>{
    const name = (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Utilisateur inconnu';
    const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
    const statusColor = r.status==='résolu' ? 'var(--accent-green, #1F6B3A)' : r.status==='en cours' ? 'var(--accent-orange)' : 'var(--accent)';
    const typeTag = r.report_type==='suggestion' ? '<span style="background:#FFF4E5;color:#B26A00;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;"><span class=gicon>lightbulb</span> Suggestion</span>' : '<span style="background:#FDEAEA;color:#B23A3A;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;"><span class=gicon>bug_report</span> Bug</span>';
    return `<div class="bug-report-row" style="border:1px solid rgba(28,43,57,.12);border-radius:8px;padding:10px 12px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:4px;">
        <span>${typeTag}<b>${escapeHtml(r.section)}</b>${r.chapitre?' · '+escapeHtml(r.chapitre):''}</span>
        <span style="color:var(--ink-soft);font-size:.85rem;">${escapeHtml(name)} · ${date}${r.build_version?' · build '+escapeHtml(r.build_version):''}</span>
      </div>
      <div style="margin:6px 0;white-space:pre-wrap;">${escapeHtml(r.message)}</div>
      <label class="hint" style="display:inline-flex;align-items:center;gap:6px;">
        Statut :
        <select onchange="adminUpdateBugStatus('${r.id}', this.value)" style="color:${statusColor};font-weight:600;">
          ${STATUS_OPTIONS.map(s=>`<option value="${s}" ${s===r.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </label>
    </div>`;
  }).join('');
}
async function adminUpdateBugStatus(id, status){
  const { data, error } = await sb.from('bug_reports').update({status}).eq('id', id).select();
  if(error){
    await niceAlert("Échec de l'enregistrement du statut : "+error.message);
    await adminRefreshBugReports();
    return;
  }
  if(!data || !data.length){
    await niceAlert("Le statut n'a pas été enregistré (0 ligne modifiée en base). C'est très probablement une policy Supabase (RLS) qui bloque la mise à jour pour ce compte -- il faudra vérifier la policy UPDATE de la table bug_reports.");
    await adminRefreshBugReports();
    return;
  }
  await adminRefreshBugReports();
}
async function adminBulkCreateStudents(){
  const raw = document.getElementById('adminBulkStudents').value;
  const status = document.getElementById('adminBulkStatus');
  const lines = raw.split('\n').map(l=>l.trim()).filter(Boolean);
  if(!lines.length){ status.textContent = 'Collez au moins une ligne (Nom Prénom, identifiant, mot de passe, UAI, classe).'; return; }
  const { data:{ session } } = await sb.auth.getSession();
  let ok=0, fail=0; const errors=[];
  const classCache = {}; // clé "uai|nom" -- évite de rechercher/créer la même classe à chaque ligne, distingue 2 classes de même nom dans des établissements différents
  const etabCache = new Set(); // UAI déjà vérifiés/créés dans etablissements cette session
  for(let i=0;i<lines.length;i++){
    status.textContent = `Création en cours… (${i+1}/${lines.length})`;
    const parts = lines[i].split('\t').map(s=>s.trim());
    if(parts.length<3){ fail++; errors.push(`Ligne ${i+1} : format invalide (au moins Nom Prénom, identifiant et mot de passe attendus, séparés par des tabulations)`); continue; }
    const [nom, identifiant, password, uai, classeNom] = parts;
    const email = toAuthEmail(identifiant);
    try{
      const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
        body: JSON.stringify({ email, password, role:'eleve', nom }),
      });
      const data = await res.json();
      if(data.error){ fail++; errors.push(`${nom} (${identifiant}) : ${data.error}`); continue; }
      ok++;
      // La fonction serveur ne renvoie pas d'id exploitable directement (même constat que
      // pour la création à l'unité, adminCreateAccount) -- retrouve le profil fraîchement
      // créé par son e-mail.
      const { data: prof } = await sb.from('profiles').select('id').eq('email', email).single();
      if(!prof) continue; // ne devrait pas arriver (le compte vient d'être créé avec succès), sécurité
      // UAI : simple champ texte sur le profil, pas besoin de recherche/création.
      if(uai) await sb.from('profiles').update({uai}).eq('id', prof.id);
      // Une classe doit être rattachée à un établissement (signalé : "les classes doivent
      // être rattachées à un UAI. Dans un UAI, on trouve les profs et les classes puis les
      // élèves"). Sans UAI fourni sur cette ligne, on ne peut pas créer/rattacher la classe
      // correctement -- on l'ignore plutôt que de créer une classe "orpheline".
      if(classeNom && uai){
        // L'établissement doit exister AVANT la classe (classes.uai référence
        // etablissements.uai) -- créé automatiquement s'il est absent.
        if(!etabCache.has(uai)){
          const { data: existingEtab } = await sb.from('etablissements').select('uai').eq('uai', uai).maybeSingle();
          if(!existingEtab){
            const { error: etabErr } = await sb.from('etablissements').insert({ uai, nom: 'Établissement '+uai });
            if(etabErr){ errors.push(`Établissement "${uai}" : ${etabErr.message}`); }
          }
          etabCache.add(uai);
        }
        const cacheKey = uai+'|'+classeNom;
        if(!(cacheKey in classCache)){
          const { data: existing } = await sb.from('classes').select('id').eq('nom', classeNom).eq('uai', uai).maybeSingle();
          if(existing) classCache[cacheKey] = existing.id;
          else {
            const niveau = /^5/.test(classeNom) ? '5e' : '6e';
            const { data: created, error: createErr } = await sb.from('classes').insert({ nom: classeNom, niveau, uai }).select('id').single();
            if(createErr){ errors.push(`Classe "${classeNom}" (${uai}) : ${createErr.message}`); classCache[cacheKey] = null; }
            else classCache[cacheKey] = created.id;
          }
        }
        if(classCache[cacheKey]) await sb.from('class_students').insert({ student_id: prof.id, class_id: classCache[cacheKey] });
      } else if(classeNom && !uai){
        errors.push(`${nom} : classe "${classeNom}" ignorée (UAI manquant sur cette ligne -- une classe doit être rattachée à un établissement)`);
      }
    }catch(err){ fail++; errors.push(`${nom} (${identifiant}) : erreur réseau`); }
  }
  status.innerHTML = `✓ ${ok} compte(s) créé(s)` + (errors.length?`, <span class=gicon>warning</span> ${fail?fail+' échec(s)':'avertissement(s)'} :<br>`+errors.map(escapeHtml).join('<br>') : '.');
  if(ok) document.getElementById('adminBulkStudents').value='';
  await adminRefreshDropdowns();
  await adminRefreshListings();
}
async function adminAssignTeacher(){
  const teacher_id = document.getElementById('adminAssignTeacherSelect').value;
  const class_id = document.getElementById('adminAssignTeacherClassSelect').value;
  const status = document.getElementById('adminAssignTeacherStatus');
  if(!teacher_id || !class_id){ status.textContent = 'Choisissez un prof et une classe.'; return; }
  const { error } = await sb.from('class_teachers').insert({ teacher_id, class_id });
  status.textContent = error ? "Erreur : "+error.message : '✓ Associé.';
  if(!error) await adminRefreshListings();
}
async function adminAssignStudent(){
  const student_id = document.getElementById('adminAssignStudentSelect').value;
  const class_id = document.getElementById('adminAssignStudentClassSelect').value;
  const status = document.getElementById('adminAssignStudentStatus');
  if(!student_id || !class_id){ status.textContent = 'Choisissez un élève et une classe.'; return; }
  const { error } = await sb.from('class_students').insert({ student_id, class_id });
  status.textContent = error ? "Erreur : "+error.message : '✓ Associé.';
  if(!error) await adminRefreshListings();
}

/* Demandes d'inscription prof (signup_status='pending') : approuver démarre l'essai de
   15 jours (trial_started_at + subscription_expires_at à +15 jours), rejeter bloque
   l'accès sans supprimer le compte (l'utilisateur peut recontacter l'admin). */
async function adminRefreshSignupRequests(){
  const el = document.getElementById('adminSignupRequestsListing');
  if(!el) return;
  const { data: requests, error } = await sb.from('profiles')
    .select('id,nom,prenom,email,uai,created_at,etablissements(nom)')
    .eq('role','prof').eq('signup_status','pending')
    .order('created_at',{ascending:true});
  if(error){ el.textContent = 'Erreur : '+error.message; return; }
  if(!requests || !requests.length){ el.innerHTML = '<div class="hint">Aucune demande en attente.</div>'; return; }
  el.innerHTML = requests.map(r=>{
    const safeName = escapeHtml([r.prenom,r.nom].filter(Boolean).join(' ')||r.email||'').replace(/'/g,"\\'");
    const etabNom = r.etablissements ? r.etablissements.nom : null;
    const dateStr = r.created_at ? new Date(r.created_at).toLocaleDateString('fr-FR') : '';
    return `<div style="padding:10px 0;border-bottom:1px solid rgba(28,43,57,.08);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap;">
        <div>
          <b>${escapeHtml([r.prenom,r.nom].filter(Boolean).join(' ')||'(sans nom)')}</b>
          <span style="color:var(--ink-soft);">${escapeHtml(r.email||'')}</span><br>
          <span style="font-family:'JetBrains Mono',monospace;font-size:.82rem;">UAI ${escapeHtml(r.uai||'?')}</span>
          ${etabNom ? ' · '+escapeHtml(etabNom) : ' <span style="color:#a83c1f;">(établissement à vérifier)</span>'}
          <span style="color:var(--ink-soft);font-size:.8rem;"> · demande du ${dateStr}</span>
        </div>
        <span style="display:flex;gap:6px;flex:none;">
          <button class="btn" style="font-size:.78rem;padding:5px 10px;" onclick="adminApproveSignup('${r.id}','${safeName}')">✓ Approuver</button>
          <button class="btn secondary" style="font-size:.78rem;padding:5px 10px;color:#a83c1f;" onclick="adminRejectSignup('${r.id}','${safeName}')"><span class=gicon>close</span> Rejeter</button>
        </span>
      </div>
    </div>`;
  }).join('');
}
async function adminApproveSignup(id, name){
  if(!(await niceConfirm(`Approuver l'inscription de ${name} ? L'essai gratuit de 15 jours démarre immédiatement.`))) return;
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 15*24*60*60*1000);
  const { error } = await sb.from('profiles').update({
    signup_status: 'approved',
    subscription_status: 'trial',
    trial_started_at: now.toISOString(),
    subscription_expires_at: trialEnd.toISOString(),
  }).eq('id', id);
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  await adminRefreshSignupRequests();
}
async function adminRejectSignup(id, name){
  if(!(await niceConfirm(`Rejeter l'inscription de ${name} ?`))) return;
  const { error } = await sb.from('profiles').update({ signup_status: 'rejected' }).eq('id', id);
  if(error){ await niceAlert('Erreur : '+error.message); return; }
  await adminRefreshSignupRequests();
}

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

// Tarif Anthropic pour le modèle utilisé par ai-proxy (claude-sonnet-4-6), en $/million de tokens.
const AI_USAGE_PRICE_INPUT_PER_1M = 3;
const AI_USAGE_PRICE_OUTPUT_PER_1M = 15;
// Les appels enregistrés avant cette date n'ont pas de tokens (colonnes ajoutées le 23/09/2026) : coût inconnu.
const AI_USAGE_TOKENS_SINCE_LABEL = '23/09/2026';

document.getElementById('view-admin').innerHTML = `
  <span class="back-btn" data-nav="home">← Accueil</span>
  <h1 style="margin:6px 0 4px;" id="adminTitle"><span class=gicon>build</span> Administration</h1>
  <p style="color:var(--ink-soft);max-width:75ch;" id="adminSubtitle">Gestion des comptes, des classes, et des signalements.</p>

  <div class="tabs" id="adminTabs">
    <button class="tab-btn active" data-admin-tab="comptes">Comptes &amp; classes</button>
    <button class="tab-btn" data-admin-tab="inscriptions"><span class=gicon>edit_note</span> Inscriptions</button>
    <button class="tab-btn" data-admin-tab="listing"><span class=gicon>assignment</span> Déjà enregistré</button>
    <button class="tab-btn" data-admin-tab="signalements"><span class=gicon>bug_report</span> Signalements</button>
    <button class="tab-btn" data-admin-tab="ia"><span class=gicon>smart_toy</span> IA</button>
    <button class="tab-btn" data-admin-tab="etablissements"><span class=gicon>domain</span> Établissements</button>
  </div>

  <div class="tab-panel active" id="admin-panel-comptes">
    <div class="tool-shell">
      <p style="color:var(--ink-soft);max-width:70ch;margin:0 0 14px;">Créez les comptes profs/élèves, les classes, et associez-les entre eux.</p>

      <div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:#0C5BA0;--acc-bg:rgba(12,91,160,.05);" onclick="toggleNbAccordion('accCreerCompte')">
          <span class="gicon nb-accordion-chevron open">expand_more</span>
          <span class="gicon">person_add</span><span>Créer un compte</span>
        </button>
        <div class="nb-accordion-body open" id="accCreerCompte">
          <div class="tool-row">
            <input type="text" id="adminNewEmail" placeholder="identifiant (ou e-mail)" style="min-width:200px;">
            <input type="password" id="adminNewPassword" placeholder="Mot de passe (facultatif -- vide = lien d'invitation)" style="width:230px;">
            <input type="text" id="adminNewNom" placeholder="Nom (affichage)" style="width:160px;">
            <input type="text" id="adminNewPrenom" placeholder="Prénom" style="width:130px;">
            <input type="text" id="adminNewUai" placeholder="UAI établissement (ex. 0751234A)" style="width:170px;">
            <select id="adminNewRole"><option value="prof">Professeur</option><option value="eleve">Élève</option><option value="admin" id="adminNewRoleAdminOpt">Administrateur</option></select>
            <button class="btn" onclick="adminCreateAccount()">Créer le compte</button>
          </div>
          <span class="hint" id="adminAccountStatus" style="margin:0;"></span>
        </div>
      </div>

      <div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:#FF8208;--acc-bg:rgba(255,130,8,.05);" onclick="toggleNbAccordion('accImportMasse')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">group_add</span><span>Import en masse d'élèves</span>
        </button>
        <div class="nb-accordion-body" id="accImportMasse">
          <p class="hint" id="adminBulkScopeNote" style="display:none;margin:0 0 8px;padding:6px 10px;background:rgba(31,122,77,.08);border-radius:6px;"></p>
          <p class="hint" style="margin:0 0 8px;">Collez une liste (une ligne par élève, 5 colonnes séparées par une tabulation : Nom Prénom, identifiant, mot de passe, UAI, classe -- un copier-coller direct depuis un tableur fonctionne). <b>Laissez la colonne "mot de passe" vide</b> pour recevoir à la place un lien d'invitation personnel : l'élève choisit alors lui-même son mot de passe en cliquant dessus. La classe est créée automatiquement si elle n'existe pas encore (niveau déduit du préfixe "6e"/"5e" du nom).</p>
          <textarea id="adminBulkStudents" rows="6" style="width:100%;font-family:'JetBrains Mono',monospace;font-size:.85rem;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);" placeholder="DUPONT Jean	jdupont		0123456A	6eA
MARTIN Marie	mmartin		0123456A	6eA"></textarea>
          <div class="tool-row" style="margin-top:8px;">
            <button class="btn" onclick="adminBulkCreateStudents()">Créer tous les comptes élèves</button>
          </div>
          <div class="hint" id="adminBulkStatus" style="margin:0;"></div>
        </div>
      </div>

      <div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:#26AAB1;--acc-bg:rgba(38,170,177,.05);" onclick="toggleNbAccordion('accCreerClasse')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">school</span><span>Créer une classe</span>
        </button>
        <div class="nb-accordion-body" id="accCreerClasse">
          <div class="tool-row">
            <input type="text" id="adminNewClassNom" placeholder="Nom (ex. 5e-A)">
            <select id="adminNewClassNiveau"><option value="6e">6e</option><option value="5e" selected>5e</option></select>
            <input type="text" id="adminNewClassUai" placeholder="UAI de l'établissement">
            <button class="btn" onclick="adminCreateClass()">Créer la classe</button>
          </div>
          <p class="hint" style="margin:2px 0 0;">Une classe doit être rattachée à un établissement (UAI) -- créé automatiquement s'il n'existe pas encore.</p>
          <span class="hint" id="adminClassStatus" style="margin:0;"></span>
        </div>
      </div>

      <div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:#5B2F9E;--acc-bg:rgba(91,47,158,.05);" onclick="toggleNbAccordion('accAssignTeacher')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">link</span><span>Associer un professeur à une classe</span>
        </button>
        <div class="nb-accordion-body" id="accAssignTeacher">
          <div class="tool-row">
            <select id="adminAssignTeacherSelect"></select>
            <select id="adminAssignTeacherClassSelect"></select>
            <button class="btn secondary" onclick="adminAssignTeacher()">Associer</button>
          </div>
          <span class="hint" id="adminAssignTeacherStatus" style="margin:0;"></span>
        </div>
      </div>

      <div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:#9E1F5E;--acc-bg:rgba(158,31,94,.05);" onclick="toggleNbAccordion('accAssignStudent')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">link</span><span>Associer un élève à une classe</span>
        </button>
        <div class="nb-accordion-body" id="accAssignStudent">
          <div class="tool-row">
            <select id="adminAssignStudentSelect"></select>
            <select id="adminAssignStudentClassSelect"></select>
            <button class="btn secondary" onclick="adminAssignStudent()">Associer</button>
          </div>
          <span class="hint" id="adminAssignStudentStatus" style="margin:0;"></span>
        </div>
      </div>
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
      <div class="nb-accordion-section" style="margin-bottom:16px;">
        <button type="button" class="nb-accordion-header" style="--acc-color:#5B2F9E;--acc-bg:rgba(91,47,158,.05);" onclick="toggleNbAccordion('accOutilsAvances')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">build</span><span>Outils avancés</span>
        </button>
        <div class="nb-accordion-body" id="accOutilsAvances">
          <div class="tool-row" style="margin-bottom:8px;">
            <button class="btn secondary" id="adminSyncEmailsBtn" onclick="adminSyncEmails()">🔧 Réparer les identifiants manquants</button>
            <button class="btn secondary" onclick="adminGenerateAllInviteLinks()"><span class=gicon>link</span> Générer tous les liens d'invitation</button>
            <button class="btn secondary" onclick="adminShowExistingInviteLinks()"><span class=gicon>refresh</span> Réafficher les liens déjà générés</button>
          </div>
          <p class="hint" id="adminSyncEmailsStatus" style="margin:0 0 6px;"></p>
          <span class="hint" id="adminAccBulkStatus" style="margin:0;"></span>
          <div id="adminInviteLinksTable" class="hint" style="margin-top:8px;"></div>
        </div>
      </div>
      <button class="btn secondary" style="float:right;" onclick="adminRefreshListings()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="example-title" style="margin:16px 0 6px;color:#0C5BA0;">Comptes</p>
      <div class="tool-row" style="margin-bottom:8px;flex-wrap:wrap;">
        <input type="text" id="adminAccFilterSearch" placeholder="Rechercher (nom, identifiant)" style="width:200px;" oninput="adminRenderAccountsListing()">
        <select id="adminAccFilterRole" onchange="adminRenderAccountsListing()">
          <option value="">Tous les rôles</option>
          <option value="prof">Profs</option>
          <option value="admin" id="adminAccFilterRoleAdminOpt">Admins</option>
          <option value="eleve">Élèves</option>
        </select>
        <select id="adminAccFilterClasse" onchange="adminRenderAccountsListing()"><option value="">Toutes les classes</option></select>
        <select id="adminAccFilterUai" onchange="adminRenderAccountsListing()"><option value="">Tous les établissements</option></select>
        <button class="btn secondary" onclick="adminResetAccountsFilters()">Réinitialiser les filtres</button>
      </div>
      <div class="tool-row" style="margin-bottom:8px;align-items:center;">
        <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;"><input type="checkbox" id="adminAccSelectAll" onchange="adminToggleSelectAllAccounts(this.checked)"> Tout sélectionner (visibles)</label>
        <button class="btn secondary" style="color:#a83c1f;" onclick="adminDeleteSelectedAccounts()"><span class=gicon>delete</span> Supprimer la sélection</button>
      </div>
      <div id="adminAccountsListing" class="hint"></div>
      <p class="example-title" style="margin:16px 0 6px;color:#26AAB1;">Classes</p>
      <div id="adminClassesListing" class="hint"></div>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-etablissements">
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshEtablissements()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="hint" style="margin:6px 0 14px;clear:right;max-width:80ch;">Pour chaque établissement (UAI) : son <b>référent</b> (un professeur de l'établissement, qui gère alors lui-même comptes, classes, imports et inscriptions de son établissement depuis « Mon établissement ») et sa <b>licence établissement</b> (tant qu'elle court, tous ses professeurs ont accès au site sans abonnement individuel).</p>
      <div id="adminEtabListing" class="hint">Chargement…</div>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-signalements">
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshBugReports()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="hint" style="margin:6px 0 14px;">Signalements envoyés par les profs depuis le menu de leur compte.</p>
      <div id="adminBugReportsListing" class="hint">Chargement…</div>
    </div>
  </div>

  <div class="tab-panel" id="admin-panel-ia">
    <div class="tool-shell" style="margin-bottom:16px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class=gicon>key</span> Clé IA des professeurs</strong>
      <p class="hint" style="margin:6px 0 10px;max-width:80ch;">Pour chaque professeur, vous choisissez qui paie son IA (et celle de ses élèves) : <b>la clé du site</b> (la vôtre) ou <b>sa clé personnelle</b> (qu'il enregistre lui-même dans Mon compte &gt; Intelligence artificielle). Le choix s'applique immédiatement. Chaque professeur active ensuite lui-même l'IA pour lui et/ou ses élèves.</p>
      <div id="adminAiTeachers" class="hint">Chargement…</div>
    </div>
    <div class="tool-shell">
      <button class="btn secondary" style="float:right;" onclick="adminRefreshAiUsage()"><span class=gicon>refresh</span> Actualiser</button>
      <p class="hint" style="margin:6px 0 14px;clear:right;max-width:75ch;">
        Utilisation de l'assistant IA (quiz générés, rédaction assistée…) : chaque appel est payé soit par
        <b>la clé du site</b> (la vôtre, et celle des collègues que vous y autorisez), soit par <b>la clé
        personnelle</b> du professeur concerné -- réglages et rapport détaillé dans Mon compte &gt;
        Intelligence artificielle. Le coût est estimé à partir du nombre de tokens consommés par appel
        (tarif Claude Sonnet : $3 / million de tokens en entrée, $15 / million de tokens en sortie).
        ${AI_USAGE_TOKENS_SINCE_LABEL ? `Les appels antérieurs au <b>${AI_USAGE_TOKENS_SINCE_LABEL}</b> n'ont pas de tokens enregistrés (comptés dans le nombre d'appels, mais avec un coût inconnu).` : ''}
      </p>
      <div id="adminAiUsageSummary" class="hint">Chargement…</div>
      <p class="example-title" style="margin:16px 0 6px;color:#0C5BA0;">Par utilisateur</p>
      <div id="adminAiUsageByUser" class="hint"></div>
      <p class="example-title" style="margin:16px 0 6px;color:#1F7A4D;">Par payeur</p>
      <div id="adminAiUsageByPayer" class="hint"></div>
      <p class="example-title" style="margin:16px 0 6px;color:#26AAB1;">Par fonctionnalité</p>
      <div id="adminAiUsageByFeature" class="hint"></div>
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

/* ---- Périmètre : administrateur général (tout le site) ou RÉFÉRENT d'établissement (son UAI
   seulement -- demandé : "désigner un professeur comme Référent Établissement avec certains droits
   pour son établissement : import d'élèves, import profs, import classe, et gestion globale").
   Les règles d'accès de la base et la fonction serveur admin-create-user appliquent ce même
   périmètre : l'interface ne fait que l'afficher. ---- */
function adminScopeUai(){
  if(typeof currentUserRole!=='undefined' && currentUserRole==='admin') return null;
  return (typeof currentReferentEtab!=='undefined' && currentReferentEtab) ? currentReferentEtab.uai : '__aucun__';
}
function adminApplyScopeUI(){
  const scope = adminScopeUai();
  const scoped = !!scope;
  const etab = scoped ? currentReferentEtab : null;
  const title = document.getElementById('adminTitle'), sub = document.getElementById('adminSubtitle');
  if(title) title.innerHTML = scoped ? '<span class=gicon>domain</span> Mon établissement' : '<span class=gicon>build</span> Administration';
  if(typeof ROUTE_LABELS!=='undefined') ROUTE_LABELS.admin = scoped ? 'Mon établissement' : 'Administration'; // fil d'Ariane
  if(sub){
    if(scoped){
      const lic = etab && etab.licence_until && etab.licence_until >= new Date().toISOString().slice(0,10)
        ? `<span style="color:#1F7A4D;font-weight:600;">licence établissement active jusqu'au ${new Date(etab.licence_until+'T00:00:00').toLocaleDateString('fr-FR')}</span>`
        : `<span style="color:#a83c1f;">pas de licence établissement en cours</span> (vos collègues ont besoin d'un abonnement individuel)`;
      sub.innerHTML = `<b>${escapeHtml((etab&&etab.nom)||'')}</b> · UAI <span class="hint-mono">${escapeHtml(scope)}</span> · ${lic}.<br>Vous êtes le référent de votre établissement : comptes professeurs et élèves, classes, imports et validation des inscriptions de vos collègues.`;
    } else sub.textContent = 'Gestion des comptes, des classes, des établissements et des signalements.';
  }
  ['signalements','ia','etablissements'].forEach(t=>{
    const b = document.querySelector('#adminTabs [data-admin-tab="'+t+'"]');
    if(b){ b.style.display = scoped ? 'none' : ''; if(scoped && b.classList.contains('active')) document.querySelector('#adminTabs [data-admin-tab="comptes"]').click(); }
  });
  const hideOpt = (id)=>{ const o = document.getElementById(id); if(o){ o.hidden = scoped; o.disabled = scoped; } };
  hideOpt('adminNewRoleAdminOpt'); hideOpt('adminAccFilterRoleAdminOpt');
  const roleSel = document.getElementById('adminNewRole'); if(roleSel && scoped && roleSel.value==='admin') roleSel.value = 'prof';
  ['adminNewUai','adminNewClassUai'].forEach(id=>{ const el = document.getElementById(id); if(el){ el.readOnly = scoped; if(scoped) el.value = scope; el.style.opacity = scoped ? .6 : 1; } });
  const uaiFilter = document.getElementById('adminAccFilterUai'); if(uaiFilter) uaiFilter.style.display = scoped ? 'none' : '';
  const syncBtn = document.getElementById('adminSyncEmailsBtn'); if(syncBtn) syncBtn.style.display = scoped ? 'none' : '';
  const note = document.getElementById('adminBulkScopeNote');
  if(note){ note.style.display = scoped ? 'block' : 'none'; note.innerHTML = scoped ? `Les comptes et les classes sont automatiquement créés dans <b>votre établissement (UAI ${escapeHtml(scope)})</b> : la colonne UAI peut rester vide.` : ''; }
}

/* ---- Onglet « Établissements » (administrateur général) : référent + licence ---- */
async function adminRefreshEtablissements(){
  const box = document.getElementById('adminEtabListing');
  if(!box || adminScopeUai()) return;
  const [{ data: etabs, error }, { data: staff }, { data: cls }, { data: eleves }] = await Promise.all([
    sb.from('etablissements').select('uai,nom,ville,referent_id,licence_until,licence_note').order('nom'),
    sb.from('profiles').select('id,nom,prenom,role,uai').in('role',['prof','admin']),
    sb.from('classes').select('id,uai'),
    sb.from('profiles').select('uai').eq('role','eleve'),
  ]);
  if(error){ box.textContent = 'Erreur : '+error.message; return; }
  if(!etabs || !etabs.length){ box.textContent = 'Aucun établissement.'; return; }
  const today = new Date().toISOString().slice(0,10);
  box.innerHTML = `<div style="overflow-x:auto;"><table class="sup-table"><thead><tr><th>UAI</th><th>Nom</th><th>Référent</th><th>Licence jusqu'au</th><th>Note (facture, bon de commande…)</th><th>Profs · élèves · classes</th><th></th></tr></thead><tbody>
    ${etabs.map(e=>{
      const profsHere = (staff||[]).filter(p=>p.uai===e.uai && p.role==='prof');
      const nbEleves = (eleves||[]).filter(p=>p.uai===e.uai).length, nbClasses = (cls||[]).filter(c=>c.uai===e.uai).length;
      const active = e.licence_until && e.licence_until >= today;
      const k = e.uai.replace(/[^A-Za-z0-9]/g,'');
      return `<tr>
        <td class="hint-mono">${escapeHtml(e.uai)}</td>
        <td><input type="text" id="etabNom_${k}" value="${escapeHtml(e.nom||'')}" style="min-width:180px;"></td>
        <td><select id="etabRef_${k}"><option value="">— aucun —</option>${profsHere.map(p=>`<option value="${p.id}" ${p.id===e.referent_id?'selected':''}>${escapeHtml(profileDisplayName(p)||p.id)}</option>`).join('')}</select>
          ${!profsHere.length ? '<div class="hint" style="margin:2px 0 0;">aucun professeur rattaché à cet UAI</div>' : ''}</td>
        <td><input type="date" id="etabLic_${k}" value="${e.licence_until||''}"> ${e.licence_until ? `<div class="hint" style="margin:2px 0 0;color:${active?'#1F7A4D':'#a83c1f'};">${active?'active':'expirée'}</div>` : ''}</td>
        <td><input type="text" id="etabNote_${k}" value="${escapeHtml(e.licence_note||'')}" style="min-width:160px;"></td>
        <td>${profsHere.length} · ${nbEleves} · ${nbClasses}</td>
        <td style="white-space:nowrap;"><button class="btn" style="padding:4px 12px;font-size:.8rem;" onclick="adminSaveEtablissement('${escapeHtml(e.uai)}')">Enregistrer</button> <span class="hint" id="etabMsg_${k}" style="margin:0;"></span></td>
      </tr>`;
    }).join('')}
  </tbody></table></div>`;
}
async function adminSaveEtablissement(uai){
  const k = uai.replace(/[^A-Za-z0-9]/g,'');
  const msg = document.getElementById('etabMsg_'+k);
  const row = {
    nom: document.getElementById('etabNom_'+k).value.trim() || ('Établissement '+uai),
    referent_id: document.getElementById('etabRef_'+k).value || null,
    licence_until: document.getElementById('etabLic_'+k).value || null,
    licence_note: document.getElementById('etabNote_'+k).value.trim() || null,
  };
  msg.textContent = 'Enregistrement…';
  const { error } = await sb.from('etablissements').update(row).eq('uai', uai);
  if(error){ msg.innerHTML = '<span style="color:#a83c1f;">'+escapeHtml(/referent_id/.test(error.message) ? 'ce professeur est déjà référent d\'un autre établissement' : error.message)+'</span>'; return; }
  msg.textContent = '✓';
  setTimeout(()=>{ if(msg.isConnected) msg.textContent=''; }, 2000);
  adminRefreshEtablissements();
}

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
    <div id="editProfUaiClassesBox">
      <label class="hint" style="margin:0;display:block;margin-bottom:14px;">UAI de l'établissement
        <input type="text" id="editProfUai" placeholder="ex. 0751234A" style="width:100%;margin-top:4px;padding:8px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);box-sizing:border-box;">
      </label>
      <p class="hint" style="margin:0 0 6px;">Classes rattachées (établissement) :</p>
      <div id="editProfClassesList" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;max-height:160px;overflow:auto;"></div>
    </div>
    <div id="editProfAiBox" style="display:none;background:rgba(13,91,163,.05);border-radius:10px;padding:12px 14px;margin-bottom:14px;">
      <p style="margin:0 0 6px;font-weight:600;"><span class=gicon>smart_toy</span> Intelligence artificielle : clé utilisée</p>
      <label style="display:flex;align-items:center;gap:8px;margin:4px 0;"><input type="radio" name="editProfAiKey" value="site"> Clé du site (payée par l'administrateur)</label>
      <label style="display:flex;align-items:center;gap:8px;margin:4px 0;"><input type="radio" name="editProfAiKey" value="perso"> Clé personnelle du professeur</label>
      <p class="hint" id="editProfAiInfo" style="margin:6px 0 0;"></p>
    </div>
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

<div id="inviteLinkModalOverlay" class="modal-overlay" style="display:none;" onclick="if(event.target===this) closeInviteLinkModal();">
  <div class="modal-card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;">Lien d'invitation</strong>
      <button class="modal-close" onclick="closeInviteLinkModal()"><span class=gicon>close</span></button>
    </div>
    <p class="hint" id="inviteLinkModalName" style="margin:0 0 10px;"></p>
    <input type="text" id="inviteLinkModalInput" readonly style="width:100%;padding:8px;border-radius:6px;border:1px solid rgba(28,43,57,.2);margin-bottom:10px;box-sizing:border-box;font-family:'JetBrains Mono',monospace;font-size:.82rem;" onclick="this.select()">
    <button class="btn" style="width:100%;" onclick="adminCopyInviteLink()">Copier le lien</button>
    <span class="hint" id="inviteLinkModalStatus" style="display:block;margin-top:8px;"></span>
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
  const prenom = document.getElementById('adminNewPrenom').value.trim();
  const uai = document.getElementById('adminNewUai').value.trim();
  const role = document.getElementById('adminNewRole').value;
  const status = document.getElementById('adminAccountStatus');
  if(!identifiant){ status.textContent = 'Identifiant requis.'; return; }
  const email = toAuthEmail(identifiant);
  status.textContent = 'Création en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      // Prénom et UAI enregistrés directement par la fonction serveur (pour un référent, l'UAI
      // est toujours le sien, imposé côté serveur).
      body: JSON.stringify({ email, password: password||undefined, role, nom: nom || identifiant, prenom: prenom || undefined, uai: (adminScopeUai() || uai) || undefined }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    if(data.inviteToken){
      const url = location.origin+'/invitation.html?invite='+data.inviteToken;
      status.innerHTML = `✓ Compte créé (${role}). <b>Lien d'invitation</b> (la personne choisit son propre mot de passe en cliquant dessus) :
        <a href="${url}" target="_blank">${url}</a>
        <button type="button" class="btn secondary" style="padding:2px 10px;font-size:.78rem;margin-left:6px;" onclick="navigator.clipboard.writeText('${url}').then(()=>{this.textContent='✓ Copié';setTimeout(()=>this.textContent='Copier',1500);})">Copier</button>`;
    } else {
      status.textContent = '✓ Compte créé ('+role+').';
    }
    document.getElementById('adminNewEmail').value=''; document.getElementById('adminNewPassword').value=''; document.getElementById('adminNewNom').value=''; document.getElementById('adminNewPrenom').value=''; document.getElementById('adminNewUai').value = adminScopeUai() || '';
    await adminRefreshDropdowns();
    // Le compte tout juste créé n'a encore aucune classe/UAI associé (à moins d'en avoir
    // renseigné un ci-dessus) -- si un filtre classe/établissement était déjà actif d'une
    // action précédente, il masquait ce nouveau compte dans "Déjà enregistré" alors qu'il
    // existait bien en base. Réinitialisé ici pour garantir sa visibilité immédiate.
    adminResetAccountsFilters();
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
let resetPasswordTargetUserId = null;
let editProfTargetId = null, editProfTargetName = '', editProfTargetRole = 'prof';
/* Modale "Modifier le compte" -- ouverte aussi bien pour un prof/admin que pour un élève.
   Signalé : "je croyais que dans admin je pouvais modifier les noms prénoms des élèves ?" --
   le bouton n'existait jusqu'ici que pour les comptes prof/admin. L'UAI et les classes
   rattachées (établissement) n'ont de sens que pour un prof (class_teachers) -- masqués pour
   un élève, dont la classe se gère depuis la section "Affecter" du panneau admin. */
async function openEditProfModal(id){
  editProfTargetId = id;
  document.getElementById('editProfModalOverlay').style.display='flex';
  document.getElementById('editProfStatus').textContent = '';
  document.getElementById('editProfClassesList').innerHTML = 'Chargement…';
  const { data: prof, error } = await sb.from('profiles').select('*').eq('id', id).single();
  if(error){ document.getElementById('editProfStatus').textContent = 'Erreur : '+error.message; return; }
  editProfTargetName = (profileDisplayName(prof)||prof.email||'').replace(/'/g,"\\'");
  editProfTargetRole = prof.role;
  document.getElementById('editProfNom').value = prof.nom||'';
  document.getElementById('editProfPrenom').value = prof.prenom||'';
  document.getElementById('editProfUai').value = prof.uai||'';
  document.getElementById('editProfUai').readOnly = !!adminScopeUai(); // le référent ne change pas l'UAI
  const loginIdentifiant = prof.email ? (prof.email.endsWith('@mathcollege.local') ? prof.email.slice(0, -('@mathcollege.local'.length)) : prof.email) : '(inconnu)';
  document.getElementById('editProfIdentifiantDisplay').textContent = loginIdentifiant;
  const uaiClassesBox = document.getElementById('editProfUaiClassesBox');
  if(prof.role==='eleve'){
    uaiClassesBox.style.display = 'none';
  } else {
    uaiClassesBox.style.display = '';
    await renderEditProfClasses(prof);
  }
  // Clé IA (professeurs seulement : l'administrateur utilise toujours la clé du site).
  const aiBox = document.getElementById('editProfAiBox');
  const aiBoxShown = prof.role==='prof' && !adminScopeUai(); // choix de clé : administrateur général
  aiBox.style.display = aiBoxShown ? '' : 'none';
  if(aiBoxShown){
    const { data: ai } = await sb.from('teacher_ai_settings').select('use_site_key,key_last4,ai_self,ai_students').eq('teacher_id', id).maybeSingle();
    const site = !!(ai && ai.use_site_key);
    document.querySelectorAll('input[name=editProfAiKey]').forEach(r=>{ r.checked = (r.value==='site')===site; });
    document.getElementById('editProfAiInfo').textContent =
      (ai && ai.key_last4 ? 'Clé personnelle enregistrée (…'+ai.key_last4+'). ' : 'Aucune clé personnelle enregistrée. ')
      + 'IA pour lui : '+(ai && ai.ai_self ? 'activée' : 'non')+' · IA pour ses élèves : '+(ai && ai.ai_students ? 'activée' : 'non')+'.';
  }
}
/* Classes "de l'établissement" : celles enseignées par au moins un collègue partageant le même
   UAI que ce prof (à défaut d'UAI renseigné, on affiche toutes les classes). Coche celles déjà
   liées à CE prof précisément. */
async function renderEditProfClasses(prof){
  const box = document.getElementById('editProfClassesList');
  let allClassesQ = sb.from('classes').select('id,nom,niveau').order('nom');
  if(adminScopeUai()) allClassesQ = allClassesQ.eq('uai', adminScopeUai());
  const { data: allClasses } = await allClassesQ;
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
  const patch = { nom, prenom };
  // UAI et classes rattachées (class_teachers) n'existent que pour un prof/admin -- un élève
  // n'a ni l'un ni l'autre (sa classe se gère via class_students, ailleurs dans le panneau).
  if(editProfTargetRole!=='eleve'){
    patch.uai = document.getElementById('editProfUai').value.trim() || null;
  }
  const { error } = await sb.from('profiles').update(patch).eq('id', editProfTargetId);
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  if(editProfTargetRole!=='eleve'){
    // Classes cochées/décochées : on aligne class_teachers sur l'état actuel des cases.
    const checked = new Set(Array.from(document.querySelectorAll('.editProfClassCheck:checked')).map(el=>el.value));
    const all = Array.from(document.querySelectorAll('.editProfClassCheck')).map(el=>el.value);
    const { data: myLinks } = await sb.from('class_teachers').select('class_id').eq('teacher_id', editProfTargetId);
    const current = new Set((myLinks||[]).map(l=>l.class_id));
    const toAdd = all.filter(id=>checked.has(id) && !current.has(id));
    const toRemove = all.filter(id=>!checked.has(id) && current.has(id));
    if(toAdd.length) await sb.from('class_teachers').insert(toAdd.map(class_id=>({class_id, teacher_id: editProfTargetId})));
    if(toRemove.length) await sb.from('class_teachers').delete().eq('teacher_id', editProfTargetId).in('class_id', toRemove);
  }
  if(editProfTargetRole==='prof' && !adminScopeUai()){
    const choice = document.querySelector('input[name=editProfAiKey]:checked');
    if(choice){
      const { error: aiErr } = await sb.rpc('admin_set_teacher_site_key', {p_teacher: editProfTargetId, p_allowed: choice.value==='site'});
      if(aiErr){ status.textContent = 'Erreur (clé IA) : '+aiErr.message; return; }
    }
  }
  status.textContent = '✓ Enregistré';
  await adminRefreshListings();
  if(typeof iaLoadAdminTeachers==='function') iaLoadAdminTeachers('adminAiTeachers');
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
function closeInviteLinkModal(){
  document.getElementById('inviteLinkModalOverlay').style.display='none';
}
async function adminGenerateInviteLink(userId, name){
  const status = document.getElementById('adminAccBulkStatus');
  status.textContent = 'Génération du lien en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'create-invitation', userId }),
    });
    const data = await res.json();
    status.textContent = '';
    if(data.error){ alert("Erreur : "+data.error); return; }
    const url = location.origin+'/invitation.html?invite='+data.token;
    document.getElementById('inviteLinkModalName').textContent = 'Compte : '+name;
    document.getElementById('inviteLinkModalInput').value = url;
    document.getElementById('inviteLinkModalStatus').textContent = '';
    document.getElementById('inviteLinkModalOverlay').style.display='flex';
  }catch(err){ status.textContent = ''; alert('Erreur réseau.'); }
}
async function adminGenerateAllInviteLinks(){
  const status = document.getElementById('adminAccBulkStatus');
  const targets = (adminAccountsCache.eleves||[]).filter(p=>p.must_change_password);
  if(!targets.length){ status.textContent = 'Aucun élève en attente (tous ont déjà changé leur mot de passe).'; return; }
  if(!(await niceConfirm(`Générer un lien d'invitation pour ${targets.length} élève(s) n'ayant pas encore changé leur mot de passe ?`))) return;
  const { data:{ session } } = await sb.auth.getSession();
  // Correspondance élève -> classe, à partir de ce qui est déjà en mémoire (pas de nouvelle
  // requête) -- même logique que adminRenderAccountsListing.
  const classById = new Map((adminAccountsCache.classesList||[]).map(c=>[c.id, c]));
  const studentClassId = new Map();
  (adminAccountsCache.classStudents||[]).forEach(r=>{ if(!studentClassId.has(r.student_id)) studentClassId.set(r.student_id, r.class_id); });
  const loginIdentifiant = email => email ? (email.endsWith('@mathcollege.local') ? email.slice(0, -('@mathcollege.local'.length)) : email) : '(inconnu)';

  const results = []; // {classe, nom, identifiant, url}
  let ok=0, fail=0;
  for(let i=0;i<targets.length;i++){
    const p = targets[i];
    status.textContent = `Génération en cours… (${i+1}/${targets.length})`;
    try{
      const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
        body: JSON.stringify({ action:'create-invitation', userId:p.id }),
      });
      const data = await res.json();
      if(data.error){ fail++; continue; }
      ok++;
      const cls = classById.get(studentClassId.get(p.id));
      results.push({ classe: cls ? cls.nom : 'Sans classe', nom: profileDisplayName(p)||'(sans nom)', identifiant: loginIdentifiant(p.email), url: location.origin+'/invitation.html?invite='+data.token });
    }catch(err){ fail++; }
  }
  status.innerHTML = `✓ ${ok} lien(s) généré(s)` + (fail?`, ${fail} échec(s).`:'.');
  renderInviteLinksTable(results, 'Liens d\'invitation générés (triés par classe)');
}
/* Recharge et affiche les liens d'invitation DÉJÀ générés (non utilisés, non expirés) depuis
   la base -- signalé : "pourquoi les liens déjà créés n'apparaissent plus quand je
   rafraîchis la page ?" (le tableau n'était jusqu'ici qu'en mémoire, jamais recalculé). */
async function adminShowExistingInviteLinks(){
  const status = document.getElementById('adminAccBulkStatus');
  status.textContent = 'Chargement des liens existants…';
  const { data: invitations, error } = await sb.from('invitations')
    .select('token, user_id, expires_at')
    .is('used_at', null)
    .gt('expires_at', new Date().toISOString());
  status.textContent = '';
  if(error){ alert("Erreur : "+error.message); return; }
  if(!invitations || !invitations.length){ status.textContent = 'Aucun lien en attente actuellement.'; document.getElementById('adminInviteLinksTable').innerHTML=''; return; }

  const eleveById = new Map((adminAccountsCache.eleves||[]).map(p=>[p.id, p]));
  const classById = new Map((adminAccountsCache.classesList||[]).map(c=>[c.id, c]));
  const studentClassId = new Map();
  (adminAccountsCache.classStudents||[]).forEach(r=>{ if(!studentClassId.has(r.student_id)) studentClassId.set(r.student_id, r.class_id); });
  const loginIdentifiant = email => email ? (email.endsWith('@mathcollege.local') ? email.slice(0, -('@mathcollege.local'.length)) : email) : '(inconnu)';

  const results = invitations.map(inv=>{
    const p = eleveById.get(inv.user_id);
    const cls = classById.get(studentClassId.get(inv.user_id));
    return { classe: cls ? cls.nom : 'Sans classe', nom: p ? (profileDisplayName(p)||'(sans nom)') : '(élève introuvable)', identifiant: p ? loginIdentifiant(p.email) : '?', url: location.origin+'/invitation.html?invite='+inv.token };
  });
  renderInviteLinksTable(results, `Liens d'invitation en attente (${results.length}, triés par classe)`);
}
/* Rendu commun du tableau des liens d'invitation, regroupés par classe -- réutilisé par la
   génération en masse et le rechargement depuis la base. */
function renderInviteLinksTable(results, titre){
  results.sort((a,b)=> a.classe.localeCompare(b.classe) || a.nom.localeCompare(b.nom));
  const tableEl = document.getElementById('adminInviteLinksTable');
  if(!results.length){ tableEl.innerHTML=''; return; }
  let html = `<p class="example-title" style="margin:10px 0 6px;">${escapeHtml(titre)}</p>`;
  let currentClasse = null;
  results.forEach(r=>{
    if(r.classe!==currentClasse){
      if(currentClasse!==null) html += '</tbody></table>';
      currentClasse = r.classe;
      html += `<div style="margin:10px 0 4px;font-weight:700;">${escapeHtml(currentClasse)}</div>`;
      html += '<table class="sup-table"><thead><tr><th>Nom</th><th>Identifiant</th><th>Lien</th></tr></thead><tbody>';
    }
    html += `<tr><td>${escapeHtml(r.nom)}</td><td style="font-family:'JetBrains Mono',monospace;">${escapeHtml(r.identifiant)}</td><td><a href="${r.url}" target="_blank">${r.url}</a></td></tr>`;
  });
  html += '</tbody></table>';
  tableEl.innerHTML = html;
}
function adminCopyInviteLink(){
  const input = document.getElementById('inviteLinkModalInput');
  input.select();
  navigator.clipboard.writeText(input.value).then(()=>{
    document.getElementById('inviteLinkModalStatus').textContent = '✓ Lien copié.';
  }).catch(()=>{
    document.getElementById('inviteLinkModalStatus').textContent = 'Sélectionné -- copiez avec Ctrl/Cmd+C.';
  });
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
  const uai = adminScopeUai() || document.getElementById('adminNewClassUai').value.trim();
  const status = document.getElementById('adminClassStatus');
  if(!nom){ status.textContent = 'Le nom est requis.'; return; }
  if(!uai){ status.textContent = "L'UAI de l'établissement est requis (une classe doit être rattachée à un établissement)."; return; }
  // L'établissement doit exister AVANT la classe (classes.uai référence etablissements.uai) --
  // celui d'un référent existe forcément.
  if(!adminScopeUai()){
    const { data: existingEtab } = await sb.from('etablissements').select('uai').eq('uai', uai).maybeSingle();
    if(!existingEtab){
      const { error: etabErr } = await sb.from('etablissements').insert({ uai, nom: 'Établissement '+uai });
      if(etabErr){ status.textContent = "Erreur (établissement) : "+etabErr.message; return; }
    }
  }
  const { error } = await sb.from('classes').insert({ nom, niveau, uai });
  status.textContent = error ? "Erreur : "+error.message : '✓ Classe créée.';
  if(!error){ document.getElementById('adminNewClassNom').value=''; document.getElementById('adminNewClassUai').value = adminScopeUai() || ''; await adminRefreshDropdowns(); await loadMyClasses(); }
}
async function adminUpdateClassNiveauUai(classId){
  const niveau = document.getElementById('classNiveau_'+classId).value;
  const uai = adminScopeUai() || document.getElementById('classUai_'+classId).value.trim();
  const status = document.getElementById('classSaveStatus_'+classId);
  if(uai && !adminScopeUai()){
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
    if(classeFilter==='__sans_classe'){ if(classIdsOf(p).length>0) return false; }
    else if(classeFilter && !classIdsOf(p).includes(classeFilter)) return false;
    if(uaiFilter && !uaisOf(p).includes(uaiFilter)) return false;
    if(search){
      const hay = ((profileDisplayName(p)||'')+' '+loginIdentifiant(p.email)).toLowerCase();
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
    return `<span class="sup-score-pill" style="background:${color}1A;color:${color};">${label}${dateStr?' · '+dateStr:''}</span>`;
  };
  const lastLoginCell = p => {
    const t = lastLoginMap.get(p.id);
    if(!t) return '<span class="hint">jamais connecté</span>';
    const d = new Date(t);
    return `<span class="hint">${d.toLocaleDateString('fr-FR')} à ${d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</span>`;
  };
  const rowHTML = p => {
    const safeName = escapeHtml(profileDisplayName(p)||p.email||'').replace(/'/g,"\\'");
    const editBtn = `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="openEditProfModal('${p.id}')"><span class=gicon>build</span></button>`;
    const categoryBtn = (p.role==='prof' && !adminScopeUai()) ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminChangeCategoryPrompt('${p.id}','${safeName}')"><span class=gicon>workspace_premium</span></button>` : '';
    const inviteBtn = p.must_change_password ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminGenerateInviteLink('${p.id}','${safeName}')"><span class=gicon>link</span></button>` : '';
    const rowBg = !lastLoginMap.get(p.id) ? 'background:rgba(28,43,57,.02);' : '';
    return `<tr style="${rowBg}">
      <td style="width:24px;"><input type="checkbox" class="adminAccCheckbox" value="${p.id}"></td>
      <td style="font-weight:600;">${escapeHtml(profileDisplayName(p)||'(sans nom)')}${p.role==='admin'?' <span class="hint">[admin]</span>':''}</td>
      <td style="font-family:'JetBrains Mono',monospace;font-size:.82rem;">${escapeHtml(loginIdentifiant(p.email))}</td>
      <td>${subscriptionBadge(p)}</td>
      <td>${lastLoginCell(p)}</td>
      <td style="text-align:right;white-space:nowrap;">
        ${editBtn}${categoryBtn}${inviteBtn}
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminChangeIdentifiantPrompt('${p.id}','${safeName}')"><span class=gicon>edit</span></button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminResetPasswordPrompt('${p.id}','${safeName}')"><span class=gicon>key</span></button>
        <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="adminDeleteUser('${p.id}', this)"><span class=gicon>delete</span></button>
      </td>
    </tr>`;
  };
  const accordionTableHTML = (id, color, icon, title, list, total) => `
    <div class="nb-accordion-section">
      <button type="button" class="nb-accordion-header" style="--acc-color:${color};--acc-bg:${color}0D;" onclick="toggleNbAccordion('${id}')">
        <span class="gicon nb-accordion-chevron open">expand_more</span>
        <span class="gicon">${icon}</span><span>${title}</span>
        <span class="nb-accordion-count">${list.length}${list.length!==total?'/'+total:''}</span>
      </button>
      <div class="nb-accordion-body open" id="${id}">
        ${list.length ? `<table class="sup-table"><thead><tr><th></th><th>Nom</th><th>Identifiant</th><th>Statut</th><th>Dernière connexion</th><th style="text-align:right;">Actions</th></tr></thead><tbody>${list.map(rowHTML).join('')}</tbody></table>` : '<div class="hint">aucun</div>'}
      </div>
    </div>
  `;
  accEl.innerHTML = accordionTableHTML('accComptesProfs', '#0C5BA0', 'school', 'Profs/admins', filteredProfs, profs.length)
    + accordionTableHTML('accComptesEleves', '#FF8208', 'group', 'Élèves', filteredEleves, eleves.length);
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
  const { data: profs } = await sb.from('profiles').select('id,nom,prenom,role').in('role',['prof','admin']);
  const { data: eleves } = await sb.from('profiles').select('id,nom,prenom').eq('role','eleve');
  const scope = adminScopeUai();
  let classesQ = sb.from('classes').select('id,nom,niveau').order('nom');
  if(scope) classesQ = classesQ.eq('uai', scope);
  const { data: classesList } = await classesQ;
  const fillSelect = (id, items, label)=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = `<option value="">${label}...</option>` + items.map(it=>`<option value="${it.id}">${it.label}</option>`).join('');
  };
  fillSelect('adminAssignTeacherSelect', (profs||[]).map(p=>({id:p.id, label:escapeHtml(profileDisplayName(p)||p.id)+(p.role==='admin'?' (admin)':'')})), 'Choisir un prof');
  fillSelect('adminAssignStudentSelect', (eleves||[]).map(p=>({id:p.id, label:escapeHtml(profileDisplayName(p)||p.id)})), 'Choisir un élève');
  fillSelect('adminAssignTeacherClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  fillSelect('adminAssignStudentClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  await adminRefreshListings();
}
let adminAccountsCache = { profs:[], eleves:[], lastLoginMap:new Map(), classesList:[], classTeachers:[], classStudents:[], etablissements:[] };
async function adminRefreshListings(){
  const scope = adminScopeUai();
  if(!scope){ await adminRefreshBugReports(); await adminRefreshAiUsage(); adminRefreshEtablissements(); }
  await adminRefreshSignupRequests();
  const { data: profs } = await sb.from('profiles').select('id,nom,prenom,email,role,subscription_status,subscription_expires_at,must_change_password').in('role',['prof','admin']).order('nom');
  const { data: eleves } = await sb.from('profiles').select('id,nom,prenom,email,role,must_change_password').eq('role','eleve').order('nom');
  // Date de dernière connexion (auth.users, normalement inaccessible via RLS classique) --
  // exposée uniquement à un admin via une fonction SECURITY DEFINER dédiée.
  const { data: lastSignIns } = await sb.rpc('get_last_sign_in_times');
  let classesQ = sb.from('classes').select('id,nom,niveau,uai').order('nom');
  if(scope) classesQ = classesQ.eq('uai', scope);
  const { data: classesList } = await classesQ;
  const { data: classTeachers } = await sb.from('class_teachers').select('class_id, teacher_id, profiles(nom,prenom,email)');
  const { data: classStudents } = await sb.from('class_students').select('class_id, student_id, profiles(nom,prenom,email)');
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
    classeSelect.innerHTML = '<option value="">Toutes les classes</option><option value="__sans_classe">⚠ Sans classe</option>' + adminAccountsCache.classesList.map(c=>`<option value="${c.id}">${escapeHtml(c.nom)} (${escapeHtml(c.niveau)})</option>`).join('');
    if(adminAccountsCache.classesList.some(c=>c.id===prev)) classeSelect.value = prev;
  }
  const uaiSelect = document.getElementById('adminAccFilterUai');
  if(uaiSelect){
    const prev = uaiSelect.value;
    uaiSelect.innerHTML = '<option value="">Tous les établissements</option>' + adminAccountsCache.etablissements.map(e=>`<option value="${escapeHtml(e.uai)}">${escapeHtml(e.nom)} (${escapeHtml(e.uai)})</option>`).join('');
    if(adminAccountsCache.etablissements.some(e=>e.uai===prev)) uaiSelect.value = prev;
  }
  adminRenderAccountsListing();
  adminShowExistingInviteLinks();
  const { data: permisSessionsList } = await sb.from('permis_rapporteur_sessions').select('id,code,classe_id,cloturee,created_at').order('created_at',{ascending:false});
  const classesEl = document.getElementById('adminClassesListing');
  if(classesEl){
    if(!classesList || !classesList.length){ classesEl.textContent = 'Aucune classe créée pour l\'instant.'; return; }
    classesEl.innerHTML = classesList.map((c,idx)=>{
      const profsHere = (classTeachers||[]).filter(r=>r.class_id===c.id);
      const elevesHere = (classStudents||[]).filter(r=>r.class_id===c.id).map(r=>r.profiles && (profileDisplayName(r.profiles)||r.profiles.email)).filter(Boolean);
      const profsHtml = profsHere.length ? profsHere.map(r=>{
        const label = escapeHtml((r.profiles && (profileDisplayName(r.profiles)||r.profiles.email))||'?');
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
      const color = c.niveau==='6e' ? '#FF8208' : '#0C5BA0';
      const accId = 'accClasse'+idx;
      return `<div class="nb-accordion-section">
        <button type="button" class="nb-accordion-header" style="--acc-color:${color};--acc-bg:${color}0D;" onclick="toggleNbAccordion('${accId}')">
          <span class="gicon nb-accordion-chevron">expand_more</span>
          <span class="gicon">school</span><span>${escapeHtml(c.nom)}</span>
          <span class="nb-accordion-count">${c.niveau} · ${elevesHere.length} élève${elevesHere.length>1?'s':''}</span>
        </button>
        <div class="nb-accordion-body" id="${accId}">
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:6px 0;">
            <label class="hint" style="margin:0;">Niveau : <select id="classNiveau_${c.id}"><option value="6e" ${c.niveau==='6e'?'selected':''}>6e</option><option value="5e" ${c.niveau==='5e'?'selected':''}>5e</option></select></label>
            <label class="hint" style="margin:0;">UAI : <input type="text" id="classUai_${c.id}" value="${escapeHtml(c.uai||'')}" style="width:110px;" ${scope?'readonly':''}></label>
            <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;" onclick="adminUpdateClassNiveauUai('${c.id}')">Enregistrer</button>
            <span class="hint" id="classSaveStatus_${c.id}" style="margin:0;"></span>
          </div>
          Profs : ${profsHtml}<br>
          Élèves (${elevesHere.length}) : ${elevesHere.map(escapeHtml).join(', ')||'aucun'}
          <div style="margin-top:6px;padding:8px;background:rgba(31,58,92,.05);border-radius:6px;">
            <b style="font-size:.85rem;"><span class=gicon>school</span> Permis Rapporteur</b>
            <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;float:right;" onclick="adminDemarrerPermisSession('${c.id}')">+ Nouvelle session</button>
            ${sessionsHtml}
          </div>
          <div style="margin-top:10px;text-align:right;">
            <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;color:#a83c1f;border:1px solid #a83c1f;" onclick="adminSupprimerClasse('${c.id}','${escapeHtml(c.nom).replace(/'/g,"\\'")}')"><span class=gicon>delete</span> Supprimer cette classe</button>
          </div>
        </div>
      </div>`;
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
/* Suppression d'une classe -- bloquée dès qu'il reste le moindre historique (résultats,
   sessions, devoirs, cahier), plutôt qu'une suppression en cascade qui l'effacerait
   silencieusement : certaines des tables concernées (permis_rapporteur_sessions,
   permis_rapporteur_resultats, ceb_results) référencent classes en NO ACTION (pas de
   suppression en cascade côté base) et n'ont même pas de politique de sécurité autorisant leur
   suppression depuis le client -- la suppression de la classe échouerait de toute façon dans
   ce cas, avec une erreur peu claire pour l'admin. Ce contrôle donne un message explicite
   plutôt que de laisser échouer la requête. Signalé : "comment un administrateur peut-il
   supprimer des classes ?" -- cette fonctionnalité n'existait pas du tout jusqu'ici. */
async function adminSupprimerClasse(classId, className){
  if(!(await niceConfirm(`Supprimer définitivement la classe « ${className} » ? Les comptes élèves et profs ne sont pas supprimés, seulement leur rattachement à cette classe.`))) return;
  const historyChecks = [
    {table:'permis_rapporteur_sessions', col:'classe_id', label:'des sessions de Permis Rapporteur'},
    {table:'permis_rapporteur_resultats', col:'classe_id', label:'des résultats de Permis Rapporteur'},
    {table:'ceb_results', col:'class_id', label:'des résultats du Compte est bon'},
    {table:'cm_results', col:'class_id', label:'des résultats d\'automatismes'},
    {table:'devoirs', col:'class_id', label:'des devoirs'},
    {table:'cahier_entries', col:'class_id', label:'des entrées de cahier'},
  ];
  const present = [];
  for(const h of historyChecks){
    const { data } = await sb.from(h.table).select('id').eq(h.col, classId).limit(1);
    if(data && data.length) present.push(h.label);
  }
  if(present.length){
    await niceAlert(`Impossible de supprimer cette classe : elle a encore ${present.join(', ')}. Cette classe a été utilisée -- son historique doit être conservé.`);
    return;
  }
  const { error } = await sb.from('classes').delete().eq('id', classId);
  if(error){ await niceAlert("Échec de la suppression : "+error.message); return; }
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
  const STATUS_COLORS = {'nouveau':'#0C5BA0', 'en cours':'#C77D1E', 'résolu':'#1F7A4D'};
  el.innerHTML = data.map((r,idx)=>{
    const name = (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Utilisateur inconnu';
    const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
    const statusColor = STATUS_COLORS[r.status] || 'var(--ink-soft)';
    const typeTag = r.report_type==='suggestion' ? '<span style="background:#FFF4E5;color:#B26A00;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;"><span class=gicon>lightbulb</span> Suggestion</span>' : '<span style="background:#FDEAEA;color:#B23A3A;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;"><span class=gicon>bug_report</span> Bug</span>';
    const accId = 'accBug'+idx;
    return `<div class="nb-accordion-section">
      <button type="button" class="nb-accordion-header" style="--acc-color:${statusColor};--acc-bg:${statusColor}0D;" onclick="toggleNbAccordion('${accId}')">
        <span class="gicon nb-accordion-chevron">expand_more</span>
        ${typeTag}<span>${escapeHtml(r.section)}${r.chapitre?' · '+escapeHtml(r.chapitre):''}</span>
        <span class="nb-accordion-count">${escapeHtml(name)} · ${date}</span>
      </button>
      <div class="nb-accordion-body" id="${accId}">
        <div style="margin:6px 0;white-space:pre-wrap;">${escapeHtml(r.message)}</div>
        ${r.build_version ? `<p class="hint" style="margin:0 0 8px;">build ${escapeHtml(r.build_version)}</p>` : ''}
        <label class="hint" style="display:inline-flex;align-items:center;gap:6px;">
          Statut :
          <select onchange="adminUpdateBugStatus('${r.id}', this.value)" style="color:${statusColor};font-weight:600;">
            ${STATUS_OPTIONS.map(s=>`<option value="${s}" ${s===r.status?'selected':''}>${s}</option>`).join('')}
          </select>
        </label>
      </div>
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

/* Coût estimé d'un appel IA à partir des tokens consommés (data.usage renvoyé par Anthropic,
   journalisé depuis le 23/09/2026). Retourne null si les tokens ne sont pas connus (appels
   antérieurs à cette date) -- à distinguer d'un coût de 0. */
function aiUsageCallCost(row){
  if(row.input_tokens==null || row.output_tokens==null) return null;
  return row.input_tokens/1e6*AI_USAGE_PRICE_INPUT_PER_1M + row.output_tokens/1e6*AI_USAGE_PRICE_OUTPUT_PER_1M;
}
/* knownCalls = nombre d'appels ayant servi à calculer costSum -- distingue "coût connu de 0"
   (knownCalls>0) de "aucun appel avec tokens connus" (knownCalls===0, où costSum vaut 0 par
   construction mais ne doit PAS s'afficher comme "$0.000", trompeur : on ne sait juste pas). */
function aiUsageFormatCost(costSum, knownCalls){
  return knownCalls ? '$'+costSum.toFixed(costSum<0.01?4:3) : '<span class="hint">inconnu</span>';
}
/* Panneau "Usage IA" -- signalé : "Est-ce que j'ai un endroit pour voir qui a utilisé l'IA et
   le coût engendré ?". Un seul jeton d'API Anthropic (côté serveur, dans ai-proxy) sert à tout
   le monde -- ce panneau sert à suivre qui l'utilise et estimer ce que ça coûte. */
async function adminRefreshAiUsage(){
  if(typeof iaLoadAdminTeachers==='function') iaLoadAdminTeachers('adminAiTeachers');
  const elSummary = document.getElementById('adminAiUsageSummary');
  const elByUser = document.getElementById('adminAiUsageByUser');
  const elByFeature = document.getElementById('adminAiUsageByFeature');
  if(!elSummary) return;
  elSummary.textContent = 'Chargement…';
  elByUser.innerHTML = ''; elByFeature.innerHTML = '';
  const { data, error } = await sb.from('ai_usage_log')
    .select('user_id,feature,chapitre,niveau,input_tokens,output_tokens,created_at,key_source,billed_to,profiles:profiles!ai_usage_log_user_id_fkey(nom,prenom,email),payeur:profiles!ai_usage_log_billed_to_fkey(nom,prenom,email)')
    .order('created_at', {ascending:false})
    .limit(5000);
  if(error){ elSummary.textContent = 'Erreur : '+error.message; return; }
  if(!data || !data.length){ elSummary.innerHTML = '<div class="hint">Aucun appel IA enregistré pour l\'instant.</div>'; return; }

  let totalCalls = data.length, totalCost = 0, callsCoutInconnu = 0;
  const byUser = new Map(), byFeature = new Map();
  for(const row of data){
    const cost = aiUsageCallCost(row);
    if(cost==null) callsCoutInconnu++; else totalCost += cost;

    const uKey = row.user_id;
    if(!byUser.has(uKey)) byUser.set(uKey, { profile:row.profiles, calls:0, cost:0, coutInconnu:0 });
    const u = byUser.get(uKey);
    u.calls++; if(cost==null) u.coutInconnu++; else u.cost += cost;

    const fKey = row.feature || '(non précisé)';
    if(!byFeature.has(fKey)) byFeature.set(fKey, { calls:0, cost:0, coutInconnu:0 });
    const f = byFeature.get(fKey);
    f.calls++; if(cost==null) f.coutInconnu++; else f.cost += cost;
  }

  const totalConnus = totalCalls - callsCoutInconnu;
  elSummary.innerHTML = `<table class="sup-table">
    <tbody>
      <tr><td>Nombre total d'appels</td><td style="font-weight:700;">${totalCalls}</td></tr>
      <tr><td>Coût total estimé</td><td style="font-weight:700;">${aiUsageFormatCost(totalCost, totalConnus)}${callsCoutInconnu?` <span class="hint">(+ ${callsCoutInconnu} appel(s) à coût inconnu, non comptés)</span>`:''}</td></tr>
    </tbody>
  </table>${!totalConnus ? `<p class="hint" style="margin:8px 0 0;">Le suivi des tokens vient d'être activé (déploiement du build 2026-08-19.633) : aucun appel n'a encore eu lieu depuis. Les ${totalCalls} appel(s) listé(s) datent tous d'avant, d'où le coût inconnu -- ce n'est pas un bug, il suffit d'attendre une prochaine utilisation de l'assistant IA pour voir apparaître des coûts.</p>` : ''}`;

  const userRows = [...byUser.values()].sort((a,b)=> b.cost - a.cost || b.calls - a.calls);
  elByUser.innerHTML = `<table class="sup-table">
    <thead><tr><th>Utilisateur</th><th style="text-align:right;">Appels</th><th style="text-align:right;">Coût estimé</th></tr></thead>
    <tbody>${userRows.map(u=>{
      const name = (u.profile && (profileDisplayName(u.profile) || u.profile.email)) || 'Utilisateur inconnu';
      return `<tr>
        <td style="font-weight:600;">${escapeHtml(name)}</td>
        <td style="text-align:right;">${u.calls}</td>
        <td style="text-align:right;">${aiUsageFormatCost(u.cost, u.calls-u.coutInconnu)}${u.coutInconnu?` <span class="hint">(+${u.coutInconnu} inconnu)</span>`:''}</td>
      </tr>`;
    }).join('')}</tbody>
  </table>`;

  // Qui paie : clé du site (et pour qui) ou clé personnelle d'un professeur.
  const byPayer = new Map();
  for(const row of data){
    const who = (row.payeur && (profileDisplayName(row.payeur) || row.payeur.email)) || '—';
    const k = (row.key_source==='prof' ? 'Clé personnelle de ' : 'Clé du site · ') + who;
    if(!byPayer.has(k)) byPayer.set(k, {calls:0, cost:0, coutInconnu:0});
    const p = byPayer.get(k), cost = aiUsageCallCost(row);
    p.calls++; if(cost==null) p.coutInconnu++; else p.cost += cost;
  }
  const elByPayer = document.getElementById('adminAiUsageByPayer');
  if(elByPayer) elByPayer.innerHTML = `<table class="sup-table">
    <thead><tr><th>Payé par</th><th style="text-align:right;">Appels</th><th style="text-align:right;">Coût estimé</th></tr></thead>
    <tbody>${[...byPayer.entries()].sort((a,b)=>b[1].cost-a[1].cost || b[1].calls-a[1].calls).map(([k,p])=>`<tr>
        <td style="font-weight:600;">${escapeHtml(k)}</td>
        <td style="text-align:right;">${p.calls}</td>
        <td style="text-align:right;">${aiUsageFormatCost(p.cost, p.calls-p.coutInconnu)}${p.coutInconnu?` <span class="hint">(+${p.coutInconnu} inconnu)</span>`:''}</td>
      </tr>`).join('')}</tbody>
  </table>`;

  const featureRows = [...byFeature.entries()].sort((a,b)=> b[1].cost - a[1].cost || b[1].calls - a[1].calls);
  elByFeature.innerHTML = `<table class="sup-table">
    <thead><tr><th>Fonctionnalité</th><th style="text-align:right;">Appels</th><th style="text-align:right;">Coût estimé</th></tr></thead>
    <tbody>${featureRows.map(([feature,f])=>`<tr>
        <td style="font-weight:600;">${escapeHtml(feature)}</td>
        <td style="text-align:right;">${f.calls}</td>
        <td style="text-align:right;">${aiUsageFormatCost(f.cost, f.calls-f.coutInconnu)}${f.coutInconnu?` <span class="hint">(+${f.coutInconnu} inconnu)</span>`:''}</td>
      </tr>`).join('')}</tbody>
  </table>`;
}

/* Sépare "NOM Prénom" (convention des listes d'élèves collées ici, ex. export Pronote) en
   nom/prénom -- signalé : "l'import est merdique, tous les élèves ont NOM Prénom dans le champ
   NOM". Le nom de famille est la suite de mots en MAJUSCULES en début de chaîne (convention
   d'écriture des rosters administratifs, y compris pour les noms composés, ex. "KIESGEN DE
   RICHTER Zoé"), le reste est le prénom. Repli sur l'ancien comportement (tout dans nom, prénom
   vide) si aucune séparation fiable n'est trouvée (ex. "Jean Dupont" sans majuscules).
   Vérifiée sur les 123 comptes élèves déjà en base avant application (aucune ambiguïté). */
function splitNomPrenom(full){
  const tokens = full.trim().split(/\s+/);
  let i = 0;
  while(i < tokens.length && tokens[i].toUpperCase()===tokens[i] && /[A-ZÀ-Ý]/.test(tokens[i])) i++;
  if(i===0 || i>=tokens.length) return { nom: full, prenom: '' };
  return { nom: tokens.slice(0,i).join(' '), prenom: tokens.slice(i).join(' ') };
}
async function adminBulkCreateStudents(){
  const raw = document.getElementById('adminBulkStudents').value;
  const status = document.getElementById('adminBulkStatus');
  const lines = raw.split('\n').map(l=>l.trim()).filter(Boolean);
  if(!lines.length){ status.textContent = 'Collez au moins une ligne (Nom Prénom, identifiant, [mot de passe facultatif], UAI, classe).'; return; }
  const { data:{ session } } = await sb.auth.getSession();
  let ok=0, fail=0; const errors=[]; const invites=[]; // {nom, url} -- pour le tableau récapitulatif
  const classCache = {}; // clé "uai|nom" -- évite de rechercher/créer la même classe à chaque ligne, distingue 2 classes de même nom dans des établissements différents
  const etabCache = new Set(); // UAI déjà vérifiés/créés dans etablissements cette session
  for(let i=0;i<lines.length;i++){
    status.textContent = `Création en cours… (${i+1}/${lines.length})`;
    const parts = lines[i].split('\t').map(s=>s.trim());
    if(parts.length<2){ fail++; errors.push(`Ligne ${i+1} : format invalide (au moins Nom Prénom et identifiant attendus, séparés par des tabulations)`); continue; }
    const [nomPrenomFull, identifiant, password, uaiCol, classeNom] = parts;
    const uai = adminScopeUai() || uaiCol; // référent : toujours son établissement
    const { nom, prenom } = splitNomPrenom(nomPrenomFull);
    const email = toAuthEmail(identifiant);
    try{
      const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
        body: JSON.stringify({ email, password: password||undefined, role:'eleve', nom, prenom: prenom || undefined, uai: uai || undefined }),
      });
      const data = await res.json();
      if(data.error){ fail++; errors.push(`${nomPrenomFull} (${identifiant}) : ${data.error}`); continue; }
      ok++;
      if(data.inviteToken) invites.push({ nom: nomPrenomFull, url: location.origin+'/invitation.html?invite='+data.inviteToken });
      // La fonction serveur ne renvoie pas d'id exploitable directement (même constat que
      // pour la création à l'unité, adminCreateAccount) -- retrouve le profil fraîchement
      // créé par son e-mail.
      const { data: prof } = await sb.from('profiles').select('id').eq('email', email).single();
      if(!prof) continue; // ne devrait pas arriver (le compte vient d'être créé avec succès), sécurité
      // Prénom et UAI : déjà enregistrés par la fonction serveur.
      // Une classe doit être rattachée à un établissement (signalé : "les classes doivent
      // être rattachées à un UAI. Dans un UAI, on trouve les profs et les classes puis les
      // élèves"). Sans UAI fourni sur cette ligne, on ne peut pas créer/rattacher la classe
      // correctement -- on l'ignore plutôt que de créer une classe "orpheline".
      if(classeNom && uai){
        // L'établissement doit exister AVANT la classe (classes.uai référence
        // etablissements.uai) -- créé automatiquement s'il est absent.
        if(!etabCache.has(uai) && !adminScopeUai()){
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
        errors.push(`${nomPrenomFull} : classe "${classeNom}" ignorée (UAI manquant sur cette ligne -- une classe doit être rattachée à un établissement)`);
      }
    }catch(err){ fail++; errors.push(`${nomPrenomFull} (${identifiant}) : erreur réseau`); }
  }
  let html = `✓ ${ok} compte(s) créé(s)` + (errors.length?`, <span class=gicon>warning</span> ${fail?fail+' échec(s)':'avertissement(s)'} :<br>`+errors.map(escapeHtml).join('<br>') : '.');
  if(invites.length){
    html += `<div style="margin-top:10px;"><b>Liens d'invitation à distribuer aux élèves</b> (chacun choisit son propre mot de passe en cliquant dessus) :</div>
      <table class="sup-table" style="margin-top:6px;">
        <thead><tr><th>Nom</th><th>Lien</th></tr></thead>
        <tbody>${invites.map(i=>`<tr><td>${escapeHtml(i.nom)}</td><td><a href="${i.url}" target="_blank">${i.url}</a></td></tr>`).join('')}</tbody>
      </table>`;
  }
  status.innerHTML = html;
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
  el.innerHTML = `<table class="sup-table">
    <thead><tr><th>Nom</th><th>Email</th><th>Établissement</th><th>Date</th><th style="text-align:right;">Actions</th></tr></thead>
    <tbody>
    ${requests.map(r=>{
      const safeName = escapeHtml([r.prenom,r.nom].filter(Boolean).join(' ')||r.email||'').replace(/'/g,"\\'");
      const etabNom = r.etablissements ? r.etablissements.nom : null;
      const dateStr = r.created_at ? new Date(r.created_at).toLocaleDateString('fr-FR') : '';
      return `<tr>
        <td style="font-weight:600;">${escapeHtml([r.prenom,r.nom].filter(Boolean).join(' ')||'(sans nom)')}</td>
        <td style="color:var(--ink-soft);">${escapeHtml(r.email||'')}</td>
        <td style="font-family:'JetBrains Mono',monospace;font-size:.82rem;">
          UAI ${escapeHtml(r.uai||'?')}${etabNom ? ' · '+escapeHtml(etabNom) : ' <span style="color:#a83c1f;">(à vérifier)</span>'}
        </td>
        <td style="color:var(--ink-soft);white-space:nowrap;">${dateStr}</td>
        <td style="text-align:right;white-space:nowrap;">
          <button class="btn" style="font-size:.78rem;padding:5px 10px;" onclick="adminApproveSignup('${r.id}','${safeName}')">✓ Approuver</button>
          <button class="btn secondary" style="font-size:.78rem;padding:5px 10px;color:#a83c1f;" onclick="adminRejectSignup('${r.id}','${safeName}')"><span class=gicon>close</span> Rejeter</button>
        </td>
      </tr>`;
    }).join('')}
    </tbody>
  </table>`;
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

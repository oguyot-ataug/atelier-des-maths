/* =====================================================================
   famille.js -- Offre Famille : inscription du parent, Espace famille

   Demandé : "un particulier type famille pourrait acheter aussi un accès pour les cours et
   mettre sa propre clé IA", "Certifié au départ que les enfants ne sont pas scolarisés dans
   l'établissement du concepteur du site", "1 niveau/2 niveaux plus que nombre d'enfants",
   "IA : clé personnelle du parent. C'est le parent qui gère les comptes des enfants".

   - Le parent crée son compte ici (déclaration sur l'honneur + CGV), puis gère jusqu'à 4
     comptes enfants (rôle eleve), paie un accès par niveaux pour l'année scolaire (paiement
     unique Stripe, sans reconduction), suit les résultats et règle l'IA de chaque enfant.
   - Toutes les écritures passent par la fonction serveur « famille » : le navigateur n'a qu'un
     droit de lecture sur les tables familles (RLS).
   - familleNiveaux (niveaux ouverts du compte Famille connecté, parent ou enfant) sert au
     verrouillage des chapitres dans app.js (isChapterLocked).
   ===================================================================== */

const FAM_ORDRE = ['6e','5e','4e','3e'];
const FAM_DISPO = ['6e','5e','4e']; // niveaux en ligne : miroir de NIVEAUX_DISPONIBLES (fonction famille)
const FAM_EXCLUSION_TEXTE = "Je certifie qu'aucun de mes enfants inscrits sur L'Atelier des Maths n'est scolarisé à l'Ensemble scolaire La Malgrange (Jarville-la-Malgrange), établissement où enseigne le concepteur du site, et je m'engage à ne pas créer de compte pour un enfant qui y serait scolarisé. Je reconnais qu'une fausse déclaration entraîne la fermeture des comptes sans remboursement.";
// Prix affichés (en centimes, par nombre de niveaux) : lus dans famille_parametres, modifiables
// dans Administration > Familles. Le montant réellement payé est toujours recalculé par le serveur.
let famGrille = { '1':3500, '2':5500, '3':6900 };
async function famChargerGrille(){
  try{ const { data } = await sb.from('famille_parametres').select('prix').eq('id', 1).maybeSingle(); if(data && data.prix) famGrille = data.prix; }catch(e){}
}
function famPrixTxt(c){ return (c/100).toFixed(2).replace('.',',').replace(',00','') + ' €'; }
// Liens publics vers l'offre (bandeau de l'accueil, « Je suis parent » dans le menu de connexion) :
// affichés seulement quand l'administrateur a rendu l'offre visible (famille_parametres.publique).
let famPublique = false;
async function famAppliquerVisibilite(){
  try{
    const { data } = await sb.from('famille_parametres').select('prix,publique').eq('id', 1).maybeSingle();
    if(data){ famPublique = !!data.publique; if(data.prix) famGrille = data.prix; }
  }catch(e){}
  famMajLiens();
}
function famMajLiens(){
  const role = typeof currentUserRole !== 'undefined' ? currentUserRole : null;
  const connecte = typeof currentUser !== 'undefined' && !!currentUser;
  const banner = document.getElementById('famHomeBanner'), btn = document.getElementById('btnSignupFamille');
  // Bandeau : pour les visiteurs (découvrir l'offre) et les parents (accès direct à leur espace).
  if(banner) banner.style.display = (famPublique && (!connecte || role === 'parent')) ? 'flex' : 'none';
  if(btn) btn.style.display = famPublique ? 'flex' : 'none';
  const cta = document.getElementById('famHomeCta'), prix = document.getElementById('famHomePrix');
  if(cta) cta.innerHTML = role === 'parent' ? 'Mon Espace famille <span class="gicon">arrow_forward</span>' : 'Découvrir l\'offre Famille <span class="gicon">arrow_forward</span>';
  if(prix) prix.textContent = role === 'parent' ? '' : 'À partir de ' + famPrixTxt(famGrille['1']) + ' par année scolaire.';
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(famAppliquerVisibilite, 0)); else setTimeout(famAppliquerVisibilite, 0);
function famFinAnnee(){ const d = new Date(), y = d.getFullYear(); return (d.getMonth()+1 >= 6 ? y+1 : y)+'-08-31'; }
function famDate(s){ return s ? new Date(String(s).length===10 ? s+'T00:00:00' : s).toLocaleDateString('fr-FR') : ''; }
function famEsc(s){ return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function famIdent(email){ return email && email.endsWith('@mathcollege.local') ? email.slice(0, -'@mathcollege.local'.length) : (email||''); }
function famEuros(c){ return (c/100).toFixed(2).replace('.',',').replace(',00','')+' €'; }

let famState = null;       // ma_famille() du compte connecté
let familleNiveaux = null;  // null : compte non Famille ; sinon niveaux ouverts (vide si pas d'accès en cours)

async function familleLoad(role){
  famState = null; familleNiveaux = null;
  document.body.classList.remove('famille-no-print');
  if(role!=='parent' && role!=='eleve'){ famMajLiens(); return; }
  try{
    const { data, error } = await sb.rpc('ma_famille');
    if(error || !data) return;
    famState = data;
    familleNiveaux = Array.isArray(data.niveaux_ouverts) ? data.niveaux_ouverts : [];
    // Demandé : "Pour les parents, ne pas permettre l'enregistrement PDF/impression dans les
    // cours" -- parent et enfants d'une famille : bouton d'export masqué, impression du cours
    // remplacée par un message (CSS @media print), Ctrl+P intercepté sur un chapitre.
    document.body.classList.add('famille-no-print');
  }catch(e){ /* hors ligne */ }
  finally{ famMajLiens(); }
}
function familleClear(){ famState = null; familleNiveaux = null; document.body.classList.remove('famille-no-print'); famMajLiens(); }
function familleSansImpression(){
  if(!document.body.classList.contains('famille-no-print')) return false;
  niceAlert("L'impression et l'enregistrement en PDF des cours ne sont pas disponibles avec un compte Famille. Les cours restent consultables à tout moment sur le site.");
  return true;
}
document.addEventListener('keydown', e => {
  if((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P') && document.body.classList.contains('famille-no-print')){
    const chap = document.getElementById('view-chapitre');
    if(chap && chap.classList.contains('active')){ e.preventDefault(); familleSansImpression(); }
  }
}, true);

async function famCall(body){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session) throw new Error('Connectez-vous d\'abord.');
  const res = await fetch(SUPABASE_URL+'/functions/v1/famille', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+session.access_token, 'apikey':SUPABASE_ANON_KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(()=>({error:'Réponse illisible du serveur.'}));
  if(data.error) throw new Error(data.error);
  return data;
}
function famMsg(id, text, ok){
  const el = document.getElementById(id); if(!el) return;
  el.innerHTML = text ? `<span style="color:${ok?'#1E7B34':'#B3261E'};">${famEsc(text)}</span>` : '';
}

/* ---------- Présentation + inscription (visiteur) ---------- */
function famPresentationHtml(){
  return `
  <div class="fam-hero">
    <h1 style="margin:0 0 6px;"><span class="gicon">family_restroom</span> L'Atelier des Maths en famille</h1>
    <p style="margin:0;max-width:72ch;">Les cours, méthodes et exercices du collège, les automatismes et Objectif Nombre, avec un compte pour chaque enfant et un suivi pour vous.</p>
  </div>
  <div class="fam-offres">
    <div class="fam-offre"><b>1 niveau</b><span class="fam-prix">${famPrixTxt(famGrille['1'])}</span><small>par année scolaire</small></div>
    <div class="fam-offre"><b>2 niveaux</b><span class="fam-prix">${famPrixTxt(famGrille['2'])}</span><small>par année scolaire</small></div>
    <div class="fam-offre"><b>Collège complet</b><span class="fam-prix">${famPrixTxt(famGrille['3'])}</span><small>dès que la 3e sera en ligne</small></div>
  </div>
  <ul class="fam-points">
    <li><span class="gicon">group</span><span>Jusqu'à <b>4 comptes enfants</b> (des jumeaux ont chacun leur compte), gérés par vous.</span></li>
    <li><span class="gicon">history_edu</span><span>Chaque niveau choisi ouvre aussi le <b>niveau inférieur en révision</b>.</span></li>
    <li><span class="gicon">monitoring</span><span>Vous suivez les résultats de chaque enfant.</span></li>
    <li><span class="gicon">smart_toy</span><span>IA facultative, avec <b>votre propre clé</b> Anthropic, réglable pour chaque enfant.</span></li>
    <li><span class="gicon">event_available</span><span>Paiement unique jusqu'au 31 août, <b>sans reconduction automatique</b>.</span></li>
  </ul>`;
}
function famSignupHtml(){
  return `
  <div class="fam-signup">
    <div class="auth-modal-head fam-signup-head">
      <span class="auth-badge big"><span class="gicon">family_restroom</span></span>
      <div class="auth-title">Créer mon compte Famille</div>
      <div class="auth-sub">Gratuit : vous choisirez l'accès et paierez ensuite, depuis votre Espace famille.</div>
    </div>
    <form class="auth-modal-body" onsubmit="famSignup();return false;">
      <div class="auth-grid">
        <div><label class="auth-label" for="famSuPrenom">Prénom</label>
          <div class="auth-field"><span class="gicon">badge</span><input type="text" id="famSuPrenom" autocomplete="given-name"></div></div>
        <div><label class="auth-label" for="famSuNom">Nom</label>
          <div class="auth-field"><span class="gicon">badge</span><input type="text" id="famSuNom" autocomplete="family-name"></div></div>
      </div>
      <label class="auth-label" for="famSuEmail">Adresse e-mail</label>
      <div class="auth-field"><span class="gicon">mail</span><input type="email" id="famSuEmail" placeholder="vous@exemple.fr" autocomplete="email"></div>
      <label class="auth-label" for="famSuPassword">Mot de passe <span class="auth-label-hint">(8 caractères minimum)</span></label>
      <div class="auth-field"><span class="gicon">lock</span><input type="password" id="famSuPassword" autocomplete="new-password"></div>
      <div class="fam-checks">${famCertifHtml()}</div>
      <button type="submit" class="btn-auth orange" id="famSuBtn"><span class="gicon">rocket_launch</span> Créer mon compte Famille</button>
      <span class="auth-status" id="famSuMsg"></span>
      <p class="auth-foot">Déjà inscrit ? Connectez-vous avec le bouton <span class="gicon" style="font-size:15px;vertical-align:-3px;">person</span> en haut à droite.</p>
    </form>
  </div>`;
}
function famCertifHtml(){
  return `
    <label class="fam-check"><input type="checkbox" id="famSuCertif"> <span><b>Déclaration sur l'honneur.</b> ${famEsc(FAM_EXCLUSION_TEXTE)}</span></label>
    <label class="fam-check"><input type="checkbox" id="famSuCgv"> <span>J'ai lu et j'accepte les <a href="#/cgv" target="_blank">conditions générales de vente</a> et la <a href="#/confidentialite">politique de confidentialité</a>.</span></label>`;
}
async function famSignup(){
  const v = id => (document.getElementById(id).value||'').trim();
  const prenom = v('famSuPrenom'), nom = v('famSuNom'), email = v('famSuEmail'), password = document.getElementById('famSuPassword').value;
  const certification = document.getElementById('famSuCertif').checked, cgv = document.getElementById('famSuCgv').checked;
  if(!prenom || !nom) return famMsg('famSuMsg', 'Indiquez votre prénom et votre nom.');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return famMsg('famSuMsg', 'Adresse e-mail invalide.');
  if(password.length < 8) return famMsg('famSuMsg', 'Le mot de passe doit comporter au moins 8 caractères.');
  if(!certification) return famMsg('famSuMsg', 'La déclaration sur l\'honneur est obligatoire.');
  if(!cgv) return famMsg('famSuMsg', 'Merci d\'accepter les conditions générales de vente.');
  const btn = document.getElementById('famSuBtn'); btn.disabled = true;
  famMsg('famSuMsg', 'Création du compte…', true);
  // Les informations voyagent avec le compte : si l'adresse doit d'abord être confirmée, le lien
  // reçu par e-mail ramène ici, connecté, et l'inscription se termine toute seule (app.js,
  // finaliserInscriptionEnAttente).
  const { data, error } = await sb.auth.signUp({ email, password, options: {
    emailRedirectTo: location.origin + '/?inscription=famille',
    data: { inscription: 'famille', prenom, nom, certification: true, cgv: true },
  } });
  if(error){ btn.disabled = false; return famMsg('famSuMsg', 'Erreur : '+error.message); }
  if(!data.session){
    document.querySelector('#famRoot .fam-signup .auth-modal-body').outerHTML = `<div class="auth-modal-body"><strong class="fam-h"><span class="gicon">mark_email_unread</span> Plus qu'une étape : confirmez votre adresse</strong>
      <p style="margin:8px 0;">Un e-mail de <b>L'Atelier des Maths</b> vient d'être envoyé à <b>${famEsc(email)}</b>. Cliquez sur le bouton qu'il contient : vous reviendrez ici, connecté, et votre compte Famille sera prêt.</p>
      <p class="hint" style="margin:0;">Rien reçu d'ici quelques minutes ? Regardez dans les courriers indésirables, ou écrivez à contact@latelieraugmente.fr.</p></div>`;
    return;
  }
  try{
    await famCall({ action:'inscription', prenom, nom, certification:true, cgv:true });
  }catch(e){ btn.disabled = false; return famMsg('famSuMsg', e.message); }
  await refreshAuthUI();
  renderFamille();
}
// Compte connecté sans profil (inscription interrompue) : on termine l'inscription.
async function famFinaliser(){
  const v = id => (document.getElementById(id).value||'').trim();
  const prenom = v('famSuPrenom'), nom = v('famSuNom');
  if(!prenom || !nom) return famMsg('famSuMsg', 'Indiquez votre prénom et votre nom.');
  if(!document.getElementById('famSuCertif').checked) return famMsg('famSuMsg', 'La déclaration sur l\'honneur est obligatoire.');
  if(!document.getElementById('famSuCgv').checked) return famMsg('famSuMsg', 'Merci d\'accepter les conditions générales de vente.');
  try{ await famCall({ action:'inscription', prenom, nom, certification:true, cgv:true }); }
  catch(e){ return famMsg('famSuMsg', e.message); }
  await refreshAuthUI();
  renderFamille();
}

/* ---------- Espace famille ---------- */
let famData = null;
async function renderFamille(){
  const root = document.getElementById('famRoot');
  if(!root) return;
  await famChargerGrille();
  if(!currentUser){ root.innerHTML = famPresentationHtml() + famSignupHtml(); return; }
  if(!currentUserRole){
    // Le profil vient peut-être d'être créé : on relit le rôle avant de proposer de finaliser.
    const { data: p } = await sb.from('profiles').select('role').eq('id', currentUser.id).maybeSingle();
    if(p && p.role){ await refreshAuthUI(); return renderFamille(); }
    root.innerHTML = famPresentationHtml() + `
      <div class="tool-shell fam-card" style="max-width:560px;">
        <strong class="fam-h"><span class="gicon">how_to_reg</span> Terminer mon inscription Famille</strong>
        <div class="fam-form">
          <label>Prénom<input type="text" id="famSuPrenom"></label>
          <label>Nom<input type="text" id="famSuNom"></label>
        </div>
        ${famCertifHtml()}
        <button class="btn" onclick="famFinaliser()" style="width:100%;margin-top:10px;">Terminer l'inscription</button>
        <span class="hint" id="famSuMsg" style="display:block;margin-top:8px;"></span>
      </div>`;
    return;
  }
  if(currentUserRole!=='parent'){
    root.innerHTML = famPresentationHtml() + `<p class="hint" style="margin-top:14px;">L'Espace famille est réservé aux comptes parents. Vous êtes connecté avec un compte ${currentUserRole==='eleve'?'élève':'professeur'} : déconnectez-vous pour créer un compte Famille.</p>`;
    return;
  }
  if(!famData) root.innerHTML = '<p class="hint">Chargement…</p>';
  const paye = /[?&]famille=paye/.test(location.search);
  const since30 = new Date(Date.now()-30*24*3600e3).toISOString();
  const [{ data: fam }, { data: enf }, { data: pay }, { data: ai }, { data: factures }] = await Promise.all([
    sb.from('familles').select('*').eq('parent_id', currentUser.id).maybeSingle(),
    sb.from('famille_enfants').select('*, profiles(prenom,nom,email)').eq('parent_id', currentUser.id).order('created_at'),
    sb.from('famille_paiements').select('*').eq('parent_id', currentUser.id).order('created_at', {ascending:false}),
    sb.from('teacher_ai_settings').select('key_last4,key_set_at').eq('teacher_id', currentUser.id).maybeSingle(),
    sb.from('facturation_documents').select('*').eq('famille_parent_id', currentUser.id).order('created_at', {ascending:false}),
  ]);
  const enfants = (enf||[]).map(e=>({ ...e, prenom:(e.profiles&&e.profiles.prenom)||'', identifiant: famIdent(e.profiles&&e.profiles.email) }));
  const ids = enfants.map(e=>e.enfant_id);
  const [{ data: cm }, { data: ceb }, { data: use }] = ids.length ? await Promise.all([
    sb.from('cm_results').select('student_id,sequence_label,score,total,duration_ms,created_at').in('student_id', ids).order('created_at', {ascending:false}).limit(300),
    sb.from('ceb_results').select('student_id,target,result_value,gap,success,timed,created_at').in('student_id', ids).order('created_at', {ascending:false}).limit(300),
    sb.from('ai_usage_log').select('user_id,feature,input_tokens,output_tokens,created_at').eq('billed_to', currentUser.id).gte('created_at', since30).order('created_at', {ascending:false}),
  ]) : [{data:[]},{data:[]},(await sb.from('ai_usage_log').select('user_id,feature,input_tokens,output_tokens,created_at').eq('billed_to', currentUser.id).gte('created_at', since30))];
  famData = { fam: fam||{}, enfants, pay: pay||[], ai: ai||{}, cm: cm||[], ceb: ceb||[], use: use||[], factures: factures||[], code: (famData && famData.code) || '' };
  const today = new Date().toISOString().slice(0,10);
  const active = !!(fam && fam.acces_until && fam.acces_until >= today);

  root.innerHTML = `
    <h1 style="margin:6px 0 4px;"><span class="gicon">family_restroom</span> Espace famille</h1>
    <p style="color:var(--ink-soft);margin:0 0 14px;">Bonjour ${famEsc(currentUser && document.getElementById('accountNameDisplay').textContent)} : vous gérez ici l'accès, les comptes de vos enfants, leur suivi et l'IA.</p>
    ${paye && !active ? '<div class="fam-banner"><span class="gicon">hourglass_top</span> Paiement reçu, activation en cours… cette page se met à jour toute seule.</div>' : ''}
    ${paye && active ? '<div class="fam-banner ok"><span class="gicon">check_circle</span> Merci ! Votre accès est activé. Votre facture est disponible ci-dessous, dans « Mes factures », et vous a été annoncée par e-mail.</div>' : ''}
    ${famData.fam.stripe_test ? '<div class="fam-banner"><span class="gicon">science</span><span><b>Compte de test</b> : les paiements sont simulés par Stripe, aucun argent ne circule. Carte de test : <code>4242 4242 4242 4242</code>, date future quelconque, code 123.</span></div>' : ''}
    ${famAccesHtml(famData.fam, active)}
    ${famFacturesHtml(famData.factures)}
    ${famEnfantsHtml(enfants, active)}
    ${famSuiviHtml(enfants)}
    ${famIaHtml(famData.fam, famData.ai, enfants, famData.use)}
    ${famCompteHtml(famData.fam)}`;
  famMajPrix();
  if(paye){
    if(!active && (famData.polls = (famData.polls||0)+1) <= 8){ setTimeout(renderFamille, 2500); }
    else { const q = new URLSearchParams(location.search); q.delete('famille'); history.replaceState(null, '', location.pathname + (q.toString() ? '?' + q : '') + location.hash); if(active){ await familleLoad('parent'); if(currentLevel) renderNiveau(currentLevel); } }
  }
}

function famAccesHtml(fam, active){
  const fin = famFinAnnee();
  const memePeriode = active && fam.acces_until === fin;
  const actuels = memePeriode ? (fam.niveaux||[]) : [];
  const ouverts = active ? ((famState && famState.niveaux_ouverts) || []) : [];
  const revision = ouverts.filter(n=>!(fam.niveaux||[]).includes(n));
  const statut = active
    ? `<p style="margin:6px 0;"><span class="fam-badge" style="background:#1E7B34;">Accès en cours</span> jusqu'au <b>${famDate(fam.acces_until)}</b> : ${(fam.niveaux||[]).join(', ')}${revision.length?' <span class="hint">(+ '+revision.join(', ')+' en révision)</span>':''}</p>`
    : `<p style="margin:6px 0;"><span class="fam-badge" style="background:#8A5A00;">Pas d'accès en cours</span> Vos enfants ne voient que les chapitres gratuits.</p>`;
  const cases = FAM_ORDRE.map(n=>{
    const dispo = FAM_DISPO.includes(n), deja = actuels.includes(n);
    return `<label class="fam-niv ${dispo?'':'off'}"><input type="checkbox" class="famNiv" value="${n}" ${deja?'checked disabled':''} ${dispo?'':'disabled'} onchange="famMajPrix()"> ${n}${deja?' <small>inclus</small>':dispo?'':' <small>bientôt</small>'}</label>`;
  }).join('');
  const anneeLabel = (parseInt(fin.slice(0,4),10)-1)+'-'+fin.slice(0,4);
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">confirmation_number</span> 1. Votre accès</strong>
    ${statut}
    <p class="hint" style="margin:10px 0 4px;">${memePeriode ? 'Ajouter un niveau (vous ne payez que la différence) :' : 'Choisissez les niveaux pour l\'année scolaire '+anneeLabel+' (accès jusqu\'au '+famDate(fin)+') :'}</p>
    <div class="fam-nivs">${cases}</div>
    <div class="fam-code">
      <input type="text" id="famCode" placeholder="Code promo" value="${famEsc(famData.code||'')}" maxlength="30" autocomplete="off" oninput="this.value=this.value.toUpperCase()" onkeydown="if(event.key==='Enter'){event.preventDefault();famAppliquerCode();}">
      <button class="btn secondary" onclick="famAppliquerCode()">Appliquer</button>
      <span class="hint" id="famCodeMsg"></span>
    </div>
    <div class="fam-prixbox" id="famPrix"></div>
    <label class="fam-check"><input type="checkbox" id="famRenonce"> <span>Je demande l'accès immédiat au contenu numérique dès le paiement et je reconnais perdre ainsi mon droit de rétractation de 14 jours (art. L221-28 13° du Code de la consommation).</span></label>
    <button class="btn" id="famPayBtn" onclick="famPayer()" disabled><span class="gicon">credit_card</span> Payer par carte</button>
    <span class="hint" id="famPayMsg" style="display:block;margin-top:6px;"></span>
    <p class="hint" style="margin:8px 0 0;">Paiement unique et sécurisé (Stripe), <b>sans reconduction automatique</b> : rien ne sera prélevé l'an prochain sans votre accord. Facture émise par L'Atelier Augmenté, disponible ci-dessous. En cas de litige, après nous avoir écrit, vous pouvez recourir gratuitement au médiateur de la consommation CM2C (<a href="https://www.cm2c.net/declarer-un-litige.php" target="_blank" rel="noopener">cm2c.net</a>, 49 rue de Ponthieu, 75008 Paris) ; voir les <a href="#/cgv">CGV</a>.${fam.montant_paye_centimes && memePeriode ? ' Déjà payé pour cette année : '+famEuros(fam.montant_paye_centimes)+'.' : ''}</p>
    ${famData.pay.length ? `<details style="margin-top:8px;"><summary class="hint">Historique des paiements</summary><table class="fam-table" style="margin-top:6px;"><tr><th>Date</th><th>Niveaux</th><th>Montant</th><th>Accès jusqu'au</th></tr>${famData.pay.map(p=>`<tr><td>${famDate(p.created_at)}</td><td>${(p.niveaux||[]).join(', ')}</td><td>${famEuros(p.montant_centimes)}${p.test?' <span class="fam-badge" style="background:#6A4FB3;">test</span>':''}</td><td>${famDate(p.acces_until)}</td></tr>`).join('')}</table></details>` : ''}
  </div>`;
}
// Prix calculé par le serveur (tarifs en vigueur, code promo, ce qui a déjà été payé cette année) :
// l'affichage est toujours exactement ce qui sera demandé sur la page de paiement.
let famDevisSeq = 0;
async function famMajPrix(){
  const el = document.getElementById('famPrix'); if(!el || !famData) return;
  const btn = document.getElementById('famPayBtn');
  const choisis = [...document.querySelectorAll('.famNiv:checked:not(:disabled)')].map(c=>c.value);
  if(!choisis.length){ el.innerHTML = '<span class="hint">Cochez au moins un niveau.</span>'; if(btn) btn.disabled = true; return; }
  const seq = ++famDevisSeq;
  el.innerHTML = '<span class="hint">Calcul du prix…</span>'; if(btn) btn.disabled = true;
  let d;
  try{ d = await famCall({ action:'devis', niveaux: choisis, code: famData.code || '' }); }
  catch(e){ if(seq === famDevisSeq) el.innerHTML = '<span style="color:#B3261E;">'+famEsc(e.message)+'</span>'; return; }
  if(seq !== famDevisSeq) return;
  const cm = document.getElementById('famCodeMsg');
  if(cm) cm.innerHTML = famData.code ? (d.code ? '<span style="color:#1E7B34;"><span class="gicon">check_circle</span> '+famEsc(d.code_libelle || 'Code appliqué')+'</span>' : '<span style="color:#B3261E;">'+famEsc(d.code_msg || 'Code non valable.')+'</span>') : '';
  const barre = d.prix_formule < d.prix_liste ? `<s class="hint">${famPrixTxt(d.prix_liste)}</s> ` : '';
  el.innerHTML = `<div class="fam-total">Total : ${d.deja ? '' : barre}<b>${famPrixTxt(d.montant)}</b></div>
    <div class="hint">${d.niveaux.join(', ')} · accès jusqu'au <b>${famDate(d.acces_until)}</b>${d.deja ? ` · formule ${barre}${famPrixTxt(d.prix_formule)} − ${famPrixTxt(d.deja)} déjà payés` : ''}${d.code ? ' · code <b>'+famEsc(d.code)+'</b>' : ''}</div>`;
  if(btn) btn.disabled = d.montant <= 0;
}
function famAppliquerCode(){
  const inp = document.getElementById('famCode'); if(!inp) return;
  famData.code = (inp.value||'').trim().toUpperCase().replace(/\s+/g,'');
  famMajPrix();
}
async function famPayer(){
  const choisis = [...document.querySelectorAll('.famNiv:checked:not(:disabled)')].map(c=>c.value);
  if(!document.getElementById('famRenonce').checked) return famMsg('famPayMsg', 'Cochez la case d\'accès immédiat pour continuer.');
  const btn = document.getElementById('famPayBtn'); btn.disabled = true;
  famMsg('famPayMsg', 'Redirection vers le paiement…', true);
  try{
    const r = await famCall({ action:'paiement', niveaux: choisis, code: famData.code || '', renonciation:true, origin: location.origin });
    location.href = r.url;
  }catch(e){ btn.disabled = false; famMsg('famPayMsg', e.message); }
}

function famFacturesHtml(factures){
  if(!factures.length) return '';
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">receipt_long</span> Mes factures</strong>
    <div class="fam-factures">${factures.map(f=>`
      <div class="fam-facture">
        <div><b>${famEsc(f.numero)}</b>${f.test ? ' <span class="fam-badge" style="background:#6A4FB3;">test</span>' : ''}<div class="hint" style="margin:0;">${famDate(f.date_emission)} · ${(f.niveaux||[]).join(', ')} · ${famPrixTxt(Math.round(Number(f.total)*100))}</div></div>
        <div class="fam-actions">
          <button class="btn secondary" onclick="famVoirFacture('${f.id}', false)"><span class="gicon">visibility</span> Voir</button>
          <button class="btn" onclick="famVoirFacture('${f.id}', true)"><span class="gicon">download</span> Télécharger (PDF)</button>
        </div>
      </div>`).join('')}
    </div>
    <p class="hint" style="margin:8px 0 0;">« Télécharger » ouvre la facture et la fenêtre d'impression : choisissez « Enregistrer au format PDF ».</p>
  </div>`;
}
function famVoirFacture(id, telecharger){
  const f = famData && famData.factures.find(x=>x.id === id); if(!f) return;
  if(typeof facOpenPdf === 'function') facOpenPdf(null, f, telecharger);
}

function famEnfantsHtml(enfants, active){
  const cartes = enfants.map(e=>`
    <div class="fam-enfant">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;align-items:baseline;">
        <b style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">${famEsc(e.prenom)}</b>
        <span class="hint">identifiant : <code>${famEsc(e.identifiant)}</code></span>
      </div>
      <div class="fam-row">
        <label class="hint">Classe <select onchange="famReglage('${e.enfant_id}', {niveau:this.value})">
          <option value="">–</option>${FAM_ORDRE.map(n=>`<option value="${n}" ${e.niveau===n?'selected':''}>${n}</option>`).join('')}</select></label>
        <span class="hint">Collège : ${e.hors_college ? 'hors collège' : famEsc(e.uai)}</span>
      </div>
      <div class="fam-actions">
        <button class="btn secondary" onclick="famMdp('${e.enfant_id}', '${famEsc(e.prenom).replace(/'/g,"\\'")}')"><span class="gicon">key</span> Nouveau mot de passe</button>
        <button class="btn secondary" onclick="famSupprimerEnfant('${e.enfant_id}', '${famEsc(e.prenom).replace(/'/g,"\\'")}')" style="color:#B3261E;"><span class="gicon">delete</span> Supprimer</button>
      </div>
      <span class="hint" id="famEnfMsg-${e.enfant_id}" style="display:block;"></span>
    </div>`).join('');
  const plein = enfants.length >= 4;
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">group</span> 2. Comptes de vos enfants (${enfants.length}/4)</strong>
    ${!active && enfants.length ? '<p class="hint" style="margin:4px 0;">Sans accès en cours, vos enfants se connectent mais ne voient que les chapitres gratuits.</p>' : ''}
    <div class="fam-enfants">${cartes || '<p class="hint" style="margin:4px 0;">Aucun compte enfant pour l\'instant.</p>'}</div>
    ${plein ? '<p class="hint">Maximum atteint (4 comptes enfants).</p>' : `
    <details class="fam-add" ${enfants.length?'':'open'}>
      <summary><span class="gicon">person_add</span> Ajouter un enfant</summary>
      <div class="fam-form">
        <label>Prénom<input type="text" id="famEnfPrenom" oninput="famSuggestIdent()"></label>
        <label>Classe<select id="famEnfNiveau"><option value="">–</option>${FAM_ORDRE.map(n=>`<option value="${n}">${n}</option>`).join('')}</select></label>
        <label>Identifiant de connexion<input type="text" id="famEnfIdent" autocomplete="off" oninput="this.dataset.touched=1"><small>Lettres, chiffres, point ou tiret.</small></label>
        <label>Mot de passe (6 caractères minimum)<input type="text" id="famEnfPassword" autocomplete="off"><small>Notez-le : c'est vous qui le transmettez à votre enfant.</small></label>
        <label class="wide">Collège fréquenté : code UAI<input type="text" id="famEnfUai" maxlength="8" style="text-transform:uppercase;" placeholder="ex. 0541234X"><small>Il figure sur les courriers et le site du collège, ou dans l'<a href="https://www.education.gouv.fr/annuaire" target="_blank" rel="noopener">annuaire de l'Éducation nationale</a>.</small></label>
        <label class="fam-check wide"><input type="checkbox" id="famEnfHors" onchange="document.getElementById('famEnfUai').disabled=this.checked"> <span>Mon enfant n'est pas scolarisé au collège (instruction en famille, CNED, école primaire…).</span></label>
      </div>
      <button class="btn" onclick="famAjouterEnfant()"><span class="gicon">add</span> Créer le compte</button>
      <span class="hint" id="famEnfMsg" style="display:block;margin-top:6px;"></span>
    </details>`}
    <p class="hint" style="margin:10px 0 0;">Votre enfant se connecte sur ce site avec le bouton <span class="gicon">person</span> (en haut à droite) : son identifiant et son mot de passe.</p>
  </div>`;
}
function famSuggestIdent(){
  const id = document.getElementById('famEnfIdent');
  if(!id || id.dataset.touched) return;
  const p = (document.getElementById('famEnfPrenom').value||'').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'.').replace(/^\.+|\.+$/g,'');
  const nom = (document.getElementById('accountNameDisplay').textContent||'').trim().split(/\s+/).slice(-1)[0] || '';
  const n = nom.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'');
  id.value = p ? (p + (n ? '.'+n : '')) : '';
}
async function famAjouterEnfant(){
  const v = id => (document.getElementById(id).value||'').trim();
  const body = { action:'enfant-creer', prenom: v('famEnfPrenom'), identifiant: v('famEnfIdent'), password: document.getElementById('famEnfPassword').value,
    niveau: v('famEnfNiveau') || null, hors_college: document.getElementById('famEnfHors').checked, uai: v('famEnfUai').toUpperCase() };
  if(!body.prenom) return famMsg('famEnfMsg', 'Indiquez le prénom de l\'enfant.');
  if(!body.hors_college && !/^[0-9]{7}[A-Z]$/.test(body.uai)) return famMsg('famEnfMsg', 'Indiquez le code UAI du collège (7 chiffres et une lettre), ou cochez « pas scolarisé au collège ».');
  famMsg('famEnfMsg', 'Création…', true);
  try{
    const r = await famCall(body);
    await niceAlert(`Compte créé pour ${body.prenom}.\n\nIdentifiant : ${r.identifiant}\nMot de passe : ${body.password}\n\nNotez-les pour votre enfant.`);
    renderFamille();
  }catch(e){ famMsg('famEnfMsg', e.message); }
}
async function famMdp(id, prenom){
  const pw = await nicePrompt('Nouveau mot de passe pour '+prenom+' (6 caractères minimum) :', '');
  if(pw==null) return;
  try{ await famCall({ action:'enfant-mdp', enfant_id:id, password:pw }); famMsg('famEnfMsg-'+id, 'Mot de passe changé. Pensez à le transmettre à '+prenom+'.', true); }
  catch(e){ famMsg('famEnfMsg-'+id, e.message); }
}
async function famSupprimerEnfant(id, prenom){
  if(!(await niceConfirm('Supprimer définitivement le compte de '+prenom+' et tous ses résultats ?'))) return;
  try{ await famCall({ action:'enfant-supprimer', enfant_id:id }); renderFamille(); }
  catch(e){ famMsg('famEnfMsg-'+id, e.message); }
}
async function famReglage(id, champs, msgId){
  try{ await famCall({ action:'enfant-reglages', enfant_id:id, ...champs }); famMsg(msgId||('famEnfMsg-'+id), '✓ Enregistré', true); }
  catch(e){ famMsg(msgId||('famEnfMsg-'+id), e.message); }
}

function famDuree(ms){ if(!ms) return ''; const s = Math.round(ms/1000); return s<60 ? s+' s' : Math.floor(s/60)+' min '+String(s%60).padStart(2,'0'); }
function famSuiviHtml(enfants){
  if(!enfants.length) return '';
  const semaine = Date.now()-7*24*3600e3;
  const blocs = enfants.map(e=>{
    const cm = famData.cm.filter(r=>r.student_id===e.enfant_id), ceb = famData.ceb.filter(r=>r.student_id===e.enfant_id);
    const ia = famData.use.filter(r=>r.user_id===e.enfant_id);
    const cm7 = cm.filter(r=>new Date(r.created_at)>semaine), ceb7 = ceb.filter(r=>new Date(r.created_at)>semaine), ia7 = ia.filter(r=>new Date(r.created_at)>semaine);
    const moy = cm7.length ? Math.round(100*cm7.reduce((a,r)=>a+(r.total?r.score/r.total:0),0)/cm7.length) : null;
    return `
    <details class="fam-suivi">
      <summary><b>${famEsc(e.prenom)}</b> <span class="hint">· 7 derniers jours : ${cm7.length} série${cm7.length>1?'s':''} d'automatismes${moy!==null?' (réussite moyenne '+moy+' %)':''}, ${ceb7.length} partie${ceb7.length>1?'s':''} d'Objectif Nombre, ${ia7.length} demande${ia7.length>1?'s':''} IA</span></summary>
      <div class="fam-suivi-grid">
        <div><div class="fam-step" style="margin-top:6px;">Automatismes</div>
          ${cm.length ? `<table class="fam-table"><tr><th>Date</th><th>Exercice</th><th>Score</th><th>Durée</th></tr>${cm.slice(0,15).map(r=>`<tr><td>${famDate(r.created_at)}</td><td>${famEsc(r.sequence_label||'')}</td><td>${r.score}/${r.total}</td><td>${famDuree(r.duration_ms)}</td></tr>`).join('')}</table>` : '<p class="hint">Rien pour l\'instant.</p>'}</div>
        <div><div class="fam-step" style="margin-top:6px;">Objectif Nombre</div>
          ${ceb.length ? `<table class="fam-table"><tr><th>Date</th><th>Cible</th><th>Résultat</th></tr>${ceb.slice(0,15).map(r=>`<tr><td>${famDate(r.created_at)}</td><td>${r.target}</td><td>${r.success?'<span style="color:#1E7B34;">trouvé ✓</span>':(r.result_value!=null?r.result_value+' (écart '+r.gap+')':'–')}</td></tr>`).join('')}</table>` : '<p class="hint">Rien pour l\'instant.</p>'}</div>
      </div>
    </details>`;
  }).join('');
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">monitoring</span> 3. Suivi</strong>
    ${blocs}
  </div>`;
}

const FAM_IA_FEATURES = [
  {key:'quiz', label:'Quiz IA'},
  {key:'tableau', label:'Construction au tableau'},
  {key:'figure', label:'Figures'},
];
function famIaHtml(fam, ai, enfants, use){
  const hasKey = !!(ai && ai.key_last4);
  const coutParPersonne = new Map();
  (use||[]).forEach(r=>{
    const c = (typeof iaCost==='function' ? iaCost(r) : null) || 0;
    const k = r.user_id;
    const cur = coutParPersonne.get(k) || {n:0, c:0};
    cur.n++; cur.c += c; coutParPersonne.set(k, cur);
  });
  const nomDe = id => id===currentUser.id ? 'Vous' : ((enfants.find(e=>e.enfant_id===id)||{}).prenom || 'Compte supprimé');
  const conso = [...coutParPersonne.entries()].map(([id,v])=>`<tr><td>${famEsc(nomDe(id))}</td><td>${v.n}</td><td>${v.c.toFixed(v.c<0.1?3:2).replace('.',',')} $</td></tr>`).join('');
  const lignes = enfants.map(e=>{
    const f = e.ia_features || {};
    return `<div class="fam-ia-row">
      <label class="fam-check" style="margin:0;"><input type="checkbox" ${e.ia_enabled?'checked':''} ${hasKey?'':'disabled'} onchange="famReglage('${e.enfant_id}', {ia_enabled:this.checked}, 'famIaMsg-${e.enfant_id}')"> <b>${famEsc(e.prenom)}</b></label>
      ${FAM_IA_FEATURES.map(x=>`<label class="hint" style="display:inline-flex;gap:4px;align-items:center;margin:0;"><input type="checkbox" class="famIaF-${e.enfant_id}" value="${x.key}" ${f[x.key]?'checked':''} onchange="famIaFeatures('${e.enfant_id}')"> ${x.label}</label>`).join('')}
      <label class="hint" style="display:inline-flex;gap:4px;align-items:center;margin:0;">au plus <input type="number" min="0" max="1000" value="${e.ia_quota==null?'':e.ia_quota}" placeholder="∞" style="width:64px;" onchange="famReglage('${e.enfant_id}', {ia_quota:this.value===''?null:this.value}, 'famIaMsg-${e.enfant_id}')"> demandes / 7 jours</label>
      <span class="hint" id="famIaMsg-${e.enfant_id}"></span>
    </div>`;
  }).join('');
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">smart_toy</span> 4. Intelligence artificielle (facultatif)</strong>
    <p class="hint" style="margin:4px 0 8px;max-width:80ch;">L'IA (quiz générés, construction de figures au tableau…) fonctionne avec <b>votre propre compte Anthropic</b> : vous y ajoutez quelques euros de crédit sur <a href="https://console.anthropic.com" target="_blank" rel="noopener">console.anthropic.com</a>, puis vous collez ici votre clé. Une demande coûte en général 1 à 3 centimes. La clé est stockée chiffrée ; le site n'en affiche que les 4 derniers caractères.</p>
    <div class="fam-row">
      ${hasKey ? `<span><span class="gicon" style="color:#1E7B34;">key</span> Clé enregistrée (…${famEsc(ai.key_last4)})</span> <button class="btn secondary" onclick="famRetirerCle()">Retirer la clé</button>`
        : `<input type="password" id="famKey" placeholder="sk-ant-…" style="flex:1;min-width:220px;" autocomplete="off"> <button class="btn" onclick="famEnregistrerCle()">Enregistrer la clé</button>`}
    </div>
    <span class="hint" id="famKeyMsg" style="display:block;margin:4px 0;"></span>
    <label class="fam-check"><input type="checkbox" ${fam.ia_parent?'checked':''} ${hasKey?'':'disabled'} onchange="famIaParent(this.checked)"> <span>Je l'utilise aussi moi-même (pour accompagner mes enfants).</span></label>
    ${enfants.length ? `<div class="fam-step">Pour chaque enfant</div>${lignes}` : ''}
    ${conso ? `<div class="fam-step">Consommation sur 30 jours (payée par votre clé)</div><table class="fam-table" style="max-width:460px;"><tr><th>Qui</th><th>Demandes</th><th>Coût estimé</th></tr>${conso}</table>` : ''}
  </div>`;
}
async function famIaFeatures(id){
  const f = {}; document.querySelectorAll('.famIaF-'+id).forEach(c=>{ f[c.value] = c.checked; });
  famReglage(id, {ia_features:f}, 'famIaMsg-'+id);
}
async function famEnregistrerCle(){
  const key = (document.getElementById('famKey').value||'').trim();
  if(!key) return famMsg('famKeyMsg', 'Collez votre clé Anthropic.');
  famMsg('famKeyMsg', 'Vérification auprès d\'Anthropic…', true);
  try{ await iaProxyAction({ action:'set_key', key }); await loadAiAccess(); renderFamille(); }
  catch(e){ famMsg('famKeyMsg', e.message); }
}
async function famRetirerCle(){
  if(!(await niceConfirm('Retirer votre clé ? L\'IA sera coupée pour vous et vos enfants.'))) return;
  try{ await iaProxyAction({ action:'remove_key' }); await loadAiAccess(); renderFamille(); }
  catch(e){ famMsg('famKeyMsg', e.message); }
}
async function famIaParent(on){
  try{ await famCall({ action:'ia-parent', ia_parent:on }); await loadAiAccess(); famMsg('famKeyMsg', '✓ Enregistré', true); }
  catch(e){ famMsg('famKeyMsg', e.message); }
}

function famCompteHtml(fam){
  const c = fam.certification || {};
  return `
  <div class="tool-shell fam-card">
    <strong class="fam-h"><span class="gicon">manage_accounts</span> 5. Votre compte</strong>
    <p class="hint" style="margin:4px 0;">Déclaration sur l'honneur faite le ${famDate(c.date)} : « ${famEsc(c.texte||'')} »</p>
    <p class="hint" style="margin:4px 0;"><a href="#/cgv">Conditions générales de vente</a> · <a href="#/confidentialite">Confidentialité</a> · Une question : <a href="mailto:contact@latelieraugmente.fr">contact@latelieraugmente.fr</a></p>
    <details style="margin-top:6px;"><summary class="hint" style="color:#B3261E;">Supprimer mon compte Famille</summary>
      <p class="hint">Supprime définitivement votre compte, ceux de vos enfants, leurs résultats et votre clé IA. L'accès payé n'est pas remboursé. Tapez <b>SUPPRIMER</b> pour confirmer.</p>
      <input type="text" id="famDelConfirm" placeholder="SUPPRIMER"> <button class="btn secondary" style="color:#B3261E;" onclick="famSupprimerCompte()">Supprimer définitivement</button>
      <span class="hint" id="famDelMsg" style="display:block;margin-top:6px;"></span>
    </details>
  </div>`;
}
async function famSupprimerCompte(){
  const conf = (document.getElementById('famDelConfirm').value||'').trim();
  if(conf!=='SUPPRIMER') return famMsg('famDelMsg', 'Tapez SUPPRIMER pour confirmer.');
  try{ await famCall({ action:'supprimer-compte', confirmation:'SUPPRIMER' }); await sb.auth.signOut(); showView('view-home'); }
  catch(e){ famMsg('famDelMsg', e.message); }
}

(function famStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .fam-hero{background:linear-gradient(135deg,#FFF4E0,#E8F1FB);border-radius:14px;padding:18px 20px;margin:6px 0 14px;}
    .fam-offres{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 12px;}
    .fam-offre{flex:1 1 150px;background:#fff;border:1.5px solid rgba(28,43,57,.12);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:2px;}
    .fam-offre b{font-family:'Space Grotesk',sans-serif;}
    .fam-prix{font-family:'Space Grotesk',sans-serif;font-size:1.6rem;font-weight:700;color:var(--accent);}
    .fam-offre small{color:var(--ink-soft);font-size:.78rem;}
    .fam-points{list-style:none;padding:0;margin:0 0 16px;display:grid;gap:6px;}
    .fam-points li{display:flex;gap:8px;align-items:flex-start;}
    .fam-points .gicon{color:var(--accent);}
    .fam-card{margin:0 0 14px;}
    .fam-h{font-family:'Space Grotesk',sans-serif;font-size:1.02rem;display:flex;align-items:center;gap:6px;}
    .fam-form{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px 14px;margin:10px 0;}
    .fam-form label{display:flex;flex-direction:column;gap:4px;font-size:.82rem;font-weight:600;color:var(--ink-soft);}
    .fam-form label.wide{grid-column:1 / -1;}
    .fam-form input,.fam-form select{font-weight:400;color:var(--ink);font-size:.95rem;}
    .fam-form small{font-weight:400;font-size:.75rem;}
    .fam-check{display:flex !important;flex-direction:row !important;gap:8px;align-items:flex-start;font-size:.86rem;font-weight:400 !important;color:var(--ink) !important;margin:8px 0;line-height:1.35;}
    .fam-check input{margin-top:3px;flex:none;}
    .fam-nivs{display:flex;gap:8px;flex-wrap:wrap;}
    .fam-niv{display:inline-flex;gap:6px;align-items:center;border:1.5px solid rgba(28,43,57,.16);border-radius:10px;padding:7px 12px;font-family:'Space Grotesk',sans-serif;font-weight:700;background:#fff;cursor:pointer;}
    .fam-niv.off{opacity:.5;cursor:default;}
    .fam-niv small{font-weight:400;color:var(--ink-soft);font-size:.72rem;}
    .fam-enfants{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;margin:8px 0;}
    .fam-enfant{background:#fff;border:1.5px solid rgba(28,43,57,.12);border-radius:12px;padding:10px 12px;display:flex;flex-direction:column;gap:6px;}
    .fam-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;}
    .fam-actions{display:flex;gap:6px;flex-wrap:wrap;}
    .fam-actions .btn{padding:3px 10px;font-size:.78rem;}
    .fam-add{margin-top:8px;}
    .fam-signup{max-width:560px;margin:0 auto 16px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 18px 48px rgba(28,43,57,.14);border:1px solid rgba(28,43,57,.06);}
    .fam-signup-head{background:radial-gradient(120% 140% at 0% 0%,#FFAE5C 0%,var(--accent-orange) 50%,#E46A00 100%);}
    .fam-checks{background:#FAFBFC;border:1px solid #E4E8EE;border-radius:12px;padding:4px 12px;margin:4px 0 14px;}
    .fam-checks .fam-check{font-size:.82rem;}
    .fam-codeform{margin-top:12px;padding:12px 14px;border:1.5px solid rgba(12,91,160,.18);border-radius:12px;background:#F8FAFD;}
    .fam-code{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:12px 0 4px;}
    .fam-code input{width:170px;text-transform:uppercase;letter-spacing:.5px;}
    .fam-code .btn{padding:6px 14px;}
    .fam-prixbox{margin:10px 0;padding:10px 14px;background:#F4F8FD;border-radius:10px;border:1px solid rgba(12,91,160,.12);}
    .fam-total{font-family:'Space Grotesk',sans-serif;font-size:1.15rem;}
    .fam-total b{font-size:1.45rem;color:var(--accent);}
    .fam-factures{display:flex;flex-direction:column;gap:8px;margin-top:8px;}
    .fam-facture{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:10px;padding:8px 12px;}
    .fam-add summary{cursor:pointer;font-weight:700;color:var(--accent);}
    .fam-suivi{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:10px;padding:8px 12px;margin:6px 0;}
    .fam-suivi summary{cursor:pointer;}
    .fam-suivi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;}
    .fam-ia-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding:6px 0;border-bottom:1px solid rgba(28,43,57,.08);}
    .fam-banner{background:#FFF4E0;border-radius:10px;padding:10px 14px;margin:0 0 12px;display:flex;gap:8px;align-items:center;}
    .fam-banner.ok{background:#E3F4E6;}
    #view-cgv h2{font-size:1.05rem;margin:18px 0 6px;}
    body.famille-no-print #btnExportCoursPdf{display:none !important;}
    #famNoPrintMsg{display:none;}
    @media print{
      body.famille-no-print #view-chapitre{display:none !important;}
      body.famille-no-print:has(#view-chapitre.active) #famNoPrintMsg{display:block !important;font:600 14pt 'Space Grotesk',Arial,sans-serif;text-align:center;margin:40mm 20mm;color:#1c2b39;line-height:1.5;}
    }
    .fam-step{font-family:'Space Grotesk',sans-serif;font-weight:700;margin:14px 0 6px;color:var(--ink);}
    .fam-badge{display:inline-block;border-radius:999px;padding:2px 9px;font-size:.75rem;font-weight:700;color:#fff;white-space:nowrap;}
    .fam-table{width:100%;border-collapse:collapse;font-size:.88rem;background:#fff;border-radius:10px;overflow:hidden;}
    .fam-table td,.fam-table th{padding:6px 9px;border-bottom:1px solid rgba(28,43,57,.08);text-align:left;vertical-align:top;}
    .fam-table th{font-size:.78rem;color:var(--ink-soft);}
  `;
  document.head.appendChild(st);
})();

/* ---------- Administration : onglet « Familles » (administrateur général uniquement) ---------- */
(function famAdminInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'familles';
  btn.innerHTML = '<span class=gicon>family_restroom</span> Familles';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-familles';
  panel.innerHTML = '<div id="famAdminRoot"><p class="hint">Chargement…</p></div>';
  view.appendChild(panel);
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    famAdminRefresh();
  });
  const origApply = window.adminApplyScopeUI;
  if(typeof origApply === 'function'){
    window.adminApplyScopeUI = function(){
      origApply.apply(this, arguments);
      const scoped = typeof adminScopeUai==='function' && !!adminScopeUai();
      btn.style.display = scoped ? 'none' : '';
      if(scoped && btn.classList.contains('active')) document.querySelector('#adminTabs [data-admin-tab="comptes"]').click();
    };
    window.adminApplyScopeUI();
  }
})();
async function famAdminRefresh(){
  const root = document.getElementById('famAdminRoot'); if(!root) return;
  if(currentUserRole!=='admin'){ root.innerHTML = '<p class="hint">Réservé à l\'administrateur.</p>'; return; }
  const [{ data: fams }, { data: enf }, { data: excl }, { data: pays }, { data: param }, { data: codes }] = await Promise.all([
    sb.from('familles').select('*, profiles!familles_parent_id_fkey(nom,prenom,email)').order('created_at', {ascending:false}),
    sb.from('famille_enfants').select('parent_id,uai,hors_college'),
    sb.from('famille_exclusions').select('*').order('uai'),
    sb.from('famille_paiements').select('montant_centimes,created_at,test,promo_code'),
    sb.from('famille_parametres').select('prix,publique').eq('id', 1).maybeSingle(),
    sb.from('famille_codes_promo').select('*').order('created_at', {ascending:false}),
  ]);
  famAdminCodes = codes || [];
  const grille = (param && param.prix) || famGrille;
  const usages = new Map(); (pays||[]).filter(p=>!p.test && p.promo_code).forEach(p=>usages.set(p.promo_code, (usages.get(p.promo_code)||0)+1));
  const eur = c => c==null ? '' : (c/100).toFixed(2).replace('.',',').replace(',00','');
  const today = new Date().toISOString().slice(0,10);
  const codeEtat = c => !c.actif ? ['désactivé','#8A8F98'] : (c.valide_au && today > c.valide_au) ? ['expiré','#8A8F98'] : (c.valide_du && today < c.valide_du) ? ['à venir','#8A5A00'] : ['actif','#1E7B34'];
  const lignesCodes = famAdminCodes.map(c=>{ const [et, col] = codeEtat(c); return `<tr>
    <td><b style="font-family:'JetBrains Mono',monospace;">${famEsc(c.code)}</b><div class="hint" style="margin:0;">${famEsc(c.libelle)}</div></td>
    <td>${c.prix ? `${eur(c.prix['1'])} / ${eur(c.prix['2'])} / ${eur(c.prix['3'])} €` : `−${c.remise_pct} %`}</td>
    <td>${c.valide_du ? famDate(c.valide_du) : '…'} → ${c.valide_au ? famDate(c.valide_au) : '…'}</td>
    <td>${c.fin_acces ? famDate(c.fin_acces) : '31/08 (année scolaire)'}</td>
    <td>${usages.get(c.code)||0}${c.max_utilisations ? ' / '+c.max_utilisations : ''}${c.une_fois_par_famille ? '<div class="hint" style="margin:0;">1 fois / famille</div>' : ''}</td>
    <td><span class="fam-badge" style="background:${col};">${et}</span></td>
    <td class="fam-actions"><button class="btn secondary" onclick="famAdminCodeForm('${famEsc(c.code)}')">Modifier</button>
      <button class="btn secondary" onclick="famAdminCodeActif('${famEsc(c.code)}', ${!c.actif})">${c.actif ? 'Désactiver' : 'Réactiver'}</button></td></tr>`; }).join('');
  const nbEnf = new Map(); (enf||[]).forEach(e=>nbEnf.set(e.parent_id, (nbEnf.get(e.parent_id)||0)+1));
  const actives = (fams||[]).filter(f=>f.acces_until && f.acces_until>=today).length;
  const ca = (pays||[]).filter(p=>!p.test).reduce((a,p)=>a+p.montant_centimes,0);
  const rows = (fams||[]).map(f=>{
    const p = f.profiles||{}, act = f.acces_until && f.acces_until>=today;
    return `<tr><td>${famEsc([p.prenom,p.nom].filter(Boolean).join(' '))}<br><small class="hint">${famEsc(p.email)}</small></td>
      <td>${act?'<span class="fam-badge" style="background:#1E7B34;">active</span>':'<span class="fam-badge" style="background:#8A8F98;">sans accès</span>'}</td>
      <td>${(f.niveaux||[]).join(', ')||'–'}</td><td>${famDate(f.acces_until)||'–'}</td><td>${nbEnf.get(f.parent_id)||0}</td>
      <td>${famEuros(f.montant_paye_centimes||0)}</td><td><small class="hint">${famDate(f.certification&&f.certification.date)}</small></td>
      <td><label class="hint" style="display:inline-flex;gap:4px;align-items:center;margin:0;white-space:nowrap;" title="Paiements simulés avec la clé test de Stripe (cartes fictives)"><input type="checkbox" ${f.stripe_test?'checked':''} onchange="famAdminTest('${f.parent_id}', this)"> test</label></td></tr>`;
  }).join('');
  root.innerHTML = `
    <div class="tool-shell fam-card">
      <strong class="fam-h"><span class="gicon">family_restroom</span> Comptes Famille</strong>
      <p class="hint" style="margin:4px 0 8px;">${(fams||[]).length} famille(s) inscrite(s), ${actives} avec un accès en cours · ${famEuros(ca)} encaissés au total, paiements de test exclus (voir aussi le tableau de bord Stripe). Cochez « test » pour qu'un compte paie avec les cartes fictives de Stripe.</p>
      ${rows ? `<div style="overflow-x:auto;"><table class="fam-table"><tr><th>Parent</th><th>Statut</th><th>Niveaux</th><th>Jusqu'au</th><th>Enfants</th><th>Payé (année)</th><th>Déclaration</th><th>Stripe</th></tr>${rows}</table></div>` : '<p class="hint">Aucune famille pour l\'instant.</p>'}
    </div>
    <div class="tool-shell fam-card">
      <strong class="fam-h"><span class="gicon">sell</span> Tarifs Famille</strong>
      <label class="fam-check" style="margin:6px 0 10px;"><input type="checkbox" id="famPublique" ${param && param.publique ? 'checked' : ''} onchange="famAdminPublique(this)"> <span><b>Offre Famille visible sur le site</b> : bandeau « Vous êtes parent ? » sur l'accueil et bouton « Je suis parent » dans le menu de connexion. Décoché, l'offre reste accessible par l'adresse directe maths.latelieraugmente.fr/#/famille.</span></label>
      <p class="hint" style="margin:4px 0 8px;">Prix TTC par année scolaire, appliqués à tous les nouveaux paiements (et affichés sur la page de présentation).</p>
      <div class="fam-row">
        <label class="hint">1 niveau <input type="number" id="famTarif1" min="1" step="0.01" value="${eur(grille['1'])}" style="width:80px;"> €</label>
        <label class="hint">2 niveaux <input type="number" id="famTarif2" min="1" step="0.01" value="${eur(grille['2'])}" style="width:80px;"> €</label>
        <label class="hint">Collège complet <input type="number" id="famTarif3" min="1" step="0.01" value="${eur(grille['3'])}" style="width:80px;"> €</label>
        <button class="btn" onclick="famAdminTarifs()">Enregistrer</button>
        <span class="hint" id="famTarifMsg"></span>
      </div>
    </div>
    <div class="tool-shell fam-card">
      <strong class="fam-h"><span class="gicon">confirmation_number</span> Codes promo</strong>
      <p class="hint" style="margin:4px 0 8px;">Le parent saisit le code dans son Espace famille avant de payer. Un code fixe des prix (1 / 2 / 3 niveaux) ou une remise en %, et peut limiter l'accès à une date (ex. accès d'été jusqu'au 31 août).</p>
      ${lignesCodes ? `<div style="overflow-x:auto;"><table class="fam-table"><tr><th>Code</th><th>Prix</th><th>Valable</th><th>Accès jusqu'au</th><th>Utilisations</th><th>État</th><th></th></tr>${lignesCodes}</table></div>` : '<p class="hint">Aucun code.</p>'}
      <button class="btn secondary" style="margin-top:8px;" onclick="famAdminCodeForm(null)"><span class="gicon">add</span> Nouveau code</button>
      <div id="famCodeForm"></div>
    </div>
    <div class="tool-shell fam-card">
      <strong class="fam-h"><span class="gicon">block</span> Établissements exclus de l'offre Famille</strong>
      <p class="hint" style="margin:4px 0 8px;">Un parent ne peut pas créer de compte enfant en déclarant l'un de ces collèges (message neutre, la liste n'est jamais montrée).</p>
      ${(excl||[]).map(x=>`<div class="fam-row" style="margin:4px 0;"><code>${famEsc(x.uai)}</code> <span class="hint">${famEsc(x.motif||'')}</span> <button class="btn secondary" style="padding:2px 10px;font-size:.78rem;" onclick="famAdminExclRetirer('${famEsc(x.uai)}')">Retirer</button></div>`).join('')}
      <div class="fam-row" style="margin-top:8px;"><input type="text" id="famExclUai" maxlength="8" placeholder="UAI" style="width:110px;text-transform:uppercase;"> <input type="text" id="famExclMotif" placeholder="motif (facultatif)" style="flex:1;min-width:180px;"> <button class="btn" onclick="famAdminExclAjouter()">Ajouter</button></div>
      <span class="hint" id="famExclMsg" style="display:block;margin-top:6px;"></span>
    </div>`;
}
async function famAdminTest(parentId, cb){
  const { error } = await sb.from('familles').update({ stripe_test: cb.checked }).eq('parent_id', parentId);
  if(error){ cb.checked = !cb.checked; niceAlert('Erreur : '+error.message); }
}
let famAdminCodes = [];
async function famAdminPublique(cb){
  const { error } = await sb.from('famille_parametres').update({ publique: cb.checked, updated_at: new Date().toISOString() }).eq('id', 1);
  if(error){ cb.checked = !cb.checked; return niceAlert('Erreur : ' + error.message); }
  famPublique = cb.checked; famMajLiens();
  famMsg('famTarifMsg', cb.checked ? '✓ Offre visible sur le site' : '✓ Offre masquée (adresse directe seulement)', true);
}
async function famAdminTarifs(){
  const v = i => Math.round(parseFloat(String(document.getElementById('famTarif'+i).value).replace(',','.'))*100);
  const prix = { '1': v(1), '2': v(2), '3': v(3) };
  if(Object.values(prix).some(x=>!(x >= 50))) return famMsg('famTarifMsg', 'Prix invalides.');
  const { error } = await sb.from('famille_parametres').update({ prix, updated_at: new Date().toISOString() }).eq('id', 1);
  if(error) return famMsg('famTarifMsg', error.message);
  famGrille = prix; famMsg('famTarifMsg', '✓ Tarifs enregistrés', true);
}
function famAdminCodeForm(code){
  const c = code ? famAdminCodes.find(x=>x.code === code) : null;
  const eur = x => x==null ? '' : (x/100).toFixed(2).replace(',00','');
  const mode = c && c.remise_pct ? 'pct' : 'prix';
  document.getElementById('famCodeForm').innerHTML = `
    <div class="fam-codeform">
      <div class="fam-step" style="margin-top:0;">${c ? 'Modifier le code '+famEsc(c.code) : 'Nouveau code promo'}</div>
      <div class="fam-form">
        <label>Code<input type="text" id="fcCode" value="${famEsc(c ? c.code : '')}" ${c ? 'disabled' : ''} maxlength="30" oninput="this.value=this.value.toUpperCase().replace(/[^A-Z0-9_-]/g,'')" placeholder="EX. RENTREE26"></label>
        <label class="wide">Libellé (montré au parent quand le code s'applique)<input type="text" id="fcLib" value="${famEsc(c ? c.libelle : '')}" placeholder="Rentrée 2026 : prix de lancement"></label>
        <label>Type
          <select id="fcMode" onchange="document.getElementById('fcPrixBox').style.display=this.value==='prix'?'':'none';document.getElementById('fcPctBox').style.display=this.value==='pct'?'':'none';">
            <option value="prix" ${mode==='prix'?'selected':''}>Prix fixes</option><option value="pct" ${mode==='pct'?'selected':''}>Remise en %</option></select></label>
        <label id="fcPrixBox" class="wide" style="${mode==='prix'?'':'display:none;'}">Prix (€) : 1 niveau / 2 niveaux / collège complet
          <span style="display:flex;gap:8px;"><input type="number" step="0.01" id="fcP1" value="${eur(c && c.prix && c.prix['1'])}" style="width:90px;"><input type="number" step="0.01" id="fcP2" value="${eur(c && c.prix && c.prix['2'])}" style="width:90px;"><input type="number" step="0.01" id="fcP3" value="${eur(c && c.prix && c.prix['3'])}" style="width:90px;"></span></label>
        <label id="fcPctBox" style="${mode==='pct'?'':'display:none;'}">Remise (%)<input type="number" id="fcPct" min="1" max="90" value="${c && c.remise_pct || ''}"></label>
        <label>Valable du<input type="date" id="fcDu" value="${c && c.valide_du || ''}"></label>
        <label>au<input type="date" id="fcAu" value="${c && c.valide_au || ''}"></label>
        <label>Accès jusqu'au (facultatif)<input type="date" id="fcFin" value="${c && c.fin_acces || ''}"><small>Vide : fin de l'année scolaire (31 août).</small></label>
        <label>Utilisations max (facultatif)<input type="number" id="fcMax" min="1" value="${c && c.max_utilisations || ''}"></label>
        <label class="fam-check wide"><input type="checkbox" id="fcUne" ${!c || c.une_fois_par_famille ? 'checked' : ''}> <span>Une seule utilisation par famille</span></label>
      </div>
      <button class="btn" onclick="famAdminCodeSave(${c ? 'true' : 'false'})">Enregistrer</button>
      <button class="btn secondary" onclick="document.getElementById('famCodeForm').innerHTML=''">Annuler</button>
      <span class="hint" id="fcMsg"></span>
    </div>`;
  document.getElementById('famCodeForm').scrollIntoView({ block:'nearest' });
}
async function famAdminCodeSave(edition){
  const g = id => document.getElementById(id).value.trim();
  const code = g('fcCode').toUpperCase();
  if(!/^[A-Z0-9_-]{3,30}$/.test(code)) return famMsg('fcMsg', 'Code : 3 à 30 lettres majuscules, chiffres, - ou _.');
  const cts = id => { const v = g(id); return v === '' ? null : Math.round(parseFloat(v.replace(',','.'))*100); };
  const row = { code, libelle: g('fcLib'), valide_du: g('fcDu') || null, valide_au: g('fcAu') || null, fin_acces: g('fcFin') || null,
    max_utilisations: g('fcMax') ? parseInt(g('fcMax'),10) : null, une_fois_par_famille: document.getElementById('fcUne').checked, prix: null, remise_pct: null };
  if(g('fcMode') === 'prix'){
    const prix = { '1': cts('fcP1'), '2': cts('fcP2'), '3': cts('fcP3') };
    if(Object.values(prix).some(x=>!(x >= 50))) return famMsg('fcMsg', 'Indiquez les trois prix (0,50 € minimum).');
    row.prix = prix;
  } else {
    const pct = parseInt(g('fcPct'),10);
    if(!(pct >= 1 && pct <= 90)) return famMsg('fcMsg', 'Remise entre 1 et 90 %.');
    row.remise_pct = pct;
  }
  if(row.valide_du && row.valide_au && row.valide_au < row.valide_du) return famMsg('fcMsg', 'La date de fin de validité précède la date de début.');
  const { error } = edition
    ? await sb.from('famille_codes_promo').update(row).eq('code', code)
    : await sb.from('famille_codes_promo').insert(row);
  if(error) return famMsg('fcMsg', /duplicate|unique/i.test(error.message) ? 'Ce code existe déjà.' : error.message);
  famAdminRefresh();
}
async function famAdminCodeActif(code, actif){
  const { error } = await sb.from('famille_codes_promo').update({ actif }).eq('code', code);
  if(error) return niceAlert('Erreur : '+error.message);
  famAdminRefresh();
}
async function famAdminExclAjouter(){
  const uai = (document.getElementById('famExclUai').value||'').trim().toUpperCase();
  if(!/^[0-9]{7}[A-Z]$/.test(uai)) return famMsg('famExclMsg', 'UAI invalide (7 chiffres et une lettre).');
  const { error } = await sb.from('famille_exclusions').insert({ uai, motif: (document.getElementById('famExclMotif').value||'').trim() || null });
  if(error) return famMsg('famExclMsg', error.message);
  famAdminRefresh();
}
async function famAdminExclRetirer(uai){
  if(!(await niceConfirm('Retirer '+uai+' de la liste des établissements exclus ?'))) return;
  const { error } = await sb.from('famille_exclusions').delete().eq('uai', uai);
  if(error) return famMsg('famExclMsg', error.message);
  famAdminRefresh();
}

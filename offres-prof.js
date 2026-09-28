/* =====================================================================
   offres-prof.js -- Offres professeur « manuel numérique » : Mon abonnement, Mes classes

   Demandé : "Si je considère que c'est un manuel numérique augmenté, il faut aussi réfléchir sur
   des offres par niveau", "limiter l'accès à un niveau / 1 classe (30 élèves) pour 39 €", "le prof
   particulier (fixe + abonnement par élève) -> permet de faire des cours en groupe", avec la classe
   et les comptes élèves créés par le professeur lui-même, dans ses limites.

   - Professeur seul : 39 € le premier niveau, 29 € par niveau en plus ; une classe de 30 élèves au
     plus par niveau payé, + 15 € par classe en plus (demandé : "et si un prof seul a deux classes de
     6e ?" : les classes en plus se répartissent librement entre les niveaux payés) ; le professeur et ses élèves n'ont que ces niveaux (et le niveau
     inférieur en révision), comme pour l'offre Famille.
   - Professeur particulier : 39 € + 20 € par élève ; groupes libres (tous niveaux).
   - Paiement unique pour l'année scolaire (jusqu'au 31 août), compléments à la différence.
   - Essai de 15 jours : une classe de 30 élèves pour essayer.
   Toutes les écritures passent par la fonction serveur « prof-offre » (limites vérifiées côté
   serveur) ; prix dans prof_parametres (modifiables dans l'Administration). Les comptes gérés par
   un référent ou l'administrateur (licence établissement, comptes activés à la main) ne sont pas
   concernés.
   ===================================================================== */

const OP_ORDRE = ['6e','5e','4e','3e'];
const OP_DISPO = ['6e','5e']; // miroir de NIVEAUX_DISPONIBLES (fonction prof-offre)
let opPrix = { seul_base:3900, seul_niveau:2900, seul_classe:1500, part_base:3900, part_eleve:2000, seul_eleves_max:30 };
let opOffre = null;       // ligne prof_offres du professeur connecté
let offreNiveaux = null;  // null : pas de restriction ; sinon niveaux ouverts (Professeur seul, ou élève d'une classe en libre-service)
let opEtat = null;        // { choix:'seul'|'particulier', niveaux:Set, classesSup, places, devis, identsNeufs:[] }

function opEur(c){ return (c/100).toFixed(2).replace('.',',').replace(',00','') + ' €'; }
function opEsc(s){ return (s==null?'':String(s)).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function opDate(s){ return s ? new Date(String(s).length===10 ? s+'T00:00:00' : s).toLocaleDateString('fr-FR') : ''; }
function opIdent(email){ return email && email.endsWith('@mathcollege.local') ? email.slice(0, -'@mathcollege.local'.length) : (email||''); }
function opAujourdhui(){ return new Date().toISOString().slice(0,10); }
// Niveaux ouverts : ceux payés (ou de la classe), plus le niveau inférieur en révision.
function opRevision(niv){
  const s = new Set(niv);
  niv.forEach(n => { const i = OP_ORDRE.indexOf(n); if(i > 0) s.add(OP_ORDRE[i-1]); });
  return OP_ORDRE.filter(n => s.has(n));
}
function opNbClasses(o){ return (o && o.offre === 'seul') ? (o.niveaux || []).length + (o.classes_sup || 0) : 0; }
function opPayee(o){ return !!(o && o.offre && o.acces_until && o.acces_until >= opAujourdhui()); }

async function opChargerPrix(){
  try{ const { data } = await sb.from('prof_parametres').select('prix').eq('id', 1).maybeSingle(); if(data && data.prix) opPrix = Object.assign({}, opPrix, data.prix); }catch(e){}
}
opChargerPrix();

/* Appelée par refreshAuthUI (app.js) : offre du professeur, ou niveaux de l'élève. */
let opEtatUid = null;
async function offreLoad(role, licenceEtab){
  opOffre = null; offreNiveaux = null;
  // Changement de compte dans le même onglet : ne rien garder de l'autre compte (identifiants créés...).
  if(opEtatUid !== (currentUser ? currentUser.id : null)){ opEtat = null; opEtatUid = currentUser ? currentUser.id : null; }
  if(!currentUser) return;
  try{
    if(role === 'prof'){
      const { data } = await sb.from('prof_offres').select('*').eq('prof_id', currentUser.id).maybeSingle();
      opOffre = data || null;
      if(!licenceEtab && opPayee(opOffre) && opOffre.offre === 'seul') offreNiveaux = opRevision(opOffre.niveaux || []);
    } else if(role === 'eleve'){
      const { data } = await sb.from('class_students').select('classes(niveau,creee_par,groupe)').eq('student_id', currentUser.id);
      const cls = (data || []).map(r => r.classes).filter(c => c && !c.groupe); // les groupes de remédiation ne comptent pas
      // Élève inscrit uniquement dans des classes créées en libre-service : niveaux de ses classes.
      if(cls.length && cls.every(c => c.creee_par)) offreNiveaux = opRevision([...new Set(cls.map(c => c.niveau).filter(Boolean))]);
    }
  }catch(e){ /* hors ligne */ }
}
function offreClear(){ opOffre = null; offreNiveaux = null; opEtat = null; opEtatUid = null; opFactures = []; }

async function opCall(body){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session) throw new Error('Connectez-vous d\'abord.');
  const res = await fetch(SUPABASE_URL+'/functions/v1/prof-offre', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+session.access_token, 'apikey':SUPABASE_ANON_KEY },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({ error:'Réponse illisible du serveur.' }));
  if(data.error) throw new Error(data.error);
  return data;
}
function opMsg(id, text, ok){
  const el = document.getElementById(id); if(!el) return;
  el.innerHTML = text ? `<span style="color:${ok ? '#1E7B34' : '#B3261E'};">${opEsc(text)}</span>` : '';
}

/* ---------------------------------------------------------------------
   Page « Mon abonnement »
   --------------------------------------------------------------------- */
function openAbonnement(){
  if(typeof toggleAccountMenu === 'function' && document.getElementById('accountMenu') && document.getElementById('accountMenu').classList.contains('open')) toggleAccountMenu();
  if(location.hash !== '#/abonnement') location.hash = '#/abonnement';
  else renderAbonnement();
}
async function renderAbonnement(){
  const root = document.getElementById('abonnementRoot'); if(!root) return;
  if(!currentUser || currentUserRole !== 'prof'){ root.innerHTML = '<p class="hint">Réservé aux comptes professeur.</p>'; return; }
  root.innerHTML = '<p class="hint">Chargement…</p>';
  await Promise.all([opChargerPrix(), offreLoad('prof', !!currentEtabLicence)]);
  const { data: prof } = await sb.from('profiles').select('subscription_status,subscription_expires_at,signup_status').eq('id', currentUser.id).maybeSingle();
  const o = opOffre, payee = opPayee(o);
  const essai = !payee && prof && prof.subscription_status === 'trial' && prof.subscription_expires_at && new Date(prof.subscription_expires_at) > new Date();
  const gere = !payee && !essai && prof && prof.subscription_status === 'active' && !prof.subscription_expires_at; // compte activé par l'administrateur
  if(!opEtat){
    opEtat = { choix: payee ? o.offre : 'seul', niveaux: new Set(payee && o.offre === 'seul' ? o.niveaux : ['6e']), classesSup: payee && o.offre === 'seul' ? (o.classes_sup || 0) : 0,
      places: payee && o.offre === 'particulier' ? o.places : 5, devis: null, identsNeufs: [] };
  }
  let statut;
  if(currentEtabLicence) statut = `<div class="op-statut ok"><span class="gicon">apartment</span><div><b>Licence de votre établissement</b> jusqu'au ${opDate(currentEtabLicence)} : vous n'avez rien à payer. Vos classes sont gérées par le référent de l'établissement.</div></div>`;
  else if(payee) statut = `<div class="op-statut ok"><span class="gicon">verified</span><div><b>${o.offre === 'seul' ? 'Professeur seul · ' + (o.niveaux || []).join(', ') + ' · ' + opNbClasses(o) + ' classe' + (opNbClasses(o) > 1 ? 's' : '') : 'Professeur particulier · ' + o.places + ' élève' + (o.places > 1 ? 's' : '')}</b>${o.stripe_test ? ' <span class="op-badge">test</span>' : ''}<br>Jusqu'au ${opDate(o.acces_until)} (paiement unique, sans reconduction).${o.offre === 'seul' ? ' Cours ouverts : ' + opRevision(o.niveaux || []).join(', ') + '.' : ''}</div></div>`;
  else if(essai) { const j = Math.max(0, Math.ceil((new Date(prof.subscription_expires_at) - new Date()) / 86400000));
    statut = `<div class="op-statut essai"><span class="gicon">hourglass_top</span><div><b>Essai gratuit : encore ${j} jour${j > 1 ? 's' : ''}</b> (jusqu'au ${opDate(prof.subscription_expires_at)}). Pour essayer avec vos élèves : une classe de ${opPrix.seul_eleves_max} élèves au plus. Choisissez ensuite votre offre.</div></div>`; }
  else if(gere) statut = `<div class="op-statut ok"><span class="gicon">verified</span><div><b>Compte actif</b>, géré par l'administrateur du site : vos classes sont créées pour vous.</div></div>`;
  else statut = `<div class="op-statut ko"><span class="gicon">lock</span><div><b>Votre essai ou votre offre est terminé.</b> Choisissez une offre ci-dessous pour retrouver l'accès.</div></div>`;
  const peutPayer = !currentEtabLicence && !gere;
  const peutClasses = !currentEtabLicence && (payee || essai);
  const { data: factures } = await sb.from('facturation_documents').select('*').eq('prof_id', currentUser.id).order('date_emission', { ascending:false });
  opFactures = factures || [];
  root.innerHTML = `
    <h1 style="margin:6px 0 4px;"><span class="gicon">workspace_premium</span> Mon abonnement</h1>
    ${statut}
    ${new URLSearchParams(location.search).get('abonnement') === 'succes' ? '<div class="op-statut ok" id="opRetour"><span class="gicon">celebration</span><div><b>Merci !</b> Votre paiement est reçu : l\'offre s\'active dans quelques secondes (la page se met à jour toute seule).</div></div>' : ''}
    ${peutPayer ? opOffresHtml(o, payee) : ''}
    ${peutClasses ? '<div id="opClasses"><p class="hint">Chargement de vos classes…</p></div>' : ''}
    ${opFacturesHtml()}
    <p class="hint" style="margin:18px 0 0;">Tout le collège ? La <a href="tarifs/">licence établissement</a> couvre tous les professeurs et tous les élèves des niveaux choisis. Conditions : <a href="#/cgv">conditions générales de vente</a>.</p>`;
  if(peutPayer) opMajDevis();
  if(peutClasses) opRenderClasses(payee ? o.offre : 'essai');
  if(new URLSearchParams(location.search).get('abonnement') === 'succes') opAttendreActivation();
}
// Retour de Stripe : l'activation arrive par le webhook ; on relit l'offre quelques fois.
let opAttente = 0;
async function opAttendreActivation(){
  if(opAttente) return;
  const avant = JSON.stringify(opOffre);
  for(opAttente = 1; opAttente <= 10; opAttente++){
    await new Promise(r => setTimeout(r, 2500));
    const { data } = await sb.from('prof_offres').select('*').eq('prof_id', currentUser.id).maybeSingle();
    if(JSON.stringify(data || null) !== avant){
      history.replaceState(null, '', location.pathname + '#/abonnement');
      opEtat = null; opAttente = 0;
      if(typeof refreshAuthUI === 'function') await refreshAuthUI();
      return renderAbonnement();
    }
  }
  opAttente = 0;
}

function opOffresHtml(o, payee){
  const e = opEtat, P = opPrix;
  const bloque = t => payee && o.offre !== t; // changer d'offre en cours d'année : par e-mail
  const deja = payee && o.offre === 'seul' ? (o.niveaux || []) : [];
  const niv = OP_ORDRE.map(n => {
    const dispo = OP_DISPO.includes(n), paye = deja.includes(n);
    return `<label class="op-niv${!dispo ? ' off' : ''}"><input type="checkbox" ${e.niveaux.has(n) || paye ? 'checked' : ''} ${!dispo || paye ? 'disabled' : ''} onchange="opNiveau('${n}',this.checked)"> ${n}${paye ? ' <small>(compris)</small>' : !dispo ? ' <small>(bientôt)</small>' : ''}</label>`;
  }).join('');
  return `<div class="tool-shell op-card">
    <strong class="op-h"><span class="gicon">shopping_cart</span> ${payee ? 'Compléter mon offre' : 'Choisir mon offre'} <span class="hint" style="font-weight:400;">· année scolaire, jusqu'au 31 août</span></strong>
    <div class="op-choix">
      <button type="button" class="op-offre${e.choix === 'seul' ? ' on' : ''}" ${bloque('seul') ? 'disabled' : ''} onclick="opChoix('seul')">
        <span class="gicon">school</span><span><b class="t">Professeur seul</b><small>Pour vos classes au collège : <b>${opEur(P.seul_base)}</b> par an pour un niveau (une classe de ${P.seul_eleves_max} élèves), <b>+${opEur(P.seul_niveau)}</b> par niveau en plus, <b>+${opEur(P.seul_classe)}</b> par classe en plus d'un même niveau. Tous les outils du professeur.</small></span></button>
      <button type="button" class="op-offre${e.choix === 'particulier' ? ' on' : ''}" ${bloque('particulier') ? 'disabled' : ''} onclick="opChoix('particulier')">
        <span class="gicon">groups</span><span><b class="t">Professeur particulier</b><small>Cours particuliers et soutien, seul ou en groupe : <b>${opEur(P.part_base)}</b> par an <b>+ ${opEur(P.part_eleve)}</b> par élève. Groupes libres, tous niveaux.</small></span></button>
    </div>
    ${e.choix === 'seul' ? `<p class="op-lab">Niveaux :</p><div class="op-nivs">${niv}</div>
      <p class="hint" style="margin:4px 0 0;">Chaque niveau comprend une classe de ${P.seul_eleves_max} élèves et ouvre aussi le niveau inférieur en révision (ex. 5e → 6e).</p>
      <p class="op-lab">Classes en plus <span class="hint" style="font-weight:400;margin:0;">(ex. deux classes de 6e : 1 classe en plus) · ${opEur(P.seul_classe)} chacune</span></p>
      <div class="op-places"><button type="button" class="btn secondary qz-mini" onclick="opClassesSup(-1)" ${e.classesSup <= (payee && o.offre === 'seul' ? (o.classes_sup || 0) : 0) ? 'disabled' : ''}>−</button>
        <b class="op-nb" id="opClassesSup">${e.classesSup}</b>
        <button type="button" class="btn secondary qz-mini" onclick="opClassesSup(1)" ${e.classesSup >= 12 ? 'disabled' : ''}>+</button>
        <span class="hint" style="margin:0;">soit <b id="opNbClasses">${e.niveaux.size + e.classesSup}</b> classe(s) de ${P.seul_eleves_max} élèves en tout, à répartir entre vos niveaux</span></div>`
    : `<p class="op-lab">Nombre d'élèves :</p><div class="op-places"><input type="number" id="opPlaces" min="${payee && o.offre === 'particulier' ? o.places : 1}" max="200" value="${e.places}" oninput="opPlaces(this.value)">
      <span class="hint" style="margin:0;">${payee && o.offre === 'particulier' ? 'vous en avez ' + o.places + ' : ajoutez-en autant que nécessaire' : 'vous pourrez en ajouter en cours d\'année'}</span></div>`}
    <div class="op-devis" id="opDevis"></div>
    <label class="op-check"><input type="checkbox" id="opEngagement"><span>${e.choix === 'seul'
      ? 'J\'utilise cette offre avec <b>mes élèves de collège</b>, dans le cadre de mon enseignement. Pour des cours particuliers ou du soutien rémunéré, je choisis l\'offre Professeur particulier.'
      : 'J\'utilise ces comptes pour <b>mes élèves de cours particuliers ou de soutien</b>, un compte par élève, dans la limite des élèves payés.'}</span></label>
    <label class="op-check"><input type="checkbox" id="opRenonciation"><span>Je demande l'accès immédiat et renonce à mon droit de rétractation (paiement unique, sans reconduction). J'accepte les <a href="#/cgv" target="_blank">conditions générales de vente</a>.</span></label>
    <button class="btn op-payer" id="opPayer" onclick="opPayer()" disabled><span class="gicon">credit_card</span> Payer</button>
    <span class="hint" id="opPayMsg" style="display:block;margin-top:6px;"></span>
  </div>`;
}
function opChoix(t){ opEtat.choix = t; opEtat.devis = null; renderAbonnementPartiel(); }
function opNiveau(n, on){ if(on) opEtat.niveaux.add(n); else opEtat.niveaux.delete(n); const t = document.getElementById('opNbClasses'); if(t) t.textContent = opEtat.niveaux.size + opEtat.classesSup; opMajDevis(); }
function opClassesSup(d){ opEtat.classesSup = Math.max(0, Math.min(12, opEtat.classesSup + d)); renderAbonnementPartiel(); }
let opPlacesT = null;
function opPlaces(v){ opEtat.places = Math.max(1, Math.min(200, parseInt(v, 10) || 1)); clearTimeout(opPlacesT); opPlacesT = setTimeout(opMajDevis, 350); }
function renderAbonnementPartiel(){
  const card = document.querySelector('#abonnementRoot .op-card'); if(!card) return renderAbonnement();
  const tmp = document.createElement('div'); tmp.innerHTML = opOffresHtml(opOffre, opPayee(opOffre)); card.replaceWith(tmp.firstElementChild);
  opMajDevis();
}
let opDevisSeq = 0;
async function opMajDevis(){
  const box = document.getElementById('opDevis'), btn = document.getElementById('opPayer'); if(!box) return;
  const seq = ++opDevisSeq;
  box.innerHTML = '<span class="hint" style="margin:0;">Calcul du prix…</span>';
  try{
    const d = await opCall({ action:'devis', offre: opEtat.choix, niveaux: Array.from(opEtat.niveaux), classes_sup: opEtat.classesSup, places: opEtat.places });
    if(seq !== opDevisSeq) return;
    opEtat.devis = d;
    box.innerHTML = `<div class="op-lignes">${d.lignes.map(l => `<span>${opEsc(l)}</span>`).join('')}</div>
      <div class="op-total">${d.deja ? `Formule ${opEur(d.prix)} − déjà payé ${opEur(d.deja)} = ` : ''}<b>${opEur(d.montant)}</b> <span class="hint" style="margin:0;">· ${opEsc(d.annee)}, jusqu'au ${opDate(d.acces_until)}</span></div>`;
    if(btn){ btn.disabled = !(d.montant > 0); btn.innerHTML = `<span class="gicon">credit_card</span> ${d.montant > 0 ? 'Payer ' + opEur(d.montant) : 'Déjà compris dans votre offre'}`; }
  }catch(e){
    if(seq !== opDevisSeq) return;
    box.innerHTML = `<span style="color:#B3261E;">${opEsc(e.message)}</span>`; if(btn) btn.disabled = true;
  }
}
async function opPayer(){
  const btn = document.getElementById('opPayer');
  if(!document.getElementById('opEngagement').checked){ opMsg('opPayMsg', 'Merci de cocher l\'engagement d\'utilisation.'); return; }
  if(!document.getElementById('opRenonciation').checked){ opMsg('opPayMsg', 'Merci de cocher la demande d\'accès immédiat et les conditions de vente.'); return; }
  btn.disabled = true; opMsg('opPayMsg', 'Redirection vers le paiement sécurisé…', true);
  try{
    const d = await opCall({ action:'paiement', offre: opEtat.choix, niveaux: Array.from(opEtat.niveaux), classes_sup: opEtat.classesSup, places: opEtat.places,
      engagement: true, renonciation: true, origin: location.origin });
    location.href = d.url;
  }catch(e){ opMsg('opPayMsg', e.message); btn.disabled = false; }
}

/* ---------------------------------------------------------------------
   Mes classes (libre-service)
   --------------------------------------------------------------------- */
async function opRenderClasses(regime){
  const box = document.getElementById('opClasses'); if(!box) return;
  const { data: classes } = await sb.from('classes').select('id,nom,niveau').eq('creee_par', currentUser.id).order('created_at');
  const ids = (classes || []).map(c => c.id);
  const { data: ins } = ids.length ? await sb.from('class_students').select('class_id, profiles(id,prenom,nom,email)').in('class_id', ids) : { data: [] };
  const parClasse = new Map(ids.map(id => [id, []]));
  (ins || []).forEach(r => { if(r.profiles && parClasse.has(r.class_id)) parClasse.get(r.class_id).push(r.profiles); });
  parClasse.forEach(l => l.sort((a, b) => ((a.nom||'') + (a.prenom||'')).localeCompare((b.nom||'') + (b.prenom||''), 'fr')));
  const total = new Set((ins || []).map(r => r.profiles && r.profiles.id)).size;
  const max = opPrix.seul_eleves_max;
  const permises = regime === 'seul' ? opNbClasses(opOffre) : 0;
  const nivPossibles = regime === 'seul' ? (opOffre.niveaux || []) : OP_DISPO;
  const peutCreerClasse = regime === 'essai' ? !(classes || []).length : regime === 'seul' ? (classes || []).length < permises : true;
  const jauge = regime === 'particulier' ? `<span class="op-jauge${total >= opOffre.places ? ' plein' : ''}">${total} / ${opOffre.places} élève${opOffre.places > 1 ? 's' : ''}</span>`
    : regime === 'seul' ? `<span class="op-jauge${(classes || []).length >= permises ? ' plein' : ''}">${(classes || []).length} / ${permises} classe${permises > 1 ? 's' : ''}</span>` : '';
  const neufs = opEtat && opEtat.identsNeufs.length ? `<div class="op-neufs">
      <b><span class="gicon">key</span> Identifiants créés</b> <span class="hint" style="margin:0;">(les mots de passe ne seront plus affichés : notez-les ou imprimez-les maintenant)</span>
      <table class="op-tab"><thead><tr><th>Élève</th><th>Identifiant</th><th>Mot de passe</th></tr></thead><tbody>${opEtat.identsNeufs.map(x => `<tr><td>${opEsc(x.nom)}</td><td><code>${opEsc(x.ident)}</code></td><td><code>${opEsc(x.mdp)}</code></td></tr>`).join('')}</tbody></table>
      <button class="btn secondary qz-mini" onclick="opImprimerIdents()"><span class="gicon">print</span> Imprimer les fiches</button>
      <button class="btn secondary qz-mini" onclick="opEtat.identsNeufs=[];opRenderClasses('${regime}')">Masquer</button></div>` : '';
  box.innerHTML = `<div class="tool-shell op-card">
    <strong class="op-h"><span class="gicon">groups</span> ${regime === 'particulier' ? 'Groupes de mon offre' : 'Classes de mon offre'} ${jauge}</strong>
    <p class="hint" style="margin:0 0 10px;">${regime === 'particulier'
      ? 'Créez autant de groupes que vous voulez (un élève seul ou plusieurs), dans la limite des élèves de votre offre.'
      : regime === 'essai' ? 'Pendant l\'essai : une classe de ' + max + ' élèves au plus.'
      : 'Votre offre comprend ' + permises + ' classe' + (permises > 1 ? 's' : '') + ' de ' + max + ' élèves au plus, dans les niveaux ' + (opOffre.niveaux || []).join(', ') + '.'} Vos élèves se connectent avec leur identifiant et leur mot de passe (menu Se connecter).</p>
    ${neufs}
    ${(classes || []).map(c => { const el = parClasse.get(c.id) || [];
      return `<div class="op-classe">
        <div class="op-classe-h"><b>${opEsc(c.nom)}</b> <span class="op-badge niv">${opEsc(c.niveau || '')}</span>
          <span class="hint" style="margin:0;">${el.length}${regime !== 'particulier' ? ' / ' + max : ''} élève${el.length > 1 ? 's' : ''}</span>
          <span style="flex:1"></span>
          <button class="btn secondary qz-mini" onclick="opRenommerClasse('${c.id}','${opEsc(c.nom).replace(/'/g, '&#39;')}')"><span class="gicon">edit</span></button>
          ${el.length ? '' : `<button class="btn secondary qz-mini" onclick="opSupprimerClasse('${c.id}')" title="Supprimer la classe"><span class="gicon">delete</span></button>`}</div>
        ${el.length ? `<div class="op-eleves">${el.map(p => `<div class="op-eleve"><span>${opEsc(((p.prenom||'') + ' ' + (p.nom||'')).trim())}</span><code>${opEsc(opIdent(p.email))}</code>
            <button class="btn secondary qz-mini" onclick="opNouveauMdp('${p.id}','${opEsc(p.prenom||'').replace(/'/g, '&#39;')}')" title="Nouveau mot de passe"><span class="gicon">key</span></button>
            <button class="btn secondary qz-mini" onclick="opSupprimerEleve('${p.id}','${opEsc(p.prenom||'').replace(/'/g, '&#39;')}','${regime}')" title="Supprimer le compte"><span class="gicon">person_remove</span></button></div>`).join('')}</div>` : ''}
        <div class="op-ajout">
          <textarea id="opAjout_${c.id}" rows="2" placeholder="Un élève par ligne : Prénom Nom (ex. Léa Martin)"></textarea>
          <button class="btn qz-mini" onclick="opAjouterEleves('${c.id}','${regime}')"><span class="gicon">person_add</span> Créer les comptes</button>
          <span class="hint" id="opAjoutMsg_${c.id}" style="margin:0;"></span>
        </div></div>`; }).join('') || '<p class="hint">Aucune classe pour l\'instant.</p>'}
    ${peutCreerClasse ? `<div class="op-nouvelle"><input type="text" id="opNomClasse" placeholder="${regime === 'particulier' ? 'Nom du groupe (ex. Brevet mardi)' : 'Nom de la classe (ex. 6e B)'}" maxlength="40">
      <select id="opNivClasse">${(regime === 'seul' ? nivPossibles : OP_DISPO).map(n => `<option value="${n}">${n}</option>`).join('')}</select>
      <button class="btn secondary" onclick="opCreerClasse('${regime}')"><span class="gicon">add</span> ${regime === 'particulier' ? 'Nouveau groupe' : 'Nouvelle classe'}</button>
      <span class="hint" id="opClasseMsg" style="margin:0;"></span></div>`
    : regime === 'seul' ? `<p class="hint" style="margin:8px 0 0;">Toutes les classes de votre offre sont créées : ajoutez une classe (${opEur(opPrix.seul_classe)}) ou un niveau dans « Compléter mon offre » ci-dessus.</p>`
    : regime === 'essai' ? '<p class="hint" style="margin:8px 0 0;">Une seule classe pendant l\'essai.</p>' : ''}
  </div>`;
}
async function opCreerClasse(regime){
  const nom = document.getElementById('opNomClasse').value.trim(), niveau = document.getElementById('opNivClasse').value;
  opMsg('opClasseMsg', 'Création…', true);
  try{
    await opCall({ action:'classe-creer', nom, niveau });
    if(typeof loadMyClasses === 'function') await loadMyClasses();
    opRenderClasses(regime);
  }catch(e){ opMsg('opClasseMsg', e.message); }
}
async function opRenommerClasse(id, nom){
  const n = await nicePrompt('Nouveau nom de la classe :', nom); if(!n || !n.trim()) return;
  try{ await opCall({ action:'classe-renommer', class_id:id, nom:n.trim() }); if(typeof loadMyClasses === 'function') await loadMyClasses(); opRenderClasses(opRegime()); }
  catch(e){ niceAlert(e.message); }
}
async function opSupprimerClasse(id){
  if(!(await niceConfirm('Supprimer cette classe (vide) ?'))) return;
  try{ await opCall({ action:'classe-supprimer', class_id:id }); if(typeof loadMyClasses === 'function') await loadMyClasses(); opRenderClasses(opRegime()); }
  catch(e){ niceAlert(e.message); }
}
function opRegime(){ return opPayee(opOffre) ? opOffre.offre : 'essai'; }
function opSansAccents(s){ return String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.+|\.+$/g,''); }
function opMdp(){ const c = 'abcdefghjkmnpqrstuvwxyz', d = '23456789'; let s = ''; for(let i = 0; i < 4; i++) s += c[Math.floor(Math.random()*c.length)]; for(let i = 0; i < 3; i++) s += d[Math.floor(Math.random()*d.length)]; return s; }
async function opAjouterEleves(classId, regime){
  const ta = document.getElementById('opAjout_' + classId);
  const lignes = ta.value.split('\n').map(l => l.trim()).filter(Boolean);
  if(!lignes.length){ opMsg('opAjoutMsg_' + classId, 'Écrivez au moins un élève : Prénom Nom.'); return; }
  const restes = [];
  for(let i = 0; i < lignes.length; i++){
    const [prenom, ...reste] = lignes[i].split(/\s+/), nom = reste.join(' ');
    opMsg('opAjoutMsg_' + classId, `Création ${i + 1} / ${lignes.length}…`, true);
    const base = opSansAccents(prenom + (nom ? '.' + nom : '')).slice(0, 26) || 'eleve';
    const mdp = opMdp();
    let ok = false, err = '';
    for(let k = 0; k < 4 && !ok; k++){
      const ident = k ? base + (k + 1) : base;
      try{ const r = await opCall({ action:'eleve-creer', class_id:classId, prenom, nom, identifiant: ident.length < 3 ? ident + '.eleve' : ident, password: mdp });
        opEtat.identsNeufs.push({ nom: (prenom + ' ' + nom).trim(), ident: r.identifiant, mdp }); ok = true; }
      catch(e){ err = e.message; if(!/déjà pris/.test(err)) break; }
    }
    if(!ok){ restes.push(lignes[i]); opMsg('opAjoutMsg_' + classId, lignes[i] + ' : ' + err); if(!/déjà pris/.test(err)){ restes.push(...lignes.slice(i + 1)); break; } }
  }
  await opRenderClasses(regime);
  const ta2 = document.getElementById('opAjout_' + classId);
  if(ta2 && restes.length){ ta2.value = restes.join('\n'); }
}
async function opNouveauMdp(id, prenom){
  const mdp = opMdp();
  if(!(await niceConfirm(`Donner un nouveau mot de passe à ${prenom} ?`))) return;
  try{
    const { data:{ session } } = await sb.auth.getSession();
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', { method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer '+session.access_token, 'apikey':SUPABASE_ANON_KEY },
      body: JSON.stringify({ action:'reset-password', userId:id, newPassword:mdp }) });
    const d = await res.json(); if(d.error) throw new Error(d.error);
    niceAlert(`Nouveau mot de passe de ${prenom} : ${mdp}`);
  }catch(e){ niceAlert('Erreur : ' + e.message); }
}
async function opSupprimerEleve(id, prenom, regime){
  if(!(await niceConfirm(`Supprimer le compte de ${prenom} ? Ses résultats et ses devoirs sont effacés.`))) return;
  try{ await opCall({ action:'eleve-supprimer', student_id:id }); opRenderClasses(regime); }
  catch(e){ niceAlert(e.message); }
}
function opImprimerIdents(){
  const l = (opEtat && opEtat.identsNeufs) || []; if(!l.length) return;
  const w = window.open('', '_blank'); if(!w) return;
  w.document.write(`<!doctype html><meta charset="utf-8"><title>Identifiants</title><style>body{font-family:Arial,sans-serif;margin:16px;} .f{display:inline-block;width:46%;margin:1%;border:1px dashed #999;border-radius:8px;padding:10px;box-sizing:border-box;vertical-align:top;} b{font-size:15px;} code{font-size:15px;}</style>
    ${l.map(x => `<div class="f"><b>${opEsc(x.nom)}</b><br>Site : maths.latelieraugmente.fr<br>Identifiant : <code>${opEsc(x.ident)}</code><br>Mot de passe : <code>${opEsc(x.mdp)}</code></div>`).join('')}
    <script>window.print()<\/script>`);
  w.document.close();
}

/* ---------------------------------------------------------------------
   Mes factures
   --------------------------------------------------------------------- */
let opFactures = [];
function opFacturesHtml(){
  if(!opFactures.length) return '';
  return `<div class="tool-shell op-card"><strong class="op-h"><span class="gicon">receipt_long</span> Mes factures</strong>
    ${opFactures.map(f => `<div class="op-facture"><div><b>${opEsc(f.numero)}</b>${f.test ? ' <span class="op-badge">test</span>' : ''}<div class="hint" style="margin:0;">${opDate(f.date_emission)} · ${opEur(Math.round(Number(f.total)*100))}</div></div>
      <span><button class="btn secondary qz-mini" onclick="opVoirFacture('${f.id}',false)"><span class="gicon">visibility</span> Voir</button>
      <button class="btn qz-mini" onclick="opVoirFacture('${f.id}',true)"><span class="gicon">download</span> PDF</button></span></div>`).join('')}</div>`;
}
function opVoirFacture(id, pdf){ const f = opFactures.find(x => x.id === id); if(f && typeof facOpenPdf === 'function') facOpenPdf(null, f, pdf); }

/* ---------------------------------------------------------------------
   Administration : onglet « Offres profs » (administrateur général uniquement)
   Prix, professeurs et leur offre, mode test Stripe, et vigilance -- demandé : "j'ai peur qu'un
   professeur en profite pour donner des cours particuliers à des élèves en leur donnant un accès
   sur le site". Des signaux à vérifier, jamais de blocage automatique (groupes de soutien, AP,
   ULIS... sont légitimes).
   --------------------------------------------------------------------- */
(function opAdminInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'offresprof';
  btn.innerHTML = '<span class=gicon>workspace_premium</span> Offres profs';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-offresprof';
  panel.innerHTML = '<div id="opAdminRoot"><p class="hint">Chargement…</p></div>';
  view.appendChild(panel);
  btn.addEventListener('click', () => {
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    opAdminRefresh();
  });
  const origApply = window.adminApplyScopeUI;
  if(typeof origApply === 'function'){
    window.adminApplyScopeUI = function(){
      origApply.apply(this, arguments);
      const scoped = typeof adminScopeUai === 'function' && !!adminScopeUai();
      btn.style.display = scoped ? 'none' : '';
      if(scoped && btn.classList.contains('active')) document.querySelector('#adminTabs [data-admin-tab="comptes"]').click();
    };
    window.adminApplyScopeUI();
  }
})();
const OP_MOTS_SUSPECTS = /\b(cours|soutien|particuliers?|perso|priv[ée]s?|stage|tutorat|r[ée]p[ée]titions?|domicile|maison)\b/i;
async function opAdminRefresh(){
  const root = document.getElementById('opAdminRoot'); if(!root) return;
  if(currentUserRole !== 'admin'){ root.innerHTML = '<p class="hint">Réservé à l\'administrateur.</p>'; return; }
  const [{ data: profs }, { data: offres }, { data: classes }, { data: pays }, { data: param }] = await Promise.all([
    sb.from('profiles').select('id,nom,prenom,email,uai,subscription_status,subscription_expires_at,signup_status').eq('role', 'prof').order('nom'),
    sb.from('prof_offres').select('*'),
    sb.from('classes').select('id,nom,niveau,creee_par,created_at').not('creee_par', 'is', null),
    sb.from('prof_paiements').select('prof_id,montant_centimes,test,created_at'),
    sb.from('prof_parametres').select('prix').eq('id', 1).maybeSingle(),
  ]);
  const P = Object.assign({}, opPrix, (param && param.prix) || {});
  const offreDe = new Map((offres || []).map(o => [o.prof_id, o]));
  const cls = classes || [], ids = cls.map(c => c.id);
  const { data: ins } = ids.length ? await sb.from('class_students').select('class_id,student_id').in('class_id', ids) : { data: [] };
  const eleves = new Map(ids.map(id => [id, []])); (ins || []).forEach(r => { if(eleves.has(r.class_id)) eleves.get(r.class_id).push(r.student_id); });
  // Activité des élèves de ces classes : part hors temps scolaire (soir, mercredi après-midi, week-end).
  const tousEleves = [...new Set((ins || []).map(r => r.student_id))];
  const { data: act } = tousEleves.length ? await sb.from('cm_results').select('student_id,created_at').in('student_id', tousEleves).order('created_at', { ascending:false }).limit(3000) : { data: [] };
  const horsTemps = d => { const x = new Date(d), j = x.getDay(), h = x.getHours() + x.getMinutes() / 60; return j === 0 || j === 6 || h < 8 || h >= 17.5 || (j === 3 && h >= 12.5); };
  const actEleve = new Map(); (act || []).forEach(a => { const s = actEleve.get(a.student_id) || [0, 0]; s[0]++; if(horsTemps(a.created_at)) s[1]++; actEleve.set(a.student_id, s); });
  const today = opAujourdhui(), now = new Date();
  const signaux = [];
  const lignes = (profs || []).map(p => {
    const o = offreDe.get(p.id), mes = cls.filter(c => c.creee_par === p.id);
    const nbEl = new Set(mes.flatMap(c => eleves.get(c.id) || [])).size;
    let statut;
    if(opPayee(o)) statut = `<span class="op-badge" style="background:#1E7B34;">${o.offre === 'seul' ? 'Prof seul ' + (o.niveaux || []).join(', ') + ' · ' + opNbClasses(o) + ' cl.' : 'Particulier ' + o.places + ' él.'}</span><div class="hint" style="margin:0;">jusqu'au ${opDate(o.acces_until)}</div>`;
    else if(p.subscription_status === 'trial' && p.subscription_expires_at && new Date(p.subscription_expires_at) > now) statut = `<span class="op-badge" style="background:#B8860B;">essai</span><div class="hint" style="margin:0;">jusqu'au ${opDate(p.subscription_expires_at)}</div>`;
    else if(p.subscription_status === 'active' && !p.subscription_expires_at) statut = '<span class="op-badge" style="background:#0C5BA0;">géré (admin)</span>';
    else if(p.signup_status !== 'approved') statut = `<span class="op-badge" style="background:#8A8F98;">${opEsc(p.signup_status || '')}</span>`;
    else statut = '<span class="op-badge" style="background:#8A8F98;">sans accès</span>';
    // Signaux (classes en libre-service uniquement ; l'offre particulier est faite pour les cours particuliers).
    const regime = opPayee(o) ? o.offre : 'essai';
    if(regime !== 'particulier'){
      mes.forEach(c => {
        const el = eleves.get(c.id) || [], age = (now - new Date(c.created_at)) / 86400000;
        const raisons = [];
        if(OP_MOTS_SUSPECTS.test(c.nom || '')) raisons.push('nom de classe « ' + c.nom + ' »');
        if(el.length && el.length <= 5 && age > 14) raisons.push(el.length + ' élève' + (el.length > 1 ? 's' : '') + ' seulement');
        const tot = el.reduce((t, s) => { const a = actEleve.get(s); return a ? [t[0] + a[0], t[1] + a[1]] : t; }, [0, 0]);
        if(tot[0] >= 20 && tot[1] / tot[0] > 0.7) raisons.push(Math.round(100 * tot[1] / tot[0]) + ' % de l\'activité hors temps scolaire');
        if(raisons.length) signaux.push({ p, c, raisons });
      });
    }
    return `<tr><td>${opEsc([p.prenom, p.nom].filter(Boolean).join(' '))}<br><small class="hint">${opEsc(p.email || '')} · ${opEsc(p.uai || 'sans UAI')}</small></td>
      <td>${statut}</td><td>${mes.length ? mes.map(c => `${opEsc(c.nom)} <small class="hint">(${opEsc(c.niveau || '')}, ${(eleves.get(c.id) || []).length})</small>`).join('<br>') : '–'}</td>
      <td>${nbEl || '–'}</td><td>${o && o.montant_paye_centimes ? opEur(o.montant_paye_centimes) : '–'}</td>
      <td><label class="hint" style="display:inline-flex;gap:4px;align-items:center;margin:0;white-space:nowrap;" title="Paiements simulés avec la clé test de Stripe (cartes fictives)"><input type="checkbox" ${o && o.stripe_test ? 'checked' : ''} onchange="opAdminTest('${p.id}', this)"> test</label></td></tr>`;
  }).join('');
  const ca = (pays || []).filter(x => !x.test).reduce((a, x) => a + x.montant_centimes, 0);
  const eurIn = c => (c / 100).toFixed(2);
  root.innerHTML = `
    <div class="tool-shell op-card">
      <strong class="op-h"><span class="gicon">policy</span> Vigilance : classes à regarder</strong>
      <p class="hint" style="margin:0 0 8px;">Classes créées par des professeurs (essai ou Professeur seul) qui ressemblent à des cours particuliers : nom évocateur, 5 élèves au plus après 15 jours, activité surtout le soir, le mercredi après-midi et le week-end. Ce ne sont que des indices (groupe de soutien, AP, ULIS…) : à vérifier avant d'écrire au professeur.</p>
      ${signaux.length ? `<table class="op-tab" style="width:100%;"><thead><tr><th>Professeur</th><th>Classe</th><th>Indices</th></tr></thead><tbody>${signaux.map(s => `<tr><td>${opEsc([s.p.prenom, s.p.nom].filter(Boolean).join(' '))}<br><small class="hint">${opEsc(s.p.email || '')}</small></td><td>${opEsc(s.c.nom)} (${opEsc(s.c.niveau || '')})</td><td>${s.raisons.map(opEsc).join(' · ')}</td></tr>`).join('')}</tbody></table>` : '<p class="hint" style="margin:0;"><span class="gicon" style="color:#1E7B34;vertical-align:middle;">check_circle</span> Rien à signaler.</p>'}
    </div>
    <div class="tool-shell op-card">
      <strong class="op-h"><span class="gicon">school</span> Professeurs et offres</strong>
      <p class="hint" style="margin:0 0 8px;">${ca ? opEur(ca) + ' encaissés (paiements de test exclus). ' : ''}« géré (admin) » : comptes activés à la main, sans offre ni limite. Cochez « test » pour qu'un professeur paie avec les cartes fictives de Stripe.</p>
      <div style="overflow-x:auto;"><table class="op-tab" style="width:100%;"><thead><tr><th>Professeur</th><th>Offre</th><th>Classes en libre-service</th><th>Élèves</th><th>Payé (année)</th><th>Stripe</th></tr></thead><tbody>${lignes}</tbody></table></div>
    </div>
    <div class="tool-shell op-card">
      <strong class="op-h"><span class="gicon">sell</span> Prix des offres professeur</strong>
      <p class="hint" style="margin:0 0 8px;">Prix TTC par année scolaire, appliqués aux nouveaux paiements et affichés dans « Mon abonnement » (pensez à la page Tarifs).</p>
      <div class="op-nouvelle">
        <label class="hint">Prof seul, 1<sup>er</sup> niveau <input type="number" id="opPx1" step="0.01" min="1" value="${eurIn(P.seul_base)}" style="width:80px;"> €</label>
        <label class="hint">niveau en plus <input type="number" id="opPx2" step="0.01" min="0" value="${eurIn(P.seul_niveau)}" style="width:80px;"> €</label>
        <label class="hint">classe en plus <input type="number" id="opPx6" step="0.01" min="0" value="${eurIn(P.seul_classe)}" style="width:80px;"> €</label>
        <label class="hint">élèves par classe <input type="number" id="opPx5" step="1" min="1" value="${P.seul_eleves_max}" style="width:60px;"></label>
        <label class="hint">Particulier, forfait <input type="number" id="opPx3" step="0.01" min="0" value="${eurIn(P.part_base)}" style="width:80px;"> €</label>
        <label class="hint">par élève <input type="number" id="opPx4" step="0.01" min="0" value="${eurIn(P.part_eleve)}" style="width:80px;"> €</label>
        <button class="btn" onclick="opAdminPrix()">Enregistrer</button> <span class="hint" id="opPxMsg"></span>
      </div>
    </div>`;
}
async function opAdminTest(profId, cb){
  const { error } = await sb.from('prof_offres').upsert({ prof_id: profId, stripe_test: cb.checked, updated_at: new Date().toISOString() }, { onConflict: 'prof_id' });
  if(error){ cb.checked = !cb.checked; niceAlert('Erreur : ' + error.message); }
}
async function opAdminPrix(){
  const c = id => Math.round(parseFloat(String(document.getElementById(id).value).replace(',', '.')) * 100);
  const prix = { seul_base: c('opPx1'), seul_niveau: c('opPx2'), seul_classe: c('opPx6'), part_base: c('opPx3'), part_eleve: c('opPx4'), seul_eleves_max: Math.max(1, parseInt(document.getElementById('opPx5').value, 10) || 30) };
  if(Object.values(prix).some(v => !(v >= 0))){ opMsg('opPxMsg', 'Montants invalides.'); return; }
  const { error } = await sb.from('prof_parametres').update({ prix, updated_at: new Date().toISOString() }).eq('id', 1);
  if(error){ opMsg('opPxMsg', 'Erreur : ' + error.message); return; }
  opPrix = Object.assign({}, opPrix, prix); opMsg('opPxMsg', 'Prix enregistrés.', true);
}

(function opStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #abonnementRoot{max-width:900px;}
    .op-statut{display:flex;gap:10px;align-items:flex-start;border-radius:12px;padding:12px 14px;margin:10px 0;border:1px solid;}
    .op-statut > .gicon{font-size:26px;} .op-statut.ok{background:#EEF7F0;border-color:#BFE0C8;} .op-statut.ok > .gicon{color:#1E7B34;}
    .op-statut.essai{background:#FFF8E6;border-color:#F0D48A;} .op-statut.essai > .gicon{color:#B8860B;}
    .op-statut.ko{background:#FDEEEC;border-color:#F2B8B0;} .op-statut.ko > .gicon{color:#B3261E;}
    .op-card{margin-top:14px;} .op-h{display:flex;align-items:center;gap:8px;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;margin-bottom:10px;flex-wrap:wrap;}
    .op-choix{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
    .op-offre{display:flex;gap:10px;align-items:flex-start;text-align:left;border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:12px;padding:11px 12px;cursor:pointer;font:inherit;color:var(--ink);}
    .op-offre .gicon{font-size:28px;color:#0C5BA0;} .op-offre b.t{display:block;font-family:'Space Grotesk',sans-serif;font-size:1rem;} .op-offre small{display:block;color:var(--ink-soft);font-size:.82rem;line-height:1.4;margin-top:3px;}
    .op-offre.on{border-color:#0C5BA0;background:#EEF4FB;box-shadow:0 0 0 3px rgba(12,91,160,.12);} .op-offre:disabled{opacity:.45;cursor:not-allowed;}
    .op-lab{margin:12px 0 6px;font-weight:600;} .op-nivs{display:flex;gap:10px;flex-wrap:wrap;}
    .op-niv{display:flex;align-items:center;gap:6px;border:1.5px solid rgba(28,43,57,.15);border-radius:10px;padding:7px 12px;font-weight:600;background:#fff;} .op-niv.off{opacity:.5;} .op-niv small{font-weight:400;color:var(--ink-soft);}
    .op-places{display:flex;align-items:center;gap:10px;flex-wrap:wrap;} .op-nb{font-size:1.2rem;min-width:22px;text-align:center;} .op-places input{width:90px;font-size:1.1rem;padding:6px 8px;border-radius:8px;border:1.5px solid rgba(28,43,57,.2);}
    .op-devis{margin:12px 0;padding:10px 12px;background:rgba(12,91,160,.05);border-radius:10px;}
    .op-lignes{display:flex;gap:6px 16px;flex-wrap:wrap;color:var(--ink-soft);font-size:.88rem;} .op-total{margin-top:4px;font-size:1.05rem;} .op-total b{font-size:1.3rem;color:#0C5BA0;}
    .op-check{display:flex;gap:8px;align-items:flex-start;font-size:.88rem;margin:6px 0;line-height:1.4;} .op-check input{margin-top:3px;}
    .op-payer{margin-top:8px;}
    .op-badge{display:inline-block;background:#6A4FB3;color:#fff;border-radius:999px;padding:1px 8px;font-size:.72rem;font-weight:700;} .op-badge.niv{background:#0C5BA0;}
    .op-jauge{background:rgba(12,91,160,.1);color:#0C5BA0;border-radius:999px;padding:2px 10px;font-size:.82rem;} .op-jauge.plein{background:#FDEEEC;color:#B3261E;}
    .op-classe{border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:10px 12px;margin:10px 0;background:#fff;}
    .op-classe-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .op-eleves{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:4px 12px;margin:8px 0;}
    .op-eleve{display:flex;align-items:center;gap:8px;font-size:.9rem;} .op-eleve span{flex:1;} .op-eleve code{color:var(--ink-soft);font-size:.8rem;}
    .op-ajout{display:flex;gap:8px;align-items:flex-start;flex-wrap:wrap;margin-top:8px;} .op-ajout textarea{flex:1;min-width:220px;border-radius:8px;border:1px solid rgba(28,43,57,.2);padding:6px 8px;font:inherit;}
    .op-nouvelle{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px;} .op-nouvelle > input{flex:1;min-width:180px;} .op-nouvelle label{display:inline-flex;align-items:center;gap:4px;margin:0;}
    .op-neufs{background:#FFF8E6;border:1px solid #F0D48A;border-radius:10px;padding:10px 12px;margin:6px 0 10px;}
    .op-tab{border-collapse:collapse;margin:8px 0;font-size:.88rem;} .op-tab th,.op-tab td{border-bottom:1px solid rgba(28,43,57,.1);padding:4px 10px;text-align:left;}
    .op-facture{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:6px 0;border-top:1px solid rgba(28,43,57,.06);}
    @media (max-width:700px){ .op-choix{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

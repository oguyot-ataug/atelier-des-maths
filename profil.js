/* ============================================================
   profil.js -- page « Mon profil » et adresse e-mail de récupération.
   Demandé le 30/10/2026 : « Il serait bien d'avoir une page votre profil qui permet de modifier
   certaines données nous concernant. Le champ email n'est pas présent. Donc pour récupérer son
   mot de passe oublié, ça pose problème. »

   Les comptes se connectent par identifiant (adresse fictive …@mathcollege.local) : chaque adulte
   (professeur, parent, administrateur) peut enregistrer une adresse e-mail de récupération,
   confirmée par un lien (fonction serveur « profil », table profil_contact). « Mot de passe oublié »
   accepte alors l'identifiant ou l'adresse. Les élèves n'ont pas d'adresse : leur professeur
   (ou leurs parents) leur donne un nouveau mot de passe.
   ============================================================ */

const PROFIL_FICTIF = /@mathcollege\.local$/i;
let profilEtat = null;

function openProfil(){
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  if(!currentUser){ showView('view-home'); setActiveTopnav(null); toggleAccountMenu(); return; }
  showView('view-profil'); setActiveTopnav(null);
  renderProfil();
}

async function profilAppel(corps){
  const { data, error } = await sb.functions.invoke('profil', { body: Object.assign({ origine: location.origin }, corps) });
  if(error){
    let msg = error.message;
    try{ const j = await error.context.json(); if(j && j.error) msg = j.error; }catch(e){}
    throw new Error(msg);
  }
  if(data && data.error) throw new Error(data.error);
  return data;
}

async function renderProfil(){
  const root = document.getElementById('profilRoot'); if(!root) return;
  if(!currentUser){ root.innerHTML = '<p class="hint">Connectez-vous pour voir votre profil.</p>'; return; }
  root.innerHTML = '<p class="hint">Chargement…</p>';
  const [{ data: p }, info] = await Promise.all([
    sb.from('profiles').select('role,nom,prenom,uai').eq('id', currentUser.id).maybeSingle(),
    profilAppel({ action: 'lire' }).catch(e => ({ erreur: e.message })),
  ]);
  let etab = null;
  if(p && p.uai){ const { data: e } = await sb.from('etablissements').select('nom,ville').eq('uai', p.uai).maybeSingle(); etab = e; }
  profilEtat = { p: p || {}, info, etab };
  const role = (p && p.role) || currentUserRole, eleve = role === 'eleve';
  const ROLES = { prof: 'Professeur', admin: 'Administrateur', eleve: 'Élève', parent: 'Parent' };
  const identifiant = currentUser.email && PROFIL_FICTIF.test(currentUser.email) ? currentUser.email.replace(PROFIL_FICTIF, '') : null;
  const champ = (id, label, val, attrs) => `<label class="profil-label" for="${id}">${label}</label><input class="profil-input" id="${id}" value="${escapeHtml(val || '').replace(/"/g, '&quot;')}" ${attrs || ''}>`;

  // Identité
  let h = `<div class="profil-carte"><h3><span class="gicon">badge</span> Identité</h3>
    <div class="profil-grille">
      <div>${champ('profilPrenom', 'Prénom', p && p.prenom, eleve ? 'disabled' : 'autocomplete="given-name" maxlength="60"')}</div>
      <div>${champ('profilNom', 'Nom', p && p.nom, eleve ? 'disabled' : 'autocomplete="family-name" maxlength="60"')}</div>
    </div>
    ${eleve ? '<p class="hint">Ton nom et ton prénom sont gérés par ton professeur.</p>'
      : '<div class="profil-actions"><button class="btn" id="profilBtnIdentite" onclick="profilEnregistrerIdentite()"><span class="gicon">save</span> Enregistrer</button><span class="hint" id="profilStatutIdentite"></span></div>'}
    <p class="profil-ligne"><span>Rôle</span><b>${escapeHtml(ROLES[role] || role || '')}</b></p>
    ${etab || (p && p.uai) ? `<p class="profil-ligne"><span>Établissement</span><b>${escapeHtml(etab && etab.nom || '')}${etab && etab.ville ? ' (' + escapeHtml(etab.ville) + ')' : ''} · UAI ${escapeHtml(p.uai)}</b></p>` : ''}
  </div>`;

  // Connexion
  h += `<div class="profil-carte"><h3><span class="gicon">login</span> Connexion</h3>
    <p class="profil-ligne"><span>${identifiant ? 'Identifiant' : 'Adresse de connexion'}</span><b>${escapeHtml(identifiant || currentUser.email || '')}</b></p>
    <div class="profil-actions"><button class="btn secondary" onclick="openChangePasswordModal(false)"><span class="gicon">key</span> Changer mon mot de passe</button></div>
  </div>`;

  // Adresse de récupération
  if(eleve){
    h += `<div class="profil-carte"><h3><span class="gicon">lock_reset</span> Mot de passe oublié ?</h3>
      <p>Demande un nouveau mot de passe à ton professeur (ou à tes parents si tu as un compte Famille).</p></div>`;
  } else if(info && info.erreur){
    h += `<div class="profil-carte"><h3><span class="gicon">mail</span> Adresse e-mail de récupération</h3><p class="hint">Impossible de lire cette partie pour le moment : ${escapeHtml(info.erreur)}</p></div>`;
  } else {
    const rec = info.email_recuperation, att = info.email_attente;
    const etat = rec ? `<span class="profil-etat ok"><span class="gicon">verified</span> Confirmée</span>`
      : att ? `<span class="profil-etat attente"><span class="gicon">schedule</span> En attente de confirmation</span>`
      : `<span class="profil-etat vide"><span class="gicon">error</span> Aucune adresse</span>`;
    h += `<div class="profil-carte"><h3><span class="gicon">mail</span> Adresse e-mail de récupération ${etat}</h3>
      <p>Elle sert uniquement à vous envoyer un lien si vous oubliez votre mot de passe. ${info.email_connexion
        ? `Votre adresse de connexion (<b>${escapeHtml(info.email_connexion)}</b>) le reçoit déjà ; vous pouvez en indiquer une autre ici.`
        : rec ? '' : `Sans elle, personne ne peut vous envoyer de lien : renseignez de préférence votre adresse académique.`}</p>
      ${rec ? `<p class="profil-ligne"><span>Adresse confirmée</span><b>${escapeHtml(rec)}</b></p>` : ''}
      ${att ? `<p class="profil-ligne"><span>En attente</span><b>${escapeHtml(att)}</b></p><p class="hint">Un e-mail a été envoyé à cette adresse : cliquez sur le lien qu'il contient pour la confirmer (pensez à regarder dans les indésirables).</p>` : ''}
      ${champ('profilEmail', rec || att ? 'Nouvelle adresse' : 'Adresse e-mail', '', 'type="email" autocomplete="email" placeholder="prenom.nom@ac-academie.fr" maxlength="254"')}
      <div class="profil-actions">
        <button class="btn" id="profilBtnEmail" onclick="profilEnregistrerEmail()"><span class="gicon">send</span> ${att && !rec ? 'Renvoyer le lien' : 'Enregistrer et recevoir le lien de confirmation'}</button>
        ${rec || att ? `<button class="btn secondary" onclick="profilRetirerEmail()"><span class="gicon">delete</span> Retirer</button>` : ''}
        <span class="hint" id="profilStatutEmail"></span>
      </div>
    </div>`;
  }
  root.innerHTML = h;
  if(!eleve && info && !info.erreur && info.email_attente && !info.email_recuperation){ const f = document.getElementById('profilEmail'); if(f) f.value = info.email_attente; }
}

async function profilEnregistrerIdentite(){
  const st = document.getElementById('profilStatutIdentite'), btn = document.getElementById('profilBtnIdentite');
  const prenom = document.getElementById('profilPrenom').value.trim(), nom = document.getElementById('profilNom').value.trim();
  if(!prenom || !nom){ st.textContent = 'Le prénom et le nom sont obligatoires.'; return; }
  btn.disabled = true; st.textContent = 'Enregistrement…';
  const { error } = await sb.from('profiles').update({ prenom, nom }).eq('id', currentUser.id);
  btn.disabled = false;
  st.textContent = error ? 'Erreur : ' + error.message : 'Enregistré.';
  if(!error && typeof refreshAuthUI === 'function') refreshAuthUI();
}

async function profilEnregistrerEmail(){
  const st = document.getElementById('profilStatutEmail'), btn = document.getElementById('profilBtnEmail');
  const email = (document.getElementById('profilEmail').value || '').trim();
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ st.textContent = 'Adresse e-mail invalide.'; return; }
  if(PROFIL_FICTIF.test(email)){ st.textContent = 'Indiquez une vraie adresse e-mail.'; return; }
  btn.disabled = true; st.textContent = 'Envoi du lien de confirmation…';
  try{ await profilAppel({ action: 'email', email }); await renderProfil();
    const s2 = document.getElementById('profilStatutEmail'); if(s2) s2.textContent = 'Lien envoyé à ' + email + ' : cliquez dessus pour confirmer l\'adresse.';
  }catch(e){ btn.disabled = false; st.textContent = e.message; }
}

async function profilRetirerEmail(){
  if(!confirm('Retirer votre adresse e-mail de récupération ? Vous ne pourrez plus recevoir de lien en cas de mot de passe oublié.')) return;
  try{ await profilAppel({ action: 'email', email: '' }); await renderProfil(); }
  catch(e){ const st = document.getElementById('profilStatutEmail'); if(st) st.textContent = e.message; }
}

// Retour du lien de confirmation reçu par e-mail (?confirmer-email=…), connecté ou non.
async function profilConfirmerDepuisLien(){
  const m = location.search.match(/[?&]confirmer-email=([^&#]+)/); if(!m) return;
  history.replaceState(null, '', location.pathname + (location.hash || '#/'));
  try{
    const r = await profilAppel({ action: 'confirmer', jeton: decodeURIComponent(m[1]) });
    alert('Merci ! L\'adresse ' + r.email + ' est confirmée : elle recevra le lien si vous oubliez votre mot de passe.');
    if(currentUser && document.getElementById('view-profil')?.classList.contains('active')) renderProfil();
  }catch(e){ alert(e.message); }
}

// Rappel discret dans le menu du compte : adulte connecté par identifiant, sans adresse de récupération.
async function profilRappelMenu(){
  const el = document.getElementById('profilRappel'); if(!el) return;
  el.style.display = 'none';
  if(!currentUser || currentUserRole === 'eleve' || !PROFIL_FICTIF.test(currentUser.email || '')) return;
  const { data } = await sb.from('profil_contact').select('email_recuperation').eq('user_id', currentUser.id).maybeSingle();
  if(!data || !data.email_recuperation) el.style.display = '';
}

document.addEventListener('DOMContentLoaded', () => { setTimeout(profilConfirmerDepuisLien, 600); });

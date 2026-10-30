/* ============================================================
   rdv.js -- page « Prendre rendez-vous » : l'outil de réservation du site (fonction serveur rdv, tables rdv_reglages et
   rdv_reservations). Demandé le 30/10/2026 : « j'aimerais que les professeurs puissent prendre rendez-vous aussi sans
   quitter le site », « Je ne veux pas que mon nom apparaisse », puis « Est-il possible de créer son propre outil de
   réservation ? » (Cal.com envoyait ses propres e-mails, sans le logo ni la charte du site).
   Ouverte depuis le menu du compte (visiteurs et adultes connectés), le pied de page, la page /professeurs/ et la page
   /tarifs/ (#/rendez-vous) -- « Cette fonctionnalité ne devrait pas être réservée qu'aux professeurs » ; jamais
   proposée aux élèves. Le lien « Modifier ou annuler » des e-mails ouvre /?rdv=<jeton>#/rendez-vous.
   Administration : onglet « Rendez-vous » (plages horaires, durée, pause, préavis, périodes bloquées, liste).
   ============================================================ */

const RDV_OBJETS = ['Présentation du site', 'Question sur mon compte', 'Projet pour mon établissement', 'Autre'];
const RDV_JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const RDV_MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
let rdvEtat = { mois: null, creneaux: {}, jour: null, choix: null, etape: 'choix', jeton: null, rdv: null, fait: null, charge: false };

const rdvEsc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rdvIso = (y, m, d) => new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10);
function rdvJourLong(jour){ const [y, m, d] = jour.split('-').map(Number); const w = (new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7; return `${RDV_JOURS[w]} ${d === 1 ? '1er' : d} ${RDV_MOIS[m - 1]}`; }
// « 8 h », « 18 h 40 »
const rdvHeure = hhmm => { const [h, m] = hhmm.split(':').map(Number); return h + ' h' + (m ? ' ' + String(m).padStart(2, '0') : ''); };
const rdvParisJour = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', weekday: 'long', day: 'numeric', month: 'long' });
const rdvParisHeure = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const rdvQuand = iso => rdvParisJour.format(new Date(iso)) + ' à ' + rdvHeure(rdvParisHeure.format(new Date(iso)));
const rdvMaj = s => s.charAt(0).toUpperCase() + s.slice(1);

async function rdvAppel(corps){
  const { data, error } = await sb.functions.invoke('rdv', { body: corps });
  if(error){
    let msg = error.message, info = {};
    try{ info = await error.context.json(); if(info && info.error) msg = info.error; }catch(e){}
    const err = new Error(msg); err.indisponible = !!(info && info.indisponible); throw err;
  }
  if(data && data.error) throw new Error(data.error);
  return data;
}

function rdvOuvrir(){
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  showView('view-rdv'); setActiveTopnav(null);
  if(rdvEtat.jeton) return rdvGestion();
  if(rdvEtat.fait){ rdvEtat.fait = null; rdvEtat.etape = 'choix'; }
  if(!rdvEtat.charge) rdvChargerMois(null);
  else rdvRendre();
}

/* ---------- Réservation ---------- */
async function rdvChargerMois(decalage){
  const auj = new Date();
  if(!rdvEtat.mois) rdvEtat.mois = { y: auj.getFullYear(), m: auj.getMonth() };
  if(decalage){ const t = new Date(rdvEtat.mois.y, rdvEtat.mois.m + decalage, 1); rdvEtat.mois = { y: t.getFullYear(), m: t.getMonth() }; }
  const { y, m } = rdvEtat.mois;
  const de = rdvIso(y, m, 1) < rdvIso(auj.getFullYear(), auj.getMonth(), auj.getDate()) ? rdvIso(auj.getFullYear(), auj.getMonth(), auj.getDate()) : rdvIso(y, m, 1);
  const a = rdvIso(y, m + 1, 0);
  rdvEtat.charge = true; rdvEtat.chargement = true; rdvRendre();
  try{
    const d = de > a ? { creneaux: [] } : await rdvAppel({ action: 'creneaux', de, a });
    rdvEtat.creneaux = {}; rdvEtat.ferme = !!d.ferme; rdvEtat.duree = d.duree || rdvEtat.duree || 30;
    (d.creneaux || []).forEach(c => (rdvEtat.creneaux[c.jour] = rdvEtat.creneaux[c.jour] || []).push(c));
    rdvEtat.erreur = null;
    // Premier jour libre du mois choisi d'office ; mois sans créneau au premier affichage : on passe au suivant.
    const jours = Object.keys(rdvEtat.creneaux).sort();
    if(!jours.length && decalage === null && !rdvEtat.essai){ rdvEtat.essai = true; rdvEtat.chargement = false; return rdvChargerMois(1); }
    rdvEtat.jour = jours.includes(rdvEtat.jour) ? rdvEtat.jour : (jours[0] || null);
  }catch(e){ rdvEtat.erreur = e.message; }
  rdvEtat.chargement = false; rdvRendre();
}

function rdvRendre(){
  const box = document.getElementById('rdvAgenda'); if(!box) return;
  if(rdvEtat.fait) return rdvRendreFait(box);
  if(rdvEtat.erreur){ box.innerHTML = `<p class="rdv-erreur">${rdvEsc(rdvEtat.erreur)}</p>`; return; }
  if(rdvEtat.ferme){ box.innerHTML = `<p class="rdv-vide">La prise de rendez-vous est momentanément fermée. Écrivez-nous à contact@latelieraugmente.fr.</p>`; return; }
  box.innerHTML = `<div class="rdv-grille">${rdvCalendrierHtml()}<div class="rdv-droite" id="rdvDroite">${rdvEtat.etape === 'form' && rdvEtat.choix ? rdvFormHtml() : rdvHeuresHtml()}</div></div>`;
  if(rdvEtat.etape === 'form') rdvPreremplirForm();
}

function rdvCalendrierHtml(){
  const { y, m } = rdvEtat.mois, auj = new Date(), cle = rdvIso(auj.getFullYear(), auj.getMonth(), auj.getDate());
  const premier = (new Date(y, m, 1).getDay() + 6) % 7, nb = new Date(y, m + 1, 0).getDate();
  const avant = y < auj.getFullYear() || (y === auj.getFullYear() && m <= auj.getMonth());
  let cases = '';
  for(let i = 0; i < premier; i++) cases += '<span></span>';
  for(let d = 1; d <= nb; d++){
    const j = rdvIso(y, m, d), libre = !!rdvEtat.creneaux[j];
    cases += `<button type="button" class="rdv-j${libre ? ' libre' : ''}${j === rdvEtat.jour ? ' choisi' : ''}${j === cle ? ' auj' : ''}" ${libre ? `onclick="rdvChoisirJour('${j}')"` : 'disabled'}>${d}</button>`;
  }
  return `<div class="rdv-cal">
    <div class="rdv-cal-tete"><b>${RDV_MOIS[m]} ${y}</b><span>
      <button type="button" class="rdv-nav" onclick="rdvChargerMois(-1)" ${avant ? 'disabled' : ''} aria-label="Mois précédent"><span class="gicon">chevron_left</span></button>
      <button type="button" class="rdv-nav" onclick="rdvChargerMois(1)" aria-label="Mois suivant"><span class="gicon">chevron_right</span></button></span></div>
    <div class="rdv-sem">${['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(x => `<span>${x}</span>`).join('')}</div>
    <div class="rdv-jours${rdvEtat.chargement ? ' charge' : ''}">${cases}</div>
    <p class="rdv-info"><span class="gicon">schedule</span> ${rdvEtat.duree || 30} min · <span class="gicon">videocam</span> visio Google Meet · heure de Paris</p>
  </div>`;
}

function rdvHeuresHtml(){
  if(rdvEtat.chargement) return '<p class="rdv-vide">Recherche des créneaux libres…</p>';
  const j = rdvEtat.jour;
  if(!j) return `<p class="rdv-vide">Aucun créneau libre ce mois-ci : essayez le mois suivant avec la flèche.</p>`;
  return `<p class="rdv-titre-jour">${rdvMaj(rdvJourLong(j))}</p>
    <div class="rdv-heures">${(rdvEtat.creneaux[j] || []).map(c => `<button type="button" class="rdv-h" onclick="rdvChoisirHeure('${c.debut}')">${rdvHeure(c.heure)}</button>`).join('')}</div>`;
}

function rdvChoisirJour(j){ rdvEtat.jour = j; rdvEtat.etape = 'choix'; rdvRendre(); }
function rdvChoisirHeure(debut){
  const c = Object.values(rdvEtat.creneaux).flat().find(x => x.debut === debut); if(!c) return;
  rdvEtat.choix = c; rdvEtat.etape = 'form'; rdvRendre();
  const f = document.getElementById('rdvPrenom'); if(f && !f.value) f.focus();
}

function rdvFormHtml(){
  const c = rdvEtat.choix, v = rdvEtat.saisie || {};
  return `<div class="rdv-form">
    <button type="button" class="rdv-retour" onclick="rdvEtat.etape='choix';rdvRendre();"><span class="gicon">arrow_back</span> Changer d'horaire</button>
    <p class="rdv-recap"><span class="gicon">event_available</span> <b>${rdvMaj(rdvJourLong(c.jour))} à ${rdvHeure(c.heure)}</b></p>
    <div class="rdv-deux"><div><label for="rdvPrenom">Prénom</label><input id="rdvPrenom" maxlength="60" autocomplete="given-name" value="${rdvEsc(v.prenom)}"></div>
      <div><label for="rdvNom">Nom</label><input id="rdvNom" maxlength="80" autocomplete="family-name" value="${rdvEsc(v.nom)}"></div></div>
    <label for="rdvEmail">Adresse e-mail</label><input id="rdvEmail" type="email" maxlength="160" autocomplete="email" value="${rdvEsc(v.email)}">
    <label for="rdvEtab">Établissement <small>(facultatif)</small></label><input id="rdvEtab" maxlength="120" placeholder="Nom et ville de votre école ou collège" value="${rdvEsc(v.etablissement)}">
    <label for="rdvObjet">Objet du rendez-vous</label>
    <select id="rdvObjet"><option value="">Choisir…</option>${RDV_OBJETS.map(o => `<option${v.objet === o ? ' selected' : ''}>${o}</option>`).join('')}</select>
    <label for="rdvMessage">Un mot pour préparer l'échange <small>(facultatif)</small></label><textarea id="rdvMessage" rows="3" maxlength="1000">${rdvEsc(v.message)}</textarea>
    <input id="rdvSite" class="rdv-piege" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="button" class="btn rdv-ok" id="rdvOk" onclick="rdvReserver()"><span class="gicon">check</span> Confirmer le rendez-vous</button>
    <span class="hint" id="rdvMsg"></span>
    <p class="hint rdv-rgpd">Vos coordonnées servent uniquement à organiser ce rendez-vous (voir la <a href="#" onclick="location.hash='#/confidentialite';return false;">politique de confidentialité</a>).</p>
  </div>`;
}

// Adulte connecté : nom, adresse (de récupération, jamais l'adresse fictive de connexion) et établissement.
async function rdvPreremplirForm(){
  if(rdvEtat.prerempli || !currentUser || currentUserRole === 'eleve') return;
  rdvEtat.prerempli = true;
  try{
    const [{ data: p }, { data: c }] = await Promise.all([
      sb.from('profiles').select('prenom,nom,uai').eq('id', currentUser.id).maybeSingle(),
      sb.from('profil_contact').select('email_recuperation').eq('user_id', currentUser.id).maybeSingle(),
    ]);
    const s = rdvEtat.saisie = rdvEtat.saisie || {};
    s.prenom = s.prenom || (p && p.prenom) || '';
    s.nom = s.nom || (p && p.nom) || '';
    s.email = s.email || (c && c.email_recuperation) || (/@mathcollege\.local$/i.test(currentUser.email || '') ? '' : currentUser.email || '');
    if(!s.etablissement && p && p.uai){
      const { data: e } = await sb.from('etablissements').select('nom,ville').eq('uai', p.uai).maybeSingle();
      if(e && e.nom && !/^À vérifier/.test(e.nom)) s.etablissement = e.nom + (e.ville ? ', ' + e.ville : '');
    }
    [['rdvPrenom', s.prenom], ['rdvNom', s.nom], ['rdvEmail', s.email], ['rdvEtab', s.etablissement]].forEach(([id, val]) => { const f = document.getElementById(id); if(f && !f.value && val) f.value = val; });
  }catch(e){ /* sans pré-remplissage */ }
}

async function rdvReserver(){
  const v = id => (document.getElementById(id).value || '').trim();
  const s = rdvEtat.saisie = { prenom: v('rdvPrenom'), nom: v('rdvNom'), email: v('rdvEmail'), etablissement: v('rdvEtab'), objet: v('rdvObjet'), message: v('rdvMessage') };
  const msg = document.getElementById('rdvMsg'), btn = document.getElementById('rdvOk');
  if(!s.prenom) return (msg.textContent = 'Indiquez votre prénom.');
  if(s.nom.length < 2) return (msg.textContent = 'Indiquez votre nom.');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email)) return (msg.textContent = 'Indiquez une adresse e-mail valide.');
  if(!s.objet) return (msg.textContent = 'Choisissez l\'objet du rendez-vous.');
  btn.disabled = true; msg.textContent = 'Réservation…';
  try{
    const r = await rdvAppel({ action: 'reserver', debut: rdvEtat.choix.debut, ...s, site: v('rdvSite') });
    rdvEtat.fait = { debut: r.debut, email: s.email, visio: r.visio };
    rdvEtat.choix = null; rdvEtat.etape = 'choix'; rdvEtat.charge = false; rdvEtat.saisie = { prenom: s.prenom, nom: s.nom, email: s.email, etablissement: s.etablissement };
    rdvRendre(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }catch(e){
    btn.disabled = false; msg.textContent = e.message;
    if(e.indisponible){ rdvEtat.etape = 'choix'; setTimeout(() => rdvChargerMois(0), 1800); }
  }
}

function rdvRendreFait(box){
  const f = rdvEtat.fait;
  box.innerHTML = `<div class="rdv-fait"><span class="gicon">task_alt</span>
    <h2>Rendez-vous confirmé</h2>
    <p><b>${rdvEsc(rdvQuand(f.debut))}</b> (heure de Paris)</p>
    <p>Un e-mail de confirmation vient de partir vers <b>${rdvEsc(f.email)}</b>, avec ${f.visio ? 'le lien de la visio' : 'tous les détails'}, un fichier à ajouter à votre agenda et un lien pour modifier ou annuler. Pensez à regarder dans les indésirables.</p>
    <button type="button" class="btn secondary" onclick="rdvEtat.fait=null;rdvChargerMois(0);">Prendre un autre rendez-vous</button></div>`;
}

/* ---------- Modifier ou annuler (lien de l'e-mail) ---------- */
async function rdvGestion(){
  const box = document.getElementById('rdvAgenda'); if(!box) return;
  box.innerHTML = '<p class="rdv-vide">Chargement de votre rendez-vous…</p>';
  try{ rdvEtat.rdv = (await rdvAppel({ action: 'voir', jeton: rdvEtat.jeton })).rdv; }
  catch(e){ box.innerHTML = `<p class="rdv-erreur">${rdvEsc(e.message)}</p><p style="padding:0 24px 20px;"><button class="btn secondary" onclick="rdvQuitterGestion()">Prendre un rendez-vous</button></p>`; return; }
  const r = rdvEtat.rdv, actif = r.statut === 'confirme' && !r.passe;
  box.innerHTML = `<div class="rdv-gestion">
    <h2>Votre rendez-vous</h2>
    <p class="rdv-recap"><span class="gicon">${actif ? 'event_available' : 'event_busy'}</span> <b>${rdvEsc(rdvQuand(r.debut))}</b> · ${rdvEsc(r.objet)}</p>
    ${r.statut !== 'confirme' ? '<p class="rdv-etat annule">Ce rendez-vous est annulé.</p>' : r.passe ? '<p class="rdv-etat">Ce rendez-vous est passé.</p>' : ''}
    ${actif && r.visio ? `<p><button class="btn" onclick="window.open(${rdvEsc(JSON.stringify(r.visio))}, '_blank', 'noopener')"><span class="gicon">videocam</span> Rejoindre la visio</button></p>` : ''}
    ${actif ? `<div class="rdv-gestion-actions">
      <button class="btn secondary" onclick="rdvDeplacerChoisir()"><span class="gicon">edit_calendar</span> Changer d'horaire</button>
      <button class="btn secondary rdv-annuler" onclick="rdvAnnuler()"><span class="gicon">event_busy</span> Annuler le rendez-vous</button></div>` : ''}
    <span class="hint" id="rdvGestionMsg"></span>
    <div id="rdvDeplacer"></div>
    <p style="margin-top:18px;"><button class="btn secondary" onclick="rdvQuitterGestion()">Prendre un autre rendez-vous</button></p></div>`;
}
function rdvQuitterGestion(){ rdvEtat.jeton = null; rdvEtat.charge = false; rdvOuvrir(); }
async function rdvAnnuler(){
  if(!confirm('Annuler ce rendez-vous ?')) return;
  const msg = document.getElementById('rdvGestionMsg'); msg.textContent = 'Annulation…';
  try{ await rdvAppel({ action: 'annuler', jeton: rdvEtat.jeton }); await rdvGestion(); document.getElementById('rdvGestionMsg').textContent = 'Rendez-vous annulé : un e-mail de confirmation vient de partir.'; }
  catch(e){ msg.textContent = e.message; }
}
// Nouvel horaire : le même calendrier, sous le rendez-vous actuel.
async function rdvDeplacerChoisir(){
  rdvEtat.deplacement = true; rdvEtat.charge = false; rdvEtat.mois = null; rdvEtat.essai = false;
  const zone = document.getElementById('rdvDeplacer');
  zone.innerHTML = '<p class="rdv-titre-jour" style="margin-top:16px;">Choisissez le nouvel horaire</p><div id="rdvAgendaDeplacement"></div>';
  const vrai = document.getElementById('rdvAgenda'); vrai.id = 'rdvAgendaGestion';
  document.getElementById('rdvAgendaDeplacement').id = 'rdvAgenda';
  rdvChoisirHeure = async function(debut){
    const m = document.getElementById('rdvGestionMsg'); m.textContent = 'Déplacement…';
    try{
      await rdvAppel({ action: 'deplacer', jeton: rdvEtat.jeton, debut });
      location.replace(location.pathname + '?rdv=' + encodeURIComponent(rdvEtat.jeton) + '&deplace=1#/rendez-vous');
    }catch(e){ m.textContent = e.message; if(e.indisponible) rdvChargerMois(0); }
  };
  await rdvChargerMois(null);
}

// Lien de l'e-mail : /?rdv=<jeton>#/rendez-vous
(function(){
  const q = new URLSearchParams(location.search), j = q.get('rdv');
  if(!j) return;
  rdvEtat.jeton = j;
  if(q.get('deplace')) setTimeout(() => { const m = document.getElementById('rdvGestionMsg'); if(m) m.textContent = 'Nouvel horaire enregistré : un e-mail de confirmation vient de partir.'; }, 1500);
  history.replaceState(null, '', location.pathname + '#/rendez-vous');
})();

/* ---------- Administration : onglet « Rendez-vous » ---------- */
(function rdvAdminInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'rdv';
  btn.innerHTML = '<span class=gicon>event_available</span> Rendez-vous';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-rdv';
  panel.innerHTML = '<div id="rdvAdminRoot"><p class="hint">Chargement…</p></div>';
  view.appendChild(panel);
  btn.addEventListener('click', () => {
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    rdvAdminRefresh();
  });
  const origApply = window.adminApplyScopeUI;
  if(typeof origApply === 'function'){
    window.adminApplyScopeUI = function(){
      origApply.apply(this, arguments);
      btn.style.display = typeof adminScopeUai === 'function' && adminScopeUai() ? 'none' : '';
    };
  }
})();

let rdvAdminReglages = null;
async function rdvAdminRefresh(){
  const root = document.getElementById('rdvAdminRoot'); if(!root) return;
  const [{ data: r, error }, { data: liste }] = await Promise.all([
    sb.from('rdv_reglages').select('*').eq('id', 1).maybeSingle(),
    sb.from('rdv_reservations').select('*').gte('debut', new Date(Date.now() - 30 * 86400000).toISOString()).order('debut'),
  ]);
  if(error || !r){ root.innerHTML = `<p class="hint">Réglages illisibles : ${rdvEsc(error ? error.message : 'aucune ligne')}</p>`; return; }
  rdvAdminReglages = JSON.parse(JSON.stringify(r));
  const maintenant = Date.now();
  const avenir = (liste || []).filter(x => x.statut === 'confirme' && Date.parse(x.fin) >= maintenant);
  const autres = (liste || []).filter(x => !avenir.includes(x)).reverse();
  const ligne = x => `<tr class="${x.statut === 'annule' ? 'rdv-annule' : ''}"><td><b>${rdvEsc(rdvQuand(x.debut))}</b>${x.statut === 'annule' ? ` <span class="hint">annulé${x.annule_par === 'admin' ? ' par vous' : ''}</span>` : ''}</td>
    <td>${rdvEsc([x.prenom, x.nom].filter(Boolean).join(' '))}<br><small class="hint">${rdvEsc(x.email)}</small></td><td>${rdvEsc(x.etablissement || '–')}</td>
    <td>${rdvEsc(x.objet)}${x.message ? `<br><small class="hint">« ${rdvEsc(x.message)} »</small>` : ''}</td>
    <td style="white-space:nowrap;">${x.meet_url ? `<a href="${rdvEsc(x.meet_url)}" target="_blank" rel="noopener" class="btn qz-mini">Visio</a> ` : ''}${x.statut === 'confirme' && Date.parse(x.debut) > maintenant ? `<button class="btn secondary qz-mini" onclick="rdvAdminAnnuler('${x.id}')">Annuler</button>` : ''}</td></tr>`;
  const tete = '<thead><tr><th>Quand</th><th>Qui</th><th>Établissement</th><th>Objet</th><th></th></tr></thead>';
  root.innerHTML = `
    <div class="tool-shell"><strong class="op-h"><span class="gicon">event_available</span> Rendez-vous à venir (${avenir.length})</strong>
      ${avenir.length ? `<div style="overflow-x:auto;"><table class="op-tab rdv-tab">${tete}<tbody>${avenir.map(ligne).join('')}</tbody></table></div>` : '<p class="hint">Aucun rendez-vous à venir.</p>'}
      ${autres.length ? `<details style="margin-top:10px;"><summary class="hint">Passés et annulés (30 derniers jours) : ${autres.length}</summary><div style="overflow-x:auto;"><table class="op-tab rdv-tab">${tete}<tbody>${autres.map(ligne).join('')}</tbody></table></div></details>` : ''}
    </div>
    <div class="tool-shell"><strong class="op-h"><span class="gicon">tune</span> Réglages</strong>
      <label class="rdv-adm-ligne"><input type="checkbox" id="rdvAdmActif" ${r.actif ? 'checked' : ''}> Prise de rendez-vous ouverte</label>
      <p class="op-lab">Plages horaires (heure de Paris)</p>
      <div id="rdvAdmPlages"></div>
      <div class="rdv-adm-grille">
        <label>Durée d'un rendez-vous <input type="number" id="rdvAdmDuree" min="10" max="180" step="5" value="${r.duree_min}"> min</label>
        <label>Pause entre deux <input type="number" id="rdvAdmPause" min="0" max="120" step="5" value="${r.pause_min}"> min</label>
        <label>Préavis minimum <input type="number" id="rdvAdmPreavis" min="0" max="336" value="${r.preavis_h}"> h</label>
        <label>Réservable jusqu'à <input type="number" id="rdvAdmHorizon" min="1" max="365" value="${r.horizon_j}"> jours</label>
      </div>
      <label class="rdv-adm-ligne"><input type="checkbox" id="rdvAdmRappel" ${r.rappel_veille ? 'checked' : ''}> E-mail de rappel la veille</label>
      <p class="op-lab">Agendas pris en compte</p>
      <p class="hint" style="margin:0 0 6px;">Les moments occupés des agendas cochés bloquent les créneaux. Emploi du temps de l'ENT, agenda Outlook… : abonnez-vous à son adresse iCal dans Google Agenda (« Autres agendas » → + → « À partir de l'URL »), puis cochez-le ici.</p>
      <div id="rdvAdmAgendas"><p class="hint">Lecture des agendas Google…</p></div>
      <p class="op-lab">Périodes sans rendez-vous</p>
      <div id="rdvAdmBloques"></div>
      <p class="op-lab">Lien de visio de secours</p>
      <input type="url" id="rdvAdmVisio" class="rdv-adm-visio" placeholder="https://meet.google.com/…" value="${rdvEsc(r.lien_visio)}">
      <p class="hint" style="margin:4px 0 0;">Utilisé tant que l'agenda Google n'est pas relié au site (sinon, chaque rendez-vous a son propre lien Meet).</p>
      <p style="margin-top:14px;"><button class="btn" onclick="rdvAdminEnregistrer()"><span class="gicon">save</span> Enregistrer les réglages</button> <span class="hint" id="rdvAdmMsg"></span></p>
    </div>`;
  rdvAdminPlagesRendre(); rdvAdminBloquesRendre(); rdvAdminAgendasCharger();
}

// Agendas Google visibles par le compte relié ; coche = pris en compte (rdv_reglages.agendas).
let rdvAdminAgendasListe = null;
async function rdvAdminAgendasCharger(){
  const box = document.getElementById('rdvAdmAgendas'); if(!box) return;
  rdvAdminAgendasListe = null;
  try{
    const d = await rdvAppel({ action: 'admin-agendas' });
    if(!d.relie){ box.innerHTML = '<p class="hint">L\'agenda Google n\'est pas relié au site : seuls vos plages, vos rendez-vous et vos périodes bloquées comptent.</p>'; return; }
    const coches = new Set(rdvAdminReglages.agendas || ['primary']);
    rdvAdminAgendasListe = d.agendas;
    // Agenda coché mais plus visible (supprimé, partage retiré) : gardé dans la liste pour pouvoir le décocher.
    coches.forEach(id => { if(!d.agendas.some(a => a.id === id)) d.agendas.push({ id, nom: id + ' (introuvable)', principal: false, couleur: '' }); });
    box.innerHTML = d.agendas.map(a => `<label class="rdv-adm-ligne"><input type="checkbox" class="rdvAdmAgenda" value="${rdvEsc(a.id)}" ${coches.has(a.id) ? 'checked' : ''}>
      <span class="rdv-adm-pastille" style="background:${rdvEsc(a.couleur || '#B6BDC6')};"></span> ${rdvEsc(a.nom)}${a.principal ? ' <span class="hint">(agenda principal)</span>' : ''}</label>`).join('');
  }catch(e){ box.innerHTML = `<p class="hint">Agendas illisibles : ${rdvEsc(e.message)}</p>`; }
}

function rdvAdminPlagesRendre(){
  const p = rdvAdminReglages.plages || {};
  document.getElementById('rdvAdmPlages').innerHTML = RDV_JOURS.map((nom, i) => {
    const k = String(i + 1), plages = p[k] || [];
    return `<div class="rdv-adm-jour"><b>${nom}</b><span>${plages.length ? plages.map((pl, n) => `<span class="rdv-adm-plage">
        <input type="time" value="${pl[0]}" onchange="rdvAdminReglages.plages['${k}'][${n}][0]=this.value"> → <input type="time" value="${pl[1]}" onchange="rdvAdminReglages.plages['${k}'][${n}][1]=this.value">
        <button type="button" class="rdv-adm-x" title="Retirer" onclick="rdvAdminReglages.plages['${k}'].splice(${n},1);rdvAdminPlagesRendre();">×</button></span>`).join('') : '<span class="hint">fermé</span>'}
      <button type="button" class="btn secondary qz-mini" onclick="(rdvAdminReglages.plages['${k}']=rdvAdminReglages.plages['${k}']||[]).push(['09:00','12:00']);rdvAdminPlagesRendre();">+ plage</button></span></div>`;
  }).join('');
}
function rdvAdminBloquesRendre(){
  const b = rdvAdminReglages.bloques = rdvAdminReglages.bloques || [];
  document.getElementById('rdvAdmBloques').innerHTML = b.map((x, n) => `<div class="rdv-adm-plage">du <input type="date" value="${x.du || ''}" onchange="rdvAdminReglages.bloques[${n}].du=this.value">
      au <input type="date" value="${x.au || ''}" onchange="rdvAdminReglages.bloques[${n}].au=this.value">
      <input type="text" placeholder="motif (facultatif)" value="${rdvEsc(x.motif || '')}" onchange="rdvAdminReglages.bloques[${n}].motif=this.value">
      <button type="button" class="rdv-adm-x" title="Retirer" onclick="rdvAdminReglages.bloques.splice(${n},1);rdvAdminBloquesRendre();">×</button></div>`).join('')
    + `<button type="button" class="btn secondary qz-mini" onclick="rdvAdminReglages.bloques.push({du:'',au:'',motif:''});rdvAdminBloquesRendre();">+ période</button>`;
}

async function rdvAdminEnregistrer(){
  const msg = document.getElementById('rdvAdmMsg'), n = id => parseInt(document.getElementById(id).value, 10);
  const plages = {};
  for(const [k, l] of Object.entries(rdvAdminReglages.plages || {})){
    const ok = (l || []).filter(p => p[0] && p[1]);
    if(ok.some(p => p[0] >= p[1])) return (msg.textContent = `Le ${RDV_JOURS[+k - 1]} : l'heure de fin doit suivre l'heure de début.`);
    if(ok.length) plages[k] = ok.sort((a, b) => a[0] < b[0] ? -1 : 1);
  }
  const bloques = (rdvAdminReglages.bloques || []).filter(b => b.du).map(b => ({ du: b.du, au: b.au && b.au >= b.du ? b.au : b.du, motif: (b.motif || '').trim() }));
  const maj = { actif: document.getElementById('rdvAdmActif').checked, plages, duree_min: n('rdvAdmDuree'), pause_min: n('rdvAdmPause'), preavis_h: n('rdvAdmPreavis'),
    horizon_j: n('rdvAdmHorizon'), rappel_veille: document.getElementById('rdvAdmRappel').checked, bloques,
    lien_visio: (document.getElementById('rdvAdmVisio').value || '').trim(), updated_at: new Date().toISOString() };
  if(rdvAdminAgendasListe) maj.agendas = [...document.querySelectorAll('.rdvAdmAgenda:checked')].map(c => c.value);
  if(maj.lien_visio && !/^https:\/\//.test(maj.lien_visio)) return (msg.textContent = 'Le lien de visio doit commencer par https://');
  msg.textContent = 'Enregistrement…';
  const { error } = await sb.from('rdv_reglages').update(maj).eq('id', 1);
  msg.textContent = error ? 'Erreur : ' + error.message : 'Réglages enregistrés.';
  if(!error){ rdvEtat.charge = false; rdvAdminReglages = Object.assign(rdvAdminReglages, maj); }
}

async function rdvAdminAnnuler(id){
  if(!confirm('Annuler ce rendez-vous ? La personne reçoit un e-mail d\'excuse avec un lien pour en reprendre un.')) return;
  try{ await rdvAppel({ action: 'admin-annuler', id }); rdvAdminRefresh(); }
  catch(e){ alert(e.message); }
}

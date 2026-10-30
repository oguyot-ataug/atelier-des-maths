/* ============================================================
   rdv.js -- page « Prendre rendez-vous » : l'agenda de prise de rendez-vous (Cal.com), intégré au site.
   Demandé le 30/10/2026 : « j'aimerais que les professeurs puissent prendre rendez-vous aussi sans quitter le site »,
   puis « Je ne veux pas que mon nom apparaisse » : l'agenda Google affichait le nom du compte ; Cal.com affiche
   « L'Atelier des Maths » (page cal.com/latelierdesmaths/rendez-vous, reliée à l'agenda Google et à Google Meet).
   Ouverte depuis le menu du compte (visiteurs et adultes connectés), le pied de page, la page /professeurs/ et la page
   /tarifs/ (#/rendez-vous) -- demandé : « Cette fonctionnalité ne devrait pas être réservée qu'aux professeurs » ; jamais
   proposée aux élèves. L'agenda n'est chargé qu'à l'ouverture de la page ; pour un adulte connecté, le nom, l'adresse
   (de récupération, jamais l'adresse fictive de connexion) et l'établissement sont pré-remplis.
   ============================================================ */

const RDV_CAL = 'latelierdesmaths/rendez-vous';
let rdvCharge = false;

async function rdvOuvrir(){
  const d = document.getElementById('accountDropdown'); if(d) d.style.display = 'none';
  showView('view-rdv'); setActiveTopnav(null);
  if(rdvCharge) return;
  rdvCharge = true;
  const config = { layout: 'month_view', theme: 'light' }; // vue mois (vues semaine et colonnes essayées puis écartées le 30/10/2026)
  try{ Object.assign(config, await rdvPreremplir()); }catch(e){ /* sans pré-remplissage */ }
  const box = document.getElementById('rdvAgenda'); if(box) box.innerHTML = '';
  // Code d'intégration officiel de Cal.com (charge app.cal.com/embed/embed.js).
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === "string") { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal('init', 'rdv', { origin: 'https://cal.com' });
  Cal.ns.rdv('inline', { elementOrSelector: '#rdvAgenda', config, calLink: RDV_CAL });
  Cal.ns.rdv('ui', { hideEventTypeDetails: false, layout: 'month_view', cssVarsPerTheme: { light: { 'cal-brand': '#0C5BA0' } } });
}

// Nom, adresse e-mail et établissement d'un adulte connecté (questions du formulaire Cal.com : name, email, Etablissement).
async function rdvPreremplir(){
  if(!currentUser || currentUserRole === 'eleve') return {};
  const [{ data: p }, { data: c }] = await Promise.all([
    sb.from('profiles').select('prenom,nom,uai').eq('id', currentUser.id).maybeSingle(),
    sb.from('profil_contact').select('email_recuperation').eq('user_id', currentUser.id).maybeSingle(),
  ]);
  const out = {};
  const nom = [p && p.prenom, p && p.nom].filter(Boolean).join(' ');
  if(nom) out.name = nom;
  const email = (c && c.email_recuperation) || (/@mathcollege\.local$/i.test(currentUser.email || '') ? '' : currentUser.email);
  if(email) out.email = email;
  if(p && p.uai){
    const { data: e } = await sb.from('etablissements').select('nom,ville').eq('uai', p.uai).maybeSingle();
    if(e && e.nom && !/^À vérifier/.test(e.nom)) out.Etablissement = e.nom + (e.ville ? ', ' + e.ville : '');
  }
  return out;
}

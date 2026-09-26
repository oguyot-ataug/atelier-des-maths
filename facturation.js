/* =====================================================================
   FACTURATION.JS -- Devis et factures des licences établissement
   (Administration > Facturation, administrateur général uniquement).
   Demandé : "Devis et factures depuis l'Administration", en distinguant les établissements
   publics (bon de commande, facture déposée sur Chorus Pro, mandat administratif) et privés
   (facture PDF à l'organisme de gestion, virement).

   Base : facturation_emetteur (vos coordonnées, tarifs), facturation_clients (fiches
   établissements), facturation_documents (devis D-2026-001, factures F-2026-001, avoirs
   A-2026-001). Les numéros sont attribués par le serveur (facturation_emettre), sans trou ;
   un document émis ne se modifie plus (seuls statut, commande, paiement et notes évoluent) --
   une facture erronée s'annule par un avoir.
   Le PDF s'obtient par la fenêtre d'impression du navigateur (« Enregistrer au format PDF »),
   comme pour les évaluations et le cahier.
   ===================================================================== */

const FAC_NIVEAUX = ['6e','5e','4e','3e'];
const FAC_STATUTS = {
  emis:    { label:'Émis',             color:'#0C5BA0' },
  accepte: { label:'Commande reçue',   color:'#1F7A4D' },
  refuse:  { label:'Refusé',           color:'#a83c1f' },
  annule:  { label:'Annulé',           color:'#8A8F98' },
  payee:   { label:'Payée',            color:'#1F7A4D' },
};
let facState = { emetteur:null, clients:[], docs:[], etabs:[], extra:[] };

function facEsc(s){ return escapeHtml(s==null ? '' : String(s)); }
function facMoney(n){
  return (Number(n)||0).toLocaleString('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2}).replace(/ /g,' ') + ' €';
}
function facDate(d){ return d ? new Date(d+'T00:00:00').toLocaleDateString('fr-FR') : ''; }
function facISO(d){ const z = new Date(d.getTime() - d.getTimezoneOffset()*60000); return z.toISOString().slice(0,10); }
function facAddDays(n){ const d = new Date(); d.setDate(d.getDate()+n); return facISO(d); }
/* Années scolaires proposées : l'année en cours (septembre à mai) et la suivante (dès juin). */
function facAnneesScolaires(){
  const d = new Date(), y = d.getFullYear(), m = d.getMonth()+1;
  const first = m >= 6 ? y : y-1;
  return [first, first+1].map(a=>({ label:`${a}-${a+1}`, debut:`${a}-09-01`, fin:`${a+1}-08-31` }));
}
function facPrix(nbNiveaux){
  const p = (facState.emetteur && facState.emetteur.prix) || {1:4, 2:3.5, 3:3.5, 4:3};
  return Number(p[String(Math.min(4, Math.max(1, nbNiveaux)))]) || 0;
}

/* ---------- Panneau ---------- */
function facPanelHtml(){
  const annees = facAnneesScolaires();
  return `
  <div class="tool-shell" style="margin-bottom:16px;">
    <div class="nb-accordion-section">
      <button type="button" class="nb-accordion-header" style="--acc-color:#5B6472;--acc-bg:rgba(91,100,114,.05);" onclick="toggleNbAccordion('facAccEmetteur')">
        <span class="gicon nb-accordion-chevron">expand_more</span><span class="gicon">badge</span><span>Mes informations (en-tête des devis et factures)</span>
        <span id="facEmetteurWarn" style="margin-left:auto;font-size:.8rem;color:#a83c1f;"></span>
      </button>
      <div class="nb-accordion-body" id="facAccEmetteur">
        <div class="fac-grid">
          <label>Nom de l'entreprise individuelle<input type="text" id="facEmNom" placeholder="Prénom Nom EI"><small>La mention « EI » (entrepreneur individuel) est obligatoire.</small></label>
          <label>Nom commercial<input type="text" id="facEmEnseigne"></label>
          <label>SIRET<input type="text" id="facEmSiret" placeholder="14 chiffres"></label>
          <label>E-mail<input type="email" id="facEmEmail"></label>
          <label>Téléphone<input type="text" id="facEmTel"></label>
          <label class="wide">Adresse<textarea id="facEmAdresse" rows="2"></textarea></label>
          <label>IBAN<input type="text" id="facEmIban"></label>
          <label>BIC<input type="text" id="facEmBic"></label>
          <label class="wide">Mention TVA<input type="text" id="facEmTva"><small>En franchise : « TVA non applicable, art. 293 B du CGI ».</small></label>
          <label>Prix par élève : 1 niveau<input type="number" step="0.05" min="0" id="facEmP1"></label>
          <label>2 niveaux<input type="number" step="0.05" min="0" id="facEmP2"></label>
          <label>3 niveaux<input type="number" step="0.05" min="0" id="facEmP3"></label>
          <label>4 niveaux (collège complet)<input type="number" step="0.05" min="0" id="facEmP4"></label>
          <label>Validité des devis (jours)<input type="number" min="1" id="facEmValid"></label>
          <label>Délai de paiement (jours)<input type="number" min="0" id="facEmDelai"></label>
        </div>
        <button class="btn" onclick="facSaveEmetteur()">Enregistrer mes informations</button> <span class="hint" id="facEmMsg" style="margin:0;"></span>
      </div>
    </div>

    <div class="nb-accordion-section">
      <button type="button" class="nb-accordion-header" style="--acc-color:#0C5BA0;--acc-bg:rgba(12,91,160,.05);" onclick="toggleNbAccordion('facAccDevis')">
        <span class="gicon nb-accordion-chevron open">expand_more</span><span class="gicon">request_quote</span><span>Nouveau devis</span>
      </button>
      <div class="nb-accordion-body open" id="facAccDevis">
        <p class="fac-step">1. Établissement</p>
        <div class="tool-row" style="margin-bottom:8px;">
          <select id="facClientSel" onchange="facSelectClient()" style="min-width:280px;"></select>
        </div>
        <div class="fac-grid" id="facClientForm">
          <label>UAI<input type="text" id="facClUai" placeholder="0751234A" oninput="facUaiLookup()"></label>
          <label>Nom de l'établissement<input type="text" id="facClNom"></label>
          <label>Statut<select id="facClStatut" onchange="facClientStatutUI()"><option value="public">Public (EPLE)</option><option value="prive">Privé (sous contrat ou hors contrat)</option></select></label>
          <label id="facClOrgWrap">Organisme de gestion (OGEC…)<input type="text" id="facClOrganisme" placeholder="OGEC Collège Saint-…"><small>Destinataire de la facture.</small></label>
          <label>SIRET<input type="text" id="facClSiret"><small id="facClSiretHint">Obligatoire pour Chorus Pro.</small></label>
          <label id="facClServiceWrap">Code service Chorus Pro<input type="text" id="facClService" placeholder="facultatif"></label>
          <label>E-mail de facturation<input type="email" id="facClEmail"></label>
          <label class="wide">Adresse<textarea id="facClAdresse" rows="2"></textarea></label>
        </div>
        <button class="btn secondary" onclick="facSaveClient()"><span class="gicon">save</span> Enregistrer la fiche</button> <span class="hint" id="facClMsg" style="margin:0;"></span>

        <p class="fac-step">2. Licence</p>
        <div class="tool-row">
          <label class="hint" style="margin:0;">Année scolaire <select id="facAnnee" onchange="facRenderTotal()">${annees.map((a,i)=>`<option value="${i}">${a.label}</option>`).join('')}</select></label>
        </div>
        <div class="fac-levels">
          ${FAC_NIVEAUX.map(n=>`<label class="fac-level"><span><input type="checkbox" id="facLv_${n}" onchange="facRenderTotal()"> ${n}</span><input type="number" min="0" step="1" id="facEff_${n}" placeholder="élèves" oninput="facRenderTotal()"></label>`).join('')}
        </div>

        <p class="fac-step">3. Autres lignes <span class="hint" style="font-weight:400;">(formation, remise « établissement pilote » en prix négatif…)</span></p>
        <div id="facExtraLines"></div>
        <button class="btn secondary" style="font-size:.82rem;padding:5px 12px;" onclick="facAddExtra()">+ Ajouter une ligne</button>

        <p class="fac-step">4. Récapitulatif</p>
        <div id="facRecap"></div>
        <label class="hint" style="display:block;margin:8px 0;">Note sur le devis (facultatif)<textarea id="facNotes" rows="2" style="width:100%;"></textarea></label>
        <button class="btn" onclick="facEmettreDevis()"><span class="gicon">description</span> Émettre le devis</button> <span class="hint" id="facDevisMsg" style="margin:0;"></span>
      </div>
    </div>
  </div>

  <div class="tool-shell">
    <button class="btn secondary" style="float:right;" onclick="facRefresh()"><span class=gicon>refresh</span> Actualiser</button>
    <strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;"><span class=gicon>receipt_long</span> Devis, factures et avoirs</strong>
    <div class="tool-row" style="margin:10px 0;clear:right;">
      <select id="facFilterType" onchange="facRenderDocs()"><option value="">Tous les documents</option><option value="devis">Devis</option><option value="facture">Factures</option><option value="avoir">Avoirs</option></select>
      <span class="hint" id="facTotals" style="margin:0;"></span>
    </div>
    <div id="facDocs" class="hint">Chargement…</div>
  </div>

  <div id="facModalOverlay" class="modal-overlay" style="display:none;z-index:260;" onclick="if(event.target===this) facCloseModal()">
    <div class="modal-card" style="max-width:520px;width:94vw;" id="facModalCard"></div>
  </div>`;
}

/* Onglet et styles : ajoutés à l'Administration (admin.js a déjà injecté son contenu). */
(function facInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'facturation';
  btn.innerHTML = '<span class=gicon>receipt_long</span> Facturation';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-facturation';
  panel.innerHTML = facPanelHtml();
  view.appendChild(panel);
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    facRefresh();
  });
  const st = document.createElement('style');
  st.textContent = `
    .fac-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px 14px;margin:6px 0 12px;}
    .fac-grid label{display:flex;flex-direction:column;gap:4px;font-size:.82rem;font-weight:600;color:var(--ink-soft);}
    .fac-grid label.wide{grid-column:1 / -1;}
    .fac-grid input,.fac-grid select,.fac-grid textarea{font-weight:400;color:var(--ink);font-size:.92rem;}
    .fac-grid small{font-weight:400;font-size:.75rem;}
    .fac-step{font-family:'Space Grotesk',sans-serif;font-weight:700;margin:18px 0 8px;color:var(--ink);}
    .fac-levels{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;}
    .fac-level{display:flex;flex-direction:column;gap:6px;border:1.5px solid rgba(28,43,57,.14);border-radius:10px;padding:8px 10px;width:120px;font-weight:700;font-family:'Space Grotesk',sans-serif;}
    .fac-level input[type=number]{width:100%;}
    .fac-extra{display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap;}
    .fac-recap{width:100%;border-collapse:collapse;font-size:.9rem;background:#fff;border-radius:10px;overflow:hidden;}
    .fac-recap td,.fac-recap th{padding:7px 10px;border-bottom:1px solid rgba(28,43,57,.08);text-align:right;}
    .fac-recap td:first-child,.fac-recap th:first-child{text-align:left;}
    .fac-recap tr.tot td{font-weight:700;font-size:1rem;border-bottom:none;}
    .fac-badge{display:inline-block;border-radius:999px;padding:2px 9px;font-size:.75rem;font-weight:700;color:#fff;white-space:nowrap;}
    .fac-actions{display:flex;gap:5px;flex-wrap:wrap;}
    .fac-actions .btn{padding:3px 10px;font-size:.78rem;}
    #facModalCard label{display:flex;flex-direction:column;gap:4px;font-size:.85rem;font-weight:600;color:var(--ink-soft);margin:10px 0;}
  `;
  document.head.appendChild(st);
  // Réservé à l'administrateur général : caché pour un référent d'établissement.
  const origApply = window.adminApplyScopeUI;
  if(typeof origApply === 'function'){
    window.adminApplyScopeUI = function(){
      origApply.apply(this, arguments);
      const scoped = !!adminScopeUai();
      btn.style.display = scoped ? 'none' : '';
      if(scoped && btn.classList.contains('active')) document.querySelector('#adminTabs [data-admin-tab="comptes"]').click();
    };
    window.adminApplyScopeUI();
  }
})();

/* ---------- Chargement ---------- */
async function facRefresh(){
  if(adminScopeUai()) return;
  const [em, cl, docs, etabs] = await Promise.all([
    sb.from('facturation_emetteur').select('*').eq('id', 1).maybeSingle(),
    sb.from('facturation_clients').select('*').order('nom'),
    sb.from('facturation_documents').select('*').order('created_at', {ascending:false}),
    sb.from('etablissements').select('uai,nom,licence_until'),
  ]);
  const err = em.error || cl.error || docs.error;
  if(err){ document.getElementById('facDocs').textContent = 'Erreur : ' + err.message; return; }
  facState.emetteur = em.data; facState.clients = cl.data || []; facState.docs = docs.data || []; facState.etabs = etabs.data || [];
  facFillEmetteur();
  const sel = document.getElementById('facClientSel'), keep = sel.value;
  sel.innerHTML = '<option value="">+ Nouvel établissement</option>' + facState.clients.map(c=>
    `<option value="${c.id}">${facEsc(c.nom)}${c.uai ? ' · ' + facEsc(c.uai) : ''} (${c.statut === 'prive' ? 'privé' : 'public'})</option>`).join('');
  if(keep && facState.clients.some(c=>c.id === keep)) sel.value = keep;
  facSelectClient(true);
  facRenderExtra(); facRenderTotal(); facRenderDocs();
}

/* ---------- Émetteur ---------- */
function facFillEmetteur(){
  const e = facState.emetteur || {}, p = e.prix || {};
  const set = (id, v)=>{ const el = document.getElementById(id); if(el) el.value = v == null ? '' : v; };
  set('facEmNom', e.nom); set('facEmEnseigne', e.enseigne); set('facEmSiret', e.siret); set('facEmEmail', e.email);
  set('facEmTel', e.telephone); set('facEmAdresse', e.adresse); set('facEmIban', e.iban); set('facEmBic', e.bic);
  set('facEmTva', e.mention_tva); set('facEmP1', p['1']); set('facEmP2', p['2']); set('facEmP3', p['3']); set('facEmP4', p['4']);
  set('facEmValid', e.validite_devis_jours); set('facEmDelai', e.delai_paiement_jours);
  const missing = ['nom','siret','adresse'].filter(k=>!(e[k]||'').trim());
  document.getElementById('facEmetteurWarn').textContent = missing.length ? 'à compléter avant le premier devis' : '';
  if(missing.length) document.getElementById('facAccEmetteur').classList.add('open');
}
async function facSaveEmetteur(){
  const v = id => document.getElementById(id).value.trim();
  const num = id => { const x = parseFloat(String(v(id)).replace(',', '.')); return isFinite(x) ? x : 0; };
  const row = {
    nom: v('facEmNom'), enseigne: v('facEmEnseigne'), siret: v('facEmSiret').replace(/\s+/g,''), email: v('facEmEmail'),
    telephone: v('facEmTel'), adresse: v('facEmAdresse'), iban: v('facEmIban').replace(/\s+/g,' ').toUpperCase(), bic: v('facEmBic').toUpperCase(),
    mention_tva: v('facEmTva'), prix: {1:num('facEmP1'), 2:num('facEmP2'), 3:num('facEmP3'), 4:num('facEmP4')},
    validite_devis_jours: parseInt(v('facEmValid'),10) || 30, delai_paiement_jours: parseInt(v('facEmDelai'),10) || 30,
    updated_at: new Date().toISOString(),
  };
  const msg = document.getElementById('facEmMsg');
  if(row.siret && !/^\d{14}$/.test(row.siret)){ msg.textContent = 'Le SIRET doit compter 14 chiffres.'; return; }
  const { error } = await sb.from('facturation_emetteur').update(row).eq('id', 1);
  msg.textContent = error ? 'Erreur : ' + error.message : '✓ Enregistré';
  if(!error){ facState.emetteur = Object.assign({}, facState.emetteur, row); facFillEmetteur(); facRenderTotal(); setTimeout(()=>msg.textContent='', 3000); }
}

/* ---------- Client ---------- */
function facCurrentClient(){ const id = document.getElementById('facClientSel').value; return facState.clients.find(c=>c.id === id) || null; }
function facSelectClient(keepForm){
  const c = facCurrentClient();
  const set = (id, val)=>{ document.getElementById(id).value = val || ''; };
  if(c || !keepForm){
    set('facClUai', c && c.uai); set('facClNom', c && c.nom); set('facClOrganisme', c && c.organisme); set('facClSiret', c && c.siret);
    set('facClService', c && c.code_service); set('facClEmail', c && c.email); set('facClAdresse', c && c.adresse);
    document.getElementById('facClStatut').value = (c && c.statut) || 'public';
  }
  facClientStatutUI();
  document.getElementById('facClMsg').textContent = c ? '' : 'Nouvel établissement : complétez puis enregistrez la fiche.';
}
function facClientStatutUI(){
  const prive = document.getElementById('facClStatut').value === 'prive';
  document.getElementById('facClOrgWrap').style.display = prive ? '' : 'none';
  document.getElementById('facClServiceWrap').style.display = prive ? 'none' : '';
  document.getElementById('facClSiretHint').textContent = prive ? 'Celui de l\'organisme de gestion.' : 'Obligatoire pour Chorus Pro.';
}
function facUaiLookup(){
  const uai = document.getElementById('facClUai').value.trim().toUpperCase();
  const nom = document.getElementById('facClNom');
  const e = facState.etabs.find(x=>x.uai === uai);
  if(e && !nom.value.trim()) nom.value = e.nom || '';
}
function facClientFromForm(){
  const v = id => document.getElementById(id).value.trim();
  return { uai: v('facClUai').toUpperCase() || null, nom: v('facClNom'), statut: v('facClStatut'), organisme: v('facClOrganisme'),
    siret: v('facClSiret').replace(/\s+/g,''), code_service: v('facClService'), email: v('facClEmail'), adresse: v('facClAdresse') };
}
async function facSaveClient(){
  const msg = document.getElementById('facClMsg');
  const row = facClientFromForm();
  if(!row.nom){ msg.textContent = 'Indiquez le nom de l\'établissement.'; return null; }
  if(row.siret && !/^\d{14}$/.test(row.siret)){ msg.textContent = 'Le SIRET doit compter 14 chiffres.'; return null; }
  const cur = facCurrentClient();
  const q = cur ? sb.from('facturation_clients').update(row).eq('id', cur.id).select().single()
                : sb.from('facturation_clients').insert(row).select().single();
  const { data, error } = await q;
  if(error){ msg.textContent = 'Erreur : ' + (/duplicate|unique/i.test(error.message) ? 'une fiche existe déjà pour cet UAI.' : error.message); return null; }
  const i = facState.clients.findIndex(c=>c.id === data.id);
  if(i >= 0) facState.clients[i] = data; else facState.clients.push(data);
  facState.clients.sort((a,b)=>a.nom.localeCompare(b.nom));
  const sel = document.getElementById('facClientSel');
  sel.innerHTML = '<option value="">+ Nouvel établissement</option>' + facState.clients.map(c=>
    `<option value="${c.id}">${facEsc(c.nom)}${c.uai ? ' · ' + facEsc(c.uai) : ''} (${c.statut === 'prive' ? 'privé' : 'public'})</option>`).join('');
  sel.value = data.id;
  msg.textContent = '✓ Fiche enregistrée';
  return data;
}

/* ---------- Lignes et total ---------- */
function facLicenceLines(){
  const annee = facAnneesScolaires()[parseInt(document.getElementById('facAnnee').value,10) || 0];
  const lv = FAC_NIVEAUX.filter(n=>document.getElementById('facLv_'+n).checked).map(n=>({ n, eff: Math.max(0, parseInt(document.getElementById('facEff_'+n).value,10) || 0) })).filter(x=>x.eff > 0);
  const pu = facPrix(lv.length);
  return { annee, niveaux: lv.map(x=>x.n), effectifs: Object.fromEntries(lv.map(x=>[x.n, x.eff])),
    lignes: lv.map(x=>({ designation:`Licence établissement L'Atelier des Maths ${annee.label} – niveau ${x.n}`, detail:`${x.eff} élèves, licences professeurs incluses`, qte:x.eff, unite:'élève', pu })) };
}
function facAddExtra(){ facState.extra.push({ designation:'', qte:1, pu:0 }); facRenderExtra(); facRenderTotal(); }
function facRenderExtra(){
  document.getElementById('facExtraLines').innerHTML = facState.extra.map((l,i)=>`
    <div class="fac-extra">
      <input type="text" value="${facEsc(l.designation)}" placeholder="Désignation (ex. Formation de l'équipe, demi-journée)" style="flex:1;min-width:240px;" oninput="facState.extra[${i}].designation=this.value;facRenderTotal()">
      <label class="hint" style="margin:0;">Qté <input type="number" step="1" value="${l.qte}" style="width:70px;" oninput="facState.extra[${i}].qte=parseFloat(this.value)||0;facRenderTotal()"></label>
      <label class="hint" style="margin:0;">Prix unitaire <input type="number" step="0.01" value="${l.pu}" style="width:100px;" oninput="facState.extra[${i}].pu=parseFloat(this.value)||0;facRenderTotal()"></label>
      <button type="button" class="btn secondary" style="padding:3px 9px;" onclick="facState.extra.splice(${i},1);facRenderExtra();facRenderTotal()" title="Retirer"><span class="gicon">close</span></button>
    </div>`).join('');
}
function facAllLines(){
  const lic = facLicenceLines();
  const extra = facState.extra.filter(l=>l.designation.trim() && l.qte).map(l=>({ designation:l.designation.trim(), qte:l.qte, unite:'', pu:l.pu }));
  return Object.assign(lic, { lignes: lic.lignes.concat(extra) });
}
function facLineTotal(l){ return Math.round(Number(l.qte) * Number(l.pu) * 100) / 100; }
function facRenderTotal(){
  const box = document.getElementById('facRecap'); if(!box) return;
  const { lignes, niveaux } = facAllLines();
  if(!lignes.length){ box.innerHTML = '<p class="hint" style="margin:0;">Cochez au moins un niveau avec son effectif, ou ajoutez une ligne.</p>'; return; }
  const total = lignes.reduce((t,l)=>t + facLineTotal(l), 0);
  box.innerHTML = `<table class="fac-recap"><tr><th>Désignation</th><th>Qté</th><th>Prix unitaire</th><th>Montant</th></tr>
    ${lignes.map(l=>`<tr><td>${facEsc(l.designation)}${l.detail ? `<div class="hint" style="margin:0;">${facEsc(l.detail)}</div>` : ''}</td><td>${l.qte}</td><td>${facMoney(l.pu)}</td><td>${facMoney(facLineTotal(l))}</td></tr>`).join('')}
    <tr class="tot"><td colspan="3">Total${niveaux.length ? ` · tarif ${niveaux.length === 4 ? 'collège complet' : niveaux.length + ' niveau' + (niveaux.length > 1 ? 'x' : '')}` : ''}</td><td>${facMoney(total)}</td></tr></table>`;
}

/* ---------- Émission ---------- */
/* Vos coordonnées figurent obligatoirement sur les devis comme sur les factures. */
function facEmetteurIncomplet(){
  const em = facState.emetteur || {};
  if(!['nom','siret','adresse'].some(k=>!(em[k]||'').trim())) return false;
  const acc = document.getElementById('facAccEmetteur');
  acc.classList.add('open'); acc.scrollIntoView({behavior:'smooth', block:'center'});
  niceAlert('Complétez d\'abord « Mes informations » (nom avec la mention EI, SIRET, adresse) : elles figurent obligatoirement sur les devis et les factures.');
  return true;
}
async function facEmettreDevis(){
  const msg = document.getElementById('facDevisMsg');
  if(facEmetteurIncomplet()) return;
  const client = await facSaveClient(); // la fiche du formulaire fait foi (enregistrée au passage)
  if(!client){ msg.textContent = 'Complétez la fiche de l\'établissement.'; return; }
  const { lignes, niveaux, effectifs, annee } = facAllLines();
  if(!lignes.length){ msg.textContent = 'Aucune ligne à facturer.'; return; }
  const e = facState.emetteur || {};
  const doc = { client_id: client.id, lignes, niveaux, effectifs, periode_debut: annee.debut, periode_fin: annee.fin,
    date_validite: facAddDays(e.validite_devis_jours || 30), notes: document.getElementById('facNotes').value.trim() };
  msg.textContent = 'Émission…';
  const { data, error } = await sb.rpc('facturation_emettre', { p_type:'devis', p_doc: doc });
  if(error){ msg.textContent = 'Erreur : ' + error.message; return; }
  msg.textContent = `✓ Devis ${data.numero} émis`;
  FAC_NIVEAUX.forEach(n=>{ document.getElementById('facLv_'+n).checked = false; document.getElementById('facEff_'+n).value = ''; });
  facState.extra = []; document.getElementById('facNotes').value = '';
  await facRefresh();
  facOpenPdf(data.id);
}

/* ---------- Liste des documents ---------- */
function facRenderDocs(){
  const box = document.getElementById('facDocs'); if(!box) return;
  const f = document.getElementById('facFilterType').value;
  const docs = facState.docs.filter(d=>!f || d.type === f);
  const y = new Date().getFullYear();
  const factY = facState.docs.filter(d=>(d.type === 'facture' || d.type === 'avoir') && d.annee === y);
  const ca = factY.reduce((t,d)=>t + Number(d.total), 0);
  const encaisse = facState.docs.filter(d=>d.type === 'facture' && d.statut === 'payee' && (d.paye_le||'').startsWith(String(y))).reduce((t,d)=>t + Number(d.total), 0);
  document.getElementById('facTotals').innerHTML = `${y} : facturé <b>${facMoney(ca)}</b> · encaissé <b>${facMoney(encaisse)}</b>`;
  if(!docs.length){ box.innerHTML = 'Aucun document pour l\'instant.'; return; }
  box.innerHTML = `<div style="overflow-x:auto;"><table class="sup-table"><thead><tr><th>Numéro</th><th>Date</th><th>Établissement</th><th>Montant</th><th>Statut</th><th>Suivi</th><th></th></tr></thead><tbody>
    ${docs.map(d=>{
      const st = FAC_STATUTS[d.statut] || FAC_STATUTS.emis;
      const cli = d.client || {};
      const src = d.source_id ? facState.docs.find(x=>x.id === d.source_id) : null;
      const suivi = [];
      if(d.type === 'devis' && d.date_validite && d.statut === 'emis') suivi.push('valable jusqu\'au ' + facDate(d.date_validite));
      if(d.numero_engagement) suivi.push((cli.statut === 'prive' ? 'commande ' : 'engagement ') + facEsc(d.numero_engagement));
      if(d.licence_until) suivi.push('licence jusqu\'au ' + facDate(d.licence_until));
      if(d.type === 'facture' && d.statut !== 'payee' && d.statut !== 'annule' && d.date_echeance) suivi.push('échéance ' + facDate(d.date_echeance));
      if(d.paye_le) suivi.push('payée le ' + facDate(d.paye_le));
      if(src) suivi.push('← ' + facEsc(src.numero));
      const fact = d.type === 'devis' ? facState.docs.find(x=>x.source_id === d.id && x.type === 'facture') : null;
      if(fact) suivi.push('→ ' + facEsc(fact.numero));
      const act = [`<button class="btn secondary" onclick="facOpenPdf('${d.id}')"><span class="gicon">picture_as_pdf</span> PDF</button>`];
      if(d.type === 'devis' && d.statut === 'emis'){
        act.push(`<button class="btn" onclick="facCommande('${d.id}')">Commande reçue</button>`);
        act.push(`<button class="btn secondary" onclick="facSetStatut('${d.id}','refuse')">Refusé</button>`);
      }
      if(d.type === 'devis' && d.statut === 'accepte' && !fact) act.push(`<button class="btn" onclick="facFacturer('${d.id}')">Facturer</button>`);
      if(d.type === 'facture' && d.statut === 'emis'){
        act.push(`<button class="btn" onclick="facPayee('${d.id}')">Payée</button>`);
        act.push(`<button class="btn secondary" onclick="facAvoir('${d.id}')">Annuler par un avoir</button>`);
      }
      return `<tr>
        <td class="hint-mono" style="white-space:nowrap;"><b>${facEsc(d.numero)}</b><div class="hint" style="margin:0;">${d.type}</div></td>
        <td style="white-space:nowrap;">${facDate(d.date_emission)}</td>
        <td>${facEsc(cli.nom)}<div class="hint" style="margin:0;">${cli.statut === 'prive' ? 'privé' : 'public'}${cli.uai ? ' · ' + facEsc(cli.uai) : ''}</div></td>
        <td style="white-space:nowrap;text-align:right;">${facMoney(d.total)}</td>
        <td><span class="fac-badge" style="background:${st.color};">${d.type === 'facture' && d.statut === 'emis' ? 'À payer' : st.label}</span></td>
        <td class="hint" style="margin:0;">${suivi.join('<br>')}</td>
        <td><div class="fac-actions">${act.join('')}</div></td>
      </tr>`;
    }).join('')}</tbody></table></div>`;
}

/* ---------- Petite fenêtre de saisie ---------- */
function facModal(html){ document.getElementById('facModalCard').innerHTML = html; document.getElementById('facModalOverlay').style.display = 'flex'; }
function facCloseModal(){ document.getElementById('facModalOverlay').style.display = 'none'; }

async function facSetStatut(id, statut){
  const d = facState.docs.find(x=>x.id === id);
  if(!d || !(await niceConfirm(`Marquer le ${d.type} ${d.numero} comme « ${FAC_STATUTS[statut].label} » ?`))) return;
  const { error } = await sb.from('facturation_documents').update({ statut }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  facRefresh();
}
/* Commande reçue : n° d'engagement / bon de commande, et ouverture de la licence de l'établissement. */
function facCommande(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  const prive = (d.client||{}).statut === 'prive';
  facModal(`<strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">Commande reçue · ${facEsc(d.numero)}</strong>
    <label>${prive ? 'Référence du bon de commande (ou « devis signé »)' : 'Numéro d\'engagement (sur le bon de commande)'}<input type="text" id="facCmdNum" value="${facEsc(d.numero_engagement)}"></label>
    ${(d.client||{}).uai ? `<label>Ouvrir la licence de l'établissement jusqu'au<input type="date" id="facCmdLic" value="${d.periode_fin || ''}"><small style="font-weight:400;">Tous les professeurs de l'UAI ${facEsc(d.client.uai)} ont alors accès au site.</small></label>` : '<p class="hint">Pas d\'UAI sur la fiche : la licence n\'est pas ouverte automatiquement.</p>'}
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;"><button class="btn secondary" onclick="facCloseModal()">Annuler</button><button class="btn" onclick="facCommandeOk('${id}')">Enregistrer</button></div>`);
}
async function facCommandeOk(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  const num = document.getElementById('facCmdNum').value.trim();
  const licEl = document.getElementById('facCmdLic'), lic = licEl ? licEl.value : '';
  const { error } = await sb.from('facturation_documents').update({ statut:'accepte', numero_engagement:num, licence_until: lic || null }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  if(lic && d.client.uai){
    const note = `Devis ${d.numero}` + (num ? ` · commande ${num}` : '');
    const exists = facState.etabs.find(e=>e.uai === d.client.uai);
    const r = exists
      ? await sb.from('etablissements').update({ licence_until: lic, licence_note: note }).eq('uai', d.client.uai)
      : await sb.from('etablissements').insert({ uai: d.client.uai, nom: d.client.nom, licence_until: lic, licence_note: note });
    if(r.error){ niceAlert('Commande enregistrée, mais la licence n\'a pas pu être ouverte : ' + r.error.message); }
  }
  facCloseModal(); facRefresh();
  if(typeof adminRefreshEtablissements === 'function') adminRefreshEtablissements();
}
async function facFacturer(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  if(facEmetteurIncomplet()) return;
  const cur = facState.clients.find(c=>c.id === d.client_id);
  const cli = cur || d.client;
  const manque = [];
  if(!cli.siret) manque.push('SIRET de l\'établissement' + (cli.statut === 'prive' ? ' (organisme de gestion)' : ''));
  if(!cli.adresse) manque.push('adresse');
  if(manque.length && !(await niceConfirm('Il manque sur la fiche : ' + manque.join(', ') + '. Émettre la facture quand même ?'))) return;
  if(!(await niceConfirm(`Émettre la facture du devis ${d.numero} (${facMoney(d.total)}) ? Une facture émise ne se modifie plus.`))) return;
  const e = facState.emetteur || {};
  const { data, error } = await sb.rpc('facturation_emettre', { p_type:'facture', p_doc: {
    client_id: d.client_id, lignes: d.lignes, niveaux: d.niveaux, effectifs: d.effectifs, periode_debut: d.periode_debut, periode_fin: d.periode_fin,
    numero_engagement: d.numero_engagement, source_id: d.id, date_echeance: facAddDays(e.delai_paiement_jours ?? 30), notes: d.notes } });
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  await facRefresh();
  facOpenPdf(data.id);
}
function facPayee(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  facModal(`<strong style="font-family:'Space Grotesk',sans-serif;font-size:1.05rem;">Paiement reçu · ${facEsc(d.numero)}</strong>
    <label>Date du paiement<input type="date" id="facPayDate" value="${facISO(new Date())}"></label>
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;"><button class="btn secondary" onclick="facCloseModal()">Annuler</button><button class="btn" onclick="facPayeeOk('${id}')">Enregistrer</button></div>`);
}
async function facPayeeOk(id){
  const date = document.getElementById('facPayDate').value || facISO(new Date());
  const { error } = await sb.from('facturation_documents').update({ statut:'payee', paye_le: date }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  facCloseModal(); facRefresh();
}
async function facAvoir(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  if(!(await niceConfirm(`Annuler la facture ${d.numero} en émettant un avoir de ${facMoney(-d.total)} ? L'avoir est définitif ; vous pourrez ensuite émettre une nouvelle facture corrigée.`))) return;
  const lignes = d.lignes.map(l=>Object.assign({}, l, { pu: -Number(l.pu) }));
  const { data, error } = await sb.rpc('facturation_emettre', { p_type:'avoir', p_doc: {
    client_id: d.client_id, lignes, niveaux: d.niveaux, effectifs: d.effectifs, periode_debut: d.periode_debut, periode_fin: d.periode_fin,
    numero_engagement: d.numero_engagement, source_id: d.id } });
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  await sb.from('facturation_documents').update({ statut:'annule' }).eq('id', d.id);
  await facRefresh();
  facOpenPdf(data.id);
}

/* ---------- PDF (fenêtre d'impression) ---------- */
function facDocHtml(d){
  const em = d.emetteur || {}, cli = d.client || {};
  const src = d.source_id ? facState.docs.find(x=>x.id === d.source_id) : null;
  const prive = cli.statut === 'prive';
  const titre = { devis:'DEVIS', facture:'FACTURE', avoir:'AVOIR' }[d.type];
  const nl = s => facEsc(s).replace(/\n/g, '<br>');
  const periode = d.periode_debut && d.periode_fin ? `du ${facDate(d.periode_debut)} au ${facDate(d.periode_fin)}` : '';
  const destinataire = prive
    ? `<b>${facEsc(cli.organisme || cli.nom)}</b>${cli.organisme ? `<br>pour ${facEsc(cli.nom)}` : ''}`
    : `<b>${facEsc(cli.nom)}</b>`;
  const ids = [cli.uai ? 'UAI ' + facEsc(cli.uai) : '', cli.siret ? 'SIRET ' + facEsc(cli.siret) : '', !prive && cli.code_service ? 'Code service ' + facEsc(cli.code_service) : ''].filter(Boolean).join('<br>');
  const lignes = (d.lignes||[]).map(l=>`<tr><td>${facEsc(l.designation)}${l.detail ? `<div class="det">${facEsc(l.detail)}</div>` : ''}</td>
    <td class="n">${l.qte}${l.unite ? ' ' + facEsc(l.unite) + (Math.abs(l.qte) > 1 ? 's' : '') : ''}</td><td class="n">${facMoney(l.pu)}</td><td class="n">${facMoney(facLineTotal(l))}</td></tr>`).join('');
  const iban = em.iban ? `IBAN ${facEsc(em.iban)}${em.bic ? ' · BIC ' + facEsc(em.bic) : ''}` : 'IBAN : à compléter';
  let bloc = '';
  if(d.type === 'devis'){
    bloc = `<p>Devis valable jusqu'au <b>${facDate(d.date_validite)}</b>.</p>` + (prive
      ? `<div class="accord"><b>Bon pour accord</b><br>Date, nom, signature et cachet :<div style="height:70px;"></div></div>`
      : `<p>Pour commander : adressez un bon de commande mentionnant le numéro de ce devis (<b>${facEsc(d.numero)}</b>) à ${facEsc(em.email)}. La facture sera déposée sur Chorus Pro au SIRET de l'établissement.</p>`);
  } else if(d.type === 'facture'){
    bloc = `<p>Échéance : <b>${facDate(d.date_echeance)}</b>${d.numero_engagement ? ` · ${prive ? 'Commande' : 'N° d\'engagement'} : <b>${facEsc(d.numero_engagement)}</b>` : ''}</p>
      <p>${prive ? `Paiement par virement, en indiquant la référence <b>${facEsc(d.numero)}</b> : ${iban}` : `Facture déposée sur Chorus Pro. Paiement par mandat administratif, par virement : ${iban}`}</p>
      <p class="small">${prive
        ? 'En cas de retard de paiement : pénalités au taux de trois fois le taux d\'intérêt légal et indemnité forfaitaire pour frais de recouvrement de 40 € (art. L441-10 du code de commerce). Pas d\'escompte pour paiement anticipé.'
        : 'En cas de retard de paiement : intérêts moratoires au taux de la Banque centrale européenne majoré de 8 points et indemnité forfaitaire pour frais de recouvrement de 40 € (code de la commande publique). Pas d\'escompte pour paiement anticipé.'}</p>`;
  } else {
    bloc = `<p>Avoir annulant la facture <b>${facEsc(src ? src.numero : '')}</b>${src ? ' du ' + facDate(src.date_emission) : ''}. Le montant sera remboursé ou déduit selon l'accord avec l'établissement.</p>`;
  }
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><title>${titre} ${facEsc(d.numero)}</title><style>
    @page{size:A4;margin:16mm 15mm;}
    body{font-family:Arial,Helvetica,sans-serif;color:#1c2330;font-size:10.5pt;margin:0;}
    .top{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;}
    .em{font-size:9.5pt;line-height:1.45;}
    .em b{font-size:12pt;}
    .ttl{text-align:right;}
    .ttl h1{margin:0;font-size:22pt;letter-spacing:1px;color:#0C5BA0;}
    .ttl div{font-size:10pt;line-height:1.5;}
    .dest{margin:22px 0 16px auto;width:48%;border:1px solid #cfd6df;border-radius:6px;padding:10px 12px;line-height:1.45;}
    .dest .lbl{font-size:8.5pt;color:#6b7482;text-transform:uppercase;letter-spacing:.5px;}
    .obj{margin:6px 0 12px;}
    table{width:100%;border-collapse:collapse;margin-top:6px;}
    th{background:#eef3f9;text-align:left;font-size:9pt;padding:7px 8px;border-bottom:1px solid #b9c3cf;}
    td{padding:8px;border-bottom:1px solid #e3e7ec;vertical-align:top;}
    .n{text-align:right;white-space:nowrap;}
    .det{font-size:8.5pt;color:#6b7482;margin-top:2px;}
    .tot{margin:10px 0 0 auto;width:55%;}
    .tot td{border:none;padding:4px 8px;}
    .tot tr.big td{font-size:12.5pt;font-weight:bold;border-top:2px solid #1c2330;padding-top:8px;}
    .tva{text-align:right;font-size:9pt;color:#444;margin-top:2px;}
    .small{font-size:8.5pt;color:#555;}
    .accord{border:1px solid #cfd6df;border-radius:6px;padding:10px 12px;width:55%;margin-top:10px;}
    .notes{margin-top:10px;padding:8px 10px;background:#f6f7f9;border-radius:6px;}
    .foot{margin-top:28px;border-top:1px solid #d5dbe2;padding-top:8px;font-size:8pt;color:#6b7482;text-align:center;}
    @media screen{body{max-width:760px;margin:28px auto 90px;padding:0 24px;}}
    .print{position:fixed;bottom:18px;right:18px;box-shadow:0 4px 14px rgba(0,0,0,.2);background:#0C5BA0;color:#fff;border:none;border-radius:20px;padding:9px 18px;font-weight:bold;cursor:pointer;}
    @media print{.print{display:none;}}
  </style></head><body>
    <button class="print" onclick="window.print()">Imprimer / Enregistrer en PDF</button>
    <div class="top">
      <div class="em"><b>${facEsc(em.nom || '(nom à compléter)')}</b>${em.enseigne ? '<br>' + facEsc(em.enseigne) : ''}<br>${nl(em.adresse || '(adresse à compléter)')}<br>
        SIRET ${facEsc(em.siret || '(à compléter)')}${em.email ? '<br>' + facEsc(em.email) : ''}${em.telephone ? ' · ' + facEsc(em.telephone) : ''}</div>
      <div class="ttl"><h1>${titre}</h1><div>N° <b>${facEsc(d.numero)}</b><br>Date : ${facDate(d.date_emission)}${d.type === 'devis' && d.date_validite ? '<br>Valable jusqu\'au ' + facDate(d.date_validite) : ''}${d.type === 'facture' && d.date_echeance ? '<br>Échéance : ' + facDate(d.date_echeance) : ''}</div></div>
    </div>
    <div class="dest"><div class="lbl">${d.type === 'devis' ? 'Établissement' : 'Facturé à'}</div>${destinataire}<br>${nl(cli.adresse)}${ids ? '<br>' + ids : ''}</div>
    <div class="obj"><b>Objet :</b> L'Atelier des Maths (maths.latelieraugmente.fr) – licence établissement${periode ? ', ' + periode : ''}${(d.niveaux||[]).length ? ' – niveaux ' + d.niveaux.join(', ') : ''}.</div>
    <table><tr><th>Désignation</th><th class="n">Quantité</th><th class="n">Prix unitaire</th><th class="n">Montant</th></tr>${lignes}</table>
    <table class="tot"><tr class="big"><td>${d.type === 'avoir' ? 'Total de l\'avoir' : d.type === 'devis' ? 'Total' : 'Net à payer'}</td><td class="n">${facMoney(d.total)}</td></tr></table>
    ${em.mention_tva ? `<div class="tva">${facEsc(em.mention_tva)}</div>` : ''}
    ${d.notes ? `<div class="notes">${nl(d.notes)}</div>` : ''}
    <div style="margin-top:16px;">${bloc}</div>
    <div class="foot">${facEsc(em.nom)}${em.enseigne ? ' – ' + facEsc(em.enseigne) : ''} · SIRET ${facEsc(em.siret)} · ${facEsc(em.email)}</div>
  </body></html>`;
}
function facOpenPdf(id){
  const d = facState.docs.find(x=>x.id === id); if(!d) return;
  const w = window.open('', '_blank', 'width=900,height=1000');
  if(!w){ niceAlert('La fenêtre n\'a pas pu s\'ouvrir : autorisez les fenêtres pop-up pour ce site.'); return; }
  w.document.open(); w.document.write(facDocHtml(d)); w.document.close();
  w.focus();
}

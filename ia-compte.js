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
  if(a && a.role==='eleve' && a.features){
    if(a.features.quiz) on.add('ai-quiz');
    if(a.features.figure) on.add('ai-figure');
    if(a.features.tableau) on.add('ai-tableau');
  }
  AI_BODY_CLASSES.forEach(c=>document.body.classList.toggle(c, on.has(c)));
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
  const [{ data: s }, { data: cls }] = await Promise.all([
    sb.from('teacher_ai_settings').select('*').eq('teacher_id', currentUser.id).maybeSingle(),
    sb.from('class_teachers').select('classes(id,nom,niveau)').eq('teacher_id', currentUser.id),
  ]);
  iaSettings = s || {ai_self:false, ai_students:false, student_features:{quiz:true,tableau:true,figure:true}, student_weekly_quota:20, key_last4:null, key_set_at:null};
  iaMyClasses = (cls||[]).map(r=>r.classes).filter(Boolean).sort((a,b)=>a.nom.localeCompare(b.nom));
  const isAdmin = currentUserRole==='admin';
  const hasKey = isAdmin || !!iaSettings.key_last4;
  const feats = iaSettings.student_features || {};
  const quota = iaSettings.student_weekly_quota;

  const keyCard = isAdmin ? `
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">key</span> 1. Clé Anthropic</strong>
      <p class="hint" style="margin:6px 0 0;">Administrateur : l'IA de votre compte et de vos classes utilise la clé du site. Pas besoin de clé personnelle.</p>
    </div>` : `
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">key</span> 1. Votre clé Anthropic</strong>
      <p class="hint" style="margin:6px 0 8px;">L'IA du site est payée par <b>votre propre compte Anthropic</b> (l'entreprise qui fournit l'IA Claude) : vous y ajoutez vous-même des crédits et fixez un plafond de dépense. Le site n'encaisse rien.</p>
      <div id="iaKeyStatus" style="margin-bottom:8px;">${iaSettings.key_last4
        ? `<span style="color:#1F7A4D;font-weight:700;"><span class="gicon">check_circle</span> Clé enregistrée</span> <span class="hint-mono">sk-ant-…${iaEsc(iaSettings.key_last4)}</span> <span class="hint">(${iaSettings.key_set_at ? new Date(iaSettings.key_set_at).toLocaleDateString('fr-FR') : ''})</span>`
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
      <label style="display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-weight:600;"><input type="checkbox" id="iaSelf" ${iaSettings.ai_self||isAdmin?'checked':''} ${hasKey&&!isAdmin?'':'disabled'}> Utiliser l'IA dans mes outils</label>
      <p class="hint" style="margin:0;">Débloque : ${Object.values(IA_FEATURE_LABELS).join(' · ')} (outil « Animation géométrique » compris). Décoché : ces outils disparaissent de votre compte.${isAdmin?' Toujours actif pour l\'administrateur.':''}</p>
    </div>
    <div class="tool-shell ia-card" style="${hasKey?'':'opacity:.55;'}">
      <strong class="ia-h"><span class="gicon">groups</span> 3. L'IA pour mes élèves</strong>
      <label style="display:flex;align-items:center;gap:8px;margin:8px 0 4px;font-weight:600;"><input type="checkbox" id="iaStudents" ${iaSettings.ai_students?'checked':''} ${hasKey?'':'disabled'} onchange="document.getElementById('iaStudentOpts').style.opacity=this.checked?1:.5"> Autoriser l'IA pour les élèves de mes classes</label>
      <p class="hint" style="margin:0 0 8px;">Leurs utilisations sont payées par ${isAdmin?'la clé du site':'votre clé'} et figurent dans le rapport ci-dessous. Décoché : aucun outil IA pour vos élèves. Classes concernées : ${iaMyClasses.length ? iaMyClasses.map(c=>iaEsc(c.nom)).join(', ') : '<i>aucune classe rattachée</i>'}.</p>
      <div id="iaStudentOpts" style="opacity:${iaSettings.ai_students?1:.5};">
        <div style="display:flex;flex-wrap:wrap;gap:6px 18px;">
          ${IA_STUDENT_FEATURES.map(f=>`<label style="display:flex;align-items:center;gap:6px;"><input type="checkbox" class="iaStuFeat" value="${f.key}" ${feats[f.key]?'checked':''} ${hasKey?'':'disabled'}> ${f.label}</label>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:10px;">
          <span>Au plus</span>
          <input type="number" id="iaQuota" min="0" max="1000" value="${quota==null?'':quota}" placeholder="∞" style="width:80px;" ${hasKey?'':'disabled'}>
          <span>utilisations par élève sur 7 jours glissants</span>
          <span class="hint" style="margin:0;">(laisser vide = sans limite)</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:12px;">
        <button class="btn" onclick="iaSaveSettings()" ${hasKey?'':'disabled'}>Enregistrer les réglages</button>
        <span class="hint" id="iaSettingsMsg" style="margin:0;"></span>
      </div>
    </div>
    <div class="tool-shell ia-card">
      <strong class="ia-h"><span class="gicon">query_stats</span> 4. Rapport d'utilisation</strong>
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
    </div>`;
  document.getElementById('iaPeriod').value = iaPeriod;
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
async function iaSaveSettings(){
  const msg = document.getElementById('iaSettingsMsg');
  const feats = {};
  document.querySelectorAll('.iaStuFeat').forEach(c=>{ feats[c.value] = c.checked; });
  const qv = document.getElementById('iaQuota').value.trim();
  const quota = qv==='' ? null : Math.max(0, Math.min(1000, parseInt(qv,10)||0));
  const row = {
    ai_self: currentUserRole==='admin' ? true : document.getElementById('iaSelf').checked,
    ai_students: document.getElementById('iaStudents').checked,
    student_features: feats, student_weekly_quota: quota, updated_at: new Date().toISOString(),
  };
  msg.textContent = 'Enregistrement…';
  // Pas d'upsert : le client n'a le droit de modifier que ces colonnes (jamais teacher_id ni la clé).
  const { data: existing } = await sb.from('teacher_ai_settings').select('teacher_id').eq('teacher_id', currentUser.id).maybeSingle();
  const { error } = existing
    ? await sb.from('teacher_ai_settings').update(row).eq('teacher_id', currentUser.id)
    : await sb.from('teacher_ai_settings').insert({teacher_id: currentUser.id, ...row});
  if(error){ msg.innerHTML = '<span style="color:#B3261E;">Erreur : '+iaEsc(error.message)+'</span>'; return; }
  await loadAiAccess();
  msg.innerHTML = '<span style="color:#1F7A4D;"><span class="gicon">check</span> Réglages enregistrés.</span>';
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
  const { data, error } = await sb.rpc('ai_usage_report', {p_from: from.toISOString(), p_to: to.toISOString(), p_all: iaAllSite});
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
function iaReportHtml(rows){
  const me = currentUser.id;
  const total = iaAgg(rows, ()=>'t')[0] || {calls:0, cost:0, unknown:0};
  const mine = rows.filter(r=>r.user_id===me), stu = rows.filter(r=>r.role==='eleve');
  const cost = arr=>arr.reduce((s,r)=>s+(iaCost(r)||0),0);
  const tile = (label, value, sub)=>`<div class="ia-tile"><div class="ia-tile-v">${value}</div><div class="ia-tile-l">${label}</div>${sub?`<div class="hint" style="margin:2px 0 0;">${sub}</div>`:''}</div>`;
  const tiles = `<div class="ia-tiles">
    ${tile('Utilisations', total.calls)}
    ${tile('Coût estimé', iaFmtUsd(total.cost), total.unknown ? total.unknown+' sans détail de coût' : '')}
    ${tile(iaAllSite?'Professeurs':'Moi', iaAllSite ? rows.filter(r=>r.role!=='eleve').length : mine.length, iaFmtUsd(cost(iaAllSite?rows.filter(r=>r.role!=='eleve'):mine)))}
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
  const detail = rows.slice(0,300).map(r=>`<tr><td>${iaFmtDate(r.created_at,true)}</td><td>${iaEsc(iaPersonName(r))}</td><td>${iaEsc(r.classe||'')}</td><td>${iaEsc(IA_FEATURE_LABELS[r.feature]||r.feature||'')}</td><td style="font-size:.8rem;">${iaEsc(r.chapitre||r.niveau||'')}</td><td>${r.input_tokens==null?'–':(r.input_tokens+r.output_tokens)}</td><td>${iaFmtUsd(iaCost(r))}</td><td>${r.key_source==='site'?'<span class="hint">site</span>':'ma clé'}</td></tr>`);
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
    r.chapitre, r.niveau, r.input_tokens, r.output_tokens, iaCost(r)==null?'':iaCost(r).toFixed(5).replace('.',','), r.key_source==='site'?'site':'clé du professeur',
  ].map(q).join(';')));
  const blob = new Blob(['﻿'+lines.join('\n')], {type:'text/csv;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'rapport-ia-'+iaPeriod+'.csv';
  a.click();
}

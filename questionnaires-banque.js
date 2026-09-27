/* =====================================================================
   questionnaires-banque.js -- Questionnaires, étape 4 : banque et partage

   Demandé : créer les questions « à la main, par l'IA, ou depuis une banque de questions, et
   partage possible avec un collègue ».
   - Mes questionnaires (#view-qz-banque) : tous les questionnaires créés (y compris ceux dont le
     devoir a été supprimé, ou enregistrés sans être donnés) ; aperçu, « Donner à une classe »
     (une COPIE est donnée : modifier l'un ne change jamais les notes d'une autre classe),
     dupliquer, partager, supprimer.
   - Partage : avec tous les professeurs de l'établissement et/ou des collègues choisis (même
     d'un autre établissement, retrouvés par leur adresse). Les collègues reçoivent le
     questionnaire en lecture : ils le copient, le donnent à leurs classes, en importent des
     questions, sans jamais pouvoir modifier l'original.
   - Banque de questions (dans l'éditeur, « Importer des questions ») : toutes les questions de
     mes questionnaires et de ceux partagés avec moi, filtrables par mot, type et compétence.
   Dépend de questionnaires.js (qzEd, qzPInit...) et de questionnaires-interros.js (formulaire,
   onglet « Interrogations données »).
   ===================================================================== */

let qzB = null; // { mes:[], partages:[], devoirs:Map(qid→[devoirs]), interros:[], onglet:'donnees'|'mes'|'partages', filtre }

async function qzBanqueCharger(){
  const [{ data: mes, error }, { data: partages }] = await Promise.all([
    sb.from('questionnaires').select('id,titre,questions,reglages,updated_at,created_at,partage_etab,partage_profs').eq('teacher_id', currentUser.id).order('updated_at', { ascending: false }),
    sb.rpc('qz_partages'),
  ]);
  if(error) throw error;
  const ids = (mes || []).map(q => q.id);
  const { data: dv } = ids.length ? await sb.from('devoirs').select('id,titre,questionnaire_id,classes(nom)').in('questionnaire_id', ids) : { data: [] };
  const devoirs = new Map();
  (dv || []).forEach(d => { if(!devoirs.has(d.questionnaire_id)) devoirs.set(d.questionnaire_id, []); devoirs.get(d.questionnaire_id).push(d); });
  qzB = Object.assign(qzB || { onglet: 'donnees', filtre: '' }, { mes: mes || [], partages: Array.isArray(partages) ? partages : [], devoirs });
  return qzB;
}
async function qzBanqueOuvrir(){
  showView('view-qz-banque'); setActiveTopnav('questionnaires');
  const root = document.getElementById('qzBanqueRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  try{ await qzBanqueCharger(); await qzInterrosCharger(); }catch(e){ root.innerHTML = '<p class="hint">Erreur : ' + qzEsc(e.message) + '</p>'; return; }
  qzBanqueRender();
}
function qzBanqueResume(q){
  const qs = (q.questions || []).filter(x => x.type !== 'texte');
  const types = {};
  qs.forEach(x => { types[x.type] = (types[x.type] || 0) + 1; });
  return { n: qs.length, pts: qzTotalMax(q.questions || []), types };
}
function qzBanqueCarte(q, partage){
  const r = qzBanqueResume(q), dv = partage ? [] : (qzB.devoirs.get(q.id) || []);
  const reg = Object.assign({}, QZ_REGLAGES_DEFAUT, q.reglages || {});
  const nbPartage = (q.partage_profs || []).length;
  return `<div class="qz-b-card">
    <div class="qz-b-head">
      <div><b>${qzEsc(q.titre || 'Sans titre')}</b>
        <div class="hint" style="margin:2px 0 0;">${r.n} question${r.n > 1 ? 's' : ''} · ${qzNum(r.pts)} pts · ${reg.mode === 'classe' ? 'en classe, ' + reg.duree + ' min' : 'à la maison'} · ${partage ? 'partagé par ' + qzEsc(q.auteur) : 'modifié le ' + new Date(q.updated_at).toLocaleDateString('fr-FR')}</div></div>
      ${!partage && (q.partage_etab || nbPartage) ? `<span class="qz-b-share"><span class="gicon">group</span> ${q.partage_etab ? 'Établissement' : ''}${q.partage_etab && nbPartage ? ' + ' : ''}${nbPartage ? nbPartage + ' collègue' + (nbPartage > 1 ? 's' : '') : ''}</span>` : ''}
    </div>
    <div class="qz-b-types">${Object.keys(r.types).map(t => `<span class="qz-type-pill"><span class="gicon">${qzType(t).icon}</span> ${qzType(t).label}${r.types[t] > 1 ? ' ×' + r.types[t] : ''}</span>`).join('')}</div>
    ${partage ? '' : `<div class="hint" style="margin:6px 0 0;">${dv.length ? 'Donné à : ' + dv.map(d => qzEsc((d.classes ? d.classes.nom + ' · ' : '') + d.titre)).join(' ; ') : 'Pas encore donné à une classe.'}</div>`}
    <div class="qz-b-act">
      <button class="btn secondary qz-mini" onclick="qzBanqueApercu('${q.id}')"><span class="gicon">visibility</span> Aperçu</button>
      <button class="btn qz-mini" onclick="qzBanqueDonner('${q.id}')"><span class="gicon">assignment_add</span> Donner à une classe</button>
      ${partage ? `<button class="btn secondary qz-mini" onclick="qzBanqueCopier('${q.id}')"><span class="gicon">content_copy</span> Copier dans mes questionnaires</button>`
        : `<button class="btn secondary qz-mini" onclick="qzBanqueCopier('${q.id}')"><span class="gicon">content_copy</span> Dupliquer</button>
           <button class="btn secondary qz-mini" onclick="qzBanquePartager('${q.id}')"><span class="gicon">share</span> Partager</button>
           <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="qzBanqueSupprimer('${q.id}')"><span class="gicon">delete</span></button>`}
    </div></div>`;
}
function qzBanqueRender(){
  const root = document.getElementById('qzBanqueRoot'); if(!root || !qzB) return;
  const f = qzNormTexte(qzB.filtre || '');
  const garde = q => !f || qzNormTexte((q.titre || '') + ' ' + (q.auteur || '') + ' ' + (q.questions || []).map(x => x.enonce || '').join(' ')).includes(f);
  const liste = (qzB.onglet === 'mes' ? qzB.mes : qzB.partages).filter(garde);
  const interros = (qzB.interros || []).filter(d => !f || qzNormTexte((d.titre || '') + ' ' + (d.classes ? d.classes.nom : '')).includes(f));
  root.innerHTML = `<span class="back-btn" onclick="showView('view-home');setActiveTopnav(null);">← Accueil</span>
    <h1 style="margin:6px 0 4px;"><span class="gicon">quiz</span> Interrogations en ligne</h1>
    <p style="color:var(--ink-soft);max-width:75ch;">Des interrogations notées, à la manière de Google Forms, séparées des devoirs d'entraînement : créez-les, donnez-les à une classe (en classe, chronométrées, ou à la maison), corrigez-les copie par copie ou question par question, puis publiez les résultats. Vos questionnaires et ceux de vos collègues sont réutilisables : donner un questionnaire à une classe en crée une copie, le modifier ensuite ne change rien pour les autres classes.</p>
    <div class="qz-c-tools">
      <div class="qz-tabs"><button class="${qzB.onglet === 'donnees' ? 'on' : ''}" onclick="qzB.onglet='donnees';qzBanqueRender()"><span class="gicon">assignment_turned_in</span> Interrogations données (${(qzB.interros || []).length})</button>
        <button class="${qzB.onglet === 'mes' ? 'on' : ''}" onclick="qzB.onglet='mes';qzBanqueRender()"><span class="gicon">person</span> Mes questionnaires (${qzB.mes.length})</button>
        <button class="${qzB.onglet === 'partages' ? 'on' : ''}" onclick="qzB.onglet='partages';qzBanqueRender()"><span class="gicon">group</span> Partagés avec moi (${qzB.partages.length})</button></div>
      <input type="search" class="qz-b-search" placeholder="Rechercher (titre, énoncé, auteur)…" value="${qzEsc(qzB.filtre)}" oninput="qzB.filtre=this.value;clearTimeout(qzB.t);qzB.t=setTimeout(()=>{qzBanqueRender();const i=document.querySelector('.qz-b-search');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},250)">
      <button class="btn secondary" onclick="qzOuvrirCarnet()"><span class="gicon">menu_book</span> Carnet de notes</button>
      <button class="btn" onclick="qzBanqueNouveau()"><span class="gicon">add</span> Nouvelle interrogation</button>
    </div>
    ${qzB.onglet === 'donnees' ? qzInterrosHtml(interros) : `<div class="qz-b-grid">${liste.map(q => qzBanqueCarte(q, qzB.onglet !== 'mes')).join('') || `<p class="hint">${qzB.onglet === 'mes' ? (f ? 'Aucun questionnaire ne correspond.' : 'Aucun questionnaire pour l\'instant : créez-en un avec « Nouvelle interrogation ».') : 'Aucun questionnaire partagé avec vous pour l\'instant.'}</p>`}</div>`}`;
}
function qzBanqueTrouver(id){ return qzB && (qzB.mes.find(q => q.id === id) || qzB.partages.find(q => q.id === id)); }
async function qzBanqueSur(id){
  let q = qzBanqueTrouver(id);
  if(!q){ try{ await qzBanqueCharger(); }catch(e){} q = qzBanqueTrouver(id); }
  if(!q){ const { data } = await sb.from('questionnaires').select('*').eq('id', id).maybeSingle(); q = data; }
  return q;
}
async function qzBanqueApercu(id){
  const q = await qzBanqueSur(id); if(!q) return;
  showView('view-questionnaire');
  qzPInit({ devoir: { id: 'apercu', titre: q.titre || 'Questionnaire', consigne: '', publie: false }, reglages: q.reglages || {},
    questions: qzPreparer(JSON.parse(JSON.stringify(q.questions || []))), copie: null }, true);
  qzP.retourBanque = true;
}
// Ouvre le formulaire « Nouvelle interrogation » avec une COPIE du questionnaire.
async function qzBanqueDonner(id){
  const q = await qzBanqueSur(id);
  if(!q){ await niceAlert('Questionnaire introuvable.'); return; }
  await qzFormOuvrir({ copieDe: q });
}
function qzBanqueNouveau(){ return qzFormOuvrir(); }
async function qzBanqueCopier(id){
  const q = await qzBanqueSur(id); if(!q) return;
  const partage = q.teacher_id ? q.teacher_id !== currentUser.id : !!q.auteur;
  const titre = partage ? q.titre : 'Copie de ' + (q.titre || 'questionnaire');
  const { error } = await sb.from('questionnaires').insert({ teacher_id: currentUser.id, titre,
    questions: JSON.parse(JSON.stringify(q.questions || [])), reglages: Object.assign({}, q.reglages || {}, { ferme: false }) });
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  await qzBanqueCharger(); qzB.onglet = 'mes'; qzBanqueRender();
  await niceAlert(partage ? `« ${titre} » est copié dans vos questionnaires : vous pouvez le modifier et le donner à vos classes.` : `« ${titre} » a été créé.`);
}
async function qzBanqueSupprimer(id){
  const q = qzBanqueTrouver(id); if(!q) return;
  const dv = qzB.devoirs.get(id) || [];
  if(dv.length){ await niceAlert(`Ce questionnaire est utilisé par ${dv.length > 1 ? dv.length + ' interrogations' : 'l\'interrogation « ' + dv[0].titre + ' »'} : supprimez d'abord ${dv.length > 1 ? 'ces interrogations' : 'cette interrogation'} (onglet « Interrogations données », avec les copies des élèves), ou gardez-le.`); return; }
  if(!(await niceConfirm(`Supprimer définitivement « ${q.titre || 'Sans titre'} » ?`))) return;
  const { error } = await sb.from('questionnaires').delete().eq('id', id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  await qzBanqueCharger(); qzBanqueRender();
}

/* ---------------------------------------------------------------------
   Partage avec des collègues
   --------------------------------------------------------------------- */
let qzBP = null; // { id, etab, profs:Map(id→{nom,prenom}), collegues:[] }
async function qzBanquePartager(id){
  const q = qzBanqueTrouver(id); if(!q) return;
  const [{ data: collegues }, { data: choisis }] = await Promise.all([
    sb.rpc('qz_collegues'),
    (q.partage_profs || []).length ? sb.rpc('qz_profs', { p_email: null, p_ids: q.partage_profs }) : Promise.resolve({ data: [] }),
  ]);
  qzBP = { id, etab: !!q.partage_etab, collegues: collegues || [], profs: new Map((choisis || []).map(p => [p.id, p])) };
  let o = document.getElementById('qzBPOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'qzBPOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', e => { if(e.target === o) o.style.display = 'none'; }); }
  o.style.display = 'flex';
  qzBPRender();
}
function qzBPRender(){
  const o = document.getElementById('qzBPOverlay'), q = qzBanqueTrouver(qzBP.id); if(!o || !q) return;
  const nom = p => qzEsc(((p.prenom || '') + ' ' + (p.nom || '')).trim() || '(sans nom)');
  const autres = Array.from(qzBP.profs.values()).filter(p => !qzBP.collegues.some(c => c.id === p.id));
  o.innerHTML = `<div class="modal-card qz-gen">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#6B3FA0;vertical-align:middle;">share</span> Partager « ${qzEsc(q.titre || 'Sans titre')} »</b>
      <button class="modal-close" onclick="document.getElementById('qzBPOverlay').style.display='none'"><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:6px 0 12px;">Vos collègues pourront le consulter, le copier, le donner à leurs classes et en importer des questions, corrigés compris. Ils ne pourront jamais modifier le vôtre, ni voir vos élèves ou leurs copies.</p>
    <label class="qz-check" style="font-weight:600;"><input type="checkbox" ${qzBP.etab ? 'checked' : ''} onchange="qzBP.etab=this.checked"> Tous les professeurs de mon établissement</label>
    <p class="qz-lab" style="margin-top:12px;">Ou des collègues choisis</p>
    <div class="qz-bp-list">${qzBP.collegues.map(c => `<label class="qz-check"><input type="checkbox" ${qzBP.profs.has(c.id) ? 'checked' : ''} onchange="qzBPToggle('${c.id}',this.checked)"> ${nom(c)}</label>`).join('') || '<span class="hint" style="margin:0;">Aucun autre professeur inscrit dans votre établissement.</span>'}
      ${autres.map(p => `<label class="qz-check"><input type="checkbox" checked onchange="qzBPToggle('${p.id}',this.checked)"> ${nom(p)} <span class="hint" style="margin:0;">(autre établissement)</span></label>`).join('')}</div>
    <p class="qz-lab" style="margin-top:12px;">Un professeur d'un autre établissement</p>
    <div class="tool-row" style="margin:0;"><input type="email" id="qzBPEmail" placeholder="son adresse e-mail (celle de son compte)" style="flex:1;min-width:200px;padding:6px 8px;border:1px solid rgba(28,43,57,.2);border-radius:8px;">
      <button class="btn secondary qz-mini" onclick="qzBPChercher()"><span class="gicon">person_add</span> Ajouter</button></div>
    <span id="qzBPStatus" class="hint" style="margin:4px 0 0;display:block;"></span>
    <div style="display:flex;gap:8px;margin-top:14px;"><button class="btn" onclick="qzBPEnregistrer()"><span class="gicon">check</span> Enregistrer le partage</button></div>
  </div>`;
}
function qzBPToggle(id, on){
  if(on){ const c = qzBP.collegues.find(x => x.id === id) || qzBP.profs.get(id) || { id }; qzBP.profs.set(id, c); }
  else qzBP.profs.delete(id);
}
async function qzBPChercher(){
  const email = document.getElementById('qzBPEmail').value.trim(), st = document.getElementById('qzBPStatus');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ st.textContent = 'Adresse e-mail invalide.'; return; }
  const { data, error } = await sb.rpc('qz_profs', { p_email: email, p_ids: null });
  if(error){ st.textContent = 'Erreur : ' + error.message; return; }
  if(!data || !data.length){ st.textContent = 'Aucun compte professeur validé avec cette adresse.'; return; }
  qzBP.profs.set(data[0].id, data[0]);
  qzBPRender();
  document.getElementById('qzBPStatus').textContent = '✓ ' + ((data[0].prenom || '') + ' ' + (data[0].nom || '')).trim() + ' ajouté(e).';
}
async function qzBPEnregistrer(){
  const profs = Array.from(qzBP.profs.keys());
  const { error } = await sb.from('questionnaires').update({ partage_etab: qzBP.etab, partage_profs: profs }).eq('id', qzBP.id);
  if(error){ document.getElementById('qzBPStatus').textContent = 'Erreur : ' + error.message; return; }
  document.getElementById('qzBPOverlay').style.display = 'none';
  await qzBanqueCharger(); qzBanqueRender();
}

/* ---------------------------------------------------------------------
   Banque de questions : importer dans l'éditeur
   --------------------------------------------------------------------- */
let qzBI = null; // { lignes:[{q, source, auteur}], choix:Set, filtre, type, comp }
async function qzImporterOuvrir(){
  let o = document.getElementById('qzBIOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'qzBIOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', e => { if(e.target === o) o.style.display = 'none'; }); }
  o.innerHTML = '<div class="modal-card qz-bi"><p class="hint">Chargement de la banque de questions…</p></div>';
  o.style.display = 'flex';
  try{ await qzBanqueCharger(); }catch(e){ o.innerHTML = `<div class="modal-card qz-bi"><p class="hint">Erreur : ${qzEsc(e.message)}</p></div>`; return; }
  const lignes = [];
  const courant = qzEd && qzEd.id;
  qzB.mes.filter(q => q.id !== courant).forEach(q => (q.questions || []).forEach(x => lignes.push({ q: x, source: q.titre || 'Sans titre', auteur: '' })));
  qzB.partages.forEach(q => (q.questions || []).forEach(x => lignes.push({ q: x, source: q.titre || 'Sans titre', auteur: q.auteur })));
  qzBI = { lignes, choix: new Set(), filtre: '', type: '', comp: '' };
  qzImporterRender();
}
function qzImporterRender(){
  const o = document.getElementById('qzBIOverlay'); if(!o || !qzBI) return;
  const f = qzNormTexte(qzBI.filtre);
  const vis = qzBI.lignes.map((l, i) => ({ l, i })).filter(({ l }) => (!qzBI.type || l.q.type === qzBI.type) && (!qzBI.comp || l.q.competence === qzBI.comp)
    && (!f || qzNormTexte((l.q.enonce || '') + ' ' + (l.q.trous_source || '') + ' ' + l.source + ' ' + l.auteur).includes(f)));
  const types = Array.from(new Set(qzBI.lignes.map(l => l.q.type)));
  o.innerHTML = `<div class="modal-card qz-bi">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#6B3FA0;vertical-align:middle;">inventory_2</span> Banque de questions</b>
      <button class="modal-close" onclick="document.getElementById('qzBIOverlay').style.display='none'"><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:4px 0 10px;">Les questions de vos questionnaires et de ceux partagés avec vous. Cochez-les puis importez : elles sont copiées dans ce questionnaire (réponses, barème et éléments d'énoncé compris), et restent modifiables.</p>
    <div class="qz-bi-filtres">
      <input type="search" id="qzBIF" placeholder="Rechercher…" value="${qzEsc(qzBI.filtre)}" oninput="qzBI.filtre=this.value;clearTimeout(qzBI.t);qzBI.t=setTimeout(()=>{qzImporterRender();const i=document.getElementById('qzBIF');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},250)">
      <select onchange="qzBI.type=this.value;qzImporterRender()"><option value="">Tous les types</option>${types.map(t => `<option value="${t}"${qzBI.type === t ? ' selected' : ''}>${qzType(t).label}</option>`).join('')}</select>
      <select onchange="qzBI.comp=this.value;qzImporterRender()"><option value="">Toutes les compétences</option>${QZ_COMPETENCES.map(c => `<option value="${c.id}"${qzBI.comp === c.id ? ' selected' : ''}>${c.label}</option>`).join('')}</select>
    </div>
    <div class="qz-bi-liste">${vis.map(({ l, i }) => { const comp = qzComp(l.q.competence);
      return `<label class="qz-bi-row${qzBI.choix.has(i) ? ' on' : ''}"><input type="checkbox" ${qzBI.choix.has(i) ? 'checked' : ''} onchange="qzBIChoix(${i},this.checked)">
        <div class="qz-bi-main"><div class="qz-bi-meta"><span class="qz-type-pill"><span class="gicon">${qzType(l.q.type).icon}</span> ${qzType(l.q.type).label}</span>
          ${comp ? `<span class="qz-comp" style="--c:${comp.color}">${comp.label}</span>` : ''}${l.q.type !== 'texte' ? `<span class="hint" style="margin:0;">${qzNum(qzMax(l.q))} pt${qzMax(l.q) > 1 ? 's' : ''}</span>` : ''}
          <span class="hint" style="margin:0;">· ${qzEsc(l.source)}${l.auteur ? ' (' + qzEsc(l.auteur) + ')' : ''}</span></div>
          <div class="qz-bi-enonce">${qzEdResume(l.q.type === 'trous' && !l.q.enonce ? Object.assign({}, l.q, { enonce: l.q.trous_source }) : l.q)}</div></div></label>`; }).join('')
      || `<p class="hint">${qzBI.lignes.length ? 'Aucune question ne correspond.' : 'La banque est vide : vos questions y apparaîtront dès que vous aurez enregistré un questionnaire.'}</p>`}</div>
    <div style="display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap;">
      <button class="btn" ${qzBI.choix.size ? '' : 'disabled'} onclick="qzImporter()"><span class="gicon">download</span> Importer ${qzBI.choix.size ? qzBI.choix.size + ' question' + (qzBI.choix.size > 1 ? 's' : '') : ''}</button>
      ${vis.length ? `<button class="btn secondary qz-mini" onclick="qzBIToutes()">Tout cocher (${vis.length})</button>` : ''}
    </div></div>`;
}
function qzBIChoix(i, on){ if(on) qzBI.choix.add(i); else qzBI.choix.delete(i); qzImporterRender(); }
function qzBIToutes(){
  const f = qzNormTexte(qzBI.filtre);
  qzBI.lignes.forEach((l, i) => { if((!qzBI.type || l.q.type === qzBI.type) && (!qzBI.comp || l.q.competence === qzBI.comp)
    && (!f || qzNormTexte((l.q.enonce || '') + ' ' + (l.q.trous_source || '') + ' ' + l.source + ' ' + l.auteur).includes(f))) qzBI.choix.add(i); });
  qzImporterRender();
}
function qzImporter(){
  if(!qzEd) qzEdReset();
  const nouvelles = Array.from(qzBI.choix).sort((a, b) => a - b).map(i => Object.assign(JSON.parse(JSON.stringify(qzBI.lignes[i].q)), { id: qzId() }));
  qzEd.questions.push(...nouvelles);
  qzEdOuverte = null;
  qzEdRender();
  document.getElementById('qzBIOverlay').style.display = 'none';
  niceAlert(`${nouvelles.length} question${nouvelles.length > 1 ? 's importées' : ' importée'}. Vous pouvez les modifier : l'original n'est pas touché.`);
}
(function qzbStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #qzBanqueRoot{max-width:1100px;}
    .qz-b-search{flex:1;min-width:200px;padding:7px 10px;border:1px solid rgba(28,43,57,.2);border-radius:10px;font:inherit;}
    .qz-b-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:12px;}
    .qz-b-card{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:14px;padding:14px;box-shadow:0 2px 8px rgba(28,43,57,.04);display:flex;flex-direction:column;gap:6px;}
    .qz-b-head{display:flex;justify-content:space-between;gap:8px;align-items:flex-start;}
    .qz-b-share{flex:none;display:inline-flex;align-items:center;gap:4px;background:#EAF6EC;color:#1E7B34;border-radius:999px;padding:2px 9px;font-size:.72rem;font-weight:700;}
    .qz-b-share .gicon{font-size:15px;}
    .qz-b-types{display:flex;flex-wrap:wrap;gap:4px;}
    .qz-b-act{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:6px;}
    .qz-bp-list{display:flex;flex-direction:column;gap:4px;max-height:220px;overflow-y:auto;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:8px;}
    .qz-bi{max-width:760px;width:100%;}
    .qz-bi-filtres{display:flex;gap:8px;flex-wrap:wrap;}
    .qz-bi-filtres input{flex:1;min-width:160px;padding:6px 9px;border:1px solid rgba(28,43,57,.2);border-radius:8px;font:inherit;}
    .qz-bi-filtres select{padding:6px;border:1px solid rgba(28,43,57,.2);border-radius:8px;}
    .qz-bi-liste{display:flex;flex-direction:column;gap:6px;max-height:52vh;overflow-y:auto;margin-top:10px;padding-right:4px;}
    .qz-bi-row{display:flex;gap:10px;align-items:flex-start;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:8px 10px;cursor:pointer;background:#fff;}
    .qz-bi-row.on{border-color:#6B3FA0;background:#F4EFFA;}
    .qz-bi-row input{margin-top:4px;accent-color:#6B3FA0;}
    .qz-bi-main{flex:1;min-width:0;}
    .qz-bi-meta{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:3px;}
    .qz-bi-enonce{font-size:.9rem;}
  `;
  document.head.appendChild(st);
})();

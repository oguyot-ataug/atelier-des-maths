/* =====================================================================
   questionnaires-interros.js -- Interrogations en ligne : page à part, séparée des devoirs

   Demandé : "Je pense qu'il y a confusion entre devoirs et questionnaire. Je préfère que
   questionnaire (interro en ligne) soit séparé de l'attribution de devoirs type automatismes et
   objectif nombre."
   - Formulaire propre (#view-qz-form) : titre, classe, toute la classe ou élèves choisis, date
     d'ouverture, date limite, consigne, puis l'éditeur de questionnaire.
   - Onglet « Interrogations données » de la page Interrogations en ligne : état (brouillon,
     programmée, ouverte, fermée, résultats publiés), copies rendues, à corriger ; Corriger,
     Modifier, Réutiliser, Supprimer.
   - Sauvegarde automatique -- signalé : "il manque une sauvegarde. On perd tout si on ne partage
     pas tout de suite". Un nouveau questionnaire est enregistré tout seul (quelques secondes après
     chaque modification) comme brouillon dans « Mes questionnaires », avec la classe, les dates et
     la consigne déjà choisies ; « Reprendre » le rouvre là où on l'avait laissé. Une interrogation
     déjà donnée n'est PAS modifiée en direct (les élèves la voient) : copie de secours sur
     l'appareil, proposée à la réouverture, jusqu'à « Enregistrer les modifications ».
   Techniquement, une interrogation reste une ligne de la table devoirs (type « questionnaire ») :
   les élèves la reçoivent comme avant, dans une section à part de « Mes devoirs ».
   ===================================================================== */

let qzF = null; // { devoirId, cible:'classe'|'eleves', eleves:Set }

function qzFormHtml(){
  const classes = accountClassesList || [];
  return `<span class="back-btn" onclick="qzFormFermer()">← Interrogations en ligne</span>
    <h1 style="margin:6px 0 4px;" id="qzfTitreH"><span class="gicon">quiz</span> Nouvelle interrogation</h1>
    <p class="qz-auto" id="qzfAuto"><span class="gicon">cloud</span> Enregistrement automatique : le brouillon est gardé dans « Mes questionnaires » dès la première question.</p>
    <div class="tool-shell qz-f">
      <div class="qz-f-grid">
        <label class="qz-f-full">Titre <input type="text" id="qzfTitre" placeholder="ex. Interro n°3 : les fractions"></label>
        <label>Classe <select id="qzfClasse" onchange="qzF.eleves=new Set();qzFormCible()">${classes.map(c => `<option value="${c.id}">${qzEsc(c.label)}</option>`).join('') || '<option value="">Aucune classe</option>'}</select></label>
        <label>Ouverture <input type="date" id="qzfOuverture" title="Tant qu'aucune date n'est choisie, l'interrogation reste un brouillon invisible aux élèves"></label>
        <label><span>Date limite <span style="font-weight:400;color:var(--ink-soft);">(facultative)</span></span><input type="date" id="qzfLimite"></label>
      </div>
      <p class="hint" style="margin:4px 0 10px;">Sans date d'ouverture, l'interrogation reste un brouillon invisible aux élèves. Choisissez aujourd'hui pour l'ouvrir tout de suite (en classe, vous pouvez aussi la fermer à tout moment depuis la correction).</p>
      <div class="tool-row" id="qzfCibleMode" style="margin:0 0 6px;"></div>
      <div id="qzfEleves" style="display:none;"></div>
      <p class="hint" style="margin:8px 0 0;font-weight:700;">Consigne</p>
      <textarea id="qzfConsigne" rows="2" placeholder="Consigne (facultatif), ex. Calculatrice interdite. Justifiez vos réponses." style="width:100%;box-sizing:border-box;margin-top:6px;padding:8px;border-radius:8px;border:1px solid rgba(28,43,57,.2);font:inherit;"></textarea>
    </div>
    <div class="tool-shell"><p class="example-title" style="margin:0 0 6px;"><span class="gicon" style="color:#6B3FA0;">edit_note</span> Les questions</p><div id="qzfEditeur"></div></div>
    <div class="tool-row" style="margin:0 0 30px;">
      <button class="btn" id="qzfDonner" onclick="qzFormEnregistrer()"><span class="gicon">send</span> Donner à la classe</button>
      <button class="btn secondary" id="qzfSauver" onclick="qzEnregistrerSeul()" title="Enregistrer maintenant dans « Mes questionnaires », sans le donner (c'est aussi fait automatiquement)"><span class="gicon">save</span> Enregistrer sans donner</button>
      <button class="btn secondary" id="qzfFermer" onclick="qzFormFermer()">Fermer (le brouillon est gardé)</button>
      <span class="hint" id="qzfStatus" style="margin:0;"></span>
    </div>`;
}
function qzFormCible(){
  const box = document.getElementById('qzfCibleMode'); if(!box || !qzF) return;
  box.innerHTML = `<button type="button" class="btn secondary${qzF.cible === 'classe' ? ' active' : ''}" onclick="qzF.cible='classe';qzFormCible()"><span class="gicon">groups</span> Toute la classe</button>
    <button type="button" class="btn secondary${qzF.cible === 'eleves' ? ' active' : ''}" onclick="qzF.cible='eleves';qzFormCible()"><span class="gicon">person</span> Élèves choisis</button>`;
  const el = document.getElementById('qzfEleves');
  el.style.display = qzF.cible === 'eleves' ? 'block' : 'none';
  if(qzF.cible !== 'eleves') return;
  const classId = document.getElementById('qzfClasse').value;
  el.innerHTML = '<p class="hint">Chargement…</p>';
  qzElevesDevoir({ class_id: classId }).then(eleves => {
    el.innerHTML = `<div class="qz-bp-list">${eleves.map(e => `<label class="qz-check"><input type="checkbox" ${qzF.eleves.has(e.id) ? 'checked' : ''} onchange="this.checked?qzF.eleves.add('${e.id}'):qzF.eleves.delete('${e.id}')"> ${qzEsc(e.label)}</label>`).join('') || '<span class="hint" style="margin:0;">Aucun élève dans cette classe.</span>'}</div>`;
  });
}
// Ouvre le formulaire : vide, avec une copie d'un questionnaire (copieDe), un brouillon ou un
// questionnaire pas encore donné (questionnaire : modifié sur place), ou une interrogation déjà donnée (devoirId).
async function qzFormOuvrir(opts){
  opts = opts || {};
  await qzAutoArreter(true);
  showView('view-qz-form'); setActiveTopnav('questionnaires');
  const root = document.getElementById('qzFormRoot');
  root.innerHTML = qzFormHtml();
  qzF = { devoirId: null, cible: 'classe', eleves: new Set() };
  qzEdReset();
  const box = document.getElementById('qzfEditeur'); delete box.dataset.monte;
  const $ = id => document.getElementById(id);
  if(opts.devoirId){
    const { data: d, error } = await sb.from('devoirs').select('*').eq('id', opts.devoirId).single();
    if(error || !d){ await niceAlert('Interrogation introuvable.'); return qzBanqueOuvrir(); }
    qzF.devoirId = d.id;
    await qzEdCharger(d.questionnaire_id);
    $('qzfTitreH').innerHTML = '<span class="gicon">edit</span> Modifier l\'interrogation';
    $('qzfDonner').innerHTML = '<span class="gicon">check</span> Enregistrer les modifications';
    $('qzfFermer').textContent = 'Annuler les modifications';
    $('qzfSauver').style.display = 'none';
    $('qzfTitre').value = d.titre || '';
    $('qzfClasse').value = d.class_id;
    $('qzfOuverture').value = d.date_depot ? d.date_depot.slice(0, 10) : '';
    $('qzfLimite').value = d.date_limite ? d.date_limite.slice(0, 10) : '';
    $('qzfConsigne').value = d.consigne === 'Répondez aux questions.' ? '' : (d.consigne || '');
    if(d.student_ids && d.student_ids.length){ qzF.cible = 'eleves'; qzF.eleves = new Set(d.student_ids); }
    const { count } = await sb.from('qz_copies').select('id', { count: 'exact', head: true }).eq('devoir_id', d.id);
    if(count) $('qzfStatus').innerHTML = `<b style="color:#B8511F;">${count} élève${count > 1 ? 's ont' : ' a'} déjà commencé :</b> modifier les réponses attendues ou le barème change leur note.`;
    // Copie de secours d'une modification non enregistrée (onglet fermé, page quittée...)
    let secours = null; try{ secours = JSON.parse(localStorage.getItem('qzEdit:' + d.id) || 'null'); }catch(e){}
    if(secours && secours.q && JSON.stringify(secours.q) !== JSON.stringify(qzEd.questions)
      && await niceConfirm(`Des modifications de cette interrogation n'ont pas été enregistrées (le ${new Date(secours.at).toLocaleString('fr-FR')}). Les reprendre ?`)){
      qzEd.questions = secours.q; qzEd.reglages = Object.assign({}, qzEd.reglages, secours.r || {});
      if(secours.t) $('qzfTitre').value = secours.t;
    }
  } else if(opts.questionnaire){
    const q = opts.questionnaire, reg = Object.assign({}, QZ_REGLAGES_DEFAUT, q.reglages || {}), b = reg.brouillon || {};
    delete reg.brouillon;
    qzEd = { id: q.id, questions: JSON.parse(JSON.stringify(q.questions || [])), reglages: reg };
    $('qzfTitre').value = q.titre === 'Sans titre' ? '' : (q.titre || '');
    if(b.classe && (accountClassesList || []).some(c => c.id === b.classe)) $('qzfClasse').value = b.classe;
    $('qzfOuverture').value = b.ouverture || ''; $('qzfLimite').value = b.limite || ''; $('qzfConsigne').value = b.consigne || '';
    if(b.eleves && b.eleves.length){ qzF.cible = 'eleves'; qzF.eleves = new Set(b.eleves); }
    $('qzfAuto').innerHTML = `<span class="gicon">cloud_done</span> Brouillon repris (enregistré le ${new Date(q.updated_at || Date.now()).toLocaleString('fr-FR')}) : les modifications sont enregistrées automatiquement.`;
  } else if(opts.copieDe){
    const q = opts.copieDe, reg = Object.assign({}, QZ_REGLAGES_DEFAUT, q.reglages || {}, { ferme: false });
    delete reg.brouillon;
    qzEd = { id: null, questions: JSON.parse(JSON.stringify(q.questions || [])), reglages: reg };
    $('qzfTitre').value = q.titre || '';
    $('qzfStatus').textContent = `Questionnaire « ${q.titre || 'Sans titre'} » chargé (copie) : choisissez la classe et la date d'ouverture, adaptez-le si besoin.`;
  }
  qzFormCible();
  qzEdMonter();
  window.scrollTo(0, 0);
  qzAutoDemarrer(qzF.devoirId ? 'local' : 'db');
}
function qzFormModifier(devoirId){ return qzFormOuvrir({ devoirId }); }
async function qzFormFermer(){
  const a = qzAuto;
  if(a && a.mode === 'local'){
    if(qzAutoEtat() !== a.base && !(await niceConfirm('Les modifications de cette interrogation ne sont pas enregistrées. Les abandonner ?'))) return;
    try{ localStorage.removeItem(a.cle); }catch(e){}
    await qzAutoArreter(false);
  }
  qzBanqueOuvrir(); // enregistre d'abord le brouillon en cours (qzAutoArreter)
}

/* ---------------------------------------------------------------------
   Sauvegarde automatique
   --------------------------------------------------------------------- */
let qzAuto = null; // { mode:'db'|'local', cle, dernier, base, timer, enCours:Promise|null }
function qzAutoForm(){
  const v = id => ((document.getElementById(id) || {}).value || '').trim();
  return { titre: v('qzfTitre'), classe: v('qzfClasse'), ouverture: v('qzfOuverture'), limite: v('qzfLimite'), consigne: v('qzfConsigne'),
    eleves: qzF && qzF.cible === 'eleves' ? Array.from(qzF.eleves) : [] };
}
function qzAutoEtat(){ return JSON.stringify({ f: qzAutoForm(), q: qzEd ? qzEd.questions : [], r: qzEd ? qzEd.reglages : {} }); }
function qzAutoDemarrer(mode){
  const etat = qzAutoEtat();
  qzAuto = { mode, cle: qzF && qzF.devoirId ? 'qzEdit:' + qzF.devoirId : null, dernier: etat, base: etat, timer: setInterval(qzAutoTick, 2000), enCours: null };
}
// Arrête la sauvegarde automatique ; enregistre d'abord ce qui ne l'est pas encore si demandé.
async function qzAutoArreter(flush){
  const a = qzAuto; if(!a) return;
  clearInterval(a.timer);
  if(a.enCours) await a.enCours;
  if(flush && qzAutoEtat() !== a.dernier) await qzAutoSauver(a);
  if(qzAuto === a) qzAuto = null;
}
async function qzAutoTick(){
  const a = qzAuto; if(!a || a.enCours) return;
  const surPage = ['view-qz-form', 'view-questionnaire'].some(id => { const v = document.getElementById(id); return v && v.classList.contains('active'); });
  if(qzAutoEtat() !== a.dernier) await qzAutoSauver(a);
  if(!surPage && qzAuto === a && !a.enCours){ clearInterval(a.timer); qzAuto = null; } // page quittée par le menu : dernier enregistrement fait
}
function qzAutoInfo(html){ const el = document.getElementById('qzfAuto'); if(el) el.innerHTML = html; }
function qzAutoSauver(a){
  const etat = qzAutoEtat(), heure = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const f = qzAutoForm();
  if(a.mode === 'local'){
    try{ localStorage.setItem(a.cle, JSON.stringify({ at: Date.now(), t: f.titre, q: qzEd.questions, r: qzEd.reglages })); }catch(e){}
    a.dernier = etat;
    qzAutoInfo(`<span class="gicon" style="color:#B8511F;">edit_note</span> Modifications en cours (copie de secours sur cet appareil à ${heure}) : les élèves voient encore l'ancienne version jusqu'à « Enregistrer les modifications ».`);
    return Promise.resolve();
  }
  if(!qzEd || (!qzEd.questions.length && !f.titre)) return Promise.resolve(); // rien à garder
  const aCompleter = qzEdVerifier().length > 0;
  const row = { titre: f.titre || 'Sans titre', questions: qzEd.questions,
    reglages: Object.assign({}, qzEd.reglages, { brouillon: { classe: f.classe, ouverture: f.ouverture, limite: f.limite, consigne: f.consigne, eleves: f.eleves, a_completer: aCompleter } }),
    updated_at: new Date().toISOString() };
  qzAutoInfo('<span class="gicon">cloud_sync</span> Enregistrement…');
  a.enCours = (async () => {
    const r = qzEd.id ? await sb.from('questionnaires').update(row).eq('id', qzEd.id)
      : await sb.from('questionnaires').insert(Object.assign({ teacher_id: currentUser.id }, row)).select('id').single();
    if(r.error){ qzAutoInfo(`<span class="gicon" style="color:#a83c1f;">cloud_off</span> Enregistrement impossible (${qzEsc(r.error.message)}) : nouvel essai dans quelques secondes.`); return; }
    if(!qzEd.id && r.data) qzEd.id = r.data.id;
    a.dernier = etat;
    qzAutoInfo(`<span class="gicon" style="color:#1E7B34;">cloud_done</span> Brouillon enregistré à ${heure} dans « Mes questionnaires »${aCompleter ? ' (encore incomplet : à terminer avant de le donner)' : ''}.`);
  })().finally(() => { a.enCours = null; });
  return a.enCours;
}
window.addEventListener('beforeunload', ev => {
  if(!qzAuto) return;
  if(qzAuto.mode === 'db' ? qzAutoEtat() !== qzAuto.dernier || qzAuto.enCours : qzAutoEtat() !== qzAuto.base){ ev.preventDefault(); ev.returnValue = ''; }
});

async function qzFormEnregistrer(){
  const st = document.getElementById('qzfStatus');
  const titre = document.getElementById('qzfTitre').value.trim();
  const classId = document.getElementById('qzfClasse').value;
  const ouv = document.getElementById('qzfOuverture').value, lim = document.getElementById('qzfLimite').value;
  if(!titre || !classId){ st.textContent = 'Le titre et la classe sont nécessaires.'; return; }
  if(qzF.cible === 'eleves' && !qzF.eleves.size){ st.textContent = 'Choisissez au moins un élève.'; return; }
  st.textContent = 'Enregistrement…';
  const auto = qzAuto; if(auto){ clearInterval(auto.timer); if(auto.enCours) await auto.enCours; }
  const reprendre = () => { if(auto && qzAuto === auto) auto.timer = setInterval(qzAutoTick, 2000); };
  let questionnaireId;
  try{ questionnaireId = await qzEdEnregistrer(titre); }catch(e){ st.textContent = e.message || String(e); reprendre(); return; }
  const payload = { teacher_id: currentUser.id, class_id: classId, titre, type: 'questionnaire', questionnaire_id: questionnaireId,
    consigne: document.getElementById('qzfConsigne').value.trim() || 'Répondez aux questions.',
    date_depot: ouv ? new Date(ouv).toISOString() : null, date_limite: lim ? new Date(lim).toISOString() : null,
    student_ids: qzF.cible === 'eleves' ? Array.from(qzF.eleves) : null };
  const { error } = qzF.devoirId ? await sb.from('devoirs').update(payload).eq('id', qzF.devoirId) : await sb.from('devoirs').insert(payload);
  if(error){ st.textContent = 'Erreur : ' + error.message; reprendre(); return; }
  if(auto && auto.cle){ try{ localStorage.removeItem(auto.cle); }catch(e){} }
  if(qzAuto === auto) qzAuto = null;
  const nouveau = !qzF.devoirId;
  if(qzB) qzB.onglet = 'donnees';
  await qzBanqueOuvrir();
  await niceAlert(nouveau ? (ouv ? `« ${titre} » est donnée à la classe.` : `« ${titre} » est enregistrée en brouillon : choisissez une date d'ouverture pour la donner.`) : 'Interrogation modifiée.');
}
// Bouton « Enregistrer » de l'éditeur : enregistre tout de suite (même incomplet).
// Signalé : "J'ai pourtant cliqué sur Enregistrer mais rien ne se passe" -- le message s'affichait
// seulement sous le titre, hors de l'écran : confirmation bien visible maintenant (bandeau en bas).
async function qzEnregistrerSeul(){
  if(!qzAuto) qzAutoDemarrer(qzF && qzF.devoirId ? 'local' : 'db');
  if(qzAuto.mode === 'local') return qzFormEnregistrer(); // interrogation déjà donnée
  if(!qzEd.questions.length && !qzAutoForm().titre){ qzToast('Rien à enregistrer pour l\'instant : donnez un titre ou ajoutez une question.', 'warn'); return; }
  if(qzAuto.enCours) await qzAuto.enCours;
  qzAuto.dernier = null; // enregistrer même sans modification
  await qzAutoSauver(qzAuto);
  if(qzAuto && qzAuto.dernier) qzToast(`<span class="gicon">cloud_done</span> « ${qzEsc(qzAutoForm().titre || 'Sans titre')} » est enregistré dans vos questionnaires. Vous le retrouverez sur la page Interrogations en ligne (« Enregistrés, pas encore donnés »).`);
  else qzToast('L\'enregistrement a échoué : vérifiez votre connexion puis réessayez.', 'err');
}
function qzToast(html, genre){
  let t = document.getElementById('qzToast');
  if(!t){ t = document.createElement('div'); t.id = 'qzToast'; document.body.appendChild(t); }
  t.className = 'qz-toast ' + (genre || 'ok'); t.innerHTML = html;
  requestAnimationFrame(() => t.classList.add('on'));
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 5000);
}

/* ---------------------------------------------------------------------
   Onglet « Interrogations données »
   --------------------------------------------------------------------- */
async function qzInterrosCharger(){
  const { data: dv } = await sb.from('devoirs').select('id,titre,class_id,date_depot,date_limite,created_at,student_ids,qz_publie_at,questionnaire_id,classes(nom,niveau)')
    .eq('teacher_id', currentUser.id).eq('type', 'questionnaire').order('created_at', { ascending: false });
  const interros = dv || [], ids = interros.map(d => d.id), classIds = Array.from(new Set(interros.map(d => d.class_id)));
  const [{ data: copies }, { data: cs }] = await Promise.all([
    ids.length ? sb.from('qz_copies').select('devoir_id,statut,deadline_at,reponses,correction').in('devoir_id', ids) : { data: [] },
    classIds.length ? sb.from('class_students').select('class_id').in('class_id', classIds) : { data: [] },
  ]);
  const taille = {}; (cs || []).forEach(r => { taille[r.class_id] = (taille[r.class_id] || 0) + 1; });
  const qzMap = new Map((qzB.mes || []).map(q => [q.id, q]));
  interros.forEach(d => {
    const q = qzMap.get(d.questionnaire_id), cp = (copies || []).filter(c => c.devoir_id === d.id);
    const reg = Object.assign({}, QZ_REGLAGES_DEFAUT, (q && q.reglages) || {});
    d._q = q; d._reg = reg;
    d._total = d.student_ids && d.student_ids.length ? d.student_ids.length : (taille[d.class_id] || 0);
    d._rendues = cp.filter(qzEstRendue).length;
    d._enCours = cp.length - d._rendues;
    d._aCorriger = q ? cp.filter(c => qzEstRendue(c) && qzScoreCopie(q.questions, c, reg).aCorriger).length : 0;
  });
  qzB.interros = interros;
}
function qzInterroEtat(d){
  const now = new Date();
  if(d.qz_publie_at) return { t: 'Résultats publiés', c: 'ok', i: 'visibility' };
  if(d._reg && d._reg.ferme) return { t: 'Fermée', c: 'ferme', i: 'lock' };
  if(!d.date_depot) return { t: 'Brouillon', c: 'brouillon', i: 'edit_note' };
  if(new Date(d.date_depot) > now) return { t: 'Ouverture le ' + new Date(d.date_depot).toLocaleDateString('fr-FR'), c: 'prog', i: 'schedule' };
  return { t: 'Ouverte', c: 'ouverte', i: 'play_circle' };
}
function qzInterrosHtml(liste){
  if(!liste.length) return `<p class="hint">Aucune interrogation pour l'instant : « Nouvelle interrogation » pour en créer une (ou « Donner à une classe » depuis Mes questionnaires).</p>`;
  return `<div class="qz-i-liste">${liste.map(d => { const e = qzInterroEtat(d), r = d._reg || QZ_REGLAGES_DEFAUT;
    return `<div class="qz-i-row">
      <div class="qz-i-main"><b>${qzEsc(d.titre)}</b>
        <div class="hint" style="margin:2px 0 0;">${qzEsc(d.classes ? d.classes.nom : '')}${d.student_ids && d.student_ids.length ? ` · ${d.student_ids.length} élève${d.student_ids.length > 1 ? 's' : ''} choisi${d.student_ids.length > 1 ? 's' : ''}` : ''} · ${r.mode === 'classe' ? 'en classe, ' + r.duree + ' min' : 'à la maison'}${d.date_limite ? ' · limite le ' + new Date(d.date_limite).toLocaleDateString('fr-FR') : ''}</div></div>
      <span class="qz-i-etat ${e.c}"><span class="gicon">${e.i}</span> ${e.t}</span>
      <span class="qz-i-stat" title="Copies rendues"><b>${d._rendues}</b>/${d._total} rendue${d._rendues > 1 ? 's' : ''}${d._enCours ? ` · ${d._enCours} en cours` : ''}</span>
      <span class="qz-i-stat${d._aCorriger ? ' warn' : ''}">${d._aCorriger ? `<b>${d._aCorriger}</b> à corriger` : d._rendues ? '✓ corrigé' : ''}</span>
      <span class="qz-i-act">
        <button class="btn qz-mini" onclick="qzOuvrirCorrection('${d.id}')"><span class="gicon">fact_check</span> Corriger</button>
        <button class="btn secondary qz-mini" onclick="qzFormModifier('${d.id}')" title="Modifier"><span class="gicon">edit</span></button>
        ${d.questionnaire_id ? `<button class="btn secondary qz-mini" onclick="qzBanqueDonner('${d.questionnaire_id}')" title="Donner une copie à une autre classe"><span class="gicon">content_copy</span></button>` : ''}
        <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="qzInterroSupprimer('${d.id}')" title="Supprimer"><span class="gicon">delete</span></button>
      </span></div>`; }).join('')}</div>`;
}
// Questionnaires enregistrés mais jamais donnés (brouillons), en tête de la page -- signalé : "Il
// faut absolument que les interrogations sauvegardées soient visibles".
function qzBrouillonsHtml(f){
  const liste = (qzB.mes || []).filter(q => !(qzB.devoirs.get(q.id) || []).length)
    .filter(q => !f || qzNormTexte((q.titre || '') + ' ' + (q.questions || []).map(x => x.enonce || '').join(' ')).includes(f));
  if(!liste.length) return '';
  return `<p class="qz-i-sec"><span class="gicon">save</span> Enregistrés, pas encore donnés (${liste.length})</p>
    <div class="qz-i-liste" style="margin-bottom:18px;">${liste.map(q => { const r = qzBanqueResume(q), b = (q.reglages || {}).brouillon;
      return `<div class="qz-i-row brouillon">
        <div class="qz-i-main"><b>${qzEsc(q.titre || 'Sans titre')}</b>${b && b.a_completer ? ' <span class="qz-b-draft inc">à compléter</span>' : ''}
          <div class="hint" style="margin:2px 0 0;">${r.n} question${r.n > 1 ? 's' : ''} · ${qzNum(r.pts)} pts · enregistré le ${new Date(q.updated_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</div></div>
        <span class="qz-i-act">
          <button class="btn qz-mini" onclick="qzBanqueReprendre('${q.id}')"><span class="gicon">edit</span> Reprendre</button>
          <button class="btn secondary qz-mini" onclick="qzBanqueDonner('${q.id}')"><span class="gicon">assignment_add</span> Donner à une classe</button>
          <button class="btn secondary qz-mini" onclick="qzBanqueApercu('${q.id}')" title="Aperçu"><span class="gicon">visibility</span></button>
          <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="qzBanqueSupprimer('${q.id}')" title="Supprimer"><span class="gicon">delete</span></button>
        </span></div>`; }).join('')}</div>
    <p class="qz-i-sec"><span class="gicon">assignment_turned_in</span> Données à une classe</p>`;
}
async function qzInterroSupprimer(id){
  const d = (qzB.interros || []).find(x => x.id === id); if(!d) return;
  if(!(await niceConfirm(`Supprimer l'interrogation « ${d.titre} » et toutes les copies des élèves ? Le questionnaire reste dans « Mes questionnaires ».`))) return;
  const { error: e1 } = await sb.from('devoirs_rendus').delete().eq('devoir_id', id);
  const { error: e2 } = e1 ? { error: e1 } : await sb.from('devoirs').delete().eq('id', id);
  if(e2){ await niceAlert('Erreur : ' + e2.message); return; }
  await qzBanqueOuvrir();
}

(function qziStyles2(){
  const st = document.createElement('style');
  st.textContent = `
    #qzFormRoot{max-width:1000px;}
    .qz-auto{display:flex;align-items:center;gap:6px;margin:0 0 10px;font-size:.84rem;color:var(--ink-soft);}
    .qz-auto .gicon{font-size:18px;}
    .qz-f-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px 14px;}
    .qz-f-grid label{display:flex;flex-direction:column;gap:4px;font-size:.84rem;font-weight:600;}
    .qz-f-grid .qz-f-full{grid-column:1/-1;}
    .qz-f-grid input,.qz-f-grid select{padding:7px 9px;border:1px solid rgba(28,43,57,.2);border-radius:8px;font:inherit;font-weight:400;}
    .qz-i-liste{display:flex;flex-direction:column;gap:8px;}
    .qz-i-sec{display:flex;align-items:center;gap:6px;font-family:'Space Grotesk',sans-serif;font-weight:700;margin:6px 0 8px;}
    .qz-i-row.brouillon{border-left-color:#0C5BA0;border-style:dashed;border-left-style:solid;}
    .qz-toast{position:fixed;left:50%;bottom:18px;transform:translate(-50%,30px);opacity:0;pointer-events:none;transition:.25s;z-index:900;max-width:min(560px,calc(100vw - 32px));
      background:#1E7B34;color:#fff;border-radius:12px;padding:10px 16px;box-shadow:0 8px 24px rgba(0,0,0,.18);display:flex;gap:8px;align-items:center;font-size:.9rem;}
    .qz-toast.on{opacity:1;transform:translate(-50%,0);} .qz-toast.warn{background:#B8511F;} .qz-toast.err{background:#a83c1f;}
    .qz-i-row{display:flex;align-items:center;gap:10px 14px;flex-wrap:wrap;background:#fff;border:1px solid rgba(28,43,57,.1);border-left:4px solid #6B3FA0;border-radius:12px;padding:10px 14px;}
    .qz-i-main{flex:1;min-width:200px;}
    .qz-i-etat{display:inline-flex;align-items:center;gap:4px;border-radius:999px;padding:3px 10px;font-size:.76rem;font-weight:700;background:#eee;color:#555;white-space:nowrap;}
    .qz-i-etat .gicon{font-size:16px;}
    .qz-i-etat.ok{background:#EAF6EC;color:#1E7B34;} .qz-i-etat.ouverte{background:#EEF4FB;color:#0C5BA0;}
    .qz-i-etat.prog{background:#FFF4E6;color:#B8511F;} .qz-i-etat.ferme{background:#F4EFFA;color:#6B3FA0;}
    .qz-i-stat{font-size:.82rem;white-space:nowrap;} .qz-i-stat.warn{color:#B8511F;}
    .qz-i-act{display:inline-flex;gap:5px;flex-wrap:wrap;}
    @media (max-width:700px){ .qz-f-grid{grid-template-columns:1fr;} }
  `;
  document.head.appendChild(st);
})();

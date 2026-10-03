/* =====================================================================
   questionnaires-banque.js -- Questionnaires, étape 4 : banque et partage

   Demandé : créer les questions « à la main, par l'IA, ou depuis une banque de questions, et
   partage possible avec un collègue ».
   - Banque de questionnaires (onglet de #view-qz-banque) : les MODÈLES, toujours modifiables ;
     aperçu, « Donner à une classe » (chaque interrogation reçoit sa propre COPIE, marquée
     reglages.copie_de = modèle : modifier le modèle ne change jamais une interrogation déjà
     donnée, ni ses notes), dupliquer, partager, supprimer. Les copies sont cachées de la banque
     et se modifient depuis l'interrogation (« Suivi des classes », crayon).
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
  // Chaque interrogation a SA copie du questionnaire (reglages.copie_de = modèle de la banque) : les
  // interrogations sont rangées sous le modèle d'où elles viennent.
  const devoirs = new Map(), modele = new Map((mes || []).map(q => [q.id, qzModeleDe(q)]));
  (dv || []).forEach(d => { const k = modele.get(d.questionnaire_id) || d.questionnaire_id; if(!devoirs.has(k)) devoirs.set(k, []); devoirs.get(k).push(d); });
  // Banque de questionnaires = les modèles seulement (pas les copies données à une classe).
  const banque = (mes || []).filter(q => !qzEstCopieClasse(q));
  const qDonnes = new Set((dv || []).map(d => d.questionnaire_id));
  qzB = Object.assign(qzB || { onglet: 'donnees', filtre: '' }, { mes: mes || [], banque, qDonnes, partages: Array.isArray(partages) ? partages : [], devoirs });
  return qzB;
}
// Copie d'un questionnaire faite pour une classe (interrogation, séance notée) : cachée de la banque.
function qzEstCopieClasse(q){ return !!(q && q.reglages && q.reglages.copie_de); }
function qzModeleDe(q){ return (q && q.reglages && q.reglages.copie_de) || (q && q.id); }
async function qzBanqueOuvrir(){
  if(typeof qzAutoArreter === 'function') await qzAutoArreter(true); // brouillon en cours d'édition (questionnaires-interros.js)
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
  const brouillon = !partage && !dv.length && reg.brouillon, incomplet = brouillon && reg.brouillon.a_completer;
  return `<div class="qz-b-card" style="border-top:4px solid ${qzMode(reg).c};">
    <div class="qz-b-head">
      <div>${qzModeBadge(reg, reg.mode === 'classe' ? reg.duree + ' min' : '')} <b>${qzEsc(q.titre || 'Sans titre')}</b>${brouillon ? ` <span class="qz-b-draft${incomplet ? ' inc' : ''}">${incomplet ? 'Brouillon à compléter' : 'Brouillon'}</span>` : ''}
        <div class="hint" style="margin:2px 0 0;">${r.n} question${r.n > 1 ? 's' : ''} · ${['maison', 'classe'].includes(qzModeCle(reg)) ? qzNum(r.pts) + ' pts · ' : ''}${partage ? 'partagé par ' + qzEsc(q.auteur) : 'modifié le ' + new Date(q.updated_at).toLocaleDateString('fr-FR')}</div></div>
      ${!partage && (q.partage_etab || nbPartage) ? `<span class="qz-b-share"><span class="gicon">group</span> ${q.partage_etab ? 'Établissement' : ''}${q.partage_etab && nbPartage ? ' + ' : ''}${nbPartage ? nbPartage + ' collègue' + (nbPartage > 1 ? 's' : '') : ''}</span>` : ''}
    </div>
    <div class="qz-b-types">${Object.keys(r.types).map(t => `<span class="qz-type-pill"><span class="gicon">${qzType(t).icon}</span> ${qzType(t).label}${r.types[t] > 1 ? ' ×' + r.types[t] : ''}</span>`).join('')}</div>
    ${partage ? '' : `<div class="hint" style="margin:6px 0 0;">${dv.length ? 'Donné à : ' + dv.map(d => qzEsc((d.classes ? d.classes.nom + ' · ' : '') + d.titre)).join(' ; ') : qzB.directParQ && qzB.directParQ.has(q.id) ? (s => 'Utilisé en questions flash le ' + new Date(s.created_at).toLocaleDateString('fr-FR') + (s.classes ? ' (' + qzEsc(s.classes.nom) + ')' : '') + '.')(qzB.directParQ.get(q.id)) : 'Pas encore donné à une classe.'}</div>`}
    <div class="qz-b-act">
      ${!partage ? (servi => `<button class="btn qz-mini" onclick="qzBanqueReprendre('${q.id}')" title="${servi ? 'Modifier ce modèle : les interrogations déjà données (et leurs notes) ne changent pas' : 'Continuer à préparer ce questionnaire'}"><span class="gicon">edit</span> ${servi ? 'Modifier' : 'Reprendre'}</button>`)(dv.length || (qzB.directParQ && qzB.directParQ.has(q.id))) : ''}
      <button class="btn secondary qz-mini" onclick="qzBanqueApercu('${q.id}')"><span class="gicon">visibility</span> Aperçu</button>
      <button class="btn ${!partage && !dv.length ? 'secondary ' : ''}qz-mini" onclick="qzBanqueDonner('${q.id}')"><span class="gicon">assignment_add</span> Donner à une classe</button>
      <button class="btn secondary qz-mini qzd-btn" onclick="qzDirectLancer('${q.id}')" title="Poser les questions une à une à toute la classe, sans note, et voir les réponses en direct"><span class="gicon">bolt</span> Questions flash</button>
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
  const liste = (qzB.onglet === 'mes' ? qzB.banque || qzB.mes : qzB.partages).filter(garde);
  const interros = (qzB.interros || []).filter(d => !f || qzNormTexte((d.titre || '') + ' ' + (d.classes ? d.classes.nom : '')).includes(f));
  root.innerHTML = `<span class="back-btn" onclick="showView('view-home');setActiveTopnav(null);">← Accueil</span>
    <h1 style="margin:6px 0 4px;"><span class="gicon">quiz</span> Interrogations en ligne</h1>
    <details class="qz-repli qz-aide"><summary><span class="gicon">help</span> Comment ça marche ?</summary><p style="color:var(--ink-soft);max-width:75ch;">Des interrogations notées, à la manière de Google Forms, séparées des devoirs d'entraînement : créez-les, donnez-les à une classe (en classe, chronométrées, ou à la maison), corrigez-les copie par copie ou question par question, puis publiez les résultats. <b>Banque de questionnaires</b> : vos modèles, toujours modifiables et réutilisables ; chaque classe à qui vous en donnez un reçoit sa propre copie, donc modifier le modèle ne change rien aux interrogations déjà données. <b>Suivi des classes</b> : ce que vous avez donné, les copies rendues, la correction, les questions flash. Pour en envoyer un à un collègue : bouton <b><span class="gicon" style="font-size:1rem;vertical-align:middle;">share</span> Partager</b> ; il le retrouve dans « Partagés avec moi » et peut le copier chez lui.</p>
    <div class="qz-legende">${[['maison', 'noté, à la maison ou en classe (chronométré)'], ['entrainement', 'non noté : l\'élève vérifie, réessaie, voit la correction'], ['sondage', 'pas de bonne réponse : avis, choix, réponses libres'], ['direct', 'en classe, question par question, au rythme du professeur']]
      .map(([k, t]) => `<span>${qzModeBadge(k, '')} <small>${t}</small></span>`).join('')}</div>
    <p class="qzd-intro"><span class="gicon">bolt</span><span><b>Nouveau : les questions flash.</b> Bouton <b>Questions flash</b> sur un questionnaire : les questions s'affichent une à une au rythme du professeur, chaque élève répond depuis son compte, vous voyez en direct le pourcentage de réponses justes et fausses, puis vous affichez la correction. Toute la classe ou un groupe d'élèves ; ils entrent avec le code que vous affichez au tableau (ou automatiquement). Aussi dans le choix du mode d'une nouvelle interrogation. Notée ou non, au choix : une séance notée devient une interrogation que vous vérifiez avant de publier les notes. Les séances terminées restent consultables (bilan) dans « Mes interrogations ».</span></p></details>
    <div class="qz-c-tools">
      <div class="qz-tabs"><button class="${qzB.onglet === 'donnees' ? 'on' : ''}" onclick="qzB.onglet='donnees';qzBanqueRender()"><span class="gicon">assignment_turned_in</span> Suivi des classes (${(qzB.interros || []).filter(d => !d.archive_at).length + (qzB.directsPasses || []).filter(d => !d.archive_at).length + qzBrouillonsListe('').length})</button>
        <button class="${qzB.onglet === 'mes' ? 'on' : ''}" onclick="qzB.onglet='mes';qzBanqueRender()"><span class="gicon">inventory_2</span> Banque de questionnaires (${(qzB.banque || qzB.mes).length})</button>
        <button class="${qzB.onglet === 'partages' ? 'on' : ''}" onclick="qzB.onglet='partages';qzBanqueRender()"><span class="gicon">group</span> Partagés avec moi (${qzB.partages.length})</button></div>
      <input type="search" class="qz-b-search" placeholder="Rechercher (titre, énoncé, auteur)…" value="${qzEsc(qzB.filtre)}" oninput="qzB.filtre=this.value;clearTimeout(qzB.t);qzB.t=setTimeout(()=>{qzBanqueRender();const i=document.querySelector('.qz-b-search');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length);}},250)">
      <button class="btn secondary" onclick="qzOuvrirCarnet()"><span class="gicon">menu_book</span> Carnet de notes</button>
      <button class="btn" onclick="qzBanqueNouveau()"><span class="gicon">add</span> Nouvelle interrogation</button>
    </div>
    ${qzB.onglet === 'donnees' ? qzBanqueDonneesHtml(f) : `<div class="qz-b-grid">${liste.map(q => qzBanqueCarte(q, qzB.onglet !== 'mes')).join('') || `<p class="hint">${qzB.onglet === 'mes' ? (f ? 'Aucun questionnaire ne correspond.' : 'Aucun questionnaire pour l\'instant : créez-en un avec « Nouvelle interrogation ».') : 'Aucun questionnaire partagé avec vous pour l\'instant.'}</p>`}</div>`}`;
}
/* Onglet « Suivi des classes », rangé par classe et avec archivage -- demandé : « La page interrogation
   en ligne se remplit vite. Il faudrait la réorganiser par classe et avec un archivage. »
   En haut : questions flash en cours, puis questionnaires pas encore donnés (repliables). Ensuite, une
   pastille par classe (la classe active par défaut) ; pour chaque classe, ses interrogations et ses
   questions flash terminées mêlées, des plus récentes aux plus anciennes ; « Archiver » les range dans
   « Archives » en bas de la classe (devoirs.archive_at, qz_direct.archive_at : rien ne change pour les
   élèves, notes et copies comprises) ; « Archiver les terminées » range d'un coup celles dont les
   résultats sont publiés ou qui sont fermées, et les questions flash terminées. */
function qzSuiviElements(f){
  const it = (qzB.interros || []).filter(d => !f || qzNormTexte((d.titre || '') + ' ' + (d.classes ? d.classes.nom : '')).includes(f)).map(d => ({ k: 'i', d, t: d.created_at }));
  const dp = (qzB.directsPasses || []).filter(d => !f || qzNormTexte((d.titre || '') + ' ' + (d.classes ? d.classes.nom : '')).includes(f)).map(d => ({ k: 'd', d, t: d.created_at }));
  return it.concat(dp).sort((a, b) => String(b.t).localeCompare(String(a.t)));
}
function qzSuiviClasses(els){
  const m = new Map();
  els.concat(((qzB.directs || []).map(d => ({ d })))).forEach(({ d }) => { const id = d.class_id || '-'; if(!m.has(id)) m.set(id, { id, nom: (d.classes && d.classes.nom) || 'Sans classe', n: 0 }); });
  els.forEach(({ d }) => { if(!d.archive_at) m.get(d.class_id || '-').n++; });
  return [...m.values()].sort((a, b) => a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
}
function qzSuiviClasseChoisie(classes){
  let c = qzB.classe;
  if(c === undefined){ try{ c = localStorage.getItem('qzSuiviClasse'); }catch(e){ c = null; } }
  if(!c || (c !== 'tout' && !classes.some(x => x.id === c))) c = classes.some(x => x.id === currentClassId) ? currentClassId : 'tout';
  return c;
}
function qzSuiviChoisir(c){ qzB.classe = c; try{ localStorage.setItem('qzSuiviClasse', c); }catch(e){} qzBanqueRender(); }
function qzSuiviLigne(x){ return x.k === 'i' ? qzInterroLigne(x.d) : qzDirectPasseLigne(x.d); }
function qzBanqueDonneesHtml(f){
  const enCoursTous = (qzB.directs || []);
  const els = qzSuiviElements(f), classes = qzSuiviClasses(els), choix = qzSuiviClasseChoisie(classes);
  const enCours = enCoursTous.length && typeof qzDirectsHtml === 'function' ? qzDirectsHtml() : '';
  const nbBr = qzBrouillonsListe(f).length;
  const brouillons = nbBr ? `<details class="qz-repli"${nbBr <= 4 ? ' open' : ''}><summary>${qzBrouillonsHtml(f).match(/<p class="qz-i-sec">[\s\S]*?<\/p>/)[0].replace(/<\/?p[^>]*>/g, '')}</summary>${qzBrouillonsHtml(f).replace(/<p class="qz-i-sec">[\s\S]*?<\/p>/, '')}</details>` : '';
  if(!els.length) return enCours + brouillons + `<p class="qz-i-sec"><span class="gicon">assignment_turned_in</span> Données à une classe</p>` + qzInterrosHtml([]);
  const chips = `<div class="qz-cl-chips"><button class="${choix === 'tout' ? 'on' : ''}" onclick="qzSuiviChoisir('tout')">Toutes les classes</button>${classes.map(c => `<button class="${choix === c.id ? 'on' : ''}" onclick="qzSuiviChoisir('${c.id}')">${qzEsc(c.nom)} <small>${c.n}</small></button>`).join('')}</div>`;
  const sections = classes.filter(c => choix === 'tout' || c.id === choix).map(c => {
    const l = els.filter(x => (x.d.class_id || '-') === c.id), actifs = l.filter(x => !x.d.archive_at), arch = l.filter(x => x.d.archive_at);
    const finies = actifs.filter(qzSuiviFinie).length;
    return `<section class="qz-cl-sec"><div class="qz-cl-tete"><h3><span class="gicon">groups</span> ${qzEsc(c.nom)}</h3><span class="hint" style="margin:0;">${actifs.length} en cours de suivi${arch.length ? ` · ${arch.length} archivée${arch.length > 1 ? 's' : ''}` : ''}</span>
        ${finies ? `<button class="btn secondary qz-mini" onclick="qzArchiverTerminees('${c.id}')" title="Résultats publiés, interrogations fermées et questions flash terminées"><span class="gicon">inventory_2</span> Archiver les terminées (${finies})</button>` : ''}</div>
      ${actifs.length ? `<div class="qz-i-liste">${actifs.map(qzSuiviLigne).join('')}</div>` : '<p class="hint">Rien en cours pour cette classe.</p>'}
      ${arch.length ? `<details class="qz-repli qz-archives"><summary><span class="gicon">inventory_2</span> Archives (${arch.length})</summary><div class="qz-i-liste">${arch.map(qzSuiviLigne).join('')}</div></details>` : ''}</section>`;
  }).join('');
  return enCours + brouillons + `<p class="qz-i-sec"><span class="gicon">assignment_turned_in</span> Données à une classe</p>` + chips + sections;
}
function qzSuiviFinie(x){
  if(x.k === 'd') return true;
  const e = qzInterroEtat(x.d); return e.c === 'ok' || e.c === 'ferme';
}
function qzArchiveBtn(table, d){
  return d.archive_at
    ? `<button class="btn secondary qz-mini" onclick="qzArchiver('${table}','${d.id}',false)" title="Sortir des archives"><span class="gicon">unarchive</span></button>`
    : `<button class="btn secondary qz-mini" onclick="qzArchiver('${table}','${d.id}',true)" title="Archiver : rangée dans « Archives » en bas de la classe (rien ne change pour les élèves)"><span class="gicon">inventory_2</span></button>`;
}
async function qzArchiver(table, id, on, silencieux){
  const v = on ? new Date().toISOString() : null;
  const { error } = await sb.from(table).update({ archive_at: v }).eq('id', id);
  if(error){ if(!silencieux) await niceAlert('Archivage impossible : ' + error.message); return false; }
  const l = table === 'devoirs' ? qzB.interros : qzB.directsPasses, d = (l || []).find(x => x.id === id); if(d) d.archive_at = v;
  if(!silencieux) qzBanqueRender();
  return true;
}
async function qzArchiverTerminees(classe){
  const l = qzSuiviElements('').filter(x => (x.d.class_id || '-') === classe && !x.d.archive_at && qzSuiviFinie(x));
  if(!l.length) return;
  if(!(await niceConfirm(`Archiver ${l.length} élément${l.length > 1 ? 's' : ''} terminé${l.length > 1 ? 's' : ''} de cette classe (résultats publiés, interrogations fermées, questions flash terminées) ? Rien ne change pour les élèves ; vous les retrouvez dans « Archives ».`))) return;
  for(const x of l) await qzArchiver(x.k === 'i' ? 'devoirs' : 'qz_direct', x.d.id, true, true);
  qzBanqueRender();
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
// Ouvre le formulaire « Nouvelle interrogation » : le questionnaire lui-même s'il est à moi et pas
// encore donné (brouillon), sinon une COPIE (les notes d'une autre classe ne bougent jamais).
async function qzBanqueDonner(id){
  const q = await qzBanqueSur(id);
  if(!q){ await niceAlert('Questionnaire introuvable.'); return; }
  const libre = qzB && qzB.mes.some(x => x.id === id) && !qzEstCopieClasse(q) && !(qzB.devoirs.get(id) || []).length;
  await qzFormOuvrir(libre ? { questionnaire: q } : { copieDe: q });
}
async function qzBanqueReprendre(id){
  const q = await qzBanqueSur(id);
  if(!q){ await niceAlert('Questionnaire introuvable.'); return; }
  await qzFormOuvrir({ questionnaire: q });
}
function qzBanqueNouveau(){ return qzFormOuvrir(); }
async function qzBanqueCopier(id){
  const q = await qzBanqueSur(id); if(!q) return;
  const partage = q.teacher_id ? q.teacher_id !== currentUser.id : !!q.auteur;
  const titre = partage ? q.titre : 'Copie de ' + (q.titre || 'questionnaire');
  const { error } = await sb.from('questionnaires').insert({ teacher_id: currentUser.id, titre,
    questions: JSON.parse(JSON.stringify(q.questions || [])), reglages: Object.assign({}, q.reglages || {}, { ferme: false, brouillon: partage ? undefined : (q.reglages || {}).brouillon }) });
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
// Signalé : "Je ne vois pas où on peut partager à une collègue ou faire une copie à une
// collègue" -- bouton « Partager » maintenant sur chaque questionnaire enregistré, chaque
// interrogation donnée et dans le formulaire ; le collègue le retrouve dans « Partagés avec moi ».
async function qzBanquePartager(id){
  const q = await qzBanqueSur(id); if(!q){ await niceAlert('Questionnaire introuvable : enregistrez-le d\'abord.'); return; }
  const [{ data: collegues }, { data: choisis }] = await Promise.all([
    sb.rpc('qz_collegues'),
    (q.partage_profs || []).length ? sb.rpc('qz_profs', { p_email: null, p_ids: q.partage_profs }) : Promise.resolve({ data: [] }),
  ]);
  qzBP = { id, q, etab: !!q.partage_etab, collegues: collegues || [], profs: new Map((choisis || []).map(p => [p.id, p])) };
  let o = document.getElementById('qzBPOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'qzBPOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o);
    o.addEventListener('click', e => { if(e.target === o) o.style.display = 'none'; }); }
  o.style.display = 'flex';
  qzBPRender();
}
function qzBPRender(){
  const o = document.getElementById('qzBPOverlay'), q = qzBP.q; if(!o || !q) return;
  const nom = p => qzEsc(((p.prenom || '') + ' ' + (p.nom || '')).trim() || '(sans nom)');
  const autres = Array.from(qzBP.profs.values()).filter(p => !qzBP.collegues.some(c => c.id === p.id));
  o.innerHTML = `<div class="modal-card qz-gen">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b style="font-family:'Space Grotesk',sans-serif;font-size:1.1rem;"><span class="gicon" style="color:#6B3FA0;vertical-align:middle;">share</span> Partager « ${qzEsc(q.titre || 'Sans titre')} » avec des collègues</b>
      <button class="modal-close" onclick="document.getElementById('qzBPOverlay').style.display='none'"><span class="gicon">close</span></button></div>
    <p class="hint" style="margin:6px 0 12px;">Vos collègues le retrouveront sur leur page Interrogations en ligne, onglet <b>« Partagés avec moi »</b> : ils pourront le consulter, <b>le copier dans leurs questionnaires</b> (leur copie est alors à eux, modifiable), le donner à leurs classes et en importer des questions, corrigés compris. Ils ne pourront jamais modifier le vôtre, ni voir vos élèves ou leurs copies.</p>
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
  Object.assign(qzBP.q, { partage_etab: qzBP.etab, partage_profs: profs });
  const noms = Array.from(qzBP.profs.values()).map(p => ((p.prenom || '') + ' ' + (p.nom || '')).trim()).filter(Boolean);
  const qui = [qzBP.etab ? 'tous les professeurs de votre établissement' : '', noms.length > 2 ? noms.slice(0, 2).join(', ') + ' et ' + (noms.length - 2) + ' autre' + (noms.length > 3 ? 's' : '') : noms.join(' et ')].filter(Boolean).join(' et ');
  if(typeof qzToast === 'function') qzToast(qui ? `<span class="gicon">share</span> Partagé avec ${qzEsc(qui)} : ${qzBP.etab || noms.length > 1 ? 'ils le trouveront' : 'il ou elle le trouvera'} dans « Partagés avec moi ».` : '<span class="gicon">share</span> Ce questionnaire n\'est plus partagé.');
  const surHub = document.getElementById('view-qz-banque').classList.contains('active');
  await qzBanqueCharger(); if(surHub) qzBanqueRender();
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
  // Questionnaires complets -- signalé : "on retrouve les exercices qu'on peut importer un à un
  // mais pas en tant que questionnaire complet".
  const complets = (qzB.banque || qzB.mes).filter(q => q.id !== courant).map(q => ({ q, auteur: '' })).concat(qzB.partages.map(q => ({ q, auteur: q.auteur })))
    .filter(x => (x.q.questions || []).length);
  complets.forEach(({ q, auteur }) => (q.questions || []).forEach(x => lignes.push({ q: x, qid: q.id, source: q.titre || 'Sans titre', auteur })));
  qzBI = { lignes, complets, choix: new Set(), filtre: '', type: '', comp: '', vue: 'questionnaires' };
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
    <p class="hint" style="margin:4px 0 10px;">Vos questionnaires et ceux partagés avec vous : importez-en un en entier, ou choisissez des questions une à une. Tout est copié dans ce questionnaire (réponses, barème et éléments d'énoncé compris) et reste modifiable ; l'original n'est pas touché.</p>
    <div class="qz-tabs" style="margin-bottom:10px;"><button class="${qzBI.vue === 'questionnaires' ? 'on' : ''}" onclick="qzBI.vue='questionnaires';qzImporterRender()"><span class="gicon">quiz</span> Questionnaires complets (${qzBI.complets.length})</button>
      <button class="${qzBI.vue === 'questions' ? 'on' : ''}" onclick="qzBI.vue='questions';qzImporterRender()"><span class="gicon">list</span> Questions une à une (${qzBI.lignes.length})</button></div>
    ${qzBI.vue === 'questionnaires' ? `<div class="qz-bi-liste">${qzBI.complets.map(({ q, auteur }) => { const r = qzBanqueResume(q);
      return `<div class="qz-bi-row qz-bi-qz"><div class="qz-bi-main"><b>${qzEsc(q.titre || 'Sans titre')}</b>
        <div class="hint" style="margin:2px 0 0;">${r.n} question${r.n > 1 ? 's' : ''} · ${qzNum(r.pts)} pts${auteur ? ' · partagé par ' + qzEsc(auteur) : ' · modifié le ' + new Date(q.updated_at).toLocaleDateString('fr-FR')}</div>
        <div class="qz-b-types" style="margin-top:4px;">${Object.keys(r.types).map(t => `<span class="qz-type-pill"><span class="gicon">${qzType(t).icon}</span> ${qzType(t).label}${r.types[t] > 1 ? ' ×' + r.types[t] : ''}</span>`).join('')}</div></div>
        <button class="btn qz-mini" onclick="qzImporterComplet('${q.id}')"><span class="gicon">download</span> Tout importer</button></div>`; }).join('')
      || '<p class="hint">Aucun questionnaire enregistré pour l\'instant.</p>'}</div></div>` : `
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
    </div>`}</div>`;
}
function qzBIChoix(i, on){ if(on) qzBI.choix.add(i); else qzBI.choix.delete(i); qzImporterRender(); }
function qzBIToutes(){
  const f = qzNormTexte(qzBI.filtre);
  qzBI.lignes.forEach((l, i) => { if((!qzBI.type || l.q.type === qzBI.type) && (!qzBI.comp || l.q.competence === qzBI.comp)
    && (!f || qzNormTexte((l.q.enonce || '') + ' ' + (l.q.trous_source || '') + ' ' + l.source + ' ' + l.auteur).includes(f))) qzBI.choix.add(i); });
  qzImporterRender();
}
function qzImporterComplet(qid){
  const src = qzBI.complets.find(x => x.q.id === qid); if(!src) return;
  if(!qzEd) qzEdReset();
  const vide = !qzEd.questions.length;
  const nouvelles = (src.q.questions || []).map(x => Object.assign(JSON.parse(JSON.stringify(x)), { id: qzId() }));
  qzEd.questions.push(...nouvelles);
  if(vide){ // questionnaire vide : on reprend aussi ses réglages (mode, durée, barème...) et son titre
    const reg = Object.assign({}, QZ_REGLAGES_DEFAUT, src.q.reglages || {}, { ferme: false }); delete reg.brouillon;
    qzEd.reglages = reg; qzEdRenderReglages();
    const t = document.getElementById('qzfTitre'); if(t && !t.value.trim()) t.value = src.q.titre || '';
  }
  qzEdOuverte = null;
  qzEdRender();
  document.getElementById('qzBIOverlay').style.display = 'none';
  niceAlert(`« ${src.q.titre || 'Sans titre'} » importé : ${nouvelles.length} question${nouvelles.length > 1 ? 's' : ''}${vide ? ' et ses réglages' : ''}. Vous pouvez tout modifier : l'original n'est pas touché.`);
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
    .qz-bi-qz{display:flex;align-items:center;gap:10px;cursor:default;}
    .qz-b-draft{display:inline-block;margin-left:6px;border-radius:999px;padding:1px 8px;font-size:.7rem;font-weight:700;background:#EEF4FB;color:#0C5BA0;vertical-align:middle;}
    .qz-b-draft.inc{background:#FFF4E6;color:#B8511F;}
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

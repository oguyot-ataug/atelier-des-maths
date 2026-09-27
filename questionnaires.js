/* =====================================================================
   questionnaires.js -- Questionnaires en ligne (type de devoir « Questionnaire »)

   Demandé : "pouvoir faire des questionnaires (type interrogation en ligne) à la manière de
   Google Forms. On pourrait créer des questions de tout type (plus complet que Form) avec les
   attendus et le barème. Pouvoir reprendre chaque copie par copie ou par questions. Pour les
   questions ouvertes, proposer une correction IA."

   Étape 1 (ce fichier) :
   - éditeur (dans le formulaire « Nouveau devoir ») : QCM, vrai/faux, réponse numérique, réponse
     courte, question ouverte (texte ou photo, attendus, critères du barème), bloc de texte ;
     points et compétence par question ; mode « en classe » (chronométré) ou « à la maison » ;
   - passation élève (#view-questionnaire) : enregistrement automatique, chrono, sorties de page
     signalées, photo de la rédaction ;
   - correction (#view-qz-correction) copie par copie ou question par question, correction
     automatique des questions fermées, publication des résultats ;
   - carnet de notes (#view-qz-carnet) avec « Copier la colonne » et bilan par compétence.

   Sécurité : les réponses attendues vivent dans la table questionnaires (lue par les seuls
   professeurs) ; l'élève passe par les fonctions qz_passer / qz_commencer / qz_enregistrer, qui ne
   lui donnent le corrigé qu'une fois les résultats publiés (voir la migration questionnaires_etape1).

   Dépend de app.js (sb, currentUser, escapeHtml, renderMathText, niceAlert, niceConfirm,
   nicePrompt, showView, accountClassesList) et de devoirs.js (DEVOIR_TYPES, formulaire).
   ===================================================================== */

const QZ_COMPETENCES = [
  { id:'chercher', label:'Chercher', color:'#0C5BA0' },
  { id:'modeliser', label:'Modéliser', color:'#6B3FA0' },
  { id:'representer', label:'Représenter', color:'#26AAB1' },
  { id:'raisonner', label:'Raisonner', color:'#B8511F' },
  { id:'calculer', label:'Calculer', color:'#1F7A4D' },
  { id:'communiquer', label:'Communiquer', color:'#9E1F5E' },
];
const QZ_TYPES = [
  { id:'qcm', label:'QCM', icon:'radio_button_checked', aide:'Une ou plusieurs bonnes réponses parmi des propositions.' },
  { id:'vf', label:'Vrai / faux', icon:'rule', aide:'Une ou plusieurs affirmations à juger vraies ou fausses.' },
  { id:'numerique', label:'Réponse numérique', icon:'pin', aide:'Un nombre : 3/4, 0,75 et 0.75 sont reconnus comme égaux.' },
  { id:'courte', label:'Réponse courte', icon:'short_text', aide:'Un mot ou une expression, comparée aux réponses acceptées.' },
  { id:'ouverte', label:'Question ouverte', icon:'edit_note', aide:'Rédaction (texte ou photo de la copie), corrigée avec les attendus et le barème.' },
  { id:'texte', label:'Texte / document', icon:'article', aide:'Énoncé commun ou document, sans réponse attendue.' },
];
const QZ_REGLAGES_DEFAUT = { mode:'maison', duree:30, melanger_questions:false, melanger_choix:true, note_sur:20, arrondi:0.5, ferme:false };

function qzId(){ return Math.random().toString(36).slice(2, 9); }
function qzEsc(s){ return escapeHtml(String(s ?? '')); }
function qzMath(s){ return renderMathText(String(s ?? '')).replace(/\n/g, '<br>'); }
function qzType(id){ return QZ_TYPES.find(t => t.id === id) || QZ_TYPES[0]; }
function qzComp(id){ return QZ_COMPETENCES.find(c => c.id === id) || null; }
function qzNum(n){ return (Math.round(n * 100) / 100).toString().replace('.', ','); }

/* ---------------------------------------------------------------------
   Barème et correction automatique
   --------------------------------------------------------------------- */
function qzMax(q){
  if(q.type === 'texte') return 0;
  if(q.type === 'ouverte' && q.criteres && q.criteres.length) return q.criteres.reduce((s, c) => s + (Number(c.points) || 0), 0);
  return Number(q.points) || 0;
}
function qzTotalMax(questions){ return (questions || []).reduce((s, q) => s + qzMax(q), 0); }

// "3/4", "0,75", "-2,5", "1 000", "−3" → nombre (NaN sinon).
function qzParseNombre(s){
  let t = String(s ?? '').trim().replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(',', '.');
  if(!t) return NaN;
  const f = t.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
  if(f){ const b = parseFloat(f[2]); return b ? parseFloat(f[1]) / b : NaN; }
  return /^-?\d*\.?\d+$/.test(t) ? parseFloat(t) : NaN;
}
function qzNormTexte(s, casse){
  let t = String(s ?? '').trim().replace(/\s+/g, ' ').replace(/[.!;]+$/, '');
  if(!casse) t = t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return t;
}
function qzListe(s){ return String(s ?? '').split(/\s*[;\n]\s*/).map(x => x.trim()).filter(Boolean); }

// Points obtenus automatiquement, ou null si la question se corrige à la main (ouverte).
function qzNoteAuto(q, rep){
  const max = qzMax(q);
  if(q.type === 'texte') return 0;
  if(q.type === 'ouverte') return null;
  if(rep == null || rep === '' || (Array.isArray(rep) && !rep.length)) return 0;
  if(q.type === 'qcm'){
    const bonnes = (q.choix || []).filter(c => c.correct).map(c => c.id);
    if(!q.multiple) return bonnes.includes(rep) ? max : 0;
    const coches = Array.isArray(rep) ? rep : [rep];
    if(q.notation === 'tout_ou_rien'){
      return coches.length === bonnes.length && coches.every(id => bonnes.includes(id)) ? max : 0;
    }
    const ok = coches.filter(id => bonnes.includes(id)).length, faux = coches.length - ok;
    return bonnes.length ? Math.max(0, Math.round(max * (ok - faux) / bonnes.length * 100) / 100) : 0;
  }
  if(q.type === 'vf'){
    const items = q.items || [];
    if(!items.length || typeof rep !== 'object') return 0;
    const justes = items.filter(it => rep[it.id] !== undefined && rep[it.id] === !!it.vrai).length;
    return Math.round(max * justes / items.length * 100) / 100;
  }
  if(q.type === 'numerique'){
    const v = qzParseNombre(rep), tol = Math.abs(qzParseNombre(q.tolerance)) || 0;
    const ok = qzListe(q.reponses).some(r => {
      const a = qzParseNombre(r);
      if(!isNaN(a) && !isNaN(v)) return Math.abs(a - v) <= tol + 1e-9 * Math.max(1, Math.abs(a));
      return qzNormTexte(r) === qzNormTexte(rep);
    });
    return ok ? max : 0;
  }
  if(q.type === 'courte'){
    return qzListe(q.reponses).some(r => qzNormTexte(r, q.casse) === qzNormTexte(rep, q.casse)) ? max : 0;
  }
  return 0;
}
// Points retenus pour une question d'une copie : correction du professeur (ou de l'IA validée),
// sinon correction automatique ; null = reste à corriger.
function qzPoints(q, copie){
  const c = copie && copie.correction && copie.correction[q.id];
  if(c && c.points !== null && c.points !== undefined && c.points !== '') return Number(c.points);
  return qzNoteAuto(q, copie && copie.reponses ? copie.reponses[q.id] : undefined);
}
function qzScoreCopie(questions, copie, reglages){
  let total = 0, aCorriger = 0;
  (questions || []).forEach(q => { const p = qzPoints(q, copie); if(p === null) aCorriger++; else total += p; });
  const max = qzTotalMax(questions);
  const sur = Number(reglages && reglages.note_sur) || 20, arr = Number(reglages && reglages.arrondi) || 0.01;
  const note = max ? Math.round((total / max * sur) / arr) * arr : 0;
  return { total: Math.round(total * 100) / 100, max, aCorriger, note: Math.round(note * 100) / 100, sur };
}
// Bilan par compétence d'une copie : {competence: {obtenu, max}}.
// Copie rendue, ou copie chronométrée dont le temps est écoulé (élève parti sans rendre) :
// elle se corrige comme une copie rendue, avec les réponses enregistrées jusque-là.
function qzEstRendue(c){
  return !!c && (c.statut === 'rendue' || (!!c.deadline_at && Date.now() > new Date(c.deadline_at).getTime() + 2 * 60000));
}
function qzCompetencesCopie(questions, copie){
  const b = {};
  (questions || []).forEach(q => {
    if(!q.competence || !qzMax(q)) return;
    const p = qzPoints(q, copie);
    b[q.competence] = b[q.competence] || { obtenu: 0, max: 0 };
    b[q.competence].max += qzMax(q);
    b[q.competence].obtenu += p || 0;
  });
  return b;
}

// Ordre des questions (et des propositions) propre à chaque copie, stable d'une ouverture à l'autre.
function qzRng(seedStr){
  let h = 1779033703 ^ seedStr.length;
  for(let i = 0; i < seedStr.length; i++){ h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return () => { h = Math.imul(h ^ (h >>> 16), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
function qzMelanger(arr, rnd){ const a = arr.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
// Les blocs « texte » restent en tête de leur groupe de questions : on ne mélange qu'à l'intérieur.
function qzOrdre(questions, reglages, seed){
  if(!reglages || !reglages.melanger_questions || !seed) return questions.slice();
  const rnd = qzRng(seed + 'q'), out = []; let groupe = [];
  questions.forEach(q => { if(q.type === 'texte'){ out.push(...qzMelanger(groupe, rnd)); groupe = []; out.push(q); } else groupe.push(q); });
  out.push(...qzMelanger(groupe, rnd));
  return out;
}
function qzOrdreChoix(q, reglages, seed){
  const choix = q.choix || [];
  return reglages && reglages.melanger_choix && seed ? qzMelanger(choix, qzRng(seed + q.id)) : choix;
}

/* =====================================================================
   ÉDITEUR (professeur) -- dans le formulaire « Nouveau devoir » de devoirs.js
   ===================================================================== */
let qzEd = null; // { id, questions, reglages }
let qzEdOuverte = null; // id de la question dépliée
function qzEdVide(){ return { id: null, questions: [], reglages: Object.assign({}, QZ_REGLAGES_DEFAUT) }; }
function qzEdReset(){ qzEd = qzEdVide(); qzEdOuverte = null; }
async function qzEdCharger(questionnaireId){
  qzEdReset();
  if(!questionnaireId) return;
  const { data, error } = await sb.from('questionnaires').select('*').eq('id', questionnaireId).maybeSingle();
  if(error || !data){ await niceAlert('Questionnaire introuvable' + (error ? ' : ' + error.message : '.')); return; }
  qzEd = { id: data.id, questions: data.questions || [], reglages: Object.assign({}, QZ_REGLAGES_DEFAUT, data.reglages || {}) };
}
// Enregistre le questionnaire (appelé par createDevoir) ; renvoie son id, ou lève une erreur lisible.
async function qzEdEnregistrer(titre){
  if(!qzEd) qzEdReset();
  const erreurs = qzEdVerifier();
  if(erreurs.length) throw new Error(erreurs[0]);
  const row = { titre: titre || '', questions: qzEd.questions, reglages: qzEd.reglages, updated_at: new Date().toISOString() };
  if(qzEd.id){
    const { error } = await sb.from('questionnaires').update(row).eq('id', qzEd.id);
    if(error) throw error;
    return qzEd.id;
  }
  const { data, error } = await sb.from('questionnaires').insert(Object.assign({ teacher_id: currentUser.id }, row)).select('id').single();
  if(error) throw error;
  qzEd.id = data.id;
  return data.id;
}
function qzEdVerifier(){
  const e = [], qs = qzEd.questions.filter(q => q.type !== 'texte');
  if(!qs.length) e.push('Ajoutez au moins une question au questionnaire.');
  qzEd.questions.forEach((q, i) => {
    const n = 'Question ' + (i + 1) + ' : ';
    if(!String(q.enonce || '').trim() && !q.image) e.push(n + 'écrivez l\'énoncé.');
    if(q.type === 'qcm'){
      if((q.choix || []).filter(c => String(c.texte || '').trim()).length < 2) e.push(n + 'il faut au moins deux propositions.');
      if(!(q.choix || []).some(c => c.correct)) e.push(n + 'cochez la ou les bonnes réponses.');
    }
    if(q.type === 'vf' && !(q.items || []).filter(it => String(it.texte || '').trim()).length) e.push(n + 'écrivez au moins une affirmation.');
    if((q.type === 'numerique' || q.type === 'courte') && !qzListe(q.reponses).length) e.push(n + 'indiquez la réponse attendue.');
    if(q.type !== 'texte' && !(qzMax(q) > 0)) e.push(n + 'le barème doit valoir au moins un point.');
  });
  return e;
}
function qzEdNouvelle(type){
  const q = { id: qzId(), type, enonce: '', points: type === 'ouverte' ? 2 : 1, competence: '' };
  if(type === 'qcm') Object.assign(q, { choix: [{ id: qzId(), texte: '', correct: true }, { id: qzId(), texte: '', correct: false }, { id: qzId(), texte: '', correct: false }], multiple: false, notation: 'partiel' });
  if(type === 'vf') Object.assign(q, { items: [{ id: qzId(), texte: '', vrai: true }] });
  if(type === 'numerique') Object.assign(q, { reponses: '', tolerance: '', unite: '' });
  if(type === 'courte') Object.assign(q, { reponses: '', casse: false });
  if(type === 'ouverte') Object.assign(q, { attendus: '', criteres: [], reponse: 'texte_photo' });
  if(type === 'texte') q.points = 0;
  return q;
}
function qzEdAjouter(type){
  const q = qzEdNouvelle(type);
  qzEd.questions.push(q);
  qzEdOuverte = q.id;
  qzEdRender();
  setTimeout(() => { const el = document.getElementById('qzEdQ_' + q.id); if(el){ el.scrollIntoView({ behavior: 'smooth', block: 'center' }); const t = el.querySelector('textarea'); if(t) t.focus(); } }, 50);
}
function qzEdQ(id){ return qzEd.questions.find(q => q.id === id); }
function qzEdSet(id, champ, valeur, rerender){
  const q = qzEdQ(id); if(!q) return;
  q[champ] = valeur;
  if(rerender) qzEdRender(); else { qzEdMajTotal(); qzEdMajApercu(id); }
}
function qzEdReglage(champ, valeur){ qzEd.reglages[champ] = valeur; qzEdRenderReglages(); qzEdMajTotal(); }
function qzEdDeplacer(id, sens){
  const i = qzEd.questions.findIndex(q => q.id === id), j = i + sens;
  if(i < 0 || j < 0 || j >= qzEd.questions.length) return;
  [qzEd.questions[i], qzEd.questions[j]] = [qzEd.questions[j], qzEd.questions[i]];
  qzEdRender();
}
function qzEdDupliquer(id){
  const i = qzEd.questions.findIndex(q => q.id === id); if(i < 0) return;
  const c = JSON.parse(JSON.stringify(qzEd.questions[i]));
  c.id = qzId();
  (c.choix || []).forEach(x => x.id = qzId()); (c.items || []).forEach(x => x.id = qzId()); (c.criteres || []).forEach(x => x.id = qzId());
  qzEd.questions.splice(i + 1, 0, c);
  qzEdOuverte = c.id;
  qzEdRender();
}
async function qzEdSupprimer(id){
  if(!(await niceConfirm('Supprimer cette question ?'))) return;
  qzEd.questions = qzEd.questions.filter(q => q.id !== id);
  qzEdRender();
}
function qzEdToggle(id){ qzEdOuverte = qzEdOuverte === id ? null : id; qzEdRender(); }
// Sous-listes (propositions, affirmations, critères)
function qzEdSousAjouter(id, liste){
  const q = qzEdQ(id); if(!q) return;
  q[liste] = q[liste] || [];
  q[liste].push(liste === 'choix' ? { id: qzId(), texte: '', correct: false } : liste === 'items' ? { id: qzId(), texte: '', vrai: true } : { id: qzId(), texte: '', points: 1 });
  if(liste === 'criteres') q.points = qzMax(q);
  qzEdRender();
}
function qzEdSousSet(id, liste, sid, champ, valeur, rerender){
  const q = qzEdQ(id); if(!q) return;
  const s = (q[liste] || []).find(x => x.id === sid); if(!s) return;
  if(liste === 'choix' && champ === 'correct' && !q.multiple && valeur) q.choix.forEach(c => c.correct = false);
  s[champ] = valeur;
  if(liste === 'criteres') q.points = qzMax(q);
  if(rerender) qzEdRender(); else { qzEdMajTotal(); qzEdMajApercu(id); }
}
function qzEdSousSupprimer(id, liste, sid){
  const q = qzEdQ(id); if(!q) return;
  q[liste] = (q[liste] || []).filter(x => x.id !== sid);
  if(liste === 'criteres') q.points = q.criteres.length ? qzMax(q) : (q.points || 1);
  qzEdRender();
}
async function qzEdImage(id, input){
  const f = input.files && input.files[0]; if(!f) return;
  if(f.size > 8 * 1024 * 1024){ await niceAlert('Image trop lourde (8 Mo au plus).'); return; }
  const ext = (f.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
  const path = `${currentUser.id}/qz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await sb.storage.from('cahier-images').upload(path, f, { cacheControl: '31536000', upsert: false });
  if(error){ await niceAlert('Envoi impossible : ' + error.message); return; }
  const { data: pub } = sb.storage.from('cahier-images').getPublicUrl(path);
  qzEdSet(id, 'image', pub.publicUrl, true);
}

function qzEdMajTotal(){
  const el = document.getElementById('qzEdTotal'); if(!el || !qzEd) return;
  const n = qzEd.questions.filter(q => q.type !== 'texte').length, max = qzTotalMax(qzEd.questions);
  el.innerHTML = `${n} question${n > 1 ? 's' : ''} · <b>${qzNum(max)} point${max > 1 ? 's' : ''}</b>${max ? ` · note ramenée sur ${qzEd.reglages.note_sur}` : ''}`;
  qzEd.questions.forEach(q => { const p = document.getElementById('qzEdPts_' + q.id); if(p) p.textContent = q.type === 'texte' ? '' : qzNum(qzMax(q)) + ' pt' + (qzMax(q) > 1 ? 's' : ''); });
}
function qzEdMajApercu(id){
  const q = qzEdQ(id), el = document.getElementById('qzEdApercu_' + id);
  if(q && el) el.innerHTML = q.enonce ? qzMath(q.enonce) : '<span class="hint" style="margin:0;">Aperçu de l\'énoncé</span>';
  const r = document.getElementById('qzEdResume_' + id);
  if(q && r) r.innerHTML = qzEdResume(q);
}
function qzEdResume(q){
  const t = String(q.enonce || '').replace(/\s+/g, ' ').trim();
  return t ? qzMath(t.length > 110 ? t.slice(0, 110) + '…' : t) : '<i style="color:var(--ink-soft);">(énoncé à écrire)</i>';
}

function qzEdRenderReglages(){
  const box = document.getElementById('qzEdReglages'); if(!box || !qzEd) return;
  const r = qzEd.reglages;
  box.innerHTML = `
    <div class="qz-mode-row">
      <button type="button" class="qz-mode${r.mode === 'maison' ? ' on' : ''}" onclick="qzEdReglage('mode','maison')"><span class="gicon">home</span><span><b>À la maison</b><small>Sans limite de temps, jusqu'à la date limite du devoir.</small></span></button>
      <button type="button" class="qz-mode${r.mode === 'classe' ? ' on' : ''}" onclick="qzEdReglage('mode','classe')"><span class="gicon">timer</span><span><b>Interrogation en classe</b><small>Durée limitée, copie rendue automatiquement à la fin, sorties de la page signalées.</small></span></button>
    </div>
    <div class="qz-reg-grid">
      ${r.mode === 'classe' ? `<label>Durée <span><input type="number" min="1" max="240" value="${r.duree || 30}" onchange="qzEdReglage('duree', Math.max(1, parseInt(this.value,10)||30))" style="width:70px;"> min</span></label>` : ''}
      <label>Note sur <span><input type="number" min="1" max="100" value="${r.note_sur}" onchange="qzEdReglage('note_sur', Math.max(1, parseFloat(String(this.value).replace(',','.'))||20))" style="width:70px;"></span></label>
      <label>Arrondi <select onchange="qzEdReglage('arrondi', parseFloat(this.value))">
        ${[0.01, 0.1, 0.25, 0.5, 1].map(a => `<option value="${a}"${Number(r.arrondi) === a ? ' selected' : ''}>${a === 0.01 ? 'au centième' : a === 1 ? 'au point' : 'au ' + String(a).replace('.', ',') + ' point'}</option>`).join('')}
      </select></label>
      <label class="qz-check"><input type="checkbox" ${r.melanger_questions ? 'checked' : ''} onchange="qzEdReglage('melanger_questions', this.checked)"> Mélanger l'ordre des questions</label>
      <label class="qz-check"><input type="checkbox" ${r.melanger_choix ? 'checked' : ''} onchange="qzEdReglage('melanger_choix', this.checked)"> Mélanger les propositions des QCM</label>
    </div>`;
}
function qzEdCompSelect(q){
  return `<select onchange="qzEdSet('${q.id}','competence',this.value)" title="Compétence évaluée">
    <option value="">Compétence…</option>
    ${QZ_COMPETENCES.map(c => `<option value="${c.id}"${q.competence === c.id ? ' selected' : ''}>${c.label}</option>`).join('')}
  </select>`;
}
function qzEdCorps(q){
  const id = q.id;
  const enonce = `
    <label class="qz-lab">${q.type === 'texte' ? 'Texte ou document' : 'Énoncé'} <span class="hint" style="margin:0;">(formules : 3/4, x^2, sqrt(2) ou $\\LaTeX$ ; **gras**)</span></label>
    <textarea rows="3" oninput="qzEdSet('${id}','enonce',this.value)" placeholder="${q.type === 'texte' ? 'Énoncé commun à plusieurs questions, données, document…' : 'Écrivez la question…'}">${qzEsc(q.enonce)}</textarea>
    <div class="qz-apercu" id="qzEdApercu_${id}">${q.enonce ? qzMath(q.enonce) : '<span class="hint" style="margin:0;">Aperçu de l\'énoncé</span>'}</div>
    <div class="qz-img-row">
      ${q.image ? `<img src="${qzEsc(q.image)}" alt=""><button type="button" class="btn secondary qz-mini" onclick="qzEdSet('${id}','image',null,true)"><span class="gicon">delete</span> Retirer l'image</button>`
        : `<label class="btn secondary qz-mini" style="cursor:pointer;"><span class="gicon">image</span> Ajouter une image<input type="file" accept="image/*" style="display:none;" onchange="qzEdImage('${id}',this)"></label>`}
    </div>`;
  let specifique = '';
  if(q.type === 'qcm'){
    specifique = `
      <div class="qz-lab-row"><span class="qz-lab">Propositions <span class="hint" style="margin:0;">(cochez la ou les bonnes réponses)</span></span>
        <label class="qz-check"><input type="checkbox" ${q.multiple ? 'checked' : ''} onchange="qzEdSet('${id}','multiple',this.checked,true)"> Plusieurs bonnes réponses</label></div>
      ${(q.choix || []).map((c, i) => `<div class="qz-sub">
        <input type="${q.multiple ? 'checkbox' : 'radio'}" name="qzEdC_${id}" ${c.correct ? 'checked' : ''} onchange="qzEdSousSet('${id}','choix','${c.id}','correct',this.checked,true)" title="Bonne réponse">
        <span class="qz-lettre">${String.fromCharCode(65 + i)}</span>
        <input type="text" value="${qzEsc(c.texte)}" oninput="qzEdSousSet('${id}','choix','${c.id}','texte',this.value)" placeholder="Proposition ${String.fromCharCode(65 + i)}">
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','choix','${c.id}')" title="Supprimer"><span class="gicon">close</span></button>
      </div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qzEdSousAjouter('${id}','choix')"><span class="gicon">add</span> Proposition</button>
      ${q.multiple ? `<label class="qz-lab" style="margin-top:8px;">Notation
        <select onchange="qzEdSet('${id}','notation',this.value)">
          <option value="partiel"${q.notation !== 'tout_ou_rien' ? ' selected' : ''}>Points partiels (une case fausse annule une case juste)</option>
          <option value="tout_ou_rien"${q.notation === 'tout_ou_rien' ? ' selected' : ''}>Tout ou rien</option>
        </select></label>` : ''}`;
  }
  if(q.type === 'vf'){
    specifique = `
      <span class="qz-lab">Affirmations <span class="hint" style="margin:0;">(les points sont partagés entre elles)</span></span>
      ${(q.items || []).map(it => `<div class="qz-sub">
        <input type="text" value="${qzEsc(it.texte)}" oninput="qzEdSousSet('${id}','items','${it.id}','texte',this.value)" placeholder="Affirmation">
        <select onchange="qzEdSousSet('${id}','items','${it.id}','vrai',this.value==='1')"><option value="1"${it.vrai ? ' selected' : ''}>Vrai</option><option value="0"${!it.vrai ? ' selected' : ''}>Faux</option></select>
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','items','${it.id}')" title="Supprimer"><span class="gicon">close</span></button>
      </div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qzEdSousAjouter('${id}','items')"><span class="gicon">add</span> Affirmation</button>`;
  }
  if(q.type === 'numerique'){
    specifique = `<div class="qz-reg-grid">
      <label>Réponse(s) acceptée(s) <input type="text" value="${qzEsc(q.reponses)}" oninput="qzEdSet('${id}','reponses',this.value)" placeholder="ex. 3/4 ; 0,75" style="min-width:160px;"></label>
      <label>Tolérance ± <input type="text" value="${qzEsc(q.tolerance)}" oninput="qzEdSet('${id}','tolerance',this.value)" placeholder="0" style="width:70px;"></label>
      <label>Unité affichée <input type="text" value="${qzEsc(q.unite)}" oninput="qzEdSet('${id}','unite',this.value)" placeholder="cm, €…" style="width:80px;"></label>
    </div><p class="hint" style="margin:4px 0 0;">Plusieurs réponses : séparez-les par « ; ». Fractions et décimaux égaux sont reconnus (3/4 = 0,75).</p>`;
  }
  if(q.type === 'courte'){
    specifique = `<div class="qz-reg-grid">
      <label style="flex:1;">Réponse(s) acceptée(s) <input type="text" value="${qzEsc(q.reponses)}" oninput="qzEdSet('${id}','reponses',this.value)" placeholder="ex. parallèles ; elles sont parallèles" style="min-width:240px;"></label>
      <label class="qz-check"><input type="checkbox" ${q.casse ? 'checked' : ''} onchange="qzEdSet('${id}','casse',this.checked)"> Respecter majuscules et accents</label>
    </div>`;
  }
  if(q.type === 'ouverte'){
    specifique = `
      <label class="qz-lab">Attendus / corrigé <span class="hint" style="margin:0;">(jamais montrés à l'élève avant la publication ; serviront aussi à la correction par l'IA)</span></label>
      <textarea rows="3" oninput="qzEdSet('${id}','attendus',this.value)" placeholder="Ce qu'une réponse complète doit contenir…">${qzEsc(q.attendus)}</textarea>
      <span class="qz-lab">Barème détaillé <span class="hint" style="margin:0;">(facultatif : les points de la question sont alors la somme des critères)</span></span>
      ${(q.criteres || []).map(c => `<div class="qz-sub">
        <input type="text" value="${qzEsc(c.texte)}" oninput="qzEdSousSet('${id}','criteres','${c.id}','texte',this.value)" placeholder="Critère (ex. calcul juste)">
        <input type="number" min="0" step="0.25" value="${c.points}" oninput="qzEdSousSet('${id}','criteres','${c.id}','points',parseFloat(this.value)||0)" style="width:70px;" title="Points"> pt
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','criteres','${c.id}')" title="Supprimer"><span class="gicon">close</span></button>
      </div>`).join('')}
      <button type="button" class="btn secondary qz-mini" onclick="qzEdSousAjouter('${id}','criteres')"><span class="gicon">add</span> Critère</button>
      <label class="qz-lab" style="margin-top:8px;">L'élève répond
        <select onchange="qzEdSet('${id}','reponse',this.value)">
          <option value="texte_photo"${(q.reponse || 'texte_photo') === 'texte_photo' ? ' selected' : ''}>au clavier ou en photographiant sa copie</option>
          <option value="texte"${q.reponse === 'texte' ? ' selected' : ''}>au clavier seulement</option>
          <option value="photo"${q.reponse === 'photo' ? ' selected' : ''}>en photographiant sa copie seulement</option>
        </select></label>`;
  }
  const explication = q.type === 'texte' ? '' : `
    <label class="qz-lab">Explication montrée avec la correction <span class="hint" style="margin:0;">(facultatif)</span></label>
    <textarea rows="2" oninput="qzEdSet('${id}','explication',this.value)" placeholder="Méthode, rappel de cours…">${qzEsc(q.explication)}</textarea>`;
  return enonce + specifique + explication;
}
function qzEdRender(){
  const box = document.getElementById('qzEdListe'); if(!box || !qzEd) return;
  qzEdRenderReglages();
  let num = 0;
  box.innerHTML = qzEd.questions.map((q, i) => {
    const t = qzType(q.type), ouverte = qzEdOuverte === q.id;
    if(q.type !== 'texte') num++;
    const numero = q.type === 'texte' ? '<span class="gicon">article</span>' : num;
    return `<div class="qz-card${ouverte ? ' open' : ''}${q.type === 'texte' ? ' qz-card-texte' : ''}" id="qzEdQ_${q.id}">
      <div class="qz-card-head" onclick="if(!event.target.closest('button,select,input'))qzEdToggle('${q.id}')">
        <span class="qz-num">${numero}</span>
        <span class="qz-type-pill"><span class="gicon">${t.icon}</span> ${t.label}</span>
        <span class="qz-resume" id="qzEdResume_${q.id}">${qzEdResume(q)}</span>
        ${q.type === 'texte' ? '' : `${qzEdCompSelect(q)}
          ${q.type === 'ouverte' && (q.criteres || []).length ? `<span class="qz-pts" id="qzEdPts_${q.id}">${qzNum(qzMax(q))} pts</span>`
            : `<span class="qz-pts-in"><input type="number" min="0" step="0.25" value="${q.points}" oninput="qzEdSet('${q.id}','points',parseFloat(this.value)||0)" title="Points"> pt</span>`}`}
        <span class="qz-actions">
          <button type="button" onclick="qzEdDeplacer('${q.id}',-1)" title="Monter" ${i === 0 ? 'disabled' : ''}><span class="gicon">arrow_upward</span></button>
          <button type="button" onclick="qzEdDeplacer('${q.id}',1)" title="Descendre" ${i === qzEd.questions.length - 1 ? 'disabled' : ''}><span class="gicon">arrow_downward</span></button>
          <button type="button" onclick="qzEdDupliquer('${q.id}')" title="Dupliquer"><span class="gicon">content_copy</span></button>
          <button type="button" onclick="qzEdSupprimer('${q.id}')" title="Supprimer"><span class="gicon">delete</span></button>
          <button type="button" onclick="qzEdToggle('${q.id}')" title="${ouverte ? 'Replier' : 'Modifier'}"><span class="gicon">${ouverte ? 'expand_less' : 'edit'}</span></button>
        </span>
      </div>
      ${ouverte ? `<div class="qz-card-body">${qzEdCorps(q)}</div>` : ''}
    </div>`;
  }).join('') || '<p class="hint" style="margin:6px 0;">Aucune question pour l\'instant : choisissez un type ci-dessous.</p>';
  qzEdMajTotal();
}
function qzEdHtml(){
  return `
    <div id="qzEdReglages"></div>
    <div class="qz-ed-bar"><span class="gicon">quiz</span> <span id="qzEdTotal"></span>
      <button type="button" class="btn secondary qz-mini" style="margin-left:auto;" onclick="qzApercu()"><span class="gicon">visibility</span> Tester comme un élève</button></div>
    <div id="qzEdListe"></div>
    <p class="hint" style="margin:12px 0 6px;font-weight:700;">Ajouter :</p>
    <div class="qz-add-row">${QZ_TYPES.map(t => `<button type="button" class="qz-add" onclick="qzEdAjouter('${t.id}')" title="${qzEsc(t.aide)}"><span class="gicon">${t.icon}</span> ${t.label}</button>`).join('')}</div>`;
}
function qzEdMonter(){
  const box = document.getElementById('devoirTypeQuestionnaireBox');
  if(!box) return;
  if(!qzEd) qzEdReset();
  if(!box.dataset.monte){ box.innerHTML = qzEdHtml(); box.dataset.monte = '1'; }
  qzEdRender();
}

/* =====================================================================
   RENDU D'UNE QUESTION (passation élève, aperçu professeur, correction)
   ===================================================================== */
// mode : 'passer' (modifiable), 'lecture' (copie rendue), 'corrige' (avec bonnes réponses)
function qzRenderSaisie(q, rep, mode, ctx){
  const dis = mode === 'passer' ? '' : 'disabled';
  const id = q.id, corr = mode === 'corrige';
  if(q.type === 'texte') return '';
  if(q.type === 'qcm'){
    const choix = qzOrdreChoix(q, ctx.reglages, ctx.seed);
    const coches = q.multiple ? (Array.isArray(rep) ? rep : []) : [rep];
    return `<div class="qz-choix">${choix.map(c => {
      const on = coches.includes(c.id);
      const cls = corr ? (c.correct ? ' juste' : on ? ' faux' : '') : '';
      return `<label class="qz-choice${on ? ' on' : ''}${cls}"><input type="${q.multiple ? 'checkbox' : 'radio'}" name="qzR_${ctx.pfx}${id}" ${on ? 'checked' : ''} ${dis}
        onchange="qzSaisieQcm('${id}','${c.id}',this.checked,${!!q.multiple})"><span>${qzMath(c.texte)}</span>${corr && c.correct ? '<span class="gicon qz-ok">check_circle</span>' : ''}</label>`;
    }).join('')}</div>${q.multiple && mode === 'passer' ? '<p class="hint" style="margin:4px 0 0;">Plusieurs réponses possibles.</p>' : ''}`;
  }
  if(q.type === 'vf'){
    const r = rep && typeof rep === 'object' ? rep : {};
    return `<div class="qz-vf">${(q.items || []).map(it => {
      const v = r[it.id];
      const etat = corr && it.vrai !== undefined ? (v === !!it.vrai ? ' juste' : ' faux') : '';
      return `<div class="qz-vf-row${etat}"><span class="qz-vf-txt">${qzMath(it.texte)}</span>
        <span class="qz-vf-btns">
          <button type="button" class="${v === true ? 'on' : ''}" ${dis} onclick="qzSaisieVf('${id}','${it.id}',true)">Vrai</button>
          <button type="button" class="${v === false ? 'on' : ''}" ${dis} onclick="qzSaisieVf('${id}','${it.id}',false)">Faux</button>
        </span>${corr && it.vrai !== undefined ? `<span class="qz-vf-sol">${it.vrai ? 'Vrai' : 'Faux'}</span>` : ''}</div>`;
    }).join('')}</div>`;
  }
  if(q.type === 'numerique' || q.type === 'courte'){
    const val = rep == null ? '' : String(rep);
    return `<div class="qz-num-row">
      <input type="text" class="qz-input" value="${qzEsc(val)}" ${dis} autocomplete="off" spellcheck="false" inputmode="${q.type === 'numerique' ? 'text' : 'text'}"
        oninput="qzSaisieTexte('${id}',this.value)" placeholder="${q.type === 'numerique' ? 'Votre réponse (ex. 3/4 ou 0,75)' : 'Votre réponse'}">
      ${q.unite ? `<span class="qz-unite">${qzEsc(q.unite)}</span>` : ''}
      ${q.type === 'numerique' ? `<span class="qz-num-apercu" id="qzNumAp_${ctx.pfx}${id}">${val && /\//.test(val) ? qzMath(val) : ''}</span>` : ''}
    </div>${corr && q.reponses ? `<p class="qz-sol"><span class="gicon">check_circle</span> Réponse attendue : ${qzListe(q.reponses).map(qzMath).join(' ou ')}</p>` : ''}`;
  }
  if(q.type === 'ouverte'){
    const r = rep && typeof rep === 'object' ? rep : { texte: typeof rep === 'string' ? rep : '' };
    const modeRep = q.reponse || 'texte_photo';
    const photos = (r.photos || []).map((p, i) => `<span class="qz-photo" data-path="${qzEsc(p)}"><img alt="Photo ${i + 1}" data-qzphoto="${qzEsc(p)}">${mode === 'passer' ? `<button type="button" onclick="qzPhotoRetirer('${id}',${i})" title="Retirer"><span class="gicon">close</span></button>` : ''}</span>`).join('');
    return `${modeRep !== 'photo' ? `<textarea class="qz-input" rows="5" ${dis} oninput="qzSaisieOuverte('${id}',this.value)" placeholder="Rédigez votre réponse… (fractions : 3/4, puissances : x^2)">${qzEsc(r.texte || '')}</textarea>
        ${mode === 'passer' ? `<div class="qz-apercu" id="qzOuvAp_${ctx.pfx}${id}">${r.texte ? qzMath(r.texte) : ''}</div>` : ''}` : ''}
      ${modeRep !== 'texte' ? `<div class="qz-photos">${photos}
        ${mode === 'passer' ? `<label class="btn secondary qz-mini" style="cursor:pointer;"><span class="gicon">photo_camera</span> ${modeRep === 'photo' ? 'Photographier ma réponse' : 'Ajouter une photo de ma copie'}<input type="file" accept="image/*" capture="environment" style="display:none;" onchange="qzPhotoAjouter('${id}',this)"></label>` : ''}
        ${mode !== 'passer' && !photos && modeRep === 'photo' ? '<span class="hint" style="margin:0;">Aucune photo.</span>' : ''}</div>` : ''}
      ${corr && q.attendus ? `<div class="qz-sol"><span class="gicon">fact_check</span> <div><b>Attendus :</b> ${qzMath(q.attendus)}</div></div>` : ''}`;
  }
  return '';
}
function qzEnonceHtml(q){
  return `${q.enonce ? `<div class="qz-enonce">${qzMath(q.enonce)}</div>` : ''}${q.image ? `<img class="qz-img" src="${qzEsc(q.image)}" alt="">` : ''}`;
}
// Photos privées (bucket devoirs-rendus) : liens signés, chargés après affichage.
async function qzChargerPhotos(root){
  const imgs = (root || document).querySelectorAll('img[data-qzphoto]:not([src])');
  for(const img of imgs){
    const { data } = await sb.storage.from('devoirs-rendus').createSignedUrl(img.dataset.qzphoto, 3600);
    if(data && data.signedUrl){ img.src = data.signedUrl; img.onclick = () => window.open(data.signedUrl, '_blank'); }
  }
}

/* =====================================================================
   PASSATION (élève) et APERÇU (professeur)
   ===================================================================== */
let qzP = null; // { apercu, devoirId, questions, reglages, copie, reponses, sorties, log, sale, fin, timer }
function qzPCtx(){ return { reglages: qzP.reglages, seed: qzP.copie ? qzP.copie.id : null, pfx: 'p' }; }

async function qzOuvrir(devoirId){
  showView('view-questionnaire');
  const root = document.getElementById('qzRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  const { data, error } = await sb.rpc('qz_passer', { p_devoir: devoirId });
  if(error){ root.innerHTML = `<p class="hint">${qzEsc(error.message)}</p><button class="btn secondary" data-qz-retour onclick="qzRetourEleve()">← Mes devoirs</button>`; return; }
  qzPInit(data, false);
}
function qzApercu(){
  if(!qzEd || !qzEd.questions.length){ niceAlert('Ajoutez d\'abord des questions.'); return; }
  const titre = (document.getElementById('devoirNewTitre') || {}).value || 'Questionnaire';
  const consigne = (document.getElementById('devoirNewConsigne') || {}).value || '';
  showView('view-questionnaire');
  qzPInit({ devoir: { id: 'apercu', titre, consigne, publie: false }, reglages: qzEd.reglages,
    questions: JSON.parse(JSON.stringify(qzEd.questions)), copie: null }, true);
}
function qzPInit(data, apercu){
  qzPStop();
  qzP = { apercu, data, devoirId: data.devoir.id, questions: data.questions || [], reglages: Object.assign({}, QZ_REGLAGES_DEFAUT, data.reglages || {}),
    copie: data.copie, reponses: (data.copie && data.copie.reponses) || {}, sorties: 0, log: [], sale: false, timer: null, decalage: 0 };
  if(data.copie && data.copie.now) qzP.decalage = new Date(data.copie.now).getTime() - Date.now();
  if(data.devoir.publie) return qzRenderResultats();
  if(!data.copie) return qzRenderAccueil();
  if(data.copie.statut === 'rendue') return qzRenderRendue();
  qzRenderPassation();
}
function qzRetourEleve(){
  qzPStop();
  if(qzP && qzP.apercu){ qzP = null; showView('view-devoirs-prof'); setActiveTopnav('devoirsprof'); const b = document.querySelector('.devoir-zone-create'); if(b) b.scrollIntoView({ block: 'start' }); return; }
  qzP = null;
  showView('view-devoirs-eleve'); setActiveTopnav('mesdevoirs');
  if(typeof renderDevoirsEleve === 'function') renderDevoirsEleve();
}
function qzEntete(sousTitre){
  const d = qzP.data.devoir;
  return `<div class="qz-top">
    <button class="back-btn qz-back" onclick="qzRetourEleve()">← ${qzP.apercu ? 'Retour à l\'éditeur' : 'Mes devoirs'}</button>
    ${qzP.apercu ? '<span class="qz-apercu-pill"><span class="gicon">visibility</span> Aperçu professeur : rien n\'est enregistré</span>' : ''}
  </div>
  <h1 class="qz-h1"><span class="gicon">quiz</span> ${qzEsc(d.titre)}</h1>
  ${sousTitre || ''}`;
}
function qzRenderAccueil(){
  const r = qzP.reglages, n = qzP.questions.filter(q => q.type !== 'texte').length, max = qzTotalMax(qzP.questions);
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-accueil">
      ${qzP.data.devoir.consigne ? `<p class="qz-consigne">${qzMath(qzP.data.devoir.consigne)}</p>` : ''}
      <div class="qz-infos">
        <span><span class="gicon">help</span> ${n} question${n > 1 ? 's' : ''}</span>
        <span><span class="gicon">scoreboard</span> ${qzNum(max)} point${max > 1 ? 's' : ''}, note sur ${r.note_sur}</span>
        ${r.mode === 'classe' ? `<span><span class="gicon">timer</span> ${r.duree} minutes</span>` : '<span><span class="gicon">home</span> À faire à la maison</span>'}
      </div>
      <ul class="qz-regles">
        <li>Vos réponses sont enregistrées automatiquement : vous pouvez fermer la page et reprendre plus tard${r.mode === 'classe' ? ' (le chronomètre continue de tourner)' : ''}.</li>
        <li>Une fois la copie rendue, vous ne pouvez plus la modifier.</li>
        ${r.mode === 'classe' ? `<li><b>Interrogation chronométrée</b> : à la fin des ${r.duree} minutes, votre copie est rendue automatiquement.</li>
        <li>Restez sur cette page : chaque sortie (autre onglet, autre application) est signalée à votre professeur.</li>` : ''}
        <li>Vous verrez votre note et la correction quand votre professeur publiera les résultats.</li>
      </ul>
      <button class="btn qz-go" onclick="qzCommencer()"><span class="gicon">play_arrow</span> Commencer</button>
    </div>`;
}
async function qzCommencer(){
  if(qzP.apercu){
    const dureeMs = qzP.reglages.mode === 'classe' ? (qzP.reglages.duree || 30) * 60000 : 0;
    qzP.copie = { id: 'apercu-' + Date.now(), statut: 'en_cours', deadline_at: dureeMs ? new Date(Date.now() + dureeMs).toISOString() : null, reponses: {} };
    return qzRenderPassation();
  }
  const { data, error } = await sb.rpc('qz_commencer', { p_devoir: qzP.devoirId });
  if(error){ await niceAlert(error.message); return; }
  qzPInit(data, false);
}
function qzNumeros(){
  const m = {}; let n = 0;
  qzP.questions.forEach(q => { if(q.type !== 'texte') m[q.id] = ++n; });
  return m;
}
function qzRenderPassation(){
  const ctx = qzPCtx(), ordre = qzOrdre(qzP.questions, qzP.reglages, ctx.seed);
  let n = 0;
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-bar" id="qzBar">
      <span id="qzProgress"></span>
      <span id="qzSave" class="qz-save"></span>
      <span id="qzChrono" class="qz-chrono"></span>
    </div>
    <div id="qzSortieMsg" class="qz-sortie" style="display:none;"></div>
    ${qzP.data.devoir.consigne ? `<p class="qz-consigne">${qzMath(qzP.data.devoir.consigne)}</p>` : ''}
    <div class="qz-questions">${ordre.map(q => {
      if(q.type === 'texte') return `<div class="qz-doc">${qzEnonceHtml(q)}</div>`;
      n++;
      const comp = qzComp(q.competence);
      return `<div class="qz-q" id="qzQ_${q.id}" data-qid="${q.id}">
        <div class="qz-q-head"><span class="qz-q-num">${n}</span><span class="qz-q-pts">${qzNum(qzMax(q))} pt${qzMax(q) > 1 ? 's' : ''}</span>${comp ? `<span class="qz-comp" style="--c:${comp.color}">${comp.label}</span>` : ''}</div>
        ${qzEnonceHtml(q)}
        <div class="qz-q-rep">${qzRenderSaisie(q, qzP.reponses[q.id], 'passer', ctx)}</div>
      </div>`;
    }).join('')}</div>
    <div class="qz-rendre-row">
      <button class="btn qz-go" onclick="qzRendre(false)"><span class="gicon">send</span> Rendre ma copie</button>
      <span class="hint" style="margin:0;">Vous pourrez encore la relire avant de confirmer.</span>
    </div>`;
  qzMajProgress();
  qzChargerPhotos(document.getElementById('qzRoot'));
  qzPStart();
}
function qzMajProgress(){
  const el = document.getElementById('qzProgress'); if(!el) return;
  const qs = qzP.questions.filter(q => q.type !== 'texte');
  const faites = qs.filter(q => qzRepondue(q, qzP.reponses[q.id])).length;
  el.innerHTML = `<b>${faites}</b> / ${qs.length} répondue${qs.length > 1 ? 's' : ''}`;
  qs.forEach(q => { const b = document.getElementById('qzQ_' + q.id); if(b) b.classList.toggle('fait', qzRepondue(q, qzP.reponses[q.id])); });
}
function qzRepondue(q, rep){
  if(rep == null || rep === '') return false;
  if(q.type === 'qcm') return q.multiple ? Array.isArray(rep) && rep.length > 0 : !!rep;
  if(q.type === 'vf') return (q.items || []).every(it => rep[it.id] !== undefined);
  if(q.type === 'ouverte') return !!((rep.texte && rep.texte.trim()) || (rep.photos && rep.photos.length));
  return String(rep).trim() !== '';
}
function qzModifie(){ qzP.sale = true; qzMajProgress(); qzSaveMsg('Modifications non enregistrées…'); clearTimeout(qzP.saveT); qzP.saveT = setTimeout(qzSauver, 1500); }
function qzSaisieQcm(qid, cid, coche, multiple){
  if(!qzP) return;
  if(multiple){ const a = new Set(Array.isArray(qzP.reponses[qid]) ? qzP.reponses[qid] : []); if(coche) a.add(cid); else a.delete(cid); qzP.reponses[qid] = Array.from(a); }
  else qzP.reponses[qid] = cid;
  document.querySelectorAll(`#qzQ_${qid} .qz-choice`).forEach(l => l.classList.toggle('on', l.querySelector('input').checked));
  qzModifie();
}
function qzSaisieVf(qid, iid, v){
  if(!qzP) return;
  const r = Object.assign({}, qzP.reponses[qid] || {}); r[iid] = v; qzP.reponses[qid] = r;
  const q = qzP.questions.find(x => x.id === qid);
  const box = document.querySelector(`#qzQ_${qid} .qz-q-rep`);
  if(box && q) box.innerHTML = qzRenderSaisie(q, r, 'passer', qzPCtx());
  qzModifie();
}
function qzSaisieTexte(qid, v){
  if(!qzP) return;
  qzP.reponses[qid] = v;
  const ap = document.getElementById('qzNumAp_p' + qid); if(ap) ap.innerHTML = /\//.test(v) ? qzMath(v) : '';
  qzModifie();
}
function qzSaisieOuverte(qid, v){
  if(!qzP) return;
  const r = Object.assign({}, qzP.reponses[qid] || {}); r.texte = v; qzP.reponses[qid] = r;
  const ap = document.getElementById('qzOuvAp_p' + qid); if(ap) ap.innerHTML = v ? qzMath(v) : '';
  qzModifie();
}
// Photo de la copie : réduite (1600 px, JPEG) avant l'envoi, pour rester légère sur téléphone.
async function qzPhotoAjouter(qid, input){
  const f = input.files && input.files[0]; if(!f || !qzP) return;
  if(qzP.apercu){ await niceAlert('En aperçu, les photos ne sont pas envoyées.'); return; }
  qzSaveMsg('Envoi de la photo…');
  try{
    const blob = await qzReduireImage(f, 1600);
    const path = `${currentUser.id}/qz/${qzP.devoirId}/${qid}-${Date.now()}.jpg`;
    const { error } = await sb.storage.from('devoirs-rendus').upload(path, blob, { contentType: 'image/jpeg', upsert: false });
    if(error) throw error;
    const r = Object.assign({}, qzP.reponses[qid] || {}); r.photos = (r.photos || []).concat(path); qzP.reponses[qid] = r;
    qzRafraichirQuestion(qid);
    qzModifie();
  }catch(e){ qzSaveMsg(''); await niceAlert('La photo n\'a pas pu être envoyée : ' + (e.message || e)); }
}
async function qzPhotoRetirer(qid, i){
  if(!qzP || !(await niceConfirm('Retirer cette photo ?'))) return;
  const r = Object.assign({}, qzP.reponses[qid] || {}); const p = (r.photos || [])[i];
  r.photos = (r.photos || []).filter((_, k) => k !== i); qzP.reponses[qid] = r;
  if(p && !qzP.apercu) sb.storage.from('devoirs-rendus').remove([p]);
  qzRafraichirQuestion(qid);
  qzModifie();
}
function qzRafraichirQuestion(qid){
  const q = qzP.questions.find(x => x.id === qid), box = document.querySelector(`#qzQ_${qid} .qz-q-rep`);
  if(q && box){ box.innerHTML = qzRenderSaisie(q, qzP.reponses[qid], 'passer', qzPCtx()); qzChargerPhotos(box); }
}
function qzReduireImage(file, maxDim){
  return new Promise((ok, ko) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, maxDim / Math.max(img.width, img.height));
      const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : ko(new Error('image illisible')), 'image/jpeg', 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); ko(new Error('image illisible')); };
    img.src = url;
  });
}
function qzSaveMsg(t, err){ const el = document.getElementById('qzSave'); if(el){ el.textContent = t; el.classList.toggle('err', !!err); } }
async function qzSauver(rendre){
  if(!qzP || !qzP.copie) return true;
  clearTimeout(qzP.saveT);
  if(qzP.apercu){ qzP.sale = false; qzSaveMsg('Aperçu : non enregistré'); return true; }
  if(!qzP.sale && !rendre) return true;
  qzSaveMsg(rendre ? 'Envoi de la copie…' : 'Enregistrement…');
  const { data, error } = await sb.rpc('qz_enregistrer', { p_copie: qzP.copie.id, p_reponses: qzP.reponses, p_sorties: qzP.sorties, p_log: qzP.log.length ? qzP.log : null, p_rendre: !!rendre });
  if(error){ qzSaveMsg('Non enregistré : ' + error.message, true); return false; }
  qzP.sale = false;
  if(data && data.now) qzP.decalage = new Date(data.now).getTime() - Date.now();
  qzSaveMsg('✓ Enregistré à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
  return true;
}
async function qzRendre(auto){
  if(!qzP || !qzP.copie) return;
  if(!auto){
    const qs = qzP.questions.filter(q => q.type !== 'texte'), num = qzNumeros();
    const vides = qs.filter(q => !qzRepondue(q, qzP.reponses[q.id])).map(q => num[q.id]);
    const msg = vides.length ? `Vous n'avez pas répondu ${vides.length > 1 ? 'aux questions ' + vides.join(', ') : 'à la question ' + vides[0]}.\n\nRendre quand même votre copie ? Vous ne pourrez plus la modifier.`
      : 'Rendre votre copie ? Vous ne pourrez plus la modifier.';
    if(!(await niceConfirm(msg))) return;
  }
  if(qzP.apercu){ qzPStop(); return qzRenderApercuCorrige(); }
  const ok = await qzSauver(true);
  if(!ok){ if(!auto) await niceAlert('La copie n\'a pas pu être envoyée. Vérifiez votre connexion puis réessayez.'); else setTimeout(() => qzRendre(true), 5000); return; }
  qzPStop();
  qzP.copie.statut = 'rendue';
  qzRenderRendue(auto);
}
function qzRenderRendue(auto){
  const ctx = qzPCtx(), ordre = qzOrdre(qzP.questions, qzP.reglages, ctx.seed), num = qzNumeros();
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-done"><span class="gicon">task_alt</span><div><b>${auto ? 'Temps écoulé : votre copie a été rendue automatiquement.' : 'Copie rendue !'}</b>
      <p>Votre note et la correction apparaîtront ici quand votre professeur publiera les résultats.</p></div></div>
    <p class="hint">Rappel de vos réponses :</p>
    <div class="qz-questions">${ordre.filter(q => q.type !== 'texte').map(q => `<div class="qz-q lecture"><div class="qz-q-head"><span class="qz-q-num">${num[q.id]}</span></div>${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, qzP.reponses[q.id], 'lecture', ctx)}</div></div>`).join('')}</div>`;
  qzChargerPhotos(document.getElementById('qzRoot'));
}
// Aperçu professeur : correction automatique immédiate, pour vérifier réponses et barème.
function qzRenderApercuCorrige(){
  const copie = { reponses: qzP.reponses, correction: {} }, s = qzScoreCopie(qzP.questions, copie, qzP.reglages), num = qzNumeros();
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-note-big"><span>${qzNum(s.total)} / ${qzNum(s.max)} points</span><small>${s.aCorriger ? `${s.aCorriger} question${s.aCorriger > 1 ? 's' : ''} ouverte${s.aCorriger > 1 ? 's' : ''} à corriger à la main` : `soit ${qzNum(s.note)} / ${s.sur}`}</small></div>
    <p class="hint">Voici ce que verra l'élève après la publication des résultats (correction automatique des questions fermées).</p>
    <div class="qz-questions">${qzP.questions.map(q => q.type === 'texte' ? `<div class="qz-doc">${qzEnonceHtml(q)}</div>` : qzCarteResultat(q, copie, num[q.id], { reglages: qzP.reglages, seed: null, pfx: 'a' })).join('')}</div>
    <div class="qz-rendre-row"><button class="btn secondary" onclick="qzApercu()"><span class="gicon">replay</span> Recommencer l'aperçu</button><button class="btn" onclick="qzRetourEleve()">Retour à l'éditeur</button></div>`;
}
function qzCarteResultat(q, copie, numero, ctx){
  const p = qzPoints(q, copie), max = qzMax(q), c = (copie.correction || {})[q.id] || {};
  const cls = p === null ? 'attente' : p >= max ? 'ok' : p > 0 ? 'partiel' : 'ko';
  const comp = qzComp(q.competence);
  return `<div class="qz-q res ${cls}">
    <div class="qz-q-head"><span class="qz-q-num">${numero}</span><span class="qz-res-pts">${p === null ? 'à corriger' : qzNum(p) + ' / ' + qzNum(max)}</span>${comp ? `<span class="qz-comp" style="--c:${comp.color}">${comp.label}</span>` : ''}</div>
    ${qzEnonceHtml(q)}
    <div class="qz-q-rep">${qzRenderSaisie(q, (copie.reponses || {})[q.id], 'corrige', ctx)}</div>
    ${c.commentaire ? `<div class="qz-comment"><span class="gicon">chat</span> ${qzMath(c.commentaire)}</div>` : ''}
    ${q.explication ? `<div class="qz-expl"><span class="gicon">lightbulb</span> <div>${qzMath(q.explication)}</div></div>` : ''}
  </div>`;
}
function qzRenderResultats(){
  const copie = qzP.copie || { reponses: {}, correction: {} }, ctx = qzPCtx(), num = qzNumeros();
  const s = qzScoreCopie(qzP.questions, copie, qzP.reglages);
  const note = copie.note != null ? Number(copie.note) : s.note;
  const comps = qzCompetencesCopie(qzP.questions, copie);
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-note-big"><span>${qzNum(note)} / ${s.sur}</span><small>${qzNum(s.total)} point${s.total > 1 ? 's' : ''} sur ${qzNum(s.max)}</small></div>
    ${Object.keys(comps).length ? `<div class="qz-comps">${QZ_COMPETENCES.filter(c => comps[c.id]).map(c => { const b = comps[c.id], pct = b.max ? Math.round(100 * b.obtenu / b.max) : 0;
      return `<div class="qz-comp-bar"><span>${c.label}</span><div><i style="width:${pct}%;background:${c.color};"></i></div><b>${pct} %</b></div>`; }).join('')}</div>` : ''}
    <div class="qz-questions">${qzP.questions.map(q => q.type === 'texte' ? `<div class="qz-doc">${qzEnonceHtml(q)}</div>` : qzCarteResultat(q, copie, num[q.id], ctx)).join('')}</div>`;
  qzChargerPhotos(document.getElementById('qzRoot'));
}

// Chrono, enregistrement périodique, sorties de page.
function qzPStart(){
  qzPStop();
  qzP.onVis = () => {
    if(!qzP || !qzP.copie || qzP.copie.statut !== 'en_cours') return;
    if(document.hidden){ qzP.sortieDebut = Date.now(); }
    else if(qzP.sortieDebut){
      const duree = Math.round((Date.now() - qzP.sortieDebut) / 1000); qzP.sortieDebut = null;
      if(qzP.reglages.mode !== 'classe') return;
      qzP.sorties++; qzP.log.push({ t: new Date().toISOString(), s: duree });
      const m = document.getElementById('qzSortieMsg');
      if(m){ m.style.display = 'flex'; m.innerHTML = `<span class="gicon">warning</span> Vous avez quitté la page ${qzP.sorties > 1 ? qzP.sorties + ' fois' : 'une fois'} (${duree} s). Votre professeur en est informé.`; }
      qzP.sale = true; qzSauver();
    }
  };
  document.addEventListener('visibilitychange', qzP.onVis);
  qzP.onUnload = e => { if(qzP && qzP.sale){ qzSauver(); e.preventDefault(); e.returnValue = ''; } };
  window.addEventListener('beforeunload', qzP.onUnload);
  qzP.timer = setInterval(qzTick, 1000);
  qzP.autoSave = setInterval(() => { if(qzP && qzP.sale) qzSauver(); }, 20000);
  qzTick();
}
function qzPStop(){
  if(!qzP) return;
  clearInterval(qzP.timer); clearInterval(qzP.autoSave); clearTimeout(qzP.saveT);
  if(qzP.onVis) document.removeEventListener('visibilitychange', qzP.onVis);
  if(qzP.onUnload) window.removeEventListener('beforeunload', qzP.onUnload);
  qzP.onVis = qzP.onUnload = null;
}
function qzTick(){
  if(!qzP || !qzP.copie) return;
  const el = document.getElementById('qzChrono');
  if(!document.getElementById('qzRoot') || !document.getElementById('view-questionnaire').classList.contains('active')){
    if(qzP.sale) qzSauver();
    return;
  }
  if(!qzP.copie.deadline_at){ if(el) el.textContent = ''; return; }
  const reste = new Date(qzP.copie.deadline_at).getTime() - (Date.now() + qzP.decalage);
  if(el){
    const s = Math.max(0, Math.floor(reste / 1000));
    el.innerHTML = `<span class="gicon">timer</span> ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    el.classList.toggle('urgent', s <= 120);
  }
  if(reste <= 0 && !qzP.finEnCours){ qzP.finEnCours = true; qzRendre(true); }
}

/* =====================================================================
   CORRECTION (professeur) : copie par copie, question par question
   ===================================================================== */
let qzC = null; // { devoir, questionnaire, eleves, copies:Map(studentId→copie), vue, eleveSel, questionSel }
async function qzOuvrirCorrection(devoirId, vue){
  showView('view-qz-correction'); setActiveTopnav('devoirsprof');
  const root = document.getElementById('qzCorrRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  const { data: devoir, error } = await sb.from('devoirs').select('*, classes(nom,niveau)').eq('id', devoirId).single();
  if(error || !devoir){ root.innerHTML = '<p class="hint">Devoir introuvable.</p>'; return; }
  const [{ data: qz }, { data: copies }, eleves] = await Promise.all([
    sb.from('questionnaires').select('*').eq('id', devoir.questionnaire_id).maybeSingle(),
    sb.from('qz_copies').select('*').eq('devoir_id', devoirId),
    qzElevesDevoir(devoir),
  ]);
  if(!qz){ root.innerHTML = '<p class="hint">Questionnaire introuvable.</p>'; return; }
  qzC = { devoir, qz, reglages: Object.assign({}, QZ_REGLAGES_DEFAUT, qz.reglages || {}), eleves,
    copies: new Map((copies || []).map(c => [c.student_id, c])), vue: vue || 'copies', eleveSel: null, questionSel: null, saveT: {} };
  const premiere = eleves.find(e => { return qzEstRendue(qzC.copies.get(e.id)); });
  qzC.eleveSel = premiere ? premiere.id : (eleves[0] && eleves[0].id);
  qzC.questionSel = (qz.questions.find(q => q.type === 'ouverte') || qz.questions.find(q => q.type !== 'texte') || {}).id;
  qzCRender();
}
async function qzElevesDevoir(devoir){
  let req = sb.from('class_students').select('student_id, profiles(id,nom,prenom)').eq('class_id', devoir.class_id);
  if(devoir.student_ids && devoir.student_ids.length) req = req.in('student_id', devoir.student_ids);
  const { data } = await req;
  return (data || []).map(r => r.profiles).filter(Boolean)
    .map(p => ({ id: p.id, nom: p.nom || '', prenom: p.prenom || '', label: ((p.nom || '') + ' ' + (p.prenom || '')).trim() || '(sans nom)' }))
    .sort((a, b) => a.label.localeCompare(b.label, 'fr'));
}
function qzCQuestions(){ return (qzC.qz.questions || []).filter(q => q.type !== 'texte'); }
function qzCStatsEleve(e){
  const c = qzC.copies.get(e.id);
  if(!c) return { etat: 'absent', label: 'Pas commencé' };
  if(!qzEstRendue(c)) return { etat: 'encours', label: 'En cours', c };
  const s = qzScoreCopie(qzC.qz.questions, c, qzC.reglages);
  return { etat: s.aCorriger ? 'acorriger' : 'corrige', label: s.aCorriger ? `${s.aCorriger} à corriger` : qzNum(s.note) + ' / ' + s.sur, c, s };
}
function qzCRender(){
  const root = document.getElementById('qzCorrRoot'); if(!root || !qzC) return;
  const d = qzC.devoir, rendues = qzC.eleves.filter(e => { return qzEstRendue(qzC.copies.get(e.id)); });
  const aCorriger = rendues.filter(e => qzScoreCopie(qzC.qz.questions, qzC.copies.get(e.id), qzC.reglages).aCorriger).length;
  const encours = qzC.eleves.filter(e => { return !qzEstRendue(qzC.copies.get(e.id)) && qzC.copies.has(e.id); }).length;
  const publie = !!d.qz_publie_at;
  root.innerHTML = `
    <span class="back-btn" onclick="qzCFermer()">← Devoirs</span>
    <div class="qz-c-head">
      <div><h1 style="margin:4px 0 2px;"><span class="gicon">quiz</span> ${qzEsc(d.titre)}</h1>
        <p class="hint" style="margin:0;">${qzEsc(d.classes ? d.classes.nom : '')} · ${qzC.reglages.mode === 'classe' ? `interrogation en classe (${qzC.reglages.duree} min)` : 'à la maison'} · ${qzNum(qzTotalMax(qzC.qz.questions))} points, note sur ${qzC.reglages.note_sur}</p></div>
      <div class="qz-c-stats">
        <span><b>${rendues.length}</b>/${qzC.eleves.length} rendue${rendues.length > 1 ? 's' : ''}</span>
        ${encours ? `<span><b>${encours}</b> en cours</span>` : ''}
        <span class="${aCorriger ? 'warn' : ''}"><b>${aCorriger}</b> à corriger</span>
        <span class="${publie ? 'ok' : ''}">${publie ? `<span class="gicon">visibility</span> Résultats publiés le ${new Date(d.qz_publie_at).toLocaleDateString('fr-FR')}` : '<span class="gicon">visibility_off</span> Résultats non publiés'}</span>
      </div>
    </div>
    <div class="qz-c-tools">
      <div class="qz-tabs">
        <button class="${qzC.vue === 'copies' ? 'on' : ''}" onclick="qzCVue('copies')"><span class="gicon">person</span> Copie par copie</button>
        <button class="${qzC.vue === 'questions' ? 'on' : ''}" onclick="qzCVue('questions')"><span class="gicon">format_list_numbered</span> Question par question</button>
      </div>
      <span style="flex:1;"></span>
      <label class="qz-check" title="Plus aucun élève ne peut commencer ; ceux qui ont commencé peuvent seulement rendre."><input type="checkbox" ${qzC.reglages.ferme ? 'checked' : ''} onchange="qzCFermerAcces(this.checked)"> Questionnaire fermé</label>
      ${publie ? `<button class="btn secondary" onclick="qzCPublier(false)"><span class="gicon">visibility_off</span> Retirer la publication</button>`
        : `<button class="btn" onclick="qzCPublier(true)"><span class="gicon">publish</span> Publier les résultats</button>`}
    </div>
    <div id="qzCBody"></div>`;
  if(qzC.vue === 'copies') qzCRenderCopies(); else qzCRenderQuestions();
}
function qzCVue(v){ qzC.vue = v; qzCRender(); }
function qzCFermer(){ qzC = null; showView('view-devoirs-prof'); setActiveTopnav('devoirsprof'); if(typeof refreshDevoirsProfListing === 'function') refreshDevoirsProfListing(); }
async function qzCFermerAcces(ferme){
  qzC.reglages.ferme = ferme;
  const reglages = Object.assign({}, qzC.qz.reglages || {}, { ferme });
  const { error } = await sb.from('questionnaires').update({ reglages }).eq('id', qzC.qz.id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  qzC.qz.reglages = reglages;
}
// Zone de notation d'une question dans une copie (utilisée par les deux vues).
function qzCNoteur(q, e, c){
  const auto = qzNoteAuto(q, (c.reponses || {})[q.id]), corr = (c.correction || {})[q.id] || {};
  const p = qzPoints(q, c), max = qzMax(q), manuel = corr.points !== undefined && corr.points !== null && corr.points !== '';
  const cle = e.id + '|' + q.id;
  const criteres = q.type === 'ouverte' && (q.criteres || []).length ? `<div class="qz-crit">${q.criteres.map(k => {
    const on = (corr.criteres || []).includes(k.id);
    return `<label class="${on ? 'on' : ''}"><input type="checkbox" ${on ? 'checked' : ''} onchange="qzCCritere('${cle}','${k.id}',this.checked)"> ${qzMath(k.texte)} <b>${qzNum(k.points)}</b></label>`;
  }).join('')}</div>` : '';
  return `<div class="qz-noteur ${p === null ? 'attente' : p >= max ? 'ok' : p > 0 ? 'partiel' : 'ko'}" id="qzN_${e.id}_${q.id}">
    ${criteres}
    <div class="qz-noteur-row">
      <span class="qz-pts-in"><input type="number" step="0.25" min="0" max="${max}" value="${p === null ? '' : p}" placeholder="?" onchange="qzCPoints('${cle}',this.value)"> / ${qzNum(max)}</span>
      ${auto !== null ? `<span class="qz-auto">${manuel ? `corrigé à la main (auto : ${qzNum(auto)}) <button type="button" class="qz-link" onclick="qzCPoints('${cle}','')">rétablir</button>` : '<span class="gicon">bolt</span> correction automatique'}</span>` : ''}
      ${q.type !== 'ouverte' ? '' : `<span class="qz-quick">${[0, max / 2, max].filter((v, i, a) => a.indexOf(v) === i).map(v => `<button type="button" onclick="qzCPoints('${cle}','${v}')">${qzNum(v)}</button>`).join('')}</span>`}
      <input type="text" class="qz-comment-in" value="${qzEsc(corr.commentaire || '')}" placeholder="Commentaire pour l'élève (facultatif)" onchange="qzCCommentaire('${cle}',this.value)">
    </div>
  </div>`;
}
function qzCCopieDe(cle){ const [eid, qid] = cle.split('|'); return { e: qzC.eleves.find(x => x.id === eid), c: qzC.copies.get(eid), q: qzC.qz.questions.find(x => x.id === qid) }; }
function qzCMajCorrection(cle, f, rerender = true){
  const { e, c, q } = qzCCopieDe(cle); if(!c || !q) return;
  c.correction = Object.assign({}, c.correction || {});
  c.correction[q.id] = Object.assign({}, c.correction[q.id] || {});
  f(c.correction[q.id], q);
  const k = c.correction[q.id];
  if((k.points === undefined || k.points === null || k.points === '') && !k.commentaire && !(k.criteres || []).length) delete c.correction[q.id];
  else { k.source = 'prof'; k.valide = true; }
  // Redessiné après l'événement en cours (un « change » déclenché par la perte du focus peut
  // arriver pendant qu'un autre redessin remplace déjà la zone).
  if(rerender) setTimeout(() => { const box = document.getElementById(`qzN_${e.id}_${q.id}`); if(box && box.isConnected) box.outerHTML = qzCNoteur(q, e, c); }, 0);
  qzCMajListe();
  qzCSauverCopie(c);
}
function qzCPoints(cle, v){
  qzCMajCorrection(cle, (k, q) => {
    if(v === '' || v === null){ delete k.points; return; }
    const n = parseFloat(String(v).replace(',', '.'));
    k.points = isNaN(n) ? undefined : Math.max(0, Math.min(qzMax(q), n));
  });
}
function qzCCommentaire(cle, v){ qzCMajCorrection(cle, k => { k.commentaire = v.trim() || undefined; }, false); }
function qzCCritere(cle, kid, on){
  qzCMajCorrection(cle, (k, q) => {
    const s = new Set(k.criteres || []); if(on) s.add(kid); else s.delete(kid);
    k.criteres = Array.from(s);
    k.points = (q.criteres || []).filter(x => s.has(x.id)).reduce((t, x) => t + (Number(x.points) || 0), 0);
  });
}
function qzCSauverCopie(c){
  clearTimeout(qzC.saveT[c.id]);
  qzC.saveT[c.id] = setTimeout(async () => {
    const s = qzScoreCopie(qzC.qz.questions, c, qzC.reglages);
    const { error } = await sb.from('qz_copies').update({ correction: c.correction, total: s.aCorriger ? null : s.total, note: s.aCorriger ? null : s.note, updated_at: new Date().toISOString() }).eq('id', c.id);
    const m = document.getElementById('qzCSave');
    if(m) m.textContent = error ? 'Erreur : ' + error.message : '✓ Enregistré';
  }, 600);
}
function qzCMajListe(){
  document.querySelectorAll('[data-qzc-eleve]').forEach(el => {
    const e = qzC.eleves.find(x => x.id === el.dataset.qzcEleve); if(!e) return;
    const st = qzCStatsEleve(e); const s = el.querySelector('.qz-etat'); if(s){ s.textContent = st.label; s.className = 'qz-etat ' + st.etat; }
  });
  const tot = document.getElementById('qzCTotal');
  if(tot && qzC.vue === 'copies'){ const c = qzC.copies.get(qzC.eleveSel); if(c) tot.innerHTML = qzCTotalHtml(c); }
}
function qzCTotalHtml(c){
  const s = qzScoreCopie(qzC.qz.questions, c, qzC.reglages);
  return s.aCorriger ? `<b>${qzNum(s.total)}</b> pts provisoires · ${s.aCorriger} question${s.aCorriger > 1 ? 's' : ''} à corriger` : `<b>${qzNum(s.note)} / ${s.sur}</b> (${qzNum(s.total)} / ${qzNum(s.max)} pts)`;
}
function qzCRenderCopies(){
  const body = document.getElementById('qzCBody');
  const e = qzC.eleves.find(x => x.id === qzC.eleveSel), c = e && qzC.copies.get(e.id);
  const i = qzC.eleves.findIndex(x => x.id === qzC.eleveSel);
  const num = {}; let n = 0; qzC.qz.questions.forEach(q => { if(q.type !== 'texte') num[q.id] = ++n; });
  const ctx = { reglages: qzC.reglages, seed: null, pfx: 'c' };
  body.innerHTML = `<div class="qz-c-grid">
    <div class="qz-c-list">${qzC.eleves.map(x => { const st = qzCStatsEleve(x); const cp = qzC.copies.get(x.id);
      return `<button class="${x.id === qzC.eleveSel ? 'on' : ''}" data-qzc-eleve="${x.id}" onclick="qzCEleve('${x.id}')"><span>${qzEsc(x.label)}</span>
        <span class="qz-etat ${st.etat}">${st.label}</span>${cp && cp.sorties ? `<span class="qz-sorties" title="Sorties de la page pendant l'interrogation">⚠ ${cp.sorties}</span>` : ''}</button>`; }).join('') || '<p class="hint">Aucun élève.</p>'}</div>
    <div class="qz-c-copie">${!e ? '' : !c ? `<p class="hint">${qzEsc(e.label)} n'a pas encore commencé.</p>` : `
      <div class="qz-c-copie-head">
        <b>${qzEsc(e.label)}</b>
        <span class="hint" style="margin:0;">${c.statut === 'rendue' ? 'rendue le ' + new Date(c.submitted_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : qzEstRendue(c) ? '<b style="color:#B8511F;">temps écoulé, copie non rendue par l\'élève</b>' : '<b style="color:#0C5BA0;">en cours</b>'}${c.started_at ? ' · commencée à ' + new Date(c.started_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
        ${c.sorties ? `<span class="qz-sorties" title="${(c.sorties_log || []).map(l => new Date(l.t).toLocaleTimeString('fr-FR') + ' (' + l.s + ' s)').join(', ')}">⚠ ${c.sorties} sortie${c.sorties > 1 ? 's' : ''} de la page</span>` : ''}
        <span style="flex:1;"></span>
        ${qzEstRendue(c) ? `<button class="btn secondary qz-mini" onclick="qzCRouvrir('${c.id}')"><span class="gicon">lock_open</span> Rouvrir la copie</button>` : ''}
      </div>
      <div class="qz-c-total" id="qzCTotal">${qzCTotalHtml(c)}</div>
      ${qzC.qz.questions.map(q => q.type === 'texte' ? '' : `<div class="qz-q corr">
        <div class="qz-q-head"><span class="qz-q-num">${num[q.id]}</span><span class="qz-type-pill"><span class="gicon">${qzType(q.type).icon}</span> ${qzType(q.type).label}</span></div>
        ${qzEnonceHtml(q)}
        <div class="qz-q-rep">${qzRenderSaisie(q, (c.reponses || {})[q.id], 'corrige', ctx)}</div>
        ${qzCNoteur(q, e, c)}
      </div>`).join('')}
      <div class="qz-c-nav"><button class="btn secondary" ${i <= 0 ? 'disabled' : ''} onclick="qzCEleveDelta(-1)">← Précédent</button><span id="qzCSave" class="hint" style="margin:0;"></span><button class="btn" ${i >= qzC.eleves.length - 1 ? 'disabled' : ''} onclick="qzCEleveDelta(1)">Suivant →</button></div>`}
    </div></div>`;
  qzChargerPhotos(body);
}
function qzCEleve(id){ qzC.eleveSel = id; qzCRenderCopies(); document.querySelector('.qz-c-copie')?.scrollIntoView({ block: 'nearest' }); }
function qzCEleveDelta(d){ const i = qzC.eleves.findIndex(x => x.id === qzC.eleveSel) + d; if(qzC.eleves[i]){ qzCEleve(qzC.eleves[i].id); window.scrollTo({ top: document.getElementById('qzCBody').offsetTop - 70, behavior: 'smooth' }); } }
async function qzCRouvrir(copieId){
  const min = qzC.reglages.mode === 'classe' ? await nicePrompt('Rouvrir cette copie : l\'élève pourra modifier ses réponses puis la rendre à nouveau.\n\nDurée accordée (minutes) ? Laissez vide pour ne pas limiter.', '10') : '';
  if(min === null) return;
  if(qzC.reglages.mode !== 'classe' && !(await niceConfirm('Rouvrir cette copie ? L\'élève pourra modifier ses réponses puis la rendre à nouveau.'))) return;
  const { error } = await sb.rpc('qz_rouvrir', { p_copie: copieId, p_minutes: parseInt(min, 10) || null });
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  const { data } = await sb.from('qz_copies').select('*').eq('id', copieId).single();
  if(data) qzC.copies.set(data.student_id, data);
  qzCRender();
}
function qzCRenderQuestions(){
  const body = document.getElementById('qzCBody');
  const qs = qzCQuestions(), q = qs.find(x => x.id === qzC.questionSel) || qs[0];
  if(!q){ body.innerHTML = '<p class="hint">Aucune question.</p>'; return; }
  qzC.questionSel = q.id;
  const rendues = qzC.eleves.filter(e => { return qzEstRendue(qzC.copies.get(e.id)); });
  const ctx = { reglages: qzC.reglages, seed: null, pfx: 'k' };
  const moy = rendues.length ? rendues.reduce((s, e) => s + (qzPoints(q, qzC.copies.get(e.id)) || 0), 0) / rendues.length : 0;
  let stats = '';
  if(q.type === 'qcm' && rendues.length){
    stats = `<div class="qz-stats">${(q.choix || []).map((ch, i) => {
      const nb = rendues.filter(e => { const r = (qzC.copies.get(e.id).reponses || {})[q.id]; return Array.isArray(r) ? r.includes(ch.id) : r === ch.id; }).length;
      const pct = Math.round(100 * nb / rendues.length);
      return `<div class="qz-stat${ch.correct ? ' juste' : ''}"><span>${String.fromCharCode(65 + i)}. ${qzMath(ch.texte)}</span><div><i style="width:${pct}%"></i></div><b>${nb}</b></div>`;
    }).join('')}</div>`;
  }
  body.innerHTML = `<div class="qz-q-picker">${qs.map((x, i) => {
      const nbA = rendues.filter(e => qzPoints(x, qzC.copies.get(e.id)) === null).length;
      return `<button class="${x.id === q.id ? 'on' : ''}" onclick="qzCQuestion('${x.id}')">Q${i + 1}${nbA ? `<span class="qz-badge">${nbA}</span>` : ''}</button>`; }).join('')}</div>
    <div class="qz-q corr qz-q-ref">
      <div class="qz-q-head"><span class="qz-type-pill"><span class="gicon">${qzType(q.type).icon}</span> ${qzType(q.type).label}</span><span class="qz-q-pts">${qzNum(qzMax(q))} pts · moyenne ${qzNum(moy)}</span></div>
      ${qzEnonceHtml(q)}
      ${q.type === 'ouverte' && q.attendus ? `<div class="qz-sol"><span class="gicon">fact_check</span> <div><b>Attendus :</b> ${qzMath(q.attendus)}</div></div>` : ''}
      ${stats}
    </div>
    <p class="hint" id="qzCSave" style="margin:4px 0;"></p>
    <div class="qz-par-q">${rendues.map(e => { const c = qzC.copies.get(e.id);
      return `<div class="qz-par-q-row"><div class="qz-par-q-nom">${qzEsc(e.label)}</div>
        <div class="qz-par-q-rep">${qzRenderSaisie(q, (c.reponses || {})[q.id], 'corrige', ctx)}</div>
        ${qzCNoteur(q, e, c)}</div>`; }).join('') || '<p class="hint">Aucune copie rendue pour l\'instant.</p>'}</div>`;
  qzChargerPhotos(body);
}
function qzCQuestion(id){ qzC.questionSel = id; qzCRenderQuestions(); }
async function qzCPublier(publier){
  const rendues = qzC.eleves.map(e => qzC.copies.get(e.id)).filter(c => qzEstRendue(c));
  if(publier){
    const incompletes = rendues.filter(c => qzScoreCopie(qzC.qz.questions, c, qzC.reglages).aCorriger).length;
    const encours = qzC.eleves.map(e => qzC.copies.get(e.id)).filter(c => c && !qzEstRendue(c)).length;
    if(incompletes){ await niceAlert(`${incompletes} copie${incompletes > 1 ? 's ont' : ' a'} encore des questions à corriger. Terminez la correction avant de publier.`); return; }
    const msg = `Publier les résultats ? Les élèves verront leur note, leurs points par question, vos commentaires et le corrigé.` + (encours ? `\n\n${encours} copie${encours > 1 ? 's sont' : ' est'} encore en cours : ${encours > 1 ? 'elles' : 'elle'} ne ${encours > 1 ? 'seront' : 'sera'} pas notée${encours > 1 ? 's' : ''}.` : '');
    if(!(await niceConfirm(msg))) return;
    for(const c of rendues){
      const s = qzScoreCopie(qzC.qz.questions, c, qzC.reglages);
      const maj = { total: s.total, note: s.note };
      if(c.statut !== 'rendue'){ maj.statut = 'rendue'; maj.submitted_at = c.deadline_at; } // temps écoulé sans remise
      await sb.from('qz_copies').update(maj).eq('id', c.id);
      Object.assign(c, maj);
      await sb.from('devoirs_rendus').update({ note: s.sur === 20 ? s.note : null }).eq('devoir_id', qzC.devoir.id).eq('student_id', c.student_id);
    }
  } else if(!(await niceConfirm('Retirer la publication ? Les élèves ne verront plus leur note ni la correction.'))) return;
  const at = publier ? new Date().toISOString() : null;
  const { error } = await sb.from('devoirs').update({ qz_publie_at: at }).eq('id', qzC.devoir.id);
  if(error){ await niceAlert('Erreur : ' + error.message); return; }
  qzC.devoir.qz_publie_at = at;
  qzCRender();
}

/* =====================================================================
   CARNET DE NOTES (professeur)
   ===================================================================== */
let qzK = null;
async function qzOuvrirCarnet(){
  showView('view-qz-carnet'); setActiveTopnav('devoirsprof');
  const root = document.getElementById('qzCarnetRoot');
  const classes = accountClassesList || [];
  if(!qzK) qzK = { classId: classes[0] && classes[0].id, vue: 'notes', absent: '' };
  root.innerHTML = `<span class="back-btn" onclick="showView('view-devoirs-prof');setActiveTopnav('devoirsprof');">← Devoirs</span>
    <h1 style="margin:6px 0 4px;"><span class="gicon">menu_book</span> Carnet de notes</h1>
    <p style="color:var(--ink-soft);max-width:75ch;">Les notes des questionnaires, par classe. « Copier » place la colonne dans le presse-papiers, dans l'ordre alphabétique des élèves, prête à être collée dans votre logiciel de notes.</p>
    <div class="qz-c-tools">
      <select id="qzKClasse" onchange="qzK.classId=this.value;qzCarnetCharger()">${classes.map(c => `<option value="${c.id}"${c.id === qzK.classId ? ' selected' : ''}>${qzEsc(c.label)}</option>`).join('') || '<option value="">Aucune classe</option>'}</select>
      <div class="qz-tabs"><button id="qzKTabNotes" onclick="qzCarnetVue('notes')"><span class="gicon">grade</span> Notes</button><button id="qzKTabComp" onclick="qzCarnetVue('competences')"><span class="gicon">insights</span> Compétences</button></div>
      <label class="hint" style="margin:0;display:flex;align-items:center;gap:6px;">Sans copie rendue :
        <select onchange="qzK.absent=this.value;qzCarnetRender()"><option value="">case vide</option><option value="Abs"${qzK.absent === 'Abs' ? ' selected' : ''}>Abs</option><option value="0"${qzK.absent === '0' ? ' selected' : ''}>0</option></select></label>
    </div>
    <div id="qzKBody"><p class="hint">Chargement…</p></div>`;
  qzCarnetCharger();
}
function qzCarnetVue(v){ qzK.vue = v; qzCarnetRender(); }
async function qzCarnetCharger(){
  const body = document.getElementById('qzKBody'); if(!body) return;
  if(!qzK.classId){ body.innerHTML = '<p class="hint">Aucune classe.</p>'; return; }
  body.innerHTML = '<p class="hint">Chargement…</p>';
  const { data: devoirs } = await sb.from('devoirs').select('id,titre,date_depot,date_limite,created_at,questionnaire_id,qz_publie_at,student_ids,class_id')
    .eq('class_id', qzK.classId).eq('type', 'questionnaire').order('created_at', { ascending: true });
  const ids = (devoirs || []).map(d => d.id), qids = (devoirs || []).map(d => d.questionnaire_id).filter(Boolean);
  const [{ data: copies }, { data: qzs }, eleves] = await Promise.all([
    ids.length ? sb.from('qz_copies').select('*').in('devoir_id', ids) : { data: [] },
    qids.length ? sb.from('questionnaires').select('id,questions,reglages').in('id', qids) : { data: [] },
    qzElevesDevoir({ class_id: qzK.classId }),
  ]);
  qzK.devoirs = devoirs || []; qzK.eleves = eleves;
  qzK.qz = new Map((qzs || []).map(q => [q.id, q]));
  qzK.copies = new Map((copies || []).map(c => [c.devoir_id + '|' + c.student_id, c]));
  qzCarnetRender();
}
function qzCarnetCellule(d, e){
  const c = qzK.copies.get(d.id + '|' + e.id), qz = qzK.qz.get(d.questionnaire_id);
  if(!qzEstRendue(c) || !qz) return { txt: qzK.absent, val: null, cls: 'vide' };
  const s = qzScoreCopie(qz.questions, c, Object.assign({}, QZ_REGLAGES_DEFAUT, qz.reglages || {}));
  if(s.aCorriger) return { txt: '', val: null, cls: 'attente', title: s.aCorriger + ' question(s) à corriger' };
  return { txt: qzNum(s.note), val: s.note, cls: '' };
}
function qzCarnetRender(){
  const body = document.getElementById('qzKBody'); if(!body || !qzK.devoirs) return;
  document.getElementById('qzKTabNotes')?.classList.toggle('on', qzK.vue === 'notes');
  document.getElementById('qzKTabComp')?.classList.toggle('on', qzK.vue === 'competences');
  if(!qzK.devoirs.length){ body.innerHTML = '<p class="hint">Aucun questionnaire donné à cette classe pour l\'instant.</p>'; return; }
  if(qzK.vue === 'competences') return qzCarnetCompetences(body);
  const cibles = d => !d.student_ids || !d.student_ids.length ? null : new Set(d.student_ids);
  body.innerHTML = `<div class="qz-carnet-wrap"><table class="qz-carnet">
    <thead><tr><th>Élève</th>${qzK.devoirs.map((d, i) => { const qz = qzK.qz.get(d.questionnaire_id); const sur = qz ? Object.assign({}, QZ_REGLAGES_DEFAUT, qz.reglages || {}).note_sur : 20;
      return `<th><button class="qz-link" onclick="qzOuvrirCorrection('${d.id}')" title="Ouvrir la correction">${qzEsc(d.titre)}</button><small>/${sur}${d.qz_publie_at ? '' : ' · non publié'}</small>
        <button class="btn secondary qz-mini" onclick="qzCarnetCopier(${i}, this)"><span class="gicon">content_copy</span> Copier</button></th>`; }).join('')}</tr></thead>
    <tbody>${qzK.eleves.map(e => `<tr><td>${qzEsc(e.label)}</td>${qzK.devoirs.map(d => { const cb = cibles(d);
      if(cb && !cb.has(e.id)) return '<td class="nc" title="Non concerné">–</td>';
      const x = qzCarnetCellule(d, e); return `<td class="${x.cls}"${x.title ? ` title="${x.title}"` : ''}>${x.cls === 'attente' ? '<span class="gicon">hourglass_top</span>' : qzEsc(x.txt)}</td>`; }).join('')}</tr>`).join('')}</tbody>
    <tfoot><tr><td>Moyenne</td>${qzK.devoirs.map(d => { const v = qzK.eleves.map(e => qzCarnetCellule(d, e).val).filter(x => x !== null);
      return `<td>${v.length ? qzNum(v.reduce((a, b) => a + b, 0) / v.length) : ''}</td>`; }).join('')}</tr></tfoot>
  </table></div>`;
}
async function qzCarnetCopier(i, btn){
  const d = qzK.devoirs[i]; if(!d) return;
  const cb = !d.student_ids || !d.student_ids.length ? null : new Set(d.student_ids);
  const lignes = qzK.eleves.map(e => cb && !cb.has(e.id) ? '' : qzCarnetCellule(d, e).txt);
  const texte = lignes.join('\n');
  try{ await navigator.clipboard.writeText(texte); }
  catch(_){ const t = document.createElement('textarea'); t.value = texte; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
  const old = btn.innerHTML; btn.innerHTML = '<span class="gicon">check</span> Copié'; setTimeout(() => { btn.innerHTML = old; }, 1600);
}
function qzCarnetCompetences(body){
  const niveau = pct => pct === null ? '' : pct >= 80 ? 'tb' : pct >= 60 ? 's' : pct >= 40 ? 'f' : 'i';
  const bilan = e => {
    const b = {};
    qzK.devoirs.forEach(d => {
      const c = qzK.copies.get(d.id + '|' + e.id), qz = qzK.qz.get(d.questionnaire_id);
      if(!qzEstRendue(c) || !qz) return;
      const x = qzCompetencesCopie(qz.questions, c);
      Object.keys(x).forEach(k => { b[k] = b[k] || { obtenu: 0, max: 0 }; b[k].obtenu += x[k].obtenu; b[k].max += x[k].max; });
    });
    return b;
  };
  const utilisees = new Set();
  qzK.qz.forEach(qz => (qz.questions || []).forEach(q => { if(q.competence) utilisees.add(q.competence); }));
  const comps = QZ_COMPETENCES.filter(c => utilisees.has(c.id));
  if(!comps.length){ body.innerHTML = '<p class="hint">Aucune question n\'est encore rattachée à une compétence (menu « Compétence… » de chaque question dans l\'éditeur).</p>'; return; }
  body.innerHTML = `<p class="hint">Pourcentage des points obtenus sur les questions de chaque compétence, tous questionnaires confondus.
    <span class="qz-leg i">moins de 40 %</span><span class="qz-leg f">40 à 60 %</span><span class="qz-leg s">60 à 80 %</span><span class="qz-leg tb">80 % et plus</span></p>
    <div class="qz-carnet-wrap"><table class="qz-carnet qz-comp-t"><thead><tr><th>Élève</th>${comps.map(c => `<th style="color:${c.color}">${c.label}</th>`).join('')}</tr></thead>
    <tbody>${qzK.eleves.map(e => { const b = bilan(e);
      return `<tr><td>${qzEsc(e.label)}</td>${comps.map(c => { const x = b[c.id]; const pct = x && x.max ? Math.round(100 * x.obtenu / x.max) : null;
        return `<td class="lvl-${niveau(pct)}">${pct === null ? '' : pct + ' %'}</td>`; }).join('')}</tr>`; }).join('')}</tbody></table></div>`;
}

/* ---------------------------------------------------------------------
   Styles
   --------------------------------------------------------------------- */
(function qzStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #devoirTypeQuestionnaireBox{margin-top:8px;}
    .qz-mode-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}
    .qz-mode{display:flex;gap:10px;align-items:flex-start;text-align:left;border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:12px;padding:10px 12px;cursor:pointer;font:inherit;color:var(--ink);}
    .qz-mode .gicon{font-size:26px;color:#6B3FA0;}
    .qz-mode b{display:block;font-family:'Space Grotesk',sans-serif;}
    .qz-mode small{display:block;color:var(--ink-soft);font-size:.78rem;line-height:1.35;margin-top:2px;}
    .qz-mode.on{border-color:#6B3FA0;background:#F4EFFA;box-shadow:0 0 0 3px rgba(107,63,160,.12);}
    .qz-reg-grid{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;margin:6px 0;}
    .qz-reg-grid label{display:flex;align-items:center;gap:6px;font-size:.85rem;}
    .qz-check{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;cursor:pointer;}
    .qz-ed-bar{display:flex;align-items:center;gap:8px;background:#F4EFFA;border-radius:10px;padding:8px 12px;margin:12px 0 8px;font-size:.9rem;color:#4b2c91;flex-wrap:wrap;}
    .qz-mini{font-size:.74rem !important;padding:4px 9px !important;}
    .qz-card{border:1px solid rgba(28,43,57,.14);border-radius:12px;background:#fff;margin:0 0 8px;overflow:hidden;}
    .qz-card.open{border-color:#6B3FA0;box-shadow:0 6px 18px rgba(107,63,160,.12);}
    .qz-card-texte{background:#FAF8F3;}
    .qz-card-head{display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;flex-wrap:wrap;}
    .qz-num{flex:none;width:28px;height:28px;border-radius:50%;background:#6B3FA0;color:#fff;display:flex;align-items:center;justify-content:center;font:700 .85rem 'Space Grotesk',sans-serif;}
    .qz-num .gicon{font-size:17px;}
    .qz-card-texte .qz-num{background:#8a7a5a;}
    .qz-type-pill{display:inline-flex;align-items:center;gap:4px;font-size:.72rem;font-weight:700;color:#6B3FA0;background:#F4EFFA;border-radius:999px;padding:2px 9px;white-space:nowrap;}
    .qz-type-pill .gicon{font-size:15px;}
    .qz-resume{flex:1;min-width:160px;font-size:.88rem;overflow:hidden;}
    .qz-card-head select{font-size:.78rem;padding:3px 4px;max-width:130px;}
    .qz-pts-in{display:inline-flex;align-items:center;gap:4px;font-size:.8rem;white-space:nowrap;}
    .qz-pts-in input{width:58px;padding:3px 5px;}
    .qz-pts{font-size:.8rem;font-weight:700;white-space:nowrap;}
    .qz-actions{display:inline-flex;gap:1px;}
    .qz-actions button{border:0;background:transparent;color:var(--ink-soft);cursor:pointer;padding:3px;border-radius:6px;display:flex;}
    .qz-actions button:hover:not(:disabled){background:rgba(28,43,57,.07);color:var(--ink);}
    .qz-actions button:disabled{opacity:.3;cursor:default;}
    .qz-actions .gicon{font-size:19px;}
    .qz-card-body{padding:4px 14px 14px;border-top:1px dashed rgba(28,43,57,.14);}
    .qz-card-body textarea,.qz-card-body input[type=text]{width:100%;box-sizing:border-box;padding:7px 9px;border:1px solid rgba(28,43,57,.2);border-radius:8px;font:inherit;font-size:.9rem;}
    .qz-lab{display:block;font-size:.8rem;font-weight:700;color:var(--ink);margin:10px 0 4px;}
    .qz-lab select{margin-left:6px;font-weight:400;}
    .qz-lab-row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0 4px;}
    .qz-lab-row .qz-lab{margin:0;}
    .qz-apercu{min-height:20px;background:#FAF8F3;border-radius:8px;padding:6px 10px;margin-top:4px;font-size:.92rem;}
    .qz-img-row{display:flex;align-items:center;gap:10px;margin-top:6px;}
    .qz-img-row img{max-height:90px;max-width:200px;border-radius:6px;border:1px solid rgba(28,43,57,.15);}
    .qz-sub{display:flex;align-items:center;gap:6px;margin:0 0 5px;}
    .qz-sub input[type=text]{flex:1;}
    .qz-sub select{flex:none;}
    .qz-lettre{flex:none;width:20px;font-weight:700;color:#6B3FA0;text-align:center;}
    .qz-x{border:0;background:transparent;cursor:pointer;color:var(--ink-soft);display:flex;padding:2px;border-radius:6px;}
    .qz-x:hover{background:rgba(168,60,31,.1);color:#a83c1f;}
    .qz-add-row{display:flex;flex-wrap:wrap;gap:6px;}
    .qz-add{display:inline-flex;align-items:center;gap:5px;border:1.5px dashed rgba(107,63,160,.45);background:#fff;color:#6B3FA0;border-radius:10px;padding:7px 11px;font:600 .82rem 'Space Grotesk',sans-serif;cursor:pointer;}
    .qz-add:hover{background:#F4EFFA;border-style:solid;}
    .qz-add .gicon{font-size:18px;}
    /* Passation */
    #qzRoot,#qzCorrRoot,#qzCarnetRoot{max-width:900px;}
    #qzCorrRoot,#qzCarnetRoot{max-width:1200px;}
    .qz-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .qz-back{border:0;background:none;cursor:pointer;}
    .qz-apercu-pill{display:inline-flex;align-items:center;gap:5px;background:#efe9fb;color:#4b2c91;border-radius:999px;padding:3px 10px;font-size:.78rem;font-weight:600;}
    .qz-h1{margin:6px 0 10px;display:flex;align-items:center;gap:8px;}
    .qz-h1 .gicon{color:#6B3FA0;}
    .qz-accueil{background:#fff;border-radius:16px;padding:22px;box-shadow:var(--shadow);border:1px solid rgba(28,43,57,.08);}
    .qz-consigne{font-size:1rem;line-height:1.55;margin:0 0 12px;}
    .qz-infos{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px;}
    .qz-infos span{display:inline-flex;align-items:center;gap:6px;background:#F4EFFA;color:#4b2c91;border-radius:10px;padding:6px 12px;font-weight:600;font-size:.88rem;}
    .qz-regles{margin:0 0 16px;padding-left:20px;line-height:1.6;font-size:.92rem;}
    .qz-go{font-size:1rem !important;padding:10px 20px !important;background:#6B3FA0 !important;}
    .qz-bar{position:sticky;top:0;z-index:5;display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.96);backdrop-filter:blur(6px);border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px 14px;margin:0 0 12px;box-shadow:0 4px 14px rgba(28,43,57,.06);}
    .qz-save{font-size:.8rem;color:var(--ink-soft);flex:1;}
    .qz-save.err{color:#a83c1f;font-weight:700;}
    .qz-chrono{font:700 1.1rem 'JetBrains Mono',monospace;display:inline-flex;align-items:center;gap:4px;color:#4b2c91;}
    .qz-chrono.urgent{color:#C0392B;animation:qzPulse 1s infinite;}
    @keyframes qzPulse{50%{opacity:.55;}}
    .qz-sortie{align-items:center;gap:8px;background:#FFF4E6;border:1px solid rgba(255,130,8,.3);color:#7A3E00;border-radius:10px;padding:8px 12px;margin:0 0 10px;font-size:.88rem;}
    .qz-questions{display:flex;flex-direction:column;gap:12px;}
    .qz-q{background:#fff;border-radius:14px;padding:14px 16px;border:1px solid rgba(28,43,57,.1);box-shadow:0 2px 8px rgba(28,43,57,.04);}
    .qz-q.fait{border-left:4px solid #6B3FA0;}
    .qz-doc{background:#FAF8F3;border-radius:14px;padding:14px 16px;border:1px solid rgba(138,122,90,.25);}
    .qz-q-head{display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;}
    .qz-q-num{width:30px;height:30px;border-radius:50%;background:#6B3FA0;color:#fff;display:flex;align-items:center;justify-content:center;font:700 .9rem 'Space Grotesk',sans-serif;flex:none;}
    .qz-q-pts{font-size:.78rem;color:var(--ink-soft);font-weight:600;}
    .qz-comp{font-size:.7rem;font-weight:700;color:var(--c);border:1px solid var(--c);border-radius:999px;padding:1px 8px;}
    .qz-enonce{font-size:1rem;line-height:1.55;}
    .qz-img{display:block;max-width:100%;max-height:340px;border-radius:8px;margin:8px 0;border:1px solid rgba(28,43,57,.1);}
    .qz-q-rep{margin-top:10px;}
    .qz-choix{display:flex;flex-direction:column;gap:6px;}
    .qz-choice{display:flex;align-items:center;gap:10px;border:1.5px solid rgba(28,43,57,.15);border-radius:10px;padding:9px 12px;cursor:pointer;background:#fff;}
    .qz-choice:hover{border-color:#6B3FA0;}
    .qz-choice.on{border-color:#6B3FA0;background:#F4EFFA;}
    .qz-choice input{accent-color:#6B3FA0;width:18px;height:18px;flex:none;}
    .qz-choice span{flex:1;}
    .qz-choice.juste{border-color:#1E7B34;background:#EAF6EC;}
    .qz-choice.faux{border-color:#C0392B;background:#FBECEA;}
    .qz-ok{color:#1E7B34;flex:none !important;}
    .qz-vf{display:flex;flex-direction:column;gap:6px;}
    .qz-vf-row{display:flex;align-items:center;gap:10px;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:7px 10px;flex-wrap:wrap;}
    .qz-vf-row.juste{background:#EAF6EC;border-color:#1E7B34;}
    .qz-vf-row.faux{background:#FBECEA;border-color:#C0392B;}
    .qz-vf-txt{flex:1;min-width:160px;}
    .qz-vf-btns{display:inline-flex;border:1px solid rgba(28,43,57,.2);border-radius:8px;overflow:hidden;}
    .qz-vf-btns button{border:0;background:#fff;padding:6px 14px;cursor:pointer;font:600 .85rem 'Space Grotesk',sans-serif;}
    .qz-vf-btns button+button{border-left:1px solid rgba(28,43,57,.2);}
    .qz-vf-btns button.on{background:#6B3FA0;color:#fff;}
    .qz-vf-btns button:disabled{cursor:default;}
    .qz-vf-sol{font-size:.78rem;font-weight:700;color:#1E7B34;}
    .qz-num-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .qz-input{padding:9px 11px;border:1.5px solid rgba(28,43,57,.2);border-radius:10px;font:inherit;font-size:1rem;box-sizing:border-box;}
    .qz-num-row .qz-input{width:min(320px,100%);}
    textarea.qz-input{width:100%;resize:vertical;}
    .qz-input:focus{outline:none;border-color:#6B3FA0;box-shadow:0 0 0 3px rgba(107,63,160,.14);}
    .qz-unite{font-weight:700;}
    .qz-num-apercu{font-size:1.1rem;}
    .qz-photos{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-top:8px;}
    .qz-photo{position:relative;}
    .qz-photo img{height:110px;max-width:180px;object-fit:cover;border-radius:8px;border:1px solid rgba(28,43,57,.15);cursor:zoom-in;background:#f4f4f4;}
    .qz-photo button{position:absolute;top:4px;right:4px;border:0;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;}
    .qz-photo button .gicon{font-size:16px;}
    .qz-sol{display:flex;gap:6px;align-items:flex-start;background:#EAF6EC;color:#1d5a2b;border-radius:8px;padding:7px 10px;margin:8px 0 0;font-size:.88rem;}
    .qz-sol .gicon{font-size:18px;}
    .qz-rendre-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:18px 0 30px;}
    .qz-done{display:flex;gap:12px;align-items:flex-start;background:#EAF6EC;border:1px solid rgba(30,123,52,.25);border-radius:14px;padding:14px 16px;margin:0 0 14px;}
    .qz-done .gicon{font-size:30px;color:#1E7B34;}
    .qz-done p{margin:4px 0 0;}
    .qz-q.lecture{opacity:.92;}
    .qz-note-big{display:flex;flex-direction:column;align-items:center;background:linear-gradient(135deg,#6B3FA0,#0C5BA0);color:#fff;border-radius:16px;padding:16px;margin:0 0 14px;}
    .qz-note-big span{font:700 2rem 'Space Grotesk',sans-serif;}
    .qz-note-big small{opacity:.9;}
    .qz-comps{display:grid;gap:6px;background:#fff;border-radius:14px;padding:12px 14px;margin:0 0 14px;border:1px solid rgba(28,43,57,.08);}
    .qz-comp-bar{display:grid;grid-template-columns:110px 1fr 50px;align-items:center;gap:10px;font-size:.85rem;}
    .qz-comp-bar div{height:9px;border-radius:5px;background:#eee;overflow:hidden;}
    .qz-comp-bar i{display:block;height:100%;border-radius:5px;}
    .qz-q.res{border-left:5px solid #ccc;}
    .qz-q.res.ok{border-left-color:#1E7B34;}
    .qz-q.res.partiel{border-left-color:#C77D1E;}
    .qz-q.res.ko{border-left-color:#C0392B;}
    .qz-res-pts{font:700 .9rem 'Space Grotesk',sans-serif;margin-left:auto;}
    .qz-comment{display:flex;gap:6px;background:#EEF4FB;color:#0C3F70;border-radius:8px;padding:7px 10px;margin-top:8px;font-size:.9rem;}
    .qz-expl{display:flex;gap:6px;background:#FFF8E5;color:#6b4e00;border-radius:8px;padding:7px 10px;margin-top:8px;font-size:.9rem;}
    /* Correction */
    .qz-c-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:flex-end;}
    .qz-c-stats{display:flex;gap:8px;flex-wrap:wrap;}
    .qz-c-stats span{display:inline-flex;align-items:center;gap:4px;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:10px;padding:5px 10px;font-size:.84rem;}
    .qz-c-stats .warn{background:#FFF4E6;border-color:rgba(255,130,8,.3);}
    .qz-c-stats .ok{background:#EAF6EC;border-color:rgba(30,123,52,.25);}
    .qz-c-tools{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:12px 0;}
    .qz-tabs{display:inline-flex;background:#fff;border:1px solid rgba(28,43,57,.15);border-radius:10px;overflow:hidden;}
    .qz-tabs button{border:0;background:transparent;padding:7px 12px;cursor:pointer;display:inline-flex;align-items:center;gap:5px;font:600 .84rem 'Space Grotesk',sans-serif;color:var(--ink);}
    .qz-tabs button.on{background:#6B3FA0;color:#fff;}
    .qz-tabs .gicon{font-size:18px;}
    .qz-c-grid{display:grid;grid-template-columns:250px minmax(0,1fr);gap:14px;align-items:start;}
    .qz-c-list{position:sticky;top:10px;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:6px;max-height:80vh;overflow-y:auto;}
    .qz-c-list button{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px;width:100%;text-align:left;border:0;background:transparent;border-radius:8px;padding:7px 8px;cursor:pointer;font:inherit;font-size:.86rem;}
    .qz-c-list button span:first-child{flex:1;min-width:110px;}
    .qz-c-list button:hover{background:rgba(28,43,57,.05);}
    .qz-c-list button.on{background:#F4EFFA;box-shadow:inset 3px 0 #6B3FA0;}
    .qz-etat{font-size:.72rem;font-weight:700;border-radius:999px;padding:1px 7px;background:#eee;color:#555;white-space:nowrap;}
    .qz-etat.acorriger{background:#FFF4E6;color:#B8511F;}
    .qz-etat.corrige{background:#EAF6EC;color:#1E7B34;}
    .qz-etat.encours{background:#EEF4FB;color:#0C5BA0;}
    .qz-sorties{font-size:.72rem;font-weight:700;color:#B8511F;}
    .qz-c-copie-head{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 8px;}
    .qz-c-total{background:#F4EFFA;color:#4b2c91;border-radius:10px;padding:8px 12px;margin:0 0 10px;}
    .qz-q.corr{margin:0 0 10px;}
    .qz-noteur{margin-top:10px;border-top:1px dashed rgba(28,43,57,.15);padding-top:8px;}
    .qz-noteur-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .qz-noteur .qz-pts-in input{width:70px;font-weight:700;font-size:.95rem;}
    .qz-noteur.attente .qz-pts-in input{border-color:#FF8208;background:#FFF4E6;}
    .qz-noteur.ok .qz-pts-in input{border-color:#1E7B34;}
    .qz-auto{font-size:.76rem;color:var(--ink-soft);display:inline-flex;align-items:center;gap:3px;}
    .qz-auto .gicon{font-size:15px;color:#C77D1E;}
    .qz-quick{display:inline-flex;gap:3px;}
    .qz-quick button{border:1px solid rgba(28,43,57,.2);background:#fff;border-radius:6px;padding:2px 8px;cursor:pointer;font-size:.78rem;}
    .qz-comment-in{flex:1;min-width:180px;padding:5px 8px;border:1px solid rgba(28,43,57,.2);border-radius:8px;font:inherit;font-size:.85rem;}
    .qz-crit{display:flex;flex-direction:column;gap:3px;margin:0 0 6px;}
    .qz-crit label{display:flex;align-items:center;gap:6px;font-size:.85rem;padding:3px 6px;border-radius:6px;cursor:pointer;}
    .qz-crit label.on{background:#EAF6EC;}
    .qz-crit b{margin-left:auto;}
    .qz-link{border:0;background:none;color:var(--accent);cursor:pointer;font:inherit;font-weight:700;padding:0;text-decoration:underline;}
    .qz-c-nav{display:flex;justify-content:space-between;align-items:center;margin:14px 0 30px;}
    .qz-q-picker{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 10px;}
    .qz-q-picker button{position:relative;border:1px solid rgba(28,43,57,.18);background:#fff;border-radius:8px;padding:6px 11px;cursor:pointer;font:700 .84rem 'Space Grotesk',sans-serif;}
    .qz-q-picker button.on{background:#6B3FA0;color:#fff;border-color:#6B3FA0;}
    .qz-badge{position:absolute;top:-7px;right:-7px;background:#FF8208;color:#fff;border-radius:999px;font-size:.66rem;padding:0 5px;min-width:16px;}
    .qz-q-ref{border:2px solid #6B3FA0;}
    .qz-stats{display:grid;gap:5px;margin-top:10px;}
    .qz-stat{display:grid;grid-template-columns:minmax(0,1fr) 140px 30px;gap:8px;align-items:center;font-size:.85rem;}
    .qz-stat div{height:10px;background:#eee;border-radius:5px;overflow:hidden;}
    .qz-stat i{display:block;height:100%;background:#9aa3ad;}
    .qz-stat.juste i{background:#1E7B34;}
    .qz-stat.juste span{font-weight:700;color:#1E7B34;}
    .qz-par-q{display:flex;flex-direction:column;gap:8px;margin-bottom:30px;}
    .qz-par-q-row{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:10px 12px;}
    .qz-par-q-nom{font-weight:700;font-size:.9rem;margin-bottom:6px;}
    /* Carnet */
    .qz-carnet-wrap{overflow-x:auto;background:#fff;border-radius:12px;border:1px solid rgba(28,43,57,.1);}
    .qz-carnet{border-collapse:collapse;width:100%;font-size:.88rem;}
    .qz-carnet th,.qz-carnet td{border-bottom:1px solid rgba(28,43,57,.08);padding:6px 10px;text-align:center;white-space:nowrap;}
    .qz-carnet th:first-child,.qz-carnet td:first-child{text-align:left;position:sticky;left:0;background:#fff;}
    .qz-carnet thead th{vertical-align:bottom;background:#FAF8F3;}
    .qz-carnet thead th small{display:block;color:var(--ink-soft);font-weight:400;margin:2px 0 4px;}
    .qz-carnet tfoot td{font-weight:700;background:#FAF8F3;}
    .qz-carnet td.vide{color:var(--ink-soft);}
    .qz-carnet td.nc{color:#bbb;}
    .qz-carnet td.attente .gicon{font-size:17px;color:#FF8208;}
    .qz-comp-t td.lvl-i{background:#FBECEA;color:#9E1F1F;font-weight:700;}
    .qz-comp-t td.lvl-f{background:#FFF4E6;color:#8a4a00;font-weight:700;}
    .qz-comp-t td.lvl-s{background:#EAF3FB;color:#0C5BA0;font-weight:700;}
    .qz-comp-t td.lvl-tb{background:#EAF6EC;color:#1E7B34;font-weight:700;}
    .qz-leg{display:inline-block;border-radius:6px;padding:1px 7px;margin-left:6px;font-size:.75rem;font-weight:700;}
    .qz-leg.i{background:#FBECEA;color:#9E1F1F;} .qz-leg.f{background:#FFF4E6;color:#8a4a00;} .qz-leg.s{background:#EAF3FB;color:#0C5BA0;} .qz-leg.tb{background:#EAF6EC;color:#1E7B34;}
    @media (max-width:760px){
      .qz-mode-row{grid-template-columns:1fr;}
      .qz-c-grid{grid-template-columns:1fr;}
      .qz-c-list{position:static;max-height:220px;}
      .qz-stat{grid-template-columns:minmax(0,1fr) 80px 26px;}
    }
  `;
  document.head.appendChild(st);
})();

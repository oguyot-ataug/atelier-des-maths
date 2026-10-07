/* =====================================================================
   questionnaires-cahier.js -- Ajouter une interrogation en ligne au cahier de l'élève

   Demandé : "Possibilité d'ajouter une interrogation en ligne au cahier de l'élève".
   Depuis la liste des interrogations données (bouton « Cahier »), le professeur ajoute au cahier de
   la classe (ou du groupe) à qui elle a été donnée : le sujet seul, ou le sujet avec la correction
   (bonnes réponses, attendus, explications). L'entrée est une entrée « Interrogation » du cahier,
   datée et rangée dans le chapitre choisi, comme les parties de cours ajoutées depuis un chapitre.
   Le contenu est figé en HTML (styles en ligne) : il s'affiche et s'imprime sans le questionnaire.

   Dépend de questionnaires.js (qzEnonceHtml, qzMath, qzEsc, qzListe, qzRenderSaisie, qzMax, qzNum)
   et de app.js (sb, cahier, currentClassId, todayISO, CHAPITRES_BY_LEVEL, niceAlert).
   ===================================================================== */

// Réponse attendue sous une forme lisible (sans champ de saisie), ou null si le type n'en a pas.
function qzcSolution(q){
  if(q.type === 'qcm') return null; // les propositions sont cochées directement
  if(q.type === 'vf') return null;
  if(q.type === 'numerique' || q.type === 'courte') return qzListe(q.reponses).map(qzMath).join(' ou ') + (q.unite ? ' ' + qzEsc(q.unite) : '');
  if(q.type === 'ouverte') return q.attendus ? qzMath(q.attendus) : null;
  return null;
}
// Corps d'une question pour le cahier : propositions / affirmations écrites, et la solution si demandée.
function qzcQuestionHtml(q, n, corr){
  // Vignettes compactes, deux par ligne (qzcHtml) -- signalé : « l'ajout au cahier est énorme ».
  const S = 'padding:8px 10px;border:1px solid #D9DEE6;border-radius:10px;background:#fff;min-width:0;break-inside:avoid;page-break-inside:avoid;';
  const num = `<span style="display:inline-block;min-width:22px;height:22px;line-height:22px;text-align:center;border-radius:50%;background:#6B3FA0;color:#fff;font-weight:700;font-size:.8rem;margin-right:6px;">${n}</span>`;
  const pts = qzMax(q) ? `<span style="color:#6B6F7A;font-size:.8rem;">(${qzNum(qzMax(q))} pt${qzMax(q) > 1 ? 's' : ''})</span>` : '';
  let corps = '';
  if(q.type === 'qcm'){
    corps = `<ul style="list-style:none;padding:0;margin:6px 0 0;">${(q.choix || []).filter(c => String(c.texte || '').trim()).map((c, i) => {
      const bon = corr && c.correct;
      return `<li style="margin:3px 0;${bon ? 'color:#1E7B34;font-weight:700;' : ''}">${bon ? '✔' : '☐'} ${String.fromCharCode(65 + i)}. ${qzMath(c.texte)}</li>`; }).join('')}</ul>`;
  } else if(q.type === 'vf'){
    corps = `<ul style="list-style:none;padding:0;margin:6px 0 0;">${(q.items || []).filter(it => String(it.texte || '').trim()).map(it =>
      `<li style="margin:3px 0;">${qzMath(it.texte)} : ${corr ? `<b style="color:#1E7B34;">${it.vrai ? 'Vrai' : 'Faux'}</b>` : 'Vrai / Faux'}</li>`).join('')}</ul>`;
  } else if(q.type === 'numerique' || q.type === 'courte'){
    corps = corr ? '' : `<p style="margin:6px 0 0;color:#6B6F7A;">Réponse : ……………………${q.unite ? ' ' + qzEsc(q.unite) : ''}</p>`;
  } else if(q.type === 'ouverte'){
    corps = corr ? '' : '<p style="margin:6px 0 0;color:#6B6F7A;">Réponse rédigée.</p>';
  } else if(typeof QZ_EXT !== 'undefined' && QZ_EXT[q.type]){
    // Types interactifs (figure, axe, association…) : même rendu que la correction en ligne, figé.
    try{ corps = `<div style="margin-top:6px;">${qzRenderSaisie(q, null, corr ? 'corrige' : 'lecture', { reglages: {}, seed: null, pfx: 'c' })}</div>`; }catch(e){ corps = ''; }
    // Pas de réponse d'élève dans le cahier : la légende « juste / faux » du tracé n'a pas lieu d'être.
    corps = corps.replace(/<p class="hint qzt-leg">[\s\S]*?<\/p>/g, '')
      .replace(/(<svg[^>]*?)style="max-width:\d+px;"/g, '$1style="width:100%;max-width:100%;height:auto;"'); // la figure suit la largeur de la vignette
  }
  const sol = corr ? qzcSolution(q) : null;
  return `<div style="${S}">
    <div style="margin-bottom:2px;">${num}${pts}</div>
    <div style="font-size:.92em;">${qzEnonceHtml(q)}</div>
    ${corps}
    ${sol ? `<div style="margin-top:8px;padding:6px 10px;border-radius:8px;background:#EAF6EE;color:#1E5E30;"><b>${q.type === 'ouverte' ? 'Attendus' : 'Réponse'} :</b> ${sol}</div>` : ''}
    ${corr && q.explication ? `<div style="margin-top:6px;padding:6px 10px;border-radius:8px;background:#FFF7E6;color:#6B4A00;"><b>Explication :</b> ${qzMath(q.explication)}</div>` : ''}
  </div>`;
}
function qzcHtml(titre, consigne, questions, corr){
  let n = 0;
  return `<div style="border-left:4px solid #6B3FA0;padding-left:12px;">
    <h3 style="margin:0 0 4px;color:#6B3FA0;">${qzEsc(titre)}${corr ? ' — correction' : ''}</h3>
    ${consigne ? `<p style="margin:0 0 8px;color:#4E5665;">${qzMath(consigne)}</p>` : ''}
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:10px;align-items:start;margin-top:8px;">
    ${(questions || []).map(q => q.type === 'texte' ? `<div style="grid-column:1/-1;padding:8px 12px;background:#F4F5F8;border-radius:8px;">${qzEnonceHtml(q)}</div>` : qzcQuestionHtml(q, ++n, corr)).join('')}
    </div>
  </div>`;
}

async function qzCahierOuvrir(devoirId){
  const { data: d, error } = await sb.from('devoirs').select('id,titre,consigne,class_id,questionnaire_id,qz_publie_at,date_limite,classes(nom,niveau)').eq('id', devoirId).single();
  if(error || !d){ await niceAlert('Interrogation introuvable.'); return; }
  const { data: q } = await sb.from('questionnaires').select('titre,questions,reglages').eq('id', d.questionnaire_id).maybeSingle();
  if(!q || !(q.questions || []).length){ await niceAlert('Ce questionnaire n\'a pas de question.'); return; }
  const fini = !!d.qz_publie_at || (d.date_limite && new Date(d.date_limite) < new Date());
  qzCahierModal({ titre: d.titre, consigne: d.consigne, questions: q.questions, class_id: d.class_id, classes: d.classes, fini,
    exo: 'Interrogation', chapDefaut: 'Interrogations', alerte: 'Cette interrogation n\'est pas encore terminée : les élèves verront la correction dans leur cahier dès maintenant.' });
}
/* Questions flash (ex-« séance en direct ») -- signalé : « Pour les Séances en direct, je ne peux pas les insérer dans le cahier ».
   Même fenêtre que pour une interrogation : les questions réellement posées pendant la séance (toutes
   si elle n'a pas commencé), avec le corrigé à jour, datées du jour de la séance. */
async function qzDirectCahierOuvrir(id){
  const { data: row, error } = await sb.from('qz_direct').select('*,classes(nom,niveau)').eq('id', id).single();
  if(error || !row){ await niceAlert('Séance introuvable.'); return; }
  const questions = typeof qzDirectQuestionsAJour === 'function' ? await qzDirectQuestionsAJour(row) : (row.questions || []);
  const lancees = (row.etat && row.etat.lancees) || [];
  // Pages (documents + question) : on garde celles dont la question a été posée.
  const garde = lancees.length ? qzPages(questions).filter(p => p.some(x => x.type !== 'texte' && lancees.includes(x.id))).flat() : questions;
  if(!garde.some(x => x.type !== 'texte')){ await niceAlert('Cette séance n\'a pas de question.'); return; }
  const d = new Date(row.created_at), iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  qzCahierModal({ titre: row.titre, consigne: '', questions: garde, class_id: row.class_id, classes: row.classes, fini: !!row.ended_at, date: iso,
    // Notées, elles sont devenues une interrogation : on les range comme telle.
    exo: row.devoir_id ? 'Interrogation' : 'Questions flash', chapDefaut: row.devoir_id ? 'Interrogations' : 'Questions flash', alerte: 'Cette séance n\'est pas terminée : les élèves verront la correction dans leur cahier dès maintenant.' });
}
// Fenêtre commune : sujet seul ou avec correction, chapitre et date, puis insertion dans cahier_entries.
function qzCahierModal(m){
  const d = m, niveau = (d.classes && (niveauCle(d.classes.niveau) || d.classes.niveau)) || '5e';
  const chaps = (typeof CHAPITRES_BY_LEVEL !== 'undefined' && CHAPITRES_BY_LEVEL[niveau]) || [];
  const fini = m.fini;
  const o = document.createElement('div'); o.className = 'qzd-ov';
  o.innerHTML = `<div class="qzd-modal" role="dialog" aria-label="Ajouter au cahier">
    <h3><span class="gicon">menu_book</span> Ajouter au cahier de l'élève</h3>
    <p style="margin:4px 0 10px;"><b>${qzEsc(d.titre)}</b> · cahier de ${qzEsc(d.classes ? d.classes.nom : 'la classe')}</p>
    <p class="qzd-m-lab">Contenu</p>
    <div class="qzd-m-acces">
      <button type="button" class="qzd-m-opt on" data-corr="1"><span class="gicon">fact_check</span><span><b>Le sujet et sa correction</b><small>Bonnes réponses, attendus des questions ouvertes et explications.</small></span></button>
      <button type="button" class="qzd-m-opt" data-corr="0"><span class="gicon">description</span><span><b>Le sujet seul</b><small>Les questions, sans les réponses.</small></span></button>
    </div>
    <p class="hint qzc-alerte" style="margin:8px 0 0;color:#a83c1f;${fini ? 'display:none;' : ''}"><span class="gicon" style="font-size:1rem;vertical-align:middle;">warning</span> ${qzEsc(m.alerte)}</p>
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;">
      <label class="hint" style="display:flex;flex-direction:column;gap:4px;margin:0;font-weight:600;">Chapitre du cahier
        <select class="qzc-chap"><option value="">${qzEsc(m.chapDefaut)} (sans chapitre)</option>
          ${chaps.map(c => `<option value="${qzEsc(c.code + ' · ' + c.t)}">${qzEsc(c.code + ' · ' + c.t)}</option>`).join('')}</select></label>
      <label class="hint" style="display:flex;flex-direction:column;gap:4px;margin:0;font-weight:600;">Date
        <input type="date" class="qzc-date" value="${m.date || todayISO()}" style="padding:6px 8px;border-radius:8px;"></label>
    </div>
    <p class="hint qzc-err" style="margin:10px 0 0;color:#a83c1f;"></p>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"><button type="button" class="btn secondary" data-x>Annuler</button>
      <button type="button" class="btn" data-go><span class="gicon">add</span> Ajouter au cahier</button></div></div>`;
  document.body.appendChild(o);
  let corr = true;
  o.addEventListener('click', async e => {
    const t = e.target;
    if(t === o || t.closest('[data-x]')){ o.remove(); return; }
    const opt = t.closest('[data-corr]');
    if(opt){ corr = opt.dataset.corr === '1'; o.querySelectorAll('[data-corr]').forEach(b => b.classList.toggle('on', b === opt));
      o.querySelector('.qzc-alerte').style.display = corr && !fini ? '' : 'none'; return; }
    if(t.closest('[data-go]')){
      const b = t.closest('[data-go]'); b.disabled = true;
      const entry = { niveau, chapitre: o.querySelector('.qzc-chap').value || m.chapDefaut, exo: m.exo,
        titre: d.titre + (corr ? ' (correction)' : ''), date: o.querySelector('.qzc-date').value || todayISO(), raw: '',
        html: qzcHtml(d.titre, d.consigne, m.questions, corr) };
      // Groupe « sans cahier » (demi-groupe…) : le cahier de sa classe d'origine (fonction cahier_classe).
      const { data: cc } = await sb.rpc('cahier_classe', { p_class: d.class_id });
      const cible = cc && cc.id ? cc : { id: d.class_id, nom: d.classes ? d.classes.nom : '' };
      const { data: ins, error: er } = await sb.from('cahier_entries').insert(Object.assign({ class_id: cible.id }, entry)).select('id').single();
      if(er){ o.querySelector('.qzc-err').textContent = /row-level security/.test(er.message) ? 'Vous n\'êtes pas professeur de cette classe.' : er.message; b.disabled = false; return; }
      // Classe active : le cahier affiché est mis à jour tout de suite.
      if(typeof cahier !== 'undefined' && (typeof cahierClasseId === 'function' ? cahierClasseId() : currentClassId) === cible.id){ cahier.push(Object.assign({ id: ins.id, class_id: cible.id }, entry)); if(typeof sortCahierInPlace === 'function') sortCahierInPlace(); if(typeof saveCahier === 'function') saveCahier(); }
      o.remove();
      await niceAlert(`« ${d.titre} »${corr ? ' et sa correction' : ''} ${corr ? 'sont ajoutés' : 'est ajouté'} au cahier de ${cible.nom || 'la classe'}, à la date du ${new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-FR')}.`);
    }
  });
}

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
  const S = 'margin:8px 0 14px;padding:10px 12px;border:1px solid #D9DEE6;border-radius:10px;background:#fff;';
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
  }
  const sol = corr ? qzcSolution(q) : null;
  return `<div style="${S}">
    <div style="margin-bottom:4px;">${num}${pts}</div>
    ${qzEnonceHtml(q)}
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
    ${(questions || []).map(q => q.type === 'texte' ? `<div style="margin:8px 0;padding:8px 12px;background:#F4F5F8;border-radius:8px;">${qzEnonceHtml(q)}</div>` : qzcQuestionHtml(q, ++n, corr)).join('')}
  </div>`;
}

async function qzCahierOuvrir(devoirId){
  const { data: d, error } = await sb.from('devoirs').select('id,titre,consigne,class_id,questionnaire_id,qz_publie_at,date_limite,classes(nom,niveau)').eq('id', devoirId).single();
  if(error || !d){ await niceAlert('Interrogation introuvable.'); return; }
  const { data: q } = await sb.from('questionnaires').select('titre,questions,reglages').eq('id', d.questionnaire_id).maybeSingle();
  if(!q || !(q.questions || []).length){ await niceAlert('Ce questionnaire n\'a pas de question.'); return; }
  const niveau = (d.classes && d.classes.niveau) || '5e';
  const chaps = (typeof CHAPITRES_BY_LEVEL !== 'undefined' && CHAPITRES_BY_LEVEL[niveau]) || [];
  const fini = !!d.qz_publie_at || (d.date_limite && new Date(d.date_limite) < new Date());
  const o = document.createElement('div'); o.className = 'qzd-ov';
  o.innerHTML = `<div class="qzd-modal" role="dialog" aria-label="Ajouter au cahier">
    <h3><span class="gicon">menu_book</span> Ajouter au cahier de l'élève</h3>
    <p style="margin:4px 0 10px;"><b>${qzEsc(d.titre)}</b> · cahier de ${qzEsc(d.classes ? d.classes.nom : 'la classe')}</p>
    <p class="qzd-m-lab">Contenu</p>
    <div class="qzd-m-acces">
      <button type="button" class="qzd-m-opt on" data-corr="1"><span class="gicon">fact_check</span><span><b>Le sujet et sa correction</b><small>Bonnes réponses, attendus des questions ouvertes et explications.</small></span></button>
      <button type="button" class="qzd-m-opt" data-corr="0"><span class="gicon">description</span><span><b>Le sujet seul</b><small>Les questions, sans les réponses.</small></span></button>
    </div>
    <p class="hint qzc-alerte" style="margin:8px 0 0;color:#a83c1f;${fini ? 'display:none;' : ''}"><span class="gicon" style="font-size:1rem;vertical-align:middle;">warning</span> Cette interrogation n'est pas encore terminée : les élèves verront la correction dans leur cahier dès maintenant.</p>
    <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;">
      <label class="hint" style="display:flex;flex-direction:column;gap:4px;margin:0;font-weight:600;">Chapitre du cahier
        <select class="qzc-chap" style="padding:6px 8px;border-radius:8px;"><option value="">Interrogations (sans chapitre)</option>
          ${chaps.map(c => `<option value="${qzEsc(c.code + ' · ' + c.t)}">${qzEsc(c.code + ' · ' + c.t)}</option>`).join('')}</select></label>
      <label class="hint" style="display:flex;flex-direction:column;gap:4px;margin:0;font-weight:600;">Date
        <input type="date" class="qzc-date" value="${todayISO()}" style="padding:6px 8px;border-radius:8px;"></label>
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
      const entry = { niveau, chapitre: o.querySelector('.qzc-chap').value || 'Interrogations', exo: 'Interrogation',
        titre: d.titre + (corr ? ' (correction)' : ''), date: o.querySelector('.qzc-date').value || todayISO(), raw: '',
        html: qzcHtml(d.titre, d.consigne, q.questions, corr) };
      const { data: ins, error: er } = await sb.from('cahier_entries').insert(Object.assign({ class_id: d.class_id }, entry)).select('id').single();
      if(er){ o.querySelector('.qzc-err').textContent = /row-level security/.test(er.message) ? 'Vous n\'êtes pas professeur de cette classe.' : er.message; b.disabled = false; return; }
      // Classe active : le cahier affiché est mis à jour tout de suite.
      if(typeof cahier !== 'undefined' && currentClassId === d.class_id){ cahier.push(Object.assign({ id: ins.id, class_id: d.class_id }, entry)); if(typeof sortCahierInPlace === 'function') sortCahierInPlace(); if(typeof saveCahier === 'function') saveCahier(); }
      o.remove();
      await niceAlert(`« ${d.titre} »${corr ? ' et sa correction' : ''} ${corr ? 'sont ajoutés' : 'est ajouté'} au cahier de ${d.classes ? d.classes.nom : 'la classe'}, à la date du ${new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-FR')}.`);
    }
  });
}

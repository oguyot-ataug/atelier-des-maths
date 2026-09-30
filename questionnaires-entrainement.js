/* =====================================================================
   questionnaires-entrainement.js -- Entraînement / remédiation non noté, avec le moteur des
   interrogations en ligne.

   Demandé : "avec le même moteur que les interros en ligne, on peut aussi proposer des remédiation
   ou entraînement non notés."

   Un questionnaire en mode « Entraînement / remédiation » (réglage mode = 'entrainement' dans
   l'éditeur) se donne à une classe ou à quelques élèves comme une interrogation, mais :
   - l'élève « Vérifie » chaque réponse : juste → c'est fini pour cette question ; sinon il réessaie
     (nombre d'essais réglable : 1, 2, 3 ou illimité), puis la correction s'affiche ;
   - rien n'est noté ni reporté au carnet ; l'élève peut refaire l'entraînement (remédiation) ;
   - le professeur voit, question par question, qui a réussi du premier coup, après plusieurs
     essais, ou pas encore (bouton « Résultats » au lieu de « Corriger »).
   Les essais sont gardés dans la copie : reponses._essais = { idQuestion: [réponse 1, réponse 2…] }
   (et reponses._tour = numéro de la tentative de l'entraînement).
   La fonction qz_passer donne le corrigé à l'élève pour un entraînement (migration qz_entrainement).

   Dépend de questionnaires.js (qzP, qzRenderSaisie, qzVerdict, qzModifie, qzC…).
   ===================================================================== */

function qzEntMax(){ const e = qzP && qzP.reglages ? qzP.reglages.essais : undefined; return e === undefined || e === null ? 2 : Number(e) || 0; }
function qzEntEssais(reponses, qid){ return ((reponses || {})._essais || {})[qid] || []; }
// État d'une question : essais faits, verdict du dernier, terminée ou non.
function qzEntEtat(q){
  const ess = qzEntEssais(qzP.reponses, q.id), max = qzEntMax();
  const der = ess.length ? qzVerdict(q, ess[ess.length - 1]) : null;
  const fini = der === 'juste' || der === 'avoir' || (max > 0 && ess.length >= max);
  return { ess, der, fini, reste: max ? Math.max(0, max - ess.length) : Infinity };
}

function qzEntAccueil(){
  const n = qzP.questions.filter(q => q.type !== 'texte').length, max = qzEntMax();
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-accueil">
      ${qzP.data.devoir.consigne ? `<p class="qz-consigne">${qzMath(qzP.data.devoir.consigne)}</p>` : ''}
      <div class="qz-infos">
        <span><span class="gicon">fitness_center</span> Entraînement : non noté</span>
        <span><span class="gicon">help</span> ${n} question${n > 1 ? 's' : ''}</span>
        <span><span class="gicon">replay</span> ${max ? max + ' essai' + (max > 1 ? 's' : '') + ' par question' : 'Essais illimités'}</span>
      </div>
      <ul class="qz-regles">
        <li>Réponds à une question puis clique sur <b>Vérifier</b> : tu sais tout de suite si c'est juste.</li>
        <li>${max === 1 ? 'Tu as un seul essai : la correction s\'affiche aussitôt.' : `Si ce n'est pas juste, tu peux réessayer${max ? ` (${max} essais en tout)` : ''} ; ensuite la correction s'affiche.`}</li>
        <li>Rien n'est noté : c'est pour t'entraîner. Ton professeur voit ce que tu as réussi, pour t'aider.</li>
        <li>Tes réponses sont enregistrées : tu peux fermer la page et reprendre plus tard.</li>
      </ul>
      <button class="btn qz-go" onclick="qzCommencer()"><span class="gicon">play_arrow</span> Commencer</button>
    </div>`;
}
function qzEntBlocHtml(q, n, ctx){
  const e = qzEntEtat(q), rep = qzP.reponses[q.id];
  return `<div class="qz-q ent${e.fini ? ' fini ' + e.der : ''}" id="qzQ_${q.id}" data-qid="${q.id}">
    <div class="qz-q-head"><span class="qz-q-num">${n}</span>${e.ess.length && !e.fini ? `<span class="qz-ent-essai">essai ${e.ess.length + 1}${e.reste !== Infinity ? ' / ' + qzEntMax() : ''}</span>` : ''}</div>
    ${qzEnonceHtml(q)}
    <div class="qz-q-rep">${qzRenderSaisie(q, rep, e.fini ? 'corrige' : 'passer', ctx)}</div>
    <div class="qz-ent-fb">${qzEntFeedback(q, e)}</div>
  </div>`;
}
function qzEntFeedback(q, e){
  const btn = `<button type="button" class="btn qz-mini qz-ent-btn" onclick="qzEntVerifier('${q.id}')"><span class="gicon">done_all</span> Vérifier</button>`;
  if(!e.ess.length) return btn;
  const expl = q.explication ? `<div class="qz-expl"><span class="gicon">lightbulb</span> <div>${qzMath(q.explication)}</div></div>` : '';
  if(e.fini){
    const t = e.der === 'juste' ? (e.ess.length === 1 ? ['check_circle', 'Juste du premier coup !'] : ['check_circle', `Juste, au ${e.ess.length}e essai !`])
      : e.der === 'avoir' ? ['fact_check', 'Compare ta réponse avec la correction ci-dessus.']
      : ['info', 'Voici la correction : lis-la bien avant de passer à la suite.'];
    return `<div class="qz-ent-v ${e.der}"><span class="gicon">${t[0]}</span> ${t[1]}</div>${expl}`;
  }
  const r = e.reste === Infinity ? '' : ` Il te reste ${e.reste} essai${e.reste > 1 ? 's' : ''}.`;
  return `<div class="qz-ent-v ${e.der === 'partiel' ? 'partiel' : 'faux'}"><span class="gicon">${e.der === 'partiel' ? 'contrast' : 'cancel'}</span> ${e.der === 'partiel' ? 'C\'est en partie juste : corrige et vérifie à nouveau.' : 'Pas encore : réessaie !'}${r}</div>${btn}`;
}
async function qzEntVerifier(qid){
  if(!qzP) return;
  const q = qzP.questions.find(x => x.id === qid); if(!q) return;
  const rep = qzP.reponses[qid];
  if(!qzRepondue(q, rep)){ await niceAlert('Réponds d\'abord à la question, puis vérifie.'); return; }
  if(qzEntEtat(q).fini) return;
  const tous = Object.assign({}, qzP.reponses._essais || {});
  tous[qid] = qzEntEssais(qzP.reponses, qid).concat([JSON.parse(JSON.stringify(rep))]);
  qzP.reponses._essais = tous;
  qzEntMajBloc(q);
  qzModifie(); // enregistrement automatique (qzSauver)
}
function qzEntMajBloc(q){
  const bloc = document.getElementById('qzQ_' + q.id); if(!bloc) return;
  const n = (bloc.querySelector('.qz-q-num') || {}).textContent || '';
  const tmp = document.createElement('div'); tmp.innerHTML = qzEntBlocHtml(q, n, qzPCtx());
  bloc.replaceWith(tmp.firstElementChild);
  const nb = document.getElementById('qzQ_' + q.id);
  qzChargerPhotos(nb); if(typeof qzMonterInter === 'function') qzMonterInter(nb);
}
// Bilan de l'élève (entraînement terminé, ou aperçu du professeur).
function qzEntBilan(){
  const qs = qzP.questions.filter(q => q.type !== 'texte'), ctx = qzPCtx(), num = qzNumeros();
  const st = { premier: 0, apres: 0, rate: 0, avoir: 0, vide: 0 };
  qs.forEach(q => { const e = qzEntEtat(q);
    if(!e.ess.length) st.vide++; else if(e.der === 'juste') st[e.ess.length === 1 ? 'premier' : 'apres']++; else if(e.der === 'avoir') st.avoir++; else st.rate++; });
  const pastille = q => { const e = qzEntEtat(q);
    if(!e.ess.length) return '<span class="qz-ent-p vide">pas faite</span>';
    if(e.der === 'juste') return `<span class="qz-ent-p juste"><span class="gicon">check_circle</span> ${e.ess.length === 1 ? 'du premier coup' : 'au ' + e.ess.length + 'e essai'}</span>`;
    if(e.der === 'avoir') return '<span class="qz-ent-p avoir"><span class="gicon">fact_check</span> à comparer</span>';
    return '<span class="qz-ent-p faux"><span class="gicon">cancel</span> à revoir</span>'; };
  const tour = Number((qzP.reponses || {})._tour) || 1;
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-done"><span class="gicon">emoji_events</span><div><b>Entraînement terminé${tour > 1 ? ` (tentative n° ${tour})` : ''}</b>
      <p>${st.premier + st.apres} question${st.premier + st.apres > 1 ? 's' : ''} réussie${st.premier + st.apres > 1 ? 's' : ''} sur ${qs.length}${st.premier ? `, dont ${st.premier} du premier coup` : ''}. Rien n'est noté : relis les corrections des questions à revoir.</p></div></div>
    <div class="qz-ent-stats">
      <span class="juste"><b>${st.premier}</b> du premier coup</span><span class="apres"><b>${st.apres}</b> après plusieurs essais</span>
      <span class="faux"><b>${st.rate}</b> à revoir</span>${st.avoir ? `<span class="avoir"><b>${st.avoir}</b> à comparer</span>` : ''}${st.vide ? `<span class="vide"><b>${st.vide}</b> pas faite${st.vide > 1 ? 's' : ''}</span>` : ''}</div>
    <div class="qz-questions">${qzP.questions.map(q => q.type === 'texte' ? `<div class="qz-doc">${qzEnonceHtml(q)}</div>` : `<div class="qz-q res">
      <div class="qz-q-head"><span class="qz-q-num">${num[q.id]}</span>${pastille(q)}</div>
      ${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, qzP.reponses[q.id], 'corrige', ctx)}</div>
      ${q.explication ? `<div class="qz-expl"><span class="gicon">lightbulb</span> <div>${qzMath(q.explication)}</div></div>` : ''}</div>`).join('')}</div>
    <div class="qz-rendre-row">
      ${qzP.apercu ? (qzP.retourBanque ? '' : `<button class="btn secondary" onclick="qzApercu()"><span class="gicon">replay</span> Recommencer l'aperçu</button>`)
        : `<button class="btn" onclick="qzEntRecommencer()"><span class="gicon">replay</span> Refaire l'entraînement</button>`}
      <button class="btn secondary" onclick="qzRetourEleve()">${qzP.apercu ? 'Retour' : '← Mon travail'}</button>
    </div>`;
  qzChargerPhotos(document.getElementById('qzRoot'));
  if(typeof qzMonterInter === 'function') qzMonterInter(document.getElementById('qzRoot'));
}
async function qzEntRecommencer(){
  if(!qzP || qzP.apercu) return;
  if(!(await niceConfirm('Refaire tout l\'entraînement ? Tes réponses actuelles seront effacées (ton professeur garde le nombre de tentatives).'))) return;
  const { data, error } = await sb.rpc('qz_entrainement_recommencer', { p_devoir: qzP.devoirId });
  if(error){ await niceAlert(error.message); return; }
  qzPInit(data, false);
}

/* ---------------------------------------------------------------------
   Professeur : résultats d'un entraînement (à la place de la correction)
   --------------------------------------------------------------------- */
function qzEntCase(q, reponses){
  const ess = qzEntEssais(reponses, q.id);
  if(!ess.length) return { k: 'vide', t: '—', n: 0 };
  const v1 = qzVerdict(q, ess[0]), vn = qzVerdict(q, ess[ess.length - 1]);
  if(v1 === 'juste') return { k: 'premier', t: '✓', n: 1 };
  if(vn === 'juste') return { k: 'apres', t: '✓' + ess.length, n: ess.length };
  if(vn === 'avoir') return { k: 'avoir', t: '?', n: ess.length };
  return { k: 'rate', t: '✗', n: ess.length };
}
function qzEntResultats(root){
  const d = qzC.devoir, qs = qzCQuestions(), num = {}; qs.forEach((q, i) => { num[q.id] = i + 1; });
  const lignes = qzC.eleves.map(e => { const c = qzC.copies.get(e.id);
    return { e, c, cases: qs.map(q => qzEntCase(q, c && c.reponses)), tour: Number(c && c.reponses && c.reponses._tour) || (c ? 1 : 0) }; });
  const faits = lignes.filter(l => l.c && qzEstRendue(l.c)).length, enCours = lignes.filter(l => l.c && !qzEstRendue(l.c)).length;
  const parQ = qs.map((q, i) => { const cs = lignes.map(l => l.cases[i]).filter(x => x.k !== 'vide');
    return { q, n: cs.length, premier: cs.filter(x => x.k === 'premier').length, apres: cs.filter(x => x.k === 'apres').length, rate: cs.filter(x => x.k === 'rate').length, avoir: cs.filter(x => x.k === 'avoir').length }; });
  const pct = (x, n) => n ? Math.round(100 * x / n) : 0;
  root.innerHTML = `<span class="back-btn" onclick="qzCFermer()">← Interrogations en ligne</span>
    <h1 style="margin:6px 0 2px;"><span class="gicon" style="color:${QZ_MODES.entrainement.c};">fitness_center</span> ${qzEsc(d.titre)}</h1>
    <p class="hint" style="margin:0 0 12px;">${qzModeBadge('entrainement')} · ${qzEsc(d.classes ? d.classes.nom : '')} · <b>${faits}</b> terminé${faits > 1 ? 's' : ''}${enCours ? ` · ${enCours} en cours` : ''} sur ${qzC.eleves.length} élève${qzC.eleves.length > 1 ? 's' : ''}</p>
    <h3 style="margin:10px 0 6px;">Par question</h3>
    <div class="qzd-blist">${parQ.map(x => `<div class="qzd-bl"><span class="qzd-bl-n">${num[x.q.id]}</span><span class="qzd-bl-t">${qzEsc(String(x.q.enonce || '').replace(/\$/g, '').replace(/\s+/g, ' ').slice(0, 90)) || qzType(x.q.type).label}</span>
      <span class="qzd-bl-b">${x.n ? `<div class="qzd-bar">${[['premier', 'juste'], ['apres', 'apres'], ['rate', 'faux'], ['avoir', 'avoir']].filter(([k]) => x[k]).map(([k, cls]) => `<span class="${cls}" style="flex:${x[k]}">${pct(x[k], x.n) >= 15 ? pct(x[k], x.n) + ' %' : ''}</span>`).join('')}</div>` : '<span class="hint" style="margin:0;">pas encore faite</span>'}</span>
      <span class="qzd-bl-p">${x.n ? `<b>${pct(x.premier, x.n)} %</b> du 1er coup` : ''}<small>${x.n}/${qzC.eleves.length}</small></span></div>`).join('')}</div>
    <div class="qzd-leg" style="margin:8px 0 16px;"><span class="juste"><i></i>Juste du premier coup</span><span class="apres"><i></i>Juste après plusieurs essais</span><span class="faux"><i></i>Pas réussie</span><span class="avoir"><i></i>À regarder (question ouverte)</span></div>
    <h3 style="margin:0 0 6px;">Par élève</h3>
    <div class="qzd-tab-wrap"><table class="qzd-tab qz-ent-tab"><thead><tr><th>Élève</th><th>État</th><th>Réussies</th>${qs.map(q => `<th class="c">${num[q.id]}</th>`).join('')}</tr></thead>
      <tbody>${lignes.map(l => { const ok = l.cases.filter(x => x.k === 'premier' || x.k === 'apres').length;
        return `<tr><td>${qzEsc(l.e.label)}</td><td>${!l.c ? '<span class="hint" style="margin:0;">pas commencé</span>' : qzEstRendue(l.c) ? 'terminé' + (l.tour > 1 ? ` <small>(${l.tour} fois)</small>` : '') : 'en cours'}</td>
          <td class="c">${l.c ? `<b>${ok}</b> / ${qs.length}` : ''}</td>${l.cases.map((x, i) => `<td class="c"><span class="qz-ent-c ${x.k}" title="Question ${i + 1} : ${{ premier: 'juste du premier coup', apres: 'juste au ' + x.n + 'e essai', rate: 'pas réussie (' + x.n + ' essai' + (x.n > 1 ? 's' : '') + ')', avoir: 'à regarder', vide: 'pas faite' }[x.k]}">${x.t}</span></td>`).join('')}</tr>`; }).join('')}</tbody></table></div>
    <p class="hint" style="margin:10px 0 0;">✓ juste du premier coup · ✓2 juste au 2e essai · ✗ pas réussie · ? question ouverte à regarder · — pas faite. Pour une remédiation, donnez de nouveau ce questionnaire en entraînement aux élèves concernés (« Élèves choisis »).</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
      ${d.questionnaire_id ? `<button class="btn secondary" onclick="qzBanqueDonner('${d.questionnaire_id}')"><span class="gicon">content_copy</span> Donner à d'autres élèves</button>
      <button class="btn secondary qzd-btn" onclick="qzDirectLancer('${d.questionnaire_id}')"><span class="gicon">bolt</span> Questions flash avec ces questions</button>` : ''}
    </div>`;
}

(function qzEntStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qz-q.ent .qz-ent-fb{margin-top:10px;display:flex;flex-direction:column;gap:8px;align-items:flex-start;}
    .qz-q.ent.fini.juste{border-color:rgba(30,123,52,.45);box-shadow:0 0 0 2px rgba(30,123,52,.12);}
    .qz-q.ent.fini.faux,.qz-q.ent.fini.partiel{border-color:rgba(198,40,40,.35);}
    .qz-ent-essai{font-size:.78rem;font-weight:700;color:#B8511F;background:rgba(255,130,8,.12);border-radius:999px;padding:2px 9px;}
    .qz-ent-btn .gicon{font-size:1.05rem;}
    .qz-ent-v{display:flex;align-items:center;gap:8px;font-weight:700;border-radius:10px;padding:8px 12px;font-size:.95rem;}
    .qz-ent-v.juste{background:rgba(30,123,52,.1);color:#1E7B34;} .qz-ent-v.faux{background:rgba(198,40,40,.08);color:#C62828;}
    .qz-ent-v.partiel{background:rgba(224,161,0,.12);color:#9A6B00;} .qz-ent-v.avoir{background:rgba(28,43,57,.06);color:#4E5665;}
    .qz-ent-stats{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px;}
    .qz-ent-stats span{border-radius:10px;padding:6px 12px;font-size:.9rem;background:rgba(28,43,57,.05);}
    .qz-ent-stats .juste{background:rgba(30,123,52,.1);color:#1E7B34;} .qz-ent-stats .apres{background:rgba(38,170,177,.12);color:#16767B;}
    .qz-ent-stats .faux{background:rgba(198,40,40,.08);color:#C62828;}
    .qz-ent-p{display:inline-flex;align-items:center;gap:4px;font-size:.8rem;font-weight:700;border-radius:999px;padding:2px 9px;}
    .qz-ent-p .gicon{font-size:1rem;} .qz-ent-p.juste{background:rgba(30,123,52,.12);color:#1E7B34;} .qz-ent-p.faux{background:rgba(198,40,40,.1);color:#C62828;}
    .qz-ent-p.avoir,.qz-ent-p.vide{background:rgba(28,43,57,.07);color:#5B6472;}
    .qzd-bar .apres,.qzd-leg .apres i{background:#26AAB1;}
    .qz-ent-tab td.c,.qz-ent-tab th.c{text-align:center;padding:6px 8px;}
    .qz-ent-c{display:inline-block;min-width:28px;border-radius:7px;padding:2px 6px;font-weight:700;font-size:.85rem;}
    .qz-ent-c.premier{background:#1E7B34;color:#fff;} .qz-ent-c.apres{background:#26AAB1;color:#fff;} .qz-ent-c.rate{background:#C62828;color:#fff;}
    .qz-ent-c.avoir{background:#8A919C;color:#fff;} .qz-ent-c.vide{color:#C9CED6;}
  `;
  document.head.appendChild(st);
})();

/* =====================================================================
   questionnaires-suivi.js -- Suivi en direct d'une interrogation

   Demandé : « si on fait l'inverse, je donne un exercice aux enfants ou une interro et je vois ce
   qu'ils font en direct ? » -- « oh que oui ! ».

   - Professeur (Interrogations en ligne › bouton « Suivi en direct ») : une vignette par élève
     (pas commencé / en cours / rendu, progression, question en cours, temps, dernière activité,
     sorties de la page en alerte), avec une rangée de pastilles juste / faux / à vérifier par
     question (correction automatique, visible du seul professeur). Un clic : la copie de l'élève,
     qui se remplit en direct. Vue « Par question » : réponses, part de justes, erreurs fréquentes.
   - Données : les copies (qz_copies), déjà enregistrées par l'élève 1,5 s après chaque réponse ;
     relues toutes les 4 s, et aussitôt qu'un élève signale un enregistrement ou une sortie sur le
     canal « qzs-<devoir> » (questionnaires.js, passation). La question en cours est celle dont la
     réponse vient de changer.
   - L'élève lit sur sa page : « Ton professeur peut suivre ton travail en direct ».
   Dépend de questionnaires.js (qzElevesDevoir, qzVerdict, qzRepondue, qzRenderSaisie, qzEnonceHtml,
   qzEstRendue, QZ_REGLAGES_DEFAUT, qzEsc, qzMath) et d'app.js (sb, niceAlert, showView).
   ===================================================================== */

let qzS = null; // { devoir, qz, reglages, eleves, copies:Map, prec:Map, encours:Map, dehors:Map, vue, sel, ch, timer }

async function qzSuiviOuvrir(devoirId){
  qzSuiviFermer();
  let v = document.getElementById('qzSuivi');
  if(!v){ v = document.createElement('div'); v.id = 'qzSuivi'; document.body.appendChild(v); }
  v.style.display = 'flex'; v.innerHTML = '<p class="hint" style="margin:30px auto;">Chargement…</p>';
  const { data: devoir } = await sb.from('devoirs').select('*, classes(nom,niveau)').eq('id', devoirId).single();
  if(!devoir){ v.style.display = 'none'; niceAlert('Interrogation introuvable.'); return; }
  const [{ data: qz }, eleves] = await Promise.all([sb.from('questionnaires').select('*').eq('id', devoir.questionnaire_id).maybeSingle(), qzElevesDevoir(devoir)]);
  if(!qz){ v.style.display = 'none'; niceAlert('Questionnaire introuvable.'); return; }
  qzS = { devoir, qz, reglages: Object.assign({}, QZ_REGLAGES_DEFAUT, qz.reglages || {}), eleves, copies: new Map(), prec: new Map(), encours: new Map(), dehors: new Map(), vue: 'eleves', sel: null };
  qzS.qs = qz.questions.filter(q => q.type !== 'texte');
  qzS.num = {}; qzS.qs.forEach((q, i) => qzS.num[q.id] = i + 1);
  qzS.ch = sb.channel('qzs-' + devoirId, { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'maj' }, () => qzSuiviBientot())
    .on('broadcast', { event: 'sortie' }, ({ payload }) => qzSuiviSortie(payload))
    .subscribe();
  qzS.timer = setInterval(qzSuiviCharger, 4000);
  document.body.classList.add('qzs-ouvert');
  await qzSuiviCharger();
}
function qzSuiviFermer(){
  if(!qzS) return;
  clearInterval(qzS.timer); clearTimeout(qzS.bientot);
  try{ sb.removeChannel(qzS.ch); }catch(e){}
  const v = document.getElementById('qzSuivi'); if(v) v.style.display = 'none';
  document.body.classList.remove('qzs-ouvert');
  qzS = null;
}
function qzSuiviBientot(){ if(!qzS) return; clearTimeout(qzS.bientot); qzS.bientot = setTimeout(qzSuiviCharger, 600); }
async function qzSuiviCharger(){
  if(!qzS) return;
  const s = qzS;
  const { data } = await sb.from('qz_copies').select('id,student_id,statut,started_at,deadline_at,submitted_at,updated_at,reponses,sorties').eq('devoir_id', s.devoir.id);
  if(qzS !== s) return;
  (data || []).forEach(c => {
    const avant = s.copies.get(c.student_id);
    if(avant){ // question en cours : celle dont la réponse vient de changer
      const ra = avant.reponses || {}, rn = c.reponses || {};
      const q = s.qs.find(q => JSON.stringify(ra[q.id]) !== JSON.stringify(rn[q.id]));
      if(q) s.encours.set(c.student_id, q.id);
    }
    s.copies.set(c.student_id, c);
  });
  qzSuiviRendre();
}
function qzSuiviSortie(p){
  if(!qzS || !p || !p.e) return;
  const avant = qzS.dehors.get(p.e);
  qzS.dehors.set(p.e, !!p.dehors);
  if(p.dehors && !avant){
    const e = qzS.eleves.find(x => x.id === p.e);
    if(typeof cdToast === 'function') cdToast(`<span class="gicon">warning</span> <b>${qzEsc(e ? (e.prenom || e.label) : 'Un élève')}</b> a quitté la page de l'interrogation.`);
  }
  qzSuiviRendre();
  if(!p.dehors) qzSuiviBientot();
}
const QZS_VERD = { juste: ['#2E9C6A', 'juste'], partiel: ['#E9C46A', 'en partie'], faux: ['#C0392B', 'faux'], avoir: ['#7A4FC0', 'à vérifier'], sondage: ['#2EA8C9', 'répondu'], vide: ['#D5DBE3', 'pas répondu'] };
function qzSuiviVerdict(q, c){
  const rep = c && c.reponses ? c.reponses[q.id] : undefined;
  if(!qzRepondue(q, rep)) return 'vide';
  if(qzEstEntrainement(qzS.reglages) || qzEstSondage(qzS.reglages)) return qzEstSondage(qzS.reglages) ? 'sondage' : qzVerdict(q, rep);
  return qzVerdict(q, rep);
}
function qzSuiviDuree(ms){ const m = Math.floor(ms / 60000); return m < 1 ? 'moins d\'1 min' : m + ' min'; }
function qzSuiviTuile(e){
  const c = qzS.copies.get(e.id), now = Date.now();
  const rendue = c && qzEstRendue(c), dehors = qzS.dehors.get(e.id);
  const faites = c ? qzS.qs.filter(q => qzRepondue(q, (c.reponses || {})[q.id])).length : 0, N = qzS.qs.length;
  const inactif = c && !rendue ? now - Date.parse(c.updated_at || c.started_at) : 0;
  const etat = !c ? 'absent' : rendue ? 'rendue' : dehors ? 'dehors' : inactif > 120000 ? 'inactif' : 'encours';
  const qe = qzS.encours.get(e.id);
  const info = !c ? 'pas commencé'
    : rendue ? `copie rendue${c.submitted_at ? ' à ' + new Date(c.submitted_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}`
    : dehors ? 'SORTI de la page'
    : `${qe ? 'question ' + qzS.num[qe] + ' · ' : ''}${inactif > 120000 ? 'inactif depuis ' + qzSuiviDuree(inactif) : 'actif'}`;
  const pastilles = c ? qzS.qs.map(q => { const v = qzSuiviVerdict(q, c); return `<i style="background:${QZS_VERD[v][0]}" title="Question ${qzS.num[q.id]} : ${QZS_VERD[v][1]}"${q.id === qe && !rendue ? ' class="cur"' : ''}></i>`; }).join('') : '';
  return `<button type="button" class="qzs-t ${etat}${qzS.sel === e.id ? ' sel' : ''}" onclick="qzSuiviVoir('${e.id}')">
    <span class="qzs-nom">${qzEsc(e.label)}</span>
    <span class="qzs-info">${info}</span>
    <span class="qzs-prog"><span style="width:${N ? Math.round(faites / N * 100) : 0}%"></span></span>
    <span class="qzs-l"><span>${faites} / ${N}</span>${c ? `<span>${qzSuiviDuree((rendue && c.submitted_at ? Date.parse(c.submitted_at) : now) - Date.parse(c.started_at))}</span>` : ''}${c && c.sorties ? `<span class="qzs-sort"><span class="gicon">warning</span> ${c.sorties} sortie${c.sorties > 1 ? 's' : ''}</span>` : ''}</span>
    ${pastilles ? `<span class="qzs-pas">${pastilles}</span>` : ''}</button>`;
}
function qzSuiviCopieHtml(e){
  const c = qzS.copies.get(e.id);
  if(!c) return `<p class="hint">${qzEsc(e.label)} n'a pas encore commencé.</p>`;
  const ctx = { reglages: qzS.reglages, seed: null, pfx: 'k' }, qe = qzS.encours.get(e.id);
  return qzS.qs.map(q => { const v = qzSuiviVerdict(q, c);
    return `<div class="qz-q corr qzs-q${q.id === qe && !qzEstRendue(c) ? ' cur' : ''}"><div class="qz-q-head"><span class="qz-q-num">${qzS.num[q.id]}</span>
      <span class="qzs-v" style="--c:${QZS_VERD[v][0]}">${QZS_VERD[v][1]}</span>${q.id === qe && !qzEstRendue(c) ? '<span class="qzs-ici"><span class="gicon">edit</span> en train de répondre</span>' : ''}</div>
      ${qzEnonceHtml(q)}<div class="qz-q-rep">${v === 'vide' ? '<p class="hint" style="margin:0;">Pas encore de réponse.</p>' : qzRenderSaisie(q, (c.reponses || {})[q.id], 'corrige', ctx)}</div></div>`; }).join('');
}
// Vue par question : réponses, part de justes, réponses fausses les plus fréquentes.
function qzSuiviQuestionsHtml(){
  const copies = qzS.eleves.map(e => qzS.copies.get(e.id)).filter(Boolean);
  return qzS.qs.map(q => {
    const cpt = { juste: 0, partiel: 0, faux: 0, avoir: 0, sondage: 0, vide: 0 }, fausses = new Map();
    copies.forEach(c => {
      const v = qzSuiviVerdict(q, c); cpt[v]++;
      if(v === 'faux' || v === 'partiel'){
        const r = c.reponses[q.id];
        const txt = q.type === 'qcm' ? [].concat(r).map(id => { const ch = (q.choix || []).find(x => x.id === id); return ch ? ch.texte : '?'; }).join(' + ')
          : typeof r === 'string' || typeof r === 'number' ? String(r).trim() : null;
        if(txt) fausses.set(txt, (fausses.get(txt) || 0) + 1);
      }
    });
    const rep = copies.length - cpt.vide, tot = qzS.eleves.length;
    const barre = ['juste', 'partiel', 'faux', 'avoir', 'sondage'].filter(k => cpt[k]).map(k => `<i style="width:${cpt[k] / Math.max(1, tot) * 100}%;background:${QZS_VERD[k][0]}" title="${cpt[k]} ${QZS_VERD[k][1]}"></i>`).join('');
    const top = [...fausses.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
    return `<div class="qzs-qr"><div class="qzs-qr-h"><span class="qz-q-num">${qzS.num[q.id]}</span><span class="qzs-qr-e">${qzMath(String(q.enonce || '').replace(/\s+/g, ' ').slice(0, 140))}</span>
        <span class="qzs-qr-n"><b>${rep}</b> / ${tot} réponse${rep > 1 ? 's' : ''}${cpt.juste + cpt.partiel + cpt.faux ? ` · <b style="color:#2E9C6A;">${Math.round(cpt.juste / Math.max(1, cpt.juste + cpt.partiel + cpt.faux) * 100)} %</b> justes` : ''}</span></div>
      <div class="qzs-barre">${barre}</div>
      ${top.length ? `<div class="qzs-err"><span class="gicon">error</span> Erreurs fréquentes : ${top.map(([t, n]) => `<span>${qzMath(t)} <b>×${n}</b></span>`).join('')}</div>` : ''}</div>`;
  }).join('');
}
function qzSuiviVoir(id){ if(!qzS) return; qzS.sel = qzS.sel === id ? null : id; qzSuiviRendre(); }
function qzSuiviVue(v){ if(!qzS) return; qzS.vue = v; qzSuiviRendre(); }
function qzSuiviRendre(){
  const v = document.getElementById('qzSuivi'); if(!v || !qzS) return;
  const garde = v.querySelector('.qzs-copie'), scroll = garde ? garde.scrollTop : 0;
  const cs = qzS.eleves.map(e => qzS.copies.get(e.id));
  const encours = cs.filter(c => c && !qzEstRendue(c)).length, rendues = cs.filter(c => c && qzEstRendue(c)).length, absents = cs.filter(c => !c).length;
  const dehors = qzS.eleves.filter(e => qzS.dehors.get(e.id) && !qzEstRendue(qzS.copies.get(e.id) || {})).length;
  const sel = qzS.sel && qzS.eleves.find(e => e.id === qzS.sel);
  v.innerHTML = `<div class="qzs-tete">
      <div><div class="qzs-titre">${qzEsc(qzS.devoir.titre || qzS.qz.titre)}</div>
        <div class="hint" style="margin:0;">${qzEsc(qzS.devoir.classes ? qzS.devoir.classes.nom : '')} · <span class="qzs-live"><span class="dot"></span> Suivi en direct</span></div></div>
      <div class="qzs-compte"><span><b>${encours}</b> en cours</span><span><b>${rendues}</b> rendue${rendues > 1 ? 's' : ''}</span><span><b>${absents}</b> pas commencé${absents > 1 ? 's' : ''}</span>${dehors ? `<span class="rouge"><b>${dehors}</b> sorti${dehors > 1 ? 's' : ''}</span>` : ''}</div>
      <div class="qzs-onglets"><button class="${qzS.vue === 'eleves' ? 'on' : ''}" onclick="qzSuiviVue('eleves')"><span class="gicon">groups</span> Élèves</button><button class="${qzS.vue === 'questions' ? 'on' : ''}" onclick="qzSuiviVue('questions')"><span class="gicon">quiz</span> Par question</button></div>
      <button class="btn secondary" onclick="qzSuiviFermer()"><span class="gicon">close</span> Fermer</button></div>
    <div class="qzs-corps${sel && qzS.vue === 'eleves' ? ' avec-copie' : ''}">
      ${qzS.vue === 'eleves' ? `<div class="qzs-grille">${qzS.eleves.map(qzSuiviTuile).join('') || '<p class="hint">Aucun élève.</p>'}</div>
        ${sel ? `<div class="qzs-copie"><div class="qzs-copie-h"><b>${qzEsc(sel.label)}</b><button class="btn secondary qz-mini" onclick="qzSuiviVoir('${sel.id}')"><span class="gicon">close</span></button></div>${qzSuiviCopieHtml(sel)}</div>` : ''}`
        : `<div class="qzs-qliste">${qzSuiviQuestionsHtml()}</div>`}
    </div>
    <p class="qzs-leg">${['juste', 'partiel', 'faux', 'avoir', 'vide'].map(k => `<span><i style="background:${QZS_VERD[k][0]}"></i>${QZS_VERD[k][1]}</span>`).join('')}<span class="hint" style="margin:0;">Correction automatique provisoire, visible de vous seul.</span></p>`;
  const nv = v.querySelector('.qzs-copie'); if(nv) nv.scrollTop = scroll;
  if(typeof qzChargerPhotos === 'function') try{ qzChargerPhotos(v); }catch(e){}
}

(function qzsStyles(){
  const st = document.createElement('style');
  st.textContent = `
    #qzSuivi{position:fixed;inset:0;z-index:9000;background:var(--paper,#FBF8F2);display:none;flex-direction:column;}
    .qzs-tete{display:flex;align-items:center;gap:16px;padding:10px 18px;border-bottom:1px solid rgba(28,43,57,.12);background:#fff;flex-wrap:wrap;}
    .qzs-titre{font:800 1.15rem 'Space Grotesk',sans-serif;}
    .qzs-live{display:inline-flex;align-items:center;gap:5px;color:#C0392B;font-weight:700;} .qzs-live .dot{width:9px;height:9px;border-radius:50%;background:#E35D3A;animation:qzsClign 1.2s infinite;}
    @keyframes qzsClign{50%{opacity:.25;}}
    .qzs-compte{display:flex;gap:12px;margin-left:auto;font-family:'Space Grotesk',sans-serif;} .qzs-compte .rouge{color:#C0392B;}
    .qzs-onglets{display:flex;gap:4px;background:#EEF1F5;border-radius:10px;padding:3px;} .qzs-onglets button{border:0;background:none;border-radius:8px;padding:6px 12px;font:700 .85rem 'Space Grotesk',sans-serif;cursor:pointer;display:inline-flex;gap:4px;align-items:center;color:var(--ink);}
    .qzs-onglets button.on{background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.12);}
    .qzs-corps{flex:1;display:grid;grid-template-columns:1fr;gap:12px;padding:12px;min-height:0;} .qzs-corps.avec-copie{grid-template-columns:minmax(300px,1fr) minmax(380px,1.2fr);}
    .qzs-grille{overflow:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:10px;align-content:start;}
    .qzs-t{display:flex;flex-direction:column;gap:5px;text-align:left;border:2px solid rgba(28,43,57,.1);background:#fff;border-radius:12px;padding:10px 12px;cursor:pointer;font:inherit;color:var(--ink);}
    .qzs-t.sel{border-color:#1F3A5C;box-shadow:0 0 0 3px rgba(31,58,92,.15);}
    .qzs-nom{font-weight:800;font-family:'Space Grotesk',sans-serif;} .qzs-info{font-size:.78rem;color:var(--ink-soft);}
    .qzs-t.encours{border-left:6px solid #2E9C6A;} .qzs-t.inactif{border-left:6px solid #E9C46A;} .qzs-t.inactif .qzs-info{color:#9A6B00;font-weight:700;}
    .qzs-t.rendue{border-left:6px solid #1F3A5C;opacity:.85;} .qzs-t.absent{border-left:6px solid #C8CDD5;opacity:.7;}
    .qzs-t.dehors{border-left:6px solid #C0392B;background:#FBECEA;} .qzs-t.dehors .qzs-info{color:#C0392B;font-weight:800;animation:qzsClign 1s infinite;}
    .qzs-prog{height:6px;background:#E8ECF2;border-radius:3px;overflow:hidden;} .qzs-prog span{display:block;height:100%;background:#2E9C6A;}
    .qzs-l{display:flex;gap:10px;font-size:.78rem;color:var(--ink-soft);flex-wrap:wrap;} .qzs-sort{color:#C0392B;font-weight:700;display:inline-flex;align-items:center;gap:2px;} .qzs-sort .gicon{font-size:15px;}
    .qzs-pas{display:flex;flex-wrap:wrap;gap:3px;} .qzs-pas i{width:12px;height:12px;border-radius:3px;} .qzs-pas i.cur{outline:2px solid #1F3A5C;outline-offset:1px;}
    .qzs-copie{overflow:auto;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:10px 14px;}
    .qzs-copie-h{display:flex;justify-content:space-between;align-items:center;position:sticky;top:-10px;background:#fff;padding:6px 0;z-index:2;font-family:'Space Grotesk',sans-serif;font-size:1.05rem;}
    .qzs-q.cur{box-shadow:0 0 0 3px rgba(46,156,106,.35);}
    .qzs-v{font-size:.75rem;font-weight:800;color:#fff;background:var(--c);border-radius:999px;padding:2px 9px;} .qzs-ici{font-size:.78rem;color:#2E9C6A;font-weight:700;display:inline-flex;gap:3px;align-items:center;} .qzs-ici .gicon{font-size:15px;}
    .qzs-qliste{overflow:auto;display:flex;flex-direction:column;gap:10px;}
    .qzs-qr{background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:10px 14px;}
    .qzs-qr-h{display:flex;gap:10px;align-items:center;} .qzs-qr-e{flex:1;min-width:0;} .qzs-qr-n{font-size:.85rem;white-space:nowrap;}
    .qzs-barre{display:flex;height:12px;background:#E8ECF2;border-radius:6px;overflow:hidden;margin:8px 0 4px;} .qzs-barre i{display:block;height:100%;}
    .qzs-err{font-size:.85rem;color:#8a1f1f;display:flex;gap:8px;flex-wrap:wrap;align-items:center;} .qzs-err .gicon{font-size:17px;} .qzs-err span{background:#FBECEA;border-radius:8px;padding:1px 8px;}
    .qzs-leg{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin:0;padding:6px 18px 10px;font-size:.8rem;} .qzs-leg i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:4px;vertical-align:-1px;}
    @media (max-width:900px){ .qzs-corps.avec-copie{grid-template-columns:1fr;} }
    .qz-suivi-note{display:flex;align-items:center;gap:6px;font-size:.82rem;color:#1F3A5C;background:#EEF4FA;border-radius:10px;padding:6px 10px;margin:0 0 10px;} .qz-suivi-note .gicon{font-size:18px;}
  `;
  document.head.appendChild(st);
})();

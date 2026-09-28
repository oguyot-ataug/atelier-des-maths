/* =====================================================================
   questionnaires-sondage.js -- Mode « Sondage » des questionnaires : pas de bonne réponse attendue.

   Demandé : "permettre dans les questionnaires un mode sondage (pas de bonnes réponses attendues) :
   réponse libre ou listes (+autre)".

   - Réglage mode = 'sondage' dans l'éditeur ; seules deux sortes de questions (plus les blocs de
     texte) : « Choix dans une liste » (un seul ou plusieurs choix, avec « Autre : … » en option) et
     « Réponse libre » (une ligne ou un paragraphe). Pas de points, pas de note, pas de carnet.
   - L'élève répond comme à une interrogation à la maison (enregistrement automatique, date limite)
     puis « Envoie ses réponses » : il voit un simple récapitulatif, jamais de correction.
   - Le professeur voit les résultats : nombre et pourcentage de chaque choix, réponses « Autre » et
     réponses libres, avec ou sans les noms, et un export CSV (tableur).
   - Séance en direct : un sondage peut aussi se faire en direct (résultats qui arrivent au tableau).
   Réponses : liste → { c: 'idChoix' | ['id', …] (dont '_autre'), autre: 'texte' } ; libre → texte.

   Dépend de questionnaires.js (QZ_EXT, qzP, qzC, qzModifie, qzEntete…).
   ===================================================================== */

const QZ_AUTRE = '_autre';
function qzEstSondage(reglages){ return !!reglages && reglages.mode === 'sondage'; }
function qzSonType(q){ return !!q && (q.type === 'liste' || q.type === 'libre'); }
function qzSonChoixDe(rep){ return rep && typeof rep === 'object' && !Array.isArray(rep) ? (Array.isArray(rep.c) ? rep.c : rep.c ? [rep.c] : []) : []; }
function qzSonChoixListe(q){ return (q.choix || []).filter(c => String(c.texte || '').trim()); }

/* ---------- Choix dans une liste ---------- */
QZ_EXT.liste = {
  sondage: true, ptsFixes: true,
  nouvelle(q){ Object.assign(q, { points: 0, multiple: false, autre: true, choix: [{ id: qzId(), texte: '' }, { id: qzId(), texte: '' }, { id: qzId(), texte: '' }] }); },
  max(){ return 0; },
  auto(){ return 0; },
  verifier(q){
    const n = qzSonChoixListe(q).length;
    if(n < 2 && !(n === 1 && q.autre)) return 'il faut au moins deux choix.';
    return '';
  },
  repondue(q, rep){
    const c = qzSonChoixDe(rep);
    if(!c.length) return false;
    return !(c.length === 1 && c[0] === QZ_AUTRE && !String((rep && rep.autre) || '').trim());
  },
  corps(q){
    const id = q.id;
    return `
      <div class="qz-lab-row"><span class="qz-lab">Choix proposés <span class="hint" style="margin:0;">(pas de bonne réponse : c'est un sondage)</span></span>
        <label class="qz-check"><input type="checkbox" ${q.multiple ? 'checked' : ''} onchange="qzEdSet('${id}','multiple',this.checked,true)"> Plusieurs choix possibles</label></div>
      ${(q.choix || []).map((c, i) => `<div class="qz-sub">
        <span class="gicon qz-son-puce">${q.multiple ? 'check_box_outline_blank' : 'radio_button_unchecked'}</span>
        <input type="text" value="${qzEsc(c.texte)}" oninput="qzEdSousSet('${id}','choix','${c.id}','texte',this.value)" placeholder="Choix ${i + 1}">
        <button type="button" class="qz-x" onclick="qzEdSousSupprimer('${id}','choix','${c.id}')" title="Supprimer"><span class="gicon">close</span></button>
      </div>`).join('')}
      ${q.autre ? `<div class="qz-sub qz-son-autre-ed"><span class="gicon qz-son-puce">${q.multiple ? 'check_box_outline_blank' : 'radio_button_unchecked'}</span><span>Autre : <i>l'élève écrit sa réponse</i></span></div>` : ''}
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <button type="button" class="btn secondary qz-mini" onclick="qzEdSousAjouter('${id}','choix')"><span class="gicon">add</span> Choix</button>
        <label class="qz-check"><input type="checkbox" ${q.autre ? 'checked' : ''} onchange="qzEdSet('${id}','autre',this.checked,true)"> Ajouter « Autre : … » (réponse écrite)</label>
      </div>`;
  },
  saisie(q, rep, mode){
    const dis = mode === 'passer' ? '' : 'disabled', coches = qzSonChoixDe(rep), type = q.multiple ? 'checkbox' : 'radio';
    const autreOn = coches.includes(QZ_AUTRE), autreTxt = (rep && rep.autre) || '';
    const ligne = (cid, html) => { const on = coches.includes(cid);
      return `<label class="qz-choice${on ? ' on' : ''}"><input type="${type}" name="qzSon_${q.id}" value="${cid}" ${on ? 'checked' : ''} ${dis}
        onchange="qzSonChoix('${q.id}','${cid}',this.checked,${!!q.multiple})"><span>${html}</span></label>`; };
    return `<div class="qz-choix qz-son">${qzSonChoixListe(q).map(c => ligne(c.id, qzMath(c.texte))).join('')}
      ${q.autre ? `<label class="qz-choice qz-son-autre${autreOn ? ' on' : ''}"><input type="${type}" name="qzSon_${q.id}" value="${QZ_AUTRE}" ${autreOn ? 'checked' : ''} ${dis}
        onchange="qzSonChoix('${q.id}','${QZ_AUTRE}',this.checked,${!!q.multiple})"><span>Autre :</span>
        <input type="text" class="qz-input" value="${qzEsc(autreTxt)}" ${dis} maxlength="300" placeholder="${mode === 'passer' ? 'Écris ta réponse' : ''}" oninput="qzSonAutre('${q.id}',this.value)"></label>` : ''}
    </div>${q.multiple && mode === 'passer' ? '<p class="hint" style="margin:4px 0 0;">Plusieurs choix possibles.</p>' : ''}`;
  },
};

/* ---------- Réponse libre ---------- */
QZ_EXT.libre = {
  sondage: true, ptsFixes: true,
  nouvelle(q){ Object.assign(q, { points: 0, long: false }); },
  max(){ return 0; },
  auto(){ return 0; },
  repondue(q, rep){ return String(rep ?? '').trim() !== ''; },
  corps(q){
    return `<label class="qz-lab" style="margin-top:6px;">L'élève répond
      <select onchange="qzEdSet('${q.id}','long',this.value==='1')">
        <option value="0"${!q.long ? ' selected' : ''}>en quelques mots (une ligne)</option>
        <option value="1"${q.long ? ' selected' : ''}>en quelques phrases (un paragraphe)</option>
      </select></label>`;
  },
  saisie(q, rep, mode){
    const dis = mode === 'passer' ? '' : 'disabled', v = rep == null ? '' : String(rep);
    return q.long
      ? `<textarea class="qz-input" rows="4" maxlength="3000" ${dis} oninput="qzSaisieTexte('${q.id}',this.value)" placeholder="${mode === 'passer' ? 'Écris ta réponse…' : ''}">${qzEsc(v)}</textarea>`
      : `<input type="text" class="qz-input" maxlength="300" value="${qzEsc(v)}" ${dis} autocomplete="off" oninput="qzSaisieTexte('${q.id}',this.value)" placeholder="${mode === 'passer' ? 'Ta réponse' : ''}">`;
  },
};

/* ---------- Saisie élève ---------- */
function qzSonChoix(qid, cid, coche, multiple){
  if(!qzP) return;
  const rep = Object.assign({}, qzP.reponses[qid] || {});
  if(multiple){ const a = new Set(qzSonChoixDe(rep)); if(coche) a.add(cid); else a.delete(cid); rep.c = Array.from(a); }
  else rep.c = cid;
  if(!qzSonChoixDe(rep).includes(QZ_AUTRE)) delete rep.autre;
  qzP.reponses[qid] = rep;
  document.querySelectorAll(`#qzQ_${qid} .qz-son .qz-choice`).forEach(l => {
    const on = l.querySelector('input').checked; l.classList.toggle('on', on);
    if(l.classList.contains('qz-son-autre') && !on){ const t = l.querySelector('input[type=text]'); if(t) t.value = ''; }
  });
  if(cid === QZ_AUTRE && coche){ const t = document.querySelector(`#qzQ_${qid} .qz-son-autre input[type=text]`); if(t) t.focus(); }
  qzModifie();
}
// Écrire dans « Autre » coche « Autre » (et, pour un choix unique, décoche le reste).
function qzSonAutre(qid, v){
  if(!qzP) return;
  const q = qzP.questions.find(x => x.id === qid); if(!q) return;
  const rep = Object.assign({}, qzP.reponses[qid] || {});
  rep.autre = v;
  if(v.trim()){
    if(q.multiple){ const a = new Set(qzSonChoixDe(rep)); a.add(QZ_AUTRE); rep.c = Array.from(a); } else rep.c = QZ_AUTRE;
    document.querySelectorAll(`#qzQ_${qid} .qz-son .qz-choice`).forEach(l => {
      const i = l.querySelector('input'); if(i.value === QZ_AUTRE) i.checked = true; else if(!q.multiple) i.checked = false;
      l.classList.toggle('on', i.checked);
    });
  }
  qzP.reponses[qid] = rep;
  qzModifie();
}

/* ---------- Passation : accueil et fin ---------- */
function qzSonAccueil(){
  const n = qzP.questions.filter(q => q.type !== 'texte').length, lim = qzP.data.devoir.date_limite;
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-accueil">
      ${qzP.data.devoir.consigne ? `<p class="qz-consigne">${qzMath(qzP.data.devoir.consigne)}</p>` : ''}
      <div class="qz-infos">
        <span><span class="gicon">how_to_vote</span> Sondage : pas de bonne ou de mauvaise réponse</span>
        <span><span class="gicon">help</span> ${n} question${n > 1 ? 's' : ''}</span>
        ${lim ? `<span><span class="gicon">event</span> Jusqu'au ${new Date(lim).toLocaleDateString('fr-FR')}</span>` : ''}
      </div>
      <ul class="qz-regles">
        <li>Réponds sincèrement : ce n'est ni noté ni corrigé, ton professeur veut simplement connaître ton avis.</li>
        <li>Tes réponses sont enregistrées automatiquement : tu peux fermer la page et reprendre plus tard.</li>
        <li>Quand tu as fini, clique sur <b>Envoyer mes réponses</b> : tu ne pourras plus les modifier.</li>
      </ul>
      <button class="btn qz-go" onclick="qzCommencer()"><span class="gicon">play_arrow</span> Commencer</button>
    </div>`;
}
function qzSonMerci(){
  const ctx = qzPCtx(), num = qzNumeros();
  document.getElementById('qzRoot').innerHTML = `${qzEntete()}
    <div class="qz-done"><span class="gicon">how_to_vote</span><div><b>${qzP.apercu ? 'Aperçu terminé : voici ce que l\'élève a envoyé.' : 'Merci, tes réponses sont envoyées !'}</b>
      <p>${qzP.apercu ? 'Les élèves ne voient ni correction ni note : seulement ce récapitulatif.' : 'C\'était un sondage : il n\'y a ni note ni correction.'}</p></div></div>
    <p class="hint">${qzP.apercu ? 'Réponses données :' : 'Rappel de tes réponses :'}</p>
    <div class="qz-questions">${qzP.questions.filter(q => q.type !== 'texte').map(q => `<div class="qz-q lecture"><div class="qz-q-head"><span class="qz-q-num">${num[q.id]}</span></div>${qzEnonceHtml(q)}<div class="qz-q-rep">${qzRenderSaisie(q, qzP.reponses[q.id], 'lecture', ctx)}</div></div>`).join('')}</div>
    ${qzP.apercu ? `<div class="qz-rendre-row"><button class="btn secondary" onclick="qzApercu()"><span class="gicon">replay</span> Recommencer l'aperçu</button><button class="btn" onclick="qzRetourEleve()">Retour à l'éditeur</button></div>` : ''}`;
  qzChargerPhotos(document.getElementById('qzRoot'));
}

/* ---------- Professeur : résultats du sondage ---------- */
// Décompte d'une question sur un ensemble de réponses [{ e: élève, r: réponse }].
function qzSonDecompte(q, reps){
  if(q.type === 'liste'){
    const choix = qzSonChoixListe(q).map(c => ({ id: c.id, texte: c.texte, n: 0, qui: [] }));
    const autre = { id: QZ_AUTRE, texte: 'Autre', n: 0, qui: [], txts: [] };
    let n = 0;
    reps.forEach(({ e, r }) => {
      const c = qzSonChoixDe(r); if(!c.length) return; n++;
      c.forEach(id => {
        if(id === QZ_AUTRE){ autre.n++; autre.qui.push(e); const t = String((r && r.autre) || '').trim(); if(t) autre.txts.push({ e, t }); return; }
        const x = choix.find(y => y.id === id); if(x){ x.n++; x.qui.push(e); }
      });
    });
    return { n, lignes: q.autre ? choix.concat(autre) : choix, autre };
  }
  const txts = reps.map(({ e, r }) => ({ e, t: String(r ?? '').trim() })).filter(x => x.t);
  return { n: txts.length, txts };
}
function qzSonCarteHtml(q, numero, reps, noms){
  const d = qzSonDecompte(q, reps), pct = x => d.n ? Math.round(100 * x / d.n) : 0;
  const nomsDe = l => noms && l.length ? `<small class="qz-son-qui">${l.map(e => qzEsc(e.label)).join(', ')}</small>` : '';
  const txtsHtml = (l, titre) => l.length ? `<div class="qz-son-txts">${titre ? `<p class="qz-son-t">${titre}</p>` : ''}${l.map(x => `<div>${noms ? `<b>${qzEsc(x.e.label)}</b> ` : ''}${qzEsc(x.t)}</div>`).join('')}</div>` : '';
  let corps;
  if(q.type === 'liste'){
    const max = Math.max(1, ...d.lignes.map(l => l.n));
    corps = `<div class="qz-son-bars">${d.lignes.map(l => `<div class="qz-son-bar${l.n === max && l.n ? ' top' : ''}">
        <span class="l">${l.id === QZ_AUTRE ? '<i>Autre</i>' : qzMath(l.texte)}</span>
        <span class="b"><i style="width:${pct(l.n)}%"></i></span><b>${l.n}</b><span class="p">${pct(l.n)} %</span>${nomsDe(l.qui)}</div>`).join('')}</div>
      ${q.multiple ? '<p class="hint" style="margin:4px 0 0;">Plusieurs choix possibles : les pourcentages ne font pas 100 % au total.</p>' : ''}
      ${txtsHtml(d.autre.txts, 'Réponses « Autre »')}`;
  } else corps = d.n ? txtsHtml(d.txts) : '';
  return `<div class="qz-son-card">
    <div class="qz-son-head"><span class="qz-q-num">${numero}</span><span class="qz-type-pill"><span class="gicon">${qzType(q.type).icon}</span> ${qzType(q.type).label}</span>
      <span class="qz-son-n">${d.n} réponse${d.n > 1 ? 's' : ''}</span></div>
    ${qzEnonceHtml(q)}
    ${d.n ? corps : '<p class="hint" style="margin:6px 0 0;">Pas encore de réponse.</p>'}
  </div>`;
}
function qzSonResultats(root){
  const d = qzC.devoir, qs = qzCQuestions(), noms = !!qzC.sonNoms;
  const envoyees = qzC.eleves.filter(e => qzEstRendue(qzC.copies.get(e.id)));
  const enCours = qzC.eleves.filter(e => qzC.copies.has(e.id) && !qzEstRendue(qzC.copies.get(e.id))).length;
  // Réponses prises en compte : copies envoyées, et aussi celles en cours si le professeur le demande.
  const pris = qzC.eleves.filter(e => { const c = qzC.copies.get(e.id); return c && (qzEstRendue(c) || qzC.sonEnCours); });
  root.innerHTML = `<span class="back-btn" onclick="qzCFermer()">← Interrogations en ligne</span>
    <h1 style="margin:6px 0 2px;"><span class="gicon">how_to_vote</span> ${qzEsc(d.titre)}</h1>
    <p class="hint" style="margin:0 0 10px;">${qzEsc(d.classes ? d.classes.nom : '')} · Sondage, sans note · <b>${envoyees.length}</b> réponse${envoyees.length > 1 ? 's' : ''} envoyée${envoyees.length > 1 ? 's' : ''}${enCours ? ` · ${enCours} en cours` : ''} sur ${qzC.eleves.length} élève${qzC.eleves.length > 1 ? 's' : ''}</p>
    <div class="qz-son-tools">
      <label class="qz-check"><input type="checkbox" ${noms ? 'checked' : ''} onchange="qzC.sonNoms=this.checked;qzCRender()"> Afficher les noms</label>
      ${enCours ? `<label class="qz-check"><input type="checkbox" ${qzC.sonEnCours ? 'checked' : ''} onchange="qzC.sonEnCours=this.checked;qzCRender()"> Compter aussi les réponses pas encore envoyées</label>` : ''}
      <button class="btn secondary qz-mini" onclick="qzSonCsv()"><span class="gicon">download</span> Exporter (tableur)</button>
      <button class="btn secondary qz-mini" onclick="qzOuvrirCorrection('${d.id}')"><span class="gicon">refresh</span> Actualiser</button>
    </div>
    <div class="qz-son-liste">${qs.map((q, i) => qzSonCarteHtml(q, i + 1, pris.map(e => ({ e, r: (qzC.copies.get(e.id).reponses || {})[q.id] })), noms)).join('')}</div>
    <h3 style="margin:18px 0 6px;">Qui a répondu</h3>
    <div class="qz-son-qui-liste">${qzC.eleves.map(e => { const c = qzC.copies.get(e.id), k = !c ? 'vide' : qzEstRendue(c) ? 'ok' : 'encours';
      return `<span class="qz-son-el ${k}" title="${{ vide: 'pas encore ouvert', ok: 'réponses envoyées', encours: 'commencé, pas encore envoyé' }[k]}">${qzEsc(e.label)}</span>`; }).join('')}</div>
    <p class="hint" style="margin:6px 0 0;"><span class="qz-son-el ok">envoyé</span> <span class="qz-son-el encours">commencé</span> <span class="qz-son-el vide">pas encore ouvert</span></p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
      ${d.questionnaire_id ? `<button class="btn secondary" onclick="qzBanqueDonner('${d.questionnaire_id}')"><span class="gicon">content_copy</span> Donner à une autre classe</button>
      <button class="btn secondary qzd-btn" onclick="qzDirectLancer('${d.questionnaire_id}')"><span class="gicon">cast_for_education</span> Sondage en direct</button>` : ''}
    </div>`;
  qzChargerPhotos(root);
}
// Export tableur (CSV, séparateur « ; » pour Excel en français) : une ligne par élève.
function qzSonCsv(){
  const qs = qzCQuestions().filter(qzSonType), cel = v => '"' + String(v ?? '').replace(/"/g, '""').replace(/\r?\n/g, ' ') + '"';
  const texte = (q, r) => {
    if(q.type === 'libre') return String(r ?? '');
    const c = qzSonChoixDe(r);
    return c.map(id => id === QZ_AUTRE ? 'Autre : ' + String((r && r.autre) || '').trim() : ((q.choix || []).find(x => x.id === id) || {}).texte || '').filter(Boolean).join(' / ');
  };
  const lignes = [['Élève', 'État'].concat(qs.map((q, i) => (i + 1) + '. ' + String(q.enonce || '').replace(/\s+/g, ' ').slice(0, 80)))];
  qzC.eleves.forEach(e => { const c = qzC.copies.get(e.id);
    lignes.push([e.label, !c ? 'pas ouvert' : qzEstRendue(c) ? 'envoyé' : 'en cours'].concat(qs.map(q => c ? texte(q, (c.reponses || {})[q.id]) : ''))); });
  const blob = new Blob(['﻿' + lignes.map(l => l.map(cel).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'sondage-' + String(qzC.devoir.titre || 'resultats').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.csv';
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}

/* ---------- Séance en direct : détail d'une question de sondage ---------- */
function qzSonDirectDetail(q, reps){
  const d = qzSonDecompte(q, reps.map(r => ({ e: null, r })));
  if(!d.n) return '';
  const pct = x => Math.round(100 * x / d.n);
  if(q.type === 'liste') return `<div class="qzd-det">${d.lignes.map(l => `<div class="qzd-ch"><span class="l">${l.id === QZ_AUTRE ? '<i>Autre</i>' : qzMath(l.texte)}</span><span class="b"><i style="width:${pct(l.n)}%"></i></span><b>${l.n}</b></div>`).join('')}
    ${d.autre.txts.length ? `<p class="qzd-det-t">Réponses « Autre »</p><div class="qzd-txts">${d.autre.txts.slice(0, 40).map(x => `<div>${qzEsc(x.t)}</div>`).join('')}</div>` : ''}</div>`;
  return `<div class="qzd-det"><p class="qzd-det-t">Réponses (sans les noms)</p><div class="qzd-txts">${d.txts.slice(0, 60).map(x => `<div>${qzEsc(x.t)}</div>`).join('')}</div></div>`;
}

(function qzSonStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .qz-mode.sondage.on{border-color:#26AAB1;background:rgba(38,170,177,.08);} .qz-mode.sondage .gicon{color:#16767B;}
    .qz-son-puce{color:#8A919C;font-size:1.2rem;}
    .qz-son-autre-ed{color:var(--ink-soft);}
    .qz-son .qz-son-autre{align-items:center;flex-wrap:wrap;}
    .qz-son .qz-son-autre > span{flex:0 0 auto;}
    .qz-son .qz-son-autre input[type=text]{flex:1;min-width:160px;margin:0;padding:7px 11px;border:1px solid var(--line,#D5DAE1);border-radius:8px;background:#fff;font:inherit;height:auto;}
    .qz-son .qz-son-autre input[type=text]:disabled{background:transparent;}
    .qz-son-tools{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin:0 0 12px;}
    .qz-son-liste{display:flex;flex-direction:column;gap:12px;}
    .qz-son-card{background:var(--paper,#fff);border:1px solid var(--line,#E3E6EB);border-radius:14px;padding:14px 16px;}
    .qz-son-head{display:flex;align-items:center;gap:10px;margin-bottom:6px;flex-wrap:wrap;}
    .qz-son-n{margin-left:auto;font-weight:700;color:#16767B;font-size:.9rem;}
    .qz-son-bars{display:flex;flex-direction:column;gap:6px;margin-top:8px;}
    .qz-son-bar{display:grid;grid-template-columns:minmax(120px,1.2fr) 2fr auto 52px;gap:10px;align-items:center;}
    .qz-son-bar .b{height:14px;border-radius:7px;background:rgba(28,43,57,.07);overflow:hidden;}
    .qz-son-bar .b i{display:block;height:100%;background:#26AAB1;border-radius:7px;}
    .qz-son-bar.top .b i{background:#16767B;}
    .qz-son-bar .p{color:var(--ink-soft);font-size:.88rem;text-align:right;}
    .qz-son-qui{grid-column:1 / -1;color:var(--ink-soft);margin:-2px 0 4px;}
    .qz-son-txts{margin-top:10px;display:flex;flex-direction:column;gap:6px;}
    .qz-son-txts > div{background:rgba(38,170,177,.07);border-radius:10px;padding:7px 11px;}
    .qz-son-t{margin:0;font-weight:700;font-size:.9rem;color:#16767B;background:none!important;padding:0!important;}
    .qz-son-qui-liste{display:flex;flex-wrap:wrap;gap:6px;}
    .qz-son-el{display:inline-block;border-radius:999px;padding:3px 10px;font-size:.85rem;background:rgba(28,43,57,.06);color:#8A919C;}
    .qz-son-el.ok{background:#16767B;color:#fff;} .qz-son-el.encours{background:rgba(38,170,177,.18);color:#16767B;}
    @media (max-width:640px){ .qz-son-bar{grid-template-columns:1fr auto 44px;} .qz-son-bar .l{grid-column:1 / -1;} }
  `;
  document.head.appendChild(st);
})();

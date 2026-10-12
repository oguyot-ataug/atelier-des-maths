/* =====================================================================
   PROGRESSION-ETAB.JS -- Progression d'établissement.
   Demandé : « établir une progression, comme une progression établissement. N'importe quel prof
   peut établir cette progression mais elle est validée par le référent. » ; décision : « modèle
   par défaut » (chaque professeur peut toujours avoir sa propre progression).

   - Un professeur propose sa progression d'un niveau (depuis « Ma progression ») : une ligne
     « proposee » de la table progressions_etab, avec un mot facultatif.
   - Le référent de l'établissement (onglet « Progressions » de « Mon établissement ») la regarde,
     la compare à la progression en vigueur, la valide (fonction progression_etab_valider : l'ancienne
     est archivée) ou la refuse avec un commentaire que l'auteur voit. Le référent peut aussi publier
     directement la sienne, ou retirer la progression en vigueur.
   - La progression validée sert de modèle par défaut : un professeur sans progression personnelle
     la voit (pages de niveau, frise, « Ma progression ») et peut partir d'elle pour adapter la
     sienne ; ses élèves voient celle de leur professeur, sinon celle de l'établissement, sinon
     celle du site.
   Format d'une progression : items = [{ t, nom, debut, fin, evt }] dans l'ordre (t : titre
   d'origine du chapitre, ou « evt:… » pour un événement ; nom : nom personnalisé ; dates ISO).
   ===================================================================== */

let peEtabUaiCache = { id: null, uai: null };
async function peEtabUai(){
  if(!currentUser) return null;
  if(peEtabUaiCache.id === currentUser.id) return peEtabUaiCache.uai;
  const { data } = await sb.from('profiles').select('uai').eq('id', currentUser.id).maybeSingle();
  peEtabUaiCache = { id: currentUser.id, uai: (data && data.uai) || null };
  return peEtabUaiCache.uai;
}
const peEtabNom = p => p ? escapeHtml([p.prenom, p.nom].filter(Boolean).join(' ').trim() || 'un collègue') : 'un collègue';
const peEtabDate = iso => iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
const PE_ETAB_SEL = 'id,uai,niveau,statut,auteur_id,items,message,reponse,valide_at,created_at,updated_at,auteur:profiles!progressions_etab_auteur_id_fkey(prenom,nom)';

/* Progression validée de l'établissement de l'utilisateur pour un niveau (ou null). */
async function peEtabValidee(lvl){
  const uai = await peEtabUai(); if(!uai) return null;
  const { data } = await sb.from('progressions_etab').select(PE_ETAB_SEL).eq('uai', uai).eq('niveau', lvl).eq('statut', 'validee').maybeSingle();
  return data || null;
}
/* La même, au format des lignes de la table progressions (pour app.js). */
async function peEtabRows(lvl){
  const v = await peEtabValidee(lvl);
  if(!v || !Array.isArray(v.items)) return null;
  return v.items.map((it, i) => ({ chapitre_titre: it.t, nom_perso: it.nom || null, date_debut: it.debut || null, date_fin: it.fin || null, ordre: i, _etab: v }));
}
/* Éditeur → items, et items → éditeur. */
function peEtabDepuisEditeur(){
  return progEditorItems.map(it => ({ t: it.titre, nom: it.nomPerso || null, debut: it.dateDebut ? progIsoLocal(it.dateDebut) : null, fin: it.dateFin ? progIsoLocal(it.dateFin) : null, evt: !!it.evt }));
}
function peEtabVersEditeur(items, lvl){
  const def = CHAPITRES_BY_LEVEL[lvl] || CH6, J = s => s ? new Date(s + 'T00:00:00') : null;
  const out = items.map(it => {
    if(progEstEvt(it.t)) return { titre: it.t, nomPerso: it.nom || 'Événement', evt: true, code: '', cat: 'E', p: '', s: 1, dateDebut: J(it.debut), dateFin: J(it.fin) };
    const b = def.find(c => c.t === it.t); if(!b) return null;
    return { titre: it.t, nomPerso: it.nom || '', code: b.code, cat: b.cat, p: b.p, s: b.s, dateDebut: J(it.debut), dateFin: J(it.fin) };
  }).filter(Boolean);
  def.forEach(c => { if(!out.some(x => x.titre === c.t)) out.push({ titre: c.t, nomPerso: '', code: c.code, cat: c.cat, p: c.p, s: c.s, dateDebut: friseStartDate(c.d), dateFin: friseEndDate(c.d) }); });
  return out;
}

/* Liste lisible d'une progression (aperçu), éventuellement comparée à une autre. */
function peEtabTableHtml(items, lvl, ref){
  const def = CHAPITRES_BY_LEVEL[lvl] || CH6, J = s => s ? new Date(s + 'T00:00:00') : null;
  const sem = it => { const a = J(it.debut), b = J(it.fin); return a && b ? Math.max(.5, Math.round((b - a) / 864e5 / 7 * 2) / 2) : null; };
  // Positions comparées entre chapitres seulement (un événement ajouté ne fait pas « reculer » la suite).
  const rang = l => { let k = 0; return l.map(x => progEstEvt(x.t) ? -1 : k++); };
  const refRang = ref ? rang(ref) : null, rg = rang(items);
  const refPos = ref ? new Map(ref.map((r, i) => [r.t, { i: refRang[i], r }])) : null;
  let n = 0;
  return `<table class="pe-etab-table"><thead><tr><th>N°</th><th>Chapitre</th><th>Dates</th>${ref ? '<th>Par rapport à la progression en vigueur</th>' : ''}</tr></thead><tbody>${items.map((it, i) => {
    const evt = progEstEvt(it.t), b = evt ? null : def.find(c => c.t === it.t), nom = it.nom || (b ? b.t : 'Événement');
    let diff = '';
    if(ref){ const o = refPos.get(it.t);
      if(!o) diff = '<span class="pe-diff plus">nouveau</span>';
      else { const d = [], j = rg[i]; if(j >= 0 && o.i !== j) d.push(o.i > j ? `avancé de ${o.i - j} place${o.i - j > 1 ? 's' : ''}` : `reculé de ${j - o.i} place${j - o.i > 1 ? 's' : ''}`);
        const s1 = sem(o.r), s2 = sem(it); if(s1 != null && s2 != null && s1 !== s2) d.push(`${String(s1).replace('.', ',')} → ${String(s2).replace('.', ',')} sem.`);
        if((o.r.nom || null) !== (it.nom || null)) d.push('renommé');
        diff = d.length ? `<span class="pe-diff">${d.join(' · ')}</span>` : '<span class="pe-diff egal">identique</span>'; } }
    return `<tr class="${evt ? 'evt' : ''}"><td>${evt ? '<span class="gicon">event</span>' : ++n}</td><td><b>${escapeHtml(nom)}</b>${b ? ` <span class="pe-code">${escapeHtml(b.code)}</span>` : ''}${it.nom && b && it.nom !== b.t ? `<br><small>${escapeHtml(b.t)}</small>` : ''}</td>
      <td>${J(it.debut) && J(it.fin) ? formatDateRangeFr(J(it.debut), J(it.fin)) : ''}${sem(it) != null ? ` <small>(${String(sem(it)).replace('.', ',')} sem.)</small>` : ''}</td>${ref ? `<td>${diff}</td>` : ''}</tr>`;
  }).join('')}${ref ? ref.filter(r => !items.some(x => x.t === r.t)).map(r => `<tr><td></td><td><s>${escapeHtml(r.nom || r.t)}</s></td><td></td><td><span class="pe-diff moins">retiré</span></td></tr>`).join('') : ''}</tbody></table>`;
}
function peEtabFenetre(titre, html){
  let ov = document.getElementById('peEtabOv');
  if(!ov){ ov = document.createElement('div'); ov.id = 'peEtabOv'; ov.className = 'modal-overlay'; document.body.appendChild(ov); ov.addEventListener('click', e => { if(e.target === ov) ov.style.display = 'none'; }); }
  ov.innerHTML = `<div class="modal-card pe-etab-modal"><button class="btn secondary pe-etab-x" onclick="document.getElementById('peEtabOv').style.display='none'"><span class="gicon">close</span></button><h3 style="margin:0 0 10px;">${titre}</h3>${html}</div>`;
  ov.style.display = 'flex';
}

/* ---------- Dans « Ma progression » ---------- */
let peEtabEnCours = null; // la progression validée affichée dans l'éditeur, pour le niveau courant
async function peEtabPanneau(lvl){
  let box = document.getElementById('peEtabBox');
  if(!box){ const st = document.getElementById('progStatus'); if(!st) return; box = document.createElement('div'); box.id = 'peEtabBox'; box.className = 'pe-etab-box'; st.after(box); }
  box.innerHTML = '';
  if(!currentUser || !(currentUserRole === 'prof' || currentUserRole === 'admin')) return;
  const uai = await peEtabUai();
  if(!uai){ box.innerHTML = '<span class="hint" style="margin:0;"><span class="gicon">domain</span> Votre compte n\'est rattaché à aucun établissement : pas de progression d\'établissement.</span>'; return; }
  const [{ data: rows }, val] = await Promise.all([
    sb.from('progressions_etab').select(PE_ETAB_SEL).eq('uai', uai).eq('niveau', lvl).eq('auteur_id', currentUser.id).in('statut', ['proposee', 'refusee']).order('updated_at', { ascending: false }).limit(3),
    peEtabValidee(lvl)]);
  peEtabEnCours = val;
  const referent = typeof currentReferentEtab !== 'undefined' && currentReferentEtab && currentReferentEtab.uai === uai;
  const lvlTxt = (typeof niveauLabel === 'function' ? niveauLabel(lvl) : lvl);
  const recent = Date.now() - 45 * 864e5; // un refus reste affiché 45 jours
  const mes = (rows || []).filter(r => r.statut === 'proposee' || Date.parse(r.updated_at) > recent).map(r => r.statut === 'proposee'
    ? `<div class="pe-etab-ligne attente"><span class="gicon">hourglass_top</span> Votre proposition du ${peEtabDate(r.created_at)} attend la validation du référent. <button class="btn secondary" onclick="peEtabRetirerProposition('${r.id}')">Retirer</button></div>`
    : `<div class="pe-etab-ligne refus"><span class="gicon">block</span> Proposition du ${peEtabDate(r.created_at)} non retenue${r.reponse ? ` : « ${escapeHtml(r.reponse)} »` : ''}.</div>`).join('');
  box.innerHTML = `<div class="pe-etab-tete"><span class="gicon">domain</span> <b>Progression de l'établissement</b> · ${escapeHtml(lvlTxt)}</div>
    ${val ? `<div class="pe-etab-ligne ok"><span class="gicon">verified</span> Validée le ${peEtabDate(val.valide_at)} (proposée par ${peEtabNom(val.auteur)}). Elle sert de modèle à vos collègues qui n'ont pas leur propre progression.
        <button class="btn secondary" onclick="peEtabVoir('${val.id}')"><span class="gicon">visibility</span> Voir</button>
        <button class="btn secondary" onclick="peEtabPartir()"><span class="gicon">content_copy</span> Partir de cette progression</button></div>`
      : '<div class="pe-etab-ligne"><span class="gicon">info</span> Aucune progression d\'établissement validée pour ce niveau.</div>'}
    ${mes}
    <div class="pe-etab-actions"><button class="btn" onclick="peEtabProposer()"><span class="gicon">${referent ? 'publish' : 'send'}</span> ${referent ? 'Publier cette progression pour l\'établissement' : 'Proposer cette progression à l\'établissement'}</button>
      ${referent ? '<button class="btn secondary" onclick="peEtabAllerReferent()"><span class="gicon">inbox</span> Propositions des collègues</button>' : ''}</div>`;
}
async function peEtabVoir(id){
  const { data: r } = await sb.from('progressions_etab').select(PE_ETAB_SEL).eq('id', id).maybeSingle();
  if(!r) return;
  peEtabFenetre(`Progression de l'établissement · ${escapeHtml(r.niveau)}`, `<p class="hint" style="margin:0 0 8px;">${r.statut === 'validee' ? 'Validée le ' + peEtabDate(r.valide_at) : 'Proposée le ' + peEtabDate(r.created_at)} · par ${peEtabNom(r.auteur)}</p>${peEtabTableHtml(r.items || [], r.niveau)}`);
}
async function peEtabPartir(){
  const lvl = document.getElementById('progNiveauSelect').value;
  const v = peEtabEnCours && peEtabEnCours.niveau === lvl ? peEtabEnCours : await peEtabValidee(lvl);
  if(!v) return;
  if(!(await niceConfirm('Remplacer la progression affichée par celle de l\'établissement ? Vous pourrez ensuite l\'adapter, puis « Enregistrer » pour en faire votre progression.'))) return;
  progEditorItems = peEtabVersEditeur(v.items || [], lvl);
  progEditIdx = -1;
  renderProgressionList();
  document.getElementById('progStatus').textContent = 'Progression de l\'établissement chargée : adaptez-la si besoin, puis « Enregistrer ».';
}
async function peEtabProposer(){
  const lvl = document.getElementById('progNiveauSelect').value, uai = await peEtabUai(); if(!uai) return;
  const referent = typeof currentReferentEtab !== 'undefined' && currentReferentEtab && currentReferentEtab.uai === uai;
  const msg = await nicePrompt(referent
    ? 'Publier la progression affichée comme progression de l\'établissement (elle remplace l\'actuelle, qui est archivée). Un mot pour vos collègues (facultatif) :'
    : 'Proposer la progression affichée au référent de l\'établissement. Un mot pour lui (facultatif) :', '');
  if(msg === null || msg === undefined) return;
  const st = document.getElementById('progStatus');
  const { data, error } = await sb.from('progressions_etab').insert({ uai, niveau: lvl, statut: 'proposee', auteur_id: currentUser.id, items: peEtabDepuisEditeur(), message: String(msg).trim().slice(0, 500) || null }).select('id').single();
  if(error){ st.textContent = 'Erreur : ' + error.message; return; }
  if(referent){ const { error: e2 } = await sb.rpc('progression_etab_valider', { p_id: data.id, p_reponse: null }); if(e2){ st.textContent = 'Erreur : ' + e2.message; return; } }
  st.textContent = referent ? '✓ Progression publiée pour l\'établissement.' : '✓ Proposition envoyée au référent de l\'établissement.';
  peEtabPanneau(lvl);
}
async function peEtabRetirerProposition(id){
  const { error } = await sb.from('progressions_etab').delete().eq('id', id);
  if(error) niceAlert('Erreur : ' + error.message);
  peEtabPanneau(document.getElementById('progNiveauSelect').value);
}
function peEtabAllerReferent(){
  const b = document.querySelector('.nav-links button[data-nav="admin"]'); if(b) b.click();
  setTimeout(() => { const t = document.querySelector('#adminTabs [data-admin-tab="progressions"]'); if(t) t.click(); }, 200);
}

/* ---------- Onglet « Progressions » de « Mon établissement » (référent) / Administration ---------- */
(function peEtabInstall(){
  const tabs = document.getElementById('adminTabs'), view = document.getElementById('view-admin');
  if(!tabs || !view) return;
  const btn = document.createElement('button');
  btn.className = 'tab-btn'; btn.dataset.adminTab = 'progressions';
  btn.innerHTML = '<span class=gicon>calendar_month</span> Progressions <span id="peEtabBadge" class="pe-etab-badge" hidden></span>';
  tabs.appendChild(btn);
  const panel = document.createElement('div');
  panel.className = 'tab-panel'; panel.id = 'admin-panel-progressions';
  panel.innerHTML = `<p class="hint" style="margin:0 0 10px;max-width:80ch;">Les professeurs de l'établissement proposent leur progression depuis « Ma progression ». Une progression validée sert de <b>modèle par défaut</b> : un professeur qui n'a pas la sienne la voit, ainsi que ses élèves, et chacun peut partir d'elle pour l'adapter. Valider une nouvelle progression archive la précédente.</p><div id="peEtabAdmin" class="hint">Chargement…</div>`;
  view.appendChild(panel);
  btn.addEventListener('click', () => {
    document.querySelectorAll('#adminTabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('#view-admin .tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active'); panel.classList.add('active');
    peEtabAdminRendre();
  });
  const st = document.createElement('style');
  st.textContent = `
    .pe-etab-box{max-width:880px;border:1.5px solid rgba(12,91,160,.25);background:#F3F8FC;border-radius:12px;padding:10px 14px;margin:0 0 14px;display:flex;flex-direction:column;gap:6px;}
    .pe-etab-box:empty{display:none;}
    .pe-etab-tete{font-family:'Space Grotesk',sans-serif;color:#0C5BA0;}
    .pe-etab-ligne{font-size:.88rem;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .pe-etab-ligne .btn{padding:3px 10px;font-size:.8rem;}
    .pe-etab-ligne.ok .gicon{color:#1F7A4D;} .pe-etab-ligne.attente .gicon{color:#B26A00;} .pe-etab-ligne.refus .gicon{color:#a83c1f;}
    .pe-etab-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:2px;}
    .pe-etab-badge{display:inline-block;min-width:18px;padding:0 6px;border-radius:999px;background:#E35D3A;color:#fff;font-size:.72rem;font-weight:700;line-height:18px;text-align:center;}
    .pe-etab-niv{border:1.5px solid rgba(28,43,57,.12);border-radius:12px;padding:10px 14px;margin:0 0 12px;background:#fff;}
    .pe-etab-niv h4{margin:0 0 6px;font-family:'Space Grotesk',sans-serif;}
    .pe-etab-prop{display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 0;border-top:1px dashed rgba(28,43,57,.12);font-size:.88rem;}
    .pe-etab-prop .btn{padding:3px 10px;font-size:.8rem;}
    .pe-etab-prop q{color:var(--ink-soft);font-style:italic;}
    .pe-etab-modal{max-width:860px;width:min(860px,94vw);max-height:88vh;overflow:auto;position:relative;}
    .pe-etab-x{position:absolute;right:12px;top:10px;padding:2px 8px;}
    .pe-etab-table{width:100%;border-collapse:collapse;font-size:.86rem;}
    .pe-etab-table th,.pe-etab-table td{padding:5px 8px;border-bottom:1px solid rgba(28,43,57,.08);text-align:left;vertical-align:top;}
    .pe-etab-table tr.evt td{background:#FFF7E6;}
    .pe-etab-table small{color:var(--ink-soft);}
    .pe-diff{font-size:.78rem;color:#0C5BA0;} .pe-diff.egal{color:var(--ink-soft);} .pe-diff.plus{color:#1F7A4D;font-weight:700;} .pe-diff.moins{color:#a83c1f;font-weight:700;}
  `;
  document.head.appendChild(st);
  // Visible pour l'administrateur et pour un référent d'établissement (comme « Mon établissement »).
  const origApply = window.adminApplyScopeUI;
  if(typeof origApply === 'function'){
    window.adminApplyScopeUI = function(){ origApply.apply(this, arguments); peEtabBadgeMaj(); };
  }
})();
async function peEtabPerimetre(){
  const scope = typeof adminScopeUai === 'function' ? adminScopeUai() : '__aucun__';
  return scope; // null : administrateur (tous les établissements) ; sinon l'UAI du référent
}
async function peEtabBadgeMaj(){
  const b = document.getElementById('peEtabBadge'); if(!b || !currentUser) return;
  const scope = await peEtabPerimetre(); if(scope === '__aucun__'){ b.hidden = true; return; }
  let q = sb.from('progressions_etab').select('id', { count: 'exact', head: true }).eq('statut', 'proposee');
  if(scope) q = q.eq('uai', scope);
  const { count } = await q;
  b.hidden = !count; b.textContent = count || '';
}
async function peEtabAdminRendre(){
  const box = document.getElementById('peEtabAdmin'); if(!box) return;
  const scope = await peEtabPerimetre();
  if(scope === '__aucun__'){ box.textContent = 'Réservé au référent de l\'établissement.'; return; }
  let q = sb.from('progressions_etab').select(PE_ETAB_SEL).in('statut', ['proposee', 'validee', 'refusee', 'archivee']).order('updated_at', { ascending: false }).limit(200);
  if(scope) q = q.eq('uai', scope);
  const { data, error } = await q;
  if(error){ box.textContent = 'Erreur : ' + error.message; return; }
  window.__peEtab = new Map((data || []).map(r => [r.id, r]));
  if(!data || !data.length){ box.innerHTML = '<p class="hint">Aucune progression proposée pour l\'instant. Un professeur propose la sienne depuis « Ma progression » (bouton « Proposer cette progression à l\'établissement »).</p>'; peEtabBadgeMaj(); return; }
  const ordreNiv = ['ce2', 'cm1', 'cm2', '6e', '5e', '4e', '3e'];
  const groupes = new Map();
  data.forEach(r => { const k = r.uai + '|' + r.niveau; if(!groupes.has(k)) groupes.set(k, []); groupes.get(k).push(r); });
  const cles = [...groupes.keys()].sort((a, b) => { const [ua, na] = a.split('|'), [ub, nb] = b.split('|'); return ua.localeCompare(ub) || ordreNiv.indexOf(na) - ordreNiv.indexOf(nb); });
  box.innerHTML = cles.map(k => {
    const l = groupes.get(k), [uai, niv] = k.split('|'), val = l.find(r => r.statut === 'validee');
    const props = l.filter(r => r.statut === 'proposee'), hist = l.filter(r => r.statut === 'refusee' || r.statut === 'archivee').slice(0, 4);
    return `<div class="pe-etab-niv"><h4>${escapeHtml(niv)}${scope ? '' : ` <small class="hint-mono">${escapeHtml(uai)}</small>`}</h4>
      ${val ? `<div class="pe-etab-prop"><span class="gicon" style="color:#1F7A4D;">verified</span> <b>En vigueur</b> : validée le ${peEtabDate(val.valide_at)}, proposée par ${peEtabNom(val.auteur)}.
          <button class="btn secondary" onclick="peEtabVoir('${val.id}')"><span class="gicon">visibility</span> Voir</button>
          <button class="btn secondary" onclick="peEtabArchiver('${val.id}')"><span class="gicon">archive</span> Retirer</button></div>` : '<div class="pe-etab-prop"><span class="gicon">info</span> Aucune progression en vigueur : les professeurs sans progression personnelle voient celle du site.</div>'}
      ${props.map(r => `<div class="pe-etab-prop"><span class="gicon" style="color:#B26A00;">hourglass_top</span> Proposée par <b>${peEtabNom(r.auteur)}</b> le ${peEtabDate(r.created_at)}${r.message ? ` : <q>${escapeHtml(r.message)}</q>` : ''}
          <button class="btn secondary" onclick="peEtabComparer('${r.id}')"><span class="gicon">compare_arrows</span> ${val ? 'Comparer' : 'Voir'}</button>
          <button class="btn" onclick="peEtabValider('${r.id}')"><span class="gicon">check</span> Valider</button>
          <button class="btn secondary" onclick="peEtabRefuser('${r.id}')"><span class="gicon">close</span> Refuser</button></div>`).join('')}
      ${hist.map(r => `<div class="pe-etab-prop hint" style="margin:0;"><span class="gicon">${r.statut === 'archivee' ? 'inventory_2' : 'block'}</span> ${r.statut === 'archivee' ? 'Ancienne progression' : 'Refusée'} · ${peEtabNom(r.auteur)} · ${peEtabDate(r.updated_at)}
          <button class="btn secondary" onclick="peEtabVoir('${r.id}')">Voir</button>${r.statut === 'archivee' ? `<button class="btn secondary" onclick="peEtabValider('${r.id}', true)">Remettre en vigueur</button>` : ''}</div>`).join('')}
    </div>`;
  }).join('');
  peEtabBadgeMaj();
}
function peEtabComparer(id){
  const r = window.__peEtab && window.__peEtab.get(id); if(!r) return;
  const val = [...window.__peEtab.values()].find(x => x.uai === r.uai && x.niveau === r.niveau && x.statut === 'validee');
  peEtabFenetre(`Proposition de ${peEtabNom(r.auteur)} · ${escapeHtml(r.niveau)}`, `${r.message ? `<p style="margin:0 0 8px;"><q>${escapeHtml(r.message)}</q></p>` : ''}<p class="hint" style="margin:0 0 8px;">${val ? 'Comparée à la progression en vigueur (validée le ' + peEtabDate(val.valide_at) + ').' : 'Aucune progression en vigueur pour ce niveau.'}</p>${peEtabTableHtml(r.items || [], r.niveau, val ? val.items : null)}
    <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px;"><button class="btn secondary" onclick="document.getElementById('peEtabOv').style.display='none';peEtabRefuser('${r.id}')">Refuser</button><button class="btn" onclick="document.getElementById('peEtabOv').style.display='none';peEtabValider('${r.id}')"><span class="gicon">check</span> Valider</button></div>`);
}
async function peEtabValider(id, remise){
  const rep = remise ? (await niceConfirm('Remettre cette ancienne progression en vigueur ? L\'actuelle sera archivée.') ? '' : null)
    : await nicePrompt('Valider cette progression : elle devient la progression de l\'établissement (l\'actuelle est archivée). Un mot pour l\'auteur (facultatif) :', '');
  if(rep === null || rep === undefined || rep === false) return;
  const { error } = await sb.rpc('progression_etab_valider', { p_id: id, p_reponse: String(rep).trim().slice(0, 500) || null });
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  peEtabAdminRendre();
}
async function peEtabRefuser(id){
  const rep = await nicePrompt('Refuser cette proposition. Expliquez pourquoi à son auteur (il verra ce message dans « Ma progression ») :', '');
  if(rep === null || rep === undefined) return;
  const { error } = await sb.from('progressions_etab').update({ statut: 'refusee', reponse: String(rep).trim().slice(0, 500) || null, updated_at: new Date().toISOString() }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  peEtabAdminRendre();
}
async function peEtabArchiver(id){
  if(!(await niceConfirm('Retirer la progression en vigueur ? Les professeurs sans progression personnelle verront de nouveau celle du site. Elle reste dans l\'historique et pourra être remise en vigueur.'))) return;
  const { error } = await sb.from('progressions_etab').update({ statut: 'archivee', updated_at: new Date().toISOString() }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  peEtabAdminRendre();
}

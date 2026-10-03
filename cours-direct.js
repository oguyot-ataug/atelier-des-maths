/* =====================================================================
   cours-direct.js -- Session COURS en direct

   Demandé : « Préparer des sessions COURS avec code pour entrer. Pour l'élève, s'affichent en plein
   écran les éléments du cahier que le prof a glissés, et une alerte pour le prof en cas de sortie ou
   changement d'onglets » ; « On pourrait aussi projeter en direct sur les ordinateurs des élèves la
   construction géométrique pas à pas. » Choix : le professeur fait avancer élément par élément ;
   l'élève peut revoir les éléments déjà montrés ; à une sortie, alerte chez le professeur et, au retour
   de l'élève, « Reste avec la classe ! » avant de retrouver le plein écran.

   - Professeur (Cahier de corrections, classe choisie) : « Session COURS en direct » → choix des
     entrées du cahier (sur une période), titre → la session est créée (table cours_direct, code à
     4 chiffres). Télécommande : code en grand, éléments (Précédent / Suivant, ou clic), aperçu,
     liste de la classe (absent, présent, sorti : nombre de sorties et heure).
   - Construction aux instruments (entrée du cahier avec son programme, data-tbprog) : « Dérouler au
     tableau » ; chaque étape jouée par le professeur est rejouée en même temps chez les élèves
     (tableau en plein écran, mode projection fig-proj).
   - Élève : code tapé en haut de « Mon travail » (même champ que les questions flash) ; plein écran,
     outils du cours sur les définitions (écoute, apprentissage, loupe).
   - Sorties : changement d'onglet, fenêtre quittée, sortie du plein écran → cours_direct_signal +
     message diffusé (alerte immédiate chez le professeur) ; présence rafraîchie toutes les 20 s.

   Temps réel : canal Supabase « cd-<id> » (événements etat, sortie). Les élèves ne lisent la session
   que par les fonctions cours_direct_rejoindre / cours_direct_etat / cours_direct_signal (l'élément en
   cours et les précédents, jamais les suivants).
   Dépend d'app.js (sb, currentUser, currentClassId, syncFetchAll, cahierOutilsCours, renderMathText,
   niceAlert, nicePrompt, escapeHtml, showView, todayISO), de questionnaires.js (qzElevesDevoir) et du
   tableau (tableau-ia.js : tbAiLoadProgram, tbAiPlaybackNext ; outils-figures.js : figProjTaille).
   ===================================================================== */

let cdP = null;  // professeur : { id, code, titre, items, etat, ch, eleves, membres, alertes }
let cdE = null;  // élève : { id, ch, d, vue, dehors, timer }
const cdEsc = s => escapeHtml(String(s ?? ''));
const cdCanal = id => 'cd-' + id;

/* ---------- Éléments : une entrée du cahier → { titre, html, prog } ---------- */
function cdTitreEntree(e){
  const ref = e.exo === 'Cours' ? 'Cours' : e.exo === 'Construction' ? 'Construction' : e.exo === 'TD' ? 'TD' : e.exo === '' ? '' : e.exo ? 'Exercice ' + e.exo : '';
  return [ref, e.titre].filter(Boolean).join(' : ') || 'Élément';
}
function cdProgDe(html){
  const m = String(html || '').match(/data-tbprog="([^"]*)"/);
  if(!m) return null;
  try{ const t = document.createElement('textarea'); t.innerHTML = m[1]; const p = JSON.parse(t.value); return p && Array.isArray(p.program) ? { program: p.program, tools: p.tools || [] } : null; }catch(e){ return null; }
}
function cdItemDe(e){
  const html = (e.html != null ? e.html : renderMathText(e.raw || '')) + (e.figure ? `<div class="nb-figure-row">${e.figure}</div>` : '');
  const it = { titre: cdTitreEntree(e), chapitre: e.chapitre || '', html, prog: cdProgDe(html) };
  // Partie de cours ajoutée par « + Cahier » : retrouvée dans son chapitre pour être montrée vivante.
  const m = e.exo === 'Cours' && /^\s*([^·]+?)\s*·\s*(.+)$/.exec(e.chapitre || '');
  if(m && e.titre) it.src = { lvl: e.niveau || '', code: m[1], t: m[2].trim(), titre: e.titre };
  return it;
}

/* =====================================================================
   PROFESSEUR
   ===================================================================== */
function cdBoutonMaj(){
  const b = document.getElementById('cdLancerBtn');
  if(b) b.style.display = (typeof currentUserRole !== 'undefined' && (currentUserRole === 'prof' || currentUserRole === 'admin')) ? '' : 'none';
  const bb = document.getElementById('cdBilanBtn'); if(bb && b) bb.style.display = b.style.display;
}
async function cdPreparer(){
  if(!currentClassId){ await niceAlert('Choisissez d\'abord la classe (en haut de la page) : la session reprend son cahier.'); return; }
  if(cdP && cdP.classId === currentClassId){ const v = document.getElementById('cdProf'); if(v){ v.style.display = 'flex'; cdProfRendre(); } return; }
  // Session encore ouverte pour cette classe (télécommande réduite, page rechargée…) : on la reprend.
  const { data: ouv } = await sb.from('cours_direct').select('*').eq('teacher_id', currentUser.id).eq('class_id', currentClassId).is('ended_at', null).order('created_at', { ascending: false }).limit(1);
  if(ouv && ouv.length && Date.now() - Date.parse(ouv[0].updated_at) < 6 * 3600e3){
    const choix = await niceModal({ message: `Une session est encore ouverte pour cette classe : « ${ouv[0].titre} » (code ${ouv[0].code}).`, buttons: [{ label: 'Nouvelle session', value: 'neuf', secondary: true }, { label: 'Reprendre la session', value: 'reprendre' }] });
    if(choix === 'reprendre') return cdProfOuvrir(ouv[0]);
    if(choix !== 'neuf') return;
  }
  const fin = todayISO(), d0 = new Date(); d0.setDate(d0.getDate() - 14);
  const st = { du: d0.toISOString().slice(0, 10), au: fin, entrees: [], choisies: new Set(), exos: typeof plAttente === 'function' ? plAttente() : [], titre: 'Cours du ' + new Date().toLocaleDateString('fr-FR') };
  let o = document.getElementById('cdPrepOverlay');
  if(!o){ o = document.createElement('div'); o.id = 'cdPrepOverlay'; o.className = 'modal-overlay'; o.style.zIndex = '400'; document.body.appendChild(o); }
  const charger = async () => {
    st.entrees = []; rendre('<p class="hint">Chargement du cahier…</p>');
    const r = await syncFetchAll(st.du, st.au);
    st.entrees = (r || []).filter(e => e.html || e.raw || e.figure);
    st.choisies = new Set(st.entrees.filter(e => e.date === fin).map(e => e.id)); // par défaut : la séance du jour
    rendre();
  };
  const rendre = (msg) => {
    const parJour = new Map(); st.entrees.forEach(e => { if(!parJour.has(e.date)) parJour.set(e.date, []); parJour.get(e.date).push(e); });
    o.innerHTML = `<div class="modal-card cd-prep">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;"><b class="cd-h"><span class="gicon">cast_for_education</span> Session COURS en direct</b>
        <button class="modal-close" onclick="document.getElementById('cdPrepOverlay').style.display='none'"><span class="gicon">close</span></button></div>
      <p class="hint" style="margin:6px 0 10px;">Choisissez les éléments du cahier à montrer, dans l'ordre du cahier. Les élèves entrent avec le code (en haut de « Mon travail ») et les voient en plein écran ; vous les faites avancer un par un.</p>
      <label class="cd-lab">Titre <input type="text" id="cdPrepTitre" value="${cdEsc(st.titre)}"></label>
      <div class="cd-dates"><label>Du <input type="date" id="cdPrepDu" value="${st.du}"></label><label>au <input type="date" id="cdPrepAu" value="${st.au}"></label>
        <button type="button" class="btn secondary" id="cdPrepCharger"><span class="gicon">refresh</span> Afficher</button></div>
      <div class="cd-liste">${msg || ([...parJour.entries()].map(([j, es]) => `<div class="cd-jour"><b>${new Date(j + 'T12:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</b>
        ${es.map(e => `<label class="cd-entree"><input type="checkbox" data-id="${e.id}" ${st.choisies.has(e.id) ? 'checked' : ''}> ${cdEsc(cdTitreEntree(e))}${cdProgDe(e.html) ? ' <span class="cd-tag"><span class="gicon">architecture</span> construction</span>' : ''}${e.chapitre ? ` <small>${cdEsc(e.chapitre)}</small>` : ''}</label>`).join('')}</div>`).join('') || '<p class="hint">Aucune entrée du cahier sur cette période.</p>')}
        ${st.exos.length ? `<div class="cd-exos"><b>Ajouts (après les éléments du cahier, sauf ceux « en ouverture »)</b>${st.exos.map((x, k) => `<div class="cd-exo"><span class="gicon"${x.exo ? '' : ' style="color:#1F7A4D;"'}>${x.exo ? 'edit_square' : 'menu_book'}</span> ${cdEsc(x.titre)}${x.chapitre ? ` <small>${cdEsc(x.chapitre)}</small>` : ''}${x.ouverture ? ' <span class="cd-tag"><span class="gicon">wb_sunny</span> en ouverture</span>' : ''}
          <span class="cd-exo-act"><button type="button" data-monte="${k}" title="Monter" ${k ? '' : 'disabled'}><span class="gicon">arrow_upward</span></button><button type="button" data-descend="${k}" title="Descendre" ${k < st.exos.length - 1 ? '' : 'disabled'}><span class="gicon">arrow_downward</span></button><button type="button" data-exo="${k}" title="Retirer"><span class="gicon">close</span></button></span></div>`).join('')}</div>` : ''}</div>
      <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;"><button type="button" class="btn secondary" id="cdPrepCours"><span class="gicon">menu_book</span> Ajouter une partie de cours</button>
        <button type="button" class="btn secondary" id="cdPrepExo"><span class="gicon">edit_square</span> Ajouter un exercice à faire</button></div>
      <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px;"><span class="hint" style="margin:auto auto auto 0;" id="cdPrepNb"></span>
        <button class="btn secondary" onclick="document.getElementById('cdPrepOverlay').style.display='none'">Annuler</button>
        <button class="btn" id="cdPrepGo"><span class="gicon">play_arrow</span> Ouvrir la session</button></div></div>`;
    const nb = () => { const n = st.choisies.size + st.exos.length, el = document.getElementById('cdPrepNb'); if(el) el.textContent = n ? n + ' élément' + (n > 1 ? 's' : '') + ' choisi' + (n > 1 ? 's' : '') : 'Aucun élément choisi'; };
    nb();
    o.querySelectorAll('input[data-id]').forEach(c => c.onchange = () => { if(c.checked) st.choisies.add(c.dataset.id); else st.choisies.delete(c.dataset.id); nb(); });
    o.querySelectorAll('[data-exo]').forEach(b => b.onclick = () => { st.exos.splice(+b.dataset.exo, 1); rendre(); });
    const echange = (i, j) => { const x = st.exos[i]; st.exos[i] = st.exos[j]; st.exos[j] = x; rendre(); };
    o.querySelectorAll('[data-monte]').forEach(b => b.onclick = () => echange(+b.dataset.monte, +b.dataset.monte - 1));
    o.querySelectorAll('[data-descend]').forEach(b => b.onclick = () => echange(+b.dataset.descend, +b.dataset.descend + 1));
    document.getElementById('cdPrepCours').onclick = async () => { o.style.display = 'none'; const its = typeof cxChoisirCours === 'function' ? await cxChoisirCours() : []; o.style.display = 'flex'; if(its.length){ st.exos.push(...its); rendre(); } };
    document.getElementById('cdPrepExo').onclick = async () => { o.style.display = 'none'; const it = typeof cxChoisir === 'function' ? await cxChoisir() : null; o.style.display = 'flex'; if(it){ st.exos.push(it); rendre(); } };
    document.getElementById('cdPrepTitre').oninput = e => { st.titre = e.target.value; };
    document.getElementById('cdPrepCharger').onclick = () => { st.du = document.getElementById('cdPrepDu').value; st.au = document.getElementById('cdPrepAu').value; charger(); };
    document.getElementById('cdPrepGo').onclick = async () => {
      // Exercices mis de côté depuis Mon TD (« Session ») : en ouverture, avant le cahier.
      const items = st.exos.filter(x => x.ouverture).concat(st.entrees.filter(e => st.choisies.has(e.id)).map(cdItemDe), st.exos.filter(x => !x.ouverture));
      if(typeof plAttenteSauver === 'function') plAttenteSauver([]);
      if(!items.length){ await niceAlert('Choisissez au moins un élément du cahier ou un exercice.'); return; }
      o.style.display = 'none';
      cdCreer(st.titre.trim() || 'Cours', items);
    };
  };
  o.style.display = 'flex';
  charger();
}
async function cdCreer(titre, items){
  // Une seule session ouverte par classe : la précédente (oubliée ?) est close.
  await sb.from('cours_direct').update({ ended_at: new Date().toISOString() }).eq('teacher_id', currentUser.id).eq('class_id', currentClassId).is('ended_at', null);
  const { data, error } = await sb.from('cours_direct').insert({ teacher_id: currentUser.id, class_id: currentClassId, titre, items, etat: { idx: 0, etape: null } }).select().single();
  if(error || !data){ await niceAlert('La session n\'a pas pu être créée : ' + ((error && error.message) || '?')); return; }
  cdProfOuvrir(data);
}
async function cdProfOuvrir(row){
  cdProfFermer(true);
  cdP = { id: row.id, code: row.code, titre: row.titre, items: row.items || [], etat: row.etat || { idx: 0 }, eleves: [], membres: new Map(), alertes: [], classId: row.class_id };
  cdP.eleves = await qzElevesDevoir({ class_id: row.class_id });
  let v = document.getElementById('cdProf');
  if(!v){ v = document.createElement('div'); v.id = 'cdProf'; document.body.appendChild(v); }
  v.style.display = 'flex';
  document.body.classList.add('cd-prof-ouvert');
  cdP.ch = sb.channel(cdCanal(row.id), { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'sortie' }, ({ payload }) => cdProfSortie(payload))
    .on('broadcast', { event: 'ici' }, () => cdProfMembres())
    .on('broadcast', { event: 'trav' }, ({ payload }) => { if(typeof cxProfRecu === 'function') cxProfRecu(payload); })
    .on('broadcast', { event: 'aide' }, ({ payload }) => { if(typeof cxProfAide === 'function') cxProfAide(payload); })
    .subscribe();
  cdP.timer = setInterval(cdProfMembres, 5000);
  cdProfRendre(); cdProfMembres();
}
function cdProfFermer(silencieux){
  if(!cdP) return;
  if(typeof cxRelacher === 'function'){ cxRelacher(); cxQuitterProg(); cxVivantRestaurer(); }
  clearInterval(cdP.timer);
  try{ sb.removeChannel(cdP.ch); }catch(e){}
  cdQuitterTableau();
  const v = document.getElementById('cdProf'); if(v) v.style.display = 'none';
  document.body.classList.remove('cd-prof-ouvert');
  cdP = null;
}
async function cdProfTerminer(){
  if(!cdP) return;
  if(!(await niceConfirm('Terminer la session ? Les élèves sortent du plein écran.'))) return;
  await sb.from('cours_direct').update({ ended_at: new Date().toISOString() }).eq('id', cdP.id);
  try{ cdP.ch.send({ type: 'broadcast', event: 'etat', payload: { fin: true } }); }catch(e){}
  const id = cdP.id;
  setTimeout(async () => { cdProfFermer(); if(typeof cdBilan === 'function' && await niceConfirm('Session terminée. Voir le bilan de la séance (réponses, mains levées, sorties) ?')) cdBilan(id); }, 400);
}
async function cdProfEtat(etat){
  if(!cdP) return;
  cdP.etat = Object.assign({}, cdP.etat, etat);
  cdProfRendre();
  const { error } = await sb.from('cours_direct').update({ etat: cdP.etat }).eq('id', cdP.id);
  if(error){ niceAlert('Changement non enregistré : ' + error.message); return; }
  const diffuse = Object.assign({}, cdP.etat); delete diffuse.equipes; delete diffuse.liens; // les équipes : seulement par cours_direct_etat (chaque élève, la sienne)
  try{ cdP.ch.send({ type: 'broadcast', event: 'etat', payload: diffuse }); }catch(e){}
}
function cdProfAller(i){
  if(!cdP) return;
  i = Math.max(0, Math.min(cdP.items.length - 1, i));
  if(typeof cxRelacher === 'function'){ cxRelacher(); cxQuitterProg(); }
  cdP.selEx = null;
  cdQuitterTableau();
  cdProfEtat({ idx: i, etape: null, corr: false });
}
async function cdProfMembres(){
  if(!cdP) return;
  const { data } = await sb.from('cours_direct_membres').select('student_id,vu_at,dehors,sorties,sortie_at').eq('direct_id', cdP.id);
  cdP.membres = new Map((data || []).map(m => [m.student_id, m]));
  cdProfRendreClasse();
  if(typeof cxProfTick === 'function') cxProfTick();
}
function cdProfSortie(p){
  if(!cdP || !p || !p.e) return;
  const m = cdP.membres.get(p.e) || { student_id: p.e, sorties: 0 };
  if(p.dehors && !m.dehors){ m.sorties = (m.sorties || 0) + 1; m.sortie_at = new Date().toISOString(); }
  m.dehors = !!p.dehors; m.vu_at = new Date().toISOString();
  cdP.membres.set(p.e, m);
  if(p.dehors){
    const el = cdP.eleves.find(x => x.id === p.e), nom = el ? (el.prenom || el.label) : 'Un élève';
    cdToast(`<span class="gicon">warning</span> <b>${cdEsc(nom)}</b> a quitté la page (${p.motif || 'autre onglet'}).`);
  }
  cdProfRendreClasse();
}
function cdToast(html){
  const t = document.createElement('div'); t.className = 'cd-toast'; t.innerHTML = html;
  document.body.appendChild(t); setTimeout(() => t.classList.add('on'), 10);
  setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 400); }, 6000);
}
function cdProfRendreClasse(){
  const box = document.getElementById('cdProfClasse'); if(!box || !cdP) return;
  const now = Date.now(), hh = d => new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  let presents = 0, dehors = 0;
  box.innerHTML = cdP.eleves.map(e => {
    const m = cdP.membres.get(e.id);
    const etat = !m ? 'absent' : m.dehors ? 'dehors' : (now - Date.parse(m.vu_at) > 60000 ? 'perdu' : 'present');
    if(etat === 'present') presents++; if(etat === 'dehors') dehors++;
    const info = !m ? 'pas encore entré' : etat === 'dehors' ? 'SORTI de la page' : etat === 'perdu' ? 'plus de nouvelles' : 'présent';
    const eq = typeof cdEqDe === 'function' ? cdEqDe(e.id) : null;
    return `<div class="cd-el ${etat}"><span class="cd-pastille"></span><span class="cd-nom">${cdEsc(e.label)}</span><small>${info}${m && m.sorties ? ` · ${m.sorties} sortie${m.sorties > 1 ? 's' : ''} (dernière à ${hh(m.sortie_at)})` : ''}</small>${eq ? cdEqInfo(e.id) : ''}
      ${typeof cdEqRejoindreChoix === 'function' ? (eq ? `<button class="cd-eq-btn x" onclick="cdEqDetacher('${e.id}')" title="Ne plus travailler en équipe"><span class="gicon">group_remove</span></button>` : `<button class="cd-eq-btn" onclick="cdEqRejoindreChoix('${e.id}', this)" title="Pas d'ordinateur ? Travailler sur l'ordinateur d'un camarade"><span class="gicon">group_add</span></button>`) : ''}</div>`;
  }).join('') || '<p class="hint">Aucun élève dans cette classe.</p>';
  const r = document.getElementById('cdProfResume');
  if(r) r.innerHTML = `<b>${presents}</b> / ${cdP.eleves.length} présent${presents > 1 ? 's' : ''}${dehors ? ` · <b class="cd-rouge">${dehors} sorti${dehors > 1 ? 's' : ''}</b>` : ''}`;
}
function cdProfRendre(){
  const v = document.getElementById('cdProf'); if(!v || !cdP) return;
  const i = cdP.etat.idx || 0, it = cdP.items[i] || {};
  if(typeof cxVivantRestaurer === 'function') cxVivantRestaurer();
  v.innerHTML = `<div class="cd-p-tete">
      <div><div class="cd-p-titre">${cdEsc(cdP.titre)}</div><div class="hint" style="margin:0;">Session COURS en direct · élément ${i + 1} / ${cdP.items.length}</div></div>
      <div class="cd-code" title="À afficher au tableau : les élèves le tapent en haut de « Mon travail »">Code <b>${cdEsc(cdP.code)}</b></div>
      <div class="cd-p-act"><button class="btn secondary" onclick="cdBilan()" title="Qui a bien répondu à chaque exercice, mains levées, sorties de la page"><span class="gicon">summarize</span> Bilan</button>
        <button class="btn secondary" onclick="cdProfFermer()" title="Fermer la télécommande sans terminer (la session continue)"><span class="gicon">minimize</span> Réduire</button>
        <button class="btn" style="background:#C0392B;" onclick="cdProfTerminer()"><span class="gicon">stop</span> Terminer</button></div></div>
    <div class="cd-p-corps">
      <div class="cd-p-items">${cdP.items.map((x, k) => `<button class="cd-item${k === i ? ' on' : ''}${k < i ? ' vu' : ''}" onclick="cdProfAller(${k})"><span>${k + 1}</span> ${cdEsc(x.titre)}${x.prog ? ' <span class="gicon">architecture</span>' : ''}${x.exo ? ' <span class="gicon" style="color:#E35D3A;">edit_square</span>' : ''}</button>`).join('')}
        <button class="cd-item cd-ajout" onclick="cxProfAjouterCours()"><span class="gicon">menu_book</span> Ajouter une partie de cours</button>
        <button class="cd-item cd-ajout" onclick="cxProfAjouter()"><span class="gicon">edit_square</span> Ajouter un exercice</button></div>
      <div class="cd-p-scene">
        <div class="cd-nav"><button class="btn secondary" onclick="cdProfAller(${i - 1})" ${i ? '' : 'disabled'}><span class="gicon">arrow_back</span> Précédent</button>
          ${it.prog ? `<button class="btn" style="background:#1F7A4D;" onclick="cdProfTableau()"><span class="gicon">architecture</span> Dérouler la construction au tableau</button>` : ''}
          ${it.corr ? `<button class="btn" style="background:${cdP.etat.corr ? '#5B6472' : '#1F7A4D'};" onclick="cdProfEtat({ corr: ${!cdP.etat.corr} })"><span class="gicon">${cdP.etat.corr ? 'visibility_off' : 'fact_check'}</span> ${cdP.etat.corr ? 'Cacher la correction' : 'Montrer la correction aux élèves'}</button>` : ''}
          <button class="btn" onclick="cdProfAller(${i + 1})" ${i < cdP.items.length - 1 ? '' : 'disabled'}>Suivant <span class="gicon">arrow_forward</span></button></div>
        <div class="cd-item-titre">${cdEsc(it.titre || '')}${it.chapitre ? ` <small>${cdEsc(it.chapitre)}</small>` : ''}</div>
        <div class="cd-contenu" id="cdProfContenu">${it.exo ? '' : it.corr && cdP.etat.corr ? it.corr : it.html || ''}</div></div>
      <div class="cd-p-classe"><div class="cd-p-resume" id="cdProfResume"></div>${typeof cdEqOuvrir === 'function' ? `<button class="btn secondary td-mini cd-eq-ouvrir" onclick="cdEqOuvrir()" title="Équipes de 2, 3, 4… tirées au sort ou faites à la main"><span class="gicon">groups</span> Équipes${(cdP.etat.equipes || []).length ? ` (${cdP.etat.equipes.length})` : ''}</button>` : ''}<div id="cdProfClasse"></div></div>
    </div>`;
  const c = document.getElementById('cdProfContenu');
  if(c && it.exo){ if(typeof cxProfMonter === 'function') cxProfMonter(i, it); }
  else if(c){ c.querySelectorAll('[data-tbprog]').forEach(x => x.remove()); if(typeof cahierOutilsCours === 'function') cahierOutilsCours(c); if(it.src && typeof cxMonterVivant === 'function') cxMonterVivant(c, it.src); }
  cdProfRendreClasse();
}

/* ---------- Construction aux instruments, synchronisée ---------- */
let cdTableau = null; // { role:'prof'|'eleve', prog }
function cdEntrerTableau(prog, role){
  if(typeof tbAiLoadProgram !== 'function') return false;
  const vue = document.querySelector('.view.active');
  cdTableau = { role, prog, vueAvant: vue && vue.id !== 'view-tableau' ? vue.id : null };
  document.body.classList.add('fig-proj', 'cd-tableau');
  if(typeof showView === 'function') showView('view-tableau');
  if(typeof initTableauView === 'function') initTableauView();
  if(typeof figProjTaille === 'function') figProjTaille();
  try{ tbClearAll(); tbAiLoadProgram(prog.program, prog.tools, { maxSteps: 400 }); }catch(e){ cdQuitterTableau(); niceAlert('Construction impossible à rejouer : ' + e.message); return false; }
  cdBandeauTableau();
  return true;
}
function cdQuitterTableau(){
  if(!cdTableau) return;
  const vueAvant = cdTableau.vueAvant;
  cdTableau = null;
  document.body.classList.remove('fig-proj', 'cd-tableau');
  if(vueAvant && typeof showView === 'function') showView(vueAvant);
  const b = document.getElementById('cdBandeau'); if(b) b.remove();
  try{ if(typeof tbAiPlaybackHide === 'function') tbAiPlaybackHide(); if(typeof tbClearAll === 'function') tbClearAll(); }catch(e){}
}
// Joue (ou rejoue en silence) jusqu'à l'étape k.
async function cdJouerJusqua(k){
  if(!cdTableau || !tbAiPlan) return;
  k = Math.max(0, Math.min(tbAiPlan.actions.length, k));
  if(k < tbAiPlanIndex){
    tbClearAll(); tbAiLoadProgram(cdTableau.prog.program, cdTableau.prog.tools, { maxSteps: 400, keepZoom: true });
    tbAiSilent = true; try{ while(tbAiPlanIndex < k) await tbAiPlaybackNext(); }finally{ tbAiSilent = false; tbRender(); }
  } else if(k - tbAiPlanIndex > 1){
    tbAiSilent = true; try{ while(tbAiPlanIndex < k - 1) await tbAiPlaybackNext(); }finally{ tbAiSilent = false; tbRender(); }
  }
  while(tbAiPlan && tbAiPlanIndex < k) await tbAiPlaybackNext();
  cdBandeauTableau();
}
function cdBandeauTableau(){
  if(!cdTableau) return;
  let b = document.getElementById('cdBandeau');
  if(!b){ b = document.createElement('div'); b.id = 'cdBandeau'; document.body.appendChild(b); }
  const n = tbAiPlan ? tbAiPlan.actions.length : 0, k = tbAiPlan ? tbAiPlanIndex : 0;
  b.innerHTML = cdTableau.role === 'prof'
    ? `<span class="cd-b-t">Étape ${k} / ${n}</span><button onclick="cdProfEtape(${k - 1})" ${k ? '' : 'disabled'}><span class="gicon">skip_previous</span> Précédente</button>
       <button class="go" onclick="cdProfEtape(${k + 1})" ${k < n ? '' : 'disabled'}>Étape suivante <span class="gicon">skip_next</span></button>
       <button onclick="cdProfEtape(${n})" ${k < n ? '' : 'disabled'}>Tout</button><button onclick="cdProfSortirTableau()"><span class="gicon">close</span> Revenir à la télécommande</button>`
    : `<span class="cd-b-t">${cdEsc(cdE && cdE.d ? cdE.d.titre : '')} · construction : étape ${k} / ${n}</span><span class="cd-b-h">Ton professeur fait avancer la construction.</span>`;
}
function cdProfTableau(){
  if(!cdP) return;
  const it = cdP.items[cdP.etat.idx || 0]; if(!it || !it.prog) return;
  if(!cdEntrerTableau(it.prog, 'prof')) return;
  const v = document.getElementById('cdProf'); if(v) v.style.display = 'none';
  cdProfEtat({ etape: 0 });
}
async function cdProfEtape(k){
  if(!cdTableau || !tbAiPlan) return;
  k = Math.max(0, Math.min(tbAiPlan.actions.length, k));
  cdProfEtat({ etape: k }); // les élèves suivent pendant que l'animation se joue ici
  await cdJouerJusqua(k);
}
function cdProfSortirTableau(){
  cdQuitterTableau();
  const v = document.getElementById('cdProf'); if(v) v.style.display = 'flex';
  cdProfEtat({ etape: null });
}

/* =====================================================================
   ÉLÈVE
   ===================================================================== */
// Code tapé (même champ que les questions flash) : vrai si c'était une session COURS.
async function cdCode(code){
  const { data, error } = await sb.rpc('cours_direct_rejoindre', { p_code: code });
  if(error){ await niceAlert(error.message); return true; }
  if(!data) return false;
  cdEleveOuvrir(data);
  return true;
}
async function cdEleveOuvrir(id){
  cdEleveFermer(true);
  cdE = { id, d: null, vue: 0, dehors: false };
  let o = document.getElementById('cdEleve');
  if(!o){ o = document.createElement('div'); o.id = 'cdEleve'; document.body.appendChild(o); }
  o.style.display = 'flex';
  document.body.classList.add('cd-eleve-ouvert');
  cdPleinEcran();
  cdInvitation([]);
  cdE.ch = sb.channel(cdCanal(id), { config: { broadcast: { self: false } } })
    .on('broadcast', { event: 'etat' }, ({ payload }) => { if(payload && payload.fin) return cdEleveFin(); cdEleveCharger(); })
    .on('broadcast', { event: 'pilote' }, ({ payload }) => { if(typeof cxElevePilote === 'function') cxElevePilote(payload); })
    .on('broadcast', { event: 'main' }, ({ payload }) => { if(typeof cxEleveMain === 'function') cxEleveMain(payload); })
    .on('broadcast', { event: 'mot' }, ({ payload }) => { if(typeof cxEleveMot === 'function') cxEleveMot(payload); })
    .subscribe(s => { if(s === 'SUBSCRIBED'){ try{ cdE.ch.send({ type: 'broadcast', event: 'ici', payload: { e: currentUser.id } }); }catch(e){} } });
  cdE.timer = setInterval(() => { if(cdE) sb.rpc('cours_direct_signal', { p_id: cdE.id, p_dehors: cdE.dehors }); }, 20000);
  document.addEventListener('visibilitychange', cdSurVisibilite);
  window.addEventListener('blur', cdSurBlur);
  window.addEventListener('focus', cdSurRetour);
  document.addEventListener('fullscreenchange', cdSurPleinEcran);
  await cdEleveCharger();
}
function cdEleveFermer(silencieux){
  if(!cdE) return;
  if(typeof cxVivantRestaurer === 'function') cxVivantRestaurer();
  if(typeof cxQuitterProg === 'function'){ cxQuitterProg(); if(cdE.saveT && typeof cxModifie === 'function') clearTimeout(cdE.saveT); }
  if(qzP && qzP.cours){ const t = document.getElementById('toolsModalOverlay'); if(t && t.style.display !== 'none' && typeof closeFigureTool === 'function') closeFigureTool(); qzP = null; }
  clearInterval(cdE.timer); clearTimeout(cdE.blurT);
  try{ sb.removeChannel(cdE.ch); }catch(e){}
  document.removeEventListener('visibilitychange', cdSurVisibilite);
  window.removeEventListener('blur', cdSurBlur);
  window.removeEventListener('focus', cdSurRetour);
  document.removeEventListener('fullscreenchange', cdSurPleinEcran);
  cdQuitterTableau();
  const o = document.getElementById('cdEleve'); if(o) o.style.display = 'none';
  document.body.classList.remove('cd-eleve-ouvert');
  if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
  cdE = null;
  setTimeout(cdVeille, 300);
}
function cdPleinEcran(){
  const el = document.documentElement, f = el.requestFullscreen || el.webkitRequestFullscreen;
  if(f && !document.fullscreenElement){ try{ const p = f.call(el); if(p && p.catch) p.catch(() => {}); }catch(e){} }
}
async function cdEleveCharger(){
  if(!cdE) return;
  const { data, error } = await sb.rpc('cours_direct_etat', { p_id: cdE.id });
  if(error || !data){ if(cdE) document.getElementById('cdEleve').innerHTML = `<div class="cd-e-msg"><p>${cdEsc(error ? error.message : 'Session introuvable.')}</p><button class="btn" onclick="cdEleveFermer()">Fermer</button></div>`; return; }
  if(data.fin) return cdEleveFin();
  // Seul l'élément en cours arrive en entier ; les précédents déjà relus restent en mémoire.
  if(!cdE.cache) cdE.cache = new Map();
  data.items = (data.items || []).map((x, k) => x && x.leger && cdE.cache.has(k) ? cdE.cache.get(k) : x);
  data.items.forEach((x, k) => { if(x && !x.leger) cdE.cache.set(k, x); });
  const avant = cdE.d;
  cdE.d = data;
  if(typeof cdEleveEquipe === 'function') cdEleveEquipe();
  if(!avant || avant.idx !== data.idx) cdE.vue = data.idx; // le professeur avance : on le suit
  // Exercice en cours sur l'écran : on ne le redessine pas (la saisie en cours serait perdue).
  const corrBouge = !!(avant && avant.etat && avant.etat.corr) !== !!(data.etat && data.etat.corr) && ((data.items[cdE.vue] || {}).exo || {}).type === 'td';
  if(avant && avant.idx === data.idx && avant.n === data.n && (data.items[cdE.vue] || {}).exo && cdE.cxMonte === cdE.vue && !corrBouge) return;
  const it = data.items[data.idx] || {}, etape = data.etat && data.etat.etape;
  // Construction déroulée par le professeur : tableau en plein écran, à la même étape.
  if(it.prog && etape != null && cdE.vue === data.idx){
    if(!cdTableau || cdTableau.prog !== it.prog && JSON.stringify(cdTableau.prog) !== JSON.stringify(it.prog)){ if(!cdEntrerTableau(it.prog, 'eleve')) return cdEleveRendre(); }
    await cdJouerJusqua(etape);
    return;
  }
  cdQuitterTableau();
  cdEleveRendre();
}
function cdEleveRendre(){
  const o = document.getElementById('cdEleve'); if(!o || !cdE || !cdE.d) return;
  const d = cdE.d, k = cdE.vue, it = d.items[k] || {};
  if(it.leger){ cdEleveElement(k); }
  if(typeof cxVivantRestaurer === 'function') cxVivantRestaurer();
  cdE.cxMonte = null;
  if(typeof cx !== 'undefined' && cx.prog && cx.prog.role === 'eleve' && cx.prog.k !== k) cxQuitterProg();
  if(!it.exo && qzP && qzP.cours) qzP = null;
  o.innerHTML = `<div class="cd-e-tete"><span class="cd-e-titre">${cdEsc(d.titre)}</span>
      <span class="cd-e-nav"><button onclick="cdEleveVoir(${k - 1})" ${k ? '' : 'disabled'} title="Élément précédent"><span class="gicon">arrow_back</span></button>
      <b>${k + 1} / ${d.n}</b><button onclick="cdEleveVoir(${k + 1})" ${k < d.idx ? '' : 'disabled'} title="Élément suivant"><span class="gicon">arrow_forward</span></button></span>
      ${k !== d.idx ? `<button class="cd-e-direct" onclick="cdEleveVoir(${d.idx})"><span class="gicon">cast</span> Revenir au direct</button>` : '<span class="cd-e-live"><span class="dot"></span> En direct</span>'}</div>
    <div id="cdEqBandeau" hidden></div>
    <div class="cd-e-corps"><div class="cd-item-titre">${cdEsc(it.titre || '')}${it.chapitre ? ` <small>${cdEsc(it.chapitre)}</small>` : ''}</div>
      <div class="cd-contenu" id="cdEleveContenu">${it.leger ? '<p class="hint">Chargement…</p>' : it.exo ? '' : it.corr && k === d.idx && d.etat && d.etat.corr ? '<div class="cd-corr-montree"><span class="gicon">fact_check</span> Correction</div>' + it.corr : it.html || ''}</div></div>
    ${cdE.dehors ? `<div class="cd-e-retour"><div><span class="gicon">front_hand</span><h2>Reste avec la classe !</h2><p>Tu as quitté la page du cours : ton professeur en est informé.</p><button class="btn" onclick="cdEleveRevenir()">Je reviens au cours</button></div></div>` : ''}`;
  if(typeof cdEleveEquipe === 'function') cdEleveEquipe();
  const c = document.getElementById('cdEleveContenu');
  if(it.leger) return;
  if(c && it.exo){ if(!cdE.dehors && typeof cxEleveMonter === 'function') cxEleveMonter(k, it); }
  else if(c){ c.querySelectorAll('[data-tbprog]').forEach(b => b.remove()); if(typeof cahierOutilsCours === 'function') cahierOutilsCours(c); if(it.src && !cdE.dehors && typeof cxMonterVivant === 'function') cxMonterVivant(c, it.src); }
}
// Élément déjà montré, relu à la demande (l'état ne renvoie en entier que l'élément en cours).
async function cdEleveElement(k){
  if(!cdE || (cdE.charge && cdE.charge.has(k))) return;
  if(!cdE.charge) cdE.charge = new Set();
  cdE.charge.add(k);
  const { data, error } = await sb.rpc('cours_direct_element', { p_id: cdE.id, p_k: k });
  if(cdE && cdE.charge) cdE.charge.delete(k);
  if(!cdE || !cdE.d) return;
  if(error || !data){ const c = document.getElementById('cdEleveContenu'); if(c && cdE.vue === k) c.innerHTML = `<p class="hint">${cdEsc(error ? error.message : 'Élément introuvable.')}</p>`; return; }
  if(!cdE.cache) cdE.cache = new Map();
  cdE.cache.set(k, data); cdE.d.items[k] = data;
  if(cdE.vue === k) cdEleveRendre();
}
function cdEleveVoir(k){ if(!cdE || !cdE.d) return; cdE.vue = Math.max(0, Math.min(cdE.d.idx, k)); cdEleveRendre(); }
function cdEleveFin(){
  if(!cdE) return;
  const o = document.getElementById('cdEleve');
  cdQuitterTableau();
  if(typeof cxQuitterProg === 'function') cxQuitterProg();
  if(document.fullscreenElement){ try{ document.exitFullscreen(); }catch(e){} }
  const id = cdE.id; cdEleveFermer(true);
  if(o){ o.style.display = 'flex'; o.innerHTML = `<div class="cd-e-msg"><span class="gicon">school</span><h2>La session est terminée</h2><p>Retrouve ces éléments dans ton cahier.</p><button class="btn" onclick="document.getElementById('cdEleve').style.display='none'">Fermer</button></div>`; }
  void id;
}
// Sorties : autre onglet, autre fenêtre, sortie du plein écran.
function cdSignaler(dehors, motif){
  if(!cdE || cdE.dehors === dehors) return;
  cdE.dehors = dehors;
  sb.rpc('cours_direct_signal', { p_id: cdE.id, p_dehors: dehors });
  try{ cdE.ch.send({ type: 'broadcast', event: 'sortie', payload: { e: currentUser.id, dehors, motif } }); }catch(e){}
  if(dehors){ cdQuitterTableau(); if(typeof cxQuitterProg === 'function') cxQuitterProg(); cdEleveRendre(); }
}
function cdSurVisibilite(){ if(document.visibilityState === 'hidden') cdSignaler(true, 'autre onglet ou application'); }
function cdSurBlur(){ if(!cdE) return; clearTimeout(cdE.blurT); cdE.blurT = setTimeout(() => { if(cdE && !document.hasFocus()) cdSignaler(true, 'fenêtre quittée'); }, 1500); }
function cdSurRetour(){ if(cdE) clearTimeout(cdE.blurT); }
function cdSurPleinEcran(){ if(cdE && !document.fullscreenElement && !cdE.fin) cdSignaler(true, 'sortie du plein écran'); }
async function cdEleveRevenir(){
  if(!cdE) return;
  cdPleinEcran();
  cdE.dehors = false;
  sb.rpc('cours_direct_signal', { p_id: cdE.id, p_dehors: false });
  try{ cdE.ch.send({ type: 'broadcast', event: 'sortie', payload: { e: currentUser.id, dehors: false } }); }catch(e){}
  cdE.d = null; // recharge et retrouve le direct (construction comprise)
  await cdEleveCharger();
}

/* ---------- Le champ « code » des questions flash essaie d'abord une session COURS ---------- */
(function cdBrancherCode(){
  if(typeof qzDirectCode !== 'function') return;
  const orig = qzDirectCode;
  qzDirectCode = async function(code){
    const c = String(code || '').replace(/\D/g, '');
    if(c.length >= 4 && typeof sb !== 'undefined' && sb){ try{ if(await cdCode(c)) return; }catch(e){} }
    return orig.apply(this, arguments);
  };
})();
/* ---------- Bandeau « Session COURS » chez l'élève ----------
   Demandé : afficher dans « Mon travail » un bandeau « Ton professeur a ouvert une session COURS :
   Rejoindre » (entrée d'un clic, sans code ; retour facile après un rechargement). Vérifié toutes les
   15 s tant que la page est visible, comme celui des questions flash (questionnaires-direct.js). */
async function cdVeille(){
  const dedans = cdE && document.getElementById('cdEleve') && document.getElementById('cdEleve').style.display !== 'none';
  if(typeof sb === 'undefined' || !sb || !currentUser || currentUserRole !== 'eleve' || document.hidden || dedans){ cdInvitation([]); return; }
  const { data, error } = await sb.rpc('cours_direct_actives');
  cdInvitation(!error && Array.isArray(data) ? data : []);
}
function cdInvitation(liste){
  let b = document.getElementById('cdInvit');
  if(!liste.length){ if(b) b.remove(); return; }
  const s = liste[0];
  if(!b){ b = document.createElement('div'); b.id = 'cdInvit'; document.body.appendChild(b); }
  b.style.bottom = document.getElementById('qzdBandeau') ? '84px' : '18px';
  if(b.dataset.id === s.id) return;
  b.dataset.id = s.id;
  b.innerHTML = `<span class="gicon">cast_for_education</span><span class="t"><b>Ton professeur a ouvert une session COURS</b><span>${cdEsc(s.titre)}${s.classe ? ' · ' + cdEsc(s.classe) : ''}</span></span>
    <button class="btn" onclick="cdRejoindreId('${s.id}')"><span class="gicon">login</span> Rejoindre</button>`;
}
async function cdRejoindreId(id){
  const { data, error } = await sb.rpc('cours_direct_rejoindre_id', { p_id: id });
  if(error || !data){ await niceAlert((error && error.message) || 'Session introuvable.'); cdVeille(); return; }
  cdInvitation([]);
  cdEleveOuvrir(data);
}
setInterval(cdVeille, 15000);
document.addEventListener('visibilitychange', () => { if(!document.hidden) cdVeille(); });
document.addEventListener('DOMContentLoaded', () => setTimeout(cdVeille, 2500));
document.addEventListener('DOMContentLoaded', cdBoutonMaj);

(function cdStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .cd-prep{max-width:640px;width:94vw;max-height:88vh;display:flex;flex-direction:column;}
    .cd-h{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;} .cd-h .gicon{color:#1F7A4D;vertical-align:middle;}
    .cd-lab{display:flex;gap:8px;align-items:center;font-weight:700;} .cd-lab input{flex:1;}
    .cd-dates{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin:8px 0;}
    .cd-liste{overflow:auto;flex:1;border:1px solid rgba(28,43,57,.12);border-radius:10px;padding:8px 10px;background:#fff;min-height:120px;}
    .cd-jour{margin-bottom:8px;} .cd-jour > b{display:block;text-transform:capitalize;color:#1F3A5C;margin:4px 0;}
    .cd-entree{display:block;padding:4px 2px;cursor:pointer;} .cd-entree small{color:var(--ink-soft);}
    .cd-tag{font-size:.75rem;color:#1F7A4D;font-weight:700;} .cd-tag .gicon{font-size:15px;vertical-align:middle;}
    #cdProf{position:fixed;inset:0;z-index:9000;background:var(--paper,#FBF8F2);display:none;flex-direction:column;}
    .cd-p-tete{display:flex;align-items:center;gap:16px;padding:10px 18px;border-bottom:1px solid rgba(28,43,57,.12);background:#fff;flex-wrap:wrap;}
    .cd-p-titre{font:800 1.15rem 'Space Grotesk',sans-serif;}
    .cd-code{margin-left:auto;font:700 1rem 'Space Grotesk',sans-serif;background:#1F3A5C;color:#fff;border-radius:12px;padding:6px 16px;}
    .cd-code b{font-size:2rem;letter-spacing:.15em;margin-left:6px;vertical-align:middle;}
    .cd-p-act{display:flex;gap:8px;}
    .cd-p-corps{flex:1;display:grid;grid-template-columns:230px 1fr 260px;gap:12px;padding:12px;min-height:0;}
    .cd-p-items,.cd-p-classe{overflow:auto;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:8px;}
    .cd-item{display:flex;gap:6px;align-items:flex-start;width:100%;text-align:left;border:0;background:none;padding:7px 8px;border-radius:8px;cursor:pointer;font:600 .85rem Inter,sans-serif;color:var(--ink);}
    .cd-item > span:first-child{min-width:22px;height:22px;border-radius:50%;background:#E8ECF2;display:inline-flex;align-items:center;justify-content:center;font-size:.75rem;}
    .cd-item.vu{color:var(--ink-soft);} .cd-item.on{background:#1F3A5C;color:#fff;} .cd-item.on > span:first-child{background:#fff;color:#1F3A5C;}
    .cd-item .gicon{font-size:16px;color:#1F7A4D;} .cd-ajout{margin-top:6px;border:1.5px dashed rgba(28,43,57,.25);color:#1F3A5C;justify-content:center;}
    .cd-p-scene{overflow:auto;background:#fff;border:1px solid rgba(28,43,57,.1);border-radius:12px;padding:12px 16px;}
    .cd-nav{display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap;margin-bottom:10px;}
    .cd-item-titre{font:800 1.05rem 'Space Grotesk',sans-serif;color:#1F3A5C;margin:4px 0 10px;} .cd-item-titre small{font-weight:600;color:var(--ink-soft);font-size:.8rem;}
    .cd-contenu{max-width:100%;overflow-x:auto;} .cd-contenu img,.cd-contenu svg{max-width:100%;height:auto;}
    .cd-p-resume{font-family:'Space Grotesk',sans-serif;margin:2px 4px 8px;} .cd-rouge{color:#C0392B;}
    .cd-el{display:grid;grid-template-columns:14px 1fr;column-gap:8px;padding:5px 4px;border-radius:8px;} .cd-el small{grid-column:2;color:var(--ink-soft);font-size:.74rem;}
    .cd-pastille{width:11px;height:11px;border-radius:50%;background:#C8CDD5;margin-top:4px;}
    .cd-el.present .cd-pastille{background:#2E9C6A;} .cd-el.perdu .cd-pastille{background:#E9C46A;}
    .cd-el.dehors{background:#FBECEA;} .cd-el.dehors .cd-pastille{background:#C0392B;animation:cdClign 1s infinite;} .cd-el.dehors small{color:#C0392B;font-weight:700;}
    @keyframes cdClign{50%{opacity:.25;}}
    #cdInvit{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:381;display:flex;align-items:center;gap:12px;background:#1F3A5C;color:#fff;border-radius:16px;padding:10px 12px 10px 16px;box-shadow:0 10px 30px rgba(31,58,92,.35);max-width:calc(100vw - 24px);font-family:Inter,sans-serif;}
    #cdInvit > .gicon{font-size:1.6rem;} #cdInvit .t{display:flex;flex-direction:column;line-height:1.25;min-width:0;}
    #cdInvit .t span{font-size:.85rem;opacity:.9;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;} #cdInvit .btn{background:#fff;color:#1F3A5C;white-space:nowrap;margin:0;}
    .cd-corr-montree{display:inline-flex;gap:6px;align-items:center;background:#1F7A4D;color:#fff;border-radius:999px;padding:4px 14px;font-weight:700;margin-bottom:10px;}
    .cd-toast{position:fixed;right:18px;bottom:18px;z-index:9500;background:#C0392B;color:#fff;padding:10px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.25);transform:translateY(20px);opacity:0;transition:.3s;font-family:Inter,sans-serif;}
    .cd-toast.on{transform:none;opacity:1;} .cd-toast .gicon{vertical-align:middle;}
    @media (max-width:900px){ .cd-p-corps{grid-template-columns:1fr;} }
    #cdEleve{position:fixed;inset:0;z-index:9000;background:#FBF8F2;display:none;flex-direction:column;}
    .cd-e-tete{display:flex;align-items:center;gap:14px;padding:10px 18px;background:#1F3A5C;color:#fff;flex-wrap:wrap;}
    .cd-e-titre{font:800 1.1rem 'Space Grotesk',sans-serif;}
    .cd-e-nav{display:flex;align-items:center;gap:6px;margin-left:auto;} .cd-e-nav button{border:0;border-radius:8px;background:rgba(255,255,255,.15);color:#fff;cursor:pointer;display:flex;padding:4px;} .cd-e-nav button:disabled{opacity:.3;cursor:default;}
    .cd-e-live{display:inline-flex;align-items:center;gap:6px;font-weight:700;} .cd-e-live .dot{width:10px;height:10px;border-radius:50%;background:#E35D3A;animation:cdClign 1.2s infinite;}
    .cd-e-direct{border:0;border-radius:999px;background:#E35D3A;color:#fff;font-weight:700;padding:5px 12px;cursor:pointer;display:inline-flex;gap:4px;align-items:center;}
    .cd-e-corps{flex:1;overflow:auto;padding:18px max(18px, calc((100vw - 980px) / 2));font-size:1.08rem;}
    .cd-e-retour{position:fixed;inset:0;z-index:9100;background:rgba(28,43,57,.75);display:flex;align-items:center;justify-content:center;}
    .cd-e-retour > div,.cd-e-msg{background:#fff;border-radius:18px;padding:26px 30px;text-align:center;max-width:420px;margin:auto;}
    .cd-e-retour .gicon,.cd-e-msg .gicon{font-size:48px;color:#E35D3A;} .cd-e-retour h2,.cd-e-msg h2{margin:6px 0;}
    /* Construction en direct : bandeau au-dessus du tableau plein écran (mode projection) */
    #cdBandeau{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:2147483002;display:flex;gap:8px;align-items:center;background:rgba(31,58,92,.94);color:#fff;padding:8px 12px;border-radius:14px;font-family:'Space Grotesk',sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.25);flex-wrap:wrap;justify-content:center;}
    #cdBandeau button{border:0;border-radius:10px;background:rgba(255,255,255,.16);color:#fff;font:700 .9rem 'Space Grotesk',sans-serif;padding:6px 12px;cursor:pointer;display:inline-flex;gap:4px;align-items:center;}
    #cdBandeau button.go{background:#2E9C6A;} #cdBandeau button:disabled{opacity:.35;cursor:default;}
    .cd-b-t{font-weight:800;} .cd-b-h{opacity:.8;font-size:.85rem;}
    body.fig-proj #cdBandeau, body.fig-proj #cdBandeau *, body.fig-proj .cd-toast, body.fig-proj .cd-toast *, body.fig-proj #niceModalOverlay, body.fig-proj #niceModalOverlay *{visibility:visible !important;}
    body.cd-tableau #cdEleve, body.cd-tableau #cdProf{display:none !important;}
  `;
  document.head.appendChild(st);
})();

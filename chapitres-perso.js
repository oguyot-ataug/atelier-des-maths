/* =====================================================================
   CHAPITRES-PERSO.JS -- Chapitres personnalisés : créer, scinder, regrouper des chapitres.
   Demandé : « Permettre de créer de nouveaux chapitres (ou en regrouper). Ceci pour scinder des
   chapitres, les renommer, avec possibilité de récupérer des blocs existants. »

   Un chapitre personnalisé (table chapitres_perso) a un titre, un code, un domaine, des chapitres
   sources et, pour chaque onglet (cours, methode, exos), une liste d'éléments :
     { s: 'niveau|Titre du chapitre source', id: <identifiant de bloc de cours-perso.js> }  bloc repris
     { u: 'u:…', add: { k, l, x } }                                                  bloc ajouté
   « remplace » : chapitres d'origine qu'il remplace dans la progression (scinder, regrouper).

   Affichage : le chapitre a une entrée DEMO_REGISTRY['niveau|perso:<id>'] dont les conteneurs
   (#chp-cours, #chp-methode, #chp-exos) sont communs à tous les chapitres personnalisés. À
   l'ouverture, on initialise les chapitres sources (leurs figures et animations deviennent
   vivantes), puis on DÉPLACE leurs blocs (jamais de copie : écouteurs et états gardés) dans ces
   conteneurs ; les blocs ajoutés sont construits par cours-perso.js (cpCustomBlock). En quittant le
   chapitre (ouverture d'un autre chapitre, autre page), chaque bloc retourne à sa place d'origine.
   Progression : un chapitre personnalisé apparaît (pages de niveau, frise, « Ma progression ») à la
   place du premier chapitre qu'il remplace, ou en fin d'année ; les chapitres remplacés
   disparaissent de la liste. Dans la table progressions, il est enregistré sous « perso:<id> ».
   ===================================================================== */

const CHP_ONGLETS = [['cours', 'Cours'], ['methode', 'Méthode'], ['exos', 'Exercices']];
const CHP_AJOUTS = ['h1', 'h2', 'p', 'def', 'prop', 'regle', 'box', 'hint', 'ex']; // blocs « à moi » proposés
let chpListe = new Map();      // id -> ligne de chapitres_perso (chapitres connus de cette page)
let chpChargeNiv = new Map();  // niveau -> promesse de chargement
let chpMonte = null;           // { row, memo: [[nœud, parent, suivant]] } : chapitre affiché
const chpCle = id => 'perso:' + id;
const chpPropre = (s, n) => String(s || '').replace(/[<>"&]/g, '').trim().slice(0, n || 90);
const chpEstPerso = t => typeof t === 'string' && t.startsWith('perso:');
function chpMoi(){ return typeof currentUser !== 'undefined' && currentUser ? currentUser.id : null; }
function chpDef(lvl){ return (typeof CHAPITRES_BY_LEVEL !== 'undefined' && CHAPITRES_BY_LEVEL[lvl]) || CH6; }

/* ---------- Chargement ---------- */
async function chpCharger(lvl, force){
  if(!chpMoi() || typeof sb === 'undefined' || !sb) return [];
  if(force) chpChargeNiv.delete(lvl);
  if(!chpChargeNiv.has(lvl)) chpChargeNiv.set(lvl, (async () => {
    const { data, error } = await sb.from('chapitres_perso').select('*').eq('niveau', lvl).order('created_at');
    if(error) return [];
    (data || []).forEach(r => { chpListe.set(r.id, r); chpEnregistrer(r); });
    return data || [];
  })());
  return chpChargeNiv.get(lvl);
}
/* Chapitres qui s'appliquent à l'utilisateur : les siens (professeur) ou ceux de ses professeurs
   (élève), et ceux de l'établissement. Les chapitres partagés par des collègues n'en font pas partie
   (ils se copient). */
async function chpVisibles(lvl){
  const l = await chpCharger(lvl), moi = chpMoi();
  const prof = typeof currentUserRole !== 'undefined' && (currentUserRole === 'prof' || currentUserRole === 'admin');
  return l.filter(r => r.scope === 'etab' || (prof ? r.owner_id === moi : true));
}
function chpEnregistrer(r){
  if(typeof DEMO_REGISTRY === 'undefined') return;
  DEMO_REGISTRY[r.niveau + '|' + chpCle(r.id)] = { chp: r, cours: 'chp-cours', methode: 'chp-methode', exos: 'chp-exos', init: () => chpMonter(r) };
}
function chpEntree(r, base){
  const src = chpDef(r.niveau).find(c => c.t === (r.remplace || [])[0] || c.t === (r.sources || [])[0]);
  return Object.assign({ n: src ? src.n : '', p: '', s: src ? src.s : 1, d: src ? src.d : '' }, base || {}, {
    t: chpCle(r.id), perso: true, code: r.code || (src ? src.code + '*' : '*'), cat: CATS[r.cat] ? r.cat : (src ? src.cat : 'N'),
    dispT: (base && base.dispT && base.dispT !== chpCle(r.id)) ? base.dispT : r.titre });
}

/* ---------- Progression : pages de niveau, frise ---------- */
async function chpAppliquerListe(liste, lvl){
  const vis = await chpVisibles(lvl);
  const ids = new Set(vis.map(r => r.id));
  let out = liste.filter(c => !chpEstPerso(c.t) || ids.has(c.t.slice(6))).map(c => chpEstPerso(c.t) ? chpEntree(chpListe.get(c.t.slice(6)), c) : c);
  const remplaces = new Set();
  vis.forEach(r => {
    (r.remplace || []).forEach(t => remplaces.add(t));
    if(out.some(c => c.t === chpCle(r.id))) return;
    const i = out.findIndex(c => (r.remplace || []).includes(c.t));
    const ent = chpEntree(r, i >= 0 ? { d: out[i].d, s: out[i].s, n: out[i].n } : null);
    if(i >= 0) out.splice(i, 0, ent); else out.push(ent);
  });
  out = out.filter(c => !remplaces.has(c.t));
  return { liste: out, change: vis.length > 0 || liste.some(c => chpEstPerso(c.t)) };
}
/* « Ma progression » : mêmes règles, sur les éléments de l'éditeur. */
async function chpAppliquerEditeur(lvl){
  const vis = await chpVisibles(lvl);
  const ids = new Set(vis.map(r => r.id));
  progEditorItems = progEditorItems.filter(it => !chpEstPerso(it.titre) || ids.has(it.titre.slice(6)));
  progEditorItems.forEach(it => { if(chpEstPerso(it.titre)){ const e = chpEntree(chpListe.get(it.titre.slice(6))); Object.assign(it, { code: e.code, cat: e.cat, affiche: e.dispT }); } });
  const remplaces = new Set();
  vis.forEach(r => {
    (r.remplace || []).forEach(t => remplaces.add(t));
    if(progEditorItems.some(it => it.titre === chpCle(r.id))) return;
    const i = progEditorItems.findIndex(it => (r.remplace || []).includes(it.titre)), e = chpEntree(r);
    const it = { titre: e.t, nomPerso: '', affiche: e.dispT, code: e.code, cat: e.cat, p: '', s: e.s, dateDebut: i >= 0 ? progEditorItems[i].dateDebut : null, dateFin: i >= 0 ? progEditorItems[i].dateFin : null };
    if(i >= 0) progEditorItems.splice(i, 0, it); else progEditorItems.push(it);
  });
  progEditorItems = progEditorItems.filter(it => !remplaces.has(it.titre));
}

/* ---------- Affichage d'un chapitre personnalisé ---------- */
function chpConteneurs(){
  CHP_ONGLETS.forEach(([k]) => {
    if(document.getElementById('chp-' + k)) return;
    const gen = document.getElementById((k === 'exos' ? 'exos' : k) + '-generic'); if(!gen) return;
    const d = document.createElement('div'); d.id = 'chp-' + k; d.style.display = 'none'; gen.parentNode.insertBefore(d, gen);
  });
}
function chpDemonter(){
  if(!chpMonte) return;
  chpMonte.memo.slice().reverse().forEach(([n, par, nx]) => { try{ par.insertBefore(n, nx && nx.parentNode === par ? nx : null); }catch(e){} });
  chpMonte = null;
  CHP_ONGLETS.forEach(([k]) => { const c = document.getElementById('chp-' + k); if(c){ c.innerHTML = ''; c._cpCustom = null; c._cpBlocks = null; } });
}
function chpBlocsSource(s, onglet){
  const reg = DEMO_REGISTRY[s]; if(!reg || !reg[onglet]) return [];
  const c = document.getElementById(reg[onglet]); if(!c) return [];
  return cpBlocks(c).filter(b => !b.nodes.some(n => n.dataset && n.dataset.cpCustom));
}
function chpMonter(r){
  chpDemonter(); chpConteneurs();
  const memo = []; chpMonte = { row: r, memo };
  const ct = r.contenu || {};
  // Les chapitres sources sont initialisés une fois : leurs figures et animations deviennent vivantes.
  const srcs = new Set(); CHP_ONGLETS.forEach(([k]) => (ct[k] || []).forEach(e => { if(e.s) srcs.add(e.s); }));
  srcs.forEach(s => { const d = DEMO_REGISTRY[s]; if(d && d.init && !d.chp){ try{ d.init(); }catch(e){ console.warn('chapitre source', s, e); } } });
  CHP_ONGLETS.forEach(([k]) => {
    const box = document.getElementById('chp-' + k); if(!box) return;
    if(k === 'cours') box.insertAdjacentHTML('beforeend', chpBandeauHtml(r));
    (ct[k] || []).forEach(e => {
      if(e.u){ const b = cpCustomBlock(box, e.u, e.add, null); if(b) b.nodes.forEach(n => box.appendChild(n)); return; }
      const b = chpBlocsSource(e.s, k).find(x => x.id === e.id); if(!b) return;
      b.nodes.forEach(n => { memo.push([n, n.parentNode, n.nextSibling]); n.classList.remove('cp-hidden'); box.appendChild(n); });
    });
    if(!(ct[k] || []).length) box.insertAdjacentHTML('beforeend', `<p class="hint">Cet onglet est vide pour l'instant${chpPeutModifier(r) ? ' : « Composer ce chapitre » pour y mettre des blocs' : ''}.</p>`);
    try{ cpRenumber(box, true); }catch(e){}
  });
  if(typeof updateCourseAddButtonsState === 'function') updateCourseAddButtonsState();
}
function chpPeutModifier(r){
  const moi = chpMoi(); if(!moi) return false;
  if(r.scope === 'prof') return r.owner_id === moi;
  return typeof currentUserRole !== 'undefined' && (currentUserRole === 'admin' || (typeof currentReferentEtab !== 'undefined' && currentReferentEtab && currentReferentEtab.uai === r.uai));
}
function chpBandeauHtml(r){
  const lvl = r.niveau, sources = (r.sources || []).filter(s => DEMO_REGISTRY[lvl + '|' + s]);
  const liens = sources.map(t => { const c = chpDef(lvl).find(x => x.t === t); return `<button type="button" class="chp-src" onclick="chpOuvrirSource('${lvl}', ${escapeHtml(JSON.stringify(t))})">${escapeHtml(c ? c.code + ' · ' + c.t : t)}</button>`; }).join('');
  const prof = typeof currentUserRole !== 'undefined' && (currentUserRole === 'prof' || currentUserRole === 'admin');
  return `<div class="chp-bandeau"><span class="gicon">dashboard_customize</span> <span>Chapitre ${r.scope === 'etab' ? 'de l\'établissement' : 'personnalisé'}${sources.length ? ', construit à partir de :' : ''}</span>${liens}
    ${prof && chpPeutModifier(r) ? `<span class="chp-bandeau-act"><button type="button" class="btn secondary" onclick="chpComposer('${r.id}')"><span class="gicon">edit</span> Composer ce chapitre</button></span>` : ''}
    ${sources.length ? '<span class="hint" style="margin:0;flex-basis:100%;">Les planches, quiz et questions flash sont dans les chapitres d\'origine.</span>' : ''}</div>`;
}
function chpOuvrirSource(lvl, t){ const c = chpDef(lvl).find(x => x.t === t); if(c) openChapitre(c, 'cours', lvl); }
function chapTitreAffiche(){
  const d = typeof DEMO_REGISTRY !== 'undefined' && DEMO_REGISTRY[(currentChapterLevel || '') + '|' + (currentChapterTitle || '')];
  return d && d.chp ? d.chp.titre : (currentChapterTitle || '');
}

/* ---------- Éditeur de composition ---------- */
let chpEd = null; // { row, contenu, onglet, srcOuverte }
function chpFenetre(html){
  let ov = document.getElementById('chpOv');
  if(!ov){ ov = document.createElement('div'); ov.id = 'chpOv'; ov.className = 'modal-overlay'; document.body.appendChild(ov); }
  ov.innerHTML = `<div class="modal-card chp-modal">${html}</div>`; ov.style.display = 'flex';
  return ov;
}
function chpFermer(){ const ov = document.getElementById('chpOv'); if(ov) ov.style.display = 'none'; }
function chpLabelBloc(b){ try{ return (cpBlockLabel(b) || '(bloc)').replace(/^(\d{1,2}|[A-H])(?=[A-ZÀ-Ý])/, '$1. ').replace(/\\widehat\{([^}]*)\}/g, '$1'); }catch(e){ return '(bloc)'; } }
function chpTypeBloc(b){
  const m = b.nodes[b.nodes.length - 1], has = s => b.nodes.some(n => n.matches && (n.matches(s) || n.querySelector(s)));
  if(m.classList.contains('lesson-header')) return ['title', 'Titre'];
  if(m.classList.contains('sub-header')) return ['format_size', 'Sous-titre'];
  if(has('.def-badge')) return ['menu_book', 'Définition'];
  if(has('.prop-badge')) return ['verified', 'Propriété'];
  if(has('svg, canvas, .cm-anim, .figure-wrap')) return ['category', 'Figure'];
  if(has('.exo-card, .redaction-block')) return ['assignment', 'Exercice'];
  return ['notes', 'Texte'];
}
async function chpComposer(id){
  const r = chpListe.get(id); if(!r) return;
  chpEd = { row: r, contenu: JSON.parse(JSON.stringify(r.contenu || {})), onglet: 'cours', titre: r.titre, code: r.code || '', cat: r.cat || 'N' };
  CHP_ONGLETS.forEach(([k]) => { if(!Array.isArray(chpEd.contenu[k])) chpEd.contenu[k] = []; });
  chpDemonter(); // les blocs repris retournent dans leur chapitre : on les y retrouve pour la liste
  chpEdRendre();
}
function chpEdLibelle(e, k){
  if(e.u){ const K = CP_KINDS[e.add.k] || {}; return [K.icon || 'notes', (K.nom || 'Bloc') + ' (à vous)', (e.add.l || e.add.x || '').slice(0, 70)]; }
  const b = chpBlocsSource(e.s, k).find(x => x.id === e.id); if(!b) return ['help', 'Bloc introuvable', 'retiré du chapitre d\'origine'];
  const [ic, ty] = chpTypeBloc(b), c = chpDef(chpEd.row.niveau).find(x => e.s === chpEd.row.niveau + '|' + x.t);
  return [ic, ty + (c ? ' · ' + c.code : ''), chpLabelBloc(b)];
}
function chpEdRendre(){
  const e = chpEd, r = e.row, k = e.onglet, liste = e.contenu[k];
  const sources = (r.sources || []).filter(t => DEMO_REGISTRY[r.niveau + '|' + t]);
  const dispo = sources.map(t => {
    const s = r.niveau + '|' + t, c = chpDef(r.niveau).find(x => x.t === t), blocs = chpBlocsSource(s, k);
    return `<details class="chp-src-groupe"${sources.length === 1 ? ' open' : ''}><summary>${escapeHtml(c ? c.code + ' · ' + c.t : t)} <small>(${blocs.length} blocs)</small></summary>
      ${blocs.map(b => { const pris = liste.some(x => x.s === s && x.id === b.id), [ic, ty] = chpTypeBloc(b);
        return `<div class="chp-dispo${pris ? ' pris' : ''}"><span class="gicon">${ic}</span><span><b>${ty}</b> ${escapeHtml(chpLabelBloc(b))}</span>
          <button type="button" class="btn secondary" ${pris ? 'disabled' : ''} onclick="chpEdAjouter(${escapeHtml(JSON.stringify(s))}, ${escapeHtml(JSON.stringify(b.id))})">${pris ? 'Ajouté' : 'Ajouter →'}</button></div>`; }).join('') || '<p class="hint">Aucun bloc dans cet onglet.</p>'}</details>`;
  }).join('');
  const cont = liste.map((x, i) => { const [ic, ty, lab] = chpEdLibelle(x, k);
    return `<div class="chp-item"><span class="gicon">${ic}</span><span class="chp-item-txt"><b>${escapeHtml(ty)}</b> ${escapeHtml(lab)}</span>
      <button type="button" class="btn secondary" onclick="chpEdBouger(${i},-1)" ${i ? '' : 'disabled'} title="Monter">▲</button>
      <button type="button" class="btn secondary" onclick="chpEdBouger(${i},1)" ${i < liste.length - 1 ? '' : 'disabled'} title="Descendre">▼</button>
      <button type="button" class="btn secondary" onclick="chpEdRetirer(${i})" title="Retirer"><span class="gicon">close</span></button></div>`; }).join('');
  chpFenetre(`<button class="btn secondary chp-x" onclick="chpEdQuitter()"><span class="gicon">close</span></button>
    <h3 style="margin:0 0 8px;"><span class="gicon">dashboard_customize</span> Composer le chapitre</h3>
    <div class="chp-ident"><label>Titre <input id="chpEdTitre" value="${escapeHtml(e.titre)}" maxlength="90" oninput="chpEd.titre=this.value"></label>
      <label>Code <input id="chpEdCode" value="${escapeHtml(e.code)}" maxlength="8" style="width:7em;" oninput="chpEd.code=this.value"></label>
      <label>Domaine <select onchange="chpEd.cat=this.value">${Object.entries(CATS).map(([c, v]) => `<option value="${c}" ${e.cat === c ? 'selected' : ''}>${v.label}</option>`).join('')}</select></label></div>
    <div class="chp-onglets">${CHP_ONGLETS.map(([o, l]) => `<button type="button" class="${o === k ? 'on' : ''}" onclick="chpEd.onglet='${o}';chpEdRendre()">${l} <small>${e.contenu[o].length}</small></button>`).join('')}</div>
    <div class="chp-cols">
      <div class="chp-col"><h4>Blocs des chapitres d'origine</h4>${dispo || '<p class="hint">Aucun chapitre source : ajoutez vos propres blocs.</p>'}
        <div class="chp-src-plus"><select id="chpEdNouvSrc"><option value="">+ Puiser dans un autre chapitre…</option>${chpDef(r.niveau).filter(c => DEMO_REGISTRY[r.niveau + '|' + c.t] && !sources.includes(c.t)).map(c => `<option value="${escapeHtml(c.t)}">${escapeHtml(c.code + ' · ' + c.t)}</option>`).join('')}</select>
          <button type="button" class="btn secondary" onclick="chpEdAjouterSource()">Ajouter</button></div></div>
      <div class="chp-col"><h4>Contenu de l'onglet ${escapeHtml(CHP_ONGLETS.find(x => x[0] === k)[1])}</h4>${cont || '<p class="hint">Vide : ajoutez des blocs depuis la colonne de gauche.</p>'}
        <details class="chp-mon-bloc"><summary><span class="gicon">add</span> Ajouter un bloc à moi</summary>
          <label>Type <select id="chpEdK">${CHP_AJOUTS.map(t => `<option value="${t}">${CP_KINDS[t].nom}</option>`).join('')}</select></label>
          <label>Titre <input id="chpEdL" maxlength="120" placeholder="(facultatif pour un texte)"></label>
          <label>Texte <textarea id="chpEdX" rows="4" placeholder="**gras**, $formule$ ; une ligne qui commence par « - » fait une liste"></textarea></label>
          <button type="button" class="btn secondary" onclick="chpEdAjouterMoi()"><span class="gicon">add</span> Ajouter</button></details></div>
    </div>
    <div class="chp-pied"><span class="hint" id="chpEdMsg" style="margin:0;"></span><button class="btn secondary" onclick="chpEdQuitter()">Annuler</button><button class="btn" onclick="chpEdEnregistrer()"><span class="gicon">save</span> Enregistrer</button></div>`);
}
function chpEdAjouter(s, id){ chpEd.contenu[chpEd.onglet].push({ s, id }); chpEdRendre(); }
function chpEdBouger(i, d){ const l = chpEd.contenu[chpEd.onglet], j = i + d; if(j < 0 || j >= l.length) return; [l[i], l[j]] = [l[j], l[i]]; chpEdRendre(); }
function chpEdRetirer(i){ chpEd.contenu[chpEd.onglet].splice(i, 1); chpEdRendre(); }
function chpEdAjouterSource(){
  const v = document.getElementById('chpEdNouvSrc').value; if(!v) return;
  chpEd.row = Object.assign({}, chpEd.row, { sources: [...(chpEd.row.sources || []), v] }); chpEdRendre();
}
function chpEdAjouterMoi(){
  const k = document.getElementById('chpEdK').value, l = document.getElementById('chpEdL').value.trim().slice(0, 120), x = document.getElementById('chpEdX').value.slice(0, 4000);
  if(!l && !x.trim()){ document.getElementById('chpEdMsg').textContent = 'Écrivez un titre ou un texte.'; return; }
  chpEd.contenu[chpEd.onglet].push({ u: 'u:' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), add: { k, l, x } }); chpEdRendre();
}
function chpEdQuitter(){ chpFermer(); const r = chpEd && chpEd.row; chpEd = null; if(r && currentChapterTitle === chpCle(r.id)) chpMonter(chpListe.get(r.id)); }
async function chpEdEnregistrer(){
  const e = chpEd, titre = chpPropre(e.titre);
  if(!titre){ document.getElementById('chpEdMsg').textContent = 'Donnez un titre au chapitre.'; return; }
  const maj = { titre, code: chpPropre(e.code, 8) || null, cat: e.cat, contenu: e.contenu, sources: e.row.sources || [], updated_at: new Date().toISOString() };
  const { data, error } = await sb.from('chapitres_perso').update(maj).eq('id', e.row.id).select('*').single();
  if(error){ document.getElementById('chpEdMsg').textContent = 'Erreur : ' + error.message; return; }
  chpListe.set(data.id, data); chpEnregistrer(data); chpChargeNiv.delete(data.niveau);
  chpFermer(); chpEd = null;
  chpRafraichir(data.niveau, data.id);
}
/* Après une modification : page du chapitre, page de niveau, « Ma progression ». */
function chpRafraichir(lvl, ouvrirId){
  chpChargeNiv.delete(lvl);
  const vueChap = document.getElementById('view-chapitre'), actif = vueChap && vueChap.classList.contains('active');
  if(ouvrirId && (actif || ouvrirId === true)){ const r = chpListe.get(ouvrirId); if(r) openChapitre(chpEntree(r), 'cours', lvl); }
  const pv = document.getElementById('view-progression');
  if(pv && pv.classList.contains('active') && typeof renderProgressionEditor === 'function') renderProgressionEditor();
}

/* ---------- Créer, scinder, regrouper ---------- */
function chpBlocsDe(lvl, t){ const s = lvl + '|' + t, out = {}; CHP_ONGLETS.forEach(([k]) => { out[k] = chpBlocsSource(s, k).map(b => ({ s, id: b.id })); }); return out; }
async function chpCreer(lvl, champs){
  const uai = typeof peEtabUai === 'function' ? await peEtabUai() : null;
  const row = Object.assign({ scope: 'prof', owner_id: chpMoi(), uai, niveau: lvl, contenu: {}, sources: [], remplace: [] }, champs);
  row.titre = chpPropre(row.titre); row.code = chpPropre(row.code, 8) || null;
  const { data, error } = await sb.from('chapitres_perso').insert(row).select('*').single();
  if(error) throw error;
  chpListe.set(data.id, data); chpEnregistrer(data);
  return data;
}
function chpChoixChapitres(lvl, multi){
  return chpDef(lvl).filter(c => DEMO_REGISTRY[lvl + '|' + c.t]).map(c => `<label class="chp-choix"><input type="${multi ? 'checkbox' : 'radio'}" name="chpSrc" value="${escapeHtml(c.t)}"> <b>${escapeHtml(c.code)}</b> ${escapeHtml(c.t)}</label>`).join('');
}
function chpNouveau(lvl, mode){
  lvl = lvl || document.getElementById('progNiveauSelect').value;
  const regroup = mode === 'regrouper';
  chpFenetre(`<button class="btn secondary chp-x" onclick="chpFermer()"><span class="gicon">close</span></button>
    <h3 style="margin:0 0 8px;"><span class="gicon">${regroup ? 'merge' : 'add_box'}</span> ${regroup ? 'Regrouper des chapitres' : 'Nouveau chapitre'}</h3>
    <p class="hint" style="margin:0 0 10px;">${regroup ? 'Le nouveau chapitre reprend tous les blocs des chapitres cochés (à trier ensuite) et les remplace dans votre progression.' : 'Choisissez les chapitres où vous puiserez des blocs (vous en ajouterez d\'autres ensuite). Les chapitres d\'origine restent dans votre progression.'}</p>
    <div class="chp-ident"><label>Titre <input id="chpNvTitre" maxlength="90"></label><label>Code <input id="chpNvCode" maxlength="8" style="width:7em;"></label>
      <label>Domaine <select id="chpNvCat">${Object.entries(CATS).map(([c, v]) => `<option value="${c}">${v.label}</option>`).join('')}</select></label></div>
    <div class="chp-choix-liste">${chpChoixChapitres(lvl, true)}</div>
    <div class="chp-pied"><span class="hint" id="chpNvMsg" style="margin:0;"></span><button class="btn secondary" onclick="chpFermer()">Annuler</button><button class="btn" onclick="chpNouveauOk('${lvl}', ${regroup})"><span class="gicon">check</span> Créer</button></div>`);
  document.querySelectorAll('#chpOv input[name=chpSrc]').forEach(i => i.addEventListener('change', () => {
    const coches = [...document.querySelectorAll('#chpOv input[name=chpSrc]:checked')].map(x => chpDef(lvl).find(c => c.t === x.value)).filter(Boolean);
    if(coches[0]){ const cat = document.getElementById('chpNvCat'); cat.value = coches[0].cat;
      const code = document.getElementById('chpNvCode'); if(!code.dataset.touche) code.value = coches.map(c => c.code).join('+').slice(0, 8);
      const ti = document.getElementById('chpNvTitre'); if(regroup && !ti.dataset.touche) ti.value = coches.map(c => c.t).join(' et ').slice(0, 90); }
  }));
  ['chpNvCode', 'chpNvTitre'].forEach(id => document.getElementById(id).addEventListener('input', e => { e.target.dataset.touche = '1'; }));
}
async function chpNouveauOk(lvl, regroup){
  const titre = document.getElementById('chpNvTitre').value, msg = document.getElementById('chpNvMsg');
  const srcs = [...document.querySelectorAll('#chpOv input[name=chpSrc]:checked')].map(x => x.value);
  if(!chpPropre(titre)){ msg.textContent = 'Donnez un titre au chapitre.'; return; }
  if(regroup && srcs.length < 2){ msg.textContent = 'Cochez au moins deux chapitres à regrouper.'; return; }
  const contenu = { cours: [], methode: [], exos: [] };
  if(regroup) srcs.forEach(t => { const b = chpBlocsDe(lvl, t); CHP_ONGLETS.forEach(([k]) => contenu[k].push(...b[k])); });
  try{
    const r = await chpCreer(lvl, { titre, code: document.getElementById('chpNvCode').value, cat: document.getElementById('chpNvCat').value, sources: srcs, remplace: regroup ? srcs : [], contenu });
    chpFermer(); chpRafraichir(lvl);
    chpComposer(r.id);
  }catch(e){ msg.textContent = 'Erreur : ' + (e.message || e); }
}
/* Scinder : deux chapitres, les blocs répartis en un clic chacun (partie 1 ou 2). */
let chpSc = null;
function chpScinder(lvl){
  lvl = lvl || document.getElementById('progNiveauSelect').value;
  chpFenetre(`<button class="btn secondary chp-x" onclick="chpFermer()"><span class="gicon">close</span></button>
    <h3 style="margin:0 0 8px;"><span class="gicon">call_split</span> Scinder un chapitre</h3>
    <p class="hint" style="margin:0 0 10px;">Choisissez le chapitre : ses blocs seront répartis entre deux nouveaux chapitres, qui le remplacent dans votre progression.</p>
    <div class="chp-choix-liste">${chpChoixChapitres(lvl, false)}</div>
    <div class="chp-pied"><button class="btn secondary" onclick="chpFermer()">Annuler</button><button class="btn" onclick="chpScinderSuite('${lvl}')">Suivant →</button></div>`);
}
function chpScinderSuite(lvl){
  const x = document.querySelector('#chpOv input[name=chpSrc]:checked'); if(!x) return;
  const c = chpDef(lvl).find(y => y.t === x.value), b = chpBlocsDe(lvl, c.t), part = {};
  // Par défaut : la première moitié de chaque onglet en partie 1, coupée à un titre de paragraphe si possible.
  CHP_ONGLETS.forEach(([k]) => { const l = b[k], bl = chpBlocsSource(lvl + '|' + c.t, k); let cut = Math.ceil(l.length / 2);
    const titres = bl.map((x, i) => x.nodes[x.nodes.length - 1].classList.contains('lesson-header') ? i : -1).filter(i => i > 0);
    if(titres.length) cut = titres.reduce((a, i) => Math.abs(i - l.length / 2) < Math.abs(a - l.length / 2) ? i : a, titres[0]);
    part[k] = l.map((_, i) => i < cut ? 1 : 2); });
  chpSc = { lvl, c, b, part, onglet: 'cours', t1: c.t + ' (1)', t2: c.t + ' (2)' };
  chpScRendre();
}
function chpScRendre(){
  const s = chpSc, k = s.onglet, bl = chpBlocsSource(s.lvl + '|' + s.c.t, k);
  chpFenetre(`<button class="btn secondary chp-x" onclick="chpFermer()"><span class="gicon">close</span></button>
    <h3 style="margin:0 0 8px;"><span class="gicon">call_split</span> Scinder « ${escapeHtml(s.c.t)} »</h3>
    <div class="chp-ident"><label>Partie 1 <input value="${escapeHtml(s.t1)}" maxlength="90" oninput="chpSc.t1=this.value"></label><label>Partie 2 <input value="${escapeHtml(s.t2)}" maxlength="90" oninput="chpSc.t2=this.value"></label></div>
    <div class="chp-onglets">${CHP_ONGLETS.map(([o, l]) => `<button type="button" class="${o === k ? 'on' : ''}" onclick="chpSc.onglet='${o}';chpScRendre()">${l}</button>`).join('')}</div>
    <div class="chp-sc-liste">${bl.map((b, i) => { const [ic, ty] = chpTypeBloc(b), p = s.part[k][i];
      return `<div class="chp-sc p${p}"><span class="gicon">${ic}</span><span class="chp-item-txt"><b>${ty}</b> ${escapeHtml(chpLabelBloc(b))}</span>
        <span class="chp-sc-btn"><button type="button" class="${p === 1 ? 'on' : ''}" onclick="chpSc.part['${k}'][${i}]=1;chpScRendre()">1</button><button type="button" class="${p === 2 ? 'on' : ''}" onclick="chpSc.part['${k}'][${i}]=2;chpScRendre()">2</button></span></div>`; }).join('') || '<p class="hint">Aucun bloc dans cet onglet.</p>'}</div>
    <div class="chp-pied"><span class="hint" id="chpScMsg" style="margin:0;"></span><button class="btn secondary" onclick="chpFermer()">Annuler</button><button class="btn" onclick="chpScinderOk()"><span class="gicon">check</span> Créer les deux chapitres</button></div>`);
}
async function chpScinderOk(){
  const s = chpSc, msg = document.getElementById('chpScMsg');
  if(!chpPropre(s.t1) || !chpPropre(s.t2)){ msg.textContent = 'Donnez un titre aux deux parties.'; return; }
  const c1 = {}, c2 = {}; CHP_ONGLETS.forEach(([k]) => { c1[k] = s.b[k].filter((_, i) => s.part[k][i] === 1); c2[k] = s.b[k].filter((_, i) => s.part[k][i] === 2); });
  try{
    const base = { cat: s.c.cat, sources: [s.c.t], remplace: [s.c.t] };
    await chpCreer(s.lvl, Object.assign({ titre: s.t1, code: s.c.code + 'a', contenu: c1 }, base));
    await chpCreer(s.lvl, Object.assign({ titre: s.t2, code: s.c.code + 'b', contenu: c2 }, base));
    chpFermer(); chpSc = null; chpRafraichir(s.lvl);
  }catch(e){ msg.textContent = 'Erreur : ' + (e.message || e); }
}

/* ---------- « Mes chapitres » dans « Ma progression » ---------- */
async function chpPanneau(lvl){
  let box = document.getElementById('chpBox');
  if(!box){ const ap = document.getElementById('peEtabBox') || document.getElementById('progStatus'); if(!ap) return; box = document.createElement('div'); box.id = 'chpBox'; box.className = 'pe-etab-box chp-box'; ap.after(box); }
  box.innerHTML = '';
  if(!chpMoi() || !(currentUserRole === 'prof' || currentUserRole === 'admin')) return;
  const tous = await chpCharger(lvl), moi = chpMoi(), uai = typeof peEtabUai === 'function' ? await peEtabUai() : null;
  const referent = typeof currentReferentEtab !== 'undefined' && currentReferentEtab && currentReferentEtab.uai === uai;
  const miens = tous.filter(r => r.scope === 'prof' && r.owner_id === moi), etab = tous.filter(r => r.scope === 'etab'), partages = tous.filter(r => r.scope === 'prof' && r.owner_id !== moi && r.partage);
  const ligne = (r, actions) => `<div class="pe-etab-ligne"><span class="gicon">dashboard_customize</span> <b>${escapeHtml(r.code || '')}</b> ${escapeHtml(r.titre)}${(r.remplace || []).length ? ` <small class="hint" style="margin:0;">remplace ${escapeHtml(r.remplace.join(', '))}</small>` : ''} ${actions}</div>`;
  box.innerHTML = `<div class="pe-etab-tete"><span class="gicon">dashboard_customize</span> <b>Mes chapitres</b> · créer, scinder, regrouper</div>
    ${miens.map(r => ligne(r, `<button class="btn secondary" onclick="chpOuvrir('${r.id}')">Ouvrir</button><button class="btn secondary" onclick="chpComposer('${r.id}')"><span class="gicon">edit</span> Composer</button>
      <button class="btn secondary" onclick="chpPartager('${r.id}', ${!r.partage})" title="Proposer ce chapitre aux collègues de l'établissement"><span class="gicon">${r.partage ? 'group_off' : 'group'}</span> ${r.partage ? 'Ne plus partager' : 'Partager'}</button>
      ${referent ? `<button class="btn secondary" onclick="chpPublierEtab('${r.id}')"><span class="gicon">publish</span> Pour l'établissement</button>` : ''}
      <button class="btn secondary" onclick="chpSupprimer('${r.id}')" title="Supprimer"><span class="gicon">delete</span></button>`)).join('') || '<div class="pe-etab-ligne hint" style="margin:0;">Aucun chapitre personnalisé pour ce niveau.</div>'}
    ${etab.length ? '<div class="pe-etab-ligne" style="margin-top:4px;"><b>Chapitres de l\'établissement</b></div>' + etab.map(r => ligne(r, `<button class="btn secondary" onclick="chpOuvrir('${r.id}')">Ouvrir</button>${referent ? `<button class="btn secondary" onclick="chpComposer('${r.id}')"><span class="gicon">edit</span> Composer</button><button class="btn secondary" onclick="chpSupprimer('${r.id}')"><span class="gicon">delete</span></button>` : ''}`)).join('') : ''}
    ${partages.length ? '<div class="pe-etab-ligne" style="margin-top:4px;"><b>Partagés par des collègues</b></div>' + partages.map(r => ligne(r, `<button class="btn secondary" onclick="chpOuvrir('${r.id}')">Aperçu</button><button class="btn secondary" onclick="chpCopier('${r.id}')"><span class="gicon">content_copy</span> Copier</button>`)).join('') : ''}
    <div class="pe-etab-actions"><button class="btn" onclick="chpNouveau('${lvl}')"><span class="gicon">add_box</span> Nouveau chapitre</button>
      <button class="btn secondary" onclick="chpScinder('${lvl}')"><span class="gicon">call_split</span> Scinder un chapitre</button>
      <button class="btn secondary" onclick="chpNouveau('${lvl}', 'regrouper')"><span class="gicon">merge</span> Regrouper des chapitres</button></div>`;
}
function chpOuvrir(id){ const r = chpListe.get(id); if(r) openChapitre(chpEntree(r), 'cours', r.niveau); }
async function chpPartager(id, on){
  const { error } = await sb.from('chapitres_perso').update({ partage: on }).eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  chpListe.get(id).partage = on; chpPanneau(chpListe.get(id).niveau);
}
async function chpSupprimer(id){
  const r = chpListe.get(id); if(!r) return;
  if(!(await niceConfirm(`Supprimer le chapitre « ${r.titre} » ? ${(r.remplace || []).length ? 'Les chapitres qu\'il remplaçait reviennent dans la progression. ' : ''}Les chapitres d'origine ne sont pas touchés.`))) return;
  const { error } = await sb.from('chapitres_perso').delete().eq('id', id);
  if(error){ niceAlert('Erreur : ' + error.message); return; }
  chpListe.delete(id); delete DEMO_REGISTRY[r.niveau + '|' + chpCle(id)]; chpRafraichir(r.niveau);
}
async function chpCopier(id){
  const r = chpListe.get(id); if(!r) return;
  try{ await chpCreer(r.niveau, { titre: r.titre, code: r.code, cat: r.cat, sources: r.sources, remplace: r.remplace, contenu: r.contenu }); chpRafraichir(r.niveau); }
  catch(e){ niceAlert('Erreur : ' + (e.message || e)); }
}
async function chpPublierEtab(id){
  const r = chpListe.get(id); if(!r) return;
  if(!(await niceConfirm(`Publier « ${r.titre} » pour tout l'établissement ? Une copie devient un chapitre de l'établissement : vos collègues et leurs élèves le verront dans leur progression${(r.remplace || []).length ? ', à la place des chapitres qu\'il remplace' : ''}.`))) return;
  try{ await chpCreer(r.niveau, { scope: 'etab', titre: r.titre, code: r.code, cat: r.cat, sources: r.sources, remplace: r.remplace, contenu: r.contenu }); chpRafraichir(r.niveau); }
  catch(e){ niceAlert('Erreur : ' + (e.message || e)); }
}

/* ---------- Branchements ---------- */
(function chpInstall(){
  chpConteneurs();
  // Quitter un chapitre personnalisé : les blocs repris retournent dans leur chapitre d'origine.
  if(typeof openChapitre === 'function'){ const o = openChapitre; window.openChapitre = openChapitre = function(){ chpDemonter(); return o.apply(this, arguments); }; }
  if(typeof showView === 'function'){ const o = showView; window.showView = showView = function(v){ if(v !== 'view-chapitre') chpDemonter(); return o.apply(this, arguments); }; }
  const st = document.createElement('style');
  st.textContent = `
    .chp-bandeau{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;background:#F3F8FC;border:1.5px solid rgba(12,91,160,.2);border-radius:10px;padding:8px 12px;margin:0 0 14px;font-size:.88rem;}
    .chp-bandeau .gicon{color:#0C5BA0;} .chp-bandeau-act{margin-left:auto;} .chp-bandeau .btn{padding:3px 10px;font-size:.8rem;}
    .chp-src{border:1px solid rgba(12,91,160,.3);background:#fff;border-radius:999px;padding:2px 10px;font-size:.8rem;cursor:pointer;color:#0C5BA0;}
    .chp-modal{max-width:1100px;width:min(1100px,96vw);max-height:92vh;overflow:auto;position:relative;}
    .chp-x{position:absolute;right:12px;top:10px;padding:2px 8px;}
    .chp-ident{display:flex;gap:12px;flex-wrap:wrap;margin:0 0 10px;} .chp-ident label{display:flex;flex-direction:column;font-size:.8rem;font-weight:600;color:var(--ink-soft);gap:3px;}
    .chp-ident input[type=text],.chp-ident input:not([type]){min-width:18em;}
    .chp-onglets{display:flex;gap:6px;margin:0 0 10px;} .chp-onglets button{border:1.5px solid rgba(28,43,57,.15);background:#fff;border-radius:999px;padding:4px 14px;cursor:pointer;font-weight:600;}
    .chp-onglets button.on{background:#0C5BA0;color:#fff;border-color:#0C5BA0;} .chp-onglets small{opacity:.7;}
    .chp-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;} @media(max-width:760px){.chp-cols{grid-template-columns:1fr;}}
    .chp-col{border:1.5px solid rgba(28,43,57,.1);border-radius:10px;padding:8px 10px;max-height:56vh;overflow:auto;} .chp-col h4{margin:0 0 6px;font-family:'Space Grotesk',sans-serif;}
    .chp-src-groupe summary{cursor:pointer;font-weight:700;margin:4px 0;} .chp-src-groupe small{font-weight:400;color:var(--ink-soft);}
    .chp-dispo,.chp-item,.chp-sc{display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid rgba(28,43,57,.06);font-size:.84rem;}
    .chp-dispo>span:nth-child(2),.chp-item-txt{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .chp-dispo.pris{opacity:.5;} .chp-dispo .btn,.chp-item .btn{padding:2px 8px;font-size:.78rem;}
    .chp-src-plus{display:flex;gap:6px;margin-top:8px;} .chp-src-plus select{flex:1;}
    .chp-mon-bloc{margin-top:10px;border-top:1px dashed rgba(28,43,57,.15);padding-top:6px;} .chp-mon-bloc summary{cursor:pointer;font-weight:700;color:#0C5BA0;}
    .chp-mon-bloc label{display:flex;flex-direction:column;font-size:.8rem;gap:3px;margin:6px 0;} .chp-mon-bloc textarea{width:100%;}
    .chp-pied{display:flex;gap:8px;justify-content:flex-end;align-items:center;margin-top:12px;} .chp-pied .hint{margin-right:auto !important;color:#a83c1f;}
    .chp-choix-liste{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:4px 12px;max-height:50vh;overflow:auto;}
    .chp-choix{font-size:.86rem;display:flex;gap:6px;align-items:center;cursor:pointer;}
    .chp-sc-liste{max-height:56vh;overflow:auto;} .chp-sc.p1{background:linear-gradient(90deg,rgba(12,91,160,.08),transparent);} .chp-sc.p2{background:linear-gradient(90deg,rgba(255,130,8,.1),transparent);}
    .chp-sc-btn button{border:1.5px solid rgba(28,43,57,.2);background:#fff;width:30px;height:26px;cursor:pointer;font-weight:700;} .chp-sc-btn button:first-child{border-radius:8px 0 0 8px;} .chp-sc-btn button:last-child{border-radius:0 8px 8px 0;}
    .chp-sc.p1 .chp-sc-btn button.on{background:#0C5BA0;color:#fff;} .chp-sc.p2 .chp-sc-btn button.on{background:#FF8208;color:#fff;}
  `;
  document.head.appendChild(st);
})();

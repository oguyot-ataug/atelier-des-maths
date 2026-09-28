/* =====================================================================
   groupes.js -- Groupes de remédiation (Outils prof › Groupes de remédiation)

   Demandé : "Un prof d'un établissement doit pouvoir constituer des groupes d'élèves pour faire des
   heures de rémédiation. Ces élèves peuvent provenir de sa classe ou des autres classes."

   Un groupe est une classe marquée groupe = true (migration groupes_remediation) dont le professeur
   qui l'a créé est le professeur : il apparaît dans le sélecteur de classe et tous les outils
   (devoirs, interrogations, entraînements, séances en direct, cahier, supervision) fonctionnent avec
   lui. Les élèves proposés sont ceux des classes du professeur et des classes de son établissement
   (fonction groupe_eleves_possibles) ; l'élève garde sa classe et voit en plus le travail du groupe.
   Création / modification / suppression par les fonctions groupe_enregistrer et groupe_supprimer (un
   groupe qui a déjà du travail est archivé : masqué, résultats gardés).

   Dépend de app.js (sb, currentUser, showView, setActiveTopnav, niceAlert, niceConfirm, escapeHtml,
   loadMyClasses).
   ===================================================================== */

let grEtat = null; // { groupes, possibles, edition:{ id, nom, niveau, niveauAuto, sel:Set, cherche, classe } | null }
const GR_NIVEAUX = ['6e', '5e', '4e', '3e', 'cm1', 'cm2'];
function grEsc(s){ return escapeHtml(String(s ?? '')); }
function grNom(e){ return ((e.prenom || '') + ' ' + (e.nom || '')).trim() || '(sans nom)'; }

async function grOuvrir(){
  showView('view-groupes'); setActiveTopnav('groupes');
  const root = document.getElementById('grRoot');
  root.innerHTML = '<p class="hint">Chargement…</p>';
  grEtat = { groupes: [], possibles: [], edition: null };
  await grCharger();
  grRender();
}
async function grCharger(){
  const [g, p] = await Promise.all([
    sb.from('classes').select('id,nom,niveau,created_at').eq('groupe', true).eq('archive', false).eq('groupe_prof', currentUser.id).order('created_at', { ascending: false }),
    sb.rpc('groupe_eleves_possibles'),
  ]);
  const ids = (g.data || []).map(x => x.id);
  const { data: ins } = ids.length ? await sb.from('class_students').select('class_id, profiles(id,nom,prenom)').in('class_id', ids) : { data: [] };
  grEtat.groupes = (g.data || []).map(x => ({ id: x.id, nom: x.nom, niveau: x.niveau,
    eleves: (ins || []).filter(r => r.class_id === x.id && r.profiles).map(r => r.profiles) }));
  grEtat.possibles = p.data || [];
  grEtat.erreur = (g.error || p.error) ? (g.error || p.error).message : '';
}
// Classe d'origine d'un élève (sa classe « à lui » la plus proche : d'abord une classe du professeur).
function grClasseDe(id){
  const l = grEtat.possibles.filter(e => e.student_id === id);
  return (l.find(e => e.mienne) || l[0] || null);
}

function grRender(){
  const root = document.getElementById('grRoot'); if(!root || !grEtat) return;
  const ed = grEtat.edition;
  root.innerHTML = `
    <span class="back-btn" onclick="showView('view-home');setActiveTopnav(null);">← Accueil</span>
    <h1 style="margin:6px 0 4px;"><span class="gicon">group_add</span> Groupes de remédiation</h1>
    <p style="color:var(--ink-soft);max-width:75ch;">Réunissez des élèves de vos classes ou des autres classes de l'établissement pour une heure de remédiation, d'approfondissement ou d'aide aux devoirs. Chaque groupe apparaît ensuite comme une classe dans vos outils : devoirs, interrogations et entraînements en ligne, séances en direct, cahier de corrections, supervision. Les élèves gardent leur classe et retrouvent le travail du groupe dans « Mon travail ».</p>
    ${grEtat.erreur ? `<p class="hint" style="color:#a83c1f;">${grEsc(grEtat.erreur)}</p>` : ''}
    ${ed ? grEditeurHtml(ed) : `<button class="btn" onclick="grNouveau()"><span class="gicon">add</span> Nouveau groupe</button>`}
    <h2 style="margin:22px 0 8px;font-size:1.15rem;">Mes groupes (${grEtat.groupes.length})</h2>
    ${grEtat.groupes.length ? `<div class="gr-liste">${grEtat.groupes.map(grCarteHtml).join('')}</div>`
      : '<p class="hint">Aucun groupe pour l\'instant : « Nouveau groupe » pour en créer un.</p>'}`;
  if(ed){ const i = document.getElementById('grNom'); if(i && !i.value) i.focus(); }
}
function grCarteHtml(g){
  const parClasse = {};
  g.eleves.forEach(e => { const c = grClasseDe(e.id); const k = c ? c.classe : 'autre classe'; (parClasse[k] = parClasse[k] || []).push(e); });
  return `<div class="gr-carte">
    <div class="gr-carte-h"><span class="gicon">groups</span><b>${grEsc(g.nom)}</b><span class="gr-niv">${grEsc(g.niveau)}</span>
      <span class="hint" style="margin:0;">${g.eleves.length} élève${g.eleves.length > 1 ? 's' : ''}</span>
      <span class="gr-carte-act">
        <button class="btn secondary qz-mini" onclick="grModifier('${g.id}')"><span class="gicon">edit</span> Modifier</button>
        <button class="btn secondary qz-mini" style="color:#a83c1f;" onclick="grSupprimer('${g.id}')" title="Supprimer le groupe"><span class="gicon">delete</span></button>
      </span></div>
    <div class="gr-membres">${Object.keys(parClasse).sort().map(k => `<div><span class="gr-cl">${grEsc(k)}</span> ${parClasse[k].map(e => `<span class="gr-el">${grEsc(grNom(e))}</span>`).join('')}</div>`).join('')}</div>
  </div>`;
}

/* ---------- Édition ---------- */
function grNouveau(){ grEtat.edition = { id: null, nom: '', niveau: '', niveauAuto: true, sel: new Set(), cherche: '', classe: '' }; grRender(); }
function grModifier(id){
  const g = grEtat.groupes.find(x => x.id === id); if(!g) return;
  grEtat.edition = { id, nom: g.nom, niveau: g.niveau, niveauAuto: false, sel: new Set(g.eleves.map(e => e.id)), cherche: '', classe: '' };
  grRender(); document.getElementById('grRoot').scrollIntoView({ block: 'start', behavior: 'smooth' });
}
function grAnnuler(){ grEtat.edition = null; grRender(); }
// Niveau proposé : celui de la majorité des élèves choisis.
function grNiveauAuto(ed){
  const n = {}; ed.sel.forEach(id => { const c = grClasseDe(id); if(c) n[c.niveau] = (n[c.niveau] || 0) + 1; });
  return Object.keys(n).sort((a, b) => n[b] - n[a])[0] || '';
}
function grClasses(){
  const m = new Map();
  grEtat.possibles.forEach(e => { if(!m.has(e.class_id)) m.set(e.class_id, { id: e.class_id, nom: e.classe, niveau: e.niveau, mienne: e.mienne, eleves: [] }); m.get(e.class_id).eleves.push(e); });
  return Array.from(m.values()).sort((a, b) => (b.mienne - a.mienne) || a.niveau.localeCompare(b.niveau) || a.nom.localeCompare(b.nom, 'fr', { numeric: true }));
}
function grNorm(s){ return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
function grEditeurHtml(ed){
  const classes = grClasses(), q = grNorm(ed.cherche);
  const niveau = ed.niveauAuto ? (grNiveauAuto(ed) || ed.niveau || '6e') : ed.niveau;
  const visibles = classes.filter(c => !ed.classe || c.id === ed.classe).map(c => Object.assign({}, c, { eleves: c.eleves.filter(e => !q || grNorm(grNom(e) + ' ' + c.nom).includes(q)) })).filter(c => c.eleves.length);
  const choisis = Array.from(ed.sel).map(id => { const c = grClasseDe(id); return c ? { id, nom: grNom(c), classe: c.classe } : null; }).filter(Boolean);
  return `<div class="gr-edit">
    <h3 style="margin:0 0 10px;"><span class="gicon">${ed.id ? 'edit' : 'group_add'}</span> ${ed.id ? 'Modifier le groupe' : 'Nouveau groupe'}</h3>
    <div class="gr-edit-l">
      <label>Nom du groupe <input id="grNom" type="text" maxlength="60" value="${grEsc(ed.nom)}" placeholder="ex. Remédiation fractions, mardi 10 h" oninput="grEtat.edition.nom=this.value"></label>
      <label>Niveau <select onchange="grEtat.edition.niveau=this.value;grEtat.edition.niveauAuto=false;">
        ${GR_NIVEAUX.map(n => `<option value="${n}"${n === niveau ? ' selected' : ''}>${n}</option>`).join('')}</select>
        <small class="hint" style="margin:0;">${ed.niveauAuto ? 'choisi d\'après les élèves' : ''}</small></label>
    </div>
    <p class="gr-lab">Élèves choisis (${choisis.length})</p>
    <div class="gr-choisis">${choisis.length ? choisis.map(e => `<span class="gr-el on">${grEsc(e.nom)} <small>${grEsc(e.classe)}</small><button type="button" onclick="grCocher('${e.id}',false)" title="Retirer" aria-label="Retirer ${grEsc(e.nom)}">×</button></span>`).join('')
      : '<span class="hint" style="margin:0;">Cochez des élèves ci-dessous, dans une ou plusieurs classes.</span>'}</div>
    <p class="gr-lab">Ajouter des élèves</p>
    <div class="gr-filtres">
      <input type="search" placeholder="Rechercher un élève…" value="${grEsc(ed.cherche)}" oninput="grEtat.edition.cherche=this.value;grMajListe()" id="grCherche">
      <div class="qz-k-chips"><button type="button" class="qz-k-chip${!ed.classe ? ' on' : ''}" onclick="grFiltreClasse('')">Toutes les classes</button>
        ${classes.map(c => `<button type="button" class="qz-k-chip${ed.classe === c.id ? ' on' : ''}" onclick="grFiltreClasse('${c.id}')">${grEsc(c.nom)}${c.mienne ? ' <small>(ma classe)</small>' : ''}</button>`).join('')}</div>
    </div>
    <div class="gr-eleves" id="grListe">${grListeHtml(visibles, ed)}</div>
    <p class="hint" id="grMsg" style="margin:8px 0 0;color:#a83c1f;"></p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;">
      <button class="btn" onclick="grEnregistrer()"><span class="gicon">save</span> ${ed.id ? 'Enregistrer le groupe' : 'Créer le groupe'}</button>
      <button class="btn secondary" onclick="grAnnuler()">Annuler</button>
    </div>
  </div>`;
}
function grListeHtml(visibles, ed){
  if(!grEtat.possibles.length) return '<p class="hint">Aucun élève disponible : vos classes (ou celles de votre établissement) n\'ont pas encore d\'élèves inscrits.</p>';
  if(!visibles.length) return '<p class="hint">Aucun élève ne correspond à la recherche.</p>';
  return visibles.map(c => {
    const tous = c.eleves.every(e => ed.sel.has(e.student_id));
    return `<div class="gr-cl-bloc"><div class="gr-cl-h"><b>${grEsc(c.nom)}</b> <span class="hint" style="margin:0;">${grEsc(c.niveau)}${c.mienne ? ' · ma classe' : ''}</span>
      <button type="button" class="gr-tout" onclick="grCocherClasse('${c.id}',${!tous})">${tous ? 'tout décocher' : 'tout cocher'}</button></div>
      <div class="gr-cl-el">${c.eleves.map(e => `<label class="qz-check"><input type="checkbox" ${ed.sel.has(e.student_id) ? 'checked' : ''} onchange="grCocher('${e.student_id}',this.checked)"> ${grEsc(grNom(e))}</label>`).join('')}</div></div>`;
  }).join('');
}
// Rafraîchit seulement la liste (la saisie de recherche garde le focus).
function grMajListe(){
  const ed = grEtat.edition, q = grNorm(ed.cherche), el = document.getElementById('grListe'); if(!el) return;
  const visibles = grClasses().filter(c => !ed.classe || c.id === ed.classe).map(c => Object.assign({}, c, { eleves: c.eleves.filter(e => !q || grNorm(grNom(e) + ' ' + c.nom).includes(q)) })).filter(c => c.eleves.length);
  el.innerHTML = grListeHtml(visibles, ed);
}
function grFiltreClasse(id){ grEtat.edition.classe = id; grRender(); }
function grCocher(id, on){ const ed = grEtat.edition; if(on) ed.sel.add(id); else ed.sel.delete(id); grRenderGarderRecherche(); }
function grCocherClasse(classId, on){
  const ed = grEtat.edition, q = grNorm(ed.cherche);
  grEtat.possibles.filter(e => e.class_id === classId && (!q || grNorm(grNom(e) + ' ' + e.classe).includes(q))).forEach(e => { if(on) ed.sel.add(e.student_id); else ed.sel.delete(e.student_id); });
  grRenderGarderRecherche();
}
function grRenderGarderRecherche(){
  const y = window.scrollY, focus = document.activeElement && document.activeElement.id === 'grCherche';
  grRender(); window.scrollTo(0, y);
  if(focus){ const i = document.getElementById('grCherche'); if(i){ i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
}
async function grEnregistrer(){
  const ed = grEtat.edition, msg = document.getElementById('grMsg');
  const nom = (ed.nom || '').trim(), niveau = ed.niveauAuto ? (grNiveauAuto(ed) || ed.niveau || '6e') : ed.niveau;
  if(!nom){ msg.textContent = 'Donnez un nom au groupe.'; document.getElementById('grNom').focus(); return; }
  if(!ed.sel.size){ msg.textContent = 'Choisissez au moins un élève.'; return; }
  msg.textContent = '';
  const { data, error } = await sb.rpc('groupe_enregistrer', { p_id: ed.id, p_nom: nom, p_niveau: niveau, p_eleves: Array.from(ed.sel) });
  if(error){ msg.textContent = error.message; return; }
  const nouveau = !ed.id;
  grEtat.edition = null;
  await grCharger(); grRender();
  if(typeof loadMyClasses === 'function') await loadMyClasses(); // le groupe apparaît dans le sélecteur de classe
  await niceAlert(nouveau ? `Le groupe « ${nom} » est créé (${grEtat.groupes.find(g => g.id === data) ? grEtat.groupes.find(g => g.id === data).eleves.length : ed.sel.size} élèves). Choisissez-le comme classe dans vos outils pour lui donner du travail (devoirs, interrogations, séance en direct…).` : 'Groupe enregistré.');
}
async function grSupprimer(id){
  const g = grEtat.groupes.find(x => x.id === id); if(!g) return;
  if(!(await niceConfirm(`Supprimer le groupe « ${g.nom} » ? Les élèves restent dans leur classe. S'il a déjà du travail (devoirs, résultats), il est seulement archivé : il disparaît de vos listes, mais les résultats sont gardés.`))) return;
  const { data, error } = await sb.rpc('groupe_supprimer', { p_id: id });
  if(error){ await niceAlert(error.message); return; }
  await grCharger(); grRender();
  if(typeof loadMyClasses === 'function') await loadMyClasses();
  if(data === 'archive') await niceAlert('Le groupe avait déjà du travail : il est archivé (masqué, résultats gardés).');
}

(function grStyles(){
  const st = document.createElement('style');
  st.textContent = `
    .gr-liste{display:flex;flex-direction:column;gap:10px;}
    .gr-carte{background:#fff;border:1px solid rgba(28,43,57,.12);border-left:4px solid #26AAB1;border-radius:12px;padding:12px 14px;}
    .gr-carte-h{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
    .gr-carte-h > .gicon{color:#16767B;}
    .gr-carte-act{margin-left:auto;display:flex;gap:6px;}
    .gr-niv{font-size:.78rem;font-weight:700;color:#16767B;background:rgba(38,170,177,.12);border-radius:999px;padding:1px 8px;}
    .gr-membres{margin-top:8px;display:flex;flex-direction:column;gap:4px;font-size:.88rem;}
    .gr-cl{display:inline-block;min-width:44px;font-weight:700;color:var(--ink-soft);font-size:.8rem;}
    .gr-el{display:inline-flex;align-items:center;gap:4px;background:rgba(28,43,57,.05);border-radius:999px;padding:2px 9px;margin:2px 2px 2px 0;font-size:.85rem;}
    .gr-el.on{background:rgba(38,170,177,.14);color:#0F5C60;}
    .gr-el small{opacity:.7;} .gr-el button{border:none;background:none;cursor:pointer;font-size:1rem;line-height:1;color:inherit;padding:0 0 0 2px;}
    .gr-edit{background:#fff;border:1.5px solid #26AAB1;border-radius:14px;padding:14px 16px;margin:6px 0 4px;box-shadow:0 4px 18px rgba(28,43,57,.06);}
    .gr-edit-l{display:flex;gap:14px;flex-wrap:wrap;}
    .gr-edit-l label{display:flex;flex-direction:column;gap:4px;font-weight:600;font-size:.9rem;}
    .gr-edit-l input{min-width:280px;}
    .gr-edit input[type=text],.gr-edit input[type=search],.gr-edit select{padding:8px 11px;border:1px solid rgba(28,43,57,.2);border-radius:9px;font:inherit;background:#fff;}
    .gr-lab{margin:14px 0 6px;font-weight:700;font-size:.9rem;}
    .gr-choisis{display:flex;flex-wrap:wrap;gap:2px;min-height:28px;}
    .gr-filtres{display:flex;flex-direction:column;gap:8px;}
    .gr-filtres input[type=search]{max-width:340px;}
    .gr-eleves{margin-top:8px;max-height:420px;overflow:auto;border:1px solid rgba(28,43,57,.1);border-radius:10px;padding:8px 10px;}
    .gr-cl-bloc{padding:6px 0;border-bottom:1px solid rgba(28,43,57,.07);} .gr-cl-bloc:last-child{border-bottom:none;}
    .gr-cl-h{display:flex;align-items:center;gap:8px;margin-bottom:4px;}
    .gr-tout{margin-left:auto;border:none;background:none;color:#0C5BA0;cursor:pointer;font-size:.82rem;text-decoration:underline;}
    .gr-cl-el{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:2px 12px;}
    @media (max-width:640px){ .gr-edit-l input{min-width:0;width:100%;} .gr-carte-act{margin-left:0;} }
  `;
  document.head.appendChild(st);
})();

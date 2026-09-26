/* ============================================================
   COURS PERSONNALISÉS -- demandé : "un prof puisse s'attribuer les cours, les modifier, déplacer
   des éléments, en ajouter en respectant évidemment le css du site" ; décisions : "les élèves du
   prof voient la version modifiée, les autres voient la version par défaut", "partage
   établissement", et les blocs non modifiés suivent les mises à jour du cours d'origine.

   Étape 1 (ce fichier) : réorganiser et masquer les blocs d'un onglet (Cours, Méthode,
   Exercices), revenir à l'original, publier la version pour tout l'établissement (référent).

   Principe : un onglet de chapitre est une suite plate d'éléments (encadrés, titres, figures,
   exemples...). On la découpe en BLOCS (une étiquette « Définition » / un titre d'exemple reste
   collé à l'élément qui le suit), chacun avec un identifiant stable : l'id de sa figure s'il en
   contient une, sinon une empreinte de son texte. Une version enregistrée n'est qu'une liste
   ordonnée d'identifiants (avec « masqué »). À l'affichage, on DÉPLACE les éléments réels (jamais
   de copie) : les figures interactives gardent leurs écouteurs et leur état. Un bloc que la
   version ne connaît pas (ajouté depuis au cours d'origine) se place juste après son voisin
   d'origine ; un bloc disparu est ignoré.

   Données : table cours_perso (versions « prof » et « etab »), lue via la fonction
   cours_versions (prof : sa version, sinon celle de l'établissement ; élève : celle d'un de ses
   professeurs, sinon celle de l'établissement).
   ============================================================ */

const CP_ATTACH_FORWARD = '.def-badge, .prop-badge, .example-title, .interaction-hint';
const CP_TABS = { cours: 'cours', methode: 'methode', exercices: 'exos' };
let cpCache = new Map();        // conteneur -> {layout, source, auteur} | null
let cpCurrentDemo = null;
let cpShowOriginal = false;     // un prof peut revoir le cours d'origine sans rien perdre
let cpEditing = null;

/* ---------- découpage en blocs ---------- */
function cpHash(s){
  let h = 5381;
  for(let i=0;i<s.length;i++) h = ((h<<5) + h + s.charCodeAt(i)) | 0;
  return (h>>>0).toString(36);
}
function cpText(node){
  const c = node.cloneNode(true);
  // Formules : leur source (identique avant et après le rendu KaTeX), pas le rendu.
  c.querySelectorAll('.tex').forEach(t=>{ t.textContent = t.dataset.texSource || t.textContent; });
  c.querySelectorAll('button, .gicon, .add-to-cahier-btn, .read-aloud-btn, .zoom-btn, .learn-btn, .lrn-bar, .katex').forEach(b=>b.remove());
  return (c.textContent||'').replace(/\s+/g,' ').trim();
}
function cpBlockId(nodes){
  for(const n of nodes){
    const withId = n.id ? n : n.querySelector('[id]');
    if(withId && withId.id) return 'i:'+withId.id;
  }
  const first = nodes[nodes.length-1];
  const cls = (first.className && typeof first.className==='string') ? first.className.trim().split(/\s+/)[0] : first.tagName.toLowerCase();
  return 't:'+cls+':'+cpHash(nodes.map(cpText).join(' ').slice(0,160));
}
/* Blocs d'un conteneur, dans l'ordre d'ORIGINE (calculés une seule fois, à la première
   ouverture, puis mémorisés : l'état des figures peut ensuite changer leur texte). */
function cpBlocks(container){
  if(container._cpBlocks){
    // Élément apparu depuis (ajout dynamique d'une figure) : rattaché au bloc qui le précède.
    const known = new Set(container._cpBlocks.flatMap(b=>b.nodes));
    [...container.children].forEach(el=>{
      if(known.has(el) || el.classList.contains('cp-eb')) return;
      let prev = el.previousElementSibling;
      while(prev && !known.has(prev)) prev = prev.previousElementSibling;
      const b = prev ? container._cpBlocks.find(x=>x.nodes.includes(prev)) : container._cpBlocks[0];
      if(b){ b.nodes.splice(b.nodes.indexOf(prev)+1, 0, el); known.add(el); }
    });
    return container._cpBlocks;
  }
  const blocks = [], seen = {};
  let pending = [];
  [...container.children].forEach(el=>{
    if(el.classList.contains('cp-eb')) return;
    pending.push(el);
    if(el.matches(CP_ATTACH_FORWARD)) return;
    blocks.push(pending); pending = [];
  });
  if(pending.length) blocks.push(pending);
  container._cpBlocks = blocks.map(nodes=>{
    let id = cpBlockId(nodes);
    seen[id] = (seen[id]||0)+1;
    if(seen[id]>1) id += '#'+seen[id];
    return {id, nodes};
  });
  return container._cpBlocks;
}
function cpBlockLabel(b){
  const main = b.nodes[b.nodes.length-1];
  const txt = b.nodes.map(cpText).join(' ');
  if(main.classList.contains('lesson-header') || main.classList.contains('sub-header')) return txt.slice(0,60);
  return txt.slice(0,60) + (txt.length>60 ? '…' : '');
}

/* ---------- application d'une version ---------- */
function cpOrder(blocks, layout){
  if(!layout || !Array.isArray(layout.blocks)) return blocks.map(b=>({b, hidden:false}));
  const byId = new Map(blocks.map(b=>[b.id,b]));
  const out = [], placed = new Set();
  layout.blocks.forEach(e=>{ const b = byId.get(e.id); if(b && !placed.has(b.id)){ out.push({b, hidden:!!e.h}); placed.add(b.id); } });
  // Blocs ajoutés depuis au cours d'origine : juste après leur voisin d'origine déjà placé.
  blocks.forEach((b,i)=>{
    if(placed.has(b.id)) return;
    let at = 0;
    for(let k=i-1;k>=0;k--){ const j = out.findIndex(o=>o.b.id===blocks[k].id); if(j>=0){ at = j+1; break; } }
    out.splice(at, 0, {b, hidden:false});
    placed.add(b.id);
  });
  return out;
}
function cpApply(container, layout){
  if(!container) return;
  const blocks = cpBlocks(container);
  cpOrder(blocks, layout).forEach(({b, hidden})=>{
    b.nodes.forEach(n=>{ container.appendChild(n); n.classList.toggle('cp-hidden', hidden); });
  });
}
function cpLayoutFromOrder(order){
  return {v:1, blocks: order.map(o=>o.hidden ? {id:o.b.id, h:1} : {id:o.b.id})};
}
function cpIsOriginal(blocks, layout){
  if(!layout) return true;
  const ord = cpOrder(blocks, layout);
  return ord.every((o,i)=>o.b===blocks[i] && !o.hidden);
}

/* ---------- chargement ---------- */
async function cpLoad(containers){
  const want = containers.filter(c=>!cpCache.has(c));
  if(want.length && typeof sb!=='undefined' && currentUser){
    try{
      const { data, error } = await sb.rpc('cours_versions', { p_containers: want });
      if(error) throw error;
      want.forEach(c=>cpCache.set(c, null));
      (data||[]).forEach(r=>cpCache.set(r.container, {layout:r.layout, source:r.source, auteur:r.auteur}));
    }catch(e){ console.warn('cours perso :', e); }
  }
}
function cpDemoContainers(demo){ return demo ? [demo.cours, demo.methode, demo.exos].filter(Boolean) : []; }
function cpIsStaff(){ return typeof currentUserRole!=='undefined' && (currentUserRole==='prof' || currentUserRole==='admin'); }

/* Appelée par openChapitre, une fois le chapitre affiché et ses figures initialisées. */
async function cpOnChapterOpen(demo){
  if(cpEditing) cpCancelEdit(true);
  cpCurrentDemo = demo;
  cpShowOriginal = false;
  const ids = cpDemoContainers(demo);
  if(!demo){ cpRenderBar(); return; }
  if(!currentUser){ ids.forEach(id=>cpApply(document.getElementById(id), null)); cpRenderBar(); return; }
  await cpLoad(ids);
  if(cpCurrentDemo!==demo) return; // un autre chapitre a été ouvert entre-temps
  ids.forEach(id=>{ const v = cpCache.get(id); cpApply(document.getElementById(id), v ? v.layout : null); });
  cpRenderBar();
}
function cpActiveContainerId(){
  const tab = document.querySelector('.tab-btn.active');
  const k = tab && CP_TABS[tab.dataset.tab];
  return (k && cpCurrentDemo) ? cpCurrentDemo[k] : null;
}

/* ---------- barre d'état / d'actions sous les onglets ---------- */
function cpRenderBar(){
  const bar = document.getElementById('cpBar');
  if(!bar) return;
  if(!cpCurrentDemo || cpEditing){ bar.style.display = cpEditing ? 'flex' : 'none'; if(!cpEditing) bar.innerHTML=''; return; }
  const cid = cpActiveContainerId();
  const v = cid ? cpCache.get(cid) : null;
  const staff = cpIsStaff();
  let html = '';
  if(v && !cpShowOriginal){
    const who = v.source==='moi' ? 'votre version' : v.source==='etab' ? 'version de l\'établissement' : ('version de ' + cpEsc(v.auteur||'votre professeur'));
    html += `<span class="cp-chip"><span class="gicon">tune</span> ${staff ? 'Cours personnalisé : ' + who : (v.source==='etab' ? 'Cours adapté par ton établissement' : 'Cours adapté par ton professeur')}</span>`;
    if(staff) html += `<button type="button" class="cp-link" onclick="cpToggleOriginal()">Voir le cours d'origine</button>`;
  } else if(v && cpShowOriginal){
    html += `<span class="cp-chip cp-chip-orig"><span class="gicon">visibility</span> Cours d'origine</span><button type="button" class="cp-link" onclick="cpToggleOriginal()">Revenir à ${v.source==='moi' ? 'ma version' : 'la version personnalisée'}</button>`;
  }
  if(staff && cid){
    html += `<button type="button" class="btn secondary cp-btn" onclick="cpStartEdit()"><span class="gicon">edit_note</span> Personnaliser cet onglet</button>`;
  }
  bar.innerHTML = html;
  bar.style.display = html ? 'flex' : 'none';
}
function cpEsc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function cpToggleOriginal(){
  cpShowOriginal = !cpShowOriginal;
  cpDemoContainers(cpCurrentDemo).forEach(id=>{ const v = cpCache.get(id); cpApply(document.getElementById(id), (v && !cpShowOriginal) ? v.layout : null); });
  cpRenderBar();
}
document.addEventListener('click', e=>{
  const t = e.target.closest && e.target.closest('.tab-btn');
  if(!t) return;
  if(cpEditing){
    if(cpEditing.dirty && !confirm('Changer d\'onglet abandonne la personnalisation en cours. Continuer ?')){ e.stopPropagation(); e.preventDefault(); return; }
    cpCancelEdit(true);
  }
  setTimeout(cpRenderBar, 0);
}, true);

/* ---------- éditeur ---------- */
function cpStartEdit(){
  const cid = cpActiveContainerId();
  const container = cid && document.getElementById(cid);
  if(!container) return;
  if(typeof lrnState!=='undefined' && lrnState && typeof lrnStop==='function') lrnStop();
  if(cpShowOriginal){ cpShowOriginal = false; }
  const v = cpCache.get(cid);
  const blocks = cpBlocks(container);
  const order = cpOrder(blocks, v ? v.layout : null); // part de la version en vigueur (la sienne ou celle de l'établissement)
  cpEditing = { cid, container, before: order.map(o=>({b:o.b, hidden:o.hidden})), dirty:false };
  container.classList.add('cp-edit-mode');
  order.forEach(({b, hidden})=>{
    const w = document.createElement('div');
    w.className = 'cp-eb' + (hidden ? ' cp-eb-hidden' : '');
    const main = b.nodes[b.nodes.length-1];
    if(main.classList.contains('lesson-header')) w.classList.add('cp-eb-h1');
    else if(main.classList.contains('sub-header')) w.classList.add('cp-eb-h2');
    w.dataset.id = b.id;
    w._cpBlock = b;
    w.innerHTML = `<div class="cp-eb-ctl">
        <span class="cp-eb-handle" draggable="true" title="Glisser pour déplacer"><span class="gicon">drag_indicator</span></span>
        <button type="button" title="Monter" onclick="cpMove(this,-1)"><span class="gicon">arrow_upward</span></button>
        <button type="button" title="Descendre" onclick="cpMove(this,1)"><span class="gicon">arrow_downward</span></button>
        <button type="button" class="cp-eye" title="${hidden ? 'Afficher ce bloc' : 'Masquer ce bloc pour mes élèves'}" onclick="cpToggleHide(this)"><span class="gicon">${hidden ? 'visibility_off' : 'visibility'}</span></button>
      </div><div class="cp-eb-body"></div>`;
    container.appendChild(w);
    const body = w.querySelector('.cp-eb-body');
    b.nodes.forEach(n=>{ n.classList.remove('cp-hidden'); body.appendChild(n); });
    const h = w.querySelector('.cp-eb-handle');
    h.addEventListener('dragstart', ev=>{ cpEditing.drag = w; w.classList.add('cp-drag'); ev.dataTransfer.effectAllowed = 'move'; try{ ev.dataTransfer.setData('text/plain', b.id); ev.dataTransfer.setDragImage(w, 20, 20); }catch(e){} });
    h.addEventListener('dragend', ()=>{ w.classList.remove('cp-drag'); if(cpEditing) cpEditing.drag = null; });
    w.addEventListener('dragover', ev=>{
      const d = cpEditing && cpEditing.drag;
      if(!d || d===w) return;
      ev.preventDefault();
      const r = w.getBoundingClientRect();
      const after = ev.clientY > r.top + r.height/2;
      if(after ? w.nextElementSibling!==d : w.previousElementSibling!==d){ container.insertBefore(d, after ? w.nextSibling : w); cpEditing.dirty = true; }
    });
    w.addEventListener('drop', ev=>ev.preventDefault());
  });
  cpRenderEditBar();
  container.scrollIntoView({behavior:'smooth', block:'start'});
}
function cpMove(btn, dir){
  const w = btn.closest('.cp-eb');
  const sib = dir<0 ? w.previousElementSibling : w.nextElementSibling;
  if(!sib || !sib.classList.contains('cp-eb')) return;
  w.parentNode.insertBefore(w, dir<0 ? sib : sib.nextSibling);
  cpEditing.dirty = true;
  w.scrollIntoView({block:'nearest', behavior:'smooth'});
  w.classList.add('cp-flash'); setTimeout(()=>w.classList.remove('cp-flash'), 500);
}
function cpToggleHide(btn){
  const w = btn.closest('.cp-eb');
  const h = w.classList.toggle('cp-eb-hidden');
  btn.innerHTML = `<span class="gicon">${h ? 'visibility_off' : 'visibility'}</span>`;
  btn.title = h ? 'Afficher ce bloc' : 'Masquer ce bloc pour mes élèves';
  cpEditing.dirty = true;
}
function cpEditOrder(){
  return [...cpEditing.container.querySelectorAll(':scope > .cp-eb')].map(w=>({b:w._cpBlock, hidden:w.classList.contains('cp-eb-hidden')}));
}
/* Démonte l'édition : les éléments reprennent leur place à plat, dans l'ordre donné. */
function cpUnwrap(order){
  const c = cpEditing.container;
  order.forEach(({b, hidden})=>b.nodes.forEach(n=>{ c.appendChild(n); n.classList.toggle('cp-hidden', hidden); }));
  c.querySelectorAll(':scope > .cp-eb').forEach(w=>w.remove());
  c.classList.remove('cp-edit-mode');
}
function cpRenderEditBar(){
  const bar = document.getElementById('cpBar');
  const v = cpCache.get(cpEditing.cid);
  const referent = typeof currentReferentEtab!=='undefined' && currentReferentEtab && currentReferentEtab.uai;
  bar.innerHTML = `
    <span class="cp-chip cp-chip-edit"><span class="gicon">edit_note</span> Personnalisation</span>
    <span class="hint" style="margin:0;flex:1;min-width:220px;">Glissez un bloc par sa poignée (ou flèches) pour le déplacer ; l'œil le masque pour vos élèves. Les figures restent interactives.</span>
    <button type="button" class="btn" onclick="cpSaveEdit()"><span class="gicon">save</span> Enregistrer</button>
    <button type="button" class="btn secondary" onclick="cpCancelEdit()">Annuler</button>
    ${v && v.source==='moi' ? '<button type="button" class="btn secondary" onclick="cpResetMine()"><span class="gicon">restart_alt</span> Revenir au cours d\'origine</button>' : ''}
    ${referent ? '<button type="button" class="btn secondary" onclick="cpPublishEtab()"><span class="gicon">domain</span> Enregistrer et publier pour l\'établissement</button>' : ''}
    <span class="hint" id="cpMsg" style="margin:0;width:100%;"></span>`;
  bar.style.display = 'flex';
}
function cpSay(msg, err){ const m = document.getElementById('cpMsg'); if(m){ m.textContent = msg; m.style.color = err ? '#B3261E' : ''; } }
function cpCancelEdit(silent){
  if(!cpEditing) return;
  if(!silent && cpEditing.dirty && !confirm('Abandonner les modifications en cours ?')) return;
  cpUnwrap(cpEditing.before);
  cpEditing = null;
  cpRenderBar();
}
async function cpSaveEdit(publishEtab){
  if(!cpEditing) return;
  const order = cpEditOrder();
  const { cid, container } = cpEditing;
  const blocks = cpBlocks(container);
  const layout = cpLayoutFromOrder(order);
  const original = order.every((o,i)=>o.b===blocks[i] && !o.hidden);
  cpSay('Enregistrement…');
  try{
    // Sa propre version : supprimée si elle redevient identique à l'original (le cours suit
    // alors toutes les mises à jour), sinon créée ou remplacée.
    const { data: mine } = await sb.from('cours_perso').select('id').eq('scope','prof').eq('owner_id', currentUser.id).eq('container', cid).maybeSingle();
    if(original){
      if(mine) await sb.from('cours_perso').delete().eq('id', mine.id);
    } else if(mine){
      const { error } = await sb.from('cours_perso').update({ layout, updated_at: new Date().toISOString() }).eq('id', mine.id);
      if(error) throw error;
    } else {
      const { error } = await sb.from('cours_perso').insert({ scope:'prof', owner_id: currentUser.id, container: cid, layout });
      if(error) throw error;
    }
    if(publishEtab){
      const uai = currentReferentEtab.uai;
      const { data: et } = await sb.from('cours_perso').select('id').eq('scope','etab').eq('uai', uai).eq('container', cid).maybeSingle();
      if(original){ if(et) await sb.from('cours_perso').delete().eq('id', et.id); }
      else if(et){ const { error } = await sb.from('cours_perso').update({ layout, owner_id: currentUser.id, updated_at: new Date().toISOString() }).eq('id', et.id); if(error) throw error; }
      else { const { error } = await sb.from('cours_perso').insert({ scope:'etab', owner_id: currentUser.id, uai, container: cid, layout }); if(error) throw error; }
    }
  }catch(e){ cpSay('Enregistrement impossible : ' + (e.message||e), true); return; }
  cpUnwrap(order);
  cpEditing = null;
  cpCache.delete(cid);
  await cpLoad([cid]);
  const v = cpCache.get(cid);
  cpApply(container, v ? v.layout : null);
  cpRenderBar();
  cpToast(publishEtab ? (original ? 'Cours d\'origine rétabli pour vous et pour l\'établissement.' : 'Enregistré et publié pour tout l\'établissement.')
    : (original ? 'Cours d\'origine rétabli.' : 'Enregistré : vos élèves verront cette version.'));
}
function cpPublishEtab(){ return cpSaveEdit(true); }
async function cpResetMine(){
  if(!cpEditing) return;
  if(!confirm('Supprimer votre version de cet onglet et revenir au cours d\'origine ?')) return;
  const cid = cpEditing.cid;
  try{ await sb.from('cours_perso').delete().eq('scope','prof').eq('owner_id', currentUser.id).eq('container', cid); }
  catch(e){ cpSay('Suppression impossible : ' + (e.message||e), true); return; }
  cpUnwrap(cpBlocks(cpEditing.container).map(b=>({b, hidden:false})));
  const container = cpEditing.container;
  cpEditing = null;
  cpCache.delete(cid);
  await cpLoad([cid]);
  const v = cpCache.get(cid);
  cpApply(container, v ? v.layout : null);
  cpRenderBar();
  cpToast(v ? 'Votre version est supprimée : la version de l\'établissement s\'applique.' : 'Cours d\'origine rétabli.');
}
function cpToast(msg){
  const t = document.createElement('div');
  t.className = 'cp-toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.classList.add('cp-toast-out'), 2600);
  setTimeout(()=>t.remove(), 3200);
}
/* Changement de compte (connexion / déconnexion) : les versions en cache ne valent plus. */
function cpOnAuthChange(){
  cpCache = new Map();
  if(cpEditing) cpCancelEdit(true);
  if(cpCurrentDemo) cpOnChapterOpen(cpCurrentDemo);
}

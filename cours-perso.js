/* ============================================================
   COURS PERSONNALISÉS -- demandé : "un prof puisse s'attribuer les cours, les modifier, déplacer
   des éléments, en ajouter en respectant évidemment le css du site" ; décisions : "les élèves du
   prof voient la version modifiée, les autres voient la version par défaut", "partage
   établissement", et les blocs non modifiés suivent les mises à jour du cours d'origine.

   Étape 1 : réorganiser et masquer les blocs d'un onglet (Cours, Méthode, Exercices), revenir à
   l'original, publier la version pour tout l'établissement (référent).
   Étape 2 : ajouter ses propres blocs (paragraphe, définition, propriété, règle, remarque,
   exemple, titre de paragraphe, sous-titre), rendus avec les classes du site. Leur contenu est
   stocké dans la version elle-même ({id:'u:…', add:{k, l, x}}) ; le texte est TOUJOURS échappé,
   seules deux notations sont interprétées : **gras** et $formule$ (KaTeX). Les numéros des
   paragraphes (1, 2, 3…) et des sous-parties (A, B, C…) sont recalculés dans une version
   personnalisée ; les lettres de méthode (M) ne sont pas touchées.
   Étape 3 : modifier le texte d'un bloc d'origine ({id:<id d'origine>, rep:{k, l, x}}). Le bloc
   d'origine reste dans la page, masqué (on peut le rétablir) ; sa version réécrite prend sa
   place. Seuls les blocs de texte sont modifiables (titres, définitions, propriétés, règles,
   remarques, exemples, paragraphes, listes) : un bloc qui contient une figure, un tableau ou
   un élément interactif ne l'est pas. Si le cours d'origine change ensuite ce bloc, la version
   réécrite par le professeur est conservée (et le nouveau texte d'origine apparaît à côté).

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
      if(known.has(el) || el.classList.contains('cp-eb') || el.classList.contains('cp-form') || el.classList.contains('cp-add-top') || el.dataset.cpCustom) return;
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
function cpOrder(container, layout){
  const blocks = cpBlocks(container);
  if(!layout || !Array.isArray(layout.blocks)) return blocks.map(b=>({b, hidden:false}));
  const byId = new Map(blocks.map(b=>[b.id,b]));
  const out = [], placed = new Set();
  layout.blocks.forEach(e=>{
    const b = e.add ? (typeof e.id==='string' && e.id.startsWith('u:') ? cpCustomBlock(container, e.id, e.add, null) : null)
      : e.rep ? cpCustomBlock(container, e.id, e.rep, byId.get(e.id) || null)
      : byId.get(e.id);
    if(b && !placed.has(b.id)){ out.push({b, hidden:!!e.h}); placed.add(b.id); }
  });
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
  const order = cpOrder(container, layout);
  // Blocs ajoutés qui ne font plus partie de la version affichée : retirés.
  const reg = cpRegistry(container), keep = new Set(order.map(o=>o.b));
  reg.forEach((b, id)=>{ if(!keep.has(b)){ b.nodes.forEach(n=>n.remove()); reg.delete(id); } });
  order.forEach(({b, hidden})=>{
    b.nodes.forEach(n=>{ container.appendChild(n); n.classList.toggle('cp-hidden', hidden); });
    if(b.orig) b.orig.nodes.forEach(n=>{ container.appendChild(n); n.classList.add('cp-hidden'); }); // texte d'origine d'un bloc réécrit
  });
  cpRenumber(container, !!layout);
  // Boutons « + Cahier » des blocs ajoutés/réécrits : état selon le compte (masqués pour un élève).
  if(reg.size && typeof updateCourseAddButtonsState==='function') updateCourseAddButtonsState();
}
function cpLayoutFromOrder(order){
  return {v:1, blocks: order.map(o=>{
    const e = {id:o.b.id};
    if(o.b.custom) e[o.b.orig!==undefined ? 'rep' : 'add'] = o.b.custom;
    if(o.hidden) e.h = 1;
    return e;
  })};
}
function cpIsOriginalOrder(container, order){
  const blocks = cpBlocks(container);
  return order.length===blocks.length && order.every((o,i)=>o.b===blocks[i] && !o.hidden);
}

/* Numérotation : 1, 2, 3… pour les paragraphes, A, B, C… (remis à zéro à chaque paragraphe)
   pour les sous-parties, dans l'ordre affiché et sans compter les blocs masqués. Les lettres
   hors de cette suite (M = méthode) restent telles quelles. Sans version personnalisée
   (active=false), les numéros d'origine sont remis. */
function cpRenumber(container, active){
  const hs = [...container.querySelectorAll('.lesson-header, .sub-header')]
    .filter(h=>h.parentElement===container || h.parentElement.classList.contains('cp-eb-body'));
  let n = 0, l = 0;
  hs.forEach(h=>{
    const span = h.querySelector(':scope > .num, :scope > .letter');
    if(!span) return;
    if(span.dataset.cpOrig===undefined) span.dataset.cpOrig = span.textContent;
    const orig = span.dataset.cpOrig;
    if(!active){ span.textContent = orig; return; }
    const hidden = h.classList.contains('cp-hidden') || h.closest('.cp-eb-hidden');
    if(h.classList.contains('lesson-header')){
      if(!/^\d*$/.test(orig) || hidden) return;
      span.textContent = String(++n); l = 0;
    } else {
      if(!/^[A-L]?$/.test(orig) || hidden) return;
      span.textContent = String.fromCharCode(65 + l++);
    }
  });
}

/* ---------- blocs ajoutés par le professeur ---------- */
const CP_KINDS = {
  p:      { nom:'Paragraphe', icon:'notes' },
  def:    { nom:'Définition', icon:'menu_book', badge:'def-badge', label:'Définition' },
  prop:   { nom:'Propriété', icon:'verified', badge:'prop-badge', label:'Propriété' },
  regle:  { nom:'Règle', icon:'rule', badge:'prop-badge', label:'Règle' },
  box:    { nom:'Encadré', icon:'crop_square' },
  hint:   { nom:'Remarque', icon:'info', label:'Remarque' },
  ex:     { nom:'Exemple', icon:'lightbulb', label:'Exemple' },
  h1:     { nom:'Titre de paragraphe', icon:'title', titleOnly:true },
  h2:     { nom:'Sous-titre', icon:'format_size', titleOnly:true },
};
const CP_MAX_TEXT = 3000;
function cpRegistry(container){ return container._cpCustom || (container._cpCustom = new Map()); }
/* Bloc ajouté (orig === undefined) ou réécrit (orig = bloc d'origine, ou null s'il a disparu). */
function cpCustomBlock(container, id, spec, orig){
  if(!spec || !CP_KINDS[spec.k] || typeof id!=='string') return null;
  const reg = cpRegistry(container), key = JSON.stringify(spec), old = reg.get(id);
  if(old && old.key===key){ if(orig!==null || old.orig!==undefined) old.orig = orig; return old; }
  if(old) old.nodes.forEach(n=>n.remove());
  const b = cpBuildBlock(id, spec, container);
  if(orig!==null || id.indexOf('u:')!==0) b.orig = orig;
  reg.set(id, b);
  return b;
}

/* ---------- réécriture d'un bloc d'origine ---------- */
const CP_INLINE_OK = new Set(['P','BR','STRONG','B','EM','I','U','SPAN','UL','OL','LI','SUP','SUB','SMALL']);
const CP_SUP = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','+':'⁺','-':'⁻'};
const CP_SUB = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
/* Contenu HTML d'origine -> notation simple (**gras**, $formule$, « - » listes). Renvoie null
   si le contenu comporte autre chose que du texte mis en forme (figure, tableau, bouton...). */
function cpToMarkup(el){
  const c = el.cloneNode(true);
  c.querySelectorAll('.add-to-cahier-btn, .read-aloud-btn, .zoom-btn, .learn-btn, .lrn-bar').forEach(b=>b.remove());
  let ok = true;
  const walk = n=>{
    if(n.nodeType===3) return n.nodeValue.replace(/\s+/g,' ');
    if(n.nodeType!==1) return '';
    if(n.classList.contains('tex')) return '$' + (n.dataset.texSource || n.textContent).trim() + '$';
    if(n.classList.contains('katex')){
      const a = n.querySelector('annotation[encoding="application/x-tex"]');
      if(a) return '$' + a.textContent.trim() + '$';
      ok = false; return '';
    }
    if(!CP_INLINE_OK.has(n.tagName) || n.id || n.hasAttribute('onclick')){ ok = false; return ''; }
    // Un <span> à classe (compteur de jeu, surlignage...) peut être piloté par le script du chapitre.
    if(n.tagName==='SPAN' && [...n.classList].some(c=>!/^(lrn|katex)/.test(c))){ ok = false; return ''; }
    const inner = ()=>[...n.childNodes].map(walk).join('');
    switch(n.tagName){
      case 'BR': return '\n';
      case 'STRONG': case 'B': { const t = inner(); return t.trim() ? '**' + t.trim() + '**' + (/\s$/.test(t) ? ' ' : '') : t; }
      case 'P': return '\n\n' + inner().trim() + '\n\n';
      case 'UL': case 'OL': return '\n\n' + [...n.children].map(li=>{
        if(li.tagName!=='LI' || li.querySelector('ul, ol, p')){ ok = false; return ''; } // sous-liste : non gérée
        // Retour à la ligne dans un élément de liste : ligne de suite, indentée de deux espaces.
        return '- ' + [...li.childNodes].map(walk).join('').trim().split('\n').map(x=>x.trim()).filter(Boolean).join('\n  ');
      }).join('\n') + '\n\n';
      case 'SUP': case 'SUB': {
        const t = inner(), map = n.tagName==='SUP' ? CP_SUP : CP_SUB;
        if([...t].every(ch=>map[ch])) return [...t].map(ch=>map[ch]).join('');
        ok = false; return t;
      }
      default: return inner();
    }
  };
  const txt = [...c.childNodes].map(walk).join('');
  if(!ok) return null;
  return txt.split('\n').map(x=>/^ {2}\S/.test(x) ? '  ' + x.trim() : x.trim()).join('\n').replace(/\n{3,}/g,'\n\n').trim();
}
/* Bloc d'origine -> {k, l, x} pour le formulaire, ou null s'il n'est pas modifiable. */
function cpSpecFromBlock(b){
  const ns = b.nodes, first = ns[0], last = ns[ns.length-1];
  const is = (n, cls)=>n.classList.contains(cls);
  if(ns.some(n=>n.id || n.hasAttribute('onclick') || n.querySelector('[id], [onclick], svg, canvas, img, input, select, textarea, table, iframe'))) return null;
  const titleOf = (h, sel)=>{ const t = h.querySelector(sel); return t ? cpToMarkup(t) : null; };
  if(ns.length===1 && is(first,'lesson-header')){ const l = titleOf(first,'h3'); return l ? {k:'h1', l} : null; }
  if(ns.length===1 && is(first,'sub-header')){ const l = titleOf(first,'h4'); return l ? {k:'h2', l} : null; }
  if(ns.length===2 && (is(first,'def-badge') || is(first,'prop-badge')) && is(last,'def-box')){
    const l = first.textContent.trim(), x = cpToMarkup(last);
    if(x===null) return null;
    return {k: is(first,'def-badge') ? 'def' : (/^r[èe]gle/i.test(l) ? 'regle' : 'prop'), l, x};
  }
  if(ns.length===1 && is(first,'def-box')){ const x = cpToMarkup(first); return x!==null ? {k:'box', x} : null; }
  const plain = n=>(n.tagName==='P' && (!n.className || n.className==='hint')) || (n.tagName==='UL' && (!n.className || is(n,'example-list')));
  const textOf = n=>{ if(n.tagName==='P') return cpToMarkup(n); const d = document.createElement('div'); d.appendChild(n.cloneNode(true)); return cpToMarkup(d); };
  if(is(first,'example-title')){
    if(!ns.slice(1).every(plain)) return null;
    const t = cpToMarkup(first); if(t===null) return null;
    const rest = ns.slice(1).map(textOf);
    if(rest.some(x=>x===null)) return null;
    const x = rest.join('\n\n').trim();
    if(/^exemple\s*:?$/i.test(t.trim())) return {k:'ex', l:'', x};
    if(/^exemple\s*:/i.test(t)) return {k:'ex', l:t.replace(/^exemple\s*:\s*/i, ''), x};
    return {k:'ex', l:t, x, np:1}; // titre à garder tel quel (« Contre-exemple : … », « Arrondir un nombre »…)
  }
  if(ns.length===1 && first.tagName==='P' && is(first,'hint')){
    const x = cpToMarkup(first); if(x===null) return null;
    const m = x.match(/^(remarque[^:]{0,20})\s*:\s*([\s\S]*)$/i);
    return m ? {k:'hint', l:m[1].trim(), x:m[2].trim()} : {k:'hint', l:'', x, np:1};
  }
  if(ns.every(plain)){
    const parts = ns.map(textOf);
    if(parts.some(x=>x===null)) return null;
    return ns.some(n=>is(n,'example-list')) ? {k:'ex', l:'', x:parts.join('\n\n'), np:1} : {k:'p', x:parts.join('\n\n')};
  }
  return null;
}
function cpBuildBlock(id, spec, container){
  const holder = document.createElement('div');
  holder.innerHTML = cpRenderSpec(spec);
  const nodes = [...holder.children];
  nodes.forEach(n=>{ n.dataset.cpCustom = '1'; });
  // Mêmes boutons que le cours d'origine (+ Cahier, écouter, loupe, apprentissage).
  const isExos = container && cpCurrentDemo && container.id===cpCurrentDemo.exos;
  try{
    if(isExos){ if(typeof injectZoomButtons==='function') injectZoomButtons(holder); }
    else if(typeof injectCourseAddButtons==='function') injectCourseAddButtons(holder);
  }catch(err){ console.warn(err); }
  return { id, nodes:[...holder.children], custom:spec, key:JSON.stringify(spec) };
}
/* Texte du professeur -> HTML : tout est échappé, puis **gras**, $formule$, listes (« - »),
   retours à la ligne. */
function cpMath(src){
  const esc = cpEsc(src);
  let html;
  try{ html = katex.renderToString(src, {throwOnError:false}); }catch(e){ html = esc; }
  return `<span class="tex" data-tex-source="${esc}" data-rendered="1">${html}</span>`;
}
function cpInline(line){
  const parts = line.split(/(\$[^$\n]+\$)/g);
  return parts.map(part=>{
    if(/^\$[^$\n]+\$$/.test(part)) return cpMath(part.slice(1,-1));
    return cpEsc(part).replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  }).join('');
}
/* Paragraphes séparés par une ligne vide ; lignes « - … » regroupées en liste. */
function cpRich(text, listClass){
  const out = [];
  String(text||'').replace(/\r/g,'').split(/\n\s*\n/).forEach(par=>{
    const lines = par.split('\n').filter(x=>x.trim()!=='');
    let buf = [], list = [];
    const flushText = ()=>{ if(buf.length){ out.push('<p>' + buf.map(cpInline).join('<br>') + '</p>'); buf = []; } };
    const flushList = ()=>{ if(list.length){ out.push(`<ul class="${listClass||'cp-list'}">` + list.map(x=>'<li>'+x.split('\n').map(cpInline).join('<br>')+'</li>').join('') + '</ul>'); list = []; } };
    lines.forEach(x=>{
      const m = x.match(/^\s*[-•]\s+(.*)$/);
      if(m){ flushText(); list.push(m[1]); }
      else if(list.length && /^\s{2,}\S/.test(x)) list[list.length-1] += '\n' + x.trim(); // suite de l'élément (retour à la ligne)
      else { flushList(); buf.push(x.trim()); }
    });
    flushText(); flushList();
  });
  return out;
}
function cpRenderSpec(spec){
  const K = CP_KINDS[spec.k], label = (spec.l||'').trim(), x = spec.x||'';
  switch(spec.k){
    case 'h1': return `<div class="lesson-header"><span class="num"></span><h3>${cpInline(label||'Nouveau paragraphe')}</h3></div>`;
    case 'h2': return `<div class="sub-header"><span class="letter"></span><h4>${cpInline(label||'Nouvelle partie')}</h4></div>`;
    case 'def': case 'prop': case 'regle':
      return `<span class="${K.badge}">${cpEsc(label||K.label)}</span><div class="def-box cp-rich">${cpRich(x).join('')}</div>`;
    case 'box': return `<div class="def-box cp-rich">${cpRich(x).join('')}</div>`;
    case 'hint': {
      const pars = cpRich(x);
      const lead = label ? `${cpEsc(label)} : ` : (spec.np ? '' : `${K.label} : `);
      return `<div class="hint cp-rich cp-hint">${pars.length ? pars[0].replace(/^<p>/, '<p>'+lead) + pars.slice(1).join('') : '<p>'+lead+'</p>'}</div>`;
    }
    case 'ex': {
      const title = spec.np ? (label ? cpInline(label) : '') : label ? (/^exemple/i.test(label) ? cpInline(label) : 'Exemple : ' + cpInline(label)) : 'Exemple :';
      return (title ? `<p class="example-title">${title}</p>` : '') + `<div class="cp-rich cp-example">${cpRich(x, 'example-list').join('')}</div>`;
    }
    default: return `<div class="cp-rich cp-par">${cpRich(x).join('')}</div>`;
  }
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
  const order = cpOrder(container, v ? v.layout : null); // part de la version en vigueur (la sienne ou celle de l'établissement)
  cpEditing = { cid, container, before: order.map(o=>({b:o.b, hidden:o.hidden})), dirty:false };
  container.classList.add('cp-edit-mode');
  const top = document.createElement('button');
  top.type = 'button'; top.className = 'cp-add-top';
  top.innerHTML = '<span class="gicon">add</span> Ajouter un bloc au début';
  top.onclick = ()=>cpOpenForm(null, top);
  container.appendChild(top);
  order.forEach(({b, hidden})=>{
    container.appendChild(cpMakeWrapper(b, hidden));
  });
  cpRenumber(container, true);
  cpRenderEditBar();
  container.scrollIntoView({behavior:'smooth', block:'start'});
}
function cpMakeWrapper(b, hidden){
  const container = cpEditing.container;
  const w = document.createElement('div');
  const rewritten = !!b.custom && b.orig!==undefined, added = !!b.custom && !rewritten;
  const editable = !b.custom && cpSpecFromBlock(b)!==null;
  w.className = 'cp-eb' + (hidden ? ' cp-eb-hidden' : '') + (b.custom ? ' cp-eb-custom' : '');
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
      <button type="button" class="cp-add" title="Ajouter un bloc juste après" onclick="cpOpenForm(null, this.closest('.cp-eb'))"><span class="gicon">add</span></button>
      ${b.custom || editable ? `<button type="button" title="${editable ? 'Modifier le texte de ce bloc' : 'Modifier ce bloc'}" onclick="cpOpenForm(this.closest('.cp-eb'))"><span class="gicon">edit</span></button>` : ''}
      ${added ? `<button type="button" class="cp-del" title="Supprimer ce bloc" onclick="cpDeleteBlock(this)"><span class="gicon">delete</span></button>` : ''}
      ${rewritten && b.orig ? `<button type="button" class="cp-restore" title="Rétablir le texte d'origine" onclick="cpRestoreOrig(this)"><span class="gicon">undo</span></button>` : ''}
    </div><div class="cp-eb-body">${added ? '<span class="cp-mine-tag">Ajouté par vous</span>' : rewritten ? '<span class="cp-mine-tag cp-rew-tag">Texte modifié par vous</span>' : ''}</div>`;
  const body = w.querySelector('.cp-eb-body');
  b.nodes.forEach(n=>{ n.classList.remove('cp-hidden'); body.appendChild(n); });
  const h = w.querySelector('.cp-eb-handle');
  h.addEventListener('dragstart', ev=>{ cpEditing.drag = w; w.classList.add('cp-drag'); ev.dataTransfer.effectAllowed = 'move'; try{ ev.dataTransfer.setData('text/plain', b.id); ev.dataTransfer.setDragImage(w, 20, 20); }catch(e){} });
  h.addEventListener('dragend', ()=>{ w.classList.remove('cp-drag'); if(cpEditing){ cpEditing.drag = null; cpRenumber(container, true); } });
  w.addEventListener('dragover', ev=>{
    const d = cpEditing && cpEditing.drag;
    if(!d || d===w) return;
    ev.preventDefault();
    const r = w.getBoundingClientRect();
    const after = ev.clientY > r.top + r.height/2;
    if(after ? w.nextElementSibling!==d : w.previousElementSibling!==d){ container.insertBefore(d, after ? w.nextSibling : w); cpEditing.dirty = true; }
  });
  w.addEventListener('drop', ev=>ev.preventDefault());
  return w;
}
function cpRestoreOrig(btn){
  const w = btn.closest('.cp-eb'), b = w._cpBlock;
  if(!b.orig) return;
  cpCloseForm();
  const nw = cpMakeWrapper(b.orig, w.classList.contains('cp-eb-hidden'));
  w.replaceWith(nw);
  cpEditing.dirty = true;
  cpRenumber(cpEditing.container, true);
  nw.classList.add('cp-flash'); setTimeout(()=>nw.classList.remove('cp-flash'), 700);
}
function cpDeleteBlock(btn){
  const w = btn.closest('.cp-eb');
  if(!confirm('Supprimer ce bloc ?')) return;
  w.remove();
  cpEditing.dirty = true;
  cpRenumber(cpEditing.container, true);
}

/* Formulaire d'ajout (après `anchor`, ou au début) ou de modification (`editW`). */
function cpOpenForm(editW, anchor){
  cpCloseForm();
  const eb = editW ? editW._cpBlock : null;
  // Bloc d'origine pas encore réécrit : formulaire pré-rempli avec son texte.
  const fromOrig = eb && !eb.custom ? cpSpecFromBlock(eb) : null;
  const spec = eb ? (eb.custom || fromOrig) : { k:'p', l:'', x:'' };
  if(!spec) return;
  const origBlock = eb ? (eb.custom ? eb.orig : eb) : undefined; // undefined = bloc ajouté
  const f = document.createElement('div');
  f.className = 'cp-form';
  f._edit = editW || null;
  f.innerHTML = `
    <div class="cp-form-title">${!eb ? 'Nouveau bloc' : origBlock!==undefined ? 'Modifier le texte du bloc' : 'Modifier le bloc'}</div>
    ${origBlock!==undefined ? '<p class="hint" style="margin:-4px 0 10px;">Le texte d\'origine est conservé : le bouton <span class="gicon" style="font-size:1em;vertical-align:-2px;">undo</span> le rétablit à tout moment.</p>' : ''}
    <div class="cp-kinds">${Object.entries(CP_KINDS).map(([k,K])=>`<button type="button" data-k="${k}" class="${k===spec.k?'on':''}"><span class="gicon">${K.icon}</span> ${K.nom}</button>`).join('')}</div>
    <label class="cp-f-label"><span></span><input type="text" maxlength="160"></label>
    <div class="cp-f-textwrap">
      <div class="cp-tools">
        <button type="button" data-t="b" title="Gras : **texte**"><span class="gicon">format_bold</span></button>
        <button type="button" data-t="m" title="Formule : $\\frac{3}{4}$"><span class="gicon">function</span></button>
        <button type="button" data-t="l" title="Liste : une ligne par élément, commençant par « - »"><span class="gicon">format_list_bulleted</span></button>
        <span class="hint" style="margin:0;">**gras** · $formule$ (ex. $\\frac{3}{4}$, $3 \\times 5$) · « - » en début de ligne pour une liste · ligne vide = nouveau paragraphe</span>
      </div>
      <textarea rows="5" maxlength="${CP_MAX_TEXT}"></textarea>
    </div>
    <div class="cp-f-prevlabel">Aperçu (tel que le verront vos élèves)</div>
    <div class="cp-f-preview"></div>
    <div class="cp-f-actions">
      <button type="button" class="btn cp-f-ok"><span class="gicon">check</span> ${editW ? 'Valider' : 'Ajouter'}</button>
      <button type="button" class="btn secondary cp-f-cancel">Annuler</button>
      <span class="hint cp-f-msg" style="margin:0;"></span>
    </div>`;
  const input = f.querySelector('input'), ta = f.querySelector('textarea');
  input.value = spec.l || ''; ta.value = spec.x || '';
  let kind = spec.k;
  const refresh = ()=>{
    const K = CP_KINDS[kind];
    f.querySelectorAll('.cp-kinds button').forEach(b=>b.classList.toggle('on', b.dataset.k===kind));
    f.querySelector('.cp-f-label span').textContent = K.titleOnly ? 'Titre' : (K.label ? 'Étiquette (facultatif)' : 'Titre (facultatif, non affiché)');
    f.querySelector('.cp-f-label').style.display = (kind==='p' || kind==='box') ? 'none' : '';
    input.placeholder = K.titleOnly ? 'ex. Le cercle' : kind==='ex' ? 'ex. calculer une longueur' : (K.label ? 'ex. ' + K.label + ' 3' : '');
    f.querySelector('.cp-f-textwrap').style.display = K.titleOnly ? 'none' : '';
    const prev = f.querySelector('.cp-f-preview');
    prev.innerHTML = cpRenderSpec(Object.assign({ k:kind, l:input.value, x:ta.value }, spec.np && kind===spec.k ? {np:1} : {}));
    const num = prev.querySelector('.num'), let_ = prev.querySelector('.letter');
    if(num) num.textContent = '#'; if(let_) let_.textContent = '#';
  };
  f.querySelectorAll('.cp-kinds button').forEach(b=>b.onclick = ()=>{ kind = b.dataset.k; refresh(); });
  input.oninput = refresh; ta.oninput = refresh;
  f.querySelectorAll('.cp-tools button').forEach(b=>b.onclick = ()=>{
    const s = ta.selectionStart, e = ta.selectionEnd, sel = ta.value.slice(s, e);
    let ins, caret;
    if(b.dataset.t==='b'){ ins = '**' + (sel||'texte') + '**'; caret = s + 2; }
    else if(b.dataset.t==='m'){ ins = '$' + (sel||'\\frac{3}{4}') + '$'; caret = s + 1; }
    else { const lines = (sel||'élément').split('\n'); ins = (s>0 && ta.value[s-1]!=='\n' ? '\n' : '') + lines.map(x=>'- '+x.replace(/^\s*-\s*/,'')).join('\n'); caret = s + ins.length; }
    ta.setRangeText(ins, s, e, 'end');
    if(!sel && b.dataset.t!=='l') ta.setSelectionRange(caret, caret + ins.length - (b.dataset.t==='b' ? 4 : 2));
    ta.focus(); refresh();
  });
  f.querySelector('.cp-f-cancel').onclick = ()=>cpCloseForm();
  f.querySelector('.cp-f-ok').onclick = ()=>{
    const K = CP_KINDS[kind];
    const l = input.value.trim().slice(0,160), x = ta.value.replace(/\s+$/,'').slice(0, CP_MAX_TEXT);
    if(K.titleOnly ? !l : !x.trim()){ f.querySelector('.cp-f-msg').textContent = K.titleOnly ? 'Écrivez le titre.' : 'Écrivez le texte du bloc.'; return; }
    const newSpec = K.titleOnly ? { k:kind, l } : (kind==='p' || kind==='box') ? { k:kind, x } : { k:kind, l, x };
    if(spec.np && kind===spec.k) newSpec.np = 1; // titre d'exemple / remarque d'origine gardé tel quel
    if(fromOrig && JSON.stringify(newSpec)===JSON.stringify(fromOrig)){ cpCloseForm(); return; } // rien de changé
    const id = eb ? eb.id : 'u:' + Date.now().toString(36) + Math.random().toString(36).slice(2,6);
    const b = cpBuildBlock(id, newSpec, cpEditing.container);
    if(origBlock!==undefined) b.orig = origBlock;
    const hidden = editW ? editW.classList.contains('cp-eb-hidden') : false;
    const w = cpMakeWrapper(b, hidden);
    f.replaceWith(w);
    if(editW) editW.remove();
    if(typeof updateCourseAddButtonsState==='function') updateCourseAddButtonsState();
    cpEditing.dirty = true;
    cpRenumber(cpEditing.container, true);
    w.classList.add('cp-flash'); setTimeout(()=>w.classList.remove('cp-flash'), 700);
    w.scrollIntoView({block:'nearest', behavior:'smooth'});
  };
  if(editW){ editW.style.display = 'none'; editW.after(f); }
  else anchor.after(f);
  refresh();
  f.scrollIntoView({block:'center', behavior:'smooth'});
  setTimeout(()=>(CP_KINDS[kind].titleOnly ? input : ta).focus({preventScroll:true}), 50);
}
function cpCloseForm(){
  if(!cpEditing) return;
  cpEditing.container.querySelectorAll(':scope > .cp-form').forEach(f=>{ if(f._edit) f._edit.style.display = ''; f.remove(); });
}
function cpMove(btn, dir){
  const w = btn.closest('.cp-eb');
  const sib = dir<0 ? w.previousElementSibling : w.nextElementSibling;
  if(!sib || !sib.classList.contains('cp-eb')) return;
  w.parentNode.insertBefore(w, dir<0 ? sib : sib.nextSibling);
  cpEditing.dirty = true;
  cpRenumber(cpEditing.container, true);
  w.scrollIntoView({block:'nearest', behavior:'smooth'});
  w.classList.add('cp-flash'); setTimeout(()=>w.classList.remove('cp-flash'), 500);
}
function cpToggleHide(btn){
  const w = btn.closest('.cp-eb');
  const h = w.classList.toggle('cp-eb-hidden');
  btn.innerHTML = `<span class="gicon">${h ? 'visibility_off' : 'visibility'}</span>`;
  btn.title = h ? 'Afficher ce bloc' : 'Masquer ce bloc pour mes élèves';
  cpEditing.dirty = true;
  cpRenumber(cpEditing.container, true);
}
function cpEditOrder(){
  return [...cpEditing.container.querySelectorAll(':scope > .cp-eb')].map(w=>({b:w._cpBlock, hidden:w.classList.contains('cp-eb-hidden')}));
}
/* Démonte l'édition : les éléments reprennent leur place à plat, dans l'ordre donné. */
function cpUnwrap(order){
  const c = cpEditing.container;
  order.forEach(({b, hidden})=>{
    b.nodes.forEach(n=>{ c.appendChild(n); n.classList.toggle('cp-hidden', hidden); });
    if(b.orig) b.orig.nodes.forEach(n=>{ c.appendChild(n); n.classList.add('cp-hidden'); });
  });
  c.querySelectorAll(':scope > .cp-eb, :scope > .cp-form, :scope > .cp-add-top').forEach(w=>w.remove());
  c.classList.remove('cp-edit-mode');
}
function cpRenderEditBar(){
  const bar = document.getElementById('cpBar');
  const v = cpCache.get(cpEditing.cid);
  const referent = typeof currentReferentEtab!=='undefined' && currentReferentEtab && currentReferentEtab.uai;
  bar.innerHTML = `
    <span class="cp-chip cp-chip-edit"><span class="gicon">edit_note</span> Personnalisation</span>
    <span class="hint" style="margin:0;flex:1;min-width:220px;">Glissez un bloc par sa poignée (ou flèches) pour le déplacer ; l'œil le masque pour vos élèves ; <b>+</b> ajoute un bloc à vous juste après ; le crayon modifie le texte (figures et tableaux ne se modifient pas). Les figures restent interactives.</span>
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
  const c = cpEditing.container, v = cpCache.get(cpEditing.cid);
  cpUnwrap(cpEditing.before);
  cpEditing = null;
  cpApply(c, (v && !cpShowOriginal) ? v.layout : null);
  cpRenderBar();
}
async function cpSaveEdit(publishEtab){
  if(!cpEditing) return;
  if(cpEditing.container.querySelector(':scope > .cp-form') && !confirm('Un bloc en cours d\'écriture n\'a pas été validé et sera perdu. Enregistrer quand même ?')) return;
  const order = cpEditOrder();
  const { cid, container } = cpEditing;
  const layout = cpLayoutFromOrder(order);
  const original = cpIsOriginalOrder(container, order);
  if(JSON.stringify(layout).length > 200000){ cpSay('Version trop volumineuse : raccourcissez vos blocs ajoutés.', true); return; }
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
  cpCloseForm();
  cpUnwrap(order);
  // Blocs ajoutés/modifiés pendant l'édition : ce sont désormais ceux de la version.
  const reg = cpRegistry(container);
  order.forEach(({b})=>{ if(b.custom){ const old = reg.get(b.id); if(old && old!==b) old.nodes.forEach(n=>n.remove()); reg.set(b.id, b); } });
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

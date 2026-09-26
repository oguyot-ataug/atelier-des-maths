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
   Étape 4 : figure dynamique ({k:'fig', l:titre, x:consigne, f:figure, vb:viewBox}). Elle se
   construit avec l'outil de figure du site (outils-figures.js : points, segments, droites,
   cercles, milieux, symétriques, codages, construction depuis un énoncé...) et se stocke au
   format serializeFigState. Dans le cours, elle est dessinée par renderFigureSvg lui-même et
   l'élève peut déplacer les points libres (ou posés sur un objet) : le reste suit, avec les
   mêmes règles que dans l'outil (onFigureMouseMove). Toutes les chaînes de la figure sont
   échappées avant le rendu (étiquettes, couleurs...).
   Étape 5 : blocs propres aux onglets Méthode et Exercices, avec les classes du site --
   « Méthode pas à pas » (step-list + « Étape suivante »), « Rédaction type » (redaction-block,
   lignes « calcul | commentaire ») et « Exercices » (exo-card avec correction dépliante) -- et
   partage entre collègues : une version « prof » marquée partage=true est proposée aux autres
   professeurs du même établissement (fonction cours_versions_partagees), qui peuvent
   l'afficher en aperçu puis la copier dans leur propre version.

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
let cpShared = new Map();       // conteneur -> versions partagées par les collègues [{id, layout, auteur, updated_at}]
let cpShareOn = new Map();      // conteneur -> sa propre version est-elle partagée ?
let cpPreview = null;           // aperçu d'une version de collègue : {cid, entry}
let cpSharedOpen = false;       // liste des versions de collègues dépliée

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
  fig:    { nom:'Figure dynamique', icon:'category', fig:true },
  steps:  { nom:'Méthode pas à pas', icon:'format_list_numbered' },
  redac:  { nom:'Rédaction type', icon:'edit_note' },
  exo:    { nom:'Exercices', icon:'assignment', exo:true },
};
let cpUid = 0;
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

/* ---------- méthode pas à pas ---------- */
function cpStepsMount(el){
  const next = el.querySelector('.cp-step-next'), reset = el.querySelector('.cp-step-reset');
  const items = ()=>[...el.querySelectorAll('.step-item')];
  if(next) next.onclick = e=>{
    e.stopPropagation();
    const it = items().find(x=>!x.classList.contains('done'));
    if(it) it.classList.add('done');
    next.disabled = !items().some(x=>!x.classList.contains('done'));
  };
  if(reset) reset.onclick = e=>{ e.stopPropagation(); items().forEach(x=>x.classList.remove('done')); if(next) next.disabled = false; };
}

/* ---------- figures dynamiques ---------- */
function cpFigVB(vb){
  return (Array.isArray(vb) && vb.length===4 && vb.every(Number.isFinite) && vb[2]>0 && vb[3]>0) ? vb : [0, 0, 500, 320];
}
/* Échappe toutes les chaînes (étiquettes, couleurs, textes de mesure...) : la figure vient de
   la base et renderFigureSvg insère ses champs tels quels dans le SVG. */
function cpFigClean(v){
  // Idempotent : une chaîne déjà échappée (figure rouverte puis revalidée) ne l'est pas deux fois.
  if(typeof v==='string') return cpEsc(v.replace(/&(lt|gt|quot|amp);/g, (m, e)=>({lt:'<', gt:'>', quot:'"', amp:'&'})[e]));
  if(Array.isArray(v)) return v.map(cpFigClean);
  if(v && typeof v==='object'){ const o = {}; for(const k in v) o[k] = cpFigClean(v[k]); return o; }
  return (typeof v==='number' && !Number.isFinite(v)) ? 0 : v;
}
function cpFigState(f){
  const r = deserializeFigState(cpFigClean(f));
  return { points:r.points||[], shapes:r.shapes||[], mode:'deplacer', selected:[], refShape:null, nextLabel:0, lengthGroups:{}, angleGroups:{} };
}
const cpFigDraggable = p=>!p.def || p.def.type==='point-sur-droite' || p.def.type==='point-sur-cercle';
/* Exécute fn avec la figure `st` comme figure courante de l'outil et `svgEl` comme #figureSvg
   (renderFigureSvg, recomputeDependents, onFigureMouseMove travaillent sur ces deux globales). */
function cpFigSwap(svgEl, st, fn){
  const real = document.getElementById('figureSvg');
  const savedState = figState, savedDrag = figDragPoint, oldId = svgEl.id;
  if(real && real!==svgEl) real.id = 'figureSvg-cp';
  svgEl.id = 'figureSvg';
  figState = st;
  try{ fn(); }
  finally{
    svgEl.id = oldId;
    if(real && real!==svgEl) real.id = 'figureSvg';
    figState = savedState; figDragPoint = savedDrag;
  }
}
function cpFigRender(svgEl, st){
  if(svgEl.isConnected) cpFigSwap(svgEl, st, renderFigureSvg);
  else {
    let scratch = document.getElementById('cpFigScratch');
    if(!scratch){
      scratch = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      scratch.id = 'cpFigScratch'; scratch.style.display = 'none';
      document.body.appendChild(scratch);
    }
    cpFigSwap(scratch, st, renderFigureSvg);
    svgEl.innerHTML = scratch.innerHTML;
    scratch.innerHTML = '';
  }
  // Poignées : les points que l'élève peut déplacer.
  const ns = 'http://www.w3.org/2000/svg';
  st.points.filter(cpFigDraggable).forEach(p=>{
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('class', 'cp-fig-handle');
    c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', 6);
    svgEl.insertBefore(c, svgEl.firstChild);
  });
}
function cpFigMount(svg, spec){
  if(!spec.f || typeof deserializeFigState!=='function' || typeof renderFigureSvg!=='function') return;
  let st;
  try{ st = cpFigState(spec.f); cpFigRender(svg, st); }catch(e){ console.warn('figure :', e); return; }
  let drag = null;
  const at = ev=>{ const m = svg.getScreenCTM(); if(!m) return null; const q = svg.createSVGPoint(); q.x = ev.clientX; q.y = ev.clientY; return q.matrixTransform(m.inverse()); };
  const near = q=>{
    let best = null, bd = 16;
    st.points.forEach(p=>{ if(!cpFigDraggable(p)) return; const d = Math.hypot(p.x-q.x, p.y-q.y); if(d<bd){ bd = d; best = p; } });
    return best;
  };
  svg.addEventListener('pointerdown', ev=>{
    const q = at(ev); if(!q) return;
    const p = near(q); if(!p) return;
    drag = p; ev.preventDefault();
    try{ svg.setPointerCapture(ev.pointerId); }catch(e){}
    svg.classList.add('cp-fig-dragging');
  });
  svg.addEventListener('pointermove', ev=>{
    if(!drag){ const q = at(ev); svg.style.cursor = (q && near(q)) ? 'grab' : ''; return; }
    ev.preventDefault();
    // Même déplacement que dans l'outil de figure (contraintes, longueurs fixes, dépendants).
    cpFigSwap(svg, st, ()=>{ figDragPoint = drag; figDragLabel = null; figDragMeasure = null; onFigureMouseMove(ev); });
    cpFigRender(svg, st);
  });
  const end = ()=>{ if(!drag) return; drag = null; svg.classList.remove('cp-fig-dragging'); svg.style.cursor = ''; };
  svg.addEventListener('pointerup', end);
  svg.addEventListener('pointercancel', end);
  const reset = svg.parentElement && svg.parentElement.querySelector('.cp-fig-reset');
  if(reset) reset.onclick = e=>{ e.stopPropagation(); st = cpFigState(spec.f); cpFigRender(svg, st); };
}
/* Ouvre l'outil de figure du site (vide, ou avec `data`) ; « Valider » rend la figure à `cb`. */
let cpFigHook = null, cpFigPatched = false;
function cpFigOpenEditor(data, cb){
  if(typeof openFigureTool!=='function'){ alert('Outil de figure indisponible.'); return; }
  if(!cpFigPatched){
    cpFigPatched = true;
    const ov = validateFigure, oc = closeFigureTool;
    validateFigure = function(){
      if(!cpFigHook) return ov.apply(this, arguments);
      const f = serializeFigState(figState);
      if(!f.points.length){ const h = document.getElementById('figureHint'); if(h) h.textContent = 'Placez au moins un point avant de valider.'; return; }
      const hook = cpFigHook;
      const vb = [figViewBox.x, figViewBox.y, figViewBox.w, figViewBox.h].map(v=>Math.round(v*10)/10);
      closeFigureTool();
      hook({ f, vb });
    };
    closeFigureTool = function(){
      if(cpFigHook){
        cpFigHook = null;
        const b = document.getElementById('figValidateBtn');
        if(b && b.dataset.cpText){ b.textContent = b.dataset.cpText; delete b.dataset.cpText; }
      }
      return oc.apply(this, arguments);
    };
  }
  if(data && data.f) reopenFigure(cpFigClean(data.f)); else openFigureTool();
  cpFigHook = cb;
  const b = document.getElementById('figValidateBtn');
  if(b){ if(!b.dataset.cpText) b.dataset.cpText = b.textContent; b.textContent = '✓ Valider la figure pour le cours'; }
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
  holder.querySelectorAll('svg.cp-fig').forEach(svg=>cpFigMount(svg, spec));
  holder.querySelectorAll('.cp-steps').forEach(cpStepsMount);
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
    case 'fig': {
      const consigne = x.trim() ? x.split('\n').map(cpInline).join('<br>') : 'Déplace les points pour faire varier la figure.';
      return (label ? `<p class="example-title">${cpInline(label)}</p>` : '')
        + `<div class="figure-wrap cp-fig-wrap"><svg class="cp-fig" viewBox="${cpFigVB(spec.vb).join(' ')}" role="img" aria-label="Figure dynamique"></svg>`
        + `<div class="cp-fig-bar"><span class="hint" style="margin:0;"><span class="gicon" style="font-size:1em;vertical-align:-2px;">pan_tool_alt</span> ${consigne}</span>`
        + `<button type="button" class="cp-fig-reset" title="Remettre la figure dans sa position de départ"><span class="gicon">restart_alt</span></button></div></div>`;
    }
    case 'steps': {
      const steps = x.split('\n').map(t=>t.trim().replace(/^(\d+\s*[.)]|[-•])\s+/, '')).filter(Boolean);
      return `<div class="figure-wrap cp-steps">${label ? `<p class="example-title">${cpInline(label)}</p>` : ''}`
        + `<div class="step-list" style="margin-top:0;">${steps.map((t,i)=>`<div class="step-item" data-step="${i+1}"><div class="step-num">${i+1}</div><div>${cpInline(t)}</div></div>`).join('')}</div>`
        + `<div class="figure-toolbar"><button type="button" class="btn cp-step-next">Étape suivante →</button><button type="button" class="btn secondary cp-step-reset">Revoir depuis le début</button></div></div>`;
    }
    case 'redac': {
      const t = label ? (/^r[ée]daction/i.test(label) ? cpInline(label) : `Rédaction type : « ${cpInline(label)} »`) : 'Rédaction type';
      let body = '', rows = [];
      const flush = ()=>{ if(rows.length){ body += `<div class="redaction-template">${rows.join('')}</div>`; rows = []; } };
      x.split('\n').forEach(line=>{
        if(!line.trim()) return;
        const i = line.indexOf('|');
        if(i>=0) rows.push(`<div class="we-row"><span class="we-expr">${cpInline(line.slice(0,i).trim())}</span><span class="we-comment">${cpInline(line.slice(i+1).trim())}</span></div>`);
        else { flush(); body += `<p style="margin:4px 0 10px;">${cpInline(line.trim())}</p>`; }
      });
      flush();
      return `<div class="redaction-block cp-redac"><h3>${t}</h3>${body}</div>`;
    }
    case 'exo': {
      const items = (Array.isArray(spec.items) ? spec.items : []).filter(it=>it && typeof it.e==='string');
      return `<div class="redaction-block cp-exo"><h3>${label ? cpInline(label) : 'Exercices'}</h3>` + items.map((it, i)=>{
        const id = 'cp-cor-' + (++cpUid);
        const cor = typeof it.c==='string' && it.c.trim()
          ? `<button type="button" class="exo-correction-toggle" data-target="${id}" onclick="toggleExoCorrection(this)" title="Voir la correction" aria-label="Voir la correction"><span class="gicon">expand_more</span></button><div class="exo-correction cp-rich" id="${id}">${cpRich(it.c).join('')}</div>`
          : '';
        return `<div class="exo-card"><div class="num">Exercice ${i+1}</div><div class="cp-rich">${cpRich(it.e).join('')}</div>${cor}</div>`;
      }).join('') + `</div>`;
    }
    default: return `<div class="cp-rich cp-par">${cpRich(x).join('')}</div>`;
  }
}

/* ---------- chargement ---------- */
async function cpLoad(containers){
  const want = containers.filter(c=>!cpCache.has(c));
  if(want.length && typeof sb!=='undefined' && currentUser){
    try{
      const staff = cpIsStaff();
      // Le partage est un complément : s'il échoue, les versions s'affichent quand même.
      const opt = f=>{ if(!staff) return Promise.resolve({ data:[] }); try{ return Promise.resolve(f()).catch(e=>({ error:e })); }catch(e){ return Promise.resolve({ error:e }); } };
      const [v, sh, mine] = await Promise.all([
        sb.rpc('cours_versions', { p_containers: want }),
        opt(()=>sb.rpc('cours_versions_partagees', { p_containers: want })),
        opt(()=>sb.from('cours_perso').select('container,partage').eq('scope','prof').eq('owner_id', currentUser.id).in('container', want)),
      ]);
      if(v.error) throw v.error;
      want.forEach(c=>{ cpCache.set(c, null); cpShared.set(c, []); cpShareOn.set(c, false); });
      (v.data||[]).forEach(r=>cpCache.set(r.container, {layout:r.layout, source:r.source, auteur:r.auteur}));
      if(!sh.error) (sh.data||[]).forEach(r=>{ if(cpShared.has(r.container)) cpShared.get(r.container).push(r); });
      if(!mine.error) (mine.data||[]).forEach(r=>cpShareOn.set(r.container, !!r.partage));
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
  cpPreview = null; cpSharedOpen = false;
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
  if(cpPreview && cpPreview.cid===cid){
    const e = cpPreview.entry;
    bar.innerHTML = `<span class="cp-chip cp-chip-prev"><span class="gicon">visibility</span> Aperçu : version de ${cpEsc(e.auteur||'un collègue')}</span>
      <button type="button" class="btn cp-btn" onclick="cpCopyShared()"><span class="gicon">content_copy</span> Copier dans ma version</button>
      <button type="button" class="btn secondary cp-btn" onclick="cpClosePreview()">Fermer l'aperçu</button>`;
    bar.style.display = 'flex';
    return;
  }
  if(v && !cpShowOriginal){
    const who = v.source==='moi' ? 'votre version' : v.source==='etab' ? 'version de l\'établissement' : ('version de ' + cpEsc(v.auteur||'votre professeur'));
    html += `<span class="cp-chip"><span class="gicon">tune</span> ${staff ? 'Cours personnalisé : ' + who : (v.source==='etab' ? 'Cours adapté par ton établissement' : 'Cours adapté par ton professeur')}</span>`;
    if(staff) html += `<button type="button" class="cp-link" onclick="cpToggleOriginal()">Voir le cours d'origine</button>`;
  } else if(v && cpShowOriginal){
    html += `<span class="cp-chip cp-chip-orig"><span class="gicon">visibility</span> Cours d'origine</span><button type="button" class="cp-link" onclick="cpToggleOriginal()">Revenir à ${v.source==='moi' ? 'ma version' : 'la version personnalisée'}</button>`;
  }
  if(staff && cid){
    html += `<button type="button" class="btn secondary cp-btn" onclick="cpStartEdit()"><span class="gicon">edit_note</span> Personnaliser cet onglet</button>`;
    if(v && v.source==='moi' && !cpShowOriginal)
      html += `<label class="cp-share" title="Vos collègues de l'établissement pourront voir cette version et la copier (vos élèves la voient dans tous les cas)"><input type="checkbox" ${cpShareOn.get(cid) ? 'checked' : ''} onchange="cpSetShare(this.checked)"> Partager avec mes collègues</label>`;
    const shared = cpShared.get(cid) || [];
    if(shared.length){
      html += `<button type="button" class="cp-link" onclick="cpToggleSharedList()"><span class="gicon" style="font-size:1em;vertical-align:-2px;">group</span> Versions de collègues (${shared.length})</button>`;
      if(cpSharedOpen) html += `<div class="cp-shared-list">${shared.map((e, i)=>`<div class="cp-shared-item">
          <div><b>${cpEsc(e.auteur||'Un collègue')}</b> <span class="hint" style="margin:0;">· ${cpEsc(cpDate(e.updated_at))} · ${cpEsc(cpSummary(document.getElementById(cid), e.layout))}</span></div>
          <div class="cp-shared-actions"><button type="button" class="btn secondary cp-btn" onclick="cpOpenPreview(${i})"><span class="gicon">visibility</span> Aperçu</button>
          <button type="button" class="btn secondary cp-btn" onclick="cpCopyShared(${i})"><span class="gicon">content_copy</span> Copier dans ma version</button></div>
        </div>`).join('')}</div>`;
    }
  }
  bar.innerHTML = html;
  bar.style.display = html ? 'flex' : 'none';
}
function cpDate(d){ try{ return 'modifiée le ' + new Date(d).toLocaleDateString('fr-FR'); }catch(e){ return ''; } }
/* Résumé d'une version : ce qu'elle change par rapport au cours d'origine. */
function cpSummary(container, layout){
  const bl = (layout && Array.isArray(layout.blocks)) ? layout.blocks : [];
  const add = bl.filter(e=>e.add).length, rw = bl.filter(e=>e.rep).length, hid = bl.filter(e=>e.h).length;
  let moved = false;
  if(container){
    const orig = cpBlocks(container).map(b=>b.id), pos = new Map(orig.map((id, i)=>[id, i]));
    const seq = bl.filter(e=>!e.add && pos.has(e.id)).map(e=>pos.get(e.id));
    moved = seq.some((x, i)=>i && x<seq[i-1]);
  }
  const parts = [];
  if(add) parts.push(add + (add>1 ? ' blocs ajoutés' : ' bloc ajouté'));
  if(rw) parts.push(rw + (rw>1 ? ' blocs réécrits' : ' bloc réécrit'));
  if(hid) parts.push(hid + (hid>1 ? ' blocs masqués' : ' bloc masqué'));
  if(moved) parts.push('ordre modifié');
  return parts.join(', ') || 'aucune modification';
}
function cpToggleSharedList(){ cpSharedOpen = !cpSharedOpen; cpRenderBar(); }
function cpOpenPreview(i){
  const cid = cpActiveContainerId(), e = (cpShared.get(cid) || [])[i];
  if(!e) return;
  cpPreview = { cid, entry:e };
  cpShowOriginal = false;
  cpApply(document.getElementById(cid), e.layout);
  cpRenderBar();
  document.getElementById(cid).scrollIntoView({behavior:'smooth', block:'start'});
}
function cpClosePreview(){
  if(!cpPreview) return;
  const cid = cpPreview.cid, v = cpCache.get(cid);
  cpPreview = null;
  cpApply(document.getElementById(cid), v ? v.layout : null);
  cpRenderBar();
}
async function cpCopyShared(i){
  const cid = cpPreview ? cpPreview.cid : cpActiveContainerId();
  const e = cpPreview ? cpPreview.entry : (cpShared.get(cid) || [])[i];
  if(!e || !cid) return;
  const v = cpCache.get(cid);
  if(v && v.source==='moi' && !confirm(`Remplacer votre version de cet onglet par celle de ${e.auteur||'votre collègue'} ?`)) return;
  try{
    const { data: mine } = await sb.from('cours_perso').select('id').eq('scope','prof').eq('owner_id', currentUser.id).eq('container', cid).maybeSingle();
    const r = mine
      ? await sb.from('cours_perso').update({ layout:e.layout, updated_at:new Date().toISOString() }).eq('id', mine.id)
      : await sb.from('cours_perso').insert({ scope:'prof', owner_id:currentUser.id, container:cid, layout:e.layout });
    if(r && r.error) throw r.error;
  }catch(err){ cpToast('Copie impossible : ' + (err.message||err)); return; }
  cpPreview = null; cpSharedOpen = false;
  cpCache.delete(cid);
  await cpLoad([cid]);
  const nv = cpCache.get(cid);
  cpApply(document.getElementById(cid), nv ? nv.layout : null);
  cpRenderBar();
  cpToast('Version copiée : c\'est maintenant la vôtre (vos élèves la voient), modifiable à volonté.');
}
async function cpSetShare(on){
  const cid = cpActiveContainerId();
  if(!cid) return;
  try{
    const { error } = await sb.from('cours_perso').update({ partage:!!on }).eq('scope','prof').eq('owner_id', currentUser.id).eq('container', cid);
    if(error) throw error;
    cpShareOn.set(cid, !!on);
    cpToast(on ? 'Votre version est proposée à vos collègues de l\'établissement.' : 'Votre version n\'est plus partagée.');
  }catch(e){ cpToast('Modification impossible : ' + (e.message||e)); }
  cpRenderBar();
}
function cpEsc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function cpToggleOriginal(){
  if(cpPreview) cpClosePreview();
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
  if(cpPreview) cpClosePreview();
  cpSharedOpen = false;
  setTimeout(cpRenderBar, 0);
}, true);

/* ---------- éditeur ---------- */
function cpStartEdit(){
  const cid = cpActiveContainerId();
  const container = cid && document.getElementById(cid);
  if(!container) return;
  if(typeof lrnState!=='undefined' && lrnState && typeof lrnStop==='function') lrnStop();
  if(cpPreview) cpClosePreview();
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
  // Type proposé par défaut selon l'onglet : Méthode -> méthode pas à pas, Exercices -> exercices.
  const tabKind = cpCurrentDemo && cpEditing && cpEditing.cid===cpCurrentDemo.methode ? 'steps' : cpCurrentDemo && cpEditing && cpEditing.cid===cpCurrentDemo.exos ? 'exo' : 'p';
  const spec = eb ? (eb.custom || fromOrig) : { k:tabKind, l:'', x:'' };
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
    <div class="cp-f-figrow">
      <button type="button" class="btn secondary cp-f-figbtn"><span class="gicon">category</span> <span>Construire la figure</span></button>
      <span class="hint" style="margin:0;">Outil de figure du site : points, segments, droites, cercles, milieux, symétriques, codages… ou construction automatique à partir d'un énoncé. Dans le cours, vos élèves pourront déplacer les points libres : le reste de la figure suit.</span>
    </div>
    <div class="cp-f-textwrap">
      <div class="cp-tools">
        <button type="button" data-t="b" title="Gras : **texte**"><span class="gicon">format_bold</span></button>
        <button type="button" data-t="m" title="Formule : $\\frac{3}{4}$"><span class="gicon">function</span></button>
        <button type="button" data-t="l" title="Liste : une ligne par élément, commençant par « - »"><span class="gicon">format_list_bulleted</span></button>
        <span class="hint" style="margin:0;">**gras** · $formule$ (ex. $\\frac{3}{4}$, $3 \\times 5$) · « - » en début de ligne pour une liste · ligne vide = nouveau paragraphe</span>
      </div>
      <textarea rows="5" maxlength="${CP_MAX_TEXT}"></textarea>
    </div>
    <div class="cp-f-exowrap">
      <div class="cp-f-exos"></div>
      <button type="button" class="btn secondary cp-f-addexo"><span class="gicon">add</span> Ajouter un exercice</button>
      <span class="hint" style="margin:0 0 0 8px;">**gras** et $formule$ fonctionnent aussi ici. La correction, facultative, se déplie sous l'exercice.</span>
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
  let figData = spec.f ? { f:spec.f, vb:spec.vb } : null;
  let exos = Array.isArray(spec.items) && spec.items.length ? spec.items.map(it=>({ e:it.e||'', c:it.c||'' })) : [{ e:'', c:'' }];
  const exoBox = f.querySelector('.cp-f-exos');
  const renderExos = ()=>{
    exoBox.innerHTML = exos.map((it, i)=>`<div class="cp-f-exo" data-i="${i}">
        <div class="cp-f-exo-head"><b>Exercice ${i+1}</b>${exos.length>1 ? `<button type="button" class="cp-f-exo-del" title="Retirer cet exercice"><span class="gicon">close</span></button>` : ''}</div>
        <textarea class="cp-f-exo-e" rows="3" maxlength="${CP_MAX_TEXT}" placeholder="Énoncé de l'exercice"></textarea>
        <textarea class="cp-f-exo-c" rows="2" maxlength="${CP_MAX_TEXT}" placeholder="Correction (facultatif)"></textarea>
      </div>`).join('');
    exoBox.querySelectorAll('.cp-f-exo').forEach(box=>{
      const i = +box.dataset.i, e = box.querySelector('.cp-f-exo-e'), c = box.querySelector('.cp-f-exo-c');
      e.value = exos[i].e; c.value = exos[i].c;
      e.oninput = ()=>{ exos[i].e = e.value; refresh(); };
      c.oninput = ()=>{ exos[i].c = c.value; refresh(); };
      const del = box.querySelector('.cp-f-exo-del');
      if(del) del.onclick = ()=>{ exos.splice(i, 1); renderExos(); refresh(); };
    });
  };
  f.querySelector('.cp-f-addexo').onclick = ()=>{
    if(exos.length>=30) return;
    exos.push({ e:'', c:'' }); renderExos(); refresh();
    const last = exoBox.querySelector('.cp-f-exo:last-child .cp-f-exo-e'); if(last) last.focus();
  };
  renderExos();
  f.querySelector('.cp-f-figbtn').onclick = ()=>cpFigOpenEditor(figData, d=>{ figData = d; refresh(); f.scrollIntoView({block:'center'}); });
  const refresh = ()=>{
    const K = CP_KINDS[kind];
    f.querySelectorAll('.cp-kinds button').forEach(b=>b.classList.toggle('on', b.dataset.k===kind));
    f.querySelector('.cp-f-label span').textContent = K.titleOnly ? 'Titre' : K.fig ? 'Titre au-dessus de la figure (facultatif)'
      : kind==='steps' ? 'Titre de la méthode (facultatif)' : kind==='redac' ? 'Titre (facultatif)' : kind==='exo' ? 'Titre du bloc (facultatif, « Exercices » par défaut)'
      : (K.label ? 'Étiquette (facultatif)' : 'Titre (facultatif, non affiché)');
    f.querySelector('.cp-f-label').style.display = (kind==='p' || kind==='box') ? 'none' : '';
    input.placeholder = K.titleOnly ? 'ex. Le cercle' : kind==='ex' ? 'ex. calculer une longueur' : K.fig ? 'ex. Médiatrice d\'un segment'
      : kind==='steps' ? 'ex. Construire la médiatrice au compas' : kind==='redac' ? 'ex. Calculer le périmètre d\'un rectangle' : kind==='exo' ? 'Exercices' : (K.label ? 'ex. ' + K.label + ' 3' : '');
    f.querySelector('.cp-f-textwrap').style.display = (K.titleOnly || K.exo) ? 'none' : '';
    f.querySelector('.cp-f-exowrap').style.display = K.exo ? '' : 'none';
    f.querySelector('.cp-tools [data-t="l"]').style.display = (kind==='steps' || kind==='redac') ? 'none' : '';
    f.querySelector('.cp-tools .hint').textContent = kind==='steps' ? 'Une étape par ligne · **gras** · $formule$'
      : kind==='redac' ? 'Une ligne par étape : calcul ou phrase | commentaire (ex. P = 2 × (5 + 3) | On applique la formule.) · une ligne sans « | » s\'affiche comme texte (énoncé) · $formule$'
      : '**gras** · $formule$ (ex. $\\frac{3}{4}$, $3 \\times 5$) · « - » en début de ligne pour une liste · ligne vide = nouveau paragraphe';
    f.querySelector('.cp-tools').style.display = K.fig ? 'none' : '';
    f.querySelector('.cp-f-figrow').style.display = K.fig ? '' : 'none';
    f.querySelector('.cp-f-figbtn span:last-child').textContent = figData ? 'Modifier la figure' : 'Construire la figure';
    ta.placeholder = K.fig ? 'Consigne pour l\'élève (facultatif), ex. Déplace le point A : que remarques-tu ?'
      : kind==='steps' ? 'On pique le compas en A.\nOn trace un arc de cercle.\n…'
      : kind==='redac' ? 'Un rectangle mesure 5 cm sur 3 cm. Calcule son périmètre.\nP = 2 × (L + l) | Formule du périmètre.\nP = 2 × (5 + 3) | On remplace.\nP = 16 cm | On conclut avec l\'unité.' : '';
    const prev = f.querySelector('.cp-f-preview');
    if(K.fig && !figData){ prev.innerHTML = '<p class="hint" style="margin:0;">Construisez la figure pour la voir ici.</p>'; return; }
    const pv = Object.assign({ k:kind, l:input.value, x:ta.value }, spec.np && kind===spec.k ? {np:1} : {}, K.fig ? { f:figData.f, vb:figData.vb } : {}, K.exo ? { items:exos } : {});
    prev.innerHTML = cpRenderSpec(pv);
    if(K.fig) prev.querySelectorAll('svg.cp-fig').forEach(svg=>cpFigMount(svg, pv));
    prev.querySelectorAll('.cp-steps').forEach(cpStepsMount);
    const num = prev.querySelector('.lesson-header .num'), let_ = prev.querySelector('.sub-header .letter');
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
    const items = exos.map(it=>({ e:it.e.replace(/\s+$/,'').slice(0, CP_MAX_TEXT), c:it.c.replace(/\s+$/,'').slice(0, CP_MAX_TEXT) })).filter(it=>it.e.trim()).slice(0, 30)
      .map(it=>it.c.trim() ? it : { e:it.e });
    if(K.exo ? !items.length : K.fig ? !figData : K.titleOnly ? !l : !x.trim()){
      f.querySelector('.cp-f-msg').textContent = K.exo ? 'Écrivez au moins un énoncé.' : K.fig ? 'Construisez d\'abord la figure.' : K.titleOnly ? 'Écrivez le titre.' : 'Écrivez le texte du bloc.';
      return;
    }
    const newSpec = K.exo ? { k:kind, l, items } : K.fig ? { k:kind, l, x, f:figData.f, vb:figData.vb } : K.titleOnly ? { k:kind, l } : (kind==='p' || kind==='box') ? { k:kind, x } : { k:kind, l, x };
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
  cpCache = new Map(); cpShared = new Map(); cpShareOn = new Map(); cpPreview = null;
  if(cpEditing) cpCancelEdit(true);
  if(cpCurrentDemo) cpOnChapterOpen(cpCurrentDemo);
}

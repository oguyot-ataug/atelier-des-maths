/* ======================= DATA ======================= */
const CATS = {
  N:{label:'Nombres', bg:'var(--cat-N-bg)', text:'var(--cat-N-text)'},
  G:{label:'Géométrie', bg:'var(--cat-G-bg)', text:'var(--cat-G-text)'},
  D:{label:'Données', bg:'var(--cat-D-bg)', text:'var(--cat-D-text)'},
  M:{label:'Mesures', bg:'var(--cat-M-bg)', text:'var(--cat-M-text)'},
  P:{label:'Proportionnalité', bg:'var(--cat-P-bg)', text:'var(--cat-P-text)'},
};

const CH6 = [
 {n:1,code:'N1',cat:'N',t:'Nombres entiers',s:2,p:'4-13',d:'7-20 sept'},
 {n:2,code:'G2',cat:'G',t:'Droites parallèles et perpendiculaires',s:1,p:'76-83',d:'21-27 sept'},
 {n:3,code:'N2',cat:'N',t:'Fractions : nombres et partage',s:2,p:'14-23',d:'28 sept-11 oct'},
 {n:4,code:'G1',cat:'G',t:'Distance et cercles',s:2,p:'64-75',d:'2-15 nov'},
 {n:5,code:'N3',cat:'N',t:'Nombres décimaux',s:2,p:'24-33',d:'16-29 nov'},
 {n:6,code:'G3',cat:'G',t:'Angles et rapporteur',s:1,p:'84-97',d:'30 nov-6 déc'},
 {n:7,code:'N4',cat:'N',t:'Opérations et ordre de grandeur',s:1,p:'34-43',d:'7-13 déc'},
 {n:8,code:'G5',cat:'G',t:'Construction de triangles',s:1,p:'110-118',d:'4-10 jan'},
 {n:9,code:'N4',cat:'N',t:'Multiplication et division',s:1,p:'34-43',d:'11-17 jan'},
 {n:10,code:'G4',cat:'G',t:'Symétrie axiale',s:2,p:'98-109',d:'18-31 jan'},
 {n:11,code:'N5',cat:'N',t:'Fractions : comparaison et addition',s:2,p:'44-59',d:'1-14 fév'},
 {n:12,code:'D1',cat:'D',t:'Gestion de données',s:1,p:'144-147',d:'8-14 mars'},
 {n:13,code:'G6',cat:'G',t:'Propriétés des triangles',s:2,p:'119-125',d:'15-28 mars'},
 {n:14,code:'N5',cat:'N',t:'Fractions : multiplication',s:1,p:'44-59',d:'29 mars-4 avr'},
 {n:15,code:'D3',cat:'D',t:'Proportionnalité',s:1,p:'152-157',d:'5-11 avr'},
 {n:16,code:'M1',cat:'M',t:'Aire et périmètre',s:1,p:'130-137',d:'3-16 mai'},
 {n:17,code:'D2',cat:'D',t:'Probabilités',s:1,p:'148-151',d:'17-23 mai'},
 {n:18,code:'N6',cat:'N',t:'Initiation à l\'algèbre',s:1,p:'60-63',d:'24-30 mai'},
 {n:19,code:'G7',cat:'G',t:'Solides et volumes',s:1,p:'126-129',d:'31 mai-6 juin'},
 {n:20,code:'M2',cat:'M',t:'Heures et durée',s:1,p:'138-143',d:'7-13 juin'},
];

const CH5 = [
 {n:1,code:'N1',cat:'N',t:'Opérations sur les nombres décimaux',s:3,p:'4-13',d:'1-20 sept'},
 {n:2,code:'G1',cat:'G',t:'Symétrie centrale',s:2,p:'58-72',d:'21 sept-4 oct'},
 {n:3,code:'N1',cat:'N',t:'Divisibilité',s:1,p:'4-13',d:'5-11 oct'},
 {n:4,code:'G2',cat:'G',t:'Angles et parallélisme',s:2,p:'72-81',d:'2-15 nov'},
 {n:5,code:'N4',cat:'N',t:'Fractions',s:2,p:'34-41',d:'16-29 nov'},
 {n:6,code:'G3',cat:'G',t:'Droites remarquables dans un triangle',s:2,p:'82-89',d:'30 nov-13 déc'},
 {n:7,code:'P1',cat:'P',t:'Proportionnalité',s:1,p:'140-149',d:'4-10 jan'},
 {n:8,code:'N2',cat:'N',t:'Nombres relatifs',s:2,p:'14-23',d:'11-24 jan'},
 {n:9,code:'G4',cat:'G',t:'Parallélogrammes',s:2,p:'90-98',d:'25 jan-7 fév'},
 {n:10,code:'D1',cat:'D',t:'Statistiques',s:1,p:'124-133',d:'8-14 fév'},
 {n:11,code:'N3',cat:'N',t:'Opérations sur les nombres relatifs',s:2,p:'24-33',d:'8-21 mars'},
 {n:12,code:'G5',cat:'G',t:'Parallélogrammes particuliers',s:1,p:'99-107',d:'22-28 mars'},
 {n:13,code:'P1',cat:'P',t:'Pourcentages',s:1,p:'140-149',d:'29 mars-4 avr'},
 {n:14,code:'G6',cat:'G',t:'Aires',s:1,p:'108-113',d:'5-11 avr'},
 {n:15,code:'N5',cat:'N',t:'Calcul littéral',s:2,p:'42-51',d:'3-16 mai'},
 {n:16,code:'D2',cat:'D',t:'Probabilités',s:1,p:'134-139',d:'17-23 mai'},
 {n:17,code:'G7',cat:'G',t:'Représentation de l\'espace',s:1,p:'114-123',d:'24-30 mai'},
 {n:18,code:'N6',cat:'N',t:'Équations',s:1,p:'52-57',d:'31 mai-6 juin'},
 {n:19,code:'P2',cat:'P',t:'Fonctions',s:1,p:'150-155',d:'7-13 juin'},
];

const VACANCES = {
  '6e':[{after:3,label:'Vacances de Toussaint · 17 oct → 1 nov'},{after:7,label:'Vacances de Noël · 20 déc → 4 jan'},{after:11,label:'Vacances d\'hiver · 20 fév → 7 mars'},{after:15,label:'Vacances de printemps · 17 avr → 2 mai'}],
  '5e':[{after:3,label:'Vacances de Toussaint · 17 oct → 1 nov'},{after:6,label:'Vacances de Noël · 19 déc → 3 jan'},{after:10,label:'Vacances d\'hiver · 20 fév → 7 mars'},{after:14,label:'Vacances de printemps · 17 avr → 2 mai'}],
};

let currentLevel='6e';
function toggleMobileNav(){
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('#navLinks button').forEach(b=>{
  b.addEventListener('click', ()=>{ document.getElementById('navLinks').classList.remove('open'); });
});

/* ======================= ROUTER ======================= */
function showView(id){
  // Sécurité : si un outil (figure, texte, probabilités...) ou l'éditeur de formule était resté
  // ouvert (overlay plein écran) au moment de changer de page via le menu, on le referme -- sans
  // ça, l'overlay reste actif par-dessus la nouvelle page et bloque tous les clics, y compris sur
  // le menu lui-même, sans qu'aucune erreur ne s'affiche (rien ne plante, l'overlay fait juste
  // écran).
  if(typeof closeAllToolPanels==='function') closeAllToolPanels();
  const fbOverlay = document.getElementById('formulaBuilderOverlay');
  if(fbOverlay) fbOverlay.style.display='none';
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
document.querySelectorAll('[data-nav]').forEach(el=>{
  el.addEventListener('click',()=>{
    document.querySelectorAll('.nav-dropdown.open').forEach(d=>d.classList.remove('open'));
    const nav = el.getAttribute('data-nav');
    if(nav==='home'){ showView('view-home'); setActiveTopnav(null); }
    if(nav==='niveau'){ currentLevel = el.getAttribute('data-lvl')||currentLevel; renderNiveau(currentLevel); showView('view-niveau'); setActiveTopnav(currentLevel); }
    if(nav==='cm'){ showView('view-cm'); setActiveTopnav('cm'); if(typeof refreshCMProgress==='function') refreshCMProgress(); if(typeof refreshCMRecords==='function') refreshCMRecords(); }
    if(nav==='compte'){ showView('view-compte'); setActiveTopnav('compte'); if(typeof cebInit==='function') cebInit(); }
    if(nav==='correction'){
      if(currentUserRole!=='prof' && currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-correction'); setActiveTopnav('correction');
    }
    if(nav==='evaluation'){
      if(currentUserRole!=='prof' && currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-evaluation'); setActiveTopnav('evaluation'); if(typeof initEvaluationView==='function') initEvaluationView();
    }
    if(nav==='tableau'){
      if(currentUserRole!=='prof' && currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-tableau'); setActiveTopnav('tableau'); if(typeof initTableauView==='function') initTableauView();
    }
    if(nav==='cahier'){
      if(!currentUser){ toggleAccountMenu(); return; }
      showView('view-cahier-eleve'); setActiveTopnav('cahier'); renderCahierEleve();
    }
    if(nav==='admin'){
      if(currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-admin'); setActiveTopnav('admin');
    }
    if(nav==='supervision'){
      if(currentUserRole!=='prof' && currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-supervision'); setActiveTopnav('supervision'); renderSupervision(); renderSupervisionCeb();
    }
    if(nav==='mesresultats'){
      if(currentUserRole!=='eleve'){ toggleAccountMenu(); return; }
      showView('view-mesresultats'); setActiveTopnav('mesresultats'); renderMesResultats();
    }
    if(nav==='chapitre'){
      const pick = el.getAttribute('data-chap')||'symetrie';
      const chaps = {
        symetrie: {code:'G1',cat:'G',t:"Symétrie centrale",p:'58-72',s:2,d:'21 sept-4 oct'},
        relatifs: {code:'N2',cat:'N',t:"Nombres relatifs",p:'14-23',s:2,d:'11-24 jan'},
      };
      openChapitre(chaps[pick], el.getAttribute('data-tab'), '5e');
    }
  });
});
function setActiveTopnav(key){
  document.querySelectorAll('.nav-links button').forEach(b=>b.classList.remove('active'));
  if(key==='6e') document.querySelector('.nav-links button[data-lvl="6e"]').classList.add('active');
  else if(key==='5e') document.querySelector('.nav-links button[data-lvl="5e"]').classList.add('active');
  else if(key==='cm') document.querySelector('.nav-links button[data-nav="cm"]').classList.add('active');
  else if(key==='compte') document.querySelector('.nav-links button[data-nav="compte"]').classList.add('active');
  else if(key==='correction') document.querySelector('.nav-links button[data-nav="correction"]').classList.add('active');
  else if(key==='evaluation') document.querySelector('.nav-links button[data-nav="evaluation"]').classList.add('active');
  else if(key==='tableau') document.querySelector('.nav-links button[data-nav="tableau"]').classList.add('active');
  else if(key==='cahier') document.querySelector('.nav-links button[data-nav="cahier"]').classList.add('active');
  else if(key==='admin') document.querySelector('.nav-links button[data-nav="admin"]').classList.add('active');
  else if(key==='supervision') document.querySelector('.nav-links button[data-nav="supervision"]').classList.add('active');
  else if(key==='mesresultats') document.querySelector('.nav-links button[data-nav="mesresultats"]').classList.add('active');
  else document.querySelector('.nav-links button[data-nav="home"]').classList.add('active');
}
document.getElementById('chap-back').addEventListener('click',()=>{
  showView('view-niveau'); setActiveTopnav(currentLevel);
});
/* Menus déroulants de la navigation (S'entraîner, Outils prof) : un clic ouvre/ferme, un clic
   ailleurs referme. Sur mobile, ils restent toujours dépliés (voir styles.css). */
function toggleNavDropdown(id){
  const el = document.getElementById(id);
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.nav-dropdown.open').forEach(d=>d.classList.remove('open'));
  if(!wasOpen) el.classList.add('open');
}
document.addEventListener('click', (e)=>{
  if(!e.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown.open').forEach(d=>d.classList.remove('open'));
});

/* ======================= NIVEAU RENDER ======================= */
function renderNiveau(lvl){
  document.getElementById('niveau-title').textContent = 'Progression de '+lvl;
  const data = lvl==='6e'?CH6:CH5;
  renderTheme(data);
  renderFrise(data, lvl);
}
function renderTheme(data){
  const order=['N','G','D','P','M'];
  let html='';
  order.forEach(cat=>{
    const items = data.filter(c=>c.cat===cat);
    if(!items.length) return;
    html += `<div class="cat-block">
      <span class="cat-label" style="background:${CATS[cat].bg};color:${CATS[cat].text};">
        <span class="cat-dot" style="background:${CATS[cat].text};color:${CATS[cat].bg};">${cat}</span>${CATS[cat].label}
      </span>
      <div class="chap-grid">`;
    items.forEach(c=>{
      const ready = !!DEMO_REGISTRY[c.t];
      html += `<div class="chap-card ${ready?'ready':''}" style="border-left-color:${CATS[cat].text}" data-code="${c.code}" data-cat="${c.cat}" data-t="${c.t}" data-p="${c.p}" data-s="${c.s}" data-d="${c.d}">
        ${ready?'':'<span class="status">à venir</span>'}
        <div class="code">${c.code} · ch. ${c.n}</div>
        <div class="titre">${c.t}</div>
        <div class="meta"><span>p. ${c.p}</span><span>${c.s} sem.</span></div>
      </div>`;
    });
    html += `</div></div>`;
  });
  const box=document.getElementById('niveau-theme');
  box.innerHTML=html;
  box.querySelectorAll('.chap-card').forEach(card=>{
    card.addEventListener('click',()=>{
      openChapitre({code:card.dataset.code,cat:card.dataset.cat,t:card.dataset.t,p:card.dataset.p,s:card.dataset.s,d:card.dataset.d});
    });
  });
}
const FR_MONTHS = {jan:0,'fév':1,mars:2,avr:3,mai:4,juin:5,juil:6,'août':7,sept:8,oct:9,nov:10,'déc':11};
const FRISE_YEAR_START = 2026; // année civile du mois de septembre de cette progression
function friseEndDate(dStr){
  if(!dStr || dStr==='POST') return null;
  const parts = dStr.replace('→','-').split('-');
  const last = parts[parts.length-1].trim();
  const m = last.match(/(\d+)\s*([a-zA-Zéû]+)/);
  if(!m) return null;
  const day = parseInt(m[1],10);
  const key = m[2].toLowerCase();
  let monIdx = null;
  for(const k in FR_MONTHS){ if(key.startsWith(k) || k.startsWith(key.slice(0,3))){ monIdx=FR_MONTHS[k]; break; } }
  if(monIdx===null) return null;
  const year = monIdx>=8 ? FRISE_YEAR_START : FRISE_YEAR_START+1;
  return new Date(year, monIdx, day, 23, 59, 59);
}
function renderFrise(data, lvl){
  let html = '<div class="timeline">';
  const vac = VACANCES[lvl];
  const now = new Date();
  data.forEach((c,i)=>{
    const endDate = friseEndDate(c.d);
    const done = endDate && endDate < now;
    html += `<div class="tl-item${done?' tl-done':''}" data-code="${c.code}" data-cat="${c.cat}" data-t="${c.t}" data-p="${c.p}" data-s="${c.s}" data-d="${c.d}">
      <span class="dot" style="background:${CATS[c.cat].text}"></span>
      <span class="titre">${c.t}</span>
      <span class="dates">${c.code} · ${c.d}</span>
      ${done?'<span class="tl-check" title="Chapitre déjà traité">✓</span>':''}
    </div>`;
    const v = vac.find(v=>v.after===c.n);
    if(v) html += `<div class="tl-vac">${v.label}</div>`;
  });
  html += '</div>';
  const box=document.getElementById('niveau-frise');
  box.innerHTML=html;
  box.querySelectorAll('.tl-item').forEach(card=>{
    card.addEventListener('click',()=>{
      openChapitre({code:card.dataset.code,cat:card.dataset.cat,t:card.dataset.t,p:card.dataset.p,s:card.dataset.s,d:card.dataset.d});
    });
  });
}
document.querySelectorAll('.view-toggle button').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('.view-toggle button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const v = b.getAttribute('data-view');
    document.getElementById('niveau-theme').style.display = v==='theme'?'block':'none';
    document.getElementById('niveau-frise').style.display = v==='frise'?'block':'none';
  });
});

/* ======================= CHAPITRE ======================= */
const DEMO_REGISTRY = {};
let currentChapterTitle = null;

function openChapitre(c, tab, lvlOverride){
  const lvl = lvlOverride || currentLevel;
  const chapView = document.getElementById('view-chapitre');
  chapView.classList.toggle('lvl-6e', lvl==='6e');
  chapView.classList.toggle('lvl-5e', lvl==='5e');
  const demo = DEMO_REGISTRY[c.t];
  currentChapterTitle = c.t;
  document.getElementById('chap-code-tag').textContent = c.code;
  document.getElementById('chap-code-tag').style.background = CATS[c.cat].bg;
  document.getElementById('chap-code-tag').style.color = CATS[c.cat].text;
  document.getElementById('chap-title').textContent = c.t;
  document.getElementById('chap-meta').textContent = `pages ${c.p} · ${c.s} semaine(s) · ${c.d}`;

  const allIds = new Set();
  Object.values(DEMO_REGISTRY).forEach(d=>{ allIds.add(d.cours); allIds.add(d.methode); allIds.add(d.exos); if(d.histoire) allIds.add(d.histoire); });
  allIds.forEach(id=>{ const el=document.getElementById(id); if(el) el.style.display='none'; });
  document.getElementById('cours-generic').style.display = demo?'none':'block';
  document.getElementById('methode-generic').style.display = demo?'none':'block';
  document.getElementById('exos-generic').style.display = demo?'none':'block';
  document.getElementById('histoire-generic').style.display = (demo && demo.histoire) ? 'none' : 'block';
  if(demo){
    document.getElementById(demo.cours).style.display='block';
    document.getElementById(demo.methode).style.display='block';
    document.getElementById(demo.exos).style.display='block';
    if(demo.histoire) document.getElementById(demo.histoire).style.display='block';
  }

  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  const wantTab = tab||'cours';
  document.querySelector(`.tab-btn[data-tab="${wantTab}"]`).classList.add('active');
  document.getElementById('panel-'+wantTab).classList.add('active');

  document.getElementById('quizArea').innerHTML='';
  if(demo) demo.init();
  showView('view-chapitre');
}
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-'+btn.dataset.tab).classList.add('active');
  });
});

/* ---- draggable point demo ---- */
function svgPointFromEvent(svg,evt){
  const pt = svg.createSVGPoint();
  const t = evt.touches?evt.touches[0]:evt;
  pt.x=t.clientX; pt.y=t.clientY;
  const ctm = svg.getScreenCTM().inverse();
  return pt.matrixTransform(ctm);
}
/* A point that belongs to a line/segment is marked with a short perpendicular tick,
   not a dot -- matches French collège convention. */
function setTick(el, cx, cy, angleRad, len){
  len = len||11;
  const dx = Math.cos(angleRad+Math.PI/2)*len/2, dy = Math.sin(angleRad+Math.PI/2)*len/2;
  el.setAttribute('x1',cx-dx); el.setAttribute('y1',cy-dy);
  el.setAttribute('x2',cx+dx); el.setAttribute('y2',cy+dy);
}
/* Code d'égalité de longueur : un trait fin et INCLINÉ par rapport au segment (convention du
   petit trait oblique), pour ne jamais ressembler à une marque de point (qui, elle, est perpendiculaire). */
function setSlantTick(el, cx, cy, angleRad, len){
  len = len||14;
  const tilt = angleRad + 65*Math.PI/180;
  const dx = Math.cos(tilt)*len/2, dy = Math.sin(tilt)*len/2;
  el.setAttribute('x1',cx-dx); el.setAttribute('y1',cy-dy);
  el.setAttribute('x2',cx+dx); el.setAttribute('y2',cy+dy);
}
/* Registre des démonstrations géométriques pas-à-pas (équerre/règle/réquerre) : chaque chapitre
   y enregistre ses figures pour que l'ajout au cahier puisse reconstituer TOUTES les étapes
   en vignettes côte à côte, plutôt que de figer uniquement l'étape actuellement affichée. */
window.GEO_STEP_DEMOS = window.GEO_STEP_DEMOS || {};
function registerGeoStepDemo(svgId, config){ window.GEO_STEP_DEMOS[svgId] = config; }
/* Même principe que registerGeoStepDemo, mais pour une "scène" mixte (SVG + image HTML
   superposée en CSS, comme les figures du rapporteur) plutôt qu'un simple <svg> isolé.
   config attend : { steps():Array, getIdx():number, goto(i), capture(i):Promise<dataURI> }
   -- capture(i) doit renvoyer une image de TOUTE la scène à l'étape i (voir arCaptureRapporteurScene). */
window.SCENE_STEP_DEMOS = window.SCENE_STEP_DEMOS || {};
function registerSceneStepDemo(sceneId, config){ window.SCENE_STEP_DEMOS[sceneId] = config; }
async function captureSceneFilmstrip(steps, gotoFn, captureFn, originalIdx){
  const panels = [];
  for(let i=0;i<steps.length;i++){
    gotoFn(i);
    const dataUri = await captureFn(i);
    const imgTag = dataUri
      ? `<img src="${dataUri}" style="width:260px;height:auto;border-radius:6px;border:1px solid rgba(28,43,57,.12);flex:none;display:block;" alt="Étape ${i+1}"/>`
      : `<div style="width:260px;height:150px;flex:none;background:#f2f2f2;border-radius:6px;border:1px solid rgba(28,43,57,.12);"></div>`;
    panels.push(`<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
      ${imgTag}
      <div style="font-size:.8rem;color:var(--ink-soft);line-height:1.4;"><b>Étape ${i+1}.</b> ${steps[i].note}</div>
    </div>`);
  }
  gotoFn(originalIdx);
  return `<div style="display:flex;flex-direction:column;gap:14px;">${panels.join('')}</div>`;
}
/* Convertit un SVG en image PNG (data URI), rastérisée à une taille en pixels fixe
   et explicite (plutôt que de compter sur un <img> pour redimensionner un SVG, ce
   qu'html2canvas gère de façon peu fiable -- images énormes, tronquées ou absentes). */
/* Copie, sous forme d'attribut style inline, l'apparence RÉELLEMENT appliquée (via CSS calculé)
   de chaque élément du SVG en direct vers son clone -- indispensable car les classes CSS
   externes (ex. .vertex-handle{fill:transparent} pour les poignées de glisser-déposer, invisibles
   au repos) ne sont pas incluses quand le SVG est sérialisé et rendu isolément comme une image :
   sans ça, ces éléments retombent sur le remplissage noir par défaut du SVG. */
function inlineComputedStyles(liveRoot, cloneRoot){
  const props = ['fill','stroke','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin',
    'opacity','fill-opacity','stroke-opacity','font-family','font-size','font-weight','text-anchor'];
  const liveEls = [liveRoot, ...liveRoot.querySelectorAll('*')];
  const cloneEls = [cloneRoot, ...cloneRoot.querySelectorAll('*')];
  const n = Math.min(liveEls.length, cloneEls.length);
  for(let i=0;i<n;i++){
    let cs;
    try{ cs = getComputedStyle(liveEls[i]); } catch(e){ continue; }
    let extra = '';
    props.forEach(p=>{
      const val = cs.getPropertyValue(p);
      if(val) extra += `${p}:${val};`;
    });
    const existing = cloneEls[i].getAttribute('style') || '';
    cloneEls[i].setAttribute('style', existing + ';' + extra);
  }
}
/* Convention d'impression pour les points d'une figure (voir aussi setTick/setCross) :
   - un sommet de polygone/triangle ne se marque pas d'un point (l'intersection des côtés suffit) ;
   - une extrémité, une origine ou un point sur une droite se marque d'une petite croix.
   Les points concernés portent l'attribut data-marker="hidden" ou "cross" dans le SVG source ;
   cette fonction les transforme juste avant la rastérisation (elle ne touche jamais à la version
   interactive à l'écran, seulement au clone utilisé pour le cahier/PDF). */
function applyPrintMarkers(clone){
  clone.querySelectorAll('[data-marker]').forEach(el=>{
    const role = el.getAttribute('data-marker');
    if(role === 'hidden'){ el.remove(); return; }
    if(role === 'cross'){
      const style = el.getAttribute('style') || '';
      const isInvisible = /display\s*:\s*none/.test(style) || /opacity\s*:\s*0(?:[^.\d]|$)/.test(style) || el.getAttribute('opacity')==='0';
      if(isInvisible){ el.remove(); return; }
      const cx = parseFloat(el.getAttribute('cx')||0);
      const cy = parseFloat(el.getAttribute('cy')||0);
      const color = el.getAttribute('fill') || '#1C1B2E';
      const size = 6;
      const g = document.createElementNS('http://www.w3.org/2000/svg','g');
      g.innerHTML = `<line x1="${cx-size}" y1="${cy-size}" x2="${cx+size}" y2="${cy+size}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>`
        + `<line x1="${cx-size}" y1="${cy+size}" x2="${cx+size}" y2="${cy-size}" stroke="${color}" stroke-width="1.6" stroke-linecap="round"/>`;
      el.replaceWith(g);
    }
  });
}
function svgToRasterDataUri(svgEl, displayWidth){
  return new Promise((resolve)=>{
    const vbAttr = svgEl.getAttribute('viewBox');
    const vbParts = vbAttr ? vbAttr.trim().split(/\s+/).map(Number) : [0,0,400,240];
    const vbW = vbParts[2] || 400, vbH = vbParts[3] || 240;
    const clone = svgEl.cloneNode(true);
    if(document.contains(svgEl)){
      try{ inlineComputedStyles(svgEl, clone); } catch(e){ console.error('svgToRasterDataUri: échec figement des styles', e); }
    } // sinon (figure statique déjà détachée) : ses attributs littéraux sont fiables tels quels --
      // les calculer via getComputedStyle sur un nœud détaché résoudrait mal les variables CSS et
      // écraserait les bonnes valeurs par des valeurs par défaut.
    try{ applyPrintMarkers(clone); } catch(e){ console.error('svgToRasterDataUri: échec transformation des marqueurs', e); }
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
    clone.removeAttribute('style');
    clone.setAttribute('width', vbW);
    clone.setAttribute('height', vbH);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    let svgDataUri;
    try{
      const svgString = new XMLSerializer().serializeToString(clone);
      svgDataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    } catch(e){ console.error('svgToRasterDataUri: échec de sérialisation', e); resolve(null); return; }
    const img = new Image();
    const scale = 2; // netteté sur écrans haute densité / impression
    const displayHeight = displayWidth * (vbH / vbW);
    img.onload = () => {
      try{
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(displayWidth*scale);
        canvas.height = Math.round(displayHeight*scale);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        if('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      } catch(e){ console.error('svgToRasterDataUri: échec de rastérisation', e); resolve(null); }
    };
    img.onerror = (e) => { console.error('svgToRasterDataUri: échec de chargement de l\'image SVG', e); resolve(null); };
    img.src = svgDataUri;
  });
}
async function captureGeoFilmstrip(svgEl, steps, gotoFn, originalIdx){
  const panels = [];
  for(let i=0;i<steps.length;i++){
    gotoFn(i, false);
    const dataUri = await svgToRasterDataUri(svgEl, 170);
    const imgTag = dataUri
      ? `<img src="${dataUri}" style="width:170px;height:auto;border-radius:6px;border:1px solid rgba(28,43,57,.12);flex:none;display:block;" alt="Étape ${i+1}"/>`
      : `<div style="width:170px;height:100px;flex:none;background:#f2f2f2;border-radius:6px;border:1px solid rgba(28,43,57,.12);"></div>`;
    panels.push(`<div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
      ${imgTag}
      <div style="font-size:.8rem;color:var(--ink-soft);line-height:1.4;"><b>Étape ${i+1}.</b> ${steps[i].note}</div>
    </div>`);
  }
  gotoFn(originalIdx, false);
  return `<div style="display:flex;flex-direction:column;gap:14px;">${panels.join('')}</div>`;
}

function makeStepDemo(steps, displayId){
  let idx = 0;
  function render(){
    const el = document.getElementById(displayId);
    if(!el) return;
    el._stepDemoSteps = steps; // permet à l'ajout au cahier de reconstituer toutes les étapes, pas juste l'étape affichée
    const atEnd = idx === steps.length-1;
    const lines = steps.slice(0, idx+1).map((s,i)=>{
      const isFinal = atEnd && i===idx;
      return `<div class="${isFinal?'step-final':''}">${s.expr}</div>`;
    }).join('');
    el.innerHTML = `<div class="step-column">${lines}</div><div class="step-note">${steps[idx].note}</div>`;
    renderStaticMath(el);
  }
  return {
    next(){ if(idx<steps.length-1) idx++; render(); },
    reset(){ idx=0; render(); },
    render,
  };
}
function rotateAroundPoint(p, center, angleDeg){
  const a = angleDeg*Math.PI/180;
  const dx=p.x-center.x, dy=p.y-center.y;
  return {x:center.x+dx*Math.cos(a)-dy*Math.sin(a), y:center.y+dx*Math.sin(a)+dy*Math.cos(a)};
}
function setCross(el1,el2,cx,cy,size){
  size=size||6;
  el1.setAttribute('x1',cx-size); el1.setAttribute('y1',cy-size); el1.setAttribute('x2',cx+size); el1.setAttribute('y2',cy+size);
  el2.setAttribute('x1',cx-size); el2.setAttribute('y1',cy+size); el2.setAttribute('x2',cx+size); el2.setAttribute('y2',cy-size);
}

/* ---- 2.A : symétrique d'une droite (dynamique) ---- */
async function callClaude(userPrompt, maxTokens, meta){
  const { data:{ session } } = await sb.auth.getSession();
  if(!session) throw new Error('no-session');
  const res = await fetch(SUPABASE_URL+'/functions/v1/ai-proxy', {
    method:'POST',
    headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
    body: JSON.stringify({ prompt: userPrompt, maxTokens: maxTokens||800, feature:(meta&&meta.feature)||null, chapitre:(meta&&meta.chapitre)||null, niveau:(meta&&meta.niveau)||null }),
  });
  const data = await res.json();
  if(data.error) throw new Error(data.error);
  return data.text || '';
}

/* ---- quiz demo (static, standing in for the future AI call) ---- */
const DEMO_QUIZZES = {};
let currentQuizBank = null;
function renderQuizHTML(bank, prefixHtml){
  const area=document.getElementById('quizArea');
  currentQuizBank = bank;
  let html = prefixHtml || '';
  bank.forEach((item,qi)=>{
    html+=`<div class="quiz-q"><div style="font-weight:600;margin-bottom:8px;">${qi+1}. ${item.q}</div>`;
    item.opts.forEach((o,oi)=>{
      html+=`<button class="quiz-opt" onclick="answerQuiz(this,${qi},${oi})">${o}</button>`;
    });
    html+='</div>';
  });
  area.innerHTML=html;
}
function generateDemoQuiz(){
  const bank = DEMO_QUIZZES[currentChapterTitle] || DEMO_QUIZZES['Symétrie centrale'];
  renderQuizHTML(bank, '<p class="hint">Démonstration avec des questions pré-écrites.</p>');
}
async function generateQuiz(){
  const area = document.getElementById('quizArea');
  if(!currentUser){ area.innerHTML = '<p class="hint">Connectez-vous pour générer un quiz par IA — ou essayez la démo pré-écrite ci-dessous.</p>'; return; }
  const content = getVisibleCoursContent();
  const courseText = (content.innerText || content.textContent || '').trim();
  if(!courseText){ area.innerHTML = '<p class="hint">Aucun contenu de cours disponible pour ce chapitre.</p>'; return; }
  area.innerHTML = '<p class="hint">Génération du quiz en cours…</p>';
  const prompt = `Tu es un professeur de mathématiques en collège français. Voici le cours d'un chapitre :

${courseText.slice(0,6000)}

Génère un quiz de 5 questions à choix multiples pour vérifier la compréhension de ce cours, adaptées à son niveau. Chaque question a exactement 3 options, une seule correcte. Réponds UNIQUEMENT avec un tableau JSON valide (sans texte avant ni après, sans balises markdown), au format exact :
[{"q":"...","opts":["...","...","..."],"correct":0}]
Le champ "correct" est l'index (0, 1 ou 2) de la bonne réponse dans "opts".`;
  try{
    const raw = await callClaude(prompt, 1500, {feature:'quiz', chapitre:currentChapterTitle});
    const match = raw.match(/\[[\s\S]*\]/);
    if(!match) throw new Error('no-json');
    const quiz = JSON.parse(match[0]);
    if(!Array.isArray(quiz) || !quiz.length) throw new Error('empty');
    renderQuizHTML(quiz, '<p class="hint">✓ Quiz généré par IA à partir de ce cours.</p>');
  }catch(err){
    area.innerHTML = '<p class="hint">⚠️ Échec de la génération'+(err.message==='no-session'?' (connectez-vous)':'')+'. Réessayez, ou utilisez la démo pré-écrite ci-dessous.</p>';
  }
}
function answerQuiz(btn,qi,oi){
  const parent=btn.parentElement;
  const correct=currentQuizBank[qi].correct;
  parent.querySelectorAll('.quiz-opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===correct) b.classList.add('correct');
    else if(i===oi) b.classList.add('wrong');
  });
}

/* ======================= AUTOMATISMES ======================= */
/* Voir calcul-mental/calcul-mental.js, chargé en fin de page. */


/* ======================= EXPORT DU COURS (PDF réel via html2pdf, sans popup) ======================= */
function getVisibleCoursContent(){
  const panel = document.getElementById('panel-cours');
  for(const child of panel.children){
    if(child.tagName==='DIV' && !child.classList.contains('figure-toolbar') && getComputedStyle(child).display!=='none') return child;
  }
  return panel;
}
async function exportCoursPDF(){
  const hint=document.getElementById('exportHint');
  if(typeof html2pdf==='undefined'){ hint.textContent="La bibliothèque PDF n'a pas pu se charger (pas de connexion internet ?) — utilisez Ctrl/Cmd+P pour imprimer à la place."; return; }
  const content = getVisibleCoursContent();
  const title = document.getElementById('chap-title').textContent || 'cours';
  const clone = content.cloneNode(true);
  clone.querySelectorAll('.add-to-cahier-btn').forEach(el=>el.remove());
  clone.querySelectorAll('.figure-toolbar').forEach(el=>el.remove());
  clone.querySelectorAll('.interaction-hint').forEach(el=>el.remove());
  await expandStepDemosInClone(clone);
  // Empêche un saut de page de couper une formule en deux (ce qui provoque un chevauchement visuel).
  clone.querySelectorAll('p, li, .def-box, .step-column > div').forEach(el=>{
    if(el.querySelector('.tex')){
      el.style.pageBreakInside='avoid'; el.style.breakInside='avoid';
      el.style.lineHeight='2.2'; // laisse assez de place verticale au numérateur/dénominateur d'une fraction
    }
  });
  // Empêche un saut de page de séparer un titre (ou un badge Règle/Définition) du contenu qui le suit juste après :
  // html2pdf ne "colle" pas fiablement deux éléments voisins avec page-break-before/after, donc on les regroupe
  // physiquement dans un même conteneur, qui lui est traité comme un bloc insécable.
  function glueWithNextSibling(el){
    if(!el || !el.parentNode) return; // déjà déplacé par un regroupement précédent
    if(el.parentNode.classList && el.parentNode.classList.contains('pdf-glue-group')) return;
    const next = el.nextElementSibling;
    if(!next) return;
    const groupDiv = document.createElement('div');
    groupDiv.className = 'pdf-glue-group';
    groupDiv.style.pageBreakInside='avoid'; groupDiv.style.breakInside='avoid';
    el.parentNode.insertBefore(groupDiv, el);
    groupDiv.appendChild(el);
    groupDiv.appendChild(next);
  }
  // Ordre inverse du document : un badge doit d'abord se lier à sa def-box juste après ; ensuite seulement
  // le titre qui précède peut se lier à ce groupe déjà formé (sinon le titre "volerait" le badge en premier,
  // laissant sa def-box orpheline).
  Array.from(clone.querySelectorAll('.lesson-header, .sub-header, .example-title, .def-badge, .prop-badge')).reverse().forEach(glueWithNextSibling);
  // Empêche une figure -- animée à étapes ou simple image -- d'être coupée entre deux pages.
  clone.querySelectorAll('.figure-wrap').forEach(el=>{
    el.style.pageBreakInside='avoid'; el.style.breakInside='avoid';
  });
  // Important : html2canvas rend une page blanche si l'élément capturé est en position fixed/absolute
  // (bug connu). On le garde donc dans le flux normal, juste masqué visuellement par un parent
  // de hauteur nulle et overflow:hidden.
  const clip = document.createElement('div');
  clip.style.cssText='height:0;overflow:hidden;';
  const wrapper = document.createElement('div');
  wrapper.style.cssText='width:700px;background:#fff;padding:20px;font-family:Inter,sans-serif;color:#1C1B2E;';
  wrapper.innerHTML = `<h1 style="font-family:'Space Grotesk',sans-serif;">${title}</h1>` + clone.innerHTML;
  clip.appendChild(wrapper);
  document.body.appendChild(clip);
  hint.textContent='Génération du PDF en cours…';
  html2pdf().set({margin:10, filename:title.replace(/[^\w-]+/g,'_')+'.pdf', html2canvas:{scale:2, useCORS:true, foreignObjectRendering:false}, jsPDF:{unit:'mm',format:'a4'}, pagebreak:{mode:['css','avoid-all']}})
    .from(wrapper).save()
    .then(()=>{ clip.remove(); hint.textContent='PDF téléchargé ✓'; setTimeout(()=>hint.textContent='',4000); })
    .catch(()=>{ clip.remove(); hint.textContent="Échec de la génération dans ce navigateur — essayez Ctrl/Cmd+P pour imprimer à la place."; });
}


/* ======================= OUTIL PROF : rendu maths ======================= */
function katexSpan(expr){
  try{ return katex.renderToString(expr, {throwOnError:false}); }
  catch(e){ return expr; }
}
/* Police italique arrondie pour les variables (x, y, n...), cohérente avec l'aspect du chapitre
   Calcul littéral, sans dépendre du chargement de KaTeX (contrairement à katexSpan, qui peut
   dupliquer visuellement le texte si sa feuille de style ne charge pas -- overkill pour une
   simple lettre isolée). */
/* Rend en LaTeX (via KaTeX) tout élément statique du cours marqué class="tex",
   son contenu texte étant la source LaTeX à afficher (ex. \frac{3}{4}).
   Réutilisable pour n'importe quel chapitre. */
function renderStaticMath(container){
  if(!container) return;
  container.querySelectorAll('.tex').forEach(el=>{
    if(el.dataset.rendered) return;
    el.innerHTML = katexSpan(el.textContent);
    el.dataset.rendered = '1';
  });
}
function cleanExpr(s){
  s = s.replace(/\*/g, '\\times ');
  // Convertit aussi une fraction simple à l'intérieur de l'expression -- nombre/lettre, ou un
  // appel de fonction d'un côté ou des deux (ex. le "1/x" de lim(x,0,1/x), ou "f(x)/x") -- sinon
  // elle resterait en texte brut avec un simple "/" au lieu d'une vraie fraction, une fois
  // passée à KaTeX (qui ne la réinterprète pas après coup).
  const terme = '[a-zA-Z0-9]+(?:\\([^()]*\\))?';
  s = s.replace(new RegExp(`(${terme})/(${terme})`, 'g'), (m,a,b)=>`\\dfrac{${a}}{${b}}`);
  return s;
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
/* Modales "propres" (alerte, confirmation, saisie), pour remplacer les alert()/confirm()/
   prompt() natifs du navigateur -- ceux-ci ont un rendu très daté et ne s'intègrent pas au
   reste du site. Chacune renvoie une Promise, à utiliser avec await. */
function niceModal({message, showInput, inputValue, buttons}){
  return new Promise(resolve=>{
    const overlay = document.getElementById('niceModalOverlay');
    document.getElementById('niceModalMessage').textContent = message;
    const input = document.getElementById('niceModalInput');
    input.style.display = showInput ? 'block' : 'none';
    input.value = inputValue||'';
    const btnBox = document.getElementById('niceModalButtons');
    btnBox.innerHTML = '';
    const close = (val)=>{ overlay.style.display='none'; resolve(val); };
    buttons.forEach(b=>{
      const btn = document.createElement('button');
      btn.className = 'btn'+(b.secondary?' secondary':'');
      btn.textContent = b.label;
      btn.onclick = ()=> close(showInput && b.value===true ? input.value : b.value);
      btnBox.appendChild(btn);
    });
    overlay.style.display = 'flex';
    if(showInput){ input.focus(); input.select(); input.onkeydown = (e)=>{ if(e.key==='Enter') close(input.value); }; }
  });
}
function niceAlert(message){
  return niceModal({message, buttons:[{label:'OK', value:true}]});
}
function niceConfirm(message){
  return niceModal({message, buttons:[{label:'Annuler', value:false, secondary:true},{label:'Confirmer', value:true}]});
}
function nicePrompt(message, defaultValue){
  return niceModal({message, showInput:true, inputValue:defaultValue, buttons:[{label:'Annuler', value:null, secondary:true},{label:'OK', value:true}]});
}
function renderMathText(raw){
  let text = raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Chaque bloc déjà rendu par KaTeX (fraction, racine, exposant, $...$) est mis de côté
  // derrière un jeton opaque le temps du reste du traitement, pour qu'aucune règle suivante
  // (multiplication, variables) ne vienne s'insérer À L'INTÉRIEUR du LaTeX déjà construit et
  // le casser (c'était le bug de "(5x+3x)/2" : la règle des variables repérait le x à
  // l'intérieur de \frac{5x+3x}{2} et y insérait une balise, rendant le LaTeX illisible pour KaTeX).
  const protectedBlocks = [];
  function protect(html){ protectedBlocks.push(html); return `\u0000${protectedBlocks.length-1}\u0000`; }

  // 0) mini mise en forme : **gras** et {{couleur|texte}}
  const COLOR_MAP={rouge:'#D93025',bleu:'#1F3A5C',vert:'#2C5A2E',orange:'#E35D3A'};
  text = text.replace(/\*\*([^*]+)\*\*/g, (m,inner)=>`<b>${inner}</b>`);
  text = text.replace(/\{\{(rouge|bleu|vert|orange)\|([^}]+)\}\}/g, (m,c,inner)=>`<span style="color:${COLOR_MAP[c]}">${inner}</span>`);

  // 1) explicit LaTeX between $...$
  text = text.replace(/\$([^$]+)\$/g, (m,expr)=>protect(katexSpan(expr)));
  // 2) sqrt(...) -- processed before fractions so "sqrt(2)/3" isn't mistaken for a fraction
  text = text.replace(/sqrt\(([^()]+)\)/g, (m,inner)=>protect(katexSpan(`\\sqrt{${cleanExpr(inner)}}`)));
  // 3) fractions with a parenthesised expression on one or both sides: (2*2)/(3*2), (2+1)/4, 3/(1+2)
  text = text.replace(/\(([^()]+)\)\/\(([^()]+)\)/g, (m,a,b)=>protect(katexSpan(`\\dfrac{${cleanExpr(a)}}{${cleanExpr(b)}}`)));
  text = text.replace(/\(([^()]+)\)\/(\d+(?:[.,]\d+)?)/g, (m,a,b)=>protect(katexSpan(`\\dfrac{${cleanExpr(a)}}{${b.replace(',','.')}}`)));
  text = text.replace(/(\d+(?:[.,]\d+)?)\/\(([^()]+)\)/g, (m,a,b)=>protect(katexSpan(`\\dfrac{${a.replace(',','.')}}{${cleanExpr(b)}}`)));
  // 4) plain fractions a/b (integers or decimals) -- traité avant la règle avec appel de
  // fonction ci-dessous, pour qu'un nombre décimal (ex. 3.5/4) soit capturé en entier d'abord,
  // plutôt que de laisser cette dernière n'en voler qu'un morceau (ex. juste "5/4").
  text = text.replace(/(\d+(?:[.,]\d+)?)\/(\d+(?:[.,]\d+)?)/g, (m,a,b)=>protect(katexSpan(`\\dfrac{${a.replace(',','.')}}{${b.replace(',','.')}}`)));
  // 4bis) fractions avec un appel de fonction d'un côté ou des deux (ex. f(x+3)/x, x/g(x)) --
  // même logique que cleanExpr, appliquée ici au texte libre (pas seulement à l'intérieur de sqrt()).
  {
    const terme = '[a-zA-Z][a-zA-Z0-9]*\\([^()]*\\)|[a-zA-Z0-9]+';
    text = text.replace(new RegExp(`(${terme})\\/(${terme})`, 'g'), (m,a,b)=>protect(katexSpan(`\\dfrac{${a}}{${b}}`)));
  }
  // 5) exponents  base^exp  (exp = digits or {...})
  text = text.replace(/([A-Za-z0-9\)\]])\^(-?\d+(?:[.,]\d+)?|\{[^}]+\})/g, (m,base,exp)=>{
    const e = exp.startsWith('{') ? exp.slice(1,-1) : exp;
    return protect(katexSpan(`${base}^{${e}}`));
  });
  // 6) astérisque isolé restant (hors fractions/racines/exposants déjà traités ci-dessus,
  //    et hors ** de gras déjà consommé) : c'est une multiplication, simple signe ×.
  text = text.replace(/\*/g, '×');
  // 7) variable (x, y, z, n, k, t...) ou lettre majuscule isolée (A, B, E... utilisée pour nommer
  //    une expression ou un point, comme partout ailleurs sur le site), isolée ou précédée d'un
  //    coefficient collé (5x, 12y, 2,5x... = multiplication implicite, notation mathématique
  //    standard). Rendu par le MÊME moteur KaTeX que les fractions (protégé de la même façon),
  //    pour garantir exactement la même police, taille et graisse partout -- mélanger KaTeX pour
  //    les fractions et une simple police italique pour le reste donnait des tailles/styles
  //    incohérents d'une ligne à l'autre.
  text = text.replace(/\b(\d+(?:[.,]\d+)?)?([xyznktA-Z])\b/g, (m,digits,letter)=>{
    const expr = digits ? `${digits.replace(',','.')}${letter}` : letter;
    return protect(katexSpan(expr));
  });
  text = text.replace(/\n/g,'<br>');
  // on restitue les blocs protégés
  text = text.replace(/\u0000(\d+)\u0000/g, (m,i)=>protectedBlocks[+i]);
  return text;
}
/* Mise en page de l'outil de correction : mêmes lignes/colonnes glissables-déposables que dans
   le module évaluation (contexte 'global'), avec un bouton Valider qui cache la barre d'outils
   et les pointillés d'édition une fois la correction terminée -- pour un écran plus lisible en
   cours, sans perdre la possibilité de revenir éditer. */
let corRows = [1];
let corValidated = false;
/* Comme dans le module Évaluation (qui n'a pas de grand rectangle de saisie sous le titre --
   juste les blocs), la zone de texte libre peut être retirée pour ne garder que les blocs
   insérés. Réversible via le bouton "+ Zone de texte libre" qui réapparaît à sa place. */
function corRemoveTextarea(){
  document.getElementById('correctionInputWrap').style.display = 'none';
  document.getElementById('btnCorAddTextarea').style.display = 'inline-flex';
  renderCorrectionPreview();
}
function corAddTextarea(){
  document.getElementById('correctionInputWrap').style.display = 'block';
  document.getElementById('btnCorAddTextarea').style.display = 'none';
  renderCorrectionPreview();
}
function corSetRowCols(rowIdx, n){
  corRows[rowIdx] = Math.max(1, Math.min(6, parseInt(n)||1));
  renderCorrectionPreview();
}
function corAddRow(){
  corRows.push(1);
  renderCorrectionPreview();
}
function corRemoveRow(rowIdx){
  if(corRows.length<=1) return;
  // Les blocs de la ligne retirée rejoignent la ligne précédente, pour ne pas les perdre.
  (blocksStores['global']||[]).forEach(b=>{
    const r = b.row||0;
    if(r===rowIdx) b.row = Math.max(0, rowIdx-1);
    else if(r>rowIdx) b.row = r-1;
  });
  corRows.splice(rowIdx,1);
  renderCorrectionPreview();
}
function corToggleValidated(){
  corValidated = !corValidated;
  const btn = document.getElementById('btnCorValidate');
  btn.textContent = corValidated ? '✏️ Éditer' : '✓ Valider';
  btn.style.background = corValidated ? 'rgba(31,58,92,.08)' : 'rgba(35,140,90,.12)';
  btn.style.color = corValidated ? '#1F3A5C' : '#1F7A4D';
  document.getElementById('corLayoutRow').style.display = corValidated ? 'none' : 'flex';
  document.getElementById('corToolsRow').style.display = corValidated ? 'none' : 'flex';
  // le bouton Valider/Éditer lui-même doit rester visible même caché des deux rangées ci-dessus
  if(corValidated){
    document.getElementById('correctionPreview').insertAdjacentElement('afterend', btn);
  } else {
    document.getElementById('corLayoutRow').appendChild(btn);
  }
  renderCorrectionPreview();
}
function corRenderRowsControls(){
  document.getElementById('corRowsControls').innerHTML = corRows.map((n,i)=>`
    <span class="hint" style="margin:0 4px 0 8px;">L${i+1} : <input type="number" value="${n}" min="1" max="6" onchange="corSetRowCols(${i},this.value)" style="width:40px;"></span>
    ${corRows.length>1 ? `<button type="button" onclick="corRemoveRow(${i})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:5px;padding:2px 6px;cursor:pointer;font-size:.75rem;">✕</button>` : ''}
  `).join('');
}
function renderCorrectionPreview(){
  const textareaVisible = document.getElementById('correctionInputWrap').style.display !== 'none';
  const raw = textareaVisible ? document.getElementById('correctionInput').value : '';
  const rendered = raw.trim() ? renderMathText(raw) : '';
  const previewHtml = rendered || (textareaVisible ? '<span class="hint">L\'aperçu de la correction (mise en forme automatique) apparaît ici au fur et à mesure de la saisie.</span>' : '');
  const cleanBlocks = blocksRowsHTML('global', corRows, false, corCellBorders);
  document.getElementById('correctionPreview').innerHTML = corHeaderHTML() + previewHtml + (corValidated ? cleanBlocks : blocksRowsHTML('global', corRows, true, corCellBorders));
  updateProjectionWindow(rendered + cleanBlocks);
  corRenderRowsControls();
  attachResizeObservers();
}
/* En-tête (titre de l'exercice, n° d'exercice, date) : rempli par le professeur dans le
   formulaire, il doit être visible des élèves au même titre que la correction elle-même. */
function corHeaderHTML(){
  const titre = (document.getElementById('corTitre')?.value || '').trim();
  const exo = (document.getElementById('corExoNum')?.value || '').trim();
  const date = document.getElementById('corDate')?.value || '';
  if(!titre && !exo && !date) return '';
  const dateFmt = date ? new Date(date+'T00:00:00').toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long'}) : '';
  const parts = [exo, titre].filter(Boolean).join(' — ');
  return `<div class="cor-header">
    ${dateFmt ? `<div class="cor-header-date">${escapeHtml(dateFmt)}</div>` : ''}
    ${parts ? `<div class="cor-header-title">${escapeHtml(parts)}</div>` : ''}
  </div>`;
}
/* Fenêtre de projection : une vraie fenêtre de navigateur séparée (pas juste un agrandissement
   dans la page), à faire glisser sur un second écran / vidéoprojecteur, et librement
   redimensionnable -- pour ne projeter aux élèves que la correction, jamais l'outil de saisie. */
let ceProjWin = null;
function updateProjectionWindow(html){
  if(!ceProjWin || ceProjWin.closed) return;
  const headEl = ceProjWin.document.getElementById('projHeader');
  if(headEl) headEl.innerHTML = corHeaderHTML();
  const el = ceProjWin.document.getElementById('projContent');
  if(el) el.innerHTML = html;
}
function toggleProjection(){
  const btn = document.getElementById('btnProjection');
  if(ceProjWin && !ceProjWin.closed){
    ceProjWin.close();
    ceProjWin = null;
    btn.textContent = '🖥️ Ouvrir la fenêtre de projection';
    return;
  }
  ceProjWin = window.open('', 'atelierMathsProjection', 'width=1100,height=720,resizable=yes');
  if(!ceProjWin){ alert("La fenêtre n'a pas pu s'ouvrir : autorisez les pop-up pour ce site."); return; }
  ceProjWin.document.open();
  ceProjWin.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Correction -- projection</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
    <link rel="stylesheet" href="${document.querySelector('link[href*="styles.css"]').href}">
    <style>
      html,body{margin:0;padding:0;background:#FFFFFF;height:100%;}
      body{padding:4vw 5vw;box-sizing:border-box;}
      #projHeader{font-family:'Space Grotesk',Arial,sans-serif;margin-bottom:1.4vw;}
      #projHeader .cor-header-title{font-weight:700;font-size:clamp(1.1rem, 2.2vw, 1.8rem);color:#0C5BA0;}
      #projHeader .cor-header-date{font-size:clamp(.85rem, 1.4vw, 1.1rem);color:#5B6472;margin-top:.2em;text-transform:capitalize;}
      #projContent{
        font-family:'Space Grotesk',Arial,sans-serif;color:#20242E;
        font-size:clamp(1.6rem, 4.2vw, 3.4rem);line-height:1.7;font-weight:400;
        max-width:100%;text-align:left;
      }
      #projContent .hint{color:#9aa0a8;font-weight:400;}
      #projContent b{color:#0C5BA0;}
      .katex{font-size:1.18em;}
    </style>
  </head><body><div id="projHeader"></div><div id="projContent"></div></body></html>`);
  ceProjWin.document.close();
  renderCorrectionPreview();
  btn.textContent = '✖️ Fermer la fenêtre de projection';
  const watcher = setInterval(()=>{
    if(!ceProjWin || ceProjWin.closed){
      clearInterval(watcher);
      ceProjWin = null;
      btn.textContent = '🖥️ Ouvrir la fenêtre de projection';
    }
  }, 800);
}
function wrapSelection(before, after){
  const ta = document.getElementById('correctionInput');
  const start = ta.selectionStart, end = ta.selectionEnd;
  const val = ta.value;
  const selected = val.slice(start,end) || 'texte';
  ta.value = val.slice(0,start) + before + selected + after + val.slice(end);
  ta.focus();
  ta.selectionStart = start + before.length;
  ta.selectionEnd = start + before.length + selected.length;
  renderCorrectionPreview();
}
function applyBold(){ wrapSelection('**','**'); }
function applyColor(color){ wrapSelection('{{'+color+'|','}}'); }

/* ---- mini outil de figure géométrique ---- */
let figState = {points:[], shapes:[], mode:'point', selected:[], refShape:null, nextLabel:0};
/* Contenu joint (figures, tableaux, divisions, axes...) : un TABLEAU de blocs indépendants par
   CONTEXTE plutôt qu'une seule liste globale, pour que les mêmes 7 outils (figure, tableau,
   division, division décimale, axe, repère, disque, rectangle) servent aussi bien à l'outil de
   correction ('global') qu'à chaque exercice d'une évaluation ('ex-<id>'). editFn (facultatif)
   est le nom d'une fonction qui rouvre l'outil correspondant, pré-rempli avec les données
   d'origine (data), pour "modifier" un bloc : on supprime alors l'ancien bloc et on rouvre le
   panneau, prêt à être réinséré une fois ajusté. */
let blocksStores = { global: [] };
let pendingBlockNextId = 1;
let currentBlocksContext = 'global'; // contexte ciblé par le PROCHAIN outil qu'on ouvre
function setToolContext(ctx){ currentBlocksContext = ctx; if(!blocksStores[ctx]) blocksStores[ctx]=[]; }
function renderBlocksContext(ctx){
  if(ctx==='global'){ if(typeof renderCorrectionPreview==='function') renderCorrectionPreview(); }
  else if(typeof renderEvalExercicesList==='function') renderEvalExercicesList();
}
function addPendingBlock(type, html, data, editFn){
  const ctx = currentBlocksContext;
  const ex = getExerciseByCtx(ctx);
  const row = (ex && ex.rows && ex.rows.length) ? ex.rows.length-1 : 0;
  (blocksStores[ctx] || (blocksStores[ctx]=[])).push({id: pendingBlockNextId++, type, html, data, editFn, ctx, col:0, row});
  renderBlocksContext(ctx);
}
function removeBlock(id, ctx){
  ctx = ctx || currentBlocksContext;
  blocksStores[ctx] = (blocksStores[ctx]||[]).filter(b=>b.id!==id);
  renderBlocksContext(ctx);
}
function editBlock(id, ctx){
  ctx = ctx || currentBlocksContext;
  const arr = blocksStores[ctx]||[];
  const b = arr.find(x=>x.id===id);
  if(!b || !b.editFn) return;
  blocksStores[ctx] = arr.filter(x=>x.id!==id);
  currentBlocksContext = ctx;
  window[b.editFn](b.data);
  renderBlocksContext(ctx);
}
/* withControls=true : version affichée au professeur, avec les boutons ✏️/✕ (jamais montrée
   aux élèves). withControls=false : version "propre", envoyée à la fenêtre de projection,
   enregistrée dans le cahier, ou imprimée dans la feuille d'évaluation. */
/* Retrouve l'exercice d'évaluation correspondant à un contexte de blocs ("ex-<id>"), pour
   pouvoir appliquer son réglage manuel de taille de disques. Renvoie null pour les autres
   contextes (ex. l'outil de correction, contexte "global", qui n'a pas cette notion). */
function getExerciseByCtx(ctx){
  const m = /^ex-(\d+)$/.exec(ctx||'');
  if(!m) return null;
  return evaluationExercises.find(e=>e.id===parseInt(m[1]))||null;
}
function singleBlockHTML(b, ctx, withControls, draggable){
  const sizeStyle = (b.width?`width:${b.width}px;`:'') + (b.height?`height:${b.height}px;`:'');
  const defaultWidth = b.type==='axe' ? 500 : b.type==='repere' ? 340 : b.type==='graph' ? 420 : 260;
  let html = b.html;
  if(b.type==='disque'){
    // Réglage manuel (toujours prioritaire, fiable dans tous les contextes y compris la
    // fenêtre d'impression) : s'il est défini, on l'applique directement dans le HTML.
    const ex = getExerciseByCtx(ctx);
    if(ex && ex.diskSize) html = html.split('max-width:150px').join(`max-width:${ex.diskSize}px`);
  }
  if(b.type==='rectFrac'){
    const ex = getExerciseByCtx(ctx);
    if(ex && ex.rectSize) html = html.split('max-width:180px').join(`max-width:${ex.rectSize}px`);
  }
  if(!withControls){
    return `<div class="nb-figure-row disk-sync-target" data-block-id="${b.id}" data-ctx="${ctx}" data-type="${b.type}"${sizeStyle?` style="${sizeStyle}overflow:hidden;"`:''}>${html}</div>`;
  }
  const dragAttrs = draggable ? `draggable="true" ondragstart="evalDragStart(event,${b.id})"` : '';
  return `<div class="nb-figure-row" ${dragAttrs} style="position:relative;border:1px dashed rgba(28,43,57,.18);border-radius:8px;padding:10px 34px 10px 10px;margin:8px 0;background:#fff;${draggable?'cursor:grab;':''}">
    <div style="position:absolute;top:6px;right:6px;display:flex;gap:4px;z-index:2;">
      ${b.editFn ? `<button type="button" onclick="editBlock(${b.id},'${ctx}')" title="Modifier ce bloc" style="border:none;background:rgba(31,58,92,.08);border-radius:6px;padding:3px 7px;cursor:pointer;font-size:.85rem;">✏️</button>` : ''}
      <button type="button" onclick="removeBlock(${b.id},'${ctx}')" title="Supprimer ce bloc" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 7px;cursor:pointer;font-size:.85rem;">✕</button>
    </div>
    <div class="resizable-block disk-sync-target" data-block-id="${b.id}" data-ctx="${ctx}" data-type="${b.type}" style="resize:both;overflow:hidden;display:block;max-width:100%;min-width:80px;min-height:50px;${sizeStyle||'width:'+defaultWidth+'px;'}">${html}</div>
  </div>`;
}
function pendingBlocksHTML(withControls, ctx){
  ctx = ctx || 'global';
  const arr = blocksStores[ctx]||[];
  if(!arr.length) return '';
  return arr.map(b=>singleBlockHTML(b, ctx, withControls, false)).join('');
}
/* Rendu en colonnes (glisser-déposer) : utilisé pour structurer un exercice d'évaluation en
   2 ou 3 colonnes (ex. une figure à gauche, l'énoncé à droite). nCols<=1 revient au rendu
   simple habituel. */
let evalDragBlockId = null;
function evalDragStart(e, id){ evalDragBlockId = id; e.dataTransfer.setData('text/plain', String(id)); }
function evalDropInRowCol(e, ctx, rowIndex, colIndex){
  e.preventDefault();
  const arr = blocksStores[ctx]||[];
  const b = arr.find(x=>x.id===evalDragBlockId);
  if(b){ b.row = rowIndex; b.col = colIndex; ctx==='global' ? renderCorrectionPreview() : renderEvalExercicesList(); }
  evalDragBlockId = null;
}
/* Bascule une bordure (haut/droite/bas/gauche) d'une cellule (ligne-colonne) d'un exercice --
   un peu comme un éditeur de tableau où l'on choisit quels bords de cellule apparaissent. */
let corCellBorders = {};
const CELL_BG_COLORS = {rouge:'#D93025', bleu:'#1F3A5C', vert:'#2C5A2E', orange:'#E35D3A'};
function toggleCellBorder(ctx, cellKey, side){
  let borders;
  if(ctx==='global'){
    borders = corCellBorders;
  } else {
    const ex = getExerciseByCtx(ctx);
    if(!ex) return;
    if(!ex.cellBorders) ex.cellBorders = {};
    borders = ex.cellBorders;
  }
  if(!borders[cellKey]) borders[cellKey] = {};
  borders[cellKey][side] = !borders[cellKey][side];
  ctx==='global' ? renderCorrectionPreview() : renderEvalExercicesList();
}
/* Fond coloré d'une zone/colonne -- même palette que {{couleur|texte}}, pour rester cohérent
   avec le reste du site. Cliquer une couleur déjà choisie la retire (case à cocher, pas une
   liste à choix unique imposé). */
function setCellBg(ctx, cellKey, colorKey){
  let borders;
  if(ctx==='global'){
    borders = corCellBorders;
  } else {
    const ex = getExerciseByCtx(ctx);
    if(!ex) return;
    if(!ex.cellBorders) ex.cellBorders = {};
    borders = ex.cellBorders;
  }
  if(!borders[cellKey]) borders[cellKey] = {};
  borders[cellKey].bg = (borders[cellKey].bg===colorKey) ? null : colorKey;
  ctx==='global' ? renderCorrectionPreview() : renderEvalExercicesList();
}
/* Rendu en lignes indépendantes, chacune avec son propre nombre de colonnes (ex. 3 colonnes
   puis 2 colonnes en dessous). rows est un tableau [nColsLigne1, nColsLigne2, ...]. */
function blocksRowsHTML(ctx, rows, withControls, cellBorders){
  cellBorders = cellBorders || {};
  const arr = blocksStores[ctx]||[];
  return rows.map((nCols,rowIdx)=>{
    const rowBlocks = arr.filter(b=>(b.row||0)===rowIdx);
    if(nCols<=1){
      const inner = rowBlocks.map(b=>singleBlockHTML(b, ctx, withControls, true)).join('');
      const key = rowIdx+'-0';
      const cb = cellBorders[key] || {};
      if(!withControls){
        const realBorder = (cb.right?'border-right:1.3px solid #1C1B2E;':'') + (cb.bottom?'border-bottom:1.3px solid #1C1B2E;':'') + (cb.left?'border-left:1.3px solid #1C1B2E;':'') + (cb.top?'border-top:1.3px solid #1C1B2E;':'');
        const bgStyle = cb.bg ? `background-color:${CELL_BG_COLORS[cb.bg]}22;border-radius:6px;` : '';
        return `<div style="${(realBorder||bgStyle)?'padding:6px;':''}${realBorder}${bgStyle}margin-bottom:6px;">${inner}</div>`;
      }
      const dropAttrs = `ondragover="event.preventDefault()" ondrop="evalDropInRowCol(event,'${ctx}',${rowIdx},0)"`;
      const mk = (side,icon,title) => `<button type="button" onclick="toggleCellBorder('${ctx}','${key}','${side}')" title="${title}" style="font-size:.62rem;line-height:1;border:1px solid ${cb[side]?'#0D5BA3':'rgba(28,43,57,.25)'};background:${cb[side]?'#0D5BA3':'#fff'};color:${cb[side]?'#fff':'#666'};border-radius:3px;padding:2px 4px;cursor:pointer;">${icon}</button>`;
      const borderBtns = `<div style="position:absolute;bottom:3px;right:3px;display:flex;gap:2px;z-index:2;">${mk('top','▔','Bordure haute')}${mk('right','▕','Bordure droite')}${mk('bottom','▁','Bordure basse')}${mk('left','▏','Bordure gauche')}</div>`;
      const bgSwatches = Object.keys(CELL_BG_COLORS).map(k=>`<button type="button" onclick="setCellBg('${ctx}','${key}','${k}')" title="Fond ${k}" style="width:13px;height:13px;border-radius:50%;border:${cb.bg===k?'2px solid #1C1B2E':'1px solid rgba(28,43,57,.3)'};background:${CELL_BG_COLORS[k]};cursor:pointer;padding:0;"></button>`).join('');
      const bgSwatchesBox = `<div style="position:absolute;bottom:3px;left:3px;display:flex;gap:3px;z-index:2;">${bgSwatches}</div>`;
      const cellBgStyle = cb.bg ? `background-color:${CELL_BG_COLORS[cb.bg]}22;` : '';
      return `<div ${dropAttrs} style="position:relative;min-height:40px;border:1px dashed rgba(28,43,57,.15);border-radius:8px;padding:6px;margin-bottom:6px;background:#fff;${cellBgStyle}">${inner}${borderBtns}${bgSwatchesBox}</div>`;
    }
    const cols = Array.from({length:nCols}, ()=>[]);
    rowBlocks.forEach(b=>{ const c = Math.min(b.col||0, nCols-1); cols[c].push(b); });
    const colsHtml = cols.map((blocksInCol, ci)=>{
      const inner = blocksInCol.map(b=>singleBlockHTML(b, ctx, withControls, true)).join('');
      const key = rowIdx+'-'+ci;
      const cb = cellBorders[key] || {};
      // En édition : le pointillé reste l'indicateur de zone de dépôt, quel que soit le
      // réglage choisi. Dans la version propre (aperçu/export) : les vraies bordures choisies
      // s'appliquent, en trait plein.
      if(!withControls){
        const realBorder = (cb.right?'border-right:1.3px solid #1C1B2E;':'') + (cb.bottom?'border-bottom:1.3px solid #1C1B2E;':'') + (cb.left?'border-left:1.3px solid #1C1B2E;':'') + (cb.top?'border-top:1.3px solid #1C1B2E;':'');
        const bgStyle = cb.bg ? `background-color:${CELL_BG_COLORS[cb.bg]}22;border-radius:6px;` : '';
        return `<div class="eval-col" style="flex:1;min-width:0;padding:${(realBorder||bgStyle)?'6px':'0'};${realBorder}${bgStyle}">${inner}</div>`;
      }
      const dropAttrs = `ondragover="event.preventDefault()" ondrop="evalDropInRowCol(event,'${ctx}',${rowIdx},${ci})"`;
      const mk = (side,icon,title) => `<button type="button" onclick="toggleCellBorder('${ctx}','${key}','${side}')" title="${title}" style="font-size:.62rem;line-height:1;border:1px solid ${cb[side]?'#0D5BA3':'rgba(28,43,57,.25)'};background:${cb[side]?'#0D5BA3':'#fff'};color:${cb[side]?'#fff':'#666'};border-radius:3px;padding:2px 4px;cursor:pointer;">${icon}</button>`;
      const borderBtns = `<div style="position:absolute;bottom:3px;right:3px;display:flex;gap:2px;z-index:2;">${mk('top','▔','Bordure haute')}${mk('right','▕','Bordure droite')}${mk('bottom','▁','Bordure basse')}${mk('left','▏','Bordure gauche')}</div>`;
      const bgSwatches = Object.keys(CELL_BG_COLORS).map(k=>`<button type="button" onclick="setCellBg('${ctx}','${key}','${k}')" title="Fond ${k}" style="width:13px;height:13px;border-radius:50%;border:${cb.bg===k?'2px solid #1C1B2E':'1px solid rgba(28,43,57,.3)'};background:${CELL_BG_COLORS[k]};cursor:pointer;padding:0;"></button>`).join('');
      const bgSwatchesBox = `<div style="position:absolute;bottom:3px;left:3px;display:flex;gap:3px;z-index:2;">${bgSwatches}</div>`;
      const cellBgStyle = cb.bg ? `background-color:${CELL_BG_COLORS[cb.bg]}22;` : '';
      return `<div class="eval-col" ${dropAttrs} style="position:relative;flex:1;min-width:0;min-height:50px;border:1px dashed rgba(28,43,57,.15);border-radius:8px;padding:6px;background:#fff;${cellBgStyle}">${inner}${borderBtns}${bgSwatchesBox}</div>`;
    }).join('');
    return `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:6px;">${colsHtml}</div>`;
  }).join('');
}
/* Barre des 7 outils, réutilisable pour l'outil de correction ou pour un exercice d'évaluation
   -- chaque bouton fixe le contexte visé juste avant d'ouvrir le panneau de l'outil. */
/* Mémorise la taille choisie par le professeur quand il redimensionne un bloc (poignée native
   du navigateur, coin bas-droit), pour que cette taille soit conservée dans l'export/la
   projection -- sinon un redimensionnement ne survivrait pas au prochain rendu. */
function attachResizeObservers(){
  if(!window.ResizeObserver) return;
  document.querySelectorAll('.resizable-block').forEach(el=>{
    if(el.dataset.observed) return;
    el.dataset.observed = '1';
    let first = true;
    new ResizeObserver(entries=>{
      if(first){ first=false; return; } // ignore la mesure initiale (pas un vrai redimensionnement)
      const id = parseInt(el.dataset.blockId), ctx = el.dataset.ctx;
      const arr = blocksStores[ctx]||[];
      const b = arr.find(x=>x.id===id);
      if(b){ b.width = Math.round(entries[0].contentRect.width); b.height = Math.round(entries[0].contentRect.height); }
    }).observe(el);
  });
  syncDiskSizes(document);
}
/* Harmonise le diamètre de tous les disques d'un même exercice (ou de l'outil de correction) sur
   le plus petit d'entre eux, pour un rendu visuellement cohérent quand plusieurs blocs disque
   coexistent. Mesure réelle dans le DOM fourni (root) -- peut être la page d'édition, l'aperçu,
   ou même le document d'une fenêtre d'impression séparée : on y a accès directement depuis ce
   script (même origine), pas besoin que cette fenêtre exécute quoi que ce soit elle-même. */
function syncDiskSizes(root){
  if(!root) return;
  ['disque','rectFrac'].forEach(type=>{
    const contexts = new Set(Object.values(blocksStores).flat().filter(b=>b.type===type).map(b=>b.ctx));
    contexts.forEach(ctx=>{
      const shapeBlocks = (blocksStores[ctx]||[]).filter(b=>b.type===type);
      if(shapeBlocks.length<2) return;
      let minDiam = Infinity;
      shapeBlocks.forEach(b=>{
        const wrap = root.querySelector(`.disk-sync-target[data-block-id="${b.id}"]`);
        if(!wrap) return;
        const svg = wrap.querySelector('svg');
        if(svg){ const w = svg.getBoundingClientRect().width; if(w>0) minDiam = Math.min(minDiam, w); }
      });
      if(minDiam===Infinity) return;
      minDiam = Math.round(minDiam);
      shapeBlocks.forEach(b=>{
        const wrap = root.querySelector(`.disk-sync-target[data-block-id="${b.id}"]`);
        if(!wrap) return;
        wrap.querySelectorAll(':scope > div > div').forEach(d=>{ d.style.maxWidth = minDiam+'px'; });
      });
    });
  });
}
/* Version autonome de la synchronisation des tailles de disques, pour le cahier de corrections
   imprimé : contrairement à syncDiskSizes (qui s'appuie sur blocksStores, donc uniquement la
   correction en cours d'édition), le cahier assemble plusieurs corrections déjà enregistrées
   dont les données de blocs ne sont plus en mémoire au moment de l'impression -- on regroupe
   donc directement par correction affichée dans le DOM (.cahier-print-entry), sans dépendre de
   blocksStores. */
function syncDiskSizesForPrint(root){
  if(!root) return;
  root.querySelectorAll('.cahier-print-entry').forEach(entryEl=>{
    const wraps = entryEl.querySelectorAll('.disk-sync-target');
    if(wraps.length<2) return;
    let minDiam = Infinity;
    wraps.forEach(wrap=>{
      const svg = wrap.querySelector('svg');
      if(svg){ const w = svg.getBoundingClientRect().width; if(w>0) minDiam = Math.min(minDiam, w); }
    });
    if(minDiam===Infinity) return;
    minDiam = Math.round(minDiam);
    wraps.forEach(wrap=>{
      wrap.querySelectorAll(':scope > div > div').forEach(d=>{ d.style.maxWidth = minDiam+'px'; });
    });
  });
}
/* ---- Texte libre (même mise en forme que l'énoncé principal) ---- */
/* Insère un modèle (ex. "somme(n,1,10,n)") à l'endroit du curseur dans la zone de texte, pour
   que le professeur n'ait plus qu'à remplacer les valeurs par défaut. */
function insertMathTemplate(template){
  const ta = document.getElementById('textBlockInput');
  const start = ta.selectionStart, end = ta.selectionEnd;
  ta.value = ta.value.slice(0,start) + template + ta.value.slice(end);
  ta.focus();
  ta.selectionStart = ta.selectionEnd = start + template.length;
  previewTextBlock();
}

/* ---- Éditeur de formule pas à pas -------------------------------------------------------
   Une formule est une structure ARBORESCENTE (pas du texte à analyser après coup). Les
   emplacements "principaux" (racine de la formule, numérateur, dénominateur, expression d'une
   somme/limite/intégrale, contenu d'une racine carrée) sont des SÉQUENCES : plusieurs cases
   mises bout à bout (texte libre et/ou structures imbriquées), pour pouvoir écrire par exemple
   "3x + [fraction]" dans une même case. Les emplacements "secondaires" (bornes d'une somme,
   variable d'une limite, exposant) restent une case unique, cas d'usage bien plus rare pour un
   mélange texte+structure. La conversion en LaTeX final parcourt cet arbre directement -- plus
   besoin de deviner où sont les parenthèses dans du texte brut, la structure EST l'interface. */
function fbNewLeaf(v){ return {type:'leaf', value:v||''}; }
function fbNewSeq(v){ return {type:'seq', items:[fbNewLeaf(v||'')]}; }
function fbNewStruct(kind){
  if(kind==='frac') return {type:'frac', num:fbNewSeq(), den:fbNewSeq()};
  if(kind==='pow') return {type:'pow', base:fbNewLeaf(), exp:fbNewLeaf()};
  if(kind==='sub') return {type:'sub', base:fbNewLeaf(), sub:fbNewLeaf()};
  if(kind==='sqrt') return {type:'sqrt', expr:fbNewSeq()};
  if(kind==='sum') return {type:'sum', from:fbNewLeaf('1'), to:fbNewLeaf('n'), expr:fbNewSeq()};
  if(kind==='int') return {type:'int', from:fbNewLeaf('0'), to:fbNewLeaf('1'), expr:fbNewSeq(), dvar:fbNewLeaf('x')};
  if(kind==='lim') return {type:'lim', dvar:fbNewLeaf('x'), to:fbNewLeaf('0'), expr:fbNewSeq()};
  return fbNewLeaf();
}
let fbRoot = null; // la racine est elle-même une séquence
let fbFocusedPath = null; // chemin (tableau de clés) vers la dernière case texte cliquée
function fbPathToStr(path){ return path.join('|'); }
function fbStrToPath(str){ return str==='' ? [] : str.split('|').map(s=>/^\d+$/.test(s)?parseInt(s):s); }
function openFormulaBuilder(){
  fbRoot = fbNewSeq();
  fbFocusedPath = null;
  document.getElementById('formulaBuilderOverlay').style.display='flex';
  fbRender();
}
function closeFormulaBuilder(){ document.getElementById('formulaBuilderOverlay').style.display='none'; }
function fbGetNode(path){
  let node = fbRoot;
  for(const step of path) node = node[step];
  return node;
}
function fbSetNode(path, value){
  if(path.length===0){ fbRoot = value; return; }
  let node = fbRoot;
  for(let i=0;i<path.length-1;i++) node = node[path[i]];
  node[path[path.length-1]] = value;
}
/* Transforme la case actuellement sélectionnée en la structure choisie (fraction, somme...).
   Sans case sélectionnée au préalable, remplace la première case si elle est encore vide
   (cas le plus fréquent), sinon s'ajoute à la fin de la formule. */
function fbInsertAtFocus(kind){
  if(!fbFocusedPath){
    if(fbRoot.items.length===1 && fbRoot.items[0].type==='leaf' && fbRoot.items[0].value==='') fbRoot.items[0] = fbNewStruct(kind);
    else fbRoot.items.push(fbNewStruct(kind));
  } else {
    fbSetNode(fbFocusedPath, fbNewStruct(kind));
  }
  fbFocusedPath = null;
  fbRender();
}
function fbAddToSeq(seqPathStr){
  fbGetNode(fbStrToPath(seqPathStr)).items.push(fbNewLeaf(''));
  fbRender();
}
function fbRemoveSeqItem(seqPathStr, idx){
  const seq = fbGetNode(fbStrToPath(seqPathStr));
  if(seq.items.length<=1) seq.items[0] = fbNewLeaf('');
  else seq.items.splice(idx,1);
  fbRender();
}
/* Une structure dans un emplacement "case unique" (borne, variable, exposant) se retire en
   redevenant simplement une case de texte libre vide, à son emplacement exact. */
function fbClearNode(pathStr){
  fbSetNode(fbStrToPath(pathStr), fbNewLeaf(''));
  fbRender();
}
function fbUpdateLeaf(pathStr, value){
  fbGetNode(fbStrToPath(pathStr)).value = value; // pas de re-rendu : on garde le focus/curseur
}
function fbRender(){
  document.getElementById('formulaBuilderCanvas').innerHTML = fbRenderSeq(fbRoot, []);
}
function fbLeafInput(node, path){
  const pathStr = fbPathToStr(path);
  const w = Math.max(30, node.value.length*9+18);
  return `<input type="text" value="${escapeHtml(node.value)}" oninput="fbUpdateLeaf(this.dataset.path, this.value); this.style.width=Math.max(30,this.value.length*9+18)+'px';" onfocus="fbFocusedPath = fbStrToPath(this.dataset.path)" data-path="${pathStr}" style="width:${w}px;border:1.5px solid rgba(28,43,57,.3);border-radius:6px;padding:5px 7px;font-family:'JetBrains Mono',monospace;font-size:1rem;text-align:center;vertical-align:middle;">`;
}
/* Une SÉQUENCE (racine, numérateur, dénominateur, expression...) : plusieurs cases bout à bout,
   avec un petit "+" à la fin pour en ajouter une nouvelle (texte, qu'on peut ensuite transformer
   en structure en cliquant dedans puis sur un symbole). */
function fbRenderSeq(seq, path){
  const inner = seq.items.map((item,i)=>fbRenderSeqItem(item,[...path,'items',i],path,i)).join('');
  return `<span style="display:inline-flex;align-items:center;gap:2px;">${inner}<button type="button" onclick="fbAddToSeq('${fbPathToStr(path)}')" title="Ajouter une case ici" style="border:none;background:rgba(28,43,57,.08);border-radius:5px;width:20px;height:20px;font-size:.75rem;cursor:pointer;vertical-align:middle;">+</button></span>`;
}
function fbRenderSeqItem(node, path, seqPath, idx){
  if(node.type==='leaf') return fbLeafInput(node, path);
  const removeBtn = `<button type="button" onclick="fbRemoveSeqItem('${fbPathToStr(seqPath)}',${idx})" title="Retirer cette structure" style="border:none;background:#FDEAEA;color:#D93025;border-radius:5px;width:20px;height:20px;font-size:.7rem;cursor:pointer;vertical-align:middle;margin-left:2px;">✕</button>`;
  return `<span style="display:inline-flex;align-items:center;background:rgba(13,91,163,.05);border:1px solid rgba(13,91,163,.18);border-radius:8px;padding:6px 8px;margin:0 3px;vertical-align:middle;">${fbRenderStruct(node,path)}</span>${removeBtn}`;
}
/* Une case UNIQUE (borne, variable, exposant) : soit une simple entrée de texte, soit une
   structure imbriquée -- rendue dans le même style de cadre que dans une séquence. */
function fbRenderSlot(node, path){
  if(node.type==='leaf') return fbLeafInput(node, path);
  const removeBtn = `<button type="button" onclick="fbClearNode('${fbPathToStr(path)}')" title="Retirer cette structure" style="border:none;background:#FDEAEA;color:#D93025;border-radius:5px;width:20px;height:20px;font-size:.7rem;cursor:pointer;vertical-align:middle;margin-left:2px;">✕</button>`;
  return `<span style="display:inline-flex;align-items:center;background:rgba(13,91,163,.05);border:1px solid rgba(13,91,163,.18);border-radius:8px;padding:6px 8px;margin:0 3px;vertical-align:middle;">${fbRenderStruct(node,path)}</span>${removeBtn}`;
}
function fbRenderStruct(node, path){
  if(node.type==='frac'){
    return `<span style="display:inline-flex;flex-direction:column;align-items:center;">
      <span>${fbRenderSeq(node.num,[...path,'num'])}</span>
      <span style="border-top:2px solid #1C1B2E;width:100%;height:0;margin:3px 0;"></span>
      <span>${fbRenderSeq(node.den,[...path,'den'])}</span>
    </span>`;
  }
  if(node.type==='pow'){
    return `<span style="position:relative;display:inline-block;padding-right:32px;">${fbRenderSlot(node.base,[...path,'base'])}<span style="position:absolute;top:-10px;right:0;font-size:.72rem;">${fbRenderSlot(node.exp,[...path,'exp'])}</span></span>`;
  }
  if(node.type==='sub'){
    return `<span style="position:relative;display:inline-block;padding-right:32px;">${fbRenderSlot(node.base,[...path,'base'])}<span style="position:absolute;bottom:-10px;right:0;font-size:.72rem;">${fbRenderSlot(node.sub,[...path,'sub'])}</span></span>`;
  }
  if(node.type==='sqrt'){
    return `<span style="display:inline-flex;align-items:center;">√<span style="border-top:2px solid #1C1B2E;padding:0 4px;margin-left:2px;">${fbRenderSeq(node.expr,[...path,'expr'])}</span></span>`;
  }
  if(node.type==='sum' || node.type==='int'){
    const symbol = node.type==='sum' ? 'Σ' : '∫';
    const labelHaut = node.type==='sum' ? '(jusqu\'à)' : '(borne haute)';
    const labelBas = node.type==='sum' ? '(à partir de)' : '(borne basse)';
    const bounds = `<span style="display:inline-flex;flex-direction:column;align-items:center;gap:2px;">
        <span title="${labelHaut}">${fbRenderSlot(node.to,[...path,'to'])}</span>
        <span style="font-size:1.7rem;line-height:1;">${symbol}</span>
        <span title="${labelBas}">${fbRenderSlot(node.from,[...path,'from'])}</span>
      </span>`;
    const tail = node.type==='int' ? `<span style="margin-left:4px;">d${fbRenderSlot(node.dvar,[...path,'dvar'])}</span>` : '';
    return `<span style="display:inline-flex;align-items:center;gap:5px;">${bounds}<span>${fbRenderSeq(node.expr,[...path,'expr'])}</span>${tail}</span>`;
  }
  if(node.type==='lim'){
    return `<span style="display:inline-flex;align-items:center;gap:5px;">
      <span style="display:inline-flex;flex-direction:column;align-items:center;">
        <span>lim</span>
        <span style="display:inline-flex;align-items:center;gap:2px;font-size:.8rem;">${fbRenderSlot(node.dvar,[...path,'dvar'])}→${fbRenderSlot(node.to,[...path,'to'])}</span>
      </span>
      <span>${fbRenderSeq(node.expr,[...path,'expr'])}</span>
    </span>`;
  }
  return '';
}
/* Parcourt l'arbre pour produire le LaTeX final -- aucune analyse de texte, la structure
   garantit un résultat correct quelle que soit la complexité ou l'imbrication. */
function fbToLatex(node){
  if(node.type==='seq') return node.items.map(fbToLatex).join('');
  if(node.type==='leaf') return node.value;
  if(node.type==='frac') return `\\dfrac{${fbToLatex(node.num)}}{${fbToLatex(node.den)}}`;
  if(node.type==='pow') return `{${fbToLatex(node.base)}}^{${fbToLatex(node.exp)}}`;
  if(node.type==='sub') return `{${fbToLatex(node.base)}}_{${fbToLatex(node.sub)}}`;
  if(node.type==='sqrt') return `\\sqrt{${fbToLatex(node.expr)}}`;
  if(node.type==='sum') return `\\displaystyle\\sum_{${fbToLatex(node.from)}}^{${fbToLatex(node.to)}} ${fbToLatex(node.expr)}`;
  if(node.type==='int') return `\\displaystyle\\int_{${fbToLatex(node.from)}}^{${fbToLatex(node.to)}} ${fbToLatex(node.expr)} \\, d${fbToLatex(node.dvar)}`;
  if(node.type==='lim') return `\\displaystyle\\lim_{${fbToLatex(node.dvar)} \\to ${fbToLatex(node.to)}} ${fbToLatex(node.expr)}`;
  return '';
}
function fbInsertFinal(){
  const latex = fbToLatex(fbRoot).trim();
  if(latex) insertMathTemplate('$'+latex+'$');
  closeFormulaBuilder();
}



function previewTextBlock(){
  const val = document.getElementById('textBlockInput').value;
  document.getElementById('textBlockPreview').innerHTML = val.trim() ? renderMathText(val) : '';
}
function openTextBlockTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('textBlockPanel').style.display='block';
  document.getElementById('textBlockInput').value = '';
  document.getElementById('textBlockPreview').innerHTML = '';
  document.getElementById('textBlockPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeTextBlockTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('textBlockPanel').style.display='none'; }
function insertTextBlock(){
  const text = document.getElementById('textBlockInput').value;
  if(!text.trim()) return;
  const html = `<div style="padding:4px 0;">${renderMathText(text)}</div>`;
  addPendingBlock('texte', html, {text}, 'reopenTextBlock');
  closeTextBlockTool();
}
function reopenTextBlock(data){
  openTextBlockTool();
  document.getElementById('textBlockInput').value = data.text;
  previewTextBlock();
}
/* Icônes en trait fin (SVG), sobres et monochromes -- plus adaptées à un contexte professionnel
   que des émojis. Dupliquées telles quelles dans index.html pour la barre fixe de l'outil de
   correction (markup statique, ne peut pas appeler cette fonction JS). */
const TOOL_ICONS = {
  texte: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,
  figure: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 4 L21 20 L3 20 Z"/></svg>`,
  tableau: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="1"/><line x1="3.5" y1="9.5" x2="20.5" y2="9.5"/><line x1="3.5" y1="15.5" x2="20.5" y2="15.5"/><line x1="9.5" y1="3.5" x2="9.5" y2="20.5"/><line x1="15.5" y1="3.5" x2="15.5" y2="20.5"/></svg>`,
  division: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="12" x2="20" y2="12"/><circle cx="12" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  axe: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="3"/><polyline points="1.5,7 4,3 6.5,7"/><line x1="3" y1="20" x2="21" y2="20"/><polyline points="17,17.5 21,20 17,22.5"/><circle cx="10" cy="13" r="1.3" fill="currentColor" stroke="none"/><circle cx="15" cy="8" r="1.3" fill="currentColor" stroke="none"/></svg>`,
  fraction: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3 A9 9 0 0 1 12 21 Z" fill="currentColor" stroke="none"/><line x1="12" y1="3" x2="12" y2="21"/></svg>`,
  cubes: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z"/><path d="M12 2 L12 12 L21 7 M12 12 L3 7 M12 12 L12 22"/></svg>`,
  graph: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21 L3 3"/><path d="M3 21 L21 21"/><path d="M4 15 Q9 4 13 13 T21 6"/></svg>`,
  stats: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="21" x2="21" y2="21"/><rect x="5" y="13" width="4" height="8" fill="currentColor" stroke="none"/><rect x="11" y="8" width="4" height="13" fill="currentColor" stroke="none"/><rect x="17" y="3" width="4" height="18" fill="currentColor" stroke="none"/></svg>`,
  urn: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4 L4 20 Q4 22 6 22 L18 22 Q20 22 20 20 L18 4"/><circle cx="9" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="14" cy="15" r="1.6" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="1.6" fill="currentColor" stroke="none"/></svg>`,
};
function toolButtonsHTML(ctx){
  const set = `setToolContext('${ctx}');`;
  return `
    <button type="button" class="tool-icon-btn" title="Texte" onclick="${set}openTextBlockTool()">${TOOL_ICONS.texte}</button>
    <button type="button" class="tool-icon-btn" title="Figure géométrique" onclick="${set}openFigureTool()">${TOOL_ICONS.figure}</button>
    <button type="button" class="tool-icon-btn" title="Tableau" onclick="${set}openTableauTool()">${TOOL_ICONS.tableau}</button>
    <button type="button" class="tool-icon-btn" title="Division (euclidienne / décimale)" onclick="${set}openDivisionTool()">${TOOL_ICONS.division}</button>
    <button type="button" class="tool-icon-btn" title="Axe gradué / Repère" onclick="${set}openAxeTool()">${TOOL_ICONS.axe}</button>
    <button type="button" class="tool-icon-btn" title="Fraction visuelle (disque / rectangle)" onclick="${set}openDisqueTool()">${TOOL_ICONS.fraction}</button>
    <button type="button" class="tool-icon-btn" title="Cubes empilés" onclick="${set}openCubesTool()">${TOOL_ICONS.cubes}</button>
    <button type="button" class="tool-icon-btn" title="Graphique (droites / fonctions)" onclick="${set}openGraphTool()">${TOOL_ICONS.graph}</button>
    <button type="button" class="tool-icon-btn" title="Diagramme statistique" onclick="${set}openStatsTool()">${TOOL_ICONS.stats}</button>
    <button type="button" class="tool-icon-btn" title="Probabilités (sac/urne, cartes, dés, arbre)" onclick="${set}openUrnTool()">${TOOL_ICONS.urn}</button>
  `;
}
let figDragPoint = null;
const SCALE_PX_PER_CM = 20;

/* Ferme tous les panneaux d'outils et la modale qui les enveloppe (clic en dehors de la modale,
   ou changement de contexte). */
/* Masque tout le contenu des outils (panneaux seuls et groupes à onglets), sans fermer la
   modale elle-même -- appelé au début de chaque fonction d'ouverture d'outil, pour qu'un seul
   outil (ou groupe) soit jamais visible à la fois. */
function hideAllToolContent(){
  ['figurePanel','tableauPanel','textBlockPanel','cubesPanel','graphPanel','statsPanel','probaGroupWrap','urnPanel','cardsPanel','dicePanel','treePanel','divisionPanel','divisionDecPanel','axePanel','reperePanel','disquePanel','rectFracPanel','divisionGroupWrap','axeGroupWrap','shapeGroupWrap'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display='none';
  });
}
/* Bascule entre deux outils regroupés sous les mêmes onglets (division euclidienne/décimale,
   axe/repère, disque/rectangle) : affiche le groupe demandé, met en évidence l'onglet actif. */
function activateToolTab(wrapId, activeTabId, inactiveTabId){
  hideAllToolContent();
  document.getElementById(wrapId).style.display='block';
  const activeTab = document.getElementById(activeTabId), inactiveTab = document.getElementById(inactiveTabId);
  if(activeTab) activeTab.classList.add('active');
  if(inactiveTab) inactiveTab.classList.remove('active');
}
function closeAllToolPanels(){
  ['figurePanel','tableauPanel','textBlockPanel','cubesPanel','graphPanel','statsPanel','probaGroupWrap','urnPanel','cardsPanel','dicePanel','treePanel','divisionPanel','divisionDecPanel','axePanel','reperePanel','disquePanel','rectFracPanel','divisionGroupWrap','axeGroupWrap','shapeGroupWrap'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.style.display='none';
  });
  document.getElementById('toolsModalOverlay').style.display='none';
}
function openFigureTool(){hideAllToolContent(); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('figurePanel').style.display='block';
  resetFigureState();
  setFigureMode('point');
  document.getElementById('figurePanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeFigureTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('figurePanel').style.display='none'; }

/* ---- mini outil : insérer un tableau ---- */
function openTableauTool(){hideAllToolContent(); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('tableauPanel').style.display='block';
  buildTableauGrid();
  document.getElementById('tableauPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeTableauTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('tableauPanel').style.display='none'; }
function buildTableauGrid(){
  const cols = Math.max(1, Math.min(8, parseInt(document.getElementById('tabCols').value)||3));
  const rows = Math.max(1, Math.min(12, parseInt(document.getElementById('tabRows').value)||3));
  let html = '<table style="border-collapse:collapse;">';
  for(let r=0;r<rows;r++){
    html += '<tr>';
    for(let c=0;c<cols;c++){
      html += `<td style="padding:2px;border:1px solid rgba(28,43,57,.15);">
        <input type="text" data-r="${r}" data-c="${c}" style="width:90px;padding:6px;border:none;text-align:center;${r===0?'font-weight:700;':''}" placeholder="${r===0?'En-tête':''}">
      </td>`;
    }
    html += '</tr>';
  }
  html += '</table>';
  document.getElementById('tableauGrid').innerHTML = html;
}
function insertTableau(){
  const cols = Math.max(1, Math.min(8, parseInt(document.getElementById('tabCols').value)||3));
  const rows = Math.max(1, Math.min(12, parseInt(document.getElementById('tabRows').value)||3));
  const grid = [];
  for(let r=0;r<rows;r++) grid.push(new Array(cols).fill(''));
  document.querySelectorAll('#tableauGrid input').forEach(inp=>{
    grid[parseInt(inp.dataset.r)][parseInt(inp.dataset.c)] = inp.value.trim();
  });
  let html = '<table style="border-collapse:collapse;width:auto;margin:8px 0;font-size:.92rem;">';
  grid.forEach((row,r)=>{
    html += '<tr>';
    row.forEach(cell=>{
      const tag = r===0 ? 'th' : 'td';
      const style = r===0 ? 'background:rgba(31,58,92,.06);font-weight:700;' : '';
      html += `<${tag} style="padding:7px 12px;border:1px solid rgba(28,43,57,.18);${style}">${escapeHtml(cell)}</${tag}>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  addPendingBlock('tableau', html, {cols, rows, grid}, 'reopenTableau');
  closeTableauTool();
}
function reopenTableau(data){
  openTableauTool();
  document.getElementById('tabCols').value = data.cols;
  document.getElementById('tabRows').value = data.rows;
  buildTableauGrid();
  setTimeout(()=>{
    document.querySelectorAll('#tableauGrid input').forEach(inp=>{
      const v = data.grid[parseInt(inp.dataset.r)]?.[parseInt(inp.dataset.c)];
      if(v!==undefined) inp.value = v;
    });
  }, 0);
}

/* ---- mini outil : insérer une division posée (calculée automatiquement) ---- */
function computeDivisionPosee(dividend, divisor){
  if(!Number.isInteger(dividend) || !Number.isInteger(divisor) || divisor<=0 || dividend<0) return null;
  const digits = String(dividend).split('').map(Number);
  const quotientDigits = [];
  let current = 0, started = false;
  const steps = [];
  for(let i=0;i<digits.length;i++){
    const priorRemainder = current;
    current = current*10 + digits[i];
    if(current >= divisor){
      const q = Math.floor(current/divisor), sub = q*divisor;
      steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:q, sub:sub});
      current -= sub;
      quotientDigits.push(q);
      started = true;
    } else {
      if(started){ quotientDigits.push(0); steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:0, sub:0}); }
      else steps.push({value:current, priorRemainder, broughtDown:digits[i], qDigit:null, sub:null});
    }
  }
  return {quotient: parseInt(quotientDigits.join('')||'0'), remainder: current, steps, dividend, divisor};
}
function dpAlignedCells(str, endCol, N){
  const cells = new Array(N).fill('');
  const chars = String(str).split('');
  for(let k=0;k<chars.length;k++){
    const col = endCol - (chars.length-1-k);
    if(col>=0 && col<N) cells[col] = chars[k];
  }
  return cells;
}
function dpRenderDivisionTable(rows, quotient, divisor, commaCol, vierge){
  const cellStyle = `width:22px;text-align:center;padding:${vierge?'11px':'2px'} 0;`;
  const rowsHtml = rows.map(r=>{
    const signTd = `<td style="width:16px;text-align:center;${r.underline?'border-bottom:1.5px solid #1C1B2E;':''}">${r.sign?'−':''}</td>`;
    const tds = r.cells.map((c,ci)=>{
      let style = cellStyle;
      if(r.bold) style += 'font-weight:700;';
      if(r.underline && (r.endCol===undefined || ci<=r.endCol)) style += 'border-bottom:1.5px solid #1C1B2E;';
      if(commaCol!==undefined && ci===commaCol) style += 'border-right:1px dashed rgba(28,43,57,.45);';
      return `<td style="${style}">${c}</td>`;
    }).join('');
    return `<tr>${signTd}${tds}</tr>`;
  }).join('');
  const rowPad = vierge ? '11px' : '2px';
  return `<div style="display:flex;gap:18px;align-items:stretch;font-family:'JetBrains Mono',monospace;font-size:1.05rem;">
    <table style="border-collapse:collapse;">${rowsHtml}</table>
    <div style="border-left:1.5px solid #1C1B2E;">
      <div style="padding:${rowPad} 0 ${rowPad} 14px;">${divisor}</div>
      <div style="border-top:1.5px solid #1C1B2E;padding:6px 0 0 14px;">${quotient||'&nbsp;'}</div>
    </div>
  </div>`;
}
function divisionPoseeHTML(res, vierge, showDiff){
  if(showDiff===undefined) showDiff = true;
  if(!res) return '<p class="hint" style="color:var(--accent-orange);">Le dividende et le diviseur doivent être des entiers, et le diviseur non nul.</p>';
  const dividendStr = String(res.dividend);
  const N = dividendStr.length;
  const rows = [{cells: dpAlignedCells(dividendStr, N-1, N), bold:true}];
  let lastEndCol = -1;
  if(showDiff){
    res.steps.forEach((s,i)=>{
      if(s.sub>0){
        rows.push({cells: dpAlignedCells(vierge?'':String(s.sub), i, N), sign:!vierge, underline:!vierge, endCol:i});
        rows.push({cells: dpAlignedCells(vierge?'':String(s.value-s.sub), i, N)});
        lastEndCol = i;
      }
    });
    if(lastEndCol < N-1) rows.push({cells: dpAlignedCells(vierge?'':String(res.remainder), N-1, N)});
  } else {
    // Sans différences : la toute première étape n'utilise que des chiffres bruts du dividende
    // (déjà visibles dans l'en-tête) -- elle reste mentale. Pour les étapes suivantes, chaque
    // "valeur" (ex. 117) contient déjà le reste précédent dans ses premiers chiffres (le "11"
    // de 117) : pas besoin de l'écrire une seconde fois à part. Seul le tout dernier reste,
    // qui n'est jamais repris dans une valeur suivante, s'écrit séparément à la fin.
    let firstTrigger = true;
    res.steps.forEach((s,i)=>{
      if(s.sub>0){
        if(firstTrigger){ firstTrigger = false; return; }
        rows.push({cells: dpAlignedCells(vierge?'':String(s.value), i, N)});
      }
    });
    rows.push({cells: dpAlignedCells(vierge?'':String(res.remainder), N-1, N)});
  }
  // En mode vierge : le dividende ET le diviseur restent visibles (l'élève doit les connaître
  // pour démarrer) ; le quotient, le détail des étapes, ET toute préparation (signe moins,
  // trait de soustraction) sont masqués -- l'espace reste entièrement vierge. Le nombre de
  // lignes reste calculé sur la vraie division : la hauteur totale anticipe donc correctement
  // le nombre d'étapes à venir, sans donner d'indice sur leur déroulé.
  const table = dpRenderDivisionTable(rows, vierge?'':res.quotient, res.divisor, undefined, vierge);
  if(vierge) return `<div style="margin:10px 0;padding:14px 0;">${table}</div>`;
  return `<div style="margin:10px 0;padding:14px 0;">${table}</div>
  <p class="hint" style="margin:0;">${res.dividend} = (${res.divisor} × ${res.quotient}) + ${res.remainder}</p>`;
}
function buildDivisionStages(res){
  const dividendStr = String(res.dividend);
  const N = dividendStr.length;
  const rows = [{cells: dpAlignedCells(dividendStr, N-1, N), bold:true}];
  const stages = [];
  let quotientSoFar = '';
  stages.push({rows: rows.slice(), quotient: '', caption: `On pose la division de ${res.dividend} par ${res.divisor}.`});
  res.steps.forEach((s,i)=>{
    if(s.qDigit===null){
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `On prend le nombre ${s.value} : il est inférieur à ${res.divisor}, donc on prend un chiffre de plus.`});
    } else if(s.sub>0){
      rows.push({cells: dpAlignedCells(String(s.sub), i, N), sign:true, underline:true, endCol:i});
      rows.push({cells: dpAlignedCells(String(s.value-s.sub), i, N)});
      quotientSoFar += s.qDigit;
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `${res.divisor} × ${s.qDigit} = ${s.sub}, le plus proche de ${s.value} sans le dépasser. ${s.value} − ${s.sub} = ${s.value-s.sub}.`});
    } else {
      quotientSoFar += '0';
      stages.push({rows: rows.slice(), quotient: quotientSoFar, caption: `On abaisse le chiffre suivant du dividende. ${s.value} reste inférieur à ${res.divisor}, donc on pose 0 au quotient et on abaisse encore.`});
    }
  });
  stages.push({rows: rows.slice(), quotient: String(res.quotient), caption: `La division est terminée : ${res.dividend} = (${res.divisor} × ${res.quotient}) + ${res.remainder}.`, final:true});
  return stages;
}
function divisionStagesHTML(stages, res){
  const panels = stages.map((st,i)=>`<div style="margin:10px 0;padding:14px 0;">
    ${dpRenderDivisionTable(st.rows, st.quotient, res.divisor)}
    <p class="hint" style="margin:8px 0 0;">${i+1}. ${st.caption}</p>
  </div>`).join('');
  return panels;
}
function previewDivisionPosee(){
  const a = parseInt(document.getElementById('divDividende').value);
  const b = parseInt(document.getElementById('divDiviseur').value);
  const res = computeDivisionPosee(a,b);
  if(!res){ document.getElementById('divisionPreview').innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = document.getElementById('divStepByStep').checked;
  const vierge = document.getElementById('divVierge').checked;
  const showDiff = document.getElementById('divShowDiff').checked;
  document.getElementById('divisionPreview').innerHTML = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
}
function openDivisionTool(){activateToolTab('divisionGroupWrap','divTabEucl','divTabDec'); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('divisionPanel').style.display='block';
  document.getElementById('divisionPreview').innerHTML = '';
  document.getElementById('divisionPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeDivisionTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('divisionPanel').style.display='none'; }
function insertDivisionPosee(){
  const a = parseInt(document.getElementById('divDividende').value);
  const b = parseInt(document.getElementById('divDiviseur').value);
  const res = computeDivisionPosee(a,b);
  if(!res){ document.getElementById('divisionPreview').innerHTML = divisionPoseeHTML(null); return; }
  const stepByStep = document.getElementById('divStepByStep').checked;
  const vierge = document.getElementById('divVierge').checked;
  const showDiff = document.getElementById('divShowDiff').checked;
  const html = (stepByStep && !vierge) ? divisionStagesHTML(buildDivisionStages(res), res) : divisionPoseeHTML(res, vierge, showDiff);
  addPendingBlock('divisionPosee', html, {a,b,stepByStep,vierge,showDiff}, 'reopenDivisionPosee');
  closeDivisionTool();
}
function reopenDivisionPosee(data){
  openDivisionTool();
  document.getElementById('divDividende').value = data.a;
  document.getElementById('divDiviseur').value = data.b;
  document.getElementById('divVierge').checked = !!data.vierge;
  document.getElementById('divStepByStep').checked = data.stepByStep;
  document.getElementById('divShowDiff').checked = data.showDiff!==false;
  previewDivisionPosee();
}
/* ============================================================
   Nouveaux ajouts pour l'outil de correction : division décimale,
   axe gradué, repère, disque fractionné, rectangle fractionné.
   Même convention que les ajouts existants : un panneau, un aperçu,
   un bouton "Insérer" qui ajoute un bloc indépendant à pendingBlocks
   -- donc ces ajouts apparaissent automatiquement aussi dans la
   fenêtre de projection, et peuvent être modifiés/supprimés un par
   un (renderCorrectionPreview transmet pendingBlocksHTML(false) à
   updateProjectionWindow).
   ============================================================ */

/* ---- Division décimale (poursuite après la virgule) ---- */
function computeDivisionDecimale(dividendRaw, divisor, maxDec){
  const cleanStr = String(dividendRaw).trim().replace(',', '.');
  if(!/^\d+(\.\d+)?$/.test(cleanStr)) return null;
  if(!Number.isInteger(divisor) || divisor<=0) return null;
  const [intPart, decPart=''] = cleanStr.split('.');
  const digits = (intPart + decPart).split('').map(Number);
  const givenCommaPos = decPart.length>0 ? intPart.length : null; // index dans "digits" où la virgule DONNÉE se situe
  const dividendValue = parseFloat(cleanStr);
  let current = 0, quotient = '', commaCol = null, started = false, repeating = false;
  const steps = [];
  let idx = 0;
  let decCount = 0, exact = false;
  const seenRemainders = new Set();
  while(true){
    let bringDown;
    if(idx < digits.length){
      bringDown = digits[idx];
      if(givenCommaPos!==null && idx===givenCommaPos && commaCol===null){ commaCol = idx; quotient += ','; }
    } else{
      if(decCount>=maxDec) break;
      bringDown = 0;
      decCount++;
      if(commaCol===null){ commaCol = idx; quotient += ','; }
    }
    current = current*10 + bringDown;
    const qDigit = Math.floor(current/divisor);
    const sub = qDigit*divisor;
    const after = current - sub;
    // on ignore les tout premiers chiffres insuffisants seuls (ex. le "1" de "10÷3") : on ne
    // commence à afficher une étape qu'une fois le premier chiffre du quotient obtenu, ou
    // arrivé au dernier chiffre de la partie entière DONNÉE (avant une éventuelle virgule).
    if(started || qDigit>0 || idx>=digits.length-1){
      steps.push({before: current, qDigit, sub, after, col: idx});
      started = true;
      quotient += String(qDigit);
    }
    current = after;
    idx++;
    if(current===0 && idx>=digits.length){ exact=true; break; }
    if(commaCol!==null && idx>digits.length){
      // dans la partie décimale ajoutée (zéros) : si ce reste est déjà apparu, le motif se
      // répète à l'identique indéfiniment -- inutile de continuer à dérouler les mêmes lignes.
      if(seenRemainders.has(current)){ repeating = true; break; }
      seenRemainders.add(current);
    }
    if(idx - digits.length > 60) break; // garde-fou
  }
  quotient = quotient.replace(/^0+(\d)/, '$1') || '0';
  const dividendDisplay = cleanStr.replace('.', ',');
  return {dividend: dividendDisplay, dividendValue, divisor, quotient, exact, steps, decCount, repeating, digits, givenCommaPos};
}
function divisionDecimaleHTML(res, maxDec, vierge){
  if(!res) return '<p class="hint" style="color:var(--accent-orange);">Le dividende doit être un nombre décimal ou entier positif, le diviseur un entier positif.</p>';
  const dividendDigitsStr = res.digits.join('');
  const totalCols = Math.max(dividendDigitsStr.length, ...res.steps.map(s=>s.col+1));
  const rows = [{cells: dpAlignedCells(dividendDigitsStr, dividendDigitsStr.length-1, totalCols), bold:true}];
  res.steps.forEach((s,i)=>{
    rows.push({cells: dpAlignedCells(vierge?'':String(s.sub), s.col, totalCols), sign:!vierge, underline:!vierge, endCol:s.col});
    const next = res.steps[i+1];
    if(next) rows.push({cells: dpAlignedCells(vierge?'':String(next.before), next.col, totalCols)});
    else rows.push({cells: dpAlignedCells(vierge?'':String(s.after), s.col, totalCols)});
  });
  const commaColIdx = vierge ? undefined : (res.givenCommaPos!==null && res.givenCommaPos!==undefined ? res.givenCommaPos-1 : undefined);
  // En mode vierge : dividende et diviseur restent visibles ; quotient, détail des étapes, ET
  // toute préparation (signe moins, trait de soustraction, marqueur de virgule) sont masqués --
  // l'espace reste entièrement vierge. La hauteur reste calculée sur la vraie division.
  const table = dpRenderDivisionTable(rows, vierge?'':(res.quotient + (res.repeating?'…':'')), res.divisor, commaColIdx, vierge);
  return `<div style="margin:10px 0;padding:14px 0;">
    ${table}
  </div>`;
}
function previewDivisionDecimale(){
  const a = document.getElementById('divDecDividende').value;
  const b = parseInt(document.getElementById('divDecDiviseur').value);
  const maxDec = parseInt(document.getElementById('divDecMax').value)||4;
  const vierge = document.getElementById('divDecVierge').checked;
  const res = computeDivisionDecimale(a,b,maxDec);
  document.getElementById('divisionDecPreview').innerHTML = divisionDecimaleHTML(res, maxDec, vierge);
}
function openDivisionDecTool(){activateToolTab('divisionGroupWrap','divTabDec','divTabEucl'); document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('divisionDecPanel').style.display='block';
  document.getElementById('divisionDecPreview').innerHTML = '';
  document.getElementById('divisionDecPanel').scrollIntoView({behavior:'smooth', block:'nearest'});
}
function closeDivisionDecTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('divisionDecPanel').style.display='none'; }
function insertDivisionDecimale(){
  const a = document.getElementById('divDecDividende').value;
  const b = parseInt(document.getElementById('divDecDiviseur').value);
  const maxDec = parseInt(document.getElementById('divDecMax').value)||4;
  const vierge = document.getElementById('divDecVierge').checked;
  const res = computeDivisionDecimale(a,b,maxDec);
  if(!res) return;
  addPendingBlock('divisionDec', divisionDecimaleHTML(res, maxDec, vierge), {a,b,maxDec,vierge}, 'reopenDivisionDec');
  closeDivisionDecTool();
}
function reopenDivisionDec(data){
  openDivisionDecTool();
  document.getElementById('divDecDividende').value = data.a;
  document.getElementById('divDecDiviseur').value = data.b;
  document.getElementById('divDecMax').value = data.maxDec;
  document.getElementById('divDecVierge').checked = !!data.vierge;
  previewDivisionDecimale();
  renderCorrectionPreview();
}

/* ---- Axe gradué ---- */
/* Valeur d'une coordonnée : nombre décimal (virgule) ou fraction (a/b). On garde le
   dénominateur de la fraction pour pouvoir subdiviser l'axe en conséquence. */
function parseCoordValue(str){
  str = (str||'').trim();
  // nombre mixte : entier + fraction, ex. "1+1/4" (= 1,25)
  const mixed = str.match(/^(-?\d+)\s*\+\s*(\d+)\s*\/\s*(\d+)$/);
  if(mixed){
    const whole = parseInt(mixed[1],10), n = parseInt(mixed[2],10), den = parseInt(mixed[3],10);
    const sign = whole<0 ? -1 : 1;
    return {value: whole + sign*(n/den), den};
  }
  const fm = str.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if(fm){ const den=parseInt(fm[2],10); return {value: parseInt(fm[1],10)/den, den}; }
  return {value: parseFloat(str.replace(',','.')), den: null};
}
/* Repère les points au format "A(3,5)" ou "A(3/4)" n'importe où dans le texte (peu importe
   ce qui sépare plusieurs points : espace, virgule, point-virgule...). */
function parseNamedPoints1D(raw){
  if(!raw||!raw.trim()) return [];
  const out = [];
  for(const m of raw.matchAll(/([A-Za-z]+)\s*\(\s*([^()]+?)\s*\)/g)){
    const {value, den} = parseCoordValue(m[2]);
    if(!isNaN(value)) out.push({label:m[1], value, den});
  }
  return out;
}
/* Formate un nombre en écriture française (virgule décimale, pas de zéros inutiles). */
function frDecimal(n){
  return Number(n.toFixed(6)).toString().replace('.', ',');
}
/* Réécrit une valeur pour l'affichage dans une consigne : si elle a été donnée sous forme
   fractionnaire (den connu), on la redonne sous cette même forme plutôt qu'en décimal -- ex.
   A(2/5) doit rester "2/5" dans la consigne, pas devenir "0,4". */
function fracLabel(value, den){
  if(den){ return katexSpan(`\\dfrac{${Math.round(value*den)}}{${den}}`); }
  return frDecimal(value);
}
function buildAxeSvg(min,max,step,points,manualSubDiv,mode){
  const W=560,H=110,padX=30,y=55;
  const scale = (W-2*padX)/(max-min);
  const xOf = v => padX + (v-min)*scale;
  let ticks='';
  for(let v=Math.ceil(min/step)*step; v<=max+1e-9; v+=step){
    const x = xOf(v);
    const isZero = Math.abs(v)<1e-9;
    ticks += `<line x1="${x}" y1="${y-7}" x2="${x}" y2="${y+7}" stroke="#1C1B2E" stroke-width="${isZero?2:1.3}"/>
      <text x="${x}" y="${y+24}" font-size="13" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`;
  }
  // Subdivision de chaque unité selon le PPCM des dénominateurs demandés (ex. 1/4 et 7/6
  // donnent un PPCM de 12 : chaque unité est coupée en douzièmes, ce qui convient aux deux) et/ou
  // le partage manuel choisi (utile pour un axe VIERGE, sans point, où les élèves placeront
  // eux-mêmes des fractions -- ex. partager en 4 sans aucun point donné).
  const dens = (points||[]).map(p=>p.den).filter(Boolean);
  if(manualSubDiv>1) dens.push(manualSubDiv);
  if(dens.length){
    const gcd = (a,b) => b===0 ? a : gcd(b, a%b);
    const lcm = (a,b) => a*b/gcd(a,b);
    const subDiv = dens.reduce((acc,d)=>lcm(acc,d), 1);
    if(subDiv<=60){
    let minorTicks = '';
    for(let v=Math.ceil(min*subDiv)/subDiv; v<=max+1e-9; v+=1/subDiv){
      if(Math.abs(v % step) < 1e-6 || Math.abs((v%step)-step) < 1e-6) continue; // déjà une grande graduation
      minorTicks += `<line x1="${xOf(v)}" y1="${y-4}" x2="${xOf(v)}" y2="${y+4}" stroke="#1C1B2E" stroke-width="1"/>`;
    }
    ticks += minorTicks;
    }
  }
  let pts='';
  // Mode "placer" : compétence = placer soi-même les points -- on ne les dessine pas, une
  // consigne les liste à part (voir plus bas). Mode "lecture" (par défaut) : les points sont
  // déjà placés, à l'élève de lire/écrire leur abscisse.
  if(mode!=='placer'){
    (points||[]).forEach(p=>{
      if(p.value<min||p.value>max) return;
      const x = xOf(p.value);
      pts += `<circle cx="${x}" cy="${y}" r="4.5" fill="#FF8208"/>
        <text x="${x}" y="${y-14}" font-size="14" font-weight="700" text-anchor="middle" fill="#FF8208" font-family="Space Grotesk, sans-serif">${p.label}</text>`;
    });
  }
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:560px;display:block;margin:6px auto;">
    <line x1="${padX-10}" y1="${y}" x2="${W-padX+10}" y2="${y}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#axeArrow)"/>
    <defs><marker id="axeArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker></defs>
    ${ticks}${pts}
  </svg>`;
  if(mode==='placer' && points && points.length){
    const liste = points.map(p=>`${p.label}(${fracLabel(p.value,p.den)})`).join(' ; ');
    return svg + `<p class="hint" style="text-align:center;margin:4px 0 0;">Place les points ${liste}</p>`;
  }
  return svg;
}
function previewAxe(){
  const min=parseFloat(document.getElementById('axeMin').value), max=parseFloat(document.getElementById('axeMax').value), step=parseFloat(document.getElementById('axeStep').value)||1;
  const subDiv=parseInt(document.getElementById('axeSubDiv').value)||1;
  const mode = document.getElementById('axeMode').value;
  const points = parseNamedPoints1D(document.getElementById('axePoints').value);
  document.getElementById('axePreview').innerHTML = (max>min&&step>0) ? buildAxeSvg(min,max,step,points,subDiv,mode) : '<p class="hint" style="color:var(--accent-orange);">Le maximum doit être supérieur au minimum, le pas positif.</p>';
}
function openAxeTool(){activateToolTab('axeGroupWrap','axeTabAxe','axeTabRep'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('axePanel').style.display='block'; document.getElementById('axePreview').innerHTML=''; document.getElementById('axePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeAxeTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('axePanel').style.display='none'; }
function insertAxe(){
  const min=parseFloat(document.getElementById('axeMin').value), max=parseFloat(document.getElementById('axeMax').value), step=parseFloat(document.getElementById('axeStep').value)||1;
  if(!(max>min&&step>0)) return;
  const subDiv=parseInt(document.getElementById('axeSubDiv').value)||1;
  const mode = document.getElementById('axeMode').value;
  const pointsRaw = document.getElementById('axePoints').value;
  const points = parseNamedPoints1D(pointsRaw);
  addPendingBlock('axe', buildAxeSvg(min,max,step,points,subDiv,mode), {min,max,step,subDiv,mode,pointsRaw}, 'reopenAxe');
  closeAxeTool();
}
function reopenAxe(data){
  openAxeTool();
  document.getElementById('axeMin').value = data.min;
  document.getElementById('axeMax').value = data.max;
  document.getElementById('axeStep').value = data.step;
  document.getElementById('axeSubDiv').value = data.subDiv||1;
  document.getElementById('axeMode').value = data.mode||'lecture';
  document.getElementById('axePoints').value = data.pointsRaw;
  previewAxe();
}

/* ---- Repère (2D) ---- */
/* Repère les points au format "A(3,5;-2)" : x et y séparés par ";", chacun pouvant utiliser
   la virgule décimale (ex. 3,5) ou une fraction (ex. 3/4). */
function parseNamedPoints2D(raw){
  if(!raw||!raw.trim()) return [];
  const out = [];
  for(const m of raw.matchAll(/([A-Za-z]+)\s*\(\s*([^()]+?)\s*\)/g)){
    const parts = m[2].split(';');
    if(parts.length<2) continue;
    const cx = parseCoordValue(parts[0]), cy = parseCoordValue(parts[1]);
    if(isNaN(cx.value)||isNaN(cy.value)) continue;
    out.push({label:m[1], x:cx.value, y:cy.value, xDen:cx.den, yDen:cy.den});
  }
  return out;
}
function buildRepereSvg(xMin,xMax,yMin,yMax,points,mode){
  const W=420,H=420,pad=26;
  const sx = (W-2*pad)/(xMax-xMin), sy=(H-2*pad)/(yMax-yMin);
  const X = v => pad + (v-xMin)*sx;
  const Y = v => H-pad-(v-yMin)*sy;
  let grid='';
  for(let v=Math.ceil(xMin); v<=xMax; v++) grid += `<line x1="${X(v)}" y1="${pad}" x2="${X(v)}" y2="${H-pad}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
  for(let v=Math.ceil(yMin); v<=yMax; v++) grid += `<line x1="${pad}" y1="${Y(v)}" x2="${W-pad}" y2="${Y(v)}" stroke="rgba(28,43,57,.12)" stroke-width="1"/>`;
  const showOrigin = xMin<=0 && xMax>=0 && yMin<=0 && yMax>=0;
  const axes = `<line x1="${pad-10}" y1="${Y(0)}" x2="${W-pad+10}" y2="${Y(0)}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#repAxeArrowX)"/>
    <line x1="${X(0)}" y1="${H-pad+10}" x2="${X(0)}" y2="${pad-10}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#repAxeArrowY)"/>`;
  const originLabel = showOrigin ? `<text x="${X(0)-12}" y="${Y(0)+18}" font-size="15" font-weight="700" font-family="Space Grotesk, sans-serif">O</text>` : '';
  let pts='';
  // Mode "placer" : les points ne sont pas dessinés (une consigne les liste à part) -- l'élève
  // doit les placer lui-même. Mode "lecture" (par défaut) : déjà placés, à lire/écrire.
  if(mode!=='placer'){
    (points||[]).forEach(p=>{
      pts += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4.5" fill="#FF8208"/>
        <text x="${X(p.x)+8}" y="${Y(p.y)-8}" font-size="14" font-weight="700" fill="#FF8208" font-family="Space Grotesk, sans-serif">${p.label}</text>`;
    });
  }
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:340px;display:block;margin:6px auto;">
    <defs>
      <marker id="repAxeArrowX" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <marker id="repAxeArrowY" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
    </defs>
    ${grid}${axes}${originLabel}${pts}
    <text x="${X(1)}" y="${Y(0)+16}" font-size="12" font-family="JetBrains Mono, monospace">1</text>
    <text x="${X(0)-14}" y="${Y(1)+4}" font-size="12" font-family="JetBrains Mono, monospace">1</text>
  </svg>`;
  if(mode==='placer' && points && points.length){
    const liste = points.map(p=>`${p.label}(${fracLabel(p.x,p.xDen)} ; ${fracLabel(p.y,p.yDen)})`).join(' ; ');
    return svg + `<p class="hint" style="text-align:center;margin:4px 0 0;">Place les points ${liste}</p>`;
  }
  return svg;
}
function previewRepere(){
  const xMin=parseFloat(document.getElementById('repXMin').value), xMax=parseFloat(document.getElementById('repXMax').value);
  const yMin=parseFloat(document.getElementById('repYMin').value), yMax=parseFloat(document.getElementById('repYMax').value);
  const mode = document.getElementById('repMode').value;
  const points = parseNamedPoints2D(document.getElementById('repPoints').value);
  document.getElementById('reperePreview').innerHTML = (xMax>xMin&&yMax>yMin) ? buildRepereSvg(xMin,xMax,yMin,yMax,points,mode) : '<p class="hint" style="color:var(--accent-orange);">Les maximums doivent être supérieurs aux minimums.</p>';
}
function openRepereTool(){activateToolTab('axeGroupWrap','axeTabRep','axeTabAxe'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('reperePanel').style.display='block'; document.getElementById('reperePreview').innerHTML=''; document.getElementById('reperePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeRepereTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('reperePanel').style.display='none'; }
function insertRepere(){
  const xMin=parseFloat(document.getElementById('repXMin').value), xMax=parseFloat(document.getElementById('repXMax').value);
  const yMin=parseFloat(document.getElementById('repYMin').value), yMax=parseFloat(document.getElementById('repYMax').value);
  if(!(xMax>xMin&&yMax>yMin)) return;
  const mode = document.getElementById('repMode').value;
  const pointsRaw = document.getElementById('repPoints').value;
  const points = parseNamedPoints2D(pointsRaw);
  addPendingBlock('repere', buildRepereSvg(xMin,xMax,yMin,yMax,points,mode), {xMin,xMax,yMin,yMax,mode,pointsRaw}, 'reopenRepere');
  closeRepereTool();
}
function reopenRepere(data){
  openRepereTool();
  document.getElementById('repXMin').value = data.xMin;
  document.getElementById('repXMax').value = data.xMax;
  document.getElementById('repYMin').value = data.yMin;
  document.getElementById('repYMax').value = data.yMax;
  document.getElementById('repMode').value = data.mode||'lecture';
  document.getElementById('repPoints').value = data.pointsRaw;
  previewRepere();
}

/* ---- Disque fractionné ---- */
function singleDisqueSvg(filled, den){
  const W=220,H=220,cx=110,cy=110,r=90;
  let parts='';
  for(let i=0;i<den;i++){
    const a0 = -Math.PI/2 + i*2*Math.PI/den, a1 = -Math.PI/2 + (i+1)*2*Math.PI/den;
    const x0=cx+r*Math.cos(a0), y0=cy+r*Math.sin(a0), x1=cx+r*Math.cos(a1), y1=cy+r*Math.sin(a1);
    const large = (2*Math.PI/den)>Math.PI ? 1:0;
    parts += `<path d="M${cx},${cy} L${x0},${y0} A${r},${r} 0 ${large} 1 ${x1},${y1} Z" fill="${i<filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Si le numérateur dépasse le dénominateur (fraction impropre, ex. 5/4), il faut plusieurs
   disques : autant de disques complets que nécessaire, le dernier ne montrant que le reste. */
/* Ligne de réponse à compléter, sous la forme demandée (l'élève écrit lui-même les nombres). */
/* Une "case" de fraction à compléter, avec une vraie barre horizontale (comme une fraction
   habituelle), pas un simple "/". */
function fractionBlankHTML(){
  return `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 4px;line-height:1.3;">
    <span>....</span>
    <span style="display:block;width:100%;border-top:1.5px solid #20242E;"></span>
    <span>....</span>
  </span>`;
}
function fractionAnswerHTML(reponseSimple, reponseMixte){
  if(!reponseSimple && !reponseMixte) return '';
  const parts = [];
  if(reponseSimple) parts.push(fractionBlankHTML());
  if(reponseMixte) parts.push(`.... + ${fractionBlankHTML()}`);
  return `<p style="text-align:center;margin:8px 0 0;font-size:1.05rem;">${parts.join('&nbsp;&nbsp;&nbsp;ou&nbsp;&nbsp;&nbsp;')}</p>`;
}
function buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte){
  const nShapes = Math.max(1, Math.ceil(num/den));
  let discs = '';
  for(let i=0;i<nShapes;i++){
    const filled = vierge ? 0 : Math.max(0, Math.min(den, num - i*den));
    // chaque disque est plafonné à 150px : seul, il ne s'étire pas sur toute la largeur
    // disponible ; à plusieurs (fraction impropre), ils se partagent la largeur en rétrécissant.
    discs += `<div style="flex:1 1 0;max-width:150px;min-width:50px;">${singleDisqueSvg(filled, den)}</div>`;
  }
  const fracKatex = katexSpan(`\\dfrac{${num}}{${den}}`);
  const caption = vierge ? `Colorie ${fracKatex} du disque` : fracKatex;
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;max-width:${nShapes*150+((nShapes-1)*10)}px;margin:0 auto;">${discs}</div>
    ${showCaption!==false ? `<p class="hint" style="text-align:center;margin:4px 0 0;">${caption}</p>` : ''}
    ${fractionAnswerHTML(reponseSimple, reponseMixte)}`;
}
function previewDisque(){
  const num=parseInt(document.getElementById('disqueNum').value), den=parseInt(document.getElementById('disqueDen').value);
  const vierge = document.getElementById('disqueVierge').checked;
  const showCaption = document.getElementById('disqueShowCaption').checked;
  const reponseSimple = document.getElementById('disqueReponseSimple').checked;
  const reponseMixte = document.getElementById('disqueReponseMixte').checked;
  document.getElementById('disquePreview').innerHTML = (den>0&&num>=0) ? buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte) : '';
}
function openDisqueTool(){activateToolTab('shapeGroupWrap','shapeTabDisque','shapeTabRect'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('disquePanel').style.display='block'; document.getElementById('disquePreview').innerHTML=''; document.getElementById('disquePanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeDisqueTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('disquePanel').style.display='none'; }
function insertDisque(){
  const num=parseInt(document.getElementById('disqueNum').value), den=parseInt(document.getElementById('disqueDen').value);
  const vierge = document.getElementById('disqueVierge').checked;
  const showCaption = document.getElementById('disqueShowCaption').checked;
  const reponseSimple = document.getElementById('disqueReponseSimple').checked;
  const reponseMixte = document.getElementById('disqueReponseMixte').checked;
  if(!(den>0&&num>=0)) return;
  addPendingBlock('disque', buildDisqueSvg(num,den,vierge,showCaption,reponseSimple,reponseMixte), {num,den,vierge,showCaption,reponseSimple,reponseMixte}, 'reopenDisque');
  closeDisqueTool();
}
function reopenDisque(data){
  openDisqueTool();
  document.getElementById('disqueNum').value = data.num;
  document.getElementById('disqueDen').value = data.den;
  document.getElementById('disqueVierge').checked = !!data.vierge;
  document.getElementById('disqueShowCaption').checked = data.showCaption!==false;
  document.getElementById('disqueReponseSimple').checked = !!data.reponseSimple;
  document.getElementById('disqueReponseMixte').checked = !!data.reponseMixte;
  previewDisque();
}

/* ---- Rectangle fractionné ---- */
function singleRectFracSvg(filledSet, den, vertical, interactive){
  const W=180,H=90;
  let parts='';
  for(let i=0;i<den;i++){
    const filled = filledSet.has(i);
    const click = interactive ? ` onclick="toggleRectFracCell(${i})" style="cursor:pointer;"` : '';
    if(vertical){
      const w = W/den;
      parts += `<rect x="${i*w}" y="0" width="${w}" height="${H}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    } else {
      const h = H/den;
      parts += `<rect x="0" y="${i*h}" width="${W}" height="${h}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    }
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Partage en grille (lignes × colonnes à la fois) : pédagogiquement plus parlant qu'un simple
   partage à sens unique pour un dénominateur composé (ex. 1/6 vu comme une grille 2×3), en
   montrant clairement les deux facteurs du dénominateur. Remplissage case par case, de gauche
   à droite puis de haut en bas, comme la lecture. */
function singleRectGridSvg(filledSet, nRows, nCols, interactive){
  const W=180,H=90;
  const cw = W/nCols, ch = H/nRows;
  let parts='';
  for(let r=0;r<nRows;r++){
    for(let c=0;c<nCols;c++){
      const idx = r*nCols+c;
      const filled = filledSet.has(idx);
      const click = interactive ? ` onclick="toggleRectFracCell(${idx})" style="cursor:pointer;"` : '';
      parts += `<rect x="${c*cw}" y="${r*ch}" width="${cw}" height="${ch}" fill="${filled?'#FF8208':'#fff'}" stroke="#1C1B2E" stroke-width="1.6"${click}/>`;
    }
  }
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;">${parts}</svg>`;
}
/* Comme pour les disques : un numérateur supérieur au dénominateur (fraction impropre) a
   besoin de plusieurs rectangles, le dernier ne montrant que le reste. */
/* ---- Cubes empilés (perspective cavalière) ---- */
/* Perspective cavalière classique : la face avant est un vrai carré (pas de déformation), et
   la profondeur (z) part en oblique à 45° avec un coefficient de réduction de 0,5 -- exactement
   la convention utilisée dans les manuels français. Un cube occupe une case entière de la
   grille (x=droite, y=hauteur, z=profondeur), coordonnées entières. */
/* ---- Graphique (droites et fonctions, plusieurs courbes superposées) ---- */
/* Évalue une expression de fonction en x (ex. "2x-1", "x^2-3", "sqrt(x)"), avec les mêmes
   commodités d'écriture que le reste du site (multiplication implicite, ^ pour la puissance).
   Retourne NaN si l'expression est invalide ou non définie en ce point (sécurisé : pas d'accès
   au DOM ni à autre chose que Math, uniquement utilisé pour tracer une courbe). */
function evalFunctionExpr(expr, x){
  try{
    let js = expr
      .replace(/\^/g, '**')
      .replace(/\bsqrt\(/g, 'Math.sqrt(')
      .replace(/\bsin\(/g, 'Math.sin(')
      .replace(/\bcos\(/g, 'Math.cos(')
      .replace(/\btan\(/g, 'Math.tan(')
      .replace(/\bexp\(/g, 'Math.exp(')
      .replace(/\bln\(/g, 'Math.log(')
      .replace(/\babs\(/g, 'Math.abs(')
      .replace(/\bpi\b/gi, 'Math.PI')
      .replace(/(\d)\s*x/g, '$1*x')
      .replace(/(\d)\s*\(/g, '$1*(')
      .replace(/\)\s*\(/g, ')*(')
      .replace(/x\s*\(/g, 'x*(');
    if(!/^[0-9x+\-*/.,()\sA-Za-z]*$/.test(js)) return NaN; // caractères inattendus : on refuse
    const f = new Function('x', 'with(Math){ return ('+js+'); }');
    const v = f(x);
    return (typeof v==='number' && isFinite(v)) ? v : NaN;
  }catch(e){ return NaN; }
}
const GRAPH_COLORS = ['#0D5BA3','#D93025','#1F7A4D','#B26A00','#7B3FA0','#1C8C9C'];
let graphSvgIdCounter = 1;
/* ---- Diagrammes statistiques (camembert, barres, bâtons, histogramme) ---- */
/* Choisit un pas de graduation "rond" (1, 2, 5, 10, 20, 50...) proche de max/nDivisions --
   évite des graduations disgracieuses comme "tous les 3,7". */
function niceStep(maxV, target){
  target = target || 6;
  const raw = maxV/target;
  const mag = Math.pow(10, Math.floor(Math.log10(raw||1)));
  const norm = raw/mag;
  const step = norm<1.5 ? 1 : norm<3.5 ? 2 : norm<7.5 ? 5 : 10;
  return step*mag;
}
function pieChartSvg(data){
  const W=300,H=300,cx=150,cy=150,r=115;
  const total = data.reduce((s,d)=>s+(d.value||0),0) || 1;
  let angle = -90, paths='', labels='';
  data.forEach((d,i)=>{
    const v = d.value||0;
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const sweep = (v/total)*360;
    if(sweep<=0){ return; }
    const a1 = angle*Math.PI/180, a2 = (angle+sweep)*Math.PI/180;
    const x1 = cx+r*Math.cos(a1), y1 = cy+r*Math.sin(a1);
    const x2 = cx+r*Math.cos(a2), y2 = cy+r*Math.sin(a2);
    const largeArc = sweep>180 ? 1 : 0;
    paths += `<path d="M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${largeArc} 1 ${x2.toFixed(1)},${y2.toFixed(1)} Z" fill="${color}" stroke="#fff" stroke-width="2"/>`;
    const mid = (angle+sweep/2)*Math.PI/180;
    const pct = Math.round(v/total*100);
    if(pct>=5){
      const lx = cx+(r*0.62)*Math.cos(mid), ly = cy+(r*0.62)*Math.sin(mid);
      labels += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="13" fill="#fff" text-anchor="middle" font-weight="700" font-family="Space Grotesk, sans-serif">${pct}%</text>`;
    }
    angle += sweep;
  });
  const legend = data.map((d,i)=>{
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    return `<span style="display:inline-flex;align-items:center;gap:6px;margin:2px 12px 2px 0;"><span style="width:12px;height:12px;border-radius:3px;background:${color};display:inline-block;flex:none;"></span><span style="font-size:.85rem;">${escapeHtml(d.label||'')} (${d.value})</span></span>`;
  }).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;display:block;margin:6px auto;">${paths}${labels}</svg>
    <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:6px;">${legend}</div>`;
}
/* Diagrammes en barres, en bâtons et histogrammes partagent le même squelette (axes, graduations
   Y, étiquettes X) ; seule la largeur/l'espacement des barres change selon le mode. */
/* Histogramme : contrairement à un diagramme en barres classique, la LARGEUR de chaque
   rectangle doit respecter la largeur réelle de l'intervalle (les classes ne font pas
   forcément toutes la même largeur -- tailles, poids, âges...). Deux conventions possibles :
   - « à l'américaine » (useDensity=false) : la hauteur vaut l'effectif directement.
   - « à la française » (useDensity=true) : c'est l'AIRE du rectangle qui vaut l'effectif,
     donc hauteur = effectif ÷ largeur de la classe (densité) -- la convention rigoureuse dès
     que les classes n'ont pas toutes la même largeur. */
/* ---- Probabilités : sac/urne, cartes, arbre ---- */
function urnSvg(data, shape){
  const W=260,H=280,cx0=35,bandY=78,cw=190,bottomY=255;
  const clipId = 'urnClip'+(graphSvgIdCounter++);
  let balls = [];
  data.forEach(d=>{ for(let i=0;i<(d.count||0);i++) balls.push(d.color); });
  // Mélange déterministe (même rendu à chaque régénération), pour un aspect plus naturel qu'un
  // simple regroupement par couleur.
  balls = balls.map((c,i)=>({c,k:(i*2654435761)>>>0})).sort((a,b)=>(a.k%97)-(b.k%97)).map(o=>o.c);
  const n = balls.length || 1;
  // Zone intérieure (ellipse) où disperser librement les boules -- centre et rayons choisis
  // avec une marge confortable par rapport au contour réel, quelle que soit sa courbure. Plus
  // simple et plus naturel qu'un empilement en rangées (qui donnait des boules "posées en
  // équilibre" les unes sur les autres, peu réaliste).
  const ell = shape==='sac'
    ? {cx:cx0+cw/2, cy:(bandY+bottomY)/2+18, rx:cw/2-46, ry:(bottomY-bandY)/2-18}
    : {cx:cx0+cw/2, cy:(bandY+bottomY)/2+6, rx:cw/2-22, ry:(bottomY-bandY)/2-8};
  // Rayon des boules : on essaie le plus grand rayon raisonnable, puis on le réduit tant que
  // l'arrangement obtenu contient un chevauchement -- garantit qu'aucune boule ne touche jamais
  // une autre, quel que soit le nombre de boules à placer.
  const gap = 3; // espace minimal souhaité entre deux boules
  let r = Math.min(15, Math.sqrt((ell.rx*ell.ry*Math.PI*0.32)/n));
  let placed = [];
  while(r>=3.5){
    placed = [];
    let seed = 1234567;
    const rnd = () => { seed = (seed*1103515245+12345)>>>0; return (seed>>>8)/16777216; };
    let allOk = true;
    for(const color of balls){
      let best=null, bestScore=-1;
      for(let t=0;t<150;t++){
        const a = rnd()*Math.PI*2, dist = Math.sqrt(rnd());
        const px = ell.cx + Math.cos(a)*(ell.rx-r)*dist;
        const py = ell.cy + Math.sin(a)*(ell.ry-r)*dist;
        const minDist = placed.reduce((m,p)=>Math.min(m,Math.hypot(p.x-px,p.y-py)),Infinity);
        if(minDist > bestScore){ bestScore = minDist; best = {x:px,y:py}; }
        if(minDist >= r*2+gap) break;
      }
      if(bestScore < r*2+gap-0.01) allOk = false; // cette boule n'a trouvé aucune place sans chevauchement
      placed.push({x:best.x, y:best.y, color});
    }
    if(allOk) break;
    r -= 1;
  }
  let ballsHtml = placed.map(p=>{
    const bcx=p.x, bcy=p.y;
    // reflet clair en haut à gauche de chaque boule, pour un aspect brillant façon bille
    return `<circle cx="${bcx.toFixed(1)}" cy="${bcy.toFixed(1)}" r="${r.toFixed(1)}" fill="${p.color}" stroke="#1C1B2E" stroke-width="1.4"/>
      <ellipse cx="${(bcx-r*0.32).toFixed(1)}" cy="${(bcy-r*0.32).toFixed(1)}" rx="${(r*0.34).toFixed(1)}" ry="${(r*0.22).toFixed(1)}" fill="#fff" opacity="0.6" transform="rotate(-35 ${(bcx-r*0.32).toFixed(1)} ${(bcy-r*0.32).toFixed(1)})"/>`;
  }).join('');
  let outline, clipPath;
  if(shape==='sac'){
    // sommet ondulé (tissu resserré) : une série de petites bosses entre les deux épaules
    const nBumps=4, bumpW=(cw-30)/nBumps, topL=cx0+15, topR=cx0+cw-15;
    let scallop = `M${topL},${bandY-6}`;
    for(let i=0;i<nBumps;i++){
      const xm = topL+i*bumpW+bumpW/2, xe = topL+(i+1)*bumpW;
      const bump = i%2===0 ? -16 : -22;
      scallop += ` Q${xm},${bandY+bump} ${xe},${bandY-6}`;
    }
    outline = `<path d="M${cx0+22},${bandY+14} Q${cx0-18},${(bandY+bottomY)/2} ${cx0+cw*0.28},${bottomY} Q${cx0+cw*0.5},${bottomY+14} ${cx0+cw*0.72},${bottomY} Q${cx0+cw+18},${(bandY+bottomY)/2} ${cx0+cw-22},${bandY+14} Z" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>
      <path d="${scallop}" fill="none" stroke="#1C1B2E" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M${cx0+18},${bandY-2} L${cx0+22},${bandY+22} L${cx0+cw-22},${bandY+22} L${cx0+cw-18},${bandY-2} Z" fill="#C9975A" stroke="#1C1B2E" stroke-width="2"/>`;
    clipPath = `M${cx0+18},${bandY+18} Q${cx0-20},${(bandY+bottomY)/2} ${cx0+cw*0.28},${bottomY+4} Q${cx0+cw*0.5},${bottomY+18} ${cx0+cw*0.72},${bottomY+4} Q${cx0+cw+20},${(bandY+bottomY)/2} ${cx0+cw-18},${bandY+18} Z`;
  } else {
    outline = `<path d="M${cx0+8},${bandY} L${cx0+18},${bottomY} Q${cx0+cw/2},${bottomY+14} ${cx0+cw-18},${bottomY} L${cx0+cw-8},${bandY} Z" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>
      <ellipse cx="${cx0+cw/2}" cy="${bandY}" rx="${cw/2-8}" ry="9" fill="none" stroke="#1C1B2E" stroke-width="2.2"/>`;
    clipPath = `M${cx0+6},${bandY} L${cx0+18},${bottomY+2} Q${cx0+cw/2},${bottomY+16} ${cx0+cw-18},${bottomY+2} L${cx0+cw-6},${bandY} Z`;
  }
  const legend = data.filter(d=>d.count>0).map(d=>`<span style="display:inline-flex;align-items:center;gap:5px;margin:2px 10px 2px 0;"><span style="width:11px;height:11px;border-radius:50%;background:${d.color};display:inline-block;flex:none;"></span><span style="font-size:.85rem;">${escapeHtml(d.label||'')} : ${d.count}</span></span>`).join('');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:260px;display:block;margin:6px auto;">
    <defs><clipPath id="${clipId}"><path d="${clipPath}"/></clipPath></defs>
    <g clip-path="url(#${clipId})">${ballsHtml}</g>
    ${outline}
  </svg>
  <div style="display:flex;flex-wrap:wrap;justify-content:center;margin-top:4px;">${legend}</div>`;
}
const SUIT_SYMBOLS = {pique:'♠',coeur:'♥',carreau:'♦',trefle:'♣'};
const SUIT_COLORS = {pique:'#1C1B2E',coeur:'#D93025',carreau:'#D93025',trefle:'#1C1B2E'};
/* Dés : pour un dé à 6 faces, pastilles classiques (comme un vrai dé) ; pour les autres
   nombres de faces (4, 8, 10, 12, 20...), le nombre est simplement écrit au centre, une vraie
   forme polyédrique étant hors de portée d'un rendu SVG simple. */
function dicePipsHTML(v, x, y, size, pipColor){
  const positions = {
    1:[[.5,.5]], 2:[[.27,.27],[.73,.73]], 3:[[.27,.27],[.5,.5],[.73,.73]],
    4:[[.27,.27],[.73,.27],[.27,.73],[.73,.73]],
    5:[[.27,.27],[.73,.27],[.5,.5],[.27,.73],[.73,.73]],
    6:[[.27,.24],[.73,.24],[.27,.5],[.73,.5],[.27,.76],[.73,.76]],
  };
  return (positions[v]||[]).map(([px,py])=>`<circle cx="${(x+px*size).toFixed(1)}" cy="${(y+py*size).toFixed(1)}" r="${(size*0.09).toFixed(1)}" fill="${pipColor}"/>`).join('');
}
function diceSvg(dice){
  if(!dice.length) return '<p class="hint">Ajoute au moins un dé.</p>';
  const size=64, gap=14;
  const W = dice.length*(size+gap)-gap+16, H = size+24;
  let html='';
  dice.forEach((d,i)=>{
    const x=8+i*(size+gap), y=8;
    const bg = d.color||'#fff';
    const isDark = bg==='#1C1B2E' || bg==='#0D5BA3' || bg==='#D93025' || bg==='#1F7A4D' || bg==='#7B3FA0';
    const fg = isDark ? '#fff' : '#1C1B2E';
    html += `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="9" fill="${bg}" stroke="#1C1B2E" stroke-width="2"/>`;
    if(d.faces===6 && d.value>=1 && d.value<=6){
      html += dicePipsHTML(d.value, x, y, size, fg);
    } else {
      html += `<text x="${x+size/2}" y="${y+size/2+8}" font-size="24" text-anchor="middle" font-weight="700" font-family="Space Grotesk, sans-serif" fill="${fg}">${d.value}</text>`;
    }
    html += `<text x="${x+size/2}" y="${y+size+16}" font-size="10" text-anchor="middle" fill="#666" font-family="JetBrains Mono, monospace">d${d.faces}</text>`;
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${html}</svg>`;
}
function cardsSvg(cards){
  if(!cards.length) return '<p class="hint">Sélectionne au moins une carte.</p>';
  const cw=50,ch=70,gap=7;
  const perRow = Math.min(cards.length, 8);
  const rows = Math.ceil(cards.length/perRow);
  const W = perRow*(cw+gap)-gap+16, H = rows*(ch+gap)-gap+16;
  let html='';
  cards.forEach((c,i)=>{
    const col=i%perRow, row=Math.floor(i/perRow);
    const x=8+col*(cw+gap), y=8+row*(ch+gap);
    const color = SUIT_COLORS[c.suit], symbol = SUIT_SYMBOLS[c.suit];
    html += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="6" fill="#fff" stroke="#1C1B2E" stroke-width="1.4"/>
      <text x="${x+6}" y="${y+18}" font-size="14" font-weight="700" fill="${color}" font-family="Space Grotesk, sans-serif">${c.rank}</text>
      <text x="${x+6}" y="${y+34}" font-size="16" fill="${color}">${symbol}</text>
      <text x="${x+cw-6}" y="${y+ch-8}" font-size="14" font-weight="700" fill="${color}" text-anchor="end" font-family="Space Grotesk, sans-serif" transform="rotate(180 ${x+cw-6} ${y+ch-8})">${c.rank}</text>`;
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${html}</svg>`;
}
/* Arbre de probabilité : calcule d'abord la position verticale de chaque noeud (les feuilles se
   répartissent également, un noeud parent se centre sur ses enfants), puis relie chaque parent
   à ses enfants par un trait, avec l'événement et sa probabilité comme étiquettes. */
function treeLayout(node, yTop, yBottom){
  if(!node.children || !node.children.length) return {node, y:(yTop+yBottom)/2, children:[]};
  const n = node.children.length, slot=(yBottom-yTop)/n;
  const kids = node.children.map((c,i)=>treeLayout(c, yTop+i*slot, yTop+(i+1)*slot));
  return {node, y:kids.reduce((s,k)=>s+k.y,0)/kids.length, children:kids};
}
/* Insère du texte "riche" (LaTeX entre $...$, ou texte simple) dans le SVG via foreignObject --
   nécessaire pour écrire correctement des notations comme $\overline{A}$ ou $P(B \mid A)$,
   impossible avec un simple <text> SVG. */
function svgRichText(x, y, text, opts){
  opts = opts||{};
  const w = opts.width||100, h = opts.height||22;
  let ox = x;
  const align = opts.anchor==='end' ? 'right' : opts.anchor==='middle' ? 'center' : 'left';
  if(opts.anchor==='middle') ox = x-w/2; else if(opts.anchor==='end') ox = x-w;
  return `<foreignObject x="${ox.toFixed(1)}" y="${(y-h+5).toFixed(1)}" width="${w}" height="${h}" style="overflow:visible;">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:12px;text-align:${align};color:${opts.color||'#1C1B2E'};font-weight:${opts.bold?700:400};font-family:'Space Grotesk',sans-serif;white-space:nowrap;line-height:1.3;">${renderMathText(text||'')}</div>
  </foreignObject>`;
}
function treeSvg(root){
  const maxDepth = (n,d)=>!n.children||!n.children.length ? d : Math.max(...n.children.map(c=>maxDepth(c,d+1)));
  const depth = maxDepth(root,0) || 1;
  const dx = 140, padL=70, padTB=24;
  const nLeaves = (n)=>!n.children||!n.children.length?1:n.children.reduce((s,c)=>s+nLeaves(c),0);
  const H = Math.max(nLeaves(root)*50, 80)+padTB*2;
  const W = padL + depth*dx + 140;
  const layout = treeLayout(root, padTB, H-padTB);
  let lines='', labels='', nodes='';
  function walk(l, x, isRoot){
    nodes += `<circle cx="${x}" cy="${l.y.toFixed(1)}" r="4" fill="#1C1B2E"/>`;
    if(isRoot && l.node.label) labels += svgRichText(x-8, l.y-9, l.node.label, {anchor:'end', bold:true});
    const isLeaf = !l.children.length;
    if(isLeaf && !isRoot && l.node.note) labels += svgRichText(x+16, l.y+5, l.node.note, {anchor:'start', width:120, color:'#1F7A4D'});
    l.children.forEach(child=>{
      const x2 = x+dx;
      lines += `<line x1="${x}" y1="${l.y.toFixed(1)}" x2="${x2}" y2="${child.y.toFixed(1)}" stroke="#1C1B2E" stroke-width="1.6"/>`;
      const midx=(x+x2)/2, midy=(l.y+child.y)/2;
      const goingUp = child.y < l.y - 1;
      // Dégagement plus généreux côté montant : une fraction \dfrac (numérateur + barre +
      // dénominateur) est nettement plus haute qu'une simple ligne de texte, le dénominateur
      // était coupé par le trait faute de marge suffisante.
      const probaY = goingUp ? midy-16 : midy+26;
      if(child.node.proba) labels += svgRichText(midx, probaY, child.node.proba, {anchor:'middle', width:80, color:'#0D5BA3', height:30});
      const labelY = goingUp ? child.y-9 : child.y+22;
      labels += svgRichText(x2+8, labelY, child.node.label||'', {anchor:'start', width:100, bold:true});
      walk(child, x2, false);
    });
  }
  walk(layout, padL, true);
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block;margin:6px auto;">${lines}${nodes}${labels}</svg>`;
}
function histogramSvg(data, useDensity){
  const W=420,H=300,padL=45,padB=36,padT=14,padR=14;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const classes = data.filter(d=>d.classMin!=null && d.classMax!=null && d.classMax>d.classMin);
  if(!classes.length) return '<p class="hint">Renseigne au moins une classe valide (borne supérieure > borne inférieure).</p>';
  const xMin = Math.min(...classes.map(d=>d.classMin));
  const xMax = Math.max(...classes.map(d=>d.classMax));
  const X = v => padL + (xMax>xMin ? (v-xMin)/(xMax-xMin) : 0)*plotW;
  const heights = classes.map(d=>{
    const w = d.classMax-d.classMin;
    return useDensity ? (d.value||0)/w : (d.value||0);
  });
  const maxH = Math.max(...heights, 1e-9);
  const yStep = niceStep(maxH);
  const yTop = Math.ceil(maxH/yStep)*yStep || yStep;
  let grid='', yLabels='', bars='';
  for(let v=0; v<=yTop+1e-9; v+=yStep){
    const y = padT+plotH-(v/yTop)*plotH;
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="rgba(28,43,57,.1)"/>`;
    yLabels += `<text x="${padL-6}" y="${(y+4).toFixed(1)}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(Math.round(v*1000)/1000)}</text>`;
  }
  classes.forEach((d,i)=>{
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const x1 = X(d.classMin), x2 = X(d.classMax);
    const bh = (heights[i]/yTop)*plotH;
    const y = padT+plotH-bh;
    bars += `<rect x="${x1.toFixed(1)}" y="${y.toFixed(1)}" width="${(x2-x1).toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" stroke="#fff" stroke-width="1"/>`;
  });
  const boundaries = [...new Set(classes.flatMap(d=>[d.classMin,d.classMax]))].sort((a,b)=>a-b);
  const xLabels = boundaries.map(v=>`<text x="${X(v).toFixed(1)}" y="${(padT+plotH+16).toFixed(1)}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`).join('');
  const axes = `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${padL}" y1="${padT+plotH}" x2="${W-padR}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  const axisNote = `<text x="${W-padR}" y="${padT-2}" font-size="9" text-anchor="end" fill="#666" font-family="JetBrains Mono, monospace">${useDensity?'densité (aire = effectif)':'hauteur = effectif'}</text>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block;margin:6px auto;">
    ${grid}${axes}${bars}${yLabels}${xLabels}${axisNote}
  </svg>`;
}
function barLikeChartSvg(data, mode){
  const W=420,H=300,padL=42,padB=36,padT=14,padR=14;
  const plotW=W-padL-padR, plotH=H-padT-padB;
  const maxV = Math.max(...data.map(d=>d.value||0), 1);
  const n = data.length || 1;
  const yStep = niceStep(maxV);
  const yTop = Math.ceil(maxV/yStep)*yStep;
  let grid='', yLabels='';
  for(let v=0; v<=yTop+1e-9; v+=yStep){
    const y = padT+plotH-(v/yTop)*plotH;
    grid += `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W-padR}" y2="${y.toFixed(1)}" stroke="rgba(28,43,57,.1)"/>`;
    yLabels += `<text x="${padL-6}" y="${(y+4).toFixed(1)}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(Math.round(v*100)/100)}</text>`;
  }
  const slot = plotW/n;
  // bâtons : trait fin + point ; histogramme : barres jointives ; barres : espacées
  const barW = mode==='batons' ? 0 : mode==='histogramme' ? slot : slot*0.62;
  let bars='', xLabels='';
  data.forEach((d,i)=>{
    const v = d.value||0;
    const color = d.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    const bh = (v/yTop)*plotH;
    const xCenter = padL + i*slot + slot/2;
    const y = padT+plotH-bh;
    if(mode==='batons'){
      bars += `<line x1="${xCenter.toFixed(1)}" y1="${(padT+plotH).toFixed(1)}" x2="${xCenter.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${color}" stroke-width="2.4"/>
        <circle cx="${xCenter.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${color}"/>`;
    } else {
      const x = xCenter - barW/2;
      bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" fill="${color}" stroke="${mode==='histogramme'?'#fff':'none'}" stroke-width="${mode==='histogramme'?1:0}"/>`;
    }
    xLabels += `<text x="${xCenter.toFixed(1)}" y="${(padT+plotH+16).toFixed(1)}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${escapeHtml(d.label||'')}</text>`;
  });
  const axes = `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>
    <line x1="${padL}" y1="${padT+plotH}" x2="${W-padR}" y2="${padT+plotH}" stroke="#1C1B2E" stroke-width="1.6"/>`;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;display:block;margin:6px auto;">
    ${grid}${axes}${bars}${yLabels}${xLabels}
  </svg>`;
}

function graphSvg(xMin,xMax,yMin,yMax,curves,xUnitPi,labelStepX,labelStepY){
  labelStepX = labelStepX && labelStepX>=1 ? Math.round(labelStepX) : 1;
  labelStepY = labelStepY && labelStepY>=1 ? Math.round(labelStepY) : 1;
  const W=420,H=340,pad=30;
  const clipId = 'gClip'+(graphSvgIdCounter++);
  const sx = (W-2*pad)/(xMax-xMin), sy=(H-2*pad)/(yMax-yMin);
  const X = v => pad + (v-xMin)*sx;
  const Y = v => H-pad-(v-yMin)*sy;
  const showOrigin = xMin<=0 && xMax>=0 && yMin<=0 && yMax>=0;
  const xAxisY = Y(Math.max(yMin, Math.min(yMax, 0))); // position de l'axe des x (clampée si 0 hors champ)
  const yAxisX = X(Math.max(xMin, Math.min(xMax, 0)));
  /* Réécrit une valeur en fraction de π (π/2, π, 3π/2...) pour l'axe des x en mode radians --
     pédagogiquement indispensable pour les fonctions trigonométriques. */
  /* Écrit une valeur en fraction de π (π/2, π, 3π/2...) pour l'axe des x en mode radians --
     pédagogiquement indispensable pour les fonctions trigonométriques. Les demis sont dessinés
     comme une vraie fraction empilée (numérateur / barre / dénominateur), pas un texte plat
     "π/2", pour rester fidèle à l'écriture mathématique habituelle. */
  function piLabelSvg(v, cx, cy){
    const n = Math.round(v/(Math.PI/2));
    if(n===0) return `<text x="${cx}" y="${cy}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">0</text>`;
    const sign = n<0 ? '-' : '';
    const a = Math.abs(n);
    if(a%2===0){
      const k=a/2;
      const label = sign+(k===1?'π':k+'π');
      return `<text x="${cx}" y="${cy}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${label}</text>`;
    }
    const numText = sign+(a===1?'π':a+'π');
    return `<text x="${cx}" y="${cy-8}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">${numText}</text>
      <line x1="${cx-9}" y1="${cy-3}" x2="${cx+9}" y2="${cy-3}" stroke="#1C1B2E" stroke-width="1"/>
      <text x="${cx}" y="${cy+8}" font-size="10" text-anchor="middle" font-family="JetBrains Mono, monospace">2</text>`;
  }
  let grid='', xLabels='', yLabels='';
  const xStep = xUnitPi ? Math.PI/2 : 1;
  const xStart = xUnitPi ? Math.ceil(xMin/xStep)*xStep : Math.ceil(xMin);
  let xi = Math.round(xStart/xStep);
  for(let v=xStart; v<=xMax+1e-9; v+=xStep, xi++){
    const rv = Math.round(v*1000)/1000;
    grid += `<line x1="${X(rv)}" y1="${pad}" x2="${X(rv)}" y2="${H-pad}" stroke="rgba(28,43,57,.1)" stroke-width="1"/>`;
    if(Math.abs(rv)>1e-6 && xi%labelStepX===0){
      xLabels += xUnitPi ? piLabelSvg(rv, X(rv), xAxisY+16) : `<text x="${X(rv)}" y="${xAxisY+15}" font-size="11" text-anchor="middle" font-family="JetBrains Mono, monospace">${frDecimal(rv)}</text>`;
    }
  }
  for(let v=Math.ceil(yMin); v<=yMax; v++){
    grid += `<line x1="${pad}" y1="${Y(v)}" x2="${W-pad}" y2="${Y(v)}" stroke="rgba(28,43,57,.1)" stroke-width="1"/>`;
    if(v!==0 && v%labelStepY===0) yLabels += `<text x="${yAxisX-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" font-family="JetBrains Mono, monospace">${frDecimal(v)}</text>`;
  }
  const axes = `<line x1="${pad-10}" y1="${xAxisY}" x2="${W-pad+10}" y2="${xAxisY}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#gAxeArrowX)"/>
    <line x1="${yAxisX}" y1="${H-pad+10}" x2="${yAxisX}" y2="${pad-10}" stroke="#1C1B2E" stroke-width="1.6" marker-end="url(#gAxeArrowY)"/>`;
  const originLabel = showOrigin ? `<text x="${X(0)-12}" y="${Y(0)+18}" font-size="13" font-weight="700" font-family="Space Grotesk, sans-serif">O</text>` : '';
  let curvesHtml = '';
  curves.forEach((c,i)=>{
    const color = c.color || GRAPH_COLORS[i%GRAPH_COLORS.length];
    if(c.type==='droite'){
      const {x1,y1,x2,y2} = c;
      if(x2===x1){
        curvesHtml += `<line x1="${X(x1)}" y1="${pad}" x2="${X(x1)}" y2="${H-pad}" stroke="${color}" stroke-width="2.2"/>`;
      } else {
        const m = (y2-y1)/(x2-x1), b = y1-m*x1;
        curvesHtml += `<line x1="${X(xMin)}" y1="${Y(m*xMin+b)}" x2="${X(xMax)}" y2="${Y(m*xMax+b)}" stroke="${color}" stroke-width="2.2"/>`;
      }
      curvesHtml += `<circle cx="${X(x1)}" cy="${Y(y1)}" r="3.2" fill="${color}"/><circle cx="${X(x2)}" cy="${Y(y2)}" r="3.2" fill="${color}"/>`;
    } else if(c.type==='fonction'){
      let d='', started=false;
      // 400 points (au lieu de 240) pour que le tracé s'arrête net, au plus près du bord réel,
      // sans le forcer à plat (aucune tolérance de dépassement : dès qu'un point calculé sort
      // de la zone visible, le tracé s'interrompt à cet endroit précis -- comportement naturel
      // d'une calculatrice graphique, plutôt qu'un plafonnement qui créait des lignes plates
      // disgracieuses en haut/bas du cadre).
      const steps = 400;
      for(let k=0;k<=steps;k++){
        const xv = xMin + (xMax-xMin)*k/steps;
        const yv = evalFunctionExpr(c.expr, xv);
        if(isNaN(yv) || yv<yMin || yv>yMax){ started=false; continue; }
        d += (started?'L':'M')+X(xv).toFixed(1)+','+Y(yv).toFixed(1)+' ';
        started = true;
      }
      curvesHtml += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.2"/>`;
    }
  });
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;height:auto;display:block;margin:6px auto;">
    <defs>
      <marker id="gAxeArrowX" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <marker id="gAxeArrowY" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1C1B2E"/></marker>
      <clipPath id="${clipId}"><rect x="0" y="0" width="${W}" height="${H}"/></clipPath>
    </defs>
    <g clip-path="url(#${clipId})">
      ${grid}${axes}${originLabel}${xLabels}${yLabels}${curvesHtml}
    </g>
  </svg>`;
}

function cubeStackSvg(cubes, selectedIdx, interactive){
  const S = 46, k = 0.5, theta = Math.PI/4;
  const dx = Math.cos(theta)*k*S, dy = Math.sin(theta)*k*S;
  const proj = (x,y,z) => ({ sx: x*S + z*dx, sy: -y*S - z*dy });
  // tri peintre : les cubes les plus au fond (z grand) sont dessinés en premier, les plus
  // proches en dernier, pour qu'ils recouvrent correctement ceux derrière eux.
  const order = cubes.map((c,i)=>i).sort((ia,ib)=>{
    const a=cubes[ia], b=cubes[ib];
    return (b.z-a.z) || (a.y-b.y) || (a.x-b.x);
  });
  const pts = arr => arr.map(p=>`${p.sx.toFixed(1)},${p.sy.toFixed(1)}`).join(' ');
  let shapes = '';
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  order.forEach(i=>{
    const c = cubes[i];
    const isSel = interactive && i===selectedIdx;
    const p000=proj(c.x,c.y,c.z), p100=proj(c.x+1,c.y,c.z), p010=proj(c.x,c.y+1,c.z), p110=proj(c.x+1,c.y+1,c.z);
    const p001=proj(c.x,c.y,c.z+1), p101=proj(c.x+1,c.y,c.z+1), p011=proj(c.x,c.y+1,c.z+1), p111=proj(c.x+1,c.y+1,c.z+1);
    [p000,p100,p010,p110,p001,p101,p011,p111].forEach(p=>{ minX=Math.min(minX,p.sx); maxX=Math.max(maxX,p.sx); minY=Math.min(minY,p.sy); maxY=Math.max(maxY,p.sy); });
    const stroke = isSel ? '#0D5BA3' : '#1C1B2E';
    const sw = isSel ? 2.6 : 1.4;
    const click = interactive ? ` onclick="selectCube(${i})" style="cursor:pointer;"` : '';
    shapes += `<polygon points="${pts([p000,p100,p110,p010])}" fill="#FFB067" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
    shapes += `<polygon points="${pts([p010,p110,p111,p011])}" fill="#FFDCAE" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
    shapes += `<polygon points="${pts([p100,p101,p111,p110])}" fill="#E07C1E" stroke="${stroke}" stroke-width="${sw}"${click}/>`;
  });
  const pad = 12;
  const W = (maxX-minX)+pad*2, H = (maxY-minY)+pad*2;
  const offX = pad-minX, offY = pad-minY;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="width:100%;max-width:340px;height:auto;display:block;margin:6px auto;">
    <g transform="translate(${offX},${offY})">${shapes}</g>
  </svg>`;
}

function buildRectFracSvg(num,den,vertical,vierge,showCaption,reponseSimple,reponseMixte,gridRows,gridCols,customSet,interactive){
  const isGrid = gridRows>1 && gridCols>1;
  const effectiveDen = isGrid ? gridRows*gridCols : den;
  const nShapes = Math.max(1, Math.ceil(num/effectiveDen));
  let rects = '';
  for(let i=0;i<nShapes;i++){
    // Le dessin interactif (clic pour colorier/décolorier une case précise) n'a de sens que
    // pour une fraction propre, dessinée en une seule forme -- au-delà, on revient au
    // remplissage séquentiel habituel (moins fréquent en pratique pour ce type d'exercice).
    let filledSet;
    if(customSet && nShapes===1 && !vierge){
      filledSet = customSet;
    } else {
      const filled = vierge ? 0 : Math.max(0, Math.min(effectiveDen, num - i*effectiveDen));
      filledSet = new Set(Array.from({length:filled}, (_,k)=>k));
    }
    const svg = isGrid ? singleRectGridSvg(filledSet, gridRows, gridCols, interactive && nShapes===1) : singleRectFracSvg(filledSet, den, vertical, interactive && nShapes===1);
    rects += `<div style="flex:1 1 0;max-width:180px;min-width:60px;">${svg}</div>`;
  }
  const displayNum = (customSet && nShapes===1 && !vierge) ? customSet.size : num;
  const fracKatex = katexSpan(`\\dfrac{${displayNum}}{${effectiveDen}}`);
  const caption = vierge ? `Colorie ${katexSpan(`\\dfrac{${num}}{${effectiveDen}}`)} du rectangle` : fracKatex;
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;max-width:${nShapes*180+((nShapes-1)*10)}px;margin:0 auto;">${rects}</div>
    ${showCaption!==false ? `<p class="hint" style="text-align:center;margin:4px 0 0;">${caption}</p>` : ''}
    ${fractionAnswerHTML(reponseSimple, reponseMixte)}`;
}
/* Motif de cases colorées choisi à la main par clic (indices), pour l'outil rectangle en cours
   de construction. Retombe sur un remplissage séquentiel simple dès qu'on retape un nombre
   dans "Parts colorées", ou qu'on change le découpage (dénominateur, lignes/colonnes, sens). */
let rectFracCustomSet = new Set([0,1,2]);
function syncRectFracCustomSetFromNum(){
  const num = parseInt(document.getElementById('rectFracNum').value)||0;
  rectFracCustomSet = new Set(Array.from({length:num}, (_,k)=>k));
}
function toggleRectFracCell(idx){
  if(rectFracCustomSet.has(idx)) rectFracCustomSet.delete(idx); else rectFracCustomSet.add(idx);
  document.getElementById('rectFracNum').value = rectFracCustomSet.size;
  previewRectFrac();
}
function toggleRectFracGrid(){
  const on = document.getElementById('rectFracGrid').checked;
  document.getElementById('rectFracGridRow').style.display = on ? 'inline' : 'none';
  document.getElementById('rectFracDenRow').style.display = on ? 'none' : 'inline';
  document.getElementById('rectFracVert').closest('label').style.display = on ? 'none' : 'inline-flex';
  syncRectFracCustomSetFromNum();
}
function previewRectFrac(){
  const num=parseInt(document.getElementById('rectFracNum').value), den=parseInt(document.getElementById('rectFracDen').value);
  const vert = document.getElementById('rectFracVert').checked;
  const vierge = document.getElementById('rectFracVierge').checked;
  const showCaption = document.getElementById('rectFracShowCaption').checked;
  const reponseSimple = document.getElementById('rectFracReponseSimple').checked;
  const reponseMixte = document.getElementById('rectFracReponseMixte').checked;
  const isGrid = document.getElementById('rectFracGrid').checked;
  const rows = isGrid ? parseInt(document.getElementById('rectFracRows').value)||2 : null;
  const cols = isGrid ? parseInt(document.getElementById('rectFracCols').value)||2 : null;
  document.getElementById('rectFracPreview').innerHTML = (isGrid || (den>0&&num>=0)) ? buildRectFracSvg(num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,rectFracCustomSet,true) : '';
}
function openRectFracTool(){activateToolTab('shapeGroupWrap','shapeTabRect','shapeTabDisque'); document.getElementById('toolsModalOverlay').style.display='flex'; document.getElementById('rectFracPanel').style.display='block'; document.getElementById('rectFracPreview').innerHTML=''; document.getElementById('rectFracPanel').scrollIntoView({behavior:'smooth',block:'nearest'}); }
function closeRectFracTool(){document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('rectFracPanel').style.display='none'; }
function insertRectFrac(){
  const num=parseInt(document.getElementById('rectFracNum').value), den=parseInt(document.getElementById('rectFracDen').value);
  const vert = document.getElementById('rectFracVert').checked;
  const vierge = document.getElementById('rectFracVierge').checked;
  const showCaption = document.getElementById('rectFracShowCaption').checked;
  const reponseSimple = document.getElementById('rectFracReponseSimple').checked;
  const reponseMixte = document.getElementById('rectFracReponseMixte').checked;
  const isGrid = document.getElementById('rectFracGrid').checked;
  const rows = isGrid ? parseInt(document.getElementById('rectFracRows').value)||2 : null;
  const cols = isGrid ? parseInt(document.getElementById('rectFracCols').value)||2 : null;
  if(!isGrid && !(den>0&&num>=0)) return;
  const customArr = Array.from(rectFracCustomSet);
  addPendingBlock('rectFrac', buildRectFracSvg(num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,rectFracCustomSet,false), {num,den,vert,vierge,showCaption,reponseSimple,reponseMixte,rows,cols,customArr}, 'reopenRectFrac');
  closeRectFracTool();
}
function reopenRectFrac(data){
  openRectFracTool();
  document.getElementById('rectFracNum').value = data.num;
  document.getElementById('rectFracDen').value = data.den;
  document.getElementById('rectFracVert').checked = data.vert;
  document.getElementById('rectFracVierge').checked = !!data.vierge;
  document.getElementById('rectFracShowCaption').checked = data.showCaption!==false;
  document.getElementById('rectFracReponseSimple').checked = !!data.reponseSimple;
  document.getElementById('rectFracReponseMixte').checked = !!data.reponseMixte;
  document.getElementById('rectFracGrid').checked = !!(data.rows && data.cols);
  if(data.rows) document.getElementById('rectFracRows').value = data.rows;
  if(data.cols) document.getElementById('rectFracCols').value = data.cols;
  toggleRectFracGrid();
  rectFracCustomSet = new Set(data.customArr && data.customArr.length ? data.customArr : Array.from({length:data.num||0}, (_,k)=>k));
  previewRectFrac();
}


/* ---- Outil Cubes empilés (perspective cavalière) ---- */
let cubesState = [{x:0,y:0,z:0},{x:1,y:0,z:0}];
let cubesSelected = 0;
function openCubesTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('cubesPanel').style.display='block';
  cubesState = [{x:0,y:0,z:0},{x:1,y:0,z:0}];
  cubesSelected = 0;
  previewCubes();
  document.getElementById('cubesPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeCubesTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('cubesPanel').style.display='none'; }
function previewCubes(){
  document.getElementById('cubesPreview').innerHTML = cubeStackSvg(cubesState, cubesSelected, true);
}
function selectCube(i){ cubesSelected = i; previewCubes(); }
function addCube(){
  // Place le nouveau cube juste à côté du cube sélectionné (case vide la plus proche), pour
  // qu'il apparaisse toujours visible plutôt que superposé à un autre.
  const base = cubesState[cubesSelected] || {x:0,y:0,z:0};
  const candidates = [{x:base.x+1,y:base.y,z:base.z},{x:base.x-1,y:base.y,z:base.z},{x:base.x,y:base.y,z:base.z+1},{x:base.x,y:base.y+1,z:base.z}];
  const occupied = c => cubesState.some(k=>k.x===c.x&&k.y===c.y&&k.z===c.z);
  const spot = candidates.find(c=>!occupied(c)) || {x:base.x, y:base.y+cubesState.length, z:base.z};
  cubesState.push(spot);
  cubesSelected = cubesState.length-1;
  previewCubes();
}
function removeCube(){
  if(cubesState.length<=1) return; // toujours au moins un cube
  cubesState.splice(cubesSelected,1);
  cubesSelected = Math.max(0, cubesSelected-1);
  previewCubes();
}
function moveCube(dx,dy,dz){
  if(!cubesState[cubesSelected]) return;
  const c = cubesState[cubesSelected];
  const next = {x:c.x+dx, y:c.y+dy, z:c.z+dz};
  if(next.y<0) return; // ne descend pas sous le sol
  if(cubesState.some((k,i)=>i!==cubesSelected && k.x===next.x && k.y===next.y && k.z===next.z)) return; // case déjà occupée
  cubesState[cubesSelected] = next;
  previewCubes();
}
function insertCubeStack(){
  const html = cubeStackSvg(cubesState, cubesSelected, false);
  addPendingBlock('cubes', html, {cubes: JSON.parse(JSON.stringify(cubesState))}, 'reopenCubes');
  closeCubesTool();
}
function reopenCubes(data){
  openCubesTool();
  cubesState = JSON.parse(JSON.stringify(data.cubes||[{x:0,y:0,z:0},{x:1,y:0,z:0}]));
  cubesSelected = 0;
  previewCubes();
}

/* ---- Outil Graphique (droites et fonctions) ---- */
let graphCurves = [];
let graphNextId = 1;
function openGraphTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('graphPanel').style.display='block';
  document.getElementById('graphXPi').checked = false;
  document.getElementById('graphXMin').value = -5;
  document.getElementById('graphXMax').value = 5;
  document.getElementById('graphLabelStepX').value = 1;
  document.getElementById('graphLabelStepY').value = 1;
  graphCurves = [{id:graphNextId++, type:'fonction', expr:'x^2-3'}];
  renderGraphCurvesList();
  document.getElementById('graphPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeGraphTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('graphPanel').style.display='none'; }
function addGraphCurve(type){
  graphCurves.push(type==='droite' ? {id:graphNextId++, type:'droite', x1:0,y1:0,x2:1,y2:1} : {id:graphNextId++, type:'fonction', expr:'x'});
  renderGraphCurvesList();
}
function removeGraphCurve(id){
  graphCurves = graphCurves.filter(c=>c.id!==id);
  renderGraphCurvesList();
}
function updateGraphCurve(id, field, value){
  const c = graphCurves.find(c=>c.id===id);
  if(c) c[field] = (field==='expr') ? value : parseFloat(value);
  previewGraph();
}
function renderGraphCurvesList(){
  const box = document.getElementById('graphCurvesList');
  box.innerHTML = graphCurves.map((c,i)=>{
    const color = GRAPH_COLORS[i%GRAPH_COLORS.length];
    const swatch = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color};margin-right:6px;"></span>`;
    if(c.type==='droite'){
      return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
        ${swatch}<span class="hint" style="margin:0;">Droite :</span>
        <label class="hint" style="margin:0;">A(<input type="number" value="${c.x1}" oninput="updateGraphCurve(${c.id},'x1',this.value)" style="width:50px;"> ;
        <input type="number" value="${c.y1}" oninput="updateGraphCurve(${c.id},'y1',this.value)" style="width:50px;">)</label>
        <label class="hint" style="margin:0;">B(<input type="number" value="${c.x2}" oninput="updateGraphCurve(${c.id},'x2',this.value)" style="width:50px;"> ;
        <input type="number" value="${c.y2}" oninput="updateGraphCurve(${c.id},'y2',this.value)" style="width:50px;">)</label>
        <button type="button" onclick="removeGraphCurve(${c.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
      </div>`;
    }
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      ${swatch}<span class="hint" style="margin:0;">f(x) =</span>
      <input type="text" value="${escapeHtml(c.expr)}" oninput="updateGraphCurve(${c.id},'expr',this.value)" style="width:160px;">
      <button type="button" onclick="removeGraphCurve(${c.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
    </div>`;
  }).join('');
  previewGraph();
}
function previewGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  const labelStepX = parseInt(document.getElementById('graphLabelStepX').value)||1;
  const labelStepY = parseInt(document.getElementById('graphLabelStepY').value)||1;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  const yMin=parseFloat(document.getElementById('graphYMin').value), yMax=parseFloat(document.getElementById('graphYMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  document.getElementById('graphPreview').innerHTML = (xMax>xMin && yMax>yMin) ? graphSvg(xMin,xMax,yMin,yMax,graphCurves,xPi,labelStepX,labelStepY) : '<p class="hint" style="color:var(--accent-orange);">Les maximums doivent être supérieurs aux minimums.</p>';
}
function insertGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  const labelStepX = parseInt(document.getElementById('graphLabelStepX').value)||1;
  const labelStepY = parseInt(document.getElementById('graphLabelStepY').value)||1;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  const yMin=parseFloat(document.getElementById('graphYMin').value), yMax=parseFloat(document.getElementById('graphYMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  if(!(xMax>xMin && yMax>yMin) || !graphCurves.length) return;
  addPendingBlock('graph', graphSvg(xMin,xMax,yMin,yMax,graphCurves,xPi,labelStepX,labelStepY), {xMin,xMax,yMin,yMax,xPi,labelStepX,labelStepY,curves:JSON.parse(JSON.stringify(graphCurves))}, 'reopenGraph');
  closeGraphTool();
}
function reopenGraph(data){
  openGraphTool();
  document.getElementById('graphXPi').checked = !!data.xPi;
  document.getElementById('graphXMin').value = data.xPi ? data.xMin/Math.PI : data.xMin;
  document.getElementById('graphXMax').value = data.xPi ? data.xMax/Math.PI : data.xMax;
  document.getElementById('graphYMin').value = data.yMin;
  document.getElementById('graphYMax').value = data.yMax;
  document.getElementById('graphLabelStepX').value = data.labelStepX||1;
  document.getElementById('graphLabelStepY').value = data.labelStepY||1;
  graphCurves = JSON.parse(JSON.stringify(data.curves||[]));
  graphNextId = Math.max(1, ...graphCurves.map(c=>c.id+1));
  renderGraphCurvesList();
}
/* Ajuste automatiquement les bornes pour bien cadrer les courbes tracées : Y d'après les
   valeurs réellement atteintes (échantillonnage des fonctions, points des droites), X d'après
   les points des droites s'il y en a (les fonctions n'ont pas de « bonne » plage naturelle). */
function autoFitGraph(){
  const xPi = document.getElementById('graphXPi').checked;
  let xMin=parseFloat(document.getElementById('graphXMin').value), xMax=parseFloat(document.getElementById('graphXMax').value);
  if(xPi){ xMin*=Math.PI; xMax*=Math.PI; }
  if(!(xMax>xMin) || !graphCurves.length) return;
  let yValues = [], xValues = [];
  graphCurves.forEach(c=>{
    if(c.type==='droite'){ xValues.push(c.x1,c.x2); yValues.push(c.y1,c.y2); }
    else if(c.type==='fonction'){
      for(let k=0;k<=150;k++){
        const xv = xMin + (xMax-xMin)*k/150;
        const yv = evalFunctionExpr(c.expr, xv);
        if(!isNaN(yv) && isFinite(yv)) yValues.push(yv);
      }
    }
  });
  if(!yValues.length) return;
  let yLo = Math.min(...yValues), yHi = Math.max(...yValues);
  const yPad = (yHi-yLo)*0.15 || 1;
  document.getElementById('graphYMin').value = Math.floor(yLo-yPad);
  document.getElementById('graphYMax').value = Math.ceil(yHi+yPad);
  if(xValues.length){
    let xLo = Math.min(...xValues), xHi = Math.max(...xValues);
    const xPad = (xHi-xLo)*0.15 || 1;
    document.getElementById('graphXMin').value = Math.floor((xLo-xPad)/(xPi?Math.PI:1));
    document.getElementById('graphXMax').value = Math.ceil((xHi+xPad)/(xPi?Math.PI:1));
  }
  previewGraph();
}

/* ---- Outil Diagramme statistique (camembert, barres, bâtons, histogramme) ---- */
let statsData = [];
let statsNextId = 1;
function openStatsTool(){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('statsPanel').style.display='block';
  document.getElementById('statsType').value = 'camembert';
  statsData = [
    {id:statsNextId++, label:'Chat', value:8},
    {id:statsNextId++, label:'Chien', value:12},
    {id:statsNextId++, label:'Aucun', value:6},
  ];
  renderStatsRows();
  document.getElementById('statsPanel').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeStatsTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('statsPanel').style.display='none'; }
function addStatsRow(){
  statsData.push({id:statsNextId++, label:'', value:1});
  renderStatsRows();
}
function removeStatsRow(id){
  statsData = statsData.filter(r=>r.id!==id);
  renderStatsRows();
}
function updateStatsRow(id, field, value){
  const r = statsData.find(r=>r.id===id);
  if(r) r[field] = (field==='value') ? (parseFloat(value)||0) : value;
  previewStats();
}
function renderStatsRows(){
  const isHisto = document.getElementById('statsType').value==='histogramme';
  document.getElementById('statsHistoOptions').style.display = isHisto ? 'block' : 'none';
  if(isHisto && statsData.some(r=>r.classMin==null)){
    // Premier passage en histogramme : propose des classes contiguës par défaut (largeur 10),
    // que le professeur peut ensuite ajuster librement (tailles, poids, âges...).
    let start = 0;
    statsData.forEach(r=>{
      if(r.classMin==null){ r.classMin = start; r.classMax = start+10; r.label = `[${r.classMin};${r.classMax}[`; }
      start = r.classMax;
    });
  }
  const box = document.getElementById('statsRowsList');
  box.innerHTML = statsData.map((r,i)=>{
    const color = GRAPH_COLORS[i%GRAPH_COLORS.length];
    const swatch = `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color};margin-right:6px;"></span>`;
    const labelField = isHisto
      ? `<label class="hint" style="margin:0;">de <input type="number" value="${r.classMin??''}" placeholder="ex. 150" oninput="updateStatsClass(${r.id},'classMin',this.value)" style="width:60px;"> à <input type="number" value="${r.classMax??''}" placeholder="ex. 160" oninput="updateStatsClass(${r.id},'classMax',this.value)" style="width:60px;"> (tailles, poids, âges...)</label>`
      : `<input type="text" value="${escapeHtml(r.label)}" placeholder="catégorie" oninput="updateStatsRow(${r.id},'label',this.value)" style="width:110px;">`;
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      ${swatch}
      ${labelField}
      <label class="hint" style="margin:0;">effectif : <input type="number" value="${r.value}" min="0" oninput="updateStatsRow(${r.id},'value',this.value)" style="width:60px;"></label>
      <button type="button" onclick="removeStatsRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
    </div>`;
  }).join('');
  previewStats();
}
/* Met à jour une borne de classe (histogramme) et régénère automatiquement le libellé affiché
   (ex. "[150;160[") -- évite d'avoir à ressaisir l'intervalle à la main, et garantit une
   écriture cohérente d'une classe à l'autre. */
function updateStatsClass(id, field, value){
  const r = statsData.find(r=>r.id===id);
  if(!r) return;
  r[field] = value===''? null : parseFloat(value);
  r.label = (r.classMin!=null && r.classMax!=null) ? `[${frDecimal(r.classMin)};${frDecimal(r.classMax)}[` : '';
  previewStats();
}
function buildStatsSvg(){
  const type = document.getElementById('statsType').value;
  if(type==='camembert') return pieChartSvg(statsData);
  if(type==='histogramme') return histogramSvg(statsData, document.getElementById('statsHistoDensity').checked);
  return barLikeChartSvg(statsData, type);
}
function previewStats(){
  document.getElementById('statsPreview').innerHTML = statsData.length ? buildStatsSvg() : '';
}
function insertStats(){
  if(!statsData.length) return;
  const type = document.getElementById('statsType').value;
  const histoDensity = document.getElementById('statsHistoDensity').checked;
  addPendingBlock('stats', buildStatsSvg(), {type, histoDensity, rows:JSON.parse(JSON.stringify(statsData))}, 'reopenStats');
  closeStatsTool();
}
function reopenStats(data){
  openStatsTool();
  document.getElementById('statsType').value = data.type||'camembert';
  document.getElementById('statsHistoDensity').checked = !!data.histoDensity;
  statsData = JSON.parse(JSON.stringify(data.rows||[]));
  statsNextId = Math.max(1, ...statsData.map(r=>r.id+1));
  renderStatsRows();
}

/* ---- Outil Sac / urne de boules ---- */
const URN_COLORS = [{name:'Rouge',hex:'#D93025'},{name:'Bleu',hex:'#0D5BA3'},{name:'Vert',hex:'#1F7A4D'},{name:'Jaune',hex:'#E8B93A'},{name:'Noir',hex:'#1C1B2E'},{name:'Orange',hex:'#E35D3A'},{name:'Violet',hex:'#7B3FA0'},{name:'Blanc',hex:'#F5F0E8'}];
let urnData = [];
let urnNextId = 1;
/* Bascule entre les 4 outils de probabilités regroupés sous les mêmes onglets (sac/urne,
   cartes, dés, arbre) : affiche le panneau demandé, masque les 3 autres. */
const PROBA_TABS = [{panel:'urnPanel',tab:'probaTabUrn'},{panel:'cardsPanel',tab:'probaTabCards'},{panel:'dicePanel',tab:'probaTabDice'},{panel:'treePanel',tab:'probaTabTree'}];
function activateProbaTab(panelId){
  hideAllToolContent();
  document.getElementById('toolsModalOverlay').style.display='flex';
  document.getElementById('probaGroupWrap').style.display='block';
  PROBA_TABS.forEach(t=>{
    document.getElementById(t.panel).style.display = (t.panel===panelId) ? 'block' : 'none';
    document.getElementById(t.tab).classList.toggle('active', t.panel===panelId);
  });
}
function openUrnTool(){
  activateProbaTab('urnPanel');
  document.getElementById('urnShape').value = 'sac';
  urnData = [
    {id:urnNextId++, colorIdx:0, count:5},
    {id:urnNextId++, colorIdx:1, count:3},
  ];
  renderUrnRows();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeUrnTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function addUrnRow(){
  urnData.push({id:urnNextId++, colorIdx:urnData.length%URN_COLORS.length, count:1});
  renderUrnRows();
}
function removeUrnRow(id){
  urnData = urnData.filter(r=>r.id!==id);
  renderUrnRows();
}
function updateUrnRow(id, field, value){
  const r = urnData.find(r=>r.id===id);
  if(r) r[field] = field==='count' ? (parseInt(value)||0) : parseInt(value);
  previewUrn();
}
function renderUrnRows(){
  const box = document.getElementById('urnRowsList');
  box.innerHTML = urnData.map(r=>{
    const options = URN_COLORS.map((c,i)=>`<option value="${i}" ${i===r.colorIdx?'selected':''}>${c.name}</option>`).join('');
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      <select onchange="updateUrnRow(${r.id},'colorIdx',this.value)">${options}</select>
      <label class="hint" style="margin:0;">nombre : <input type="number" value="${r.count}" min="0" oninput="updateUrnRow(${r.id},'count',this.value)" style="width:55px;"></label>
      <button type="button" onclick="removeUrnRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
    </div>`;
  }).join('');
  previewUrn();
}
function urnDataForSvg(){
  return urnData.map(r=>({color:URN_COLORS[r.colorIdx].hex, label:URN_COLORS[r.colorIdx].name, count:r.count}));
}
function previewUrn(){
  document.getElementById('urnPreview').innerHTML = urnDataForSvg().some(d=>d.count>0) ? urnSvg(urnDataForSvg(), document.getElementById('urnShape').value) : '<p class="hint">Ajoute au moins une boule.</p>';
}
function insertUrn(){
  if(!urnDataForSvg().some(d=>d.count>0)) return;
  const shape = document.getElementById('urnShape').value;
  addPendingBlock('urn', urnSvg(urnDataForSvg(), shape), {shape, rows:JSON.parse(JSON.stringify(urnData))}, 'reopenUrn');
  closeUrnTool();
}
function reopenUrn(data){
  openUrnTool();
  document.getElementById('urnShape').value = data.shape||'sac';
  urnData = JSON.parse(JSON.stringify(data.rows||[]));
  urnNextId = Math.max(1, ...urnData.map(r=>r.id+1));
  renderUrnRows();
}

/* ---- Outil Cartes à jouer ---- */
const RANKS_32 = ['7','8','9','10','V','D','R','A'];
const RANKS_52 = ['2','3','4','5','6','7','8','9','10','V','D','R','A'];
const SUITS_ORDER = ['pique','coeur','carreau','trefle'];
let cardsSelected = new Set();
function openCardsTool(){
  activateProbaTab('cardsPanel');
  document.getElementById('cardsDeckType').value = '52';
  cardsSelected = new Set();
  renderCardsGrid();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeCardsTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function cardKey(rank,suit){ return rank+'-'+suit; }
function toggleCard(rank,suit){
  const k = cardKey(rank,suit);
  if(cardsSelected.has(k)) cardsSelected.delete(k); else cardsSelected.add(k);
  renderCardsGrid();
}
function setCardsPreset(preset){
  const ranks = document.getElementById('cardsDeckType').value==='32' ? RANKS_32 : RANKS_52;
  cardsSelected = new Set();
  if(preset==='all'){ ranks.forEach(r=>SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey(r,s)))); }
  else if(preset==='aces'){ SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey('A',s))); }
  else if(preset==='figures'){ ['V','D','R'].forEach(r=>SUITS_ORDER.forEach(s=>cardsSelected.add(cardKey(r,s)))); }
  renderCardsGrid();
}
function renderCardsGrid(){
  const ranks = document.getElementById('cardsDeckType').value==='32' ? RANKS_32 : RANKS_52;
  let html = '<table style="border-collapse:collapse;"><tr><td></td>' + ranks.map(r=>`<td style="text-align:center;font-size:.8rem;padding:2px 4px;">${r}</td>`).join('') + '</tr>';
  SUITS_ORDER.forEach(s=>{
    html += `<tr><td style="padding:2px 6px;font-size:1.1rem;color:${SUIT_COLORS[s]};">${SUIT_SYMBOLS[s]}</td>`;
    ranks.forEach(r=>{
      const on = cardsSelected.has(cardKey(r,s));
      html += `<td style="padding:1px;"><button type="button" onclick="toggleCard('${r}','${s}')" style="width:26px;height:26px;border-radius:5px;border:1px solid rgba(28,43,57,.25);background:${on?'#0D5BA3':'#fff'};color:${on?'#fff':'#333'};cursor:pointer;font-size:.75rem;">${on?'✓':''}</button></td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  document.getElementById('cardsGrid').innerHTML = html;
  previewCards();
}
function selectedCardsArr(){
  return [...cardsSelected].map(k=>{ const [rank,suit]=k.split('-'); return {rank,suit}; });
}
function previewCards(){
  document.getElementById('cardsPreview').innerHTML = cardsSelected.size ? cardsSvg(selectedCardsArr()) : '';
}
function insertCards(){
  if(!cardsSelected.size) return;
  addPendingBlock('cards', cardsSvg(selectedCardsArr()), {selected:[...cardsSelected], deck:document.getElementById('cardsDeckType').value}, 'reopenCards');
  closeCardsTool();
}
function reopenCards(data){
  openCardsTool();
  document.getElementById('cardsDeckType').value = data.deck||'52';
  cardsSelected = new Set(data.selected||[]);
  renderCardsGrid();
}

/* ---- Outil Dés ---- */
const DICE_FACES_OPTIONS = [4,6,8,10,12,20];
const DICE_COLORS = [{name:'Blanc',hex:'#fff'},{name:'Rouge',hex:'#D93025'},{name:'Bleu',hex:'#0D5BA3'},{name:'Vert',hex:'#1F7A4D'},{name:'Violet',hex:'#7B3FA0'},{name:'Noir',hex:'#1C1B2E'}];
let diceData = [];
let diceNextId = 1;
function openDiceTool(){
  activateProbaTab('dicePanel');
  diceData = [
    {id:diceNextId++, faces:6, value:4, colorIdx:0},
    {id:diceNextId++, faces:6, value:2, colorIdx:0},
  ];
  renderDiceRows();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeDiceTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function addDiceRow(){
  diceData.push({id:diceNextId++, faces:6, value:1, colorIdx:0});
  renderDiceRows();
}
function removeDiceRow(id){
  diceData = diceData.filter(r=>r.id!==id);
  renderDiceRows();
}
function updateDiceRow(id, field, value){
  const r = diceData.find(r=>r.id===id);
  if(!r) return;
  if(field==='faces'){ r.faces = parseInt(value); if(r.value>r.faces) r.value=r.faces; }
  else if(field==='value') r.value = Math.max(1, Math.min(r.faces, parseInt(value)||1));
  else if(field==='colorIdx') r.colorIdx = parseInt(value);
  renderDiceRows();
}
function renderDiceRows(){
  const box = document.getElementById('diceRowsList');
  box.innerHTML = diceData.map(r=>{
    const facesOptions = DICE_FACES_OPTIONS.map(f=>`<option value="${f}" ${f===r.faces?'selected':''}>d${f}</option>`).join('');
    const colorOptions = DICE_COLORS.map((c,i)=>`<option value="${i}" ${i===r.colorIdx?'selected':''}>${c.name}</option>`).join('');
    return `<div class="tool-row" style="margin-bottom:6px;align-items:center;">
      <select onchange="updateDiceRow(${r.id},'faces',this.value)">${facesOptions}</select>
      <label class="hint" style="margin:0;">valeur : <input type="number" value="${r.value}" min="1" max="${r.faces}" oninput="updateDiceRow(${r.id},'value',this.value)" style="width:50px;"></label>
      <select onchange="updateDiceRow(${r.id},'colorIdx',this.value)">${colorOptions}</select>
      <button type="button" onclick="removeDiceRow(${r.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
    </div>`;
  }).join('');
  previewDice();
}
function diceDataForSvg(){
  return diceData.map(r=>({faces:r.faces, value:r.value, color:DICE_COLORS[r.colorIdx].hex}));
}
function previewDice(){
  document.getElementById('dicePreview').innerHTML = diceSvg(diceDataForSvg());
}
function insertDice(){
  if(!diceData.length) return;
  addPendingBlock('dice', diceSvg(diceDataForSvg()), {rows:JSON.parse(JSON.stringify(diceData))}, 'reopenDice');
  closeDiceTool();
}
function reopenDice(data){
  openDiceTool();
  diceData = JSON.parse(JSON.stringify(data.rows||[]));
  diceNextId = Math.max(1, ...diceData.map(r=>r.id+1));
  renderDiceRows();
}

/* ---- Outil Arbre de probabilité ---- */
let treeRoot = null;
function openTreeTool(){
  activateProbaTab('treePanel');
  treeRoot = {label:'', children:[]};
  renderTreeEditor();
  document.getElementById('probaGroupWrap').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function closeTreeTool(){ document.getElementById('toolsModalOverlay').style.display='none'; document.getElementById('probaGroupWrap').style.display='none'; }
function treeGetNode(path){
  let n = treeRoot;
  for(const i of path) n = n.children[i];
  return n;
}
function treeAddBranch(pathStr){
  const path = pathStr==='' ? [] : pathStr.split('|').map(Number);
  const n = treeGetNode(path);
  if(!n.children) n.children = [];
  n.children.push({label:'', proba:'', children:[]});
  renderTreeEditor();
}
function treeRemoveBranch(parentPathStr, idx){
  const parentPath = parentPathStr==='' ? [] : parentPathStr.split('|').map(Number);
  const parent = treeGetNode(parentPath);
  parent.children.splice(idx,1);
  renderTreeEditor();
}
function treeUpdateNode(pathStr, field, value){
  const path = pathStr.split('|').map(Number);
  treeGetNode(path)[field] = value;
  previewTree();
}
/* Éditeur texte du parcours de l'arbre (une ligne par nœud, indentée selon la profondeur) --
   plus simple à manipuler qu'un rendu graphique interactif complexe, tout en autorisant une
   construction branche par branche, à n'importe quelle profondeur. */
function renderTreeEditor(){
  let html = '';
  function walk(node, path, depth){
    const pathStr = path.join('|');
    const indent = depth*22;
    const isLeaf = !(node.children && node.children.length);
    if(depth>0){
      const noteField = isLeaf ? `<input type="text" value="${escapeHtml(node.note||'')}" placeholder="note (résultat, calcul...)" oninput="treeUpdateNode('${pathStr}','note',this.value)" style="width:130px;">` : '';
      html += `<div class="tool-row" style="margin:4px 0;margin-left:${indent}px;align-items:center;">
        <span class="hint" style="margin:0;">↳</span>
        <input type="text" value="${escapeHtml(node.label)}" placeholder="événement" oninput="treeUpdateNode('${pathStr}','label',this.value)" style="width:100px;">
        <input type="text" value="${escapeHtml(node.proba)}" placeholder="proba (ex. 2/5)" oninput="treeUpdateNode('${pathStr}','proba',this.value)" style="width:90px;">
        ${noteField}
        <button type="button" onclick="treeAddBranch('${pathStr}')" style="border:none;background:rgba(28,43,57,.08);border-radius:6px;padding:3px 8px;cursor:pointer;">+ branche</button>
        <button type="button" onclick="treeRemoveBranch('${path.slice(0,-1).join('|')}',${path[path.length-1]})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕</button>
      </div>`;
    } else {
      html += `<div class="tool-row" style="margin:4px 0;align-items:center;">
        <span class="hint" style="margin:0;">Départ :</span>
        <button type="button" onclick="treeAddBranch('')" style="border:none;background:rgba(28,43,57,.08);border-radius:6px;padding:3px 8px;cursor:pointer;">+ branche</button>
      </div>`;
    }
    (node.children||[]).forEach((c,i)=>walk(c, [...path,i], depth+1));
  }
  walk(treeRoot, [], 0);
  html += `<p class="hint" style="margin:8px 0 0;">Astuce : événement, probabilité et note acceptent du LaTeX entre <code>$...$</code> -- ex. <code>$\\overline{A}$</code> pour A barre, <code>$P(B \\mid A)$</code> pour une probabilité conditionnelle, <code>$P(A \\cap B)$</code> pour une intersection.</p>`;
  document.getElementById('treeCanvas').innerHTML = html;
  previewTree();
}
function previewTree(){
  document.getElementById('treePreview').innerHTML = (treeRoot.children&&treeRoot.children.length) ? treeSvg(treeRoot) : '<p class="hint">Ajoute au moins une branche.</p>';
}
function insertTree(){
  if(!treeRoot.children || !treeRoot.children.length) return;
  addPendingBlock('tree', treeSvg(treeRoot), {root:JSON.parse(JSON.stringify(treeRoot))}, 'reopenTree');
  closeTreeTool();
}
function reopenTree(data){
  openTreeTool();
  treeRoot = JSON.parse(JSON.stringify(data.root||{label:'',children:[]}));
  renderTreeEditor();
}

function resetFigureState(){
  figState = {points:[], shapes:[], mode:(figState&&figState.mode)||'point', selected:[], refShape:null, nextLabel:0, lengthGroups:{}};
  renderFigureSvg();
}
function clearFigure(){ resetFigureState(); }
function clearAllCodes(){
  figState.shapes = figState.shapes.filter(s=>!['code-longueur','code-angle','code-droit'].includes(s.type));
  figState.shapes.forEach(s=>{ if(s.codeGroup) delete s.codeGroup; });
  figState.lengthGroups = {};
  renderFigureSvg();
}
function lengthGroupFor(cm){
  if(!figState.lengthGroups) figState.lengthGroups = {};
  const key = (+cm).toFixed(2);
  if(!figState.lengthGroups[key]) figState.lengthGroups[key] = Object.keys(figState.lengthGroups).length+1;
  return figState.lengthGroups[key];
}
function undoFigure(){
  if(figState.shapes.length) figState.shapes.pop();
  else if(figState.points.length) figState.points.pop();
  renderFigureSvg();
}
function setFigureMode(mode){
  figState.mode = mode; figState.selected = []; figState.refShape = null;
  document.querySelectorAll('.fig-mode').forEach(b=>b.classList.toggle('active', b.dataset.mode===mode));
  const hints = {
    point:'Cliquez pour placer un point.',
    deplacer:'Faites glisser un point existant pour le déplacer (les points construits, comme un milieu, suivent automatiquement).',
    segment:'Cliquez deux points existants pour tracer le segment qui les relie.',
    'segment-longueur':'Cliquez le point de départ, puis un point donnant la direction : la longueur exacte (en cm) vous sera demandée.',
    droite:'Cliquez deux points existants pour tracer la droite qui les relie.',
    cercle:'Cliquez le centre, puis un point du cercle.',
    'cercle-rayon':'Cliquez le centre : le rayon exact (en cm) vous sera demandé.',
    arc:'Cliquez le centre, puis le point de départ de l\'arc, puis un point donnant la direction d\'arrivée.',
    milieu:'Cliquez deux points existants pour placer leur milieu.',
    angle:'Cliquez un point sur le premier côté, puis le sommet de l\'angle, puis un point sur le second côté.',
    perpendiculaire:'Cliquez directement sur une droite/un segment existant (ou deux points), puis le point par lequel doit passer la perpendiculaire.',
    parallele:'Cliquez directement sur une droite/un segment existant (ou deux points), puis le point par lequel doit passer la parallèle.',
    mediatrice:'Cliquez directement sur un segment existant (ou ses deux extrémités) pour tracer sa médiatrice.',
    bissectrice:'Cliquez un point sur le premier côté, puis le sommet de l\'angle, puis un point sur le second côté.',
    code:'Choisissez le type de codage ci-dessus, puis cliquez sur le segment ou l\'angle concerné.',
  };
  document.getElementById('figureHint').textContent = hints[mode] || '';
  renderFigureSvg();
}
function nextPointLabel(){
  const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let lab;
  do{ lab = letters[figState.nextLabel++ % letters.length]; } while(figState.points.some(p=>p.label===lab));
  return lab;
}
function svgCoordsFromEvent(svg, evt){
  const pt = svg.createSVGPoint();
  const t = evt.touches ? evt.touches[0] : evt;
  pt.x = t.clientX; pt.y = t.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}
function findNearbyPoint(x,y){
  const thresh = 16;
  return figState.points.find(p=>Math.hypot(p.x-x,p.y-y)<thresh);
}
function distToSegment(px,py,ax,ay,bx,by){
  const dx=bx-ax, dy=by-ay;
  const len2 = dx*dx+dy*dy || 1;
  let t = ((px-ax)*dx+(py-ay)*dy)/len2;
  t = Math.max(0, Math.min(1,t));
  return Math.hypot(px-(ax+t*dx), py-(ay+t*dy));
}
function distToLine(px,py,ax,ay,bx,by){
  const dx=bx-ax, dy=by-ay;
  const len=Math.hypot(dx,dy)||1;
  return Math.abs((px-ax)*dy-(py-ay)*dx)/len;
}
function findNearbyShape(x,y){
  const thresh = 10;
  return figState.shapes.find(s=>{
    if(s.type==='segment') return distToSegment(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    if(s.type==='droite') return distToLine(x,y,s.p1.x,s.p1.y,s.p2.x,s.p2.y) < thresh;
    return false;
  });
}
function handleLineToolClick(x,y){
  if(!figState.refShape){
    const shape = findNearbyShape(x,y);
    if(shape){ figState.refShape = {p1:shape.p1, p2:shape.p2}; renderFigureSvg(); return; }
    const pt = findNearbyPoint(x,y);
    if(pt){
      if(!figState.selected.length){ figState.selected.push(pt); renderFigureSvg(); return; }
      if(figState.selected[0]!==pt){
        figState.refShape = {p1:figState.selected[0], p2:pt};
        figState.selected = [];
        renderFigureSvg();
      }
    }
    return;
  }
  if(figState.mode==='mediatrice'){
    figState.shapes.push({type:'mediatrice', p1:figState.refShape.p1, p2:figState.refShape.p2});
    figState.refShape = null;
    renderFigureSvg();
    return;
  }
  const through = findNearbyPoint(x,y);
  if(!through) return;
  figState.shapes.push({type:figState.mode, refA:figState.refShape.p1, refB:figState.refShape.p2, through});
  figState.refShape = null;
  renderFigureSvg();
}
function currentCodeType(){ const el=document.getElementById('codeType'); return el?el.value:'longueur'; }
function currentCodeGroup(){ const el=document.getElementById('codeGroup'); return el?+el.value:1; }
function handleCodeClick(x,y){
  const type = currentCodeType();
  if(type==='longueur'){
    if(!figState.selected.length){
      const shape = findNearbyShape(x,y);
      if(shape){ figState.shapes.push({type:'code-longueur', p1:shape.p1, p2:shape.p2, group:currentCodeGroup()}); renderFigureSvg(); return; }
      const pt = findNearbyPoint(x,y);
      if(pt){ figState.selected.push(pt); renderFigureSvg(); }
      return;
    }
    const pt = findNearbyPoint(x,y);
    if(pt && pt!==figState.selected[0]){
      figState.shapes.push({type:'code-longueur', p1:figState.selected[0], p2:pt, group:currentCodeGroup()});
      figState.selected=[];
      renderFigureSvg();
    }
    return;
  }
  // angle-egal / angle-droit : 3 clics, sommet = 2e clic
  const pt = findNearbyPoint(x,y);
  if(!pt || figState.selected.includes(pt)) return;
  figState.selected.push(pt);
  if(figState.selected.length===3){
    const [p1,vertex,p2] = figState.selected;
    if(type==='angle-egal') figState.shapes.push({type:'code-angle', vertex, p1, p2, group:currentCodeGroup()});
    else figState.shapes.push({type:'code-droit', vertex, p1, p2});
    figState.selected=[];
  }
  renderFigureSvg();
}
function handleLengthSegmentClick(x,y){
  if(!figState.selected.length){
    let pt = findNearbyPoint(x,y);
    if(!pt){ pt = {label:nextPointLabel(), x, y}; figState.points.push(pt); }
    figState.selected.push(pt);
    renderFigureSvg();
    return;
  }
  const start = figState.selected[0];
  const dx=x-start.x, dy=y-start.y; const len=Math.hypot(dx,dy)||1;
  figState.selected = [];
  const raw = document.getElementById('segLengthInput').value;
  const cm = parseFloat(String(raw).replace(',','.'));
  if(!isFinite(cm) || cm<=0){ document.getElementById('figureHint').textContent = 'Longueur invalide — vérifiez le champ "cm" à côté du bouton Segment.'; renderFigureSvg(); return; }
  const px = cm*SCALE_PX_PER_CM;
  const end = {label:nextPointLabel(), x:start.x+dx/len*px, y:start.y+dy/len*px};
  figState.points.push(end);
  figState.shapes.push({type:'segment', p1:start, p2:end, lengthLabel:cm+' cm', codeGroup:lengthGroupFor(cm)});
  renderFigureSvg();
}
function handleRadiusCircleClick(x,y){
  let center = findNearbyPoint(x,y);
  if(!center){ center = {label:nextPointLabel(), x, y}; figState.points.push(center); }
  const raw = document.getElementById('circleRadiusInput').value;
  const cm = parseFloat(String(raw).replace(',','.'));
  if(!isFinite(cm) || cm<=0){ document.getElementById('figureHint').textContent = 'Rayon invalide — vérifiez le champ "cm" à côté du bouton Cercle.'; return; }
  const px = cm*SCALE_PX_PER_CM;
  const withCompass = document.getElementById('compassToggle') && document.getElementById('compassToggle').checked;
  // radius stocké comme nombre fixe (pas un point) : le cercle garde sa taille exacte
  // même si on déplace ensuite le centre.
  figState.shapes.push({type:'cercle', p1:center, radius:px, angle:0, compass:withCompass, radiusLabel:cm+' cm', codeGroup:lengthGroupFor(cm)});
  renderFigureSvg();
}
function recomputeDependents(){
  // les points construits (ex. un milieu) se recalculent à partir des points dont ils dépendent,
  // donc si on déplace un point d'origine, tout ce qui en découle suit automatiquement.
  figState.points.forEach(p=>{
    if(p.def && p.def.type==='milieu'){
      p.x = (p.def.a.x + p.def.b.x)/2;
      p.y = (p.def.a.y + p.def.b.y)/2;
    }
  });
}
function onFigureMouseDown(evt){
  if(figState.mode!=='deplacer') return;
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  const p = findNearbyPoint(x,y);
  if(p && !p.def){ figDragPoint = p; evt.preventDefault(); }
}
function onFigureMouseMove(evt){
  if(!figDragPoint) return;
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  figDragPoint.x = Math.max(10,Math.min(490,x));
  figDragPoint.y = Math.max(10,Math.min(310,y));
  recomputeDependents();
  renderFigureSvg();
}
function onFigureMouseUp(){ figDragPoint = null; }
function onFigureClick(evt){
  if(figState.mode==='deplacer') return; // géré par mousedown/mousemove
  const svg=document.getElementById('figureSvg');
  const {x,y} = svgCoordsFromEvent(svg,evt);
  if(figState.mode==='point'){
    if(findNearbyPoint(x,y)) return;
    figState.points.push({label:nextPointLabel(), x, y});
    renderFigureSvg();
    return;
  }
  if(figState.mode==='segment-longueur'){ handleLengthSegmentClick(x,y); return; }
  if(figState.mode==='cercle-rayon'){ handleRadiusCircleClick(x,y); return; }
  if(figState.mode==='perpendiculaire' || figState.mode==='parallele' || figState.mode==='mediatrice'){ handleLineToolClick(x,y); return; }
  if(figState.mode==='code'){ handleCodeClick(x,y); return; }

  const near = findNearbyPoint(x,y);
  if(!near || figState.selected.includes(near)) return;
  figState.selected.push(near);
  const neededMap = {angle:3, bissectrice:3, arc:3};
  const needed = neededMap[figState.mode] || 2;
  if(figState.selected.length===needed){
    const withCompass = document.getElementById('compassToggle') && document.getElementById('compassToggle').checked;
    if(figState.mode==='milieu'){
      const [a,b] = figState.selected;
      figState.points.push({label:nextPointLabel(), x:(a.x+b.x)/2, y:(a.y+b.y)/2, def:{type:'milieu', a, b}});
    } else if(figState.mode==='angle' || figState.mode==='bissectrice'){
      const [p1,vertex,p2] = figState.selected; // le sommet est le 2e point cliqué
      figState.shapes.push({type:figState.mode, vertex, p1, p2});
    } else if(figState.mode==='arc'){
      const [center,p1,p2] = figState.selected;
      figState.shapes.push({type:'arc', center, p1, p2, compass:withCompass});
    } else if(figState.mode==='cercle'){
      const [a,b] = figState.selected;
      figState.shapes.push({type:'cercle', p1:a, p2:b, compass:withCompass});
    } else {
      const [a,b] = figState.selected;
      figState.shapes.push({type:figState.mode, p1:a, p2:b});
    }
    figState.selected = [];
  }
  renderFigureSvg();
}
function angleDegrees(vertex,p1,p2){
  const a1 = Math.atan2(p1.y-vertex.y, p1.x-vertex.x);
  const a2 = Math.atan2(p2.y-vertex.y, p2.x-vertex.x);
  let diff = Math.abs(a1-a2)*180/Math.PI;
  if(diff>180) diff = 360-diff;
  return Math.round(diff);
}
function angleArcPoints(vertex,p1,p2,r){
  const a1 = Math.atan2(p1.y-vertex.y, p1.x-vertex.x);
  let a2 = Math.atan2(p2.y-vertex.y, p2.x-vertex.x);
  let delta = a2-a1;
  while(delta> Math.PI) delta-=2*Math.PI;
  while(delta<-Math.PI) delta+=2*Math.PI;
  const steps=18, pts=[];
  for(let i=0;i<=steps;i++){
    const a=a1+delta*(i/steps);
    pts.push(`${vertex.x+r*Math.cos(a)},${vertex.y+r*Math.sin(a)}`);
  }
  return {points:pts.join(' '), mid:a1+delta/2};
}
function compassGraphic(center, pencil){
  const r = Math.hypot(pencil.x-center.x, pencil.y-center.y) || 1;
  const legLen = 0.7*r+30;
  const mid = {x:(center.x+pencil.x)/2, y:(center.y+pencil.y)/2};
  const ux=(pencil.x-center.x)/r, uy=(pencil.y-center.y)/r;
  let perp = {x:-uy, y:ux};
  if(perp.y>0) perp={x:uy,y:-ux};
  const h = Math.sqrt(Math.max(0, legLen*legLen-(r/2)*(r/2)));
  const H = {x:mid.x+perp.x*h, y:mid.y+perp.y*h};
  return `<line x1="${center.x}" y1="${center.y}" x2="${H.x}" y2="${H.y}" stroke="#5B6B78" stroke-width="2" stroke-linecap="round"/>
          <line x1="${pencil.x}" y1="${pencil.y}" x2="${H.x}" y2="${H.y}" stroke="#5B6B78" stroke-width="2" stroke-linecap="round"/>
          <circle cx="${H.x}" cy="${H.y}" r="5" fill="#5B6B78"/>
          <circle cx="${pencil.x}" cy="${pencil.y}" r="4" fill="#E35D3A"/>`;
}
const CODE_GROUP_COLORS = {1:'#E35D3A', 2:'#1F3A5C', 3:'#1F6B3A'};
function renderLengthCode(p1,p2,group,color){
  color = color || CODE_GROUP_COLORS[group] || '#E35D3A';
  const dx=p2.x-p1.x, dy=p2.y-p1.y; const len=Math.hypot(dx,dy)||1;
  const ux=dx/len, uy=dy/len;
  const segAngle = Math.atan2(dy,dx);
  const tilt = segAngle + 65*Math.PI/180;
  const tx=Math.cos(tilt), ty=Math.sin(tilt);
  const mid={x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2};
  const spacing=8, offsetStart=-((group-1)*spacing)/2;
  let html='';
  for(let i=0;i<group;i++){
    const off=offsetStart+i*spacing;
    const cx=mid.x+ux*off, cy=mid.y+uy*off;
    html+=`<line x1="${cx-tx*8}" y1="${cy-ty*8}" x2="${cx+tx*8}" y2="${cy+ty*8}" stroke="${color}" stroke-width="1.5"/>`;
  }
  return html;
}
function renderAngleCode(vertex,p1,p2,group,color){
  color = color || CODE_GROUP_COLORS[group] || '#E35D3A';
  let html='';
  for(let i=0;i<group;i++){
    const {points} = angleArcPoints(vertex,p1,p2,20+i*7);
    html+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="2"/>`;
  }
  return html;
}
function renderRightAngleCode(vertex,p1,p2){
  const a1=Math.atan2(p1.y-vertex.y,p1.x-vertex.x), a2=Math.atan2(p2.y-vertex.y,p2.x-vertex.x);
  const size=15;
  const c1={x:vertex.x+size*Math.cos(a1), y:vertex.y+size*Math.sin(a1)};
  const c2={x:vertex.x+size*Math.cos(a2), y:vertex.y+size*Math.sin(a2)};
  const c3={x:c1.x+c2.x-vertex.x, y:c1.y+c2.y-vertex.y};
  return `<polyline points="${c1.x},${c1.y} ${c3.x},${c3.y} ${c2.x},${c2.y}" fill="none" stroke="#E35D3A" stroke-width="2"/>`;
}
/* Codage d'un côté par SYMBOLE (pas seulement par couleur) : 1 trait, 2 traits, petit cercle,
   ou # -- quatre conventions différentes qu'on peut cycler pour ne jamais confondre deux côtés,
   même pour un daltonien qui ne distinguerait pas les couleurs. */
function renderSideCode(p1,p2,styleIdx,color){
  const style = ((styleIdx%4)+4)%4;
  const mid={x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2};
  if(style===0) return renderLengthCode(p1,p2,1,color);
  if(style===1) return renderLengthCode(p1,p2,2,color);
  if(style===2) return `<circle cx="${mid.x}" cy="${mid.y}" r="5.5" fill="none" stroke="${color}" stroke-width="1.6"/>`;
  return `<text x="${mid.x}" y="${mid.y+5}" font-family="JetBrains Mono" font-size="16" font-weight="700" fill="${color}" text-anchor="middle">#</text>`;
}
/* Les angles utilisent un vocabulaire de symboles totalement différent de celui des côtés
   (carré / losange au lieu de cercle / #) : un même symbole ne peut donc jamais désigner
   à la fois une longueur et un angle, même par coïncidence de cycle. */
/* Les angles restent toujours codés par des arcs (jamais par des cercles/carrés, qui sont réservés
   aux côtés) : le nombre d'arcs, leur couleur, et pour aller plus loin un petit trait qui vient
   intercepter le ou les arcs -- convention géométrique standard. */
function renderVertexCode(vertex,p1,p2,styleIdx,color){
  const style = ((styleIdx%4)+4)%4;
  const arcCount = (style===0||style===2) ? 1 : 2;
  let html = renderAngleCode(vertex,p1,p2,arcCount,color);
  if(style===2 || style===3){
    const a1=Math.atan2(p1.y-vertex.y,p1.x-vertex.x);
    let a2=Math.atan2(p2.y-vertex.y,p2.x-vertex.x);
    let delta=a2-a1; while(delta>Math.PI) delta-=2*Math.PI; while(delta<-Math.PI) delta+=2*Math.PI;
    const bis=a1+delta/2;
    const rInner=20, rOuter=arcCount===1?20:27;
    const x1=vertex.x+(rInner-7)*Math.cos(bis), y1=vertex.y+(rInner-7)*Math.sin(bis);
    const x2=vertex.x+(rOuter+7)*Math.cos(bis), y2=vertex.y+(rOuter+7)*Math.sin(bis);
    html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1.6"/>`;
  }
  return html;
}
function renderFigureSvg(){
  const svg=document.getElementById('figureSvg');
  let html='';
  if(figState.refShape){
    html+=`<line x1="${figState.refShape.p1.x}" y1="${figState.refShape.p1.y}" x2="${figState.refShape.p2.x}" y2="${figState.refShape.p2.y}" stroke="#E35D3A" stroke-width="4" stroke-opacity=".35"/>`;
  }
  figState.shapes.forEach(s=>{
    if(s.type==='segment'){
      html+=`<line x1="${s.p1.x}" y1="${s.p1.y}" x2="${s.p2.x}" y2="${s.p2.y}" stroke="#1C1B2E" stroke-width="2"/>`;
      if(s.lengthLabel){
        const mx=(s.p1.x+s.p2.x)/2, my=(s.p1.y+s.p2.y)/2;
        html+=`<text x="${mx}" y="${my-9}" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${s.lengthLabel}</text>`;
      }
      if(s.codeGroup) html += renderLengthCode(s.p1, s.p2, s.codeGroup);
    } else if(s.type==='droite'){
      const dx=s.p2.x-s.p1.x, dy=s.p2.y-s.p1.y; const len=Math.hypot(dx,dy)||1; const ext=400;
      html+=`<line x1="${s.p1.x-dx/len*ext}" y1="${s.p1.y-dy/len*ext}" x2="${s.p2.x+dx/len*ext}" y2="${s.p2.y+dy/len*ext}" stroke="#1C1B2E" stroke-width="1.6"/>`;
    } else if(s.type==='cercle'){
      const hasFixedRadius = s.radius!=null;
      const r = hasFixedRadius ? s.radius : Math.hypot(s.p2.x-s.p1.x, s.p2.y-s.p1.y);
      const refPoint = hasFixedRadius ? {x:s.p1.x+r*Math.cos(s.angle||0), y:s.p1.y+r*Math.sin(s.angle||0)} : s.p2;
      html+=`<circle cx="${s.p1.x}" cy="${s.p1.y}" r="${r}" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>`;
      if(s.compass) html += compassGraphic(s.p1, refPoint);
      if(s.radiusLabel) html+=`<text x="${s.p1.x+(refPoint.x-s.p1.x)/2}" y="${s.p1.y+(refPoint.y-s.p1.y)/2-8}" font-family="JetBrains Mono" font-size="11" fill="#5C5A78" text-anchor="middle">${s.radiusLabel}</text>`;
      if(s.codeGroup) html += renderLengthCode(s.p1, refPoint, s.codeGroup);
    } else if(s.type==='arc'){
      const r=Math.hypot(s.p1.x-s.center.x, s.p1.y-s.center.y);
      const {points} = angleArcPoints(s.center, s.p1, s.p2, r);
      html+=`<polyline points="${points}" fill="none" stroke="#1F3A5C" stroke-width="1.8"/>`;
      if(s.compass) html += compassGraphic(s.center, s.p1);
    } else if(s.type==='angle' || s.type==='bissectrice'){
      const r=26;
      const {points,mid}=angleArcPoints(s.vertex,s.p1,s.p2,r);
      const color = s.type==='angle' ? '#E35D3A' : '#8A2F52';
      html+=`<polyline points="${points}" fill="none" stroke="${color}" stroke-width="1.8"/>`;
      if(s.type==='angle'){
        const lx=s.vertex.x+(r+14)*Math.cos(mid), ly=s.vertex.y+(r+14)*Math.sin(mid);
        html+=`<text x="${lx}" y="${ly}" font-family="JetBrains Mono" font-size="12" fill="${color}" text-anchor="middle">${angleDegrees(s.vertex,s.p1,s.p2)}°</text>`;
      } else {
        const a1=Math.atan2(s.p1.y-s.vertex.y, s.p1.x-s.vertex.x);
        let a2=Math.atan2(s.p2.y-s.vertex.y, s.p2.x-s.vertex.x);
        let delta=a2-a1; while(delta>Math.PI) delta-=2*Math.PI; while(delta<-Math.PI) delta+=2*Math.PI;
        const bisA=a1+delta/2, len=260;
        html+=`<line x1="${s.vertex.x}" y1="${s.vertex.y}" x2="${s.vertex.x+len*Math.cos(bisA)}" y2="${s.vertex.y+len*Math.sin(bisA)}" stroke="${color}" stroke-width="1.6" stroke-dasharray="2 3"/>`;
      }
    } else if(s.type==='perpendiculaire' || s.type==='parallele'){
      let dx=s.refB.x-s.refA.x, dy=s.refB.y-s.refA.y;
      if(s.type==='perpendiculaire'){ const t=dx; dx=-dy; dy=t; }
      const len=Math.hypot(dx,dy)||1; const ext=400;
      const color = s.type==='perpendiculaire' ? '#2C5A2E' : '#1F3A5C';
      html+=`<line x1="${s.through.x-dx/len*ext}" y1="${s.through.y-dy/len*ext}" x2="${s.through.x+dx/len*ext}" y2="${s.through.y+dy/len*ext}" stroke="${color}" stroke-width="1.6"/>`;
    } else if(s.type==='mediatrice'){
      const mid={x:(s.p1.x+s.p2.x)/2, y:(s.p1.y+s.p2.y)/2};
      const dx=-(s.p2.y-s.p1.y), dy=(s.p2.x-s.p1.x);
      const len=Math.hypot(dx,dy)||1; const ext=400;
      html+=`<line x1="${mid.x-dx/len*ext}" y1="${mid.y-dy/len*ext}" x2="${mid.x+dx/len*ext}" y2="${mid.y+dy/len*ext}" stroke="#2C5A2E" stroke-width="1.6" stroke-dasharray="6 4"/>`;
    } else if(s.type==='code-longueur'){
      html += renderLengthCode(s.p1,s.p2,s.group||1);
    } else if(s.type==='code-angle'){
      html += renderAngleCode(s.vertex,s.p1,s.p2,s.group||1);
    } else if(s.type==='code-droit'){
      html += renderRightAngleCode(s.vertex,s.p1,s.p2);
    }
  });
  figState.points.forEach(p=>{
    const sel = figState.selected.includes(p);
    const c = sel?'#E35D3A':(p.def?'#7A8A98':'#1C1B2E');
    html+=`<line x1="${p.x-6}" y1="${p.y-6}" x2="${p.x+6}" y2="${p.y+6}" stroke="${c}" stroke-width="2"/>`;
    html+=`<line x1="${p.x-6}" y1="${p.y+6}" x2="${p.x+6}" y2="${p.y-6}" stroke="${c}" stroke-width="2"/>`;
    html+=`<text x="${p.x+9}" y="${p.y-9}" font-family="Space Grotesk" font-size="14" font-weight="700" fill="${p.def?'#7A8A98':'#1C1B2E'}">${p.label}</text>`;
  });
  svg.innerHTML = html;
}

/* ---- construction à partir d'un énoncé (mini-langage reconnu) ---- */
function stripAccents(s){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function quadCoords(kind){
  const cx=250, cy=160;
  if(kind==='carre') return [{x:cx-90,y:cy-90},{x:cx+90,y:cy-90},{x:cx+90,y:cy+90},{x:cx-90,y:cy+90}];
  if(kind==='rectangle') return [{x:cx-130,y:cy-70},{x:cx+130,y:cy-70},{x:cx+130,y:cy+70},{x:cx-130,y:cy+70}];
  if(kind==='losange') return [{x:cx,y:cy-100},{x:cx+120,y:cy},{x:cx,y:cy+100},{x:cx-120,y:cy}];
  return [{x:cx-120,y:cy-70},{x:cx+80,y:cy-70},{x:cx+120,y:cy+70},{x:cx-80,y:cy+70}]; // parallélogramme
}
function triangleCoords(kind, rightIdx){
  kind = kind || '';
  if(kind.includes('equilateral')){
    return [{x:250,y:70},{x:140.3,y:260},{x:359.7,y:260}];
  }
  if(kind.includes('rectangle')){
    const base=[{x:150,y:250},{x:350,y:250},{x:150,y:90}]; // angle droit sur base[0]
    const idx = (typeof rightIdx==='number') ? rightIdx : 0;
    const out=[null,null,null];
    out[idx]=base[0]; out[(idx+1)%3]=base[1]; out[(idx+2)%3]=base[2];
    return out;
  }
  if(kind.includes('isocele')){
    return [{x:250,y:70},{x:130,y:260},{x:370,y:260}];
  }
  return [{x:250,y:70},{x:120,y:260},{x:380,y:260}]; // scalène par défaut
}
function figByLabel(map, lab){ return map[lab]; }
function buildFromEnonce(){
  const text = document.getElementById('enonceInput').value;
  const byLabel = {};
  figState.points.forEach(p=>{ byLabel[p.label]=p; });
  let unresolved = [];
  text.split('\n').forEach(raw=>{
    const line = raw.trim();
    if(!line) return;
    let m;
    if((m = line.match(/^([A-Za-z]{4})\s+(carr[ée]|rectangle|losange|parall[ée]logramme)/i))){
      const labels = m[1].toUpperCase().split('');
      const kind = stripAccents(m[2].toLowerCase());
      const coords = quadCoords(kind.startsWith('carr')?'carre':kind);
      labels.forEach((lab,i)=>{ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab],coords[i]); });
      for(let i=0;i<4;i++) figState.shapes.push({type:'segment', p1:byLabel[labels[i]], p2:byLabel[labels[(i+1)%4]]});
    }
    else if((m = line.match(/^([A-Za-z]{3})\s+triangle((?:\s+(?:rectangle|isoc[eè]le|[ée]quilat[ée]ral))*)(?:\s+en\s+([A-Za-z]))?/i))){
      const labels = m[1].toUpperCase().split('');
      const kind = stripAccents((m[2]||'').toLowerCase());
      const rightVertex = m[3] ? m[3].toUpperCase() : null;
      const rightIdx = rightVertex ? labels.indexOf(rightVertex) : 0;
      const coords = triangleCoords(kind, rightIdx>=0?rightIdx:0);
      labels.forEach((lab,i)=>{ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab],coords[i]); });
      for(let i=0;i<3;i++) figState.shapes.push({type:'segment', p1:byLabel[labels[i]], p2:byLabel[labels[(i+1)%3]]});
    }
    else if((m = line.match(/^([A-Za-z])\s+milieu\s+de\s*\[?([A-Za-z])([A-Za-z])\]?/i))){
      const lab=m[1].toUpperCase(), l1=m[2].toUpperCase(), l2=m[3].toUpperCase();
      const p1=byLabel[l1], p2=byLabel[l2];
      if(p1 && p2){ byLabel[lab]=byLabel[lab]||{label:lab}; Object.assign(byLabel[lab], {x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2, def:{type:'milieu', a:p1, b:p2}}); }
      else unresolved.push(line);
    }
    else if((m = line.match(/^cercle\s+de\s+centre\s+([A-Za-z])(?:\s+passant\s+par\s+([A-Za-z])|\s+(?:et\s+)?de\s+rayon)/i))){
      const cLab=m[1].toUpperCase(), tLab=m[2]?m[2].toUpperCase():null;
      const center = byLabel[cLab];
      if(center){
        const radiusPoint = tLab ? byLabel[tLab] : {x:center.x+80, y:center.y};
        if(radiusPoint) figState.shapes.push({type:'cercle', p1:center, p2:radiusPoint});
      } else unresolved.push(line);
    }
    else if((m = line.match(/^([A-Za-z])\s*(?:point)?$/i))){
      const lab = m[1].toUpperCase();
      if(!byLabel[lab]) byLabel[lab] = {label:lab, x:60+Math.random()*380, y:50+Math.random()*220};
    }
    else unresolved.push(line);
  });
  figState.points = Object.values(byLabel);
  recomputeDependents();
  renderFigureSvg();
  const hint = document.getElementById('figureHint');
  hint.textContent = unresolved.length
    ? `Construit, mais non reconnu : « ${unresolved.join(' / ')} ». Ajustez à la main, ou essayez « Interpréter avec l'IA ».`
    : 'Construction faite — ajustez à la main si besoin, ou validez.';
}
function figurePrompt(text){
  return `Tu convertis un énoncé de géométrie de collège (6e/5e) en une figure décrite en JSON strict, rien d'autre autour (pas de \`\`\`, pas de texte).
Schéma exact attendu :
{"points":[{"label":"A","x":150,"y":80}, ...],
 "shapes":[{"type":"segment","p1":"A","p2":"B"}, {"type":"droite","p1":"A","p2":"B"}, {"type":"cercle","p1":"A","p2":"B"}, {"type":"angle","vertex":"B","p1":"A","p2":"C"}]}
Contraintes : coordonnées x entre 20 et 480, y entre 20 et 300, dans un repère où y augmente vers le bas. Respecte la géométrie réelle décrite (angles droits, longueurs égales, alignements, milieux...) du mieux possible avec des coordonnées cohérentes. "p1"/"p2"/"vertex" référencent des labels déclarés dans "points". N'invente pas de figure si l'énoncé est incompréhensible : renvoie {"points":[],"shapes":[]} dans ce cas.
Énoncé : """${text}"""`;
}
async function interpretEnonceWithAI(){
  const hint = document.getElementById('figureHint');
  const text = document.getElementById('enonceInput').value.trim();
  if(!text){ hint.textContent = "Tapez d'abord un énoncé dans le champ ci-dessus."; return; }
  if(!currentUser){ hint.textContent = "Connectez-vous pour utiliser l'interprétation par IA."; return; }
  hint.textContent = "Interprétation par l'IA en cours…";
  try{
    const raw = await callClaude(figurePrompt(text), 900, {feature:'figure', chapitre:currentChapterTitle});
    const match = raw.match(/\{[\s\S]*\}/);
    if(!match) throw new Error('no-json');
    const json = JSON.parse(match[0]);
    applyAIFigure(json);
    hint.textContent = "Figure interprétée par l'IA — vérifiez et ajustez si besoin, ou validez.";
  }catch(err){
    if(err.message==='no-session') hint.textContent = "Connectez-vous pour utiliser l'interprétation par IA.";
    else hint.textContent = "Échec de l'interprétation IA (réseau, ou réponse inattendue). Réessayez, ou construisez à la main.";
  }
}
function applyAIFigure(json){
  const byLabel = {};
  (json.points||[]).forEach(p=>{
    if(p && p.label) byLabel[String(p.label).toUpperCase()] = {label:String(p.label).toUpperCase(), x:+p.x||250, y:+p.y||160};
  });
  const shapes = [];
  (json.shapes||[]).forEach(s=>{
    if(!s || !s.type) return;
    if(s.type==='angle'){
      const v=byLabel[String(s.vertex).toUpperCase()], p1=byLabel[String(s.p1).toUpperCase()], p2=byLabel[String(s.p2).toUpperCase()];
      if(v&&p1&&p2) shapes.push({type:'angle', vertex:v, p1, p2});
    } else if(['segment','droite','cercle'].includes(s.type)){
      const p1=byLabel[String(s.p1).toUpperCase()], p2=byLabel[String(s.p2).toUpperCase()];
      if(p1&&p2) shapes.push({type:s.type, p1, p2});
    }
  });
  if(!Object.keys(byLabel).length) return;
  figState.points = Object.values(byLabel);
  figState.shapes = shapes;
  figState.nextLabel = 0;
  renderFigureSvg();
}
function validateFigure(){
  const svg=document.getElementById('figureSvg');
  const html = `<svg viewBox="0 0 500 320" style="width:100%;max-width:420px;display:block;margin:6px auto;border:1px solid rgba(28,43,57,.12);border-radius:8px;">${svg.innerHTML}</svg>`;
  const snapshot = JSON.parse(JSON.stringify({points:figState.points, shapes:figState.shapes}));
  addPendingBlock('figure', html, snapshot, 'reopenFigure');
  closeFigureTool();
}
function reopenFigure(data){
  openFigureTool();
  figState.points = JSON.parse(JSON.stringify(data.points));
  figState.shapes = JSON.parse(JSON.stringify(data.shapes));
  figState.nextLabel = figState.points.length;
  renderFigureSvg();
}
(function initFigureDrag(){
  const attach = ()=>{
    const svg = document.getElementById('figureSvg');
    if(!svg) return;
    svg.addEventListener('mousedown', onFigureMouseDown);
    window.addEventListener('mousemove', onFigureMouseMove);
    window.addEventListener('mouseup', onFigureMouseUp);
    svg.addEventListener('touchstart', onFigureMouseDown, {passive:false});
    svg.addEventListener('touchmove', onFigureMouseMove, {passive:false});
    svg.addEventListener('touchend', onFigureMouseUp);
  };
  attach();
})();
function fillCorChapitres(){
  const niveau = document.getElementById('corNiveau').value;
  const data = niveau==='6e'?CH6:CH5;
  const sel=document.getElementById('corChapitre');
  sel.innerHTML = data.map(c=>`<option value="${c.code} · ${c.t}">${c.code} (${c.t})</option>`).join('');
}
fillCorChapitres();
function fillTdChapitres(){
  const niveau = document.getElementById('tdNiveau').value;
  const data = niveau==='6e'?CH6:CH5;
  const sel=document.getElementById('tdChapitre');
  sel.innerHTML = data.map(c=>`<option value="${c.code} · ${c.t}">${c.code} (${c.t})</option>`).join('');
}
fillTdChapitres();
function todayISO(){ return new Date().toISOString().slice(0,10); }
function fmtDateFR(iso){
  if(!iso) return 'Date non précisée';
  const d = new Date(iso+'T00:00:00');
  const s = d.toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  return s.charAt(0).toUpperCase()+s.slice(1);
}

/* ======================= CAHIER DE CORRECTIONS (persisté, groupé par jour) ======================= */
/* ======================= SUPABASE : comptes profs, classes, cahier partagé =======================
   Chaque classe appartient à un professeur (connexion par lien e-mail, sans mot de passe).
   Le cahier d'une classe est visible par tous (élèves compris, sans compte), mais seul le
   professeur propriétaire de la classe peut y ajouter ou en retirer une correction — la
   sécurité est appliquée côté serveur (Supabase Row Level Security), pas seulement ici. */
const SUPABASE_URL = 'https://rngzubhnypmistjsumpz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ3p1YmhueXBtaXN0anN1bXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MTExNjEsImV4cCI6MjEwMDM4NzE2MX0.V56LFlb1ITWPmoO-DwLw3coeS7epY9NM5K2Waj03pac';
/* Bouchon utilisé si la bibliothèque Supabase n'a pas pu charger (coupure réseau, CDN
   bloqué...) : toute méthode chaînée (from().select().eq()...) renvoie ce même bouchon, et
   l'attendre (await) donne une erreur explicite plutôt que de planter -- sans ce filet, une
   simple coupure réseau ponctuelle empêchait TOUT le reste du site de s'initialiser (page
   d'accueil vide, menu qui ne répondait plus), un script arrêté en cours de route ne continuant
   jamais jusqu'aux lignes suivantes. */
function makeOfflineSupabaseStub(){
  const resolveVal = {data:null, error:{message:"Connexion au service indisponible (réseau)."}};
  const stub = new Proxy(function(){}, {
    get(target, prop){
      if(prop==='then') return (resolve)=>resolve(resolveVal);
      if(prop==='catch' || prop==='finally') return ()=>stub;
      return stub; // renvoie le proxy lui-même (pas une nouvelle fonction isolée), pour un
                   // chaînage illimité quelle que soit la combinaison d'accès/appels
                   // (sb.auth.onAuthStateChange(...), sb.from(...).select(...).eq(...)...).
    },
    apply(){ return stub; },
  });
  return stub;
}
let sb;
try{
  sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}catch(e){
  console.error("Supabase n'a pas pu s'initialiser (probablement un problème réseau) -- le site continue de fonctionner en mode dégradé (chapitres et outils accessibles, comptes/sauvegarde indisponibles) :", e);
  sb = makeOfflineSupabaseStub();
}

let currentUser = null;
let isStaffGlobal = false;
let currentUserRole = null; // 'admin' | 'prof' | 'eleve' | null
let currentClassId = null;

function toggleAccountMenu(){
  const d = document.getElementById('accountDropdown');
  d.style.display = (d.style.display==='none'||!d.style.display) ? 'block' : 'none';
}
document.addEventListener('click', (e)=>{
  const menu = document.querySelector('.account-menu');
  if(menu && !menu.contains(e.target)) document.getElementById('accountDropdown').style.display='none';
});
/* Les comptes n'ont pas forcément un vrai e-mail (élèves, parfois profs) : on convertit tout
   identifiant sans "@" en une adresse interne, jamais envoyée nulle part, qui ne sert qu'à
   Supabase Auth en coulisses. La même conversion doit être appliquée à la connexion et à la
   création de compte, sinon un identifiant créé d'un côté ne serait pas reconnu de l'autre. */
function toAuthEmail(identifiant){
  identifiant = (identifiant||'').trim();
  return identifiant.includes('@') ? identifiant : identifiant.toLowerCase().replace(/\s+/g,'.')+'@mathcollege.local';
}
async function globalSignIn(){
  const identifiant = document.getElementById('globalAuthEmail').value.trim();
  const password = document.getElementById('globalAuthPassword').value;
  const status = document.getElementById('globalAuthStatus');
  if(!identifiant || !password){ status.textContent = 'Entrez votre identifiant et votre mot de passe.'; return; }
  status.textContent = 'Connexion en cours…';
  const { error } = await sb.auth.signInWithPassword({ email: toAuthEmail(identifiant), password });
  status.textContent = error ? "Erreur : "+(error.message.includes('Invalid login') ? 'identifiant ou mot de passe incorrect.' : error.message) : '';
}
async function globalSignOut(){
  await sb.auth.signOut();
  currentUser = null; currentUserRole = null; currentClassId = null;
  refreshAuthUI();
}
async function refreshAuthUI(){
  const { data:{ session } } = await sb.auth.getSession();
  const loggedOutEl = document.getElementById('accountLoggedOut'), loggedInEl = document.getElementById('accountLoggedIn');
  const navAdmin = document.getElementById('navAdmin');
  const navCorrection = document.getElementById('navCorrection'), navCahier = document.getElementById('navCahier');
  const navMesResultats = document.getElementById('navMesResultats');

  if(session){
    currentUser = session.user;
    const { data: profile } = await sb.from('profiles').select('role,nom').eq('id', currentUser.id).single();
    currentUserRole = profile ? profile.role : null;

    loggedOutEl.style.display='none'; loggedInEl.style.display='block';
    document.getElementById('accountNameDisplay').textContent = (profile && profile.nom) || currentUser.email;
    document.getElementById('accountRoleDisplay').textContent =
      currentUserRole==='admin' ? 'Administrateur' : currentUserRole==='prof' ? 'Professeur' : currentUserRole==='eleve' ? 'Élève' : '';

    const isStaff = currentUserRole==='admin' || currentUserRole==='prof';
    isStaffGlobal = isStaff;
    if(navCorrection) navCorrection.style.display = isStaff ? 'inline-block' : 'none';
    if(navCahier) navCahier.style.display = 'inline-block'; // accessible à tous les comptes connectés (prof, admin, élève)
    if(navMesResultats) navMesResultats.style.display = currentUserRole==='eleve' ? 'inline-block' : 'none';
    if(navAdmin) navAdmin.style.display = currentUserRole==='admin' ? 'inline-block' : 'none';
    const btnReportBug = document.getElementById('btnReportBug');
    if(btnReportBug) btnReportBug.style.display = isStaff ? 'block' : 'none';
    const chapSuggestRow = document.getElementById('chapSuggestRow');
    if(chapSuggestRow) chapSuggestRow.style.display = isStaff ? 'block' : 'none';
    const classRow = document.getElementById('accountClassRow');
    if(classRow) classRow.style.display = isStaff ? 'block' : 'none'; // un élève ne choisit pas sa classe, elle lui est assignée
    const btnGenerateQuiz = document.getElementById('btnGenerateQuiz'), quizLoginHint = document.getElementById('quizLoginHint');
    if(btnGenerateQuiz) btnGenerateQuiz.style.display = 'inline-block';
    if(quizLoginHint) quizLoginHint.style.display = 'none';

    if(currentUserRole==='admin') await adminRefreshDropdowns();
    if(isStaff) await loadMyClasses();
    if(currentUserRole==='eleve') await loadMyStudentClasses();
  } else {
    currentUser = null; currentUserRole = null; currentClassId = null;
    loggedOutEl.style.display='block'; loggedInEl.style.display='none';
    isStaffGlobal = false;
    if(navCorrection) navCorrection.style.display='none';
    if(navCahier) navCahier.style.display='none';
    if(navMesResultats) navMesResultats.style.display='none';
    if(navAdmin) navAdmin.style.display='none';
    const btnReportBugOut = document.getElementById('btnReportBug');
    if(btnReportBugOut) btnReportBugOut.style.display='none';
    const chapSuggestRowOut = document.getElementById('chapSuggestRow');
    if(chapSuggestRowOut) chapSuggestRowOut.style.display='none';
    const btnGenerateQuiz = document.getElementById('btnGenerateQuiz'), quizLoginHint = document.getElementById('quizLoginHint');
    if(btnGenerateQuiz) btnGenerateQuiz.style.display='none';
    if(quizLoginHint) quizLoginHint.style.display='inline';
  }
  // reflète l'état de connexion sur les boutons "+ Cahier" déjà injectés dans les cours ouverts
  updateCourseAddButtonsState();
}
sb.auth.onAuthStateChange(()=>refreshAuthUI());

function updateClassDisplays(name){
  const badge = document.getElementById('activeClassBadge');
  if(badge) badge.textContent = name ? '· '+name : '';
  const classStatus = document.getElementById('classStatus');
  if(classStatus) classStatus.textContent = name || 'aucune';
  const studentClassStatus = document.getElementById('studentClassStatus');
  if(studentClassStatus) studentClassStatus.textContent = name || 'aucune';
  const btn = document.getElementById('accountClassButton');
  if(btn) btn.textContent = name || '— Choisir une classe —';
  renderCorClassQuickPicker();
  updateAddCahierButtonState();
}
/* Boutons cliquables pour choisir directement une classe depuis l'outil de correction, sans
   passer par le menu compte -- évite d'avoir à naviguer ailleurs juste pour ça. */
function renderCorClassQuickPicker(){
  const box = document.getElementById('corClassQuickPicker');
  if(!box) return;
  if(!accountClassesList.length){ box.innerHTML=''; return; }
  box.innerHTML = accountClassesList.map(c=>`
    <button type="button" onclick="selectClassFromModal('${c.id}')" style="border:1.5px solid ${c.id===currentClassId?'#0D5BA3':'rgba(28,43,57,.2)'};background:${c.id===currentClassId?'#0D5BA3':'#fff'};color:${c.id===currentClassId?'#fff':'#333'};border-radius:20px;padding:4px 12px;margin:2px 4px 2px 0;cursor:pointer;font-size:.85rem;">${c.id===currentClassId?'✓ ':''}${escapeHtml(c.label)}</button>
  `).join('');
}
/* Le bouton d'ajout au cahier n'a de sens que si une classe est active (le cahier est propre à
   chaque classe) -- désactivé et grisé tant qu'aucune n'est sélectionnée, pour éviter toute
   confusion sur où part la correction. */
function updateAddCahierButtonState(){
  const btn = document.getElementById('btnAddCahier');
  const hint = document.getElementById('corClassHint');
  if(!btn) return;
  const disabled = !currentClassId;
  btn.disabled = disabled;
  btn.style.opacity = disabled ? '.5' : '1';
  btn.style.cursor = disabled ? 'not-allowed' : 'pointer';
  btn.title = disabled ? 'Sélectionnez une classe ci-dessus avant d\'ajouter au cahier.' : '';
  if(hint) hint.innerHTML = disabled
    ? '⚠️ Sélectionnez une classe ci-dessus pour pouvoir ajouter des corrections au cahier.'
    : 'Changez de classe depuis le menu <span style="font-weight:700;">👤 compte</span>, en haut à droite.';
}
let accountClassesList = [];
function populateAccountClassList(classesList){
  accountClassesList = classesList.map(c=>({id:c.id, label:`${c.nom} (${c.niveau})`}));
}
function openClassModal(){
  renderClassModalList();
  document.getElementById('classModalOverlay').style.display='flex';
}
function closeClassModal(){
  document.getElementById('classModalOverlay').style.display='none';
}

/* ================= Signalement de bug / amélioration ================= */
const CHANGELOG_DATA = [
  { version:'2026-08-04.162', items:[
    "Tableau interactif -- équerre entièrement redessinée pour reproduire fidèlement le modèle Staedtler (proportions étirées, coins arrondis via de vraies courbes, évidement triangulaire bien positionné). Poignées de rotation de la règle, l'équerre et la réquerre déplacées au cœur de l'outil (petites, discrètes, semi-transparentes) au lieu d'être posées sur les graduations.",
  ]},
  { version:'2026-08-04.161', items:[
    "Tableau interactif -- règle : petite marge avant le 0 (comme une vraie règle), texte « Nom · Prénom » retiré. Équerre/réquerre : vrai bug trouvé, les graduations pointaient vers l'extérieur du triangle au lieu de l'intérieur (les numéros semblaient flotter hors de la forme) -- corrigé, avec un évidement triangulaire mieux ajusté et une bande pleine dédiée aux graduations, comme une vraie équerre.",
  ]},
  { version:'2026-08-04.160', items:[
    "Tableau interactif -- compas : fix de la pointe (l'orientation était bien inversée, la partie fine était décalée au lieu d'être exactement au point d'ancrage -- corrigé, elle ressemble maintenant à une vraie aiguille). Nouvelle aide contextuelle sous le tableau, mise à jour selon l'outil manipulé (comment le déplacer, le faire tourner, tracer...). Règle et équerre/réquerre redessinées dans l'esprit d'une vraie règle Maped et d'une équerre Staedtler : transparence, coins arrondis, trou de suspension, évidement triangulaire creux.",
  ]},
  { version:'2026-08-04.159', items:[
    "Tableau interactif -- compas : pointe (ancrage) redessinée en petite forme grise et pointue, à l'image de la mine. Rapporteur : mine rapprochée du bord réel (marge réduite), sa position (angle) est désormais mémorisée d'un geste à l'autre au lieu de revenir toujours à 90°. Surtout : un simple glissé ne pose plus de repère automatiquement au relâché (juste un repositionnement) -- il faut un double-clic pour vraiment le poser, comme demandé.",
  ]},
  { version:'2026-08-04.158', items:[
    "Tableau interactif -- compas : sélecteur à 3 états (↔️ Ouvrir/écarter, 🔒 Fermé/tourner sans rien tracer ni écarter, ✏️ Crayon/tracer), un clic fait défiler les états. Rapporteur : poignée de rotation déplacée à l'intérieur, discrète, pour ne plus gêner la lecture des graduations près de 180°. Le crayon rotatif ne peut plus s'écarter du rapporteur (mine toujours exactement sur le bord). Le repère posé est désormais un simple petit trait dans l'axe de la graduation choisie, plus une croix.",
  ]},
  { version:'2026-08-04.157', items:[
    "Tableau interactif -- compas repris avec le bon vocabulaire (pointe = ancrage fixe, mine = crayon qui trace) : plus de cercle sur la pointe, mine redessinée en vrai petit crayon, la branche de la pointe déplace tout l'ensemble (aimantage sur un point existant), la branche du crayon écarte/tourne librement sans tracer. Un clic sur l'icône 🔓/🔒 verrouille le rayon et fait basculer cette même branche en mode traçage (tourner dessine vraiment l'arc/cercle) ; un second clic déverrouille.",
  ]},
  { version:'2026-08-04.156', items:[
    "Tableau interactif -- fix important du rapporteur : le crayon ne bougeait jamais visuellement pendant le glissement (seul un petit repère en pointillés apparaissait ailleurs), donnant l'impression qu'il ne tournait pas. Corrigé, le crayon lui-même suit maintenant le geste. Compas : mine redessinée en simple pointe grise (plus de rectangle coloré ni de cercle), c'est désormais la branche qui porte la mine qui déplace tout l'ensemble (avec aimantage sur un point existant), le cœur règle l'écartement. Nouveau bouton « 📐 Trait de construction » qui bascule les tracés suivants en gris fin, sans modifier ceux déjà faits.",
  ]},
  { version:'2026-08-04.155', items:[
    "Tableau interactif -- refonte du compas selon un geste plus naturel : le cœur (intersection des branches) déplace l'ensemble en le maintenant appuyé, la branche qui porte le crayon règle l'écartement sans rien tracer, la mine tourne ET trace, un double-clic sur le cœur verrouille le rayon (cadenas visible, charnière rouge). Fix important : les branches gardaient une longueur fixe désormais (elles semblaient s'allonger en écartant auparavant, un bug de géométrie). Rapporteur : le crayon rotatif se place maintenant à 90° par défaut, mine exactement sur le bord extérieur.",
  ]},
  { version:'2026-08-04.154', items:[
    "Tableau interactif -- corrections majeures suite aux retours. Compas : nouveau bouton « 🎯 Vise / ✏️ Trace » (on peut enfin tourner pour viser sans tracer par erreur), la mine s'aimante sur un point existant en visant, arcs lissés par interpolation, redessiné dans l'esprit d'un vrai compas moderne (charnière ovale, pommeau arrondi, jambes épaisses). Rapporteur : agrandi, plus de nommage forcé pour poser un repère d'angle, le crayon qui tourne autour ressemble maintenant à un vrai petit crayon, le pivot s'aimante sur un point existant et la rotation s'aligne vers un second point. Gomme : effacement partiel (scinde le trait) au lieu de tout effacer. Règle non graduée retirée de la palette (redondante).",
  ]},
  { version:'2026-08-04.153', items:[
    "Tableau interactif -- règle : pivot déplacé exactement au bord côté graduation (plus au centre de la largeur). Rapporteur : fix d'un vrai bug qui empêchait tout déplacement (l'image bloquait les clics au lieu de les transmettre). Points et repères désormais déplaçables par glisser (tap = renommer, glissé = déplacer). Icônes rapporteur/compas/gomme remplacées par de vraies illustrations SVG, bien plus parlantes que les emojis précédents. Nouvel outil Gomme. Compas : nouvelle poignée pour écarter/resserrer les branches sans tracer, mine redessinée en forme de petit crayon.",
  ]},
  { version:'2026-08-04.152', items:[
    "Tableau interactif -- refonte importante suite aux retours : plus de croix de suppression (l'icône de la palette sélectionne/désélectionne l'outil), poignée de rotation intégrée à l'outil lui-même (plus flottante à côté), règle agrandie qui pivote autour de son 0 avec graduations cm/mm numérotées, crayon redessiné plus élancé. Rapporteur : la poignée pose désormais un simple repère nommé (plus de tracé automatique) -- au professeur de relier ensuite à la règle. Boutons segment/demi-droite/droite : n'arment plus qu'une contrainte sur le crayon (le geste de tracé reste manuel, mais ne peut pas déborder), pour continuer à montrer le geste plutôt que de tracer à la place du professeur.",
  ]},
  { version:'2026-08-04.151', items:[
    "Tableau interactif -- nom des points : fenêtre de lettres majuscules cliquables (plus de clavier), celles déjà utilisées disparaissent de la liste. Rapporteur : crayon spécial qui tourne autour du pivot pour tracer un rayon à l'angle choisi. Nouveauté : dès que 2 points posés sont alignés sur le bord d'une règle/équerre, 3 boutons apparaissent pour tracer directement le segment [AB], la demi-droite [AB) ou la droite (AB) -- sans geste manuel, donc jamais de débordement ni d'arrêt trop court.",
  ]},
  { version:'2026-08-04.150', items:[
    "Tableau interactif -- crayon agrandi avec un vrai manche long et bien séparé de la pointe (aucun chevauchement des deux zones tactiles, plus de risque de déclencher un tracé en voulant juste le déplacer). Fix de l'accrochage des règles : il se faisait côté opposé aux graduations -- corrigé, s'aimante désormais du bon côté. Rapporteur remplacé par la vraie image du cours 6e (Angles et rapporteur), avec son pivot précisément mesuré.",
  ]},
  { version:'2026-08-04.149', items:[
    "Tableau interactif -- les seuils d'accrochage (crayon sur un bord, règle sur un point) étaient calibrés pour une souris précise, bien trop stricts pour un doigt sur petit écran. Nettement élargis (plus du double), et zones tactiles agrandies (pointe du crayon, points marqués). Vérifié avec une règle inclinée et une imprécision volontaire de 8 à 12px : l'accrochage reste parfait.",
  ]},
  { version:'2026-08-04.148', items:[
    "Tableau interactif -- les règles/équerres/réquerres/rapporteurs s'aimantent désormais sur un point déjà posé quand on les déplace à proximité (leur bord se cale exactement dessus). Permet le geste naturel : poser un point, puis approcher une règle qui s'y accroche, puis tracer le long avec le crayon.",
  ]},
  { version:'2026-08-04.147', items:[
    "Tableau interactif -- fix important : le crayon traçait dès qu'on le déplaçait, impossible de le repositionner sans laisser un trait. Corrigé : attraper le corps du crayon le déplace sans tracer, seule la pointe trace. Un tap (sans glisser) sur la pointe pose un point marqué (croix + nom au choix, cliquable ensuite pour le renommer). Boutons de suppression agrandis avec une croix bien visible. Impossible désormais d'avoir deux fois le même outil sur le tableau.",
  ]},
  { version:'2026-08-04.146', items:[
    "Nouveau (v1) : Tableau interactif (menu Outils prof), avec crayon, règles graduée/non graduée, équerre, réquerre, rapporteur et compas -- tous déplaçables et rotatifs. Le crayon trace librement, et s'aimante automatiquement le long du bord d'une règle/équerre/réquerre/rapporteur si on passe suffisamment près. Le compas trace un arc à rayon constant en faisant tourner sa pointe crayon autour de la pointe sèche. Prochaine étape : enregistrement pas à pas pour créer des tutoriels de construction.",
  ]},
  { version:'2026-08-04.145', items:[
    "Page d'accueil -- nouvelle section « Pour les professeurs » (outil de correction, créer une évaluation, cahier de corrections, suivi des classes), pour rendre visible tout ce qui était jusqu'ici accessible seulement via le menu. Texte d'introduction mis à jour pour mentionner les deux publics.",
  ]},
  { version:'2026-08-04.144', items:[
    "Division posée -- le diviseur (à droite de la barre) était légèrement plus haut que le dividende, à cause d'un interlignage différent. Corrigé : les deux sont maintenant parfaitement alignés, dans tous les modes (normal, vierge, avec différences).",
  ]},
  { version:'2026-08-04.143', items:[
    "Division à compléter -- le trait vertical n'était pas assez haut (lignes trop compactes pour écrire à la main). Hauteur des lignes augmentée en mode vierge.",
    "Zones/lignes à une seule colonne -- il n'était pas possible d'y ajouter une bordure ou un fond de couleur (ces réglages n'existaient que pour les lignes à plusieurs colonnes). Corrigé : même système disponible partout.",
  ]},
  { version:'2026-08-04.142', items:[
    "Division sans différences -- un reste intermédiaire en trop s'affichait (ex. 1437÷12 montrait 23, 11, 117, 9 au lieu de 23, 117, 9). Chaque valeur (ex. 117) contient déjà le reste précédent dans ses premiers chiffres (le « 11 »), inutile de l'écrire une seconde fois à part. Seul le tout dernier reste, qui n'est repris nulle part ailleurs, s'écrit désormais séparément.",
  ]},
  { version:'2026-08-04.141', items:[
    "Division sans différences -- la toute première étape (ex. « 42 », « 12 » pour 425÷15) traînait inutilement : elle n'utilise que des chiffres bruts du dividende, déjà visibles dans l'en-tête, donc n'apporte rien de nouveau à l'écrit. Elle reste désormais mentale ; l'écriture démarre à partir du premier vrai abaissement sur un reste calculé. Le mode « avec différences » n'a pas changé.",
  ]},
  { version:'2026-08-04.140', items:[
    "Division posée -- sans les différences, on ne voyait que les restes isolés (ex. 1 puis 2) sans comprendre comment on y arrivait. Ajout du nombre obtenu après abaissement du chiffre suivant (ex. 85 puis 14) avant chaque reste, pour que la progression reste compréhensible.",
  ]},
  { version:'2026-08-04.139', items:[
    "Division posée -- correction du sens de « Afficher les différences » : décochée, elle masque seulement le détail des soustractions, en gardant bien les restes successifs à chaque étape (et non plus juste le dividende et le résultat final).",
    "Zones colorées -- la couleur ne s'étendait pas derrière certains contenus (graphique, axe, repère, diagramme statistique), qui imposaient leur propre fond blanc opaque. Corrigé : la couleur choisie s'applique désormais uniformément, y compris derrière ces éléments.",
  ]},
  { version:'2026-08-04.138', items:[
    "Division posée -- nouvelle case à cocher « Afficher les différences » pour masquer le détail des soustractions intermédiaires (garde juste le dividende et le reste final). Fond gris retiré partout dans l'outil.",
    "Outil de création (évaluation/correction) -- les zones/colonnes peuvent maintenant recevoir un fond de couleur (même palette que {{couleur|texte}} : rouge, bleu, vert, orange), en plus des bordures déjà disponibles. Pastilles cliquables en bas à gauche de chaque zone.",
  ]},
  { version:'2026-08-04.137', items:[
    "Fix important -- un cours référencé dans une correction (bandeau titre, badges, encadrés colorés) s'imprimait en texte brut sans aucune mise en forme. Cause : ces éléments utilisent les classes CSS du site, jamais chargées dans les fenêtres d'impression/projection (seul KaTeX l'était). La feuille de style du site est désormais chargée dans les trois fenêtres concernées (projection, impression évaluation, impression cahier).",
  ]},
  { version:'2026-08-04.136', items:[
    "Impression (cahier ET évaluation) -- les couleurs de fond et bordures disparaissaient à l'impression : réglage par défaut du navigateur pour économiser l'encre, désormais forcé à conserver l'apparence exacte de l'écran. Soulignement des références d'exercices légèrement décalé (n'était plus collé au texte).",
  ]},
  { version:'2026-08-04.135', items:[
    "Cahier de corrections (impression/PDF) -- fix de la synchronisation des tailles de disques (elle s'appuyait sur les données de la session en cours, absentes pour d'anciennes corrections déjà enregistrées ; remplacée par une version autonome qui fonctionne toujours). Dates en gras, références d'exercices soulignées, titre « Cahier de corrections » retiré, chapitre affiché en pied de section aligné à droite (ex. « N1 · Opérations sur les nombres décimaux ») -- un vrai pied de page physique par feuille imprimée n'étant pas réalisable en HTML/CSS standard, ceci en est l'équivalent le plus proche.",
  ]},
  { version:'2026-08-04.134', items:[
    "Cahier de corrections -- fix définitif de la page blanche au PDF : abandon de html2canvas (donnait une page blanche de façon récurrente avec ce contenu) au profit de l'impression native du navigateur, comme pour l'évaluation. Boutons renommés « 🖨️ Imprimer / Enregistrer en PDF ». Le bouton « Voir toutes les dates » redevient « 📅 Corrections du jour » une fois cliqué, pour basculer facilement entre les deux vues sans ressaisir la date.",
  ]},
  { version:'2026-08-04.133', items:[
    "Cahier de correction (liste en bas de l'outil de correction) -- filtre par date ajouté, sur la date du jour par défaut, pour ne plus afficher toutes les corrections de l'année à chaque ouverture. Bouton « Voir toutes les dates » pour tout retrouver. Tentative de fix pour la page blanche au « Générer le cahier (PDF) » -- désactivation d'un mode de rendu connu pour mal fonctionner avec l'arbre de probabilité (SVG avec texte enrichi) ; à confirmer.",
  ]},
  { version:'2026-08-04.132', items:[
    "Cahier de correction -- fix important : cliquer sur « Modifier » ne reprenait jamais les blocs construits (figures, tableaux...), seul le texte libre revenait. Cause : le cahier n'enregistrait que le rendu final (HTML aplati), pas la structure modifiable, et le chargement pointait vers une variable orpheline. Corrigé -- les nouvelles entrées enregistrent la structure complète (blocs, mise en page, bordures), entièrement modifiable en rouvrant. Les entrées déjà existantes restent visibles mais non détaillables bloc par bloc (elles n'avaient pas cette donnée).",
  ]},
  { version:'2026-08-04.131', items:[
    "Outil de correction -- boutons cliquables pour choisir directement une classe sous « Classe active », sans passer par le menu compte. Le bouton « + Ajouter au cahier » est désormais désactivé (grisé) tant qu'aucune classe n'est sélectionnée, pour éviter toute confusion sur où part la correction.",
  ]},
  { version:'2026-08-04.130', items:[
    "Fix très probable du menu bloqué (sans erreur console) -- si un outil (figure, texte, probabilités, éditeur de formule...) restait ouvert et qu'on changeait de page via le menu sans le fermer d'abord, son overlay plein écran restait actif par-dessus la nouvelle page et interceptait tous les clics, y compris sur le menu, sans qu'aucune erreur ne s'affiche (rien ne plante, l'overlay fait juste écran). Changer de page ferme désormais systématiquement tout outil resté ouvert.",
  ]},
  { version:'2026-08-04.129', items:[
    "Ajout d'un favicon (absent jusqu'ici, provoquait un 404 inoffensif mais visible dans la console à chaque chargement). Recherche en cours sur un éventuel 404 lié au blocage du menu -- si le problème persiste, toute information sur l'URL exacte en échec (visible dans la console développeur) aiderait à le cibler précisément.",
  ]},
  { version:'2026-08-04.128', items:[
    "Outil de correction -- fix des boutons de bordure imprimée (▔▕▁▏) sur les zones/colonnes, qui ne faisaient rien (supposaient toujours un exercice du module Évaluation, inexistant ici). Stockage dédié ajouté, la bordure choisie s'applique bien désormais dans le rendu final (cahier, impression).",
  ]},
  { version:'2026-08-04.127', items:[
    "Outil de correction -- fix important : le glisser-déposer entre colonnes mettait bien à jour la donnée, mais l'affichage ne se rafraîchissait jamais (appelait toujours la fonction du module Évaluation), donnant l'impression que rien ne se passait. Corrigé. La zone de texte libre est maintenant masquée par défaut (accessible via « + Zone de texte libre » si besoin), puisqu'elle peut de toute façon se recréer avec l'outil Texte.",
  ]},
  { version:'2026-08-04.126', items:[
    "Outil de correction -- la zone de texte libre sous le titre peut désormais être retirée (bouton ✕), comme dans le module Évaluation qui n'en a pas et va directement aux blocs ; réversible via « + Zone de texte libre ». Les zones en pointillés (blocs en cours d'édition) passent en fond blanc, plus lisibles que le fond crème hérité de la page.",
  ]},
  { version:'2026-08-04.125', items:[
    "Outil de correction -- reprend maintenant le même système de mise en page que le module Évaluation : lignes/colonnes personnalisables, glisser-déposer des blocs entre elles, bouton « Valider » qui masque la barre d'outils et les pointillés d'édition pour un écran plus lisible en cours. L'ajout au cahier et la fenêtre de projection conservent bien cette mise en page. Fix au passage : « Effacer le brouillon » ne vidait pas réellement les blocs insérés (variable orpheline depuis un ancien refactor) -- corrigé.",
  ]},
  { version:'2026-08-04.124', items:[
    "Sac/urne -- fix du chevauchement : la dispersion aléatoire acceptait la « moins mauvaise » position même si elle touchait une autre boule, faute de mieux après 40 essais. Corrigé en réduisant le rayon jusqu'à obtenir un arrangement garanti sans aucun chevauchement -- vérifié numériquement (pas seulement visuellement) sur plusieurs cas, jusqu'à 35 boules.",
  ]},
  { version:'2026-08-04.123', items:[
    "Sac/urne -- abandon de l'empilement en rangées (donnait des boules en équilibre improbable les unes sur les autres). Remplacé par une dispersion aléatoire (mais stable d'une régénération à l'autre) dans une zone intérieure sûre, avec de l'espace entre les boules -- un rendu bien plus naturel, sans jamais déborder du contour.",
  ]},
  { version:'2026-08-04.122', items:[
    "Sac -- fix définitif du calage des boules : une marge globale unique ne pouvait pas satisfaire à la fois « toucher le fond » et « ne pas déborder sur les côtés », car le sac se resserre latéralement près du fond (pas un simple rectangle). Remplacé par des rangées à largeur variable, plus étroites près du fond et pleines plus haut -- donne un vrai empilement en losange, naturel, testé de 1 à 22 boules sans aucun débordement.",
  ]},
  { version:'2026-08-04.121', items:[
    "Sac/urne -- les boules flottaient encore, marge basse trop prudente. Cause précise : le contour du sac plonge légèrement plus bas que sa référence verticale au centre, ce qui faussait le calcul. Corrigé et revérifié avec plusieurs cas (2 boules, jeu de référence, 22 boules) : le fond est maintenant vraiment touché, sans aucune découpe.",
  ]},
  { version:'2026-08-04.120', items:[
    "Sac/urne -- fix du calage des boules : certaines étaient coupées par le contour incurvé (grille ne tenant pas compte du rétrécissement du sac). Recalculé avec une zone de sécurité bien à l'intérieur du tracé : les boules sont désormais toujours entières, se touchent (empilement tassé), et reposent au fond du récipient au lieu de flotter au milieu.",
  ]},
  { version:'2026-08-04.119', items:[
    "Ajout de balises anti-cache sur la page elle-même, pour limiter le risque qu'un navigateur garde en mémoire une ancienne version bloquée (le cas typique : ça fonctionne en navigation privée mais pas en navigation normale -- signe d'une version mise en cache). En cas de blocage malgré tout, un rechargement forcé (Ctrl+Maj+R ou Cmd+Maj+R) résout le problème.",
  ]},
  { version:'2026-08-04.118', items:[
    "Fix important -- si Supabase ne parvenait pas à charger (coupure réseau, CDN bloqué côté établissement...), tout le reste du script s'arrêtait net, y compris l'affichage des chapitres et le menu, qui devenaient inutilisables. Ajout d'un filet de sécurité : dans ce cas, le site continue de fonctionner en mode dégradé (chapitres, menu et outils accessibles normalement), seules les fonctionnalités liées aux comptes (connexion, sauvegarde, partage) restent indisponibles le temps que la connexion revienne.",
  ]},
  { version:'2026-08-04.117', items:[
    "Sac/urne redessiné pour se rapprocher d'un vrai dessin illustré (haut ondulé façon tissu resserré, bande nouée marron, bas arrondi, boules avec reflet brillant). Les 4 outils de probabilités (Sac/urne, Cartes, Dés, Arbre) sont désormais regroupés sous une seule icône à onglets, comme pour Division ou Fraction visuelle. Nouvel outil Dés : un ou plusieurs dés, nombre de faces au choix (d4 à d20), valeur affichée et couleur personnalisables -- pastilles classiques pour un d6, nombre affiché pour les autres.",
  ]},
  { version:'2026-08-04.116', items:[
    "Arbre de probabilité -- fix positionnement : la fraction d'une branche montante avait son dénominateur coupé par le trait, dégagement augmenté. Les événements (noms de branche) se placent maintenant au-dessus du point pour une branche montante, en dessous pour une branche descendante (au lieu de toujours au-dessus).",
  ]},
  { version:'2026-08-04.115', items:[
    "Arbre de probabilité -- événement, probabilité et note s'écrivent maintenant en vrai LaTeX (comme partout ailleurs sur le site, entre $...$ pour du LaTeX complexe, ou en texte simple). La probabilité se positionne au-dessus de la branche si elle monte, en dessous si elle descend. Nouveau champ « note » pour les feuilles (résultat, calcul final...).",
  ]},
  { version:'2026-08-04.114', items:[
    "Trois nouveaux outils pour les probabilités : « Sac / urne de boules » (couleurs et effectifs personnalisables, boules mélangées visuellement) ; « Cartes à jouer » (sélection libre dans un jeu de 32 ou 52 cartes, avec des raccourcis Tout/Aucune/Les as/Les figures) ; « Arbre de probabilité » construit branche par branche (clic sur + pour ajouter un événement et sa probabilité à n'importe quel nœud, imbrication libre). Disponibles dans l'outil de correction et les exercices d'évaluation, comme les autres figures.",
  ]},
  { version:'2026-08-04.113', items:[
    "Histogramme -- fix statistique important : la largeur des barres respecte maintenant la largeur réelle de chaque classe (axe numérique gradué aux bornes), au lieu d'une largeur uniforme. Deux conventions disponibles : « hauteur = effectif » (à l'américaine) ou « aire = effectif » via une case à cocher « densité », la convention rigoureuse dès que les classes n'ont pas toutes la même largeur (à la française).",
  ]},
  { version:'2026-08-04.112', items:[
    "Histogramme -- les classes se saisissent maintenant avec deux champs numériques (« de... à... »), adaptés aux données chiffrées comme les tailles, poids ou âges, plutôt qu'un texte libre à formater à la main. Le libellé (ex. « [150;160[ ») se génère automatiquement, et les classes s'enchaînent proprement quand on en ajoute une nouvelle.",
  ]},
  { version:'2026-08-04.111', items:[
    "Nouvel outil « Diagramme statistique » : camembert (avec pourcentages et légende), diagramme en barres, diagramme en bâtons, et histogramme (barres jointives, pour des classes/intervalles) -- à partir d'une simple liste de catégories et de leurs effectifs. Graduations Y choisies automatiquement (pas rond, ex. tous les 2 ou tous les 5). Disponible dans l'outil de correction et les exercices d'évaluation, comme les autres figures.",
  ]},
  { version:'2026-08-04.110', items:[
    "Outil Graphique -- l'espacement des nombres affichés se règle maintenant séparément pour X et pour Y. En mode radians, π/2 et 3π/2 s'affichent comme de vraies fractions empilées (numérateur, barre, dénominateur), plus fidèles à l'écriture mathématique habituelle qu'un texte plat « π/2 ».",
  ]},
  { version:'2026-08-04.109', items:[
    "Outil Graphique -- nouveau champ « Afficher un nombre tous les : » pour espacer les graduations numérotées (les traits de grille restent tous visibles, seuls les nombres s'espacent) -- utile sur une plage étendue où ils se chevauchaient. Ajout des fonctions ln (logarithme népérien) et exp dans les expressions, ex. ln(x), exp(x).",
  ]},
  { version:'2026-08-04.108', items:[
    "Fix -- les champs X min/max et Y min/max de l'outil Graphique ne mettaient pas à jour l'aperçu automatiquement (gestionnaire manquant, ajouté lors de la session précédente). Corrigé.",
  ]},
  { version:'2026-08-04.107', items:[
    "Outil Graphique -- trois améliorations : graduations chiffrées sur les deux axes (valeurs entières) ; mode « axe des x en radians » pour les fonctions trigonométriques, avec graduations en π/2, π, 3π/2... au lieu de décimaux ; bouton « 🔍 Cadrage auto » qui ajuste automatiquement les bornes X/Y pour bien cadrer les courbes tracées (d'après les valeurs réellement atteintes par les fonctions, et les points des droites).",
  ]},
  { version:'2026-08-04.106', items:[
    "Éditeur de formule -- fix de la puissance : un « + » parasite apparaissait entre la base et l'exposant (base était resté une séquence complète par erreur), et l'exposant chevauchait la base. Corrigé : base simple, exposant correctement positionné en haut à droite, sans chevauchement. Nouvelle structure Indice (x₂), positionnée en bas à droite, pour les suites (uₙ) et notations indexées.",
  ]},
  { version:'2026-08-04.105', items:[
    "Éditeur de formule -- il était impossible d'écrire un mélange texte+structure dans une même case (ex. lim(3x + 1/x) : « 3x+ » puis une fraction). Les cases principales (expression d'une somme/limite/intégrale, numérateur, dénominateur, contenu d'une racine) acceptent maintenant plusieurs éléments à la suite, via un petit « + » ; les bornes/variables/exposants restent une case unique, plus rarement composées.",
  ]},
  { version:'2026-08-04.104', items:[
    "Fix + refonte de l'éditeur de formule -- le bouton ✕ ne fonctionnait pas du tout (bug de chemin dans l'arbre, corrigé) et l'affichage était confus (trop de boutons + dispersés, cases vides sans explication). Simplifié : chaque emplacement est maintenant une case unique (texte ou structure imbriquée), chaque structure apparaît dans un encadré clair pour bien la distinguer, et les cases vides superflues ont disparu.",
  ]},
  { version:'2026-08-04.103', items:[
    "Nouveau : Éditeur de formule pas à pas (bouton 🧮 dans l'outil Texte), en remplacement des raccourcis texte Σ/lim/∫ qui butaient sans cesse sur les imbrications complexes. Cliquer sur Fraction, Puissance, Racine, Somme, Intégrale ou Limite fait apparaître une structure à cases vides ; cliquer dans une case puis choisir un symbole y imbrique une nouvelle structure, sans limite de profondeur (ex. une fraction dans le dénominateur d'une autre fraction, comme pour le taux d'accroissement). Comme c'est une vraie structure (et non plus du texte à analyser après coup), le résultat est fiable quelle que soit la complexité.",
  ]},
  { version:'2026-08-04.102', items:[
    "Fix -- f(x+3)/x (et toute fraction avec un appel de fonction d'un côté) n'était pas reconnue en dehors de sqrt(). Ajouté au texte libre général, en réordonnant pour ne pas casser les fractions décimales (3.5/4 restait coupé en deux avant ce correctif).",
  ]},
  { version:'2026-08-04.101', items:[
    "Changement d'approche pour Σ/lim/∫ -- la syntaxe simplifiée (somme(...), lim(...), integrale(...)) analysée par expressions régulières ne pouvait pas gérer une imbrication arbitraire (parenthèses dans parenthèses), quel que soit le nombre de correctifs. Les 3 boutons insèrent maintenant du LaTeX réel directement (entre $...$), modifiable librement : n'importe quelle complexité (fractions imbriquées, plusieurs fonctions...) fonctionne de façon fiable, puisque c'est KaTeX lui-même (un vrai analyseur) qui l'interprète, plus une approximation par regex.",
  ]},
  { version:'2026-08-04.100', items:[
    "Fix -- dans lim(x,0,f(x)/x), le \"f(x)/x\" restait affiché avec un simple slash au lieu d'une vraie fraction (la reconnaissance ne gérait que lettres/chiffres, pas un appel de fonction comme f(x)). Étendu pour reconnaître aussi ce cas, des deux côtés de la fraction.",
  ]},
  { version:'2026-08-04.99', items:[
    "Fix -- somme/lim/intégrale n'interprétaient qu'un seul niveau de parenthèses imbriquées dans l'expression, ce qui bloquait des écritures comme lim(x,0,(f(x+h)-f(x))/x) (taux d'accroissement). Étendu à deux niveaux. Boutons Σ/lim/∫ de l'outil Texte simplifiés pour n'afficher que le symbole, sans texte superflu.",
  ]},
  { version:'2026-08-04.98', items:[
    "Fix -- dans lim(x,0,f(x)), le « x→0 » s'affiche maintenant bien en dessous de « lim » (comme pour Σ et ∫), au lieu d'à côté.",
  ]},
  { version:'2026-08-04.97', items:[
    "Fix -- le plafonnement des courbes (fix précédent) créait des lignes plates disgracieuses en haut/bas du cadre, plus moche que le débordement d'origine. Remplacé par un arrêt net et naturel du tracé dès qu'il sort de la zone visible (comme sur une calculatrice graphique), avec davantage de points calculés pour un arrêt précis au plus près du bord.",
  ]},
  { version:'2026-08-04.96', items:[
    "Fix définitif -- la courbe débordait toujours du cadre dans le module évaluation (le clip-path seul ne suffisait pas de façon fiable une fois le bloc redimensionné). Correction en deux temps : le SVG garde maintenant ses proportions correctement (height:auto, manquant) et chaque point du tracé est directement plafonné aux limites du cadre -- une fonction très pentue s'aplatit proprement en haut/bas au lieu de dépasser, quelle que soit la taille du bloc.",
  ]},
  { version:'2026-08-04.95', items:[
    "Fix -- l'outil Graphique laissait une courbe déborder visuellement du cadre (ex. une parabole assez raide). Ajout d'un découpage (clip-path) : plus rien ne peut jamais dépasser visuellement des bords du graphique, quelle que soit la fonction tracée.",
  ]},
  { version:'2026-08-04.94', items:[
    "Nouvel outil « Graphique » : trace une ou plusieurs courbes sur le même repère, au choix par deux points (droite, prolongée automatiquement sur toute la largeur) ou par l'expression d'une fonction (ex. x^2-3, 2x+1, sqrt(x)), avec les mêmes conventions d'écriture que le reste du site. Chaque courbe a sa propre couleur, axes et bornes paramétrables. Disponible dans l'outil de correction et les exercices d'évaluation, comme les autres figures.",
  ]},
  { version:'2026-08-04.93', items:[
    "Icônes de la barre d'outils remplacées par des tracés en trait fin, monochromes (crayon, triangle, grille, division, axes, demi-cercle, cube) -- plus sobres et professionnelles que les émojis précédents (notamment le 🥧 pour les fractions, jugé trop enfantin).",
  ]},
  { version:'2026-08-04.92', items:[
    "Barre d'outils allégée (outil de correction et exercices d'évaluation) : 7 icônes compactes au lieu de 10 boutons avec texte. Les outils proches sont regroupés sous des onglets dans la même fenêtre : Division (Euclidienne / Décimale), Axe & Repère, Fraction visuelle (Disque / Rectangle) -- plus besoin de chercher parmi une longue liste, et l'ensemble prend beaucoup moins de place à l'écran.",
  ]},
  { version:'2026-08-04.91', items:[
    "Nouvel outil « 🧊 Cubes empilés » (perspective cavalière) : deux cubes placés par défaut, clic pour sélectionner un cube puis flèches pour le déplacer (gauche/droite, haut/bas, avant/arrière), boutons pour en ajouter ou en retirer. Occlusion gérée automatiquement (un cube devant en cache correctement un derrière). Disponible dans l'outil de correction et dans les exercices d'évaluation, comme les autres figures.",
  ]},
  { version:'2026-08-04.90', items:[
    "Fix -- la légende sous les disques et rectangles fractionnés (ex. « 3/4 ») était en texte brut au lieu d'une vraie fraction LaTeX. Corrigé pour les deux, y compris le message « Colorie X/Y » en mode vierge.",
  ]},
  { version:'2026-08-04.89', items:[
    "Rectangle fractionné (évaluation) -- l'aperçu devient cliquable : on choisit directement les cases à colorier (bandes ou grille), au lieu de taper un nombre qui colorie toujours les premières dans l'ordre. Le nombre de parts colorées se met à jour automatiquement, et le motif précis choisi est conservé dans le rendu final (aperçu, PDF). Disponible pour les fractions propres en une seule forme ; les fractions impropres (plusieurs rectangles) gardent le remplissage séquentiel habituel.",
  ]},
  { version:'2026-08-04.88', items:[
    "Rectangle fractionné (évaluation) -- même traitement que les disques : synchronisation automatique de la taille entre plusieurs rectangles d'un même exercice, et réglage manuel de taille dédié (« ▭ Taille des rectangles »). Nouveau : partage en grille (lignes × colonnes à la fois), pédagogiquement plus parlant qu'un partage à sens unique pour un dénominateur composé -- ex. 4/6 vu comme une grille 2×3, montrant clairement les deux facteurs du dénominateur.",
  ]},
  { version:'2026-08-04.87', items:[
    "Nouveau bouton « 💡 Suggérer une amélioration pour ce module » directement dans chaque chapitre (Cours, Méthode, Exercices, Quiz, Histoire), visible pour les profs et admin. Réutilise le système de signalement existant, en pré-remplissant automatiquement le niveau, le chapitre et le module concernés -- plus besoin de les ressaisir à la main. Les suggestions apparaissent avec un badge distinct des bugs dans la liste de suivi (Administration).",
  ]},
  { version:'2026-08-04.86', items:[
    "Fix majeur -- délai au chargement de la page (menu inaccessible) : le très gros script du site était écrit directement dans la page, ce qui obligeait KaTeX et Supabase à se charger de façon bloquante avant que quoi que ce soit d'autre (y compris le menu) ne puisse s'afficher. Le script a été extrait dans un fichier séparé (app.js), ce qui permet enfin de tout charger en parallèle sans bloquer l'affichage. Gain mesuré : le menu devient utilisable environ 2 fois plus vite. Tout le site a été retesté en profondeur (outils, chapitres, évaluation, PDF, administration) pour s'assurer qu'aucun comportement n'a changé.",
  ]},
  { version:'2026-08-04.85', items:[
    "Délai au chargement -- ajout de préconnexions réseau vers les CDN utilisés (KaTeX, Supabase), et chargement du CSS du site en priorité : gain modeste et sans risque. La vraie cause reste que KaTeX et Supabase se chargent en mode bloquant avant le reste de la page (nécessaire pour l'instant, car le script principal en dépend immédiatement) -- un vrai correctif demanderait de séparer ce script dans un fichier à part, chantier plus important prévu pour une prochaine session dédiée.",
  ]},
  { version:'2026-08-04.84', items:[
    "Fix -- les fractions à l'intérieur d'une somme/limite/intégrale (ex. le 1/x dans lim(x,0,1/x)) n'étaient pas reconnues, elles restaient en texte brut : corrigé (bénéficie aussi à sqrt(2/3)). Somme et intégrale : les bornes se placent maintenant au-dessus/en-dessous du symbole (style manuel), au lieu d'un style condensé mal positionné.",
  ]},
  { version:'2026-08-04.83', items:[
    "Fix -- les fractions dans les consignes d'axe/repère (ex. « Place les points A(2/5) ») s'affichent maintenant en vraie écriture LaTeX, pas en texte brut. Nouvelles écritures simplifiées dans l'outil Texte : somme(n,1,10,n), lim(x,0,f(x)), integrale(0,1,f(x),x) se mettent en forme automatiquement (comme les fractions a/b), avec 3 boutons Σ/lim/∫ qui insèrent un modèle prêt à compléter.",
  ]},
  { version:'2026-08-04.82', items:[
    "Axes et repères -- les graduations et les consignes utilisent maintenant la virgule décimale française (plus de point). Un point donné sous forme fractionnaire (ex. A(2/5)) est réécrit sous cette même forme dans la consigne « Place les points... », plus jamais converti en décimal. Taille par défaut adaptée à leur forme naturellement plus large (n'apparaissent plus minuscules pendant l'édition, avant validation).",
  ]},
  { version:'2026-08-04.81', items:[
    "Partage d'évaluation -- distinction éditeur (✏️, peut modifier) / lecteur (👁️, peut seulement consulter et imprimer), avec possibilité de retirer un partage. Le propriétaire reste seul habilité à supprimer l'évaluation, quel que soit le rôle des autres (déjà garanti côté base de données, vérifié). « Mes évaluations » indique maintenant le rôle sur les évaluations partagées.",
  ]},
  { version:'2026-08-04.80', items:[
    "Créer une évaluation -- nouvelles modales propres (remplacent les alert/confirm/prompt natifs du navigateur, au rendu daté) pour toutes les boîtes de dialogue du module. Supervision déplacé dans le menu Outils prof. Vue compacte (après validation) : le bouton Supprimer a été retiré (accessible seulement en repassant par Éditer, pour éviter une suppression accidentelle), et les flèches ↑/↓ y sont désormais disponibles pour réordonner sans avoir à éditer. Exercice à plusieurs colonnes : 4 boutons par cellule permettent de choisir quels bords apparaissent (haut/droite/bas/gauche), un peu comme un éditeur de tableau -- appliqué dans l'aperçu et le PDF.",
  ]},
  { version:'2026-08-04.79', items:[
    "Créer une évaluation -- le champ « Nombre d'exercices » n'apparaît plus que si « Laisser l'IA proposer des exercices » est coché (inutile sinon). Le bouton Imprimer avertit désormais si la classe et/ou la date n'ont pas été renseignées, avec possibilité de continuer quand même.",
  ]},
  { version:'2026-08-04.78', items:[
    "Créer une évaluation -- nouveau bouton « ✓ Valider » par exercice : bascule vers une vue épurée montrant uniquement le résultat final (tel qu'il sera imprimé), sans aucun des outils/menus d'édition. Deux boutons restent disponibles sur cette vue : ✏️ Éditer (pour revenir à l'édition complète) et ✕ Supprimer.",
  ]},
  { version:'2026-08-04.77', items:[
    "Créer une évaluation -- retrait de la zone de saisie principale de chaque exercice (devenue redondante avec l'outil Texte) : il n'y a désormais plus qu'une seule façon d'ajouter du contenu, via les blocs. La première ligne (par défaut, 1 colonne) affiche maintenant son encart en pointillés comme les autres, pour qu'on voie où déposer/ajouter du contenu dès le départ. Les anciennes évaluations sauvegardées et les énoncés générés par IA sont automatiquement convertis en bloc texte, rien n'est perdu.",
  ]},
  { version:'2026-08-04.76', items:[
    "Fix -- délai avant que les menus ne répondent au chargement de la page : la bibliothèque PDF (html2pdf, assez lourde) se chargeait de façon bloquante avant que le reste de la page ne devienne utilisable, alors qu'elle n'est nécessaire qu'au moment où on clique sur un bouton d'export -- jamais avant. Chargement différé (defer), sans risque puisqu'une vérification de disponibilité existait déjà avant chaque utilisation.",
  ]},
  { version:'2026-08-04.75', items:[
    "Créer une évaluation -- fix définitif disques désynchronisés à l'impression : le contenu de la fenêtre d'impression n'était pas contraint à la largeur réelle de la page A4, donc la mise en page (et la synchronisation des disques, mesurée avant impression) ne correspondait plus une fois sur le papier. Contenu maintenant contraint à 680px (largeur imprimable exacte). Mise en page multi-lignes : chaque exercice peut désormais avoir plusieurs lignes indépendantes, chacune avec son propre nombre de colonnes (ex. 3 colonnes puis 2 en dessous). Réorganisation des exercices avec les flèches ↑/↓. L'aperçu du texte principal ne s'affiche plus vide (réduit le doublon visuel avec l'outil Texte).",
  ]},
  { version:'2026-08-04.74', items:[
    "Créer une évaluation -- fix PDF blanc : retour à l'impression native (le téléchargement direct produisait une page blanche de façon répétée, malgré plusieurs correctifs). Bouton renommé « Imprimer / Enregistrer en PDF » pour que le fonctionnement soit clair. Nouveau champ « Type » pour personnaliser le titre de la feuille (Évaluation, Interrogation, Devoir Maison, Devoir Surveillé, Bac Blanc, ou titre libre), mémorisé avec l'évaluation sauvegardée.",
  ]},
  { version:'2026-08-04.73', items:[
    "Créer une évaluation -- retour au téléchargement PDF direct (comme le reste du site), abandon de la fenêtre d'impression séparée qui semblait geler le reste de la page chez certains utilisateurs. Combine les corrections apprises entre-temps : conteneur en position:absolute (mesure de hauteur fiable), figures SVG converties en images avant capture (html2canvas gère mal les SVG natifs), et synchronisation des disques effectuée dans le même document (plus simple et fiable qu'une fenêtre séparée).",
  ]},
  { version:'2026-08-04.72', items:[
    "Tentative supplémentaire -- disques désynchronisés en impression : certains navigateurs figent le rendu dès l'appel à print(), potentiellement avant que le style qu'on vient de modifier (taille des disques) n'ait été repeint à l'écran. Ajout d'un double requestAnimationFrame pour garantir un cycle de rendu complet avant d'imprimer.",
  ]},
  { version:'2026-08-04.71', items:[
    "Fix définitif -- les disques n'avaient pas la même taille entre l'aperçu et le PDF : la mesure se faisait juste après l'ouverture de la modale, avant que sa mise en page (fraîchement rendue visible) ne soit stabilisée, faussant le calcul. Déplacée après stabilisation (même délai que les repères de saut de page). Testé avec 4 disques différents dans le même exercice : taille identique partout, aperçu comme PDF.",
  ]},
  { version:'2026-08-04.70', items:[
    "Fractions -- passage de \\frac à \\dfrac dans la mise en forme automatique : le numérateur et le dénominateur s'affichent maintenant à taille normale (avant, ils étaient plus petits que le reste du texte, ex. dans « 1 + 3/4 »). Fenêtre de projection : la taille des fractions était encore réglée sur une ancienne valeur, différente du reste du site -- harmonisée. Rappel : un bloc déjà inséré (division, etc.) garde le rendu qu'il avait au moment de l'insertion -- il faut le supprimer et le réinsérer pour qu'il profite des dernières corrections.",
  ]},
  { version:'2026-08-04.69', items:[
    "Fix -- fractions trop petites (à l'écran et en PDF) : taille augmentée, et surtout la fenêtre d'impression n'avait pas la même correction de taille que le reste du site (c'était la vraie cause de la différence de mise en page entre aperçu et PDF) -- harmonisé. Division vierge : ne montre plus du tout le signe moins ni les traits de soustraction (juste l'espace anticipé, sans aucun indice). La barre horizontale sous le diviseur touche maintenant la barre verticale.",
  ]},
  { version:'2026-08-04.68', items:[
    "Fix critique -- le partage d'évaluation échouait (\"column reference id is ambiguous\") : corrigé côté base de données. Nouvelle modale complète d'édition d'un professeur (Administration) : nom, prénom, identifiant, mot de passe (masqué, réinitialisable), UAI, et classes rattachées à l'établissement (à cocher). Réponses à compléter (disque/rectangle) : vraie barre de fraction visuelle au lieu d'un simple « / ». Nouvel outil « ✏️ Texte » : permet d'écrire du texte/maths avec la même mise en forme automatique que l'énoncé principal, y compris dans les colonnes d'un exercice.",
  ]},
  { version:'2026-08-04.67', items:[
    "Créer une évaluation -- gros lot : (1) UAI de l'établissement renseignable à la création d'un compte prof (admin) ; (2) partage d'une évaluation avec liste des collègues de la même UAI (avec indication de qui est déjà partagé), plutôt qu'un simple e-mail à taper ; (3) le titre du dernier enregistrement est proposé par défaut à la sauvegarde suivante ; (4) disque et rectangle fractionnés : ligne de réponse à compléter en dessous (forme simple .../.... ou avec partie entière ... + .../....) ; (5) division posée (entière et décimale) : option pour n'afficher que dividende et diviseur, avec la hauteur de la barre correctement anticipée sur le nombre d'étapes réel ; (6) axe gradué et repère : choix entre « lire » (points déjà placés) et « placer » (points à tracer par l'élève, consigne donnée séparément). Tentative de fix supplémentaire sur la synchronisation des disques en impression (léger délai de sécurité avant mesure).",
  ]},
  { version:'2026-08-04.66', items:[
    "Fix critique -- la synchronisation des disques ne fonctionnait plus du tout : du code de mes tentatives précédentes s'était mélangé par erreur, supprimant silencieusement la fonction responsable (aucun message d'erreur visible sur le site, seulement en console). Entièrement réparé et re-testé. Ajout d'un réglage manuel « 🥧 Taille des disques » par exercice (visible dès qu'il y a au moins un disque) : plus fiable que la synchronisation automatique, il s'applique directement dans tous les contextes (édition, aperçu, PDF).",
  ]},
  { version:'2026-08-04.65', items:[
    "Fix -- les disques n'étaient toujours pas de la même taille dans le PDF : ma tentative précédente prédisait une taille à l'avance (calcul supposant une largeur fixe), qui ne correspondait pas à la largeur réelle des colonnes dans ce contexte. Corrigé en mesurant directement, depuis le script principal, le rendu réel de la fenêtre d'impression elle-même (accessible sans qu'elle ait besoin d'exécuter quoi que ce soit) -- fiable quel que soit le nombre de colonnes choisi.",
  ]},
  { version:'2026-08-04.64', items:[
    "Fix -- les disques n'avaient pas la même taille dans la fenêtre d'impression (PDF) : la synchronisation ajustait le DOM en direct, mais cette fenêtre est une page neuve qui ne peut pas exécuter ce script. Le diamètre synchronisé est désormais mémorisé et intégré directement dans le HTML généré, quel que soit le contexte (édition, aperçu, impression).",
  ]},
  { version:'2026-08-04.63', items:[
    "Créer une évaluation -- refonte du PDF : abandon de la capture d'écran (peu fiable avec ce contenu) au profit de l'impression native du navigateur dans une fenêtre dédiée (choisir « Enregistrer en PDF » comme imprimante). La synchronisation de la taille des disques s'applique désormais aussi dans l'aperçu, pas seulement pendant l'édition. Nouveau : sauvegarde de l'évaluation (bouton 💾), liste « Mes évaluations » pour la retrouver, et partage avec un collègue par e-mail (accès en lecture/écriture partagé).",
  ]},
  { version:'2026-08-04.62', items:[
    "Fix -- le PDF d'évaluation affichait l'en-tête écrasé vers le centre de la page et les exercices n'apparaissaient pas du tout : la technique de dissimulation (position:fixed) limitait la mesure du contenu à la hauteur de la fenêtre visible. Remplacée par position:absolute, qui mesure la hauteur réelle et complète du contenu. Les disques d'un même exercice s'harmonisent maintenant automatiquement sur le plus petit diamètre nécessaire, pour un rendu cohérent quand plusieurs blocs disque coexistent.",
  ]},
  { version:'2026-08-04.61', items:[
    "Fix -- le PDF d'évaluation restait blanc : la combinaison précédente (rendu foreignObject + astuce de dissimulation par hauteur nulle) empêchait tout rendu. Corrigé : dissimulation par décalage hors-écran, et chaque figure SVG est désormais convertie en image avant capture (plus fiable). Disque et rectangle fractionnés : nouvelle case pour afficher ou masquer la fraction en légende, et leur taille est maintenant plafonnée (ils ne s'étirent plus sur toute la largeur disponible), en s'adaptant à l'espace choisi pour les fractions à plusieurs formes. Aperçu de l'évaluation : renommé, proportions identiques au PDF (largeur 700px), et repères visuels de saut de page.",
  ]},
  { version:'2026-08-04.60', items:[
    "Créer une évaluation -- nombre de colonnes libre (jusqu'à 8, au lieu de 3 fixes). Les blocs insérés (figures, disques...) sont désormais redimensionnables à la souris (poignée en bas à droite), taille conservée dans l'aperçu et l'export. Nouvel en-tête de la feuille d'évaluation : classe(s) en haut à gauche, date en haut à droite, titre « Évaluation de Mathématiques » centré, puis NOM/Prénom, puis un cadre libre de 3 cm.",
  ]},
  { version:'2026-08-04.59', items:[
    "Créer une évaluation -- 4 améliorations : (1) chapitres et question de cours n'apparaissent que si on active « Laisser l'IA proposer des exercices » ; (2) chaque exercice a maintenant un titre et un barème, avec un total calculé automatiquement ; (3) possibilité d'organiser un exercice en 2 ou 3 colonnes, avec glisser-déposer pour placer une figure/un axe/un disque à côté du texte ; (4) bouton « Aperçu de l'évaluation » ouvrant la feuille complète en fenêtre modale.",
  ]},
  { version:'2026-08-04.58', items:[
    "Tentative de fix -- PDF (évaluation, cahier, cours) toujours blanc malgré les dimensions explicites sur les SVG : la bibliothèque de capture (html2canvas) a un support limité des SVG en mode par défaut. Activé le rendu par foreignObject (plus fidèle pour ce type de contenu) sur les 3 exports PDF. À confirmer par un nouveau test -- si le problème persiste, la piste suivante sera de convertir les figures en image avant capture.",
  ]},
  { version:'2026-08-04.57', items:[
    "Fix -- l'axe gradué (et les autres figures SVG) n'apparaissaient pas dans le PDF : ajout de dimensions explicites (width/height), en plus du viewBox, pour une capture fiable. Axe gradué : nouveau champ « Partager chaque unité en » pour paramétrer la subdivision d'un axe VIERGE (sans point), utile pour que les élèves y placent eux-mêmes des fractions. Disque et rectangle fractionnés : nouvelle case « Laisser vierge » -- affiche la forme entièrement blanche avec la consigne (\"Colorie 5/6\"), pour que l'élève colorie lui-même au lieu d'avoir la réponse déjà coloriée.",
  ]},
  { version:'2026-08-04.56', items:[
    "Créer une évaluation -- fix : le PDF restait blanc (le conteneur n'était jamais ajouté à la page, nécessaire pour la capture). Corrigé avec la même méthode éprouvée que le cahier de corrections. Chaque exercice dispose désormais des 7 mêmes outils que l'outil de correction (figure, tableau, division posée, division décimale, axe gradué, repère, disque et rectangle fractionnés), avec leurs propres boutons modifier/supprimer -- ces outils sont maintenant partagés entre les deux pages plutôt que propres à l'outil de correction.",
  ]},
  { version:'2026-08-04.55', items:[
    "Réorganisation du menu -- « Automatismes » et « Le compte est bon » sont regroupés sous S'entraîner ; « Outil prof » devient Outils prof, avec Outil de correction (cahier) et une toute nouvelle Créer une évaluation. Cette dernière (première version) : cadrage de l'évaluation (niveau, chapitres, date, durée, nombre d'exercices, question de cours optionnelle), génération des énoncés par IA ou ajout manuel, aperçu avec la même mise en forme automatique que l'outil de correction, export en PDF prêt à distribuer. Les ajouts (figures, tableaux, divisions...) et la mise en page multi-colonnes par exercice suivront dans une prochaine session.",
  ]},
  { version:'2026-08-04.54', items:[
    "Outil de correction -- le repère affiche maintenant de vraies flèches au bout des deux axes, et le point origine est étiqueté « O ».",
  ]},
  { version:'2026-08-04.53', items:[
    "Outil de correction -- 3 corrections : (1) les barres verticales/horizontales de la division posée n'apparaissaient pas dans la fenêtre de projection (variable CSS var(--ink) indisponible dans ce document séparé) -- remplacée par une couleur directe ; (2) la division décimale n'affiche plus de texte avant/après (ni rappel du calcul, ni \"valeur exacte\"), juste le tableau posé ; (3) les axes acceptent maintenant les nombres mixtes du type A(1+1/4).",
  ]},
  { version:'2026-08-04.52', items:[
    "Outil de correction -- 4 corrections : (1) la barre verticale de la division posée descend maintenant sur toute la hauteur (elle s'arrêtait avant au niveau du diviseur), et le marqueur de virgule est beaucoup plus fin ; (2) l'axe gradué subdivise maintenant selon le PPCM des dénominateurs demandés (ex. 1/4 et 7/6 → douzièmes), au lieu du plus grand dénominateur seul ; (3) le texte d'aide de l'aperçu (\"L'aperçu de la correction...\") n'apparaît plus dans la fenêtre de projection ; (4) disque et rectangle fractionnés affichent plusieurs formes quand le numérateur dépasse le dénominateur (ex. 5/4 → un disque plein + un quart).",
  ]},
  { version:'2026-08-04.51', items:[
    "Fix -- Outil de correction, division décimale : le dividende n'acceptait pas la virgule décimale (champ number, qui la rejette silencieusement, et le calcul lui-même n'acceptait qu'un entier). Corrigé : un dividende comme 10,5 est maintenant accepté, avec la virgule marquée visuellement dans la division posée par un trait pointillé entre les colonnes concernées.",
  ]},
  { version:'2026-08-04.50', items:[
    "Outil de correction -- deux améliorations majeures : (1) la division décimale est maintenant posée en colonnes (dividende/diviseur/quotient), comme la division entière, plutôt qu'une liste de lignes de texte ; (2) chaque bloc ajouté (figure, tableau, division, axe, repère, disque, rectangle) est désormais indépendant, avec ses propres boutons ✏️ modifier et ✕ supprimer -- visibles uniquement côté professeur, jamais dans la fenêtre de projection.",
  ]},
  { version:'2026-08-04.49', items:[
    "Outil de correction -- fix division décimale : le calcul répétait la même ligne à l'identique pour un quotient non terminé (ex. 10÷3), au lieu de détecter le cycle infini ; corrigé, avec un message clair (\"le motif se répète indéfiniment\"). La première ligne inutile (chiffre seul insuffisant) est aussi retirée. Axe gradué et repère : nouvelle syntaxe des points avec parenthèses et virgule décimale -- A(2,5) sur l'axe (fractions possibles, ex. A(3/4), qui subdivise automatiquement la graduation), A(3,5;-2) dans le repère (x et y séparés par point-virgule).",
  ]},
  { version:'2026-08-04.48', items:[
    "Outil de correction -- 5 nouveaux ajouts, avec les mêmes garanties que les existants (générés automatiquement, transmis à la fenêtre de projection) : division décimale (poursuite après la virgule, exacte ou approchée), axe gradué (avec points nommés), repère orthonormé (avec points nommés), disque fractionné et rectangle fractionné (horizontal ou vertical). Fix au passage : la fenêtre de projection, à l'ouverture, ignorait le contenu joint (figures/tableaux/divisions) s'il n'y avait pas de texte tapé -- corrigé.",
  ]},
  { version:'2026-08-04.47', items:[
    "Fix -- Outil de correction : la lettre-variable n'était pas assez arrondie et le chiffre juste devant paraissait trop grand -- mélanger KaTeX (fractions) et une police italique maison (variables) donnait des tailles incohérentes. Les variables et coefficients passent maintenant par le même moteur KaTeX que les fractions (protégé de la même façon contre toute interférence), garantissant partout la même police, taille et graisse.",
  ]},
  { version:'2026-08-04.46', items:[
    "Fix -- Outil de correction : le chiffre devant une variable (ex. le 4 de \"4x\") apparaissait trop bas, décalé par rapport à la lettre. Cause : la police de secours (Cambria Math/Georgia) a des métriques différentes de la police du reste du texte, ce qui décale la ligne de base. Corrigé en gardant la police héritée du contexte (juste italique pour les variables), garantissant un alignement identique.",
  ]},
  { version:'2026-08-04.45', items:[
    "Fix -- Outil de correction : la fenêtre de projection mettait tout le texte en gras par défaut (pour la lisibilité à distance), y compris les calculs et expressions -- ce n'était pas voulu. Retiré : plus rien n'est en gras sauf choix explicite (**texte**). Le chiffre juste avant une variable (ex. le 4 de \"4x\") passe désormais aussi par la police mathématique, en poids normal, pour ne plus hériter du gras ambiant.",
  ]},
  { version:'2026-08-04.44', items:[
    "Fix -- Outil de correction : la lettre nommant une expression (ex. \"A = ...\") apparaissait grasse et épaisse dans la fenêtre de projection, en décalage avec la police plus fine des maths juste à côté. Cause : la fenêtre de projection met tout le texte en gras (font-weight:600) pour la lisibilité à distance, et cette lettre restait en texte normal au lieu de passer par la police mathématique. Les lettres majuscules isolées (A, B, E...) passent désormais par la même police italique arrondie que les variables, avec un poids de police normal explicite.",
  ]},
  { version:'2026-08-04.43', items:[
    "Fix -- Outil de correction : (5x+3x)/2 affichait du texte KaTeX interne illisible (ex. \"vlist-t2\"). Cause : la règle de mise en forme des variables repérait le x à l'intérieur du LaTeX déjà construit pour la fraction (\\frac{5x+3x}{2}) et y insérait une balise, cassant la syntaxe reçue par KaTeX. Chaque bloc fraction/racine/exposant/$...$ est désormais protégé par un jeton le temps du traitement, hors d'atteinte des règles suivantes.",
  ]},
  { version:'2026-08-04.42', items:[
    "Fix -- Outil de correction : 5x affichait un texte dupliqué et illisible. Deux causes corrigées : (1) KaTeX pouvait dupliquer visuellement le texte via sa balise d'accessibilité si sa feuille de style ne chargeait pas -- remplacé par un simple style italique robuste, sans dépendance externe ; (2) les deux règles (coefficient+variable, puis variable isolée) se recapturaient l'une l'autre -- fusionnées en une seule passe.",
  ]},
  { version:'2026-08-04.41', items:[
    "Fix -- Outil de correction : 5x (coefficient collé à une variable, sans opérateur) n'était pas mis en forme, faute de frontière de mot entre le chiffre et la lettre. Corrigé : ce cas passe désormais aussi par KaTeX, comme 3*x.",
  ]},
  { version:'2026-08-04.40', items:[
    "Outil de correction -- ajustements suite retour : le signe de multiplication revient à un simple × (ce n'était pas lui le problème) ; ce sont les lettres-variables isolées (x, y, z, n, k, t) qui passent maintenant par KaTeX, pour une police italique arrondie cohérente avec le chapitre Calcul littéral. La date apparaît désormais avant la référence d'exercice dans l'en-tête.",
  ]},
  { version:'2026-08-04.39', items:[
    "Outil de correction -- trois corrections : (1) le signe de multiplication est désormais un symbole SVG dédié aux extrémités arrondies, indépendant de toute police ou bibliothèque, nettement distinct de la lettre x (ex. 3×x) ; (2) la fenêtre de projection écrit désormais depuis le coin haut-gauche au lieu d'être centrée ; (3) le titre, la référence d'exercice et la date renseignés par le professeur s'affichent désormais aussi pour les élèves, en en-tête de l'aperçu et de la fenêtre de projection.",
  ]},
  { version:'2026-08-04.38', items:[
    "Outil de correction -- le mode projection ouvre désormais une vraie fenêtre de navigateur séparée (plutôt qu'un simple agrandissement dans la page) : à faire glisser sur un second écran ou un vidéoprojecteur, librement redimensionnable, et synchronisée en direct pendant la saisie. Seule la correction y est affichée, jamais l'outil de saisie -- idéal pour ne projeter que le contenu aux élèves.",
  ]},
  { version:'2026-08-04.37', items:[
    "Outil de correction -- le signe de multiplication (ex. 3*x) passe maintenant par le même rendu KaTeX que le reste des maths de l'outil, au lieu d'un simple caractère × en police normale qui pouvait se confondre avec la lettre x (notamment devant une inconnue, comme dans 3*x).",
  ]},
  { version:'2026-08-04.36', items:[
    "Fix -- Outil de correction (projection) : un astérisque * tapé pour une multiplication en dehors d'une fraction, d'une racine ou d'un exposant restait affiché tel quel au lieu d'être converti en signe ×. Corrigé (testé sur multiplication seule, dans une fraction, et après du texte en gras).",
  ]},
  { version:'2026-08-04.35', items:[
    "Supervision -- ajout d'une section « 🎲 Le compte est bon » : pour chaque élève de la classe active, le taux de réussite en mode illimité et en mode chronométré, ainsi que les 5 dernières tentatives (exact ou à combien près, mode, date).",
  ]},
  { version:'2026-08-04.34', items:[
    "Le compte est bon -- les tentatives des élèves sont désormais enregistrées (nouvelle table Supabase ceb_results, mêmes règles de visibilité que les Automatismes : l'élève, son professeur, ou un administrateur). Un encart « Tes statistiques » affiche le nombre de tentatives et le taux de réussite, séparément en mode illimité et en mode chronométré, visible sur l'écran de réglages et après chaque partie.",
  ]},
  { version:'2026-08-04.33', items:[
    "Le compte est bon -- deux améliorations : un journal des étapes reste affiché en permanence (pendant la partie et sur l'écran de résultat), rien ne disparaît visuellement. L'expression finale utilise désormais un parenthésage minimal (comme un calcul écrit à la main), au lieu de parenthéser systématiquement chaque étape : vérifié mathématiquement sur 200 tirages générés, tous corrects.",
  ]},
  { version:'2026-08-04.32', items:[
    "Nouveau module « Le compte est bon » (accessible depuis le menu et la page d'accueil) : tirage de 6 nombres (petits 1-10, grands 25/50/75/100 en quantité réglable) et un compte entre 100 et 999, systématiquement vérifié réalisable exactement par un solveur avant d'être proposé. Chronomètre optionnel (30 s / 1 min / 1 min 30 / illimité). Le joueur combine les nombres deux par deux ; à la validation, le calcul est reconstitué automatiquement en une seule expression mathématique, comparée au compte, avec possibilité d'afficher une solution.",
  ]},
  { version:'2026-08-04.31', items:[
    "Mobile -- la barre d'onglets des chapitres (Cours/Méthode/Exercices/Quiz/Histoire) ne tenait plus sur la largeur d'un téléphone depuis l'ajout du 5e onglet. Elle est maintenant défilable horizontalement sur une seule ligne, plutôt que tassée ou coupée.",
  ]},
  { version:'2026-08-04.30', items:[
    "Les 11 chapitres restants ont maintenant leur encart « Un peu d'histoire » (tous les chapitres 6e et 5e en sont désormais dotés) : Nombres entiers (os de Lebombo, Sumériens), Opérations et ordre de grandeur (Archimède), Droites parallèles/perpendiculaires (5e postulat d'Euclide), Symétrie centrale (art préhistorique), Angles et parallélisme (géométries non euclidiennes), Droites remarquables (droite d'Euler), Parallélogrammes (Euclide), Parallélogrammes particuliers (tendeurs de corde égyptiens), Opérations sur les décimaux (Stevin), Opérations sur les relatifs (Brahmagupta), Fractions 5e (barre de fraction, al-Hassar puis Fibonacci).",
  ]},
  { version:'2026-08-04.29', items:[
    "Fix -- 6e Fractions : les fractions LaTeX (1/2, 1/7) de l'encart « Un peu d'histoire » s'affichaient en texte brut au lieu d'être rendues, car ce nouveau conteneur n'était pas inclus dans l'appel de rendu des formules. Corrigé.",
  ]},
  { version:'2026-08-04.28', items:[
    "Les touches d'histoire ont désormais leur propre onglet « 📜 Un peu d'histoire » dans les pages de chapitre (à côté de Cours, Méthode, Exercices, Quiz), plutôt que d'être mêlées au Cours. Les chapitres sans anecdote pour l'instant affichent un message d'attente à la place.",
  ]},
  { version:'2026-08-04.27', items:[
    "Nouveau : encart « Un peu d'histoire » (courte anecdote historique vérifiée par recherche, pas de mémoire) ajouté à 9 chapitres -- 6e : Fractions (Égypte), Nombres décimaux (Simon Stevin), Distance et cercles (Euclide), Angles et rapporteur (Babyloniens, Blundeville) ; 5e : Divisibilité (Ératosthène), Nombres relatifs (Chine, Brahmagupta), Calcul littéral et Équations (Al-Khwârizmî), Proportionnalité (Thalès). Les autres chapitres suivront dans une prochaine session.",
  ]},
  { version:'2026-08-04.26', items:[
    "6e -- N4 Opérations et ordre de grandeur, Méthode : ajout des définitions troncature / arrondi par défaut / arrondi par excès, avec un tableau comparatif sur le même nombre (8,6427) à trois rangs (unité, dixième, centième), montrant que l'arrondi \"classique\" correspond tantôt à l'arrondi par défaut, tantôt à l'arrondi par excès.",
  ]},
  { version:'2026-08-04.25', items:[
    "6e -- N4 Opérations et ordre de grandeur, Méthode : nouvelle méthode animée « Arrondir un nombre décimal », avec 2 exemples pas-à-pas -- 27,342 au dixième (cas simple) et 9,96 à l'unité (cas avec retenue, 9+1=10). Le chiffre repéré et le chiffre décisif sont mis en évidence dans le tableau de valeurs de position (orange/teal).",
  ]},
  { version:'2026-08-04.24', items:[
    "6e -- N4 Opérations et ordre de grandeur : retiré toute référence à \"gauche\"/\"droite\" pour décrire les décalages de chiffres (tableaux du Cours et méthodes animées), remplacée par le nom direct du nouveau rang (ex. \"le chiffre des unités devient le chiffre des centaines\"). Cette formulation spatiale était pénalisante pour les élèves qui ne distinguent pas encore bien leur gauche de leur droite.",
  ]},
  { version:'2026-08-04.23', items:[
    "6e -- N4 Opérations et ordre de grandeur, Méthode : deux nouvelles méthodes animées, basées sur le repérage du chiffre des unités plutôt qu'un simple décalage de virgule -- multiplier par 10/100/1000 (13,567 × 100, le chiffre des unités avance de rangs vers la gauche) et multiplier par 0,1/0,01/0,001 (24 × 0,1, il recule vers la droite), avec un tableau de valeurs de position où seuls les chiffres se déplacent, la virgule restant fixe entre les colonnes unités et dixièmes.",
  ]},
  { version:'2026-08-04.22', items:[
    "6e -- N4 Opérations et ordre de grandeur : corrige l'exemple « addition mal posée ». 12 s'écrit maintenant bien sans virgule, mais décalé (1 sur la colonne des unités, 2 sur celle des dixièmes) -- au lieu d'un « 1,2 » avec une virgule ajoutée à tort.",
  ]},
  { version:'2026-08-04.21', items:[
    "6e -- N4 Opérations et ordre de grandeur, paragraphe 1 : les additions/soustractions posées utilisaient un simple alignement à droite (text-align:right), qui ne garantit absolument pas l'alignement des virgules dès que les nombres n'ont pas le même nombre de décimales (« 12 » n'a pas de virgule et se retrouvait n'importe où). Reconstruit avec le même système de grille à colonnes absolues que la division, calé cette fois sur la virgule.",
  ]},
  { version:'2026-08-04.20', items:[
    "6e -- N4 Opérations et ordre de grandeur : correction de fond sur la division posée. Le reste (1, puis 2, puis 4) restait à tort affiché comme s'il glissait avec le chiffre abaissé ; il reste maintenant dans sa colonne d'origine (unités, dixièmes...) et chaque nouveau chiffre abaissé occupe la colonne suivante à droite, comme une vraie division posée en escalier.",
  ]},
  { version:'2026-08-04.19', items:[
    "6e -- N4 Opérations et ordre de grandeur : après vérification par mesure de pixels, l'alignement des chiffres était en fait correct (confirmé identique sur toutes les lignes), mais l'espace entre le dividende et la barre verticale était trop resserré pour paraître confortable. Espace nettement augmenté (à gauche et à droite du dividende).",
  ]},
  { version:'2026-08-04.18', items:[
    "Technique -- ajout d'un paramètre de version sur les 21 fichiers JavaScript de chapitres (et le module Automatismes) : les navigateurs, surtout mobiles, pouvaient continuer à servir une ancienne version en cache après une correction, comme ce fut le cas pour la division posée du chapitre N4 (6e) qui semblait ne \"rien avoir changé\" alors que le correctif était bien déployé.",
  ]},
  { version:'2026-08-04.17', items:[
    "6e -- N4 Opérations et ordre de grandeur : le signe moins des lignes de soustraction restait à une position fixe, créant un écart incohérent avec le chiffre selon qu'il s'agissait d'un nombre à 1 ou 2 chiffres (ex. « −　　8 » très espacé contre « − 56 » serré). Il colle maintenant systématiquement au premier chiffre significatif.",
  ]},
  { version:'2026-08-04.16', items:[
    "6e -- N4 Opérations et ordre de grandeur : corrige l'alignement de la division posée (57 ÷ 8). L'ancien système reposait sur des espaces insécables + police à chasse fixe, qui se désalignaient si la police web ne se chargeait pas. Remplacé par une grille à cellules de largeur fixe en pixels, alignée quelle que soit la police.",
  ]},
  { version:'2026-08-04.15', items:[
    "Navigation -- le fond du bouton de menu sélectionné (Accueil, 6e, 5e...) passe de noir à #0D5BA3.",
  ]},
  { version:'2026-08-04.14', items:[
    "Page d'accueil -- les vignettes 6e et 5e reprennent désormais exactement les mêmes couleurs de dominance que dans les pages de chapitre (orange pour la 6e, bleu pour la 5e) : le grand numéro et une bordure supérieure colorée, au lieu des couleurs de catégorie N/D utilisées auparavant.",
  ]},
  { version:'2026-08-04.13', items:[
    "Style -- le badge Définition prend sa propre couleur (#8A4210), distincte du teal désormais utilisé pour Règle/Propriété, en 6e comme en 5e.",
  ]},
  { version:'2026-08-04.12', items:[
    "Style -- les badges Propriété/Règle utilisent maintenant une couleur teal distincte (#26AAB1) universelle, plutôt que orange ou bleu selon le niveau, pour rester bien distincts du bandeau de titre de section.",
  ]},
  { version:'2026-08-04.11', items:[
    "Style -- en 5e, le bandeau de titre de section (ex. « 1 Vocabulaire des opérations ») et les badges Propriété/Règle passent du orange au bleu du logo, pour prolonger la dominance de couleur par niveau (orange 6e / bleu 5e).",
  ]},
  { version:'2026-08-04.10', items:[
    "Navigation mobile -- ajout d'un paramètre de version sur styles.css pour forcer les navigateurs (en particulier mobiles) à recharger la feuille de style plutôt que de servir une version en cache, ce qui empêchait la correction précédente du menu hamburger d'apparaître.",
  ]},
  { version:'2026-08-04.9', items:[
    "Navigation mobile -- corrige un bug d'ordre CSS qui empêchait le bouton hamburger de s'afficher (la règle générale display:none, placée après la media query, l'écrasait systématiquement).",
  ]},
  { version:'2026-08-04.8', items:[
    "Navigation mobile -- sur petit écran (≤720px), la liste des boutons de navigation est remplacée par un menu hamburger : elle se replie dans un panneau déroulant sous la barre, pour laisser la place au logo agrandi.",
  ]},
  { version:'2026-08-04.7', items:[
    "Pied de page -- \"Maquette de travail\" remplacé par \"Une production de L'Atelier Augmenté\", avec un lien vers www.latelieraugmente.fr.",
  ]},
  { version:'2026-08-04.6', items:[
    "Style -- le logo du hero (page d'accueil) était tronqué juste avant le slogan \"Apprendre, S'entraîner, Exceller\" ; il est maintenant recadré pour inclure l'intégralité du logo, slogan compris.",
  ]},
  { version:'2026-08-04.5', items:[
    "Style -- utilisation de la version horizontale du logo (icône + texte côte à côte) dans la barre de navigation, fond rendu transparent, taille augmentée à 52px : le nom complet \"L'Atelier des Maths\" est de nouveau lisible directement dans le logo.",
  ]},
  { version:'2026-08-04.4', items:[
    "Style -- le logo dans la barre de navigation est agrandi, transparent (fond retiré), et le texte redondant à côté a été supprimé. Le logo complet (icône + texte) est désormais affiché en grand dans le hero de la page d'accueil. Dominance de couleur par niveau : les pages de chapitre en 6e sont désormais dominées par l'orange, celles en 5e par le bleu (issus de la palette du logo), sur les onglets actifs et les boutons.",
    "Page d'accueil -- \"Automatismes\" et \"Frise de progression\" sortent de la grille \"Ce que propose chaque chapitre\" et ont chacun leur propre section. La section \"Aperçu : chapitres traités en entier\" est supprimée.",
    "Frise de progression -- en mode \"Frise de l'année\", chaque chapitre déjà passé (d'après sa date de fin et la date du jour) affiche une coche verte de validation.",
  ]},
  { version:'2026-08-04.3', items:[
    "Style -- recadrage du logo dans la barre de navigation corrigé (marge confortable autour de l'icône, plus rien de coupé). Couleur de fond du site alignée exactement sur celle du logo (#FDF9F6). Page d'accueil : le titre \"Les mathématiques, en clair et en gestes.\" est remplacé par \"L'Atelier des Maths\".",
  ]},
  { version:'2026-08-04.2', items:[
    "Style général -- le logo « L'Atelier des Maths » (compas, fraction, engrenage/ampoule, rapporteur) remplace l'icône de la barre de navigation. Les couleurs d'accent du site (--accent, --accent-orange) sont mises à jour pour se rapprocher de la palette vive du logo (bleu #0C5BA0, orange #FF8208), avec deux nouvelles variables disponibles (--accent-teal, --accent-yellow) pour les prochains éléments visuels.",
  ]},
  { version:'2026-08-04.1', items:[
    "Nouveau chapitre 6e -- N4 Opérations et ordre de grandeur : Cours complet (addition/soustraction de décimaux, multiplication/division par 10-100-1000, multiplication de deux décimaux, division d'un décimal par un entier avec division posée interactive inspirée de la division euclidienne du chapitre Nombres entiers), 5 exercices et un quiz. La partie Méthode suivra dans une prochaine session.",
  ]},
  { version:'2026-08-03.26', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : figures à main levée -- le rectangle code maintenant les 2 diagonales égales se coupant en leur milieu (au lieu des angles droits), avec chaque demi-diagonale étiquetée 1,7 cm. Le losange étiquette chaque demi-diagonale (1,8 cm, 1,8 cm, 1 cm, 1 cm) plutôt que la diagonale entière une seule fois.",
  ]},
  { version:'2026-08-03.25', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : la figure à main levée du losange codait à tort l'égalité des 4 côtés (propriété non utilisée dans cette construction) ; elle code maintenant que les diagonales se coupent en leur milieu O (traits sur OA=OC et OB=OD, angle droit en O), conformément à la méthode réellement employée.",
  ]},
  { version:'2026-08-03.24', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : dans les 2 constructions, l'étape de report au compas (arcs de cercle localisant C et D pour le rectangle, B et D pour le losange) est désormais une étape à part entière, affichée avant le tracé des côtés correspondants (qui devient une 5e étape séparée).",
  ]},
  { version:'2026-08-03.23', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : les figures à main levée sont maintenant vraiment tracées à main levée (traits ondulés, quadrilatère volontairement imprécis) plutôt que de reprendre les points exacts de la construction. Figure de construction du rectangle agrandie, arcs de cercle réduits. Codage des 4 demi-diagonales du rectangle uniformisé (elles sont toutes égales, le codage à 1/2 traits était incohérent). Ajout des arcs de compas manquants lors des reports de longueur (rectangle : report de OA et OB ; losange : report de 1 cm de part et d'autre de O).",
  ]},
  { version:'2026-08-03.22', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : corrigé un bug (angle passé en degrés à une fonction attendant des radians) qui empêchait les arcs de cercle de se croiser correctement, dans les 2 constructions. Ajout d'une figure à main levée avant chaque construction, avec le codage des données de l'énoncé. La construction du rectangle utilise maintenant les demi-droites [AO)/[BO) et un report de longueur pour C et D, plutôt qu'un cercle complet.",
  ]},
  { version:'2026-08-03.21', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : ajout des 2 constructions pas-à-pas -- rectangle ABCD de centre O (diagonales 3,4 cm, AB = 3 cm) par la propriété du cercle circonscrit, et losange ABCD de centre O (AC = 3,6 cm, BD = 2 cm) par la médiatrice de [AC].",
  ]},
  { version:'2026-08-03.20', items:[
    "5e -- G5 Parallélogrammes particuliers, utilitaire quadrilatère : corrigé une incohérence -- « diagonales qui se coupent en leur milieu » + « deux paires de côtés consécutifs égaux » cochées ensemble donnaient « Parallélogramme » avec un codage 1 trait/2 traits contradictoire (les 2 propriétés impliquent en réalité que les 4 côtés sont égaux). Donne maintenant « Losange », avec un codage uniforme sur les 4 côtés.",
  ]},
  { version:'2026-08-03.19', items:[
    "5e -- G5 Parallélogrammes particuliers, utilitaire quadrilatère : la figure code maintenant chaque propriété individuellement cochée (diagonales tracées et codées dès qu'une propriété de diagonale est cochée, côtés codés dès qu'une propriété de côté est cochée, angle droit affiché, notation de parallélisme), pas seulement la classification finale.",
  ]},
  { version:'2026-08-03.18', items:[
    "5e -- G5 Parallélogrammes particuliers, utilitaire quadrilatère : une figure représentative s'affiche désormais et se met à jour en direct selon la classification trouvée (quelconque, trapèze, cerf-volant, parallélogramme, rectangle, losange, carré).",
  ]},
  { version:'2026-08-03.17', items:[
    "5e -- G5 Parallélogrammes particuliers, utilitaire quadrilatère : retour en arrière -- « Diagonales perpendiculaires » seule ne donne plus « Cerf-volant » (mathématiquement pas suffisant en général) ; seule la propriété dédiée (deux paires de côtés consécutifs égaux) déclenche cette classification.",
  ]},
  { version:'2026-08-03.16', items:[
    "5e -- G5 Parallélogrammes particuliers, utilitaire quadrilatère : « Diagonales perpendiculaires » cochée seule (sans propriété de parallélogramme) donne maintenant « Cerf-volant », au lieu de « Quelconque ».",
  ]},
  { version:'2026-08-03.15', items:[
    "5e -- G5 Parallélogrammes particuliers, Méthode : nouvel utilitaire « Quel est ce quadrilatère ? » -- on coche les propriétés vérifiées (diagonales perpendiculaires, côtés consécutifs égaux, diagonales égales, diagonales qui se coupent en leur milieu, côtés opposés parallèles, un angle droit, cerf-volant) et l'outil affiche le nom le plus précis correspondant (quelconque, trapèze, cerf-volant, parallélogramme, rectangle, losange, carré). Les constructions pas-à-pas restent en préparation.",
  ]},
  { version:'2026-08-03.14', items:[
    "5e -- G5 Parallélogrammes particuliers : messages corrigés pour correspondre à la propriété exacte de chaque figure interactive (diagonales/angle/côtés). Le codage des côtés égaux du losange (propriété 1) ne s'affiche plus tant que la condition n'est pas remplie. Cadre agrandi pour que la situation favorable reste toujours visible, sans être coupée. Ajout de 2 figures interactives pour le carré (losange qui devient un carré par l'angle, rectangle qui devient un carré par les côtés), qui restent en permanence un vrai losange/rectangle pendant qu'on fait glisser le point.",
  ]},
  { version:'2026-08-03.13', items:[
    "5e -- G5 Parallélogrammes particuliers : les 4 propriétés de reconnaissance (rectangle par les diagonales, rectangle par l'angle droit, losange par les côtés, losange par les diagonales) sont maintenant des figures interactives -- on fait glisser un point pour déformer le parallélogramme, avec un effet d'aimant qui verrouille la figure exactement sur la condition (angle droit / côtés égaux) dès qu'on s'en approche, transformant visiblement le parallélogramme en rectangle ou en losange.",
  ]},
  { version:'2026-08-03.12', items:[
    "Nouveau chapitre 5e -- G5 Parallélogrammes particuliers : Cours complet (rectangle, losange, carré -- définitions, propriétés caractéristiques avec démonstrations, propriétés de reconnaissance), 5 exercices et un quiz. La partie Méthode (constructions du rectangle et du losange à partir de leurs diagonales) suivra dans une prochaine session.",
  ]},
  { version:'2026-08-03.11', items:[
    "5e -- N6 Équations, jeu : le retrait est maintenant bloqué (avec message) si l'autre plateau n'a pas assez de masse pour faire la même opération. Ajout d'une vignette « + boule » dans la réserve. Le journal note désormais l'étape intermédiaire complète (ex. x + 20 - 20 = 70 - 20) avant la ligne simplifiée (x = 50).",
  ]},
  { version:'2026-08-03.10', items:[
    "5e -- N6 Équations, jeu : ajout de la masse de 30 g dans la réserve. Nouvelle case à cocher « Garder l'équilibre » : quand elle est cochée, ajouter ou retirer une masse d'un côté fait automatiquement la même opération de l'autre côté, matérialisant x + 20 - 20 = 70 - 20 puis x = 50 dans le journal des équations.",
  ]},
  { version:'2026-08-03.9', items:[
    "5e -- N6 Équations, jeu : corbeille retirée (le clic pour supprimer suffit), texte d'aide simplifié. Ajout d'un journal à droite de la balance qui note l'équation (ou l'inéquation, si la balance penche) correspondant à la situation après chaque mouvement.",
  ]},
  { version:'2026-08-03.8', items:[
    "5e -- N6 Équations, jeu : remplacé « poids » par « masse » partout (terminologie correcte). Les boules sont désormais supprimables comme les masses (plus de blocage pour 2x=90/3x=90). Le déplacement/suppression des objets déjà posés repose maintenant sur les événements pointeur (clic = retrait, glisser = déplacement vers l'autre plateau ou la corbeille) plutôt que sur le glisser-déposer natif HTML5 depuis le SVG, peu fiable selon les navigateurs.",
  ]},
  { version:'2026-08-03.7', items:[
    "5e -- N6 Équations, jeu : la corbeille (glisser pour supprimer) est rendue plus fiable (élément unique, dropEffect explicite). Le bouton \"Recommencer\" tire maintenant une nouvelle situation au hasard parmi 6 scénarios (x+b=c et ax=c), au lieu de toujours revenir à la même équation.",
  ]},
  { version:'2026-08-03.6', items:[
    "5e -- N6 Équations, jeu : repensé pour partir d'une vraie situation d'équation (une boule et 20 g à gauche, 70 g à droite, soit x + 20 = 70). Tout se manipule désormais en glisser-déposer : ajouter un poids depuis la réserve, déplacer un poids déjà posé vers l'autre plateau, ou le supprimer en le glissant vers la corbeille. Correction d'un bug de superposition qui aurait bloqué les clics et le glisser sur les objets du plateau.",
  ]},
  { version:'2026-08-03.5', items:[
    "5e -- N6 Équations : géométrie de la balance corrigée -- les plateaux reposent maintenant sur de courts montants au-dessus des bras, au lieu d'être suspendus par des fils. Corrigé un bug où la balance penchait du mauvais côté. Le jeu part maintenant d'une situation de départ (une boule déjà posée à gauche, de masse cachée), et se joue en faisant glisser des poids (5/10/20/50 g) depuis une réserve jusqu'à un plateau, plutôt qu'avec des boutons.",
  ]},
  { version:'2026-08-03.4', items:[
    "5e -- N6 Équations : les balances sont redessinées (sphères en dégradé, plateaux dorés). Nouveau jeu interactif dans la Méthode -- l'élève ajoute des boules ou des masses sur chaque plateau (masse de la boule fixée mais non révélée), la balance penche visuellement en fonction de ses choix. Nouvel exercice avec 2 pesées illustrées à traduire en équation.",
  ]},
  { version:'2026-08-03.3', items:[
    "5e -- N6 Équations, Méthode : ajout de la mise en équation avec une balance équilibrée (3 scénarios progressifs -- une boule et un poids, plusieurs boules, puis boules et poids ensemble), en démos pas-à-pas.",
  ]},
  { version:'2026-08-03.2', items:[
    "5e -- N6 Équations, Cours : les deux équations de chaque exemple (propriétés 2 et 3) sont maintenant annoncées explicitement dans le texte d'intro. La seconde équation utilise l'inconnue y (plutôt que x deux fois), avec un saut visuel entre les deux résolutions dans les démos pas-à-pas.",
  ]},
  { version:'2026-08-03.1', items:[
    "Nouveau chapitre 5e -- N6 Équations : Cours complet (notion d'équation, résolution des types x+b=c et ax=c avec démos pas-à-pas), 5 exercices et un quiz. La partie Méthode suivra dans une prochaine session.",
  ]},
  { version:'2026-08-02.12', items:[
    "5e -- N5 Calcul littéral, Exercices : retiré la ligne « Or, propriété » de la rédaction type « Tester une égalité », jugée superflue ici -- on passe directement des deux calculs à la conclusion.",
  ]},
  { version:'2026-08-02.11', items:[
    "5e -- N5 Calcul littéral, Exercices : la rédaction type « Tester une égalité » détaille maintenant séparément le calcul du membre de gauche et du membre de droite, avec chaque étape de substitution (3x+7 = 3×9+7 = 27+7 = 34), au lieu d'un résultat déjà calculé.",
  ]},
  { version:'2026-08-02.10', items:[
    "5e -- N5 Calcul littéral, Méthode : réduit l'espace excessif après le + dans la ligne « B = 6 × 2x + 6 × 3 » de la démo de factorisation (position du second facteur mal estimée).",
  ]},
  { version:'2026-08-02.9', items:[
    "5e -- N5 Calcul littéral, Méthode : les deux démonstrations affichent maintenant un vrai nom d'expression (A = ... / B = ...) à chaque étape. La factorisation, qui remplaçait chaque étape par la suivante, est corrigée pour empiler progressivement les lignes en laissant les précédentes affichées, comme le développement.",
  ]},
  { version:'2026-08-02.8', items:[
    "5e -- N5 Calcul littéral, Méthode : deux démonstrations animées pas à pas -- développer 6(x − 4) avec les flèches de distribution qui swooshent du facteur vers chaque terme, et factoriser 12x + 18 en repérant puis en mettant en évidence le facteur commun 6 (mis en couleur).",
  ]},
  { version:'2026-08-02.7', items:[
    "5e -- N5 Calcul littéral : les 4 exemples travaillés du Cours (valeur C/D, égalité, développement, factorisation) sont maintenant des démonstrations pas-à-pas avec bouton \"Étape suivante\", au lieu de texte tout affiché d'un coup.",
    "Toutes pages -- Taille des formules KaTeX augmentée (elle paraissait souvent trop petite par rapport au texte environnant, même après la correction précédente).",
  ]},
  { version:'2026-08-02.6', items:[
    "Nouveau chapitre 5e -- N5 Calcul littéral : Cours complet en 4 sections (expression littérale et puissances, valeur d'une expression littérale, égalité, distributivité simple -- développement et factorisation), avec des exemples originaux et des étapes détaillées et expliquées à chaque calcul, 5 exercices et un quiz. La partie Méthode (développer/factoriser pas à pas) suivra dans une prochaine session.",
  ]},
  { version:'2026-08-02.5', items:[
    "5e -- P1 Proportionnalité, Méthode : dans l'exemple par différence, les flèches des lignes A et B étaient inversées -- 5-3 s'affichait avant 100-60, alors que c'est la relation déjà connue (100-60=40) qui doit apparaître en premier, avant de l'appliquer à A.",
  ]},
  { version:'2026-08-02.4', items:[
    "5e -- P1 Proportionnalité, Méthode : corrigé un décalage entre les étapes écrites et ce qui s'affichait visuellement dans les 2 démos 'association dans un tableau' -- l'étape en cours de réalisation restait affichée comme non faite jusqu'au clic suivant. Elle est maintenant cochée dès que son effet est visible.",
  ]},
  { version:'2026-08-02.3', items:[
    "5e -- P1 Proportionnalité, Méthode : les 2 lignes du tableau 'association dans un tableau' sont maintenant collées (bord commun), avec les flèches de la 1ère ligne au-dessus du tableau et celles de la 2e ligne en dessous, au lieu d'être comprimées entre les deux lignes.",
  ]},
  { version:'2026-08-02.2', items:[
    "5e -- P1 Proportionnalité, Méthode : les tableaux 'association dans un tableau' sont maintenant de vrais tableaux à 4 colonnes (1ère colonne = Grandeur A / Grandeur B, comme une cellule à part entière), et les flèches affichent le calcul complet (« 5 + 3 », « 100 + 60 », etc.) plutôt qu'un simple symbole, pour une opération plus claire par colonne.",
  ]},
  { version:'2026-08-02.1', items:[
    "5e -- P1 Proportionnalité, Méthode : corrigé l'affichage des tableaux 'association dans un tableau' (les étiquettes Grandeur A/B chevauchaient la 1ère colonne). 'Évolution d'une grandeur' développée en 6 étapes avec la notation C = ... (on nomme l'inconnue, on pose l'écriture, la fraction se remplit puis se simplifie, le quotient se calcule, conclusion).",
  ]},
  { version:'2026-08-01.5', items:[
    "5e -- P1 Proportionnalité, Méthode : « Évolution d'une grandeur », dernière étape corrigée (l'unité L n'était plus présente dans le calcul). « Autre méthode » entièrement reprise : au lieu du produit en croix, deux démonstrations pas-à-pas illustrent l'association par une opération simple entre deux paires connues (addition : 8 = 5+3, avec flèches ; puis différence : 40 = 100-60, avec flèches), sans nommer la linéarité.",
  ]},
  { version:'2026-08-01.4', items:[
    "5e -- P1 Proportionnalité, Méthode : « Le produit en croix » renommé « Évolution d'une grandeur » et transformé en démonstration pas-à-pas (5 L × .../... , puis la fraction se remplit avec les données colorées de l'énoncé et les unités km simplifiées, puis le calcul final). L'autre méthode (tableau) reprise pour illustrer deux paires de valeurs connues (5;100) et (3;60), complétées pour une 3e colonne partiellement connue.",
  ]},
  { version:'2026-08-01.3', items:[
    "5e -- P1 Proportionnalité, Méthode : le tableau récapitulatif révélait toutes les réponses du jeu d'association juste au-dessus. Remplacé par un seul exemple (température / °C), qui ne fait pas partie des paires du jeu.",
  ]},
  { version:'2026-08-01.2', items:[
    "5e -- P1 Proportionnalité, Méthode : ajout du rappel grandeur/unité, d'un jeu d'association cliquable (grandeur ↔ unité), de la méthode du produit en croix (formule générale + exemple), et de sa présentation alternative en tableau (association linéaire).",
  ]},
  { version:'2026-08-01.1', items:[
    "Nouveau chapitre 5e -- P1 Proportionnalité : Cours complet (tableau de proportionnalité, les 3 méthodes pour compléter un tableau, caractérisation graphique avec les propriétés directe et réciproque), 4 exercices et un quiz. La section Pourcentages du manuel (mêmes pages) reste un chapitre séparé, à construire plus tard dans l'année scolaire. La partie Méthode (choisir et appliquer la bonne technique) suivra dans une prochaine session.",
  ]},
  { version:'2026-07-31.15', items:[
    "5e -- G4 Parallélogrammes, Exercices : la rédaction type était incomplète (énoncé manquant, étape « Or, [propriété] » absente). Reprise avec la structure en 3 temps du site (ce que je sais / Or, propriété / Donc, conclusion), énoncé explicite ajouté avant.",
  ]},
  { version:'2026-07-31.14', items:[
    "5e -- G4 Parallélogrammes, Méthode : ajustements suite à relecture -- méthode 1, les parallèles pointillées vont maintenant jusqu'à D et au-delà (anticipent l'intersection) ; méthode 2, le 2e arc de cercle est plus court (il vient juste croiser le premier) ; méthode 3, le milieu O est codé (AO = OC) et on trace la demi-droite [BO) au lieu de la droite (BO).",
  ]},
  { version:'2026-07-31.13', items:[
    "5e -- G4 Parallélogrammes : ajout de la partie Méthode, avec les 3 constructions animées pas à pas du manuel (à partir de la définition, à partir des longueurs des côtés au compas, à partir des diagonales au compas), rejouables et compatibles avec l'export cahier/PDF.",
  ]},
  { version:'2026-07-31.12', items:[
    "5e -- G4 Parallélogrammes : Cours restructuré en 3 sections numérotées (1. Définition, 2. Propriétés du parallélogramme, 3. Reconnaître un parallélogramme), au lieu de 2 sections avec la définition en sous-partie.",
  ]},
  { version:'2026-07-31.11', items:[
    "Nouveau chapitre 5e -- G4 Parallélogrammes : Cours complet (définition, les 4 propriétés caractéristiques, les 3 propriétés de reconnaissance), 4 exercices et un quiz. La partie Méthode (constructions au compas/équerre) suivra dans une prochaine session.",
  ]},
  { version:'2026-07-31.10', items:[
    "Outil prof (éditeur de correction) : le contenu joint (figure, tableau, division posée) était bien enregistré (« ✓ Contenu joint ») mais n'apparaissait jamais dans l'aperçu ni en mode projection, qui ne se basaient que sur le texte saisi. L'aperçu inclut maintenant ce contenu, et se rafraîchit immédiatement après chaque insertion, retrait, ou ouverture d'une correction existante pour modification.",
  ]},
  { version:'2026-07-31.9', items:[
    "Automatismes : les trois records sous chaque vignette tiennent maintenant sur une seule ligne, avec une icône par catégorie (👤 moi, 🏫 classe, 🏛️ établissement -- renommé depuis « interclasse », plus clair).",
  ]},
  { version:'2026-07-31.8', items:[
    "Automatismes : le chronomètre défile maintenant visiblement pendant l'exercice (mis à jour toutes les 100 ms), et se fige au moment de la correction.",
    "Automatismes : les records (mon record, record de la classe, record interclasse) s'affichent désormais directement sous chaque vignette, dès la page d'accueil des séquences, sans attendre d'avoir refait l'exercice.",
  ]},
  { version:'2026-07-31.7', items:[
    "Automatismes : l'exercice s'ouvre maintenant dans une modale (toujours visible, ne se perd plus en bas d'une longue page).",
    "Automatismes : chronométrage sans compte à rebours -- en cas de sans-faute, affichage de mon record personnel, du record de la classe et du record interclasse pour la séquence en cours, avec le lieu où le nouveau record est signalé.",
    "Automatismes : indicateur visuel sur chaque vignette (point orange = déjà tenté, point vert = sans-faute déjà obtenu).",
    "Automatismes : les grands nombres affichés dans les énoncés respectent maintenant l'écriture par tranches de 3 chiffres (ex. 12 345).",
    "Supervision (prof) et Mes résultats (élève) : affichage du temps réalisé pour les séries réussies sans faute.",
  ]},
  { version:'2026-07-31.6', items:[
    "5e -- Angles et parallélisme : sur toutes les figures du chapitre, les points situés sur une droite ou une demi-droite (autres que les points d'intersection, déjà correctement marqués) portaient une étiquette flottante sans aucune matérialisation du point. Ajout d'un petit trait perpendiculaire à la droite pour chacun (M, M', N, N', I, J, K, D, F, E, P, P', Q, Q', A, K, P, L, etc.), avec l'étiquette décalée perpendiculairement plutôt que dans le prolongement du tracé, et la droite prolongée au-delà du point pour qu'il ne soit jamais confondu avec une extrémité.",
  ]},
  { version:'2026-07-31.5', items:[
    "5e -- Angles et parallélisme, méthodes M6 et M7 : remplacement des chevrons de parallélisme par la notation explicite « (MK) // (NP) » et « (AB) // (CD) », plus lisible pour les élèves.",
  ]},
  { version:'2026-07-31.4', items:[
    "5e -- Angles et parallélisme, méthodes animées M6 et M7 : les deux angles étaient affichés avec la même mesure alors qu'il fallait trouver la valeur de l'un des deux. Le second angle est maintenant noté « ? », et des marques de parallélisme (chevrons) ont été ajoutées sur les deux droites pour bien signaler qu'elles sont données comme parallèles.",
  ]},
  { version:'2026-07-31.3', items:[
    "Administration > Signalements : le changement de statut (nouveau/en cours/résolu) échouait silencieusement dans certains cas sans aucun message. Ajout d'une détection d'erreur explicite, avec un message distinct si la mise à jour est bloquée par une policy Supabase (0 ligne modifiée en base).",
  ]},
  { version:'2026-07-31.2', items:[
    "5e -- N1 Opérations sur les nombres décimaux / N1 Divisibilité : les paragraphes « Multiples et diviseurs » et « Critères de divisibilité », avec leur méthode, leurs exercices et leur question de quiz, ont été déplacés du chapitre Opérations sur les nombres décimaux vers le chapitre Divisibilité, où ils avaient davantage leur place.",
  ]},
  { version:'2026-07-31.1', items:[
    "Progression de 5e : correction de l'ordre et des dates des chapitres 4 à 8 (Angles et parallélisme, Fractions, Droites remarquables dans un triangle, Proportionnalité, Nombres relatifs) pour être conformes au B.O. 2026.",
  ]},
  { version:'2026-07-28.23', items:[
    "Bande de menu (haut de page) qui ne s'étendait pas jusqu'au bord droit sur smartphone : largeur explicite ajoutée, et protection générale contre tout débordement horizontal imprévu de la page.",
  ]},
  { version:'2026-07-28.22', items:[
    "Chapitre Angles et rapporteur (6e) : le crayon restait invisible dans certains cas même une fois le rapporteur aligné sur le sommet -- la marge entre le sommet et les bords de la scène était insuffisante pour garantir que le crayon (à distance fixe du sommet) reste visible quelle que soit la rotation du rapporteur. Plage de placement du sommet corrigée (vérifiée sur 20 000 tirages aléatoires) pour que le crayon reste toujours dans le cadre, quels que soient le sommet et la rotation.",
    "Marges réduites sur petit écran (main et cadres de figures) pour donner plus de place aux widgets interactifs (rapporteur, schémas) sur smartphone.",
  ]},
  { version:'2026-07-28.21', items:[
    "Chapitre Angles et rapporteur (6e) : le crayon (Méthode 2 : construire un angle, et Permis Rapporteur) était invisible par défaut -- sa position initiale (90° sur l'arc) tombait hors de la scène tant que le rapporteur n'était pas encore glissé sur le sommet. Position de départ corrigée (0° au lieu de 90°) pour qu'il reste toujours visible dès le départ.",
  ]},
  { version:'2026-07-28.20', items:[
    "Chapitre Angles et rapporteur (6e) : refonte complète du positionnement du rapporteur sur mobile. Toutes les tentatives précédentes reposaient sur un calcul d'échelle en JavaScript (mesure de la taille réellement affichée), fragile et sujet à des problèmes de timing. Remplacé par un positionnement 100% en pourcentages CSS (position, taille et pivot du rapporteur et du crayon exprimés en % de la scène), qui s'adapte automatiquement à n'importe quelle taille d'écran sans aucun calcul JavaScript ni dépendance au moment où la page se charge. Vérifié mathématiquement que le sommet du rapporteur tombe exactement au bon endroit à plusieurs tailles simulées (320px, 375px, 860px, 1200px).",
  ]},
  { version:'2026-07-28.19', items:[
    "Chapitre Angles et rapporteur (6e) : la synchronisation d'échelle du rapporteur échouait silencieusement si la scène n'était pas encore affichée au moment du calcul (onglet pas encore ouvert), sans jamais réessayer -- d'où un rapporteur resté à sa taille réelle, démesuré par rapport à la scène rétrécie. Ajout de tentatives répétées automatiques tant que la scène n'est pas mesurable, et d'une resynchronisation automatique à chaque changement de taille de la scène (rotation d'écran, changement d'onglet, redimensionnement) via ResizeObserver.",
  ]},
  { version:'2026-07-28.18', items:[
    "Chapitre Angles et rapporteur (6e) : corrige un oubli dans le correctif mobile précédent -- les trois démonstrations du cours (lire, construire, bissectrice) n'appelaient jamais la synchronisation d'échelle du rapporteur, qui restait donc à sa taille réelle (480px) au lieu de rétrécir avec la scène sur petit écran, débordant hors du cadre. Corrigé : la synchronisation est maintenant appelée à chaque étape de ces trois démonstrations.",
  ]},
  { version:'2026-07-28.17', items:[
    "Chapitre Angles et rapporteur (6e) : nouvelle approche pour le décalage du rapporteur sur smartphone. Le défilement horizontal (essayé précédemment) entrait en conflit avec le glisser tactile -- le navigateur interprétait le geste comme un défilement de page. Le rapporteur et le crayon sont maintenant placés dans une couche qui se met à l'échelle exactement comme la scène qui rétrécit sur petit écran (au lieu de rester à taille fixe), avec une resynchronisation automatique au redimensionnement de la fenêtre.",
  ]},
  { version:'2026-07-28.16', items:[
    "Chapitre Angles et rapporteur (6e) : réapplication propre des évolutions annulées (figure adjacents remontée, énoncés et figures manquants pour les méthodes 3 et 4, correctif du décalage du rapporteur sur mobile) -- cette fois avec la hauteur explicite des scènes correctement conservée, pour éviter la disparition des figures constatée précédemment. Testé de bout en bout (lecture, construction, bissectrice, démonstrations) avant mise en ligne.",
  ]},
  { version:'2026-07-28.13', items:[
    "Chapitre Angles et rapporteur (6e) : les étiquettes des points (M, N, A, B, C, D, E, F...) sont maintenant décalées perpendiculairement au côté qu'elles repèrent, jamais dans le prolongement de la droite. L'étiquette du sommet (O) est systématiquement placée dans le plus grand espace libre autour de l'angle étudié, donc à l'extérieur de celui-ci.",
  ]},
  { version:'2026-07-28.12', items:[
    "Chapitre Angles et rapporteur (6e) : les côtés des figures (opposés par le sommet, adjacents, supplémentaires, bissectrice) prolongent maintenant leur trait au-delà du point qui les repère (M, N, A, B, C, D, E, F...), comme il se doit pour une demi-droite -- le trait ne s'arrête plus pile au point.",
  ]},
  { version:'2026-07-28.11', items:[
    "Chapitre Angles et rapporteur (6e) : les points qui repèrent un côté d'angle (M, N, M', N', A, B, C, D, E, F...) sont désormais marqués d'un petit trait perpendiculaire au côté, comme il se doit pour un point sur une demi-droite -- au lieu de rien du tout en bout de trait comme précédemment.",
  ]},
  { version:'2026-07-28.10', items:[
    "Chapitre Angles et rapporteur (6e) : correction définitive de la lecture et de la construction intérieure/extérieure, à partir de la vraie convention du rapporteur (confirmée) -- jaune (extérieur) a son 0° à gauche et se lit en sens horaire, vert (intérieur) a son 0° à droite et se lit en sens anti-horaire. Toutes les rotations ont été recalculées et vérifiées mathématiquement selon cette convention exacte, y compris pour la construction où jaune et vert construisent désormais l'angle demandé chacun de son côté du côté déjà tracé (sens horaire pour le jaune, anti-horaire pour le vert) -- les deux constructions restent parfaitement valides, seul le sens diffère.",
  ]},
  { version:'2026-07-28.9', items:[
    "Chapitre Angles et rapporteur (6e) : la précédente correction avait inversé le mauvais bouton -- 'Lecture extérieure' prenait le 0° intérieur. Rétabli : extérieur = 0° jaune direct, intérieur = 0° vert (aligné sur le second côté).",
    "Construction : ajout d'une étiquette de graduation bien visible et colorée sur le schéma (jaune ou vert selon le mode), en plus du texte -- le crayon et la rotation du rapporteur ne changeant volontairement jamais entre les deux modes, seule la graduation affichée change, et ce n'était pas assez visible auparavant.",
  ]},
  { version:'2026-07-28.8', items:[
    "Chapitre Angles et rapporteur (6e) : correction de l'inversion des boutons intérieur/extérieur pour la lecture (les deux comportements étaient échangés).",
    "Cliquer sur un bouton intérieur/extérieur (lecture ou construction) saute désormais directement à l'étape où la différence est visible, pour que le clic produise toujours un effet visible immédiat.",
  ]},
  { version:'2026-07-28.7', items:[
    "Chapitre Angles et rapporteur (6e) : le rapporteur ne se retourne plus jamais (retiré l'effet miroir, qui donnait un placement absurde). Retour à une simple rotation : pour la lecture intérieure, on aligne le 0° vert sur le SECOND côté de l'angle (pas le premier) -- l'autre côté reste ainsi dans le rapporteur, comme demandé. Pour la construction, la rotation est désormais identique dans les deux modes (jamais de retournement) : seule la graduation à lire change (180°−cible sur l'anneau vert, à la même position réelle que la cible sur le jaune).",
  ]},
  { version:'2026-07-28.6', items:[
    "PDF : correction d'une vraie cause de figures manquantes -- une figure statique (icône « angle rentrant ») utilisait une variable CSS (var(--white)) dans un attribut fill, qui ne se résout pas sur un clone détaché du DOM lors de la capture. Remplacée par une couleur littérale, et la rastérisation PDF est étendue à TOUTE figure SVG restante (pas seulement celles avec un identifiant), pour couvrir aussi les figures statiques.",
    "Correction d'un risque similaire pour toutes les figures : le figement des styles calculés n'est plus tenté sur un élément détaché du DOM (ce qui écrasait par erreur des couleurs correctes par des valeurs par défaut) -- seuls les éléments encore présents en direct dans la page sont concernés.",
    "Chapitre Angles et rapporteur (6e) : rayon du crayon encore augmenté (0.93, au niveau du bord réel où passe le trait rouge).",
    "Textes de lecture intérieure/extérieure précisés : le 0° jaune (extérieur) ou le 0° vert (intérieur) doit être placé sur un des côtés de l'angle, l'autre côté restant dans le rapporteur.",
    "Bissectrice : ajout d'une dernière étape codant les deux angles NOB et BOM obtenus comme étant de même mesure (petit arc + trait), et capturable dans le cahier/PDF.",
  ]},
  { version:'2026-07-28.5', items:[
    "Chapitre Angles et rapporteur (6e) : correction du vrai bug de positionnement du crayon (il était imbriqué dans la rotation CSS du rapporteur, ce qui le faisait apparaître complètement décalé) -- il est maintenant positionné indépendamment par un calcul d'angle absolu direct, vérifié mathématiquement (la pointe reste exactement à la bonne distance du sommet, quel que soit l'angle).",
    "Trait-repère réduit (plus petit, moins imprécis à la lecture).",
    "Lecture intérieure/extérieure : remplacé la rotation à 180° (qui retournait le rapporteur à l'envers, incohérent) par un véritable effet miroir, correspondant à la façon dont un rapporteur transparent se retourne réellement. Vérifié mathématiquement : la lecture sur l'anneau intérieur après ce placement donne bien la vraie mesure de l'angle.",
    "Option lecture intérieure/extérieure ajoutée également à la démonstration de construction (elle n'était présente que pour la lecture).",
    "Bissectrice entièrement reconstruite en 8 étapes animées (mesure de l'angle, calcul de la moitié, crayon posé sur l'arc, trait-repère tracé, rapporteur retiré, tracé final) -- au lieu d'un simple bouton 'tracer' instantané. Enregistrée pour la capture pas-à-pas dans le cahier/PDF.",
    "Correction d'un bug distinct trouvé au passage : le glisser du crayon dans le Permis Rapporteur modifiait par erreur la variable de l'exercice d'entraînement au lieu de la sienne.",
  ]},
  { version:'2026-07-28.4', items:[
    "Chapitre Angles et rapporteur (6e) : le bouton lecture intérieure/extérieure est déplacé du Méthode vers la démonstration du Cours (c'était son bon endroit -- il montre qu'on peut toujours poser le rapporteur de deux manières, pas un réglage d'entraînement).",
    "Recalibrage du rayon du crayon (0.90 au lieu de 0.85) : il ne touchait pas le bord du rapporteur.",
    "Démonstration 'construire un angle' du cours détaillée en 6 étapes : crayon posé visuellement sur le bord, petit trait-repère tracé dans le prolongement, rapporteur et crayon retirés, puis règle et tracé final.",
    "Les deux démonstrations du cours (lire, construire) se capturent maintenant correctement étape par étape dans le cahier de l'élève et l'export PDF (nouveau mécanisme de capture composite, dédié aux scènes mêlant SVG et image de rapporteur).",
    "Permis Rapporteur : passage d'une simple activation par classe à un système de sessions avec code (le prof démarre une ou plusieurs sessions pour sa classe depuis Administration, chacune avec son propre code à 6 caractères ; l'élève entre ce code pour accéder à l'examen). Une session peut être clôturée.",
  ]},
  { version:'2026-07-28.3', items:[
    "Chapitre Angles et rapporteur (6e) : le crayon de construction est redessiné en dehors du rapporteur, sa pointe posée exactement sur le bord/l'arc (vérifié mathématiquement pour tous les angles) -- avant, il était centré sur l'arc, à moitié dedans.",
    "Traits des côtés des angles nettement affinés (1.3 au lieu de 2.4-2.6) dans tous les exercices et démonstrations du rapporteur, pour une lecture plus précise face aux fines graduations.",
    "Ajout de deux boutons « Lecture extérieure » / « Lecture intérieure » avec texte d'aide associé, pour bien choisir et annoncer sur quel anneau du rapporteur (jaune extérieur ou vert intérieur) on lit sa mesure.",
    "Cours : renommé « Démonstration » en « Méthode » dans les titres.",
    "Correction des icônes du tableau de classification des angles (partie 1) : recentrées, et le rayon des icônes rentrant/plein ne dépasse plus du cadre (elles étaient coupées en bas).",
    "Ajout d'une note explicative pour les profs/admin dans la section Permis Rapporteur : rappelle que ce dernier n'est visible qu'aux élèves connectés dont la classe a été activée (case à cocher en Administration).",
  ]},
  { version:'2026-07-28.2', items:[
    "Chapitre Angles et rapporteur (6e) : refonte majeure -- angles à trouver vraiment aléatoires (n'importe quel degré, plus seulement des multiples de 5) ; scène et rapporteur encore agrandis (860x600, rapporteur 480px) ; le cours affiche maintenant deux démonstrations pas-à-pas séparées (lire / construire) ; la construction se fait désormais avec un crayon qui se déplace degré par degré sur l'arc du rapporteur, validé pour tracer le côté (au lieu de faire tourner un trait directement).",
    "Nouveau : Permis Rapporteur, un examen noté sur 20 (10 lectures + 10 constructions) accessible aux élèves connectés dont le professeur a activé le permis pour leur classe (case à cocher dans Administration, à côté de chaque classe). Résultat enregistré automatiquement.",
  ]},
  { version:'2026-07-28.1', items:[
    "Chapitre Angles et rapporteur (6e) : réorganisation -- le Cours affiche maintenant une démonstration animée pas-à-pas (le rapporteur s'anime tout seul, rien à glisser) au lieu des exercices interactifs, déplacés dans Méthode animée (où on s'entraîne vraiment). Scène et rapporteur agrandis (plus lisibles). Repositionnement du pivot par une méthode plus précise (ajustement de cercle sur le bord du rapporteur) pour réduire le léger décalage constaté.",
  ]},
  { version:'2026-07-27.10', items:[
    "Correction : le rapporteur ne pouvait pas être déplacé du tout (l'image avait encore pointer-events:none, hérité de l'ancienne version statique, qui bloquait tous les événements de souris/tactile dessus). Corrigé, et durci contre le glisser-déposer natif du navigateur sur les images.",
  ]},
  { version:'2026-07-27.9', items:[
    "Chapitre Angles et rapporteur (6e) : refonte des exercices avec le rapporteur -- les côtés de l'angle dépassent maintenant largement du rapporteur (comme dans la réalité), et le rapporteur est déplaçable et pivotable à la souris/au doigt, avec un effet d'aimant qui accroche son centre sur le sommet de l'angle et sa ligne 0°-180° sur un des côtés.",
  ]},
  { version:'2026-07-27.8', items:[
    "Correction du chapitre Angles et rapporteur (6e) : le sommet de l'angle n'était pas placé sur le vrai centre du rapporteur dans l'image (il y a une marge sous la ligne 0°-180° pour les étiquettes, non prise en compte au départ). Position recalculée par analyse précise de l'image.",
  ]},
  { version:'2026-07-27.7', items:[
    "Nouveau chapitre 6e : Angles et rapporteur (notion d'angle, types d'angles, utilisation du rapporteur avec deux exercices interactifs utilisant une vraie image de rapporteur translucide, paires d'angles particuliers, bissectrice).",
  ]},
  { version:'2026-07-27.6', items:[
    "Ajout d'un écran « Signalements (bugs / améliorations) » dans Administration : liste tous les signalements envoyés, avec possibilité de changer leur statut (nouveau / en cours / résolu) directement dans l'appli, sans passer par Supabase.",
  ]},
  { version:'2026-07-27.5', items:[
    "Ajout d'une modale « Signaler un bug / une amélioration » dans le menu du compte (profs et admin), avec choix de la partie concernée et récapitulatif de toutes les évolutions par version (celui que tu regardes en ce moment).",
  ]},
  { version:'2026-07-27.4', items:[
    "Système de codage des points pour l'impression : sommet de polygone -> pas de point, extrémité/origine/point sur une droite -> petite croix (chapitre Droites parallèles et perpendiculaires, 6e).",
  ]},
  { version:'2026-07-27.3', items:[
    "Correction des figures qui apparaissaient comme de gros points noirs dans le cahier/PDF (les styles CSS calculés sont maintenant figés avant la conversion en image).",
  ]},
  { version:'2026-07-27.2', items:[
    "PDF : les figures ne sont plus coupées entre deux pages.",
    "Rastérisation des figures : lissage amélioré pour un rendu plus net.",
  ]},
  { version:'2026-07-27.1', items:[
    "Ajout du numéro de version visible dans la barre du haut, pour repérer facilement une version en cache.",
    "Correction : les sections « Méthode » n'étaient jamais reconstituées correctement dans le cahier/PDF (le titre était imbriqué dans le mauvais conteneur HTML) -- corrigé sur tous les chapitres.",
    "Rastérisation de toutes les figures interactives du cours (pas seulement les constructions à étapes) pour un export PDF fiable.",
    "Ajout du bouton « + Cahier » sur les sections Méthode de tous les chapitres (jusque-là réservé au Cours).",
    "Chapitre 6e : Nombres décimaux (nouveau).",
    "Chapitre 5e : Opérations sur les nombres relatifs (nouveau), Divisibilité (nouveau, détaché du chapitre Nombres entiers).",
    "Chapitre 5e : Droites remarquables dans un triangle (nouveau).",
    "Chapitre 5e : Angles et parallélisme (nouveau).",
    "Automatismes : 88 des 112 séquences du cahier de calcul mental câblées (renommé « Automatismes »).",
  ]},
];
function renderChangelog(){
  const el = document.getElementById('changelogList');
  el.innerHTML = CHANGELOG_DATA.map(v=>`
    <div style="margin-bottom:18px;">
      <div style="font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--accent);margin-bottom:6px;">build ${v.version}</div>
      <ul style="margin:0;padding-left:20px;line-height:1.7;">
        ${v.items.map(i=>`<li>${i}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}
function switchBugModalTab(tab){
  document.getElementById('bugTabForm').classList.toggle('active', tab==='form');
  document.getElementById('bugTabLog').classList.toggle('active', tab==='log');
  document.getElementById('bugModalForm').style.display = tab==='form' ? 'block' : 'none';
  document.getElementById('bugModalLog').style.display = tab==='log' ? 'block' : 'none';
  if(tab==='log') renderChangelog();
}
let bugReportTypeOverride = 'bug';
function openBugReportModal(prefill){
  document.getElementById('bugReportModalOverlay').style.display='flex';
  document.getElementById('bugReportMessage').value='';
  document.getElementById('bugReportStatus').textContent='';
  bugReportTypeOverride = (prefill && prefill.reportType) || 'bug';
  const titleEl = document.querySelector('#bugReportModalOverlay strong');
  if(titleEl) titleEl.textContent = bugReportTypeOverride==='suggestion' ? '💡 Suggérer une amélioration' : 'Signaler un bug / une amélioration';
  if(prefill && prefill.section){
    document.getElementById('bugReportSection').value = prefill.section;
    document.getElementById('bugReportSection').dispatchEvent(new Event('change'));
  }
  if(prefill && prefill.chapitre) document.getElementById('bugReportChapter').value = prefill.chapitre;
  switchBugModalTab('form');
}
/* Ouvre le même formulaire, pré-rempli avec le module de chapitre actuellement affiché --
   évite au professeur de ressaisir le contexte à la main. */
function openSuggestionModal(){
  const activeTab = document.querySelector('.tab-btn.active');
  const moduleLabel = activeTab ? activeTab.textContent.trim() : '';
  const section = currentLevel==='5e' ? '5e — Chapitres' : '6e — Chapitres';
  const chapitre = (currentChapterTitle||'') + (moduleLabel ? ' — '+moduleLabel : '');
  openBugReportModal({section, chapitre, reportType:'suggestion'});
}
function closeBugReportModal(){
  document.getElementById('bugReportModalOverlay').style.display='none';
}
document.getElementById('bugReportSection') && document.getElementById('bugReportSection').addEventListener('change', (e)=>{
  const row = document.getElementById('bugReportChapterRow');
  row.style.display = (e.target.value==='6e — Chapitres' || e.target.value==='5e — Chapitres') ? 'block' : 'none';
});
async function submitBugReport(){
  const section = document.getElementById('bugReportSection').value;
  const chapitre = document.getElementById('bugReportChapter').value.trim();
  const message = document.getElementById('bugReportMessage').value.trim();
  const status = document.getElementById('bugReportStatus');
  if(!message){ status.textContent = 'Merci de décrire le problème avant d\'envoyer.'; return; }
  status.textContent = 'Envoi en cours...';
  const { error } = await sb.from('bug_reports').insert({
    reporter_id: currentUser ? currentUser.id : null,
    section,
    chapitre: chapitre || null,
    message,
    report_type: bugReportTypeOverride,
    build_version: document.getElementById('buildTag') ? document.getElementById('buildTag').textContent.replace('build ','') : null,
  });
  if(error){ status.textContent = "Échec de l'envoi : " + error.message; return; }
  status.textContent = bugReportTypeOverride==='suggestion' ? 'Suggestion envoyée, merci !' : 'Signalement envoyé, merci !';
  document.getElementById('bugReportMessage').value='';
  bugReportTypeOverride = 'bug';
  setTimeout(()=>{ if(document.getElementById('bugReportModalOverlay').style.display!=='none') closeBugReportModal(); }, 1200);
}
function renderClassModalList(){
  const list = document.getElementById('classModalList');
  if(!accountClassesList.length){ list.innerHTML = '<p class="hint">Aucune classe disponible pour ce compte.</p>'; return; }
  list.innerHTML = accountClassesList.map(c=>`
    <div class="class-modal-item ${c.id===currentClassId?'active':''}" onclick="selectClassFromModal('${c.id}')">
      <span>${escapeHtml(c.label)}</span>${c.id===currentClassId?'<span>✓</span>':''}
    </div>`).join('');
}
async function selectClassFromModal(id){
  currentClassId = id;
  closeClassModal();
  await applyClassSelection();
}
async function loadMyClasses(){
  if(!currentUser) return;
  let classesList, error;
  if(currentUserRole==='admin'){
    const res = await sb.from('classes').select('id,nom,niveau');
    classesList = res.data || []; error = res.error;
  } else {
    const res = await sb.from('class_teachers').select('classes(id,nom,niveau)').eq('teacher_id', currentUser.id);
    classesList = (res.data||[]).map(row=>row.classes).filter(Boolean); error = res.error;
  }
  classesList.sort((a,b)=>a.nom.localeCompare(b.nom));
  populateAccountClassList(classesList);
  if(!accountClassesList.some(c=>c.id===currentClassId)) currentClassId = null;
  await applyClassSelection();
  if(error) console.error(error);
}
async function applyClassSelection(){
  const found = accountClassesList.find(c=>c.id===currentClassId);
  const className = found ? found.label : null;
  updateClassDisplays(className);
  if(currentClassId){
    const remote = await syncFetchAll();
    if(remote){ cahier = remote; saveCahier(); }
  } else {
    cahier = [];
  }
  if(document.getElementById('cahierList')) renderCahier();
  if(document.getElementById('cahierEleveContent')) renderCahierEleve();
  if(document.getElementById('view-supervision').classList.contains('active')){ renderSupervision(); renderSupervisionCeb(); }
  updateCourseAddButtonsState();
}
let supervisionData = [];
async function renderSupervision(){
  const el = document.getElementById('supervisionContent');
  if(!el) return;
  if(!currentClassId){ el.innerHTML = 'Choisissez une classe dans le menu compte pour voir ses résultats.'; return; }
  el.innerHTML = 'Chargement…';
  const { data, error } = await sb.from('cm_results')
    .select('score,total,sequence_label,created_at,duration_ms,profiles(nom,email)')
    .eq('class_id', currentClassId)
    .order('created_at', {ascending:false});
  if(error){ el.innerHTML = "Erreur : "+error.message; return; }
  supervisionData = data || [];
  populateSupervisionFilters();
  renderSupervisionFiltered();
}
function populateSupervisionFilters(){
  const nameOf = r => (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Élève inconnu';
  const eleves = Array.from(new Set(supervisionData.map(nameOf))).sort();
  const exercices = Array.from(new Set(supervisionData.map(r=>r.sequence_label||'—'))).sort();
  const selEleve = document.getElementById('supFilterEleve'), selExo = document.getElementById('supFilterExercice');
  if(selEleve){
    const prev = selEleve.value;
    selEleve.innerHTML = '<option value="">Tous les élèves</option>' + eleves.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    if(eleves.includes(prev)) selEleve.value = prev;
  }
  if(selExo){
    const prev = selExo.value;
    selExo.innerHTML = '<option value="">Tous les exercices</option>' + exercices.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    if(exercices.includes(prev)) selExo.value = prev;
  }
}
function resetSupervisionFilters(){
  ['supFilterEleve','supFilterExercice','supFilterFrom','supFilterTo'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  renderSupervisionFiltered();
}
function renderSupervisionFiltered(){
  const el = document.getElementById('supervisionContent');
  if(!el) return;
  if(!supervisionData.length){ el.innerHTML = "Aucun résultat d'automatismes pour cette classe pour le moment."; return; }
  const nameOf = r => (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Élève inconnu';
  const eleveFilter = document.getElementById('supFilterEleve').value;
  const exoFilter = document.getElementById('supFilterExercice').value;
  const fromFilter = document.getElementById('supFilterFrom').value;
  const toFilter = document.getElementById('supFilterTo').value;

  const filtered = supervisionData.filter(r=>{
    if(eleveFilter && nameOf(r)!==eleveFilter) return false;
    if(exoFilter && (r.sequence_label||'—')!==exoFilter) return false;
    const d = (r.created_at||'').slice(0,10);
    if(fromFilter && d<fromFilter) return false;
    if(toFilter && d>toFilter) return false;
    return true;
  });
  if(!filtered.length){ el.innerHTML = 'Aucun résultat pour ce filtre.'; return; }

  const byStudent = {};
  filtered.forEach(r=>{
    const name = nameOf(r);
    byStudent[name] = byStudent[name] || [];
    byStudent[name].push(r);
  });
  el.innerHTML = Object.keys(byStudent).sort().map(name=>{
    const results = byStudent[name];
    const rows = results.map(r=>{
      const pct = Math.round(100*r.score/r.total);
      const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
      const perfect = r.score===r.total;
      return `<div style="display:flex;justify-content:space-between;gap:12px;padding:3px 0;">
        <span>${escapeHtml(r.sequence_label||'—')}</span>
        <span style="font-weight:700;color:${pct>=70?'#1F6B3A':pct>=40?'#8A4210':'#9E1F5E'};">${r.score}/${r.total}</span>
        <span style="color:var(--ink-soft);font-family:'JetBrains Mono',monospace;font-size:.82rem;">${perfect && r.duration_ms!=null ? formatDuration(r.duration_ms) : '—'}</span>
        <span style="color:var(--ink-soft);">${date}</span>
      </div>`;
    }).join('');
    return `<div class="tool-shell" style="margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;">${escapeHtml(name)}</strong>
      <div style="margin-top:8px;">${rows}</div>
    </div>`;
  }).join('');
}

async function renderSupervisionCeb(){
  const el = document.getElementById('supervisionCebContent');
  if(!el) return;
  if(!currentClassId){ el.innerHTML = 'Choisissez une classe dans le menu compte pour voir ses résultats.'; return; }
  el.innerHTML = 'Chargement…';
  const { data, error } = await sb.from('ceb_results')
    .select('target,result_value,gap,success,timed,timer_duration,time_used_ms,expression,created_at,profiles(nom,email)')
    .eq('class_id', currentClassId)
    .order('created_at', {ascending:false});
  if(error){ el.innerHTML = "Erreur : "+error.message; return; }
  if(!data || !data.length){ el.innerHTML = "Aucun résultat du compte est bon pour cette classe pour le moment."; return; }
  const nameOf = r => (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Élève inconnu';
  const byStudent = {};
  data.forEach(r=>{ const name=nameOf(r); byStudent[name] = byStudent[name] || []; byStudent[name].push(r); });
  el.innerHTML = Object.keys(byStudent).sort().map(name=>{
    const results = byStudent[name];
    const forMode = timed => results.filter(r=>r.timed===timed);
    const statLine = (label, rows) => {
      if(!rows.length) return '';
      const succ = rows.filter(r=>r.success).length;
      const pct = Math.round(100*succ/rows.length);
      return `<div style="display:flex;justify-content:space-between;gap:12px;padding:3px 0;">
        <span>${label}</span>
        <span style="font-weight:700;color:${pct>=70?'#1F6B3A':pct>=40?'#8A4210':'#9E1F5E'};">${succ}/${rows.length} réussies (${pct}%)</span>
      </div>`;
    };
    const recentRows = results.slice(0,5).map(r=>{
      const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
      return `<div style="display:flex;justify-content:space-between;gap:12px;padding:2px 0;font-size:.82rem;color:var(--ink-soft);">
        <span>${r.success ? '🎯 exact' : `à ${r.gap} près`} (cible ${r.target})</span>
        <span>${r.timed ? '⏱ chrono' : 'illimité'}</span>
        <span>${date}</span>
      </div>`;
    }).join('');
    return `<div class="tool-shell" style="margin-bottom:14px;">
      <strong style="font-family:'Space Grotesk',sans-serif;">${escapeHtml(name)}</strong>
      <div style="margin-top:8px;">
        ${statLine('Illimité', forMode(false))}
        ${statLine('Chronométré', forMode(true))}
      </div>
      <div style="margin-top:8px;padding-top:8px;border-top:1px dashed rgba(28,43,57,.12);">${recentRows}</div>
    </div>`;
  }).join('');
}

let mesResultatsData = [];
async function renderMesResultats(){
  const el = document.getElementById('mesResultatsContent');
  if(!el || !currentUser) return;
  el.innerHTML = 'Chargement…';
  const { data, error } = await sb.from('cm_results')
    .select('score,total,sequence_label,created_at,duration_ms')
    .eq('student_id', currentUser.id)
    .order('created_at', {ascending:false});
  if(error){ el.innerHTML = "Erreur : "+error.message; return; }
  mesResultatsData = data || [];
  const selExo = document.getElementById('mesResFilterExercice');
  if(selExo){
    const prev = selExo.value;
    const exercices = Array.from(new Set(mesResultatsData.map(r=>r.sequence_label||'—'))).sort();
    selExo.innerHTML = '<option value="">Tous les exercices</option>' + exercices.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
    if(exercices.includes(prev)) selExo.value = prev;
  }
  renderMesResultatsFiltered();
}
function resetMesResultatsFilters(){
  ['mesResFilterExercice','mesResFilterFrom','mesResFilterTo'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
  renderMesResultatsFiltered();
}
function renderMesResultatsFiltered(){
  const el = document.getElementById('mesResultatsContent');
  if(!el) return;
  if(!mesResultatsData.length){ el.innerHTML = "Vous n'avez pas encore fait d'exercice d'automatismes."; return; }
  const exoFilter = document.getElementById('mesResFilterExercice').value;
  const fromFilter = document.getElementById('mesResFilterFrom').value;
  const toFilter = document.getElementById('mesResFilterTo').value;
  const filtered = mesResultatsData.filter(r=>{
    if(exoFilter && (r.sequence_label||'—')!==exoFilter) return false;
    const d = (r.created_at||'').slice(0,10);
    if(fromFilter && d<fromFilter) return false;
    if(toFilter && d>toFilter) return false;
    return true;
  });
  if(!filtered.length){ el.innerHTML = 'Aucun résultat pour ce filtre.'; return; }
  const totalScore = filtered.reduce((s,r)=>s+r.score,0), totalMax = filtered.reduce((s,r)=>s+r.total,0);
  const avg = totalMax ? Math.round(100*totalScore/totalMax) : 0;
  const rows = filtered.map(r=>{
    const pct = Math.round(100*r.score/r.total);
    const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
    const perfect = r.score===r.total;
    return `<div style="display:flex;justify-content:space-between;gap:12px;padding:4px 0;">
      <span>${escapeHtml(r.sequence_label||'—')}</span>
      <span style="font-weight:700;color:${pct>=70?'#1F6B3A':pct>=40?'#8A4210':'#9E1F5E'};">${r.score}/${r.total}</span>
      <span style="color:var(--ink-soft);font-family:'JetBrains Mono',monospace;font-size:.82rem;">${perfect && r.duration_ms!=null ? formatDuration(r.duration_ms) : '—'}</span>
      <span style="color:var(--ink-soft);">${date}</span>
    </div>`;
  }).join('');
  el.innerHTML = `<p class="hint" style="margin:0 0 10px;">Moyenne sur cette sélection : <b>${avg}%</b> (${filtered.length} exercice(s))</p>
    <div class="tool-shell">${rows}</div>`;
}

function isSyncEnabled(){ return !!currentClassId; }
async function syncFetchAll(){
  if(!currentClassId) return null;
  const { data, error } = await sb.from('cahier_entries').select('*').eq('class_id', currentClassId).order('date');
  if(error){ console.error('sync fetch failed', error); return null; }
  return data;
}
async function syncAddEntry(entry){
  if(!currentClassId) return {ok:false, offline:true};
  const { data, error } = await sb.from('cahier_entries').insert({ ...entry, class_id: currentClassId }).select().single();
  if(error) return {ok:false, error: error.message.includes('row-level security') ? "vous n'êtes pas assigné à cette classe." : error.message};
  return {ok:true, id:data.id};
}
async function syncRemoveEntry(id){
  if(!id) return {ok:false, offline:true};
  const { error } = await sb.from('cahier_entries').delete().eq('id', id);
  if(error) return {ok:false, error: error.message};
  return {ok:true};
}

/* ================= PANNEAU ADMINISTRATEUR ================= */
async function adminCreateAccount(){
  const identifiant = document.getElementById('adminNewEmail').value.trim();
  const password = document.getElementById('adminNewPassword').value;
  const nom = document.getElementById('adminNewNom').value.trim();
  const uai = document.getElementById('adminNewUai').value.trim();
  const role = document.getElementById('adminNewRole').value;
  const status = document.getElementById('adminAccountStatus');
  if(!identifiant || !password){ status.textContent = 'Identifiant et mot de passe requis.'; return; }
  const email = toAuthEmail(identifiant);
  status.textContent = 'Création en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ email, password, role, nom: nom || identifiant }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    if(uai){
      // L'UAI n'est pas géré par la fonction de création de compte : on le renseigne à part,
      // juste après, en retrouvant le profil fraîchement créé par son e-mail.
      const { data: prof } = await sb.from('profiles').select('id').eq('email', email).single();
      if(prof) await sb.from('profiles').update({uai}).eq('id', prof.id);
    }
    status.textContent = '✓ Compte créé ('+role+').';
    document.getElementById('adminNewEmail').value=''; document.getElementById('adminNewPassword').value=''; document.getElementById('adminNewNom').value=''; document.getElementById('adminNewUai').value='';
    await adminRefreshDropdowns();
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
let resetPasswordTargetUserId = null;
let editProfTargetId = null, editProfTargetName = '';
async function openEditProfModal(id){
  editProfTargetId = id;
  document.getElementById('editProfModalOverlay').style.display='flex';
  document.getElementById('editProfStatus').textContent = '';
  document.getElementById('editProfClassesList').innerHTML = 'Chargement…';
  const { data: prof, error } = await sb.from('profiles').select('*').eq('id', id).single();
  if(error){ document.getElementById('editProfStatus').textContent = 'Erreur : '+error.message; return; }
  editProfTargetName = (prof.nom||prof.email||'').replace(/'/g,"\\'");
  document.getElementById('editProfNom').value = prof.nom||'';
  document.getElementById('editProfPrenom').value = prof.prenom||'';
  document.getElementById('editProfUai').value = prof.uai||'';
  const loginIdentifiant = prof.email ? (prof.email.endsWith('@mathcollege.local') ? prof.email.slice(0, -('@mathcollege.local'.length)) : prof.email) : '(inconnu)';
  document.getElementById('editProfIdentifiantDisplay').textContent = loginIdentifiant;
  await renderEditProfClasses(prof);
}
/* Classes "de l'établissement" : celles enseignées par au moins un collègue partageant le même
   UAI que ce prof (à défaut d'UAI renseigné, on affiche toutes les classes). Coche celles déjà
   liées à CE prof précisément. */
async function renderEditProfClasses(prof){
  const box = document.getElementById('editProfClassesList');
  const { data: allClasses } = await sb.from('classes').select('id,nom,niveau').order('nom');
  const { data: myLinks } = await sb.from('class_teachers').select('class_id').eq('teacher_id', prof.id);
  const myClassIds = new Set((myLinks||[]).map(l=>l.class_id));
  let relevantClassIds = null; // null = pas de filtre (toutes les classes)
  if(prof.uai){
    const { data: colleagues } = await sb.from('profiles').select('id').eq('uai', prof.uai).in('role',['prof','admin']);
    const colleagueIds = (colleagues||[]).map(c=>c.id);
    if(colleagueIds.length){
      const { data: links } = await sb.from('class_teachers').select('class_id').in('teacher_id', colleagueIds);
      relevantClassIds = new Set((links||[]).map(l=>l.class_id));
      myClassIds.forEach(id=>relevantClassIds.add(id)); // garder aussi ses classes actuelles, même si isolées
    }
  }
  const classes = relevantClassIds ? (allClasses||[]).filter(c=>relevantClassIds.has(c.id)) : (allClasses||[]);
  if(!classes.length){ box.innerHTML = '<span class="hint">Aucune classe trouvée.</span>'; return; }
  box.innerHTML = classes.map(c=>`
    <label style="display:inline-flex;align-items:center;gap:5px;background:rgba(28,43,57,.04);padding:5px 10px;border-radius:20px;font-size:.85rem;cursor:pointer;">
      <input type="checkbox" class="editProfClassCheck" value="${c.id}" ${myClassIds.has(c.id)?'checked':''}> ${escapeHtml(c.nom)} (${escapeHtml(c.niveau)})
    </label>
  `).join('');
}
function closeEditProfModal(){ document.getElementById('editProfModalOverlay').style.display='none'; }
async function saveEditProfModal(){
  const status = document.getElementById('editProfStatus');
  status.textContent = 'Enregistrement…';
  const nom = document.getElementById('editProfNom').value.trim();
  const prenom = document.getElementById('editProfPrenom').value.trim();
  const uai = document.getElementById('editProfUai').value.trim();
  const { error } = await sb.from('profiles').update({nom, prenom, uai: uai||null}).eq('id', editProfTargetId);
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  // Classes cochées/décochées : on aligne class_teachers sur l'état actuel des cases.
  const checked = new Set(Array.from(document.querySelectorAll('.editProfClassCheck:checked')).map(el=>el.value));
  const all = Array.from(document.querySelectorAll('.editProfClassCheck')).map(el=>el.value);
  const { data: myLinks } = await sb.from('class_teachers').select('class_id').eq('teacher_id', editProfTargetId);
  const current = new Set((myLinks||[]).map(l=>l.class_id));
  const toAdd = all.filter(id=>checked.has(id) && !current.has(id));
  const toRemove = all.filter(id=>!checked.has(id) && current.has(id));
  if(toAdd.length) await sb.from('class_teachers').insert(toAdd.map(class_id=>({class_id, teacher_id: editProfTargetId})));
  if(toRemove.length) await sb.from('class_teachers').delete().eq('teacher_id', editProfTargetId).in('class_id', toRemove);
  status.textContent = '✓ Enregistré';
  await adminRefreshListings();
  setTimeout(closeEditProfModal, 600);
}
function adminResetPasswordPrompt(userId, name){
  resetPasswordTargetUserId = userId;
  document.getElementById('resetPasswordModalName').textContent = 'Compte : '+name;
  document.getElementById('resetPasswordModalInput').value = '';
  document.getElementById('resetPasswordModalStatus').textContent = '';
  document.getElementById('resetPasswordModalOverlay').style.display='flex';
}
function closeResetPasswordModal(){
  document.getElementById('resetPasswordModalOverlay').style.display='none';
}
async function adminConfirmResetPassword(){
  const newPassword = document.getElementById('resetPasswordModalInput').value;
  const status = document.getElementById('resetPasswordModalStatus');
  if(!newPassword || newPassword.length<6){ status.textContent = 'Mot de passe trop court (6 caractères minimum).'; return; }
  status.textContent = 'En cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'reset-password', userId: resetPasswordTargetUserId, newPassword }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = '✓ Mot de passe réinitialisé.';
    setTimeout(closeResetPasswordModal, 1200);
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
let changeIdentifiantTargetUserId = null;
function adminChangeIdentifiantPrompt(userId, name){
  changeIdentifiantTargetUserId = userId;
  document.getElementById('changeIdentifiantModalName').textContent = 'Compte : '+name;
  document.getElementById('changeIdentifiantModalInput').value = '';
  document.getElementById('changeIdentifiantModalStatus').textContent = '';
  document.getElementById('changeIdentifiantModalOverlay').style.display='flex';
}
function closeChangeIdentifiantModal(){
  document.getElementById('changeIdentifiantModalOverlay').style.display='none';
}
async function adminConfirmChangeIdentifiant(){
  const raw = document.getElementById('changeIdentifiantModalInput').value.trim();
  const status = document.getElementById('changeIdentifiantModalStatus');
  if(!raw){ status.textContent = 'Entrez un identifiant.'; return; }
  const newEmail = toAuthEmail(raw);
  status.textContent = 'En cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'update-email', userId: changeIdentifiantTargetUserId, newEmail }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = '✓ Identifiant modifié.';
    await adminRefreshListings();
    setTimeout(closeChangeIdentifiantModal, 1200);
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
async function adminDeleteUser(userId, btn){
  if(btn.dataset.armed!=='1'){
    btn.dataset.armed='1';
    btn.dataset.origText = btn.textContent;
    btn.textContent = 'Confirmer ?';
    setTimeout(()=>{ if(btn.isConnected){ btn.dataset.armed=''; btn.textContent=btn.dataset.origText; } }, 2500);
    return;
  }
  btn.disabled = true;
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'delete', userId }),
    });
    const data = await res.json();
    if(data.error){ alert("Erreur : "+data.error); btn.disabled=false; return; }
    await adminRefreshDropdowns();
  }catch(err){ alert('Erreur réseau : '+err.message); btn.disabled=false; }
}
async function adminSyncEmails(){
  const status = document.getElementById('adminSyncEmailsStatus');
  status.textContent = 'Réparation en cours…';
  const { data:{ session } } = await sb.auth.getSession();
  try{
    const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
      method:'POST',
      headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
      body: JSON.stringify({ action:'sync-emails' }),
    });
    const data = await res.json();
    if(data.error){ status.textContent = "Erreur : "+data.error; return; }
    status.textContent = `✓ ${data.updated} identifiant(s) mis à jour.`;
    await adminRefreshListings();
  }catch(err){ status.textContent = 'Erreur réseau : '+err.message; }
}
async function adminCreateClass(){
  const nom = document.getElementById('adminNewClassNom').value.trim();
  const niveau = document.getElementById('adminNewClassNiveau').value;
  const status = document.getElementById('adminClassStatus');
  if(!nom){ status.textContent = 'Le nom est requis.'; return; }
  const { error } = await sb.from('classes').insert({ nom, niveau });
  status.textContent = error ? "Erreur : "+error.message : '✓ Classe créée.';
  if(!error){ document.getElementById('adminNewClassNom').value=''; await adminRefreshDropdowns(); await loadMyClasses(); }
}
async function adminRefreshDropdowns(){
  const { data: profs } = await sb.from('profiles').select('id,nom,role').in('role',['prof','admin']);
  const { data: eleves } = await sb.from('profiles').select('id,nom').eq('role','eleve');
  const { data: classesList } = await sb.from('classes').select('id,nom,niveau').order('nom');
  const fillSelect = (id, items, label)=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = `<option value="">— ${label} —</option>` + items.map(it=>`<option value="${it.id}">${it.label}</option>`).join('');
  };
  fillSelect('adminAssignTeacherSelect', (profs||[]).map(p=>({id:p.id, label:escapeHtml(p.nom||p.id)+(p.role==='admin'?' (admin)':'')})), 'Choisir un prof');
  fillSelect('adminAssignStudentSelect', (eleves||[]).map(p=>({id:p.id, label:escapeHtml(p.nom||p.id)})), 'Choisir un élève');
  fillSelect('adminAssignTeacherClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  fillSelect('adminAssignStudentClassSelect', (classesList||[]).map(c=>({id:c.id, label:escapeHtml(c.nom)+' ('+escapeHtml(c.niveau)+')'})), 'Choisir une classe');
  await adminRefreshListings();
}
async function adminRefreshListings(){
  await adminRefreshAIUsage();
  await adminRefreshBugReports();
  const { data: profs } = await sb.from('profiles').select('id,nom,email,role').in('role',['prof','admin']).order('nom');
  const { data: eleves } = await sb.from('profiles').select('id,nom,email,role').eq('role','eleve').order('nom');
  const accEl = document.getElementById('adminAccountsListing');
  if(accEl){
    const loginIdentifiant = email => email ? (email.endsWith('@mathcollege.local') ? email.slice(0, -('@mathcollege.local'.length)) : email) : '(inconnu)';
    const rowHTML = p => {
      const label = escapeHtml(p.nom||'(sans nom)') + ' — <b>identifiant :</b> ' + escapeHtml(loginIdentifiant(p.email)) + (p.role==='admin'?' [admin]':'');
      const safeName = escapeHtml(p.nom||p.email||'').replace(/'/g,"\\'");
      const editBtn = (p.role==='prof'||p.role==='admin') ? `<button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="openEditProfModal('${p.id}')">🛠️ Modifier</button>` : '';
      return `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:5px 0;border-bottom:1px solid rgba(28,43,57,.06);">
        <span>${label}</span>
        <span style="display:flex;gap:6px;flex:none;">
          ${editBtn}
          <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminChangeIdentifiantPrompt('${p.id}','${safeName}')">✏️ Identifiant</button>
          <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;" onclick="adminResetPasswordPrompt('${p.id}','${safeName}')">🔑 Réinitialiser</button>
          <button class="btn secondary" style="font-size:.72rem;padding:4px 8px;color:#a83c1f;" onclick="adminDeleteUser('${p.id}', this)">🗑️ Supprimer</button>
        </span>
      </div>`;
    };
    accEl.innerHTML =
      `<b>Profs/admins (${(profs||[]).length})</b>` + ((profs||[]).length ? (profs||[]).map(rowHTML).join('') : '<div class="hint">aucun</div>') +
      `<div style="margin-top:12px;"><b>Élèves (${(eleves||[]).length})</b></div>` + ((eleves||[]).length ? (eleves||[]).map(rowHTML).join('') : '<div class="hint">aucun</div>');
  }
  const { data: classesList } = await sb.from('classes').select('id,nom,niveau').order('nom');
  const { data: classTeachers } = await sb.from('class_teachers').select('class_id, profiles(nom,email)');
  const { data: classStudents } = await sb.from('class_students').select('class_id, profiles(nom,email)');
  const { data: permisSessionsList } = await sb.from('permis_rapporteur_sessions').select('id,code,classe_id,cloturee,created_at').order('created_at',{ascending:false});
  const classesEl = document.getElementById('adminClassesListing');
  if(classesEl){
    if(!classesList || !classesList.length){ classesEl.textContent = 'Aucune classe créée pour l\'instant.'; return; }
    classesEl.innerHTML = classesList.map(c=>{
      const profsHere = (classTeachers||[]).filter(r=>r.class_id===c.id).map(r=>r.profiles && (r.profiles.nom||r.profiles.email)).filter(Boolean);
      const elevesHere = (classStudents||[]).filter(r=>r.class_id===c.id).map(r=>r.profiles && (r.profiles.nom||r.profiles.email)).filter(Boolean);
      const sessionsHere = (permisSessionsList||[]).filter(s=>s.classe_id===c.id);
      const sessionsHtml = sessionsHere.length ? sessionsHere.map(s=>`
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
          <span style="font-family:'JetBrains Mono',monospace;font-weight:700;${s.cloturee?'text-decoration:line-through;color:var(--ink-soft);':'color:var(--accent);'}">${escapeHtml(s.code)}</span>
          <span class="hint" style="margin:0;">${s.cloturee?'clôturée':'active'}</span>
          ${s.cloturee?'':`<button class="btn secondary" style="padding:3px 10px;font-size:.75rem;" onclick="adminCloturerPermisSession('${s.id}')">Clôturer</button>`}
        </div>`).join('') : '<p class="hint" style="margin:4px 0 0;">Aucune session pour l\'instant.</p>';
      return `<div style="margin-bottom:14px;"><b>${escapeHtml(c.nom)}</b> (${escapeHtml(c.niveau)})<br>
        Profs : ${profsHere.map(escapeHtml).join(', ')||'aucun'}<br>
        Élèves (${elevesHere.length}) : ${elevesHere.map(escapeHtml).join(', ')||'aucun'}
        <div style="margin-top:6px;padding:8px;background:rgba(31,58,92,.05);border-radius:6px;">
          <b style="font-size:.85rem;">🎓 Permis Rapporteur</b>
          <button class="btn secondary" style="padding:3px 10px;font-size:.75rem;float:right;" onclick="adminDemarrerPermisSession('${c.id}')">+ Nouvelle session</button>
          ${sessionsHtml}
        </div></div>`;
    }).join('');
  }
}
function arGenererCodeSession(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sans lettres/chiffres ambigus (0/O, 1/I...)
  let code = '';
  for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}
async function adminDemarrerPermisSession(classId){
  const code = arGenererCodeSession();
  const { error } = await sb.from('permis_rapporteur_sessions').insert({
    code, classe_id: classId, prof_id: currentUser ? currentUser.id : null,
  });
  if(error){ alert("Échec : "+error.message); return; }
  await adminRefreshDropdowns();
}
async function adminCloturerPermisSession(sessionId){
  await sb.from('permis_rapporteur_sessions').update({cloturee:true}).eq('id', sessionId);
  await adminRefreshDropdowns();
}
async function adminRefreshBugReports(){
  const el = document.getElementById('adminBugReportsListing');
  if(!el) return;
  el.textContent = 'Chargement…';
  const { data, error } = await sb.from('bug_reports')
    .select('id,created_at,section,chapitre,message,build_version,status,report_type,profiles(nom,email)')
    .order('created_at', {ascending:false})
    .limit(300);
  if(error){ el.textContent = "Erreur : "+error.message; return; }
  if(!data || !data.length){ el.textContent = "Aucun signalement pour l'instant."; return; }
  const STATUS_OPTIONS = ['nouveau','en cours','résolu'];
  el.innerHTML = data.map(r=>{
    const name = (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Utilisateur inconnu';
    const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
    const statusColor = r.status==='résolu' ? 'var(--accent-green, #1F6B3A)' : r.status==='en cours' ? 'var(--accent-orange)' : 'var(--accent)';
    const typeTag = r.report_type==='suggestion' ? '<span style="background:#FFF4E5;color:#B26A00;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;">💡 Suggestion</span>' : '<span style="background:#FDEAEA;color:#B23A3A;border-radius:4px;padding:1px 7px;font-size:.75rem;font-weight:600;margin-right:6px;">🐞 Bug</span>';
    return `<div class="bug-report-row" style="border:1px solid rgba(28,43,57,.12);border-radius:8px;padding:10px 12px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:4px;">
        <span>${typeTag}<b>${escapeHtml(r.section)}</b>${r.chapitre?' — '+escapeHtml(r.chapitre):''}</span>
        <span style="color:var(--ink-soft);font-size:.85rem;">${escapeHtml(name)} · ${date}${r.build_version?' · build '+escapeHtml(r.build_version):''}</span>
      </div>
      <div style="margin:6px 0;white-space:pre-wrap;">${escapeHtml(r.message)}</div>
      <label class="hint" style="display:inline-flex;align-items:center;gap:6px;">
        Statut :
        <select onchange="adminUpdateBugStatus('${r.id}', this.value)" style="color:${statusColor};font-weight:600;">
          ${STATUS_OPTIONS.map(s=>`<option value="${s}" ${s===r.status?'selected':''}>${s}</option>`).join('')}
        </select>
      </label>
    </div>`;
  }).join('');
}
async function adminUpdateBugStatus(id, status){
  const { data, error } = await sb.from('bug_reports').update({status}).eq('id', id).select();
  if(error){
    alert("Échec de l'enregistrement du statut : "+error.message);
    await adminRefreshBugReports();
    return;
  }
  if(!data || !data.length){
    alert("Le statut n'a pas été enregistré (0 ligne modifiée en base). C'est très probablement une policy Supabase (RLS) qui bloque la mise à jour pour ce compte -- il faudra vérifier la policy UPDATE de la table bug_reports.");
    await adminRefreshBugReports();
    return;
  }
  await adminRefreshBugReports();
}
async function adminRefreshAIUsage(){
  const el = document.getElementById('adminAIUsageListing');
  if(!el) return;
  const { data, error } = await sb.from('ai_usage_log')
    .select('feature,chapitre,niveau,created_at,profiles(nom,email)')
    .order('created_at', {ascending:false})
    .limit(200);
  if(error){ el.textContent = "Erreur : "+error.message; return; }
  if(!data || !data.length){ el.textContent = "Aucune utilisation de l'IA enregistrée pour l'instant."; return; }
  el.innerHTML = data.map(r=>{
    const name = (r.profiles && (r.profiles.nom || r.profiles.email)) || 'Utilisateur inconnu';
    const date = new Date(r.created_at).toLocaleString('fr-FR', {day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'});
    const featureLabel = r.feature==='quiz' ? 'Quiz généré' : r.feature==='figure' ? 'Figure interprétée' : (r.feature||'—');
    return `<div style="display:flex;justify-content:space-between;gap:12px;padding:3px 0;">
      <span>${escapeHtml(name)}</span>
      <span>${escapeHtml(featureLabel)}${r.chapitre?' — '+escapeHtml(r.chapitre):''}</span>
      <span style="color:var(--ink-soft);">${date}</span>
    </div>`;
  }).join('');
}
async function adminBulkCreateStudents(){
  const raw = document.getElementById('adminBulkStudents').value;
  const status = document.getElementById('adminBulkStatus');
  const lines = raw.split('\n').map(l=>l.trim()).filter(Boolean);
  if(!lines.length){ status.textContent = 'Collez au moins une ligne (identifiant, tabulation, mot de passe).'; return; }
  const { data:{ session } } = await sb.auth.getSession();
  let ok=0, fail=0; const errors=[];
  for(let i=0;i<lines.length;i++){
    status.textContent = `Création en cours… (${i+1}/${lines.length})`;
    const parts = lines[i].split('\t').map(s=>s.trim()).filter(s=>s!=='');
    if(parts.length<2){ fail++; errors.push(`Ligne ${i+1} : format invalide (identifiant [tabulation] mot de passe attendus)`); continue; }
    const [identifiant, password] = parts;
    const email = toAuthEmail(identifiant);
    try{
      const res = await fetch(SUPABASE_URL+'/functions/v1/admin-create-user', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'Authorization': 'Bearer '+session.access_token },
        body: JSON.stringify({ email, password, role:'eleve', nom: identifiant }),
      });
      const data = await res.json();
      if(data.error){ fail++; errors.push(`${identifiant} : ${data.error}`); }
      else ok++;
    }catch(err){ fail++; errors.push(`${identifiant} : erreur réseau`); }
  }
  status.innerHTML = `✓ ${ok} compte(s) créé(s)` + (fail?`, ⚠️ ${fail} échec(s) :<br>`+errors.map(escapeHtml).join('<br>') : '.');
  if(ok) document.getElementById('adminBulkStudents').value='';
  await adminRefreshDropdowns();
}
async function adminAssignTeacher(){
  const teacher_id = document.getElementById('adminAssignTeacherSelect').value;
  const class_id = document.getElementById('adminAssignTeacherClassSelect').value;
  const status = document.getElementById('adminAssignTeacherStatus');
  if(!teacher_id || !class_id){ status.textContent = 'Choisissez un prof et une classe.'; return; }
  const { error } = await sb.from('class_teachers').insert({ teacher_id, class_id });
  status.textContent = error ? "Erreur : "+error.message : '✓ Associé.';
  if(!error) await adminRefreshListings();
}
async function adminAssignStudent(){
  const student_id = document.getElementById('adminAssignStudentSelect').value;
  const class_id = document.getElementById('adminAssignStudentClassSelect').value;
  const status = document.getElementById('adminAssignStudentStatus');
  if(!student_id || !class_id){ status.textContent = 'Choisissez un élève et une classe.'; return; }
  const { error } = await sb.from('class_students').insert({ student_id, class_id });
  status.textContent = error ? "Erreur : "+error.message : '✓ Associé.';
  if(!error) await adminRefreshListings();
}

/* ================= CÔTÉ ÉLÈVE : classes ================= */
async function loadMyStudentClasses(){
  if(!currentUser) return;
  const { data, error } = await sb.from('class_students').select('classes(id,nom,niveau)').eq('student_id', currentUser.id);
  const classesList = (data||[]).map(row=>row.classes).filter(Boolean);
  populateAccountClassList(classesList);
  if(!currentClassId || !accountClassesList.some(c=>c.id===currentClassId)){
    currentClassId = classesList[0] ? classesList[0].id : null;
  }
  await applyClassSelection();
  if(error) console.error(error);
}

/* ======================= CAHIER DE CORRECTIONS (persisté, groupé par jour) ======================= */
function loadCahier(){
  try{ const raw=localStorage.getItem('mathcollege_cahier'); return raw?JSON.parse(raw):[]; }
  catch(e){ return []; }
}
function saveCahier(){
  try{ localStorage.setItem('mathcollege_cahier', JSON.stringify(cahier)); }catch(e){ /* stockage indisponible dans ce contexte */ }
}
let cahier = loadCahier();
let editingIndex = null;
function sortCahierInPlace(){ cahier.sort((a,b)=> (a.date||'').localeCompare(b.date||'')); }

async function addToCahier(){
  if(!currentClassId){ niceAlert("Sélectionnez d'abord une classe active (boutons en haut de page)."); return; }
  const textareaVisible = document.getElementById('correctionInputWrap').style.display !== 'none';
  const raw = textareaVisible ? document.getElementById('correctionInput').value.trim() : '';
  const figureHtml = blocksRowsHTML('global', corRows, false, corCellBorders);
  if(!raw && !(blocksStores['global']||[]).length) return; // rien à sauvegarder
  const entry = {
    niveau: document.getElementById('corNiveau').value,
    chapitre: document.getElementById('corChapitre').value,
    exo: document.getElementById('corExoNum').value || '—',
    titre: document.getElementById('corTitre').value.trim(),
    date: document.getElementById('corDate').value || todayISO(),
    raw: raw,
    figure: figureHtml,
    blocksData: JSON.parse(JSON.stringify(blocksStores['global']||[])),
    rows: JSON.parse(JSON.stringify(corRows)),
    cellBorders: JSON.parse(JSON.stringify(corCellBorders)),
  };
  let oldServerId = null;
  if(editingIndex!==null){
    oldServerId = cahier[editingIndex].id || null;
    cahier[editingIndex] = entry;
    editingIndex = null;
    document.getElementById('btnAddCahier').textContent = '+ Ajouter au cahier de corrections';
    document.getElementById('btnCancelEdit').style.display = 'none';
  } else {
    cahier.push(entry);
  }
  sortCahierInPlace();
  saveCahier();
  renderCahier();
  clearCorrectionInput();
  if(isSyncEnabled()){
    if(oldServerId) await syncRemoveEntry(oldServerId);
    const res = await syncAddEntry(entry);
    if(res.ok){ entry.id = res.id; saveCahier(); renderCahier(); }
    else if(!res.offline){ alert("⚠️ Enregistré localement, mais échec de synchronisation avec le serveur : "+(res.error||'erreur inconnue')+". Vérifiez l'adresse du script et le code secret dans la configuration de synchronisation."); }
  }
}
function editCahierEntry(i){
  const e = cahier[i];
  document.getElementById('corNiveau').value = e.niveau;
  fillCorChapitres();
  document.getElementById('corChapitre').value = e.chapitre;
  document.getElementById('corExoNum').value = e.exo==='—'?'':e.exo;
  document.getElementById('corTitre').value = e.titre||'';
  document.getElementById('corDate').value = e.date||todayISO();
  const hasText = !!(e.raw && e.raw.trim());
  document.getElementById('correctionInput').value = e.raw||'';
  document.getElementById('correctionInputWrap').style.display = hasText ? 'block' : 'none';
  document.getElementById('btnCorAddTextarea').style.display = hasText ? 'none' : 'inline-flex';
  if(e.blocksData){
    // Entrée enregistrée avec la structure des blocs (depuis ce correctif) : tout redevient
    // modifiable normalement (déplacer, éditer, supprimer bloc par bloc).
    blocksStores['global'] = JSON.parse(JSON.stringify(e.blocksData));
    corRows = e.rows ? JSON.parse(JSON.stringify(e.rows)) : [1];
    corCellBorders = e.cellBorders ? JSON.parse(JSON.stringify(e.cellBorders)) : {};
  } else if(e.figure){
    // Ancienne entrée, enregistrée avant ce correctif : seul le rendu final avait été gardé,
    // pas la structure -- affiché tel quel, mais non détaillable bloc par bloc.
    blocksStores['global'] = [{id: pendingBlockNextId++, type:'legacy', html: e.figure, data:null, editFn:null, row:0, col:0}];
    corRows = [1];
    corCellBorders = {};
  } else {
    blocksStores['global'] = [];
    corRows = [1];
    corCellBorders = {};
  }
  renderCorrectionPreview();
  editingIndex = i;
  document.getElementById('btnAddCahier').textContent = '💾 Enregistrer la modification';
  document.getElementById('btnCancelEdit').style.display = 'inline-block';
  document.getElementById('correctionForm').scrollIntoView({behavior:'smooth', block:'start'});
  document.getElementById('correctionInput').focus();
}
function cancelEditCahier(){
  editingIndex = null;
  document.getElementById('btnAddCahier').textContent = '+ Ajouter au cahier de corrections';
  document.getElementById('btnCancelEdit').style.display = 'none';
  clearCorrectionInput();
}
function clearCorrectionInput(){
  document.getElementById('correctionInput').value='';
  document.getElementById('corExoNum').value='';
  document.getElementById('corTitre').value='';
  blocksStores['global'] = [];
  corRows = [1];
  corCellBorders = {};
  if(corValidated) corToggleValidated();
  renderCorrectionPreview();
}

/* ============================================================
   CRÉER UNE ÉVALUATION
   -----------------------------------------------------------
   Première version : cadrage (niveau, chapitres, durée, nombre
   d'exercices, question de cours), génération des ÉNONCÉS par IA
   (réutilise callClaude, déjà utilisé pour l'interprétation de
   figures), et export PDF de la feuille à distribuer aux élèves.
   Les énoncés profitent de la même mise en forme automatique que
   l'outil de correction (renderMathText : fractions, exposants,
   variables...). Les ajouts (figure/tableau/division/repère...) et
   la mise en page multi-colonnes par exercice ne sont pas encore
   câblés ici : à construire dans une prochaine session.
   ============================================================ */
let evaluationExercises = [];
let currentEvaluationId = null;

/* Sauvegarde/chargement/partage : réutilise le compte prof déjà connecté (currentUser, sb).
   Une évaluation sauvegardée peut être rouverte par son propriétaire, ou par un collègue à qui
   elle a été explicitement partagée (table evaluations, RLS + collaborators côté serveur). */
let lastEvaluationTitle = null;
async function saveEvaluation(){
  if(!currentUser){ await niceAlert("Connectez-vous (en tant que professeur) pour sauvegarder cette évaluation."); return; }
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de sauvegarder."); return; }
  const defaultTitle = lastEvaluationTitle || document.getElementById('evalClasses').value.trim() || ('Évaluation '+document.getElementById('evalNiveau').value);
  const title = await nicePrompt("Titre de cette évaluation (pour la retrouver dans « Mes évaluations ») :", defaultTitle);
  if(title===null) return;
  lastEvaluationTitle = title || defaultTitle;
  const relevantBlocks = {};
  evaluationExercises.forEach(ex=>{ const k='ex-'+ex.id; if(blocksStores[k]) relevantBlocks[k]=blocksStores[k]; });
  const payload = {
    title: title || defaultTitle,
    niveau: document.getElementById('evalNiveau').value,
    classes: document.getElementById('evalClasses').value,
    eval_date: document.getElementById('evalDate').value || null,
    duree: parseInt(document.getElementById('evalDuree').value) || null,
    data: { evaluationExercises, blocksStores: relevantBlocks, evalType: document.getElementById('evalType').value, evalTypeCustom: document.getElementById('evalTypeCustom').value },
  };
  const statusEl = document.getElementById('evalSaveStatus');
  statusEl.textContent = "Sauvegarde en cours…";
  try{
    if(currentEvaluationId){
      const { error } = await sb.from('evaluations').update({...payload, updated_at: new Date().toISOString()}).eq('id', currentEvaluationId);
      if(error) throw error;
    } else {
      const { data, error } = await sb.from('evaluations').insert({...payload, owner_id: currentUser.id}).select().single();
      if(error) throw error;
      currentEvaluationId = data.id;
    }
    statusEl.textContent = "✓ Sauvegardé";
  }catch(e){
    statusEl.textContent = '';
    await niceAlert("Échec de la sauvegarde : "+(e.message||'erreur inconnue'));
  }
}
async function openEvalListModal(){
  if(!currentUser){ await niceAlert("Connectez-vous pour voir vos évaluations sauvegardées."); return; }
  document.getElementById('evalListModalOverlay').style.display='flex';
  const box = document.getElementById('evalListContent');
  box.innerHTML = 'Chargement…';
  const { data, error } = await sb.from('evaluations').select('id,title,niveau,classes,eval_date,owner_id,collaborators,viewers,updated_at').order('updated_at', {ascending:false});
  if(error){ box.innerHTML = "Erreur : "+error.message; return; }
  if(!data || !data.length){ box.innerHTML = "Aucune évaluation sauvegardée pour le moment."; return; }
  box.innerHTML = data.map(e=>{
    const isMine = e.owner_id===currentUser.id;
    const shareTag = isMine ? '' : (e.collaborators||[]).includes(currentUser.id) ? '<span class="hint">(partagée — ✏️ éditeur)</span>' : '<span class="hint">(partagée — 👁️ lecteur)</span>';
    const dateFmt = e.eval_date ? new Date(e.eval_date+'T00:00:00').toLocaleDateString('fr-FR') : '';
    return `<div class="tool-shell" style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
      <div>
        <strong>${escapeHtml(e.title||'Sans titre')}</strong> ${shareTag}<br>
        <span class="hint">${escapeHtml(e.niveau||'')}${e.classes?' — '+escapeHtml(e.classes):''}${dateFmt?' · '+dateFmt:''}</span>
      </div>
      <button class="btn secondary" onclick="loadEvaluation('${e.id}')">Ouvrir</button>
    </div>`;
  }).join('');
}
function closeEvalListModal(){ document.getElementById('evalListModalOverlay').style.display='none'; }
async function loadEvaluation(id){
  const { data, error } = await sb.from('evaluations').select('*').eq('id', id).single();
  if(error){ await niceAlert("Échec du chargement : "+error.message); return; }
  currentEvaluationId = data.id;
  lastEvaluationTitle = data.title || null;
  document.getElementById('evalNiveau').value = data.niveau || '6e';
  document.getElementById('evalClasses').value = data.classes || '';
  document.getElementById('evalDate').value = data.eval_date || '';
  document.getElementById('evalDuree').value = data.duree || 55;
  const savedType = (data.data && data.data.evalType) || 'Évaluation';
  const typeSelect = document.getElementById('evalType');
  typeSelect.value = Array.from(typeSelect.options).some(o=>o.value===savedType) ? savedType : '__custom';
  document.getElementById('evalTypeCustom').value = (data.data && data.data.evalTypeCustom) || (typeSelect.value==='__custom' ? savedType : '');
  document.getElementById('evalTypeCustom').style.display = typeSelect.value==='__custom' ? 'inline-block' : 'none';
  evaluationExercises = (data.data && data.data.evaluationExercises) || [];
  Object.assign(blocksStores, (data.data && data.data.blocksStores) || {});
  evalNextExoId = Math.max(1, ...evaluationExercises.map(e=>e.id+1), evalNextExoId);
  pendingBlockNextId = Math.max(pendingBlockNextId, ...Object.values(blocksStores).flat().map(b=>b.id+1));
  // Migration : les évaluations sauvegardées avant la fusion du texte principal avec le
  // système de blocs stockaient l'énoncé à part (ex.text). On le convertit en bloc texte
  // (une seule fois) pour ne rien perdre, puis on vide le champ devenu obsolète.
  evaluationExercises.forEach(ex=>{
    if(ex.text && ex.text.trim()){
      pushTextBlockForExercise(ex.id, ex.text);
      ex.text = '';
    }
  });
  renderEvalChapPicker();
  renderEvalExercicesList();
  closeEvalListModal();
  document.getElementById('evalSaveStatus').textContent = "✓ Évaluation chargée";
}
async function shareEvaluation(){
  if(!currentEvaluationId){ await niceAlert("Sauvegardez d'abord cette évaluation (bouton 💾) avant de la partager."); return; }
  document.getElementById('evalShareModalOverlay').style.display='flex';
  const box = document.getElementById('evalShareContent');
  box.innerHTML = 'Chargement…';
  const { data, error } = await sb.rpc('list_colleagues_same_uai', {p_eval_id: currentEvaluationId});
  if(error){ box.innerHTML = "Erreur : "+error.message; return; }
  const roleLabel = r => r==='editor' ? '✏️ Éditeur' : r==='reader' ? '👁️ Lecteur' : '';
  let html = '';
  if(!data || !data.length){
    html += `<p class="hint" style="margin:0 0 14px;">Aucun collègue trouvé dans votre établissement (UAI non renseigné, ou personne d'autre enregistré avec le même UAI). Vous pouvez tout de même partager par e-mail ci-dessous.</p>`;
  } else {
    html += `<p class="hint" style="margin:0 0 10px;">Collègues de votre établissement :</p>`;
    html += data.map(c=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(28,43,57,.08);gap:8px;flex-wrap:wrap;">
        <span>${escapeHtml(c.nom||c.email||'')}</span>
        ${c.share_role ? `
          <span style="display:flex;align-items:center;gap:6px;">
            <span class="hint" style="margin:0;">${roleLabel(c.share_role)}</span>
            <button class="btn secondary" style="font-size:.75rem;padding:3px 8px;" onclick="unshareEvaluationWith('${c.id}')">Retirer</button>
          </span>
        ` : `
          <span style="display:flex;gap:6px;">
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','reader')">👁️ Lecteur</button>
            <button class="btn secondary" style="font-size:.8rem;" onclick="shareEvaluationWith('${c.email}','editor')">✏️ Éditeur</button>
          </span>
        `}
      </div>
    `).join('');
  }
  html += `
    <p class="hint" style="margin:16px 0 6px;">Ou par e-mail :</p>
    <div class="tool-row" style="margin-bottom:0;">
      <input type="text" id="evalShareEmail" placeholder="e-mail d'un collègue" style="flex:1;min-width:180px;">
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'reader')">👁️ Lecteur</button>
      <button class="btn secondary" onclick="shareEvaluationWith(document.getElementById('evalShareEmail').value.trim(),'editor')">✏️ Éditeur</button>
    </div>
    <p class="hint" style="margin:8px 0 0;">👁️ Lecteur : peut consulter et imprimer. ✏️ Éditeur : peut aussi modifier. Vous restez seul·e propriétaire (personne d'autre ne peut supprimer l'évaluation).</p>
    <p class="hint" id="evalShareStatus" style="margin:8px 0 0;"></p>
  `;
  box.innerHTML = html;
}
function closeEvalShareModal(){ document.getElementById('evalShareModalOverlay').style.display='none'; }
async function shareEvaluationWith(email, role){
  if(!email) return;
  const statusEl = document.getElementById('evalShareStatus');
  const { data, error } = await sb.rpc('evaluations_add_collaborator', {p_eval_id: currentEvaluationId, p_email: email, p_role: role||'editor'});
  if(error){ if(statusEl) statusEl.textContent = "Erreur : "+error.message; return; }
  if(data==='ok') shareEvaluation(); // rafraîchit la liste (le collègue apparaît maintenant avec son rôle)
  else if(statusEl) statusEl.textContent = data;
}
async function unshareEvaluationWith(userId){
  const { data, error } = await sb.rpc('evaluations_remove_collaborator', {p_eval_id: currentEvaluationId, p_user_id: userId});
  const statusEl = document.getElementById('evalShareStatus');
  if(error){ if(statusEl) statusEl.textContent = "Erreur : "+error.message; return; }
  if(data==='ok') shareEvaluation();
  else if(statusEl) statusEl.textContent = data;
}
let evalNextExoId = 1;

function initEvaluationView(){
  renderEvalChapPicker();
  renderEvalExercicesList();
}
function renderEvalChapPicker(){
  const niveau = document.getElementById('evalNiveau').value;
  const list = niveau==='6e' ? CH6 : CH5;
  const box = document.getElementById('evalChapPicker');
  const seen = new Set();
  box.innerHTML = list.filter(c=>{ if(seen.has(c.t)) return false; seen.add(c.t); return true; }).map(c=>`
    <label style="display:inline-flex;align-items:center;gap:5px;background:rgba(28,43,57,.04);padding:5px 10px;border-radius:20px;font-size:.85rem;cursor:pointer;">
      <input type="checkbox" class="evalChapCheck" value="${escapeHtml(c.t)}"> ${escapeHtml(c.code)} — ${escapeHtml(c.t)}
    </label>
  `).join('');
}
function getSelectedEvalChapitres(){
  return Array.from(document.querySelectorAll('.evalChapCheck:checked')).map(el=>el.value);
}
function evaluationPrompt(niveau, chapitres, nbExo, duree, questionCours){
  return `Tu es un professeur de mathématiques qui prépare une évaluation pour une classe de ${niveau}.
Chapitres concernés : ${chapitres.join(', ')}.
Durée prévue : ${duree} minutes. Rédige exactement ${nbExo} énoncés d'exercices${questionCours ? ', le PREMIER étant une question de cours (restituer une définition, une propriété ou une méthode vue en classe, sans aucun calcul)' : ''}, variés et progressifs (du plus simple au plus complexe), correspondant aux chapitres indiqués, adaptés au niveau ${niveau}.

Conventions d'écriture à respecter strictement :
- Jamais de tiret cadratin "—".
- Les fractions s'écrivent avec une simple barre oblique (ex. 3/4), jamais en LaTeX ni avec \\dfrac.
- Les divisions s'écrivent avec ":" et non "÷".
- N'inclus pas la correction, seulement l'énoncé destiné aux élèves.

Réponds UNIQUEMENT par un tableau JSON de chaînes de caractères, un élément par exercice, sans aucun texte ni balise autour. Exemple strict de format : ["Énoncé du premier exercice...", "Énoncé du second exercice..."]`;
}
/* Convertit un texte en bloc "texte" (ligne 0, colonne 0) pour un exercice donné : réutilisé
   par la génération IA (qui produit directement un énoncé) et par la migration des anciennes
   évaluations sauvegardées (qui stockaient l'énoncé à part, avant la fusion avec les blocs). */
function pushTextBlockForExercise(exId, text){
  if(!text || !text.trim()) return;
  const ctx = 'ex-'+exId;
  const html = `<div style="padding:4px 0;">${renderMathText(text)}</div>`;
  (blocksStores[ctx] || (blocksStores[ctx]=[])).push({id: pendingBlockNextId++, type:'texte', html, data:{text}, editFn:'reopenTextBlock', ctx, col:0, row:0});
}
async function generateEvaluationAI(){
  const statusEl = document.getElementById('evalAIStatus');
  const niveau = document.getElementById('evalNiveau').value;
  const chapitres = getSelectedEvalChapitres();
  const nbExo = parseInt(document.getElementById('evalNbExo').value)||4;
  const duree = parseInt(document.getElementById('evalDuree').value)||55;
  const questionCours = document.getElementById('evalQuestionCours').checked;
  if(!chapitres.length){ statusEl.textContent = "Sélectionnez au moins un chapitre."; return; }
  if(!currentUser){ statusEl.textContent = "Connectez-vous pour utiliser la génération par IA."; return; }
  statusEl.textContent = "Génération en cours…";
  document.getElementById('btnEvalAI').disabled = true;
  try{
    const raw = await callClaude(evaluationPrompt(niveau, chapitres, nbExo, duree, questionCours), 2200, {feature:'evaluation', niveau});
    const match = raw.match(/\[[\s\S]*\]/);
    if(!match) throw new Error('no-json');
    const list = JSON.parse(match[0]);
    list.forEach(text => {
      const id = evalNextExoId++;
      evaluationExercises.push({id, text:'', title:'', bareme:null, rows:[1]});
      pushTextBlockForExercise(id, String(text));
    });
    renderEvalExercicesList();
    statusEl.textContent = `${list.length} exercice(s) généré(s) par l'IA — à relire et ajuster avant impression.`;
  }catch(err){
    statusEl.textContent = err.message==='no-session' ? "Connectez-vous pour utiliser la génération par IA." : "Échec de la génération (réseau, ou réponse inattendue). Réessayez, ou ajoutez un exercice manuellement.";
  }
  document.getElementById('btnEvalAI').disabled = false;
}
function toggleEvalAIOptions(){
  const on = document.getElementById('evalUseAI').checked;
  document.getElementById('evalAIOptions').style.display = on ? 'block' : 'none';
}
function evalBaremeTotal(){
  return evaluationExercises.reduce((sum,ex)=>sum + (parseFloat(ex.bareme)||0), 0);
}
function updateEvalBaremeTotalDisplay(){
  const el = document.getElementById('evalBaremeTotal');
  if(!el) return;
  const total = evalBaremeTotal();
  el.textContent = evaluationExercises.length ? `Barème total : ${total} point${total>1?'s':''}` : '';
}
function renderEvalExercicesList(){
  const box = document.getElementById('evalExercicesList');
  if(!box) return;
  updateEvalBaremeTotalDisplay();
  if(!evaluationExercises.length){ box.innerHTML = ''; return; }
  box.innerHTML = evaluationExercises.map((ex,i)=>{
    const ctx = 'ex-'+ex.id;
    ensureExRows(ex);
    const hasDisks = (blocksStores[ctx]||[]).some(b=>b.type==='disque');
    const hasRects = (blocksStores[ctx]||[]).some(b=>b.type==='rectFrac');
    if(ex.validated){
      // Vue compacte : uniquement le résultat final tel qu'il sera imprimé, sans aucun des
      // outils/menus d'édition -- pour une lecture d'ensemble agréable une fois l'exercice
      // terminé. On peut réorganiser l'ordre directement ici ; modifier ou supprimer se fait
      // en repassant par l'édition (bouton ✏️), pour éviter une suppression accidentelle.
      return `
      <div class="tool-shell" style="margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <strong style="font-family:'Space Grotesk',sans-serif;">Exercice ${i+1}${ex.title?' — '+escapeHtml(ex.title):''}</strong>
          <span style="display:flex;gap:6px;align-items:center;">
            ${ex.bareme ? `<span class="hint" style="margin:0;">${ex.bareme} pt(s)</span>` : ''}
            <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
            <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
            <button type="button" onclick="editEvalExercice(${ex.id})" title="Modifier ou supprimer" style="border:none;background:rgba(31,58,92,.08);border-radius:6px;padding:4px 10px;cursor:pointer;">✏️ Éditer</button>
          </span>
        </div>
        <div>${blocksRowsHTML(ctx, ex.rows, false, ex.cellBorders)}</div>
      </div>
    `;
    }
    return `
    <div class="tool-shell" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
        <strong style="font-family:'Space Grotesk',sans-serif;">Exercice ${i+1}</strong>
        <span style="display:flex;gap:6px;align-items:center;">
          <button type="button" onclick="moveEvalExercice(${ex.id},-1)" ${i===0?'disabled style="opacity:.35;"':''} title="Monter" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↑</button>
          <button type="button" onclick="moveEvalExercice(${ex.id},1)" ${i===evaluationExercises.length-1?'disabled style="opacity:.35;"':''} title="Descendre" style="border:none;background:rgba(28,43,57,.06);border-radius:6px;padding:3px 9px;cursor:pointer;">↓</button>
          <button type="button" onclick="validateEvalExercice(${ex.id})" title="Aperçu final, sans les outils" style="border:none;background:rgba(35,140,90,.12);color:#1F7A4D;border-radius:6px;padding:3px 9px;cursor:pointer;">✓ Valider</button>
          <button type="button" onclick="removeEvalExercice(${ex.id})" style="border:none;background:rgba(217,48,37,.1);color:#D93025;border-radius:6px;padding:3px 8px;cursor:pointer;">✕ Supprimer l'exercice</button>
        </span>
      </div>
      <div class="tool-row" style="margin-bottom:8px;">
        <input type="text" placeholder="Titre de l'exercice (facultatif)" value="${escapeHtml(ex.title||'')}" oninput="updateEvalExerciceField(${ex.id},'title',this.value)" style="flex:1;min-width:200px;padding:7px 10px;border-radius:8px;border:1px solid rgba(28,43,57,.2);">
        <label class="hint" style="margin:0;">Barème : <input type="number" min="0" step="0.5" value="${ex.bareme!=null?ex.bareme:''}" oninput="updateEvalExerciceField(${ex.id},'bareme',this.value)" style="width:60px;margin-left:4px;"> pt(s)</label>
      </div>
      <div class="eval-blocks-preview" style="margin-top:4px;">${blocksRowsHTML(ctx, ensureExRows(ex), true, ex.cellBorders)}</div>
      <div class="tool-row" style="margin-top:10px;align-items:center;flex-wrap:wrap;">
        <span class="hint" style="margin:0;">Mise en page :</span>
        ${ex.rows.map((nc,rowIdx)=>`
          <span style="display:inline-flex;align-items:center;gap:4px;background:rgba(28,43,57,.04);padding:3px 8px 3px 10px;border-radius:14px;">
            <span class="hint" style="margin:0;">L${rowIdx+1} :</span>
            <input type="number" min="1" max="6" value="${nc}" onchange="setEvalRowCols(${ex.id},${rowIdx},parseInt(this.value)||1)" style="width:38px;">
            ${ex.rows.length>1 ? `<button type="button" onclick="removeEvalRow(${ex.id},${rowIdx})" title="Retirer cette ligne" style="border:none;background:none;cursor:pointer;color:#D93025;font-size:.9rem;">✕</button>` : ''}
          </span>
        `).join('')}
        <button type="button" class="btn secondary" onclick="addEvalRow(${ex.id})" style="font-size:.78rem;padding:4px 10px;">+ Nouvelle ligne</button>
        ${hasDisks ? `<label class="hint" style="margin:0;">🥧 Taille des disques : <input type="number" min="30" max="300" step="10" value="${ex.diskSize||150}" onchange="updateEvalExerciceField(${ex.id},'diskSize',parseInt(this.value)||150); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
        ${hasRects ? `<label class="hint" style="margin:0;">▭ Taille des rectangles : <input type="number" min="30" max="350" step="10" value="${ex.rectSize||180}" onchange="updateEvalExerciceField(${ex.id},'rectSize',parseInt(this.value)||180); renderEvalExercicesList();" style="width:60px;margin-left:4px;"> px</label>` : ''}
      </div>
      <p class="hint" style="margin:4px 0 0;">Fais glisser un bloc pour changer sa ligne/colonne (utilise les outils ci-dessous pour en ajouter, y compris du texte).</p>
      <div class="tool-row" style="margin-top:6px;">${toolButtonsHTML(ctx)}</div>
    </div>
  `;}).join('');
  attachResizeObservers();
}
/* Migre l'ancien réglage (ex.nCols, une seule ligne) vers le nouveau système multi-lignes
   (ex.rows, un nombre de colonnes par ligne) si besoin, et renvoie toujours ex.rows. */
function ensureExRows(ex){
  if(!ex.rows || !ex.rows.length) ex.rows = [ex.nCols||1];
  return ex.rows;
}
function setEvalRowCols(id, rowIdx, n){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex){ ensureExRows(ex); ex.rows[rowIdx] = Math.max(1, Math.min(6, n)); }
  renderEvalExercicesList();
}
function addEvalRow(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex){ ensureExRows(ex); ex.rows.push(1); }
  renderEvalExercicesList();
}
function removeEvalRow(id, rowIdx){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(!ex) return;
  ensureExRows(ex);
  if(ex.rows.length<=1) return;
  // Les blocs de la ligne retirée rejoignent la ligne précédente, pour ne pas les perdre.
  const ctx = 'ex-'+id;
  (blocksStores[ctx]||[]).forEach(b=>{
    const r = b.row||0;
    if(r===rowIdx) b.row = Math.max(0, rowIdx-1);
    else if(r>rowIdx) b.row = r-1;
  });
  ex.rows.splice(rowIdx,1);
  renderEvalExercicesList();
}
function updateEvalExerciceField(id, field, value){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex[field] = value;
  if(field==='bareme') updateEvalBaremeTotalDisplay();
}
function updateEvalExerciceText(id, text){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.text = text;
  const idx = evaluationExercises.findIndex(e=>e.id===id);
  const preview = document.querySelectorAll('#evalExercicesList .correction-preview')[idx];
  if(preview) preview.innerHTML = text.trim() ? renderMathText(text) : '';
}
async function removeEvalExercice(id){
  if(!(await niceConfirm('Supprimer définitivement cet exercice ?'))) return;
  evaluationExercises = evaluationExercises.filter(e=>e.id!==id);
  delete blocksStores['ex-'+id];
  renderEvalExercicesList();
}
function moveEvalExercice(id, dir){
  const idx = evaluationExercises.findIndex(e=>e.id===id);
  const newIdx = idx+dir;
  if(idx<0 || newIdx<0 || newIdx>=evaluationExercises.length) return;
  const [ex] = evaluationExercises.splice(idx,1);
  evaluationExercises.splice(newIdx,0,ex);
  renderEvalExercicesList();
}
function validateEvalExercice(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.validated = true;
  renderEvalExercicesList();
}
function editEvalExercice(id){
  const ex = evaluationExercises.find(e=>e.id===id);
  if(ex) ex.validated = false;
  renderEvalExercicesList();
}
function addManualExercise(){
  evaluationExercises.push({id: evalNextExoId++, text: '', title:'', bareme:null, rows:[1]});
  renderEvalExercicesList();
}
async function clearEvaluation(){
  if(evaluationExercises.length && !(await niceConfirm('Effacer tous les exercices de cette évaluation ?'))) return;
  evaluationExercises.forEach(ex=>delete blocksStores['ex-'+ex.id]);
  evaluationExercises = [];
  currentEvaluationId = null;
  document.getElementById('evalSaveStatus').textContent = '';
  renderEvalExercicesList();
}
function buildEvaluationContentHTML(){
  const niveau = document.getElementById('evalNiveau').value;
  const classes = document.getElementById('evalClasses').value.trim();
  const date = document.getElementById('evalDate').value;
  const duree = document.getElementById('evalDuree').value;
  const dateFmt = date ? new Date(date+'T00:00:00').toLocaleDateString('fr-FR', {weekday:'long', day:'numeric', month:'long', year:'numeric'}) : '';
  const total = evalBaremeTotal();
  const typeSel = document.getElementById('evalType').value;
  const title = (typeSel==='__custom' ? document.getElementById('evalTypeCustom').value.trim() : typeSel) || 'Évaluation';
  return `
    <div style="display:flex;justify-content:space-between;font-size:.95rem;">
      <div>${escapeHtml(classes || niveau)}</div>
      <div>${dateFmt}</div>
    </div>
    <div style="height:2.4em;"></div>
    <p style="text-align:center;font-weight:700;font-size:1.3rem;margin:0;">${escapeHtml(title)} de Mathématiques</p>
    <p style="text-align:center;font-size:.85rem;color:#5B6472;margin:4px 0 0;">${duree ? 'Durée : '+duree+' min' : ''}${total>0 ? ' · Barème : '+total+' pt(s)' : ''}</p>
    <div style="height:2.4em;"></div>
    <p style="margin:0;">NOM : .................................................... Prénom : ....................................................</p>
    <div style="height:3cm;border-top:1px solid #1C1B2E;border-bottom:1px solid #1C1B2E;margin:16px 0 24px;"></div>
    ${evaluationExercises.map((ex,i)=>`
      <div style="margin-bottom:26px;">
        <p style="font-weight:700;margin:0 0 8px;display:flex;justify-content:space-between;">
          <span>Exercice ${i+1}${ex.title ? ' — '+escapeHtml(ex.title) : ''}</span>
          ${ex.bareme ? `<span>${ex.bareme} pt(s)</span>` : ''}
        </p>
        ${blocksRowsHTML('ex-'+ex.id, ensureExRows(ex), false, ex.cellBorders)}
      </div>
    `).join('')}
  `;
}
/* Convertit un <svg> en image PNG (data URL) : html2canvas a un support natif des SVG très
   limité (page blanche ou figures manquantes selon les cas) ; une image bitmap classique se
   capture toujours correctement. */
function svgToPngDataUrl(svgEl, scale){
  return new Promise((resolve)=>{
    try{
      const rect = svgEl.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width || svgEl.viewBox.baseVal.width || 200));
      const h = Math.max(1, Math.round(rect.height || svgEl.viewBox.baseVal.height || 200));
      const xml = new XMLSerializer().serializeToString(svgEl);
      const svg64 = btoa(unescape(encodeURIComponent(xml)));
      const img = new Image();
      img.onload = ()=>{
        const canvas = document.createElement('canvas');
        canvas.width = w*scale; canvas.height = h*scale;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve({dataUrl: canvas.toDataURL('image/png'), w, h});
      };
      img.onerror = ()=>resolve(null);
      img.src = 'data:image/svg+xml;base64,' + svg64;
    }catch(e){ resolve(null); }
  });
}
/* Remplace tous les <svg> d'un conteneur par l'image bitmap équivalente. */
async function replaceSvgsWithImages(container){
  const svgs = Array.from(container.querySelectorAll('svg'));
  for(const svg of svgs){
    const res = await svgToPngDataUrl(svg, 2);
    if(!res) continue;
    const img = document.createElement('img');
    img.src = res.dataUrl;
    img.style.cssText = svg.getAttribute('style') || '';
    img.width = res.w; img.height = res.h;
    svg.replaceWith(img);
  }
}
async function exportEvaluationPDF(){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant de générer le PDF."); return; }
  const missing = [];
  if(!document.getElementById('evalClasses').value.trim()) missing.push('la classe');
  if(!document.getElementById('evalDate').value) missing.push('la date');
  if(missing.length && !(await niceConfirm(`Tu n'as pas renseigné ${missing.join(' ni ')}. Générer quand même la feuille d'évaluation ?`))) return;
  // La capture d'écran (html2canvas) reproduit une page blanche de façon récurrente avec ce
  // contenu, malgré plusieurs correctifs essayés. L'impression native du navigateur, elle,
  // donne un rendu fidèle et fiable : l'utilisateur choisit "Enregistrer au format PDF" comme
  // destination dans la boîte d'impression (celle-ci bloque l'onglet tant qu'elle est ouverte
  // -- comportement normal du navigateur, pas un bug).
  const w = window.open('', '_blank', 'width=900,height:700');
  if(!w){ await niceAlert("La fenêtre n'a pas pu s'ouvrir : autorisez les pop-up pour ce site, ou utilisez Ctrl/Cmd+P."); return; }
  w.document.open();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Évaluation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
    <link rel="stylesheet" href="${document.querySelector('link[href*="styles.css"]').href}">
    <style>
      @page{ size:A4; margin:15mm; }
      body{ font-family:Inter,Arial,sans-serif; color:#20242E; font-size:12.5pt; line-height:1.7; margin:0; }
      /* Important : contraint le contenu à la largeur EXACTE de la zone imprimable A4
         (210mm - 2×15mm de marge = 180mm ≈ 680px), quelle que soit la largeur réelle de
         cette fenêtre à l'écran. Sans ça, la mise en page à l'écran (calculée sur la largeur
         de la fenêtre, ex. 900px) diffère de celle utilisée au moment d'imprimer (recalculée
         sur la largeur de la page A4) -- ce qui décale la synchronisation des disques, mesurée
         avant l'impression sur une largeur qui n'est plus la bonne une fois sur le papier. */
      * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
      .print-page{ max-width:680px; margin:0 auto; }
      .nb-figure-row{ margin:6px 0; }
      svg{ max-width:100%; }
      .katex{ font-size:1.18em; }
    </style>
  </head><body><div class="print-page">${buildEvaluationContentHTML()}</div></body></html>`);
  w.document.close();
  w.onload = () => {
    // Petit délai de sécurité : laisse le temps à la mise en page de se stabiliser
    // complètement (polices, styles) avant de mesurer les disques et d'imprimer.
    setTimeout(()=>{
      syncDiskSizes(w.document);
      // Certains navigateurs figent le rendu dès l'appel à print(), avant que les styles
      // qu'on vient de modifier (taille des disques) n'aient été réellement repeints à
      // l'écran -- un double requestAnimationFrame garantit qu'un cycle de rendu complet a
      // eu lieu entre-temps.
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        w.focus();
        w.print();
      }));
    }, 200);
  };
}

async function openEvalPreview(){
  if(!evaluationExercises.length){ await niceAlert("Ajoutez au moins un exercice avant l'aperçu."); return; }
  const content = document.getElementById('evalPreviewContent');
  content.innerHTML = buildEvaluationContentHTML();
  document.getElementById('evalPreviewModalOverlay').style.display='flex';
  // Repères de saut de page : la largeur de ce conteneur (700px) correspond à la largeur
  // utile du PDF (A4, marges de 10mm de chaque côté) -- on peut donc déduire la hauteur d'une
  // page dans les mêmes proportions et matérialiser où les pages se coupent réellement.
  requestAnimationFrame(()=>{
    // Important : la modale vient tout juste de devenir visible (display:flex) -- il faut
    // attendre que sa mise en page (largeur réelle du conteneur à 700px) soit stabilisée avant
    // de mesurer quoi que ce soit, sinon les disques se synchronisent sur des valeurs erronées.
    syncDiskSizes(content);
    const pxPerMm = 700/190; // largeur utile A4 (210mm - 2x10mm de marge) mise à l'échelle sur 700px
    const pageHeightPx = 277*pxPerMm; // hauteur utile A4 (297mm - 2x10mm de marge)
    const totalHeight = content.scrollHeight;
    const marks = document.getElementById('evalPreviewPageMarks');
    let html = '';
    const nPages = Math.max(1, Math.ceil(totalHeight/pageHeightPx));
    for(let p=1; p<nPages; p++){
      const y = p*pageHeightPx;
      html += `<div style="position:absolute;top:${y}px;left:0;width:100%;border-top:2px dashed #E35D3A;"></div>
        <div style="position:absolute;top:${y+4}px;left:0;background:#E35D3A;color:#fff;font-size:.7rem;padding:1px 6px;border-radius:0 4px 4px 0;font-family:'Space Grotesk',sans-serif;">Page ${p+1} →</div>`;
    }
    marks.innerHTML = html;
    marks.style.height = totalHeight+'px';
  });
}
function closeEvalPreview(){ document.getElementById('evalPreviewModalOverlay').style.display='none'; }
async function removeCahierEntry(i){
  if(editingIndex===i) cancelEditCahier();
  const entry = cahier[i];
  if(isSyncEnabled() && entry && entry.id){
    const res = await syncRemoveEntry(entry.id);
    if(!res.ok){ alert("Échec de la suppression sur le serveur : "+(res.error||'erreur inconnue')); return; }
  }
  cahier.splice(i,1); saveCahier(); renderCahier();
}
function clearCahier(btn){
  if(!cahier.length) return;
  if(btn && btn.dataset.armed!=='1'){
    btn.dataset.armed='1';
    const original = btn.textContent;
    btn.textContent = 'Confirmer ?';
    btn.style.background = 'rgba(211,90,60,.2)';
    setTimeout(()=>{ if(btn.isConnected){ btn.dataset.armed=''; btn.textContent=original; btn.style.background=''; } }, 2500);
    return;
  }
  cahier=[]; editingIndex=null; saveCahier(); renderCahier();
}

function entryRowsHTML(e, idx, editable){
  const refLabel = e.exo==='Cours' ? 'Cours' : (e.exo==='TD' ? 'TD' : ('Exercice '+e.exo));
  let html = `<div class="cahier-print-entry"><div class="nb-ref-row"><div class="nb-ref">${refLabel}${e.titre?' : '+escapeHtml(e.titre):''}</div>`;
  if(editable){
    html += `<button type="button" class="nb-remove-btn" onclick="removeCahierEntryFromNotebook(${idx}, this)" title="Retirer ce bloc du cahier">✕ Retirer</button>`;
  }
  html += `</div>`;
  html += `<div class="nb-body">${e.html!=null ? e.html : renderMathText(e.raw)}</div>`;
  if(e.figure) html += `<div class="nb-figure-row">${e.figure}</div>`;
  html += `</div>`;
  return html;
}
/* Regroupe par date + chapitre. Le chapitre s'affiche en "pied" de chaque groupe (aligné à
   droite), plutôt qu'en haut à côté de la date -- un vrai pied de PAGE physique n'est pas
   possible en HTML/CSS standard pour du contenu qui varie (la coupure des pages n'est connue
   qu'à l'impression), ceci en est l'équivalent le plus proche réalisable. */
function groupedEntriesHTML(entries, renderItem){
  let html=''; let lastKey=null; let currentChapitre='';
  entries.forEach((e,i)=>{
    const key = (e.date||'')+'|'+(e.chapitre||'');
    if(key!==lastKey){
      if(lastKey!==null){ html += `<div class="nb-page-footer">${escapeHtml(currentChapitre)}</div><hr class="nb-daysep">`; }
      html+=`<div class="nb-date-row"><div class="nb-date">${fmtDateFR(e.date)}</div></div>`;
      lastKey=key;
      currentChapitre = e.chapitre||'';
    }
    html+=renderItem(e,i);
  });
  if(lastKey!==null) html += `<div class="nb-page-footer">${escapeHtml(currentChapitre)}</div>`;
  return html;
}
let corListFilterDate = todayISO(); // par défaut, la date du jour -- évite d'afficher toutes
                                     // les corrections de l'année à chaque ouverture.
function applyCorListFilter(){
  corListFilterDate = document.getElementById('corListFilterDate').value || null;
  renderCahier();
}
function showAllCorListDates(){
  corListFilterDate = null;
  document.getElementById('corListFilterDate').value = '';
  renderCahier();
}
/* Un seul bouton bidirectionnel : "Voir toutes les dates" <-> "Corrections du jour", plutôt que
   de devoir resaisir la date manuellement pour revenir à la vue filtrée. */
function toggleCorListDateFilter(){
  if(corListFilterDate){
    showAllCorListDates();
  } else {
    corListFilterDate = todayISO();
    document.getElementById('corListFilterDate').value = corListFilterDate;
    renderCahier();
  }
}
function renderCahier(){
  const dateInput = document.getElementById('corListFilterDate');
  if(dateInput && !dateInput.value && corListFilterDate) dateInput.value = corListFilterDate;
  const toggleBtn = document.getElementById('btnCorListDateToggle');
  if(toggleBtn) toggleBtn.textContent = corListFilterDate ? 'Voir toutes les dates' : "📅 Corrections du jour";
  document.getElementById('cahierCount').textContent = cahier.length+' exercice(s)';
  const list=document.getElementById('cahierList');
  const status=document.getElementById('corListFilterStatus');
  if(!currentClassId){ list.innerHTML = '<div class="placeholder-box">Choisissez une classe ci-dessus pour voir et ajouter des corrections.</div>'; if(status) status.textContent=''; return; }
  if(!cahier.length){ list.innerHTML = '<div class="placeholder-box">Le cahier est vide pour l\'instant — ajoutez une correction ci-dessus.</div>'; if(status) status.textContent=''; return; }
  const shown = corListFilterDate ? cahier.filter(e=>e.date===corListFilterDate) : cahier;
  if(status) status.textContent = corListFilterDate ? `${shown.length} sur ${cahier.length} au total` : '';
  if(!shown.length){ list.innerHTML = '<div class="placeholder-box">Aucune correction à cette date. <a href="#" onclick="showAllCorListDates();return false;">Voir toutes les dates</a>.</div>'; return; }
  list.innerHTML = groupedEntriesHTML(shown, (e,i)=>`
    <div class="cahier-entry">
      <div style="flex:1;">${entryRowsHTML(e)}</div>
      <div style="display:flex;flex-direction:column;gap:6px;flex:none;">
        <button class="remove" style="color:var(--accent);" onclick="editCahierEntry(${cahier.indexOf(e)})">Modifier</button>
        <button class="remove" onclick="removeCahierEntry(${cahier.indexOf(e)})">Retirer</button>
      </div>
    </div>`);
}
let cahierFilterFrom = null, cahierFilterTo = null;
let cahierFilterChapitre = '';
function filteredCahier(){
  if(!cahierFilterFrom && !cahierFilterTo && !cahierFilterChapitre) return cahier;
  return cahier.filter(e=>{
    if(cahierFilterFrom && (e.date||'') < cahierFilterFrom) return false;
    if(cahierFilterTo && (e.date||'') > cahierFilterTo) return false;
    if(cahierFilterChapitre && e.chapitre!==cahierFilterChapitre) return false;
    return true;
  });
}
function populateCahierChapitreFilter(){
  const sel = document.getElementById('cahierFilterChapitre');
  if(!sel) return;
  const current = sel.value;
  const chapitres = Array.from(new Set(cahier.map(e=>e.chapitre).filter(Boolean))).sort();
  sel.innerHTML = '<option value="">Tous</option>' + chapitres.map(c=>`<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
  if(chapitres.includes(current)) sel.value = current;
}
function applyCahierFilter(){
  cahierFilterFrom = document.getElementById('cahierFilterFrom').value || null;
  cahierFilterTo = document.getElementById('cahierFilterTo').value || null;
  cahierFilterChapitre = document.getElementById('cahierFilterChapitre').value || '';
  renderCahierEleve();
}
function clearCahierFilter(){
  cahierFilterFrom = null; cahierFilterTo = null; cahierFilterChapitre = '';
  document.getElementById('cahierFilterFrom').value = '';
  document.getElementById('cahierFilterTo').value = '';
  const sel = document.getElementById('cahierFilterChapitre'); if(sel) sel.value = '';
  renderCahierEleve();
}
function buildCahierNotebookHTML(editable){
  const list = filteredCahier();
  const status = document.getElementById('cahierFilterStatus');
  if(status){
    status.textContent = (cahierFilterFrom||cahierFilterTo||cahierFilterChapitre) ? `${list.length} résultat(s) sur ${cahier.length}` : '';
  }
  if(!cahier.length) return '<p class="hint">Le cahier est vide pour l\'instant.</p>';
  if(!list.length) return '<p class="hint">Aucune correction dans cette période.</p>';
  return groupedEntriesHTML(list, (e)=>entryRowsHTML(e, cahier.indexOf(e), editable));
}
async function removeCahierEntryFromNotebook(i, btn){
  if(btn && btn.dataset.armed!=='1'){
    btn.dataset.armed='1';
    btn.dataset.originalText = btn.textContent;
    btn.textContent = 'Confirmer ?';
    btn.style.background = 'rgba(211,90,60,.3)';
    btn.dataset.timeoutId = setTimeout(()=>{
      if(btn.isConnected){ btn.dataset.armed=''; btn.textContent=btn.dataset.originalText; btn.style.background=''; }
    }, 2500);
    return;
  }
  const entry = cahier[i];
  if(isSyncEnabled() && entry && entry.id){
    const res = await syncRemoveEntry(entry.id);
    if(!res.ok){
      alert(res.error==='unauthorized'
        ? "Seul le professeur peut retirer un élément de ce cahier partagé (code secret requis, configuré dans l'outil prof)."
        : "Échec de la suppression sur le serveur : "+(res.error||'erreur inconnue'));
      return;
    }
  }
  cahier.splice(i,1);
  saveCahier();
  renderCahierEleve();
  if(document.getElementById('cahierList')) renderCahier();
}
async function renderCahierEleve(){
  populateCahierChapitreFilter();
  if(!currentClassId){
    document.getElementById('cahierEleveContent').innerHTML = '<p class="hint">Choisissez une classe ci-dessus pour voir son cahier.</p>';
    return;
  }
  let warning = '';
  if(isSyncEnabled()){
    document.getElementById('cahierEleveContent').innerHTML = '<p class="hint">Chargement depuis le cahier partagé…</p>';
    const remote = await syncFetchAll();
    if(remote){
      cahier = remote;
      saveCahier();
      populateCahierChapitreFilter();
    } else {
      warning = '<p class="hint">⚠️ Impossible de joindre le cahier partagé — affichage de la dernière copie connue sur cet appareil.</p>';
    }
  }
  document.getElementById('cahierEleveContent').innerHTML = warning + buildCahierNotebookHTML(currentUserRole==='prof' || currentUserRole==='admin');
  const book=document.getElementById('cahierEleveBook');
  requestAnimationFrame(()=>{ book.scrollTop = book.scrollHeight; });
}
async function exportCahierAsPDF(){
  if(!cahier.length){ await niceAlert('Le cahier est vide : ajoutez au moins une correction avant de générer le PDF.'); return; }
  // Même choix que pour l'évaluation : la capture d'écran (html2canvas) donne une page blanche
  // de façon récurrente avec ce type de contenu (SVG notamment), malgré plusieurs correctifs
  // essayés. L'impression native du navigateur est fiable -- choisir "Enregistrer au format PDF"
  // comme destination dans la boîte d'impression (celle-ci bloque l'onglet tant qu'elle est
  // ouverte -- comportement normal du navigateur, pas un bug).
  const w = window.open('', '_blank', 'width=900,height=700');
  if(!w){ await niceAlert("La fenêtre n'a pas pu s'ouvrir : autorisez les pop-up pour ce site, ou utilisez Ctrl/Cmd+P."); return; }
  w.document.open();
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <title>Cahier de corrections</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">
    <link rel="stylesheet" href="${document.querySelector('link[href*="styles.css"]').href}">
    <style>
      @page{ size:A4; margin:15mm; }
      body{ font-family:Inter,Arial,sans-serif; color:#20242E; font-size:12.5pt; line-height:1.7; margin:0; }
      .print-page{ max-width:680px; margin:0 auto; }
      .nb-figure-row{ margin:6px 0; }
      svg{ max-width:100%; }
      .katex{ font-size:1.18em; }
      * { -webkit-print-color-adjust:exact !important; print-color-adjust:exact !important; color-adjust:exact !important; }
      .nb-date{ font-weight:700; }
      .nb-ref{ text-decoration:underline; text-underline-offset:3px; }
      .nb-page-footer{ text-align:right; font-style:italic; color:#666; font-size:.92em; margin:8px 0 16px; }
    </style>
  </head><body><div class="print-page">${buildCahierNotebookHTML()}</div></body></html>`);
  w.document.close();
  w.onload = () => {
    setTimeout(()=>{
      syncDiskSizesForPrint(w.document);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        w.focus();
        w.print();
      }));
    }, 200);
  };
}
function generateCahierPDF(){ exportCahierAsPDF(); }
function downloadCahierElevePDF(){ exportCahierAsPDF(); }
function exportCahierDataFile(){
  if(!cahier.length){ alert('Le cahier est vide : rien à exporter pour le moment.'); return; }
  const blob = new Blob([JSON.stringify(cahier, null, 2)], {type:'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'cahier-mathcollege.json';
  document.body.appendChild(link); link.click(); link.remove();
  const status=document.getElementById('cahierImportStatus');
  status.textContent = '✓ Fichier téléchargé — partagez-le (ENT, e-mail, clé USB...) pour que d\'autres l\'importent sur leur propre appareil.';
  setTimeout(()=>status.textContent='', 8000);
}
function importCahierDataFile(file){
  if(!file) return;
  const status=document.getElementById('cahierImportStatus');
  const reader = new FileReader();
  reader.onload = ()=>{
    let imported;
    try{ imported = JSON.parse(reader.result); }
    catch(e){ status.textContent = "Fichier invalide : ce n'est pas un cahier exporté depuis ce site."; return; }
    if(!Array.isArray(imported)){ status.textContent = "Fichier invalide : format inattendu."; return; }
    cahier = cahier.concat(imported);
    sortCahierInPlace();
    saveCahier();
    renderCahierEleve();
    if(document.getElementById('cahierList')) renderCahier();
    status.textContent = `✓ ${imported.length} entrée(s) importée(s) et ajoutée(s) à ce cahier.`;
    setTimeout(()=>status.textContent='', 8000);
  };
  reader.onerror = ()=>{ status.textContent = "Impossible de lire ce fichier."; };
  reader.readAsText(file);
}

/* ---- ajouter une partie du cours au cahier de l'élève ---- */
function injectCourseAddButtons(container){
  if(!container) return;
  container.querySelectorAll('.lesson-header, .sub-header').forEach(h=>{
    if(h.querySelector('.add-to-cahier-btn')) return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='add-to-cahier-btn';
    btn.title="Ajouter cette partie au cahier de l'élève";
    btn.textContent='+ Cahier';
    btn.onclick=(e)=>{ e.stopPropagation(); if(!btn.disabled) addSectionToCahier(h); };
    h.appendChild(btn);
  });
  updateCourseAddButtonsState();
}
function updateCourseAddButtonsState(){
  const isStaff = currentUserRole==='prof' || currentUserRole==='admin';
  const canAdd = isStaff && !!currentClassId;
  document.querySelectorAll('.add-to-cahier-btn').forEach(btn=>{
    if(!isStaff){
      btn.style.display = 'none';
    } else {
      btn.style.display = '';
      btn.disabled = !canAdd;
      btn.title = canAdd ? "Ajouter cette partie au cahier de l'élève" : "Choisissez une classe dans Outil prof avant d'ajouter au cahier";
      btn.style.opacity = canAdd ? '1' : '.45';
      btn.style.cursor = canAdd ? 'pointer' : 'not-allowed';
    }
  });
}
// Reconstitue dans un clone (avant capture cahier ou export PDF) toutes les étapes des démos
// pas-à-pas (texte + LaTeX, ou constructions géométriques), plutôt que de figer l'étape affichée.
async function expandStepDemosInClone(wrapper){
  wrapper.querySelectorAll('.step-display[id]').forEach(cloneEl=>{
    const liveEl = document.getElementById(cloneEl.id);
    if(liveEl && liveEl._stepDemoSteps){
      const steps = liveEl._stepDemoSteps;
      const lines = steps.map((s,i)=>{
        const isFinal = i===steps.length-1;
        return `<div class="${isFinal?'step-final':''}">${s.expr}</div>`;
      }).join('');
      cloneEl.innerHTML = `<div class="step-column">${lines}</div><div class="step-note">${steps[steps.length-1].note}</div>`;
      renderStaticMath(cloneEl); // certaines étapes contiennent des fractions en LaTeX (class="tex"), pas encore rendues sous cette forme
    }
  });
  const sceneEls = Array.from(wrapper.querySelectorAll('.ar-scene[id]'));
  for(const cloneScene of sceneEls){
    try{
      const demo = window.SCENE_STEP_DEMOS[cloneScene.id];
      if(!demo){
        console.warn(`Cahier/PDF : scène non reconstituée pour #${cloneScene.id} (pas de démo enregistrée).`);
        continue;
      }
      const steps = demo.steps();
      const originalIdx = demo.getIdx();
      const filmstripHtml = await captureSceneFilmstrip(steps, demo.goto, demo.capture, originalIdx);
      const figureWrap = cloneScene.closest('.figure-wrap');
      if(figureWrap){
        figureWrap.innerHTML = `<strong style="font-family:'Space Grotesk',sans-serif;font-size:.85rem;">Étapes :</strong><div style="margin-top:8px;">${filmstripHtml}</div>`;
      } else {
        console.warn(`Cahier/PDF : aucun .figure-wrap parent trouvé pour #${cloneScene.id}.`);
      }
    } catch(e){
      console.error(`Cahier/PDF : erreur lors de la reconstitution de la scène #${cloneScene.id}`, e);
    }
  }
  const svgEls = Array.from(wrapper.querySelectorAll('svg[id]'));
  for(const cloneSvg of svgEls){
    try{
      const liveSvg = document.getElementById(cloneSvg.id);
      const demo = window.GEO_STEP_DEMOS[cloneSvg.id];
      if(!liveSvg || !demo){
        console.warn(`Cahier/PDF : étapes non reconstituées pour #${cloneSvg.id} (liveSvg=${!!liveSvg}, demo enregistrée=${!!demo}). La figure conserve son état affiché au moment du clic.`);
        continue;
      }
      const steps = demo.steps();
      const originalIdx = demo.getIdx();
      const filmstripHtml = await captureGeoFilmstrip(liveSvg, steps, demo.goto, originalIdx);
      const figureWrap = cloneSvg.closest('.figure-wrap');
      if(figureWrap){
        figureWrap.innerHTML = `<strong style="font-family:'Space Grotesk',sans-serif;font-size:.85rem;">Étapes de la construction :</strong><div style="margin-top:8px;">${filmstripHtml}</div>`;
      } else {
        console.warn(`Cahier/PDF : aucun .figure-wrap parent trouvé pour #${cloneSvg.id}.`);
      }
    } catch(e){
      console.error(`Cahier/PDF : erreur lors de la reconstitution des étapes pour #${cloneSvg.id}`, e);
    }
  }
  // Toute autre figure SVG (interactive et mise à jour en JS, ou simple figure statique) reste
  // du SVG -- html2canvas le gère de façon peu fiable dans les deux cas (pas seulement le
  // dynamique), et une figure statique peut aussi utiliser une variable CSS (var(--xxx)) dans un
  // attribut fill/stroke, qui ne se résout pas sur un clone détaché du DOM. On rastérise donc
  // systématiquement tout SVG restant, y compris ceux sans id.
  const remainingSvgs = Array.from(wrapper.querySelectorAll('svg'));
  for(const cloneSvg of remainingSvgs){
    const label = cloneSvg.id ? `#${cloneSvg.id}` : '(figure statique sans id)';
    try{
      const liveSvg = cloneSvg.id ? document.getElementById(cloneSvg.id) : null;
      let displayWidth = 400;
      if(liveSvg){
        const rect = liveSvg.getBoundingClientRect();
        if(rect.width > 20) displayWidth = rect.width;
      } else {
        // pas d'élément en direct (figure statique) : on déduit une largeur raisonnable du viewBox
        const vb = cloneSvg.getAttribute('viewBox');
        if(vb){
          const parts = vb.trim().split(/\s+/).map(Number);
          if(parts[2] > 20) displayWidth = Math.min(parts[2], 480);
        }
      }
      const dataUri = await svgToRasterDataUri(liveSvg || cloneSvg, displayWidth);
      if(dataUri){
        const img = document.createElement('img');
        img.src = dataUri;
        img.style.cssText = 'width:100%;max-width:'+Math.round(displayWidth)+'px;height:auto;display:block;margin:0 auto;';
        img.alt = 'Figure';
        cloneSvg.replaceWith(img);
      } else {
        console.warn(`Cahier/PDF : rastérisation impossible pour ${label}, figure conservée telle quelle.`);
      }
    } catch(e){
      console.error(`Cahier/PDF : erreur lors de la rastérisation de ${label}`, e);
    }
  }
}
async function addSectionToCahier(headerEl){
  const isLesson = headerEl.classList.contains('lesson-header');
  const titleEl = headerEl.querySelector('h3,h4');
  const titre = titleEl ? titleEl.textContent.trim() : 'Cours';
  const wrapper = document.createElement('div');
  const headerClone = headerEl.cloneNode(true);
  headerClone.querySelectorAll('.add-to-cahier-btn').forEach(b=>b.remove());
  wrapper.appendChild(headerClone);
  let node = headerEl.nextElementSibling;
  while(node){
    const isNodeLesson = node.classList && node.classList.contains('lesson-header');
    const isNodeSub = node.classList && node.classList.contains('sub-header');
    if(isNodeLesson) break;
    if(!isLesson && isNodeSub) break;
    wrapper.appendChild(node.cloneNode(true));
    node = node.nextElementSibling;
  }
  wrapper.querySelectorAll('.add-to-cahier-btn').forEach(b=>b.remove());
  wrapper.querySelectorAll('.figure-toolbar').forEach(b=>b.remove());
  wrapper.querySelectorAll('.interaction-hint').forEach(b=>b.remove());
  await expandStepDemosInClone(wrapper);
  wrapper.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id')); // évite tout doublon d'id avec la figure d'origine

  const niveauSel = document.getElementById('corNiveau');
  const entry = {
    niveau: niveauSel ? niveauSel.value : '5e',
    chapitre: currentChapterTitle || '',
    exo: 'Cours',
    titre: titre,
    date: todayISO(),
    raw: '',
    html: wrapper.innerHTML,
  };
  cahier.push(entry);
  sortCahierInPlace();
  saveCahier();
  if(document.getElementById('cahierList')) renderCahier();
  const btn = headerEl.querySelector('.add-to-cahier-btn');
  if(btn){ const old=btn.textContent; btn.textContent='✓ Ajouté'; setTimeout(()=>btn.textContent=old,1600); }
  if(isSyncEnabled()){
    const res = await syncAddEntry(entry);
    if(res.ok){ entry.id = res.id; saveCahier(); }
    else if(!res.offline){ alert("⚠️ Ajouté localement, mais échec de synchronisation avec le serveur : "+(res.error||'erreur inconnue')+". Vérifiez la configuration de synchronisation (adresse + code secret) dans l'outil prof."); }
  }
}

renderCahier();
renderCorrectionPreview();
async function addTdReference(){
  const status = document.getElementById('tdRefStatus');
  const pageRaw = document.getElementById('tdPage').value.trim();
  const exosRaw = document.getElementById('tdExosNum').value.trim();
  const exos = exosRaw.split(',').map(s=>s.trim()).filter(Boolean);
  if(!exos.length){ status.textContent = "Indiquez au moins un numéro d'exercice."; return; }
  const titre = `Exercices ${exos.join(', ')}` + (pageRaw ? ` (page ${pageRaw})` : '');
  const entry = {
    niveau: document.getElementById('tdNiveau').value,
    chapitre: document.getElementById('tdChapitre').value,
    exo: 'TD',
    titre: titre,
    date: document.getElementById('tdDate').value || todayISO(),
    raw: '',
  };
  cahier.push(entry);
  sortCahierInPlace();
  saveCahier();
  renderCahier();
  document.getElementById('tdExosNum').value = '';
  document.getElementById('tdPage').value = '';
  status.textContent = 'Référencé ✓';
  setTimeout(()=>{ if(status.textContent==='Référencé ✓') status.textContent=''; }, 2500);
  if(isSyncEnabled()){
    const res = await syncAddEntry(entry);
    if(res.ok){ entry.id = res.id; saveCahier(); renderCahier(); }
    else if(!res.offline){ status.textContent = "⚠️ Enregistré localement, échec de synchronisation : "+(res.error||'erreur inconnue'); }
  }
}
document.getElementById('corDate').value = todayISO();
document.getElementById('corListFilterDate').value = corListFilterDate;
document.getElementById('tdDate').value = todayISO();

/* ============================================================
   TABLEAU INTERACTIF (géométrie) -- v1
   -----------------------------------------------------------
   Chaque outil posé sur le tableau est un objet {id, type, x, y,
   angle} (angle en degrés) dans le repère du grand SVG. Le crayon
   trace un trait tant qu'on le fait glisser : s'il passe assez
   près du bord d'une règle/équerre/réquerre/rapporteur ET dans le
   bon sens, son tracé s'aimante sur ce bord (comme un vrai crayon
   guidé) ; sinon il trace librement, à main levée. Le compas a un
   fonctionnement à part : sa pointe sèche (pivot) se déplace
   normalement, sa pointe crayon tourne autour à rayon fixé dès
   qu'on commence à la faire glisser, en traçant un arc.
   ============================================================ */
let tbNextId = 1;
let tbConstructionMode = false; // trace en gris fin quand actif, sans changer les traits déjà faits
let tbPoints = [];  // points nommés posés au tap du crayon {id, x, y, label}
let tbPointNextId = 1;
let tbTools = [];   // outils posés sur le tableau
let tbInk = [];     // traits déjà tracés {color, points:[[x,y],...]}
let tbDrag = null;  // interaction en cours (déplacement/rotation/tracé)
let tbInitialized = false;

function pencilSVG(id){
  // pointe exactement à l'origine locale (0,0). Le corps (manche, rôle "pencilBody") est long
  // et étroit (proportions réalistes), bien séparé de la pointe (aucun chevauchement des deux
  // zones tactiles).
  return `<g data-role="pencilBody" data-id="${id}">
    <rect x="-7" y="-100" width="14" height="14" fill="#D93025" stroke="#1C1B2E" stroke-width="1.4"/>
    <rect x="-7" y="-86" width="14" height="51" fill="#E8B93A" stroke="#1C1B2E" stroke-width="1.4"/>
    <polygon points="-7,-35 7,-35 0,0" fill="#D9B48F" stroke="#1C1B2E" stroke-width="1.4"/>
    <polygon points="-2.5,-10 2.5,-10 0,0" fill="#3a2b1f"/>
  </g>
  <circle data-role="tip" data-id="${id}" cx="0" cy="0" r="18" fill="transparent" pointer-events="all"/>`;
}
const TB_RULER_L = 340, TB_RULER_W = 36;
function rulerSVG(graduated){
  const L=TB_RULER_L, W=TB_RULER_W;
  let ticks='';
  if(graduated){
    const cmStep = 22, nCm = Math.floor(L/cmStep);
    for(let cm=0; cm<=nCm; cm++){
      const xcm = cm*cmStep;
      ticks += `<line x1="${xcm}" y1="0" x2="${xcm}" y2="14" stroke="#1C1B2E" stroke-width="1.1"/>
        <text x="${xcm}" y="25" font-size="9" text-anchor="middle" fill="#1C1B2E" font-family="'JetBrains Mono',monospace">${cm}</text>`;
      if(cm<nCm){
        for(let mm=1; mm<10; mm++){
          const x = xcm+mm*(cmStep/10);
          ticks += `<line x1="${x.toFixed(1)}" y1="0" x2="${x.toFixed(1)}" y2="${mm===5?9:5}" stroke="#1C1B2E" stroke-width="0.7"/>`;
        }
      }
    }
  }
  const leftMargin = 14;
  return `<rect x="${-leftMargin}" y="0" width="${L+leftMargin}" height="${W}" rx="6" fill="rgba(205,228,255,.35)" stroke="#1C1B2E" stroke-width="1.5"/>${ticks}
    <circle cx="34" cy="${(W*0.68).toFixed(1)}" r="6" fill="#fff" fill-opacity="0.75" stroke="#1C1B2E" stroke-width="1"/>
    <circle cx="0" cy="0" r="5" fill="#D93025" stroke="#1C1B2E" stroke-width="1"/>`;
}
/* Chemin d'un triangle aux coins arrondis (rayon r), donné par ses 3 sommets -- utilisé pour
   l'équerre/réquerre, dont le contour ET l'évidement doivent avoir des angles adoucis comme une
   vraie équerre en plastique, pas des angles vifs. */
function tbRoundedTrianglePath(pts, r){
  let d = '';
  for(let i=0;i<3;i++){
    const prev = pts[(i+2)%3], cur = pts[i], next = pts[(i+1)%3];
    const d1x = cur[0]-prev[0], d1y = cur[1]-prev[1], len1 = Math.hypot(d1x,d1y)||1;
    const d2x = next[0]-cur[0], d2y = next[1]-cur[1], len2 = Math.hypot(d2x,d2y)||1;
    const r1 = Math.min(r, len1*0.35), r2 = Math.min(r, len2*0.35);
    const p1x = cur[0]-d1x/len1*r1, p1y = cur[1]-d1y/len1*r1;
    const p2x = cur[0]+d2x/len2*r2, p2y = cur[1]+d2y/len2*r2;
    d += (i===0?'M ':'L ') + p1x.toFixed(1)+','+p1y.toFixed(1)+' ';
    d += 'Q '+cur[0].toFixed(1)+','+cur[1].toFixed(1)+' '+p2x.toFixed(1)+','+p2y.toFixed(1)+' ';
  }
  return d+'Z';
}
function equerreSVG(legX, legY){
  const marginTop = 24, marginLeft = 14;
  const outerPath = tbRoundedTrianglePath([[0,0],[legX,0],[0,-legY]], 9);
  const holePath = tbRoundedTrianglePath([
    [marginLeft, -marginTop],
    [legX*0.6, -marginTop],
    [marginLeft, -legY+marginTop*0.6],
  ], 15);
  let ticks = '';
  const cmStep = 20, nCm = Math.floor((legX-8)/cmStep);
  for(let i=1;i<=nCm;i++){
    const x = i*cmStep;
    ticks += `<line x1="${x}" y1="0" x2="${x}" y2="-7" stroke="#1C1B2E" stroke-width="0.8"/>
      <text x="${x}" y="-12" font-size="6.5" text-anchor="middle" fill="#1C1B2E">${i}</text>`;
  }
  return `<path d="${outerPath}" fill="rgba(205,225,245,.4)" stroke="#1C1B2E" stroke-width="1.6"/>
    <path d="${holePath}" fill="#fff" fill-opacity="0.85" stroke="#1C1B2E" stroke-width="1.1"/>
    ${ticks}
    <text x="${marginLeft+8}" y="-${marginTop+14}" font-size="6" fill="#1C1B2E" opacity="0.55" font-style="italic">Équerre</text>`;
}
// Même image et mêmes repères que le rapporteur du cours "Angles et rapporteur" (6e, G3) : le
// pivot (là où convergent les graduations) n'est pas au centre de l'image, il a été mesuré
// précisément par ajustement de cercle sur le bord de l'image -- voir chapitres/6e/G3-angles-rapporteur.js.
const TB_PROT_RATIO = 900/483;
const TB_PROT_BASELINE_RATIO = 0.9349;
const TB_PROT_CENTER_X_RATIO = 0.4992;
const TB_PROT_W = 380, TB_PROT_H = TB_PROT_W/TB_PROT_RATIO;
const TB_PROT_PIVOT_X = TB_PROT_W*TB_PROT_CENTER_X_RATIO, TB_PROT_PIVOT_Y = TB_PROT_H*TB_PROT_BASELINE_RATIO;
const TB_PROT_RADIUS = TB_PROT_PIVOT_Y - 3; // rayon du bord extérieur, marge réduite au minimum
function protractorSVG(){
  return `<image href="assets/rapporteur-translucide.png" x="${-TB_PROT_PIVOT_X}" y="${-TB_PROT_PIVOT_Y}" width="${TB_PROT_W}" height="${TB_PROT_H}" style="pointer-events:none;" opacity="0.92"/>
    <rect x="${-TB_PROT_PIVOT_X}" y="${-TB_PROT_PIVOT_Y}" width="${TB_PROT_W}" height="${TB_PROT_H}" fill="transparent" pointer-events="all"/>`;
}
/* Définition de chaque type d'outil : forme dessinée, bords utilisables par le crayon pour
   s'aimanter (coordonnées locales, avant rotation/déplacement de l'outil), et position de la
   poignée de rotation -- toujours à l'extrémité naturelle de l'outil lui-même (pas flottante à
   côté), pour qu'on tourne l'outil "par le bout" comme dans la réalité. */
const TB_COMPASS_LEG = 200; // longueur fixe des branches (comme un vrai compas) -- assez
                             // longue pour rester crédible même bien écarté.
const TB_DEFS = {
  crayon:      { rotateHandle:{x:0,y:-100}, svg: pencilSVG,            edges: [] },
  regle_grad:  { rotateHandle:{x:TB_RULER_L/2,y:TB_RULER_W-6,r:7,opacity:0.5}, svg: ()=>rulerSVG(true),  edges: [{x1:6,y1:0,x2:TB_RULER_L-6,y2:0}] },
  equerre:     { rotateHandle:{x:110,y:-40,r:7,opacity:0.5}, svg: ()=>equerreSVG(340,115), edges: [{x1:0,y1:0,x2:340,y2:0},{x1:0,y1:0,x2:0,y2:-115}] },
  requerre:    { rotateHandle:{x:58,y:-27,r:7,opacity:0.5}, svg: ()=>equerreSVG(180,80),  edges: [{x1:0,y1:0,x2:180,y2:0},{x1:0,y1:0,x2:0,y2:-80}] },
  rapporteur:  { rotateHandle:{x:0,y:-24,r:7,opacity:0.55}, svg: protractorSVG, edges: [{x1:-TB_PROT_PIVOT_X+8,y1:0,x2:(TB_PROT_W-TB_PROT_PIVOT_X)-8,y2:0}] },
  gomme:       { rotateHandle:null, svg: gommeSVG, edges: [] },
};
function gommeSVG(id){
  return `<g data-role="body" data-id="${id}">
    <rect x="-24" y="-15" width="48" height="30" rx="6" fill="#F2A6C4" stroke="#1C1B2E" stroke-width="1.6"/>
    <rect x="-24" y="-15" width="48" height="11" rx="4" fill="#fff" opacity="0.5"/>
  </g>`;
}
const TB_ICON_PROTRACTOR = `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M2 19 A10 10 0 0 1 22 19" fill="none" stroke="#1C1B2E" stroke-width="1.6"/><line x1="2" y1="19" x2="22" y2="19" stroke="#1C1B2E" stroke-width="1.6"/><line x1="12" y1="19" x2="12" y2="9.5" stroke="#1C1B2E" stroke-width="1"/><line x1="12" y1="19" x2="5.5" y2="12.5" stroke="#1C1B2E" stroke-width="1"/><line x1="12" y1="19" x2="18.5" y2="12.5" stroke="#1C1B2E" stroke-width="1"/></svg>`;
const TB_ICON_COMPASS = `<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="4.5" r="1.8" fill="#1C1B2E"/><line x1="12" y1="4.5" x2="5.5" y2="21" stroke="#1C1B2E" stroke-width="1.8"/><line x1="12" y1="4.5" x2="18.5" y2="21" stroke="#1C1B2E" stroke-width="1.8"/><circle cx="5.5" cy="21" r="1.4" fill="#D93025"/><rect x="16.5" y="17.5" width="4" height="4.5" rx="0.6" fill="#E8B93A" stroke="#1C1B2E" stroke-width="0.7" transform="rotate(18 18.5 19.5)"/></svg>`;
const TB_ICON_ERASER = `<svg viewBox="0 0 24 24" width="26" height="26"><rect x="3" y="9" width="18" height="10" rx="2.5" fill="#F2A6C4" stroke="#1C1B2E" stroke-width="1.5" transform="rotate(-12 12 14)"/><rect x="3" y="9" width="18" height="4" rx="2" fill="#fff" opacity=".55" transform="rotate(-12 12 14)"/></svg>`;
/* Aide contextuelle affichée sous le tableau, mise à jour à chaque fois qu'on commence à
   manipuler un outil -- reste affichée après le geste pour qu'on ait le temps de la lire. */
const TB_HELP_TEXT = {
  crayon: "✏️ <b>Crayon</b> — le manche le déplace sans rien tracer ; la pointe trace en la faisant glisser, ou pose un point nommé si on tape dessus sans bouger.",
  gomme: "🧽 <b>Gomme</b> — faites-la glisser sur un trait pour effacer localement (le reste du trait est conservé).",
  regle_grad: "📏 <b>Règle graduée</b> — le corps la déplace, l'extrémité la fait tourner (elle pivote autour du 0). Le crayon s'aimante sur son bord gradué.",
  equerre: "📐 <b>Équerre</b> — le corps la déplace, le bout de l'angle droit la fait tourner. Le crayon s'aimante sur ses côtés.",
  requerre: "🔻 <b>Réquerre</b> — même manipulation que l'équerre.",
  rapporteur: "◐ <b>Rapporteur</b> — le corps le déplace ; le petit crayon tourne autour du pivot (un double-clic pose un repère à l'angle visé, un simple glissé ne fait que le repositionner).",
  compas: "🧭 <b>Compas</b> — la branche de la pointe déplace tout l'ensemble ; la branche du crayon écarte, tourne sans tracer, ou trace vraiment selon l'icône (cliquez dessus pour changer de mode).",
};
let tbHelpType = null;
function tbSetHelp(type){
  tbHelpType = type;
  const box = document.getElementById('tbHelpBox');
  if(box) box.innerHTML = TB_HELP_TEXT[type] || '';
}
const TB_PALETTE = [
  {type:'crayon',      icon:'✏️', label:'Crayon'},
  {type:'gomme',       icon:TB_ICON_ERASER, label:'Gomme'},
  {type:'regle_grad',  icon:'📏', label:'Règle graduée'},
  {type:'equerre',     icon:'📐', label:'Équerre'},
  {type:'requerre',    icon:'🔻', label:'Réquerre'},
  {type:'rapporteur',  icon:TB_ICON_PROTRACTOR, label:'Rapporteur'},
  {type:'compas',      icon:TB_ICON_COMPASS, label:'Compas'},
];
function initTableauView(){
  if(tbInitialized) return;
  tbRenderPalette();
  tbRender();
  tbInitialized = true;
}
/* Chaque icône de la palette bascule l'outil : un appui l'ajoute au tableau, un second l'en
   retire -- plus besoin d'un bouton de suppression séparé sur le tableau lui-même. L'icône
   reflète l'état (encadrée/colorée quand l'outil est posé). */
function tbRenderPalette(){
  document.getElementById('tbToolPalette').innerHTML = TB_PALETTE.map(p=>{
    const active = tbTools.some(t=>t.type===p.type);
    return `<button type="button" onclick="tbAddTool('${p.type}')" title="${p.label}" style="width:56px;height:56px;border:2px solid ${active?'#0D5BA3':'rgba(28,43,57,.2)'};border-radius:8px;background:${active?'rgba(13,91,163,.12)':'#fff'};cursor:pointer;font-size:1.5rem;">${p.icon}</button>`;
  }).join('');
}
function tbAddTool(type){
  if(tbTools.some(t=>t.type===type)){
    tbTools = tbTools.filter(t=>t.type!==type);
    tbRenderPalette();
    tbRender();
    return;
  }
  const id = tbNextId++;
  if(type==='compas') tbTools.push({id, type, x:420, y:260, angle:-40, radius:90, mode:'open'});
  else tbTools.push({id, type, x:430, y:280, angle:0});
  if(TB_HELP_TEXT[type]) tbSetHelp(type);
  tbRenderPalette();
  tbRender();
}
/* Efface tout trait ou repère qui passe à moins de "radius" du point donné -- utilisé en
   déplaçant la gomme sur le tableau. Retire le trait entier plutôt qu'un simple segment (plus
   simple, et suffisant pour corriger une erreur de tracé). */
/* Efface uniquement la portion d'un trait qui passe à moins de "radius" du point donné --
   scinde le trait en morceaux distincts de part et d'autre de la zone effacée, comme une vraie
   gomme, plutôt que de supprimer tout le trait entier. */
function tbEraseNear(x, y, radius){
  const newInk = [];
  tbInk.forEach(s=>{
    let current = [];
    s.points.forEach(p=>{
      if(Math.hypot(p[0]-x, p[1]-y) < radius){
        if(current.length>=2) newInk.push({color:s.color, points:current});
        current = [];
      } else {
        current.push(p);
      }
    });
    if(current.length>=2) newInk.push({color:s.color, points:current});
  });
  const before = tbInk.length + tbPoints.length;
  tbInk = newInk;
  tbPoints = tbPoints.filter(p => Math.hypot(p.x-x, p.y-y) >= radius);
  return before !== (tbInk.length + tbPoints.length);
}
function tbToggleConstruction(){
  tbConstructionMode = !tbConstructionMode;
  const btn = document.getElementById('btnTbConstruction');
  if(btn){
    btn.style.background = tbConstructionMode ? 'rgba(107,114,128,.25)' : '';
    btn.style.borderColor = tbConstructionMode ? '#6B7280' : '';
  }
}
function tbCurrentColor(){
  const el = document.getElementById('tbPencilColor');
  return el ? el.value : '#1C1B2E';
}
function tbClearInk(){ tbInk = []; tbRender(); }
function tbClearAll(){ tbInk = []; tbTools = []; tbPoints = []; tbRenderPalette(); tbRender(); }
function tbSvgPoint(e){
  const svg = document.getElementById('tbSvg');
  const pt = svg.createSVGPoint();
  pt.x = e.clientX; pt.y = e.clientY;
  const ctm = svg.getScreenCTM();
  if(!ctm) return {x:0,y:0};
  const loc = pt.matrixTransform(ctm.inverse());
  return {x:loc.x, y:loc.y};
}
/* Projette un point sur un segment, avec un léger débord toléré aux extrémités (un crayon peut
   dépasser un peu le bout d'une règle sans perdre l'accroche). Renvoie le point projeté et la
   distance, ou null si le segment est dégénéré. */
function tbProjectOntoSegment(p, ax, ay, bx, by, overhang){
  const dx=bx-ax, dy=by-ay;
  const len = Math.hypot(dx,dy);
  if(len<1e-6) return null;
  let t = ((p.x-ax)*dx + (p.y-ay)*dy)/(len*len);
  const tMin = -overhang/len, tMax = 1+overhang/len;
  t = Math.max(tMin, Math.min(tMax, t));
  const px = ax+t*dx, py = ay+t*dy;
  return {x:px, y:py, dist: Math.hypot(p.x-px, p.y-py)};
}
/* Cherche, parmi tous les outils "guides" posés sur le tableau, le bord le plus proche du point
   donné (à moins de 15px) ; si trouvé, renvoie le point aimanté sur ce bord, sinon le point tel
   quel (tracé libre). */
function tbSnapToEdge(pt){
  let best=null, bestDist=32, bestTool=null, bestAX,bestAY,bestBX,bestBY;
  tbTools.forEach(t=>{
    const def = TB_DEFS[t.type];
    if(!def || !def.edges || !def.edges.length) return;
    const rad = t.angle*Math.PI/180, cos=Math.cos(rad), sin=Math.sin(rad);
    def.edges.forEach(e=>{
      const ax = t.x + e.x1*cos - e.y1*sin, ay = t.y + e.x1*sin + e.y1*cos;
      const bx = t.x + e.x2*cos - e.y2*sin, by = t.y + e.x2*sin + e.y2*cos;
      const proj = tbProjectOntoSegment(pt, ax, ay, bx, by, 26);
      if(proj && proj.dist < bestDist){ bestDist = proj.dist; best = {x:proj.x, y:proj.y}; bestTool=t; bestAX=ax; bestAY=ay; bestBX=bx; bestBY=by; }
    });
  });
  if(best && bestTool && bestTool.activeConstraint){
    best = tbApplyConstraint(bestTool, best, bestAX, bestAY, bestBX, bestBY);
  }
  return best || pt;
}
/* Si l'outil sur lequel le crayon s'aimante a une contrainte armée (segment/demi-droite/droite,
   posée via les boutons [AB]/[AB)/(AB)) : borne la position aimantée en conséquence, pour que
   le geste du professeur ne puisse jamais déborder de A (et de B pour un segment), tout en
   restant un vrai tracé à la main -- pas un tracé automatique. */
function tbApplyConstraint(tool, snapped, ax, ay, bx, by){
  const c = tool.activeConstraint;
  const A = tbPoints.find(p=>p.id===c.aId), B = tbPoints.find(p=>p.id===c.bId);
  if(!A || !B) return snapped;
  const dx=bx-ax, dy=by-ay, len2=dx*dx+dy*dy || 1;
  const tA = ((A.x-ax)*dx+(A.y-ay)*dy)/len2, tB = ((B.x-ax)*dx+(B.y-ay)*dy)/len2;
  let t = ((snapped.x-ax)*dx+(snapped.y-ay)*dy)/len2;
  if(c.mode==='segment'){
    t = Math.max(Math.min(tA,tB), Math.min(Math.max(tA,tB), t));
  } else if(c.mode==='demidroite'){
    t = (tA<=tB) ? Math.max(tA, t) : Math.min(tA, t);
  }
  return {x: ax+t*dx, y: ay+t*dy};
}
/* Aimante un outil-guide (règle, équerre, réquerre, rapporteur) sur un point déjà posé : si un
   de ses bords passe à moins de 16px d'un point pendant qu'on le déplace, on décale légèrement
   l'outil pour que ce bord passe exactement par ce point -- comme si on approchait vraiment une
   règle d'un point tracé au crayon et qu'elle s'y calait. Modifie l'outil directement. */
/* Aimante spécifiquement le pivot (centre) du rapporteur sur un point déjà posé -- prioritaire
   sur l'aimantage générique par bord, car c'est bien le pivot (le sommet de l'angle) qui doit
   coïncider avec le point, pas n'importe quel endroit du bord gradué. */
function tbSnapProtractorPivot(tool){
  let best=null, bestDist=26;
  tbPoints.forEach(p=>{
    const d = Math.hypot(p.x-tool.x, p.y-tool.y);
    if(d<bestDist){ bestDist=d; best=p; }
  });
  if(best){ tool.x = best.x; tool.y = best.y; }
}
function tbSnapToolToPoints(tool){
  const def = TB_DEFS[tool.type];
  if(!def || !def.edges || !def.edges.length || !tbPoints.length) return;
  const rad = tool.angle*Math.PI/180, cos=Math.cos(rad), sin=Math.sin(rad);
  let bestOffset=null, bestDist=32;
  def.edges.forEach(e=>{
    const ax = tool.x + e.x1*cos - e.y1*sin, ay = tool.y + e.x1*sin + e.y1*cos;
    const bx = tool.x + e.x2*cos - e.y2*sin, by = tool.y + e.x2*sin + e.y2*cos;
    tbPoints.forEach(p=>{
      const proj = tbProjectOntoSegment({x:p.x,y:p.y}, ax, ay, bx, by, 26);
      if(proj && proj.dist < bestDist){ bestDist = proj.dist; bestOffset = {dx: p.x-proj.x, dy: p.y-proj.y}; }
    });
  });
  if(bestOffset){ tool.x += bestOffset.dx; tool.y += bestOffset.dy; }
}
/* Points déjà posés qui se trouvent sur le bord "actif" d'un outil-guide (celui utilisé par le
   crayon pour s'aimanter), triés le long du bord. Sert à proposer des actions directes
   (segment/demi-droite/droite) une fois que 2 points ou plus sont alignés dessus -- bien plus
   fiable qu'un tracé manuel pour ne jamais déborder de A ou B. */
function tbPointsOnEdge(tool){
  const def = TB_DEFS[tool.type];
  if(!def || !def.edges || !def.edges.length || !tbPoints.length) return [];
  const e = def.edges[0];
  const rad = tool.angle*Math.PI/180, cos=Math.cos(rad), sin=Math.sin(rad);
  const ax = tool.x + e.x1*cos - e.y1*sin, ay = tool.y + e.x1*sin + e.y1*cos;
  const bx = tool.x + e.x2*cos - e.y2*sin, by = tool.y + e.x2*sin + e.y2*cos;
  const dx=bx-ax, dy=by-ay, len2=dx*dx+dy*dy;
  const found=[];
  tbPoints.forEach(p=>{
    const proj = tbProjectOntoSegment({x:p.x,y:p.y}, ax, ay, bx, by, 6);
    if(proj && proj.dist < 12){ found.push({point:p, t: ((p.x-ax)*dx+(p.y-ay)*dy)/len2}); }
  });
  found.sort((a,b)=>a.t-b.t);
  return found.map(f=>f.point);
}
/* Prolonge un rayon depuis "origin" dans la direction unitaire "dir" jusqu'au bord du tableau. */
function tbExtendToBoardEdge(origin, dir, W, H){
  let tMax = Infinity;
  if(dir.x>1e-9) tMax = Math.min(tMax, (W-origin.x)/dir.x);
  else if(dir.x<-1e-9) tMax = Math.min(tMax, (0-origin.x)/dir.x);
  if(dir.y>1e-9) tMax = Math.min(tMax, (H-origin.y)/dir.y);
  else if(dir.y<-1e-9) tMax = Math.min(tMax, (0-origin.y)/dir.y);
  if(!isFinite(tMax) || tMax<0) tMax = 0;
  return {x: origin.x+tMax*dir.x, y: origin.y+tMax*dir.y};
}
function tbRender(){
  const W=900, H=560;
  const inkHtml = tbInk.map(s=>`<polyline points="${s.points.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="none" stroke="${s.construction?'#9CA3AF':s.color}" stroke-width="${s.construction?'1.2':'2.4'}" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
  const pointsHtml = tbPoints.map(pt=>{
    const mark = pt.radial
      ? `<line x1="${(pt.x-9*Math.cos(pt.angle)).toFixed(1)}" y1="${(pt.y-9*Math.sin(pt.angle)).toFixed(1)}" x2="${(pt.x+9*Math.cos(pt.angle)).toFixed(1)}" y2="${(pt.y+9*Math.sin(pt.angle)).toFixed(1)}" stroke="#1C1B2E" stroke-width="2.4"/>`
      : `<line x1="${pt.x-7}" y1="${pt.y-7}" x2="${pt.x+7}" y2="${pt.y+7}" stroke="#1C1B2E" stroke-width="2"/>
         <line x1="${pt.x-7}" y1="${pt.y+7}" x2="${pt.x+7}" y2="${pt.y-7}" stroke="#1C1B2E" stroke-width="2"/>`;
    return `<g data-role="point" data-id="${pt.id}" style="cursor:pointer;">
    ${mark}
    <circle cx="${pt.x}" cy="${pt.y}" r="20" fill="transparent" pointer-events="all"/>
    <text x="${pt.x+11}" y="${pt.y-8}" font-size="16" font-weight="700" font-family="'Space Grotesk',sans-serif" fill="#1C1B2E">${escapeHtml(pt.label||'')}</text>
  </g>`;
  }).join('');
  let protractorPreview = '';
  if(tbDrag && tbDrag.mode==='protractorRay'){
    const ptool = tbTools.find(t=>t.id===tbDrag.id);
    if(ptool){
      const ang = Math.atan2(tbDrag.curY-ptool.y, tbDrag.curX-ptool.x)*180/Math.PI;
      protractorPreview = `<g transform="translate(${tbDrag.curX.toFixed(1)},${tbDrag.curY.toFixed(1)}) rotate(${(ang+90).toFixed(1)})">
        <rect x="-4.5" y="-23" width="9" height="9" fill="#D93025" stroke="#1C1B2E" stroke-width="1"/>
        <rect x="-4.5" y="-14" width="9" height="10" fill="#E8B93A" stroke="#1C1B2E" stroke-width="1"/>
        <polygon points="-4.5,-4 4.5,-4 0,0" fill="#D9B48F" stroke="#1C1B2E" stroke-width="1"/>
      </g>`;
    }
  }
  const toolsHtml = tbTools.map(t=>{
    if(t.type==='compas'){
      const rad = t.angle*Math.PI/180;
      // "pointe" = l'ancrage fixe (t.x,t.y) ; "mine" = le crayon qui trace, à l'autre bout.
      const mineX = t.x+t.radius*Math.cos(rad), mineY = t.y+t.radius*Math.sin(rad);
      const distTotal = Math.hypot(mineX-t.x, mineY-t.y) || 1;
      const perpX = (mineY-t.y)/distTotal, perpY = -(mineX-t.x)/distTotal;
      // Longueur des branches FIXE (comme un vrai compas) : la charnière se rapproche de la
      // base pointe-mine à mesure qu'on écarte, sans jamais rallonger les branches elles-mêmes.
      const half = distTotal/2;
      const hingeH = Math.sqrt(Math.max(TB_COMPASS_LEG*TB_COMPASS_LEG - half*half, 900));
      const midX=(t.x+mineX)/2 + perpX*hingeH, midY=(t.y+mineY)/2 + perpY*hingeH;
      const mineAngle = Math.atan2(mineY-midY, mineX-midX)*180/Math.PI;
      const hingeAngle = Math.atan2(perpY,perpX)*180/Math.PI+90;
      // 3 états pour la branche du crayon : "open" (écarter librement), "closed" (tourner sans
      // rien tracer, rayon bloqué -- pour repositionner sans laisser de trace), "draw" (tourner
      // trace vraiment, rayon bloqué).
      if(!t.mode) t.mode = 'open';
      const modeInfo = {
        open:   {color:'#2EA8C9', emoji:'↔️', label:'Ouvrir'},
        closed: {color:'#D93025', emoji:'🔒', label:'Fermé'},
        draw:   {color:'#1F7A4D', emoji:'✏️', label:'Crayon'},
      }[t.mode];
      const modeColor = modeInfo.color, modeEmoji = modeInfo.emoji, modeLabel = modeInfo.label;
      const legCursor = t.mode==='open' ? 'ew-resize' : (t.mode==='draw' ? 'crosshair' : 'grab');
      const iconX = midX + perpX*32, iconY = midY + perpY*32;
      const anchorAngle = Math.atan2(t.y-midY, t.x-midX)*180/Math.PI;
      return `<g>
        <line data-role="compassAnchorLeg" data-id="${t.id}" x1="${t.x}" y1="${t.y}" x2="${midX}" y2="${midY}" stroke="#1C1B2E" stroke-width="5" stroke-linecap="round" style="cursor:grab;"/>
        <line data-role="compassAnchorLeg" data-id="${t.id}" x1="${t.x.toFixed(1)}" y1="${t.y.toFixed(1)}" x2="${midX.toFixed(1)}" y2="${midY.toFixed(1)}" stroke="transparent" stroke-width="26" style="cursor:grab;"/>
        <line data-role="compassPencilLeg" data-id="${t.id}" x1="${mineX}" y1="${mineY}" x2="${midX}" y2="${midY}" stroke="#1C1B2E" stroke-width="5" stroke-linecap="round" style="cursor:${legCursor};"/>
        <line data-role="compassPencilLeg" data-id="${t.id}" x1="${mineX.toFixed(1)}" y1="${mineY.toFixed(1)}" x2="${midX.toFixed(1)}" y2="${midY.toFixed(1)}" stroke="transparent" stroke-width="26" style="cursor:${legCursor};"/>
        <g transform="translate(${t.x.toFixed(1)},${t.y.toFixed(1)}) rotate(${(anchorAngle-90).toFixed(1)})">
          <polygon points="0,0 -3.5,-18 3.5,-18" fill="#6B7280" stroke="#1C1B2E" stroke-width="1"/>
        </g>
        <g transform="translate(${mineX.toFixed(1)},${mineY.toFixed(1)}) rotate(${(mineAngle-90).toFixed(1)})">
          <rect x="-4.5" y="-22" width="9" height="8" fill="#D93025" stroke="#1C1B2E" stroke-width="1.1"/>
          <rect x="-4.5" y="-14" width="9" height="10" fill="#E8B93A" stroke="#1C1B2E" stroke-width="1.1"/>
          <polygon points="-4.5,-4 4.5,-4 0,0" fill="#D9B48F" stroke="#1C1B2E" stroke-width="1.1"/>
          <polygon points="-1.6,-1.3 1.6,-1.3 0,0" fill="#3a2b1f"/>
        </g>
        <g transform="translate(${midX.toFixed(1)},${midY.toFixed(1)}) rotate(${hingeAngle.toFixed(1)})">
          <ellipse cx="0" cy="0" rx="12" ry="16" fill="#2EA8C9" stroke="#1C1B2E" stroke-width="1.6"/>
          <circle cx="-4" cy="-4" r="1.7" fill="#1C1B2E"/>
          <circle cx="4" cy="-4" r="1.7" fill="#1C1B2E"/>
          <circle cx="0" cy="-19" r="7" fill="#2EA8C9" stroke="#1C1B2E" stroke-width="1.4"/>
        </g>
        <g data-role="compassLockIcon" data-id="${t.id}" transform="translate(${iconX.toFixed(1)},${iconY.toFixed(1)})" style="cursor:pointer;">
          <circle cx="0" cy="0" r="14" fill="${modeColor}" stroke="#fff" stroke-width="1.8"/>
          <text x="0" y="5" font-size="13" text-anchor="middle">${modeEmoji}</text>
        </g>
        <text x="${iconX.toFixed(1)}" y="${(iconY-20).toFixed(1)}" font-size="9" text-anchor="middle" fill="#1C1B2E" font-weight="700">${modeLabel}</text>
      </g>`;
    }
    const def = TB_DEFS[t.type];
    const rh = def.rotateHandle;
    // Rapporteur : un petit crayon posé à 90° par défaut (mine exactement sur le bord
    // extérieur), qu'on peut faire tourner autour du pivot -- sa position (angle) est mémorisée
    // d'un geste à l'autre, donc il reste où on l'a laissé plutôt que de revenir toujours à 90°.
    // Un simple glissé ne fait que le repositionner (rien n'est posé) ; il faut un double-clic
    // pour vraiment poser un repère à l'endroit visé.
    if(t.rayAngle===undefined) t.rayAngle = -90;
    const rayRad = t.rayAngle*Math.PI/180;
    const rayLocalX = TB_PROT_RADIUS*Math.cos(rayRad), rayLocalY = TB_PROT_RADIUS*Math.sin(rayRad);
    const isDraggingThisRay = tbDrag && tbDrag.mode==='protractorRay' && tbDrag.id===t.id;
    const protractorRay = t.type==='rapporteur' ? `<g data-role="protractorRay" data-id="${t.id}" style="cursor:grab;" transform="translate(${rayLocalX.toFixed(1)},${rayLocalY.toFixed(1)}) rotate(${(t.rayAngle+90).toFixed(1)})">
      ${isDraggingThisRay ? '' : `<rect x="-4.5" y="-23" width="9" height="9" fill="#D93025" stroke="#1C1B2E" stroke-width="1"/>
      <rect x="-4.5" y="-14" width="9" height="10" fill="#E8B93A" stroke="#1C1B2E" stroke-width="1"/>
      <polygon points="-4.5,-4 4.5,-4 0,0" fill="#D9B48F" stroke="#1C1B2E" stroke-width="1"/>`}
      <circle cx="0" cy="0" r="22" fill="transparent"/>
    </g>` : '';
    return `<g transform="translate(${t.x.toFixed(1)},${t.y.toFixed(1)}) rotate(${t.angle.toFixed(1)})">
      <g data-role="body" data-id="${t.id}">${def.svg(t.id)}</g>${protractorRay}
      ${rh ? `<circle data-role="rotate" data-id="${t.id}" cx="${rh.x}" cy="${rh.y}" r="${rh.r||11}" fill="#0D5BA3" fill-opacity="${rh.opacity!==undefined?rh.opacity:1}" stroke="#fff" stroke-width="1.6"/>` : ''}
    </g>`;
  }).join('');
  // Pour chaque outil-guide (règle, équerre...) sur lequel au moins 2 points posés sont
  // alignés : propose 3 boutons pour ARMER le crayon en mode segment/demi-droite/droite entre
  // les deux points les plus extrêmes. Le tracé lui-même reste un vrai geste du professeur (on
  // montre comment on trace) -- seul le résultat est contraint pour ne jamais déborder de A ou
  // B (ou, à l'inverse, prolonger exactement comme demandé).
  let segActionsHtml = '';
  tbTools.forEach(t=>{
    if(t.type==='crayon' || t.type==='compas') return;
    const pts = tbPointsOnEdge(t);
    if(pts.length<2) return;
    const A = pts[0], B = pts[pts.length-1];
    const midX=(A.x+B.x)/2, midY=(A.y+B.y)/2;
    const active = t.activeConstraint;
    const mk=(dx,label,mode)=>{
      const on = active && active.mode===mode && active.aId===A.id && active.bId===B.id;
      return `<g data-role="segAction" data-tool="${t.id}" data-a="${A.id}" data-b="${B.id}" data-mode="${mode}" transform="translate(${(midX+dx).toFixed(1)},${(midY+30).toFixed(1)})" style="cursor:pointer;">
      <rect x="-27" y="-12" width="54" height="24" rx="5" fill="${on?'#1F7A4D':'#0D5BA3'}" stroke="#fff" stroke-width="1.2"/>
      <text x="0" y="5" font-size="12" text-anchor="middle" fill="#fff" font-weight="700">${on?'✓ ':''}${label}</text>
    </g>`;
    };
    segActionsHtml += mk(-62,'[AB]','segment') + mk(0,'[AB)','demidroite') + mk(62,'(AB)','droite');
  });
  document.getElementById('tbBoardWrap').innerHTML = `<svg id="tbSvg" width="100%" viewBox="0 0 ${W} ${H}" style="display:block;touch-action:none;user-select:none;background:#fff;">
    <g id="tbInkLayer">${inkHtml}${pointsHtml}${protractorPreview}</g>
    <g id="tbToolsLayer">${toolsHtml}${segActionsHtml}</g>
  </svg>`;
  tbAttachHandlers();
}
/* Fenêtre de choix du nom d'un point : lettres majuscules en boutons, sans passer par le
   clavier. Les lettres déjà utilisées par un autre point disparaissent de la liste (sauf celle
   du point qu'on est en train de renommer, qui reste sélectionnable pour elle-même). */
function tbOpenLetterPicker(currentLabel){
  return new Promise(resolve=>{
    const used = new Set(tbPoints.map(p=>p.label).filter(Boolean));
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l=>!used.has(l) || l===currentLabel);
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'display:flex;z-index:200;';
    overlay.innerHTML = `<div style="background:#fff;border-radius:12px;padding:22px;max-width:360px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.25);">
      <h3 style="margin:0 0 14px;font-family:'Space Grotesk',sans-serif;">Nom du point</h3>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin-bottom:16px;">
        ${letters.map(l=>`<button type="button" data-letter="${l}" style="padding:10px 0;border-radius:7px;border:1.5px solid ${l===currentLabel?'#0D5BA3':'rgba(28,43,57,.2)'};background:${l===currentLabel?'#0D5BA3':'#fff'};color:${l===currentLabel?'#fff':'#1C1B2E'};font-weight:700;font-size:1.05rem;cursor:pointer;">${l}</button>`).join('')}
      </div>
      <div style="display:flex;gap:8px;justify-content:center;">
        <button type="button" data-letter="" style="padding:8px 16px;border-radius:7px;border:1px solid rgba(28,43,57,.2);background:#fff;cursor:pointer;">Aucun nom</button>
        <button type="button" id="tbLetterCancel" style="padding:8px 16px;border-radius:7px;border:none;background:rgba(28,43,57,.08);cursor:pointer;">Annuler</button>
      </div>
    </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target===overlay){ document.body.removeChild(overlay); resolve(null); } });
    overlay.querySelectorAll('[data-letter]').forEach(btn=>{
      btn.addEventListener('click', ()=>{ document.body.removeChild(overlay); resolve(btn.dataset.letter); });
    });
    document.getElementById('tbLetterCancel').addEventListener('click', ()=>{ document.body.removeChild(overlay); resolve(null); });
  });
}
async function tbRenamePoint(id){
  const point = tbPoints.find(p=>p.id===id);
  if(!point) return;
  const label = await tbOpenLetterPicker(point.label||'');
  if(label===null) return;
  if(!label){ tbPoints = tbPoints.filter(p=>p.id!==id); } else { point.label = label; }
  tbRender();
}
function tbAttachHandlers(){
  const svg = document.getElementById('tbSvg');
  svg.style.cursor = 'default';
  svg.onpointerdown = (e)=>{
    const target = e.target.closest('[data-role]');
    if(!target) return;
    const role = target.dataset.role;
    const id = parseInt(target.dataset.id);
    const pt = tbSvgPoint(e);
    if(role==='point'){
      const point = tbPoints.find(p=>p.id===id);
      if(point) tbDrag = {mode:'point', id, startX:pt.x, startY:pt.y, moved:false};
      try{ svg.setPointerCapture(e.pointerId); }catch(err){}
      e.preventDefault();
      return;
    }
    if(role==='segAction'){
      const toolId = parseInt(target.dataset.tool), aId = parseInt(target.dataset.a), bId = parseInt(target.dataset.b), mode = target.dataset.mode;
      const t = tbTools.find(x=>x.id===toolId);
      if(t){
        const same = t.activeConstraint && t.activeConstraint.mode===mode && t.activeConstraint.aId===aId && t.activeConstraint.bId===bId;
        t.activeConstraint = same ? null : {aId, bId, mode};
        tbRender();
      }
      return;
    }
    const tool = tbTools.find(t=>t.id===id);
    if(!tool) return;
    if(TB_HELP_TEXT[tool.type]) tbSetHelp(tool.type);
    if(role==='body' || role==='pencilBody'){
      // Déplace l'outil SANS tracer -- pour le crayon, c'est le moyen de le repositionner
      // ailleurs sans laisser de trait jusque-là (comme le lever de la feuille).
      tbDrag = {mode:'move', id, offX: pt.x-tool.x, offY: pt.y-tool.y};
    } else if(role==='rotate'){
      tbDrag = {mode:'rotate', id};
    } else if(role==='compassAnchorLeg'){
      // La branche qui porte la pointe (l'ancrage fixe) déplace tout l'ensemble -- la pointe
      // s'aimante sur un point déjà posé si on en approche.
      tbDrag = {mode:'compassMoveViaAnchorLeg', id, offX: pt.x-tool.x, offY: pt.y-tool.y};
    } else if(role==='compassLockIcon'){
      // Fait défiler les 3 états : "Ouvrir" (écarter) → "Fermé" (tourner sans rien tracer, pour
      // repositionner) → "Crayon" (tourner trace vraiment) → et on reboucle.
      const order = ['open','closed','draw'];
      if(!tool.mode) tool.mode = 'open';
      tool.mode = order[(order.indexOf(tool.mode)+1) % 3];
      tbRender();
      return;
    } else if(role==='compassPencilLeg'){
      if(tool.mode==='draw'){
        // Rayon bloqué, tourner cette branche trace vraiment l'arc/cercle.
        tbDrag = {mode:'compassTrace', id, stroke:{color: tbCurrentColor(), construction: tbConstructionMode, points:[]}};
        tbInk.push(tbDrag.stroke);
      } else if(tool.mode==='closed'){
        // Rayon bloqué, tourner cette branche repositionne SANS rien tracer et sans pouvoir
        // écarter les branches -- pour amener le compas à l'angle de départ sans laisser de trace.
        tbDrag = {mode:'compassRotateOnly', id};
      } else {
        // "Ouvrir" : cette branche écarte/resserre le compas (ajuste rayon et angle) sans rien
        // tracer -- s'aimante sur un point déjà posé si on en approche.
        tbDrag = {mode:'compassAdjust', id};
      }
    } else if(role==='tip'){
      if(tool.type==='crayon'){
        // On ne sait pas encore si ce sera un tracé (glissé) ou un simple point (relâché sans
        // avoir bougé) -- le trait est ajouté tout de suite mais retiré au relâché si rien n'a
        // bougé, remplacé alors par un point nommé. La position de départ passe elle aussi par
        // l'aimantage (donc par une éventuelle contrainte armée), pour un tracé cohérent dès le
        // premier point, pas seulement une fois qu'on a commencé à bouger.
        const startSnapped = tbSnapToEdge({x:tool.x, y:tool.y});
        tool.x = startSnapped.x; tool.y = startSnapped.y;
        const stroke = {color: tbCurrentColor(), construction: tbConstructionMode, points:[[tool.x,tool.y]]};
        tbInk.push(stroke);
        tbDrag = {mode:'pencil', id, stroke, startX:pt.x, startY:pt.y, moved:false};
      }
    } else if(role==='protractorRay'){
      // Un simple glissé ne fait que repositionner le crayon (son angle est mémorisé) --
      // rien n'est posé au relâché. Il faut un double-clic pour vraiment poser un repère à
      // l'endroit visé, pour éviter de tracer par erreur en ajustant juste la position.
      const now = Date.now();
      if(tool._lastRayClick && now - tool._lastRayClick < 400){
        tool._lastRayClick = 0;
        const rayRad = tool.rayAngle*Math.PI/180;
        const rx = tool.x + TB_PROT_RADIUS*Math.cos(rayRad), ry = tool.y + TB_PROT_RADIUS*Math.sin(rayRad);
        tbPoints.push({id: tbPointNextId++, x: rx, y: ry, label:'', radial:true, angle: rayRad});
        tbRender();
        return;
      }
      tool._lastRayClick = now;
      tbDrag = {mode:'protractorRay', id, curX: pt.x, curY: pt.y};
    }
    try{ svg.setPointerCapture(e.pointerId); }catch(err){}
    e.preventDefault();
  };
  svg.onpointermove = (e)=>{
    if(!tbDrag) return;
    const pt = tbSvgPoint(e);
    if(tbDrag.mode==='point'){
      const point = tbPoints.find(p=>p.id===tbDrag.id);
      if(!point){ tbDrag=null; return; }
      if(Math.hypot(pt.x-tbDrag.startX, pt.y-tbDrag.startY) > 5) tbDrag.moved = true;
      point.x = pt.x; point.y = pt.y;
      tbRender();
      return;
    }
    const tool = tbTools.find(t=>t.id===tbDrag.id);
    if(!tool){ tbDrag=null; return; }
    if(tbDrag.mode==='move'){
      tool.x = pt.x - tbDrag.offX; tool.y = pt.y - tbDrag.offY;
      if(tool.type==='gomme'){ tbEraseNear(tool.x, tool.y, 18); }
      else if(tool.type==='rapporteur'){ tbSnapProtractorPivot(tool); }
      else if(tool.type!=='crayon') tbSnapToolToPoints(tool);
    } else if(tbDrag.mode==='rotate'){
      let angle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI;
      if(tool.type==='rapporteur'){
        // Aligne le côté 0°-180° vers un point déjà posé si la direction visée passe tout
        // près -- comme quand on tourne le rapporteur pour caler son bord sur un côté déjà
        // tracé de l'angle.
        let bestAngle=null, bestDiff=6;
        tbPoints.forEach(p=>{
          const d = Math.hypot(p.x-tool.x, p.y-tool.y);
          if(d<12) return; // trop proche du pivot pour être le point visé
          const a = Math.atan2(p.y-tool.y, p.x-tool.x)*180/Math.PI;
          let diff = Math.abs(a-angle); if(diff>180) diff=360-diff;
          if(diff<bestDiff){ bestDiff=diff; bestAngle=a; }
        });
        if(bestAngle!==null) angle = bestAngle;
      }
      tool.angle = angle;
    } else if(tbDrag.mode==='pencil'){
      if(Math.hypot(pt.x-tbDrag.startX, pt.y-tbDrag.startY) > 5) tbDrag.moved = true;
      const snapped = tbSnapToEdge(pt);
      tool.x = snapped.x; tool.y = snapped.y;
      tbDrag.stroke.points.push([tool.x, tool.y]);
    } else if(tbDrag.mode==='compassMoveViaAnchorLeg'){
      // Déplace tout le compas en gardant rayon et angle inchangés -- la pointe (l'ancrage
      // fixe) s'aimante sur un point déjà posé si on en approche.
      let newX = pt.x - tbDrag.offX, newY = pt.y - tbDrag.offY;
      let bestDist = 22;
      tbPoints.forEach(p=>{ const d=Math.hypot(p.x-newX,p.y-newY); if(d<bestDist){ bestDist=d; newX=p.x; newY=p.y; } });
      tool.x = newX; tool.y = newY;
    } else if(tbDrag.mode==='compassAdjust'){
      // Écarte/resserre les branches (via la branche du crayon, mode "Ouvrir") sans rien
      // tracer -- s'aimante sur un point déjà posé si on en approche, pour bien viser où doit
      // passer l'arc avant de tracer.
      let target = pt, bestDist = 22;
      tbPoints.forEach(p=>{ const d=Math.hypot(p.x-pt.x,p.y-pt.y); if(d<bestDist){ bestDist=d; target={x:p.x,y:p.y}; } });
      const dx = target.x-tool.x, dy = target.y-tool.y;
      tool.radius = Math.max(20, Math.hypot(dx,dy));
      tool.angle = Math.atan2(dy,dx)*180/Math.PI;
    } else if(tbDrag.mode==='compassRotateOnly'){
      // Mode "Fermé" : tourne la branche du crayon SANS jamais toucher au rayon et sans rien
      // tracer -- pour amener le compas à l'angle de départ sans laisser de trace.
      tool.angle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI;
    } else if(tbDrag.mode==='compassTrace'){
      // Rayon fixe (déjà réglé en mode viser ou par la poignée d'écartement) : seule la
      // rotation compte. On interpole plusieurs points intermédiaires si le saut angulaire est
      // grand, pour un arc lisse même quand la rotation va vite (évite les segments visibles).
      const newAngle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI;
      let delta = newAngle - tool.angle;
      while(delta>180) delta-=360;
      while(delta<-180) delta+=360;
      const steps = Math.max(1, Math.ceil(Math.abs(delta)/4));
      for(let i=1;i<=steps;i++){
        const a = (tool.angle + delta*i/steps) * Math.PI/180;
        tbDrag.stroke.points.push([tool.x+tool.radius*Math.cos(a), tool.y+tool.radius*Math.sin(a)]);
      }
      tool.angle = newAngle;
    } else if(tbDrag.mode==='protractorRay'){
      // La mine ne doit jamais s'écarter du rapporteur : seul l'angle change, le rayon reste
      // toujours exactement celui du bord extérieur. L'angle est mémorisé sur l'outil (pas
      // seulement dans le geste en cours), pour qu'il reste où on l'a laissé après le relâché.
      const ptool = tbTools.find(t=>t.id===tbDrag.id);
      if(ptool){
        const ang = Math.atan2(pt.y-ptool.y, pt.x-ptool.x);
        ptool.rayAngle = ang*180/Math.PI;
        tbDrag.curX = ptool.x + TB_PROT_RADIUS*Math.cos(ang);
        tbDrag.curY = ptool.y + TB_PROT_RADIUS*Math.sin(ang);
      }
    }
    tbRender();
  };
  svg.onpointerup = async ()=>{
    if(tbDrag && tbDrag.mode==='point'){
      const wasMoved = tbDrag.moved, id = tbDrag.id;
      tbDrag = null;
      if(!wasMoved) await tbRenamePoint(id);
      return;
    }
    if(tbDrag && tbDrag.mode==='pencil' && !tbDrag.moved){
      // Tap sans glissement : on retire le trait (vide) commencé, et on pose un point nommé à
      // la place, comme un vrai crayon qu'on pose sur la feuille pour marquer un point.
      tbInk = tbInk.filter(s=>s!==tbDrag.stroke);
      const tool = tbTools.find(t=>t.id===tbDrag.id);
      tbDrag = null;
      if(tool){
        const label = await tbOpenLetterPicker('');
        if(label!==null) tbPoints.push({id: tbPointNextId++, x: tool.x, y: tool.y, label});
        tbRender();
      }
      return;
    }
    if(tbDrag && tbDrag.mode==='protractorRay'){
      // Un simple relâché ne pose plus rien : l'angle a déjà été mémorisé pendant le glissé
      // (pointermove), il ne reste qu'à nettoyer l'état du geste.
      tbDrag = null;
      tbRender();
      return;
    }
    tbDrag = null;
  };
  svg.onpointerleave = ()=>{ tbDrag = null; };
}

/* ======================= init ======================= */
renderNiveau('6e');

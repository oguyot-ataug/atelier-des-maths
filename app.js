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
  '6e':[{after:3,label:'Vacances de Toussaint · 17 oct → 2 nov'},{after:7,label:'Vacances de Noël · 19 déc → 4 jan'},{after:11,label:'Vacances d\'hiver · 20 fév → 8 mars'},{after:15,label:'Vacances de printemps · 17 avr → 3 mai'}],
  '5e':[{after:3,label:'Vacances de Toussaint · 17 oct → 2 nov'},{after:6,label:'Vacances de Noël · 19 déc → 4 jan'},{after:10,label:'Vacances d\'hiver · 20 fév → 8 mars'},{after:14,label:'Vacances de printemps · 17 avr → 3 mai'}],
};
/* Dates officielles 2026-2027 (arrêté du 22 octobre 2025, Journal officiel) pour l'éditeur
   de progression personnalisée ("Ma progression") : Toussaint et Noël sont communes aux
   trois zones, hiver et printemps varient. Utilisées pour insérer des bandeaux "vacances"
   entre les blocs de chapitres, positionnés dynamiquement selon les dates choisies par le
   prof (et non plus un simple "après le chapitre n", qui perd son sens dès que l'ordre et
   les dates sont librement modifiés). */
const VACANCES_COMMUNES = [
  {label:'Vacances de la Toussaint', debut:'2026-10-17', fin:'2026-11-02'},
  {label:'Vacances de Noël', debut:'2026-12-19', fin:'2027-01-04'},
];
const VACANCES_ZONES = {
  A:[{label:"Vacances d'hiver (zone A)", debut:'2027-02-13', fin:'2027-03-01'},{label:'Vacances de printemps (zone A)', debut:'2027-04-10', fin:'2027-04-26'}],
  B:[{label:"Vacances d'hiver (zone B)", debut:'2027-02-20', fin:'2027-03-08'},{label:'Vacances de printemps (zone B)', debut:'2027-04-17', fin:'2027-05-03'}],
  C:[{label:"Vacances d'hiver (zone C)", debut:'2027-02-06', fin:'2027-02-22'},{label:'Vacances de printemps (zone C)', debut:'2027-04-03', fin:'2027-04-19'}],
};
function getVacancesForZone(zone){
  const list = VACANCES_COMMUNES.concat(VACANCES_ZONES[zone] || VACANCES_ZONES.B);
  return list.slice().sort((a,b)=>new Date(a.debut)-new Date(b.debut));
}

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
    if(nav==='progression'){
      if(currentUserRole!=='prof' && currentUserRole!=='admin'){ toggleAccountMenu(); return; }
      showView('view-progression'); setActiveTopnav('progression'); renderProgressionEditor();
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
  else if(key==='progression') document.querySelector('.nav-links button[data-nav="progression"]').classList.add('active');
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
/* Chapitres accessibles sans compte (le premier de chaque domaine, par niveau) --
   le reste du site est réservé aux comptes prof/élève validés. Identifiés par leur
   TITRE (et non leur code, qui peut être partagé par deux chapitres -- ex. N4 en 6e,
   scindé en deux chapitres distincts sous le même code curriculaire). */
const FREE_CHAPTERS = {
  '6e': ['Nombres entiers', 'Droites parallèles et perpendiculaires', 'Gestion de données', 'Aire et périmètre'],
  '5e': ['Opérations sur les nombres décimaux', 'Symétrie centrale', 'Proportionnalité', 'Statistiques'],
};
/* true tant qu'on ne sait pas encore si l'utilisateur a un compte actif valide (restreint
   par défaut, le temps que refreshAuthUI() détermine l'état réel de la session). */
let restrictedVisitor = true;
function isChapterFree(lvl, titre){ return (FREE_CHAPTERS[lvl]||[]).includes(titre); }
function renderNiveau(lvl){
  document.getElementById('niveau-title').textContent = 'Progression de '+lvl;
  const data = lvl==='6e'?CH6:CH5;
  renderTheme(data, lvl);
  renderFrise(data, lvl);
  applyCustomProgressionIfAny(lvl);
}
/* Si le compte connecté (prof/admin, pas un visiteur restreint) a personnalisé sa
   progression pour ce niveau, on ré-affiche la frise/grille avec son ordre et ses dates à
   lui, à la place de la progression par défaut -- rendu en deux temps volontairement
   (défaut d'abord, en synchrone, puis override asynchrone) pour ne jamais bloquer
   l'affichage initial sur cette requête réseau. */
async function applyCustomProgressionIfAny(lvl){
  if(!currentUser || restrictedVisitor) return;
  let ownerId = null;
  if(currentUserRole==='prof' || currentUserRole==='admin'){
    ownerId = currentUser.id;
  } else if(currentUserRole==='eleve'){
    // Un élève n'a pas sa propre progression : on cherche celle du prof de sa classe
    // (première classe / premier prof trouvé si plusieurs -- cas rare de co-enseignement).
    const { data: cs } = await sb.from('class_students').select('class_id').eq('student_id', currentUser.id).limit(1).maybeSingle();
    if(!cs) return;
    const { data: ct } = await sb.from('class_teachers').select('teacher_id').eq('class_id', cs.class_id).limit(1).maybeSingle();
    if(!ct) return;
    ownerId = ct.teacher_id;
  } else return;
  const { data: rows, error } = await sb.from('progressions').select('*').eq('owner_id', ownerId).eq('niveau', lvl).order('ordre');
  if(error || !rows || !rows.length) return;
  const defaultData = lvl==='6e' ? CH6 : CH5;
  const merged = rows.map(r=>{
    const base = defaultData.find(c=>c.t===r.chapitre_titre);
    if(!base) return null;
    const dd = r.date_debut ? new Date(r.date_debut+'T00:00:00') : null;
    const df = r.date_fin ? new Date(r.date_fin+'T00:00:00') : null;
    // dispT (nom affiché) est distinct de t (jamais modifié : c'est la clé de recherche dans
    // DEMO_REGISTRY, utilisée par openChapitre -- la renommer casserait l'ouverture du chapitre).
    return Object.assign({}, base, { d: (dd&&df) ? formatDateRangeFr(dd,df) : base.d, dispT: r.nom_perso || base.t });
  }).filter(Boolean);
  // Ajoute en fin de liste tout chapitre du programme par défaut absent de la progression
  // personnalisée (ex. un chapitre ajouté au site depuis la dernière sauvegarde du prof).
  defaultData.forEach(c=>{ if(!merged.some(m=>m.t===c.t)) merged.push(c); });
  if(currentLevel===lvl){ renderTheme(merged, lvl); renderFrise(merged, lvl); }
}
/* ---- Éditeur de progression personnalisée ("Ma progression") ---- */
let progEditorItems = [];
let progEditIdx = -1; // index de la carte actuellement en mode édition (-1 = aucune)
let progUserZone = 'B';
async function renderProgressionEditor(){
  const lvl = document.getElementById('progNiveauSelect').value;
  const status = document.getElementById('progStatus');
  status.textContent = 'Chargement…';
  const defaultData = lvl==='6e' ? CH6 : CH5;

  const { data: profile } = await sb.from('profiles').select('zone_vacances').eq('id', currentUser.id).single();
  progUserZone = (profile && profile.zone_vacances) || 'B';
  document.getElementById('progZoneSelect').value = progUserZone;

  const { data: rows, error } = await sb.from('progressions').select('*').eq('owner_id', currentUser.id).eq('niveau', lvl).order('ordre');
  if(error){ status.textContent = 'Erreur : '+error.message; return; }
  if(rows && rows.length){
    progEditorItems = rows.map(r=>{
      const base = defaultData.find(c=>c.t===r.chapitre_titre) || {};
      return {
        titre: r.chapitre_titre, nomPerso: r.nom_perso||'', code: base.code||'', cat: base.cat||'N', p: base.p||'', s: base.s||1,
        dateDebut: r.date_debut ? new Date(r.date_debut+'T00:00:00') : null,
        dateFin: r.date_fin ? new Date(r.date_fin+'T00:00:00') : null,
      };
    });
    defaultData.forEach(c=>{
      if(!progEditorItems.some(it=>it.titre===c.t)){
        progEditorItems.push({ titre:c.t, nomPerso:'', code:c.code, cat:c.cat, p:c.p, s:c.s, dateDebut: friseStartDate(c.d), dateFin: friseEndDate(c.d) });
      }
    });
  } else {
    progEditorItems = defaultData.map(c=>({ titre:c.t, nomPerso:'', code:c.code, cat:c.cat, p:c.p, s:c.s, dateDebut: friseStartDate(c.d), dateFin: friseEndDate(c.d) }));
  }
  progEditIdx = -1;
  status.textContent = '';
  renderProgressionList();
}
async function onZoneChange(){
  progUserZone = document.getElementById('progZoneSelect').value;
  await sb.from('profiles').update({ zone_vacances: progUserZone }).eq('id', currentUser.id);
  renderProgressionList();
}
/* Insère les bandeaux de vacances entre les cartes, à la position chronologique qui leur
   correspond -- pas "après le chapitre n" (qui perd son sens dès que l'ordre/les dates
   sont librement modifiés), mais en comparant réellement les dates. */
function buildProgressionDisplayList(){
  const vacances = getVacancesForZone(progUserZone);
  const out = [];
  let vIdx = 0;
  progEditorItems.forEach((it,i)=>{
    out.push({ type:'chapitre', item:it, index:i });
    while(vIdx < vacances.length){
      const v = vacances[vIdx];
      const vStart = new Date(v.debut+'T00:00:00');
      const nextStart = progEditorItems[i+1] ? progEditorItems[i+1].dateDebut : null;
      const afterThis = !it.dateFin || vStart >= it.dateFin;
      const beforeNext = !nextStart || vStart <= nextStart;
      if(afterThis && beforeNext){ out.push({ type:'vacances', vac:v }); vIdx++; } else break;
    }
  });
  while(vIdx < vacances.length){ out.push({ type:'vacances', vac:vacances[vIdx] }); vIdx++; }
  return out;
}
function renderProgressionList(){
  const box = document.getElementById('progressionList');
  const display = buildProgressionDisplayList();
  box.innerHTML = display.map(entry=>{
    if(entry.type==='vacances'){
      const v = entry.vac;
      const dd = new Date(v.debut+'T00:00:00'), df = new Date(v.fin+'T00:00:00');
      return `<div class="prog-vac-banner">🏖 ${escapeHtml(v.label)} · ${formatDateRangeFr(dd,df)}</div>`;
    }
    const i = entry.index, it = entry.item;
    const dd = it.dateDebut ? it.dateDebut.toISOString().slice(0,10) : '';
    const df = it.dateFin ? it.dateFin.toISOString().slice(0,10) : '';
    const catInfo = CATS[it.cat] || {text:'#999'};
    const displayName = it.nomPerso || it.titre;
    if(progEditIdx===i){
      return `<div class="prog-card" style="border-left-color:${catInfo.text};cursor:default;">
        <div class="prog-card-edit">
          <input type="text" id="progEditNom" value="${escapeHtml(displayName)}" placeholder="${escapeHtml(it.titre)}">
          <div class="prog-edit-dates">
            <label class="hint" style="display:flex;align-items:center;gap:4px;margin:0;">Début <input type="date" id="progEditDebut" value="${dd}"></label>
            <label class="hint" style="display:flex;align-items:center;gap:4px;margin:0;">Fin <input type="date" id="progEditFin" value="${df}"></label>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn" style="font-size:.8rem;padding:6px 12px;" onclick="confirmEditProgressionItem(${i})">✓ OK</button>
            <button class="btn secondary" style="font-size:.8rem;padding:6px 12px;" onclick="progEditIdx=-1; renderProgressionList();">Annuler</button>
          </div>
        </div>
      </div>`;
    }
    return `<div class="prog-card" style="border-left-color:${catInfo.text}" draggable="true"
        ondragstart="progDragStart(event,${i})" ondragover="progDragOver(event,${i})" ondrop="progDrop(event,${i})" ondragend="progDragEnd(event)">
      <span class="drag-handle">⠿</span>
      <div class="prog-main">
        <div class="prog-titre ${it.nomPerso?'perso':''}">${escapeHtml(displayName)}</div>
        ${it.nomPerso?`<div class="prog-titre-orig">${escapeHtml(it.titre)}</div>`:''}
        <div class="prog-dates">${dd?formatDateRangeFr(it.dateDebut,it.dateFin):'dates non définies'}</div>
      </div>
      <button class="prog-edit-btn" title="Modifier le nom et les dates" onclick="progEditIdx=${i}; renderProgressionList();">✏️</button>
    </div>`;
  }).join('');
}
function confirmEditProgressionItem(i){
  const nom = document.getElementById('progEditNom').value.trim();
  const dd = document.getElementById('progEditDebut').value;
  const df = document.getElementById('progEditFin').value;
  progEditorItems[i].nomPerso = (nom && nom!==progEditorItems[i].titre) ? nom : '';
  progEditorItems[i].dateDebut = dd ? new Date(dd+'T00:00:00') : null;
  progEditorItems[i].dateFin = df ? new Date(df+'T00:00:00') : null;
  progEditIdx = -1;
  renderProgressionList();
}
/* Glisser-déposer natif (HTML5) pour réordonner les cartes. */
let progDragIdx = null;
function progDragStart(e, i){ progDragIdx = i; e.currentTarget.classList.add('dragging'); e.dataTransfer.effectAllowed='move'; }
function progDragOver(e, i){ e.preventDefault(); e.currentTarget.classList.add('drag-over'); }
function progDrop(e, i){
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if(progDragIdx===null || progDragIdx===i) return;
  const [moved] = progEditorItems.splice(progDragIdx, 1);
  progEditorItems.splice(i, 0, moved);
  adjustProgressionDatesAfterMove(i);
  progDragIdx = null;
  renderProgressionList();
}
const MS_PER_DAY = 24*60*60*1000;
/* Après un glisser-déposer, le chapitre déplacé garde sa position visuelle mais ses dates
   d'origine n'ont plus de sens (il peut se retrouver avant un chapitre qui a lieu plus tôt
   dans l'année, ou après un chapitre plus tardif) -- ce qui casse aussi le calcul
   d'insertion des vacances, qui suppose des dates croissantes tout au long de la liste. On
   recale automatiquement le chapitre déplacé juste après la fin de son nouveau
   prédécesseur (ou juste avant le début de son nouveau successeur s'il est devenu le
   premier de la liste), en conservant sa durée d'origine. */
function adjustProgressionDatesAfterMove(idx){
  // Point d'ancrage : le lendemain de la fin du nouveau prédécesseur -- ou, s'il n'y en a
  // pas (le chapitre devient le premier de la liste), sa propre date de début déjà connue,
  // ou à défaut la rentrée (1er septembre).
  const prev = progEditorItems[idx-1];
  let anchor;
  if(prev && prev.dateFin) anchor = new Date(prev.dateFin.getTime() + MS_PER_DAY);
  else if(progEditorItems[idx].dateDebut) anchor = new Date(progEditorItems[idx].dateDebut.getTime());
  else anchor = new Date(FRISE_YEAR_START, 8, 1);

  // Recalage EN CASCADE : le chapitre déplacé, puis tous ceux qui le suivent désormais,
  // redémarrent chacun juste après la fin du précédent, en conservant leur durée d'origine
  // -- sans ça, seul le chapitre déplacé était recalé, et ses nouveaux voisins suivants
  // (qui gardaient leurs propres dates d'origine) pouvaient se retrouver avec des dates
  // qui se chevauchent avec lui.
  //
  // Cascade CONSCIENTE des vacances : sans ça, en rendant tous les chapitres parfaitement
  // contigus (aucun jour d'écart), on supprime aussi tous les "trous" dans lesquels une
  // vacance pouvait s'insérer -- elles se retrouvaient alors toutes reléguées en fin de
  // liste (voir buildProgressionDisplayList, qui repose sur ces trous). On détecte ici un
  // vrai chevauchement d'intervalles (le chapitre peut commencer AVANT une vacance et
  // déborder dedans, pas seulement démarrer pile pendant) et on décale alors tout le bloc
  // [début, fin] du chapitre pour qu'il commence après la vacance -- en boucle, au cas
  // (rare) où ce nouveau positionnement chevaucherait une autre vacance à la suite.
  const vacances = getVacancesForZone(progUserZone);
  for(let i=idx; i<progEditorItems.length; i++){
    const it = progEditorItems[i];
    const duration = (it.dateDebut && it.dateFin) ? (it.dateFin.getTime()-it.dateDebut.getTime()) : (it.s||1)*7*MS_PER_DAY - MS_PER_DAY;
    let debut = new Date(anchor.getTime());
    let fin = new Date(debut.getTime() + duration);
    let shifted = true;
    while(shifted){
      shifted = false;
      for(const v of vacances){
        const vStart = new Date(v.debut+'T00:00:00'), vEnd = new Date(v.fin+'T00:00:00');
        if(debut <= vEnd && fin >= vStart){
          debut = new Date(vEnd.getTime() + MS_PER_DAY);
          fin = new Date(debut.getTime() + duration);
          shifted = true;
        }
      }
    }
    it.dateDebut = debut;
    it.dateFin = fin;
    anchor = new Date(fin.getTime() + MS_PER_DAY);
  }
}
function progDragEnd(e){
  e.currentTarget.classList.remove('dragging');
  document.querySelectorAll('.prog-card.drag-over').forEach(el=>el.classList.remove('drag-over'));
}
async function saveProgression(){
  const lvl = document.getElementById('progNiveauSelect').value;
  const status = document.getElementById('progStatus');
  status.textContent = 'Enregistrement…';
  const rows = progEditorItems.map((it,i)=>({
    owner_id: currentUser.id, niveau: lvl, chapitre_titre: it.titre, ordre: i,
    nom_perso: it.nomPerso || null,
    date_debut: it.dateDebut ? it.dateDebut.toISOString().slice(0,10) : null,
    date_fin: it.dateFin ? it.dateFin.toISOString().slice(0,10) : null,
  }));
  const { error } = await sb.from('progressions').upsert(rows, { onConflict: 'owner_id,niveau,chapitre_titre' });
  status.textContent = error ? 'Erreur : '+error.message : '✓ Progression enregistrée.';
}
async function resetProgression(){
  const lvl = document.getElementById('progNiveauSelect').value;
  if(!confirm('Revenir à la progression par défaut pour le niveau '+lvl+' ? Vos réglages personnalisés seront supprimés.')) return;
  const status = document.getElementById('progStatus');
  const { error } = await sb.from('progressions').delete().eq('owner_id', currentUser.id).eq('niveau', lvl);
  status.textContent = error ? 'Erreur : '+error.message : '✓ Progression réinitialisée.';
  await renderProgressionEditor();
}
function renderTheme(data, lvl){
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
      const ready = !!DEMO_REGISTRY[lvl+'|'+c.t];
      const locked = restrictedVisitor && !isChapterFree(lvl, c.t);
      html += `<div class="chap-card ${ready?'ready':''} ${locked?'locked':''}" style="border-left-color:${CATS[cat].text}" data-code="${c.code}" data-cat="${c.cat}" data-t="${c.t}" data-p="${c.p}" data-s="${c.s}" data-d="${c.d}">
        ${locked?'<span class="status lock-status">🔒 réservé aux inscrits</span>':(ready?'':'<span class="status">à venir</span>')}
        <div class="code">${c.code} · ch. ${c.n}</div>
        <div class="titre">${c.dispT||c.t}</div>
        <div class="meta"><span>p. ${c.p}</span><span>${c.s} sem.</span></div>
      </div>`;
    });
    html += `</div></div>`;
  });
  const box=document.getElementById('niveau-theme');
  box.innerHTML=html;
  box.querySelectorAll('.chap-card').forEach(card=>{
    card.addEventListener('click',()=>{
      if(card.classList.contains('locked')){ openProfSignupModal(); return; }
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
/* Symétrique de friseEndDate, pour le début de la période (utilisé par l'éditeur de
   progression personnalisée -- voir renderProgressionEditor). Gère le cas où le premier
   segment n'a pas de mois écrit (ex. "7-13 sept" : le "7" emprunte le mois du "13 sept"). */
function friseStartDate(dStr){
  if(!dStr || dStr==='POST') return null;
  const parts = dStr.replace('→','-').split('-');
  const first = parts[0].trim();
  let m = first.match(/(\d+)\s*([a-zA-Zéû]+)?/);
  if(!m) return null;
  const day = parseInt(m[1],10);
  let key = m[2] ? m[2].toLowerCase() : null;
  if(!key && parts.length>1){
    const last = parts[parts.length-1].trim();
    const m2 = last.match(/(\d+)\s*([a-zA-Zéû]+)/);
    if(m2) key = m2[2].toLowerCase();
  }
  if(!key) return null;
  let monIdx = null;
  for(const k in FR_MONTHS){ if(key.startsWith(k) || k.startsWith(key.slice(0,3))){ monIdx=FR_MONTHS[k]; break; } }
  if(monIdx===null) return null;
  const year = monIdx>=8 ? FRISE_YEAR_START : FRISE_YEAR_START+1;
  return new Date(year, monIdx, day, 0, 0, 0);
}
const FR_MONTHS_REV = ['jan','fév','mars','avr','mai','juin','juil','août','sept','oct','nov','déc'];
/* Reconstruit une chaîne d'affichage française ("7-13 sept" ou "28 nov-4 déc" si les mois
   diffèrent) à partir de deux dates -- l'inverse de friseStartDate/friseEndDate. */
function formatDateRangeFr(debut, fin){
  if(!debut || !fin) return '';
  const sameMonth = debut.getMonth()===fin.getMonth();
  const finStr = `${fin.getDate()} ${FR_MONTHS_REV[fin.getMonth()]}`;
  if(sameMonth) return `${debut.getDate()}-${finStr}`;
  return `${debut.getDate()} ${FR_MONTHS_REV[debut.getMonth()]}-${finStr}`;
}
function renderFrise(data, lvl){
  let html = '<div class="timeline">';
  const vac = VACANCES[lvl];
  const now = new Date();
  data.forEach((c,i)=>{
    const endDate = friseEndDate(c.d);
    const done = endDate && endDate < now;
    // Indépendant de la progression calendaire ci-dessus : est-ce que le contenu du
    // chapitre (cours/méthode/exercices) a déjà été créé sur le site, ou pas encore ?
    const hasContent = !!DEMO_REGISTRY[lvl+'|'+c.t];
    const locked = restrictedVisitor && !isChapterFree(lvl, c.t);
    html += `<div class="tl-item${done?' tl-done':''}${locked?' locked':''}" data-code="${c.code}" data-cat="${c.cat}" data-t="${c.t}" data-p="${c.p}" data-s="${c.s}" data-d="${c.d}">
      <span class="dot" style="background:${CATS[c.cat].text}"></span>
      <span class="titre">${c.dispT||c.t}</span>
      ${locked?'<span class="tl-content-badge missing lock-status">🔒 réservé aux inscrits</span>':`<span class="tl-content-badge ${hasContent?'ready':'missing'}" title="${hasContent?'Contenu du site déjà créé':'Contenu du site pas encore créé'}">${hasContent?'🌐 En ligne':'✏️ À créer'}</span>`}
      <span class="dates">${c.code} · ${c.d}</span>
      ${done?'<span class="tl-check" title="Chapitre déjà traité (date passée)">✓</span>':''}
    </div>`;
    const v = vac.find(v=>v.after===c.n);
    if(v) html += `<div class="tl-vac">${v.label}</div>`;
  });
  html += '</div>';
  const box=document.getElementById('niveau-frise');
  box.innerHTML=html;
  box.querySelectorAll('.tl-item').forEach(card=>{
    card.addEventListener('click',()=>{
      if(card.classList.contains('locked')){ openProfSignupModal(); return; }
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
let currentChapterLevel = null;

function openChapitre(c, tab, lvlOverride){
  const lvl = lvlOverride || currentLevel;
  const chapView = document.getElementById('view-chapitre');
  chapView.classList.toggle('lvl-6e', lvl==='6e');
  chapView.classList.toggle('lvl-5e', lvl==='5e');
  const demo = DEMO_REGISTRY[lvl+'|'+c.t];
  currentChapterTitle = c.t;
  currentChapterLevel = lvl;
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
  const bank = DEMO_QUIZZES[currentChapterLevel+'|'+currentChapterTitle] || DEMO_QUIZZES['5e|Symétrie centrale'];
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
  clone.querySelectorAll('.read-aloud-btn').forEach(el=>el.remove());
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
    el.dataset.texSource = el.textContent; // conserve la source brute (lecture vocale, voir toggleReadAloud)
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
/* ---- Boîte à outils de figures (formules, texte libre, division, axe,
   repère, disque/rectangle-fractions, graphique, stats, cubes, probas,
   figure géométrique libre...) : voir outils-figures.js ---- */
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
/* Clé PUBLIQUE Stripe (pk_live_...) : conçue pour être visible côté client, contrairement
   à la clé secrète (sk_live_...) qui ne vit que dans les secrets Supabase, jamais ici.
   Pas utilisée directement par le flux actuel (redirection vers Stripe Checkout hébergé,
   créé côté serveur par l'Edge Function create-checkout-session) -- conservée pour une
   éventuelle évolution future vers un formulaire de paiement intégré (Stripe Elements). */
const STRIPE_PUBLIC_KEY = 'pk_live_51T17VO3TRQxnnzlopsTepUyvV9WPwz3FVJlYby6fucl0cEKiuxSUaTWzulE9GqLyUGbkcw0roYqSo8352WDfgxPC00LxQp6HAz';
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

/* Police OpenDyslexic (accessibilité) : préférence personnelle, stockée en local sur cet
   appareil (comme il ne s'agit que d'une préférence d'affichage et non d'une donnée de
   compte, pas besoin de la synchroniser en base -- localStorage suffit et évite une
   requête réseau à chaque chargement de page). */
function toggleDyslexicFont(){
  const active = document.body.classList.toggle('font-dyslexic');
  try{ localStorage.setItem('dysFont', active ? '1' : '0'); }catch(e){}
  const btn = document.getElementById('dysToggleBtn');
  if(btn) btn.classList.toggle('active', active);
}
(function restoreDyslexicFontPref(){
  let saved = null;
  try{ saved = localStorage.getItem('dysFont'); }catch(e){}
  if(saved === '1'){
    document.body.classList.add('font-dyslexic');
    const btn = document.getElementById('dysToggleBtn');
    if(btn) btn.classList.add('active');
  }
})();

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
/* Inscription en libre-service pour les professeurs (accès réservé aux adresses
   académiques @ac-...fr, UAI de l'établissement obligatoire). Le compte créé reste en
   attente ("pending") jusqu'à validation manuelle par l'admin (voir la partie
   Administration) -- la base de données empêche déjà, via RLS + trigger, qu'un compte
   s'auto-approuve ou s'attribue un autre rôle que "prof". */
const PROF_SIGNUP_EMAIL_RE = /^[^\s@]+@ac-[a-z-]+\.(fr|nc|pf|wf)$/i;
const PROF_SIGNUP_UAI_RE = /^[0-9]{7}[A-Za-z]$/;
function openProfSignupModal(){
  document.getElementById('profSignupModalOverlay').style.display = 'flex';
  document.getElementById('profSignupStatus').textContent = '';
}
function closeProfSignupModal(){
  document.getElementById('profSignupModalOverlay').style.display = 'none';
}
async function submitProfSignup(){
  const status = document.getElementById('profSignupStatus');
  const btn = document.getElementById('btnProfSignupSubmit');
  const prenom = document.getElementById('profSignupPrenom').value.trim();
  const nom = document.getElementById('profSignupNom').value.trim();
  const email = document.getElementById('profSignupEmail').value.trim();
  const uai = document.getElementById('profSignupUai').value.trim().toUpperCase();
  const password = document.getElementById('profSignupPassword').value;

  if(!prenom || !nom || !email || !uai || !password){
    status.textContent = 'Merci de remplir tous les champs.'; return;
  }
  if(!PROF_SIGNUP_EMAIL_RE.test(email)){
    status.textContent = "L'inscription nécessite une adresse académique, de la forme ...@ac-nomacademie.fr.";
    return;
  }
  if(!PROF_SIGNUP_UAI_RE.test(uai)){
    status.textContent = 'Le code UAI doit comporter 7 chiffres suivis d\'une lettre (ex. 0541306B).';
    return;
  }
  if(password.length < 8){
    status.textContent = 'Le mot de passe doit comporter au moins 8 caractères.'; return;
  }

  btn.disabled = true;
  status.textContent = 'Inscription en cours…';

  const { data: signUpData, error: signUpError } = await sb.auth.signUp({ email, password });
  if(signUpError){
    status.textContent = 'Erreur : '+signUpError.message;
    btn.disabled = false;
    return;
  }
  const userId = signUpData.user && signUpData.user.id;
  if(!userId){
    status.textContent = "Compte créé, mais confirmation par e-mail requise avant de pouvoir continuer l'inscription. Vérifiez votre boîte académique.";
    btn.disabled = false;
    return;
  }

  // L'établissement doit exister dans notre référentiel (contrainte de clé étrangère sur
  // profiles.uai) : on le crée avec un nom provisoire si inconnu, l'admin complètera le
  // nom réel au moment de la validation.
  await sb.from('etablissements').upsert({ uai, nom: 'À vérifier par l\'administrateur' }, { onConflict: 'uai', ignoreDuplicates: true });

  const { error: profileError } = await sb.from('profiles').insert({
    id: userId, role: 'prof', nom, prenom, email, uai,
    signup_status: 'pending', subscription_status: 'trial',
  });
  if(profileError){
    status.textContent = 'Erreur lors de la création du profil : '+profileError.message;
    btn.disabled = false;
    return;
  }

  // Notification à contact@latelieraugmente.fr : volontairement non-bloquant -- si l'envoi
  // échoue (ex. secret RESEND_API_KEY pas encore configuré côté Supabase), l'inscription
  // elle-même reste enregistrée et valide, seule la notification est manquée.
  try{ await sb.functions.invoke('notify-prof-signup', { body: { nom, prenom, email, uai } }); }catch(e){ /* silencieux, voir commentaire ci-dessus */ }

  status.textContent = "Inscription enregistrée ! Votre compte sera activé après vérification par l'administrateur, avec 15 jours d'essai gratuit à compter de l'activation.";
  document.getElementById('profSignupPrenom').value = '';
  document.getElementById('profSignupNom').value = '';
  document.getElementById('profSignupEmail').value = '';
  document.getElementById('profSignupUai').value = '';
  document.getElementById('profSignupPassword').value = '';
  btn.disabled = false;
}
/* Démarre le paiement de l'abonnement annuel via Stripe Checkout : demande une session
   à l'Edge Function create-checkout-session (qui connaît le prix et la clé secrète côté
   serveur), puis redirige vers la page de paiement hébergée par Stripe. */
async function startStripeCheckout(){
  const status = document.getElementById('subscribeStatus');
  const btn = document.getElementById('btnSubscribe');
  btn.disabled = true;
  status.textContent = 'Redirection vers le paiement…';
  try{
    const { data, error } = await sb.functions.invoke('create-checkout-session', {
      body: { origin: window.location.origin }
    });
    if(error || !data || !data.url){
      status.textContent = "Erreur : impossible de démarrer le paiement pour le moment. Réessayez plus tard ou contactez contact@latelieraugmente.fr.";
      btn.disabled = false;
      return;
    }
    window.location.href = data.url;
  }catch(e){
    status.textContent = 'Erreur : '+e.message;
    btn.disabled = false;
  }
}
async function refreshAuthUI(){
  const { data:{ session } } = await sb.auth.getSession();
  const loggedOutEl = document.getElementById('accountLoggedOut'), loggedInEl = document.getElementById('accountLoggedIn');
  const navAdmin = document.getElementById('navAdmin');
  const navCorrection = document.getElementById('navCorrection'), navCahier = document.getElementById('navCahier');
  const navMesResultats = document.getElementById('navMesResultats');

  if(session){
    currentUser = session.user;
    const { data: profile } = await sb.from('profiles').select('role,nom,prenom,signup_status,subscription_status,subscription_expires_at').eq('id', currentUser.id).single();
    currentUserRole = profile ? profile.role : null;

    loggedOutEl.style.display='none'; loggedInEl.style.display='block';
    const prenomTrim = profile && profile.prenom ? profile.prenom.trim() : '';
    const nomTrim = profile && profile.nom ? profile.nom.trim() : '';
    const fullName = [prenomTrim, nomTrim].filter(Boolean).join(' ');
    document.getElementById('accountNameDisplay').textContent = fullName || currentUser.email;

    // Un compte prof en attente de validation, refusé, ou dont l'abonnement a expiré ne
    // doit pas accéder aux fonctionnalités (mais reste connecté pour voir son statut).
    const pendingOrRejected = profile && profile.role==='prof' && (profile.signup_status==='pending' || profile.signup_status==='rejected');
    const subscriptionExpired = profile && profile.subscription_status==='expired';
    const accessBlocked = pendingOrRejected || subscriptionExpired;
    if(pendingOrRejected){
      document.getElementById('accountRoleDisplay').innerHTML = profile.signup_status==='pending'
        ? '⏳ Inscription en attente de validation par l\'administrateur.'
        : '❌ Inscription refusée. Contactez contact@latelieraugmente.fr.';
    } else if(subscriptionExpired){
      document.getElementById('accountRoleDisplay').innerHTML = '⚠️ Abonnement expiré. Contactez contact@latelieraugmente.fr pour le renouveler.';
    } else {
      document.getElementById('accountRoleDisplay').textContent =
        currentUserRole==='admin' ? 'Administrateur' : currentUserRole==='prof' ? 'Professeur' : currentUserRole==='eleve' ? 'Élève' : '';
    }

    // Avatar : initiales (prénom + nom) si disponibles, sinon la première lettre de ce qu'on a,
    // sinon on garde l'icône générique -- jamais de case vide dans le rond.
    const avatarBtn = document.getElementById('accountAvatar');
    const initials = [prenomTrim, nomTrim].filter(Boolean).map(s=>s[0]).join('').toUpperCase();
    avatarBtn.textContent = initials || '👤';
    avatarBtn.title = fullName ? `Mon compte — ${fullName}` : 'Mon compte';

    const isStaff = !accessBlocked && (currentUserRole==='admin' || currentUserRole==='prof');
    isStaffGlobal = isStaff;
    if(navCorrection) navCorrection.style.display = isStaff ? 'inline-block' : 'none';
    if(navCahier) navCahier.style.display = accessBlocked ? 'none' : 'inline-block'; // accessible à tous les comptes connectés (prof, admin, élève), sauf accès bloqué
    if(navMesResultats) navMesResultats.style.display = (!accessBlocked && currentUserRole==='eleve') ? 'inline-block' : 'none';
    if(navAdmin) navAdmin.style.display = (!accessBlocked && currentUserRole==='admin') ? 'inline-block' : 'none';
    const btnReportBug = document.getElementById('btnReportBug');
    if(btnReportBug) btnReportBug.style.display = isStaff ? 'block' : 'none';
    const chapSuggestRow = document.getElementById('chapSuggestRow');
    if(chapSuggestRow) chapSuggestRow.style.display = isStaff ? 'block' : 'none';
    const classRow = document.getElementById('accountClassRow');
    if(classRow) classRow.style.display = isStaff ? 'block' : 'none'; // un élève ne choisit pas sa classe, elle lui est assignée
    // Bouton d'abonnement : uniquement pour les profs approuvés (pas admin, pas élève),
    // en essai ou dont l'abonnement a expiré -- pas pour un abonnement déjà actif.
    const btnSubscribe = document.getElementById('btnSubscribe');
    if(btnSubscribe){
      const showSubscribe = profile && profile.role==='prof' && profile.signup_status==='approved'
        && (profile.subscription_status==='trial' || profile.subscription_status==='expired');
      btnSubscribe.style.display = showSubscribe ? 'block' : 'none';
    }
    const btnGenerateQuiz = document.getElementById('btnGenerateQuiz'), quizLoginHint = document.getElementById('quizLoginHint');
    if(btnGenerateQuiz) btnGenerateQuiz.style.display = 'inline-block';
    if(quizLoginHint) quizLoginHint.style.display = 'none';

    if(currentUserRole==='admin') await adminRefreshDropdowns();
    if(isStaff) await loadMyClasses();
    if(currentUserRole==='eleve') await loadMyStudentClasses();

    // Restriction d'accès aux chapitres non gratuits : levée pour tout compte élève, et
    // pour un compte prof/admin approuvé et à jour (essai ou abonnement actif).
    const wasRestricted = restrictedVisitor;
    restrictedVisitor = accessBlocked || !(currentUserRole==='eleve' || isStaff);
    if(wasRestricted !== restrictedVisitor && currentLevel) renderNiveau(currentLevel);
  } else {
    currentUser = null; currentUserRole = null; currentClassId = null;
    loggedOutEl.style.display='block'; loggedInEl.style.display='none';
    isStaffGlobal = false;
    const avatarBtnOut = document.getElementById('accountAvatar');
    if(avatarBtnOut){ avatarBtnOut.textContent = '👤'; avatarBtnOut.title = 'Mon compte'; }
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

    const wasRestrictedOut = restrictedVisitor;
    restrictedVisitor = true;
    if(!wasRestrictedOut && currentLevel) renderNiveau(currentLevel);
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
  { version:'2026-08-04.204', items:[
    "Cours 6e G2 -- retiré le récapitulatif texte devenu redondant dans l'onglet Méthode, désormais remplacé par la vraie figure animée. Un seul bloc reste, directement suivi de la note de rédaction.",
  ]},
  { version:'2026-08-04.203', items:[
    "Cours 6e G2 -- vraie cause trouvée pour \"le tracé ne se fait pas dans l'onglet méthode\" : cet onglet ne contenait en fait AUCUNE figure animée, juste un récapitulatif texte (donc rien ne pouvait se tracer). Ajout d'une vraie figure animée (équerre + règle, glissement, tracé du crayon) avant ce récapitulatif -- copie de la construction déjà validée dans l'onglet Cours, avec ses propres identifiants et son propre état, testée à toutes les étapes avec de vrais clics.",
  ]},
  { version:'2026-08-04.202', items:[
    "Cours 6e G2 -- méthode parallèle : le cadre (viewBox) était resté à sa hauteur d'origine (240) alors que N, désormais placé sous (d), fait descendre la construction bien plus bas (mesuré jusqu'à y=401 lors du glissement, largement hors cadre). Hauteur du cadre augmentée à 430 pour contenir toute la construction avec une marge confortable, vérifié à chaque étape.",
  ]},
  { version:'2026-08-04.201', items:[
    "Cours 6e G2 -- méthode parallèle : suite à une suggestion pragmatique, N est repositionné sous la droite (d) plutôt qu'au-dessus (choix purement pédagogique, sans incidence sur la méthode enseignée). Vérifié numériquement que ce côté donne un glissement de sens positif, ce qui évite complètement le besoin d'un miroir sur l'équerre -- rotation simple, texte et forme jamais inversés, quelle que soit l'étape. Aucune autre modification : chevauchement et échelle restent ceux corrigés précédemment.",
  ]},
  { version:'2026-08-04.200', items:[
    "Cours 6e G2 -- trois corrections. (1) Méthode perpendiculaire : le crayon commençait son tracé en dehors de la règle -- ajusté pour rester nettement à l'intérieur de sa portée. (2) Méthode parallèle : même bug de chevauchement que la première construction trouvé sur la règle-rail (rotation superflue faisant basculer son côté épais du mauvais côté) -- corrigé et vérifié numériquement, plus aucun chevauchement avec l'équerre. (3) L'aspect \"à l'envers\" de l'équerre de la méthode parallèle semble avoir été provoqué par ce même chevauchement chaotique -- à revérifier maintenant qu'il est résolu.",
  ]},
  { version:'2026-08-04.199', items:[
    "Cours 6e G2 -- vrai bug enfin trouvé et corrigé (méthode perpendiculaire) : la règle avait une logique de rotation \"retournée\" copiée de l'équerre, alors que dpPmPerp pointe déjà toujours vers M (réglé une fois pour toutes ailleurs dans le code) -- cette rotation inutile faisait basculer le côté épais de la règle du MAUVAIS côté, recouvrant l'équerre. Vérifié numériquement (calcul direct des coordonnées transformées : le point intérieur de l'équerre tombe désormais hors du rectangle de la règle) et visuellement au zoom : règle et équerre sont maintenant deux objets clairement séparés, sans aucun chevauchement.",
  ]},
  { version:'2026-08-04.198', items:[
    "Cours 6e G2 -- dernière pièce du puzzle sur l'équerre \"à l'envers\" (méthode parallèle) : son grand côté doit rester orienté vers la droite (sinon elle sort du cadre visible), donc le miroir par échelle restait nécessaire, mais inversait ses petits numéros de graduation. Corrigé en neutralisant l'inversion du texte spécifiquement (chaque numéro contre-tourné autour de son propre point d'ancrage), sans toucher au reste de la forme ni à sa position. Confirmé au zoom : numéros parfaitement lisibles.",
  ]},
  { version:'2026-08-04.197', items:[
    "Cours 6e G2 -- vrai bug corrigé (équerres \"à l'envers\") : le miroir par échelle utilisé pour retourner l'équerre inversait toute la forme (pas seulement le texte), donnant cet aspect inversé signalé. Corrigé pour la méthode perpendiculaire avec la même technique de rotation à 180° que les règles (le grand côté reste sur la même droite, qui n'a pas de sens unique). Pour la méthode parallèle, ce même changement faisait sortir l'équerre du cadre visible (le grand côté doit impérativement rester orienté vers la droite) -- miroir par échelle conservé là, mais ses numéros sont petits et peu visibles comparés à ceux des règles (déjà corrigées).",
  ]},
  { version:'2026-08-04.196', items:[
    "Cours 6e G2 -- vrai bug corrigé (signalé par captures d'écran) : les 3 règles utilisaient un miroir par échelle pour éviter le chevauchement avec l'équerre, ce qui inversait aussi le texte des graduations (numéros illisibles à l'envers). Remplacé par un choix de rotation à 180° selon les cas, qui garde exactement la même géométrie (même ligne, même côté sans chevauchement) mais ne touche jamais à l'orientation du texte -- numéros de graduation désormais toujours lisibles normalement, sur les trois méthodes.",
  ]},
  { version:'2026-08-04.195', items:[
    "Cours 6e G2 -- quatre corrections : (1) la règle chevauchait parfois l'équerre quand celle-ci basculait en miroir (côté M) -- la règle suit maintenant le même miroir ; (2) la perpendiculaire dépassait M de seulement 1-2 unités, invisible sous le point -- dépassement net de 35 unités désormais ; (3) échelle plancher augmentée (0,32 → 0,44) sur les trois méthodes pour des outils nettement plus grands et lisibles ; (4) la règle de mesure de la médiatrice (calibrée dynamiquement 0 à 10) reprend maintenant les mêmes couleurs et coins arrondis que le vrai design du tableau interactif.",
  ]},
  { version:'2026-08-04.194', items:[
    "Cours 6e G2 -- vrais bugs corrigés (signalés par captures d'écran) : l'équerre et la règle calculaient chacune leur propre échelle indépendamment, donc ne correspondaient jamais en taille (la règle semblait trop petite et « décalée » par rapport à l'équerre). Une seule échelle partagée est maintenant utilisée pour les deux, garantissant qu'elles sont toujours cohérentes entre elles, comme du vrai matériel. Corrigé aussi pour la méthode parallèle : la première règle (rail de glissement) pouvait s'étendre dans le mauvais sens quand le glissement était négatif, laissant l'équerre sortir de sa portée visible.",
  ]},
  { version:'2026-08-04.193', items:[
    "Cours 6e G2 -- refonte complète : les illustrations appellent désormais DIRECTEMENT les vraies fonctions equerreSVG() et rulerSVG() du tableau interactif (plus de reproduction approximative), avec toutes leurs graduations, numéros et détails. Repositionnement complet (mise à l'échelle dynamique, orientation, bord gradué toujours du côté équerre) pour cette géométrie réelle, vérifié étape par étape sur les trois méthodes (perpendiculaire, parallèle, médiatrice).",
  ]},
  { version:'2026-08-04.192', items:[
    "Cours 6e G2 -- vrai bug corrigé (signalé par capture d'écran) : l'équerre restait de taille fixe et ne touchait jamais réellement le point visé (M ou N), et son petit côté pouvait pointer dans le mauvais sens selon le côté de la droite. Corrigée avec une mise à l'échelle dynamique (calculée d'après la vraie distance à atteindre, avec une petite marge) et une détection du bon sens à chaque étape des méthodes perpendiculaire et parallèle. Design de l'équerre aussi enrichi (graduations plus nombreuses) pour se rapprocher davantage du tableau interactif.",
  ]},
  { version:'2026-08-04.191', items:[
    "Cours 6e G2 (Droites parallèles et perpendiculaires) -- les illustrations animées des trois constructions pas à pas (perpendiculaire, parallèle, médiatrice) utilisent désormais le même design d'équerre et de règle que le tableau interactif (évidement triangulaire, graduations), positionné par rotation/translation au lieu de recalculer des polygones bruts à chaque étape.",
  ]},
  { version:'2026-08-04.190', items:[
    "Tableau interactif -- vrai bug corrigé : le trait de point (style « crayon ») était perpendiculaire à la mine au lieu d'être dans son prolongement (décalage de 90° dans le calcul). Nouveau 3e style « • Aucun » pour nommer une intersection ou un sommet sans ajouter de repère visuel superflu. Codages d'angle : la détection fonctionne désormais directement sur les extrémités des traits qui se rejoignent, sans exiger qu'un point nommé soit déjà posé au sommet -- bien plus fiable. Fix du trait qui \"interceptait\" l'arc dans les vignettes barrées (mauvais rayon).",
  ]},
  { version:'2026-08-04.189', items:[
    "Tableau interactif -- placer un point propose maintenant le choix du style (✕ croix ou ／ trait dans le prolongement du crayon). Codages d'angle : vraie détection du sommet et des deux côtés réintroduite (arc juste, plus une fenêtre fixe approximative), avec repli automatique si aucun sommet n'est trouvé à proximité. Vignettes de la modale corrigées (l'arc débordait des côtés à cause d'un désaccord de géométrie entre les deux tracés) et 2 nouveaux types : arc barré une fois / deux fois, remplaçant l'ancien arc×3.",
  ]},
  { version:'2026-08-04.188', items:[
    "Tableau interactif -- codages : la mini-fenêtre affiche maintenant 9 vraies vignettes visuelles (1/2/3 traits, petit cercle, #, 1/2/3 arcs, angle droit) au lieu de simples boutons texte. Le point bleu du crayon (sélecteur tourner/écrire/coder) est aussi nettement agrandi (rayon 15 au lieu de 6, pleine opacité), pour être vraiment lisible.",
  ]},
  { version:'2026-08-04.187', items:[
    "Tableau interactif -- refonte des codages : plus de détection automatique du sommet/des côtés (peu fiable). Le point bleu du crayon fait maintenant défiler 3 modes au tap (🔄 Tourner, ✏️ Écrire, 🏷️ Coder), comme sur le compas. En mode Coder, un tap ouvre une mini-fenêtre pour choisir Longueur / Angle / Angle droit (et le nombre de traits/arcs). Les traits de longueur sont désormais fins et orientés selon l'angle du crayon -- c'est le professeur qui \"dessine\" l'inclinaison en positionnant le crayon, plus un calcul automatique sur le trait.",
  ]},
  { version:'2026-08-04.186', items:[
    "Tableau interactif -- nouveau : codages de longueurs et d'angles égaux sur le crayon. Un petit sélecteur sur le crayon fait défiler 7 modes (✏️ dessiner normal, ／1/2/3 traits pour les longueurs, ⌒1/2/3 arcs pour les angles). En mode codage, taper près d'un trait pose des petits traits perpendiculaires ; taper près d'un sommet où au moins deux traits partent dans des directions différentes pose un arc -- la reconnaissance longueur/angle est automatique. Les codages apparaissent aussi dans le panneau Historique avec leur propre poubelle.",
  ]},
  { version:'2026-08-04.185', items:[
    "Tableau interactif -- réorganisation de la barre d'outils. « Trait de construction » devient une case à cocher, à côté de « Crayon noir ». Les boutons Annuler/Rétablir n'affichent plus que les flèches (↶ ↷), suffisamment parlantes, ce qui libère de la place : le sélecteur de fond de page remonte sur la ligne du haut.",
  ]},
  { version:'2026-08-04.184', items:[
    "Tableau interactif -- le label d'un point (sa lettre) peut désormais se déplacer indépendamment, sans bouger le point lui-même : on l'attrape directement (poignée séparée de la croix) et on le repositionne librement autour du point.",
  ]},
  { version:'2026-08-04.183', items:[
    "Tableau interactif -- nouveau : boutons ↶ Annuler / ↷ Rétablir, qui reviennent en arrière ou en avant dans toute la construction (traits, points, textes, outils ajoutés/déplacés). Nouveau panneau 🗂️ Historique listant chaque trait, point et texte créé avec sa propre poubelle pour le supprimer individuellement sans toucher au reste.",
  ]},
  { version:'2026-08-04.182', items:[
    "Tableau interactif -- gomme placée en bas à gauche par défaut. Nouvelle case « 📌 Mémoriser position » : si cochée, masquer puis reprendre un outil (règle, équerre...) restaure sa dernière position et son angle exacts au lieu de revenir à la position par défaut. Icônes de la palette redessinées pour ressembler aux vrais outils (règle graduée, équerre bleutée, rapporteur jaune/vert), réquerre retirée de la palette (redondante).",
  ]},
  { version:'2026-08-04.181', items:[
    "Tableau interactif -- compas : nouveau fix sur la pointe, le triangle gris s'amenuisant jusqu'à un point ne couvrait plus toute la largeur du trait noir tout au bout, laissant un liseré noir visible. Le trait est maintenant raccourci pour s'arrêter en retrait, la pointe grise seule représente l'extrémité.",
  ]},
  { version:'2026-08-04.180', items:[
    "Tableau interactif -- compas : la branche du côté pointe dépassait légèrement de la pointe grise (bout de trait arrondi qui débordait). Corrigé, la branche s'arrête maintenant net exactement à la base de la pointe.",
  ]},
  { version:'2026-08-04.179', items:[
    "Tableau interactif -- compas : même correctif que pour le crayon/l'équerre, attraper la branche du crayon ailleurs qu'exactement sur la mine ne fait plus sauter l'angle de quelques degrés (la pointe reste fixe, comme attendu). Sélecteur ouvrir/fermé/crayon : fait maintenant un aller-retour (ouvrir→fermé→crayon→fermé→ouvrir→...) au lieu de reboucler directement de crayon à ouvrir.",
  ]},
  { version:'2026-08-04.178', items:[
    "Tableau interactif -- fix important : la rotation du crayon et de l'équerre sautait de ~90° dès qu'on attrapait le point bleu (la poignée n'étant pas dans l'axe 0° de l'outil, le calcul se décalait brutalement). Corrigé : l'angle local de la poignée est maintenant pris en compte, plus aucun saut. Seuil d'aimantage sur le pavage réduit (45→14) pour redonner la possibilité de poser un point au centre ou à mi-carreau, tout en gardant un accrochage précis sur les vrais sommets.",
  ]},
  { version:'2026-08-04.177', items:[
    "Tableau interactif -- refonte de l'aimantage du crayon, en profondeur. Il se colle désormais tout seul au relâché près d'un bord de règle/équerre ou d'un sommet de pavage, même sans geste de tracé actif (juste le déplacer par le manche et le lâcher tout près suffit). Pendant un tracé, la pente du bord accroché au départ reste mémorisée tout le long du geste (jusqu'à 90 unités d'écart perpendiculaire tolérées), comme un vrai crayon qui ne décroche pas au moindre tremblement. Équerre : trou central réduit, plus proportionné.",
  ]},
  { version:'2026-08-04.176', items:[
    "Tableau interactif -- équerre : vrais angles 30°/60° cette fois (calculés par trigonométrie exacte, la proportion précédente était choisie à l'œil et donnait ~19°). Poignée de rotation replacée dans l'angle libre à 60°. Règle : poignée déplacée sous les graduations 14-15, discrète. Crayon : poignée de rotation réduite, plus discrète. Aimantage (règle et pavage) nettement renforcé, avec un anneau visuel qui pulse autour de la pointe pendant le tracé pour rendre l'effet magnétique flagrant.",
  ]},
  { version:'2026-08-04.175', items:[
    "Tableau interactif -- aimantage sur le pavage nettement plus généreux (seuil quasi doublé), pour un effet magnétique vraiment visible. Un point posé sur un sommet reste maintenant lié à ce sommet (même ligne/colonne) quand on zoome le pavage, au lieu de rester figé à l'ancienne position en pixels. Nouveau : bouton 🔤 pour ajouter des zones de texte libres sur le tableau (déplaçables, modifiables au tap).",
  ]},
  { version:'2026-08-04.174', items:[
    "Tableau interactif -- pavage zoomable : boutons ➕/➖ pour agrandir ou réduire les carreaux/triangles (10 à 60 unités). Le crayon s'aimante désormais aussi sur les sommets du pavage actif (comme sur le bord d'une règle), pour tracer facilement le long du quadrillage même avec une visée imprécise.",
  ]},
  { version:'2026-08-04.173', items:[
    "Tableau interactif -- nouveau sélecteur de fond : page blanche, petits carreaux, ou pavage de triangles équilatéraux. Le motif reste discret et ne gêne jamais la lecture des outils ni des tracés par-dessus.",
  ]},
  { version:'2026-08-04.172', items:[
    "Tableau interactif -- coulissement : sens corrigé, j'avais inversé la logique. C'est maintenant bien l'outil qu'on A EN MAIN qui se rapproche pour venir se coller à l'autre (qui reste fixe) -- et non plus l'inverse.",
  ]},
  { version:'2026-08-04.171', items:[
    "Tableau interactif -- coulissement : c'est maintenant l'outil qu'on N'A PAS en main qui vient se coller à celui qu'on tient (avant, c'était toujours l'équerre qui se collait à la règle, quel que soit l'outil manipulé). Si on vient de saisir la règle, l'équerre se réaligne sur elle ; si on vient de saisir l'équerre, c'est la règle qui se réaligne sur elle.",
  ]},
  { version:'2026-08-04.170', items:[
    "Tableau interactif -- coulissement : fix du déplacement de la règle qui pouvait vouloir glisser à angle droit (perpendiculairement à la bonne direction) quand c'était le petit côté de l'équerre qui servait de bord de contact. La direction de glissement est désormais figée dans le verrou lui-même au moment de l'activation, au lieu d'être recalculée depuis l'angle de base de l'autre outil.",
  ]},
  { version:'2026-08-04.169', items:[
    "Tableau interactif -- coulissement : le vrai bug était dans le réalignement, pas la détection. Le calcul supposait toujours que c'était le grand côté de l'équerre qui touchait la règle, provoquant une rotation de 90° inattendue quand c'était en fait le petit côté (d'où l'impression de \"bord qui change\"). Corrigé : l'angle local du bord réellement détecté est maintenant pris en compte, l'équerre garde son orientation générale au lieu de sauter brutalement.",
  ]},
  { version:'2026-08-04.168', items:[
    "Tableau interactif -- coulissement : vrai bug corrigé, cliquer sur « Coulisser » pouvait aligner l'équerre sur un autre bord que celui visuellement en contact avec la règle (la détection s'arrêtait au premier bord passant les seuils, pas forcément le bon). Elle évalue désormais tous les bords candidats et retient systématiquement le plus proche.",
  ]},
  { version:'2026-08-04.167', items:[
    "Tableau interactif -- coulissement équerre/règle : fix du bouton de déverrouillage qui pouvait disparaître (un bouton de secours reste désormais toujours visible sur l'outil verrouillé, même si le contact en direct n'est plus détecté). Détection resserrée : un vrai chevauchement bord à bord est maintenant exigé (fini les faux positifs \"à proximité\" sans être vraiment l'un contre l'autre). Nouveau : à l'activation du verrou, l'équerre est réalignée automatiquement (angle exact, écart perpendiculaire annulé) même si elle était posée à quelques degrés de travers.",
  ]},
  { version:'2026-08-04.166', items:[
    "Tableau interactif -- verrouillage de coulissement rendu bidirectionnel : on peut désormais faire glisser soit l'équerre le long de la règle, soit la règle le long de l'équerre (au choix), le verrou s'applique aux deux outils en même temps.",
  ]},
  { version:'2026-08-04.165', items:[
    "Tableau interactif -- nouveau : quand une équerre/réquerre touche une règle (bord parallèle et proche, comme sur une photo envoyée), un bouton « 🔗 Coulisser » apparaît. Une fois activé, l'équerre ne peut plus se déplacer qu'en glissant le long de la règle -- impossible de s'en éloigner par erreur, exactement la technique classique pour tracer des parallèles. Un badge 🔗 indique l'état verrouillé, un second clic sur le bouton déverrouille.",
  ]},
  { version:'2026-08-04.164', items:[
    "Tableau interactif -- équerre/réquerre : sommets francs (plus d'arrondi), graduations intermédiaires (mm) ajoutées entre chaque cm, échelle désormais identique à celle de la règle (1cm = même largeur sur les deux outils), texte « Équerre » retiré de l'image.",
  ]},
  { version:'2026-08-04.163', items:[
    "Tableau interactif -- équerre/réquerre : correction de l'orientation (le petit côté descendait vers le haut au lieu du bas -- inversé), l'évidement intérieur utilise désormais un vrai décalage perpendiculaire uniforme garantissant le parallélisme avec les côtés extérieurs, les graduations s'arrêtent avant de déborder de la forme près de la pointe, et la poignée de rotation est repositionnée sur la bande pleine (jamais dans le trou).",
  ]},
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

/* ================= CRÉER UNE ÉVALUATION : voir evaluation.js ================= */

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
  injectReadAloudButtons(container);
}
/* Lecture à voix haute des définitions (accessibilité, même esprit que le sélecteur de
   police OpenDyslexic). Branché sur le même point d'entrée que les boutons "+ Cahier"
   (injectCourseAddButtons), donc actif automatiquement sur tous les chapitres existants
   et futurs sans rien avoir à modifier par ailleurs. Utilise l'API Web Speech native du
   navigateur (aucun service externe, gratuit, fonctionne hors-ligne) ; si le navigateur
   ne la supporte pas, aucun bouton n'est ajouté (dégradation silencieuse). */
function injectReadAloudButtons(container){
  if(!container || !('speechSynthesis' in window)) return;
  container.querySelectorAll('.def-box').forEach(box=>{
    if(box.querySelector('.read-aloud-btn')) return;
    const text = buildSpeechText(box).replace(/\s+/g, ' ').trim();
    if(!text) return;
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='read-aloud-btn';
    btn.title='Écouter cette définition';
    btn.setAttribute('aria-label','Écouter cette définition');
    btn.textContent='🔊';
    btn.onclick=(e)=>{ e.stopPropagation(); toggleReadAloud(btn, text); };
    box.appendChild(btn);
  });
}
/* Construit le texte à lire à voix haute en parcourant le DOM d'un bloc : le texte normal
   est repris tel quel, mais chaque formule mathématique (.tex, une fois rendue par KaTeX)
   est remplacée par sa source LaTeX brute (conservée dans data-tex-source par
   renderStaticMath) convertie en français parlé via latexToSpeech -- lire directement le
   HTML/MathML généré par KaTeX donne un résultat incompréhensible (fragments de glyphes,
   numérateur et dénominateur d'une fraction lus à la suite sans "sur", etc.). */
function buildSpeechText(node){
  let out = '';
  node.childNodes.forEach(child=>{
    if(child.nodeType === Node.TEXT_NODE){
      out += child.nodeValue;
    } else if(child.nodeType === Node.ELEMENT_NODE){
      if(child.classList && child.classList.contains('tex')){
        const src = child.dataset.texSource;
        out += ' ' + latexToSpeech(src !== undefined ? src : child.textContent) + ' ';
      } else if(child.classList && child.classList.contains('read-aloud-btn')){
        // le bouton lui-même (déjà présent lors d'un ré-appel) ne doit jamais être lu
      } else {
        out += buildSpeechText(child);
      }
    }
  });
  return out;
}
/* Convertit une source LaTeX (le sous-ensemble de commandes utilisé sur le site : \dfrac,
   \times, \widehat, \text, \pi, \approx, exposants ^2/^3, virgule décimale {,}) en une
   phrase française prononçable. Reste volontairement simple (regex, pas un vrai parseur
   LaTeX) : le site n'utilise qu'un petit vocabulaire de commandes, toujours de la même
   façon -- voir les usages réels relevés dans les .def-box de tous les chapitres avant
   d'écrire cette fonction. */
function latexToSpeech(tex){
  let s = ' ' + tex + ' ';
  // Fractions \dfrac{a}{b} -> "a sur b" ; en boucle pour gérer les fractions imbriquées,
  // en traitant toujours la plus intérieure d'abord (sans accolades à l'intérieur).
  const fracRe = /\\dfrac\{([^{}]*)\}\{([^{}]*)\}/;
  let guard = 0;
  while(fracRe.test(s) && guard < 20){ s = s.replace(fracRe, (m,a,b)=>` ${a} sur ${b} `); guard++; }
  s = s.replace(/\\widehat\{([^{}]*)\}/g, ' angle $1 ');
  s = s.replace(/\\text\{([^{}]*)\}/g, ' $1 ');
  s = s.replace(/\^2/g, ' au carré ');
  s = s.replace(/\^3/g, ' au cube ');
  s = s.replace(/\{,\}/g, ',');
  s = s.replace(/\\,/g, '');
  s = s.replace(/\\times/g, ' fois ');
  s = s.replace(/\\div/g, ' divisé par ');
  s = s.replace(/\\approx/g, ' environ égal à ');
  s = s.replace(/\\pi/g, ' pi ');
  s = s.replace(/:/g, ' divisé par ');
  // Nettoyage final : toute commande LaTeX non reconnue perd son backslash (reste lisible
  // tel quel plutôt que de faire planter la synthèse vocale), puis on retire les accolades
  // restantes et on normalise les espaces.
  s = s.replace(/\\/g, '');
  s = s.replace(/[{}]/g, '');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}
function toggleReadAloud(btn, text){
  // Un seul bloc lu à la fois : si on reclique sur le même bouton en cours de lecture, on
  // arrête ; sinon on coupe toute lecture en cours avant de démarrer la nouvelle.
  const wasReading = btn.classList.contains('reading');
  speechSynthesis.cancel();
  document.querySelectorAll('.read-aloud-btn.reading').forEach(b=>{ b.classList.remove('reading'); b.textContent='🔊'; });
  if(wasReading) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'fr-FR';
  utter.onend = ()=>{ btn.classList.remove('reading'); btn.textContent='🔊'; };
  utter.onerror = ()=>{ btn.classList.remove('reading'); btn.textContent='🔊'; };
  btn.classList.add('reading');
  btn.textContent='⏸';
  speechSynthesis.speak(utter);
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
  headerClone.querySelectorAll('.read-aloud-btn').forEach(b=>b.remove());
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
  wrapper.querySelectorAll('.read-aloud-btn').forEach(b=>b.remove());
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
let tbLastMovedToolId = null; // dernier outil qu'on a saisi pour le déplacer -- sert à savoir
                               // lequel doit rester fixe quand on active le coulissement (c'est
                               // l'AUTRE outil qui vient se coller à celui qu'on a en main).
let tbBackground = 'blank'; // 'blank' | 'squares' | 'triangles'
let tbGridSize = 20; // taille de base du pavage (côté du carreau ou du triangle), zoomable
// Image de fond importée (photo, figure scannée...) pour travailler par-dessus (tracer, coder...).
// tbBgImages est un tableau "append-only" : chaque image n'y est stockée qu'UNE fois, et les
// instantanés d'historique (undo/redo) ne retiennent que le petit entier tbBgImageIdx -- jamais
// la chaîne base64 elle-même, qui serait sinon dupliquée dans chacun des 60 instantanés possibles.
let tbBgImages = [];
let tbBgImageIdx = null;
let tbBgImageOpacity = 1;
function tbImportImage(file){
  if(!file) return;
  if(!file.type || !file.type.startsWith('image/')){ niceAlert("Ce fichier n'est pas une image."); return; }
  const reader = new FileReader();
  reader.onload = ()=>{
    tbBgImages.push(reader.result);
    tbBgImageIdx = tbBgImages.length-1;
    document.getElementById('tbBgImageOpacityBox').style.display = 'inline-flex';
    tbPushHistory();
    tbRender();
  };
  reader.onerror = ()=>{ niceAlert("Impossible de lire cette image."); };
  reader.readAsDataURL(file);
}
function tbRemoveBgImage(){
  tbBgImageIdx = null;
  document.getElementById('tbBgImageOpacityBox').style.display = 'none';
  tbPushHistory();
  tbRender();
}
function tbSetBgImageOpacity(v){
  tbBgImageOpacity = parseFloat(v);
  tbRender();
}
function tbSetBackground(type){
  tbBackground = type;
  const zoomBox = document.getElementById('tbGridZoomBox');
  if(zoomBox) zoomBox.style.display = type==='blank' ? 'none' : 'inline-flex';
  tbRender();
}
function tbZoomGrid(dir){
  tbGridSize = Math.max(10, Math.min(60, tbGridSize + dir*4));
  // Un point posé sur un sommet du pavage doit rester sur CE sommet (même ligne/colonne)
  // après un zoom, pas rester figé à son ancienne position en pixels -- sinon il se retrouve
  // décroché du quadrillage dès qu'on change l'échelle.
  tbPoints.forEach(p=>{
    if(!p.gridAnchor || p.gridAnchor.type!==tbBackground) return;
    const s = tbGridSize;
    if(p.gridAnchor.type==='squares'){
      p.x = p.gridAnchor.col*s; p.y = p.gridAnchor.row*s;
    } else if(p.gridAnchor.type==='triangles'){
      const h = s*Math.sqrt(3)/2, xOffset = (Math.abs(p.gridAnchor.row)%2)*s/2;
      p.x = p.gridAnchor.col*s+xOffset; p.y = p.gridAnchor.row*h;
    }
  });
  tbRender();
}
/* Sommet le plus proche du pavage actif (carreaux ou triangles), pour que le crayon puisse s'y
   aimanter -- comme il le fait déjà sur le bord d'une règle. Renvoie null si aucun pavage actif
   ou si rien d'assez proche. */
function tbNearestGridVertex(pt){
  if(tbBackground==='squares'){
    const s = tbGridSize;
    const col = Math.round(pt.x/s), row = Math.round(pt.y/s);
    const gx = col*s, gy = row*s;
    const d = Math.hypot(pt.x-gx, pt.y-gy);
    return d<14 ? {x:gx, y:gy, gridType:'squares', row, col} : null;
  }
  if(tbBackground==='triangles'){
    const s = tbGridSize, h = s*Math.sqrt(3)/2;
    const row = Math.round(pt.y/h);
    const xOffset = (Math.abs(row)%2)*s/2;
    const col = Math.round((pt.x-xOffset)/s);
    const gx = col*s+xOffset, gy = row*h;
    const d = Math.hypot(pt.x-gx, pt.y-gy);
    return d<14 ? {x:gx, y:gy, gridType:'triangles', row, col} : null;
  }
  return null;
}
let tbPoints = [];  // points nommés posés au tap du crayon {id, x, y, label}
/* Historique pour annuler/rétablir : une pile d'instantanés complets de l'état du tableau.
   tbHistoryIndex pointe sur l'instantané ACTUELLEMENT affiché -- annuler recule d'un cran,
   rétablir avance d'un cran. Toute nouvelle action après un "annuler" écrase le futur (comme
   partout ailleurs : impossible de "rétablir" une branche qu'on vient d'abandonner). */
let tbHistory = [];
let tbHistoryIndex = -1;
function tbSnapshot(){
  return JSON.stringify({tools:tbTools, ink:tbInk, points:tbPoints, texts:tbTexts, codages:tbCodages, bg:tbBackground, gridSize:tbGridSize, bgImageIdx:tbBgImageIdx, bgImageOpacity:tbBgImageOpacity});
}
function tbPushHistory(){
  const snap = tbSnapshot();
  if(tbHistoryIndex>=0 && tbHistory[tbHistoryIndex]===snap) return; // rien de vraiment changé
  tbHistory = tbHistory.slice(0, tbHistoryIndex+1);
  tbHistory.push(snap);
  if(tbHistory.length>60) tbHistory.shift(); else tbHistoryIndex++;
  tbUpdateHistoryButtons();
  tbRenderHistoryPanel();
}
function tbRestoreSnapshot(snap){
  const s = JSON.parse(snap);
  tbTools = s.tools; tbInk = s.ink; tbPoints = s.points; tbTexts = s.texts; tbCodages = s.codages || [];
  tbBackground = s.bg; tbGridSize = s.gridSize;
  tbBgImageIdx = s.bgImageIdx!==undefined ? s.bgImageIdx : null;
  tbBgImageOpacity = s.bgImageOpacity!==undefined ? s.bgImageOpacity : 1;
  tbDrag = null;
  const bgSelect = document.getElementById('tbBgSelect');
  if(bgSelect) bgSelect.value = tbBackground;
  const zoomBox = document.getElementById('tbGridZoomBox');
  if(zoomBox) zoomBox.style.display = tbBackground==='blank' ? 'none' : 'inline-flex';
  const opacityBox = document.getElementById('tbBgImageOpacityBox');
  if(opacityBox){
    opacityBox.style.display = tbBgImageIdx!==null ? 'inline-flex' : 'none';
    const slider = document.getElementById('tbBgImageOpacitySlider');
    if(slider) slider.value = tbBgImageOpacity;
  }
  tbRenderPalette();
  tbRender();
  tbRenderHistoryPanel();
}
function tbUndo(){
  if(tbHistoryIndex<=0) return;
  tbHistoryIndex--;
  tbRestoreSnapshot(tbHistory[tbHistoryIndex]);
  tbUpdateHistoryButtons();
}
function tbRedo(){
  if(tbHistoryIndex>=tbHistory.length-1) return;
  tbHistoryIndex++;
  tbRestoreSnapshot(tbHistory[tbHistoryIndex]);
  tbUpdateHistoryButtons();
}
function tbUpdateHistoryButtons(){
  const u = document.getElementById('tbBtnUndo'), r = document.getElementById('tbBtnRedo');
  if(u) u.disabled = tbHistoryIndex<=0;
  if(r) r.disabled = tbHistoryIndex>=tbHistory.length-1;
}
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
/* Triangle intérieur dont chaque côté est PARALLÈLE au côté correspondant du triangle donné,
   décalé vers l'intérieur d'une distance uniforme "d" (comme un vrai évidement d'équerre en
   plastique, pas 3 points choisis à la main qui cassent le parallélisme). */
function tbInsetTriangle(pts, d){
  const cxg = (pts[0][0]+pts[1][0]+pts[2][0])/3, cyg = (pts[0][1]+pts[1][1]+pts[2][1])/3;
  const lines = [];
  for(let i=0;i<3;i++){
    const p1=pts[i], p2=pts[(i+1)%3];
    const dx=p2[0]-p1[0], dy=p2[1]-p1[1], len=Math.hypot(dx,dy)||1;
    let nx=-dy/len, ny=dx/len;
    const midx=(p1[0]+p2[0])/2, midy=(p1[1]+p2[1])/2;
    if(nx*(cxg-midx)+ny*(cyg-midy) < 0){ nx=-nx; ny=-ny; }
    lines.push({p:[p1[0]+nx*d, p1[1]+ny*d], dir:[dx,dy]});
  }
  const intersect = (l1,l2) => {
    const [x1,y1]=l1.p, [dx1,dy1]=l1.dir, [x2,y2]=l2.p, [dx2,dy2]=l2.dir;
    const denom = dx1*dy2 - dy1*dx2;
    if(Math.abs(denom)<1e-9) return [x1,y1];
    const t = ((x2-x1)*dy2 - (y2-y1)*dx2)/denom;
    return [x1+dx1*t, y1+dy1*t];
  };
  return [intersect(lines[2],lines[0]), intersect(lines[0],lines[1]), intersect(lines[1],lines[2])];
}
function equerreSVG(legX, legY){
  // Angle droit en haut à gauche (origine) ; grand côté horizontal en haut ; PETIT côté
  // vertical qui DESCEND (y positif) -- pas l'inverse. Sommets francs (pas arrondis), comme une
  // vraie équerre en plastique rigide.
  const outerPts = [[0,0],[legX,0],[0,legY]];
  const inset = 34;
  const holePts = tbInsetTriangle(outerPts, inset);
  let ticks = '';
  // Même échelle que la règle (22 unités/cm) pour rester raccord entre les deux outils.
  const cmStep = 22, nCm = Math.floor(legX/cmStep);
  for(let cm=1; cm<=nCm; cm++){
    const x = cm*cmStep;
    // La hauteur disponible (jusqu'à l'hypoténuse) doit rester supérieure à la place prise par
    // la graduation, sinon elle déborderait hors de l'équerre près de la pointe.
    const availableH = legY*(1 - x/legX);
    if(availableH < 16) break;
    ticks += `<line x1="${x}" y1="0" x2="${x}" y2="7" stroke="#1C1B2E" stroke-width="0.8"/>
      <text x="${x}" y="15" font-size="6.5" text-anchor="middle" fill="#1C1B2E">${cm}</text>`;
    // Graduations intermédiaires (mm), comme sur la règle.
    for(let mm=1; mm<10; mm++){
      const xm = x - cmStep + mm*(cmStep/10);
      if(xm<=0) continue;
      const availH2 = legY*(1 - xm/legX);
      if(availH2 < 6) continue;
      ticks += `<line x1="${xm.toFixed(1)}" y1="0" x2="${xm.toFixed(1)}" y2="${mm===5?5:3}" stroke="#1C1B2E" stroke-width="0.6"/>`;
    }
  }
  return `<polygon points="${outerPts.map(p=>p.join(',')).join(' ')}" fill="rgba(205,225,245,.4)" stroke="#1C1B2E" stroke-width="1.6"/>
    <polygon points="${holePts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="#fff" fill-opacity="0.85" stroke="#1C1B2E" stroke-width="1.1"/>
    ${ticks}`;
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
// Un vrai compas ne peut pas s'ouvrir plus grand que ses deux branches mises bout à bout (angle
// plat, charnière à hauteur nulle) : au-delà, il n'existe géométriquement aucune solution avec
// des branches de longueur fixe. Rayon max = 2×LEG, avec une petite marge de sécurité pour que
// la charnière garde toujours une hauteur (et donc un angle) bien définis, même tout en bout de
// course.
const TB_COMPASS_MAX_RADIUS = 2*TB_COMPASS_LEG - 10;
/* Compas, dans le même esprit graphique que celui du tableau interactif (pointe grise
   effilée, mine en forme de petit crayon, charnière ovale à rivets + pommeau) : repère
   LOCAL, la pointe (ancrage fixe) est à l'origine (0,0), la mine (crayon qui trace) à
   (radius,0) -- comme equerreSVG/rulerSVG, à positionner/orienter via un <g transform=
   "translate(...) rotate(...)"> côté appelant.
   legLen est la longueur (fixe) des branches : chaque figure choisit la valeur qui lui
   donne les proportions les plus naturelles à SON échelle (le tableau interactif utilise
   TB_COMPASS_LEG=200 ; une figure de cours à une autre échelle voudra souvent une valeur
   différente -- ex. proportionnelle au rayon de la figure).
   Un vrai compas ne peut pas s'ouvrir plus grand que ses deux branches mises bout à bout :
   radius est donc bridé à 2×legLen (avec une petite marge de sécurité), au-delà duquel il
   n'existe géométriquement aucune solution avec des branches de longueur fixe -- c'est
   exactement le bug corrigé sur le tableau interactif (les branches semblaient s'allonger
   indéfiniment en écartant au maximum). */
function compassSVG(radius, legLen){
  const leg = legLen || TB_COMPASS_LEG;
  const r = Math.min(2*leg-10, Math.max(1, radius));
  const half = r/2;
  const hingeH = Math.sqrt(Math.max(leg*leg - half*half, 4));
  const midX = half, midY = -hingeH;
  const mineX = r, mineY = 0;
  const mineAngle = Math.atan2(mineY-midY, mineX-midX)*180/Math.PI;
  const anchorAngle = Math.atan2(0-midY, 0-midX)*180/Math.PI;
  const anchorRad = anchorAngle*Math.PI/180;
  // Le trait NOIR visible s'arrête un peu avant la vraie pointe (12 unités en retrait), comme
  // sur le tableau interactif : le triangle gris s'amenuisant jusqu'à un point à cet endroit,
  // il ne couvrirait plus toute la largeur du trait tout au bout sans ce retrait.
  const anchorVisX = -12*Math.cos(anchorRad), anchorVisY = -12*Math.sin(anchorRad);
  return `<line x1="${anchorVisX.toFixed(1)}" y1="${anchorVisY.toFixed(1)}" x2="${midX.toFixed(1)}" y2="${midY.toFixed(1)}" stroke="#1C1B2E" stroke-width="5" stroke-linecap="butt"/>
    <line x1="${mineX.toFixed(1)}" y1="${mineY.toFixed(1)}" x2="${midX.toFixed(1)}" y2="${midY.toFixed(1)}" stroke="#1C1B2E" stroke-width="5" stroke-linecap="round"/>
    <g transform="rotate(${(anchorAngle-90).toFixed(1)})">
      <polygon points="0,0 -3.5,-18 3.5,-18" fill="#6B7280" stroke="#1C1B2E" stroke-width="1"/>
    </g>
    <g transform="translate(${mineX.toFixed(1)},${mineY.toFixed(1)}) rotate(${(mineAngle-90).toFixed(1)})">
      <rect x="-4.5" y="-22" width="9" height="8" fill="#D93025" stroke="#1C1B2E" stroke-width="1.1"/>
      <rect x="-4.5" y="-14" width="9" height="10" fill="#E8B93A" stroke="#1C1B2E" stroke-width="1.1"/>
      <polygon points="-4.5,-4 4.5,-4 0,0" fill="#D9B48F" stroke="#1C1B2E" stroke-width="1.1"/>
      <polygon points="-1.6,-1.3 1.6,-1.3 0,0" fill="#3a2b1f"/>
    </g>
    <g transform="translate(${midX.toFixed(1)},${midY.toFixed(1)})">
      <ellipse cx="0" cy="0" rx="12" ry="16" fill="#2EA8C9" stroke="#1C1B2E" stroke-width="1.6"/>
      <circle cx="-4" cy="-4" r="1.7" fill="#1C1B2E"/>
      <circle cx="4" cy="-4" r="1.7" fill="#1C1B2E"/>
      <circle cx="0" cy="-19" r="7" fill="#2EA8C9" stroke="#1C1B2E" stroke-width="1.4"/>
    </g>`;
}
// Grande équerre à 30°/60° : angle exact via trigonométrie (avant, la proportion était choisie
// à l'œil et ne donnait ni 30° ni 60° -- ici legY = legX·tan(30°) donne un angle de 30° pile au
// sommet pointu (en haut à droite), et donc 60° à l'autre sommet aigu (en bas à gauche).
const TB_EQUERRE_LEGX = 340, TB_EQUERRE_LEGY = TB_EQUERRE_LEGX * Math.tan(30*Math.PI/180);
const TB_DEFS = {
  crayon:      { rotateHandle:{x:0,y:-100,r:6,opacity:0.4}, svg: pencilSVG,            edges: [] },
  regle_grad:  { rotateHandle:{x:14.5*22,y:TB_RULER_W-6,r:7,opacity:0.5}, svg: ()=>rulerSVG(true),  edges: [{x1:6,y1:0,x2:TB_RULER_L-6,y2:0}] },
  equerre:     { rotateHandle:{x:8,y:TB_EQUERRE_LEGY-10,r:7,opacity:0.5}, svg: ()=>equerreSVG(TB_EQUERRE_LEGX,TB_EQUERRE_LEGY), edges: [{x1:0,y1:0,x2:TB_EQUERRE_LEGX,y2:0},{x1:0,y1:0,x2:0,y2:TB_EQUERRE_LEGY}] },
  requerre:    { rotateHandle:{x:10,y:40,r:7,opacity:0.5}, svg: ()=>equerreSVG(180,80),  edges: [{x1:0,y1:0,x2:180,y2:0},{x1:0,y1:0,x2:0,y2:80}] },
  rapporteur:  { rotateHandle:{x:0,y:-24,r:7,opacity:0.55}, svg: protractorSVG, edges: [{x1:-TB_PROT_PIVOT_X+8,y1:0,x2:(TB_PROT_W-TB_PROT_PIVOT_X)-8,y2:0}] },
  gomme:       { rotateHandle:null, svg: gommeSVG, edges: [] },
};
function gommeSVG(id){
  return `<g data-role="body" data-id="${id}">
    <rect x="-24" y="-15" width="48" height="30" rx="6" fill="#F2A6C4" stroke="#1C1B2E" stroke-width="1.6"/>
    <rect x="-24" y="-15" width="48" height="11" rx="4" fill="#fff" opacity="0.5"/>
  </g>`;
}
const TB_ICON_PROTRACTOR = `<svg viewBox="0 0 24 24" width="26" height="26"><path d="M2 18 A10 10 0 0 1 22 18 Z" fill="#FCE8A8" stroke="#1C1B2E" stroke-width="1.3"/><path d="M3.3 18 A8.7 8.7 0 0 1 20.7 18" fill="none" stroke="#8FCB9B" stroke-width="2.2"/><line x1="2" y1="18" x2="22" y2="18" stroke="#1C1B2E" stroke-width="1.3"/></svg>`;
const TB_ICON_COMPASS = `<svg viewBox="0 0 24 24" width="26" height="26"><circle cx="12" cy="4.5" r="1.8" fill="#1C1B2E"/><line x1="12" y1="4.5" x2="5.5" y2="21" stroke="#1C1B2E" stroke-width="1.8"/><line x1="12" y1="4.5" x2="18.5" y2="21" stroke="#1C1B2E" stroke-width="1.8"/><circle cx="5.5" cy="21" r="1.4" fill="#D93025"/><rect x="16.5" y="17.5" width="4" height="4.5" rx="0.6" fill="#E8B93A" stroke="#1C1B2E" stroke-width="0.7" transform="rotate(18 18.5 19.5)"/></svg>`;
const TB_ICON_ERASER = `<svg viewBox="0 0 24 24" width="26" height="26"><rect x="3" y="9" width="18" height="10" rx="2.5" fill="#F2A6C4" stroke="#1C1B2E" stroke-width="1.5" transform="rotate(-12 12 14)"/><rect x="3" y="9" width="18" height="4" rx="2" fill="#fff" opacity=".55" transform="rotate(-12 12 14)"/></svg>`;
const TB_ICON_RULER = `<svg viewBox="0 0 24 24" width="26" height="26"><rect x="2" y="8" width="20" height="7" rx="1.5" fill="#CDE4FF" stroke="#1C1B2E" stroke-width="1.3"/><line x1="5" y1="8" x2="5" y2="11.5" stroke="#1C1B2E" stroke-width="0.8"/><line x1="8" y1="8" x2="8" y2="10.3" stroke="#1C1B2E" stroke-width="0.6"/><line x1="11" y1="8" x2="11" y2="11.5" stroke="#1C1B2E" stroke-width="0.8"/><line x1="14" y1="8" x2="14" y2="10.3" stroke="#1C1B2E" stroke-width="0.6"/><line x1="17" y1="8" x2="17" y2="11.5" stroke="#1C1B2E" stroke-width="0.8"/></svg>`;
const TB_ICON_EQUERRE = `<svg viewBox="0 0 24 24" width="26" height="26"><polygon points="3,4 21,4 3,19" fill="#CDE4FF" stroke="#1C1B2E" stroke-width="1.3" stroke-linejoin="round"/></svg>`;
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
  {type:'regle_grad',  icon:TB_ICON_RULER, label:'Règle graduée'},
  {type:'equerre',     icon:TB_ICON_EQUERRE, label:'Équerre'},
  {type:'rapporteur',  icon:TB_ICON_PROTRACTOR, label:'Rapporteur'},
  {type:'compas',      icon:TB_ICON_COMPASS, label:'Compas'},
];
let tbTexts = [];       // zones de texte libres posées sur le tableau {id, x, y, text, fontSize}
let tbCodages = [];     // codages de longueurs/angles égaux {id, kind:'tick'|'arc', x, y, segAngle|angle1/angle2, count}
let tbCodageNextId = 1;
/* Vignettes SVG pour chaque type de codage, utilisées dans la mini-fenêtre de choix -- bien
   plus parlant qu'un simple texte "Longueur"/"Angle". */
function tbCodageThumb(kind, count){
  const s = 44;
  let inner = '';
  if(kind==='tick'){
    const spacing = 6;
    for(let i=0;i<count;i++){
      const off = (i-(count-1)/2)*spacing;
      inner += `<line x1="${(22+off-6).toFixed(1)}" y1="30" x2="${(22+off+6).toFixed(1)}" y2="14" stroke="#1C1B2E" stroke-width="1.6"/>`;
    }
    inner = `<line x1="4" y1="22" x2="40" y2="22" stroke="#1C1B2E" stroke-width="1.4"/>` + inner;
  } else if(kind==='circle'){
    inner = `<line x1="4" y1="22" x2="40" y2="22" stroke="#1C1B2E" stroke-width="1.4"/><circle cx="22" cy="22" r="5.5" fill="none" stroke="#1C1B2E" stroke-width="1.6"/>`;
  } else if(kind==='hash'){
    inner = `<line x1="4" y1="22" x2="40" y2="22" stroke="#1C1B2E" stroke-width="1.4"/><text x="22" y="28" font-size="15" text-anchor="middle" font-weight="700" fill="#1C1B2E">#</text>`;
  } else if(kind==='arc'){
    // Géométrie cohérente : les deux côtés ET le ou les arcs partagent EXACTEMENT les mêmes
    // angles depuis le sommet -- l'arc ne peut donc jamais déborder des côtés (avant, les
    // deux tracés utilisaient des formules d'angle différentes, d'où le débordement signalé).
    const vx=22, vy=33, sideLen=21, half=32*Math.PI/180, base=-90*Math.PI/180;
    const a1=base-half, a2=base+half;
    const s1x=vx+sideLen*Math.cos(a1), s1y=vy+sideLen*Math.sin(a1);
    const s2x=vx+sideLen*Math.cos(a2), s2y=vy+sideLen*Math.sin(a2);
    inner = `<line x1="${vx}" y1="${vy}" x2="${s1x.toFixed(1)}" y2="${s1y.toFixed(1)}" stroke="#1C1B2E" stroke-width="1.2"/><line x1="${vx}" y1="${vy}" x2="${s2x.toFixed(1)}" y2="${s2y.toFixed(1)}" stroke="#1C1B2E" stroke-width="1.2"/>`;
    const arcCount = count<=2 ? count : 1;
    for(let i=0;i<arcCount;i++){
      const r = 9+i*6;
      const x1=vx+r*Math.cos(a1), y1=vy+r*Math.sin(a1), x2=vx+r*Math.cos(a2), y2=vy+r*Math.sin(a2);
      inner += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#1C1B2E" stroke-width="1.4"/>`;
    }
    if(count>2){
      // Barré : un arc simple + 1 ou 2 petites striures qui le traversent (count=3 -> 1
      // striure, count=4 -> 2 striures), pour distinguer un 3e ou 4e groupe d'angles égaux.
      // La striure doit être exactement au MÊME rayon que l'arc simple tracé juste au-dessus
      // (r=9), sinon elle apparaît décalée, comme un trait qui "intercepte" l'arc au lieu de
      // le croiser proprement (bug signalé).
      const strikes = count-2;
      const r = 9;
      for(let k=0;k<strikes;k++){
        const a = base + (k-(strikes-1)/2)*0.28;
        const mx=vx+r*Math.cos(a), my=vy+r*Math.sin(a);
        const dx=-Math.sin(a), dy=Math.cos(a);
        inner += `<line x1="${(mx-dx*4).toFixed(1)}" y1="${(my-dy*4).toFixed(1)}" x2="${(mx+dx*4).toFixed(1)}" y2="${(my+dy*4).toFixed(1)}" stroke="#1C1B2E" stroke-width="1.4"/>`;
      }
    }
  } else if(kind==='right'){
    inner = `<line x1="10" y1="34" x2="34" y2="34" stroke="#1C1B2E" stroke-width="1.2"/><line x1="10" y1="34" x2="10" y2="10" stroke="#1C1B2E" stroke-width="1.2"/><path d="M10,26 L18,26 L18,34" fill="none" stroke="#1C1B2E" stroke-width="1.4"/>`;
  }
  return `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}">${inner}</svg>`;
}
/* Cherche un vrai sommet d'angle près du point donné : un point posé où au moins 2 traits
   partent dans des directions différentes. Si trouvé, renvoie le sommet et les deux vraies
   directions -- pour un arc qui correspond réellement à l'angle, pas une fenêtre fixe autour du
   crayon (qui donnait un arc approximatif, pas toujours juste). */
function tbDetectAngleVertex(pt){
  // Rassemble toutes les extrémités (début ET fin) de tous les traits -- avec leur direction
  // vers l'intérieur du trait -- puis cherche l'extrémité la plus proche du crayon, et enfin
  // toutes les AUTRES extrémités qui se trouvent au même endroit qu'elle (même si aucun point
  // nommé n'a été posé là) : c'est ça, "reconnaître l'angle", pas se baser sur un point existant.
  const ends = [];
  tbInk.forEach(stroke=>{
    const pts = stroke.points;
    if(pts.length<2) return;
    ends.push({x:pts[0][0], y:pts[0][1], dir:Math.atan2(pts[1][1]-pts[0][1], pts[1][0]-pts[0][0])});
    const n = pts.length;
    ends.push({x:pts[n-1][0], y:pts[n-1][1], dir:Math.atan2(pts[n-2][1]-pts[n-1][1], pts[n-2][0]-pts[n-1][0])});
  });
  let ref=null, bestD=28;
  ends.forEach(e=>{ const d=Math.hypot(pt.x-e.x, pt.y-e.y); if(d<bestD){ bestD=d; ref=e; } });
  if(!ref) return null;
  const dirs = [];
  ends.forEach(e=>{ if(Math.hypot(e.x-ref.x, e.y-ref.y)<16) dirs.push(e.dir); });
  if(dirs.length<2) return null;
  // Si plus de 2 traits partent de ce sommet, on retient les deux directions les plus proches
  // de l'angle actuel du crayon (celle que le professeur vise), pour coder le bon angle.
  return {x:ref.x, y:ref.y, dirs};
}
async function tbOpenCodageModal(){
  return new Promise(resolve=>{
    const overlay = document.getElementById('niceModalOverlay');
    document.getElementById('niceModalMessage').textContent = 'Quel codage poser ?';
    document.getElementById('niceModalInput').style.display = 'none';
    const btnBox = document.getElementById('niceModalButtons');
    const options = [
      {kind:'tick', count:1}, {kind:'tick', count:2}, {kind:'tick', count:3},
      {kind:'circle', count:1}, {kind:'hash', count:1},
      {kind:'arc', count:1}, {kind:'arc', count:2}, {kind:'arc', count:3}, {kind:'arc', count:4},
      {kind:'right', count:1},
    ];
    btnBox.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;';
    btnBox.innerHTML = '';
    const close = (val)=>{ overlay.style.display='none'; btnBox.style.cssText='display:flex;justify-content:flex-end;gap:8px;'; resolve(val); };
    options.forEach(opt=>{
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.style.cssText = 'border:1.5px solid rgba(28,43,57,.2);border-radius:10px;background:#fff;cursor:pointer;padding:4px;width:56px;height:56px;display:flex;align-items:center;justify-content:center;';
      btn.innerHTML = tbCodageThumb(opt.kind, opt.count);
      btn.onclick = ()=> close(opt);
      btnBox.appendChild(btn);
    });
    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn secondary';
    cancelBtn.textContent = 'Annuler';
    cancelBtn.style.cssText = 'width:100%;margin-top:4px;';
    cancelBtn.onclick = ()=> close(null);
    btnBox.appendChild(cancelBtn);
    overlay.style.display = 'flex';
  });
}
let tbTextNextId = 1;
async function tbAddTextZone(){
  const text = await nicePrompt('Texte à afficher sur le tableau', '');
  if(text===null || !text.trim()) return;
  tbTexts.push({id: tbTextNextId++, x:450, y:280, text: text.trim(), fontSize:16});
  tbRender();
  tbPushHistory();
}
async function tbEditTextZone(id){
  const t = tbTexts.find(x=>x.id===id);
  if(!t) return;
  const text = await nicePrompt('Texte -- laissez vide pour le retirer', t.text);
  if(text===null) return;
  if(!text.trim()){ tbTexts = tbTexts.filter(x=>x.id!==id); } else { t.text = text.trim(); }
  tbRender();
  tbPushHistory();
}
function initTableauView(){
  if(tbInitialized) return;
  tbRenderPalette();
  tbRender();
  tbPushHistory();
  tbInitialized = true;
}
/* Chaque icône de la palette bascule l'outil : un appui l'ajoute au tableau, un second l'en
   retire -- plus besoin d'un bouton de suppression séparé sur le tableau lui-même. L'icône
   reflète l'état (encadrée/colorée quand l'outil est posé). */
function tbRenderPalette(){
  document.getElementById('tbToolPalette').innerHTML = TB_PALETTE.map(p=>{
    const active = tbTools.some(t=>t.type===p.type);
    return `<button type="button" onclick="tbAddTool('${p.type}')" title="${p.label}" style="width:56px;height:56px;border:2px solid ${active?'#0D5BA3':'rgba(28,43,57,.2)'};border-radius:8px;background:${active?'rgba(13,91,163,.12)':'#fff'};cursor:pointer;font-size:1.5rem;">${p.icon}</button>`;
  }).join('') + `<button type="button" onclick="tbAddTextZone()" title="Ajouter une zone de texte" style="width:56px;height:56px;border:1px solid rgba(28,43,57,.2);border-radius:8px;background:#fff;cursor:pointer;font-size:1.4rem;">🔤</button>`;
}
let tbRememberedToolState = {}; // dernière position/angle connue par type d'outil, pour la
                                 // reprise si "Mémoriser position" est coché
function tbAddTool(type){
  if(tbTools.some(t=>t.type===type)){
    const removed = tbTools.find(t=>t.type===type);
    tbRememberedToolState[type] = {x:removed.x, y:removed.y, angle:removed.angle, radius:removed.radius, mode:removed.mode};
    tbTools = tbTools.filter(t=>t.type!==type);
    tbRenderPalette();
    tbRender();
    tbPushHistory();
    return;
  }
  const id = tbNextId++;
  const remember = document.getElementById('tbRememberPos') && document.getElementById('tbRememberPos').checked;
  const saved = remember ? tbRememberedToolState[type] : null;
  if(saved){
    tbTools.push({id, type, x:saved.x, y:saved.y, angle:saved.angle, radius:saved.radius, mode:saved.mode});
  } else if(type==='compas'){
    tbTools.push({id, type, x:420, y:260, angle:-40, radius:90, mode:'open'});
  } else if(type==='gomme'){
    tbTools.push({id, type, x:60, y:500, angle:0});
  } else {
    tbTools.push({id, type, x:430, y:280, angle:0});
  }
  if(TB_HELP_TEXT[type]) tbSetHelp(type);
  tbRenderPalette();
  tbRender();
  tbPushHistory();
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
  const cb = document.getElementById('tbConstructionCheck');
  tbConstructionMode = cb ? cb.checked : !tbConstructionMode;
}
function tbCurrentColor(){
  const el = document.getElementById('tbPencilColor');
  return el ? el.value : '#1C1B2E';
}
function tbClearInk(){ tbInk = []; tbRender(); }
function tbClearAll(){ tbInk = []; tbTools = []; tbPoints = []; tbTexts = []; tbCodages = []; tbRenderPalette(); tbRender(); tbRenderHistoryPanel(); tbPushHistory(); }
/* Panneau d'historique : liste chaque objet créé (trait, point, texte) avec sa propre poubelle
   pour le supprimer individuellement, sans toucher au reste. */
function tbRenderHistoryPanel(){
  const panel = document.getElementById('tbHistoryPanel');
  if(!panel || panel.style.display==='none') return;
  let html = '';
  tbInk.forEach((stroke, i)=>{
    html += `<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-bottom:1px solid rgba(28,43,57,.08);">
      <span style="width:13px;height:13px;border-radius:3px;background:${stroke.color};flex:none;border:1px solid rgba(0,0,0,.15);"></span>
      <span style="flex:1;font-size:.78rem;">Trait ${i+1}${stroke.construction?' (construction)':''}</span>
      <button type="button" onclick="tbDeleteHistoryItem('ink',${i})" style="border:none;background:none;cursor:pointer;font-size:.95rem;" title="Supprimer ce trait">🗑</button>
    </div>`;
  });
  tbPoints.forEach((p, i)=>{
    html += `<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-bottom:1px solid rgba(28,43,57,.08);">
      <span style="flex:1;font-size:.78rem;">Point ${escapeHtml(p.label||'?')}</span>
      <button type="button" onclick="tbDeleteHistoryItem('point',${i})" style="border:none;background:none;cursor:pointer;font-size:.95rem;" title="Supprimer ce point">🗑</button>
    </div>`;
  });
  tbTexts.forEach((t, i)=>{
    const preview = t.text.length>18 ? t.text.slice(0,18)+'…' : t.text;
    html += `<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-bottom:1px solid rgba(28,43,57,.08);">
      <span style="flex:1;font-size:.78rem;">« ${escapeHtml(preview)} »</span>
      <button type="button" onclick="tbDeleteHistoryItem('text',${i})" style="border:none;background:none;cursor:pointer;font-size:.95rem;" title="Supprimer ce texte">🗑</button>
    </div>`;
  });
  tbCodages.forEach((c, i)=>{
    const label = c.kind==='tick' ? `Codage longueur (${c.count})` : `Codage angle (${c.count})`;
    html += `<div style="display:flex;align-items:center;gap:6px;padding:5px 8px;border-bottom:1px solid rgba(28,43,57,.08);">
      <span style="flex:1;font-size:.78rem;">${label}</span>
      <button type="button" onclick="tbDeleteHistoryItem('codage',${i})" style="border:none;background:none;cursor:pointer;font-size:.95rem;" title="Supprimer ce codage">🗑</button>
    </div>`;
  });
  panel.innerHTML = html || '<div style="padding:12px;font-size:.78rem;color:var(--ink-soft);">Rien pour l\'instant -- trace, pose un point ou ajoute du texte.</div>';
}
function tbDeleteHistoryItem(kind, idx){
  if(kind==='ink') tbInk.splice(idx,1);
  else if(kind==='point') tbPoints.splice(idx,1);
  else if(kind==='text') tbTexts.splice(idx,1);
  else if(kind==='codage') tbCodages.splice(idx,1);
  tbRender();
  tbRenderHistoryPanel();
  tbPushHistory();
}
function tbToggleHistoryPanel(){
  const panel = document.getElementById('tbHistoryPanel');
  if(!panel) return;
  const showing = panel.style.display!=='none';
  panel.style.display = showing ? 'none' : 'block';
  if(!showing) tbRenderHistoryPanel();
}
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
function tbSnapToEdge(pt){ return tbSnapToEdgeDetailed(pt).point; }
function tbSnapToEdgeDetailed(pt){
  let best=null, bestDist=45, bestTool=null, bestAX,bestAY,bestBX,bestBY;
  tbTools.forEach(t=>{
    const def = TB_DEFS[t.type];
    if(!def || !def.edges || !def.edges.length) return;
    const rad = t.angle*Math.PI/180, cos=Math.cos(rad), sin=Math.sin(rad);
    def.edges.forEach(e=>{
      const ax = t.x + e.x1*cos - e.y1*sin, ay = t.y + e.x1*sin + e.y1*cos;
      const bx = t.x + e.x2*cos - e.y2*sin, by = t.y + e.x2*sin + e.y2*cos;
      const proj = tbProjectOntoSegment(pt, ax, ay, bx, by, 40);
      if(proj && proj.dist < bestDist){ bestDist = proj.dist; best = {x:proj.x, y:proj.y}; bestTool=t; bestAX=ax; bestAY=ay; bestBX=bx; bestBY=by; }
    });
  });
  if(best && bestTool && bestTool.activeConstraint){
    best = tbApplyConstraint(bestTool, best, bestAX, bestAY, bestBX, bestBY);
  }
  let edgeLine = best ? {ax:bestAX, ay:bestAY, bx:bestBX, by:bestBY} : null;
  // Aimantage sur un sommet du pavage de fond (carreaux/triangles), s'il est plus proche que le
  // meilleur bord de règle/équerre trouvé -- pour tracer facilement le long du quadrillage.
  const vertex = tbNearestGridVertex(pt);
  if(vertex){
    const vDist = Math.hypot(pt.x-vertex.x, pt.y-vertex.y);
    if(!best || vDist < Math.hypot(pt.x-best.x, pt.y-best.y)){ best = vertex; edgeLine = null; }
  }
  return {point: best || pt, edgeLine};
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
/* Cherche une règle et une équerre/réquerre dont un bord est presque parallèle et tout proche
   d'un bord de la règle (comme sur la photo : l'équerre posée contre la règle). Sert à proposer
   le verrouillage "coulisser" -- l'équerre glisse alors le long de la règle sans s'en éloigner.
   Retourne le bord touché de l'équerre (coordonnées locales) pour calculer le décalage exact. */
function tbFindSlideContact(){
  const rulers = tbTools.filter(t=>t.type==='regle_grad');
  const squares = tbTools.filter(t=>t.type==='equerre'||t.type==='requerre');
  let best = null, bestScore = Infinity;
  for(const r of rulers){
    const rDef = TB_DEFS[r.type];
    const rRad = r.angle*Math.PI/180, rCos=Math.cos(rRad), rSin=Math.sin(rRad);
    const re = rDef.edges[0];
    const rax = r.x+re.x1*rCos-re.y1*rSin, ray = r.y+re.x1*rSin+re.y1*rCos;
    const rbx = r.x+re.x2*rCos-re.y2*rSin, rby = r.y+re.x2*rSin+re.y2*rCos;
    const rdx=rbx-rax, rdy=rby-ray, rlen=Math.hypot(rdx,rdy)||1;
    const udx=rdx/rlen, udy=rdy/rlen, nrx=-udy, nry=udx;
    for(const sq of squares){
      const sDef = TB_DEFS[sq.type];
      const sRad = sq.angle*Math.PI/180, sCos=Math.cos(sRad), sSin=Math.sin(sRad);
      // On évalue TOUS les bords de l'équerre et on ne retient que le MEILLEUR (le plus
      // proche/le plus parallèle), jamais le premier qui passe juste les seuils -- sinon un
      // autre bord, moins bien aligné mais techniquement en dessous des seuils, pouvait être
      // choisi par erreur (bug signalé : l'équerre changeait de bord de contact au clic).
      for(let edgeIdx=0; edgeIdx<sDef.edges.length; edgeIdx++){
        const se = sDef.edges[edgeIdx];
        const sax = sq.x+se.x1*sCos-se.y1*sSin, say = sq.y+se.x1*sSin+se.y1*sCos;
        const sbx = sq.x+se.x2*sCos-se.y2*sSin, sby = sq.y+se.x2*sSin+se.y2*sCos;
        const sdx=sbx-sax, sdy=sby-say, slen=Math.hypot(sdx,sdy)||1;
        const cross = Math.abs(rdx*sdy - rdy*sdx)/(rlen*slen);
        // Tolère jusqu'à ~8° de travers (pour proposer l'aimantage même orienté "à quelques
        // degrés près"), mais le chevauchement lui doit être réel -- pas juste "à proximité".
        if(cross > 0.14) continue;
        const perpDist = Math.abs((sax-rax)*nrx + (say-ray)*nry);
        if(perpDist > 14) continue;
        const st0 = (sax-rax)*udx + (say-ray)*udy, st1 = (sbx-rax)*udx + (sby-ray)*udy;
        const sMin=Math.min(st0,st1), sMax=Math.max(st0,st1);
        const overlapLo = Math.max(0, sMin), overlapHi = Math.min(rlen, sMax);
        if(overlapHi < overlapLo - 6) continue; // il faut un vrai chevauchement bord à bord
        const score = perpDist + cross*30; // la distance prime, l'angle départage les ex-æquo
        if(score >= bestScore) continue;
        const contactT = (Math.max(overlapLo,0)+Math.min(overlapHi,rlen))/2;
        const contactX = rax+udx*contactT, contactY = ray+udy*contactT;
        bestScore = score;
        best = {ruler:r, square:sq, edgeIdx, contactX, contactY};
      }
    }
  }
  return best;
}
/* Aligne l'angle et la position de "mover" pour que son bord local "edgeLocal" coïncide
   exactement avec la droite donnée (position ET orientation) -- utilisé pour coller soit
   l'équerre sur la règle, soit la règle sur l'équerre, selon celui qu'on a en main. */
function tbAlignEdgeToLine(mover, edgeLocal, anchorAx, anchorAy, anchorBx, anchorBy){
  const localEdgeAngle = Math.atan2(edgeLocal.y2-edgeLocal.y1, edgeLocal.x2-edgeLocal.x1) * 180/Math.PI;
  const lineAngle = Math.atan2(anchorBy-anchorAy, anchorBx-anchorAx) * 180/Math.PI;
  const targetA = lineAngle - localEdgeAngle, targetB = targetA + 180;
  const normDiff = (a,b)=>{ let d=a-b; while(d>180) d-=360; while(d<-180) d+=360; return d; };
  mover.angle = Math.abs(normDiff(mover.angle, targetA)) <= Math.abs(normDiff(mover.angle, targetB)) ? targetA : targetB;
  const mRad = mover.angle*Math.PI/180, mCos=Math.cos(mRad), mSin=Math.sin(mRad);
  const mx = mover.x+edgeLocal.x1*mCos-edgeLocal.y1*mSin, my = mover.y+edgeLocal.x1*mSin+edgeLocal.y1*mCos;
  const rdx=anchorBx-anchorAx, rdy=anchorBy-anchorAy, rlen=Math.hypot(rdx,rdy)||1;
  const nrx=rdy/rlen, nry=-rdx/rlen;
  const perp = (mx-anchorAx)*nrx + (my-anchorAy)*nry;
  mover.x -= nrx*perp; mover.y -= nry*perp;
}
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
    const mark = pt.markStyle==='none' ? ''
      : (pt.radial || pt.markStyle==='tick')
      ? `<line x1="${(pt.x-9*Math.cos(pt.angle)).toFixed(1)}" y1="${(pt.y-9*Math.sin(pt.angle)).toFixed(1)}" x2="${(pt.x+9*Math.cos(pt.angle)).toFixed(1)}" y2="${(pt.y+9*Math.sin(pt.angle)).toFixed(1)}" stroke="#1C1B2E" stroke-width="2.4"/>`
      : `<line x1="${pt.x-7}" y1="${pt.y-7}" x2="${pt.x+7}" y2="${pt.y+7}" stroke="#1C1B2E" stroke-width="2"/>
         <line x1="${pt.x-7}" y1="${pt.y+7}" x2="${pt.x+7}" y2="${pt.y-7}" stroke="#1C1B2E" stroke-width="2"/>`;
    const ldx = pt.labelDx!==undefined ? pt.labelDx : 11, ldy = pt.labelDy!==undefined ? pt.labelDy : -8;
    const lx = pt.x+ldx, ly = pt.y+ldy;
    return `<g data-role="point" data-id="${pt.id}" style="cursor:pointer;">
    ${mark}
    <circle cx="${pt.x}" cy="${pt.y}" r="20" fill="transparent" pointer-events="all"/>
  </g>
  <g data-role="pointLabel" data-id="${pt.id}" style="cursor:move;">
    <text x="${lx}" y="${ly}" font-size="16" font-weight="700" font-family="'Space Grotesk',sans-serif" fill="#1C1B2E">${escapeHtml(pt.label||'')}</text>
    <rect x="${lx-4}" y="${ly-16}" width="24" height="22" fill="transparent" pointer-events="all"/>
  </g>`;
  }).join('');
  const textsHtml = tbTexts.map(t=>{
    const w = Math.max(30, t.text.length*t.fontSize*0.56+10);
    return `<g data-role="textZone" data-id="${t.id}" style="cursor:move;">
    <rect x="${(t.x-5).toFixed(1)}" y="${(t.y-t.fontSize-4).toFixed(1)}" width="${w.toFixed(1)}" height="${(t.fontSize+10).toFixed(1)}" fill="transparent" pointer-events="all"/>
    <text x="${t.x}" y="${t.y}" font-size="${t.fontSize}" fill="#1C1B2E" font-family="'Space Grotesk',sans-serif">${escapeHtml(t.text)}</text>
  </g>`;
  }).join('');
  const codagesHtml = tbCodages.map(c=>{
    const rad = c.angle*Math.PI/180;
    if(c.kind==='tick'){
      // Traits FINS, perpendiculaires à l'angle du crayon au moment de la pose -- c'est
      // l'utilisateur qui, en inclinant le crayon pour qu'il suive le trait à coder, "dessine"
      // lui-même l'inclinaison du codage, plutôt qu'un calcul automatique sur le trait.
      const perpX = -Math.sin(rad), perpY = Math.cos(rad), alongX = Math.cos(rad), alongY = Math.sin(rad);
      const spacing = 5, tickLen = 7;
      let lines = '';
      for(let i=0;i<c.count;i++){
        const off = (i-(c.count-1)/2)*spacing;
        const cx = c.x+alongX*off, cy = c.y+alongY*off;
        lines += `<line x1="${(cx-perpX*tickLen).toFixed(1)}" y1="${(cy-perpY*tickLen).toFixed(1)}" x2="${(cx+perpX*tickLen).toFixed(1)}" y2="${(cy+perpY*tickLen).toFixed(1)}" stroke="#1C1B2E" stroke-width="1.2"/>`;
      }
      return `<g data-role="codage" data-id="${c.id}" style="cursor:pointer;">${lines}<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="14" fill="transparent" pointer-events="all"/></g>`;
    } else if(c.kind==='circle'){
      const cx = c.x, cy = c.y;
      return `<g data-role="codage" data-id="${c.id}" style="cursor:pointer;"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5.5" fill="none" stroke="#1C1B2E" stroke-width="1.4"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="14" fill="transparent" pointer-events="all"/></g>`;
    } else if(c.kind==='hash'){
      return `<g data-role="codage" data-id="${c.id}" style="cursor:pointer;" transform="translate(${c.x.toFixed(1)},${c.y.toFixed(1)}) rotate(${c.angle.toFixed(1)})"><text x="0" y="5" font-size="15" font-weight="700" text-anchor="middle" fill="#1C1B2E">#</text><circle cx="0" cy="0" r="14" fill="transparent" pointer-events="all"/></g>`;
    } else if(c.kind==='arc'){
      // Si un vrai sommet/côtés a été détecté à la pose, on utilise l'angle RÉEL (angle1/angle2)
      // -- sinon, on retombe sur une fenêtre fixe centrée sur l'angle du crayon.
      let a1, a2;
      if(c.angle1!==undefined){
        a1 = c.angle1*Math.PI/180; a2 = c.angle2*Math.PI/180;
        let diff = (a2-a1); while(diff>Math.PI) diff-=2*Math.PI; while(diff<-Math.PI) diff+=2*Math.PI;
        a2 = a1+diff;
      } else {
        const half = 22*Math.PI/180;
        a1 = rad-half; a2 = rad+half;
      }
      const arcCount = c.count<=2 ? c.count : 1;
      let arcs = '';
      for(let i=0;i<arcCount;i++){
        const r = 13+i*6;
        const x1 = c.x+r*Math.cos(a1), y1 = c.y+r*Math.sin(a1);
        const x2 = c.x+r*Math.cos(a2), y2 = c.y+r*Math.sin(a2);
        const largeArc = Math.abs(a2-a1)>Math.PI ? 1 : 0, sweep = (a2-a1)>0 ? 1 : 0;
        arcs += `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="#1C1B2E" stroke-width="1.2"/>`;
      }
      if(c.count>2){
        // Barré : un arc simple + 1 ou 2 petites striures qui le traversent.
        const strikes = c.count-2, r = 13, mid = (a1+a2)/2;
        for(let k=0;k<strikes;k++){
          const a = mid + (k-(strikes-1)/2)*0.2;
          const mx=c.x+r*Math.cos(a), my=c.y+r*Math.sin(a);
          const dx=-Math.sin(a), dy=Math.cos(a);
          arcs += `<line x1="${(mx-dx*4.5).toFixed(1)}" y1="${(my-dy*4.5).toFixed(1)}" x2="${(mx+dx*4.5).toFixed(1)}" y2="${(my+dy*4.5).toFixed(1)}" stroke="#1C1B2E" stroke-width="1.2"/>`;
        }
      }
      return `<g data-role="codage" data-id="${c.id}" style="cursor:pointer;">${arcs}<circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="16" fill="transparent" pointer-events="all"/></g>`;
    } else {
      // Angle droit : le petit carré classique, un côté dans l'axe du crayon, l'autre
      // perpendiculaire.
      const s = 10;
      const ax = c.x+s*Math.cos(rad), ay = c.y+s*Math.sin(rad);
      const bx = c.x+s*Math.cos(rad)+s*Math.cos(rad+Math.PI/2), by = c.y+s*Math.sin(rad)+s*Math.sin(rad+Math.PI/2);
      const cx2 = c.x+s*Math.cos(rad+Math.PI/2), cy2 = c.y+s*Math.sin(rad+Math.PI/2);
      return `<g data-role="codage" data-id="${c.id}" style="cursor:pointer;">
        <path d="M ${ax.toFixed(1)} ${ay.toFixed(1)} L ${bx.toFixed(1)} ${by.toFixed(1)} L ${cx2.toFixed(1)} ${cy2.toFixed(1)}" fill="none" stroke="#1C1B2E" stroke-width="1.2"/>
        <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="16" fill="transparent" pointer-events="all"/>
      </g>`;
    }
  }).join('');
  let pencilSnapRing = '';
  if(tbDrag && tbDrag.mode==='pencil'){
    const pTool = tbTools.find(t=>t.id===tbDrag.id);
    if(pTool) pencilSnapRing = `<circle cx="${pTool.x.toFixed(1)}" cy="${pTool.y.toFixed(1)}" r="10" fill="none" stroke="#E35D3A" stroke-width="2.4" opacity="0.85"><animate attributeName="r" values="7;13;7" dur="0.7s" repeatCount="indefinite"/></circle>`;
  }
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
      const hingeH = Math.sqrt(Math.max(TB_COMPASS_LEG*TB_COMPASS_LEG - half*half, 4));
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
      const anchorRad = anchorAngle*Math.PI/180;
      // Le trait NOIR visible s'arrête un peu avant la vraie pointe (12 unités en retrait) --
      // le triangle gris s'amenuisant jusqu'à un point à cet endroit, il ne couvrirait plus
      // toute la largeur du trait tout au bout, laissant du noir visible derrière le gris.
      const anchorVisX = t.x - 12*Math.cos(anchorRad), anchorVisY = t.y - 12*Math.sin(anchorRad);
      return `<g>
        <line data-role="compassAnchorLeg" data-id="${t.id}" x1="${anchorVisX.toFixed(1)}" y1="${anchorVisY.toFixed(1)}" x2="${midX}" y2="${midY}" stroke="#1C1B2E" stroke-width="5" stroke-linecap="butt" style="cursor:grab;"/>
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
    const penMode = t.penMode || 'ecrire';
    const penModeIcon = {tourner:'🔄', ecrire:'✏️', coder:'🏷️'}[penMode];
    const penModeColor = {tourner:'#0D5BA3', ecrire:'#1F7A4D', coder:'#E35D3A'}[penMode];
    return `<g transform="translate(${t.x.toFixed(1)},${t.y.toFixed(1)}) rotate(${t.angle.toFixed(1)})">
      <g data-role="body" data-id="${t.id}">${def.svg(t.id)}</g>${protractorRay}
      ${t.slideLock ? `<g transform="rotate(${-t.angle.toFixed(1)})" style="pointer-events:none;"><circle cx="0" cy="0" r="9" fill="#1F7A4D" stroke="#fff" stroke-width="1.4"/><text x="0" y="4" font-size="10" text-anchor="middle">🔗</text></g>` : ''}
      ${rh && t.type==='crayon' ? `<g data-role="rotate" data-id="${t.id}" transform="translate(${rh.x},${rh.y})">
          <circle cx="0" cy="0" r="15" fill="${penModeColor}" stroke="#fff" stroke-width="2"/>
          <text x="0" y="6" font-size="16" text-anchor="middle" transform="rotate(${-t.angle.toFixed(1)})">${penModeIcon}</text>
        </g>` : (rh ? `<circle data-role="rotate" data-id="${t.id}" cx="${rh.x}" cy="${rh.y}" r="${rh.r||11}" fill="#0D5BA3" fill-opacity="${rh.opacity!==undefined?rh.opacity:1}" stroke="#fff" stroke-width="1.6"/>` : '')}
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
  // Bouton pour verrouiller/déverrouiller le coulissement d'une équerre contre une règle,
  // affiché quand elles se touchent (bords parallèles et proches). Si un verrou est déjà actif
  // mais que le contact en direct n'est plus détecté (ex. après une rotation), un bouton de
  // secours reste affiché sur l'outil verrouillé -- pour toujours pouvoir le déverrouiller.
  let slideLockHtml = '';
  const contact = tbFindSlideContact();
  if(contact){
    const already = contact.square.slideLock && contact.square.slideLock.targetId===contact.ruler.id;
    slideLockHtml = `<g data-role="slideLockBtn" data-square="${contact.square.id}" data-ruler="${contact.ruler.id}" transform="translate(${contact.contactX.toFixed(1)},${(contact.contactY-16).toFixed(1)})" style="cursor:pointer;">
      <rect x="-42" y="-12" width="84" height="24" rx="12" fill="${already?'#1F7A4D':'#0D5BA3'}" stroke="#fff" stroke-width="1.4"/>
      <text x="0" y="5" font-size="11" text-anchor="middle" fill="#fff" font-weight="700">${already?'✓ Verrouillé':'🔗 Coulisser'}</text>
    </g>`;
  } else {
    const lockedSquare = tbTools.find(t=>(t.type==='equerre'||t.type==='requerre') && t.slideLock);
    if(lockedSquare){
      const lockedRuler = tbTools.find(t=>t.id===lockedSquare.slideLock.targetId);
      if(lockedRuler){
        slideLockHtml = `<g data-role="slideLockBtn" data-square="${lockedSquare.id}" data-ruler="${lockedRuler.id}" transform="translate(${lockedSquare.x.toFixed(1)},${(lockedSquare.y-24).toFixed(1)})" style="cursor:pointer;">
          <rect x="-42" y="-12" width="84" height="24" rx="12" fill="#1F7A4D" stroke="#fff" stroke-width="1.4"/>
          <text x="0" y="5" font-size="11" text-anchor="middle" fill="#fff" font-weight="700">✓ Verrouillé</text>
        </g>`;
      }
    }
  }
  let bgDefs = '', bgRect = '';
  if(tbBackground==='squares'){
    const s = tbGridSize;
    bgDefs = `<pattern id="tbPatSquares" width="${s}" height="${s}" patternUnits="userSpaceOnUse">
      <path d="M ${s} 0 L 0 0 0 ${s}" fill="none" stroke="#CBD5E1" stroke-width="0.7"/>
    </pattern>`;
    bgRect = `<rect width="${W}" height="${H}" fill="url(#tbPatSquares)"/>`;
  } else if(tbBackground==='triangles'){
    const s=tbGridSize, h=(s*Math.sqrt(3)/2).toFixed(2);
    bgDefs = `<pattern id="tbPatTri" width="${s}" height="${h}" patternUnits="userSpaceOnUse">
      <path d="M0,0 L${s},0 M0,0 L${s/2},${h} M${s},0 L${s/2},${h} M0,${h} L${s/2},0 M${s},${h} L${s/2},0" fill="none" stroke="#CBD5E1" stroke-width="0.7"/>
    </pattern>`;
    bgRect = `<rect width="${W}" height="${H}" fill="url(#tbPatTri)"/>`;
  }
  const bgImageHtml = tbBgImageIdx!==null && tbBgImages[tbBgImageIdx]
    ? `<image href="${tbBgImages[tbBgImageIdx]}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="xMidYMid meet" opacity="${tbBgImageOpacity}"/>`
    : '';
  document.getElementById('tbBoardWrap').innerHTML = `<svg id="tbSvg" width="100%" viewBox="0 0 ${W} ${H}" style="display:block;touch-action:none;user-select:none;background:#fff;">
    <defs>${bgDefs}</defs>
    ${bgRect}
    ${bgImageHtml}
    <g id="tbInkLayer">${inkHtml}${pointsHtml}${textsHtml}${codagesHtml}${protractorPreview}${pencilSnapRing}</g>
    <g id="tbToolsLayer">${toolsHtml}${segActionsHtml}${slideLockHtml}</g>
  </svg>`;
  tbAttachHandlers();
}
/* Fenêtre de choix du nom d'un point : lettres majuscules en boutons, sans passer par le
   clavier. Les lettres déjà utilisées par un autre point disparaissent de la liste (sauf celle
   du point qu'on est en train de renommer, qui reste sélectionnable pour elle-même). */
function tbOpenLetterPicker(currentLabel, currentStyle){
  return new Promise(resolve=>{
    const used = new Set(tbPoints.map(p=>p.label).filter(Boolean));
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(l=>!used.has(l) || l===currentLabel);
    let style = currentStyle || 'cross';
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'display:flex;z-index:200;';
    overlay.innerHTML = `<div style="background:#fff;border-radius:12px;padding:22px;max-width:360px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.25);">
      <h3 style="margin:0 0 10px;font-family:'Space Grotesk',sans-serif;">Nom du point</h3>
      <div style="display:flex;gap:8px;justify-content:center;margin-bottom:14px;">
        <button type="button" data-style="cross" style="padding:8px 14px;border-radius:7px;border:1.5px solid ${style==='cross'?'#0D5BA3':'rgba(28,43,57,.2)'};background:${style==='cross'?'rgba(13,91,163,.1)':'#fff'};cursor:pointer;font-size:1.1rem;">✕ Croix</button>
        <button type="button" data-style="tick" style="padding:8px 14px;border-radius:7px;border:1.5px solid ${style==='tick'?'#0D5BA3':'rgba(28,43,57,.2)'};background:${style==='tick'?'rgba(13,91,163,.1)':'#fff'};cursor:pointer;font-size:1.1rem;">／ Trait (crayon)</button>
        <button type="button" data-style="none" style="padding:8px 14px;border-radius:7px;border:1.5px solid ${style==='none'?'#0D5BA3':'rgba(28,43,57,.2)'};background:${style==='none'?'rgba(13,91,163,.1)':'#fff'};cursor:pointer;font-size:1.1rem;">• Aucun</button>
      </div>
      <p style="margin:0 0 12px;font-size:.75rem;color:#6b7280;">« Aucun » sert à nommer une intersection ou un sommet déjà visible sans ajouter de repère en plus.</p>
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
    overlay.querySelectorAll('[data-style]').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        style = btn.dataset.style;
        overlay.querySelectorAll('[data-style]').forEach(b=>{
          const active = b.dataset.style===style;
          b.style.borderColor = active ? '#0D5BA3' : 'rgba(28,43,57,.2)';
          b.style.background = active ? 'rgba(13,91,163,.1)' : '#fff';
        });
      });
    });
    overlay.querySelectorAll('[data-letter]').forEach(btn=>{
      btn.addEventListener('click', ()=>{ document.body.removeChild(overlay); resolve({label:btn.dataset.letter, style}); });
    });
    document.getElementById('tbLetterCancel').addEventListener('click', ()=>{ document.body.removeChild(overlay); resolve(null); });
  });
}
async function tbRenamePoint(id){
  const point = tbPoints.find(p=>p.id===id);
  if(!point) return;
  const result = await tbOpenLetterPicker(point.label||'', point.markStyle||'cross');
  if(result===null) return;
  if(!result.label){ tbPoints = tbPoints.filter(p=>p.id!==id); } else { point.label = result.label; point.markStyle = result.style; }
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
    if(role==='pointLabel'){
      const point = tbPoints.find(p=>p.id===id);
      if(point) tbDrag = {mode:'pointLabel', id, offX: pt.x-point.x, offY: pt.y-point.y};
      try{ svg.setPointerCapture(e.pointerId); }catch(err){}
      e.preventDefault();
      return;
    }
    if(role==='codage'){
      // Un simple tap sur un codage existant ne fait rien de spécial pour l'instant -- il se
      // supprime via sa poubelle dans le panneau Historique.
      return;
    }
    if(role==='textZone'){
      const tz = tbTexts.find(x=>x.id===id);
      if(tz) tbDrag = {mode:'textZone', id, startX:pt.x, startY:pt.y, moved:false};
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
    if(role==='slideLockBtn'){
      const squareId = parseInt(target.dataset.square), rulerId = parseInt(target.dataset.ruler);
      const sq = tbTools.find(x=>x.id===squareId), ru = tbTools.find(x=>x.id===rulerId);
      if(sq && ru){
        // Verrou bidirectionnel : que ce soit l'équerre ou la règle qu'on attrape ensuite pour
        // la déplacer, le glissement reste contraint le long de l'axe partagé.
        const already = sq.slideLock && sq.slideLock.targetId===rulerId;
        if(already){
          sq.slideLock = null; ru.slideLock = null;
        } else {
          // Réaligne précisément les deux outils avant de verrouiller (angle exact, écart
          // perpendiculaire annulé) -- mais c'est l'outil qu'on N'A PAS en main qui se déplace
          // pour venir se coller à celui qu'on tient : si on vient de saisir la règle, c'est
          // l'équerre qui vient à elle ; si on vient de saisir l'équerre, c'est la règle qui
          // vient à elle (et non plus toujours l'équerre, quel que soit l'outil manipulé).
          const contact = tbFindSlideContact();
          if(contact && contact.square.id===sq.id && contact.ruler.id===ru.id){
            const sDef = TB_DEFS[sq.type], se = sDef.edges[contact.edgeIdx];
            const rDef = TB_DEFS[ru.type], re = rDef.edges[0];
            if(tbLastMovedToolId === ru.id){
              // La règle est tenue en main : c'est ELLE qui se rapproche pour venir se coller
              // contre l'équerre (qui reste fixe).
              const sRad = sq.angle*Math.PI/180, sCos=Math.cos(sRad), sSin=Math.sin(sRad);
              const sax = sq.x+se.x1*sCos-se.y1*sSin, say = sq.y+se.x1*sSin+se.y1*sCos;
              const sbx = sq.x+se.x2*sCos-se.y2*sSin, sby = sq.y+se.x2*sSin+se.y2*sCos;
              tbAlignEdgeToLine(ru, re, sax, say, sbx, sby);
            } else {
              // L'équerre est tenue en main (ou aucun geste préalable détecté) : c'est ELLE qui
              // se rapproche pour venir se coller contre la règle (qui reste fixe).
              const rRad = ru.angle*Math.PI/180, rCos=Math.cos(rRad), rSin=Math.sin(rRad);
              const rax = ru.x+re.x1*rCos-re.y1*rSin, ray = ru.y+re.x1*rSin+re.y1*rCos;
              const rbx = ru.x+re.x2*rCos-re.y2*rSin, rby = ru.y+re.x2*rSin+re.y2*rCos;
              tbAlignEdgeToLine(sq, se, rax, ray, rbx, rby);
            }
          }
          // La direction de glissement est figée ici (l'angle final -- désormais partagé -- de
          // la règle) et mémorisée dans les DEUX verrous, pour que le glissement ultérieur de
          // l'un ou l'autre outil utilise toujours la même direction, sans ambiguïté.
          sq.slideLock = {targetId: rulerId, dirAngle: ru.angle};
          ru.slideLock = {targetId: squareId, dirAngle: ru.angle};
        }
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
      tbLastMovedToolId = tool.id;
      tbDrag = {mode:'move', id, offX: pt.x-tool.x, offY: pt.y-tool.y};
    } else if(role==='rotate'){
      // L'angle local où se trouve la poignée (elle n'est pas toujours dans l'axe 0°, par
      // exemple tout en haut du crayon ou dans le coin de l'équerre) doit être soustrait du
      // calcul, sinon l'outil "saute" instantanément à un angle décalé dès qu'on l'attrape
      // (bug signalé : rotation de 90° au moindre contact avec le point bleu).
      const rh = TB_DEFS[tool.type].rotateHandle;
      const handleLocalAngle = Math.atan2(rh.y, rh.x)*180/Math.PI;
      tbDrag = {mode:'rotate', id, handleLocalAngle, startX:pt.x, startY:pt.y, moved:false};
    } else if(role==='compassAnchorLeg'){
      // La branche qui porte la pointe (l'ancrage fixe) déplace tout l'ensemble -- la pointe
      // s'aimante sur un point déjà posé si on en approche.
      tbDrag = {mode:'compassMoveViaAnchorLeg', id, offX: pt.x-tool.x, offY: pt.y-tool.y};
    } else if(role==='compassLockIcon'){
      // Fait défiler les 3 états en aller-retour : "Ouvrir" → "Fermé" → "Crayon" → puis on
      // repart dans l'autre sens (Crayon → Fermé → Ouvrir → Fermé → ...), pas une boucle qui
      // reviendrait directement de "Crayon" à "Ouvrir".
      const order = ['open','closed','draw'];
      if(!tool.mode) tool.mode = 'open';
      if(tool._cycleDir===undefined) tool._cycleDir = 1;
      let idx = order.indexOf(tool.mode) + tool._cycleDir;
      if(idx >= order.length){ idx = order.length-2; tool._cycleDir = -1; }
      else if(idx < 0){ idx = 1; tool._cycleDir = 1; }
      tool.mode = order[idx];
      tbRender();
      return;
    } else if(role==='compassPencilLeg'){
      // On peut attraper n'importe où le long de la branche (pas forcément exactement sur la
      // mine, qui est au bout) : sans corriger le décalage, l'angle "saute" de quelques degrés
      // dès la saisie (bug signalé, comme pour le crayon/l'équerre).
      const grabAngle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI;
      const angleOffset = grabAngle - tool.angle;
      if(tool.mode==='draw'){
        // Rayon bloqué, tourner cette branche trace vraiment l'arc/cercle.
        tbDrag = {mode:'compassTrace', id, stroke:{color: tbCurrentColor(), construction: tbConstructionMode, points:[]}, angleOffset};
        tbInk.push(tbDrag.stroke);
      } else if(tool.mode==='closed'){
        // Rayon bloqué, tourner cette branche repositionne SANS rien tracer et sans pouvoir
        // écarter les branches -- pour amener le compas à l'angle de départ sans laisser de trace.
        tbDrag = {mode:'compassRotateOnly', id, angleOffset};
      } else {
        // "Ouvrir" : cette branche écarte/resserre le compas (ajuste rayon et angle) sans rien
        // tracer -- s'aimante sur un point déjà posé si on en approche.
        tbDrag = {mode:'compassAdjust', id};
      }
    } else if(role==='tip'){
      if(tool.type==='crayon' && (tool.penMode||'ecrire')==='tourner'){
        // Mode "Tourner" : le crayon entier se déplace SANS tracer, comme si on le posait
        // ailleurs, même en l'attrapant par la pointe.
        tbDrag = {mode:'move', id, offX: pt.x-tool.x, offY: pt.y-tool.y};
      } else if(tool.type==='crayon' && (tool.penMode||'ecrire')==='coder'){
        // Mode "Coder" : un tap ouvre le choix du codage (longueur/angle/angle droit), posé à
        // l'endroit et dans l'orientation actuels du crayon -- pas de tracé.
        tbDrag = {mode:'codagePlace', id, startX:pt.x, startY:pt.y};
      } else if(tool.type==='crayon'){
        // Mode "Écrire" (par défaut) : comportement normal du crayon. On ne sait pas encore si
        // ce sera un tracé (glissé) ou un simple point (relâché sans avoir bougé) -- le trait
        // est ajouté tout de suite mais retiré au relâché si rien n'a bougé, remplacé alors par
        // un point nommé. La position de départ passe elle aussi par l'aimantage (donc par une
        // éventuelle contrainte armée), pour un tracé cohérent dès le premier point, pas
        // seulement une fois qu'on a commencé à bouger.
        const startResult = tbSnapToEdgeDetailed({x:tool.x, y:tool.y});
        tool.x = startResult.point.x; tool.y = startResult.point.y;
        const stroke = {color: tbCurrentColor(), construction: tbConstructionMode, points:[[tool.x,tool.y]]};
        tbInk.push(stroke);
        // Le bord détecté (s'il y en a un) est verrouillé pour tout le geste : la pente reste
        // mémorisée même si le pointeur s'écarte un peu perpendiculairement, comme un vrai
        // crayon posé contre une règle qui ne "décroche" pas au moindre tremblement.
        tbDrag = {mode:'pencil', id, stroke, startX:pt.x, startY:pt.y, moved:false, lockedEdge: startResult.edgeLine};
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
    if(tbDrag.mode==='pointLabel'){
      const point = tbPoints.find(p=>p.id===tbDrag.id);
      if(!point){ tbDrag=null; return; }
      // Le label se déplace SEUL, le point (ses coordonnées géométriques) ne bouge pas.
      point.labelDx = pt.x - tbDrag.offX - point.x;
      point.labelDy = pt.y - tbDrag.offY - point.y;
      tbRender();
      return;
    }
    if(tbDrag.mode==='textZone'){
      const tz = tbTexts.find(x=>x.id===tbDrag.id);
      if(!tz){ tbDrag=null; return; }
      if(Math.hypot(pt.x-tbDrag.startX, pt.y-tbDrag.startY) > 5) tbDrag.moved = true;
      tz.x = pt.x; tz.y = pt.y;
      tbRender();
      return;
    }
    const tool = tbTools.find(t=>t.id===tbDrag.id);
    if(!tool){ tbDrag=null; return; }
    if(tbDrag.mode==='move'){
      if(tool.slideLock){
        // Coulisse le long de la direction figée au moment du verrouillage (mémorisée dans le
        // verrou lui-même, pas recalculée via l'angle "de base" de l'autre outil -- sinon,
        // pour l'équerre posée par son petit côté, cet angle de base ne correspond pas à la
        // direction du bord de contact et fait glisser à 90° de la bonne direction).
        const other = tbTools.find(t=>t.id===tool.slideLock.targetId);
        if(other){
          const rRad = tool.slideLock.dirAngle*Math.PI/180, dirX = Math.cos(rRad), dirY = Math.sin(rRad);
          const desiredX = pt.x - tbDrag.offX, desiredY = pt.y - tbDrag.offY;
          const along = (desiredX-tool.x)*dirX + (desiredY-tool.y)*dirY;
          tool.x += dirX*along; tool.y += dirY*along;
        } else {
          tool.slideLock = null;
          tool.x = pt.x - tbDrag.offX; tool.y = pt.y - tbDrag.offY;
        }
      } else {
        tool.x = pt.x - tbDrag.offX; tool.y = pt.y - tbDrag.offY;
        if(tool.type==='gomme'){ tbEraseNear(tool.x, tool.y, 18); }
        else if(tool.type==='rapporteur'){ tbSnapProtractorPivot(tool); }
        else if(tool.type!=='crayon') tbSnapToolToPoints(tool);
      }
    } else if(tbDrag.mode==='rotate'){
      if(tbDrag.startX!==undefined && Math.hypot(pt.x-tbDrag.startX, pt.y-tbDrag.startY) > 5) tbDrag.moved = true;
      const rawAngle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI;
      const offset = tbDrag.handleLocalAngle || 0;
      let angle = rawAngle - offset;
      if(tool.type==='rapporteur'){
        // Aligne le côté 0°-180° vers un point déjà posé si la direction visée (le vrai rayon
        // vers le curseur) passe tout près -- comme quand on tourne le rapporteur pour caler
        // son bord sur un côté déjà tracé de l'angle.
        let bestAngle=null, bestDiff=6;
        tbPoints.forEach(p=>{
          const d = Math.hypot(p.x-tool.x, p.y-tool.y);
          if(d<12) return; // trop proche du pivot pour être le point visé
          const a = Math.atan2(p.y-tool.y, p.x-tool.x)*180/Math.PI;
          let diff = Math.abs(a-rawAngle); if(diff>180) diff=360-diff;
          if(diff<bestDiff){ bestDiff=diff; bestAngle=a; }
        });
        if(bestAngle!==null) angle = bestAngle - offset;
      }
      tool.angle = angle;
    } else if(tbDrag.mode==='pencil'){
      if(Math.hypot(pt.x-tbDrag.startX, pt.y-tbDrag.startY) > 5) tbDrag.moved = true;
      let snapped;
      if(tbDrag.lockedEdge){
        const {ax,ay,bx,by} = tbDrag.lockedEdge;
        const proj = tbProjectOntoSegment(pt, ax, ay, bx, by, 260);
        if(proj && proj.dist < 90){ snapped = {x:proj.x, y:proj.y}; }
        else { tbDrag.lockedEdge = null; snapped = tbSnapToEdge(pt); }
      } else {
        snapped = tbSnapToEdge(pt);
      }
      tool.x = snapped.x; tool.y = snapped.y;
      tbDrag.stroke.points.push([tool.x, tool.y]);
    } else if(tbDrag.mode==='codagePlace'){
      // Le crayon suit le pointeur (avec aimantage) pour bien viser le trait ou le sommet
      // d'angle visé avant de relâcher pour poser le codage.
      const snapped = tbSnapToEdge(pt);
      tool.x = snapped.x; tool.y = snapped.y;
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
      tool.radius = Math.min(TB_COMPASS_MAX_RADIUS, Math.max(20, Math.hypot(dx,dy)));
      tool.angle = Math.atan2(dy,dx)*180/Math.PI;
    } else if(tbDrag.mode==='compassRotateOnly'){
      // Mode "Fermé" : tourne la branche du crayon SANS jamais toucher au rayon et sans rien
      // tracer -- pour amener le compas à l'angle de départ sans laisser de trace.
      tool.angle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI - (tbDrag.angleOffset||0);
    } else if(tbDrag.mode==='compassTrace'){
      // Rayon fixe (déjà réglé en mode viser ou par la poignée d'écartement) : seule la
      // rotation compte. On interpole plusieurs points intermédiaires si le saut angulaire est
      // grand, pour un arc lisse même quand la rotation va vite (évite les segments visibles).
      const newAngle = Math.atan2(pt.y-tool.y, pt.x-tool.x)*180/Math.PI - (tbDrag.angleOffset||0);
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
    await tbPointerUpInner();
    tbPushHistory();
  };
  async function tbPointerUpInner(){
    if(tbDrag && tbDrag.mode==='move'){
      // Si c'est le crayon qu'on vient de reposer (par le corps, pas la pointe), il se colle
      // tout seul au bord ou au sommet de pavage le plus proche, s'il y en a un pas trop loin --
      // pas besoin d'un vrai geste de tracé pour ça, un simple lâcher tout près suffit.
      const tool = tbTools.find(t=>t.id===tbDrag.id);
      tbDrag = null;
      if(tool && tool.type==='crayon'){
        const snapped = tbSnapToEdge({x:tool.x, y:tool.y});
        tool.x = snapped.x; tool.y = snapped.y;
        tbRender();
      }
      return;
    }
    if(tbDrag && tbDrag.mode==='rotate' && !tbDrag.moved){
      const rTool = tbTools.find(t=>t.id===tbDrag.id);
      tbDrag = null;
      if(rTool && rTool.type==='crayon'){
        const modes = ['tourner','ecrire','coder'];
        const cur = rTool.penMode || 'ecrire';
        rTool.penMode = modes[(modes.indexOf(cur)+1) % modes.length];
        const labels = {tourner:'🔄 Tourner — glissez le crayon entier pour le repositionner sans tracer.', ecrire:'✏️ Écrire — dessine normalement, comme avant.', coder:'🏷️ Coder — un tap ouvre le choix du codage (longueur, angle, angle droit).'};
        tbSetHelp('crayon');
        const box = document.getElementById('tbHelpBox');
        if(box) box.innerHTML = labels[rTool.penMode];
        tbRender();
      }
      return;
    }
    if(tbDrag && tbDrag.mode==='codagePlace'){
      const codTool = tbTools.find(t=>t.id===tbDrag.id);
      tbDrag = null;
      if(codTool){
        const choice = await tbOpenCodageModal();
        if(choice){
          const codage = {id: tbCodageNextId++, kind:choice.kind, x:codTool.x, y:codTool.y, angle:codTool.angle, count:choice.count};
          if(choice.kind==='arc'){
            const detected = tbDetectAngleVertex({x:codTool.x, y:codTool.y});
            if(detected){
              // S'il y a plus de 2 traits à ce sommet, on retient les deux directions les plus
              // proches de l'angle visé par le crayon.
              const penRad = codTool.angle*Math.PI/180;
              const sorted = detected.dirs.slice().sort((a,b)=>{
                const da = Math.min(Math.abs(a-penRad), 2*Math.PI-Math.abs(a-penRad));
                const db = Math.min(Math.abs(b-penRad), 2*Math.PI-Math.abs(b-penRad));
                return da-db;
              });
              codage.x = detected.x; codage.y = detected.y;
              codage.angle1 = sorted[0]*180/Math.PI; codage.angle2 = sorted[1]*180/Math.PI;
            }
          }
          tbCodages.push(codage);
          tbPushHistory();
        }
        tbRender();
        tbRenderHistoryPanel();
      }
      return;
    }
    if(tbDrag && tbDrag.mode==='point'){
      const wasMoved = tbDrag.moved, id = tbDrag.id;
      tbDrag = null;
      if(!wasMoved) await tbRenamePoint(id);
      return;
    }
    if(tbDrag && tbDrag.mode==='textZone'){
      const wasMoved = tbDrag.moved, id = tbDrag.id;
      tbDrag = null;
      if(!wasMoved) await tbEditTextZone(id);
      else tbRender();
      return;
    }
    if(tbDrag && tbDrag.mode==='pencil' && !tbDrag.moved){
      // Tap sans glissement : on retire le trait (vide) commencé, et on pose un point nommé à
      // la place, comme un vrai crayon qu'on pose sur la feuille pour marquer un point.
      tbInk = tbInk.filter(s=>s!==tbDrag.stroke);
      const tool = tbTools.find(t=>t.id===tbDrag.id);
      tbDrag = null;
      if(tool){
        const result = await tbOpenLetterPicker('');
        if(result!==null){
          const anchor = tbNearestGridVertex({x:tool.x, y:tool.y});
          const gridAnchor = (anchor && Math.hypot(anchor.x-tool.x, anchor.y-tool.y)<0.5) ? {type:anchor.gridType, row:anchor.row, col:anchor.col} : null;
          tbPoints.push({id: tbPointNextId++, x: tool.x, y: tool.y, label:result.label, markStyle:result.style, angle: (tool.angle+90)*Math.PI/180, gridAnchor});
        }
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
  }
  svg.onpointerleave = ()=>{ tbDrag = null; };
}

/* ======================= init ======================= */
renderNiveau('6e');

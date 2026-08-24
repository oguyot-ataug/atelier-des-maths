/* ============================================================
   router.js -- routage d'URL (hash) + fil d'Ariane, sur TOUT le
   périmètre de l'appli (navigation élève + outils enseignant).

   Principe : plutôt que de modifier un par un tous les endroits qui
   changent de page (très nombreux, risque d'en oublier), on
   enveloppe la fonction centrale showView() -- par laquelle TOUTE
   navigation passe déjà, y compris openChapitre() qui l'appelle en
   dernière étape -- pour qu'elle mette aussi à jour le hash et le
   fil d'Ariane. On ajoute seulement un écouteur séparé pour les
   onglets du chapitre (cours/méthode/exercices/quiz/histoire), qui
   ne passent pas par showView().

   Chargé en tout dernier (après app.js et tous les chapitres), pour
   que showView/openChapitre/CH5/CH6/DEMO_REGISTRY existent déjà.
   ============================================================ */

const ROUTE_SIMPLE = {
  'view-cm':'cm', 'view-compte':'compte', 'view-correction':'correction',
  'view-evaluation':'evaluation', 'view-tableau':'tableau', 'view-cahier-eleve':'cahier',
  'view-admin':'admin', 'view-supervision':'supervision', 'view-mesresultats':'mesresultats',
};
const ROUTE_LABELS = {
  cm:'Suivi', compte:'Mon compte', correction:'Correction', evaluation:'Évaluation',
  tableau:'Tableau interactif', cahier:'Cahier élève', admin:'Administration',
  supervision:'Supervision', mesresultats:'Mes résultats',
};
/* Routes reservees (role requis), miroir exact des gardes déjà présentes dans le
   gestionnaire de clic data-nav de app.js -- ne pas les dupliquer ailleurs. */
const ROUTE_AUTH = {
  correction:['prof','admin'], evaluation:['prof','admin'], tableau:['prof','admin'],
  admin:['admin'], supervision:['prof','admin'], mesresultats:['eleve'],
};

function routerSlugify(s){
  return (s||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function chapterByNiveauAndN(niveau, n){
  const arr = niveau==='6e' ? CH6 : CH5;
  return arr.find(c=>c.n===n) || null;
}

/* Calcule le hash correspondant à l'état ACTUEL de l'appli (vue affichée, niveau,
   chapitre, onglet), sans jamais le poser lui-même (voir routerSyncRoute). */
function routerComputeRoute(){
  const activeView = document.querySelector('.view.active');
  if(!activeView) return '#/';
  const id = activeView.id;
  if(id==='view-home') return '#/';
  if(id==='view-niveau') return '#/niveau/'+currentLevel;
  if(id==='view-chapitre'){
    const lvl = currentChapterLevel || currentLevel;
    const arr = lvl==='6e' ? CH6 : CH5;
    const c = arr.find(x=>x.t===currentChapterTitle);
    const tabBtn = document.querySelector('.tab-btn.active');
    const tab = tabBtn ? tabBtn.dataset.tab : 'cours';
    if(!c) return '#/niveau/'+lvl;
    return '#/chapitre/'+lvl+'/'+c.n+'-'+routerSlugify(c.t)+'/'+tab;
  }
  if(ROUTE_SIMPLE[id]) return '#/'+ROUTE_SIMPLE[id];
  return '#/';
}

let routerSyncing = false; // vrai pendant qu'on restaure depuis un hash : n'en repose pas un nouveau
function routerSyncRoute(){
  if(routerSyncing) return;
  const route = routerComputeRoute();
  if(location.hash !== route){
    routerSyncing = true;
    history.pushState(null, '', route);
    routerSyncing = false;
  }
  routerUpdateBreadcrumb();
}

function routerUpdateBreadcrumb(){
  const bc = document.getElementById('breadcrumb');
  if(!bc) return;
  const activeView = document.querySelector('.view.active');
  if(!activeView){ bc.innerHTML=''; bc.style.display='none'; return; }
  const id = activeView.id;
  const parts = [{label:'Accueil', route:'#/'}];
  if(id==='view-niveau'){
    parts.push({label:currentLevel, route:null});
  } else if(id==='view-chapitre'){
    const lvl = currentChapterLevel || currentLevel;
    parts.push({label:lvl, route:'#/niveau/'+lvl});
    parts.push({label:currentChapterTitle||'', route:null});
    const tabBtn = document.querySelector('.tab-btn.active');
    if(tabBtn) parts.push({label:tabBtn.textContent.trim(), route:null});
  } else if(id==='view-home'){
    // "Accueil" seul suffit, pas de second segment
  } else if(ROUTE_SIMPLE[id]){
    parts.push({label:ROUTE_LABELS[ROUTE_SIMPLE[id]]||ROUTE_SIMPLE[id], route:null});
  } else {
    bc.innerHTML=''; bc.style.display='none'; return;
  }
  bc.style.display = parts.length>1 ? 'flex' : 'none';
  bc.innerHTML = parts.map((p,i)=>{
    const isLast = i===parts.length-1;
    const label = (p.label||'').replace(/</g,'&lt;');
    if(p.route && !isLast) return `<a href="${p.route}" class="bc-link">${label}</a>`;
    return `<span class="bc-current">${label}</span>`;
  }).join('<span class="bc-sep">›</span>');
}

/* Restaure l'état de l'appli à partir du hash courant (chargement initial, navigateur
   précédent/suivant, ou clic sur un lien du fil d'Ariane). Mêmes gardes de rôle
   qu'à l'origine dans le gestionnaire de clic data-nav de app.js -- ne pas diverger. */
function routerRestoreFromHash(){
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\/?/,'').split('/').filter(Boolean);
  routerSyncing = true;
  try{
    if(parts.length===0){
      showView('view-home'); setActiveTopnav(null);
    } else if(parts[0]==='niveau'){
      const lvl = parts[1]==='5e' ? '5e' : '6e';
      currentLevel = lvl; renderNiveau(lvl); showView('view-niveau'); setActiveTopnav(lvl);
    } else if(parts[0]==='chapitre'){
      const lvl = parts[1]==='5e' ? '5e' : '6e';
      const nMatch = (parts[2]||'').match(/^(\d+)/);
      const n = nMatch ? parseInt(nMatch[1],10) : null;
      const c = n!==null ? chapterByNiveauAndN(lvl, n) : null;
      if(c){ currentLevel = lvl; openChapitre(c, parts[3]||'cours', lvl); setActiveTopnav(lvl); }
      else { showView('view-home'); setActiveTopnav(null); }
    } else {
      const key = parts[0];
      const roles = ROUTE_AUTH[key];
      const authorized = !roles || roles.includes(currentUserRole);
      if(!authorized){
        showView('view-home'); setActiveTopnav(null);
        if(typeof toggleAccountMenu==='function') toggleAccountMenu();
      } else if(key==='cm'){
        showView('view-cm'); setActiveTopnav('cm');
        if(typeof refreshCMProgress==='function') refreshCMProgress();
        if(typeof refreshCMRecords==='function') refreshCMRecords();
      } else if(key==='compte'){
        showView('view-compte'); setActiveTopnav('compte');
        if(typeof cebInit==='function') cebInit();
      } else if(key==='correction'){
        showView('view-correction'); setActiveTopnav('correction');
      } else if(key==='evaluation'){
        showView('view-evaluation'); setActiveTopnav('evaluation');
        if(typeof initEvaluationView==='function') initEvaluationView();
      } else if(key==='tableau'){
        showView('view-tableau'); setActiveTopnav('tableau');
        if(typeof initTableauView==='function') initTableauView();
      } else if(key==='cahier'){
        if(!currentUser){ showView('view-home'); setActiveTopnav(null); if(typeof toggleAccountMenu==='function') toggleAccountMenu(); }
        else { showView('view-cahier-eleve'); setActiveTopnav('cahier'); renderCahierEleve(); }
      } else if(key==='admin'){
        showView('view-admin'); setActiveTopnav('admin');
      } else if(key==='supervision'){
        showView('view-supervision'); setActiveTopnav('supervision'); renderSupervision(); renderSupervisionCeb();
      } else if(key==='mesresultats'){
        showView('view-mesresultats'); setActiveTopnav('mesresultats'); renderMesResultats();
      } else {
        showView('view-home'); setActiveTopnav(null);
      }
    }
  } finally {
    routerSyncing = false;
  }
  routerUpdateBreadcrumb();
}

/* ---- Branchement : on enveloppe showView (par laquelle toute navigation passe déjà,
   y compris openChapitre() qui l'appelle en dernière étape) pour synchroniser le hash. ---- */
const _routerOrigShowView = showView;
showView = function(id){
  _routerOrigShowView(id);
  routerSyncRoute();
};

/* Les onglets du chapitre (cours/méthode/exercices/quiz/histoire) ne passent pas par
   showView() : on ajoute un écouteur séparé (après celui déjà posé par app.js, donc
   l'onglet est déjà bien actif au moment où on lit son état). */
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', routerSyncRoute);
});

/* Les liens du fil d'Ariane utilisent de vraies ancres (#/...) : le hashchange suffit,
   pas besoin d'un gestionnaire de clic dédié. */
window.addEventListener('hashchange', routerRestoreFromHash);

/* Restauration initiale : on attend la résolution de l'état de connexion, sinon une
   route reservee (ex. #/admin) chargée directement ferait tomber sur la page d'accueil
   avant même que le rôle de l'utilisateur ne soit connu. */
if(typeof refreshAuthUI==='function'){
  refreshAuthUI().then(routerRestoreFromHash).catch(routerRestoreFromHash);
} else {
  routerRestoreFromHash();
}
